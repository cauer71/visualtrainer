/**
 * Hess-Schirm (Labor) – reine Logik. Funktionsübung nach dem Prinzip des klassischen Hess-Schirms: Mit einer
 * Rot-Grün-Brille sieht ein Auge nur den Zielpunkt eines Rasters, das andere nur einen Zeiger. Du legst den Zeiger dorthin,
 * wo er auf dem Ziel zu liegen scheint; danach tauschen die Augen die Rollen (Durchgang A und B).
 *
 * Gerechnet wird auf einer ebenen Fläche: Ort = Abstand · tan(Blickwinkel) (siehe `_shared/pruefung-blick.ts`). Alle Orte
 * in cm relativ zur Mitte des Feldes, y nach oben. Gespeichert werden Übungswerte: Abweichung zwischen gesetztem Ort und Ziel in
 * Grad (waagerecht, senkrecht, Betrag) und die Fläche des Umrisses der äußeren Punkte im Verhältnis zum Sollumriss. Die App
 * deutet nichts als Befund und kennt keine Richtwerte. Zeiten in ms (virtuelle Zeit), Zufall nur über `Rng`.
 */
import { mean } from '../../core/stats';
import type { Rng } from '../../core/rng';
import type { ExerciseParams, ParamDef } from '../../core/types';
import { ANA_PARAMS, anaParams, type AnaColor, type AnaParams } from '../_shared/pruefung-anaglyph';
import { fitGrid, hessGrid, polygonArea, unproject, type FittedPoint, type GridFit } from '../_shared/pruefung-blick';

export const PARAMS: readonly ParamDef[] = [
  { key: 'maxDeg', type: 'number', unit: 'deg', min: 10, max: 35, step: 5, default: 20, summary: true },
  { key: 'grid', type: 'select', default: 'both', options: ['both', 'inner'], summary: true },
  { key: 'passes', type: 'select', default: 'both', options: ['both', 'one'] },
  { key: 'targetCm', type: 'number', unit: 'cm', min: 0.4, max: 2, step: 0.1, default: 0.8 },
  { key: 'markerCm', type: 'number', unit: 'cm', min: 0.4, max: 2, step: 0.1, default: 0.8 },
  ...ANA_PARAMS,
];

export type HessGridMode = 'both' | 'inner';
export type HessPasses = 'both' | 'one';

export interface HessParams extends AnaParams {
  maxDeg: number;
  grid: HessGridMode;
  passes: HessPasses;
  targetCm: number;
  markerCm: number;
}

export function hessParams(p: ExerciseParams): HessParams {
  const num = (key: string): number => {
    const d = PARAMS.find((x) => x.key === key)!;
    const v = p[key];
    return typeof v === 'number' && Number.isFinite(v) ? v : (d.default as number);
  };
  return {
    ...anaParams(p),
    maxDeg: num('maxDeg'),
    grid: p.grid === 'inner' ? 'inner' : 'both',
    passes: p.passes === 'one' ? 'one' : 'both',
    targetCm: num('targetCm'),
    markerCm: num('markerCm'),
  };
}

/** Rand (cm) zwischen Raster und Feldrand */
export const MARGIN_CM = 1.5;
/** Im Schnelllauf (`?quick=1`): Punkte je Durchgang */
export const QUICK_POINTS = 4;

export type HessState = 'placing' | 'chart' | 'done';

/** Ein gesetzter Punkt (Winkel in Grad, Orte in cm relativ zur Mitte, y nach oben) */
export interface HessResult {
  pass: 'A' | 'B';
  /** Auge, das in diesem Durchgang fixiert und das Ziel sieht */
  fixEye: 'left' | 'right';
  id: number;
  ring: string;
  targetH: number;
  targetV: number;
  placedH: number;
  placedV: number;
  devH: number;
  devV: number;
  dev: number;
  ms: number;
  /** Ort des Ziels und des Zeigers (cm) */
  tx: number;
  ty: number;
  mx: number;
  my: number;
}

export interface HessSummary {
  placed: number;
  total: number;
  devA: number | null;
  devB: number | null;
  areaA: number | null;
  areaB: number | null;
  areaRatio: number | null;
  msMean: number | null;
  effDeg: number;
  clamped: boolean;
  passesDone: number;
}

export interface HessEnv {
  rng: Rng;
  /** Feld in cm (für die Anpassung des Rasters) */
  wCm: number;
  hCm: number;
  /** Sehentfernung in cm (Kalibrierung) */
  distCm: number;
  /** Höchstens so viele Punkte je Durchgang (Schnelllauf, Intro-Film); sonst alle */
  maxPoints?: number;
}

const round = (x: number, d: number): number => {
  const f = 10 ** d;
  return Math.round(x * f) / f;
};

export class HessSession {
  readonly points: FittedPoint[];
  readonly fit: GridFit;
  readonly nPasses: number;
  readonly distCm: number;
  passIdx = 0;
  k = 0;
  order: number[] = [];
  state: HessState = 'placing';
  /** Zeiger (cm relativ zur Mitte, y nach oben) */
  marker = { x: 0, y: 0 };
  moved = false;
  results: HessResult[] = [];
  finished = false;
  private shownAt = 0;
  private readonly rng: Rng;
  private readonly maxPoints: number | undefined;

  constructor(
    readonly p: Pick<HessParams, 'maxDeg' | 'grid' | 'passes' | 'leftLens'>,
    env: HessEnv,
  ) {
    this.rng = env.rng;
    this.distCm = env.distCm;
    this.maxPoints = env.maxPoints;
    const grid = hessGrid(p.maxDeg).filter((pt) => p.grid === 'both' || pt.ring === 'inner');
    this.fit = fitGrid(env.distCm, grid, env.wCm, env.hCm, MARGIN_CM);
    this.points = this.fit.points;
    this.nPasses = p.passes === 'one' ? 1 : 2;
    this.newPass(0);
  }

  private newPass(now: number): void {
    const all = this.rng.shuffle(this.points.map((_, i) => i));
    this.order = this.maxPoints ? all.slice(0, Math.max(1, this.maxPoints)) : all;
    this.k = 0;
    this.marker = { x: 0, y: 0 };
    this.moved = false;
    this.shownAt = now;
  }

  /** Punkte je Durchgang */
  get perPass(): number {
    return this.order.length;
  }

  get total(): number {
    return this.perPass * this.nPasses;
  }

  passName(idx = this.passIdx): 'A' | 'B' {
    return idx === 0 ? 'A' : 'B';
  }

  /** Farbe des Ziels in diesem Durchgang: A = Rot, B = zweite Farbe; der Zeiger hat die andere */
  targetColor(idx = this.passIdx): AnaColor {
    return idx === 0 ? 'a' : 'b';
  }

  markerColor(idx = this.passIdx): AnaColor {
    return idx === 0 ? 'b' : 'a';
  }

  /** Auge, das in diesem Durchgang fixiert: A das Auge hinter dem roten Glas, B das andere */
  fixEye(idx = this.passIdx): 'left' | 'right' {
    const redEye = this.p.leftLens === 'red' ? 'left' : 'right';
    return idx === 0 ? redEye : redEye === 'left' ? 'right' : 'left';
  }

  current(): FittedPoint | null {
    return this.state === 'placing' ? this.points[this.order[this.k]] : null;
  }

  /** Zeiger auf einen Ort setzen (cm relativ zur Mitte, y nach oben; die Oberfläche begrenzt auf das Feld) */
  place(x: number, y: number): void {
    if (this.state !== 'placing') return;
    this.marker = { x, y };
    this.moved = true;
  }

  /** Bestätigen; erst möglich, wenn der Zeiger bewegt wurde */
  confirm(now: number): boolean {
    if (this.state !== 'placing' || !this.moved) return false;
    const t = this.current()!;
    const pl = unproject(this.distCm, this.marker.x, this.marker.y);
    const dh = pl.hx - t.hx;
    const dv = pl.vy - t.vy;
    this.results.push({
      pass: this.passName(),
      fixEye: this.fixEye(),
      id: t.id,
      ring: t.ring,
      targetH: round(t.hx, 2),
      targetV: round(t.vy, 2),
      placedH: round(pl.hx, 2),
      placedV: round(pl.vy, 2),
      devH: round(dh, 2),
      devV: round(dv, 2),
      dev: round(Math.hypot(dh, dv), 2),
      ms: Math.round(now - this.shownAt),
      tx: t.x,
      ty: t.y,
      mx: this.marker.x,
      my: this.marker.y,
    });
    this.k++;
    this.moved = false;
    this.marker = { x: 0, y: 0 };
    this.shownAt = now;
    if (this.k >= this.order.length) {
      this.passIdx++;
      if (this.passIdx >= this.nPasses) this.state = 'chart';
      else this.newPass(now);
    }
    return true;
  }

  /** Karte angesehen: Übung beenden */
  closeChart(): boolean {
    if (this.state !== 'chart') return false;
    this.state = 'done';
    this.finished = true;
    return true;
  }

  passResults(name: 'A' | 'B'): HessResult[] {
    return this.results.filter((r) => r.pass === name);
  }

  /** Größter Winkel des Rasters (Grad) */
  get edgeDeg(): number {
    return this.fit.effMaxDeg;
  }

  /** Randpunkte (größter Winkel) eines Durchgangs, nach Winkel um die Mitte geordnet */
  boundary(name: 'A' | 'B'): HessResult[] {
    const edge = this.edgeDeg;
    return this.passResults(name)
      .filter((r) => Math.max(Math.abs(r.targetH), Math.abs(r.targetV)) >= edge - 0.05)
      .sort((a, b) => Math.atan2(a.targetV, a.targetH) - Math.atan2(b.targetV, b.targetH));
  }

  /** Fläche des Umrisses der gesetzten Randpunkte in Prozent der Fläche des Quadrats (2 · größter Winkel)² */
  areaPct(name: 'A' | 'B'): number | null {
    const b = this.boundary(name);
    if (b.length < 4) return null;
    const area = polygonArea(b.map((r) => ({ x: r.placedH, y: r.placedV })));
    return (100 * area) / (2 * this.edgeDeg) ** 2;
  }

  summary(): HessSummary {
    const devs = (n: 'A' | 'B'): number[] => this.passResults(n).map((r) => r.dev);
    const dA = devs('A');
    const dB = devs('B');
    const aA = this.areaPct('A');
    const aB = this.areaPct('B');
    const ms = this.results.map((r) => r.ms);
    return {
      placed: this.results.length,
      total: this.total,
      devA: dA.length ? round(mean(dA), 2) : null,
      devB: dB.length ? round(mean(dB), 2) : null,
      areaA: aA === null ? null : round(aA, 0),
      areaB: aB === null ? null : round(aB, 0),
      areaRatio: aA !== null && aB !== null && aB > 0 ? round(aA / aB, 2) : null,
      msMean: ms.length ? Math.round(mean(ms)) : null,
      effDeg: round(this.fit.effMaxDeg, 1),
      clamped: this.fit.clamped,
      passesDone: Math.min(this.passIdx, this.nPasses),
    };
  }
}

/** Tipp nach dem Durchlauf (Schlüssel in `texts.tips`) */
export function tipFor(sum: HessSummary): string {
  return sum.clamped ? 'smallScreen' : sum.placed >= 20 ? 'pause' : 'fixTarget';
}
