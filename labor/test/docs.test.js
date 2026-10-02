// Stellt sicher, dass jede Übung vollständig dokumentiert ist: Anleitung, jede Einstellung, jede Kennzahl.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const VT = require('../lib/core.js');

const root = path.join(__dirname, '..');
fs.readdirSync(path.join(root, 'ex')).filter(function (f) { return f.endsWith('.js'); }).forEach(function (f) { require('../ex/' + f); });
fs.readdirSync(path.join(root, 'help')).filter(function (f) { return f.endsWith('.js'); }).forEach(function (f) { require('../help/' + f); });

const exercises = VT.list();

test('Es gibt Übungen, und jede hat eine Anleitung', function () {
  assert.ok(exercises.length >= 14, 'Übungen: ' + exercises.length);
  exercises.forEach(function (ex) { assert.ok(VT.getHelp(ex.id), 'Anleitung fehlt: ' + ex.id); });
});

test('Alle Anleitungsabschnitte sind vorhanden und ausführlich genug', function () {
  exercises.forEach(function (ex) {
    const h = VT.getHelp(ex.id);
    assert.ok(h.purpose.length >= 120, ex.id + ' purpose');
    assert.ok(h.background.length >= 150, ex.id + ' background');
    [['setup', 2], ['steps', 4], ['tips', 4], ['progression', 3], ['cautions', 2]].forEach(function (e) {
      assert.ok(Array.isArray(h[e[0]]) && h[e[0]].length >= e[1], ex.id + ' ' + e[0]);
      h[e[0]].forEach(function (t) { assert.ok(typeof t === 'string' && t.length >= 25, ex.id + ' ' + e[0] + ': ' + t); });
    });
    assert.ok(Array.isArray(h.references), ex.id + ' references');
  });
});

test('Jede Einstellung hat einen Hilfetext, und es gibt keine verwaisten', function () {
  exercises.forEach(function (ex) {
    const h = VT.getHelp(ex.id);
    const keys = ex.params.map(function (p) { return p.key; });
    keys.forEach(function (k) {
      assert.ok(h.params[k] && h.params[k].length >= 25, ex.id + ' Einstellung ' + k);
    });
    Object.keys(h.params).forEach(function (k) { assert.ok(keys.indexOf(k) >= 0, ex.id + ' verwaister Hilfetext ' + k); });
    assert.equal(new Set(keys).size, keys.length, ex.id + ' doppelte Einstellung');
  });
});

test('Jede Kennzahl hat eine Erklärung, und es gibt keine verwaisten', function () {
  exercises.forEach(function (ex) {
    const h = VT.getHelp(ex.id);
    assert.ok(Array.isArray(ex.metricKeys) && ex.metricKeys.length > 0, ex.id + ' metricKeys');
    assert.equal(new Set(ex.metricKeys).size, ex.metricKeys.length, ex.id + ' doppelte Kennzahl');
    ex.metricKeys.forEach(function (k) { assert.ok(h.metrics[k] && h.metrics[k].length >= 20, ex.id + ' Kennzahl ' + k); });
    Object.keys(h.metrics).forEach(function (k) { assert.ok(ex.metricKeys.indexOf(k) >= 0, ex.id + ' verwaiste Erklärung ' + k); });
    assert.ok(ex.headline && ex.headline.length >= 1, ex.id + ' headline');
    ex.headline.forEach(function (k) { assert.ok(ex.metricKeys.indexOf(k) >= 0, ex.id + ' headline ' + k); });
  });
});

test('Übungen haben Titel, Gruppe, Zusammenfassung; Auswahl-Einstellungen haben gültige Standardwerte', function () {
  exercises.forEach(function (ex) {
    assert.ok(ex.title && ex.group && ex.summary && ex.summary.length > 20, ex.id);
    ex.params.forEach(function (p) {
      assert.ok(p.label && p.label.length > 3, ex.id + '.' + p.key + ' Beschriftung');
      if (p.type === 'select') {
        assert.ok(p.options.length >= 2, ex.id + '.' + p.key);
        assert.ok(p.options.some(function (o) { return o.value === p.default; }), ex.id + '.' + p.key + ' Standardwert');
        p.options.forEach(function (o) { assert.ok(o.label, ex.id + '.' + p.key + ' Option'); });
      } else {
        assert.equal(p.type, 'number', ex.id + '.' + p.key);
        assert.ok(p.min <= p.default && p.default <= p.max, ex.id + '.' + p.key + ' Standardwert im Bereich');
        assert.ok(p.step > 0, ex.id + '.' + p.key + ' Schritt');
      }
    });
    assert.deepEqual(VT.sanitizeParams(ex, VT.defaultsOf(ex)), VT.defaultsOf(ex), ex.id + ' Standardwerte unverändert');
  });
});

test('Allgemeine Hilfe: alle Abschnitte und ein Glossar', function () {
  const g = VT.getGeneralHelp();
  assert.ok(g && g.sections.length >= 8);
  const ids = g.sections.map(function (s) { return s.id; });
  ['zweck', 'aufbau', 'kalibrierung', 'ablauf', 'training', 'ergebnisse', 'messgenauigkeit', 'sicherheit', 'datenschutz', 'glossar'].forEach(function (id) {
    assert.ok(ids.indexOf(id) >= 0, 'Abschnitt ' + id);
  });
  g.sections.forEach(function (s) { assert.ok(s.title && (s.paragraphs || s.list || s.glossary), s.id); });
  const gl = g.sections.find(function (s) { return s.id === 'glossar'; }).glossary;
  assert.ok(gl.length >= 10);
  gl.forEach(function (e) { assert.ok(e[0] && e[1].length > 20); });
});

test('Texte: keine doppelten Leerzeichen, keine Platzhalter, deutsche Anführungszeichen', function () {
  const bad = [];
  function check(where, t) {
    if (typeof t !== 'string') return;
    if (/\s{2,}/.test(t)) bad.push(where + ': doppelte Leerzeichen');
    if (/TODO|FIXME|lorem|xxx/i.test(t)) bad.push(where + ': Platzhalter');
    if (/"/.test(t)) bad.push(where + ': gerades Anführungszeichen');
  }
  exercises.forEach(function (ex) {
    const h = VT.getHelp(ex.id);
    Object.keys(h).forEach(function (k) {
      const v = h[k];
      if (typeof v === 'string') check(ex.id + '.' + k, v);
      else if (Array.isArray(v)) v.forEach(function (t, i) { check(ex.id + '.' + k + '[' + i + ']', t); });
      else if (v && typeof v === 'object') Object.keys(v).forEach(function (kk) { check(ex.id + '.' + k + '.' + kk, v[kk]); });
    });
  });
  assert.deepEqual(bad, []);
});

test('docs/ANLEITUNGEN.md ist aktuell (mit node tools/gen-docs.js neu erzeugen, falls nicht)', function () {
  const built = require('../tools/gen-docs.js').build();
  const file = fs.readFileSync(path.join(root, 'docs', 'ANLEITUNGEN.md'), 'utf8').replace(/\r\n/g, '\n');
  assert.equal(file, built);
});
