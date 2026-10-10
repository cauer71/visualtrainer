/**
 * Gemeinsame Hülle für alle Spiele: Leiste (Zeit, Live-Anzeige, Spielknöpfe, Ton, Vollbild, Pause, Beschwerden),
 * Canvas-Bühne, Pause-Überlagerung („Weiter“ / „Beenden“), Wake Lock, Automatik-Pause bei Wechsel des Fensters,
 * Session-Protokoll und Debug-Ansichten. Das Spiel selbst kommt als Modul (`games/<id>`).
 * Farben und Brillentyp kommen aus dem aktiven Farbprofil; Texte und Symbole im Spiel sind grau (für beide Augen).
 */
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { AudioPrefs, SoundPlayer, SoundEvent, Volume } from '../audio';
import { visionOf } from '../data/settings';
import { activeProfile, audioPrefsOf, type Store } from '../data/storage';
import type { FinishReason, GameInstance, GameModule, GameSnapshot, GameSummary } from '../games/types';
import { SessionRecorder, type SessionRecord } from '../therapy/session';
import { t } from '../texts';
import { rgbCss } from '../vision/color';
import { DEBUG_KEYS, type DebugView } from '../vision/renderer';
import { clock, SpeakerIcon } from './common';

export interface ShellParams {
  debug: boolean;
  /** `?seed=N`: fester Zufall (Tests) */
  seed: number | null;
}

type Phase = 'playing' | 'paused';

type Props = {
  module: GameModule<any>;
  store: Store;
  sound: SoundPlayer;
  onAudio: (a: AudioPrefs) => void;
  params: ShellParams;
  onEnd: (rec: SessionRecord, sum: GameSummary) => void;
};

/** nächste Stufe des Ton-Knopfs: aus → leise → mittel → laut → aus */
function nextAudio(a: AudioPrefs): AudioPrefs {
  if (!a.on) return { on: true, volume: 'LOW' };
  const order: Volume[] = ['LOW', 'MEDIUM', 'HIGH'];
  const i = order.indexOf(a.volume);
  return i >= order.length - 1 ? { on: false, volume: a.volume } : { on: true, volume: order[i + 1] };
}

interface WakeLockLike {
  release(): Promise<void>;
  addEventListener(type: 'release', cb: () => void): void;
}

export function GameShell({ module: mod, store, sound, onAudio, params, onEnd }: Props) {
  const profile = useMemo(() => activeProfile(store), []);
  const vision = useMemo(() => visionOf(store.settings, profile), []);
  const settings = useMemo(() => mod.normalize((store.games as unknown as Record<string, unknown>)[mod.id]), []);
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instRef = useRef<GameInstance | null>(null);
  const doneRef = useRef(false);
  const [phase, setPhase] = useState<Phase>('playing');
  const phaseRef = useRef<Phase>('playing');
  const [autoPaused, setAutoPaused] = useState(false);
  const [view, setView] = useState<DebugView>('BINOCULAR');
  const viewRef = useRef<DebugView>('BINOCULAR');
  viewRef.current = view;
  const [snap, setSnap] = useState<GameSnapshot>({ hud: [], message: '' });
  const [activeMs, setActiveMs] = useState(0);
  const [fs, setFs] = useState(false);
  const [portrait, setPortrait] = useState(false);
  const audio = audioPrefsOf(store);
  const debug = params.debug || store.settings.debugMode;
  const soundRef = useRef(sound);
  soundRef.current = sound;
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  const rec = useMemo(
    () =>
      new SessionRecorder({
        gameId: mod.id,
        patientId: store.settings.patientId,
        amblyopicContrast: store.settings.amblyopicContrast,
        fellowEyeContrast: store.settings.fellowEyeContrast,
        amblyopicEye: store.settings.amblyopicEye,
        glasses: profile.mode,
        leftLens: store.settings.leftLens,
      }),
    [],
  );

  const finish = (reason: FinishReason) => {
    if (doneRef.current) return;
    doneRef.current = true;
    const inst = instRef.current;
    const sum = inst ? inst.summary() : { points: 0, errors: 0, colorChanges: 0, details: {}, completed: false };
    inst?.pause();
    const record = rec.finish(reason, sum);
    soundRef.current.play('gameEnd');
    onEndRef.current(record, sum);
  };
  const finishRef = useRef(finish);
  finishRef.current = finish;

  const pause = (auto = false) => {
    if (phaseRef.current !== 'playing' || doneRef.current) return;
    phaseRef.current = 'paused';
    setPhase('paused');
    setAutoPaused(auto);
    instRef.current?.pause();
    rec.pauseBegin();
    if (!auto) soundRef.current.play('pause');
  };
  const resume = () => {
    if (phaseRef.current !== 'paused' || doneRef.current) return;
    phaseRef.current = 'playing';
    setPhase('playing');
    setAutoPaused(false);
    rec.pauseEnd();
    instRef.current?.resume();
    soundRef.current.play('resume');
  };
  const pauseRef = useRef(pause);
  pauseRef.current = pause;
  const resumeRef = useRef(resume);
  resumeRef.current = resume;

  // Spiel anlegen
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const inst = mod.create(
      cv,
      {
        vision,
        play: (ev: SoundEvent) => soundRef.current.play(ev),
        vibrate: (ms) => {
          try {
            navigator.vibrate?.(ms);
          } catch {
            // nicht überall verfügbar
          }
        },
        view: () => viewRef.current,
        seed: params.seed,
        finish: (reason) => finishRef.current(reason),
        debug,
      },
      settings,
    );
    instRef.current = inst;
    inst.start();
    setSnap(inst.snapshot());
    if (params.debug) {
      (window as unknown as { __binokular?: unknown }).__binokular = {
        game: mod.id,
        state: () => ({ ...inst.debugState(), phase_shell: phaseRef.current }),
        toClient: (x: number, y: number) => inst.toClient(x, y),
        set: (p: Record<string, unknown>) => inst.debugSet?.(p),
        shellPhase: () => phaseRef.current,
      };
    }
    const poll = window.setInterval(() => {
      setSnap(inst.snapshot());
      setActiveMs(rec.activeMs());
    }, 200);
    return () => {
      window.clearInterval(poll);
      inst.destroy();
      instRef.current = null;
      if (params.debug) delete (window as unknown as { __binokular?: unknown }).__binokular;
    };
  }, []);

  // Wake Lock, Automatik-Pause, Esc, Debug-Tasten
  useEffect(() => {
    let lock: WakeLockLike | null = null;
    let dead = false;
    const acquire = async () => {
      try {
        const nav = navigator as unknown as { wakeLock?: { request(type: 'screen'): Promise<WakeLockLike> } };
        if (!nav.wakeLock || lock || document.visibilityState === 'hidden') return;
        const l = await nav.wakeLock.request('screen');
        if (dead) {
          void l.release().catch(() => undefined);
          return;
        }
        lock = l;
        l.addEventListener('release', () => {
          lock = null;
        });
      } catch {
        // Wake Lock ist ein Zusatz (nicht überall erlaubt)
      }
    };
    void acquire();
    const onVis = () => {
      if (document.hidden) pauseRef.current(true);
      else void acquire();
    };
    const onBlur = () => pauseRef.current(true);
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        if (phaseRef.current === 'playing') pauseRef.current(false);
        else resumeRef.current();
        return;
      }
      if (debug) {
        const v = DEBUG_KEYS[ev.key];
        if (v) setView(v);
      }
    };
    const onFs = () => setFs(!!document.fullscreenElement);
    const onSize = () => setPortrait(window.innerHeight > window.innerWidth);
    onSize();
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('blur', onBlur);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onSize);
    document.addEventListener('fullscreenchange', onFs);
    return () => {
      dead = true;
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onSize);
      document.removeEventListener('fullscreenchange', onFs);
      void lock?.release().catch(() => undefined);
      try {
        if (document.fullscreenElement) void document.exitFullscreen().catch(() => undefined);
      } catch {
        // egal
      }
    };
  }, []);

  const toggleFullscreen = () => {
    try {
      if (document.fullscreenElement) void document.exitFullscreen().catch(() => undefined);
      else void rootRef.current?.requestFullscreen?.().catch(() => undefined);
    } catch {
      // Vollbild nicht verfügbar (z. B. iPhone) – das Spiel läuft auch so
    }
  };

  const landscapeGame = mod.design.w > mod.design.h;
  const orientHint = Math.min(window.innerWidth, window.innerHeight) < 700 && landscapeGame === portrait;

  return (
    <div ref={rootRef} class="bm-game" data-phase={phase} data-game={mod.id} data-profile={profile.id} style={{ background: rgbCss(profile.background) }}>
      <header class="bm-hud" role="toolbar">
        <span class="bm-hud-item bm-hud-session" id="hud-time">
          {t.time} {clock(activeMs)}
        </span>
        {snap.hud.map((h) => (
          <span class="bm-hud-item" key={h.id} id={`hud-${h.id}`}>
            {h.label} <strong>{h.value}</strong>
          </span>
        ))}
        <span class="bm-hud-spacer" />
        {instRef.current?.actions.map((a) => (
          <button key={a.id} class="bm-btn bm-btn-small" data-action={a.id} disabled={phase !== 'playing'} onClick={() => instRef.current?.runAction(a.id)}>
            {a.label}
          </button>
        ))}
        <button
          class="bm-btn bm-btn-small bm-btn-icon"
          id="bm-sound"
          aria-label={t.soundHud(audio.on, t.volumes[audio.volume])}
          title={t.soundHud(audio.on, t.volumes[audio.volume])}
          onClick={() => {
            const next = nextAudio(audio);
            onAudio(next);
            sound.setPrefs(next);
            sound.unlock();
            sound.play('select');
          }}
        >
          <SpeakerIcon level={!audio.on ? 0 : audio.volume === 'LOW' ? 1 : audio.volume === 'MEDIUM' ? 2 : 3} />
        </button>
        <button class="bm-btn bm-btn-small" id="bm-fullscreen" onClick={toggleFullscreen}>
          {fs ? t.fullscreenExit : t.fullscreen}
        </button>
        <button class="bm-btn bm-btn-small" id="bm-pause" disabled={phase !== 'playing'} onClick={() => pause(false)}>
          {t.pause}
        </button>
        <button class="bm-btn bm-btn-small bm-btn-stop" id="bm-complaints" onClick={() => finish('complaints')}>
          {t.complaints}
        </button>
      </header>
      {debug && (
        <div class="bm-debugbar" role="group" aria-label={t.debugTitle}>
          <strong>{t.debugTitle}</strong>
          {(Object.keys(t.debugViews) as DebugView[]).map((v) => (
            <button key={v} class={`bm-btn bm-btn-small${view === v ? ' is-on' : ''}`} data-view={v} onClick={() => setView(v)}>
              {t.debugViews[v]}
            </button>
          ))}
        </div>
      )}
      <div class="bm-stage">
        <canvas ref={canvasRef} class="bm-canvas" id="bm-canvas" />
        {orientHint && (
          <p class="bm-msg bm-orient" role="status" id="bm-orient">
            {landscapeGame ? t.orientLandscape : t.orientPortrait}
          </p>
        )}
        {snap.message && (
          <p class="bm-msg" role="status" aria-live="polite" id="bm-msg">
            {snap.message}
          </p>
        )}
        {phase === 'paused' && (
          <div class="bm-modal" role="dialog" aria-labelledby="pause-title" id="pause-overlay">
            <div class="bm-modal-card">
              <h2 id="pause-title">{t.pausedTitle}</h2>
              <p>{autoPaused ? t.autoPaused : t.pausedText}</p>
              <div class="bm-actions">
                <button class="bm-btn bm-btn-primary" id="bm-resume" onClick={resume}>
                  {t.resume}
                </button>
                <button class="bm-btn" id="bm-end" onClick={() => finish('user')}>
                  {t.endGame}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
