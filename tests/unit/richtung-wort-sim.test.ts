/**
 * Richtung & Wort: Durchlauf ohne Browser gegen einen Attrappen-Kontext und eine Attrappen-Zeichenfläche.
 * Intro-Film und Spielmodus (Autoplay) müssen sauber mit `ctx.finish` enden; die Zeit läuft über die
 * übergebene virtuelle Uhr, der Zufall nur über `ctx.rng`.
 */
import { describe, expect, it, vi } from 'vitest';
import { createFormatter } from '../../src/core/format';
import { createRng } from '../../src/core/rng';
import type { ExerciseContext, ExerciseResult, PointerInfo } from '../../src/core/types';
import { richtungWort } from '../../src/exercises/richtung-wort/index';
import { geometry } from '../../src/exercises/richtung-wort/logic';
import { science } from '../../src/exercises/richtung-wort/science';
import { de, it as itTexts } from '../../src/exercises/richtung-wort/texts';

vi.mock('../../src/core/draw', async (orig) => {
  const real = await orig<typeof import('../../src/core/draw')>();
  return { ...real, background: () => {} };
});

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

interface RunOpts {
  mode: 'play' | 'demo';
  w: number;
  h: number;
  quick?: boolean;
  seed?: number;
  startLevel?: number | null;
  autoplay?: boolean;
  lang?: 'de' | 'it';
  /** eigener Spieler: bekommt Zeit und gibt Tipps (x, y) oder null zurück */
  driver?: (now: number) => { x: number; y: number } | null;
  maxMs?: number;
}

function run(o: RunOpts) {
  let now = 0;
  let result: ExerciseResult | null = null;
  let endAt = 0;
  const taps: { at: number; x: number; y: number }[] = [];
  const captions: string[] = [];
  const labels: string[] = [];
  const scores: Array<number | null> = [];
  let sfxGood = 0;
  let sfxBad = 0;
  const noop = () => {};
  const lang = o.lang ?? 'de';
  const stage = { w: o.w, h: o.h, u: Math.min(o.w, o.h) / 100, dpr: 1 };
  const ctx: ExerciseContext = {
    mode: o.mode,
    autoplay: o.autoplay ?? true,
    quick: o.quick ?? false,
    reducedMotion: false,
    startLevel: o.startLevel ?? null,
    lang,
    texts: richtungWort.texts[lang],
    rng: createRng(o.seed ?? 11),
    sfx: { tick: noop, go: noop, good: () => sfxGood++, bad: () => sfxBad++, tap: noop, done: noop },
    hud: {
      setProgress: noop,
      setScore: (v) => scores.push(v),
      setLabel: (t) => {
        if (t) labels.push(t);
      },
      toast: noop,
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
    stage,
    fmt: createFormatter(lang),
    now: () => now,
    finish: (r) => {
      result = r;
      endAt = now;
    },
  };
  const ex = richtungWort.create(ctx);
  const g = fakeCanvas();
  ex.start(now);
  let frames = 0;
  while (!result && now < (o.maxMs ?? 400000)) {
    now += 1000 / 60;
    for (let i = taps.length - 1; i >= 0; i--) {
      if (taps[i].at <= now) {
        const tp = taps.splice(i, 1)[0];
        const p: PointerInfo = { id: 1, x: tp.x, y: tp.y, t: now, type: 'ghost' };
        ex.pointerDown?.(p);
      }
    }
    const d = o.driver?.(now);
    if (d) ex.pointerDown?.({ id: 2, x: d.x, y: d.y, t: now, type: 'touch' });
    ex.update(1 / 60, now);
    ex.render(g, now);
    if (frames++ === 400) ex.resize?.(o.h, o.w);
  }
  ex.destroy?.();
  return { result: result as ExerciseResult | null, seconds: endAt / 1000, captions, labels, scores, sfxGood, sfxBad };
}

describe('richtung-wort: Definition', () => {
  it('Kennung, Kategorie, Farbe, Symbol, Stufenanzeige', () => {
    expect(richtungWort.id).toBe('richtung-wort');
    expect(richtungWort.category).toBe('konzentration');
    expect(richtungWort.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(richtungWort.icon).toContain('<');
    expect(richtungWort.showsLevel).toBe(true);
    expect(richtungWort.warning).toBeUndefined();
  });

  it('vorläufiger Wissenschaftseintrag: ≥ 3 Quellen (https), Texte de/it, „nicht belegt“', () => {
    expect(science.id).toBe('richtung-wort');
    expect(science.sources.length).toBeGreaterThanOrEqual(3);
    for (const s of science.sources) expect(s.url).toMatch(/^https:\/\//);
    for (const lang of ['de', 'it'] as const) {
      for (const k of ['trains', 'daily', 'research', 'improved'] as const) expect(science.texts[lang][k].length).toBeGreaterThan(20);
    }
    expect(science.texts.de.research).toMatch(/nicht belegt/);
    expect(science.texts.it.research).toMatch(/non è dimostrata/);
  });
});

describe('richtung-wort: Intro-Film', () => {
  it('dauert 8–14 s, zeigt alle vier Erklärtexte und endet mit finish (Querformat, Hochformat, Handy)', () => {
    for (const [w, h] of [
      [627, 431],
      [780, 536],
      [350, 298],
      [880, 606],
    ] as const) {
      for (const lang of ['de', 'it'] as const) {
        const r = run({ mode: 'demo', w, h, seed: 1, lang });
        expect(r.result, `${w}x${h}`).not.toBeNull();
        expect(r.seconds).toBeGreaterThan(8);
        expect(r.seconds).toBeLessThan(14);
        const t = richtungWort.texts[lang];
        for (const k of ['up', 'swap', 'diag', 'curve']) expect(r.captions).toContain(t.captions[k]);
        expect(r.result!.primary.unit).toBe('level');
      }
    }
  });

  it('die Geister-Hand tippt immer ein Feld mit dem richtigen Wort (vier richtige Antworten)', () => {
    const r = run({ mode: 'demo', w: 627, h: 431, seed: 2 });
    expect(r.result).not.toBeNull();
    // 4 Tipps, alle richtig → Treffer 100 %
    expect(r.result!.secondary.find((m) => m.key === 'accuracy')!.value).toBe(100);
  });
});

describe('richtung-wort: Spielmodus mit Autoplay', () => {
  const viewports: Array<[string, number, number]> = [
    ['Tablet quer', 1180, 751],
    ['Tablet hoch', 820, 1111],
    ['Handy', 390, 781],
  ];

  for (const [name, w, h] of viewports) {
    it(`${name}: eine Runde (20 Durchgänge) endet sauber, Ergebnis ist gültig`, () => {
      for (const lang of ['de', 'it'] as const) {
        const r = run({ mode: 'play', w, h, seed: 5, lang });
        expect(r.result).not.toBeNull();
        const res = r.result!;
        const tx = richtungWort.texts[lang];
        expect(Number.isInteger(res.primary.value)).toBe(true);
        expect(res.primary.value).toBeGreaterThanOrEqual(1);
        expect(res.primary.value).toBeLessThanOrEqual(12);
        expect(res.primary.unit).toBe('level');
        expect(res.primary.better).toBe('higher');
        expect(res.secondary.length).toBeGreaterThanOrEqual(2);
        expect(res.secondary.length).toBeLessThanOrEqual(4);
        for (const m of [res.primary, ...res.secondary]) expect(tx.metrics[m.key], m.key).toBeTruthy();
        if (res.tip) expect(tx.tips[res.tip], res.tip).toBeTruthy();
        expect(res.level).toBeGreaterThanOrEqual(1);
        expect(res.level).toBeLessThanOrEqual(12);
        // 20 Durchgänge à ca. 3–4 s
        expect(r.seconds).toBeGreaterThan(40);
        expect(r.seconds).toBeLessThan(140);
        expect(r.sfxGood + r.sfxBad).toBeGreaterThanOrEqual(15);
      }
    });
  }

  it('Kurzmodus: 4 Durchgänge', () => {
    const r = run({ mode: 'play', w: 1180, h: 751, quick: true, seed: 6 });
    expect(r.result).not.toBeNull();
    expect(r.seconds).toBeLessThan(30);
    expect(r.sfxGood + r.sfxBad).toBeLessThanOrEqual(4);
  });

  it('läuft über alle Startstufen 1–12 und mehrere Startwerte ohne Fehler; Stufe bleibt gültig', () => {
    for (let lvl = 1; lvl <= 12; lvl++) {
      for (const seed of [1, 2, 3]) {
        const r = run({ mode: 'play', w: 1180, h: 751, seed: seed * 100 + lvl, startLevel: lvl });
        expect(r.result, `Stufe ${lvl} Seed ${seed}`).not.toBeNull();
        const v = r.result!.primary.value;
        expect(v).toBeGreaterThanOrEqual(1);
        expect(v).toBeLessThanOrEqual(12);
        // Zusatzwerte stets endlich
        for (const m of r.result!.secondary) expect(Number.isFinite(m.value), m.key).toBe(true);
      }
    }
  });

  it('Stufenlabel erscheint im Spielmodus und nicht im Intro-Film; Punkte nur im Spielmodus', () => {
    const play = run({ mode: 'play', w: 1180, h: 751, seed: 3, quick: true });
    expect(play.labels.some((l) => l.startsWith('Stufe '))).toBe(true);
    expect(play.scores.some((v) => typeof v === 'number' && v > 0)).toBe(true);
    const demo = run({ mode: 'demo', w: 880, h: 606, seed: 3 });
    expect(demo.labels).toHaveLength(0);
    expect(demo.scores.every((v) => v === null)).toBe(true);
  });

  it('gleicher Startwert → gleiches Ergebnis (nur ctx.rng, virtuelle Uhr)', () => {
    const a = run({ mode: 'play', w: 820, h: 1111, seed: 77 });
    const b = run({ mode: 'play', w: 820, h: 1111, seed: 77 });
    expect(a.result).toEqual(b.result);
    expect(a.seconds).toBe(b.seconds);
  });
});

describe('richtung-wort: Frist und Leerlauf', () => {
  it('Stufe 12 ohne jeden Tipp: Frist 3 s läuft ohne Strafe ab, die Stufe sinkt, nach 3 leeren Durchgängen endet die Runde', () => {
    const r = run({ mode: 'play', w: 1180, h: 751, seed: 9, startLevel: 12, autoplay: false });
    expect(r.result).not.toBeNull();
    // 3 s (Stufe 12) + 5 s (Stufe 10) + 20 s Leerlauf (Stufe 9, keine Frist) + Pausen
    expect(r.seconds).toBeGreaterThan(30);
    expect(r.seconds).toBeLessThan(50);
    expect(r.result!.secondary.find((m) => m.key === 'accuracy')!.value).toBe(0);
    expect(r.result!.primary.value).toBeLessThanOrEqual(10);
    expect(r.sfxBad).toBe(0); // zu langsam: kein Fehlerton
  });

  it('Stufe 1 ohne Tipp: Leerlauf-Grenze 20 s je Durchgang, nach 3 leeren Durchgängen endet die Runde (nicht erst nach 20)', () => {
    const r = run({ mode: 'play', w: 1180, h: 751, seed: 9, startLevel: 1, autoplay: false, maxMs: 400000 });
    expect(r.result).not.toBeNull();
    expect(r.seconds).toBeGreaterThan(3 * 20);
    expect(r.seconds).toBeLessThan(3 * 20 + 15);
    expect(r.result!.primary.value).toBe(1);
  });

  it('kein Tipp, dann wieder Tipps: leere Durchgänge in Folge werden neu gezählt (Runde läuft weiter)', () => {
    let k = 0;
    const geo = geometry({ w: 1180, h: 751, u: 7.51, bottomReserve: 22.5, wordEm: 5.4 });
    const f = geo.fields[0];
    // erst 30 s nichts, dann alle 900 ms ein Tipp auf das obere Feld
    const r = run({ mode: 'play', w: 1180, h: 751, seed: 12, startLevel: 1, autoplay: false, maxMs: 400000, driver: (now) => (now > 30000 && now % 900 < 17 ? { x: f.x + f.w / 2, y: f.y + f.h / 2 + (k++ % 2) } : null) });
    expect(r.result).not.toBeNull();
    expect(r.seconds).toBeGreaterThan(60);
  });
});

describe('richtung-wort: Eingabe', () => {
  const w = 1180;
  const h = 751;
  const geo = geometry({ w, h, u: Math.min(w, h) / 100, bottomReserve: Math.max(14, (Math.min(w, h) / 100) * 3), wordEm: 5.4 });
  const center = (slot: number) => ({ x: geo.fields[slot].x + geo.fields[slot].w / 2, y: geo.fields[slot].y + geo.fields[slot].h / 2 });

  it('Tipps außerhalb der Felder (Zeichenfläche, freie Mitte, Rand) zählen nicht und beenden nichts', () => {
    const spots = [
      { x: geo.plate.x + 10, y: geo.plate.y + 10 },
      { x: w / 2, y: (geo.fields[3].y + geo.fields[3].h / 2) | 0 }, // freie Mitte
      { x: 2, y: 2 },
    ];
    let k = 0;
    const r = run({ mode: 'play', w, h, seed: 4, quick: true, autoplay: false, startLevel: 12, maxMs: 120000, driver: (now) => (now % 400 < 17 ? spots[k++ % 3] : null) });
    expect(r.result).not.toBeNull();
    // nichts getroffen → alle Durchgänge laufen über die Frist (Stufe 12: 3 s)
    expect(r.result!.secondary.find((m) => m.key === 'accuracy')!.value).toBe(0);
    expect(r.sfxGood + r.sfxBad).toBe(0);
  });

  it('wer ständig dasselbe Feld tippt, bekommt Lage-/Achsenfehler gezählt und eine gültige Rückmeldung', () => {
    const top = center(0);
    const r = run({ mode: 'play', w, h, seed: 8, quick: false, autoplay: false, startLevel: 7, maxMs: 300000, driver: (now) => (now % 700 < 17 ? top : null) });
    expect(r.result).not.toBeNull();
    const res = r.result!;
    const acc = res.secondary.find((m) => m.key === 'accuracy')!.value;
    expect(acc).toBeLessThan(60);
    expect(res.secondary.some((m) => m.key === 'posErrors')).toBe(true);
    expect(res.secondary.some((m) => m.key === 'axisErrors')).toBe(true);
    if (res.tip) expect(de.tips[res.tip]).toBeTruthy();
    if (res.tip) expect(itTexts.tips[res.tip]).toBeTruthy();
  });
});
