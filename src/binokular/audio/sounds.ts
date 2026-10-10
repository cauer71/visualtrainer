/**
 * Klangdefinitionen (rein, ohne Web Audio): Jeder Effekt ist eine kurze Folge weicher Töne (Sinus oder Dreieck,
 * weiche Hüllkurve). Keine Audiodateien, keine Dauertöne, nichts Schrilles: Frequenzen 140–1400 Hz, jeder Ton
 * höchstens 0,6 s, jeder Effekt höchstens 1,4 s.
 *
 * Die Spiele melden Ereignisse (`SoundEvent`); `play` des Spielkontexts macht daraus Töne.
 */
export type SoundEvent =
  /** Bedienung (Ton-Knopf, Auswahl) */
  | 'select'
  /** Treffer (Schläger trifft den Ball) */
  | 'hit'
  /** Fehler (Pfad verlassen, Ball verpasst) – weich, nicht erschreckend */
  | 'error'
  /** Farbwechsel im Flug */
  | 'colorChange'
  /** Ziel erreicht (Nachzeichnen) */
  | 'goal'
  /** Ball prallt an der Wand ab */
  | 'wall'
  /** Punkt gemacht */
  | 'point'
  /** Spiel zu Ende */
  | 'gameEnd'
  | 'pause'
  | 'resume';

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

/** Alle Effekte (für Tests und die Doku) */
export const SOUND_EVENTS: readonly SoundEvent[] = ['select', 'hit', 'error', 'colorChange', 'goal', 'wall', 'point', 'gameEnd', 'pause', 'resume'];

const n = (f: number, t: number, d: number, g: number, type: Note['type'] = 'sine', f2?: number): Note => ({ f, t, d, g, type, ...(f2 ? { f2 } : {}) });

// Töne (Hz): C5 523, D5 587, E5 659, G5 784, A5 880, C6 1047
/** Notenfolge eines Effekts */
export function soundNotes(ev: SoundEvent): Note[] {
  switch (ev) {
    case 'select':
      return [n(880, 0, 0.07, 0.5)];
    case 'hit':
      return [n(440, 0, 0.07, 0.55, 'triangle', 520)];
    case 'error':
      // weich, nicht erschreckend: kurzes, tiefes „Plopp“ nach unten
      return [n(260, 0, 0.26, 0.55, 'sine', 180)];
    case 'colorChange':
      return [n(660, 0, 0.05, 0.4), n(880, 0.06, 0.07, 0.35)];
    case 'goal':
      return [n(523, 0, 0.16, 0.6, 'triangle'), n(659, 0.16, 0.16, 0.6, 'triangle'), n(784, 0.32, 0.3, 0.6, 'triangle'), n(1047, 0.64, 0.4, 0.45)];
    case 'wall':
      return [n(300, 0, 0.05, 0.3, 'triangle')];
    case 'point':
      return [n(659, 0, 0.12, 0.6), n(988, 0.12, 0.26, 0.5)];
    case 'gameEnd':
      return [n(523, 0, 0.2, 0.55, 'triangle'), n(659, 0.22, 0.2, 0.55, 'triangle'), n(784, 0.44, 0.2, 0.55, 'triangle'), n(1047, 0.66, 0.45, 0.45)];
    case 'pause':
      return [n(523, 0, 0.16, 0.5), n(392, 0.17, 0.25, 0.45)];
    case 'resume':
      return [n(392, 0, 0.14, 0.5), n(523, 0.15, 0.2, 0.45)];
  }
}

/** Gesamtdauer eines Effekts in s */
export function soundDuration(notes: readonly Note[]): number {
  return notes.reduce((m, x) => Math.max(m, x.t + x.d), 0);
}
