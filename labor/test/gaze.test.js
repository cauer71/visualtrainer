const test = require('node:test');
const assert = require('node:assert/strict');
require('../lib/core.js');
const G = require('../lib/gaze.js');

test('Hess-Raster: 25 Punkte, 9 innen und 16 außen, erste Ecke oben links', function () {
  const g = G.hessGrid(30);
  assert.equal(g.length, 25);
  assert.equal(g.filter(function (p) { return p.ring === 'inner'; }).length, 9);
  assert.equal(g.filter(function (p) { return p.ring === 'outer'; }).length, 16);
  assert.deepEqual(g.map(function (p) { return p.id; }), Array.from({ length: 25 }, function (_, i) { return i + 1; }));
  assert.deepEqual([g[0].hx, g[0].vy], [-30, 30]);
  assert.deepEqual([g[24].hx, g[24].vy], [30, -30]);
  assert.equal(g.filter(function (p) { return p.hx === 0 && p.vy === 0; }).length, 1);
  g.filter(function (p) { return p.ring === 'inner'; }).forEach(function (p) { assert.ok(Math.abs(p.hx) <= 15 && Math.abs(p.vy) <= 15); });
});

test('3×3-Raster', function () {
  const g = G.nineGrid(15);
  assert.equal(g.length, 9);
  assert.equal(g.filter(function (p) { return p.ring === 'center'; }).length, 1);
  assert.deepEqual([g[0].hx, g[0].vy, g[8].hx, g[8].vy], [-15, 15, 15, -15]);
});

test('Projektion und Rückrechnung', function () {
  const q = G.project(50, 15, 0);
  assert.ok(Math.abs(q.x - 50 * Math.tan(15 * Math.PI / 180)) < 1e-12);
  assert.equal(q.y, 0);
  const b = G.unproject(50, q.x, 7);
  assert.ok(Math.abs(b.hx - 15) < 1e-9);
  const rt = G.unproject(60, G.project(60, -20, 12).x, G.project(60, -20, 12).y);
  assert.ok(Math.abs(rt.hx + 20) < 1e-9 && Math.abs(rt.vy - 12) < 1e-9);
});

test('Anpassen: großes Feld unverändert, kleines Feld wird verkleinert', function () {
  const big = G.fit(50, G.hessGrid(20), 100, 80, 1.5);
  assert.equal(big.clamped, false);
  assert.equal(big.scale, 1);
  assert.ok(Math.abs(big.effMaxDeg - 20) < 1e-9);
  const corner = big.points[0];
  assert.ok(Math.abs(corner.sx - (50 - 50 * Math.tan(20 * Math.PI / 180))) < 1e-9);
  assert.ok(Math.abs(corner.sy - (40 - 50 * Math.tan(20 * Math.PI / 180))) < 1e-9);

  const small = G.fit(50, G.hessGrid(30), 30, 20, 1.5);
  assert.equal(small.clamped, true);
  assert.ok(small.effMaxDeg < 30 && small.effMaxDeg > 5);
  small.points.forEach(function (p) {
    assert.ok(p.sx >= 1.5 - 1e-6 && p.sx <= 28.5 + 1e-6 && p.sy >= 1.5 - 1e-6 && p.sy <= 18.5 + 1e-6);
  });
  const ys = small.points.map(function (p) { return p.sy; });
  assert.ok(Math.abs(Math.max.apply(null, ys) - 18.5) < 1e-3, 'die begrenzende Höhe wird bis zum Rand genutzt');
  // Winkel der Punkte sind gleichmäßig mit dem Faktor verkleinert
  assert.ok(Math.abs(small.points[0].hx / -30 - small.scale) < 1e-9);
});

test('Ringreihenfolge und Fläche', function () {
  const pts = G.hessGrid(10).map(function (p) { return { id: p.id, ring: p.ring, hx: p.hx, vy: p.vy }; });
  const outer = G.ringOrder(pts, 'outer');
  assert.equal(outer.length, 16);
  for (let i = 1; i < outer.length; i++) assert.ok(Math.atan2(outer[i].vy, outer[i].hx) >= Math.atan2(outer[i - 1].vy, outer[i - 1].hx));
  assert.equal(G.polygonArea([{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 2 }, { x: 0, y: 2 }]), 4);
  assert.equal(G.polygonArea([{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 0, y: 3 }]), 6);
  // Umriss der 16 Randpunkte ist das volle Quadrat (20 × 20)
  assert.ok(Math.abs(G.polygonArea(outer.map(function (p) { return { x: p.hx, y: p.vy }; })) - 400) < 1e-9);
});
