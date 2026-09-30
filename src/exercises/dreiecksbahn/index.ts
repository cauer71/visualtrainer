/**
 * Dreiecksbahn – einer Kugel auf einem Dreieck folgen und dabei ein Zeichen erkennen.
 *
 * Vorbild: „Dreieckige Blickverfolgung / Triangular Pursuit“ (Katalog 406). Das Original misst nichts,
 * sein Dreieck ist nur bei fast quadratischem Bild gleichseitig und die Kanten laufen mit
 * unterschiedlichem Tempo. Hier: Landolt-Ring in der Kugel, Antwort per großem Button (Kern in
 * `_shared/pursuit.ts`), aber auf einem echten gleichseitigen Dreieck.
 *
 * - Gleiches Tempo auf allen Kanten, abrupter Richtungswechsel (120°) in den Ecken; Laufrichtung
 *   zufällig. Auf niedrigen Stufen sind die Ecken abgerundet, ab Stufe 9 spitz.
 * - Das Zeichen erscheint nur auf den Kanten, mit Abstand zu jeder Ecke (`safeFor`).
 * - Tempo ≈ 3,7 → 16°/s, dazu kleineres Zeichen, kürzere Anzeige, Hilfslinie blendet bis Stufe 10 aus.
 * - Breite höchstens 60 % der Bühnenbreite. Ehrlich: Ob die Augen folgen, wird nicht gemessen.
 */
import type { ExerciseDefinition } from '../../core/types';
import { PursuitExercise } from '../_shared/pursuit';
import { de, it } from './texts';
import { speedFor, TriangleTrack } from './logic';

export const dreiecksbahn: ExerciseDefinition = {
  id: 'dreiecksbahn',
  category: 'bewegung',
  minutes: 1,
  color: '#2779AC',
  icon:
    '<path d="M24 8L41 38H7Z" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linejoin="round"/><circle cx="32.5" cy="23" r="4.4" fill="currentColor"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new PursuitExercise(ctx, { track: new TriangleTrack(), speedFor, demoLevel: 3 }),
};
