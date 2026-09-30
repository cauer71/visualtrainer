/**
 * Zickzack folgen – ein Ziel begleiten, das in geraden Stücken im Zickzack läuft (Katalog 513, „Zickzack-Nachführen“;
 * Original: Kugel fährt in geraden, schrägen Stücken über die Fläche und knickt unregelmäßig ab; „zerstörte“ Ziele erscheinen
 * neu und verlangen einen Flick – das entfällt hier, die Sitzung ist reines Nachführen mit fester Dauer).
 *
 * Touch-Fassung auf Basis des Kerns „Nachführen mit dem Finger“ (`_shared/nachfuehren.ts`); Bewegungsregel in `logic.ts`:
 * Knickwinkel, Tempo und Länge der Teilstücke nach Stufe, Knicke gerundet. Kleine Vorschau der Bahn nur auf den untersten Stufen.
 * Gemessen wird Fingerposition gegen Ziel, nicht der Blick.
 */
import type { ExerciseDefinition } from '../../core/types';
import { nachfuehren } from '../_shared/nachfuehren';
import { zigzagRule } from './logic';
import { de, it } from './texts';

export const zickzackFolgen: ExerciseDefinition = {
  id: 'zickzack-folgen',
  category: 'bewegung',
  minutes: 2,
  color: '#3A7CC6',
  showsLevel: true,
  icon:
    '<path d="M5 35 15 13 25 35 35 15" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity=".22"/><path d="M5 35 15 13 25 35 35 15" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="38" cy="12" r="5.6" fill="none" stroke="currentColor" stroke-width="2.6"/><circle cx="38" cy="12" r="2" fill="currentColor"/>',
  texts: { de, it },
  create: nachfuehren({
    axes: 'xy',
    makeRule: zigzagRule,
    previewSeconds: (level) => (level <= 3 ? 0.8 : 0),
    startLevel: 3,
    demoLevel: 2,
  }),
};
