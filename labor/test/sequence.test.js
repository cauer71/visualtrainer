const test = require('node:test');
const assert = require('node:assert/strict');
const VT = require('../lib/core.js');
const seq = require('../ex/sequence.js');
const { SequenceGame } = seq;

function make(over, seed) {
  const p = VT.sanitizeParams(seq, Object.assign(VT.defaultsOf(seq), over || {}));
  const g = new SequenceGame(p, VT.makeRng(seed || 1));
  g.begin(0);
  return g;
}
function playRound(g, now, wrongAt) {
  g.newRound();
  g.beginInput(now);
  let last = null;
  for (let i = 0; i < g.seq.length; i++) {
    const cell = (i === wrongAt) ? (g.seq[i] + 1) % g.cells : g.seq[i];
    last = g.input(cell, now + 300 * (i + 1));
    if (last.result === 'error') break;
  }
  return last;
}

test('Folge hat die verlangte Länge, nie dasselbe Feld direkt hintereinander', function () {
  const g = make({ rows: 3, cols: 3, startLength: 8 }, 5);
  for (let k = 0; k < 50; k++) {
    const s = g.randomSeq(12);
    assert.equal(s.length, 12);
    for (let i = 1; i < s.length; i++) assert.notEqual(s[i], s[i - 1]);
    assert.ok(s.every(function (c) { return c >= 0 && c < 9; }));
  }
});

test('Zeitplan der Anzeige', function () {
  const g = make({ showMs: 600, gapMs: 200, startLength: 3 });
  g.newRound();
  const sch = g.showSchedule();
  assert.equal(sch.steps.length, 3);
  assert.deepEqual(sch.steps.map(function (s) { return [s.onAt, s.offAt]; }), [[0, 600], [800, 1400], [1600, 2200]]);
  assert.equal(sch.totalMs, 2400);
  assert.deepEqual(sch.steps.map(function (s) { return s.cell; }), g.seq);
});

test('Eingabe nur in der Eingabephase', function () {
  const g = make({});
  assert.equal(g.input(0, 10), null);
  g.newRound();
  assert.equal(g.input(0, 10), null, 'während der Anzeige');
});

test('Richtige Eingaben: ok, am Ende complete, Länge wächst', function () {
  const g = make({ startLength: 2, growth: 'extend' });
  g.newRound();
  g.beginInput(0);
  const s0 = g.seq.slice();
  assert.equal(g.input(s0[0], 500).result, 'ok');
  const r = g.input(s0[1], 900);
  assert.deepEqual(r, { result: 'complete', length: 2 });
  assert.equal(g.maxCompleted, 2);
  assert.equal(g.completedRounds, 1);
  // Nach dem Abschluss ist keine weitere Eingabe möglich
  assert.equal(g.input(0, 1000), null);
  g.newRound();
  assert.equal(g.seq.length, 3);
  assert.deepEqual(g.seq.slice(0, 2), s0, 'extend behält die alte Folge als Anfang');
  assert.notEqual(g.seq[2], g.seq[1]);
});

test('Wachstum „fresh“ erzeugt eine neue, längere Folge', function () {
  const g = make({ startLength: 2, growth: 'fresh' }, 3);
  playRound(g, 0);
  g.newRound();
  assert.equal(g.seq.length, 3);
});

test('Fehler: Zähler, erwartetes Feld, Regel „gleiche Länge“', function () {
  const g = make({ startLength: 3, onError: 'same', growth: 'extend' });
  playRound(g, 0); // Länge 3 geschafft
  g.newRound();    // Länge 4
  g.beginInput(0);
  const expected = g.seq[0];
  const res = g.input((expected + 1) % g.cells, 400);
  assert.deepEqual(res, { result: 'error', expected: expected });
  assert.equal(g.errors, 1);
  g.newRound();
  assert.equal(g.seq.length, 4);
});

test('Fehler: Regel „eine Länge kürzer“ bleibt über der Startlänge', function () {
  const g = make({ startLength: 3, onError: 'down' });
  playRound(g, 0); playRound(g, 0); // 3 und 4 geschafft
  playRound(g, 0, 0);               // Länge 5, Fehler
  g.newRound();
  assert.equal(g.seq.length, 4);
  playRound(g, 0, 0);               // Länge 4, Fehler
  g.newRound();
  assert.equal(g.seq.length, 3);
  playRound(g, 0, 0);               // Länge 3, Fehler
  g.newRound();
  assert.equal(g.seq.length, 3, 'nicht unter Startlänge');
});

test('Fehler: Regel „von vorn“', function () {
  const g = make({ startLength: 2, onError: 'restart' });
  playRound(g, 0); playRound(g, 0); // 2, 3 geschafft
  playRound(g, 0, 0);               // Länge 4, Fehler
  g.newRound();
  assert.equal(g.seq.length, 2);
});

test('Ende nach der erlaubten Fehlerzahl, 0 heißt unbegrenzt', function () {
  const g = make({ maxErrors: 2, onError: 'same', startLength: 2 });
  playRound(g, 0, 0);
  assert.equal(g.isOver(1000), false);
  playRound(g, 0, 0);
  assert.equal(g.isOver(1000), true);
  const u = make({ maxErrors: 0, startLength: 2 });
  for (let i = 0; i < 8; i++) playRound(u, 0, 0);
  assert.equal(u.isOver(1000), false);
});

test('Ende bei der Zielänge und beim Zeitlimit', function () {
  const g = make({ startLength: 3, maxLength: 5, growth: 'extend', maxErrors: 0 });
  playRound(g, 0); playRound(g, 0);
  assert.equal(g.isOver(0), false);
  playRound(g, 0);
  assert.equal(g.maxCompleted, 5);
  assert.equal(g.isOver(0), true);
  const t = make({ durationS: 30, maxErrors: 0 });
  assert.equal(t.isOver(29999), false);
  assert.equal(t.isOver(30000), true);
});

test('Kennzahlen', function () {
  const g = make({ startLength: 2, onError: 'same', maxErrors: 0 });
  playRound(g, 0);        // 2 richtige Eingaben (je 300 ms)
  playRound(g, 0, 1);     // Länge 3: 1 richtig, 1 falsch
  g.finish(12500);
  const sum = g.summary();
  const get = function (k) { return sum.metrics.find(function (m) { return m.key === k; }).value; };
  assert.equal(get('span'), 2);
  assert.equal(get('rounds'), 1);
  assert.equal(get('errors'), 1);
  assert.equal(get('accuracy'), 75);
  assert.equal(get('rt_mean'), 300);
  assert.equal(get('total'), 12.5);
  assert.equal(sum.trials.length, 4);
});

test('Ein-Feld-Raster erzeugt keine Endlosschleife', function () {
  const g = new SequenceGame(Object.assign(VT.defaultsOf(seq), { rows: 1, cols: 1, startLength: 2 }), VT.makeRng(1));
  assert.deepEqual(g.randomSeq(3), [0, 0, 0]);
});

test('Seed macht Folgen reproduzierbar', function () {
  const a = make({ startLength: 6 }, 99); a.newRound();
  const b = make({ startLength: 6 }, 99); b.newRound();
  assert.deepEqual(a.seq, b.seq);
});
