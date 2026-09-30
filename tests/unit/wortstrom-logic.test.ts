import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  buildTrial,
  computeStats,
  fadeMsFor,
  GAP_MS,
  isHit,
  levelOf,
  MAX_LEVEL,
  MAX_WORDS_PER_S,
  MIN_HIT_RT_MS,
  MIN_LEVEL,
  MIN_SOA_MS,
  MIN_WINDOW_MS,
  pointsFor,
  showMsFor,
  SHOW_MIN_MS,
  SHOW_START_MS,
  slotAt,
  soaMs,
  streamLengthFor,
  streamWords,
  tipFor,
  windowMs,
  wordAlpha,
  wordsPerSecond,
} from '../../src/exercises/wortstrom/logic';

describe('wortstrom: Tempo hart begrenzt', () => {
  it('nie mehr als 2,5 Wörter pro Sekunde – für jede Stufe und auch für wilde Eingaben', () => {
    for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) {
      expect(wordsPerSecond(l)).toBeLessThanOrEqual(MAX_WORDS_PER_S + 1e-9);
      expect(soaMs(l)).toBeGreaterThanOrEqual(MIN_SOA_MS);
    }
    for (const l of [-100, -1, 0, 0.5, 6.5, 12.9, 13, 99, 1e9, NaN as unknown as number]) {
      const v = Number.isNaN(l) ? MAX_LEVEL : l;
      expect(wordsPerSecond(v)).toBeLessThanOrEqual(MAX_WORDS_PER_S + 1e-9);
    }
    expect(MIN_SOA_MS).toBe(400);
  });

  it('Anzeigedauer 700 → 350 ms, nie darunter, Abstand = Anzeige + Pause', () => {
    expect(showMsFor(MIN_LEVEL)).toBe(SHOW_START_MS);
    expect(showMsFor(MAX_LEVEL)).toBe(SHOW_MIN_MS);
    expect(SHOW_START_MS).toBe(700);
    expect(SHOW_MIN_MS).toBe(350);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(showMsFor(l)).toBeLessThan(showMsFor(l - 1));
    for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) {
      expect(showMsFor(l)).toBeGreaterThanOrEqual(350);
      expect(soaMs(l)).toBeGreaterThanOrEqual(showMsFor(l) + GAP_MS);
    }
    expect(levelOf(3.9)).toBe(3);
  });

  it('Antwortfenster nie unter 600 ms und länger als jede Reaktionszeit, sinkt mit der Stufe', () => {
    for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) expect(windowMs(l)).toBeGreaterThanOrEqual(MIN_WINDOW_MS);
    expect(MIN_WINDOW_MS).toBeGreaterThanOrEqual(600);
    expect(windowMs(MIN_LEVEL)).toBe(1400);
    expect(windowMs(MAX_LEVEL)).toBe(700);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(windowMs(l)).toBeLessThanOrEqual(windowMs(l - 1));
  });

  it('Stromlänge 8 → 10', () => {
    expect(streamLengthFor(1)).toBe(8);
    expect(streamLengthFor(MAX_LEVEL)).toBe(10);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(streamLengthFor(l)).toBeGreaterThanOrEqual(streamLengthFor(l - 1));
  });
});

describe('wortstrom: weiches Ein- und Ausblenden', () => {
  it('Deckkraft steigt und fällt sinusförmig, ist außerhalb 0 und springt nie um mehr als 0,25 je 5-ms-Schritt', () => {
    for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) {
      const show = showMsFor(l);
      expect(fadeMsFor(show)).toBeGreaterThanOrEqual(100);
      // Plateau bleibt bestehen
      expect(show - 2 * fadeMsFor(show)).toBeGreaterThanOrEqual(100);
      expect(wordAlpha(0, show)).toBe(0);
      expect(wordAlpha(show, show)).toBe(0);
      expect(wordAlpha(-10, show)).toBe(0);
      expect(wordAlpha(show + 10, show)).toBe(0);
      expect(wordAlpha(show / 2, show)).toBe(1);
      let prev = 0;
      let maxJump = 0;
      let peak = 0;
      for (let tau = 0; tau <= show; tau += 5) {
        const a = wordAlpha(tau, show);
        expect(a).toBeGreaterThanOrEqual(0);
        expect(a).toBeLessThanOrEqual(1);
        maxJump = Math.max(maxJump, Math.abs(a - prev));
        prev = a;
        peak = Math.max(peak, a);
      }
      expect(peak).toBe(1);
      expect(maxJump).toBeLessThan(0.25);
    }
  });

  it('Zeitfenster: genau ein Wort zur Zeit, und zwischen zwei Wörtern ist es leer', () => {
    const l = MAX_LEVEL;
    const soa = soaMs(l);
    const show = showMsFor(l);
    const n = 10;
    let visibleAtOnce = 0;
    for (let el = 0; el < n * soa; el += 2) {
      const s = slotAt(el, soa, n);
      expect(s.index).toBeGreaterThanOrEqual(0);
      const a = wordAlpha(s.tau, show);
      if (a > 0) visibleAtOnce++;
      // zwischen Anzeige-Ende und nächstem Wortanfang: nichts zu sehen
      if (s.tau >= show) expect(a).toBe(0);
    }
    expect(visibleAtOnce).toBeGreaterThan(0);
    expect(slotAt(-1, soa, n).index).toBe(-1);
    expect(slotAt(n * soa, soa, n).index).toBe(-1);
    expect(slotAt(0, soa, n).index).toBe(0);
    expect(slotAt(soa * 3 + 10, soa, n)).toEqual({ index: 3, tau: 10 });
  });
});

describe('wortstrom: Wortlisten', () => {
  it('je Sprache mindestens 120 kurze Wörter ohne Dopplungen', () => {
    for (const lang of ['de', 'it'] as const) {
      const w = streamWords(lang);
      expect(w.length).toBeGreaterThanOrEqual(120);
      expect(new Set(w).size).toBe(w.length);
      for (const x of w) {
        expect(x.length).toBeGreaterThanOrEqual(2);
        expect(x.length).toBeLessThanOrEqual(9);
      }
    }
    expect(streamWords('de')).not.toEqual(streamWords('it'));
  });

  it('Durchgang: Zielwort genau einmal, Platz mit Abstand zu Anfang und Ende, sonst verschiedene andere Wörter', () => {
    const rng = createRng(21);
    for (const lang of ['de', 'it'] as const) {
      const words = streamWords(lang);
      for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) {
        for (let k = 0; k < 40; k++) {
          const t = buildTrial(rng, words, l);
          expect(t.words).toHaveLength(streamLengthFor(l));
          expect(t.words.filter((w) => w === t.target)).toHaveLength(1);
          expect(t.words[t.targetIndex]).toBe(t.target);
          expect(t.targetIndex).toBeGreaterThanOrEqual(2);
          expect(t.targetIndex).toBeLessThanOrEqual(t.words.length - 3);
          expect(new Set(t.words).size).toBe(t.words.length);
          for (const w of t.words) expect(words).toContain(w);
        }
      }
    }
  });

  it('ab Stufe 7 sind viele Wörter gleich lang wie das Zielwort', () => {
    const rng = createRng(5);
    const words = streamWords('de');
    let ok = 0;
    const runs = 60;
    for (let k = 0; k < runs; k++) {
      const t = buildTrial(rng, words, 9);
      const same = t.words.filter((w) => w !== t.target && w.length === t.target.length).length;
      if (same >= Math.min(3, words.filter((w) => w.length === t.target.length).length - 1)) ok++;
    }
    expect(ok).toBeGreaterThan(runs * 0.9);
  });

  it('Zielwörter wiederholen sich nicht, solange frische Wörter da sind', () => {
    const rng = createRng(8);
    const words = streamWords('it');
    const used = new Set<string>();
    for (let k = 0; k < 30; k++) {
      const t = buildTrial(rng, words, 3, used);
      expect(used.has(t.target)).toBe(false);
      used.add(t.target);
    }
  });
});

describe('wortstrom: Wertung', () => {
  it('Tipp zählt als Treffer nur im Fenster und nach der Mindest-Reaktionszeit', () => {
    expect(isHit(1000 + MIN_HIT_RT_MS - 1, 1000, 1400)).toBe(false);
    expect(isHit(1000 + MIN_HIT_RT_MS, 1000, 1400)).toBe(true);
    expect(isHit(1000 + 1400, 1000, 1400)).toBe(true);
    expect(isHit(1000 + 1401, 1000, 1400)).toBe(false);
    expect(isHit(900, 1000, 1400)).toBe(false);
  });

  it('Punkte steigen mit der Stufe und der Schnelligkeit', () => {
    expect(pointsFor(6, 400, 1000)).toBeGreaterThan(pointsFor(6, 900, 1000));
    expect(pointsFor(10, 500, 1000)).toBeGreaterThan(pointsFor(1, 500, 1000));
  });

  it('Statistik und Tipp-Schlüssel', () => {
    const s = computeStats(8, 6, 2, [400, 500, 600]);
    expect(s.medianMs).toBe(500);
    expect(Number.isNaN(computeStats(8, 0, 0, []).medianMs)).toBe(true);
    expect(tipFor(computeStats(8, 4, 4, []))).toBe('alarm');
    expect(tipFor(computeStats(8, 4, 1, []))).toBe('missed');
    expect(tipFor(computeStats(8, 8, 0, []))).toBe('great');
  });
});
