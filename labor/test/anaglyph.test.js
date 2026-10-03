const test = require('node:test');
const assert = require('node:assert/strict');
require('../lib/core.js');
const A = require('../lib/anaglyph.js');

test('Farben je Auge: Rot links oder rechts, Helligkeitsstufen', function () {
  const c = A.colorsFor({ redEye: 'left' });
  assert.deepEqual([c.red, c.blue, c.left, c.right, c.redEye, c.blueEye], ['#ff0000', '#00a0ff', '#ff0000', '#00a0ff', 'left', 'right']);
  const r = A.colorsFor({ redEye: 'right' });
  assert.deepEqual([r.left, r.right, r.blueEye], ['#00a0ff', '#ff0000', 'left']);
  const dim = A.colorsFor({ redEye: 'left', redLevel: 0.5, blueLevel: 0.5 });
  assert.equal(dim.red, '#800000');
  assert.equal(dim.blue, '#005080');
  assert.equal(A.colorsFor({}).redEye, 'left');
});

test('Bildpositionen: Konvergenz = Bild des linken Auges rechts, Divergenz umgekehrt', function () {
  const c = A.eyePositions(100, 50, 10, 'convergence');
  assert.deepEqual([c.left.x, c.right.x, c.left.y, c.right.y], [105, 95, 50, 50]);
  const d = A.eyePositions(100, 50, 10, 'divergence');
  assert.deepEqual([d.left.x, d.right.x], [95, 105]);
  const z = A.eyePositions(100, 50, 0, 'convergence');
  assert.equal(z.left.x, z.right.x);
});

test('Umrechnung: 1 Δ entspricht 1 cm auf 1 m', function () {
  assert.equal(A.pdToCm(1, 100), 1);
  assert.equal(A.pdToCm(10, 60), 6);
  assert.equal(A.cmToPd(6, 60), 10);
  assert.ok(Math.abs(A.arcsecToCm(3600, 60) - 60 * Math.tan(Math.PI / 180)) < 1e-12);
  assert.ok(Math.abs(A.cmToArcsec(A.arcsecToCm(100, 60), 60) - 100) < 1e-9);
});

test('withColor mischt additiv und stellt den Zustand wieder her', function () {
  const log = [];
  const ctx = {
    save: function () { log.push('save'); }, restore: function () { log.push('restore'); },
    globalCompositeOperation: 'source-over', fillStyle: '', strokeStyle: ''
  };
  A.withColor(ctx, '#ff0000', function () { log.push(ctx.globalCompositeOperation + ' ' + ctx.fillStyle + ' ' + ctx.strokeStyle); });
  assert.deepEqual(log, ['save', 'lighter #ff0000 #ff0000', 'restore']);
});
