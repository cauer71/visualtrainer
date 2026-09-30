import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  cellAt,
  cellCenter,
  chooseLayout,
  computeStats,
  gapMs,
  gridFor,
  jumpDistance,
  layoutGrid,
  levelOf,
  lifeFor,
  MAX_LEVEL,
  MAX_CELL_ASPECT,
  MIN_CELL_PX,
  minJumpFor,
  pickCell,
  targetAlpha,
  targetRadius,
  tipFor,
} from '../../src/exercises/blicksprung-galerie/logic';

describe('blicksprung-galerie: Stufenfunktionen', () => {
  it('Raster wird größer, Anzeigedauer kürzer, Sprungweite größer', () => {
    expect(gridFor(1)).toEqual({ cols: 3, rows: 3 });
    expect(gridFor(5)).toEqual({ cols: 3, rows: 3 });
    expect(gridFor(6)).toEqual({ cols: 4, rows: 4 });
    expect(gridFor(MAX_LEVEL)).toEqual({ cols: 4, rows: 4 });
    for (let l = 2; l <= MAX_LEVEL; l++) {
      expect(lifeFor(l)).toBeLessThanOrEqual(lifeFor(l - 1));
      expect(minJumpFor(l)).toBeGreaterThanOrEqual(minJumpFor(l - 1));
    }
    expect(lifeFor(1)).toBe(2400);
    expect(lifeFor(MAX_LEVEL)).toBeGreaterThanOrEqual(700);
    expect(lifeFor(MAX_LEVEL)).toBeLessThan(lifeFor(1));
    expect(minJumpFor(1)).toBeCloseTo(0.2);
    expect(minJumpFor(MAX_LEVEL)).toBeLessThanOrEqual(0.6);
  });

  it('begrenzt Stufen', () => {
    expect(levelOf(0)).toBe(1);
    expect(levelOf(2.9)).toBe(2);
    expect(levelOf(99)).toBe(MAX_LEVEL);
    expect(lifeFor(-3)).toBe(lifeFor(1));
  });

  it('Pause liegt zwischen 450 und 750 ms', () => {
    const rng = createRng(3);
    for (let i = 0; i < 100; i++) {
      const g = gapMs(rng);
      expect(g).toBeGreaterThanOrEqual(450);
      expect(g).toBeLessThan(750);
    }
  });
});

describe('blicksprung-galerie: Zielfolge', () => {
  it('nie zweimal dieselbe Zelle und immer mindestens so weit wie verlangt', () => {
    for (const level of [1, 4, 6, 9, 12]) {
      const grid = gridFor(level);
      const rng = createRng(100 + level);
      let prev: number | null = null;
      for (let i = 0; i < 400; i++) {
        const c = pickCell(rng, grid, prev, level);
        expect(c).toBeGreaterThanOrEqual(0);
        expect(c).toBeLessThan(grid.cols * grid.rows);
        if (prev !== null) {
          expect(c).not.toBe(prev);
          expect(jumpDistance(prev, c, grid)).toBeGreaterThanOrEqual(Math.min(minJumpFor(level), 0.99) - 1e-6);
        }
        prev = c;
      }
    }
  });

  it('nutzt alle Zellen des Rasters', () => {
    const grid = gridFor(6);
    const rng = createRng(7);
    const seen = new Set<number>();
    let prev: number | null = null;
    for (let i = 0; i < 600; i++) {
      prev = pickCell(rng, grid, prev, 6);
      seen.add(prev);
    }
    expect(seen.size).toBe(16);
  });

  it('weite Stufen bevorzugen größere Sprünge', () => {
    const grid = gridFor(1);
    const mean = (level: number) => {
      const rng = createRng(5);
      let prev: number | null = 4;
      let sum = 0;
      const n = 300;
      for (let i = 0; i < n; i++) {
        const c = pickCell(rng, grid, prev, level);
        sum += jumpDistance(prev!, c, grid);
        prev = c;
      }
      return sum / n;
    };
    expect(mean(9)).toBeGreaterThan(mean(1));
  });

  it('ohne passende Zelle (kleines Raster, hohe Stufe) wird unter den weitesten zufällig gewählt', () => {
    const grid = { cols: 3, rows: 3 };
    const rng = createRng(21);
    const seen = new Set<number>();
    for (let i = 0; i < 200; i++) seen.add(pickCell(rng, grid, 4, 12));
    // von der Mitte aus sind alle vier Ecken gleich weit
    expect([...seen].sort()).toEqual([0, 2, 6, 8]);
  });

  it('Sprungweite ist 0 für dieselbe und 1 für gegenüberliegende Ecken', () => {
    const g = gridFor(1);
    expect(jumpDistance(4, 4, g)).toBe(0);
    expect(jumpDistance(0, 8, g)).toBeCloseTo(1);
    expect(jumpDistance(0, 1, g)).toBeCloseTo(1 / Math.SQRT2 / 2);
  });
});

describe('blicksprung-galerie: Raster und Treffer', () => {
  it('Zellen bleiben ≥ 48 px, sonst Rückfall auf 3×3', () => {
    const big = chooseLayout(8, 1000, 700, 10, 10);
    expect(big.cols).toBe(4);
    expect(Math.min(big.cw, big.ch)).toBeGreaterThanOrEqual(MIN_CELL_PX);
    const tiny = chooseLayout(8, 150, 150, 0, 0);
    expect(tiny.cols).toBe(3);
  });

  it('Zellseitenverhältnis bleibt begrenzt (Quer- und Hochformat)', () => {
    for (const [w, h] of [
      [1300, 500],
      [400, 900],
      [1024, 700],
    ] as const) {
      const l = layoutGrid(w, h, 0, 0, { cols: 4, rows: 4 });
      expect(l.cw / l.ch).toBeLessThanOrEqual(MAX_CELL_ASPECT + 1e-9);
      expect(l.ch / l.cw).toBeLessThanOrEqual(MAX_CELL_ASPECT + 1e-9);
      expect(l.x0).toBeGreaterThanOrEqual(0);
      expect(l.x0 + l.cw * 4).toBeLessThanOrEqual(w + 1e-6);
      expect(l.y0 + l.ch * 4).toBeLessThanOrEqual(h + 1e-6);
    }
  });

  it('Zellmitte liegt in der eigenen Zelle; außerhalb des Rasters −1', () => {
    const lay = layoutGrid(900, 600, 20, 20, { cols: 3, rows: 3 });
    for (let i = 0; i < 9; i++) {
      const c = cellCenter(lay, i);
      expect(cellAt(lay, c.x, c.y)).toBe(i);
    }
    expect(cellAt(lay, lay.x0 - 5, lay.y0 + 10)).toBe(-1);
    expect(cellAt(lay, lay.x0 + 10, lay.y0 + lay.ch * 3 + 5)).toBe(-1);
  });

  it('Zielradius hat Mindestgröße', () => {
    const lay = layoutGrid(200, 200, 0, 0, { cols: 4, rows: 4 });
    expect(targetRadius(lay, 2)).toBeGreaterThanOrEqual(26);
  });
});

describe('blicksprung-galerie: weiche Ein-/Ausblendung', () => {
  it('kein harter Wechsel: Anstieg und Abfall dauern ≥ 100 ms', () => {
    const life = 1000;
    expect(targetAlpha(-1, life)).toBe(0);
    expect(targetAlpha(0, life)).toBe(0);
    expect(targetAlpha(60, life)).toBeLessThan(1);
    expect(targetAlpha(60, life)).toBeGreaterThan(0);
    expect(targetAlpha(500, life)).toBe(1);
    expect(targetAlpha(life - 60, life)).toBeLessThan(1);
    expect(targetAlpha(life, life)).toBe(0);
    // größter Sprung zwischen zwei 16-ms-Bildern
    let maxStep = 0;
    let prev = targetAlpha(0, life);
    for (let a = 16; a <= life; a += 16) {
      const v = targetAlpha(a, life);
      maxStep = Math.max(maxStep, Math.abs(v - prev));
      prev = v;
    }
    expect(maxStep).toBeLessThan(0.25);
  });
});

describe('blicksprung-galerie: Auswertung', () => {
  it('Median nur aus richtigen Treffern, Genauigkeit über alle Ziele', () => {
    const s = computeStats(
      [
        { ms: 500, far: false },
        { ms: 700, far: false },
        { ms: 600, far: true },
      ],
      1,
      0,
    );
    expect(s.medianMs).toBe(600);
    expect(s.hits).toBe(3);
    expect(s.accuracy).toBeCloseTo(75);
    expect(Number.isNaN(computeStats([], 0, 0).medianMs)).toBe(true);
    expect(computeStats([], 0, 0).accuracy).toBe(0);
  });

  it('Tipps: falsche Zelle, zu langsam, weite Sprünge, sonst gut', () => {
    const base = (far: number[], near: number[]) => [...far.map((ms) => ({ ms, far: true })), ...near.map((ms) => ({ ms, far: false }))];
    expect(tipFor(computeStats(base([], [500, 500, 500]), 4, 1))).toBe('wrong');
    expect(tipFor(computeStats(base([], [500, 500, 500]), 1, 4))).toBe('slow');
    expect(tipFor(computeStats(base([900, 900, 950], [500, 520, 480]), 0, 0))).toBe('far');
    expect(tipFor(computeStats(base([600, 620, 640], [500, 520, 480]), 0, 0))).toBe('great');
  });
});
