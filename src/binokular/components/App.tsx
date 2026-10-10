/**
 * Bildschirmfolge: Start (die drei Spielkarten) → Spiel (GameShell) → Zusammenfassung → Verlauf. Ein Tipp auf die
 * Karte startet das Spiel sofort mit dem aktiven Farbprofil (ohne Kalibrierung – die gibt es nur über ihren Knopf);
 * Profil, Auge und Zuordnung stehen im Therapeutenbereich und in der Kalibrierung. Der Ton (Audio-Modul) wird bei der ersten Nutzergeste freigeschaltet.
 */
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import { SoundPlayer, type AudioPrefs } from '../audio';
import type { Settings } from '../data/settings';
import { activeProfile, audioPrefsOf, loadStore, MAX_SESSIONS, saveStore, type Store } from '../data/storage';
import { GAMES, type GameId } from '../games';
import type { GameSummary } from '../games/types';
import type { SessionRecord } from '../therapy/session';
import { CalibrationScreen } from './CalibrationScreen';
import { EndScreen } from './EndScreen';
import { GameShell } from './GameShell';
import { HistoryScreen } from './HistoryScreen';
import { StartScreen } from './StartScreen';
import { TherapistScreen } from './TherapistScreen';

type ScreenName = 'start' | 'calibration' | 'game' | 'end' | 'history' | 'therapist';

export interface AppParams {
  debug: boolean;
  /** ?seed=N: fester Zufall (Tests) */
  seed: number | null;
  /** ?game=<id>: direkt in dieses Spiel (Tests/Vorführung), ohne Kalibrierung und Augenwahl */
  game: GameId | null;
}

export function App({ params }: { params: AppParams }) {
  const [store, setStore] = useState<Store>(() => loadStore());
  const [screen, setScreen] = useState<ScreenName>(params.game ? 'game' : 'start');
  const [back, setBack] = useState<ScreenName>('start');
  const [gameId, setGameId] = useState<GameId>(params.game ?? 'nachzeichnen');
  const [last, setLast] = useState<{ rec: SessionRecord; sum: GameSummary } | null>(null);
  const [gameKey, setGameKey] = useState(0);

  const sound = useMemo(() => new SoundPlayer(), []);
  sound.setPrefs(audioPrefsOf(store));

  // AudioContext erst nach der ersten Nutzergeste (iOS/Safari, Chrome)
  useEffect(() => {
    const unlock = () => sound.unlock();
    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('keydown', unlock);
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, [sound]);

  /** Zustand ändern und sofort lokal speichern */
  const update = useCallback((fn: (s: Store) => Store) => {
    setStore((prev) => {
      const next = fn(prev);
      saveStore(next);
      return next;
    });
  }, []);
  const setSettings = (patch: Partial<Settings>) => update((s) => ({ ...s, settings: { ...s.settings, ...patch } }));
  const setProfiles = (profiles: Store['profiles'], activeProfileId: string) => update((s) => ({ ...s, profiles, activeProfileId }));
  const setAudio = (a: AudioPrefs) => update((s) => ({ ...s, audio: a }));
  const onEnd = useCallback(
    (rec: SessionRecord, sum: GameSummary) => {
      update((s) => ({
        ...s,
        sessions: [...s.sessions, rec].slice(-MAX_SESSIONS),
        nachMaxLevel: rec.gameId === 'nachzeichnen' ? Math.max(s.nachMaxLevel, Math.min(12, Math.round(rec.details.maxLevel ?? 1))) : s.nachMaxLevel,
      }));
      setLast({ rec, sum });
      setScreen('end');
    },
    [update],
  );

  const open = (s: ScreenName, from: ScreenName = 'start') => {
    setBack(from);
    setScreen(s);
    window.scrollTo(0, 0);
  };
  const play = () => {
    setGameKey((k) => k + 1);
    open('game');
  };
  /** Spielkarte gewählt: sofort spielen (nie automatisch Kalibrierung) */
  const choose = (id: GameId) => {
    setGameId(id);
    play();
  };

  return (
    <main class="bm-app">
      {screen === 'start' && (
        <StartScreen
          profileName={activeProfile(store).name}
          audio={audioPrefsOf(store)}
          onAudio={(a) => {
            setAudio(a);
            sound.setPrefs(a);
            sound.unlock();
            sound.play('select');
          }}
          onPlay={choose}
          onCalibrate={() => open('calibration')}
          onHistory={() => open('history')}
          onTherapist={() => open('therapist')}
        />
      )}
      {screen === 'calibration' && (
        <CalibrationScreen
          settings={store.settings}
          calibration={store.calibration}
          profiles={store.profiles}
          activeProfileId={store.activeProfileId}
          onSettings={setSettings}
          onProfiles={setProfiles}
          onCalibration={(c) => update((s) => ({ ...s, calibration: c }))}
          onDone={() => open('start')}
          onBack={() => open('start')}
        />
      )}
      {screen === 'game' && <GameShell key={gameKey} module={GAMES[gameId]} store={store} sound={sound} onAudio={setAudio} params={{ debug: params.debug, seed: params.seed }} onEnd={onEnd} />}
      {screen === 'end' && last && (
        <EndScreen session={last.rec} summary={last.sum} onAgain={play} onHistory={() => open('history', 'end')} onStart={() => open('start')} />
      )}
      {screen === 'history' && <HistoryScreen sessions={store.sessions} onBack={() => open(back === 'therapist' ? 'therapist' : 'start')} />}
      {screen === 'therapist' && <TherapistScreen store={store} update={update} onBack={() => open('start')} onHistory={() => open('history', 'therapist')} />}
    </main>
  );
}
