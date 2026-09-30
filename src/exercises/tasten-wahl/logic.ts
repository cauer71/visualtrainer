/**
 * Tasten-Wahl – reine Logik (ohne Canvas), damit sie per vitest prüfbar ist.
 *
 * Oben erscheint ein Zeichen (Form + Buchstabe), unten liegen 2–4 große Bildschirmtasten mit den
 * gleichen Zeichen. Man tippt die passende Taste (Wahlreaktion mit Zuordnung: Hick-Hyman, 2 → 4
 * Möglichkeiten). Die Stufe bestimmt Tastenzahl, Mischen der Tastenplätze und Antwortfrist.
 */
import type { Rng } from '../../core/rng';
import { clamp, median, sd } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 12;
/** Anzahl der unterscheidbaren Tasten (Dreieck A, Quadrat B, Raute C, Kreis D) */
export const KEY_TYPES = 4;
export const LETTERS = ['A', 'B', 'C', 'D'] as const;
/** Kleinste Kantenlänge einer Taste in px (Touch-Ziel) */
export const MIN_KEY_PX = 56;
/** Antworten schneller als das nach Reizbeginn sind Vorwegnehmen, keine Reaktion */
export const MIN_RT_MS = 120;
/** Nach einer Antwort werden weitere Taps (Doppeltipp) so lange ignoriert */
export const DOUBLE_TAP_MS = 350;

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

/** Anzahl der Alternativen: 2 (Stufe 1–3), 3 (4–6), 4 (ab 7) */
export function keyCountFor(level: number): number {
  const l = levelOf(level);
  return l <= 3 ? 2 : l <= 6 ? 3 : 4;
}

/** Ab dieser Stufe werden die Tastenplätze vor jedem Durchgang neu gemischt */
export const SHUFFLE_FROM = 9;
export const shuffleFor = (level: number): boolean => levelOf(level) >= SHUFFLE_FROM;

/** Antwortfrist in ms: 3,0 s auf Stufe 1, ≈ 1,35 s auf Stufe 12 */
export function deadlineMs(level: number): number {
  return Math.round(clamp(3000 * Math.pow(0.93, levelOf(level) - 1), 1300, 3000));
}

/** Wartezeit bis zum nächsten Zeichen in ms (zufällig, damit man den Takt nicht erraten kann) */
export function itiMs(rng: Pick<Rng, 'range'>): number {
  return Math.round(rng.range(700, 1300));
}

/**
 * Nächstes Zeichen (0…n−1). Gleichmäßig zufällig; dasselbe Zeichen höchstens zweimal hintereinander
 * (bei n ≥ 3 nie direkt wiederholt), damit es nicht zum Takt-Raten wird.
 */
export function nextStimulus(rng: Pick<Rng, 'int'>, n: number, history: readonly number[]): number {
  const cnt = Math.max(1, Math.min(KEY_TYPES, Math.floor(n)));
  const last = history[history.length - 1];
  const prev = history[history.length - 2];
  for (let i = 0; i < 20; i++) {
    const s = rng.int(cnt);
    if (cnt >= 3 && s === last) continue;
    if (cnt < 3 && s === last && s === prev) continue;
    return s;
  }
  // Notausgang (praktisch nie): ein anderes Zeichen als das letzte
  return cnt > 1 && last !== undefined ? (last + 1) % cnt : 0;
}

/**
 * Platz jeder Taste (Index = Zeichen, Wert = Platz von links 0…n−1).
 * Ohne Mischen bleibt die Reihenfolge A, B, C, D; mit Mischen wird sie vor jedem Durchgang neu
 * gewürfelt und unterscheidet sich immer von der vorherigen (bei n ≥ 2).
 */
export function slotOrder(rng: Pick<Rng, 'shuffle'>, n: number, shuffle: boolean, prev?: readonly number[]): number[] {
  const cnt = Math.max(1, Math.min(KEY_TYPES, Math.floor(n)));
  const ident = Array.from({ length: cnt }, (_, i) => i);
  if (!shuffle || cnt < 2) return ident;
  for (let i = 0; i < 12; i++) {
    const order = rng.shuffle([...ident]);
    if (!prev || prev.length !== cnt || order.some((v, k) => v !== prev[k])) return order;
  }
  return ident.map((_, i) => (i + 1) % cnt);
}

export interface KeyLayout {
  /** Kantenlänge der quadratischen Tasten in px */
  size: number;
  gap: number;
  /** Mittelpunkt-x je Platz von links */
  xs: number[];
}

/** Größe und Plätze der Tasten: nie kleiner als 56 px, nie breiter als die Bühne */
export function keyLayout(n: number, w: number, h: number, u: number): KeyLayout {
  const cnt = Math.max(1, Math.min(KEY_TYPES, Math.floor(n)));
  const gap = clamp(u * 2.5, 10, 28);
  const fit = (w * 0.94 - gap * (cnt - 1)) / cnt;
  const size = Math.max(MIN_KEY_PX, Math.min(fit, h * 0.3, u * 26, 190));
  const total = size * cnt + gap * (cnt - 1);
  const x0 = (w - total) / 2 + size / 2;
  return { size, gap, xs: Array.from({ length: cnt }, (_, i) => x0 + i * (size + gap)) };
}

/** Punkte je richtiger Antwort: Grundwert steigt mit der Stufe, Bonus für schnelle Antwort */
export function pointsFor(level: number, rtMs: number, deadline: number): number {
  const frac = deadline > 0 ? clamp(1 - rtMs / deadline, 0, 1) : 0;
  return 10 + 2 * (levelOf(level) - 1) + Math.round(frac * 10);
}

export interface Stats {
  hits: number;
  wrong: number;
  slow: number;
  early: number;
  /** Median der Zeiten richtiger Antworten in ms (NaN ohne Treffer) */
  medianMs: number;
  /** Streuung (Standardabweichung) der Zeiten richtiger Antworten in ms (0 bei weniger als 2) */
  sdMs: number;
  /** Anteil richtiger Antworten an allen Durchgängen in % */
  accuracy: number;
}

export function computeStats(rts: readonly number[], wrong: number, slow: number, early: number): Stats {
  const hits = rts.length;
  const trials = hits + wrong + slow;
  return {
    hits,
    wrong,
    slow,
    early,
    medianMs: hits ? median(rts) : NaN,
    sdMs: sd(rts),
    accuracy: trials ? (100 * hits) / trials : 0,
  };
}

/** Schlüssel in texts.tips: early | wrong | slow | great */
export function tipFor(s: Stats): string {
  if (s.early >= 3 && s.early >= s.wrong) return 'early';
  if (s.wrong >= 3 && s.wrong >= s.slow) return 'wrong';
  if (s.slow >= 3) return 'slow';
  return 'great';
}
