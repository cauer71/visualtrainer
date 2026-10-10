/**
 * Export/Import der Einstellungen als JSON (Therapeutenmodus). Die PIN wird nicht exportiert.
 *
 * Version 2 enthält zusätzlich die eigenen Farbprofile, das aktive Profil und die Einstellungen der Spiele (`games`,
 * fehlt bei älteren Dateien → Standardwerte). Dateien der Version 1 werden weiter
 * gelesen: Ihre alten Grundfarben passen nicht zum neuen Farbmodell und werden verworfen; der alte Brillentyp
 * wählt das passende Startprofil.
 */
import { normalizeCalibration, type Calibration } from '../calibration/calibration';
import { exportProfiles, normalizeProfiles, startProfileFor, type ColorProfile } from '../calibration/profiles';
import { normalizeSettings, type Settings } from './settings';
import { normalizeGameSettings, type GameSettingsMap } from './storage';

export const EXPORT_FORMAT = 'binokular-einstellungen';
export const EXPORT_VERSION = 2;

export interface TransferData {
  settings: Settings;
  /** Einstellungen der Spiele */
  games: GameSettingsMap;
  calibration: Calibration;
  profiles: ColorProfile[];
  activeProfileId: string;
}

export function exportSettings(d: TransferData, now = new Date()): string {
  const profiles = JSON.parse(exportProfiles(d.profiles, now)).profiles as unknown[];
  const data = {
    format: EXPORT_FORMAT,
    version: EXPORT_VERSION,
    exportedAt: now.toISOString(),
    settings: d.settings,
    games: d.games,
    calibration: d.calibration,
    profiles,
    activeProfileId: d.activeProfileId,
  };
  return JSON.stringify(data, null, 2);
}

export type ImportResult = ({ ok: true } & TransferData) | { ok: false; error: 'json' | 'format' | 'version' };

/** Importiert und prüft: Format/Version müssen passen, Werte werden auf gültige Bereiche gebracht */
export function importSettings(text: string): ImportResult {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return { ok: false, error: 'json' };
  }
  const o = data as Record<string, unknown>;
  if (!o || typeof o !== 'object' || o.format !== EXPORT_FORMAT) return { ok: false, error: 'format' };
  if (o.version !== 1 && o.version !== EXPORT_VERSION) return { ok: false, error: 'version' };
  const profiles = normalizeProfiles(o.profiles);
  const old = (o.settings && typeof o.settings === 'object' ? o.settings : {}) as Record<string, unknown>;
  const fallback = startProfileFor(old.glasses === 'RED_GREEN' ? 'RED_GREEN' : 'RED_CYAN').id;
  const wanted = typeof o.activeProfileId === 'string' ? o.activeProfileId : fallback;
  const active = profiles.some((p) => p.id === wanted) ? wanted : fallback;
  return { ok: true, settings: normalizeSettings(o.settings), games: normalizeGameSettings(o.games), calibration: normalizeCalibration(o.calibration), profiles, activeProfileId: active };
}
