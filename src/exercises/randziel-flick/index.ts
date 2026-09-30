/**
 * Randziel-Flick – von der Mitte zum Randziel (Katalog 506, Touch-Fassung der „180-Grad-Drehung“).
 *
 * Ehrlicher Name: Es dreht sich nichts und es gibt keinen Richtungston – es ist eine flache Zeigeaufgabe mit
 * weitem Weg. Unterschied zu Flick-Ziele: Jeder Durchgang beginnt an derselben Stelle (Mittelmarke), das Ziel
 * erscheint immer am linken oder rechten Rand, der Weg ist also lang und vergleichbar.
 *
 * Ablauf je Durchgang: Tipp auf die Mittelmarke → unvorhersehbare Wartezeit (500 ms + exponentieller Anteil,
 * nicht alternd) → Ziel blendet am Rand weich ein (je 130 ms ein/aus) → Tipp auf das Ziel.
 * - Stufe (Staircase, 3-down/1-up → ≈ 79 % Treffer): Zielgröße 7,2 u → 3,6 u, Sichtzeit 1,9 s → 0,56 s, die
 *   Ziele streuen von 30 % bis 90 % der Höhe.
 * - Kein Zeitbonus, keine Strafzeit, feste Zahl Durchgänge (20), kein Rot, kein Schütteln. Die Zielmitte hält Abstand
 *   zum Rand, der ganze Trefferkreis (≥ 28 px) liegt auf der Bühne (kein „Randanschlag“ wie mit der Maus).
 * - Gemessen wird die Zeit vom Erscheinen des Ziels bis zum Tipp darauf (enthält Reaktion, Fingerweg und die
 *   Verzögerung des Touchscreens) – keine Augenbewegung. Auswertung mit Median, links und rechts getrennt.
 * - Taps auf die Mittelmarke nach dem Start und Taps im leeren Feld während der Wartezeit werden nicht gewertet.
 */
import { background, circle, ring, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import {
  captionTop,
  drawBullseye,
  drawHitRing,
  drawMissMark,
  fadeAlpha,
  FADE_MS,
  restPoint,
  toastAt,
} from '../_shared/ziel-auftauchen';
import {
  type HitSample,
  type Layout,
  type Side,
  computeStats,
  GAP_MS,
  inCircle,
  layoutFor,
  levelOf,
  lifeMs,
  MAX_LEVEL,
  MIN_LEVEL,
  pickSide,
  pointsFor,
  targetAt,
  tipFor,
  waitMs,
} from './logic';
import { de, it } from './texts';

const TRIALS = 20;
const QUICK_TRIALS = 3;
const RING_MS = 700;
const MARK_MS = 650;
const BURST_MS = 420;
// Intro-Film: Stufe 1, lange sichtbar; Ziele rechts – links – rechts
const DEMO_LIFE_MS = 3000;
const DEMO_WAIT_MS = 1100;
const DEMO_TRIALS: Array<{ side: Side; ny: number }> = [
  { side: 'right', ny: 0.3 },
  { side: 'left', ny: 0.7 },
  { side: 'right', ny: 0.55 },
];
const READY_CAPTIONS = ['start', 'again', 'again'];
const TARGET_CAPTIONS = ['tap', 'other', 'tap'];

const BLUE = '#0EA5E9';
const BLUE_LIGHT = '#7DD3FC';
const WARM = '#FBBF24';

type Phase = 'ready' | 'wait' | 'target' | 'gap' | 'done';

interface Target {
  side: Side;
  ny: number;
  lvl: number;
  born: number;
  life: number;
  judged: boolean;
}

interface Fx {
  nx: number;
  ny: number;
  t0: number;
  r: number;
}

class RandzielFlick implements Exercise {
  private readonly demo: boolean;
  private readonly total: number;
  private readonly stair: Staircase;
  private phase: Phase = 'gap';
  private phaseT = 0;
  private waitUntil = 0;
  private gapUntil = 0;
  private target: Target | null = null;
  private sides: Side[] = [];
  private spawned = 0;
  private resolved = 0;
  private samples: HitSample[] = [];
  private wrong = 0;
  private missed = 0;
  private points = 0;
  private marks: Fx[] = [];
  private hints: Fx[] = [];
  private bursts: Fx[] = [];
  private startPlanned = false;
  private targetPlanned = false;
  private endAt = 0;
  private endT = Infinity;
  /** Stufe des laufenden Durchgangs (Größe der Mittelmarke und des Bandes ändert sich nur zwischen Durchgängen) */
  private dispLevel = MIN_LEVEL;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.total = this.demo ? DEMO_TRIALS.length : ctx.quick ? QUICK_TRIALS : TRIALS;
    this.stair = new Staircase({ start: ctx.startLevel ?? MIN_LEVEL, min: MIN_LEVEL, max: MAX_LEVEL, down: 3, up: 1 });
    this.dispLevel = this.demo ? MIN_LEVEL : levelOf(this.stair.level);
  }

  // --- Geometrie: immer live aus der Bühne ---

  private lay(): Layout {
    const s = this.ctx.stage;
    return layoutFor(s.w, this.demo ? captionTop(s) - 6 : s.h, s.u, this.dispLevel);
  }

  start(t: number): void {
    const { hud, ghost, stage } = this.ctx;
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    if (this.demo) {
      const r = restPoint(stage);
      ghost.moveTo(r.x, r.y, { move: 0 });
    }
    this.toReady(t);
  }

  private toReady(t: number): void {
    this.phase = 'ready';
    this.phaseT = t;
    this.startPlanned = false;
    this.dispLevel = this.demo ? MIN_LEVEL : levelOf(this.stair.level);
    this.updateLabel();
    if (this.demo) {
      const { hud, texts, ghost } = this.ctx;
      hud.caption(texts.captions[READY_CAPTIONS[this.spawned]]);
      const c = this.lay();
      ghost.tap(c.cx, c.cy, { delay: 500, move: 500 });
    }
  }

  update(_dt: number, t: number): void {
    if (this.phase === 'done') return;
    if (this.phase === 'wait' && t >= this.waitUntil) this.spawn(t);
    const T = this.target;
    if (this.phase === 'target' && T) {
      if (t - T.born >= T.life) this.timeout(T, t);
      else if (this.ctx.autoplay && !this.demo) this.autoTarget(T);
    }
    if (this.phase === 'gap' && t >= this.gapUntil) {
      if (this.spawned >= this.total) {
        this.finishSession(t);
        return;
      }
      this.toReady(t);
    }
    if (this.phase === 'ready' && this.ctx.autoplay && !this.demo) this.autoReady();
    this.prune(t);
    if (this.demo && this.endAt && t >= this.endAt) this.finishSession(t);
  }

  private spawn(t: number): void {
    const { rng, hud, ghost, texts } = this.ctx;
    const lvl = this.demo ? MIN_LEVEL : levelOf(this.stair.level);
    let side: Side;
    let ny: number;
    if (this.demo) {
      ({ side, ny } = DEMO_TRIALS[this.spawned]);
    } else {
      side = pickSide(rng, this.sides);
      ny = rng.next();
    }
    this.sides.push(side);
    this.target = { side, ny, lvl, born: t, life: this.demo ? DEMO_LIFE_MS : lifeMs(lvl), judged: false };
    this.spawned++;
    this.phase = 'target';
    this.targetPlanned = false;
    this.updateLabel();
    if (this.demo) {
      hud.caption(texts.captions[TARGET_CAPTIONS[this.spawned - 1]]);
      const c = targetAt(this.lay(), side, ny);
      ghost.tap(c.x, c.y, { delay: 400, move: 650 });
    }
  }

  /** Autoplay (Tests): tippt die Mittelmarke */
  private autoReady(): void {
    const { ghost, rng } = this.ctx;
    if (this.startPlanned || !ghost.idle) return;
    this.startPlanned = true;
    const c = this.lay();
    ghost.tap(c.cx + rng.normal() * 4, c.cy + rng.normal() * 4, { delay: rng.range(250, 550), move: rng.range(280, 420) });
  }

  /** Autoplay (Tests): meist treffen, manchmal daneben oder gar nicht tippen */
  private autoTarget(T: Target): void {
    const { ghost, rng } = this.ctx;
    if (this.targetPlanned || !ghost.idle) return;
    this.targetPlanned = true;
    if (rng.chance(0.04)) return;
    const lay = this.lay();
    const c = targetAt(lay, T.side, T.ny);
    const off = rng.chance(0.08) ? lay.hitR * 2.4 : 0;
    const a = rng.range(0, Math.PI * 2);
    ghost.tap(c.x + rng.normal() * 3 + Math.cos(a) * off, c.y + rng.normal() * 3 + Math.sin(a) * off, {
      delay: rng.range(140, 300),
      move: rng.range(380, 560),
    });
  }

  pointerDown(p: PointerInfo): void {
    const lay = this.lay();
    if (this.phase === 'ready') {
      if (!inCircle(p.x, p.y, lay.cx, lay.cy, lay.markHit)) return;
      this.ctx.sfx.tap();
      this.phase = 'wait';
      this.phaseT = p.t;
      this.waitUntil = p.t + (this.demo ? DEMO_WAIT_MS : waitMs(this.ctx.rng));
      return;
    }
    const T = this.target;
    // Nur der erste Tipp pro Ziel zählt; Tipps auf die Mittelmarke (Finger ruht noch dort) sind keine Antwort
    if (this.phase !== 'target' || !T || T.judged || p.t < T.born) return;
    if (inCircle(p.x, p.y, lay.cx, lay.cy, lay.markHit)) return;
    const c = targetAt(lay, T.side, T.ny);
    if (inCircle(p.x, p.y, c.x, c.y, lay.hitR)) this.hit(T, lay, p.t);
    else this.miss(T, lay, p);
  }

  private hit(T: Target, lay: Layout, t: number): void {
    const { sfx, hud, fmt, stage } = this.ctx;
    const rt = t - T.born;
    T.judged = true;
    this.samples.push({ ms: rt, side: T.side });
    this.points += pointsFor(T.lvl, rt, T.life);
    sfx.good();
    const c = targetAt(lay, T.side, T.ny);
    if (!this.ctx.reducedMotion) this.bursts.push({ nx: c.x / stage.w, ny: c.y / stage.h, t0: t, r: lay.r });
    // Hinweistext zur Bühnenmitte hin, damit er nicht am Rand abgeschnitten wird
    toastAt(this.ctx, fmt.time(rt), 'good', c.x + (T.side === 'left' ? 1 : -1) * lay.r * 2, c.y - lay.r, 700, clamp(stage.u * 4.2, 16, 32));
    hud.setScore(this.points);
    if (!this.demo) this.stair.update(true);
    this.afterResolve(t);
  }

  private miss(T: Target, lay: Layout, p: PointerInfo): void {
    const { sfx, stage, texts } = this.ctx;
    T.judged = true;
    this.wrong++;
    sfx.bad();
    const c = targetAt(lay, T.side, T.ny);
    this.marks.push({ nx: p.x / stage.w, ny: p.y / stage.h, t0: p.t, r: lay.r });
    this.hints.push({ nx: c.x / stage.w, ny: c.y / stage.h, t0: p.t, r: lay.r });
    toastAt(this.ctx, texts.feedback.wrong, 'bad', p.x, p.y - lay.r, 800, clamp(stage.u * 3.8, 15, 28));
    if (!this.demo) this.stair.update(false);
    this.afterResolve(p.t);
  }

  private timeout(T: Target, t: number): void {
    const { stage, texts } = this.ctx;
    T.judged = true;
    this.missed++;
    const lay = this.lay();
    const c = targetAt(lay, T.side, T.ny);
    this.hints.push({ nx: c.x / stage.w, ny: c.y / stage.h, t0: t, r: lay.r });
    toastAt(this.ctx, texts.feedback.gone, 'info', c.x + (T.side === 'left' ? 1 : -1) * lay.r * 2, c.y - lay.r, 700, clamp(stage.u * 3.8, 15, 28));
    if (!this.demo) this.stair.update(false);
    this.afterResolve(t);
  }

  private afterResolve(t: number): void {
    this.resolved++;
    this.target = null;
    this.phase = 'gap';
    this.gapUntil = t + GAP_MS;
    this.ctx.hud.setProgress(this.resolved / this.total);
    this.updateLabel();
    if (this.demo && this.resolved >= this.total) this.endAt = t + 1100;
  }

  private updateLabel(): void {
    if (this.demo) return;
    const lvl = this.target ? this.target.lvl : levelOf(this.stair.level);
    this.ctx.hud.setLabel(`${this.ctx.texts.feedback.level} ${lvl}`);
  }

  private prune(t: number): void {
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
    if (this.hints.length) this.hints = this.hints.filter((m) => t - m.t0 < RING_MS);
    if (this.bursts.length) this.bursts = this.bursts.filter((b) => t - b.t0 < BURST_MS);
  }

  // -------------------------------------------------------------------------

  private finishSession(t: number): void {
    this.phase = 'done';
    this.endT = t;
    const { sfx, hud } = this.ctx;
    hud.setProgress(1);
    const stats = computeStats(this.samples, this.wrong, this.missed);
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
      ...(Number.isFinite(stats.medianMs) ? [{ key: 'medianTime', value: Math.round(stats.medianMs), unit: 'time' as const }] : []),
      { key: 'accuracy', value: Math.round(stats.accuracy), unit: 'percent' as const },
      { key: 'hits', value: stats.hits, unit: 'count' as const },
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
    const lay = this.lay();
    this.drawEdges(g, lay, h, u);
    this.drawMark(g, lay, t, u);
    for (const hnt of this.hints) this.drawHint(g, hnt, t, u);
    for (const b of this.bursts) drawHitRing(g, b.nx * w, b.ny * h, b.r, clamp((t - b.t0) / BURST_MS, 0, 1), BLUE_LIGHT);
    const T = this.target;
    if (T && this.phase === 'target') {
      const age = t - T.born;
      const c = targetAt(lay, T.side, T.ny);
      const r = this.ctx.reducedMotion ? lay.r : lay.r * (0.88 + 0.12 * easeOut(age / FADE_MS));
      drawBullseye(g, c.x, c.y, r, fadeAlpha(age, T.life), BLUE, BLUE_LIGHT);
    }
    for (const m of this.marks) drawMissMark(g, m.nx * w, m.ny * h, clamp((t - m.t0) / MARK_MS, 0, 1), u, WARM);
  }

  /** Randstreifen links und rechts: dezente Markierung, wo Ziele erscheinen können */
  private drawEdges(g: CanvasRenderingContext2D, lay: Layout, h: number, u: number): void {
    const { w } = this.ctx.stage;
    const bottom = this.demo ? captionTop(this.ctx.stage) - 6 : h;
    const band = lay.hitR + Math.max(6, u * 1.2);
    for (const side of ['left', 'right'] as const) {
      const x0 = side === 'left' ? 0 : w;
      const x1 = side === 'left' ? band * 2 : w - band * 2;
      const grad = g.createLinearGradient(x0, 0, x1, 0);
      grad.addColorStop(0, 'rgba(125,211,252,0.12)');
      grad.addColorStop(1, 'rgba(125,211,252,0)');
      g.fillStyle = grad;
      g.fillRect(Math.min(x0, x1), 0, Math.abs(x1 - x0), bottom);
      // Randlinie gestrichelt, damit der Streifen auch ohne Farbe erkennbar ist
      const lx = side === 'left' ? Math.max(2, u * 0.4) : w - Math.max(2, u * 0.4);
      g.save();
      g.setLineDash([Math.max(4, u), Math.max(6, u * 1.6)]);
      g.lineWidth = Math.max(2, u * 0.35);
      g.strokeStyle = 'rgba(186,230,253,0.35)';
      g.beginPath();
      g.moveTo(lx, lay.yMin - lay.hitR);
      g.lineTo(lx, lay.yMax + lay.hitR);
      g.stroke();
      g.restore();
    }
  }

  /** Mittelmarke: Ring + Punkt. Bereit = leicht atmender Halo; nach dem Tipp = gefüllt (Finger ruht) */
  private drawMark(g: CanvasRenderingContext2D, lay: Layout, t: number, u: number): void {
    const active = this.phase === 'wait' || this.phase === 'target';
    const lw = Math.max(3, u * 0.6);
    if (this.phase === 'ready' && !this.ctx.reducedMotion) {
      const k = 0.5 + 0.5 * Math.sin(((t - this.phaseT) / 1800) * Math.PI * 2);
      ring(g, lay.cx, lay.cy, lay.markR * (1.25 + 0.2 * k), `rgba(186,230,253,${(0.28 * (1 - k)).toFixed(3)})`, lw);
    }
    if (active) circle(g, lay.cx, lay.cy, lay.markR, withAlpha(BLUE_LIGHT, 0.22));
    ring(g, lay.cx, lay.cy, lay.markR, this.phase === 'ready' ? '#E0F2FE' : 'rgba(224,242,254,0.55)', lw);
    circle(g, lay.cx, lay.cy, lay.markR * 0.28, this.phase === 'ready' ? '#FFFFFF' : 'rgba(255,255,255,0.6)');
  }

  /** „Hier war es“: gestrichelter Ring am Ziel nach Fehltipp oder wenn es weg war */
  private drawHint(g: CanvasRenderingContext2D, hnt: Fx, t: number, u: number): void {
    const { w, h } = this.ctx.stage;
    const k = clamp((t - hnt.t0) / RING_MS, 0, 1);
    g.save();
    g.globalAlpha = Math.min(1, k * 6) * (1 - k) * 0.9;
    g.setLineDash([Math.max(4, u), Math.max(4, u)]);
    g.lineWidth = Math.max(2, u * 0.45);
    g.strokeStyle = BLUE_LIGHT;
    g.beginPath();
    g.arc(hnt.nx * w, hnt.ny * h, hnt.r * 1.4, 0, Math.PI * 2);
    g.stroke();
    g.restore();
  }
}

export const randzielFlick: ExerciseDefinition = {
  id: 'randziel-flick',
  category: 'bewegung',
  minutes: 1,
  color: '#2E6DB4',
  icon:
    '<circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" stroke-width="3.2"/><circle cx="24" cy="24" r="1.8" fill="currentColor"/><circle cx="6.5" cy="17" r="4.2" fill="currentColor"/><circle cx="41.5" cy="31" r="4.2" fill="currentColor"/><path d="M17 21.5L12 19.5M31 26.5l5 2" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new RandzielFlick(ctx),
};
