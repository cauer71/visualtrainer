import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeSearch, searchTerms } from '../../src/ui/catalog-search';

describe('Katalogsuche', () => {
  it('findet Wortteile in Name und Beschreibung', () => {
    expect(matchesQuery('Zahlenkreisel – Zahlen auf Ringen', 'kreis')).toBe(true);
    expect(matchesQuery('Lichtreaktion – bei einem aufleuchtenden Licht tippen', 'leucht')).toBe(true);
    expect(matchesQuery('Lichtreaktion', 'xyz')).toBe(false);
  });
  it('mehrere Wörter in beliebiger Reihenfolge, alle müssen vorkommen', () => {
    expect(matchesQuery('Zahlenkreisel auf drehenden Ringen', 'ring zahl')).toBe(true);
    expect(matchesQuery('Zahlenkreisel auf drehenden Ringen', 'ring ball')).toBe(false);
  });
  it('Groß-/Kleinschreibung, Umlaute, Akzente und Satzzeichen egal', () => {
    expect(matchesQuery('Übung für Blicksprünge', 'UBUNG')).toBe(true);
    expect(matchesQuery('Übung für Blicksprünge', 'uebung blicksprunge')).toBe(true);
    expect(matchesQuery('Ziehen & Ablegen', 'ziehen-ablegen')).toBe(true);
    expect(matchesQuery('Velocità di reazione', 'velocita')).toBe(true);
    expect(matchesQuery('Fußball', 'fussball')).toBe(true);
  });
  it('leere Eingabe passt immer', () => {
    expect(searchTerms('   ')).toEqual([]);
    expect(matchesQuery('irgendwas', '')).toBe(true);
    expect(normalizeSearch('  A–B  ')).toBe('a b');
  });
});
