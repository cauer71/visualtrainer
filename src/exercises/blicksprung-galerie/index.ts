/**
 * Blicksprung-Galerie – ein Ziel erscheint an wechselnden Zellen eines Rasters, man tippt es an.
 *
 * Abgrenzung zu Zielfang (bewegtes Ziel, Vorhalt) und Blitzreaktion (einfache Reaktion, kein Zielen):
 * Hier springt das Ziel zwischen festen, sichtbar markierten Orten – ohne Zwischenpositionen –
 * und die Stufe steuert Raster, Anzeigedauer und Sprungweite.
 *
 * - Ziel blendet weich ein und aus (je ≥ 130 ms), kein Blitzen, keine Bewegung.
 * - Stufe (Staircase, 3-down/1-up → ≈ 79 % richtig): größeres Raster (3×3 → 4×4), kürzere
 *   Anzeigedauer (2,4 s → 0,7 s) und größere Mindest-Sprungweite zum vorigen Ziel.
 * - Zellen sind Trefferflächen (≥ 48 px ≈ 9 mm), Raster nutzt die Bühne (Quer- und Hochformat).
 * - Gewertet wird der erste Tipp pro Ziel: richtige Zelle = Treffer, andere Zelle = Fehler,
 *   ohne Tipp = weg. Zeit = Tipp (p.t) minus erstes gezeichnetes Bild des Ziels; Median nur richtige.
 * - Es wird keine Augenbewegung gemessen – nur Zeit bis zum Tipp.
 */
import { background, circle, glow, ring, rrPath, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo, ToastKind } from '../../core/types';
import {
  type GridLayout,
  MAX_LEVEL,
  MIN_LEVEL,
  FAR_JUMP,
  cellAt,
  cellCenter,
  chooseLayout,
  computeStats,
  gapMs,
  jumpDistance,
  levelOf,
  lifeFor,
  pickCell,
  targetAlpha,
  targetRadius,
  tipFor,
  type HitSample,
} from './logic';
import { de, it } from './texts';

const TRIALS = 24;
const QUICK_TRIALS = 4;
const FADE_IN = 130;
const FADE_OUT = 130;
const BURST_MS = 420;
const MARK_MS = 650;
// Intro-Film: Stufe 1, lange sichtbar, große Sprünge
const DEMO_LIFE_MS = 3200;
const DEMO_GAP_MS = 550;
/** Zellen, die der Film nacheinander zeigt (3×3: 0 links oben … 8 rechts unten) */
const DEMO_CELLS = [0, 5, 6, 2];
const DEMO_CAPTIONS = ['watch', 'tap', 'jump', 'jump'];

const CYAN = '#7DD3FC';
const CYAN_DEEP = '#0EA5E9';
const WARM = '#FBBF24';

interface Target {
  cell: number;
  lvl: number;
  born: number;
  life: number;
  /** Sprungweite zum vorigen Ziel (Anteil der Raster-Diagonale), null beim ersten */
  jump: number | null;
  judged: boolean;
}

/** Kurzlebige Effekte in normierten Bühnenkoordinaten */
interface Fx {
  nx: number;
  ny: number;
  t0: number;
}

class BlicksprungGalerie implements Exercise {
  private readonly demo: boolean;
  private readonly total: number;
  private readonly stair: Staircase;
  private phase: 'gap' | 'target' | 'done' = 'gap';
  private gapUntil = 0;
  private target: Target | null = null;
  private prevCell: number | null = null;
  private spawned = 0;
  private resolved = 0;
  /** Stufe, nach der das Raster gerade gezeichnet wird (ändert sich erst beim nächsten Ziel) */
  private dispLevel = MIN_LEVEL;
  private gridT = -1e9;
  private bursts: Fx[] = [];
  private marks: Fx[] = [];
  private samples: HitSample[] = [];
  private wrong = 0;
  private timeouts = 0;
  private points = 0;
  private lastGrid = '';
  private endAt = 0;
  private endT = Infinity;
  private autoPlanned = false;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.total = this.demo ? DEMO_CELLS.length : ctx.quick ? QUICK_TRIALS : TRIALS;
    this.stair = new Staircase({ start: ctx.startLevel ?? MIN_LEVEL, min: MIN_LEVEL, max: MAX_LEVEL, down: 3, up: 1 });
    this.dispLevel = this.demo ? MIN_LEVEL : levelOf(this.stair.level);
  }

  // --- Geometrie: immer live aus der Bühne (robust beim Drehen) ---

  private lay(): GridLayout {
    const s = this.ctx.stage;
    const m = Math.max(10, s.u * 2);
    const bottom = this.demo ? captionTop(s) - 6 : s.h - m;
    return chooseLayout(this.dispLevel, s.w - 2 * m, Math.max(60, bottom - m), m, m);
  }

  private restPoint(): { x: number; y: number } {
    const { w, u } = this.ctx.stage;
    const hs = clamp(u * 13, 48, 110);
    return { x: w - hs * 0.75, y: captionTop(this.ctx.stage) - hs * 0.95 };
  }

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    this.phase = 'gap';
    this.gapUntil = t + (this.demo ? 450 : 500);
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateLabel();
    if (this.demo) {
      hud.caption(this.ctx.texts.captions[DEMO_CAPTIONS[0]]);
      const r = this.restPoint();
      ghost.moveTo(r.x, r.y, { move: 0 });
    }
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
      else if (this.ctx.autoplay && this.ctx.mode === 'play') this.autoUpdate(T);
    }
    this.prune(t);
    if (this.demo && this.endAt && t >= this.endAt) this.finishSession(t);
  }

  private spawn(t: number): void {
    const { rng } = this.ctx;
    const lvl = this.demo ? MIN_LEVEL : levelOf(this.stair.level);
    this.dispLevel = lvl;
    const lay = this.lay();
    const grid = { cols: lay.cols, rows: lay.rows };
    const key = `${grid.cols}x${grid.rows}`;
    if (key !== this.lastGrid) {
      this.lastGrid = key;
      this.gridT = t;
    }
    const cell = this.demo ? DEMO_CELLS[this.spawned] : pickCell(rng, grid, this.prevCell, lvl);
    const jump = this.prevCell === null ? null : jumpDistance(this.prevCell, cell, grid);
    this.target = { cell, lvl, born: t, life: this.demo ? DEMO_LIFE_MS : lifeFor(lvl), jump, judged: false };
    this.prevCell = cell;
    this.spawned++;
    this.phase = 'target';
    this.autoPlanned = false;
    this.updateLabel();
    if (this.demo) {
      const { hud, ghost, texts } = this.ctx;
      hud.caption(texts.captions[DEMO_CAPTIONS[this.spawned - 1]]);
      const c = cellCenter(lay, cell);
      ghost.tap(c.x, c.y, { delay: 450, move: 650 });
      ghost.moveTo(this.restPoint().x, this.restPoint().y, { delay: 250, move: 420 });
    }
  }

  /** Autoplay (Tests): meist richtig, manchmal in eine andere Zelle */
  private autoUpdate(T: Target): void {
    const { ghost, rng } = this.ctx;
    if (this.autoPlanned || !ghost.idle) return;
    this.autoPlanned = true;
    const lay = this.lay();
    let cell = T.cell;
    if (rng.chance(0.08)) cell = (T.cell + 1 + rng.int(lay.cols * lay.rows - 1)) % (lay.cols * lay.rows);
    if (rng.chance(0.04)) return; // ab und zu verpasst
    const c = cellCenter(lay, cell);
    ghost.tap(c.x + rng.normal() * 4, c.y + rng.normal() * 4, { delay: rng.range(220, 420), move: rng.range(260, 420) });
  }

  pointerDown(p: PointerInfo): void {
    const T = this.target;
    // In der Pause zwischen Zielen (z. B. zweiter Finger) und nach dem ersten Tipp nichts werten
    if (this.phase !== 'target' || !T || T.judged || p.t < T.born) return;
    const lay = this.lay();
    const idx = cellAt(lay, p.x, p.y);
    if (idx < 0) return;
    if (idx === T.cell) this.hit(T, lay, p.t);
    else this.miss(T, p, lay, idx);
  }

  private hit(T: Target, lay: GridLayout, t: number): void {
    const { sfx, hud, fmt, stage } = this.ctx;
    const rt = t - T.born;
    T.judged = true;
    this.samples.push({ ms: rt, far: T.jump !== null && T.jump >= FAR_JUMP });
    const pts = 10 + 2 * (T.lvl - 1) + Math.round(Math.max(0, 1 - rt / T.life) * 10);
    this.points += pts;
    sfx.good();
    const c = cellCenter(lay, T.cell);
    if (!this.ctx.reducedMotion) this.bursts.push({ nx: c.x / stage.w, ny: c.y / stage.h, t0: t });
    this.toastAt(fmt.time(rt), 'good', c.x, c.y - targetRadius(lay, stage.u), 700, clamp(stage.u * 4.2, 16, 32));
    hud.setScore(this.points);
    if (!this.demo) this.stair.update(true);
    this.afterResolve(T, t);
  }

  private miss(T: Target, p: PointerInfo, lay: GridLayout, idx: number): void {
    const { sfx, stage, texts } = this.ctx;
    T.judged = true;
    this.wrong++;
    sfx.bad();
    const c = cellCenter(lay, idx);
    this.marks.push({ nx: c.x / stage.w, ny: c.y / stage.h, t0: p.t });
    this.toastAt(texts.feedback.wrong, 'bad', c.x, c.y - targetRadius(lay, stage.u), 800, clamp(stage.u * 3.8, 15, 28));
    if (!this.demo) this.stair.update(false);
    this.afterResolve(T, p.t);
  }

  private timeout(T: Target, t: number): void {
    const { stage, texts } = this.ctx;
    T.judged = true;
    this.timeouts++;
    const lay = this.lay();
    const c = cellCenter(lay, T.cell);
    this.toastAt(texts.feedback.gone, 'info', c.x, c.y - targetRadius(lay, stage.u), 700, clamp(stage.u * 3.8, 15, 28));
    if (!this.demo) this.stair.update(false);
    this.afterResolve(T, t);
  }

  private afterResolve(_T: Target, t: number): void {
    this.resolved++;
    this.target = null;
    this.phase = 'gap';
    this.gapUntil = t + (this.demo ? DEMO_GAP_MS : gapMs(this.ctx.rng));
    this.ctx.hud.setProgress(this.resolved / this.total);
    this.updateLabel();
    if (this.demo && this.resolved >= this.total) this.endAt = t + 1000;
  }

  private toastAt(text: string, kind: ToastKind, x: number, top: number, ms: number, size: number): void {
    const { w } = this.ctx.stage;
    const half = Math.min(w / 2, text.length * size * 0.3 + 8);
    this.ctx.hud.toast(text, kind, { x: clamp(x, half, w - half), y: Math.max(size * 1.1, top - size * 0.8), ms, size });
  }

  private updateLabel(): void {
    if (this.demo) return;
    this.ctx.hud.setLabel(`${this.ctx.texts.feedback.level} ${this.dispLevel}`);
  }

  private prune(t: number): void {
    if (this.bursts.length) this.bursts = this.bursts.filter((b) => t - b.t0 < BURST_MS);
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
  }

  // -------------------------------------------------------------------------

  private finishSession(t: number): void {
    this.phase = 'done';
    this.endT = t;
    const { sfx, hud } = this.ctx;
    hud.setProgress(1);
    const stats = computeStats(this.samples, this.wrong, this.timeouts);
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
    this.drawCells(g, lay, u, clamp((t - this.gridT) / 300, 0, 1));
    for (const b of this.bursts) this.drawBurst(g, b, t);
    const T = this.target;
    if (T && this.phase === 'target') this.drawTarget(g, lay, T, t, u);
    for (const m of this.marks) this.drawMark(g, m, t, u);
  }

  /** Dezente Zellen: zeigen alle möglichen Orte – der Sprung geht immer zwischen diesen */
  private drawCells(g: CanvasRenderingContext2D, lay: GridLayout, u: number, k: number): void {
    const gap = Math.max(3, u * 0.7);
    g.save();
    g.globalAlpha = 0.45 + 0.55 * k;
    g.lineWidth = Math.max(1.5, u * 0.3);
    for (let i = 0; i < lay.cols * lay.rows; i++) {
      const c = cellCenter(lay, i);
      rrPath(g, c.x - lay.cw / 2 + gap / 2, c.y - lay.ch / 2 + gap / 2, lay.cw - gap, lay.ch - gap, Math.min(lay.cw, lay.ch) * 0.12);
      g.fillStyle = 'rgba(255,255,255,0.028)';
      g.fill();
      g.strokeStyle = 'rgba(232,238,247,0.14)';
      g.stroke();
      circle(g, c.x, c.y, Math.max(2, u * 0.4), 'rgba(232,238,247,0.16)');
    }
    g.restore();
  }

  private drawTarget(g: CanvasRenderingContext2D, lay: GridLayout, T: Target, t: number, u: number): void {
    const age = t - T.born;
    const a = targetAlpha(age, T.life, FADE_IN, FADE_OUT);
    if (a <= 0.01) return;
    const c = cellCenter(lay, T.cell);
    const r0 = targetRadius(lay, u);
    // Sanftes Hineinwachsen beim Einblenden – bei „Bewegung reduzieren“ ohne
    const r = this.ctx.reducedMotion ? r0 : r0 * (0.88 + 0.12 * easeOut(age / FADE_IN));
    glow(g, c.x, c.y, r0, CYAN, 0.8 * a);
    g.save();
    g.globalAlpha = a;
    circle(g, c.x, c.y, r, 'rgba(125,211,252,0.2)');
    ring(g, c.x, c.y, r * 0.78, CYAN_DEEP, Math.max(3, r * 0.26));
    ring(g, c.x, c.y, r - 0.75, withAlpha('#E0F2FE', 0.8), 1.5);
    circle(g, c.x, c.y, r * 0.36, '#FFFFFF');
    g.restore();
  }

  private drawBurst(g: CanvasRenderingContext2D, b: Fx, t: number): void {
    const { w, h, u } = this.ctx.stage;
    const k = clamp((t - b.t0) / BURST_MS, 0, 1);
    const r = Math.max(26, u * 5) * (1 + 0.9 * easeOut(k));
    ring(g, b.nx * w, b.ny * h, r, withAlpha('#BAE6FD', 0.8 * (1 - k)), Math.max(1.5, 4 * (1 - k)));
  }

  /** Falsche Zelle: ✗ (Form, nicht nur Farbe), langsam verblassend, kein Blitz */
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

export const blicksprungGalerie: ExerciseDefinition = {
  id: 'blicksprung-galerie',
  category: 'bewegung',
  minutes: 1,
  color: '#2E6DB4',
  icon:
    '<g fill="currentColor" opacity=".55"><circle cx="9" cy="9" r="2.4"/><circle cx="24" cy="9" r="2.4"/><circle cx="39" cy="9" r="2.4"/><circle cx="9" cy="24" r="2.4"/><circle cx="9" cy="39" r="2.4"/><circle cx="24" cy="39" r="2.4"/></g><circle cx="39" cy="24" r="6.5" fill="none" stroke="currentColor" stroke-width="3.2"/><circle cx="39" cy="24" r="2.6" fill="currentColor"/><circle cx="24" cy="24" r="2.4" fill="currentColor" opacity=".55"/><circle cx="39" cy="39" r="2.4" fill="currentColor" opacity=".55"/><path d="M27.5 21.5C30.5 19 32.5 18.5 33.5 18.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="1.5 4" fill="none"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new BlicksprungGalerie(ctx),
};
