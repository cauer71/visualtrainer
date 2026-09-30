import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  arcHeightFractionFor,
  errorPct,
  flightSecondsFor,
  hiddenFractionFor,
  hideSeconds,
  HIT_TOL_PCT,
  isHit,
  landingPoint,
  levelOf,
  makeThrow,
  MAX_LEVEL,
  meanError,
  MIN_LEVEL,
  noisyTap,
  pointsFor,
  throwPos,
} from '../../src/exercises/landepunkt/logic';

const P = { w: 1180, groundY: 700, topY: 60, margin: 40 };

describe('landepunkt: Stufenfunktionen', () => {
  it('werden mit der Stufe schwerer (mehr Verdeckung, kürzerer Flug, höherer Bogen)', () => {
    for (let l = MIN_LEVEL + 1; l <= MAX_LEVEL; l++) {
      expect(hiddenFractionFor(l)).toBeGreaterThan(hiddenFractionFor(l - 1));
      expect(flightSecondsFor(l)).toBeLessThan(flightSecondsFor(l - 1));
      expect(arcHeightFractionFor(l)).toBeGreaterThan(arcHeightFractionFor(l - 1));
    }
  });

  it('Bereiche: Verdeckung 40–80 %, Flug 1,0–2,4 s, Bogen ≤ 80 %', () => {
    expect(hiddenFractionFor(MIN_LEVEL)).toBeCloseTo(0.4);
    expect(hiddenFractionFor(MAX_LEVEL)).toBeLessThanOrEqual(0.8);
    expect(flightSecondsFor(MIN_LEVEL)).toBeCloseTo(2.4);
    expect(flightSecondsFor(MAX_LEVEL)).toBeGreaterThanOrEqual(1);
    expect(arcHeightFractionFor(MAX_LEVEL)).toBeLessThanOrEqual(0.8);
  });

  it('begrenzt Stufen', () => {
    expect(levelOf(-2)).toBe(MIN_LEVEL);
    expect(hiddenFractionFor(99)).toBe(hiddenFractionFor(MAX_LEVEL));
  });
});

describe('landepunkt: Wurfparabel', () => {
  it('Start und Landung auf Bodenhöhe, Scheitel in der Mitte mit der Bogenhöhe', () => {
    const rng = createRng(1);
    for (const level of [1, 7, 14, 20]) {
      for (let i = 0; i < 40; i++) {
        const th = makeThrow({ ...P, level }, rng);
        const a = throwPos(th, 0);
        const b = throwPos(th, th.T);
        const mid = throwPos(th, th.T / 2);
        expect(a.y).toBeCloseTo(P.groundY, 6);
        expect(b.y).toBeCloseTo(P.groundY, 6);
        expect(a.x).toBeCloseTo(th.x0, 6);
        expect(b.x).toBeCloseTo(th.x0 + th.dir * th.dist, 6);
        expect(mid.y).toBeCloseTo(P.groundY - th.H, 6);
        expect(mid.x).toBeCloseTo((a.x + b.x) / 2, 6);
        // nie über die Decke hinaus
        for (let k = 0; k <= 20; k++) expect(throwPos(th, (th.T * k) / 20).y).toBeGreaterThanOrEqual(P.topY - 1e-6);
      }
    }
  });

  it('ist eine echte Parabel: gleichmäßig in x, konstante Beschleunigung g in y', () => {
    const th = makeThrow({ ...P, level: 5 }, createRng(2));
    const dt = th.T / 10;
    const ys = Array.from({ length: 11 }, (_, i) => throwPos(th, i * dt).y);
    const xs = Array.from({ length: 11 }, (_, i) => throwPos(th, i * dt).x);
    for (let i = 2; i <= 10; i++) {
      const acc = (ys[i] - 2 * ys[i - 1] + ys[i - 2]) / (dt * dt);
      expect(acc).toBeCloseTo(th.g, 4);
      expect(xs[i] - xs[i - 1]).toBeCloseTo(xs[1] - xs[0], 6);
    }
    expect(th.g).toBeCloseTo((8 * th.H) / (th.T * th.T), 9);
    expect(th.vy).toBeCloseTo((th.g * th.T) / 2, 9);
  });

  it('Wurf bleibt auf der Bühne (Start und Landung im Randabstand, beide Richtungen)', () => {
    const rng = createRng(3);
    let left = 0;
    let right = 0;
    for (let i = 0; i < 400; i++) {
      const th = makeThrow({ ...P, level: 1 + (i % 20) }, rng);
      const land = landingPoint(th);
      expect(th.x0).toBeGreaterThanOrEqual(P.margin - 1e-6);
      expect(th.x0).toBeLessThanOrEqual(P.w - P.margin + 1e-6);
      expect(land.x).toBeGreaterThanOrEqual(P.margin - 1e-6);
      expect(land.x).toBeLessThanOrEqual(P.w - P.margin + 1e-6);
      expect(th.dist).toBeGreaterThanOrEqual(0.42 * P.w - 1e-6);
      expect(th.dist).toBeLessThanOrEqual(0.78 * P.w + 1e-6);
      if (th.dir === 1) right++;
      else left++;
    }
    expect(left).toBeGreaterThan(120);
    expect(right).toBeGreaterThan(120);
  });

  it('schmale Bühne (Handy hochkant): Wurfweite passt noch hinein', () => {
    const rng = createRng(4);
    for (let i = 0; i < 100; i++) {
      const th = makeThrow({ w: 360, groundY: 500, topY: 40, margin: 24, level: 10 }, rng);
      const land = landingPoint(th);
      expect(land.x).toBeGreaterThanOrEqual(24 - 1e-6);
      expect(land.x).toBeLessThanOrEqual(336 + 1e-6);
      expect(th.x0).toBeGreaterThanOrEqual(24 - 1e-6);
      expect(th.x0).toBeLessThanOrEqual(336 + 1e-6);
    }
  });

  it('Verdeckung: der verdeckte Teil ist der Stufenanteil der Flugzeit und der Strecke', () => {
    const th = makeThrow({ ...P, level: 10 }, createRng(5));
    const hide = hideSeconds(th);
    expect(hide).toBeCloseTo(th.T * (1 - hiddenFractionFor(10)), 9);
    const xHide = throwPos(th, hide).x;
    const covered = Math.abs(th.x0 + th.dir * th.dist - xHide) / th.dist;
    expect(covered).toBeCloseTo(hiddenFractionFor(10), 9);
  });

  it('feste Werte für den Intro-Film', () => {
    const th = makeThrow({ ...P, level: 3, fixed: { T: 2.3, hidden: 0.5, height: 0.4, dist: 600, dir: -1, x0: 900 } }, createRng(1));
    expect(th.T).toBe(2.3);
    expect(th.hidden).toBe(0.5);
    expect(th.dir).toBe(-1);
    expect(th.x0).toBe(900);
    expect(th.dist).toBe(600);
    expect(th.H).toBeCloseTo(0.4 * (P.groundY - P.topY));
    expect(landingPoint(th).x).toBe(300);
  });

  it('Zeit außerhalb [0, T] bleibt am Start bzw. Landepunkt', () => {
    const th = makeThrow({ ...P, level: 2 }, createRng(6));
    expect(throwPos(th, -1)).toEqual(throwPos(th, 0));
    expect(throwPos(th, th.T + 5)).toEqual(throwPos(th, th.T));
  });

  it('Flugzeit aus vielen kleinen dt-Schritten ist bildratenunabhängig', () => {
    const th = makeThrow({ ...P, level: 8 }, createRng(7));
    const at = (fps: number) => {
      let s = 0;
      for (let i = 0; i < Math.round(th.T * fps * 0.6); i++) s += 1 / fps;
      return throwPos(th, s);
    };
    const a = at(60);
    const b = at(144);
    expect(Math.abs(a.x - b.x)).toBeLessThan(2);
    expect(Math.abs(a.y - b.y)).toBeLessThan(6);
  });
});

describe('landepunkt: Wertung', () => {
  it('Fehler in % der Bühnenbreite', () => {
    expect(errorPct({ x: 100, y: 50 }, { x: 100, y: 50 }, 1000)).toBe(0);
    expect(errorPct({ x: 160, y: 50 }, { x: 100, y: 50 }, 1000)).toBeCloseTo(6);
    expect(errorPct({ x: 130, y: 90 }, { x: 100, y: 50 }, 1000)).toBeCloseTo(5);
    expect(errorPct({ x: 0, y: 0 }, { x: 0, y: 0 }, 0)).toBe(0);
  });

  it('Treffer bis 6 %', () => {
    expect(HIT_TOL_PCT).toBe(6);
    expect(isHit(0)).toBe(true);
    expect(isHit(6)).toBe(true);
    expect(isHit(6.01)).toBe(false);
  });

  it('Punkte: keine beim Fehltreffer, mehr für genaue Treffer und höhere Stufen', () => {
    expect(pointsFor(9, 5)).toBe(0);
    expect(pointsFor(0, 1)).toBe(15);
    expect(pointsFor(6, 1)).toBe(10);
    expect(pointsFor(2, 10)).toBeGreaterThan(pointsFor(2, 3));
    expect(pointsFor(1, 4)).toBeGreaterThan(pointsFor(5, 4));
  });

  it('mittlerer Fehler', () => {
    expect(meanError([2, 4, 6])).toBeCloseTo(4);
    expect(Number.isNaN(meanError([]))).toBe(true);
  });

  it('noisyTap streut um den Landepunkt mit der gewünschten Größenordnung', () => {
    const rng = createRng(8);
    const land = { x: 500, y: 700 };
    const errs = Array.from({ length: 2000 }, () => errorPct(noisyTap(land, 4, 1180, rng), land, 1180));
    const m = meanError(errs);
    expect(m).toBeGreaterThan(2.5);
    expect(m).toBeLessThan(6);
  });
});
