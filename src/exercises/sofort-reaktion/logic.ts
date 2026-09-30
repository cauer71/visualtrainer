/**
 * Sofort-Reaktion – reine Logik (ohne Canvas), prüfbar mit vitest.
 *
 * Ein reines Reaktionszeit-Protokoll: Die Mitte leuchtet warmweiß weich auf, du tippst so schnell du kannst.
 * - Vorperiode (Wartezeit) gleitend verteilt und nicht alternd: 900 ms + exponentieller Anteil (Mittel 1,1 s,
 *   höchstens 3,5 s) – eine feste Mindestzeit, danach konstante Überraschung (Niemi & Näätänen, 1981).
 * - Antizipations-Erkennung: Tipp in der Wartezeit oder < 100 ms nach Beginn = Frühstart (zählt nicht, neue Wartezeit);
 *   Antworten von 100–149 ms werden gewertet, aber als „auffallend schnell“ gezählt (Hinweis auf Raten).
 * - Auswertung: Median (robust), Streuung als Interquartilsabstand, Frühstarts, gültige Durchgänge.
 */
import { clamp } from '../../core/stats';
import type { Rng } from '../../core/rng';
import { ANTICIPATION_MS, type ReactionStats, foreperiodMs, reactionStats } from '../_shared/vorperiode';

export { ANTICIPATION_MS };

/** Durchgänge: 2 zum Aufwärmen (zählen nicht), 16 gewertet */
export const WARMUP_TRIALS = 2;
export const COUNTED_TRIALS = 16;
export const QUICK_TRIALS = 3;

/** So lange bleibt das Licht an (Antwortfrist); danach gilt der Durchgang als verpasst */
export const LAPSE_MS = 1500;
/** Weiches Aufleuchten: Dauer der Einblendung in ms (≥ 100 ms, keine harte Kante) */
export const ONSET_RAMP_MS = 100;
/** Antworten unter dieser Zeit sind zwar möglich, aber auffallend schnell (Raten?) */
export const FAST_MS = 150;
/** Zusätzliche Pause nach einem Frühstart, bevor die neue Wartezeit beginnt */
export const EARLY_EXTRA_MS = 600;

/** Wartezeit (ms) bis zum Aufleuchten */
export function waitMs(rng: Pick<Rng, 'exp'>): number {
  return foreperiodMs(rng, { minMs: 900, meanMs: 1100, capMs: 3500 });
}

/** Helligkeit 0..1 zum Zeitpunkt `age` ms nach Beginn: schnell ansteigend, aber weich (ease-out, 100 ms) */
export function glowAlpha(age: number): number {
  if (age <= 0) return 0;
  const k = clamp(age / ONSET_RAMP_MS, 0, 1);
  return 1 - (1 - k) ** 3;
}

export type Verdict = 'early' | 'fast' | 'ok';

/** Wertung einer Antwort; `sinceOnset` = ms seit Beginn des Leuchtens, null = noch kein Licht */
export function judge(sinceOnset: number | null): Verdict {
  if (sinceOnset === null || sinceOnset < ANTICIPATION_MS) return 'early';
  if (sinceOnset < FAST_MS) return 'fast';
  return 'ok';
}

export interface Stats extends ReactionStats {
  /** Antworten zwischen 100 und 149 ms */
  fast: number;
}

export function computeStats(rts: readonly number[], early: number, missed: number): Stats {
  return { ...reactionStats(rts, early, missed), fast: rts.filter((r) => judge(r) === 'fast').length };
}

/** Punkte je gültiger Antwort (nur Motivation): 10 + bis zu 15 für schnelle Zeiten */
export function pointsFor(rt: number): number {
  return 10 + Math.round(clamp((650 - rt) / 400, 0, 1) * 15);
}

/** Schlüssel in texts.tips: early | guess | focus | steady | relaxed */
export function tipFor(s: Stats): string {
  if (s.early >= 2) return 'early';
  if (s.fast >= 3) return 'guess';
  if (s.missed >= 2) return 'focus';
  if (Number.isFinite(s.spreadMs) && Number.isFinite(s.medianMs) && s.spreadMs / s.medianMs > 0.3) return 'steady';
  return 'relaxed';
}

/** Für die nächste Sitzung gespeicherter Wert (Median, gerundet, in sinnvollen Grenzen) */
export function savedLevel(medianMs: number): number {
  return Number.isFinite(medianMs) ? clamp(Math.round(medianMs), 100, LAPSE_MS) : LAPSE_MS;
}
