/**
 * Kalibrierung: Umrechnung cm ↔ CSS-Pixel ↔ Sehwinkel.
 *
 * Die Labor-Übungen geben Größen in cm und Winkel in Grad an. Wie viele CSS-Pixel ein cm hat, kann der Browser
 * nicht wissen: Die Person (der Optiker) stellt auf der Seite „Kalibrieren“ ein Rechteck auf die Breite einer
 * Bankkarte (85,6 mm). Ohne Kalibrierung gilt die Schätzung 38 px/cm (≈ 96 dpi), alle Übungen laufen weiter.
 *
 * Formeln wie `makeCalib` im Labor-Prototyp (lib/core.js): Sehwinkel = 2 · atan(Größe / (2 · Abstand)).
 */
import type { Calib, CalibSettings, ExerciseContext } from './types';

/** Schätzung ohne Kalibrierung (≈ 96 dpi) */
export const DEFAULT_PX_PER_CM = 38;
export const DEFAULT_VIEW_DISTANCE_CM = 40;
export const VIEW_DISTANCE_MIN_CM = 30;
export const VIEW_DISTANCE_MAX_CM = 100;
/** Plausible Grenzen für gespeicherte Werte (CSS-Pixel pro cm): ≈ 25 dpi … ≈ 1000 dpi */
export const PX_PER_CM_MIN = 10;
export const PX_PER_CM_MAX = 400;
/** Größen in cm dürfen höchstens diesen Anteil der kürzeren Bühnenseite belegen */
export const STAGE_FRACTION = 0.9;
/** Bankkarte (ISO/IEC 7810 ID-1): 85,60 × 53,98 mm */
export const CARD_LONG_CM = 8.56;
export const CARD_SHORT_CM = 5.4;

export const DEFAULT_CALIB: CalibSettings = { pxPerCm: null, viewDistanceCm: DEFAULT_VIEW_DISTANCE_CM };

/** Bühnenmaße (live: der Runner übergibt das Stage-Objekt, dessen w/h sich beim Drehen ändern) */
export interface StageSize {
  readonly w: number;
  readonly h: number;
}

/** Gespeicherte Rohwerte bereinigen: ungültig → Schätzung (pxPerCm null), Abstand auf 30–100 cm, ganze cm */
export function sanitizeCalib(raw: unknown): CalibSettings {
  const o = (raw && typeof raw === 'object' ? raw : {}) as { pxPerCm?: unknown; viewDistanceCm?: unknown };
  const px = typeof o.pxPerCm === 'number' ? o.pxPerCm : Number.NaN;
  const pxPerCm = Number.isFinite(px) && px >= PX_PER_CM_MIN && px <= PX_PER_CM_MAX ? px : null;
  const d = typeof o.viewDistanceCm === 'number' ? o.viewDistanceCm : Number.NaN;
  const viewDistanceCm = Number.isFinite(d)
    ? Math.min(VIEW_DISTANCE_MAX_CM, Math.max(VIEW_DISTANCE_MIN_CM, Math.round(d)))
    : DEFAULT_VIEW_DISTANCE_CM;
  return { pxPerCm, viewDistanceCm };
}

/** Sehwinkel in Grad für ein Objekt der Größe `cm` in `distCm` Abstand */
export function cmToDeg(cm: number, distCm: number): number {
  return (2 * Math.atan(cm / (2 * distCm)) * 180) / Math.PI;
}

/** Größe in cm für den Sehwinkel `deg` in `distCm` Abstand */
export function degToCm(deg: number, distCm: number): number {
  return 2 * distCm * Math.tan((deg * Math.PI) / 360);
}

/** Pixel pro cm aus der auf dem Bildschirm eingestellten Breite eines Gegenstands bekannter Größe (Bankkarte) */
export function pxPerCmFromRef(widthPx: number, refCm: number = CARD_LONG_CM): number {
  return widthPx / refCm;
}

/** Größte Größe in cm, die auf einer Bühne mit kürzerer Seite `minSidePx` dargestellt wird */
export function maxCmFor(pxPerCm: number, minSidePx: number): number {
  return (STAGE_FRACTION * minSidePx) / pxPerCm;
}

/**
 * Kalibrierung für eine Übung. `stage` (live) begrenzt `sizePx`/`fitCm`/`maxCm`; ohne Bühne wird nicht begrenzt.
 * `calibrated` = der Bildschirm wurde wirklich kalibriert (sonst Schätzung 38 px/cm).
 */
export function makeCalib(settings: CalibSettings | null | undefined, stage?: StageSize): Calib {
  const s = sanitizeCalib(settings ?? DEFAULT_CALIB);
  return buildCalib(s.pxPerCm ?? DEFAULT_PX_PER_CM, s.viewDistanceCm, s.pxPerCm !== null, stage);
}

/** Wie `makeCalib`, aber mit fest vorgegebenen Pixeln pro cm (Intro-Film mit kleiner Bühne, Tests) */
export function buildCalib(pxPerCm: number, viewDistanceCm: number, calibrated: boolean, stage?: StageSize): Calib {
  if (!(pxPerCm > 0) || !(viewDistanceCm > 0)) throw new Error('Ungültige Kalibrierung');
  const minSide = (): number => (stage ? Math.min(stage.w, stage.h) : Number.POSITIVE_INFINITY);
  const sizePx = (cm: number): number => Math.min(cm * pxPerCm, STAGE_FRACTION * minSide());
  return {
    pxPerCm,
    viewDistanceCm,
    calibrated,
    cmToPx: (cm) => cm * pxPerCm,
    pxToCm: (px) => px / pxPerCm,
    cmToDeg: (cm) => cmToDeg(cm, viewDistanceCm),
    degToCm: (deg) => degToCm(deg, viewDistanceCm),
    sizePx,
    fitCm: (cm) => sizePx(cm) / pxPerCm,
    isLimited: (cm) => cm * pxPerCm > STAGE_FRACTION * minSide() + 1e-9,
    maxCm: () => (STAGE_FRACTION * minSide()) / pxPerCm,
  };
}

/** Kalibrierung des Kontexts; fehlt sie (ältere Test-Attrappen), gilt die Schätzung für die Bühne des Kontexts */
export function calibOf(ctx: Pick<ExerciseContext, 'calib' | 'stage'>): Calib {
  return ctx.calib ?? makeCalib(null, ctx.stage);
}
