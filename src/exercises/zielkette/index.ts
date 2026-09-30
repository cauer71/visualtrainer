/**
 * Zielkette – ruhende Ziele in vorgegebener Reihenfolge antippen (Zielwechsel-Tempo).
 *
 * Abgrenzung: Zahlenjagd verlangt, Zahlen auf dem Bildschirm zu suchen. Hier muss man nichts suchen:
 * nur das nächste Ziel ist markiert (Pfeil vom zuletzt getippten Kreis, Nummer auf dem nächsten); die
 * übrigen Kreise der Kette sind unbeschriftet. Es geht ums Tempo beim Wechseln von Ziel zu Ziel
 * und darum, wie zügig und treffsicher die Hand von einem Ort zum nächsten kommt. Präzisions-Flick zählt die
 * Mittigkeit eines einzelnen schrumpfenden Ziels, Ziele abräumen lässt die Reihenfolge frei.
 *
 * - Kette aus 4–8 Kreisen; Anordnung und Reihenfolge ändern sich jede Runde (kein Auswendiglernen);
 *   die nächste Kette erscheint nie unter dem zuletzt getippten Punkt.
 * - Stufe (Staircase, 2-down/1-up, je Kette ein Ergebnis): Kettenlänge, Zielgröße, Abstand und die
 *   Zeitmarke je Kette. Gelungen = vollständig, innerhalb der Zeitmarke, höchstens ein Fehltipp.
 * - Feste Zahl an Ketten, keine Zeitstrafe, kein Zeitbonus. Die Zeitmarke ist ein Balken (bei wenig Rest
 *   gestrichelt), kein Blinken.
 * - Fehltipp (nicht aufs nächste Ziel) = ✗ an der Stelle. Trefferfläche ≥ 28 px Radius.
 * - Gemessen wird die Zeit je Kette (Median) und die Zahl der Fehltipps; nicht der Blick.
 */
import { background, circle, glow, ring, text, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { drawCheck, drawCross, playField, restPoint, toastNear } from '../_shared/tippziele';
import {
  type Pt,
  buildChain,
  CHAINS,
  chainGapMs,
  chainLimitMs,
  chainSuccess,
  computeStats,
  hitRadiusPx,
  lengthFor,
  levelOf,
  MAX_LEVEL,
  MIN_LEVEL,
  minStepU,
  nextIndex,
  pointsFor,
  QUICK_CHAINS,
  radiusPx,
  tipFor,
} from './logic';
import { de, it } from './texts';

const FADE_IN_MS = 250;
const CHECK_MS = 600;
const BURST_MS = 420;
const MARK_MS = 650;
const WRONG_COOLDOWN_MS = 350;
const END_HOLD_MS = 900;
const PULSE_MS = 1400;

const BLUE = '#5AA9F0';
const BLUE_DARK = '#2F6FB5';
const BLUE_LIGHT = '#CFE6FF';
const WARM = '#FBBF24';
const DONE = '#86EFAC';

// Intro-Film: Stufe 1, vier Ziele je Kette, ohne Zeitmarke; zwei Ketten mit verschiedener Anordnung.
interface DemoChain {
  at: number;
  pts: Array<{ nx: number; ny: number }>;
  taps: Array<{ delay: number; move: number }>;
}
const DEMO_CHAINS: DemoChain[] = [
  {
    at: 1300,
    pts: [
      { nx: 0.14, ny: 0.3 },
      { nx: 0.4, ny: 0.68 },
      { nx: 0.64, ny: 0.26 },
      { nx: 0.86, ny: 0.62 },
    ],
    taps: [
      { delay: 1300, move: 700 },
      { delay: 350, move: 600 },
      { delay: 350, move: 600 },
      { delay: 350, move: 600 },
    ],
  },
  {
    at: 7000,
    pts: [
      { nx: 0.8, ny: 0.28 },
      { nx: 0.3, ny: 0.22 },
      { nx: 0.52, ny: 0.72 },
      { nx: 0.18, ny: 0.62 },
    ],
    taps: [
      { delay: 600, move: 600 },
      { delay: 250, move: 600 },
      { delay: 250, move: 600 },
      { delay: 250, move: 600 },
    ],
  },
];
const DEMO_END_MS = 11700;
/** Zeitpunkte der Bildunterschriften im Intro-Film (ms seit Start) */
const DEMO_CAPTIONS: Array<{ at: number; key: string }> = [
  { at: 0, key: 'watch' },
  { at: 1400, key: 'next' },
  { at: 3500, key: 'arrow' },
  { at: 7100, key: 'new' },
];

interface Chain {
  /** Orte normiert im Spielfeld (0..1), in der Reihenfolge des Antippens */
  pts: Array<{ nx: number; ny: number }>;
  lvl: number;
  r: number;
  born: number;
  limit: number;
  done: number;
  wrong: number;
}

interface Fx {
  kind: 'hit' | 'check';
  nx: number;
  ny: number;
  r: number;
  t0: number;
}

interface Mark {
  sx: number;
  sy: number;
  t0: number;
}

class Zielkette implements Exercise {
  private readonly demo: boolean;
  private readonly total: number;
  private readonly stair: Staircase;
  private chain: Chain | null = null;
  private fx: Fx[] = [];
  private marks: Mark[] = [];
  private t0 = 0;
  private endAt = Infinity;
  private endT = Infinity;
  private done = false;
  private nextAt = 0;
  private chainsStarted = 0;
  private chainsDone = 0;
  private lastTap: Pt | null = null;
  private lastWrongT = -1e9;
  private times: number[] = [];
  private timedOut = 0;
  private wrong = 0;
  private points = 0;
  private demoIdx = 0;
  private demoCap = 0;
  private autoFreeAt = 0;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.total = ctx.quick ? QUICK_CHAINS : CHAINS;
    this.stair = new Staircase({ start: ctx.startLevel ?? MIN_LEVEL, min: MIN_LEVEL, max: MAX_LEVEL, down: 2, up: 1 });
  }

  // --- Geometrie: immer live aus der Bühne ---

  /** Einheit für Größen: 1 % der kürzeren Seite, auf kleinen Bühnen nie unter 5 px */
  private unit(): number {
    return Math.max(this.ctx.stage.u, 5);
  }

  private level(): number {
    return this.demo ? MIN_LEVEL : levelOf(this.stair.level);
  }

  private px(P: { nx: number; ny: number }): Pt {
    const f = playField(this.ctx.stage, this.demo);
    return { x: f.x + P.nx * f.w, y: f.y + P.ny * f.h };
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
    }
  }

  update(_dt: number, t: number): void {
    if (this.done) return;
    if (t >= this.endAt) {
      this.finishSession(t);
      return;
    }
    if (this.demo) this.runDemo(t);
    else if (!this.chain && this.chainsStarted < this.total && t >= this.nextAt) this.spawnChain(t);
    const C = this.chain;
    if (C && !this.demo && t - C.born >= C.limit) this.timeout(C, t);
    if (this.ctx.autoplay && !this.demo) this.autoUpdate(t);
    this.prune(t);
  }

  private spawnChain(t: number, demo?: DemoChain): void {
    const { rng, stage } = this.ctx;
    const lvl = this.level();
    const U = this.unit();
    const r = radiusPx(lvl, U);
    const f = playField(stage, this.demo);
    let pts: Array<{ nx: number; ny: number }>;
    if (demo) pts = demo.pts;
    else {
      const k = lengthFor(lvl);
      const raw = buildChain(
        rng,
        f.w,
        f.h,
        k,
        r * 1.4,
        r * 2.7,
        Math.min(minStepU(lvl) * U, Math.hypot(f.w, f.h) * 0.4),
        this.lastTap ? { x: this.lastTap.x - f.x, y: this.lastTap.y - f.y } : null,
        Math.min(f.w, f.h) * 0.4,
      );
      pts = raw.map((p) => ({ nx: f.w > 0 ? p.x / f.w : 0.5, ny: f.h > 0 ? p.y / f.h : 0.5 }));
    }
    this.chain = { pts, lvl, r, born: t, limit: chainLimitMs(lvl), done: 0, wrong: 0 };
    this.chainsStarted++;
    this.updateLabel();
  }

  // --- Intro-Film ---

  private runDemo(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    const el = t - this.t0;
    while (this.demoCap < DEMO_CAPTIONS.length && el >= DEMO_CAPTIONS[this.demoCap].at) hud.caption(texts.captions[DEMO_CAPTIONS[this.demoCap++].key]);
    if (this.demoIdx < DEMO_CHAINS.length && el >= DEMO_CHAINS[this.demoIdx].at && !this.chain) {
      const d = DEMO_CHAINS[this.demoIdx++];
      this.spawnChain(t, d);
      d.pts.forEach((p, i) => {
        const c = this.px(p);
        ghost.tap(c.x, c.y, d.taps[i]);
      });
      const rest = restPoint(this.ctx.stage);
      ghost.moveTo(rest.x, rest.y, { delay: 300, move: 450 });
    }
    if (el >= DEMO_END_MS) this.finishSession(t);
  }

  /** Autoplay (Tests): das nächste Ziel antippen, selten daneben oder gar nicht */
  private autoUpdate(t: number): void {
    const { ghost, rng } = this.ctx;
    const C = this.chain;
    if (!C || !ghost.idle || t < this.autoFreeAt || t - C.born < FADE_IN_MS) return;
    const i = nextIndex(C.done, C.pts.length);
    if (i < 0) return;
    const delay = rng.range(100, 250);
    const move = rng.range(220, 380);
    this.autoFreeAt = t + delay + move + 250;
    if (rng.chance(0.03)) return;
    const c = this.px(C.pts[i]);
    const off = rng.chance(0.06) ? C.r * 3.5 + 30 : rng.normal() * C.r * 0.25;
    const a = rng.range(0, Math.PI * 2);
    ghost.tap(c.x + Math.cos(a) * off, c.y + Math.sin(a) * off, { delay, move });
  }

  // --- Eingabe ---

  pointerDown(p: PointerInfo): void {
    if (this.done) return;
    const C = this.chain;
    if (!C || p.t < C.born + 60) return;
    const i = nextIndex(C.done, C.pts.length);
    if (i >= 0) {
      const c = this.px(C.pts[i]);
      if (Math.hypot(p.x - c.x, p.y - c.y) <= hitRadiusPx(C.r)) {
        this.hit(C, i, p);
        return;
      }
    }
    this.miss(C, p);
  }

  private hit(C: Chain, i: number, p: PointerInfo): void {
    const { sfx, hud } = this.ctx;
    C.done = i + 1;
    this.lastTap = { x: p.x, y: p.y };
    this.fx.push({ kind: 'check', nx: C.pts[i].nx, ny: C.pts[i].ny, r: C.r, t0: p.t });
    this.fx.push({ kind: 'hit', nx: C.pts[i].nx, ny: C.pts[i].ny, r: C.r, t0: p.t });
    sfx.tap();
    if (C.done < C.pts.length) return;
    // Kette vollständig
    const ms = p.t - C.born;
    this.times.push(ms);
    this.chain = null;
    this.chainsDone++;
    const ok = chainSuccess(true, false, C.wrong);
    this.points += pointsFor(C.lvl, C.pts.length, C.wrong);
    hud.setScore(this.demo ? null : this.points);
    hud.setProgress(clamp(this.chainsDone / this.total, 0, 1));
    sfx.good();
    if (!this.demo) this.stair.update(ok);
    this.afterChain(p.t);
  }

  /** Tipp nicht aufs nächste Ziel: Fehltipp, weiches ✗ (keine Wirkung im Intro-Film) */
  private miss(C: Chain, p: PointerInfo): void {
    if (this.demo || p.t - this.lastWrongT < WRONG_COOLDOWN_MS) return;
    const { sfx, stage } = this.ctx;
    this.lastWrongT = p.t;
    this.wrong++;
    C.wrong++;
    sfx.bad();
    this.marks.push({ sx: p.x / stage.w, sy: p.y / stage.h, t0: p.t });
  }

  /** Zeitmarke überschritten: Kette ist vorbei (weich ausblenden), zählt als nicht gelungen */
  private timeout(C: Chain, t: number): void {
    const { hud, stage, texts } = this.ctx;
    this.chain = null;
    this.chainsDone++;
    this.timedOut++;
    hud.setProgress(clamp(this.chainsDone / this.total, 0, 1));
    toastNear(hud, stage.w, `✗ ${texts.feedback.late}`, 'info', stage.w / 2, stage.h * 0.3, 1000, clamp(stage.u * 4.2, 16, 30));
    this.stair.update(false);
    this.afterChain(t);
  }

  private afterChain(t: number): void {
    this.nextAt = t + chainGapMs(this.ctx.rng);
    if (!this.demo && this.chainsDone >= this.total) this.endAt = t + END_HOLD_MS;
    this.updateLabel();
  }

  private updateLabel(): void {
    if (this.demo) return;
    const { hud, texts } = this.ctx;
    hud.setLabel(`${texts.feedback.level} ${this.level()} · ${Math.min(this.chainsStarted, this.total)}/${this.total}`);
  }

  private prune(t: number): void {
    if (this.fx.length) this.fx = this.fx.filter((g) => t - g.t0 < (g.kind === 'hit' ? BURST_MS : CHECK_MS));
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
  }

  // -------------------------------------------------------------------------

  private finishSession(t: number): void {
    this.done = true;
    this.endT = t;
    const { sfx, hud } = this.ctx;
    hud.setProgress(1);
    const stats = computeStats(this.times, this.timedOut, this.wrong);
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' },
        secondary: [{ key: 'chains', value: stats.chains, unit: 'count' }],
        score: this.points,
        level: MIN_LEVEL,
      });
      return;
    }
    sfx.done();
    const thr = this.stair.threshold();
    const secondary = [
      { key: 'chains', value: stats.chains, unit: 'count' as const },
      ...(Number.isFinite(stats.medianMs) ? [{ key: 'perChain', value: Math.round(stats.medianMs), unit: 'time' as const }] : []),
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
    const C = this.chain;
    if (C) {
      this.drawChain(g, C, t);
      if (!this.demo) this.drawTimer(g, C, t);
    }
    for (const d of this.fx) this.drawFx(g, d, t);
    for (const m of this.marks) drawCross(g, m.sx * w, m.sy * h, clamp((t - m.t0) / MARK_MS, 0, 1), u, WARM);
  }

  /**
   * Alle Kreise der Kette: wartende unbeschriftet (nur Umriss), erledigte mit Haken, das nächste gefüllt mit
   * Nummer und ruhig pulsierendem Ring; vom zuletzt erledigten Kreis zeigt ein Pfeil zum nächsten.
   */
  private drawChain(g: CanvasRenderingContext2D, C: Chain, t: number): void {
    const age = t - C.born;
    const a = clamp(age / FADE_IN_MS, 0, 1);
    if (a <= 0.01) return;
    const r = C.r;
    const next = nextIndex(C.done, C.pts.length);
    g.save();
    g.globalAlpha = a;
    // Pfeil zuerst, damit er unter den Kreisen liegt
    if (next > 0) this.drawArrow(g, this.px(C.pts[next - 1]), this.px(C.pts[next]), r);
    for (let i = 0; i < C.pts.length; i++) {
      const c = this.px(C.pts[i]);
      if (i < C.done) {
        circle(g, c.x, c.y, r, withAlpha(BLUE_DARK, 0.35));
        ring(g, c.x, c.y, r - 1, withAlpha(BLUE_LIGHT, 0.45), Math.max(2, r * 0.07));
        drawCheck(g, c.x, c.y, 0, clamp(r * 0.5, 8, 24), DONE);
      } else if (i === next) {
        const pulse = this.ctx.reducedMotion ? 0 : 0.5 - 0.5 * Math.cos(((t - C.born) / PULSE_MS) * Math.PI * 2);
        glow(g, c.x, c.y, r, BLUE, 0.7);
        ring(g, c.x, c.y, r * (1.18 + 0.12 * pulse), withAlpha(BLUE_LIGHT, 0.9 - 0.4 * pulse), Math.max(2, r * 0.07));
        circle(g, c.x, c.y, r, BLUE_DARK);
        ring(g, c.x, c.y, r - Math.max(1.5, r * 0.05), BLUE_LIGHT, Math.max(2, r * 0.09));
        text(g, String(i + 1), c.x, c.y + 1, r * 1.05, '#FFFFFF');
      } else {
        circle(g, c.x, c.y, r, 'rgba(30,50,80,0.55)');
        ring(g, c.x, c.y, r - 1, 'rgba(207,230,255,0.45)', Math.max(2, r * 0.07));
      }
    }
    g.restore();
  }

  private drawArrow(g: CanvasRenderingContext2D, from: Pt, to: Pt, r: number): void {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.hypot(dx, dy);
    if (len < r * 3) return;
    const ux = dx / len;
    const uy = dy / len;
    const sx = from.x + ux * r * 1.25;
    const sy = from.y + uy * r * 1.25;
    const ex = to.x - ux * r * 1.55;
    const ey = to.y - uy * r * 1.55;
    const head = Math.max(10, r * 0.55);
    const lw = Math.max(3, r * 0.14);
    g.save();
    g.lineCap = 'round';
    g.lineJoin = 'round';
    // Linie
    g.beginPath();
    g.moveTo(sx, sy);
    g.lineTo(ex - ux * head * 0.6, ey - uy * head * 0.6);
    g.strokeStyle = 'rgba(5,10,20,0.7)';
    g.lineWidth = lw + 3;
    g.stroke();
    g.strokeStyle = BLUE_LIGHT;
    g.lineWidth = lw;
    g.stroke();
    // Spitze
    g.beginPath();
    g.moveTo(ex, ey);
    g.lineTo(ex - ux * head - uy * head * 0.6, ey - uy * head + ux * head * 0.6);
    g.lineTo(ex - ux * head + uy * head * 0.6, ey - uy * head - ux * head * 0.6);
    g.closePath();
    g.fillStyle = BLUE_LIGHT;
    g.strokeStyle = 'rgba(5,10,20,0.7)';
    g.lineWidth = 3;
    g.stroke();
    g.fill();
    g.restore();
  }

  /** Zeitmarke: Balken oberhalb des Spielfelds; bei wenig Rest gestrichelt (Form statt Farbe) */
  private drawTimer(g: CanvasRenderingContext2D, C: Chain, t: number): void {
    const f = playField(this.ctx.stage, false);
    const frac = clamp(1 - (t - C.born) / C.limit, 0, 1);
    const y = f.y - Math.max(10, this.ctx.stage.u * 1.6);
    const lw = Math.max(4, this.ctx.stage.u * 0.8);
    g.save();
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(f.x, y);
    g.lineTo(f.x + f.w, y);
    g.strokeStyle = 'rgba(207,230,255,0.16)';
    g.lineWidth = lw;
    g.stroke();
    if (frac > 0.005) {
      g.beginPath();
      g.moveTo(f.x, y);
      g.lineTo(f.x + f.w * frac, y);
      if (frac < 0.3) g.setLineDash([lw * 1.6, lw * 1.3]);
      g.strokeStyle = BLUE_LIGHT;
      g.lineWidth = lw;
      g.stroke();
    }
    g.restore();
  }

  private drawFx(g: CanvasRenderingContext2D, d: Fx, t: number): void {
    const c = this.px(d);
    if (d.kind === 'check') return;
    if (this.ctx.reducedMotion) return;
    const k = clamp((t - d.t0) / BURST_MS, 0, 1);
    g.save();
    g.beginPath();
    g.arc(c.x, c.y, d.r * (1.05 + 0.7 * easeOut(k)), 0, Math.PI * 2);
    g.strokeStyle = withAlpha(BLUE_LIGHT, 0.85 * (1 - k));
    g.lineWidth = Math.max(1.5, 4 * (1 - k));
    g.stroke();
    g.restore();
  }
}

export const zielkette: ExerciseDefinition = {
  id: 'zielkette',
  category: 'bewegung',
  minutes: 1,
  color: '#2A7AA8',
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="2.8"><circle cx="10" cy="34" r="5.5"/><circle cx="24" cy="14" r="5.5"/><circle cx="39" cy="31" r="5.5"/></g><path d="M14 29l6-10M29 16l7 10" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new Zielkette(ctx),
};
