import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  bandFrac,
  computeStats,
  inCircle,
  layoutFor,
  levelOf,
  lifeMs,
  MAX_LEVEL,
  MIN_LIFE_MS,
  pickSide,
  pointsFor,
  radiusU,
  type Side,
  targetAt,
  tipFor,
  waitMs,
} from '../../src/exercises/randziel-flick/logic';

describe('randziel-flick: Stufenfunktionen', () => {
  it('Sichtzeit und Größe sinken, das Band wächst, alles in den Grenzen', () => {
    expect(lifeMs(1)).toBe(1900);
    for (let l = 2; l <= MAX_LEVEL; l++) {
      expect(lifeMs(l)).toBeLessThanOrEqual(lifeMs(l - 1));
      expect(radiusU(l)).toBeLessThanOrEqual(radiusU(l - 1));
      expect(bandFrac(l)).toBeGreaterThanOrEqual(bandFrac(l - 1));
    }
    expect(lifeMs(MAX_LEVEL)).toBe(MIN_LIFE_MS);
    expect(MIN_LIFE_MS).toBeGreaterThanOrEqual(2 * 130 + 160);
    expect(radiusU(MAX_LEVEL)).toBeGreaterThanOrEqual(3.6);
    expect(bandFrac(1)).toBeCloseTo(0.3);
    expect(bandFrac(MAX_LEVEL)).toBeLessThanOrEqual(0.9);
    expect(levelOf(0)).toBe(1);
    expect(levelOf(99)).toBe(MAX_LEVEL);
  });
});

describe('randziel-flick: Wartezeit und Seiten', () => {
  it('Wartezeit ist unvorhersehbar: Mindestzeit, Obergrenze, nicht alternd', () => {
    const rng = createRng(21);
    const xs: number[] = [];
    for (let i = 0; i < 4000; i++) xs.push(waitMs(rng));
    expect(Math.min(...xs)).toBeGreaterThanOrEqual(500);
    expect(Math.max(...xs)).toBeLessThanOrEqual(500 + 1800);
    // konstante Gefahrenrate: Anteil der Wartezeiten, die nach einer weiteren Wartezeit von 400 ms enden,
    // ist unter denen, die noch laufen, etwa so groß wie zu Beginn (gleiche Überlebensrate je 400 ms)
    const surv = (from: number, len: number) => {
      const alive = xs.filter((x) => x > from);
      return alive.filter((x) => x > from + len).length / alive.length;
    };
    expect(Math.abs(surv(500, 400) - surv(900, 400))).toBeLessThan(0.08);
  });

  it('nie mehr als dreimal dieselbe Seite hintereinander, beide Seiten gleich oft', () => {
    for (const seed of [1, 2, 3]) {
      const rng = createRng(seed);
      const hist: Side[] = [];
      for (let i = 0; i < 3000; i++) {
        const s = pickSide(rng, hist);
        const n = hist.length;
        if (n >= 3) expect(hist[n - 1] === s && hist[n - 2] === s && hist[n - 3] === s).toBe(false);
        hist.push(s);
      }
      const left = hist.filter((h) => h === 'left').length;
      expect(left).toBeGreaterThan(1300);
      expect(left).toBeLessThan(1700);
    }
  });
});

describe('randziel-flick: Geometrie', () => {
  it('Ziele liegen mit vollem Trefferkreis auf der Bühne, Start in der Mitte', () => {
    for (const [w, h] of [
      [1024, 700],
      [390, 700],
      [800, 450],
    ]) {
      const u = Math.min(w, h) / 100;
      for (const level of [1, 7, MAX_LEVEL]) {
        const lay = layoutFor(w, h, u, level);
        expect(lay.cx).toBe(w / 2);
        expect(lay.cy).toBe(h / 2);
        expect(lay.hitR).toBeGreaterThanOrEqual(28);
        expect(lay.markHit).toBeGreaterThanOrEqual(44);
        for (const side of ['left', 'right'] as const) {
          for (const ny of [0, 0.5, 1]) {
            const p = targetAt(lay, side, ny);
            expect(p.x - lay.hitR).toBeGreaterThanOrEqual(0);
            expect(p.x + lay.hitR).toBeLessThanOrEqual(w);
            expect(p.y - lay.hitR).toBeGreaterThanOrEqual(0);
            expect(p.y + lay.hitR).toBeLessThanOrEqual(h);
            // Ziel liegt außerhalb der Mittelmarke
            expect(inCircle(p.x, p.y, lay.cx, lay.cy, lay.markHit)).toBe(false);
          }
        }
        const l = targetAt(lay, 'left', 0.5);
        const r = targetAt(lay, 'right', 0.5);
        expect(l.x).toBeLessThan(w / 2);
        expect(r.x).toBeGreaterThan(w / 2);
      }
    }
  });

  it('Band wächst mit der Stufe', () => {
    const a = layoutFor(1000, 700, 7, 1);
    const b = layoutFor(1000, 700, 7, MAX_LEVEL);
    expect(b.yMax - b.yMin).toBeGreaterThan(a.yMax - a.yMin);
  });
});

describe('randziel-flick: Wertung', () => {
  it('Statistik, Tipps, Punkte', () => {
    const s = computeStats(
      [
        { ms: 500, side: 'left' },
        { ms: 520, side: 'left' },
        { ms: 540, side: 'left' },
        { ms: 800, side: 'right' },
        { ms: 820, side: 'right' },
        { ms: 840, side: 'right' },
      ],
      0,
      2,
    );
    expect(s.medianLeft).toBe(520);
    expect(s.medianRight).toBe(820);
    expect(s.accuracy).toBeCloseTo(75);
    expect(tipFor(s)).toBe('side');
    expect(tipFor({ ...s, medianRight: 560 })).toBe('great');
    expect(tipFor({ ...s, wrong: 4 })).toBe('wrong');
    expect(tipFor({ ...s, missed: 3 })).toBe('slow');
    expect(Number.isNaN(computeStats([], 0, 0).medianMs)).toBe(true);
    expect(pointsFor(1, 0, 1000)).toBe(20);
  });
});
