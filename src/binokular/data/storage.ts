/**
 * Lokale Speicherung unter dem versionierten Schlüssel `binokular:v1` (localStorage).
 *
 * Warum localStorage und nicht IndexedDB: Die Datenmenge ist klein (Einstellungen, Kalibrierung und je Session
 * wenige Kilobyte – auch hunderte Sessions bleiben weit unter der üblichen Grenze von ca. 5 MB), die API ist
 * synchron und in allen Zielbrowsern (Windows, Android, iPad) gleich verfügbar. Daten verlassen das Gerät nie;
 * es gibt keine Anmeldung und keine Netzwerkzugriffe.
 */
import { DEFAULT_CALIBRATION, normalizeCalibration, type Calibration } from '../calibration/calibration';
import { DEFAULT_PIN, isValidPin } from '../therapy/pin';
import type { SessionRecord } from '../therapy/session';
import { DEFAULT_SETTINGS, normalizeSettings, type Settings } from './settings';

export const STORAGE_KEY = 'binokular:v1';
/** Obergrenze gespeicherter Sessions (älteste fallen weg) */
export const MAX_SESSIONS = 500;

export interface Progress {
  /** Misserfolge in Folge (adaptive Kontraststeuerung) */
  consecutiveFailures: number;
  /** aktuelles Level */
  level: number;
  /** beste Sterne je Level-ID */
  bestStars: Record<string, number>;
}

export interface Store {
  version: 1;
  settings: Settings;
  calibration: Calibration;
  sessions: SessionRecord[];
  pin: string;
  progress: Progress;
  /** Zwischenstand einer laufenden Session (wird beim nächsten Start als „unterbrochen“ abgeschlossen) */
  activeSession: SessionRecord | null;
}

export function defaultStore(): Store {
  return {
    version: 1,
    settings: { ...DEFAULT_SETTINGS },
    calibration: structuredCloneSafe(DEFAULT_CALIBRATION),
    sessions: [],
    pin: DEFAULT_PIN,
    progress: { consecutiveFailures: 0, level: 1, bestStars: {} },
    activeSession: null,
  };
}

function structuredCloneSafe<T>(x: T): T {
  return JSON.parse(JSON.stringify(x)) as T;
}

function isSession(x: unknown): x is SessionRecord {
  const o = x as Record<string, unknown>;
  return !!o && typeof o === 'object' && typeof o.id === 'string' && typeof o.date === 'string' && typeof o.activeMs === 'number' && Array.isArray(o.attempts);
}

/** Gespeicherte (evtl. alte oder beschädigte) Daten in einen gültigen Store überführen */
export function normalizeStore(x: unknown): Store {
  const d = defaultStore();
  if (!x || typeof x !== 'object') return d;
  const o = x as Record<string, unknown>;
  const p = (o.progress && typeof o.progress === 'object' ? o.progress : {}) as Record<string, unknown>;
  const best: Record<string, number> = {};
  if (p.bestStars && typeof p.bestStars === 'object') {
    for (const [k, v] of Object.entries(p.bestStars as Record<string, unknown>)) if (typeof v === 'number') best[k] = Math.max(0, Math.min(3, Math.round(v)));
  }
  return {
    version: 1,
    settings: normalizeSettings(o.settings),
    calibration: normalizeCalibration(o.calibration),
    sessions: Array.isArray(o.sessions) ? o.sessions.filter(isSession).slice(-MAX_SESSIONS) : [],
    pin: typeof o.pin === 'string' && isValidPin(o.pin) ? o.pin : DEFAULT_PIN,
    progress: {
      consecutiveFailures: typeof p.consecutiveFailures === 'number' ? Math.max(0, Math.round(p.consecutiveFailures)) : 0,
      level: typeof p.level === 'number' ? Math.max(1, Math.round(p.level)) : 1,
      bestStars: best,
    },
    activeSession: isSession(o.activeSession) ? o.activeSession : null,
  };
}

/** Speicher-Zugriff austauschbar (Tests) */
export interface KeyValue {
  getItem(k: string): string | null;
  setItem(k: string, v: string): void;
  removeItem(k: string): void;
}

function browserStorage(): KeyValue | null {
  try {
    return typeof localStorage !== 'undefined' ? localStorage : null;
  } catch {
    return null;
  }
}

export function loadStore(kv: KeyValue | null = browserStorage()): Store {
  if (!kv) return defaultStore();
  try {
    const raw = kv.getItem(STORAGE_KEY);
    const store = normalizeStore(raw ? JSON.parse(raw) : null);
    // unterbrochene Session (Seite geschlossen) abschließen
    if (store.activeSession) {
      store.sessions = [...store.sessions, { ...store.activeSession, endReason: 'interrupted' as const }].slice(-MAX_SESSIONS);
      store.activeSession = null;
    }
    return store;
  } catch {
    return defaultStore();
  }
}

export function saveStore(store: Store, kv: KeyValue | null = browserStorage()): boolean {
  if (!kv) return false;
  try {
    kv.setItem(STORAGE_KEY, JSON.stringify(store));
    return true;
  } catch {
    return false;
  }
}
