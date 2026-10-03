/**
 * Subjektive Vertikale (Labor) – reine Logik. Funktionsübung nach dem Prinzip der subjektiven visuellen Vertikalen: Eine helle
 * Linie auf dunklem Grund wird so eingestellt, dass sie senkrecht wirkt. Zwei Verfahren: Die Linie dreht sich langsam und wird
 * gestoppt („Drehen“), oder sie wird mit Tasten verstellt („Einstellen“). Die Starts wechseln zwischen rechts und links geneigt.
 *
 * Winkel in Grad, 0 = senkrecht, positiv = im Uhrzeigersinn geneigt. Gespeichert werden Übungswerte: Mittel der Einstellungen,
 * Betrag, Streuung und der Unterschied je nach Startseite. Die App deutet nichts als Befund und kennt keine Richtwerte; die
 * Winkel gelten nur, wenn das Gerät wirklich gerade steht. Die Drehung rechnet mit `dt` (bildratenunabhängig), Zufall nur über `Rng`.
 */
import { mean, sd } from '../../core/stats';
import type { Rng } from '../../core/rng';
import type { ExerciseParams, ParamDef } from '../../core/types';

export const PARAMS: readonly ParamDef[] = [
  { key: 'trials', type: 'number', unit: 'count', min: 4, max: 20, step: 2, default: 8, summary: true },
  { key: 'method', type: 'select', default: 'rotating', options: ['rotating', 'adjust'], summary: true },
  { key: 'speedDegS', type: 'number', min: 0.5, max: 6, step: 0.5, default: 1.5 },
  { key: 'startMaxDeg', type: 'number', unit: 'deg', min: 10, max: 40, step: 5, default: 25 },
  { key: 'lineCm', type: 'number', unit: 'cm', min: 6, max: 30, step: 1, default: 16 },
];

export type Method = 'rotating' | 'adjust';

export interface VerticalParams {
  trials: number;
  method: Method;
  speedDegS: number;
  startMaxDeg: number;
  lineCm: number;
}

export function verticalParams(p: ExerciseParams): VerticalParams {
  const num = (key: string): number => {
    const d = PARAMS.find((x) => x.key === key)!;
    const v = p[key];
    return typeof v === 'number' && Number.isFinite(v) ? v : (d.default as number);
  };
  return {
    trials: Math.round(num('trials')),
    method: p.method === 'adjust' ? 'adjust' : 'rotating',
    speedDegS: num('speedDegS'),
    startMaxDeg: num('startMaxDeg'),
    lineCm: num('lineCm'),
  };
}

/** Bei diesem Winkel kehrt die drehende Linie um */
export const REVERSE_DEG = 45;
/** Schritte der Tasten im Verfahren „Einstellen“ (Grad): klein und groß */
export const NUDGE_SMALL = 0.5;
export const NUDGE_BIG = 2;
/** Im Schnelllauf (`?quick=1`): Einstellungen und Mindest-Drehgeschwindigkeit */
export const QUICK_TRIALS = 2;
export const QUICK_SPEED = 6;

export interface VerticalTrial {
  nr: number;
  /** Startwinkel (mit Vorzeichen) und eingestellter Winkel in Grad */
  startDeg: number;
  setDeg: number;
  ms: number;
}

export interface VerticalSummary {
  n: number;
  devMean: number | null;
  devAbs: number | null;
  /** Streuung der Einstellungen (erst ab zwei) */
  devSd: number | null;
  /** Mittel bei Start rechts geneigt minus Mittel bei Start links geneigt */
  hysteresis: number | null;
  msMean: number | null;
}

const round = (x: number, d: number): number => {
  const f = 10 ** d;
  return Math.round(x * f) / f;
};

export class VerticalSession {
  idx = 0;
  angle = 0;
  start = 0;
  trials: VerticalTrial[] = [];
  finished = false;
  private dir = 1;
  private sign = 1;
  private readonly firstSign: 1 | -1;
  private running = false;
  private trialMs = 0;
  private readonly rng: Rng;

  constructor(
    readonly p: VerticalParams,
    rng: Rng,
  ) {
    this.rng = rng;
    this.firstSign = rng.chance(0.5) ? 1 : -1;
    this.begin();
  }

  private begin(): void {
    this.sign = this.idx % 2 === 0 ? this.firstSign : (-this.firstSign as 1 | -1);
    const mag = this.p.startMaxDeg * (0.6 + 0.4 * this.rng.next());
    this.angle = this.sign * mag;
    this.start = this.angle;
    this.dir = -this.sign; // dreht zuerst auf die Senkrechte zu
    this.trialMs = 0;
  }

  /** Durchlauf beginnt (die Linie bewegt sich ab jetzt) */
  startRun(): void {
    this.running = true;
  }

  /** `dt` in Sekunden; im Verfahren „Drehen“ dreht sich die Linie, bei ±45° kehrt sie um */
  update(dt: number): void {
    if (!this.running || this.finished) return;
    const d = Math.min(0.1, Math.max(0, dt));
    this.trialMs += d * 1000;
    if (this.p.method !== 'rotating') return;
    this.angle += this.dir * this.p.speedDegS * d;
    if (this.angle > REVERSE_DEG) {
      this.angle = REVERSE_DEG;
      this.dir = -1;
    }
    if (this.angle < -REVERSE_DEG) {
      this.angle = -REVERSE_DEG;
      this.dir = 1;
    }
  }

  /** Verfahren „Einstellen“: Winkel um `delta` Grad ändern */
  nudge(delta: number): boolean {
    if (this.finished || !this.running || this.p.method !== 'adjust') return false;
    this.angle = Math.max(-REVERSE_DEG, Math.min(REVERSE_DEG, round(this.angle + delta, 3)));
    return true;
  }

  /** Die Linie wirkt senkrecht */
  confirm(): boolean {
    if (this.finished || !this.running) return false;
    this.trials.push({ nr: this.idx + 1, startDeg: round(this.start, 1), setDeg: round(this.angle, 2), ms: Math.round(this.trialMs) });
    this.idx++;
    if (this.idx >= this.p.trials) this.finished = true;
    else this.begin();
    return true;
  }

  summary(): VerticalSummary {
    const set = this.trials.map((t) => t.setDeg);
    const cw = this.trials.filter((t) => t.startDeg > 0).map((t) => t.setDeg);
    const ccw = this.trials.filter((t) => t.startDeg < 0).map((t) => t.setDeg);
    return {
      n: this.trials.length,
      devMean: set.length ? round(mean(set), 2) : null,
      devAbs: set.length ? round(mean(set.map(Math.abs)), 2) : null,
      devSd: set.length > 1 ? round(sd(set), 2) : null,
      hysteresis: cw.length && ccw.length ? round(mean(cw) - mean(ccw), 2) : null,
      msMean: this.trials.length ? Math.round(mean(this.trials.map((t) => t.ms))) : null,
    };
  }
}

/** Tipp nach dem Durchlauf (Schlüssel in `texts.tips`) */
export function tipFor(sum: VerticalSummary): string {
  return sum.n < 8 ? 'more' : 'calm';
}
