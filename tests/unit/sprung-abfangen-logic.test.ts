import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  distanceRange,
  gravityFor,
  guideAlphaFor,
  isHit,
  jumpPos,
  landingX,
  LAUNCH_DEG,
  levelOf,
  makeJump,
  makeTrial,
  MAX_DIST_FRAC,
  MAX_LEVEL,
  mean,
  MIN_LEVEL,
  MIN_POWER,
  noisyPower,
  pointsFor,
  powerForDist,
  powerToDist,
  pullToPower,
  signedErrorPct,
  tolerancePct,
} from '../../src/exercises/sprung-abfangen/logic';

describe('sprung-abfangen: Stufenfunktionen', () => {
  it('werden mit der Stufe schwerer', () => {
    for (let l = MIN_LEVEL + 1; l <= MAX_LEVEL; l++) {
      expect(tolerancePct(l)).toBeLessThan(tolerancePct(l - 1));
      expect(guideAlphaFor(l)).toBeLessThanOrEqual(guideAlphaFor(l - 1));
      expect(distanceRange(l).max).toBeGreaterThan(distanceRange(l - 1).max);
      expect(distanceRange(l).min).toBeLessThan(distanceRange(l - 1).min);
    }
  });

  it('Bereiche: Trefferfeld 9 → 3 %, Hilfsmarke ab Stufe 8 aus', () => {
    expect(tolerancePct(MIN_LEVEL)).toBeCloseTo(9);
    expect(tolerancePct(MAX_LEVEL)).toBeCloseTo(3);
    expect(guideAlphaFor(1)).toBe(1);
    expect(guideAlphaFor(8)).toBe(0);
    expect(guideAlphaFor(MAX_LEVEL)).toBe(0);
    expect(distanceRange(MAX_LEVEL).max).toBeLessThan(MAX_DIST_FRAC);
  });

  it('begrenzt Stufen', () => {
    expect(levelOf(-3)).toBe(MIN_LEVEL);
    expect(tolerancePct(99)).toBeCloseTo(tolerancePct(MAX_LEVEL));
  });
});

describe('sprung-abfangen: Wurfparabel', () => {
  it('Landepunkt liegt genau in der Sollweite, Scheitel in der Mitte der Flugzeit', () => {
    const g = gravityFor(8);
    for (const dist of [120, 400, 800]) {
      for (const dir of [1, -1] as const) {
        const j = makeJump(500, 600, dir, dist, g);
        expect(landingX(j)).toBeCloseTo(500 + dir * dist, 6);
        const end = jumpPos(j, j.T);
        expect(end.x).toBeCloseTo(500 + dir * dist, 6);
        expect(end.y).toBeCloseTo(600, 6);
        const mid = jumpPos(j, j.T / 2);
        expect(mid.y).toBeCloseTo(600 - j.H, 6);
        expect(mid.x).toBeCloseTo(500 + (dir * dist) / 2, 6);
      }
    }
  });

  it('Bogenhöhe folgt der festen Abwurfrichtung: H = D·tan(θ)/4', () => {
    const j = makeJump(0, 0, 1, 600, gravityFor(8));
    expect(j.H).toBeCloseTo((600 * Math.tan((LAUNCH_DEG * Math.PI) / 180)) / 4, 4);
  });

  it('Flugzeit wächst mit der Weite und bleibt auf üblichen Bühnen zwischen 0,3 und 2,5 s', () => {
    const g = gravityFor(8);
    const short = makeJump(0, 0, 1, 100, g);
    const far = makeJump(0, 0, 1, 800, g);
    expect(far.T).toBeGreaterThan(short.T);
    expect(short.T).toBeGreaterThan(0.3);
    expect(far.T).toBeLessThan(2.5);
  });

  it('begrenzt die Zeit auf [0, T]', () => {
    const j = makeJump(100, 300, 1, 200, gravityFor(6));
    expect(jumpPos(j, -1)).toEqual({ x: 100, y: 300 });
    expect(jumpPos(j, 99).x).toBeCloseTo(300, 6);
  });

  it('Weite 0 ergibt keinen Flug', () => {
    const j = makeJump(100, 300, 1, 0, gravityFor(6));
    expect(j.T).toBe(0);
    expect(j.H).toBe(0);
  });
});

describe('sprung-abfangen: Kraft und Weite', () => {
  it('Zuglänge → Kraft → Weite und zurück', () => {
    expect(pullToPower(0, 500)).toBe(0);
    expect(pullToPower(250, 500)).toBeCloseTo(0.5);
    expect(pullToPower(900, 500)).toBe(1);
    expect(pullToPower(-40, 500)).toBe(0);
    expect(powerToDist(1, 1000)).toBeCloseTo(MAX_DIST_FRAC * 1000);
    for (const d of [100, 350, 600]) expect(powerToDist(powerForDist(d, 1000), 1000)).toBeCloseTo(d, 6);
    expect(powerForDist(5000, 1000)).toBe(1);
  });

  it('noisyPower bleibt im erlaubten Bereich', () => {
    const rng = createRng(3);
    for (let i = 0; i < 200; i++) {
      const p = noisyPower(0.5, 0.3, rng);
      expect(p).toBeGreaterThan(MIN_POWER);
      expect(p).toBeLessThanOrEqual(1);
    }
  });
});

describe('sprung-abfangen: Wertung', () => {
  it('Fehler mit Vorzeichen in Sprungrichtung: positiv = zu weit', () => {
    expect(signedErrorPct(620, 600, 1, 1000)).toBeCloseTo(2);
    expect(signedErrorPct(580, 600, 1, 1000)).toBeCloseTo(-2);
    // nach links: kleineres x ist weiter
    expect(signedErrorPct(380, 400, -1, 1000)).toBeCloseTo(2);
    expect(signedErrorPct(420, 400, -1, 1000)).toBeCloseTo(-2);
  });

  it('Treffer liegt im Trefferfeld der Stufe', () => {
    expect(isHit(8.9, 1)).toBe(true);
    expect(isHit(9.5, 1)).toBe(false);
    expect(isHit(3.1, MAX_LEVEL)).toBe(false);
    expect(isHit(2.9, MAX_LEVEL)).toBe(true);
  });

  it('Punkte: nur bei Treffer, höher auf höherer Stufe und bei kleinerem Fehler', () => {
    expect(pointsFor(20, 5)).toBe(0);
    expect(pointsFor(0, 1)).toBeGreaterThan(pointsFor(tolerancePct(1), 1));
    expect(pointsFor(1, 10)).toBeGreaterThan(pointsFor(1, 2));
  });

  it('mean: leere Liste ergibt NaN', () => {
    expect(mean([])).toBeNaN();
    expect(mean([1, 3])).toBe(2);
  });
});

describe('sprung-abfangen: Durchgänge', () => {
  const P = { w: 1180, margin: 40 };

  it('Start und Ziel liegen auf der Bühne, die Weite passt zur Stufe', () => {
    const rng = createRng(11);
    for (const level of [1, 6, 13, 20]) {
      const { min, max } = distanceRange(level);
      for (let i = 0; i < 80; i++) {
        const tr = makeTrial({ ...P, level }, rng);
        expect(tr.x0).toBeGreaterThanOrEqual(P.margin - 1e-6);
        expect(tr.x0).toBeLessThanOrEqual(P.w - P.margin + 1e-6);
        expect(tr.targetX).toBeGreaterThanOrEqual(P.margin - 1e-6);
        expect(tr.targetX).toBeLessThanOrEqual(P.w - P.margin + 1e-6);
        expect(tr.targetX).toBeCloseTo(tr.x0 + tr.dir * tr.dist, 6);
        expect(tr.dist).toBeGreaterThanOrEqual(min * P.w - 1e-6);
        expect(tr.dist).toBeLessThanOrEqual(max * P.w + 1e-6);
      }
    }
  });

  it('feste Werte (Film) werden eingehalten und bei Bedarf auf die Bühne geschoben', () => {
    const rng = createRng(1);
    const a = makeTrial({ ...P, level: 1, fixed: { dir: 1, x0: 200, distFrac: 0.4 } }, rng);
    expect(a.x0).toBe(200);
    expect(a.dist).toBeCloseTo(0.4 * P.w);
    const b = makeTrial({ ...P, level: 1, fixed: { dir: -1, x0: 5, distFrac: 0.3 } }, rng);
    expect(b.targetX).toBeGreaterThanOrEqual(P.margin - 1e-6);
  });

  it('gleicher Startwert liefert gleiche Durchgänge (ctx.rng)', () => {
    const a = makeTrial({ ...P, level: 7 }, createRng(5));
    const b = makeTrial({ ...P, level: 7 }, createRng(5));
    expect(a).toEqual(b);
  });

  it('die Richtung wechselt häufiger als sie bleibt', () => {
    const rng = createRng(21);
    let prev: 1 | -1 = 1;
    let changes = 0;
    for (let i = 0; i < 400; i++) {
      const tr = makeTrial({ ...P, level: 5, prevDir: prev }, rng);
      if (tr.dir !== prev) changes++;
      prev = tr.dir;
    }
    expect(changes).toBeGreaterThan(200);
    expect(changes).toBeLessThan(330);
  });
});
