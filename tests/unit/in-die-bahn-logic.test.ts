import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  bendFor,
  bezierPoints,
  errorPct,
  GUIDE_UNTIL_LEVEL,
  HIT_TOL_PCT,
  hitTolPct,
  isHit,
  makeRoute,
  MAX_LEVEL,
  meanError,
  MIN_LEVEL,
  nearestOnRoute,
  noisyTap,
  passSecondsFor,
  pointsFor,
  routeFrom,
  routePoint,
  traceSecondsFor,
} from '../../src/exercises/in-die-bahn/logic';

const F = { minX: 50, maxX: 1130, minY: 40, maxY: 720 };

describe('in-die-bahn: Stufenfunktionen', () => {
  it('Durchlaufzeit sinkt mit der Stufe und bleibt im Bereich', () => {
    expect(passSecondsFor(1)).toBeCloseTo(3.6, 5);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(passSecondsFor(l)).toBeLessThanOrEqual(passSecondsFor(l - 1));
    expect(passSecondsFor(MAX_LEVEL)).toBeGreaterThanOrEqual(1.5);
    expect(passSecondsFor(99)).toBe(passSecondsFor(MAX_LEVEL));
  });

  it('Spur: bis Stufe 4 bleibt die Bahn stehen, danach wird die Spur kürzer', () => {
    for (let l = MIN_LEVEL; l <= GUIDE_UNTIL_LEVEL; l++) expect(traceSecondsFor(l)).toBe(Infinity);
    expect(traceSecondsFor(5)).toBeGreaterThan(traceSecondsFor(10));
    expect(traceSecondsFor(10)).toBeGreaterThan(traceSecondsFor(20));
    expect(traceSecondsFor(20)).toBeGreaterThan(0);
  });

  it('Bogen erst ab Stufe 6, höchstens 0,22', () => {
    for (let l = 1; l <= 5; l++) expect(bendFor(l)).toBe(0);
    expect(bendFor(6)).toBeGreaterThan(0);
    for (let l = 7; l <= MAX_LEVEL; l++) expect(bendFor(l)).toBeGreaterThanOrEqual(bendFor(l - 1));
    expect(bendFor(MAX_LEVEL)).toBeLessThanOrEqual(0.22);
  });
});

describe('in-die-bahn: Bahn', () => {
  it('Polylinie: Länge, Punkt bei Bogenlänge, Begrenzung', () => {
    const r = routeFrom([
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 50 },
    ]);
    expect(r.length).toBeCloseTo(150);
    expect(routePoint(r, 0)).toEqual({ x: 0, y: 0 });
    expect(routePoint(r, 50)).toEqual({ x: 50, y: 0 });
    expect(routePoint(r, 125)).toEqual({ x: 100, y: 25 });
    expect(routePoint(r, 999)).toEqual({ x: 100, y: 50 });
    expect(routePoint(r, -5)).toEqual({ x: 0, y: 0 });
  });

  it('nächster Punkt der Bahn: Abstand und Bogenlänge', () => {
    const r = routeFrom([
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 50 },
    ]);
    const a = nearestOnRoute(r, { x: 40, y: 30 });
    expect(a.dist).toBeCloseTo(30);
    expect(a.s).toBeCloseTo(40);
    expect(a.point).toEqual({ x: 40, y: 0 });
    const b = nearestOnRoute(r, { x: 130, y: 30 });
    expect(b.dist).toBeCloseTo(30);
    expect(b.s).toBeCloseTo(130);
    // auf der Bahn: Abstand 0
    expect(nearestOnRoute(r, { x: 100, y: 10 }).dist).toBeCloseTo(0);
    // jenseits des Endes: Endpunkt
    const c = nearestOnRoute(r, { x: 100, y: 90 });
    expect(c.s).toBeCloseTo(150);
    expect(c.dist).toBeCloseTo(40);
  });

  it('Bogen verläuft zwischen Start und Ende und weicht seitlich ab', () => {
    const a = { x: 0, y: 0 };
    const b = { x: 400, y: 0 };
    const pts = bezierPoints(a, b, 0.2);
    expect(pts[0]).toEqual(a);
    expect(pts[pts.length - 1].x).toBeCloseTo(400);
    const mid = pts[Math.floor(pts.length / 2)];
    expect(Math.abs(mid.y)).toBeCloseTo(0.2 * 400 * 0.5, 0); // Pfeilhöhe = halber Versatz des Kontrollpunkts
    const straight = bezierPoints(a, b, 0);
    for (const p of straight) expect(p.y).toBeCloseTo(0);
  });

  it('gültige Bahnen für alle Stufen: im Feld, lang genug, reproduzierbar', () => {
    const rng = createRng(17);
    const short = Math.min(F.maxX - F.minX, F.maxY - F.minY);
    for (let level = MIN_LEVEL; level <= MAX_LEVEL; level++) {
      for (let i = 0; i < 40; i++) {
        const r = makeRoute({ field: F, level }, rng);
        expect(r.length).toBeGreaterThan(short * 0.5);
        for (const p of r.pts) {
          expect(p.x).toBeGreaterThanOrEqual(F.minX - 1);
          expect(p.x).toBeLessThanOrEqual(F.maxX + 1);
          expect(p.y).toBeGreaterThanOrEqual(F.minY - 1);
          expect(p.y).toBeLessThanOrEqual(F.maxY + 1);
        }
      }
    }
    expect(makeRoute({ field: F, level: 9 }, createRng(5))).toEqual(makeRoute({ field: F, level: 9 }, createRng(5)));
  });

  it('kleines Feld (Handy hochkant) liefert ebenfalls eine Bahn', () => {
    const small = { minX: 14, maxX: 330, minY: 14, maxY: 580 };
    const rng = createRng(2);
    for (let level = 1; level <= MAX_LEVEL; level += 4) {
      const r = makeRoute({ field: small, level }, rng);
      expect(r.length).toBeGreaterThan(100);
    }
  });

  it('feste Bahn für den Film: gerade von A nach B', () => {
    const r = makeRoute({ field: F, level: 2, fixed: { ax: 0.1, ay: 0.3, bx: 0.9, by: 0.7 } }, createRng(1));
    const a = routePoint(r, 0);
    const b = routePoint(r, r.length);
    expect(a.x).toBeCloseTo(F.minX + 0.1 * (F.maxX - F.minX));
    expect(b.y).toBeCloseTo(F.minY + 0.7 * (F.maxY - F.minY));
    expect(r.length).toBeCloseTo(Math.hypot(b.x - a.x, b.y - a.y), 3);
  });
});

describe('in-die-bahn: Wertung', () => {
  it('Fehler in % der kürzeren Seite; Treffer in der Toleranz', () => {
    expect(errorPct(0, 700)).toBe(0);
    expect(errorPct(38.5, 700)).toBeCloseTo(5.5, 6);
    expect(isHit(HIT_TOL_PCT - 0.01, 700)).toBe(true);
    expect(isHit(HIT_TOL_PCT + 1, 700)).toBe(false);
    expect(isHit(NaN, 700)).toBe(false);
  });

  it('Trefferkreis nie kleiner als 28 px', () => {
    for (const short of [250, 400, 700, 1000]) expect((hitTolPct(short) / 100) * short).toBeGreaterThanOrEqual(28 - 1e-9);
  });

  it('Punkte nur bei Treffer, mehr bei höherer Stufe und genauerem Tipp', () => {
    expect(pointsFor(20, 3, 700)).toBe(0);
    expect(pointsFor(0, 1, 700)).toBeGreaterThan(pointsFor(5, 1, 700));
    expect(pointsFor(0, 12, 700)).toBeGreaterThan(pointsFor(0, 1, 700));
  });

  it('mittlere Abweichung ignoriert NaN', () => {
    expect(meanError([2, 6, NaN])).toBe(4);
    expect(Number.isNaN(meanError([NaN]))).toBe(true);
  });

  it('Autoplay-Ungenauigkeit streut um den Sollpunkt', () => {
    const rng = createRng(9);
    let sx = 0;
    for (let i = 0; i < 400; i++) sx += noisyTap({ x: 500, y: 400 }, 3, 700, rng).x - 500;
    expect(Math.abs(sx / 400)).toBeLessThan(6);
  });
});
