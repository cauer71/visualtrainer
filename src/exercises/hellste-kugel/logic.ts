/**
 * Hellste Kugel – reine Logik (ohne Canvas, damit testbar).
 *
 * Alle Kugeln sind gleich grau, eine ist heller. Der Helligkeitsunterschied wird als
 * Weber-Kontrast in Leuchtdichte angegeben: c = (L_Ziel − L_Kugel) / L_Kugel. Die Leuchtdichte
 * wird aus dem Grauwert über die sRGB-Kurve berechnet (nicht linear in Grauwerten). Wie ein
 * Bildschirm Grautöne wirklich wiedergibt, hängt vom Gerät ab – die Werte sind nur Vergleichswerte
 * für dasselbe Gerät, keine Messung des Sehens.
 */
import { clamp } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 20;
/** Grauwert des Spielfelds (mittelgrau) und der Kugeln (Ausgangsgrau, 0–255) */
export const PANEL_GRAY = 96;
export const BASE_GRAY = 150;
/** Weber-Kontrast von Stufe 1 (leicht) bis Stufe 20 (fein) */
export const CONTRAST_EASY = 0.45;
export const CONTRAST_HARD = 0.03;
export const MIN_BALLS = 6;
export const MAX_BALLS = 16;

export interface Pt {
  x: number;
  y: number;
}

export function srgbToLinear(v: number): number {
  const c = clamp(v, 0, 255) / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/** Leuchtdichte (0..1) → Grauwert 0..255 (nicht gerundet) */
export function linearToSrgb(l: number): number {
  const x = clamp(l, 0, 1);
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

/** Weber-Kontrast (heller − Bezug) / Bezug in Leuchtdichte, aus zwei Grauwerten */
export function weberContrast(baseGray: number, targetGray: number): number {
  const lb = srgbToLinear(baseGray);
  return (srgbToLinear(targetGray) - lb) / lb;
}

/** Gewünschter Weber-Kontrast der Stufe (logarithmisch von 45 % auf 3 %) */
export function contrastFor(level: number): number {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  return CONTRAST_EASY * Math.pow(CONTRAST_HARD / CONTRAST_EASY, (lv - 1) / (MAX_LEVEL - 1));
}

/** Kugeln im Cluster: Stufe 1 → 6, Stufe 20 → 16 */
export function clusterSizeFor(level: number): number {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  return Math.round(MIN_BALLS + ((MAX_BALLS - MIN_BALLS) * (lv - 1)) / (MAX_LEVEL - 1));
}

/**
 * Grauwert der hellsten Kugel für einen Weber-Kontrast (8-Bit-Bildschirm: auf ganze Grauwerte
 * gerundet, mindestens ein Grauwert heller als die anderen, höchstens 255).
 */
export function targetGray(baseGray: number, contrast: number): number {
  const v = Math.round(linearToSrgb(srgbToLinear(baseGray) * (1 + contrast)));
  return clamp(Math.max(baseGray + 1, v), 0, 255);
}

/** Punkte für eine richtige Antwort */
export function pointsFor(level: number): number {
  return 10 + 3 * (clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL) - 1);
}

/**
 * Erfolgswahrscheinlichkeit einer simulierten Person (nur für Autoplay): Rate-Wahrscheinlichkeit 1/n,
 * darüber Weibull-Kurve mit Schwelle `thr` (Weber-Kontrast).
 */
export function probCorrect(contrast: number, n: number, thr = 0.08): number {
  const guess = 1 / Math.max(1, n);
  return guess + (1 - guess) * (1 - Math.exp(-Math.pow(Math.max(0, contrast) / thr, 2)));
}

export interface Ellipse {
  cx: number;
  cy: number;
  /** Halbachsen */
  ax: number;
  ay: number;
}

/**
 * n Mittelpunkte in einer Ellipse mit Mindestabstand `dmin` (Zufallsverteilung). Wird es eng,
 * schrumpft der Abstand schrittweise; im Notfall liegen die Punkte auf einer Spirale. Liefert immer
 * genau n Punkte und den tatsächlich erreichten kleinsten Abstand.
 */
export function placeCluster(rand: () => number, n: number, e: Ellipse, dmin: number): { points: Pt[]; dmin: number } {
  let d = dmin;
  for (let pass = 0; pass < 14; pass++) {
    const pts: Pt[] = [];
    for (let tries = 0; tries < 80 * n && pts.length < n; tries++) {
      const x = e.cx + (2 * rand() - 1) * e.ax;
      const y = e.cy + (2 * rand() - 1) * e.ay;
      if (((x - e.cx) / e.ax) ** 2 + ((y - e.cy) / e.ay) ** 2 > 1) continue;
      if (pts.every((p) => Math.hypot(p.x - x, p.y - y) >= d)) pts.push({ x, y });
    }
    if (pts.length === n) return { points: pts, dmin: d };
    d *= 0.93;
  }
  // Notfall: Spirale (Sonnenblumenmuster) gleichmäßig in der Ellipse
  const pts: Pt[] = Array.from({ length: n }, (_, i) => {
    const rr = Math.sqrt((i + 0.5) / n);
    const a = i * 2.399963;
    return { x: e.cx + e.ax * rr * Math.cos(a), y: e.cy + e.ay * rr * Math.sin(a) };
  });
  return { points: pts, dmin: minDistance(pts) };
}

export function minDistance(pts: readonly Pt[]): number {
  let m = Infinity;
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) m = Math.min(m, Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y));
  return m;
}

/** Zufälliger Zielindex; wenn möglich mindestens `minDist` vom letzten Ziel entfernt (Blick ist noch dort) */
export function pickTargetIndex(rand: () => number, pts: readonly Pt[], last: Pt | null, minDist: number): number {
  const idx = pts.map((_, i) => i);
  const far = last ? idx.filter((i) => Math.hypot(pts[i].x - last.x, pts[i].y - last.y) >= minDist) : idx;
  const pool = far.length ? far : idx;
  return pool[Math.min(pool.length - 1, Math.floor(rand() * pool.length))];
}

/** Index der nächstliegenden Kugel innerhalb des Trefferradius oder -1 */
export function pickBall(pts: readonly Pt[], x: number, y: number, hitR: number): number {
  let best = -1;
  let bestD = Infinity;
  pts.forEach((p, i) => {
    const d = Math.hypot(x - p.x, y - p.y);
    if (d <= hitR && d < bestD) {
      best = i;
      bestD = d;
    }
  });
  return best;
}
