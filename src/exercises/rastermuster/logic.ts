/**
 * Rastermuster – reine Logik (ohne Canvas): Stufen, Muster, Wertung, Treppe.
 */
import type { Rng } from '../../core/rng';
import { Staircase } from '../../core/staircase';
import { clamp, easeInOut } from '../../core/stats';

export interface LevelSpec {
  /** Raster n × n */
  n: number;
  /** Anzahl leuchtender Felder */
  k: number;
}

/** Stufe 1 … 12 (höher = schwerer): 3×3 → 6×6, Dichte stets unter 45 % */
export const LEVELS: readonly LevelSpec[] = [
  { n: 3, k: 3 },
  { n: 3, k: 4 },
  { n: 4, k: 4 },
  { n: 4, k: 5 },
  { n: 4, k: 6 },
  { n: 5, k: 6 },
  { n: 5, k: 7 },
  { n: 5, k: 8 },
  { n: 6, k: 8 },
  { n: 6, k: 9 },
  { n: 6, k: 10 },
  { n: 6, k: 11 },
];
export const MAX_LEVEL = LEVELS.length;
export const DEFAULT_START = 2;
/** Muster je Sitzung */
export const PATTERNS = 8;
export const QUICK_PATTERNS = 3;
/** So viele falsche Tipps beenden ein Muster */
export const MAX_WRONG = 2;

export function levelSpec(level: number): LevelSpec {
  return LEVELS[clamp(Math.round(level), 1, MAX_LEVEL) - 1];
}

/**
 * Stufe für die aktuelle Bühne: Passt das Raster nicht (kleiner Bildschirm), wird es kleiner;
 * die Felderzahl bleibt, darf aber 45 % der Felder nicht überschreiten.
 */
export function effectiveSpec(level: number, maxN: number): LevelSpec {
  const s = levelSpec(level);
  const n = clamp(Math.min(s.n, Math.max(3, Math.floor(maxN))), 3, 6);
  const k = Math.min(s.k, Math.max(2, Math.floor(n * n * 0.45)));
  return { n, k };
}

/** Anzeigedauer des Musters in ms (mehr Felder = etwas länger) */
export function showMs(k: number): number {
  return 1600 + 100 * k;
}

export const FADE_IN_MS = 220;
export const FADE_OUT_MS = 280;

/** Helligkeit 0..1 der Felder zum Zeitpunkt tRel (ms seit Beginn der Anzeige, Gesamtdauer dur): weich ein, weich aus */
export function cellLight(tRel: number, dur: number): number {
  if (tRel <= 0 || tRel >= dur) return 0;
  const up = easeInOut(tRel / FADE_IN_MS);
  const down = easeInOut((tRel - (dur - FADE_OUT_MS)) / FADE_OUT_MS);
  return clamp(up * (1 - down), 0, 1);
}

/** Höchstens so viele Felder je Zeile/Spalte – keine ganze Reihe, die sich als „Strich“ merken ließe */
export function maxPerLine(n: number, k: number): number {
  return Math.max(2, Math.ceil(k / n));
}

/** Zufälliges Muster aus k Feldern (Index = Zeile · n + Spalte), höchstens maxPerLine je Zeile/Spalte, nie gleich wie `prev` */
export function makePattern(rng: Rng, n: number, k: number, prev?: readonly number[]): number[] {
  const m = maxPerLine(n, k);
  const N = n * n;
  for (let attempt = 0; attempt < 300; attempt++) {
    const order = rng.shuffle(Array.from({ length: N }, (_, i) => i));
    const rows = new Array<number>(n).fill(0);
    const cols = new Array<number>(n).fill(0);
    const pick: number[] = [];
    for (const c of order) {
      if (pick.length >= k) break;
      const r = Math.floor(c / n);
      const q = c % n;
      if (rows[r] >= m || cols[q] >= m) continue;
      rows[r]++;
      cols[q]++;
      pick.push(c);
    }
    if (pick.length < k) continue;
    pick.sort((a, b) => a - b);
    if (prev && prev.length === k && prev.every((c, i) => c === pick[i])) continue;
    return pick;
  }
  return rng
    .shuffle(Array.from({ length: N }, (_, i) => i))
    .slice(0, k)
    .sort((a, b) => a - b);
}

/** Gemeistert = alle Felder gefunden und weniger als MAX_WRONG falsche Tipps */
export function isMastered(found: number, k: number, wrong: number): boolean {
  return found >= k && wrong < MAX_WRONG;
}

/** 2 richtig in Folge → eine Stufe höher, 1 Fehler → eine Stufe tiefer (≈ 71 % Erfolg) */
export function createStaircase(start: number | null): Staircase {
  const s = Math.round(start ?? DEFAULT_START);
  return new Staircase({
    start: clamp(Number.isFinite(s) ? s : DEFAULT_START, 1, MAX_LEVEL),
    min: 1,
    max: MAX_LEVEL,
    down: 2,
    up: 1,
    stepHarder: 1,
    stepEasier: 1,
    initialBoost: 1,
  });
}
