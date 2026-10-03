/**
 * Subjektive Vertikale (Labor): reine Logik – Einstellungen, Startwinkel (wechselnde Seiten), Drehung mit `dt`, Tasten,
 * Auswertung (Mittel, Betrag, Streuung, Unterschied je Startseite).
 */
import { describe, expect, it } from 'vitest';
import { sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import { NUDGE_BIG, NUDGE_SMALL, PARAMS, QUICK_SPEED, QUICK_TRIALS, REVERSE_DEG, tipFor, VerticalSession, verticalParams } from '../../src/exercises/labor-vertikale/logic';

const P = (over: Record<string, unknown> = {}) => verticalParams(sanitizeParams(PARAMS, over));
const make = (over: Record<string, unknown> = {}, seed = 6) => {
  const s = new VerticalSession(P(over), createRng(seed));
  s.startRun();
  return s;
};

describe('Einstellungen', () => {
  it('Standardwerte und Grenzen', () => {
    expect(P()).toEqual({ trials: 8, method: 'rotating', speedDegS: 1.5, startMaxDeg: 25, lineCm: 16 });
    expect(P({ trials: 99 }).trials).toBe(20);
    expect(P({ trials: 3 }).trials).toBe(4);
    expect(P({ speedDegS: 20 }).speedDegS).toBe(6);
    expect(P({ speedDegS: 0 }).speedDegS).toBe(0.5);
    expect(P({ startMaxDeg: 99 }).startMaxDeg).toBe(40);
    expect(P({ lineCm: 1 }).lineCm).toBe(6);
    expect(P({ method: 'adjust' }).method).toBe('adjust');
    expect(P({ method: 'quatsch' }).method).toBe('rotating');
    expect([REVERSE_DEG, NUDGE_SMALL, NUDGE_BIG, QUICK_TRIALS, QUICK_SPEED]).toEqual([45, 0.5, 2, 2, 6]);
  });
});

describe('Startwinkel', () => {
  it('Start zwischen 60 und 100 % der größten Startneigung; die Seiten wechseln von Einstellung zu Einstellung', () => {
    for (let seed = 1; seed <= 10; seed++) {
      const s = make({ trials: 20, startMaxDeg: 30 }, seed);
      const first = Math.sign(s.start);
      for (let i = 0; i < 20; i++) {
        expect(Math.abs(s.start)).toBeGreaterThanOrEqual(30 * 0.6 - 1e-9);
        expect(Math.abs(s.start)).toBeLessThanOrEqual(30 + 1e-9);
        expect(Math.sign(s.start)).toBe(i % 2 === 0 ? first : -first);
        s.confirm();
      }
    }
  });

  it('die erste Startseite ist zufällig (beide Seiten kommen vor)', () => {
    const signs = new Set<number>();
    for (let seed = 1; seed <= 30; seed++) signs.add(Math.sign(make({}, seed).start));
    expect(signs).toEqual(new Set([1, -1]));
  });
});

describe('Drehen mit dt', () => {
  it('die Linie dreht auf die Senkrechte zu, mit Geschwindigkeit · dt (bildratenunabhängig)', () => {
    const a = make({ speedDegS: 2, startMaxDeg: 30 });
    const b = make({ speedDegS: 2, startMaxDeg: 30 });
    const start = a.angle;
    expect(b.angle).toBe(start);
    for (let i = 0; i < 60; i++) a.update(1 / 60); // eine Sekunde mit 60 Bildern
    for (let i = 0; i < 20; i++) b.update(1 / 20); // eine Sekunde mit 20 Bildern
    const toward = -Math.sign(start);
    expect(a.angle).toBeCloseTo(start + toward * 2, 6);
    expect(b.angle).toBeCloseTo(a.angle, 6);
  });

  it('lange Pausen zwischen zwei Bildern werden auf 0,1 s begrenzt', () => {
    const s = make({ speedDegS: 2 });
    const start = s.angle;
    s.update(5);
    expect(Math.abs(s.angle - start)).toBeCloseTo(0.2, 9);
  });

  it('bei ±45° kehrt die Linie um und bleibt in ±45°', () => {
    const s = make({ speedDegS: 6, startMaxDeg: 10 });
    let max = 0;
    let min = 0;
    let turned = false;
    let prev = s.angle;
    let dir = Math.sign(-s.angle);
    for (let i = 0; i < 6000; i++) {
      s.update(0.05);
      max = Math.max(max, s.angle);
      min = Math.min(min, s.angle);
      const d = Math.sign(s.angle - prev);
      if (d && d !== dir) turned = true;
      if (d) dir = d;
      prev = s.angle;
    }
    expect(max).toBeLessThanOrEqual(45);
    expect(min).toBeGreaterThanOrEqual(-45);
    expect(turned).toBe(true);
    expect(Math.max(max, -min)).toBeCloseTo(45, 6);
  });

  it('beim Einstellen dreht sich nichts von allein; vor dem Start und nach dem Ende auch nicht', () => {
    const s = make({ method: 'adjust' });
    const a = s.angle;
    for (let i = 0; i < 100; i++) s.update(0.05);
    expect(s.angle).toBe(a);
    const idle = new VerticalSession(P(), createRng(2));
    const b = idle.angle;
    idle.update(0.1);
    expect(idle.angle).toBe(b);
    expect(idle.confirm()).toBe(false);
    expect(idle.nudge(1)).toBe(false);
  });
});

describe('Tasten (Einstellen)', () => {
  it('Schritte um ±0,5° und ±2°, begrenzt auf ±45°, nur im Verfahren „Einstellen“', () => {
    const s = make({ method: 'adjust' });
    const a = s.angle;
    expect(s.nudge(0.5)).toBe(true);
    expect(s.angle).toBeCloseTo(a + 0.5, 2); // auf 3 Stellen gerundet
    s.nudge(-2);
    expect(s.angle).toBeCloseTo(a - 1.5, 2);
    for (let i = 0; i < 100; i++) s.nudge(2);
    expect(s.angle).toBe(45);
    for (let i = 0; i < 100; i++) s.nudge(-2);
    expect(s.angle).toBe(-45);
    expect(make({ method: 'rotating' }).nudge(1)).toBe(false);
  });
});

describe('Auswertung', () => {
  /** Einstellungen vorgeben: Winkel nach dem Bestätigen (Start abwechselnd rechts/links) */
  function run(sets: number[], over: Record<string, unknown> = {}, seed = 6) {
    const s = make({ method: 'adjust', trials: Math.max(4, sets.length + (sets.length % 2)), ...over }, seed);
    sets.forEach((v, i) => {
      s.nudge(v - s.angle);
      for (let k = 0; k < 5; k++) s.update(0.1);
      s.confirm();
      void i;
    });
    return s;
  }

  it('Mittel, Betrag, Streuung und Zeit', () => {
    const s = run([1, -1, 2, 0]);
    const sum = s.summary();
    expect(sum.n).toBe(4);
    expect(sum.devMean).toBe(0.5);
    expect(sum.devAbs).toBe(1);
    // Stichproben-Standardabweichung von 1, −1, 2, 0
    expect(sum.devSd).toBeCloseTo(Math.sqrt(((0.5) ** 2 + 1.5 ** 2 + 1.5 ** 2 + 0.5 ** 2) / 3), 2);
    expect(sum.msMean).toBe(500);
  });

  it('Unterschied je Startseite: Mittel (Start rechts geneigt) minus Mittel (Start links geneigt)', () => {
    const s = make({ method: 'adjust', trials: 4 });
    const targets: number[] = [];
    for (let i = 0; i < 4; i++) {
      // rechts geneigt gestartet: Einstellung 2, links geneigt: 1
      const v = s.start > 0 ? 2 : 1;
      targets.push(v);
      s.nudge(v - s.angle);
      s.confirm();
    }
    expect(s.summary().hysteresis).toBe(1);
    expect(targets.filter((x) => x === 2)).toHaveLength(2);
  });

  it('eine Einstellung: keine Streuung und kein Unterschied (null statt NaN); leer ebenso', () => {
    const one = run([1.5]);
    const sum = one.summary();
    expect(sum.n).toBe(1);
    expect(sum.devMean).toBe(1.5);
    expect(sum.devSd).toBeNull();
    expect(sum.hysteresis).toBeNull();
    const none = make().summary();
    expect(none).toMatchObject({ n: 0, devMean: null, devAbs: null, devSd: null, hysteresis: null, msMean: null });
  });

  it('Ende nach der eingestellten Zahl, danach nimmt nichts mehr etwas an', () => {
    const s = make({ method: 'adjust', trials: 4 });
    for (let i = 0; i < 4; i++) expect(s.confirm()).toBe(true);
    expect(s.finished).toBe(true);
    expect(s.confirm()).toBe(false);
    expect(s.nudge(1)).toBe(false);
    expect(s.trials).toHaveLength(4);
  });

  it('Tipp: wenige Einstellungen vor Standard', () => {
    const s = make({ method: 'adjust' });
    for (let i = 0; i < 4; i++) s.confirm();
    expect(tipFor(s.summary())).toBe('more');
    const t = make({ method: 'adjust', trials: 8 });
    for (let i = 0; i < 8; i++) t.confirm();
    expect(tipFor(t.summary())).toBe('calm');
  });
});
