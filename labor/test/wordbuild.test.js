const test = require('node:test');
const assert = require('node:assert/strict');
const VT = require('../lib/core.js');
const wb = require('../ex/wordbuild.js');
const { WordSession } = wb;

function make(over, seed) {
  const p = VT.sanitizeParams(wb, Object.assign(VT.defaultsOf(wb), over || {}));
  return new WordSession(p, { rng: VT.makeRng(seed || 1) });
}
/** Setzt das aktuelle Wort richtig zusammen (Kachelindizes in Wortreihenfolge). */
function solve(s, now) {
  const used = new Set();
  let res = null;
  s.target.split('').forEach(function (ch) {
    const i = s.tiles.findIndex(function (t, idx) { return t.ch === ch && !used.has(idx); });
    used.add(i);
    res = s.place(i, now);
  });
  return res;
}

test('Wortliste: eindeutig, jede Länge von 3 bis 8 mit genug Wörtern', function () {
  assert.equal(new Set(VT.words.all).size, VT.words.all.length);
  for (let n = 3; n <= 8; n++) assert.ok(VT.words.byLength(n).length >= 8, 'Länge ' + n + ': ' + VT.words.byLength(n).length);
  VT.words.all.forEach(function (w) { assert.ok(/^[A-ZÄÖÜ][a-zäöüß]+$/.test(w), w); });
  assert.deepEqual(VT.words.anagramsOf('Rad'), ['Rad']);
});

test('Wörter: gewünschte Länge, Anzahl, ohne Wiederholung solange möglich', function () {
  const s = make({ wordLength: 5, words: 8 }, 3);
  assert.equal(s.words.length, 8);
  s.words.forEach(function (w) { assert.equal(w.length, 5); });
  assert.equal(new Set(s.words).size, 8);
  const many = make({ wordLength: 8, words: 30 }, 3);
  assert.equal(many.words.length, 30);
});

test('Kacheln sind durchmischt und enthalten genau die Buchstaben', function () {
  for (let seed = 1; seed < 30; seed++) {
    const s = make({ wordLength: 6 }, seed);
    const letters = s.tiles.map(function (t) { return t.ch; });
    assert.equal(letters.slice().sort().join(''), s.target.split('').sort().join(''));
    assert.notEqual(letters.join(''), s.target);
  }
});

test('Richtig zusammensetzen löst das Wort und geht zum nächsten', function () {
  const s = make({ wordLength: 4, words: 3 }, 5);
  s.start(0);
  const first = s.target;
  const res = solve(s, 2500);
  assert.equal(res.type, 'solved');
  assert.equal(s.trials[0].word, first);
  assert.equal(s.trials[0].ms, 2500);
  assert.equal(s.idx, 1);
  assert.equal(s.slots.length, 0);
  assert.ok(s.tiles.every(function (t) { return !t.used; }));
});

test('Falsches Wort: Fehler, Kacheln zurück, Wort bleibt', function () {
  const s = make({ wordLength: 5, words: 3 }, 8);
  s.start(0);
  const target = s.target;
  // absichtlich falsche Reihenfolge: tippe Kacheln in Kachelreihenfolge, bis es nicht das Wort ist
  let tries = 0;
  let res;
  do {
    s.tiles.forEach(function (_, i) { res = s.place(i, 1000); });
    tries++;
  } while (res.type !== 'wrong' && tries < 3);
  assert.equal(res.type, 'wrong');
  assert.equal(s.errors, 1);
  assert.equal(s.target, target);
  assert.equal(s.slots.length, 0);
});

test('Zurücknehmen und doppeltes Antippen', function () {
  const s = make({ wordLength: 4 }, 1);
  s.start(0);
  assert.equal(s.place(0, 10).type, 'placed');
  assert.equal(s.place(0, 11), null, 'Kachel schon benutzt');
  assert.equal(s.removeLast().type, 'removed');
  assert.equal(s.tiles[0].used, false);
  assert.equal(s.removeLast(), null);
  assert.equal(s.place(99, 12), null);
});

test('Ende nach allen Wörtern; Kennzahlen', function () {
  const s = make({ wordLength: 3, words: 3 }, 2);
  s.start(0);
  solve(s, 2000);
  solve(s, 5000);
  const r = solve(s, 6000);
  assert.equal(r.type, 'finished');
  assert.ok(s.finished);
  const sum = s.summary();
  const get = function (k) { return sum.metrics.find(function (m) { return m.key === k; }).value; };
  assert.equal(get('solved'), 3);
  assert.equal(get('errors'), 0);
  assert.equal(get('t_mean'), 2000);
  assert.equal(get('t_median'), 2000);
  assert.equal(get('total'), 6);
  assert.equal(get('lpm'), 90);
  assert.equal(s.place(0, 7000), null);
  sum.metrics.forEach(function (m) { assert.ok(wb.metricKeys.indexOf(m.key) >= 0, m.key); });
});
