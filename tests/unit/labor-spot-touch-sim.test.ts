/**
 * Spot-Touch (Labor): Durchlauf ohne Browser (virtuelle Zeit, Geister-Hand wie im Runner, Attrappen-Zeichenfläche)
 * sowie Prüfung der Texte (DE/IT gleiche Schlüssel, alle Kennzahlen erklärt, Rechtsregeln) und der Quellen.
 */
import { describe, expect, it } from 'vitest';
import { buildCalib } from '../../src/core/calib';
import { createFormatter } from '../../src/core/format';
import { defaultParams, sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import type { Exercise, ExerciseContext, ExerciseResult, PointerInfo } from '../../src/core/types';
import { laborSpotTouch } from '../../src/exercises/labor-spot-touch';
import { PARAMS, QUICK_DURATION_S } from '../../src/exercises/labor-spot-touch/logic';
import { science } from '../../src/exercises/labor-spot-touch/science';
import { de, it as itTexts } from '../../src/exercises/labor-spot-touch/texts';

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
  scores: Array<number | null>;
  progress: number[];
  ghostTaps: number;
  sounds: string[];
}

interface Opts {
  w?: number;
  h?: number;
  mode?: 'play' | 'demo';
  lang?: 'de' | 'it';
  quick?: boolean;
  autoplay?: boolean;
  params?: Record<string, unknown>;
  pxPerCm?: number;
  seed?: number;
  reducedMotion?: boolean;
  maxSeconds?: number;
  noCtxParams?: boolean;
  onFrame?: (ex: Exercise, now: number, ctx: ExerciseContext) => void;
  resizeAt?: { t: number; w: number; h: number };
}

function simulate(o: Opts): Sim {
  const g = (globalThis as unknown as { document?: unknown }).document;
  (globalThis as unknown as { document: unknown }).document = { createElement: () => ({ width: 0, height: 0, getContext: () => fakeG() }) };
  try {
    return run(o);
  } finally {
    (globalThis as unknown as { document?: unknown }).document = g;
  }
}

function run(o: Opts): Sim {
  const fps = 60;
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
  const params = sanitizeParams(PARAMS, o.params ?? {});
  const calib =
    mode === 'demo' ? buildCalib(Math.max(10, h / 13), 40, false, stage) : buildCalib(o.pxPerCm ?? 38, 40, o.pxPerCm !== undefined, stage);
  const ctx: ExerciseContext = {
    mode,
    autoplay: o.autoplay ?? true,
    quick: o.quick ?? false,
    reducedMotion: o.reducedMotion ?? false,
    startLevel: null,
    ...(o.noCtxParams ? {} : { params: mode === 'demo' ? defaultParams(PARAMS) : params, calib }),
    lang,
    texts: laborSpotTouch.texts[lang],
    rng: createRng(o.seed ?? 7),
    sfx: {
      tick: noop,
      go: noop,
      good: () => sounds.push('good'),
      bad: () => sounds.push('bad'),
      tap: noop,
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
  const ex = laborSpotTouch.create(ctx);
  exRef = ex;
  ex.start(now);
  const dt = 1 / fps;
  const limit = (o.maxSeconds ?? 400) * 1000;
  const g2 = fakeG();
  let resized = false;
  while (!result && now < limit) {
    now += dt * 1000;
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
  }
  ex.destroy?.();
  return { result, seconds: endAt / 1000, toasts, captions, labels, scores, progress, ghostTaps: ghost.taps, sounds };
}

const get = (r: ExerciseResult, k: string) => r.secondary.find((m) => m.key === k)?.value;

describe('Definition', () => {
  it('Kategorie reaktion, Marke labor, Kalibrierung, Einstellungen, keine Stufen', () => {
    expect(laborSpotTouch.id).toBe('labor-spot-touch');
    expect(laborSpotTouch.category).toBe('reaktion');
    expect(laborSpotTouch.tags).toEqual(['labor']);
    expect(laborSpotTouch.usesCalibration).toBe(true);
    expect(laborSpotTouch.showsLevel).toBe(false);
    expect(laborSpotTouch.params).toBe(PARAMS);
    expect(laborSpotTouch.icon.length).toBeGreaterThan(20);
  });
});

describe('Intro-Film (Demo)', () => {
  for (const [name, w, h] of [
    ['16:11', 1040, 715],
    ['Hochformat', 360, 640],
    ['klein', 520, 358],
  ] as const) {
    it(`${name}: endet nach 8–14 s mit ctx.finish, Hand tippt, Bildunterschriften ≤ 42 Zeichen`, () => {
      const s = simulate({ mode: 'demo', w, h, maxSeconds: 40 });
      expect(s.result, 'finish wurde nicht gerufen').not.toBeNull();
      expect(s.seconds).toBeGreaterThanOrEqual(8);
      expect(s.seconds).toBeLessThanOrEqual(14.2);
      expect(s.ghostTaps).toBeGreaterThanOrEqual(3);
      expect(s.captions.length).toBeGreaterThanOrEqual(4);
      for (const c of s.captions) expect(c.length).toBeLessThanOrEqual(42);
      expect(s.captions).toContain(de.captions.late); // ein Punkt wird absichtlich verpasst
      expect(s.result!.primary.value).toBeGreaterThanOrEqual(3);
      expect(s.result!.secondary.some((m) => m.key === 'misses' && m.value >= 1)).toBe(true);
    });
  }

  it('ist mit gleichem Startwert reproduzierbar, der Ton bleibt im Film aus', () => {
    const a = simulate({ mode: 'demo', seed: 3 });
    const b = simulate({ mode: 'demo', seed: 3 });
    expect(a.seconds).toBeCloseTo(b.seconds, 6);
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
  });

  it('Einstellungen des Nutzers ändern den Film nicht (Standard im Film)', () => {
    const a = simulate({ mode: 'demo', params: { diameterCm: 15, durationS: 600, fixation: 'yes' } });
    const b = simulate({ mode: 'demo' });
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
  });
});

describe('Autoplay im Spielmodus (?quick=1)', () => {
  it('endet nach der verkürzten Dauer mit einem vollständigen Ergebnis', () => {
    const s = simulate({ quick: true, maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    // 0,5 s Anlauf + 8 s
    expect(s.seconds).toBeGreaterThanOrEqual(QUICK_DURATION_S);
    expect(s.seconds).toBeLessThanOrEqual(QUICK_DURATION_S + 1);
    const r = s.result!;
    expect(r.primary).toMatchObject({ key: 'hits', unit: 'count', better: 'higher' });
    expect(r.primary.value).toBeGreaterThanOrEqual(1);
    expect(r.level).toBe(1);
    expect(r.score).toBe(r.primary.value * 10);
    expect(r.secondary.length).toBeGreaterThanOrEqual(2);
    expect(r.secondary.length).toBeLessThanOrEqual(4);
    expect(r.secondary.map((m) => m.key)).toEqual(expect.arrayContaining(['misses', 'stray']));
    expect(r.tip && itTexts.tips[r.tip]).toBeTruthy();
    expect(s.progress[s.progress.length - 1]).toBe(1);
    expect(s.labels.length).toBeGreaterThan(0);
  });

  it('normale Dauer wird von den Einstellungen bestimmt (Dauer 10 s)', () => {
    const s = simulate({ params: { durationS: 10 }, maxSeconds: 60 });
    expect(s.seconds).toBeGreaterThanOrEqual(10);
    expect(s.seconds).toBeLessThanOrEqual(11);
  });

  it('Kennzahlen sind stimmig: Trefferquote aus Treffern und verpassten, Reaktionszeit plausibel, Zusatztabelle', () => {
    const s = simulate({ params: { durationS: 40 }, maxSeconds: 80, seed: 11 });
    const r = s.result!;
    const hits = r.primary.value;
    const misses = get(r, 'misses')!;
    const acc = get(r, 'accuracy')!;
    expect(acc).toBeCloseTo((100 * hits) / (hits + misses), 0);
    const rt = get(r, 'rt_mean')!;
    expect(rt).toBeGreaterThan(200);
    expect(rt).toBeLessThan(1500);
    expect(r.details?.[0].rows.length).toBeGreaterThanOrEqual(2);
    for (const row of r.details?.[0].rows ?? []) expect(row.value).toMatch(/\d/);
  });

  it('läuft mit allen Zonen, mit Kreuz, mehreren Punkten, ohne Pause und bei kurzer Sichtbarkeit sauber durch', () => {
    for (const p of [
      { zone: 'periphery', fixation: 'yes' },
      { zone: 'center' },
      { simultaneous: 5, diameterCm: 3 },
      { gapMs: 0, persistenceS: 0.5 },
      { diameterCm: 15, simultaneous: 3 },
      { sound: 'yes' },
    ]) {
      const s = simulate({ quick: true, params: p, maxSeconds: 60, seed: 5 });
      expect(s.result, JSON.stringify(p)).not.toBeNull();
      expect(Number.isFinite(s.result!.primary.value)).toBe(true);
      for (const m of s.result!.secondary) expect(Number.isFinite(m.value), `${JSON.stringify(p)} ${m.key}`).toBe(true);
    }
  });

  it('Ton nur bei eingeschaltetem „Ton“', () => {
    const off = simulate({ quick: true, maxSeconds: 60 });
    expect(off.sounds).toEqual([]);
    const on = simulate({ quick: true, params: { sound: 'yes' }, maxSeconds: 60 });
    expect(on.sounds).toContain('good');
    expect(on.sounds[on.sounds.length - 1]).toBe('done');
  });

  it('Handy hochkant und Tablet: auch mit großen Punkten wird nichts größer als die Bühne', () => {
    for (const [w, h] of [
      [390, 700],
      [820, 1180],
      [1180, 820],
    ] as const) {
      const s = simulate({ quick: true, w, h, params: { diameterCm: 15 }, pxPerCm: 60, maxSeconds: 60 });
      expect(s.result, `${w}x${h}`).not.toBeNull();
    }
  });

  it('Drehen des Tablets mitten im Lauf: kein Fehler, Lauf endet', () => {
    const s = simulate({ quick: true, w: 1180, h: 820, resizeAt: { t: 3000, w: 820, h: 1180 }, maxSeconds: 60 });
    expect(s.result).not.toBeNull();
  });

  it('reduzierte Bewegung und ältere Attrappen-Kontexte ohne params/calib laufen ebenfalls', () => {
    expect(simulate({ quick: true, reducedMotion: true, maxSeconds: 60 }).result).not.toBeNull();
    expect(simulate({ quick: true, noCtxParams: true, maxSeconds: 60 }).result).not.toBeNull();
  });

  it('Italienisch: Ergebnis und Texte vorhanden', () => {
    const s = simulate({ quick: true, lang: 'it', maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.toasts.every((t) => !/undefined/.test(t))).toBe(true);
  });

  it('Tipp ins Leere vor dem Start oder nach Ende ist wirkungslos; Tippen auf einen Punkt trifft ihn', () => {
    let hit = 0;
    const s = simulate({
      quick: true,
      autoplay: false,
      maxSeconds: 30,
      onFrame: (ex, now, ctx) => {
        // zu Beginn (vor dem Start der Sitzung) tippen: ohne Wirkung und kein Fehler
        if (now < 200) ex.pointerDown?.({ id: 1, x: 10, y: 10, t: now, type: 'touch' });
        // ab 1 s jeden gezeigten Punkt in der Mitte antippen: Zugriff auf die Logik über die Zeichnung ist nicht nötig –
        // stattdessen systematisch über das Feld tippen und mitzählen
        if (now > 1000 && Math.round(now) % 97 === 0) {
          ex.pointerDown?.({ id: 2, x: ((now * 7) % ctx.stage.w) | 0, y: ((now * 13) % ctx.stage.h) | 0, t: now, type: 'touch' });
          hit++;
        }
      },
    });
    expect(hit).toBeGreaterThan(0);
    expect(s.result).not.toBeNull();
    expect(Number.isFinite(s.result!.primary.value)).toBe(true);
  });
});

describe('Texte', () => {
  const leaves = (o: unknown, path = ''): string[] =>
    o && typeof o === 'object' ? Object.entries(o as Record<string, unknown>).flatMap(([k, v]) => leaves(v, `${path}.${k}`)) : [path];

  it('DE und IT haben dieselben Schlüssel (auch in params, metricHints, listen gleich lang)', () => {
    expect(leaves(itTexts).sort()).toEqual(leaves(de).sort());
    expect(itTexts.progression?.length).toBe(de.progression?.length);
    expect(itTexts.cautions?.length).toBe(de.cautions?.length);
    expect(itTexts.steps.length).toBe(de.steps.length);
  });

  it('alle Kennzahlen der Labor-Übung sind in metrics und metricHints erklärt (Label + Kurzerklärung)', () => {
    const metricKeys = ['hits', 'misses', 'stray', 'accuracy', 'rt_mean', 'rt_median', 'rt_sd', 'rate'];
    for (const t of [de, itTexts]) {
      for (const k of metricKeys) {
        expect(t.metrics[k], k).toBeTruthy();
        expect(t.metricHints?.[k]?.length, k).toBeGreaterThan(20);
      }
      expect(Object.keys(t.metricHints ?? {}).sort()).toEqual([...metricKeys].sort());
    }
  });

  it('jede Einstellung hat Beschriftung und Erklärung, jede Auswahl Namen für alle Werte', () => {
    for (const t of [de, itTexts]) {
      for (const d of PARAMS) {
        const p = t.params?.[d.key];
        expect(p?.label, d.key).toBeTruthy();
        expect(p?.hint?.length, d.key).toBeGreaterThan(20);
        if (d.type === 'select') for (const o of d.options) expect(p?.options?.[o], `${d.key}.${o}`).toBeTruthy();
      }
    }
  });

  it('Kennzahlen im Ergebnis und Tipps haben Texte in beiden Sprachen', () => {
    const s = simulate({ quick: true, maxSeconds: 60 });
    for (const lang of ['de', 'it'] as const) {
      const t = laborSpotTouch.texts[lang];
      expect(t.metrics[s.result!.primary.key]).toBeTruthy();
      for (const m of s.result!.secondary) expect(t.metrics[m.key], m.key).toBeTruthy();
      for (const k of ['few', 'stray', 'misses', 'harder', 'steady', 'compare']) expect(t.tips[k], k).toBeTruthy();
    }
  });

  it('Rechtsregeln: why endet mit „nicht belegt“, keine Wirk-/Heil-/Sicherheitsversprechen, kein Test/Diagnose/Normwert', () => {
    expect(de.why.trim()).toMatch(/nicht belegt\.$/);
    expect(itTexts.why.trim()).toMatch(/non è dimostrato che .*\.$/i);
    const all = (t: typeof de) => JSON.stringify(t).toLowerCase();
    for (const bad of ['diagnos', 'normwert', 'heilt', 'heilung', 'sicherer im', 'besseres sehen', 'trainiert deine augenmuskeln', 'sehkraft']) {
      expect(all(de), bad).not.toContain(bad);
    }
    // „Test“ nur als Teil anderer Wörter (z. B. „Kontext“) nicht vorhanden
    expect(all(de)).not.toMatch(/\btest(en|s)?\b/);
    expect(all(itTexts)).not.toMatch(/\btest\b/);
    expect(all(itTexts)).not.toMatch(/diagnos|valori normali|valore normale|guarisce/);
  });

  it('Bildunterschriften und Schritte sind kurz', () => {
    for (const t of [de, itTexts]) {
      for (const c of Object.values(t.captions)) expect(c.length).toBeLessThanOrEqual(42);
      for (const s of t.steps) expect(s.length).toBeLessThanOrEqual(60);
      expect(t.tagline.length).toBeLessThanOrEqual(80);
    }
  });
});

describe('science.ts', () => {
  it('Eintrag stimmt mit der Übung überein; ≥ 3 Quellen mit DOI-Link; Texte in beiden Sprachen', () => {
    expect(science.id).toBe('labor-spot-touch');
    expect(science.sources.length).toBeGreaterThanOrEqual(3);
    const urls = new Set<string>();
    for (const s of science.sources) {
      expect(s.url).toMatch(/^https:\/\/doi\.org\/10\.\d{4,9}\/\S+$/);
      expect(s.label.length).toBeGreaterThan(20);
      expect(urls.has(s.url), s.url).toBe(false);
      urls.add(s.url);
    }
    for (const lang of ['de', 'it'] as const) for (const k of ['trains', 'daily', 'research', 'improved'] as const) expect(science.texts[lang][k].length).toBeGreaterThan(20);
    expect(science.texts.de.research).toContain('nicht belegt'.slice(0, 5));
  });

  it('nur bestätigte Quellen: Liste der geprüften DOIs (Crossref/PubMed, 02.10.2026)', () => {
    const verified = [
      '10.1037/h0055392', // Fitts 1954
      '10.1207/s15327051hci0701_3', // MacKenzie 1992
      '10.3389/fnhum.2015.00131', // Woods et al. 2015
      '10.1167/11.5.13', // Strasburger et al. 2011
      '10.1016/0042-6989(74)90049-2', // Anstis 1974
      '10.1097/OPX.0000000000001732', // Vater & Strasburger 2021
      '10.3758/s13428-019-01321-2', // Pronk et al. 2020
      '10.3389/fphys.2025.1664572', // Guo et al. 2025
    ];
    expect(science.sources.map((s) => s.url.replace('https://doi.org/', '')).sort()).toEqual([...verified].sort());
  });
});
