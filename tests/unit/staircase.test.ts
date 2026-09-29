import { describe, expect, it } from 'vitest';
import { nextStartLevel, Staircase } from '../../src/core/staircase';
import { createRng } from '../../src/core/rng';

describe('Staircase', () => {
  it('wird nach n richtigen Antworten schwerer und nach einem Fehler leichter', () => {
    const s = new Staircase({ start: 5, min: 1, max: 20, down: 3, up: 1, initialBoost: 1 });
    expect(s.update(true)).toBe('same');
    expect(s.update(true)).toBe('same');
    expect(s.update(true)).toBe('harder');
    expect(s.level).toBe(6);
    expect(s.update(false)).toBe('easier');
    expect(s.level).toBe(5);
    expect(s.reversals).toEqual([6]);
  });

  it('bleibt innerhalb der Grenzen', () => {
    const s = new Staircase({ start: 2, min: 1, max: 3, down: 1, up: 1 });
    for (let i = 0; i < 10; i++) s.update(true);
    expect(s.level).toBe(3);
    for (let i = 0; i < 10; i++) s.update(false);
    expect(s.level).toBe(1);
  });

  it('nutzt bis zur ersten Umkehr größere Schritte', () => {
    const s = new Staircase({ start: 1, min: 1, max: 30, down: 1, up: 1, initialBoost: 2 });
    s.update(true);
    expect(s.level).toBe(3);
    s.update(false);
    expect(s.level).toBe(2); // nach der Umkehr normale Schritte
  });

  it('konvergiert bei 3-down/1-up in der Nähe der ~79-%-Schwelle', () => {
    // Simulierter Beobachter: Trefferwahrscheinlichkeit fällt mit der Stufe (logistisch, 79 % bei Stufe 10)
    const rng = createRng(42);
    const p = (lvl: number) => 1 / (1 + Math.exp((lvl - 10) / 1.5 - Math.log(0.794 / 0.206)));
    const thresholds: number[] = [];
    for (let run = 0; run < 40; run++) {
      const s = new Staircase({ start: 3, min: 1, max: 30, down: 3, up: 1 });
      for (let i = 0; i < 120; i++) s.update(rng.next() < p(s.level));
      thresholds.push(s.threshold(8));
    }
    const mean = thresholds.reduce((a, b) => a + b, 0) / thresholds.length;
    expect(mean).toBeGreaterThan(8.5);
    expect(mean).toBeLessThan(11.5);
  });

  it('startet die nächste Sitzung etwas leichter', () => {
    expect(nextStartLevel(7.4, 1, 20)).toBe(6.4);
    expect(nextStartLevel(1.2, 1, 20)).toBe(1);
  });
});

describe('Staircase.maxPlayed', () => {
  it('zählt nur tatsächlich gespielte Stufen', () => {
    const s = new Staircase({ start: 1, min: 1, max: 10, down: 1, up: 1, initialBoost: 1 });
    s.update(true); // gespielt auf 1 → nächste 2
    s.update(true); // gespielt auf 2 → nächste 3
    expect(s.maxPlayed).toBe(2);
    expect(s.maxLevel).toBe(3);
  });
});
