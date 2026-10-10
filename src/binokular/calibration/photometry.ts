/**
 * Foto-Kalibrierung: reine Rechenlogik (ohne DOM), vollständig getestet.
 *
 * Ablauf (Kalibrierung, Schritte 2–4):
 *  1. Im Foto des Messbilds tippt man der Reihe nach auf die Felder Weiß, Rot, Grün, Blau, Schwarz.
 *  2. Je Tipp wird eine quadratische Box (Kantenlänge ≈ 2,4 % der kürzeren Bildseite) in voller Auflösung ausgewertet:
 *     Pixel sRGB → linear (exakte Formel), dann gemittelt; Warnung bei überbelichteten Feldern (Rohwert ≥ 250).
 *  3. Leuchtdichte Y = 0,2126 R + 0,7152 G + 0,0722 B (linear), davon Y(Schwarz) abgezogen.
 *     Rotes Glas: a_R, a_G, a_B = Y der Felder Rot, Grün, Blau; zweites Glas: c_R, c_G, c_B.
 *  4. Zweitfarbe (linear) = (0, g, b): Kandidaten wählen (Verhältnis C/L), Hintergrund kompensieren, Übersprechen.
 */
import { clampByte, linearToSrgb, srgbToLinear, type Glasses, type RGB } from '../vision/color';

export const FIELDS = ['white', 'red', 'green', 'blue', 'black'] as const;
export type Field = (typeof FIELDS)[number];

/** Rohwert, ab dem ein Kanal als ausgefressen gilt */
export const CLIP_RAW = 250;
/** Anteil ausgefressener Pixel in einer Box, ab dem gewarnt wird (auch wenn der Mittelwert darunter liegt) */
export const CLIP_FRACTION = 0.1;
/** Kantenlänge der Messbox relativ zur kürzeren Bildseite */
export const BOX_FRACTION = 0.024;

export interface ImageLike {
  data: ArrayLike<number>;
  width: number;
  height: number;
}

export interface Channels {
  R: number;
  G: number;
  B: number;
}

export interface BoxSample {
  /** angetippter Punkt (Bildpixel) */
  x: number;
  y: number;
  /** ausgewertetes Rechteck (an den Bildrand angepasst) */
  x0: number;
  y0: number;
  w: number;
  h: number;
  /** mittlere Rohwerte (0–255) */
  raw: RGB;
  /** größter mittlerer Rohwert eines Kanals */
  maxRaw: number;
  /** Mittelwert der linearen Werte (0–1) */
  linear: { r: number; g: number; b: number };
  /** Leuchtdichte Y (linear) */
  Y: number;
  /** Anteil der Pixel mit mindestens einem Kanal ≥ 250 */
  clippedFraction: number;
}

/** Kantenlänge der Messbox in Pixeln */
export function boxSize(width: number, height: number): number {
  return Math.max(1, Math.round(BOX_FRACTION * Math.min(width, height)));
}

export function luminance(r: number, g: number, b: number): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Wertet eine Box um (x, y) in voller Bildauflösung aus */
export function sampleBox(img: ImageLike, x: number, y: number): BoxSample {
  const size = boxSize(img.width, img.height);
  const cx = Math.round(Math.min(img.width - 1, Math.max(0, x)));
  const cy = Math.round(Math.min(img.height - 1, Math.max(0, y)));
  const w = Math.min(size, img.width);
  const h = Math.min(size, img.height);
  const x0 = Math.min(img.width - w, Math.max(0, cx - Math.floor(w / 2)));
  const y0 = Math.min(img.height - h, Math.max(0, cy - Math.floor(h / 2)));
  let sr = 0;
  let sg = 0;
  let sb = 0;
  let lr = 0;
  let lg = 0;
  let lb = 0;
  let clipped = 0;
  const d = img.data;
  for (let yy = y0; yy < y0 + h; yy++) {
    for (let xx = x0; xx < x0 + w; xx++) {
      const i = (yy * img.width + xx) * 4;
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];
      sr += r;
      sg += g;
      sb += b;
      lr += srgbToLinear(r);
      lg += srgbToLinear(g);
      lb += srgbToLinear(b);
      if (r >= CLIP_RAW || g >= CLIP_RAW || b >= CLIP_RAW) clipped++;
    }
  }
  const n = w * h;
  const raw = { r: sr / n, g: sg / n, b: sb / n };
  const linear = { r: lr / n, g: lg / n, b: lb / n };
  return {
    x: cx,
    y: cy,
    x0,
    y0,
    w,
    h,
    raw,
    maxRaw: Math.max(raw.r, raw.g, raw.b),
    linear,
    Y: luminance(linear.r, linear.g, linear.b),
    clippedFraction: clipped / n,
  };
}

/** Überbelichtet? (Schwarz wird nie geprüft) */
export function isOverexposed(s: BoxSample, field: Field): boolean {
  if (field === 'black') return false;
  return s.maxRaw >= CLIP_RAW || s.clippedFraction > CLIP_FRACTION;
}

export interface GlassMeasurement {
  /** Y der Felder Rot, Grün, Blau abzüglich Y(Schwarz), nie negativ */
  values: Channels;
  /** Y(Weiß) abzüglich Schwarz (nur zur Anzeige/Plausibilität) */
  white: number;
  black: number;
  overexposed: Field[];
}

/** Fünf Proben in der Reihenfolge Weiß, Rot, Grün, Blau, Schwarz → Messwerte eines Glases */
export function evaluateGlass(samples: readonly BoxSample[]): GlassMeasurement | null {
  if (samples.length < FIELDS.length) return null;
  const black = samples[4].Y;
  const net = (s: BoxSample) => Math.max(0, s.Y - black);
  return {
    values: { R: net(samples[1]), G: net(samples[2]), B: net(samples[3]) },
    white: net(samples[0]),
    black,
    overexposed: FIELDS.filter((f, i) => isOverexposed(samples[i], f)),
  };
}

// --- Schritt 4: Berechnung ---

export interface Candidate {
  /** Zweitfarbe linear (0, g, b) */
  g: number;
  b: number;
  /** Leuchtdichte durch das rote Glas (soll klein sein) */
  L: number;
  /** Leuchtdichte durch das zweite Glas (soll groß sein) */
  C: number;
  /** C / L (Infinity bei L = 0 und C > 0) */
  ratio: number;
}

/** Start-Grünwert für Rot/Grün (linear 0,30 ≈ #009600) */
export const RED_GREEN_START_G = 0.3;
const STEPS = [0, 0.25, 0.5, 0.75, 1];

function candidate(g: number, b: number, a: Channels, c: Channels): Candidate {
  const L = a.G * g + a.B * b;
  const C = c.G * g + c.B * b;
  const ratio = L > 0 ? C / L : C > 0 ? Infinity : 0;
  return { g, b, L, C, ratio };
}

/**
 * Kandidaten der Zweitfarbe.
 *  Rot/Cyan: max(g, b) = 1, der andere Kanal 0 / 0,25 / 0,5 / 0,75 / 1 (9 Kandidaten).
 *  Rot/Grün: b = 0, g wählbar (Start 0,30).
 */
export function candidatesFor(mode: Glasses, a: Channels, c: Channels, greenG = RED_GREEN_START_G): Candidate[] {
  if (mode === 'RED_GREEN') return [candidate(Math.min(1, Math.max(0.01, greenG)), 0, a, c)];
  const out: Candidate[] = [];
  for (const v of STEPS) out.push(candidate(1, v, a, c));
  for (const v of STEPS) if (v < 1) out.push(candidate(v, 1, a, c));
  return out;
}

/** Auswahl: alle Kandidaten mit Verhältnis ≥ 85 % des besten, davon der mit dem größten C. Index oder -1. */
export function chooseCandidate(list: readonly Candidate[]): number {
  if (!list.length) return -1;
  const best = Math.max(...list.map((x) => x.ratio));
  let pick = -1;
  list.forEach((x, i) => {
    const good = best === Infinity ? x.ratio === Infinity : x.ratio >= 0.85 * best;
    if (good && (pick < 0 || x.C > list[pick].C)) pick = i;
  });
  return pick;
}

export interface Compensation {
  /** Hintergrund linear (r, t·g, t·b) */
  r: number;
  t: number;
  ok: boolean;
  /** Grund, wenn nicht berechenbar (dann Startwert verwenden) */
  reason?: 'det';
  /** r oder t mussten begrenzt werden */
  clamped: boolean;
}

/**
 * Hintergrund-Kompensation. Hintergrund (linear) = (r, t·g, t·b), rotes Objekt = (1, 0, 0):
 *   a_R·r + L·t = L     (durch das rote Glas: Hintergrund so hell wie die Zweitfarbe → Zweitfarbe unsichtbar)
 *   c_R·r + C·t = c_R   (durch das zweite Glas: Hintergrund so hell wie Rot → Rot unsichtbar)
 *   det = a_R·C − L·c_R; r = L·(C − c_R)/det; t = c_R·(a_R − L)/det; r, t auf 0 … 1 begrenzt.
 */
export function compensate(a: Channels, c: Channels, cand: Pick<Candidate, 'L' | 'C'>): Compensation {
  const { L, C } = cand;
  const det = a.R * C - L * c.R;
  const scale = Math.max(Math.abs(a.R * C), Math.abs(L * c.R), 1e-12);
  if (!Number.isFinite(det) || det <= scale * 1e-6) return { r: 0, t: 0, ok: false, reason: 'det', clamped: false };
  const r = (L * (C - c.R)) / det;
  const t = (c.R * (a.R - L)) / det;
  if (!Number.isFinite(r) || !Number.isFinite(t)) return { r: 0, t: 0, ok: false, reason: 'det', clamped: false };
  const rc = Math.min(1, Math.max(0, r));
  const tc = Math.min(1, Math.max(0, t));
  return { r: rc, t: tc, ok: true, clamped: rc !== r || tc !== t };
}

/** lineare Farbe → sRGB-Bytes */
export function linearToRgb(r: number, g: number, b: number): RGB {
  return { r: clampByte(linearToSrgb(r)), g: clampByte(linearToSrgb(g)), b: clampByte(linearToSrgb(b)) };
}

export type CrosstalkRating = 'good' | 'ok' | 'hard';

/** unter ca. 1 % sehr gut, über 5 % schwierig */
export function rateCrosstalk(fraction: number): CrosstalkRating {
  if (!Number.isFinite(fraction) || fraction > 0.05) return 'hard';
  return fraction < 0.01 ? 'good' : 'ok';
}

export interface Crosstalk {
  /** rotes Glas: a_G / a_R */
  redGlassGreen: number;
  /** rotes Glas: a_B / a_R */
  redGlassBlue: number;
  /** zweites Glas: c_R / max(c_G, c_B) */
  secondGlassRed: number;
}

export function crosstalkOf(a: Channels, c: Channels): Crosstalk {
  const div = (x: number, y: number) => (y > 0 ? x / y : x > 0 ? Infinity : 0);
  return { redGlassGreen: div(a.G, a.R), redGlassBlue: div(a.B, a.R), secondGlassRed: div(c.R, Math.max(c.G, c.B)) };
}

export interface CalcResult {
  candidates: Candidate[];
  chosen: number;
  compensation: Compensation;
  red: RGB;
  second: RGB;
  background: RGB;
  /** Hintergrund war nicht berechenbar → Startwert */
  fallback: boolean;
  crosstalk: Crosstalk;
}

/** Komplette Berechnung (Schritt 4). `fallbackBackground` = Startwert des Modus */
export function computeColors(mode: Glasses, a: Channels, c: Channels, fallbackBackground: RGB, greenG = RED_GREEN_START_G): CalcResult {
  const candidates = candidatesFor(mode, a, c, greenG);
  const chosen = Math.max(0, chooseCandidate(candidates));
  const cand = candidates[chosen];
  const comp = compensate(a, c, cand);
  const background = comp.ok ? linearToRgb(comp.r, comp.t * cand.g, comp.t * cand.b) : { ...fallbackBackground };
  return {
    candidates,
    chosen,
    compensation: comp,
    red: { r: 255, g: 0, b: 0 },
    second: linearToRgb(0, cand.g, cand.b),
    background,
    fallback: !comp.ok,
    crosstalk: crosstalkOf(a, c),
  };
}

/** Messwerte prüfen (Import, Speicher): endliche Zahlen ≥ 0 */
export function normalizeChannels(x: unknown): Channels | null {
  if (!x || typeof x !== 'object') return null;
  const o = x as Record<string, unknown>;
  const ok = (v: unknown) => typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 10;
  if (!ok(o.R) || !ok(o.G) || !ok(o.B)) return null;
  return { R: o.R as number, G: o.G as number, B: o.B as number };
}
