/**
 * CSV-Export der Sessions: eine Zeile je Session, Trennzeichen Semikolon, Dezimalkomma (deutsches Excel),
 * UTF-8 mit BOM. Spielspezifische Werte stehen kompakt in einer Zelle („schluessel=wert“).
 */
import type { SessionRecord } from '../therapy/session';

export const CSV_COLUMNS = [
  'Session-ID',
  'Patient-ID',
  'Spiel',
  'Datum',
  'Startzeit',
  'Dauer (min)',
  'Aktive Spielzeit (min)',
  'Pausenzeit (min)',
  'Pausen',
  'Punkte',
  'Fehler',
  'Farbwechsel',
  'Spiel beendet (Ziel erreicht)',
  'Spielwerte',
  'Kontrast amblyopes Auge (%)',
  'Kontrast dominantes Auge (%)',
  'Amblyopes Auge',
  'Brille',
  'Filter links',
  'Ende',
] as const;

const GAME_DE: Record<string, string> = { nachzeichnen: 'Nachzeichnen', pong: 'Farbwechsel-Pong', 'ziehen-ablegen': 'Ziehen & Ablegen' };
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

/** spielspezifische Werte kompakt: „accuracy=93,5 paths=1“ */
export function detailsText(d: Record<string, number>): string {
  return Object.entries(d)
    .map(([k, v]) => `${k}=${Number.isInteger(v) ? String(v) : deNum(v, 1)}`)
    .join(' ');
}

export function sessionRow(s: SessionRecord): string[] {
  return [
    s.id,
    s.patientId,
    GAME_DE[s.gameId] ?? s.gameId,
    s.date,
    s.startTime,
    min(s.durationMs),
    min(s.activeMs),
    min(s.pauseMs),
    String(s.pauses),
    String(s.points),
    String(s.errors),
    String(s.colorChanges),
    s.completed ? 'ja' : 'nein',
    detailsText(s.details),
    deNum(s.amblyopicContrast),
    deNum(s.fellowEyeContrast),
    s.amblyopicEye === 'LEFT' ? 'links' : 'rechts',
    s.glasses === 'RED_CYAN' ? 'Rot/Cyan' : 'Rot/Grün',
    s.leftLens === 'RED' ? 'Rot' : s.glasses === 'RED_CYAN' ? 'Cyan' : 'Grün',
    s.endReason,
  ];
}

export function sessionsToCsv(sessions: readonly SessionRecord[]): string {
  const lines = [CSV_COLUMNS.map(csvCell).join(SEP), ...sessions.map((s) => sessionRow(s).map(csvCell).join(SEP))];
  return '﻿' + lines.join('\r\n') + '\r\n';
}
