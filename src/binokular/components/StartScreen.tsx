import type { AudioPrefs, Volume } from '../audio';
import { GAME_IDS, GAMES, type GameId } from '../games';
import { t } from '../texts';
import { SafetyNotice } from './common';

/** Ton an/aus und Lautstärke (3 Stufen) – für die Person, wird lokal gespeichert */
export function SoundControls({ audio, onAudio }: { audio: AudioPrefs; onAudio: (a: AudioPrefs) => void }) {
  return (
    <fieldset class="bm-choice bm-sound" id="sound-controls">
      <legend>{t.sound}</legend>
      <div class="bm-choice-row">
        <label class={`bm-chip${audio.on ? ' is-on' : ''}`}>
          <input type="checkbox" id="bm-sound-on" checked={audio.on} onChange={(e) => onAudio({ ...audio, on: (e.currentTarget as HTMLInputElement).checked })} />
          {audio.on ? t.soundOn : t.soundOff}
        </label>
        {(['LOW', 'MEDIUM', 'HIGH'] as Volume[]).map((v) => (
          <label key={v} class={`bm-chip${audio.volume === v ? ' is-on' : ''}${audio.on ? '' : ' is-dim'}`}>
            <input type="radio" name="bm-volume" value={v} checked={audio.volume === v} onChange={() => onAudio({ on: true, volume: v })} />
            {t.volumes[v]}
          </label>
        ))}
      </div>
      <p class="bm-muted">{t.soundHint}</p>
    </fieldset>
  );
}

/** Vorschaubild der Spielkarte: neutrale Strichzeichnung (grau) */
function CardIcon({ id }: { id: GameId }) {
  return id === 'nachzeichnen' ? (
    <svg viewBox="0 0 120 64" aria-hidden="true" class="bm-card-icon" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round">
      <path d="M10 44 C 30 4, 50 60, 70 30 S 100 14, 110 20" />
      <circle cx="10" cy="44" r="5" fill="currentColor" />
      <circle cx="110" cy="20" r="8" />
    </svg>
  ) : (
    <svg viewBox="0 0 64 96" aria-hidden="true" class="bm-card-icon bm-card-icon-tall" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round">
      <path d="M16 10 H48" />
      <path d="M16 86 H48" />
      <path d="M6 48 H58" stroke-dasharray="6 6" stroke-width="2" />
      <circle cx="38" cy="36" r="8" fill="currentColor" />
    </svg>
  );
}

export function StartScreen(props: {
  calibratedAt: string | null;
  profileName: string;
  audio: AudioPrefs;
  onAudio: (a: AudioPrefs) => void;
  onPlay: (id: GameId) => void;
  onCalibrate: () => void;
  onHistory: () => void;
  onTherapist: () => void;
}) {
  const cal = props.calibratedAt ? new Date(props.calibratedAt).toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' }) : null;
  return (
    <div class="bm-screen bm-start">
      <header class="bm-hero">
        <svg class="bm-logo" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="22" cy="32" r="16" fill="none" stroke="currentColor" stroke-width="4" />
          <circle cx="42" cy="32" r="16" fill="none" stroke="currentColor" stroke-width="4" />
        </svg>
        <div>
          <h1>{t.appName}</h1>
          <p class="bm-sub">{t.subtitle}</p>
        </div>
      </header>
      <SafetyNotice />
      <h2 class="bm-start-title">{t.startTitle}</h2>
      <div class="bm-games" id="game-cards">
        {GAME_IDS.map((id) => (
          <button key={id} class="bm-gamecard" id={`bm-game-${id}`} data-game={id} onClick={() => props.onPlay(id)} aria-label={t.playGame(GAMES[id].title)}>
            <CardIcon id={id} />
            <span class="bm-gamecard-title">{GAMES[id].title}</span>
            <span class="bm-gamecard-text">{GAMES[id].description}</span>
          </button>
        ))}
      </div>
      <div class="bm-actions">
        <button class="bm-btn" id="bm-calibrate" onClick={props.onCalibrate}>
          {t.calibrate}
        </button>
        <button class="bm-btn" id="bm-history" onClick={props.onHistory}>
          {t.history}
        </button>
        <button class="bm-btn" id="bm-therapist" onClick={props.onTherapist}>
          {t.therapist}
        </button>
      </div>
      <p class="bm-muted" id="start-calibration">
        {cal ? t.lastCalibration(cal) : t.notCalibrated} · <span id="start-profile">{t.activeProfile(props.profileName)}</span>
      </p>
      <SoundControls audio={props.audio} onAudio={props.onAudio} />
      <section class="bm-card">
        <h2>{t.howTitle}</h2>
        <ul>
          {t.how.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <p class="bm-muted">{t.glassesHint}</p>
      </section>
    </div>
  );
}
