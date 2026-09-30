/**
 * Zahlenspanne – reine Logik (ohne Canvas): Ziffernfolgen, Prüfung, Takt, Treppen.
 */
import type { Rng } from '../../core/rng';
import { Staircase } from '../../core/staircase';
import { clamp, easeInOut } from '../../core/stats';

export const MIN_LEN = 3;
export const MAX_LEN = 12;
export const DEFAULT_START = 3;
/** Runden vorwärts je Sitzung */
export const FORWARD_ROUNDS = 7;
export const QUICK_FORWARD_ROUNDS = 2;
/** Runden rückwärts (nur ab höherer Stufe) */
export const BACKWARD_ROUNDS = 2;
export const QUICK_BACKWARD_ROUNDS = 1;
/** Ab dieser längsten richtigen Vorwärts-Folge kommen am Ende rückwärts-Runden dazu */
export const BACKWARD_FROM = 6;
export const QUICK_BACKWARD_FROM = 3;

/**
 * Zufällige Ziffernfolge 0–9: nie dieselbe Ziffer zweimal direkt hintereinander und keine
 * Zahlenmuster aus drei Ziffern mit gleichem Abstand (123, 135, 864, 555 …).
 */
export function makeDigits(rng: Rng, len: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < len; i++) {
    const prev = out[i - 1];
    const prev2 = out[i - 2];
    const cand: number[] = [];
    for (let d = 0; d <= 9; d++) {
      if (d === prev) continue;
      if (prev !== undefined && prev2 !== undefined && d - prev === prev - prev2) continue;
      cand.push(d);
    }
    out.push(rng.pick(cand));
  }
  return out;
}

/** Erwartete Eingabe: vorwärts wie gezeigt, rückwärts umgekehrt */
export function expected(digits: readonly number[], backward: boolean): number[] {
  return backward ? [...digits].reverse() : [...digits];
}

export function isCorrect(input: readonly number[], digits: readonly number[], backward: boolean): boolean {
  const exp = expected(digits, backward);
  return input.length === exp.length && exp.every((d, i) => d === input[i]);
}

/** Takt: ca. 1 Ziffer pro Sekunde – einblenden, stehen lassen, ausblenden, kurze Lücke */
export const DIGIT_MS = 1000;
export const DIGIT_TIMING = { rise: 140, hold: 560, fall: 140 } as const;

/** Sichtbarkeit 0..1 einer Ziffer, tRel = ms seit Beginn ihres Takts (weiches Ein-/Ausblenden) */
export function digitAlpha(tRel: number): number {
  if (tRel <= 0) return 0;
  const { rise, hold, fall } = DIGIT_TIMING;
  const up = easeInOut(tRel / rise);
  const down = easeInOut((tRel - rise - hold) / fall);
  return clamp(up * (1 - down), 0, 1);
}

export function showDurationMs(len: number): number {
  return len * DIGIT_MS;
}

export function createForwardStaircase(start: number | null): Staircase {
  const s = Math.round(start ?? DEFAULT_START);
  return new Staircase({
    start: clamp(Number.isFinite(s) ? s : DEFAULT_START, MIN_LEN, MAX_LEN),
    min: MIN_LEN,
    max: MAX_LEN,
    down: 1,
    up: 1,
    initialBoost: 1,
  });
}

/** Rückwärts-Runden beginnen etwas kürzer als die beste Vorwärts-Folge */
export function backwardStart(bestForward: number): number {
  return clamp(bestForward - 3, MIN_LEN, MAX_LEN - 3);
}

export function createBackwardStaircase(bestForward: number): Staircase {
  return new Staircase({
    start: backwardStart(bestForward),
    min: MIN_LEN,
    max: MAX_LEN - 2,
    down: 1,
    up: 1,
    initialBoost: 1,
  });
}

export function playsBackward(bestForward: number, quick: boolean): boolean {
  return bestForward >= (quick ? QUICK_BACKWARD_FROM : BACKWARD_FROM);
}
