/**
 * Liegende Acht – einer Kugel auf einer liegenden Acht folgen und dabei ein Zeichen erkennen.
 *
 * Vorbild: „Liegende Acht / Infinity Pursuit“ (Katalog 402). Das Original zeigt nur einen
 * Leuchtpunkt und misst nichts. Hier erzwingt eine Aufgabe das Folgen: Kurz erscheint in der
 * Kugel ein Landolt-Ring, den man per großem Button unten meldet (Kern in `_shared/pursuit.ts`).
 *
 * - Echte Lemniskate in fester Form, gleichmäßiges Tempo entlang der Bahn (auch im Kreuzungspunkt),
 *   Breite höchstens 60 % der Bühnenbreite (Kopf möglichst ruhig, wichtig bei Gleitsicht).
 * - Adaptiv: Tempo (≈ 4 → 25°/s), Zeichengröße und Anzeigedauer; Hilfslinie blendet bis Stufe 10 aus.
 * - Ehrlich: Ob die Augen wirklich folgen, wird nicht gemessen, nur ob das Zeichen erkannt wird.
 */
import type { ExerciseDefinition } from '../../core/types';
import { PursuitExercise } from '../_shared/pursuit';
import { de, it } from './texts';
import { LemniscateTrack, speedFor } from './logic';

export const liegendeAcht: ExerciseDefinition = {
  id: 'liegende-acht',
  category: 'bewegung',
  minutes: 1,
  color: '#2F78BE',
  icon:
    '<path d="M24 24C19 16 6 16 6 24s13 8 18 0 18-8 18 0-13 8-18 0z" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linejoin="round"/><circle cx="36" cy="18.6" r="4.2" fill="currentColor"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new PursuitExercise(ctx, { track: new LemniscateTrack(), speedFor, demoLevel: 5 }),
};
