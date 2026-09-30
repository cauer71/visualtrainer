/**
 * Gegenhalten – die Marke wird gleichmäßig nach oben gezogen, der Finger hält dagegen (Katalog 504, „Rückstoßausgleich“).
 *
 * Baut auf dem Kern `_shared/nachfuehren.ts` auf (Zeiger-Marke ≈ 6 u über dem Finger, Toleranzband, Staircase,
 * Intro-Film mit virtuellem Finger, Abheben = Pause). Eigene Bewegungsregel in `logic.ts`: still stehendes Ziel, dazu ein
 * unsichtbarer, gleichmäßiger Zug nach oben mit sanfter Schwankung und anschließendem Zurückgleiten (Pfeil neben der Marke
 * zeigt die Zugrichtung). Nur die Fingerhöhe zählt.
 *
 * Gegenüber dem Vorbild (Maus, gehaltene Taste mit „Dauerfeuer“, Zug je Schuss, Zeitbonus, Waffen-Thema, Zielfigur aus
 * drei Teilen): neutrale Ring-Marke, Zeit statt Bildzahl, feste Dauer je Durchgang, jeder Zug etwas anders (Höhe, Dauer),
 * Stufen nach oben und unten. Gemessen wird die Fingerhöhe gegen das Ziel – nicht der Blick.
 */
import type { ExerciseDefinition } from '../../core/types';
import { nachfuehren } from '../_shared/nachfuehren';
import { makeRule } from './logic';
import { de, it } from './texts';

export const gegenhalten: ExerciseDefinition = {
  id: 'gegenhalten',
  category: 'bewegung',
  minutes: 2,
  color: '#2B6CB0',
  showsLevel: true,
  icon:
    '<circle cx="24" cy="32" r="9" fill="none" stroke="currentColor" stroke-width="2.6" opacity=".45"/><path d="M19 32h10M24 27v10" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M24 20V8m-5 5 5-5 5 5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
  texts: { de, it },
  create: nachfuehren({
    axes: 'y',
    makeRule,
    accent: '#3B8FD9',
  }),
};
