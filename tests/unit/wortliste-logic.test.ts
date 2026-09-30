import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  buildTrial,
  distractorCountFor,
  fadeMsFor,
  gridFor,
  isMastered,
  MAX_WORDS,
  MIN_BUTTON_H,
  MIN_WORDS,
  scoreTrial,
  showMsFor,
  toleranceFor,
  wordAlpha,
  wordCountFor,
  WordBag,
  wordsFor,
} from '../../src/exercises/wortliste/logic';
import { wortliste } from '../../src/exercises/wortliste';
import { WORDS_DE, WORDS_IT } from '../../src/exercises/wortliste/words';
import { simulate } from './_sim-w08-w09';

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ß/g, 'ss');

function lev(a: string, b: string): number {
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array<number>(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
  }
  return d[a.length][b.length];
}

const NUMBERS = {
  de: ['eins', 'zwei', 'drei', 'vier', 'funf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwolf', 'hundert', 'tausend', 'dutzend', 'paar', 'null'],
  it: ['uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove', 'dieci', 'cento', 'mille', 'paio', 'zero', 'doppio'],
};

describe('wortliste: Wortlisten', () => {
  for (const [name, list, nums] of [
    ['DE', WORDS_DE, NUMBERS.de],
    ['IT', WORDS_IT, NUMBERS.it],
  ] as const) {
    describe(name, () => {
      it('hat mindestens 120 eindeutige, kurze Wörter ohne Sonderzeichen', () => {
        expect(list.length).toBeGreaterThanOrEqual(120);
        expect(new Set(list.map(norm)).size).toBe(list.length);
        for (const w of list) {
          expect(w.length).toBeGreaterThanOrEqual(2);
          expect(w.length).toBeLessThanOrEqual(9);
          expect(w).toMatch(/^[A-Za-zÄÖÜäöüß]+$/);
        }
      });

      it('enthält keine Zahlwörter', () => {
        for (const w of list) expect(nums).not.toContain(norm(w));
      });

      it('hat keine ähnlich klingenden Paare (Editierabstand ≥ 2, keine gemeinsame 3-Buchstaben-Endung)', () => {
        const bad: string[] = [];
        for (let i = 0; i < list.length; i++) {
          for (let j = i + 1; j < list.length; j++) {
            const a = norm(list[i]);
            const b = norm(list[j]);
            if (lev(a, b) < 2) bad.push(`${list[i]}/${list[j]} (Abstand)`);
            else if (Math.min(a.length, b.length) >= 4 && a.slice(-3) === b.slice(-3)) bad.push(`${list[i]}/${list[j]} (Endung)`);
          }
        }
        expect(bad).toEqual([]);
      });
    });
  }

  it('wordsFor wählt die Liste je Sprache', () => {
    expect(wordsFor('de')).toBe(WORDS_DE);
    expect(wordsFor('it')).toBe(WORDS_IT);
  });
});

describe('wortliste: Stufe und Wertung', () => {
  it('Stufe = Wortzahl 5 … 12 (ganzzahlig abgerundet)', () => {
    expect(wordCountFor(1)).toBe(MIN_WORDS);
    expect(wordCountFor(5)).toBe(5);
    expect(wordCountFor(7.9)).toBe(7);
    expect(wordCountFor(99)).toBe(MAX_WORDS);
    expect(MIN_WORDS).toBe(5);
    expect(MAX_WORDS).toBe(12);
  });

  it('Anzahl neuer Wörter wächst höchstens bis 8', () => {
    expect(distractorCountFor(5)).toBe(5);
    expect(distractorCountFor(8)).toBe(8);
    expect(distractorCountFor(12)).toBe(8);
  });

  it('scoreTrial zählt Treffer, Auslassungen und falsche Alarme', () => {
    const s = scoreTrial(['a', 'b', 'c', 'd'], ['a', 'b', 'x', 'y']);
    expect(s).toEqual({ hits: 2, misses: 2, falseAlarms: 2 });
    expect(scoreTrial(['a', 'b'], ['b', 'a'])).toEqual({ hits: 2, misses: 0, falseAlarms: 0 });
    expect(scoreTrial(['a', 'b'], [])).toEqual({ hits: 0, misses: 2, falseAlarms: 0 });
    // doppelt gewählt zählt nur einmal
    expect(scoreTrial(['a'], ['a', 'a']).hits).toBe(1);
  });

  it('gelungen = nichts Falsches, nichts vergessen (ab 9 Wörtern eine Abweichung erlaubt)', () => {
    expect(toleranceFor(5)).toBe(0);
    expect(toleranceFor(8)).toBe(0);
    expect(toleranceFor(9)).toBe(1);
    expect(isMastered(6, { hits: 6, misses: 0, falseAlarms: 0 })).toBe(true);
    expect(isMastered(6, { hits: 5, misses: 1, falseAlarms: 0 })).toBe(false);
    expect(isMastered(6, { hits: 6, misses: 0, falseAlarms: 1 })).toBe(false);
    expect(isMastered(10, { hits: 9, misses: 1, falseAlarms: 0 })).toBe(true);
    expect(isMastered(10, { hits: 9, misses: 1, falseAlarms: 1 })).toBe(false);
  });
});

describe('wortliste: Darbietung', () => {
  it('ca. 2 s je Wort; im Film kürzer, im Schnelltest sehr kurz', () => {
    expect(showMsFor({ demo: false, quick: false })).toBe(2000);
    expect(showMsFor({ demo: true, quick: false })).toBeLessThan(2000);
    expect(showMsFor({ demo: false, quick: true })).toBeLessThan(1000);
  });

  it('Ein-/Ausblendung weich (≥ 100 ms), außen 0, Mitte 1, stetig', () => {
    for (const ms of [500, 1100, 2000]) {
      expect(fadeMsFor(ms)).toBeGreaterThanOrEqual(100);
      expect(wordAlpha(0, ms)).toBe(0);
      expect(wordAlpha(ms, ms)).toBe(0);
      expect(wordAlpha(ms / 2, ms)).toBeCloseTo(1, 6);
      let prev = 0;
      let maxStep = 0;
      for (let tau = 0; tau <= ms; tau += 10) {
        const a = wordAlpha(tau, ms);
        expect(a).toBeGreaterThanOrEqual(0);
        expect(a).toBeLessThanOrEqual(1);
        maxStep = Math.max(maxStep, Math.abs(a - prev));
        prev = a;
      }
      // in 10 ms höchstens ≈ 10 % Helligkeitsänderung – kein harter Sprung
      expect(maxStep).toBeLessThan(0.17);
    }
    expect(wordAlpha(150, 2000)).toBeGreaterThan(wordAlpha(50, 2000));
  });
});

describe('wortliste: Durchgänge', () => {
  it('Ziele und Auswahl: keine Doppelten, Auswahl = Ziele + neue Wörter, gemischt', () => {
    for (const lang of ['de', 'it'] as const) {
      const rng = createRng(11);
      const bag = new WordBag(wordsFor(lang), rng);
      for (let n = MIN_WORDS; n <= MAX_WORDS; n++) {
        const tr = buildTrial(rng, bag, n);
        expect(tr.targets.length).toBe(n);
        expect(new Set(tr.targets).size).toBe(n);
        expect(tr.choices.length).toBe(n + distractorCountFor(n));
        expect(new Set(tr.choices).size).toBe(tr.choices.length);
        for (const w of tr.targets) expect(tr.choices).toContain(w);
        for (const w of tr.choices) expect(wordsFor(lang)).toContain(w);
      }
    }
  });

  it('neue Wörter haben ähnliche Länge wie gezeigte (höchstens ±2)', () => {
    const rng = createRng(5);
    const bag = new WordBag(WORDS_DE, rng);
    for (let k = 0; k < 6; k++) {
      const tr = buildTrial(rng, bag, 7);
      const lens = tr.targets.map((w) => w.length);
      for (const w of tr.choices.filter((c) => !tr.targets.includes(c))) {
        expect(lens.some((l) => Math.abs(l - w.length) <= 2)).toBe(true);
      }
    }
  });

  it('ein Wort kommt möglichst nur einmal vor, bis der Vorrat aufgebraucht ist', () => {
    const rng = createRng(3);
    const bag = new WordBag(WORDS_IT, rng);
    const seen = new Set<string>();
    let total = 0;
    // 4 Durchgänge à 6 Ziele + 6 neue = 48 Wörter < 120: nichts darf doppelt vorkommen
    for (let k = 0; k < 4; k++) {
      const tr = buildTrial(rng, bag, 6);
      for (const w of tr.choices) {
        expect(seen.has(w)).toBe(false);
        seen.add(w);
        total++;
      }
    }
    expect(total).toBe(48);
  });

  it('auch wenn der Vorrat nicht reicht, bleibt jeder Durchgang in sich eindeutig', () => {
    const rng = createRng(9);
    const bag = new WordBag(WORDS_DE, rng);
    for (let k = 0; k < 14; k++) {
      const tr = buildTrial(rng, bag, 12);
      expect(new Set(tr.choices).size).toBe(tr.choices.length);
    }
  });

  it('gleicher Startwert → gleiche Durchgänge (ctx.rng)', () => {
    const a = buildTrial(createRng(77), new WordBag(WORDS_DE, createRng(77)), 6);
    const b = buildTrial(createRng(77), new WordBag(WORDS_DE, createRng(77)), 6);
    expect(a).toEqual(b);
  });
});

describe('wortliste: Raster', () => {
  it('nimmt zwei Spalten, wenn die Buttons dann ≥ 56 px hoch bleiben', () => {
    const g = gridFor(10, 600, 600, 10);
    expect(g.cols).toBe(2);
    expect(g.rows).toBe(5);
    expect(g.btnH).toBeGreaterThanOrEqual(MIN_BUTTON_H);
  });

  it('wechselt zu mehr Spalten, wenn 2 Spalten zu hoch würden (z. B. 20 Felder im Querformat)', () => {
    const g = gridFor(20, 900, 420, 10);
    expect(g.cols).toBeGreaterThan(2);
    expect(g.btnH).toBeGreaterThanOrEqual(MIN_BUTTON_H);
    expect(g.rows * g.cols).toBeGreaterThanOrEqual(20);
  });

  it('das Raster passt in den Bereich', () => {
    for (const count of [10, 12, 14, 16, 18, 20]) {
      for (const [w, h] of [
        [900, 420],
        [600, 560],
        [340, 380],
      ]) {
        const g = gridFor(count, w, h, 8);
        expect(g.cols * g.btnW + (g.cols - 1) * g.gap).toBeLessThanOrEqual(w + 1e-6);
        if (g.btnH >= MIN_BUTTON_H) expect(g.rows * g.btnH + (g.rows - 1) * g.gap).toBeLessThanOrEqual(h + 1e-6);
      }
    }
  });
});

describe('wortliste: Durchlauf ohne Browser (Film und Autoplay)', () => {
  it('Intro-Film: 8–14 s, ruft finish, Geister-Hand tippt Wörter und „Fertig“', () => {
    for (const [w, h] of [
      [1024, 704],
      [360, 640],
    ]) {
      const r = simulate({ def: wortliste, mode: 'demo', w, h, renderEvery: 3 });
      expect(r.result).not.toBeNull();
      expect(r.seconds).toBeGreaterThan(7);
      expect(r.seconds).toBeLessThan(15);
      expect(r.taps.length).toBeGreaterThanOrEqual(4);
      expect(r.captions.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('Autoplay im Spielmodus (DE und IT): Sitzung endet mit gültigem Ergebnis', () => {
    for (const lang of ['de', 'it'] as const) {
      const r = simulate({ def: wortliste, lang, quick: true, renderEvery: 5 });
      expect(r.result).not.toBeNull();
      const res = r.result!;
      expect(res.primary.key).toBe('level');
      expect(res.primary.unit).toBe('level');
      expect(Number.isInteger(res.primary.value)).toBe(true);
      expect(res.primary.value === 0 || (res.primary.value >= MIN_WORDS && res.primary.value <= MAX_WORDS)).toBe(true);
      expect(res.secondary.length).toBeGreaterThanOrEqual(2);
      expect(res.secondary.length).toBeLessThanOrEqual(4);
      expect(res.level).toBeGreaterThanOrEqual(MIN_WORDS);
      expect(res.level).toBeLessThanOrEqual(MAX_WORDS);
      for (const m of res.secondary) expect(ctxMetric(m.key, lang)).toBeTruthy();
      expect(ctxMetric(res.primary.key, lang)).toBeTruthy();
      if (res.tip) expect(wortliste.texts[lang].tips[res.tip]).toBeTruthy();
    }
  });

  it('Autoplay über mehrere Sitzungen (verschiedene Startwerte, Hochformat, Bewegung reduziert) bleibt fehlerfrei', () => {
    for (let seed = 1; seed <= 6; seed++) {
      const r = simulate({ def: wortliste, seed, quick: true, w: seed % 2 ? 360 : 1024, h: seed % 2 ? 640 : 768, startLevel: 5 + (seed % 7), reducedMotion: seed % 3 === 0, renderEvery: 4 });
      expect(r.result).not.toBeNull();
    }
  });

  it('volle Sitzung (8 Durchgänge) endet von selbst', () => {
    const r = simulate({ def: wortliste, seed: 4, renderEvery: 0 });
    expect(r.result).not.toBeNull();
    expect(r.labels.length).toBeGreaterThanOrEqual(8);
  });
});

function ctxMetric(key: string, lang: 'de' | 'it'): string | undefined {
  return wortliste.texts[lang].metrics[key];
}
