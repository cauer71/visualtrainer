/**
 * Wortlisten für „Wörter bauen“ in beiden Sprachen.
 *
 * Deutsch: die gemeinsame Liste der Labor-Übungen (`_shared/labor-woerter.ts`, aus dem Prototyp lib/words.js).
 * Italienisch: eigene, kleine Liste kurzer, gängiger Hauptwörter ohne Akzente und Apostroph (3 bis 8 Buchstaben, je Länge mindestens
 * 11 Wörter). Sie wurde NICHT von Muttersprachlerinnen oder Muttersprachlern geprüft.
 * Die Sprache folgt der App-Sprache (`ctx.lang`).
 */
import { anagrammeVon as anagrammeDe, woerterMitLaenge as woerterDe } from '../_shared/labor-woerter';

const IT_LISTE: Record<number, string[]> = {
  3: ['uva', 'ape', 'oro', 'ago', 'oca', 'sci', 'gru', 'zoo', 'gas', 'bar', 'bus', 'ora', 'ala', 'sud'],
  4: ['casa', 'mare', 'luce', 'pane', 'vino', 'sole', 'luna', 'cane', 'mano', 'naso', 'dito', 'riso', 'lago', 'nave', 'erba', 'neve', 'orso', 'lupo', 'topo', 'pera', 'mela', 'muro', 'vela', 'ramo', 'nido'],
  5: ['gatto', 'fiore', 'tazza', 'ruota', 'sedia', 'tetto', 'porta', 'pesce', 'libro', 'penna', 'mondo', 'treno', 'scala', 'piede', 'pizza', 'torta', 'latte', 'campo', 'fiume', 'ponte'],
  6: ['nuvola', 'strada', 'giorno', 'scuola', 'albero', 'tavolo', 'cucina', 'frutta', 'banana', 'matita', 'limone', 'stella', 'chiave', 'gelato'],
  7: ['cavallo', 'cipolla', 'bottone', 'armadio', 'lettera', 'bambino', 'scimmia', 'sorella', 'formica', 'gallina', 'pallone', 'ragazzo', 'pioggia', 'camicia', 'uccello', 'cartone'],
  8: ['fratello', 'giardino', 'montagna', 'farfalla', 'pomodoro', 'finestra', 'ombrello', 'elefante', 'telefono', 'quaderno', 'computer', 'cappello', 'bandiera', 'giornale', 'pennello', 'biscotto'],
};

/** Alle italienischen Wörter ohne Doppelte */
export const WOERTER_IT: readonly string[] = Object.values(IT_LISTE)
  .flat()
  .filter((w, i, a) => a.indexOf(w) === i);

export type Sprache = 'de' | 'it';

/** Sprache der Wortliste aus der App-Sprache */
export const sprachOf = (lang: string): Sprache => (lang === 'it' ? 'it' : 'de');

/** Wörter der Sprache mit genau n Buchstaben */
export function woerterMitLaenge(sprache: Sprache, n: number): string[] {
  return sprache === 'it' ? WOERTER_IT.filter((w) => w.length === n) : woerterDe(n);
}

const sortiert = (w: string): string => w.toLowerCase().split('').sort().join('');

/** Alle Wörter der Liste aus denselben Buchstaben wie `w` (Anagramme, inklusive des Wortes selbst) */
export function anagrammeVon(sprache: Sprache, w: string): string[] {
  if (sprache === 'de') return anagrammeDe(w);
  const k = sortiert(w);
  return WOERTER_IT.filter((x) => sortiert(x) === k);
}
