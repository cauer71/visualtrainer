import { describe, expect, it } from 'vitest';
import { CATEGORIES, dailySet, EXERCISES } from '../../src/exercises/registry';

describe('registry', () => {
  it('hat eindeutige IDs und vollständige Texte in beiden Sprachen', () => {
    const ids = new Set<string>();
    for (const ex of EXERCISES) {
      expect(ids.has(ex.id)).toBe(false);
      ids.add(ex.id);
      expect(ex.id).toMatch(/^[a-z0-9-]+$/);
      for (const lang of ['de', 'it'] as const) {
        const t = ex.texts[lang];
        expect(t.title.length).toBeGreaterThan(1);
        expect(t.tagline.length).toBeGreaterThan(5);
        expect(t.steps.length).toBeGreaterThanOrEqual(1);
      }
      // gleiche Schlüssel in de und it
      for (const key of ['captions', 'metrics', 'tips', 'feedback'] as const) {
        expect(Object.keys(ex.texts.it[key]).sort()).toEqual(Object.keys(ex.texts.de[key]).sort());
      }
    }
  });

  it('Tagestraining: eine Übung je Bereich, wechselt täglich', () => {
    const d1 = dailySet(new Date(2026, 8, 29));
    const d2 = dailySet(new Date(2026, 8, 30));
    expect(d1.length).toBe(CATEGORIES.length);
    expect(d1).not.toEqual(d2);
  });
});
