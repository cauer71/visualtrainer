// EYE-EXPERIMENT: Statistik der Genauigkeitsprüfung (Perzentile, Grad-Umrechnung, Heatmap-Raster, Jitter) – rein.
import { median } from './calibration';
import type { Pt, Size } from './types';

export { median };

export const mean = (xs: readonly number[]): number => (xs.length ? xs.reduce((s, x) => s + x, 0) / xs.length : NaN);

/** Standardabweichung (Grundgesamtheit, wie für Jitter üblich). */
export function std(xs: readonly number[]): number {
  if (!xs.length) return NaN;
  const m = mean(xs);
  return Math.sqrt(xs.reduce((s, x) => s + (x - m) ** 2, 0) / xs.length);
}

/** Perzentil p (0..100) mit linearer Interpolation (wie NumPy „linear“). */
export function percentile(xs: readonly number[], p: number): number {
  if (!xs.length) return NaN;
  const s = [...xs].sort((a, b) => a - b);
  const pos = (Math.min(100, Math.max(0, p)) / 100) * (s.length - 1);
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return s[lo] + (s[hi] - s[lo]) * (pos - lo);
}

export const dist = (a: Pt, b: Pt): number => Math.hypot(a.x - b.x, a.y - b.y);

// ---------- Bildschirmgröße und Grad ----------

export interface ScreenGeometry {
  /** Fenstergröße in CSS-Pixeln */
  size: Size;
  /** Breite/Höhe in Millimetern (Annahme!) */
  widthMm: number;
  heightMm: number;
  /** Millimeter je CSS-Pixel */
  mmPerPx: number;
  /** woher die Größe stammt */
  source: 'diagonal-input' | 'tablet-guess' | 'phone-guess';
  diagonalInch: number;
}

/** Annahme einer Bildschirmdiagonale, wenn nichts eingegeben wurde: Tablet (kurze Seite ≥ 600 CSS-px) ≈ 10,5″, sonst ≈ 6″. */
export function guessDiagonalInch(size: Size): number {
  return Math.min(size.w, size.h) >= 600 ? 10.5 : 6;
}

/** Bildschirmgeometrie aus Fenstergröße und (optionaler) Diagonale in Zoll. Das Fenster wird als Vollbild angenommen. */
export function screenGeometry(size: Size, diagonalInch?: number | null): ScreenGeometry {
  const given = !!diagonalInch && Number.isFinite(diagonalInch) && diagonalInch > 3 && diagonalInch < 40;
  const diag = given ? (diagonalInch as number) : guessDiagonalInch(size);
  const diagMm = diag * 25.4;
  const diagPx = Math.hypot(size.w, size.h);
  const mmPerPx = diagMm / diagPx;
  return {
    size,
    widthMm: size.w * mmPerPx,
    heightMm: size.h * mmPerPx,
    mmPerPx,
    source: given ? 'diagonal-input' : Math.min(size.w, size.h) >= 600 ? 'tablet-guess' : 'phone-guess',
    diagonalInch: diag,
  };
}

/** Abweichung auf dem Bildschirm (px) → Sehwinkel in Grad bei Blickabstand in cm (senkrechter Blick, kleine Winkel genügen). */
export function pxToDeg(px: number, geo: ScreenGeometry, distanceCm: number): number {
  const mm = px * geo.mmPerPx;
  return (Math.atan(mm / (distanceCm * 10)) * 180) / Math.PI;
}

export function degToPx(deg: number, geo: ScreenGeometry, distanceCm: number): number {
  return (Math.tan((deg * Math.PI) / 180) * distanceCm * 10) / geo.mmPerPx;
}

// ---------- Genauigkeitsprüfung ----------

export interface PointMeasurement {
  /** Zielort in Pixeln */
  target: Pt;
  /** gemessene (geglättete) Blickpunkte in Pixeln */
  samples: Pt[];
}

export interface PointAccuracy {
  target: Pt;
  n: number;
  /** Abstand des Medians der Blickpunkte vom Ziel (systematische Abweichung), px */
  biasPx: number;
  /** Streuung (Standardabweichung des Abstands zum Median), px */
  spreadPx: number;
  /** mittlere Abweichung aller Einzelwerte vom Ziel, px */
  meanPx: number;
}

export interface AccuracySummary {
  n: number;
  meanPx: number;
  medianPx: number;
  p95Px: number;
  meanDeg: number;
  medianDeg: number;
  p95Deg: number;
  perPoint: PointAccuracy[];
}

export function pointAccuracy(m: PointMeasurement): PointAccuracy {
  const n = m.samples.length;
  if (!n) return { target: m.target, n: 0, biasPx: NaN, spreadPx: NaN, meanPx: NaN };
  const med = { x: median(m.samples.map((s) => s.x)), y: median(m.samples.map((s) => s.y)) };
  return {
    target: m.target,
    n,
    biasPx: dist(med, m.target),
    spreadPx: std(m.samples.map((s) => dist(s, med))),
    meanPx: mean(m.samples.map((s) => dist(s, m.target))),
  };
}

/** Gesamtstatistik über alle Einzelwerte aller Kontrollpunkte (px und Grad). */
export function summarizeAccuracy(ms: readonly PointMeasurement[], geo: ScreenGeometry, distanceCm: number): AccuracySummary {
  const errs = ms.flatMap((m) => m.samples.map((s) => dist(s, m.target)));
  const deg = (px: number) => pxToDeg(px, geo, distanceCm);
  return {
    n: errs.length,
    meanPx: mean(errs),
    medianPx: median(errs),
    p95Px: percentile(errs, 95),
    meanDeg: deg(mean(errs)),
    medianDeg: deg(median(errs)),
    p95Deg: deg(percentile(errs, 95)),
    perPoint: ms.map(pointAccuracy),
  };
}

// ---------- Heatmap-Raster ----------

export interface HeatCell {
  /** mittlere Abweichung (px) der Punkte in dieser Zelle; null = keine Daten */
  meanPx: number | null;
  count: number;
}

/** Ordnet Punkte (Pixel) einem Raster rows×cols über das Fenster zu und mittelt deren Abweichung. */
export function heatmapGrid(points: readonly PointAccuracy[], size: Size, rows = 3, cols = 3): HeatCell[][] {
  const sums = Array.from({ length: rows }, () => Array.from({ length: cols }, () => ({ sum: 0, count: 0 })));
  for (const p of points) {
    if (!p.n || !Number.isFinite(p.meanPx)) continue;
    const c = Math.min(cols - 1, Math.max(0, Math.floor((p.target.x / size.w) * cols)));
    const r = Math.min(rows - 1, Math.max(0, Math.floor((p.target.y / size.h) * rows)));
    sums[r][c].sum += p.meanPx;
    sums[r][c].count++;
  }
  return sums.map((row) => row.map((s) => ({ meanPx: s.count ? s.sum / s.count : null, count: s.count })));
}

// ---------- Jitter in Ruhe ----------

export interface JitterStats {
  n: number;
  sdXPx: number;
  sdYPx: number;
  /** √(sdX² + sdY²) */
  sdPx: number;
  sdDeg: number;
}

export function jitterStats(samples: readonly Pt[], geo: ScreenGeometry, distanceCm: number): JitterStats {
  const sdX = std(samples.map((s) => s.x));
  const sdY = std(samples.map((s) => s.y));
  const sd = Math.hypot(sdX, sdY);
  return { n: samples.length, sdXPx: sdX, sdYPx: sdY, sdPx: sd, sdDeg: pxToDeg(sd, geo, distanceCm) };
}

// ---------- Einschätzung (Faustwert, kein Normwert) ----------

export type Verdict = 'good' | 'ok' | 'poor';

/**
 * Faustwert für „gut genug für die Viertel-Auswertung des 4-Ziele-Wechsels“: Bezugslänge ist der Abstand vom
 * Viertelmittelpunkt zur Viertelgrenze auf der kürzeren Fensterseite (= min(w,h)/4).
 *  - gut: mittlere Abweichung ≤ 0,5 · Bezug und 95. Perzentil ≤ 1,0 · Bezug
 *  - ausreichend: mittlere Abweichung ≤ 0,8 · Bezug und 95. Perzentil ≤ 1,6 · Bezug
 *  - sonst: zu ungenau → neu kalibrieren
 */
export function verdictFor(meanPx: number, p95Px: number, size: Size): Verdict {
  const ref = Math.min(size.w, size.h) / 4;
  if (meanPx <= 0.5 * ref && p95Px <= 1.0 * ref) return 'good';
  if (meanPx <= 0.8 * ref && p95Px <= 1.6 * ref) return 'ok';
  return 'poor';
}
