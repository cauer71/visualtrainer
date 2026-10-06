import { describe, expect, it } from 'vitest';
import { BASE_HUE, centerOf, chooseFallback, fineColorOf, fineVariants, MIN_V } from '../../src/binokular/calibration/fine';
import { rgbToHsv } from '../../src/binokular/vision/color';

describe('Feinkalibrierung per Auswahl', () => {
  it('Runde 1: 3 × 3 Kästen um die Grundfarbe, Sättigung immer 100 %, oberste Zeile volle Helligkeit', () => {
    for (const c of ['red', 'cyan', 'green'] as const) {
      const v = fineVariants(c, 1, { hue: 77, v: 40 }); // Mittelpunkt wird in Runde 1 ignoriert
      expect(v).toHaveLength(9);
      expect(v.map((x) => x.nr)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(v[1]).toMatchObject({ hue: BASE_HUE[c], v: 100 });
      for (const x of v) expect(rgbToHsv(x.rgb).s).toBe(100);
      expect(new Set(v.map((x) => `${x.rgb.r},${x.rgb.g},${x.rgb.b}`)).size).toBe(9);
    }
  });
  it('Rot: Farbton geht über 0° hinweg (348°, 0°, 12°)', () => {
    expect(fineVariants('red', 1, { hue: 0, v: 100 }).slice(0, 3).map((x) => x.hue)).toEqual([348, 0, 12]);
  });
  it('Runde 2 liegt enger um die Wahl aus Runde 1 und bleibt über der Mindesthelligkeit', () => {
    const v = fineVariants('cyan', 2, { hue: 192, v: 60 });
    expect(v.map((x) => x.hue).slice(0, 3)).toEqual([187, 192, 197]);
    expect(v.map((x) => x.v).filter((_, i) => i % 3 === 0)).toEqual([68, 60, 52]);
    const low = fineVariants('cyan', 2, { hue: 180, v: MIN_V });
    for (const x of low) expect(x.v).toBeGreaterThanOrEqual(MIN_V);
    expect(new Set(low.map((x) => x.v)).size).toBe(3);
  });
  it('Mittelpunkt aus gespeicherter Farbe; Grau fällt auf die Grundfarbe zurück', () => {
    expect(centerOf('cyan', { r: 0, g: 255, b: 255 })).toEqual({ hue: 180, v: 100 });
    expect(centerOf('red', { r: 200, g: 200, b: 200 })).toEqual({ hue: 0, v: 100 });
  });
  it('„Keiner verschwindet“ nimmt den dunkelsten Kasten der mittleren Spalte', () => {
    const v = fineVariants('green', 1, { hue: 120, v: 100 });
    expect(chooseFallback(v)).toMatchObject({ nr: 8, hue: 120, v: 60 });
  });
  it('Filterfarbe → Farbschlüssel', () => {
    expect([fineColorOf('RED'), fineColorOf('CYAN'), fineColorOf('GREEN')]).toEqual(['red', 'cyan', 'green']);
  });
});
