/**
 * Gegen den Wind – ein unsichtbarer, langsam wechselnder Wind schiebt die Marke, der Finger gleicht aus (Katalog 808, „Fadenkreuz gegen Wind halten“).
 *
 * Baut auf dem Kern `_shared/nachfuehren.ts` auf (Achsen 'xy', Zeiger-Marke ≈ 6 u über dem Finger, Toleranzband,
 * Staircase, Intro-Film mit virtuellem Finger, Abheben = Pause). Eigene Regel in `logic.ts`: ruhiges Ziel in der Mitte,
 * dazu eine unsichtbare, weiche Verschiebung der Marke (Summe langsamer Wellen mit zufälligen Phasen), deren Stärke und
 * Wechseltempo mit der Stufe steigen.
 *
 * Gegenüber dem Vorbild (Maus, Bonus-Serie mit nur steigendem Level, Level ohne Obergrenze, Rot/Grün, „Balance“-Etikett):
 * zeitbasierter Wind (60 und 120 Hz gleich), Stufen mit Obergrenze nach oben und unten, feste Dauer, Form statt nur Farbe.
 * Ehrlich: Es wird nur der Abstand der Marke zum Ziel gemessen – keine Aussage über Zittern, Gleichgewicht oder Gesundheit.
 */
import type { ExerciseDefinition } from '../../core/types';
import { nachfuehren } from '../_shared/nachfuehren';
import { makeRule } from './logic';
import { de, it } from './texts';

export const gegenDenWind: ExerciseDefinition = {
  id: 'gegen-den-wind',
  category: 'bewegung',
  minutes: 2,
  color: '#2C86A6',
  showsLevel: true,
  icon:
    '<path d="M3 16h15c5 0 5-6 0-6M3 25h22c6 0 6 7 0 7M3 34h12" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" opacity=".6"/><circle cx="36" cy="24" r="8.5" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="M31 24h10M36 19v10" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
  texts: { de, it },
  create: nachfuehren({
    axes: 'xy',
    makeRule,
    accent: '#3FB0D6',
  }),
};
