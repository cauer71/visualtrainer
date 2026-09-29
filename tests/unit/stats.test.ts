import { describe, expect, it } from 'vitest';
import { dPrime, median, probit, quantile, sd } from '../../src/core/stats';
import { createRng } from '../../src/core/rng';

describe('stats', () => {
  it('median / quantile', () => {
    expect(median([3, 1, 2])).toBe(2);
    expect(median([4, 1, 3, 2])).toBe(2.5);
    expect(quantile([0, 10], 0.25)).toBe(2.5);
    expect(Number.isNaN(median([]))).toBe(true);
  });

  it('sd', () => {
    expect(sd([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(2.138, 3);
  });

  it('probit ist die Umkehrung der Normalverteilung', () => {
    expect(probit(0.5)).toBeCloseTo(0, 6);
    expect(probit(0.975)).toBeCloseTo(1.96, 2);
    expect(probit(0.01)).toBeCloseTo(-2.326, 2);
  });

  it('dPrime ist endlich bei perfekten Quoten', () => {
    const d = dPrime(30, 30, 0, 10);
    expect(Number.isFinite(d)).toBe(true);
    expect(d).toBeGreaterThan(2);
  });
});

describe('rng', () => {
  it('ist mit gleichem Seed reproduzierbar', () => {
    const a = createRng(7);
    const b = createRng(7);
    for (let i = 0; i < 5; i++) expect(a.next()).toBe(b.next());
  });

  it('exp hat ungefähr den gewünschten Mittelwert', () => {
    const r = createRng(1);
    let s = 0;
    for (let i = 0; i < 20000; i++) s += r.exp(900);
    expect(s / 20000).toBeGreaterThan(860);
    expect(s / 20000).toBeLessThan(940);
  });
});
