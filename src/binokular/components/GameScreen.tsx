/**
 * Spielbildschirm: verbindet Spiellogik (Engine), Darstellung (vision/renderer), Session-Protokoll,
 * adaptive Kontraststeuerung, Suppressions-Kontrollen, Pausen und Debug-Ansichten.
 */
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { DIFFICULTY_EFFECT, visionOf } from '../data/settings';
import { MAX_SESSIONS, type Store } from '../data/storage';
import { Engine, type EngineOptions } from '../game/engine';
import { applyCommand, BOTH_EYES, solveLevel, type SolverCommand } from '../game/solver';
import { calcStars, parTimeS } from '../game/stars';
import type { GameObject } from '../game/types';
import { levelByNumber, nextLevelNumber } from '../levels';
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
import { filterOf } from '../vision/color';
import { cellAt, DEBUG_KEYS, fitLayout, renderAnaglyphSim, renderScene, type DebugView, type Layout } from '../vision/renderer';
import { clock, de, ShapeIcon } from './common';

type Phase = 'playing' | 'check' | 'pauseOffer' | 'paused' | 'levelEnd' | 'ended';

interface LevelResult {
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
  autoplay: boolean;
  forceDebug: boolean;
  /** nur für Tests: erste Kontrollaufgabe nach n Sekunden */
  firstCheckS: number | null;
  onEnd: (rec: SessionRecord) => void;
};

/** Automatik: so viel schneller laufen die Roboter */
const AUTOPLAY_SPEED = 4;
const AUTOPLAY_GAP_MS = 180;

export function GameScreen({ store, update, autoplay, forceDebug, firstCheckS, onEnd }: Props) {
  const settingsRef = useRef(store.settings);
  settingsRef.current = store.settings;
  const calRef = useRef(store.calibration);
  calRef.current = store.calibration;
  const progressRef = useRef(store.progress);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const offRef = useRef<HTMLCanvasElement | null>(null);
  const layoutRef = useRef<Layout | null>(null);

  const [phase, setPhase] = useState<Phase>('playing');
  const phaseRef = useRef<Phase>('playing');
  const go = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };
  const [message, setMessage] = useState<string>(t.messages.selectRobot);
  const [result, setResult] = useState<LevelResult | null>(null);
  const [view, setView] = useState<DebugView>('BINOCULAR');
  const viewRef = useRef<DebugView>('BINOCULAR');
  viewRef.current = view;
  const debug = forceDebug || store.settings.debugMode;

  const rec = useMemo(
    () =>
      new SessionRecorder({
        patientId: store.settings.patientId,
        amblyopicContrast: store.settings.amblyopicContrast,
        fellowEyeContrast: store.settings.fellowEyeContrast,
        amblyopicEye: store.settings.amblyopicEye,
        glasses: store.settings.glasses,
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
    };
  };

  const startLevelNo = levelByNumber(store.progress.level).number;
  const engineRef = useRef<Engine>(null as unknown as Engine);
  if (!engineRef.current) engineRef.current = new Engine(levelByNumber(startLevelNo), engineOpts(startLevelNo));
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
      delivered: snap.delivered,
      required: snap.required,
      failures: snap.failures,
      levelMs: snap.elapsedMs,
      carrying: snap.carrying !== null && !snap.moving,
      fellow: settingsRef.current.fellowEyeContrast,
    };
  }

  function prepareAutoplay(n: number) {
    if (!autoplay) return;
    const r = solveLevel(levelByNumber(n), BOTH_EYES, engineOpts(n));
    autoRef.current = { cmds: r.commands, i: 0, nextAt: performance.now() + 600 };
  }

  function startLevel(n: number) {
    engineRef.current = new Engine(levelByNumber(n), engineOpts(n));
    timers.current.levelStartAt = rec.elapsed();
    levelOpen.current = true;
    setMessage(t.messages.selectRobot);
    setResult(null);
    prepareAutoplay(n);
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
      progress: {
        ...st.progress,
        consecutiveFailures: step.consecutiveFailures,
        level: completed ? nextLevelNumber(lvl.number) : lvl.number,
        bestStars: { ...st.progress.bestStars, [lvl.id]: Math.max(st.progress.bestStars[lvl.id] ?? 0, stars) },
      },
      activeSession: rec.snapshot(),
    }));
    if (res === 'restarted') {
      startLevel(lvl.number);
      return;
    }
    setResult({ completed, stars, activeMs: e.elapsedMs, failures: e.failures, before, after: step.fellowEyeContrast });
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
    saveProgress((st) => ({ ...st, sessions: [...st.sessions, final].slice(-MAX_SESSIONS), activeSession: null }));
    onEnd(final);
  }

  function startCheck(now: number) {
    const shape = randomShape(Math.random, lastShape.current);
    lastShape.current = shape;
    checkRef.current = { shape, t: now };
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

  function runAuto(now: number) {
    const a = autoRef.current;
    const e = engineRef.current;
    if (!a || a.i >= a.cmds.length || !e.isIdle() || now < a.nextAt) return;
    applyCommand(e, a.cmds[a.i++]);
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
      const evs = e.drainEvents();
      if (evs.length) setMessage(t.messages[evs[evs.length - 1].msg]);
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

  function draw(now: number) {
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
    const layout = fitLayout(scene.cols, scene.rows, w, h);
    layoutRef.current = layout;
    const vis = visionOf(settingsRef.current, calRef.current);
    const overlay: GameObject[] = [];
    const c = checkRef.current;
    if (phaseRef.current === 'check' && c) {
      const x = (scene.cols - 1) / 2;
      const y = (scene.rows - 1) / 2 - 0.3;
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
    prepareAutoplay(startLevelNo);
    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(100, Math.max(0, now - last));
      last = now;
      step(dt, now);
      draw(now);
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

  const onPointerDown = (ev: PointerEvent) => {
    if (phaseRef.current !== 'playing' || viewRef.current === 'ANAGLYPH_SIM') return;
    const cv = canvasRef.current;
    const l = layoutRef.current;
    if (!cv || !l) return;
    ev.preventDefault();
    const r = cv.getBoundingClientRect();
    const e = engineRef.current;
    const c = cellAt(l, e.cols, e.rows, ev.clientX - r.left, ev.clientY - r.top);
    if (!c) return;
    e.tap(c.x, c.y);
    const evs = e.drainEvents();
    if (evs.length) setMessage(t.messages[evs[evs.length - 1].msg]);
    setHud(hudOf());
  };

  const planned = store.settings.sessionMinutes * 60000;
  const s = store.settings;

  return (
    <div class="bm-game" data-phase={phase}>
      <header class="bm-hud" role="toolbar">
        <span class="bm-hud-item bm-hud-session" id="hud-session">
          {t.session} {clock(hud.sessionMs)} / {clock(planned)}
        </span>
        <span class="bm-hud-item">
          {t.level} {hud.level}
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
              const evs = engineRef.current.drainEvents();
              if (evs.length) setMessage(t.messages[evs[evs.length - 1].msg]);
              setHud(hudOf());
            }}
          >
            {t.drop}
          </button>
        )}
        <button
          class="bm-btn bm-btn-small"
          id="bm-pause"
          disabled={phase !== 'playing'}
          onClick={() => {
            rec.pauseBegin();
            go('paused');
          }}
        >
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
      <div class="bm-stage" ref={stageRef}>
        <canvas ref={canvasRef} class="bm-canvas" onPointerDown={onPointerDown} aria-label={t.appName} />
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
                <button
                  class="bm-btn bm-btn-primary"
                  onClick={() => {
                    rec.pauseBegin();
                    go('paused');
                  }}
                >
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
                <button
                  class="bm-btn bm-btn-primary"
                  id="bm-resume"
                  onClick={() => {
                    rec.pauseEnd();
                    go('playing');
                  }}
                >
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
              <p>
                {t.time} {clock(result.activeMs)} · {t.failures} {result.failures}
              </p>
              <p class="bm-muted">{result.before !== result.after ? t.contrastChange(de(result.before), de(result.after)) : t.contrastNow(de(result.after))}</p>
              <div class="bm-actions">
                <button class="bm-btn bm-btn-primary" id="bm-next" onClick={() => startLevel(store.progress.level)}>
                  {levelByNumber(store.progress.level).number === engineRef.current.level.number ? t.playAgain : t.nextLevel}
                </button>
                <button class="bm-btn" id="bm-end" onClick={() => endSession('user')}>
                  {t.endSession}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
