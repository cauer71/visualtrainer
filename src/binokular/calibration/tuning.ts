/**
 * Feinabstimmung nach Auge (Kalibrierung, Schritt 5): Reglerwerte ↔ Palette.
 *
 * Regler:
 *  - Hintergrund rot (0–70): sRGB-Wert des Rotkanals im Hintergrund,
 *  - Hintergrund Zweitfarbe (0–40): sRGB-Wert des stärkeren Kanals der Zweitfarbe im Hintergrund; der andere Kanal
 *    folgt im Verhältnis der Zweitfarbe (in linearem Licht, wie in der Berechnung: Hintergrund = (r, t·g, t·b)),
 *  - Helligkeit der Zweitfarbe (5–100 %): lineare Skalierung der Zweitfarbe (nicht gerundet, damit Profilwerte
 *    beim Öffnen unverändert bleiben),
 *  - Rotwert (80–255): sRGB-Wert des roten Objekts.
 */
import { clampByte, linearToSrgb, srgbToLinear, type Glasses, type Palette, type RGB } from '../vision/color';

export interface Tuning {
  bgRed: number;
  bgSecond: number;
  /** Zweitfarbe bei voller Helligkeit (stärkster Kanal = 255) */
  secondBase: RGB;
  /** 5–100 % (linear) */
  secondLevel: number;
  redValue: number;
}

export const TUNING_RANGE = {
  bgRed: { min: 0, max: 70 },
  bgSecond: { min: 0, max: 40 },
  secondLevel: { min: 5, max: 100 },
  redValue: { min: 80, max: 255 },
} as const;

const clampTo = (v: number, r: { min: number; max: number }) => Math.round(clampRaw(v, r));
const clampRaw = (v: number, r: { min: number; max: number }) => Math.min(r.max, Math.max(r.min, Number.isFinite(v) ? v : r.max));

function defaultBase(mode: Glasses): RGB {
  return mode === 'RED_CYAN' ? { r: 0, g: 0, b: 255 } : { r: 0, g: 255, b: 0 };
}

export function tuningFromPalette(p: Palette, mode: Glasses): Tuning {
  const gl = srgbToLinear(p.second.g);
  const bl = srgbToLinear(p.second.b);
  const m = Math.max(gl, bl);
  const secondBase = m > 0 ? { r: 0, g: clampByte(linearToSrgb(gl / m)), b: clampByte(linearToSrgb(bl / m)) } : defaultBase(mode);
  return {
    bgRed: clampTo(p.background.r, TUNING_RANGE.bgRed),
    bgSecond: clampTo(Math.max(p.background.g, p.background.b), TUNING_RANGE.bgSecond),
    secondBase,
    secondLevel: clampRaw(m > 0 ? m * 100 : 100, TUNING_RANGE.secondLevel),
    redValue: clampTo(p.red.r, TUNING_RANGE.redValue),
  };
}

export function paletteFromTuning(t: Tuning): Palette {
  const gl = srgbToLinear(t.secondBase.g);
  const bl = srgbToLinear(t.secondBase.b);
  const m = Math.max(gl, bl) || 1;
  const k = clampRaw(t.secondLevel, TUNING_RANGE.secondLevel) / 100;
  const bgLin = srgbToLinear(clampTo(t.bgSecond, TUNING_RANGE.bgSecond));
  return {
    red: { r: clampTo(t.redValue, TUNING_RANGE.redValue), g: 0, b: 0 },
    second: { r: 0, g: clampByte(linearToSrgb((gl / m) * k)), b: clampByte(linearToSrgb((bl / m) * k)) },
    background: {
      r: clampTo(t.bgRed, TUNING_RANGE.bgRed),
      g: clampByte(linearToSrgb((bgLin * gl) / m)),
      b: clampByte(linearToSrgb((bgLin * bl) / m)),
    },
  };
}
