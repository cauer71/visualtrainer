/**
 * Adaptives Stufenverfahren der Labor-Übungen (Prototyp lib/adaptive.js): „n richtig in Folge → schwerer, ein Fehler →
 * leichter“, multiplikativ auf einem Wert (z. B. Anzeigedauer in ms). Größerer Wert = leichter. Liefert Umkehrpunkte
 * und eine Schwelle (Mittel der letzten Umkehrpunkte).
 *
 * Nicht zu verwechseln mit `core/staircase.ts` (ganzzahlige Stufen der Blickfit-Übungen): Hier läuft die Schwelle in
 * der physikalischen Einheit der Aufgabe, das passt zu „Blitz-Erkennung“ und „Peripheres Erkennen“.
 */
import { mean } from '../../core/stats';

export interface ValueStaircaseOptions {
  start: number;
  min: number;
  max: number;
  /** Faktor bei „schwerer“ (< 1), z. B. 0,8 */
  factorHarder: number;
  /** Faktor bei „leichter“ (> 1), z. B. 1,25 */
  factorEasier: number;
  /** richtige Antworten in Folge bis „schwerer“ (Standard 2) */
  needCorrect?: number;
}

export interface ValueStaircase {
  value(): number;
  /** Antwort melden; gibt den neuen Wert zurück */
  record(correct: boolean): number;
  reversals(): number[];
  history(): Array<{ value: number; correct: boolean }>;
  /** Mittel der letzten n Umkehrpunkte (Standard 4); null, wenn weniger als 2 vorliegen */
  threshold(n?: number): number | null;
}

export function makeValueStaircase(o: ValueStaircaseOptions): ValueStaircase {
  let value = o.start;
  const need = o.needCorrect || 2;
  let streak = 0;
  let lastDir = 0;
  const reversals: number[] = [];
  const history: Array<{ value: number; correct: boolean }> = [];
  const clamp = (v: number): number => Math.min(o.max, Math.max(o.min, v));
  return {
    value: () => value,
    record(correct) {
      history.push({ value, correct: !!correct });
      let dir = 0;
      if (correct) {
        streak++;
        if (streak >= need) {
          streak = 0;
          dir = -1;
        }
      } else {
        streak = 0;
        dir = 1;
      }
      if (dir !== 0) {
        if (lastDir !== 0 && dir !== lastDir) reversals.push(value);
        lastDir = dir;
        const next = Math.round(dir < 0 ? value * o.factorHarder : value * o.factorEasier);
        value = clamp(next === value ? value + dir : next);
      }
      return value;
    },
    reversals: () => reversals.slice(),
    history: () => history.slice(),
    threshold(n = 4) {
      if (reversals.length < 2) return null;
      return mean(reversals.slice(-n));
    },
  };
}
