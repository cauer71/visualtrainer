// Öffentliche Fassung des Übungskatalogs: Index und Beschreibungstexte für die Webseite.
// Die Dateien in docs/uebungskatalog sind Arbeitsunterlagen (mit Prüfvermerken zu Vorlagen und Fundstellen);
// veröffentlicht werden nur die fachlichen Abschnitte (Grundlagen, Studienlage, Auswahlhinweise) und das Literaturverzeichnis.

/** Abschnitte der Arbeitsfassung, die nicht veröffentlicht werden (Analyse und Bewertung der Vorlagen) */
const DROP_HEADING = /(Original|Website|Quelle sagt|Quellen sagen|Schwächen|Herleitung|Mechanik aus dem Code)/;

const CITE_CUT = ' – **Prüfung:**';
const NOT_SUPPORTED = /stützt[^:\n]*:\*\*\s*(nein|keine)\b/;

/** Literaturverzeichnis: ein Eintrag je Quelle, ohne Prüfvermerke; Einträge, die keine Aussage stützen, entfallen. */
function publicSources(section) {
  const items = [];
  let cur = null;
  for (const line of section.split('\n').slice(1)) {
    if (/^###\s/.test(line)) continue;
    if (/^- /.test(line)) {
      if (cur) items.push(cur);
      cur = line;
    } else if (cur !== null && line.trim() !== '') cur += ' ' + line.trim();
  }
  if (cur) items.push(cur);
  const seen = new Set();
  const out = [];
  for (let it of items) {
    if (NOT_SUPPORTED.test(it)) continue;
    const cut = it.indexOf(CITE_CUT);
    if (cut >= 0) it = it.slice(0, cut);
    it = it.replace(/^- Nur im Text genannt: /, '- ');
    const key = it.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 60);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(it);
  }
  return out;
}

/** Beschreibung (Markdown ohne YAML-Kopf) → öffentliche Fassung */
export function publicBody(md) {
  const text = md.replace(/^---\n[\s\S]*?\n---\n/, '').replace(/^> Original:.*(?:\n>.*)*\n?/gm, '');
  const parts = text.split(/(?=^## )/m);
  const out = [];
  for (const p of parts) {
    const head = p.split('\n', 1)[0];
    if (!head.startsWith('## ')) {
      out.push(p);
      continue;
    }
    if (DROP_HEADING.test(head)) continue;
    if (/Quellen\s*$/.test(head)) {
      out.push(`${head}\n\n${publicSources(p).join('\n')}\n`);
      continue;
    }
    out.push(p.replace(/Auswahlhinweise für die KI/, 'Auswahlhinweise'));
  }
  // Abschnitte werden nicht nummeriert, weil in der Arbeitsfassung Abschnitte entfallen
  return out.join('').replace(/^## \d+\. /gm, '## ');
}

/** Eintrag der Übersicht (public/katalog/index.json) */
export function publicIndexItem(m) {
  return {
    nr: m.nr,
    name: m.name,
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
    blickfit: m.blickfit_umsetzung ? (m.blickfit_umsetzung.kennung ?? null) : null,
  };
}
