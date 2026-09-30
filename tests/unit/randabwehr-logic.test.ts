import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  angleGap,
  caughtPct,
  dotPos,
  edgeDistance,
  findHit,
  flightSecondsFor,
  hitRadiusFor,
  levelInt,
  MAX_LEVEL,
  MIN_LEVEL,
  pickAngle,
  pointsFor,
  radiusFor,
  simultaneousFor,
  spawnGapSecondsFor,
  zoneRadiusFor,
} from '../../src/exercises/randabwehr/logic';

describe('randabwehr: Stufenfunktionen', () => {
  it('Flugzeit sinkt mit der Stufe und bleibt im Bereich', () => {
    expect(flightSecondsFor(1)).toBeCloseTo(4.0, 5);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(flightSecondsFor(l)).toBeLessThanOrEqual(flightSecondsFor(l - 1));
    expect(flightSecondsFor(MAX_LEVEL)).toBeGreaterThanOrEqual(1.4);
    expect(flightSecondsFor(MAX_LEVEL)).toBeLessThan(1.6);
    expect(flightSecondsFor(99)).toBe(flightSecondsFor(MAX_LEVEL));
  });

  it('Zahl gleichzeitiger Punkte: 1 → 2 → 3 → 4', () => {
    expect(simultaneousFor(1)).toBe(1);
    expect(simultaneousFor(3.9)).toBe(1);
    expect(simultaneousFor(4)).toBe(2);
    expect(simultaneousFor(7)).toBe(2);
    expect(simultaneousFor(8)).toBe(3);
    expect(simultaneousFor(12)).toBe(3);
    expect(simultaneousFor(13)).toBe(4);
    expect(simultaneousFor(20)).toBe(4);
    expect(levelInt(0.2)).toBe(MIN_LEVEL);
    expect(levelInt(99)).toBe(MAX_LEVEL);
  });

  it('Abstand neuer Punkte sinkt, Größe schrumpft, Trefferradius bleibt ≥ 28 px', () => {
    for (let l = 2; l <= MAX_LEVEL; l++) expect(spawnGapSecondsFor(l)).toBeLessThanOrEqual(spawnGapSecondsFor(l - 1));
    expect(spawnGapSecondsFor(MAX_LEVEL)).toBeGreaterThanOrEqual(0.65);
    const u = 7.68;
    expect(radiusFor(1, u)).toBeGreaterThan(radiusFor(MAX_LEVEL, u));
    for (let l = 1; l <= MAX_LEVEL; l++) {
      for (const uu of [3.6, 5, 7.68, 9]) {
        expect(radiusFor(l, uu)).toBeGreaterThanOrEqual(18);
        expect(hitRadiusFor(radiusFor(l, uu))).toBeGreaterThanOrEqual(28);
        expect(hitRadiusFor(radiusFor(l, uu))).toBeGreaterThan(radiusFor(l, uu));
      }
    }
  });

  it('Mitte-Zone ist groß genug zum Erkennen', () => {
    expect(zoneRadiusFor(3.6)).toBeGreaterThanOrEqual(34);
    expect(zoneRadiusFor(10)).toBe(70);
  });

  it('Punkte: mehr bei höherer Stufe und wenn der Punkt noch weit außen war', () => {
    expect(pointsFor(10, 0.2)).toBeGreaterThan(pointsFor(10, 0.9));
    expect(pointsFor(15, 0.5)).toBeGreaterThan(pointsFor(2, 0.5));
    expect(pointsFor(1, 5)).toBe(pointsFor(1, 1));
  });
});

describe('randabwehr: Geometrie', () => {
  const field = { minX: 20, maxX: 1160, minY: 20, maxY: 700 };
  const c = { x: 590, y: 360 };

  it('Abstand zum Rand in die vier Hauptrichtungen', () => {
    expect(edgeDistance(c, 0, field)).toBeCloseTo(570);
    expect(edgeDistance(c, Math.PI, field)).toBeCloseTo(570);
    expect(edgeDistance(c, Math.PI / 2, field)).toBeCloseTo(340);
    expect(edgeDistance(c, -Math.PI / 2, field)).toBeCloseTo(340);
  });

  it('Start aller Richtungen liegt auf dem Feldrand', () => {
    for (let i = 0; i < 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      const d = edgeDistance(c, a, field);
      const x = c.x + Math.cos(a) * d;
      const y = c.y + Math.sin(a) * d;
      expect(x).toBeGreaterThanOrEqual(field.minX - 1e-6);
      expect(x).toBeLessThanOrEqual(field.maxX + 1e-6);
      expect(y).toBeGreaterThanOrEqual(field.minY - 1e-6);
      expect(y).toBeLessThanOrEqual(field.maxY + 1e-6);
      const onEdge = Math.abs(x - field.minX) < 1e-6 || Math.abs(x - field.maxX) < 1e-6 || Math.abs(y - field.minY) < 1e-6 || Math.abs(y - field.maxY) < 1e-6;
      expect(onEdge).toBe(true);
    }
  });

  it('Punkt läuft gerade von d0 bis zum Zonenrand', () => {
    const a = 0.7;
    const p0 = dotPos(c, a, 500, 60, 0);
    const p1 = dotPos(c, a, 500, 60, 1);
    const pm = dotPos(c, a, 500, 60, 0.5);
    expect(Math.hypot(p0.x - c.x, p0.y - c.y)).toBeCloseTo(500);
    expect(Math.hypot(p1.x - c.x, p1.y - c.y)).toBeCloseTo(60);
    expect(Math.hypot(pm.x - c.x, pm.y - c.y)).toBeCloseTo(280);
    // Richtung bleibt gleich
    expect(Math.atan2(pm.y - c.y, pm.x - c.x)).toBeCloseTo(a);
    // p wird begrenzt
    expect(dotPos(c, a, 500, 60, 7)).toEqual(p1);
  });

  it('angleGap ist symmetrisch und höchstens π', () => {
    expect(angleGap(0.1, 6.2)).toBeCloseTo(2 * Math.PI - 6.1);
    expect(angleGap(1, 2)).toBeCloseTo(1);
    expect(angleGap(2, 1)).toBeCloseTo(1);
    for (let i = 0; i < 50; i++) expect(angleGap(i * 0.7, i * 1.9)).toBeLessThanOrEqual(Math.PI + 1e-9);
  });

  it('pickAngle hält Abstand zu besetzten Richtungen, wenn möglich', () => {
    const rng = createRng(4);
    const occ = [0, 2, 4];
    for (let i = 0; i < 100; i++) {
      const a = pickAngle(() => rng.next(), occ, 0.6);
      expect(Math.min(...occ.map((o) => angleGap(o, a)))).toBeGreaterThanOrEqual(0.6 - 1e-9);
    }
    // alles besetzt: trotzdem ein gültiger Winkel
    const full = Array.from({ length: 12 }, (_, i) => (i / 12) * Math.PI * 2);
    const a = pickAngle(() => rng.next(), full, 1.2);
    expect(a).toBeGreaterThanOrEqual(0);
    expect(a).toBeLessThan(Math.PI * 2);
  });
});

describe('randabwehr: Treffer', () => {
  it('findHit: nächstliegendes innerhalb des Trefferradius', () => {
    const items = [
      { x: 100, y: 100, hitR: 30 },
      { x: 130, y: 100, hitR: 30 },
    ];
    expect(findHit(items, 100, 100)).toBe(0);
    expect(findHit(items, 128, 100)).toBe(1);
    expect(findHit(items, 300, 300)).toBe(-1);
    expect(findHit([], 1, 1)).toBe(-1);
  });

  it('gefangen in %: 0 ohne Entscheidung, sonst gerundeter Anteil', () => {
    expect(caughtPct(0, 0)).toBe(0);
    expect(caughtPct(3, 1)).toBe(75);
    expect(caughtPct(1, 2)).toBe(33);
    expect(caughtPct(5, 0)).toBe(100);
  });
});
