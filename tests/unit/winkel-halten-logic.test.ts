import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import { classifyTap } from '../../src/exercises/_shared/vorperiode';
import {
  ANTICIPATION_MS,
  bandFrac,
  computeStats,
  emerge,
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
} from '../../src/exercises/winkel-halten/logic';

describe('winkel-halten: Stufenfunktionen', () => {
  it('Sichtzeit und Größe sinken, die Höhenstreuung wächst', () => {
    expect(lifeMs(1)).toBe(1700);
    for (let l = 2; l <= MAX_LEVEL; l++) {
      expect(lifeMs(l)).toBeLessThanOrEqual(lifeMs(l - 1));
      expect(radiusU(l)).toBeLessThanOrEqual(radiusU(l - 1));
      expect(bandFrac(l)).toBeGreaterThanOrEqual(bandFrac(l - 1));
    }
    expect(lifeMs(MAX_LEVEL)).toBe(MIN_LIFE_MS);
    expect(MIN_LIFE_MS).toBeGreaterThanOrEqual(2 * 130 + 160);
    expect(radiusU(MAX_LEVEL)).toBeGreaterThanOrEqual(3.6);
    expect(bandFrac(MAX_LEVEL)).toBeLessThanOrEqual(0.85);
    expect(levelOf(-1)).toBe(1);
    expect(levelOf(50)).toBe(MAX_LEVEL);
  });
});

describe('winkel-halten: Wartezeit (nicht alternd)', () => {
  it('liegt zwischen 1 s und 4,5 s und hat konstante Überlebensrate', () => {
    const rng = createRng(99);
    const xs: number[] = [];
    for (let i = 0; i < 6000; i++) xs.push(waitMs(rng));
    expect(Math.min(...xs)).toBeGreaterThanOrEqual(1000);
    expect(Math.max(...xs)).toBeLessThanOrEqual(4500);
    const surv = (from: number, len: number) => {
      const alive = xs.filter((x) => x > from);
      return alive.filter((x) => x > from + len).length / alive.length;
    };
    // Wer schon 1 s (bzw. 1,8 s) gewartet hat, hat dieselbe Chance, dass es noch 700 ms dauert
    expect(Math.abs(surv(1000, 700) - surv(1800, 700))).toBeLessThan(0.07);
    // und die Zeiten sind nicht auf wenige Werte verteilt
    expect(new Set(xs.map((x) => Math.round(x / 10))).size).toBeGreaterThan(200);
  });
});

describe('winkel-halten: Frühstart', () => {
  it('Tipp vor dem Ziel oder unter 100 ms danach ist ein Frühstart', () => {
    expect(ANTICIPATION_MS).toBe(100);
    expect(classifyTap(null)).toBe('early');
    expect(classifyTap(0)).toBe('early');
    expect(classifyTap(99)).toBe('early');
    expect(classifyTap(100)).toBe('valid');
    expect(classifyTap(450)).toBe('valid');
  });
});

describe('winkel-halten: Seiten und Geometrie', () => {
  it('nie mehr als dreimal dieselbe Seite hintereinander', () => {
    const rng = createRng(8);
    const hist: Side[] = [];
    for (let i = 0; i < 2000; i++) {
      const s = pickSide(rng, hist);
      const n = hist.length;
      if (n >= 3) expect(hist[n - 1] === s && hist[n - 2] === s && hist[n - 3] === s).toBe(false);
      hist.push(s);
    }
    expect(new Set(hist).size).toBe(2);
  });

  it('Ziele und ihr Trefferkreis liegen auf der Bühne, Durchgang ist breit genug', () => {
    for (const [w, h] of [
      [1024, 700],
      [390, 700],
      [800, 450],
    ]) {
      const u = Math.min(w, h) / 100;
      for (const level of [1, MAX_LEVEL]) {
        const lay = layoutFor(w, h, u, level);
        expect(lay.hitR).toBeGreaterThanOrEqual(28);
        expect(lay.slotW).toBeGreaterThan(lay.r);
        for (const side of ['left', 'right'] as const) {
          for (const ny of [0, 1]) {
            const p = targetAt(lay, side, ny);
            // auch ganz herausgeschoben (0,9 Radien nach innen) bleibt der Kreis auf der Bühne
            const x = p.x + (side === 'left' ? 1 : -1) * 0.9 * lay.r;
            expect(x - lay.hitR).toBeGreaterThanOrEqual(0);
            expect(x + lay.hitR).toBeLessThanOrEqual(w);
            expect(p.y - lay.hitR).toBeGreaterThanOrEqual(0);
            expect(p.y + lay.hitR).toBeLessThanOrEqual(h);
          }
        }
      }
    }
  });

  it('emerge wächst weich von 0 auf 1 und hängt nur von der Zeit ab', () => {
    expect(emerge(0)).toBe(0);
    expect(emerge(360)).toBe(1);
    expect(emerge(1000)).toBe(1);
    expect(emerge(180)).toBeCloseTo(0.5);
    let prev = 0;
    for (let a = 0; a <= 360; a += 10) {
      expect(emerge(a)).toBeGreaterThanOrEqual(prev);
      prev = emerge(a);
    }
  });
});

describe('winkel-halten: Wertung', () => {
  it('Statistik und Tipps', () => {
    const hits = [
      { ms: 400, side: 'left' as const },
      { ms: 420, side: 'left' as const },
      { ms: 440, side: 'left' as const },
      { ms: 700, side: 'right' as const },
      { ms: 720, side: 'right' as const },
      { ms: 740, side: 'right' as const },
    ];
    const s = computeStats(hits, 1, 0, 1);
    expect(s.medianMs).toBe(570);
    expect(s.accuracy).toBeCloseTo((100 * 6) / 8);
    expect(tipFor(s)).toBe('side');
    expect(tipFor({ ...s, early: 2 })).toBe('early');
    expect(tipFor({ ...s, early: 0, wrong: 3 })).toBe('wrong');
    expect(tipFor({ ...s, early: 0, missed: 3 })).toBe('slow');
    expect(tipFor({ ...s, early: 0, medianRight: 440 })).toBe('great');
    const e = computeStats([], 0, 0, 0);
    expect(e.accuracy).toBe(0);
    expect(Number.isNaN(e.medianMs)).toBe(true);
    expect(pointsFor(3, 500, 1000)).toBe(19);
  });
});
