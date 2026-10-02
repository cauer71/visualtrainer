// EYE-EXPERIMENT: Ridge-Regression und Kalibrierung – bekannte Abbildung muss wiedergefunden werden.
import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  CALIBRATION_POINTS,
  CHECK_POINTS,
  fitGazeModel,
  isGazeModel,
  isStale,
  median,
  predictGaze,
  summarizePoint,
  toPx,
  type CalibrationPoint,
} from '../../src/eye/calibration';
import { FEATURE_NAMES, featureIndex } from '../../src/eye/features';
import { expandPoly, fitRidge, looErrors, predictRidge, solve } from '../../src/eye/ridge';
import { synthFeatures } from '../../src/eye/synthetic';

const VP = { w: 1180, h: 820 };

describe('Ridge-Regression', () => {
  it('löst lineare Gleichungssysteme und meldet singuläre Matrizen', () => {
    const x = solve(
      [
        [2, 1],
        [1, 3],
      ],
      [[3], [5]],
    );
    expect(x[0][0]).toBeCloseTo(0.8, 9);
    expect(x[1][0]).toBeCloseTo(1.4, 9);
    expect(() =>
      solve(
        [
          [1, 2],
          [2, 4],
        ],
        [[1], [2]],
      ),
    ).toThrow();
  });

  it('findet eine bekannte lineare Abbildung (kleines λ) wieder', () => {
    const rng = createRng(3);
    const X = Array.from({ length: 30 }, () => [rng.range(-1, 1), rng.range(-1, 1), rng.range(-1, 1)]);
    const Y = X.map((x) => [3 * x[0] - 2 * x[1] + 0.5 * x[2] + 7, -x[0] + 4 * x[1] - 1]);
    const m = fitRidge(X, Y, 1e-6);
    for (const x of [[0.3, -0.2, 0.9], [-0.7, 0.5, 0.1]]) {
      const p = predictRidge(m, x);
      expect(p[0]).toBeCloseTo(3 * x[0] - 2 * x[1] + 0.5 * x[2] + 7, 3);
      expect(p[1]).toBeCloseTo(-x[0] + 4 * x[1] - 1, 3);
    }
  });

  it('großes λ schrumpft die Steigung (Achsenabschnitt bleibt unbestraft)', () => {
    const X = [[-1], [0], [1], [2]];
    const Y = X.map((x) => [10 + 2 * x[0]]);
    const small = predictRidge(fitRidge(X, Y, 1e-6), [2]);
    const big = predictRidge(fitRidge(X, Y, 1e4), [2]);
    expect(small[0]).toBeCloseTo(14, 3);
    expect(Math.abs(big[0] - 11)).toBeLessThan(Math.abs(small[0] - 11)); // zum Mittelwert (11) hin gezogen
    expect(big[0]).toBeCloseTo(11, 0);
  });

  it('Polynom-Erweiterung: Grad 2 hat n + n(n+1)/2 Spalten', () => {
    expect(expandPoly([1, 2, 3], 1)).toEqual([1, 2, 3]);
    expect(expandPoly([2, 3], 2)).toEqual([2, 3, 4, 6, 9]);
    expect(expandPoly([1, 2, 3, 4], 2)).toHaveLength(4 + 10);
  });

  it('Leave-one-out über die Hat-Matrix stimmt mit echtem Auslassen überein', () => {
    const rng = createRng(11);
    const X = Array.from({ length: 12 }, () => [rng.range(-1, 1), rng.range(-1, 1)]);
    const Y = X.map((x) => [2 * x[0] + x[1] ** 2 + 0.1 * rng.normal(), x[0] - x[1] + 0.1 * rng.normal()]);
    const lambda = 0.5;
    const fast = looErrors(X, Y, lambda);
    for (let i = 0; i < X.length; i++) {
      const Xs = X.filter((_, j) => j !== i);
      const Ys = Y.filter((_, j) => j !== i);
      const p = predictRidge(fitRidge(Xs, Ys, lambda), X[i]);
      const brute = Math.hypot(p[0] - Y[i][0], p[1] - Y[i][1]);
      // Standardisierung wird bei der Hat-Matrix-Formel über alle Daten geschätzt → kleine Abweichung erlaubt
      expect(fast[i]).toBeCloseTo(brute, 1);
    }
  });
});

describe('Kalibrierung', () => {
  const noiseless = () => 0;

  /** Median-Merkmale je Kalibrierpunkt (wie nach den 0,8 s Sammelzeit), optional mit Rauschen je Bild. */
  function calibrationData(normal: () => number, frames = 24, noise = { h: 0.003, v: 0.004 }): CalibrationPoint[] {
    return CALIBRATION_POINTS.map((p) => {
      const rows = Array.from({ length: frames }, () => synthFeatures(p, normal, noise));
      const feat = FEATURE_NAMES.map((_, j) => median(rows.map((r) => r[j])));
      return { target: toPx(p, VP), feat };
    });
  }

  it('9 Kalibrierpunkte inkl. der vier Ecken, 9 Kontrollpunkte versetzt dazu', () => {
    expect(CALIBRATION_POINTS).toHaveLength(9);
    const xs = new Set(CALIBRATION_POINTS.map((p) => p.x.toFixed(3)));
    const ys = new Set(CALIBRATION_POINTS.map((p) => p.y.toFixed(3)));
    expect(xs.size).toBe(3);
    expect(ys.size).toBe(3);
    const corners = CALIBRATION_POINTS.filter((p) => (p.x < 0.2 || p.x > 0.8) && (p.y < 0.2 || p.y > 0.8));
    expect(corners).toHaveLength(4);
    expect(CHECK_POINTS).toHaveLength(9);
    for (const c of CHECK_POINTS) for (const p of CALIBRATION_POINTS) expect(Math.hypot(c.x - p.x, c.y - p.y)).toBeGreaterThan(0.03);
  });

  it('findet bei rauschfreien Daten die bekannte Abbildung (Fehler an Kontrollpunkten < 2 px)', () => {
    const fit = fitGazeModel(calibrationData(noiseless, 1), VP);
    expect(fit.ok).toBe(true);
    if (!fit.ok) return;
    for (const c of CHECK_POINTS) {
      const g = predictGaze(fit.model, synthFeatures(c, noiseless));
      expect(Math.hypot((g.x - c.x) * VP.w, (g.y - c.y) * VP.h)).toBeLessThan(2);
    }
    expect(fit.model.loo.meanPx).toBeLessThan(3);
  });

  it('mit Bildrauschen bleibt der Fehler klein (Median über Bilder, Kontrollpunkte < 25 px)', () => {
    const rng = createRng(5);
    const fit = fitGazeModel(calibrationData(() => rng.normal()), VP);
    expect(fit.ok).toBe(true);
    if (!fit.ok) return;
    const errs = CHECK_POINTS.map((c) => {
      const g = predictGaze(fit.model, synthFeatures(c, noiseless));
      return Math.hypot((g.x - c.x) * VP.w, (g.y - c.y) * VP.h);
    });
    expect(Math.max(...errs)).toBeLessThan(25);
  });

  it('wählt bei leicht gekrümmter Abbildung (ohne Lid-Hinweis) ein quadratisches Modell und trifft Kontrollpunkte', () => {
    // Merkmale hängen leicht quadratisch vom Blickort ab (Kissenverzerrung); die Lidspalte verrät hier nichts
    const curved = (p: { x: number; y: number }) => {
      const f = synthFeatures(p, noiseless);
      const dx = p.x - 0.5;
      const dy = p.y - 0.5;
      f[featureIndex('hAvg')] += 0.1 * dx * dx * Math.sign(dx);
      f[featureIndex('vAvg')] += 0.08 * dy * dy * Math.sign(dy) + 0.06 * dx * dy;
      f[featureIndex('openAvg')] = 0.3;
      return f;
    };
    const pts: CalibrationPoint[] = CALIBRATION_POINTS.map((p) => ({ target: toPx(p, VP), feat: curved(p) }));
    const fit = fitGazeModel(pts, VP);
    expect(fit.ok).toBe(true);
    if (!fit.ok) return;
    expect(fit.model.degree).toBe(2);
    const linearBest = Math.min(...fit.tried.filter((t) => t.specId === 'auge' || t.specId === 'auge-kopf').map((t) => t.meanPx));
    expect(fit.model.loo.meanPx).toBeLessThan(linearBest);
    for (const c of CHECK_POINTS) {
      const g = predictGaze(fit.model, curved(c));
      expect(Math.hypot((g.x - c.x) * VP.w, (g.y - c.y) * VP.h)).toBeLessThan(60);
    }
  });

  it('Kalibrierung auf anderer Fenstergröße: Vorhersage bleibt in Bruchteilen gültig', () => {
    const fit = fitGazeModel(calibrationData(noiseless, 1), VP);
    if (!fit.ok) throw new Error('Anpassung fehlgeschlagen');
    const g = predictGaze(fit.model, synthFeatures({ x: 0.25, y: 0.75 }, noiseless));
    expect(g.x).toBeCloseTo(0.25, 2);
    expect(g.y).toBeCloseTo(0.75, 2);
  });

  it('erkennt „keine Augenbewegung“ (alle Merkmale gleich) und „zu wenige Punkte“', () => {
    const still = synthFeatures({ x: 0.5, y: 0.5 }, noiseless);
    const pts: CalibrationPoint[] = CALIBRATION_POINTS.map((p) => ({ target: toPx(p, VP), feat: still }));
    const r = fitGazeModel(pts, VP);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toBe('no-movement');
    const few = fitGazeModel(calibrationData(noiseless, 1).slice(0, 4), VP);
    expect(few.ok).toBe(false);
    if (!few.ok) expect(few.reason).toBe('too-few-points');
  });

  it('kommt mit 7 von 9 Punkten (zwei ausgefallen) noch zurecht', () => {
    const fit = fitGazeModel(calibrationData(noiseless, 1).filter((_, i) => i !== 2 && i !== 6), VP);
    expect(fit.ok).toBe(true);
  });

  it('Median je Punkt: verwirft die ersten 400 ms, ist robust gegen Ausreißer, verlangt Mindestzahl Bilder', () => {
    const frames = Array.from({ length: 40 }, (_, i) => ({ t: 1000 + i * 33, f: [i < 12 ? 100 : 1, 5] }));
    frames[20].f[0] = 50; // Ausreißer
    const s = summarizePoint(frames, 1000, 400, 8)!;
    expect(s.feat[0]).toBe(1);
    expect(s.feat[1]).toBe(5);
    expect(s.n).toBe(40 - 13); // t − t0 ≥ 400 → ab Index 13 (13·33 = 429 ms)
    expect(summarizePoint(frames.slice(0, 20), 1000, 400, 8)).toBeNull();
    expect(summarizePoint(frames.slice(0, 16), 1000, 400)).toBeNull(); // Standard: mindestens 5 Bilder nach dem Verwerfen
    expect(summarizePoint(frames.slice(0, 19), 1000, 400)).not.toBeNull();
    expect(median([3, 1, 2])).toBe(2);
    expect(median([4, 1, 2, 3])).toBe(2.5);
  });

  it('Modell lässt sich als JSON speichern und wieder prüfen; veraltet bei Drehung oder anderer Größe', () => {
    const fit = fitGazeModel(calibrationData(noiseless, 1), VP);
    if (!fit.ok) throw new Error('Anpassung fehlgeschlagen');
    const back = JSON.parse(JSON.stringify(fit.model));
    expect(isGazeModel(back)).toBe(true);
    const g1 = predictGaze(fit.model, synthFeatures({ x: 0.3, y: 0.6 }, noiseless));
    const g2 = predictGaze(back, synthFeatures({ x: 0.3, y: 0.6 }, noiseless));
    expect(g2).toEqual(g1);
    expect(isGazeModel({ version: 1 })).toBe(false);
    expect(isStale(VP, { w: 1180, h: 820 })).toBe(false);
    expect(isStale(VP, { w: 1180, h: 760 })).toBe(false); // −7 % Höhe (Adressleiste)
    expect(isStale(VP, { w: 820, h: 1180 })).toBe(true); // gedreht
    expect(isStale(VP, { w: 900, h: 820 })).toBe(true); // deutlich schmaler
  });
});
