/**
 * Richtungschaos – reine Logik (Stufenfunktionen, glatte Zufalls-Drehrate), ohne Canvas und DOM.
 *
 * Das Ziel läuft mit gleichmäßigem Tempo und ändert seine Richtung in unregelmäßigen, aber stets
 * GLATTEN Bögen: Die Drehrate ω (rad/s) strebt zu Zufalls-Zielwerten, die zu zufälligen Zeitpunkten
 * neu gewürfelt werden, und wird dabei zweifach weich gefiltert. Weder die Richtung noch die
 * Drehrate springt je – es gibt keinen Haken und keinen Abprall (am Rand dreht das Ziel weich bei,
 * das macht `MotionPath`). Stufe ist immer „höher = schwerer“ (siehe core/staircase.ts).
 *
 * Stufen (1–20), Regler „Unregelmäßigkeit“:
 * - Stärke der Drehrate (Effektivwert) 0,30 → 1,78 rad/s: Richtungsänderung je Viertelsekunde
 *   ≈ 4° → ≈ 25°
 * - Zielwerte wechseln schneller: mittlere Haltezeit 1,1 → 0,6 s
 * - Tempo 13 → ≈ 33 u/s (1 u = 1 % der kürzeren Seite; Tablet ≈ 3 → 8°/s bei 40 cm)
 * - Zeichen: kleiner und kürzer sichtbar
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';
import { SIGN_MAX_LEVEL, SIGN_MIN_LEVEL } from '../_shared/zeichenaufgabe';

export const MIN_LEVEL = SIGN_MIN_LEVEL;
export const MAX_LEVEL = SIGN_MAX_LEVEL;

export const levelOf = (level: number): number => clamp(level, MIN_LEVEL, MAX_LEVEL);

/** Obergrenze der Drehrate in rad/s (≈ 150°/s): engste Kurve bei 33 u/s ≈ 13 u Radius – nie ein Knick */
export const MAX_OMEGA = 2.6;
/** Zeitkonstante der beiden Glättungsstufen in s */
export const SMOOTH_TAU_S = 0.22;

/** Tempo in u/s */
export function speedFor(level: number): number {
  return 13 * Math.pow(1.05, levelOf(level) - 1);
}

/** Effektivwert der Zufalls-Drehrate in rad/s – die „Unregelmäßigkeit“ */
export function sigmaFor(level: number): number {
  return 0.3 + 0.078 * (levelOf(level) - 1);
}

/** Mittlere Zeit, die ein Zufalls-Zielwert der Drehrate gilt, in ms */
export function holdMsFor(level: number): number {
  return Math.round(1100 - 26 * (levelOf(level) - 1));
}

/** Zeit bis zum nächsten Zeichen in ms (unregelmäßig) */
export function drawGapMs(rng: Rng): number {
  return Math.round(rng.range(1300, 2300));
}

/** Anzeigedauer des Zeichens in ms */
export function exposureFor(level: number): number {
  return Math.max(320, Math.round(640 - 14 * (levelOf(level) - 1)));
}

/**
 * Glatte Zufalls-Drehrate. `step(dtMs, level, rng)` liefert die Drehrate ω in rad/s.
 *
 * Alle Zeitabläufe laufen in ms der virtuellen Zeit (bildratenunabhängig): Die Zielwerte werden nach
 * der Uhr gewürfelt, die Glättung ist die exakte Lösung der Exponentialannäherung für das gegebene dt.
 */
export class HeadingDrift {
  omega = 0;
  private mid = 0;
  private target = 0;
  private clock = 0;
  private until = 0;

  /** Neu beginnen (z. B. nach Start): Drehrate 0, Zielwert wird beim ersten Schritt gewürfelt */
  reset(): void {
    this.omega = 0;
    this.mid = 0;
    this.target = 0;
    this.clock = 0;
    this.until = 0;
  }

  step(dtMs: number, level: number, rng: Rng): number {
    this.clock += dtMs;
    if (this.clock >= this.until) {
      this.target = clamp(sigmaFor(level) * rng.normal(), -MAX_OMEGA, MAX_OMEGA);
      this.until = this.clock + holdMsFor(level) * rng.range(0.6, 1.4);
    }
    const a = 1 - Math.exp(-dtMs / 1000 / SMOOTH_TAU_S);
    this.mid += (this.target - this.mid) * a;
    this.omega += (this.mid - this.omega) * a;
    this.omega = clamp(this.omega, -MAX_OMEGA, MAX_OMEGA);
    return this.omega;
  }
}
