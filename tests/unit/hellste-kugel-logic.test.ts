import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  BASE_GRAY,
  clusterSizeFor,
  CONTRAST_EASY,
  CONTRAST_HARD,
  contrastFor,
  linearToSrgb,
  MAX_BALLS,
  MAX_LEVEL,
  MIN_BALLS,
  minDistance,
  pickBall,
  pickTargetIndex,
  placeCluster,
  pointsFor,
  probCorrect,
  srgbToLinear,
  targetGray,
  weberContrast,
} from '../../src/exercises/hellste-kugel/logic';

describe('hellste-kugel: Helligkeitsberechnung', () => {
  it('sRGB ↔ Leuchtdichte sind zueinander invers', () => {
    for (const v of [0, 1, 10, 50, 96, 128, 150, 200, 255]) expect(linearToSrgb(srgbToLinear(v))).toBeCloseTo(v, 6);
    expect(srgbToLinear(0)).toBe(0);
    expect(srgbToLinear(255)).toBeCloseTo(1, 10);
    // mittelgrau 118 ≈ 18 % Leuchtdichte (klassisches „Neutralgrau“)
    expect(srgbToLinear(118)).toBeGreaterThan(0.17);
    expect(srgbToLinear(118)).toBeLessThan(0.19);
  });

  it('Weber-Kontrast: Null bei gleichem Grau, positiv bei heller', () => {
    expect(weberContrast(150, 150)).toBe(0);
    expect(weberContrast(150, 160)).toBeGreaterThan(0);
    expect(weberContrast(150, 140)).toBeLessThan(0);
  });

  it('Kontrast je Stufe: 45 % → 3 %, streng fallend', () => {
    expect(contrastFor(1)).toBeCloseTo(CONTRAST_EASY, 10);
    expect(contrastFor(MAX_LEVEL)).toBeCloseTo(CONTRAST_HARD, 10);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(contrastFor(l)).toBeLessThan(contrastFor(l - 1));
    expect(contrastFor(-5)).toBeCloseTo(CONTRAST_EASY, 10);
    expect(contrastFor(99)).toBeCloseTo(CONTRAST_HARD, 10);
  });

  it('Ziel-Grauwert: immer heller als die anderen, gültiger 8-Bit-Wert, Kontrast nahe am Wunsch', () => {
    let last = 256;
    for (let l = 1; l <= MAX_LEVEL; l++) {
      const c = contrastFor(l);
      const tv = targetGray(BASE_GRAY, c);
      expect(Number.isInteger(tv)).toBe(true);
      expect(tv).toBeGreaterThan(BASE_GRAY);
      expect(tv).toBeLessThanOrEqual(255);
      expect(tv).toBeLessThanOrEqual(last); // schwerere Stufe → nicht heller
      last = tv;
      const got = weberContrast(BASE_GRAY, tv);
      // Rundung auf ganze Grauwerte: höchstens ein Grauwert (≈ 1,6 % Leuchtdichte) Abweichung
      expect(Math.abs(got - c)).toBeLessThan(0.02);
    }
  });

  it('gleiche Stufe → gleicher Grauwert; auch bei winzigem Kontrast ein Grauwert mehr', () => {
    expect(targetGray(BASE_GRAY, 0.3)).toBe(targetGray(BASE_GRAY, 0.3));
    expect(targetGray(BASE_GRAY, 0.0001)).toBe(BASE_GRAY + 1);
    expect(targetGray(254, 0.5)).toBe(255);
  });

  it('Clustergröße 6 → 16', () => {
    expect(clusterSizeFor(1)).toBe(MIN_BALLS);
    expect(clusterSizeFor(MAX_LEVEL)).toBe(MAX_BALLS);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(clusterSizeFor(l)).toBeGreaterThanOrEqual(clusterSizeFor(l - 1));
  });

  it('Punkte und simulierte Trefferwahrscheinlichkeit', () => {
    expect(pointsFor(1)).toBe(10);
    expect(pointsFor(5)).toBe(22);
    expect(probCorrect(0.45, 6)).toBeGreaterThan(0.99);
    expect(probCorrect(0, 8)).toBeCloseTo(1 / 8, 10);
    expect(probCorrect(0.03, 16)).toBeLessThan(probCorrect(0.3, 16));
  });
});

describe('hellste-kugel: Cluster und Treffer', () => {
  const ell = { cx: 500, cy: 400, ax: 300, ay: 240 };

  it('platziert genau n Kugeln in der Ellipse mit Mindestabstand', () => {
    const rng = createRng(11);
    for (const n of [6, 10, 16]) {
      for (let k = 0; k < 20; k++) {
        const { points, dmin } = placeCluster(() => rng.next(), n, ell, 70);
        expect(points.length).toBe(n);
        expect(dmin).toBeGreaterThan(0);
        expect(minDistance(points)).toBeGreaterThanOrEqual(dmin - 1e-9);
        for (const p of points) expect(((p.x - ell.cx) / ell.ax) ** 2 + ((p.y - ell.cy) / ell.ay) ** 2).toBeLessThanOrEqual(1 + 1e-9);
      }
    }
  });

  it('liefert auch bei zu wenig Platz n Punkte (Abstand schrumpft)', () => {
    const rng = createRng(5);
    const tiny = { cx: 100, cy: 100, ax: 40, ay: 30 };
    const { points, dmin } = placeCluster(() => rng.next(), 16, tiny, 120);
    expect(points.length).toBe(16);
    expect(dmin).toBeLessThan(120);
    for (const p of points) expect(((p.x - 100) / 40) ** 2 + ((p.y - 100) / 30) ** 2).toBeLessThanOrEqual(1 + 1e-9);
  });

  it('Zielposition: alle Kugeln kommen vor, Abstand zum letzten Ziel wird bevorzugt', () => {
    const rng = createRng(2);
    const { points } = placeCluster(() => rng.next(), 12, ell, 70);
    const seen = new Set<number>();
    for (let i = 0; i < 400; i++) seen.add(pickTargetIndex(() => rng.next(), points, null, 0));
    expect(seen.size).toBe(points.length);
    const last = points[0];
    for (let i = 0; i < 100; i++) {
      const idx = pickTargetIndex(() => rng.next(), points, last, 150);
      expect(Math.hypot(points[idx].x - last.x, points[idx].y - last.y)).toBeGreaterThanOrEqual(150);
    }
    // nichts weit genug weg → trotzdem ein gültiger Index
    const idx = pickTargetIndex(() => 0.999, points, last, 1e6);
    expect(idx).toBeGreaterThanOrEqual(0);
    expect(idx).toBeLessThan(points.length);
  });

  it('pickBall wählt die nächste Kugel im Trefferradius', () => {
    const pts = [
      { x: 0, y: 0 },
      { x: 60, y: 0 },
    ];
    expect(pickBall(pts, 5, 5, 30)).toBe(0);
    expect(pickBall(pts, 50, 0, 30)).toBe(1);
    expect(pickBall(pts, 30, 0, 30)).toBe(0); // gleich weit → erste
    expect(pickBall(pts, 200, 200, 30)).toBe(-1);
    expect(pickBall([], 0, 0, 30)).toBe(-1);
  });
});
