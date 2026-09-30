import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  classOfDistance,
  computeStats,
  DIST_RANGE,
  diagonal,
  type DistClass,
  levelOf,
  lifeMs,
  MAX_LEVEL,
  MIN_LIFE_MS,
  pickDistClass,
  pickTarget,
  playArea,
  pointsFor,
  radiusU,
  tipFor,
} from '../../src/exercises/flick-ziele/logic';

describe('flick-ziele: Stufenfunktionen', () => {
  it('Sichtzeit sinkt mit der Stufe, bleibt aber über dem weichen Ein-/Ausblenden', () => {
    expect(lifeMs(1)).toBe(1700);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(lifeMs(l)).toBeLessThanOrEqual(lifeMs(l - 1));
    expect(lifeMs(MAX_LEVEL)).toBe(MIN_LIFE_MS);
    expect(MIN_LIFE_MS).toBeGreaterThanOrEqual(2 * 130 + 160);
    expect(lifeMs(-3)).toBe(lifeMs(1));
    expect(lifeMs(99)).toBe(lifeMs(MAX_LEVEL));
    expect(levelOf(4.9)).toBe(4);
  });

  it('Zielradius schrumpft mit der Stufe, nie unter 3,6 u', () => {
    expect(radiusU(1)).toBeCloseTo(7.5);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(radiusU(l)).toBeLessThanOrEqual(radiusU(l - 1));
    expect(radiusU(MAX_LEVEL)).toBeGreaterThanOrEqual(3.6);
    expect(radiusU(MAX_LEVEL)).toBeLessThan(4);
  });
});

describe('flick-ziele: Abstandsklassen und Orte', () => {
  it('nie dreimal dieselbe Klasse hintereinander, alle Klassen kommen vor', () => {
    const rng = createRng(5);
    const hist: DistClass[] = [];
    for (let i = 0; i < 600; i++) {
      const c = pickDistClass(rng, hist);
      const n = hist.length;
      if (n >= 2) expect(hist[n - 1] === hist[n - 2] && hist[n - 1] === c).toBe(false);
      hist.push(c);
    }
    for (const c of ['near', 'mid', 'far'] as const) expect(hist.filter((x) => x === c).length).toBeGreaterThan(120);
  });

  it('Zielort liegt im Feld und hat den gewünschten Abstand zum letzten Ziel', () => {
    const rng = createRng(77);
    const area = playArea(1000, 700, 60);
    const diag = diagonal(area);
    for (const cls of ['near', 'mid', 'far'] as const) {
      // von der Mitte sind weite Wege (> 50 % der Diagonale) unmöglich, also von der Ecke starten
      const last = cls === 'far' ? { x: 60, y: 60 } : { x: 500, y: 350 };
      let inClass = 0;
      for (let i = 0; i < 200; i++) {
        const p = pickTarget(rng, area, last, cls);
        expect(p.x).toBeGreaterThanOrEqual(area.minX);
        expect(p.x).toBeLessThanOrEqual(area.maxX);
        expect(p.y).toBeGreaterThanOrEqual(area.minY);
        expect(p.y).toBeLessThanOrEqual(area.maxY);
        expect(p.dist).toBeCloseTo(Math.hypot(p.x - last.x, p.y - last.y), 6);
        const f = p.dist / diag;
        if (f >= DIST_RANGE[cls][0] && f <= DIST_RANGE[cls][1]) inClass++;
      }
      expect(inClass).toBeGreaterThan(150);
    }
  });

  it('weite Ziele liegen ausgehend von einer Ecke weit entfernt, Randfall ohne Absturz', () => {
    const rng = createRng(3);
    const area = playArea(1000, 700, 60);
    const far = pickTarget(rng, area, { x: 60, y: 60 }, 'far');
    expect(far.dist).toBeGreaterThan(0.45 * diagonal(area));
    // winziges Feld: liefert trotzdem einen Punkt
    const tiny = playArea(10, 10, 60);
    const p = pickTarget(rng, tiny, { x: 61, y: 61 }, 'far');
    expect(Number.isFinite(p.x) && Number.isFinite(p.y)).toBe(true);
  });

  it('classOfDistance ordnet nach Anteil der Diagonale', () => {
    expect(classOfDistance(10, 100)).toBe('near');
    expect(classOfDistance(40, 100)).toBe('mid');
    expect(classOfDistance(70, 100)).toBe('far');
    expect(classOfDistance(5, 0)).toBe('near');
  });
});

describe('flick-ziele: Wertung', () => {
  it('computeStats nimmt Median, Trefferquote und Gruppen erst ab genug Werten', () => {
    const s = computeStats(
      [
        { ms: 400, cls: 'near' },
        { ms: 420, cls: 'near' },
        { ms: 440, cls: 'near' },
        { ms: 900, cls: 'far' },
        { ms: 950, cls: 'far' },
      ],
      1,
      0,
    );
    expect(s.medianMs).toBe(440);
    expect(s.medianNear).toBe(420);
    expect(Number.isNaN(s.medianFar)).toBe(true);
    expect(s.accuracy).toBeCloseTo((100 * 5) / 6);
    const empty = computeStats([], 0, 0);
    expect(empty.accuracy).toBe(0);
    expect(Number.isNaN(empty.medianMs)).toBe(true);
  });

  it('Tipps und Punkte', () => {
    const base = { medianMs: 500, medianNear: NaN, medianFar: NaN, hits: 10, wrong: 0, missed: 0, accuracy: 100 };
    expect(tipFor({ ...base, wrong: 4 })).toBe('wrong');
    expect(tipFor({ ...base, missed: 3 })).toBe('slow');
    expect(tipFor({ ...base, medianNear: 400, medianFar: 800 })).toBe('far');
    expect(tipFor(base)).toBe('great');
    expect(pointsFor(1, 0, 1000)).toBe(20);
    expect(pointsFor(5, 2000, 1000)).toBe(18);
  });
});
