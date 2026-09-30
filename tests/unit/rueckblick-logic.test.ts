import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import { Staircase } from '../../src/core/staircase';
import {
  applyVerdict,
  bestPassedN,
  blockPassed,
  blockVerdict,
  expectedAnswer,
  isLure,
  makeBlock,
  maxRun,
  MAX_PLAIN_RUN,
  MAX_TARGET_RUN,
  scoreBlock,
  SYMBOLS,
  targetCount,
  type Answer,
  type Block,
} from '../../src/exercises/rueckblick/logic';

function perfect(b: Block): Answer[] {
  return b.stimuli.map((_, i) => expectedAnswer(b, i));
}

describe('Rückblick: Reizfolgen', () => {
  it('erzeugt gültige Folgen für jede Stufe', () => {
    for (let seed = 1; seed <= 40; seed++) {
      for (const n of [1, 2, 3, 4]) {
        const b = makeBlock(createRng(seed), n, 20);
        expect(b.stimuli.length).toBe(n + 20);
        expect(b.target.length).toBe(n + 20);
        for (const s of b.stimuli) {
          expect(s).toBeGreaterThanOrEqual(0);
          expect(s).toBeLessThan(SYMBOLS);
        }
        for (let i = 0; i < n; i++) expect(b.target[i]).toBe(false);
        for (let i = n; i < b.stimuli.length; i++) {
          const same = b.stimuli[i] === b.stimuli[i - n];
          expect(same).toBe(b.target[i]); // Treffer genau dann, wenn gleich wie vor n Schritten
        }
      }
    }
  });

  it('hat den vorgesehenen Treffer-Anteil und keine langen Serien', () => {
    expect(targetCount(20)).toBe(6);
    for (let seed = 1; seed <= 40; seed++) {
      const b = makeBlock(createRng(seed), 2, 20);
      const flags = b.target.slice(2);
      expect(flags.filter(Boolean).length).toBe(6);
      expect(maxRun(flags, true)).toBeLessThanOrEqual(MAX_TARGET_RUN);
      expect(maxRun(flags, false)).toBeLessThanOrEqual(MAX_PLAIN_RUN);
    }
  });

  it('baut ab 2-Back Köder ein, bei 1-Back nicht', () => {
    let lures2 = 0;
    let lures1 = 0;
    for (let seed = 1; seed <= 40; seed++) {
      const b2 = makeBlock(createRng(seed), 2, 20);
      const b1 = makeBlock(createRng(seed), 1, 20);
      for (let i = 0; i < b2.stimuli.length; i++) if (isLure(b2, i)) lures2++;
      for (let i = 0; i < b1.stimuli.length; i++) if (isLure(b1, i)) lures1++;
    }
    expect(lures2).toBeGreaterThan(40);
    expect(lures1).toBe(0);
  });

  it('ist mit gleichem Startwert reproduzierbar', () => {
    expect(makeBlock(createRng(7), 3, 20)).toEqual(makeBlock(createRng(7), 3, 20));
  });
});

describe('Rückblick: Wertung', () => {
  it('zählt Treffer, Fehlalarme und Auslassungen', () => {
    const b = makeBlock(createRng(3), 2, 20);
    const s = scoreBlock(b, perfect(b));
    expect(s.hits).toBe(6);
    expect(s.correctRejections).toBe(14);
    expect(s.falseAlarms).toBe(0);
    expect(s.accuracy).toBe(1);
    expect(s.hitRate).toBe(1);
    expect(s.dPrime).toBeGreaterThan(2);
    expect(blockPassed(s)).toBe(true);
    expect(blockVerdict(s)).toBe('up');

    const none = scoreBlock(b, b.stimuli.map(() => null));
    expect(none.omissions).toBe(20);
    expect(none.accuracy).toBe(0);
  });

  it('„immer Anders“ gilt nicht als geschafft', () => {
    const b = makeBlock(createRng(4), 2, 20);
    const s = scoreBlock(b, b.stimuli.map(() => 'diff' as const));
    expect(s.accuracy).toBeCloseTo(0.7, 5);
    expect(s.hitRate).toBe(0);
    expect(blockPassed(s)).toBe(false);
    expect(blockVerdict(s)).toBe('down');
  });

  it('„immer Gleich“ erzeugt Fehlalarme und wird nicht belohnt', () => {
    const b = makeBlock(createRng(5), 2, 20);
    const s = scoreBlock(b, b.stimuli.map(() => 'same' as const));
    expect(s.falseAlarms).toBe(14);
    expect(s.faRate).toBe(1);
    expect(blockPassed(s)).toBe(false);
    expect(blockVerdict(s)).toBe('down');
  });

  it('d′ ist bei Raten kleiner als bei sauberem Spielen', () => {
    const b = makeBlock(createRng(6), 2, 20);
    const good = scoreBlock(b, perfect(b));
    const rng = createRng(99);
    const guess = scoreBlock(b, b.stimuli.map(() => (rng.chance(0.5) ? 'same' : 'diff') as Answer));
    expect(good.dPrime).toBeGreaterThan(guess.dPrime);
  });

  it('Stufe folgt der Blockleistung, Hauptwert ist die höchste geschaffte Stufe', () => {
    const stair = new Staircase({ start: 1, min: 1, max: 4, down: 1, up: 1, initialBoost: 1 });
    const b1 = makeBlock(createRng(1), 1, 20);
    const s1 = scoreBlock(b1, perfect(b1));
    expect(applyVerdict(stair, blockVerdict(s1)).n).toBe(2);
    const b2 = makeBlock(createRng(2), 2, 20);
    const s2 = scoreBlock(b2, b2.stimuli.map(() => 'diff' as const));
    expect(applyVerdict(stair, blockVerdict(s2)).n).toBe(1);
    expect(bestPassedN([{ n: 1, score: s1 }, { n: 2, score: s2 }])).toBe(1);
    const b3 = makeBlock(createRng(3), 3, 20);
    expect(bestPassedN([{ n: 1, score: s1 }, { n: 3, score: scoreBlock(b3, perfect(b3)) }])).toBe(3);
    // „stay“ ändert nichts
    const st2 = new Staircase({ start: 2, min: 1, max: 4, down: 1, up: 1, initialBoost: 1 });
    expect(applyVerdict(st2, 'stay').n).toBe(2);
    // ohne geschafften Block: mindestens Stufe 1
    expect(bestPassedN([{ n: 2, score: s2 }])).toBe(1);
  });
});
