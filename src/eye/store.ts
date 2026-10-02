// EYE-EXPERIMENT: kleine lokale Ablage (Einstellungen in localStorage, Kalibrierung optional in sessionStorage).
// Schlüssel `blickfit.eye:v1`; die Haupt-App-Historie wird nie berührt. Alle Zugriffe sind abgesichert.
import { isGazeModel, type GazeModel } from './calibration';
import type { Delegate } from './tracker';
import type { Size } from './types';

const KEY = 'blickfit.eye:v1';
const SESSION_KEY = 'blickfit.eye:v1:calibration';

export interface EyeSettings {
  distanceCm: number;
  /** Bildschirmdiagonale in Zoll, null = Annahme */
  diagonalInch: number | null;
  smoothing: number;
  delegate: Delegate;
  lastCalibration?: { at: number; looMeanPx: number; viewport: Size; model: string };
}

export const DEFAULT_SETTINGS: EyeSettings = { distanceCm: 45, diagonalInch: null, smoothing: 0.5, delegate: 'auto' };

export function loadSettings(): EyeSettings {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const s = JSON.parse(raw) as Partial<EyeSettings>;
    return {
      ...DEFAULT_SETTINGS,
      ...s,
      distanceCm: Math.min(70, Math.max(30, Number(s.distanceCm) || DEFAULT_SETTINGS.distanceCm)),
      smoothing: Math.min(1, Math.max(0, Number.isFinite(Number(s.smoothing)) ? Number(s.smoothing) : DEFAULT_SETTINGS.smoothing)),
      delegate: s.delegate === 'CPU' || s.delegate === 'GPU' ? s.delegate : 'auto',
    };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(patch: Partial<EyeSettings>): EyeSettings {
  const next = { ...loadSettings(), ...patch };
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* Speicher nicht verfügbar – die Seite läuft trotzdem */
  }
  return next;
}

export function saveSessionCalibration(m: GazeModel | null): void {
  try {
    if (m) sessionStorage.setItem(SESSION_KEY, JSON.stringify(m));
    else sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignorieren */
  }
}

export function loadSessionCalibration(): GazeModel | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const m = JSON.parse(raw) as unknown;
    return isGazeModel(m) ? m : null;
  } catch {
    return null;
  }
}
