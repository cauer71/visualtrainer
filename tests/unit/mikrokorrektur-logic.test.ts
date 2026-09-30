import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  anchorRadiusPx,
  computeStats,
  distanceU,
  fits,
  followRadiusPx,
  followRadiusU,
  levelOf,
  MAX_LEVEL,
  MIN_FOLLOW_R,
  offsetPct,
  pickAnchor,
  pickFollow,
  pointsFor,
  tipFor,
  visibleMs,
} from '../../src/exercises/mikrokorrektur/logic';

describe('mikrokorrektur: Stufenfunktionen', () => {
  it('Nachziel wird kleiner, Abstand größer, Sichtzeit kürzer', () => {
    expect(followRadiusU(1)).toBeCloseTo(4.6, 6);
    expect(followRadiusU(MAX_LEVEL)).toBeCloseTo(2.4, 6);
    for (let l = 2; l <= MAX_LEVEL; l++) {
      expect(followRadiusU(l)).toBeLessThanOrEqual(followRadiusU(l - 1));
      expect(distanceU(l)).toBeGreaterThan(distanceU(l - 1));
      expect(visibleMs(l)).toBeLessThan(visibleMs(l - 1));
    }
    expect(visibleMs(1)).toBe(2200);
    expect(visibleMs(MAX_LEVEL)).toBeGreaterThanOrEqual(850);
    expect(levelOf(0)).toBe(1);
    expect(levelOf(50)).toBe(MAX_LEVEL);
  });

  it('Trefferfläche = sichtbares Ziel und nie unter 24 px; Anker immer größer als das Nachziel', () => {
    for (const u of [3, 5, 8, 10, 14]) {
      for (let l = 1; l <= MAX_LEVEL; l++) {
        expect(followRadiusPx(l, u)).toBeGreaterThanOrEqual(MIN_FOLLOW_R);
        expect(anchorRadiusPx(u)).toBeGreaterThan(followRadiusPx(l, u));
      }
    }
    expect(MIN_FOLLOW_R).toBe(24);
  });
});

describe('mikrokorrektur: Orte', () => {
  const b = { x0: 10, y0: 60, x1: 1010, y1: 700 };

  it('Nachziel liegt immer im Feld und hat den verlangten Abstand (auch am Rand und in Ecken)', () => {
    const rng = createRng(17);
    const u = 7;
    const ar = anchorRadiusPx(u);
    for (let l = 1; l <= MAX_LEVEL; l++) {
      const r = followRadiusPx(l, u);
      const dist = distanceU(l) * u;
      for (let k = 0; k < 200; k++) {
        const a = pickAnchor(rng, b, ar, null, 0);
        const f = pickFollow(rng, a, dist, r, ar, b);
        expect(fits(f, r, b)).toBe(true);
        expect(Math.hypot(f.x - a.x, f.y - a.y)).toBeCloseTo(Math.max(dist, ar + r + 8), 3);
        expect(Math.hypot(f.x - a.x, f.y - a.y)).toBeGreaterThan(ar + r);
      }
      // Ecke: nur ein Viertel der Richtungen ist frei
      const corner = { x: b.x0 + ar + 8, y: b.y0 + ar + 8 };
      for (let k = 0; k < 50; k++) {
        const f = pickFollow(rng, corner, dist, r, ar, b);
        expect(fits(f, r, b)).toBe(true);
      }
    }
  });

  it('Richtung ist unvorhersehbar: alle vier Quadranten kommen vor', () => {
    const rng = createRng(9);
    const u = 7;
    const a = { x: 500, y: 380 };
    const seen = new Set<string>();
    for (let k = 0; k < 400; k++) {
      const f = pickFollow(rng, a, 11 * u, 32, 42, b);
      seen.add(`${f.x > a.x}${f.y > a.y}`);
    }
    expect(seen.size).toBe(4);
  });

  it('Notfall: auch in einem winzigen Feld kommt ein Punkt im Feld heraus', () => {
    const rng = createRng(2);
    const tiny = { x0: 0, y0: 0, x1: 120, y1: 90 };
    const f = pickFollow(rng, { x: 60, y: 45 }, 150, 24, 40, tiny);
    expect(Number.isFinite(f.x)).toBe(true);
    expect(Number.isFinite(f.y)).toBe(true);
    expect(f.x).toBeGreaterThanOrEqual(0);
    expect(f.x).toBeLessThanOrEqual(120);
  });

  it('Anker hält Abstand zum letzten Nachziel, wenn Platz ist', () => {
    const rng = createRng(4);
    const prev = { x: 500, y: 380 };
    for (let k = 0; k < 100; k++) {
      const a = pickAnchor(rng, b, 42, prev, 120);
      expect(Math.hypot(a.x - prev.x, a.y - prev.y)).toBeGreaterThanOrEqual(120);
      expect(a.x).toBeGreaterThanOrEqual(b.x0 + 42);
      expect(a.y).toBeLessThanOrEqual(b.y1 - 42);
    }
  });
});

describe('mikrokorrektur: Wertung', () => {
  it('Abstand zur Mitte in % des Radius', () => {
    expect(offsetPct({ x: 10, y: 10 }, { x: 10, y: 10 }, 30)).toBe(0);
    expect(offsetPct({ x: 40, y: 10 }, { x: 10, y: 10 }, 30)).toBeCloseTo(100, 6);
    expect(offsetPct({ x: 25, y: 10 }, { x: 10, y: 10 }, 30)).toBeCloseTo(50, 6);
  });

  it('Punkte: Mitte bringt mehr als Rand, höhere Stufe mehr', () => {
    expect(pointsFor(3, 0)).toBeGreaterThan(pointsFor(3, 90));
    expect(pointsFor(9, 50)).toBeGreaterThan(pointsFor(2, 50));
  });

  it('Statistik und Tipp', () => {
    const s = computeStats(10, 3, 3, [600, 700, 800], [20, 40, 60]);
    expect(s.rounds).toBe(16);
    expect(s.hitRate).toBeCloseTo(62.5, 6);
    expect(s.medianMs).toBe(700);
    expect(s.medianOffset).toBe(40);
    expect(Number.isNaN(computeStats(0, 2, 2, [], []).medianMs)).toBe(true);
    expect(tipFor(computeStats(8, 5, 1, [], []))).toBe('miss');
    expect(tipFor(computeStats(8, 1, 5, [], []))).toBe('slow');
    expect(tipFor(computeStats(14, 1, 1, [], []))).toBe('great');
  });
});
