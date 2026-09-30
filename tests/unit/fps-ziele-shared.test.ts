import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import { classifyTap, foreperiodMs, reactionStats, spreadMs } from '../../src/exercises/_shared/vorperiode';
import {
  edgeLayout,
  edgeTargetAt,
  fadeAlpha,
  FADE_MS,
  hitRadiusFor,
  minLifeMs,
  MIN_HIT_PX,
  pickSide,
  type Side,
} from '../../src/exercises/_shared/ziel-auftauchen';

describe('ziel-auftauchen (gemeinsame Bausteine)', () => {
  it('Trefferradius: nie kleiner als 24 px (Engine-Vorgabe), immer größer als das Ziel', () => {
    expect(MIN_HIT_PX).toBeGreaterThanOrEqual(24);
    for (const r of [5, 15, 26, 50]) {
      expect(hitRadiusFor(r)).toBeGreaterThan(r);
      expect(hitRadiusFor(r)).toBeGreaterThanOrEqual(24);
    }
  });

  it('weiches Ein- und Ausblenden: ≥ 100 ms, nie außerhalb der Lebensdauer sichtbar', () => {
    expect(FADE_MS).toBeGreaterThanOrEqual(100);
    expect(fadeAlpha(-1, 1000)).toBe(0);
    expect(fadeAlpha(0, 1000)).toBe(0);
    expect(fadeAlpha(FADE_MS, 1000)).toBe(1);
    expect(fadeAlpha(500, 1000)).toBe(1);
    expect(fadeAlpha(1000, 1000)).toBe(0);
    expect(fadeAlpha(1000 - FADE_MS / 2, 1000)).toBeCloseTo(0.5);
    // kürzeste sinnvolle Lebensdauer hat ein Plateau
    const life = minLifeMs();
    expect(fadeAlpha(life / 2, life)).toBe(1);
    // Ein- und Ausblenden überschneiden sich auch bei sehr kurzer Dauer nicht zu einem Sprung
    let prev = 0;
    for (let a = 0; a <= FADE_MS; a += 10) {
      expect(fadeAlpha(a, 2000)).toBeGreaterThanOrEqual(prev);
      prev = fadeAlpha(a, 2000);
    }
  });

  it('Randlayout: Trefferkreis auf der Bühne, Band begrenzt', () => {
    const lay = edgeLayout(1000, 600, 6, 7, 0.9);
    expect(lay.leftX - lay.hitR).toBeGreaterThanOrEqual(0);
    expect(lay.rightX + lay.hitR).toBeLessThanOrEqual(1000);
    expect(lay.yMin - lay.hitR).toBeGreaterThanOrEqual(0);
    expect(lay.yMax + lay.hitR).toBeLessThanOrEqual(600);
    expect(edgeTargetAt(lay, 'left', -5).y).toBe(lay.yMin);
    expect(edgeTargetAt(lay, 'right', 9).y).toBe(lay.yMax);
    // winzige Bühne: kein Absturz, Werte endlich
    const tiny = edgeLayout(40, 40, 0.4, 7, 0.9);
    expect(Number.isFinite(tiny.yMin) && Number.isFinite(tiny.leftX)).toBe(true);
  });

  it('Seitenwahl: nie vier gleiche hintereinander', () => {
    const rng = createRng(6);
    const hist: Side[] = [];
    let run = 0;
    let maxRun = 0;
    for (let i = 0; i < 3000; i++) {
      const s = pickSide(rng, hist);
      run = hist.length && hist[hist.length - 1] === s ? run + 1 : 1;
      maxRun = Math.max(maxRun, run);
      hist.push(s);
    }
    expect(maxRun).toBeLessThanOrEqual(3);
  });
});

describe('vorperiode (gemeinsame Bausteine)', () => {
  it('foreperiodMs hält Mindestzeit und Kappung', () => {
    const rng = createRng(1);
    for (let i = 0; i < 2000; i++) {
      const v = foreperiodMs(rng, { minMs: 500, meanMs: 300, capMs: 1000 });
      expect(v).toBeGreaterThanOrEqual(500);
      expect(v).toBeLessThanOrEqual(1500);
    }
    // Kappung nahe Null erzwingt Rückfall statt Endlosschleife
    const fixed = foreperiodMs({ exp: () => 9999 }, { minMs: 100, meanMs: 1, capMs: 10 });
    expect(fixed).toBe(105);
  });

  it('classifyTap / spreadMs / reactionStats', () => {
    expect(classifyTap(null)).toBe('early');
    expect(classifyTap(99.9)).toBe('early');
    expect(classifyTap(100)).toBe('valid');
    expect(Number.isNaN(spreadMs([1, 2, 3]))).toBe(true);
    expect(spreadMs([100, 200, 300, 400, 500])).toBe(200);
    const s = reactionStats([200, 300, 400, 500], 1, 2);
    expect(s).toMatchObject({ medianMs: 350, valid: 4, early: 1, missed: 2 });
  });
});
