/**
 * Takt-Sakkaden (Labor) – ein Zeichen springt im Takt eines Metronoms zwischen festen Punkten; du liest es laut vor.
 * Optional tippst du das Zeichen im Takt an.
 *
 * Portierung der Labor-Übung `saccade` (Prototyp ex/saccade.js): Größen in cm (`ctx.calib`), Einstellungen
 * (`ctx.params`, siehe logic.ts `PARAMS`), reine Logik in logic.ts (`BeatSession`).
 *
 * - Hauptwert: ohne Berührung die Zahl der gezeigten Zeichen (`beats`, steht durch Dauer × Takt fest – keine Leistung),
 *   mit Berührung die Trefferquote (`accuracy`, höher = besser). Keine Stufen (`level` = 1). Abweichung vom Prototyp:
 *   dort ist `beats` immer `headline[0]`.
 * - Takt = Ton (`ctx.sfx.beat`, nur wenn „Metronom-Ton“ an ist und der Ton der App an ist) und der Zeichenwechsel selbst.
 *   Es gibt KEIN Blinken im Takt: Das alte Zeichen blendet in ≈ 130 ms aus, das neue ein; höchstens 140 Schläge pro Minute
 *   (≈ 2,3 Wechsel pro Sekunde, unter 2,5 Hz); kleine Fläche (ein Zeichen), kein Vollflächeneffekt.
 * - Weiche Rückmeldung nur im Berührungsmodus: ✓ am getroffenen Zeichen, ✗ am Fehltipp, verpasste Zeichen lösen sich als
 *   gestrichelter Ring auf; kein Blitz.
 * - Gemessen wird nur dein Tippen, nicht dein Blick und nicht dein lautes Lesen. Die Schläge sind im Takt geplant, erscheinen
 *   und tönen aber im nächsten Bild (bis ≈ 17 ms später bei 60 Hz).
 */
import { background, circle, ring, text } from '../../core/draw';
import { calibOf } from '../../core/calib';
import { paramsOf } from '../../core/params';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, Metric, PointerInfo, ResultDetailRow } from '../../core/types';
import { playField, restPoint } from '../_shared/tippziele';
import { drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import {
  type BeatEvent,
  type BeatParams,
  beatParams,
  BeatSession,
  type BeatSummary,
  MIN_HIT_PX,
  PARAMS,
  pointsFor,
  QUICK_DURATION_S,
  tipFor,
} from './logic';
import { de, it } from './texts';

/** Zeit vor dem Start des Takts (Spielmodus): Hinweis lesen, ankommen */
const LEAD_MS = 1200;
const FADE_MS = 130;
const CHECK_MS = 520;
const CROSS_MS = 650;
const GONE_MS = 350;
const SYMBOL_COLOR = '#F2F5F7';
const DOT_COLOR = 'rgba(232,238,247,0.16)';

// Intro-Film: ruhiger Takt, vier Ecken, mit Berührung (die Hand zeigt das Antippen), ein Zeichen wird ausgelassen
const DEMO_PARAMS: Partial<BeatParams> = { bpm: 60, durationS: 8, sizeCm: 2.5, pattern: 'corners4', order: 'cycle', symbols: 'digits', touch: 'yes', sound: 'no' };
/** Nummer (ab 0) des Schlags, den die Hand im Film auslässt */
const DEMO_MISS_INDEX = 3;

interface Mark {
  x: number;
  y: number;
  t0: number;
}

interface Shown {
  point: number;
  symbol: string;
  at: number;
}

class TaktSakkaden implements Exercise {
  private readonly demo: boolean;
  private readonly p: BeatParams;
  private readonly session: BeatSession;
  private startAt = 0;
  private started = false;
  private done = false;
  private shown: Shown | null = null;
  private prev: Shown | null = null;
  private seenTrials = 0;
  private hitCount = 0;
  private checks: Mark[] = [];
  private crosses: Mark[] = [];
  private gone: Mark[] = [];

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = beatParams(paramsOf(ctx, PARAMS));
    this.p = this.demo ? { ...base, ...DEMO_PARAMS } : ctx.quick ? { ...base, durationS: Math.min(base.durationS, QUICK_DURATION_S) } : base;
    const f = this.field();
    const ppc = this.ppc();
    this.session = new BeatSession(
      { ...this.p, sizeCm: this.sizeCm() },
      { rng: ctx.rng, fieldWcm: f.w / ppc, fieldHcm: f.h / ppc, minHitRadiusCm: MIN_HIT_PX / ppc, cmToDeg: (cm) => calibOf(ctx).cmToDeg(cm) },
    );
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

  /** Zeichenhöhe in cm, auf die Bühne begrenzt */
  private sizeCm(): number {
    return calibOf(this.ctx).fitCm(this.p.sizeCm);
  }

  private pointPx(i: number): { x: number; y: number } {
    const f = this.field();
    const k = this.ppc();
    const pt = this.session.points[i] ?? this.session.points[0];
    return { x: f.x + pt.x * k, y: f.y + pt.y * k };
  }

  resize(): void {
    const f = this.field();
    const k = this.ppc();
    this.session.setField(f.w / k, f.h / k, this.sizeCm());
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    this.startAt = t + LEAD_MS;
    hud.setProgress(0);
    hud.setScore(this.demo || this.p.touch !== 'yes' ? null : 0);
    hud.setLabel(this.demo ? null : this.beatsLabel());
    if (this.demo) {
      const r = restPoint(this.ctx.stage);
      ghost.moveTo(r.x, r.y, { move: 0 });
      hud.caption(texts.captions.wait);
    }
  }

  private beatsLabel(): string {
    return this.ctx.texts.feedback.beatsLeft.replace('{n}', String(this.session.remainingBeats()));
  }

  update(_dt: number, t: number): void {
    if (this.done) return;
    const s = this.session;
    if (!this.started) {
      if (t < this.startAt) return;
      this.started = true;
      s.start(t);
    }
    const events = s.update(t);
    for (const ev of events) this.onBeat(ev, t);
    this.noticeTrials(t);
    this.updateHud();
    if (s.finished) this.finishSession();
    this.prune(t);
  }

  private onBeat(ev: BeatEvent, t: number): void {
    const { sfx } = this.ctx;
    this.prev = this.shown;
    // die Blende beginnt in dem Bild, in dem das Zeichen zum ersten Mal gezeichnet wird
    this.shown = { point: ev.point, symbol: ev.symbol, at: t };
    if (this.p.sound === 'yes') sfx.beat?.();
    if (this.demo) this.demoBeat(ev);
    else if (this.ctx.autoplay && this.p.touch === 'yes') this.autoBeat(ev);
  }

  /** Verpasste Zeichen bemerken (Auflösen als Ring, nur im Berührungsmodus) */
  private noticeTrials(t: number): void {
    const s = this.session;
    while (this.seenTrials < s.trials.length) {
      const tr = s.trials[this.seenTrials++];
      if (this.p.touch !== 'yes' || tr.touched) continue;
      const f = this.field();
      const k = this.ppc();
      this.gone.push({ x: f.x + tr.xCm * k, y: f.y + tr.yCm * k, t0: t });
    }
  }

  private updateHud(): void {
    const { hud } = this.ctx;
    hud.setProgress(this.session.progress());
    if (this.demo) return;
    hud.setLabel(this.beatsLabel());
    if (this.p.touch === 'yes') hud.setScore(this.hitCount);
  }

  // --- Eingabe ---

  pointerDown(p: PointerInfo): void {
    if (this.done || !this.started || this.p.touch !== 'yes') return;
    const f = this.field();
    const k = this.ppc();
    const res = this.session.tap((p.x - f.x) / k, (p.y - f.y) / k, p.t);
    if (!res || res.type === 'ignored') return;
    if (res.type === 'hit') {
      this.hitCount++;
      const c = this.pointPx(res.event.point);
      this.checks.push({ x: c.x, y: c.y, t0: p.t });
    } else {
      this.crosses.push({ x: p.x, y: p.y, t0: p.t });
    }
  }

  // --- Intro-Film ---

  private demoBeat(ev: BeatEvent): void {
    const { hud, ghost, texts, stage } = this.ctx;
    const c = this.pointPx(ev.point);
    if (ev.index === 0) hud.caption(texts.captions.jump);
    if (ev.index === 1) hud.caption(texts.captions.read);
    if (ev.index === 2) hud.caption(texts.captions.touch);
    if (ev.index === DEMO_MISS_INDEX) {
      // die Hand wartet am Rand – dieses Zeichen wird nicht erreicht
      const r = restPoint(stage);
      ghost.moveTo(r.x, r.y, { move: 500 });
      hud.caption(texts.captions.late);
      return;
    }
    if (ev.index === 6) hud.caption(texts.captions.count);
    ghost.tap(c.x, c.y, { delay: 250, move: 450 });
  }

  /** Autoplay (Tests, Berührungsmodus): trifft meist mittig im Takt, selten daneben, selten gar nicht */
  private autoBeat(ev: BeatEvent): void {
    const { ghost, rng } = this.ctx;
    if (!ghost.idle) return;
    if (rng.chance(0.1)) return;
    const interval = this.session.interval;
    const latency = Math.min(rng.range(260, 560), interval * 0.8 - 20);
    if (latency < 110) return;
    const move = clamp(latency * 0.6, 80, 380);
    const delay = latency - move;
    const c = this.pointPx(ev.point);
    const rPx = (this.session.size * this.ppc()) / 2;
    const stray = rng.chance(0.06);
    const off = stray ? rPx * 3.2 : Math.min(rPx * 0.8, Math.abs(rng.normal()) * rPx * 0.3);
    const a = rng.range(0, Math.PI * 2);
    ghost.tap(c.x + Math.cos(a) * off, c.y + Math.sin(a) * off, { delay, move });
  }

  private prune(t: number): void {
    if (this.checks.length) this.checks = this.checks.filter((m) => t - m.t0 < CHECK_MS);
    if (this.crosses.length) this.crosses = this.crosses.filter((m) => t - m.t0 < CROSS_MS);
    if (this.gone.length) this.gone = this.gone.filter((m) => t - m.t0 < GONE_MS);
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
        primary: { key: 'accuracy', value: Math.round(sum.accuracy ?? 0), unit: 'percent', better: 'higher' },
        secondary: [{ key: 'beats', value: sum.beats, unit: 'count' }],
        score: 0,
        level: 1,
      });
      return;
    }
    if (this.p.sound === 'yes') sfx.done();
    this.ctx.finish(this.buildResult(sum));
  }

  private buildResult(sum: BeatSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const n = (v: number) => fmt.num(v);
    const rows: ResultDetailRow[] = [];
    let primary: ExerciseResult['primary'];
    const secondary: Metric[] = [];
    if (sum.touch && sum.accuracy !== null) {
      primary = { key: 'accuracy', value: sum.accuracy, unit: 'percent', better: 'higher' };
      secondary.push({ key: 'beats', value: sum.beats, unit: 'count' });
      if (sum.latMean !== null) secondary.push({ key: 'lat_mean', value: sum.latMean, unit: 'ms' });
      secondary.push({ key: 'stray', value: sum.stray, unit: 'count' });
      rows.push({ label: texts.metrics.hits, value: n(sum.hits) }, { label: texts.metrics.misses, value: n(sum.misses) });
      if (sum.latSd !== null) rows.push({ label: texts.metrics.lat_sd, value: fmt.ms(sum.latSd) });
      rows.push({ label: texts.metrics.bpm, value: n(sum.bpm) });
    } else {
      primary = { key: 'beats', value: sum.beats, unit: 'count', better: 'higher' };
      secondary.push({ key: 'bpm', value: sum.bpm, unit: 'count' }, { key: 'positions', value: sum.positions, unit: 'count' });
    }
    rows.push({ label: texts.metrics.amp_cm, value: `${fmt.num(sum.ampCm, 1)} ${texts.feedback.cm}` });
    if (sum.ampDeg !== null) rows.push({ label: texts.metrics.amp_deg, value: `${fmt.num(sum.ampDeg, 1)} °` });
    return {
      primary,
      secondary,
      details: [{ title: texts.feedback.moreTitle, rows, note: texts.feedback.moreNote }],
      score: pointsFor(sum),
      level: 1,
      tip: tipFor(sum),
    };
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr, u } = this.ctx.stage;
    background(g, w, h, dpr);
    const k = this.ppc();
    // Punkte des Musters (zeigen, wohin das Zeichen springen kann)
    for (let i = 0; i < this.session.points.length; i++) {
      const c = this.pointPx(i);
      circle(g, c.x, c.y, 4, DOT_COLOR);
    }
    // verpasste Zeichen lösen sich als Ring auf
    const rPx = (this.session.size * k) / 2;
    for (const m of this.gone) {
      g.save();
      g.globalAlpha = 0.6 * (1 - clamp((t - m.t0) / GONE_MS, 0, 1));
      ring(g, m.x, m.y, Math.max(8, rPx), '#FFFFFF', 2.5, [6, 6]);
      g.restore();
    }
    // Zeichen: das neue blendet ein, das alte gleichzeitig aus (weiche Übergänge, kein Blinken)
    if (this.started) {
      const cur = this.shown;
      const a = cur ? easeOut(clamp((t - cur.at) / FADE_MS, 0, 1)) : 0;
      const fontPx = Math.max(14, (this.session.size * k) / 0.72);
      if (this.prev && a < 1) this.drawSymbol(g, this.prev, 1 - a, fontPx);
      if (cur) this.drawSymbol(g, cur, a, fontPx);
      if (!cur) {
        const size = clamp(u * 3.6, 14, 24);
        text(g, this.ctx.texts.feedback.ready, w / 2, h / 2, size, '#B7C4D8', { weight: 700 });
      }
    }
    for (const m of this.checks) drawSoftCheck(g, m.x + rPx * 0.9, m.y - rPx * 0.9, clamp(rPx * 0.4, 9, 24), markAlpha(t - m.t0, CHECK_MS));
    const xs = clamp(u * 2.2, 10, 22);
    for (const m of this.crosses) drawSoftCross(g, m.x, m.y, xs, markAlpha(t - m.t0, CROSS_MS));
  }

  private drawSymbol(g: CanvasRenderingContext2D, s: Shown, alpha: number, fontPx: number): void {
    if (alpha <= 0.01) return;
    const c = this.pointPx(s.point);
    // Grundlinie so, dass die Großbuchstaben bzw. Ziffern (Höhe ≈ 0,72 × Schriftgröße) mittig auf dem Punkt stehen
    text(g, s.symbol, c.x, c.y + fontPx * 0.36, fontPx, SYMBOL_COLOR, { weight: 800, baseline: 'alphabetic', alpha });
  }
}

export const laborTaktSakkaden: ExerciseDefinition = {
  id: 'labor-takt-sakkaden',
  category: 'bewegung',
  minutes: 1,
  color: '#2E6DB4',
  icon:
    '<circle cx="11" cy="11" r="5" fill="currentColor"/><circle cx="37" cy="11" r="5" fill="none" stroke="currentColor" stroke-width="2.8" opacity=".6"/><circle cx="37" cy="37" r="5" fill="none" stroke="currentColor" stroke-width="2.8" opacity=".6"/><circle cx="11" cy="37" r="5" fill="none" stroke="currentColor" stroke-width="2.8" opacity=".6"/><path d="M18 11h13M37 18v13M30 37H18" stroke="currentColor" stroke-width="2.6" stroke-dasharray="3 4" stroke-linecap="round" fill="none"/>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  create: (ctx) => new TaktSakkaden(ctx),
};
