import { describe, expect, it } from 'vitest';
import {
  DarkCycle,
  darkAlpha,
  darkTotalMs,
  drawWaitMs,
  exposureFor,
  fadeMsFor,
  holdMsFor,
  levelOf,
  MAX_DARK_RATE_HZ,
  MAX_LEVEL,
  MIN_FADE_MS,
  MIN_LEVEL,
  MIN_PERIOD_MS,
  ringHelpFor,
  signDelayFor,
  speedFor,
} from '../../src/exercises/dunkelphasen/logic';

describe('dunkelphasen: harte Sicherheitsgrenzen', () => {
  it('Grenzwerte: Blende ≥ 200 ms, Dunkelphase höchstens alle 2 s (≤ 0,5 Hz)', () => {
    expect(MIN_FADE_MS).toBeGreaterThanOrEqual(200);
    expect(MIN_PERIOD_MS).toBeGreaterThanOrEqual(2000);
    expect(MAX_DARK_RATE_HZ).toBeLessThanOrEqual(0.5);
    expect(MAX_DARK_RATE_HZ).toBe(1000 / MIN_PERIOD_MS);
  });

  it('keine Stufe blendet schneller als 200 ms je Richtung – auch für ungültige Stufen', () => {
    for (let l = -5; l <= 40; l++) {
      expect(fadeMsFor(l)).toBeGreaterThanOrEqual(MIN_FADE_MS);
      expect(holdMsFor(l)).toBeGreaterThanOrEqual(0);
    }
    expect(fadeMsFor(MAX_LEVEL)).toBe(MIN_FADE_MS);
  });

  it('darkAlpha erzwingt selbst bei kleineren Wünschen mindestens 200 ms je Blende', () => {
    // mit gewünschten 10 ms Blendzeit wird trotzdem 200 ms lang weich ausgeblendet
    expect(darkAlpha(100, 10, 300)).toBeCloseTo(0.5, 9);
    expect(darkAlpha(199, 10, 300)).toBeGreaterThan(0);
    expect(darkAlpha(200, 10, 300)).toBeCloseTo(0, 9);
    expect(darkAlpha(200, 10, 300)).toBe(0);
    expect(darkTotalMs(10, 300)).toBe(2 * MIN_FADE_MS + 300);
    expect(darkTotalMs(250, -5)).toBe(500);
  });

  it('Steigung der Helligkeit höchstens π/(2·200 ms): so langsam wie eine Sinusschwingung von ≤ 2,5 Hz', () => {
    for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) {
      const f = fadeMsFor(l);
      const h = holdMsFor(l);
      let prev = darkAlpha(-1, f, h);
      let worst = 0;
      for (let s = 0; s <= darkTotalMs(f, h) + 50; s += 0.5) {
        const a = darkAlpha(s, f, h);
        worst = Math.max(worst, Math.abs(a - prev) / 0.5);
        prev = a;
      }
      expect(worst).toBeLessThanOrEqual(Math.PI / (2 * MIN_FADE_MS) + 1e-6);
    }
  });
});

describe('darkAlpha: sinusförmig aus- und einblenden', () => {
  it('1 → 0 → 1, stetig, je Blende monoton; Dunkel dazwischen', () => {
    const f = 250;
    const h = 400;
    expect(darkAlpha(-50, f, h)).toBe(1);
    expect(darkAlpha(0, f, h)).toBeCloseTo(1, 12);
    expect(darkAlpha(f / 2, f, h)).toBeCloseTo(0.5, 12);
    expect(darkAlpha(f, f, h)).toBeCloseTo(0, 12);
    expect(darkAlpha(f + h / 2, f, h)).toBe(0);
    expect(darkAlpha(f + h, f, h)).toBeCloseTo(0, 12);
    expect(darkAlpha(f + h + f / 2, f, h)).toBeCloseTo(0.5, 12);
    expect(darkAlpha(2 * f + h, f, h)).toBe(1);
    expect(darkAlpha(2 * f + h + 900, f, h)).toBe(1);
    let prev = 1;
    for (let s = 0; s <= f; s += 1) {
      const a = darkAlpha(s, f, h);
      expect(a).toBeLessThanOrEqual(prev + 1e-12);
      prev = a;
    }
    prev = 0;
    for (let s = f + h; s <= 2 * f + h; s += 1) {
      const a = darkAlpha(s, f, h);
      expect(a).toBeGreaterThanOrEqual(prev - 1e-12);
      prev = a;
    }
  });

  it('folgt einer Kosinuswelle (sinusförmig), nicht einer Geraden oder Stufe', () => {
    const f = 300;
    for (const s of [30, 75, 150, 225, 270]) expect(darkAlpha(s, f, 100)).toBeCloseTo(0.5 + 0.5 * Math.cos((Math.PI * s) / f), 12);
  });
});

describe('dunkelphasen: Stufenfunktionen', () => {
  it('werden mit der Stufe schwerer', () => {
    for (let l = MIN_LEVEL + 1; l <= MAX_LEVEL; l++) {
      expect(holdMsFor(l)).toBeGreaterThan(holdMsFor(l - 1));
      expect(fadeMsFor(l)).toBeLessThanOrEqual(fadeMsFor(l - 1));
      expect(signDelayFor(l)).toBeLessThan(signDelayFor(l - 1));
      expect(speedFor(l)).toBeGreaterThan(speedFor(l - 1));
      expect(exposureFor(l)).toBeLessThanOrEqual(exposureFor(l - 1));
    }
  });

  it('Bereiche: Dunkelphase ≤ 1,2 s, Tempo ≤ 35 u/s, Zeichen erst nach dem Wiederauftauchen', () => {
    for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) {
      expect(darkTotalMs(fadeMsFor(l), holdMsFor(l))).toBeLessThan(MIN_PERIOD_MS - 500);
      expect(signDelayFor(l)).toBeGreaterThanOrEqual(250);
    }
    expect(holdMsFor(1)).toBe(200);
    expect(speedFor(MAX_LEVEL)).toBeLessThan(35);
    expect(exposureFor(MAX_LEVEL)).toBeGreaterThanOrEqual(340);
  });

  it('Einstiegshilfe (Umriss im Dunkeln): Stufen 1–3 voll, bis Stufe 8 ausgeblendet', () => {
    expect(ringHelpFor(1)).toBeGreaterThan(0.15);
    expect(ringHelpFor(3)).toBeGreaterThan(0.1);
    expect(ringHelpFor(8)).toBe(0);
    expect(ringHelpFor(20)).toBe(0);
    for (let l = 2; l <= 20; l++) expect(ringHelpFor(l)).toBeLessThanOrEqual(ringHelpFor(l - 1));
    expect(ringHelpFor(1)).toBeLessThan(0.3);
  });

  it('begrenzt Stufen; Wartezeit nach einem Durchgang 0,3–0,9 s', () => {
    expect(levelOf(-3)).toBe(MIN_LEVEL);
    expect(levelOf(77)).toBe(MAX_LEVEL);
    expect(drawWaitMs(0)).toBe(300);
    expect(drawWaitMs(1)).toBe(900);
    expect(drawWaitMs(5)).toBe(900);
  });
});

describe('DarkCycle: Dunkel-Takt mit hartem Limit', () => {
  it('lehnt einen zweiten Beginn vor Ablauf von 2 s ab', () => {
    const c = new DarkCycle();
    expect(c.canStart(0)).toBe(true);
    expect(c.start(0, 300, 300)).toBe(true);
    expect(c.count).toBe(1);
    for (const t of [1, 100, 899, 900, 1500, 1999]) {
      expect(c.canStart(t)).toBe(false);
      expect(c.start(t, 300, 300)).toBe(false);
    }
    expect(c.count).toBe(1);
    expect(c.canStart(2000)).toBe(true);
    expect(c.start(2000, 300, 300)).toBe(true);
    expect(c.count).toBe(2);
  });

  it('auch bei Dauerbeschuss mit Anfragen in jedem Bild (30–240 Hz, alle Stufen) nie schneller als 0,5 Hz', () => {
    for (const fps of [30, 60, 144, 240]) {
      for (let l = MIN_LEVEL; l <= MAX_LEVEL; l += 3) {
        const c = new DarkCycle();
        const starts: number[] = [];
        const dt = 1000 / fps;
        for (let t = 0; t < 120_000; t += dt) if (c.start(t, fadeMsFor(l), holdMsFor(l))) starts.push(t);
        expect(starts.length).toBeGreaterThan(40);
        for (let i = 1; i < starts.length; i++) expect(starts[i] - starts[i - 1]).toBeGreaterThanOrEqual(MIN_PERIOD_MS);
        const rate = (starts.length - 1) / ((starts[starts.length - 1] - starts[0]) / 1000);
        expect(rate).toBeLessThanOrEqual(MAX_DARK_RATE_HZ + 1e-9);
      }
    }
  });

  it('erzwingt mindestens 200 ms je Blende, auch bei kleinerer Anforderung, und Hold ≥ 0', () => {
    const c = new DarkCycle();
    expect(c.start(0, 20, -50)).toBe(true);
    expect(c.fadeMs).toBe(MIN_FADE_MS);
    expect(c.holdMs).toBe(0);
    expect(c.totalMs).toBe(2 * MIN_FADE_MS);
    expect(c.alpha(MIN_FADE_MS / 2)).toBeCloseTo(0.5, 9);
  });

  it('Sichtbarkeit: vor dem ersten Beginn 1, während der Dunkelphase 0…1, danach wieder 1; isActive stimmt', () => {
    const c = new DarkCycle();
    expect(c.alpha(123)).toBe(1);
    expect(c.isActive(123)).toBe(false);
    c.start(1000, 300, 200);
    expect(c.lastStart).toBe(1000);
    expect(c.isActive(1000)).toBe(true);
    expect(c.alpha(1000)).toBeCloseTo(1, 12);
    expect(c.alpha(1300)).toBeCloseTo(0, 12);
    expect(c.alpha(1400)).toBe(0);
    expect(c.alpha(1500)).toBeCloseTo(0, 12);
    expect(c.isActive(1000 + c.totalMs - 1)).toBe(true);
    expect(c.isActive(1000 + c.totalMs)).toBe(false);
    expect(c.alpha(1000 + c.totalMs)).toBe(1);
  });
});
