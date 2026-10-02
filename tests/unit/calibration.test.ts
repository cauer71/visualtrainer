/**
 * Kalibrierung cm ↔ Pixel ↔ Sehwinkel (Formeln wie makeCalib im Labor-Prototyp) und Begrenzung auf die Bühne.
 */
import { describe, expect, it } from 'vitest';
import {
  buildCalib,
  calibOf,
  CARD_LONG_CM,
  CARD_SHORT_CM,
  cmToDeg,
  DEFAULT_PX_PER_CM,
  DEFAULT_VIEW_DISTANCE_CM,
  degToCm,
  makeCalib,
  maxCmFor,
  pxPerCmFromRef,
  sanitizeCalib,
  STAGE_FRACTION,
} from '../../src/core/calib';
import { getCalibSettings, getSettings, resetCalibSettings, setCalibSettings, updateSettings } from '../../src/core/storage';
import { createFormatter } from '../../src/core/format';
import { createRng } from '../../src/core/rng';
import { Runner } from '../../src/core/runner';
import type { ExerciseDefinition } from '../../src/core/types';

describe('Formeln', () => {
  it('Sehwinkel: 2 · atan(Größe / (2 · Abstand)); bei 60 cm sind 1,05 cm etwa 1 Grad', () => {
    expect(cmToDeg(1.0472, 60)).toBeCloseTo(1, 2);
    expect(cmToDeg(5, 40)).toBeCloseTo((2 * Math.atan(5 / 80) * 180) / Math.PI, 12);
    expect(cmToDeg(0, 40)).toBe(0);
  });

  it('Rückrechnung ist die Umkehrung (Winkel ↔ Größe), für jede Sehentfernung 30–100 cm', () => {
    for (const d of [30, 40, 60, 100]) {
      for (const deg of [0.5, 1, 5, 10, 30]) expect(cmToDeg(degToCm(deg, d), d)).toBeCloseTo(deg, 9);
    }
    expect(degToCm(10, 40)).toBeCloseTo(2 * 40 * Math.tan((10 * Math.PI) / 360), 12);
  });

  it('Pixel ↔ cm: cmToPx und pxToCm sind Umkehrungen', () => {
    const c = buildCalib(47.8, 50, true);
    expect(c.cmToPx(5)).toBeCloseTo(239, 9);
    expect(c.pxToCm(c.cmToPx(3.3))).toBeCloseTo(3.3, 12);
    expect(c.cmToDeg(5)).toBeCloseTo(cmToDeg(5, 50), 12);
    expect(c.degToCm(2)).toBeCloseTo(degToCm(2, 50), 12);
    expect(c.pxPerCm).toBe(47.8);
    expect(c.viewDistanceCm).toBe(50);
    expect(c.calibrated).toBe(true);
  });

  it('Bankkarte: Pixel pro cm aus der eingestellten Breite', () => {
    expect(pxPerCmFromRef(342, CARD_LONG_CM)).toBeCloseTo(39.95, 2);
    expect(pxPerCmFromRef(216, CARD_SHORT_CM)).toBeCloseTo(40, 6);
    expect(pxPerCmFromRef(CARD_LONG_CM * 38)).toBeCloseTo(38, 9);
  });

  it('ungültige Werte sind verboten', () => {
    expect(() => buildCalib(0, 40, true)).toThrow();
    expect(() => buildCalib(38, -1, true)).toThrow();
    expect(() => buildCalib(Number.NaN, 40, true)).toThrow();
  });
});

describe('Voreinstellung und Bereinigung', () => {
  it('ohne Kalibrierung: Schätzung 38 px/cm, 40 cm, calibrated = false – alles funktioniert', () => {
    const c = makeCalib(null);
    expect(c.pxPerCm).toBe(DEFAULT_PX_PER_CM);
    expect(c.pxPerCm).toBe(38);
    expect(c.viewDistanceCm).toBe(DEFAULT_VIEW_DISTANCE_CM);
    expect(c.viewDistanceCm).toBe(40);
    expect(c.calibrated).toBe(false);
    expect(makeCalib({ pxPerCm: null, viewDistanceCm: 40 }).calibrated).toBe(false);
    expect(makeCalib({ pxPerCm: 52.5, viewDistanceCm: 40 }).calibrated).toBe(true);
  });

  it('gespeicherte Werte werden bereinigt: unplausible Pixel pro cm → nicht kalibriert, Abstand 30–100 cm, ganze cm', () => {
    expect(sanitizeCalib({ pxPerCm: 50, viewDistanceCm: 55.4 })).toEqual({ pxPerCm: 50, viewDistanceCm: 55 });
    expect(sanitizeCalib({ pxPerCm: 1, viewDistanceCm: 5 })).toEqual({ pxPerCm: null, viewDistanceCm: 30 });
    expect(sanitizeCalib({ pxPerCm: 9999, viewDistanceCm: 500 })).toEqual({ pxPerCm: null, viewDistanceCm: 100 });
    expect(sanitizeCalib({ pxPerCm: 'x', viewDistanceCm: 'y' })).toEqual({ pxPerCm: null, viewDistanceCm: 40 });
    expect(sanitizeCalib(null)).toEqual({ pxPerCm: null, viewDistanceCm: 40 });
    expect(sanitizeCalib(undefined)).toEqual({ pxPerCm: null, viewDistanceCm: 40 });
    expect(sanitizeCalib({ pxPerCm: Number.NaN, viewDistanceCm: Number.NaN })).toEqual({ pxPerCm: null, viewDistanceCm: 40 });
  });

  it('calibOf: ohne Kalibrierung im Kontext (ältere Test-Attrappen) gilt die Schätzung für die Bühne', () => {
    const c = calibOf({ stage: { w: 800, h: 600, u: 6, dpr: 1 } });
    expect(c.calibrated).toBe(false);
    expect(c.pxPerCm).toBe(38);
    expect(c.maxCm()).toBeCloseTo((0.9 * 600) / 38, 9);
    const given = buildCalib(40, 40, true);
    expect(calibOf({ calib: given, stage: { w: 1, h: 1, u: 1, dpr: 1 } })).toBe(given);
  });
});

describe('Begrenzung auf die Bühne (nie sprengen)', () => {
  const stage = { w: 390, h: 700 };
  const c = buildCalib(38, 40, false, stage);

  it('kleine Größen bleiben unverändert', () => {
    expect(c.sizePx(5)).toBeCloseTo(190, 9);
    expect(c.fitCm(5)).toBeCloseTo(5, 9);
    expect(c.isLimited(5)).toBe(false);
  });

  it('Größen über 0,9 × kürzere Seite werden geklemmt (Handy hochkant 390 px → 351 px)', () => {
    expect(STAGE_FRACTION).toBe(0.9);
    expect(c.sizePx(15)).toBeCloseTo(0.9 * 390, 9);
    expect(c.fitCm(15)).toBeCloseTo((0.9 * 390) / 38, 9);
    expect(c.isLimited(15)).toBe(true);
    expect(c.maxCm()).toBeCloseTo(c.fitCm(1000), 9);
    expect(c.isLimited(c.maxCm())).toBe(false);
    expect(c.isLimited(c.maxCm() + 0.01)).toBe(true);
    // die reine Umrechnung wird nie begrenzt
    expect(c.cmToPx(15)).toBeCloseTo(570, 9);
  });

  it('folgt der Bühne live (Tablet gedreht)', () => {
    const live = { w: 1180, h: 820 };
    const cc = buildCalib(38, 40, false, live);
    expect(cc.isLimited(15)).toBe(false); // 570 px ≤ 738 px
    live.w = 820;
    live.h = 1180;
    expect(cc.isLimited(15)).toBe(false);
    live.w = 360;
    live.h = 640;
    expect(cc.isLimited(15)).toBe(true);
    expect(cc.sizePx(15)).toBeCloseTo(324, 9);
  });

  it('maxCmFor: größte Größe auf einer Bühne', () => {
    expect(maxCmFor(40, 400)).toBeCloseTo(9, 9);
  });

  it('ohne Bühne wird nie begrenzt', () => {
    const free = buildCalib(38, 40, false);
    expect(free.isLimited(1000)).toBe(false);
    expect(free.sizePx(1000)).toBe(38000);
  });
});

describe('Speicherung (lokal)', () => {
  it('Standard: nicht kalibriert; ältere Datenstände haben kein calib', () => {
    expect(getSettings().calib).toBeUndefined();
    expect(getCalibSettings()).toEqual({ pxPerCm: null, viewDistanceCm: 40 });
  });

  it('speichern, lesen, bereinigen, zurücksetzen; andere Einstellungen bleiben', () => {
    const before = getSettings();
    expect(setCalibSettings({ pxPerCm: 47.83, viewDistanceCm: 55 })).toEqual({ pxPerCm: 47.83, viewDistanceCm: 55 });
    expect(getCalibSettings()).toEqual({ pxPerCm: 47.83, viewDistanceCm: 55 });
    expect(setCalibSettings({ pxPerCm: 47.83, viewDistanceCm: 5 }).viewDistanceCm).toBe(30);
    expect(getSettings().sound).toBe(before.sound);
    updateSettings({ sound: !before.sound });
    expect(getCalibSettings().pxPerCm).toBe(47.83);
    updateSettings({ sound: before.sound });
    expect(resetCalibSettings()).toEqual({ pxPerCm: null, viewDistanceCm: 40 });
    expect(getCalibSettings()).toEqual({ pxPerCm: null, viewDistanceCm: 40 });
  });

  it('beschädigt gespeicherte Werte (Text statt Zahl) → nicht kalibriert', () => {
    updateSettings({ calib: { pxPerCm: 'viel' as unknown as number, viewDistanceCm: 'weit' as unknown as number } });
    expect(getCalibSettings()).toEqual({ pxPerCm: null, viewDistanceCm: 40 });
    resetCalibSettings();
  });
});

describe('Runner reicht params und calib an die Übung weiter', () => {
  function withFakeDom<T>(fn: () => T): T {
    const g = globalThis as unknown as Record<string, unknown>;
    const saved = { document: g.document, window: g.window, ResizeObserver: g.ResizeObserver, rAF: g.requestAnimationFrame, cAF: g.cancelAnimationFrame, matchMedia: g.matchMedia };
    const canvas = {
      style: {} as Record<string, string>,
      width: 0,
      height: 0,
      className: '',
      setAttribute: () => {},
      remove: () => {},
      getContext: () => new Proxy({}, { get: () => () => undefined, set: () => true }),
      addEventListener: () => {},
      removeEventListener: () => {},
      getBoundingClientRect: () => ({ left: 0, top: 0, width: 800, height: 400 }),
    };
    g.document = { createElement: () => canvas };
    g.window = { devicePixelRatio: 1, addEventListener: () => {}, removeEventListener: () => {} };
    g.ResizeObserver = undefined;
    g.requestAnimationFrame = () => 0;
    g.cancelAnimationFrame = () => {};
    g.matchMedia = undefined;
    try {
      return fn();
    } finally {
      g.document = saved.document;
      g.window = saved.window;
      g.ResizeObserver = saved.ResizeObserver;
      g.requestAnimationFrame = saved.rAF;
      g.cancelAnimationFrame = saved.cAF;
      g.matchMedia = saved.matchMedia;
    }
  }

  const seen: Array<{ params?: unknown; calib?: ReturnType<typeof makeCalib> }> = [];
  const def: ExerciseDefinition = {
    id: 'probe',
    category: 'reaktion',
    minutes: 1,
    color: '#000',
    icon: '',
    texts: { de: { title: 't', tagline: 't', steps: [], why: '', goodFor: [], captions: {}, metrics: {}, tips: {}, feedback: {} }, it: { title: 't', tagline: 't', steps: [], why: '', goodFor: [], captions: {}, metrics: {}, tips: {}, feedback: {} } },
    params: [
      { key: 'a', type: 'number', min: 1, max: 5, step: 1, default: 2 },
      { key: 'b', type: 'select', default: 'x', options: ['x', 'y'] },
    ],
    create: (ctx) => {
      seen.push({ params: ctx.params, calib: ctx.calib });
      return { start() {}, update() {}, render() {} };
    },
  };
  const host = { appendChild: () => {}, getBoundingClientRect: () => ({ left: 0, top: 0, width: 800, height: 400 }) } as unknown as HTMLElement;
  const base = { host, def, lang: 'de' as const, startLevel: null, sfx: { tick() {}, go() {}, good() {}, bad() {}, tap() {}, done() {} }, onFinish() {} };

  it('Spielmodus: bereinigte Einstellungen und Kalibrierung des Geräts', () => {
    withFakeDom(() => {
      new Runner({ ...base, mode: 'play', params: { a: 99, b: 'z', fremd: 1 }, calib: { pxPerCm: 50, viewDistanceCm: 60 } });
    });
    expect(seen[0].params).toEqual({ a: 5, b: 'x' });
    expect(seen[0].calib?.pxPerCm).toBe(50);
    expect(seen[0].calib?.viewDistanceCm).toBe(60);
    expect(seen[0].calib?.calibrated).toBe(true);
  });

  it('Spielmodus ohne gespeicherte Werte: Standard und Schätzung', () => {
    withFakeDom(() => {
      new Runner({ ...base, mode: 'play' });
    });
    expect(seen[1].params).toEqual({ a: 2, b: 'x' });
    expect(seen[1].calib?.pxPerCm).toBe(38);
    expect(seen[1].calib?.calibrated).toBe(false);
  });

  it('Intro-Film: immer Standardwerte, eigene Skala für die kleine Bühne (nie „kalibriert“)', () => {
    withFakeDom(() => {
      new Runner({ ...base, mode: 'demo', params: { a: 5, b: 'y' }, calib: { pxPerCm: 50, viewDistanceCm: 60 } });
    });
    expect(seen[2].params).toEqual({ a: 2, b: 'x' });
    expect(seen[2].calib?.calibrated).toBe(false);
    expect(seen[2].calib?.viewDistanceCm).toBe(60);
    // Bühne 800 × 400 → etwa 13 cm hoch
    expect(seen[2].calib?.pxPerCm).toBeCloseTo(400 / 13, 6);
  });

  it('Übung ohne params bekommt ein leeres Objekt', () => {
    withFakeDom(() => {
      new Runner({ ...base, def: { ...def, params: undefined }, mode: 'play', params: { a: 3 } });
    });
    expect(seen[3].params).toEqual({});
  });

  it('Formatter und Zufall bleiben unverändert verfügbar (Importe)', () => {
    expect(createFormatter('de').num(1.5, 1)).toBe('1,5');
    expect(createRng(1).next()).toBeGreaterThanOrEqual(0);
  });
});
