/** Einstellungen „Farbwechsel-Pong“ (Therapeutenbereich). Strenge Prüfung, auch beim Import. */
import { bool, num, pick } from '../../data/settings';

export type FlightFreq = 'rare' | 'normal' | 'often';
export const FLIGHT_FREQS: readonly FlightFreq[] = ['rare', 'normal', 'often'];

export interface PongSettings {
  /** Radius des Balls (px, Spielkoordinaten; Durchmesser ≥ 24 px) */
  ballRadius: number;
  /** Startgeschwindigkeit des Balls (px/s) */
  startSpeed: number;
  /** Breite der Schläger (px) */
  paddleWidth: number;
  /** Stärke des Computergegners 1–5 */
  opponent: number;
  /** Farbwechsel im Flug (null bis zwei Wechsel je Flug, zusätzlich zum Wechsel bei Schlägerkontakt) */
  flightChange: boolean;
  /** Häufigkeit der Flugwechsel: selten / normal / häufig (Gewichte für 0, 1, 2 Wechsel je Flug) */
  flightFreq: FlightFreq;
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
  flightChange: true,
  flightFreq: 'normal',
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
    flightFreq: pick(o.flightFreq, FLIGHT_FREQS, d.flightFreq),
    twoPlayer: bool(o.twoPlayer, d.twoPlayer),
    gain: num(o.gain, 0.5, 3, d.gain, 0.1),
    targetScore: num(o.targetScore, 1, 21, d.targetScore),
  };
}
