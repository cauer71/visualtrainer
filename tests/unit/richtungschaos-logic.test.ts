import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  drawGapMs,
  exposureFor,
  HeadingDrift,
  holdMsFor,
  levelOf,
  MAX_LEVEL,
  MAX_OMEGA,
  MIN_LEVEL,
  sigmaFor,
  speedFor,
} from '../../src/exercises/richtungschaos/logic';

describe('richtungschaos: Stufenfunktionen (Unregelmäßigkeit)', () => {
  it('werden mit der Stufe schwerer', () => {
    for (let l = MIN_LEVEL + 1; l <= MAX_LEVEL; l++) {
      expect(sigmaFor(l)).toBeGreaterThan(sigmaFor(l - 1));
      expect(holdMsFor(l)).toBeLessThan(holdMsFor(l - 1));
      expect(speedFor(l)).toBeGreaterThan(speedFor(l - 1));
      expect(exposureFor(l)).toBeLessThanOrEqual(exposureFor(l - 1));
    }
  });

  it('Bereiche: ≈ 4° → ≈ 25° je Viertelsekunde, Tempo ≤ 35 u/s, Drehrate unter der Grenze', () => {
    const deg250 = (l: number) => ((sigmaFor(l) * 0.25) / Math.PI) * 180;
    expect(deg250(1)).toBeGreaterThan(3.5);
    expect(deg250(1)).toBeLessThan(5);
    expect(deg250(MAX_LEVEL)).toBeGreaterThan(20);
    expect(deg250(MAX_LEVEL)).toBeLessThan(30);
    expect(speedFor(1)).toBeCloseTo(13);
    expect(speedFor(MAX_LEVEL)).toBeLessThan(35);
    expect(sigmaFor(MAX_LEVEL)).toBeLessThan(MAX_OMEGA);
    expect(holdMsFor(MAX_LEVEL)).toBeGreaterThanOrEqual(500);
    expect(exposureFor(MAX_LEVEL)).toBeGreaterThanOrEqual(320);
  });

  it('engste Kurve ist nie ein Knick: Radius bei höchstem Tempo und höchster Drehrate ≥ 12 u', () => {
    expect(speedFor(MAX_LEVEL) / MAX_OMEGA).toBeGreaterThan(12);
  });

  it('begrenzt Stufen', () => {
    expect(levelOf(0)).toBe(MIN_LEVEL);
    expect(levelOf(99)).toBe(MAX_LEVEL);
    expect(sigmaFor(99)).toBe(sigmaFor(MAX_LEVEL));
  });

  it('Abstand bis zum nächsten Zeichen ist unregelmäßig', () => {
    const rng = createRng(3);
    const v = Array.from({ length: 300 }, () => drawGapMs(rng));
    expect(Math.min(...v)).toBeGreaterThanOrEqual(1300);
    expect(Math.max(...v)).toBeLessThanOrEqual(2300);
    expect(Math.max(...v) - Math.min(...v)).toBeGreaterThan(500);
  });
});

function simulate(level: number, seconds: number, fps: number, seed = 1) {
  const rng = createRng(seed);
  const d = new HeadingDrift();
  const dt = 1000 / fps;
  const omegas: number[] = [];
  for (let t = 0; t < seconds * 1000; t += dt) omegas.push(d.step(dt, level, rng));
  return omegas;
}

describe('HeadingDrift: glatte Zufalls-Drehrate', () => {
  it('bleibt unter der Grenze und die Drehrate springt nie (Änderung je Bild klein)', () => {
    for (const level of [1, 10, MAX_LEVEL]) {
      for (const fps of [60, 120]) {
        const om = simulate(level, 120, fps, 4 + level);
        let worst = 0;
        for (let i = 0; i < om.length; i++) {
          expect(Math.abs(om[i])).toBeLessThanOrEqual(MAX_OMEGA + 1e-9);
          if (i > 0) worst = Math.max(worst, Math.abs(om[i] - om[i - 1]));
        }
        // zweifach gefiltert: Änderung je Bild ≪ Gesamthub (≤ 5,2 rad/s); bei 60 Hz höchstens ≈ 0,2 rad/s
        expect(worst).toBeLessThan(fps === 60 ? 0.2 : 0.11);
      }
    }
  });

  it('Stärke wächst mit der Stufe: Effektivwert folgt der Stufenvorgabe (Filterverlust bis ≈ 30 %)', () => {
    const rms = (xs: number[]) => Math.sqrt(xs.reduce((a, b) => a + b * b, 0) / xs.length);
    const r1 = rms(simulate(1, 600, 60, 9));
    const r10 = rms(simulate(10, 600, 60, 9));
    const r20 = rms(simulate(MAX_LEVEL, 600, 60, 9));
    expect(r10).toBeGreaterThan(r1 * 1.8);
    expect(r20).toBeGreaterThan(r10 * 1.4);
    for (const [level, r] of [
      [1, r1],
      [10, r10],
      [MAX_LEVEL, r20],
    ] as const) {
      expect(r).toBeGreaterThan(sigmaFor(level) * 0.55);
      expect(r).toBeLessThan(sigmaFor(level) * 1.1);
    }
  });

  it('Richtungsänderung je 250 ms auf Stufe 1 ≈ 4° (wie im Original ohne Rand)', () => {
    const om = simulate(1, 600, 60, 12);
    const n = 15; // 250 ms
    const changes: number[] = [];
    for (let i = 0; i + n < om.length; i += n) {
      let s = 0;
      for (let k = 0; k < n; k++) s += om[i + k] / 60;
      changes.push(Math.abs((s / Math.PI) * 180));
    }
    const med = changes.sort((a, b) => a - b)[Math.floor(changes.length / 2)];
    expect(med).toBeGreaterThan(1.5);
    expect(med).toBeLessThan(6);
  });

  it('ist unregelmäßig: Vorzeichen wechselt, keine feste Periode', () => {
    const om = simulate(10, 120, 60, 2);
    let flips = 0;
    for (let i = 1; i < om.length; i++) if (Math.sign(om[i]) !== Math.sign(om[i - 1]) && om[i] !== 0) flips++;
    expect(flips).toBeGreaterThan(10);
    expect(flips).toBeLessThan(200);
    // Abstände der Vorzeichenwechsel streuen
    const gaps: number[] = [];
    let last = 0;
    for (let i = 1; i < om.length; i++)
      if (Math.sign(om[i]) !== Math.sign(om[i - 1]) && om[i] !== 0) {
        gaps.push(i - last);
        last = i;
      }
    expect(Math.max(...gaps) - Math.min(...gaps)).toBeGreaterThan(30);
  });

  it('bildratenunabhängig im Mittel (gleiche Statistik bei 30, 60 und 240 Hz)', () => {
    const rms = (xs: number[]) => Math.sqrt(xs.reduce((a, b) => a + b * b, 0) / xs.length);
    const a = rms(simulate(8, 900, 30, 5));
    const b = rms(simulate(8, 900, 60, 5));
    const c = rms(simulate(8, 900, 240, 5));
    expect(Math.abs(a - b) / b).toBeLessThan(0.25);
    expect(Math.abs(c - b) / b).toBeLessThan(0.25);
  });

  it('reset setzt die Drehrate auf 0', () => {
    const rng = createRng(1);
    const d = new HeadingDrift();
    for (let i = 0; i < 100; i++) d.step(16, 15, rng);
    expect(d.omega).not.toBe(0);
    d.reset();
    expect(d.omega).toBe(0);
  });
});
