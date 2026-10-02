const test = require('node:test');
const assert = require('node:assert/strict');
const VT = require('../lib/core.js');
const rot = require('../ex/rotation.js');
const G = rot.geometry;
const { RotationSession } = rot;

function connected(cells) {
  const set = new Set(cells.map(function (c) { return c.join(','); }));
  const seen = new Set();
  const stack = [cells[0]];
  while (stack.length) {
    const c = stack.pop(), k = c.join(',');
    if (seen.has(k)) continue;
    seen.add(k);
    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) {
      const n = [c[0] + d[0], c[1] + d[1]];
      if (set.has(n.join(','))) stack.push(n);
    });
  }
  return seen.size === cells.length;
}
function make(over, seed) {
  const p = VT.sanitizeParams(rot, Object.assign(VT.defaultsOf(rot), over || {}));
  const s = new RotationSession(p, { rng: VT.makeRng(seed || 1) });
  s.start(0);
  return s;
}

test('Geometrie: Drehung viermal ergibt dieselbe Figur, Spiegeln zweimal auch', function () {
  const L = [[0, 0], [0, 1], [0, 2], [1, 2]];
  assert.equal(G.key(G.rotate90(L, 4)), G.key(L));
  assert.notEqual(G.key(G.rotate90(L, 1)), G.key(L));
  assert.equal(G.key(G.mirror(G.mirror(L))), G.key(L));
  assert.equal(G.key(G.rotate90(L, 5)), G.key(G.rotate90(L, 1)));
});

test('Chiralität: L ist chiral, T und Quadrat nicht', function () {
  assert.equal(G.isChiral([[0, 0], [0, 1], [0, 2], [1, 2]]), true);
  assert.equal(G.isChiral([[0, 0], [1, 0], [2, 0], [1, 1]]), false);
  assert.equal(G.isChiral([[0, 0], [1, 0], [0, 1], [1, 1]]), false);
});

test('Zufallsfiguren: richtige Zellenzahl, zusammenhängend, chiral', function () {
  const rng = VT.makeRng(5);
  for (let n = 4; n <= 9; n++) {
    for (let i = 0; i < 15; i++) {
      const f = G.randomFigure(n, rng);
      assert.equal(f.length, n);
      assert.equal(new Set(f.map(function (c) { return c.join(','); })).size, n);
      assert.ok(connected(f));
      assert.ok(G.isChiral(f));
    }
  }
});

test('Winkelbetrag und Anstieg', function () {
  assert.deepEqual([0, 45, 90, 180, 270, 315].map(G.foldAngle), [0, 45, 90, 180, 90, 45]);
  assert.equal(G.slope([0, 1, 2, 3], [500, 700, 900, 1100]), 200);
  assert.equal(G.slope([0, 1], [500, 700]), null);
  assert.equal(G.slope([1, 1, 1], [5, 6, 7]), null);
});

test('Aufgaben: „gleich“ ist eine Drehung, „gespiegelt“ keine Drehung der Vorlage', function () {
  const s = make({ trials: 40, angles: '90' }, 7);
  for (let i = 0; i < 40; i++) {
    const t = s.trial;
    assert.equal(t.extraDeg, 0);
    const k = t.angle / 90;
    const shownKey = G.key(t.shown);
    const rotations = [0, 1, 2, 3].map(function (r) { return G.key(G.rotate90(t.base, r)); });
    if (t.same) assert.equal(shownKey, G.key(G.rotate90(t.base, k)));
    else {
      assert.equal(shownKey, G.key(G.rotate90(G.mirror(t.base), k)));
      assert.ok(rotations.indexOf(shownKey) < 0, 'Spiegelbild darf keine Drehung der Vorlage sein');
    }
    assert.ok(t.angle > 0 && t.angle < 360);
    s.answer(true, 1000 + i);
  }
});

test('45°-Modus: Winkel sind Vielfache von 45, Rest wird beim Zeichnen gedreht', function () {
  const s = make({ trials: 40, angles: '45' }, 3);
  const seen = new Set();
  for (let i = 0; i < 40; i++) {
    const t = s.trial;
    assert.equal(t.angle % 45, 0);
    assert.equal(t.extraDeg, t.angle % 90);
    seen.add(t.angle);
    s.answer(true, 1000);
  }
  assert.ok([...seen].some(function (a) { return a % 90 === 45; }));
});

test('Antworten, Zeiten, Ende, Kennzahlen', function () {
  const s = make({ trials: 6 }, 2);
  let now = 0;
  const correctness = [true, true, true, true, false, false];
  correctness.forEach(function (ok, i) {
    const t = s.trial;
    const rt = 400 + 200 * (t.angle > 180 ? 360 - t.angle : t.angle) / 90;
    now += rt;
    const res = s.answer(ok ? t.same : !t.same, now);
    assert.equal(res.type, ok ? 'correct' : 'wrong');
    now += 0;
    s.trials[i].rt_ms = Math.round(rt);
  });
  assert.ok(s.finished);
  assert.equal(s.answer(true, now), null);
  const sum = s.summary();
  const get = function (k) { return sum.metrics.find(function (m) { return m.key === k; }).value; };
  assert.equal(get('correct'), 4);
  assert.equal(get('accuracy'), VT.round(100 * 4 / 6, 1));
  sum.metrics.forEach(function (m) { assert.ok(rot.metricKeys.indexOf(m.key) >= 0, m.key); });
});

test('Zeitlimit je Aufgabe wertet als falsch ohne Antwort', function () {
  const s = make({ trials: 6, timeoutS: 5 }, 4);
  s.update(4999);
  assert.equal(s.idx, 0);
  s.update(5000);
  assert.equal(s.idx, 1);
  assert.equal(s.trials[0].correct, 0);
  assert.equal(s.trials[0].rt_ms, null);
  assert.equal(s.trials[0].answer_same, null);
});
