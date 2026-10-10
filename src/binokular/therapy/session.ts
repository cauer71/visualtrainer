/**
 * Session-Protokoll (Datenerfassung). Reine Datenhaltung mit eingespeister Uhr – testbar ohne Browser.
 *
 * Je Session: Spiel, Datum, Startzeit, Dauer, aktive Spielzeit, Pausen, Punkte, Fehler, Farbwechsel, spielspezifische
 * Werte (Zahlen), Kontrasteinstellungen. Keine Diagnose, keine automatische Bewertung.
 */
import type { Eye, Glasses, LeftLens } from '../vision/color';
import type { FinishReason, GameId, GameSummary } from '../games/types';
import { GAME_IDS } from '../games/types';

export type EndReason = FinishReason;
const END_REASONS: readonly EndReason[] = ['goal', 'limit', 'score', 'user', 'complaints', 'interrupted'];

export interface SessionRecord {
  id: string;
  gameId: GameId;
  patientId: string;
  /** JJJJ-MM-TT (lokal) */
  date: string;
  /** HH:MM (lokal) */
  startTime: string;
  startedAt: string;
  /** Gesamtdauer (Wanduhr) in ms */
  durationMs: number;
  /** aktive Spielzeit (ohne Pausen) in ms */
  activeMs: number;
  pauseMs: number;
  pauses: number;
  points: number;
  errors: number;
  colorChanges: number;
  completed: boolean;
  /** spielspezifische Zahlen (z. B. accuracy, avgDeviation, hits) */
  details: Record<string, number>;
  amblyopicContrast: number;
  fellowEyeContrast: number;
  amblyopicEye: Eye;
  glasses: Glasses;
  leftLens: LeftLens;
  endReason: EndReason;
}

const pad = (n: number): string => String(n).padStart(2, '0');
export const localDate = (d: Date): string => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const localTime = (d: Date): string => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

export interface SessionStart {
  gameId: GameId;
  patientId: string;
  amblyopicContrast: number;
  fellowEyeContrast: number;
  amblyopicEye: Eye;
  glasses: Glasses;
  leftLens: LeftLens;
}

/** Sammelt die Daten einer laufenden Session. `now()` liefert ms (Date.now im Browser, Testuhr im Test). */
export class SessionRecorder {
  private readonly t0: number;
  private readonly start: SessionStart;
  private pauseStart: number | null = null;
  private pauseMs = 0;
  private pauses = 0;

  constructor(start: SessionStart, private readonly now: () => number = () => Date.now()) {
    this.t0 = now();
    this.start = start;
  }

  /** ms seit Sessionbeginn */
  elapsed(): number {
    return this.now() - this.t0;
  }

  pauseBegin(): void {
    if (this.pauseStart === null) this.pauseStart = this.now();
  }

  pauseEnd(): void {
    if (this.pauseStart === null) return;
    this.pauseMs += this.now() - this.pauseStart;
    this.pauses++;
    this.pauseStart = null;
  }

  /** aktive Spielzeit bisher (ohne Pausen, auch ohne die laufende Pause) in ms */
  activeMs(): number {
    const running = this.pauseStart === null ? 0 : this.now() - this.pauseStart;
    return Math.max(0, this.elapsed() - this.pauseMs - running);
  }

  get paused(): boolean {
    return this.pauseStart !== null;
  }

  /** Session abschließen und den Datensatz liefern */
  finish(reason: EndReason, sum: GameSummary): SessionRecord {
    this.pauseEnd();
    const duration = this.elapsed();
    const d = new Date(this.t0);
    return {
      id: `s${this.t0.toString(36)}`,
      gameId: this.start.gameId,
      patientId: this.start.patientId,
      date: localDate(d),
      startTime: localTime(d),
      startedAt: d.toISOString(),
      durationMs: duration,
      activeMs: Math.max(0, duration - this.pauseMs),
      pauseMs: this.pauseMs,
      pauses: this.pauses,
      points: sum.points,
      errors: sum.errors,
      colorChanges: sum.colorChanges,
      completed: sum.completed,
      details: { ...sum.details },
      amblyopicContrast: this.start.amblyopicContrast,
      fellowEyeContrast: this.start.fellowEyeContrast,
      amblyopicEye: this.start.amblyopicEye,
      glasses: this.start.glasses,
      leftLens: this.start.leftLens,
      endReason: reason,
    };
  }
}

const fin = (v: unknown, fallback = 0): number => (typeof v === 'number' && Number.isFinite(v) ? v : fallback);

/**
 * Gespeicherten Datensatz prüfen und bereinigen. Datensätze aus früheren Fassungen (ohne `gameId`, mit Leveln) lassen
 * sich nicht sinnvoll abbilden und entfallen (`null`).
 */
export function normalizeSession(x: unknown): SessionRecord | null {
  if (!x || typeof x !== 'object') return null;
  const o = x as Record<string, unknown>;
  if (typeof o.id !== 'string' || typeof o.date !== 'string' || !GAME_IDS.includes(o.gameId as GameId)) return null;
  const details: Record<string, number> = {};
  if (o.details && typeof o.details === 'object') for (const [k, v] of Object.entries(o.details as Record<string, unknown>)) if (typeof v === 'number' && Number.isFinite(v)) details[k] = v;
  return {
    id: o.id.slice(0, 40),
    gameId: o.gameId as GameId,
    patientId: typeof o.patientId === 'string' ? o.patientId.slice(0, 32) : '',
    date: o.date.slice(0, 10),
    startTime: typeof o.startTime === 'string' ? o.startTime.slice(0, 5) : '',
    startedAt: typeof o.startedAt === 'string' ? o.startedAt.slice(0, 40) : '',
    durationMs: Math.max(0, fin(o.durationMs)),
    activeMs: Math.max(0, fin(o.activeMs)),
    pauseMs: Math.max(0, fin(o.pauseMs)),
    pauses: Math.max(0, Math.round(fin(o.pauses))),
    points: Math.max(0, fin(o.points)),
    errors: Math.max(0, fin(o.errors)),
    colorChanges: Math.max(0, fin(o.colorChanges)),
    completed: o.completed === true,
    details,
    amblyopicContrast: Math.min(100, Math.max(0, fin(o.amblyopicContrast, 100))),
    fellowEyeContrast: Math.min(100, Math.max(0, fin(o.fellowEyeContrast, 20))),
    amblyopicEye: o.amblyopicEye === 'RIGHT' ? 'RIGHT' : 'LEFT',
    glasses: o.glasses === 'RED_GREEN' ? 'RED_GREEN' : 'RED_CYAN',
    leftLens: o.leftLens === 'OTHER' ? 'OTHER' : 'RED',
    endReason: END_REASONS.includes(o.endReason as EndReason) ? (o.endReason as EndReason) : 'interrupted',
  };
}

/** Aktive Spielzeit je Tag in Minuten (für die Verlaufsansicht) */
export function minutesPerDay(sessions: readonly SessionRecord[]): { date: string; minutes: number }[] {
  const m = new Map<string, number>();
  for (const s of sessions) m.set(s.date, (m.get(s.date) ?? 0) + s.activeMs / 60000);
  return [...m.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([date, minutes]) => ({ date, minutes: Math.round(minutes * 10) / 10 }));
}
