/**
 * Suppressions-Kontrolle: Gelegentlich erscheint ein Symbol nur für das amblyope Auge (Kreis, Dreieck, Quadrat,
 * Stern). Der Spieler tippt die passende Taste. Es wird NICHT diagnostiziert, nur protokolliert.
 *
 *  - Zeitpunkt: alle 60–90 s aktiver Spielzeit (zufällig), nur wenn sich gerade kein Roboter bewegt.
 *  - Anzeige: weich eingeblendet (300 ms), 2,5 s sichtbar, weich ausgeblendet; Antwort bis 10 s nach Beginn.
 *  - Wiederholtes Fehlen = 2 Kontrollen in Folge ohne richtige Antwort → `possibleSuppression = true`
 *    und der Protokolltext „Stimulus möglicherweise nicht wahrgenommen.“
 *  - Optional (Einstellung): danach Kontrast des dominanten Auges senken (siehe contrast.ts).
 */

export type Shape = 'circle' | 'triangle' | 'square' | 'star';
export const SHAPES: readonly Shape[] = ['circle', 'triangle', 'square', 'star'];

export const CHECK_MIN_MS = 60_000;
export const CHECK_MAX_MS = 90_000;
export const CHECK_FADE_MS = 300;
export const CHECK_VISIBLE_MS = 2500;
export const CHECK_ANSWER_MS = 10_000;
/** so viele Fehlende in Folge setzen das Protokoll-Merkmal */
export const MISSES_FOR_FLAG = 2;
/** Protokolltext – bewusst ohne Diagnose */
export const SUPPRESSION_NOTE = 'Stimulus möglicherweise nicht wahrgenommen.';

export interface SuppressionRecord {
  /** Zeitpunkt in ms seit Sessionbeginn */
  atMs: number;
  shape: Shape;
  /** gewählte Antwort; null = „nicht gesehen“ oder keine Antwort in der Zeit */
  answer: Shape | null;
  correct: boolean;
  /** Reaktionszeit ab Einblendung in ms; null ohne Antwort */
  reactionMs: number | null;
}

/** Wartezeit bis zur nächsten Kontrolle (aktive Spielzeit) */
export function nextCheckDelayMs(rnd: () => number): number {
  return Math.round(CHECK_MIN_MS + rnd() * (CHECK_MAX_MS - CHECK_MIN_MS));
}

export function randomShape(rnd: () => number, previous?: Shape): Shape {
  const pool = previous ? SHAPES.filter((s) => s !== previous) : SHAPES;
  return pool[Math.min(pool.length - 1, Math.floor(rnd() * pool.length))];
}

/** Darf jetzt eine Kontrolle starten? (nur bei ruhendem Spiel) */
export function shouldStartCheck(activeSinceLastMs: number, delayMs: number, idle: boolean, enabled: boolean): boolean {
  return enabled && idle && activeSinceLastMs >= delayMs;
}

/** Deckkraft des Symbols t ms nach Beginn (weich, ohne Flackern) */
export function checkAlpha(t: number): number {
  if (t < 0) return 0;
  if (t < CHECK_FADE_MS) return t / CHECK_FADE_MS;
  if (t < CHECK_FADE_MS + CHECK_VISIBLE_MS) return 1;
  const out = t - CHECK_FADE_MS - CHECK_VISIBLE_MS;
  return out < CHECK_FADE_MS ? 1 - out / CHECK_FADE_MS : 0;
}

export function makeRecord(atMs: number, shape: Shape, answer: Shape | null, reactionMs: number | null): SuppressionRecord {
  return { atMs, shape, answer, correct: answer === shape, reactionMs: answer === null ? null : reactionMs };
}

export interface SuppressionSummary {
  checks: number;
  correct: number;
  /** Anteil richtiger Antworten 0–1; null ohne Kontrollen */
  accuracy: number | null;
  possibleSuppression: boolean;
  /** Protokolltext (nur bei gesetztem Merkmal), sonst leer */
  note: string;
  /** Zahl der Auslösungen (für die optionale Kontrastsenkung) */
  flagEvents: number;
}

/**
 * Wertet die Kontrollen einer Session aus. Das Merkmal wird gesetzt, sobald `MISSES_FOR_FLAG` Kontrollen in Folge
 * nicht richtig beantwortet wurden; danach beginnt die Zählung von vorn (für weitere Auslösungen).
 */
export function summarizeSuppression(records: readonly SuppressionRecord[]): SuppressionSummary {
  let streak = 0;
  let flagEvents = 0;
  for (const r of records) {
    if (r.correct) streak = 0;
    else if (++streak >= MISSES_FOR_FLAG) {
      flagEvents++;
      streak = 0;
    }
  }
  const correct = records.filter((r) => r.correct).length;
  const possibleSuppression = flagEvents > 0;
  return {
    checks: records.length,
    correct,
    accuracy: records.length ? correct / records.length : null,
    possibleSuppression,
    note: possibleSuppression ? SUPPRESSION_NOTE : '',
    flagEvents,
  };
}
