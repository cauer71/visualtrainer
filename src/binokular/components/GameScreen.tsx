/**
 * Spielbildschirm: verbindet Spiellogik (Engine), Darstellung (vision/renderer), Ton (audio/), Session-Protokoll,
 * adaptive Kontraststeuerung, Suppressions-Kontrollen, Pausen, Levelwechsel und Debug-Ansichten.
 * Farben und Brillentyp kommen aus dem aktiven Farbprofil; Texte und Symbole im Spiel sind grau (für beide Augen).
 * Die Session läuft über Levelwechsel weiter; jedes Level wird einzeln protokolliert (Level, Sterne, Fehler, Zeit).
 */
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { playGameEvents, type AudioPrefs, type SoundPlayer, type Volume } from '../audio';
import { afterLevel } from '../data/progress';
import { DIFFICULTY_EFFECT, visionOf } from '../data/settings';
import { activeProfile, audioPrefsOf, MAX_SESSIONS, type Store } from '../data/storage';
import { Engine, type EngineOptions } from '../game/engine';
import { applyCommand, BOTH_EYES, commandReady, solveLevel, type SolverCommand } from '../game/solver';
import { calcStars, parTimeS } from '../game/stars';
import type { GameEvent, GameObject } from '../game/types';
import { LEVELS, levelByNumber } from '../levels';
import { adaptContrast, decreaseContrast, outcomeOf } from '../therapy/contrast';
import { SessionRecorder, type AttemptResult, type EndReason, type SessionRecord } from '../therapy/session';
import {
  CHECK_ANSWER_MS,
  checkAlpha,
  makeRecord,
  nextCheckDelayMs,
  randomShape,
  SHAPES,
  shouldStartCheck,
  summarizeSuppression,
  type Shape,
} from '../therapy/suppression';
import { t } from '../texts';
import { filterOf, rgbCss } from '../vision/color';
import { cellAt, DEBUG_KEYS, fitLayout, renderAnaglyphSim, renderScene, visibleCells, type DebugView, type Layout } from '../vision/renderer';
import { clock, de, ShapeIcon, SpeakerIcon } from './common';
import { LevelGrid } from './LevelSelect';

type Phase = 'playing' | 'check' | 'pauseOffer' | 'paused' | 'levelEnd' | 'chooseLevel' | 'ended';

interface LevelResult {
  number: number;
  completed: boolean;
  stars: number;
  activeMs: number;
  failures: number;
  before: number;
  after: number;
}

interface Hud {
  sessionMs: number;
  level: number;
  levelName: string;
  delivered: number;
  required: number;
  failures: number;
  levelMs: number;
  carrying: boolean;
  fellow: number;
}

type Props = {
  store: Store;
  update: (fn: (s: Store) => Store) => void;
  /** Level, mit dem das Spiel beginnt */
  startLevel: number;
  sound: SoundPlayer;
  onAudio: (a: AudioPrefs) => void;
  autoplay: boolean;
  forceDebug: boolean;
  /** nur für Tests: erste Kontrollaufgabe nach n Sekunden */
  firstCheckS: number | null;
  onEnd: (rec: SessionRecord) => void;
};

/** Automatik: so viel schneller laufen die Roboter (die wandernde Gefahr behält ihr Tempo) */
const AUTOPLAY_SPEED = 4;
const AUTOPLAY_GAP_MS = 180;
/** Ziehen ab dieser Strecke (px) verschiebt den Ausschnitt statt zu tippen */
const DRAG_PX = 10;
/** Kamera hält den Roboter so viele Felder vom Rand entfernt */
const CAMERA_MARGIN = 1.5;

/** nächste Stufe des Ton-Knopfs: aus → leise → mittel → laut → aus */
function nextAudio(a: AudioPrefs): AudioPrefs {
  if (!a.on) return { on: true, volume: 'LOW' };
  const order: Volume[] = ['LOW', 'MEDIUM', 'HIGH'];
  const i = order.indexOf(a.volume);
  return i >= order.length - 1 ? { on: false, volume: a.volume } : { on: true, volume: order[i + 1] };
}

export function GameScreen({ store, update, startLevel: initialLevel, sound, onAudio, autoplay, forceDebug, firstCheckS, onEnd }: Props) {
  const settingsRef = useRef(store.settings);
  settingsRef.current = store.settings;
  // Farben nur aus dem aktiven Profil (nie fest codiert); während der Session unverändert
  const profile = useMemo(() => activeProfile(store), []);
  const progressRef = useRef(store.progress);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const offRef = useRef<HTMLCanvasElement | null>(null);
  const layoutRef = useRef<Layout | null>(null);
  const camRef = useRef<{ x: number; y: number } | null>(null);
  const followRef = useRef(true);
  const dragRef = useRef<{ id: number; x: number; y: number; cam: { x: number; y: number }; moved: boolean } | null>(null);

  const [phase, setPhase] = useState<Phase>('playing');
  const phaseRef = useRef<Phase>('playing');
  const go = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };
  const firstLevel = levelByNumber(initialLevel);
  const [message, setMessage] = useState<string>(t.levelIntro[firstLevel.id] ?? t.messages.selectRobot);
  const [result, setResult] = useState<LevelResult | null>(null);
  const [view, setView] = useState<DebugView>('BINOCULAR');
  const viewRef = useRef<DebugView>('BINOCULAR');
  viewRef.current = view;
  const [cellPx, setCellPx] = useState(0);
  const cellPxRef = useRef(0);
  const debug = forceDebug || store.settings.debugMode;
  const audio = audioPrefsOf(store);

  const rec = useMemo(
    () =>
      new SessionRecorder({
        patientId: store.settings.patientId,
        amblyopicContrast: store.settings.amblyopicContrast,
        fellowEyeContrast: store.settings.fellowEyeContrast,
        amblyopicEye: store.settings.amblyopicEye,
        glasses: profile.mode,
        leftLens: store.settings.leftLens,
        plannedMinutes: store.settings.sessionMinutes,
      }),
    [],
  );

  const engineOpts = (n: number): EngineOptions => {
    const lvl = levelByNumber(n);
    const s = settingsRef.current;
    const eff = DIFFICULTY_EFFECT[s.difficulty];
    return {
      objectSize: lvl.difficulty.objectSize * (s.objectSizePercent / 100) * eff.sizeFactor,
      distraction: Math.min(1, lvl.difficulty.distraction + eff.extraDistraction),
      moveSpeed: lvl.difficulty.moveSpeed * eff.speedFactor * (autoplay ? AUTOPLAY_SPEED : 1),
      hazardSpeed: lvl.difficulty.hazardSpeed * eff.speedFactor,
    };
  };

  const engineRef = useRef<Engine>(null as unknown as Engine);
  if (!engineRef.current) engineRef.current = new Engine(firstLevel, engineOpts(firstLevel.number));
  const autoRef = useRef<{ cmds: SolverCommand[]; i: number; nextAt: number } | null>(null);
  const timers = useRef({
    sessionMs: 0,
    sinceCheck: 0,
    checkDelay: firstCheckS !== null ? firstCheckS * 1000 : nextCheckDelayMs(Math.random),
    sincePauseOffer: 0,
    levelStartAt: 0,
    lastHud: 0,
  });
  const levelOpen = useRef(true);
  const checkRef = useRef<{ shape: Shape; t: number } | null>(null);
  const lastShape = useRef<Shape | undefined>(undefined);
  const endedRef = useRef(false);
  const [hud, setHud] = useState<Hud>(() => hudOf());

  function hudOf(): Hud {
    const e = engineRef.current;
    const snap = e.snapshot();
    return {
      sessionMs: timers.current.sessionMs,
      level: e.level.number,
      levelName: t.levelNames[e.level.nameKey] ?? '',
      delivered: snap.delivered,
      required: snap.required,
      failures: snap.failures,
      levelMs: snap.elapsedMs,
      carrying: snap.carrying !== null && !snap.moving,
      fellow: settingsRef.current.fellowEyeContrast,
    };
  }

  /** Ereignisse der Spiellogik: Text (letztes Ereignis mit Text) und Töne */
  function handleEvents(evs: GameEvent[]) {
    if (!evs.length) return;
    for (let i = evs.length - 1; i >= 0; i--) {
      const txt = t.messages[evs[i].msg];
      if (txt) {
        setMessage(txt);
        break;
      }
    }
    playGameEvents(sound, evs);
  }

  function prepareAutoplay(n: number) {
    if (!autoplay) return;
    const r = solveLevel(levelByNumber(n), BOTH_EYES, engineOpts(n));
    autoRef.current = { cmds: r.commands, i: 0, nextAt: performance.now() + 600 };
  }

  function startLevel(n: number) {
    const lvl = levelByNumber(n);
    engineRef.current = new Engine(lvl, engineOpts(lvl.number));
    camRef.current = null;
    followRef.current = true;
    timers.current.levelStartAt = rec.elapsed();
    levelOpen.current = true;
    setMessage(t.levelIntro[lvl.id] ?? t.messages.selectRobot);
    setResult(null);
    prepareAutoplay(lvl.number);
    go('playing');
    setHud(hudOf());
  }

  function saveProgress(fn: (s: Store) => Store) {
    update((st) => {
      const next = fn(st);
      progressRef.current = next.progress;
      return next;
    });
  }

  function setFellow(v: number) {
    settingsRef.current = { ...settingsRef.current, fellowEyeContrast: v };
  }

  function finishLevel(res: AttemptResult) {
    const e = engineRef.current;
    const lvl = e.level;
    const s = settingsRef.current;
    const eff = DIFFICULTY_EFFECT[s.difficulty];
    const completed = res === 'completed';
    const stars = calcStars({ completed, activeMs: e.elapsedMs, failures: e.failures }, { parTimeS: parTimeS(lvl.difficulty.complexity, eff.parFactor), maxFailures: lvl.maxFailuresForStar });
    const before = s.fellowEyeContrast;
    const step = adaptContrast({ fellowEyeContrast: before, consecutiveFailures: progressRef.current.consecutiveFailures }, outcomeOf(completed, stars), {
      enabled: s.adaptiveContrast,
      mode: s.contrastMode,
    });
    levelOpen.current = false;
    rec.addAttempt({
      levelId: lvl.id,
      levelNumber: lvl.number,
      startedAtMs: timers.current.levelStartAt,
      activeMs: e.elapsedMs,
      result: res,
      stars,
      failures: e.failures,
      fellowContrastBefore: before,
      fellowContrastAfter: step.fellowEyeContrast,
    });
    if (step.changed) rec.contrastChange(step.fellowEyeContrast, step.changed === 'up' ? 'success' : 'repeatedFailure');
    setFellow(step.fellowEyeContrast);
    saveProgress((st) => ({
      ...st,
      settings: { ...st.settings, fellowEyeContrast: step.fellowEyeContrast },
      progress: afterLevel(st.progress, { number: lvl.number, id: lvl.id, completed, stars, consecutiveFailures: step.consecutiveFailures }, LEVELS.length),
      activeSession: rec.snapshot(),
    }));
    if (res === 'restarted') {
      startLevel(lvl.number);
      return;
    }
    if (completed) sound.play('levelComplete', { stars });
    else sound.play('levelTimeout');
    setResult({ number: lvl.number, completed, stars, activeMs: e.elapsedMs, failures: e.failures, before, after: step.fellowEyeContrast });
    go('levelEnd');
  }

  function endSession(reason: EndReason) {
    if (endedRef.current) return;
    endedRef.current = true;
    const e = engineRef.current;
    if (levelOpen.current && e.elapsedMs > 0) {
      const f = settingsRef.current.fellowEyeContrast;
      rec.addAttempt({ levelId: e.level.id, levelNumber: e.level.number, startedAtMs: timers.current.levelStartAt, activeMs: e.elapsedMs, result: 'aborted', stars: 0, failures: e.failures, fellowContrastBefore: f, fellowContrastAfter: f });
    }
    const final = rec.finish(reason);
    go('ended');
    sound.play('sessionEnd');
    saveProgress((st) => ({ ...st, sessions: [...st.sessions, final].slice(-MAX_SESSIONS), activeSession: null }));
    onEnd(final);
  }

  function startCheck(now: number) {
    const shape = randomShape(Math.random, lastShape.current);
    lastShape.current = shape;
    checkRef.current = { shape, t: now };
    // Hinweiston: immer derselbe, verrät das Symbol nicht
    sound.play('check');
    go('check');
  }

  function answerCheck(answer: Shape | null, now = performance.now()) {
    const c = checkRef.current;
    if (!c) return;
    checkRef.current = null;
    const s = settingsRef.current;
    const prevFlags = summarizeSuppression(rec.record.suppressionChecks).flagEvents;
    const sum = rec.addSuppression(makeRecord(rec.elapsed(), c.shape, answer, Math.round(now - c.t)));
    if (sum.flagEvents > prevFlags && s.reduceFellowOnSuppression) {
      const v = decreaseContrast(s.fellowEyeContrast, s.contrastMode === 'LINEAR' ? 'LINEAR' : 'PERCENTUAL');
      if (v !== s.fellowEyeContrast) {
        rec.contrastChange(v, 'suppression');
        setFellow(v);
        saveProgress((st) => ({ ...st, settings: { ...st.settings, fellowEyeContrast: v } }));
      }
    }
    timers.current.sinceCheck = 0;
    timers.current.checkDelay = nextCheckDelayMs(Math.random);
    go('playing');
  }

  function pause() {
    rec.pauseBegin();
    sound.play('pause');
    go('paused');
  }

  function resume() {
    rec.pauseEnd();
    sound.play('resume');
    go('playing');
  }

  function runAuto(now: number) {
    const a = autoRef.current;
    const e = engineRef.current;
    if (!a || a.i >= a.cmds.length || !e.isIdle() || now < a.nextAt) return;
    const cmd = a.cmds[a.i];
    // wandernde Gefahr: erst losschicken, wenn der Weg laut Zeitplan frei ist
    if (!commandReady(e, cmd)) return;
    a.i++;
    applyCommand(e, cmd);
    a.nextAt = now + AUTOPLAY_GAP_MS;
  }

  function step(dt: number, now: number) {
    if (endedRef.current) return;
    const ph = phaseRef.current;
    if (ph === 'paused' || ph === 'pauseOffer' || ph === 'ended') return;
    const e = engineRef.current;
    const s = settingsRef.current;
    const tm = timers.current;
    tm.sessionMs += dt;
    if (ph === 'playing') {
      e.tick(dt);
      rec.addActive(dt);
      tm.sinceCheck += dt;
      tm.sincePauseOffer += dt;
      handleEvents(e.drainEvents());
      if (e.status === 'won') finishLevel('completed');
      else if (e.elapsedMs >= s.maxLevelMinutes * 60000) finishLevel('timeout');
      else if (autoplay) runAuto(now);
      else if (s.pauseOffer && tm.sincePauseOffer >= s.pauseIntervalMinutes * 60000 && e.isIdle()) {
        tm.sincePauseOffer = 0;
        go('pauseOffer');
      } else if (shouldStartCheck(tm.sinceCheck, tm.checkDelay, e.isIdle(), s.suppressionChecks)) startCheck(now);
    } else if (ph === 'check') {
      // Spiel steht (Level-Zeit läuft nicht); nur die Antwortzeit wird überwacht
      const c = checkRef.current;
      if (c && now - c.t >= CHECK_ANSWER_MS) answerCheck(null, now);
    }
    if (tm.sessionMs >= s.sessionMinutes * 60000) endSession('time');
  }

  /** Kamera (nur große Level bzw. kleine Bildschirme): hält den ausgewählten Roboter im Bild, weich nachgeführt */
  function layoutFor(cols: number, rows: number, w: number, h: number, dt: number): Layout {
    const e = engineRef.current;
    const focus = e.focusPoint();
    if (!camRef.current) camRef.current = { ...focus };
    let l = fitLayout(cols, rows, w, h, camRef.current);
    if (!l.scrollX && !l.scrollY) return l;
    if (e.snapshot().moving) followRef.current = true;
    if (followRef.current && !dragRef.current?.moved) {
      const v = visibleCells(l);
      const cam = { ...camRef.current };
      const target = { ...cam };
      if (focus.x < v.x0 + CAMERA_MARGIN) target.x -= v.x0 + CAMERA_MARGIN - focus.x;
      else if (focus.x + 1 > v.x1 - CAMERA_MARGIN) target.x += focus.x + 1 - (v.x1 - CAMERA_MARGIN);
      if (focus.y < v.y0 + CAMERA_MARGIN) target.y -= v.y0 + CAMERA_MARGIN - focus.y;
      else if (focus.y + 1 > v.y1 - CAMERA_MARGIN) target.y += focus.y + 1 - (v.y1 - CAMERA_MARGIN);
      const k = Math.min(1, dt / 220);
      camRef.current = { x: cam.x + (target.x - cam.x) * k, y: cam.y + (target.y - cam.y) * k };
      l = fitLayout(cols, rows, w, h, camRef.current);
    }
    // Kamera an den Rändern festhalten (sonst „klebt“ sie beim Zurückziehen)
    camRef.current = { x: (w / 2 - l.ox) / l.cell - 0.5, y: (h / 2 - l.oy) / l.cell - 0.5 };
    return l;
  }

  function draw(now: number, dt: number) {
    const cv = canvasRef.current;
    const stage = stageRef.current;
    if (!cv || !stage) return;
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    if (w < 10 || h < 10) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) {
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
    }
    const g = cv.getContext('2d');
    if (!g) return;
    const e = engineRef.current;
    const scene = e.scene();
    const layout = layoutFor(scene.cols, scene.rows, w, h, dt);
    layoutRef.current = layout;
    if (layout.cell !== cellPxRef.current) {
      cellPxRef.current = layout.cell;
      setCellPx(layout.cell);
    }
    // Kamera-Versatz für Tests sichtbar machen (ohne Neuzeichnen der Oberfläche)
    const cam = `${layout.ox},${layout.oy}`;
    if (stage.dataset.cam !== cam) stage.dataset.cam = cam;
    const vis = visionOf(settingsRef.current, profile);
    const overlay: GameObject[] = [];
    const c = checkRef.current;
    if (phaseRef.current === 'check' && c) {
      // Kontrollsymbol in der Mitte des sichtbaren Ausschnitts
      const v = visibleCells(layout);
      const x = Math.max(0, Math.min(scene.cols - 1, (v.x0 + v.x1) / 2 - 0.5));
      const y = Math.max(0, Math.min(scene.rows - 1, (v.y0 + v.y1) / 2 - 0.8));
      overlay.push({ id: 'probe-frame', kind: 'probe', x, y, w: 1, eyeVisibility: 'BOTH', contrast: 1, size: 2, alpha: 1 });
      overlay.push({ id: 'probe', kind: 'probe', x, y, w: 1, eyeVisibility: 'AMBLYOPIC', contrast: 1, size: 1.5, alpha: checkAlpha(now - c.t), flags: { shape: c.shape } });
    }
    const v = viewRef.current;
    if (v === 'ANAGLYPH_SIM') {
      if (!offRef.current) offRef.current = document.createElement('canvas');
      const off = offRef.current;
      off.width = cv.width;
      off.height = cv.height;
      const og = off.getContext('2d');
      if (!og) return;
      og.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderScene(og, scene, vis, layout, { view: 'BINOCULAR', overlay });
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderAnaglyphSim(g, off, w, h, vis, layout, { left: t.simLeft(t.filterName[filterOf('LEFT', vis)]), right: t.simRight(t.filterName[filterOf('RIGHT', vis)]) });
    } else {
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderScene(g, scene, vis, layout, { view: v, overlay });
    }
  }

  // Hauptschleife
  useEffect(() => {
    prepareAutoplay(firstLevel.number);
    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(100, Math.max(0, now - last));
      last = now;
      step(dt, now);
      draw(now, dt);
      if (now - timers.current.lastHud > 250) {
        timers.current.lastHud = now;
        setHud(hudOf());
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Debug-Tasten 1–5
  useEffect(() => {
    if (!debug) return;
    const onKey = (ev: KeyboardEvent) => {
      const v = DEBUG_KEYS[ev.key];
      if (v) setView(v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [debug]);

  function tapAt(clientX: number, clientY: number) {
    const cv = canvasRef.current;
    const l = layoutRef.current;
    if (!cv || !l) return;
    const r = cv.getBoundingClientRect();
    const e = engineRef.current;
    const c = cellAt(l, e.cols, e.rows, clientX - r.left, clientY - r.top);
    if (!c) return;
    followRef.current = true;
    e.tap(c.x, c.y);
    handleEvents(e.drainEvents());
    setHud(hudOf());
  }

  // Touch und Maus (Pointer Events): kurzes Antippen = Feld antippen; Ziehen = Ausschnitt verschieben (große Level)
  const onPointerDown = (ev: PointerEvent) => {
    if (phaseRef.current !== 'playing' || viewRef.current === 'ANAGLYPH_SIM') return;
    ev.preventDefault();
    const cam = camRef.current ?? { x: 0, y: 0 };
    dragRef.current = { id: ev.pointerId, x: ev.clientX, y: ev.clientY, cam: { ...cam }, moved: false };
    try {
      (ev.currentTarget as HTMLElement).setPointerCapture?.(ev.pointerId);
    } catch {
      // ältere Browser ohne Pointer Capture
    }
  };
  const onPointerMove = (ev: PointerEvent) => {
    const d = dragRef.current;
    const l = layoutRef.current;
    if (!d || d.id !== ev.pointerId || !l || (!l.scrollX && !l.scrollY)) return;
    const dx = ev.clientX - d.x;
    const dy = ev.clientY - d.y;
    if (!d.moved && Math.hypot(dx, dy) < DRAG_PX) return;
    d.moved = true;
    followRef.current = false;
    camRef.current = { x: l.scrollX ? d.cam.x - dx / l.cell : d.cam.x, y: l.scrollY ? d.cam.y - dy / l.cell : d.cam.y };
  };
  const onPointerUp = (ev: PointerEvent) => {
    const d = dragRef.current;
    dragRef.current = null;
    if (!d || d.id !== ev.pointerId || d.moved) return;
    if (phaseRef.current !== 'playing' || viewRef.current === 'ANAGLYPH_SIM') return;
    tapAt(ev.clientX, ev.clientY);
  };

  const planned = store.settings.sessionMinutes * 60000;
  const s = store.settings;
  const total = LEVELS.length;
  const lastDone = result?.completed && result.number >= total;

  return (
    <div class="bm-game" data-phase={phase} data-level={hud.level} data-profile={profile.id} style={{ background: rgbCss(profile.background) }}>
      <header class="bm-hud" role="toolbar">
        <span class="bm-hud-item bm-hud-session" id="hud-session">
          {t.session} {clock(hud.sessionMs)} / {clock(planned)}
        </span>
        <span class="bm-hud-item" id="hud-level">
          {t.level} {hud.level}
          <span class="bm-hud-name"> · {hud.levelName}</span>
        </span>
        <span class="bm-hud-item" id="hud-crystals">
          {t.crystals} {hud.delivered}/{hud.required}
        </span>
        <span class="bm-hud-item">
          {t.failures} {hud.failures}
        </span>
        <span class="bm-hud-item bm-hud-time">
          {t.time} {clock(hud.levelMs)}
        </span>
        {autoplay && <span class="bm-hud-item bm-hud-auto bm-muted">{t.autoplay}</span>}
        <span class="bm-hud-spacer" />
        {hud.carrying && phase === 'playing' && (
          <button
            class="bm-btn bm-btn-small"
            onClick={() => {
              engineRef.current.dropItem();
              handleEvents(engineRef.current.drainEvents());
              setHud(hudOf());
            }}
          >
            {t.drop}
          </button>
        )}
        <button
          class="bm-btn bm-btn-small"
          id="bm-sound"
          aria-label={`${t.sound}: ${audio.on ? t.volumes[audio.volume] : t.soundOff}`}
          onClick={() => {
            const a = nextAudio(audio);
            sound.setPrefs(a);
            onAudio(a);
            sound.play('select');
          }}
        >
          <SpeakerIcon level={audio.on ? ({ LOW: 1, MEDIUM: 2, HIGH: 3 } as const)[audio.volume] : 0} />
          <span class="bm-hud-soundtext">{t.soundHud(audio.on, t.volumes[audio.volume])}</span>
        </button>
        <button class="bm-btn bm-btn-small" id="bm-pause" disabled={phase !== 'playing'} onClick={pause}>
          {t.pause}
        </button>
        <button class="bm-btn bm-btn-small bm-btn-stop" id="bm-complaints" onClick={() => endSession('complaints')}>
          {t.complaints}
        </button>
      </header>
      {debug && (
        <div class="bm-debugbar" role="group" aria-label={t.debugTitle}>
          {(['AMBLYOPIC_ONLY', 'FELLOW_ONLY', 'BINOCULAR', 'ANAGLYPH_SIM', 'CLASSES'] as DebugView[]).map((v) => (
            <button key={v} class={`bm-btn bm-btn-small${view === v ? ' is-on' : ''}`} data-view={v} onClick={() => setView(v)}>
              {t.debugViews[v]}
            </button>
          ))}
          <span class="bm-muted">
            A {de(s.amblyopicContrast)} % · F {de(hud.fellow)} %
          </span>
        </div>
      )}
      <div class="bm-stage" ref={stageRef} data-cell={cellPx}>
        <canvas
          ref={canvasRef}
          class="bm-canvas"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (dragRef.current = null)}
          aria-label={t.appName}
        />
        <p class="bm-msg" role="status" aria-live="polite" id="bm-msg">
          {message}
        </p>
        {phase === 'check' && (
          <div class="bm-check" role="dialog" aria-label={t.checkQuestion}>
            <p>{t.checkQuestion}</p>
            <div class="bm-check-row">
              {SHAPES.map((sh) => (
                <button key={sh} class="bm-btn bm-shape-btn" data-shape={sh} aria-label={t.shapes[sh]} onClick={() => answerCheck(sh)}>
                  <ShapeIcon shape={sh} />
                  <span>{t.shapes[sh]}</span>
                </button>
              ))}
              <button class="bm-btn bm-shape-btn" data-shape="none" onClick={() => answerCheck(null)}>
                {t.checkNotSeen}
              </button>
            </div>
          </div>
        )}
        {phase === 'pauseOffer' && (
          <div class="bm-modal" role="dialog" aria-labelledby="po-title">
            <div class="bm-modal-card">
              <h2 id="po-title">{t.pauseOfferTitle}</h2>
              <p>{t.pauseOfferText}</p>
              <div class="bm-actions">
                <button class="bm-btn bm-btn-primary" onClick={pause}>
                  {t.takePause}
                </button>
                <button class="bm-btn" onClick={() => go('playing')}>
                  {t.resume}
                </button>
              </div>
            </div>
          </div>
        )}
        {phase === 'paused' && (
          <div class="bm-modal" role="dialog" aria-labelledby="pause-title">
            <div class="bm-modal-card">
              <h2 id="pause-title">{t.pausedTitle}</h2>
              <p>{t.pausedText}</p>
              <div class="bm-actions">
                <button class="bm-btn bm-btn-primary" id="bm-resume" onClick={resume}>
                  {t.resume}
                </button>
                <button
                  class="bm-btn"
                  onClick={() => {
                    rec.pauseEnd();
                    finishLevel('restarted');
                  }}
                >
                  {t.restartLevel}
                </button>
                <button class="bm-btn" onClick={() => endSession('user')}>
                  {t.endSession}
                </button>
              </div>
            </div>
          </div>
        )}
        {phase === 'levelEnd' && result && (
          <div class="bm-modal" role="dialog" aria-labelledby="le-title" id="level-end">
            <div class="bm-modal-card">
              <h2 id="le-title">{result.completed ? t.levelDoneTitle : t.levelTimeoutTitle}</h2>
              {result.completed ? (
                <p class="bm-stars" aria-label={t.starsLabel(result.stars)} data-stars={result.stars}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} class={i < result.stars ? 'is-on' : ''}>
                      {i < result.stars ? '★' : '☆'}
                    </span>
                  ))}
                </p>
              ) : (
                <p>{t.levelTimeoutText}</p>
              )}
              {lastDone && <p id="all-done">{t.allLevelsDone}</p>}
              <p>
                {t.level} {result.number} · {t.time} {clock(result.activeMs)} · {t.failures} {result.failures}
              </p>
              <p class="bm-muted">{result.before !== result.after ? t.contrastChange(de(result.before), de(result.after)) : t.contrastNow(de(result.after))}</p>
              <div class="bm-actions">
                {result.completed && !lastDone ? (
                  <button class="bm-btn bm-btn-primary" id="bm-next" onClick={() => startLevel(result.number + 1)}>
                    {t.nextLevel}
                  </button>
                ) : (
                  <button class="bm-btn bm-btn-primary" id="bm-next" onClick={() => startLevel(result.number)}>
                    {t.playAgain}
                  </button>
                )}
                <button class="bm-btn" id="bm-choose" onClick={() => go('chooseLevel')}>
                  {t.chooseLevel}
                </button>
                <button class="bm-btn" id="bm-end" onClick={() => endSession('user')}>
                  {t.endSession}
                </button>
              </div>
            </div>
          </div>
        )}
        {phase === 'chooseLevel' && (
          <div class="bm-modal" role="dialog" aria-labelledby="cl-title" id="choose-level">
            <div class="bm-modal-card bm-modal-wide">
              <h2 id="cl-title">{t.levelSelectTitle}</h2>
              <LevelGrid progress={store.progress} current={store.progress.level} onPick={(n) => startLevel(n)} />
              <div class="bm-actions">
                <button class="bm-btn" onClick={() => go('levelEnd')}>
                  {t.back}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
