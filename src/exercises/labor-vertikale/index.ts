/**
 * Subjektive Vertikale (Labor) – Funktionsübung nach dem Prinzip der subjektiven visuellen Vertikalen (keine Brille nötig).
 *
 * Eine helle Linie auf reinem Schwarz, ohne Rahmen. Verfahren „Drehen und stoppen“: Die Linie dreht sich langsam (mit `dt`
 * gerechnet, bildratenunabhängig) und du stoppst sie, sobald sie senkrecht wirkt. Verfahren „Einstellen“: Du verstellst sie mit
 * Tasten (±0,5° und ±2°) oder den Pfeiltasten. Die Starts wechseln zwischen rechts und links geneigt. Reine Logik in logic.ts
 * (`VerticalSession`).
 *
 * - Hauptwert: fertige Einstellungen (`n`, Zahl der Eingaben, keine Leistung). Die Abweichung von der Senkrechten (Mittel,
 *   Betrag, Streuung, Unterschied je Startseite, in Grad) steht als Übungswert im Ergebnis, ohne Deutung und ohne Richtwerte.
 * - Die Winkel gelten nur, wenn das Gerät wirklich gerade steht (Hinweis im Intro und im Ergebnis). Tasten ≥ 56 px, dezent
 *   hellgrau; kein Flackern, keine Blitze; die Drehung ist langsam und gleichmäßig.
 * - Gemessen wird nur, was du einstellst.
 */
import { calibOf } from '../../core/calib';
import { hit, type Rect } from '../../core/draw';
import { paramsOf } from '../../core/params';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, Metric, PointerInfo, ResultDetailRow, ResultDetailTable } from '../../core/types';
import { drawBtn, drawHint, pruefLayout, splitRow, type PruefLayout } from '../_shared/pruefung-ui';
import { restPoint } from '../_shared/tippziele';
import { NUDGE_BIG, NUDGE_SMALL, PARAMS, QUICK_SPEED, QUICK_TRIALS, tipFor, VerticalSession, verticalParams, type VerticalParams, type VerticalSummary } from './logic';
import { de, it } from './texts';

const BLACK = '#000000';
const LINE = '#E6EBF0';
const LEAD_MS = 700;
const DEMO_START_MS = 2300;
const DEMO_END_MS = 1100;
// Intro-Film: zwei schnelle Durchgänge (die Bühne ist dort nur etwa 13 cm hoch)
const DEMO_PARAMS: Partial<VerticalParams> = { trials: 2, method: 'rotating', speedDegS: 6, startMaxDeg: 20, lineCm: 8 };

class SubjektiveVertikale implements Exercise {
  private readonly demo: boolean;
  private readonly p: VerticalParams;
  private readonly session: VerticalSession;
  private started = false;
  private startAt = 0;
  private done = false;
  private finishAt = -1;
  private queued = false;
  private lastCaption = '';
  private lastIdx = -1;
  /** Autoplay: Winkel, bei dem die Hand die Linie für senkrecht hält, je Einstellung */
  private autoTarget = 0;
  private autoFor = -1;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = verticalParams(paramsOf(ctx, PARAMS));
    this.p = this.demo
      ? { ...base, ...DEMO_PARAMS }
      : ctx.quick
        ? { ...base, trials: Math.min(base.trials, QUICK_TRIALS), speedDegS: Math.max(base.speedDegS, QUICK_SPEED) }
        : base;
    this.session = new VerticalSession(this.p, ctx.rng);
  }

  // --- Geometrie: immer live aus der Bühne ---

  private get adjust(): boolean {
    return this.p.method === 'adjust';
  }

  private layout(): PruefLayout {
    return pruefLayout(this.ctx.stage, this.demo, this.adjust ? 2 : 1);
  }

  private okRect(L: PruefLayout): Rect {
    const row = L.rows[L.rows.length - 1];
    const w = Math.min(row.w, 360);
    return { x: row.x + (row.w - w) / 2, y: row.y, w, h: row.h };
  }

  private nudgeRects(L: PruefLayout): Rect[] {
    return this.adjust ? splitRow(L.rows[0], [1, 1, 1, 1], L.gap) : [];
  }

  private lineGeom(L: PruefLayout): { cx: number; cy: number; half: number } {
    const f = L.field;
    const half = Math.max(10, Math.min(calibOf(this.ctx).sizePx(this.p.lineCm) / 2, Math.min(f.w, f.h) / 2 - 8));
    return { cx: f.x + f.w / 2, cy: f.y + f.h / 2, half };
  }

  resize(): void {
    if (this.ctx.autoplay) {
      this.ctx.ghost.clear();
      this.queued = false;
    }
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    this.startAt = t + (this.demo ? DEMO_START_MS : LEAD_MS);
    hud.setProgress(0);
    hud.setScore(null);
    hud.setLabel(this.demo ? null : this.label());
    if (this.demo) {
      const r = restPoint(this.ctx.stage);
      ghost.moveTo(r.x, r.y, { move: 0 });
      this.caption('look');
    }
  }

  private caption(key: string): void {
    if (this.lastCaption === key) return;
    this.lastCaption = key;
    this.ctx.hud.caption(this.ctx.texts.captions[key]);
  }

  private label(): string {
    const s = this.session;
    return this.ctx.texts.feedback.progress.replace('{n}', String(Math.min(s.idx + 1, this.p.trials))).replace('{total}', String(this.p.trials));
  }

  update(dt: number, t: number): void {
    if (this.done) return;
    const s = this.session;
    if (!this.started) {
      if (t < this.startAt) return;
      this.started = true;
      s.startRun();
      if (this.demo) this.caption('rotate');
    }
    s.update(dt);
    if (s.idx !== this.lastIdx) {
      this.lastIdx = s.idx;
      this.ctx.hud.setProgress(Math.min(1, s.idx / this.p.trials));
      if (!this.demo) this.ctx.hud.setLabel(this.label());
    }
    if (s.finished) {
      if (this.finishAt < 0) {
        this.finishAt = t + (this.demo ? DEMO_END_MS : 0);
        if (this.demo) this.caption('done');
      }
      if (t >= this.finishAt) this.finishSession();
      return;
    }
    if (this.ctx.autoplay) this.autoUpdate();
  }

  // --- Eingabe ---

  private pad(r: Rect): number {
    return Math.max(0, 24 - Math.min(r.w, r.h) / 2);
  }

  pointerDown(p: PointerInfo): void {
    if (this.done || !this.started) return;
    if (p.type === 'ghost') this.queued = false;
    const L = this.layout();
    const ok = this.okRect(L);
    if (hit(ok, p.x, p.y, this.pad(ok))) {
      this.confirm();
      return;
    }
    const rects = this.nudgeRects(L);
    const deltas = [-NUDGE_BIG, -NUDGE_SMALL, NUDGE_SMALL, NUDGE_BIG];
    for (let i = 0; i < rects.length; i++) {
      if (hit(rects[i], p.x, p.y, this.pad(rects[i]))) {
        this.nudge(deltas[i]);
        return;
      }
    }
  }

  keyDown(key: string): void {
    if (this.done || !this.started) return;
    if (key === ' ' || key === 'Enter') this.confirm();
    else if (key === 'ArrowLeft') this.nudge(-NUDGE_SMALL);
    else if (key === 'ArrowRight') this.nudge(NUDGE_SMALL);
  }

  private nudge(d: number): void {
    if (this.session.nudge(d)) this.ctx.sfx.tap();
  }

  private confirm(): void {
    if (this.session.confirm()) this.ctx.sfx.tap();
  }

  // --- Autoplay (Intro-Film und Tests) ---

  private autoUpdate(): void {
    const { ghost, rng } = this.ctx;
    if (this.queued || !ghost.idle || !this.started) return;
    const s = this.session;
    const L = this.layout();
    if (this.autoFor !== s.idx) {
      this.autoFor = s.idx;
      // die Hand hält die Linie bei einem „wahrgenommenen“ Winkel für senkrecht (Film: fast genau senkrecht)
      this.autoTarget = this.demo ? 0.6 : Math.round(rng.range(-2.5, 2.5) * 2) / 2;
    }
    const ok = this.okRect(L);
    const quick = this.ctx.quick;
    const move = this.demo ? 420 : quick ? 180 : rng.range(240, 380);
    if (!this.adjust) {
      // Die Linie dreht sich auf die Senkrechte zu; der Tipp wird kurz vorher eingeplant (Fahrzeit der Hand eingerechnet)
      const lead = this.p.speedDegS * ((move + 170) / 1000);
      if (Math.abs(s.angle - this.autoTarget) > lead + 0.2) return;
      this.queued = true;
      if (this.demo) this.caption('stop');
      ghost.tap(ok.x + ok.w / 2, ok.y + ok.h / 2, { delay: 0, move });
      return;
    }
    const rects = this.nudgeRects(L);
    const diff = this.autoTarget - s.angle;
    const delay = quick ? rng.range(40, 120) : rng.range(250, 600);
    let r: Rect;
    if (Math.abs(diff) >= NUDGE_BIG * 0.75) r = diff < 0 ? rects[0] : rects[3];
    else if (Math.abs(diff) >= NUDGE_SMALL * 0.75) r = diff < 0 ? rects[1] : rects[2];
    else r = ok;
    this.queued = true;
    ghost.tap(r.x + r.w / 2, r.y + r.h / 2, { delay, move });
  }

  // --- Ende ---

  private finishSession(): void {
    if (this.done) return;
    this.done = true;
    this.ctx.hud.setProgress(1);
    const sum = this.session.summary();
    if (this.demo) {
      this.ctx.finish({ primary: { key: 'n', value: sum.n, unit: 'count', better: 'higher' }, secondary: [], score: 0, level: 1 });
      return;
    }
    this.ctx.sfx.done();
    this.ctx.finish(this.buildResult(sum));
  }

  buildResult(sum: VerticalSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const f = texts.feedback;
    const calib = calibOf(this.ctx);
    const secondary: Metric[] = [];
    if (sum.msMean !== null) secondary.push({ key: 'ms_mean', value: sum.msMean, unit: 'ms' });

    const signed = (v: number): string => `${v > 0 ? '+' : v < 0 ? '−' : ''}${fmt.num(Math.abs(v), 2)}`;
    const deg = (v: string): string => f.meanValue.replace('{v}', v);
    const rows: ResultDetailRow[] = [];
    if (sum.devMean !== null) rows.push({ label: f.rowMean, value: deg(signed(sum.devMean)), text: f.meanText });
    if (sum.devAbs !== null) rows.push({ label: f.rowAbs, value: deg(fmt.num(sum.devAbs, 2)) });
    if (sum.devSd !== null) rows.push({ label: f.rowSd, value: deg(fmt.num(sum.devSd, 2)) });
    if (sum.hysteresis !== null) rows.push({ label: f.rowHyst, value: deg(signed(sum.hysteresis)), text: f.hystText });
    const details: ResultDetailTable[] = [{ title: f.valuesTitle, rows, note: sum.n < 8 ? `${f.valuesNote} ${f.fewNote}` : f.valuesNote }];

    const L = this.layout();
    const lineCm = (2 * this.lineGeom(L).half) / calib.pxPerCm;
    const lineNotes: string[] = [];
    if (lineCm < this.p.lineCm - 0.05) lineNotes.push(f.limited);
    if (!calib.calibrated) lineNotes.push(f.notCalibrated);
    details.push({
      title: f.setupTitle,
      rows: [
        {
          label: f.rowMethod,
          value: this.p.method === 'rotating' ? f.methodRotate.replace('{v}', fmt.num(this.p.speedDegS, 1)) : f.methodAdjust,
        },
        { label: f.rowLine, value: f.lineValue.replace('{cm}', fmt.num(lineCm, 1)), text: lineNotes.length ? lineNotes.join(' · ') : undefined },
      ],
      note: f.setupText,
    });

    return {
      primary: { key: 'n', value: sum.n, unit: 'count', better: 'higher' },
      secondary,
      details,
      score: sum.n,
      level: 1,
      tip: tipFor(sum),
    };
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D): void {
    const { w, h } = this.ctx.stage;
    g.fillStyle = BLACK;
    g.fillRect(0, 0, w, h);
    if (!this.started) return;
    const L = this.layout();
    const gm = this.lineGeom(L);
    const a = (this.session.angle * Math.PI) / 180;
    g.save();
    g.strokeStyle = LINE;
    g.lineWidth = clamp(gm.half * 0.03, 3, 6);
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(gm.cx - Math.sin(a) * gm.half, gm.cy + Math.cos(a) * gm.half);
    g.lineTo(gm.cx + Math.sin(a) * gm.half, gm.cy - Math.cos(a) * gm.half);
    g.stroke();
    g.restore();
    const f = this.ctx.texts.feedback;
    drawHint(g, this.ctx.stage, L, this.adjust ? f.hintAdjust : f.hintRotate, 'rgba(138,155,181,0.7)');
    if (this.adjust) {
      const labels = [-NUDGE_BIG, -NUDGE_SMALL, NUDGE_SMALL, NUDGE_BIG].map((d) => `${d < 0 ? '−' : '+'}${this.ctx.fmt.num(Math.abs(d), Number.isInteger(d) ? 0 : 1)}°`);
      this.nudgeRects(L).forEach((r, i) => drawBtn(g, r, labels[i], { size: clamp(r.h * 0.34, 12, 22) }));
    }
    drawBtn(g, this.okRect(L), f.plumb, { primary: true });
  }
}

export const laborVertikale: ExerciseDefinition = {
  id: 'labor-vertikale',
  category: 'wahrnehmung',
  minutes: 3,
  color: '#8C6D4A',
  icon:
    '<path d="M24 6v36" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" transform="rotate(14 24 24)"/><path d="M8 24h6M34 24h6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" opacity=".4"/>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  create: (ctx) => new SubjektiveVertikale(ctx),
};
