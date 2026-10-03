/**
 * Pendelball: Stufentabelle, Bewegung, Buchstaben, Bahnfolge, Texte und Durchläufe ohne Browser
 * (virtuelle Zeit, Autoplay bzw. Intro-Film gegen einen Attrappen-Kontext).
 */
import { describe, expect, it, vi } from 'vitest';
import { createFormatter } from '../../src/core/format';
import { createRng } from '../../src/core/rng';
import type { Exercise, ExerciseContext, ExerciseResult, PointerInfo } from '../../src/core/types';
import { SCIENCE } from '../../src/content/science';
import { CATEGORIES, EXERCISES } from '../../src/exercises/registry';
import { MAX_TRACK_WIDTH } from '../../src/exercises/_shared/pursuit-logic';
import { barLayout } from '../../src/exercises/_shared/zeichenaufgabe';
import { pendelball } from '../../src/exercises/pendelball';
import { science } from '../../src/exercises/pendelball/science';
import { de, it as itTexts } from '../../src/exercises/pendelball/texts';
import * as L from '../../src/exercises/pendelball/logic';

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

const STAGES: Array<[number, number]> = [
  [1180, 820],
  [820, 1180],
  [390, 844],
];

const KEYS: L.ParamKey[] = ['period', 'ampFrac', 'letterU', 'exposureMs', 'letterSet', 'mixed', 'ballK'];

// ---------------------------------------------------------------------------
// Stufentabelle

describe('Stufentabelle', () => {
  it('25 Stufen, jeder Schritt ändert genau einen Parameter, und zwar in Richtung „schwerer“', () => {
    expect(L.LEVELS.length).toBe(25);
    expect(L.MAX_LEVEL).toBe(25);
    for (let i = 1; i < L.LEVELS.length; i++) {
      const a = L.LEVELS[i - 1];
      const b = L.LEVELS[i];
      const changed = KEYS.filter((k) => a[k] !== b[k]);
      expect(changed, `Stufe ${i + 1}`).toEqual([L.STEPS[i - 1][0]]);
      const k = changed[0];
      if (k === 'period' || k === 'letterU' || k === 'exposureMs' || k === 'ballK') expect(b[k]).toBeLessThan(a[k] as number);
      if (k === 'ampFrac' || k === 'letterSet') expect(b[k] as number).toBeGreaterThan(a[k] as number);
      if (k === 'mixed') {
        expect(a.mixed).toBe(false);
        expect(b.mixed).toBe(true);
      }
    }
  });

  it('Anfangs- und Endwerte nach Auftrag: Periode 4 → 2,2 s, Weite ≤ 30 % der Breite, Buchstaben- und Kugelgröße, Anzeigedauer', () => {
    const first = L.LEVELS[0];
    const last = L.LEVELS[L.LEVELS.length - 1];
    expect(first.period).toBeCloseTo(4.0);
    expect(last.period).toBeCloseTo(2.2);
    for (const p of L.LEVELS) {
      expect(p.ampFrac).toBeLessThanOrEqual(0.3 + 1e-9); // halbe Bahnweite 30 % = Bahn höchstens 60 % der Bühnenbreite
      expect(p.ampFrac * 2).toBeLessThanOrEqual(MAX_TRACK_WIDTH + 1e-9);
      expect(p.ballK).toBeGreaterThanOrEqual(L.MIN_BALL_K);
      expect(p.exposureMs).toBeGreaterThanOrEqual(600);
    }
    expect(last.ampFrac).toBeCloseTo(0.3);
    expect(first.letterU).toBeGreaterThan(last.letterU);
    expect(first.exposureMs).toBeGreaterThan(last.exposureMs);
    expect(first.letterSet).toBe(0);
    expect(last.letterSet).toBe(2);
    expect(first.mixed).toBe(false);
    expect(last.mixed).toBe(true);
  });

  it('„gemischt“ gilt ab Stufe 12 (mittlere Stufen), die Bahnfolge ist vorher fest', () => {
    expect(L.MIXED_FROM_LEVEL).toBe(12);
    for (let lv = 1; lv <= L.MAX_LEVEL; lv++) expect(L.paramsFor(lv).mixed, `Stufe ${lv}`).toBe(lv >= L.MIXED_FROM_LEVEL);
  });

  it('Anzeigedauer passt auf jeder Stufe in den geraden Teil eines Schlags (Dauer ≤ Periode/3 − 120 ms)', () => {
    for (const [i, p] of [...L.LEVELS, L.DEMO_PARAMS].entries()) {
      expect(p.exposureMs, `Stufe ${i + 1}`).toBeLessThanOrEqual((p.period / 3) * 1000 - 120 + 1e-6);
    }
  });

  it('paramsFor klemmt und rundet ab; Kommastufen zählen zur ganzen Stufe darunter', () => {
    expect(L.paramsFor(0)).toBe(L.LEVELS[0]);
    expect(L.paramsFor(99)).toBe(L.LEVELS[24]);
    expect(L.paramsFor(3.9)).toBe(L.LEVELS[2]);
    expect(L.levelIndex(7.99)).toBe(7);
  });

  it('Buchstaben: nie kleiner als 18 px (≈ 0,35° bei höchstens 51 px/°), Buchstabe passt in die Kugel', () => {
    for (const [w, h] of [...STAGES, [1180, 738] as [number, number]]) {
      const u = Math.min(w, h) / 100;
      for (let lv = 1; lv <= L.MAX_LEVEL; lv++) {
        const H = L.letterPx(lv, u);
        expect(H, `${w}x${h} Stufe ${lv}`).toBeGreaterThanOrEqual(L.MIN_LETTER_PX);
        expect(H).toBeLessThanOrEqual(L.MAX_LETTER_PX);
        expect(18 / 51).toBeGreaterThan(0.35 - 0.01); // 18 px bei 51 px/° ≈ 0,353°
        expect(L.ballRadiusPx(lv, u)).toBeGreaterThanOrEqual(H * L.MIN_BALL_K - 1e-9);
      }
    }
    // Auf dem Tablet quer (u = 8,2 px, ≈ 36 px/°) bleibt der kleinste Buchstabe über 0,5°
    expect(L.letterPx(L.MAX_LEVEL, 8.2) / 36).toBeGreaterThan(0.5);
  });
});

// ---------------------------------------------------------------------------
// Bahnen und Bewegung

describe('Bewegung', () => {
  it('Hüllkurve: stetig, 0 am Anfang, 1 in der Mitte, fällt ab sEnd wieder auf 0', () => {
    expect(L.envelope(0, 1.5)).toBe(0);
    expect(L.envelope(1.5, 1.5)).toBeCloseTo(1);
    expect(L.envelope(7, 1.5)).toBe(1);
    expect(L.envelope(12, 1.5, 12)).toBeCloseTo(1);
    expect(L.envelope(13.5, 1.5, 12)).toBeCloseTo(0);
    let prev = 0;
    for (let s = 0; s <= 16; s += 0.001) {
      const e = L.envelope(s, 1.5, 12);
      expect(Math.abs(e - prev)).toBeLessThan(0.004);
      prev = e;
    }
  });

  it('Gerade: Sinus, Umkehrpunkt = Weite, Mitte bei s = 0; Richtungen der vier Geraden', () => {
    const A = 100;
    const T = 3;
    expect(L.offsetAt('horizontal', T / 4, T, A, 1).x).toBeCloseTo(A);
    expect(L.offsetAt('horizontal', T / 4, T, A, 1).y).toBeCloseTo(0);
    expect(L.offsetAt('vertical', T / 4, T, A, 1).y).toBeCloseTo(A);
    const up = L.offsetAt('diagUp', T / 4, T, A, 1); // rechts oben: x > 0, y < 0 (y nach unten)
    expect(up.x).toBeGreaterThan(0);
    expect(up.y).toBeLessThan(0);
    const dn = L.offsetAt('diagDown', T / 4, T, A, 1); // rechts unten
    expect(dn.x).toBeGreaterThan(0);
    expect(dn.y).toBeGreaterThan(0);
    expect(Math.hypot(up.x, up.y)).toBeCloseTo(A);
    const o0 = L.offsetAt('diagUp', 0, T, A, 1);
    expect(Math.hypot(o0.x, o0.y)).toBe(0);
  });

  it('Kreise: gleichmäßige Winkelgeschwindigkeit, richtiger Drehsinn (Uhrzeigersinn: rechts → unten)', () => {
    const A = 100;
    const T = 2.5;
    const w = (2 * Math.PI) / T;
    for (const shape of ['circleCw', 'circleCcw'] as const) {
      let prevAng = 0;
      for (let k = 0; k <= 400; k++) {
        const s = k * 0.01;
        const p = L.offsetAt(shape, s, T, A, 1);
        expect(Math.hypot(p.x, p.y)).toBeCloseTo(A, 6);
        const ang = Math.atan2(p.y, p.x);
        if (k > 0) {
          let d = ang - prevAng;
          while (d > Math.PI) d -= 2 * Math.PI;
          while (d < -Math.PI) d += 2 * Math.PI;
          expect(d / 0.01).toBeCloseTo((shape === 'circleCw' ? 1 : -1) * w, 3);
        }
        prevAng = ang;
      }
    }
    const a = L.offsetAt('circleCw', T / 8, T, A, 1);
    expect(a.x).toBeGreaterThan(0);
    expect(a.y).toBeGreaterThan(0); // nach rechts, dann nach unten
    const b = L.offsetAt('circleCcw', T / 8, T, A, 1);
    expect(b.y).toBeLessThan(0); // gegen den Uhrzeigersinn: erst nach oben
  });

  it('Weite: höchstens 60 % der Bühnenbreite und Spitzengeschwindigkeit ≤ 25°/s auf jeder Stufe und Bühne', () => {
    for (const [w, h] of [...STAGES, [1180, 738] as [number, number], [768, 1024] as [number, number]]) {
      const u = Math.min(w, h) / 100;
      const lay = barLayout({ w, h, u, dpr: 1 }, false);
      for (let lv = 1; lv <= L.MAX_LEVEL; lv++) {
        const p = L.paramsFor(lv);
        const r = L.ballRadiusFor(p, u);
        const halfH = Math.max(4, (lay.world.y1 - lay.world.y0) / 2 - r - 6);
        const A = L.amplitudePx(p, { w, u, halfH });
        expect(2 * A, `${w}x${h} Stufe ${lv}`).toBeLessThanOrEqual(MAX_TRACK_WIDTH * w + 1e-6);
        expect(A).toBeLessThanOrEqual(halfH + 1e-6);
        const deg = L.pxPerSecToDegPerSec(L.peakSpeedPx(A, p.period), u);
        expect(deg, `${w}x${h} Stufe ${lv}: ${deg.toFixed(1)}°/s`).toBeLessThanOrEqual(L.PEAK_CAP_DEG_S + 1e-6);
        expect(deg).toBeLessThanOrEqual(L.PEAK_LIMIT_DEG_S);
      }
    }
  });

  it('Block mit Ein- und Ausschwingen: Spitzentempo bleibt ≤ 25°/s, Bahn stetig, bleibt auf der Bühne', () => {
    for (const [w, h] of STAGES) {
      const u = Math.min(w, h) / 100;
      const lay = barLayout({ w, h, u, dpr: 1 }, false);
      for (const lv of [1, 5, 12, 20, 25]) {
        const p = L.paramsFor(lv);
        const r = L.ballRadiusFor(p, u);
        const halfH = Math.max(4, (lay.world.y1 - lay.world.y0) / 2 - r - 6);
        const A = L.amplitudePx(p, { w, u, halfH });
        const cx = w / 2;
        const cy = (lay.world.y0 + lay.world.y1) / 2;
        for (const shape of L.SHAPES) {
          const dt = 1 / 120;
          let prev = { x: 0, y: 0 };
          let maxDeg = 0;
          let minX = Infinity;
          let maxX = -Infinity;
          for (let s = 0; s <= 17; s += dt) {
            const e = L.envelope(s, L.RAMP_S, 14);
            const o = L.offsetAt(shape, s, p.period, A, e);
            if (s > 0) maxDeg = Math.max(maxDeg, L.pxPerSecToDegPerSec(Math.hypot(o.x - prev.x, o.y - prev.y) / dt, u));
            prev = o;
            minX = Math.min(minX, cx + o.x);
            maxX = Math.max(maxX, cx + o.x);
            expect(cx + o.x - r).toBeGreaterThanOrEqual(-1e-6);
            expect(cx + o.x + r).toBeLessThanOrEqual(w + 1e-6);
            expect(cy + o.y - r).toBeGreaterThanOrEqual(lay.world.y0 - 1e-6);
            expect(cy + o.y + r).toBeLessThanOrEqual(lay.world.y1 + 1e-6);
          }
          expect(maxDeg, `${w}x${h} Stufe ${lv} ${shape}`).toBeLessThanOrEqual(L.PEAK_LIMIT_DEG_S);
          expect(maxX - minX).toBeLessThanOrEqual(MAX_TRACK_WIDTH * w + 1e-6);
        }
      }
    }
  }, 60000);

  it('Kugel liegt zu Beginn und am Ende eines Blocks in der Mitte', () => {
    for (const shape of L.SHAPES) {
      const o0 = L.offsetAt(shape, 0, 3, 200, L.envelope(0, 1.5, 10));
      expect(Math.hypot(o0.x, o0.y)).toBe(0);
      const end = L.offsetAt(shape, 11.5, 3, 200, L.envelope(11.5, 1.5, 10));
      expect(Math.hypot(end.x, end.y)).toBeCloseTo(0, 6);
    }
  });
});

// ---------------------------------------------------------------------------
// Zeichen nur im geraden Teil

describe('Zeichen nie in der Umkehr', () => {
  it('Beginn mittig um den Mitteldurchgang; das ganze Fenster liegt bei ≥ 50 % des Höchsttempos', () => {
    for (const [i, p] of [...L.LEVELS, L.DEMO_PARAMS].entries()) {
      const E = p.exposureMs / 1000;
      for (const shape of ['horizontal', 'vertical', 'diagUp', 'diagDown'] as const) {
        for (let from = 0; from < 30; from += 0.37) {
          const on = L.nextSignOnset(shape, p.period, E, from, L.RAMP_S);
          expect(on, `Stufe ${i + 1}`).toBeGreaterThanOrEqual(Math.max(from, L.minSignStartS(shape, L.RAMP_S)) - 1e-9);
          expect(L.windowIsUniform(shape, p.period, on, E)).toBe(true);
          for (let k = 0; k <= 40; k++) expect(L.speedRatio(shape, on + (k / 40) * E, p.period)).toBeGreaterThanOrEqual(L.UNIFORM_MIN_SPEED_RATIO - 1e-6);
          // ein Bild (50 ms) zu früh oder zu spät ist immer noch im geraden Teil
          expect(L.windowIsUniform(shape, p.period, on - 0.05, E)).toBe(true);
          expect(L.windowIsUniform(shape, p.period, on + 0.05, E)).toBe(true);
        }
      }
    }
  });

  it('windowIsUniform erkennt die Umkehr', () => {
    // Umkehr bei s = T/4: ein Fenster darum herum ist nicht gleichmäßig
    expect(L.windowIsUniform('horizontal', 3, 3 / 4 - 0.3, 0.6)).toBe(false);
    expect(L.windowIsUniform('horizontal', 3, 0.0, 0.5)).toBe(true);
    expect(L.windowIsUniform('circleCw', 3, 3 / 4 - 0.3, 0.6)).toBe(true);
  });

  it('Kreise: nie in den ersten 2 s nach Bahnwechsel, Geraden erst nach dem Einschwingen', () => {
    for (const ramp of [1.0, 1.5]) {
      expect(L.minSignStartS('circleCw', ramp)).toBeGreaterThanOrEqual(2.0);
      expect(L.minSignStartS('circleCcw', ramp)).toBeGreaterThanOrEqual(2.0);
      for (const shape of ['horizontal', 'vertical', 'diagUp', 'diagDown'] as const) expect(L.minSignStartS(shape, ramp)).toBeGreaterThan(ramp);
    }
    expect(L.nextSignOnset('circleCw', 3, 0.8, 0, 1.5)).toBeGreaterThanOrEqual(2.0);
    expect(L.nextSignOnset('circleCcw', 3, 0.8, 0.5, 1.0)).toBeGreaterThanOrEqual(2.0);
  });
});

// ---------------------------------------------------------------------------
// Buchstaben und Antworten

describe('Buchstaben und Antworten', () => {
  it('Blende: weich, je Übergang mindestens 150 ms, nie ein Sprung', () => {
    expect(L.FADE_MS).toBeGreaterThanOrEqual(150);
    expect(L.ANSWER_MS).toBeGreaterThanOrEqual(2500);
    for (const p of L.LEVELS) {
      const E = p.exposureMs;
      expect(L.letterAlpha(0, E)).toBe(0);
      expect(L.letterAlpha(E, E)).toBe(0);
      expect(L.letterAlpha(E / 2, E)).toBe(1);
      let prev = 0;
      let reach = -1;
      for (let a = 0; a <= E; a += 1) {
        const v = L.letterAlpha(a, E);
        expect(Math.abs(v - prev)).toBeLessThan(0.03);
        if (reach < 0 && v >= 0.999) reach = a;
        prev = v;
      }
      expect(reach).toBeGreaterThanOrEqual(150);
      // Plateau bleibt übrig
      expect(E - 2 * L.FADE_MS).toBeGreaterThanOrEqual(250);
    }
  });

  it('immer vier verschiedene Buchstaben, die richtige Antwort genau einmal und eindeutig', () => {
    const rng = createRng(11);
    for (const set of [0, 1, 2] as const) {
      let avoid: string | undefined;
      for (let i = 0; i < 600; i++) {
        const t = L.makeLetterTrial(rng, set, avoid);
        expect(t.options.length).toBe(4);
        expect(new Set(t.options).size).toBe(4);
        expect(t.options.filter((o) => o === t.correct).length).toBe(1);
        expect(t.options[t.correctIndex]).toBe(t.correct);
        expect(t.correct).not.toBe(avoid);
        for (const o of t.options) expect(o).toMatch(/^[A-Z]$/);
        avoid = t.correct;
      }
    }
  });

  it('Buchstabenmengen: 0 sehr verschieden, 1 teils ähnlich, 2 ähnlich (eine Vierergruppe)', () => {
    const rng = createRng(5);
    for (let i = 0; i < 300; i++) {
      const t0 = L.makeLetterTrial(rng, 0);
      for (const o of t0.options) expect(L.LETTERS_DISTINCT).toContain(o);
      const t2 = L.makeLetterTrial(rng, 2);
      const g = L.groupOf(t2.correct);
      for (const o of t2.options) expect(L.LETTER_GROUPS[g]).toContain(o);
      const t1 = L.makeLetterTrial(rng, 1);
      const g1 = L.LETTER_GROUPS[L.groupOf(t1.correct)];
      expect(t1.options.filter((o) => g1.includes(o)).length).toBe(3);
    }
    expect(L.LETTER_GROUPS[0]).toEqual(['B', 'D', 'P', 'R']);
  });

  it('Position der richtigen Antwort ist zufällig (alle vier Plätze kommen vor)', () => {
    const rng = createRng(3);
    const count = [0, 0, 0, 0];
    for (let i = 0; i < 1200; i++) count[L.makeLetterTrial(rng, 1).correctIndex]++;
    for (const c of count) expect(c).toBeGreaterThan(200);
  });

  it('Buttons: Trefferfläche ≥ 72 px auf allen drei Bühnen (Spielmodus)', () => {
    for (const [w, h] of STAGES) {
      const lay = barLayout({ w, h, u: Math.min(w, h) / 100, dpr: 1 }, false);
      expect(lay.btns.length).toBe(4);
      for (const b of lay.btns) {
        expect(b.w).toBeGreaterThanOrEqual(72);
        expect(b.h).toBeGreaterThanOrEqual(68);
        expect(b.x).toBeGreaterThanOrEqual(0);
        expect(b.x + b.w).toBeLessThanOrEqual(w);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Bahnfolge und Anpassung

describe('Bahnfolge', () => {
  it('fest: immer die Reihenfolge waagrecht, senkrecht, schräg ↗, schräg ↘, Kreis rechts, Kreis links', () => {
    expect(L.SHAPES).toEqual(['horizontal', 'vertical', 'diagUp', 'diagDown', 'circleCw', 'circleCcw']);
    const rng = createRng(1);
    const remaining = [...L.SHAPES];
    const seq: L.Shape[] = [];
    let prev: L.Shape | null = null;
    while (remaining.length) {
      const s = L.pickNextShape(rng, remaining, prev, false);
      remaining.splice(remaining.indexOf(s), 1);
      seq.push(s);
      prev = s;
    }
    expect(seq).toEqual([...L.SHAPES]);
  });

  it('gemischt: jede Bahn einmal, nie dieselbe zweimal hintereinander, verschiedene Reihenfolgen', () => {
    const orders = new Set<string>();
    for (let seed = 1; seed <= 200; seed++) {
      const rng = createRng(seed);
      const remaining = [...L.SHAPES];
      const seq: L.Shape[] = [];
      let prev: L.Shape | null = null;
      while (remaining.length) {
        const s = L.pickNextShape(rng, remaining, prev, true);
        expect(s).not.toBe(prev);
        remaining.splice(remaining.indexOf(s), 1);
        seq.push(s);
        prev = s;
      }
      expect(new Set(seq).size).toBe(6);
      orders.add(seq.join());
    }
    expect(orders.size).toBeGreaterThan(50);
  });

  it('auch wenn nur noch die vorige Bahn übrig wäre, wird kein Absturz erzeugt', () => {
    expect(L.pickNextShape(createRng(1), ['horizontal'], 'horizontal', true)).toBe('horizontal');
  });
});

describe('Anpassung und Hauptwert', () => {
  it('≥ 85 % schwerer, < 65 % leichter, dazwischen gleich', () => {
    expect(L.blockVerdict(3, 3)).toBe('harder');
    expect(L.blockVerdict(4, 4)).toBe('harder');
    expect(L.blockVerdict(17, 20)).toBe('harder');
    expect(L.blockVerdict(3, 4)).toBe('same');
    expect(L.blockVerdict(2, 3)).toBe('same'); // 66,7 %
    expect(L.blockVerdict(1, 3)).toBe('easier');
    expect(L.blockVerdict(2, 4)).toBe('easier');
    expect(L.blockVerdict(0, 0)).toBe('same');
  });

  it('Hauptwert = höchste Stufe mit ≥ 65 % in einem Block, mindestens 1', () => {
    const b = (level: number, hits: number, n: number): L.BlockRec => ({ shape: 'horizontal', level, hits, n });
    expect(L.reachedLevel([])).toBe(1);
    expect(L.reachedLevel([b(1, 3, 3), b(3, 3, 3), b(5, 1, 3), b(4, 2, 3)])).toBe(4);
    expect(L.reachedLevel([b(7, 0, 3)])).toBe(1);
  });

  it('Autoplay-Trefferquote sinkt mit der Stufe', () => {
    expect(L.autoAccuracy(1)).toBeGreaterThan(L.autoAccuracy(10));
    expect(L.autoAccuracy(25)).toBeGreaterThanOrEqual(0.45);
  });
});

// ---------------------------------------------------------------------------
// Texte und Quellen

const FORBIDDEN = ['VTC', 'Corso', 'Mirante', 'Optometria Unicista', 'Istituto', 'Kurs', 'Folie', 'Marsden', 'Original', 'Prototyp', 'Vorlage', 'Website', 'Webseite', 'originale', 'prototipo', 'sito web'];

describe('Texte', () => {
  it('Deutsch und Italienisch haben dieselben Schlüssel und gleich viele Schritte', () => {
    for (const key of ['captions', 'metrics', 'tips', 'feedback', 'metricHints'] as const) {
      expect(Object.keys(itTexts[key] ?? {}).sort(), key).toEqual(Object.keys(de[key] ?? {}).sort());
    }
    expect(itTexts.steps.length).toBe(de.steps.length);
    expect(itTexts.goodFor.length).toBe(de.goodFor.length);
    expect(itTexts.progression?.length).toBe(de.progression?.length);
    expect(itTexts.cautions?.length).toBe(de.cautions?.length);
    for (const t of [de, itTexts]) {
      for (const v of Object.values(t.feedback)) expect(v.length).toBeGreaterThan(1);
    }
  });

  it('Längen: Tagline ≤ 80, Schritte ≤ 60 (2–3), Bildunterschriften ≤ 40 Zeichen', () => {
    for (const t of [de, itTexts]) {
      expect(t.tagline.length).toBeLessThanOrEqual(80);
      expect(t.steps.length).toBeGreaterThanOrEqual(2);
      expect(t.steps.length).toBeLessThanOrEqual(3);
      for (const s of t.steps) expect(s.length).toBeLessThanOrEqual(60);
      for (const c of Object.values(t.captions)) expect(c.length).toBeLessThanOrEqual(40);
      expect(t.title.length).toBeLessThanOrEqual(20);
    }
  });

  it('„Für Neugierige“ endet mit „… ist nicht belegt“ (DE) bzw. „… non è dimostrato“ (IT)', () => {
    expect(de.why.trim().endsWith('ist nicht belegt.')).toBe(true);
    expect(itTexts.why.trim().endsWith('non è dimostrato.')).toBe(true);
  });

  it('du-Form, kein „Test“, keine Wirk-, Heil- oder Sicherheitsversprechen, keine Normwerte, keine verbotenen Bezüge', () => {
    for (const [name, blob] of [
      ['de', JSON.stringify([de, science.texts.de])],
      ['it', JSON.stringify([itTexts, science.texts.it])],
    ] as const) {
      expect(blob, name).not.toMatch(/\bTest\b/);
      const low = blob.toLowerCase();
      for (const bad of ['diagnose', 'diagnosi', 'normwert', 'valori normativi', 'heilung', 'heilt', 'krank', 'patholog', 'garantier', 'sicher vor', 'verbesserst dein sehen', 'sehkraft', 'trainiert deine augenmuskeln']) {
        expect(low.includes(bad), `${name}: ${bad}`).toBe(false);
      }
      for (const bad of FORBIDDEN) expect(blob.includes(bad), `${name}: ${bad}`).toBe(false);
      expect(blob).not.toMatch(/\bMarsden\b|\bVTC\b/);
    }
    expect(de.steps.join(' ')).toMatch(/\bdu\b|Folge|Tippe|Tablet/);
    expect(JSON.stringify(de)).not.toMatch(/\bSie\b/);
  });

  it('Hinweise im Intro (DE/IT): ruhig aufstellen, mittig sitzen, Kopf ruhig, nur mit den Augen folgen; Warnzeichen mit Quelle', () => {
    const deAll = [...de.steps, ...(de.cautions ?? [])].join(' ');
    expect(deAll).toMatch(/Tablet ruhig/);
    expect(deAll).toMatch(/mittig/);
    expect(deAll).toMatch(/Kopf/);
    expect(deAll).toMatch(/nur mit den Augen/);
    expect(deAll).toMatch(/Doppelbilder/);
    expect(deAll).toMatch(/Schwindel/);
    expect(deAll).toMatch(/Kopfschmerz/);
    expect(deAll).toMatch(/ärztlich abklären/);
    expect(deAll).toMatch(/Muchnick, 2008/);
    const itAll = [...itTexts.steps, ...(itTexts.cautions ?? [])].join(' ');
    expect(itAll).toMatch(/tablet/i);
    expect(itAll).toMatch(/solo con gli occhi/);
    expect(itAll).toMatch(/visione doppia/);
    expect(itAll).toMatch(/vertigini/);
    expect(itAll).toMatch(/mal di testa/);
    expect(itAll).toMatch(/medico/);
    expect(itAll).toMatch(/Muchnick, 2008/);
    // Ehrlich: Blick und Kopfhaltung werden nicht erfasst
    expect(deAll).toMatch(/nicht erfassen/);
    expect(de.feedback.note).toMatch(/nicht, wohin du schaust/);
  });

  it('Wissenschaftseintrag: Felder, Beleglage „schwach“, Quellen nur doi.org oder openlibrary.org/isbn, Praxisform ohne Quelle', () => {
    expect(science.id).toBe('pendelball');
    expect(science.evidence).toBe('weak');
    expect(SCIENCE.pendelball).toBe(science);
    for (const l of ['de', 'it'] as const) {
      for (const k of ['trains', 'daily', 'research', 'improved'] as const) expect(science.texts[l][k].length).toBeGreaterThan(40);
    }
    expect(science.sources.length).toBeGreaterThanOrEqual(5);
    for (const s of science.sources) {
      expect(s.url, s.label).toMatch(/^https:\/\/(doi\.org\/10\.\S+|openlibrary\.org\/isbn\/\d{10,13})$/);
    }
    expect(science.sources.some((s) => s.url === 'https://openlibrary.org/isbn/9780323029612')).toBe(true);
    // Die Praxisform selbst ist nicht belegt – das steht so im Text, ohne Quellenangabe im selben Satz
    expect(science.texts.de.research).toContain('Praxisform der funktionellen Optometrie – nicht durch Studien belegt.');
    expect(science.texts.it.research).toContain('non dimostrata da studi.');
    expect(science.texts.de.research).toContain('Muchnick, 2008, S. 32–35');
    expect(science.texts.de.research).toMatch(/keine solche Prüfung/);
    expect(science.texts.de.daily.trim().endsWith('nicht belegt.')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Registrierung

describe('Registrierung', () => {
  it('pendelball steht am Ende der regulären Übungen der Kategorie „bewegung“ und in beiden Sprachen vollständig', () => {
    expect(pendelball.id).toBe('pendelball');
    expect(pendelball.category).toBe('bewegung');
    expect(EXERCISES.includes(pendelball)).toBe(true);
    expect(CATEGORIES.some((c) => c.id === 'bewegung')).toBe(true);
    const regular = EXERCISES.filter((e) => e.category === 'bewegung' && !e.tags?.includes('labor'));
    expect(regular[regular.length - 1]).toBe(pendelball);
    expect(pendelball.showsLevel).toBe(true);
    expect(pendelball.warning).toBeUndefined();
    expect(pendelball.icon.length).toBeGreaterThan(20);
    expect(pendelball.texts.de).toBe(de);
    expect(pendelball.texts.it).toBe(itTexts);
  });
});

// ---------------------------------------------------------------------------
// Durchläufe

interface Peek {
  phase: string;
  lphase: string;
  shape: L.Shape;
  params: L.LevelParams;
  blockT0: number;
  blockLevel: number;
  blockIdx: number;
  ball: { x: number; y: number };
  rNow: number;
  lt: L.LetterTrial | null;
  onsetT: number;
  upcoming: L.Shape;
  stair: { level: number };
}

interface SimOut {
  result: ExerciseResult | null;
  results: number;
  seconds: number;
  captions: string[];
  toasts: string[];
  taps: number;
  texts: string[];
  frames: number;
  randomCalls: number;
}

interface SimOpts {
  w?: number;
  h?: number;
  mode?: 'play' | 'demo';
  quick?: boolean;
  seed?: number;
  startLevel?: number | null;
  autoplay?: boolean;
  fps?: number;
  maxSeconds?: number;
  lang?: 'de' | 'it';
  onFrame?: (p: Peek, t: number, ex: Exercise) => void;
}

function fakeCanvas(texts: string[]): CanvasRenderingContext2D {
  const store: Record<string, unknown> = {};
  return new Proxy(store, {
    get: (t, k: string) => {
      if (k === 'fillText') return (s: string) => texts.push(String(s));
      return k in t ? t[k] : () => undefined;
    },
    set: (t, k: string, v) => {
      t[k] = v;
      return true;
    },
  }) as unknown as CanvasRenderingContext2D;
}

function run(o: SimOpts = {}): SimOut {
  const w = o.w ?? 1180;
  const h = o.h ?? 820;
  const fps = o.fps ?? 60;
  const lang = o.lang ?? 'de';
  const mode = o.mode ?? 'play';
  let now = 0;
  let result: ExerciseResult | null = null;
  let results = 0;
  let endAt = 0;
  const captions: string[] = [];
  const toasts: string[] = [];
  const texts: string[] = [];
  const taps: { at: number; x: number; y: number }[] = [];
  let tapCount = 0;
  const noop = () => {};
  const rngSpy = vi.spyOn(Math, 'random');
  const ctx: ExerciseContext = {
    mode,
    autoplay: o.autoplay ?? true,
    quick: o.quick ?? false,
    reducedMotion: false,
    startLevel: o.startLevel ?? null,
    lang,
    texts: pendelball.texts[lang],
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
    fmt: createFormatter(lang),
    now: () => now,
    finish: (r) => {
      result = r;
      results++;
      endAt = now;
    },
  };
  const ex = pendelball.create(ctx);
  const g = fakeCanvas(texts);
  ex.start(now);
  const dt = 1 / fps;
  const limit = (o.maxSeconds ?? 400) * 1000;
  let frames = 0;
  while (!result && now < limit) {
    now += dt * 1000;
    for (let i = taps.length - 1; i >= 0; i--) {
      if (taps[i].at <= now) {
        const tp = taps.splice(i, 1)[0];
        tapCount++;
        const p: PointerInfo = { id: 1, x: tp.x, y: tp.y, t: now, type: 'ghost' };
        ex.pointerDown?.(p);
      }
    }
    ex.update(dt, now);
    o.onFrame?.(ex as unknown as Peek, now, ex);
    if (frames++ % 3 === 0) ex.render(g, now);
  }
  ex.destroy?.();
  const randomCalls = rngSpy.mock.calls.length;
  rngSpy.mockRestore();
  return { result, results, seconds: endAt / 1000, captions, toasts, taps: tapCount, texts, frames, randomCalls };
}

describe('Intro-Film', () => {
  for (const lang of ['de', 'it'] as const) {
    for (const [w, h] of [...STAGES, [1180, 738] as [number, number]]) {
      it(`${lang} ${w}x${h}: endet nach 8–14 s mit ctx.finish, Geisterhand tippt, Bildunterschriften aus den Texten`, () => {
        const out = run({ mode: 'demo', lang, w, h, maxSeconds: 40 });
        expect(out.result).not.toBeNull();
        expect(out.results).toBe(1);
        expect(out.seconds).toBeGreaterThanOrEqual(8);
        expect(out.seconds).toBeLessThanOrEqual(14);
        expect(out.taps).toBeGreaterThanOrEqual(2);
        expect(new Set(out.captions).size).toBeGreaterThanOrEqual(2);
        for (const c of out.captions) expect(Object.values(pendelball.texts[lang].captions)).toContain(c);
        expect(out.randomCalls).toBe(0);
      });
    }
  }

  it('zeigt zwei Bahnen nacheinander (waagrecht, senkrecht) mit je einem Buchstaben, ohne Sprung der Kugel', () => {
    const shapes: L.Shape[] = [];
    let prev: { x: number; y: number } | null = null;
    let maxStep = 0;
    let shows = 0;
    let lp = '';
    run({
      mode: 'demo',
      onFrame: (p) => {
        if (p.phase === 'run' && shapes[shapes.length - 1] !== p.shape) shapes.push(p.shape);
        if (p.lphase === 'show' && lp !== 'show') shows++;
        lp = p.lphase;
        if (prev) maxStep = Math.max(maxStep, Math.hypot(p.ball.x - prev.x, p.ball.y - prev.y));
        prev = { x: p.ball.x, y: p.ball.y };
      },
    });
    expect(shapes).toEqual(['horizontal', 'vertical']);
    expect(shows).toBe(2);
    expect(maxStep).toBeLessThan(10);
  });
});

describe('Sitzung im Spielmodus (Autoplay)', () => {
  for (const [w, h] of STAGES) {
    it(`${w}x${h}: sechs Bahnen in fester Reihenfolge, endet mit Hauptwert, Zusatzwerten und Tabelle`, () => {
      const order: L.Shape[] = [];
      const out = run({ w, h, seed: 13 + w, maxSeconds: 400, onFrame: (p) => {
        if (p.phase === 'run' && order[order.length - 1] !== p.shape) order.push(p.shape);
      } });
      const r = out.result!;
      expect(r).not.toBeNull();
      expect(out.results).toBe(1);
      expect(order).toEqual([...L.SHAPES]);
      expect(out.seconds).toBeGreaterThan(70);
      expect(out.seconds).toBeLessThan(200);
      expect(r.primary.key).toBe('level');
      expect(r.primary.unit).toBe('level');
      expect(r.primary.better).toBe('higher');
      expect(Number.isInteger(r.primary.value)).toBe(true);
      expect(r.primary.value).toBeGreaterThanOrEqual(1);
      expect(r.primary.value).toBeLessThanOrEqual(L.MAX_LEVEL);
      expect(r.secondary.length).toBeGreaterThanOrEqual(2);
      expect(r.secondary.length).toBeLessThanOrEqual(4);
      for (const m of r.secondary) {
        expect(Object.keys(de.metrics)).toContain(m.key);
        expect(Number.isFinite(m.value)).toBe(true);
      }
      expect(Object.keys(de.metrics)).toContain(r.primary.key);
      expect(r.level).toBeGreaterThanOrEqual(1);
      expect(r.level).toBeLessThanOrEqual(L.MAX_LEVEL);
      expect(Object.keys(de.tips)).toContain(r.tip);
      expect(r.score).toBeGreaterThan(0);
      // Tabelle: Treffer je Bahnform
      expect(r.details?.length).toBe(1);
      const rows = r.details![0].rows;
      expect(rows.length).toBe(6);
      const names = L.SHAPES.map((s) => (de.feedback as Record<string, string>)[({ horizontal: 'shapeH', vertical: 'shapeV', diagUp: 'shapeD1', diagDown: 'shapeD2', circleCw: 'shapeCw', circleCcw: 'shapeCcw' } as const)[s]]);
      expect(rows.map((x) => x.label)).toEqual(names);
      for (const row of rows) expect(row.value).toMatch(/^\d+ von \d+ richtig$/);
      expect(out.randomCalls).toBe(0);
    });
  }

  it('Ergebnis ist deterministisch zum Startwert und unterscheidet sich zwischen Startwerten', () => {
    const a = run({ seed: 21 }).result!;
    const b = run({ seed: 21 }).result!;
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
    const seen = new Set<string>();
    for (let s = 1; s <= 6; s++) seen.add(JSON.stringify(run({ seed: s }).result!.secondary));
    expect(seen.size).toBeGreaterThan(1);
  });

  it('gemischte Bahnfolge ab Stufe 12: jede Bahn einmal, nie dieselbe zweimal hintereinander', () => {
    const seqs = new Set<string>();
    for (const seed of [2, 3, 4, 5, 6]) {
      const order: L.Shape[] = [];
      const out = run({ seed, startLevel: 14, onFrame: (p) => {
        if (p.phase === 'run' && order[order.length - 1] !== p.shape) order.push(p.shape);
      } });
      expect(out.result).not.toBeNull();
      expect(order.length).toBe(6);
      expect(new Set(order).size).toBe(6);
      for (let i = 1; i < order.length; i++) expect(order[i]).not.toBe(order[i - 1]);
      seqs.add(order.join());
    }
    expect(seqs.size).toBeGreaterThan(1);
  });

  it('Stufe wechselt nur zwischen den Bahnen und wird in der Sitzung angepasst', () => {
    const levels: number[] = [];
    let lastBlock = -1;
    run({ seed: 4, onFrame: (p) => {
      if (p.phase === 'run' && p.blockIdx !== lastBlock) {
        lastBlock = p.blockIdx;
        levels.push(p.blockLevel);
      }
    } });
    expect(levels.length).toBe(6);
    expect(levels[0]).toBe(1);
    // bei sehr guten Antworten steigt die Stufe in den ersten Blöcken (Schritt 2 bis zur ersten Umkehr)
    expect(Math.max(...levels)).toBeGreaterThan(1);
    for (let i = 1; i < levels.length; i++) expect(Math.abs(levels[i] - levels[i - 1])).toBeLessThanOrEqual(2);
  });

  it('Blöcke dauern etwa 12–20 s, Kugel bleibt in der Pause mindestens 2 s in der Mitte, Name der nächsten Bahn steht als Text da', () => {
    const w = 1180;
    const h = 820;
    const blockStart: number[] = [];
    const restStart: number[] = [];
    const restEnd: number[] = [];
    let lastPhase = '';
    let restMaxOff = 0;
    const lay = barLayout({ w, h, u: 8.2, dpr: 1 }, false);
    const cy = (lay.world.y0 + lay.world.y1) / 2;
    const restTexts: string[][] = [];
    let cur: string[] = [];
    const out = run({ w, h, seed: 9, onFrame: (p, t) => {
      if (p.phase !== lastPhase) {
        if (p.phase === 'run') blockStart.push(t);
        if (p.phase === 'rest') {
          restStart.push(t);
          cur = [];
        }
        if (lastPhase === 'rest') {
          restEnd.push(t);
          restTexts.push(cur);
        }
        lastPhase = p.phase;
      }
      if (p.phase === 'rest' && t - restStart[restStart.length - 1] > 300) restMaxOff = Math.max(restMaxOff, Math.hypot(p.ball.x - w / 2, p.ball.y - cy));
    } });
    expect(out.result).not.toBeNull();
    expect(blockStart.length).toBe(6);
    // Ruhephasen: die erste vor Block 1 und fünf zwischen den Blöcken, je ≥ 2 s
    expect(restStart.length).toBe(6);
    for (let i = 0; i < restStart.length; i++) expect((restEnd[i] - restStart[i]) / 1000, `Pause ${i}`).toBeGreaterThanOrEqual(2 - 1 / 30); // die erste wird ab dem ersten Bild gemessen
    expect(restMaxOff).toBeLessThan(1.5);
    for (let k = 0; k < 5; k++) {
      // Blockdauer inklusive Ausschwingen: vom Start bis zum Beginn der folgenden Pause
      const dur = (restStart[k + 1] - blockStart[k]) / 1000;
      expect(dur, `Block ${k + 1}`).toBeGreaterThanOrEqual(12);
      expect(dur).toBeLessThanOrEqual(22);
    }
    // Name der nächsten Bahn wurde gezeichnet
    for (const name of [de.feedback.shapeV, de.feedback.shapeD1, de.feedback.shapeD2, de.feedback.shapeCw, de.feedback.shapeCcw]) {
      expect(out.texts.includes(name), name).toBe(true);
    }
    expect(out.texts.includes(de.feedback.shapeH)).toBe(true);
  });

  it('Buchstabe nur im geraden Teil, Kreise nie in den ersten 2 s, weiche Blende, richtige Antwort unter den Buttons', () => {
    let checked = 0;
    let lp = '';
    let onsetS = 0;
    let prevAlpha = 0;
    let maxJump = 0;
    const circleStarts: number[] = [];
    const out = run({ seed: 5, startLevel: 14, onFrame: (p, t) => {
      if (p.lphase === 'show' && lp !== 'show') {
        const s = (p.onsetT - p.blockT0) / 1000;
        onsetS = s;
        const E = p.params.exposureMs / 1000;
        // höchstens ein Bild (1/60 s) nach dem geplanten Beginn
        expect(L.windowIsUniform(p.shape, p.params.period, s - 1 / 60, E)).toBe(true);
        expect(L.windowIsUniform(p.shape, p.params.period, s, E)).toBe(true);
        if (L.isCircle(p.shape)) circleStarts.push(s);
        expect(p.lt).not.toBeNull();
        expect(p.lt!.options.length).toBe(4);
        expect(p.lt!.options[p.lt!.correctIndex]).toBe(p.lt!.correct);
        expect(new Set(p.lt!.options).size).toBe(4);
        expect(p.rNow).toBeGreaterThan(0);
        checked++;
      }
      if (p.lphase === 'show') {
        const a = L.letterAlpha(t - p.onsetT, p.params.exposureMs);
        maxJump = Math.max(maxJump, Math.abs(a - prevAlpha));
        prevAlpha = a;
      } else prevAlpha = 0;
      lp = p.lphase;
      void onsetS;
    } });
    expect(out.result).not.toBeNull();
    expect(checked).toBeGreaterThanOrEqual(15);
    expect(circleStarts.length).toBeGreaterThanOrEqual(4);
    for (const s of circleStarts) expect(s).toBeGreaterThanOrEqual(2.0);
    expect(maxJump).toBeLessThan(0.16);
  });

  it('Kugel bewegt sich stetig: Sprünge pro Bild, Spitzentempo ≤ 25°/s, Bahn bleibt auf der Bühne (3 Bühnen)', () => {
    for (const [w, h] of STAGES) {
      const u = Math.min(w, h) / 100;
      const lay = barLayout({ w, h, u, dpr: 1 }, false);
      let prev: { x: number; y: number } | null = null;
      let prevT = 0;
      let maxDeg = 0;
      let maxLevelSeen = 0;
      const out = run({ w, h, seed: 3, startLevel: 22, onFrame: (p, t) => {
        maxLevelSeen = Math.max(maxLevelSeen, p.blockLevel);
        const r = p.rNow;
        expect(p.ball.x - r).toBeGreaterThanOrEqual(-1);
        expect(p.ball.x + r).toBeLessThanOrEqual(w + 1);
        expect(p.ball.y - r).toBeGreaterThanOrEqual(lay.world.y0 - 1);
        expect(p.ball.y + r).toBeLessThanOrEqual(lay.world.y1 + 1);
        if (prev && t - prevT < 25) {
          const v = Math.hypot(p.ball.x - prev.x, p.ball.y - prev.y) / ((t - prevT) / 1000);
          maxDeg = Math.max(maxDeg, L.pxPerSecToDegPerSec(v, u));
        }
        prev = { x: p.ball.x, y: p.ball.y };
        prevT = t;
      } });
      expect(out.result).not.toBeNull();
      expect(maxLevelSeen).toBeGreaterThanOrEqual(20);
      expect(maxDeg, `${w}x${h}: ${maxDeg.toFixed(1)}°/s`).toBeLessThanOrEqual(L.PEAK_LIMIT_DEG_S);
      expect(maxDeg).toBeGreaterThan(5);
    }
  });

  it('ohne Antwort: Frist ≥ 2,5 s nach Ende der Anzeige, dann Auslassung (kein Absturz, Stufe bleibt 1)', () => {
    const answeredAt: number[] = [];
    let lp = '';
    let onset = 0;
    let expo = 0;
    const out = run({ autoplay: false, seed: 2, onFrame: (p, t) => {
      if (p.lphase === 'show' && lp !== 'show') {
        onset = t;
        expo = p.params.exposureMs;
      }
      if (lp !== 'none' && p.lphase === 'none' && lp !== '') answeredAt.push(t - onset - expo);
      lp = p.lphase;
    } });
    const r = out.result!;
    expect(r).not.toBeNull();
    expect(answeredAt.length).toBeGreaterThanOrEqual(10);
    for (const d of answeredAt) expect(d).toBeGreaterThanOrEqual(2500 - 20);
    expect(r.primary.value).toBe(1);
    const acc = r.secondary.find((m) => m.key === 'accuracy')!;
    expect(acc.value).toBe(0);
    const miss = r.secondary.find((m) => m.key === 'mistakes')!;
    expect(miss.value).toBeGreaterThanOrEqual(10);
    expect(r.secondary.find((m) => m.key === 'rt')).toBeUndefined();
    expect(out.toasts).toContain(de.feedback.late);
    expect(r.tip).toBe('decide');
  });

  it('Schnelltest (?quick=1): drei Bahnen, endet in unter 40 s', () => {
    const order: L.Shape[] = [];
    const out = run({ quick: true, onFrame: (p) => {
      if (p.phase === 'run' && order[order.length - 1] !== p.shape) order.push(p.shape);
    } });
    expect(out.result).not.toBeNull();
    expect(order).toEqual(['horizontal', 'vertical', 'diagUp']);
    expect(out.seconds).toBeLessThan(40);
    expect(out.result!.primary.value).toBeGreaterThanOrEqual(1);
  });

  it('Tipp außerhalb der Buttons oder vor dem Buchstaben zählt nicht; nur die erste Antwort je Buchstabe', () => {
    let first: Exercise | null = null;
    let answers = 0;
    run({ autoplay: false, seed: 6, maxSeconds: 30, onFrame: (p, t, ex) => {
      first = ex;
      if (p.lphase === 'none' && p.phase === 'run') {
        // Tipp in die Leiste ohne aktiven Buchstaben: ignoriert
        const before = JSON.stringify([p.lphase]);
        ex.pointerDown?.({ id: 1, x: 100, y: 800, t, type: 'touch' });
        expect(JSON.stringify([p.lphase])).toBe(before);
      }
      if (p.lphase === 'show' && answers === 0) {
        // Tipp oberhalb der Leiste (auf die Kugel): zählt nicht
        ex.pointerDown?.({ id: 1, x: 500, y: 100, t, type: 'touch' });
        expect(p.lphase).toBe('show');
        const lay = barLayout({ w: 1180, h: 820, u: 8.2, dpr: 1 }, false);
        const R = lay.btns[p.lt!.correctIndex];
        ex.pointerDown?.({ id: 1, x: R.x + R.w / 2, y: R.y + R.h / 2, t, type: 'touch' });
        expect(p.lphase).toBe('none');
        // zweiter Tipp (Doppeltipp) wird ignoriert
        const R2 = lay.btns[(p.lt!.correctIndex + 1) % 4];
        ex.pointerDown?.({ id: 2, x: R2.x + R2.w / 2, y: R2.y + R2.h / 2, t, type: 'touch' });
        answers++;
      }
    } });
    expect(first).not.toBeNull();
    expect(answers).toBe(1);
  });
});
