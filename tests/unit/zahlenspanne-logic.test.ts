import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  backwardStart,
  BACKWARD_FROM,
  createBackwardStaircase,
  createForwardStaircase,
  digitAlpha,
  DIGIT_MS,
  expected,
  isCorrect,
  makeDigits,
  MAX_LEN,
  MIN_LEN,
  playsBackward,
  QUICK_BACKWARD_FROM,
} from '../../src/exercises/zahlenspanne/logic';
import { de, it as itTexts } from '../../src/exercises/zahlenspanne/texts';
import { science } from '../../src/exercises/zahlenspanne/science';

describe('Zahlenspanne – Ziffernfolgen', () => {
  it('richtige Länge, nur Ziffern 0–9', () => {
    const rng = createRng(11);
    for (let len = MIN_LEN; len <= MAX_LEN; len++) {
      const d = makeDigits(rng, len);
      expect(d.length).toBe(len);
      for (const x of d) expect(Number.isInteger(x) && x >= 0 && x <= 9).toBe(true);
    }
  });

  it('nie dieselbe Ziffer zweimal direkt hintereinander, keine Zahlenmuster (123, 135, 864, 555)', () => {
    for (let seed = 1; seed <= 300; seed++) {
      const rng = createRng(seed);
      for (let len = MIN_LEN; len <= MAX_LEN; len++) {
        const d = makeDigits(rng, len);
        for (let i = 1; i < d.length; i++) {
          expect(d[i]).not.toBe(d[i - 1]);
          if (i > 1) expect(d[i] - d[i - 1]).not.toBe(d[i - 1] - d[i - 2]);
        }
      }
    }
  });

  it('verwendet alle Ziffern und ist mit gleichem Startwert reproduzierbar', () => {
    expect(makeDigits(createRng(5), 9)).toEqual(makeDigits(createRng(5), 9));
    const used = new Set<number>();
    const rng = createRng(2);
    for (let i = 0; i < 80; i++) makeDigits(rng, 8).forEach((x) => used.add(x));
    expect(used.size).toBe(10);
  });
});

describe('Zahlenspanne – Prüfung', () => {
  it('vorwärts wie gezeigt, rückwärts umgekehrt', () => {
    const d = [4, 7, 2, 9];
    expect(expected(d, false)).toEqual([4, 7, 2, 9]);
    expect(expected(d, true)).toEqual([9, 2, 7, 4]);
    expect(d).toEqual([4, 7, 2, 9]); // nicht verändert
    expect(isCorrect([4, 7, 2, 9], d, false)).toBe(true);
    expect(isCorrect([9, 2, 7, 4], d, false)).toBe(false);
    expect(isCorrect([9, 2, 7, 4], d, true)).toBe(true);
    expect(isCorrect([4, 7, 2], d, false)).toBe(false);
    expect(isCorrect([4, 7, 2, 9, 1], d, false)).toBe(false);
  });
});

describe('Zahlenspanne – Takt', () => {
  it('ca. eine Ziffer pro Sekunde, weich ein- und ausgeblendet, lückenlos dunkel am Taktende', () => {
    expect(DIGIT_MS).toBe(1000);
    expect(digitAlpha(0)).toBe(0);
    expect(digitAlpha(DIGIT_MS / 2)).toBe(1);
    expect(digitAlpha(DIGIT_MS - 1)).toBe(0);
    let prev = 0;
    for (let t = 0; t <= DIGIT_MS; t += 4) {
      const a = digitAlpha(t);
      expect(a).toBeGreaterThanOrEqual(0);
      expect(a).toBeLessThanOrEqual(1);
      expect(Math.abs(a - prev)).toBeLessThan(0.1);
      prev = a;
    }
  });
});

describe('Zahlenspanne – Treppen und Rückwärts-Variante', () => {
  it('vorwärts: eine Ziffer mehr bei Erfolg, eine weniger bei Fehler, Grenzen 3–12', () => {
    const s = createForwardStaircase(null);
    expect(s.level).toBe(3);
    s.update(true);
    expect(s.level).toBe(4);
    s.update(true);
    expect(s.level).toBe(5);
    s.update(false);
    expect(s.level).toBe(4);
    const lo = createForwardStaircase(MIN_LEN);
    lo.update(false);
    expect(lo.level).toBe(MIN_LEN);
    const hi = createForwardStaircase(MAX_LEN);
    hi.update(true);
    expect(hi.level).toBe(MAX_LEN);
    expect(createForwardStaircase(7.6).level).toBe(8);
  });

  it('rückwärts erst ab höherer Stufe', () => {
    expect(playsBackward(BACKWARD_FROM - 1, false)).toBe(false);
    expect(playsBackward(BACKWARD_FROM, false)).toBe(true);
    expect(playsBackward(0, false)).toBe(false);
    expect(playsBackward(QUICK_BACKWARD_FROM, true)).toBe(true);
    expect(playsBackward(QUICK_BACKWARD_FROM - 1, true)).toBe(false);
  });

  it('Rückwärts-Start ist kürzer als die beste Vorwärts-Folge, aber mindestens 3', () => {
    expect(backwardStart(8)).toBe(5);
    expect(backwardStart(6)).toBe(3);
    expect(backwardStart(3)).toBe(MIN_LEN);
    const s = createBackwardStaircase(8);
    expect(s.level).toBe(5);
    s.update(true);
    expect(s.level).toBe(6);
    s.update(false);
    expect(s.level).toBe(5);
  });
});

describe('Zahlenspanne – Texte', () => {
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
    expect(science.id).toBe('zahlenspanne');
    expect(science.sources.length).toBeGreaterThanOrEqual(3);
    for (const s of science.sources) expect(s.url).toMatch(/^https:\/\//);
    for (const lang of ['de', 'it'] as const) for (const k of ['trains', 'daily', 'research', 'improved'] as const) expect(science.texts[lang][k].length).toBeGreaterThan(20);
  });
});
