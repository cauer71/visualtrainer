import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  answerWindowMs,
  deviationFactor,
  deviationMsFor,
  fieldsFor,
  pickSide,
  separate,
  speedFor,
  targetsFor,
  Wanderer,
} from '../../src/exercises/zwei-ziele/logic';

describe('zwei-ziele: Stufen', () => {
  it('Tempo steigt, Stopp wird kürzer, Zielzahl 1 → 2', () => {
    expect(speedFor(20)).toBeGreaterThan(speedFor(1));
    expect(deviationMsFor(1)).toBe(1100);
    expect(deviationMsFor(20)).toBe(380);
    expect(deviationMsFor(10)).toBeLessThan(deviationMsFor(5));
    expect(targetsFor(1)).toBe(1);
    expect(targetsFor(7)).toBe(1);
    expect(targetsFor(8)).toBe(2);
    expect(answerWindowMs(500)).toBeGreaterThan(500);
  });

  it('Stockung: weich 1 → 0 → 1 mit Halt in der Mitte', () => {
    expect(deviationFactor(0)).toBe(1);
    expect(deviationFactor(1)).toBe(1);
    expect(deviationFactor(0.5)).toBeCloseTo(0, 6);
    let prev = 1;
    for (let i = 0; i <= 200; i++) {
      const f = deviationFactor(i / 200);
      expect(f).toBeGreaterThanOrEqual(0);
      expect(f).toBeLessThanOrEqual(1);
      expect(Math.abs(f - prev)).toBeLessThan(0.08);
      prev = f;
    }
    let still = 0;
    for (let i = 0; i <= 1000; i++) if (deviationFactor(i / 1000) < 0.02) still++;
    expect(still / 1000).toBeGreaterThan(0.3);
  });

  it('pickSide: nie dreimal dieselbe Seite, beide kommen vor', () => {
    const rng = createRng(11);
    const h: number[] = [];
    for (let i = 0; i < 300; i++) h.push(pickSide(() => rng.next(), h));
    for (let i = 2; i < h.length; i++) expect(h[i] === h[i - 1] && h[i] === h[i - 2]).toBe(false);
    expect(new Set(h).size).toBe(2);
  });
});

describe('zwei-ziele: Felder und Bewegung', () => {
  for (const [w, h] of [
    [1194, 834],
    [390, 844],
    [900, 620],
  ]) {
    it(`Felder sind spiegelbildlich und getrennt (${w}×${h})`, () => {
      const u = Math.min(w, h) / 100;
      const r = Math.min(26, Math.max(16, 2.8 * u));
      const f = fieldsFor(w, h, 0, h - 100, u, r);
      expect(f.cx - f.left.maxX).toBeCloseTo(f.right.minX - f.cx);
      expect(f.cx - f.left.minX).toBeCloseTo(f.right.maxX - f.cx);
      expect(f.left.maxX).toBeLessThan(f.cx - f.cross);
      expect(f.left.minX).toBeGreaterThan(0);
      expect(f.right.maxX).toBeLessThan(w);
      if (w >= h) expect(f.right.maxX - f.cx).toBeLessThanOrEqual(0.3 * w + 1e-6);
      expect(f.left.maxX).toBeGreaterThan(f.left.minX);
      expect(f.left.maxY).toBeGreaterThan(f.left.minY);
    });
  }

  it('Wanderer bleibt im Feld und läuft mit konstantem Tempo', () => {
    const B = { minX: 100, maxX: 400, minY: 50, maxY: 500 };
    const rng = createRng(5);
    for (let k = 0; k < 6; k++) {
      const wd = new Wanderer(rng.range(B.minX, B.maxX), rng.range(B.minY, B.maxY), rng.range(0, 6), rng.range(0, 6), rng.range(0, 6));
      let s = 0;
      for (let i = 0; i < 60 * 120; i++) {
        wd.step(1 / 60, 150, 1, s, B, 40);
        s += 1 / 60;
        expect(wd.x).toBeGreaterThanOrEqual(B.minX);
        expect(wd.x).toBeLessThanOrEqual(B.maxX);
        expect(wd.y).toBeGreaterThanOrEqual(B.minY);
        expect(wd.y).toBeLessThanOrEqual(B.maxY);
      }
    }
    // mitten im Feld: Schrittweite = v·dt·factor
    const wd = new Wanderer(250, 275, 1, 0, 0);
    const x0 = wd.x;
    const y0 = wd.y;
    wd.step(0.02, 100, 1, 0, B, 10);
    expect(Math.hypot(wd.x - x0, wd.y - y0)).toBeCloseTo(2, 6);
    wd.step(0.02, 100, 0, 0, B, 10);
    const x1 = wd.x;
    wd.step(0.02, 100, 0, 0, B, 10);
    expect(wd.x).toBe(x1);
  });

  it('Bewegung ist bildratenunabhängig (Weg je Sekunde gleich)', () => {
    const B = { minX: 0, maxX: 5000, minY: 0, maxY: 5000 };
    const go = (dt: number) => {
      const wd = new Wanderer(2500, 2500, 0.7, 1, 2);
      let s = 0;
      for (let i = 0; i < Math.round(3 / dt); i++) {
        wd.step(dt, 100, 1, s, B, 10);
        s += dt;
      }
      return wd;
    };
    const a = go(1 / 60);
    const b = go(1 / 120);
    expect(Math.hypot(a.x - b.x, a.y - b.y)).toBeLessThan(3);
  });

  it('separate hält zwei Kugeln auseinander', () => {
    const B = { minX: 0, maxX: 300, minY: 0, maxY: 300 };
    const a = new Wanderer(150, 150, 0, 0, 0);
    const b = new Wanderer(152, 150, Math.PI, 0, 0);
    separate(a, b, 50, B, 1 / 60);
    expect(Math.hypot(a.x - b.x, a.y - b.y)).toBeGreaterThanOrEqual(49.9);
  });
});
