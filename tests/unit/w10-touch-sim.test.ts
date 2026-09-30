/**
 * Rauchtest für die Touch-Fassungen der Körper-/Reflex-Übungen (abprall-fang, randabwehr, kugeln-fangen,
 * ausweichen, in-die-bahn): Die Übungen laufen ohne Browser gegen einen Attrappen-Kontext (virtuelle Zeit,
 * Attrappen-Zeichenfläche). Geprüft wird: Intro-Film endet, Autoplay im Spielmodus beendet die Sitzung mit einem
 * gültigen Ergebnis, Zeichnen wirft keine Fehler (Quer-, Hochformat, Film-Format) und zufällige Eingaben stören nicht.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createFormatter } from '../../src/core/format';
import { createRng } from '../../src/core/rng';
import { clamp, easeInOut, lerp } from '../../src/core/stats';
import type { Exercise, ExerciseDefinition, ExerciseResult, Ghost, GhostTapOptions, PointerInfo } from '../../src/core/types';
import { abprallFang } from '../../src/exercises/abprall-fang';
import { ausweichen } from '../../src/exercises/ausweichen';
import { inDieBahn } from '../../src/exercises/in-die-bahn';
import { kugelnFangen } from '../../src/exercises/kugeln-fangen';
import { randabwehr } from '../../src/exercises/randabwehr';

// ---------------------------------------------------------------------------
// Attrappen

function fake2d(): CanvasRenderingContext2D {
  const store: Record<string | symbol, unknown> = {};
  const self: unknown = new Proxy(function () {}, {
    get(_t, prop) {
      if (prop === 'measureText') return (s: string) => ({ width: String(s).length * 8 });
      if (prop in store) return store[prop];
      return () => self;
    },
    set(_t, prop, v) {
      store[prop] = v;
      return true;
    },
    apply() {
      return self;
    },
  });
  return self as CanvasRenderingContext2D;
}

const realDocument = (globalThis as { document?: unknown }).document;

beforeAll(() => {
  (globalThis as { document?: unknown }).document = {
    createElement: () => ({ width: 0, height: 0, getContext: () => fake2d() }),
  };
});

afterAll(() => {
  (globalThis as { document?: unknown }).document = realDocument;
});

interface GhostAction {
  kind: 'tap' | 'move';
  x: number;
  y: number;
  delay: number;
  move: number;
}

/** Wie die Geister-Hand der Engine: Warteschlange, Fahrzeit, Tipp (löst pointerDown aus) */
class FakeGhost implements Ghost {
  x = 900;
  y = 700;
  private queue: GhostAction[] = [];
  private cur: (GhostAction & { phase: 'wait' | 'move' | 'press'; t0: number; fx: number; fy: number }) | null = null;
  constructor(private onTap: (x: number, y: number, t: number) => void) {}
  get idle(): boolean {
    return !this.cur && this.queue.length === 0;
  }
  tap(x: number, y: number, o: GhostTapOptions = {}): void {
    this.queue.push({ kind: 'tap', x, y, delay: o.delay ?? 0, move: o.move ?? 380 });
  }
  moveTo(x: number, y: number, o: GhostTapOptions = {}): void {
    this.queue.push({ kind: 'move', x, y, delay: o.delay ?? 0, move: o.move ?? 450 });
  }
  clear(): void {
    this.queue = [];
    this.cur = null;
  }
  show(): void {}
  hide(): void {}
  update(t: number): void {
    if (!this.cur && this.queue.length) {
      const a = this.queue.shift()!;
      this.cur = { ...a, phase: 'wait', t0: t, fx: this.x, fy: this.y };
    }
    const c = this.cur;
    if (!c) return;
    if (c.phase === 'wait') {
      if (t - c.t0 < c.delay) return;
      c.phase = 'move';
      c.t0 = t;
      c.fx = this.x;
      c.fy = this.y;
    }
    if (c.phase === 'move') {
      const k = c.move <= 0 ? 1 : Math.min(1, (t - c.t0) / c.move);
      const e = easeInOut(k);
      this.x = lerp(c.fx, c.x, e);
      this.y = lerp(c.fy, c.y, e);
      if (k >= 1) {
        if (c.kind === 'tap') {
          c.phase = 'press';
          c.t0 = t;
          this.onTap(c.x, c.y, t);
        } else this.cur = null;
      }
      return;
    }
    if (c.phase === 'press' && t - c.t0 >= 170) this.cur = null;
  }
}

interface RunOptions {
  w: number;
  h: number;
  mode: 'play' | 'demo';
  autoplay: boolean;
  quick: boolean;
  seed?: number;
  startLevel?: number | null;
  reducedMotion?: boolean;
  maxSeconds: number;
  /** Zufällige Eingaben statt Autoplay (nur Spielmodus) */
  fuzz?: boolean;
}

interface RunResult {
  result: ExerciseResult | null;
  seconds: number;
  toasts: string[];
  captions: string[];
  labels: string[];
}

function run(def: ExerciseDefinition, o: RunOptions): RunResult {
  let now = 0;
  let result: ExerciseResult | null = null;
  let endAt = 0;
  const toasts: string[] = [];
  const captions: string[] = [];
  const labels: string[] = [];
  let ex: Exercise | null = null;
  const noop = () => {};
  const autoplay = o.mode === 'demo' || o.autoplay;
  const rng = createRng(o.seed ?? 7);
  const ghost = new FakeGhost((x, y, t) => ex?.pointerDown?.({ id: -1, x, y, t, type: 'ghost' }));
  const stage = { w: o.w, h: o.h, u: Math.min(o.w, o.h) / 100, dpr: 1 };
  const ctx = {
    mode: o.mode,
    autoplay,
    quick: o.quick,
    reducedMotion: o.reducedMotion ?? false,
    startLevel: o.startLevel ?? null,
    lang: 'de' as const,
    texts: def.texts.de,
    rng: createRng(o.mode === 'demo' ? 12345 : o.seed ?? 7),
    sfx: { tick: noop, go: noop, good: noop, bad: noop, tap: noop, done: noop },
    hud: {
      setProgress: (f: number) => {
        expect(Number.isFinite(f)).toBe(true);
      },
      setScore: noop,
      setLabel: (s: string | null) => {
        if (s) labels.push(s);
      },
      toast: (s: string) => {
        toasts.push(s);
      },
      caption: (s: string | null) => {
        if (s) captions.push(s);
      },
    },
    ghost: autoplay ? ghost : { tap: noop, moveTo: noop, clear: noop, show: noop, hide: noop, idle: true },
    stage,
    fmt: createFormatter('de'),
    now: () => now,
    finish: (r: ExerciseResult) => {
      if (!result) {
        result = r;
        endAt = now;
      }
    },
  };
  ex = def.create(ctx);
  const g = fake2d();
  const fps = 60;
  ex.start(now);
  const fuzzRng = createRng(99);
  let pid = 1;
  let down = false;
  for (let i = 0; i < o.maxSeconds * fps && !result; i++) {
    now += 1000 / fps;
    const dt = Math.min(0.05, 1 / fps);
    ghost.update(now);
    if (o.fuzz && !autoplay && i % 6 === 0) {
      const p: PointerInfo = { id: pid, x: fuzzRng.range(-20, o.w + 20), y: fuzzRng.range(-20, o.h + 20), t: now, type: 'touch' };
      const r = fuzzRng.next();
      if (r < 0.35) {
        ex.pointerDown?.(p);
        down = true;
      } else if (r < 0.85 && down) ex.pointerMove?.(p);
      else if (down) {
        ex.pointerUp?.(p);
        down = false;
        pid++;
      }
    }
    ex.update(dt, now);
    ex.render(g, now);
    void rng;
  }
  // nach dem Ende noch ein paar Bilder zeichnen (wie die Engine: update ruft sie nicht mehr, render schon)
  for (let i = 0; i < 5; i++) {
    now += 1000 / fps;
    ex.update(1 / fps, now);
    ex.render(g, now);
  }
  ex.destroy?.();
  return { result, seconds: endAt / 1000, toasts, captions, labels };
}

function checkResult(def: ExerciseDefinition, r: ExerciseResult): void {
  expect(Number.isInteger(r.primary.value)).toBe(true);
  expect(r.primary.key).toBe('level');
  expect(r.primary.unit).toBe('level');
  expect(r.primary.better).toBe('higher');
  expect(r.secondary.length).toBeGreaterThanOrEqual(2);
  expect(r.secondary.length).toBeLessThanOrEqual(4);
  for (const m of [r.primary, ...r.secondary]) {
    expect(Number.isFinite(m.value)).toBe(true);
    // jede Kennzahl hat in beiden Sprachen eine Bezeichnung
    for (const lang of ['de', 'it'] as const) expect(def.texts[lang].metrics[m.key], `${def.id}/${lang}/${m.key}`).toBeTruthy();
  }
  expect(Number.isFinite(r.score)).toBe(true);
  expect(Number.isFinite(r.level)).toBe(true);
  expect(r.level).toBeGreaterThanOrEqual(1);
  if (r.tip) for (const lang of ['de', 'it'] as const) expect(def.texts[lang].tips[r.tip], `${def.id}/${lang}/tip ${r.tip}`).toBeTruthy();
}

const DEFS: ExerciseDefinition[] = [abprallFang, randabwehr, kugelnFangen, ausweichen, inDieBahn];
const SIZES = [
  { name: 'Tablet quer', w: 1180, h: 760 },
  { name: 'Hochformat', w: 600, h: 960 },
];

describe('w10-touch: Definition', () => {
  it('Kennung, Kategorie, Symbol, Texte in beiden Sprachen mit gleichen Schlüsseln', () => {
    const cats: Record<string, string> = {
      'abprall-fang': 'bewegung',
      randabwehr: 'bewegung',
      'kugeln-fangen': 'reaktion',
      ausweichen: 'bewegung',
      'in-die-bahn': 'bewegung',
    };
    for (const d of DEFS) {
      expect(d.category).toBe(cats[d.id]);
      expect(d.id).toMatch(/^[a-z0-9-]+$/);
      expect(d.icon.length).toBeGreaterThan(20);
      expect(d.minutes).toBeGreaterThan(0);
      for (const key of ['captions', 'metrics', 'tips', 'feedback'] as const) {
        expect(Object.keys(d.texts.it[key]).sort(), `${d.id}/${key}`).toEqual(Object.keys(d.texts.de[key]).sort());
      }
      for (const lang of ['de', 'it'] as const) {
        const t = d.texts[lang];
        expect(t.tagline.length).toBeLessThanOrEqual(90);
        expect(t.steps.length).toBeGreaterThanOrEqual(2);
        expect(t.steps.length).toBeLessThanOrEqual(3);
        for (const s of t.steps) expect(s.length).toBeLessThanOrEqual(62);
        for (const c of Object.values(t.captions)) expect(c.length, `${d.id}/${lang}: ${c}`).toBeLessThanOrEqual(42);
        // „why“ endet mit dem Hinweis, dass ein Nutzen nicht belegt ist
        expect(t.why).toMatch(lang === 'de' ? /nicht belegt\.$/ : /non è dimostrato[^.]*\.$/);
      }
    }
  });

  it('keine Gewalt-, Wirk- oder Testbegriffe in den Texten', () => {
    const bad = /(schuss|schüsse|geschoss|kill|bedrohung|abwehr|treffer eliminier|sehkraft|besser sehen|heil|diagnos|normwert|sicherer im verkehr|\btest\b|sparo|proiettil|minaccia|diagnosi)/i;
    for (const d of DEFS) {
      for (const lang of ['de', 'it'] as const) {
        const t = d.texts[lang];
        const all = [t.title, t.tagline, t.why, ...t.steps, ...t.goodFor, ...Object.values(t.captions), ...Object.values(t.metrics), ...Object.values(t.tips), ...Object.values(t.feedback)];
        for (const s of all) expect(s, `${d.id}/${lang}: ${s}`).not.toMatch(bad);
      }
    }
  });
});

for (const def of DEFS) {
  describe(`w10-touch: ${def.id}`, () => {
    for (const size of SIZES) {
      it(`Intro-Film endet nach 7–16 s und zeichnet ohne Fehler (${size.name})`, () => {
        const r = run(def, { ...size, mode: 'demo', autoplay: true, quick: false, maxSeconds: 40 });
        expect(r.result, 'Film hat finish gerufen').toBeTruthy();
        expect(r.seconds).toBeGreaterThanOrEqual(7);
        expect(r.seconds).toBeLessThanOrEqual(16);
        expect(r.captions.length).toBeGreaterThan(0);
        for (const c of r.captions) expect(c.length).toBeLessThanOrEqual(42);
      });

      it(`Autoplay im Spielmodus beendet die kurze Sitzung mit gültigem Ergebnis (${size.name})`, () => {
        const r = run(def, { ...size, mode: 'play', autoplay: true, quick: true, maxSeconds: 120 });
        expect(r.result, 'Sitzung hat finish gerufen').toBeTruthy();
        checkResult(def, r.result!);
        expect(r.seconds).toBeLessThan(80);
      });
    }

    it('volle Sitzung mit Autoplay endet (Quer, Startstufe aus früherer Sitzung, „Bewegung reduzieren“)', () => {
      const r = run(def, { w: 1180, h: 760, mode: 'play', autoplay: true, quick: false, startLevel: 4, reducedMotion: true, maxSeconds: 400, seed: 3 });
      expect(r.result).toBeTruthy();
      checkResult(def, r.result!);
      expect(r.seconds).toBeGreaterThan(20);
      expect(r.seconds).toBeLessThan(200);
    });

    it('Stufe ist begrenzt und die nächste Startstufe liegt im Bereich', () => {
      for (const sl of [1, 20, 99]) {
        const r = run(def, { w: 1180, h: 760, mode: 'play', autoplay: true, quick: true, startLevel: sl, maxSeconds: 120, seed: 11 + sl });
        expect(r.result).toBeTruthy();
        expect(r.result!.primary.value).toBeGreaterThanOrEqual(1);
        expect(r.result!.primary.value).toBeLessThanOrEqual(25);
        expect(r.result!.level).toBeGreaterThanOrEqual(1);
        expect(r.result!.level).toBeLessThanOrEqual(25);
      }
    });

    it('zufällige Eingaben (auch außerhalb der Bühne, mehrere Finger-IDs) werfen keine Fehler', () => {
      const r = run(def, { w: 768, h: 1024, mode: 'play', autoplay: false, quick: true, maxSeconds: 25, fuzz: true, seed: 5 });
      // die Sitzung kann (ohne gute Eingabe) noch laufen oder beendet sein – beides ist in Ordnung
      if (r.result) checkResult(def, r.result);
    });
  });
}

describe('w10-touch: Hilfsfunktionen der Attrappe', () => {
  it('clamp/lerp arbeiten wie erwartet', () => {
    expect(clamp(5, 0, 3)).toBe(3);
    expect(lerp(0, 10, 0.5)).toBe(5);
  });
});
