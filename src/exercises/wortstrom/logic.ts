/**
 * Wortstrom – reine Logik (ohne Canvas), damit sie per vitest prüfbar ist.
 *
 * Ehrliche Fassung eines „RSVP“-Schnelllese-Trainings: Wörter erscheinen einzeln in der Mitte,
 * weich ein- und ausgeblendet, mit realistischer Anzeigedauer (700 → 350 ms). Ein vorher genanntes
 * Zielwort wird bei Erscheinen angetippt; das Antwortfenster ist nie kürzer als 600 ms. Hart begrenzt
 * auf höchstens 2,5 Wörter pro Sekunde. Gemessen wird das Erkennen eines bekannten Wortes, NICHT das
 * Leseverständnis oder die Lesegeschwindigkeit.
 */
import type { Lang } from '../../i18n/lang';
import type { Rng } from '../../core/rng';
import { clamp, median } from '../../core/stats';
import { wordsFor } from '../wortliste/logic';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 12;

/** Anzeigedauer eines Wortes inkl. Ein-/Ausblenden: Start 700 ms, niedrigstens 350 ms */
export const SHOW_START_MS = 700;
export const SHOW_MIN_MS = 350;
/** Leere Pause zwischen zwei Wörtern (ms) */
export const GAP_MS = 60;
/** Harte Obergrenze der Wortfolge */
export const MAX_WORDS_PER_S = 2.5;
/** Antwortfenster nach Erscheinen des Zielworts: nie kürzer als die Reaktionszeit */
export const MIN_WINDOW_MS = 600;
/** Antworten schneller als das nach Beginn des Zielworts gelten der Vorgänger-Anzeige, nicht dem Zielwort */
export const MIN_HIT_RT_MS = 150;
/** Kürzeste erlaubte Wortfolge-Abstände (Onset zu Onset) in ms */
export const MIN_SOA_MS = 1000 / MAX_WORDS_PER_S;
/** Doppeltipps (< 350 ms nach einem Tipp) werden ignoriert */
export const DOUBLE_TAP_MS = 350;

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

/** Anzeigedauer eines Wortes in ms: 700 auf Stufe 1, 350 auf Stufe 12 (nie darunter) */
export function showMsFor(level: number): number {
  const l = levelOf(level);
  return clamp(Math.round(SHOW_START_MS - ((SHOW_START_MS - SHOW_MIN_MS) / (MAX_LEVEL - MIN_LEVEL)) * (l - MIN_LEVEL)), SHOW_MIN_MS, SHOW_START_MS);
}

/** Abstand zwischen zwei Wortanfängen in ms – nie unter 400 ms (= 2,5 Wörter pro Sekunde) */
export function soaMs(level: number): number {
  return Math.max(showMsFor(level) + GAP_MS, MIN_SOA_MS);
}

/** Wörter pro Sekunde (Anzeigetakt) – für Tests; nie über 2,5 */
export const wordsPerSecond = (level: number): number => 1000 / soaMs(level);

/** Antwortfenster in ms: 1,4 s auf Stufe 1, 0,7 s auf Stufe 12, nie unter 600 ms */
export function windowMs(level: number): number {
  const l = levelOf(level);
  return Math.max(MIN_WINDOW_MS, Math.round(1400 - (700 * (l - MIN_LEVEL)) / (MAX_LEVEL - MIN_LEVEL)));
}

/** Länge des Wortstroms: 8 Wörter (Stufe 1–4), 9 (5–8), 10 (9–12) */
export function streamLengthFor(level: number): number {
  return 8 + Math.floor((levelOf(level) - 1) / 4);
}

/** Dauer des Ein- bzw. Ausblendens je Seite in ms (≥ 100 ms, bei 350 ms bleibt ein Plateau von ≥ 140 ms) */
export function fadeMsFor(showMs: number): number {
  return clamp(Math.round(showMs * 0.28), 100, 160);
}

/** Deckkraft eines Wortes: tau = ms seit Wortanfang; sinusförmiges Ein- und Ausblenden, sonst 1 */
export function wordAlpha(tau: number, showMs: number): number {
  if (tau <= 0 || tau >= showMs) return 0;
  const f = fadeMsFor(showMs);
  const ease = (x: number) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(x, 0, 1));
  if (tau < f) return ease(tau / f);
  if (tau > showMs - f) return ease((showMs - tau) / f);
  return 1;
}

/** Nummer des Wortes, dessen Zeitfenster zur Zeit `el` (ms seit Stromstart) läuft, und ms seit dessen Anfang */
export function slotAt(el: number, soa: number, n: number): { index: number; tau: number } {
  if (el < 0 || soa <= 0) return { index: -1, tau: 0 };
  const index = Math.floor(el / soa);
  if (index >= n) return { index: -1, tau: 0 };
  return { index, tau: el - index * soa };
}

/** Wortliste der Sprache für den Strom: die kurzen (≤ 8 Buchstaben) der Wortliste, sonst die ganze */
export function streamWords(lang: Lang): readonly string[] {
  const all = wordsFor(lang);
  const short = all.filter((w) => w.length <= 8);
  return short.length >= 120 ? short : all;
}

export interface Trial {
  target: string;
  words: string[];
  /** Platz des Zielworts im Strom (0-basiert) */
  targetIndex: number;
}

/**
 * Ein Wortstrom: genau ein Zielwort (mit mindestens 2 Wörtern davor und danach), sonst lauter
 * verschiedene andere Wörter. Ab Stufe 7 sind mindestens 40 % der anderen Wörter gleich lang wie das
 * Zielwort (die Wortform verrät es dann weniger).
 */
export function buildTrial(rng: Pick<Rng, 'int' | 'shuffle' | 'chance'>, words: readonly string[], level: number, used: ReadonlySet<string> = new Set()): Trial {
  const n = streamLengthFor(level);
  const fresh = words.filter((w) => !used.has(w));
  const pool = fresh.length >= 10 ? fresh : words;
  const target = pool[rng.int(pool.length)];
  const others = words.filter((w) => w !== target);
  const targetIndex = 2 + rng.int(n - 4);
  const need = n - 1;
  const chosen: string[] = [];
  if (levelOf(level) >= 7) {
    const same = rng.shuffle(others.filter((w) => w.length === target.length));
    const take = Math.min(same.length, Math.ceil(need * 0.4));
    chosen.push(...same.slice(0, take));
  }
  const rest = rng.shuffle(others.filter((w) => !chosen.includes(w)));
  chosen.push(...rest.slice(0, need - chosen.length));
  rng.shuffle(chosen);
  const out: string[] = [];
  let k = 0;
  for (let i = 0; i < n; i++) out.push(i === targetIndex ? target : chosen[k++]);
  return { target, words: out, targetIndex };
}

/** Zählt ein Tipp zur Zielwort-Antwort? (Fenster ab Wortanfang, erst nach der Mindest-Reaktionszeit) */
export function isHit(tapT: number, onset: number, window: number): boolean {
  const rt = tapT - onset;
  return rt >= MIN_HIT_RT_MS && rt <= window;
}

/** Punkte je gefundenem Zielwort: Grundwert steigt mit der Stufe, kleiner Bonus für schnelle Antwort */
export function pointsFor(level: number, rtMs: number, window: number): number {
  const frac = window > 0 ? clamp(1 - rtMs / window, 0, 1) : 0;
  return 15 + 3 * (levelOf(level) - 1) + Math.round(frac * 10);
}

export interface Stats {
  trials: number;
  hits: number;
  falseAlarms: number;
  /** Median der Zeit vom Zielwortbeginn bis zum Tipp in ms (NaN ohne Treffer) */
  medianMs: number;
}

export function computeStats(trials: number, hits: number, falseAlarms: number, rts: readonly number[]): Stats {
  return { trials, hits, falseAlarms, medianMs: rts.length ? median(rts) : NaN };
}

/** Schlüssel in texts.tips: alarm | missed | great */
export function tipFor(s: Stats): string {
  if (s.falseAlarms >= 3 && s.falseAlarms >= s.trials - s.hits) return 'alarm';
  if (s.trials - s.hits >= 3) return 'missed';
  return 'great';
}
