/* Blickrichtungs-Raster (Hess-Raster, 3×3) und Umrechnung zwischen Blickwinkel (Grad) und Bildschirmort (cm).
 * Konvention: Projektion auf eine ebene Fläche im Abstand D: x = D·tan(hx), y = D·tan(vy); y positiv = oben. Keine Netzwerkzugriffe. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('./core.js') : root.VT;
  const api = factory();
  VT.gaze = api;
  if (isNode) module.exports = api;
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const RAD = Math.PI / 180;

  /** 25 Punkte: 9 innere (±max/2) und 16 äußere (±max). */
  function hessGrid(maxDeg) {
    const steps = [-1, -0.5, 0, 0.5, 1];
    const out = [];
    for (let iy = steps.length - 1; iy >= 0; iy--) {
      for (let ix = 0; ix < steps.length; ix++) {
        const m = Math.max(Math.abs(steps[ix]), Math.abs(steps[iy]));
        out.push({ hx: steps[ix] * maxDeg, vy: steps[iy] * maxDeg, ring: m <= 0.5 ? 'inner' : 'outer' });
      }
    }
    return out.map(function (p, i) { p.id = i + 1; return p; });
  }

  /** 3×3 Blickpositionen. */
  function nineGrid(deg) {
    const out = [];
    [1, 0, -1].forEach(function (sy) { [-1, 0, 1].forEach(function (sx) { out.push({ hx: sx * deg, vy: sy * deg, ring: sx === 0 && sy === 0 ? 'center' : 'outer' }); }); });
    return out.map(function (p, i) { p.id = i + 1; return p; });
  }

  function project(distCm, hx, vy) { return { x: distCm * Math.tan(hx * RAD), y: distCm * Math.tan(vy * RAD) }; }
  function unproject(distCm, xcm, ycm) { return { hx: Math.atan(xcm / distCm) / RAD, vy: Math.atan(ycm / distCm) / RAD }; }

  /**
   * Skaliert das Raster (alle Winkel mit demselben Faktor a ≤ 1) so, dass es in ein Feld W×H (cm) passt.
   * Liefert Punkte mit Bildschirmkoordinaten sx, sy (cm, Ursprung links oben) und den tatsächlichen größten Winkel.
   */
  function fit(distCm, grid, W, H, marginCm) {
    const maxDeg = Math.max.apply(null, grid.map(function (p) { return Math.max(Math.abs(p.hx), Math.abs(p.vy)); })) || 1;
    function fits(a) {
      return grid.every(function (p) {
        const q = project(distCm, p.hx * a, p.vy * a);
        return Math.abs(q.x) <= W / 2 - marginCm && Math.abs(q.y) <= H / 2 - marginCm;
      });
    }
    let a = 1;
    if (!fits(1)) {
      let lo = 0, hi = 1;
      for (let i = 0; i < 40; i++) { const mid = (lo + hi) / 2; if (fits(mid)) lo = mid; else hi = mid; }
      a = lo;
    }
    const points = grid.map(function (p) {
      const q = project(distCm, p.hx * a, p.vy * a);
      return { id: p.id, ring: p.ring, hx: p.hx * a, vy: p.vy * a, sx: W / 2 + q.x, sy: H / 2 - q.y };
    });
    return { points: points, scale: a, effMaxDeg: maxDeg * a, clamped: a < 1 - 1e-9 };
  }

  /** Punkte eines Rings nach Winkel um die Mitte sortiert (für Umrisse). */
  function ringOrder(points, ring) {
    return points.filter(function (p) { return p.ring === ring; }).sort(function (a, b) { return Math.atan2(a.vy, a.hx) - Math.atan2(b.vy, b.hx); });
  }
  /** Fläche eines Vielecks (Schnürsenkelformel), Punkte als {x, y}. */
  function polygonArea(pts) {
    let s = 0;
    for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; s += a.x * b.y - b.x * a.y; }
    return Math.abs(s) / 2;
  }

  return { hessGrid: hessGrid, nineGrid: nineGrid, project: project, unproject: unproject, fit: fit, ringOrder: ringOrder, polygonArea: polygonArea };
}));
