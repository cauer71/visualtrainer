/**
 * Glatt folgen – ein Ziel auf einer sehr glatten, langsamen Kurvenbahn begleiten (Katalog 514, „Glattes Nachführen auf
 * Kurvenbahn“; Original: Kugel zieht Schleifen aus zwei Sinusschwingungen, die bei guter Leistung wegen eines Phasenfehlers
 * sprang).
 *
 * Touch-Fassung auf Basis des Kerns „Nachführen mit dem Finger“ (`_shared/nachfuehren.ts`); Bewegungsregel in `logic.ts`:
 * stetige Phase, Tempo je Durchgang konstant und nur von der Stufe abhängig, ab Stufe 7 eine kleine nicht-harmonische
 * Zusatz-Schwingung. Auf den unteren Stufen zeigt eine gestrichelte Linie die Bahn ein Stück voraus.
 * Gemessen wird Fingerposition gegen Ziel, nicht der Blick.
 */
import type { ExerciseDefinition } from '../../core/types';
import { nachfuehren } from '../_shared/nachfuehren';
import { smoothPreviewSeconds, smoothRule } from './logic';
import { de, it } from './texts';

export const glattFolgen: ExerciseDefinition = {
  id: 'glatt-folgen',
  category: 'bewegung',
  minutes: 2,
  color: '#4A8FD0',
  showsLevel: true,
  icon:
    '<path d="M5 24C5 8 25 8 25 24S45 40 43 22" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity=".22"/><path d="M5 24C5 8 25 8 25 24S45 40 43 22" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="25" cy="24" r="5.6" fill="none" stroke="currentColor" stroke-width="2.6"/><circle cx="25" cy="24" r="2" fill="currentColor"/>',
  texts: { de, it },
  create: nachfuehren({ axes: 'xy', makeRule: smoothRule, previewSeconds: smoothPreviewSeconds, startLevel: 3, demoLevel: 2 }),
};
