import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  brightness,
  createStaircase,
  FIELDS,
  MAX_LEN,
  MIN_LEN,
  makeSequence,
  periodMs,
  showDurationMs,
  showTiming,
  TAP_TIMING,
} from '../../src/exercises/leuchtfolge/logic';
import { de, it as itTexts } from '../../src/exercises/leuchtfolge/texts';
import { science } from '../../src/exercises/leuchtfolge/science';

describe('Leuchtfolge – Folgen', () => {
  it('hat die verlangte Länge, nur gültige Felder, nie dasselbe Feld direkt hintereinander', () => {
    for (let seed = 1; seed <= 200; seed++) {
      const rng = createRng(seed);
      for (let len = MIN_LEN; len <= MAX_LEN; len++) {
        const s = makeSequence(rng, len);
        expect(s.length).toBe(len);
        for (let i = 0; i < s.length; i++) {
          expect(Number.isInteger(s[i]) && s[i] >= 0 && s[i] < FIELDS).toBe(true);
          if (i > 0) expect(s[i]).not.toBe(s[i - 1]);
          if (i > 1) expect(s[i] - s[i - 1]).not.toBe(s[i - 1] - s[i - 2]);
        }
      }
    }
  });

  it('ist mit gleichem Startwert reproduzierbar und nutzt alle Felder', () => {
    expect(makeSequence(createRng(7), 10)).toEqual(makeSequence(createRng(7), 10));
    const used = new Set<number>();
    const rng = createRng(3);
    for (let i = 0; i < 60; i++) makeSequence(rng, 8).forEach((f) => used.add(f));
    expect(used.size).toBe(FIELDS);
  });
});

describe('Leuchtfolge – Takt und Helligkeit', () => {
  it('höchstens 2 Leuchtphasen pro Sekunde, mindestens 280 ms dunkel dazwischen', () => {
    for (let len = MIN_LEN; len <= MAX_LEN; len++) {
      const p = periodMs(len);
      expect(1000 / p).toBeLessThanOrEqual(2);
      const tm = showTiming(len);
      expect(tm.hold).toBeGreaterThan(0);
      expect(p - (tm.rise + tm.hold + tm.fall)).toBeGreaterThanOrEqual(280);
      expect(showDurationMs(len)).toBe(len * p);
    }
  });

  it('Helligkeit verläuft weich zwischen 0 und 1, ohne Sprünge', () => {
    const tm = showTiming(5);
    expect(brightness(-10, tm)).toBe(0);
    expect(brightness(0, tm)).toBe(0);
    expect(brightness(tm.rise + tm.hold / 2, tm)).toBe(1);
    expect(brightness(tm.rise + tm.hold + tm.fall + 5, tm)).toBe(0);
    let prev = 0;
    for (let t = 0; t <= 1000; t += 4) {
      const b = brightness(t, tm);
      expect(b).toBeGreaterThanOrEqual(0);
      expect(b).toBeLessThanOrEqual(1);
      expect(Math.abs(b - prev)).toBeLessThan(0.1); // höchstens 10 % Änderung je 4 ms
      prev = b;
    }
    expect(brightness(TAP_TIMING.rise + 10, TAP_TIMING)).toBeGreaterThan(0.9);
  });
});

describe('Leuchtfolge – Treppe', () => {
  it('Start bei 3 bzw. gespeicherter Stufe, geklemmt auf 2–12', () => {
    expect(createStaircase(null).level).toBe(3);
    expect(createStaircase(6.4).level).toBe(6);
    expect(createStaircase(99).level).toBe(MAX_LEN);
    expect(createStaircase(-3).level).toBe(MIN_LEN);
  });

  it('länger bei Erfolg, kürzer bei Fehler, je um eine Stelle', () => {
    const s = createStaircase(4);
    s.update(true);
    expect(s.level).toBe(5);
    s.update(true);
    expect(s.level).toBe(6);
    s.update(false);
    expect(s.level).toBe(5);
    s.update(false);
    expect(s.level).toBe(4);
  });

  it('bleibt in den Grenzen', () => {
    const lo = createStaircase(MIN_LEN);
    for (let i = 0; i < 5; i++) lo.update(false);
    expect(lo.level).toBe(MIN_LEN);
    const hi = createStaircase(MAX_LEN - 1);
    for (let i = 0; i < 5; i++) hi.update(true);
    expect(hi.level).toBe(MAX_LEN);
  });
});

describe('Leuchtfolge – Texte', () => {
  it('de und it haben dieselben Schlüssel, why endet mit dem Hinweis', () => {
    for (const k of ['captions', 'metrics', 'tips', 'feedback'] as const) {
      expect(Object.keys(itTexts[k]).sort()).toEqual(Object.keys(de[k]).sort());
    }
    expect(de.why.endsWith('Ob das im Alltag hilft, ist nicht belegt.')).toBe(true);
    expect(de.tagline.length).toBeLessThanOrEqual(80);
    de.steps.forEach((s) => expect(s.length).toBeLessThanOrEqual(60));
    itTexts.steps.forEach((s) => expect(s.length).toBeLessThanOrEqual(60));
  });

  it('Hintergrundtext hat Quellen und alle Felder', () => {
    expect(science.id).toBe('leuchtfolge');
    expect(science.sources.length).toBeGreaterThanOrEqual(3);
    for (const s of science.sources) expect(s.url).toMatch(/^https:\/\//);
    for (const lang of ['de', 'it'] as const) for (const k of ['trains', 'daily', 'research', 'improved'] as const) expect(science.texts[lang][k].length).toBeGreaterThan(20);
  });
});
