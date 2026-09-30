/**
 * Spur folgen – reine Logik (ohne Canvas, damit testbar).
 *
 * Eine Wellenlinie scrollt von rechts nach links; an einer festen Stelle (Zielmarke) liegt die Linie auf der Höhe y(s).
 * Mit dem Finger steuert man eine Zeiger-Marke (Höhe = Fingerhöhe, versetzt) und hält sie auf der Zielmarke.
 * Alle Längen sind in „u“ gerechnet (1 u = 1 % der kürzeren Bühnenseite, mindestens ≈ 7,4 px), Tempo in u/s
 * (dt-basiert, bildratenunabhängig).
 *
 * - Jeder Durchgang hat eine eigene Welle (zufällige Phase), am Anfang und Ende flach eingeblendet.
 * - Stufe: Tempo 8 → 19 u/s, Wellenhöhe 5 → ≈ 14 u, Wellenlänge 64 → ≈ 44 u (also höhere Frequenz).
 * - Gemessen wird nur, solange der Finger am Glas liegt und die Welle läuft: Zeit im Toleranzband (± 3,6 u) und mittlere
 *   Abweichung (u, zeitgewichtet).
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';

export const MIN_LEVEL = 1;
/** Verhältnis von Nebenwelle zu Hauptwelle (Frequenz) */
export const SECOND_HARMONIC = 2.3;
export const MAX_LEVEL = 12;
/** Halbe Breite des Toleranzbands in u (≈ 5 mm am Tablet) */
export const BAND_U = 3.6;
/** Anteil der Zeit im Band, ab dem ein Durchgang „gelungen“ ist (Stufe steigt) */
export const PASS_FRACTION = 0.6;
/** Flache Strecke vor dem Beginn der Welle (u) */
export const LEAD_U = 10;
/** Länge der Ein- und Ausblendung der Welle (u) */
export const RAMP_U = 8;
/** Zeit, die ein Durchgang im Band-Fenster dauert (s) */
export const SEGMENT_S = 11;
export const QUICK_SEGMENT_S = 4;
export const DEMO_SEGMENT_S = 6.5;

/** Laufgeschwindigkeit der Linie in u/s */
export function speedFor(level: number): number {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  return 8 + 1.0 * (lv - 1);
}

/** Wellenhöhe (halbe Spannweite) in u */
export function amplitudeFor(level: number): number {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  return 5 + 0.8 * (lv - 1);
}

/** Wellenlänge der Hauptwelle in u */
export function wavelengthFor(level: number): number {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  return 64 - 1.8 * (lv - 1);
}

/** Frequenz, mit der die Marke auf und ab läuft (Hz) */
export function frequencyFor(level: number): number {
  return speedFor(level) / wavelengthFor(level);
}

/** Größte senkrechte Geschwindigkeit der Zielmarke (u/s), inkl. der kleinen Nebenwelle */
export function peakVerticalSpeedFor(level: number, amp = amplitudeFor(level)): number {
  return amp * 2 * Math.PI * frequencyFor(level) * (0.8 + 0.2 * SECOND_HARMONIC);
}


/** Punkte für einen Durchgang: Stufe × Anteil im Band */
export function pointsFor(level: number, fraction: number): number {
  return Math.round(10 * Math.floor(level + 1e-9) * clamp(fraction, 0, 1));
}

/** Versatz der Marke nach oben über dem Finger (px): ≈ 6 u, aber immer deutlich mehr als der Markenradius */
export function fingerOffsetPx(u: number, markR: number): number {
  return Math.max(6 * u, markR + 26);
}

export function segmentSeconds(mode: { demo: boolean; quick: boolean }): number {
  return mode.demo ? DEMO_SEGMENT_S : mode.quick ? QUICK_SEGMENT_S : SEGMENT_S;
}

function smooth(k: number): number {
  const x = clamp(k, 0, 1);
  return x * x * (3 - 2 * x);
}

/**
 * Die Welle eines Durchgangs: y(s) in u relativ zur Mitte, für die Laufstrecke s (u); außerhalb von 0 … length flach.
 * `maxAmp` begrenzt die Höhe auf den Platz der Bühne.
 */
export class Wave {
  readonly amp: number;
  readonly wavelength: number;
  private readonly p1: number;
  private readonly p2: number;

  constructor(
    rng: Rng,
    readonly level: number,
    /** Länge der Strecke mit Welle in u */
    readonly length: number,
    maxAmp = Infinity,
  ) {
    this.amp = Math.min(amplitudeFor(level), Math.max(0, maxAmp));
    this.wavelength = wavelengthFor(level);
    this.p1 = rng.range(0, Math.PI * 2);
    this.p2 = rng.range(0, Math.PI * 2);
  }

  y(s: number): number {
    if (s <= 0 || s >= this.length) return 0;
    const ramp = Math.min(RAMP_U, this.length / 4);
    const env = smooth(s / ramp) * smooth((this.length - s) / ramp);
    const g = 0.8 * Math.sin((2 * Math.PI * s) / this.wavelength + this.p1) + 0.2 * Math.sin((2 * Math.PI * s * SECOND_HARMONIC) / this.wavelength + this.p2);
    return this.amp * env * g;
  }
}

/** Zeitgewichtete Auswertung: Zeit im Band und mittlere Abweichung */
export class TrackStats {
  time = 0;
  inBand = 0;
  private absSum = 0;

  add(dtSec: number, errU: number): void {
    if (!(dtSec > 0)) return;
    const e = Math.abs(errU);
    this.time += dtSec;
    this.absSum += e * dtSec;
    if (e <= BAND_U) this.inBand += dtSec;
  }

  /** Anteil der Zeit im Band 0..1 (ohne Messzeit: 0) */
  get fraction(): number {
    return this.time > 0 ? this.inBand / this.time : 0;
  }

  /** Mittlere Abweichung in u */
  get meanDeviation(): number {
    return this.time > 0 ? this.absSum / this.time : 0;
  }

  get passed(): boolean {
    return this.fraction >= PASS_FRACTION;
  }

  merge(o: TrackStats): void {
    this.time += o.time;
    this.inBand += o.inBand;
    this.absSum += o.absSum;
  }
}

/** Mittlere Abweichung als Prozent der halben Bandbreite (geräteunabhängig, kleiner ist besser) */
export function deviationPercent(meanDevU: number): number {
  return Math.round((100 * meanDevU) / BAND_U);
}

/** Begrenzte Verlaufsliste der Marke (für die Spur hinter der Marke) */
export class Trail {
  private s: number[] = [];
  private v: number[] = [];

  constructor(private readonly maxLen = 600) {}

  add(s: number, y: number): void {
    this.s.push(s);
    this.v.push(y);
    if (this.s.length > this.maxLen) {
      this.s.shift();
      this.v.shift();
    }
  }

  clear(): void {
    this.s = [];
    this.v = [];
  }

  get length(): number {
    return this.s.length;
  }

  at(i: number): { s: number; y: number } {
    return { s: this.s[i], y: this.v[i] };
  }
}
