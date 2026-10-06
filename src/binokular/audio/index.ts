/**
 * Audio-Effekte von „Binocular Mine“ – eigenständiges Modul ohne Abhängigkeit zur Haupt-App.
 * Die Spiellogik meldet Ereignisse, dieses Modul macht daraus kurze, weiche Töne (Web Audio API).
 */
import type { GameEvent } from '../game/types';
import { SoundPlayer } from './player';
import { GAME_SOUND, type SoundEvent } from './sounds';

export { DEFAULT_AUDIO, MAX_GAIN, SoundPlayer, VOLUME_GAIN, type AudioPrefs, type Volume } from './player';
export { GAME_SOUND, SOUND_EVENTS, soundDuration, soundNotes, type Note, type SoundEvent } from './sounds';

/**
 * Ereignisse der Spiellogik vertonen. Mehrere Ereignisse auf einmal (z. B. „Kristall abgeliefert“ und „gewonnen“):
 * jeder Effekt höchstens einmal; „gewonnen“ übernimmt die Oberfläche (Melodie mit Sternen am Levelende).
 */
export function playGameEvents(player: SoundPlayer, events: readonly GameEvent[]): SoundEvent[] {
  const done = new Set<SoundEvent>();
  for (const e of events) {
    if (e.msg === 'won') continue;
    const s = GAME_SOUND[e.msg];
    if (done.has(s)) continue;
    done.add(s);
    player.play(s);
  }
  return [...done];
}
