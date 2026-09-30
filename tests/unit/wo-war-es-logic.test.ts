import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import { Staircase } from '../../src/core/staircase';
import { FORM_COUNT } from '../../src/exercises/_formen';
import {
  cellDistance,
  classify,
  errorPct,
  gridFor,
  isSwap,
  masteredLevel,
  MAX_OBJECTS,
  pickAsked,
  placeObjects,
  showMs,
  summarize,
  type RoundRecord,
} from '../../src/exercises/wo-war-es/logic';

describe('Wo war es?: Anordnungen', () => {
  it('Raster wächst mit der Symbolzahl', () => {
    expect(gridFor(1)).toBe(3);
    expect(gridFor(3)).toBe(3);
    expect(gridFor(4)).toBe(4);
    expect(gridFor(6)).toBe(4);
    expect(gridFor(7)).toBe(5);
    expect(gridFor(MAX_OBJECTS)).toBe(5);
    expect(showMs(5)).toBeGreaterThan(showMs(2));
  });

  it('verteilt verschiedene Formen auf verschiedene Zellen', () => {
    for (let seed = 1; seed <= 40; seed++) {
      for (let k = 1; k <= MAX_OBJECTS; k++) {
        const G = gridFor(k);
        const objs = placeObjects(createRng(seed), k);
        expect(objs.length).toBe(k);
        expect(new Set(objs.map((o) => o.cell)).size).toBe(k);
        expect(new Set(objs.map((o) => o.form)).size).toBe(k);
        for (const o of objs) {
          expect(o.cell).toBeGreaterThanOrEqual(0);
          expect(o.cell).toBeLessThan(G * G);
          expect(o.form).toBeLessThan(FORM_COUNT);
        }
      }
    }
  });

  it('fragt bevorzugt nach einer anderen Form als zuletzt', () => {
    const rng = createRng(5);
    const objs = placeObjects(rng, 4);
    for (let i = 0; i < 30; i++) {
      const idx = pickAsked(rng, objs, objs[0].form);
      expect(objs[idx].form).not.toBe(objs[0].form);
    }
    const one = placeObjects(rng, 1);
    expect(pickAsked(rng, one, one[0].form)).toBe(0);
  });
});

describe('Wo war es?: Ortsfehler', () => {
  it('misst Abstände in Zellen und % der Kantenlänge', () => {
    expect(cellDistance(0, 0, 4)).toBe(0);
    expect(cellDistance(0, 1, 4)).toBe(1);
    expect(cellDistance(0, 5, 4)).toBeCloseTo(Math.SQRT2, 10);
    expect(errorPct(0, 0, 4)).toBe(0);
    expect(errorPct(0, 1, 4)).toBeCloseTo(25, 10);
    expect(errorPct(0, 3, 4)).toBeCloseTo(75, 10);
    expect(errorPct(0, 8, 3)).toBeCloseTo((Math.hypot(2, 2) / 3) * 100, 10);
  });

  it('unterscheidet genau, knapp und weit daneben', () => {
    expect(classify(4, 4, 3)).toBe('exact');
    expect(classify(5, 4, 3)).toBe('near');
    expect(classify(0, 4, 3)).toBe('near'); // diagonal
    expect(classify(2, 4, 3)).toBe('near');
    expect(classify(0, 8, 3)).toBe('far');
    expect(classify(0, 2, 4)).toBe('far');
  });

  it('erkennt Verwechslungen mit anderen Symbolen', () => {
    const objs = [
      { cell: 1, form: 0 },
      { cell: 5, form: 3 },
    ];
    expect(isSwap(5, objs, 0)).toBe(true);
    expect(isSwap(1, objs, 0)).toBe(false);
    expect(isSwap(7, objs, 0)).toBe(false);
  });
});

describe('Wo war es?: Wertung und Stufen', () => {
  const rec = (k: number, ok: boolean, swap = false): RoundRecord => ({ k, outcome: ok ? 'exact' : 'far', errPct: ok ? 0 : 50, swap });

  it('größte sicher gemeisterte Symbolzahl braucht mindestens 2 Treffer', () => {
    expect(masteredLevel([])).toBe(1);
    expect(masteredLevel([rec(2, true), rec(2, true), rec(4, true)])).toBe(2);
    expect(masteredLevel([rec(2, true), rec(2, true), rec(4, true), rec(4, true)])).toBe(4);
    expect(masteredLevel([rec(3, true), rec(3, true), rec(3, false), rec(3, false), rec(3, false)])).toBe(1);
  });

  it('fasst Runden zusammen', () => {
    const s = summarize([rec(2, true), rec(3, false, true), { k: 3, outcome: 'near', errPct: 25, swap: false }]);
    expect(s.rounds).toBe(3);
    expect(s.exact).toBe(1);
    expect(s.near).toBe(1);
    expect(s.swaps).toBe(1);
    expect(s.meanErrPct).toBeCloseTo((0 + 50 + 25) / 3, 10);
  });

  it('Treppe 2-down/1-up: sichere Spielerin steigt, unsichere bleibt niedrig', () => {
    const sim = (p: (k: number) => number, seed: number) => {
      const rng = createRng(seed);
      const st = new Staircase({ start: 2, min: 1, max: MAX_OBJECTS, down: 2, up: 1 });
      let top = 0;
      for (let i = 0; i < 40; i++) {
        top = Math.max(top, st.level);
        st.update(rng.chance(p(st.level)));
      }
      return { top, level: st.level };
    };
    const strong = sim(() => 0.98, 1);
    expect(strong.top).toBe(MAX_OBJECTS);
    const weak = sim((k) => (k <= 2 ? 0.8 : 0.1), 2);
    expect(weak.top).toBeLessThanOrEqual(4);
    expect(weak.level).toBeLessThanOrEqual(3);
  });
});
