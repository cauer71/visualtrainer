import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  computeStats,
  countFor,
  firstLifeMs,
  hitRadiusPx,
  isInOrder,
  levelOf,
  lifespans,
  lifeStepMs,
  MAX_LEVEL,
  MIN_RADIUS_U,
  ORDER_TOLERANCE,
  placeTargets,
  pointsFor,
  radiusU,
  roundGapMs,
  shrinkRateU,
  smallestIndex,
  startRadiusU,
  tipFor,
} from '../../src/exercises/schrumpfende-ziele/logic';

describe('schrumpfende-ziele: Stufenfunktionen', () => {
  it('Anzahl steigt von 2 auf 5', () => {
    expect(countFor(1)).toBe(2);
    expect(countFor(4)).toBe(2);
    expect(countFor(5)).toBe(3);
    expect(countFor(MAX_LEVEL)).toBe(5);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(countFor(l)).toBeGreaterThanOrEqual(countFor(l - 1));
    expect(countFor(-4)).toBe(2);
    expect(countFor(99)).toBe(5);
  });

  it('Tempo steigt, Lebensdauer und Abstand der Lebensdauern sinken', () => {
    for (let l = 2; l <= MAX_LEVEL; l++) {
      expect(shrinkRateU(l)).toBeGreaterThan(shrinkRateU(l - 1));
      expect(firstLifeMs(l)).toBeLessThanOrEqual(firstLifeMs(l - 1));
      expect(lifeStepMs(l)).toBeLessThanOrEqual(lifeStepMs(l - 1));
    }
    expect(firstLifeMs(1)).toBe(2300);
    expect(firstLifeMs(MAX_LEVEL)).toBeGreaterThanOrEqual(1100);
    expect(lifeStepMs(MAX_LEVEL)).toBeGreaterThanOrEqual(420);
    expect(levelOf(2.99)).toBe(2);
  });

  it('Lebensdauern sind streng aufsteigend und jeder Kreis lässt Zeit zum Tippen', () => {
    for (let l = 1; l <= MAX_LEVEL; l++) {
      const ls = lifespans(l);
      expect(ls.length).toBe(countFor(l));
      for (let i = 1; i < ls.length; i++) expect(ls[i]).toBeGreaterThan(ls[i - 1]);
      // Zeit je Tipp, wenn man in der richtigen Reihenfolge tippt: mindestens ≈ 0,42 s
      for (let i = 0; i < ls.length; i++) expect(ls[i] / (i + 1)).toBeGreaterThanOrEqual(420);
    }
  });
});

describe('schrumpfende-ziele: Größe = Dringlichkeit', () => {
  it('kleinster Kreis verschwindet zuerst: Größe und Lebensdauer haben dieselbe Reihenfolge', () => {
    for (let l = 1; l <= MAX_LEVEL; l++) {
      const ls = lifespans(l);
      const r0 = ls.map((x) => startRadiusU(shrinkRateU(l), x));
      for (let i = 1; i < r0.length; i++) expect(r0[i]).toBeGreaterThan(r0[i - 1]);
      // Reihenfolge der Größe bleibt zu jedem Zeitpunkt, solange die Kreise leben
      for (let age = 0; age < ls[0]; age += 50) {
        const r = ls.map((x) => radiusU(shrinkRateU(l), x, age));
        for (let i = 1; i < r.length; i++) expect(r[i]).toBeGreaterThan(r[i - 1]);
      }
    }
  });

  it('Radius erreicht den Mindestradius genau am Ende der Lebensdauer', () => {
    const rate = shrinkRateU(5);
    const life = lifespans(5)[1];
    expect(radiusU(rate, life, 0)).toBeCloseTo(startRadiusU(rate, life), 9);
    expect(radiusU(rate, life, life)).toBeCloseTo(MIN_RADIUS_U, 9);
    expect(radiusU(rate, life, life * 3)).toBeCloseTo(MIN_RADIUS_U, 9);
    expect(radiusU(rate, life, life / 2)).toBeCloseTo((startRadiusU(rate, life) + MIN_RADIUS_U) / 2, 9);
  });

  it('Schrumpftempo ist bei allen Kreisen einer Runde gleich (u/s) und hängt nur an der Zeit', () => {
    const l = 9;
    for (const life of lifespans(l)) {
      const a = radiusU(shrinkRateU(l), life, 100);
      const b = radiusU(shrinkRateU(l), life, 600);
      expect((a - b) / 0.5).toBeCloseTo(shrinkRateU(l), 6);
    }
  });

  it('Größenunterschied benachbarter Kreise ist am Start mindestens ≈ 12 %', () => {
    for (let l = 1; l <= MAX_LEVEL; l++) {
      const r = lifespans(l).map((x) => startRadiusU(shrinkRateU(l), x));
      for (let i = 1; i < r.length; i++) expect(r[i] / r[i - 1]).toBeGreaterThan(1.12);
    }
  });

  it('Trefferfläche nie unter 24 px und größer als das sichtbare Ziel', () => {
    expect(hitRadiusPx(3)).toBe(24);
    expect(hitRadiusPx(60)).toBe(68);
  });
});

describe('schrumpfende-ziele: Reihenfolge', () => {
  it('kleinster Index', () => {
    expect(smallestIndex([])).toBe(-1);
    expect(smallestIndex([30, 12, 50])).toBe(1);
  });

  it('in Reihenfolge = praktisch der kleinste', () => {
    expect(isInOrder([30, 12, 50], 1)).toBe(true);
    expect(isInOrder([30, 12, 50], 0)).toBe(false);
    expect(isInOrder([30, 12, 50], 2)).toBe(false);
    // fast gleich groß: beides zählt
    expect(isInOrder([30, 30 * ORDER_TOLERANCE * 0.99], 1)).toBe(true);
    expect(isInOrder([30, 30 * ORDER_TOLERANCE * 1.02], 1)).toBe(false);
    expect(isInOrder([30], 4)).toBe(false);
    expect(isInOrder([30], -1)).toBe(false);
  });

  it('Punkte: Reihenfolge gibt Bonus, Stufe gibt mehr', () => {
    expect(pointsFor(1, true)).toBe(pointsFor(1, false) + 5);
    expect(pointsFor(8, false)).toBeGreaterThan(pointsFor(1, false));
  });
});

describe('schrumpfende-ziele: Platzierung', () => {
  it('Kreise liegen im Feld und überlappen sich auf großem Feld nicht', () => {
    const rng = createRng(5);
    const fw = 1100;
    const fh = 560;
    for (const l of [1, 5, 9, 13, 16]) {
      for (let rep = 0; rep < 40; rep++) {
        const radii = lifespans(l).map((x) => startRadiusU(shrinkRateU(l), x) * 7.7);
        const spots = placeTargets(rng, fw, fh, radii, 10, null, 0);
        expect(spots.length).toBe(radii.length);
        spots.forEach((s, i) => {
          expect(s.nx * fw).toBeGreaterThanOrEqual(radii[i] * 1.15 - 1e-6);
          expect(s.nx * fw).toBeLessThanOrEqual(fw - radii[i] * 1.15 + 1e-6);
          expect(s.ny * fh).toBeGreaterThanOrEqual(radii[i] * 1.15 - 1e-6);
          expect(s.ny * fh).toBeLessThanOrEqual(fh - radii[i] * 1.15 + 1e-6);
        });
        let overlaps = 0;
        for (let i = 0; i < spots.length; i++)
          for (let j = i + 1; j < spots.length; j++) {
            const d = Math.hypot((spots[i].nx - spots[j].nx) * fw, (spots[i].ny - spots[j].ny) * fh);
            if (d < radii[i] + radii[j]) overlaps++;
          }
        expect(overlaps).toBe(0);
      }
    }
  });

  it('hält Abstand zum zuletzt getippten Punkt, wenn Platz ist', () => {
    const rng = createRng(9);
    const avoid = { x: 550, y: 280 };
    for (let rep = 0; rep < 50; rep++) {
      const spots = placeTargets(rng, 1100, 560, [40, 50], 10, avoid, 160);
      for (const s of spots) expect(Math.hypot(s.nx * 1100 - avoid.x, s.ny * 560 - avoid.y)).toBeGreaterThanOrEqual(150);
    }
  });

  it('kommt mit winzigem Feld klar (kein NaN)', () => {
    const rng = createRng(2);
    const spots = placeTargets(rng, 0, 0, [40, 50, 60], 10, null, 0);
    for (const s of spots) expect(Number.isFinite(s.nx) && Number.isFinite(s.ny)).toBe(true);
    const s2 = placeTargets(rng, 50, 30, [40, 50, 60], 10, { x: 25, y: 15 }, 200);
    for (const s of s2) expect(Number.isFinite(s.nx) && Number.isFinite(s.ny)).toBe(true);
  });

  it('Pause zwischen Runden', () => {
    const rng = createRng(1);
    for (let i = 0; i < 50; i++) {
      const g = roundGapMs(rng);
      expect(g).toBeGreaterThanOrEqual(650);
      expect(g).toBeLessThan(1000);
    }
  });
});

describe('schrumpfende-ziele: Auswertung', () => {
  it('Reihenfolge-Quote erst ab 3 Tipps, sonst NaN', () => {
    expect(Number.isNaN(computeStats([true, true], 0, 0).orderRate)).toBe(true);
    const s = computeStats([true, true, false, true], 1, 2);
    expect(s.orderRate).toBeCloseTo(75, 6);
    expect(s.cleared).toBe(4);
    expect(s.vanished).toBe(1);
  });

  it('Tipp-Schlüssel', () => {
    expect(tipFor(computeStats([true, false, false, true], 0, 0))).toBe('order');
    expect(tipFor(computeStats([true, true, true, true], 4, 0))).toBe('gone');
    expect(tipFor(computeStats([true, true, true, true], 0, 5))).toBe('wrong');
    expect(tipFor(computeStats([true, true, true, true], 0, 0))).toBe('great');
    expect(tipFor(computeStats([], 0, 0))).toBe('great');
  });
});

