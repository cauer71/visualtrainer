/* Erzeugt docs/ANLEITUNGEN.md aus den in help/ hinterlegten Texten und den Übungsdefinitionen in ex/.
 * Aufruf: node tools/gen-docs.js        (schreibt die Datei)
 * Als Modul: require('./gen-docs.js').build() liefert den Text, ohne zu schreiben. Rein lokal, keine Netzwerkzugriffe. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const VT = require('../lib/core.js');
fs.readdirSync(path.join(root, 'ex')).filter(function (f) { return f.endsWith('.js'); }).sort().forEach(function (f) { require('../ex/' + f); });
fs.readdirSync(path.join(root, 'help')).filter(function (f) { return f.endsWith('.js'); }).sort().forEach(function (f) { require('../help/' + f); });

function list(items) { return items.map(function (t) { return '- ' + t; }).join('\n'); }
function olist(items) { return items.map(function (t, i) { return (i + 1) + '. ' + t; }).join('\n'); }
function cell(t) { return String(t).replace(/\|/g, '\\|').replace(/\n/g, ' '); }
function range(p) {
  if (p.type === 'select') return p.options.map(function (o) { return o.label; }).join(' / ');
  return p.min + ' bis ' + p.max + ' (Schritt ' + p.step + ')';
}
function defaultOf(p) {
  if (p.type === 'select') { const o = p.options.find(function (x) { return x.value === p.default; }); return o ? o.label : p.default; }
  return p.default;
}

function build() {
  const out = [];
  const g = VT.getGeneralHelp();
  out.push('# Anleitungen – Visual Trainer Labor');
  out.push('');
  out.push('Diese Datei wird mit `node tools/gen-docs.js` aus den Texten in `help/` erzeugt und nicht von Hand bearbeitet. Dieselben Texte erscheinen in der App unter „Hilfe“, in den Einstellungen jeder Übung und in der Ergebnisansicht.');
  out.push('');
  out.push('## Inhalt');
  out.push('');
  out.push('- [Allgemeine Anleitung](#' + 'allgemeine-anleitung' + ')');
  VT.list().forEach(function (ex, i) { out.push('- [' + (i + 1) + '. ' + ex.title + '](#ex-' + ex.id + ')'); });
  out.push('');
  out.push('## Übersicht der Übungen');
  out.push('');
  out.push('| Übung | Gruppe | Kurzbeschreibung |');
  out.push('|---|---|---|');
  VT.list().forEach(function (ex) { out.push('| ' + cell(ex.title) + ' | ' + cell(ex.group) + ' | ' + cell(ex.summary) + ' |'); });
  out.push('');

  out.push('## ' + g.title);
  g.sections.forEach(function (s) {
    out.push('');
    out.push('### ' + s.title);
    out.push('');
    (s.paragraphs || []).forEach(function (p) { out.push(p); out.push(''); });
    if (s.list) { out.push(list(s.list)); out.push(''); }
    if (s.glossary) { s.glossary.forEach(function (e) { out.push('- **' + e[0] + '**: ' + e[1]); }); out.push(''); }
  });

  VT.list().forEach(function (ex, i) {
    const h = VT.getHelp(ex.id);
    out.push('<a id="ex-' + ex.id + '"></a>');
    out.push('');
    out.push('## ' + (i + 1) + '. ' + ex.title);
    out.push('');
    out.push('*Gruppe: ' + ex.group + '*');
    out.push('');
    out.push('### Wofür die Übung gedacht ist'); out.push(''); out.push(h.purpose); out.push('');
    out.push('### Vorbereitung'); out.push(''); out.push(list(h.setup)); out.push('');
    out.push('### So läuft die Übung ab'); out.push(''); out.push(olist(h.steps)); out.push('');
    out.push('### Tipps'); out.push(''); out.push(list(h.tips)); out.push('');
    out.push('### Leichter und schwerer machen'); out.push(''); out.push(list(h.progression)); out.push('');
    out.push('### Hinweise zur Sicherheit'); out.push(''); out.push(list(h.cautions)); out.push('');
    out.push('### Hintergrund'); out.push(''); out.push(h.background); out.push('');
    if (h.references.length) {
      out.push('### Literatur'); out.push(''); out.push(list(h.references)); out.push('');
      out.push('*Die Literaturangaben stammen aus dem Gedächtnis des Autors und sollten vor einer Weitergabe geprüft werden.*'); out.push('');
    }
    out.push('### Einstellungen'); out.push('');
    out.push('| Einstellung | Wertebereich | Standard | Bedeutung |');
    out.push('|---|---|---|---|');
    ex.params.forEach(function (p) {
      out.push('| ' + cell(p.label) + ' | ' + cell(range(p)) + ' | ' + cell(defaultOf(p)) + ' | ' + cell(h.params[p.key]) + ' |');
    });
    out.push('');
    out.push('### Kennzahlen'); out.push('');
    out.push('| Kennzahl (Schlüssel) | Bedeutung |');
    out.push('|---|---|');
    ex.metricKeys.forEach(function (k) { out.push('| `' + k + '` | ' + cell(h.metrics[k]) + ' |'); });
    out.push('');
  });
  return out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n';
}

module.exports = { build: build };

if (require.main === module) {
  const target = path.join(root, 'docs', 'ANLEITUNGEN.md');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, build(), 'utf8');
  console.log('geschrieben: ' + path.relative(root, target) + ' (' + fs.statSync(target).size + ' Bytes)');
}
