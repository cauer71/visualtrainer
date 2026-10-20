/**
 * Suche im Übungskatalog: findet Einträge auch über Teile von Namen oder Beschreibung.
 *  - Groß-/Kleinschreibung, Akzente und Umlaute egal („ubung“, „uebung“ und „Übung“ treffen dasselbe),
 *  - Satzzeichen und Bindestriche zählen als Leerraum,
 *  - mehrere Suchwörter: jedes muss irgendwo vorkommen, in beliebiger Reihenfolge („kreis zahl“ findet „Zahlenkreisel“).
 */

/** Text für den Vergleich vereinheitlichen */
export function normalizeSearch(s: string): string {
  return s
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .replace(/ae/g, 'a')
    .replace(/oe/g, 'o')
    .replace(/ue/g, 'u')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

/** Suchwörter aus der Eingabe (leer = alles passt) */
export function searchTerms(query: string): string[] {
  const n = normalizeSearch(query);
  return n ? n.split(' ') : [];
}

/** Passt ein (bereits vereinheitlichter) Suchtext zu allen Suchwörtern? */
export function matchesTerms(haystack: string, terms: readonly string[]): boolean {
  return terms.every((t) => haystack.includes(t));
}

/** Bequem: roher Text und rohe Anfrage */
export function matchesQuery(text: string, query: string): boolean {
  return matchesTerms(normalizeSearch(text), searchTerms(query));
}
