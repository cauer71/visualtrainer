/**
 * Winkel halten – in der Mitte warten, am Rand taucht plötzlich ein Ziel auf (Katalog 511, Touch-Fassung).
 *
 * Ehrlicher Kern: eine Reaktionsaufgabe mit Ziel, kein „Vorhalten“ und keine Winkelmessung. Unterschied zu
 * Randziel-Flick (Start per Tipp auf eine Marke, Zeit ist kein Thema der Wartezeit) und Blitzreaktion (kein Ort):
 * Hier zählt das ruhige Abwarten – wer zu früh tippt, hat einen Frühstart.
 *
 * - Zwei Durchgänge (Türöffnungen in einer Wand) links und rechts. Nach einer unvorhersehbaren Wartezeit
 *   (1 s + exponentieller Anteil, nicht alternd, höchstens 4,5 s) blendet dort ein Ziel weich ein (je 130 ms) und
 *   schiebt sich langsam (360 ms, sinusförmig) ein Stück heraus – kein Blitzen.
 * - Frühstart: Tipp in der Wartezeit oder weniger als 100 ms nach Erscheinen. Er beendet den Durchgang als Fehler
 *   (✗ + Hinweis), zählt für die Stufe als Fehlversuch und wird getrennt gezählt. Kein Zeitabzug.
 * - Stufe (Staircase, 3-down/1-up → ≈ 79 %): Zielgröße 6,8 u → 3,6 u, Sichtzeit 1,7 s → 0,52 s, die Ziele
 *   streuen von 25 % bis 85 % der Höhe. Die Wartezeit hängt nicht von der Stufe ab (sie bleibt unvorhersehbar).
 * - Gewertet wird der erste Tipp nach dem Erscheinen: im Trefferkreis (≥ 28 px) = Treffer, sonst Fehlklick.
 *   Zeit = Tipp (p.t) minus erstes gezeichnetes Bild des Ziels; Auswertung mit Median. Enthält die Verzögerung des
 *   Touchscreens – nur als Vergleich mit dir selbst auf diesem Gerät zu lesen. Der Blick wird nicht gemessen.
 */
import { background } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { classifyTap } from '../_shared/vorperiode';
import {
  captionTop,
  drawDisc,
  drawHitRing,
  drawMissMark,
  fadeAlpha,
  FADE_MS,
  toastAt,
} from '../_shared/ziel-auftauchen';
import {
  type HitSample,
  type Layout,
  type Side,
  computeStats,
  EARLY_GAP_MS,
  emerge,
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
const QUICK_TRIALS = 4;
const RING_MS = 700;
const MARK_MS = 650;
const BURST_MS = 420;
/** Das Ziel schiebt sich um diesen Anteil seines Radius nach innen */
const SLIDE_R = 0.9;
const START_GRACE_MS = 900;
// Intro-Film: Stufe 1, lange sichtbar. Der 2. Durchgang zeigt einen Frühstart (Ziel erscheint dort nie)
const DEMO_LIFE_MS = 3000;
const DEMO_WAITS = [1300, 1600, 1100, 1100];
const DEMO_TRIALS: Array<{ side: Side; ny: number; early: boolean }> = [
  { side: 'right', ny: 0.35, early: false },
  { side: 'left', ny: 0.5, early: true },
  { side: 'left', ny: 0.6, early: false },
  { side: 'right', ny: 0.5, early: false },
];
const WAIT_CAPTIONS = ['wait', 'early', 'both', 'both'];

const AMBER = '#F59E0B';
const AMBER_LIGHT = '#FDE68A';
const WARM = '#FBBF24';

type Phase = 'gap' | 'wait' | 'target' | 'done';

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

class WinkelHalten implements Exercise {
  private readonly demo: boolean;
  private readonly total: number;
  private readonly stair: Staircase;
  private phase: Phase = 'gap';
  private waitUntil = 0;
  private gapUntil = 0;
  private target: Target | null = null;
  private sides: Side[] = [];
  private resolved = 0;
  private samples: HitSample[] = [];
  private early = 0;
  private wrong = 0;
  private missed = 0;
  private points = 0;
  private marks: Fx[] = [];
  private hints: Fx[] = [];
  private bursts: Fx[] = [];
  private dispLevel = MIN_LEVEL;
  private autoEarlyAt = -1;
  private autoPlanned = false;
  private endAt = 0;
  private endT = Infinity;

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

  /** Ruheplatz der Geister-Hand: unter dem Fixationskreuz */
  private rest(lay: Layout): { x: number; y: number } {
    return { x: lay.cx, y: lay.cy + lay.arm * 3 };
  }

  /** Mitte des Ziels zum Zeitpunkt `e` (0 = im Durchgang, 1 = ganz herausgeschoben) */
  private pos(lay: Layout, T: Target, e: number): { x: number; y: number } {
    const c = targetAt(lay, T.side, T.ny);
    return { x: c.x + (T.side === 'left' ? 1 : -1) * SLIDE_R * lay.r * e, y: c.y };
  }

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateLabel();
    this.gapUntil = t + (this.demo ? 500 : START_GRACE_MS);
    this.phase = 'gap';
    if (this.demo) {
      hud.caption(this.ctx.texts.captions[WAIT_CAPTIONS[0]]);
      const r = this.rest(this.lay());
      ghost.moveTo(r.x, r.y, { move: 0 });
    }
  }

  update(_dt: number, t: number): void {
    if (this.phase === 'done') return;
    if (this.phase === 'gap' && t >= this.gapUntil) {
      if (this.resolved >= this.total) {
        this.finishSession(t);
        return;
      }
      this.beginWait(t);
    }
    if (this.phase === 'wait') {
      if (t >= this.waitUntil) this.spawn(t);
      else if (this.ctx.autoplay && !this.demo) this.autoWait(t);
    }
    const T = this.target;
    if (this.phase === 'target' && T) {
      if (t - T.born >= T.life) this.timeout(T, t);
      else if (this.ctx.autoplay && !this.demo) this.autoTarget(T);
    }
    this.prune(t);
    if (this.demo && this.endAt && t >= this.endAt) this.finishSession(t);
  }

  private beginWait(t: number): void {
    const { rng, hud, texts, ghost } = this.ctx;
    this.dispLevel = this.demo ? MIN_LEVEL : levelOf(this.stair.level);
    this.phase = 'wait';
    this.waitUntil = t + (this.demo ? DEMO_WAITS[this.resolved] : waitMs(rng));
    this.autoPlanned = false;
    this.autoEarlyAt = this.ctx.autoplay && !this.demo && rng.chance(0.06) ? t + rng.range(250, Math.max(300, (this.waitUntil - t) * 0.8)) : -1;
    this.updateLabel();
    if (this.demo) {
      hud.caption(texts.captions[WAIT_CAPTIONS[this.resolved]]);
      const lay = this.lay();
      // Frühstart-Durchgang: Die Hand tippt vor dem Auftauchen
      if (DEMO_TRIALS[this.resolved].early) ghost.tap(lay.cx, lay.cy + lay.arm * 3, { delay: 800, move: 0 });
    }
  }

  private spawn(t: number): void {
    const { rng, hud, ghost, texts } = this.ctx;
    const lvl = this.demo ? MIN_LEVEL : levelOf(this.stair.level);
    let side: Side;
    let ny: number;
    if (this.demo) {
      ({ side, ny } = DEMO_TRIALS[this.resolved]);
    } else {
      side = pickSide(rng, this.sides);
      ny = rng.next();
    }
    this.sides.push(side);
    this.target = { side, ny, lvl, born: t, life: this.demo ? DEMO_LIFE_MS : lifeMs(lvl), judged: false };
    this.phase = 'target';
    this.autoPlanned = false;
    this.updateLabel();
    if (this.demo) {
      hud.caption(texts.captions.tap);
      const c = this.pos(this.lay(), this.target, 1);
      ghost.tap(c.x, c.y, { delay: 450, move: 600 });
      const r = this.rest(this.lay());
      ghost.moveTo(r.x, r.y, { delay: 300, move: 500 });
    }
  }

  /** Autoplay (Tests): ab und zu ein Frühstart */
  private autoWait(t: number): void {
    const { ghost } = this.ctx;
    if (this.autoEarlyAt < 0 || t < this.autoEarlyAt || !ghost.idle) return;
    this.autoEarlyAt = -1;
    const r = this.rest(this.lay());
    ghost.tap(r.x, r.y, { delay: 0, move: 0 });
  }

  /** Autoplay (Tests): meist treffen, manchmal daneben oder gar nicht tippen */
  private autoTarget(T: Target): void {
    const { ghost, rng } = this.ctx;
    if (this.autoPlanned || !ghost.idle) return;
    this.autoPlanned = true;
    if (rng.chance(0.04)) return;
    const lay = this.lay();
    const c = this.pos(lay, T, 1);
    const off = rng.chance(0.08) ? lay.hitR * 2.4 : 0;
    const a = rng.range(0, Math.PI * 2);
    ghost.tap(c.x + rng.normal() * 3 + Math.cos(a) * off, c.y + rng.normal() * 3 + Math.sin(a) * off, {
      delay: rng.range(160, 300),
      move: rng.range(280, 420),
    });
    const r = this.rest(lay);
    ghost.moveTo(r.x, r.y, { delay: 150, move: 350 });
  }

  pointerDown(p: PointerInfo): void {
    if (this.phase === 'wait') {
      this.earlyStart(p, null);
      return;
    }
    const T = this.target;
    // Nach dem ersten Tipp (z. B. zweiter Finger) und in der Pause nichts werten
    if (this.phase !== 'target' || !T || T.judged || p.t < T.born) return;
    if (classifyTap(p.t - T.born) === 'early') {
      this.earlyStart(p, T);
      return;
    }
    const lay = this.lay();
    const c = this.pos(lay, T, 1);
    if (inCircle(p.x, p.y, c.x, c.y, lay.hitR)) this.hit(T, lay, p.t);
    else this.miss(T, lay, p);
  }

  /** Frühstart: Tipp vor dem Auftauchen oder weniger als 100 ms danach */
  private earlyStart(p: PointerInfo, T: Target | null): void {
    const { sfx, stage, texts } = this.ctx;
    const lay = this.lay();
    if (T) T.judged = true;
    this.target = null;
    this.early++;
    sfx.bad();
    this.marks.push({ nx: p.x / stage.w, ny: p.y / stage.h, t0: p.t, r: lay.r });
    toastAt(this.ctx, texts.feedback.early, 'bad', lay.cx, lay.cy - lay.arm * 2, 900, clamp(stage.u * 4, 16, 30));
    if (!this.demo) this.stair.update(false);
    this.afterResolve(p.t, EARLY_GAP_MS);
  }

  private hit(T: Target, lay: Layout, t: number): void {
    const { sfx, hud, fmt, stage } = this.ctx;
    const rt = t - T.born;
    T.judged = true;
    this.samples.push({ ms: rt, side: T.side });
    this.points += pointsFor(T.lvl, rt, T.life);
    sfx.good();
    const c = this.pos(lay, T, 1);
    if (!this.ctx.reducedMotion) this.bursts.push({ nx: c.x / stage.w, ny: c.y / stage.h, t0: t, r: lay.r });
    toastAt(this.ctx, fmt.time(rt), 'good', c.x + (T.side === 'left' ? 1 : -1) * lay.r * 2, c.y - lay.r, 700, clamp(stage.u * 4.2, 16, 32));
    hud.setScore(this.points);
    if (!this.demo) this.stair.update(true);
    this.afterResolve(t, GAP_MS);
  }

  private miss(T: Target, lay: Layout, p: PointerInfo): void {
    const { sfx, stage, texts } = this.ctx;
    T.judged = true;
    this.wrong++;
    sfx.bad();
    const c = this.pos(lay, T, 1);
    this.marks.push({ nx: p.x / stage.w, ny: p.y / stage.h, t0: p.t, r: lay.r });
    this.hints.push({ nx: c.x / stage.w, ny: c.y / stage.h, t0: p.t, r: lay.r });
    toastAt(this.ctx, texts.feedback.wrong, 'bad', p.x, p.y - lay.r, 800, clamp(stage.u * 3.8, 15, 28));
    if (!this.demo) this.stair.update(false);
    this.afterResolve(p.t, GAP_MS);
  }

  private timeout(T: Target, t: number): void {
    const { stage, texts } = this.ctx;
    T.judged = true;
    this.missed++;
    const lay = this.lay();
    const c = this.pos(lay, T, 1);
    this.hints.push({ nx: c.x / stage.w, ny: c.y / stage.h, t0: t, r: lay.r });
    toastAt(this.ctx, texts.feedback.gone, 'info', c.x + (T.side === 'left' ? 1 : -1) * lay.r * 2, c.y - lay.r, 700, clamp(stage.u * 3.8, 15, 28));
    if (!this.demo) this.stair.update(false);
    this.afterResolve(t, GAP_MS);
  }

  private afterResolve(t: number, gap: number): void {
    this.resolved++;
    this.target = null;
    this.phase = 'gap';
    this.gapUntil = t + gap;
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
    const stats = computeStats(this.samples, this.early, this.wrong, this.missed);
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
      { key: 'early', value: stats.early, unit: 'count' as const },
      { key: 'accuracy', value: Math.round(stats.accuracy), unit: 'percent' as const },
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
    const lay = this.lay();
    const bottom = this.demo ? captionTop(this.ctx.stage) - 6 : h;
    this.drawWalls(g, lay, w, bottom, u);
    this.drawCross(g, lay, u);
    for (const hnt of this.hints) this.drawHint(g, hnt, t, u);
    for (const b of this.bursts) drawHitRing(g, b.nx * w, b.ny * h, b.r, clamp((t - b.t0) / BURST_MS, 0, 1), AMBER_LIGHT);
    const T = this.target;
    if (T && this.phase === 'target') {
      const age = t - T.born;
      const e = this.ctx.reducedMotion ? 1 : emerge(age);
      const c = this.pos(lay, T, e);
      const r = this.ctx.reducedMotion ? lay.r : lay.r * (0.88 + 0.12 * easeOut(age / FADE_MS));
      drawDisc(g, c.x, c.y, r, fadeAlpha(age, T.life), AMBER, AMBER_LIGHT);
    }
    for (const m of this.marks) drawMissMark(g, m.nx * w, m.ny * h, clamp((t - m.t0) / MARK_MS, 0, 1), u, WARM);
  }

  /** Zwei Wände mit je einer hohen Öffnung (Durchgang); die Form trägt die Information, nicht die Farbe */
  private drawWalls(g: CanvasRenderingContext2D, lay: Layout, w: number, bottom: number, u: number): void {
    const wallW = lay.slotW;
    const y0 = Math.max(0, lay.yMin - lay.hitR);
    const y1 = Math.min(bottom, lay.yMax + lay.hitR);
    for (const side of ['left', 'right'] as const) {
      const x = side === 'left' ? 0 : w - wallW;
      g.save();
      g.fillStyle = 'rgba(120,150,200,0.14)';
      g.fillRect(x, 0, wallW, bottom);
      // Durchgang: dunkle Öffnung
      g.fillStyle = 'rgba(3,8,18,0.9)';
      g.fillRect(x, y0, wallW, y1 - y0);
      g.lineWidth = Math.max(1.5, u * 0.3);
      g.strokeStyle = 'rgba(232,238,247,0.3)';
      g.strokeRect(x + (side === 'left' ? -2 : 0), y0, wallW + 2, y1 - y0);
      // Innenkante der Wand
      const ex = side === 'left' ? wallW : w - wallW;
      g.strokeStyle = 'rgba(232,238,247,0.22)';
      g.lineWidth = Math.max(2, u * 0.4);
      g.beginPath();
      g.moveTo(ex, 0);
      g.lineTo(ex, bottom);
      g.stroke();
      g.restore();
    }
  }

  /** Fixationskreuz in der Mitte: hier wartest du */
  private drawCross(g: CanvasRenderingContext2D, lay: Layout, u: number): void {
    g.save();
    g.strokeStyle = 'rgba(232,238,247,0.85)';
    g.lineWidth = Math.max(2, u * 0.5);
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(lay.cx - lay.arm, lay.cy);
    g.lineTo(lay.cx + lay.arm, lay.cy);
    g.moveTo(lay.cx, lay.cy - lay.arm);
    g.lineTo(lay.cx, lay.cy + lay.arm);
    g.stroke();
    g.restore();
  }

  /** „Hier war es“: gestrichelter Ring am Ziel nach Fehltipp oder wenn es weg war */
  private drawHint(g: CanvasRenderingContext2D, hnt: Fx, t: number, u: number): void {
    const { w, h } = this.ctx.stage;
    const k = clamp((t - hnt.t0) / RING_MS, 0, 1);
    g.save();
    g.globalAlpha = Math.min(1, k * 6) * (1 - k) * 0.9;
    g.setLineDash([Math.max(4, u), Math.max(4, u)]);
    g.lineWidth = Math.max(2, u * 0.45);
    g.strokeStyle = AMBER_LIGHT;
    g.beginPath();
    g.arc(hnt.nx * w, hnt.ny * h, hnt.r * 1.4, 0, Math.PI * 2);
    g.stroke();
    g.restore();
  }
}

export const winkelHalten: ExerciseDefinition = {
  id: 'winkel-halten',
  category: 'reaktion',
  minutes: 1,
  color: '#C8641E',
  icon:
    '<path d="M3 6h7v36H3zM38 6h7v36h-7z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M24 18v12M18 24h12" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><circle cx="36.5" cy="15" r="4.4" fill="currentColor"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new WinkelHalten(ctx),
};
