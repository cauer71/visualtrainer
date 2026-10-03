/**
 * Trainer-Regler während der Übung (reine Hilfen, ohne DOM): wer ihn sieht, welche Taste welchen Schritt bedeutet und wie
 * ein Schritt auf den Wert wirkt. Die Leiste selbst ist `ui/components/LiveBar.tsx`, die Übung begrenzt und protokolliert
 * jede Änderung (`Exercise.setLive`).
 */
import type { ExerciseDefinition, LiveState } from './types';

/** Der Regler erscheint nur in der Trainer- und Entwickler-Ansicht und nur bei Übungen mit `liveControls` */
export function hasLiveControls(def: Pick<ExerciseDefinition, 'liveControls'>, trainerView: boolean): boolean {
  return trainerView && !!def.liveControls?.length;
}

/**
 * Schritt einer Taste: `+`/`=` kleiner Schritt hoch, `-`/`_` kleiner Schritt runter, Bild auf/ab grober Schritt hoch/runter.
 * Alle anderen Tasten: 0 (keine Wirkung, die Übung behält sie für sich).
 */
export function liveKeyDelta(key: string, s: Pick<LiveState, 'step' | 'coarseStep'>): number {
  switch (key) {
    case '+':
    case '=':
      return s.step;
    case '-':
    case '_':
      return -s.step;
    case 'PageUp':
      return s.coarseStep;
    case 'PageDown':
      return -s.coarseStep;
    default:
      return 0;
  }
}

/** Neuer Wunschwert nach einem Schritt, auf Min/Max begrenzt (die Übung begrenzt zusätzlich den Sprung) */
export function nudgeValue(s: Pick<LiveState, 'value' | 'min' | 'max'>, delta: number): number {
  return Math.round(Math.min(s.max, Math.max(s.min, s.value + delta)) * 1000) / 1000;
}
