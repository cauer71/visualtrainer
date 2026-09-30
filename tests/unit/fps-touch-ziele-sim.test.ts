/**
 * Durchlauf-Tests (ohne Browser) für „Flick-Ziele“, „Randziel-Flick“, „Winkel halten“ und „Sofort-Reaktion“:
 * Die Übungen laufen gegen einen Attrappen-Kontext mit virtueller Zeit und einer Geister-Hand, die sich wie die
 * des Runners verhält (Warteschlange, Fahrzeit, 170 ms Drücken, `idle`). Gezeichnet wird gegen eine
 * Attrappen-Zeichenfläche. Der Intro-Film (8–14 s) und der Autoplay müssen sauber mit `ctx.finish` enden.
 */
import { describe, expect, it } from 'vitest';
import { createFormatter } from '../../src/core/format';
import { createRng } from '../../src/core/rng';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, PointerInfo } from '../../src/core/types';
import { flickZiele } from '../../src/exercises/flick-ziele/index';
import { science as scienceFlick } from '../../src/exercises/flick-ziele/science';
import { randzielFlick } from '../../src/exercises/randziel-flick/index';
import { science as scienceRandziel } from '../../src/exercises/randziel-flick/science';
import { sofortReaktion } from '../../src/exercises/sofort-reaktion/index';
import { science as scienceSofort } from '../../src/exercises/sofort-reaktion/science';
import { winkelHalten } from '../../src/exercises/winkel-halten/index';
import { science as scienceWinkel } from '../../src/exercises/winkel-halten/science';

function fakeG(): CanvasRenderingContext2D {
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
class FakeGhost {
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

interface Sim {
  result: ExerciseResult | null;
  seconds: number;
  toasts: string[];
  captions: string[];
  labels: string[];
  ghostTaps: number;
  downs: PointerInfo[];
}

interface Opts {
  def: ExerciseDefinition;
  w?: number;
  h?: number;
  mode?: 'play' | 'demo';
  lang?: 'de' | 'it';
  quick?: boolean;
  fps?: number;
  seed?: number;
  startLevel?: number | null;
  reducedMotion?: boolean;
  maxSeconds?: number;
  /** vor jedem Bild (z. B. um Tipps von Hand einzuspeisen) */
  onFrame?: (ex: Exercise, now: number) => void;
}

function simulate(o: Opts): Sim {
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

function run(o: Opts): Sim {
  const fps = o.fps ?? 60;
  const w = o.w ?? 1040;
  const h = o.h ?? 715;
  const lang = o.lang ?? 'de';
  let now = 0;
  let result: ExerciseResult | null = null;
  let endAt = 0;
  const toasts: string[] = [];
  const captions: string[] = [];
  const labels: string[] = [];
  const downs: PointerInfo[] = [];
  const noop = () => {};
  let exRef: Exercise | null = null;
  const ghost = new FakeGhost((x, y, t) => {
    const p: PointerInfo = { id: -1, x, y, t, type: 'ghost' };
    downs.push(p);
    exRef?.pointerDown?.(p);
  });
  const ctx: ExerciseContext = {
    mode: o.mode ?? 'play',
    autoplay: true,
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
    ghost,
    stage: { w, h, u: Math.min(w, h) / 100, dpr: 1 },
    fmt: createFormatter(lang),
    now: () => now,
    finish: (r) => {
      if (!result) {
        result = r;
        endAt = now;
      }
    },
  };
  const ex = o.def.create(ctx);
  exRef = ex;
  ex.start(now);
  const dt = 1 / fps;
  const limit = (o.maxSeconds ?? 400) * 1000;
  const g2 = fakeG();
  while (!result && now < limit) {
    now += dt * 1000;
    ghost.update(now);
    o.onFrame?.(ex, now);
    ex.update(dt, now);
    ex.render(g2, now);
  }
  ex.destroy?.();
  // Zum Nachsehen: SIM_DIAG=1 npx vitest run tests/unit/schwarm-ping-tipp-sim.test.ts
  if ((globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.SIM_DIAG) {
    console.log(`[sim] ${o.def.id} ${o.mode ?? 'play'} ${w}x${h} q=${!!o.quick} fps=${fps} ${(endAt / 1000).toFixed(1)} s taps=${ghost.taps} ->`, JSON.stringify(result), captions.slice(0, 6).join(' | '));
  }
  return { result, seconds: endAt / 1000, toasts, captions, labels, ghostTaps: ghost.taps, downs };
}

function checkResult(def: ExerciseDefinition, r: ExerciseResult): void {
  expect(Number.isFinite(r.primary.value)).toBe(true);
  expect(['higher', 'lower']).toContain(r.primary.better);
  expect(r.secondary.length).toBeGreaterThanOrEqual(1);
  expect(r.secondary.length).toBeLessThanOrEqual(4);
  for (const lang of ['de', 'it'] as const) {
    const tx = def.texts[lang];
    expect(tx.metrics[r.primary.key], `${def.id}/${lang}/${r.primary.key}`).toBeTruthy();
    for (const m of r.secondary) {
      expect(Number.isFinite(m.value), m.key).toBe(true);
      expect(tx.metrics[m.key], `${def.id}/${lang}/${m.key}`).toBeTruthy();
    }
    if (r.tip) expect(tx.tips[r.tip], `${def.id}/${lang}/tip ${r.tip}`).toBeTruthy();
  }
  expect(Number.isFinite(r.level)).toBe(true);
  expect(Number.isFinite(r.score)).toBe(true);
}


const DEFS: Array<[string, ExerciseDefinition]> = [
  ['flick-ziele', flickZiele],
  ['randziel-flick', randzielFlick],
  ['winkel-halten', winkelHalten],
  ['sofort-reaktion', sofortReaktion],
];
const SCIENCE = [scienceFlick, scienceRandziel, scienceWinkel, scienceSofort];


describe('Intro-Film (Demo)', () => {
  for (const [id, def] of DEFS) {
    for (const [name, w, h] of [
      ['16:11', 1040, 715],
      ['Hochformat', 360, 640],
    ] as const) {
      it(`${id} (${name}): endet nach 8–14 s mit ctx.finish, Hand tippt, Bildunterschriften vorhanden`, () => {
        const s = simulate({ def, mode: 'demo', w, h, maxSeconds: 40 });
        expect(s.result, 'finish wurde nicht gerufen').not.toBeNull();
        expect(s.seconds).toBeGreaterThanOrEqual(8);
        expect(s.seconds).toBeLessThanOrEqual(14.2);
        expect(s.ghostTaps).toBeGreaterThanOrEqual(2);
        expect(s.captions.length).toBeGreaterThanOrEqual(2);
        for (const c of s.captions) expect(c.length).toBeLessThanOrEqual(42);
        checkResult(def, s.result!);
      });
    }
    it(`${id}: Intro-Film ist mit gleichem Startwert reproduzierbar`, () => {
      const a = simulate({ def, mode: 'demo', seed: 3 });
      const b = simulate({ def, mode: 'demo', seed: 3 });
      expect(a.seconds).toBeCloseTo(b.seconds, 6);
      expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
    });
  }

  it('winkel-halten und sofort-reaktion zeigen im Film einen Frühstart', () => {
    for (const def of [winkelHalten, sofortReaktion]) {
      const s = simulate({ def, mode: 'demo' });
      expect(s.toasts, def.id).toContain(def.texts.de.feedback.early);
    }
  });
});

describe('Autoplay im Spielmodus', () => {
  for (const [id, def] of DEFS) {
    it(`${id} (quick): endet sauber, Ergebnis mit gültigen Schlüsseln (DE und IT)`, () => {
      const s = simulate({ def, quick: true, maxSeconds: 60 });
      expect(s.result, 'finish wurde nicht gerufen').not.toBeNull();
      expect(s.seconds).toBeLessThan(40);
      checkResult(def, s.result!);
    });
    it(`${id} (quick, Hochformat, Italienisch, Bewegung reduzieren): endet sauber`, () => {
      const s = simulate({ def, quick: true, w: 360, h: 640, lang: 'it', reducedMotion: true, maxSeconds: 60 });
      expect(s.result).not.toBeNull();
      checkResult(def, s.result!);
    });
    it(`${id} (120 Hz, andere Startstufe): endet sauber`, () => {
      const s = simulate({ def, quick: true, fps: 120, startLevel: 7.4, maxSeconds: 60 });
      expect(s.result).not.toBeNull();
      checkResult(def, s.result!);
    });
    it(`${id} (volle Sitzung, mehrere Startwerte): endet in höchstens 2,5 min mit gültigem Ergebnis`, () => {
      for (const seed of [1, 2, 3]) {
        const s = simulate({ def, seed, maxSeconds: 240 });
        expect(s.result, `seed ${seed}`).not.toBeNull();
        expect(s.seconds).toBeLessThan(150);
        checkResult(def, s.result!);
      }
    });
  }

  it('Stufen-Übungen: Hauptwert ist eine ganzzahlige Stufe (höher = besser)', () => {
    for (const def of [flickZiele, randzielFlick, winkelHalten]) {
      const r = simulate({ def, maxSeconds: 240 }).result!;
      expect(r.primary.unit, def.id).toBe('level');
      expect(r.primary.better).toBe('higher');
      expect(Number.isInteger(r.primary.value), def.id).toBe(true);
      expect(r.primary.value).toBeGreaterThanOrEqual(1);
      expect(r.primary.value).toBeLessThanOrEqual(14);
    }
  });

  it('flick-ziele: Zusatzwerte Treffer, Median-Zeit, Fehlklicks; 24 Ziele ausgewertet', () => {
    const r = simulate({ def: flickZiele, maxSeconds: 240 }).result!;
    const keys = r.secondary.map((m) => m.key);
    for (const k of ['hits', 'medianTime', 'wrong']) expect(keys).toContain(k);
    const n = (k: string) => r.secondary.find((m) => m.key === k)?.value ?? 0;
    expect(n('hits') + n('wrong') + n('missed')).toBe(24);
    expect(n('hits')).toBeGreaterThan(12);
  });

  it('randziel-flick: Zusatzwerte Median-Zeit und Trefferquote; 20 Durchgänge', () => {
    const r = simulate({ def: randzielFlick, maxSeconds: 240 }).result!;
    const keys = r.secondary.map((m) => m.key);
    expect(keys).toContain('medianTime');
    expect(keys).toContain('accuracy');
    const acc = r.secondary.find((m) => m.key === 'accuracy')!.value;
    expect(acc).toBeGreaterThan(40);
    expect(acc).toBeLessThanOrEqual(100);
  });

  it('winkel-halten: Median-Zeit und Frühstarts im Ergebnis', () => {
    const r = simulate({ def: winkelHalten, maxSeconds: 240 }).result!;
    const keys = r.secondary.map((m) => m.key);
    expect(keys).toContain('medianTime');
    expect(keys).toContain('early');
  });

  it('sofort-reaktion: Hauptwert Median-Zeit (niedriger = besser), Zusatz Streuung und Frühstarts', () => {
    const r = simulate({ def: sofortReaktion, maxSeconds: 240 }).result!;
    expect(r.primary.key).toBe('median');
    expect(r.primary.unit).toBe('time');
    expect(r.primary.better).toBe('lower');
    // Die Geister-Hand antwortet nach 230–480 ms Verzögerung
    expect(r.primary.value).toBeGreaterThan(200);
    expect(r.primary.value).toBeLessThan(600);
    const keys = r.secondary.map((m) => m.key);
    expect(keys).toContain('spread');
    expect(keys).toContain('early');
  });
});

describe('Eingabe-Regeln', () => {
  /** Eigene Tipps in der Wartezeit einspeisen (Frühstart) */
  it('winkel-halten: Tipp in der Wartezeit ist ein Frühstart und zählt nie als Treffer', () => {
    let fired = false;
    const s = simulate({
      def: winkelHalten,
      quick: true,
      maxSeconds: 60,
      onFrame: (ex, now) => {
        if (!fired && now > 1200) {
          fired = true;
          ex.pointerDown?.({ id: 5, x: 500, y: 300, t: now, type: 'touch' });
        }
      },
    });
    expect(s.toasts).toContain(winkelHalten.texts.de.feedback.early);
    const early = s.result!.secondary.find((m) => m.key === 'early')!.value;
    expect(early).toBeGreaterThanOrEqual(1);
  });

  it('sofort-reaktion: Tipp in der Wartezeit zählt als Frühstart, der Durchgang wiederholt sich', () => {
    let fired = false;
    const s = simulate({
      def: sofortReaktion,
      quick: true,
      maxSeconds: 60,
      onFrame: (ex, now) => {
        if (!fired && now > 900) {
          fired = true;
          ex.pointerDown?.({ id: 5, x: 500, y: 300, t: now, type: 'touch' });
        }
      },
    });
    expect(s.toasts).toContain(sofortReaktion.texts.de.feedback.early);
    const r = s.result!;
    expect(r.secondary.find((m) => m.key === 'early')!.value).toBeGreaterThanOrEqual(1);
    // quick = 3 gewertete Durchgänge; der Frühstart verbraucht keinen davon
    expect(r.secondary.find((m) => m.key === 'valid')!.value + 0).toBeGreaterThanOrEqual(2);
  });

  it('Doppel-Tipp (zweiter Finger 10 ms später) wird nicht zusätzlich gewertet', () => {
    for (const [id, def] of DEFS) {
      let patched = false;
      const s = simulate({
        def,
        quick: true,
        seed: 11,
        maxSeconds: 60,
        onFrame: (ex) => {
          if (patched || !ex.pointerDown) return;
          patched = true;
          const orig = ex.pointerDown.bind(ex);
          ex.pointerDown = (p: PointerInfo) => {
            orig(p);
            orig({ ...p, id: 9, t: p.t + 10, type: 'touch' });
          };
        },
      });
      const r = s.result!;
      expect(r, id).not.toBeNull();
      const n = (k: string) => r.secondary.find((m) => m.key === k)?.value ?? 0;
      if (id === 'flick-ziele') expect(n('hits') + n('wrong') + n('missed')).toBe(4);
      if (id === 'randziel-flick') expect(n('hits') + n('wrong')).toBeLessThanOrEqual(3);
      if (id === 'winkel-halten') expect(n('hits') + n('early')).toBeLessThanOrEqual(4);
      if (id === 'sofort-reaktion') expect(n('valid')).toBeLessThanOrEqual(3);
      checkResult(def, r);
    }
  });

  it('Hintergrundtexte: je ≥ 3 Quellen mit https-Link, beide Sprachen', () => {
    for (const e of SCIENCE) {
      expect(e.sources.length).toBeGreaterThanOrEqual(3);
      for (const s of e.sources) expect(s.url).toMatch(/^https:\/\//);
      for (const lang of ['de', 'it'] as const) {
        for (const k of ['trains', 'daily', 'research', 'improved'] as const) expect(e.texts[lang][k].length).toBeGreaterThan(20);
        expect(e.texts[lang].research).toMatch(/nicht belegt|non è dimostrat/i);
      }
    }
    for (const [id, def] of DEFS) {
      for (const lang of ['de', 'it'] as const) {
        const t = def.texts[lang];
        expect(t.why, `${id}/${lang}`).toMatch(/nicht belegt|non è dimostrat/i);
        expect(Object.keys(def.texts.de.metrics).sort()).toEqual(Object.keys(def.texts.it.metrics).sort());
        expect(Object.keys(def.texts.de.tips).sort()).toEqual(Object.keys(def.texts.it.tips).sort());
        expect(Object.keys(def.texts.de.captions).sort()).toEqual(Object.keys(def.texts.it.captions).sort());
        expect(Object.keys(def.texts.de.feedback).sort()).toEqual(Object.keys(def.texts.it.feedback).sort());
      }
    }
  });
});
