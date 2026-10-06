import { describe, expect, it } from 'vitest';
import { adviceFor, DEFAULT_CALIBRATION, EMPTY_RESULTS, isComplete, normalizeCalibration, stepShows } from '../../src/binokular/calibration/calibration';
import { Engine } from '../../src/binokular/game/engine';
import { level01 } from '../../src/binokular/levels/level01';
import {
  DEFAULT_COLORS,
  eyeContrast,
  eyeOf,
  filterOf,
  hsvToRgb,
  NEUTRAL_LEVEL,
  resolveColor,
  rgbToHsv,
  rgbToHsvKeep,
  scaleLuminance,
  srgbToLinear,
  throughFilter,
  type VisionSettings,
} from '../../src/binokular/vision/color';
import { cellAt, fitLayout } from '../../src/binokular/vision/renderer';

const base: VisionSettings = {
  amblyopicEye: 'LEFT',
  glasses: 'RED_CYAN',
  leftLens: 'RED',
  amblyopicContrast: 100,
  fellowEyeContrast: 20,
  colors: DEFAULT_COLORS,
};
const lum = (c: { r: number; g: number; b: number }) => srgbToLinear(c.r) + srgbToLinear(c.g) + srgbToLinear(c.b);

describe('Farbzuordnung je Auge (vision/color)', () => {
  it('Filter je Auge folgt der Anaglyphen-Zuordnung', () => {
    expect(filterOf('LEFT', base)).toBe('RED');
    expect(filterOf('RIGHT', base)).toBe('CYAN');
    expect(filterOf('LEFT', { ...base, leftLens: 'OTHER' })).toBe('CYAN');
    expect(filterOf('RIGHT', { ...base, leftLens: 'OTHER' })).toBe('RED');
    expect(filterOf('RIGHT', { ...base, glasses: 'RED_GREEN' })).toBe('GREEN');
  });
  it('AMBLYOPIC → amblyopes Auge, FELLOW → anderes Auge, BOTH → keines', () => {
    expect(eyeOf('AMBLYOPIC', base)).toBe('LEFT');
    expect(eyeOf('FELLOW', base)).toBe('RIGHT');
    expect(eyeOf('BOTH', base)).toBeNull();
    expect(eyeOf('AMBLYOPIC', { ...base, amblyopicEye: 'RIGHT' })).toBe('RIGHT');
  });
  it('AMBLYOPIC nur im Kanal des amblyopen Auges (links Rot): reines Rot, volle Stärke', () => {
    expect(resolveColor('AMBLYOPIC', 1, base)).toEqual({ r: 255, g: 0, b: 0 });
  });
  it('FELLOW nur im Cyan-Kanal, mit 20 % Leuchtdichte', () => {
    const c = resolveColor('FELLOW', 1, base);
    expect(c.r).toBe(0);
    expect(c.g).toBe(c.b);
    expect(srgbToLinear(c.g)).toBeCloseTo(0.2, 2);
  });
  it('vertauschte Zuordnung und rechtes amblyopes Auge', () => {
    const s: VisionSettings = { ...base, amblyopicEye: 'RIGHT', leftLens: 'RED' };
    expect(resolveColor('AMBLYOPIC', 1, s)).toEqual({ r: 0, g: 255, b: 255 });
    expect(resolveColor('FELLOW', 1, s).g).toBe(0);
    expect(resolveColor('FELLOW', 1, s).r).toBeGreaterThan(0);
    const swapped: VisionSettings = { ...base, leftLens: 'OTHER' };
    expect(resolveColor('AMBLYOPIC', 1, swapped)).toEqual({ r: 0, g: 255, b: 255 });
  });
  it('Rot/Grün-Brille: zweite Farbe ist Grün ohne Blau', () => {
    const s: VisionSettings = { ...base, glasses: 'RED_GREEN', fellowEyeContrast: 100 };
    expect(resolveColor('FELLOW', 1, s)).toEqual({ r: 0, g: 255, b: 0 });
  });
  it('BOTH neutral grau und durch beide Filter sichtbar', () => {
    const c = resolveColor('BOTH', 1, base);
    expect(c).toEqual({ r: NEUTRAL_LEVEL, g: NEUTRAL_LEVEL, b: NEUTRAL_LEVEL });
    expect(lum(throughFilter(c, 'RED'))).toBeGreaterThan(0);
    expect(lum(throughFilter(c, 'CYAN'))).toBeGreaterThan(0);
  });
  it('ideale Filter: AMBLYOPIC unsichtbar für das dominante Auge und umgekehrt', () => {
    for (const s of [base, { ...base, amblyopicEye: 'RIGHT' as const }, { ...base, leftLens: 'OTHER' as const }, { ...base, glasses: 'RED_GREEN' as const }]) {
      const amb = resolveColor('AMBLYOPIC', 1, s);
      const fel = resolveColor('FELLOW', 1, { ...s, fellowEyeContrast: 100 });
      const ambEye = s.amblyopicEye;
      const felEye = ambEye === 'LEFT' ? 'RIGHT' : 'LEFT';
      expect(lum(throughFilter(amb, filterOf(felEye, s)))).toBe(0);
      expect(lum(throughFilter(fel, filterOf(ambEye, s)))).toBe(0);
      expect(lum(throughFilter(amb, filterOf(ambEye, s)))).toBeGreaterThan(0);
      expect(lum(throughFilter(fel, filterOf(felEye, s)))).toBeGreaterThan(0);
    }
  });
  it('Kontrast: Augenkontrast × Objektkontrast, linear in der Leuchtdichte, Grenzen 0–100', () => {
    expect(eyeContrast('AMBLYOPIC', { amblyopicContrast: 140, fellowEyeContrast: 20 })).toBe(100);
    expect(eyeContrast('FELLOW', { amblyopicContrast: 100, fellowEyeContrast: -5 })).toBe(0);
    expect(eyeContrast('BOTH', base)).toBe(100);
    const half = resolveColor('AMBLYOPIC', 0.5, { ...base, amblyopicContrast: 50 });
    expect(srgbToLinear(half.r)).toBeCloseTo(0.25, 2);
    expect(resolveColor('FELLOW', 1, { ...base, fellowEyeContrast: 0 })).toEqual({ r: 0, g: 0, b: 0 });
    expect(scaleLuminance({ r: 255, g: 255, b: 255 }, 1)).toEqual({ r: 255, g: 255, b: 255 });
  });
  it('kalibrierte Farben werden verwendet (z. B. Rot mit etwas Blau gegen Übersprechen)', () => {
    const s: VisionSettings = { ...base, colors: { ...DEFAULT_COLORS, red: { r: 230, g: 0, b: 30 } } };
    expect(resolveColor('AMBLYOPIC', 1, s)).toEqual({ r: 230, g: 0, b: 30 });
  });
});

describe('Spiellogik kennt keine Farben', () => {
  it('Szene enthält nur eyeVisibility/contrast, alle drei Klassen kommen vor', () => {
    const scene = new Engine(level01).scene();
    const classes = new Set(scene.objects.map((o) => o.eyeVisibility));
    expect([...classes].sort()).toEqual(['AMBLYOPIC', 'BOTH', 'FELLOW']);
    for (const o of scene.objects) {
      expect(o.contrast).toBeGreaterThanOrEqual(0);
      expect(o.contrast).toBeLessThanOrEqual(1);
      expect(JSON.stringify(o)).not.toMatch(/\brgb\(|"#[0-9a-f]{3,6}"|\bred\b|\bcyan\b|\bgreen\b/i);
    }
  });
});

describe('Kalibrierung', () => {
  it('RGB ↔ HSV', () => {
    expect(rgbToHsv({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 100, v: 100 });
    expect(rgbToHsv({ r: 0, g: 255, b: 255 })).toEqual({ h: 180, s: 100, v: 100 });
    expect(hsvToRgb({ h: 120, s: 100, v: 100 })).toEqual({ r: 0, g: 255, b: 0 });
    for (const c of [{ r: 230, g: 10, b: 40 }, { r: 0, g: 200, b: 180 }, { r: 12, g: 240, b: 30 }]) {
      const back = hsvToRgb(rgbToHsv(c));
      expect(Math.abs(back.r - c.r)).toBeLessThanOrEqual(3);
      expect(Math.abs(back.g - c.g)).toBeLessThanOrEqual(3);
      expect(Math.abs(back.b - c.b)).toBeLessThanOrEqual(3);
    }
  });
  it('Werkswerte, Begrenzung und Rundung beim Laden', () => {
    expect(DEFAULT_CALIBRATION.colors.red).toEqual({ r: 255, g: 0, b: 0 });
    const c = normalizeCalibration({ colors: { red: { r: 300, g: -4, b: 12.6 }, cyan: 'x' }, results: { objectA: 'seen', leftEye: 'quatsch' }, completedAt: 'kein Datum' });
    expect(c.colors.red).toEqual({ r: 255, g: 0, b: 13 });
    expect(c.colors.cyan).toEqual(DEFAULT_COLORS.cyan);
    expect(c.results.objectA).toBe('seen');
    expect(c.results.leftEye).toBeNull();
    expect(c.completedAt).toBeNull();
  });
  it('Schritte: A rot, B zweite Farbe, beide; dann linkes, rechtes Auge, gemeinsam', () => {
    expect(stepShows('objectA').filters).toEqual(['RED']);
    expect(stepShows('objectB').filters).toEqual(['SECOND']);
    expect(stepShows('objectsBoth').filters).toEqual(['RED', 'SECOND']);
    expect(stepShows('leftEye').eyes).toEqual(['LEFT']);
    expect(stepShows('rightEye').eyes).toEqual(['RIGHT']);
    expect(stepShows('commonObject').eyes).toEqual(['BOTH']);
  });
  it('Hinweise aus den Antworten (keine Bewertung der Person)', () => {
    const ok = { objectA: 'seen', objectB: 'seen', objectsBoth: 'both', leftEye: 'left', rightEye: 'right', commonObject: 'both' } as const;
    expect(isComplete(ok)).toBe(true);
    expect(isComplete(EMPTY_RESULTS)).toBe(false);
    expect(adviceFor(ok)).toBe('ok');
    expect(adviceFor({ ...ok, leftEye: 'right', rightEye: 'left' })).toBe('swapLenses');
    expect(adviceFor({ ...ok, rightEye: 'both' })).toBe('crosstalk');
    expect(adviceFor({ ...ok, objectB: 'notSeen' })).toBe('notVisible');
  });
});

describe('Layout und Treffer', () => {
  it('Raster zentriert, Feld unter dem Zeiger', () => {
    const l = fitLayout(16, 7, 1180, 760);
    expect(l.cell).toBe(73);
    expect(cellAt(l, 16, 7, l.ox + 3.5 * l.cell, l.oy + 1.5 * l.cell)).toEqual({ x: 3, y: 1 });
    expect(cellAt(l, 16, 7, 1, 1)).toBeNull();
    // Handy quer: Felder bleiben groß genug zum Antippen
    expect(fitLayout(16, 7, 844, 340).cell).toBeGreaterThanOrEqual(48);
  });
});

describe('HSV-Regler der Kalibrierung: Farbton bleibt erhalten', () => {
  it('Sättigung auf 0 und wieder hoch ergibt dieselbe Farbe (kein Sprung auf Rot)', () => {
    let hsv = rgbToHsvKeep({ r: 0, g: 255, b: 255 }, null); // Cyan
    expect(hsv).toEqual({ h: 180, s: 100, v: 100 });
    hsv = { ...hsv, s: 0 };
    const grey = hsvToRgb(hsv);
    expect(grey).toEqual({ r: 255, g: 255, b: 255 });
    hsv = rgbToHsvKeep(grey, hsv); // Neuzeichnen mit dem grauen RGB-Wert
    expect(hsv.h).toBe(180);
    expect(hsvToRgb({ ...hsv, s: 100 })).toEqual({ r: 0, g: 255, b: 255 });
  });
  it('Helligkeit auf 0 und wieder hoch behält Farbton und Sättigung', () => {
    let hsv = rgbToHsvKeep({ r: 0, g: 255, b: 0 }, null);
    hsv = rgbToHsvKeep(hsvToRgb({ ...hsv, v: 0 }), { ...hsv, v: 0 });
    expect(hsv).toEqual({ h: 120, s: 100, v: 0 });
    expect(hsvToRgb({ ...hsv, v: 100 })).toEqual({ r: 0, g: 255, b: 0 });
  });
  it('kleine Sättigung: Farbton driftet beim schrittweisen Hochziehen nicht', () => {
    let hsv = rgbToHsvKeep({ r: 255, g: 0, b: 0 }, null);
    hsv = { ...hsv, h: 350 };
    for (let s = 1; s <= 100; s++) {
      hsv = { ...hsv, s };
      hsv = rgbToHsvKeep(hsvToRgb(hsv), hsv);
      expect(hsv.h).toBe(350);
    }
  });
  it('RGB-Regler von außen werden übernommen', () => {
    const prev = { h: 180, s: 100, v: 100 };
    expect(rgbToHsvKeep({ r: 255, g: 0, b: 0 }, prev)).toEqual({ h: 0, s: 100, v: 100 });
  });
});

