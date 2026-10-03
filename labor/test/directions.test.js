const test = require('node:test');
const assert = require('node:assert/strict');
const VT = require('../lib/core.js');
const dir = require('../ex/directions.js');
const { DirectionSession } = dir;

function make(over, seed) {
  const p = VT.sanitizeParams(dir, Object.assign(VT.defaultsOf(dir), { waitMinMs: 300, waitMaxMs: 300 }, over || {}));
  const s = new DirectionSession(p, { rng: VT.makeRng(seed || 1) });
  s.start(0);
  return s;
}
function show(s, t) { s.update(s.onsetAt); return s.shownAt; }

test('Richtungen sind gleichmäßig verteilt (4 und 8)', function () {
  const a = make({ trials: 32, directions: '4' });
  const cnt = [0, 0, 0, 0]; a.stimuli.forEach(function (x) { cnt[x]++; });
  assert.deepEqual(cnt, [8, 8, 8, 8]);
  const b = make({ trials: 32, directions: '8' });
  assert.equal(b.n, 8);
  assert.equal(new Set(b.stimuli).size, 8);
});

test('Pfeilrichtung: richtige und falsche Antwort per Berührung', function () {
  const s = make({ rule: 'same' }, 2);
  let at = show(s);
  const stim = s.current();
  assert.equal(s.respondDir(stim, at + 400).type, 'correct');
  at = show(s);
  const stim2 = s.current();
  assert.equal(s.respondDir((stim2 + 1) % 4, at + 400).type, 'wrong');
});

test('Gegenrichtung: richtig ist die entgegengesetzte Richtung', function () {
  const s = make({ rule: 'opposite', directions: '4' }, 3);
  const at = show(s);
  const stim = s.current();
  assert.equal(s.expectedFor(stim), (stim + 2) % 4);
  assert.equal(s.respondDir(stim, at + 300).type, 'wrong', 'gleiche Richtung ist hier falsch');
  const at2 = show(s);
  const stim2 = s.current();
  assert.equal(s.respondDir((stim2 + 2) % 4, at2 + 300).type, 'correct');
  const e = make({ rule: 'opposite', directions: '8' }, 3);
  assert.equal(e.expectedFor(1), 5);
  assert.equal(e.expectedFor(6), 2);
});

test('Hilfsperson bestätigt richtig oder falsch; zu frühe Eingabe zählt als zu früh', function () {
  const s = make({ input: 'helper' }, 4);
  assert.equal(s.respondHelper(true, 100).type, 'early');
  const at = show(s);
  assert.equal(s.respondHelper(true, at + 800).type, 'correct');
  const at2 = show(s);
  assert.equal(s.respondHelper(false, at2 + 900).type, 'wrong');
  assert.equal(s.early, 1);
  assert.equal(s.trials.length, 2);
  assert.equal(s.trials[0].rt_ms, 800);
});

test('Keine Antwort nach Ablauf und Ende nach allen Pfeilen', function () {
  const s = make({ trials: 10, stimulusMs: 500 }, 6);
  for (let i = 0; i < 10; i++) { const at = show(s); s.update(at + 500); }
  assert.ok(s.finished);
  assert.ok(s.trials.every(function (t) { return t.outcome === 'omission'; }));
  const sum = s.summary();
  sum.metrics.forEach(function (m) { assert.ok(dir.metricKeys.indexOf(m.key) >= 0, m.key); });
  assert.equal(sum.metrics.find(function (m) { return m.key === 'omissions'; }).value, 10);
});
