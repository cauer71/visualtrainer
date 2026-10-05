/**
 * Export/Import der Einstellungen als JSON (Therapeutenmodus). Die PIN wird nicht exportiert.
 */
import { normalizeCalibration, type Calibration } from '../calibration/calibration';
import { normalizeSettings, type Settings } from './settings';

export const EXPORT_FORMAT = 'binokular-einstellungen';
export const EXPORT_VERSION = 1;

export interface SettingsExport {
  format: typeof EXPORT_FORMAT;
  version: typeof EXPORT_VERSION;
  exportedAt: string;
  settings: Settings;
  calibration: Calibration;
}

export function exportSettings(settings: Settings, calibration: Calibration, now = new Date()): string {
  const data: SettingsExport = { format: EXPORT_FORMAT, version: EXPORT_VERSION, exportedAt: now.toISOString(), settings, calibration };
  return JSON.stringify(data, null, 2);
}

export type ImportResult = { ok: true; settings: Settings; calibration: Calibration } | { ok: false; error: 'json' | 'format' | 'version' };

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
  if (o.version !== EXPORT_VERSION) return { ok: false, error: 'version' };
  return { ok: true, settings: normalizeSettings(o.settings), calibration: normalizeCalibration(o.calibration) };
}
