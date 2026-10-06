/**
 * Klangdefinitionen (rein, ohne Web Audio): Jeder Effekt ist eine kurze Folge weicher Töne (Sinus oder Dreieck,
 * weiche Hüllkurve). Keine Audiodateien, keine Dauertöne, nichts Schrilles: Frequenzen 140–1400 Hz, jeder Ton
 * höchstens 0,6 s, jeder Effekt höchstens 1,4 s.
 *
 * Die Spiellogik meldet Ereignisse (`GameMessage`), die Oberfläche eigene Ereignisse (Kontrollaufgabe, Level
 * geschafft, Pause …). `GAME_SOUND` ordnet jedem Spielereignis einen Effekt zu.
 */
import type { GameMessage } from '../game/types';

export type SoundEvent =
  | 'select'
  | 'move'
  | 'dig'
  | 'pickup'
  | 'pickupCrystal'
  | 'drop'
  | 'switch'
  | 'plateOn'
  | 'plateOff'
  | 'platform'
  | 'door'
  | 'deliver'
  | 'hazard'
  | 'blocked'
  | 'check'
  | 'levelComplete'
  | 'levelTimeout'
  | 'pause'
  | 'resume'
  | 'sessionEnd';

export interface Note {
  /** Frequenz in Hz */
  f: number;
  /** Zielfrequenz (weiches Gleiten), sonst gleich */
  f2?: number;
  /** Beginn in s nach dem Auslösen */
  t: number;
  /** Dauer in s */
  d: number;
  type: 'sine' | 'triangle';
  /** relative Lautstärke 0–1 (wird mit der Gesamtlautstärke multipliziert) */
  g: number;
}

/** Spielereignis → Effekt (jedes Ereignis hat einen Effekt) */
export const GAME_SOUND: Record<GameMessage, SoundEvent> = {
  selectRobot: 'blocked',
  robotSelected: 'select',
  noPath: 'blocked',
  needKey: 'blocked',
  doorOpened: 'door',
  switchOn: 'switch',
  switchOff: 'switch',
  dug: 'dig',
  pickedKey: 'pickup',
  pickedCrystal: 'pickupCrystal',
  handsFull: 'blocked',
  dropped: 'drop',
  nothingHere: 'blocked',
  delivered: 'deliver',
  needCrystal: 'blocked',
  hazard: 'hazard',
  won: 'levelComplete',
  moveStart: 'move',
  platformMoved: 'platform',
  plateOn: 'plateOn',
  plateOff: 'plateOff',
};

/** Alle Effekte (für Tests und die Doku) */
export const SOUND_EVENTS: readonly SoundEvent[] = [
  'select',
  'move',
  'dig',
  'pickup',
  'pickupCrystal',
  'drop',
  'switch',
  'plateOn',
  'plateOff',
  'platform',
  'door',
  'deliver',
  'hazard',
  'blocked',
  'check',
  'levelComplete',
  'levelTimeout',
  'pause',
  'resume',
  'sessionEnd',
];

const n = (f: number, t: number, d: number, g: number, type: Note['type'] = 'sine', f2?: number): Note => ({ f, t, d, g, type, ...(f2 ? { f2 } : {}) });

// Töne (Hz): C5 523, D5 587, E5 659, G5 784, A5 880, C6 1047
/**
 * Notenfolge eines Effekts. `stars` (0–3) nur für „Level geschafft“: kurze Melodie, danach je Stern ein Glockenton.
 * Die Kontrollaufgabe hat immer denselben Hinweiston – er verrät das Symbol nicht.
 */
export function soundNotes(ev: SoundEvent, stars = 0): Note[] {
  switch (ev) {
    case 'select':
      return [n(880, 0, 0.07, 0.5)];
    case 'move':
      return [n(330, 0, 0.06, 0.25, 'triangle')];
    case 'dig':
      return [n(170, 0, 0.08, 0.7, 'triangle'), n(150, 0.11, 0.08, 0.6, 'triangle'), n(140, 0.22, 0.09, 0.5, 'triangle')];
    case 'pickup':
      return [n(523, 0, 0.12, 0.6, 'sine', 784)];
    case 'pickupCrystal':
      return [n(784, 0, 0.1, 0.55), n(1175, 0.09, 0.16, 0.45)];
    case 'drop':
      return [n(392, 0, 0.12, 0.6, 'sine', 294)];
    case 'switch':
      return [n(600, 0, 0.045, 0.6, 'triangle'), n(900, 0.06, 0.05, 0.5, 'triangle')];
    case 'plateOn':
      return [n(440, 0, 0.1, 0.55, 'triangle', 523)];
    case 'plateOff':
      return [n(523, 0, 0.1, 0.45, 'triangle', 440)];
    case 'platform':
      return [n(220, 0, 0.55, 0.35, 'triangle', 330)];
    case 'door':
      return [n(330, 0, 0.12, 0.6, 'triangle'), n(494, 0.12, 0.2, 0.55, 'triangle')];
    case 'deliver':
      return [n(659, 0, 0.14, 0.6), n(988, 0.13, 0.3, 0.5)];
    case 'hazard':
      // weich, nicht erschreckend: kurzes, tiefes „Plopp“ nach unten
      return [n(260, 0, 0.28, 0.55, 'sine', 180)];
    case 'blocked':
      return [n(300, 0, 0.09, 0.35)];
    case 'check':
      return [n(660, 0, 0.12, 0.4), n(880, 0.15, 0.16, 0.35)];
    case 'levelComplete': {
      const melody = [n(523, 0, 0.16, 0.6, 'triangle'), n(659, 0.16, 0.16, 0.6, 'triangle'), n(784, 0.32, 0.3, 0.6, 'triangle')];
      const s = Math.max(0, Math.min(3, Math.round(stars)));
      for (let i = 0; i < s; i++) melody.push(n(1047, 0.7 + i * 0.2, 0.22, 0.4));
      return melody;
    }
    case 'levelTimeout':
      return [n(523, 0, 0.18, 0.5, 'triangle'), n(440, 0.2, 0.3, 0.45, 'triangle')];
    case 'pause':
      return [n(523, 0, 0.16, 0.5), n(392, 0.17, 0.25, 0.45)];
    case 'resume':
      return [n(392, 0, 0.14, 0.5), n(523, 0.15, 0.2, 0.45)];
    case 'sessionEnd':
      return [n(523, 0, 0.2, 0.55, 'triangle'), n(659, 0.22, 0.2, 0.55, 'triangle'), n(784, 0.44, 0.2, 0.55, 'triangle'), n(1047, 0.66, 0.45, 0.45)];
  }
}

/** Gesamtdauer eines Effekts in s */
export function soundDuration(notes: readonly Note[]): number {
  return notes.reduce((m, x) => Math.max(m, x.t + x.d), 0);
}
