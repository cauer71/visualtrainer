import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import { MAX_LEVEL, MIN_LEVEL } from '../../src/exercises/_shared/nachfuehren-logic';
import { seitwaertsFolgen } from '../../src/exercises/seitwaerts-folgen';
import { legRangeFor, makeRule, speedFor, StrafeRule, TURN_S } from '../../src/exercises/seitwaerts-folgen/logic';
import { science } from '../../src/exercises/seitwaerts-folgen/science';
import { checkNachfuehrenExercise } from './_nachfuehren-checks';

describe('seitwaerts-folgen: Stufenfunktionen', () => {
  it('Tempo steigt, Abstände der Wendungen werden kürzer', () => {
    for (let l = MIN_LEVEL + 1; l <= MAX_LEVEL; l++) {
      expect(speedFor(l)).toBeGreaterThan(speedFor(l - 1));
      expect(legRangeFor(l).min).toBeLessThan(legRangeFor(l - 1).min);
      expect(legRangeFor(l).max).toBeLessThan(legRangeFor(l - 1).max);
    }
    expect(speedFor(0)).toBe(speedFor(1));
    expect(speedFor(99)).toBe(speedFor(MAX_LEVEL));
    expect(speedFor(MAX_LEVEL)).toBeLessThan(20);
  });
});

describe('seitwaerts-folgen: Regel', () => {
  const build = (level: number, seed = 1, hw = 55, hh = 32) => new StrafeRule(createRng(seed), level, hw, hh, 11);

  it('Ziel bleibt auf der Schiene und innerhalb des Felds; y konstant, stetig, Tempo ≤ Stufentempo × 1,01', () => {
    for (const hw of [55, 21]) {
      for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) {
        const r = build(l, l + 3, hw);
        let prev = r.target(0);
        let vmax = 0;
        for (let s = 1 / 120; s <= 11; s += 1 / 120) {
          const p = r.target(s);
          expect(Math.abs(p.x)).toBeLessThanOrEqual(hw + 1e-6);
          expect(p.y).toBe(prev.y);
          vmax = Math.max(vmax, Math.abs(p.x - prev.x) * 120);
          prev = p;
        }
        expect(vmax).toBeLessThanOrEqual(r.speed * 1.01 + 1e-6);
        expect(vmax).toBeGreaterThan(r.speed * 0.5);
      }
    }
  });

  it('Richtungswechsel: unregelmäßige, aber wiederkehrende Abstände (kurz – lang – lang – kurz), weich', () => {
    const r = build(5, 2);
    const times = r.turnTimes(40);
    const gaps = times.map((t, i) => t - (i ? times[i - 1] : 0));
    expect(gaps.length).toBeGreaterThanOrEqual(8);
    // Muster wiederholt sich alle 4 Wendungen
    for (let i = 0; i + 4 < gaps.length; i++) expect(gaps[i]).toBeCloseTo(gaps[i + 4], 9);
    // unregelmäßig: kurze und lange Abstände unterscheiden sich
    expect(Math.max(...gaps.slice(0, 4)) - Math.min(...gaps.slice(0, 4))).toBeGreaterThan(0.25);
    expect(r.pattern[0]).toBeCloseTo(r.pattern[3], 9);
    expect(r.pattern[1]).toBeCloseTo(r.pattern[2], 9);
    // tatsächlich wendet die Bewegung an diesen Zeitpunkten
    let flips = 0;
    let lastSign = 0;
    for (let s = 0.05; s < 11; s += 0.01) {
      const v = r.target(s + 0.005).x - r.target(s - 0.005).x;
      const sign = Math.abs(v) < 1e-9 ? 0 : Math.sign(v);
      if (sign !== 0 && lastSign !== 0 && sign !== lastSign) flips++;
      if (sign !== 0) lastSign = sign;
    }
    expect(flips).toBeGreaterThanOrEqual(4);
    // Wende ist weich: Beschleunigung endlich (Tempoänderung je 1/120 s klein gegen Stufentempo)
    const vel = (s: number) => (r.target(s + 1 / 240).x - r.target(s - 1 / 240).x) * 120;
    let worst = 0;
    for (let s = 0.1; s < 11; s += 1 / 120) worst = Math.max(worst, Math.abs(vel(s + 1 / 120) - vel(s)));
    expect(worst).toBeLessThan((r.speed / TURN_S) * 1.6 / 120 + 0.05);
  });

  it('Durchgänge unterscheiden sich (Rhythmus, Startrichtung); gleicher Startwert → gleiche Bahn', () => {
    const a = build(4, 1);
    const b = build(4, 1);
    const c = build(4, 2);
    expect(a.target(3.3)).toEqual(b.target(3.3));
    let diff = 0;
    for (let s = 0; s < 10; s += 0.5) diff += Math.abs(a.target(s).x - c.target(s).x);
    expect(diff).toBeGreaterThan(5);
  });

  it('makeRule: Bahn der Schiene liegt etwas über der Mitte', () => {
    const r = makeRule({ level: 3, rng: createRng(1), hw: 55, hh: 30, seconds: 11, demo: false });
    expect(r.target(1).y).toBeLessThan(0);
  });
});

checkNachfuehrenExercise(seitwaertsFolgen, science);
