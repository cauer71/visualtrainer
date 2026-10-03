/**
 * Lokale Speicherung (nur auf diesem Gerät, keine Server, keine Cookies).
 * Fällt bei gesperrtem localStorage (z. B. privater Modus) auf Speicher im RAM zurück.
 */
import type { Lang } from '../i18n/lang';
import { brand } from '../config/brand';
import { DEFAULT_CALIB, sanitizeCalib } from './calib';
import { defaultParams, isDefaultParams, sanitizeParams, variantKey } from './params';
import type { Better, CalibSettings, ExerciseOptionDef, ExerciseOptionValue, MetricUnit, ParamDef, ParamValue } from './types';

export interface HistoryEntry {
  /** Zeitpunkt (epoch ms) */
  d: number;
  /** Hauptkennzahl */
  p: number;
  /** Punkte */
  s: number;
  /** Stufe */
  l: number;
  /** Variantenschlüssel der Einstellungen (nur bei Übungen mit `params`; fehlt = leer = „eine Variante“) */
  v?: string;
}

export interface ExerciseRecord {
  level: number | null;
  best: number | null;
  /** Einheit und Richtung der Hauptkennzahl (für die Anzeige des Bestwerts) */
  unit?: MetricUnit;
  better?: Better;
  history: HistoryEntry[];
  /** Bestwerte je Variante der Einstellungen (nur bei Übungen mit `params`; `best` gilt für die leere Variante) */
  bv?: Record<string, number>;
}

export type Role = 'kunde' | 'optiker' | 'entwickler';

export interface Settings {
  sound: boolean;
  lang: Lang | null;
  /** Ansicht: Kunde (nur die vom Optiker gewählten Übungen) oder Optiker (alles). null = noch nicht gewählt */
  role: Role | null;
  /** Übungen, die der Kunde sieht (vom Optiker gewählt) */
  customerIds: string[];
  /** Vollbild gewünscht (wird beim ersten Antippen eines Besuchs wieder aktiviert; Esc/Knopf schaltet aus) */
  fullscreen: boolean;
  /** Gewählte Übungs-Optionen je Übung und Schlüssel (fehlt bei älteren Datenständen = alles aus) */
  exerciseOptions?: Record<string, Record<string, ExerciseOptionValue>>;
  /** Gewählte Einstellungen je Übung (`ExerciseDefinition.params`); fehlt = Standard */
  exerciseParams?: Record<string, Record<string, ParamValue>>;
  /** Kalibrierung cm/Sehwinkel (null/fehlt = nicht kalibriert, Schätzung 38 px/cm) */
  calib?: CalibSettings;
}

export interface StoreData {
  v: 1;
  exercises: Record<string, ExerciseRecord>;
  /** Tage mit mindestens einer Übung (YYYY-MM-DD, lokale Zeit) */
  days: string[];
  settings: Settings;
}

/** Voreinstellung: die drei Übungen, die Kunden sehen */
export const DEFAULT_CUSTOMER_IDS = ['blitzreaktion', 'kugel-detektiv', 'suchbild'];
export const CUSTOMER_COUNT = 3;

const KEY = `${brand.storageKey}:v1`;
const MAX_HISTORY = 40;
const MAX_DAYS = 400;

let memory: StoreData | null = null;

function empty(): StoreData {
  return { v: 1, exercises: {}, days: [], settings: { sound: true, lang: null, role: null, customerIds: [...DEFAULT_CUSTOMER_IDS], fullscreen: false } };
}

export function load(): StoreData {
  if (memory) return memory;
  let data = empty();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<StoreData>;
      if (parsed && parsed.v === 1) {
        data = {
          v: 1,
          exercises: parsed.exercises ?? {},
          days: Array.isArray(parsed.days) ? parsed.days : [],
          settings: { ...data.settings, ...(parsed.settings ?? {}) },
        };
      }
    }
  } catch {
    /* Speicher gesperrt oder beschädigt → leer beginnen */
  }
  memory = data;
  return data;
}

function persist(data: StoreData): void {
  memory = data;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* ignorieren – dann eben nur für diese Sitzung */
  }
}

export function getRecord(id: string): ExerciseRecord {
  return load().exercises[id] ?? { level: null, best: null, history: [] };
}

export function localDay(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export interface SaveOutcome {
  record: ExerciseRecord;
  /** Letzter früherer Lauf mit denselben Einstellungen (gleicher Variantenschlüssel) */
  previous: HistoryEntry | null;
  /** Bisheriger Bestwert mit denselben Einstellungen */
  previousBest: number | null;
  isBest: boolean;
  /** Variantenschlüssel dieses Laufs ('' = Übung ohne Einstellungen) */
  variant: string;
  /** Verlauf dieser Variante inklusive dieses Laufs (für die Spark-Linie) */
  history: HistoryEntry[];
  /** Es gibt frühere Läufe, aber alle mit anderen Einstellungen (kein Vergleich möglich) */
  onlyOtherVariants: boolean;
}

const MAX_VARIANTS = 40;

/** Variante eines Verlaufseintrags (ältere Einträge: leer) */
export function entryVariant(h: HistoryEntry): string {
  return h.v ?? '';
}

/** Bestwert einer Variante ('' = Übung ohne Einstellungen) */
export function bestFor(rec: ExerciseRecord, variant: string): number | null {
  if (variant === '') return rec.best;
  const b = rec.bv?.[variant];
  return typeof b === 'number' ? b : null;
}

/**
 * Ergebnis speichern. `variant` = Variantenschlüssel der Einstellungen (`variantKey`); Vergleich, Bestwert und
 * Verlauf gelten nur innerhalb gleicher Variante. Ohne Variante ('' – alle Übungen ohne `params`) verhält sich
 * alles wie bisher.
 */
export function saveResult(
  id: string,
  entry: { primary: number; score: number; level: number },
  unit: MetricUnit,
  better: Better,
  variant = '',
): SaveOutcome {
  const data = load();
  const rec = getRecord(id);
  const same = rec.history.filter((h) => entryVariant(h) === variant);
  const previous = same.length ? same[same.length - 1] : null;
  const previousBest = bestFor(rec, variant);
  const isBest =
    previousBest === null || (better === 'higher' ? entry.primary > previousBest : entry.primary < previousBest);
  const newBest = isBest ? entry.primary : previousBest;
  const item: HistoryEntry = { d: Date.now(), p: entry.primary, s: entry.score, l: entry.level, ...(variant ? { v: variant } : {}) };
  let bv = rec.bv;
  if (variant !== '' && newBest !== null) {
    bv = { ...(rec.bv ?? {}), [variant]: newBest };
    const keys = Object.keys(bv);
    // nicht unbegrenzt wachsen lassen: die ältesten Varianten (Einfügereihenfolge) zuerst verwerfen
    if (keys.length > MAX_VARIANTS) for (const k of keys.slice(0, keys.length - MAX_VARIANTS)) delete bv[k];
  }
  const next: ExerciseRecord = {
    level: entry.level,
    best: variant === '' ? newBest : rec.best,
    unit,
    better,
    history: [...rec.history, item].slice(-MAX_HISTORY),
    ...(bv ? { bv } : {}),
  };
  const today = localDay();
  const days = data.days.includes(today) ? data.days : [...data.days, today].slice(-MAX_DAYS);
  persist({ ...data, exercises: { ...data.exercises, [id]: next }, days });
  return {
    record: next,
    previous,
    previousBest,
    isBest: isBest && previousBest !== null,
    variant,
    history: [...same, item],
    onlyOtherVariants: rec.history.length > 0 && same.length === 0,
  };
}

export function doneToday(id: string): boolean {
  const today = localDay();
  return getRecord(id).history.some((h) => localDay(new Date(h.d)) === today);
}

export function countToday(): number {
  const today = localDay();
  let n = 0;
  for (const rec of Object.values(load().exercises)) {
    n += rec.history.filter((h) => localDay(new Date(h.d)) === today).length;
  }
  return n;
}

/** Wochenziel: Trainingstage (Mo–So) in der aktuellen Woche. */
export const WEEK_GOAL = 3;

export function daysThisWeek(now = new Date()): number {
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  const set = new Set(load().days);
  let n = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    if (set.has(localDay(d))) n++;
  }
  return n;
}

/** Tage in Folge (heute oder gestern als letzter Tag zählt noch). */
export function streak(): number {
  const set = new Set(load().days);
  const d = new Date();
  if (!set.has(localDay(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (set.has(localDay(d))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

export function getSettings(): Settings {
  return load().settings;
}

export function updateSettings(patch: Partial<Settings>): Settings {
  const data = load();
  const settings = { ...data.settings, ...patch };
  persist({ ...data, settings });
  return settings;
}

/** Gespeicherte Auswahl einer Übungs-Option; ohne Speicherung oder bei ungültigem Wert: aus, Standard-Wahl */
export function getExerciseOption(exerciseId: string, def: ExerciseOptionDef): ExerciseOptionValue {
  const v = getSettings().exerciseOptions?.[exerciseId]?.[def.key];
  const choice = v && def.choices.includes(v.choice) ? v.choice : def.defaultChoice;
  return { on: v?.on === true, choice };
}

/** Alle Optionen einer Übung (für `ctx.options`); undefined, wenn die Übung keine hat */
export function getExerciseOptions(exerciseId: string, defs: readonly ExerciseOptionDef[] | undefined): Record<string, ExerciseOptionValue> | undefined {
  if (!defs?.length) return undefined;
  const out: Record<string, ExerciseOptionValue> = {};
  for (const d of defs) out[d.key] = getExerciseOption(exerciseId, d);
  return out;
}

export function setExerciseOption(exerciseId: string, key: string, value: ExerciseOptionValue): void {
  const all = getSettings().exerciseOptions ?? {};
  updateSettings({ exerciseOptions: { ...all, [exerciseId]: { ...(all[exerciseId] ?? {}), [key]: { on: value.on === true, choice: String(value.choice) } } } });
}

/** Gespeicherte Einstellungen einer Übung, bereinigt und mit Standardwerten aufgefüllt (ohne `params`: leer) */
export function getExerciseParams(exerciseId: string, defs: readonly ParamDef[] | undefined): Record<string, ParamValue> {
  if (!defs?.length) return {};
  return sanitizeParams(defs, getSettings().exerciseParams?.[exerciseId]);
}

/** Eine Einstellung ändern (der Wert wird bereinigt gespeichert); gibt alle Einstellungen der Übung zurück */
export function setExerciseParam(exerciseId: string, defs: readonly ParamDef[], key: string, value: ParamValue): Record<string, ParamValue> {
  const all = getSettings().exerciseParams ?? {};
  const next = sanitizeParams(defs, { ...getExerciseParams(exerciseId, defs), [key]: value });
  updateSettings({ exerciseParams: { ...all, [exerciseId]: next } });
  return next;
}

/** „Standard wiederherstellen“: gespeicherte Einstellungen der Übung entfernen */
export function resetExerciseParams(exerciseId: string, defs: readonly ParamDef[] | undefined): Record<string, ParamValue> {
  const all = { ...(getSettings().exerciseParams ?? {}) };
  delete all[exerciseId];
  updateSettings({ exerciseParams: all });
  return defaultParams(defs);
}

/** `true`, wenn die gespeicherten Einstellungen vom Standard abweichen */
export function hasCustomParams(exerciseId: string, defs: readonly ParamDef[] | undefined): boolean {
  return !!defs?.length && !isDefaultParams(defs, getSettings().exerciseParams?.[exerciseId]);
}

/** Variantenschlüssel der gerade gespeicherten Einstellungen einer Übung ('' ohne `params`) */
export function currentVariant(exerciseId: string, defs: readonly ParamDef[] | undefined): string {
  return variantKey(defs, getSettings().exerciseParams?.[exerciseId]);
}

/** Gespeicherte Kalibrierung (bereinigt; nicht kalibriert = `pxPerCm: null`) */
export function getCalibSettings(): CalibSettings {
  return sanitizeCalib(getSettings().calib ?? DEFAULT_CALIB);
}

export function setCalibSettings(c: CalibSettings): CalibSettings {
  const clean = sanitizeCalib(c);
  updateSettings({ calib: clean });
  return clean;
}

export function resetCalibSettings(): CalibSettings {
  return setCalibSettings(DEFAULT_CALIB);
}

export function clearAll(): void {
  const settings = load().settings;
  const data = { ...empty(), settings };
  persist(data);
}
