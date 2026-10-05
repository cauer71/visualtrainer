/**
 * Session-Protokoll (Datenerfassung). Reine Datenhaltung mit eingespeister Uhr – testbar ohne Browser.
 *
 * Je Session: Datum, Startzeit, Dauer, aktive Spielzeit, Level, Sterne, Erfolgsrate, Fehler, amblyopicContrast,
 * fellowEyeContrast, Kontrastverlauf, Suppressionskontrollen, Reaktionszeiten, Pausenzeiten.
 * Keine Diagnose, keine automatische Bewertung.
 */
import type { Eye, Glasses, LeftLens } from '../vision/color';
import { summarizeSuppression, type SuppressionRecord } from './suppression';

export type EndReason = 'time' | 'user' | 'complaints' | 'interrupted';
export type AttemptResult = 'completed' | 'timeout' | 'restarted' | 'aborted';

export interface LevelAttempt {
  levelId: string;
  levelNumber: number;
  /** ms seit Sessionbeginn */
  startedAtMs: number;
  activeMs: number;
  result: AttemptResult;
  stars: number;
  /** Fehlversuche (Gefahr berührt) */
  failures: number;
  fellowContrastBefore: number;
  fellowContrastAfter: number;
}

export interface ContrastPoint {
  /** ms seit Sessionbeginn */
  tMs: number;
  value: number;
  reason: 'start' | 'success' | 'repeatedFailure' | 'suppression' | 'manual';
}

export interface PauseRecord {
  startMs: number;
  durationMs: number;
}

export interface SessionRecord {
  id: string;
  patientId: string;
  /** JJJJ-MM-TT (lokal) */
  date: string;
  /** HH:MM (lokal) */
  startTime: string;
  startedAt: string;
  /** Gesamtdauer (Wanduhr) in ms */
  durationMs: number;
  /** aktive Spielzeit (Level läuft, ohne Pausen/Kontrollen/Zwischenbildschirme) in ms */
  activeMs: number;
  pauseMs: number;
  pauses: PauseRecord[];
  attempts: LevelAttempt[];
  levelsPlayed: number;
  levelsCompleted: number;
  /** höchstes erreichtes Level */
  highestLevel: number;
  stars: number;
  /** abgeschlossene / gespielte Level (0–1); null ohne Level */
  successRate: number | null;
  /** Fehlversuche gesamt */
  errors: number;
  amblyopicContrast: number;
  fellowContrastStart: number;
  fellowContrastEnd: number;
  contrastHistory: ContrastPoint[];
  suppressionChecks: SuppressionRecord[];
  suppressionAccuracy: number | null;
  possibleSuppression: boolean;
  suppressionNote: string;
  reactionTimesMs: number[];
  meanReactionMs: number | null;
  endReason: EndReason;
  amblyopicEye: Eye;
  glasses: Glasses;
  leftLens: LeftLens;
  plannedMinutes: number;
}

const pad = (n: number): string => String(n).padStart(2, '0');
export const localDate = (d: Date): string => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const localTime = (d: Date): string => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

export interface SessionStart {
  patientId: string;
  amblyopicContrast: number;
  fellowEyeContrast: number;
  amblyopicEye: Eye;
  glasses: Glasses;
  leftLens: LeftLens;
  plannedMinutes: number;
}

/** Sammelt die Daten einer laufenden Session. `now()` liefert ms (Date.now im Browser, Testuhr im Test). */
export class SessionRecorder {
  readonly record: SessionRecord;
  private readonly t0: number;
  private pauseStart: number | null = null;

  constructor(start: SessionStart, private readonly now: () => number = () => Date.now()) {
    this.t0 = now();
    const d = new Date(this.t0);
    this.record = {
      id: `s${this.t0.toString(36)}`,
      patientId: start.patientId,
      date: localDate(d),
      startTime: localTime(d),
      startedAt: d.toISOString(),
      durationMs: 0,
      activeMs: 0,
      pauseMs: 0,
      pauses: [],
      attempts: [],
      levelsPlayed: 0,
      levelsCompleted: 0,
      highestLevel: 0,
      stars: 0,
      successRate: null,
      errors: 0,
      amblyopicContrast: start.amblyopicContrast,
      fellowContrastStart: start.fellowEyeContrast,
      fellowContrastEnd: start.fellowEyeContrast,
      contrastHistory: [{ tMs: 0, value: start.fellowEyeContrast, reason: 'start' }],
      suppressionChecks: [],
      suppressionAccuracy: null,
      possibleSuppression: false,
      suppressionNote: '',
      reactionTimesMs: [],
      meanReactionMs: null,
      endReason: 'interrupted',
      amblyopicEye: start.amblyopicEye,
      glasses: start.glasses,
      leftLens: start.leftLens,
      plannedMinutes: start.plannedMinutes,
    };
  }

  /** ms seit Sessionbeginn */
  elapsed(): number {
    return this.now() - this.t0;
  }

  addActive(ms: number): void {
    this.record.activeMs += Math.max(0, ms);
  }

  addAttempt(a: Omit<LevelAttempt, 'startedAtMs'> & { startedAtMs?: number }): void {
    const r = this.record;
    r.attempts.push({ startedAtMs: a.startedAtMs ?? this.elapsed(), ...a } as LevelAttempt);
    const counted = r.attempts.filter((x) => x.result !== 'aborted');
    r.levelsPlayed = counted.length;
    r.levelsCompleted = counted.filter((x) => x.result === 'completed').length;
    r.highestLevel = counted.reduce((m, x) => Math.max(m, x.levelNumber), 0);
    r.stars = r.attempts.reduce((s, x) => s + x.stars, 0);
    r.errors = r.attempts.reduce((s, x) => s + x.failures, 0);
    r.successRate = counted.length ? r.levelsCompleted / counted.length : null;
  }

  contrastChange(value: number, reason: ContrastPoint['reason']): void {
    this.record.contrastHistory.push({ tMs: this.elapsed(), value, reason });
    this.record.fellowContrastEnd = value;
  }

  addSuppression(rec: SuppressionRecord): ReturnType<typeof summarizeSuppression> {
    const r = this.record;
    r.suppressionChecks.push(rec);
    if (rec.reactionMs !== null) r.reactionTimesMs.push(rec.reactionMs);
    const sum = summarizeSuppression(r.suppressionChecks);
    r.suppressionAccuracy = sum.accuracy;
    r.possibleSuppression = sum.possibleSuppression;
    r.suppressionNote = sum.note;
    r.meanReactionMs = r.reactionTimesMs.length ? Math.round(r.reactionTimesMs.reduce((s, x) => s + x, 0) / r.reactionTimesMs.length) : null;
    return sum;
  }

  pauseBegin(): void {
    if (this.pauseStart === null) this.pauseStart = this.now();
  }

  pauseEnd(): void {
    if (this.pauseStart === null) return;
    const d = this.now() - this.pauseStart;
    this.record.pauses.push({ startMs: this.pauseStart - this.t0, durationMs: d });
    this.record.pauseMs += d;
    this.pauseStart = null;
  }

  get paused(): boolean {
    return this.pauseStart !== null;
  }

  /** aktueller Stand (z. B. zum Zwischenspeichern) */
  snapshot(): SessionRecord {
    return { ...this.record, durationMs: this.elapsed(), attempts: [...this.record.attempts] };
  }

  finish(reason: EndReason): SessionRecord {
    this.pauseEnd();
    this.record.durationMs = this.elapsed();
    this.record.endReason = reason;
    return this.snapshot();
  }
}

/** Zusammenfassung über alle Sessions für die Verlaufsansicht */
export function minutesPerDay(sessions: readonly SessionRecord[]): { date: string; minutes: number }[] {
  const m = new Map<string, number>();
  for (const s of sessions) m.set(s.date, (m.get(s.date) ?? 0) + s.activeMs / 60000);
  return [...m.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([date, minutes]) => ({ date, minutes: Math.round(minutes * 10) / 10 }));
}
