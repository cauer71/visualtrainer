/**
 * Gemeinsame Prüfungen der Texte und Quellen der Anaglyphen-Übungen mit Trainer-Regler (Fusion, Tiefe sehen): DE/IT-Schlüssel,
 * Kennzahlen erklärt, Einstellungen beschriftet, Rechtsregeln (kein Test/Befund/Normwert, why-Ende), Sicherheitshinweise,
 * Quellen. Aufruf innerhalb eines `describe`-Blocks der jeweiligen Übung.
 */
import { expect, it } from 'vitest';
import type { ExerciseDefinition } from '../../src/core/types';
import type { ScienceEntry } from '../../src/content/science';
import { leaves, legalProblems } from './_labor-sim';

export interface TextCheckOpts {
  def: ExerciseDefinition;
  science: ScienceEntry;
  /** Kennzahlen, die die Übung als Metric oder in Tabellen nutzt (metrics und metricHints müssen genau diese Schlüssel haben) */
  metricKeys: readonly string[];
  tipKeys: readonly string[];
  /** zusätzliche Wörter, die in den Texten nicht vorkommen dürfen */
  extraBad?: RegExp;
  /** DOIs, die bestätigt sind (Crossref und PubMed), und in `science.sources` genau so vorkommen müssen */
  verifiedDois: readonly string[];
}

export function textChecks(o: TextCheckOpts): void {
  const { def, science } = o;
  const de = def.texts.de;
  const itT = def.texts.it;

  it('DE und IT haben dieselben Schlüssel (auch in params, metricHints, liveLabels; Listen gleich lang)', () => {
    expect(leaves(itT).sort()).toEqual(leaves(de).sort());
    expect(itT.progression?.length).toBe(de.progression?.length);
    expect(itT.cautions?.length).toBe(de.cautions?.length);
    expect(itT.steps.length).toBe(de.steps.length);
    expect(itT.goodFor.length).toBe(de.goodFor.length);
  });

  it('alle Kennzahlen sind in metrics und metricHints erklärt', () => {
    for (const t of [de, itT]) {
      expect(Object.keys(t.metricHints ?? {}).sort()).toEqual([...o.metricKeys].sort());
      expect(Object.keys(t.metrics).sort()).toEqual([...o.metricKeys].sort());
      for (const k of o.metricKeys) {
        expect(t.metrics[k], k).toBeTruthy();
        expect(t.metricHints?.[k]?.length, k).toBeGreaterThan(20);
      }
    }
  });

  it('jede Einstellung hat Beschriftung und Erklärung, jede Auswahl Namen für alle Werte, Zahlen eine Kurzform mit {v} oder Einheit', () => {
    for (const t of [de, itT]) {
      for (const d of def.params ?? []) {
        const p = t.params?.[d.key];
        expect(p?.label, d.key).toBeTruthy();
        expect(p?.hint?.length, d.key).toBeGreaterThan(20);
        if (d.type === 'select') for (const op of d.options) expect(p?.options?.[op], `${d.key}.${op}`).toBeTruthy();
        if (p?.short) expect(p.short, d.key).toContain('{v}');
      }
      expect(Object.keys(t.params ?? {}).sort()).toEqual((def.params ?? []).map((d) => d.key).sort());
    }
  });

  it('alle Tipps, die tipFor liefern kann, sind vorhanden', () => {
    for (const t of [de, itT]) {
      expect(Object.keys(t.tips).sort()).toEqual([...o.tipKeys].sort());
      for (const k of o.tipKeys) expect(t.tips[k]?.length, k).toBeGreaterThan(20);
    }
  });

  it('Rechtsregeln: why endet mit „nicht belegt“, keine Wirk-/Heil-/Sicherheitsversprechen, kein Test/Befund/Normwert, keine verbotenen Bezeichnungen', () => {
    expect(de.why.trim()).toMatch(/nicht belegt\.$/);
    expect(itT.why.trim()).toMatch(/non è dimostrato che .*\.$/i);
    expect(legalProblems(de, 'de')).toEqual([]);
    expect(legalProblems(itT, 'it')).toEqual([]);
    for (const lang of ['de', 'it'] as const) {
      for (const [label, value] of [['texts', def.texts[lang]], ['science', science.texts[lang]]] as const) {
        const all = JSON.stringify(value).toLowerCase();
        expect(all, `${lang} ${label}`).not.toMatch(/vtc|corso|mirante|unicista|istituto|\bkurs\b|folie|prototyp|prototipo|original|website|vorlage|programmname/);
        expect(all, `${lang} ${label}`).not.toMatch(/diagnos|heilt|guarisce|sicherer im|più sicuro|besseres sehen|trainiert deine augenmuskeln/);
        // „keine Normwerte“ darf nur im Hintergrundtext stehen (als ausdrückliche Verneinung), nie in den Übungstexten
        if (label === 'texts') expect(all, `${lang} ${label}`).not.toMatch(/normwert|valori normali|valore normale/);
        expect(all, `${lang} ${label}`).not.toMatch(/unterdrück|sopprim|fusionsbreite|fusional(e)? width|typischerweise|tipicamente|misst die|misura la/);
        expect(all, `${lang} ${label}`).not.toMatch(/\btests?\b|\btesten\b/);
        if (o.extraBad) expect(all, `${lang} ${label}`).not.toMatch(o.extraBad);
      }
    }
  });

  it('Sicherheitshinweise in „Gut zu wissen“: Farbsehschwäche (Birch), Doppelbilder/Schwindel/Kopfschmerz (Muchnick, S. 6 und 28), Fachperson, Pausen, Abstand, Raum abdunkeln, Überbrille, Trainer-Regler', () => {
    const all = de.cautions!.join(' ');
    expect(de.cautions![0]).toMatch(/Rot-Grün-Farbsehschwäche/);
    expect(de.cautions![0]).toMatch(/8 von 100 Männern/);
    expect(de.cautions![0]).toMatch(/4 von 1000 Frauen/);
    expect(de.cautions![0]).toMatch(/Birch, 2012/);
    expect(de.cautions![0]).toMatch(/nicht geeignet/);
    expect(de.cautions![1]).toMatch(/Schielen|Doppelbilder/);
    expect(de.cautions![1]).toMatch(/Schwindel/);
    expect(de.cautions![1]).toMatch(/Kopf/);
    expect(de.cautions![1]).toMatch(/Muchnick, 2008, S\. 6 und 28/);
    expect(all).toMatch(/Absprache mit der behandelnden Fachperson/);
    expect(all).toMatch(/Pausen/);
    expect(all).toMatch(/40 cm/);
    expect(all).toMatch(/dunkel|gedämpft/i);
    expect(all).toMatch(/Überbrille/);
    expect(all).toMatch(/Trainer-Regler/);
    expect(all).toMatch(/sofort zurücknehmen und Pause/);
    const iall = itT.cautions!.join(' ');
    expect(itT.cautions![0]).toMatch(/Birch, 2012/);
    expect(itT.cautions![1]).toMatch(/Muchnick, 2008, p\. 6 e 28/);
    expect(iall).toMatch(/specialista che ti segue/);
    expect(iall).toMatch(/occhiali da sovrapporre/);
    expect(iall).toMatch(/riduci subito e fai una pausa/);
  });

  it('Farbe nie allein: Hinweis, dass die Bedienung ohne Farbe auskommt; Aufgabe selbst farbbasiert', () => {
    expect(de.cautions!.join(' ')).toMatch(/Bedienung/);
    expect(de.cautions!.join(' ')).toMatch(/Farben Rot und Grün/);
    expect(itT.cautions!.join(' ')).toMatch(/colori rosso e verde/);
  });

  it('Bildunterschriften ≤ 42 Zeichen, Schritte ≤ 60, tagline ≤ 80', () => {
    for (const t of [de, itT]) {
      for (const c of Object.values(t.captions)) expect(c.length, c).toBeLessThanOrEqual(42);
      for (const s of t.steps) expect(s.length, s).toBeLessThanOrEqual(60);
      expect(t.tagline.length).toBeLessThanOrEqual(80);
    }
  });

  it('science.ts: Eintrag stimmt mit der Übung überein, ≥ 3 Quellen (nur doi.org oder openlibrary.org/isbn), nur bestätigte DOIs, Texte in beiden Sprachen', () => {
    expect(science.id).toBe(def.id);
    expect(science.evidence).toBe('weak');
    expect(science.sources.length).toBeGreaterThanOrEqual(3);
    const urls = new Set<string>();
    for (const s of science.sources) {
      expect(s.url).toMatch(/^https:\/\/(doi\.org\/10\.\d{4,9}\/\S+|openlibrary\.org\/isbn\/\d{10,13})$/);
      expect(s.label.length).toBeGreaterThan(20);
      expect(urls.has(s.url), s.url).toBe(false);
      urls.add(s.url);
    }
    const doi = science.sources.filter((s) => s.url.startsWith('https://doi.org/')).map((s) => s.url.replace('https://doi.org/', ''));
    expect(doi.sort()).toEqual([...o.verifiedDois].sort());
    expect(science.sources.some((s) => s.url === 'https://openlibrary.org/isbn/9780323029612')).toBe(true);
    for (const lang of ['de', 'it'] as const) for (const k of ['trains', 'daily', 'research', 'improved'] as const) expect(science.texts[lang][k].length).toBeGreaterThan(20);
    expect(science.texts.de.daily).toMatch(/nicht belegt\.$/);
    expect(science.texts.it.daily).toMatch(/non è dimostrato\.$/);
    expect(science.texts.de.research).toMatch(/Für Menschen ohne Befund ist für diese Übung kein Nutzen belegt/);
    expect(science.texts.de.research).toMatch(/Für genau diese Übung gibt es keine Studie/);
    expect(science.texts.de.research).toMatch(/nicht durch Studien belegt/);
    expect(science.texts.de.research).toMatch(/nicht belegt\.$/);
    expect(science.texts.it.research).toMatch(/non è dimostrata alcuna utilità/);
    expect(science.texts.it.research).toMatch(/non è dimostrata\.$/);
  });
}
