/**
 * Nachzieh-Spur – einer Kugel folgen, die einen weichen Kometenschweif hinter sich herzieht, und ein
 * Zeichen am Zielkopf erkennen.
 *
 * Vorbild: „Ghosting-Unterdrückung / Ghosting Suppress Pursuit“ (Katalog 412). Das Original zeigt nur
 * einen Punkt mit ein paar blassen Geisterringen (standardmäßig aus) und misst nichts. Hier zieht die
 * Kugel eine weiche, gleichmäßig verblassende Spur als Ablenkung hinter sich her; das Zeichen erscheint
 * immer im hellen Zielkopf, nie in der Spur – lesbar ist es nur, wenn der Blick am Kopf bleibt. Die
 * Antwort kommt per großem Button unten. Ob die Augen wirklich am Kopf bleiben, wird nicht gemessen.
 *
 * - Bewegung strikt mit dt; Spur als Zeitpuffer (gleiche Länge auf 60 und 120 Hz), linear verblassend,
 *   ohne Blinken, ohne Leuchtsaum.
 * - Stufen: Länge und Helligkeit der Spur, Tempo, Zeichengröße und -dauer; Bögen (krumme Spur) häufiger.
 */
import type { ExerciseContext, ExerciseDefinition } from '../../core/types';
import { approach, deg } from '../_shared/freibahn';
import { FreeFlightExercise } from '../_shared/blickfolge-varianten';
import { ballRadiusFor } from '../_shared/zeichenaufgabe';
import {
  CURVE_MS,
  curveChanceFor,
  drawCurveDeg,
  drawRunMs,
  exposureFor,
  speedFor,
  TRAIL_MS_MAX,
  trailAlphaFor,
  TrailBuffer,
  trailFade,
  trailMsFor,
  trailWidth,
} from './logic';
import { de, it } from './texts';

const TRIALS = 14;
const QUICK_TRIALS = 3;
const DEMO_TRIALS = 2;
const FIRST_MS: [number, number] = [1400, 2000];
const DEMO_FIRST_MS = 2400;
const DEMO_GAP_MS = 1900;
/** Demo: Bogen (Grad, mit Vorzeichen) vor dem 2. Zeichen */
const DEMO_CURVES = [0, 60, -55];
/** Spurfarbe (hell, leicht bläulich) */
const TRAIL_RGB = '214,232,255';

class NachziehSpur extends FreeFlightExercise {
  private readonly trail = new TrailBuffer(TRAIL_MS_MAX + 120);
  private signAt = 0;
  private turnAt = -1;
  private turnDir: 1 | -1 = 1;
  private turnDeg = 0;
  private busySub = false;
  private demoIdx = 0;
  /** weich nachgeführte Spur-Werte */
  private trailNow = 500;
  private alphaNow = 0.16;

  constructor(ctx: ExerciseContext) {
    super(ctx, { trials: TRIALS, quickTrials: QUICK_TRIALS, demoTrials: DEMO_TRIALS, demoLevel: 4, exposureFor });
  }

  protected baseSpeed(level: number): number {
    return speedFor(level);
  }

  protected flightStart(t: number): void {
    const { rng } = this.ctx;
    this.place(rng.range(0.25, 0.75), rng.range(0.3, 0.7), this.demo ? deg(200) : rng.range(-Math.PI, Math.PI));
    this.trail.clear();
    this.trailNow = trailMsFor(this.level);
    this.alphaNow = trailAlphaFor(this.level);
    this.busySub = false;
    this.turnAt = -1;
    this.demoIdx = 0;
    this.signAt = t + (this.demo ? DEMO_FIRST_MS : rng.range(FIRST_MS[0], FIRST_MS[1]));
  }

  protected flightUpdate(dt: number, t: number): void {
    this.trailNow = approach(this.trailNow, trailMsFor(this.level), dt, 0.6);
    this.alphaNow = approach(this.alphaNow, trailAlphaFor(this.level), dt, 0.6);
    this.trail.push(this.path.x, this.path.y, t);
    if (this.busySub || this.finished || this.phase !== 'wait') return;
    if (this.turnAt >= 0 && t >= this.turnAt && !this.path.turning) {
      this.path.startTurn(this.turnDir * deg(this.turnDeg), CURVE_MS);
      this.turnAt = -1;
    }
    if (t >= this.signAt && this.turnAt < 0 && !this.path.turning) {
      if (this.signRoom(t - this.signAt)) {
        this.busySub = true;
        this.beginSign(t);
      } else this.steerForSign();
    }
  }

  protected flightTrialDone(t: number): void {
    const { rng } = this.ctx;
    this.busySub = false;
    this.signAt = t + (this.demo ? DEMO_GAP_MS : drawRunMs(rng));
    this.turnAt = -1;
    if (this.demo) {
      this.demoIdx++;
      const c = DEMO_CURVES[this.demoIdx % DEMO_CURVES.length];
      if (c !== 0) {
        this.turnDeg = Math.abs(c);
        this.turnDir = c > 0 ? 1 : -1;
        this.turnAt = t + 250;
      }
    } else if (rng.chance(curveChanceFor(this.level))) {
      this.turnDeg = drawCurveDeg(rng);
      this.turnDir = rng.chance(0.5) ? 1 : -1;
      this.turnAt = t + rng.range(150, 500);
      // der Bogen muss vor dem Zeichen fertig sein
      this.signAt = Math.max(this.signAt, this.turnAt + CURVE_MS + 250);
    }
  }

  protected ballGlow(): number {
    return 0;
  }

  /** Spur: weicher Kometenschweif hinter dem Kopf, linear verblassend, nur Ablenkung */
  protected renderBehind(g: CanvasRenderingContext2D, now: number): void {
    const s = this.trail.samples;
    if (s.length < 1) return;
    const len = Math.max(50, this.trailNow);
    const peak = this.alphaNow;
    const r = ballRadiusFor(this.signNow);
    g.save();
    g.lineCap = 'butt';
    let px = this.path.x;
    let py = this.path.y;
    let pt = now;
    for (let i = s.length - 1; i >= 0; i--) {
      const q = s[i];
      const age = now - (q.t + pt) / 2;
      const frac = age / len;
      if (frac >= 1) break;
      const d = Math.hypot(px - q.x, py - q.y);
      if (d > 0.15) {
        g.strokeStyle = `rgba(${TRAIL_RGB},${trailFade(frac, peak).toFixed(3)})`;
        g.lineWidth = Math.max(1.5, 2 * r * trailWidth(frac));
        g.beginPath();
        g.moveTo(px, py);
        g.lineTo(q.x, q.y);
        g.stroke();
      }
      px = q.x;
      py = q.y;
      pt = q.t;
    }
    g.restore();
  }
}

export const nachziehSpur: ExerciseDefinition = {
  id: 'nachzieh-spur',
  category: 'bewegung',
  minutes: 1,
  color: '#3C6DB5',
  icon:
    '<path d="M6 36C14 35 24 30 35 22" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" opacity="0.28"/><path d="M12 33C19 32 27 28 35 22" fill="none" stroke="currentColor" stroke-width="4.4" stroke-linecap="round" opacity="0.5"/><circle cx="37" cy="21" r="6" fill="currentColor"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new NachziehSpur(ctx),
};
