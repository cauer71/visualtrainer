/**
 * Abprall-Fang – ein Ziel gleitet durchs Feld und prallt an den Rändern ab; getippt wird dort, wo es
 * als Nächstes (später: als Übernächstes) am Rand abprallt.
 *
 * Vorbild: „Zielverfolgung mit Abfangklick“ (Katalog 305). Das Original lässt ein Ziel an unsichtbaren Rändern
 * abprallen und wertet nur, ob ein Klick es trifft – mit Zeitbonus, Zeitstrafe, Rotblitz und Bildwackeln.
 * Hier ist der Rand als Rahmen sichtbar (das „Fangfeld“), das Ziel gleitet gleichmäßig, und man sagt die
 * Bahn voraus: Der Ort des Abpralls wird vorab angetippt. Danach sieht man, wo das Ziel wirklich abprallt.
 *
 * Abgrenzung: Zielfang (das bewegte Ziel selbst wird angetippt, Abprallen nur Beiwerk), Landepunkt (Wurfbogen,
 * Ball hinter einer Wand verdeckt) und Pendel-Fang (Ort bekannt, nur der Moment zählt). Hier ist das Ziel die
 * ganze Zeit sichtbar; die Aufgabe ist das Vorausdenken der geraden Bahn samt Spiegelung am Rand.
 *
 * - Bahn in geschlossener Form (Weg s mit dt aufsummiert → bildratenunabhängig); Zeit bis zum gefragten
 *   Abprall ist die Stufe (3,2 s → 1,3 s), ab Stufe 9 ist der übernächste Abprall gefragt.
 * - Staircase 3-down/1-up (≈ 79 % Treffer). Treffer = Fehler ≤ 7 % der kürzeren Feldseite (mindestens 28 px).
 * - Hauptwert: Stufe. Zusatz: mittlere Abweichung (%), Trefferquote, höchste Stufe.
 * - Kein Zeitbonus, keine Zeitstrafe, kein Rot, kein Blitz, kein Wackeln. Feste Zahl an Durchgängen.
 * - Gemessen wird nur, wohin getippt wird – nicht, wohin die Augen schauen.
 */
import { background, C, circle, glow, orb, ring, rrPath, text } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { captionBottom, drawBadge } from '../_shared/zeichenaufgabe';
import {
  askedBounceFor,
  errorPct,
  type Field,
  hitTolPct,
  isHit,
  makeTrial,
  MAX_LEVEL,
  meanError,
  MIN_LEVEL,
  noisyTap,
  pointsFor,
  positionAt,
  type Pt,
  type Trial,
} from './logic';
import { de, it } from './texts';

const TRIALS = 14;
const QUICK_TRIALS = 3;
const DEMO_TRIALS = 2;
/** Das Ziel erscheint zunächst ruhig (s), dann gleitet es los */
const PRE_S = 0.4;
/** So lange nach dem gefragten Abprall bleibt die Auflösung stehen (s) */
const REVEAL_HOLD_S = 1.1;
const GAP_MS: [number, number] = [450, 750];
const FIRST_MS = 900;
const END_DELAY_MS = 600;
const DEMO_FIRST_MS = 1500;
const DEMO_GAP_MS = 500;
const DEMO_LEVEL = 2;
const FADE_S = 0.25;

const TARGET = '#FDE68A';
const TAP = C.info;

/** Feste, langsame Bahnen für den Intro-Film */
const DEMO_FIXED = [
  { fx: 0.3, fy: 0.45, angleDeg: -50, lead: 2.4 },
  { fx: 0.7, fy: 0.55, angleDeg: 135, lead: 2.6 },
];

type Phase = 'ready' | 'fly' | 'reveal' | 'done';

interface Geo {
  key: string;
  frame: Field;
  inner: Field;
  r: number;
  short: number;
  tolPx: number;
  rest: Pt;
}

interface TrialRec {
  level: number;
  ok: boolean;
  late: boolean;
  err: number;
}

class AbprallFang implements Exercise {
  private readonly stair: Staircase;
  private readonly total: number;
  private phase: Phase = 'ready';
  private nextAt = 0;
  private geo: Geo | null = null;
  private trial: Trial | null = null;
  private curLevel = MIN_LEVEL;
  /** Zeit seit Bewegungsbeginn in s (beginnt bei −PRE_S), mit dt aufsummiert */
  private s = -PRE_S;
  private revealEndS = 0;
  private revealClock = 0;
  private idx = 0;
  private hits = 0;
  private late = 0;
  private points = 0;
  private trials: TrialRec[] = [];
  private tap: Pt | null = null;
  private err = 0;
  private ok = false;
  private capState = '';
  private secondHinted = false;

  constructor(private readonly ctx: ExerciseContext) {
    this.stair = new Staircase({ start: ctx.startLevel ?? MIN_LEVEL, min: MIN_LEVEL, max: MAX_LEVEL, down: 3, up: 1 });
    this.total = ctx.mode === 'demo' ? DEMO_TRIALS : ctx.quick ? QUICK_TRIALS : TRIALS;
  }

  private get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  private get level(): number {
    return this.demo ? DEMO_LEVEL : this.stair.level;
  }

  // -------------------------------------------------------------------------
  // Layout

  private layout(): Geo {
    const { w, h, u } = this.ctx.stage;
    const key = `${w}x${h}:${this.demo ? 1 : 0}`;
    if (this.geo && this.geo.key === key) return this.geo;
    const m = Math.max(10, u * 2.2);
    const top = this.demo ? captionBottom(this.ctx.stage) + 6 : m;
    const r = clamp(u * 2.4, 11, 22);
    const frame: Field = { minX: m, maxX: Math.max(m + 40, w - m), minY: top, maxY: Math.max(top + 40, h - m) };
    const inner: Field = { minX: frame.minX + r, maxX: frame.maxX - r, minY: frame.minY + r, maxY: frame.maxY - r };
    const short = Math.min(frame.maxX - frame.minX, frame.maxY - frame.minY);
    const hs = clamp(u * 13, 48, 110);
    this.geo = {
      key,
      frame,
      inner,
      r,
      short,
      tolPx: (hitTolPct(short) / 100) * short,
      rest: { x: w - hs * 0.6, y: h - hs * 0.5 },
    };
    // Bühne gedreht: laufenden Durchgang verwerfen (ohne Wertung) und neu beginnen
    if (this.trial && this.phase !== 'done') {
      if (this.phase === 'fly') {
        this.phase = 'ready';
        this.nextAt = this.ctx.now() + 600;
        this.ctx.ghost.clear();
      } else if (this.phase === 'reveal') {
        this.phase = 'ready';
        this.nextAt = this.ctx.now() + 400;
      }
      this.trial = null;
      this.tap = null;
    }
    return this.geo;
  }

  resize(): void {
    this.geo = null;
    this.layout();
  }

  // -------------------------------------------------------------------------
  // Ablauf

  start(t: number): void {
    const { ghost, texts } = this.ctx;
    const G = this.layout();
    this.phase = 'ready';
    this.nextAt = t + (this.demo ? DEMO_FIRST_MS : FIRST_MS);
    this.updateHud();
    if (this.demo) {
      this.setCaption('watch', texts.captions.watch);
      ghost.moveTo(G.rest.x, G.rest.y, { move: 0 });
    }
  }

  update(dt: number, t: number): void {
    if (this.phase === 'done') return;
    const tr = this.trial;
    if (this.phase === 'ready') {
      if (t >= this.nextAt) {
        if (this.idx >= this.total) this.end();
        else this.launch();
      }
    } else if (this.phase === 'fly' && tr) {
      this.s += dt;
      if (this.demo) this.setCaption(this.s >= tr.lead * 0.3 ? 'tap' : 'watch', this.s >= tr.lead * 0.3 ? this.ctx.texts.captions.tap : this.ctx.texts.captions.watch);
      if (this.s >= tr.lead) this.timeout();
    } else if (this.phase === 'reveal' && tr) {
      this.s += dt;
      this.revealClock += dt;
      if (this.s >= this.revealEndS) this.afterReveal(t);
    }
  }

  private launch(): void {
    const { rng, stage, hud, texts } = this.ctx;
    const G = this.layout();
    this.curLevel = this.level;
    const u = stage.u;
    this.trial = makeTrial(
      {
        field: G.inner,
        r: G.r,
        level: this.curLevel,
        minSpeed: 4 * u,
        maxSpeed: 45 * u,
        fixed: this.demo ? DEMO_FIXED[this.idx % DEMO_FIXED.length] : undefined,
      },
      rng,
    );
    this.phase = 'fly';
    this.s = -PRE_S;
    this.tap = null;
    this.revealClock = 0;
    if (!this.demo && this.trial.asked === 2 && !this.secondHinted) {
      this.secondHinted = true;
      hud.toast(texts.feedback.secondHint, 'info', { x: stage.w / 2, y: stage.h * 0.16, ms: 2600, size: clamp(stage.u * 4, 16, 30) });
    }
    if (this.demo) this.setCaption('watch', texts.captions.watch);
    this.updateHud();
    if (this.ctx.autoplay) this.planGhost();
  }

  pointerDown(p: PointerInfo): void {
    const tr = this.trial;
    if (this.phase !== 'fly' || !tr || this.s < 0) return;
    // nur der erste Tipp je Durchgang zählt
    const G = this.layout();
    this.tap = { x: p.x, y: p.y };
    this.err = errorPct(this.tap, tr.contact, G.short);
    this.ok = isHit(this.err, G.short);
    this.finishTrial(false);
  }

  private timeout(): void {
    this.tap = null;
    this.err = NaN;
    this.ok = false;
    this.finishTrial(true);
  }

  private finishTrial(late: boolean): void {
    const { sfx, hud, fmt, stage } = this.ctx;
    const tr = this.trial;
    if (!tr) return;
    const G = this.layout();
    if (late) {
      this.late++;
      sfx.bad();
    } else if (this.ok) {
      this.hits++;
      this.points += pointsFor(this.err, this.curLevel, G.short);
      sfx.good();
    } else {
      sfx.bad();
    }
    this.trials.push({ level: this.curLevel, ok: this.ok, late, err: this.err });
    if (!this.demo) this.stair.update(this.ok);
    this.idx++;
    this.updateHud();
    this.phase = 'reveal';
    this.revealClock = 0;
    this.revealEndS = Math.max(tr.lead, this.s) + REVEAL_HOLD_S;
    // Text ins Feld hinein, weg vom Rand
    const size = clamp(stage.u * 5, 18, 40);
    const label = late ? this.ctx.texts.feedback.late : `${this.ok ? '✓' : '✗'} ${fmt.num(this.err, 1)} %`;
    const half = Math.min(stage.w / 2, label.length * size * 0.32 + 10);
    const cx = (G.frame.minX + G.frame.maxX) / 2;
    const cy = (G.frame.minY + G.frame.maxY) / 2;
    const dx = cx - tr.contact.x;
    const dy = cy - tr.contact.y;
    const dl = Math.max(1, Math.hypot(dx, dy));
    const off = G.tolPx + size * 1.6;
    hud.toast(label, this.ok ? 'good' : 'bad', {
      x: clamp(tr.contact.x + (dx / dl) * off, half, stage.w - half),
      y: clamp(tr.contact.y + (dy / dl) * off, size * 1.2, stage.h - size),
      ms: 1000,
      size,
    });
    if (this.demo) this.setCaption('check', this.ctx.texts.captions.check);
  }

  private afterReveal(t: number): void {
    const { rng } = this.ctx;
    this.phase = 'ready';
    this.trial = null;
    this.tap = null;
    if (this.idx >= this.total) {
      this.nextAt = t + END_DELAY_MS;
      return;
    }
    this.nextAt = t + (this.demo ? DEMO_GAP_MS : rng.range(GAP_MS[0], GAP_MS[1]));
    if (this.demo) this.setCaption('watch', this.ctx.texts.captions.watch);
  }

  private setCaption(state: string, txt: string): void {
    if (this.capState === state) return;
    this.capState = state;
    this.ctx.hud.caption(txt, 'top');
  }

  private updateHud(): void {
    const { hud, texts } = this.ctx;
    hud.setProgress(this.idx / this.total);
    hud.setScore(this.demo ? null : this.hits);
    const lv = Math.floor(this.level + 1e-9);
    hud.setLabel(`${texts.feedback.level} ${lv}${askedBounceFor(lv) === 2 ? ` · ${texts.feedback.second}` : ''}`);
  }

  // -------------------------------------------------------------------------
  // Geister-Hand

  /** Film und Autoplay: Hand tippt einige Zeit vor dem Abprall an den Berührungspunkt */
  private planGhost(): void {
    const { ghost, rng, stage } = this.ctx;
    const tr = this.trial;
    if (!tr) return;
    const G = this.layout();
    ghost.clear();
    if (!this.demo && rng.chance(0.06)) return;
    let tp: Pt;
    if (this.demo) {
      // knapp innerhalb des Berührungspunkts
      const cx = (G.frame.minX + G.frame.maxX) / 2;
      const cy = (G.frame.minY + G.frame.maxY) / 2;
      const dx = cx - tr.contact.x;
      const dy = cy - tr.contact.y;
      const dl = Math.max(1, Math.hypot(dx, dy));
      tp = { x: tr.contact.x + (dx / dl) * G.short * 0.015, y: tr.contact.y + (dy / dl) * G.short * 0.015 };
    } else tp = noisyTap(tr.contact, 1.2 + 0.3 * this.curLevel, G.short, rng);
    tp = { x: clamp(tp.x, 10, stage.w - 10), y: clamp(tp.y, 10, stage.h - 10) };
    const move = this.demo ? 620 : rng.range(330, 480);
    const arrive = (PRE_S + tr.lead * (this.demo ? 0.62 : rng.range(0.45, 0.8))) * 1000;
    ghost.tap(tp.x, tp.y, { delay: Math.max(0, arrive - move), move });
    ghost.moveTo(G.rest.x, G.rest.y, { delay: 500, move: 520 });
  }

  // -------------------------------------------------------------------------

  private end(): void {
    this.phase = 'done';
    const { ctx } = this;
    if (this.demo) {
      ctx.hud.caption(null);
      ctx.finish({
        primary: { key: 'level', value: DEMO_LEVEL, unit: 'level', better: 'higher' },
        secondary: [{ key: 'hits', value: this.hits, unit: 'count' }],
        score: this.points,
        level: MIN_LEVEL,
      });
      return;
    }
    ctx.hud.setProgress(1);
    ctx.sfx.done();
    const n = this.trials.length;
    const thr = this.stair.threshold();
    const mean = meanError(this.trials.filter((r) => !r.late).map((r) => r.err));
    const acc = n ? (100 * this.hits) / n : 0;
    const maxLevel = this.trials.reduce((m, tr) => Math.max(m, tr.level), MIN_LEVEL);
    let tip = 'great';
    if (this.late >= Math.max(2, Math.ceil(n * 0.2))) tip = 'late';
    else if (Number.isFinite(mean) && mean > 12) tip = 'far';
    ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), MIN_LEVEL, MAX_LEVEL), unit: 'level', better: 'higher' },
      secondary: [
        ...(Number.isFinite(mean) ? [{ key: 'meanError', value: Math.round(mean * 10) / 10, unit: 'percent' as const }] : []),
        { key: 'accuracy', value: Math.round(acc), unit: 'percent' as const },
        { key: 'maxLevel', value: Math.floor(maxLevel + 1e-9), unit: 'level' as const },
      ],
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip,
    });
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  private pos(tr: Trial): Pt {
    const G = this.layout();
    return positionAt(tr.start, tr.dir, G.inner, Math.max(0, this.s) * tr.speed);
  }

  render(g: CanvasRenderingContext2D): void {
    const { w, h, dpr } = this.ctx.stage;
    const G = this.layout();
    background(g, w, h, dpr);
    this.drawFrame(g, G);
    const tr = this.trial;
    if (!tr) return;
    if (!this.demo && (this.phase === 'fly' || this.phase === 'ready')) this.drawAsk(g, G, tr);
    if (this.phase === 'reveal') this.drawReveal(g, G, tr);
    this.drawTarget(g, G, tr);
  }

  /** Rahmen = Fangfeld: hier prallt das Ziel ab */
  private drawFrame(g: CanvasRenderingContext2D, G: Geo): void {
    const f = G.frame;
    const { u } = this.ctx.stage;
    g.save();
    rrPath(g, f.minX, f.minY, f.maxX - f.minX, f.maxY - f.minY, Math.max(8, u * 1.6));
    g.strokeStyle = 'rgba(190,212,245,0.5)';
    g.lineWidth = Math.max(3, u * 0.5);
    g.stroke();
    // zweiter, gestrichelter Rand ein Stück innen: zeigt, wie nah das Ziel dem Rand kommt
    rrPath(g, f.minX + G.r * 2, f.minY + G.r * 2, f.maxX - f.minX - G.r * 4, f.maxY - f.minY - G.r * 4, Math.max(6, u));
    g.setLineDash([Math.max(6, u * 1.1), Math.max(8, u * 1.4)]);
    g.strokeStyle = 'rgba(190,212,245,0.12)';
    g.lineWidth = 2;
    g.stroke();
    g.restore();
  }

  private drawAsk(g: CanvasRenderingContext2D, G: Geo, tr: Trial): void {
    const f = G.frame;
    const { u } = this.ctx.stage;
    const size = clamp(u * 3.6, 14, 26);
    text(g, tr.asked === 2 ? this.ctx.texts.feedback.ask2 : this.ctx.texts.feedback.ask1, (f.minX + f.maxX) / 2, (f.minY + f.maxY) / 2, size, C.fg, { weight: 700, alpha: 0.3 });
  }

  private drawTarget(g: CanvasRenderingContext2D, G: Geo, tr: Trial): void {
    const p = this.pos(tr);
    const fade = this.ctx.reducedMotion ? 1 : clamp((this.s + PRE_S) / FADE_S, 0, 1);
    // Schweif (zeigt die Richtung; folgt der Bahn auch um Ecken)
    if (this.s > 0) {
      const steps = 6;
      for (let k = steps; k >= 1; k--) {
        const sp = Math.max(0, this.s - k * 0.04) * tr.speed;
        const q = positionAt(tr.start, tr.dir, G.inner, sp);
        g.save();
        g.globalAlpha = 0.32 * (1 - k / (steps + 1));
        circle(g, q.x, q.y, G.r * (1 - k * 0.09), TARGET);
        g.restore();
      }
    }
    g.save();
    g.globalAlpha = fade;
    orb(g, p.x, p.y, G.r, TARGET, { glow: 0.6 });
    ring(g, p.x, p.y, G.r + 2.5, 'rgba(255,255,255,0.55)', 1.8);
    g.restore();
  }

  /** Auflösung: wo das Ziel abprallt, der eigene Tipp und die Wertung */
  private drawReveal(g: CanvasRenderingContext2D, G: Geo, tr: Trial): void {
    const im = tr.impacts[tr.asked - 1];
    if (!im) return;
    const fade = this.ctx.reducedMotion ? 1 : easeOut(clamp(this.revealClock / FADE_S, 0, 1));
    const c = tr.contact;
    g.save();
    g.globalAlpha = fade;
    // Trefferkreis um den Berührungspunkt
    ring(g, c.x, c.y, G.tolPx, 'rgba(232,238,247,0.6)', 2.5, [8, 7]);
    // Stelle des Abpralls: Ring in Zielgröße, an der Wand anliegend
    glow(g, im.x, im.y, G.r, TARGET, 0.25);
    ring(g, im.x, im.y, G.r + 1, TARGET, 2.6, [5, 4]);
    circle(g, c.x, c.y, Math.max(3, G.r * 0.2), C.white);
    if (this.tap) {
      const tp = this.tap;
      g.strokeStyle = 'rgba(232,238,247,0.4)';
      g.lineWidth = 2;
      g.setLineDash([4, 5]);
      g.beginPath();
      g.moveTo(tp.x, tp.y);
      g.lineTo(c.x, c.y);
      g.stroke();
      g.setLineDash([]);
      const k = 13;
      g.lineCap = 'round';
      g.strokeStyle = 'rgba(11,20,36,0.85)';
      g.lineWidth = 7;
      g.beginPath();
      g.moveTo(tp.x - k, tp.y);
      g.lineTo(tp.x + k, tp.y);
      g.moveTo(tp.x, tp.y - k);
      g.lineTo(tp.x, tp.y + k);
      g.stroke();
      g.strokeStyle = TAP;
      g.lineWidth = 3.5;
      g.stroke();
      ring(g, tp.x, tp.y, k + 4, TAP, 2.5);
    }
    // Wertung als Abzeichen (✓ / ✗), ins Feld hinein versetzt
    const cx = (G.frame.minX + G.frame.maxX) / 2;
    const cy = (G.frame.minY + G.frame.maxY) / 2;
    const dx = cx - c.x;
    const dy = cy - c.y;
    const dl = Math.max(1, Math.hypot(dx, dy));
    const rad = clamp(G.r * 0.9, 11, 18);
    const bo = G.tolPx * 0.75;
    drawBadge(g, c.x + (dx / dl) * bo + (-dy / dl) * bo * 0.5, c.y + (dy / dl) * bo + (dx / dl) * bo * 0.5, rad, this.ok ? 'ok' : 'bad');
    g.restore();
  }
}

export const abprallFang: ExerciseDefinition = {
  id: 'abprall-fang',
  category: 'bewegung',
  minutes: 2,
  color: '#2D72B8',
  showsLevel: true,
  icon:
    '<rect x="5" y="7" width="38" height="34" rx="4" fill="none" stroke="currentColor" stroke-width="3"/><path d="M12 33L29 10 40 25" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="1 5.5"/><circle cx="14.5" cy="30" r="4.4" fill="currentColor"/><circle cx="29" cy="10.5" r="4.2" fill="none" stroke="currentColor" stroke-width="2.4" stroke-dasharray="3 2.6"/>',
  texts: { de, it },
  create: (ctx) => new AbprallFang(ctx),
};
