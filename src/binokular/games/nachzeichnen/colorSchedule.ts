/**
 * Farbwechsel des Grundpfads (rein). Der Pfad gehört immer genau EINEM Auge (`eye`: AMBLYOPIC oder FELLOW – welche
 * Farbe das ist, entscheidet `vision/color.ts` aus Profil und Zuordnung). Gewechselt wird, sobald EINE Bedingung
 * erfüllt ist: Zeitintervall abgelaufen ODER gezeichnete Strecke seit dem letzten Wechsel erreicht (mit „nur Strecke“
 * entfällt die Zeit). Danach werden beide Zähler zurückgesetzt.
 *
 * Wechselarten:
 *  - HARD: sofort umschalten.
 *  - FADE: erst blendet die alte Farbe zum Hintergrund aus (Kontrastfaktor k 1 → 0, erste Hälfte der Dauer), dann die
 *    neue aus dem Hintergrund ein (k 0 → 1, zweite Hälfte). Nie beide Farben gleichzeitig (eine Mischfarbe wäre
 *    für beide Augen sichtbar). Während des Fades laufen die Zähler nicht.
 */
export type EyeSlot = 'AMBLYOPIC' | 'FELLOW';

export interface ScheduleConfig {
  intervalMs: number;
  distancePx: number;
  onlyDistance: boolean;
  mode: 'HARD' | 'FADE';
  fadeMs: number;
}

export type SchedulePhase = 'steady' | 'fadeOut' | 'fadeIn';

export interface ScheduleState {
  eye: EyeSlot;
  phase: SchedulePhase;
  /** Zeit seit dem letzten Wechsel (ms) */
  elapsedMs: number;
  /** gezeichnete Strecke seit dem letzten Wechsel (px) */
  drawnPx: number;
  /** Zeit in der laufenden Fade-Hälfte (ms) */
  fadeMsDone: number;
  /** Anzahl der Farbwechsel (ein Wechsel zählt, sobald die neue Farbe beginnt) */
  changes: number;
}

export const otherSlot = (e: EyeSlot): EyeSlot => (e === 'AMBLYOPIC' ? 'FELLOW' : 'AMBLYOPIC');

export function newSchedule(startEye: EyeSlot): ScheduleState {
  return { eye: startEye, phase: 'steady', elapsedMs: 0, drawnPx: 0, fadeMsDone: 0, changes: 0 };
}

/** Dauer einer Fade-Hälfte (ms), mindestens 1 */
export const halfFade = (c: ScheduleConfig): number => Math.max(1, c.fadeMs / 2);

/** Sichtbarer Anteil der aktuellen Farbe: im Fade 1 → 0 bzw. 0 → 1, sonst 1 */
export function colorK(s: ScheduleState, c: ScheduleConfig): number {
  if (s.phase === 'steady') return 1;
  const f = Math.min(1, s.fadeMsDone / halfFade(c));
  return s.phase === 'fadeOut' ? 1 - f : f;
}

/**
 * Eine Zeitspanne `dtMs` mit `drawnPx` gezeichneter Strecke verarbeiten. Gibt die neuen Zustandswerte zurück
 * (der übergebene Zustand wird nicht verändert) und die Zahl der Wechsel in diesem Schritt.
 */
export function stepSchedule(prev: ScheduleState, c: ScheduleConfig, dtMs: number, drawnPx: number): { state: ScheduleState; changed: number } {
  const s = { ...prev };
  let changed = 0;
  let dt = Math.max(0, dtMs);
  let px = Math.max(0, drawnPx);
  const half = halfFade(c);
  // Schleife: ein großer Zeitschritt darf mehrere Phasen durchlaufen
  for (let guard = 0; guard < 16; guard++) {
    if (s.phase === 'steady') {
      // Strecke zuerst: sie wirkt sofort; die Zeit läuft nur bis zum Intervallende
      let timeLeft = Infinity;
      if (!c.onlyDistance) timeLeft = Math.max(0, c.intervalMs - s.elapsedMs);
      const useDt = Math.min(dt, timeLeft);
      s.elapsedMs += useDt;
      s.drawnPx += px;
      px = 0;
      dt -= useDt;
      const byTime = !c.onlyDistance && s.elapsedMs >= c.intervalMs;
      const byDist = s.drawnPx >= c.distancePx;
      if (!byTime && !byDist) break;
      if (c.mode === 'HARD') {
        s.eye = otherSlot(s.eye);
        s.elapsedMs = 0;
        s.drawnPx = 0;
        s.changes++;
        changed++;
      } else {
        s.phase = 'fadeOut';
        s.fadeMsDone = 0;
      }
      if (dt <= 0) break;
    } else if (s.phase === 'fadeOut') {
      const use = Math.min(dt, half - s.fadeMsDone);
      s.fadeMsDone += use;
      dt -= use;
      px = 0; // Strecke im Fade zählt nicht
      if (s.fadeMsDone >= half) {
        s.eye = otherSlot(s.eye);
        s.phase = 'fadeIn';
        s.fadeMsDone = 0;
        s.changes++;
        changed++;
      }
      if (dt <= 0) break;
    } else {
      const use = Math.min(dt, half - s.fadeMsDone);
      s.fadeMsDone += use;
      dt -= use;
      px = 0;
      if (s.fadeMsDone >= half) {
        s.phase = 'steady';
        s.fadeMsDone = 0;
        s.elapsedMs = 0;
        s.drawnPx = 0;
      }
      if (dt <= 0) break;
    }
  }
  return { state: s, changed };
}

/**
 * Sichtbare Farben mit Kontrastfaktor: höchstens EINE mit k > 0 (nie beide gleichzeitig).
 * Im Fade-Out ist es die alte Farbe, im Fade-In die neue.
 */
export function visibleColors(s: ScheduleState, c: ScheduleConfig): { eye: EyeSlot; k: number }[] {
  return [
    { eye: 'AMBLYOPIC', k: s.eye === 'AMBLYOPIC' ? colorK(s, c) : 0 },
    { eye: 'FELLOW', k: s.eye === 'FELLOW' ? colorK(s, c) : 0 },
  ];
}
