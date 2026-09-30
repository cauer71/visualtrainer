/**
 * Hilfsmittel für Tests der Blickfolge-Übungen: lässt den gemeinsamen Kern (`PursuitExercise`) ohne
 * Canvas gegen einen Attrappen-Kontext laufen (Autoplay, virtuelle Zeit) und meldet bei jedem Bild,
 * in dem das Zeichen gezeigt wird, den Zustand der Bahn.
 */
import { createRng } from '../../src/core/rng';
import type { Exercise, ExerciseContext, ExerciseResult, PointerInfo } from '../../src/core/types';
import { createFormatter } from '../../src/core/format';
import type { PursuitExercise } from '../../src/exercises/_shared/pursuit';
import { de } from '../../src/exercises/wellenbahn/texts';

export interface SimOptions {
  w: number;
  h: number;
  mode?: 'play' | 'demo';
  seed?: number;
  startLevel?: number | null;
  quick?: boolean;
  fps?: number;
  maxSeconds?: number;
  /** wird bei jedem Bild aufgerufen, in dem das Zeichen sichtbar ist */
  onShowFrame?: (ex: PursuitExercise, signSize: number) => void;
  /** wird bei jedem Bild aufgerufen */
  onFrame?: (ex: PursuitExercise, t: number) => void;
}

export interface SimResult {
  result: ExerciseResult | null;
  /** Dauer bis zum Aufruf von finish (s) */
  seconds: number;
  shows: number;
}

export function simulate(make: (ctx: ExerciseContext) => Exercise, o: SimOptions): SimResult {
  const fps = o.fps ?? 60;
  let now = 0;
  let result: ExerciseResult | null = null;
  let endAt = 0;
  const taps: { at: number; x: number; y: number }[] = [];
  const u = Math.min(o.w, o.h) / 100;
  const noop = () => {};
  const ctx: ExerciseContext = {
    mode: o.mode ?? 'play',
    autoplay: true,
    quick: o.quick ?? false,
    reducedMotion: false,
    startLevel: o.startLevel ?? null,
    lang: 'de',
    texts: de,
    rng: createRng(o.seed ?? 7),
    sfx: { tick: noop, go: noop, good: noop, bad: noop, tap: noop, done: noop },
    hud: { setProgress: noop, setScore: noop, setLabel: noop, toast: noop, caption: noop },
    ghost: {
      tap: (x, y, opts) => {
        taps.push({ at: now + (opts?.delay ?? 0) + (opts?.move ?? 0), x, y });
      },
      moveTo: noop,
      clear: () => {
        taps.length = 0;
      },
      show: noop,
      hide: noop,
      idle: true,
    },
    stage: { w: o.w, h: o.h, u, dpr: 1 },
    fmt: createFormatter('de'),
    now: () => now,
    finish: (r) => {
      result = r;
      endAt = now;
    },
  };
  const ex = make(ctx);
  const px = ex as unknown as { phase: string; signNow: number };
  ex.start(now);
  const dt = 1 / fps;
  const limit = (o.maxSeconds ?? 400) * 1000;
  let shows = 0;
  let prevPhase = '';
  while (!result && now < limit) {
    now += dt * 1000;
    for (let i = taps.length - 1; i >= 0; i--) {
      if (taps[i].at <= now) {
        const tp = taps.splice(i, 1)[0];
        const p: PointerInfo = { id: 1, x: tp.x, y: tp.y, t: now, type: 'ghost' };
        ex.pointerDown?.(p);
      }
    }
    ex.update(dt, now);
    o.onFrame?.(ex as PursuitExercise, now);
    if (px.phase === 'show') {
      if (prevPhase !== 'show') shows++;
      o.onShowFrame?.(ex as PursuitExercise, px.signNow);
    }
    prevPhase = px.phase;
  }
  return { result, seconds: endAt / 1000, shows };
}
