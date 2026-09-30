import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import { MAX_LEVEL, MIN_LEVEL } from '../../src/exercises/_shared/nachfuehren-logic';
import { gegenDenWind } from '../../src/exercises/gegen-den-wind';
import { makeRule, periodsFor, strengthFor, WindRule } from '../../src/exercises/gegen-den-wind/logic';
import { science } from '../../src/exercises/gegen-den-wind/science';
import { checkNachfuehrenExercise } from './_nachfuehren-checks';

describe('gegen-den-wind: Stufenfunktionen', () => {
  it('Windstärke steigt, Perioden werden kürzer, Obergrenze', () => {
    for (let l = MIN_LEVEL + 1; l <= MAX_LEVEL; l++) {
      expect(strengthFor(l)).toBeGreaterThan(strengthFor(l - 1));
      expect(periodsFor(l).min).toBeLessThan(periodsFor(l - 1).min);
      expect(periodsFor(l).max).toBeLessThan(periodsFor(l - 1).max);
    }
    expect(strengthFor(99)).toBe(strengthFor(MAX_LEVEL));
    expect(strengthFor(0)).toBe(strengthFor(MIN_LEVEL));
    expect(strengthFor(MAX_LEVEL)).toBeLessThan(13);
    expect(periodsFor(MAX_LEVEL).min).toBeGreaterThan(2);
  });
});

describe('gegen-den-wind: Regel', () => {
  const setup = (level: number, seed = 1, hw = 55, hh = 32) => ({ level, rng: createRng(seed), hw, hh, seconds: 11, demo: false });

  it('Ziel ruhig in der Mitte; Wind beginnt bei 0, bleibt unter der Windstärke und wirkt in beide Richtungen', () => {
    for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) {
      const r = new WindRule(createRng(l), l, 55, 32);
      expect(r.target()).toEqual({ x: 0, y: 0 });
      expect(r.disturbance(0).x).toBeCloseTo(0, 9);
      expect(r.disturbance(0).y).toBeCloseTo(0, 9);
      let minX = 0;
      let maxX = 0;
      let minY = 0;
      let maxY = 0;
      for (let s = 0; s <= 11; s += 0.02) {
        const d = r.disturbance(s);
        expect(Math.abs(d.x)).toBeLessThanOrEqual(r.amp + 1e-9);
        expect(Math.abs(d.y)).toBeLessThanOrEqual(r.amp + 1e-9);
        minX = Math.min(minX, d.x);
        maxX = Math.max(maxX, d.x);
        minY = Math.min(minY, d.y);
        maxY = Math.max(maxY, d.y);
      }
      expect(minX).toBeLessThan(-0.15 * r.amp);
      expect(maxX).toBeGreaterThan(0.15 * r.amp);
      expect(Math.max(maxY, -minY)).toBeGreaterThan(0.15 * r.amp);
    }
  });

  it('langsam wechselnd: Windtempo unter 28 u/s, stetig; begrenzt auf den Platz', () => {
    for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) {
      const r = new WindRule(createRng(l + 20), l, 55, 32);
      let prev = r.disturbance(0);
      let worst = 0;
      for (let s = 1 / 120; s <= 11; s += 1 / 120) {
        const d = r.disturbance(s);
        worst = Math.max(worst, Math.hypot(d.x - prev.x, d.y - prev.y) * 120);
        prev = d;
      }
      expect(worst).toBeLessThan(28);
    }
    expect(new WindRule(createRng(1), MAX_LEVEL, 10, 6).amp).toBeLessThanOrEqual(0.75 * 6 + 1e-9);
  });

  it('unsichtbar: kein Anzeige-Pfeil; gleicher Startwert → gleicher Wind, anderer → anderer', () => {
    const a = makeRule(setup(6, 3));
    const b = makeRule(setup(6, 3));
    const c = makeRule(setup(6, 4));
    expect(a.hint).toBeUndefined();
    expect(a.disturbance!(5)).toEqual(b.disturbance!(5));
    expect(a.disturbance!(5).x).not.toBeCloseTo(c.disturbance!(5).x, 3);
  });
});

checkNachfuehrenExercise(gegenDenWind, science);
