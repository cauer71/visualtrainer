/**
 * Richtungschaos – einer Kugel folgen, die in unregelmäßigen Richtungen driftet, und ein Zeichen erkennen.
 *
 * Vorbild: „Richtungs-Chaos-Verfolgung / Directional Chaos Pursuit“ (Katalog 415). Das Original würfelt
 * in jedem Bild ein wenig Geschwindigkeit dazu; das Tempo wächst dabei von selbst, die Bahn hängt von
 * der Bildrate ab, und es wird nichts gemessen. Hier driftet die Kugel mit gleichmäßigem Tempo in
 * unregelmäßigen, aber stets glatten Bögen (zweifach gefilterte Zufalls-Drehrate, nach der Uhr).
 * Zwischendurch erscheint in der Kugel ein Landolt-Ring, den man per großem Button unten meldet.
 * Ob die Augen wirklich folgen, wird nicht gemessen.
 *
 * - Bewegung strikt mit dt; die Drehrate springt nie (kein Haken, kein Abprall; am Rand dreht das Ziel weich bei).
 * - Stufen: Unregelmäßigkeit (Stärke und Wechselrate der Drehrate), Tempo, Zeichengröße und -dauer.
 */
import type { ExerciseContext, ExerciseDefinition } from '../../core/types';
import { clamp } from '../../core/stats';
import { deg } from '../_shared/freibahn';
import { FreeFlightExercise, roomFor } from '../_shared/blickfolge-varianten';
import { drawGapMs, exposureFor, HeadingDrift, speedFor } from './logic';
import { de, it } from './texts';

const TRIALS = 14;
const QUICK_TRIALS = 3;
const DEMO_TRIALS = 2;
const FIRST_MS: [number, number] = [1500, 2200];
const DEMO_FIRST_MS = 2200;
const DEMO_GAP_MS = 2000;
/** Schritt, in dem Richtung und Ort fortgeschrieben werden (s) */
const SUB_S = 0.02;
/** Drift läuft aus, wenn weniger als so viele Sekunden Weg bis zum Beidrehbereich am Rand bleiben */
const WALL_EASE_S = 0.6;

class Richtungschaos extends FreeFlightExercise {
  private readonly drift = new HeadingDrift();
  private signAt = 0;
  private busySub = false;

  constructor(ctx: ExerciseContext) {
    super(ctx, { trials: TRIALS, quickTrials: QUICK_TRIALS, demoTrials: DEMO_TRIALS, demoLevel: 6, exposureFor });
  }

  protected baseSpeed(level: number): number {
    return speedFor(level);
  }

  protected flightStart(t: number): void {
    const { rng } = this.ctx;
    this.place(rng.range(0.3, 0.7), rng.range(0.3, 0.7), this.demo ? deg(200) : rng.range(-Math.PI, Math.PI));
    this.drift.reset();
    this.busySub = false;
    this.signAt = t + (this.demo ? DEMO_FIRST_MS : rng.range(FIRST_MS[0], FIRST_MS[1]));
  }

  /** Drehrate glatt fortschreiben und in kleinen Schritten bewegen – Richtung und Ort bleiben stetig */
  protected move(dt: number): void {
    const omega = this.drift.step(dt * 1000, this.level, this.ctx.rng);
    const n = Math.max(1, Math.ceil(dt / SUB_S));
    const h = dt / n;
    for (let i = 0; i < n; i++) {
      // Nahe am Rand die Drift auslaufen lassen: dort dreht `MotionPath` weich bei, und die Zufalls-Drehung
      // soll nicht dagegen arbeiten (sonst könnte das Ziel gegen die Wand laufen und hart gespiegelt werden)
      const room = roomFor(this.path.field, this.path, this.path.theta, this.speedPx);
      const k = clamp(room / (this.speedPx * WALL_EASE_S + 1), 0, 1);
      this.path.theta += omega * k * h;
      this.path.step(h, this.speedPx);
    }
  }

  protected flightUpdate(_dt: number, t: number): void {
    if (this.busySub || this.finished || this.phase !== 'wait') return;
    if (t < this.signAt) return;
    if (this.signRoom(t - this.signAt)) {
      this.busySub = true;
      this.beginSign(t);
    } else this.steerForSign();
  }

  protected flightTrialDone(t: number): void {
    this.busySub = false;
    this.signAt = t + (this.demo ? DEMO_GAP_MS : drawGapMs(this.ctx.rng));
  }
}

export const richtungschaos: ExerciseDefinition = {
  id: 'richtungschaos',
  category: 'bewegung',
  minutes: 1,
  color: '#3581BA',
  icon:
    '<path d="M6 30C10 20 16 19 19 25s6 13 11 6 2-14 8-13" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/><circle cx="40" cy="17" r="4.8" fill="currentColor"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new Richtungschaos(ctx),
};
