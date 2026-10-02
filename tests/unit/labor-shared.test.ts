/**
 * Gemeinsame Bausteine der Labor-Übungen: Wertetreppe (aus labor/test/adaptive.test.js) und Wortliste.
 */
import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import { mean } from '../../src/core/stats';
import { makeValueStaircase, type ValueStaircaseOptions } from '../../src/exercises/_shared/labor-adaptive';
import { anagrammeVon, WOERTER, woerterMitLaenge } from '../../src/exercises/_shared/labor-woerter';

const stair = (over: Partial<ValueStaircaseOptions> = {}) =>
  makeValueStaircase({ start: 200, min: 16, max: 2000, factorHarder: 0.8, factorEasier: 1.25, needCorrect: 2, ...over });

describe('Wertetreppe (adaptives Verfahren)', () => {
  it('zwei richtige in Folge machen schwerer, ein Fehler macht leichter', () => {
    const s = stair();
    expect(s.value()).toBe(200);
    s.record(true);
    expect(s.value()).toBe(200);
    s.record(true);
    expect(s.value()).toBe(160);
    s.record(false);
    expect(s.value()).toBe(200);
  });

  it('eine falsche Antwort setzt die Serie zurück', () => {
    const s = stair();
    s.record(true);
    s.record(false);
    s.record(true);
    expect(s.value()).toBe(250);
  });

  it('Umkehrpunkte und Schwelle', () => {
    const s = stair();
    expect(s.threshold()).toBeNull();
    s.record(true);
    s.record(true);
    s.record(false);
    s.record(true);
    s.record(true);
    s.record(false);
    expect(s.reversals()).toEqual([160, 200, 160]);
    expect(s.threshold()).toBe(mean([160, 200, 160]));
    expect(s.threshold(2)).toBe(180);
  });

  it('Grenzen werden eingehalten, auch bei Rundung', () => {
    const lo = stair({ start: 17, min: 16 });
    lo.record(true);
    lo.record(true);
    expect(lo.value()).toBe(16);
    lo.record(true);
    lo.record(true);
    expect(lo.value()).toBe(16);
    const hi = stair({ start: 1900, max: 2000 });
    hi.record(false);
    expect(hi.value()).toBe(2000);
  });

  it('Verlauf wird festgehalten', () => {
    const s = stair();
    s.record(true);
    s.record(false);
    expect(s.history()).toEqual([
      { value: 200, correct: true },
      { value: 200, correct: false },
    ]);
  });

  it('Konvergenz: simulierte Versuchsperson mit fester Schwelle', () => {
    const rng = createRng(11);
    const s = stair({ start: 400 });
    const truth = 120;
    for (let i = 0; i < 400; i++) {
      const v = s.value();
      const pCorrect = 0.25 + 0.75 / (1 + Math.exp(-(v - truth) / 15));
      s.record(rng.next() < pCorrect);
    }
    const th = s.threshold(8)!;
    expect(th).toBeGreaterThan(80);
    expect(th).toBeLessThan(220);
  });
});

describe('Wortliste', () => {
  it('keine Doppelten, Längen werden gefunden, Anagramme enthalten das Wort selbst', () => {
    expect(new Set(WOERTER).size).toBe(WOERTER.length);
    expect(WOERTER.length).toBeGreaterThan(100);
    expect(woerterMitLaenge(4).every((w) => w.length === 4)).toBe(true);
    expect(woerterMitLaenge(4).length).toBeGreaterThan(5);
    expect(anagrammeVon('Haus')).toContain('Haus');
    expect(anagrammeVon('Tür')).toEqual(['Tür']);
  });
});
