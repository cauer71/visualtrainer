/**
 * Nachzieh-Spur – reine Logik (Stufenfunktionen, Spur-Puffer, Verblassen), ohne Canvas und DOM.
 *
 * Das Ziel läuft mit gleichmäßigem Tempo und zieht eine weiche Spur hinter sich her, wie ein
 * Kometenschweif. Die Spur ist nur Ablenkung: Sie verblasst gleichmäßig (linear in der Zeit seit dem
 * Durchgang des Ziels) und liegt immer HINTER dem Ziel. Das Zeichen erscheint im Zielkopf, nie in der
 * Spur. Stufe ist immer „höher = schwerer“ (siehe core/staircase.ts).
 *
 * Stufen (1–20):
 * - Spur: Länge 0,5 → 1,2 s Nachlaufzeit, Helligkeit am Kopf 16 % → 60 %
 * - Tempo: 14 → ≈ 66 u/s (1 u = 1 % der kürzeren Seite; Tablet ≈ 3 → 15°/s bei 40 cm)
 * - sanfte Bögen (Spur krümmt sich) häufiger
 * - Zeichen: kleiner und kürzer sichtbar
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';
import { SIGN_MAX_LEVEL, SIGN_MIN_LEVEL } from '../_shared/zeichenaufgabe';

export const MIN_LEVEL = SIGN_MIN_LEVEL;
export const MAX_LEVEL = SIGN_MAX_LEVEL;

export const levelOf = (level: number): number => clamp(level, MIN_LEVEL, MAX_LEVEL);

/** Tempo in u/s */
export function speedFor(level: number): number {
  return 14 * Math.pow(1.085, levelOf(level) - 1);
}

/** Länge der Spur als Nachlaufzeit in ms: So lange wirkt ein Punkt der Bahn noch nach */
export function trailMsFor(level: number): number {
  return Math.round(500 + 37 * (levelOf(level) - 1));
}

/** Größte Nachlaufzeit aller Stufen – so lange muss der Puffer Punkte behalten */
export const TRAIL_MS_MAX = trailMsFor(MAX_LEVEL);

/** Helligkeit (Deckkraft 0..1) der Spur unmittelbar hinter dem Kopf */
export function trailAlphaFor(level: number): number {
  return Math.round((0.16 + 0.023 * (levelOf(level) - 1)) * 1000) / 1000;
}

/** Anzeigedauer des Zeichens in ms */
export function exposureFor(level: number): number {
  return Math.max(320, Math.round(640 - 14 * (levelOf(level) - 1)));
}

/** Wahrscheinlichkeit, dass vor einem Zeichen ein sanfter Bogen gelaufen wird */
export function curveChanceFor(level: number): number {
  return clamp(0.25 + 0.02 * (levelOf(level) - 1), 0, 0.7);
}

/** Zeit bis zum nächsten Zeichen in ms (unregelmäßig) */
export function drawRunMs(rng: Rng): number {
  return Math.round(rng.range(1300, 2200));
}

/** Drehwinkel eines sanften Bogens in Grad (Betrag) */
export function drawCurveDeg(rng: Rng): number {
  return Math.round(rng.range(25, 70));
}

/** Dauer eines sanften Bogens in ms */
export const CURVE_MS = 1100;

/**
 * Deckkraft der Spur an einer Stelle mit dem Altersanteil `frac` (0 = am Kopf, 1 = Ende der Spur):
 * linear fallend, am Ende genau 0 – gleichmäßig verblassend, ohne harten Rand.
 */
export function trailFade(frac: number, peak: number): number {
  if (frac >= 1) return 0;
  return peak * (1 - Math.max(0, frac));
}

/** Breite der Spur (Anteil der Kugelbreite) an der Stelle `frac`: vom Kopf her schlanker werdend */
export function trailWidth(frac: number): number {
  return 0.9 - 0.65 * clamp(frac, 0, 1);
}

export interface TrailSample {
  x: number;
  y: number;
  t: number;
}

/**
 * Puffer der letzten Positionen mit Zeitstempel (virtuelle ms). Proben höchstens alle `minGapMs`,
 * damit die Spur auf 60- und 120-Hz-Geräten gleich aussieht (der Kopf wird beim Zeichnen angehängt).
 */
export class TrailBuffer {
  private readonly items: TrailSample[] = [];

  constructor(
    private readonly maxAgeMs: number,
    private readonly minGapMs = 14,
  ) {}

  get length(): number {
    return this.items.length;
  }

  clear(): void {
    this.items.length = 0;
  }

  push(x: number, y: number, t: number): void {
    const last = this.items[this.items.length - 1];
    if (last && t - last.t < this.minGapMs) return;
    this.items.push({ x, y, t });
    while (this.items.length > 2 && t - this.items[0].t > this.maxAgeMs) this.items.shift();
  }

  /** Proben in zeitlicher Reihenfolge (älteste zuerst) */
  get samples(): readonly TrailSample[] {
    return this.items;
  }
}
