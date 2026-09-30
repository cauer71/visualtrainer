/**
 * Kurvenbahn folgen – ein Ziel läuft ohne Halt auf weichen Kurvenbahnen, die Marke folgt dem Finger (Katalog 507, „Flow-Tracking“).
 *
 * Baut auf dem Kern `_shared/nachfuehren.ts` auf (Achsen 'xy', Zeiger-Marke ≈ 6 u über dem Finger, Toleranzband,
 * Staircase, Intro-Film mit virtuellem Finger, Abheben = Pause). Eigene Bewegungsregel in `logic.ts`: Lissajous-Bahn mit
 * wählbarem Frequenzverhältnis (Stufe) und zufälliger Phase; Bahnen mit fast stehendem Ziel werden aussortiert; ein Stück
 * der Bahn voraus ist gestrichelt zu sehen.
 *
 * Gegenüber dem Vorbild (Maus, Bahnstücke mit Knicken, Combo-Multiplikator mit Zeitbonus, Rot/Grün, nur steigendes Level):
 * wirklich glatte Bahn, Zeit im Ring statt Combo, feste Dauer, Stufen nach oben und unten. „Flow“ wird weder versprochen
 * noch gemessen. Gemessen wird die Fingerposition gegen das Ziel – nicht der Blick.
 */
import type { ExerciseDefinition } from '../../core/types';
import { nachfuehren } from '../_shared/nachfuehren';
import { previewFor, makeRule } from './logic';
import { de, it } from './texts';

export const kurvenbahnFolgen: ExerciseDefinition = {
  id: 'kurvenbahn-folgen',
  category: 'bewegung',
  minutes: 2,
  color: '#2F64B4',
  showsLevel: true,
  icon:
    '<path d="M24 24c-6-11-18-11-18 0s12 11 18 0 18-11 18 0-12 11-18 0z" fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" opacity=".2"/><path d="M24 24c-6-11-18-11-18 0s12 11 18 0 18-11 18 0-12 11-18 0z" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="38" cy="18" r="5" fill="none" stroke="currentColor" stroke-width="2.6"/><circle cx="38" cy="18" r="2" fill="currentColor"/>',
  texts: { de, it },
  create: nachfuehren({
    axes: 'xy',
    makeRule,
    previewSeconds: previewFor,
    accent: '#5A8FE6',
  }),
};
