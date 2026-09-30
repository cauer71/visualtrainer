/**
 * Hinter der Deckung – ein Kreis schiebt sich kurz hinter einem Kasten oder einer Wand hervor,
 * zieht sich wieder zurück und muss vorher angetippt werden.
 *
 * Abgrenzung zu Fünf Türen (fünf feste Türen in einer Reihe, Stern blendet in der Tür ein) und Blicksprung-
 * Galerie (Raster aus Punkten): Hier stehen vier Deckungen verschiedener Form und Größe an wechselnden
 * Plätzen, das Ziel kommt seitlich oder von oben hinter einer Kante hervor und ist zunächst nur zum Teil zu
 * sehen. Der Ort ist also nicht aus einer festen Reihe abzulesen.
 *
 * - Stufe (Staircase, 3-down/1-up → ≈ 79 % Treffer): Sichtzeit 1,6 s → 0,52 s und Ortswechsel-Häufigkeit:
 *   Auf Stufe 1 taucht das Ziel meist am selben Platz wieder auf (25 % Wechsel), auf Stufe 14 fast immer
 *   an einem anderen (90 %).
 * - Die Anordnung der Deckungen wird alle 6 Ziele neu gewürfelt (mit weichem Überblenden, Mindestlücke
 *   und Randabstand, damit das Ziel nie in eine Nachbardeckung ragt).
 * - Das Ziel schiebt sich je 200 ms weich hervor bzw. zurück und blendet dabei ein und aus (kein Blitzen).
 * - Gewertet wird der erste Tipp je Ziel: nahe beim Ziel = Treffer (Zeit = Tipp p.t minus erstes Bild),
 *   sonst Fehler (✗ + gestrichelter Ring am richtigen Ort), kein Tipp = weg. Tipps früher als 120 ms nach
 *   Beginn zählen nicht. Trefferradius ≥ 24 px, ein Tipp auf die Deckung dicht am Ziel zählt auch.
 * - Kein Rot, kein Blitz, kein Wackeln; das Ziel ist eine helle Kugel mit Ring (Form, nicht nur Farbe).
 */
import { background, circle, glow, ring, rrPath, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeInOut, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo, ToastKind } from '../../core/types';
import {
  type Cover,
  type CoverKind,
  type HitSample,
  type Rect,
  type Spot,
  COVERS,
  coverRect,
  computeStats,
  gapMs,
  hitRadiusPx,
  layoutCovers,
  levelOf,
  MAX_LEVEL,
  MIN_LEVEL,
  MIN_RT_MS,
  peekAlpha,
  peekPoints,
  peekProgress,
  pickSpot,
  pointsFor,
  ROUND_LEN,
  SLIDE_MS,
  switchProb,
  tipFor,
  visibleMs,
} from './logic';
import { de, it } from './texts';

const TRIALS = 26;
const QUICK_TRIALS = 4;
const LAYOUT_FADE_MS = 450;
const RING_MS = 700;
const MARK_MS = 650;
const BURST_MS = 420;
// Intro-Film: Stufe 1, lange sichtbar; das 3. Ziel bleibt unangetippt („Weg? Das ist nicht schlimm“)
const DEMO_LIFE_MS = 2600;
const DEMO_GAP_MS = 650;
const DEMO_SPOTS: Spot[] = [
  { cover: 1, side: 'R', anchor: 0.45 },
  { cover: 2, side: 'T', anchor: 0.5 },
  { cover: 0, side: 'L', anchor: 0.5 },
  { cover: 3, side: 'L', anchor: 0.4 },
];
const DEMO_TAPS = [true, true, false, true];
const DEMO_CAPTIONS = ['tap', 'tap', 'gone', 'tap'];
/** Feste Anordnung im Intro-Film: Kasten, Wand, Kasten, Wand in einer Reihe (Feldkoordinaten 0..1) */
const DEMO_COVERS: Cover[] = [
  { nx: 0.15, ny: 0.5, nw: 0.15, nh: 0.24, kind: 'box' },
  { nx: 0.37, ny: 0.5, nw: 0.1, nh: 0.42, kind: 'wall' },
  { nx: 0.59, ny: 0.5, nw: 0.15, nh: 0.24, kind: 'box' },
  { nx: 0.82, ny: 0.5, nw: 0.1, nh: 0.42, kind: 'wall' },
];

const BLUE = '#5AA9F0';
const BLUE_DARK = '#2F6FB5';
const BLUE_LIGHT = '#CFE6FF';
const WARM = '#FBBF24';

interface Target {
  spot: Spot;
  /** true: anderer Ort als beim Ziel davor (oder erstes Ziel der Anordnung) */
  changed: boolean;
  lvl: number;
  born: number;
  life: number;
  judged: boolean;
  planned: boolean;
}

/** Ziel, das sich nach Tipp zurückzieht (Bühnenkoordinaten 0..1) */
interface Leaving {
  hx: number;
  hy: number;
  sx: number;
  sy: number;
  from: number;
  t0: number;
  hit: boolean;
}

interface Fx {
  nx: number;
  ny: number;
  t0: number;
}

class HinterDerDeckung implements Exercise {
  private readonly demo: boolean;
  private readonly total: number;
  private readonly stair: Staircase;
  private phase: 'gap' | 'target' | 'done' = 'gap';
  private gapUntil = 0;
  private target: Target | null = null;
  private covers: Cover[] = [];
  private prev: { covers: Cover[]; t0: number } | null = null;
  private layoutT0 = -1e9;
  private lastSpot: Spot | null = null;
  private spawned = 0;
  private resolved = 0;
  private samples: HitSample[] = [];
  private wrong = 0;
  private missed = 0;
  private points = 0;
  private leaving: Leaving[] = [];
  private marks: Fx[] = [];
  private hints: Array<{ nx: number; ny: number; t0: number }> = [];
  private bursts: Fx[] = [];
  private endAt = 0;
  private endT = Infinity;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.total = this.demo ? DEMO_SPOTS.length : ctx.quick ? QUICK_TRIALS : TRIALS;
    this.stair = new Staircase({ start: ctx.startLevel ?? MIN_LEVEL, min: MIN_LEVEL, max: MAX_LEVEL, down: 3, up: 1 });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private hs(): number {
    return clamp(this.ctx.stage.u * 13, 48, 110);
  }

  /** Spielfeld: oben Platz für Anzeige, im Intro-Film unten Platz für Hand und Bildunterschrift */
  private field(): Rect {
    const s = this.ctx.stage;
    const m = Math.max(10, s.u * 2);
    const top = Math.max(44, s.u * 8);
    const bottom = this.demo ? captionTop(s) - this.hs() * 0.95 - 6 : s.h - m;
    return { x: m, y: top, w: Math.max(60, s.w - 2 * m), h: Math.max(60, bottom - top) };
  }

  private restPoint(): { x: number; y: number } {
    const { w } = this.ctx.stage;
    const hs = this.hs();
    return { x: w - hs * 0.75, y: captionTop(this.ctx.stage) - hs * 0.95 };
  }

  private targetR(): number {
    return clamp(this.ctx.stage.u * 4.2, 16, 40);
  }

  private rectOf(covers: readonly Cover[], i: number): Rect {
    const f = this.field();
    const r = coverRect(covers[i], f.w, f.h);
    return { x: f.x + r.x, y: f.y + r.y, w: r.w, h: r.h };
  }

  private peek(spot: Spot): { hidden: { x: number; y: number }; shown: { x: number; y: number } } {
    return peekPoints(this.rectOf(this.covers, spot.cover), spot.side, spot.anchor, this.targetR());
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    this.covers = this.demo ? DEMO_COVERS : this.newCovers();
    this.phase = 'gap';
    this.gapUntil = t + (this.demo ? 1400 : 700);
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateLabel();
    if (this.demo) {
      hud.caption(this.ctx.texts.captions.watch);
      const r = this.restPoint();
      ghost.moveTo(r.x, r.y, { move: 0 });
    }
  }

  private newCovers(): Cover[] {
    const f = this.field();
    return layoutCovers(this.ctx.rng, f.w, f.h, this.targetR(), COVERS);
  }

  update(_dt: number, t: number): void {
    if (this.phase === 'done') return;
    if (this.phase === 'gap' && t >= this.gapUntil) {
      if (this.spawned >= this.total) {
        this.finishSession(t);
        return;
      }
      this.spawn(t);
    }
    const T = this.target;
    if (this.phase === 'target' && T) {
      if (t - T.born >= T.life) this.timeout(T, t);
      else if (this.ctx.autoplay && !this.demo) this.autoUpdate(T);
    }
    this.prune(t);
    if (this.demo && this.endAt && t >= this.endAt) this.finishSession(t);
  }

  private spawn(t: number): void {
    const { rng, hud, ghost, texts } = this.ctx;
    const lvl = this.demo ? MIN_LEVEL : levelOf(this.stair.level);
    let spot: Spot;
    let changed = true;
    if (this.demo) spot = DEMO_SPOTS[this.spawned];
    else {
      const pick = pickSpot(rng, this.covers, this.lastSpot, switchProb(lvl));
      spot = pick.spot;
      changed = pick.change !== 'same';
    }
    this.lastSpot = spot;
    this.target = { spot, changed, lvl, born: t, life: this.demo ? DEMO_LIFE_MS : visibleMs(lvl), judged: false, planned: false };
    this.spawned++;
    this.phase = 'target';
    this.updateLabel();
    if (this.demo) {
      hud.caption(texts.captions[DEMO_CAPTIONS[this.spawned - 1]]);
      if (DEMO_TAPS[this.spawned - 1]) {
        const c = this.peek(spot).shown;
        ghost.tap(c.x, c.y, { delay: 600, move: 600 });
        const r = this.restPoint();
        ghost.moveTo(r.x, r.y, { delay: 250, move: 420 });
      }
    }
  }

  /** Autoplay (Tests): meist der richtige Ort, manchmal eine andere Deckung oder gar nichts */
  private autoUpdate(T: Target): void {
    const { ghost, rng } = this.ctx;
    if (T.planned || !ghost.idle) return;
    T.planned = true;
    if (rng.chance(0.04)) return;
    let c = this.peek(T.spot).shown;
    if (rng.chance(0.08) && this.covers.length > 1) {
      let i = rng.int(this.covers.length - 1);
      if (i >= T.spot.cover) i++;
      const rc = this.rectOf(this.covers, i);
      c = { x: rc.x + rc.w / 2, y: rc.y + rc.h / 2 };
    }
    ghost.tap(c.x + rng.normal() * 3, c.y + rng.normal() * 3, { delay: rng.range(150, 300), move: rng.range(200, 300) });
  }

  pointerDown(p: PointerInfo): void {
    const T = this.target;
    // In der Pause zwischen Zielen und nach dem ersten Tipp nichts werten; zu frühe Tipps sind geraten
    if (this.phase !== 'target' || !T || T.judged || p.t < T.born + MIN_RT_MS) return;
    const c = this.peek(T.spot).shown;
    const d = Math.hypot(p.x - c.x, p.y - c.y);
    if (d <= hitRadiusPx(this.targetR())) this.hit(T, p.t);
    else this.miss(T, p);
  }

  private hit(T: Target, t: number): void {
    const { sfx, hud, fmt, stage } = this.ctx;
    const rt = t - T.born;
    const c = this.peek(T.spot).shown;
    this.samples.push({ ms: rt, changed: T.changed });
    this.points += pointsFor(T.lvl, rt, T.life);
    sfx.good();
    if (!this.ctx.reducedMotion) this.bursts.push({ nx: c.x / stage.w, ny: c.y / stage.h, t0: t });
    this.retreat(T, t, true);
    this.toastAt(`✓ ${fmt.time(rt)}`, 'good', c.x, c.y - this.targetR() * 1.6, 700, clamp(stage.u * 4.2, 16, 32));
    hud.setScore(this.demo ? null : this.points);
    if (!this.demo) this.stair.update(true);
    this.afterResolve(t);
  }

  private miss(T: Target, p: PointerInfo): void {
    const { sfx, stage, texts } = this.ctx;
    const c = this.peek(T.spot).shown;
    this.wrong++;
    sfx.bad();
    this.marks.push({ nx: p.x / stage.w, ny: p.y / stage.h, t0: p.t });
    this.hints.push({ nx: c.x / stage.w, ny: c.y / stage.h, t0: p.t });
    this.retreat(T, p.t, false);
    this.toastAt(`✗ ${texts.feedback.wrong}`, 'info', p.x, p.y - this.targetR() * 1.2, 800, clamp(stage.u * 3.8, 15, 28));
    if (!this.demo) this.stair.update(false);
    this.afterResolve(p.t);
  }

  private timeout(T: Target, t: number): void {
    const { stage, texts } = this.ctx;
    T.judged = true;
    this.missed++;
    const c = this.peek(T.spot).shown;
    this.toastAt(`✗ ${texts.feedback.gone}`, 'info', c.x, c.y - this.targetR() * 1.6, 700, clamp(stage.u * 3.8, 15, 28));
    if (!this.demo) this.stair.update(false);
    this.afterResolve(t);
  }

  /** Nach einem Tipp zieht sich das Ziel weich zurück (vom aktuellen Stand aus) */
  private retreat(T: Target, t: number, hit: boolean): void {
    T.judged = true;
    const { stage } = this.ctx;
    const pk = this.peek(T.spot);
    this.leaving.push({
      hx: pk.hidden.x / stage.w,
      hy: pk.hidden.y / stage.h,
      sx: pk.shown.x / stage.w,
      sy: pk.shown.y / stage.h,
      from: peekProgress(t - T.born, T.life),
      t0: t,
      hit,
    });
  }

  private afterResolve(t: number): void {
    this.resolved++;
    this.target = null;
    this.phase = 'gap';
    this.gapUntil = t + (this.demo ? DEMO_GAP_MS : gapMs(this.ctx.rng));
    this.ctx.hud.setProgress(this.resolved / this.total);
    this.updateLabel();
    // Neue Anordnung der Deckungen nach jeder Runde (weiches Überblenden in der Pause)
    if (!this.demo && this.spawned % ROUND_LEN === 0 && this.spawned < this.total) {
      this.prev = { covers: this.covers, t0: t };
      this.covers = this.newCovers();
      this.layoutT0 = t;
      this.lastSpot = null;
    }
    if (this.demo && this.resolved >= this.total) this.endAt = t + 1000;
  }

  private toastAt(text: string, kind: ToastKind, x: number, top: number, ms: number, size: number): void {
    const { w } = this.ctx.stage;
    const half = Math.min(w / 2, text.length * size * 0.3 + 8);
    this.ctx.hud.toast(text, kind, { x: clamp(x, half, w - half), y: Math.max(size * 1.1, top - size * 0.8), ms, size });
  }

  private updateLabel(): void {
    if (this.demo) return;
    const lvl = this.target ? this.target.lvl : levelOf(this.stair.level);
    this.ctx.hud.setLabel(`${this.ctx.texts.feedback.level} ${lvl}`);
  }

  private prune(t: number): void {
    if (this.leaving.length) this.leaving = this.leaving.filter((l) => t - l.t0 < SLIDE_MS + 40);
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
    if (this.hints.length) this.hints = this.hints.filter((m) => t - m.t0 < RING_MS);
    if (this.bursts.length) this.bursts = this.bursts.filter((b) => t - b.t0 < BURST_MS);
    if (this.prev && t - this.layoutT0 >= LAYOUT_FADE_MS) this.prev = null;
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
      { key: 'accuracy', value: Math.round(stats.accuracy), unit: 'percent' as const },
      ...(Number.isFinite(stats.medianMs) ? [{ key: 'medianTime', value: Math.round(stats.medianMs), unit: 'time' as const }] : []),
      { key: 'hits', value: stats.hits, unit: 'count' as const },
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
    const r = this.targetR();
    const k = clamp((t - this.layoutT0) / LAYOUT_FADE_MS, 0, 1);
    // Ziele hinter den Deckungen: erst Ziele, dann Deckungen darüber
    for (const l of this.leaving) this.drawLeaving(g, l, t, r);
    for (const b of this.bursts) this.drawBurst(g, b, t, r);
    const T = this.target;
    if (T && this.phase === 'target' && !T.judged) this.drawTarget(g, T, t, r);
    if (this.prev) this.drawCovers(g, this.prev.covers, 1 - easeInOut(k), u);
    this.drawCovers(g, this.covers, this.prev ? easeInOut(k) : 1, u);
    for (const hnt of this.hints) this.drawHint(g, hnt, t, r, u);
    for (const m of this.marks) this.drawMark(g, m, t, u);
  }

  private drawCovers(g: CanvasRenderingContext2D, covers: readonly Cover[], alpha: number, u: number): void {
    if (alpha <= 0.01) return;
    g.save();
    g.globalAlpha = alpha;
    covers.forEach((c, i) => this.drawCover(g, this.rectOf(covers, i), c.kind, u));
    g.restore();
  }

  /** Kasten (mit Kreuzstreben) oder Wand (mit Fugen): dunkel, mit hellerer Oberkante */
  private drawCover(g: CanvasRenderingContext2D, r: Rect, kind: CoverKind, u: number): void {
    const rad = Math.max(4, u * 0.9);
    // Schatten auf dem Boden
    g.save();
    g.fillStyle = 'rgba(0,0,0,0.25)';
    g.beginPath();
    g.ellipse(r.x + r.w / 2, r.y + r.h + rad * 0.4, r.w * 0.55, rad * 0.9, 0, 0, Math.PI * 2);
    g.fill();
    // Körper
    rrPath(g, r.x, r.y, r.w, r.h, rad);
    const grad = g.createLinearGradient(0, r.y, 0, r.y + r.h);
    grad.addColorStop(0, '#2A4670');
    grad.addColorStop(1, '#16294A');
    g.fillStyle = grad;
    g.fill();
    g.lineWidth = Math.max(1.5, u * 0.35);
    g.strokeStyle = 'rgba(207,230,255,0.4)';
    g.stroke();
    // Oberkante
    g.save();
    rrPath(g, r.x, r.y, r.w, r.h, rad);
    g.clip();
    g.fillStyle = 'rgba(207,230,255,0.13)';
    g.fillRect(r.x, r.y, r.w, Math.max(4, r.h * 0.12));
    g.strokeStyle = 'rgba(207,230,255,0.2)';
    g.lineWidth = Math.max(1.2, u * 0.25);
    g.beginPath();
    if (kind === 'box') {
      g.moveTo(r.x, r.y);
      g.lineTo(r.x + r.w, r.y + r.h);
      g.moveTo(r.x + r.w, r.y);
      g.lineTo(r.x, r.y + r.h);
    } else {
      const rows = 5;
      for (let i = 1; i < rows; i++) {
        const y = r.y + (r.h * i) / rows;
        g.moveTo(r.x, y);
        g.lineTo(r.x + r.w, y);
      }
    }
    g.stroke();
    g.restore();
    g.restore();
  }

  /** Helle Kugel mit Ring und Mittelpunkt (Form, nicht nur Farbe) */
  private drawBall(g: CanvasRenderingContext2D, x: number, y: number, r: number, alpha: number): void {
    if (alpha <= 0.01) return;
    g.save();
    g.globalAlpha = alpha;
    glow(g, x, y, r, BLUE, 0.6);
    circle(g, x, y, r, BLUE_LIGHT);
    ring(g, x, y, r * 0.66, BLUE_DARK, Math.max(2, r * 0.13));
    circle(g, x, y, r * 0.26, BLUE_DARK);
    g.restore();
  }

  private drawTarget(g: CanvasRenderingContext2D, T: Target, t: number, r: number): void {
    const p = peekProgress(t - T.born, T.life);
    const a = peekAlpha(p);
    if (a <= 0.01) return;
    const pk = this.peek(T.spot);
    this.drawBall(g, pk.hidden.x + (pk.shown.x - pk.hidden.x) * p, pk.hidden.y + (pk.shown.y - pk.hidden.y) * p, r, a);
  }

  private drawLeaving(g: CanvasRenderingContext2D, l: Leaving, t: number, r: number): void {
    const { w, h } = this.ctx.stage;
    const k = clamp((t - l.t0) / SLIDE_MS, 0, 1);
    const p = l.from * (1 - easeInOut(k));
    const a = peekAlpha(p);
    const hx = l.hx * w;
    const hy = l.hy * h;
    this.drawBall(g, hx + (l.sx * w - hx) * p, hy + (l.sy * h - hy) * p, r, a);
  }

  private drawBurst(g: CanvasRenderingContext2D, b: Fx, t: number, r: number): void {
    const { w, h } = this.ctx.stage;
    const k = clamp((t - b.t0) / BURST_MS, 0, 1);
    g.save();
    g.beginPath();
    g.arc(b.nx * w, b.ny * h, r * (1.1 + 0.9 * easeOut(k)), 0, Math.PI * 2);
    g.strokeStyle = withAlpha(BLUE_LIGHT, 0.8 * (1 - k));
    g.lineWidth = Math.max(1.5, 4 * (1 - k));
    g.stroke();
    g.restore();
  }

  /** Nach einem Fehltipp: gestrichelter Ring dort, wo das Ziel war */
  private drawHint(g: CanvasRenderingContext2D, hnt: { nx: number; ny: number; t0: number }, t: number, r: number, u: number): void {
    const { w, h } = this.ctx.stage;
    const k = clamp((t - hnt.t0) / RING_MS, 0, 1);
    g.save();
    g.globalAlpha = Math.min(1, k * 6) * (1 - k) * 0.9;
    g.setLineDash([Math.max(4, u), Math.max(4, u)]);
    g.lineWidth = Math.max(2, u * 0.45);
    g.strokeStyle = BLUE_LIGHT;
    g.beginPath();
    g.arc(hnt.nx * w, hnt.ny * h, r * 1.5, 0, Math.PI * 2);
    g.stroke();
    g.restore();
  }

  /** Fehltipp: ✗ (Form, nicht nur Farbe), langsam verblassend, kein Blitz */
  private drawMark(g: CanvasRenderingContext2D, m: Fx, t: number, u: number): void {
    const { w, h } = this.ctx.stage;
    const k = clamp((t - m.t0) / MARK_MS, 0, 1);
    const s = Math.max(10, u * 2.2);
    const lw = Math.max(3.5, u * 0.7);
    const x = m.nx * w;
    const y = m.ny * h;
    g.save();
    g.globalAlpha = Math.min(1, k * 8) * (1 - k);
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(x - s, y - s);
    g.lineTo(x + s, y + s);
    g.moveTo(x + s, y - s);
    g.lineTo(x - s, y + s);
    g.strokeStyle = 'rgba(5,10,20,0.75)';
    g.lineWidth = lw + 3;
    g.stroke();
    g.strokeStyle = WARM;
    g.lineWidth = lw;
    g.stroke();
    g.restore();
  }
}

/** Oberkante der Bildunterschrift im Intro-Film (gleiche Formel wie im Runner) */
function captionTop(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return s.h - size * 2.1 - s.h * 0.05;
}

export const hinterDerDeckung: ExerciseDefinition = {
  id: 'hinter-der-deckung',
  category: 'bewegung',
  minutes: 1,
  color: '#3B7BC0',
  icon:
    '<path d="M28 22.9A7 7 0 1 1 28 35.1z" fill="currentColor"/><rect x="6" y="18" width="22" height="22" rx="3.5" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/><path d="M6 18l22 22M28 18L6 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".45"/><path d="M4 43.5h40" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new HinterDerDeckung(ctx),
};
