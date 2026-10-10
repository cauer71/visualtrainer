/** Einstellungen „Nachzeichnen“ (Therapeutenbereich). Strenge Prüfung, auch beim Import. */
import { bool, num, pick } from '../../data/settings';

export type ChangeMode = 'HARD' | 'FADE';

export interface NachSettings {
  /** Breite des Grundpfads (px, Spielkoordinaten) */
  pathWidth: number;
  /** Anzahl der Stützpunkte der Kurve (Kurvigkeit) */
  curvePoints: number;
  /** Streuung der Stützpunkte in % (Kurvigkeit) */
  curveSpread: number;
  /** Zeitintervall bis zum Farbwechsel (s) */
  intervalS: number;
  /** gezeichnete Strecke bis zum Farbwechsel (px) */
  distancePx: number;
  /** nur Strecke: kein Zeitintervall (für langsame Patienten) */
  onlyDistance: boolean;
  changeMode: ChangeMode;
  /** Gesamtdauer eines Fades (s) */
  fadeS: number;
  /** Fehlerabstand: weiter vom Pfad entfernt = Fehler (px) */
  errorDist: number;
  /** Fehlerlimit je Runde, 0 = aus */
  errorLimit: number;
}

/** Zusatzrand der Toleranzzone: Abstand ≤ halbe Pfadbreite + Rand zählt als genau (px) */
export const TOLERANCE_MARGIN = 14;
/** Radius um den Startpunkt, in dem das Zeichnen beginnen darf (px) */
export const START_RADIUS = 24;
/** Radius um das Linienende, in dem nach Absetzen oder Fehler weitergezeichnet werden darf (px) */
export const RESUME_RADIUS = 30;
/** Radius des Zielrings (px) */
export const GOAL_RADIUS = 30;

export const DEFAULT_NACH: NachSettings = {
  pathWidth: 16,
  curvePoints: 6,
  curveSpread: 60,
  intervalS: 2,
  distancePx: 150,
  onlyDistance: false,
  changeMode: 'HARD',
  fadeS: 0.8,
  errorDist: 28,
  errorLimit: 0,
};

/** kleinster zulässiger Fehlerabstand zu einer Pfadbreite: Toleranzzone plus 2 px */
export const minErrorDist = (pathWidth: number): number => Math.ceil(pathWidth / 2) + TOLERANCE_MARGIN + 2;

export function normalizeNach(x: unknown): NachSettings {
  const o = (x && typeof x === 'object' ? x : {}) as Record<string, unknown>;
  const d = DEFAULT_NACH;
  const pathWidth = num(o.pathWidth, 8, 40, d.pathWidth);
  return {
    pathWidth,
    curvePoints: num(o.curvePoints, 4, 10, d.curvePoints),
    curveSpread: num(o.curveSpread, 20, 100, d.curveSpread, 5),
    intervalS: num(o.intervalS, 0.5, 6, d.intervalS, 0.1),
    distancePx: num(o.distancePx, 40, 400, d.distancePx, 10),
    onlyDistance: bool(o.onlyDistance, d.onlyDistance),
    changeMode: pick(o.changeMode, ['HARD', 'FADE'] as const, d.changeMode),
    fadeS: num(o.fadeS, 0.2, 3, d.fadeS, 0.1),
    errorDist: Math.max(minErrorDist(pathWidth), num(o.errorDist, 16, 80, d.errorDist)),
    errorLimit: num(o.errorLimit, 0, 20, d.errorLimit),
  };
}
