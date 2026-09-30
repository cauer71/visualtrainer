import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  computeStats,
  deadlineMs,
  keyCountFor,
  keyLayout,
  KEY_TYPES,
  levelOf,
  MAX_LEVEL,
  MIN_KEY_PX,
  nextStimulus,
  pointsFor,
  SHUFFLE_FROM,
  shuffleFor,
  slotOrder,
  tipFor,
} from '../../src/exercises/tasten-wahl/logic';

describe('tasten-wahl: Stufenfunktionen', () => {
  it('Tastenzahl steigt von 2 auf 4 und nie zurück', () => {
    expect(keyCountFor(1)).toBe(2);
    expect(keyCountFor(MAX_LEVEL)).toBe(4);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(keyCountFor(l)).toBeGreaterThanOrEqual(keyCountFor(l - 1));
    expect(keyCountFor(-5)).toBe(2);
    expect(keyCountFor(99)).toBe(4);
    expect(levelOf(3.9)).toBe(3);
  });

  it('Mischen erst ab der festgelegten Stufe', () => {
    expect(shuffleFor(SHUFFLE_FROM - 1)).toBe(false);
    expect(shuffleFor(SHUFFLE_FROM)).toBe(true);
    expect(shuffleFor(MAX_LEVEL)).toBe(true);
  });

  it('Antwortfrist sinkt von 3 s auf etwa 1,35 s und bleibt über 1,3 s', () => {
    expect(deadlineMs(1)).toBe(3000);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(deadlineMs(l)).toBeLessThanOrEqual(deadlineMs(l - 1));
    expect(deadlineMs(MAX_LEVEL)).toBeGreaterThanOrEqual(1300);
    expect(deadlineMs(MAX_LEVEL)).toBeLessThan(1500);
  });
});

describe('tasten-wahl: Zeichenfolge und Plätze', () => {
  it('Zeichen liegen im Bereich, sind gleichmäßig verteilt und wiederholen sich kaum', () => {
    for (const n of [2, 3, 4]) {
      const rng = createRng(11 + n);
      const hist: number[] = [];
      const count = new Array(n).fill(0);
      let repeats = 0;
      let triple = 0;
      for (let i = 0; i < 2000; i++) {
        const s = nextStimulus(rng, n, hist);
        expect(s).toBeGreaterThanOrEqual(0);
        expect(s).toBeLessThan(n);
        if (hist.length && hist[hist.length - 1] === s) repeats++;
        if (hist.length >= 2 && hist[hist.length - 1] === s && hist[hist.length - 2] === s) triple++;
        count[s]++;
        hist.push(s);
        if (hist.length > 4) hist.shift();
      }
      expect(triple).toBe(0);
      if (n >= 3) expect(repeats).toBe(0);
      for (const c of count) expect(c).toBeGreaterThan((2000 / n) * 0.8);
    }
  });

  it('Plätze: ohne Mischen fest, mit Mischen eine Permutation, die sich ändert', () => {
    const rng = createRng(5);
    expect(slotOrder(rng, 4, false)).toEqual([0, 1, 2, 3]);
    let prev: number[] | undefined;
    for (let i = 0; i < 200; i++) {
      const o = slotOrder(rng, 4, true, prev);
      expect([...o].sort()).toEqual([0, 1, 2, 3]);
      if (prev) expect(o).not.toEqual(prev);
      prev = o;
    }
    expect(slotOrder(rng, 1, true)).toEqual([0]);
  });
});

describe('tasten-wahl: Tastengröße', () => {
  it('Tasten sind nie kleiner als 56 px und passen in die Breite', () => {
    const stages: Array<[number, number]> = [[1024, 768], [768, 1024], [360, 640], [320, 480], [1366, 600], [700, 400]];
    for (const [w, h] of stages) {
      const u = Math.min(w, h) / 100;
      for (const n of [2, 3, 4]) {
        const L = keyLayout(n, w, h, u);
        expect(L.size).toBeGreaterThanOrEqual(MIN_KEY_PX);
        expect(L.xs).toHaveLength(n);
        expect(L.xs[0] - L.size / 2).toBeGreaterThanOrEqual(0);
        expect(L.xs[n - 1] + L.size / 2).toBeLessThanOrEqual(w + 1e-6);
        for (let i = 1; i < n; i++) expect(L.xs[i] - L.xs[i - 1]).toBeGreaterThanOrEqual(L.size);
      }
    }
    expect(KEY_TYPES).toBe(4);
  });
});

describe('tasten-wahl: Wertung', () => {
  it('Punkte steigen mit Stufe und Schnelligkeit', () => {
    expect(pointsFor(5, 400, 2000)).toBeGreaterThan(pointsFor(5, 1500, 2000));
    expect(pointsFor(10, 800, 2000)).toBeGreaterThan(pointsFor(1, 800, 2000));
    expect(pointsFor(1, 5000, 2000)).toBe(10);
  });

  it('Statistik: Median, Streuung, Genauigkeit', () => {
    const s = computeStats([500, 600, 700, 900], 1, 1, 2);
    expect(s.hits).toBe(4);
    expect(s.medianMs).toBe(650);
    expect(s.sdMs).toBeGreaterThan(0);
    expect(s.accuracy).toBeCloseTo((100 * 4) / 6, 6);
    expect(s.early).toBe(2);
    const e = computeStats([], 0, 3, 0);
    expect(Number.isNaN(e.medianMs)).toBe(true);
    expect(e.sdMs).toBe(0);
    expect(e.accuracy).toBe(0);
  });

  it('Tipp-Schlüssel', () => {
    expect(tipFor(computeStats([500], 0, 0, 4))).toBe('early');
    expect(tipFor(computeStats([500], 4, 1, 0))).toBe('wrong');
    expect(tipFor(computeStats([500], 0, 4, 0))).toBe('slow');
    expect(tipFor(computeStats([500, 600], 1, 1, 1))).toBe('great');
  });
});
