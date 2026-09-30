/**
 * Hilfsmittel für Durchlauf-Tests von Übungen ohne Browser: Attrappen-Kontext mit virtueller Zeit, Geister-Hand
 * (Tipps werden zur geplanten Zeit als pointerDown ausgeliefert) und eine Attrappen-Leinwand, damit auch `render`
 * durchlaufen wird (fängt Laufzeitfehler beim Zeichnen).
 */
import { createFormatter } from '../../src/core/format';
import { createRng } from '../../src/core/rng';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, PointerInfo } from '../../src/core/types';
import type { Lang } from '../../src/i18n/lang';

export function fakeG(): CanvasRenderingContext2D {
  const store: Record<string, unknown> = {};
  const fn = () => undefined;
  return new Proxy({} as Record<string, unknown>, {
    get: (_t, k: string) => {
      if (k === 'measureText') return (s: string) => ({ width: String(s).length * 9 });
      if (k === 'createRadialGradient' || k === 'createLinearGradient') return () => ({ addColorStop: fn });
      if (k === 'canvas') return { width: 100, height: 100 };
      return k in store ? store[k] : fn;
    },
    set: (_t, k: string, v) => {
      store[k] = v;
      return true;
    },
  }) as unknown as CanvasRenderingContext2D;
}

export interface SimOpts {
  def: ExerciseDefinition;
  w?: number;
  h?: number;
  mode?: 'play' | 'demo';
  lang?: Lang;
  seed?: number;
  startLevel?: number | null;
  quick?: boolean;
  autoplay?: boolean;
  reducedMotion?: boolean;
  fps?: number;
  maxSeconds?: number;
  /** jedes n-te Bild auch zeichnen (0 = nie) */
  renderEvery?: number;
  onFrame?: (ex: Exercise, t: number) => void;
}

export interface SimOut {
  result: ExerciseResult | null;
  seconds: number;
  toasts: string[];
  captions: string[];
  labels: string[];
  ex: Exercise;
  /** Geister-Tipps (Ziele) in Reihenfolge */
  taps: { x: number; y: number }[];
  hiddenGhost: boolean;
}

export function simulate(o: SimOpts): SimOut {
  const g = (globalThis as unknown as { document?: unknown }).document;
  (globalThis as unknown as { document: unknown }).document = {
    createElement: () => ({ width: 0, height: 0, getContext: () => fakeG() }),
  };
  try {
    return run(o);
  } finally {
    (globalThis as unknown as { document?: unknown }).document = g;
  }
}

function run(o: SimOpts): SimOut {
  const fps = o.fps ?? 60;
  const w = o.w ?? 1024;
  const h = o.h ?? 768;
  let now = 0;
  let result: ExerciseResult | null = null;
  let endAt = 0;
  let queue: { at: number; x: number; y: number }[] = [];
  let ghostFree = 0;
  const allTaps: { x: number; y: number }[] = [];
  const toasts: string[] = [];
  const captions: string[] = [];
  const labels: string[] = [];
  let hiddenGhost = false;
  const lang: Lang = o.lang ?? 'de';
  const noop = () => {};
  const ctx: ExerciseContext = {
    mode: o.mode ?? 'play',
    autoplay: o.autoplay ?? true,
    quick: o.quick ?? false,
    reducedMotion: o.reducedMotion ?? false,
    startLevel: o.startLevel ?? null,
    lang,
    texts: o.def.texts[lang],
    rng: createRng(o.seed ?? 7),
    sfx: { tick: noop, go: noop, good: noop, bad: noop, tap: noop, done: noop },
    hud: {
      setProgress: noop,
      setScore: noop,
      setLabel: (s) => {
        if (s) labels.push(s);
      },
      toast: (s) => {
        toasts.push(s);
      },
      caption: (s) => {
        if (s) captions.push(s);
      },
    },
    ghost: {
      tap: (x, y, opts) => {
        ghostFree = Math.max(ghostFree, now) + (opts?.delay ?? 0) + (opts?.move ?? 380) + 170;
        queue.push({ at: ghostFree - 170, x, y });
        allTaps.push({ x, y });
      },
      moveTo: (_x, _y, opts) => {
        ghostFree = Math.max(ghostFree, now) + (opts?.delay ?? 0) + (opts?.move ?? 450);
      },
      clear: () => {
        queue = [];
        ghostFree = 0;
      },
      show: noop,
      hide: () => {
        hiddenGhost = true;
      },
      idle: true,
    },
    stage: { w, h, u: Math.min(w, h) / 100, dpr: 1 },
    fmt: createFormatter(lang),
    now: () => now,
    finish: (r) => {
      result = r;
      endAt = now;
    },
  };
  const ex = o.def.create(ctx);
  ex.start(now);
  const dt = 1 / fps;
  const limit = (o.maxSeconds ?? 600) * 1000;
  const g2 = fakeG();
  let frame = 0;
  while (!result && now < limit) {
    now += dt * 1000;
    frame++;
    queue.sort((a, b) => a.at - b.at);
    while (queue.length && queue[0].at <= now) {
      const tp = queue.shift()!;
      const p: PointerInfo = { id: -1, x: tp.x, y: tp.y, t: now, type: 'ghost' };
      ex.pointerDown?.(p);
    }
    ex.update(dt, now);
    o.onFrame?.(ex, now);
    if (o.renderEvery && frame % o.renderEvery === 0) ex.render(g2, now);
  }
  ex.destroy?.();
  return { result, seconds: endAt / 1000, toasts, captions, labels, ex, taps: allTaps, hiddenGhost };
}
