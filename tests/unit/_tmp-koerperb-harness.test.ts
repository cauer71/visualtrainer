import { describe, expect, it } from 'vitest';
import { createFormatter } from '../../src/core/format';
import { createRng } from '../../src/core/rng';
import type { ExerciseContext, ExerciseDefinition, ExerciseResult } from '../../src/core/types';
import { diagonalKorridor } from '../../src/exercises/diagonal-korridor';
import { musterNachzeichnen } from '../../src/exercises/muster-nachzeichnen';
import { rasterAusweichen } from '../../src/exercises/raster-ausweichen';
import { sprossenLeiter } from '../../src/exercises/sprossen-leiter';
import { sprungAbfangen } from '../../src/exercises/sprung-abfangen';

function fakeCanvas(): CanvasRenderingContext2D {
  const fn: any = new Proxy(function () {}, {
    get: (_t, p) => (p === 'measureText' ? () => ({ width: 10 }) : fn),
    apply: () => fn,
    set: () => true,
  });
  return fn as CanvasRenderingContext2D;
}

(globalThis as any).document = { createElement: () => ({ width: 0, height: 0, getContext: () => fakeCanvas() }) };

interface Run {
  result: ExerciseResult | null;
  ms: number;
  toasts: string[];
  captions: string[];
  errors: string[];
}

function run(def: ExerciseDefinition, o: { mode: 'play' | 'demo'; quick?: boolean; w: number; h: number; seed?: number; reduced?: boolean; hz?: number; startLevel?: number | null }): Run {
  const out: Run = { result: null, ms: 0, toasts: [], captions: [], errors: [] };
  const u = Math.min(o.w, o.h) / 100;
  const tRef = { now: 0 };
  const ctx: ExerciseContext = {
    mode: o.mode,
    autoplay: true,
    quick: !!o.quick,
    reducedMotion: !!o.reduced,
    startLevel: o.startLevel ?? null,
    lang: 'de',
    texts: def.texts.de,
    rng: createRng(o.seed ?? 1),
    sfx: { tick() {}, go() {}, good() {}, bad() {}, tap() {}, done() {} },
    hud: {
      setProgress() {},
      setScore() {},
      setLabel() {},
      toast: (s: string) => out.toasts.push(s),
      caption: (s: string | null) => {
        if (s) out.captions.push(s);
      },
    },
    ghost: { tap() {}, moveTo() {}, clear() {}, show() {}, hide() {}, idle: true },
    stage: { w: o.w, h: o.h, u, dpr: 1 },
    fmt: createFormatter('de'),
    now: () => tRef.now,
    finish: (r) => {
      out.result = r;
    },
  };
  const ex = def.create(ctx);
  const g = fakeCanvas();
  const step = 1000 / (o.hz ?? 60);
  let t = 0;
  ex.start(0);
  try {
    while (!out.result && t < 400000) {
      t += step;
      tRef.now = t;
      ex.update(Math.min(0.05, step / 1000), t);
      ex.render(g, t);
    }
  } catch (e) {
    out.errors.push(String((e as Error).stack));
  }
  out.ms = t;
  return out;
}

const DEFS: Array<[string, ExerciseDefinition]> = [
  ['sprung-abfangen', sprungAbfangen],
  ['sprossen-leiter', sprossenLeiter],
  ['diagonal-korridor', diagonalKorridor],
  ['muster-nachzeichnen', musterNachzeichnen],
  ['raster-ausweichen', rasterAusweichen],
];

const SIZES: Array<[string, number, number]> = [
  ['tablet', 1180, 820],
  ['phone', 390, 800],
  ['film', 1024, 704],
];

describe('harness', () => {
  for (const [name, def] of DEFS) {
    for (const [sz, w, h] of SIZES) {
      it(`${name} demo ${sz}`, () => {
        const r = run(def, { mode: 'demo', w, h });
        console.log(name, 'demo', sz, `${(r.ms / 1000).toFixed(1)}s`, r.captions.join(' | '), r.toasts.join(' | '));
        expect(r.errors).toEqual([]);
        expect(r.result).toBeTruthy();
      });
      it(`${name} play-quick ${sz}`, () => {
        const r = run(def, { mode: 'play', quick: true, w, h, seed: 3 });
        console.log(name, 'quick', sz, `${(r.ms / 1000).toFixed(1)}s`, JSON.stringify(r.result?.primary), JSON.stringify(r.result?.secondary));
        expect(r.errors).toEqual([]);
        expect(r.result).toBeTruthy();
      });
    }
    it(`${name} play-full tablet 120Hz reduced`, () => {
      const r = run(def, { mode: 'play', w: 1180, h: 820, seed: 5, hz: 120, reduced: true });
      console.log(name, 'full', `${(r.ms / 1000).toFixed(1)}s`, JSON.stringify(r.result?.primary), JSON.stringify(r.result?.secondary), r.result?.tip, r.result?.score);
      expect(r.errors).toEqual([]);
      expect(r.result).toBeTruthy();
    });
    it(`${name} play-full phone 30Hz startLevel 8`, () => {
      const r = run(def, { mode: 'play', w: 390, h: 800, seed: 9, hz: 30, startLevel: 8 });
      console.log(name, 'full8', `${(r.ms / 1000).toFixed(1)}s`, JSON.stringify(r.result?.primary), JSON.stringify(r.result?.secondary), r.result?.tip);
      expect(r.errors).toEqual([]);
      expect(r.result).toBeTruthy();
    });
  }
});
