import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import { demoPuzzles, GENERATORS, itemKey, makePuzzle, MAX_LEVEL, SHAPES, type Item, type Puzzle } from '../../src/exercises/reihen-raetsel/puzzles';
import { de, it as itTexts } from '../../src/exercises/reihen-raetsel/texts';

function validItem(x: Item): boolean {
  switch (x.t) {
    case 'n':
      return Number.isInteger(x.v) && Math.abs(x.v) < 10000;
    case 'l':
      return Number.isInteger(x.v) && x.v >= 0 && x.v < 26;
    case 's':
      return SHAPES.includes(x.s) && Number.isInteger(x.n) && x.n >= 1 && x.n <= 9;
    default:
      return Number.isInteger(x.r) && x.r >= 0 && x.r < 8;
  }
}

function check(p: Puzzle) {
  expect(p.options.length).toBe(4);
  const keys = p.options.map(itemKey);
  expect(new Set(keys).size).toBe(4);
  expect(keys.filter((k) => k === itemKey(p.answer)).length).toBe(1);
  for (const x of [...p.seq, p.answer, ...p.options]) expect(validItem(x), JSON.stringify(x)).toBe(true);
  // Alle Antworten haben dieselbe Art wie die Reihe (keine Zahl zwischen Formen)
  for (const o of p.options) expect(o.t).toBe(p.answer.t);
  // Erklärung vorhanden, in beiden Sprachen, alle Platzhalter befüllt
  for (const t of [de, itTexts]) {
    const text = t.feedback[p.why.key];
    expect(text, p.why.key).toBeTruthy();
    for (const v of Object.values(p.why.vars ?? {})) {
      if (typeof v === 'string' && v.startsWith('@')) expect(t.feedback[v.slice(1)], v).toBeTruthy();
    }
    const placeholders = text.match(/\{(\w+)\}/g) ?? [];
    for (const ph of placeholders) expect(p.why.vars ?? {}, `${p.id} ${ph}`).toHaveProperty(ph.slice(1, -1));
  }
}

describe('Reihen-Rätsel – Aufgabengenerator', () => {
  it('jede Stufe hat mindestens zwei Regeln', () => {
    for (let lv = 1; lv <= MAX_LEVEL; lv++) {
      expect(GENERATORS.filter((g) => g.level === lv).length).toBeGreaterThanOrEqual(2);
    }
  });

  it('liefert gültige Aufgaben mit 4 verschiedenen Antworten und genau einer richtigen', () => {
    const r = createRng(12345);
    const seen = new Set<string>();
    for (let lv = 1; lv <= MAX_LEVEL; lv++) {
      for (let i = 0; i < 400; i++) {
        const p = makePuzzle(lv, r);
        expect(p.level).toBe(lv);
        seen.add(p.id);
        check(p);
      }
    }
    // Jede Regel kommt vor
    for (const g of GENERATORS) expect(seen.has(g.id), g.id).toBe(true);
  });

  it('wiederholt die zuletzt gestellte Regel nicht', () => {
    const r = createRng(7);
    for (let lv = 1; lv <= MAX_LEVEL; lv++) {
      for (let i = 0; i < 50; i++) {
        const a = makePuzzle(lv, r);
        const b = makePuzzle(lv, r, [a.id], [a.family]);
        expect(b.id).not.toBe(a.id);
      }
    }
  });

  it('begrenzt die Stufe auf 1 … MAX_LEVEL', () => {
    const r = createRng(1);
    expect(makePuzzle(0, r).level).toBe(1);
    expect(makePuzzle(99, r).level).toBe(MAX_LEVEL);
  });

  it('Intro-Aufgaben sind gültig', () => {
    for (const p of demoPuzzles()) check(p);
  });
});
