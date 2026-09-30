/**
 * In die Bahn – ein Ziel läuft wiederholt über dieselbe Bahn; setze den Finger vorab auf die Stelle der Bahn,
 * durch die es gleich laufen wird, und halte ihn ruhig.
 *
 * Vorbild: „Reaktionskette“ (Katalog 805, Reaction Chain). Das Original ist ein Maus-Spiel mit Zeigersperre:
 * Fadenkreuz in die Bahn eines Punkts stellen und stillhalten; entschieden wird beim ersten Kontakt nach
 * „Verschiebung pro Bild“ (bildratenabhängig), mit Zeitstrafe, Rotblitz und Bildwackeln. Hier ist es die Touch-Fassung
 * als Tipp-und-Halte-Aufgabe:
 *
 * - Jeder Durchgang: erst läuft das Ziel einmal zum Zuschauen über die Bahn, dann läuft es noch einmal – in dieser Zeit
 *   setzt du den Finger auf einen Punkt der Bahn und lässt ihn liegen. Die Bahn ist auf niedrigen Stufen als Linie zu sehen,
 *   danach nur noch als kurze Spur hinter dem Ziel, ab Stufe 6 mit Bogen.
 * - Gewertet wird am Durchlaufpunkt: Abstand zwischen Fingerstelle und Bahn, in % der kürzeren Feldseite (Treffer ≤ 5,5 %,
 *   mindestens 28 px). Der Finger muss bis dahin liegen bleiben (Abheben: nochmal aufsetzen; wandern: „nicht ruhig“).
 *   Der Tipp muss mindestens 0,3 s vor dem Durchlauf liegen – danach zählt er als zu spät und wird nicht gewertet.
 * - Zeit statt Bildfrequenz: Die Durchlaufzeit (3,6 s → 1,5 s) ist die Stufe; Bewegung mit dt.
 * - Staircase 3-down/1-up (≈ 79 % Treffer). Feste Zahl an Durchgängen (10), keine Zeitstrafe, kein Rot, kein Blitz, kein Wackeln.
 * - Hauptwert: Stufe. Zusatz: mittlere Abweichung (%), Trefferquote, höchste Stufe.
 * - Die Engine kann nur Tipps simulieren: Die Geister-Hand tippt und bleibt liegen (Autoplay hebt nie ab).
 * - Gemessen wird nur, wo du den Finger hinsetzt – nicht, wohin die Augen schauen.
 */
import { background, C, circle, glow, orb, ring, text, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { captionBottom, drawBadge } from '../_shared/zeichenaufgabe';
import {
  errorPct,
  type Field,
  GUIDE_UNTIL_LEVEL,
  HOLD_RADIUS_U,
  hitTolPct,
  isHit,
  makeRoute,
  MAX_LEVEL,
  meanError,
  MIN_LEAD_S,
  MIN_LEVEL,
  type Nearest,
  nearestOnRoute,
  noisyTap,
  passSecondsFor,
  pointsFor,
  type Pt,
  type Route,
  routePoint,
  traceSecondsFor,
} from './logic';
import { de, it } from './texts';

const TRIALS = 10;
const QUICK_TRIALS = 3;
const DEMO_TRIALS = 1;
/** Das Ziel erscheint zunächst ruhig am Start (s) */
const PRE_SHOW_S = 0.35;
const PRE_FANG_S = 0.5;
const GAP_S = 0.9;
const DEMO_GAP_S = 1.7;
const REVEAL_S = 1.3;
const FADE_S = 0.25;
const FIRST_MS = 900;
const GAP_MS: [number, number] = [450, 750];
const END_DELAY_MS = 600;
const DEMO_FIRST_MS = 1300;
const DEMO_PASS_S = 2.6;
const DEMO_LEVEL = 2;

const TARGET = '#FDE68A';
const TAP = C.info;

const DEMO_ROUTE = { ax: 0.08, ay: 0.3, bx: 0.92, by: 0.74 };

type Phase = 'ready' | 'show' | 'gap' | 'fang' | 'reveal' | 'done';
type Outcome = 'hit' | 'miss' | 'late' | 'early' | 'drift';

interface Geo {
  key: string;
  field: Field;
  short: number;
  tolPx: number;
  holdPx: number;
  r: number;
  rest: Pt;
}

interface TrialRec {
  level: number;
  ok: boolean;
  err: number;
  outcome: Outcome;
}

class InDieBahn implements Exercise {
  private readonly stair: Staircase;
  private readonly total: number;
  private phase: Phase = 'ready';
  private nextAt = 0;
  private geo: Geo | null = null;
  // Durchgang
  private route: Route | null = null;
  private curLevel = MIN_LEVEL;
  private passSeconds = 3;
  private speed = 100;
  /** Zeit seit Beginn des Laufs in s (vor dem Start negativ) */
  private passS = 0;
  private gapS = 0;
  private revealClock = 0;
  private tap: Pt | null = null;
  private held = false;
  private holdId = -99;
  private lifted = false;
  private drifted = false;
  private near: Nearest | null = null;
  private outcome: Outcome = 'late';
  private err = NaN;
  private judged = false;
  private hintAt = -1e9;
  // Auswertung
  private idx = 0;
  private hits = 0;
  private points = 0;
  private trials: TrialRec[] = [];
  private capState = '';

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

  private get gapSeconds(): number {
    return this.demo ? DEMO_GAP_S : GAP_S;
  }

  // -------------------------------------------------------------------------
  // Layout

  private layout(): Geo {
    const { w, h, u } = this.ctx.stage;
    const key = `${w}x${h}:${this.demo ? 1 : 0}`;
    if (this.geo && this.geo.key === key) return this.geo;
    const m = Math.max(14, u * 4);
    const top = this.demo ? captionBottom(this.ctx.stage) + 10 : m;
    const field: Field = { minX: m, maxX: Math.max(m + 60, w - m), minY: top, maxY: Math.max(top + 60, h - m) };
    const short = Math.min(field.maxX - field.minX, field.maxY - field.minY);
    const hs = clamp(u * 13, 48, 110);
    this.geo = {
      key,
      field,
      short,
      tolPx: (hitTolPct(short) / 100) * short,
      holdPx: Math.max(18, HOLD_RADIUS_U * Math.max(u, 5)),
      r: clamp(u * 2.4, 11, 22),
      rest: { x: w - hs * 0.6, y: h - hs * 0.5 },
    };
    // Bühne gedreht: laufenden Durchgang verwerfen (ohne Wertung) und neu beginnen
    if (this.route && this.phase !== 'done') {
      this.abortTrial();
    }
    return this.geo;
  }

  resize(): void {
    this.geo = null;
    this.layout();
  }

  private abortTrial(): void {
    this.route = null;
    this.tap = null;
    this.held = false;
    this.phase = 'ready';
    this.nextAt = this.ctx.now() + 600;
    this.ctx.ghost.clear();
  }

  // -------------------------------------------------------------------------
  // Ablauf

  start(t: number): void {
    const { ghost } = this.ctx;
    const G = this.layout();
    this.phase = 'ready';
    this.nextAt = t + (this.demo ? DEMO_FIRST_MS : FIRST_MS);
    this.updateHud();
    if (this.demo) {
      this.setCaption('watch', this.ctx.texts.captions.watch);
      ghost.moveTo(G.rest.x, G.rest.y, { move: 0 });
    }
  }

  update(dt: number, t: number): void {
    if (this.phase === 'done') return;
    const R = this.route;
    if (this.phase === 'ready') {
      if (t >= this.nextAt) {
        if (this.idx >= this.total) this.end();
        else this.begin();
      }
      return;
    }
    if (!R) return;
    if (this.phase === 'show') {
      this.passS += dt;
      if (this.passS * this.speed >= R.length) {
        this.phase = 'gap';
        this.gapS = 0;
        this.setCaption('place', this.ctx.texts.captions.place);
        if (this.ctx.autoplay) this.planGhost();
      }
    } else if (this.phase === 'gap') {
      this.gapS += dt;
      if (this.gapS >= this.gapSeconds) {
        this.phase = 'fang';
        this.passS = -PRE_FANG_S;
        if (this.demo) this.setCaption(this.held ? 'hold' : 'place', this.held ? this.ctx.texts.captions.hold : this.ctx.texts.captions.place);
      }
    } else if (this.phase === 'fang') {
      this.passS += dt;
      const s = this.passS * this.speed;
      if (!this.judged && this.held && this.tap && this.near && s >= this.near.s) this.evaluate();
      else if (!this.judged && s >= R.length) this.noTap();
    } else if (this.phase === 'reveal') {
      this.passS += dt;
      this.revealClock += dt;
      if (this.revealClock >= REVEAL_S) this.afterReveal(t);
    }
  }

  private begin(): void {
    const { rng, stage } = this.ctx;
    const G = this.layout();
    this.curLevel = this.level;
    this.route = makeRoute({ field: G.field, level: this.curLevel, fixed: this.demo ? DEMO_ROUTE : undefined }, rng);
    this.passSeconds = this.demo ? DEMO_PASS_S : passSecondsFor(this.curLevel);
    this.speed = this.route.length / this.passSeconds;
    this.passS = -PRE_SHOW_S;
    this.gapS = 0;
    this.revealClock = 0;
    this.tap = null;
    this.near = null;
    this.held = false;
    this.lifted = false;
    this.drifted = false;
    this.judged = false;
    this.err = NaN;
    this.phase = 'show';
    this.updateHud();
    if (this.demo) this.setCaption('watch', this.ctx.texts.captions.watch);
    else
      this.ctx.hud.toast(this.ctx.texts.feedback.watch, 'info', {
        x: stage.w / 2,
        y: Math.max(28, G.field.minY + 10),
        ms: 1500,
        size: clamp(stage.u * 3.6, 15, 26),
      });
  }

  /** Bis zum Durchlauf nichts getippt oder wieder abgehoben */
  private noTap(): void {
    this.outcome = this.lifted ? 'early' : 'late';
    this.err = NaN;
    this.finishTrial();
  }

  /** Das Ziel erreicht den Punkt der Bahn, der dem Finger am nächsten liegt */
  private evaluate(): void {
    const G = this.layout();
    const near = this.near!;
    this.err = errorPct(near.dist, G.short);
    if (this.drifted) {
      this.outcome = 'drift';
    } else {
      this.outcome = isHit(this.err, G.short) ? 'hit' : 'miss';
    }
    this.finishTrial();
  }

  private finishTrial(): void {
    const { sfx, hud, fmt, stage, texts } = this.ctx;
    const G = this.layout();
    this.judged = true;
    const ok = this.outcome === 'hit';
    if (ok) {
      this.hits++;
      this.points += pointsFor(this.err, this.curLevel, G.short);
      sfx.good();
    } else sfx.bad();
    const measured = this.outcome === 'hit' || this.outcome === 'miss';
    this.trials.push({ level: this.curLevel, ok, err: measured ? this.err : NaN, outcome: this.outcome });
    if (!this.demo) this.stair.update(ok);
    this.idx++;
    this.updateHud();
    this.phase = 'reveal';
    this.revealClock = 0;
    this.held = false;
    const size = clamp(stage.u * 5, 18, 40);
    let label: string;
    if (measured) label = `${ok ? '✓' : '✗'} ${fmt.num(this.err, 1)} %`;
    else label = this.outcome === 'late' ? texts.feedback.late : this.outcome === 'early' ? texts.feedback.early : texts.feedback.drift;
    const half = Math.min(stage.w / 2, label.length * size * 0.32 + 10);
    const at = this.near && this.tap ? this.near.point : { x: stage.w / 2, y: stage.h * 0.5 };
    hud.toast(label, ok ? 'good' : 'bad', {
      x: clamp(at.x, half, stage.w - half),
      y: clamp(at.y - G.tolPx - size * 1.4, size * 1.2, stage.h - size),
      ms: 1100,
      size,
    });
    if (this.demo) this.setCaption('check', texts.captions.check);
    if (this.ctx.autoplay) {
      this.ctx.ghost.moveTo(G.rest.x, G.rest.y, { delay: 500, move: 520 });
    }
  }

  private afterReveal(t: number): void {
    const { rng } = this.ctx;
    this.phase = 'ready';
    this.route = null;
    this.tap = null;
    this.near = null;
    this.held = false;
    if (this.idx >= this.total) {
      this.nextAt = t + END_DELAY_MS;
      return;
    }
    this.nextAt = t + (this.demo ? 500 : rng.range(GAP_MS[0], GAP_MS[1]));
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
    hud.setLabel(`${texts.feedback.level} ${Math.floor(this.level + 1e-9)}`);
  }

  // -------------------------------------------------------------------------
  // Eingabe

  pointerDown(p: PointerInfo): void {
    const R = this.route;
    if (!R || this.judged || this.held) return;
    if (this.phase !== 'gap' && this.phase !== 'fang') {
      if (this.phase === 'show') this.hint(p, this.ctx.texts.feedback.wait);
      return;
    }
    const pt = { x: p.x, y: p.y };
    const near = nearestOnRoute(R, pt);
    // Zeit bis das Ziel diesen Punkt der Bahn erreicht
    const timeToPass = this.phase === 'gap' ? this.gapSeconds - this.gapS + PRE_FANG_S + near.s / this.speed : near.s / this.speed - this.passS;
    if (timeToPass < MIN_LEAD_S) {
      this.hint(p, this.ctx.texts.feedback.earlier);
      return;
    }
    this.tap = pt;
    this.near = near;
    this.held = true;
    this.holdId = p.id;
    this.lifted = false;
    this.drifted = false;
    this.ctx.sfx.tap();
    if (this.demo) this.setCaption('hold', this.ctx.texts.captions.hold);
  }

  pointerMove(p: PointerInfo): void {
    if (!this.held || p.id !== this.holdId || !this.tap || this.judged) return;
    if (!this.drifted && Math.hypot(p.x - this.tap.x, p.y - this.tap.y) > this.layout().holdPx) {
      this.drifted = true;
      this.hint(p, this.ctx.texts.feedback.steady);
    }
  }

  pointerUp(p: PointerInfo): void {
    if (!this.held || p.id !== this.holdId) return;
    this.held = false;
    if (this.judged) return;
    // Abgehoben, bevor das Ziel durch war: Fangpunkt gilt nicht mehr, neu aufsetzen ist möglich
    this.lifted = true;
    this.tap = null;
    this.near = null;
    if (this.demo) this.setCaption('place', this.ctx.texts.captions.place);
  }

  /** Kurzer Hinweis (nicht bei jedem Tipp) */
  private hint(p: PointerInfo, txt: string): void {
    if (this.demo || p.t - this.hintAt < 2500) return;
    this.hintAt = p.t;
    const { stage } = this.ctx;
    const size = clamp(stage.u * 3.6, 15, 26);
    this.ctx.hud.toast(txt, 'info', { x: clamp(p.x, 120, stage.w - 120), y: clamp(p.y - size * 3, size * 1.4, stage.h - size), ms: 1500, size });
  }

  // -------------------------------------------------------------------------
  // Geister-Hand

  /** Film und Autoplay: Hand tippt einen Punkt der Bahn und bleibt dort liegen */
  private planGhost(): void {
    const { ghost, rng } = this.ctx;
    const R = this.route;
    if (!R) return;
    const G = this.layout();
    ghost.clear();
    if (!this.demo && rng.chance(0.05)) return;
    const sAim = R.length * (this.demo ? 0.62 : rng.range(0.35, 0.85));
    const aim = routePoint(R, sAim);
    let tp: Pt;
    if (this.demo) tp = aim;
    else if (rng.chance(0.08)) tp = { x: aim.x + (rng.chance(0.5) ? 1 : -1) * G.short * rng.range(0.12, 0.2), y: aim.y + G.short * rng.range(-0.1, 0.1) };
    else tp = noisyTap(aim, 0.8 + 0.25 * this.curLevel, G.short, rng);
    tp = { x: clamp(tp.x, 10, this.ctx.stage.w - 10), y: clamp(tp.y, 10, this.ctx.stage.h - 10) };
    const move = this.demo ? 650 : rng.range(330, 480);
    // Der Tipp liegt mindestens 0,6 s vor dem Durchlauf
    const passAt = this.gapSeconds + PRE_FANG_S + sAim / this.speed;
    const lead = this.demo ? 1.7 : rng.range(0.7, 1.6);
    const tapAt = Math.max(move / 1000 + 0.1, passAt - lead);
    ghost.tap(tp.x, tp.y, { delay: Math.max(0, tapAt * 1000 - move), move });
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
    const mean = meanError(this.trials.map((r) => r.err));
    const acc = n ? (100 * this.hits) / n : 0;
    const maxLevel = this.trials.reduce((m, tr) => Math.max(m, tr.level), MIN_LEVEL);
    const count = (o: Outcome) => this.trials.filter((r) => r.outcome === o).length;
    let tip = 'great';
    if (count('late') + count('early') >= Math.max(2, Math.ceil(n * 0.2))) tip = 'early';
    else if (count('drift') >= 2) tip = 'steady';
    else if (Number.isFinite(mean) && mean > 10) tip = 'far';
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

  render(g: CanvasRenderingContext2D): void {
    const { w, h, dpr } = this.ctx.stage;
    const G = this.layout();
    background(g, w, h, dpr);
    const R = this.route;
    if (!R) return;
    const sT = clamp(this.passS, 0, Infinity) * this.speed;
    this.drawRoute(g, R, sT);
    if (this.phase === 'reveal') this.drawReveal(g, G);
    else this.drawHoldMark(g, G);
    if (this.phase === 'gap' || this.phase === 'fang' || this.phase === 'show') this.drawCue(g, G);
    this.drawTarget(g, G, R, sT);
  }

  private visiblePass(): boolean {
    if (this.phase === 'show' || this.phase === 'fang') return true;
    if (this.phase === 'reveal') return this.passS * this.speed < (this.route?.length ?? 0) + this.speed * FADE_S;
    return false;
  }

  /** Linie: auf niedrigen Stufen die ganze Bahn, sonst nur eine Spur hinter dem Ziel */
  private drawRoute(g: CanvasRenderingContext2D, R: Route, sT: number): void {
    const { u } = this.ctx.stage;
    const guide = this.curLevel <= GUIDE_UNTIL_LEVEL;
    const trace = traceSecondsFor(this.curLevel);
    const showAll = guide || this.phase === 'reveal';
    if (showAll) {
      this.strokeRoute(g, R, 0, R.length, Math.max(2.5, u * 0.5), 'rgba(190,212,245,0.32)', [Math.max(6, u * 1.1), Math.max(8, u * 1.4)]);
    }
    if (this.visiblePass() && sT > 0) {
      const back = Number.isFinite(trace) ? Math.min(sT, this.speed * trace) : Math.min(sT, this.speed * 0.6);
      // Spur in Abschnitten mit nach hinten abnehmender Deckkraft
      const n = 12;
      for (let i = 0; i < n; i++) {
        const s1 = sT - (back * i) / n;
        const s0 = sT - (back * (i + 1)) / n;
        const a = 0.55 * (1 - i / n);
        this.strokeRoute(g, R, Math.max(0, s0), Math.max(0, s1), Math.max(3, u * 0.7), withAlpha(TARGET, a));
      }
    }
  }

  private strokeRoute(g: CanvasRenderingContext2D, R: Route, s0: number, s1: number, width: number, color: string, dash?: number[]): void {
    if (s1 - s0 < 0.5) return;
    g.save();
    g.beginPath();
    const step = Math.max(6, (s1 - s0) / 60);
    let first = true;
    for (let s = s0; s < s1 + step; s += step) {
      const p = routePoint(R, Math.min(s, s1));
      if (first) g.moveTo(p.x, p.y);
      else g.lineTo(p.x, p.y);
      first = false;
    }
    g.lineWidth = width;
    g.lineCap = 'round';
    g.lineJoin = 'round';
    g.strokeStyle = color;
    if (dash) g.setLineDash(dash);
    g.stroke();
    g.restore();
  }

  private drawTarget(g: CanvasRenderingContext2D, G: Geo, R: Route, sT: number): void {
    if (!this.visiblePass()) return;
    const p = routePoint(R, sT);
    let a = 1;
    if (!this.ctx.reducedMotion) {
      if (this.passS < 0) a = clamp((this.passS + (this.phase === 'show' ? PRE_SHOW_S : PRE_FANG_S)) / FADE_S, 0, 1);
      else if (sT > R.length) a = clamp(1 - (sT - R.length) / (this.speed * FADE_S), 0, 1);
    }
    g.save();
    g.globalAlpha = a;
    orb(g, p.x, p.y, G.r, TARGET, { glow: 0.6 });
    ring(g, p.x, p.y, G.r + 2.5, 'rgba(255,255,255,0.55)', 1.8);
    g.restore();
  }

  /** Markierung der gewählten Stelle, solange der Finger liegt */
  private drawHoldMark(g: CanvasRenderingContext2D, G: Geo): void {
    if (!this.tap || !this.held) return;
    const { u } = this.ctx.stage;
    glow(g, this.tap.x, this.tap.y, G.r * 0.9, TAP, 0.35);
    ring(g, this.tap.x, this.tap.y, Math.max(12, u * 2), 'rgba(255,255,255,0.75)', 2.5);
    circle(g, this.tap.x, this.tap.y, Math.max(3, u * 0.5), TAP);
  }

  private drawCue(g: CanvasRenderingContext2D, G: Geo): void {
    if (this.demo || this.held) return;
    const f = G.field;
    const { u } = this.ctx.stage;
    const size = clamp(u * 3.4, 14, 24);
    const txt = this.phase === 'show' ? this.ctx.texts.feedback.watch : this.ctx.texts.feedback.now;
    text(g, txt, (f.minX + f.maxX) / 2, f.maxY - size * 0.6, size, C.fg, { weight: 700, alpha: 0.4 });
  }

  /** Auflösung: Durchlaufpunkt, Toleranzkreis, eigene Fingerstelle und Wertung */
  private drawReveal(g: CanvasRenderingContext2D, G: Geo): void {
    const fade = this.ctx.reducedMotion ? 1 : easeOut(clamp(this.revealClock / FADE_S, 0, 1));
    const near = this.near;
    const tap = this.tap;
    if (!near || !tap) return;
    const c = near.point;
    const ok = this.outcome === 'hit';
    g.save();
    g.globalAlpha = fade;
    ring(g, c.x, c.y, G.tolPx, 'rgba(232,238,247,0.6)', 2.5, [8, 7]);
    glow(g, c.x, c.y, G.r, TARGET, 0.25);
    ring(g, c.x, c.y, G.r + 1, TARGET, 2.6, [5, 4]);
    circle(g, c.x, c.y, Math.max(3, G.r * 0.2), C.white);
    g.strokeStyle = 'rgba(232,238,247,0.4)';
    g.lineWidth = 2;
    g.setLineDash([4, 5]);
    g.beginPath();
    g.moveTo(tap.x, tap.y);
    g.lineTo(c.x, c.y);
    g.stroke();
    g.setLineDash([]);
    const k = 13;
    g.lineCap = 'round';
    g.strokeStyle = 'rgba(11,20,36,0.85)';
    g.lineWidth = 7;
    g.beginPath();
    g.moveTo(tap.x - k, tap.y);
    g.lineTo(tap.x + k, tap.y);
    g.moveTo(tap.x, tap.y - k);
    g.lineTo(tap.x, tap.y + k);
    g.stroke();
    g.strokeStyle = TAP;
    g.lineWidth = 3.5;
    g.stroke();
    ring(g, tap.x, tap.y, k + 4, TAP, 2.5);
    const rad = clamp(G.r * 0.9, 11, 18);
    drawBadge(g, c.x + G.tolPx * 0.72, c.y - G.tolPx * 0.72, rad, ok ? 'ok' : 'bad');
    g.restore();
  }
}

export const inDieBahn: ExerciseDefinition = {
  id: 'in-die-bahn',
  category: 'bewegung',
  minutes: 2,
  color: '#2C6FB0',
  showsLevel: true,
  icon:
    '<path d="M5 37C15 33 28 18 43 11" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="1 5.5"/><circle cx="10" cy="35.5" r="4.4" fill="currentColor"/><circle cx="28" cy="22" r="6.4" fill="none" stroke="currentColor" stroke-width="2.6" stroke-dasharray="3.5 2.8"/><circle cx="28" cy="22" r="2" fill="currentColor"/>',
  texts: { de, it },
  create: (ctx) => new InDieBahn(ctx),
};
