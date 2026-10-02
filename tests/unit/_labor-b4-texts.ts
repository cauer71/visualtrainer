/**
 * Gemeinsame Textprüfungen der Labor-Übungen (aus tests/unit/labor-spot-touch-sim.test.ts): gleiche Schlüssel in DE und IT,
 * vollständige Kennzahlen- und Einstellungstexte, Rechtsregeln, Quellenliste.
 */
import { expect } from 'vitest';
import type { ExerciseTexts, ParamDef } from '../../src/core/types';
import { leaves } from './_labor-b4-sim';

/** DE und IT haben dieselben Schlüssel und gleich lange Listen */
export function expectSameKeys(de: ExerciseTexts, it: ExerciseTexts): void {
  expect(leaves(it).sort()).toEqual(leaves(de).sort());
  expect(it.progression?.length).toBe(de.progression?.length);
  expect(it.cautions?.length).toBe(de.cautions?.length);
  expect(it.steps.length).toBe(de.steps.length);
  expect(it.goodFor.length).toBe(de.goodFor.length);
}

/** Alle Kennzahlen mit Label und Erklärung, jede Einstellung mit Beschriftung und Erklärung, Auswahlen mit Namen */
export function expectComplete(texts: ExerciseTexts[], params: readonly ParamDef[], metricKeys: string[], tipKeys: string[]): void {
  for (const t of texts) {
    for (const k of metricKeys) {
      expect(t.metrics[k], k).toBeTruthy();
      expect(t.metricHints?.[k]?.length, k).toBeGreaterThan(20);
    }
    expect(Object.keys(t.metricHints ?? {}).sort()).toEqual([...metricKeys].sort());
    for (const d of params) {
      const p = t.params?.[d.key];
      expect(p?.label, d.key).toBeTruthy();
      expect(p?.hint?.length, d.key).toBeGreaterThan(20);
      if (d.type === 'select') for (const o of d.options) expect(p?.options?.[o], `${d.key}.${o}`).toBeTruthy();
    }
    expect(Object.keys(t.params ?? {}).sort()).toEqual(params.map((d) => d.key).sort());
    for (const k of tipKeys) expect(t.tips[k], k).toBeTruthy();
    expect(t.progression?.length).toBeGreaterThan(0);
    expect(t.cautions?.length).toBeGreaterThan(0);
  }
}

/** Rechtsregeln: why endet mit „nicht belegt“, keine Wirk-/Heil-/Sicherheitsversprechen, kein Test/Diagnose/Normwert; kurze Texte */
export function expectLegal(de: ExerciseTexts, it: ExerciseTexts): void {
  expect(de.why.trim()).toMatch(/nicht belegt\.$/);
  expect(it.why.trim()).toMatch(/non è dimostrato che .*\.$/i);
  const all = (t: ExerciseTexts) => JSON.stringify(t).toLowerCase();
  for (const bad of ['diagnos', 'normwert', 'heilt', 'heilung', 'sicherer im', 'besseres sehen', 'trainiert deine augenmuskeln', 'sehkraft', 'bestanden']) {
    expect(all(de), bad).not.toContain(bad);
  }
  expect(all(de)).not.toMatch(/\btest(en|s)?\b/);
  expect(all(it)).not.toMatch(/\btest\b/);
  expect(all(it)).not.toMatch(/diagnos|valori normali|valore normale|guarisce/);
  for (const t of [de, it]) {
    for (const c of Object.values(t.captions)) expect(c.length).toBeLessThanOrEqual(42);
    for (const s of t.steps) expect(s.length).toBeLessThanOrEqual(60);
    expect(t.tagline.length).toBeLessThanOrEqual(80);
  }
}

interface ScienceLike {
  id: string;
  sources: { label: string; url: string }[];
  texts: Record<'de' | 'it', Record<'trains' | 'daily' | 'research' | 'improved', string>>;
}

/** ≥ 3 Quellen, nur geprüfte DOIs (Liste `verified`), Texte in beiden Sprachen */
export function expectScience(science: ScienceLike, id: string, verified: string[]): void {
  expect(science.id).toBe(id);
  expect(science.sources.length).toBeGreaterThanOrEqual(3);
  const urls = new Set<string>();
  for (const s of science.sources) {
    expect(s.url).toMatch(/^https:\/\/doi\.org\/10\.\d{4,9}\/\S+$/);
    expect(s.label.length).toBeGreaterThan(20);
    expect(urls.has(s.url), s.url).toBe(false);
    urls.add(s.url);
  }
  for (const lang of ['de', 'it'] as const) for (const k of ['trains', 'daily', 'research', 'improved'] as const) expect(science.texts[lang][k].length).toBeGreaterThan(20);
  expect(science.texts.de.daily).toMatch(/nicht belegt\.$/);
  expect(science.texts.it.daily).toMatch(/non è dimostrato/i);
  expect(science.sources.map((s) => s.url.replace('https://doi.org/', '')).sort()).toEqual([...verified].sort());
}
