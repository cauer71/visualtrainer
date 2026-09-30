import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  CELLS,
  cellAt,
  cellRect,
  classifyTap,
  freeCells,
  levelOf,
  makeWave,
  MAX_LEVEL,
  MAX_OCCUPIED,
  medianTime,
  MIN_LEVEL,
  occupiedCountFor,
  planReaction,
  pointsFor,
  waitMsFor,
} from '../../src/exercises/raster-ausweichen/logic';

const AREA = { x: 40, y: 100, w: 1000, h: 600, gap: 12 };

describe('raster-ausweichen: Stufenfunktionen', () => {
  it('Wartezeit sinkt, besetzte Felder steigen', () => {
    for (let l = MIN_LEVEL + 1; l <= MAX_LEVEL; l++) {
      expect(waitMsFor(l)).toBeLessThan(waitMsFor(l - 1));
      expect(occupiedCountFor(l)).toBeGreaterThanOrEqual(occupiedCountFor(l - 1));
    }
    expect(waitMsFor(MIN_LEVEL)).toBe(2600);
    expect(waitMsFor(MAX_LEVEL)).toBe(890);
    expect(occupiedCountFor(MIN_LEVEL)).toBe(3);
    expect(occupiedCountFor(MAX_LEVEL)).toBe(MAX_OCCUPIED);
  });

  it('immer mindestens 2 freie Felder, Wartezeit nie unter 0,8 s', () => {
    for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) {
      expect(CELLS - occupiedCountFor(l)).toBeGreaterThanOrEqual(2);
      expect(waitMsFor(l)).toBeGreaterThanOrEqual(800);
    }
  });

  it('begrenzt Stufen; Punkte ohne Zeitbonus', () => {
    expect(levelOf(0)).toBe(MIN_LEVEL);
    expect(waitMsFor(99)).toBe(waitMsFor(MAX_LEVEL));
    expect(pointsFor(1)).toBe(10);
    expect(pointsFor(6)).toBe(20);
    expect(pointsFor(6.9)).toBe(20);
  });
});

describe('raster-ausweichen: Raster', () => {
  it('9 Felder, zeilenweise, überlappungsfrei und ganz im Bereich', () => {
    const cells = Array.from({ length: CELLS }, (_, i) => cellRect(i, AREA));
    expect(cells[0].x).toBeCloseTo(AREA.x);
    expect(cells[0].y).toBeCloseTo(AREA.y);
    expect(cells[8].x + cells[8].w).toBeCloseTo(AREA.x + AREA.w);
    expect(cells[8].y + cells[8].h).toBeCloseTo(AREA.y + AREA.h);
    expect(cells[4].cx).toBeCloseTo(AREA.x + AREA.w / 2);
    expect(cells[4].cy).toBeCloseTo(AREA.y + AREA.h / 2);
    for (let i = 0; i < CELLS; i++) {
      for (let j = i + 1; j < CELLS; j++) {
        const a = cells[i];
        const b = cells[j];
        const overlap = a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
        expect(overlap).toBe(false);
      }
    }
  });

  it('Felder sind groß genug zum Tippen (Touch-Ziel ≥ 56 px) auf üblichen Bühnen', () => {
    for (const a of [
      { x: 24, y: 100, w: 330, h: 640, gap: 8 },
      { x: 40, y: 110, w: 1000, h: 560, gap: 10 },
    ]) {
      const c = cellRect(0, a);
      expect(Math.min(c.w, c.h)).toBeGreaterThanOrEqual(56);
    }
  });

  it('cellAt trifft die Mitte jedes Feldes; Lücken gehören zum nächsten Feld; außerhalb −1', () => {
    for (let i = 0; i < CELLS; i++) {
      const c = cellRect(i, AREA);
      expect(cellAt(c.cx, c.cy, AREA)).toBe(i);
      expect(cellAt(c.x + 1, c.y + 1, AREA)).toBe(i);
      expect(cellAt(c.x + c.w - 1, c.y + c.h - 1, AREA)).toBe(i);
    }
    const c0 = cellRect(0, AREA);
    expect(cellAt(c0.x + c0.w + AREA.gap / 2 - 0.1, c0.cy, AREA)).toBe(0);
    expect(cellAt(c0.x + c0.w + AREA.gap / 2 + 0.1, c0.cy, AREA)).toBe(1);
    expect(cellAt(0, 0, AREA)).toBe(-1);
    expect(cellAt(AREA.x + AREA.w + 50, AREA.y + 10, AREA)).toBe(-1);
    expect(cellAt(AREA.x - 5, AREA.y + 10, AREA, 10)).toBe(0);
  });
});

describe('raster-ausweichen: Wellen', () => {
  it('eigenes Feld immer besetzt, Anzahl stimmt, keine Doppelten, sortiert', () => {
    const rng = createRng(5);
    for (let k = 1; k <= MAX_OCCUPIED; k++) {
      for (let own = 0; own < CELLS; own++) {
        const w = makeWave(rng, k, own);
        expect(w).toHaveLength(k);
        expect(w).toContain(own);
        expect(new Set(w).size).toBe(k);
        expect([...w].sort((a, b) => a - b)).toEqual(w);
        expect(freeCells(w)).toHaveLength(CELLS - k);
      }
    }
  });

  it('nicht zweimal dieselbe Welle in Folge', () => {
    const rng = createRng(8);
    let prev: number[] | undefined;
    for (let i = 0; i < 200; i++) {
      const w = makeWave(rng, 3, 4, prev);
      if (prev) expect(w).not.toEqual(prev);
      prev = w;
    }
  });

  it('alle freien Felder kommen vor (keine Lücke in der Verteilung)', () => {
    const rng = createRng(1);
    const seen = new Set<number>();
    for (let i = 0; i < 200; i++) for (const c of freeCells(makeWave(rng, 5, 4))) seen.add(c);
    expect(seen.size).toBe(CELLS - 1);
    expect(seen.has(4)).toBe(false);
  });

  it('gleicher Startwert liefert gleiche Wellen (ctx.rng)', () => {
    expect(makeWave(createRng(3), 4, 2)).toEqual(makeWave(createRng(3), 4, 2));
  });

  it('classifyTap', () => {
    expect(classifyTap(3, [3, 4])).toBe('occupied');
    expect(classifyTap(0, [3, 4])).toBe('free');
  });
});

describe('raster-ausweichen: Zeiten und Autoplay', () => {
  it('Median', () => {
    expect(medianTime([])).toBeNaN();
    expect(medianTime([900, 500, 700])).toBe(700);
    expect(medianTime([400, 600])).toBe(500);
  });

  it('Plan: rt innerhalb der Wartezeit, meist ein freies Feld, manchmal Fehler', () => {
    const rng = createRng(6);
    const occ = [1, 4, 7];
    let free = 0;
    let occupied = 0;
    let none = 0;
    for (let i = 0; i < 600; i++) {
      const level = 1 + (i % MAX_LEVEL);
      const p = planReaction(rng, level, occ);
      expect(p.rt).toBeGreaterThanOrEqual(380);
      expect(p.rt).toBeLessThanOrEqual(Math.max(380, waitMsFor(level) * 0.97) + 1e-9);
      if (p.cell < 0) none++;
      else if (occ.includes(p.cell)) occupied++;
      else free++;
    }
    expect(free / 600).toBeGreaterThan(0.8);
    expect(occupied).toBeGreaterThan(5);
    expect(none).toBeGreaterThan(5);
  });

  it('Film-Plan: feste Zeit, immer ein freies Feld', () => {
    const rng = createRng(2);
    for (let i = 0; i < 50; i++) {
      const p = planReaction(rng, 1, [4, 0, 8], true, 1700);
      expect(p.rt).toBe(1700);
      expect([4, 0, 8]).not.toContain(p.cell);
    }
  });
});
