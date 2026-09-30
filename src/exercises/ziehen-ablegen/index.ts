/**
 * Ziehen & Ablegen – einen Ball mit dem Finger in einen wandernden Ring (Behälter) ziehen.
 *
 * Gegenüber dem Vorbild („Drag and Drop Test“: Maus mit Pointer Lock, Combo, Fehlerblitz,
 * unsichtbares Zeitfenster):
 * - Touch-tauglich: Der Finger darf irgendwo aufgesetzt werden; der Ball hängt ≈ 6 u über dem Finger,
 *   sodass die Hand ihn nicht verdeckt. Ein dünner Faden und ein Ring zeigen, wo der Finger ist.
 * - Behältertempo in u/s mit dt gerechnet; Einstieg ruhig und gleichförmig, erst ab Stufe 6
 *   sanfte Richtungswechsel. Mit der Stufe: kleiner, schneller, kürzeres Zeitfenster.
 * - Sichtbarer Zeitbalken; das Zeitfenster zählt ab Erscheinen des Balls.
 * - Adaptiv in beide Richtungen (2-down/1-up), 12 Durchgänge; Zeitüberschreitungen zählen als
 *   Fehlversuch. Gemessen: Trefferquote und mittlere Dauer pro Durchgang.
 * - Kein Blitz, kein Wackeln: Rückmeldung über ✓/✗ und Form.
 *
 * Geister-Hand (Film/Autoplay): Die Engine kann nur Tipps (pointerDown) simulieren. Für das Ziehen
 * führt die Übung deshalb selbst einen „virtuellen Finger“ und zeichnet die Hand.
 */
import { background, C, circle, hand, orb, ring, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeInOut, easeOut, lerp, mean } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo } from '../../core/types';
import {
  ballPos,
  ballRadiusFor,
  type Bounds,
  containerRadiusFor,
  fingerOffsetFor,
  inContainer,
  isTapOnly,
  MAX_LEVEL,
  MIN_LEVEL,
  type Mover,
  placeBall,
  pointsFor,
  type Pt,
  roundLimitFor,
  span,
  speedFor,
  stepContainer,
  turnRateFor,
} from './logic';
import { de, it } from './texts';

const ROUNDS = 12;
const QUICK_ROUNDS = 3;
const DEMO_ROUNDS = 2;
const FB_MS = 850;
const GLIDE_MS = 160;
const SINK_MS = 380;
const DEMO_END_MS = 1300;
/** Intro-Film: ruhiger Ring */
const DEMO_SPEED_U = 4;
const VF_ID = -2;

const BLUE = '#38BDF8';
const BALL = '#FBBF24';

type Phase = 'wait' | 'drag' | 'fb' | 'end' | 'done';
type Outcome = 'hit' | 'miss' | 'timeout';

interface Drag {
  id: number;
  downT: number;
  sx: number;
  sy: number;
  x: number;
  y: number;
}

interface Auto {
  st: 'idle' | 'approach' | 'carry' | 'after';
  t0: number;
  from: Pt;
  to: Pt;
  dur: number;
  errX: number;
  nearSince: number;
  carryT0: number;
  captioned: boolean;
}

/** Oberkante der Bildunterschrift im Intro-Film (gleiche Formel wie im Runner) */
function captionTop(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return s.h - size * 2.1 - s.h * 0.05;
}

class ZiehenAblegen implements Exercise {
  private readonly stair: Staircase;
  private readonly total: number;
  private phase: Phase = 'wait';
  private phaseT = 0;
  // Durchgang
  private roundLevel = MIN_LEVEL;
  private roundStart = 0;
  private limitMs = 6500;
  private R = 60;
  private ballR = 24;
  private box: Mover = { x: 0, y: 0, ang: 0.6, turnLeft: 0 };
  private nextTurnAt = 0;
  private rest: Pt = { x: 0, y: 0 };
  private drag: Drag | null = null;
  private outcome: Outcome = 'hit';
  private fbBall: Pt = { x: 0, y: 0 };
  private hinted = false;
  // Auswertung
  private rounds = 0;
  private hits = 0;
  private timeouts = 0;
  private points = 0;
  private durations: number[] = [];
  private demoRound = 0;
  private lastW = 0;
  private lastH = 0;
  // virtueller Finger (Film / Autoplay)
  private vf: Pt = { x: 0, y: 0 };
  private auto: Auto = { st: 'idle', t0: 0, from: { x: 0, y: 0 }, to: { x: 0, y: 0 }, dur: 600, errX: 0, nearSince: -1, carryT0: 0, captioned: false };

  constructor(private readonly ctx: ExerciseContext) {
    this.stair = new Staircase({ start: ctx.startLevel ?? MIN_LEVEL, min: MIN_LEVEL, max: MAX_LEVEL, down: 2, up: 1 });
    this.total = ctx.mode === 'demo' ? DEMO_ROUNDS : ctx.quick ? QUICK_ROUNDS : ROUNDS;
  }

  private get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  private get off(): number {
    return fingerOffsetFor(this.ctx.stage.u, this.ballR);
  }

  // ------------------------------------------------------------------ Geometrie

  private bottom(): number {
    const { h, u } = this.ctx.stage;
    return this.demo ? captionTop(this.ctx.stage) - 6 : h - Math.max(8, u * 1.2);
  }

  private top(): number {
    const { u } = this.ctx.stage;
    const m = Math.max(8, u * 1.2);
    return this.demo ? m : m + this.barH() + Math.max(6, u);
  }

  private barH(): number {
    return Math.max(5, this.ctx.stage.u * 0.9);
  }

  private boxBounds(): Bounds {
    const { w, u } = this.ctx.stage;
    const m = Math.max(8, u * 1.2);
    return span(m + this.R, w - m - this.R, this.top() + this.R, this.bottom() - this.R);
  }

  private ballBounds(): Bounds {
    const { w, u } = this.ctx.stage;
    const m = Math.max(8, u * 1.2);
    const r = this.ballR;
    return span(m + r, w - m - r, this.top() + r, this.bottom() - r);
  }

  private speedPx(): number {
    return (this.demo ? DEMO_SPEED_U : speedFor(this.roundLevel)) * this.ctx.stage.u;
  }

  // ------------------------------------------------------------------ Ablauf

  start(t: number): void {
    const { hud, ghost, stage, rng } = this.ctx;
    this.lastW = stage.w;
    this.lastH = stage.h;
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.ballR = ballRadiusFor(stage.u);
    this.R = containerRadiusFor(MIN_LEVEL, stage.u);
    const b = this.boxBounds();
    this.box = {
      x: lerp(b.minX, b.maxX, this.demo ? 0.68 : rng.range(0.2, 0.8)),
      y: lerp(b.minY, b.maxY, this.demo ? 0.3 : rng.range(0.2, 0.8)),
      ang: this.demo ? 0.5 : rng.int(4) * (Math.PI / 2) + rng.range(0.3, 1.27),
      turnLeft: 0,
    };
    this.vf = this.restPoint();
    if (this.ctx.autoplay) ghost.hide(); // die Hand zeichnet diese Übung selbst
    this.newRound(t);
  }

  private newRound(t: number): void {
    const { stage, rng, hud, texts } = this.ctx;
    this.roundLevel = this.demo ? MIN_LEVEL : this.stair.level;
    this.R = containerRadiusFor(this.roundLevel, stage.u);
    this.ballR = ballRadiusFor(stage.u);
    this.limitMs = roundLimitFor(this.roundLevel) * 1000;
    const bb = this.boxBounds();
    this.box.x = clamp(this.box.x, bb.minX, bb.maxX);
    this.box.y = clamp(this.box.y, bb.minY, bb.maxY);
    this.rest = placeBall(() => rng.next(), this.ballBounds(), this.box, this.R + this.ballR + 0.28 * Math.min(stage.w, stage.h));
    this.phase = 'wait';
    this.phaseT = t;
    this.roundStart = t;
    this.drag = null;
    this.hinted = false;
    this.nextTurnAt = t + rng.range(600, 1400);
    this.auto = { ...this.auto, st: 'idle', nearSince: -1, errX: 0, captioned: false };
    if (this.demo) hud.caption(this.demoRound === 0 ? texts.captions.finger : texts.captions.moving);
    else hud.setLabel(`${texts.feedback.level} ${Math.floor(this.roundLevel + 1e-9)} · ${Math.min(this.rounds + 1, this.total)}/${this.total}`);
  }

  update(dt: number, t: number): void {
    if (this.phase === 'done') return;
    if (!this.demo) this.ctx.hud.setProgress(this.rounds / this.total);
    // Behälter wandert immer weiter (nur dt, nie „pro Bild“)
    if (this.phase !== 'end') this.moveBox(dt, t);
    if (this.ctx.autoplay) this.autoUpdate(dt, t);
    if ((this.phase === 'wait' || this.phase === 'drag') && !this.demo && t - this.roundStart >= this.limitMs) {
      this.timeout(t);
      return;
    }
    if (this.phase === 'fb' && t - this.phaseT >= FB_MS + (this.demo ? 200 : 0)) this.afterFeedback(t);
    if (this.phase === 'end' && t - this.phaseT >= DEMO_END_MS) {
      this.phase = 'done';
      this.ctx.finish({ primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' }, secondary: [], score: 0, level: MIN_LEVEL });
    }
  }

  private moveBox(dt: number, t: number): void {
    const { rng } = this.ctx;
    const rate = this.demo ? 0 : turnRateFor(this.roundLevel);
    if (rate > 0 && t >= this.nextTurnAt) {
      this.box.turnLeft += (rng.chance(0.5) ? 1 : -1) * rng.range(0.5, 1.4);
      this.nextTurnAt = t + (rng.range(0.6, 1.4) / rate) * 1000;
    }
    stepContainer(this.box, dt, this.speedPx(), this.boxBounds());
  }

  private afterFeedback(t: number): void {
    if (this.demo) {
      this.demoRound++;
      if (this.demoRound < DEMO_ROUNDS) this.newRound(t);
      else {
        this.phase = 'end';
        this.phaseT = t;
      }
      return;
    }
    if (this.rounds >= this.total) this.finish();
    else this.newRound(t);
  }

  // ------------------------------------------------------------------ Eingabe

  pointerDown(p: PointerInfo): void {
    // Nur ein Finger zählt; Tipps zwischen den Durchgängen werden ignoriert
    if (this.phase !== 'wait' || this.drag || p.t < this.roundStart) return;
    this.drag = { id: p.id, downT: p.t, sx: p.x, sy: p.y, x: p.x, y: p.y };
    this.phase = 'drag';
    this.ctx.sfx.tap();
  }

  pointerMove(p: PointerInfo): void {
    const d = this.drag;
    if (!d || p.id !== d.id || this.phase !== 'drag') return;
    d.x = p.x;
    d.y = p.y;
  }

  pointerUp(p: PointerInfo): void {
    const d = this.drag;
    if (!d || p.id !== d.id) return;
    if (this.phase !== 'drag') {
      this.drag = null;
      return;
    }
    d.x = p.x;
    d.y = p.y;
    const { u } = this.ctx.stage;
    if (isTapOnly(p.t - d.downT, Math.hypot(p.x - d.sx, p.y - d.sy), u)) {
      // Nur getippt: Ball bleibt liegen, der Durchgang läuft weiter
      this.drag = null;
      this.phase = 'wait';
      if (!this.hinted && !this.demo) {
        this.hinted = true;
        this.toast(this.ctx.texts.feedback.hint, 'info');
      }
      return;
    }
    const ball = ballPos(p.x, p.y, this.off, this.ballR, this.ctx.stage.w);
    const hit = inContainer(ball, this.box, this.R);
    this.finishRound(hit ? 'hit' : 'miss', p.t, ball);
  }

  private finishRound(outcome: Outcome, t: number, ball: Pt): void {
    const { ctx } = this;
    this.drag = null;
    this.outcome = outcome;
    this.fbBall = ball;
    this.phase = 'fb';
    this.phaseT = t;
    const hit = outcome === 'hit';
    if (!this.demo) {
      this.rounds++;
      this.durations.push(Math.min(t - this.roundStart, this.limitMs));
      if (hit) {
        this.hits++;
        this.points += pointsFor(this.roundLevel);
        ctx.hud.setScore(this.points);
      }
      if (outcome === 'timeout') this.timeouts++;
      this.stair.update(hit);
    }
    if (hit) ctx.sfx.good();
    else if (outcome === 'miss') ctx.sfx.bad();
    else ctx.sfx.tap();
    const fb = ctx.texts.feedback;
    this.toast(hit ? fb.hit : outcome === 'miss' ? fb.miss : fb.late, hit ? 'good' : 'info');
  }

  private timeout(t: number): void {
    const ball = this.drag ? ballPos(this.drag.x, this.drag.y, this.off, this.ballR, this.ctx.stage.w) : this.rest;
    this.finishRound('timeout', t, ball);
  }

  private toast(text: string, kind: 'good' | 'info'): void {
    const { w, u } = this.ctx.stage;
    const size = clamp(u * 4.6, 18, 34);
    this.ctx.hud.toast(text, kind, { x: w / 2, y: this.top() + size * 1.1, ms: 900, size });
  }

  // ------------------------------------------------------------------ virtueller Finger (Film/Autoplay)

  private restPoint(): Pt {
    const { w, h, u } = this.ctx.stage;
    const hs = clamp(u * 13, 48, 110);
    return { x: w - hs * 0.75, y: this.demo ? captionTop(this.ctx.stage) - hs * 0.95 : h - hs * 0.7 };
  }

  private autoUpdate(dt: number, t: number): void {
    const { rng, stage, texts, hud } = this.ctx;
    const A = this.auto;
    const demo = this.demo;
    const info = (p: Pt): PointerInfo => ({ id: VF_ID, x: p.x, y: p.y, t, type: 'ghost' });
    if (A.st === 'idle' && this.phase === 'wait') {
      const react = demo ? 1000 : rng.range(350, 700);
      if (t - this.roundStart >= react) {
        // Finger setzt direkt unter dem Ball auf – der Ball bleibt dabei an seinem Platz
        A.st = 'approach';
        A.t0 = t;
        A.from = { ...this.vf };
        A.to = { x: clamp(this.rest.x, 4, stage.w - 4), y: Math.min(stage.h - 4, this.rest.y + this.off) };
        A.dur = demo ? 750 : rng.range(450, 700);
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
        A.nearSince = -1;
        const miss = !demo && rng.chance(0.08 + 0.015 * this.roundLevel);
        A.errX = miss ? (rng.chance(0.5) ? 1 : -1) * this.R * 1.8 : 0;
        if (demo && this.demoRound === 0) hud.caption(texts.captions.drag);
      }
      return;
    }
    if (A.st === 'carry') {
      if (this.phase !== 'drag') {
        A.st = 'after';
        return;
      }
      // Ziel: Finger so, dass der Ball (Finger − Versatz) mit etwas Vorhalt im Behälter liegt
      const lead = demo ? 0.3 : 0.22;
      const v = this.speedPx();
      const aim = { x: this.box.x + Math.cos(this.box.ang) * v * lead + A.errX, y: this.box.y + Math.sin(this.box.ang) * v * lead + this.off };
      const rate = demo ? 4.5 : 6.5;
      const f = 1 - Math.exp(-dt * rate);
      this.vf = { x: clamp(lerp(this.vf.x, aim.x, f), 2, stage.w - 2), y: clamp(lerp(this.vf.y, aim.y, f), 2, stage.h - 2) };
      this.pointerMove(info(this.vf));
      const dist = Math.hypot(this.vf.x - aim.x, this.vf.y - aim.y);
      if (demo && this.demoRound === 0 && !A.captioned && dist < this.R * 2.2) {
        A.captioned = true;
        hud.caption(texts.captions.release);
      }
      if (dist <= this.R * 0.25) {
        if (A.nearSince < 0) A.nearSince = t;
      } else A.nearSince = -1;
      if ((A.nearSince >= 0 && t - A.nearSince >= 160) || t - A.carryT0 > 3200) {
        A.st = 'after';
        this.pointerUp(info(this.vf));
      }
      return;
    }
    if (A.st === 'after' && this.phase !== 'wait' && this.phase !== 'drag') {
      // Hand zieht sich nach dem Loslassen zurück
      const rp = this.restPoint();
      const f = 1 - Math.exp(-dt * 3);
      this.vf = { x: lerp(this.vf.x, rp.x, f), y: lerp(this.vf.y, rp.y, f) };
    }
  }

  // ------------------------------------------------------------------ Größenänderung

  resize(w: number, h: number): void {
    const sx = this.lastW > 0 ? w / this.lastW : 1;
    const sy = this.lastH > 0 ? h / this.lastH : 1;
    this.lastW = w;
    this.lastH = h;
    const move = (p: Pt) => {
      p.x *= sx;
      p.y *= sy;
    };
    move(this.box);
    move(this.rest);
    move(this.fbBall);
    move(this.vf);
    const { u } = this.ctx.stage;
    this.ballR = ballRadiusFor(u);
    this.R = containerRadiusFor(this.roundLevel, u);
    const b = this.boxBounds();
    this.box.x = clamp(this.box.x, b.minX, b.maxX);
    this.box.y = clamp(this.box.y, b.minY, b.maxY);
    if (this.drag) {
      // Laufendes Ziehen bei Drehung abbrechen, der Ball liegt wieder am Platz
      this.drag = null;
      this.phase = 'wait';
      this.auto.st = 'idle';
    }
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, u, dpr } = this.ctx.stage;
    background(g, w, h, dpr, 'grid');
    if (!this.demo) this.drawBar(g, t);
    this.drawBox(g, t);
    this.drawBall(g, t);
    if (this.ctx.autoplay) {
      const hs = clamp(u * 13, 48, 110);
      hand(g, this.vf.x, this.vf.y, hs, this.phase === 'drag');
    }
  }

  private drawBar(g: CanvasRenderingContext2D, t: number): void {
    const { w, u } = this.ctx.stage;
    const m = Math.max(8, u * 1.2);
    const y = m;
    const H = this.barH();
    const running = this.phase === 'wait' || this.phase === 'drag';
    const frac = running ? clamp(1 - (t - this.roundStart) / this.limitMs, 0, 1) : 0;
    g.save();
    g.fillStyle = 'rgba(255,255,255,0.10)';
    g.fillRect(m, y, w - 2 * m, H);
    g.fillStyle = 'rgba(232,238,247,0.6)';
    g.fillRect(m, y, (w - 2 * m) * frac, H);
    g.restore();
  }

  private drawBox(g: CanvasRenderingContext2D, t: number): void {
    const { x, y } = this.box;
    const R = this.R;
    const lw = Math.max(4, R * 0.14);
    const hit = this.phase === 'fb' && this.outcome === 'hit';
    circle(g, x, y, R, hit ? withAlpha(C.good, 0.22) : 'rgba(56,189,248,0.12)');
    ring(g, x, y, R - lw / 2, hit ? C.good : BLUE, lw);
    ring(g, x, y, R * 0.5, 'rgba(186,230,253,0.5)', Math.max(2, lw * 0.4), [Math.max(6, R * 0.12), Math.max(6, R * 0.12)]);
    // kleines Kreuz in der Mitte
    g.save();
    g.strokeStyle = 'rgba(224,242,254,0.6)';
    g.lineWidth = Math.max(2, lw * 0.35);
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(x - R * 0.12, y);
    g.lineTo(x + R * 0.12, y);
    g.moveTo(x, y - R * 0.12);
    g.lineTo(x, y + R * 0.12);
    g.stroke();
    g.restore();
    if (hit) {
      const k = this.ctx.reducedMotion ? 1 : easeOut((t - this.phaseT) / SINK_MS);
      check(g, x, y, R * 0.42 * (0.6 + 0.4 * k), '#FFFFFF');
    }
  }

  private drawBall(g: CanvasRenderingContext2D, t: number): void {
    const r = this.ballR;
    const still = this.ctx.reducedMotion;
    if (this.phase === 'wait') {
      orb(g, this.rest.x, this.rest.y, r, BALL, { glow: 0.5 });
      return;
    }
    if (this.phase === 'drag' && this.drag) {
      const d = this.drag;
      const target = ballPos(d.x, d.y, this.off, r, this.ctx.stage.w);
      const k = still ? 1 : easeOut((t - d.downT) / GLIDE_MS);
      const bx = lerp(this.rest.x, target.x, k);
      const by = lerp(this.rest.y, target.y, k);
      // Faden und Ring zeigen die Fingerposition (der Finger liegt unter dem Ball)
      g.save();
      g.strokeStyle = 'rgba(255,255,255,0.35)';
      g.lineWidth = Math.max(2, this.ctx.stage.u * 0.3);
      g.setLineDash([6, 6]);
      g.beginPath();
      g.moveTo(d.x, d.y);
      g.lineTo(bx, by + r);
      g.stroke();
      g.restore();
      ring(g, d.x, d.y, Math.max(10, this.ctx.stage.u * 1.6), 'rgba(255,255,255,0.55)', 2.5);
      orb(g, bx, by, r * 1.06, BALL, { glow: 0.7 });
      return;
    }
    if (this.phase === 'fb' || this.phase === 'end' || this.phase === 'done') {
      const k = clamp((t - this.phaseT) / SINK_MS, 0, 1);
      if (this.outcome === 'hit') {
        // Ball sinkt in den Behälter
        const e = still ? 1 : easeOut(k);
        const x = lerp(this.fbBall.x, this.box.x, e);
        const y = lerp(this.fbBall.y, this.box.y, e);
        if (e < 1 || still) orb(g, x, y, r * (1 - 0.45 * e), BALL, { glow: 0.3 });
        return;
      }
      const a = still ? 0.7 : 1 - 0.45 * clamp((t - this.phaseT) / 600, 0, 1);
      g.save();
      g.globalAlpha = a;
      orb(g, this.fbBall.x, this.fbBall.y, r, BALL, { glow: 0.2 });
      g.restore();
      cross(g, this.fbBall.x, this.fbBall.y, r * 0.9, '#1F2937');
    }
  }

  // ------------------------------------------------------------------ Ergebnis

  private finish(): void {
    const { ctx } = this;
    this.phase = 'done';
    ctx.hud.setProgress(1);
    ctx.sfx.done();
    const thr = this.stair.threshold();
    const acc = this.rounds ? (100 * this.hits) / this.rounds : 0;
    const misses = this.rounds - this.hits - this.timeouts;
    let tip = 'great';
    if (this.timeouts >= 3) tip = 'slow';
    else if (misses >= 4) tip = 'aim';
    ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), MIN_LEVEL, MAX_LEVEL), unit: 'level', better: 'higher' },
      secondary: [
        { key: 'accuracy', value: Math.round(acc), unit: 'percent' },
        ...(this.durations.length ? [{ key: 'duration', value: Math.round(mean(this.durations)), unit: 'time' as const }] : []),
      ],
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip,
    });
  }
}

function check(g: CanvasRenderingContext2D, x: number, y: number, s: number, color: string): void {
  g.save();
  g.strokeStyle = color;
  g.lineWidth = Math.max(3, s * 0.3);
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.beginPath();
  g.moveTo(x - s * 0.5, y + s * 0.02);
  g.lineTo(x - s * 0.12, y + s * 0.38);
  g.lineTo(x + s * 0.55, y - s * 0.36);
  g.stroke();
  g.restore();
}

function cross(g: CanvasRenderingContext2D, x: number, y: number, s: number, color: string): void {
  g.save();
  g.strokeStyle = color;
  g.lineWidth = Math.max(3, s * 0.22);
  g.lineCap = 'round';
  g.beginPath();
  g.moveTo(x - s * 0.36, y - s * 0.36);
  g.lineTo(x + s * 0.36, y + s * 0.36);
  g.moveTo(x + s * 0.36, y - s * 0.36);
  g.lineTo(x - s * 0.36, y + s * 0.36);
  g.stroke();
  g.restore();
}

export const ziehenAblegen: ExerciseDefinition = {
  id: 'ziehen-ablegen',
  category: 'bewegung',
  minutes: 2,
  color: '#2E6DB4',
  showsLevel: true,
  icon:
    '<circle cx="33" cy="15" r="9.5" fill="none" stroke="currentColor" stroke-width="3.4"/><circle cx="33" cy="15" r="2.4" fill="currentColor"/><circle cx="12" cy="37" r="6.5" fill="currentColor"/><path d="M19.5 33.5C25 31 28 27 28.5 23" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="1 5.5"/>',
  texts: { de, it },
  create: (ctx) => new ZiehenAblegen(ctx),
};
