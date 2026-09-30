/**
 * Leuchtfolge – reine Logik (ohne Canvas): Folgen erzeugen, Takt, weiche Helligkeitskurve, Treppe.
 */
import type { Rng } from '../../core/rng';
import { Staircase } from '../../core/staircase';
import { clamp, easeInOut } from '../../core/stats';

/** Anzahl Felder (3 × 2 bzw. 2 × 3) */
export const FIELDS = 6;
export const MIN_LEN = 2;
export const MAX_LEN = 12;
/** Startlänge beim ersten Mal */
export const DEFAULT_START = 3;
/** Runden je Sitzung (6–8) */
export const ROUNDS = 7;
export const QUICK_ROUNDS = 3;

/**
 * Zufällige Folge ohne direkte Wiederholung eines Feldes und ohne „Treppen“
 * (drei Felder mit gleichem Abstand hintereinander, z. B. 0-1-2). Dadurch gibt es keine
 * unbemerkten Doppel-Leuchtphasen und keine leicht zu erratenden Muster.
 */
export function makeSequence(rng: Rng, len: number, fields = FIELDS): number[] {
  const seq: number[] = [];
  for (let i = 0; i < len; i++) {
    const prev = seq[i - 1];
    const prev2 = seq[i - 2];
    const cand: number[] = [];
    for (let f = 0; f < fields; f++) {
      if (f === prev) continue;
      if (prev !== undefined && prev2 !== undefined && f - prev === prev - prev2) continue;
      cand.push(f);
    }
    seq.push(rng.pick(cand));
  }
  return seq;
}

/** Takt eines Elements in ms (Anzeigedauer + Pause) – höchstens 1,43 Leuchtphasen pro Sekunde */
export function periodMs(len: number): number {
  return clamp(900 - 25 * (len - MIN_LEN), 700, 900);
}

export interface FlashTiming {
  rise: number;
  hold: number;
  fall: number;
}

/** Leuchtphase eines Feldes in der Folge: weich ein, halten, weich aus; danach mindestens 280 ms dunkel */
export function showTiming(len: number): FlashTiming {
  const p = periodMs(len);
  return { rise: 150, hold: p - 150 - 150 - 300, fall: 150 };
}

/** Kurzes Aufleuchten beim eigenen Tippen */
export const TAP_TIMING: FlashTiming = { rise: 70, hold: 90, fall: 220 };

/** Helligkeit 0..1 zum Zeitpunkt tRel (ms seit Beginn der Leuchtphase) – sanfte Übergänge, kein Blitzen */
export function brightness(tRel: number, tm: FlashTiming): number {
  if (tRel <= 0) return 0;
  const up = easeInOut(tRel / tm.rise);
  const down = easeInOut((tRel - tm.rise - tm.hold) / tm.fall);
  return clamp(up * (1 - down), 0, 1);
}

/** Gesamtdauer der Anzeige einer Folge in ms */
export function showDurationMs(len: number): number {
  return len * periodMs(len);
}

export function createStaircase(start: number | null): Staircase {
  const s = Math.round(start ?? DEFAULT_START);
  return new Staircase({
    start: clamp(Number.isFinite(s) ? s : DEFAULT_START, MIN_LEN, MAX_LEN),
    min: MIN_LEN,
    max: MAX_LEN,
    down: 1,
    up: 1,
    stepHarder: 1,
    stepEasier: 1,
    initialBoost: 1,
  });
}
