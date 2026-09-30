/**
 * Seitwärts folgen – ein Ziel weicht seitlich hin und her aus, die Marke folgt der Fingerposition (Katalog 505, „Strafe-Tracking“).
 *
 * Baut auf dem Kern `_shared/nachfuehren.ts` auf (Achse 'x': nur die waagerechte Fingerposition zählt, die Marke liegt auf
 * der Schiene; Toleranzband, Staircase, Intro-Film mit virtuellem Finger, Abheben = Pause). Eigene Bewegungsregel in
 * `logic.ts`: abwechselnde Strecken mit festem Wechselrhythmus (kurz – lang – lang – kurz), weiche Wendungen.
 *
 * Gegenüber dem Vorbild (Maus, zufällige harte Umkehr, Serienabbruch beim ersten Abrutschen, Zeitbonus, Kapsel als
 * Spielfigur, Rot/Grün): Wendungen unregelmäßig, aber vorhersehbar und weich, Zeit im Ring statt Serie, feste Dauer,
 * Form statt nur Farbe. Gemessen wird die Fingerposition gegen das Ziel – nicht der Blick.
 */
import type { ExerciseDefinition } from '../../core/types';
import { nachfuehren } from '../_shared/nachfuehren';
import { makeRule } from './logic';
import { de, it } from './texts';

export const seitwaertsFolgen: ExerciseDefinition = {
  id: 'seitwaerts-folgen',
  category: 'bewegung',
  minutes: 2,
  color: '#3572B8',
  showsLevel: true,
  icon:
    '<path d="M8 38h32" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="1 5" opacity=".6"/><circle cx="24" cy="20" r="9" fill="none" stroke="currentColor" stroke-width="2.6" opacity=".45"/><path d="M19 20h10M24 15v10" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M7 38h34M12 33l-5 5 5 5M36 33l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>',
  texts: { de, it },
  create: nachfuehren({
    axes: 'x',
    makeRule,
    accent: '#4C9BE0',
  }),
};
