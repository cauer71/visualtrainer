/**
 * Adaptive Kontraststeuerung für das dominante Auge (fellowEyeContrast). Reine Funktionen.
 *
 * Definitionen (auch im README):
 *  - ERFOLG = Level abgeschlossen mit mindestens 2 Sternen (also in der Richtzeit ODER ohne zu viele Fehlversuche).
 *  - MISSERFOLG = Level nicht abgeschlossen (maximale Leveldauer abgelaufen oder Level neu gestartet)
 *    oder nur mit 1 Stern abgeschlossen.
 *  - WIEDERHOLTER MISSERFOLG = 2 Misserfolge in Folge. Danach beginnt die Zählung von vorn; ein Erfolg setzt sie zurück.
 *  - Abbruch wegen Beschwerden oder Sessionende mitten im Level zählt weder als Erfolg noch als Misserfolg.
 *
 * Modi:
 *  - PERCENTUAL: Erfolg +10 % des aktuellen Werts, wiederholter Misserfolg −5 % des aktuellen Werts
 *    (20 → 22 → 24,2 → 26,6 …). Werte werden je Schritt auf eine Nachkommastelle gerundet.
 *  - LINEAR: Erfolg +5 Prozentpunkte, wiederholter Misserfolg −5 Prozentpunkte.
 *  - MANUAL: keine automatische Änderung.
 * Abgeschaltet (adaptiveContrast = false): keine Änderung, unabhängig vom Modus. Grenzen immer 0–100 %.
 */

export type ContrastMode = 'PERCENTUAL' | 'LINEAR' | 'MANUAL';
export type LevelOutcome = 'success' | 'failure' | 'neutral';

export const CONTRAST_MIN = 0;
export const CONTRAST_MAX = 100;
/** so viele Misserfolge in Folge gelten als „wiederholter Misserfolg“ */
export const REPEATED_FAILURES = 2;
/** Mindeststerne für „Erfolg“ */
export const SUCCESS_MIN_STARS = 2;

const round1 = (v: number): number => Math.round(v * 10) / 10;
export const clampContrast = (v: number): number => round1(Math.min(CONTRAST_MAX, Math.max(CONTRAST_MIN, Number.isFinite(v) ? v : 0)));

export function increaseContrast(current: number, mode: ContrastMode): number {
  if (mode === 'PERCENTUAL') return clampContrast(current + current * 0.1);
  if (mode === 'LINEAR') return clampContrast(current + 5);
  return clampContrast(current);
}

export function decreaseContrast(current: number, mode: ContrastMode): number {
  if (mode === 'PERCENTUAL') return clampContrast(current - current * 0.05);
  if (mode === 'LINEAR') return clampContrast(current - 5);
  return clampContrast(current);
}

/** Ergebnis eines Levels aus Abschluss und Sternen */
export function outcomeOf(completed: boolean, stars: number, countsForAdaptation = true): LevelOutcome {
  if (!countsForAdaptation) return 'neutral';
  return completed && stars >= SUCCESS_MIN_STARS ? 'success' : 'failure';
}

export interface AdaptiveState {
  fellowEyeContrast: number;
  /** Misserfolge in Folge seit dem letzten Erfolg bzw. der letzten Absenkung */
  consecutiveFailures: number;
}

export interface AdaptiveOptions {
  enabled: boolean;
  mode: ContrastMode;
}

export interface AdaptiveStep extends AdaptiveState {
  changed: 'up' | 'down' | null;
}

/** Ein Schritt der Kontraststeuerung nach einem Level */
export function adaptContrast(state: AdaptiveState, outcome: LevelOutcome, opts: AdaptiveOptions): AdaptiveStep {
  const cur = clampContrast(state.fellowEyeContrast);
  if (outcome === 'neutral') return { fellowEyeContrast: cur, consecutiveFailures: state.consecutiveFailures, changed: null };
  const active = opts.enabled && opts.mode !== 'MANUAL';
  if (outcome === 'success') {
    const next = active ? increaseContrast(cur, opts.mode) : cur;
    return { fellowEyeContrast: next, consecutiveFailures: 0, changed: next !== cur ? 'up' : null };
  }
  const fails = state.consecutiveFailures + 1;
  if (fails >= REPEATED_FAILURES) {
    const next = active ? decreaseContrast(cur, opts.mode) : cur;
    return { fellowEyeContrast: next, consecutiveFailures: 0, changed: next !== cur ? 'down' : null };
  }
  return { fellowEyeContrast: cur, consecutiveFailures: fails, changed: null };
}
