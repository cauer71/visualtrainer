/**
 * Sequenz-Gedächtnis (Labor) – Felder eines Rasters leuchten nacheinander auf, tippe sie in derselben Reihenfolge an.
 *
 * Portierung der Labor-Übung `sequence` (Prototyp ex/sequence.js): Corsi-ähnliche Aufgabe (Zeigespanne, Berch et al.
 * 1998). Einstellungen (`ctx.params`, siehe logic.ts `PARAMS`), reine Logik in logic.ts (`SequenceGame`).
 *
 * - Hauptwert: Länge der längsten vollständig richtig wiederholten Folge (`span`, höher = mehr), keine Stufen (`level` = 1).
 * - Sicherheit: Felder leuchten nacheinander und blenden weich ein und aus (≥ 100 ms); jedes Feld leuchtet mindestens 400 ms,
 *   höchstens 2,5 Feldwechsel pro Sekunde, kein Blinken, keine Vollflächeneffekte (siehe logic.ts).
 * - Rückmeldung weich: ✓ am angetippten Feld, ✗ am falschen Feld und eine gestrichelte Umrandung am richtigen Feld (Form,
 *   nicht nur Farbe). Das Raster passt sich der Bühne an (Hochformat, Drehen); die Größe der Felder hängt nicht von cm ab.
 * - Gemessen wird nur dein Tippen (Zeit zwischen zwei richtigen Eingaben), nicht dein Blick.
 */
import { background, C, fillRR, font, rrPath, text } from '../../core/draw';
import { paramsOf } from '../../core/params';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, Metric, PointerInfo, ResultDetailRow } from '../../core/types';
import { playField, restPoint } from '../_shared/tippziele';
import { drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import {
  cellAt,
  cellRect,
  layoutGrid,
  litCells,
  PARAMS,
  pointsFor,
  QUICK_EXTRA_LENGTH,
  QUICK_GAP_MS,
  QUICK_SHOW_MS,
  SequenceGame,
  sequenceParams,
  tipFor,
  type GridLayout,
  type SequenceParams,
  type SequenceSummary,
  type ShowSchedule,
} from './logic';
import { de, it } from './texts';

const LEAD_MS = 800;
const FB_MS = 800;
const MARK_MS = 800;
const FLASH_MS = 220;
/** Doppeltipp: dasselbe Feld direkt noch einmal (innerhalb dieser Zeit) wird ignoriert – eine Folge hat nie zweimal dasselbe Feld hintereinander */
const DOUBLE_TAP_MS = 300;

const CELL_FILL = '#1C2A42';
const CELL_EDGE = 'rgba(255,255,255,0.22)';
const LIT = '#FFD23F';
const TAP_FILL = '#3BCEAC';

// Intro-Film: 3 × 3, zwei Folgen (2 und 3 Felder), langsame Anzeige
const DEMO_PARAMS: Partial<SequenceParams> = {
  rows: 3,
  cols: 3,
  startLength: 2,
  showMs: 600,
  gapMs: 200,
  growth: 'extend',
  onError: 'same',
  maxErrors: 3,
  maxLength: 3,
  durationS: 0,
};
const DEMO_LEAD_MS = 1100;
const DEMO_FB_MS = 900;

interface Mark {
  cell: number;
  ok: boolean;
  t0: number;
}

class SequenzGedaechtnis implements Exercise {
  private readonly demo: boolean;
  private readonly p: SequenceParams;
  private readonly game: SequenceGame;
  private phase: 'lead' | 'show' | 'input' | 'fb' = 'lead';
  private phaseAt = 0;
  private fbEnd = 0;
  private schedule: ShowSchedule = { steps: [], totalMs: 0 };
  private showStart = 0;
  private expectedCell = -1;
  private outcome: 'complete' | 'error' | null = null;
  private marks: Mark[] = [];
  private flash: { cell: number; t0: number } | null = null;
  private lastTap = { cell: -1, t: -1e9 };
  private autoPlanned = false;
  private done = false;
  private endT = Infinity;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = sequenceParams(paramsOf(ctx, PARAMS));
    if (this.demo) this.p = { ...base, ...DEMO_PARAMS };
    else if (ctx.quick) {
      this.p = {
        ...base,
        showMs: QUICK_SHOW_MS,
        gapMs: QUICK_GAP_MS,
        maxLength: Math.min(base.maxLength, base.startLength + QUICK_EXTRA_LENGTH),
        maxErrors: 1,
        durationS: 0,
      };
    } else this.p = base;
    this.game = new SequenceGame(this.p, ctx.rng);
  }

  // --- Geometrie: immer live aus der Bühne ---

  /** Höhe der Textzeile über dem Raster */
  private headerH(): number {
    return clamp(this.ctx.stage.u * 7, 30, 56);
  }

  private layout(): GridLayout {
    const f = playField(this.ctx.stage, this.demo);
    const hh = this.headerH();
    return layoutGrid({ x: f.x, y: f.y + hh, w: f.w, h: f.h - hh }, this.p.rows, this.p.cols);
  }

  resize(): void {
    if (this.ctx.autoplay) {
      this.ctx.ghost.clear();
      this.autoPlanned = false;
    }
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, texts } = this.ctx;
    this.game.begin(t);
    this.phase = 'lead';
    this.phaseAt = t + (this.demo ? DEMO_LEAD_MS : LEAD_MS);
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateHud();
    if (this.demo) {
      const r = restPoint(this.ctx.stage);
      this.ctx.ghost.moveTo(r.x, r.y, { move: 0 });
      hud.caption(texts.captions.ready);
    }
  }

  update(_dt: number, t: number): void {
    if (this.done) return;
    switch (this.phase) {
      case 'lead':
        if (t >= this.phaseAt) this.startRound(t);
        break;
      case 'show':
        if (t - this.showStart >= this.schedule.totalMs) this.beginInput(t);
        break;
      case 'input':
        if (this.ctx.autoplay && !this.demo) this.autoUpdate();
        break;
      case 'fb':
        if (t >= this.fbEnd) {
          if (this.game.isOver(t)) this.finishSession(t);
          else {
            this.phase = 'lead';
            this.phaseAt = t + 200;
          }
        }
        break;
    }
    this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
  }

  private startRound(t: number): void {
    const { hud, texts } = this.ctx;
    this.game.newRound();
    this.schedule = this.game.showSchedule();
    this.showStart = t;
    this.phase = 'show';
    this.outcome = null;
    this.expectedCell = -1;
    this.marks = [];
    this.flash = null;
    this.updateHud();
    if (this.demo) hud.caption(this.game.roundNo === 1 ? texts.captions.watch : texts.captions.again);
  }

  private beginInput(t: number): void {
    const { hud, texts, ghost } = this.ctx;
    this.game.beginInput(t);
    this.phase = 'input';
    this.autoPlanned = false;
    this.lastTap = { cell: -1, t: -1e9 };
    if (this.demo) {
      hud.caption(texts.captions.yours);
      const L = this.layout();
      this.game.seq!.forEach((cell, i) => {
        const r = cellRect(L, cell);
        ghost.tap(r.x + r.s / 2, r.y + r.s / 2, { delay: i === 0 ? 450 : 200, move: 420 });
      });
    }
  }

  private updateHud(): void {
    const { hud, texts } = this.ctx;
    hud.setProgress(this.progress());
    if (this.demo) return;
    hud.setScore(this.game.maxCompleted);
    const n = this.game.seq ? this.game.seq.length : this.game.length;
    const tpl = this.p.maxErrors > 0 ? texts.feedback.labelMax : texts.feedback.label;
    hud.setLabel(tpl.replace('{n}', String(n)).replace('{e}', String(this.game.errors)).replace('{m}', String(this.p.maxErrors)));
  }

  /** Fortschritt: der größte Anteil von Fehlern, Zielänge und Zeit */
  private progress(): number {
    const g = this.game;
    const parts = [g.maxCompleted / Math.max(1, this.p.maxLength)];
    if (this.p.maxErrors > 0) parts.push(g.errors / this.p.maxErrors);
    if (this.p.durationS > 0 && g.startedAt !== null) parts.push((this.ctx.now() - g.startedAt) / (this.p.durationS * 1000));
    return clamp(Math.max(...parts), 0, 1);
  }

  /** Autoplay (Tests): meist richtig, mit wachsender Länge öfter ein Fehler */
  private autoUpdate(): void {
    const { ghost, rng } = this.ctx;
    if (this.autoPlanned || !ghost.idle || !this.game.seq) return;
    this.autoPlanned = true;
    const expected = this.game.seq[this.game.pos];
    let cell = expected;
    const pWrong = clamp(0.02 + 0.012 * this.game.seq.length, 0.03, 0.2);
    if (rng.chance(pWrong) && this.game.cells > 1) {
      do cell = rng.int(this.game.cells);
      while (cell === expected);
    }
    const L = this.layout();
    const r = cellRect(L, cell);
    const jit = r.s * 0.12;
    ghost.tap(r.x + r.s / 2 + rng.normal() * jit * 0.5, r.y + r.s / 2 + rng.normal() * jit * 0.5, { delay: rng.range(250, 650), move: rng.range(250, 420) });
  }

  // --- Eingabe ---

  pointerDown(p: PointerInfo): void {
    if (this.done || this.phase !== 'input') return;
    const L = this.layout();
    const cell = cellAt(L, p.x, p.y);
    if (cell < 0) return;
    if (cell === this.lastTap.cell && p.t - this.lastTap.t < DOUBLE_TAP_MS) return;
    this.lastTap = { cell, t: p.t };
    const res = this.game.input(cell, p.t);
    if (!res) return;
    const { sfx, ghost } = this.ctx;
    this.autoPlanned = false;
    this.flash = { cell, t0: p.t };
    if (res.result === 'ok') {
      sfx.tap();
      this.marks.push({ cell, ok: true, t0: p.t });
      return;
    }
    this.phase = 'fb';
    this.fbEnd = p.t + (this.demo ? DEMO_FB_MS : FB_MS);
    this.outcome = res.result;
    if (res.result === 'complete') {
      sfx.good();
      this.marks.push({ cell, ok: true, t0: p.t });
      if (this.demo) {
        ghost.clear();
        const r = restPoint(this.ctx.stage);
        ghost.moveTo(r.x, r.y, { delay: 250, move: 500 });
        if (this.game.roundNo === 1) this.ctx.hud.caption(this.ctx.texts.captions.longer);
        else this.ctx.hud.caption(this.ctx.texts.captions.count);
      }
    } else {
      sfx.bad();
      this.marks.push({ cell, ok: false, t0: p.t });
      this.expectedCell = res.expected;
      ghost.clear();
    }
    this.updateHud();
  }

  // --- Ende ---

  private finishSession(t: number): void {
    if (this.done) return;
    this.done = true;
    this.endT = t;
    const { hud, sfx } = this.ctx;
    hud.setProgress(1);
    this.game.finish(t);
    const sum = this.game.summary();
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'span', value: sum.span, unit: 'count', better: 'higher' },
        secondary: [{ key: 'rounds', value: sum.rounds, unit: 'count' }],
        score: 0,
        level: 1,
      });
      return;
    }
    sfx.done();
    this.ctx.finish(this.buildResult(sum));
  }

  private buildResult(sum: SequenceSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const secondary: Metric[] = [{ key: 'rounds', value: sum.rounds, unit: 'count' }, { key: 'errors', value: sum.errors, unit: 'count' }];
    if (sum.accuracy !== null) secondary.push({ key: 'accuracy', value: sum.accuracy, unit: 'percent' });
    if (sum.rtMean !== null) secondary.push({ key: 'rt_mean', value: sum.rtMean, unit: 'ms' });
    const rows: ResultDetailRow[] = [];
    if (sum.totalMs !== null) rows.push({ label: texts.metrics.total, value: fmt.time(sum.totalMs, 1) });
    return {
      primary: { key: 'span', value: sum.span, unit: 'count', better: 'higher' },
      secondary,
      ...(rows.length ? { details: [{ title: texts.feedback.moreTitle, rows, note: texts.feedback.moreNote }] } : {}),
      score: pointsFor(sum.span, sum.rounds),
      level: 1,
      tip: tipFor(sum, this.p),
    };
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, now: number): void {
    const t = Math.min(now, this.endT);
    const { w, h, dpr, u } = this.ctx.stage;
    background(g, w, h, dpr);
    const L = this.layout();
    const f = playField(this.ctx.stage, this.demo);
    this.drawHeader(g, f.x + f.w / 2, f.y + this.headerH() / 2, f.w, u);

    const lit = new Map<number, number>();
    if (this.phase === 'show' || (this.phase === 'input' && t - this.showStart < this.schedule.totalMs + 400)) {
      for (const l of litCells(this.schedule, t - this.showStart)) lit.set(l.cell, Math.max(lit.get(l.cell) ?? 0, l.level));
    }
    const n = this.p.rows * this.p.cols;
    const rad = Math.min(L.cell * 0.18, 16);
    const input = this.phase === 'input';
    for (let i = 0; i < n; i++) {
      const r = cellRect(L, i);
      fillRR(g, r.x, r.y, r.s, r.s, rad, CELL_FILL);
      const level = lit.get(i) ?? 0;
      if (level > 0.01) {
        g.save();
        g.globalAlpha = level;
        fillRR(g, r.x, r.y, r.s, r.s, rad, LIT);
        // zweite Form neben der Farbe: heller Innenring
        rrPath(g, r.x + r.s * 0.12, r.y + r.s * 0.12, r.s * 0.76, r.s * 0.76, Math.max(3, rad * 0.7));
        g.strokeStyle = 'rgba(255,255,255,0.95)';
        g.lineWidth = Math.max(2.5, r.s * 0.05);
        g.stroke();
        g.restore();
      }
      g.save();
      rrPath(g, r.x + 0.75, r.y + 0.75, r.s - 1.5, r.s - 1.5, rad);
      g.strokeStyle = input ? 'rgba(255,255,255,0.38)' : CELL_EDGE;
      g.lineWidth = 1.5;
      g.stroke();
      g.restore();
    }
    // kurzes weiches Aufleuchten des angetippten Feldes (Bestätigung der Berührung)
    if (this.flash && t - this.flash.t0 < FLASH_MS) {
      const r = cellRect(L, this.flash.cell);
      g.save();
      g.globalAlpha = 0.55 * (1 - (t - this.flash.t0) / FLASH_MS);
      fillRR(g, r.x, r.y, r.s, r.s, rad, TAP_FILL);
      g.restore();
    }
    // richtiges Feld nach einem Fehler: gestrichelte Umrandung
    if (this.phase === 'fb' && this.outcome === 'error' && this.expectedCell >= 0) {
      const r = cellRect(L, this.expectedCell);
      g.save();
      rrPath(g, r.x - 3, r.y - 3, r.s + 6, r.s + 6, rad + 3);
      g.setLineDash([9, 6]);
      g.strokeStyle = 'rgba(232,238,247,0.9)';
      g.lineWidth = 3.5;
      g.stroke();
      g.restore();
    }
    const s = clamp(L.cell * 0.28, 9, 24);
    for (const m of this.marks) {
      const r = cellRect(L, m.cell);
      const a = markAlpha(t - m.t0, MARK_MS);
      if (m.ok) drawSoftCheck(g, r.x + r.s / 2, r.y + r.s / 2, s, a);
      else drawSoftCross(g, r.x + r.s / 2, r.y + r.s / 2, s, a);
    }
  }

  private drawHeader(g: CanvasRenderingContext2D, cx: number, cy: number, maxW: number, u: number): void {
    const { texts } = this.ctx;
    let label = '';
    if (this.phase === 'show') label = texts.feedback.watch;
    else if (this.phase === 'input') label = `${texts.feedback.yours} · ${this.game.pos} / ${this.game.seq?.length ?? 0}`;
    else if (this.phase === 'fb') label = this.outcome === 'error' ? texts.feedback.wrong : texts.feedback.right;
    if (!label) return;
    let px = clamp(u * 3.8, 16, 26);
    g.save();
    g.font = font(px, 700);
    const tw = g.measureText(label).width;
    g.restore();
    if (tw > maxW) px = Math.max(13, Math.floor((px * maxW) / tw));
    text(g, label, cx, cy, px, this.phase === 'input' ? C.fg : C.dim, { weight: 700 });
  }
}

export const laborSequenzGedaechtnis: ExerciseDefinition = {
  id: 'labor-sequenz-gedaechtnis',
  category: 'gedaechtnis',
  minutes: 2,
  color: '#2F8F83',
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="2.6"><rect x="6" y="6" width="10" height="10" rx="2.5"/><rect x="19" y="6" width="10" height="10" rx="2.5" fill="currentColor" stroke="none"/><rect x="32" y="6" width="10" height="10" rx="2.5"/><rect x="6" y="19" width="10" height="10" rx="2.5"/><rect x="19" y="19" width="10" height="10" rx="2.5"/><rect x="32" y="19" width="10" height="10" rx="2.5" fill="currentColor" stroke="none" opacity=".55"/><rect x="6" y="32" width="10" height="10" rx="2.5" fill="currentColor" stroke="none" opacity=".3"/><rect x="19" y="32" width="10" height="10" rx="2.5"/><rect x="32" y="32" width="10" height="10" rx="2.5"/></g>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  create: (ctx) => new SequenzGedaechtnis(ctx),
};
