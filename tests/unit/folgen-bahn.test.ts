/** Tests für die Bahn-Tabelle der „…-folgen“-Übungen (src/exercises/_shared/folgen-bahn.ts). */
import { describe, expect, it } from 'vitest';
import { blend, buildPath, keepInside } from '../../src/exercises/_shared/folgen-bahn';

describe('folgen-bahn', () => {
  it('summiert die Geschwindigkeit auf und interpoliert; außerhalb wird am Rand gehalten', () => {
    const p = buildPath({ x: 1, y: -2 }, 2, () => ({ x: 3, y: 0 }));
    expect(p.at(0)).toEqual({ x: 1, y: -2 });
    expect(p.at(1).x).toBeCloseTo(4, 6);
    expect(p.at(0.505).x).toBeCloseTo(1 + 3 * 0.505, 6);
    expect(p.at(-5)).toEqual({ x: 1, y: -2 });
    expect(p.at(99).x).toBeCloseTo(1 + 3 * p.duration, 6);
    expect(p.maxStep).toBeCloseTo(0.03, 9);
  });

  it('ruft die Vorschrift einmal je Schritt in aufsteigender Zeit auf und reicht den Ort weiter', () => {
    const times: number[] = [];
    const p = buildPath({ x: 0, y: 0 }, 1, (s, pos) => {
      times.push(s);
      return { x: 1 + pos.x * 0, y: pos.x };
    });
    for (let i = 1; i < times.length; i++) expect(times[i]).toBeGreaterThan(times[i - 1]);
    expect(times.length).toBe(Math.ceil(1 / 0.01));
    expect(p.at(1).y).toBeGreaterThan(0);
  });

  it('blend: 0 vor dem Beginn, 1 danach, stetig; keepInside bremst nur nach außen', () => {
    expect(blend(0, 1, 0.5)).toBe(0);
    expect(blend(1.25, 1, 0.5)).toBeCloseTo(0.5, 9);
    expect(blend(3, 1, 0.5)).toBe(1);
    expect(blend(0.9, 1, 0)).toBe(0);
    expect(blend(1, 1, 0)).toBe(1);
    expect(keepInside(9.99, 2, 10)).toBe(0);
    expect(keepInside(10, -2, 10)).toBe(-2);
    expect(keepInside(-9.99, -2, 10)).toBe(0);
    expect(keepInside(0, 5, 10)).toBe(5);
    expect(keepInside(9, 5, 10)).toBe(5);
  });
});
