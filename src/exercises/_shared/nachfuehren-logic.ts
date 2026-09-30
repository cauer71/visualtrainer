/**
 * Nachführen mit dem Finger – reine Logik des gemeinsamen Kerns (ohne Canvas, damit testbar).
 * Die Oberfläche und die Schnittstelle für neue Übungen stehen in `nachfuehren.ts` (dort oben dokumentiert).
 *
 * Längen sind in „u“ gerechnet (1 u = 1 % der kürzeren Bühnenseite, mindestens ≈ 7,4 px), Zeiten in Sekunden.
 * Das Spielfeld hat seinen Nullpunkt in der Mitte; x wächst nach rechts, y nach UNTEN (wie auf dem Bildschirm).
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';

export interface Vec {
  x: number;
  y: number;
}

/** Welche Achsen der Finger steuert: nur waagerecht, nur senkrecht oder beide. */
export type Axes = 'x' | 'y' | 'xy';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 12;
/** Anteil der Zeit im Band, ab dem ein Durchgang „gelungen“ ist (Stufe steigt) */
export const PASS_FRACTION = 0.6;
/** Einlaufzeit vor der Wertung (s): die Bahn steht am Startpunkt, der Finger findet die Marke (zählt nur bei Fingerkontakt) */
export const LEAD_S = 1.2;
/** Dauer der Wertung je Durchgang (s) – fest, keine Zeitboni */
export const SEGMENT_S = 11;
export const QUICK_SEGMENT_S = 4;
export const DEMO_SEGMENT_S = 6.5;

/** Halbe Breite des Toleranzbands (u) auf Stufe `level`: 5,0 u auf Stufe 1 → ≈ 3,35 u auf Stufe 12 */
export function defaultBandU(level: number): number {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  return 5 - 0.15 * (lv - 1);
}

export function segmentSeconds(mode: { demo: boolean; quick: boolean }, normal = SEGMENT_S): number {
  return mode.demo ? DEMO_SEGMENT_S : mode.quick ? QUICK_SEGMENT_S : normal;
}

/** Versatz der Marke nach oben über dem Finger (px): ≈ 6 u, aber immer deutlich mehr als der Markenradius */
export function fingerOffsetPx(u: number, markR: number): number {
  return Math.max(6 * u, markR + 26);
}

/** Punkte für einen Durchgang: Stufe × Anteil im Band */
export function pointsFor(level: number, fraction: number): number {
  return Math.round(10 * Math.floor(level + 1e-9) * clamp(fraction, 0, 1));
}

/** Sanfte Stufe 0..1 (Hermite) */
export function smoothstep(k: number): number {
  const x = clamp(k, 0, 1);
  return x * x * (3 - 2 * x);
}

/**
 * Zeitverzerrung für sanften Start: Die Geschwindigkeit wächst in `ramp` Sekunden von 0 auf 1 (gleichmäßige Beschleunigung),
 * danach läuft die Zeit normal weiter. Stetig und stetig differenzierbar. Für s ≤ 0 gilt 0.
 * Beispiel: `path(rampTime(s, 1.5) * tempo)` – die Bahn startet aus dem Stand statt mit voller Geschwindigkeit.
 */
export function rampTime(s: number, ramp: number): number {
  if (s <= 0) return 0;
  if (ramp <= 0 || s >= ramp) return s - ramp / 2;
  return (s * s) / (2 * ramp);
}

/**
 * Weiche Bewegung von 0 nach 1 mit „Trapez“-Geschwindigkeit: in den ersten und letzten Anteilen `a` (0 … 0,5) der Zeit
 * gleichmäßig beschleunigen bzw. bremsen, dazwischen gleichmäßig schnell (a = 0,5: Dreieck, ≈ Kosinus-Kurve).
 * Stetig und stetig differenzierbar (keine Geschwindigkeitssprünge). u = Zeitanteil 0..1.
 */
export function trapezoid(u: number, a = 0.2): number {
  const x = clamp(u, 0, 1);
  const k = clamp(a, 1e-6, 0.5);
  const vmax = 1 / (1 - k);
  if (x < k) return (vmax * x * x) / (2 * k);
  if (x <= 1 - k) return vmax * (k / 2 + (x - k));
  return 1 - (vmax * (1 - x) * (1 - x)) / (2 * k);
}

/**
 * Weiches, unregelmäßiges Schwanken: Summe mehrerer Sinuswellen mit zufälliger Phase und zufälligen Perioden.
 * Werte liegen garantiert in [−1, 1]; typische Ausschläge ≈ ±0,5. Deterministisch zum Startwert der `rng`.
 */
export class Wobble {
  private readonly amp: number[] = [];
  private readonly w: number[] = [];
  private readonly ph: number[] = [];
  /** Größte mögliche Änderung pro Sekunde (obere Schranke der Steigung) */
  readonly maxSlope: number;

  constructor(rng: Rng, parts = 3, minPeriod = 2.5, maxPeriod = 7) {
    const n = Math.max(1, Math.round(parts));
    let slope = 0;
    for (let i = 0; i < n; i++) {
      const period = rng.range(minPeriod, maxPeriod);
      this.amp.push(1 / n);
      this.w.push((2 * Math.PI) / period);
      this.ph.push(rng.range(0, Math.PI * 2));
      slope += ((2 * Math.PI) / period) / n;
    }
    this.maxSlope = slope;
  }

  at(s: number): number {
    let v = 0;
    for (let i = 0; i < this.amp.length; i++) v += this.amp[i] * Math.sin(this.w[i] * s + this.ph[i]);
    return v;
  }
}

/** Die Bewegungsregel einer Übung für einen Durchgang (siehe `nachfuehren.ts`). */
export interface TrackRule {
  /** Ort der Zielmarke (u) zur Zeit s ∈ [0, Dauer]; s < 0 wird vom Kern auf 0 gesetzt. Stetig, endlich, innerhalb des Felds. */
  target(s: number): Vec;
  /** Unsichtbare Verschiebung (u), die zur Zeigermarke addiert wird (Störkraft). Nur auf den freien Achsen wirksam. Stetig. */
  disturbance?(s: number): Vec;
  /** Nur Anzeige: Richtung (Einheitsvektor, 0-Vektor = nichts) eines kleinen Pfeils neben der Marke, z. B. „Zug nach oben“. */
  hint?(s: number): Vec;
}

/** Was der Kern einer Übung beim Bau einer Regel mitgibt. */
export interface RuleSetup {
  /** Stufe (ganzzahlig, MIN_LEVEL … MAX_LEVEL) */
  level: number;
  /** Zufallsgenerator der Übung (im Film mit festem Startwert) – nie Math.random verwenden */
  rng: Rng;
  /** Halbe Breite/Höhe des nutzbaren Felds (u): Ziele sollen innerhalb ±hw / ±hh bleiben (Rand fürs Band ist schon abgezogen) */
  hw: number;
  hh: number;
  /** Dauer der Wertung (s) */
  seconds: number;
  /** Intro-Film (leichtere Parameter, feste Zufallsfolge) */
  demo: boolean;
}

/** Komponenten auf gesperrten Achsen durch den Ankerwert ersetzen. */
export function lockAxes(v: Vec, axes: Axes, anchor: Vec): Vec {
  return { x: axes === 'y' ? anchor.x : v.x, y: axes === 'x' ? anchor.y : v.y };
}

/** Störverschiebung auf den freien Achsen (auf gesperrten Achsen 0). */
export function freeDisturbance(d: Vec | undefined, axes: Axes): Vec {
  if (!d) return { x: 0, y: 0 };
  return { x: axes === 'y' ? 0 : d.x, y: axes === 'x' ? 0 : d.y };
}

/**
 * Zeigermarke (u) aus der gemerkten Fingerposition `fm` (u): gesperrte Achsen liegen auf der Zielmarke, die Störung kommt dazu,
 * und am Ende wird auf das Feld (± Rand) begrenzt.
 */
export function markerFrom(fm: Vec, axes: Axes, target: Vec, dist: Vec | undefined, hw: number, hh: number, pad = 2): Vec {
  const l = lockAxes(fm, axes, target);
  const d = freeDisturbance(dist, axes);
  return { x: clamp(l.x + d.x, -(hw + pad), hw + pad), y: clamp(l.y + d.y, -(hh + pad), hh + pad) };
}

/** Zeitgewichtete Auswertung: Zeit im Band und mittlerer Abstand relativ zur Bandbreite */
export class TrackStats {
  time = 0;
  inBand = 0;
  private relSum = 0;

  /** dtSec Sekunden lang mit Abstand errU (u) zum Ziel bei Bandradius bandU (u) */
  add(dtSec: number, errU: number, bandU: number): void {
    if (!(dtSec > 0) || !(bandU > 0)) return;
    const e = Math.abs(errU);
    this.time += dtSec;
    this.relSum += (e / bandU) * dtSec;
    if (e <= bandU) this.inBand += dtSec;
  }

  /** Anteil der Zeit im Band 0..1 (ohne Messzeit: 0) */
  get fraction(): number {
    return this.time > 0 ? this.inBand / this.time : 0;
  }

  /** Mittlerer Abstand als Vielfaches des Bandradius (0,5 = im Mittel halb so weit wie das Band breit ist) */
  get meanRelative(): number {
    return this.time > 0 ? this.relSum / this.time : 0;
  }

  get passed(): boolean {
    return this.fraction >= PASS_FRACTION;
  }

  merge(o: TrackStats): void {
    this.time += o.time;
    this.inBand += o.inBand;
    this.relSum += o.relSum;
  }
}

/** Mittlerer Abstand in Prozent der Bandbreite (Bandradius = 100 %; geräteunabhängig, kleiner ist besser) */
export function deviationPercent(meanRelative: number): number {
  return Math.round(100 * meanRelative);
}

/** Begrenzte, bildratenunabhängige Spur der Marke (höchstens ein Punkt je 1/60 s) */
export class Trail {
  private pts: Vec[] = [];
  private acc = 0;

  constructor(private readonly maxLen = 90) {}

  add(dtSec: number, p: Vec): void {
    this.acc += dtSec;
    if (this.acc < 1 / 60 - 1e-9 && this.pts.length) return;
    this.acc = 0;
    this.pts.push({ x: p.x, y: p.y });
    if (this.pts.length > this.maxLen) this.pts.shift();
  }

  clear(): void {
    this.pts = [];
    this.acc = 0;
  }

  get length(): number {
    return this.pts.length;
  }

  at(i: number): Vec {
    return this.pts[i];
  }
}

/** Kurzform: Abstand zweier Punkte */
export function dist(a: Vec, b: Vec): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
