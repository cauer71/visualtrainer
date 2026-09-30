import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  createBalls,
  DEFAULTS,
  evaluate,
  makeStaircase,
  MAX_LEVEL,
  minPairDistance,
  speedForLevel,
  step,
  summarize,
  type TrialResult,
} from '../../src/vr/logic';

describe('Kugel-Detektiv 3D – Logik', () => {
  it('Tempo steigt mit der Stufe und bleibt begrenzt', () => {
    expect(speedForLevel(1)).toBeCloseTo(0.15, 5);
    for (let l = 1; l < MAX_LEVEL; l++) expect(speedForLevel(l + 1)).toBeGreaterThan(speedForLevel(l));
    expect(speedForLevel(99)).toBe(speedForLevel(MAX_LEVEL));
    expect(speedForLevel(MAX_LEVEL)).toBeLessThan(1.6);
  });

  it('erzeugt 8 Kugeln, genau 4 Ziele, ohne Überlappung im Würfel', () => {
    for (let seed = 1; seed <= 30; seed++) {
      const rng = createRng(seed);
      const balls = createBalls(rng, 0.5);
      expect(balls.length).toBe(DEFAULTS.count);
      expect(balls.filter((b) => b.target).length).toBe(DEFAULTS.targets);
      expect(minPairDistance(balls)).toBeGreaterThan(DEFAULTS.radius * 3);
      for (const b of balls) {
        expect(Math.hypot(b.v.x, b.v.y, b.v.z)).toBeCloseTo(0.5, 5);
        for (const k of ['x', 'y', 'z'] as const) expect(Math.abs(b.p[k])).toBeLessThanOrEqual(DEFAULTS.half - DEFAULTS.radius);
      }
    }
  });

  it('Kugeln bleiben im Würfel, halten das Tempo und durchdringen einander nicht', () => {
    const rng = createRng(42);
    const speed = speedForLevel(12);
    const balls = createBalls(rng, speed);
    let minD = Infinity;
    for (let i = 0; i < 72 * 30; i++) {
      step(balls, 1 / 72, speed, rng);
      minD = Math.min(minD, minPairDistance(balls));
      for (const b of balls) {
        for (const k of ['x', 'y', 'z'] as const) expect(Math.abs(b.p[k])).toBeLessThanOrEqual(DEFAULTS.half - DEFAULTS.radius + 1e-9);
        expect(Math.hypot(b.v.x, b.v.y, b.v.z)).toBeCloseTo(speed, 5);
      }
    }
    expect(minD).toBeGreaterThan(DEFAULTS.radius * 1.6);
  });

  it('Bewegung nutzt die Tiefe (z) genauso wie die Breite', () => {
    const speed = 0.6;
    const sum = { x: 0, y: 0, z: 0 };
    for (let seed = 1; seed <= 12; seed++) {
      const rng = createRng(seed);
      const balls = createBalls(rng, speed);
      for (let i = 0; i < 72 * 20; i++) {
        step(balls, 1 / 72, speed, rng);
        for (const b of balls) for (const k of ['x', 'y', 'z'] as const) sum[k] += Math.abs(b.v[k]);
      }
    }
    const r = sum.z / ((sum.x + sum.y) / 2);
    expect(r).toBeGreaterThan(0.85);
    expect(r).toBeLessThan(1.15);
  });

  it('Auswertung zählt nur markierte Kugeln, doppelte Wahl zählt einmal', () => {
    const balls = createBalls(createRng(3), 0.3);
    const t = balls.map((b, i) => (b.target ? i : -1)).filter((i) => i >= 0);
    const n = balls.map((b, i) => (b.target ? -1 : i)).filter((i) => i >= 0);
    expect(evaluate(balls, t, 5)).toEqual({ level: 5, correct: 4, of: 4, perfect: true });
    expect(evaluate(balls, [t[0], t[0], n[0], n[1]], 5).correct).toBe(1);
    expect(evaluate(balls, [t[0], t[1], t[2], n[0]], 5).perfect).toBe(false);
    expect(evaluate(balls, [], 5).correct).toBe(0);
    expect(evaluate(balls, [99, -1], 5).correct).toBe(0);
  });

  it('Treppe: zwei perfekte Durchgänge → schneller, ein Fehler → langsamer', () => {
    const s = makeStaircase(4);
    s.update(true);
    expect(s.level).toBe(4);
    s.update(true);
    expect(s.level).toBe(5);
    s.update(false);
    expect(s.level).toBe(4);
  });

  it('Zusammenfassung', () => {
    const s = makeStaircase(4);
    const res: TrialResult[] = [];
    for (const ok of [true, true, false, true, true, true, false, true]) {
      res.push({ level: s.level, correct: ok ? 4 : 2, of: 4, perfect: ok });
      s.update(ok);
    }
    const sum = summarize(res, s);
    expect(sum.trials).toBe(8);
    expect(sum.perfect).toBe(6);
    expect(sum.thresholdSpeed).toBeCloseTo(speedForLevel(sum.thresholdLevel), 5);
  });
});
