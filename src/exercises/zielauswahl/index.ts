/**
 * Zielauswahl – mehrere Ziele mit unterschiedlicher Dringlichkeit: erst hoch, dann mittel, dann niedrig.
 *
 * Vorbild: „Zielauswahl nach Bedrohungsfarbe“ (Katalog 510). Das Original unterscheidet nur über den
 * Farbton, bestraft mit Zeit und wackelt bei Fehlern. Hier liegen die Ziele ruhig auf der Bühne; die
 * Dringlichkeit steckt in Form UND Muster (Dreieck voll = hoch, Kreis gestreift = mittel, Quadrat
 * gepunktet = niedrig), die Farbe kommt nur dazu. Eine Legende unten zeigt die Reihenfolge.
 *
 * - Rundenweise: Zahl der Ziele 3 → 8, Größe und Zeit je Ziel nach Stufe (1–12, 2-down/1-up).
 *   Runde geschafft = alles in der Zeit und ohne falsche Reihenfolge. Feste Zahl an Runden.
 * - Falsche Reihenfolge (z. B. ein Kreis vor dem letzten Dreieck) = Fehler: weiches ✗ am Ziel, das Ziel
 *   bleibt liegen. Tipps ins Leere werden nicht bewertet. Keine Zeitstrafe, kein Blitz, kein Wackeln.
 * - Hauptwert = Stufe; dazu Anteil richtiger Reihenfolge, Zeit je Ziel (Median), geschaffte Runden,
 *   verpasste Ziele. „Zeit je Ziel“ enthält das Suchen und Entscheiden, ist also keine Reaktionszeit.
 * - Trefferradius ≥ 28 px; Farbsehschwäche-tauglich (Form + Muster tragen die Information).
 */
import { background, circle, ring, rrPath, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { captionTop, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import {
  buildTiers,
  computeStats,
  countFor,
  currentTier,
  hitRadiusPx,
  isCorrectTap,
  levelOf,
  MAX_LEVEL,
  MIN_LEVEL,
  type Norm,
  pickSpots,
  pointsFor,
  radiusPx,
  remainingByTier,
  roundMs,
  type Tier,
  tipFor,
} from './logic';
import { de, it } from './texts';

const ROUNDS = 10;
const QUICK_ROUNDS = 3;
const FIRST_DELAY_MS = 900;
const FB_MS = 1000;
const POP_MS = 170;
const GONE_MS = 360;
const MARK_MS = 800;
/** Zwei Tipps auf dasselbe falsche Ziel näher beisammen als das zählen als ein Fehler */
const WRONG_COOLDOWN_MS = 450;
/** Zeiten je Ziel über dieser Grenze (Pause, Suchen) zählen nicht */
const MAX_INTERVAL_MS = 6000;

const AMBER = '#F5A524';
const AMBER_LIGHT = '#FFE2A8';
const SKY = '#7CC4FF';
const SKY_DARK = '#16406B';
const GRAY = '#B6C2D6';
const GRAY_DARK = '#2B3A52';

// Intro-Film: vier Ziele (hoch, mittel, mittel, niedrig). Erst wird ein niedriges zu früh angetippt
// (✗), dann in der richtigen Reihenfolge.
const DEMO_TIERS: Tier[] = [0, 1, 1, 2];
const DEMO_SPOTS: Norm[] = [
  { nx: 0.22, ny: 0.3 },
  { nx: 0.72, ny: 0.22 },
  { nx: 0.84, ny: 0.64 },
  { nx: 0.48, ny: 0.62 },
];
interface DemoEvent {
  at: number;
  caption?: string;
  tap?: { idx: number; move: number };
  rest?: boolean;
  end?: boolean;
}
const DEMO_EVENTS: DemoEvent[] = [
  { at: 0, caption: 'watch' },
  { at: 2000, caption: 'first', tap: { idx: 0, move: 900 } },
  { at: 3900, tap: { idx: 3, move: 800 } },
  { at: 4900, caption: 'wrong' },
  { at: 6000, caption: 'mid', tap: { idx: 1, move: 700 } },
  { at: 7200, tap: { idx: 2, move: 600 } },
  { at: 8400, caption: 'last', tap: { idx: 3, move: 700 } },
  { at: 9500, rest: true },
  { at: 10800, end: true },
];

interface Target {
  tier: Tier;
  nx: number;
  ny: number;
  born: number;
  done: boolean;
  /** Zeitpunkt des Wegtippens bzw. Ablaufens */
  goneAt: number;
  goneKind: 'hit' | 'late' | null;
  lastWrong: number;
}

interface Mark {
  x: number;
  y: number;
  t0: number;
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

type Phase = 'wait' | 'play' | 'fb';

class Zielauswahl implements Exercise {
  private readonly demo: boolean;
  private readonly total: number;
  private readonly stair: Staircase;
  private targets: Target[] = [];
  private marks: Mark[] = [];
  private phase: Phase = 'wait';
  private nextAt = 0;
  private roundStart = 0;
  private roundDur = Infinity;
  private roundLvl = MIN_LEVEL;
  private clean = true;
  private lastCorrectT = 0;
  private roundsDone = 0;
  private roundsOk = 0;
  private endAt = Infinity;
  private endT = Infinity;
  private done = false;
  private demoIdx = 0;
  private autoBusyUntil = 0;

  private correctTaps = 0;
  private wrongOrder = 0;
  private missed = 0;
  private points = 0;
  private intervals: number[] = [];

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.total = this.demo ? 1 : ctx.quick ? QUICK_ROUNDS : ROUNDS;
    this.stair = new Staircase({ start: ctx.startLevel ?? MIN_LEVEL, min: MIN_LEVEL, max: MAX_LEVEL, down: 2, up: 1 });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private hs(): number {
    return clamp(this.ctx.stage.u * 13, 48, 110);
  }

  private legendH(): number {
    return clamp(this.ctx.stage.u * 7, 40, 64);
  }

  private legendBottom(): number {
    const s = this.ctx.stage;
    return this.demo ? captionTop(s) - 8 : s.h - Math.max(10, s.u * 2);
  }

  /** Spielfeld: oben Platz für Anzeige und Zeitbalken, unten für die Legende (und im Film die Bildunterschrift) */
  private field(): Rect {
    const s = this.ctx.stage;
    const m = Math.max(10, s.u * 2);
    const top = Math.max(52, s.u * 9);
    const bottom = this.legendBottom() - this.legendH() - 12;
    return { x: m, y: top, w: Math.max(40, s.w - 2 * m), h: Math.max(40, bottom - top) };
  }

  private restPoint(): { x: number; y: number } {
    const { w } = this.ctx.stage;
    const hs = this.hs();
    return { x: w - hs * 0.75, y: this.legendBottom() - this.legendH() - hs * 0.9 };
  }

  private px(T: { nx: number; ny: number }): { x: number; y: number } {
    const f = this.field();
    return { x: f.x + T.nx * f.w, y: f.y + T.ny * f.h };
  }

  private level(): number {
    return this.demo ? MIN_LEVEL : levelOf(this.stair.level);
  }

  private radius(): number {
    return radiusPx(this.roundLvl, this.ctx.stage.u);
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    this.nextAt = t + (this.demo ? 300 : FIRST_DELAY_MS);
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
    if (this.phase === 'wait' && t >= this.nextAt) this.startRound(t);
    if (this.phase === 'fb' && t >= this.nextAt && !this.demo) {
      if (this.roundsDone >= this.total) {
        this.finishSession(t);
        return;
      }
      this.startRound(t);
    }
    if (this.demo && this.phase !== 'wait') this.runDemo(t);
    if (this.phase === 'play') {
      if (!this.demo && t - this.roundStart >= this.roundDur) this.timeUp(t);
      if (this.ctx.autoplay && !this.demo && this.phase === 'play') this.autoUpdate(t);
    }
    this.prune(t);
  }

  private startRound(t: number): void {
    const { rng } = this.ctx;
    this.roundLvl = this.level();
    const n = this.demo ? DEMO_TIERS.length : countFor(this.roundLvl);
    const f = this.field();
    const tiers = this.demo ? DEMO_TIERS : buildTiers(rng, n);
    const spots = this.demo ? DEMO_SPOTS : pickSpots(rng, f.w, f.h, this.radius(), n);
    this.targets = tiers.map((tier, i) => ({
      tier,
      nx: spots[i].nx,
      ny: spots[i].ny,
      born: t,
      done: false,
      goneAt: -1,
      goneKind: null,
      lastWrong: -1e9,
    }));
    this.phase = 'play';
    this.clean = true;
    this.roundStart = t;
    this.lastCorrectT = t;
    this.roundDur = this.demo ? Infinity : roundMs(this.roundLvl);
    this.updateLabel();
  }

  // --- Intro-Film ---

  private runDemo(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    const el = t - this.roundStart;
    while (this.demoIdx < DEMO_EVENTS.length && el >= DEMO_EVENTS[this.demoIdx].at) {
      const e = DEMO_EVENTS[this.demoIdx++];
      if (e.caption) hud.caption(texts.captions[e.caption]);
      if (e.tap) {
        const T = this.targets[e.tap.idx];
        if (T) {
          const p = this.px(T);
          ghost.tap(p.x, p.y, { move: e.tap.move });
        }
      }
      if (e.rest) {
        const r = this.restPoint();
        ghost.moveTo(r.x, r.y, { move: 420 });
      }
      if (e.end) {
        this.finishSession(t);
        return;
      }
    }
  }

  /** Autoplay (Tests): meist die richtige Dringlichkeit, selten eine falsche oder ein Aussetzer */
  private autoUpdate(t: number): void {
    const { ghost, rng } = this.ctx;
    if (!ghost.idle || t < this.autoBusyUntil) return;
    const rem = remainingByTier(
      this.targets.map((x) => x.tier),
      this.targets.map((x) => x.done),
    );
    const cur = currentTier(rem);
    if (cur < 0) return;
    if (rng.chance(0.008)) {
      this.autoBusyUntil = t + 4000;
      return;
    }
    let pool = this.targets.filter((x) => !x.done && x.tier === cur);
    if (rng.chance(0.08)) {
      const others = this.targets.filter((x) => !x.done && x.tier !== cur);
      if (others.length) pool = others;
    }
    if (!pool.length) return;
    const T = pool[rng.int(pool.length)];
    const c = this.px(T);
    const r = this.radius();
    const delay = rng.range(150, 350);
    const move = rng.range(300, 500);
    ghost.tap(c.x + rng.normal() * r * 0.15, c.y + rng.normal() * r * 0.15, { delay, move });
    this.autoBusyUntil = t + delay + move + 220;
  }

  // --- Eingabe ---

  pointerDown(p: PointerInfo): void {
    if (this.done || this.phase !== 'play') return;
    const hit = hitRadiusPx(this.radius());
    let best: Target | null = null;
    let bestD = Infinity;
    for (const T of this.targets) {
      if (T.done || p.t < T.born) continue;
      const c = this.px(T);
      const d = Math.hypot(p.x - c.x, p.y - c.y);
      if (d <= hit && d < bestD) {
        best = T;
        bestD = d;
      }
    }
    if (!best) return;
    const rem = remainingByTier(
      this.targets.map((x) => x.tier),
      this.targets.map((x) => x.done),
    );
    if (isCorrectTap(best.tier, rem)) this.clearTarget(best, p.t);
    else this.wrongTap(best, p.t);
  }

  private clearTarget(T: Target, t: number): void {
    const { sfx, hud } = this.ctx;
    T.done = true;
    T.goneAt = t;
    T.goneKind = 'hit';
    sfx.good();
    if (!this.demo) {
      this.correctTaps++;
      this.points += pointsFor(this.roundLvl);
      if (t - this.lastCorrectT <= MAX_INTERVAL_MS) this.intervals.push(t - this.lastCorrectT);
      hud.setScore(this.points);
    }
    this.lastCorrectT = t;
    if (this.targets.every((x) => x.done)) this.endRound(t, true);
  }

  /** Falsche Reihenfolge: weiches ✗ am Ziel, das Ziel bleibt liegen */
  private wrongTap(T: Target, t: number): void {
    if (t - T.lastWrong < WRONG_COOLDOWN_MS) return;
    T.lastWrong = t;
    this.ctx.sfx.bad();
    const c = this.px(T);
    this.marks.push({ x: c.x, y: c.y - this.radius() * 1.45, t0: t });
    if (this.demo) return;
    this.wrongOrder++;
    this.clean = false;
  }

  private timeUp(t: number): void {
    let left = 0;
    for (const T of this.targets) {
      if (T.done) continue;
      T.done = true;
      T.goneAt = t;
      T.goneKind = 'late';
      left++;
    }
    this.missed += left;
    this.clean = false;
    this.endRound(t, false, true);
  }

  private endRound(t: number, allDone: boolean, timedOut = false): void {
    const { sfx, hud, texts, stage } = this.ctx;
    this.phase = 'fb';
    this.nextAt = t + FB_MS;
    if (this.demo) {
      this.roundsDone++;
      const f0 = this.field();
      hud.toast(`✓ ${texts.feedback.roundOk}`, 'good', { x: stage.w / 2, y: f0.y + f0.h / 2, ms: 900, size: clamp(stage.u * 5, 18, 34) });
      return;
    }
    const ok = allDone && this.clean;
    this.roundsDone++;
    if (ok) this.roundsOk++;
    this.stair.update(ok);
    hud.setProgress(clamp(this.roundsDone / this.total, 0, 1));
    const f = this.field();
    const x = stage.w / 2;
    const y = f.y + f.h / 2;
    if (ok) {
      sfx.done();
      hud.toast(`✓ ${texts.feedback.roundOk}`, 'good', { x, y, ms: 800, size: clamp(stage.u * 5, 18, 34) });
    } else if (timedOut) {
      hud.toast(`✗ ${texts.feedback.roundTime}`, 'info', { x, y, ms: 900, size: clamp(stage.u * 5, 18, 34) });
    } else {
      hud.toast(`✗ ${texts.feedback.roundOrder}`, 'info', { x, y, ms: 900, size: clamp(stage.u * 5, 18, 34) });
    }
    this.updateLabel();
  }

  private updateLabel(): void {
    if (this.demo) return;
    this.ctx.hud.setLabel(`${this.ctx.texts.feedback.level} ${this.level()}`);
  }

  private prune(t: number): void {
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
  }

  // -------------------------------------------------------------------------

  private finishSession(t: number): void {
    this.done = true;
    this.endT = t;
    this.ctx.hud.setProgress(1);
    const s = computeStats(this.correctTaps, this.wrongOrder, this.missed, this.roundsOk, this.roundsDone, this.intervals);
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' },
        secondary: [{ key: 'roundsOk', value: 1, unit: 'count' }],
        score: 0,
        level: MIN_LEVEL,
      });
      return;
    }
    this.ctx.sfx.done();
    const thr = this.stair.threshold();
    const secondary = [
      { key: 'orderPct', value: Math.round(s.orderPct), unit: 'percent' as const },
      ...(Number.isFinite(s.medianMs) ? [{ key: 'perTarget', value: Math.round(s.medianMs), unit: 'time' as const }] : []),
      { key: 'roundsOk', value: s.roundsOk, unit: 'count' as const },
      { key: 'missed', value: s.missed, unit: 'count' as const },
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
    const f = this.field();
    this.drawTimer(g, f, t, u);
    const r = this.radius();
    for (const T of this.targets) this.drawTarget(g, T, t, r);
    for (const m of this.marks) drawSoftCross(g, m.x, m.y, Math.max(10, u * 2.4), markAlpha(t - m.t0, MARK_MS));
    this.drawLegend(g, u);
  }

  /** Zeitbalken der Runde: schrumpft von rechts (Länge = Restzeit; im Film nicht gezeigt) */
  private drawTimer(g: CanvasRenderingContext2D, f: Rect, t: number, u: number): void {
    if (this.demo || this.phase !== 'play' || !Number.isFinite(this.roundDur)) return;
    const frac = clamp(1 - (t - this.roundStart) / this.roundDur, 0, 1);
    const hgt = Math.max(5, u * 0.9);
    const y = f.y - hgt - 8;
    g.save();
    rrPath(g, f.x, y, f.w, hgt, hgt / 2);
    g.fillStyle = 'rgba(207,230,255,0.12)';
    g.fill();
    if (frac > 0.003) {
      rrPath(g, f.x, y, Math.max(hgt, f.w * frac), hgt, hgt / 2);
      g.fillStyle = 'rgba(207,230,255,0.85)';
      g.fill();
    }
    g.restore();
  }

  private drawTarget(g: CanvasRenderingContext2D, T: Target, t: number, r0: number): void {
    const c = this.px(T);
    let alpha = clamp((t - T.born) / POP_MS, 0, 1);
    let r = this.ctx.reducedMotion ? r0 : r0 * (0.85 + 0.15 * easeOut((t - T.born) / POP_MS));
    if (T.done) {
      const k = clamp((t - T.goneAt) / GONE_MS, 0, 1);
      if (k >= 1) return;
      if (T.goneKind === 'hit') {
        alpha *= 1 - k;
        if (!this.ctx.reducedMotion) {
          g.save();
          g.beginPath();
          g.arc(c.x, c.y, r0 * (1.1 + 0.7 * easeOut(k)), 0, Math.PI * 2);
          g.strokeStyle = `rgba(207,230,255,${0.8 * (1 - k)})`;
          g.lineWidth = Math.max(1.5, 4 * (1 - k));
          g.stroke();
          g.restore();
        }
      } else {
        alpha *= 0.85 * (1 - k);
      }
    }
    if (alpha <= 0.01) return;
    g.save();
    g.globalAlpha = alpha;
    drawTier(g, T.tier, c.x, c.y, r);
    if (T.done && T.goneKind === 'late') ring(g, c.x, c.y, r * 1.3, 'rgba(232,238,247,0.8)', Math.max(2, r * 0.07), [6, 6]);
    g.restore();
  }

  /** Legende: Dringlichkeit hoch › mittel › niedrig, mit den echten Formen */
  private drawLegend(g: CanvasRenderingContext2D, u: number): void {
    const { w } = this.ctx.stage;
    const { texts } = this.ctx;
    const lh = this.legendH();
    const cy = this.legendBottom() - lh / 2;
    const size = clamp(u * 3.2, 13, 22);
    const ir = Math.min(lh * 0.28, size * 0.95);
    const names = [texts.feedback.high, texts.feedback.mid, texts.feedback.low];
    const prefix = `${texts.feedback.urgency}:`;
    g.save();
    g.font = `700 ${Math.round(size)}px system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;
    g.textBaseline = 'middle';
    const gap = Math.max(8, size * 0.6);
    const sep = size * 1.4;
    const nameW = names.map((n) => g.measureText(n).width);
    const items = nameW.reduce((a, b) => a + ir * 2 + 6 + b, 0) + sep * 2;
    const preW = g.measureText(prefix).width + gap;
    const showPre = items + preW + 24 <= w;
    const total = items + (showPre ? preW : 0);
    const padX = 14;
    const x0 = (w - total) / 2;
    rrPath(g, x0 - padX, cy - lh / 2, total + padX * 2, lh, lh / 2);
    g.fillStyle = 'rgba(20,35,59,0.85)';
    g.fill();
    g.strokeStyle = 'rgba(232,238,247,0.2)';
    g.lineWidth = 1;
    g.stroke();
    let x = x0;
    g.fillStyle = 'rgba(232,238,247,0.8)';
    g.textAlign = 'left';
    if (showPre) {
      g.fillText(prefix, x, cy);
      x += preW;
    }
    for (let i = 0; i < 3; i++) {
      drawTier(g, i as Tier, x + ir, cy, ir);
      g.fillStyle = '#E8EEF7';
      g.textAlign = 'left';
      g.fillText(names[i], x + ir * 2 + 6, cy);
      x += ir * 2 + 6 + nameW[i];
      if (i < 2) {
        g.fillStyle = 'rgba(232,238,247,0.6)';
        g.textAlign = 'center';
        g.fillText('›', x + sep / 2, cy);
        x += sep;
      }
    }
    g.restore();
  }
}

/** Dringlichkeit als Form + Muster: 0 Dreieck voll, 1 Kreis gestreift, 2 Quadrat gepunktet (Farbe nur zusätzlich) */
function drawTier(g: CanvasRenderingContext2D, tier: Tier, cx: number, cy: number, r: number): void {
  g.save();
  g.lineJoin = 'round';
  if (tier === 0) {
    g.beginPath();
    g.moveTo(cx, cy - r * 1.12);
    g.lineTo(cx + r * 1.08, cy + r * 0.82);
    g.lineTo(cx - r * 1.08, cy + r * 0.82);
    g.closePath();
    g.fillStyle = AMBER;
    g.fill();
    g.strokeStyle = AMBER_LIGHT;
    g.lineWidth = Math.max(2, r * 0.1);
    g.stroke();
  } else if (tier === 1) {
    circle(g, cx, cy, r, SKY_DARK);
    g.save();
    g.beginPath();
    g.arc(cx, cy, r, 0, Math.PI * 2);
    g.clip();
    g.strokeStyle = withAlpha(SKY, 0.95);
    g.lineWidth = Math.max(2, r * 0.17);
    const step = Math.max(6, r * 0.42);
    g.beginPath();
    for (let k = -2 * r; k <= 2 * r; k += step) {
      g.moveTo(cx + k - r, cy + r);
      g.lineTo(cx + k + r, cy - r);
    }
    g.stroke();
    g.restore();
    ring(g, cx, cy, r - Math.max(1, r * 0.04), SKY, Math.max(2, r * 0.1));
  } else {
    const s = r * 0.92;
    rrPath(g, cx - s, cy - s, s * 2, s * 2, s * 0.22);
    g.fillStyle = GRAY_DARK;
    g.fill();
    g.strokeStyle = GRAY;
    g.lineWidth = Math.max(2, r * 0.1);
    g.stroke();
    g.fillStyle = GRAY;
    const d = s * 0.52;
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) circle(g, cx + i * d, cy + j * d, Math.max(1.4, r * 0.1), GRAY);
  }
  g.restore();
}

export const zielauswahl: ExerciseDefinition = {
  id: 'zielauswahl',
  category: 'konzentration',
  minutes: 2,
  color: '#7A5195',
  icon:
    '<path d="M11 18l7-12 7 12z" fill="currentColor"/><circle cx="36" cy="13" r="7" fill="none" stroke="currentColor" stroke-width="2.8"/><path d="M31.5 17.5l9-9M35 19.5l6-6M31 12l6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="10" y="29" width="14" height="14" rx="3" fill="none" stroke="currentColor" stroke-width="2.8"/><circle cx="14.5" cy="33.5" r="1.4" fill="currentColor"/><circle cx="19.5" cy="33.5" r="1.4" fill="currentColor"/><circle cx="14.5" cy="38.5" r="1.4" fill="currentColor"/><circle cx="19.5" cy="38.5" r="1.4" fill="currentColor"/><path d="M29 36h14m-5-5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new Zielauswahl(ctx),
};
