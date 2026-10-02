// EYE-EXPERIMENT: Helligkeitsprüfung des Kamerabilds (zu dunkel / überstrahlt / mögliche Spiegelung) – rein.
import type { Box } from './features';

export interface LumaStats {
  /** mittlere Helligkeit 0..255 */
  mean: number;
  /** Anteil sehr heller Pixel (≥ 245) 0..1 */
  brightFrac: number;
  /** Anteil sehr dunkler Pixel (≤ 12) 0..1 */
  darkFrac: number;
}

/** Helligkeit eines RGBA-Bilds (optional nur in einem normierten Rechteck). */
export function lumaStats(rgba: ArrayLike<number>, w: number, h: number, box?: Box): LumaStats {
  const x0 = Math.max(0, Math.floor((box?.x0 ?? 0) * w));
  const x1 = Math.min(w, Math.ceil((box?.x1 ?? 1) * w));
  const y0 = Math.max(0, Math.floor((box?.y0 ?? 0) * h));
  const y1 = Math.min(h, Math.ceil((box?.y1 ?? 1) * h));
  let sum = 0;
  let bright = 0;
  let dark = 0;
  let n = 0;
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const i = (y * w + x) * 4;
      const l = 0.2126 * rgba[i] + 0.7152 * rgba[i + 1] + 0.0722 * rgba[i + 2];
      sum += l;
      if (l >= 245) bright++;
      if (l <= 12) dark++;
      n++;
    }
  }
  if (!n) return { mean: NaN, brightFrac: 0, darkFrac: 0 };
  return { mean: sum / n, brightFrac: bright / n, darkFrac: dark / n };
}

export type BrightnessAdvice = 'ok' | 'dark' | 'bright';

/** Zu dunkel: mittlere Helligkeit des Gesichts < 70; überstrahlt: > 205 oder ≥ 20 % der Pixel fast weiß. */
export function brightnessAdvice(face: LumaStats): BrightnessAdvice {
  if (!Number.isFinite(face.mean)) return 'ok';
  if (face.mean < 70) return 'dark';
  if (face.mean > 205 || face.brightFrac >= 0.2) return 'bright';
  return 'ok';
}

/** Vorsichtiger Hinweis auf mögliche Spiegelungen (z. B. Brille): viele fast weiße Pixel in den Augenrechtecken. */
export function reflectionLikely(eyeBoxes: readonly LumaStats[]): boolean {
  return eyeBoxes.some((e) => e.brightFrac >= 0.04);
}
