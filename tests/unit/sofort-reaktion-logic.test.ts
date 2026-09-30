import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  ANTICIPATION_MS,
  computeStats,
  FAST_MS,
  glowAlpha,
  judge,
  LAPSE_MS,
  ONSET_RAMP_MS,
  pointsFor,
  savedLevel,
  tipFor,
  waitMs,
} from '../../src/exercises/sofort-reaktion/logic';

describe('sofort-reaktion: Vorperiode', () => {
  it('mindestens 0,9 s, höchstens 4,4 s, nicht alternd, nicht auf wenige Werte verteilt', () => {
    const rng = createRng(123);
    const xs: number[] = [];
    for (let i = 0; i < 6000; i++) xs.push(waitMs(rng));
    expect(Math.min(...xs)).toBeGreaterThanOrEqual(900);
    expect(Math.max(...xs)).toBeLessThanOrEqual(900 + 3500);
    const surv = (from: number, len: number) => {
      const alive = xs.filter((x) => x > from);
      return alive.filter((x) => x > from + len).length / alive.length;
    };
    expect(Math.abs(surv(900, 800) - surv(1700, 800))).toBeLessThan(0.07);
    expect(new Set(xs.map((x) => Math.round(x / 10))).size).toBeGreaterThan(200);
    // Mittelwert ≈ 0,9 s + knapp 1,1 s (Kappung senkt ihn etwas)
    const mean = xs.reduce((a, b) => a + b, 0) / xs.length;
    expect(mean).toBeGreaterThan(1850);
    expect(mean).toBeLessThan(2150);
  });
});

describe('sofort-reaktion: weiches Aufleuchten', () => {
  it('steigt monoton von 0 auf 1 in der Rampenzeit, Rampe mindestens 100 ms', () => {
    expect(ONSET_RAMP_MS).toBeGreaterThanOrEqual(100);
    expect(glowAlpha(-5)).toBe(0);
    expect(glowAlpha(0)).toBe(0);
    expect(glowAlpha(ONSET_RAMP_MS)).toBe(1);
    expect(glowAlpha(5000)).toBe(1);
    let prev = 0;
    for (let a = 0; a <= ONSET_RAMP_MS; a += 5) {
      expect(glowAlpha(a)).toBeGreaterThanOrEqual(prev);
      prev = glowAlpha(a);
    }
    // kein harter Sprung: in den ersten 5 ms weniger als 20 % Helligkeit
    expect(glowAlpha(5)).toBeLessThan(0.2);
  });
});

describe('sofort-reaktion: Antizipations-Erkennung', () => {
  it('Tipp vor dem Licht und unter 100 ms ist Frühstart, 100–149 ms auffallend schnell', () => {
    expect(ANTICIPATION_MS).toBe(100);
    expect(judge(null)).toBe('early');
    expect(judge(-10)).toBe('early');
    expect(judge(99)).toBe('early');
    expect(judge(100)).toBe('fast');
    expect(judge(FAST_MS - 1)).toBe('fast');
    expect(judge(FAST_MS)).toBe('ok');
    expect(judge(320)).toBe('ok');
  });
});

describe('sofort-reaktion: Auswertung', () => {
  it('Median, Streuung (IQR), Zähler', () => {
    const rts = [250, 260, 270, 280, 290, 300, 310, 900];
    const s = computeStats(rts, 2, 1);
    expect(s.medianMs).toBe(285);
    expect(s.spreadMs).toBeCloseTo(35, 5);
    expect(s.valid).toBe(8);
    expect(s.early).toBe(2);
    expect(s.missed).toBe(1);
    expect(s.fast).toBe(0);
    expect(computeStats([120, 130, 140, 300], 0, 0).fast).toBe(3);
    const e = computeStats([], 0, 0);
    expect(Number.isNaN(e.medianMs)).toBe(true);
    expect(Number.isNaN(e.spreadMs)).toBe(true);
  });

  it('Tipps in fester Reihenfolge', () => {
    const base = computeStats([250, 255, 260, 265, 270, 275], 0, 0);
    expect(tipFor(base)).toBe('relaxed');
    expect(tipFor({ ...base, early: 2, fast: 5 })).toBe('early');
    expect(tipFor({ ...base, fast: 3 })).toBe('guess');
    expect(tipFor({ ...base, missed: 2 })).toBe('focus');
    expect(tipFor(computeStats([200, 220, 400, 600, 240, 700], 0, 0))).toBe('steady');
  });

  it('Punkte und gespeicherter Wert bleiben in Grenzen', () => {
    expect(pointsFor(250)).toBeGreaterThan(pointsFor(600));
    expect(pointsFor(5000)).toBe(10);
    expect(pointsFor(0)).toBe(25);
    expect(savedLevel(283.4)).toBe(283);
    expect(savedLevel(NaN)).toBe(LAPSE_MS);
    expect(savedLevel(20)).toBe(100);
    expect(savedLevel(99999)).toBe(LAPSE_MS);
  });
});
