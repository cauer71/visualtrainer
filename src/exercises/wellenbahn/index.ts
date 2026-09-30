/**
 * Wellenbahn – einer Kugel auf einer laufenden Sinuswelle folgen und dabei ein Zeichen erkennen.
 *
 * Vorbild: „Sinuswellen-Blickverfolgung / Sine Wave Pursuit“ (Katalog 403). Das Original misst
 * nichts und kehrt am Rand hart um. Hier: dieselbe Aufgabe wie in „Liegende Acht“ (Landolt-Ring
 * in der Kugel, Antwort per großem Button; Kern in `_shared/pursuit.ts`), aber auf einer Welle.
 *
 * - Die Kugel läuft mit gleichmäßigem Tempo entlang der Kurve von links nach rechts und zurück,
 *   an den Enden weich abbremsend (das Zeichen erscheint nur bei vollem Tempo, nie in der Umkehr).
 * - Mit der Stufe steigen Amplitude (4 → 11 u) und Wellenzahl (1 → 3,5), dazu Tempo, kleineres
 *   Zeichen, kürzere Anzeige; die Form wird bei Stufenwechsel weich nachgeführt.
 * - Breite höchstens 60 % der Bühnenbreite.
 */
import type { ExerciseDefinition } from '../../core/types';
import { PursuitExercise } from '../_shared/pursuit';
import { de, it } from './texts';
import { speedFor, WaveTrack } from './logic';

export const wellenbahn: ExerciseDefinition = {
  id: 'wellenbahn',
  category: 'bewegung',
  minutes: 1,
  color: '#2A5FA8',
  icon:
    '<path d="M3 27c4.5-15 9-15 13.5 0s9 15 13.5 0c2.6-7.6 5.6-9 8.6-6.4" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/><circle cx="41" cy="19" r="4.2" fill="currentColor"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new PursuitExercise(ctx, { track: new WaveTrack(), speedFor, demoLevel: 3 }),
};
