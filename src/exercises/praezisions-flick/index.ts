/**
 * Präzisions-Flick – ein Ziel schrumpft langsam: möglichst schnell UND mittig antippen.
 *
 * Abgrenzung: Ziele abräumen und Schrumpfende Ziele haben mehrere Ziele gleichzeitig (dort zählt
 * die Reihenfolge bzw. die Dringlichkeit); hier liegt immer nur ein ruhendes Ziel da, und es zählt,
 * wie nah an der Mitte du tippst und wie schnell. Zielfang und Ziele erwischen bewegen sich – hier
 * steht das Ziel still und wird nur kleiner.
 *
 * - Der Radius schrumpft linear mit der Zeit (dt-basiert, gleich auf jedem Gerät) bis auf 25 % des
 *   Startradius, dann ist das Ziel weg. Ein gestrichelter Innenkreis zeigt diese Grenze.
 * - Wertung je Tipp: Abstand von der Mitte in % des gerade sichtbaren Radius (= Mittigkeit) und die
 *   Zeit vom Erscheinen bis zum Tipp. Wer wartet, tippt ein kleineres Ziel.
 * - Stufe (Staircase, 3-down/1-up): Startgröße und Schrumpftempo. Erfolg = Tipp in der sichtbaren
 *   Scheibe. Ein Tipp knapp daneben (aber in der Trefferfläche ≥ 24 px) oder ein verschwundenes
 *   Ziel zählen als Fehlschlag, ein Tipp weit daneben als Fehltipp (✗).
 * - Feste Zahl an Durchgängen, keine Zeitstrafe, kein Zeitbonus, kein Blitz, kein Wackeln.
 * - Nach dem Tipp zeigt eine gestrichelte Linie den Abstand zur Mitte (Form, nicht nur Farbe). Das
 *   nächste Ziel erscheint nie unter dem zuletzt getippten Punkt (Finger verdeckt nichts).
 * - Gemessen wird nur dein Tippen, nicht dein Blick.
 */
import { background, circle, glow, ring, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { drawCross, playField, restPoint, toastNear } from '../_shared/tippziele';
import {
  type Norm,
  centering,
  classifyTap,
  computeStats,
  gapMs,
  levelOf,
  lifeMs,
  MAX_LEVEL,
  MIN_LEVEL,
  pickSpot,
  pointsFor,
  QUICK_TRIALS,
  radiusAt,
  startRadiusPx,
  timeLeftFrac,
  tipFor,
  TRIALS,
  VANISH_FRAC,
} from './logic';
import { de, it } from './texts';

const POP_MS = 200;
const FADE_MS = 300;
const BURST_MS = 420;
const MARK_MS = 650;
const RESULT_MS = 1100;
const DEMO_RESULT_MS = 1700;
const WRONG_COOLDOWN_MS = 400;
/** Nach dem letzten Durchgang bleibt das Bild kurz stehen, damit die Rückmeldung lesbar ist */
const END_HOLD_MS = 900;

const BLUE = '#5AA9F0';
const BLUE_DARK = '#2F6FB5';
const BLUE_LIGHT = '#CFE6FF';
const WARM = '#FBBF24';

// Intro-Film: Stufe 1 mit langer Schrumpfzeit; drei Ziele, die Hand tippt nach gewisser Zeit
// (das Ziel ist dann schon sichtbar kleiner) und trifft erst ungefähr, dann recht genau die Mitte.
const DEMO_LIFE_MS = 6500;
const DEMO_TRIALS: Array<{ at: number; nx: number; ny: number; tapAfter: number; off: number; ang: number }> = [
  { at: 1300, nx: 0.3, ny: 0.4, tapAfter: 3400, off: 0.42, ang: 0.6 },
  { at: 6300, nx: 0.7, ny: 0.55, tapAfter: 1400, off: 0.12, ang: 2.4 },
];
const DEMO_END_MS = 9900;

interface Target extends Norm {
  born: number;
  life: number;
  r0: number;
  judged: boolean;
  planned: boolean;
}

interface Gone {
  kind: 'hit' | 'gone';
  nx: number;
  ny: number;
  r: number;
  t0: number;
}

/** Rückmeldung nach einem Tipp: Punkt, Linie zur Mitte */
interface Feedback {
  /** Tipp in Bühnenkoordinaten 0..1 */
  sx: number;
  sy: number;
  nx: number;
  ny: number;
  r: number;
  ok: boolean;
  t0: number;
}

interface Mark {
  sx: number;
  sy: number;
  t0: number;
}

class PraezisionsFlick implements Exercise {
  private readonly demo: boolean;
  private readonly total: number;
  private readonly stair: Staircase;
  private target: Target | null = null;
  private gone: Gone[] = [];
  private feedback: Feedback[] = [];
  private marks: Mark[] = [];
  private t0 = 0;
  private endAt = Infinity;
  private endT = Infinity;
  private done = false;
  private started = 0;
  private resolved = 0;
  private nextAt = 0;
  private lastTap: { x: number; y: number } | null = null;
  private lastWrongT = -1e9;
  private hits = 0;
  private goneCount = 0;
  private wrong = 0;
  private points = 0;
  private centerings: number[] = [];
  private times: number[] = [];
  private demoIdx = 0;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.total = ctx.quick ? QUICK_TRIALS : TRIALS;
    this.stair = new Staircase({ start: ctx.startLevel ?? MIN_LEVEL, min: MIN_LEVEL, max: MAX_LEVEL, down: 3, up: 1 });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private px(T: Norm): { x: number; y: number } {
    const f = playField(this.ctx.stage, this.demo);
    return { x: f.x + T.nx * f.w, y: f.y + T.ny * f.h };
  }

  private level(): number {
    return this.demo ? MIN_LEVEL : levelOf(this.stair.level);
  }

  private radiusNow(T: Target, t: number): number {
    return radiusAt(T.r0, t - T.born, T.life);
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    this.t0 = t;
    this.nextAt = t + 600;
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateLabel();
    if (this.demo) {
      const r = restPoint(this.ctx.stage);
      ghost.moveTo(r.x, r.y, { move: 0 });
      hud.caption(this.ctx.texts.captions.watch);
    }
  }

  update(_dt: number, t: number): void {
    if (this.done) return;
    if (t >= this.endAt) {
      this.finishSession(t);
      return;
    }
    if (this.demo) this.runDemo(t);
    else if (!this.target && this.started < this.total && t >= this.nextAt) this.spawn(t);
    else if (!this.target && this.started >= this.total && this.endAt === Infinity) this.endAt = t + END_HOLD_MS;
    const T = this.target;
    if (T && !T.judged && t - T.born >= T.life) this.expire(T, t);
    if (this.ctx.autoplay && !this.demo) this.autoUpdate();
    this.prune(t);
  }

  private spawn(t: number, at?: Norm): void {
    const { stage, rng } = this.ctx;
    const lvl = this.level();
    const f = playField(stage, this.demo);
    const r0 = startRadiusPx(lvl, stage.u);
    const spot =
      at ??
      pickSpot(
        rng,
        f.w,
        f.h,
        r0,
        this.lastTap ? { x: this.lastTap.x - f.x, y: this.lastTap.y - f.y } : null,
        Math.min(f.w, f.h) * 0.45,
      );
    this.target = { nx: spot.nx, ny: spot.ny, born: t, life: this.demo ? DEMO_LIFE_MS : lifeMs(lvl), r0, judged: false, planned: false };
    this.started++;
    this.updateLabel();
  }

  // --- Intro-Film ---

  private runDemo(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    const el = t - this.t0;
    if (this.demoIdx < DEMO_TRIALS.length && el >= DEMO_TRIALS[this.demoIdx].at && !this.target) {
      const d = DEMO_TRIALS[this.demoIdx++];
      this.spawn(t, { nx: d.nx, ny: d.ny });
      hud.caption(this.demoIdx === 1 ? texts.captions.shrink : texts.captions.middle);
      // Die Hand fährt so los, dass sie zum geplanten Zeitpunkt ankommt
      const c = this.px(d);
      const T = this.target!;
      const r = radiusAt(T.r0, d.tapAfter, T.life);
      const move = 800;
      ghost.tap(c.x + Math.cos(d.ang) * r * d.off, c.y + Math.sin(d.ang) * r * d.off, { delay: Math.max(0, d.tapAfter - move), move });
      const rest = restPoint(this.ctx.stage);
      ghost.moveTo(rest.x, rest.y, { delay: 900, move: 500 });
    }
    if (el >= DEMO_END_MS) this.finishSession(t);
  }

  /** Autoplay (Tests): meist mittig, selten knapp oder weit daneben, selten gar nicht */
  private autoUpdate(): void {
    const { ghost, rng } = this.ctx;
    const T = this.target;
    if (!T || T.judged || T.planned || !ghost.idle) return;
    T.planned = true;
    if (rng.chance(0.05)) return;
    const move = rng.range(260, 420);
    const delay = rng.range(150, Math.max(200, T.life * 0.45));
    const c = this.px(T);
    const r = radiusAt(T.r0, delay + move, T.life);
    const roll = rng.next();
    const off = roll < 0.06 ? r * 3.2 : roll < 0.16 ? r * 1.15 : Math.abs(rng.normal()) * r * 0.3;
    const a = rng.range(0, Math.PI * 2);
    ghost.tap(c.x + Math.cos(a) * off, c.y + Math.sin(a) * off, { delay, move });
  }

  // --- Eingabe ---

  pointerDown(p: PointerInfo): void {
    if (this.done) return;
    const T = this.target;
    if (T && !T.judged && p.t >= T.born + 60) {
      const c = this.px(T);
      const d = Math.hypot(p.x - c.x, p.y - c.y);
      const r = this.radiusNow(T, p.t);
      const kind = classifyTap(d, r);
      if (kind !== 'far') {
        this.tapTarget(T, p, d, r, kind === 'hit');
        return;
      }
    }
    this.miss(p);
  }

  private tapTarget(T: Target, p: PointerInfo, d: number, r: number, inside: boolean): void {
    const { sfx, hud, stage, texts, fmt } = this.ctx;
    T.judged = true;
    this.target = null;
    this.resolved++;
    this.lastTap = { x: p.x, y: p.y };
    const pct = centering(d, r);
    const ms = p.t - T.born;
    this.centerings.push(pct);
    this.times.push(ms);
    const c = this.px(T);
    this.feedback.push({ sx: p.x / stage.w, sy: p.y / stage.h, nx: T.nx, ny: T.ny, r, ok: inside, t0: p.t });
    this.gone.push({ kind: 'hit', nx: T.nx, ny: T.ny, r, t0: p.t });
    const size = clamp(stage.u * 4.2, 16, 30);
    if (inside) {
      this.hits++;
      this.points += pointsFor(this.level(), pct, timeLeftFrac(ms, T.life));
      sfx.good();
      toastNear(hud, stage.w, `✓ ${fmt.pct(pct)}`, 'good', c.x, c.y - r * 1.6, this.demo ? DEMO_RESULT_MS : RESULT_MS, size);
    } else {
      sfx.bad();
      toastNear(hud, stage.w, `✗ ${texts.feedback.near}`, 'info', c.x, c.y - r * 1.6, this.demo ? DEMO_RESULT_MS : RESULT_MS, size);
    }
    hud.setScore(this.demo ? null : this.points);
    hud.setProgress(clamp(this.resolved / this.total, 0, 1));
    if (!this.demo) this.stair.update(inside);
    this.nextAt = p.t + gapMs(this.ctx.rng);
    this.updateLabel();
  }

  private expire(T: Target, t: number): void {
    const { stage, hud, texts } = this.ctx;
    T.judged = true;
    this.target = null;
    this.resolved++;
    this.goneCount++;
    const c = this.px(T);
    const r = this.radiusNow(T, t);
    this.gone.push({ kind: 'gone', nx: T.nx, ny: T.ny, r, t0: t });
    toastNear(hud, stage.w, `✗ ${texts.feedback.gone}`, 'info', c.x, c.y - r * 1.6, this.demo ? DEMO_RESULT_MS : RESULT_MS, clamp(stage.u * 4.2, 16, 30));
    hud.setProgress(clamp(this.resolved / this.total, 0, 1));
    if (!this.demo) this.stair.update(false);
    this.nextAt = t + gapMs(this.ctx.rng);
    this.updateLabel();
  }

  /** Tipp weit neben das Ziel: Fehltipp, weiches ✗ (keine Wirkung im Intro-Film) */
  private miss(p: PointerInfo): void {
    if (this.demo || p.t - this.lastWrongT < WRONG_COOLDOWN_MS) return;
    const { sfx, stage } = this.ctx;
    this.lastWrongT = p.t;
    this.wrong++;
    sfx.bad();
    this.marks.push({ sx: p.x / stage.w, sy: p.y / stage.h, t0: p.t });
    this.stair.update(false);
  }

  private updateLabel(): void {
    if (this.demo) return;
    const { hud, texts } = this.ctx;
    hud.setLabel(`${texts.feedback.level} ${this.level()} · ${Math.min(this.started, this.total)}/${this.total}`);
  }

  private prune(t: number): void {
    if (this.gone.length) this.gone = this.gone.filter((g) => t - g.t0 < (g.kind === 'hit' ? BURST_MS : FADE_MS));
    if (this.feedback.length) this.feedback = this.feedback.filter((f) => t - f.t0 < (this.demo ? DEMO_RESULT_MS : RESULT_MS));
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
  }

  // -------------------------------------------------------------------------

  private finishSession(t: number): void {
    this.done = true;
    this.endT = t;
    const { sfx, hud } = this.ctx;
    hud.setProgress(1);
    const stats = computeStats(this.hits, this.goneCount, this.wrong, this.centerings, this.times);
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' },
        secondary: [{ key: 'hits', value: stats.hits, unit: 'count' }],
        score: this.points,
        level: MIN_LEVEL,
      });
      return;
    }
    sfx.done();
    const thr = this.stair.threshold();
    const secondary = [
      { key: 'hits', value: stats.hits, unit: 'count' as const },
      ...(Number.isFinite(stats.centering) ? [{ key: 'centering', value: Math.round(stats.centering), unit: 'percent' as const }] : []),
      ...(Number.isFinite(stats.medianMs) ? [{ key: 'median', value: Math.round(stats.medianMs), unit: 'time' as const }] : []),
      { key: 'wrong', value: stats.wrong, unit: 'count' as const },
    ];
    this.ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), MIN_LEVEL, MAX_LEVEL), unit: 'level', better: 'higher' },
      secondary,
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip: tipFor(stats),
    });
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, now: number): void {
    const t = Math.min(now, this.endT);
    const { w, h, u, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    for (const d of this.gone) this.drawGone(g, d, t);
    if (this.target) this.drawTarget(g, this.target, t);
    for (const f of this.feedback) this.drawFeedback(g, f, t, u);
    for (const m of this.marks) drawCross(g, m.sx * w, m.sy * h, clamp((t - m.t0) / MARK_MS, 0, 1), u, WARM);
  }

  /** Scheibe mit Ringen (Zielscheibe), schrumpfend; gestrichelter Innenkreis = „dann ist es weg“ */
  private drawTarget(g: CanvasRenderingContext2D, T: Target, t: number): void {
    const age = t - T.born;
    const a = clamp(age / POP_MS, 0, 1);
    if (a <= 0.01) return;
    const c = this.px(T);
    const r = this.radiusNow(T, t);
    const pop = this.ctx.reducedMotion ? 1 : 0.85 + 0.15 * easeOut(age / POP_MS);
    g.save();
    g.globalAlpha = a;
    glow(g, c.x, c.y, r, BLUE, 0.5);
    circle(g, c.x, c.y, r * pop, BLUE_DARK);
    ring(g, c.x, c.y, r * pop - Math.max(1.5, r * 0.04), BLUE_LIGHT, Math.max(2, r * 0.07));
    ring(g, c.x, c.y, r * 0.62 * pop, withAlpha(BLUE_LIGHT, 0.7), Math.max(1.5, r * 0.04));
    circle(g, c.x, c.y, Math.max(2.5, r * 0.12) * pop, '#FFFFFF');
    // Grenze, bei der das Ziel verschwindet (gestrichelt, Form statt Farbe)
    const lim = T.r0 * VANISH_FRAC;
    if (r > lim + 2) ring(g, c.x, c.y, lim, 'rgba(255,255,255,0.75)', Math.max(1.5, lim * 0.12), [4, 4]);
    g.restore();
  }

  private drawGone(g: CanvasRenderingContext2D, d: Gone, t: number): void {
    const c = this.px(d);
    if (d.kind === 'hit') {
      if (this.ctx.reducedMotion) return;
      const k = clamp((t - d.t0) / BURST_MS, 0, 1);
      g.save();
      g.beginPath();
      g.arc(c.x, c.y, d.r * (1.05 + 0.7 * easeOut(k)), 0, Math.PI * 2);
      g.strokeStyle = withAlpha(BLUE_LIGHT, 0.85 * (1 - k));
      g.lineWidth = Math.max(1.5, 4 * (1 - k));
      g.stroke();
      g.restore();
      return;
    }
    const k = clamp((t - d.t0) / FADE_MS, 0, 1);
    g.save();
    g.globalAlpha = 0.85 * (1 - k);
    circle(g, c.x, c.y, d.r, withAlpha(BLUE_DARK, 0.8));
    ring(g, c.x, c.y, d.r, BLUE_LIGHT, Math.max(2, d.r * 0.1), [6, 6]);
    g.restore();
  }

  /** Tipp-Punkt (weiß mit Rand) und gestrichelte Linie zur Mitte; Mitte als kleines Kreuz */
  private drawFeedback(g: CanvasRenderingContext2D, f: Feedback, t: number, u: number): void {
    const { w, h } = this.ctx.stage;
    const c = this.px(f);
    const tx = f.sx * w;
    const ty = f.sy * h;
    const k = clamp((t - f.t0) / (this.demo ? DEMO_RESULT_MS : RESULT_MS), 0, 1);
    const a = Math.min(1, k * 6) * (k > 0.7 ? 1 - (k - 0.7) / 0.3 : 1);
    const s = Math.max(5, u * 1.1);
    g.save();
    g.globalAlpha = a;
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(tx, ty);
    g.lineTo(c.x, c.y);
    g.setLineDash([6, 6]);
    g.strokeStyle = 'rgba(5,10,20,0.7)';
    g.lineWidth = 4.5;
    g.stroke();
    g.strokeStyle = f.ok ? BLUE_LIGHT : WARM;
    g.lineWidth = 2.2;
    g.stroke();
    g.setLineDash([]);
    // Mitte: Kreuz
    g.beginPath();
    g.moveTo(c.x - s, c.y);
    g.lineTo(c.x + s, c.y);
    g.moveTo(c.x, c.y - s);
    g.lineTo(c.x, c.y + s);
    g.strokeStyle = 'rgba(5,10,20,0.7)';
    g.lineWidth = 4.5;
    g.stroke();
    g.strokeStyle = '#FFFFFF';
    g.lineWidth = 2.2;
    g.stroke();
    // Tipp-Punkt
    circle(g, tx, ty, s * 0.9, 'rgba(5,10,20,0.75)');
    circle(g, tx, ty, s * 0.6, f.ok ? '#FFFFFF' : WARM);
    g.restore();
  }
}

export const praezisionsFlick: ExerciseDefinition = {
  id: 'praezisions-flick',
  category: 'bewegung',
  minutes: 1,
  color: '#2E6DB4',
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="2.8"><circle cx="24" cy="24" r="17"/><circle cx="24" cy="24" r="9" stroke-dasharray="3.2 3.2"/></g><circle cx="24" cy="24" r="3.2" fill="currentColor"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new PraezisionsFlick(ctx),
};
