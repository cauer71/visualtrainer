/**
 * Sanfte Blickfolge – einer Kugel auf einer weichen Schlaufenbahn folgen und dabei ein Zeichen erkennen.
 *
 * Vorbild: „Übung für sanfte Blickfolge / Constant Slow Pursuit“ (Katalog 404). Das Original zeigt nur
 * einen Leuchtpunkt, misst nichts und läuft trotz des Namens „Constant“ entlang der Bahn mit um den
 * Faktor ≈ 5 schwankendem Tempo. Hier: dieselbe Aufgabe wie in „Liegende Acht“ (Landolt-Ring in der
 * Kugel, Antwort per großem Button; Kern in `_shared/pursuit.ts`), aber auf einer Lissajous-Bahn.
 *
 * - Lissajous-Figur 2 : 3 (Original 3 : 4, hat aber engere Wendestellen), Breite höchstens 60 % der
 *   Bühnenbreite (Kopf möglichst ruhig, wichtig bei Gleitsicht).
 * - Gleichmäßiges Tempo entlang der Bogenlänge; nur in den engsten Bögen bremst die Kugel leicht ab
 *   (Faktor ≥ 0,55, sonst wäre es dort ein Haarnadelknick – nicht „sanft“); das Zeichen erscheint nur
 *   bei fast vollem Tempo.
 * - Tempo stufenweise (≈ 5 → 24°/s), dazu kleineres Zeichen und kürzere Anzeige; die Hilfslinie
 *   blendet bis Stufe 10 aus.
 * - Ehrlich: Ob die Augen wirklich folgen, wird nicht gemessen, nur ob das Zeichen erkannt wird.
 */
import type { ExerciseDefinition } from '../../core/types';
import { PursuitExercise } from '../_shared/pursuit';
import { de, it } from './texts';
import { LissajousTrack, speedFor } from './logic';

export const sanfteBlickfolge: ExerciseDefinition = {
  id: 'sanfte-blickfolge',
  category: 'bewegung',
  minutes: 1,
  color: '#3D7DC2',
  icon:
    '<path d="M37.2 24.0C37.2 26.5 36.4 29.3 35.2 31.4C34.1 33.6 32.1 35.6 30.1 36.9C28.1 38.1 25.4 38.9 23.2 39.0C21.0 39.1 18.6 38.5 16.7 37.6C14.9 36.7 13.3 35.1 12.3 33.6C11.3 32.1 10.9 30.1 10.8 28.6C10.8 27.1 11.4 25.5 12.0 24.5C12.6 23.4 13.8 22.7 14.6 22.3C15.4 22.0 16.5 22.2 17.1 22.5C17.6 22.7 18.1 23.5 18.1 24.0C18.1 24.5 17.6 25.3 17.1 25.5C16.5 25.8 15.4 26.0 14.6 25.7C13.8 25.3 12.6 24.6 12.0 23.5C11.4 22.5 10.8 20.9 10.8 19.4C10.9 17.9 11.3 15.9 12.3 14.4C13.3 12.9 14.9 11.3 16.7 10.4C18.6 9.5 21.0 8.9 23.2 9.0C25.4 9.1 28.1 9.9 30.1 11.1C32.1 12.4 34.1 14.4 35.2 16.6C36.4 18.7 37.2 21.5 37.2 24.0z" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linejoin="round"/><circle cx="35.2" cy="16.6" r="4.4" fill="currentColor"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new PursuitExercise(ctx, { track: new LissajousTrack(), speedFor, demoLevel: 3 }),
};
