/**
 * Verzeichnis aller Übungen.
 *
 * Neue Übung hinzufügen:
 *  1. Ordner src/exercises/<id>/ mit index.ts (Logik + Definition) und texts.ts (de/it) anlegen
 *  2. Definition hier importieren und in EXERCISES eintragen
 *  3. Optional: Hintergrundtext in src/content/science.ts ergänzen
 */
import type { CategoryId, ExerciseDefinition } from '../core/types';
import { ausDemTakt } from './aus-dem-takt';
import { blitzblick } from './blitzblick';
import { doppeltGefordert } from './doppelt-gefordert';
import { pfeilDuell } from './pfeil-duell';
import { reihenRaetsel } from './reihen-raetsel';
import { wachposten } from './wachposten';
import { weichensteller } from './weichensteller';
import { zahlenjagd } from './zahlenjagd';
import { zeichenCode } from './zeichen-code';
import { blitzreaktion } from './blitzreaktion';
import { kugelDetektiv } from './kugel-detektiv';
import { punktlandung } from './punktlandung';
import { scharfInBewegung } from './scharf-in-bewegung';
import { stoppLos } from './stopp-los';
import { suchbild } from './suchbild';
import { zielfang } from './zielfang';

/** Reihenfolge = Anzeige-Reihenfolge innerhalb der Bereiche */
export const EXERCISES: ExerciseDefinition[] = [
  blitzreaktion,
  stoppLos,
  zielfang,
  scharfInBewegung,
  kugelDetektiv,
  punktlandung,
  suchbild,
  blitzblick,
  ausDemTakt,
  pfeilDuell,
  weichensteller,
  wachposten,
  doppeltGefordert,
  zeichenCode,
  zahlenjagd,
  reihenRaetsel,
];

export interface CategoryMeta {
  id: CategoryId;
  color: string;
  soft: string;
  icon: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'reaktion',
    color: '#C8641E',
    soft: '#FCEFE4',
    icon: '<path d="M26 4 10 27h11l-3 17 17-24H24z" fill="currentColor"/>',
  },
  {
    id: 'bewegung',
    color: '#2E6DB4',
    soft: '#E8F0FA',
    icon: '<circle cx="31" cy="17" r="7" fill="currentColor"/><path d="M6 36c8-1 14-5 19-12" stroke="currentColor" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-dasharray="1 7"/>',
  },
  {
    id: 'wahrnehmung',
    color: '#8C6D4A',
    soft: '#F4EEE6',
    icon: '<path d="M4 24s7-12 20-12 20 12 20 12-7 12-20 12S4 24 4 24z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round"/><circle cx="24" cy="24" r="6" fill="currentColor"/>',
  },
  {
    id: 'konzentration',
    color: '#7A5195',
    soft: '#F3EDF7',
    icon: '<circle cx="24" cy="24" r="17" fill="none" stroke="currentColor" stroke-width="3.5"/><circle cx="24" cy="24" r="9" fill="none" stroke="currentColor" stroke-width="3.5"/><circle cx="24" cy="24" r="3" fill="currentColor"/>',
  },
];

export function getExercise(id: string | undefined): ExerciseDefinition | undefined {
  return EXERCISES.find((e) => e.id === id);
}

export function byCategory(cat: CategoryId): ExerciseDefinition[] {
  return EXERCISES.filter((e) => e.category === cat);
}

export function categoryMeta(cat: CategoryId): CategoryMeta {
  return CATEGORIES.find((c) => c.id === cat) ?? CATEGORIES[0];
}

/** Tagestraining: je eine Übung pro Bereich, täglich wechselnd. */
export function dailySet(date = new Date()): string[] {
  const day = Math.floor(new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() / 86400000);
  const ids: string[] = [];
  CATEGORIES.forEach((c, ci) => {
    const list = byCategory(c.id);
    if (list.length) ids.push(list[(day + ci) % list.length].id);
  });
  return ids;
}
