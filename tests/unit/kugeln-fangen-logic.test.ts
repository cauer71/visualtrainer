import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  advance,
  catchPct,
  fallTimeFor,
  falseAlarmPct,
  findHit,
  hitRadiusFor,
  type Kind,
  levelInt,
  MAX_LEVEL,
  maxActiveFor,
  MIN_LEVEL,
  nextKind,
  pickLane,
  pointsFor,
  radiusFor,
  spawnGapSecondsFor,
  squareHalfSide,
  squareShareFor,
} from '../../src/exercises/kugeln-fangen/logic';

describe('kugeln-fangen: Stufenfunktionen', () => {
  it('Fallzeit und Abstand sinken mit der Stufe, bleiben im Bereich', () => {
    expect(fallTimeFor(1)).toBeCloseTo(4.0, 5);
    for (let l = 2; l <= MAX_LEVEL; l++) {
      expect(fallTimeFor(l)).toBeLessThanOrEqual(fallTimeFor(l - 1));
      expect(spawnGapSecondsFor(l)).toBeLessThanOrEqual(spawnGapSecondsFor(l - 1));
    }
    expect(fallTimeFor(MAX_LEVEL)).toBeGreaterThanOrEqual(1.3);
    expect(fallTimeFor(MAX_LEVEL)).toBeLessThan(1.5);
    expect(spawnGapSecondsFor(MAX_LEVEL)).toBeGreaterThanOrEqual(0.4);
    expect(fallTimeFor(99)).toBe(fallTimeFor(MAX_LEVEL));
  });

  it('Dichte wächst mit der Stufe (2 → 6 Objekte gleichzeitig)', () => {
    expect(maxActiveFor(1)).toBe(2);
    expect(maxActiveFor(2.9)).toBe(2);
    expect(maxActiveFor(3)).toBe(3);
    expect(maxActiveFor(6)).toBe(4);
    expect(maxActiveFor(10)).toBe(5);
    expect(maxActiveFor(15)).toBe(6);
    expect(maxActiveFor(20)).toBe(6);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(maxActiveFor(l)).toBeGreaterThanOrEqual(maxActiveFor(l - 1));
    expect(levelInt(0)).toBe(MIN_LEVEL);
    expect(levelInt(99)).toBe(MAX_LEVEL);
  });

  it('Quadrat-Anteil steigt, bleibt aber zwischen 20 % und 35 %', () => {
    expect(squareShareFor(1)).toBeCloseTo(0.2, 6);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(squareShareFor(l)).toBeGreaterThan(squareShareFor(l - 1));
    expect(squareShareFor(MAX_LEVEL)).toBeLessThanOrEqual(0.35);
  });

  it('Größe schrumpft mit der Stufe, der Trefferradius bleibt ≥ 28 px', () => {
    for (const u of [3.6, 5, 7.68, 9]) {
      expect(radiusFor(1, u)).toBeGreaterThanOrEqual(radiusFor(MAX_LEVEL, u));
      for (let l = 1; l <= MAX_LEVEL; l++) {
        expect(radiusFor(l, u)).toBeGreaterThanOrEqual(20);
        expect(hitRadiusFor(radiusFor(l, u))).toBeGreaterThanOrEqual(28);
      }
    }
  });

  it('Quadrat hat dieselbe Fläche wie der Kreis', () => {
    const r = 30;
    const s = squareHalfSide(r);
    expect((2 * s) ** 2).toBeCloseTo(Math.PI * r * r, 6);
  });

  it('Punkte steigen mit der Stufe', () => {
    expect(pointsFor(1)).toBe(10);
    expect(pointsFor(10)).toBeGreaterThan(pointsFor(1));
  });
});

describe('kugeln-fangen: Reihenfolge von Kreisen und Quadraten', () => {
  it('die ersten beiden sind Kreise, nie mehr als zwei Quadrate in Folge, nie lange nur Kreise', () => {
    const rng = createRng(21);
    for (const level of [1, 10, 20]) {
      const share = squareShareFor(level);
      const hist: Kind[] = [];
      for (let i = 0; i < 2000; i++) {
        const k = nextKind(() => rng.next(), share, hist);
        if (i < 2) expect(k).toBe('circle');
        hist.push(k);
      }
      let run = 0;
      let runC = 0;
      for (const k of hist) {
        run = k === 'square' ? run + 1 : 0;
        runC = k === 'circle' ? runC + 1 : 0;
        expect(run).toBeLessThanOrEqual(2);
        expect(runC).toBeLessThanOrEqual(7);
      }
      const frac = hist.filter((k) => k === 'square').length / hist.length;
      // durch die Regeln etwas anders als der Zielanteil, aber im gleichen Bereich
      expect(frac).toBeGreaterThan(share - 0.06);
      expect(frac).toBeLessThan(share + 0.1);
    }
  });
});

describe('kugeln-fangen: Fall und Treffer', () => {
  it('advance ist gleichmäßig und unabhängig von der Schrittgröße', () => {
    let a = 0;
    for (let i = 0; i < 60; i++) a = advance(a, 1 / 60, 2);
    expect(a).toBeCloseTo(0.5, 6);
    let b = 0;
    for (let i = 0; i < 120; i++) b = advance(b, 1 / 120, 2);
    expect(b).toBeCloseTo(a, 6);
    expect(advance(0.3, 0, 2)).toBe(0.3);
    expect(advance(0.3, -1, 2)).toBe(0.3);
  });

  it('findHit: nächstliegendes Objekt im Trefferradius', () => {
    const items = [
      { x: 100, y: 100, hitR: 30 },
      { x: 130, y: 100, hitR: 30 },
    ];
    expect(findHit(items, 100, 100)).toBe(0);
    expect(findHit(items, 128, 100)).toBe(1);
    expect(findHit(items, 400, 300)).toBe(-1);
  });

  it('pickLane hält Abstand, wenn möglich', () => {
    const rng = createRng(5);
    const occ = [0.3, 0.6];
    for (let i = 0; i < 50; i++) {
      const c = pickLane(() => rng.next(), occ, 0.15);
      expect(Math.min(...occ.map((o) => Math.abs(o - c)))).toBeGreaterThanOrEqual(0.15 - 1e-9);
    }
  });
});

describe('kugeln-fangen: Kennzahlen', () => {
  it('Fang in % und Fehlalarm-Quote', () => {
    expect(catchPct(0, 0)).toBe(0);
    expect(catchPct(9, 1)).toBe(90);
    expect(catchPct(1, 2)).toBe(33);
    expect(falseAlarmPct(0, 0)).toBe(0);
    expect(falseAlarmPct(1, 4)).toBe(25);
  });
});
