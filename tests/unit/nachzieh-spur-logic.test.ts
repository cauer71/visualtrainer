import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  curveChanceFor,
  drawCurveDeg,
  drawRunMs,
  exposureFor,
  levelOf,
  MAX_LEVEL,
  MIN_LEVEL,
  speedFor,
  TRAIL_MS_MAX,
  trailAlphaFor,
  TrailBuffer,
  trailFade,
  trailMsFor,
  trailWidth,
} from '../../src/exercises/nachzieh-spur/logic';

describe('nachzieh-spur: Stufenfunktionen', () => {
  it('Spur wird länger und heller, Tempo steigt, Zeichen wird kürzer', () => {
    for (let l = MIN_LEVEL + 1; l <= MAX_LEVEL; l++) {
      expect(trailMsFor(l)).toBeGreaterThan(trailMsFor(l - 1));
      expect(trailAlphaFor(l)).toBeGreaterThan(trailAlphaFor(l - 1));
      expect(speedFor(l)).toBeGreaterThan(speedFor(l - 1));
      expect(exposureFor(l)).toBeLessThanOrEqual(exposureFor(l - 1));
      expect(curveChanceFor(l)).toBeGreaterThanOrEqual(curveChanceFor(l - 1));
    }
  });

  it('Bereiche: Spur 0,5–1,2 s, Helligkeit 16–60 %, Tempo ≤ 70 u/s', () => {
    expect(trailMsFor(1)).toBe(500);
    expect(trailMsFor(MAX_LEVEL)).toBe(TRAIL_MS_MAX);
    expect(TRAIL_MS_MAX).toBeLessThanOrEqual(1250);
    expect(trailAlphaFor(1)).toBeCloseTo(0.16, 3);
    expect(trailAlphaFor(MAX_LEVEL)).toBeCloseTo(0.6, 2);
    expect(trailAlphaFor(MAX_LEVEL)).toBeLessThan(0.7);
    expect(speedFor(1)).toBeCloseTo(14);
    expect(speedFor(MAX_LEVEL)).toBeLessThan(70);
    expect(exposureFor(MAX_LEVEL)).toBeGreaterThanOrEqual(320);
  });

  it('begrenzt Stufen', () => {
    expect(levelOf(0)).toBe(MIN_LEVEL);
    expect(levelOf(50)).toBe(MAX_LEVEL);
    expect(trailMsFor(99)).toBe(trailMsFor(MAX_LEVEL));
  });

  it('Zufall: Laufzeit und Bogen im erwarteten Bereich', () => {
    const rng = createRng(7);
    const runs = Array.from({ length: 300 }, () => drawRunMs(rng));
    expect(Math.min(...runs)).toBeGreaterThanOrEqual(1300);
    expect(Math.max(...runs)).toBeLessThanOrEqual(2200);
    const curves = Array.from({ length: 300 }, () => drawCurveDeg(rng));
    expect(Math.min(...curves)).toBeGreaterThanOrEqual(25);
    expect(Math.max(...curves)).toBeLessThanOrEqual(70);
  });
});

describe('nachzieh-spur: gleichmäßig verblassende Spur', () => {
  it('Deckkraft fällt linear vom Spitzenwert am Kopf auf 0 am Ende der Spur', () => {
    const peak = 0.5;
    expect(trailFade(0, peak)).toBeCloseTo(peak, 12);
    expect(trailFade(0.5, peak)).toBeCloseTo(peak / 2, 12);
    expect(trailFade(1, peak)).toBe(0);
    expect(trailFade(1.7, peak)).toBe(0);
    expect(trailFade(-0.3, peak)).toBeCloseTo(peak, 12);
    let prev = peak + 1;
    let prevStep = -1;
    for (let i = 0; i <= 100; i++) {
      const a = trailFade(i / 100, peak);
      expect(a).toBeLessThan(prev);
      prev = a;
      if (i > 0 && i < 100) {
        // gleichmäßig: konstanter Abfall je Schritt
        const step = trailFade((i - 1) / 100, peak) - a;
        if (prevStep >= 0) expect(Math.abs(step - prevStep)).toBeLessThan(1e-9);
        prevStep = step;
      }
    }
  });

  it('Spur wird zum Ende hin schlanker', () => {
    expect(trailWidth(0)).toBeGreaterThan(trailWidth(0.5));
    expect(trailWidth(0.5)).toBeGreaterThan(trailWidth(1));
    expect(trailWidth(1)).toBeGreaterThan(0.2);
    expect(trailWidth(0)).toBeLessThanOrEqual(1);
    expect(trailWidth(3)).toBe(trailWidth(1));
  });
});

describe('TrailBuffer', () => {
  it('behält nur Proben innerhalb der Höchstdauer, in zeitlicher Reihenfolge', () => {
    const b = new TrailBuffer(500, 14);
    for (let t = 0; t <= 2000; t += 1000 / 60) b.push(t / 10, 5, t);
    const s = b.samples;
    expect(s.length).toBeGreaterThan(20);
    for (let i = 1; i < s.length; i++) expect(s[i].t).toBeGreaterThan(s[i - 1].t);
    expect(s[s.length - 1].t - s[0].t).toBeLessThanOrEqual(500 + 20);
    expect(s[0].t).toBeGreaterThanOrEqual(2000 - 500 - 40);
  });

  it('gleiche Zeitspanne auf 60 und 120 Hz ergibt etwa gleich viele Proben (bildratenunabhängig)', () => {
    const count = (fps: number) => {
      const b = new TrailBuffer(1000, 14);
      for (let t = 0; t <= 3000; t += 1000 / fps) b.push(t, 0, t);
      return b.length;
    };
    const a = count(60);
    const c = count(120);
    const d = count(240);
    expect(Math.abs(a - c)).toBeLessThanOrEqual(Math.ceil(a * 0.3));
    expect(Math.abs(a - d)).toBeLessThanOrEqual(Math.ceil(a * 0.3));
  });

  it('clear leert den Puffer', () => {
    const b = new TrailBuffer(500);
    b.push(0, 0, 0);
    b.push(1, 1, 100);
    expect(b.length).toBe(2);
    b.clear();
    expect(b.length).toBe(0);
  });
});
