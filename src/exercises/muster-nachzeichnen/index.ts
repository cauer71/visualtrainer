/**
 * Muster nachzeichnen – einen kurz gezeigten Linienzug aus dem Gedächtnis mit dem Finger nachzeichnen
 * (Katalog 811, „Complex Pattern“ – hier als ehrliche Touch-Übung am Bildschirm, keine Körperübung).
 *
 * Das Original ist ein Maus-Spiel (Linienzug blitzt auf, nachziehen bei gedrückter Taste, Ähnlichkeit in Pixeln, Reihenfolge
 * nur indirekt geprüft, unerreichbare Stufen, Wackeln, roter Blitz). Hier:
 * - Ein Linienzug über 3–9 von 12 festen, unregelmäßigen Stützpunkten wird kurz gezeigt (Pfeile zeigen die Richtung, der Start
 *   ist markiert) und dann ausgeblendet. Danach zeichnest du ihn nach: Stützpunkte antippen oder mit dem Finger anfahren. Deine
 *   Linie wächst dabei mit. Kein Zeitdruck beim Zeichnen.
 * - Bewertung: Anteil der Stützpunkte, die in richtiger Reihenfolge getroffen wurden (längste gemeinsame Teilfolge). Danach
 *   siehst du das richtige Muster zusammen mit deiner Linie, ✓ an getroffenen und ✗ an verfehlten Punkten.
 * - Stufe (Staircase 2-down/1-up): Länge, kürzere Einprägezeit, ab Stufe 7 auch Kreuzungen im Linienzug (Komplexität statt Zufall).
 *   Ein Durchgang gelingt bei mindestens 80 % richtigen Punkten. Hauptwert = Stufe; Zusatz: Anteil richtig, längstes
 *   gelungenes Muster, fehlerfreie Durchgänge. Zeichentempo wird nicht belohnt.
 * - Unterschied zu „Leuchtpfad“ (Blöcke leuchten nacheinander auf, man tippt sie nach): hier erscheint der ganze Linienzug auf
 *   einmal, und man zeichnet eine Linie.
 * - Kein Rot, kein Blitz, kein Wackeln. Der Start ist als Dreieck markiert, nicht nur farblich.
 *
 * Geister-Hand (Film/Autoplay): Die Übung führt selbst eine virtuelle Hand, die den Linienzug nachzeichnet.
 */
import { background, C, circle, ring, text } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, lerp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { captionTopY, handSize, restSpot, softBadge, VirtualHand } from '../_shared/koerper-b';
import { nearestBlock } from '../leuchtpfad/logic';
import {
  ANCHORS,
  captureRadiusPx,
  crossingChanceFor,
  exposureMsFor,
  makePattern,
  MAX_LEVEL,
  MIN_LEVEL,
  patternLengthFor,
  planTrace,
  pointsFor,
  type Score,
  scorePattern,
  Tracer,
} from './logic';
import { de, it } from './texts';

const ROUNDS = 8;
const QUICK_ROUNDS = 2;
const PRE_MS = 700;
const FADE_IN_MS = 200;
const FADE_OUT_MS = 320;
const FB_MS = 2400;
const END_MS = 1300;
const IDLE_LIMIT_MS = 25000;
const START_LEVEL = 2;
const DEMO_LEVEL = 2;
const DEMO_N = 4;
const DEMO_EXPOSURE = 2800;
const VF_ID = -2;

const SKY = '#7DD3FC';
const LINE = '#BAE6FD';
const MINE = '#FDE68A';

type Phase = 'pre' | 'show' | 'draw' | 'fb' | 'end' | 'done';

interface Field {
  x0: number;
  y0: number;
  w: number;
  h: number;
  aspect: number;
  cap: number;
  r: number;
}

interface Auto {
  st: 'idle' | 'approach' | 'trace' | 'after';
  t0: number;
  dur: number;
  plan: number[];
  leg: number;
  from: { x: number; y: number };
  captioned: number;
}

class MusterNachzeichnen implements Exercise {
  private readonly stair: Staircase;
  private readonly total: number;
  private phase: Phase = 'pre';
  private phaseT = 0;
  private field: Field = { x0: 0, y0: 0, w: 100, h: 100, aspect: 1, cap: 30, r: 10 };
  // Durchgang
  private level = MIN_LEVEL;
  private n = 3;
  private exposure = 2500;
  private seq: number[] = [];
  private prevSeq: number[] | undefined;
  private tracer = new Tracer(3);
  private finger: { id: number; x: number; y: number } | null = null;
  private lastDrawAt = 0;
  private score: Score | null = null;
  // Auswertung
  private rounds = 0;
  private passed = 0;
  private perfect = 0;
  private matchedSum = 0;
  private nSum = 0;
  private longest = 0;
  private points = 0;
  // virtuelle Hand
  private readonly vh = new VirtualHand();
  private auto: Auto = { st: 'idle', t0: 0, dur: 600, plan: [], leg: 0, from: { x: 0, y: 0 }, captioned: 0 };

  constructor(private readonly ctx: ExerciseContext) {
    const s = Math.round(ctx.startLevel ?? START_LEVEL);
    const start = clamp(Number.isFinite(s) ? s : START_LEVEL, MIN_LEVEL, MAX_LEVEL);
    this.stair = new Staircase({ start, min: MIN_LEVEL, max: MAX_LEVEL, down: 2, up: 1 });
    this.total = ctx.mode === 'demo' ? 1 : ctx.quick ? QUICK_ROUNDS : ROUNDS;
  }

  private get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  // ------------------------------------------------------------------ Geometrie

  private layout(): void {
    const { w, h, u } = this.ctx.stage;
    const pu = Math.max(u, 6);
    const left = 5 * pu;
    const top = this.demo ? 5 * pu : 14 * pu;
    const bottom = this.demo ? captionTopY(this.ctx.stage) - 2 * pu : h - 4 * pu;
    const availW = Math.max(120, w - 2 * left);
    const availH = Math.max(120, bottom - top);
    const aspect = clamp(availW / availH, 0.6, 1.7);
    const fw = Math.min(availW, availH * aspect);
    const fh = fw / aspect;
    this.field = {
      x0: (w - fw) / 2,
      y0: top + (availH - fh) / 2,
      w: fw,
      h: fh,
      aspect,
      cap: captureRadiusPx(fw, fh),
      r: clamp(0.028 * Math.min(fw, fh), 9, 18),
    };
  }

  private px(i: number): { x: number; y: number } {
    const f = this.field;
    return { x: f.x0 + ANCHORS[i].x * f.w, y: f.y0 + ANCHORS[i].y * f.h };
  }

  private centers(): Array<{ x: number; y: number }> {
    return ANCHORS.map((_, i) => this.px(i));
  }

  // ------------------------------------------------------------------ Ablauf

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.layout();
    const rp = restSpot(this.ctx.stage, this.demo);
    this.vh.snap(rp.x, rp.y);
    if (this.ctx.autoplay) ghost.hide();
    this.newRound(t);
  }

  private newRound(t: number): void {
    const { rng, hud, texts } = this.ctx;
    this.layout();
    this.level = this.demo ? DEMO_LEVEL : Math.floor(this.stair.level + 1e-9);
    this.n = this.demo ? DEMO_N : patternLengthFor(this.level);
    this.exposure = this.demo ? DEMO_EXPOSURE : exposureMsFor(this.level, this.n);
    const allow = this.demo ? false : rng.chance(crossingChanceFor(this.level));
    this.seq = makePattern(rng, { n: this.n, aspect: this.field.aspect, allowCrossing: allow, prev: this.prevSeq });
    this.prevSeq = this.seq;
    this.tracer = new Tracer(this.n);
    this.finger = null;
    this.score = null;
    this.phase = 'pre';
    this.phaseT = t;
    this.auto = { ...this.auto, st: 'idle', plan: [], leg: 0, captioned: 0 };
    if (this.demo) hud.caption(texts.captions.watch);
    else hud.setLabel(`${texts.feedback.level} ${this.level} · ${Math.min(this.rounds + 1, this.total)}/${this.total}`);
  }

  update(dt: number, t: number): void {
    if (this.phase === 'done') return;
    const { ctx } = this;
    this.vh.update(t);
    if (this.phase === 'pre' && t - this.phaseT >= PRE_MS) {
      this.phase = 'show';
      this.phaseT = t;
    } else if (this.phase === 'show' && t - this.phaseT >= FADE_IN_MS + this.exposure + FADE_OUT_MS) {
      this.phase = 'draw';
      this.phaseT = t;
      this.lastDrawAt = t;
      if (this.demo) ctx.hud.caption(ctx.texts.captions.draw);
    } else if (this.phase === 'draw') {
      if (t - this.lastDrawAt > IDLE_LIMIT_MS) this.evaluate(t);
    }
    if (ctx.autoplay) this.autoUpdate(dt, t);
    if (this.phase === 'fb' && t - this.phaseT >= FB_MS) this.afterFeedback(t);
    if (this.phase === 'end' && t - this.phaseT >= END_MS) {
      this.phase = 'done';
      ctx.hud.caption(null);
      ctx.finish({ primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' }, secondary: [], score: 0, level: MIN_LEVEL });
    }
  }

  private afterFeedback(t: number): void {
    if (this.demo) {
      this.phase = 'end';
      this.phaseT = t;
      return;
    }
    if (this.rounds >= this.total) this.finish();
    else this.newRound(t);
  }

  private evaluate(t: number): void {
    const { ctx } = this;
    this.finger = null;
    this.vh.holding = false;
    const sc = scorePattern(this.seq, this.tracer.drawn);
    this.score = sc;
    this.phase = 'fb';
    this.phaseT = t;
    if (!this.demo) {
      this.rounds++;
      this.matchedSum += sc.matched;
      this.nSum += this.n;
      if (sc.passed) {
        this.passed++;
        this.longest = Math.max(this.longest, this.n);
      }
      if (sc.matched >= this.n) this.perfect++;
      this.points += pointsFor(this.level, sc.matched);
      this.stair.update(sc.passed);
      ctx.hud.setScore(this.points);
      ctx.hud.setProgress(this.rounds / this.total);
    }
    if (sc.passed) ctx.sfx.good();
    else ctx.sfx.tap();
    const size = clamp(ctx.stage.u * 4.4, 17, 32);
    ctx.hud.toast(`${sc.passed ? '✓' : '•'} ${sc.matched}/${this.n} ${ctx.texts.feedback.points}`, sc.passed ? 'good' : 'info', {
      x: ctx.stage.w / 2,
      y: Math.max(size * 1.5, this.field.y0 - size * 0.2),
      ms: FB_MS - 300,
      size,
    });
    if (this.demo) ctx.hud.caption(ctx.texts.captions.check);
  }

  // ------------------------------------------------------------------ Eingabe

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'draw' || this.finger) return;
    this.finger = { id: p.id, x: p.x, y: p.y };
    this.lastDrawAt = p.t;
    this.touch(p.x, p.y, p.t);
  }

  pointerMove(p: PointerInfo): void {
    const f = this.finger;
    if (!f || p.id !== f.id || this.phase !== 'draw') return;
    f.x = p.x;
    f.y = p.y;
    this.touch(p.x, p.y, p.t);
  }

  pointerUp(p: PointerInfo): void {
    const f = this.finger;
    if (!f || p.id !== f.id) return;
    this.finger = null;
    this.lastDrawAt = p.t;
  }

  /** Finger ist an der Stelle: Stützpunkt im Fangradius zählen */
  private touch(x: number, y: number, t: number): void {
    const a = nearestBlock(x, y, this.centers(), this.field.cap);
    if (a < 0) return;
    if (!this.tracer.add(a)) return;
    this.lastDrawAt = t;
    this.ctx.sfx.tick();
    if (this.tracer.full) this.evaluate(t);
  }

  // ------------------------------------------------------------------ virtuelle Hand (Film / Autoplay)

  private autoUpdate(dt: number, t: number): void {
    const { rng, stage } = this.ctx;
    const A = this.auto;
    const demo = this.demo;
    const info = (): PointerInfo => ({ id: VF_ID, x: this.vh.x, y: this.vh.y, t, type: 'ghost' });
    if (A.st === 'idle' && this.phase === 'draw') {
      const react = demo ? 700 : rng.range(500, 1000);
      if (t - this.phaseT < react) return;
      A.plan = planTrace(rng, this.seq, this.level, demo);
      A.leg = 0;
      const p0 = this.px(A.plan[0]);
      A.t0 = t;
      A.dur = demo ? 750 : rng.range(450, 700);
      A.st = 'approach';
      this.vh.glide(p0.x, p0.y, t, A.dur);
      return;
    }
    if (A.st === 'approach') {
      if (t - A.t0 < A.dur) return;
      const p0 = this.px(A.plan[0]);
      this.vh.snap(p0.x, p0.y);
      this.vh.press(t);
      this.vh.holding = true;
      this.pointerDown(info());
      A.st = 'trace';
      A.leg = 1;
      A.from = { x: p0.x, y: p0.y };
      A.t0 = t;
      this.setTraceLeg();
      return;
    }
    if (A.st === 'trace') {
      if (this.phase !== 'draw' || !this.finger) {
        this.vh.holding = false;
        A.st = 'after';
        return;
      }
      if (A.leg >= A.plan.length) {
        // alle angefahren, aber nicht alle gezählt (z. B. doppelte Punkte): Finger lösen
        this.vh.holding = false;
        this.pointerUp(info());
        A.st = 'after';
        return;
      }
      const to = this.px(A.plan[A.leg]);
      const k = clamp((t - A.t0) / A.dur, 0, 1);
      const e = k * k * (3 - 2 * k);
      this.vh.snap(lerp(A.from.x, to.x, e), lerp(A.from.y, to.y, e));
      this.pointerMove(info());
      if (k >= 1 && this.phase === 'draw') {
        A.leg++;
        A.from = { x: to.x, y: to.y };
        A.t0 = t;
        this.setTraceLeg();
      }
      return;
    }
    if (A.st === 'after' && this.phase !== 'draw') {
      const rp = restSpot(stage, demo);
      const q = 1 - Math.exp(-dt * 3);
      this.vh.snap(lerp(this.vh.x, rp.x, q), lerp(this.vh.y, rp.y, q));
    }
  }

  private setTraceLeg(): void {
    const A = this.auto;
    if (A.leg >= A.plan.length) return;
    const a = A.from;
    const b = this.px(A.plan[A.leg]);
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    const speed = this.demo ? 320 : this.ctx.rng.range(520, 760);
    A.dur = Math.max(this.demo ? 600 : 280, (len / speed) * 1000);
  }

  // ------------------------------------------------------------------ Größenänderung

  resize(): void {
    const oldAspect = this.field.aspect;
    this.layout();
    if (Math.abs(oldAspect - this.field.aspect) > 0.05 && (this.phase === 'show' || this.phase === 'draw')) {
      // Seitenverhältnis des Feldes hat sich geändert: Durchgang neu beginnen (ohne Wertung)
      this.newRound(this.ctx.now());
      this.vh.holding = false;
    }
    const rp = restSpot(this.ctx.stage, this.demo);
    if (!this.vh.gliding && this.auto.st === 'idle') this.vh.snap(rp.x, rp.y);
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    const f = this.field;
    // Feld: zarter Rahmen
    g.save();
    g.strokeStyle = 'rgba(232,238,247,0.12)';
    g.lineWidth = 2;
    g.strokeRect(f.x0 - f.r * 1.4, f.y0 - f.r * 1.4, f.w + f.r * 2.8, f.h + f.r * 2.8);
    g.restore();
    const showA = this.showAlpha(t);
    this.drawAnchors(g);
    if (showA > 0) this.drawPattern(g, this.seq, showA, LINE, 4, true);
    if (this.phase === 'draw' || this.phase === 'fb' || this.phase === 'end') this.drawMine(g);
    if (this.phase === 'fb' || this.phase === 'end') this.drawResult(g, t);
    this.drawProgressDots(g);
    if (this.phase === 'pre' || this.phase === 'show' || this.phase === 'draw') this.drawStartMark(g, t);
    if (this.ctx.autoplay) this.vh.render(g, t, handSize(this.ctx.stage));
  }

  private showAlpha(t: number): number {
    if (this.phase !== 'show') return 0;
    const e = t - this.phaseT;
    const a = this.ctx.reducedMotion ? 1 : clamp(e / FADE_IN_MS, 0, 1);
    const out = this.ctx.reducedMotion ? (e > FADE_IN_MS + this.exposure ? 0 : 1) : clamp((FADE_IN_MS + this.exposure + FADE_OUT_MS - e) / FADE_OUT_MS, 0, 1);
    return Math.min(a, out);
  }

  private drawAnchors(g: CanvasRenderingContext2D): void {
    const { r } = this.field;
    const used = new Set(this.tracer.drawn);
    for (let i = 0; i < ANCHORS.length; i++) {
      const p = this.px(i);
      const on = used.has(i) && this.phase !== 'pre' && this.phase !== 'show';
      ring(g, p.x, p.y, r, on ? MINE : 'rgba(232,238,247,0.4)', on ? 3 : 2);
      circle(g, p.x, p.y, Math.max(2, r * 0.22), on ? MINE : 'rgba(232,238,247,0.5)');
    }
  }

  /** Linienzug mit Pfeilen; die Startmarke ist ein Dreieck an der ersten Stelle */
  private drawPattern(g: CanvasRenderingContext2D, seq: readonly number[], alpha: number, color: string, width: number, arrows: boolean, dash?: number[]): void {
    if (seq.length < 2) return;
    const { r } = this.field;
    g.save();
    g.globalAlpha = alpha;
    g.strokeStyle = color;
    g.fillStyle = color;
    g.lineWidth = width;
    g.lineJoin = 'round';
    g.lineCap = 'round';
    if (dash) g.setLineDash(dash);
    g.beginPath();
    seq.forEach((i, k) => {
      const p = this.px(i);
      if (k) g.lineTo(p.x, p.y);
      else g.moveTo(p.x, p.y);
    });
    g.stroke();
    g.setLineDash([]);
    if (arrows) {
      for (let k = 0; k + 1 < seq.length; k++) {
        const a = this.px(seq[k]);
        const b = this.px(seq[k + 1]);
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        const ang = Math.atan2(b.y - a.y, b.x - a.x);
        const s = r * 0.95;
        g.save();
        g.translate(mx, my);
        g.rotate(ang);
        g.beginPath();
        g.moveTo(s, 0);
        g.lineTo(-s * 0.7, -s * 0.75);
        g.lineTo(-s * 0.7, s * 0.75);
        g.closePath();
        g.fill();
        g.restore();
      }
    }
    // Punkte des Linienzugs als gefüllte Kreise
    for (const i of seq) {
      const p = this.px(i);
      circle(g, p.x, p.y, r * 0.75, color);
    }
    g.restore();
  }

  /** Start des Musters: Dreieck (Pfeil nach rechts) und Beschriftung neben dem ersten Punkt */
  private drawStartMark(g: CanvasRenderingContext2D, t: number): void {
    if (!this.seq.length) return;
    const p = this.px(this.seq[0]);
    const { r } = this.field;
    const pulse = this.ctx.reducedMotion ? 0.8 : 0.6 + 0.25 * Math.sin(t / 420);
    g.save();
    g.globalAlpha = this.phase === 'pre' ? 0.5 : pulse;
    ring(g, p.x, p.y, r * 1.9, C.white, 2.5, [7, 6]);
    g.restore();
    g.save();
    g.fillStyle = C.white;
    g.beginPath();
    const s = r * 0.9;
    const bx = p.x;
    const by = p.y - r * 3.0;
    g.moveTo(bx - s, by - s * 0.8);
    g.lineTo(bx + s, by - s * 0.8);
    g.lineTo(bx, by + s * 0.6);
    g.closePath();
    g.fill();
    g.restore();
    const size = clamp(r * 1.25, 12, 20);
    text(g, this.ctx.texts.feedback.start, p.x, by - s * 0.8 - size * 0.8, size, C.white, { weight: 800 });
  }

  /** Gezeichnete Linie (Stützpunkte, die du getroffen hast) und der Faden zum Finger */
  private drawMine(g: CanvasRenderingContext2D): void {
    const d = this.tracer.drawn;
    const { r } = this.field;
    g.save();
    g.strokeStyle = MINE;
    g.lineWidth = Math.max(3.5, r * 0.5);
    g.lineJoin = 'round';
    g.lineCap = 'round';
    g.globalAlpha = this.phase === 'draw' ? 0.95 : 0.75;
    g.beginPath();
    d.forEach((i, k) => {
      const p = this.px(i);
      if (k) g.lineTo(p.x, p.y);
      else g.moveTo(p.x, p.y);
    });
    if (this.phase === 'draw' && this.finger && d.length) g.lineTo(this.finger.x, this.finger.y);
    g.stroke();
    g.restore();
    // Nummern an den angefahrenen Punkten
    if (this.phase === 'draw') {
      const size = clamp(r * 1.1, 10, 18);
      d.forEach((i, k) => {
        const p = this.px(i);
        text(g, String(k + 1), p.x + r * 1.5, p.y - r * 1.5, size, MINE, { weight: 800 });
      });
    }
    if (this.finger && this.phase === 'draw') ring(g, this.finger.x, this.finger.y, Math.max(14, r * 1.6), 'rgba(255,255,255,0.6)', 2.5);
  }

  /** Nach der Wertung: richtiges Muster (gestrichelt) mit ✓/✗ an jedem Stützpunkt */
  private drawResult(g: CanvasRenderingContext2D, t: number): void {
    const sc = this.score;
    if (!sc) return;
    const a = this.ctx.reducedMotion ? 1 : clamp((t - this.phaseT) / 250, 0, 1);
    this.drawPattern(g, this.seq, 0.9 * a, SKY, 3, true, [9, 7]);
    const { r } = this.field;
    const br = clamp(r * 1.05, 11, 18);
    for (let k = 0; k < this.seq.length; k++) {
      const p = this.px(this.seq[k]);
      g.save();
      g.globalAlpha = a;
      softBadge(g, p.x + r * 1.7, p.y - r * 1.7, br, sc.matches[k] ? 'ok' : 'bad');
      g.restore();
    }
  }

  /** n Punkte oben: gefüllt für bereits angefahrene Stützpunkte */
  private drawProgressDots(g: CanvasRenderingContext2D): void {
    if (this.phase !== 'draw') return;
    const f = this.field;
    const rr = clamp(f.r * 0.45, 4, 8);
    const gap = rr * 3;
    const total = this.n * gap;
    const x0 = this.ctx.stage.w / 2 - total / 2 + gap / 2;
    const y = Math.max(rr * 2, f.y0 - f.r * 3.2);
    for (let k = 0; k < this.n; k++) {
      const x = x0 + k * gap;
      if (k < this.tracer.drawn.length) circle(g, x, y, rr, MINE);
      else ring(g, x, y, rr, 'rgba(232,238,247,0.5)', 2);
    }
    const size = clamp(rr * 2.2, 11, 18);
    text(g, `${this.tracer.drawn.length}/${this.n}`, x0 + total - gap / 2 + rr * 3, y, size, C.dim, { align: 'left', weight: 700 });
  }

  // ------------------------------------------------------------------ Ergebnis

  private finish(): void {
    const { ctx } = this;
    this.phase = 'done';
    ctx.hud.setProgress(1);
    ctx.sfx.done();
    const thr = this.stair.threshold();
    const acc = this.nSum > 0 ? (100 * this.matchedSum) / this.nSum : 0;
    let tip = 'great';
    if (acc < 55) tip = 'chunk';
    else if (acc < 85) tip = 'order';
    ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), MIN_LEVEL, MAX_LEVEL), unit: 'level', better: 'higher' },
      secondary: [
        { key: 'accuracy', value: Math.round(acc), unit: 'percent' },
        { key: 'longest', value: this.longest, unit: 'count' },
        { key: 'perfect', value: this.perfect, unit: 'count' },
      ],
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip,
    });
  }
}

export const musterNachzeichnen: ExerciseDefinition = {
  id: 'muster-nachzeichnen',
  category: 'gedaechtnis',
  minutes: 2,
  color: '#2F8F83',
  showsLevel: true,
  icon:
    '<path d="M8 36L18 14l10 16 12-20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="8" cy="36" r="4.4" fill="currentColor"/><circle cx="18" cy="14" r="3.4" fill="none" stroke="currentColor" stroke-width="2.6"/><circle cx="28" cy="30" r="3.4" fill="none" stroke="currentColor" stroke-width="2.6"/><circle cx="40" cy="10" r="3.4" fill="none" stroke="currentColor" stroke-width="2.6"/>',
  texts: { de, it },
  create: (ctx) => new MusterNachzeichnen(ctx),
};

