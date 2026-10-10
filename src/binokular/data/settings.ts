/**
 * Einstellungen (Therapeutenmodus). Alle Kontrastwerte sind Einstellungen, nichts davon ist im Spielcode fest.
 */
import type { ContrastMode } from '../therapy/contrast';
import { clampContrast } from '../therapy/contrast';
import type { Eye, LeftLens, VisionSettings } from '../vision/color';
import { paletteOf, type ColorProfile } from '../calibration/profiles';
import type { Volume } from '../audio/player';

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface Settings {
  /** Pseudonym – keine Klarnamen */
  patientId: string;
  age: number | null;
  amblyopicEye: Eye;
  /**
   * Anaglyphen-Zuordnung: Glas vor dem linken Auge (RED = links Rot / rechts Cyan bzw. Grün).
   * Der Brillentyp selbst steht nicht hier, sondern kommt aus dem aktiven Farbprofil (eine Quelle).
   */
  leftLens: LeftLens;
  /** 0–100 %, Standard 100 */
  amblyopicContrast: number;
  /** aktueller Kontrast des dominanten Auges 0–100 % (wird adaptiv verändert) */
  fellowEyeContrast: number;
  /** Startwert des dominanten Auges (für „Training zurücksetzen“), Standard 20 */
  startFellowEyeContrast: number;
  adaptiveContrast: boolean;
  contrastMode: ContrastMode;
  /** Sessiondauer in Minuten (z. B. 20, 30, 60) */
  sessionMinutes: number;
  /** maximale Leveldauer in Minuten */
  maxLevelMinutes: number;
  /** Objektgröße in Prozent der Levelvorgabe (50–150) */
  objectSizePercent: number;
  difficulty: Difficulty;
  /** nach je 10 min eine kurze Pause anbieten */
  pauseOffer: boolean;
  pauseIntervalMinutes: number;
  suppressionChecks: boolean;
  /** nach „Stimulus möglicherweise nicht wahrgenommen“ Kontrast des dominanten Auges senken */
  reduceFellowOnSuppression: boolean;
  /** Entwickler-/Debug-Modus (Tasten 1–5 und Umschalter am Bildschirm) */
  debugMode: boolean;
  /** Voreinstellung Ton (die Person kann im Startbildschirm/Spiel umstellen) */
  soundOn: boolean;
  /** Voreinstellung Lautstärke (3 Stufen) */
  soundVolume: Volume;
}

export const DEFAULT_SETTINGS: Settings = {
  patientId: '',
  age: null,
  amblyopicEye: 'LEFT',
  leftLens: 'RED',
  amblyopicContrast: 100,
  fellowEyeContrast: 20,
  startFellowEyeContrast: 20,
  adaptiveContrast: true,
  contrastMode: 'PERCENTUAL',
  sessionMinutes: 30,
  maxLevelMinutes: 5,
  objectSizePercent: 100,
  difficulty: 'EASY',
  pauseOffer: true,
  pauseIntervalMinutes: 10,
  suppressionChecks: true,
  reduceFellowOnSuppression: false,
  debugMode: false,
  soundOn: true,
  soundVolume: 'MEDIUM',
};

/** Wirkung des Schwierigkeitsgrads: Richtzeit-Faktor, zusätzliche Ablenkung, Größenfaktor (nicht nur Tempo) */
export const DIFFICULTY_EFFECT: Record<Difficulty, { parFactor: number; extraDistraction: number; sizeFactor: number; speedFactor: number }> = {
  EASY: { parFactor: 1.5, extraDistraction: 0, sizeFactor: 1, speedFactor: 1 },
  MEDIUM: { parFactor: 1, extraDistraction: 0.15, sizeFactor: 0.9, speedFactor: 1 },
  HARD: { parFactor: 0.75, extraDistraction: 0.3, sizeFactor: 0.8, speedFactor: 1.2 },
};

const num = (v: unknown, lo: number, hi: number, fallback: number, step = 1): number => {
  if (typeof v !== 'number' || !Number.isFinite(v)) return fallback;
  const c = Math.min(hi, Math.max(lo, v));
  return Math.round(c / step) * step;
};
const pick = <T extends string>(v: unknown, opts: readonly T[], fallback: T): T => (opts.includes(v as T) ? (v as T) : fallback);
const bool = (v: unknown, fallback: boolean): boolean => (typeof v === 'boolean' ? v : fallback);

/** Pseudonym säubern: höchstens 32 Zeichen, nur Buchstaben, Ziffern, Bindestrich, Unterstrich, Punkt, Leerzeichen */
export function cleanPatientId(v: unknown): string {
  return typeof v === 'string' ? v.replace(/[^\p{L}\p{N}\-_. ]/gu, '').trim().slice(0, 32) : '';
}

/** Beliebige (auch importierte) Daten auf gültige Einstellungen bringen */
export function normalizeSettings(x: unknown): Settings {
  const o = (x && typeof x === 'object' ? x : {}) as Record<string, unknown>;
  const d = DEFAULT_SETTINGS;
  const age = o.age === null || o.age === undefined || o.age === '' ? null : num(Number(o.age), 1, 120, NaN);
  return {
    patientId: cleanPatientId(o.patientId),
    age: age === null || Number.isNaN(age) ? null : age,
    amblyopicEye: pick(o.amblyopicEye, ['LEFT', 'RIGHT'] as const, d.amblyopicEye),
    leftLens: pick(o.leftLens, ['RED', 'OTHER'] as const, d.leftLens),
    amblyopicContrast: typeof o.amblyopicContrast === 'number' ? clampContrast(o.amblyopicContrast) : d.amblyopicContrast,
    fellowEyeContrast: typeof o.fellowEyeContrast === 'number' ? clampContrast(o.fellowEyeContrast) : d.fellowEyeContrast,
    startFellowEyeContrast: typeof o.startFellowEyeContrast === 'number' ? clampContrast(o.startFellowEyeContrast) : d.startFellowEyeContrast,
    adaptiveContrast: bool(o.adaptiveContrast, d.adaptiveContrast),
    contrastMode: pick(o.contrastMode, ['PERCENTUAL', 'LINEAR', 'MANUAL'] as const, d.contrastMode),
    sessionMinutes: num(o.sessionMinutes, 5, 90, d.sessionMinutes),
    maxLevelMinutes: num(o.maxLevelMinutes, 2, 15, d.maxLevelMinutes),
    objectSizePercent: num(o.objectSizePercent, 50, 150, d.objectSizePercent, 5),
    difficulty: pick(o.difficulty, ['EASY', 'MEDIUM', 'HARD'] as const, d.difficulty),
    pauseOffer: bool(o.pauseOffer, d.pauseOffer),
    pauseIntervalMinutes: num(o.pauseIntervalMinutes, 5, 30, d.pauseIntervalMinutes),
    suppressionChecks: bool(o.suppressionChecks, d.suppressionChecks),
    reduceFellowOnSuppression: bool(o.reduceFellowOnSuppression, d.reduceFellowOnSuppression),
    debugMode: bool(o.debugMode, d.debugMode),
    soundOn: bool(o.soundOn, d.soundOn),
    soundVolume: pick(o.soundVolume, ['LOW', 'MEDIUM', 'HIGH'] as const, d.soundVolume),
  };
}

/** Sehbezogene Einstellungen für den Renderer: Brillentyp und Farben aus dem aktiven Profil */
export function visionOf(s: Settings, p: ColorProfile): VisionSettings {
  return {
    amblyopicEye: s.amblyopicEye,
    glasses: p.mode,
    leftLens: s.leftLens,
    amblyopicContrast: s.amblyopicContrast,
    fellowEyeContrast: s.fellowEyeContrast,
    palette: paletteOf(p),
  };
}
