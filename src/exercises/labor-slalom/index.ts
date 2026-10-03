/**
 * Slalom (Labor) – Tore laufen von oben nach unten, die Kugel unten wird seitlich durch die Lücken gesteuert: mit dem Finger
 * (die Kugel folgt der waagerechten Position), mit den Pfeiltasten oder durch Kippen des Geräts.
 *
 * Portierung der Labor-Übung `slalom`: Größen in cm (`ctx.calib`), Einstellungen (`ctx.params`, siehe
 * logic.ts `PARAMS`), reine Logik in logic.ts (`SlalomSession`), Steuerung in `_shared/labor-steuerung.ts`.
 *
 * - Kategorie `bewegung`: vorausschauendes, gleichmäßiges Steuern (Auge-Hand). Hauptwert: durchfahrene Tore (`passed`, höher =
 *   mehr); dazu Trefferquote, berührte Stangen und längste Serie. Keine Stufen (`level` = 1).
 * - Gerätekippen: nur nach Antippen von „Kippen einschalten“ (iOS fragt dann nach der Erlaubnis); ohne Erlaubnis oder Sensor
 *   steuert die Übung mit Finger oder Pfeiltasten. Die Sensorwerte werden nur zum Steuern gelesen, nichts wird gespeichert oder
 *   gesendet. Eine Balance-Plattform wird nicht ausgelesen.
 * - Farbe nie allein: Stangen mit weißen Pfosten am Rand der Lücke, ✓ und ✗ als Zeichen (ruhig, kein Blitz, kein Rot).
 * - Gemessen wird nur, wo die Kugel beim Tor war – nicht dein Blick und nicht deine Haltung.
 */
import { background, circle, ring, rrPath } from '../../core/draw';
import { paramsOf } from '../../core/params';
import { calibOf } from '../../core/calib';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, PointerInfo, ResultDetailRow } from '../../core/types';
import { Steering, type SteerInput, type SteerKind } from '../_shared/labor-steuerung';
import { TiltGate, type TiltGateTexts } from '../_shared/labor-steuerung-ui';
import { playField, restPoint } from '../_shared/tippziele';
import { drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import {
  autopilotInput,
  autopilotTarget,
  type Gate,
  type SlalomParams,
  SlalomSession,
  slalomParams,
  type SlalomSummary,
  PARAMS,
  pointsFor,
  QUICK_DURATION_S,
  tipFor,
} from './logic';
import { de, it } from './texts';

const BAR_COLOR = '#5DADE2';
const BAR_DONE = '#3C4B5C';
const BALL_COLOR = '#FFD23F';
const MARK_MS = 600;
const LEAD_MS = 600;

// Intro-Film: langsame Tore auf kleiner Bühne, der Autopilot fährt sauber und fährt einmal absichtlich an eine Stange
const DEMO_PARAMS: Partial<SlalomParams> = { durationS: 10, gapCm: 6, speedCmS: 3.5, speedUpPct: 0, spacingCm: 9, control: 'pointer' };
const DEMO_LEAD_MS = 1000;
const DEMO_ERROR_GATE = 4;
/** Gefahr des Autopiloten im Autoplay, ein Tor absichtlich zu verfehlen */
const AUTO_ERROR_RATE = 0.1;

interface Mark {
  x: number;
  y: number;
  t0: number;
  good: boolean;
}

const browserTarget = (): Window | null => (typeof window !== 'undefined' ? window : null);

class Slalom implements Exercise {
  private readonly demo: boolean;
  private readonly p: SlalomParams;
  private readonly session: SlalomSession;
  private readonly steering: Steering;
  private readonly gate: TiltGate | null;
  private startAt = 0;
  private started = false;
  private done = false;
  private endT = Infinity;
  private seenTrials = 0;
  private seenGate = 0;
  private lastFollow = -1e9;
  private lastLabel = '';
  private errors = new Set<number>();
  private marks: Mark[] = [];

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = slalomParams(paramsOf(ctx, PARAMS));
    this.p = this.demo ? { ...base, ...DEMO_PARAMS } : ctx.quick ? { ...base, durationS: Math.min(base.durationS, QUICK_DURATION_S) } : base;
    const f = this.field();
    const k = this.ppc();
    this.session = new SlalomSession(this.p, { rng: ctx.rng, fieldWcm: f.w / k, fieldHcm: f.h / k });
    const kinds: SteerKind[] = [this.p.control];
    this.steering = new Steering({ kinds, target: this.demo || ctx.autoplay ? null : browserTarget() });
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

  private ballPx(): { x: number; y: number; r: number } {
    const f = this.field();
    const k = this.ppc();
    const s = this.session;
    return { x: f.x + s.x * k, y: f.y + s.ballY * k, r: s.ballR * k };
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
      for (const g of s.gates) {
        if (g.id > this.seenGate) {
          this.seenGate = g.id;
          if (this.demo ? g.id === DEMO_ERROR_GATE : this.ctx.rng.chance(AUTO_ERROR_RATE)) this.errors.add(g.id);
        }
      }
      return autopilotInput(s, autopilotTarget(s, this.errors), this.p.control === 'pointer' || this.p.control === 'tilt' ? 'position' : 'axis');
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
    this.updateHud(t);
    if (s.finished) this.finishSession(t);
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
  }

  private updateLabel(remainingS: number, passed: number, hits: number): void {
    if (this.demo) return;
    const label = this.ctx.texts.feedback.hud.replace('{s}', String(Math.ceil(remainingS))).replace('{n}', String(passed)).replace('{m}', String(hits));
    if (label !== this.lastLabel) {
      this.lastLabel = label;
      this.ctx.hud.setLabel(label);
    }
  }

  private updateHud(_t: number): void {
    const s = this.session;
    this.ctx.hud.setProgress(clamp(s.elapsed / this.p.durationS, 0, 1));
    if (this.demo) return;
    this.ctx.hud.setScore(s.passed);
    this.updateLabel(Math.max(0, this.p.durationS - s.elapsed), s.passed, s.hits);
  }

  /** Neu gewertete Tore: ✓ in der Lücke, ✗ an der Kugel; im Film Bildunterschriften */
  private noticeEvents(t: number): void {
    const s = this.session;
    const f = this.field();
    const k = this.ppc();
    while (this.seenTrials < s.trials.length) {
      const tr = s.trials[this.seenTrials++];
      if (tr.passed) this.marks.push({ x: f.x + tr.centerCm * k, y: f.y + s.ballY * k - s.ballR * k * 2.2, t0: t, good: true });
      else this.marks.push({ x: f.x + tr.ballCm * k, y: f.y + s.ballY * k - s.ballR * k * 2.2, t0: t, good: false });
      if (this.demo) {
        const c = this.ctx.texts.captions;
        if (this.seenTrials === 1) this.ctx.hud.caption(c.steer);
        else if (!tr.passed) this.ctx.hud.caption(c.touch);
        else if (this.seenTrials === 5) this.ctx.hud.caption(c.count);
      }
    }
  }

  /** Film und Autoplay: die Geister-Hand folgt der Kugel (nur zur Anschauung) */
  private followWithHand(t: number): void {
    if (!(this.demo || this.ctx.autoplay) || !this.ctx.ghost.idle || t - this.lastFollow < 220) return;
    this.lastFollow = t;
    const b = this.ballPx();
    this.ctx.ghost.moveTo(b.x, b.y, { move: 220 });
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
        primary: { key: 'passed', value: sum.passed, unit: 'count', better: 'higher' },
        secondary: [{ key: 'hits', value: sum.hits, unit: 'count' }],
        score: 0,
        level: 1,
      });
      return;
    }
    this.ctx.finish(this.buildResult(sum));
  }

  private buildResult(sum: SlalomSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const secondary: ExerciseResult['secondary'] = [];
    if (sum.accuracy !== null) secondary.push({ key: 'accuracy', value: sum.accuracy, unit: 'percent' });
    secondary.push({ key: 'hits', value: sum.hits, unit: 'count' });
    secondary.push({ key: 'streak', value: sum.streak, unit: 'count' });
    const rows: ResultDetailRow[] = [];
    if (sum.centerDev !== null) rows.push({ label: texts.metrics.center_dev, value: `${fmt.num(sum.centerDev, 1)} cm` });
    rows.push({ label: texts.metrics.gap_used, value: `${fmt.num(sum.gapCm, 1)} cm` });
    rows.push({ label: texts.metrics.spacing_used, value: `${fmt.num(sum.spacingCm, 1)} cm` });
    return {
      primary: { key: 'passed', value: sum.passed, unit: 'count', better: 'higher' },
      secondary,
      details: [{ title: texts.feedback.moreTitle, rows, note: texts.feedback.moreNote }],
      score: pointsFor(sum.passed),
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
    const barH = clamp(k * 0.32, 8, 14);
    for (const gt of s.gates) this.drawGate(g, gt, f, k, barH, w);
    const b = this.ballPx();
    circle(g, b.x, b.y, b.r, BALL_COLOR);
    ring(g, b.x, b.y, Math.max(1, b.r - Math.max(1.5, b.r * 0.06)), 'rgba(255,255,255,0.9)', Math.max(2, b.r * 0.12));
    ring(g, b.x, b.y, b.r + 1.5, 'rgba(5,10,20,0.6)', 2);
    const cs = clamp(b.r * 0.9, 9, 22);
    for (const m of this.marks) {
      const a = markAlpha(t - m.t0, MARK_MS);
      if (m.good) drawSoftCheck(g, m.x, m.y, cs * 0.7, a * 0.8);
      else drawSoftCross(g, m.x, m.y, cs, a);
    }
    if (this.gate && this.gate.active) this.gate.render(g, t);
  }

  private drawGate(g: CanvasRenderingContext2D, gt: Gate, f: { x: number; y: number; w: number; h: number }, k: number, barH: number, stageW: number): void {
    const y = f.y + gt.y * k;
    if (y < f.y - barH || y > f.y + f.h + barH) return;
    const left = f.x + (gt.cx - gt.gap / 2) * k;
    const right = f.x + (gt.cx + gt.gap / 2) * k;
    const tr = this.session.trials[gt.id - 1];
    const failed = gt.evaluated && tr && !tr.passed;
    g.save();
    g.fillStyle = gt.evaluated ? BAR_DONE : BAR_COLOR;
    rrPath(g, 0, y - barH / 2, Math.max(0, left), barH, barH / 2);
    g.fill();
    rrPath(g, right, y - barH / 2, Math.max(0, stageW - right), barH, barH / 2);
    g.fill();
    if (failed) {
      // berührt: gestrichelter Rand um die Stangen (Form, nicht Farbe)
      g.setLineDash([6, 5]);
      g.lineWidth = 2;
      g.strokeStyle = '#FFFFFF';
      rrPath(g, 0, y - barH / 2, Math.max(0, left), barH, barH / 2);
      g.stroke();
      rrPath(g, right, y - barH / 2, Math.max(0, stageW - right), barH, barH / 2);
      g.stroke();
    }
    g.restore();
    // weiße Pfosten am Rand der Lücke: die Lücke ist an der Form zu erkennen
    const pr = barH * 0.85;
    for (const px of [left, right]) {
      circle(g, px, y, pr, gt.evaluated ? '#8497AB' : '#FFFFFF');
      ring(g, px, y, pr, 'rgba(5,10,20,0.6)', 1.5);
    }
  }
}

export const laborSlalom: ExerciseDefinition = {
  id: 'labor-slalom',
  category: 'bewegung',
  minutes: 2,
  color: '#2E6DB4',
  icon:
    '<path d="M3 12h13M32 12h13M3 26h6M25 26h20M3 40h20M39 40h6" stroke="currentColor" stroke-width="4" stroke-linecap="round" opacity=".55"/><circle cx="24" cy="12" r="2.6" fill="currentColor"/><circle cx="16" cy="26" r="2.6" fill="currentColor"/><circle cx="9" cy="26" r="2.6" fill="currentColor" opacity=".0"/><circle cx="25" cy="26" r="2.6" fill="currentColor"/><circle cx="24" cy="38" r="5" fill="currentColor"/>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  create: (ctx) => new Slalom(ctx),
};
