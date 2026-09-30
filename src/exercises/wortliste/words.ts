/**
 * Wortlisten für „Wortliste“ – getrennt für Deutsch und Italienisch.
 *
 * Auswahlregeln (Katalog 606, Abschnitt 10; Hulme et al. 1997, Fliessbach et al. 2006):
 * - häufige, kurze (höchstens 9 Buchstaben), konkrete und eindeutige Hauptwörter (kein Doppelsinn wie „Schloss“ oder „porta“),
 * - keine Fremdwörter, keine Zahlwörter, nichts Belastendes,
 * - keine ähnlich klingenden Paare innerhalb einer Liste: Editierabstand ≥ 2 (kein „Hund/Mund“, „pane/cane“)
 *   und keine gemeinsame Endung von 3 Buchstaben bei Wörtern ab 4 Buchstaben (kein „Hase/Nase“, „Tasche/Flasche“).
 *   Das prüft tests/unit/wortliste-logic.test.ts.
 */

export const WORDS_DE: readonly string[] = [
  'Haus', 'Tisch', 'Stuhl', 'Bett', 'Buch', 'Brot', 'Milch', 'Apfel',
  'Baum', 'Blume', 'Hund', 'Katze', 'Pferd', 'Vogel', 'Kopf', 'Auge',
  'Nase', 'Straße', 'Schule', 'Garten', 'Wasser', 'Feuer', 'Sonne', 'Mond',
  'Stern', 'Regen', 'Schnee', 'Wolke', 'Berg', 'Wald', 'Meer', 'Fluss',
  'Brücke', 'Turm', 'Kirche', 'Fenster', 'Dach', 'Uhr', 'Schuh', 'Hose',
  'Schlüssel', 'Lampe', 'Kerze', 'Teller', 'Gabel', 'Glas', 'Korb', 'Kiste',
  'Eimer', 'Besen', 'Seife', 'Schere', 'Seil', 'Nadel', 'Faden', 'Ring',
  'Papier', 'Brief', 'Zucker', 'Salz', 'Suppe', 'Kuchen', 'Wurst', 'Honig',
  'Birne', 'Gurke', 'Pilz', 'Traube', 'Möhre', 'Bohne', 'Mehl', 'Kuh',
  'Schaf', 'Ziege', 'Schwein', 'Fuchs', 'Ente', 'Gans', 'Ameise', 'Käfer',
  'Bär', 'Wolf', 'Reh', 'Huhn', 'Schwan', 'Affe', 'Storch', 'Spatz',
  'Rabe', 'Löwe', 'Zahn', 'Knie', 'Finger', 'Daumen', 'Rücken', 'Haar',
  'Zunge', 'Wiese', 'Tal', 'Strand', 'Eis', 'Wind', 'Tulpe', 'Ast',
  'Wurzel', 'Moos', 'Teppich', 'Schrank', 'Ofen', 'Becher', 'Regal', 'Zeitung',
  'Bild', 'Geld', 'Münze', 'Kleid', 'Mantel', 'Brille', 'Hut', 'Dorf',
  'Stadt', 'Schiff', 'Rad', 'Trommel', 'Geige', 'Flöte', 'Markt', 'Mann',
  'Frau', 'Koch', 'Arzt', 'Lehrer', 'Onkel', 'Oma',
];

export const WORDS_IT: readonly string[] = [
  'casa', 'tavolo', 'sedia', 'libro', 'pane', 'latte', 'mela', 'albero',
  'fiore', 'gatto', 'cavallo', 'pesce', 'mano', 'testa', 'occhio', 'naso',
  'strada', 'scuola', 'giardino', 'acqua', 'fuoco', 'sole', 'luna', 'stella',
  'pioggia', 'neve', 'monte', 'bosco', 'mare', 'fiume', 'sasso', 'barca',
  'treno', 'torre', 'chiesa', 'finestra', 'orologio', 'scarpa', 'borsa', 'chiave',
  'tazza', 'cucchiaio', 'forchetta', 'bottiglia', 'cesto', 'scopa', 'sapone', 'forbici',
  'chiodo', 'corda', 'ago', 'filo', 'matita', 'zuppa', 'torta', 'miele',
  'pera', 'uva', 'noce', 'carota', 'fungo', 'farina', 'uovo', 'mucca',
  'pecora', 'capra', 'maiale', 'volpe', 'topo', 'oca', 'colomba', 'rana',
  'ape', 'formica', 'lumaca', 'scarabeo', 'aquila', 'gufo', 'orso', 'lupo',
  'cervo', 'cigno', 'scimmia', 'cicogna', 'pancia', 'dito', 'schiena', 'braccio',
  'piede', 'erba', 'prato', 'valle', 'sabbia', 'vento', 'abete', 'cespuglio',
  'ramo', 'radice', 'muro', 'tappeto', 'armadio', 'forno', 'bicchiere', 'denaro',
  'moneta', 'calza', 'gonna', 'cintura', 'occhiali', 'pantaloni', 'paese', 'flauto',
  'medico', 'maestro', 'zio', 'nonno', 'cielo', 'unghia', 'pepe', 'burro',
  'sacco', 'pettine', 'tartaruga', 'mosca', 'zanzara', 'polpo', 'onda', 'riva',
  'deserto', 'spiga', 'tuono', 'alba', 'ragazzo',
];
