// Bereitet den Übungskatalog (docs/uebungskatalog) für die Webseite auf:
//  - public/katalog/index.json   schlanke Übersicht (ohne lange Texte)
//  - public/katalog/uebungen/    die ausführlichen Beschreibungen (Markdown), erst bei Bedarf geladen
// katalog.json wird mit `python3 docs/uebungskatalog/build.py` erzeugt und ist eingecheckt.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const src = path.join(root, 'docs/uebungskatalog');
const out = path.join(root, 'public/katalog');
const cat = JSON.parse(fs.readFileSync(path.join(src, 'katalog.json'), 'utf8'));

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'uebungen'), { recursive: true });

const pick = (m) => ({
  nr: m.nr,
  name: m.name,
  nameOriginal: m.name_original,
  kapitel: m.kapitel,
  kurz: m.kurzbeschreibung,
  ziel: m.ziel_funktionen,
  tablet: m.tablet_geeignet,
  eingabe: m.eingabe,
  dauer: m.dauer_sekunden ?? null,
  evidenz: m.evidenz,
  vorsicht: m.vorsicht_bei ?? [],
  profil: m.anforderungsprofil,
  belastung: m.belastung,
  geeignet: m.geeignet_fuer ?? [],
  weniger: m.weniger_geeignet_fuer ?? [],
  aehnlich: m.aehnliche_uebungen ?? [],
  blickfit: m.blickfit_umsetzung ? m.blickfit_umsetzung.kennung ?? null : null,
  quelle: m.quelle_url || null,
});
const items = cat.uebungen.map(pick);
fs.writeFileSync(path.join(out, 'index.json'), JSON.stringify({ stand: cat.stand, anzahl: items.length, items }));

let n = 0;
for (const m of cat.uebungen) {
  const file = path.join(src, m.datei);
  let text = fs.readFileSync(file, 'utf8');
  text = text.replace(/^---\n[\s\S]*?\n---\n/, ''); // YAML-Kopf steht schon im Index
  fs.writeFileSync(path.join(out, 'uebungen', `${m.nr}.md`), text);
  n++;
}
console.log(`Katalog: ${items.length} Einträge, ${n} Texte → public/katalog`);
