import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  arcMsFor,
  decoyGapMs,
  drawGapMs,
  drawTurnAngle,
  exposureFor,
  gapMeanFor,
  isDecoy,
  levelOf,
  MAX_LEVEL,
  MIN_LEVEL,
  signDelayFor,
  speedFor,
  turnAngleFor,
} from '../../src/exercises/ausweichziel/logic';

describe('ausweichziel: Stufenfunktionen', () => {
  it('werden mit der Stufe schwerer', () => {
    for (let l = MIN_LEVEL + 1; l <= MAX_LEVEL; l++) {
      expect(speedFor(l)).toBeGreaterThan(speedFor(l - 1));
      expect(turnAngleFor(l)).toBeGreaterThan(turnAngleFor(l - 1));
      expect(arcMsFor(l)).toBeLessThan(arcMsFor(l - 1));
      expect(gapMeanFor(l)).toBeLessThan(gapMeanFor(l - 1));
      expect(signDelayFor(l)).toBeLessThan(signDelayFor(l - 1));
      expect(exposureFor(l)).toBeLessThanOrEqual(exposureFor(l - 1));
    }
  });

  it('bleiben im gedachten Bereich (Tablet ≈ 4–20°/s, 150–400 ms bis zum Zeichen)', () => {
    expect(speedFor(1)).toBeCloseTo(16);
    expect(speedFor(MAX_LEVEL)).toBeGreaterThan(80);
    expect(speedFor(MAX_LEVEL)).toBeLessThan(100);
    expect(turnAngleFor(1)).toBe(40);
    expect(turnAngleFor(MAX_LEVEL)).toBeLessThanOrEqual(170);
    expect(arcMsFor(MAX_LEVEL)).toBeGreaterThanOrEqual(250);
    expect(signDelayFor(1)).toBeLessThanOrEqual(400);
    expect(signDelayFor(MAX_LEVEL)).toBeGreaterThanOrEqual(150);
    expect(exposureFor(MAX_LEVEL)).toBeGreaterThanOrEqual(300);
  });

  it('begrenzt Stufen', () => {
    expect(levelOf(-4)).toBe(MIN_LEVEL);
    expect(levelOf(99)).toBe(MAX_LEVEL);
    expect(speedFor(-4)).toBe(speedFor(1));
    expect(speedFor(99)).toBe(speedFor(MAX_LEVEL));
  });
});

describe('ausweichziel: Zufall', () => {
  it('Ausweichwinkel streut um den Stufenwert und bleibt unter 175°', () => {
    const rng = createRng(1);
    for (const level of [1, 10, MAX_LEVEL]) {
      for (let i = 0; i < 200; i++) {
        const a = (drawTurnAngle(level, rng) * 180) / Math.PI;
        expect(a).toBeGreaterThanOrEqual(turnAngleFor(level) * 0.8 - 1e-6);
        expect(a).toBeLessThanOrEqual(Math.min(175, turnAngleFor(level) * 1.2) + 1e-6);
      }
    }
  });

  it('Abstände sind unregelmäßig (Streuung), aber nie unter 1 s', () => {
    const rng = createRng(2);
    for (const level of [1, 8, MAX_LEVEL]) {
      const gaps = Array.from({ length: 300 }, () => drawGapMs(level, rng));
      const min = Math.min(...gaps);
      const max = Math.max(...gaps);
      expect(min).toBeGreaterThanOrEqual(1000);
      expect(max - min).toBeGreaterThan(gapMeanFor(level) * 0.3);
      const mean = gaps.reduce((a, b) => a + b, 0) / gaps.length;
      expect(mean).toBeGreaterThan(gapMeanFor(level) * 0.9);
      expect(mean).toBeLessThan(gapMeanFor(level) * 1.2);
    }
  });

  it('Ablenkungen: erst ab Stufe 3, nie zwei in Folge, etwa jede vierte', () => {
    const rng = createRng(3);
    for (let i = 0; i < 100; i++) expect(isDecoy(2, rng, false)).toBe(false);
    for (let i = 0; i < 100; i++) expect(isDecoy(15, rng, true)).toBe(false);
    let n = 0;
    for (let i = 0; i < 2000; i++) if (isDecoy(10, rng, false)) n++;
    expect(n / 2000).toBeGreaterThan(0.2);
    expect(n / 2000).toBeLessThan(0.3);
    for (let i = 0; i < 100; i++) {
      const g = decoyGapMs(rng);
      expect(g).toBeGreaterThanOrEqual(700);
      expect(g).toBeLessThanOrEqual(1300);
    }
  });
});
