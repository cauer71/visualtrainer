// EYE-EXPERIMENT: Genauigkeitsstatistik (Perzentile, Grad-Umrechnung, Heatmap, Jitter), Viertel-Test-Zähler, Übergangszeit.
import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  degToPx,
  guessDiagonalInch,
  heatmapGrid,
  jitterStats,
  mean,
  median,
  percentile,
  pointAccuracy,
  pxToDeg,
  screenGeometry,
  std,
  summarizeAccuracy,
  verdictFor,
} from '../../src/eye/accuracy';
import { CHECK_POINTS, toPx } from '../../src/eye/calibration';
import { dominantQuadrant, makeSequence, QuadrantTestCounter, spreadStats, transitionTime } from '../../src/eye/quarterTest';
import type { Quadrant } from '../../src/eye/types';

const VP = { w: 1180, h: 820 };

describe('Statistik', () => {
  it('Mittel, Median, Standardabweichung', () => {
    expect(mean([1, 2, 3, 4])).toBe(2.5);
    expect(median([5, 1, 3])).toBe(3);
    expect(std([2, 4, 4, 4, 5, 5, 7, 9])).toBe(2);
    expect(mean([])).toBeNaN();
  });

  it('Perzentile mit linearer Interpolation', () => {
    expect(percentile([1, 2, 3, 4, 5], 0)).toBe(1);
    expect(percentile([1, 2, 3, 4, 5], 50)).toBe(3);
    expect(percentile([1, 2, 3, 4, 5], 95)).toBeCloseTo(4.8, 9);
    expect(percentile([5, 4, 3, 2, 1], 100)).toBe(5);
    expect(percentile([7], 95)).toBe(7);
    const hundred = Array.from({ length: 100 }, (_, i) => i + 1);
    expect(percentile(hundred, 95)).toBeCloseTo(95.05, 9);
    expect(percentile([], 95)).toBeNaN();
  });
});

describe('Bildschirmgröße und Grad', () => {
  it('Diagonale aus Eingabe: Pixelgröße und Seitenverhältnis stimmen', () => {
    const g = screenGeometry(VP, 10.9);
    expect(g.source).toBe('diagonal-input');
    expect(Math.hypot(g.widthMm, g.heightMm)).toBeCloseTo(10.9 * 25.4, 6);
    expect(g.widthMm / g.heightMm).toBeCloseTo(VP.w / VP.h, 9);
  });

  it('ohne Eingabe wird nach Fenstergröße geraten (Tablet ≈ 10,5″, Handy ≈ 6″) und als Annahme markiert', () => {
    expect(guessDiagonalInch(VP)).toBe(10.5);
    expect(screenGeometry(VP).source).toBe('tablet-guess');
    expect(screenGeometry({ w: 390, h: 844 }).source).toBe('phone-guess');
    expect(screenGeometry({ w: 390, h: 844 }).diagonalInch).toBe(6);
    expect(screenGeometry(VP, 1).source).toBe('tablet-guess'); // unsinnige Eingabe wird ignoriert
  });

  it('Pixel → Grad: bekannter Fall und Umkehrung', () => {
    const g = screenGeometry(VP, 10.9);
    const px = 100;
    const mm = px * g.mmPerPx;
    expect(pxToDeg(px, g, 45)).toBeCloseTo((Math.atan(mm / 450) * 180) / Math.PI, 9);
    expect(pxToDeg(0, g, 45)).toBe(0);
    expect(pxToDeg(px, g, 70)).toBeLessThan(pxToDeg(px, g, 30)); // weiter weg = kleinerer Winkel
    expect(degToPx(pxToDeg(137, g, 45), g, 45)).toBeCloseTo(137, 6);
    // 1° bei 45 cm ≈ 7,86 mm
    expect(degToPx(1, g, 45) * g.mmPerPx).toBeCloseTo(450 * Math.tan(Math.PI / 180), 6);
  });
});

describe('Genauigkeitsprüfung', () => {
  const geo = screenGeometry(VP, 10.9);

  it('Punktgenauigkeit: Versatz (bias) und Streuung getrennt', () => {
    const target = { x: 100, y: 100 };
    const samples = [-3, 3, -3, 3, -3, 3].map((dx) => ({ x: 130 + dx, y: 100 })); // Mitte bei x = 130
    const a = pointAccuracy({ target, samples });
    expect(a.biasPx).toBeCloseTo(30, 9);
    expect(a.spreadPx).toBeCloseTo(0, 9); // alle gleich weit vom Median (Median = 130 → Abstand 3)
    expect(a.meanPx).toBeCloseTo(30, 6);
    expect(pointAccuracy({ target, samples: [] }).n).toBe(0);
  });

  it('Gesamtsummen: bekannte Fehler 10/20/30/40 px → Mittel 25, Median 25, p95 = 38,5', () => {
    const ms = [10, 20, 30, 40].map((e) => ({ target: { x: 500, y: 400 }, samples: [{ x: 500 + e, y: 400 }] }));
    const s = summarizeAccuracy(ms, geo, 45);
    expect(s.n).toBe(4);
    expect(s.meanPx).toBe(25);
    expect(s.medianPx).toBe(25);
    expect(s.p95Px).toBeCloseTo(38.5, 9);
    expect(s.meanDeg).toBeCloseTo(pxToDeg(25, geo, 45), 9);
    expect(s.p95Deg).toBeCloseTo(pxToDeg(38.5, geo, 45), 9);
    expect(s.perPoint).toHaveLength(4);
  });

  it('simulierte Messung mit Versatz und Rauschen liefert plausible Werte', () => {
    const rng = createRng(9);
    const ms = CHECK_POINTS.map((p) => {
      const t = toPx(p, VP);
      return { target: t, samples: Array.from({ length: 36 }, () => ({ x: t.x + 20 + 10 * rng.normal(), y: t.y - 10 + 10 * rng.normal() })) };
    });
    const s = summarizeAccuracy(ms, geo, 45);
    expect(s.meanPx).toBeGreaterThan(20);
    expect(s.meanPx).toBeLessThan(35);
    expect(s.p95Px).toBeGreaterThan(s.medianPx);
    expect(s.meanDeg).toBeGreaterThan(0.5);
    expect(s.meanDeg).toBeLessThan(1.5);
  });

  it('Heatmap-Raster: jeder Kontrollpunkt landet in seiner Zelle, leere Zellen = null', () => {
    const acc = CHECK_POINTS.map((p, i) => ({ target: toPx(p, VP), n: 10, biasPx: 0, spreadPx: 0, meanPx: (i + 1) * 10 }));
    const grid = heatmapGrid(acc, VP, 3, 3);
    expect(grid).toHaveLength(3);
    expect(grid[0].map((c) => c.meanPx)).toEqual([10, 20, 30]);
    expect(grid[1].map((c) => c.meanPx)).toEqual([40, 50, 60]);
    expect(grid[2].map((c) => c.meanPx)).toEqual([70, 80, 90]);
    const partial = heatmapGrid(acc.slice(0, 2), VP, 3, 3);
    expect(partial[2][2]).toEqual({ meanPx: null, count: 0 });
    // zwei Punkte in einer Zelle werden gemittelt; Punkt ohne Messwerte zählt nicht
    const two = heatmapGrid(
      [
        { target: { x: 10, y: 10 }, n: 5, biasPx: 0, spreadPx: 0, meanPx: 10 },
        { target: { x: 20, y: 20 }, n: 5, biasPx: 0, spreadPx: 0, meanPx: 30 },
        { target: { x: 30, y: 30 }, n: 0, biasPx: NaN, spreadPx: NaN, meanPx: NaN },
      ],
      VP,
    );
    expect(two[0][0]).toEqual({ meanPx: 20, count: 2 });
  });

  it('Jitter: Standardabweichung je Achse und gesamt, in px und Grad', () => {
    const samples = [-3, 3, -3, 3].map((dx, i) => ({ x: 500 + dx, y: 400 + (i % 2 ? 4 : -4) }));
    const j = jitterStats(samples, geo, 45);
    expect(j.sdXPx).toBeCloseTo(3, 9);
    expect(j.sdYPx).toBeCloseTo(4, 9);
    expect(j.sdPx).toBeCloseTo(5, 9);
    expect(j.sdDeg).toBeCloseTo(pxToDeg(5, geo, 45), 9);
    expect(j.n).toBe(4);
  });

  it('Einschätzung (Faustwert): Bezug = ein Viertel der kürzeren Fensterseite', () => {
    expect(verdictFor(100, 200, VP)).toBe('good'); // ref = 205
    expect(verdictFor(150, 300, VP)).toBe('ok');
    expect(verdictFor(200, 250, VP)).toBe('poor');
    expect(verdictFor(60, 400, VP)).toBe('poor'); // gute Mitte, aber Ausreißer zu groß
    expect(verdictFor(100, 200, { w: 820, h: 1180 })).toBe('good'); // Hochformat: dieselbe kurze Seite
  });
});

describe('Viertel-Test', () => {
  it('Reihenfolge: 20 Aufforderungen, je Ecke 5, nie zweimal dieselbe Ecke hintereinander', () => {
    for (let seed = 1; seed <= 200; seed++) {
      const rng = createRng(seed);
      const seq = makeSequence(20, () => rng.next());
      expect(seq).toHaveLength(20);
      for (const q of ['tl', 'tr', 'bl', 'br'] as Quadrant[]) expect(seq.filter((x) => x === q)).toHaveLength(5);
      for (let i = 1; i < seq.length; i++) expect(seq[i]).not.toBe(seq[i - 1]);
    }
  });

  it('Reihenfolge ist bei gleichem Startwert gleich, bei ungerader Zahl ±1 ausgeglichen', () => {
    const a = createRng(7);
    const b = createRng(7);
    expect(makeSequence(20, () => a.next())).toEqual(makeSequence(20, () => b.next()));
    const r = createRng(8);
    const s = makeSequence(10, () => r.next());
    const counts = ['tl', 'tr', 'bl', 'br'].map((q) => s.filter((x) => x === q).length);
    expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1);
  });

  it('häufigstes Viertel ignoriert Lücken', () => {
    expect(dominantQuadrant(['tl', null, 'tr', 'tr', null])).toBe('tr');
    expect(dominantQuadrant([null, null])).toBeNull();
  });

  it('Zähler: Trefferquote und Ankunftszeit je Ecke, Verwechslungen', () => {
    const c = new QuadrantTestCounter();
    c.add({ target: 'tl', hit: true, arrivalMs: 300, dominant: 'tl' });
    c.add({ target: 'tl', hit: true, arrivalMs: 500, dominant: 'tl' });
    c.add({ target: 'tl', hit: false, arrivalMs: null, dominant: 'tr' });
    c.add({ target: 'br', hit: false, arrivalMs: null, dominant: null });
    const s = c.summary();
    expect(s.total).toMatchObject({ n: 4, hits: 2 });
    expect(s.total.rate).toBe(0.5);
    expect(s.perCorner.tl).toMatchObject({ n: 3, hits: 2, meanArrivalMs: 400, medianArrivalMs: 400 });
    expect(s.perCorner.tl.rate).toBeCloseTo(2 / 3, 9);
    expect(s.perCorner.br).toMatchObject({ n: 1, hits: 0, meanArrivalMs: null });
    expect(s.perCorner.tr.n).toBe(0);
    expect(s.perCorner.tr.rate).toBeNaN();
    expect(s.confusion.tl).toEqual({ tl: 2, tr: 1, bl: 0, br: 0, none: 0 });
    expect(s.confusion.br.none).toBe(1);
  });
});

describe('Übergangszeit der Schätzung', () => {
  const A = { x: 100, y: 100 };
  const B = { x: 1000, y: 100 };
  const DT = 1000 / 30;

  /** Gleichmäßiger Anstieg von A nach B in `rampMs`, davor `holdMs` bei A, danach bei B. */
  function ramp(holdMs: number, rampMs: number, total = 1200) {
    const out = [];
    for (let t = 0; t <= total; t += DT) {
      const s = Math.min(1, Math.max(0, (t - holdMs) / rampMs));
      out.push({ t, x: A.x + s * (B.x - A.x), y: A.y });
    }
    return out;
  }

  it('10 %→90 % einer linearen Rampe dauert 80 % der Rampenzeit (interpoliert)', () => {
    const r = transitionTime(ramp(300, 200), A, B)!;
    expect(r.durationMs).toBeCloseTo(160, 0);
    expect(r.startT).toBeCloseTo(320, 0);
    const slow = transitionTime(ramp(300, 400), A, B)!;
    expect(slow.durationMs).toBeCloseTo(320, 0);
  });

  it('Rauschen vor dem Wechsel verschiebt den Start nicht nach vorn (letzter Zeitpunkt unter 10 %)', () => {
    const s = ramp(300, 200);
    s[3] = { ...s[3], x: A.x + 0.12 * (B.x - A.x) }; // kurzer Ausreißer über 10 %
    const r = transitionTime(s, A, B)!;
    expect(r.durationMs).toBeCloseTo(160, 0);
  });

  it('Rückrichtung (B→A) funktioniert ebenso; unvollständiger Wechsel → null', () => {
    const back = ramp(300, 200).map((p) => ({ ...p, x: B.x - (p.x - A.x) }));
    expect(transitionTime(back, B, A)!.durationMs).toBeCloseTo(160, 0);
    expect(transitionTime(ramp(300, 200, 400).slice(0, 10), A, B)).toBeNull();
    expect(transitionTime([], A, B)).toBeNull();
    expect(transitionTime(ramp(0, 200), A, A)).toBeNull();
  });

  it('Streuungswerte', () => {
    const s = spreadStats([100, 200, 300]);
    expect(s).toMatchObject({ n: 3, mean: 200, median: 200, min: 100, max: 300 });
    expect(s.sd).toBeCloseTo(81.65, 1);
    expect(spreadStats([]).mean).toBeNull();
  });
});
