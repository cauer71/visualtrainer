/**
 * Kurzdarbietungen in ganzen Bildern (`_shared/labor-bilder.ts`): Bilddauer-Schätzung, Bildzahl, Ende der Darbietung,
 * gestörte Darbietung, adaptive Dauer in Bildern.
 */
import { describe, expect, it } from 'vitest';
import {
  DEFAULT_PERIOD_MS,
  DurationControl,
  FramePeriod,
  framesFor,
  isCleanShow,
  meanOr,
  MIN_CYCLE_MS,
  showEndAt,
} from '../../src/exercises/_shared/labor-bilder';

describe('FramePeriod', () => {
  it('ohne genug Bilder gilt 60 Hz', () => {
    const f = new FramePeriod();
    expect(f.period()).toBeCloseTo(DEFAULT_PERIOD_MS, 6);
    f.push(0);
    f.push(8);
    f.push(16);
    expect(f.period()).toBeCloseTo(DEFAULT_PERIOD_MS, 6);
  });

  it('schätzt 60, 120 und 144 Hz aus den Bildzeiten (Median, Ausreißer stören nicht)', () => {
    for (const hz of [30, 60, 90, 120, 144]) {
      const f = new FramePeriod();
      const p = 1000 / hz;
      let t = 100;
      for (let i = 0; i < 40; i++) {
        f.push(t);
        t += i === 20 ? p * 3 : p; // ein Ruckler
      }
      expect(f.period()).toBeCloseTo(p, 3);
      expect(f.hz()).toBeCloseTo(hz, 1);
    }
  });

  it('Pausen und Tabwechsel (große Abstände) und doppelte Zeitstempel zählen nicht', () => {
    const f = new FramePeriod();
    let t = 0;
    for (let i = 0; i < 12; i++) {
      f.push(t);
      t += 1000 / 60;
    }
    f.push(t + 5000); // lange Pause
    f.push(t + 5000); // gleicher Zeitstempel
    expect(f.period()).toBeCloseTo(1000 / 60, 3);
  });

  it('bleibt in vernünftigen Grenzen', () => {
    const f = new FramePeriod();
    for (let i = 0; i < 30; i++) f.push(i * 4.2);
    expect(f.period()).toBeGreaterThanOrEqual(4);
    const g = new FramePeriod();
    for (let i = 0; i < 30; i++) g.push(i * 60);
    expect(g.period()).toBeLessThanOrEqual(50);
  });
});

describe('Bilder zählen', () => {
  it('Wunschdauer → ganze Bilder, mindestens eines', () => {
    expect(framesFor(200, 1000 / 60)).toBe(12);
    expect(framesFor(150, 1000 / 60)).toBe(9);
    expect(framesFor(50, 1000 / 60)).toBe(3);
    expect(framesFor(10, 1000 / 60)).toBe(1);
    expect(framesFor(1, 1000 / 60)).toBe(1);
    expect(framesFor(200, 1000 / 120)).toBe(24);
    expect(framesFor(10, 1000 / 120)).toBe(1);
    expect(framesFor(10, 1000 / 144)).toBe(1);
  });

  it('die Darbietung endet im ersten Bild nach (Bilder − 0,5) Bilddauern', () => {
    const p = 1000 / 60;
    expect(showEndAt(1000, 1, p)).toBeCloseTo(1000 + 0.5 * p, 6);
    expect(showEndAt(1000, 12, p)).toBeCloseTo(1000 + 11.5 * p, 6);
    // genau N Bilder werden gezeigt: Bildzeiten t0 + i·p, i = 0..N−1 liegen vor dem Ende, Bild N nicht
    for (const n of [1, 2, 5, 12]) {
      const end = showEndAt(0, n, p);
      expect((n - 1) * p).toBeLessThan(end);
      expect(n * p).toBeGreaterThanOrEqual(end);
    }
  });

  it('gestörte Darbietung: ein Bild zu viel oder zu wenig', () => {
    const p = 1000 / 60;
    expect(isCleanShow(12 * p, 12, p)).toBe(true);
    expect(isCleanShow(12 * p + 2, 12, p)).toBe(true);
    expect(isCleanShow(13 * p, 12, p)).toBe(false);
    expect(isCleanShow(11 * p, 12, p)).toBe(false);
    expect(isCleanShow(1 * p, 1, p)).toBe(true);
    expect(isCleanShow(2 * p, 1, p)).toBe(false);
  });

  it('Blinkregel: höchstens eine Darbietung pro Sekunde', () => {
    expect(MIN_CYCLE_MS).toBeGreaterThanOrEqual(1000);
  });

  it('meanOr: kein NaN bei leerer Liste', () => {
    expect(meanOr([])).toBe(0);
    expect(meanOr([], 5)).toBe(5);
    expect(meanOr([2, 4])).toBe(3);
  });
});

describe('DurationControl', () => {
  const P = 1000 / 60;
  const make = (over: Partial<ConstructorParameters<typeof DurationControl>[0]> = {}) =>
    new DurationControl({ durationMs: 200, maxMs: 2000, adaptive: true, ...over });

  it('fest: immer dieselbe Zahl Bilder; die Treppe wird nie angelegt', () => {
    const c = make({ adaptive: false });
    expect(c.begin(P)).toBe(12);
    c.record(true, true);
    c.record(true, true);
    expect(c.begin(P)).toBe(12);
    expect(c.thresholdFrames()).toBeNull();
    expect(c.thresholdMs()).toBeNull();
    expect(c.reversals()).toEqual([]);
    expect(c.currentMs()).toBeCloseTo(12 * P, 6);
  });

  it('adaptiv: zwei richtige in Folge → kürzer, ein Fehler → länger (in Bildern)', () => {
    const c = make();
    expect(c.begin(P)).toBe(12);
    c.record(true, true);
    expect(c.begin(P)).toBe(12);
    c.record(true, true);
    expect(c.begin(P)).toBe(10);
    c.record(false, true);
    expect(c.begin(P)).toBe(13);
  });

  it('gestörte Darbietungen verändern die Treppe nicht', () => {
    const c = make();
    c.begin(P);
    c.record(true, false);
    c.record(true, false);
    c.record(false, false);
    expect(c.begin(P)).toBe(12);
  });

  it('nie unter ein Bild; nie über das Maximum', () => {
    const c = make({ durationMs: 10, maxMs: 40 });
    expect(c.begin(P)).toBe(1);
    for (let i = 0; i < 6; i++) c.record(true, true);
    expect(c.begin(P)).toBe(1);
    const d = make({ durationMs: 30, maxMs: 40 });
    d.begin(P);
    for (let i = 0; i < 20; i++) d.record(false, true);
    expect(d.begin(P)).toBeLessThanOrEqual(framesFor(40, P) + 0);
  });

  it('Schwelle erst ab zwei Umkehrpunkten, in Bildern und ms', () => {
    const c = make();
    c.begin(P);
    expect(c.thresholdFrames()).toBeNull();
    // 2 richtig → 10, Fehler → 13 (Umkehr 1 bei 10), 2 richtig → 10 (Umkehr 2 bei 13), Fehler …
    for (const ok of [true, true, false, true, true, false]) c.record(ok, true);
    expect(c.reversals().length).toBeGreaterThanOrEqual(2);
    const f = c.thresholdFrames()!;
    expect(f).toBeGreaterThan(0);
    expect(c.thresholdMs()).toBeCloseTo(f * P, 6);
  });

  it('Bildzahl richtet sich nach der Bilddauer beim ersten Beginn (120 Hz)', () => {
    const c = make();
    expect(c.begin(1000 / 120)).toBe(24);
  });
});
