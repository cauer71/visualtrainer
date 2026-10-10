/** Einstellungen „Farbwechsel-Pong“ (Therapeutenbereich). Strenge Prüfung, auch beim Import. */
import { bool, num } from '../../data/settings';

export interface PongSettings {
  /** Radius des Balls (px, Spielkoordinaten; Durchmesser ≥ 24 px) */
  ballRadius: number;
  /** Startgeschwindigkeit des Balls (px/s) */
  startSpeed: number;
  /** Breite der Schläger (px) */
  paddleWidth: number;
  /** Stärke des Computergegners 1–5 */
  opponent: number;
  /** Farbwechsel im Flug (zusätzlich zum Wechsel bei Schlägerkontakt) */
  flightChange: boolean;
  /** Zwei-Spieler-Modus: obere und untere Bildschirmhälfte steuern je einen Schläger */
  twoPlayer: boolean;
  /** Verstärkungsfaktor der relativen Touch-Steuerung */
  gain: number;
  /** Punkte bis Spielende */
  targetScore: number;
}

export const DEFAULT_PONG: PongSettings = {
  ballRadius: 20,
  startSpeed: 520,
  paddleWidth: 150,
  opponent: 3,
  flightChange: false,
  twoPlayer: false,
  gain: 1.3,
  targetScore: 7,
};

export function normalizePong(x: unknown): PongSettings {
  const o = (x && typeof x === 'object' ? x : {}) as Record<string, unknown>;
  const d = DEFAULT_PONG;
  return {
    ballRadius: num(o.ballRadius, 12, 40, d.ballRadius),
    startSpeed: num(o.startSpeed, 300, 900, d.startSpeed, 10),
    paddleWidth: num(o.paddleWidth, 80, 260, d.paddleWidth, 5),
    opponent: num(o.opponent, 1, 5, d.opponent),
    flightChange: bool(o.flightChange, d.flightChange),
    twoPlayer: bool(o.twoPlayer, d.twoPlayer),
    gain: num(o.gain, 0.5, 3, d.gain, 0.1),
    targetScore: num(o.targetScore, 1, 21, d.targetScore),
  };
}
