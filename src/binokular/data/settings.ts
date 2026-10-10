/**
 * Allgemeine Einstellungen (Therapeutenbereich), gültig für beide Spiele. Spielspezifische Einstellungen liegen in
 * `games/<id>/settings.ts`. Alle Kontrastwerte sind Einstellungen, nichts davon ist im Spielcode fest.
 */
import type { Eye, LeftLens, VisionSettings } from '../vision/color';
import { paletteOf, type ColorProfile } from '../calibration/profiles';
import type { Volume } from '../audio/player';

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
  /** Kontrast des dominanten Auges 0–100 % (manuell einstellbar, Standard 20) */
  fellowEyeContrast: number;
  /** Entwickler-/Debug-Modus (Tasten 1–4 und Umschalter am Bildschirm) */
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
  debugMode: false,
  soundOn: true,
  soundVolume: 'MEDIUM',
};

/** Zahl streng begrenzen (und auf `step` runden); ungültig → Ersatzwert */
export const num = (v: unknown, lo: number, hi: number, fallback: number, step = 1): number => {
  if (typeof v !== 'number' || !Number.isFinite(v)) return fallback;
  const c = Math.min(hi, Math.max(lo, v));
  const r = Math.round(c / step) * step;
  return Math.min(hi, Math.max(lo, Number(r.toFixed(6))));
};
export const pick = <T extends string>(v: unknown, opts: readonly T[], fallback: T): T => (opts.includes(v as T) ? (v as T) : fallback);
export const bool = (v: unknown, fallback: boolean): boolean => (typeof v === 'boolean' ? v : fallback);

/** Kontrast 0–100 %, eine Nachkommastelle */
export const clampContrast = (v: number): number => Math.round(Math.min(100, Math.max(0, Number.isFinite(v) ? v : 0)) * 10) / 10;

/** Pseudonym säubern: höchstens 32 Zeichen, nur Buchstaben, Ziffern, Bindestrich, Unterstrich, Punkt, Leerzeichen */
export function cleanPatientId(v: unknown): string {
  return typeof v === 'string' ? v.replace(/[^\p{L}\p{N}\-_. ]/gu, '').trim().slice(0, 32) : '';
}

/** Beliebige (auch importierte oder alte) Daten auf gültige Einstellungen bringen; unbekannte Felder entfallen */
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
