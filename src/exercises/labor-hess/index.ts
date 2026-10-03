/**
 * Hess-Schirm (Labor) – Funktionsübung nach dem Prinzip des klassischen Hess-Schirms mit Rot-Grün-Brille.
 *
 * Ein Auge sieht nur den Zielpunkt eines Rasters (bis zu 25 Punkte), das andere nur einen Zeiger; du legst den Zeiger
 * (ziehen oder tippen) dorthin, wo er auf dem Ziel zu liegen scheint, und bestätigst mit „OK“. Danach tauschen die Augen die
 * Rollen. Das Raster ist auf eine ebene Fläche projiziert (Ort = Abstand · tan(Winkel), Abstand aus der Kalibrierung) und wird
 * bei kleinen Bildschirmen verkleinert; der tatsächliche Winkel steht im Ergebnis. Reine Logik in logic.ts (`HessSession`).
 *
 * - Hauptwert: gesetzte Punkte (`placed`, Zahl der Eingaben, keine Leistung). Die Messgrößen (Abstand zum Ziel in Grad, Fläche
 *   des Umrisses) stehen als „Übungswerte“ in den Detailtabellen, ohne Deutung und ohne Richtwerte.
 * - Schwarzer Grund, additive Farben (Rot und zweite Farbe), Bedienung neutral hellgrau und nie nur an der Farbe; ruhig, kein
 *   Flackern, keine Blitze. Die Karte am Ende unterscheidet die Durchgänge durch Linienart und Form, nicht nur durch Farbe.
 * - Gemessen wird nur, was du setzt – nicht, ob du die Brille trägst oder wirklich auf das Ziel schaust.
 */
import { calibOf } from '../../core/calib';
import { hit, type Rect } from '../../core/draw';
import { paramsOf } from '../../core/params';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseParams, ExerciseResult, ExerciseTexts, Metric, PointerInfo, ResultDetailRow, ResultDetailTable } from '../../core/types';
import { anaColorCheck, anaCss, anaLensName, withAnaColor, type AnaColor, type AnaCss } from '../_shared/pruefung-anaglyph';
import { project } from '../_shared/pruefung-blick';
import { drawBtn, drawHint, pruefLayout, type PruefLayout } from '../_shared/pruefung-ui';
import { restPoint } from '../_shared/tippziele';
import { HessSession, hessParams, PARAMS, QUICK_POINTS, tipFor, type HessParams, type HessSummary } from './logic';
import { de, it } from './texts';

const BLACK = '#000000';
const LEAD_MS = 500;
const DEMO_START_MS = 1500;
const DEMO_POINTS = 2;
// Intro-Film: inneres Raster, ein Durchgang, zwei Punkte, größere Ziele (die Bühne ist dort nur etwa 13 cm hoch)
const DEMO_PARAMS: Partial<HessParams> = {
  maxDeg: 20,
  grid: 'inner',
  passes: 'one',
  targetCm: 1,
  markerCm: 1,
  leftLens: 'red',
  tones: 'redgreen',
  redLevel: 100,
  secondLevel: 100,
};
const CHART_A = '#FF9D8F';
const CHART_B = '#8FC8FF';
const GREY = 'rgba(160,170,185,0.9)';

interface Geo {
  cx: number;
  cy: number;
  /** Pixel je cm (nach Verkleinerung, wenn das Raster nicht auf das Feld passt) */
  unit: number;
  field: Rect;
  pad: number;
}

class HessSchirm implements Exercise {
  private readonly demo: boolean;
  private readonly p: HessParams;
  private readonly css: AnaCss;
  private readonly session: HessSession;
  private readonly ext: { x: number; y: number };
  private started = false;
  private startAt = 0;
  private done = false;
  private dragging = false;
  private queued = false;
  private lastCaption = '';
  private lastPlaced = -1;
  private chartAt = -1;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = hessParams(paramsOf(ctx, PARAMS));
    this.p = this.demo ? { ...base, ...DEMO_PARAMS } : base;
    this.css = anaCss(this.p);
    const calib = calibOf(ctx);
    const L = pruefLayout(ctx.stage, this.demo, 1);
    this.session = new HessSession(this.p, {
      rng: ctx.rng,
      wCm: L.field.w / calib.pxPerCm,
      hCm: L.field.h / calib.pxPerCm,
      distCm: calib.viewDistanceCm,
      maxPoints: this.demo ? DEMO_POINTS : ctx.quick ? QUICK_POINTS : undefined,
    });
    const pts = this.session.points;
    this.ext = { x: Math.max(0, ...pts.map((q) => Math.abs(q.x))), y: Math.max(0, ...pts.map((q) => Math.abs(q.y))) };
  }

  // --- Geometrie: immer live aus der Bühne ---

  private layout(): PruefLayout {
    return pruefLayout(this.ctx.stage, this.demo, 1);
  }

  private geo(L: PruefLayout): Geo {
    const calib = calibOf(this.ctx);
    const f = L.field;
    const r = Math.max(calib.sizePx(this.p.targetCm), calib.sizePx(this.p.markerCm)) / 2;
    const pad = Math.max(r, 12) + 2;
    const kx = this.ext.x > 0 ? (f.w / 2 - pad) / (this.ext.x * calib.pxPerCm) : 1;
    const ky = this.ext.y > 0 ? (f.h / 2 - pad) / (this.ext.y * calib.pxPerCm) : 1;
    const k = clamp(Math.min(1, kx, ky), 0.05, 1);
    return { cx: f.x + f.w / 2, cy: f.y + f.h / 2, unit: calib.pxPerCm * k, field: f, pad };
  }

  private toPx(g: Geo, x: number, y: number): { x: number; y: number } {
    return { x: g.cx + x * g.unit, y: g.cy - y * g.unit };
  }

  private fromPx(g: Geo, px: number, py: number): { x: number; y: number } {
    const f = g.field;
    const x = clamp(px, f.x + g.pad, f.x + f.w - g.pad);
    const y = clamp(py, f.y + g.pad, f.y + f.h - g.pad);
    return { x: (x - g.cx) / g.unit, y: (g.cy - y) / g.unit };
  }

  private okRect(L: PruefLayout): Rect {
    const row = L.rows[0];
    const w = Math.min(row.w, 320);
    return { x: row.x + (row.w - w) / 2, y: row.y, w, h: row.h };
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
    return this.ctx.texts.feedback.progress
      .replace('{n}', String(Math.min(s.k + 1, s.perPass)))
      .replace('{total}', String(s.perPass))
      .replace('{pass}', s.passName(Math.min(s.passIdx, s.nPasses - 1)));
  }

  update(_dt: number, t: number): void {
    if (this.done) return;
    const s = this.session;
    if (!this.started) {
      if (t < this.startAt) return;
      this.started = true;
    }
    if (s.results.length !== this.lastPlaced) {
      this.lastPlaced = s.results.length;
      this.ctx.hud.setProgress(Math.min(1, s.results.length / s.total));
      if (!this.demo) this.ctx.hud.setLabel(this.label());
      if (this.demo && s.results.length === 1) this.caption('place');
    }
    if (s.state === 'chart' && this.chartAt < 0) {
      this.chartAt = t;
      this.caption('chart');
    }
    if (this.ctx.autoplay) this.autoUpdate(t);
    if (s.finished) this.finishSession();
  }

  // --- Eingabe ---

  private pad(r: Rect): number {
    return Math.max(0, 24 - Math.min(r.w, r.h) / 2);
  }

  pointerDown(p: PointerInfo): void {
    if (this.done || !this.started) return;
    if (p.type === 'ghost') this.queued = false;
    const s = this.session;
    const L = this.layout();
    const ok = this.okRect(L);
    if (hit(ok, p.x, p.y, this.pad(ok))) {
      this.press(p.t);
      return;
    }
    if (s.state !== 'placing') return;
    this.dragging = p.type !== 'ghost';
    this.placeAt(p.x, p.y);
  }

  pointerMove(p: PointerInfo): void {
    if (this.dragging && this.session.state === 'placing') this.placeAt(p.x, p.y);
  }

  pointerUp(): void {
    this.dragging = false;
  }

  keyDown(key: string, t: number): void {
    if (this.done || !this.started) return;
    if (key === 'Enter' || key === ' ') this.press(t);
  }

  private placeAt(px: number, py: number): void {
    const g = this.geo(this.layout());
    const q = this.fromPx(g, px, py);
    this.session.place(q.x, q.y);
    if (this.demo && this.session.results.length === 0) this.caption('ok');
  }

  private press(t: number): void {
    const s = this.session;
    if (s.state === 'chart') {
      s.closeChart();
      return;
    }
    if (s.confirm(t)) this.ctx.sfx.tap();
  }

  // --- Autoplay (Intro-Film und Tests) ---

  private autoUpdate(_t: number): void {
    const { ghost, rng } = this.ctx;
    if (this.queued || !ghost.idle || !this.started) return;
    const s = this.session;
    const L = this.layout();
    const ok = this.okRect(L);
    const quick = this.ctx.quick;
    const delay = this.demo ? 450 : quick ? rng.range(40, 120) : rng.range(120, 300);
    const move = this.demo ? 480 : quick ? 180 : rng.range(220, 360);
    if (s.state === 'placing') {
      if (!s.moved) {
        const tg = s.current()!;
        const g = this.geo(L);
        // Streuung der Hand: etwa ±1,2 Grad um das Ziel
        const q = project(s.distCm, tg.hx + rng.range(-1.2, 1.2), tg.vy + rng.range(-1.2, 1.2));
        const px = this.toPx(g, q.x, q.y);
        this.queued = true;
        ghost.tap(clamp(px.x, g.field.x + g.pad, g.field.x + g.field.w - g.pad), clamp(px.y, g.field.y + g.pad, g.field.y + g.field.h - g.pad), { delay: this.demo ? 700 : delay, move });
      } else {
        this.queued = true;
        ghost.tap(ok.x + ok.w / 2, ok.y + ok.h / 2, { delay: this.demo ? 500 : delay, move });
      }
    } else if (s.state === 'chart') {
      this.queued = true;
      if (this.demo) this.caption('done');
      ghost.tap(ok.x + ok.w / 2, ok.y + ok.h / 2, { delay: this.demo ? 1400 : 300, move });
    }
  }

  // --- Ende ---

  private finishSession(): void {
    if (this.done) return;
    this.done = true;
    this.ctx.hud.setProgress(1);
    const sum = this.session.summary();
    if (this.demo) {
      this.ctx.finish({ primary: { key: 'placed', value: sum.placed, unit: 'count', better: 'higher' }, secondary: [], score: 0, level: 1 });
      return;
    }
    this.ctx.sfx.done();
    this.ctx.finish(this.buildResult(sum));
  }

  private eyeName(e: 'left' | 'right'): string {
    return e === 'left' ? this.ctx.texts.feedback.eyeLeft : this.ctx.texts.feedback.eyeRight;
  }

  buildResult(sum: HessSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const f = texts.feedback;
    const calib = calibOf(this.ctx);
    const s = this.session;
    const secondary: Metric[] = [];
    if (sum.msMean !== null) secondary.push({ key: 'ms_mean', value: sum.msMean, unit: 'ms' });

    const passRows = (idx: number): ResultDetailRow[] => {
      const name = s.passName(idx);
      const n = s.passResults(name).length;
      if (!n) return [];
      const dev = idx === 0 ? sum.devA : sum.devB;
      const lens = anaLensName(texts, this.p.tones, s.targetColor(idx));
      const rows: ResultDetailRow[] = [];
      if (dev !== null) {
        rows.push({
          label: f.rowDev.replace('{pass}', name),
          value: f.devValue.replace('{v}', fmt.num(dev, 2)),
          text: f.devText.replace('{eye}', this.eyeName(s.fixEye(idx))).replace('{lens}', lens).replace('{n}', String(n)),
        });
      }
      const area = idx === 0 ? sum.areaA : sum.areaB;
      if (area !== null) rows.push({ label: f.rowArea.replace('{pass}', name), value: f.areaValue.replace('{v}', fmt.num(area, 0)), text: f.areaText });
      return rows;
    };
    const rows: ResultDetailRow[] = [...passRows(0), ...passRows(1)];
    if (sum.areaRatio !== null) rows.push({ label: f.rowRatio, value: f.ratioValue.replace('{v}', fmt.num(sum.areaRatio, 2)) });
    const details: ResultDetailTable[] = [{ title: f.valuesTitle, rows, note: sum.placed < 16 ? `${f.valuesNote} ${f.fewNote}` : f.valuesNote }];

    const notes = [f.effText.replace('{d}', fmt.num(calib.viewDistanceCm, 0))];
    if (sum.clamped) notes.push(f.clamped.replace('{set}', fmt.num(this.p.maxDeg, 0)));
    if (!calib.calibrated) notes.push(f.notCalibrated);
    details.push({
      title: f.gridTitle,
      rows: [
        { label: f.rowEff, value: f.effValue.replace('{v}', fmt.num(sum.effDeg, 1)), text: notes.join(' · ') },
        { label: f.pointsRow, value: f.pointsValue.replace('{n}', String(s.perPass)).replace('{k}', String(sum.passesDone)) },
      ],
    });

    return {
      primary: { key: 'placed', value: sum.placed, unit: 'count', better: 'higher' },
      secondary,
      details,
      score: sum.placed,
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
    const ok = this.okRect(L);
    const s = this.session;
    const f = this.ctx.texts.feedback;
    if (s.state === 'placing') {
      const geo = this.geo(L);
      const t = s.current();
      if (t) {
        const tp = this.toPx(geo, t.x, t.y);
        const mp = this.toPx(geo, s.marker.x, s.marker.y);
        this.dot(g, tp.x, tp.y, calibOf(this.ctx).sizePx(this.p.targetCm) / 2, this.colorOf(s.targetColor()));
        this.dot(g, mp.x, mp.y, calibOf(this.ctx).sizePx(this.p.markerCm) / 2, this.colorOf(s.markerColor()));
      }
      drawHint(g, this.ctx.stage, L, f.hintPlace.replace('{pass}', s.passName()));
      drawBtn(g, ok, f.ok, { primary: true, disabled: !s.moved });
    } else {
      this.drawChart(g, L);
      drawBtn(g, ok, f.next, { primary: true });
    }
  }

  private colorOf(c: AnaColor): string {
    return c === 'a' ? this.css.a : this.css.b;
  }

  private dot(g: CanvasRenderingContext2D, x: number, y: number, r: number, color: string): void {
    withAnaColor(g, color, () => {
      g.beginPath();
      g.arc(x, y, Math.max(2, r), 0, Math.PI * 2);
      g.fill();
    });
  }

  /** Karte: Sollumriss (grau), Durchgang A (durchgezogen, Kreise), Durchgang B (gestrichelt, Quadrate) */
  private drawChart(g: CanvasRenderingContext2D, L: PruefLayout): void {
    const s = this.session;
    const geo = this.geo(L);
    drawHint(g, this.ctx.stage, L, this.ctx.texts.feedback.chartHint);
    const edge = s.edgeDeg;
    const nominal = s.points.filter((q) => Math.max(Math.abs(q.hx), Math.abs(q.vy)) >= edge - 0.05).sort((a, b) => Math.atan2(a.vy, a.hx) - Math.atan2(b.vy, b.hx));
    g.save();
    for (const q of s.points) {
      const p = this.toPx(geo, q.x, q.y);
      g.fillStyle = GREY;
      g.beginPath();
      g.arc(p.x, p.y, 3, 0, Math.PI * 2);
      g.fill();
    }
    g.strokeStyle = GREY;
    g.lineWidth = 2;
    g.beginPath();
    nominal.forEach((q, i) => {
      const p = this.toPx(geo, q.x, q.y);
      if (i) g.lineTo(p.x, p.y);
      else g.moveTo(p.x, p.y);
    });
    g.closePath();
    g.stroke();
    (['A', 'B'] as const).slice(0, s.nPasses).forEach((name) => {
      const color = name === 'A' ? CHART_A : CHART_B;
      const b = s.boundary(name);
      g.strokeStyle = color;
      g.fillStyle = color;
      g.lineWidth = 3;
      g.setLineDash(name === 'A' ? [] : [9, 6]);
      g.beginPath();
      b.forEach((r, i) => {
        const p = this.toPx(geo, r.mx, r.my);
        if (i) g.lineTo(p.x, p.y);
        else g.moveTo(p.x, p.y);
      });
      if (b.length > 2) g.closePath();
      g.stroke();
      g.setLineDash([]);
      for (const r of s.passResults(name)) {
        const p = this.toPx(geo, r.mx, r.my);
        if (name === 'A') {
          g.beginPath();
          g.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
          g.fill();
        } else g.fillRect(p.x - 4, p.y - 4, 8, 8);
      }
    });
    g.restore();
  }
}

/** Prüfbild im Intro: siehe `_shared/pruefung-anaglyph.ts` */
function colorCheck(params: ExerciseParams, tx: ExerciseTexts) {
  return anaColorCheck(params, tx, PARAMS);
}

export const laborHess: ExerciseDefinition = {
  id: 'labor-hess',
  category: 'wahrnehmung',
  minutes: 5,
  color: '#8C6D4A',
  icon:
    '<rect x="6" y="6" width="36" height="36" rx="4" fill="none" stroke="currentColor" stroke-width="2.4" opacity=".5"/><g fill="currentColor"><circle cx="14" cy="14" r="2.6"/><circle cx="24" cy="14" r="2.6" opacity=".45"/><circle cx="34" cy="14" r="2.6"/><circle cx="14" cy="24" r="2.6" opacity=".45"/><circle cx="24" cy="24" r="3.4"/><circle cx="34" cy="24" r="2.6" opacity=".45"/><circle cx="14" cy="34" r="2.6"/><circle cx="24" cy="34" r="2.6" opacity=".45"/><circle cx="34" cy="34" r="2.6"/></g>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  colorCheck,
  create: (ctx) => new HessSchirm(ctx),
};
