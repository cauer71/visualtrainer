/**
 * Ziele abräumen – reine Logik (ohne Canvas), damit sie per vitest prüfbar ist.
 *
 * Mehrere Kreise liegen gleichzeitig auf der Bühne, jeder mit einem Ring, der seine Restzeit zeigt.
 * Man tippt sie in beliebiger Reihenfolge weg; wird einer weggetippt (oder läuft ab), kommt ein
 * neuer nach. Die Stufe regelt Anzahl, Größe und Zeit, die je Kreis zur Verfügung steht.
 */
import type { Rng } from '../../core/rng';
import { clamp, median } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 14;
/** Anzahl der unterscheidbaren Symbole (Dreieck, Quadrat, Raute, Plus, Stern) */
export const SYMBOLS = 5;

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

/** Gleichzeitig liegende Kreise: 2 (Stufe 1–3), 3 (4–7), 4 (8–11), 5 (ab 12) */
export function countFor(level: number): number {
  const l = levelOf(level);
  return l <= 3 ? 2 : l <= 7 ? 3 : l <= 11 ? 4 : 5;
}

/** Zeit je Kreis in ms (Lebensdauer ÷ Anzahl): 1,8 s auf Stufe 1, 0,6 s auf Stufe 14 */
export function budgetMs(level: number): number {
  const l = levelOf(level);
  return clamp(Math.round(1800 * Math.pow(1 / 3, (l - 1) / (MAX_LEVEL - 1))), 600, 1800);
}

/** Lebensdauer eines Kreises in ms (sichtbarer Ring läuft in dieser Zeit leer) */
export function lifeMs(level: number): number {
  return countFor(level) * budgetMs(level);
}

/** Sichtbarer Radius in u (1 % der kürzeren Seite): 7,2 → 4 */
export function radiusU(level: number): number {
  return clamp(7.2 - 0.25 * (levelOf(level) - 1), 3.9, 7.2);
}

/** Sichtbarer Radius in px; nie unter 16 px */
export const radiusPx = (level: number, u: number): number => Math.max(16, radiusU(level) * u);

/** Trefferradius in px: größer als der sichtbare Kreis, nie unter 24 px */
export const hitRadiusPx = (r: number): number => Math.max(r * 1.2, 24);

/** Pause bis zum Nachschub (ms): zufällig 280–620 ms, damit die Kreise zeitversetzt ablaufen */
export function spawnGapMs(rng: Pick<Rng, 'range'>): number {
  return rng.range(280, 620);
}

/** Restanteil des Rings (1 = voll, 0 = leer) */
export const ringFraction = (age: number, life: number): number => clamp(1 - age / life, 0, 1);

export interface Norm {
  nx: number;
  ny: number;
}

/**
 * Neuer Ort in normierten Feldkoordinaten (0..1): mit Abstand zum Rand (Kreis + Ring) und
 * möglichst mit Mindestabstand zu den anderen Kreisen. Findet sich nach `tries` Versuchen kein
 * Platz, gewinnt der Kandidat mit dem größten Abstand.
 */
export function pickSpot(
  rng: Pick<Rng, 'range'>,
  fw: number,
  fh: number,
  r: number,
  others: readonly Norm[],
  tries = 40,
): Norm {
  const m = r * 1.5;
  const x0 = Math.min(m, fw / 2);
  const x1 = Math.max(fw - m, fw / 2);
  const y0 = Math.min(m, fh / 2);
  const y1 = Math.max(fh - m, fh / 2);
  const minDist = r * 3;
  let best: Norm = { nx: 0.5, ny: 0.5 };
  let bestD = -1;
  for (let i = 0; i < tries; i++) {
    const px = rng.range(x0, x1);
    const py = rng.range(y0, y1);
    let d = Infinity;
    for (const o of others) d = Math.min(d, Math.hypot(px - o.nx * fw, py - o.ny * fh));
    if (d > bestD) {
      bestD = d;
      best = { nx: fw > 0 ? px / fw : 0.5, ny: fh > 0 ? py / fh : 0.5 };
    }
    if (d >= minDist) break;
  }
  return best;
}

/** Kleinstes freies Symbol (0…SYMBOLS−1), damit gleichzeitige Kreise verschiedene Zeichen tragen */
export function freeSymbol(used: readonly number[]): number {
  for (let s = 0; s < SYMBOLS; s++) if (!used.includes(s)) return s;
  return used.length % SYMBOLS;
}

/** Punkte je abgeräumtem Kreis: Grundwert steigt mit der Stufe, Bonus für viel Restzeit */
export function pointsFor(level: number, frac: number): number {
  return 10 + 2 * (levelOf(level) - 1) + Math.round(clamp(frac, 0, 1) * 10);
}

export interface Stats {
  cleared: number;
  missed: number;
  wrong: number;
  /** Median der Abstände zwischen zwei Treffern in ms (NaN bei weniger als 2 Werten) */
  medianMs: number;
  /** Anteil abgeräumter Kreise an allen beendeten Kreisen in % */
  clearRate: number;
}

/** Abstände zwischen zwei Treffern über dieser Grenze (Pause, Suchen) zählen nicht */
export const MAX_INTERVAL_MS = 4000;

export function computeStats(cleared: number, missed: number, wrong: number, intervals: readonly number[]): Stats {
  const total = cleared + missed;
  return {
    cleared,
    missed,
    wrong,
    medianMs: intervals.length >= 2 ? median(intervals) : NaN,
    clearRate: total ? (100 * cleared) / total : 0,
  };
}

/** Schlüssel in texts.tips: wrong | missed | great */
export function tipFor(s: Stats): string {
  if (s.wrong >= 3 && s.wrong >= s.missed) return 'wrong';
  if (s.missed >= 3) return 'missed';
  return 'great';
}
