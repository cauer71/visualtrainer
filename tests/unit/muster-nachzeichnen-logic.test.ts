import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  ANCHORS,
  captureRadiusPx,
  CLEARANCE,
  crossingChanceFor,
  exposureMsFor,
  hasCrossings,
  lcsLength,
  levelOf,
  makePattern,
  MAX_LEVEL,
  MIN_LEVEL,
  minSpacingPx,
  PASS_FRACTION,
  patternLengthFor,
  planTrace,
  pointsFor,
  scorePattern,
  segmentClear,
  Tracer,
} from '../../src/exercises/muster-nachzeichnen/logic';

describe('muster-nachzeichnen: Stufenfunktionen', () => {
  it('Länge wächst 3 → 9, Einprägezeit je Punkt sinkt, Kreuzungen werden wahrscheinlicher', () => {
    expect(patternLengthFor(MIN_LEVEL)).toBe(3);
    expect(patternLengthFor(MAX_LEVEL)).toBe(9);
    for (let l = MIN_LEVEL + 1; l <= MAX_LEVEL; l++) {
      expect(patternLengthFor(l)).toBeGreaterThanOrEqual(patternLengthFor(l - 1));
      expect(exposureMsFor(l, 5)).toBeLessThan(exposureMsFor(l - 1, 5));
      expect(crossingChanceFor(l)).toBeGreaterThanOrEqual(crossingChanceFor(l - 1));
    }
    expect(crossingChanceFor(6)).toBe(0);
    expect(crossingChanceFor(18)).toBe(1);
  });

  it('Einprägezeit bleibt kurz: höchstens etwa 5 s', () => {
    for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) expect(exposureMsFor(l)).toBeLessThanOrEqual(5000);
    expect(exposureMsFor(1)).toBe(1000 + 3 * 800);
  });

  it('begrenzt Stufen, Punkte', () => {
    expect(levelOf(99)).toBe(MAX_LEVEL);
    expect(patternLengthFor(99)).toBe(9);
    expect(pointsFor(6, 5)).toBe(25);
    expect(pointsFor(6, -1)).toBe(0);
  });
});

describe('muster-nachzeichnen: Stützpunkte', () => {
  it('12 Stützpunkte im Feld, klar getrennt', () => {
    expect(ANCHORS).toHaveLength(12);
    for (const a of ANCHORS) {
      expect(a.x).toBeGreaterThan(0);
      expect(a.x).toBeLessThan(1);
      expect(a.y).toBeGreaterThan(0);
      expect(a.y).toBeLessThan(1);
    }
    for (const aspect of [0.6, 1, 1.7]) {
      let m = Infinity;
      for (let i = 0; i < ANCHORS.length; i++) {
        for (let j = i + 1; j < ANCHORS.length; j++) {
          m = Math.min(m, Math.hypot((ANCHORS[i].x - ANCHORS[j].x) * aspect, ANCHORS[i].y - ANCHORS[j].y));
        }
      }
      expect(m).toBeGreaterThan(0.15);
    }
  });

  it('Fangradius überlappt nie: höchstens 40 % des kleinsten Abstands, mindestens ≈ 24 px', () => {
    for (const [fw, fh] of [
      [900, 560],
      [1100, 650],
      [330, 600],
      [1000, 620],
    ]) {
      const r = captureRadiusPx(fw, fh);
      expect(r).toBeLessThanOrEqual(0.4 * minSpacingPx(fw, fh) + 1e-9);
      expect(r).toBeGreaterThanOrEqual(24);
    }
  });
});

describe('muster-nachzeichnen: Muster', () => {
  it('Länge stimmt, Punkte verschieden, jede Strecke an anderen Stützpunkten vorbei', () => {
    const rng = createRng(7);
    for (let level = MIN_LEVEL; level <= MAX_LEVEL; level++) {
      for (const aspect of [0.7, 1.4]) {
        for (let i = 0; i < 12; i++) {
          const n = patternLengthFor(level);
          const seq = makePattern(rng, { n, aspect, allowCrossing: rng.chance(0.5) });
          expect(seq).toHaveLength(n);
          expect(new Set(seq).size).toBe(n);
          for (const a of seq) expect(a).toBeGreaterThanOrEqual(0);
          for (let k = 0; k + 1 < seq.length; k++) expect(segmentClear(seq[k], seq[k + 1], aspect, CLEARANCE * 0.5)).toBe(true);
        }
      }
    }
  });

  it('ohne Kreuzungserlaubnis kreuzt sich der Linienzug nicht (Normalfall)', () => {
    const rng = createRng(3);
    let crossing = 0;
    for (let i = 0; i < 120; i++) {
      const seq = makePattern(rng, { n: 6 + (i % 4), aspect: 1.3, allowCrossing: false });
      if (hasCrossings(seq, 1.3)) crossing++;
    }
    expect(crossing).toBe(0);
  });

  it('mit Kreuzungserlaubnis kommen Kreuzungen vor', () => {
    const rng = createRng(5);
    let crossing = 0;
    for (let i = 0; i < 200; i++) {
      if (hasCrossings(makePattern(rng, { n: 8, aspect: 1.3, allowCrossing: true }), 1.3)) crossing++;
    }
    expect(crossing).toBeGreaterThan(10);
  });

  it('Kreuzungs-Erkennung: Kreuz ja, Linie nein', () => {
    // 0 (0.1,0.12) → 6 (0.78,0.42) → 4 (0.2,0.4) → 2 (0.64,0.14): die Strecken 0→6 und 4→2 kreuzen sich
    expect(hasCrossings([0, 6, 4, 2], 1)).toBe(true);
    expect(hasCrossings([0, 4, 7], 1)).toBe(false);
  });

  it('das nächste Muster beginnt an einem anderen Punkt', () => {
    const rng = createRng(11);
    let prev: number[] | undefined;
    for (let i = 0; i < 100; i++) {
      const seq = makePattern(rng, { n: 5, aspect: 1.2, allowCrossing: false, prev });
      if (prev) expect(seq[0]).not.toBe(prev[0]);
      prev = seq;
    }
  });

  it('gleicher Startwert liefert gleiche Muster (ctx.rng)', () => {
    const a = makePattern(createRng(9), { n: 7, aspect: 1.3, allowCrossing: true });
    const b = makePattern(createRng(9), { n: 7, aspect: 1.3, allowCrossing: true });
    expect(a).toEqual(b);
  });
});

describe('muster-nachzeichnen: Wertung', () => {
  it('lcsLength', () => {
    expect(lcsLength([1, 2, 3, 4], [1, 2, 3, 4])).toBe(4);
    expect(lcsLength([1, 2, 3, 4], [4, 3, 2, 1])).toBe(1);
    expect(lcsLength([1, 2, 3, 4], [1, 3, 4])).toBe(3);
    expect(lcsLength([], [1])).toBe(0);
  });

  it('alles richtig', () => {
    const s = scorePattern([3, 5, 1, 8], [3, 5, 1, 8]);
    expect(s.matched).toBe(4);
    expect(s.fraction).toBe(1);
    expect(s.passed).toBe(true);
    expect(s.matches).toEqual([true, true, true, true]);
  });

  it('ein vergessener Punkt verschiebt die folgenden nicht', () => {
    const s = scorePattern([3, 5, 1, 8, 2], [3, 1, 8, 2]);
    expect(s.matched).toBe(4);
    expect(s.matches).toEqual([true, false, true, true, true]);
    expect(s.fraction).toBeCloseTo(0.8);
    expect(s.passed).toBe(true);
  });

  it('falsche Reihenfolge zählt nicht', () => {
    const s = scorePattern([1, 2, 3, 4], [4, 3, 2, 1]);
    expect(s.matched).toBe(1);
    expect(s.passed).toBe(false);
  });

  it('falscher Punkt dazwischen, Teilweise gezeichnet', () => {
    const a = scorePattern([1, 2, 3, 4, 5], [1, 9, 3, 4, 5]);
    expect(a.matched).toBe(4);
    expect(a.matches).toEqual([true, false, true, true, true]);
    const b = scorePattern([1, 2, 3, 4, 5], [1, 2]);
    expect(b.matched).toBe(2);
    expect(b.passed).toBe(false);
    expect(scorePattern([1, 2, 3], []).fraction).toBe(0);
  });

  it('Schwelle: 80 %', () => {
    expect(PASS_FRACTION).toBe(0.8);
    expect(scorePattern([1, 2, 3], [1, 2, 9]).passed).toBe(false);
    expect(scorePattern([1, 2, 3, 4, 5], [1, 2, 3, 4, 9]).passed).toBe(true);
  });
});

describe('muster-nachzeichnen: Tracer', () => {
  it('zählt Wiederholungen direkt nacheinander nicht, endet bei n Punkten', () => {
    const t = new Tracer(3);
    expect(t.add(4)).toBe(true);
    expect(t.add(4)).toBe(false);
    expect(t.add(-1)).toBe(false);
    expect(t.add(7)).toBe(true);
    expect(t.add(4)).toBe(true);
    expect(t.full).toBe(true);
    expect(t.add(2)).toBe(false);
    expect(t.drawn).toEqual([4, 7, 4]);
    expect(t.last).toBe(4);
    expect(new Tracer(2).last).toBe(-1);
  });
});

describe('muster-nachzeichnen: Autoplay-Plan', () => {
  it('sauberer Plan entspricht dem Muster; sonst meist gleich, manchmal ein Fehler', () => {
    const rng = createRng(2);
    const seq = [0, 5, 9, 3, 8];
    expect(planTrace(rng, seq, 10, true)).toEqual(seq);
    let same = 0;
    let diff = 0;
    for (let i = 0; i < 300; i++) {
      const p = planTrace(rng, seq, 8);
      expect(p).toHaveLength(seq.length);
      if (p.every((v, k) => v === seq[k])) same++;
      else diff++;
    }
    expect(same).toBeGreaterThan(diff);
    expect(diff).toBeGreaterThan(10);
  });
});
