import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import { MAX_LEVEL, MIN_LEVEL } from '../../src/exercises/_shared/nachfuehren-logic';
import { kurvenbahnFolgen } from '../../src/exercises/kurvenbahn-folgen';
import { CurveRule, makeRule, previewFor, ratioFor, speedFor, START_RAMP_S } from '../../src/exercises/kurvenbahn-folgen/logic';
import { science } from '../../src/exercises/kurvenbahn-folgen/science';
import { checkNachfuehrenExercise } from './_nachfuehren-checks';

describe('kurvenbahn-folgen: Stufenfunktionen', () => {
  it('Tempo steigt, Vorschau wird kürzer, Bahnform wird verschlungener', () => {
    for (let l = MIN_LEVEL + 1; l <= MAX_LEVEL; l++) {
      expect(speedFor(l)).toBeGreaterThan(speedFor(l - 1));
      expect(previewFor(l)).toBeLessThan(previewFor(l - 1));
      const [a0, b0] = ratioFor(l - 1);
      const [a1, b1] = ratioFor(l);
      expect(a1 + b1).toBeGreaterThanOrEqual(a0 + b0);
    }
    expect(ratioFor(1)).toEqual([1, 2]);
    expect(ratioFor(MAX_LEVEL)).toEqual([3, 4]);
    expect(previewFor(MAX_LEVEL)).toBeGreaterThan(0.5);
    expect(speedFor(MAX_LEVEL)).toBeLessThan(20);
  });
});

describe('kurvenbahn-folgen: Regel', () => {
  it('Ziel bleibt im Feld, Start aus dem Stand, danach ohne Halt (Mindesttempo) und stetig', () => {
    for (const [hw, hh] of [
      [55, 32],
      [21, 40],
    ]) {
      for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) {
        for (const seed of [1, 2, 3]) {
          const r = new CurveRule(createRng(seed * 10 + l), l, hw, hh);
          expect(r.minSpeedRatio).toBeGreaterThan(0.17);
          expect(r.speedAt(0.001)).toBeLessThan(0.1 * r.speed + 1);
          let prev = r.target(0);
          let slow = 0;
          let vmax = 0;
          for (let s = 1 / 120; s <= 11; s += 1 / 120) {
            const p = r.target(s);
            expect(Math.abs(p.x)).toBeLessThanOrEqual(hw + 1e-6);
            expect(Math.abs(p.y)).toBeLessThanOrEqual(hh + 1e-6);
            const v = Math.hypot(p.x - prev.x, p.y - prev.y) * 120;
            vmax = Math.max(vmax, v);
            if (s > START_RAMP_S + 0.5 && v < 0.1 * r.speed) slow++;
            prev = p;
          }
          expect(slow).toBe(0);
          expect(vmax).toBeLessThan(r.speed * 3.2);
        }
      }
    }
  });

  it('mittleres Tempo entspricht dem Stufentempo (Effektivwert über die Bahn, ±25 %)', () => {
    for (const l of [1, 5, 12]) {
      const r = new CurveRule(createRng(l), l, 55, 32);
      let sum = 0;
      let n = 0;
      for (let s = 5; s < 40; s += 0.02) {
        sum += r.speedAt(s) ** 2;
        n++;
      }
      const rms = Math.sqrt(sum / n);
      expect(rms).toBeGreaterThan(r.speed * 0.75);
      expect(rms).toBeLessThan(r.speed * 1.25);
    }
  });

  it('entartete Phasen werden vermieden; gleicher Startwert → gleiche Bahn; andere Startwerte → andere Bahn', () => {
    for (let seed = 1; seed <= 40; seed++) {
      const r = new CurveRule(createRng(seed), 1 + (seed % 12), 55, 32);
      expect(r.minSpeedRatio).toBeGreaterThan(0.17);
    }
    const a = makeRule({ level: 5, rng: createRng(3), hw: 55, hh: 32, seconds: 11, demo: false });
    const b = makeRule({ level: 5, rng: createRng(3), hw: 55, hh: 32, seconds: 11, demo: false });
    const c = makeRule({ level: 5, rng: createRng(4), hw: 55, hh: 32, seconds: 11, demo: false });
    expect(a.target(6)).toEqual(b.target(6));
    expect(a.target(6).x).not.toBeCloseTo(c.target(6).x, 3);
  });

  it('kein Störverschiebung, keine Anzeige-Pfeile', () => {
    const r = makeRule({ level: 2, rng: createRng(1), hw: 55, hh: 32, seconds: 11, demo: false });
    expect(r.disturbance).toBeUndefined();
    expect(r.hint).toBeUndefined();
  });
});

checkNachfuehrenExercise(kurvenbahnFolgen, science);
