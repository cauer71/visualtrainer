/**
 * Durchlauf-Harness für die Labor-Übungen ohne Browser (virtuelle Zeit, Geister-Hand wie im Runner, Attrappen-Zeichenfläche).
 * Gemeinsam genutzt von labor-sequenz-gedaechtnis, labor-woerter-bauen, labor-zeichen-finden und labor-mentale-rotation
 * (Vorbild: tests/unit/labor-spot-touch-sim.test.ts).
 */
import { buildCalib } from '../../src/core/calib';
import { createFormatter } from '../../src/core/format';
import { defaultParams, sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, PointerInfo } from '../../src/core/types';

export interface DrawnText {
  s: string;
  font: string;
}

export function fakeG(drawn?: DrawnText[]): CanvasRenderingContext2D {
  const store: Record<string, unknown> = {};
  const fn = () => undefined;
  return new Proxy(store, {
    get: (t, k: string) => {
      if (k === 'measureText') return (s: string) => ({ width: String(s).length * 9 });
      if (k === 'createRadialGradient' || k === 'createLinearGradient') return () => ({ addColorStop: fn });
      if (k === 'fillText' && drawn) return (s: string) => drawn.push({ s, font: String(t.font ?? '') });
      return k in t ? t[k] : fn;
    },
    set: (t, k: string, v) => {
      t[k] = v;
      return true;
    },
  }) as unknown as CanvasRenderingContext2D;
}

interface GhostAct {
  kind: 'tap' | 'move';
  x: number;
  y: number;
  delay: number;
  move: number;
}

/** Wie GhostHand im Runner: nacheinander abarbeiten, Tipp nach Fahrzeit, danach 170 ms Drücken */
export class FakeGhost {
  private queue: GhostAct[] = [];
  private cur: (GhostAct & { phase: 'wait' | 'move' | 'press'; t0: number }) | null = null;
  taps = 0;
  constructor(private onTap: (x: number, y: number, t: number) => void) {}
  get idle(): boolean {
    return !this.cur && this.queue.length === 0;
  }
  tap(x: number, y: number, o: { delay?: number; move?: number } = {}): void {
    this.queue.push({ kind: 'tap', x, y, delay: o.delay ?? 0, move: o.move ?? 380 });
  }
  moveTo(x: number, y: number, o: { delay?: number; move?: number } = {}): void {
    this.queue.push({ kind: 'move', x, y, delay: o.delay ?? 0, move: o.move ?? 450 });
  }
  clear(): void {
    this.queue = [];
    this.cur = null;
  }
  show(): void {}
  hide(): void {}
  update(t: number): void {
    if (!this.cur && this.queue.length) this.cur = { ...this.queue.shift()!, phase: 'wait', t0: t };
    const c = this.cur;
    if (!c) return;
    if (c.phase === 'wait') {
      if (t - c.t0 < c.delay) return;
      c.phase = 'move';
      c.t0 = t;
    }
    if (c.phase === 'move') {
      const k = c.move <= 0 ? 1 : Math.min(1, (t - c.t0) / c.move);
      if (k >= 1) {
        if (c.kind === 'tap') {
          c.phase = 'press';
          c.t0 = t;
          this.taps++;
          this.onTap(c.x, c.y, t);
        } else this.cur = null;
      }
      return;
    }
    if (c.phase === 'press' && t - c.t0 >= 170) this.cur = null;
  }
}

export interface Sim {
  result: ExerciseResult | null;
  seconds: number;
  toasts: string[];
  captions: string[];
  labels: string[];
  scores: Array<number | null>;
  progress: number[];
  ghostTaps: number;
  sounds: string[];
  drawn: DrawnText[];
}

export interface Opts {
  w?: number;
  h?: number;
  mode?: 'play' | 'demo';
  lang?: 'de' | 'it';
  quick?: boolean;
  autoplay?: boolean;
  params?: Record<string, unknown>;
  pxPerCm?: number;
  seed?: number;
  reducedMotion?: boolean;
  maxSeconds?: number;
  noCtxParams?: boolean;
  onFrame?: (ex: Exercise, now: number, ctx: ExerciseContext) => void;
  /** Wird nach jedem Frame aufgerufen (nach update und render) */
  afterFrame?: (ex: Exercise, now: number, ctx: ExerciseContext) => void;
  resizeAt?: { t: number; w: number; h: number };
  /** Zeichenaufrufe von Texten aufzeichnen (Schriftgröße prüfen) */
  recordText?: boolean;
}

export function simulate(def: ExerciseDefinition, o: Opts = {}): Sim {
  const g = (globalThis as unknown as { document?: unknown }).document;
  (globalThis as unknown as { document: unknown }).document = { createElement: () => ({ width: 0, height: 0, getContext: () => fakeG() }) };
  try {
    return run(def, o);
  } finally {
    (globalThis as unknown as { document?: unknown }).document = g;
  }
}

function run(def: ExerciseDefinition, o: Opts): Sim {
  const fps = 60;
  let w = o.w ?? 1040;
  let h = o.h ?? 715;
  const lang = o.lang ?? 'de';
  const mode = o.mode ?? 'play';
  let now = 0;
  let result: ExerciseResult | null = null;
  let endAt = 0;
  const toasts: string[] = [];
  const captions: string[] = [];
  const labels: string[] = [];
  const scores: Array<number | null> = [];
  const progress: number[] = [];
  const sounds: string[] = [];
  const drawn: DrawnText[] = [];
  let exRef: Exercise | null = null;
  const ghost = new FakeGhost((x, y, t) => exRef?.pointerDown?.({ id: -1, x, y, t, type: 'ghost' } satisfies PointerInfo));
  const stage = {
    get w() {
      return w;
    },
    get h() {
      return h;
    },
    get u() {
      return Math.min(w, h) / 100;
    },
    dpr: 1,
  };
  const noop = () => {};
  const params = sanitizeParams(def.params, o.params ?? {});
  const calib =
    mode === 'demo' ? buildCalib(Math.max(10, h / 13), 40, false, stage) : buildCalib(o.pxPerCm ?? 38, 40, o.pxPerCm !== undefined, stage);
  const ctx: ExerciseContext = {
    mode,
    autoplay: o.autoplay ?? true,
    quick: o.quick ?? false,
    reducedMotion: o.reducedMotion ?? false,
    startLevel: null,
    ...(o.noCtxParams ? {} : { params: mode === 'demo' ? defaultParams(def.params) : params, calib }),
    lang,
    texts: def.texts[lang],
    rng: createRng(o.seed ?? 7),
    sfx: {
      tick: noop,
      go: noop,
      good: () => sounds.push('good'),
      bad: () => sounds.push('bad'),
      tap: () => sounds.push('tap'),
      done: () => sounds.push('done'),
    },
    hud: {
      setProgress: (f) => progress.push(f),
      setScore: (v) => scores.push(v),
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
    ghost,
    stage,
    fmt: createFormatter(lang),
    now: () => now,
    finish: (r) => {
      if (!result) {
        result = r;
        endAt = now;
      }
    },
  };
  const ex = def.create(ctx);
  exRef = ex;
  ex.start(now);
  const dt = 1 / fps;
  const limit = (o.maxSeconds ?? 400) * 1000;
  const g2 = fakeG(o.recordText ? drawn : undefined);
  let resized = false;
  while (!result && now < limit) {
    now += dt * 1000;
    if (o.resizeAt && !resized && now >= o.resizeAt.t) {
      resized = true;
      w = o.resizeAt.w;
      h = o.resizeAt.h;
      ex.resize?.(w, h);
    }
    ghost.update(now);
    o.onFrame?.(ex, now, ctx);
    ex.update(dt, now);
    ex.render(g2, now);
    o.afterFrame?.(ex, now, ctx);
  }
  ex.destroy?.();
  return { result, seconds: endAt / 1000, toasts, captions, labels, scores, progress, ghostTaps: ghost.taps, sounds, drawn };
}

export const getSecondary = (r: ExerciseResult, k: string): number | undefined => r.secondary.find((m) => m.key === k)?.value;

/** Alle Blattpfade eines verschachtelten Objekts (für den Vergleich der Schlüssel in DE und IT) */
export const leaves = (o: unknown, path = ''): string[] =>
  o && typeof o === 'object' ? Object.entries(o as Record<string, unknown>).flatMap(([k, v]) => leaves(v, `${path}.${k}`)) : [path];
