/**
 * Durchlauf mit Zeichnen (ohne Browser) für „Sanfte Blickfolge“, „Zickzack-Bahn“ und „Dreiecksbahn“:
 * Jede Übung läuft im Intro-Film und im Spielmodus (Autoplay) gegen einen Attrappen-Kontext und eine
 * Attrappen-Zeichenfläche und muss sauber mit `ctx.finish` enden.
 */
import { describe, expect, it, vi } from 'vitest';
import { createFormatter } from '../../src/core/format';
import { createRng } from '../../src/core/rng';
import type { ExerciseContext, ExerciseDefinition, ExerciseResult, PointerInfo } from '../../src/core/types';
import { dreiecksbahn } from '../../src/exercises/dreiecksbahn/index';
import { sanfteBlickfolge } from '../../src/exercises/sanfte-blickfolge/index';
import { zickzackBahn } from '../../src/exercises/zickzack-bahn/index';
import { science as sDrei } from '../../src/exercises/dreiecksbahn/science';
import { science as sSanft } from '../../src/exercises/sanfte-blickfolge/science';
import { science as sZick } from '../../src/exercises/zickzack-bahn/science';

vi.mock('../../src/core/draw', async (orig) => {
  const real = await orig<typeof import('../../src/core/draw')>();
  return { ...real, background: () => {}, glow: () => {} };
});

class FakePath2D {
  moveTo(): void {}
  lineTo(): void {}
}
(globalThis as { Path2D?: unknown }).Path2D = FakePath2D;

function fakeCanvas(): CanvasRenderingContext2D {
  const store: Record<string, unknown> = {};
  return new Proxy(store, {
    get: (t, k: string) => (k in t ? t[k] : () => undefined),
    set: (t, k: string, v) => {
      t[k] = v;
      return true;
    },
  }) as unknown as CanvasRenderingContext2D;
}

function run(def: ExerciseDefinition, o: { mode: 'play' | 'demo'; w: number; h: number; quick?: boolean; seed?: number }) {
  let now = 0;
  let result: ExerciseResult | null = null;
  let endAt = 0;
  const taps: { at: number; x: number; y: number }[] = [];
  const toasts: string[] = [];
  const captions: string[] = [];
  const noop = () => {};
  const ctx: ExerciseContext = {
    mode: o.mode,
    autoplay: true,
    quick: o.quick ?? false,
    reducedMotion: false,
    startLevel: null,
    lang: 'de',
    texts: def.texts.de,
    rng: createRng(o.seed ?? 11),
    sfx: { tick: noop, go: noop, good: noop, bad: noop, tap: noop, done: noop },
    hud: {
      setProgress: noop,
      setScore: noop,
      setLabel: noop,
      toast: (t) => toasts.push(t),
      caption: (t) => {
        if (t) captions.push(t);
      },
    },
    ghost: {
      tap: (x, y, opts) => taps.push({ at: now + (opts?.delay ?? 0) + (opts?.move ?? 0), x, y }),
      moveTo: noop,
      clear: () => {
        taps.length = 0;
      },
      show: noop,
      hide: noop,
      idle: true,
    },
    stage: { w: o.w, h: o.h, u: Math.min(o.w, o.h) / 100, dpr: 1 },
    fmt: createFormatter('de'),
    now: () => now,
    finish: (r) => {
      result = r;
      endAt = now;
    },
  };
  const ex = def.create(ctx);
  const g = fakeCanvas();
  ex.start(now);
  let frames = 0;
  while (!result && now < 300000) {
    now += 1000 / 60;
    for (let i = taps.length - 1; i >= 0; i--) {
      if (taps[i].at <= now) {
        const tp = taps.splice(i, 1)[0];
        const p: PointerInfo = { id: 1, x: tp.x, y: tp.y, t: now, type: 'ghost' };
        ex.pointerDown?.(p);
      }
    }
    ex.update(1 / 60, now);
    ex.render(g, now);
    if (frames++ === 600) ex.resize?.(o.h, o.w);
  }
  ex.destroy?.();
  return { result: result as ExerciseResult | null, seconds: endAt / 1000, toasts, captions };
}

const defs: [string, ExerciseDefinition][] = [
  ['sanfte-blickfolge', sanfteBlickfolge],
  ['zickzack-bahn', zickzackBahn],
  ['dreiecksbahn', dreiecksbahn],
];

describe.each(defs)('%s', (id, def) => {
  it('Definition: Kennung, Kategorie, Blauton, Symbol, Texte de/it mit gleichen Schlüsseln', () => {
    expect(def.id).toBe(id);
    expect(def.category).toBe('bewegung');
    expect(def.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    const r = parseInt(def.color.slice(1, 3), 16);
    const b = parseInt(def.color.slice(5, 7), 16);
    expect(b).toBeGreaterThan(r + 40);
    expect(def.icon.length).toBeGreaterThan(20);
    for (const key of ['captions', 'metrics', 'tips', 'feedback'] as const) {
      expect(Object.keys(def.texts.it[key]).sort()).toEqual(Object.keys(def.texts.de[key]).sort());
    }
    for (const lang of ['de', 'it'] as const) {
      const t = def.texts[lang];
      expect(t.tagline.length).toBeLessThanOrEqual(80);
      for (const s of t.steps) expect(s.length).toBeLessThanOrEqual(60);
      for (const c of Object.values(t.captions)) expect(c.length).toBeLessThanOrEqual(40);
      expect(t.why).toMatch(/nicht belegt\.$|non è dimostrato[^.]*\.$/);
      expect(t.why).not.toMatch(/\bTest\b|Diagnose|Normwert|trainier|diagnosi/i);
    }
  });

  it('Intro-Film (16:11): 8–14 s, endet mit finish, zeigt die Erklärtexte', () => {
    for (const seed of [1, 2, 3]) {
      const r = run(def, { mode: 'demo', w: 880, h: 606, seed });
      expect(r.result).not.toBeNull();
      expect(r.seconds).toBeGreaterThan(8);
      expect(r.seconds).toBeLessThan(14);
      expect(r.captions).toContain(def.texts.de.captions.follow);
      expect(r.captions).toContain(def.texts.de.captions.where);
    }
  });

  it('Spielmodus mit Autoplay: Tablet quer, Hochformat (mit Drehen mitten drin) und Kurzmodus', () => {
    for (const [w, h, quick] of [
      [1194, 834, false],
      [390, 844, false],
      [1194, 834, true],
    ] as const) {
      const r = run(def, { mode: 'play', w, h, quick });
      expect(r.result).not.toBeNull();
      const res = r.result!;
      expect(Number.isInteger(res.primary.value)).toBe(true);
      expect(res.primary.unit).toBe('level');
      expect(res.secondary.length).toBeGreaterThanOrEqual(2);
      expect(res.secondary.length).toBeLessThanOrEqual(4);
      for (const m of [res.primary, ...res.secondary]) expect(def.texts.de.metrics[m.key], m.key).toBeTruthy();
      if (res.tip) expect(def.texts.de.tips[res.tip], res.tip).toBeTruthy();
      expect(r.seconds).toBeLessThan(quick ? 20 : 120);
    }
  });
});

describe('science', () => {
  it('Einträge vollständig: ≥ 3 Quellen, https, „nicht belegt“ in der Forschung', () => {
    for (const [id, s] of [
      ['sanfte-blickfolge', sSanft],
      ['zickzack-bahn', sZick],
      ['dreiecksbahn', sDrei],
    ] as const) {
      expect(s.id).toBe(id);
      expect(s.sources.length).toBeGreaterThanOrEqual(3);
      for (const x of s.sources) expect(x.url).toMatch(/^https:\/\//);
      for (const lang of ['de', 'it'] as const) {
        for (const k of ['trains', 'daily', 'research', 'improved'] as const) expect(s.texts[lang][k].length).toBeGreaterThan(20);
      }
      expect(s.texts.de.research).toMatch(/nicht belegt/);
      expect(s.texts.it.research).toMatch(/non è dimostrato/i);
    }
  });
});
