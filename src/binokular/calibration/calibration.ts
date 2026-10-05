/**
 * Kalibrierung: Ablauf, Antworten und fein eingestellte Grundfarben.
 *
 * Teil 1 – Farbkanäle (Objekt A = rote Farbe, Objekt B = Cyan bzw. Grün, beide zusammen):
 *   „Ich sehe Objekt A“, „Ich sehe Objekt B“, „Ich sehe beide“ (oder „Ich sehe nichts“ / „nur eins“).
 * Teil 2 – Augen (mit Brille, abwechselnd ein Auge zuhalten): Objekt nur für das linke Auge, nur für das rechte
 *   Auge, gemeinsames Objekt. Antwort: welches Auge sieht es (links / rechts / beide / keines).
 * Teil 3 – Feineinstellung der Grundfarben (RGB und HSV) gegen Übersprechen (Crosstalk).
 * Alles wird lokal gespeichert.
 */
import { DEFAULT_COLORS, normalizeRgb, type CalibratedColors, type Eye } from '../vision/color';

export type ChannelAnswer = 'seen' | 'notSeen';
export type BothAnswer = 'both' | 'one' | 'none';
export type EyeAnswer = 'left' | 'right' | 'both' | 'none';

export interface CalibrationResults {
  objectA: ChannelAnswer | null;
  objectB: ChannelAnswer | null;
  objectsBoth: BothAnswer | null;
  leftEye: EyeAnswer | null;
  rightEye: EyeAnswer | null;
  commonObject: EyeAnswer | null;
}

export interface Calibration {
  colors: CalibratedColors;
  results: CalibrationResults;
  /** ISO-Zeitpunkt der letzten vollständigen Kalibrierung; null = noch nie */
  completedAt: string | null;
}

export const EMPTY_RESULTS: CalibrationResults = { objectA: null, objectB: null, objectsBoth: null, leftEye: null, rightEye: null, commonObject: null };

export const DEFAULT_CALIBRATION: Calibration = {
  colors: { red: { ...DEFAULT_COLORS.red }, cyan: { ...DEFAULT_COLORS.cyan }, green: { ...DEFAULT_COLORS.green } },
  results: { ...EMPTY_RESULTS },
  completedAt: null,
};

export type CalibrationStep = 'objectA' | 'objectB' | 'objectsBoth' | 'leftEye' | 'rightEye' | 'commonObject';
export const CALIBRATION_STEPS: readonly CalibrationStep[] = ['objectA', 'objectB', 'objectsBoth', 'leftEye', 'rightEye', 'commonObject'];

/** Teil 1 zeigt Filterfarben (Rot bzw. zweite Farbe des Brillentyps), Teil 2 Augen */
export function stepShows(step: CalibrationStep): { filters?: ('RED' | 'SECOND')[]; eyes?: (Eye | 'BOTH')[] } {
  switch (step) {
    case 'objectA':
      return { filters: ['RED'] };
    case 'objectB':
      return { filters: ['SECOND'] };
    case 'objectsBoth':
      return { filters: ['RED', 'SECOND'] };
    case 'leftEye':
      return { eyes: ['LEFT'] };
    case 'rightEye':
      return { eyes: ['RIGHT'] };
    case 'commonObject':
      return { eyes: ['BOTH'] };
  }
}

/** Erwartete Antwort je Schritt */
export const EXPECTED: Record<CalibrationStep, string> = {
  objectA: 'seen',
  objectB: 'seen',
  objectsBoth: 'both',
  leftEye: 'left',
  rightEye: 'right',
  commonObject: 'both',
};

export type CalibrationAdvice = 'ok' | 'swapLenses' | 'crosstalk' | 'notVisible';

/**
 * Hinweis aus den Antworten (keine Bewertung der Person, nur der Einstellung):
 *  - links/rechts vertauscht → Anaglyphen-Zuordnung tauschen,
 *  - ein Augenobjekt mit beiden Augen gesehen → Übersprechen: Farbe fein einstellen,
 *  - etwas nicht gesehen → Helligkeit/Farbe prüfen.
 */
export function adviceFor(r: CalibrationResults): CalibrationAdvice {
  if (r.leftEye === 'right' && r.rightEye === 'left') return 'swapLenses';
  if (r.leftEye === 'both' || r.rightEye === 'both') return 'crosstalk';
  if (r.objectA === 'notSeen' || r.objectB === 'notSeen' || r.objectsBoth === 'none' || r.leftEye === 'none' || r.rightEye === 'none' || r.commonObject === 'none') return 'notVisible';
  return 'ok';
}

export function isComplete(r: CalibrationResults): boolean {
  return CALIBRATION_STEPS.every((s) => r[s] !== null);
}

function normalizeResults(x: unknown): CalibrationResults {
  const o = (x && typeof x === 'object' ? x : {}) as Record<string, unknown>;
  const one = <T extends string>(v: unknown, opts: readonly T[]): T | null => (opts.includes(v as T) ? (v as T) : null);
  const eye = ['left', 'right', 'both', 'none'] as const;
  return {
    objectA: one(o.objectA, ['seen', 'notSeen'] as const),
    objectB: one(o.objectB, ['seen', 'notSeen'] as const),
    objectsBoth: one(o.objectsBoth, ['both', 'one', 'none'] as const),
    leftEye: one(o.leftEye, eye),
    rightEye: one(o.rightEye, eye),
    commonObject: one(o.commonObject, eye),
  };
}

export function normalizeCalibration(x: unknown): Calibration {
  const o = (x && typeof x === 'object' ? x : {}) as Record<string, unknown>;
  const c = (o.colors && typeof o.colors === 'object' ? o.colors : {}) as Record<string, unknown>;
  const at = typeof o.completedAt === 'string' && !Number.isNaN(Date.parse(o.completedAt)) ? o.completedAt : null;
  return {
    colors: { red: normalizeRgb(c.red, DEFAULT_COLORS.red), cyan: normalizeRgb(c.cyan, DEFAULT_COLORS.cyan), green: normalizeRgb(c.green, DEFAULT_COLORS.green) },
    results: normalizeResults(o.results),
    completedAt: at,
  };
}
