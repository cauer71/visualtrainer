import { level01 } from './level01';
import type { LevelDef } from './types';

/** Alle Level in Spielreihenfolge. Level 2–10 folgen als weitere Dateien (siehe README, Abschnitt Ausblick). */
export const LEVELS: readonly LevelDef[] = [level01];

export function levelByNumber(n: number): LevelDef {
  return LEVELS[Math.min(LEVELS.length, Math.max(1, Math.round(n))) - 1];
}

/** Nächstes Level; nach dem letzten wird das letzte wiederholt */
export function nextLevelNumber(n: number): number {
  return Math.min(LEVELS.length, n + 1);
}
