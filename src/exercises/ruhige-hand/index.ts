/**
 * Ruhige Hand – einen Ball mit dem Finger durch eine schmale, kurvige Bahn führen, ohne die Wand zu berühren
 * (Katalog 705, „Heißer Draht“ – hier freundlich und für den Finger gebaut).
 *
 * Gegenüber dem Vorbild (Maus mit Pointer Lock, Start zurück bei jedem Fehler, roter Blitz, unsichtbare Kollisionsprüfung
 * nur pro Bild, Schlupfloch beim Tippen auf das Ziel):
 * - Finger-Eingabe: Der Ball sitzt ≈ 6 u über dem Finger (Finger verdeckt nichts); der Finger setzt in einem großzügigen
 *   Kreis unter dem Ball auf und hält danach seinen Abstand (kein Sprung). Abheben = Pause: Ball bleibt stehen, die Uhr
 *   (Zeit auf der Bahn) steht still; weiter geht es, wenn der Finger wieder unter dem Ball aufgesetzt wird.
 * - Die Bahn ist kurvig (zwei Sinuswellen, neue Phase je Durchgang), die Breite sinkt mit der Stufe (13 u → ≈ 7 u),
 *   Kurvenhöhe und -zahl steigen. Die ganze Bahn ist von Anfang an zu sehen.
 * - Der Ball kann die Bahn nicht verlassen: Wer die Wand berührt, sieht ihn am Rand gleiten und ein weiches ✗ – kein Rot,
 *   kein Blitz, kein Wackeln, kein Rücksprung zum Start. Die Strecke zwischen zwei Bildern wird in kleinen Schritten
 *   geprüft, die Wand lässt sich nicht überspringen; ins Ziel kommt man nur entlang der Bahn.
 * - Kein Zeitdruck. Stufe: Staircase 2-down/1-up; ein Durchgang ist „sauber“ bei höchstens einer Berührung.
 *   Hauptwert = Stufe; Zusatzwerte: Berührungen, Zeit auf der Bahn (%), saubere Durchgänge.
 * - Gemessen werden Berührungen der Wand und die Zeit an der Wand – keine Aussage über Zittern oder Gesundheit.
 *
 * Geister-Hand (Film/Autoplay): Die Engine kann nur Tipps simulieren. Für das Führen führt die Übung selbst einen
 * „virtuellen Finger“ und zeichnet die Hand.
 */
import { background, C, circle, hand, orb, ring, text, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeInOut, lerp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo } from '../../core/types';
import {
  BALL_R_U,
  CLEAN_TOUCHES,
  type Corridor,
  fingerOffsetPx,
  grabRadiusPx,
  makeCorridor,
  MAX_LEVEL,
  MIN_LEVEL,
  moveBall,
  PathTime,
  pointsFor,
  type Pt,
  samplePath,
  TouchCounter,
} from './logic';
import { de, it } from './texts';

const ROUNDS = 6;
const QUICK_ROUNDS = 2;
const FB_MS = 1700;
const END_MS = 1300;
const CUE_MS = 900;
const START_LEVEL = 2;
const VF_ID = -2;
/** Dauer der Fahrt im Intro-Film (s) */
const DEMO_CARRY_S = 6.3;
const DEMO_LEVEL = 2;
const MIN_PU = 7.4;

const BLUE = '#38A3DC';
const BLUE_LIGHT = '#9BD8F5';
const WALL = 'rgba(147,205,245,0.92)';
const FLOOR = '#10233D';
const BALL = '#FDE68A';

type Phase = 'play' | 'fb' | 'end' | 'done';

interface Finger {
  id: number;
  /** Abstand Finger − Ball in px, beim Aufsetzen festgelegt */
  gx: number;
  gy: number;
  x: number;
  y: number;
}

interface Auto {
  st: 'idle' | 'approach' | 'carry' | 'after';
  t0: number;
  from: Pt;
  to: Pt;
  dur: number;
  carryT0: number;
  speed: number;
  bumps: { at: number; len: number }[];
  captioned: number;
}

/** Oberkante der Bildunterschrift im Intro-Film (gleiche Formel wie im Runner) */
function captionTop(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return s.h - size * 2.1 - s.h * 0.05;
}

class RuhigeHand implements Exercise {
  private readonly stair: Staircase;
  private readonly total: number;
  private phase: Phase = 'play';
  private phaseT = 0;
  // Geometrie (aus der Bühnengröße)
  private pu = MIN_PU;
  private x0 = 0;
  private y0 = 0;
  private lenU = 100;
  private maxAmp = 20;
  private off = 46;
  private ballPx = 10;
  // Durchgang
  private level = MIN_LEVEL;
  private cor!: Corridor;
  private path: Pt[] = [];
  private ball: Pt = { x: 0, y: 0 };
  private finger: Finger | null = null;
  private contact = false;
  private hadContact = false;
  private counter = new TouchCounter();
  private time = new PathTime();
  private started = false;
  private cueT = -1e9;
  private hintedAt = -1e9;
  private lastClean = false;
  private maxX = 0;
  // Auswertung
  private rounds = 0;
  private cleanRounds = 0;
  private touchSum = 0;
  private freeSum = 0;
  private timeSum = 0;
  private points = 0;
  // virtueller Finger (Film / Autoplay)
  private vf: Pt = { x: 0, y: 0 };
  private auto: Auto = { st: 'idle', t0: 0, from: { x: 0, y: 0 }, to: { x: 0, y: 0 }, dur: 700, carryT0: 0, speed: 18, bumps: [], captioned: 0 };

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

  private geometry(): void {
    const { w, h, u } = this.ctx.stage;
    this.pu = Math.max(u, MIN_PU);
    this.ballPx = Math.max(10, BALL_R_U * this.pu);
    this.off = fingerOffsetPx(u, this.ballPx);
    const mx = 7 * this.pu;
    this.x0 = mx;
    this.lenU = Math.max(30, (w - 2 * mx) / this.pu);
    const top = this.demo ? 5 * this.pu : 13 * this.pu;
    const bottom = (this.demo ? captionTop(this.ctx.stage) - 2 * this.pu : h - 3 * this.pu) - this.off;
    this.y0 = (top + bottom) / 2;
    const halfU = (bottom - top) / 2 / this.pu;
    this.maxAmp = Math.max(2, halfU - 7 - 1);
  }

  private px(p: Pt): Pt {
    return { x: this.x0 + p.x * this.pu, y: this.y0 + p.y * this.pu };
  }

  private toU(x: number, y: number): Pt {
    return { x: (x - this.x0) / this.pu, y: (y - this.y0) / this.pu };
  }

  /** Stelle, an der der Finger aufsetzen soll (unter dem Ball) */
  private grabPoint(): Pt {
    const b = this.px(this.ball);
    return { x: b.x, y: b.y + this.off };
  }

  // ------------------------------------------------------------------ Ablauf

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.geometry();
    this.vf = this.restPoint();
    if (this.ctx.autoplay) ghost.hide(); // die Hand zeichnet diese Übung selbst
    this.newRound(t);
  }

  private newRound(t: number): void {
    const { rng, hud, texts } = this.ctx;
    this.level = this.demo ? DEMO_LEVEL : Math.floor(this.stair.level + 1e-9);
    this.geometry();
    this.cor = makeCorridor(rng, this.level, this.lenU, this.maxAmp);
    this.path = samplePath(this.cor);
    this.ball = { x: 0, y: this.cor.center(0) };
    this.maxX = 0;
    this.finger = null;
    this.contact = false;
    this.counter = new TouchCounter();
    this.time = new PathTime();
    this.started = false;
    this.cueT = -1e9;
    this.phase = 'play';
    this.phaseT = t;
    const a = this.auto;
    this.auto = { ...a, st: 'idle', bumps: [], captioned: 0 };
    if (this.demo) hud.caption(texts.captions.place);
    else hud.setLabel(`${texts.feedback.level} ${this.level} · ${Math.min(this.rounds + 1, this.total)}/${this.total}`);
  }

  update(dt: number, t: number): void {
    if (this.phase === 'done') return;
    const { ctx } = this;
    if (this.phase === 'play') {
      if (this.finger) {
        // auch eine Berührung zwischen zwei Bildern zählt für die Zeit an der Wand
        this.time.add(dt, this.contact || this.hadContact);
        this.hadContact = false;
        this.counter.update(this.contact, t);
      } else this.hadContact = false;
      if (!this.demo) {
        ctx.hud.setProgress((this.rounds + clamp(this.maxX / this.cor.length, 0, 1)) / this.total);
      }
    }
    if (ctx.autoplay) this.autoUpdate(dt, t);
    if (this.phase === 'fb' && t - this.phaseT >= FB_MS) this.afterFeedback(t);
    if (this.phase === 'end' && t - this.phaseT >= END_MS) {
      this.phase = 'done';
      ctx.hud.caption(null);
      ctx.finish({ primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' }, secondary: [], score: 0, level: MIN_LEVEL });
    }
  }

  private onTouch(t: number): void {
    this.ctx.sfx.bad();
    this.cueT = t;
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

  // ------------------------------------------------------------------ Eingabe

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'play' || this.finger) return;
    const g = this.grabPoint();
    if (Math.hypot(p.x - g.x, p.y - g.y) > grabRadiusPx(this.ctx.stage.u)) {
      // Daneben getippt: einmal kurz erklären (nicht bei jedem Tipp)
      if (!this.demo && p.t - this.hintedAt > 4000) {
        this.hintedAt = p.t;
        this.ctx.hud.toast(this.ctx.texts.feedback.hint, 'info', { x: g.x, y: Math.max(20, g.y + this.off * 0.9), ms: 1600, size: clamp(this.ctx.stage.u * 3.6, 15, 26) });
      }
      return;
    }
    const b = this.px(this.ball);
    this.finger = { id: p.id, gx: p.x - b.x, gy: p.y - b.y, x: p.x, y: p.y };
    this.started = true;
    this.ctx.sfx.tap();
    if (this.demo && this.auto.captioned < 1) {
      this.auto.captioned = 1;
      this.ctx.hud.caption(this.ctx.texts.captions.guide);
    }
  }

  pointerMove(p: PointerInfo): void {
    const f = this.finger;
    if (!f || p.id !== f.id || this.phase !== 'play') return;
    f.x = p.x;
    f.y = p.y;
    const target = this.toU(p.x - f.gx, p.y - f.gy);
    const r = moveBall(this.cor, this.ball, target);
    this.ball = { x: r.x, y: r.y };
    this.contact = r.contact;
    if (r.contact) this.hadContact = true;
    if (this.counter.update(r.contact, p.t)) this.onTouch(p.t);
    this.maxX = Math.max(this.maxX, this.ball.x);
    if (this.ball.x >= this.cor.length - 0.6) this.finishRound(p.t);
  }

  pointerUp(p: PointerInfo): void {
    const f = this.finger;
    if (!f || p.id !== f.id) return;
    this.finger = null;
    this.contact = false;
    this.counter.update(false, p.t);
  }

  private finishRound(t: number): void {
    const { ctx } = this;
    this.finger = null;
    this.contact = false;
    this.lastClean = this.counter.touches <= CLEAN_TOUCHES;
    this.phase = 'fb';
    this.phaseT = t;
    if (!this.demo) {
      this.rounds++;
      this.touchSum += this.counter.touches;
      this.freeSum += this.time.free;
      this.timeSum += this.time.total;
      this.points += pointsFor(this.level, this.counter.touches);
      if (this.lastClean) this.cleanRounds++;
      this.stair.update(this.lastClean);
      ctx.hud.setScore(this.points);
      ctx.hud.setProgress(this.rounds / this.total);
    }
    const fb = ctx.texts.feedback;
    if (this.lastClean) ctx.sfx.good();
    else ctx.sfx.tap();
    const { w } = ctx.stage;
    const size = clamp(ctx.stage.u * 4.6, 18, 34);
    ctx.hud.toast(this.lastClean ? fb.clean : fb.done, this.lastClean ? 'good' : 'info', { x: w / 2, y: size * 3.2, ms: FB_MS - 200, size });
    if (this.demo) ctx.hud.caption(ctx.texts.captions.goal);
  }

  // ------------------------------------------------------------------ virtueller Finger (Film / Autoplay)

  private restPoint(): Pt {
    const { w, h } = this.ctx.stage;
    const hs = clamp(this.ctx.stage.u * 13, 48, 110);
    return { x: w - hs * 0.75, y: this.demo ? captionTop(this.ctx.stage) - hs * 0.95 : h - hs * 0.7 };
  }

  private autoUpdate(dt: number, t: number): void {
    const { rng, texts, hud } = this.ctx;
    const A = this.auto;
    const demo = this.demo;
    const info = (p: Pt): PointerInfo => ({ id: VF_ID, x: p.x, y: p.y, t, type: 'ghost' });
    if (A.st === 'idle' && this.phase === 'play') {
      const react = demo ? 900 : rng.range(400, 800);
      if (t - this.phaseT >= react) {
        // Finger setzt unter dem Ball auf (mit kleiner Ungenauigkeit)
        const g = this.grabPoint();
        A.st = 'approach';
        A.t0 = t;
        A.from = { ...this.vf };
        A.to = { x: g.x + (demo ? 0 : rng.range(-6, 6)), y: g.y + (demo ? 0 : rng.range(-5, 5)) };
        A.dur = demo ? 800 : rng.range(450, 700);
      }
      return;
    }
    if (A.st === 'approach') {
      const k = clamp((t - A.t0) / A.dur, 0, 1);
      const e = easeInOut(k);
      this.vf = { x: lerp(A.from.x, A.to.x, e), y: lerp(A.from.y, A.to.y, e) };
      if (k >= 1) {
        this.pointerDown(info(this.vf));
        A.st = 'carry';
        A.carryT0 = t;
        A.speed = demo ? this.cor.length / DEMO_CARRY_S : clamp(rng.range(15, 22) - 0.35 * (this.level - 1), 9, 22);
        // Gelegentlich ein Ausrutscher (nur im Spielmodus)
        A.bumps = [];
        if (!demo) {
          const n = rng.chance(0.14 + 0.03 * this.level) ? (rng.chance(0.35) ? 2 : 1) : 0;
          for (let i = 0; i < n; i++) A.bumps.push({ at: rng.range(0.2, 0.85) * this.cor.length, len: rng.range(1.6, 2.6) });
        }
      }
      return;
    }
    if (A.st === 'carry') {
      if (this.phase !== 'play' || !this.finger) {
        A.st = 'after';
        return;
      }
      // Sollposition des Balls: entlang der Bahn mit gleichmäßiger Geschwindigkeit, leichtes Zittern nur im Spielmodus
      const s = Math.min(this.cor.length, (t - A.carryT0) / 1000 * A.speed);
      let lat = demo ? 0.25 * this.cor.free * Math.sin((t - A.carryT0) / 500) : rng.range(-0.06, 0.06) * this.cor.free + 0.22 * this.cor.free * Math.sin((t - A.carryT0) / 430);
      for (const b of A.bumps) {
        const d = (s - b.at) / b.len;
        if (Math.abs(d) < 1) lat += (this.cor.free * 2.2 + 0.4) * (0.5 + 0.5 * Math.cos(Math.PI * d));
      }
      const k = Math.sqrt(1 + this.cor.slope(s) ** 2);
      const aim = this.px({ x: s, y: this.cor.center(s) + lat * k });
      // Finger = Ball + fester Abstand (beim Aufsetzen festgelegt)
      const f = this.finger;
      const target = { x: aim.x + f.gx, y: aim.y + f.gy };
      const rate = demo ? 9 : 7;
      const q = 1 - Math.exp(-dt * rate);
      this.vf = { x: clamp(lerp(this.vf.x, target.x, q), 2, this.ctx.stage.w - 2), y: clamp(lerp(this.vf.y, target.y, q), 2, this.ctx.stage.h - 2) };
      this.pointerMove(info(this.vf));
      if (demo) {
        const frac = this.ball.x / this.cor.length;
        if (A.captioned < 2 && frac > 0.3) {
          A.captioned = 2;
          hud.caption(texts.captions.wall);
        }
      }
      return;
    }
    if (A.st === 'after' && this.phase !== 'play') {
      // Hand zieht sich nach dem Ziel zurück
      const rp = this.restPoint();
      const q = 1 - Math.exp(-dt * 3);
      this.vf = { x: lerp(this.vf.x, rp.x, q), y: lerp(this.vf.y, rp.y, q) };
    }
  }

  // ------------------------------------------------------------------ Größenänderung

  resize(): void {
    const { rng } = this.ctx;
    if (this.phase !== 'play' && this.phase !== 'fb') return;
    // Bahn neu an die neue Größe anpassen; der Durchgang beginnt von vorn (ohne Wertung)
    this.geometry();
    this.cor = makeCorridor(rng, this.level, this.lenU, this.maxAmp);
    this.path = samplePath(this.cor);
    this.ball = { x: 0, y: this.cor.center(0) };
    this.maxX = 0;
    this.finger = null;
    this.contact = false;
    this.counter = new TouchCounter();
    this.time = new PathTime();
    this.vf = this.restPoint();
    this.auto.st = 'idle';
    this.auto.bumps = [];
    if (this.phase === 'fb') this.phase = 'play';
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, u, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    this.drawCorridor(g);
    this.drawPads(g);
    this.drawProgress(g);
    this.drawHint(g, t);
    this.drawBall(g, t);
    if (this.ctx.autoplay) hand(g, this.vf.x, this.vf.y, clamp(u * 13, 48, 110), !!this.finger);
  }

  private pathPx(): Pt[] {
    return this.path.map((p) => this.px(p));
  }

  private strokePath(g: CanvasRenderingContext2D, pts: Pt[], width: number, color: string, cap: CanvasLineCap = 'butt'): void {
    g.save();
    g.beginPath();
    pts.forEach((p, i) => (i ? g.lineTo(p.x, p.y) : g.moveTo(p.x, p.y)));
    g.lineWidth = width;
    g.lineCap = cap;
    g.lineJoin = 'round';
    g.strokeStyle = color;
    g.stroke();
    g.restore();
  }

  private drawCorridor(g: CanvasRenderingContext2D): void {
    const pts = this.pathPx();
    const W = this.cor.width * this.pu;
    const wall = Math.max(3, this.pu * 0.55);
    this.strokePath(g, pts, W + 2 * wall, WALL);
    this.strokePath(g, pts, W, FLOOR);
    // Mittellinie als ruhige Orientierung
    g.save();
    g.setLineDash([Math.max(6, this.pu), Math.max(8, this.pu * 1.3)]);
    this.strokePath(g, pts, Math.max(1.5, this.pu * 0.22), 'rgba(155,216,245,0.28)');
    g.restore();
  }

  /** Schon durchfahrener Teil der Mittellinie */
  private drawProgress(g: CanvasRenderingContext2D): void {
    const done = this.path.filter((p) => p.x <= this.maxX);
    if (done.length < 2) return;
    this.strokePath(g, done.map((p) => this.px(p)), Math.max(2.5, this.pu * 0.4), withAlpha(BLUE, 0.75), 'round');
  }

  private drawPads(g: CanvasRenderingContext2D): void {
    const W = this.cor.width * this.pu;
    const s = this.px({ x: 0, y: this.cor.center(0) });
    const e = this.px({ x: this.cor.length, y: this.cor.center(this.cor.length) });
    // Start: Querbalken mit Pfeil
    g.save();
    g.fillStyle = withAlpha(BLUE, 0.85);
    const bar = Math.max(4, this.pu * 0.7);
    g.fillRect(s.x - bar, s.y - W / 2 - 2, bar, W + 4);
    g.beginPath();
    g.moveTo(s.x + this.pu * 1.2, s.y - this.pu * 1.1);
    g.lineTo(s.x + this.pu * 3.0, s.y);
    g.lineTo(s.x + this.pu * 1.2, s.y + this.pu * 1.1);
    g.closePath();
    g.fillStyle = withAlpha(BLUE_LIGHT, 0.55);
    g.fill();
    // Ziel: Schachbrett-Streifen
    const cell = Math.max(5, this.pu * 1.1);
    const rows = Math.max(2, Math.floor(W / cell));
    const ch = W / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < 2; c++) {
        g.fillStyle = (r + c) % 2 ? 'rgba(255,255,255,0.92)' : 'rgba(15,32,56,0.95)';
        g.fillRect(e.x - cell * 0.2 + c * cell * 0.9, e.y - W / 2 + r * ch, cell * 0.9, ch);
      }
    }
    g.restore();
  }

  private drawHint(g: CanvasRenderingContext2D, t: number): void {
    if (this.phase !== 'play' || this.finger) return;
    const gp = this.grabPoint();
    const R = grabRadiusPx(this.ctx.stage.u);
    const pulse = this.ctx.reducedMotion ? 0.7 : 0.55 + 0.25 * Math.sin(t / 420);
    g.save();
    g.globalAlpha = pulse;
    ring(g, gp.x, gp.y, R, C.white, 2.5, [8, 7]);
    g.restore();
    // Faden vom Ball zur Aufsetzstelle
    g.save();
    g.strokeStyle = 'rgba(255,255,255,0.3)';
    g.lineWidth = Math.max(2, this.ctx.stage.u * 0.3);
    g.setLineDash([6, 6]);
    const b = this.px(this.ball);
    g.beginPath();
    g.moveTo(b.x, b.y + this.ballPx);
    g.lineTo(gp.x, gp.y - R);
    g.stroke();
    g.restore();
    const size = clamp(this.ctx.stage.u * 3.2, 13, 22);
    text(g, this.started ? this.ctx.texts.feedback.resume : this.ctx.texts.feedback.grab, gp.x, Math.min(this.ctx.stage.h - size, gp.y + R + size * 0.9), size, C.fg, { weight: 700 });
  }

  private drawBall(g: CanvasRenderingContext2D, t: number): void {
    const b = this.px(this.ball);
    const r = this.ballPx;
    const f = this.finger;
    if (f) {
      // Faden und Ring zeigen die Fingerposition (Finger liegt unter dem Ball)
      g.save();
      g.strokeStyle = 'rgba(255,255,255,0.35)';
      g.lineWidth = Math.max(2, this.ctx.stage.u * 0.3);
      g.setLineDash([6, 6]);
      g.beginPath();
      g.moveTo(f.x, f.y);
      g.lineTo(b.x, b.y + r);
      g.stroke();
      g.restore();
      ring(g, f.x, f.y, Math.max(10, this.ctx.stage.u * 1.6), 'rgba(255,255,255,0.55)', 2.5);
    }
    // Berührung: weicher Schein und ✗ (ohne Rot, ohne Blitz)
    const cue = clamp(1 - (t - this.cueT) / CUE_MS, 0, 1);
    const touching = this.contact && this.phase === 'play';
    if (touching || cue > 0) {
      g.save();
      g.globalAlpha = touching ? 0.5 : 0.5 * cue;
      circle(g, b.x, b.y, r * 2.1, 'rgba(255,255,255,0.35)');
      g.restore();
    }
    orb(g, b.x, b.y, r, BALL, { glow: 0.6 });
    if (touching || cue > 0) {
      const a = touching ? 1 : cue;
      const by = b.y - r * 2.4;
      g.save();
      g.globalAlpha = a;
      circle(g, b.x, by, r * 1.15, C.white);
      g.restore();
      text(g, '✗', b.x, by + 1, r * 1.5, '#1E3A5F', { weight: 800, alpha: a });
    }
    if (this.phase === 'fb' || this.phase === 'end') {
      const e = this.px({ x: this.cor.length, y: this.cor.center(this.cor.length) });
      const a = clamp((t - this.phaseT) / 250, 0, 1);
      const size = this.pu * 5;
      g.save();
      g.globalAlpha = a;
      circle(g, e.x - this.pu * 4, e.y - size * 1.25, size * 0.75, this.lastClean ? withAlpha(BLUE, 0.95) : 'rgba(255,255,255,0.22)');
      g.restore();
      text(g, this.lastClean ? '✓' : '•', e.x - this.pu * 4, e.y - size * 1.25 + 1, size, C.white, { weight: 800, alpha: a });
    }
  }

  // ------------------------------------------------------------------ Ergebnis

  private finish(): void {
    const { ctx } = this;
    this.phase = 'done';
    ctx.hud.setProgress(1);
    ctx.sfx.done();
    const thr = this.stair.threshold();
    const pct = this.timeSum > 0 ? (100 * this.freeSum) / this.timeSum : 100;
    let tip = 'great';
    if (this.touchSum / Math.max(1, this.rounds) >= 2.5) tip = 'slow';
    else if (pct < 85) tip = 'steady';
    ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), MIN_LEVEL, MAX_LEVEL), unit: 'level', better: 'higher' },
      secondary: [
        { key: 'touches', value: this.touchSum, unit: 'count' },
        { key: 'onPath', value: Math.round(pct), unit: 'percent' },
        { key: 'clean', value: this.cleanRounds, unit: 'count' },
      ],
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip,
    });
  }
}

export const ruhigeHand: ExerciseDefinition = {
  id: 'ruhige-hand',
  category: 'bewegung',
  minutes: 2,
  color: '#2B7FB0',
  showsLevel: true,
  icon:
    '<path d="M4 34C12 34 12 14 22 14S32 34 44 34" fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" opacity=".28"/><path d="M4 34C12 34 12 14 22 14S32 34 44 34" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="1 5.5"/><circle cx="15.5" cy="27" r="4.6" fill="currentColor"/>',
  texts: { de, it },
  create: (ctx) => new RuhigeHand(ctx),
};
