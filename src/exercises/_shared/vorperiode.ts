/**
 * Wartezeit (Vorperiode) und Frühstart-Erkennung für Reaktionsübungen – reine Logik.
 *
 * - `foreperiodMs`: „nicht alternde“ Wartezeit. Feste Mindestzeit plus exponentiell verteilter Anteil
 *   (konstante Überraschungswahrscheinlichkeit: Es lässt sich nicht erraten, „jetzt müsste es kommen“).
 *   Begrenzt wird durch erneutes Ziehen, nicht durch Abschneiden, damit die Verteilung bis zur Grenze
 *   exponentiell bleibt (Niemi & Näätänen, 1981).
 * - `classifyTap`: Tipp in der Wartezeit oder weniger als 100 ms nach Reizbeginn = Frühstart (Antizipation);
 *   eine Reaktion auf einen Reiz braucht länger.
 * - `spreadMs`: Streuung als Interquartilsabstand (robust gegen einzelne Ausreißer).
 */
import { median, quantile } from '../../core/stats';
import type { Rng } from '../../core/rng';

/** Schneller als das ist keine Antwort auf den Reiz, sondern geraten */
export const ANTICIPATION_MS = 100;

export interface ForeperiodOptions {
  /** feste Mindestwartezeit in ms */
  minMs: number;
  /** Mittelwert des exponentiellen Anteils in ms */
  meanMs: number;
  /** Obergrenze des exponentiellen Anteils in ms (Ziehen wird wiederholt) */
  capMs: number;
}

export function foreperiodMs(rng: Pick<Rng, 'exp'>, o: ForeperiodOptions): number {
  for (let i = 0; i < 50; i++) {
    const add = rng.exp(o.meanMs);
    if (add <= o.capMs) return o.minMs + add;
  }
  return o.minMs + o.capMs * 0.5;
}

export type TapKind = 'early' | 'valid';

/**
 * Wertung eines Tipps. `sinceOnset` = ms seit Reizbeginn, `null` = der Reiz ist noch nicht da.
 */
export function classifyTap(sinceOnset: number | null): TapKind {
  if (sinceOnset === null || sinceOnset < ANTICIPATION_MS) return 'early';
  return 'valid';
}

/** Interquartilsabstand in ms (NaN bei weniger als 4 Werten) */
export function spreadMs(xs: readonly number[]): number {
  if (xs.length < 4) return NaN;
  return quantile(xs, 0.75) - quantile(xs, 0.25);
}

export interface ReactionStats {
  medianMs: number;
  spreadMs: number;
  valid: number;
  early: number;
  missed: number;
}

export function reactionStats(rts: readonly number[], early: number, missed: number): ReactionStats {
  return { medianMs: median(rts), spreadMs: spreadMs(rts), valid: rts.length, early, missed };
}
