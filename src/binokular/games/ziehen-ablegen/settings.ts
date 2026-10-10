/** Einstellungen „Ziehen & Ablegen“ (Therapeutenbereich). Strenge Prüfung, auch beim Import. */
import { num, pick } from '../../data/settings';

/** Rollen: Ball rot / Ring Zweitfarbe, umgekehrt, oder nach jeder Runde wechselnd */
export type RoleMode = 'RED_BALL' | 'SECOND_BALL' | 'ALTERNATE';
export const ROLE_MODES: readonly RoleMode[] = ['ALTERNATE', 'RED_BALL', 'SECOND_BALL'];

export interface ZaSettings {
  /** Startlevel 1–16 */
  startLevel: number;
  roles: RoleMode;
  /** Runden pro Sitzung, 0 = unbegrenzt */
  rounds: number;
  /** Faktor der Ringgröße in % (70–150) */
  ringScale: number;
  /** Faktor des Tempos in % (70–150) */
  speedScale: number;
  /** Faktor des Zeitfensters in % (70–150) */
  timeScale: number;
  /** Ball-Offset über dem Finger in px, 0 = automatisch */
  offset: number;
}

export const DEFAULT_ZA: ZaSettings = { startLevel: 1, roles: 'ALTERNATE', rounds: 20, ringScale: 100, speedScale: 100, timeScale: 100, offset: 0 };

export function normalizeZa(x: unknown): ZaSettings {
  const o = (x && typeof x === 'object' ? x : {}) as Record<string, unknown>;
  const d = DEFAULT_ZA;
  const offset = num(o.offset, 0, 200, d.offset);
  return {
    startLevel: num(o.startLevel, 1, 16, d.startLevel),
    roles: pick(o.roles, ROLE_MODES, d.roles),
    rounds: num(o.rounds, 0, 200, d.rounds),
    ringScale: num(o.ringScale, 70, 150, d.ringScale, 5),
    speedScale: num(o.speedScale, 70, 150, d.speedScale, 5),
    timeScale: num(o.timeScale, 70, 150, d.timeScale, 5),
    // 1–39 px würden den Finger nicht sicher vom Ball trennen: auf 40 anheben
    offset: offset === 0 ? 0 : Math.max(40, offset),
  };
}
