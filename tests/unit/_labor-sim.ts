/**
 * Durchlauf einer Labor-Übung ohne Browser: virtuelle Zeit (feste Bildrate), Geister-Hand wie im Runner und
 * eine Attrappen-Zeichenfläche (Aufrufe werden verschluckt, `measureText` liefert eine Breite).
 * Gemeinsam für die Durchlauf-Tests der Labor-Übungen mit Kurzdarbietung (Blitz-Erkennung, Peripheres Erkennen,
 * Doppelaufgabe); Muster wie `labor-spot-touch-sim.test.ts`.
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
  sounds: string[];
  ghost: FakeGhost;
  /** Aufrufe von `g.fillText` – Texte, die gezeichnet wurden (nur wenn `recordText`) */
  texts: string[];
  /** Dieselben Aufrufe mit der Füllfarbe zum Zeitpunkt des Zeichnens (nur wenn `recordText`) */
  textFills: Array<{ s: string; fill: string }>;
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
  viewDistanceCm?: number;
  seed?: number;
  reducedMotion?: boolean;
  maxSeconds?: number;
  fps?: number;
  noCtxParams?: boolean;
  /** Texte beim Zeichnen mitschneiden */
  recordText?: boolean;
  onFrame?: (ex: Exercise, now: number, ctx: ExerciseContext) => void;
  /** Nach jedem Bild (nach update und render) */
  afterFrame?: (ex: Exercise, now: number, ctx: ExerciseContext) => void;
  resizeAt?: { t: number; w: number; h: number };
  /** Ruckler: Bild-Zeitpunkte, bei denen ein Bild ausgelassen wird (Zeit springt um ein Bild weiter) */
  skipFramesAt?: number[];
}

/** Spielt eine Übung vollständig durch (oder bis `maxSeconds`) */
export function simulate(def: ExerciseDefinition, o: SimOpts = {}): Sim {
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
  const textFills: Array<{ s: string; fill: string }> = [];
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
  const defs = def.params ?? [];
  const params = sanitizeParams(defs, o.params ?? {});
  const vd = o.viewDistanceCm ?? 40;
  const calib =
    mode === 'demo' ? buildCalib(Math.max(10, h / 13), vd, false, stage) : buildCalib(o.pxPerCm ?? 38, vd, o.pxPerCm !== undefined, stage);
  const ctx: ExerciseContext = {
    mode,
    autoplay: o.autoplay ?? true,
    quick: o.quick ?? false,
    reducedMotion: o.reducedMotion ?? false,
    startLevel: null,
    ...(o.noCtxParams ? {} : { params: mode === 'demo' ? defaultParams(defs) : params, calib }),
    lang,
    texts: def.texts[lang],
    rng: createRng(o.seed ?? 7),
    // wie im Runner: im Intro-Film ist alles stumm
    sfx:
      mode === 'demo'
        ? { tick: noop, go: noop, good: noop, bad: noop, tap: noop, done: noop }
        : {
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
  const g2 = o.recordText
    ? (new Proxy(fakeG() as object, {
        get: (t, k: string, r) => {
          if (k === 'fillText')
            return (s: string) => {
              texts.push(String(s));
              textFills.push({ s: String(s), fill: String(Reflect.get(t, 'fillStyle', r)) });
            };
          return Reflect.get(t, k, r);
        },
        set: (t, k: string, v) => Reflect.set(t, k, v),
      }) as unknown as CanvasRenderingContext2D)
    : fakeG();
  let resized = false;
  const skips = [...(o.skipFramesAt ?? [])].sort((a, b) => a - b);
  while (!result && now < limit) {
    now += dt * 1000;
    if (skips.length && now >= skips[0]) {
      skips.shift();
      now += dt * 1000;
    }
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
  return { result, seconds: endAt / 1000, toasts, captions, labels, scores, progress, ghostTaps: ghost.taps, sounds, ghost, texts, textFills };
}

/** Wert einer Zusatzkennzahl */
export const secondary = (r: ExerciseResult, k: string): number | undefined => r.secondary.find((m) => m.key === k)?.value;

/** Alle Blätter eines verschachtelten Objekts als Pfade (zum Vergleich der Schlüssel in DE und IT) */
export const leaves = (o: unknown, path = ''): string[] =>
  o && typeof o === 'object' ? Object.entries(o as Record<string, unknown>).flatMap(([k, v]) => leaves(v, `${path}.${k}`)) : [path];

/** Wörter, die in den Texten nicht vorkommen dürfen (Wirk-/Heil-/Sicherheitsversprechen, Prüfbegriffe, Normwerte) */
export function legalProblems(texts: unknown, lang: 'de' | 'it'): string[] {
  const all = JSON.stringify(texts).toLowerCase();
  const bad = lang === 'de'
    ? ['diagnos', 'normwert', 'heilt', 'heilung', 'sicherer im', 'besseres sehen', 'trainiert deine augenmuskeln', 'sehkraft', 'sehschärfe verbessert', 'gesichtsfeldtest ersetzt']
    : ['diagnos', 'valori normali', 'valore normale', 'guarisce', 'più sicuro nel traffico', 'vista migliore'];
  const out = bad.filter((b) => all.includes(b));
  if (lang === 'de' && /\btest(en|s)?\b/.test(all)) out.push('test');
  if (lang === 'it' && /\btest\b/.test(all)) out.push('test');
  return out;
}
