import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  ballPos,
  ballRadiusFor,
  bounce,
  containerRadiusFor,
  fingerOffsetFor,
  inContainer,
  isTapOnly,
  MAX_LEVEL,
  type Mover,
  placeBall,
  pointsFor,
  roundLimitFor,
  span,
  speedFor,
  stepContainer,
  turnRateFor,
} from '../../src/exercises/ziehen-ablegen/logic';

describe('ziehen-ablegen: Stufenfunktionen', () => {
  it('Behälter wird kleiner, Tempo größer, Zeitfenster kürzer – innerhalb der Grenzen', () => {
    for (let l = 2; l <= MAX_LEVEL; l++) {
      expect(containerRadiusFor(l, 7.68)).toBeLessThanOrEqual(containerRadiusFor(l - 1, 7.68));
      expect(speedFor(l)).toBeGreaterThan(speedFor(l - 1));
      expect(roundLimitFor(l)).toBeLessThanOrEqual(roundLimitFor(l - 1));
    }
    expect(speedFor(1)).toBeCloseTo(5, 6);
    expect(roundLimitFor(1)).toBeCloseTo(6.5, 6);
    expect(roundLimitFor(MAX_LEVEL)).toBeGreaterThanOrEqual(3.2);
    expect(containerRadiusFor(MAX_LEVEL, 3.6)).toBeGreaterThanOrEqual(34);
  });

  it('Ball ≥ 22 px Radius, Versatz nach oben ≈ 6 u und größer als der Ballradius', () => {
    expect(ballRadiusFor(3)).toBe(22);
    expect(ballRadiusFor(10)).toBe(32);
    const u = 7.68;
    const r = ballRadiusFor(u);
    expect(fingerOffsetFor(u, r)).toBeGreaterThanOrEqual(6 * u);
    expect(fingerOffsetFor(u, r)).toBeGreaterThan(r + 20);
    expect(fingerOffsetFor(3.6, ballRadiusFor(3.6))).toBeGreaterThanOrEqual(22 + 26);
  });

  it('Richtungswechsel erst ab Stufe 6', () => {
    expect(turnRateFor(1)).toBe(0);
    expect(turnRateFor(5.9)).toBe(0);
    expect(turnRateFor(6)).toBeGreaterThan(0);
    expect(turnRateFor(MAX_LEVEL)).toBeLessThanOrEqual(1);
  });

  it('Punkte steigen mit der Stufe', () => {
    expect(pointsFor(1)).toBe(10);
    expect(pointsFor(4)).toBe(19);
  });
});

describe('ziehen-ablegen: Trefferprüfung', () => {
  it('Ball liegt über dem Finger und bleibt in der Bühne', () => {
    expect(ballPos(300, 400, 50, 24, 1000)).toEqual({ x: 300, y: 350 });
    expect(ballPos(-20, 10, 50, 24, 1000)).toEqual({ x: 24, y: 24 });
    expect(ballPos(2000, 500, 50, 24, 1000)).toEqual({ x: 976, y: 450 });
  });

  it('Treffer, wenn die Ballmitte im Behälter liegt (Rand zählt mit)', () => {
    const c = { x: 100, y: 100 };
    expect(inContainer({ x: 100, y: 100 }, c, 40)).toBe(true);
    expect(inContainer({ x: 140, y: 100 }, c, 40)).toBe(true);
    expect(inContainer({ x: 141, y: 100 }, c, 40)).toBe(false);
    expect(inContainer({ x: 130, y: 130 }, c, 40)).toBe(false);
  });

  it('Finger genau unter dem Behälter trifft, wenn der Versatz berücksichtigt ist', () => {
    const c = { x: 400, y: 300 };
    const off = 50;
    expect(inContainer(ballPos(400, 300 + off, off, 24, 1000), c, 40)).toBe(true);
    // Finger direkt auf dem Behälter (ohne Versatz): Ball liegt zu hoch
    expect(inContainer(ballPos(400, 300, off, 24, 1000), c, 40)).toBe(false);
  });

  it('Nur-Tippen wird erkannt', () => {
    expect(isTapOnly(80, 3, 7.68)).toBe(true);
    expect(isTapOnly(300, 3, 7.68)).toBe(false);
    expect(isTapOnly(80, 40, 7.68)).toBe(false);
  });
});

describe('ziehen-ablegen: Bewegung des Behälters', () => {
  const b = span(50, 450, 40, 340);

  it('bleibt immer in den Grenzen und behält das Tempo (ohne Kurven)', () => {
    const rng = createRng(4);
    for (let k = 0; k < 20; k++) {
      const m: Mover = { x: rng.range(50, 450), y: rng.range(40, 340), ang: rng.range(0, Math.PI * 2), turnLeft: 0 };
      for (let i = 0; i < 600; i++) {
        stepContainer(m, 1 / 60, 300, b);
        expect(m.x).toBeGreaterThanOrEqual(b.minX - 1e-9);
        expect(m.x).toBeLessThanOrEqual(b.maxX + 1e-9);
        expect(m.y).toBeGreaterThanOrEqual(b.minY - 1e-9);
        expect(m.y).toBeLessThanOrEqual(b.maxY + 1e-9);
      }
    }
  });

  it('Weg pro Sekunde ist unabhängig von der Bildrate', () => {
    const run = (dt: number) => {
      const m: Mover = { x: 100, y: 100, ang: 0.4, turnLeft: 0 };
      for (let i = 0; i < Math.round(0.5 / dt); i++) stepContainer(m, dt, 200, b);
      return m;
    };
    const a = run(1 / 60);
    const c = run(1 / 120);
    expect(a.x).toBeCloseTo(c.x, 6);
    expect(a.y).toBeCloseTo(c.y, 6);
    expect(Math.hypot(a.x - 100, a.y - 100)).toBeCloseTo(100, 6);
  });

  it('Kurve wird weich abgebaut (höchstens turnSpeed rad/s)', () => {
    const m: Mover = { x: 200, y: 200, ang: 0, turnLeft: 1 };
    stepContainer(m, 0.1, 100, b, 3.5);
    expect(m.ang).toBeCloseTo(0.35, 6);
    expect(m.turnLeft).toBeCloseTo(0.65, 6);
    for (let i = 0; i < 30; i++) stepContainer(m, 0.1, 10, b, 3.5);
    expect(m.turnLeft).toBeCloseTo(0, 6);
    expect(m.ang).toBeCloseTo(1, 6);
  });

  it('bounce spiegelt die Richtung an der Wand und meldet den Abprall', () => {
    const m: Mover = { x: 460, y: 100, ang: 0, turnLeft: 0 };
    expect(bounce(m, b)).toBe(true);
    expect(m.x).toBeLessThanOrEqual(450);
    expect(Math.cos(m.ang)).toBeLessThan(0);
    const inside: Mover = { x: 200, y: 100, ang: 0, turnLeft: 0 };
    expect(bounce(inside, b)).toBe(false);
  });

  it('span schützt vor umgekehrten Grenzen (winziges Feld)', () => {
    const s = span(100, 50, 80, 20);
    expect(s.minX).toBe(s.maxX);
    expect(s.minY).toBe(s.maxY);
  });

  it('placeBall hält Abstand zum Behälter, wenn Platz ist', () => {
    const rng = createRng(9);
    const c = { x: 250, y: 190 };
    for (let i = 0; i < 100; i++) {
      const p = placeBall(() => rng.next(), b, c, 120);
      expect(Math.hypot(p.x - c.x, p.y - c.y)).toBeGreaterThanOrEqual(120 - 1e-9);
      expect(p.x).toBeGreaterThanOrEqual(b.minX);
      expect(p.x).toBeLessThanOrEqual(b.maxX);
    }
    // unmöglicher Abstand: trotzdem ein Punkt im Feld
    const q = placeBall(() => rng.next(), b, c, 1e6);
    expect(q.x).toBeGreaterThanOrEqual(b.minX);
    expect(q.y).toBeLessThanOrEqual(b.maxY);
  });
});
