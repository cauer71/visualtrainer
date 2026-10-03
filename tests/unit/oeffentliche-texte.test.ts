import { describe, expect, it } from 'vitest';
import katalog from '../../docs/uebungskatalog/katalog.json';
import { publicBody, publicIndexItem } from '../../scripts/katalog-public.mjs';

/**
 * Die veröffentlichten Texte (Katalog, Hintergrund, Übungstexte) sollen aus Studien und Grundlagen hergeleitet gelesen werden:
 * keine Hinweise auf bestehende Webseiten, Programme oder interne Unterlagen.
 */
const raw = (m: Record<string, unknown>) => m as Record<string, string>;
// Beschreibungen und Texte der App als Rohtext einlesen (ohne Node-Typen)
const docs = raw(import.meta.glob('../../docs/uebungskatalog/uebungen/*.md', { query: '?raw', import: 'default', eager: true }));
const sources = raw(
  import.meta.glob(['../../src/exercises/*/texts.ts', '../../src/exercises/*/science.ts', '../../src/content/science.ts', '../../src/i18n/ui.ts', '../../src/i18n/optiker.ts'], {
    query: '?raw',
    import: 'default',
    eager: true,
  }),
);

// Bezeichnungen, die in veröffentlichten Texten nicht vorkommen dürfen
const FORBIDDEN: [string, RegExp][] = [
  ['Vorlage-Website', /skilldrills|skill drills/i],
  ['Original/Originalspiel', /\boriginal(e|s|en|em|er)?\b|\bim original\b/i],
  ['Website/Webseite/Seitentext', /\bwebsite\b|\bwebseite\b|\bseitentext\b|\bseitentitel\b|\bsito web\b|\bpagina web\b/i],
  ['Prototyp', /\bprototyp\w*\b|\bprototipo\b/i],
  ['Programm-/Seitennamen', /light reaction|entropic grid|vivid visions|youtube|whatsapp|aim ?lab|lumosity|cogmed|brainhq|pointer ?lock/i],
  ['Auftraggeber', /\bauftraggeber\w*\b/i],
  ['interne Unterlagen', /\bVTC\b|mirante|\bcorso n\b/i],
  ['Hinweis auf Analyse des Codes', /ausgelieferte[nrs]? (spiel|code)|spiel-chunk|\[code\]/i],
  ['Verweis auf Abschnittsnummern der Arbeitsfassung', /\babschnitt \d+\b|\b§\s?\d+\b/i],
];

function scan(label: string, text: string): string[] {
  const hits: string[] = [];
  for (const [what, re] of FORBIDDEN) {
    const all = [...text.matchAll(new RegExp(re.source, re.flags.includes('g') ? re.flags : `${re.flags}g`))];
    for (const m of all) {
      const i = m.index ?? 0;
      hits.push(`${label}: ${what} → „…${text.slice(Math.max(0, i - 40), i + 60).replace(/\s+/g, ' ')}…“`);
    }
  }
  return hits;
}

describe('Übungskatalog (öffentliche Fassung)', () => {
  const cat = katalog as unknown as { uebungen: Record<string, any>[] };
  const bodyOf = (datei: string) => docs[`../../docs/uebungskatalog/${datei}`] ?? '';
  it('Beschreibungstexte enthalten keine Bezüge auf Vorlagen', () => {
    const bad: string[] = [];
    for (const m of cat.uebungen) {
      const body = publicBody(bodyOf(m.datei));
      bad.push(...scan(String(m.nr), body));
    }
    expect(bad, bad.join('\n')).toEqual([]);
  });
  it('Übersicht (Name, Kurzbeschreibung, Listen) enthält keine Bezüge auf Vorlagen', () => {
    const bad: string[] = [];
    for (const m of cat.uebungen) bad.push(...scan(`${m.nr} index`, JSON.stringify(publicIndexItem(m))));
    expect(bad, bad.join('\n')).toEqual([]);
  });
});

describe('Übersicht: Eingabe und Tablet', () => {
  it('alle Einträge sind per Touch am Tablet spielbar', () => {
    const cat = katalog as unknown as { uebungen: Record<string, any>[] };
    for (const m of cat.uebungen) {
      const i = publicIndexItem(m);
      expect(i.tablet, String(m.nr)).toBe('ja');
      expect(i.eingabe, String(m.nr)).toContain('touch');
    }
  });
});

describe('Übungstexte und Hintergrund', () => {
  it('sichtbare Texte (ohne Kommentare) enthalten keine Bezüge auf Vorlagen', () => {
    const bad: string[] = [];
    for (const [f, src] of Object.entries(sources)) {
      // Kommentarzeilen (// … und Blockkommentare) sind keine sichtbaren Texte
      const text = src
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .split('\n')
        .filter((l) => !/^\s*\/\//.test(l))
        .join('\n');
      bad.push(...scan(f.replace('../../', ''), text));
    }
    expect(bad, bad.join('\n')).toEqual([]);
  });
});
