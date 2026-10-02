/**
 * Blitz-Erkennung (Labor) – Ziffern oder Buchstaben erscheinen für sehr kurze Zeit in der Mitte, danach tippst du sie
 * über ein Tastenfeld ein. Optional passt sich die Anzeigedauer an, bis zu einer Schwelle von etwa 71 % richtig.
 *
 * Portierung der Labor-Übung `flash` (Prototyp ex/flash.js): Einstellungen (`ctx.params`, siehe logic.ts `PARAMS`),
 * Zeichenhöhe in cm (`ctx.calib`), reine Logik in logic.ts (`FlashSession`).
 *
 * - Hauptwert: Anteil vollständig richtiger Durchgänge (`accuracy`, höher = besser). Bei „Dauer automatisch anpassen“
 *   ist diese Quote durch das Verfahren meist um 71 %; die Schwelle steht dann als erster Zusatzwert.
 * - Anzeigedauer in ganzen Bildern (Bilddauer aus den Bildzeiten gemessen, `_shared/labor-bilder.ts`); die tatsächlich
 *   gemessene Dauer steht im Ergebnis. Auf Bildschirmen ist die Dauer auf ganze Bilder gerundet (60 Hz ≈ 17 ms).
 * - Blinkregel: höchstens eine Darbietung pro Sekunde (Kreuz ≥ 700 ms, Rückmeldung 500 ms); gedämpftes Hellgrau statt
 *   Weiß, Maske in mittleren Grautönen und weich ausgeblendet, kleine Fläche (nur die Zeichenzeile), keine Vollflächen-
 *   effekte, kein Rot; im Intro `warning: 'flicker'` und ein eigener Hinweis in „Gut zu wissen“.
 * - Rückmeldung mit ✓/✗ und Text, nie nur Farbe. Gemessen wird nur, was du eintippst – nicht dein Blick.
 */
import { background, C, fillRR, font, hit, rrPath, text } from '../../core/draw';
import { calibOf } from '../../core/calib';
import { paramsOf } from '../../core/params';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, Metric, PointerInfo, ResultDetailRow, StageInfo } from '../../core/types';
import { FramePeriod } from '../_shared/labor-bilder';
import { restPoint } from '../_shared/tippziele';
import { drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import {
  FlashSession,
  flashParams,
  MASK_MS,
  PARAMS,
  PITCH,
  pointsFor,
  QUICK_TRIALS,
  tipFor,
  type FlashParams,
  type FlashSummary,
} from './logic';
import { flashLayout, type FlashLayout as Layout } from './layout';
import { de, it } from './texts';

const STIM_COLOR = '#D9E2EF';
const CROSS_COLOR = '#9AA7B8';
const ACCENT = '#E9D5A8';
const MASK_TONES = ['rgba(150,166,190,0.5)', 'rgba(110,128,156,0.5)', 'rgba(190,202,220,0.34)', 'rgba(60,76,102,0.5)'];
const MASK_FADE_MS = 60;
const LEAD_MS = 400;
const MARK_MS = 700;
/** Kreuz-Abstand (Hälfte der Armlänge), wie in Spot-Touch */
const CROSS_MIN = 9;
const CROSS_MAX = 20;

// Intro-Film: zwei Durchgänge mit langer, gut sichtbarer Dauer; beim zweiten fehlt die letzte Taste
const DEMO_PARAMS: Partial<FlashParams> = { trials: 2, symbols: 'digits', length: 3, durationMs: 450, adaptive: 'no', mask: 'yes', sizeCm: 3 };
const DEMO_FIX_MS = 1100;

interface MaskCell {
  /** Spalte/Zeile im Raster der Maske und Farbton */
  c: number;
  r: number;
  tone: number;
}

interface Mark {
  ok: boolean;
  t0: number;
}

class BlitzErkennung implements Exercise {
  private readonly demo: boolean;
  private readonly p: FlashParams;
  private readonly session: FlashSession;
  private readonly clock = new FramePeriod();
  private started = false;
  private startAt = 0;
  private done = false;
  private seenTrials = 0;
  private maskCells: MaskCell[] = [];
  private maskCols = 0;
  private maskRows = 0;
  private maskAt = 0;
  private mark: Mark | null = null;
  private plannedFor = -1;
  private captionStep = -1;
  private limited = false;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = flashParams(paramsOf(ctx, PARAMS));
    this.p = this.demo ? { ...base, ...DEMO_PARAMS } : ctx.quick ? { ...base, trials: Math.min(base.trials, QUICK_TRIALS) } : base;
    this.session = new FlashSession(this.p, { rng: ctx.rng, fixMs: this.demo ? DEMO_FIX_MS : undefined });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private layout(): Layout {
    const s: StageInfo = this.ctx.stage;
    return flashLayout({
      w: s.w,
      h: s.h,
      u: s.u,
      captionReserve: this.demo ? this.captionReserve() : 0,
      demo: this.demo,
      wantGlyphPx: calibOf(this.ctx).sizePx(this.p.sizeCm),
      length: this.p.length,
      poolSize: this.session.pool.length,
    });
  }

  /** Platz unten im Intro-Film für Hand und Bildunterschrift */
  private captionReserve(): number {
    const s = this.ctx.stage;
    const size = clamp(s.u * 4.6, 14, 30);
    return size * 2.1 + s.h * 0.05 + Math.max(6, s.u * 1.5);
  }

  private glyphCm(L: Layout): number {
    return L.glyph / calibOf(this.ctx).pxPerCm;
  }

  resize(): void {
    // Alles wird aus der Bühne neu berechnet; nichts zwischenspeichern
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    this.startAt = t + (this.demo ? 600 : LEAD_MS);
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    hud.setLabel(this.demo ? null : this.trialLabel());
    if (this.demo) {
      const r = restPoint(this.ctx.stage);
      ghost.moveTo(r.x, r.y, { move: 0 });
      hud.caption(texts.captions.look);
    }
  }

  private trialLabel(): string {
    const n = Math.min(this.session.idx + 1, this.p.trials);
    return this.ctx.texts.feedback.trial.replace('{n}', String(n)).replace('{total}', String(this.p.trials));
  }

  update(_dt: number, t: number): void {
    this.clock.push(t);
    if (this.done) return;
    const s = this.session;
    if (!this.started) {
      if (t < this.startAt) return;
      this.started = true;
      s.start(t);
      this.limited = this.checkLimited();
    }
    s.setPeriod(this.clock.period());
    const before = s.phase;
    s.update(t);
    if (s.phase !== before) this.onPhase(t);
    this.noticeResult(t);
    if (this.ctx.autoplay) this.autoUpdate();
    if (s.finished) this.finishSession();
  }

  /** `true`, wenn die Zeichenhöhe auf dieser Bühne kleiner ist als eingestellt */
  private checkLimited(): boolean {
    const L = this.layout();
    return this.glyphCm(L) < this.p.sizeCm - 0.05;
  }

  private onPhase(t: number): void {
    const s = this.session;
    const { hud, texts } = this.ctx;
    if (s.phase === 'mask') this.buildMask(t);
    if (s.phase === 'show' && this.demo && this.captionStep < s.idx) {
      this.captionStep = s.idx;
      hud.caption(s.idx === 0 ? texts.captions.flash : texts.captions.again);
    }
    if (s.phase === 'input' && this.demo) hud.caption(s.idx === 0 ? texts.captions.enter : texts.captions.miss);
    if (s.phase === 'fix') {
      hud.setProgress(Math.min(1, s.idx / this.p.trials));
      if (!this.demo) hud.setLabel(this.trialLabel());
      if (this.demo && s.idx > 0) hud.caption(texts.captions.look);
    }
  }

  /** Auswertung eines Durchgangs bemerken (Ton, Zeichen, Punkte) */
  private noticeResult(t: number): void {
    const s = this.session;
    while (this.seenTrials < s.trials.length) {
      const tr = s.trials[this.seenTrials++];
      this.mark = { ok: tr.correct, t0: t };
      if (tr.correct) this.ctx.sfx.good();
      else this.ctx.sfx.bad();
      if (!this.demo) this.ctx.hud.setScore(s.trials.filter((x) => x.correct).length);
    }
  }

  // --- Eingabe ---

  pointerDown(p: PointerInfo): void {
    if (this.done || !this.started) return;
    const s = this.session;
    if (s.phase !== 'input') return;
    const L = this.layout();
    const pad = Math.max(0, 24 - Math.min(L.back.h / 2, 24)); // Treffer mindestens ≈ 24 px Radius
    if (hit(L.back, p.x, p.y, pad)) {
      s.back();
      this.ctx.sfx.tap();
      return;
    }
    for (let i = 0; i < L.keys.length; i++) {
      const r = L.keys[i];
      if (hit(r, p.x, p.y, Math.max(0, 24 - Math.min(r.w, r.h) / 2))) {
        this.ctx.sfx.tap();
        s.press(s.pool[i], p.t);
        return;
      }
    }
  }

  // --- Autoplay (Intro-Film und Tests) ---

  private autoUpdate(): void {
    const s = this.session;
    if (s.phase !== 'input' || this.plannedFor === s.idx) return;
    this.plannedFor = s.idx;
    const { ghost, rng } = this.ctx;
    const L = this.layout();
    const quick = this.ctx.quick;
    const fastDelay: [number, number] = quick ? [90, 180] : [220, 480];
    const move = quick ? 230 : 480;
    // Film: erster Durchgang ganz richtig, beim zweiten ist die letzte Taste falsch
    const wrongAt = this.demo ? (s.idx === 1 ? s.target.length - 1 : -1) : -2;
    s.target.forEach((sym, i) => {
      let key = sym;
      const wrong = this.demo ? i === wrongAt : rng.chance(0.14);
      if (wrong) key = s.pool.find((x) => x !== sym && !s.target.includes(x)) ?? s.pool.find((x) => x !== sym) ?? sym;
      const r = L.keys[s.pool.indexOf(key)];
      const delay = this.demo ? (i === 0 ? 700 : 150) : rng.range(fastDelay[0], fastDelay[1]);
      ghost.tap(r.x + r.w / 2, r.y + r.h / 2, { delay, move: this.demo ? 560 : move });
    });
  }

  // --- Ende ---

  private finishSession(): void {
    if (this.done) return;
    this.done = true;
    this.ctx.hud.setProgress(1);
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
    this.ctx.sfx.done();
    this.ctx.finish(this.buildResult(sum));
  }

  private buildResult(sum: FlashSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const adaptive = this.p.adaptive === 'yes';
    const sec: Metric[] = [];
    const rows: ResultDetailRow[] = [];
    const L = this.layout();
    if (adaptive) {
      if (sum.thresholdMs !== null) sec.push({ key: 'threshold', value: sum.thresholdMs, unit: 'ms' });
      else if (sum.finalMs !== null) sec.push({ key: 'final_duration', value: sum.finalMs, unit: 'ms' });
    }
    if (sum.symbolAccuracy !== null) sec.push({ key: 'symbol_accuracy', value: sum.symbolAccuracy, unit: 'percent' });
    if (!adaptive) {
      sec.push({ key: 'correct', value: sum.correct, unit: 'count' });
      if (sum.shownMean !== null) sec.push({ key: 'shown', value: sum.shownMean, unit: 'ms' });
    } else if (sum.entryMean === null) {
      sec.push({ key: 'correct', value: sum.correct, unit: 'count' });
    }
    if (sum.entryMean !== null) sec.push({ key: 'entry_mean', value: sum.entryMean, unit: 'ms' });
    const secondary = sec.slice(0, 4);

    rows.push({ label: texts.metrics.duration, value: fmt.ms(sum.durationMs), text: adaptive ? texts.feedback.startValue : undefined });
    if (adaptive) {
      if (sum.thresholdMs !== null && sum.thresholdFrames !== null) {
        rows.push({ label: texts.metrics.threshold_frames, value: texts.feedback.framesValue.replace('{n}', fmt.num(sum.thresholdFrames, 1)) });
      }
      if (sum.thresholdMs !== null && sum.finalMs !== null) rows.push({ label: texts.metrics.final_duration, value: fmt.ms(sum.finalMs) });
      if (sum.shownMean !== null) rows.push({ label: texts.metrics.shown, value: fmt.ms(sum.shownMean) });
    } else if (sum.shownSd !== null) {
      rows.push({ label: texts.metrics.shown_sd, value: fmt.ms(sum.shownSd) });
    }
    rows.push({ label: texts.metrics.refresh, value: `${fmt.num(sum.refreshHz, 0)} Hz` });
    if (sum.jerks > 0) rows.push({ label: texts.metrics.jerks, value: fmt.num(sum.jerks, 0) });
    if (this.limited) rows.push({ label: texts.metrics.size, value: `${fmt.num(this.glyphCm(L), 1)} cm`, text: texts.feedback.limited });
    return {
      primary: { key: 'accuracy', value: sum.accuracy ?? 0, unit: 'percent', better: 'higher' },
      secondary,
      details: [{ title: texts.feedback.moreTitle, rows, note: texts.feedback.moreNote }],
      score: pointsFor(sum.correct),
      level: 1,
      tip: tipFor(sum, this.p),
    };
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  /** Maske für den Durchgang: Raster aus mittelgrauen Blöcken über der Zeichenzeile (vorab gewürfelt, ohne Leinwand) */
  private buildMask(t: number): void {
    const L = this.layout();
    const cell = Math.max(4, L.glyph / 5);
    const wPx = this.p.length * PITCH * L.glyph + L.glyph * 0.7;
    const hPx = L.glyph * 1.5;
    this.maskCols = Math.max(1, Math.ceil(wPx / cell));
    this.maskRows = Math.max(1, Math.ceil(hPx / cell));
    this.maskCells = [];
    const { rng } = this.ctx;
    for (let r = 0; r < this.maskRows; r++) {
      for (let c = 0; c < this.maskCols; c++) {
        if (rng.next() < 0.62) this.maskCells.push({ c, r, tone: rng.int(MASK_TONES.length) });
      }
    }
    this.maskAt = t;
  }

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    if (!this.started) return;
    const s = this.session;
    const L = this.layout();
    switch (s.phase) {
      case 'fix':
        this.drawCross(g, L);
        break;
      case 'show':
        this.drawGlyphs(g, L, s.target);
        break;
      case 'mask':
        this.drawMask(g, L, t);
        break;
      case 'input':
        this.drawEntry(g, L);
        this.drawKeys(g, L);
        break;
      case 'feedback':
        this.drawFeedback(g, L, t);
        this.drawKeys(g, L, true);
        break;
      default:
        break;
    }
  }

  private drawCross(g: CanvasRenderingContext2D, L: Layout): void {
    const arm = clamp(calibOf(this.ctx).pxPerCm * 0.4, CROSS_MIN, CROSS_MAX);
    g.save();
    g.lineCap = 'round';
    g.strokeStyle = CROSS_COLOR;
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(L.cx - arm, L.cy);
    g.lineTo(L.cx + arm, L.cy);
    g.moveTo(L.cx, L.cy - arm);
    g.lineTo(L.cx, L.cy + arm);
    g.stroke();
    g.restore();
  }

  /** Zeichenzeile: jedes Zeichen in der Mitte seines Platzes (Abstand `PITCH × Zeichenhöhe`) */
  private drawGlyphs(g: CanvasRenderingContext2D, L: Layout, chars: readonly string[], color: string = STIM_COLOR, size: number = L.glyph): void {
    const n = chars.length;
    const pitch = PITCH * size;
    g.save();
    g.font = font(size / 0.72, 700);
    g.fillStyle = color;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    chars.forEach((c, i) => g.fillText(c, L.cx + (i - (n - 1) / 2) * pitch, L.cy));
    g.restore();
  }

  private drawMask(g: CanvasRenderingContext2D, L: Layout, t: number): void {
    const age = t - this.maskAt;
    const a = clamp((MASK_MS - age) / MASK_FADE_MS, 0, 1);
    if (a <= 0) return;
    const cell = Math.max(4, L.glyph / 5);
    const x0 = L.cx - (this.maskCols * cell) / 2;
    const y0 = L.cy - (this.maskRows * cell) / 2;
    g.save();
    g.globalAlpha = a;
    for (const m of this.maskCells) {
      g.fillStyle = MASK_TONES[m.tone];
      g.fillRect(x0 + m.c * cell, y0 + m.r * cell, cell + 0.5, cell + 0.5);
    }
    g.restore();
  }

  /** Eingabestand: ein Platz je Zeichen, getippte Zeichen darin */
  private drawEntry(g: CanvasRenderingContext2D, L: Layout): void {
    const s = this.session;
    const n = this.p.length;
    const size = clamp(Math.min(L.glyph, this.ctx.stage.u * 9), 28, 72);
    const pitch = PITCH * size;
    for (let i = 0; i < n; i++) {
      const x = L.cx + (i - (n - 1) / 2) * pitch;
      const active = i === s.entry.length;
      g.save();
      g.strokeStyle = active ? ACCENT : 'rgba(255,255,255,0.35)';
      g.lineWidth = active ? 3.5 : 2.5;
      g.lineCap = 'round';
      g.beginPath();
      g.moveTo(x - size * 0.4, L.cy + size * 0.62);
      g.lineTo(x + size * 0.4, L.cy + size * 0.62);
      g.stroke();
      g.restore();
    }
    // getippte Zeichen genau auf ihrem Platz
    g.save();
    g.font = font(size / 0.72, 700);
    g.fillStyle = ACCENT;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    s.entry.forEach((c, i) => g.fillText(c, L.cx + (i - (n - 1) / 2) * pitch, L.cy));
    g.restore();
    const msg = this.ctx.texts.feedback.ask;
    const msize = clamp(this.ctx.stage.u * 3.2, 13, 22);
    g.save();
    g.font = font(msize, 700);
    const fits = g.measureText(msg).width < this.ctx.stage.w - 20;
    g.restore();
    if (fits && !this.demo) text(g, msg, L.cx, L.cy - size * 1.1 - msize, msize, C.dim, { weight: 700 });
  }

  private drawKeys(g: CanvasRenderingContext2D, L: Layout, dim = false): void {
    const s = this.session;
    const keySize = Math.min(L.keys[0].h * 0.52, 34);
    g.save();
    g.globalAlpha = dim ? 0.35 : 1;
    L.keys.forEach((r, i) => {
      fillRR(g, r.x, r.y, r.w, r.h, Math.min(r.w, r.h) * 0.22, 'rgba(255,255,255,0.12)');
      g.save();
      rrPath(g, r.x + 0.5, r.y + 0.5, r.w - 1, r.h - 1, Math.min(r.w, r.h) * 0.22);
      g.strokeStyle = 'rgba(255,255,255,0.28)';
      g.lineWidth = 1.5;
      g.stroke();
      g.restore();
      text(g, s.pool[i], r.x + r.w / 2, r.y + r.h / 2 + 1, keySize, C.fg, { weight: 700 });
    });
    const b = L.back;
    fillRR(g, b.x, b.y, b.w, b.h, Math.min(b.w, b.h) * 0.22, 'rgba(255,255,255,0.08)');
    g.save();
    rrPath(g, b.x + 0.5, b.y + 0.5, b.w - 1, b.h - 1, Math.min(b.w, b.h) * 0.22);
    g.strokeStyle = 'rgba(255,255,255,0.28)';
    g.lineWidth = 1.5;
    g.stroke();
    g.restore();
    // Pfeil-Symbol nach links + Text (nie nur Symbol)
    const aw = clamp(b.h * 0.2, 6, 11);
    const ax = b.x + b.w * 0.13;
    const ay = b.y + b.h / 2;
    g.save();
    g.strokeStyle = C.fg;
    g.lineWidth = 2.5;
    g.lineCap = 'round';
    g.lineJoin = 'round';
    g.beginPath();
    g.moveTo(ax + aw, ay - aw);
    g.lineTo(ax, ay);
    g.lineTo(ax + aw, ay + aw);
    g.moveTo(ax, ay);
    g.lineTo(ax + aw * 2, ay);
    g.stroke();
    g.restore();
    text(g, this.ctx.texts.feedback.erase, b.x + b.w * 0.62, ay + 1, clamp(b.h * 0.3, 12, 20), C.fg, { weight: 700 });
    g.restore();
  }

  private drawFeedback(g: CanvasRenderingContext2D, L: Layout, t: number): void {
    const last = this.session.last;
    if (!last) return;
    const { texts } = this.ctx;
    const size = clamp(Math.min(L.glyph, this.ctx.stage.u * 9), 28, 72);
    const msize = clamp(this.ctx.stage.u * 4, 15, 28);
    const label = last.correct ? texts.feedback.right : texts.feedback.shown.replace('{s}', last.target.split('').join(' '));
    text(g, label, L.cx, L.cy, last.correct ? msize * 1.3 : msize * 1.1, C.fg, { weight: 700 });
    if (this.mark) {
      const a = markAlpha(t - this.mark.t0, MARK_MS);
      const ms = clamp(size * 0.45, 12, 26);
      const my = L.cy - Math.max(msize * 1.6, size * 0.9);
      if (this.mark.ok) drawSoftCheck(g, L.cx, my, ms, a);
      else drawSoftCross(g, L.cx, my, ms, a);
    }
    // gezeigte Zeichen kleiner darunter, wenn falsch – ohne Farbe als Träger
    if (!last.correct) {
      const show = last.answer.split('');
      const asize = clamp(size * 0.55, 18, 40);
      text(g, texts.feedback.yours.replace('{s}', show.join(' ')), L.cx, L.cy + msize * 1.8, asize * 0.7, C.dim, { weight: 600 });
    }
  }
}

export const laborBlitzErkennung: ExerciseDefinition = {
  id: 'labor-blitz-erkennung',
  category: 'wahrnehmung',
  minutes: 3,
  color: '#8C6D4A',
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><path d="M24 5v6M10 9l4 4M38 9l-4 4"/></g><rect x="6" y="18" width="10" height="13" rx="2.5" fill="currentColor"/><rect x="19" y="18" width="10" height="13" rx="2.5" fill="currentColor" opacity=".5"/><rect x="32" y="18" width="10" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="3"/><g fill="currentColor" opacity=".55"><rect x="6" y="37" width="7" height="6" rx="1.5"/><rect x="15" y="37" width="7" height="6" rx="1.5"/><rect x="24" y="37" width="7" height="6" rx="1.5"/><rect x="33" y="37" width="7" height="6" rx="1.5"/></g>',
  texts: { de, it },
  warning: 'flicker',
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  create: (ctx) => new BlitzErkennung(ctx),
};
