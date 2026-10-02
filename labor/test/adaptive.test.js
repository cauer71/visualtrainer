const test = require('node:test');
const assert = require('node:assert/strict');
const VT = require('../lib/core.js');
const { makeStaircase } = require('../lib/adaptive.js');

function stair(over) {
  return makeStaircase(Object.assign({ start: 200, min: 16, max: 2000, factorHarder: 0.8, factorEasier: 1.25, needCorrect: 2 }, over || {}));
}

test('Zwei richtige in Folge machen schwerer, ein Fehler macht leichter', function () {
  const s = stair();
  assert.equal(s.value(), 200);
  s.record(true);
  assert.equal(s.value(), 200, 'erst nach zwei richtigen');
  s.record(true);
  assert.equal(s.value(), 160);
  s.record(false);
  assert.equal(s.value(), 200);
});

test('Falsche Antwort setzt die Serie zurück', function () {
  const s = stair();
  s.record(true); s.record(false); s.record(true);
  assert.equal(s.value(), 250, 'nach T,F,T: nur ein Fehler zählt, keine zwei in Folge');
});

test('Umkehrpunkte und Schwelle', function () {
  const s = stair();
  assert.equal(s.threshold(), null);
  s.record(true); s.record(true);   // 160 (Richtung abwärts)
  s.record(false);                  // Umkehr bei 160 -> 200
  s.record(true); s.record(true);   // Umkehr bei 200 -> 160
  s.record(false);                  // Umkehr bei 160 -> 200
  assert.deepEqual(s.reversals(), [160, 200, 160]);
  assert.equal(s.threshold(), VT.mean([160, 200, 160]));
  assert.equal(s.threshold(2), 180);
});

test('Grenzen werden eingehalten, auch bei Rundung', function () {
  const lo = stair({ start: 17, min: 16 });
  lo.record(true); lo.record(true);
  assert.equal(lo.value(), 16);
  lo.record(true); lo.record(true);
  assert.equal(lo.value(), 16);
  const hi = stair({ start: 1900, max: 2000 });
  hi.record(false);
  assert.equal(hi.value(), 2000);
});

test('Verlauf wird festgehalten', function () {
  const s = stair();
  s.record(true); s.record(false);
  assert.deepEqual(s.history(), [{ value: 200, correct: true }, { value: 200, correct: false }]);
});

test('Konvergenz: simulierte Versuchsperson mit fester Schwelle', function () {
  const rng = VT.makeRng(11);
  const s = stair({ start: 400 });
  const truth = 120;
  for (let i = 0; i < 400; i++) {
    const v = s.value();
    const pCorrect = 0.25 + 0.75 / (1 + Math.exp(-(v - truth) / 15));
    s.record(rng() < pCorrect);
  }
  const th = s.threshold(8);
  assert.ok(th > 80 && th < 220, 'Schwelle ' + th);
});
