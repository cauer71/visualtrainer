import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  baseRadiusPx,
  baseRadiusU,
  computeStats,
  countFor,
  hitRadiusPx,
  levelOf,
  makeField,
  MAX_LEVEL,
  Mover,
  pickSpawn,
  pointsFor,
  predictPos,
  radiusAt,
  respawnGapMs,
  SIZE_AMP,
  SIZE_FREQ_MAX,
  speedU,
  tipFor,
} from '../../src/exercises/ziel-klicken/logic';

describe('ziel-klicken: Stufenfunktionen', () => {
  it('Anzahl 2 → 5, Tempo steigt, Größe sinkt', () => {
    expect(countFor(1)).toBe(2);
    expect(countFor(MAX_LEVEL)).toBe(5);
    for (let l = 2; l <= MAX_LEVEL; l++) {
      expect(countFor(l)).toBeGreaterThanOrEqual(countFor(l - 1));
      expect(speedU(l)).toBeGreaterThan(speedU(l - 1));
      expect(baseRadiusU(l)).toBeLessThanOrEqual(baseRadiusU(l - 1));
    }
    expect(speedU(1)).toBe(5);
    expect(speedU(MAX_LEVEL)).toBeLessThan(20);
    expect(baseRadiusU(MAX_LEVEL)).toBeGreaterThanOrEqual(3.6);
    expect(levelOf(-2)).toBe(1);
    expect(levelOf(99)).toBe(MAX_LEVEL);
    expect(levelOf(4.99)).toBe(4);
  });

  it('kleinster Radius (−25 %) bleibt sichtbar ≥ 18 px, Trefferfläche ≥ 28 px', () => {
    for (let l = 1; l <= MAX_LEVEL; l++) {
      expect(baseRadiusPx(l, 3) * (1 - SIZE_AMP)).toBeGreaterThanOrEqual(18 - 1e-9);
      expect(baseRadiusPx(l, 3)).toBeGreaterThanOrEqual(24);
    }
    expect(hitRadiusPx(10)).toBe(28);
    expect(hitRadiusPx(60)).toBe(70);
  });

  it('Punkte steigen mit der Stufe', () => {
    expect(pointsFor(5)).toBeGreaterThan(pointsFor(1));
  });
});

describe('ziel-klicken: Größenschwankung', () => {
  it('bleibt innerhalb ±25 % und wiederholt sich', () => {
    let lo = Infinity;
    let hi = -Infinity;
    for (let t = 0; t < 10_000; t += 10) {
      const r = radiusAt(40, 1.3, 0.4, t);
      lo = Math.min(lo, r);
      hi = Math.max(hi, r);
    }
    expect(lo).toBeGreaterThanOrEqual(40 * (1 - SIZE_AMP) - 1e-9);
    expect(hi).toBeLessThanOrEqual(40 * (1 + SIZE_AMP) + 1e-9);
    expect(hi - lo).toBeGreaterThan(40 * SIZE_AMP);
    expect(radiusAt(40, 0.5, 0.5, 0)).toBeCloseTo(radiusAt(40, 0.5, 0.5, 2000), 9);
  });

  it('schwankt langsam: weit unter 3 Änderungen der Richtung je Sekunde', () => {
    expect(SIZE_FREQ_MAX).toBeLessThan(1);
  });
});

describe('ziel-klicken: Bahn', () => {
  const f = makeField(40, 1100, 60, 620);

  it('Kreise bleiben über lange Zeit im Feld und laufen mit gleichem Tempo (auch bei 30/60/144 Hz)', () => {
    for (const fps of [30, 60, 144]) {
      const rng = createRng(3);
      const m = new Mover();
        m.place(rng.range(f.minX, f.maxX), rng.range(f.minY, f.maxY), rng.range(0, Math.PI * 2));
      const speed = speedU(MAX_LEVEL) * 7.7;
      let travelled = 0;
      let px = m.x;
      let py = m.y;
      for (let i = 0; i < fps * 60; i++) {
        m.step(1 / fps, speed, f);
        expect(m.x).toBeGreaterThanOrEqual(f.minX - 1e-6);
        expect(m.x).toBeLessThanOrEqual(f.maxX + 1e-6);
        expect(m.y).toBeGreaterThanOrEqual(f.minY - 1e-6);
        expect(m.y).toBeLessThanOrEqual(f.maxY + 1e-6);
        travelled += Math.hypot(m.x - px, m.y - py);
        px = m.x;
        py = m.y;
      }
      // zurückgelegter Weg ≈ Tempo × Zeit (kleine Abweichung durch Randkorrektur)
      expect(travelled / (speed * 60)).toBeGreaterThan(0.97);
      expect(travelled / (speed * 60)).toBeLessThanOrEqual(1.001);
    }
  });

  it('gerade Bahn: mitten im Feld ändert sich die Richtung nicht', () => {
    const m = new Mover();
    m.place(570, 340, 0.4);
    m.step(0.5, 80, f);
    expect(m.theta).toBeCloseTo(0.4, 9);
  });

  it('weiche Wandabprallung: am Rand dreht die Richtung in kleinen Schritten, nicht sprunghaft', () => {
    const m = new Mover();
    m.place(850, 340, 0);
    let maxTurnPerSec = 0;
    let last = m.theta;
    const dt = 1 / 60;
    for (let i = 0; i < 240; i++) {
      m.step(dt, 7.7 * 12, f);
      let d = m.theta - last;
      while (d > Math.PI) d -= 2 * Math.PI;
      while (d < -Math.PI) d += 2 * Math.PI;
      maxTurnPerSec = Math.max(maxTurnPerSec, Math.abs(d) / dt);
      last = m.theta;
    }
    // Drehrate endlich und deutlich unter einem Sprung von 180° in einem Bild (= 188 rad/s bei 60 Hz)
    expect(maxTurnPerSec).toBeLessThan(25);
  });

  it('schräger Anlauf an die rechte Wand: Richtung wird auf die gespiegelte gedreht', () => {
    const m = new Mover();
    m.place(1000, 300, 0.6);
    for (let i = 0; i < 60 * 4; i++) m.step(1 / 60, 7.7 * 10, f);
    expect(Math.abs(m.theta - (Math.PI - 0.6))).toBeLessThan(0.02);
  });

  it('frontaler Anlauf: Kehrtwende, danach geradeaus zurück', () => {
    const m = new Mover();
    m.place(1000, 340, 0);
    for (let i = 0; i < 60 * 4; i++) m.step(1 / 60, 100, f);
    expect(Math.abs(Math.abs(m.theta) - Math.PI)).toBeLessThan(0.02);
    expect(m.x).toBeLessThan(1000);
  });

  it('bleibt auch in winzigem Feld und bei sehr hohem Tempo im Feld', () => {
    const small = makeField(100, 220, 100, 180);
    const rng = createRng(21);
    for (let k = 0; k < 20; k++) {
      const m = new Mover();
      m.place(rng.range(100, 220), rng.range(100, 180), rng.range(-Math.PI, Math.PI));
      for (let i = 0; i < 600; i++) {
        m.step(1 / 30, 500, small);
        expect(m.x).toBeGreaterThanOrEqual(100 - 1e-6);
        expect(m.x).toBeLessThanOrEqual(220 + 1e-6);
        expect(m.y).toBeGreaterThanOrEqual(100 - 1e-6);
        expect(m.y).toBeLessThanOrEqual(180 + 1e-6);
      }
    }
  });

  it('Vorhersage entspricht der echten Bahn', () => {
    const from = { x: 300, y: 200 };
    const speed = 9 * 7.7;
    const p = predictPos(f, from, 0.7, speed, 1.5);
    const m = new Mover();
    m.place(from.x, from.y, 0.7);
    for (let i = 0; i < 90; i++) m.step(1 / 60, speed, f);
    expect(Math.hypot(p.x - m.x, p.y - m.y)).toBeLessThan(1.5);
  });
});

describe('ziel-klicken: Startorte', () => {
  it('liegen im Feld, weit vom Finger und von den anderen Kreisen', () => {
    const rng = createRng(11);
    const f = makeField(40, 1100, 60, 620);
    const avoid = { x: 500, y: 300 };
    const others = [
      { x: 200, y: 150 },
      { x: 900, y: 500 },
    ];
    for (let i = 0; i < 200; i++) {
      const p = pickSpawn(rng, f, others, avoid, 160, 200);
      expect(p.x).toBeGreaterThanOrEqual(f.minX);
      expect(p.x).toBeLessThanOrEqual(f.maxX);
      expect(p.y).toBeGreaterThanOrEqual(f.minY);
      expect(p.y).toBeLessThanOrEqual(f.maxY);
      expect(Math.hypot(p.x - avoid.x, p.y - avoid.y)).toBeGreaterThanOrEqual(150);
    }
  });

  it('kommt mit winzigem Feld klar', () => {
    const rng = createRng(1);
    const p = pickSpawn(rng, makeField(10, 10, 20, 20), [{ x: 10, y: 20 }], { x: 10, y: 20 }, 100, 100);
    expect(p).toEqual({ x: 10, y: 20 });
  });

  it('Ersatz-Kreis kommt nach 350–650 ms', () => {
    const rng = createRng(1);
    for (let i = 0; i < 100; i++) {
      const g = respawnGapMs(rng);
      expect(g).toBeGreaterThanOrEqual(350);
      expect(g).toBeLessThan(650);
    }
  });
});

describe('ziel-klicken: Auswertung', () => {
  it('Trefferquote und Median', () => {
    const s = computeStats(9, 3, [900, 1100, 1000]);
    expect(s.hitRate).toBeCloseTo(75, 6);
    expect(s.medianMs).toBe(1000);
  });

  it('ohne Tipps: Quote 0, Median NaN', () => {
    const s = computeStats(0, 0, []);
    expect(s.hitRate).toBe(0);
    expect(Number.isNaN(s.medianMs)).toBe(true);
  });

  it('Tipp-Schlüssel', () => {
    expect(tipFor(computeStats(6, 5, [1000, 1000]))).toBe('miss');
    expect(tipFor(computeStats(10, 1, [2500, 2600]))).toBe('slow');
    expect(tipFor(computeStats(10, 1, [900, 1000]))).toBe('great');
    expect(tipFor(computeStats(0, 0, []))).toBe('great');
  });
});
