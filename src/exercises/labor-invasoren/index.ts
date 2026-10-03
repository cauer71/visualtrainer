/**
 * Invasoren (Labor) – Raumschiffe fallen von oben. Der Zielpunkt unten wird seitlich unter ein Schiff gesteuert und dort gehalten,
 * bis ein Ring voll ist und das Schiff verschwindet. Schiffe, die unten ankommen, zählen als verpasst. Steuerung mit dem Finger,
 * den Pfeiltasten oder durch Kippen des Geräts.
 *
 * Portierung der Labor-Übung `invaders`: Größen in cm (`ctx.calib`), Einstellungen (`ctx.params`, siehe
 * logic.ts `PARAMS`), reine Logik in logic.ts (`InvadersSession`), Steuerung in `_shared/labor-steuerung.ts`.
 *
 * - Kategorie `reaktion`: auf bewegte Ziele ausrichten und halten (Auge-Hand, Wahl des nächsten Ziels). Hauptwert: getroffene
 *   Schiffe (`destroyed`, höher = mehr); dazu Trefferquote, verpasste Schiffe und Zeit bis zum Treffer. Keine Stufen (`level` = 1).
 * - Gerätekippen: nur nach Antippen von „Kippen einschalten“ (iOS fragt dann nach der Erlaubnis); ohne Erlaubnis oder Sensor
 *   steuert die Übung mit Finger oder Pfeiltasten. Die Sensorwerte werden nur zum Steuern gelesen, nichts wird gespeichert oder
 *   gesendet. Eine Balance-Plattform wird nicht ausgelesen.
 * - Farbe nie allein: Schiffe sind umgekehrte Dreiecke mit Cockpit, der Zielpunkt ein aufrechtes Dreieck mit Strahl; der Ring um
 *   das Schiff füllt sich im Uhrzeigersinn; ✓ und ✗ als Zeichen (ruhig, kein Blitz, kein Rot). Eine gestrichelte Linie zeigt, ab
 *   wo ein Schiff gehalten werden kann.
 */
import { background, circle, ring } from '../../core/draw';
import { paramsOf } from '../../core/params';
import { calibOf } from '../../core/calib';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, PointerInfo, ResultDetailRow } from '../../core/types';
import { Steering, type SteerInput } from '../_shared/labor-steuerung';
import { TiltGate, type TiltGateTexts } from '../_shared/labor-steuerung-ui';
import { playField, restPoint } from '../_shared/tippziele';
import { drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import {
  autopilotInput,
  autopilotTarget,
  type InvaderParams,
  InvadersSession,
  invaderParams,
  type InvaderSummary,
  LOCK_FROM,
  PARAMS,
  pointsFor,
  QUICK_DURATION_S,
  tipFor,
} from './logic';
import { de, it } from './texts';

const SHIP_COLOR = '#F2708F';
const CURSOR_COLOR = '#FFD23F';
const MARK_MS = 650;
const BURST_MS = 320;
const LEAD_MS = 600;

// Intro-Film: langsame Schiffe, der Autopilot trifft sie nacheinander und lässt eines absichtlich durch
const DEMO_PARAMS: Partial<InvaderParams> = { durationS: 11, spawnMs: 2400, fallCmS: 3, dwellMs: 450, toleranceCm: 2, control: 'pointer' };
const DEMO_LEAD_MS = 1000;
const DEMO_IGNORE_SHIP = 3;
/** Lage der Schiffe im Film (Anteil der Breite), damit das durchgelassene Schiff sicher von den anderen getrennt ist */
const DEMO_SHIP_X = [0.3, 0.72, 0.22, 0.78, 0.4, 0.62];
/** Gefahr des Autopiloten im Autoplay, ein Schiff absichtlich durchzulassen */
const AUTO_IGNORE_RATE = 0.08;

interface Mark {
  x: number;
  y: number;
  t0: number;
  good: boolean;
}

const browserTarget = (): Window | null => (typeof window !== 'undefined' ? window : null);

class Invasoren implements Exercise {
  private readonly demo: boolean;
  private readonly p: InvaderParams;
  private readonly session: InvadersSession;
  private readonly steering: Steering;
  private readonly gate: TiltGate | null;
  private startAt = 0;
  private started = false;
  private done = false;
  private endT = Infinity;
  private seenTrials = 0;
  private seenShip = 0;
  private demoStage = 0;
  private lastFollow = -1e9;
  private lastLabel = '';
  private ignore = new Set<number>();
  private marks: Mark[] = [];

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = invaderParams(paramsOf(ctx, PARAMS));
    this.p = this.demo ? { ...base, ...DEMO_PARAMS } : ctx.quick ? { ...base, durationS: Math.min(base.durationS, QUICK_DURATION_S) } : base;
    const f = this.field();
    const k = this.ppc();
    this.session = new InvadersSession(this.p, { rng: ctx.rng, fieldWcm: f.w / k, fieldHcm: f.h / k, ...(this.demo ? { spawnX: (n: number) => DEMO_SHIP_X[(n - 1) % DEMO_SHIP_X.length] } : {}) });
    this.steering = new Steering({ kinds: [this.p.control], target: this.demo || ctx.autoplay ? null : browserTarget() });
    const tx = ctx.texts.feedback;
    const gateTexts: TiltGateTexts = { title: tx.tiltTitle, body: tx.tiltBody, enable: tx.tiltEnable, usePointer: tx.tiltPointer, asking: tx.tiltAsking, waiting: tx.tiltWaiting, hold: tx.tiltHold, fallback: tx.tiltFallback };
    this.gate = !this.demo && !ctx.autoplay && this.p.control === 'tilt' ? new TiltGate(this.steering, ctx.stage, gateTexts, ctx.hud, browserTarget()) : null;
  }

  // --- Geometrie: immer live aus der Bühne ---

  private ppc(): number {
    return calibOf(this.ctx).pxPerCm;
  }

  private field(): { x: number; y: number; w: number; h: number } {
    return playField(this.ctx.stage, this.demo);
  }

  resize(): void {
    const f = this.field();
    const k = this.ppc();
    this.session.setField(f.w / k, f.h / k);
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    this.startAt = t + (this.demo ? DEMO_LEAD_MS : LEAD_MS);
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateLabel(this.p.durationS, 0, 0);
    if (this.demo) {
      const r = restPoint(this.ctx.stage);
      ghost.moveTo(r.x, r.y, { move: 0 });
      hud.caption(texts.captions.watch);
    }
  }

  /** Eingabe dieses Bildes: Autopilot (Film, Autoplay) oder die Steuerung der Person */
  private input(): SteerInput {
    if (this.demo || this.ctx.autoplay) {
      const s = this.session;
      for (const v of s.invaders) {
        if (v.id > this.seenShip) {
          this.seenShip = v.id;
          if (this.demo ? v.id === DEMO_IGNORE_SHIP : this.ctx.rng.chance(AUTO_IGNORE_RATE)) this.ignore.add(v.id);
        }
      }
      return autopilotInput(s, autopilotTarget(s, this.ignore), this.p.control === 'keys' ? 'axis' : 'position');
    }
    return this.steering.read();
  }

  update(_dt: number, t: number): void {
    if (this.done) return;
    if (this.gate && this.gate.active) {
      this.gate.update(t);
      if (this.gate.active) return;
      this.startAt = t + LEAD_MS;
    }
    const s = this.session;
    if (!this.started) {
      if (t < this.startAt) return;
      this.started = true;
      s.start(t);
    }
    s.update(t, this.input());
    this.noticeEvents(t);
    this.followWithHand(t);
    this.updateHud();
    if (s.finished) this.finishSession(t);
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
  }

  private updateLabel(remainingS: number, destroyed: number, missed: number): void {
    if (this.demo) return;
    const label = this.ctx.texts.feedback.hud.replace('{s}', String(Math.ceil(remainingS))).replace('{n}', String(destroyed)).replace('{m}', String(missed));
    if (label !== this.lastLabel) {
      this.lastLabel = label;
      this.ctx.hud.setLabel(label);
    }
  }

  private updateHud(): void {
    const s = this.session;
    this.ctx.hud.setProgress(clamp(s.elapsed / this.p.durationS, 0, 1));
    if (this.demo) return;
    this.ctx.hud.setScore(s.destroyed);
    this.updateLabel(Math.max(0, this.p.durationS - s.elapsed), s.destroyed, s.missed);
  }

  /** Neu gewertete Schiffe: ✓ am Treffer, ✗ unten bei verpassten; im Film Bildunterschriften */
  private noticeEvents(t: number): void {
    const s = this.session;
    const f = this.field();
    const k = this.ppc();
    const ship = s.shipR * k;
    while (this.seenTrials < s.trials.length) {
      const tr = s.trials[this.seenTrials++];
      const y = tr.outcome === 'destroyed' ? f.y + s.bottomY * k * 0.6 : f.y + s.bottomY * k - ship;
      this.marks.push({ x: f.x + tr.xCm * k, y, t0: t, good: tr.outcome === 'destroyed' });
      if (this.demo && tr.outcome === 'missed') this.ctx.hud.caption(this.ctx.texts.captions.miss);
    }
    if (this.demo) {
      const c = this.ctx.texts.captions;
      if (this.demoStage === 0 && s.invaders.length > 0) {
        this.demoStage = 1;
        this.ctx.hud.caption(c.align);
      } else if (this.demoStage === 1 && s.invaders.some((v) => v.lock > 0)) {
        this.demoStage = 2;
        this.ctx.hud.caption(c.hold);
      }
    }
  }

  /** Film und Autoplay: die Geister-Hand folgt dem Zielpunkt (nur zur Anschauung) */
  private followWithHand(t: number): void {
    if (!(this.demo || this.ctx.autoplay) || !this.ctx.ghost.idle || t - this.lastFollow < 220) return;
    this.lastFollow = t;
    const f = this.field();
    const k = this.ppc();
    this.ctx.ghost.moveTo(f.x + this.session.x * k, f.y + f.h - 8, { move: 220 });
  }

  // --- Eingabe ---

  private frac(x: number): number {
    const f = this.field();
    return (x - f.x) / Math.max(1, f.w);
  }

  pointerDown(p: PointerInfo): void {
    if (this.done) return;
    if (this.gate && this.gate.active) {
      this.gate.pointerDown(p.x, p.y, p.t);
      return;
    }
    this.steering.pointer(this.frac(p.x));
  }

  pointerMove(p: PointerInfo): void {
    if (this.done || (this.gate && this.gate.active)) return;
    this.steering.pointer(this.frac(p.x));
  }

  // --- Ende ---

  private finishSession(t: number): void {
    if (this.done) return;
    this.done = true;
    this.endT = t;
    this.ctx.hud.setProgress(1);
    const sum = this.session.summary();
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'destroyed', value: sum.destroyed, unit: 'count', better: 'higher' },
        secondary: [{ key: 'missed', value: sum.missed, unit: 'count' }],
        score: 0,
        level: 1,
      });
      return;
    }
    this.ctx.finish(this.buildResult(sum));
  }

  private buildResult(sum: InvaderSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const secondary: ExerciseResult['secondary'] = [];
    if (sum.accuracy !== null) secondary.push({ key: 'accuracy', value: sum.accuracy, unit: 'percent' });
    secondary.push({ key: 'missed', value: sum.missed, unit: 'count' });
    if (sum.tMean !== null) secondary.push({ key: 't_mean', value: sum.tMean, unit: 'ms' });
    const rows: ResultDetailRow[] = [];
    if (sum.tMedian !== null) rows.push({ label: texts.metrics.t_median, value: fmt.ms(sum.tMedian) });
    rows.push({ label: texts.metrics.tolerance_used, value: `${fmt.num(sum.toleranceCm, 1)} cm` });
    return {
      primary: { key: 'destroyed', value: sum.destroyed, unit: 'count', better: 'higher' },
      secondary,
      details: [{ title: texts.feedback.moreTitle, rows, note: texts.feedback.moreNote }],
      score: pointsFor(sum.destroyed),
      level: 1,
      tip: tipFor(sum),
    };
  }

  destroy(): void {
    this.steering.dispose();
    this.gate?.destroy();
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, now: number): void {
    const t = Math.min(now, this.endT);
    const { w, h, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    const f = this.field();
    const k = this.ppc();
    const s = this.session;
    const ship = s.shipR * k;
    // Linie: ab hier kann ein Schiff gehalten werden
    const lockY = f.y + s.H * LOCK_FROM * k;
    g.save();
    g.setLineDash([8, 8]);
    g.strokeStyle = 'rgba(255,255,255,0.22)';
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(f.x, lockY);
    g.lineTo(f.x + f.w, lockY);
    g.stroke();
    g.restore();
    // Zielpunkt mit Strahl
    const cx = f.x + s.x * k;
    const base = f.y + f.h - 3;
    const ch = ship * 1.7;
    g.save();
    g.fillStyle = 'rgba(255,210,63,0.16)';
    g.fillRect(cx - s.tol * k, lockY, 2 * s.tol * k, Math.max(0, base - ch - lockY));
    g.beginPath();
    g.moveTo(cx, base - ch);
    g.lineTo(cx - ship * 0.95, base);
    g.lineTo(cx + ship * 0.95, base);
    g.closePath();
    g.fillStyle = CURSOR_COLOR;
    g.fill();
    g.lineWidth = 2;
    g.lineJoin = 'round';
    g.strokeStyle = 'rgba(5,10,20,0.7)';
    g.stroke();
    g.restore();
    for (const v of s.invaders) this.drawShip(g, f.x + v.x * k, f.y + v.y * k, ship, v.lock / this.p.dwellMs, t - v.spawnedAt);
    const cs = clamp(ship * 0.9, 10, 26);
    for (const m of this.marks) {
      const a = markAlpha(t - m.t0, MARK_MS);
      if (m.good) {
        drawSoftCheck(g, m.x, m.y, cs, a);
        if (!this.ctx.reducedMotion) {
          const kk = clamp((t - m.t0) / BURST_MS, 0, 1);
          g.save();
          g.globalAlpha = 0.6 * (1 - kk);
          ring(g, m.x, m.y, ship * (1 + 0.9 * easeOut(kk)), '#FFFFFF', 2.5);
          g.restore();
        }
      } else drawSoftCross(g, m.x, m.y, cs, a);
    }
    if (this.gate && this.gate.active) this.gate.render(g, t);
  }

  /** Schiff: umgekehrtes Dreieck mit Cockpit; Ring füllt sich im Uhrzeigersinn mit der Haltezeit (`lock` 0..1) */
  private drawShip(g: CanvasRenderingContext2D, x: number, y: number, s: number, lock: number, age: number): void {
    if (age < 0) return;
    g.save();
    g.globalAlpha = 0.4 + 0.6 * easeOut(age / 140);
    g.beginPath();
    g.moveTo(x, y + s);
    g.lineTo(x - s, y - s * 0.7);
    g.lineTo(x + s, y - s * 0.7);
    g.closePath();
    g.fillStyle = SHIP_COLOR;
    g.fill();
    g.lineWidth = 2;
    g.lineJoin = 'round';
    g.strokeStyle = '#FFFFFF';
    g.stroke();
    circle(g, x, y - s * 0.2, s * 0.22, '#0B1424');
    if (lock > 0) {
      g.lineWidth = Math.max(4, s * 0.22);
      g.lineCap = 'round';
      g.strokeStyle = '#FFFFFF';
      g.beginPath();
      g.arc(x, y, s * 1.45, -Math.PI / 2, -Math.PI / 2 + clamp(lock, 0, 1) * Math.PI * 2);
      g.stroke();
    }
    g.restore();
  }
}

export const laborInvasoren: ExerciseDefinition = {
  id: 'labor-invasoren',
  category: 'reaktion',
  minutes: 2,
  color: '#C8641E',
  icon:
    '<path d="M10 8h12l-6 12z" fill="currentColor"/><path d="M28 14h10l-5 10z" fill="currentColor" opacity=".5"/><circle cx="16" cy="14" r="9" fill="none" stroke="currentColor" stroke-width="2.6" stroke-dasharray="5 4" opacity=".6"/><path d="M24 44l-7-10h14z" fill="currentColor"/><path d="M24 33V26" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" opacity=".6"/>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  create: (ctx) => new Invasoren(ctx),
};
