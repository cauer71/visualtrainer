/**
 * Rauchtest für die Touch-Fassungen der Körper-/Reflex-Übungen (abprall-fang, randabwehr, kugeln-fangen,
 * ausweichen, in-die-bahn): Die Übungen laufen ohne Browser gegen einen Attrappen-Kontext (virtuelle Zeit,
 * Attrappen-Zeichenfläche). Geprüft wird: Intro-Film endet, Autoplay im Spielmodus beendet die Sitzung mit einem
 * gültigen Ergebnis, Zeichnen wirft keine Fehler (Quer-, Hochformat, Film-Format) und zufällige Eingaben stören nicht.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createFormatter } from '../../src/core/format';
import { createRng } from '../../src/core/rng';
import { easeInOut, lerp } from '../../src/core/stats';
import type { Exercise, ExerciseDefinition, ExerciseResult, Ghost, GhostTapOptions, PointerInfo } from '../../src/core/types';
import { abprallFang } from '../../src/exercises/abprall-fang';
import { ausweichen } from '../../src/exercises/ausweichen';
import { inDieBahn } from '../../src/exercises/in-die-bahn';
import { kugelnFangen } from '../../src/exercises/kugeln-fangen';
import { randabwehr } from '../../src/exercises/randabwehr';
import { science as abprallFangScience } from '../../src/exercises/abprall-fang/science';
import { science as ausweichenScience } from '../../src/exercises/ausweichen/science';
import { science as inDieBahnScience } from '../../src/exercises/in-die-bahn/science';
import { science as kugelnFangenScience } from '../../src/exercises/kugeln-fangen/science';
import { science as randabwehrScience } from '../../src/exercises/randabwehr/science';

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
        toasts.push(String(s));
      },
      caption: (s: string | null) => {
        if (s !== null) captions.push(String(s));
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

describe('w10-touch: Hintergrundtexte', () => {
  const ENTRIES = [abprallFangScience, randabwehrScience, kugelnFangenScience, ausweichenScience, inDieBahnScience];
  it('je Übung: passende Kennung, Quellen (≥ 3, https), Texte in beiden Sprachen, Hinweis „nicht belegt“', () => {
    expect(ENTRIES.map((e) => e.id).sort()).toEqual(DEFS.map((d) => d.id).sort());
    for (const e of ENTRIES) {
      expect(['strong', 'medium', 'weak']).toContain(e.evidence);
      expect(e.sources.length, e.id).toBeGreaterThanOrEqual(3);
      const urls = new Set<string>();
      for (const src of e.sources) {
        expect(src.url).toMatch(/^https:\/\/(doi\.org|www\.w3\.org)\//);
        expect(src.label.length).toBeGreaterThan(20);
        expect(urls.has(src.url), `${e.id}: doppelte Quelle`).toBe(false);
        urls.add(src.url);
      }
      for (const lang of ['de', 'it'] as const) {
        for (const k of ['trains', 'daily', 'research', 'improved'] as const) expect(e.texts[lang][k].length, `${e.id}/${lang}/${k}`).toBeGreaterThan(20);
        expect(e.texts[lang].research, `${e.id}/${lang}`).toMatch(lang === 'de' ? /nicht belegt|nicht nachgewiesen/ : /non è dimostrato/);
      }
    }
  });
});

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
        for (const s of t.steps) expect(s.length).toBeLessThanOrEqual(60);
        for (const c of Object.values(t.captions)) expect(c.length, `${d.id}/${lang}: ${c}`).toBeLessThanOrEqual(42);
        // „why“ endet mit dem Hinweis, dass ein Nutzen nicht belegt ist
        expect(t.why).toMatch(lang === 'de' ? /nicht belegt\.$/ : /non è dimostrato[^.]*\.$/i);
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
        // der Film zeigt nur Gelungenes: kein ✗, kein „Verpasst“/„Durchgelassen“/„Zu spät“
        const t = def.texts.de;
        const bad = [t.feedback.escaped, t.feedback.passed, t.feedback.late, t.feedback.touch].filter(Boolean);
        for (const toast of r.toasts) {
          expect(toast).not.toContain('✗');
          expect(bad).not.toContain(toast);
        }
      });

      it(`Autoplay im Spielmodus beendet die kurze Sitzung mit gültigem Ergebnis (${size.name})`, () => {
        const r = run(def, { ...size, mode: 'play', autoplay: true, quick: true, maxSeconds: 120 });
        expect(r.result, 'Sitzung hat finish gerufen').toBeTruthy();
        checkResult(def, r.result!);
        expect(r.seconds).toBeLessThan(80);
        for (const toast of r.toasts) expect(toast).not.toContain('undefined');
        for (const c of r.captions) expect(c).not.toContain('undefined');
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


// ---------------------------------------------------------------------------
// Eingabe mit dem Finger (nicht Autoplay): Spielablauf Schritt für Schritt

interface Env {
  ex: Exercise;
  now: () => number;
  /** Zeit in s weiterlaufen lassen (60 Bilder/s) */
  step: (seconds: number, until?: () => boolean) => void;
  toasts: string[];
  result: () => ExerciseResult | null;
  /** Zugriff auf den inneren Zustand (nur für Tests) */
  inner: <T>() => T;
}

function env(def: ExerciseDefinition, o: { w?: number; h?: number; startLevel?: number; seed?: number } = {}): Env {
  let now = 0;
  let result: ExerciseResult | null = null;
  const toasts: string[] = [];
  const noop = () => {};
  const w = o.w ?? 1180;
  const h = o.h ?? 760;
  const ctx = {
    mode: 'play' as const,
    autoplay: false,
    quick: false,
    reducedMotion: false,
    startLevel: o.startLevel ?? null,
    lang: 'de' as const,
    texts: def.texts.de,
    rng: createRng(o.seed ?? 5),
    sfx: { tick: noop, go: noop, good: noop, bad: noop, tap: noop, done: noop },
    hud: { setProgress: noop, setScore: noop, setLabel: noop, toast: (s: string) => toasts.push(s), caption: noop },
    ghost: { tap: noop, moveTo: noop, clear: noop, show: noop, hide: noop, idle: true },
    stage: { w, h, u: Math.min(w, h) / 100, dpr: 1 },
    fmt: createFormatter('de'),
    now: () => now,
    finish: (r: ExerciseResult) => {
      result = result ?? r;
    },
  };
  const ex = def.create(ctx);
  const g = fake2d();
  ex.start(now);
  return {
    ex,
    now: () => now,
    toasts,
    result: () => result,
    inner: <T>() => ex as unknown as T,
    step: (seconds, until) => {
      for (let i = 0; i < Math.round(seconds * 60); i++) {
        now += 1000 / 60;
        ex.update(1 / 60, now);
        ex.render(g, now);
        if (until?.()) return;
      }
    },
  };
}

const ptr = (id: number, x: number, y: number, t: number): PointerInfo => ({ id, x, y, t, type: 'touch' });

describe('w10-touch: Abprall-Fang mit dem Finger', () => {
  interface Inner {
    phase: string;
    trial: { contact: { x: number; y: number }; lead: number } | null;
    s: number;
    ok: boolean;
    err: number;
    hits: number;
    late: number;
  }
  const flyUntil = (e: Env) => e.step(10, () => e.inner<Inner>().phase === 'fly' && e.inner<Inner>().s >= 0.05);

  it('Tipp genau auf den Berührungspunkt vor dem Abprall: Treffer mit ✓', () => {
    const e = env(abprallFang);
    flyUntil(e);
    const I = e.inner<Inner>();
    expect(I.phase).toBe('fly');
    const c = I.trial!.contact;
    e.ex.pointerDown!(ptr(1, c.x + 3, c.y - 2, e.now()));
    expect(I.phase).toBe('reveal');
    expect(I.ok).toBe(true);
    expect(I.hits).toBe(1);
    expect(e.toasts.some((t) => t.startsWith('✓'))).toBe(true);
  });

  it('Tipp weit daneben: ✗ mit Abweichung in %; zweiter Tipp im selben Durchgang zählt nicht', () => {
    const e = env(abprallFang);
    flyUntil(e);
    const I = e.inner<Inner>();
    const c = I.trial!.contact;
    e.ex.pointerDown!(ptr(1, c.x > 590 ? c.x - 300 : c.x + 300, c.y, e.now()));
    expect(I.ok).toBe(false);
    expect(I.err).toBeGreaterThan(20);
    expect(e.toasts.some((t) => t.startsWith('✗') && t.endsWith('%'))).toBe(true);
    const n = e.toasts.length;
    e.ex.pointerDown!(ptr(2, c.x, c.y, e.now()));
    expect(e.toasts.length).toBe(n);
    expect(I.hits).toBe(0);
  });

  it('kein Tipp bis zum Abprall: „Zu spät“, nicht als Abweichung gewertet', () => {
    const e = env(abprallFang);
    flyUntil(e);
    const I = e.inner<Inner>();
    e.step(10, () => I.phase === 'reveal');
    expect(I.phase).toBe('reveal');
    expect(I.late).toBe(1);
    expect(e.toasts).toContain('Zu spät');
  });

  it('Tipp vor dem Bewegungsbeginn wird ignoriert', () => {
    const e = env(abprallFang);
    e.step(3, () => e.inner<Inner>().phase === 'fly');
    const I = e.inner<Inner>();
    expect(I.phase).toBe('fly');
    expect(I.s).toBeLessThan(0);
    e.ex.pointerDown!(ptr(1, 100, 100, e.now()));
    expect(I.phase).toBe('fly');
  });
});

describe('w10-touch: In die Bahn mit dem Finger', () => {
  interface Inner {
    phase: string;
    route: { length: number; pts: { x: number; y: number }[] } | null;
    speed: number;
    hits: number;
    outcome: string;
    err: number;
    near: { s: number } | null;
  }
  const point = (I: Inner, frac: number) => {
    const pts = I.route!.pts;
    return pts[Math.round((pts.length - 1) * frac)];
  };
  const toGap = (e: Env) => e.step(20, () => e.inner<Inner>().phase === 'gap');

  it('auf die Bahn tippen und liegen lassen: Treffer', () => {
    const e = env(inDieBahn);
    toGap(e);
    const I = e.inner<Inner>();
    expect(I.phase).toBe('gap');
    const p = point(I, 0.6);
    e.ex.pointerDown!(ptr(1, p.x + 4, p.y + 3, e.now()));
    e.step(20, () => I.phase === 'reveal');
    expect(I.phase).toBe('reveal');
    expect(I.outcome).toBe('hit');
    expect(I.hits).toBe(1);
    expect(e.toasts.some((t) => t.startsWith('✓'))).toBe(true);
  });

  it('weit neben der Bahn: ✗ mit Abweichung in %', () => {
    const e = env(inDieBahn);
    toGap(e);
    const I = e.inner<Inner>();
    const p = point(I, 0.5);
    e.ex.pointerDown!(ptr(1, p.x + 160, p.y + 160, e.now()));
    e.step(20, () => I.phase === 'reveal');
    expect(I.outcome).toBe('miss');
    expect(I.err).toBeGreaterThan(8);
    expect(e.toasts.some((t) => t.startsWith('✗') && t.endsWith('%'))).toBe(true);
  });

  it('Abheben vor dem Durchlauf: „Zu früh losgelassen“; erneutes Aufsetzen ist möglich', () => {
    const e = env(inDieBahn);
    toGap(e);
    const I = e.inner<Inner>();
    const p = point(I, 0.7);
    e.ex.pointerDown!(ptr(1, p.x, p.y, e.now()));
    e.step(0.2);
    e.ex.pointerUp!(ptr(1, p.x, p.y, e.now()));
    e.step(20, () => I.phase === 'reveal');
    expect(I.outcome).toBe('early');
    expect(e.toasts).toContain('Zu früh losgelassen');

    const e2 = env(inDieBahn);
    toGap(e2);
    const J = e2.inner<Inner>();
    const q = point(J, 0.7);
    e2.ex.pointerDown!(ptr(1, q.x, q.y, e2.now()));
    e2.ex.pointerUp!(ptr(1, q.x, q.y, e2.now()));
    e2.step(0.1);
    e2.ex.pointerDown!(ptr(2, q.x, q.y, e2.now()));
    e2.step(20, () => J.phase === 'reveal');
    expect(J.outcome).toBe('hit');
  });

  it('Finger wandert weit weg: „Finger gewandert“ (nicht gewertet)', () => {
    const e = env(inDieBahn);
    toGap(e);
    const I = e.inner<Inner>();
    const p = point(I, 0.6);
    e.ex.pointerDown!(ptr(1, p.x, p.y, e.now()));
    e.step(0.1);
    e.ex.pointerMove!(ptr(1, p.x + 120, p.y + 40, e.now()));
    e.step(20, () => I.phase === 'reveal');
    expect(I.outcome).toBe('drift');
    expect(e.toasts).toContain('Finger gewandert');
  });

  it('Tipp dicht vor dem Durchlauf (weniger als 0,3 s) oder hinter dem Ziel zählt nicht', () => {
    const e = env(inDieBahn);
    e.step(30, () => e.inner<Inner>().phase === 'fang');
    const I = e.inner<Inner>();
    // Ziel läuft los; bis es ungefähr in der Mitte ist
    e.step(30, () => I.route !== null && (e.inner<{ passS: number }>().passS * I.speed) > I.route.length * 0.5);
    const behind = point(I, 0.3);
    e.ex.pointerDown!(ptr(1, behind.x, behind.y, e.now()));
    e.step(0.05);
    // nichts wurde übernommen: am Ende „Zu spät“
    e.step(20, () => I.phase === 'reveal');
    expect(I.outcome).toBe('late');
  });

  it('Tipp während des Zuschauens wird ignoriert', () => {
    const e = env(inDieBahn);
    e.step(10, () => e.inner<Inner>().phase === 'show');
    const I = e.inner<Inner>();
    const p = point(I, 0.5);
    e.ex.pointerDown!(ptr(1, p.x, p.y, e.now()));
    e.step(20, () => I.phase === 'reveal');
    expect(I.outcome).toBe('late');
  });
});

describe('w10-touch: Ausweichen mit dem Finger', () => {
  interface Ob {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
    hw: number;
    hh: number;
    kind: string;
    alpha: number;
    dying: boolean;
  }
  interface Inner {
    phase: string;
    fig: { x: number; y: number };
    off: number;
    obs: Ob[];
    touches: number;
    finger: unknown;
    clock: number;
  }
  const grab = (e: Env) => {
    const I = e.inner<Inner>();
    e.ex.pointerDown!(ptr(1, I.fig.x, I.fig.y + I.off, e.now()));
    return I;
  };

  it('ohne Finger steht alles still; der Finger setzt nur in der Nähe unter der Figur auf', () => {
    const e = env(ausweichen);
    const I = e.inner<Inner>();
    e.step(3);
    expect(I.obs.length).toBe(0);
    expect(I.clock).toBe(0);
    e.ex.pointerDown!(ptr(1, 5, 5, e.now()));
    expect(I.finger).toBeNull();
    expect(e.toasts).toContain('Setz den Finger unter die Figur');
    grab(e);
    expect(I.finger).not.toBeNull();
    e.step(1);
    expect(I.clock).toBeGreaterThan(0.9);
  });

  it('Figur folgt dem Finger mit festem Abstand und bleibt im Feld', () => {
    const e = env(ausweichen);
    const I = grab(e);
    const start = { ...I.fig };
    e.ex.pointerMove!(ptr(1, start.x + 50, start.y + I.off - 30, e.now()));
    expect(I.fig.x).toBeCloseTo(start.x + 50, 3);
    expect(I.fig.y).toBeCloseTo(start.y - 30, 3);
    e.ex.pointerMove!(ptr(1, -500, -500, e.now()));
    expect(I.fig.x).toBeGreaterThan(0);
    expect(I.fig.y).toBeGreaterThan(0);
  });

  it('Berührung: weiches ✗, kurze Pause, Hindernis verschwindet, danach geht es weiter', () => {
    const e = env(ausweichen);
    const I = grab(e);
    // Hindernis direkt auf die Figur legen
    I.obs.push({ kind: 'ball', x: I.fig.x + 10, y: I.fig.y, vx: 0, vy: 0, r: 30, hw: 30, hh: 30, alpha: 1, dying: false });
    e.step(0.1);
    expect(I.touches).toBe(1);
    expect(I.phase).toBe('pause');
    expect(e.toasts).toContain('Berührt – kurze Pause');
    // während der Pause läuft die Uhr nicht
    const c = I.clock;
    e.step(0.5);
    expect(I.clock).toBe(c);
    e.step(1.0, () => I.phase === 'play');
    expect(I.phase).toBe('play');
    e.step(1);
    expect(I.clock).toBeGreaterThan(c);
    // weiterhin nur eine Berührung (das berührte Hindernis ist weg)
    expect(I.touches).toBe(1);
  });

  it('Abheben = Pause: Hindernisse bewegen sich nicht', () => {
    const e = env(ausweichen);
    const I = grab(e);
    e.step(2);
    expect(I.obs.length).toBeGreaterThan(0);
    const before = I.obs.map((o) => [o.x, o.y]);
    e.ex.pointerUp!(ptr(1, 0, 0, e.now()));
    e.step(1);
    expect(I.obs.map((o) => [o.x, o.y])).toEqual(before);
  });

  it('weiter Sprung des Fingers durch ein Hindernis wird als Berührung erkannt', () => {
    const e = env(ausweichen);
    const I = grab(e);
    const f = { ...I.fig };
    I.obs.push({ kind: 'box', x: f.x + 200, y: f.y, vx: 0, vy: 0, r: 30, hw: 30, hh: 25, alpha: 1, dying: false });
    e.ex.pointerMove!(ptr(1, f.x + 400, f.y + I.off, e.now()));
    expect(I.touches).toBe(1);
  });
});

describe('w10-touch: Rand im Blick und Kugeln fangen mit dem Finger', () => {
  it('Rand im Blick: Punkt antippen = gefangen (✓), Tipp ins Leere ohne Strafe, unbeachtet = durchgelassen', () => {
    const e = env(randabwehr);
    interface Inner {
      dots: { angle: number; p: number }[];
      caught: number;
      passed: number;
      posAt: (d: unknown, p: number) => { x: number; y: number };
    }
    const I = e.inner<Inner>();
    e.step(5, () => I.dots.length > 0);
    e.step(0.6);
    const d = I.dots[0];
    const pos = I.posAt(d, d.p);
    e.ex.pointerDown!(ptr(1, pos.x + 5, pos.y + 4, e.now()));
    expect(I.caught).toBe(1);
    expect(e.toasts.some((t) => t.startsWith('✓'))).toBe(true);
    // Tipp ins Leere: keine Strafe
    const passed = I.passed;
    e.ex.pointerDown!(ptr(2, 3, 3, e.now()));
    expect(I.passed).toBe(passed);
    // nichts tun: der nächste Punkt erreicht die Mitte
    e.step(15, () => I.passed > 0);
    expect(I.passed).toBeGreaterThan(0);
    expect(e.toasts).toContain('Durchgelassen');
  });

  it('Kugeln fangen: Kreis antippen = gefangen, Quadrat antippen = Fehlalarm, Quadrat durchlassen zählt nicht', () => {
    const e = env(kugelnFangen, { seed: 9 });
    interface Faller {
      kind: string;
      p: number;
    }
    interface Inner {
      fallers: Faller[];
      caught: number;
      falseAlarms: number;
      missed: number;
      squaresPassed: number;
      posAt: (f: Faller, p: number) => { x: number; y: number };
    }
    const I = e.inner<Inner>();
    // ein Kreis
    e.step(10, () => I.fallers.some((f) => f.kind === 'circle' && f.p > 0.1));
    const c = I.fallers.find((f) => f.kind === 'circle')!;
    const cp = I.posAt(c, c.p);
    e.ex.pointerDown!(ptr(1, cp.x, cp.y, e.now()));
    expect(I.caught).toBe(1);
    // ein Quadrat: angetippt
    e.step(30, () => I.fallers.some((f) => f.kind === 'square' && f.p > 0.1));
    const s = I.fallers.find((f) => f.kind === 'square')!;
    const sp = I.posAt(s, s.p);
    e.ex.pointerDown!(ptr(2, sp.x, sp.y, e.now()));
    expect(I.falseAlarms).toBe(1);
    expect(e.toasts.some((t) => t.startsWith('✗'))).toBe(true);
    // ein weiteres Quadrat: durchgelassen
    const passed = I.squaresPassed;
    const missedBefore = I.missed;
    e.step(40, () => I.squaresPassed > passed);
    expect(I.squaresPassed).toBeGreaterThan(passed);
    expect(I.falseAlarms).toBe(1);
    // verpasste Kreise laufen unabhängig davon mit
    expect(I.missed).toBeGreaterThanOrEqual(missedBefore);
  });
});
