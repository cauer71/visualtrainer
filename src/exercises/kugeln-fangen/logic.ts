/**
 * Kugeln fangen – reine Logik (ohne Canvas, damit testbar).
 *
 * Kreise („Kugeln“) und Quadrate fallen gleichmäßig von oben nach unten. Kreise werden angetippt (Go),
 * Quadrate lässt man durch (No-Go). Der Unterschied ist allein die FORM – beide haben dieselbe Farbe und
 * Helligkeit. Mit der Stufe fallen sie schneller, kommen dichter und öfter als Quadrat.
 *
 * Die Fallbewegung läuft über einen normierten Fortschritt p (0 = oben, 1 = Boden); die Fallzeit in Sekunden
 * ist unabhängig von Bühnengröße und Bildrate.
 */
import { clamp } from '../../core/stats';

export { findHit, pickLane } from '../fallende-ziele/logic';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 20;

export type Kind = 'circle' | 'square';

/** Ganzzahlige Stufe */
export function levelInt(level: number): number {
  return clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);
}

/** Fallzeit vom oberen Rand bis zum Boden in Sekunden: Stufe 1 = 4,0 s, Stufe 20 ≈ 1,3 s */
export function fallTimeFor(level: number): number {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  return Math.max(1.3, 4.0 * Math.pow(0.94, lv - 1));
}

/** Mittlerer Abstand zwischen zwei neuen Objekten in Sekunden: 1,0 s → 0,4 s */
export function spawnGapSecondsFor(level: number): number {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  return Math.max(0.4, 1.0 * Math.pow(0.93, lv - 1));
}

/** Wie viele Objekte höchstens gleichzeitig fallen (Kollisionsdichte): 2 → 6 */
export function maxActiveFor(level: number): number {
  const lv = levelInt(level);
  return lv <= 2 ? 2 : lv <= 5 ? 3 : lv <= 9 ? 4 : lv <= 14 ? 5 : 6;
}

/** Anteil der Quadrate unter den neuen Objekten: 20 % → ≈ 34 % */
export function squareShareFor(level: number): number {
  return 0.2 + 0.0075 * (levelInt(level) - 1);
}

/**
 * Art des nächsten Objekts. Die ersten beiden sind immer Kreise; nie mehr als zwei Quadrate in Folge
 * (sonst würde „Durchlassen“ zur neuen Gewohnheit); nach sieben Kreisen in Folge kommt ein Quadrat.
 */
export function nextKind(rand: () => number, share: number, history: readonly Kind[]): Kind {
  const n = history.length;
  if (n < 2) return 'circle';
  if (history[n - 1] === 'square' && history[n - 2] === 'square') return 'circle';
  if (n >= 7 && history.slice(n - 7).every((k) => k === 'circle')) return 'square';
  return rand() < share ? 'square' : 'circle';
}

/** Sichtbarer Radius in px: 5,4 u → 3,4 u, mindestens 20 px */
export function radiusFor(level: number, u: number): number {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  return Math.max(20, u * Math.max(3.4, 5.4 - 0.1 * (lv - 1)));
}

/** Trefferradius: größer als das sichtbare Objekt, nie unter 28 px (Fingerbreite) */
export function hitRadiusFor(r: number): number {
  return Math.max(r + 8, 28);
}

/** Halbe Kantenlänge des Quadrats: gleiche Fläche wie der Kreis mit Radius r */
export function squareHalfSide(r: number): number {
  return (r * Math.sqrt(Math.PI)) / 2;
}

/** Punkte für eine gefangene Kugel */
export function pointsFor(level: number): number {
  return 10 + 2 * (levelInt(level) - 1);
}

/** Neuer Fortschritt nach dt Sekunden (gleichmäßiger Fall) */
export function advance(p: number, dt: number, fallTime: number): number {
  return dt <= 0 ? p : p + dt / fallTime;
}

/** Fang in % (nur Kreise): 0, solange noch kein Kreis entschieden ist */
export function catchPct(caught: number, missed: number): number {
  const n = caught + missed;
  return n > 0 ? Math.round((100 * caught) / n) : 0;
}

/** Fehlalarm-Quote in % aller entschiedenen Quadrate (angetippt oder durchgelassen) */
export function falseAlarmPct(falseAlarms: number, squaresJudged: number): number {
  return squaresJudged > 0 ? Math.round((100 * falseAlarms) / squaresJudged) : 0;
}
