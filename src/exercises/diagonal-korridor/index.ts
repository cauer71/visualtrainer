/**
 * Diagonal-Korridor – eine Marke mit dem Finger durch einen schmalen, schrägen Gang von Ecke zu Ecke ziehen, ohne die Wand
 * zu berühren (Katalog 810, „Cross-Body Movement“ – hier als ehrliche Touch-Übung am Bildschirm; keine Körper- oder
 * „Hirnhälften“-Übung, die Hand bleibt, wo sie ist).
 *
 * Unterschied zu „Ruhige Hand“ (kurvige Bahn): ein gerader, langer Gang quer über das ganze Feld. Zusätzlich werden Dauer
 * und Gleichmäßigkeit des Ziehens protokolliert – belohnt wird Tempo aber nicht.
 *
 * Gegenüber dem Vorbild (Maus mit Pointer Lock, Wandtest nur pro Bild, Fehler-Wackeln und roter Blitz, Startpunkt von der
 * Seite „anfahrbar“ nur mit Fehler):
 * - Finger-Eingabe: Die Marke sitzt ≈ 6 u über dem Finger (Finger verdeckt nichts); der Finger setzt in einem großzügigen
 *   Kreis unter der Marke auf und hält danach seinen Abstand. Abheben = Pause (Uhr steht still).
 * - Die Marke kann den Gang nie verlassen; Wandberührung = Marke gleitet am Rand, weiches ✗, kein Rot, kein Wackeln,
 *   kein Rücksprung. Die Strecke zwischen zwei Messpunkten wird in kleinen Schritten geprüft.
 * - Stufe (Staircase 2-down/1-up): Gang 14 u → ≈ 6 u breit, 55 % → 99 % der Felddiagonale lang; die Startecke wechselt.
 *   Ein Durchgang ist „sauber“ bei höchstens einer Berührung. Hauptwert = Stufe; Zusatz: Berührungen, Dauer, Gleichmäßigkeit,
 *   saubere Durchgänge. Feste Zahl von Durchgängen, kein Zeitdruck.
 * - Gemessen wird Fingerweg gegen Gang – keine Aussage über Zittern, Gesundheit oder den Blick.
 *
 * Geister-Hand (Film/Autoplay): Die Übung führt selbst eine virtuelle Hand, die den Finger führt.
 */
import { background, C, circle, orb, ring, text, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, lerp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { captionTopY, handSize, restSpot, VirtualHand } from '../_shared/koerper-b';
import {
  BALL_R_U,
  CLEAN_TOUCHES,
  type Corner,
  type Diag,
  fingerOffsetPx,
  grabRadiusPx,
  makeDiag,
  MAX_LEVEL,
  MIN_LEVEL,
  moveAlong,
  nextCorner,
  PathTime,
  pointAt,
  pointsFor,
  type Pt,
  SpeedLog,
  TouchCounter,
} from './logic';
import { de, it } from './texts';

const ROUNDS = 5;
const QUICK_ROUNDS = 2;
const FB_MS = 1700;
const END_MS = 1300;
const CUE_MS = 900;
const START_LEVEL = 2;
const DEMO_LEVEL = 2;
const DEMO_CARRY_S = 5.6;
const VF_ID = -2;
const MIN_PU = 7;

const BLUE = '#38A3DC';
const BLUE_LIGHT = '#9BD8F5';
const WALL = 'rgba(147,205,245,0.92)';
const FLOOR = '#10233D';
const BALL = '#FDE68A';

type Phase = 'play' | 'fb' | 'end' | 'done';

interface Finger {
  id: number;
  /** Abstand Finger − Marke in px, beim Aufsetzen festgelegt */
  gx: number;
  gy: number;
  x: number;
  y: number;
}

interface Auto {
  st: 'idle' | 'approach' | 'carry' | 'after';
  t0: number;
  dur: number;
  speed: number;
  bumps: { at: number; len: number }[];
  captioned: number;
  dest: Pt;
}

class DiagonalKorridor implements Exercise {
  private readonly stair: Staircase;
  private readonly total: number;
  private phase: Phase = 'play';
  private phaseT = 0;
  // Geometrie
  private pu = MIN_PU;
  private off = 46;
  private ballPx = 10;
  private rect = { x0: 0, y0: 0, x1: 100, y1: 100 };
  // Durchgang
  private level = MIN_LEVEL;
  private corner: Corner | null = null;
  private dg!: Diag;
  private ball: Pt & { s: number; d: number } = { x: 0, y: 0, s: 0, d: 0 };
  private lastTarget: Pt = { x: 0, y: 0 };
  private finger: Finger | null = null;
  private contact = false;
  private hadContact = false;
  private counter = new TouchCounter();
  private time = new PathTime();
  private speed = new SpeedLog();
  private started = false;
  private cueT = -1e9;
  private hintedAt = -1e9;
  private lastClean = false;
  private maxS = 0;
  // Auswertung
  private rounds = 0;
  private cleanRounds = 0;
  private touchSum = 0;
  private freeSum = 0;
  private timeSum = 0;
  private activeSum = 0;
  private evenSum = 0;
  private points = 0;
  // virtuelle Hand
  private readonly vh = new VirtualHand();
  private auto: Auto = { st: 'idle', t0: 0, dur: 700, speed: 100, bumps: [], captioned: 0, dest: { x: 0, y: 0 } };

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
    const top = this.demo ? 5 * this.pu : 13 * this.pu;
    const bottom = (this.demo ? captionTopY(this.ctx.stage) - 2 * this.pu : h - 3 * this.pu) - this.off;
    this.rect = { x0: mx, y0: top, x1: Math.max(mx + 40, w - mx), y1: Math.max(top + 40, bottom) };
  }

  private grabPoint(): Pt {
    return { x: this.ball.x, y: this.ball.y + this.off };
  }

  private placeBall(): void {
    this.ball = { x: this.dg.ax, y: this.dg.ay, s: 0, d: 0 };
    this.lastTarget = { x: this.dg.ax, y: this.dg.ay };
  }

  // ------------------------------------------------------------------ Ablauf

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.geometry();
    const rp = restSpot(this.ctx.stage, this.demo);
    this.vh.snap(rp.x, rp.y);
    if (this.ctx.autoplay) ghost.hide();
    this.newRound(t);
  }

  private newRound(t: number): void {
    const { rng, hud, texts } = this.ctx;
    this.level = this.demo ? DEMO_LEVEL : Math.floor(this.stair.level + 1e-9);
    this.geometry();
    this.corner = this.demo ? 0 : nextCorner(rng, this.corner);
    this.dg = makeDiag(this.rect, this.corner, this.level, this.pu, this.ballPx);
    this.placeBall();
    this.maxS = 0;
    this.finger = null;
    this.contact = false;
    this.hadContact = false;
    this.counter = new TouchCounter();
    this.time = new PathTime();
    this.speed = new SpeedLog();
    this.started = false;
    this.cueT = -1e9;
    this.phase = 'play';
    this.phaseT = t;
    this.auto = { ...this.auto, st: 'idle', bumps: [], captioned: 0 };
    if (this.demo) hud.caption(texts.captions.place);
    else hud.setLabel(`${texts.feedback.level} ${this.level} · ${Math.min(this.rounds + 1, this.total)}/${this.total}`);
  }

  update(dt: number, t: number): void {
    if (this.phase === 'done') return;
    const { ctx } = this;
    this.vh.update(t);
    if (this.phase === 'play') {
      if (this.finger) {
        // auch eine Berührung zwischen zwei Bildern zählt für die Zeit an der Wand
        this.time.add(dt, this.contact || this.hadContact);
        this.hadContact = false;
        this.counter.update(this.contact, t);
        this.speed.add(dt, this.ball.s);
      } else this.hadContact = false;
      if (!this.demo) ctx.hud.setProgress((this.rounds + clamp(this.maxS / this.dg.len, 0, 1)) / this.total);
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

  private finishRound(t: number): void {
    const { ctx } = this;
    this.finger = null;
    this.contact = false;
    this.vh.holding = false;
    this.lastClean = this.counter.touches <= CLEAN_TOUCHES;
    this.phase = 'fb';
    this.phaseT = t;
    if (!this.demo) {
      this.rounds++;
      this.touchSum += this.counter.touches;
      this.freeSum += this.time.free;
      this.timeSum += this.time.total;
      this.activeSum += this.speed.active;
      this.evenSum += this.speed.evenness;
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

  // ------------------------------------------------------------------ Eingabe

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'play' || this.finger) return;
    const g = this.grabPoint();
    if (Math.hypot(p.x - g.x, p.y - g.y) > grabRadiusPx(this.ctx.stage.u)) {
      // Daneben getippt: einmal kurz erklären (nicht bei jedem Tipp)
      if (!this.demo && p.t - this.hintedAt > 4000) {
        this.hintedAt = p.t;
        this.ctx.hud.toast(this.ctx.texts.feedback.hint, 'info', { x: clamp(g.x, 60, this.ctx.stage.w - 60), y: clamp(g.y + this.off * 0.9, 20, this.ctx.stage.h - 20), ms: 1600, size: clamp(this.ctx.stage.u * 3.6, 15, 26) });
      }
      return;
    }
    this.finger = { id: p.id, gx: p.x - this.ball.x, gy: p.y - this.ball.y, x: p.x, y: p.y };
    this.lastTarget = { x: this.ball.x, y: this.ball.y };
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
    const target = { x: p.x - f.gx, y: p.y - f.gy };
    const r = moveAlong(this.dg, this.lastTarget, target, Math.max(2, this.pu * 0.4));
    this.lastTarget = target;
    this.ball = { x: r.x, y: r.y, s: r.s, d: r.d };
    this.contact = r.contact;
    if (r.contact) this.hadContact = true;
    if (this.counter.update(r.contact, p.t)) this.onTouch(p.t);
    this.maxS = Math.max(this.maxS, r.s);
    if (r.s >= this.dg.len - 0.6 * this.pu) this.finishRound(p.t);
  }

  pointerUp(p: PointerInfo): void {
    const f = this.finger;
    if (!f || p.id !== f.id) return;
    this.finger = null;
    this.contact = false;
    this.counter.update(false, p.t);
  }

  // ------------------------------------------------------------------ virtuelle Hand (Film / Autoplay)

  private autoUpdate(dt: number, t: number): void {
    const { rng, texts, hud } = this.ctx;
    const A = this.auto;
    const demo = this.demo;
    const info = (): PointerInfo => ({ id: VF_ID, x: this.vh.x, y: this.vh.y, t, type: 'ghost' });
    if (A.st === 'idle' && this.phase === 'play') {
      const react = demo ? 900 : rng.range(400, 800);
      if (t - this.phaseT < react) return;
      const g = this.grabPoint();
      A.dest = { x: g.x + (demo ? 0 : rng.range(-6, 6)), y: g.y + (demo ? 0 : rng.range(-5, 5)) };
      A.dur = demo ? 800 : rng.range(450, 700);
      A.t0 = t;
      A.st = 'approach';
      this.vh.glide(A.dest.x, A.dest.y, t, A.dur);
      return;
    }
    if (A.st === 'approach') {
      if (t - A.t0 < A.dur) return;
      this.vh.snap(A.dest.x, A.dest.y);
      this.pointerDown(info());
      this.vh.press(t);
      this.vh.holding = true;
      A.st = 'carry';
      A.t0 = t;
      A.speed = demo ? this.dg.len / DEMO_CARRY_S : this.dg.len / clamp(rng.range(3.4, 5.2) + 0.12 * this.level, 3, 7);
      // Gelegentlich ein Ausrutscher (nur im Spielmodus)
      A.bumps = [];
      if (!demo) {
        const n = rng.chance(0.14 + 0.03 * this.level) ? (rng.chance(0.35) ? 2 : 1) : 0;
        for (let i = 0; i < n; i++) A.bumps.push({ at: rng.range(0.2, 0.85) * this.dg.len, len: rng.range(1.6, 2.6) * this.pu });
      }
      return;
    }
    if (A.st === 'carry') {
      const f = this.finger;
      if (this.phase !== 'play' || !f) {
        this.vh.holding = false;
        A.st = 'after';
        return;
      }
      const ms = t - A.t0;
      const s = Math.min(this.dg.len, (ms / 1000) * A.speed);
      let lat = demo ? 0.25 * this.dg.free * Math.sin(ms / 500) : rng.range(-0.06, 0.06) * this.dg.free + 0.22 * this.dg.free * Math.sin(ms / 430);
      for (const b of A.bumps) {
        const d = (s - b.at) / b.len;
        if (Math.abs(d) < 1) lat += (this.dg.free * 2.2 + 0.4 * this.pu) * (0.5 + 0.5 * Math.cos(Math.PI * d));
      }
      const aim = pointAt(this.dg, s, lat);
      const target = { x: aim.x + f.gx, y: aim.y + f.gy };
      const q = 1 - Math.exp(-dt * (demo ? 9 : 7));
      const { w, h } = this.ctx.stage;
      this.vh.snap(clamp(lerp(this.vh.x, target.x, q), 2, w - 2), clamp(lerp(this.vh.y, target.y, q), 2, h - 2));
      this.pointerMove(info());
      if (demo && A.captioned < 2 && this.ball.s / this.dg.len > 0.3) {
        A.captioned = 2;
        hud.caption(texts.captions.wall);
      }
      return;
    }
    if (A.st === 'after' && this.phase !== 'play') {
      // Hand zieht sich nach dem Ziel zurück
      const rp = restSpot(this.ctx.stage, demo);
      const q = 1 - Math.exp(-dt * 3);
      this.vh.snap(lerp(this.vh.x, rp.x, q), lerp(this.vh.y, rp.y, q));
    }
  }

  // ------------------------------------------------------------------ Größenänderung

  resize(): void {
    if (this.phase !== 'play' && this.phase !== 'fb') return;
    // Gang neu an die neue Größe anpassen; der Durchgang beginnt von vorn (ohne Wertung)
    this.geometry();
    this.dg = makeDiag(this.rect, this.corner ?? 0, this.level, this.pu, this.ballPx);
    this.placeBall();
    this.maxS = 0;
    this.finger = null;
    this.contact = false;
    this.counter = new TouchCounter();
    this.time = new PathTime();
    this.speed = new SpeedLog();
    const rp = restSpot(this.ctx.stage, this.demo);
    this.vh.snap(rp.x, rp.y);
    this.vh.holding = false;
    this.auto.st = 'idle';
    this.auto.bumps = [];
    if (this.phase === 'fb') this.phase = 'play';
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    this.drawCorridor(g);
    this.drawPads(g);
    this.drawProgress(g);
    this.drawHint(g, t);
    this.drawBall(g, t);
    if (this.ctx.autoplay) this.vh.render(g, t, handSize(this.ctx.stage));
  }

  private line(g: CanvasRenderingContext2D, width: number, color: string, cap: CanvasLineCap = 'butt', to = this.dg.len): void {
    const a = this.dg;
    const b = pointAt(a, to, 0);
    g.save();
    g.beginPath();
    g.moveTo(a.ax, a.ay);
    g.lineTo(b.x, b.y);
    g.lineWidth = width;
    g.lineCap = cap;
    g.strokeStyle = color;
    g.stroke();
    g.restore();
  }

  private drawCorridor(g: CanvasRenderingContext2D): void {
    const W = this.dg.width;
    const wall = Math.max(3, this.pu * 0.55);
    this.line(g, W + 2 * wall, WALL);
    this.line(g, W, FLOOR);
    g.save();
    g.setLineDash([Math.max(6, this.pu), Math.max(8, this.pu * 1.3)]);
    this.line(g, Math.max(1.5, this.pu * 0.22), 'rgba(155,216,245,0.28)');
    g.restore();
  }

  /** Schon durchfahrener Teil der Mittellinie */
  private drawProgress(g: CanvasRenderingContext2D): void {
    if (this.maxS <= 1) return;
    this.line(g, Math.max(2.5, this.pu * 0.4), withAlpha(BLUE, 0.75), 'round', this.maxS);
  }

  private drawPads(g: CanvasRenderingContext2D): void {
    const dg = this.dg;
    const W = dg.width;
    const ang = Math.atan2(dg.uy, dg.ux);
    const cell = Math.max(5, this.pu * 1.1);
    g.save();
    g.translate(dg.ax, dg.ay);
    g.rotate(ang);
    // Start: Querbalken mit Pfeil
    const bar = Math.max(4, this.pu * 0.7);
    g.fillStyle = withAlpha(BLUE, 0.85);
    g.fillRect(-bar, -W / 2 - 2, bar, W + 4);
    g.beginPath();
    g.moveTo(this.pu * 1.2, -this.pu * 1.1);
    g.lineTo(this.pu * 3.0, 0);
    g.lineTo(this.pu * 1.2, this.pu * 1.1);
    g.closePath();
    g.fillStyle = withAlpha(BLUE_LIGHT, 0.55);
    g.fill();
    // Ziel: Schachbrett-Streifen
    g.translate(dg.len, 0);
    const rows = Math.max(2, Math.floor(W / cell));
    const ch = W / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < 2; c++) {
        g.fillStyle = (r + c) % 2 ? 'rgba(255,255,255,0.92)' : 'rgba(15,32,56,0.95)';
        g.fillRect(-cell * 0.2 + c * cell * 0.9, -W / 2 + r * ch, cell * 0.9, ch);
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
    // Faden von der Marke zur Aufsetzstelle
    g.save();
    g.strokeStyle = 'rgba(255,255,255,0.3)';
    g.lineWidth = Math.max(2, this.ctx.stage.u * 0.3);
    g.setLineDash([6, 6]);
    g.beginPath();
    g.moveTo(this.ball.x, this.ball.y + this.ballPx);
    g.lineTo(gp.x, gp.y - R);
    g.stroke();
    g.restore();
    const size = clamp(this.ctx.stage.u * 3.2, 13, 22);
    const tx = clamp(gp.x, 70, this.ctx.stage.w - 70);
    text(g, this.started ? this.ctx.texts.feedback.resume : this.ctx.texts.feedback.grab, tx, Math.min(this.ctx.stage.h - size, gp.y + R + size * 0.9), size, C.fg, { weight: 700 });
  }

  private drawBall(g: CanvasRenderingContext2D, t: number): void {
    const b = this.ball;
    const r = this.ballPx;
    const f = this.finger;
    if (f) {
      // Faden und Ring zeigen die Fingerposition (Finger liegt unter der Marke)
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
      const e = pointAt(this.dg, this.dg.len, 0);
      const a = clamp((t - this.phaseT) / 250, 0, 1);
      const size = this.pu * 5;
      // Abzeichen neben dem Ziel, zur Bühnenmitte hin
      const bx = e.x + (this.rect.x0 + this.rect.x1 > 2 * e.x ? 1 : -1) * size * 1.2;
      const by = e.y + (this.rect.y0 + this.rect.y1 > 2 * e.y ? 1 : -1) * size * 0.4;
      g.save();
      g.globalAlpha = a;
      circle(g, bx, by, size * 0.75, this.lastClean ? withAlpha(BLUE, 0.95) : 'rgba(255,255,255,0.22)');
      g.restore();
      text(g, this.lastClean ? '✓' : '•', bx, by + 1, size, C.white, { weight: 800, alpha: a });
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
    const n = Math.max(1, this.rounds);
    const even = this.evenSum / n;
    let tip = 'great';
    if (this.touchSum / n >= 2.5) tip = 'slow';
    else if (pct < 85) tip = 'steady';
    else if (even < 55) tip = 'even';
    ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), MIN_LEVEL, MAX_LEVEL), unit: 'level', better: 'higher' },
      secondary: [
        { key: 'touches', value: this.touchSum, unit: 'count' },
        { key: 'duration', value: Math.round((this.activeSum / n) * 1000), unit: 'time' },
        { key: 'evenness', value: Math.round(even), unit: 'percent' },
        { key: 'clean', value: this.cleanRounds, unit: 'count' },
      ],
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip,
    });
  }
}

export const diagonalKorridor: ExerciseDefinition = {
  id: 'diagonal-korridor',
  category: 'bewegung',
  minutes: 2,
  color: '#2B7FB0',
  showsLevel: true,
  icon:
    '<path d="M8 40L40 8" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" opacity=".26"/><path d="M8 40L40 8" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="1 5.5"/><circle cx="17" cy="31" r="4.6" fill="currentColor"/><path d="M34 14l4-4m0 0h-4m4 0v4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  texts: { de, it },
  create: (ctx) => new DiagonalKorridor(ctx),
};
