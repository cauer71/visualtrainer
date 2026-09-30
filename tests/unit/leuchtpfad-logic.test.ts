import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  BLOCK_COUNT,
  expectedAt,
  makeSequence,
  minSpacing,
  nearestBlock,
  POSITIONS,
  SpanRun,
} from '../../src/exercises/leuchtpfad/logic';

describe('Leuchtpfad: Anordnung', () => {
  it('hat 9 Blöcke mit genug Abstand innerhalb des Feldes', () => {
    expect(POSITIONS.length).toBe(BLOCK_COUNT);
    expect(minSpacing()).toBeGreaterThanOrEqual(0.27);
    for (const p of POSITIONS) {
      expect(p.x).toBeGreaterThanOrEqual(0.08);
      expect(p.x).toBeLessThanOrEqual(0.92);
      expect(p.y).toBeGreaterThanOrEqual(0.08);
      expect(p.y).toBeLessThanOrEqual(0.92);
    }
  });

  it('Trefferflächen (Radius 0,12 der Kante) überlappen nicht', () => {
    expect(minSpacing()).toBeGreaterThan(2 * 0.12);
  });

  it('findet den nächsten Block im Trefferradius', () => {
    const centers = POSITIONS.map((p) => ({ x: p.x * 300, y: p.y * 300 }));
    const c = centers[4];
    expect(nearestBlock(c.x + 10, c.y - 8, centers, 36)).toBe(4);
    expect(nearestBlock(c.x + 200, c.y, centers, 26)).toBe(-1);
  });
});

describe('Leuchtpfad: Folgen', () => {
  it('Folgen haben verschiedene Blöcke im gültigen Bereich', () => {
    for (let seed = 1; seed <= 40; seed++) {
      for (let len = 1; len <= 9; len++) {
        const s = makeSequence(createRng(seed), len);
        expect(s.length).toBe(len);
        expect(new Set(s).size).toBe(len);
        for (const b of s) {
          expect(b).toBeGreaterThanOrEqual(0);
          expect(b).toBeLessThan(BLOCK_COUNT);
        }
      }
    }
  });

  it('die neue Folge beginnt nie mit dem Block der vorigen', () => {
    const rng = createRng(11);
    let prev = makeSequence(rng, 4);
    for (let i = 0; i < 200; i++) {
      const len = 1 + (i % 9);
      const next = makeSequence(rng, len, prev);
      expect(next[0]).not.toBe(prev[0]);
      expect(new Set(next).size).toBe(len);
      prev = next;
    }
  });

  it('rückwärts wird von hinten nach vorn abgefragt', () => {
    const s = [3, 1, 4];
    expect([0, 1, 2].map((i) => expectedAt(s, i, false))).toEqual([3, 1, 4]);
    expect([0, 1, 2].map((i) => expectedAt(s, i, true))).toEqual([4, 1, 3]);
  });
});

describe('Leuchtpfad: Sitzungsverlauf', () => {
  it('wächst bei Erfolg, verkürzt bei Fehler, zweiter Fehler beendet', () => {
    const r = new SpanRun({ start: 2 });
    expect(r.length).toBe(2);
    expect(r.report(true)).toBe(true);
    expect(r.length).toBe(3);
    expect(r.report(true)).toBe(true);
    expect(r.length).toBe(4);
    expect(r.report(false)).toBe(true); // erster Fehler
    expect(r.length).toBe(3);
    expect(r.best).toBe(3);
    expect(r.report(true)).toBe(true);
    expect(r.length).toBe(4);
    expect(r.best).toBe(3);
    expect(r.report(false)).toBe(false); // zweiter Fehler: Ende
    expect(r.ended).toBe(true);
    expect(r.strikes).toBe(2);
    expect(r.best).toBe(3);
    expect(r.report(true)).toBe(false);
    expect(r.best).toBe(3);
  });

  it('bleibt in den Grenzen und endet bei voller Länge', () => {
    const r = new SpanRun({ start: 8, maxLen: 9 });
    expect(r.report(true)).toBe(true);
    expect(r.length).toBe(9);
    expect(r.report(true)).toBe(false);
    expect(r.best).toBe(9);
    const low = new SpanRun({ start: 1 });
    low.report(false);
    expect(low.length).toBe(1); // nicht unter 1
  });

  it('Rückwärts-Runde ist auf 7 Blöcke begrenzt', () => {
    const r = new SpanRun({ backward: true, start: 6 });
    expect(r.maxLen).toBe(7);
    r.report(true);
    expect(r.length).toBe(7);
    expect(r.report(true)).toBe(false);
  });

  it('simulierte Spielerin mit fester Spanne erreicht etwa diese Spanne', () => {
    const rng = createRng(21);
    const r = new SpanRun({ start: 2 });
    let guard = 0;
    while (!r.ended && guard++ < 100) r.report(r.length <= 5 || rng.chance(0.05));
    expect(r.best).toBeGreaterThanOrEqual(5);
    expect(r.best).toBeLessThanOrEqual(6);
    expect(r.strikes).toBe(2);
  });
});
