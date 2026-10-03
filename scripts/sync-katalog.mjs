// Bereitet den Übungskatalog (docs/uebungskatalog) für die Webseite auf:
//  - public/katalog/index.json   schlanke Übersicht (ohne lange Texte)
//  - public/katalog/uebungen/    die ausführlichen Beschreibungen (Markdown), erst bei Bedarf geladen
// katalog.json wird mit `python3 docs/uebungskatalog/build.py` erzeugt und ist eingecheckt.
import fs from 'node:fs';
import path from 'node:path';
import { publicBody, publicIndexItem } from './katalog-public.mjs';

const root = path.resolve(import.meta.dirname, '..');
const src = path.join(root, 'docs/uebungskatalog');
const out = path.join(root, 'public/katalog');
const cat = JSON.parse(fs.readFileSync(path.join(src, 'katalog.json'), 'utf8'));

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'uebungen'), { recursive: true });

const items = cat.uebungen.map(publicIndexItem);
fs.writeFileSync(path.join(out, 'index.json'), JSON.stringify({ stand: cat.stand, anzahl: items.length, items }));

let n = 0;
for (const m of cat.uebungen) {
  const file = path.join(src, m.datei);
  let text = fs.readFileSync(file, 'utf8');
  text = publicBody(text); // ohne YAML-Kopf und ohne die Arbeitsabschnitte zu den Vorlagen
  fs.writeFileSync(path.join(out, 'uebungen', `${m.nr}.md`), text);
  n++;
}
console.log(`Katalog: ${items.length} Einträge, ${n} Texte → public/katalog`);
