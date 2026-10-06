/**
 * CSV-Export der Sessions: eine Zeile je Session, Trennzeichen Semikolon, Dezimalkomma (deutsches Excel),
 * UTF-8 mit BOM. Listen (Kontrastverlauf, Kontrollen, Reaktionszeiten, Pausen) stehen kompakt in einer Zelle.
 */
import type { LevelAttempt, SessionRecord } from '../therapy/session';

export const CSV_COLUMNS = [
  'Session-ID',
  'Patient-ID',
  'Datum',
  'Startzeit',
  'Dauer (min)',
  'Aktive Spielzeit (min)',
  'Pausenzeit (min)',
  'Pausen',
  'Level gespielt',
  'Level abgeschlossen',
  'Höchstes Level',
  'Sterne',
  'Erfolgsrate (%)',
  'Fehler (Fehlversuche)',
  'Kontrast amblyopes Auge (%)',
  'Kontrast dominantes Auge Start (%)',
  'Kontrast dominantes Auge Ende (%)',
  'Kontrastverlauf',
  'Suppressionskontrollen',
  'Kontrollen richtig (%)',
  'Protokollhinweis',
  'Reaktionszeiten (ms)',
  'Mittlere Reaktionszeit (ms)',
  'Amblyopes Auge',
  'Brille',
  'Filter links',
  'Geplante Dauer (min)',
  'Ende',
  'Level-Details',
] as const;

const RESULT_DE: Record<LevelAttempt['result'], string> = { completed: 'geschafft', timeout: 'Zeit um', restarted: 'neu gestartet', aborted: 'abgebrochen' };

/** ein Levelversuch kompakt: „L2 geschafft, 3 Sterne, 0 Fehler, 95 s“ */
export function attemptText(a: LevelAttempt): string {
  return `L${a.levelNumber} ${RESULT_DE[a.result] ?? a.result}, ${a.stars} Sterne, ${a.failures} Fehler, ${Math.round(a.activeMs / 1000)} s`;
}

const SEP = ';';

/** Zahl mit Dezimalkomma */
export function deNum(v: number | null, digits = 1): string {
  if (v === null || !Number.isFinite(v)) return '';
  return v.toFixed(digits).replace('.', ',');
}

/** Zelle maskieren: Anführungszeichen bei Trennzeichen, Anführungszeichen, Zeilenumbruch; Formel-Schutz */
export function csvCell(v: string): string {
  let s = v;
  if (/^[=+\-@]/.test(s)) s = `'${s}`;
  return /[";\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

const min = (ms: number) => deNum(ms / 60000, 1);
const pct = (x: number | null) => (x === null ? '' : deNum(x * 100, 0));

export function sessionRow(s: SessionRecord): string[] {
  return [
    s.id,
    s.patientId,
    s.date,
    s.startTime,
    min(s.durationMs),
    min(s.activeMs),
    min(s.pauseMs),
    String(s.pauses.length),
    String(s.levelsPlayed),
    String(s.levelsCompleted),
    String(s.highestLevel),
    String(s.stars),
    pct(s.successRate),
    String(s.errors),
    deNum(s.amblyopicContrast),
    deNum(s.fellowContrastStart),
    deNum(s.fellowContrastEnd),
    s.contrastHistory.map((p) => deNum(p.value)).join(' > '),
    s.suppressionChecks.map((c) => `${c.shape}:${c.answer ?? '-'}`).join(' '),
    pct(s.suppressionAccuracy),
    s.suppressionNote,
    s.reactionTimesMs.join(' '),
    s.meanReactionMs === null ? '' : String(s.meanReactionMs),
    s.amblyopicEye === 'LEFT' ? 'links' : 'rechts',
    s.glasses === 'RED_CYAN' ? 'Rot/Cyan' : 'Rot/Grün',
    s.leftLens === 'RED' ? 'Rot' : s.glasses === 'RED_CYAN' ? 'Cyan' : 'Grün',
    String(s.plannedMinutes),
    s.endReason,
    s.attempts.map(attemptText).join(' | '),
  ];
}

export function sessionsToCsv(sessions: readonly SessionRecord[]): string {
  const lines = [CSV_COLUMNS.map(csvCell).join(SEP), ...sessions.map((s) => sessionRow(s).map(csvCell).join(SEP))];
  return '﻿' + lines.join('\r\n') + '\r\n';
}
