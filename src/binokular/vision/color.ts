/**
 * Farbzuordnung der dichoptischen Darstellung (rein, ohne DOM).
 *
 * Die Spiellogik kennt nur `eyeVisibility` (BOTH | AMBLYOPIC | FELLOW) und einen Objektkontrast (0–1).
 * Hier wird aus den Einstellungen und dem aktiven Farbprofil entschieden, welche RGB-Farbe gezeichnet wird:
 *  - welches Auge amblyop ist (LEFT | RIGHT),
 *  - welches Glas vor welchem Auge sitzt (links Rot / rechts Cyan bzw. Grün – oder umgekehrt),
 *  - Kontrast des amblyopen und des führenden Auges (0–100 %),
 *  - Palette des aktiven Profils: Rot, Zweitfarbe (Blau bzw. Grün) und Hintergrund.
 *
 * Grundprinzip: dunkler, leicht kompensierter Hintergrund (nie Weiß). Rote Objekte sieht nur das Auge hinter dem
 * roten Glas, Objekte in der Zweitfarbe nur das Auge hinter dem zweiten Glas. Der Hintergrund ist so gewählt, dass
 * er durch jedes Glas genauso hell erscheint wie das Objekt, das dieses Auge NICHT sehen soll.
 * Neutrale Objekte (BOTH) sind grau (#777–#888) und für beide Augen sichtbar.
 *
 * Kontrast eines Objekts = Mischung zwischen Hintergrund und Vollfarbe in linearem Licht:
 *   Farbe = Hintergrund + k · (Vollfarbe − Hintergrund).
 * Bei k = 0 verschwindet das Objekt im Hintergrund – für beide Augen.
 */

export type Eye = 'LEFT' | 'RIGHT';
export type EyeVisibility = 'BOTH' | 'AMBLYOPIC' | 'FELLOW';
/** Brillentyp: Rot/Cyan oder Rot/Grün */
export type Glasses = 'RED_CYAN' | 'RED_GREEN';
/** Welches Glas sitzt vor dem linken Auge: Rot oder das zweite Glas (Cyan bzw. Grün) */
export type LeftLens = 'RED' | 'OTHER';
export type FilterColor = 'RED' | 'CYAN' | 'GREEN';

export interface RGB {
  r: number;
  g: number;
  b: number;
}

/** Farben des aktiven Profils – die einzigen Farben im Spielfeld (außer Grau) */
export interface Palette {
  red: RGB;
  second: RGB;
  background: RGB;
}

export interface VisionSettings {
  amblyopicEye: Eye;
  glasses: Glasses;
  leftLens: LeftLens;
  /** 0–100 % */
  amblyopicContrast: number;
  /** 0–100 % */
  fellowEyeContrast: number;
  palette: Palette;
}

/** Grauwert (0–255) neutraler BOTH-Objekte bei Objektkontrast 1 (#888, Spanne laut Vorgabe #777–#888) */
export const NEUTRAL_LEVEL = 0x88;
export const NEUTRAL_MIN = 0x77;

export const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));
export const clampByte = (v: number): number => Math.round(clamp(v, 0, 255));

export function otherEye(eye: Eye): Eye {
  return eye === 'LEFT' ? 'RIGHT' : 'LEFT';
}

/** Zweites Glas des Brillentyps */
export function secondFilter(glasses: Glasses): FilterColor {
  return glasses === 'RED_CYAN' ? 'CYAN' : 'GREEN';
}

/** Glas vor einem Auge */
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

/** Vollfarbe eines Glases aus der Palette (Rot bzw. Zweitfarbe) */
export function fullColorOf(f: FilterColor, p: Palette): RGB {
  return f === 'RED' ? p.red : p.second;
}

/** Zeichnet ein Augenobjekt dieser Klasse in der Zweitfarbe? (dann: groß, gefüllt, Linien ≥ 4 px) */
export function isSecondColor(v: EyeVisibility, s: Pick<VisionSettings, 'amblyopicEye' | 'glasses' | 'leftLens'>): boolean {
  const eye = eyeOf(v, s);
  return eye !== null && filterOf(eye, s) !== 'RED';
}

// --- sRGB ↔ linear (exakte sRGB-Formel; Kontrast als Anteil der Leuchtdichte) ---

/** sRGB-Byte (0–255) → linear (0–1) */
export function srgbToLinear(c: number): number {
  const v = clamp(c, 0, 255) / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

/** linear (0–1) → sRGB-Byte (0–255, nicht gerundet) */
export function linearToSrgb(l: number): number {
  const v = clamp(l, 0, 1);
  const s = v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
  return s * 255;
}

/** Mischung in linearem Licht: from + k · (to − from), k = 0 … 1 */
export function mixLinear(from: RGB, to: RGB, k: number): RGB {
  const f = clamp(k, 0, 1);
  const ch = (a: number, b: number) => clampByte(linearToSrgb(srgbToLinear(a) + f * (srgbToLinear(b) - srgbToLinear(a))));
  return { r: ch(from.r, to.r), g: ch(from.g, to.g), b: ch(from.b, to.b) };
}

/** Skaliert die Leuchtdichte einer Farbe linear (k = 0 … 1), z. B. „Helligkeit der Zweitfarbe“ */
export function scaleLuminance(c: RGB, k: number): RGB {
  return mixLinear({ r: 0, g: 0, b: 0 }, c, k);
}

/**
 * Kernfunktion: Farbe eines Objekts.
 * @param v           Objektklasse
 * @param objContrast Objektkontrast aus der Spiellogik (0–1), z. B. 0,35 für Ablenker
 * @param s           Sehbezogene Einstellungen samt Palette
 * @param tone        Abstufung innerhalb des Objekts (1 = Kontur, < 1 = Füllung); nur Helligkeit, nie Farbton
 */
export function resolveColor(v: EyeVisibility, objContrast: number, s: VisionSettings, tone = 1): RGB {
  const k = clamp(objContrast, 0, 1) * clamp(tone, 0, 1);
  const bg = s.palette.background;
  const eye = eyeOf(v, s);
  if (eye === null) return mixLinear(bg, { r: NEUTRAL_LEVEL, g: NEUTRAL_LEVEL, b: NEUTRAL_LEVEL }, k);
  const full = fullColorOf(filterOf(eye, s), s.palette);
  return mixLinear(bg, full, (eyeContrast(v, s) / 100) * k);
}

/**
 * Zerlegt eine Objektfarbe in die Abweichung vom Hintergrund (je Kanal, sRGB-Bytes):
 * `plus` wird additiv gezeichnet (`lighter`), `minus` abgezogen (`difference`). Auf dem Hintergrund ergibt das genau
 * die Objektfarbe; über grauen Feldern ändern sich nur die Kanäle, in denen das Objekt vom Hintergrund abweicht –
 * so entsteht für das andere Auge kein „Loch“ im Grau.
 */
export function deltaOf(c: RGB, bg: RGB): { plus: RGB; minus: RGB } {
  const p = (a: number, b: number) => clampByte(Math.max(0, a - b));
  return { plus: { r: p(c.r, bg.r), g: p(c.g, bg.g), b: p(c.b, bg.b) }, minus: { r: p(bg.r, c.r), g: p(bg.g, c.g), b: p(bg.b, c.b) } };
}

export function rgbCss(c: RGB, alpha = 1): string {
  return alpha >= 1 ? `rgb(${c.r},${c.g},${c.b})` : `rgba(${c.r},${c.g},${c.b},${clamp(alpha, 0, 1).toFixed(3)})`;
}

export function toHex(c: RGB): string {
  const h = (v: number) => clampByte(v).toString(16).padStart(2, '0');
  return `#${h(c.r)}${h(c.g)}${h(c.b)}`.toUpperCase();
}

/** '#RRGGBB' oder '#RGB' → RGB; sonst null */
export function parseHex(s: unknown): RGB | null {
  if (typeof s !== 'string') return null;
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(s.trim());
  if (!m) return null;
  const x = m[1].length === 3 ? m[1].replace(/./g, (c) => c + c) : m[1];
  return { r: parseInt(x.slice(0, 2), 16), g: parseInt(x.slice(2, 4), 16), b: parseInt(x.slice(4, 6), 16) };
}

/** Ideale Filterwirkung: was ein Auge hinter seinem Glas noch sieht (Rot: nur R, Cyan: G+B, Grün: nur G) */
export function throughFilter(c: RGB, f: FilterColor): RGB {
  if (f === 'RED') return { r: c.r, g: 0, b: 0 };
  if (f === 'CYAN') return { r: 0, g: c.g, b: c.b };
  return { r: 0, g: c.g, b: 0 };
}

/** CSS-Farbe des idealen Filters (für die Anaglyphen-Simulation im Debug-Modus) */
export function filterCss(f: FilterColor): string {
  return f === 'RED' ? '#ff0000' : f === 'CYAN' ? '#00ffff' : '#00ff00';
}

/** Grobe Farbbezeichnung einer Profilfarbe (für Texte): Rot, Blau, Grün oder Blaugrün */
export function colorKind(c: RGB): 'RED' | 'BLUE' | 'GREEN' | 'CYAN' {
  if (c.r > 0 && c.r >= Math.max(c.g, c.b)) return 'RED';
  if (c.b > c.g * 1.6) return 'BLUE';
  if (c.g > c.b * 1.6) return 'GREEN';
  return 'CYAN';
}

/** RGB-Objekt oder Hex-Text streng prüfen; ungültig → Ersatzwert */
export function normalizeRgb(x: unknown, fallback: RGB): RGB {
  const hex = parseHex(x);
  if (hex) return hex;
  if (!x || typeof x !== 'object') return { ...fallback };
  const o = x as Record<string, unknown>;
  const ok = (k: 'r' | 'g' | 'b') => typeof o[k] === 'number' && Number.isFinite(o[k]);
  if (!ok('r') || !ok('g') || !ok('b')) return { ...fallback };
  return { r: clampByte(o.r as number), g: clampByte(o.g as number), b: clampByte(o.b as number) };
}
