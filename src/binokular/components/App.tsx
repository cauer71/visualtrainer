/**
 * Bildschirmfolge: Start → Kalibrierung → Augen/Farben → Levelauswahl → Spiel → Session-Ende → Verlauf;
 * Therapeutenbereich. Der Ton (Audio-Modul) wird bei der ersten Nutzergeste freigeschaltet.
 */
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import { SoundPlayer, type AudioPrefs } from '../audio';
import { isComplete } from '../calibration/calibration';
import { chooseLevel } from '../data/progress';
import type { Settings } from '../data/settings';
import { audioPrefsOf, loadStore, saveStore, type Store } from '../data/storage';
import { LEVELS } from '../levels';
import type { SessionRecord } from '../therapy/session';
import { t } from '../texts';
import { CalibrationScreen } from './CalibrationScreen';
import { EndScreen } from './EndScreen';
import { GameScreen } from './GameScreen';
import { HistoryScreen } from './HistoryScreen';
import { LevelSelectScreen } from './LevelSelect';
import { SetupScreen } from './SetupScreen';
import { StartScreen } from './StartScreen';
import { TherapistScreen } from './TherapistScreen';

type ScreenName = 'start' | 'calibration' | 'setup' | 'levels' | 'game' | 'end' | 'history' | 'therapist';

export interface AppParams {
  autoplay: boolean;
  debug: boolean;
  firstCheckS: number | null;
  /** ?level=N: direkt mit Level N beginnen (Tests/Vorführung) */
  level: number | null;
  /** ?sound=1: Ton auch in der Automatik */
  sound: boolean;
}

export function App({ params }: { params: AppParams }) {
  const [store, setStore] = useState<Store>(() => loadStore());
  const [screen, setScreen] = useState<ScreenName>('start');
  const [back, setBack] = useState<ScreenName>('start');
  const [last, setLast] = useState<SessionRecord | null>(null);
  const [gameKey, setGameKey] = useState(0);
  const [gameLevel, setGameLevel] = useState<number>(() => params.level ?? store.progress.level);

  const sound = useMemo(() => new SoundPlayer(), []);
  sound.setPrefs(audioPrefsOf(store));
  // Automatik (Tests, Vorführung) läuft stumm, außer mit ?sound=1
  sound.muted = params.autoplay && !params.sound;

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
  const setAudio = (a: AudioPrefs) => update((s) => ({ ...s, audio: a }));
  const onEnd = useCallback((rec: SessionRecord) => {
    setLast(rec);
    setScreen('end');
  }, []);

  const open = (s: ScreenName, from: ScreenName = 'start') => {
    setBack(from);
    setScreen(s);
    window.scrollTo(0, 0);
  };
  /** Spiel mit Level n starten. `forced` (nur ?level=N): auch gesperrte Level, ohne die Freischaltung zu ändern */
  const play = (n: number, forced = false) => {
    setGameLevel(n);
    if (!forced) update((s) => ({ ...s, progress: chooseLevel(s.progress, n, LEVELS.length) }));
    setGameKey((k) => k + 1);
    open('game');
  };

  return (
    <>
      <div class="bm-rotate" role="alert">
        <p>{t.rotate}</p>
      </div>
      <main class="bm-app">
        {screen === 'start' && (
          <StartScreen
            calibratedAt={store.calibration.completedAt}
            audio={audioPrefsOf(store)}
            onAudio={(a) => {
              setAudio(a);
              sound.setPrefs(a);
              sound.unlock();
              sound.play('select');
            }}
            onStart={() => (isComplete(store.calibration.results) && store.calibration.completedAt ? open('setup') : open('calibration'))}
            onCalibrate={() => open('calibration')}
            onHistory={() => open('history')}
            onTherapist={() => open('therapist')}
          />
        )}
        {screen === 'calibration' && (
          <CalibrationScreen
            settings={store.settings}
            calibration={store.calibration}
            onSettings={setSettings}
            onCalibration={(c) => update((s) => ({ ...s, calibration: c }))}
            onDone={() => open('setup', 'calibration')}
            onBack={() => open('start')}
          />
        )}
        {screen === 'setup' && (
          <SetupScreen
            settings={store.settings}
            onSettings={setSettings}
            onBack={() => open('start')}
            onPlay={() => (params.level ? play(params.level, true) : open('levels', 'setup'))}
          />
        )}
        {screen === 'levels' && <LevelSelectScreen progress={store.progress} onBack={() => open('setup')} onPlay={(n) => play(n)} />}
        {screen === 'game' && (
          <GameScreen
            key={gameKey}
            store={store}
            update={update}
            startLevel={gameLevel}
            sound={sound}
            onAudio={setAudio}
            autoplay={params.autoplay}
            forceDebug={params.debug}
            firstCheckS={params.firstCheckS}
            onEnd={onEnd}
          />
        )}
        {screen === 'end' && last && <EndScreen session={last} onHistory={() => open('history', 'end')} onStart={() => open('start')} />}
        {screen === 'history' && <HistoryScreen sessions={store.sessions} onBack={() => open(back === 'therapist' ? 'therapist' : 'start')} />}
        {screen === 'therapist' && <TherapistScreen store={store} update={update} onBack={() => open('start')} onHistory={() => open('history', 'therapist')} />}
      </main>
    </>
  );
}
