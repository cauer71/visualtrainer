/**
 * Farbzuordnung der dichoptischen Darstellung (rein, ohne DOM).
 *
 * Die Spiellogik kennt nur `eyeVisibility` (BOTH | AMBLYOPIC | FELLOW) und einen Objektkontrast (0–1).
 * Hier wird aus den Einstellungen entschieden, welche RGB-Farbe tatsächlich gezeichnet wird:
 *  - welches Auge amblyop ist (LEFT | RIGHT),
 *  - welcher Filter vor welchem Auge sitzt (links Rot / rechts Cyan bzw. Grün – oder umgekehrt),
 *  - Kontrast des amblyopen und des dominanten Auges (0–100 %),
 *  - kalibrierte Grundfarben (Feineinstellung gegen Übersprechen).
 *
 * Hintergrund ist schwarz, Objekte eines Auges werden additiv gezeichnet: Ein rotes Objekt auf Schwarz sieht nur
 * das Auge hinter dem Rotfilter, ein cyanfarbenes (bzw. grünes) nur das Auge hinter dem Cyan-/Grünfilter.
 * BOTH-Objekte sind neutral grau (Rot- und Grün/Blau-Anteil gleich) und damit durch beide Filter sichtbar.
 */

export type Eye = 'LEFT' | 'RIGHT';
export type EyeVisibility = 'BOTH' | 'AMBLYOPIC' | 'FELLOW';
/** Brillentyp: Rot/Cyan oder Rot/Grün */
export type Glasses = 'RED_CYAN' | 'RED_GREEN';
/** Welcher Filter sitzt vor dem linken Auge: Rot oder die zweite Farbe (Cyan bzw. Grün) */
export type LeftLens = 'RED' | 'OTHER';
export type FilterColor = 'RED' | 'CYAN' | 'GREEN';

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface CalibratedColors {
  red: RGB;
  cyan: RGB;
  green: RGB;
}

export interface VisionSettings {
  amblyopicEye: Eye;
  glasses: Glasses;
  leftLens: LeftLens;
  /** 0–100 % */
  amblyopicContrast: number;
  /** 0–100 % */
  fellowEyeContrast: number;
  colors: CalibratedColors;
}

/** Werkseinstellung der Grundfarben (reine Primärfarben; Feineinstellung in der Kalibrierung) */
export const DEFAULT_COLORS: CalibratedColors = {
  red: { r: 255, g: 0, b: 0 },
  cyan: { r: 0, g: 255, b: 255 },
  green: { r: 0, g: 255, b: 0 },
};

/** Grauwert (0–255) für neutrale BOTH-Objekte bei Objektkontrast 1 */
export const NEUTRAL_LEVEL = 200;

export const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));
const clampByte = (v: number): number => Math.round(clamp(v, 0, 255));

export function otherEye(eye: Eye): Eye {
  return eye === 'LEFT' ? 'RIGHT' : 'LEFT';
}

/** Zweite Filterfarbe des Brillentyps */
export function secondFilter(glasses: Glasses): FilterColor {
  return glasses === 'RED_CYAN' ? 'CYAN' : 'GREEN';
}

/** Filterfarbe vor einem Auge */
export function filterOf(eye: Eye, s: Pick<VisionSettings, 'glasses' | 'leftLens'>): FilterColor {
  const leftIsRed = s.leftLens === 'RED';
  const isRed = eye === 'LEFT' ? leftIsRed : !leftIsRed;
  return isRed ? 'RED' : secondFilter(s.glasses);
}

/** Welches Auge soll ein Objekt sehen? `null` = beide (neutral) */
export function eyeOf(v: EyeVisibility, s: Pick<VisionSettings, 'amblyopicEye'>): Eye | null {
  if (v === 'AMBLYOPIC') return s.amblyopicEye;
  if (v === 'FELLOW') return otherEye(s.amblyopicEye);
  return null;
}

/** Kontrast des zuständigen Auges in Prozent (BOTH: 100) */
export function eyeContrast(v: EyeVisibility, s: Pick<VisionSettings, 'amblyopicContrast' | 'fellowEyeContrast'>): number {
  if (v === 'AMBLYOPIC') return clamp(s.amblyopicContrast, 0, 100);
  if (v === 'FELLOW') return clamp(s.fellowEyeContrast, 0, 100);
  return 100;
}

export function baseColorOf(f: FilterColor, colors: CalibratedColors): RGB {
  return f === 'RED' ? colors.red : f === 'CYAN' ? colors.cyan : colors.green;
}

// --- sRGB ↔ linear (Kontrast als Anteil der Leuchtdichte, nicht als Anteil des sRGB-Zahlenwerts) ---

export function srgbToLinear(c: number): number {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

export function linearToSrgb(l: number): number {
  const v = clamp(l, 0, 1);
  const s = v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
  return s * 255;
}

/**
 * Skaliert die Leuchtdichte einer Farbe linear (k = 0 … 1).
 * Auf schwarzem Hintergrund ist das der „Kontrast“ eines Objekts relativ zur kalibrierten Vollfarbe.
 */
export function scaleLuminance(c: RGB, k: number): RGB {
  const f = clamp(k, 0, 1);
  return {
    r: clampByte(linearToSrgb(srgbToLinear(c.r) * f)),
    g: clampByte(linearToSrgb(srgbToLinear(c.g) * f)),
    b: clampByte(linearToSrgb(srgbToLinear(c.b) * f)),
  };
}

/**
 * Kernfunktion: Farbe eines Objekts.
 * @param v           Objektklasse
 * @param objContrast Objektkontrast aus der Spiellogik (0–1), z. B. 0,35 für Ablenker
 * @param s           Sehbezogene Einstellungen
 * @param tone        Abstufung innerhalb des Objekts (1 = Kontur, < 1 = Füllung); nur Helligkeit, nie Farbton
 */
export function resolveColor(v: EyeVisibility, objContrast: number, s: VisionSettings, tone = 1): RGB {
  const k = clamp(objContrast, 0, 1) * clamp(tone, 0, 1);
  const eye = eyeOf(v, s);
  if (eye === null) {
    const g = NEUTRAL_LEVEL * k;
    return { r: clampByte(g), g: clampByte(g), b: clampByte(g) };
  }
  const base = baseColorOf(filterOf(eye, s), s.colors);
  return scaleLuminance(base, (eyeContrast(v, s) / 100) * k);
}

export function rgbCss(c: RGB, alpha = 1): string {
  return alpha >= 1 ? `rgb(${c.r},${c.g},${c.b})` : `rgba(${c.r},${c.g},${c.b},${clamp(alpha, 0, 1).toFixed(3)})`;
}

/** Ideale Filterwirkung: was ein Auge hinter seinem Filter von einer Farbe noch sieht (Rot: nur R, Cyan: G+B, Grün: nur G) */
export function throughFilter(c: RGB, f: FilterColor): RGB {
  if (f === 'RED') return { r: c.r, g: 0, b: 0 };
  if (f === 'CYAN') return { r: 0, g: c.g, b: c.b };
  return { r: 0, g: c.g, b: 0 };
}

/** CSS-Farbe des idealen Filters (für die Anaglyphen-Simulation im Debug-Modus) */
export function filterCss(f: FilterColor): string {
  return f === 'RED' ? '#ff0000' : f === 'CYAN' ? '#00ffff' : '#00ff00';
}

// --- HSV (Feineinstellung in der Kalibrierung) ---

export interface HSV {
  /** 0–360 */
  h: number;
  /** 0–100 */
  s: number;
  /** 0–100 */
  v: number;
}

export function rgbToHsv(c: RGB): HSV {
  const r = c.r / 255;
  const g = c.g / 255;
  const b = c.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d > 0) {
    if (max === r) h = 60 * (((g - b) / d) % 6);
    else if (max === g) h = 60 * ((b - r) / d + 2);
    else h = 60 * ((r - g) / d + 4);
  }
  if (h < 0) h += 360;
  return { h: Math.round(h), s: Math.round(max === 0 ? 0 : (d / max) * 100), v: Math.round(max * 100) };
}

/**
 * HSV aus RGB, aber Farbton (und Sättigung) aus dem vorigen Stand behalten, wo RGB sie nicht festlegt:
 * Bei Sättigung 0 (Grau) oder Helligkeit 0 (Schwarz) hat eine Farbe keinen Farbton. Ohne Gedächtnis würde
 * der Farbton dann auf 0° (Rot) springen, und beim Hochziehen der Sättigung entstünde eine andere Farbe.
 * Außerdem ist der aus gerundeten RGB-Werten berechnete Farbton bei kleiner Sättigung ungenau; deshalb gilt:
 * Stimmt der vorige HSV-Stand nach dem Runden noch mit RGB überein, bleibt er unverändert.
 */
export function rgbToHsvKeep(c: RGB, prev: HSV | null): HSV {
  if (prev) {
    const back = hsvToRgb(prev);
    if (back.r === c.r && back.g === c.g && back.b === c.b) return prev;
  }
  const next = rgbToHsv(c);
  if (!prev) return next;
  if (next.v === 0) return { h: prev.h, s: prev.s, v: 0 };
  if (next.s === 0) return { h: prev.h, s: 0, v: next.v };
  return next;
}

export function hsvToRgb(hsv: HSV): RGB {
  const h = ((clamp(hsv.h, 0, 360) % 360) + 360) % 360;
  const s = clamp(hsv.s, 0, 100) / 100;
  const v = clamp(hsv.v, 0, 100) / 100;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return { r: clampByte((r + m) * 255), g: clampByte((g + m) * 255), b: clampByte((b + m) * 255) };
}

export function normalizeRgb(x: unknown, fallback: RGB): RGB {
  if (!x || typeof x !== 'object') return { ...fallback };
  const o = x as Record<string, unknown>;
  const ch = (k: 'r' | 'g' | 'b') => (typeof o[k] === 'number' && Number.isFinite(o[k]) ? clampByte(o[k] as number) : fallback[k]);
  return { r: ch('r'), g: ch('g'), b: ch('b') };
}
