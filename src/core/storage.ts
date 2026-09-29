/**
 * Lokale Speicherung (nur auf diesem Gerät, keine Server, keine Cookies).
 * Fällt bei gesperrtem localStorage (z. B. privater Modus) auf Speicher im RAM zurück.
 */
import type { Lang } from '../i18n/lang';
import { brand } from '../config/brand';
import type { Better, MetricUnit } from './types';

export interface HistoryEntry {
  /** Zeitpunkt (epoch ms) */
  d: number;
  /** Hauptkennzahl */
  p: number;
  /** Punkte */
  s: number;
  /** Stufe */
  l: number;
}

export interface ExerciseRecord {
  level: number | null;
  best: number | null;
  /** Einheit und Richtung der Hauptkennzahl (für die Anzeige des Bestwerts) */
  unit?: MetricUnit;
  better?: Better;
  history: HistoryEntry[];
}

export interface Settings {
  sound: boolean;
  lang: Lang | null;
}

export interface StoreData {
  v: 1;
  exercises: Record<string, ExerciseRecord>;
  /** Tage mit mindestens einer Übung (YYYY-MM-DD, lokale Zeit) */
  days: string[];
  settings: Settings;
}

const KEY = `${brand.storageKey}:v1`;
const MAX_HISTORY = 40;
const MAX_DAYS = 400;

let memory: StoreData | null = null;

function empty(): StoreData {
  return { v: 1, exercises: {}, days: [], settings: { sound: true, lang: null } };
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
  previous: HistoryEntry | null;
  previousBest: number | null;
  isBest: boolean;
}

export function saveResult(
  id: string,
  entry: { primary: number; score: number; level: number },
  unit: MetricUnit,
  better: Better,
): SaveOutcome {
  const data = load();
  const rec = getRecord(id);
  const previous = rec.history.length ? rec.history[rec.history.length - 1] : null;
  const previousBest = rec.best;
  const isBest =
    previousBest === null || (better === 'higher' ? entry.primary > previousBest : entry.primary < previousBest);
  const next: ExerciseRecord = {
    level: entry.level,
    best: isBest ? entry.primary : previousBest,
    unit,
    better,
    history: [...rec.history, { d: Date.now(), p: entry.primary, s: entry.score, l: entry.level }].slice(-MAX_HISTORY),
  };
  const today = localDay();
  const days = data.days.includes(today) ? data.days : [...data.days, today].slice(-MAX_DAYS);
  persist({ ...data, exercises: { ...data.exercises, [id]: next }, days });
  return { record: next, previous, previousBest, isBest: isBest && previousBest !== null };
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

export function clearAll(): void {
  const settings = load().settings;
  const data = { ...empty(), settings };
  persist(data);
}
