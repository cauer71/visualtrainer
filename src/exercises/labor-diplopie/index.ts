/**
 * Diplopie-Karte (Labor) – Funktionsübung nach dem Prinzip einer Karte der Blickrichtungen mit Rot-Grün-Brille.
 *
 * In neun Blickrichtungen (Mitte und acht Randpunkte, auf eine ebene Fläche projiziert, Abstand aus der Kalibrierung) sieht ein
 * Auge ein rotes Ziel, das andere ein Ziel in der zweiten Farbe. Du sagst „Ein Bild“ oder „Zwei Bilder“; bei zwei Bildern
 * schiebst du das zweite auf das erste (ziehen oder tippen) und bestätigst mit „Deckungsgleich“. Am Ende zeigt eine Karte alle
 * Richtungen. Reine Logik in logic.ts (`DiplopiaSession`).
 *
 * - Hauptwert: geprüfte Blickrichtungen (`positions`, Zahl der Eingaben, keine Leistung). Die Verschiebung in Prismendioptrien Δ
 *   steht als Übungswert in den Detailtabellen (nur Beschreibung der Verschiebung), ohne Deutung und ohne Richtwerte.
 * - Schwarzer Grund, additive Farben, Bedienung neutral hellgrau; ruhig, kein Flackern, keine Blitze. Die Karte unterscheidet
 *   „ein Bild“ und „zwei Bilder“ durch Form (Kreis/Quadrat) und Linie, nicht nur durch Farbe.
 * - Gemessen wird nur, was du eingibst – nicht, ob du die Brille trägst oder wohin du schaust.
 */
import { calibOf } from '../../core/calib';
import { hit, type Rect } from '../../core/draw';
import { paramsOf } from '../../core/params';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseParams, ExerciseResult, ExerciseTexts, Metric, PointerInfo, ResultDetailRow, ResultDetailTable } from '../../core/types';
import { anaColorCheck, anaCss, withAnaColor, type AnaCss } from '../_shared/pruefung-anaglyph';
import { drawBtn, drawHint, pruefLayout, splitRow, type PruefLayout } from '../_shared/pruefung-ui';
import { restPoint } from '../_shared/tippziele';
import { directionKey, DiplopiaSession, diplopiaParams, PARAMS, QUICK_POSITIONS, tipFor, type DiplopiaParams, type DiplopiaResult, type DiplopiaSummary } from './logic';
import { de, it } from './texts';

const BLACK = '#000000';
const LEAD_MS = 500;
const DEMO_START_MS = 1300;
const DEMO_POSITIONS = 2;
const GREY = 'rgba(160,170,185,0.9)';
const MARK = '#E8EEF7';
// Intro-Film: zwei Richtungen (die erste „ein Bild“, die zweite „zwei Bilder“ mit Ausgleich), größere Ziele
const DEMO_PARAMS: Partial<DiplopiaParams> = { gazeDeg: 15, targetCm: 1.2, leftLens: 'red', tones: 'redgreen', redLevel: 100, secondLevel: 100 };

interface Geo {
  cx: number;
  cy: number;
  unit: number;
  field: Rect;
  pad: number;
}

class DiplopieKarte implements Exercise {
  private readonly demo: boolean;
  private readonly p: DiplopiaParams;
  private readonly css: AnaCss;
  private readonly session: DiplopiaSession;
  private readonly ext: { x: number; y: number };
  private started = false;
  private startAt = 0;
  private done = false;
  private dragging = false;
  private queued = false;
  private lastCaption = '';
  private lastK = -1;
  private chartShown = false;
  /** Autoplay: ob die Hand für die laufende Richtung „zwei Bilder“ meldet */
  private autoDouble = false;
  private autoFor = -1;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = diplopiaParams(paramsOf(ctx, PARAMS));
    this.p = this.demo ? { ...base, ...DEMO_PARAMS } : base;
    this.css = anaCss(this.p);
    const calib = calibOf(ctx);
    const L = pruefLayout(ctx.stage, this.demo, 1);
    this.session = new DiplopiaSession(this.p, {
      rng: ctx.rng,
      wCm: L.field.w / calib.pxPerCm,
      hCm: L.field.h / calib.pxPerCm,
      distCm: calib.viewDistanceCm,
      maxPoints: this.demo ? DEMO_POSITIONS : ctx.quick ? QUICK_POSITIONS : undefined,
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
    const r = calib.sizePx(this.p.targetCm) / 2;
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

  /** Eine Taste (mittig) für „Deckungsgleich“ und „Weiter“ */
  private okRect(L: PruefLayout): Rect {
    const row = L.rows[0];
    const w = Math.min(row.w, 320);
    return { x: row.x + (row.w - w) / 2, y: row.y, w, h: row.h };
  }

  /** Zwei Tasten „Ein Bild“ und „Zwei Bilder“ */
  private askRects(L: PruefLayout): [Rect, Rect] {
    const row = L.rows[0];
    const w = Math.min(row.w, 640);
    const r: Rect = { x: row.x + (row.w - w) / 2, y: row.y, w, h: row.h };
    const [a, b] = splitRow(r, [1, 1], L.gap);
    return [a, b];
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
    return this.ctx.texts.feedback.progress.replace('{n}', String(Math.min(s.k + 1, s.total))).replace('{total}', String(s.total));
  }

  update(_dt: number, t: number): void {
    if (this.done) return;
    const s = this.session;
    if (!this.started) {
      if (t < this.startAt) return;
      this.started = true;
      s.start(t);
    }
    if (s.k !== this.lastK) {
      this.lastK = s.k;
      this.ctx.hud.setProgress(Math.min(1, s.k / s.total));
      if (!this.demo) this.ctx.hud.setLabel(this.label());
    }
    if (s.state === 'chart' && !this.chartShown) {
      this.chartShown = true;
      this.caption('chart');
    }
    if (this.ctx.autoplay) this.autoUpdate();
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
    if (s.state === 'ask') {
      const [a, b] = this.askRects(L);
      if (hit(a, p.x, p.y, this.pad(a))) this.single(p.t);
      else if (hit(b, p.x, p.y, this.pad(b))) this.double();
      return;
    }
    const ok = this.okRect(L);
    if (hit(ok, p.x, p.y, this.pad(ok))) {
      this.press(p.t);
      return;
    }
    if (s.state === 'align') {
      this.dragging = p.type !== 'ghost';
      this.placeAt(p.x, p.y);
    }
  }

  pointerMove(p: PointerInfo): void {
    if (this.dragging && this.session.state === 'align') this.placeAt(p.x, p.y);
  }

  pointerUp(): void {
    this.dragging = false;
  }

  keyDown(key: string, t: number): void {
    if (this.done || !this.started) return;
    const s = this.session;
    if (s.state === 'ask') {
      if (key === '1') this.single(t);
      else if (key === '2') this.double();
    } else if (key === 'Enter' || key === ' ') this.press(t);
  }

  private single(t: number): void {
    if (this.session.answerSingle(t)) this.ctx.sfx.tap();
  }

  private double(): void {
    if (this.session.answerDouble()) {
      this.ctx.sfx.tap();
      if (this.demo) this.caption('align');
    }
  }

  private placeAt(px: number, py: number): void {
    const q = this.fromPx(this.geo(this.layout()), px, py);
    this.session.place(q.x, q.y);
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

  private autoUpdate(): void {
    const { ghost, rng } = this.ctx;
    if (this.queued || !ghost.idle || !this.started) return;
    const s = this.session;
    const L = this.layout();
    const ok = this.okRect(L);
    const quick = this.ctx.quick;
    const delay = this.demo ? 700 : quick ? rng.range(40, 120) : rng.range(250, 600);
    const move = this.demo ? 480 : quick ? 180 : rng.range(240, 380);
    if (s.state === 'ask') {
      if (this.autoFor !== s.k) {
        this.autoFor = s.k;
        // Film: die erste Richtung „ein Bild“, die zweite „zwei Bilder“; sonst meldet die Hand gelegentlich zwei Bilder
        this.autoDouble = this.demo ? s.k === 1 : rng.chance(0.35);
      }
      const [a, b] = this.askRects(L);
      const r = this.autoDouble ? b : a;
      this.queued = true;
      if (this.demo && s.k === 1) this.caption('double');
      ghost.tap(r.x + r.w / 2, r.y + r.h / 2, { delay: this.demo ? 1500 : delay, move });
    } else if (s.state === 'align') {
      this.queued = true;
      if (!s.moved) {
        const t = s.current()!;
        const g = this.geo(L);
        // das zweite Bild liegt etwa 1 bis 3 Δ neben dem ersten (Δ → cm über den Abstand)
        const off = (this.demo ? 0.9 : rng.range(0.3, 1.4)) * (rng.chance(0.5) ? 1 : -1);
        const px = this.toPx(g, t.x + off, t.y + (this.demo ? 0.3 : rng.range(-0.5, 0.5)));
        ghost.tap(clamp(px.x, g.field.x + g.pad, g.field.x + g.field.w - g.pad), clamp(px.y, g.field.y + g.pad, g.field.y + g.field.h - g.pad), { delay: this.demo ? 600 : delay, move });
      } else ghost.tap(ok.x + ok.w / 2, ok.y + ok.h / 2, { delay: this.demo ? 500 : delay, move });
    } else if (s.state === 'chart') {
      this.queued = true;
      if (this.demo) this.caption('done');
      ghost.tap(ok.x + ok.w / 2, ok.y + ok.h / 2, { delay: this.demo ? 1500 : 300, move });
    }
  }

  // --- Ende ---

  private finishSession(): void {
    if (this.done) return;
    this.done = true;
    this.ctx.hud.setProgress(1);
    const sum = this.session.summary();
    if (this.demo) {
      this.ctx.finish({ primary: { key: 'positions', value: sum.positions, unit: 'count', better: 'higher' }, secondary: [], score: 0, level: 1 });
      return;
    }
    this.ctx.sfx.done();
    this.ctx.finish(this.buildResult(sum));
  }

  private dirName(r: DiplopiaResult): string {
    const f = this.ctx.texts.feedback;
    const d = directionKey(r.hDeg, r.vDeg);
    if (!d.v && !d.h) return f.dirCenter;
    const v = d.v === 'up' ? f.dirUp : d.v === 'down' ? f.dirDown : '';
    const h = d.h === 'left' ? f.dirLeft : d.h === 'right' ? f.dirRight : '';
    return [v, h].filter(Boolean).join(' ');
  }

  buildResult(sum: DiplopiaSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const f = texts.feedback;
    const calib = calibOf(this.ctx);
    const s = this.session;
    const secondary: Metric[] = [{ key: 'double', value: sum.doubleCount, unit: 'count' }];
    if (sum.msMean !== null) secondary.push({ key: 'ms_mean', value: sum.msMean, unit: 'ms' });

    const signed = (v: number): string => `${v > 0 ? '+' : v < 0 ? '−' : ''}${fmt.num(Math.abs(v), 1)}`;
    const rows: ResultDetailRow[] = [{ label: f.rowDouble, value: f.doubleValue.replace('{k}', String(sum.doubleCount)).replace('{n}', String(sum.positions)) }];
    if (sum.doublePct !== null) rows.push({ label: f.rowPct, value: f.pctValue.replace('{v}', fmt.num(sum.doublePct, 0)) });
    if (sum.sepMean !== null) rows.push({ label: f.rowMean, value: f.deltaValue.replace('{v}', fmt.num(sum.sepMean, 1)) });
    if (sum.sepMax !== null) rows.push({ label: f.rowMax, value: f.deltaValue.replace('{v}', fmt.num(sum.sepMax, 1)) });
    rows.push({ label: f.rowCenter, value: sum.centerDouble === null ? f.centerNone : sum.centerDouble ? f.centerYes : f.centerNo });
    const details: ResultDetailTable[] = [{ title: f.valuesTitle, rows, note: sum.positions < 5 ? `${f.valuesNote} ${f.fewNote}` : f.valuesNote }];

    // Karte der Richtungen als Tabelle (auch ohne Farbe lesbar): in der Reihenfolge des Rasters (oben links … unten rechts)
    const byId = [...s.results].sort((a, b) => a.id - b.id);
    details.push({
      title: f.mapTitle,
      rows: byId.map((r) => ({
        label: this.dirName(r),
        value: r.double ? f.mapDouble.replace('{h}', signed(r.sepHPd)).replace('{v}', signed(r.sepVPd)) : f.mapSingle,
      })),
      note: f.mapNote,
    });

    const notes = [f.effText.replace('{d}', fmt.num(calib.viewDistanceCm, 0))];
    if (sum.clamped) notes.push(f.clamped.replace('{set}', fmt.num(this.p.gazeDeg, 0)));
    if (!calib.calibrated) notes.push(f.notCalibrated);
    details.push({ title: f.gridTitle, rows: [{ label: f.rowEff, value: f.effValue.replace('{v}', fmt.num(sum.effDeg, 1)), text: notes.join(' · ') }] });

    return {
      primary: { key: 'positions', value: sum.positions, unit: 'count', better: 'higher' },
      secondary,
      details,
      score: sum.positions,
      level: 1,
      tip: tipFor(sum),
    };
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  private dot(g: CanvasRenderingContext2D, x: number, y: number, r: number, color: string): void {
    withAnaColor(g, color, () => {
      g.beginPath();
      g.arc(x, y, Math.max(2, r), 0, Math.PI * 2);
      g.fill();
    });
  }

  render(g: CanvasRenderingContext2D): void {
    const { w, h } = this.ctx.stage;
    g.fillStyle = BLACK;
    g.fillRect(0, 0, w, h);
    if (!this.started) return;
    const s = this.session;
    const L = this.layout();
    const f = this.ctx.texts.feedback;
    const geo = this.geo(L);
    const r = calibOf(this.ctx).sizePx(this.p.targetCm) / 2;
    if (s.state === 'ask') {
      const t = s.current()!;
      const tp = this.toPx(geo, t.x, t.y);
      this.dot(g, tp.x, tp.y, r, this.css.a);
      this.dot(g, tp.x, tp.y, r, this.css.b);
      drawHint(g, this.ctx.stage, L, f.ask);
      const [a, b] = this.askRects(L);
      drawBtn(g, a, f.single, { primary: true });
      drawBtn(g, b, f.double, { primary: true });
    } else if (s.state === 'align') {
      const t = s.current()!;
      const tp = this.toPx(geo, t.x, t.y);
      const mp = this.toPx(geo, s.marker.x, s.marker.y);
      this.dot(g, tp.x, tp.y, r, this.css.a);
      this.dot(g, mp.x, mp.y, r, this.css.b);
      drawHint(g, this.ctx.stage, L, f.alignHint);
      drawBtn(g, this.okRect(L), f.matched, { primary: true, disabled: !s.moved });
    } else {
      this.drawChart(g, L, geo);
      drawBtn(g, this.okRect(L), f.next, { primary: true });
    }
  }

  /** Karte: Kreis = ein Bild gemeldet, Quadrat = zwei Bilder (Linie bis zur Lage des zweiten Bildes, kleiner Kreis dort) */
  private drawChart(g: CanvasRenderingContext2D, L: PruefLayout, geo: Geo): void {
    drawHint(g, this.ctx.stage, L, this.ctx.texts.feedback.chartHint);
    g.save();
    for (const q of this.session.points) {
      const p = this.toPx(geo, q.x, q.y);
      g.fillStyle = GREY;
      g.beginPath();
      g.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
      g.fill();
    }
    for (const r of this.session.results) {
      const p = this.toPx(geo, r.tx, r.ty);
      g.fillStyle = MARK;
      g.strokeStyle = MARK;
      g.lineWidth = 2.5;
      if (r.double) {
        const q = this.toPx(geo, r.mx, r.my);
        g.beginPath();
        g.moveTo(p.x, p.y);
        g.lineTo(q.x, q.y);
        g.stroke();
        g.beginPath();
        g.arc(q.x, q.y, 4, 0, Math.PI * 2);
        g.stroke();
        g.fillRect(p.x - 9, p.y - 9, 18, 18);
      } else {
        g.beginPath();
        g.arc(p.x, p.y, 9, 0, Math.PI * 2);
        g.fill();
      }
    }
    g.restore();
  }
}

function colorCheck(params: ExerciseParams, tx: ExerciseTexts) {
  return anaColorCheck(params, tx, PARAMS);
}

export const laborDiplopie: ExerciseDefinition = {
  id: 'labor-diplopie',
  category: 'wahrnehmung',
  minutes: 4,
  color: '#8C6D4A',
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="2.4"><rect x="6" y="6" width="36" height="36" rx="4" opacity=".4"/></g><g fill="currentColor"><circle cx="20" cy="24" r="6"/><circle cx="29" cy="24" r="6" opacity=".45"/></g>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  colorCheck,
  create: (ctx) => new DiplopieKarte(ctx),
};
