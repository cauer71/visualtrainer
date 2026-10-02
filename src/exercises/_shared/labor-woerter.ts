/**
 * Eigene Wortliste der Labor-Übungen (Prototyp lib/words.js): häufige deutsche Substantive für „Bewegte Ziele ordnen“
 * (`labor-ziele-ordnen`) und „Wörter bauen“ (`labor-woerter-bauen`). Rund 130 Wörter; bei häufigem Üben wiederholen sie sich.
 */
const ALL: string[] = [
  'Hut', 'Bus', 'Zug', 'Tür', 'Arm', 'Ohr', 'Eis', 'Ast', 'Mut', 'See', 'Tee', 'Bad', 'Bär', 'Reh', 'Tag', 'Uhr', 'Rad', 'Hof',
  'Haus', 'Baum', 'Buch', 'Hand', 'Wald', 'Brot', 'Mond', 'Berg', 'Wind', 'Lied', 'Kind', 'Wolf', 'Zahn', 'Tier', 'Dach', 'Gras', 'Herz', 'Nase', 'Feld', 'Tuch',
  'Tisch', 'Stuhl', 'Fisch', 'Fuchs', 'Lampe', 'Insel', 'Wiese', 'Blume', 'Apfel', 'Birne', 'Wolke', 'Stern', 'Regen', 'Sonne', 'Pferd', 'Katze', 'Tiger', 'Hemd', 'Kerze',
  'Wasser', 'Messer', 'Tasche', 'Löffel', 'Teller', 'Garten', 'Bruder', 'Schule', 'Mutter', 'Tomate', 'Banane', 'Pinsel', 'Hammer', 'Winter', 'Sommer', 'Kaffee', 'Kuchen', 'Brücke', 'Käfig',
  'Fenster', 'Gitarre', 'Fahrrad', 'Schüler', 'Spiegel', 'Teppich', 'Zitrone', 'Schrank', 'Elefant', 'Flasche', 'Zeitung', 'Bäcker', 'Fußball', 'Lehrerin',
  'Computer', 'Bäckerei', 'Kalender', 'Pinguine', 'Schnecke', 'Fernrohr', 'Rucksack', 'Kopfhörer', 'Erdbeere', 'Schaufel', 'Zahnarzt', 'Schalter', 'Wecker',
  'Kartoffel', 'Schlüssel', 'Schildkröte', 'Regenbogen', 'Schmetterling', 'Eichhörnchen',
];

/** Alle Wörter ohne Doppelte (Reihenfolge bleibt erhalten) */
export const WOERTER: readonly string[] = ALL.filter((w, i) => ALL.indexOf(w) === i);

export function woerterMitLaenge(n: number): string[] {
  return WOERTER.filter((w) => w.length === n);
}

function sortedLetters(w: string): string {
  return w.toLowerCase().split('').sort().join('');
}

/** Alle Wörter der Liste aus denselben Buchstaben (Anagramme, inklusive des Wortes selbst) */
export function anagrammeVon(w: string): string[] {
  const k = sortedLetters(w);
  return WOERTER.filter((x) => sortedLetters(x) === k);
}
