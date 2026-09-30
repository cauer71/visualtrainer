import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  advancePhase,
  computeStats,
  gapMs,
  judgeTap,
  MAX_LEVEL,
  nextCrossingMs,
  periodMs,
  pointsFor,
  posOf,
  swingPx,
  swingU,
  timeoutMs,
  tipFor,
  windowMs,
  zonePx,
  zoneU,
} from '../../src/exercises/pendel-fang/logic';

describe('pendel-fang: Stufenfunktionen', () => {
  it('Tempo: Schwingdauer sinkt von 5,0 s auf 2,8 s', () => {
    expect(periodMs(1)).toBe(5000);
    expect(periodMs(MAX_LEVEL)).toBe(2800);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(periodMs(l)).toBeLessThan(periodMs(l - 1));
    expect(periodMs(0)).toBe(5000);
    expect(periodMs(99)).toBe(2800);
    // gebrochene Stufen liegen dazwischen
    expect(periodMs(2.5)).toBeLessThan(periodMs(2));
    expect(periodMs(2.5)).toBeGreaterThan(periodMs(3));
  });

  it('Weite wächst, Fangbereich wird enger', () => {
    expect(swingU(1)).toBeCloseTo(32);
    expect(swingU(MAX_LEVEL)).toBeCloseTo(44);
    expect(zoneU(1)).toBeCloseTo(14);
    expect(zoneU(MAX_LEVEL)).toBeCloseTo(7.5);
    for (let l = 2; l <= MAX_LEVEL; l++) {
      expect(swingU(l)).toBeGreaterThan(swingU(l - 1));
      expect(zoneU(l)).toBeLessThan(zoneU(l - 1));
    }
  });

  it('Bahn passt immer auf die Bühne (auch im Hochformat); Fangbereich nie unter 44 px', () => {
    for (const [w, u] of [
      [1024, 7],
      [390, 3.9],
      [1600, 10],
    ]) {
      for (let l = 1; l <= MAX_LEVEL; l++) {
        const amp = swingPx(l, u, w, 30);
        expect(amp).toBeLessThanOrEqual(w / 2 - 30 + 1e-9);
        expect(amp).toBeGreaterThan(20);
        expect(zonePx(l, u, amp)).toBeGreaterThanOrEqual(44);
      }
    }
  });

  it('Zeitfenster im Fangbereich bleibt im machbaren Bereich (Tablet, 7 px/u)', () => {
    let last = Infinity;
    for (let l = 1; l <= MAX_LEVEL; l++) {
      const amp = swingPx(l, 7, 1024, 30);
      const win = windowMs(periodMs(l), amp, zonePx(l, 7, amp));
      expect(win).toBeGreaterThan(60);
      expect(win).toBeLessThan(450);
      expect(win).toBeLessThan(last + 1e-9);
      last = win;
    }
  });

  it('Pause 700–1200 ms, Zeitlimit 1,6 Schwingungen', () => {
    const rng = createRng(2);
    for (let i = 0; i < 100; i++) {
      const g = gapMs(rng);
      expect(g).toBeGreaterThanOrEqual(700);
      expect(g).toBeLessThan(1200);
    }
    expect(timeoutMs(5000)).toBe(8000);
  });
});

describe('pendel-fang: Bewegung (dt-basiert)', () => {
  it('nach einer Schwingdauer ist die Phase um 2π weiter – unabhängig von der Bildrate', () => {
    const period = 3000;
    for (const fps of [30, 60, 120, 144]) {
      let phase = 0;
      const dt = 1 / fps;
      for (let i = 0; i < fps * 3; i++) phase = advancePhase(phase, dt, period);
      expect(phase).toBeCloseTo(2 * Math.PI, 6);
    }
  });

  it('Ort: Mitte bei 0 und π, Ränder bei ±π/2', () => {
    expect(posOf(0, 100)).toBeCloseTo(0);
    expect(posOf(Math.PI / 2, 100)).toBeCloseTo(100);
    expect(posOf(Math.PI, 100)).toBeCloseTo(0);
    expect(posOf((3 * Math.PI) / 2, 100)).toBeCloseTo(-100);
  });

  it('nächster Durchgang durch die Mitte', () => {
    // Phase −π/2 (linker Rand): nach Viertelperiode in der Mitte
    expect(nextCrossingMs(-Math.PI / 2, 4000)).toBeCloseTo(1000);
    // genau in der Mitte: der nächste Durchgang ist erst in einer halben Periode
    expect(nextCrossingMs(0.0001, 4000)).toBeGreaterThan(1990);
    // Mindestabstand überspringt einen Durchgang
    expect(nextCrossingMs(-Math.PI / 2, 4000, 1500)).toBeCloseTo(3000);
    expect(nextCrossingMs(1.3, 4000, 0)).toBeGreaterThan(0);
  });
});

describe('pendel-fang: Wertung', () => {
  const period = 4000;
  const amp = 300;
  const zone = 60;

  it('genau in der Mitte: Treffer, Abweichung 0', () => {
    const j = judgeTap(0, period, amp, zone);
    expect(j.hit).toBe(true);
    expect(j.offsetMs).toBeCloseTo(0);
    expect(j.offsetPct).toBeCloseTo(0);
    expect(j.dir).toBe(1);
    const k = judgeTap(Math.PI, period, amp, zone);
    expect(k.hit).toBe(true);
    expect(k.dir).toBe(-1);
  });

  it('vor der Mitte negativ, hinter der Mitte positiv – in beiden Richtungen', () => {
    // nach rechts laufend: Phase leicht vor 0 → links der Mitte = vor der Mitte
    const early = judgeTap(-0.3, period, amp, zone);
    expect(early.offsetMs).toBeLessThan(0);
    expect(early.offsetPct).toBeLessThan(0);
    expect(early.hit).toBe(false);
    const late = judgeTap(0.3, period, amp, zone);
    expect(late.offsetMs).toBeGreaterThan(0);
    expect(late.offsetPct).toBeGreaterThan(0);
    // nach links laufend (Phase um π): gleiche Vorzeichenregel
    const early2 = judgeTap(Math.PI - 0.3, period, amp, zone);
    const late2 = judgeTap(Math.PI + 0.3, period, amp, zone);
    expect(early2.offsetMs).toBeLessThan(0);
    expect(late2.offsetMs).toBeGreaterThan(0);
    expect(early2.offsetMs).toBeCloseTo(early.offsetMs);
    expect(late2.offsetPct).toBeCloseTo(late.offsetPct);
    expect(early2.dir).toBe(-1);
  });

  it('Trefferkante entspricht dem halben Fangbereich und der Fensterbreite', () => {
    const edge = Math.asin(zone / 2 / amp);
    expect(judgeTap(edge * 0.98, period, amp, zone).hit).toBe(true);
    expect(judgeTap(edge * 1.02, period, amp, zone).hit).toBe(false);
    expect(judgeTap(-edge * 0.98, period, amp, zone).hit).toBe(true);
    const win = windowMs(period, amp, zone);
    expect(win).toBeCloseTo((2 * edge * period) / (2 * Math.PI));
    const j = judgeTap(edge, period, amp, zone);
    expect(j.offsetMs).toBeCloseTo(win / 2);
    // % der Bahnbreite (Breite = 2 · amp): halber Fangbereich = 10 %
    expect(j.offsetPct).toBeCloseTo((100 * (zone / 2)) / (2 * amp));
  });

  it('ms und Phase hängen linear zusammen, auch weit entfernt von der Mitte', () => {
    const j = judgeTap(Math.PI / 2 - 0.01, period, amp, zone);
    expect(j.hit).toBe(false);
    expect(Math.abs(j.offsetMs)).toBeLessThanOrEqual(period / 4 + 1e-6);
  });

  it('Punkte: näher an der Mitte = mehr, Stufe zählt', () => {
    expect(pointsFor(1, 0, 300)).toBe(20);
    expect(pointsFor(1, 150, 300)).toBe(10);
    expect(pointsFor(1, 500, 300)).toBe(10);
    expect(pointsFor(6, 0, 300)).toBeGreaterThan(pointsFor(1, 0, 300));
  });

  it('Kennzahlen: Trefferquote, mittlere Abweichung, Tendenz', () => {
    const s = computeStats(
      [
        { hit: true, offsetMs: -20, offsetPct: -1 },
        { hit: true, offsetMs: 30, offsetPct: 2 },
        { hit: false, offsetMs: -250, offsetPct: -12 },
        { hit: false, offsetMs: -180, offsetPct: -9 },
      ],
      1,
    );
    expect(s.taps).toBe(4);
    expect(s.hits).toBe(2);
    expect(s.hitRate).toBeCloseTo(40);
    expect(s.meanDevMs).toBeCloseTo((20 + 30 + 250 + 180) / 4);
    expect(s.meanDevPct).toBeCloseTo((1 + 2 + 12 + 9) / 4);
    expect(s.tendencyMs).toBeCloseTo(-100); // Median von −250, −180, −20, 30
    const e = computeStats([], 0);
    expect(e.hitRate).toBe(0);
    expect(e.meanDevMs).toBeNaN();
    expect(e.tendencyMs).toBeNaN();
    expect(computeStats([{ hit: true, offsetMs: 10, offsetPct: 1 }], 0).tendencyMs).toBeNaN();
  });

  it('Tipp: früh, spät, nicht getippt oder stark', () => {
    const mk = (ms: number) => ({ hit: Math.abs(ms) < 50, offsetMs: ms, offsetPct: ms / 20 });
    expect(tipFor(computeStats([mk(-90), mk(-70), mk(-100), mk(10)], 0))).toBe('early');
    expect(tipFor(computeStats([mk(90), mk(70), mk(100), mk(10)], 0))).toBe('late');
    expect(tipFor(computeStats([mk(10), mk(-10), mk(5)], 4))).toBe('none');
    expect(tipFor(computeStats([mk(10), mk(-10), mk(5), mk(20)], 0))).toBe('great');
  });
});
