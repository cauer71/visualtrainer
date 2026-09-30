/**
 * Sprungziel – ein Ziel „springt“ an einen neuen Ort; man findet es wieder und erkennt ein Zeichen.
 *
 * Vorbild: „Sprungziel / Momentum Teleport Pursuit“ (Katalog 414). Das Original versetzt einen Punkt
 * im festen Takt schlagartig und misst nichts. Hier wird das Ziel weich ausgeblendet, taucht an einem
 * neuen Ort weich wieder auf (je ≥ 150 ms, kein Blitzen) und läuft mit gleicher Richtung und gleichem
 * Tempo weiter. Kurz nach dem Auftauchen erscheint in der Kugel ein Landolt-Ring, den man per großem
 * Button unten meldet – lesbar ist er nur, wenn der Blick das Ziel neu gefunden hat. Ob die Augen
 * wirklich springen, wird nicht gemessen.
 *
 * - Bewegung strikt mit dt; der Ort wechselt mitten in der Dunkelphase.
 * - Stufen: Sprungweite, Zeit nach dem Sprung bis zum Zeichen, Tempo, Zeichengröße und -dauer.
 * - Höchstens etwa 0,5 Sprünge pro Sekunde; Abstand zufällig.
 */
import type { ExerciseContext, ExerciseDefinition } from '../../core/types';
import { circle, glow } from '../../core/draw';
import { clamp } from '../../core/stats';
import { approach, deg, freeDistance, makeField, MotionPath, pickJumpTarget } from '../_shared/freibahn';
import { BALL, ballRadiusFor, type BarLayout, SignExercise, signSizeFor } from '../_shared/zeichenaufgabe';
import {
  drawRunMs,
  exposureFor,
  FADE_IN_AT_MS,
  JUMP_AT_MS,
  JUMP_TOTAL_MS,
  jumpAlpha,
  jumpFor,
  signDelayFor,
  speedFor,
} from './logic';
import { de, it } from './texts';

const TRIALS = 14;
const QUICK_TRIALS = 3;
const DEMO_TRIALS = 2;
const FIRST_MS: [number, number] = [1300, 2000];
const DEMO_FIRST_MS = 2400;
const DEMO_RUN_MS = 2200;
const DEMO_JUMP_U = 34;
const DEMO_SIGN_DELAY_MS = 560;

type Sub = 'run' | 'jump' | 'pre' | 'busy';

class Sprungziel extends SignExercise {
  private readonly path = new MotionPath();
  private sub: Sub = 'run';
  private jumpAt = 0;
  private jumpStart = 0;
  private moved = false;
  private signAt = 0;
  private alpha = 1;
  private jumpDist = 0;
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
      f.minX + (f.maxX - f.minX) * rng.range(0.25, 0.75),
      f.minY + (f.maxY - f.minY) * rng.range(0.25, 0.75),
      this.demo ? deg(20) : rng.range(-Math.PI, Math.PI),
    );
    this.sub = 'run';
    this.alpha = 1;
    this.jumpAt = t + (this.demo ? DEMO_FIRST_MS : rng.range(FIRST_MS[0], FIRST_MS[1]));
  }

  protected worldUpdate(dt: number, t: number): void {
    const { u } = this.ctx.stage;
    this.speedNow = approach(this.speedNow, speedFor(this.level) * u, dt, 0.6);
    this.signNow = approach(this.signNow, signSizeFor(this.level, u), dt, 0.4);
    this.path.step(dt, this.speedNow);

    if (this.sub === 'run') {
      if (!this.finished && this.phase === 'wait' && t >= this.jumpAt) {
        this.sub = 'jump';
        this.jumpStart = t;
        this.moved = false;
        this.jumpDist = (this.demo ? DEMO_JUMP_U : jumpFor(this.level)) * u;
      }
    }
    if (this.sub === 'jump') {
      const s = t - this.jumpStart;
      if (!this.moved && s >= JUMP_AT_MS) {
        this.moved = true;
        const { rng } = this.ctx;
        // Nach dem Sprung soll das Ziel mindestens ≈ 1,2 s geradeaus laufen können
        const f = this.path.field;
        const mid = freeDistance(f, (f.minX + f.maxX) / 2, (f.minY + f.maxY) / 2, this.path.theta);
        const ahead = Math.min(this.speedNow * 1.2, mid * 0.8);
        const p = pickJumpTarget(this.path.field, this.path, this.path.theta, this.jumpDist, rng, ahead);
        this.path.moveTo(p.x, p.y);
      }
      this.alpha = jumpAlpha(s);
      if (s >= JUMP_TOTAL_MS) {
        this.alpha = 1;
        this.signAt = this.jumpStart + FADE_IN_AT_MS + (this.demo ? DEMO_SIGN_DELAY_MS : signDelayFor(this.level));
        this.sub = 'pre';
      }
    }
    if (this.sub === 'pre' && t >= this.signAt) {
      this.sub = 'busy';
      this.beginSign(t);
    }
  }

  protected onTrialDone(t: number): void {
    this.sub = 'run';
    this.jumpAt = t + (this.demo ? DEMO_RUN_MS : drawRunMs(this.ctx.rng));
  }

  protected signCenter(): { x: number; y: number } {
    return { x: this.path.x, y: this.path.y };
  }

  protected signDiameter(): number {
    return this.signNow;
  }

  protected worldRender(g: CanvasRenderingContext2D): void {
    if (this.alpha <= 0.003) return;
    const r = ballRadiusFor(this.signNow);
    g.save();
    g.globalAlpha = clamp(this.alpha, 0, 1);
    glow(g, this.path.x, this.path.y, r, BALL, 0.45);
    circle(g, this.path.x, this.path.y, clamp(r, 1, 200), BALL);
    g.restore();
  }
}

export const sprungziel: ExerciseDefinition = {
  id: 'sprungziel',
  category: 'bewegung',
  minutes: 1,
  color: '#3A86C8',
  icon:
    '<circle cx="12" cy="30" r="6" fill="currentColor"/><circle cx="36" cy="18" r="6" fill="none" stroke="currentColor" stroke-width="3.2" stroke-dasharray="3.4 3.4"/><path d="M17 23C22 14 28 12 30 13" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M26 8l5 5-6 3" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new Sprungziel(ctx),
};
