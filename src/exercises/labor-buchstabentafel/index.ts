/**
 * Buchstabentafel (Labor) – eine Tafel aus Zeichengruppen wird Schritt für Schritt gelesen: Eine Marke zeigt das nächste
 * Zeichen, du liest es laut. Im eigenen Tempo tippst du (irgendwo), um weiterzugehen; im Takt springt die Marke von selbst.
 *
 * Portierung der Labor-Übung `chart` (Prototyp ex/chart.js): Größen und Abstände in cm (`ctx.calib`), Einstellungen
 * (`ctx.params`, siehe logic.ts `PARAMS`), reine Logik in logic.ts (`ChartSession`, `layoutChart`).
 *
 * - Hauptwert: Gesamtzeit (`total`, niedriger = schneller). Im Takt steht sie durch Zeichenzahl und Takt fest (keine
 *   Leistung); dort ist sie nur zum Vergleich bei gleichem Takt da (Variantenschlüssel enthält Tempo und Takt).
 * - Tafel passt in die Bühne: reicht der Platz nicht, wird sie verkleinert (Hinweis unten und im Ergebnis).
 * - Marke: heller Kasten hinter dem Zeichen mit dunkler Schrift (Form + Kontrast, nicht nur Farbe); gelesene Zeichen werden
 *   blass. Die Marke wechselt weich (≈ 130 ms), es gibt kein Blinken im Takt (höchstens 140 Schläge pro Minute ≈ 2,3 Wechsel
 *   pro Sekunde). Takt = Ton (`ctx.sfx.beat`, wenn „Ton“ an ist) und der Markenwechsel selbst.
 * - Gelesen wird nur über Tippen bzw. Takt „geprüft“: ob wirklich jedes Zeichen gelesen wurde, wohin du schaust und ob du laut
 *   liest, kann die App nicht messen.
 * - Im eigenen Tempo zählt jeder Tipp auf der Bühne (auch ohne Treffer auf ein Zeichen); Tipps im Abstand unter 340 ms gelten als
 *   Doppeltipp und werden ignoriert. Leertaste/Eingabetaste gehen ebenfalls.
 */
import { background, fillRR, text } from '../../core/draw';
import { calibOf } from '../../core/calib';
import { paramsOf } from '../../core/params';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, Metric, PointerInfo, ResultDetailRow } from '../../core/types';
import { handSize, playField, restPoint } from '../_shared/tippziele';
import {
  type ChartLayout,
  type ChartParams,
  chartParams,
  ChartSession,
  type ChartSummary,
  layoutChart,
  PARAMS,
  pointsFor,
  QUICK_COLS,
  QUICK_GROUP_SIZE,
  QUICK_ROWS,
  tipFor,
} from './logic';
import { de, it } from './texts';

const FADE_MS = 130;
/** Zeit vor dem Takt (Spielmodus): Hinweis lesen, ankommen */
const LEAD_MS = 1200;
const LIGHT: Rgb = [232, 238, 247];
const DIM: Rgb = [100, 112, 132];
const DARK: Rgb = [11, 20, 36];
const MARK_BG = '#F2F5F7';

// Intro-Film: kleine Tafel im eigenen Tempo, die Hand tippt in Ruhe
const DEMO_PARAMS: Partial<ChartParams> = {
  rows: 2,
  cols: 3,
  groupSize: 2,
  symbols: 'letters',
  sizeCm: 1.8,
  letterGapCm: 0.4,
  groupGapCm: 1.6,
  order: 'groups',
  pace: 'self',
  sound: 'no',
};
const DEMO_FIRST_TAP_MS = 1500;
const DEMO_STEP_MS = 700;
const DEMO_END_MS = 900;

type Rgb = readonly [number, number, number];

const mix = (a: Rgb, b: Rgb, k: number): string => `rgb(${Math.round(a[0] + (b[0] - a[0]) * k)},${Math.round(a[1] + (b[1] - a[1]) * k)},${Math.round(a[2] + (b[2] - a[2]) * k)})`;

class Buchstabentafel implements Exercise {
  private readonly demo: boolean;
  private readonly p: ChartParams;
  private readonly session: ChartSession;
  private readonly stepOf: Int32Array;
  private layout!: ChartLayout;
  private layoutFor = '';
  private startAt = 0;
  private started = false;
  private done = false;
  private endAt = Infinity;
  private changedAt = -1e9;
  /** Schritt, dessen Marke gerade ausblendet (−1 = keiner) */
  private markPrev = -1;
  private nextTapAt = 0;
  private tapNr = 0;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = chartParams(paramsOf(ctx, PARAMS));
    this.p = this.demo
      ? { ...base, ...DEMO_PARAMS }
      : ctx.quick
        ? { ...base, rows: Math.min(base.rows, QUICK_ROWS), cols: Math.min(base.cols, QUICK_COLS), groupSize: Math.min(base.groupSize, QUICK_GROUP_SIZE) }
        : base;
    this.session = new ChartSession(this.p, { rng: ctx.rng });
    this.stepOf = new Int32Array(this.p.rows * this.p.cols * this.p.groupSize).fill(-1);
    this.session.steps.forEach((s, i) => {
      this.stepOf[s.g * this.p.groupSize + s.k] = i;
    });
  }

  // --- Geometrie: immer live aus der Bühne ---

  /** Spielfeld in Bühnenpixeln: ganze Bühne, im Intro-Film oberhalb von Hand und Bildunterschrift */
  private field(): { x: number; y: number; w: number; h: number } {
    const s = this.ctx.stage;
    return this.demo ? playField(s, true) : { x: 0, y: 0, w: s.w, h: s.h };
  }

  private ppc(): number {
    return calibOf(this.ctx).pxPerCm;
  }

  /** Zeichenort: Layout (cm, auf Feld und Größe der Bühne gerechnet), nur bei geänderter Bühne neu */
  private lay(): ChartLayout {
    const f = this.field();
    const k = this.ppc();
    const sizeCm = calibOf(this.ctx).fitCm(this.p.sizeCm);
    const key = `${Math.round(f.w)}x${Math.round(f.h)}@${k}:${sizeCm}`;
    if (key !== this.layoutFor) {
      this.layoutFor = key;
      this.layout = layoutChart({ ...this.p, sizeCm }, f.w / k, f.h / k);
    }
    return this.layout;
  }

  resize(): void {
    this.layoutFor = '';
    this.lay();
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    this.startAt = t + (this.p.pace === 'beat' ? LEAD_MS : 0);
    this.nextTapAt = t + (this.demo ? DEMO_FIRST_TAP_MS : 900);
    this.lay();
    hud.setProgress(0);
    hud.setScore(null);
    hud.setLabel(this.demo ? null : this.progressLabel());
    if (this.ctx.autoplay && this.p.pace === 'self') {
      const r = this.demo ? restPoint(this.ctx.stage) : this.restPos();
      ghost.moveTo(r.x, r.y, { move: 0 });
    }
    if (this.demo) hud.caption(texts.captions.wait);
  }

  private restPos(): { x: number; y: number } {
    const st = this.ctx.stage;
    const hs = handSize(st);
    return { x: st.w - hs * 0.75, y: st.h - hs * 0.7 };
  }

  private progressLabel(): string {
    return this.ctx.texts.feedback.progress.replace('{a}', String(this.session.doneCount())).replace('{b}', String(this.session.steps.length));
  }

  update(_dt: number, t: number): void {
    if (this.done) return;
    const s = this.session;
    if (this.p.pace === 'beat') {
      if (!this.started && t >= this.startAt) {
        this.started = true;
        s.start(t);
      }
      const before = s.pos;
      if (this.started && s.update(t)) {
        this.changedAt = t;
        this.markPrev = before;
        if (this.p.sound === 'yes') this.ctx.sfx.beat?.();
        this.afterChange();
      }
    }
    if (this.ctx.autoplay && this.p.pace === 'self') this.autoTap(t);
    this.ctx.hud.setProgress(s.progress());
    if (!this.demo) this.ctx.hud.setLabel(this.progressLabel());
    if (s.finished && this.endAt === Infinity) {
      if (this.demo) this.endAt = t + DEMO_END_MS;
      else this.finishSession();
    }
    if (this.demo && t >= this.endAt) this.finishSession();
  }

  // --- Eingabe ---

  pointerDown(p: PointerInfo): void {
    this.tap(p.t);
  }

  keyDown(key: string, t: number): void {
    if (key === ' ' || key === 'Enter') this.tap(t);
  }

  private tap(t: number): void {
    if (this.done || this.p.pace !== 'self') return;
    const before = this.session.pos;
    const res = this.session.advance(t);
    if (!res || res.type === 'ignored') return;
    this.changedAt = t;
    this.markPrev = before;
    if (this.p.sound === 'yes' && !this.demo) this.ctx.sfx.tap();
    this.tapNr++;
    this.afterChange();
  }

  /** Bildunterschriften des Films nach jedem Markenwechsel */
  private afterChange(): void {
    if (!this.demo) return;
    const { hud, texts } = this.ctx;
    const n = this.session.doneCount();
    if (n === 0) hud.caption(texts.captions.read);
    if (n === 2) hud.caption(texts.captions.next);
    if (n === 7) hud.caption(texts.captions.count);
  }

  /** Autoplay (Film und Tests, eigenes Tempo): die Hand tippt in Ruhe immer an derselben Stelle */
  private autoTap(t: number): void {
    const { ghost, rng } = this.ctx;
    if (this.session.finished || t < this.nextTapAt || !ghost.idle) return;
    const r = this.demo ? restPoint(this.ctx.stage) : this.restPos();
    ghost.tap(r.x, r.y, { move: this.tapNr === 0 ? 350 : 0 });
    this.nextTapAt = t + (this.demo ? DEMO_STEP_MS : rng.chance(0.12) ? rng.range(1000, 1500) : rng.range(450, 800));
  }

  // --- Ende ---

  private finishSession(): void {
    if (this.done) return;
    this.done = true;
    const { hud, sfx } = this.ctx;
    hud.setProgress(1);
    hud.caption(null);
    const sum = this.session.summary();
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'total', value: sum.totalMs ?? 0, unit: 'time', better: 'lower' },
        secondary: [{ key: 'symbols', value: sum.symbols, unit: 'count' }],
        score: 0,
        level: 1,
      });
      return;
    }
    if (this.p.sound === 'yes') sfx.done();
    this.ctx.finish(this.buildResult(sum));
  }

  private buildResult(sum: ChartSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const n = (v: number) => fmt.num(v);
    const secondary: Metric[] = [];
    const rows: ResultDetailRow[] = [];
    if (sum.self) {
      if (sum.perMin !== null) secondary.push({ key: 'per_min', value: sum.perMin, unit: 'count' });
      if (sum.stepMean !== null) secondary.push({ key: 'step_mean', value: sum.stepMean, unit: 'ms' });
      if (sum.stepCv !== null) secondary.push({ key: 'step_cv', value: sum.stepCv, unit: 'percent' });
      if (secondary.length < 2) secondary.push({ key: 'symbols', value: sum.symbols, unit: 'count' });
      rows.push({ label: texts.metrics.symbols, value: n(sum.symbols) });
      if (sum.stepSd !== null) rows.push({ label: texts.metrics.step_sd, value: fmt.ms(sum.stepSd) });
    } else {
      secondary.push({ key: 'symbols', value: sum.symbols, unit: 'count' }, { key: 'bpm', value: sum.bpm ?? this.p.bpm, unit: 'count' });
    }
    const lay = this.lay();
    if (!lay.fits) rows.push({ label: texts.metrics.scale, value: fmt.pct(lay.scale * 100) });
    return {
      primary: { key: 'total', value: sum.totalMs ?? 0, unit: 'time', better: 'lower' },
      secondary,
      ...(rows.length ? { details: [{ title: texts.feedback.moreTitle, rows, note: texts.feedback.moreNote }] } : {}),
      score: pointsFor(sum.symbols),
      level: 1,
      tip: tipFor(sum),
    };
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr, u } = this.ctx.stage;
    background(g, w, h, dpr);
    const lay = this.lay();
    const f = this.field();
    const k = this.ppc();
    const s = this.session;
    const sizePx = Math.max(6, calibOf(this.ctx).fitCm(this.p.sizeCm) * lay.scale * k);
    const fontPx = Math.max(10, sizePx / 0.72);
    // Marke: das neue Zeichen blendet ein, das vorige aus (weicher Wechsel, kein Blinken)
    const fade = easeOut(clamp((t - this.changedAt) / FADE_MS, 0, 1));
    const cur = s.pos;
    const hlAt = (step: number): number => {
      if (step < 0) return 0;
      if (step === cur) return fade;
      if (step === this.markPrev) return 1 - fade;
      return 0;
    };
    const boxW = fontPx * 0.95;
    const boxH = fontPx * 1.2;
    for (const l of lay.letters) {
      const step = this.stepOf[l.g * this.p.groupSize + l.k];
      const x = f.x + l.x * k;
      const y = f.y + l.y * k;
      const hl = hlAt(step);
      const done = step >= 0 && step < cur;
      if (hl > 0.01) {
        g.save();
        g.globalAlpha = hl;
        fillRR(g, x - boxW / 2, y - boxH / 2, boxW, boxH, Math.min(10, boxW * 0.2), MARK_BG);
        g.restore();
      }
      const base = done ? DIM : LIGHT;
      text(g, s.groups[l.g][l.k], x, y, fontPx, mix(base, DARK, hl), { weight: 800, baseline: 'middle' });
    }
    const size = clamp(u * 3.4, 13, 22);
    const hint = this.hint(lay);
    if (hint) text(g, hint, w / 2, h - Math.max(14, u * 2.6) - size * 0.4, size, '#B7C4D8', { weight: 700 });
  }

  /** Hinweiszeile unten: Start, Verkleinerung */
  private hint(lay: ChartLayout): string {
    const fb = this.ctx.texts.feedback;
    if (this.demo) return '';
    if (this.p.pace === 'self' && this.session.pos === -1) return fb.startSelf;
    if (this.p.pace === 'beat' && this.session.pos === -1) return fb.ready;
    if (!lay.fits) return fb.shrunk.replace('{p}', String(Math.round(lay.scale * 100)));
    return '';
  }
}

export const laborBuchstabentafel: ExerciseDefinition = {
  id: 'labor-buchstabentafel',
  category: 'bewegung',
  minutes: 2,
  color: '#2E6DB4',
  icon:
    '<rect x="6" y="6" width="36" height="36" rx="5" fill="none" stroke="currentColor" stroke-width="2.6" opacity=".45"/><rect x="11" y="11" width="10" height="10" rx="2.5" fill="currentColor"/><rect x="27" y="11" width="10" height="10" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.4"/><rect x="11" y="27" width="10" height="10" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.4"/><rect x="27" y="27" width="10" height="10" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.4"/>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  create: (ctx) => new Buchstabentafel(ctx),
};
