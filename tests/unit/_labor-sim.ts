/**
 * Gemeinsamer Prüfstand für Labor-Übungen ohne Browser: virtuelle Zeit (60 Bilder/s), Geister-Hand wie im Runner,
 * Attrappen-Zeichenfläche, Aufzeichnung von HUD, Bildunterschriften, Tönen. Wie der Prüfstand in
 * `labor-spot-touch-sim.test.ts`, aber für beliebige Übungen (`simulate(def, opts)`).
 */
import { buildCalib } from '../../src/core/calib';
import { createFormatter } from '../../src/core/format';
import { defaultParams, sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, PointerInfo } from '../../src/core/types';

export function fakeG(): CanvasRenderingContext2D {
  const store: Record<string, unknown> = {};
  const fn = () => undefined;
  return new Proxy(store, {
    get: (t, k: string) => {
      if (k === 'measureText') return (s: string) => ({ width: String(s).length * 9 });
      if (k === 'createRadialGradient' || k === 'createLinearGradient') return () => ({ addColorStop: fn });
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
  hidden = false;
  tapPoints: Array<{ x: number; y: number; t: number }> = [];
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
  show(): void {
    this.hidden = false;
  }
  hide(): void {
    this.hidden = true;
  }
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
          this.tapPoints.push({ x: c.x, y: c.y, t });
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
  ghostHidden: boolean;
  sounds: string[];
  /** Zeichenaufrufe der Attrappe, die Text zeichnen (fillText) */
  texts: string[];
  /** je Bild die gezeichneten Texte mit Ort und Deckkraft (nur mit `recordFrames`) */
  frames: TextCall[][];
}

export interface TextCall {
  s: string;
  x: number;
  y: number;
  alpha: number;
  /** Füllfarbe beim Zeichnen (z. B. „rgb(232,238,247)“) */
  color: string;
}

export interface SimOpts {
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
  /** Texte je Bild mit Ort und Deckkraft aufzeichnen (für Prüfungen weicher Übergänge) */
  recordFrames?: boolean;
  fps?: number;
  onFrame?: (ex: Exercise, now: number, ctx: ExerciseContext, frames: TextCall[][]) => void;
  resizeAt?: { t: number; w: number; h: number };
}

export function simulate(def: ExerciseDefinition, o: SimOpts): Sim {
  const g = (globalThis as unknown as { document?: unknown }).document;
  (globalThis as unknown as { document: unknown }).document = { createElement: () => ({ width: 0, height: 0, getContext: () => fakeG() }) };
  try {
    return run(def, o);
  } finally {
    (globalThis as unknown as { document?: unknown }).document = g;
  }
}

function run(def: ExerciseDefinition, o: SimOpts): Sim {
  const fps = o.fps ?? 60;
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
  const texts: string[] = [];
  const frames: TextCall[][] = [];
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
      beat: () => sounds.push('beat'),
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
  const g2 = recordingG(texts, o.recordFrames ? frames : null);
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
    o.onFrame?.(ex, now, ctx, frames);
    ex.update(dt, now);
    if (o.recordFrames) frames.push([]);
    ex.render(g2, now);
  }
  ex.destroy?.();
  return { result, seconds: endAt / 1000, toasts, captions, labels, scores, progress, ghostTaps: ghost.taps, ghostHidden: ghost.hidden, sounds, texts, frames };
}

/** Attrappe, die gezeichneten Text (fillText) mitschreibt – nur die letzten Bilder bleiben relevant */
function recordingG(texts: string[], frames: TextCall[][] | null): CanvasRenderingContext2D {
  const base = fakeG();
  return new Proxy(base, {
    get: (t, k: string) => {
      if (k === 'fillText') {
        return (s: string, x: number, y: number) => {
          if (texts.length > 2000) texts.shift();
          texts.push(String(s));
          if (frames && frames.length) {
            const st = t as unknown as Record<string, unknown>;
            const a = st.globalAlpha;
            frames[frames.length - 1].push({ s: String(s), x, y, alpha: typeof a === 'number' ? a : 1, color: String(st.fillStyle ?? '') });
          }
        };
      }
      return (t as unknown as Record<string, unknown>)[k];
    },
    set: (t, k: string, v) => {
      (t as unknown as Record<string, unknown>)[k] = v;
      return true;
    },
  }) as CanvasRenderingContext2D;
}

export const metric = (r: ExerciseResult, k: string): number | undefined => (r.primary.key === k ? r.primary.value : r.secondary.find((m) => m.key === k)?.value);

/** Alle Blattwerte eines Objekts (Pfad) – zum Vergleich von Schlüsseln in DE und IT */
export const leaves = (o: unknown, path = ''): string[] =>
  o && typeof o === 'object' ? Object.entries(o as Record<string, unknown>).flatMap(([k, v]) => leaves(v, `${path}.${k}`)) : [path];
