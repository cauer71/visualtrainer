/**
 * Sequenz-Gedächtnis (Labor): Logik. Übertragen aus labor/test/sequence.test.js (Prototyp) und erweitert: Grenzfälle,
 * Einstellungs-Bereinigung, Sicherheit der Anzeige (Mindestdauer, höchstens 2,5 Wechsel/s, weiche Übergänge), Raster-Layout.
 * Keine festen Zufallswerte (andere Zufallsfolge als im Prototyp), nur Eigenschaften.
 */
import { describe, expect, it } from 'vitest';
import { defaultParams, sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import {
  brightnessAt,
  cellAt,
  cellRect,
  layoutGrid,
  litCells,
  makeSchedule,
  MIN_SHOW_MS,
  MIN_STEP_MS,
  PARAMS,
  pointsFor,
  RAMP_MS,
  SequenceGame,
  sequenceParams,
  tipFor,
  type SequenceParams,
} from '../../src/exercises/labor-sequenz-gedaechtnis/logic';

function make(over: Record<string, unknown> = {}, seed = 1): SequenceGame {
  const p = sequenceParams(sanitizeParams(PARAMS, { ...defaultParams(PARAMS), ...over }));
  const g = new SequenceGame(p, createRng(seed));
  g.begin(0);
  return g;
}

/** Spielt eine Runde; `wrongAt` = Position, an der ein falsches Feld getippt wird */
function playRound(g: SequenceGame, now: number, wrongAt?: number) {
  g.newRound();
  g.beginInput(now);
  let last: ReturnType<SequenceGame['input']> = null;
  for (let i = 0; i < g.seq!.length; i++) {
    const cell = i === wrongAt ? (g.seq![i] + 1) % g.cells : g.seq![i];
    last = g.input(cell, now + 300 * (i + 1));
    if (last?.result === 'error') break;
  }
  return last;
}

describe('Einstellungen', () => {
  it('Standardwerte und Grenzen wie im Prototyp (außer kürzester Leuchtdauer 400 ms)', () => {
    const d = defaultParams(PARAMS);
    expect(d).toMatchObject({ rows: 3, cols: 3, startLength: 2, showMs: 700, gapMs: 250, growth: 'extend', onError: 'same', maxErrors: 3, maxLength: 20, durationS: 0 });
    const show = PARAMS.find((x) => x.key === 'showMs')!;
    expect(show).toMatchObject({ min: MIN_SHOW_MS, max: 3000, step: 50 });
    expect(PARAMS.map((x) => x.key)).toHaveLength(10);
  });

  it('Bereinigung: zu kurze Leuchtdauer wird auf 400 ms angehoben, ungültige Werte → Standard', () => {
    const p = sequenceParams(sanitizeParams(PARAMS, { showMs: 150, rows: 99, growth: 'quatsch', onError: 5 }));
    expect(p.showMs).toBe(400);
    expect(p.rows).toBe(8);
    expect(p.growth).toBe('extend');
    expect(p.onError).toBe('same');
    // direkt (ohne sanitize): fehlende Werte → Standard, zu kurze Leuchtdauer wird trotzdem angehoben
    expect(sequenceParams({}).showMs).toBe(700);
    expect(sequenceParams({ showMs: 150 }).showMs).toBe(MIN_SHOW_MS);
  });
});

describe('Folgen', () => {
  it('Folge hat die verlangte Länge, nie dasselbe Feld direkt hintereinander', () => {
    const g = make({ rows: 3, cols: 3, startLength: 8 }, 5);
    for (let k = 0; k < 50; k++) {
      const s = g.randomSeq(12);
      expect(s).toHaveLength(12);
      for (let i = 1; i < s.length; i++) expect(s[i]).not.toBe(s[i - 1]);
      expect(s.every((c) => c >= 0 && c < 9)).toBe(true);
    }
  });

  it('Ein-Feld-Raster erzeugt keine Endlosschleife', () => {
    const g = new SequenceGame({ ...sequenceParams({}), rows: 1, cols: 1, startLength: 2 }, createRng(1));
    expect(g.randomSeq(3)).toEqual([0, 0, 0]);
  });

  it('kleinstes erlaubtes Raster (2 × 2) und größtes (8 × 10) liefern gültige Felder', () => {
    for (const [rows, cols] of [
      [2, 2],
      [8, 10],
    ]) {
      const g = make({ rows, cols, startLength: 10 }, 3);
      const s = g.newRound();
      expect(s).toHaveLength(10);
      expect(s.every((c) => c >= 0 && c < rows * cols)).toBe(true);
    }
  });

  it('gleicher Startwert → gleiche Folge', () => {
    const a = make({ startLength: 6 }, 99);
    a.newRound();
    const b = make({ startLength: 6 }, 99);
    b.newRound();
    expect(a.seq).toEqual(b.seq);
  });

  it('Zeitplan der Anzeige (Prototyp-Werte)', () => {
    const g = make({ showMs: 600, gapMs: 200, startLength: 3 });
    g.newRound();
    const sch = g.showSchedule();
    expect(sch.steps).toHaveLength(3);
    expect(sch.steps.map((s) => [s.onAt, s.offAt])).toEqual([
      [0, 600],
      [800, 1400],
      [1600, 2200],
    ]);
    expect(sch.totalMs).toBe(2400);
    expect(sch.steps.map((s) => s.cell)).toEqual(g.seq);
  });

  it('Zeitplan ohne Pause reicht bis zum Ende des weichen Ausblendens; leere Folge hat Dauer 0', () => {
    const sch = makeSchedule([1, 2], 500, 0);
    expect(sch.totalMs).toBe(500 + 500 + RAMP_MS);
    expect(makeSchedule([], 500, 100).totalMs).toBe(0);
  });
});

describe('Ablauf', () => {
  it('Eingabe nur in der Eingabephase', () => {
    const g = make();
    expect(g.input(0, 10)).toBeNull();
    g.newRound();
    expect(g.input(0, 10)).toBeNull(); // während der Anzeige
  });

  it('richtige Eingaben: ok, am Ende complete, Länge wächst, „extend“ behält die alte Folge', () => {
    const g = make({ startLength: 2, growth: 'extend' });
    g.newRound();
    g.beginInput(0);
    const s0 = g.seq!.slice();
    expect(g.input(s0[0], 500)?.result).toBe('ok');
    expect(g.input(s0[1], 900)).toEqual({ result: 'complete', length: 2 });
    expect(g.maxCompleted).toBe(2);
    expect(g.completedRounds).toBe(1);
    expect(g.input(0, 1000)).toBeNull(); // nach dem Abschluss keine Eingabe mehr
    g.newRound();
    expect(g.seq).toHaveLength(3);
    expect(g.seq!.slice(0, 2)).toEqual(s0);
    expect(g.seq![2]).not.toBe(g.seq![1]);
  });

  it('Wachstum „fresh“ erzeugt eine neue, längere Folge', () => {
    const g = make({ startLength: 2, growth: 'fresh' }, 3);
    playRound(g, 0);
    g.newRound();
    expect(g.seq).toHaveLength(3);
  });

  it('Fehler: Zähler, erwartetes Feld, Regel „gleiche Länge“', () => {
    const g = make({ startLength: 3, onError: 'same', growth: 'extend' });
    playRound(g, 0); // Länge 3 geschafft
    g.newRound(); // Länge 4
    g.beginInput(0);
    const expected = g.seq![0];
    const res = g.input((expected + 1) % g.cells, 400);
    expect(res).toEqual({ result: 'error', expected });
    expect(g.errors).toBe(1);
    g.newRound();
    expect(g.seq).toHaveLength(4);
  });

  it('Fehler: Regel „eine Länge kürzer“ bleibt über der Startlänge', () => {
    const g = make({ startLength: 3, onError: 'down' });
    playRound(g, 0);
    playRound(g, 0); // 3 und 4 geschafft
    playRound(g, 0, 0); // Länge 5, Fehler
    g.newRound();
    expect(g.seq).toHaveLength(4);
    playRound(g, 0, 0); // Länge 4, Fehler
    g.newRound();
    expect(g.seq).toHaveLength(3);
    playRound(g, 0, 0); // Länge 3, Fehler
    g.newRound();
    expect(g.seq).toHaveLength(3); // nicht unter Startlänge
  });

  it('Fehler: Regel „von vorn“', () => {
    const g = make({ startLength: 2, onError: 'restart' });
    playRound(g, 0);
    playRound(g, 0); // 2, 3 geschafft
    playRound(g, 0, 0); // Länge 4, Fehler
    g.newRound();
    expect(g.seq).toHaveLength(2);
  });

  it('Ende nach der erlaubten Fehlerzahl, 0 heißt unbegrenzt', () => {
    const g = make({ maxErrors: 2, onError: 'same', startLength: 2 });
    playRound(g, 0, 0);
    expect(g.isOver(1000)).toBe(false);
    playRound(g, 0, 0);
    expect(g.isOver(1000)).toBe(true);
    const u = make({ maxErrors: 0, startLength: 2 });
    for (let i = 0; i < 8; i++) playRound(u, 0, 0);
    expect(u.isOver(1000)).toBe(false);
  });

  it('Ende bei der Ziellänge und beim Zeitlimit', () => {
    const g = make({ startLength: 3, maxLength: 5, growth: 'extend', maxErrors: 0 });
    playRound(g, 0);
    playRound(g, 0);
    expect(g.isOver(0)).toBe(false);
    playRound(g, 0);
    expect(g.maxCompleted).toBe(5);
    expect(g.isOver(0)).toBe(true);
    const t = make({ durationS: 30, maxErrors: 0 });
    expect(t.isOver(29999)).toBe(false);
    expect(t.isOver(30000)).toBe(true);
  });
});

describe('Kennzahlen', () => {
  it('Werte wie im Prototyp (Spanne, Runden, Fehler, Genauigkeit, Zeit pro Eingabe, Gesamtzeit)', () => {
    const g = make({ startLength: 2, onError: 'same', maxErrors: 0 });
    playRound(g, 0); // 2 richtige Eingaben (je 300 ms)
    playRound(g, 0, 1); // Länge 3: 1 richtig, 1 falsch
    g.finish(12500);
    const s = g.summary();
    expect(s.span).toBe(2);
    expect(s.rounds).toBe(1);
    expect(s.errors).toBe(1);
    expect(s.accuracy).toBe(75);
    expect(s.rtMean).toBe(300);
    expect(s.totalMs).toBe(12500);
    expect(s.inputs).toHaveLength(4);
  });

  it('ohne Eingaben: Spanne 0, keine NaN, Genauigkeit und Zeit null (werden weggelassen)', () => {
    const g = make();
    const s = g.summary();
    expect(s.span).toBe(0);
    expect(s.accuracy).toBeNull();
    expect(s.rtMean).toBeNull();
    expect(s.totalMs).toBeNull();
    g.finish(500);
    expect(g.summary().totalMs).toBe(500);
  });

  it('nur falsche Eingaben: Genauigkeit 0, Zeit null', () => {
    const g = make({ startLength: 2 });
    playRound(g, 0, 0);
    const s = g.summary();
    expect(s.accuracy).toBe(0);
    expect(s.rtMean).toBeNull();
    expect(Number.isNaN(s.span)).toBe(false);
  });

  it('Punkte und Tipps', () => {
    expect(pointsFor(5, 4)).toBe(120);
    const p: SequenceParams = sequenceParams({});
    const base = { span: 0, rounds: 0, errors: 0, accuracy: null, rtMean: null, totalMs: null, inputs: [] };
    expect(tipFor({ ...base }, p)).toBe('few');
    expect(tipFor({ ...base, span: 6, rounds: 5, accuracy: 95, errors: 1 }, p)).toBe('harder');
    expect(tipFor({ ...base, span: 4, rounds: 3, accuracy: 70, errors: 3, rtMean: 2500 }, p)).toBe('slow');
    expect(tipFor({ ...base, span: 2, rounds: 1, accuracy: 60, errors: 2, rtMean: 900 }, p)).toBe('chunk');
    expect(tipFor({ ...base, span: 6, rounds: 5, accuracy: 80, errors: 3, rtMean: 900 }, p)).toBe('compare');
  });
});

describe('Sicherheit der Anzeige: kein Blinken, weiche Übergänge', () => {
  it('Kleinste Einstellungen: Leuchtdauer ≥ 400 ms und Feldbeginn zu Feldbeginn ≥ 400 ms (höchstens 2,5 Wechsel pro Sekunde)', () => {
    const show = PARAMS.find((x) => x.key === 'showMs')!;
    const gap = PARAMS.find((x) => x.key === 'gapMs')!;
    if (show.type !== 'number' || gap.type !== 'number') throw new Error('Typ');
    expect(show.min).toBeGreaterThanOrEqual(400);
    expect(show.min + gap.min).toBeGreaterThanOrEqual(MIN_STEP_MS);
    const sch = makeSchedule([1, 2, 3, 4], show.min, gap.min);
    for (let i = 1; i < sch.steps.length; i++) {
      expect(sch.steps[i].onAt - sch.steps[i - 1].onAt).toBeGreaterThanOrEqual(400);
      expect(sch.steps[i].offAt - sch.steps[i].onAt).toBeGreaterThanOrEqual(400);
    }
    expect(1000 / (sch.steps[1].onAt - sch.steps[0].onAt)).toBeLessThanOrEqual(2.5);
    expect(RAMP_MS).toBeGreaterThanOrEqual(100);
  });

  it('Helligkeit springt nie: zwischen 1-ms-Schritten höchstens kleine Änderung, Übergang dauert ≥ 100 ms, Spitze erreicht 1', () => {
    for (const [show, gap] of [
      [400, 0],
      [700, 250],
      [3000, 1500],
    ]) {
      const sch = makeSchedule([3, 5, 3, 1], show, gap);
      let maxJump = 0;
      let peak = 0;
      let prev: Map<number, number> | null = null;
      for (let t = -10; t <= sch.totalMs + 200; t += 1) {
        const now = new Map(litCells(sch, t).map((l) => [l.cell, l.level]));
        const sum = (m: Map<number, number>) => [...m.values()].reduce((a, b) => a + b, 0);
        if (prev) maxJump = Math.max(maxJump, Math.abs(sum(now) - sum(prev)));
        for (const v of now.values()) peak = Math.max(peak, v);
        prev = now;
      }
      // Anstieg von 0 auf 1 in RAMP_MS ≥ 100 ms: pro Millisekunde höchstens ≈ 1,5 / 120
      expect(maxJump).toBeLessThan(0.02);
      expect(peak).toBeCloseTo(1, 2);
    }
  });

  it('Ein Feld ist vor dem Beginn und lange nach dem Ende dunkel, mittendrin ganz hell', () => {
    const step = { cell: 4, onAt: 1000, offAt: 1700 };
    expect(brightnessAt(step, 900)).toBe(0);
    expect(brightnessAt(step, 1000)).toBe(0);
    expect(brightnessAt(step, 1000 + RAMP_MS)).toBeCloseTo(1, 5);
    expect(brightnessAt(step, 1500)).toBe(1);
    expect(brightnessAt(step, 1700 + RAMP_MS)).toBeCloseTo(0, 5);
    expect(brightnessAt(step, 2500)).toBe(0);
  });

  it('Bei Pause 0 überblendet das nächste Feld das vorige (nie beide ganz dunkel zwischen den Feldern)', () => {
    const sch = makeSchedule([1, 2], 400, 0);
    for (let t = 0; t <= 800; t += 5) {
      const total = litCells(sch, t).reduce((a, l) => a + l.level, 0);
      if (t >= RAMP_MS) expect(total).toBeGreaterThan(0.45);
    }
  });
});

describe('Raster-Layout', () => {
  const boxes: Array<[number, number]> = [
    [1180, 700],
    [820, 1000],
    [360, 560],
    [300, 200],
  ];
  it('Felder liegen ganz im Bereich, quadratisch, ohne Überlappung (alle Rastergrößen, Quer- und Hochformat)', () => {
    for (const [bw, bh] of boxes) {
      for (const rows of [2, 3, 5, 8]) {
        for (const cols of [2, 3, 6, 10]) {
          const L = layoutGrid({ x: 10, y: 20, w: bw, h: bh }, rows, cols);
          for (let i = 0; i < rows * cols; i++) {
            const r = cellRect(L, i);
            expect(r.x).toBeGreaterThanOrEqual(10 - 1e-6);
            expect(r.y).toBeGreaterThanOrEqual(20 - 1e-6);
            expect(r.x + r.s).toBeLessThanOrEqual(10 + bw + 1e-6);
            expect(r.y + r.s).toBeLessThanOrEqual(20 + bh + 1e-6);
          }
          const a = cellRect(L, 0);
          const b = cellRect(L, 1);
          expect(b.x - (a.x + a.s)).toBeGreaterThanOrEqual(L.gap - 1e-6);
        }
      }
    }
  });

  it('Auf dem Handy bleibt auch das größte Raster antippbar (Felder ≥ 24 px)', () => {
    const L = layoutGrid({ x: 12, y: 80, w: 366, h: 600 }, 8, 10);
    expect(L.cell).toBeGreaterThanOrEqual(24);
  });

  it('cellAt: trifft die Feldmitte, Zwischenräume gehören zum nächsten Feld, außerhalb −1', () => {
    const L = layoutGrid({ x: 0, y: 0, w: 600, h: 600 }, 3, 3);
    for (let i = 0; i < 9; i++) {
      const r = cellRect(L, i);
      expect(cellAt(L, r.x + r.s / 2, r.y + r.s / 2)).toBe(i);
    }
    expect(cellAt(L, -50, -50)).toBe(-1);
    expect(cellAt(L, 10_000, 10)).toBe(-1);
    const a = cellRect(L, 0);
    expect(cellAt(L, a.x + a.s + L.gap / 2 - 0.5, a.y + a.s / 2)).toBe(0);
  });
});
