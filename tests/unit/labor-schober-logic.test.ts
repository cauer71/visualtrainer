/**
 * Schober-Kreuz im Ring (Labor): reine Logik – Einstellungen, Durchgangsplan (zwei Startseiten je Richtung), Schritte und Grenzen,
 * hergeleitete Vorzeichenregeln (nur hergeleitet, nicht gegen ein Messgerät geprüft), Auswertung.
 */
import { describe, expect, it } from 'vitest';
import { sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import { crossEyeOf, PARAMS, phoriaH, phoriaV, SchoberSession, schoberParams, tipFor } from '../../src/exercises/labor-schober/logic';

const P = (over: Record<string, unknown> = {}) => schoberParams(sanitizeParams(PARAMS, over));
const make = (over: Record<string, unknown> = {}, maxRuns?: number, seed = 5) => new SchoberSession(P(over), { rng: createRng(seed), maxRuns });

describe('Einstellungen', () => {
  it('Standardwerte und Grenzen', () => {
    expect(P()).toMatchObject({ axes: 'both', stepPd: 0.5, startPd: 6, crossColor: 'red', sizeCm: 5, leftLens: 'red' });
    expect(P({ stepPd: 9 }).stepPd).toBe(2);
    expect(P({ stepPd: 0.1 }).stepPd).toBe(0.25);
    expect(P({ startPd: 30 }).startPd).toBe(14);
    expect(P({ startPd: 0 }).startPd).toBe(2);
    expect(P({ sizeCm: 20 }).sizeCm).toBe(12);
    expect(P({ axes: 'vertical' }).axes).toBe('vertical');
    expect(P({ axes: 'quatsch' }).axes).toBe('both');
    expect(P({ crossColor: 'second' }).crossColor).toBe('second');
  });

  it('Auge, das das Kreuz sieht: Kreuz rot = Auge hinter dem roten Glas, sonst das andere', () => {
    expect(crossEyeOf({ leftLens: 'red', crossColor: 'red' })).toBe('left');
    expect(crossEyeOf({ leftLens: 'red', crossColor: 'second' })).toBe('right');
    expect(crossEyeOf({ leftLens: 'green', crossColor: 'red' })).toBe('right');
    expect(crossEyeOf({ leftLens: 'green', crossColor: 'second' })).toBe('left');
  });
});

describe('Vorzeichenregeln (nur hergeleitet, nicht gegen ein Messgerät geprüft)', () => {
  it('waagerecht: zur Nase hin geschoben = Eso-Richtung (+), zur Schläfe hin = Exo-Richtung (−), für beide Augen spiegelbildlich', () => {
    // rechtes Auge sieht das Kreuz: die Nase liegt links
    expect(phoriaH(-2, 'right')).toBe(2); // nach links = zur Nase = +
    expect(phoriaH(2, 'right')).toBe(-2); // nach rechts = zur Schläfe = −
    // linkes Auge: die Nase liegt rechts
    expect(phoriaH(2, 'left')).toBe(2);
    expect(phoriaH(-2, 'left')).toBe(-2);
    expect(phoriaH(0, 'left')).toBe(0);
    expect(Object.is(phoriaH(0, 'right'), -0)).toBe(false);
  });

  it('senkrecht: nach oben geschoben = das Auge, das das Kreuz sieht, steht höher (+ rechts höher, − links höher)', () => {
    expect(phoriaV(1.5, 'right')).toBe(1.5); // rechts höher
    expect(phoriaV(-1.5, 'right')).toBe(-1.5);
    expect(phoriaV(1.5, 'left')).toBe(-1.5); // links höher
    expect(phoriaV(-1.5, 'left')).toBe(1.5);
    expect(Object.is(phoriaV(0, 'left'), -0)).toBe(false);
  });

  it('die Regeln wirken in der Sitzung: gleicher Versatz, anderes Auge → anderes Vorzeichen', () => {
    const run = (leftLens: string, crossColor: string, shift: number): number => {
      const s = make({ leftLens, crossColor, axes: 'horizontal', stepPd: 1 }, 1);
      s.start(0);
      // den Versatz auf `shift` bringen
      s.step(shift - s.shift);
      expect(s.shift).toBe(shift);
      s.confirm(1000);
      return s.trials[0].phoriaPd;
    };
    expect(run('red', 'red', 2)).toBe(2); // linkes Auge sieht das Kreuz
    expect(run('red', 'second', 2)).toBe(-2); // rechtes Auge sieht das Kreuz
    expect(run('green', 'red', 2)).toBe(-2);
    expect(run('green', 'second', 2)).toBe(2);
  });
});

describe('Durchgänge und Schritte', () => {
  it('beide Richtungen: vier Durchgänge, je Richtung von beiden Startseiten (Vorzeichen entgegengesetzt, Betrag = Startversatz)', () => {
    for (let seed = 1; seed <= 8; seed++) {
      const s = make({}, undefined, seed);
      expect(s.plan).toHaveLength(4);
      expect(s.plan.map((r) => r.axis)).toEqual(['h', 'h', 'v', 'v']);
      for (const [a, b] of [
        [s.plan[0], s.plan[1]],
        [s.plan[2], s.plan[3]],
      ]) {
        expect(Math.abs(a.start)).toBe(6);
        expect(a.start).toBe(-b.start);
      }
    }
    expect(make({ axes: 'horizontal' }).plan.map((r) => r.axis)).toEqual(['h', 'h']);
    expect(make({ axes: 'vertical' }).plan.map((r) => r.axis)).toEqual(['v', 'v']);
  });

  it('die Startseite des ersten Durchgangs ist zufällig (beide Seiten kommen vor)', () => {
    const signs = new Set<number>();
    for (let seed = 1; seed <= 30; seed++) signs.add(Math.sign(make({}, undefined, seed).plan[0].start));
    expect(signs).toEqual(new Set([1, -1]));
  });

  it('Höchstzahl begrenzt die Durchgänge', () => {
    expect(make({}, 1).plan).toHaveLength(1);
    expect(make({}, 2).plan).toHaveLength(2);
    expect(make({}, 99).plan).toHaveLength(4);
  });

  it('Schritte: klein und groß (n Schritte), ohne Gleitkomma-Reste; bei Stillstand false', () => {
    const s = make({ stepPd: 0.25 }, 1);
    const start = s.shift;
    expect(s.step(1)).toBe(true);
    expect(s.shift).toBeCloseTo(start + 0.25, 10);
    expect(s.step(-4)).toBe(true);
    expect(s.shift).toBeCloseTo(start - 0.75, 10);
    expect(s.step(0)).toBe(false);
    s.step(3);
    expect(s.shift).toBeCloseTo(start, 10);
    const t = make({ stepPd: 0.25, startPd: 2 }, 1);
    for (let i = 0; i < 40; i++) t.step(-1);
    // keine Reste: ein Vielfaches von 0,25
    expect(Math.round(t.shift * 4) / 4).toBe(t.shift);
  });

  it('Obergrenze: der Versatz bleibt in ±Grenze, der Startversatz wird begrenzt und gemeldet', () => {
    const s = make({ startPd: 12, stepPd: 1 }, 2);
    s.setLimit(5);
    expect(Math.abs(s.shift)).toBe(5);
    s.step(100);
    expect(s.shift).toBe(5);
    expect(s.step(1)).toBe(false);
    s.step(-100);
    expect(s.shift).toBe(-5);
    s.confirm(1000);
    expect(s.trials[0].startPd).toBe(Math.sign(s.plan[0].start) * 5);
    expect(Math.abs(s.shift)).toBe(5); // zweiter Durchgang beginnt ebenfalls begrenzt
    s.confirm(2000);
    expect(s.summary().limitedTo).toBe(5);
    // ohne Begrenzung nichts gemeldet
    const free = make({ startPd: 4 }, 1);
    free.setLimit(50);
    expect(free.summary().limitedTo).toBeNull();
  });

  it('Mittig bestätigen: Durchgang wird gespeichert, der nächste beginnt am anderen Startversatz; nach dem letzten ist Schluss', () => {
    const s = make({ axes: 'horizontal' });
    s.start(0);
    const s0 = s.plan[0].start;
    expect(s.shift).toBe(s0);
    s.step(-2 * Math.sign(s0));
    expect(s.confirm(1500)).toBe(true);
    expect(s.idx).toBe(1);
    expect(s.shift).toBe(s.plan[1].start);
    expect(s.shift).toBe(-s0);
    expect(s.finished).toBe(false);
    expect(s.confirm(3000)).toBe(true);
    expect(s.finished).toBe(true);
    expect(s.trials.map((t) => t.ms)).toEqual([1500, 1500]);
    expect(s.confirm(4000)).toBe(false);
    expect(s.step(1)).toBe(false);
    expect(s.trials).toHaveLength(2);
  });
});

describe('Auswertung', () => {
  it('Mittel und Unterschied der beiden Durchgänge je Richtung in Δ', () => {
    // Auge links sieht das Kreuz → waagerecht phoria = shift, senkrecht phoria = −shift
    const s = make({ leftLens: 'red', crossColor: 'red', stepPd: 1 });
    s.start(0);
    const setShift = (v: number) => s.step(v - s.shift);
    setShift(2);
    s.confirm(100); // h: +2
    setShift(1);
    s.confirm(200); // h: +1
    setShift(3);
    s.confirm(300); // v: −3
    setShift(1);
    s.confirm(400); // v: −1
    const sum = s.summary();
    expect(sum.runs).toBe(4);
    expect(sum.hMean).toBe(1.5);
    expect(sum.hDiff).toBe(1);
    expect(sum.vMean).toBe(-2);
    expect(sum.vDiff).toBe(2);
    expect(sum.msMean).toBe(100);
  });

  it('Teil-Ergebnis und leerer Durchlauf ohne NaN', () => {
    const one = make({ axes: 'horizontal' });
    one.confirm(500);
    const sum = one.summary();
    expect(sum.hMean).not.toBeNull();
    expect(sum.hDiff).toBeNull();
    expect(sum.vMean).toBeNull();
    expect(sum.vDiff).toBeNull();
    const none = make().summary();
    expect(none).toMatchObject({ runs: 0, hMean: null, vMean: null, msMean: null, limitedTo: null });
  });

  it('Tipp: begrenzt vor Standard', () => {
    const base = make().summary();
    expect(tipFor({ ...base, limitedTo: 3 })).toBe('limited');
    expect(tipFor({ ...base, limitedTo: null })).toBe('bothSides');
  });
});
