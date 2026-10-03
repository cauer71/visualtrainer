import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
// @ts-expect-error – .mjs ohne Typen, siehe katalog-public.d.mts
import { publicBody, publicIndexItem } from '../../scripts/katalog-public.mjs';

/**
 * Die veröffentlichten Texte (Katalog, Hintergrund, Übungstexte) sollen aus Studien und Grundlagen hergeleitet gelesen werden:
 * keine Hinweise auf bestehende Webseiten, Programme oder interne Unterlagen.
 */
const root = path.resolve(__dirname, '../..');

// Bezeichnungen, die in veröffentlichten Texten nicht vorkommen dürfen
const FORBIDDEN: [string, RegExp][] = [
  ['Vorlage-Website', /skilldrills|skill drills/i],
  ['Original/Originalspiel', /\boriginal(e|s|en|em|er)?\b|\bim original\b/i],
  ['Website/Webseite/Seitentext', /\bwebsite\b|\bwebseite\b|\bseitentext\b|\bseitentitel\b|\bsito web\b|\bpagina web\b/i],
  ['Prototyp', /\bprototyp\w*\b|\bprototipo\b/i],
  ['Programm-/Seitennamen', /light reaction|entropic grid|vivid visions|youtube|whatsapp|aim ?lab|lumosity|cogmed|brainhq/i],
  ['Auftraggeber', /\bauftraggeber\w*\b/i],
  ['interne Unterlagen', /\bVTC\b|mirante|\bcorso n\b/i],
  ['Hinweis auf Analyse des Codes', /ausgelieferte[nrs]? (spiel|code)|spiel-chunk|\[code\]/i],
  ['Verweis auf Abschnittsnummern der Arbeitsfassung', /\babschnitt \d+\b|\b§\s?\d+\b/i],
];

function scan(label: string, text: string): string[] {
  const hits: string[] = [];
  for (const [what, re] of FORBIDDEN) {
    const m = text.match(re);
    if (m) {
      const i = text.search(re);
      hits.push(`${label}: ${what} → „…${text.slice(Math.max(0, i - 40), i + 60).replace(/\s+/g, ' ')}…“`);
    }
  }
  return hits;
}

describe('Übungskatalog (öffentliche Fassung)', () => {
  const cat = JSON.parse(fs.readFileSync(path.join(root, 'docs/uebungskatalog/katalog.json'), 'utf8')) as { uebungen: Record<string, any>[] };
  it('Beschreibungstexte enthalten keine Bezüge auf Vorlagen', () => {
    const bad: string[] = [];
    for (const m of cat.uebungen) {
      const body = publicBody(fs.readFileSync(path.join(root, 'docs/uebungskatalog', m.datei), 'utf8')) as string;
      bad.push(...scan(String(m.nr), body));
    }
    expect(bad, bad.slice(0, 40).join('\n')).toEqual([]);
  });
  it('Übersicht (Name, Kurzbeschreibung, Listen) enthält keine Bezüge auf Vorlagen', () => {
    const bad: string[] = [];
    for (const m of cat.uebungen) bad.push(...scan(`${m.nr} index`, JSON.stringify(publicIndexItem(m))));
    expect(bad, bad.slice(0, 40).join('\n')).toEqual([]);
  });
});

describe('Übungstexte und Hintergrund', () => {
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (/(^|\/)(texts|science)\.ts$/.test(p) || p.endsWith('src/content/science.ts') || p.endsWith('src/i18n/ui.ts') || p.endsWith('src/i18n/optiker.ts')) files.push(p);
    }
  };
  walk(path.join(root, 'src'));
  it('sichtbare Texte (ohne Kommentare) enthalten keine Bezüge auf Vorlagen', () => {
    const bad: string[] = [];
    for (const f of files) {
      // Kommentarzeilen (// … und Blockkommentare) sind keine sichtbaren Texte
      const text = fs
        .readFileSync(f, 'utf8')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .split('\n')
        .filter((l) => !/^\s*\/\//.test(l))
        .join('\n');
      bad.push(...scan(path.relative(root, f), text));
    }
    expect(bad, bad.slice(0, 60).join('\n')).toEqual([]);
  });
});
