/**
 * Worth-Vier-Punkte (Labor): reine Logik – Einstellungen, Größenfolge, Antworten und Zählung der gemeldeten Zahlen.
 */
import { describe, expect, it } from 'vitest';
import { sanitizeParams } from '../../src/core/params';
import { ANSWERS, BIG_FACTOR, PARAMS, sizesFor, tipFor, WorthSession, worthParams, type WorthAnswer } from '../../src/exercises/labor-worth/logic';

const P = (over: Record<string, unknown> = {}) => worthParams(sanitizeParams(PARAMS, over));

describe('Einstellungen', () => {
  it('Standardwerte und Grenzen', () => {
    expect(P()).toMatchObject({ repeats: 4, dotCm: 1.2, varySize: true, leftLens: 'red', tones: 'redgreen' });
    expect(P({ repeats: 99 }).repeats).toBe(12);
    expect(P({ repeats: 1 }).repeats).toBe(2);
    expect(P({ dotCm: 9 }).dotCm).toBe(4);
    expect(P({ dotCm: 0.1 }).dotCm).toBe(0.3);
    expect(P({ varySize: 'no' }).varySize).toBe(false);
    expect(P({ varySize: 'quatsch' }).varySize).toBe(true);
  });

  it('Größenfolge: klein und groß im Wechsel (die zweite ist groß, 2,5-fach), sonst immer gleich', () => {
    expect(BIG_FACTOR).toBe(2.5);
    expect(sizesFor({ repeats: 4, dotCm: 1.2, varySize: true })).toEqual([1.2, 3, 1.2, 3]);
    expect(sizesFor({ repeats: 3, dotCm: 2, varySize: true })).toEqual([2, 5, 2]);
    expect(sizesFor({ repeats: 3, dotCm: 2, varySize: false })).toEqual([2, 2, 2]);
    expect(sizesFor({ repeats: 12, dotCm: 1, varySize: true })).toHaveLength(12);
  });
});

describe('Antworten und Zählung', () => {
  const make = (over: Record<string, unknown> = {}) => new WorthSession(P(over));

  it('die Antwortmöglichkeiten sind 2, 3, 4, 5 und „unklar“', () => {
    expect(ANSWERS).toEqual([2, 3, 4, 5, 'unclear']);
  });

  it('jede Antwort geht an die nächste Darbietung; nach der letzten ist Schluss und nichts wird mehr angenommen', () => {
    const s = make({ repeats: 3, varySize: 'no' });
    s.start(0);
    expect(s.idx).toBe(0);
    expect(s.answer(4, 1000)).toBe(true);
    expect(s.answer(4, 2500)).toBe(true);
    expect(s.finished).toBe(false);
    expect(s.answer(2, 3000)).toBe(true);
    expect(s.finished).toBe(true);
    expect(s.trials).toHaveLength(3);
    expect(s.answer(4, 4000)).toBe(false);
    expect(s.trials).toHaveLength(3);
    expect(s.trials.map((t) => t.ms)).toEqual([1000, 1500, 500]);
    expect(s.trials.map((t) => t.nr)).toEqual([1, 2, 3]);
  });

  it('gezeichnete Größe wird mit der eingestellten gespeichert; die aktuelle Größe folgt der Folge', () => {
    const s = make({ repeats: 2, dotCm: 1.2 });
    expect(s.currentSize).toBe(1.2);
    s.answer(4, 100, 0.9);
    expect(s.currentSize).toBe(3);
    s.answer(4, 200);
    expect(s.trials[0]).toMatchObject({ dotCm: 1.2, dotCmEff: 0.9 });
    expect(s.trials[1]).toMatchObject({ dotCm: 3, dotCmEff: 3 });
    // nach der letzten bleibt die letzte Größe
    expect(s.currentSize).toBe(3);
  });

  it('Zählung je Zahl, „unklar“ getrennt, Anteil der häufigsten Antwort', () => {
    const s = make({ repeats: 12 });
    const seq: WorthAnswer[] = [4, 4, 4, 4, 4, 4, 2, 2, 3, 5, 'unclear', 'unclear'];
    seq.forEach((a, i) => s.answer(a, 1000 * (i + 1)));
    const sum = s.summary();
    expect(sum).toMatchObject({ answered: 12, n4: 6, n2: 2, n3: 1, n5: 1, unclear: 2, sameShare: 50 });
    expect(sum.n2 + sum.n3 + sum.n4 + sum.n5 + sum.unclear).toBe(sum.answered);
    expect(sum.msMean).toBe(1000);
  });

  it('alle gleich = 100 %; ohne Antworten kein NaN', () => {
    const s = make({ repeats: 4 });
    for (let i = 0; i < 4; i++) s.answer(4, 100 * (i + 1));
    expect(s.summary().sameShare).toBe(100);
    const none = make().summary();
    expect(none).toMatchObject({ answered: 0, n2: 0, n3: 0, n4: 0, n5: 0, unclear: 0 });
    expect(none.sameShare).toBeNull();
    expect(none.msMean).toBeNull();
  });

  it('Tipp: bei „unklar“ der Hinweis zum Prüfbild, sonst der Standardtipp', () => {
    const s = make({ repeats: 2 });
    s.answer(4, 1);
    s.answer('unclear', 2);
    expect(tipFor(s.summary())).toBe('unclear');
    const t = make({ repeats: 2 });
    t.answer(4, 1);
    t.answer(4, 2);
    expect(tipFor(t.summary())).toBe('calm');
  });
});
