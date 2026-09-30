/**
 * Durchlauf-Tests (ohne Browser) für „Schwarm-Wechsel“, „Rand-Ping“ und „Tipp-Tempo“:
 * Die Übungen laufen gegen einen Attrappen-Kontext mit virtueller Zeit und einer Geister-Hand, die sich
 * wie die des Runners verhält (Warteschlange, Fahrzeit, 170 ms Drücken, `idle`). Gezeichnet wird gegen
 * eine Attrappen-Zeichenfläche. Der Intro-Film (8–14 s) und der Autoplay müssen sauber mit `ctx.finish` enden.
 */
import { describe, expect, it } from 'vitest';
import { createFormatter } from '../../src/core/format';
import { createRng } from '../../src/core/rng';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, PointerInfo } from '../../src/core/types';
import { randPing } from '../../src/exercises/rand-ping/index';
import { science as scienceRand } from '../../src/exercises/rand-ping/science';
import { schwarmWechsel } from '../../src/exercises/schwarm-wechsel/index';
import { science as scienceSchwarm } from '../../src/exercises/schwarm-wechsel/science';
import { tippTempo } from '../../src/exercises/tipp-tempo/index';
import { science as scienceTipp } from '../../src/exercises/tipp-tempo/science';

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

const DEFS: Array<[string, ExerciseDefinition]> = [
  ['schwarm-wechsel', schwarmWechsel],
  ['rand-ping', randPing],
  ['tipp-tempo', tippTempo],
];

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
});

describe('Autoplay im Spielmodus', () => {
  for (const [id, def] of DEFS) {
    it(`${id} (quick): endet sauber, Ergebnis mit gültigen Schlüsseln (DE und IT)`, () => {
      const s = simulate({ def, quick: true, maxSeconds: 60 });
      expect(s.result, 'finish wurde nicht gerufen').not.toBeNull();
      expect(s.seconds).toBeLessThan(30);
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
  }

  it('schwarm-wechsel (volle Dauer): ≈ 45 s, Treffer, Stufe im Bereich', () => {
    const s = simulate({ def: schwarmWechsel, maxSeconds: 120 });
    expect(s.seconds).toBeGreaterThan(44);
    expect(s.seconds).toBeLessThan(46.5);
    const r = s.result!;
    expect(r.primary.unit).toBe('level');
    expect(Number.isInteger(r.primary.value)).toBe(true);
    expect(r.primary.value).toBeGreaterThanOrEqual(1);
    expect(r.primary.value).toBeLessThanOrEqual(16);
    const hits = r.secondary.find((m) => m.key === 'hits')!.value;
    expect(hits).toBeGreaterThan(8);
    checkResult(schwarmWechsel, r);
  });

  it('rand-ping (volle Dauer): 16 Durchgänge, ganzzahlige Stufe, beide Quoten', () => {
    const s = simulate({ def: randPing, maxSeconds: 400 });
    const r = s.result!;
    expect(r).not.toBeNull();
    expect(r.primary.unit).toBe('level');
    expect(Number.isInteger(r.primary.value)).toBe(true);
    const keys = r.secondary.map((m) => m.key);
    expect(keys).toEqual(['edgeRate', 'centerRate']);
    for (const m of r.secondary) {
      expect(m.value).toBeGreaterThanOrEqual(0);
      expect(m.value).toBeLessThanOrEqual(100);
    }
    // 16 Durchgänge zu je höchstens ≈ 5 s
    expect(s.seconds).toBeLessThan(120);
    checkResult(randPing, r);
  });

  it('tipp-tempo (volle Dauer): drei Runden à 20 s mit Pausen, Autoplay zählt plausibel', () => {
    const s = simulate({ def: tippTempo, maxSeconds: 400 });
    const r = s.result!;
    expect(r).not.toBeNull();
    // 3 s Countdown + 3 × 20 s + 2 × 20 s Pause + Nachspiel
    expect(s.seconds).toBeGreaterThan(103);
    expect(s.seconds).toBeLessThan(105);
    expect(r.primary.key).toBe('tapsPerBlock');
    expect(r.primary.unit).toBe('count');
    expect(r.primary.value).toBeGreaterThan(40);
    expect(r.primary.value).toBeLessThan(140);
    const best = r.secondary.find((m) => m.key === 'bestBlock')!.value;
    expect(best).toBeGreaterThanOrEqual(r.primary.value);
    expect(r.secondary.find((m) => m.key === 'drop')!.unit).toBe('percent');
    checkResult(tippTempo, r);
  });
});

describe('tipp-tempo: Eingabe', () => {
  /** Intro-Film-Zeitplan nutzen nicht – wir spielen normal (quick) und speisen Tipps selbst ein */
  function play(feed: (ex: Exercise, now: number, state: { done: boolean }) => void, quick = true): Sim {
    const state = { done: false };
    const g = (globalThis as unknown as { document?: unknown }).document;
    (globalThis as unknown as { document: unknown }).document = {
      createElement: () => ({ width: 0, height: 0, getContext: () => fakeG() }),
    };
    try {
      return run({
        def: tippTempo,
        quick,
        maxSeconds: 60,
        onFrame: (ex, now) => feed(ex, now, state),
      });
    } finally {
      (globalThis as unknown as { document?: unknown }).document = g;
    }
  }

  it('zwei gleichzeitige Finger: nur der erste zählt; Leertaste zählt; Tipp neben die Kugel zählt nicht', () => {
    // Quick-Plan: 0,9 s Countdown, dann Runde 1 von 0,9 s bis 3,9 s
    let i = 0;
    const s = play((ex, now) => {
      if (now < 1000 || now > 3800) return;
      // alle 100 ms: Finger 1 und Finger 2 gleichzeitig aufsetzen, erst danach beide heben
      if (Math.floor(now / 100) > i) {
        i = Math.floor(now / 100);
        ex.pointerDown?.({ id: 1, x: 520, y: 357, t: now, type: 'touch' });
        ex.pointerDown?.({ id: 2, x: 540, y: 360, t: now + 1, type: 'touch' });
        ex.pointerUp?.({ id: 1, x: 520, y: 357, t: now + 30, type: 'touch' });
        ex.pointerUp?.({ id: 2, x: 540, y: 360, t: now + 31, type: 'touch' });
        // Tipp neben die Kugel
        ex.pointerDown?.({ id: 3, x: 5, y: 5, t: now + 40, type: 'touch' });
        ex.pointerUp?.({ id: 3, x: 5, y: 5, t: now + 50, type: 'touch' });
        ex.keyDown?.(' ', now + 60);
      }
    });
    // Autoplay-Geisterhand tippt zusätzlich mit; Gesamtzahl der Tipps in Runde 1 = 29 Mal (Finger 1) + 29 Mal (Leertaste) + Hand
    expect(s.result).not.toBeNull();
    const r = s.result!;
    expect(r.score).toBeGreaterThan(0);
  });

  it('Zählweise genau: Finger 1 und Leertaste zählen, Finger 2 und Tipp daneben nicht', () => {
    // Attrappen-Kontext ohne Autoplay-Hand: nur Runde 1 von Hand, Ergebnis über ctx.finish
    const g = (globalThis as unknown as { document?: unknown }).document;
    (globalThis as unknown as { document: unknown }).document = {
      createElement: () => ({ width: 0, height: 0, getContext: () => fakeG() }),
    };
    try {
      let now = 0;
      let result: ExerciseResult | null = null;
      const noop = () => {};
      const ctx: ExerciseContext = {
        mode: 'play',
        autoplay: false,
        quick: true,
        reducedMotion: false,
        startLevel: null,
        lang: 'de',
        texts: tippTempo.texts.de,
        rng: createRng(1),
        sfx: { tick: noop, go: noop, good: noop, bad: noop, tap: noop, done: noop },
        hud: { setProgress: noop, setScore: noop, setLabel: noop, toast: noop, caption: noop },
        ghost: new FakeGhost(noop),
        stage: { w: 1040, h: 715, u: 7.15, dpr: 1 },
        fmt: createFormatter('de'),
        now: () => now,
        finish: (r) => {
          result = r;
        },
      };
      const ex = tippTempo.create(ctx);
      ex.start(0);
      const g2 = fakeG();
      const cx = 520;
      const cy = 357;
      let next = 1000;
      let rounds = 0;
      while (!result && now < 30000) {
        now += 1000 / 60;
        // Runde 1 läuft im Quick-Plan von 900 bis 3900 ms: 10 Tipp-Gruppen à (Finger 1 ✓, Finger 2 ✗, daneben ✗, Leertaste ✓)
        if (now >= next && now < 3800 && rounds < 10) {
          rounds++;
          next += 250;
          ex.pointerDown?.({ id: 1, x: cx, y: cy, t: now, type: 'touch' });
          ex.pointerDown?.({ id: 2, x: cx + 30, y: cy, t: now + 2, type: 'touch' });
          ex.pointerUp?.({ id: 1, x: cx, y: cy, t: now + 40, type: 'touch' });
          ex.pointerUp?.({ id: 2, x: cx + 30, y: cy, t: now + 42, type: 'touch' });
          ex.pointerDown?.({ id: 3, x: 4, y: 4, t: now + 60, type: 'touch' });
          ex.pointerUp?.({ id: 3, x: 4, y: 4, t: now + 70, type: 'touch' });
          ex.keyDown?.(' ', now + 90);
        }
        // Tipps außerhalb der Runde (Countdown, Pause) zählen nicht
        if (now > 4200 && now < 5500) ex.pointerDown?.({ id: 1, x: cx, y: cy, t: now, type: 'touch' });
        ex.update(1 / 60, now);
        ex.render(g2, now);
      }
      expect(result).not.toBeNull();
      const r = result!;
      // 10 Gruppen: je Finger 1 + Leertaste = 20 Tipps in Runde 1; Runden 2 und 3 leer
      expect(r.score).toBe(20);
      expect(r.secondary.find((m) => m.key === 'bestBlock')!.value).toBe(20);
      expect(r.primary.value).toBe(Math.round(20 / 3));
      expect(r.secondary.find((m) => m.key === 'drop')!.value).toBe(100);
    } finally {
      (globalThis as unknown as { document?: unknown }).document = g;
    }
  });
});

describe('schwarm-wechsel: Eingabe und Regeln', () => {
  it('Tippen auf leere Fläche ist ein Fehltipp (Zähler im Ergebnis), doppelte Tipps im selben Moment zählen einmal', () => {
    const g = (globalThis as unknown as { document?: unknown }).document;
    (globalThis as unknown as { document: unknown }).document = {
      createElement: () => ({ width: 0, height: 0, getContext: () => fakeG() }),
    };
    try {
      let now = 0;
      let result: ExerciseResult | null = null;
      const noop = () => {};
      const ctx: ExerciseContext = {
        mode: 'play',
        autoplay: false,
        quick: true,
        reducedMotion: false,
        startLevel: null,
        lang: 'de',
        texts: schwarmWechsel.texts.de,
        rng: createRng(5),
        sfx: { tick: noop, go: noop, good: noop, bad: noop, tap: noop, done: noop },
        hud: { setProgress: noop, setScore: noop, setLabel: noop, toast: noop, caption: noop },
        ghost: new FakeGhost(noop),
        stage: { w: 1040, h: 715, u: 7.15, dpr: 1 },
        fmt: createFormatter('de'),
        now: () => now,
        finish: (r) => {
          result = r;
        },
      };
      const ex = schwarmWechsel.create(ctx) as Exercise & { orbs: Array<{ x: number; y: number }> };
      ex.start(0);
      const g2 = fakeG();
      let done = 0;
      while (!result && now < 30000) {
        now += 1000 / 60;
        ex.update(1 / 60, now);
        ex.render(g2, now);
        if (now > 500 && done < 4 && ex.orbs.length) {
          // Tipp genau auf die erste Kugel (zählt), zweiter Tipp sofort danach auf dieselbe Stelle (Prellen, zählt nicht)
          const T = ex.orbs[0];
          ex.pointerDown?.({ id: 1, x: T.x, y: T.y, t: now, type: 'touch' });
          ex.pointerDown?.({ id: 2, x: T.x, y: T.y, t: now + 10, type: 'touch' });
          done++;
          now += 600;
        }
      }
      const r = result as ExerciseResult | null;
      expect(r).not.toBeNull();
      const hits = r!.secondary.find((m) => m.key === 'hits')!.value;
      expect(hits).toBe(4);
    } finally {
      (globalThis as unknown as { document?: unknown }).document = g;
    }
  });
});

describe('Bausteine', () => {
  it('Hintergrundtexte: mindestens 3 Quellen, https, deutsche und italienische Texte gleich gegliedert', () => {
    for (const s of [scienceSchwarm, scienceRand, scienceTipp]) {
      expect(s.sources.length).toBeGreaterThanOrEqual(3);
      for (const src of s.sources) expect(src.url).toMatch(/^https:\/\//);
      for (const lang of ['de', 'it'] as const) for (const k of ['trains', 'daily', 'research', 'improved'] as const) expect(s.texts[lang][k].length).toBeGreaterThan(20);
    }
  });

  it('Definitionen: id, Kategorie, Farbe, Symbol, gleiche Textschlüssel in DE und IT', () => {
    const cats: Record<string, string> = { 'schwarm-wechsel': 'bewegung', 'rand-ping': 'wahrnehmung', 'tipp-tempo': 'reaktion' };
    for (const [id, def] of DEFS) {
      expect(def.id).toBe(id);
      expect(def.category).toBe(cats[id]);
      expect(def.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(def.icon.length).toBeGreaterThan(20);
      for (const key of ['captions', 'metrics', 'tips', 'feedback'] as const) {
        expect(Object.keys(def.texts.it[key]).sort(), `${id}/${key}`).toEqual(Object.keys(def.texts.de[key]).sort());
      }
      const de = def.texts.de;
      expect(de.tagline.length).toBeLessThanOrEqual(80);
      expect(de.steps.length).toBeGreaterThanOrEqual(2);
      expect(de.steps.length).toBeLessThanOrEqual(3);
      for (const s of de.steps) expect(s.length).toBeLessThanOrEqual(60);
      expect(de.why).toMatch(/nicht belegt\.$/);
      expect(def.texts.it.why).toMatch(/non è dimostrato\.$/);
    }
  });
});
