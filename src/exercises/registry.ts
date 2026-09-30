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
import { leuchtfolge } from './leuchtfolge';
import { zahlenspanne } from './zahlenspanne';
import { rastermuster } from './rastermuster';
import { rueckblick } from './rueckblick';
import { woWarEs } from './wo-war-es';
import { leuchtpfad } from './leuchtpfad';
import { liegendeAcht } from './liegende-acht';
import { wellenbahn } from './wellenbahn';
import { zweiZiele } from './zwei-ziele';
import { sekundenGefuehl } from './sekunden-gefuehl';
import { blicksprungGalerie } from './blicksprung-galerie';
import { fuenfTueren } from './fuenf-tueren';
import { fallendeZiele } from './fallende-ziele';
import { hellsteKugel } from './hellste-kugel';
import { ziehenAblegen } from './ziehen-ablegen';

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
  leuchtfolge,
  zahlenspanne,
  rastermuster,
  rueckblick,
  woWarEs,
  leuchtpfad,
  liegendeAcht,
  wellenbahn,
  zweiZiele,
  sekundenGefuehl,
  blicksprungGalerie,
  fuenfTueren,
  fallendeZiele,
  hellsteKugel,
  ziehenAblegen,
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
  {
    id: 'gedaechtnis',
    color: '#2F8F83',
    soft: '#E6F4F2',
    icon: '<rect x="8" y="8" width="13" height="13" rx="3" fill="currentColor"/><rect x="27" y="8" width="13" height="13" rx="3" fill="none" stroke="currentColor" stroke-width="3.5"/><rect x="8" y="27" width="13" height="13" rx="3" fill="none" stroke="currentColor" stroke-width="3.5"/><rect x="27" y="27" width="13" height="13" rx="3" fill="currentColor"/>',
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
