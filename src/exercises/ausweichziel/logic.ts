/**
 * Ausweichziel – reine Logik (Stufenfunktionen, Ausweich-Plan), ohne Canvas und DOM.
 *
 * Das Ziel läuft gleichmäßig geradeaus und weicht zwischendurch in einem weichen Bogen aus. Kurz
 * nach dem Ausweichen erscheint in der Kugel ein Landolt-Ring – erkennbar nur, wenn der Blick das
 * Ziel wieder erfasst hat. Stufe ist immer „höher = schwerer“ (siehe core/staircase.ts).
 *
 * Stufen (1–20):
 * - Tempo: gleichmäßig, 16 → ≈ 90 u/s (1 u = 1 % der kürzeren Seite; Tablet ≈ 4 → 20°/s bei 40 cm)
 * - Schärfe: Ausweichwinkel 40° → 160°, Bogendauer 700 → 280 ms
 * - Häufigkeit: mittlerer Abstand zwischen Ausweichbewegungen 2,3 → 1,45 s (unregelmäßig)
 * - Zeichen: kleiner, kürzer sichtbar, erscheint früher nach dem Ausweichen
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';
import { deg } from '../_shared/freibahn';
import { SIGN_MAX_LEVEL, SIGN_MIN_LEVEL } from '../_shared/zeichenaufgabe';

export const MIN_LEVEL = SIGN_MIN_LEVEL;
export const MAX_LEVEL = SIGN_MAX_LEVEL;

export const levelOf = (level: number): number => clamp(level, MIN_LEVEL, MAX_LEVEL);

/** Tempo in u/s */
export function speedFor(level: number): number {
  return 16 * Math.pow(1.095, levelOf(level) - 1);
}

/** Mittlerer Ausweichwinkel in Grad */
export function turnAngleFor(level: number): number {
  return 40 + 6.3 * (levelOf(level) - 1);
}

/** Dauer des Ausweichbogens in ms – kürzer = schärfer */
export function arcMsFor(level: number): number {
  return Math.round(700 - 22 * (levelOf(level) - 1));
}

/** Mittlerer Abstand zwischen zwei Ausweichbewegungen in ms */
export function gapMeanFor(level: number): number {
  return Math.round(2300 - 45 * (levelOf(level) - 1));
}

/** Zeit vom Ende des Bogens bis zum Zeichen in ms (catalog: 150–400 ms) */
export function signDelayFor(level: number): number {
  return Math.round(350 - 10.5 * (levelOf(level) - 1));
}

/** Anzeigedauer des Zeichens in ms */
export function exposureFor(level: number): number {
  return Math.max(300, Math.round(640 - 13 * (levelOf(level) - 1)));
}

/** Tatsächlicher Ausweichwinkel (Radiant, positiv): Stufenwinkel ±20 %, höchstens 175° */
export function drawTurnAngle(level: number, rng: Rng): number {
  return deg(clamp(turnAngleFor(level) * rng.range(0.8, 1.2), 20, 175));
}

/** Abstand bis zur nächsten Ausweichbewegung in ms: unregelmäßig um den Stufenwert (75–130 %) */
export function drawGapMs(level: number, rng: Rng): number {
  return Math.round(gapMeanFor(level) * rng.range(0.75, 1.3));
}

/** Ausweichbewegung ohne Zeichen (Ablenkung): ab Stufe 3 gelegentlich, nie zwei in Folge */
export function isDecoy(level: number, rng: Rng, lastWasDecoy: boolean): boolean {
  if (lastWasDecoy || levelOf(level) < 3) return false;
  return rng.chance(0.25);
}

/** Abstand nach einer Ausweichbewegung ohne Zeichen bis zur nächsten in ms */
export function decoyGapMs(rng: Rng): number {
  return Math.round(rng.range(700, 1300));
}
