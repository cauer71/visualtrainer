/**
 * Feinkalibrierung der Grundfarben durch Auswahl statt Regler (wie „besser so oder so?“ beim Augenoptiker).
 *
 * Für jede Grundfarbe (Rot und die zweite Farbe der Brille) zeigt die Kalibrierung ein Raster aus 3 × 3 Kästen:
 * Farbton leicht verschoben (Spalten) × Helligkeit (Zeilen), Sättigung immer 100 % (weniger Sättigung mischt Weiß
 * bei und macht die Farbe für das andere Auge sichtbar).
 *   Schritt 1 „Verschwinden“: mit dem Auge hinter dem ANDEREN Glas schauen und alle Kästen antippen, die man
 *            nicht oder kaum sieht (Übersprechen gering).
 *   Schritt 2 „Deutlich“: mit dem Auge hinter dem PASSENDEN Glas unter den markierten den deutlichsten wählen.
 * Runde 1 grob, Runde 2 fein um die Wahl herum. Ergebnis = gewählter Kasten der Runde 2.
 */
import { hsvToRgb, rgbToHsv, type FilterColor, type RGB } from '../vision/color';

export type FineColor = 'red' | 'cyan' | 'green';
export type FineRound = 1 | 2;

export interface FineVariant {
  /** 1–9, Lesereihenfolge (Zeile für Zeile) */
  nr: number;
  hue: number;
  v: number;
  rgb: RGB;
}

export const BASE_HUE: Record<FineColor, number> = { red: 0, cyan: 180, green: 120 };

/** Farbton-Versatz und Helligkeitsstufen je Runde */
export const ROUND_STEPS: Record<FineRound, { hue: number; v: number }> = {
  1: { hue: 12, v: 20 },
  2: { hue: 5, v: 8 },
};
/** Untergrenze der Helligkeit: darunter sieht auch das passende Auge die Farbe kaum noch */
export const MIN_V = 35;

export function fineColorOf(f: FilterColor): FineColor {
  return f === 'RED' ? 'red' : f === 'CYAN' ? 'cyan' : 'green';
}

const wrapHue = (h: number): number => ((Math.round(h) % 360) + 360) % 360;
const clampV = (v: number): number => Math.max(MIN_V, Math.min(100, Math.round(v)));

/** Mittelpunkt (Farbton, Helligkeit) einer gespeicherten Farbe; graue/schwarze Werte fallen auf die Grundfarbe zurück */
export function centerOf(color: FineColor, rgb: RGB): { hue: number; v: number } {
  const hsv = rgbToHsv(rgb);
  if (hsv.s < 50 || hsv.v === 0) return { hue: BASE_HUE[color], v: 100 };
  return { hue: hsv.h, v: clampV(hsv.v) };
}

/**
 * 3 × 3 Varianten um (hue, v). Runde 1 beginnt immer bei der Grundfarbe mit voller Helligkeit (oberste Zeile = 100 %),
 * Runde 2 liegt eng um die Wahl aus Runde 1.
 */
export function fineVariants(color: FineColor, round: FineRound, center: { hue: number; v: number }): FineVariant[] {
  const step = ROUND_STEPS[round];
  const hueCenter = round === 1 ? BASE_HUE[color] : center.hue;
  // Runde 1: 100 / 80 / 60 %; Runde 2: Wahl ± Schritt (verschoben, damit alle drei Zeilen verschieden bleiben)
  let vs: number[];
  if (round === 1) vs = [100, 100 - step.v, 100 - 2 * step.v];
  else {
    const top = Math.min(100, Math.max(MIN_V + 2 * step.v, center.v + step.v));
    vs = [top, top - step.v, top - 2 * step.v];
  }
  const out: FineVariant[] = [];
  let nr = 1;
  for (const v of vs) {
    for (const dh of [-step.hue, 0, step.hue]) {
      const hue = wrapHue(hueCenter + dh);
      const vv = clampV(v);
      out.push({ nr: nr++, hue, v: vv, rgb: hsvToRgb({ h: hue, s: 100, v: vv }) });
    }
  }
  return out;
}

/**
 * Wahl im Schritt „Deutlich“. Ohne Markierung im Schritt „Verschwinden“ (keiner verschwindet) gilt der dunkelste
 * Kasten der mittleren Spalte als bester Kompromiss.
 */
export function chooseFallback(variants: readonly FineVariant[]): FineVariant {
  const mid = variants.filter((_, i) => i % 3 === 1);
  return mid.reduce((a, b) => (b.v < a.v ? b : a));
}
