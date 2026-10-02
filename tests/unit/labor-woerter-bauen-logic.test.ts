/**
 * Wörter bauen (Labor): Logik. Übertragen aus labor/test/wordbuild.test.js (Prototyp) und erweitert: italienische Wortliste,
 * Anagramme in beiden Sprachen, Grenzfälle, Kennzahlen ohne NaN, Einstellungs-Bereinigung, Layout.
 * Keine festen Zufallswerte (andere Zufallsfolge als im Prototyp), nur Eigenschaften.
 */
import { describe, expect, it } from 'vitest';
import { defaultParams, sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import { WOERTER } from '../../src/exercises/_shared/labor-woerter';
import {
  displayLetter,
  layoutWord,
  PARAMS,
  pointsFor,
  rowRect,
  tipFor,
  UNDO_MIN_H,
  WordSession,
  wordParams,
  type WordSummary,
} from '../../src/exercises/labor-woerter-bauen/logic';
import { anagrammeVon, sprachOf, WOERTER_IT, woerterMitLaenge, type Sprache } from '../../src/exercises/labor-woerter-bauen/woerter';

function make(over: Record<string, unknown> = {}, seed = 1, lang: Sprache = 'de'): WordSession {
  const p = wordParams(sanitizeParams(PARAMS, { ...defaultParams(PARAMS), ...over }));
  return new WordSession(p, { rng: createRng(seed), lang });
}

/** Setzt das aktuelle Wort richtig zusammen (Kachelindizes in Wortreihenfolge) */
function solve(s: WordSession, now: number) {
  const used = new Set<number>();
  let res: ReturnType<WordSession['place']> = null;
  for (const ch of s.target.toLowerCase()) {
    const i = s.tiles.findIndex((t, idx) => t.ch === ch && !used.has(idx));
    used.add(i);
    res = s.place(i, now);
  }
  return res;
}

describe('Wortlisten', () => {
  it('Deutsch: eindeutig, jede Länge von 3 bis 8 mit genug Wörtern, Schreibweise', () => {
    expect(new Set(WOERTER).size).toBe(WOERTER.length);
    for (let n = 3; n <= 8; n++) expect(woerterMitLaenge('de', n).length, `Länge ${n}`).toBeGreaterThanOrEqual(8);
    for (const w of WOERTER) expect(w, w).toMatch(/^[A-ZÄÖÜ][a-zäöüß]+$/);
    expect(anagrammeVon('de', 'Rad')).toEqual(['Rad']);
  });

  it('Italienisch: eindeutig, nur Kleinbuchstaben ohne Akzente, jede Länge von 3 bis 8 mit mindestens 11 Wörtern', () => {
    expect(new Set(WOERTER_IT).size).toBe(WOERTER_IT.length);
    for (const w of WOERTER_IT) expect(w, w).toMatch(/^[a-z]+$/);
    for (let n = 3; n <= 8; n++) {
      const l = woerterMitLaenge('it', n);
      expect(l.length, `Länge ${n}`).toBeGreaterThanOrEqual(11);
      for (const w of l) expect(w.length).toBe(n);
    }
    // keine Wörter außerhalb 3–8
    expect(WOERTER_IT.every((w) => w.length >= 3 && w.length <= 8)).toBe(true);
  });

  it('Anagramme: jedes Wort ist sein eigenes Anagramm, in beiden Sprachen', () => {
    for (const w of WOERTER) expect(anagrammeVon('de', w)).toContain(w);
    for (const w of WOERTER_IT) expect(anagrammeVon('it', w)).toContain(w);
    // Beispiel mit zwei Wörtern aus denselben Buchstaben (De): See/Tee zählen nicht, Reh/Rhe schon gar nicht – prüfe über die Liste
    const groups = new Map<string, string[]>();
    for (const w of WOERTER) groups.set(w.toLowerCase().split('').sort().join(''), [...(groups.get(w.toLowerCase().split('').sort().join('')) ?? []), w]);
    for (const [, ws] of groups) if (ws.length > 1) expect(anagrammeVon('de', ws[0]).sort()).toEqual([...ws].sort());
  });

  it('Sprache folgt der App-Sprache', () => {
    expect(sprachOf('it')).toBe('it');
    expect(sprachOf('de')).toBe('de');
    expect(sprachOf('en')).toBe('de');
    expect(woerterMitLaenge('it', 4)).not.toEqual(woerterMitLaenge('de', 4));
  });
});

describe('Einstellungen', () => {
  it('Standardwerte und Grenzen wie im Prototyp, Ton neutral', () => {
    expect(defaultParams(PARAMS)).toEqual({ wordLength: 5, words: 8, tileCm: 2.5, sound: 'no' });
    expect(PARAMS.find((x) => x.key === 'wordLength')).toMatchObject({ min: 3, max: 8, step: 1 });
    expect(PARAMS.find((x) => x.key === 'words')).toMatchObject({ min: 3, max: 30, step: 1 });
    expect(PARAMS.find((x) => x.key === 'tileCm')).toMatchObject({ min: 1.5, max: 5, step: 0.5 });
    expect(PARAMS.find((x) => x.key === 'sound')?.neutral).toBe(true);
  });

  it('Bereinigung: außerhalb der Grenzen, falscher Typ, fehlende Werte', () => {
    const p = wordParams(sanitizeParams(PARAMS, { wordLength: 99, words: 1, tileCm: 'x', sound: 'laut' }));
    expect(p).toEqual({ wordLength: 8, words: 3, tileCm: 2.5, sound: 'no' });
    expect(wordParams({})).toEqual({ wordLength: 5, words: 8, tileCm: 2.5, sound: 'no' });
  });
});

describe('Wörter und Kacheln', () => {
  for (const lang of ['de', 'it'] as const) {
    it(`${lang}: gewünschte Länge, Anzahl, ohne Wiederholung solange möglich`, () => {
      for (let n = 3; n <= 8; n++) {
        const s = make({ wordLength: n, words: 8 }, 3, lang);
        expect(s.words).toHaveLength(8);
        for (const w of s.words) expect(w).toHaveLength(n);
        expect(new Set(s.words).size).toBe(8);
      }
      const many = make({ wordLength: 8, words: 30 }, 3, lang);
      expect(many.words).toHaveLength(30);
      for (let i = 1; i < many.words.length; i++) expect(many.words[i]).not.toBe(many.words[i - 1]);
    });

    it(`${lang}: Kacheln sind durchmischt, enthalten genau die Buchstaben, sind nie schon ein gültiges Wort, nur Kleinbuchstaben`, () => {
      for (let seed = 1; seed < 40; seed++) {
        const s = make({ wordLength: 3 + (seed % 6) }, seed, lang);
        const letters = s.tiles.map((t) => t.ch);
        expect([...letters].sort().join('')).toBe(s.target.toLowerCase().split('').sort().join(''));
        const valid = anagrammeVon(lang, s.target).map((w) => w.toLowerCase());
        expect(valid).not.toContain(letters.join(''));
        expect(letters.every((c) => c === c.toLowerCase())).toBe(true);
      }
    });
  }

  it('der Anfangsbuchstabe wird nicht durch einen Großbuchstaben verraten (Abweichung vom Prototyp)', () => {
    for (let seed = 1; seed < 20; seed++) {
      const s = make({}, seed);
      expect(s.tiles.every((t) => t.ch === t.ch.toLowerCase())).toBe(true);
    }
    expect(displayLetter('h')).toBe('H');
    expect(displayLetter('ß')).toBe('ß');
    expect(displayLetter('ü')).toBe('Ü');
  });

  it('gleicher Startwert → gleiche Wörter', () => {
    expect(make({}, 9).words).toEqual(make({}, 9).words);
    expect(make({}, 9).words).not.toEqual(make({}, 10).words);
  });

  it('feste Wortfolge (Intro-Film) mit unterschiedlichen Längen', () => {
    const s = new WordSession(wordParams({}), { rng: createRng(1), lang: 'de', fixedWords: ['Haus', 'Hut'] });
    expect(s.words).toEqual(['Haus', 'Hut']);
    expect(s.tiles).toHaveLength(4);
    s.start(0);
    s.beginWord(0);
    solve(s, 1000);
    expect(s.tiles).toHaveLength(3);
    expect(solve(s, 2000)?.type).toBe('finished');
  });

  it('Wort aus gleichen Buchstaben (Anagramm) wird akzeptiert, auch in Kleinschreibung; die Anordnung der Kacheln ist nie selbst gültig', () => {
    // Beide Listen haben keine Anagramm-Paare: die Logik wird mit einer künstlichen Zuordnung geprüft
    const pairs: Record<string, string[]> = { Rad: ['Rad', 'Dar'], Dar: ['Rad', 'Dar'] };
    for (let seed = 1; seed < 30; seed++) {
      const s = new WordSession(wordParams({}), { rng: createRng(seed), lang: 'de', fixedWords: ['Rad'], anagrams: (w) => pairs[w] ?? [w] });
      s.start(0);
      s.beginWord(0);
      const letters = s.tiles.map((t) => t.ch).join('');
      expect(['rad', 'dar']).not.toContain(letters);
      // „dar“ legen: akzeptiert
      const used = new Set<number>();
      let res: ReturnType<WordSession['place']> = null;
      for (const ch of 'dar') {
        const i = s.tiles.findIndex((t, idx) => t.ch === ch && !used.has(idx));
        used.add(i);
        res = s.place(i, 900);
      }
      expect(res?.type).toBe('finished');
      expect(s.trials[0].word).toBe('Rad');
      expect(s.errors).toBe(0);
    }
    // Die echte Liste: das Zielwort selbst wird akzeptiert
    const s = make({ wordLength: 4 }, 2, 'it');
    s.start(0);
    expect(solve(s, 500)?.type).toBe('solved');
  });
});

describe('Ablauf', () => {
  it('richtig zusammensetzen löst das Wort und geht zum nächsten; Zeit ab beginWord', () => {
    const s = make({ wordLength: 4, words: 3 }, 5);
    s.start(0);
    s.beginWord(1000);
    const first = s.target;
    const res = solve(s, 3500);
    expect(res?.type).toBe('solved');
    expect(s.trials[0].word).toBe(first);
    expect(s.trials[0].ms).toBe(2500);
    expect(s.idx).toBe(1);
    expect(s.slots).toHaveLength(0);
    expect(s.tiles.every((t) => !t.used)).toBe(true);
    expect(s.wordStartedAt).toBeNull();
  });

  it('falsches Wort: Fehler, Kacheln zurück, Wort bleibt; Fehler je Wort werden mitgezählt', () => {
    const s = make({ wordLength: 5, words: 3 }, 8);
    s.start(0);
    s.beginWord(0);
    const target = s.target;
    let tries = 0;
    let res = null as ReturnType<WordSession['place']>;
    do {
      for (let i = 0; i < s.tiles.length; i++) res = s.place(i, 1000);
      tries++;
    } while (res?.type !== 'wrong' && tries < 3);
    expect(res?.type).toBe('wrong');
    expect(s.errors).toBe(1);
    expect(s.target).toBe(target);
    expect(s.slots).toHaveLength(0);
    solve(s, 4000);
    expect(s.trials[0].errors).toBe(1);
    expect(s.trials[0].ms).toBe(4000);
  });

  it('Zurücknehmen und doppeltes Antippen', () => {
    const s = make({ wordLength: 4 }, 1);
    s.start(0);
    expect(s.place(0, 10)?.type).toBe('placed');
    expect(s.place(0, 11)).toBeNull(); // Kachel schon benutzt
    expect(s.removeLast()?.type).toBe('removed');
    expect(s.tiles[0].used).toBe(false);
    expect(s.removeLast()).toBeNull();
    expect(s.place(99, 12)).toBeNull();
    expect(s.place(-1, 12)).toBeNull();
  });

  it('Ende nach allen Wörtern: finished, danach keine Eingabe mehr', () => {
    const s = make({ wordLength: 3, words: 3 }, 2);
    s.start(0);
    s.beginWord(0);
    solve(s, 2000);
    s.beginWord(2000);
    solve(s, 5000);
    s.beginWord(5000);
    const r = solve(s, 6000);
    expect(r?.type).toBe('finished');
    expect(s.finished).toBe(true);
    expect(s.place(0, 7000)).toBeNull();
    expect(s.removeLast()).toBeNull();
  });
});

describe('Kennzahlen', () => {
  it('Werte wie im Prototyp (gelöst, Fehler, Mittel, Median, Gesamtzeit, Buchstaben pro Minute)', () => {
    const s = make({ wordLength: 3, words: 3 }, 2);
    s.start(0);
    s.beginWord(0);
    solve(s, 2000);
    s.beginWord(2000);
    solve(s, 4000);
    s.beginWord(4000);
    solve(s, 6000);
    const sum = s.summary();
    expect(sum.solved).toBe(3);
    expect(sum.words).toBe(3);
    expect(sum.errors).toBe(0);
    expect(sum.tMean).toBe(2000);
    expect(sum.tMedian).toBe(2000);
    expect(sum.totalMs).toBe(6000); // Summe der Wortzeiten
    expect(sum.lpm).toBe(90); // 9 Buchstaben in 6 s
    expect(sum.trials).toHaveLength(3);
  });

  it('Pausen zwischen den Wörtern zählen nicht zur Zeit (beginWord erst nach der Pause)', () => {
    const s = make({ wordLength: 3, words: 3 }, 2);
    s.start(0);
    s.beginWord(0);
    solve(s, 2000);
    s.beginWord(2800); // 800 ms Pause
    solve(s, 4800);
    expect(s.trials.map((t) => t.ms)).toEqual([2000, 2000]);
    expect(s.summary().totalMs).toBe(4000);
  });

  it('ohne gelöstes Wort: alle Zeiten null (keine NaN)', () => {
    const s = make();
    const sum = s.summary();
    expect(sum.solved).toBe(0);
    for (const v of [sum.tMean, sum.tMedian, sum.totalMs, sum.lpm]) expect(v).toBeNull();
  });

  it('Buchstaben pro Minute zählt die tatsächlichen Buchstaben (feste Folge mit 4 und 3 Buchstaben)', () => {
    const s = new WordSession(wordParams({}), { rng: createRng(1), lang: 'de', fixedWords: ['Haus', 'Hut'] });
    s.start(0);
    s.beginWord(0);
    solve(s, 3000);
    s.beginWord(3000);
    solve(s, 6000);
    expect(s.summary().lpm).toBe(70); // 7 Buchstaben in 6 s
  });

  it('Tipps und Punkte', () => {
    const base: WordSummary = { solved: 8, words: 8, errors: 0, tMean: 3000, tMedian: 3000, totalMs: 24000, lpm: 100, trials: [] };
    expect(tipFor({ ...base, errors: 5 })).toBe('errors');
    expect(tipFor({ ...base, tMean: 12000, errors: 1 })).toBe('slow');
    expect(tipFor(base)).toBe('harder');
    expect(tipFor({ ...base, errors: 1 })).toBe('compare');
    expect(pointsFor(8, 0)).toBe(80);
    expect(pointsFor(3, 100)).toBe(0);
  });
});

describe('Layout', () => {
  const stages: Array<[number, number]> = [
    [1180, 700],
    [820, 1000],
    [390, 600],
    [320, 420],
  ];
  it('alles liegt im Bereich: Felder, Kacheln, „Zurück“ (alle Wortlängen, Quer- und Hochformat), Knopf ≥ 56 px hoch', () => {
    for (const [bw, bh] of stages) {
      for (let n = 3; n <= 8; n++) {
        for (const wanted of [20, 95, 190]) {
          const box = { x: 10, y: 44, w: bw - 20, h: bh - 54 };
          const L = layoutWord(box, n, wanted, 40);
          for (let i = 0; i < n; i++) {
            for (const y of [L.slotY, L.tileY]) {
              const r = rowRect(L, i, y);
              expect(r.x).toBeGreaterThanOrEqual(box.x - 1e-6);
              expect(r.x + r.w).toBeLessThanOrEqual(box.x + box.w + 1e-6);
              expect(r.y).toBeGreaterThanOrEqual(box.y + 40 - 1e-6);
              expect(r.y + r.h).toBeLessThanOrEqual(box.y + box.h + 1e-6);
            }
          }
          expect(L.undo.y + L.undo.h).toBeLessThanOrEqual(box.y + box.h + 1e-6);
          expect(L.undo.x).toBeGreaterThanOrEqual(box.x - 1e-6);
          expect(L.undo.x + L.undo.w).toBeLessThanOrEqual(box.x + box.w + 1e-6);
          expect(L.undo.h).toBeGreaterThanOrEqual(UNDO_MIN_H);
          expect(L.tile).toBeLessThanOrEqual(wanted + 1e-6);
          // Reihen überlappen nicht
          expect(L.tileY).toBeGreaterThanOrEqual(L.slotY + L.tile - 1e-6);
          expect(L.undo.y).toBeGreaterThanOrEqual(L.tileY + L.tile - 1e-6);
        }
      }
    }
  });

  it('Auf dem Handy bleiben auch acht Kacheln ≥ 36 px groß', () => {
    const L = layoutWord({ x: 10, y: 44, w: 370, h: 700 }, 8, 95, 40);
    expect(L.tile).toBeGreaterThanOrEqual(36);
  });

  it('Gewünschte Größe wird nicht überschritten und bei viel Platz erreicht', () => {
    const L = layoutWord({ x: 0, y: 0, w: 1200, h: 800 }, 5, 95, 40);
    expect(L.tile).toBeCloseTo(95, 5);
  });
});
