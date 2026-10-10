/**
 * Lokale Speicherung unter dem versionierten Schlüssel `binokular:v1` (localStorage).
 *
 * Warum localStorage und nicht IndexedDB: Die Datenmenge ist klein (Einstellungen, Kalibrierung und je Session
 * wenige Kilobyte – auch hunderte Sessions bleiben weit unter der üblichen Grenze von ca. 5 MB), die API ist
 * synchron und in allen Zielbrowsern (Windows, Android, iPad) gleich verfügbar. Daten verlassen das Gerät nie;
 * es gibt keine Anmeldung und keine Netzwerkzugriffe.
 */
import type { AudioPrefs } from '../audio/player';
import { DEFAULT_CALIBRATION, normalizeCalibration, type Calibration } from '../calibration/calibration';
import { DEFAULT_PROFILE_ID, findProfile, normalizeProfiles, startProfileFor, type ColorProfile } from '../calibration/profiles';
import type { Glasses } from '../vision/color';
import { LEVELS } from '../levels';
import { DEFAULT_PIN, isValidPin } from '../therapy/pin';
import type { SessionRecord } from '../therapy/session';
import { defaultProgress, normalizeProgress, type Progress } from './progress';
import { DEFAULT_SETTINGS, normalizeSettings, type Settings } from './settings';

export type { Progress } from './progress';

/**
 * Der Schlüssel bleibt `binokular:v1`: Mit den Leveln 2–10 kamen nur Felder dazu (`progress.unlocked`, `audio`,
 * Ton-Voreinstellungen), mit dem neuen Farbmodell `profiles` und `activeProfileId`. Ältere Daten werden beim Laden
 * ergänzt (`normalizeStore`, getestet): Alte Grundfarben (`calibration.colors`) passen nicht zum neuen Modell und
 * werden verworfen; der alte Brillentyp (`settings.glasses`) wählt das passende Startprofil.
 */
export const STORAGE_KEY = 'binokular:v1';
/** Obergrenze gespeicherter Sessions (älteste fallen weg) */
export const MAX_SESSIONS = 500;

export interface Store {
  version: 1;
  settings: Settings;
  calibration: Calibration;
  /** Farbprofile: zwei Startprofile (immer vorhanden) + eigene */
  profiles: ColorProfile[];
  /** aktives Profil – liefert Brillentyp und alle Farben des Spielfelds */
  activeProfileId: string;
  sessions: SessionRecord[];
  pin: string;
  progress: Progress;
  /** Zwischenstand einer laufenden Session (wird beim nächsten Start als „unterbrochen“ abgeschlossen) */
  activeSession: SessionRecord | null;
  /** Toneinstellung der Person (null = Voreinstellung aus dem Therapeutenbereich) */
  audio: AudioPrefs | null;
}

export function defaultStore(): Store {
  return {
    version: 1,
    settings: { ...DEFAULT_SETTINGS },
    calibration: structuredCloneSafe(DEFAULT_CALIBRATION),
    profiles: normalizeProfiles([]),
    activeProfileId: DEFAULT_PROFILE_ID,
    sessions: [],
    pin: DEFAULT_PIN,
    progress: defaultProgress(),
    activeSession: null,
    audio: null,
  };
}

/** aktives Farbprofil (fällt auf das erste Startprofil zurück) */
export function activeProfile(s: Pick<Store, 'profiles' | 'activeProfileId'>): ColorProfile {
  return findProfile(s.profiles, s.activeProfileId);
}

/** Brillentyp = Modus des aktiven Profils */
export function glassesOf(s: Pick<Store, 'profiles' | 'activeProfileId'>): Glasses {
  return activeProfile(s).mode;
}

/** wirksame Toneinstellung: Wahl der Person, sonst Voreinstellung */
export function audioPrefsOf(s: Store): AudioPrefs {
  return s.audio ?? { on: s.settings.soundOn, volume: s.settings.soundVolume };
}

function normalizeAudio(x: unknown): AudioPrefs | null {
  if (!x || typeof x !== 'object') return null;
  const o = x as Record<string, unknown>;
  if (typeof o.on !== 'boolean') return null;
  const volume = o.volume === 'LOW' || o.volume === 'HIGH' || o.volume === 'MEDIUM' ? o.volume : 'MEDIUM';
  return { on: o.on, volume };
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
  const profiles = normalizeProfiles(o.profiles);
  const oldSettings = (o.settings && typeof o.settings === 'object' ? o.settings : {}) as Record<string, unknown>;
  // alter Speicherstand ohne Profile: Brillentyp aus den alten Einstellungen → passendes Startprofil
  const legacyMode: Glasses = oldSettings.glasses === 'RED_GREEN' ? 'RED_GREEN' : 'RED_CYAN';
  const wanted = typeof o.activeProfileId === 'string' ? o.activeProfileId : startProfileFor(legacyMode).id;
  return {
    version: 1,
    settings: normalizeSettings(o.settings),
    calibration: normalizeCalibration(o.calibration),
    profiles,
    activeProfileId: findProfile(profiles, wanted).id,
    sessions: Array.isArray(o.sessions) ? o.sessions.filter(isSession).slice(-MAX_SESSIONS) : [],
    pin: typeof o.pin === 'string' && isValidPin(o.pin) ? o.pin : DEFAULT_PIN,
    progress: normalizeProgress(o.progress, LEVELS.length),
    activeSession: isSession(o.activeSession) ? o.activeSession : null,
    audio: normalizeAudio(o.audio),
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
