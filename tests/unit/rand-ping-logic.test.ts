import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  DIRS,
  FADE_MS,
  MAX_LEVEL,
  MIN_EXPOSURE_MS,
  MIN_LEVEL,
  RING_FRACS,
  type Spot,
  computeStats,
  dotRadiusU,
  exposureMs,
  holdMs,
  layoutPing,
  levelOf,
  nearestSpot,
  pickSpot,
  pickSymbol,
  pointsFor,
  ringsFor,
  spotPos,
  spotsFor,
  tipFor,
  windowAlpha,
} from '../../src/exercises/rand-ping/logic';

describe('rand-ping: Stufenfunktionen', () => {
  it('Anzeigedauer sinkt von 1000 ms bis 400 ms und bleibt weich (je ≥ 150 ms Übergang + ≥ 100 ms voll)', () => {
    expect(exposureMs(MIN_LEVEL)).toBe(1000);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(exposureMs(l)).toBeLessThanOrEqual(exposureMs(l - 1));
    expect(exposureMs(MAX_LEVEL)).toBe(MIN_EXPOSURE_MS);
    for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) {
      expect(holdMs(l)).toBeGreaterThanOrEqual(100);
      expect(exposureMs(l)).toBeGreaterThanOrEqual(2 * FADE_MS + 100);
    }
    expect(FADE_MS).toBeGreaterThanOrEqual(150);
    expect(exposureMs(-4)).toBe(exposureMs(1));
    expect(exposureMs(99)).toBe(exposureMs(MAX_LEVEL));
    expect(levelOf(3.8)).toBe(3);
  });

  it('Ringe: Stufe 1–4 zwei, ab 5 drei; Orte = 8 Richtungen × Ringe', () => {
    expect(ringsFor(1)).toEqual([0, 1]);
    expect(ringsFor(4)).toEqual([0, 1]);
    expect(ringsFor(5)).toEqual([0, 1, 2]);
    expect(spotsFor(1)).toHaveLength(DIRS * 2);
    expect(spotsFor(MAX_LEVEL)).toHaveLength(DIRS * 3);
    expect(new Set(spotsFor(6).map((s) => `${s.dir}/${s.ring}`)).size).toBe(24);
  });

  it('Punktgröße sinkt mit der Stufe, bleibt aber groß genug', () => {
    for (let l = 2; l <= MAX_LEVEL; l++) expect(dotRadiusU(l)).toBeLessThanOrEqual(dotRadiusU(l - 1));
    expect(dotRadiusU(1)).toBeCloseTo(3.6, 6);
    expect(dotRadiusU(MAX_LEVEL)).toBeGreaterThanOrEqual(2.5);
  });
});

describe('rand-ping: weiches Ein- und Ausblenden', () => {
  it('Deckkraft steigt/fällt stetig, erreicht 1, ist außerhalb 0, nie mehr als 1', () => {
    const total = 1000;
    expect(windowAlpha(0, total)).toBe(0);
    expect(windowAlpha(total, total)).toBe(0);
    expect(windowAlpha(total + 50, total)).toBe(0);
    expect(windowAlpha(500, total)).toBeCloseTo(1, 6);
    let prev = 0;
    for (let a = 0; a <= FADE_MS; a += 5) {
      const v = windowAlpha(a, total);
      expect(v).toBeGreaterThanOrEqual(prev - 1e-9);
      prev = v;
    }
    expect(windowAlpha(FADE_MS, total)).toBeCloseTo(1, 6);
  });

  it('Kein Sprung: pro Millisekunde höchstens ≈ 0,6 % Änderung bei 150 ms Übergang (kein Blitzen), auch bei kürzester Dauer', () => {
    for (const total of [1000, MIN_EXPOSURE_MS]) {
      let prev = windowAlpha(0.5, total);
      let maxStep = 0;
      for (let ms = 1; ms < total; ms++) {
        const v = windowAlpha(ms, total);
        maxStep = Math.max(maxStep, Math.abs(v - prev));
        prev = v;
      }
      expect(maxStep).toBeLessThan(0.0111);
    }
  });

  it('bei zu kurzer Gesamtdauer: Übergang wird halbiert statt zu überlappen', () => {
    expect(windowAlpha(100, 200, 150)).toBeCloseTo(1, 6);
  });
});

describe('rand-ping: Orte und Zeichen', () => {
  it('Ort: nie dieselbe Richtung zweimal hintereinander, alle Orte gleich oft', () => {
    for (const level of [1, 6]) {
      const rng = createRng(level * 13);
      const spots = spotsFor(level);
      const hist: Spot[] = [];
      for (let i = 0; i < spots.length * 4; i++) {
        const idx = pickSpot(rng, spots, hist);
        const s = spots[idx];
        if (hist.length) expect(s.dir).not.toBe(hist[hist.length - 1].dir);
        hist.push(s);
      }
      const counts = spots.map((s) => hist.filter((h) => h.dir === s.dir && h.ring === s.ring).length);
      expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1);
    }
  });

  it('Zeichen: ausgewogen, nie mehr als dreimal dasselbe', () => {
    const rng = createRng(2);
    const hist: number[] = [];
    for (let i = 0; i < 600; i++) {
      const s = pickSymbol(rng, hist);
      hist.push(s);
      if (hist.length >= 4) {
        const last4 = hist.slice(-4);
        expect(new Set(last4).size).toBeGreaterThan(1);
      }
    }
    const ones = hist.filter((x) => x === 1).length;
    expect(ones).toBeGreaterThan(240);
    expect(ones).toBeLessThan(360);
  });
});

describe('rand-ping: Anordnung', () => {
  const cases: Array<[string, number, number, number]> = [
    ['Tablet quer', 1194, 834, 8.34],
    ['Tablet hoch', 834, 1194, 8.34],
    ['Handy hoch', 360, 640, 3.6],
    ['Handy quer', 640, 360, 3.6],
    ['Intro-Film 16:11', 1040, 715, 7.15],
  ];

  for (const [name, w, h, u] of cases) {
    it(`${name}: Orte im Feld, Antwortfelder ≥ 56 px, Orte frei von Feldern, Orte weit genug auseinander`, () => {
      const bottom = name.startsWith('Intro') ? h - 110 : h;
      const dotR = Math.max(10, dotRadiusU(1) * u);
      const lay = layoutPing(w, h, u, bottom, dotR);
      expect(lay.circleBtn.h).toBeGreaterThanOrEqual(56);
      expect(lay.circleBtn.w).toBeGreaterThanOrEqual(56);
      expect(lay.squareBtn.h).toBeGreaterThanOrEqual(56);
      expect(lay.stacked).toBe(w < h);
      const spots = spotsFor(MAX_LEVEL);
      const pts = spots.map((s) => spotPos(lay, s));
      for (const p of pts) {
        expect(p.x).toBeGreaterThanOrEqual(dotR);
        expect(p.x).toBeLessThanOrEqual(w - dotR);
        expect(p.y).toBeGreaterThanOrEqual(dotR);
        expect(p.y).toBeLessThanOrEqual(bottom - dotR);
        for (const r of [lay.circleBtn, lay.squareBtn]) {
          const inside = p.x >= r.x - dotR && p.x <= r.x + r.w + dotR && p.y >= r.y - dotR && p.y <= r.y + r.h + dotR;
          expect(inside).toBe(false);
        }
        expect(Math.hypot(p.x - lay.cx, p.y - lay.cy)).toBeGreaterThan(lay.centerExclusion);
      }
      // Jeder Ort ist vom nächsten mindestens 24 px entfernt (sicher unterscheidbar beim Antippen)
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) expect(Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)).toBeGreaterThan(24);
      }
      // Tippen genau auf einen Ort liefert diesen Ort
      spots.forEach((s, i) => {
        const p = spotPos(lay, s);
        expect(nearestSpot(lay, spots, p.x, p.y)).toBe(i);
      });
    });
  }

  it('Ringe liegen in der vorgesehenen Reihenfolge von innen nach außen', () => {
    const lay = layoutPing(1194, 834, 8.34, 834, 30);
    const d = RING_FRACS.map((_, ring) => Math.hypot(spotPos(lay, { dir: 6, ring }).x - lay.cx, spotPos(lay, { dir: 6, ring }).y - lay.cy));
    expect(d[0]).toBeLessThan(d[1]);
    expect(d[1]).toBeLessThan(d[2]);
  });

  it('nearestSpot ohne Orte: −1', () => {
    const lay = layoutPing(800, 600, 6, 600, 20);
    expect(nearestSpot(lay, [], 10, 10)).toBe(-1);
  });
});

describe('rand-ping: Auswertung', () => {
  const r = (edgeOk: boolean, centerOk: boolean, ring = 1) => ({ edgeOk, centerOk, ring });

  it('Trefferquoten Rand und Mitte getrennt', () => {
    const s = computeStats([r(true, true), r(true, false), r(false, true), r(true, true)]);
    expect(s.trials).toBe(4);
    expect(s.edgeRate).toBe(75);
    expect(s.centerRate).toBe(75);
  });

  it('ohne Durchgänge: 0 %, Ringquoten NaN', () => {
    const s = computeStats([]);
    expect(s.edgeRate).toBe(0);
    expect(s.centerRate).toBe(0);
    expect(Number.isNaN(s.innerRate)).toBe(true);
    expect(Number.isNaN(s.outerRate)).toBe(true);
  });

  it('Ringquoten erst ab 3 Durchgängen im Ring', () => {
    const few = computeStats([r(true, true, 0), r(true, true, 0), r(false, true, 2), r(false, true, 2)]);
    expect(Number.isNaN(few.innerRate)).toBe(true);
    const many = computeStats([r(true, true, 0), r(true, true, 0), r(true, true, 0), r(false, true, 2), r(false, true, 2), r(true, true, 2)]);
    expect(many.innerRate).toBe(100);
    expect(many.outerRate).toBeCloseTo(33.333, 2);
  });

  it('Tipps: Mitte vor Rand vor außen vor gut', () => {
    const base = { trials: 16, edgeRate: 90, centerRate: 95, innerRate: 95, outerRate: 90 };
    expect(tipFor(base)).toBe('great');
    expect(tipFor({ ...base, centerRate: 50 })).toBe('center');
    expect(tipFor({ ...base, centerRate: 50, edgeRate: 20 })).toBe('center');
    expect(tipFor({ ...base, edgeRate: 40 })).toBe('edge');
    expect(tipFor({ ...base, innerRate: 100, outerRate: 60 })).toBe('far');
    expect(tipFor({ ...base, innerRate: NaN, outerRate: NaN })).toBe('great');
    expect(tipFor({ ...base, trials: 3, centerRate: 0 })).toBe('great');
  });

  it('Punkte', () => {
    expect(pointsFor(1, true, true)).toBe(15);
    expect(pointsFor(1, true, false)).toBe(10);
    expect(pointsFor(1, false, true)).toBe(5);
    expect(pointsFor(1, false, false)).toBe(0);
    expect(pointsFor(5, true, true)).toBe(23);
    expect(pointsFor(99, true, false)).toBe(pointsFor(MAX_LEVEL, true, false));
  });
});
