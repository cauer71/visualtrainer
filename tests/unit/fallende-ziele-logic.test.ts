import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  accelFor,
  advance,
  fallTimeFor,
  findHit,
  hitRadiusFor,
  levelInt,
  MAX_LEVEL,
  meanHeightPct,
  pickLane,
  pointsFor,
  radiusFor,
  simultaneousFor,
  stopChance,
  timeToGround,
} from '../../src/exercises/fallende-ziele/logic';

describe('fallende-ziele: Stufenfunktionen', () => {
  it('Fallzeit sinkt mit der Stufe und bleibt im Bereich', () => {
    expect(fallTimeFor(1)).toBeCloseTo(4.2, 5);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(fallTimeFor(l)).toBeLessThanOrEqual(fallTimeFor(l - 1));
    expect(fallTimeFor(MAX_LEVEL)).toBeGreaterThanOrEqual(1.25);
    expect(fallTimeFor(MAX_LEVEL)).toBeLessThan(1.6);
    expect(fallTimeFor(99)).toBe(fallTimeFor(MAX_LEVEL));
  });

  it('Beschleunigung erst ab Stufe 8, wächst nur bis zur Obergrenze', () => {
    expect(accelFor(1)).toBe(0);
    expect(accelFor(7)).toBe(0);
    expect(accelFor(8)).toBeGreaterThan(0);
    expect(accelFor(20)).toBeLessThanOrEqual(0.6);
  });

  it('Zielzahl gleichzeitig: 1 → 2 → 3', () => {
    expect(simultaneousFor(1)).toBe(1);
    expect(simultaneousFor(5.9)).toBe(1);
    expect(simultaneousFor(6)).toBe(2);
    expect(simultaneousFor(11)).toBe(2);
    expect(simultaneousFor(12)).toBe(3);
    expect(simultaneousFor(20)).toBe(3);
    expect(levelInt(0.2)).toBe(1);
    expect(levelInt(99)).toBe(MAX_LEVEL);
  });

  it('Zielgröße schrumpft mit der Stufe, der Trefferradius bleibt ≥ 26 px', () => {
    const u = 7.68; // iPad quer
    expect(radiusFor(1, u)).toBeGreaterThan(radiusFor(MAX_LEVEL, u));
    for (let l = 1; l <= MAX_LEVEL; l++) {
      expect(radiusFor(l, 3.6)).toBeGreaterThanOrEqual(20);
      expect(hitRadiusFor(radiusFor(l, 3.6))).toBeGreaterThanOrEqual(26);
      expect(hitRadiusFor(radiusFor(l, u))).toBeGreaterThan(radiusFor(l, u));
    }
  });

  it('Stör-Objekte erst ab Stufe 9, höchstens 35 %', () => {
    expect(stopChance(1)).toBe(0);
    expect(stopChance(8.9)).toBe(0);
    expect(stopChance(9)).toBeGreaterThan(0);
    expect(stopChance(MAX_LEVEL)).toBeLessThanOrEqual(0.35);
  });

  it('Punkte steigen mit der Stufe', () => {
    expect(pointsFor(1)).toBe(10);
    expect(pointsFor(6)).toBe(20);
  });
});

describe('fallende-ziele: Fallbewegung', () => {
  it('gleichmäßig: nach fallTime Sekunden ist p = 1, unabhängig von der Schrittweite', () => {
    for (const dt of [1 / 30, 1 / 60, 1 / 120]) {
      let p = 0;
      const n = Math.round(3 / dt);
      for (let i = 0; i < n; i++) p = advance(p, dt, 3, 0);
      expect(p).toBeCloseTo(1, 6);
    }
  });

  it('beschleunigt: Gesamtfallzeit bleibt erhalten, Schrittweite egal, unten schneller als oben', () => {
    const T = 2.5;
    const a = 0.5;
    let p60 = 0;
    for (let i = 0; i < 150; i++) p60 = advance(p60, 1 / 60, T, a);
    let p120 = 0;
    for (let i = 0; i < 300; i++) p120 = advance(p120, 1 / 120, T, a);
    expect(p60).toBeCloseTo(1, 6);
    expect(p120).toBeCloseTo(1, 6);
    const top = advance(0, 0.01, T, a) - 0;
    const bottom = advance(0.99, 0.01, T, a) - 0.99;
    expect(bottom / top).toBeCloseTo(1 + a * 0.99, 2);
    // Fortschritt ist monoton
    let p = 0;
    let last = 0;
    for (let i = 0; i < 100; i++) {
      p = advance(p, 0.02, T, a);
      expect(p).toBeGreaterThan(last);
      last = p;
    }
  });

  it('Restzeit bis zum Boden passt zur Bewegung', () => {
    for (const a of [0, 0.3, 0.6]) {
      expect(timeToGround(0, 2, a)).toBeCloseTo(2, 6);
      expect(timeToGround(1, 2, a)).toBe(0);
      const t = timeToGround(0.4, 2, a);
      expect(advance(0.4, t, 2, a)).toBeCloseTo(1, 6);
    }
  });

  it('dt = 0 ändert nichts', () => {
    expect(advance(0.3, 0, 2, 0.5)).toBe(0.3);
  });
});

describe('fallende-ziele: Bahnen und Treffer', () => {
  it('pickLane hält Mindestabstand ein, wenn Platz ist, und bleibt im Bereich', () => {
    const rng = createRng(7);
    for (let i = 0; i < 200; i++) {
      const occ = [0.2, 0.5];
      const lane = pickLane(() => rng.next(), occ, 0.15);
      expect(lane).toBeGreaterThanOrEqual(0.06);
      expect(lane).toBeLessThanOrEqual(0.94);
      for (const o of occ) expect(Math.abs(lane - o)).toBeGreaterThanOrEqual(0.15 - 1e-9);
    }
  });

  it('pickLane liefert auch bei Platzmangel eine gültige Bahn', () => {
    const rng = createRng(3);
    const lane = pickLane(() => rng.next(), [0.1, 0.3, 0.5, 0.7, 0.9], 0.6);
    expect(lane).toBeGreaterThanOrEqual(0.06);
    expect(lane).toBeLessThanOrEqual(0.94);
  });

  it('findHit wählt das nächstliegende Objekt im Trefferradius', () => {
    const items = [
      { x: 100, y: 100, hitR: 30 },
      { x: 140, y: 100, hitR: 30 },
    ];
    expect(findHit(items, 100, 100)).toBe(0);
    expect(findHit(items, 136, 100)).toBe(1);
    expect(findHit(items, 120, 100)).toBe(0); // gleich weit → erstes
    expect(findHit(items, 300, 300)).toBe(-1);
    expect(findHit([], 1, 1)).toBe(-1);
  });

  it('findHit: Trefferradius gilt je Objekt', () => {
    const items = [{ x: 0, y: 0, hitR: 10 }];
    expect(findHit(items, 9, 0)).toBe(0);
    expect(findHit(items, 11, 0)).toBe(-1);
  });

  it('meanHeightPct: Fang oben = hohe Höhe, Fang am Boden = 0', () => {
    expect(meanHeightPct([])).toBe(0);
    expect(meanHeightPct([0, 0])).toBe(100);
    expect(meanHeightPct([1, 1])).toBe(0);
    expect(meanHeightPct([0.25, 0.75])).toBe(50);
  });
});
