/**
 * Kalibrierung: Ablauf und Zustand, der nicht zum Farbprofil gehört.
 *
 * Schritte (Oberfläche: components/CalibrationScreen.tsx):
 *   0 Vorbereitung (Anleitung), 1 Messbild, 2 Foto rotes Glas, 3 Foto zweites Glas, 4 Berechnung,
 *   5 Feinabstimmung nach Auge (Regler, Profil speichern), 6 Kontrolle der Zuordnung (optional).
 * Rechenlogik: photometry.ts (Fotos, Berechnung), tuning.ts (Regler), profiles.ts (Profile).
 *
 * Kontrolle der Zuordnung (mit Brille, abwechselnd ein Auge zuhalten): Objekt nur für das linke Auge, nur für das
 * rechte Auge, gemeinsames Objekt. Antwort: welches Auge sieht es (links / rechts / beide / keines).
 */
import type { Eye } from '../vision/color';

export type EyeAnswer = 'left' | 'right' | 'both' | 'none';

export interface CalibrationResults {
  leftEye: EyeAnswer | null;
  rightEye: EyeAnswer | null;
  commonObject: EyeAnswer | null;
}

export interface Calibration {
  results: CalibrationResults;
  /** ISO-Zeitpunkt, an dem zuletzt ein Profil in der Kalibrierung gespeichert wurde; null = noch nie */
  completedAt: string | null;
  /** „Mit Startwerten spielen“ gewählt: beim Spielstart nicht mehr automatisch zur Kalibrierung */
  startValuesAccepted: boolean;
}

export const EMPTY_RESULTS: CalibrationResults = { leftEye: null, rightEye: null, commonObject: null };

export const DEFAULT_CALIBRATION: Calibration = { results: { ...EMPTY_RESULTS }, completedAt: null, startValuesAccepted: false };

export const CAL_STEPS = ['prep', 'pattern', 'photoRed', 'photoSecond', 'compute', 'fine', 'check'] as const;
export type CalStep = (typeof CAL_STEPS)[number];

export type CheckStep = 'leftEye' | 'rightEye' | 'commonObject';
export const CHECK_STEPS: readonly CheckStep[] = ['leftEye', 'rightEye', 'commonObject'];

/** Was die Kontrolle zeigt: Objekt für das linke, das rechte oder beide Augen */
export function checkShows(step: CheckStep): Eye | 'BOTH' {
  return step === 'leftEye' ? 'LEFT' : step === 'rightEye' ? 'RIGHT' : 'BOTH';
}

export const EXPECTED: Record<CheckStep, EyeAnswer> = { leftEye: 'left', rightEye: 'right', commonObject: 'both' };

export type CalibrationAdvice = 'ok' | 'swapLenses' | 'crosstalk' | 'notVisible';

/**
 * Hinweis aus den Antworten (keine Bewertung der Person, nur der Einstellung):
 *  - links/rechts vertauscht → Zuordnung tauschen,
 *  - ein Augenobjekt mit beiden Augen gesehen → Übersprechen: Feinabstimmung wiederholen,
 *  - etwas nicht gesehen → Helligkeit/Farben prüfen.
 */
export function adviceFor(r: CalibrationResults): CalibrationAdvice {
  if (r.leftEye === 'right' && r.rightEye === 'left') return 'swapLenses';
  if (r.leftEye === 'both' || r.rightEye === 'both') return 'crosstalk';
  if (r.leftEye === 'none' || r.rightEye === 'none' || r.commonObject === 'none') return 'notVisible';
  return 'ok';
}

export function isComplete(r: CalibrationResults): boolean {
  return CHECK_STEPS.every((s) => r[s] !== null);
}

function normalizeResults(x: unknown): CalibrationResults {
  const o = (x && typeof x === 'object' ? x : {}) as Record<string, unknown>;
  const eye = ['left', 'right', 'both', 'none'] as const;
  const one = (v: unknown): EyeAnswer | null => (eye.includes(v as EyeAnswer) ? (v as EyeAnswer) : null);
  return { leftEye: one(o.leftEye), rightEye: one(o.rightEye), commonObject: one(o.commonObject) };
}

/**
 * Gespeicherte (auch alte) Kalibrierung lesen. Alte Grundfarben (`colors`) passen nicht zum neuen Farbmodell
 * (Hintergrund-Kompensation) und werden verworfen; die Ergebnisse der Augenkontrolle bleiben erhalten.
 * Ein alter Abschlusszeitpunkt zählt nicht als Kalibrierung im neuen Sinn (es gibt noch kein eigenes Profil).
 */
export function normalizeCalibration(x: unknown): Calibration {
  const o = (x && typeof x === 'object' ? x : {}) as Record<string, unknown>;
  const legacy = 'colors' in o;
  const at = !legacy && typeof o.completedAt === 'string' && !Number.isNaN(Date.parse(o.completedAt)) ? o.completedAt : null;
  return { results: normalizeResults(o.results), completedAt: at, startValuesAccepted: o.startValuesAccepted === true };
}
