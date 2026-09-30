import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import { createFormatter } from '../../src/core/format';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult } from '../../src/core/types';
import { zieleAbraeumen } from '../../src/exercises/ziele-abraeumen';
import { pendelFang } from '../../src/exercises/pendel-fang';
import { hinterDerDeckung } from '../../src/exercises/hinter-der-deckung';

const proxyCtx: any = new Proxy(function () {}, {
  get: (_t, k) => (k === 'createLinearGradient' || k === 'createRadialGradient' ? () => ({ addColorStop() {} }) : k === 'measureText' ? () => ({ width: 10 }) : proxyCtx),
  apply: () => proxyCtx,
  set: () => true,
});
(globalThis as any).document = { createElement: () => ({ width: 1, height: 1, getContext: () => proxyCtx }) };

interface Act { kind: 'tap' | 'move'; x: number; y: number; delay: number; move: number }
function sim(def: ExerciseDefinition, o: { w: number; h: number; mode: 'play' | 'demo'; quick?: boolean; seed?: number; startLevel?: number | null; reduced?: boolean }) {
  let now = 0;
  let result: ExerciseResult | null = null;
  let endAt = 0;
  const queue: Act[] = [];
  let cur: (Act & { phase: 'wait' | 'move' | 'press'; t0: number }) | null = null;
  const log: string[] = [];
  const noop = () => {};
  const u = Math.min(o.w, o.h) / 100;
  const stats = { toasts: [] as string[], captions: [] as string[], taps: 0, good: 0, bad: 0 };
  const ctx: ExerciseContext = {
    mode: o.mode,
    autoplay: true,
    quick: o.quick ?? false,
    reducedMotion: o.reduced ?? false,
    startLevel: o.startLevel ?? null,
    lang: 'de',
    texts: def.texts.de,
    rng: createRng(o.seed ?? 7),
    sfx: { tick: noop, go: noop, good: () => stats.good++, bad: () => stats.bad++, tap: noop, done: noop },
    hud: {
      setProgress: noop,
      setScore: noop,
      setLabel: noop,
      toast: (t) => stats.toasts.push(t),
      caption: (t) => t && stats.captions.push(`${Math.round(now)}:${t}`),
    },
    ghost: {
      tap: (x, y, opts) => queue.push({ kind: 'tap', x, y, delay: opts?.delay ?? 0, move: opts?.move ?? 380 }),
      moveTo: (x, y, opts) => queue.push({ kind: 'move', x, y, delay: opts?.delay ?? 0, move: opts?.move ?? 450 }),
      clear: () => { queue.length = 0; cur = null; },
      show: noop,
      hide: noop,
      get idle() { return !cur && queue.length === 0; },
    },
    stage: { w: o.w, h: o.h, u, dpr: 1 },
    fmt: createFormatter('de'),
    now: () => now,
    finish: (r) => { result = r; endAt = now; },
  };
  const ex: Exercise = def.create(ctx);
  ex.start(now);
  const fps = 60;
  const dt = 1 / fps;
  while (!result && now < 300_000) {
    now += dt * 1000;
    // Hand wie im Runner
    if (!cur && queue.length) cur = { ...queue.shift()!, phase: 'wait', t0: now };
    if (cur) {
      if (cur.phase === 'wait' && now - cur.t0 >= cur.delay) { cur.phase = 'move'; cur.t0 = now; }
      if (cur.phase === 'move') {
        if (now - cur.t0 >= cur.move) {
          if (cur.kind === 'tap') { cur.phase = 'press'; cur.t0 = now; stats.taps++; ex.pointerDown?.({ id: -1, x: cur.x, y: cur.y, t: now, type: 'ghost' }); }
          else cur = null;
        }
      } else if (cur.phase === 'press' && now - cur.t0 >= 170) cur = null;
    }
    ex.update(dt, now);
    ex.render(proxyCtx, now);
  }
  ex.destroy?.();
  return { result: result as ExerciseResult | null, seconds: endAt / 1000, stats, log };
}

const defs: Array<[string, ExerciseDefinition]> = [
  ['ziele-abraeumen', zieleAbraeumen],
  ['pendel-fang', pendelFang],
  ['hinter-der-deckung', hinterDerDeckung],
];

describe('tmp sim', () => {
  for (const [name, def] of defs) {
    for (const [w, h] of [[1024, 700], [390, 760], [800, 550]] as const) {
      it(`${name} demo ${w}x${h}`, () => {
        const r = sim(def, { w, h, mode: 'demo' });
        process.stderr.write('\n' + [name, 'demo', w, h, r.seconds.toFixed(1), 's', JSON.stringify(r.stats)].join(' '));
        expect(r.result).toBeTruthy();
        expect(r.seconds).toBeGreaterThan(7);
        expect(r.seconds).toBeLessThan(15);
      });
      it(`${name} play ${w}x${h}`, () => {
        const r = sim(def, { w, h, mode: 'play', seed: w });
        process.stderr.write('\n' + [name, 'play', w, h, r.seconds.toFixed(1), 's', JSON.stringify(r.result), r.stats.taps, r.stats.good, r.stats.bad].join(' '));
        expect(r.result).toBeTruthy();
      });
    }
    it(`${name} quick + reduced`, () => {
      const r = sim(def, { w: 1024, h: 700, mode: 'play', quick: true, reduced: true });
      process.stderr.write('\n' + [name, 'quick', r.seconds.toFixed(1), JSON.stringify(r.result)].join(' '));
      expect(r.result).toBeTruthy();
    });
  }
});
