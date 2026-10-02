/* Eigene Wortliste (häufige deutsche Substantive) für Wort- und Ordnungsübungen. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('./core.js') : root.VT;
  const api = factory();
  VT.words = api;
  if (isNode) module.exports = api;
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const ALL = [
    'Hut', 'Bus', 'Zug', 'Tür', 'Arm', 'Ohr', 'Eis', 'Ast', 'Mut', 'See', 'Tee', 'Bad', 'Bär', 'Reh', 'Tag', 'Uhr', 'Rad', 'Hof',
    'Haus', 'Baum', 'Buch', 'Hand', 'Wald', 'Brot', 'Mond', 'Berg', 'Wind', 'Lied', 'Kind', 'Wolf', 'Zahn', 'Tier', 'Dach', 'Gras', 'Herz', 'Nase', 'Feld', 'Tuch',
    'Tisch', 'Stuhl', 'Fisch', 'Fuchs', 'Lampe', 'Insel', 'Wiese', 'Blume', 'Apfel', 'Birne', 'Wolke', 'Stern', 'Regen', 'Sonne', 'Pferd', 'Katze', 'Tiger', 'Hemd', 'Kerze',
    'Wasser', 'Messer', 'Tasche', 'Löffel', 'Teller', 'Garten', 'Bruder', 'Schule', 'Mutter', 'Tomate', 'Banane', 'Pinsel', 'Hammer', 'Winter', 'Sommer', 'Kaffee', 'Kuchen', 'Brücke', 'Käfig',
    'Fenster', 'Gitarre', 'Fahrrad', 'Schüler', 'Spiegel', 'Teppich', 'Zitrone', 'Schrank', 'Elefant', 'Flasche', 'Zeitung', 'Bäcker', 'Fußball', 'Lehrerin',
    'Computer', 'Bäckerei', 'Kalender', 'Pinguine', 'Schnecke', 'Fernrohr', 'Rucksack', 'Kopfhörer', 'Erdbeere', 'Schaufel', 'Zahnarzt', 'Schalter', 'Wecker',
    'Kartoffel', 'Schlüssel', 'Schildkröte', 'Regenbogen', 'Schmetterling', 'Eichhörnchen'
  ];

  // Doppelte entfernen (Reihenfolge bleibt erhalten)
  const unique = ALL.filter(function (w, i) { return ALL.indexOf(w) === i; });

  function byLength(n) { return unique.filter(function (w) { return w.length === n; }); }
  function sortedLetters(w) { return w.toLowerCase().split('').sort().join(''); }
  /** Alle Wörter der Liste, die aus denselben Buchstaben bestehen (Anagramme, inkl. des Wortes selbst). */
  function anagramsOf(w) {
    const k = sortedLetters(w);
    return unique.filter(function (x) { return sortedLetters(x) === k; });
  }

  return { all: unique, byLength: byLength, anagramsOf: anagramsOf };
}));
