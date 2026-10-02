// Wächter-Test: Der Quellcode darf keine Netzwerkfunktionen oder Fremd-URLs enthalten.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const files = [];
(function walk(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(function (d) {
    if (d.name === 'test' || d.name === 'node_modules' || d.name.startsWith('.')) return;
    const p = path.join(dir, d.name);
    if (d.isDirectory()) walk(p);
    else if (/\.(js|html|css)$/.test(d.name)) files.push(p);
  });
}(root));

const FORBIDDEN = [
  /fetch\s*\(/, /XMLHttpRequest/, /WebSocket/, /EventSource/, /sendBeacon/, /importScripts/,
  /\bimport\s*\(/, /require\s*\(\s*['"](?:http|https|net|dgram|tls|child_process|dns)['"]/,
  /navigator\.serviceWorker/, /\beval\s*\(/, /new\s+Function\s*\(/, /document\.write/,
  /https?:\/\//i, /\/\/cdn\./i, /@import/
];

test('Es gibt Dateien zu prüfen', function () {
  assert.ok(files.length >= 7, 'gefunden: ' + files.length);
});

test('Kein Netzwerkcode und keine Fremd-URLs im Quellcode', function () {
  const hits = [];
  files.forEach(function (f) {
    const text = fs.readFileSync(f, 'utf8');
    FORBIDDEN.forEach(function (re) { if (re.test(text)) hits.push(path.relative(root, f) + ' -> ' + re); });
  });
  assert.deepEqual(hits, []);
});

test('index.html: Sicherheitsregel sperrt Verbindungen, nur lokale Skripte und Styles', function () {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.match(html, /Content-Security-Policy[^>]*connect-src 'none'/);
  const srcs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(function (m) { return m[1]; });
  assert.ok(srcs.length > 0);
  srcs.forEach(function (s) { assert.ok(!/^[a-z][a-z0-9+.-]*:|^\/\//i.test(s), 'externe Referenz: ' + s); });
});

test('Kein Code liest innerHTML/outerHTML/insertAdjacentHTML', function () {
  files.filter(function (f) { return f.endsWith('.js'); }).forEach(function (f) {
    const text = fs.readFileSync(f, 'utf8');
    assert.ok(!/\.(inner|outer)HTML|insertAdjacentHTML/.test(text), path.relative(root, f));
  });
});
