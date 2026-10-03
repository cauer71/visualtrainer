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
import { sanfteBlickfolge } from './sanfte-blickfolge';
import { zickzackBahn } from './zickzack-bahn';
import { dreiecksbahn } from './dreiecksbahn';
import { ausweichziel } from './ausweichziel';
import { sprungziel } from './sprungziel';
import { landepunkt } from './landepunkt';
import { zieleAbraeumen } from './ziele-abraeumen';
import { pendelFang } from './pendel-fang';
import { hinterDerDeckung } from './hinter-der-deckung';
import { schwarmWechsel } from './schwarm-wechsel';
import { randPing } from './rand-ping';
import { tippTempo } from './tipp-tempo';
import { wortliste } from './wortliste';
import { ruhigeHand } from './ruhige-hand';
import { spurFolgen } from './spur-folgen';
import { wortstrom } from './wortstrom';
import { abprallFang } from './abprall-fang';
import { dunkelphasen } from './dunkelphasen';
import { tempoWechsel } from './tempo-wechsel';
import { nachziehSpur } from './nachzieh-spur';
import { hoehenwechselBahn } from './hoehenwechsel-bahn';
import { richtungschaos } from './richtungschaos';
import { flickZiele } from './flick-ziele';
import { sofortReaktion } from './sofort-reaktion';
import { gegenhalten } from './gegenhalten';
import { seitwaertsFolgen } from './seitwaerts-folgen';
import { randzielFlick } from './randziel-flick';
import { kurvenbahnFolgen } from './kurvenbahn-folgen';
import { mikrokorrektur } from './mikrokorrektur';
import { zielauswahl } from './zielauswahl';
import { winkelHalten } from './winkel-halten';
import { ausweichFolgen } from './ausweich-folgen';
import { zickzackFolgen } from './zickzack-folgen';
import { glattFolgen } from './glatt-folgen';
import { hochRunterFolgen } from './hoch-runter-folgen';
import { zielKlicken } from './ziel-klicken';
import { tastenWahl } from './tasten-wahl';
import { praezisionsFlick } from './praezisions-flick';
import { zielkette } from './zielkette';
import { randabwehr } from './randabwehr';
import { kugelnFangen } from './kugeln-fangen';
import { ausweichen } from './ausweichen';
import { schrumpfendeZiele } from './schrumpfende-ziele';
import { inDieBahn } from './in-die-bahn';
import { rasterAusweichen } from './raster-ausweichen';
import { sprossenLeiter } from './sprossen-leiter';
import { gegenDenWind } from './gegen-den-wind';
import { sprungAbfangen } from './sprung-abfangen';
import { diagonalKorridor } from './diagonal-korridor';
import { musterNachzeichnen } from './muster-nachzeichnen';
import { richtungWort } from './richtung-wort';
import { seiteErkennen } from './seite-erkennen';
import { zahlBuchstabeWirbel } from './zahl-buchstabe-wirbel';
import { vierZieleWechsel } from './vier-ziele-wechsel';
import { pendelball } from './pendelball';
import { laborSpotTouch } from './labor-spot-touch';
import { laborZieleOrdnen } from './labor-ziele-ordnen';
import { laborWahlreaktion } from './labor-wahlreaktion';
import { laborStartZiel } from './labor-start-ziel';
import { laborBlitzErkennung } from './labor-blitz-erkennung';
import { laborPeripheresErkennen } from './labor-peripheres-erkennen';
import { laborDoppelaufgabe } from './labor-doppelaufgabe';

import { laborZielVerfolgen } from './labor-ziel-verfolgen';
import { laborTaktSakkaden } from './labor-takt-sakkaden';
import { laborBuchstabentafel } from './labor-buchstabentafel';

import { laborSequenzGedaechtnis } from './labor-sequenz-gedaechtnis';
import { laborWoerterBauen } from './labor-woerter-bauen';
import { laborZeichenFinden } from './labor-zeichen-finden';
import { laborMentaleRotation } from './labor-mentale-rotation';
import { laborRotGruenLesen } from './labor-rot-gruen-lesen';
import { laborFusion } from './labor-fusion';
import { laborStereo } from './labor-stereo';

import { laborRichtungen } from './labor-richtungen';
import { laborOrientierung } from './labor-orientierung';
import { laborBalanceTouch } from './labor-balance-touch';
import { laborSlalom } from './labor-slalom';
import { laborInvasoren } from './labor-invasoren';

import { laborHess } from './labor-hess';
import { laborWorth } from './labor-worth';
import { laborSchober } from './labor-schober';
import { laborDiplopie } from './labor-diplopie';
import { laborVertikale } from './labor-vertikale';
import { laborProjektion } from './labor-projektion';

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
  sanfteBlickfolge,
  zickzackBahn,
  dreiecksbahn,
  ausweichziel,
  sprungziel,
  landepunkt,
  zieleAbraeumen,
  pendelFang,
  hinterDerDeckung,
  schwarmWechsel,
  randPing,
  tippTempo,
  wortliste,
  ruhigeHand,
  spurFolgen,
  wortstrom,
  abprallFang,
  dunkelphasen,
  tempoWechsel,
  nachziehSpur,
  hoehenwechselBahn,
  richtungschaos,
  flickZiele,
  sofortReaktion,
  gegenhalten,
  seitwaertsFolgen,
  randzielFlick,
  kurvenbahnFolgen,
  mikrokorrektur,
  zielauswahl,
  winkelHalten,
  ausweichFolgen,
  zickzackFolgen,
  glattFolgen,
  hochRunterFolgen,
  zielKlicken,
  tastenWahl,
  praezisionsFlick,
  zielkette,
  randabwehr,
  kugelnFangen,
  ausweichen,
  schrumpfendeZiele,
  inDieBahn,
  rasterAusweichen,
  sprossenLeiter,
  gegenDenWind,
  sprungAbfangen,
  diagonalKorridor,
  musterNachzeichnen,
  richtungWort,
  seiteErkennen,
  zahlBuchstabeWirbel,
  vierZieleWechsel,
  pendelball,
  laborSpotTouch,
  laborZieleOrdnen,
  laborWahlreaktion,
  laborStartZiel,
  laborBlitzErkennung,
  laborPeripheresErkennen,
  laborDoppelaufgabe,
  laborZielVerfolgen,
  laborTaktSakkaden,
  laborBuchstabentafel,
  laborSequenzGedaechtnis,
  laborWoerterBauen,
  laborZeichenFinden,
  laborMentaleRotation,
  laborRotGruenLesen,
  laborFusion,
  laborStereo,

  laborRichtungen,
  laborOrientierung,
  laborBalanceTouch,
  laborSlalom,
  laborInvasoren,

  laborHess,
  laborWorth,
  laborSchober,
  laborDiplopie,
  laborVertikale,
  laborProjektion,
];

/** Marke der Labor-Übungen (cm/Sehwinkel, Einstellungen, Kalibrierung); sie stehen nicht im Tagestraining */
export const TAG_LABOR = 'labor';

export function hasTag(def: Pick<ExerciseDefinition, 'tags'>, tag: string): boolean {
  return !!def.tags?.includes(tag);
}

/** Alle Übungen mit einer Marke (Reihenfolge wie in `EXERCISES`) */
export function byTag(tag: string): ExerciseDefinition[] {
  return EXERCISES.filter((e) => hasTag(e, tag));
}

/** Filter der Optiker-Ansicht: alle, nur Labor oder ohne Labor */
export type TagFilter = 'all' | 'labor' | 'nolabor';

export function matchesTagFilter(def: Pick<ExerciseDefinition, 'tags'>, filter: TagFilter): boolean {
  if (filter === 'labor') return hasTag(def, TAG_LABOR);
  if (filter === 'nolabor') return !hasTag(def, TAG_LABOR);
  return true;
}

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

/**
 * Tagestraining: je eine Übung pro Bereich, täglich wechselnd. Labor-Übungen sind nie dabei: sie brauchen
 * Einstellungen und Kalibrierung und sind für die Optiker-Ansicht gedacht.
 */
export function dailySet(date = new Date()): string[] {
  const day = Math.floor(new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() / 86400000);
  const ids: string[] = [];
  CATEGORIES.forEach((c, ci) => {
    const list = byCategory(c.id).filter((e) => !hasTag(e, TAG_LABOR));
    if (list.length) ids.push(list[(day + ci) % list.length].id);
  });
  return ids;
}
