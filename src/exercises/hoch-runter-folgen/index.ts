/**
 * Hoch und runter folgen – ein Ziel begleiten, das in weichen Bögen hoch- und herunterspringt (Katalog 515, „Vertikales
 * Nachführen“; Original: Kugel wird vom unteren Rand hochgeworfen, fällt zurück und springt gelegentlich zur Seite oder nach
 * oben; Zielen mit gedrückter Maustaste, Zeitabzug beim Verfehlen).
 *
 * Touch-Fassung auf Basis des Kerns „Nachführen mit dem Finger“ (`_shared/nachfuehren.ts`); Bewegungsregel in `logic.ts`:
 * überwiegend senkrechte Bögen mit fester Schwerkraft je Stufe, sanfte Umkehr am Boden, leichtes seitliches Schwanken. Extra-
 * Schübe im Scheitel (ab Stufe 4) werden durch einen Pfeil vorher angekündigt. Kein Zeitabzug, keine Zeitboni, feste Dauer.
 * Gemessen wird Fingerposition gegen Ziel, nicht der Blick.
 */
import type { ExerciseDefinition } from '../../core/types';
import { nachfuehren } from '../_shared/nachfuehren';
import { arcPreviewSeconds, arcRule } from './logic';
import { de, it } from './texts';

export const hochRunterFolgen: ExerciseDefinition = {
  id: 'hoch-runter-folgen',
  category: 'bewegung',
  minutes: 2,
  color: '#2459A0',
  showsLevel: true,
  icon:
    '<path d="M4 39Q14 3 24 39Q34 3 44 39" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" opacity=".22"/><path d="M4 39Q14 3 24 39Q34 3 44 39" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="34" cy="14" r="5.6" fill="none" stroke="currentColor" stroke-width="2.6"/><circle cx="34" cy="14" r="2" fill="currentColor"/>',
  texts: { de, it },
  create: nachfuehren({ axes: 'xy', makeRule: arcRule, previewSeconds: arcPreviewSeconds, startLevel: 3, demoLevel: 2 }),
};
