import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  computeStats,
  DOORS,
  doorAt,
  gapMs,
  isOuter,
  layoutDoors,
  levelOf,
  MAX_LEVEL,
  MIN_VISIBLE_MS,
  pickDoor,
  targetAlpha,
  tipFor,
  visibleMs,
} from '../../src/exercises/fuenf-tueren/logic';

describe('fuenf-tueren: Stufenfunktion', () => {
  it('Sichtbarkeit sinkt mit der Stufe, bleibt aber in den Grenzen', () => {
    expect(visibleMs(1)).toBe(1500);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(visibleMs(l)).toBeLessThanOrEqual(visibleMs(l - 1));
    expect(visibleMs(MAX_LEVEL)).toBe(MIN_VISIBLE_MS);
    expect(visibleMs(MAX_LEVEL)).toBeGreaterThanOrEqual(2 * 130 + 100); // weich ein und aus + Haltezeit
    expect(visibleMs(-5)).toBe(visibleMs(1));
    expect(visibleMs(99)).toBe(visibleMs(MAX_LEVEL));
    expect(levelOf(3.9)).toBe(3);
  });

  it('Pause ist zufällig zwischen 550 und 1150 ms', () => {
    const rng = createRng(11);
    const gaps = new Set<number>();
    for (let i = 0; i < 200; i++) {
      const g = gapMs(rng);
      expect(g).toBeGreaterThanOrEqual(550);
      expect(g).toBeLessThan(1150);
      gaps.add(Math.round(g));
    }
    expect(gaps.size).toBeGreaterThan(50);
  });
});

describe('fuenf-tueren: Türfolge', () => {
  it('nie dieselbe Tür zweimal direkt hintereinander, nie 1-2-3-Läufe', () => {
    for (const seed of [1, 2, 3, 99]) {
      const rng = createRng(seed);
      const hist: number[] = [];
      for (let i = 0; i < 1000; i++) {
        const d = pickDoor(rng, hist);
        expect(d).toBeGreaterThanOrEqual(0);
        expect(d).toBeLessThan(DOORS);
        if (hist.length) expect(d).not.toBe(hist[hist.length - 1]);
        if (hist.length > 1) {
          const a = hist[hist.length - 2];
          const b = hist[hist.length - 1];
          expect(Math.abs(b - a) === 1 && d - b === b - a).toBe(false);
        }
        hist.push(d);
      }
    }
  });

  it('nutzt alle fünf Türen ungefähr gleich oft', () => {
    const rng = createRng(2024);
    const hist: number[] = [];
    const count = Array(DOORS).fill(0);
    for (let i = 0; i < 5000; i++) {
      const d = pickDoor(rng, hist);
      hist.push(d);
      count[d]++;
    }
    for (const c of count) {
      expect(c).toBeGreaterThan(5000 * 0.14);
      expect(c).toBeLessThan(5000 * 0.27);
    }
  });

  it('ist bei leerem Verlauf gültig', () => {
    const rng = createRng(4);
    const d = pickDoor(rng, []);
    expect(d).toBeGreaterThanOrEqual(0);
    expect(d).toBeLessThan(DOORS);
  });
});

describe('fuenf-tueren: Geometrie und Treffer', () => {
  it('fünf Türen nebeneinander, in der Bühne, Trefferfläche ≥ 24 px Radius', () => {
    for (const [w, h] of [
      [1024, 700],
      [360, 640],
      [880, 640],
    ] as const) {
      const u = Math.min(w, h) / 100;
      const lay = layoutDoors(w, u, h - Math.max(10, u * 2));
      expect(lay.doors.length).toBe(5);
      for (let i = 1; i < 5; i++) expect(lay.doors[i].x).toBeGreaterThan(lay.doors[i - 1].x + lay.doors[i - 1].w - 1e-6);
      expect(lay.doors[0].x).toBeGreaterThanOrEqual(0);
      expect(lay.doors[4].x + lay.doors[4].w).toBeLessThanOrEqual(w + 1e-6);
      expect(lay.doors[0].y + lay.doors[0].h).toBeLessThanOrEqual(h);
      for (const d of lay.doors) expect(d.w / 2 + lay.gap / 2).toBeGreaterThanOrEqual(24);
      expect(lay.radius).toBeGreaterThanOrEqual(18);
    }
  });

  it('doorAt trifft die eigene Türspalte und nichts außerhalb der Reihe', () => {
    const lay = layoutDoors(1000, 7, 680);
    lay.targets.forEach((c, i) => expect(doorAt(lay, c.x, c.y)).toBe(i));
    expect(doorAt(lay, lay.doors[0].x - lay.gap, lay.targets[0].y)).toBe(-1);
    expect(doorAt(lay, lay.targets[2].x, lay.hitTop - 5)).toBe(-1);
    expect(doorAt(lay, lay.targets[2].x, lay.hitBottom + 5)).toBe(-1);
    // Lücke zwischen zwei Türen gehört (in der Hälfte) jeweils der nächsten Tür
    const d1 = lay.doors[1];
    expect(doorAt(lay, d1.x - lay.gap / 2 + 0.5, lay.targets[1].y)).toBe(1);
    expect(doorAt(lay, d1.x - lay.gap / 2 - 0.5, lay.targets[1].y)).toBe(0);
  });

  it('weiche Ein-/Ausblendung ohne harten Sprung', () => {
    const life = 600;
    expect(targetAlpha(0, life)).toBe(0);
    expect(targetAlpha(life, life)).toBe(0);
    expect(targetAlpha(life / 2, life)).toBe(1);
    let prev = 0;
    let maxStep = 0;
    for (let a = 16; a <= life; a += 16) {
      const v = targetAlpha(a, life);
      maxStep = Math.max(maxStep, Math.abs(v - prev));
      prev = v;
    }
    expect(maxStep).toBeLessThan(0.25);
  });
});

describe('fuenf-tueren: Auswertung', () => {
  it('Trefferquote, Median und äußere/innere Türen', () => {
    const hits = [
      { ms: 500, door: 1 },
      { ms: 520, door: 2 },
      { ms: 540, door: 3 },
      { ms: 700, door: 0 },
      { ms: 720, door: 4 },
      { ms: 740, door: 0 },
    ];
    const s = computeStats(hits, 2, 2);
    expect(s.hits).toBe(6);
    expect(s.accuracy).toBeCloseTo(60);
    expect(s.medianMs).toBeCloseTo(620);
    expect(s.medianInner).toBe(520);
    expect(s.medianOuter).toBe(720);
    expect(isOuter(0)).toBe(true);
    expect(isOuter(2)).toBe(false);
    expect(Number.isNaN(computeStats([], 0, 0).medianMs)).toBe(true);
    expect(computeStats([], 0, 0).accuracy).toBe(0);
  });

  it('Tipps: falsche Tür, zu langsam, äußere Türen, sonst gut', () => {
    const mk = (inner: number[], outer: number[]) => [...inner.map((ms) => ({ ms, door: 2 })), ...outer.map((ms) => ({ ms, door: 0 }))];
    expect(tipFor(computeStats(mk([500, 500, 500], []), 4, 1))).toBe('wrong');
    expect(tipFor(computeStats(mk([500, 500, 500], []), 1, 4))).toBe('slow');
    expect(tipFor(computeStats(mk([500, 500, 500], [700, 720, 740]), 0, 0))).toBe('outer');
    expect(tipFor(computeStats(mk([500, 500, 500], [520, 540, 560]), 0, 0))).toBe('great');
  });
});
