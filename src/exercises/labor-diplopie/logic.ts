/**
 * Diplopie-Karte (Labor) – reine Logik. Funktionsübung nach dem Prinzip einer Karte der Blickrichtungen: In neun Blickrichtungen
 * (Mitte und acht Randpunkte) erscheint ein Ziel; mit der Rot-Grün-Brille sieht ein Auge es rot, das andere in der zweiten Farbe. Du
 * sagst, ob du ein Bild oder zwei siehst. Bei zwei Bildern schiebst du das zweite auf das erste; die nötige Verschiebung wird in
 * Prismendioptrien Δ (1 Δ = 1 cm auf 1 m) umgerechnet und als Übungswert festgehalten.
 *
 * Orte in cm relativ zur Mitte des Feldes, y nach oben (siehe `_shared/pruefung-blick.ts`). Waagerecht positiv = das zweite Bild
 * wurde nach rechts geschoben, senkrecht positiv = nach oben (nur Beschreibung der Verschiebung, keine Deutung). Die App deutet
 * nichts als Befund und kennt keine Richtwerte. Zeit in ms (virtuelle Uhr), Zufall nur über `Rng`.
 */
import { mean } from '../../core/stats';
import type { Rng } from '../../core/rng';
import type { ExerciseParams, ParamDef } from '../../core/types';
import { ANA_PARAMS, anaParams, cmToPd, type AnaParams } from '../_shared/pruefung-anaglyph';
import { fitGrid, nineGrid, type FittedPoint, type GridFit } from '../_shared/pruefung-blick';

export const PARAMS: readonly ParamDef[] = [
  { key: 'gazeDeg', type: 'number', unit: 'deg', min: 5, max: 35, step: 5, default: 15, summary: true },
  { key: 'targetCm', type: 'number', unit: 'cm', min: 0.5, max: 2.5, step: 0.1, default: 1, summary: true },
  ...ANA_PARAMS,
];

export interface DiplopiaParams extends AnaParams {
  gazeDeg: number;
  targetCm: number;
}

export function diplopiaParams(p: ExerciseParams): DiplopiaParams {
  const num = (key: string): number => {
    const d = PARAMS.find((x) => x.key === key)!;
    const v = p[key];
    return typeof v === 'number' && Number.isFinite(v) ? v : (d.default as number);
  };
  return { ...anaParams(p), gazeDeg: num('gazeDeg'), targetCm: num('targetCm') };
}

/** Rand (cm) zwischen Raster und Feldrand */
export const MARGIN_CM = 1.5;
/** Im Schnelllauf (`?quick=1`): Blickrichtungen */
export const QUICK_POSITIONS = 4;

export type DiplopiaState = 'ask' | 'align' | 'chart' | 'done';

export interface DiplopiaResult {
  nr: number;
  id: number;
  /** Blickwinkel der Richtung in Grad */
  hDeg: number;
  vDeg: number;
  double: boolean;
  /** Verschiebung des zweiten Bildes in Δ (waagerecht + nach rechts, senkrecht + nach oben); 0 bei einem Bild */
  sepHPd: number;
  sepVPd: number;
  ms: number;
  /** Ort des Ziels und des zweiten Bildes (cm relativ zur Mitte, y nach oben) */
  tx: number;
  ty: number;
  mx: number;
  my: number;
}

export interface DiplopiaSummary {
  positions: number;
  total: number;
  doubleCount: number;
  doublePct: number | null;
  sepMean: number | null;
  sepMax: number | null;
  /** 1 = Doppelbilder in der Mitte gemeldet, 0 = nicht, null = Mitte nicht geprüft */
  centerDouble: number | null;
  effDeg: number;
  clamped: boolean;
  msMean: number | null;
}

export interface DiplopiaEnv {
  rng: Rng;
  wCm: number;
  hCm: number;
  distCm: number;
  /** Höchstens so viele Richtungen (Schnelllauf, Intro-Film); sonst alle neun */
  maxPoints?: number;
}

const round = (x: number, d: number): number => {
  const f = 10 ** d;
  return Math.round(x * f) / f;
};

export class DiplopiaSession {
  readonly points: FittedPoint[];
  readonly fit: GridFit;
  readonly distCm: number;
  order: number[];
  k = 0;
  state: DiplopiaState = 'ask';
  /** Zweites Bild beim Ausgleichen (cm relativ zur Mitte, y nach oben) */
  marker = { x: 0, y: 0 };
  moved = false;
  results: DiplopiaResult[] = [];
  finished = false;
  private shownAt = 0;

  constructor(
    readonly p: Pick<DiplopiaParams, 'gazeDeg'>,
    env: DiplopiaEnv,
  ) {
    this.distCm = env.distCm;
    this.fit = fitGrid(env.distCm, nineGrid(p.gazeDeg), env.wCm, env.hCm, MARGIN_CM);
    this.points = this.fit.points;
    const all = env.rng.shuffle(this.points.map((_, i) => i));
    this.order = env.maxPoints ? all.slice(0, Math.max(1, env.maxPoints)) : all;
  }

  get total(): number {
    return this.order.length;
  }

  current(): FittedPoint | null {
    return this.state === 'ask' || this.state === 'align' ? this.points[this.order[this.k]] : null;
  }

  start(now: number): void {
    this.shownAt = now;
  }

  private record(t: FittedPoint, double: boolean, dx: number, dy: number, now: number): void {
    this.results.push({
      nr: this.k + 1,
      id: t.id,
      hDeg: round(t.hx, 1),
      vDeg: round(t.vy, 1),
      double,
      sepHPd: double ? round(cmToPd(dx, this.distCm), 1) : 0,
      sepVPd: double ? round(cmToPd(dy, this.distCm), 1) : 0,
      ms: Math.round(now - this.shownAt),
      tx: t.x,
      ty: t.y,
      mx: t.x + (double ? dx : 0),
      my: t.y + (double ? dy : 0),
    });
    this.k++;
    this.marker = { x: 0, y: 0 };
    this.moved = false;
    this.shownAt = now;
    if (this.k >= this.order.length) this.state = 'chart';
    else this.state = 'ask';
  }

  /** „Ein Bild“ */
  answerSingle(now: number): boolean {
    if (this.state !== 'ask') return false;
    this.record(this.current()!, false, 0, 0, now);
    return true;
  }

  /** „Zwei Bilder“: weiter zum Ausgleichen */
  answerDouble(): boolean {
    if (this.state !== 'ask') return false;
    const t = this.current()!;
    this.state = 'align';
    this.marker = { x: t.x, y: t.y };
    this.moved = false;
    return true;
  }

  /** Zweites Bild setzen (cm relativ zur Mitte, y nach oben; die Oberfläche begrenzt auf das Feld) */
  place(x: number, y: number): void {
    if (this.state !== 'align') return;
    this.marker = { x, y };
    this.moved = true;
  }

  /** „Deckungsgleich“; erst nach einer Bewegung möglich */
  confirm(now: number): boolean {
    if (this.state !== 'align' || !this.moved) return false;
    const t = this.current()!;
    this.record(t, true, this.marker.x - t.x, this.marker.y - t.y, now);
    return true;
  }

  closeChart(): boolean {
    if (this.state !== 'chart') return false;
    this.state = 'done';
    this.finished = true;
    return true;
  }

  summary(): DiplopiaSummary {
    const dbl = this.results.filter((r) => r.double);
    const mag = dbl.map((r) => Math.hypot(r.sepHPd, r.sepVPd));
    const center = this.results.find((r) => r.hDeg === 0 && r.vDeg === 0);
    const ms = this.results.map((r) => r.ms);
    return {
      positions: this.results.length,
      total: this.total,
      doubleCount: dbl.length,
      doublePct: this.results.length ? round((100 * dbl.length) / this.results.length, 0) : null,
      sepMean: mag.length ? round(mean(mag), 1) : null,
      sepMax: mag.length ? round(Math.max(...mag), 1) : null,
      centerDouble: center ? (center.double ? 1 : 0) : null,
      effDeg: round(this.fit.effMaxDeg, 1),
      clamped: this.fit.clamped,
      msMean: ms.length ? Math.round(mean(ms)) : null,
    };
  }
}

/** Richtung als Schlüssel für die Benennung: Mitte, oben, unten, links, rechts, oben links … */
export function directionKey(hDeg: number, vDeg: number): { v: 'up' | 'down' | ''; h: 'left' | 'right' | '' } {
  return { v: vDeg > 0.05 ? 'up' : vDeg < -0.05 ? 'down' : '', h: hDeg > 0.05 ? 'right' : hDeg < -0.05 ? 'left' : '' };
}

/** Tipp nach dem Durchlauf (Schlüssel in `texts.tips`) */
export function tipFor(sum: DiplopiaSummary): string {
  return sum.clamped ? 'smallScreen' : 'calm';
}
