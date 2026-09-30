import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  buildTiers,
  computeStats,
  countFor,
  currentTier,
  hitRadiusPx,
  isCorrectTap,
  levelOf,
  MAX_LEVEL,
  perTargetMs,
  pickSpots,
  pointsFor,
  radiusPx,
  radiusU,
  remainingByTier,
  roundMs,
  tipFor,
  type Tier,
} from '../../src/exercises/zielauswahl/logic';

describe('zielauswahl: Stufenfunktionen', () => {
  it('Anzahl steigt von 3 auf 8 und nie zurück', () => {
    expect(countFor(1)).toBe(3);
    expect(countFor(MAX_LEVEL)).toBe(8);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(countFor(l)).toBeGreaterThanOrEqual(countFor(l - 1));
    expect(countFor(-4)).toBe(3);
    expect(countFor(99)).toBe(8);
    expect(levelOf(4.9)).toBe(4);
  });

  it('Zeit je Ziel sinkt, die Rundenzeit bleibt mindestens 5 s und höchstens 10 s', () => {
    expect(perTargetMs(1)).toBe(1700);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(perTargetMs(l)).toBeLessThan(perTargetMs(l - 1));
    for (let l = 1; l <= MAX_LEVEL; l++) {
      expect(roundMs(l)).toBeGreaterThanOrEqual(5000);
      expect(roundMs(l)).toBeLessThanOrEqual(10000);
      expect(perTargetMs(l)).toBeGreaterThanOrEqual(800);
    }
  });

  it('Größe: nie unter 26 px sichtbar, Trefferradius nie unter 24 px und über dem sichtbaren Radius', () => {
    for (let l = 1; l <= MAX_LEVEL; l++) {
      expect(radiusU(l)).toBeGreaterThanOrEqual(4);
      for (const u of [3, 5, 8, 12]) {
        const r = radiusPx(l, u);
        expect(r).toBeGreaterThanOrEqual(26);
        expect(hitRadiusPx(r)).toBeGreaterThanOrEqual(28);
        expect(hitRadiusPx(r)).toBeGreaterThan(r);
      }
    }
  });
});

describe('zielauswahl: Dringlichkeiten', () => {
  it('jede Dringlichkeit kommt vor, Anzahl stimmt, keine beherrscht die Runde', () => {
    const rng = createRng(42);
    for (let l = 1; l <= MAX_LEVEL; l++) {
      const n = countFor(l);
      for (let k = 0; k < 60; k++) {
        const tiers = buildTiers(rng, n);
        expect(tiers).toHaveLength(n);
        const c = [0, 1, 2].map((t) => tiers.filter((x) => x === t).length);
        for (const v of c) {
          expect(v).toBeGreaterThanOrEqual(1);
          expect(v).toBeLessThanOrEqual(Math.max(1, n - 2));
        }
      }
    }
  });

  it('Reihenfolge: hoch vor mittel vor niedrig, innerhalb einer Dringlichkeit beliebig', () => {
    const tiers: Tier[] = [2, 0, 1, 1, 0];
    const done = [false, false, false, false, false];
    let rem = remainingByTier(tiers, done);
    expect(rem).toEqual([2, 2, 1]);
    expect(currentTier(rem)).toBe(0);
    expect(isCorrectTap(0, rem)).toBe(true);
    expect(isCorrectTap(1, rem)).toBe(false);
    expect(isCorrectTap(2, rem)).toBe(false);
    done[1] = true;
    done[4] = true;
    rem = remainingByTier(tiers, done);
    expect(rem).toEqual([0, 2, 1]);
    expect(currentTier(rem)).toBe(1);
    expect(isCorrectTap(1, rem)).toBe(true);
    expect(isCorrectTap(2, rem)).toBe(false);
    expect(isCorrectTap(0, rem)).toBe(false);
    done[2] = true;
    done[3] = true;
    rem = remainingByTier(tiers, done);
    expect(currentTier(rem)).toBe(2);
    expect(isCorrectTap(2, rem)).toBe(true);
    done[0] = true;
    expect(currentTier(remainingByTier(tiers, done))).toBe(-1);
  });
});

describe('zielauswahl: Orte', () => {
  it('liegen im Feld und haben Abstand, wenn Platz ist', () => {
    const rng = createRng(3);
    const fw = 900;
    const fh = 420;
    for (let l = 1; l <= MAX_LEVEL; l += 2) {
      const r = radiusPx(l, 8);
      const n = countFor(l);
      for (let k = 0; k < 30; k++) {
        const spots = pickSpots(rng, fw, fh, r, n);
        expect(spots).toHaveLength(n);
        for (const s of spots) {
          expect(s.nx * fw).toBeGreaterThanOrEqual(r);
          expect(s.nx * fw).toBeLessThanOrEqual(fw - r);
          expect(s.ny * fh).toBeGreaterThanOrEqual(r);
          expect(s.ny * fh).toBeLessThanOrEqual(fh - r);
        }
        let minD = Infinity;
        for (let i = 0; i < n; i++)
          for (let j = i + 1; j < n; j++) minD = Math.min(minD, Math.hypot((spots[i].nx - spots[j].nx) * fw, (spots[i].ny - spots[j].ny) * fh));
        expect(minD).toBeGreaterThan(r * 1.6);
      }
    }
  });
});

describe('zielauswahl: Wertung', () => {
  it('Punkte steigen mit der Stufe', () => {
    expect(pointsFor(1)).toBe(10);
    expect(pointsFor(12)).toBeGreaterThan(pointsFor(1));
  });

  it('Statistik: richtige Reihenfolge in %, Median erst ab zwei Werten', () => {
    const s = computeStats(18, 2, 1, 7, 10, [800, 900, 1000]);
    expect(s.orderPct).toBeCloseTo(90, 6);
    expect(s.medianMs).toBe(900);
    expect(s.roundsOk).toBe(7);
    expect(Number.isNaN(computeStats(1, 0, 0, 1, 1, [500]).medianMs)).toBe(true);
    expect(computeStats(0, 0, 0, 0, 0, []).orderPct).toBe(100);
  });

  it('Tipp-Schlüssel', () => {
    expect(tipFor(computeStats(10, 4, 1, 3, 10, []))).toBe('order');
    expect(tipFor(computeStats(10, 0, 4, 3, 10, []))).toBe('slow');
    expect(tipFor(computeStats(20, 1, 1, 9, 10, []))).toBe('great');
  });
});
