import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  cellLight,
  createStaircase,
  effectiveSpec,
  isMastered,
  LEVELS,
  levelSpec,
  makePattern,
  MAX_LEVEL,
  MAX_WRONG,
  maxPerLine,
  showMs,
} from '../../src/exercises/rastermuster/logic';
import { de, it as itTexts } from '../../src/exercises/rastermuster/texts';
import { science } from '../../src/exercises/rastermuster/science';

describe('Rastermuster – Stufen', () => {
  it('3×3 bis 6×6, Felderzahl steigt nie ab, Dichte unter 45 %', () => {
    expect(LEVELS[0].n).toBe(3);
    expect(LEVELS[LEVELS.length - 1].n).toBe(6);
    let prevK = 0;
    let prevN = 0;
    for (const l of LEVELS) {
      expect(l.k).toBeGreaterThanOrEqual(prevK);
      expect(l.n).toBeGreaterThanOrEqual(prevN);
      expect(l.k / (l.n * l.n)).toBeLessThan(0.45);
      prevK = l.k;
      prevN = l.n;
    }
    expect(levelSpec(0)).toEqual(LEVELS[0]);
    expect(levelSpec(99)).toEqual(LEVELS[MAX_LEVEL - 1]);
  });

  it('kleine Bühne: Raster kleiner, Dichte bleibt unter 45 %', () => {
    for (let lv = 1; lv <= MAX_LEVEL; lv++) {
      for (const maxN of [3, 4, 5, 6, 9]) {
        const s = effectiveSpec(lv, maxN);
        expect(s.n).toBeLessThanOrEqual(Math.max(3, maxN));
        expect(s.n).toBeGreaterThanOrEqual(3);
        expect(s.k / (s.n * s.n)).toBeLessThanOrEqual(0.45);
        expect(s.k).toBeGreaterThanOrEqual(2);
      }
    }
    expect(effectiveSpec(12, 9)).toEqual(LEVELS[11]);
  });

  it('Anzeigedauer wächst mit der Felderzahl', () => {
    expect(showMs(3)).toBe(1900);
    expect(showMs(10)).toBeGreaterThan(showMs(5));
    expect(showMs(3)).toBeGreaterThanOrEqual(1500);
  });
});

describe('Rastermuster – Muster', () => {
  it('k verschiedene Felder im Raster, höchstens maxPerLine je Zeile/Spalte', () => {
    for (let seed = 1; seed <= 100; seed++) {
      const rng = createRng(seed);
      for (const { n, k } of LEVELS) {
        const p = makePattern(rng, n, k);
        expect(p.length).toBe(k);
        expect(new Set(p).size).toBe(k);
        for (const c of p) expect(Number.isInteger(c) && c >= 0 && c < n * n).toBe(true);
        const rows = new Array(n).fill(0);
        const cols = new Array(n).fill(0);
        for (const c of p) {
          rows[Math.floor(c / n)]++;
          cols[c % n]++;
        }
        const m = maxPerLine(n, k);
        expect(Math.max(...rows)).toBeLessThanOrEqual(m);
        expect(Math.max(...cols)).toBeLessThanOrEqual(m);
      }
    }
  });

  it('nie dasselbe Muster zweimal hintereinander', () => {
    const rng = createRng(4);
    let prev = makePattern(rng, 3, 3);
    for (let i = 0; i < 200; i++) {
      const p = makePattern(rng, 3, 3, prev);
      expect(p).not.toEqual(prev);
      prev = p;
    }
  });

  it('ist reproduzierbar und streut über das ganze Raster', () => {
    expect(makePattern(createRng(9), 5, 7)).toEqual(makePattern(createRng(9), 5, 7));
    const used = new Set<number>();
    const rng = createRng(6);
    for (let i = 0; i < 60; i++) makePattern(rng, 4, 5).forEach((c) => used.add(c));
    expect(used.size).toBe(16);
  });
});

describe('Rastermuster – Wertung und Treppe', () => {
  it('gemeistert = alle gefunden und weniger als zwei Fehltipps', () => {
    expect(MAX_WRONG).toBe(2);
    expect(isMastered(4, 4, 0)).toBe(true);
    expect(isMastered(4, 4, 1)).toBe(true);
    expect(isMastered(4, 4, 2)).toBe(false);
    expect(isMastered(3, 4, 0)).toBe(false);
  });

  it('Treppe: zwei gemeisterte in Folge → höher, ein Fehler → tiefer, in den Grenzen', () => {
    const s = createStaircase(null);
    expect(s.level).toBe(2);
    s.update(true);
    expect(s.level).toBe(2);
    s.update(true);
    expect(s.level).toBe(3);
    s.update(false);
    expect(s.level).toBe(2);
    const lo = createStaircase(1);
    lo.update(false);
    expect(lo.level).toBe(1);
    const hi = createStaircase(MAX_LEVEL);
    hi.update(true);
    hi.update(true);
    expect(hi.level).toBe(MAX_LEVEL);
    expect(createStaircase(99).level).toBe(MAX_LEVEL);
  });

  it('konvergiert bei zufälligen Antworten nicht gegen die Grenzen (71-%-Regel)', () => {
    const rng = createRng(21);
    const s = createStaircase(2);
    for (let i = 0; i < 400; i++) s.update(rng.chance(0.75));
    expect(s.threshold()).toBeGreaterThan(3);
    expect(s.threshold()).toBeLessThan(MAX_LEVEL);
  });
});

describe('Rastermuster – Leuchten', () => {
  it('weich ein- und ausgeblendet, nur während der Anzeige', () => {
    const dur = showMs(5);
    expect(cellLight(-5, dur)).toBe(0);
    expect(cellLight(0, dur)).toBe(0);
    expect(cellLight(dur / 2, dur)).toBe(1);
    expect(cellLight(dur, dur)).toBe(0);
    expect(cellLight(dur + 100, dur)).toBe(0);
    let prev = 0;
    for (let t = 0; t <= dur; t += 4) {
      const b = cellLight(t, dur);
      expect(Math.abs(b - prev)).toBeLessThan(0.1);
      prev = b;
    }
  });
});

describe('Rastermuster – Texte', () => {
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
    expect(science.id).toBe('rastermuster');
    expect(science.sources.length).toBeGreaterThanOrEqual(3);
    for (const s of science.sources) expect(s.url).toMatch(/^https:\/\//);
    for (const lang of ['de', 'it'] as const) for (const k of ['trains', 'daily', 'research', 'improved'] as const) expect(science.texts[lang][k].length).toBeGreaterThan(20);
  });
});
