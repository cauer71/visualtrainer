/**
 * Schober-Kreuz im Ring (Labor) – Funktionsübung nach dem Prinzip des klassischen Schober-Verfahrens mit Rot-Grün-Brille.
 *
 * Ein Auge sieht nur ein Kreuz, das andere nur einen Ring (kein Rahmen, kein gemeinsames Bild). Du schiebst das Kreuz mit
 * kleinen und großen Schritten (Prismendioptrien Δ; 1 Δ = 1 cm auf 1 m, mit dem Abstand der Kalibrierung in Pixel umgerechnet),
 * bis es für dich mittig im Ring liegt. Waagerecht und senkrecht, je zweimal von entgegengesetzten Startseiten.
 * Reine Logik in logic.ts (`SchoberSession`).
 *
 * - Hauptwert: fertige Durchgänge (`runs`, Zahl der Eingaben, keine Leistung). Die Verschiebung in Δ steht als Übungswert im
 *   Ergebnis, ohne Deutung und ohne Richtwerte. WICHTIG: Die Vorzeichenregeln (Eso-/Exo-Richtung, rechts/links höher) sind
 *   nur hergeleitet und nicht gegen ein Messgerät geprüft – das steht im Ergebnis und in den Hinweisen.
 * - Der Versatz wird auf kleinen Bildschirmen begrenzt (das Kreuz bleibt auf der Bühne); der tatsächliche Wert steht im Ergebnis.
 * - Tasten ≥ 56 px, neutral hellgrau; kein Flackern, keine Blitze. Gemessen wird nur, was du einstellst.
 */
import { calibOf } from '../../core/calib';
import { hit, type Rect } from '../../core/draw';
import { paramsOf } from '../../core/params';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseParams, ExerciseResult, ExerciseTexts, Metric, PointerInfo, ResultDetailRow, ResultDetailTable } from '../../core/types';
import { anaColorCheck, anaCss, anaLensName, cmToPd, pdToCm, withAnaColor, type AnaCss } from '../_shared/pruefung-anaglyph';
import { drawBtn, drawHint, pruefLayout, splitRow, type PruefLayout } from '../_shared/pruefung-ui';
import { restPoint } from '../_shared/tippziele';
import { PARAMS, SchoberSession, schoberParams, tipFor, type SchoberParams, type SchoberSummary } from './logic';
import { de, it } from './texts';

const BLACK = '#000000';
const LEAD_MS = 600;
const DEMO_START_MS = 1500;
const DEMO_END_MS = 1000;
/** Großer Schritt = so viele kleine */
const BIG = 4;
// Intro-Film: ein Durchgang waagerecht, größerer Ring (die Bühne ist dort nur etwa 13 cm hoch)
const DEMO_PARAMS: Partial<SchoberParams> = { axes: 'horizontal', stepPd: 0.25, startPd: 6, crossColor: 'red', sizeCm: 4, leftLens: 'red', tones: 'redgreen', redLevel: 100, secondLevel: 100 };
/** Im Schnelllauf (`?quick=1`): Durchgänge */
const QUICK_RUNS = 2;

class SchoberKreuzImRing implements Exercise {
  private readonly demo: boolean;
  private readonly p: SchoberParams;
  private readonly css: AnaCss;
  private readonly session: SchoberSession;
  private started = false;
  private startAt = 0;
  private done = false;
  private finishAt = -1;
  private queued = false;
  private lastCaption = '';
  private lastIdx = -1;
  /** Autoplay: Wert (Δ), bei dem die Hand das Kreuz für mittig hält, je Durchgang */
  private autoTarget = 0;
  private autoFor = -1;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = schoberParams(paramsOf(ctx, PARAMS));
    this.p = this.demo ? { ...base, ...DEMO_PARAMS } : ctx.quick ? { ...base, axes: 'horizontal' } : base;
    this.css = anaCss(this.p);
    this.session = new SchoberSession(this.p, { rng: ctx.rng, maxRuns: this.demo ? 1 : ctx.quick ? QUICK_RUNS : undefined });
    this.session.setLimit(this.limitPd(this.layout()));
  }

  // --- Geometrie: immer live aus der Bühne ---

  private layout(): PruefLayout {
    return pruefLayout(this.ctx.stage, this.demo, 2);
  }

  private geom(L: PruefLayout): { cx: number; cy: number; R: number; arm: number } {
    const f = L.field;
    const half = Math.min(f.w, f.h) / 2;
    const R = Math.max(10, Math.min(calibOf(this.ctx).sizePx(this.p.sizeCm) / 2, half - 8));
    return { cx: f.x + f.w / 2, cy: f.y + f.h / 2, R, arm: Math.max(8, R * 0.45) };
  }

  /** Größter Versatz in Δ, bei dem das Kreuz samt Arm noch auf dem Feld liegt */
  private limitPd(L: PruefLayout): number {
    const calib = calibOf(this.ctx);
    const gm = this.geom(L);
    const f = L.field;
    const maxPx = Math.max(0, Math.min(f.w, f.h) / 2 - gm.arm - 6);
    return cmToPd(maxPx / calib.pxPerCm, calib.viewDistanceCm);
  }

  private stepButtons(L: PruefLayout): Rect[] {
    return splitRow(L.rows[0], [1, 1, 1, 1], L.gap);
  }

  resize(): void {
    this.session.setLimit(this.limitPd(this.layout()));
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
    const f = this.ctx.texts.feedback;
    return f.progress
      .replace('{axis}', s.axis === 'h' ? f.axisH : f.axisV)
      .replace('{n}', String(Math.min(s.idx + 1, s.plan.length)))
      .replace('{total}', String(s.plan.length));
  }

  update(_dt: number, t: number): void {
    if (this.done) return;
    const s = this.session;
    if (!this.started) {
      if (t < this.startAt) return;
      this.started = true;
      s.start(t);
    }
    s.setLimit(this.limitPd(this.layout()));
    if (s.idx !== this.lastIdx) {
      this.lastIdx = s.idx;
      this.ctx.hud.setProgress(Math.min(1, s.idx / s.plan.length));
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
    const ok = L.rows[1];
    if (hit(ok, p.x, p.y, this.pad(ok))) {
      this.confirm(p.t);
      return;
    }
    const btns = this.stepButtons(L);
    const steps = [-BIG, -1, 1, BIG];
    for (let i = 0; i < btns.length; i++) {
      if (hit(btns[i], p.x, p.y, this.pad(btns[i]))) {
        this.step(steps[i]);
        return;
      }
    }
  }

  keyDown(key: string, t: number): void {
    if (this.done || !this.started) return;
    if (key === 'Enter' || key === ' ') this.confirm(t);
    else if (key === 'ArrowLeft' || key === 'ArrowDown') this.step(-1);
    else if (key === 'ArrowRight' || key === 'ArrowUp') this.step(1);
  }

  private step(n: number): void {
    if (this.session.step(n)) this.ctx.sfx.tap();
  }

  private confirm(t: number): void {
    if (this.session.confirm(t)) this.ctx.sfx.tap();
  }

  // --- Autoplay (Intro-Film und Tests) ---

  private autoUpdate(): void {
    const { ghost, rng } = this.ctx;
    if (this.queued || !ghost.idle || !this.started) return;
    const s = this.session;
    const L = this.layout();
    if (this.autoFor !== s.idx) {
      this.autoFor = s.idx;
      // die Hand hält das Kreuz bei einem „wahrgenommenen“ Versatz für mittig (Film: fest +1 Δ)
      this.autoTarget = this.demo ? 0.5 : Math.round(rng.range(-3, 3) / this.p.stepPd) * this.p.stepPd;
    }
    const quick = this.ctx.quick;
    const delay = this.demo ? 650 : quick ? rng.range(40, 120) : rng.range(250, 600);
    const move = this.demo ? 450 : quick ? 180 : rng.range(220, 360);
    const diff = this.autoTarget - s.shift;
    const btns = this.stepButtons(L);
    let r: Rect;
    if (Math.abs(diff) >= BIG * this.p.stepPd) r = diff < 0 ? btns[0] : btns[3];
    else if (Math.abs(diff) >= this.p.stepPd * 0.75) r = diff < 0 ? btns[1] : btns[2];
    else r = L.rows[1];
    if (this.demo) this.caption(r === L.rows[1] ? 'center' : 'move');
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
      this.ctx.finish({ primary: { key: 'runs', value: sum.runs, unit: 'count', better: 'higher' }, secondary: [], score: 0, level: 1 });
      return;
    }
    this.ctx.sfx.done();
    this.ctx.finish(this.buildResult(sum));
  }

  buildResult(sum: SchoberSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const f = texts.feedback;
    const calib = calibOf(this.ctx);
    const secondary: Metric[] = [];
    if (sum.msMean !== null) secondary.push({ key: 'ms_mean', value: sum.msMean, unit: 'ms' });

    const signed = (v: number): string => `${v > 0 ? '+' : v < 0 ? '−' : ''}${fmt.num(Math.abs(v), 2)}`;
    const rows: ResultDetailRow[] = [];
    const diffText = (d: number | null): string => (d === null ? '' : ` · ${f.diffText.replace('{d}', fmt.num(d, 2))}`);
    if (sum.hMean !== null) rows.push({ label: f.rowH, value: f.shiftValue.replace('{v}', signed(sum.hMean)), text: `${f.hText}${diffText(sum.hDiff)}` });
    if (sum.vMean !== null) rows.push({ label: f.rowV, value: f.shiftValue.replace('{v}', signed(sum.vMean)), text: `${f.vText}${diffText(sum.vDiff)}` });
    const details: ResultDetailTable[] = [{ title: f.valuesTitle, rows, note: f.valuesNote }];
    // Vorzeichenregeln: hergeleitet, nicht geprüft (Pflichtangabe)
    details.push({ title: f.signTitle, rows: [{ label: f.signRow, value: f.signValue, text: f.signText }], note: f.signNote });

    const eye = this.session.crossEye;
    const lens = anaLensName(texts, this.p.tones, this.p.crossColor === 'red' ? 'a' : 'b');
    const cm = pdToCm(1, calib.viewDistanceCm);
    const setup: ResultDetailRow[] = [
      { label: f.eyeRow, value: f.eyeValue.replace('{eye}', eye === 'left' ? f.eyeLeft : f.eyeRight).replace('{lens}', lens) },
      {
        label: f.convRow,
        value: f.convValue,
        text: [f.convText.replace('{d}', fmt.num(calib.viewDistanceCm, 0)).replace('{cm}', fmt.num(cm, 2)).replace('{px}', fmt.num(cm * calib.pxPerCm, 1)), ...(calib.calibrated ? [] : [f.notCalibrated])].join(' · '),
      },
      {
        label: f.startRow,
        value: f.startValue.replace('{v}', fmt.num(this.p.startPd, 1)),
        text: sum.limitedTo !== null ? f.startLimited.replace('{v}', fmt.num(sum.limitedTo, 1)) : undefined,
      },
    ];
    details.push({ title: f.setupTitle, rows: setup });

    return {
      primary: { key: 'runs', value: sum.runs, unit: 'count', better: 'higher' },
      secondary,
      details,
      score: sum.runs,
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
    const s = this.session;
    const f = this.ctx.texts.feedback;
    const L = this.layout();
    const gm = this.geom(L);
    const calib = calibOf(this.ctx);
    const offPx = pdToCm(s.shift, calib.viewDistanceCm) * calib.pxPerCm;
    const horizontal = s.axis === 'h';
    const kx = gm.cx + (horizontal ? offPx : 0);
    const ky = gm.cy - (horizontal ? 0 : offPx);
    const crossCss = this.p.crossColor === 'red' ? this.css.a : this.css.b;
    const ringCss = this.p.crossColor === 'red' ? this.css.b : this.css.a;
    const lw = clamp(gm.R * 0.06, 3, 6);
    withAnaColor(g, ringCss, () => {
      g.lineWidth = lw;
      g.beginPath();
      g.arc(gm.cx, gm.cy, gm.R, 0, Math.PI * 2);
      g.stroke();
    });
    withAnaColor(g, crossCss, () => {
      g.lineWidth = lw;
      g.lineCap = 'butt';
      g.beginPath();
      g.moveTo(kx - gm.arm, ky);
      g.lineTo(kx + gm.arm, ky);
      g.moveTo(kx, ky - gm.arm);
      g.lineTo(kx, ky + gm.arm);
      g.stroke();
    });
    drawHint(g, this.ctx.stage, L, f.hint);
    const btns = this.stepButtons(L);
    const arrows = horizontal ? ['⇐', '←', '→', '⇒'] : ['⇓', '↓', '↑', '⇑'];
    const amounts = [BIG, 1, 1, BIG];
    btns.forEach((b, i) => drawBtn(g, b, `${arrows[i]} ${this.ctx.fmt.num(amounts[i] * this.p.stepPd, 2)} Δ`, { size: clamp(b.h * 0.3, 11, 20) }));
    drawBtn(g, L.rows[1], f.center, { primary: true });
  }
}

function colorCheck(params: ExerciseParams, tx: ExerciseTexts) {
  return anaColorCheck(params, tx, PARAMS);
}

export const laborSchober: ExerciseDefinition = {
  id: 'labor-schober',
  category: 'wahrnehmung',
  minutes: 4,
  color: '#8C6D4A',
  icon:
    '<circle cx="24" cy="24" r="15" fill="none" stroke="currentColor" stroke-width="2.8" opacity=".55"/><path d="M29 24h-10M24 19v10" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" transform="translate(5 -3)"/>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  colorCheck,
  create: (ctx) => new SchoberKreuzImRing(ctx),
};
