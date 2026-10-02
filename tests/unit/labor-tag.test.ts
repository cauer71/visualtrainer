/**
 * Marke „labor“: Registry-Helfer, Filter „Alle · Labor · Ohne Labor“ (inkl. URL-Parameter und sessionStorage),
 * Tagestraining ohne Labor-Übungen.
 */
import { describe, expect, it } from 'vitest';
import { byCategory, byTag, CATEGORIES, dailySet, EXERCISES, getExercise, hasTag, matchesTagFilter, TAG_LABOR } from '../../src/exercises/registry';
import { parseTagFilter, readStoredTagFilter, storeTagFilter, tagFromUrl } from '../../src/ui/tag-filter';

describe('Marke und Registry-Helfer', () => {
  it('Spot-Touch trägt die Marke labor; bestehende Übungen nicht', () => {
    const spot = getExercise('labor-spot-touch')!;
    expect(spot.tags).toEqual(['labor']);
    expect(hasTag(spot, 'labor')).toBe(true);
    expect(hasTag(spot, TAG_LABOR)).toBe(true);
    expect(hasTag(spot, 'anderes')).toBe(false);
    expect(hasTag(getExercise('blitzreaktion')!, 'labor')).toBe(false);
    expect(hasTag({}, 'labor')).toBe(false);
    expect(hasTag({ tags: [] }, 'labor')).toBe(false);
  });

  it('byTag liefert nur markierte Übungen in Registry-Reihenfolge', () => {
    const labor = byTag('labor');
    expect(labor.map((e) => e.id)).toContain('labor-spot-touch');
    expect(labor.every((e) => e.tags?.includes('labor'))).toBe(true);
    expect(labor.length).toBe(EXERCISES.filter((e) => e.tags?.includes('labor')).length);
    expect(byTag('gibt-es-nicht')).toEqual([]);
  });

  it('Filter: alle / nur Labor / ohne Labor', () => {
    const all = EXERCISES.filter((e) => matchesTagFilter(e, 'all'));
    const labor = EXERCISES.filter((e) => matchesTagFilter(e, 'labor'));
    const without = EXERCISES.filter((e) => matchesTagFilter(e, 'nolabor'));
    expect(all.length).toBe(EXERCISES.length);
    expect(labor.length + without.length).toBe(EXERCISES.length);
    expect(labor.map((e) => e.id)).toEqual(byTag('labor').map((e) => e.id));
    expect(without.some((e) => e.id === 'labor-spot-touch')).toBe(false);
    expect(without.some((e) => e.id === 'zielfang')).toBe(true);
  });

  it('Labor-Übungen sind in bestehende Kategorien einsortiert', () => {
    const cats = new Set(CATEGORIES.map((c) => c.id));
    for (const e of byTag('labor')) expect(cats.has(e.category), e.id).toBe(true);
    expect(getExercise('labor-spot-touch')!.category).toBe('reaktion');
    expect(byCategory('reaktion').some((e) => e.id === 'labor-spot-touch')).toBe(true);
  });
});

describe('Tagestraining ohne Labor-Übungen', () => {
  it('dailySet wählt an keinem Tag des Jahres eine Labor-Übung, je Bereich genau eine Übung', () => {
    const laborIds = new Set(byTag('labor').map((e) => e.id));
    const seen = new Set<string>();
    for (let i = 0; i < 400; i++) {
      const d = new Date(2026, 0, 1 + i);
      const ids = dailySet(d);
      expect(ids.length).toBe(CATEGORIES.length);
      for (const id of ids) {
        expect(laborIds.has(id), `${d.toDateString()} ${id}`).toBe(false);
        seen.add(id);
      }
      // je Bereich eine Übung
      expect(new Set(ids.map((id) => getExercise(id)!.category)).size).toBe(CATEGORIES.length);
    }
    expect(seen.size).toBeGreaterThan(20);
  });

  it('die bisherige Auswahl bleibt unverändert (Labor-Übungen stehen am Ende der Liste und fallen heraus)', () => {
    // Referenz: gleiche Rechnung ohne Labor-Übungen
    const ref = (date: Date): string[] => {
      const day = Math.floor(new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() / 86400000);
      const out: string[] = [];
      CATEGORIES.forEach((c, ci) => {
        const list = EXERCISES.filter((e) => e.category === c.id && !e.tags?.includes('labor'));
        if (list.length) out.push(list[(day + ci) % list.length].id);
      });
      return out;
    };
    for (let i = 0; i < 60; i++) {
      const d = new Date(2026, 8, 1 + i);
      expect(dailySet(d)).toEqual(ref(d));
    }
  });
});

describe('Filter-Wahl: URL-Parameter und sessionStorage', () => {
  it('?tag=labor setzt den Filter (Hash-Query und Query der Seite), Hash hat Vorrang', () => {
    expect(parseTagFilter('labor')).toBe('labor');
    expect(parseTagFilter('LABOR')).toBe('labor');
    expect(parseTagFilter('nolabor')).toBe('nolabor');
    expect(parseTagFilter('ohne-labor')).toBe('nolabor');
    expect(parseTagFilter('all')).toBe('all');
    expect(parseTagFilter('alle')).toBe('all');
    expect(parseTagFilter('quatsch')).toBeNull();
    expect(parseTagFilter('')).toBeNull();
    expect(parseTagFilter(null)).toBeNull();
    expect(parseTagFilter(undefined)).toBeNull();
    expect(tagFromUrl(new URLSearchParams('tag=labor'), '')).toBe('labor');
    expect(tagFromUrl(new URLSearchParams(''), '?quick=1&tag=labor')).toBe('labor');
    expect(tagFromUrl(new URLSearchParams('tag=nolabor'), '?tag=labor')).toBe('nolabor');
    expect(tagFromUrl(new URLSearchParams('tag=x'), '?tag=y')).toBeNull();
    expect(tagFromUrl(new URLSearchParams(''), '')).toBeNull();
  });

  it('Wahl wird in sessionStorage gemerkt; ohne Speicher oder mit Unsinn: „Alle“', () => {
    const mem: Record<string, string> = {};
    const store = { getItem: (k: string) => mem[k] ?? null, setItem: (k: string, v: string) => void (mem[k] = v) };
    expect(readStoredTagFilter(store)).toBe('all');
    storeTagFilter('labor', store);
    expect(readStoredTagFilter(store)).toBe('labor');
    storeTagFilter('nolabor', store);
    expect(readStoredTagFilter(store)).toBe('nolabor');
    for (const k of Object.keys(mem)) mem[k] = 'kaputt';
    expect(readStoredTagFilter(store)).toBe('all');
    expect(readStoredTagFilter(null)).toBe('all');
    const locked = {
      getItem: () => {
        throw new Error('gesperrt');
      },
      setItem: () => {
        throw new Error('gesperrt');
      },
    };
    expect(readStoredTagFilter(locked)).toBe('all');
    expect(() => storeTagFilter('labor', locked)).not.toThrow();
    expect(() => storeTagFilter('labor', null)).not.toThrow();
  });
});
