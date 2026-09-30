/**
 * Tempo-Wechsel – einer Kugel folgen, die weich Tempo und Richtung wechselt, und ein Zeichen erkennen.
 *
 * Vorbild: „Räumliche Verschiebung / Spatial Shift Pursuit“ (Katalog 411). Das Original schlägt in
 * jedem Bild mit fester Wahrscheinlichkeit Haken (die Wechselrate hängt so von der Bildrate ab),
 * dreht das Tempo von selbst immer höher und misst nichts. Hier wechselt die Kugel zeitbasiert und
 * unregelmäßig WEICH Tempo und Richtung (Bogen plus Tempo-Rampe). Erst wenn das Tempo wieder ruhig
 * ist, erscheint in der Kugel ein Landolt-Ring, den man per großem Button unten meldet. Ob die Augen
 * wirklich folgen, wird nicht gemessen – nur, ob das Zeichen erkannt wird.
 *
 * - Bewegung strikt mit dt; Tempo-Rampe und Bogen haben am Anfang und Ende die Steigung 0.
 * - Stufen: Stärke (Tempo-Spreizung, Drehwinkel), Häufigkeit, Wechsel-Dauer, Zeichengröße und -dauer.
 * - Zeichen nur bei ruhigem Tempo (Rampe fertig, nicht im Bogen, Tempo ≤ `CALM_MAX_U`);
 *   ab Stufe 3 gelegentlich Wechsel ohne Zeichen (Ablenkung).
 */
import type { ExerciseContext, ExerciseDefinition } from '../../core/types';
import { deg, pickTurnSign } from '../_shared/freibahn';
import { FreeFlightExercise } from '../_shared/blickfolge-varianten';
import {
  baseSpeedFor,
  canHostSign,
  changeMsFor,
  decoyGapMs,
  drawGapMs,
  drawTurnAngle,
  exposureFor,
  isCalm,
  isDecoy,
  nextTempoFactor,
  signDelayFor,
  TempoRamp,
} from './logic';
import { de, it } from './texts';

const TRIALS = 14;
const QUICK_TRIALS = 3;
const DEMO_TRIALS = 2;
const FIRST_MS: [number, number] = [1500, 2200];
const DEMO_FIRST_MS = 2000;
const DEMO_GAP_MS = 2200;
const DEMO_FACTORS = [0.62, 1.5];
const DEMO_ANGLES = [deg(75), deg(-80)];
const DEMO_CHANGE_MS = 1000;
const DEMO_SIGN_DELAY_MS = 450;

type Sub = 'cruise' | 'change' | 'pre' | 'busy';

class TempoWechsel extends FreeFlightExercise {
  private readonly ramp = new TempoRamp();
  private sub: Sub = 'cruise';
  private changeAt = 0;
  private signAt = 0;
  private preSince = 0;
  private real = true;
  private lastDecoy = false;
  private changes = 0;

  constructor(ctx: ExerciseContext) {
    super(ctx, { trials: TRIALS, quickTrials: QUICK_TRIALS, demoTrials: DEMO_TRIALS, demoLevel: 4, exposureFor });
  }

  protected baseSpeed(level: number): number {
    return baseSpeedFor(level);
  }

  protected speedFactor(): number {
    return this.ramp.value;
  }

  protected flightStart(t: number): void {
    const { rng } = this.ctx;
    this.place(rng.range(0.3, 0.7), rng.range(0.3, 0.7), this.demo ? deg(200) : rng.range(-Math.PI, Math.PI));
    this.ramp.set(1);
    this.sub = 'cruise';
    this.changes = 0;
    this.changeAt = t + (this.demo ? DEMO_FIRST_MS : rng.range(FIRST_MS[0], FIRST_MS[1]));
  }

  protected move(dt: number): void {
    this.ramp.step(dt * 1000);
    super.move(dt);
  }

  protected flightUpdate(_dt: number, t: number): void {
    const { u } = this.ctx.stage;
    const { rng } = this.ctx;
    if (this.sub === 'cruise') {
      if (!this.finished && this.phase === 'wait' && t >= this.changeAt) this.startChange();
    } else if (this.sub === 'change') {
      if (!this.ramp.active && !this.path.turning) {
        if (this.real) {
          this.signAt = t + (this.demo ? DEMO_SIGN_DELAY_MS : signDelayFor(this.level));
          this.preSince = t;
          this.sub = 'pre';
        } else {
          this.changeAt = t + decoyGapMs(rng);
          this.sub = 'cruise';
        }
      }
    } else if (this.sub === 'pre') {
      const speedU = this.speedPx / u;
      const targetU = this.baseSpeed(this.level) * this.ramp.target;
      if (t >= this.signAt && isCalm(speedU, targetU, this.ramp.active, this.path.turning) && this.signRoom(t - this.preSince)) {
        this.sub = 'busy';
        this.beginSign(t);
      }
    }
  }

  private startChange(): void {
    const { rng } = this.ctx;
    const n = this.changes++;
    const factor = this.demo ? DEMO_FACTORS[n % DEMO_FACTORS.length] : nextTempoFactor(this.level, this.ramp.target, rng);
    // Zeichen nur, wenn das neue Tempo ruhig genug ist
    this.real = this.demo ? true : canHostSign(baseSpeedFor(this.level) * factor) && !isDecoy(this.level, rng, this.lastDecoy);
    this.lastDecoy = !this.real;
    const angle = this.demo ? Math.abs(DEMO_ANGLES[n % DEMO_ANGLES.length]) : drawTurnAngle(this.level, rng);
    const sign = this.demo
      ? (Math.sign(DEMO_ANGLES[n % DEMO_ANGLES.length]) as 1 | -1)
      : pickTurnSign(this.path.field, this.path, this.path.theta, angle, rng);
    const dur = this.demo ? DEMO_CHANGE_MS : changeMsFor(this.level);
    this.ramp.start(factor, dur);
    this.path.startTurn(sign * angle, dur);
    if (this.demo) this.ctx.hud.caption(this.ctx.texts.captions.change, 'top');
    this.sub = 'change';
  }

  protected flightTrialDone(t: number): void {
    this.sub = 'cruise';
    this.changeAt = t + (this.demo ? DEMO_GAP_MS : drawGapMs(this.level, this.ctx.rng));
  }
}

export const tempoWechsel: ExerciseDefinition = {
  id: 'tempo-wechsel',
  category: 'bewegung',
  minutes: 1,
  color: '#2C78C0',
  icon:
    '<path d="M5 33C11 33 12 17 19 17s7 9 12 9 6-7 12-7" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/><circle cx="11" cy="33" r="3" fill="currentColor"/><circle cx="23" cy="19" r="3.6" fill="currentColor"/><circle cx="40" cy="20" r="4.6" fill="currentColor"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new TempoWechsel(ctx),
};
