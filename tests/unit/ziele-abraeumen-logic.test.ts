import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  budgetMs,
  computeStats,
  countFor,
  freeSymbol,
  hitRadiusPx,
  levelOf,
  lifeMs,
  MAX_LEVEL,
  pickSpot,
  pointsFor,
  radiusPx,
  radiusU,
  ringFraction,
  spawnGapMs,
  SYMBOLS,
  tipFor,
} from '../../src/exercises/ziele-abraeumen/logic';

describe('ziele-abraeumen: Stufenfunktionen', () => {
  it('Anzahl steigt von 2 auf 5 und nie zurück', () => {
    expect(countFor(1)).toBe(2);
    expect(countFor(MAX_LEVEL)).toBe(5);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(countFor(l)).toBeGreaterThanOrEqual(countFor(l - 1));
    expect(countFor(-3)).toBe(2);
    expect(countFor(99)).toBe(5);
  });

  it('Zeit je Kreis sinkt von 1,8 s auf 0,6 s', () => {
    expect(budgetMs(1)).toBe(1800);
    expect(budgetMs(MAX_LEVEL)).toBe(600);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(budgetMs(l)).toBeLessThanOrEqual(budgetMs(l - 1));
    expect(levelOf(3.9)).toBe(3);
  });

  it('Lebensdauer = Anzahl × Zeit je Kreis, nie unter 3 s', () => {
    for (let l = 1; l <= MAX_LEVEL; l++) {
      expect(lifeMs(l)).toBe(countFor(l) * budgetMs(l));
      expect(lifeMs(l)).toBeGreaterThanOrEqual(3000);
    }
  });

  it('Radius schrumpft, bleibt aber mindestens 16 px und der Trefferradius mindestens 24 px', () => {
    expect(radiusU(1)).toBeCloseTo(7.2);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(radiusU(l)).toBeLessThanOrEqual(radiusU(l - 1));
    for (const u of [2, 4, 7, 10]) {
      for (let l = 1; l <= MAX_LEVEL; l++) {
        const r = radiusPx(l, u);
        expect(r).toBeGreaterThanOrEqual(16);
        expect(hitRadiusPx(r)).toBeGreaterThanOrEqual(24);
        expect(hitRadiusPx(r)).toBeGreaterThanOrEqual(r);
      }
    }
  });

  it('Nachschub-Pause liegt zwischen 280 und 620 ms', () => {
    const rng = createRng(5);
    for (let i = 0; i < 200; i++) {
      const g = spawnGapMs(rng);
      expect(g).toBeGreaterThanOrEqual(280);
      expect(g).toBeLessThan(620);
    }
  });

  it('Ring: 1 am Anfang, 0 am Ende, nie außerhalb', () => {
    expect(ringFraction(0, 3000)).toBe(1);
    expect(ringFraction(1500, 3000)).toBeCloseTo(0.5);
    expect(ringFraction(3000, 3000)).toBe(0);
    expect(ringFraction(9000, 3000)).toBe(0);
    expect(ringFraction(-50, 3000)).toBe(1);
  });
});

describe('ziele-abraeumen: Platzwahl', () => {
  it('bleibt im Feld und hält Abstand zu den anderen, wenn Platz ist', () => {
    const rng = createRng(21);
    const fw = 900;
    const fh = 520;
    const r = 30;
    for (let run = 0; run < 50; run++) {
      const others: Array<{ nx: number; ny: number }> = [];
      for (let k = 0; k < 4; k++) {
        const s = pickSpot(rng, fw, fh, r, others);
        expect(s.nx * fw).toBeGreaterThanOrEqual(r * 1.5 - 1e-6);
        expect(s.nx * fw).toBeLessThanOrEqual(fw - r * 1.5 + 1e-6);
        expect(s.ny * fh).toBeGreaterThanOrEqual(r * 1.5 - 1e-6);
        expect(s.ny * fh).toBeLessThanOrEqual(fh - r * 1.5 + 1e-6);
        for (const o of others) expect(Math.hypot((s.nx - o.nx) * fw, (s.ny - o.ny) * fh)).toBeGreaterThanOrEqual(r * 3 - 1e-6);
        others.push(s);
      }
    }
  });

  it('liefert auch bei engem Feld einen gültigen Ort (nächst-bester Kandidat)', () => {
    const rng = createRng(3);
    const others = [
      { nx: 0.3, ny: 0.5 },
      { nx: 0.7, ny: 0.5 },
    ];
    const s = pickSpot(rng, 120, 90, 30, others);
    expect(s.nx).toBeGreaterThanOrEqual(0);
    expect(s.nx).toBeLessThanOrEqual(1);
    expect(s.ny).toBeGreaterThanOrEqual(0);
    expect(s.ny).toBeLessThanOrEqual(1);
    // Feld kleiner als der Randabstand: Mitte
    const c = pickSpot(rng, 40, 40, 30, []);
    expect(c.nx).toBeCloseTo(0.5);
    expect(c.ny).toBeCloseTo(0.5);
  });

  it('ist bei gleichem Startwert reproduzierbar', () => {
    const a = pickSpot(createRng(9), 800, 500, 30, []);
    const b = pickSpot(createRng(9), 800, 500, 30, []);
    expect(a).toEqual(b);
  });

  it('vergibt unterschiedliche Symbole, solange Platz ist', () => {
    const used: number[] = [];
    for (let i = 0; i < SYMBOLS; i++) used.push(freeSymbol(used));
    expect(new Set(used).size).toBe(SYMBOLS);
    expect(freeSymbol([0, 2])).toBe(1);
    expect(freeSymbol([0, 1, 2, 3, 4])).toBeLessThan(SYMBOLS);
  });
});

describe('ziele-abraeumen: Wertung', () => {
  it('Punkte steigen mit Stufe und Restzeit', () => {
    expect(pointsFor(1, 0)).toBe(10);
    expect(pointsFor(1, 1)).toBe(20);
    expect(pointsFor(5, 0.5)).toBeGreaterThan(pointsFor(1, 0.5));
    expect(pointsFor(1, 5)).toBe(20);
  });

  it('Kennzahlen: Median der Abstände erst ab 2 Werten', () => {
    expect(computeStats(3, 1, 0, [900]).medianMs).toBeNaN();
    const s = computeStats(6, 2, 1, [800, 1200, 1000]);
    expect(s.medianMs).toBe(1000);
    expect(s.clearRate).toBeCloseTo(75);
    expect(computeStats(0, 0, 0, []).clearRate).toBe(0);
  });

  it('Tipp: daneben, verpasst oder stark', () => {
    expect(tipFor(computeStats(10, 1, 4, []))).toBe('wrong');
    expect(tipFor(computeStats(10, 4, 1, []))).toBe('missed');
    expect(tipFor(computeStats(10, 4, 4, []))).toBe('wrong');
    expect(tipFor(computeStats(10, 1, 1, []))).toBe('great');
  });
});
