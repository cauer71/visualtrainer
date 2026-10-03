const test = require('node:test');
const assert = require('node:assert/strict');
require('../lib/core.js');
const I = require('../lib/input.js');

function fakeTarget() {
  const l = {};
  return {
    l: l,
    addEventListener: function (t, f) { (l[t] = l[t] || []).push(f); },
    removeEventListener: function (t, f) { l[t] = (l[t] || []).filter(function (x) { return x !== f; }); },
    fire: function (t, ev) { (l[t] || []).slice().forEach(function (f) { f(ev); }); },
    getBoundingClientRect: function () { return { left: 100, top: 0, width: 400, height: 300 }; }
  };
}

test('Achsen aus Tasten und Kippwinkel', function () {
  assert.equal(I.axisFromKeys({ left: false, right: false }), 0);
  assert.equal(I.axisFromKeys({ left: true, right: false }), -1);
  assert.equal(I.axisFromKeys({ left: true, right: true }), 0);
  assert.equal(I.axisFromGamma(0), 0);
  assert.equal(I.axisFromGamma(1.9), 0, 'Totzone');
  assert.equal(I.axisFromGamma(25), 1);
  assert.equal(I.axisFromGamma(-60), -1);
  assert.ok(I.axisFromGamma(10) > 0 && I.axisFromGamma(10) < 1);
  assert.equal(I.axisFromGamma(NaN), 0);
  assert.equal(I.axisFromGamma(undefined), 0);
});

test('Steuerung anwenden: Position, Achse, Begrenzung', function () {
  assert.equal(I.applySteering(10, { mode: 'position', x: 0.25 }, 0.016, 50, 60), 15);
  assert.equal(I.applySteering(10, { mode: 'axis', a: 1 }, 0.1, 50, 60), 15);
  assert.equal(I.applySteering(10, { mode: 'axis', a: -1 }, 1, 50, 60), 0);
  assert.equal(I.applySteering(55, { mode: 'axis', a: 1 }, 1, 50, 60), 60);
  assert.equal(I.applySteering(10, null, 0.1, 50, 60), 10);
  assert.equal(I.applySteering(10, { mode: 'position', x: 2 }, 0.1, 50, 60), 60, 'Position wird begrenzt');
});

test('Zeiger-Steuerung liest die waagerechte Position als Anteil', function () {
  const c = fakeTarget(), w = fakeTarget();
  const s = I.createSteering('pointer', c, w);
  assert.deepEqual(s.read(), { mode: 'position', x: 0.5 });
  c.fire('pointermove', { clientX: 300 });
  assert.deepEqual(s.read(), { mode: 'position', x: 0.5 });
  c.fire('pointermove', { clientX: 100 });
  assert.equal(s.read().x, 0);
  c.fire('pointerdown', { clientX: 900 });
  assert.equal(s.read().x, 1);
  s.dispose();
  assert.equal((c.l.pointermove || []).length, 0);
});

test('Tasten-Steuerung', function () {
  const c = fakeTarget(), w = fakeTarget();
  const s = I.createSteering('keys', c, w);
  assert.equal(s.read().a, 0);
  w.fire('keydown', { key: 'ArrowRight' });
  assert.equal(s.read().a, 1);
  w.fire('keydown', { key: 'a' });
  assert.equal(s.read().a, 0);
  w.fire('keyup', { key: 'ArrowRight' });
  assert.equal(s.read().a, -1);
  w.fire('keyup', { key: 'A' });
  assert.equal(s.read().a, 0);
  w.fire('keydown', { key: 'x' });
  assert.equal(s.read().a, 0);
  s.dispose();
  assert.equal((w.l.keydown || []).length, 0);
  assert.equal((w.l.keyup || []).length, 0);
});

test('Kipp-Steuerung', function () {
  const c = fakeTarget(), w = fakeTarget();
  const s = I.createSteering('tilt', c, w);
  assert.equal(s.read().a, 0);
  w.fire('deviceorientation', { gamma: 30 });
  assert.equal(s.read().a, 1);
  w.fire('deviceorientation', { gamma: -12.5 });
  assert.ok(s.read().a < 0 && s.read().a > -1);
  s.dispose();
  assert.equal((w.l.deviceorientation || []).length, 0);
});
