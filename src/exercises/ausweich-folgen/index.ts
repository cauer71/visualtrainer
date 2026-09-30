/**
 * Ausweich folgen – ein Ziel auf einer waagrechten Schiene begleiten, das scheinbar ausweicht (Katalog 512, „Reaktives
 * Nachführen“; Original: Fadenkreuz mit der Maus auf einer Kugel halten, die waagrecht Richtung und Tempo wechselt).
 *
 * Touch-Fassung auf Basis des Kerns „Nachführen mit dem Finger“ (`_shared/nachfuehren.ts`): nur die Bewegungsregel
 * (`logic.ts`), Texte und Quellen sind hier. Der Finger steuert die Marke nur waagrecht (mit Versatz nach oben); das Ziel
 * wechselt in unregelmäßigen Abständen Richtung und Tempo – mit weichem Übergang, ohne Vorwarnung und ohne Vorschau.
 *
 * Ehrlich: Das Ziel „reagiert“ nicht auf die Marke. Die Kern-Regel kennt nur die Zeit, der Ablauf steht vorab fest und wirkt
 * nur reaktiv. Gemessen wird Fingerposition gegen Ziel, nicht der Blick.
 */
import type { ExerciseDefinition } from '../../core/types';
import { nachfuehren } from '../_shared/nachfuehren';
import { dodgeRule } from './logic';
import { de, it } from './texts';

export const ausweichFolgen: ExerciseDefinition = {
  id: 'ausweich-folgen',
  category: 'bewegung',
  minutes: 2,
  color: '#2B6CB0',
  showsLevel: true,
  icon:
    '<path d="M5 38h38" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="1 6" opacity=".55"/><circle cx="30" cy="21" r="7.5" fill="none" stroke="currentColor" stroke-width="2.8"/><circle cx="30" cy="21" r="2.4" fill="currentColor"/><path d="M19 21H8M12.5 16.5 8 21l4.5 4.5" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/>',
  texts: { de, it },
  create: nachfuehren({ axes: 'x', makeRule: dodgeRule, startLevel: 3, demoLevel: 2 }),
};
