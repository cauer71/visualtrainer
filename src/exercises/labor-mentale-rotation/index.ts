/**
 * Mentale Rotation (Labor) – ist die rechte Figur dieselbe wie die linke, nur gedreht, oder ihr Spiegelbild?
 *
 * Portierung der Labor-Übung `rotation` (Prototyp ex/rotation.js): Figuren aus Quadraten, Einstellungen (`ctx.params`, siehe
 * logic.ts `PARAMS`), Quadratgröße in cm (`ctx.calib`), reine Logik in logic.ts (`RotationSession`).
 *
 * - Hauptwert: Genauigkeit (`accuracy`, höher = besser). Der Anstieg der Antwortzeit je 90° Drehung (`slope`) ist nur ein Vergleich
 *   mit dir selbst (kein Normwert) und wird nur bei genug Daten gezeigt.
 * - Die Vergleichsfigur wird mit der Matrix M = R(Winkel) · S gezeichnet (logic.ts): Drehung ändert die Händigkeit nie, Spiegelung
 *   immer; die Vorlage ist immer chiral, die Aufgabe damit eindeutig lösbar.
 * - Antwortknöpfe „Gleich (gedreht)“ und „Gespiegelt“ (≥ 64 px hoch, Symbol und Wort, nicht nur Farbe). Rückmeldung weich: ✓/✗ mit
 *   Hinweis, welche Antwort richtig war; die Figuren sind währenddessen ausgeblendet. Kein Blitz, kein Rot.
 * - Gemessen wird nur dein Tippen (Zeit vom Anzeigen der Figuren bis zur Antwort), nicht, wie du die Aufgabe löst.
 */
import { background, button, C, font, hit, rrPath, text } from '../../core/draw';
import { calibOf } from '../../core/calib';
import { paramsOf } from '../../core/params';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, Metric, PointerInfo, ResultDetailRow } from '../../core/types';
import { playField, restPoint } from '../_shared/tippziele';
import { drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import {
  cellPxFor,
  figurePolygons,
  figureRadius,
  layoutRotation,
  PARAMS,
  pointsFor,
  QUICK_TRIALS,
  RotationSession,
  rotationParams,
  tipFor,
  type Box,
  type Cell,
  type Mat,
  type RotationLayout,
  type RotationParams,
  type RotationSummary,
  type TrialSpec,
  IDENTITY,
} from './logic';
import { de, it } from './texts';

const LEAD_MS = 800;
const FB_OK_MS = 500;
const FB_WRONG_MS = 900;
const MARK_MS = 800;

const BASE_COLOR = '#5DADE2';
const SHOWN_COLOR = '#FFD23F';
const EDGE = 'rgba(5,10,20,0.5)';

// Intro-Film: drei Aufgaben – gedreht (gleich), gespiegelt, gedreht (gleich)
const DEMO_TRIALS: TrialSpec[] = [
  { angle: 90, same: true },
  { angle: 180, same: false },
  { angle: 270, same: true },
];
const DEMO_PARAMS: Partial<RotationParams> = { cells: 5, step: 90, cellCm: 1.2, timeoutS: 0 };
const DEMO_LEAD_MS = 1100;
const DEMO_FB_MS = 800;

interface Fb {
  t0: number;
  end: number;
  correct: boolean;
  /** Antwort: true = „gleich“, false = „gespiegelt“, null = Zeit abgelaufen */
  answered: boolean | null;
  /** wahr: die Figur war dieselbe */
  truth: boolean;
}

class MentaleRotation implements Exercise {
  private readonly demo: boolean;
  private readonly p: RotationParams;
  private readonly session: RotationSession;
  private phase: 'lead' | 'play' | 'fb' = 'lead';
  private phaseAt = 0;
  private fb: Fb | null = null;
  private begun = false;
  private autoFor: unknown = null;
  private done = false;
  private endT = Infinity;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = rotationParams(paramsOf(ctx, PARAMS));
    this.p = this.demo ? { ...base, ...DEMO_PARAMS } : ctx.quick ? { ...base, trials: Math.min(base.trials, QUICK_TRIALS) } : base;
    this.session = new RotationSession(this.p, { rng: ctx.rng, fixedTrials: this.demo ? DEMO_TRIALS : undefined });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private headerH(): number {
    return clamp(this.ctx.stage.u * 6.5, 28, 48);
  }

  private labelH(): number {
    return clamp(this.ctx.stage.u * 4.6, 18, 28);
  }

  private field(): Box {
    return playField(this.ctx.stage, this.demo);
  }

  private layout(): RotationLayout {
    return layoutRotation(this.field(), this.headerH(), this.labelH());
  }

  resize(): void {
    if (this.ctx.autoplay) {
      this.ctx.ghost.clear();
      this.autoFor = null;
    }
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    this.session.start(t);
    this.phase = 'lead';
    this.phaseAt = t + (this.demo ? DEMO_LEAD_MS : LEAD_MS);
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateHud();
    if (this.demo) {
      const r = restPoint(this.ctx.stage);
      ghost.moveTo(r.x, r.y, { move: 0 });
      hud.caption(texts.captions.look);
    }
  }

  update(_dt: number, t: number): void {
    if (this.done) return;
    if (this.phase === 'lead') {
      if (t >= this.phaseAt) this.beginPlay();
    } else if (this.phase === 'play') {
      const expired = this.session.update(t);
      if (expired) {
        this.fb = { t0: t, end: t + FB_WRONG_MS, correct: false, answered: null, truth: expired.same };
        this.phase = 'fb';
        this.ctx.sfx.bad();
        this.updateHud();
      } else if (this.ctx.autoplay && !this.demo) this.autoUpdate();
    } else if (this.phase === 'fb' && this.fb && t >= this.fb.end) {
      if (this.session.finished) {
        this.finishSession(t);
        return;
      }
      this.fb = null;
      this.beginPlay();
    }
  }

  private beginPlay(): void {
    this.phase = 'play';
    this.begun = false;
    this.autoFor = null;
    if (this.demo) this.queueDemo();
  }

  private updateHud(): void {
    const { hud, texts } = this.ctx;
    const s = this.session;
    hud.setProgress(clamp(s.idx / s.total, 0, 1));
    if (this.demo) return;
    hud.setScore(s.trials.filter((t) => t.correct).length);
    hud.setLabel(texts.feedback.label.replace('{i}', String(Math.min(s.idx + 1, s.total))).replace('{n}', String(s.total)));
  }

  // --- Intro-Film ---

  private queueDemo(): void {
    const { ghost, hud, texts } = this.ctx;
    const t = this.session.trial;
    if (!t) return;
    const L = this.layout();
    const btn = t.same ? L.btnSame : L.btnMirror;
    hud.caption(this.session.idx === 0 ? texts.captions.same : t.same ? texts.captions.again : texts.captions.mirror);
    ghost.tap(btn.x + btn.w / 2, btn.y + btn.h / 2, { delay: this.session.idx === 0 ? 1700 : 1400, move: 600 });
  }

  /** Autoplay (Tests): meist richtig, Antwortzeit wächst mit dem Winkel */
  private autoUpdate(): void {
    const { ghost, rng } = this.ctx;
    const t = this.session.trial;
    if (!t || t.shownAt === null || this.autoFor === t || !ghost.idle) return;
    this.autoFor = t;
    const folded = Math.min(t.angle % 360, 360 - (t.angle % 360));
    const ok = rng.chance(0.92);
    const answerSame = ok ? t.same : !t.same;
    const L = this.layout();
    const btn = answerSame ? L.btnSame : L.btnMirror;
    const jit = Math.min(btn.w, btn.h) * 0.08;
    ghost.tap(btn.x + btn.w / 2 + rng.normal() * jit, btn.y + btn.h / 2 + rng.normal() * jit, {
      delay: rng.range(350, 650) + folded * 3.5,
      move: rng.range(240, 380),
    });
  }

  // --- Eingabe ---

  pointerDown(p: PointerInfo): void {
    if (this.done || this.phase !== 'play') return;
    const L = this.layout();
    if (hit(L.btnSame, p.x, p.y, 6)) this.answer(true, p.t);
    else if (hit(L.btnMirror, p.x, p.y, 6)) this.answer(false, p.t);
  }

  /** Tastatur (Computer): ← = gleich, → = gespiegelt (wie die Lage der Knöpfe) */
  keyDown(key: string, t: number): void {
    if (this.done || this.phase !== 'play') return;
    if (key === 'ArrowLeft') this.answer(true, t);
    else if (key === 'ArrowRight') this.answer(false, t);
  }

  private answer(isSame: boolean, t: number): void {
    const res = this.session.answer(isSame, t);
    if (!res) return;
    const { sfx } = this.ctx;
    const correct = res.type === 'correct';
    this.fb = { t0: t, end: t + (this.demo ? DEMO_FB_MS : correct ? FB_OK_MS : FB_WRONG_MS), correct, answered: isSame, truth: res.same };
    this.phase = 'fb';
    if (correct) sfx.good();
    else sfx.bad();
    this.updateHud();
  }

  // --- Ende ---

  private finishSession(t: number): void {
    if (this.done) return;
    this.done = true;
    this.endT = t;
    const { hud, sfx } = this.ctx;
    hud.setProgress(1);
    const sum = this.session.summary();
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'accuracy', value: sum.accuracy ?? 0, unit: 'percent', better: 'higher' },
        secondary: [{ key: 'correct', value: sum.correct, unit: 'count' }],
        score: 0,
        level: 1,
      });
      return;
    }
    sfx.done();
    this.ctx.finish(this.buildResult(sum));
  }

  private buildResult(sum: RotationSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const secondary: Metric[] = [];
    if (sum.rtMean !== null) secondary.push({ key: 'rt_mean', value: sum.rtMean, unit: 'time' });
    secondary.push({ key: 'correct', value: sum.correct, unit: 'count' });
    if (sum.slope !== null) secondary.push({ key: 'slope', value: sum.slope, unit: 'msSigned' });
    const rows: ResultDetailRow[] = [];
    if (sum.rtMedian !== null) rows.push({ label: texts.metrics.rt_median, value: fmt.time(sum.rtMedian) });
    return {
      primary: { key: 'accuracy', value: sum.accuracy ?? 0, unit: 'percent', better: 'higher' },
      secondary,
      ...(rows.length
        ? { details: [{ title: texts.feedback.moreTitle, rows, note: sum.slope === null ? `${texts.feedback.moreNote} ${texts.feedback.noSlope}` : texts.feedback.moreNote }] }
        : {}),
      score: pointsFor(sum.correct),
      level: 1,
      tip: tipFor(sum),
    };
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, now: number): void {
    const t = Math.min(now, this.endT);
    const { w, h, dpr, u } = this.ctx.stage;
    background(g, w, h, dpr);
    const s = this.session;
    if (this.phase === 'play' && !this.begun && s.trial) {
      this.begun = true;
      s.beginTrial(now);
    }
    const L = this.layout();
    const f = this.field();
    this.drawHeader(g, f.x + f.w / 2, f.y + this.headerH() / 2, f.w, u);
    this.drawLabels(g, L, u);

    const tr = s.trial;
    if (this.phase === 'play' && tr) {
      const radius = figureRadius(tr.base);
      const wanted = calibOf(this.ctx).sizePx(this.p.cellCm);
      const cell = Math.min(cellPxFor(L.left, radius, wanted), cellPxFor(L.right, radius, wanted));
      this.drawFigure(g, tr.base, IDENTITY, L.left, cell, BASE_COLOR);
      this.drawFigure(g, tr.base, tr.matrix, L.right, cell, SHOWN_COLOR);
    }
    this.drawButtons(g, L, t);
    if (this.phase === 'fb' && this.fb) this.drawFeedback(g, L, t, u);
  }

  private drawHeader(g: CanvasRenderingContext2D, cx: number, cy: number, maxW: number, u: number): void {
    const label = this.ctx.texts.feedback.prompt;
    let px = clamp(u * 3.8, 15, 24);
    g.save();
    g.font = font(px, 700);
    const tw = g.measureText(label).width;
    g.restore();
    if (tw > maxW) px = Math.max(12, Math.floor((px * maxW) / tw));
    text(g, label, cx, cy, px, C.dim, { weight: 700 });
  }

  private drawLabels(g: CanvasRenderingContext2D, L: RotationLayout, u: number): void {
    const { texts } = this.ctx;
    const px = clamp(u * 3.2, 13, 20);
    text(g, texts.feedback.template, L.leftLabel.x + L.leftLabel.w / 2, L.leftLabel.y + L.leftLabel.h / 2, px, BASE_COLOR, { weight: 700 });
    text(g, texts.feedback.compare, L.rightLabel.x + L.rightLabel.w / 2, L.rightLabel.y + L.rightLabel.h / 2, px, SHOWN_COLOR, { weight: 700 });
    // Rahmen der Bereiche (Form, nicht nur Farbe)
    for (const [r, dashed] of [
      [L.left, false],
      [L.right, true],
    ] as const) {
      g.save();
      rrPath(g, r.x + 1, r.y + 1, r.w - 2, r.h - 2, 14);
      if (dashed) g.setLineDash([8, 6]);
      g.strokeStyle = 'rgba(255,255,255,0.16)';
      g.lineWidth = 1.5;
      g.stroke();
      g.restore();
    }
  }

  /** Figur im Bereich zeichnen: Vielecke aus der Matrix (genau die Abbildung, die in logic.ts geprüft wird) */
  private drawFigure(g: CanvasRenderingContext2D, cells: readonly Cell[], M: Mat, area: Box, cell: number, color: string): void {
    const cx = area.x + area.w / 2;
    const cy = area.y + area.h / 2;
    const polys = figurePolygons(cells, M);
    g.save();
    g.beginPath();
    for (const poly of polys) {
      poly.forEach(([x, y], i) => {
        const px = cx + x * cell;
        const py = cy + y * cell;
        if (i === 0) g.moveTo(px, py);
        else g.lineTo(px, py);
      });
      g.closePath();
    }
    g.fillStyle = color;
    g.fill();
    g.strokeStyle = EDGE;
    g.lineWidth = Math.max(1.5, cell * 0.04);
    g.lineJoin = 'round';
    for (const poly of polys) {
      g.beginPath();
      poly.forEach(([x, y], i) => {
        const px = cx + x * cell;
        const py = cy + y * cell;
        if (i === 0) g.moveTo(px, py);
        else g.lineTo(px, py);
      });
      g.closePath();
      g.stroke();
    }
    g.restore();
  }

  private drawButtons(g: CanvasRenderingContext2D, L: RotationLayout, t: number): void {
    const active = this.phase === 'play';
    this.drawButton(g, L.btnSame, this.ctx.texts.feedback.same, 'rotate', active);
    this.drawButton(g, L.btnMirror, this.ctx.texts.feedback.mirror, 'mirror', active);
    const fb = this.fb;
    if (this.phase !== 'fb' || !fb) return;
    // richtiger Knopf gestrichelt umrandet, gewählter falscher mit Innenrahmen (Form, nicht nur Farbe)
    const k = clamp(1 - (t - fb.t0) / 900, 0, 1);
    const right = fb.truth ? L.btnSame : L.btnMirror;
    g.save();
    rrPath(g, right.x - 4, right.y - 4, right.w + 8, right.h + 8, 20);
    g.setLineDash([10, 7]);
    g.strokeStyle = `rgba(232,238,247,${0.5 + 0.45 * k})`;
    g.lineWidth = 3.5;
    g.stroke();
    g.restore();
    if (fb.answered !== null && !fb.correct) {
      const chosen = fb.answered ? L.btnSame : L.btnMirror;
      g.save();
      rrPath(g, chosen.x + 6, chosen.y + 6, chosen.w - 12, chosen.h - 12, 14);
      g.strokeStyle = `rgba(251,191,36,${0.45 + 0.5 * k})`;
      g.lineWidth = 3.5;
      g.stroke();
      g.restore();
    }
  }

  private drawButton(g: CanvasRenderingContext2D, r: Box, label: string, icon: 'rotate' | 'mirror', active: boolean): void {
    button(g, r, active ? 'normal' : 'disabled');
    const col = active ? C.fg : C.dim;
    const is = r.h * 0.3;
    const cx = r.x + r.w / 2;
    const iy = r.y + r.h * 0.36;
    g.save();
    g.strokeStyle = col;
    g.fillStyle = col;
    g.lineWidth = Math.max(2.5, is * 0.14);
    g.lineCap = 'round';
    g.lineJoin = 'round';
    if (icon === 'rotate') {
      // Kreispfeil
      const rr = is * 0.5;
      g.beginPath();
      g.arc(cx, iy, rr, -Math.PI * 0.35, Math.PI * 1.25, false);
      g.stroke();
      const ang = Math.PI * 1.25;
      const ex = cx + Math.cos(ang) * rr;
      const ey = iy + Math.sin(ang) * rr;
      g.beginPath();
      g.moveTo(ex, ey);
      g.lineTo(ex + is * 0.34, ey - is * 0.06);
      g.lineTo(ex + is * 0.05, ey - is * 0.34);
      g.closePath();
      g.fill();
    } else {
      // zwei Dreiecke, an einer gestrichelten Achse gespiegelt
      const a = is * 0.5;
      g.save();
      g.setLineDash([3, 4]);
      g.beginPath();
      g.moveTo(cx, iy - a * 1.1);
      g.lineTo(cx, iy + a * 1.1);
      g.stroke();
      g.restore();
      g.beginPath();
      g.moveTo(cx - a * 0.25, iy - a);
      g.lineTo(cx - a * 0.25, iy + a);
      g.lineTo(cx - a * 1.15, iy + a);
      g.closePath();
      g.stroke();
      g.beginPath();
      g.moveTo(cx + a * 0.25, iy - a);
      g.lineTo(cx + a * 0.25, iy + a);
      g.lineTo(cx + a * 1.15, iy + a);
      g.closePath();
      g.stroke();
    }
    g.restore();
    let px = clamp(r.h * 0.22, 13, 20);
    g.save();
    g.font = font(px, 700);
    const tw = g.measureText(label).width;
    g.restore();
    const room = r.w - 14;
    if (tw > room) px = Math.max(11, Math.floor((px * room) / tw));
    text(g, label, cx, r.y + r.h * 0.76, px, col, { weight: 700 });
  }

  private drawFeedback(g: CanvasRenderingContext2D, L: RotationLayout, t: number, u: number): void {
    const fb = this.fb!;
    const { texts } = this.ctx;
    const top = Math.min(L.left.y, L.right.y);
    const bottom = Math.max(L.left.y + L.left.h, L.right.y + L.right.h);
    const cx = (L.left.x + L.right.x + L.right.w) / 2;
    const cy = (top + bottom) / 2;
    const s = clamp(Math.min(L.left.w, L.left.h) * 0.14, 16, 38);
    const a = markAlpha(t - fb.t0, MARK_MS);
    if (fb.correct) drawSoftCheck(g, cx, cy - s * 0.8, s, a);
    else drawSoftCross(g, cx, cy - s * 0.8, s, a);
    const label = fb.answered === null ? texts.feedback.timeout : fb.truth ? texts.feedback.wasSame : texts.feedback.wasMirror;
    let px = clamp(u * 3.8, 15, 24);
    g.save();
    g.font = font(px, 700);
    const tw = g.measureText(label).width;
    g.restore();
    const maxW = L.btnMirror.x + L.btnMirror.w - L.btnSame.x;
    if (tw > maxW) px = Math.max(12, Math.floor((px * maxW) / tw));
    text(g, label, cx, cy + s * 1.1, px, C.fg, { weight: 700, alpha: clamp(a * 1.5, 0, 1) });
  }
}

export const laborMentaleRotation: ExerciseDefinition = {
  id: 'labor-mentale-rotation',
  category: 'wahrnehmung',
  minutes: 3,
  color: '#8C6D4A',
  icon:
    '<g fill="currentColor" stroke="none"><rect x="6" y="8" width="8" height="8" rx="1.5"/><rect x="6" y="16" width="8" height="8" rx="1.5"/><rect x="6" y="24" width="8" height="8" rx="1.5"/><rect x="14" y="24" width="8" height="8" rx="1.5"/></g><g fill="currentColor" stroke="none" opacity=".55"><rect x="30" y="20" width="8" height="8" rx="1.5"/><rect x="38" y="20" width="8" height="8" rx="1.5"/><rect x="30" y="28" width="8" height="8" rx="1.5"/><rect x="30" y="36" width="8" height="8" rx="1.5"/></g><path d="M20 12a14 14 0 0 1 17 3" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M36 9.5l1.5 6.5-6.3-1.8z" fill="currentColor"/>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  create: (ctx) => new MentaleRotation(ctx),
};
