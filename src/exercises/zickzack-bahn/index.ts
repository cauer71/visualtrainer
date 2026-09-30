/**
 * Zickzack-Bahn – einer Kugel auf steilen Schrägstrecken folgen und dabei ein Zeichen erkennen.
 *
 * Vorbild: „Zickzack-Blickverfolgung / Zig-Zag Path Pursuit“ (Katalog 405). Das Original misst nichts,
 * nennt „120°“-Richtungswechsel, die es je nach Bildschirm gar nicht sind, und verspricht Wirkungen,
 * die nicht belegt sind. Hier: Landolt-Ring in der Kugel, Antwort per großem Button (Kern in
 * `_shared/pursuit.ts`), aber auf einer Zickzack-Bahn.
 *
 * - Gleichmäßiges Tempo, Knick ohne Abbremsen, auch an den beiden Enden kehrt die Kugel abrupt um.
 * - Das Zeichen erscheint nur auf geraden Teilstücken, mit Abstand zu jedem Knick (`safeFor`).
 * - Mit der Stufe wird der Knick schärfer (Richtungswechsel 110° → 160°) und das Tempo steigt
 *   (≈ 3,7 → 17°/s); dazu kleineres Zeichen, kürzere Anzeige, Hilfslinie blendet bis Stufe 10 aus.
 * - Breite höchstens 60 % der Bühnenbreite. Ehrlich: Ob die Augen folgen, wird nicht gemessen.
 */
import type { ExerciseDefinition } from '../../core/types';
import { PursuitExercise } from '../_shared/pursuit';
import { de, it } from './texts';
import { speedFor, ZigzagTrack } from './logic';

export const zickzackBahn: ExerciseDefinition = {
  id: 'zickzack-bahn',
  category: 'bewegung',
  minutes: 1,
  color: '#2D5496',
  icon:
    '<path d="M5 37L13 11L21 37L29 11L37 37" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="41" cy="24" r="4.4" fill="currentColor"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new PursuitExercise(ctx, { track: new ZigzagTrack(), speedFor, demoLevel: 3 }),
};
