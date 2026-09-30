/**
 * Sekunden-Gefühl – eine genannte Zielzeit ohne Uhr treffen (Zeitgefühl im Sekundenbereich).
 *
 * Abgrenzung: Keine Reaktionsaufgabe (dafür Blitzreaktion) – es gibt kein Signal, auf das man
 * schnell reagiert. Gemessen wird der Abstand des eigenen Tipps zur Zielzeit, mit Vorzeichen.
 *
 * - Ablauf je Durchgang: Zielzeit wird genannt → „Los“ (weich eingeblendet) → Zeit läuft
 *   unsichtbar → Tipp irgendwo → Abweichung in ms (zu früh / zu spät) mit Zeitstrahl.
 * - Zielzeiten in fester aufsteigender Folge 1 … 8 s (7 Durchgänge) → Hauptwert „mittlere
 *   Abweichung“ bleibt von Sitzung zu Sitzung vergleichbar (nur mit sich selbst, nur auf diesem Gerät).
 * - Stufe (Staircase, 2-down/1-up auf „innerhalb der Toleranz“): Stufe 1 zeigt einen dezenten
 *   Hilfsring, der sich langsam füllt; ab Stufe 2 gibt es keine Hilfe, und das Toleranzfenster
 *   wird enger. Kein Sekundenzähl-Ton.
 * - Start der Messung = Frame, in dem „Los“ zum ersten Mal gezeichnet wird; Tippzeit = p.t.
 *   Geräteverzögerung (Anzeige + Eingabe) bleibt als fester Versatz in der Tendenz enthalten.
 * - Keine Blitze: alles blendet weich über ≥ 120 ms ein und aus.
 */
import { background, C, circle, font, ring, rrPath, text, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import {
  deviationMs,
  isAccidentalTap,
  isSuccess,
  levelOf,
  MAX_LEVEL,
  MIN_LEVEL,
  rate,
  ringFraction,
  showHelpRing,
  summarize,
  targetSeries,
  timeoutMs,
  tipFor,
  toleranceMs,
  trialPoints,
  type Rating,
} from './logic';
import { de, it } from './texts';

const TRIALS = 7;
const QUICK_TRIALS = 2;
const ANNOUNCE_MS = 1800;
const DEMO_ANNOUNCE_MS = 1700;
const FEEDBACK_MS = 2100;
const DEMO_FEEDBACK_MS = 2300;
/** „Los“: weich ein (120 ms), kurz halten, weich aus */
const GO_IN = 120;
const GO_HOLD = 600;
const GO_OUT = 420;
const SLIDE_MS = 380;

const SAND = '#E3C79A';
const SAND_DIM = '#B89B6E';
const GOOD = '#4ADE80';
const WARM = '#FBBF24';

interface Outcome {
  dev: number;
  rating: Rating;
  ok: boolean;
  timedOut: boolean;
  tol: number;
  t0: number;
}

/** Intro-Film: 1 s knapp zu früh, 2 s sehr genau */
const DEMO = [
  { target: 1000, dev: -90 },
  { target: 2000, dev: 40 },
];

class SekundenGefuehl implements Exercise {
  private readonly demo: boolean;
  private readonly series: number[];
  private readonly stair: Staircase;
  private phase: 'announce' | 'run' | 'feedback' | 'done' = 'announce';
  private phaseT = 0;
  private runT0 = 0;
  private idx = 0;
  private level = MIN_LEVEL;
  private out: Outcome | null = null;
  private devs: number[] = [];
  private tols: number[] = [];
  private targets: number[] = [];
  private points = 0;
  private waitToast = false;
  private finished = false;
  private frameMs = 1000 / 60;
  private endT = Infinity;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const count = this.demo ? DEMO.length : ctx.quick ? QUICK_TRIALS : TRIALS;
    this.series = this.demo ? DEMO.map((d) => d.target) : targetSeries(count);
    this.stair = new Staircase({ start: ctx.startLevel ?? MIN_LEVEL, min: MIN_LEVEL, max: MAX_LEVEL, down: 2, up: 1, initialBoost: 1 });
  }

  private get target(): number {
    return this.series[Math.min(this.idx, this.series.length - 1)];
  }

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    hud.setScore(this.demo ? null : 0);
    this.beginTrial(t);
    if (this.ctx.autoplay) {
      const r = this.restPos();
      ghost.moveTo(r.x, r.y, { move: 0 });
    }
  }

  private restPos(): { x: number; y: number } {
    const { w, h } = this.ctx.stage;
    return { x: w * 0.8, y: h * 0.7 };
  }

  private beginTrial(t: number): void {
    this.phase = 'announce';
    this.phaseT = t;
    this.out = null;
    this.waitToast = false;
    this.level = this.demo ? MIN_LEVEL : levelOf(this.stair.level);
    this.ctx.hud.setLabel(`${this.ctx.texts.feedback.round} ${this.idx + 1} / ${this.series.length}`);
    this.ctx.hud.setProgress(this.idx / this.series.length);
    if (this.demo) this.ctx.hud.caption(this.ctx.texts.captions.remember);
  }

  update(dt: number, t: number): void {
    if (dt > 0) this.frameMs = this.frameMs * 0.9 + dt * 1000 * 0.1;
    if (this.phase === 'announce') {
      if (t - this.phaseT >= (this.demo ? DEMO_ANNOUNCE_MS : ANNOUNCE_MS)) this.startRun(t);
    } else if (this.phase === 'run') {
      const el = t - this.runT0;
      if (el >= timeoutMs(this.target)) this.resolve(timeoutMs(this.target) - this.target, true, t);
    } else if (this.phase === 'feedback') {
      if (t - this.phaseT >= (this.demo ? DEMO_FEEDBACK_MS : FEEDBACK_MS)) {
        this.idx++;
        if (this.idx >= this.series.length) {
          this.phase = 'done';
          this.phaseT = t;
          this.ctx.hud.setProgress(1);
        } else {
          this.beginTrial(t);
        }
      }
    } else if (this.phase === 'done' && !this.finished && t - this.phaseT >= 150) {
      this.end();
    }
  }

  /** „Los“ erscheint – dieser Frame ist der erste, in dem es gezeichnet wird */
  private startRun(t: number): void {
    this.phase = 'run';
    this.phaseT = t;
    this.runT0 = t;
    if (this.demo) this.ctx.hud.caption(this.ctx.texts.captions.tap);
    if (this.ctx.autoplay) this.planGhost(t);
  }

  /** Geister-Hand: Tipp so planen, dass der Finger zur gewünschten Abweichung ankommt */
  private planGhost(t: number): void {
    const { ghost, rng, stage } = this.ctx;
    let err: number;
    if (this.demo) {
      err = DEMO[this.idx].dev;
    } else {
      if (rng.chance(0.03)) return; // ab und zu verpasst → Zeitüberschreitung
      err = 40 + rng.normal() * this.target * 0.05;
    }
    const move = 250;
    const delay = Math.max(0, this.runT0 + this.target + err - t - move - 2 * this.frameMs);
    const rest = this.restPos();
    ghost.tap(stage.w * 0.72, stage.h * 0.66, { delay, move });
    ghost.moveTo(rest.x, rest.y, { delay: 400, move: 450 });
  }

  /** Tastatur: Leertaste/Enter wirkt wie ein Tipp (Computer ohne Touch). */
  keyDown(key: string, t: number): void {
    if (key !== ' ' && key !== 'Enter') return;
    const { w, h } = this.ctx.stage;
    this.pointerDown({ id: -2, x: w / 2, y: h / 2, t, type: 'mouse' });
  }

  pointerDown(p: PointerInfo): void {
    if (this.phase === 'announce') {
      if (!this.waitToast) {
        this.waitToast = true;
        const { h, u } = this.ctx.stage;
        this.ctx.hud.toast(this.ctx.texts.feedback.wait, 'info', { y: h * 0.78, ms: 900, size: clamp(u * 3.8, 16, 30) });
      }
      return;
    }
    if (this.phase !== 'run') return; // nur der erste Tipp pro Durchgang zählt
    const el = p.t - this.runT0;
    if (isAccidentalTap(el)) return;
    // Intro-Film: gezeigte Abweichung unabhängig vom Bildraster des Browsers
    const dev = this.demo && p.type === 'ghost' ? DEMO[this.idx].dev : deviationMs(p.t, this.runT0, this.target);
    this.resolve(dev, false, p.t);
  }

  private resolve(dev: number, timedOut: boolean, t: number): void {
    const { sfx, hud } = this.ctx;
    const tol = toleranceMs(this.level, this.target);
    const ok = isSuccess(dev, tol);
    this.devs.push(dev);
    this.tols.push(tol);
    this.targets.push(this.target);
    if (!this.demo) {
      this.stair.update(ok);
      this.points += trialPoints(dev, tol, this.level);
      hud.setScore(this.points);
    }
    if (ok) sfx.good();
    else sfx.tap();
    this.out = { dev, rating: rate(dev, tol), ok, timedOut, tol, t0: t };
    this.phase = 'feedback';
    this.phaseT = t;
    hud.setProgress((this.idx + 1) / this.series.length);
    if (this.demo) hud.caption(this.ctx.texts.captions.result);
  }

  private end(): void {
    this.finished = true;
    this.endT = this.ctx.now();
    const { sfx } = this.ctx;
    const s = summarize(this.devs, this.tols, this.targets);
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'meanDev', value: Math.round(s.meanAbs), unit: 'ms', better: 'lower' },
        secondary: [{ key: 'bias', value: Math.round(s.bias), unit: 'msSigned' }],
        score: this.points,
        level: MIN_LEVEL,
      });
      return;
    }
    sfx.done();
    const thr = this.stair.threshold();
    this.ctx.finish({
      primary: { key: 'meanDev', value: Math.round(s.meanAbs), unit: 'ms', better: 'lower' },
      secondary: [
        { key: 'bias', value: Math.round(s.bias), unit: 'msSigned' },
        { key: 'hits', value: s.hits, unit: 'count' },
        { key: 'level', value: clamp(Math.round(thr), MIN_LEVEL, MAX_LEVEL), unit: 'level' },
      ],
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip: tipFor(this.devs, this.targets),
    });
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, now: number): void {
    const t = Math.min(now, this.endT);
    const { w, h, u, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    const cx = w / 2;
    const cy = h * 0.42;
    if (this.phase === 'announce') this.drawAnnounce(g, t, cx, cy, u);
    else if (this.phase === 'run') this.drawRun(g, t, cx, cy, u);
    else if (this.phase === 'feedback' && this.out) this.drawFeedback(g, t, cx, cy, u, this.out);
  }

  private drawAnnounce(g: CanvasRenderingContext2D, t: number, cx: number, cy: number, u: number): void {
    const { texts, fmt } = this.ctx;
    const a = clamp((t - this.phaseT) / 220, 0, 1);
    text(g, texts.feedback.target, cx, cy - u * 13, clamp(u * 3.6, 15, 28), SAND_DIM, { weight: 600, alpha: a });
    text(g, fmt.time(this.target, 1), cx, cy, clamp(u * 17, 44, 150), C.fg, { weight: 800, alpha: a });
  }

  private drawRun(g: CanvasRenderingContext2D, t: number, cx: number, cy: number, u: number): void {
    const { texts, fmt } = this.ctx;
    const el = t - this.runT0;
    // Zielzeit bleibt klein und leise stehen (kein Zähler – nur zur Erinnerung)
    text(g, `${texts.feedback.goal}: ${fmt.time(this.target, 1)}`, cx, this.ctx.stage.h * 0.16, clamp(u * 3.6, 15, 28), SAND_DIM, { weight: 600, alpha: 0.85 });
    const R = Math.max(34, u * 11);
    if (showHelpRing(this.level)) {
      // Dezenter Hilfsring: füllt sich gleichmäßig bis zur Zielzeit, bleibt dann voll
      const f = ringFraction(el, this.target);
      ring(g, cx, cy, R, 'rgba(232,238,247,0.12)', Math.max(3, u * 0.7));
      if (f > 0) {
        g.save();
        g.beginPath();
        g.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + f * Math.PI * 2);
        g.lineWidth = Math.max(3, u * 0.7);
        g.lineCap = 'round';
        g.strokeStyle = withAlpha(SAND, 0.5);
        g.stroke();
        g.restore();
      }
    }
    circle(g, cx, cy, Math.max(3, u * 0.7), withAlpha(C.fg, 0.4));
    // „Los“ – weich ein, kurz halten, weich aus (kein Blitz)
    const a = clamp(el / GO_IN, 0, 1) * (1 - clamp((el - GO_IN - GO_HOLD) / GO_OUT, 0, 1));
    if (a > 0.01) text(g, texts.feedback.go, cx, cy - R - u * 7, clamp(u * 9, 30, 96), C.fg, { weight: 800, alpha: a });
  }

  private drawFeedback(g: CanvasRenderingContext2D, t: number, cx: number, cy: number, u: number, o: Outcome): void {
    const { texts, fmt, reducedMotion } = this.ctx;
    const a = clamp((t - o.t0) / 160, 0, 1);
    const color = o.ok ? GOOD : WARM;
    const big = clamp(u * 12, 34, 104);
    text(g, fmt.msSigned(o.dev), cx, cy - u * 2, big, color, { weight: 800, alpha: a });
    // Wort + Symbol: nie nur Farbe
    const word = o.rating === 'exact' ? texts.feedback.exact : o.dev < 0 ? texts.feedback.early : texts.feedback.late;
    const ws = clamp(u * 5, 18, 40);
    g.save();
    g.font = font(ws, 700);
    const tw = g.measureText(word).width;
    g.restore();
    const sym = ws * 0.9;
    const x0 = cx - (tw + sym * 1.4) / 2;
    const wy = cy + big * 0.72;
    g.save();
    g.globalAlpha = a;
    drawSymbol(g, x0 + sym / 2, wy, sym, o.rating === 'exact' || o.ok ? 'check' : o.dev < 0 ? 'left' : 'right', color);
    g.restore();
    text(g, word, x0 + sym * 1.4 + tw / 2, wy, ws, C.fg, { weight: 700, alpha: a });
    text(g, `${texts.feedback.yours}: ${fmt.time(this.target + o.dev, 2)}`, cx, wy + ws * 1.5, clamp(u * 3.6, 15, 28), SAND_DIM, { weight: 600, alpha: a });
    this.drawTimeline(g, t, cx, this.ctx.stage.h * 0.66, u, o, reducedMotion);
  }

  /** Zeitstrahl: Zielmarke in der Mitte, Toleranzband, eigener Tipp als Punkt (mit Beschriftung) */
  private drawTimeline(g: CanvasRenderingContext2D, t: number, cx: number, y: number, u: number, o: Outcome, calm: boolean): void {
    const { texts } = this.ctx;
    const half = Math.min(this.ctx.stage.w * 0.4, u * 34);
    const range = Math.max(o.tol * 2.4, 250);
    const k = half / range;
    const bandH = Math.max(10, u * 2.4);
    g.save();
    g.lineCap = 'round';
    g.strokeStyle = 'rgba(232,238,247,0.22)';
    g.lineWidth = Math.max(3, u * 0.6);
    g.beginPath();
    g.moveTo(cx - half, y);
    g.lineTo(cx + half, y);
    g.stroke();
    rrPath(g, cx - o.tol * k, y - bandH / 2, o.tol * 2 * k, bandH, bandH / 2);
    g.fillStyle = withAlpha(SAND, 0.18);
    g.fill();
    g.strokeStyle = C.fg;
    g.lineWidth = Math.max(2.5, u * 0.5);
    g.beginPath();
    g.moveTo(cx, y - bandH * 1.2);
    g.lineTo(cx, y + bandH * 1.2);
    g.stroke();
    g.restore();
    const fs = clamp(u * 3.2, 13, 24);
    text(g, texts.feedback.goal, cx, y - bandH * 1.2 - fs * 0.9, fs, SAND_DIM, { weight: 600 });
    // eigener Tipp (gleitet sanft hin, bei „Bewegung reduzieren“ sofort)
    const slide = calm ? 1 : easeOut((t - o.t0) / SLIDE_MS);
    const px = cx + clamp(o.dev * k, -half, half) * slide;
    const r = Math.max(8, u * 1.7);
    circle(g, px, y, r + 2.5, 'rgba(5,10,20,0.75)');
    circle(g, px, y, r, o.ok ? GOOD : WARM);
    if (Math.abs(o.dev * k) > half) text(g, o.dev < 0 ? '«' : '»', px, y + r + fs, fs * 1.2, C.fg, { weight: 800 });
  }
}

/** Kleine Symbole: Haken (innerhalb der Toleranz), Pfeil nach links (zu früh) / rechts (zu spät) */
function drawSymbol(g: CanvasRenderingContext2D, x: number, y: number, s: number, kind: 'check' | 'left' | 'right', color: string): void {
  g.save();
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.lineWidth = Math.max(3, s * 0.22);
  g.strokeStyle = color;
  g.beginPath();
  if (kind === 'check') {
    g.moveTo(x - s * 0.45, y + s * 0.02);
    g.lineTo(x - s * 0.12, y + s * 0.35);
    g.lineTo(x + s * 0.5, y - s * 0.32);
  } else {
    const d = kind === 'left' ? -1 : 1;
    g.moveTo(x - d * s * 0.5, y);
    g.lineTo(x + d * s * 0.5, y);
    g.moveTo(x + d * s * 0.12, y - s * 0.38);
    g.lineTo(x + d * s * 0.5, y);
    g.lineTo(x + d * s * 0.12, y + s * 0.38);
  }
  g.stroke();
  g.restore();
}

export const sekundenGefuehl: ExerciseDefinition = {
  id: 'sekunden-gefuehl',
  category: 'wahrnehmung',
  minutes: 2,
  color: '#8C6D4A',
  icon:
    '<circle cx="24" cy="27" r="15" fill="none" stroke="currentColor" stroke-width="3.2"/><path d="M24 27V17M18.5 6h11M24 6v6" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" fill="none"/><path d="M24 27l6.5 4.5" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><circle cx="24" cy="27" r="2.2" fill="currentColor"/><path d="M38.5 11.5l3 3" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>',
  texts: { de, it },
  create: (ctx) => new SekundenGefuehl(ctx),
};
