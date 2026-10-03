/**
 * Schober-Kreuz und Ring (Labor) – reine Logik. Funktionsübung nach dem Prinzip des klassischen Schober-Verfahrens: Mit einer
 * Rot-Grün-Brille sieht ein Auge nur ein Kreuz, das andere nur einen Ring. Ohne gemeinsames Bild zwischen den Augen liegt das
 * Kreuz oft neben der Mitte des Rings; du schiebst es in kleinen Schritten (Prismendioptrien Δ), bis es für dich mittig liegt.
 * Waagerecht und senkrecht, je zweimal von entgegengesetzten Startseiten.
 *
 * WICHTIG: Die Vorzeichenregeln der Auswertung (Eso-/Exo-Richtung, rechts/links höher) sind nur hergeleitet und nicht gegen ein
 * Messgerät geprüft. Die App zeigt die Verschiebung als Übungswert, deutet sie nicht als Befund und kennt keine Richtwerte.
 *
 * Herleitung (siehe `phoriaH`, `phoriaV`): Das Kreuz erscheint in Richtung der Abweichung des Auges, das es sieht, versetzt und wird
 * zum Ausgleich zurückgeschoben. Waagerecht zählt eine Verschiebung zur Nase hin als Eso-Richtung (+), zur Schläfe hin als
 * Exo-Richtung (−). Senkrecht zählt eine Verschiebung nach oben als „das Auge, das das Kreuz sieht, steht höher“ (+ rechts
 * höher, − links höher). Zeit in ms (virtuelle Uhr), Zufall nur über `Rng`.
 */
import { mean } from '../../core/stats';
import type { Rng } from '../../core/rng';
import type { ExerciseParams, ParamDef } from '../../core/types';
import { ANA_PARAMS, anaParams, type AnaParams } from '../_shared/pruefung-anaglyph';

export const PARAMS: readonly ParamDef[] = [
  { key: 'axes', type: 'select', default: 'both', options: ['both', 'horizontal', 'vertical'], summary: true },
  { key: 'stepPd', type: 'number', min: 0.25, max: 2, step: 0.25, default: 0.5, summary: true },
  { key: 'startPd', type: 'number', min: 2, max: 14, step: 1, default: 6 },
  { key: 'crossColor', type: 'select', default: 'red', options: ['red', 'second'] },
  { key: 'sizeCm', type: 'number', unit: 'cm', min: 2, max: 12, step: 0.5, default: 5 },
  ...ANA_PARAMS,
];

export type Axes = 'both' | 'horizontal' | 'vertical';
export type CrossColor = 'red' | 'second';

export interface SchoberParams extends AnaParams {
  axes: Axes;
  stepPd: number;
  startPd: number;
  crossColor: CrossColor;
  sizeCm: number;
}

export function schoberParams(p: ExerciseParams): SchoberParams {
  const num = (key: string): number => {
    const d = PARAMS.find((x) => x.key === key)!;
    const v = p[key];
    return typeof v === 'number' && Number.isFinite(v) ? v : (d.default as number);
  };
  return {
    ...anaParams(p),
    axes: p.axes === 'horizontal' || p.axes === 'vertical' ? p.axes : 'both',
    stepPd: num('stepPd'),
    startPd: num('startPd'),
    crossColor: p.crossColor === 'second' ? 'second' : 'red',
    sizeCm: num('sizeCm'),
  };
}

export type Eye = 'left' | 'right';

/** Auge, das das Kreuz sieht (Rot: das Auge hinter dem roten Glas, sonst das andere) */
export function crossEyeOf(p: Pick<SchoberParams, 'leftLens' | 'crossColor'>): Eye {
  const redEye: Eye = p.leftLens === 'red' ? 'left' : 'right';
  const otherEye: Eye = redEye === 'left' ? 'right' : 'left';
  return p.crossColor === 'red' ? redEye : otherEye;
}

/**
 * Waagerechte Auswertung nach der hergeleiteten Regel: `shift` > 0 = Kreuz nach rechts geschoben. Positiv = zur Nase hin
 * geschoben (Eso-Richtung), negativ = zur Schläfe hin (Exo-Richtung). Sieht das rechte Auge das Kreuz, ist „nach links“ die
 * Richtung zur Nase; beim linken Auge „nach rechts“.
 */
export function phoriaH(shift: number, crossEye: Eye): number {
  return (crossEye === 'right' ? -shift : shift) + 0;
}

/**
 * Senkrechte Auswertung nach der hergeleiteten Regel: `shift` > 0 = Kreuz nach oben geschoben. Positiv = rechts höher,
 * negativ = links höher (das Auge, das das Kreuz sieht, steht höher, wenn das Kreuz nach oben geschoben werden muss).
 */
export function phoriaV(shift: number, crossEye: Eye): number {
  return (crossEye === 'right' ? shift : -shift) + 0;
}

export type Axis = 'h' | 'v';

export interface SchoberRun {
  axis: Axis;
  /** geplanter Startversatz in Δ (mit Vorzeichen) */
  start: number;
}

export interface SchoberTrial {
  nr: number;
  axis: Axis;
  /** tatsächlicher Startversatz (bei kleinem Bildschirm begrenzt) */
  startPd: number;
  shiftPd: number;
  phoriaPd: number;
  ms: number;
}

export interface SchoberSummary {
  runs: number;
  hMean: number | null;
  hDiff: number | null;
  vMean: number | null;
  vDiff: number | null;
  msMean: number | null;
  /** größter Startversatz (Δ), auf den der Bildschirm begrenzt hat (null = nie begrenzt) */
  limitedTo: number | null;
}

export interface SchoberEnv {
  rng: Rng;
  /** Höchstens so viele Durchgänge (Schnelllauf, Intro-Film); sonst alle */
  maxRuns?: number;
}

const round = (x: number, d: number): number => {
  const f = 10 ** d;
  return Math.round(x * f) / f;
};

export class SchoberSession {
  readonly crossEye: Eye;
  readonly plan: SchoberRun[] = [];
  idx = 0;
  shift = 0;
  trials: SchoberTrial[] = [];
  finished = false;
  /** Obergrenze des Versatzes (Δ) auf dieser Bühne */
  limit = Number.POSITIVE_INFINITY;
  private limitedTo: number | null = null;
  private runStarted = 0;

  constructor(
    readonly p: Pick<SchoberParams, 'axes' | 'stepPd' | 'startPd' | 'leftLens' | 'crossColor'>,
    env: SchoberEnv,
  ) {
    this.crossEye = crossEyeOf(p);
    const axes: Axis[] = p.axes === 'both' ? ['h', 'v'] : [p.axes === 'horizontal' ? 'h' : 'v'];
    for (const a of axes) {
      const sign = env.rng.chance(0.5) ? 1 : -1;
      this.plan.push({ axis: a, start: sign * p.startPd }, { axis: a, start: -sign * p.startPd });
    }
    if (env.maxRuns) this.plan.length = Math.min(this.plan.length, Math.max(1, env.maxRuns));
    this.begin(0);
  }

  /** Obergrenze setzen (Δ); ein Versatz darüber wird zurückgenommen */
  setLimit(pd: number): void {
    this.limit = Math.max(this.p.stepPd, pd);
    this.shift = Math.max(-this.limit, Math.min(this.limit, this.shift));
    if (this.limit < this.p.startPd) this.limitedTo = Math.min(this.limitedTo ?? Infinity, this.limit);
  }

  private begin(now: number): void {
    const run = this.plan[this.idx];
    this.shift = Math.max(-this.limit, Math.min(this.limit, run.start));
    this.runStarted = now;
  }

  start(now: number): void {
    this.runStarted = now;
  }

  get axis(): Axis {
    return (this.plan[Math.min(this.idx, this.plan.length - 1)] ?? this.plan[0]).axis;
  }

  /** Kreuz um `n` Schritte verschieben (+ = nach rechts bzw. oben) */
  step(n: number): boolean {
    if (this.finished || !n) return false;
    const next = round(this.shift + n * this.p.stepPd, 4);
    const c = Math.max(-this.limit, Math.min(this.limit, next));
    if (c === this.shift) return false;
    this.shift = c;
    return true;
  }

  /** Das Kreuz liegt für dich mittig im Ring */
  confirm(now: number): boolean {
    if (this.finished) return false;
    const run = this.plan[this.idx];
    const ph = run.axis === 'h' ? phoriaH(this.shift, this.crossEye) : phoriaV(this.shift, this.crossEye);
    this.trials.push({
      nr: this.idx + 1,
      axis: run.axis,
      startPd: Math.max(-this.limit, Math.min(this.limit, run.start)),
      shiftPd: this.shift,
      phoriaPd: round(ph, 2),
      ms: Math.round(now - this.runStarted),
    });
    this.idx++;
    if (this.idx >= this.plan.length) this.finished = true;
    else this.begin(now);
    return true;
  }

  summary(): SchoberSummary {
    const vals = (a: Axis): number[] => this.trials.filter((t) => t.axis === a).map((t) => t.phoriaPd);
    const h = vals('h');
    const v = vals('v');
    const diff = (x: number[]): number | null => (x.length > 1 ? round(Math.abs(x[0] - x[1]), 2) : null);
    return {
      runs: this.trials.length,
      hMean: h.length ? round(mean(h), 2) : null,
      hDiff: diff(h),
      vMean: v.length ? round(mean(v), 2) : null,
      vDiff: diff(v),
      msMean: this.trials.length ? Math.round(mean(this.trials.map((t) => t.ms))) : null,
      limitedTo: this.limitedTo === null ? null : round(this.limitedTo, 1),
    };
  }
}

/** Tipp nach dem Durchlauf (Schlüssel in `texts.tips`) */
export function tipFor(sum: SchoberSummary): string {
  return sum.limitedTo !== null ? 'limited' : 'bothSides';
}
