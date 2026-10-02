const test = require('node:test');
const assert = require('node:assert/strict');
const VT = require('../lib/core.js');
const follow = require('../ex/follow.js');
const { FollowSession, makePath } = follow;

function make(over) {
  const p = VT.sanitizeParams(follow, Object.assign(VT.defaultsOf(follow), over || {}));
  const s = new FollowSession(p, { fieldWcm: 60, fieldHcm: 34 });
  s.start(0);
  return s;
}
/** Lässt den Finger ideal mitlaufen: der Zeiger steht dort, wo das Ziel nach dem nächsten Schritt ist. */
function play(s, until, stepMs, fn) {
  for (let t = stepMs; t <= until; t += stepMs) {
    const next = (s.elapsed + stepMs / 1000);
    const target = s.path.at(s.p.speedCmS * next);
    const st = fn ? fn(t, target) : { down: true, dx: 0, dy: 0 };
    s.setPointer(target.x + (st.dx || 0), target.y + (st.dy || 0), st.down);
    s.update(t);
  }
}

test('Bahn: geschlossen, im Feld, gleichmäßige Geschwindigkeit entlang der Bogenlänge', function () {
  ['ellipse', 'eight', 'lissajous'].forEach(function (kind) {
    const path = makePath(kind, 60, 34, 2.5);
    assert.ok(path.length > 50);
    const a = path.at(0), b = path.at(path.length);
    assert.ok(Math.hypot(a.x - b.x, a.y - b.y) < 1e-6, kind + ' nicht geschlossen');
    path.points.forEach(function (pt) { assert.ok(pt.x >= 2.5 - 1e-6 && pt.x <= 57.5 + 1e-6 && pt.y >= 2.5 - 1e-6 && pt.y <= 31.5 + 1e-6); });
    const ds = path.length / 400;
    for (let i = 0; i < 400; i++) {
      const p1 = path.at(i * ds), p2 = path.at((i + 1) * ds);
      const chord = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      assert.ok(chord <= ds * 1.0005, kind + ' Sehne länger als Bogen');
      assert.ok(chord >= ds * 0.85, kind + ' Sehne zu kurz: ' + chord / ds);
    }
  });
});

test('Ideales Mitlaufen: nahezu 100 % auf dem Ziel, keine Verluste', function () {
  const s = make({ durationS: 10, speedCmS: 10 });
  play(s, 10500, 50);
  assert.ok(s.finished);
  const sum = s.summary();
  const get = function (k) { return sum.metrics.find(function (m) { return m.key === k; }).value; };
  assert.ok(get('on_pct') > 99, 'on_pct ' + get('on_pct'));
  assert.equal(get('losses'), 0);
  assert.ok(get('best_run') > 9.5);
  assert.ok(get('mean_dist') < 0.01);
  assert.ok(get('touch_pct') > 99);
});

test('Ohne Berührung: 0 % auf dem Ziel', function () {
  const s = make({ durationS: 10 });
  play(s, 10500, 50, function () { return { down: false }; });
  const sum = s.summary();
  const get = function (k) { return sum.metrics.find(function (m) { return m.key === k; }).value; };
  assert.equal(get('on_pct'), 0);
  assert.equal(get('touch_pct'), 0);
  assert.equal(get('mean_dist'), null);
  assert.equal(get('losses'), 0);
});

test('Verlust wird gezählt, längste Verfolgung stimmt', function () {
  const s = make({ durationS: 10, speedCmS: 8 });
  play(s, 10500, 50, function (t) {
    if (t > 3000 && t <= 4000) return { down: false };   // 1 s ohne Finger
    return { down: true, dx: 0, dy: 0 };
  });
  const sum = s.summary();
  const get = function (k) { return sum.metrics.find(function (m) { return m.key === k; }).value; };
  assert.equal(get('losses'), 1);
  assert.ok(Math.abs(get('best_run') - 6) < 0.2, 'beste Serie ' + get('best_run'));
  assert.ok(get('on_pct') > 85 && get('on_pct') < 95);
});

test('Abweichung: Zeiger weit neben dem Ziel gilt nicht als „auf dem Ziel“', function () {
  const s = make({ durationS: 10, diameterCm: 3, toleranceCm: 0.5 });
  play(s, 10500, 50, function () { return { down: true, dx: 5, dy: 0 }; });
  const sum = s.summary();
  const get = function (k) { return sum.metrics.find(function (m) { return m.key === k; }).value; };
  assert.equal(get('on_pct'), 0);
  assert.ok(get('touch_pct') > 99);
  assert.ok(Math.abs(get('mean_dist') - 5) < 0.01);
});

test('Toleranz: knapp außerhalb des Zielrands zählt noch', function () {
  const s = make({ durationS: 10, diameterCm: 3, toleranceCm: 0.5 });
  play(s, 10500, 50, function () { return { down: true, dx: 1.9, dy: 0 }; });
  assert.ok(s.summary().metrics.find(function (m) { return m.key === 'on_pct'; }).value > 99);
});

test('Ende nach Dauer; Zeitsprünge werden begrenzt', function () {
  const s = make({ durationS: 10 });
  s.update(60000);
  assert.ok(s.elapsed <= 0.1 + 1e-9, 'ein langer Sprung zählt höchstens 0,1 s');
  assert.equal(s.finished, false);
  const sum = s.summary();
  sum.metrics.forEach(function (m) { assert.ok(follow.metricKeys.indexOf(m.key) >= 0, m.key); });
});
