/**
 * Ausweichziel – einer Kugel folgen, die gelegentlich weich ausweicht, und danach ein Zeichen erkennen.
 *
 * Vorbild: „Dynamische Ausweichziel-Verfolgung“ (Katalog 410). Das Original zeigt nur einen Punkt, der
 * alle halbe Sekunde einen harten Haken schlägt, und misst nichts. Hier läuft die Kugel gleichmäßig
 * und weicht in unregelmäßigen Abständen mit einem weichen Bogen aus. Kurz danach erscheint in der
 * Kugel ein Landolt-Ring, den man per großem Button unten meldet – lesbar ist er nur, wenn der Blick
 * das Ziel wieder erfasst hat. Ob die Augen wirklich folgen, wird nicht gemessen.
 *
 * - Bewegung strikt mit dt; Ausweichbogen mit weicher Drehrate (kein Knick), am Rand dreht das Ziel
 *   rechtzeitig weich bei (kein harter Abprall, der wie ein Ausweichen wirken würde).
 * - Stufen: Tempo, Schärfe (Winkel, Bogendauer), Häufigkeit, Zeichengröße und -dauer.
 * - Ab Stufe 3 gibt es gelegentlich Ausweichbewegungen ohne Zeichen (Ablenkung).
 */
import type { ExerciseDefinition, ExerciseContext } from '../../core/types';
import { circle, glow } from '../../core/draw';
import { clamp } from '../../core/stats';
import { approach, deg, makeField, MotionPath, pickTurnSign } from '../_shared/freibahn';
import { BALL, ballRadiusFor, type BarLayout, SignExercise, signSizeFor } from '../_shared/zeichenaufgabe';
import {
  arcMsFor,
  decoyGapMs,
  drawGapMs,
  drawTurnAngle,
  exposureFor,
  isDecoy,
  signDelayFor,
  speedFor,
} from './logic';
import { de, it } from './texts';

const TRIALS = 14;
const QUICK_TRIALS = 3;
const DEMO_TRIALS = 2;
const FIRST_MS: [number, number] = [1500, 2200];
const DEMO_FIRST_MS = 2000;
const DEMO_GAP_MS = 2300;
const DEMO_ANGLE = deg(75);
const DEMO_ARC_MS = 760;
const DEMO_SIGN_DELAY_MS = 420;

type Sub = 'cruise' | 'arc' | 'pre' | 'busy';

class Ausweichziel extends SignExercise {
  private readonly path = new MotionPath();
  private sub: Sub = 'cruise';
  private evadeAt = 0;
  private signAt = 0;
  private real = true;
  private lastDecoy = false;
  /** weich nachgeführte Werte */
  private speedNow = 0;
  private signNow = 40;

  constructor(ctx: ExerciseContext) {
    super(ctx, { trials: TRIALS, quickTrials: QUICK_TRIALS, demoTrials: DEMO_TRIALS, demoLevel: 4, exposureFor });
  }

  protected onLayout(L: BarLayout): void {
    const { u } = this.ctx.stage;
    const r = ballRadiusFor(signSizeFor(1, u));
    const m = Math.max(6, u * 1.2) + r;
    this.path.setField(makeField(L.world.x0 + m, L.world.x1 - m, L.world.y0 + m, L.world.y1 - m));
  }

  protected worldStart(t: number): void {
    const { rng, stage } = this.ctx;
    const f = this.path.field;
    this.speedNow = speedFor(this.level) * stage.u;
    this.signNow = signSizeFor(this.level, stage.u);
    this.path.place(
      f.minX + (f.maxX - f.minX) * rng.range(0.3, 0.7),
      f.minY + (f.maxY - f.minY) * rng.range(0.3, 0.7),
      this.demo ? deg(200) : rng.range(-Math.PI, Math.PI),
    );
    this.sub = 'cruise';
    this.evadeAt = t + (this.demo ? DEMO_FIRST_MS : rng.range(FIRST_MS[0], FIRST_MS[1]));
  }

  protected worldUpdate(dt: number, t: number): void {
    const { u } = this.ctx.stage;
    const { rng } = this.ctx;
    this.speedNow = approach(this.speedNow, speedFor(this.level) * u, dt, 0.6);
    this.signNow = approach(this.signNow, signSizeFor(this.level, u), dt, 0.4);
    this.path.step(dt, this.speedNow);

    if (this.sub === 'cruise') {
      if (!this.finished && this.phase === 'wait' && t >= this.evadeAt) this.startEvasion();
    } else if (this.sub === 'arc') {
      if (!this.path.turning) {
        if (this.real) {
          this.signAt = t + (this.demo ? DEMO_SIGN_DELAY_MS : signDelayFor(this.level));
          this.sub = 'pre';
        } else {
          this.evadeAt = t + decoyGapMs(rng);
          this.sub = 'cruise';
        }
      }
    } else if (this.sub === 'pre') {
      if (t >= this.signAt) {
        this.sub = 'busy';
        this.beginSign(t);
      }
    }
  }

  private startEvasion(): void {
    const { rng } = this.ctx;
    this.real = this.demo ? true : !isDecoy(this.level, rng, this.lastDecoy);
    this.lastDecoy = !this.real;
    const angle = this.demo ? DEMO_ANGLE : drawTurnAngle(this.level, rng);
    const sign = this.demo ? 1 : pickTurnSign(this.path.field, this.path, this.path.theta, angle, rng);
    this.path.startTurn(sign * angle, this.demo ? DEMO_ARC_MS : arcMsFor(this.level));
    this.sub = 'arc';
  }

  protected onTrialDone(t: number): void {
    const { rng } = this.ctx;
    this.sub = 'cruise';
    this.evadeAt = t + (this.demo ? DEMO_GAP_MS : drawGapMs(this.level, rng));
  }

  protected signCenter(): { x: number; y: number } {
    return { x: this.path.x, y: this.path.y };
  }

  protected signDiameter(): number {
    return this.signNow;
  }

  protected worldRender(g: CanvasRenderingContext2D): void {
    const r = ballRadiusFor(this.signNow);
    glow(g, this.path.x, this.path.y, r, BALL, 0.45);
    circle(g, this.path.x, this.path.y, clamp(r, 1, 200), BALL);
  }
}

export const ausweichziel: ExerciseDefinition = {
  id: 'ausweichziel',
  category: 'bewegung',
  minutes: 1,
  color: '#2B7DC4',
  icon:
    '<path d="M6 34C16 34 18 14 28 14s8 12 14 12" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/><path d="M38 20l5 6-7 2" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="14" cy="31" r="4.6" fill="currentColor"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new Ausweichziel(ctx),
};
