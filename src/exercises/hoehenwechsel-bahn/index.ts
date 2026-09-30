/**
 * Höhenwechsel-Bahn – einer Kugel auf einer Treppenbahn folgen und dabei ein Zeichen erkennen.
 *
 * Vorbild: „Zickzack-Blickfolge mit langsamem Höhenwechsel / Staircase Step“ (Katalog 413). Das Original
 * heißt „Stufenbahn“ und „vertikale Blickverfolgung“, hat aber keine Stufen, verlangt nichts und misst
 * nichts. Hier läuft die Kugel gleichmäßig fast waagerecht hin und her und wird Strecke für Strecke
 * ein Stück tiefer (dann wieder hinauf) – der Höhenwechsel ist langsam. Auf den geraden Teilstücken,
 * nie in den Wendepunkten, erscheint in der Kugel ein Landolt-Ring, den man per großem Button unten
 * meldet (Kern in `_shared/pursuit.ts`). Ob die Augen wirklich folgen, wird nicht gemessen.
 *
 * - Gleichmäßiges Tempo, Umkehr in den Wendepunkten ohne Abbremsen; Breite höchstens 60 % der Bühne.
 * - Stufen: Höhenwechsel je Strecke (Neigung ≈ 1° → ≈ 6°), Tempo (≈ 3,5 → 15°/s), kleineres Zeichen,
 *   kürzere Anzeige; die Hilfslinie blendet bis Stufe 10 aus.
 */
import type { ExerciseDefinition } from '../../core/types';
import { PursuitExercise } from '../_shared/pursuit';
import { speedFor, StairTrack } from './logic';
import { de, it } from './texts';

export const hoehenwechselBahn: ExerciseDefinition = {
  id: 'hoehenwechsel-bahn',
  category: 'bewegung',
  minutes: 1,
  color: '#2A5C9E',
  icon:
    '<path d="M7 11L40 15L8 23L40 27L8 35L40 38" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.55"/><circle cx="24" cy="25" r="4.8" fill="currentColor"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new PursuitExercise(ctx, { track: new StairTrack(), speedFor, demoLevel: 3 }),
};
