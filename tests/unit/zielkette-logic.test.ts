import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  buildChain,
  chainLimitMs,
  chainSuccess,
  computeStats,
  hitRadiusPx,
  lengthFor,
  levelOf,
  MAX_LEVEL,
  MAX_WRONG_OK,
  minStepU,
  nextIndex,
  perTargetMs,
  pointsFor,
  radiusPx,
  radiusU,
  tipFor,
} from '../../src/exercises/zielkette/logic';

describe('zielkette: Stufenfunktionen', () => {
  it('Kettenlänge 4 → 8, Größe sinkt, Abstand steigt, Zeit je Ziel sinkt', () => {
    expect(lengthFor(1)).toBe(4);
    expect(lengthFor(MAX_LEVEL)).toBe(8);
    for (let l = 2; l <= MAX_LEVEL; l++) {
      expect(lengthFor(l)).toBeGreaterThanOrEqual(lengthFor(l - 1));
      expect(radiusU(l)).toBeLessThanOrEqual(radiusU(l - 1));
      expect(minStepU(l)).toBeGreaterThan(minStepU(l - 1));
      expect(perTargetMs(l)).toBeLessThanOrEqual(perTargetMs(l - 1));
    }
    expect(levelOf(2.9)).toBe(2);
    expect(levelOf(-1)).toBe(1);
    expect(levelOf(99)).toBe(MAX_LEVEL);
  });

  it('Kettenlänge liegt immer zwischen 4 und 8', () => {
    for (let l = -3; l <= 40; l++) {
      expect(lengthFor(l)).toBeGreaterThanOrEqual(4);
      expect(lengthFor(l)).toBeLessThanOrEqual(8);
    }
  });

  it('Zeitmarke wächst mit der Länge und lässt mindestens 0,7 s je Ziel', () => {
    expect(chainLimitMs(1)).toBe(4 * 1700 + 1200);
    for (let l = 1; l <= MAX_LEVEL; l++) {
      expect(perTargetMs(l)).toBeGreaterThanOrEqual(700);
      expect(chainLimitMs(l)).toBeGreaterThan(lengthFor(l) * 700);
    }
  });

  it('Radius nie unter 20 px, Trefferfläche nie unter 28 px', () => {
    expect(radiusPx(MAX_LEVEL, 2)).toBe(20);
    expect(hitRadiusPx(20)).toBe(28);
    expect(hitRadiusPx(50)).toBe(58);
  });
});

describe('zielkette: Anordnung', () => {
  const fw = 1100;
  const fh = 560;

  it('Kette hat die gewünschte Länge, bleibt im Feld und hält Abstände (auf großem Feld)', () => {
    const rng = createRng(17);
    for (const l of [1, 4, 7, 10, 13, 15]) {
      for (let rep = 0; rep < 40; rep++) {
        const r = radiusPx(l, 7.7);
        const k = lengthFor(l);
        const pts = buildChain(rng, fw, fh, k, r * 1.3, r * 2.6, minStepU(l) * 7.7, null, 0);
        expect(pts.length).toBe(k);
        for (const p of pts) {
          expect(p.x).toBeGreaterThanOrEqual(r * 1.3 - 1e-6);
          expect(p.x).toBeLessThanOrEqual(fw - r * 1.3 + 1e-6);
          expect(p.y).toBeGreaterThanOrEqual(r * 1.3 - 1e-6);
          expect(p.y).toBeLessThanOrEqual(fh - r * 1.3 + 1e-6);
        }
        for (let i = 0; i < k; i++)
          for (let j = i + 1; j < k; j++) expect(Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)).toBeGreaterThanOrEqual(r * 2 + 4);
      }
    }
  });

  it('aufeinanderfolgende Ziele liegen mindestens den Mindestabstand auseinander', () => {
    const rng = createRng(4);
    let ok = 0;
    let total = 0;
    for (let rep = 0; rep < 100; rep++) {
      const pts = buildChain(rng, fw, fh, 6, 30, 60, 160, null, 0);
      for (let i = 1; i < pts.length; i++) {
        total++;
        if (Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y) >= 160 - 1e-6) ok++;
      }
    }
    expect(ok / total).toBeGreaterThan(0.98);
  });

  it('erstes Ziel hält Abstand zum zuletzt getippten Punkt', () => {
    const rng = createRng(8);
    const avoid = { x: 550, y: 280 };
    for (let rep = 0; rep < 100; rep++) {
      const pts = buildChain(rng, fw, fh, 5, 30, 60, 100, avoid, 220);
      expect(Math.hypot(pts[0].x - avoid.x, pts[0].y - avoid.y)).toBeGreaterThanOrEqual(215);
    }
  });

  it('jede Runde eine neue Anordnung (keine Wiederholung)', () => {
    const rng = createRng(1);
    const seen = new Set<string>();
    for (let i = 0; i < 30; i++) {
      const pts = buildChain(rng, fw, fh, 5, 30, 60, 100, null, 0);
      seen.add(pts.map((p) => `${Math.round(p.x)},${Math.round(p.y)}`).join(';'));
    }
    expect(seen.size).toBe(30);
  });

  it('kommt mit winzigem Feld klar (kein NaN, Länge bleibt)', () => {
    const rng = createRng(2);
    const pts = buildChain(rng, 40, 30, 8, 50, 100, 200, { x: 20, y: 15 }, 500);
    expect(pts.length).toBe(8);
    for (const p of pts) expect(Number.isFinite(p.x) && Number.isFinite(p.y)).toBe(true);
    const z = buildChain(rng, 0, 0, 4, 50, 100, 200, null, 0);
    expect(z.length).toBe(4);
  });
});

describe('zielkette: Ablauf und Wertung', () => {
  it('nächstes Ziel: nur der Index nach den getippten', () => {
    expect(nextIndex(0, 5)).toBe(0);
    expect(nextIndex(4, 5)).toBe(4);
    expect(nextIndex(5, 5)).toBe(-1);
    expect(nextIndex(-1, 5)).toBe(-1);
  });

  it('Kette gelungen: vollständig, rechtzeitig, höchstens ein Fehltipp', () => {
    expect(chainSuccess(true, false, 0)).toBe(true);
    expect(chainSuccess(true, false, MAX_WRONG_OK)).toBe(true);
    expect(chainSuccess(true, false, MAX_WRONG_OK + 1)).toBe(false);
    expect(chainSuccess(true, true, 0)).toBe(false);
    expect(chainSuccess(false, false, 0)).toBe(false);
  });

  it('Punkte: länger und ohne Fehler ist mehr', () => {
    expect(pointsFor(1, 8, 0)).toBeGreaterThan(pointsFor(1, 4, 0));
    expect(pointsFor(1, 5, 0)).toBe(pointsFor(1, 5, 2) + 5);
    expect(pointsFor(9, 5, 0)).toBeGreaterThan(pointsFor(1, 5, 0));
  });

  it('Auswertung: Median der Kettenzeiten, NaN ohne Kette', () => {
    const s = computeStats([3000, 4000, 3500], 1, 2);
    expect(s.medianMs).toBe(3500);
    expect(s.chains).toBe(3);
    expect(Number.isNaN(computeStats([], 2, 0).medianMs)).toBe(true);
  });

  it('Tipp-Schlüssel', () => {
    expect(tipFor(computeStats([3000], 4, 1))).toBe('late');
    expect(tipFor(computeStats([3000], 0, 6))).toBe('wrong');
    expect(tipFor(computeStats([3000], 1, 1))).toBe('great');
  });
});
