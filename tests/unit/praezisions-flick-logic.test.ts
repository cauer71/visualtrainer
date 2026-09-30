import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  centering,
  classifyTap,
  computeStats,
  gapMs,
  hitRadiusPx,
  levelOf,
  lifeMs,
  MAX_LEVEL,
  pickSpot,
  pointsFor,
  radiusAt,
  shrinkPerSecond,
  startRadiusPx,
  startRadiusU,
  timeLeftFrac,
  tipFor,
  VANISH_FRAC,
} from '../../src/exercises/praezisions-flick/logic';

describe('praezisions-flick: Stufenfunktionen', () => {
  it('Startgröße sinkt, Schrumpftempo steigt mit der Stufe', () => {
    expect(startRadiusU(1)).toBeCloseTo(8.6, 5);
    for (let l = 2; l <= MAX_LEVEL; l++) {
      expect(startRadiusU(l)).toBeLessThanOrEqual(startRadiusU(l - 1));
      expect(lifeMs(l)).toBeLessThanOrEqual(lifeMs(l - 1));
      expect(shrinkPerSecond(l)).toBeGreaterThan(shrinkPerSecond(l - 1));
    }
    expect(lifeMs(1)).toBe(3400);
    expect(lifeMs(MAX_LEVEL)).toBe(1100);
    expect(startRadiusU(MAX_LEVEL)).toBeGreaterThanOrEqual(4.6);
  });

  it('Stufen werden begrenzt und gerundet', () => {
    expect(levelOf(0)).toBe(1);
    expect(levelOf(99)).toBe(MAX_LEVEL);
    expect(levelOf(3.9)).toBe(3);
    expect(lifeMs(-5)).toBe(3400);
  });

  it('Startradius nie unter 20 px', () => {
    expect(startRadiusPx(MAX_LEVEL, 3)).toBe(20);
    expect(startRadiusPx(1, 8)).toBeCloseTo(8.6 * 8, 5);
  });
});

describe('praezisions-flick: Schrumpfen', () => {
  it('Radius sinkt linear bis auf 25 % und bleibt dort', () => {
    expect(radiusAt(40, 0, 2000)).toBe(40);
    expect(radiusAt(40, 1000, 2000)).toBeCloseTo(40 * (1 - 0.75 * 0.5), 6);
    expect(radiusAt(40, 2000, 2000)).toBeCloseTo(40 * VANISH_FRAC, 6);
    expect(radiusAt(40, 9000, 2000)).toBeCloseTo(40 * VANISH_FRAC, 6);
    expect(radiusAt(40, -500, 2000)).toBe(40);
  });

  it('Schrumpfen hängt nur an der Zeit, nicht an der Zahl der Zwischenschritte (dt-unabhängig)', () => {
    // Radius nach 1 s ist derselbe, egal ob in 60 oder 120 Schritten berechnet
    let a = 0;
    for (let i = 0; i < 60; i++) a += 1000 / 60;
    let b = 0;
    for (let i = 0; i < 120; i++) b += 1000 / 120;
    expect(radiusAt(50, a, 3000)).toBeCloseTo(radiusAt(50, b, 3000), 6);
  });

  it('übrige Zeit: 1 am Anfang, 0 am Ende', () => {
    expect(timeLeftFrac(0, 2000)).toBe(1);
    expect(timeLeftFrac(1000, 2000)).toBe(0.5);
    expect(timeLeftFrac(5000, 2000)).toBe(0);
  });
});

describe('praezisions-flick: Wertung eines Tipps', () => {
  it('Mittigkeit in % des Radius', () => {
    expect(centering(0, 40)).toBe(100);
    expect(centering(20, 40)).toBe(50);
    expect(centering(40, 40)).toBe(0);
    expect(centering(80, 40)).toBe(0);
    expect(centering(5, 0)).toBe(0);
  });

  it('Trefferfläche ist nie kleiner als 24 px und größer als das sichtbare Ziel', () => {
    expect(hitRadiusPx(5)).toBe(24);
    expect(hitRadiusPx(100)).toBeCloseTo(130, 6);
    for (const r of [4, 10, 18, 30, 60]) expect(hitRadiusPx(r)).toBeGreaterThanOrEqual(r);
  });

  it('Tipp: in der Scheibe = hit, knapp daneben = near, weit daneben = far', () => {
    expect(classifyTap(10, 40)).toBe('hit');
    expect(classifyTap(40, 40)).toBe('hit');
    expect(classifyTap(45, 40)).toBe('near');
    expect(classifyTap(52, 40)).toBe('near');
    expect(classifyTap(53, 40)).toBe('far');
    // kleines Ziel: Trefferfläche wenigstens 24 px
    expect(classifyTap(23, 6)).toBe('near');
    expect(classifyTap(25, 6)).toBe('far');
  });

  it('Punkte: mittiger und früher ist besser, höhere Stufe gibt mehr', () => {
    expect(pointsFor(1, 100, 1)).toBeGreaterThan(pointsFor(1, 20, 0.1));
    expect(pointsFor(8, 50, 0.5)).toBeGreaterThan(pointsFor(1, 50, 0.5));
    expect(pointsFor(1, -20, 2)).toBe(pointsFor(1, 0, 1));
  });
});

describe('praezisions-flick: Ort des nächsten Ziels', () => {
  it('bleibt im Feld und hält Abstand zum letzten Tipp', () => {
    const rng = createRng(7);
    const fw = 900;
    const fh = 500;
    const avoid = { x: 450, y: 250 };
    for (let i = 0; i < 200; i++) {
      const s = pickSpot(rng, fw, fh, 50, avoid, 250);
      expect(s.nx).toBeGreaterThanOrEqual(0);
      expect(s.nx).toBeLessThanOrEqual(1);
      expect(s.ny).toBeGreaterThanOrEqual(0);
      expect(s.ny).toBeLessThanOrEqual(1);
      expect(Math.hypot(s.nx * fw - avoid.x, s.ny * fh - avoid.y)).toBeGreaterThanOrEqual(150);
    }
  });

  it('kommt auch mit winzigem Feld und ohne Vermeidungspunkt klar', () => {
    const rng = createRng(3);
    const s = pickSpot(rng, 30, 20, 50, null, 100);
    expect(Number.isFinite(s.nx) && Number.isFinite(s.ny)).toBe(true);
    const z = pickSpot(rng, 0, 0, 50, null, 100);
    expect(z.nx).toBe(0.5);
  });

  it('Pause zwischen Zielen liegt zwischen 450 und 800 ms', () => {
    const rng = createRng(1);
    for (let i = 0; i < 100; i++) {
      const g = gapMs(rng);
      expect(g).toBeGreaterThanOrEqual(450);
      expect(g).toBeLessThan(800);
    }
  });
});

describe('praezisions-flick: Auswertung', () => {
  it('Mittelwert und Median', () => {
    const s = computeStats(3, 1, 2, [80, 60, 40], [900, 700, 1100]);
    expect(s.centering).toBeCloseTo(60, 6);
    expect(s.medianMs).toBe(900);
    expect(s.hits).toBe(3);
  });

  it('ohne Tipps: NaN statt 0', () => {
    const s = computeStats(0, 4, 0, [], []);
    expect(Number.isNaN(s.centering)).toBe(true);
    expect(Number.isNaN(s.medianMs)).toBe(true);
  });

  it('Tipp-Schlüssel', () => {
    expect(tipFor(computeStats(5, 4, 1, [80], [800]))).toBe('gone');
    expect(tipFor(computeStats(5, 0, 4, [80], [800]))).toBe('wrong');
    expect(tipFor(computeStats(5, 0, 0, [30, 40], [800, 900]))).toBe('center');
    expect(tipFor(computeStats(5, 0, 0, [80, 90], [800, 900]))).toBe('great');
    expect(tipFor(computeStats(0, 0, 0, [], []))).toBe('great');
  });
});
