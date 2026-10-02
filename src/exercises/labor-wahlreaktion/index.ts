/**
 * Wahlreaktion (Labor) – in der Mitte erscheint ein Zeichen (Farbe oder Form), unten tippt man die passende Taste.
 *
 * Portierung der Labor-Übung `choice` (Prototyp ex/choice.js): Größe in cm (`ctx.calib`), Einstellungen (`ctx.params`,
 * siehe logic.ts `PARAMS`), reine Logik in logic.ts (`ChoiceSession`).
 *
 * - Hauptwert: Genauigkeit (`accuracy`, höher = besser); dazu Reaktionszeit (Mittel) und Fehler. Keine Stufen (`level` = 1).
 * - Farbe nie allein: bei „Farben“ trägt jede Farbe zusätzlich ein Zeichen (Kreis, Dreieck, Quadrat, Stern, Raute, Kreuz) – auf
 *   dem Reiz und auf der Taste; bei „Formen“ gibt es nur weiße Zeichen. Tasten mindestens 56 px, bei vielen Tasten auf dem
 *   Handy in zwei Reihen.
 * - Wartezeit zufällig über `ctx.rng`; Tippen vor dem Reiz oder in den ersten 100 ms danach = „zu früh“ (nicht gewertet).
 * - Rückmeldung weich: ✓ bzw. ✗ am Reiz, bei einem Fehler oder verpassten Reiz zeigt ein gestrichelter Ring die richtige
 *   Taste; kein Blitz, keine Vollflächeneffekte. Ton nur, wenn „Ton“ an ist. Optional Tastatur: Ziffern 1–6.
 * - Gemessen wird nur dein Tippen (Zeit vom Erscheinen bis zur Berührung), nicht dein Blick.
 */
import { background, C, circle, ring, rrPath, text } from '../../core/draw';
import { paramsOf } from '../../core/params';
import { calibOf } from '../../core/calib';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, Metric, PointerInfo, ResultDetailRow } from '../../core/types';
import { drawForm } from '../_formen';
import { playField, restPoint } from '../_shared/tippziele';
import { drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import {
  answerLayout,
  buttonAt,
  ChoiceSession,
  choiceParams,
  type ChoiceParams,
  type ChoiceSummary,
  PARAMS,
  pointsFor,
  QUICK_TRIALS,
  QUICK_WAIT_MAX_MS,
  type Rect,
  tipFor,
} from './logic';
import { de, it } from './texts';

/** Formen je Taste (Nummern der Formen in `_formen.ts`): Kreis, Dreieck, Quadrat, Stern, Raute, Kreuz */
const FORMS = [0, 3, 2, 5, 4, 6];
/** Farben je Taste (nur zusätzlich zur Form; gut unterscheidbar, auf dunklem Grund hell) */
const COLORS = ['#5AA9F0', '#F5A524', '#2DD4BF', '#C4A1FF', '#F472B6', '#FDE047'];
const INK = '#E8EEF7';
const DARK = '#0B1424';

const FADE_IN_MS = 110;
const MARK_MS = 700;
const PRESS_MS = 240;
const HINT_MS = 900;

// Intro-Film: drei Tasten, vier Zeichen; beim dritten tippt die Hand absichtlich zu früh
const DEMO_PARAMS: Partial<ChoiceParams> = { trials: 4, options: 3, stimulus: 'color', stimulusMs: 5000, waitMinMs: 1100, waitMaxMs: 1100, sizeCm: 3.5, sound: 'no' };
const DEMO_LEAD_MS = 1000;
/** Nummer (ab 0) des Zeichens, vor dem die Hand zu früh tippt */
const DEMO_EARLY_TRIAL = 2;
/** Zeit von Erscheinen des Zeichens bis zum Tipp der Hand im Film */
const DEMO_REACT_MS = 950;
const DEMO_END_MS = 12500;
/** Anlaufzeit vor dem ersten Wartekreuz (Spielmodus) */
const LEAD_MS = 400;

interface Mark {
  x: number;
  y: number;
  t0: number;
  good: boolean;
}

class Wahlreaktion implements Exercise {
  private readonly demo: boolean;
  private readonly p: ChoiceParams;
  private readonly session: ChoiceSession;
  private startAt = 0;
  private started = false;
  private done = false;
  private endT = Infinity;
  private endAt = Infinity;
  private marks: Mark[] = [];
  private press: { i: number; t0: number } | null = null;
  private hint: { i: number; t0: number } | null = null;
  private seenTrials = 0;
  private plannedWait = -1;
  private plannedShow = -1;
  private lastLabel = '';

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = choiceParams(paramsOf(ctx, PARAMS));
    let p: ChoiceParams = this.demo ? { ...base, ...DEMO_PARAMS } : base;
    if (!this.demo && ctx.quick) {
      p = { ...p, trials: Math.min(p.trials, QUICK_TRIALS), waitMaxMs: Math.min(p.waitMaxMs, Math.max(p.waitMinMs, QUICK_WAIT_MAX_MS)) };
    }
    this.p = p;
    this.session = new ChoiceSession(this.p, { rng: ctx.rng });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private rects(): Rect[] {
    const s = this.ctx.stage;
    const f = playField(s, this.demo);
    return answerLayout(this.p.options, f.x, f.x + f.w, f.y + f.h, s.u);
  }

  /** Mitte und Radius des Zeichens: der freie Platz über den Tasten */
  private stimArea(): { cx: number; cy: number; r: number } {
    const s = this.ctx.stage;
    const f = playField(s, this.demo);
    const rs = this.rects();
    const top = f.y;
    const bottom = Math.min(...rs.map((r) => r.y)) - Math.max(10, s.u * 2);
    const h = Math.max(40, bottom - top);
    const sizePx = calibOf(this.ctx).sizePx(this.p.sizeCm);
    return { cx: s.w / 2, cy: top + h / 2, r: Math.max(14, Math.min(sizePx / 2, 0.44 * Math.min(f.w, h))) };
  }

  resize(): void {
    // alles wird je Bild aus der Bühne berechnet
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    this.startAt = t + (this.demo ? DEMO_LEAD_MS : LEAD_MS);
    hud.setProgress(0);
    hud.setScore(null);
    this.updateLabel();
    if (this.demo) {
      const r = restPoint(this.ctx.stage);
      ghost.moveTo(r.x, r.y, { move: 0 });
      hud.caption(texts.captions.watch);
    }
  }

  update(_dt: number, t: number): void {
    if (this.done) return;
    const s = this.session;
    if (!this.started) {
      if (t < this.startAt) return;
      this.started = true;
      s.start(t);
    }
    if (this.demo && t >= this.endAt) {
      this.finishSession(t);
      return;
    }
    s.update(t);
    this.noticeEvents(t);
    if (this.ctx.autoplay) this.autoUpdate();
    this.ctx.hud.setProgress(s.idx / this.p.trials);
    this.updateLabel();
    if (s.finished || (this.demo && t - this.startAt >= DEMO_END_MS)) this.finishSession(t);
    this.prune(t);
  }

  private updateLabel(): void {
    if (this.demo) return;
    const s = this.session;
    const n = Math.min(this.p.trials, s.idx + (s.state === 'show' ? 1 : 0));
    const label = this.ctx.texts.feedback.label.replace('{n}', String(n)).replace('{total}', String(this.p.trials));
    if (label !== this.lastLabel) {
      this.lastLabel = label;
      this.ctx.hud.setLabel(label);
    }
  }

  /** Verpasste Zeichen bemerken (Hinweis auf die richtige Taste) */
  private noticeEvents(t: number): void {
    const s = this.session;
    while (this.seenTrials < s.trials.length) {
      const tr = s.trials[this.seenTrials++];
      if (tr.outcome === 'omission') {
        this.hint = { i: tr.stimulus, t0: t };
        this.toastAtStim(this.ctx.texts.feedback.slow, 'info');
      } else if (this.demo && this.seenTrials === 1) {
        this.ctx.hud.caption(this.ctx.texts.captions.next);
      }
    }
  }

  private toastAtStim(txt: string, kind: 'info' | 'good' | 'bad'): void {
    const { hud, stage } = this.ctx;
    const a = this.stimArea();
    const size = clamp(stage.u * 4, 16, 28);
    hud.toast(txt, kind, { x: a.cx, y: Math.max(size * 1.5, a.cy - a.r - size * 0.6), ms: 800, size });
  }

  // --- Eingabe ---

  private answer(option: number, t: number): void {
    const { sfx } = this.ctx;
    const res = this.session.respond(option, t);
    if (!res || res.type === 'ignored') return;
    const a = this.stimArea();
    if (res.type === 'early') {
      this.toastAtStim(this.ctx.texts.feedback.early, 'info');
      if (this.p.sound === 'yes') sfx.bad();
      return;
    }
    this.press = { i: option, t0: t };
    this.marks.push({ x: a.cx, y: a.cy, t0: t, good: res.type === 'correct' });
    if (res.type === 'wrong') this.hint = { i: res.stimulus, t0: t };
    if (this.p.sound === 'yes') (res.type === 'correct' ? sfx.good : sfx.bad)();
  }

  pointerDown(p: PointerInfo): void {
    if (this.done || !this.started) return;
    const i = buttonAt(this.rects(), p.x, p.y);
    if (i >= 0) this.answer(i, p.t);
  }

  keyDown(key: string, t: number): void {
    if (this.done || !this.started) return;
    const n = Number(key);
    if (Number.isInteger(n) && n >= 1 && n <= this.p.options) this.answer(n - 1, t);
  }

  // --- Intro-Film und Autoplay ---

  private buttonCenter(i: number): { x: number; y: number } {
    const r = this.rects()[i];
    return { x: r.x + r.w / 2, y: r.y + r.h / 2 };
  }

  /** Film und Autoplay (Tests): die Hand tippt meist die richtige Taste, im Film einmal zu früh */
  private autoUpdate(): void {
    const { ghost, rng, hud, texts } = this.ctx;
    const s = this.session;
    if (s.finished) return;
    if (s.state === 'wait' && this.plannedWait !== s.idx) {
      this.plannedWait = s.idx;
      const early = this.demo ? s.idx === DEMO_EARLY_TRIAL : rng.chance(0.05);
      if (early) {
        const c = this.buttonCenter(this.demo ? 0 : rng.int(this.p.options));
        ghost.clear();
        ghost.tap(c.x, c.y, { delay: this.demo ? 250 : rng.range(120, 300), move: this.demo ? 450 : 350 });
        if (this.demo) hud.caption(texts.captions.early);
      }
    } else if (s.state === 'show' && this.plannedShow !== s.idx) {
      this.plannedShow = s.idx;
      const stim = s.current() ?? 0;
      ghost.clear();
      if (this.demo) {
        if (s.idx === 0) hud.caption(texts.captions.tap);
        else if (s.idx === DEMO_EARLY_TRIAL) hud.caption(texts.captions.tap);
        const c = this.buttonCenter(stim);
        ghost.tap(c.x, c.y, { delay: DEMO_REACT_MS - 500, move: 500 });
        return;
      }
      const roll = rng.next();
      if (roll < 0.05) return; // keine Antwort
      const rt = rng.range(380, 800);
      const move = rng.range(280, 450);
      let opt = stim;
      if (roll < 0.15 && this.p.options > 1) opt = (stim + 1 + rng.int(this.p.options - 1)) % this.p.options;
      const c = this.buttonCenter(opt);
      ghost.tap(c.x, c.y, { delay: Math.max(0, rt - move - 17), move });
    }
  }

  private prune(t: number): void {
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
    if (this.press && t - this.press.t0 > PRESS_MS) this.press = null;
    if (this.hint && t - this.hint.t0 > HINT_MS) this.hint = null;
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
    if (this.p.sound === 'yes') sfx.done();
    this.ctx.finish(this.buildResult(sum));
  }

  private buildResult(sum: ChoiceSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const secondary: Metric[] = [];
    if (sum.rtMean !== null) secondary.push({ key: 'rt_mean', value: sum.rtMean, unit: 'ms' });
    secondary.push({ key: 'wrong', value: sum.wrong, unit: 'count' });
    secondary.push({ key: 'omissions', value: sum.omissions, unit: 'count' });
    secondary.push({ key: 'early', value: sum.early, unit: 'count' });
    const rows: ResultDetailRow[] = [{ label: texts.metrics.correct, value: fmt.num(sum.correct, 0) }];
    if (sum.rtMedian !== null) rows.push({ label: texts.metrics.rt_median, value: fmt.ms(sum.rtMedian) });
    if (sum.rtSd !== null) rows.push({ label: texts.metrics.rt_sd, value: fmt.ms(sum.rtSd) });
    return {
      primary: { key: 'accuracy', value: sum.accuracy ?? 0, unit: 'percent', better: 'higher' },
      secondary,
      details: [{ title: texts.feedback.moreTitle, rows, note: texts.feedback.moreNote }],
      score: pointsFor(sum.correct),
      level: 1,
      tip: tipFor(sum),
    };
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, now: number): void {
    const t = Math.min(now, this.endT);
    const { w, h, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    const a = this.stimArea();
    const s = this.session;
    const cur = this.started ? s.current() : null;
    if (cur === null) this.drawWaitCross(g, a.cx, a.cy, a.r);
    else this.drawStimulus(g, cur, a, t - (s.shownAt ?? t));
    this.drawButtons(g, t);
    const cs = clamp(a.r * 0.5, 12, 34);
    for (const m of this.marks) {
      const alpha = markAlpha(t - m.t0, MARK_MS);
      if (m.good) drawSoftCheck(g, m.x, m.y, cs, alpha);
      else drawSoftCross(g, m.x, m.y, cs * 0.8, alpha);
    }
  }

  private drawWaitCross(g: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
    const arm = clamp(r * 0.18, 8, 18);
    g.save();
    g.lineCap = 'round';
    g.strokeStyle = C.dim;
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(cx - arm, cy);
    g.lineTo(cx + arm, cy);
    g.moveTo(cx, cy - arm);
    g.lineTo(cx, cy + arm);
    g.stroke();
    g.restore();
  }

  private drawStimulus(g: CanvasRenderingContext2D, id: number, a: { cx: number; cy: number; r: number }, age: number): void {
    const alpha = 0.35 + 0.65 * easeOut(age / FADE_IN_MS);
    g.save();
    g.globalAlpha = alpha;
    if (this.p.stimulus === 'color') {
      circle(g, a.cx, a.cy, a.r, COLORS[id]);
      ring(g, a.cx, a.cy, a.r + 1.5, 'rgba(5,10,20,0.6)', 2);
      drawForm(g, FORMS[id], a.cx, a.cy, a.r * 0.5, DARK);
    } else {
      drawForm(g, FORMS[id], a.cx, a.cy, a.r * 0.95, INK);
    }
    g.restore();
  }

  private drawButtons(g: CanvasRenderingContext2D, t: number): void {
    const rs = this.rects();
    rs.forEach((r, i) => {
      const cx = r.x + r.w / 2;
      const cy = r.y + r.h / 2;
      const rad = Math.min(r.w, r.h) * 0.22;
      g.save();
      rrPath(g, r.x, r.y, r.w, r.h, rad);
      g.fillStyle = this.p.stimulus === 'color' ? COLORS[i] : 'rgba(255,255,255,0.13)';
      g.fill();
      g.lineWidth = 1.5;
      g.strokeStyle = this.p.stimulus === 'color' ? 'rgba(5,10,20,0.55)' : 'rgba(255,255,255,0.28)';
      g.stroke();
      g.restore();
      drawForm(g, FORMS[i], cx, cy, Math.min(r.w, r.h) * 0.27, this.p.stimulus === 'color' ? DARK : INK);
      if (this.press && this.press.i === i && t - this.press.t0 < PRESS_MS) {
        g.save();
        rrPath(g, r.x - 2, r.y - 2, r.w + 4, r.h + 4, rad + 2);
        g.strokeStyle = '#FFFFFF';
        g.lineWidth = 4;
        g.stroke();
        g.restore();
      }
      if (this.hint && this.hint.i === i && t - this.hint.t0 < HINT_MS) {
        g.save();
        g.globalAlpha = markAlpha(t - this.hint.t0, HINT_MS, 140);
        rrPath(g, r.x - 4, r.y - 4, r.w + 8, r.h + 8, rad + 4);
        g.setLineDash([9, 7]);
        g.strokeStyle = '#FFFFFF';
        g.lineWidth = 3.5;
        g.stroke();
        g.restore();
      }
    });
    // Tastennummer (für die Tastatur) klein in der Ecke – nur wenn die Taste groß genug ist
    if (rs[0] && rs[0].w >= 80) {
      rs.forEach((r, i) => text(g, String(i + 1), r.x + 12, r.y + 13, 13, this.p.stimulus === 'color' ? DARK : C.dim, { weight: 700, alpha: 0.75 }));
    }
  }
}

export const laborWahlreaktion: ExerciseDefinition = {
  id: 'labor-wahlreaktion',
  category: 'reaktion',
  minutes: 2,
  color: '#C8641E',
  icon:
    '<circle cx="24" cy="15" r="9" fill="currentColor"/><path d="M24 10.5l5 8.5h-10z" fill="#fff" opacity=".85"/><rect x="5" y="31" width="10" height="11" rx="3" fill="currentColor" opacity=".45"/><rect x="19" y="31" width="10" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="3.2"/><rect x="33" y="31" width="10" height="11" rx="3" fill="currentColor" opacity=".45"/>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  create: (ctx) => new Wahlreaktion(ctx),
};
