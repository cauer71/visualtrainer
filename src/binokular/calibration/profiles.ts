/**
 * Farbprofile (Brille + Monitor): Name, Modus, Rot, Zweitfarbe, Hintergrund.
 *
 * Die Farben im Spiel kommen ausschließlich aus dem aktiven Profil. Zwei Startprofile (Rot-Cyan, Rot-Grün) sind
 * immer vorhanden, werden nie gespeichert oder gelöscht, sondern bei jedem Laden aus den Konstanten erzeugt.
 * Eigene Profile entstehen in der Kalibrierung (Foto-Messung und/oder Feinabstimmung nach Auge) und lassen sich
 * als JSON exportieren/importieren. Alle geladenen und importierten Daten werden Feld für Feld geprüft.
 */
import { normalizeChannels, type Channels } from './photometry';
import { clampByte, normalizeRgb, toHex, type Glasses, type Palette, type RGB } from '../vision/color';

export type ProfileSource = 'start' | 'photo' | 'manual';

export interface ColorProfile {
  id: string;
  name: string;
  mode: Glasses;
  red: RGB;
  second: RGB;
  background: RGB;
  /** ISO-Zeitpunkt */
  createdAt: string;
  source: ProfileSource;
  /** Messwerte der Foto-Kalibrierung (rotes Glas a, zweites Glas c) */
  measurement?: { a: Channels; c: Channels };
}

/** Obergrenze je Hintergrundkanal (dunkler Hintergrund, nie Weiß) */
export const BG_MAX = 100;
export const MAX_PROFILES = 50;
export const MAX_NAME = 40;

const START_DATE = '2026-01-01T00:00:00.000Z';

/** Startwerte laut Vorgabe – echte Werte kommen aus der Kalibrierung */
export const START_PROFILES: readonly ColorProfile[] = [
  {
    id: 'start-red-cyan',
    name: 'Startwerte Rot-Cyan',
    mode: 'RED_CYAN',
    red: { r: 255, g: 0, b: 0 },
    second: { r: 0, g: 0, b: 255 },
    background: { r: 0x16, g: 0, b: 0 },
    createdAt: START_DATE,
    source: 'start',
  },
  {
    id: 'start-red-green',
    name: 'Startwerte Rot-Grün',
    mode: 'RED_GREEN',
    red: { r: 255, g: 0, b: 0 },
    second: { r: 0, g: 0x96, b: 0 },
    background: { r: 0x21, g: 0, b: 0 },
    createdAt: START_DATE,
    source: 'start',
  },
];

export const DEFAULT_PROFILE_ID = START_PROFILES[0].id;

export function cloneProfile(p: ColorProfile): ColorProfile {
  return JSON.parse(JSON.stringify(p)) as ColorProfile;
}

export function isStartProfile(id: string): boolean {
  return START_PROFILES.some((p) => p.id === id);
}

export function startProfileFor(mode: Glasses): ColorProfile {
  return cloneProfile(START_PROFILES.find((p) => p.mode === mode) ?? START_PROFILES[0]);
}

export function paletteOf(p: Pick<ColorProfile, 'red' | 'second' | 'background'>): Palette {
  return { red: { ...p.red }, second: { ...p.second }, background: { ...p.background } };
}

/** Profilname säubern: höchstens 40 Zeichen, keine Steuerzeichen/spitzen Klammern */
export function cleanProfileName(v: unknown): string {
  if (typeof v !== 'string') return '';
  return v
    .replace(/[\u0000-\u001f\u007f<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_NAME);
}

export function newProfileId(rand: () => number = Math.random, now = Date.now()): string {
  return `p-${now.toString(36)}-${Math.floor(rand() * 36 ** 4)
    .toString(36)
    .padStart(4, '0')}`;
}

const ID_RE = /^[a-z0-9-]{1,40}$/i;

/** Ein Profil streng prüfen; ungültig → null. Farben werden begrenzt (Hintergrund dunkel). */
export function normalizeProfile(x: unknown): ColorProfile | null {
  if (!x || typeof x !== 'object') return null;
  const o = x as Record<string, unknown>;
  if (typeof o.id !== 'string' || !ID_RE.test(o.id)) return null;
  if (o.mode !== 'RED_CYAN' && o.mode !== 'RED_GREEN') return null;
  const start = startProfileFor(o.mode);
  const name = cleanProfileName(o.name) || 'Profil';
  const bg = normalizeRgb(o.background, start.background);
  const red = normalizeRgb(o.red, start.red);
  const second = normalizeRgb(o.second, start.second);
  const at = typeof o.createdAt === 'string' && !Number.isNaN(Date.parse(o.createdAt)) ? new Date(o.createdAt).toISOString() : START_DATE;
  const source: ProfileSource = o.source === 'photo' || o.source === 'manual' ? o.source : 'manual';
  const p: ColorProfile = {
    id: o.id,
    name,
    mode: o.mode,
    red,
    second,
    background: { r: Math.min(BG_MAX, bg.r), g: Math.min(BG_MAX, bg.g), b: Math.min(BG_MAX, bg.b) },
    createdAt: at,
    source,
  };
  const m = o.measurement as Record<string, unknown> | undefined;
  if (m && typeof m === 'object') {
    const a = normalizeChannels(m.a);
    const c = normalizeChannels(m.c);
    if (a && c) p.measurement = { a, c };
  }
  return p;
}

/**
 * Gespeicherte Profilliste: Startprofile immer zuerst (aus den Konstanten), danach eigene Profile
 * (gültig, ohne doppelte IDs, ohne IDs der Startprofile, höchstens 50).
 */
export function normalizeProfiles(x: unknown): ColorProfile[] {
  const own: ColorProfile[] = [];
  const seen = new Set<string>(START_PROFILES.map((p) => p.id));
  if (Array.isArray(x)) {
    for (const item of x) {
      const p = normalizeProfile(item);
      if (!p || seen.has(p.id)) continue;
      seen.add(p.id);
      own.push(p);
      if (own.length >= MAX_PROFILES) break;
    }
  }
  return [...START_PROFILES.map(cloneProfile), ...own];
}

export function findProfile(list: readonly ColorProfile[], id: string): ColorProfile {
  return list.find((p) => p.id === id) ?? list[0] ?? startProfileFor('RED_CYAN');
}

/** Kurzbeschreibung (für Listen): „Rot #FF0000 · Blau #0000FF · Hintergrund #160000“ */
export function profileHex(p: ColorProfile): { red: string; second: string; background: string } {
  return { red: toHex(p.red), second: toHex(p.second), background: toHex(p.background) };
}

// --- Export/Import (eigene Datei, nur eigene Profile) ---

export const PROFILE_FORMAT = 'binokular-farbprofile';
export const PROFILE_VERSION = 1;

export function exportProfiles(list: readonly ColorProfile[], now = new Date()): string {
  const profiles = list.filter((p) => !isStartProfile(p.id)).map((p) => ({
    ...p,
    red: toHex(p.red),
    second: toHex(p.second),
    background: toHex(p.background),
  }));
  return JSON.stringify({ format: PROFILE_FORMAT, version: PROFILE_VERSION, exportedAt: now.toISOString(), profiles }, null, 2);
}

export type ProfileImport = { ok: true; profiles: ColorProfile[] } | { ok: false; error: 'json' | 'format' | 'version' | 'empty' };

/** Liest eine Profil-Datei (oder eine Einstellungs-Datei mit Profilen); nur gültige eigene Profile */
export function importProfiles(text: string): ProfileImport {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return { ok: false, error: 'json' };
  }
  const o = data as Record<string, unknown>;
  if (!o || typeof o !== 'object' || (o.format !== PROFILE_FORMAT && o.format !== 'binokular-einstellungen')) return { ok: false, error: 'format' };
  if (o.format === PROFILE_FORMAT && o.version !== PROFILE_VERSION) return { ok: false, error: 'version' };
  const profiles = normalizeProfiles(o.profiles).filter((p) => !isStartProfile(p.id));
  if (!profiles.length) return { ok: false, error: 'empty' };
  return { ok: true, profiles };
}

/** Importierte Profile einfügen: gleiche ID ersetzt das vorhandene Profil, sonst angehängt */
export function mergeProfiles(list: readonly ColorProfile[], incoming: readonly ColorProfile[]): ColorProfile[] {
  const own = list.filter((p) => !isStartProfile(p.id));
  for (const p of incoming) {
    if (isStartProfile(p.id)) continue;
    const i = own.findIndex((q) => q.id === p.id);
    if (i >= 0) own[i] = cloneProfile(p);
    else own.push(cloneProfile(p));
  }
  return normalizeProfiles(own.slice(-MAX_PROFILES));
}

/** Neues eigenes Profil aus einer Palette */
export function makeProfile(name: string, mode: Glasses, pal: Palette, source: ProfileSource, measurement?: { a: Channels; c: Channels }, id = newProfileId(), now = new Date()): ColorProfile {
  const p = normalizeProfile({ id, name: cleanProfileName(name) || 'Profil', mode, ...pal, createdAt: now.toISOString(), source, measurement });
  // normalizeProfile kann hier nicht scheitern (alle Felder gültig); Rückfall nur zur Sicherheit
  return p ?? { ...startProfileFor(mode), id, name: 'Profil', source };
}

export function sameColors(a: Pick<ColorProfile, 'red' | 'second' | 'background'>, b: Pick<ColorProfile, 'red' | 'second' | 'background'>): boolean {
  const eq = (x: RGB, y: RGB) => clampByte(x.r) === clampByte(y.r) && clampByte(x.g) === clampByte(y.g) && clampByte(x.b) === clampByte(y.b);
  return eq(a.red, b.red) && eq(a.second, b.second) && eq(a.background, b.background);
}
