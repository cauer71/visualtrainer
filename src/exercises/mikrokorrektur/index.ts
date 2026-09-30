/**
 * Mikrokorrektur – großes Ankerziel antippen, dann das kleine Nachziel in der Nähe treffen.
 *
 * Vorbild: „Mikrokorrektur & Headshot-Präzision“ (Katalog 509). Das Original ist eine Mausübung mit
 * Fadenkreuz, Zeitbonus und Bildschirmwackeln. Hier tippt man direkt: erst ein großes Ankerziel, das
 * sofort weich verschwindet; im gleichen Moment blendet sich in unvorhersehbarer Richtung ein kleines
 * Nachziel ein, das nur kurz sichtbar bleibt. Die Trefferfläche ist das sichtbare Ziel (mindestens
 * 24 px Radius) – ehrlich, ohne versteckten Zuschlag.
 *
 * - Stufe 1–12 (2-down/1-up): Nachziel-Radius 4,6 u → 2,4 u (nie unter 24 px), Abstand 11 → 15 u,
 *   Sichtzeit 2,2 s → 0,88 s. Feste Zahl an Runden, kein Zeitbonus, keine Zeitstrafe.
 * - Tipp neben das Nachziel = Fehlversuch (weiches ✗, Runde zu Ende); Nachziel verpasst = zu spät.
 *   Doppeltipps (< 180 ms nach dem Ankertipp) werden ignoriert.
 * - Hauptwert = Stufe; dazu Trefferquote des Nachziels, Median Anker-Tipp → Nachziel-Tipp und
 *   Median-Abstand zur Mitte (% des Radius). Die Zeit enthält Entdecken, Bewegung und Tippen; nur
 *   Treffer gehen ein. Der Finger verdeckt beim Antippen kurz das Ziel – das gehört zur Aufgabe.
 */
import { background, circle, glow, ring } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { captionTop, drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import {
  ANCHOR_TIMEOUT_MS,
  anchorRadiusPx,
  computeStats,
  distanceU,
  DOUBLE_TAP_MS,
  followRadiusPx,
  levelOf,
  MAX_LEVEL,
  MIN_LEVEL,
  offsetPct,
  pickAnchor,
  pickFollow,
  pointsFor,
  tipFor,
  visibleMs,
} from './logic';
import { de, it } from './texts';

const ROUNDS = 16;
const QUICK_ROUNDS = 3;
const PAUSE_MS = 650;
const FIRST_DELAY_MS = 900;
const ANCHOR_FADE_IN_MS = 160;
const ANCHOR_FADE_OUT_MS = 150;
const FOLLOW_FADE_IN_MS = 130;
const FOLLOW_FADE_OUT_MS = 260;
const MARK_MS = 800;
const DEMO_LIFE_MS = 3600;

const SKY = '#7CC4FF';
const SKY_DARK = '#12304F';
const SKY_LIGHT = '#CFE6FF';
const AMBER = '#F5A524';
const AMBER_DARK = '#3B2400';

// Intro-Film: drei Runden auf Stufe 1, Richtung des Nachziels fest vorgegeben
interface DemoRound {
  nx: number;
  ny: number;
  angle: number;
  caption: string;
}
const DEMO_ROUNDS: DemoRound[] = [
  { nx: 0.3, ny: 0.5, angle: -0.5, caption: 'anchor' },
  { nx: 0.68, ny: 0.4, angle: 2.6, caption: 'again' },
  { nx: 0.42, ny: 0.58, angle: -2.3, caption: 'again2' },
];

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Mark {
  x: number;
  y: number;
  t0: number;
  kind: 'bad' | 'good';
}

type State = 'pause' | 'anchor' | 'follow' | 'end';

class Mikrokorrektur implements Exercise {
  private readonly demo: boolean;
  private readonly total: number;
  private readonly stair: Staircase;
  private state: State = 'pause';
  private roundNo = 0;
  private roundLvl = MIN_LEVEL;
  private nextAt = 0;
  private endAt = Infinity;
  private endT = Infinity;
  private done = false;
  private planned = false;

  // Anker / Nachziel (normiert im Feld 0..1)
  private anchor = { nx: 0.5, ny: 0.5 };
  private anchorBorn = 0;
  private anchorGone = -1;
  private follow = { nx: 0.5, ny: 0.5 };
  private followBorn = 0;
  private followLife = 2000;
  private followGone = -1;
  private followKind: 'hit' | 'miss' | 'late' | null = null;
  private followShown = false;
  private prevFollow: { nx: number; ny: number } | null = null;
  private tapSpot: { x: number; y: number; t0: number } | null = null;
  private marks: Mark[] = [];

  private hits = 0;
  private misses = 0;
  private late = 0;
  private points = 0;
  private times: number[] = [];
  private offsets: number[] = [];

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.total = this.demo ? DEMO_ROUNDS.length : ctx.quick ? QUICK_ROUNDS : ROUNDS;
    this.stair = new Staircase({ start: ctx.startLevel ?? MIN_LEVEL, min: MIN_LEVEL, max: MAX_LEVEL, down: 2, up: 1 });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private hs(): number {
    return clamp(this.ctx.stage.u * 13, 48, 110);
  }

  private field(): Rect {
    const s = this.ctx.stage;
    const m = Math.max(10, s.u * 2);
    const top = Math.max(52, s.u * 9);
    const bottom = this.demo ? captionTop(s) - this.hs() * 1.0 - 6 : s.h - m;
    return { x: m, y: top, w: Math.max(40, s.w - 2 * m), h: Math.max(40, bottom - top) };
  }

  private bounds() {
    const f = this.field();
    return { x0: f.x, y0: f.y, x1: f.x + f.w, y1: f.y + f.h };
  }

  private px(n: { nx: number; ny: number }): { x: number; y: number } {
    const f = this.field();
    return { x: f.x + n.nx * f.w, y: f.y + n.ny * f.h };
  }

  private norm(p: { x: number; y: number }): { nx: number; ny: number } {
    const f = this.field();
    return { nx: (p.x - f.x) / f.w, ny: (p.y - f.y) / f.h };
  }

  private restPoint(): { x: number; y: number } {
    const { w } = this.ctx.stage;
    const hs = this.hs();
    return { x: w - hs * 0.75, y: captionTop(this.ctx.stage) - hs * 0.95 };
  }

  private level(): number {
    return this.demo ? MIN_LEVEL : levelOf(this.stair.level);
  }

  private anchorR(): number {
    return anchorRadiusPx(this.ctx.stage.u);
  }

  private followR(): number {
    return followRadiusPx(this.roundLvl, this.ctx.stage.u);
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    this.nextAt = t + (this.demo ? 600 : FIRST_DELAY_MS);
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateLabel();
    if (this.demo) {
      const r = this.restPoint();
      ghost.moveTo(r.x, r.y, { move: 0 });
    }
  }

  update(_dt: number, t: number): void {
    if (this.done) return;
    if (t >= this.endAt) {
      this.finishSession(t);
      return;
    }
    if (this.state === 'pause' && this.roundNo < this.total && t >= this.nextAt) this.spawnAnchor(t);
    else if (this.state === 'anchor') {
      if (!this.demo && t - this.anchorBorn >= ANCHOR_TIMEOUT_MS) this.endRound(t, 'late');
      else if (this.ctx.autoplay) this.planAnchorTap();
    } else if (this.state === 'follow') {
      if (t - this.followBorn >= this.followLife) this.endRound(t, 'late');
      else if (this.ctx.autoplay) this.planFollowTap();
    }
    this.prune(t);
  }

  private spawnAnchor(t: number): void {
    const { hud, texts, rng } = this.ctx;
    this.roundLvl = this.level();
    if (this.demo) {
      const d = DEMO_ROUNDS[this.roundNo];
      this.anchor = { nx: d.nx, ny: d.ny };
      hud.caption(texts.captions[d.caption]);
    } else {
      const u = this.ctx.stage.u;
      const prev = this.prevFollow ? this.px(this.prevFollow) : null;
      this.anchor = this.norm(pickAnchor(rng, this.bounds(), this.anchorR(), prev, u * 18));
    }
    this.state = 'anchor';
    this.anchorBorn = t;
    this.anchorGone = -1;
    this.followGone = -1;
    this.followKind = null;
    this.followShown = false;
    this.planned = false;
    this.updateLabel();
  }

  /** Nachziel erscheint im selben Moment wie der Ankertipp (Zeit = Ereigniszeit des Tipps) */
  private anchorTap(t: number): void {
    const { rng, stage, hud, texts } = this.ctx;
    this.anchorGone = t;
    const a = this.px(this.anchor);
    const r = this.followR();
    const dist = distanceU(this.roundLvl) * stage.u;
    let f: { x: number; y: number };
    if (this.demo) {
      const ang = DEMO_ROUNDS[this.roundNo].angle;
      const d = Math.max(dist, this.anchorR() + r + 8);
      f = { x: a.x + Math.cos(ang) * d, y: a.y + Math.sin(ang) * d };
    } else {
      f = pickFollow(rng, a, dist, r, this.anchorR(), this.bounds());
    }
    this.follow = this.norm(f);
    this.followBorn = t;
    this.followLife = this.demo ? DEMO_LIFE_MS : visibleMs(this.roundLvl);
    this.state = 'follow';
    this.followShown = true;
    this.planned = false;
    this.ctx.sfx.tap();
    if (this.demo && this.roundNo === 0) hud.caption(texts.captions.follow);
  }

  private endRound(t: number, kind: 'hit' | 'miss' | 'late'): void {
    const { sfx, hud } = this.ctx;
    this.followGone = t;
    this.followKind = kind;
    this.prevFollow = this.state === 'follow' ? { ...this.follow } : this.prevFollow;
    if (this.state === 'anchor') this.anchorGone = t;
    this.roundNo++;
    this.state = 'pause';
    this.nextAt = t + PAUSE_MS;
    if (!this.demo) {
      if (kind === 'hit') this.hits++;
      else if (kind === 'miss') this.misses++;
      else this.late++;
      this.stair.update(kind === 'hit');
      if (kind !== 'hit') sfx.bad();
      hud.setProgress(clamp(this.roundNo / this.total, 0, 1));
      hud.setScore(this.points);
      this.updateLabel();
    } else if (kind !== 'hit') sfx.bad();
    if (this.roundNo >= this.total) this.endAt = t + (this.demo ? 900 : 700);
  }

  // --- Intro-Film / Autoplay ---

  private planAnchorTap(): void {
    const { ghost, rng } = this.ctx;
    if (this.planned || !ghost.idle) return;
    this.planned = true;
    const c = this.px(this.anchor);
    const r = this.anchorR();
    if (this.demo) {
      ghost.tap(c.x, c.y, { delay: this.roundNo === 0 ? 900 : 500, move: 800 });
      return;
    }
    if (rng.chance(0.01)) return; // Aussetzer: der Anker läuft ab
    ghost.tap(c.x + rng.normal() * r * 0.2, c.y + rng.normal() * r * 0.2, { delay: rng.range(250, 650), move: rng.range(300, 500) });
  }

  private planFollowTap(): void {
    const { ghost, rng } = this.ctx;
    if (this.planned || !ghost.idle) return;
    this.planned = true;
    const c = this.px(this.follow);
    const r = this.followR();
    if (this.demo) {
      ghost.tap(c.x, c.y, { delay: 700, move: 800 });
      return;
    }
    if (rng.chance(0.04)) return; // zu langsam
    let dx = rng.normal() * r * 0.3;
    let dy = rng.normal() * r * 0.3;
    if (rng.chance(0.08)) {
      const a = rng.range(0, Math.PI * 2);
      dx = Math.cos(a) * r * rng.range(1.3, 2);
      dy = Math.sin(a) * r * rng.range(1.3, 2);
    }
    ghost.tap(c.x + dx, c.y + dy, { delay: rng.range(120, 250), move: rng.range(250, 360) });
  }

  // --- Eingabe ---

  pointerDown(p: PointerInfo): void {
    if (this.done) return;
    if (this.state === 'anchor') {
      if (p.t < this.anchorBorn) return;
      const c = this.px(this.anchor);
      if (Math.hypot(p.x - c.x, p.y - c.y) <= this.anchorR()) this.anchorTap(p.t);
      return;
    }
    if (this.state !== 'follow' || p.t - this.followBorn < DOUBLE_TAP_MS) return;
    if (p.t - this.followBorn >= this.followLife) return;
    const c = this.px(this.follow);
    const r = this.followR();
    const d = Math.hypot(p.x - c.x, p.y - c.y);
    if (d <= r) {
      this.onHit(p, c, r);
    } else {
      this.marks.push({ x: p.x, y: p.y, t0: p.t, kind: 'bad' });
      this.endRound(p.t, 'miss');
    }
  }

  private onHit(p: PointerInfo, c: { x: number; y: number }, r: number): void {
    const { sfx, stage } = this.ctx;
    const off = offsetPct({ x: p.x, y: p.y }, c, r);
    if (!this.demo) {
      this.times.push(p.t - this.followBorn);
      this.offsets.push(off);
      this.points += pointsFor(this.roundLvl, off);
    }
    this.tapSpot = { x: p.x, y: p.y, t0: p.t };
    this.marks.push({ x: c.x, y: c.y - r - Math.max(14, stage.u * 2.4), t0: p.t, kind: 'good' });
    sfx.good();
    this.endRound(p.t, 'hit');
  }

  private updateLabel(): void {
    if (this.demo) return;
    this.ctx.hud.setLabel(`${this.ctx.texts.feedback.level} ${this.level()}`);
  }

  private prune(t: number): void {
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
    if (this.tapSpot && t - this.tapSpot.t0 > 600) this.tapSpot = null;
  }

  // -------------------------------------------------------------------------

  private finishSession(t: number): void {
    this.done = true;
    this.endT = t;
    this.ctx.hud.setProgress(1);
    const s = computeStats(this.hits, this.misses, this.late, this.times, this.offsets);
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' },
        secondary: [{ key: 'hitRate', value: 100, unit: 'percent' }],
        score: 0,
        level: MIN_LEVEL,
      });
      return;
    }
    this.ctx.sfx.done();
    const thr = this.stair.threshold();
    const secondary = [
      { key: 'hitRate', value: Math.round(s.hitRate), unit: 'percent' as const },
      ...(Number.isFinite(s.medianMs) ? [{ key: 'afterAnchor', value: Math.round(s.medianMs), unit: 'time' as const }] : []),
      ...(Number.isFinite(s.medianOffset) ? [{ key: 'offset', value: Math.round(s.medianOffset), unit: 'percent' as const }] : []),
    ];
    this.ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), MIN_LEVEL, MAX_LEVEL), unit: 'level', better: 'higher' },
      secondary,
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip: tipFor(s),
    });
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, now: number): void {
    const t = Math.min(now, this.endT);
    const { w, h, u, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    this.drawAnchor(g, t);
    this.drawFollow(g, t);
    if (this.tapSpot) {
      const k = clamp((t - this.tapSpot.t0) / 600, 0, 1);
      ring(g, this.tapSpot.x, this.tapSpot.y, Math.max(4, u * 0.9), `rgba(232,238,247,${0.85 * (1 - k)})`, 2);
    }
    for (const m of this.marks) {
      const a = markAlpha(t - m.t0, MARK_MS);
      const s = Math.max(10, u * 2.4);
      if (m.kind === 'bad') drawSoftCross(g, m.x, m.y, s, a);
      else drawSoftCheck(g, m.x, m.y, s * 1.05, a);
    }
  }

  /** Großes Ankerziel: Kreis mit Ring und Mittelpunkt, blendet weich ein und nach dem Tipp weich aus */
  private drawAnchor(g: CanvasRenderingContext2D, t: number): void {
    let a: number;
    if (this.state === 'anchor') a = clamp((t - this.anchorBorn) / ANCHOR_FADE_IN_MS, 0, 1);
    else if (this.anchorGone >= 0) a = 1 - clamp((t - this.anchorGone) / ANCHOR_FADE_OUT_MS, 0, 1);
    else return;
    if (a <= 0.01) return;
    const c = this.px(this.anchor);
    const r = this.anchorR();
    g.save();
    g.globalAlpha = a;
    glow(g, c.x, c.y, r, SKY, 0.55);
    circle(g, c.x, c.y, r, SKY_DARK);
    ring(g, c.x, c.y, r - Math.max(2, r * 0.05), SKY, Math.max(3, r * 0.08));
    ring(g, c.x, c.y, r * 0.52, 'rgba(124,196,255,0.55)', Math.max(2, r * 0.05));
    circle(g, c.x, c.y, Math.max(3, r * 0.1), SKY_LIGHT);
    g.restore();
  }

  /** Kleines Nachziel: gelbe Scheibe mit dunklem Mittelpunkt; nach Ablauf gestrichelter Ring */
  private drawFollow(g: CanvasRenderingContext2D, t: number): void {
    const c = this.px(this.follow);
    const r0 = this.followR();
    let a: number;
    let r = r0;
    if (this.state === 'follow') {
      const age = t - this.followBorn;
      a = clamp(age / FOLLOW_FADE_IN_MS, 0, 1);
      if (!this.ctx.reducedMotion) r = r0 * (0.9 + 0.1 * easeOut(age / FOLLOW_FADE_IN_MS));
    } else if (this.followGone >= 0 && this.followKind) {
      if (this.followKind === 'hit' && !this.ctx.reducedMotion) {
        const k = clamp((t - this.followGone) / FOLLOW_FADE_OUT_MS, 0, 1);
        g.save();
        g.beginPath();
        g.arc(c.x, c.y, r0 * (1.1 + 0.8 * easeOut(k)), 0, Math.PI * 2);
        g.strokeStyle = `rgba(253,230,138,${0.85 * (1 - k)})`;
        g.lineWidth = Math.max(1.5, 4 * (1 - k));
        g.stroke();
        g.restore();
      }
      a = 1 - clamp((t - this.followGone) / FOLLOW_FADE_OUT_MS, 0, 1);
      if (!this.followShown) return;
    } else return;
    if (a <= 0.01) return;
    g.save();
    g.globalAlpha = a;
    glow(g, c.x, c.y, r0, AMBER, 0.5);
    circle(g, c.x, c.y, r, AMBER);
    ring(g, c.x, c.y, r - Math.max(1.5, r * 0.06), AMBER_DARK, Math.max(2, r * 0.1));
    circle(g, c.x, c.y, Math.max(2.5, r * 0.15), AMBER_DARK);
    if (this.state !== 'follow' && this.followKind !== 'hit') ring(g, c.x, c.y, r * 1.25, 'rgba(232,238,247,0.8)', Math.max(2, r * 0.07), [6, 6]);
    g.restore();
  }
}

export const mikrokorrektur: ExerciseDefinition = {
  id: 'mikrokorrektur',
  category: 'bewegung',
  minutes: 1,
  color: '#2E6DB4',
  icon:
    '<circle cx="17" cy="29" r="12" fill="none" stroke="currentColor" stroke-width="2.8"/><circle cx="17" cy="29" r="2.6" fill="currentColor"/><path d="M27 21l7-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="1 5"/><circle cx="37" cy="12" r="5.5" fill="currentColor"/><circle cx="37" cy="12" r="1.8" fill="#fff" fill-opacity=".85"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new Mikrokorrektur(ctx),
};
