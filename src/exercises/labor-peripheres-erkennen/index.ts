/**
 * Peripheres Erkennen (Labor) – du schaust auf eine wechselnde Zahl in der Mitte; am Rand blitzt kurz ein Buchstabe auf,
 * den du danach aus mehreren Möglichkeiten wählst. Abstand in Sehwinkel (Grad), Dauer und Größe sind einstellbar.
 *
 * Portierung der Labor-Übung `periphery` (Prototyp ex/periphery.js): Einstellungen (`ctx.params`, siehe logic.ts `PARAMS`),
 * Winkel über den Sehabstand der Kalibrierung (`ctx.calib.viewDistanceCm`), reine Logik in logic.ts (`PeripherySession`).
 *
 * - Hauptwert: Anteil richtig erkannter Buchstaben (`accuracy`, höher = besser); das Zufallsniveau steht daneben.
 * - Der Abstand wird auf das begrenzt, was auf die Bühne passt (nach außen und nach innen); der tatsächliche Winkel steht im
 *   Ergebnis (`ecc`), und eine kurze Meldung erscheint zu Beginn.
 * - Anzeigedauer in ganzen Bildern, gemessene Dauer im Ergebnis (siehe `_shared/labor-bilder.ts`).
 * - Blinkregel: Zwischen zwei Blitzen liegen immer mehr als eine Sekunde; gedämpftes Hellgrau, kleiner Buchstabe, kein Rot,
 *   keine Vollflächeneffekte; im Intro `warning: 'flicker'` und ein Hinweis in „Gut zu wissen“.
 * - Der Blick wird NICHT gemessen (kein Eye-Tracking): „Blick in der Mitte lassen“ ist eine Bitte, keine Kontrolle. Die
 *   wechselnde Zahl gibt dem Blick nur einen Grund, dort zu bleiben.
 */
import { background, C, fillRR, font, hit, rrPath, text } from '../../core/draw';
import { calibOf } from '../../core/calib';
import { paramsOf } from '../../core/params';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, Metric, PointerInfo, ResultDetailRow } from '../../core/types';
import { FramePeriod } from '../_shared/labor-bilder';
import { restPoint } from '../_shared/tippziele';
import { drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import { periLayout, type PeriLayout } from './layout';
import {
  ANCHOR_CM,
  DEMO_FIX,
  PARAMS,
  PeripherySession,
  peripheryParams,
  pointsFor,
  QUICK_FIX,
  QUICK_TRIALS,
  tipFor,
  type PeripheryParams,
  type PeripherySummary,
} from './logic';
import { de, it } from './texts';

const STIM_COLOR = '#D9E2EF';
const ANCHOR_COLOR = '#9AA7B8';
const LEAD_MS = 400;
const MARK_MS = 700;

// Intro-Film: ein Buchstabe links, einer rechts; beim zweiten wird absichtlich falsch gewählt
const DEMO_PARAMS: Partial<PeripheryParams> = { trials: 2, eccentricityDeg: 9, directions: 'horizontal', durationMs: 450, adaptive: 'no', sizeCm: 2.5, choices: 3 };
const DEMO_PLAN = [
  { dir: 'left' as const, letter: 'K' },
  { dir: 'right' as const, letter: 'R' },
];

interface Mark {
  ok: boolean;
  t0: number;
}

class PeripheresErkennen implements Exercise {
  private readonly demo: boolean;
  private readonly p: PeripheryParams;
  private readonly session: PeripherySession;
  private readonly clock = new FramePeriod();
  private started = false;
  private startAt = 0;
  private done = false;
  private seenTrials = 0;
  private plannedFor = -1;
  private captionStep = -1;
  private toldLimited = false;
  private mark: Mark | null = null;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = peripheryParams(paramsOf(ctx, PARAMS));
    this.p = this.demo ? { ...base, ...DEMO_PARAMS } : ctx.quick ? { ...base, trials: Math.min(base.trials, QUICK_TRIALS) } : base;
    const L = this.layout();
    const calib = calibOf(ctx);
    this.session = new PeripherySession(this.p, {
      rng: ctx.rng,
      fieldWcm: L.fieldW / calib.pxPerCm,
      fieldHcm: L.fieldH / calib.pxPerCm,
      viewDistanceCm: calib.viewDistanceCm,
      sizeCm: calib.fitCm(this.p.sizeCm),
      fixMs: this.demo ? DEMO_FIX : ctx.quick ? QUICK_FIX : undefined,
      plan: this.demo ? DEMO_PLAN : undefined,
    });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private layout(): PeriLayout {
    const s = this.ctx.stage;
    return periLayout({ w: s.w, h: s.h, u: s.u, demo: this.demo, captionReserve: this.demo ? this.captionReserve() : 0, choices: this.p.choices });
  }

  /** Platz unten im Intro-Film für Hand und Bildunterschrift */
  private captionReserve(): number {
    const s = this.ctx.stage;
    const size = clamp(s.u * 4.6, 14, 30);
    return size * 2.1 + s.h * 0.05 + Math.max(6, s.u * 1.5);
  }

  /** Feld und Buchstabenhöhe der Session an die aktuelle Bühne anpassen (wirkt ab dem nächsten Durchgang) */
  private sync(): void {
    const L = this.layout();
    const calib = calibOf(this.ctx);
    this.session.setField(L.fieldW / calib.pxPerCm, L.fieldH / calib.pxPerCm, calib.fitCm(this.p.sizeCm));
  }

  resize(): void {
    this.sync();
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
      this.sync();
      s.start(t);
      this.tellLimited();
    }
    s.setPeriod(this.clock.period());
    const before = s.phase;
    // Feld bei jedem Bild angleichen (billig); wirkt ab dem nächsten Durchgang
    if (s.phase === 'feedback') this.sync();
    s.update(t);
    if (s.phase !== before) this.onPhase(before);
    this.noticeResult(t);
    if (this.ctx.autoplay) this.autoUpdate();
    if (s.finished) this.finishSession();
  }

  /** Meldung, wenn der gewünschte Winkel auf dieser Bühne nicht erreichbar ist (einmal zu Beginn) */
  private tellLimited(): void {
    const s = this.session;
    if (this.demo || this.toldLimited || !s.ecc.clamped) return;
    this.toldLimited = true;
    const L = this.layout();
    const { hud, texts, fmt } = this.ctx;
    hud.toast(texts.feedback.limited.replace('{deg}', fmt.num(s.ecc.deg, 1)), 'info', { x: L.cx, y: L.cy - Math.min(L.fieldH * 0.35, 160), ms: 2600, size: clamp(this.ctx.stage.u * 3.4, 14, 22) });
  }

  private onPhase(before: string): void {
    const s = this.session;
    const { hud, texts } = this.ctx;
    if (s.phase === 'flash' && this.demo && this.captionStep < s.idx) {
      this.captionStep = s.idx;
      hud.caption(s.idx === 0 ? texts.captions.flash : texts.captions.again);
    }
    if (s.phase === 'input' && this.demo) hud.caption(s.idx === 0 ? texts.captions.pick : texts.captions.miss);
    if (s.phase === 'fix' && before === 'feedback') {
      hud.setProgress(Math.min(1, s.idx / this.p.trials));
      if (!this.demo) hud.setLabel(this.trialLabel());
      if (this.demo) hud.caption(texts.captions.look);
    }
  }

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
    for (let i = 0; i < L.buttons.length; i++) {
      const r = L.buttons[i];
      if (hit(r, p.x, p.y, Math.max(0, 24 - Math.min(r.w, r.h) / 2))) {
        // nur die erste Antwort je Durchgang zählt (Doppeltipps): `answer` ignoriert weitere
        s.answer(i, p.t);
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
    const right = s.options.indexOf(s.letter);
    let pick = right;
    if (this.demo ? s.idx === 1 : rng.chance(0.3)) pick = (right + 1 + rng.int(Math.max(1, s.options.length - 1))) % s.options.length;
    const r = L.buttons[pick];
    const quick = this.ctx.quick;
    ghost.tap(r.x + r.w / 2, r.y + r.h / 2, { delay: this.demo ? 600 : quick ? rng.range(100, 220) : rng.range(300, 700), move: this.demo ? 700 : quick ? 260 : 450 });
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

  private buildResult(sum: PeripherySummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const adaptive = this.p.adaptive === 'yes';
    const sec: Metric[] = [];
    if (adaptive && sum.thresholdMs !== null) sec.push({ key: 'threshold', value: sum.thresholdMs, unit: 'ms' });
    sec.push({ key: 'chance', value: sum.chance, unit: 'percent' });
    if (sum.rtMean !== null) sec.push({ key: 'rt_mean', value: sum.rtMean, unit: 'ms' });
    if (!adaptive && sum.shownMean !== null) sec.push({ key: 'shown', value: sum.shownMean, unit: 'ms' });
    sec.push({ key: 'correct', value: sum.correct, unit: 'count' });
    const secondary = sec.slice(0, 4);

    const rows: ResultDetailRow[] = [];
    if (sum.eccMeanDeg !== null) {
      rows.push({
        label: texts.metrics.ecc,
        value: `${fmt.num(sum.eccMeanDeg, 1)} °`,
        text: sum.limited > 0 ? texts.feedback.eccLimited.replace('{set}', fmt.num(this.p.eccentricityDeg, 0)) : texts.feedback.eccAsSet,
      });
    }
    if (sum.accHorizontal !== null) rows.push({ label: texts.metrics.acc_horizontal, value: fmt.pct(sum.accHorizontal) });
    if (sum.accVertical !== null) rows.push({ label: texts.metrics.acc_vertical, value: fmt.pct(sum.accVertical) });
    rows.push({ label: texts.metrics.duration, value: fmt.ms(sum.durationMs), text: adaptive ? texts.feedback.startValue : undefined });
    if (adaptive) {
      if (sum.thresholdFrames !== null) rows.push({ label: texts.metrics.threshold_frames, value: texts.feedback.framesValue.replace('{n}', fmt.num(sum.thresholdFrames, 1)) });
      if (sum.shownMean !== null) rows.push({ label: texts.metrics.shown, value: fmt.ms(sum.shownMean) });
    }
    rows.push({ label: texts.metrics.refresh, value: `${fmt.num(sum.refreshHz, 0)} Hz` });
    if (sum.jerks > 0) rows.push({ label: texts.metrics.jerks, value: fmt.num(sum.jerks, 0) });
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

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    if (!this.started) return;
    const s = this.session;
    const L = this.layout();
    const calib = calibOf(this.ctx);
    switch (s.phase) {
      case 'fix':
        this.drawAnchor(g, L);
        break;
      case 'flash': {
        this.drawAnchor(g, L);
        const px = calib.pxPerCm;
        g.save();
        g.font = font(calib.sizePx(s.sizeCm) / 0.72, 700);
        g.fillStyle = STIM_COLOR;
        g.textAlign = 'center';
        g.textBaseline = 'middle';
        g.fillText(s.letter, L.cx + s.offset.x * px, L.cy + s.offset.y * px);
        g.restore();
        break;
      }
      case 'input':
        this.drawPrompt(g, L);
        this.drawButtons(g, L);
        break;
      case 'feedback':
        this.drawFeedback(g, L, t);
        this.drawButtons(g, L, true);
        break;
      default:
        break;
    }
  }

  /** Zahl in der Mitte (Fixierhilfe); die Höhe ist fest, nicht die Buchstabenhöhe */
  private drawAnchor(g: CanvasRenderingContext2D, L: PeriLayout): void {
    const size = Math.max(14, calibOf(this.ctx).sizePx(ANCHOR_CM) / 0.72);
    text(g, this.session.centerDigit, L.cx, L.cy, size, ANCHOR_COLOR, { weight: 700 });
  }

  private drawPrompt(g: CanvasRenderingContext2D, L: PeriLayout): void {
    const size = clamp(this.ctx.stage.u * 4, 16, 30);
    text(g, this.ctx.texts.feedback.ask, L.cx, L.cy, size, C.dim, { weight: 700 });
  }

  private drawButtons(g: CanvasRenderingContext2D, L: PeriLayout, dim = false): void {
    const s = this.session;
    g.save();
    g.globalAlpha = dim ? 0.35 : 1;
    L.buttons.forEach((r, i) => {
      const rad = Math.min(r.w, r.h) * 0.22;
      fillRR(g, r.x, r.y, r.w, r.h, rad, 'rgba(255,255,255,0.12)');
      g.save();
      rrPath(g, r.x + 0.5, r.y + 0.5, r.w - 1, r.h - 1, rad);
      g.strokeStyle = 'rgba(255,255,255,0.28)';
      g.lineWidth = 1.5;
      g.stroke();
      g.restore();
      text(g, s.options[i] ?? '', r.x + r.w / 2, r.y + r.h / 2 + 1, Math.min(r.h * 0.5, 40), C.fg, { weight: 700 });
    });
    g.restore();
  }

  private drawFeedback(g: CanvasRenderingContext2D, L: PeriLayout, t: number): void {
    const last = this.session.last;
    if (!last) return;
    const { texts } = this.ctx;
    const size = clamp(this.ctx.stage.u * 5, 18, 36);
    const label = last.correct ? texts.feedback.right : texts.feedback.itWas.replace('{s}', last.letter);
    text(g, label, L.cx, L.cy, size, C.fg, { weight: 700 });
    if (this.mark) {
      const a = markAlpha(t - this.mark.t0, MARK_MS);
      const ms = clamp(size * 0.6, 12, 26);
      if (this.mark.ok) drawSoftCheck(g, L.cx, L.cy - size * 1.7, ms, a);
      else drawSoftCross(g, L.cx, L.cy - size * 1.7, ms, a);
    }
  }
}

export const laborPeripheresErkennen: ExerciseDefinition = {
  id: 'labor-peripheres-erkennen',
  category: 'wahrnehmung',
  minutes: 3,
  color: '#8C6D4A',
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><path d="M24 17v14M17 24h14"/><circle cx="24" cy="24" r="14" stroke-dasharray="3 5" opacity=".55"/></g><rect x="36" y="19" width="9" height="10" rx="2.2" fill="currentColor"/><circle cx="24" cy="24" r="2" fill="currentColor"/>',
  texts: { de, it },
  warning: 'flicker',
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  create: (ctx) => new PeripheresErkennen(ctx),
};
