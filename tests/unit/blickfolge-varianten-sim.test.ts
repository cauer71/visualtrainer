/**
 * Durchlauf-Tests (ohne Browser) für „Tempo-Wechsel“, „Nachzieh-Spur“, „Höhenwechsel-Bahn“,
 * „Richtungschaos“ und „Dunkelphasen“: Die Übungen laufen gegen einen Attrappen-Kontext mit virtueller
 * Zeit (Autoplay bzw. Intro-Film), zeichnen gegen eine Attrappen-Zeichenfläche und müssen sauber mit
 * `ctx.finish` enden. Dazu Bewegungs- und Sicherheitsprüfungen je Übung.
 */
import { describe, expect, it, vi } from 'vitest';
import { createRng } from '../../src/core/rng';
import { createFormatter } from '../../src/core/format';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, PointerInfo } from '../../src/core/types';
import { tempoWechsel } from '../../src/exercises/tempo-wechsel/index';
import { nachziehSpur } from '../../src/exercises/nachzieh-spur/index';
import { hoehenwechselBahn } from '../../src/exercises/hoehenwechsel-bahn/index';
import { richtungschaos } from '../../src/exercises/richtungschaos/index';
import { dunkelphasen } from '../../src/exercises/dunkelphasen/index';
import { science as sTempo } from '../../src/exercises/tempo-wechsel/science';
import { science as sNachzieh } from '../../src/exercises/nachzieh-spur/science';
import { science as sHoehen } from '../../src/exercises/hoehenwechsel-bahn/science';
import { science as sChaos } from '../../src/exercises/richtungschaos/science';
import { science as sDunkel } from '../../src/exercises/dunkelphasen/science';
import { CALM_MAX_U } from '../../src/exercises/tempo-wechsel/logic';
import { MAX_DARK_RATE_HZ, MIN_FADE_MS, MIN_PERIOD_MS } from '../../src/exercises/dunkelphasen/logic';
import { MAX_TRACK_WIDTH } from '../../src/exercises/_shared/pursuit-logic';

vi.stubGlobal(
  'Path2D',
  class {
    moveTo(): void {}
    lineTo(): void {}
  },
);

vi.mock('../../src/core/draw', async (orig) => {
  const real = await orig<typeof import('../../src/core/draw')>();
  return { ...real, background: () => {}, glow: () => {} };
});

/** Zeichenfläche, die jeden Aufruf schluckt und die gesetzten Farben/Breiten mitschreibt */
function fakeCanvas(log?: { strokeStyles: string[] }): CanvasRenderingContext2D {
  const store: Record<string, unknown> = {};
  return new Proxy(store, {
    get: (t, k: string) => (k in t ? t[k] : () => undefined),
    set: (t, k: string, v) => {
      if (k === 'strokeStyle' && log && typeof v === 'string') log.strokeStyles.push(v);
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
  canvasLog?: { strokeStyles: string[] };
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
  const ctx: ExerciseContext = {
    mode: o.mode ?? 'play',
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
  const g = fakeCanvas(o.canvasLog);
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
  ['tempo-wechsel', tempoWechsel],
  ['nachzieh-spur', nachziehSpur],
  ['hoehenwechsel-bahn', hoehenwechselBahn],
  ['richtungschaos', richtungschaos],
  ['dunkelphasen', dunkelphasen],
];

function checkResult(r: ExerciseResult): void {
  expect(r.primary.key).toBe('level');
  expect(r.primary.unit).toBe('level');
  expect(r.primary.better).toBe('higher');
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
    for (const k of ['follow', 'where']) expect(de.captions[k]).toBeTruthy();
    for (const k of ['level', 'accuracy', 'maxLevel', 'correct']) expect(de.metrics[k]).toBeTruthy();
    for (const k of ['eyes', 'decide', 'great']) expect(de.tips[k]).toBeTruthy();
    for (const k of ['late', 'level']) expect(de.feedback[k]).toBeTruthy();
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
    expect(itT.why).toContain('non è dimostrato');
    expect(de.why).toContain('nicht gemessen');
    expect(itT.why).toContain('Non viene misurato');
  });

  it('Texte enthalten keine Wirk-, Sicherheits- oder Testversprechen', () => {
    const all = JSON.stringify(def.texts).toLowerCase();
    for (const bad of ['trainiert deine', 'besser sehen', 'besseres sehen', 'sicherer im verkehr', 'diagnose', 'normwert', 'heilt', 'sehkraft', 'muskel', 'allenamento dei muscoli']) {
      expect(all).not.toContain(bad);
    }
    expect(all).not.toMatch(/\btest\b/);
    expect(all).not.toMatch(/schuss|schoss|geschoss|bedrohung|kill/);
  });
});

describe('Wissens-Einträge', () => {
  it.each([
    ['tempo-wechsel', sTempo],
    ['nachzieh-spur', sNachzieh],
    ['hoehenwechsel-bahn', sHoehen],
    ['richtungschaos', sChaos],
    ['dunkelphasen', sDunkel],
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

describe.each(DEFS)('%s: Intro-Film', (_id, def) => {
  it('endet mit finish nach 8–14 s, mit Unterschriften und Geister-Tipps', () => {
    for (const [w, h] of [
      [1100, 770],
      [820, 1180],
    ]) {
      const s = run(def, { mode: 'demo', w, h });
      require('node:fs').appendFileSync('/tmp/claude-0/-home-user-visualtrainer/5dc0d85d-37c9-5d9e-a652-b93a4af9a804/scratchpad/demo.log', `${_id} ${w}x${h} ${s.seconds.toFixed(1)}\n`);
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
      expect(s.seconds).toBeGreaterThan(30);
      expect(s.seconds).toBeLessThan(120);
    }
  });

  it('läuft auch bei 120 Hz, im Hochformat, mit gespeicherter Startstufe und reduzierter Bewegung', () => {
    for (const o of [
      { fps: 120, quick: true },
      { w: 820, h: 1180, quick: true },
      { w: 390, h: 740, quick: true },
      { startLevel: 12, quick: true },
      { startLevel: 20, quick: true },
      { reduced: true, quick: true },
    ] as Opts[]) {
      const s = run(def, o);
      expect(s.result).not.toBeNull();
      checkResult(s.result!);
    }
  });
});

type Pathish = { x: number; y: number; theta: number; turning: boolean; field: { minX: number; maxX: number; minY: number; maxY: number } };

describe('tempo-wechsel: Zeichen nur bei ruhigem Tempo', () => {
  it('beim Zeichen ist die Tempo-Rampe fertig, das Ziel dreht nicht und läuft nicht zu schnell', () => {
    let shows = 0;
    let bad = 0;
    let minFactor = Infinity;
    let maxFactor = 0;
    for (const startLevel of [1, 10, 20]) {
      run(tempoWechsel, {
        seed: 11 + startLevel,
        startLevel,
        onFrame: (ex) => {
          const path = ex.path as Pathish;
          const ramp = ex.ramp as { active: boolean; value: number };
          minFactor = Math.min(minFactor, ramp.value);
          maxFactor = Math.max(maxFactor, ramp.value);
          if (ex.phase === 'show') {
            shows++;
            const speedU = (ex.speedPx as number) / 8.2;
            if (ramp.active || path.turning || speedU > CALM_MAX_U + 0.5) bad++;
          }
        },
      });
    }
    expect(shows).toBeGreaterThan(30);
    expect(bad).toBe(0);
    // das Tempo wechselt wirklich deutlich
    expect(maxFactor / minFactor).toBeGreaterThan(1.8);
  });

  it('Tempo und Ort springen nie: Weg je Bild ändert sich stetig', () => {
    let prev: { x: number; y: number } | null = null;
    let prevD = 0;
    let worstJerk = 0;
    run(tempoWechsel, {
      seed: 5,
      startLevel: 20,
      onFrame: (ex) => {
        const p = ex.path as Pathish;
        if (prev) {
          const d = Math.hypot(p.x - prev.x, p.y - prev.y);
          if (prevD > 0) worstJerk = Math.max(worstJerk, Math.abs(d - prevD));
          prevD = d;
        }
        prev = { x: p.x, y: p.y };
        expect(p.x).toBeGreaterThanOrEqual(p.field.minX - 1e-6);
        expect(p.x).toBeLessThanOrEqual(p.field.maxX + 1e-6);
        expect(p.y).toBeGreaterThanOrEqual(p.field.minY - 1e-6);
        expect(p.y).toBeLessThanOrEqual(p.field.maxY + 1e-6);
      },
    });
    // Schrittweite je Bild ändert sich um höchstens ≈ 1,5 px (Tempo-Rampe ≤ 130 u/s²)
    expect(worstJerk).toBeLessThan(2);
  });
});

describe('nachzieh-spur: Spur hinter dem Kopf, Zeichen im Kopf', () => {
  it('zeichnet eine verblassende Spur (Deckkraft fällt zum Ende) und bleibt im Feld', () => {
    const log = { strokeStyles: [] as string[] };
    let shows = 0;
    run(nachziehSpur, {
      seed: 3,
      startLevel: 12,
      canvasLog: log,
      onFrame: (ex) => {
        const p = ex.path as Pathish;
        expect(p.x).toBeGreaterThanOrEqual(p.field.minX - 1e-6);
        expect(p.x).toBeLessThanOrEqual(p.field.maxX + 1e-6);
        if (ex.phase === 'show') shows++;
      },
    });
    expect(shows).toBeGreaterThan(20);
    const alphas = log.strokeStyles
      .map((s) => /^rgba\(214,232,255,([0-9.]+)\)$/.exec(s))
      .filter((m): m is RegExpExecArray => !!m)
      .map((m) => Number(m[1]));
    expect(alphas.length).toBeGreaterThan(50);
    expect(Math.max(...alphas)).toBeLessThanOrEqual(0.61);
    expect(Math.min(...alphas)).toBeGreaterThanOrEqual(0);
    // es gibt helle und fast verschwundene Abschnitte
    expect(Math.min(...alphas)).toBeLessThan(0.1);
    expect(Math.max(...alphas)).toBeGreaterThan(0.3);
  });
});

describe('hoehenwechsel-bahn: Treppenbahn', () => {
  it('Bahn höchstens 60 % der Bühnenbreite, Zeichen nur weit von den Wendepunkten, Höhe wächst mit der Stufe', () => {
    const heights: number[] = [];
    for (const startLevel of [1, 20]) {
      let shows = 0;
      let nearCorner = 0;
      let minX = Infinity;
      let maxX = -Infinity;
      let height = 0;
      run(hoehenwechselBahn, {
        seed: 4,
        startLevel,
        onFrame: (ex) => {
          const tr = ex.track as { pos: { x: number }; trackWidth: number; height: number; distances(): { ahead: number; behind: number } };
          minX = Math.min(minX, tr.pos.x);
          maxX = Math.max(maxX, tr.pos.x);
          height = tr.height;
          if (ex.phase === 'show') {
            shows++;
            const d = tr.distances();
            if (Math.min(d.ahead, d.behind) < 20) nearCorner++;
          }
        },
      });
      expect(shows).toBeGreaterThan(20);
      expect(nearCorner).toBe(0);
      expect(maxX - minX).toBeLessThanOrEqual(MAX_TRACK_WIDTH * 1180 + 1);
      heights.push(height);
    }
    expect(heights[1]).toBeGreaterThan(heights[0] * 1.5);
  });
});

describe('richtungschaos: stets glatt', () => {
  it('Richtung ändert sich stetig (kein Haken), Ziel bleibt im Feld, Zeichen erscheint', () => {
    for (const startLevel of [1, 10, 20]) {
      let prevTheta: number | null = null;
      let prevDelta = 0;
      let maxDelta = 0;
      let maxSecond = 0;
      let shows = 0;
      let turned = 0;
      const wrap = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));
      run(richtungschaos, {
        seed: 21,
        startLevel,
        onFrame: (ex) => {
          const p = ex.path as Pathish;
          expect(p.x).toBeGreaterThanOrEqual(p.field.minX - 1e-6);
          expect(p.x).toBeLessThanOrEqual(p.field.maxX + 1e-6);
          expect(p.y).toBeGreaterThanOrEqual(p.field.minY - 1e-6);
          expect(p.y).toBeLessThanOrEqual(p.field.maxY + 1e-6);
          if (prevTheta !== null) {
            const d = wrap(p.theta - prevTheta);
            maxDelta = Math.max(maxDelta, Math.abs(d));
            maxSecond = Math.max(maxSecond, Math.abs(d - prevDelta));
            turned += Math.abs(d);
            prevDelta = d;
          }
          prevTheta = p.theta;
          if (ex.phase === 'show') shows++;
        },
      });
      expect(shows).toBeGreaterThan(15);
      // je Bild (60 Hz) höchstens ≈ 6° Richtungsänderung und ≈ 3° Änderung davon – kein Haken
      expect(maxDelta).toBeLessThan(0.11);
      expect(maxSecond).toBeLessThan(0.05);
      expect(turned).toBeGreaterThan(3);
    }
  });
});

describe('dunkelphasen: sichere Fassung (kein Blinken)', () => {
  it('Dunkelphasen höchstens alle 2 s, jede Blende ≥ 200 ms, Helligkeit stetig, Zeichen nur bei voller Sichtbarkeit', () => {
    let shows = 0;
    let showBad = 0;
    let minAlpha = 1;
    for (const [startLevel, fps] of [
      [1, 60],
      [10, 60],
      [20, 60],
      [20, 120],
      [20, 30],
    ] as const) {
      let prevA = 1;
      let prevT = 0;
      let darkStarts: number[] = [];
      let fadeStart = -1;
      let worstSlope = 0;
      let inDark = false;
      run(dunkelphasen, {
        seed: 31 + startLevel,
        startLevel,
        fps,
        onFrame: (ex, t) => {
          const a = ex.alpha as number;
          minAlpha = Math.min(minAlpha, a);
          if (t > 0 && t > prevT) worstSlope = Math.max(worstSlope, Math.abs(a - prevA) / (t - prevT));
          if (!inDark && a < 0.999 && prevA >= 0.999) {
            darkStarts.push(t);
            inDark = true;
            fadeStart = t;
          }
          if (inDark && a >= 0.999) {
            inDark = false;
            // Aus- plus Einblenden dauern zusammen mindestens 2 · 200 ms
            expect(t - fadeStart).toBeGreaterThanOrEqual(2 * MIN_FADE_MS - 1000 / fps);
          }
          prevA = a;
          prevT = t;
          if (ex.phase === 'show') {
            shows++;
            if (a < 0.999) showBad++;
          }
        },
      });
      expect(darkStarts.length).toBeGreaterThanOrEqual(8);
      for (let i = 1; i < darkStarts.length; i++) {
        // Abstand der Anfänge ≥ 2 s (≤ 0,5 Hz), mit Toleranz eines Bildes
        expect(darkStarts[i] - darkStarts[i - 1]).toBeGreaterThanOrEqual(MIN_PERIOD_MS - 1000 / fps - 1);
      }
      const rate = (darkStarts.length - 1) / ((darkStarts[darkStarts.length - 1] - darkStarts[0]) / 1000);
      expect(rate).toBeLessThanOrEqual(MAX_DARK_RATE_HZ + 1e-9);
      // größte Steigung der Helligkeit: halbe Kosinuswelle über ≥ 200 ms → π/(2·200) je ms
      expect(worstSlope).toBeLessThanOrEqual(Math.PI / (2 * MIN_FADE_MS) + 1e-4);
      darkStarts = [];
    }
    expect(minAlpha).toBe(0);
    expect(shows).toBeGreaterThan(40);
    expect(showBad).toBe(0);
  });

  it('das Ziel läuft im Dunkeln unsichtbar weiter und bleibt geradeaus (Vorhersage)', () => {
    let prev: { x: number; y: number; t: number } | null = null;
    let darkFrames = 0;
    let movedInDark = 0;
    let turnedInDark = 0;
    run(dunkelphasen, {
      seed: 8,
      startLevel: 8,
      onFrame: (ex, t) => {
        const p = ex.path as Pathish;
        const a = ex.alpha as number;
        if (prev && a < 0.05) {
          darkFrames++;
          if (Math.hypot(p.x - prev.x, p.y - prev.y) > 0.5) movedInDark++;
          if (p.turning) turnedInDark++;
        }
        prev = { x: p.x, y: p.y, t };
      },
    });
    expect(darkFrames).toBeGreaterThan(60);
    expect(movedInDark / darkFrames).toBeGreaterThan(0.95);
    // weiche Bögen zur freien Seite gibt es nur VOR der Dunkelphase
    expect(turnedInDark / darkFrames).toBeLessThan(0.15);
  });

  it('Warnhinweis „flicker“ gesetzt; why nennt die Begrenzung; andere Übungen haben keinen Hinweis', () => {
    expect(dunkelphasen.warning).toBe('flicker');
    expect(dunkelphasen.texts.de.why).toMatch(/0,2 Sekunden/);
    expect(dunkelphasen.texts.de.why).toMatch(/alle 2 Sekunden/);
    expect(dunkelphasen.texts.it.why).toMatch(/0,2 secondi/);
    expect(dunkelphasen.texts.it.why).toMatch(/ogni 2 secondi/);
    for (const d of [tempoWechsel, nachziehSpur, hoehenwechselBahn, richtungschaos]) expect(d.warning).toBeUndefined();
  });
});
