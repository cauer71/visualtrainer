/**
 * Zeichen finden (Labor) – in einem Raster ähnlicher Zeichen alle Exemplare des Zielzeichens antippen.
 *
 * Portierung der Labor-Übung `findchars` (Prototyp ex/findchars.js): Einstellungen (`ctx.params`, siehe logic.ts `PARAMS`),
 * Feldgröße in cm (`ctx.calib`), reine Logik in logic.ts (`FindSession`).
 *
 * - Hauptwert: Genauigkeit (`accuracy`, höher = besser): gefundene Zeichen geteilt durch gefundene + übersehene + falsch getippte.
 * - Lesbarkeit: Zeichen mindestens ≈ 22 px groß (Feld ≥ 36 px); passt das Raster nicht auf die Bühne, wird es gedreht dargestellt
 *   oder (nur für diese Tafel) verkleinert – die Ergebnisseite weist darauf hin.
 * - Rückmeldung weich: ✓ und Ring am gefundenen Zeichen, ✗ und gestricheltes Feld am falschen Zeichen (Form, nicht nur Farbe);
 *   nach „Fertig“ werden übersehene Zielzeichen kurz gestrichelt umrandet. Kein Blitz, kein Rot.
 * - Die Ähnlichkeit der Zeichen ist nicht gleichmäßig (siehe logic.ts); das Ergebnis ist keine Diagnose und kein Lesetest.
 */
import { background, button, C, fillRR, font, hit, ring, rrPath, text } from '../../core/draw';
import { calibOf } from '../../core/calib';
import { paramsOf } from '../../core/params';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, Metric, PointerInfo, ResultDetailRow } from '../../core/types';
import { playField, restPoint } from '../_shared/tippziele';
import { drawSoftCheck, drawSoftCross } from '../_shared/weiche-marken';
import {
  DONE_H,
  findCellAt,
  findCellXY,
  findParams,
  FindSession,
  fitGrid,
  GLYPH_FACTOR,
  layoutFind,
  PARAMS,
  pointsFor,
  QUICK_COLS,
  QUICK_ROUNDS,
  QUICK_ROWS,
  tipFor,
  type Board,
  type FindLayout,
  type FindParams,
  type FindSummary,
} from './logic';
import { de, it } from './texts';

const LEAD_MS = 700;
const FB_COMPLETE_MS = 700;
const FB_GAVE_UP_MS = 1200;

const CELL_FILL = 'rgba(255,255,255,0.055)';
const GLYPH = '#F2F5F9';
const FOUND = '#86EFAC';
const WRONG = '#FBBF24';
const TARGET = '#FFD23F';

// Intro-Film: zwei kleine Tafeln (3 × 5), auf der zweiten drückt die Hand „Fertig“
const DEMO_PARAMS: Partial<FindParams> = { set: 'pbdq', rows: 3, cols: 5, density: 20, cellCm: 2.5, rounds: 2 };
const DEMO_LEAD_MS = 1200;

class ZeichenFinden implements Exercise {
  private readonly demo: boolean;
  private readonly p: FindParams;
  private readonly session: FindSession;
  private phase: 'lead' | 'play' | 'fb' = 'lead';
  private phaseAt = 0;
  private fbEnd = 0;
  private fbHow: 'complete' | 'gave_up' = 'complete';
  private boardBegun = false;
  private reducedOnce = false;
  private autoQueue: Array<number | 'done'> = [];
  private autoBoard: Board | null = null;
  private autoPlanned = false;
  private autoCurrent: number | 'done' | null = null;
  private demoQueued: Board | null = null;
  private done = false;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = findParams(paramsOf(ctx, PARAMS));
    this.p = this.demo
      ? { ...base, ...DEMO_PARAMS }
      : ctx.quick
        ? { ...base, rounds: Math.min(base.rounds, QUICK_ROUNDS), rows: Math.min(base.rows, QUICK_ROWS), cols: Math.min(base.cols, QUICK_COLS) }
        : base;
    this.session = new FindSession(this.p, {
      rng: ctx.rng,
      grid: () => {
        // Intro-Film: kleine Bühne, festes kleines Raster (Illustration, keine Messung)
        if (this.demo) return { rows: this.p.rows, cols: this.p.cols };
        const g = fitGrid(this.gridBox(), this.p.rows, this.p.cols);
        if (g.reduced) this.reducedOnce = true;
        return g;
      },
    });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private headerH(): number {
    const s = this.ctx.stage;
    return this.demo ? clamp(s.h * 0.12, 26, 46) : clamp(s.u * 12, 52, 92);
  }

  /** Höhe des „Fertig“-Knopfs: in der Praxis ≥ 56 px, im Intro-Film (kleine Bühne) etwas niedriger */
  private doneH(): number {
    return this.demo ? clamp(this.ctx.stage.h * 0.11, 30, DONE_H) : DONE_H;
  }

  /** Bereich für das Raster: unter dem Zielzeichen, über dem „Fertig“-Knopf */
  private gridBox(): { x: number; y: number; w: number; h: number } {
    const f = playField(this.ctx.stage, this.demo);
    const top = this.headerH();
    const bottom = this.doneH() + (this.demo ? 8 : 14);
    return { x: f.x, y: f.y + top, w: f.w, h: Math.max(40, f.h - top - bottom) };
  }

  private doneRect(): { x: number; y: number; w: number; h: number } {
    const f = playField(this.ctx.stage, this.demo);
    const w = this.demo ? clamp(f.w * 0.3, 90, 160) : clamp(f.w * 0.45, 190, 300);
    const dh = this.doneH();
    return { x: f.x + (f.w - w) / 2, y: f.y + f.h - dh - 2, w, h: dh };
  }

  private layout(b: Board): FindLayout {
    return layoutFind(this.gridBox(), b.rows, b.cols, calibOf(this.ctx).sizePx(this.p.cellCm));
  }

  resize(): void {
    if (this.ctx.autoplay) {
      this.ctx.ghost.clear();
      // der geplante, aber noch nicht ausgeführte Tipp geht zurück in die Warteschlange
      if (this.autoCurrent !== null) this.autoQueue.unshift(this.autoCurrent);
      this.autoCurrent = null;
      this.autoPlanned = false;
      this.demoQueued = null;
    }
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    this.phase = 'lead';
    this.phaseAt = t + (this.demo ? DEMO_LEAD_MS : LEAD_MS);
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateHud();
    if (this.demo) {
      const r = restPoint(this.ctx.stage);
      ghost.moveTo(r.x, r.y, { move: 0 });
      hud.caption(texts.captions.ready);
    }
  }

  update(_dt: number, t: number): void {
    if (this.done) return;
    if (this.phase === 'lead' && t >= this.phaseAt) this.beginPlay();
    else if (this.phase === 'fb' && t >= this.fbEnd) {
      if (this.session.finished) {
        this.finishSession();
        return;
      }
      this.beginPlay();
    }
    if (this.ctx.autoplay && !this.demo && this.phase === 'play') this.autoUpdate();
  }

  private beginPlay(): void {
    this.phase = 'play';
    this.boardBegun = false;
    this.autoPlanned = false;
    if (this.demo) this.queueDemo();
  }

  private updateHud(): void {
    const { hud, texts } = this.ctx;
    const s = this.session;
    const b = s.board;
    hud.setProgress(clamp((s.round + (b ? b.foundCount / b.nTargets : 0)) / this.p.rounds, 0, 1));
    if (this.demo) return;
    hud.setScore(s.found);
    if (b) {
      hud.setLabel(
        texts.feedback.label.replace('{i}', String(s.round + 1)).replace('{n}', String(this.p.rounds)),
      );
    }
  }

  // --- Intro-Film ---

  private queueDemo(): void {
    const { ghost, hud, texts } = this.ctx;
    const b = this.session.board;
    if (!b || this.demoQueued === b) return;
    this.demoQueued = b;
    const L = this.layout(b);
    const targets = b.cells.map((c, i) => (c.isTarget ? i : -1)).filter((i) => i >= 0);
    const wrong = b.cells.findIndex((c) => !c.isTarget);
    const tapCell = (i: number, delay: number): void => {
      const xy = findCellXY(L, i);
      ghost.tap(xy.x + L.cell / 2, xy.y + L.cell / 2, { delay, move: 450 });
    };
    if (this.session.round === 0) {
      hud.caption(texts.captions.find);
      tapCell(targets[0], 600);
      tapCell(targets[1], 250);
      tapCell(wrong, 250);
      tapCell(targets[2], 600);
    } else {
      hud.caption(texts.captions.giveup);
      tapCell(targets[0], 600);
      tapCell(targets[1], 250);
      const d = this.doneRect();
      ghost.tap(d.x + d.w / 2, d.y + d.h / 2, { delay: 700, move: 500 });
    }
    const r = restPoint(this.ctx.stage);
    ghost.moveTo(r.x, r.y, { delay: 200, move: 500 });
  }

  /** Autoplay (Tests): findet die meisten Zielzeichen, tippt selten daneben und drückt „Fertig“, wenn welche fehlen */
  private autoUpdate(): void {
    const { ghost, rng } = this.ctx;
    const b = this.session.board;
    if (!b || !ghost.idle) return;
    if (this.autoBoard !== b) {
      this.autoBoard = b;
      const targets = rng.shuffle(b.cells.map((c, i) => (c.isTarget ? i : -1)).filter((i) => i >= 0));
      const wrongs = rng.shuffle(b.cells.map((c, i) => (!c.isTarget ? i : -1)).filter((i) => i >= 0));
      const q: Array<number | 'done'> = [];
      let skipped = 0;
      for (const t of targets) {
        if (targets.length > 1 && rng.chance(0.07) && skipped < targets.length - 1) {
          skipped++;
          continue;
        }
        if (rng.chance(0.06) && wrongs.length) q.push(wrongs.pop()!);
        q.push(t);
      }
      if (skipped > 0) q.push('done');
      this.autoQueue = q;
    }
    if (this.autoPlanned) return;
    const next = this.autoQueue.shift();
    if (next === undefined) return;
    this.autoPlanned = true;
    this.autoCurrent = next;
    const delay = rng.range(120, 380);
    const move = rng.range(240, 380);
    if (next === 'done') {
      const d = this.doneRect();
      ghost.tap(d.x + d.w / 2, d.y + d.h / 2, { delay: delay + 300, move });
      return;
    }
    const L = this.layout(b);
    const xy = findCellXY(L, next);
    const jit = L.cell * 0.08;
    ghost.tap(xy.x + L.cell / 2 + rng.normal() * jit, xy.y + L.cell / 2 + rng.normal() * jit, { delay, move });
  }

  // --- Eingabe ---

  pointerDown(p: PointerInfo): void {
    if (this.done || this.phase !== 'play') return;
    const s = this.session;
    const b = s.board;
    if (!b) return;
    this.autoPlanned = false;
    this.autoCurrent = null;
    if (hit(this.doneRect(), p.x, p.y, 4)) {
      this.afterTap(s.giveUp(p.t), p.t);
      return;
    }
    const L = this.layout(b);
    const i = findCellAt(L, p.x, p.y);
    if (i < 0) return;
    this.afterTap(s.tap(i, p.t), p.t);
  }

  private afterTap(res: ReturnType<FindSession['tap']>, t: number): void {
    if (!res) return;
    const { sfx, hud, texts } = this.ctx;
    if (res.type === 'found') sfx.tap();
    else if (res.type === 'wrong') {
      sfx.bad();
      if (this.demo) hud.caption(texts.captions.wrong);
    } else {
      this.phase = 'fb';
      this.fbHow = res.how;
      this.fbEnd = t + (this.demo ? FB_GAVE_UP_MS : res.how === 'gave_up' ? FB_GAVE_UP_MS : FB_COMPLETE_MS);
      if (res.how === 'complete') sfx.good();
    }
    this.updateHud();
  }

  // --- Ende ---

  private finishSession(): void {
    if (this.done) return;
    this.done = true;
    const { hud, sfx } = this.ctx;
    hud.setProgress(1);
    const sum = this.session.summary();
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'accuracy', value: sum.accuracy ?? 0, unit: 'percent', better: 'higher' },
        secondary: [{ key: 'found', value: sum.found, unit: 'count' }],
        score: 0,
        level: 1,
      });
      return;
    }
    sfx.done();
    this.ctx.finish(this.buildResult(sum));
  }

  private buildResult(sum: FindSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const secondary: Metric[] = [];
    if (sum.perTarget !== null) secondary.push({ key: 'per_target', value: sum.perTarget, unit: 'time' });
    secondary.push({ key: 'found', value: sum.found, unit: 'count' });
    secondary.push({ key: 'missed', value: sum.missed, unit: 'count' });
    secondary.push({ key: 'false_taps', value: sum.falseTaps, unit: 'count' });
    const rows: ResultDetailRow[] = [];
    if (sum.totalMs !== null) rows.push({ label: texts.metrics.total, value: fmt.time(sum.totalMs, 1) });
    return {
      primary: { key: 'accuracy', value: sum.accuracy ?? 0, unit: 'percent', better: 'higher' },
      secondary,
      ...(rows.length
        ? { details: [{ title: texts.feedback.moreTitle, rows, note: texts.feedback.moreNote + (this.reducedOnce ? ` ${texts.feedback.gridReduced}` : '') }] }
        : {}),
      score: pointsFor(sum.found, sum.falseTaps),
      level: 1,
      tip: tipFor(sum),
    };
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, now: number): void {
    const { w, h, dpr, u } = this.ctx.stage;
    background(g, w, h, dpr);
    const s = this.session;
    const fbShown = this.phase === 'fb' && s.lastBoard;
    const b: Board | null = fbShown ? s.lastBoard : s.board;
    if (this.phase === 'play' && !this.boardBegun && s.board) {
      this.boardBegun = true;
      s.beginBoard(now);
    }
    if (!b) return;
    const f = playField(this.ctx.stage, this.demo);
    this.drawTarget(g, b, f.x + f.w / 2, f.y + this.headerH() / 2, f.w, u);
    if (this.phase === 'lead') return;
    const L = this.layout(b);
    this.drawBoard(g, b, L, !!fbShown && this.fbHow === 'gave_up');
    this.drawDone(g, this.phase === 'play');
  }

  /** „Finde alle:“, das Zielzeichen groß und daneben „gefunden / gesucht“ */
  private drawTarget(g: CanvasRenderingContext2D, b: Board, cx: number, cy: number, maxW: number, u: number): void {
    const label = this.ctx.texts.feedback.findAll;
    const count = `${b.foundCount} / ${b.nTargets}`;
    const lp = clamp(u * 3.2, 14, 22);
    const gp = clamp(this.headerH() * 0.78, 34, 70);
    g.save();
    g.font = font(lp, 700);
    const lw = g.measureText(label).width;
    g.font = font(gp, 800);
    const gw = Math.max(gp * 0.6, g.measureText(b.target).width);
    g.font = font(lp * 1.1, 700);
    const cw = g.measureText(count).width;
    g.restore();
    const gap = 12;
    const total = lw + gap + gw + gap * 1.6 + cw;
    const scale = total > maxW ? maxW / total : 1;
    const x0 = cx - (total * scale) / 2;
    text(g, label, x0, cy, lp * scale, C.dim, { weight: 700, align: 'left' });
    text(g, b.target, x0 + (lw + gap) * scale, cy + 1, gp * scale, TARGET, { weight: 800, align: 'left' });
    text(g, count, x0 + (lw + gap + gw + gap * 1.6) * scale, cy, lp * 1.1 * scale, C.fg, { weight: 700, align: 'left' });
  }

  private drawBoard(g: CanvasRenderingContext2D, b: Board, L: FindLayout, showMissed: boolean): void {
    const inset = Math.max(2, L.cell * 0.05);
    const rad = Math.min(L.cell * 0.18, 14);
    const gp = L.cell * GLYPH_FACTOR;
    const mk = clamp(L.cell * 0.13, 5, 11);
    for (let i = 0; i < b.cells.length; i++) {
      const c = b.cells[i];
      const { x, y } = findCellXY(L, i);
      fillRR(g, x + inset, y + inset, L.cell - 2 * inset, L.cell - 2 * inset, rad, CELL_FILL);
      let color = GLYPH;
      if (c.state === 'found') color = FOUND;
      else if (c.state === 'wrong') color = 'rgba(242,245,249,0.55)';
      text(g, c.ch, x + L.cell / 2, y + L.cell / 2 + gp * 0.04, gp, color, { weight: 800 });
      if (c.state === 'found') {
        ring(g, x + L.cell / 2, y + L.cell / 2, L.cell * 0.44, FOUND, Math.max(2, L.cell * 0.04));
        drawSoftCheck(g, x + L.cell - inset - mk * 1.5, y + inset + mk * 1.5, mk, 1);
      } else if (c.state === 'wrong') {
        g.save();
        rrPath(g, x + inset + 1, y + inset + 1, L.cell - 2 * inset - 2, L.cell - 2 * inset - 2, rad);
        g.setLineDash([6, 5]);
        g.strokeStyle = WRONG;
        g.lineWidth = Math.max(2, L.cell * 0.035);
        g.stroke();
        g.restore();
        drawSoftCross(g, x + L.cell - inset - mk * 1.5, y + inset + mk * 1.5, mk * 0.9, 1);
      } else if (showMissed && c.isTarget) {
        // übersehenes Zielzeichen: gestrichelter Ring
        ring(g, x + L.cell / 2, y + L.cell / 2, L.cell * 0.44, 'rgba(232,238,247,0.9)', Math.max(2.5, L.cell * 0.045), [7, 6]);
      }
    }
  }

  private drawDone(g: CanvasRenderingContext2D, active: boolean): void {
    const r = this.doneRect();
    button(g, r, active ? 'normal' : 'disabled');
    const label = this.ctx.texts.feedback.done;
    const lp = clamp(r.h * 0.36, 16, 24);
    g.save();
    g.font = font(lp, 700);
    const tw = g.measureText(label).width;
    g.restore();
    const col = active ? C.fg : C.dim;
    const cx = r.x + r.w / 2;
    const cy = r.y + r.h / 2;
    // Haken und Wort als Gruppe, mittig im Knopf
    const group = lp * 1.5 + tw;
    const gx = cx - group / 2;
    text(g, label, gx + lp * 1.5 + tw / 2, cy, lp, col, { weight: 700 });
    g.save();
    g.strokeStyle = col;
    g.lineWidth = Math.max(2.5, lp * 0.14);
    g.lineCap = 'round';
    g.lineJoin = 'round';
    g.beginPath();
    g.moveTo(gx, cy + lp * 0.02);
    g.lineTo(gx + lp * 0.33, cy + lp * 0.38);
    g.lineTo(gx + lp * 0.95, cy - lp * 0.32);
    g.stroke();
    g.restore();
  }
}

export const laborZeichenFinden: ExerciseDefinition = {
  id: 'labor-zeichen-finden',
  category: 'wahrnehmung',
  minutes: 2,
  color: '#8C6D4A',
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="5"/><path d="M17 8v10"/><circle cx="31" cy="13" r="5"/><path d="M26 8v10" opacity=".45"/><circle cx="12" cy="33" r="5" opacity=".45"/><path d="M17 28v10" opacity=".45"/><circle cx="31" cy="33" r="5" opacity=".45"/><path d="M36 28v10"/></g><circle cx="31" cy="13" r="9.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-dasharray="3 3"/>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  create: (ctx) => new ZeichenFinden(ctx),
};
