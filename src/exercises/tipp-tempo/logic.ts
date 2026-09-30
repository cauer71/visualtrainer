/**
 * Tipp-Tempo – reine Logik (ohne Canvas), damit sie per vitest prüfbar ist.
 *
 * Drei Runden à 20 s schnelles Tippen auf eine große Kugel, dazwischen Pausen. Es zählt immer nur ein
 * Finger gleichzeitig (Mehrfinger-Trommeln zählt nicht), die Leertaste zählt wie ein Tipp. Hauptwert:
 * Tipps pro Runde (Durchschnitt; geteilt durch die Rundendauer = Tipps pro Sekunde).
 */
import { clamp } from '../../core/stats';

export const BLOCKS = 3;
export const BLOCK_MS = 20000;
export const REST_MS = 20000;
/** Countdown „3-2-1“ vor jeder Runde (die erste Zeit der Sitzung bzw. die letzten Sekunden der Pause) */
export const LEAD_MS = 3000;
/** Kurzes Nachspiel nach der letzten Runde, bevor das Ergebnis erscheint */
export const END_MS = 600;
/** Tipps an der Kugel: Trefferradius = Kugelradius × diesen Faktor (großzügig, schrumpft nie) */
export const HIT_FACTOR = 1.3;

export interface Plan {
  blocks: number;
  blockMs: number;
  restMs: number;
  leadMs: number;
}

export const PLAN: Plan = { blocks: BLOCKS, blockMs: BLOCK_MS, restMs: REST_MS, leadMs: LEAD_MS };
/** Test-Modus (?quick=1): extrem kurz */
export const QUICK_PLAN: Plan = { blocks: BLOCKS, blockMs: 3000, restMs: 1800, leadMs: 900 };
/** Intro-Film: zwei kurze Runden */
export const DEMO_PLAN: Plan = { blocks: 2, blockMs: 4000, restMs: 2500, leadMs: 1200 };

export type PhaseName = 'lead' | 'block' | 'rest' | 'end' | 'done';

export interface Timeline {
  phase: PhaseName;
  /** Nummer der Runde (0-basiert); in der Pause = die Runde davor, im Countdown vor Runde 1 = 0 */
  block: number;
  /** Zeit seit Beginn der Phase in ms */
  into: number;
  /** Restzeit der Phase in ms */
  left: number;
  /** 3, 2, 1 während des Countdowns (auch in den letzten Sekunden der Pause), sonst 0 */
  countdown: number;
}

/** Gesamtdauer der Sitzung bis zum Ergebnis in ms */
export function totalMs(p: Plan): number {
  return p.leadMs + p.blocks * p.blockMs + (p.blocks - 1) * p.restMs + END_MS;
}

/** Start der Runde i (ms seit Sitzungsbeginn) */
export function blockStart(p: Plan, i: number): number {
  return p.leadMs + i * (p.blockMs + p.restMs);
}

const count = (left: number, leadMs: number): number => (left > 0 && left <= leadMs ? clamp(Math.ceil(left / (leadMs / 3)), 1, 3) : 0);

/** In welcher Phase ist man `elapsed` ms nach Sitzungsbeginn? */
export function timelineAt(elapsed: number, p: Plan): Timeline {
  const e = Math.max(0, elapsed);
  if (e < p.leadMs) return { phase: 'lead', block: 0, into: e, left: p.leadMs - e, countdown: count(p.leadMs - e, p.leadMs) };
  for (let i = 0; i < p.blocks; i++) {
    const s = blockStart(p, i);
    if (e < s + p.blockMs) return { phase: 'block', block: i, into: e - s, left: s + p.blockMs - e, countdown: 0 };
    if (i < p.blocks - 1) {
      const rs = s + p.blockMs;
      if (e < rs + p.restMs) {
        const left = rs + p.restMs - e;
        return { phase: 'rest', block: i, into: e - rs, left, countdown: count(left, Math.min(p.leadMs, p.restMs)) };
      }
    }
  }
  const es = blockStart(p, p.blocks - 1) + p.blockMs;
  if (e < es + END_MS) return { phase: 'end', block: p.blocks - 1, into: e - es, left: es + END_MS - e, countdown: 0 };
  return { phase: 'done', block: p.blocks - 1, into: e - es - END_MS, left: 0, countdown: 0 };
}

// ---------------------------------------------------------------------------
// Ein Finger zählt

/**
 * „Nur ein Finger zählt“: Ein Tipp zählt nur, wenn gerade kein anderer Finger (Pointer-ID) aufliegt.
 * Wer mit mehreren Fingern gleichzeitig trommelt, bekommt nur den ersten Finger gewertet; wer einen
 * Finger hebt und einen anderen aufsetzt, tippt weiter normal. Aufliegende Finger, deren „hoch“ nie
 * ankam (z. B. während einer Pause), sperren höchstens `staleMs`.
 */
export class TapGate {
  private down = new Map<number, number>();

  constructor(private readonly staleMs = 600) {}

  /** Finger aufgesetzt: true, wenn der Tipp zählt */
  press(id: number, t: number): boolean {
    for (const [k, t0] of this.down) if (t - t0 > this.staleMs) this.down.delete(k);
    let others = 0;
    for (const k of this.down.keys()) if (k !== id) others++;
    this.down.set(id, t);
    return others === 0;
  }

  release(id: number): void {
    this.down.delete(id);
  }

  reset(): void {
    this.down.clear();
  }
}

// ---------------------------------------------------------------------------
// Raten

/** Tipps pro Sekunde einer Runde */
export function rateHz(taps: number, blockMs: number): number {
  return blockMs > 0 ? taps / (blockMs / 1000) : 0;
}

/**
 * Laufende Rate (Tipps pro Sekunde) aus den Zeitstempeln der letzten `windowMs`; in den ersten
 * Sekunden durch die bisher vergangene Zeit (mindestens 0,5 s) geteilt.
 */
export function liveRate(times: readonly number[], now: number, elapsed: number, windowMs = 2000): number {
  let n = 0;
  for (let i = times.length - 1; i >= 0; i--) {
    if (now - times[i] > windowMs) break;
    n++;
  }
  const span = clamp(elapsed, 500, windowMs);
  return n / (span / 1000);
}

export interface Stats {
  /** Tipps je Runde */
  counts: number[];
  /** Durchschnitt der Tipps pro Runde */
  mean: number;
  best: number;
  /** Tipps pro Sekunde: Durchschnitt und beste Runde */
  meanHz: number;
  bestHz: number;
  /** Abfall von der ersten zur letzten Runde in % (negativ = letzte Runde war besser; 0 bei nur einer Runde oder erster Runde 0) */
  dropPct: number;
}

export function computeStats(counts: readonly number[], blockMs: number): Stats {
  const n = counts.length;
  const sum = counts.reduce((a, b) => a + b, 0);
  const mean = n ? sum / n : 0;
  const best = n ? Math.max(...counts) : 0;
  const first = n ? counts[0] : 0;
  const last = n ? counts[n - 1] : 0;
  return {
    counts: [...counts],
    mean,
    best,
    meanHz: rateHz(mean, blockMs),
    bestHz: rateHz(best, blockMs),
    dropPct: n >= 2 && first > 0 ? (100 * (first - last)) / first : 0,
  };
}

/** Schlüssel in texts.tips: none | onefinger | fatigue | warm | even */
export function tipFor(s: Stats, ignoredTaps: number): string {
  if (s.mean <= 0) return 'none';
  if (ignoredTaps >= 6) return 'onefinger';
  if (s.dropPct >= 20) return 'fatigue';
  if (s.dropPct <= -8) return 'warm';
  return 'even';
}
