/**
 * Buchstabentafel (Labor): reine Logik. Übertragen aus labor/test/chart.test.js (Labor-Prototyp) und erweitert:
 * Zeiten in ms, Koordinaten in cm, Zufall über createRng (kein Math.random), keine festen Zufallswerte.
 */
import { describe, expect, it } from 'vitest';
import { defaultParams, sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import {
  beatIntervalMs,
  ADVANCE,
  chartParams,
  ChartSession,
  type ChartSummary,
  layoutChart,
  MAX_BPM,
  MAX_CHANGES_PER_S,
  MIN_STEP_MS,
  PARAMS,
  pointsFor,
  round,
  tipFor,
} from '../../src/exercises/labor-buchstabentafel/logic';

type Over = Record<string, unknown>;

const params = (over: Over = {}) => chartParams(sanitizeParams(PARAMS, { ...defaultParams(PARAMS), ...over }));
const make = (over: Over = {}, seed = 1) => new ChartSession(params(over), { rng: createRng(seed) });

describe('Buchstabentafel: Layout (aus dem Prototyp)', () => {
  it('passt, Anzahl und Reihenfolge der Positionen, symmetrisch zentriert', () => {
    const p = params({ rows: 2, cols: 3, groupSize: 2, sizeCm: 2, letterGapCm: 0.4, groupGapCm: 3 });
    const lay = layoutChart(p, 60, 34);
    expect(lay.fits).toBe(true);
    expect(lay.noticeable).toBe(false);
    expect(lay.scale).toBe(1);
    expect(lay.letters.length).toBe(2 * 3 * 2);
    expect(lay.letters.slice(0, 3).map((l) => [l.g, l.k])).toEqual([
      [0, 0],
      [0, 1],
      [1, 0],
    ]);
    const xs = lay.letters.map((l) => l.x);
    const ys = lay.letters.map((l) => l.y);
    expect(Math.abs((Math.min(...xs) + Math.max(...xs)) / 2 - 30)).toBeLessThan(1e-9);
    expect(Math.abs((Math.min(...ys) + Math.max(...ys)) / 2 - 17)).toBeLessThan(1e-9);
  });

  it('zu große Tafel wird verkleinert und bleibt im Feld', () => {
    const p = params({ rows: 8, cols: 8, groupSize: 5, sizeCm: 4, groupGapCm: 5 });
    const lay = layoutChart(p, 60, 34);
    expect(lay.fits).toBe(false);
    expect(lay.noticeable).toBe(true);
    expect(lay.scale).toBeLessThan(1);
    for (const l of lay.letters) {
      expect(l.x).toBeGreaterThan(0);
      expect(l.x).toBeLessThan(60);
      expect(l.y).toBeGreaterThan(0);
      expect(l.y).toBeLessThan(34);
    }
  });
});

describe('Buchstabentafel: Gruppen und Leseordnung (aus dem Prototyp)', () => {
  it('Zeichen innerhalb einer Gruppe sind verschieden', () => {
    const s = make({ rows: 3, cols: 3, groupSize: 5 }, 3);
    expect(s.groups.length).toBe(9);
    for (const g of s.groups) {
      expect(g.length).toBe(5);
      expect(new Set(g).size).toBe(5);
    }
    const d = make({ symbols: 'digits', groupSize: 6 }, 3);
    for (const g of d.groups) for (const c of g) expect(c).toMatch(/^[1-9]$/);
  });

  it('Leseordnung: Gruppe für Gruppe und zeichenweise', () => {
    const a = make({ rows: 1, cols: 2, groupSize: 3, order: 'groups' });
    expect(a.steps.map((s) => `${s.g}:${s.k}`)).toEqual(['0:0', '0:1', '0:2', '1:0', '1:1', '1:2']);
    const b = make({ rows: 1, cols: 2, groupSize: 3, order: 'letterwise' });
    expect(b.steps.map((s) => `${s.g}:${s.k}`)).toEqual(['0:0', '1:0', '0:1', '1:1', '0:2', '1:2']);
  });
});

describe('Buchstabentafel: Eigenes Tempo und Takt (aus dem Prototyp)', () => {
  it('eigenes Tempo: Start, Schritte, Ende, Kennzahlen', () => {
    const s = make({ rows: 1, cols: 2, groupSize: 2, pace: 'self' });
    expect(s.steps.length).toBe(4);
    expect(s.current()).toBeNull();
    expect(s.advance(1000)?.type).toBe('started');
    expect(s.current()).toEqual({ g: 0, k: 0 });
    expect(s.advance(1500)?.type).toBe('step');
    expect(s.advance(2100)?.type).toBe('step');
    expect(s.advance(2500)?.type).toBe('step');
    expect(s.advance(3100)?.type).toBe('finished');
    expect(s.advance(3200)).toBeNull();
    const sum = s.summary();
    expect(sum.symbols).toBe(4);
    expect(sum.totalS).toBe(2.1);
    expect(sum.totalMs).toBe(2100);
    expect(sum.perMin).toBe(114.3);
    expect(sum.stepMean).toBe(525);
    expect(sum.trials.map((t) => t.msOnSymbol).join(',')).toBe('500,600,400,600');
    expect(sum.stepCv!).toBeGreaterThan(0);
    expect(sum.stepCv!).toBeLessThan(30);
    expect(sum.self).toBe(true);
    expect(sum.bpm).toBeNull();
  });

  it('Takt: Schläge im Takt, Ende nach dem letzten Zeichen (Gesamtzeit ab dem ersten markierten Zeichen)', () => {
    const s = make({ rows: 1, cols: 2, groupSize: 2, pace: 'beat', bpm: 60 });
    s.start(0);
    expect(s.update(999)).toBe(false);
    expect(s.update(1000)).toBe(true);
    expect(s.current()).toEqual({ g: 0, k: 0 });
    s.update(2000);
    s.update(3000);
    s.update(4000);
    expect(s.current()).toEqual({ g: 1, k: 1 });
    expect(s.finished).toBe(false);
    s.update(5000);
    expect(s.finished).toBe(true);
    expect(s.endedAt).toBe(5000);
    const sum = s.summary();
    // Abweichung vom Prototyp (dort 5 s einschließlich der Taktlänge vor dem ersten Schlag): 4 Zeichen × 1 s
    expect(sum.totalS).toBe(4);
    expect(sum.totalMs).toBe(4000);
    expect(sum.bpm).toBe(60);
    expect(sum.self).toBe(false);
    expect(sum.stepMean).toBeNull();
    expect(sum.stepCv).toBeNull();
    expect(sum.perMin).toBe(60);
  });

  it('eigenes Tempo ignoriert den Takt-Pfad und umgekehrt', () => {
    const a = make({ pace: 'self' });
    a.start(0);
    expect(a.update(5000)).toBe(false);
    const b = make({ pace: 'beat' });
    expect(b.advance(100)).toBeNull();
  });
});

describe('Buchstabentafel: Erweiterungen und Grenzfälle', () => {
  it('Doppeltipp im eigenen Tempo: ein Tipp unter 340 ms nach dem vorigen wird ignoriert, der erste Tipp startet immer', () => {
    const s = make({ rows: 1, cols: 1, groupSize: 3, pace: 'self' });
    expect(s.advance(1000)?.type).toBe('started');
    expect(s.advance(1000 + MIN_STEP_MS - 1)?.type).toBe('ignored');
    expect(s.pos).toBe(0);
    expect(s.advance(1000 + MIN_STEP_MS)?.type).toBe('step');
    expect(s.pos).toBe(1);
    expect(s.advance(1000 + MIN_STEP_MS + 100)?.type).toBe('ignored');
    expect(s.summary().symbols).toBe(3);
    // höchstens ≈ 2,9 Markenwechsel pro Sekunde
    expect(1000 / MIN_STEP_MS).toBeLessThan(3);
  });

  it('Sicherheit: höchstens 140 Schläge pro Minute = unter 2,5 Markenwechsel pro Sekunde', () => {
    const bpm = PARAMS.find((d) => d.key === 'bpm') as { max: number; min: number };
    expect(bpm.max).toBe(MAX_BPM);
    expect(bpm.max / 60).toBeLessThanOrEqual(MAX_CHANGES_PER_S);
    expect(beatIntervalMs(140)).toBeGreaterThan(400);
    expect(params({ bpm: 9999 }).bpm).toBe(140);
    expect(params({ bpm: 1 }).bpm).toBe(20);
  });

  it('Streuung/Mittel erst ab zwei Zeitabständen; bei einem Zeichen nur der Abstand, kein NaN', () => {
    const one = make({ rows: 1, cols: 1, groupSize: 1, pace: 'self' });
    one.advance(0);
    one.advance(800);
    const a = one.summary();
    expect(a.symbols).toBe(1);
    expect(a.stepMean).toBe(800);
    expect(a.stepSd).toBeNull();
    expect(a.stepCv).toBeNull();
    const two = make({ rows: 1, cols: 1, groupSize: 2, pace: 'self' });
    two.advance(0);
    two.advance(500);
    two.advance(1100);
    const b = two.summary();
    expect(b.stepSd).toBe(71);
    expect(b.stepCv).toBe(12.9);
  });

  it('nicht beendet: Gesamtzeit und Tempo sind null statt NaN', () => {
    const s = make({ pace: 'self' });
    s.advance(0);
    s.advance(500);
    const sum = s.summary();
    expect(sum.totalS).toBeNull();
    expect(sum.totalMs).toBeNull();
    expect(sum.perMin).toBeNull();
    const b = make({ pace: 'beat' });
    expect(b.summary().totalS).toBeNull();
    expect(b.doneCount()).toBe(0);
    expect(b.progress()).toBe(0);
  });

  it('Fortschritt und Zahl der gelesenen Zeichen laufen von 0 bis zur Zahl der Schritte', () => {
    const s = make({ rows: 1, cols: 1, groupSize: 3, pace: 'self' });
    expect(s.doneCount()).toBe(0);
    s.advance(0);
    expect(s.doneCount()).toBe(0);
    s.advance(500);
    expect(s.doneCount()).toBe(1);
    s.advance(1000);
    s.advance(1500);
    expect(s.finished).toBe(true);
    expect(s.doneCount()).toBe(3);
    expect(s.progress()).toBe(1);
  });

  it('Takt: verspäteter Aufruf holt verpasste Schläge nach, die Zeit bleibt im Takt', () => {
    const s = make({ rows: 1, cols: 2, groupSize: 3, pace: 'beat', bpm: 120 });
    s.start(0);
    expect(s.update(1600)).toBe(true); // Schläge bei 500, 1000, 1500
    expect(s.pos).toBe(2);
    expect(s.stamps).toEqual([500, 1000, 1500]);
    expect(s.startedAt).toBe(500);
  });

  it('Layout: eine Verkleinerung unter 10 % wird nicht erwähnt (noticeable erst unter 90 %)', () => {
    const p = params({ rows: 1, cols: 1, groupSize: 3, sizeCm: 2, letterGapCm: 0.4 });
    const w = 2 * 3 * ADVANCE + 0.8; // Breite der Gruppe in cm (unverkleinert)
    const eff = w + 0.35 * 2; // Breite der Gruppe plus Überstand breiter Buchstaben
    const small = layoutChart(p, (eff / 0.96) * 0.97, 34); // knapp zu schmal: Verkleinerung ≈ 3 %
    expect(small.fits).toBe(false);
    expect(small.scale).toBeGreaterThan(0.9);
    expect(small.noticeable).toBe(false);
    const tight = layoutChart(p, (eff / 0.96) * 0.85, 34);
    expect(tight.noticeable).toBe(true);
  });

  it('Layout: Mindestgröße und Grenzfälle (eine Gruppe, ein Zeichen, riesige Tafel)', () => {
    const one = layoutChart(params({ rows: 1, cols: 1, groupSize: 1 }), 60, 34);
    expect(one.letters.length).toBe(1);
    expect(one.letters[0].x).toBeCloseTo(30, 9);
    expect(one.letters[0].y).toBeCloseTo(17, 9);
    const huge = layoutChart(params({ rows: 8, cols: 8, groupSize: 6, sizeCm: 8, letterGapCm: 3, groupGapCm: 10 }), 10.3, 22);
    expect(huge.scale).toBeGreaterThan(0);
    expect(huge.fits).toBe(false);
    for (const l of huge.letters) {
      expect(Number.isFinite(l.x) && Number.isFinite(l.y)).toBe(true);
      expect(l.x).toBeGreaterThan(0);
      expect(l.x).toBeLessThan(10.3);
      expect(l.y).toBeGreaterThan(0);
      expect(l.y).toBeLessThan(22);
    }
  });

  it('Layout: Zeichenabstände entsprechen den Einstellungen (unverkleinert)', () => {
    const p = params({ rows: 1, cols: 2, groupSize: 3, sizeCm: 2, letterGapCm: 0.4, groupGapCm: 3 });
    const lay = layoutChart(p, 60, 34);
    expect(lay.scale).toBe(1);
    const adv = 2 * ADVANCE;
    const [a, b, c, d] = lay.letters;
    expect(b.x - a.x).toBeCloseTo(adv + 0.4, 9);
    expect(c.x - b.x).toBeCloseTo(adv + 0.4, 9);
    expect(d.x - c.x).toBeCloseTo(adv + 3, 9);
    expect(a.y).toBe(b.y);
  });

  it('gleicher Startwert macht die Tafel reproduzierbar, anderer nicht', () => {
    const seq = (seed: number) => make({ rows: 3, cols: 3, groupSize: 4 }, seed).groups.map((g) => g.join('')).join('|');
    expect(seq(5)).toBe(seq(5));
    expect(seq(5)).not.toBe(seq(6));
  });

  it('Einstellungen werden bereinigt (Zahlen geklemmt, Auswahl nur erlaubt)', () => {
    const p = chartParams(sanitizeParams(PARAMS, { rows: 99, cols: 0, groupSize: 3.4, symbols: 'x', sizeCm: 0.1, letterGapCm: 9, groupGapCm: -1, order: 'quer', pace: 'schnell', bpm: 61, sound: 'laut' }));
    expect(p).toEqual({ rows: 8, cols: 1, groupSize: 3, symbols: 'letters', sizeCm: 0.8, letterGapCm: 3, groupGapCm: 0.5, order: 'groups', pace: 'self', bpm: 62, sound: 'yes' });
    expect(chartParams({})).toEqual(chartParams(defaultParams(PARAMS)));
  });

  it('PARAMS: Schlüssel, Grenzen und Standard wie im Prototyp, dazu „Ton“ (neutral); höchstens drei in der Kurzfassung', () => {
    expect(PARAMS.map((d) => d.key)).toEqual(['rows', 'cols', 'groupSize', 'symbols', 'sizeCm', 'letterGapCm', 'groupGapCm', 'order', 'pace', 'bpm', 'sound']);
    const num = (k: string) => PARAMS.find((d) => d.key === k) as { min: number; max: number; step: number; default: number };
    expect(num('rows')).toMatchObject({ min: 1, max: 8, step: 1, default: 4 });
    expect(num('cols')).toMatchObject({ min: 1, max: 8, step: 1, default: 4 });
    expect(num('groupSize')).toMatchObject({ min: 1, max: 6, step: 1, default: 3 });
    expect(num('sizeCm')).toMatchObject({ min: 0.8, max: 8, step: 0.2, default: 2 });
    expect(num('letterGapCm')).toMatchObject({ min: 0, max: 3, step: 0.1, default: 0.4 });
    expect(num('groupGapCm')).toMatchObject({ min: 0.5, max: 10, step: 0.5, default: 3 });
    expect(num('bpm')).toMatchObject({ min: 20, max: 140, step: 2, default: 60 });
    expect(PARAMS.filter((d) => d.neutral).map((d) => d.key)).toEqual(['sound']);
    expect(PARAMS.filter((d) => d.summary).length).toBeLessThanOrEqual(3);
  });

  it('round: nicht endliche Werte werden null', () => {
    expect(round(Number.NaN)).toBeNull();
    expect(round(undefined)).toBeNull();
    expect(round(1.25, 1)).toBe(1.3);
  });

  it('persönlicher Tipp je nach Verlauf', () => {
    const base: ChartSummary = { symbols: 48, totalS: 40, totalMs: 40000, perMin: 72, self: true, stepMean: 800, stepSd: 150, stepCv: 19, bpm: null, trials: [] };
    expect(tipFor({ ...base, self: false, stepMean: null, stepCv: null, bpm: 60 })).toBe('beat');
    expect(tipFor({ ...base, stepMean: 350 })).toBe('quick');
    expect(tipFor({ ...base, stepCv: 55 })).toBe('uneven');
    expect(tipFor(base)).toBe('compare');
    expect(tipFor({ ...base, stepMean: null, stepCv: null })).toBe('compare');
  });

  it('Punkte nur zur Motivation: 5 je Zeichen', () => {
    expect(pointsFor(48)).toBe(240);
    expect(pointsFor(-3)).toBe(0);
  });
});
