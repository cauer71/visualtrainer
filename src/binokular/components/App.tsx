/** Bildschirmfolge: Start → Kalibrierung → Augen/Farben → Spiel → Session-Ende → Verlauf; Therapeutenbereich */
import { useCallback, useState } from 'preact/hooks';
import { isComplete } from '../calibration/calibration';
import type { Settings } from '../data/settings';
import { loadStore, saveStore, type Store } from '../data/storage';
import type { SessionRecord } from '../therapy/session';
import { t } from '../texts';
import { CalibrationScreen } from './CalibrationScreen';
import { EndScreen } from './EndScreen';
import { GameScreen } from './GameScreen';
import { HistoryScreen } from './HistoryScreen';
import { SetupScreen } from './SetupScreen';
import { StartScreen } from './StartScreen';
import { TherapistScreen } from './TherapistScreen';

type ScreenName = 'start' | 'calibration' | 'setup' | 'game' | 'end' | 'history' | 'therapist';

export interface AppParams {
  autoplay: boolean;
  debug: boolean;
  firstCheckS: number | null;
}

export function App({ params }: { params: AppParams }) {
  const [store, setStore] = useState<Store>(() => loadStore());
  const [screen, setScreen] = useState<ScreenName>('start');
  const [back, setBack] = useState<ScreenName>('start');
  const [last, setLast] = useState<SessionRecord | null>(null);
  const [gameKey, setGameKey] = useState(0);

  /** Zustand ändern und sofort lokal speichern */
  const update = useCallback((fn: (s: Store) => Store) => {
    setStore((prev) => {
      const next = fn(prev);
      saveStore(next);
      return next;
    });
  }, []);
  const setSettings = (patch: Partial<Settings>) => update((s) => ({ ...s, settings: { ...s.settings, ...patch } }));
  const onEnd = useCallback((rec: SessionRecord) => {
    setLast(rec);
    setScreen('end');
  }, []);

  const open = (s: ScreenName, from: ScreenName = 'start') => {
    setBack(from);
    setScreen(s);
    window.scrollTo(0, 0);
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
            onPlay={() => {
              setGameKey((k) => k + 1);
              open('game');
            }}
          />
        )}
        {screen === 'game' && <GameScreen key={gameKey} store={store} update={update} autoplay={params.autoplay} forceDebug={params.debug} firstCheckS={params.firstCheckS} onEnd={onEnd} />}
        {screen === 'end' && last && <EndScreen session={last} onHistory={() => open('history', 'end')} onStart={() => open('start')} />}
        {screen === 'history' && <HistoryScreen sessions={store.sessions} onBack={() => open(back === 'therapist' ? 'therapist' : 'start')} />}
        {screen === 'therapist' && <TherapistScreen store={store} update={update} onBack={() => open('start')} onHistory={() => open('history', 'therapist')} />}
      </main>
    </>
  );
}
