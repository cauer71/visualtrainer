/**
 * Audio-Effekte von „Binokular – Sehspiele“ – eigenständiges Modul ohne Abhängigkeit zur Haupt-App.
 * Die Spiele melden Ereignisse, dieses Modul macht daraus kurze, weiche Töne (Web Audio API).
 */
export { DEFAULT_AUDIO, MAX_GAIN, SoundPlayer, VOLUME_GAIN, type AudioPrefs, type Volume } from './player';
export { SOUND_EVENTS, soundDuration, soundNotes, type Note, type SoundEvent } from './sounds';
