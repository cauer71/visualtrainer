const test = require('node:test');
const assert = require('node:assert/strict');
const VT = require('../lib/core.js');
const spots = require('../ex/spots.js');
const { SpotSession } = spots;

function make(over, seed) {
  const p = Object.assign(VT.defaultsOf(spots), over || {});
  return new SpotSession(VT.sanitizeParams(spots, p), { rng: VT.makeRng(seed || 1), fieldWcm: 60, fieldHcm: 34 });
}

test('Spot erscheint nach Start; Treffer misst die Reaktionszeit', function () {
  const s = make({});
  s.start(1000);
  s.update(1000);
  assert.equal(s.active.length, 1);
  const sp = s.active[0];
  const res = s.tap(sp.x, sp.y, 1420);
  assert.equal(res.type, 'hit');
  assert.equal(res.rt, 420);
  assert.equal(s.active.length, 0);
  assert.equal(s.trials[0].hit, 1);
  assert.equal(s.trials[0].rt_ms, 420);
});

test('Nach einem Treffer kommt der nächste Spot erst nach der Pause', function () {
  const s = make({ gapMs: 500 });
  s.start(0); s.update(0);
  const sp = s.active[0];
  s.tap(sp.x, sp.y, 300);
  s.update(600);
  assert.equal(s.active.length, 0, 'bei 600 ms noch Pause (bis 800 ms)');
  s.update(800);
  assert.equal(s.active.length, 1);
});

test('Daneben tippen zählt als Fehltipp, Spot bleibt', function () {
  const s = make({});
  s.start(0); s.update(0);
  const sp = s.active[0];
  const farX = sp.x < 30 ? sp.x + 20 : sp.x - 20;
  const res = s.tap(farX, sp.y, 200);
  assert.equal(res.type, 'stray');
  assert.equal(s.strayTaps, 1);
  assert.equal(s.active.length, 1);
});

test('Toleranz: knapp neben dem Rand zählt noch, deutlich daneben nicht', function () {
  const s = make({ diameterCm: 4 });
  s.start(0); s.update(0);
  const sp = s.active[0];
  assert.equal(s.tap(sp.x + 2.2, sp.y, 100).type, 'hit', '0,2 cm neben dem Rand, innerhalb der Toleranz');
  s.update(1000);
  const sp2 = s.active[0];
  assert.equal(s.tap(sp2.x + 2.6, sp2.y, 1100).type, 'stray', '0,6 cm neben dem Rand');
});

test('Ablauf der Sichtbarkeit zählt als verpasst, Pause beginnt ab Ablaufzeit', function () {
  const s = make({ persistenceS: 1, gapMs: 200 });
  s.start(0); s.update(0);
  s.update(1000);
  assert.equal(s.trials.length, 1);
  assert.equal(s.trials[0].hit, 0);
  assert.equal(s.trials[0].rt_ms, null);
  assert.equal(s.active.length, 0);
  s.update(1199);
  assert.equal(s.active.length, 0);
  s.update(1200);
  assert.equal(s.active.length, 1);
});

test('Periphere Zone: alle Spots liegen im Außenbereich', function () {
  const s = make({ zone: 'periphery', gapMs: 0 }, 5);
  s.start(0);
  for (let i = 0; i < 150; i++) {
    s.update(i * 10);
    s.active.forEach(function (sp) {
      const u = (sp.x - 30) / 30, v = (sp.y - 17) / 17;
      assert.ok(Math.sqrt(u * u + v * v) >= 0.6 - 1e-9);
    });
  }
});

test('Zentrale Zone und Fixationskreuz: Spot hält Abstand zur Mitte', function () {
  const s = make({ zone: 'center', fixation: 'yes', gapMs: 0, diameterCm: 3 }, 9);
  s.start(0);
  for (let i = 0; i < 100; i++) {
    s.update(i * 10);
    s.active.forEach(function (sp) {
      const d = Math.hypot(sp.x - 30, sp.y - 17);
      assert.ok(d >= 1.5 + 1.2 - 1e-9);
      assert.ok(Math.sqrt(Math.pow((sp.x - 30) / 30, 2) + Math.pow((sp.y - 17) / 17, 2)) <= 0.45 + 1e-9);
    });
  }
});

test('Mehrere gleichzeitige Spots überlappen nicht und halten die Zahl', function () {
  const s = make({ simultaneous: 4, diameterCm: 5 }, 3);
  s.start(0); s.update(0);
  assert.equal(s.active.length, 4);
  for (let i = 0; i < s.active.length; i++) {
    for (let j = i + 1; j < s.active.length; j++) {
      assert.ok(Math.hypot(s.active[i].x - s.active[j].x, s.active[i].y - s.active[j].y) >= 2 * 2.5 + 0.5 - 1e-9);
    }
  }
});

test('Spots liegen vollständig im Feld', function () {
  const s = make({ diameterCm: 8, gapMs: 0 }, 11);
  s.start(0);
  for (let i = 0; i < 200; i++) {
    s.update(i * 5);
    s.active.forEach(function (sp) {
      assert.ok(sp.x >= 4 - 1e-9 && sp.x <= 56 + 1e-9 && sp.y >= 4 - 1e-9 && sp.y <= 30 + 1e-9);
    });
  }
});

test('Ende nach Dauer; danach keine Eingaben mehr; Kennzahlen stimmen', function () {
  const s = make({ durationS: 10, persistenceS: 2, gapMs: 0 });
  s.start(0); s.update(0);
  let a = s.active[0];
  s.tap(a.x, a.y, 400); // Treffer, rt 400
  s.update(400);
  a = s.active[0];
  s.tap(a.x, a.y, 1000); // Treffer, rt 600
  s.update(1000); // neuer Spot
  s.update(3000); // läuft ab -> verpasst; neuer Spot
  s.tap(0, 0, 3100); // Fehltipp
  s.update(10000);
  assert.ok(s.finished);
  assert.equal(s.tap(1, 1, 10050), null);
  const sum = s.summary();
  const get = function (k) { return sum.metrics.find(function (m) { return m.key === k; }).value; };
  assert.equal(get('hits'), 2);
  assert.equal(get('misses'), 1);
  assert.equal(get('stray'), 1);
  assert.equal(get('accuracy'), 66.7);
  assert.equal(get('rt_mean'), 500);
  assert.equal(get('rt_median'), 500);
  assert.equal(get('rate'), 12);
  assert.equal(sum.trials.length, 3);
});

test('Ohne Ereignisse: Kennzahlen sind null statt NaN', function () {
  const s = make({ durationS: 10 });
  s.start(0);
  s.update(10000);
  const sum = s.summary();
  sum.metrics.forEach(function (m) { assert.ok(m.value === null || Number.isFinite(m.value), m.key); });
  assert.equal(sum.metrics.find(function (m) { return m.key === 'rt_mean'; }).value, null);
});

test('Seed macht den Ablauf reproduzierbar', function () {
  function seq(seed) {
    const s = make({ gapMs: 0, persistenceS: 0.5 }, seed);
    s.start(0);
    const out = [];
    for (let i = 0; i < 20; i++) { s.update(i * 600); s.active.forEach(function (a) { out.push([a.x.toFixed(3), a.y.toFixed(3)].join(',')); }); }
    return out.join('|');
  }
  assert.equal(seq(21), seq(21));
  assert.notEqual(seq(21), seq(22));
});

test('createSession bereinigt Parameter', function () {
  const s = spots.createSession({ durationS: 99999, diameterCm: -3, zone: 'quatsch' }, { rng: VT.makeRng(1), fieldWcm: 50, fieldHcm: 30 });
  assert.equal(s.p.durationS, 600);
  assert.equal(s.p.diameterCm, 1);
  assert.equal(s.p.zone, 'all');
});
