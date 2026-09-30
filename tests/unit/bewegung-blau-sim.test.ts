/**
 * Durchlauf-Tests (ohne Browser) für „Ausweichziel“, „Sprungziel“ und „Landepunkt“:
 * Die Übungen laufen gegen einen Attrappen-Kontext mit virtueller Zeit (Autoplay bzw. Intro-Film),
 * zeichnen gegen eine Attrappen-Zeichenfläche und müssen sauber mit `ctx.finish` enden.
 */
import { describe, expect, it, vi } from 'vitest';
import { createRng } from '../../src/core/rng';
import { createFormatter } from '../../src/core/format';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, PointerInfo } from '../../src/core/types';
import { ausweichziel } from '../../src/exercises/ausweichziel/index';
import { sprungziel } from '../../src/exercises/sprungziel/index';
import { landepunkt } from '../../src/exercises/landepunkt/index';
import { barLayout, BUTTON_DIRS } from '../../src/exercises/_shared/zeichenaufgabe';
import { science as sAus } from '../../src/exercises/ausweichziel/science';
import { science as sSpr } from '../../src/exercises/sprungziel/science';
import { science as sLan } from '../../src/exercises/landepunkt/science';

vi.mock('../../src/core/draw', async (orig) => {
  const real = await orig<typeof import('../../src/core/draw')>();
  return { ...real, background: () => {}, glow: () => {} };
});

/** Zeichenfläche, die jeden Aufruf schluckt (Eigenschaften dürfen gesetzt werden) */
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

interface Sim {
  result: ExerciseResult | null;
  seconds: number;
  toasts: string[];
  captions: string[];
  ex: Exercise;
  frames: number;
}

interface Opts {
  w?: number;
  h?: number;
  mode?: 'play' | 'demo';
  quick?: boolean;
  seed?: number;
  startLevel?: number | null;
  fps?: number;
  reduced?: boolean;
  onFrame?: (ex: Record<string, unknown>, t: number) => void;
  maxSeconds?: number;
}

function run(def: ExerciseDefinition, o: Opts = {}): Sim {
  const w = o.w ?? 1180;
  const h = o.h ?? 820;
  const fps = o.fps ?? 60;
  let now = 0;
  let result: ExerciseResult | null = null;
  let endAt = 0;
  const toasts: string[] = [];
  const captions: string[] = [];
  const taps: { at: number; x: number; y: number }[] = [];
  const noop = () => {};
  const mode = o.mode ?? 'play';
  const ctx: ExerciseContext = {
    mode,
    autoplay: true,
    quick: o.quick ?? false,
    reducedMotion: o.reduced ?? false,
    startLevel: o.startLevel ?? null,
    lang: 'de',
    texts: def.texts.de,
    rng: createRng(o.seed ?? 7),
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
      tap: (x, y, opts) => {
        taps.push({ at: now + (opts?.delay ?? 0) + (opts?.move ?? 0), x, y });
      },
      moveTo: noop,
      clear: () => {
        taps.length = 0;
      },
      show: noop,
      hide: noop,
      idle: true,
    },
    stage: { w, h, u: Math.min(w, h) / 100, dpr: 1 },
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
  const dt = 1 / fps;
  const limit = (o.maxSeconds ?? 300) * 1000;
  let frames = 0;
  while (!result && now < limit) {
    now += dt * 1000;
    for (let i = taps.length - 1; i >= 0; i--) {
      if (taps[i].at <= now) {
        const tp = taps.splice(i, 1)[0];
        const p: PointerInfo = { id: 1, x: tp.x, y: tp.y, t: now, type: 'ghost' };
        ex.pointerDown?.(p);
      }
    }
    ex.update(dt, now);
    o.onFrame?.(ex as unknown as Record<string, unknown>, now);
    if (frames++ % 3 === 0) ex.render(g, now);
  }
  ex.destroy?.();
  return { result, seconds: endAt / 1000, toasts, captions, ex, frames };
}

const DEFS: Array<[string, ExerciseDefinition]> = [
  ['ausweichziel', ausweichziel],
  ['sprungziel', sprungziel],
  ['landepunkt', landepunkt],
];

describe.each(DEFS)('%s: Definition', (id, def) => {
  it('Kennung, Kategorie, Symbol, Texte in beiden Sprachen mit gleichen Schlüsseln', () => {
    expect(def.id).toBe(id);
    expect(def.category).toBe('bewegung');
    expect(def.icon.length).toBeGreaterThan(20);
    expect(def.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    const keys = (o: object) => Object.keys(o).sort();
    const { de, it: itT } = def.texts;
    expect(keys(de)).toEqual(keys(itT));
    for (const sec of ['captions', 'metrics', 'tips', 'feedback'] as const) expect(keys(de[sec])).toEqual(keys(itT[sec]));
    expect(de.steps.length).toBeGreaterThanOrEqual(2);
    expect(de.steps.length).toBeLessThanOrEqual(3);
    expect(itT.steps.length).toBe(de.steps.length);
    for (const s of de.steps) expect(s.length).toBeLessThanOrEqual(60);
    for (const s of itT.steps) expect(s.length).toBeLessThanOrEqual(64);
    expect(de.tagline.length).toBeLessThanOrEqual(80);
    expect(itT.tagline.length).toBeLessThanOrEqual(90);
    for (const c of Object.values(de.captions)) expect(c.length).toBeLessThanOrEqual(40);
    for (const c of Object.values(itT.captions)) expect(c.length).toBeLessThanOrEqual(40);
    expect(de.why.trim().endsWith('ist nicht belegt.')).toBe(true);
    expect(itT.why.trim().endsWith('non è dimostrato che l’esercizio si trasferisca alla vita di tutti i giorni.') || itT.why.includes('non è dimostrato')).toBe(true);
  });

  it('Texte enthalten keine Wirk- oder Testversprechen', () => {
    const all = JSON.stringify(def.texts).toLowerCase();
    for (const bad of ['trainiert deine', 'besser sehen', 'besseres sehen', 'sicherer im verkehr', 'diagnose', 'normwert', 'heilt', 'allenamento dei muscoli']) {
      expect(all).not.toContain(bad);
    }
    expect(all).not.toMatch(/\btest\b/);
  });
});

describe('Wissens-Einträge', () => {
  it.each([
    ['ausweichziel', sAus],
    ['sprungziel', sSpr],
    ['landepunkt', sLan],
  ] as const)('%s: Quellen, Texte, Beleglage', (id, sc) => {
    expect(sc.id).toBe(id);
    expect(['strong', 'medium', 'weak']).toContain(sc.evidence);
    expect(sc.sources.length).toBeGreaterThanOrEqual(3);
    for (const s of sc.sources) {
      expect(s.url).toMatch(/^https:\/\/doi\.org\/10\./);
      expect(s.label.length).toBeGreaterThan(20);
    }
    for (const lang of ['de', 'it'] as const) {
      const t = sc.texts[lang];
      for (const k of ['trains', 'daily', 'research', 'improved'] as const) expect(t[k].length).toBeGreaterThan(40);
      expect(t.research).toMatch(/nicht belegt|non è dimostrato/);
    }
  });
});

describe('Antwortleiste', () => {
  it('Buttons ≥ 56 px breit und ≥ 56 px hoch – Tablet quer, Hochformat, Handy, Intro-Film', () => {
    for (const [w, h] of [
      [1180, 820],
      [820, 1180],
      [390, 740],
      [740, 390],
      [1100, 770],
    ]) {
      for (const demo of [false, true]) {
        const L = barLayout({ w, h, u: Math.min(w, h) / 100, dpr: 1 }, demo);
        expect(L.btns).toHaveLength(4);
        expect(BUTTON_DIRS).toHaveLength(4);
        for (const b of L.btns) {
          expect(b.w).toBeGreaterThanOrEqual(56);
          expect(b.h).toBeGreaterThanOrEqual(56);
          expect(b.x).toBeGreaterThanOrEqual(0);
          expect(b.x + b.w).toBeLessThanOrEqual(w);
          expect(b.y + b.h).toBeLessThanOrEqual(h);
        }
        expect(L.world.y1).toBe(L.barTop);
      }
    }
  });
});

describe.each(DEFS)('%s: Intro-Film', (_id, def) => {
  it('endet mit finish nach 8–14 s, mit Unterschriften und Geister-Tipps', () => {
    for (const [w, h] of [
      [1100, 770],
      [820, 1180],
    ]) {
      const s = run(def, { mode: 'demo', w, h });
      expect(s.result).not.toBeNull();
      expect(s.seconds).toBeGreaterThanOrEqual(8);
      expect(s.seconds).toBeLessThanOrEqual(14);
      expect(s.captions.length).toBeGreaterThanOrEqual(2);
      expect(s.toasts.length).toBeGreaterThanOrEqual(1);
    }
  });
});

describe.each(DEFS)('%s: Spielmodus mit Autoplay', (_id, def) => {
  it('Schnelltest endet sauber und liefert ein gültiges Ergebnis', () => {
    const s = run(def, { quick: true });
    expect(s.result).not.toBeNull();
    checkResult(s.result!);
    expect(s.seconds).toBeLessThan(40);
  });

  it('volle Sitzung: ganzzahlige Stufe, 2–4 Zusatzwerte, Dauer ≈ 1 Minute', () => {
    for (const seed of [1, 2, 3]) {
      const s = run(def, { seed });
      expect(s.result).not.toBeNull();
      checkResult(s.result!);
      expect(s.seconds).toBeGreaterThan(35);
      expect(s.seconds).toBeLessThan(110);
    }
  });

  it('läuft auch bei 120 Hz, im Hochformat, mit gespeicherter Startstufe und reduzierter Bewegung', () => {
    for (const o of [
      { fps: 120, quick: true },
      { w: 820, h: 1180, quick: true },
      { w: 390, h: 740, quick: true },
      { startLevel: 12, quick: true },
      { reduced: true, quick: true },
    ] as Opts[]) {
      const s = run(def, o);
      expect(s.result).not.toBeNull();
      checkResult(s.result!);
    }
  });
});

function checkResult(r: ExerciseResult): void {
  expect(r.primary.key).toBe('level');
  expect(r.primary.unit).toBe('level');
  expect(Number.isInteger(r.primary.value)).toBe(true);
  expect(r.primary.value).toBeGreaterThanOrEqual(1);
  expect(r.primary.value).toBeLessThanOrEqual(20);
  expect(r.secondary.length).toBeGreaterThanOrEqual(2);
  expect(r.secondary.length).toBeLessThanOrEqual(4);
  for (const m of r.secondary) expect(Number.isFinite(m.value)).toBe(true);
  expect(r.score).toBeGreaterThanOrEqual(0);
  expect(r.level).toBeGreaterThanOrEqual(1);
  expect(r.level).toBeLessThanOrEqual(20);
}

describe('ausweichziel: Bewegung', () => {
  it('Kugel bleibt im Feld, Tempo gleichmäßig, Zeichen erscheint erst nach dem Bogen', () => {
    let prev: { x: number; y: number } | null = null;
    let shows = 0;
    let signWhileTurning = 0;
    let maxStep = 0;
    let minStep = Infinity;
    const s = run(ausweichziel, {
      seed: 5,
      startLevel: 10,
      onFrame: (ex) => {
        const path = ex.path as { x: number; y: number; turning: boolean; field: { minX: number; maxX: number; minY: number; maxY: number } };
        const f = path.field;
        expect(path.x).toBeGreaterThanOrEqual(f.minX - 1e-6);
        expect(path.x).toBeLessThanOrEqual(f.maxX + 1e-6);
        expect(path.y).toBeGreaterThanOrEqual(f.minY - 1e-6);
        expect(path.y).toBeLessThanOrEqual(f.maxY + 1e-6);
        if (prev) {
          const d = Math.hypot(path.x - prev.x, path.y - prev.y);
          maxStep = Math.max(maxStep, d);
          minStep = Math.min(minStep, d);
        }
        prev = { x: path.x, y: path.y };
        if (ex.phase === 'show') {
          shows++;
          if (path.turning) signWhileTurning++;
        }
      },
    });
    expect(s.result).not.toBeNull();
    expect(shows).toBeGreaterThan(20);
    expect(signWhileTurning).toBe(0);
    // gleichmäßig: der Weg je Bild schwankt nur durch die weiche Tempo-Nachführung
    expect(maxStep).toBeLessThan(minStep * 3 + 1);
  });
});

describe('sprungziel: Sprung und Sichtbarkeit', () => {
  it('Ziel blendet weich aus/ein (kein Helligkeitssprung pro Bild), Zeichen nur bei voller Sichtbarkeit', () => {
    let prevAlpha = 1;
    let worst = 0;
    let minAlphaSeen = 1;
    let showBad = 0;
    let shows = 0;
    const jumps: number[] = [];
    let prevPos: { x: number; y: number } | null = null;
    const s = run(sprungziel, {
      seed: 9,
      startLevel: 14,
      onFrame: (ex) => {
        const a = ex.alpha as number;
        worst = Math.max(worst, Math.abs(a - prevAlpha));
        prevAlpha = a;
        minAlphaSeen = Math.min(minAlphaSeen, a);
        const path = ex.path as { x: number; y: number };
        if (prevPos) {
          const d = Math.hypot(path.x - prevPos.x, path.y - prevPos.y);
          if (d > 100) {
            jumps.push(d);
            // der Ort wechselt nur, wenn das Ziel unsichtbar ist
            expect(a).toBeLessThan(0.05);
          }
        }
        prevPos = { x: path.x, y: path.y };
        if (ex.phase === 'show') {
          shows++;
          if (a < 0.999) showBad++;
        }
      },
    });
    expect(s.result).not.toBeNull();
    expect(minAlphaSeen).toBe(0);
    expect(worst).toBeLessThan(0.45);
    expect(showBad).toBe(0);
    expect(shows).toBeGreaterThan(20);
    expect(jumps.length).toBeGreaterThanOrEqual(10);
  });
});

describe('landepunkt: Ablauf', () => {
  it('Tipp vor dem Verschwinden zählt nicht, Tipp danach schon; Doppel-Tipp wird nur einmal gewertet', () => {
    let now = 0;
    const toasts: string[] = [];
    let result: ExerciseResult | null = null;
    const noop = () => {};
    const ctx: ExerciseContext = {
      mode: 'play',
      autoplay: false,
      quick: true,
      reducedMotion: false,
      startLevel: null,
      lang: 'de',
      texts: landepunkt.texts.de,
      rng: createRng(3),
      sfx: { tick: noop, go: noop, good: noop, bad: noop, tap: noop, done: noop },
      hud: { setProgress: noop, setScore: noop, setLabel: noop, toast: (t) => toasts.push(t), caption: noop },
      ghost: { tap: noop, moveTo: noop, clear: noop, show: noop, hide: noop, idle: true },
      stage: { w: 1180, h: 820, u: 8.2, dpr: 1 },
      fmt: createFormatter('de'),
      now: () => now,
      finish: (r) => {
        result = r;
      },
    };
    const ex = landepunkt.create(ctx);
    ex.start(now);
    const priv = ex as unknown as { phase: string; s: number; th: { T: number; hidden: number; x0: number; dir: number; dist: number }; idx: number; geo: { groundLine: number } };
    const step = () => {
      now += 16.67;
      ex.update(1 / 60, now);
    };
    while (priv.phase !== 'fly' && now < 10000) step();
    expect(priv.phase).toBe('fly');
    // zu früh getippt: ignoriert
    ex.pointerDown?.({ id: 1, x: 500, y: 500, t: now, type: 'touch' });
    expect(priv.phase).toBe('fly');
    while (priv.s < priv.th.T * (1 - priv.th.hidden) + 0.05) step();
    const land = { x: priv.th.x0 + priv.th.dir * priv.th.dist, y: priv.geo.groundLine };
    ex.pointerDown?.({ id: 1, x: land.x + 10, y: land.y, t: now, type: 'touch' });
    expect(priv.phase).toBe('reveal');
    expect(priv.idx).toBe(1);
    expect(toasts[toasts.length - 1]).toMatch(/^✓ /);
    ex.pointerDown?.({ id: 2, x: land.x + 300, y: land.y, t: now, type: 'touch' });
    expect(priv.idx).toBe(1);
    expect(result).toBeNull();
    // nächster Wurf: ein weit danebenliegender Tipp ist ein Fehltreffer (✗ mit Abstand in %)
    while (priv.phase !== 'fly' && now < 60000) step();
    expect(priv.phase).toBe('fly');
    while (priv.s < priv.th.T * (1 - priv.th.hidden) + 0.05) step();
    const land2 = { x: priv.th.x0 + priv.th.dir * priv.th.dist, y: priv.geo.groundLine };
    ex.pointerDown?.({ id: 3, x: land2.x + (land2.x > 590 ? -450 : 450), y: land2.y, t: now, type: 'touch' });
    expect(priv.phase).toBe('reveal');
    expect(toasts[toasts.length - 1]).toMatch(/^✗ \d+,\d %$/);
  });

  it('volle Sitzung meldet mittleren Fehler in %, Treffer und höchste Stufe', () => {
    const s = run(landepunkt, { seed: 4 });
    const keys = s.result!.secondary.map((m) => m.key);
    expect(keys).toContain('meanError');
    expect(keys).toContain('accuracy');
    expect(keys).toContain('maxLevel');
    const mean = s.result!.secondary.find((m) => m.key === 'meanError')!;
    expect(mean.value).toBeLessThan(40);
  });

  it('Toasts des Autoplays enthalten ✓/✗ mit Prozent', () => {
    const s = run(landepunkt, { seed: 6 });
    expect(s.toasts.length).toBeGreaterThan(5);
    for (const t of s.toasts) expect(t).toMatch(/^(✓|✗) \d+,\d %$|^Zu spät$/);
  });
});
