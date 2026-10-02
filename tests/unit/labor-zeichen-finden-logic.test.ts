/**
 * Zeichen finden (Labor): Logik. Übertragen aus labor/test/findchars.test.js (Prototyp) und erweitert: Zielzeichen reihum,
 * Zeiten ab Anzeige, Grenzfälle, Einstellungs-Bereinigung, Raster-Anpassung an die Bühne (Zeichen ≥ 22 px, Hochformat).
 * Keine festen Zufallswerte (andere Zufallsfolge als im Prototyp), nur Eigenschaften.
 */
import { describe, expect, it } from 'vitest';
import { defaultParams, sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import {
  bestCellRaw,
  DONE_H,
  findCellAt,
  findCellXY,
  findParams,
  FindSession,
  fitGrid,
  GLYPH_FACTOR,
  layoutFind,
  MIN_CELL_PX,
  MIN_GLYPH_PX,
  PARAMS,
  pointsFor,
  SETS,
  tipFor,
  type CharSet,
  type FindSummary,
} from '../../src/exercises/labor-zeichen-finden/logic';

function make(over: Record<string, unknown> = {}, seed = 1): FindSession {
  const p = findParams(sanitizeParams(PARAMS, { ...defaultParams(PARAMS), ...over }));
  const s = new FindSession(p, { rng: createRng(seed) });
  s.beginBoard(0);
  return s;
}
const targetsOf = (s: FindSession): number[] => s.board!.cells.map((c, i) => (c.isTarget ? i : -1)).filter((i) => i >= 0);

describe('Einstellungen', () => {
  it('Standardwerte und Grenzen wie im Prototyp', () => {
    expect(defaultParams(PARAMS)).toEqual({ set: 'pbdq', rows: 5, cols: 8, density: 20, cellCm: 2.5, rounds: 5 });
    expect(PARAMS.find((x) => x.key === 'rows')).toMatchObject({ min: 2, max: 12, step: 1 });
    expect(PARAMS.find((x) => x.key === 'cols')).toMatchObject({ min: 2, max: 16, step: 1 });
    expect(PARAMS.find((x) => x.key === 'density')).toMatchObject({ min: 5, max: 50, step: 5 });
    expect(PARAMS.find((x) => x.key === 'cellCm')).toMatchObject({ min: 1, max: 6, step: 0.5 });
    expect(PARAMS.find((x) => x.key === 'rounds')).toMatchObject({ min: 1, max: 20, step: 1 });
    expect([...((PARAMS.find((x) => x.key === 'set') as unknown as { options: string[] }).options)]).toEqual(['pbdq', 'digits', 'similar', 'mixed']);
  });

  it('Bereinigung: ungültige Werte → Standard bzw. in die Grenzen', () => {
    expect(findParams(sanitizeParams(PARAMS, { set: 'quatsch', rows: 99, cols: 0, density: 33, cellCm: 'x', rounds: -4 }))).toEqual({
      set: 'pbdq',
      rows: 12,
      cols: 2,
      density: 35,
      cellCm: 2.5,
      rounds: 1,
    });
    expect(findParams({})).toEqual({ set: 'pbdq', rows: 5, cols: 8, density: 20, cellCm: 2.5, rounds: 5 });
  });
});

describe('Tafel', () => {
  it('Zahl der Felder und Zielzeichen, Ablenker sind andere Zeichen des Vorrats', () => {
    const s = make({ rows: 5, cols: 8, density: 20, set: 'pbdq' }, 4);
    const b = s.board!;
    expect(b.cells).toHaveLength(40);
    expect(b.nTargets).toBe(8);
    expect(targetsOf(s)).toHaveLength(8);
    for (const c of b.cells) {
      if (c.isTarget) expect(c.ch).toBe(b.target);
      else expect(c.ch).not.toBe(b.target);
      expect(['b', 'd', 'p', 'q']).toContain(c.ch);
    }
  });

  it('mindestens ein Zielzeichen und nie alle Felder, auch im kleinsten und größten Raster', () => {
    const s = make({ rows: 2, cols: 2, density: 5 });
    expect(s.board!.nTargets).toBe(1);
    const t = make({ rows: 2, cols: 2, density: 50, set: 'digits' });
    expect(t.board!.nTargets).toBeLessThanOrEqual(3);
    const big = make({ rows: 12, cols: 16, density: 50 });
    expect(big.board!.cells).toHaveLength(192);
    expect(big.board!.nTargets).toBe(96);
  });

  it('Zeichenvorräte', () => {
    for (const set of ['digits', 'similar', 'mixed', 'pbdq'] as CharSet[]) {
      const s = make({ set }, 2);
      for (const c of s.board!.cells) {
        expect(c.ch).toHaveLength(1);
        expect(SETS[set]).toContain(c.ch);
      }
    }
  });

  it('Zielzeichen wechselt reihum: nie zweimal hintereinander, jedes Zeichen des Vorrats kommt gleich oft vor', () => {
    for (const set of ['pbdq', 'digits', 'mixed'] as CharSet[]) {
      const pool = SETS[set];
      // ein neuer Beutel pro Durchgang durch den Vorrat: in jedem Block von `pool.length` Zielzeichen kommt jedes einmal vor
      const t = new FindSession(findParams({ set }), { rng: createRng(8) });
      const run: string[] = [];
      for (let i = 0; i < pool.length * 3; i++) run.push(i === 0 ? t.board!.target : t.nextTarget());
      // der erste Block wurde mit dem Zielzeichen der ersten Tafel begonnen (gleicher Beutel)
      for (let blk = 0; blk < 3; blk++) {
        const block = run.slice(blk * pool.length, (blk + 1) * pool.length);
        expect(new Set(block).size, `${set} Block ${blk}`).toBe(pool.length);
      }
      for (let i = 1; i < run.length; i++) expect(run[i]).not.toBe(run[i - 1]);
    }
  });

  it('gleicher Startwert → gleiche Tafel', () => {
    expect(make({}, 7).board!.cells.map((c) => c.ch).join('')).toBe(make({}, 7).board!.cells.map((c) => c.ch).join(''));
  });
});

describe('Ablauf', () => {
  it('Antippen: gefunden, falsch, schon bearbeitete Felder ignorieren, ungültiger Index', () => {
    const s = make({ rows: 4, cols: 4, density: 25, rounds: 2 }, 6);
    const ts = targetsOf(s);
    const wrongIdx = s.board!.cells.findIndex((c) => !c.isTarget);
    expect(s.tap(ts[0], 100)?.type).toBe('found');
    expect(s.tap(ts[0], 150)).toBeNull();
    expect(s.tap(wrongIdx, 200)?.type).toBe('wrong');
    expect(s.tap(wrongIdx, 250)).toBeNull();
    expect(s.found).toBe(1);
    expect(s.falseTaps).toBe(1);
    expect(s.tap(999, 300)).toBeNull();
    expect(s.tap(-1, 300)).toBeNull();
  });

  it('alle gefunden: nächste Tafel, am Ende fertig; Zeit ab beginBoard', () => {
    const s = make({ rows: 3, cols: 4, density: 25, rounds: 2 }, 3);
    let t = 1000;
    const expected = ['next_board', 'finished'];
    for (const exp of expected) {
      const ts = targetsOf(s);
      let last: ReturnType<FindSession['tap']> = null;
      for (const i of ts) {
        t += 500;
        last = s.tap(i, t);
      }
      expect(last?.type).toBe(exp);
      if (exp === 'next_board') {
        expect(s.board!.startedAt).toBeNull(); // Zeit läuft erst, wenn die Tafel sichtbar ist
        s.beginBoard(t + 700);
        t += 700;
      }
    }
    expect(s.finished).toBe(true);
    expect(s.tap(0, t + 10)).toBeNull();
    expect(s.giveUp(t + 10)).toBeNull();
    expect(s.trials).toHaveLength(2);
    expect(s.trials[0].end).toBe('complete');
    expect(s.trials.every((tr) => tr.ms > 0)).toBe(true);
    expect(s.lastBoard).not.toBeNull();
  });

  it('„Fertig“: übrige Zielzeichen zählen als übersehen; Kennzahlen', () => {
    const s = make({ rows: 4, cols: 5, density: 20, rounds: 1 }, 9);
    const ts = targetsOf(s);
    s.tap(ts[0], 400);
    s.tap(ts[1], 800);
    const wrong = s.board!.cells.findIndex((c) => !c.isTarget);
    s.tap(wrong, 900);
    const res = s.giveUp(2000);
    expect(res?.type).toBe('finished');
    const sum = s.summary();
    expect(sum.found).toBe(2);
    expect(sum.missed).toBe(ts.length - 2);
    expect(sum.falseTaps).toBe(1);
    expect(sum.accuracy).toBeCloseTo((100 * 2) / (ts.length + 1), 1);
    expect(sum.perTarget).toBe(1000);
    expect(sum.totalMs).toBe(2000);
    expect(s.giveUp(3000)).toBeNull();
  });

  it('Kennzahlen ohne Treffer: perTarget null, Genauigkeit 0 (kein NaN); ohne Tafel keine Zeit', () => {
    const s = make({ rounds: 1 });
    expect(s.summary().totalMs).toBeNull();
    expect(s.summary().accuracy).toBeNull();
    s.giveUp(500);
    const sum = s.summary();
    expect(sum.found).toBe(0);
    expect(sum.accuracy).toBe(0);
    expect(sum.perTarget).toBeNull();
    expect(sum.totalMs).toBe(500);
  });

  it('Raster je Tafel kommt aus der Anpassung an die Bühne', () => {
    let grid = { rows: 3, cols: 4 };
    const s = new FindSession(findParams({ rows: 8, cols: 12 }), { rng: createRng(2), grid: () => grid });
    expect(s.board!.cells).toHaveLength(12);
    grid = { rows: 2, cols: 2 };
    s.beginBoard(0);
    for (const i of targetsOf(s)) s.tap(i, 100);
    expect(s.board!.cells).toHaveLength(4);
    expect(s.board!.rows).toBe(2);
  });

  it('Punkte und Tipps', () => {
    expect(pointsFor(8, 2)).toBe(70);
    expect(pointsFor(0, 9)).toBe(0);
    const base: FindSummary = { found: 40, missed: 0, falseTaps: 0, accuracy: 100, perTarget: 1500, totalMs: 60000, trials: [] };
    expect(tipFor({ ...base, falseTaps: 8, accuracy: 83 })).toBe('false');
    expect(tipFor({ ...base, missed: 9, accuracy: 82 })).toBe('missed');
    expect(tipFor(base)).toBe('harder');
    expect(tipFor({ ...base, accuracy: 90, falseTaps: 1, perTarget: 5000 })).toBe('slow');
    expect(tipFor({ ...base, accuracy: 90, falseTaps: 1, perTarget: 2000 })).toBe('compare');
  });
});

describe('Raster-Layout: lesbar auf jeder Bühne', () => {
  /** Bühne → Bereich für das Raster (wie in index.ts: Rand, Kopf, Fertig-Knopf) */
  const boxFor = (w: number, h: number) => ({ x: 10, y: 44 + 60, w: w - 20, h: Math.max(40, h - 44 - 60 - DONE_H - 14 - 10) });
  const stages: Array<[string, number, number]> = [
    ['Tablet quer', 1180, 820],
    ['Tablet hoch', 820, 1180],
    ['Handy hoch', 390, 844],
    ['Handy quer', 844, 390],
    ['klein (Intro-Film)', 520, 358],
  ];

  it('nach fitGrid: Felder ≥ 36 px, Zeichen ≥ 22 px, Raster liegt im Bereich (alle Einstellungen, alle Bühnen)', () => {
    for (const [name, w, h] of stages) {
      if (w < 400 && h < 400) continue;
      const box = boxFor(w, h);
      for (const rows of [2, 5, 8, 12]) {
        for (const cols of [2, 8, 12, 16]) {
          for (const wanted of [38, 95, 228]) {
            const g = fitGrid(box, rows, cols);
            expect(g.rows).toBeGreaterThanOrEqual(2);
            expect(g.cols).toBeGreaterThanOrEqual(2);
            expect(g.rows).toBeLessThanOrEqual(rows);
            expect(g.cols).toBeLessThanOrEqual(cols);
            const L = layoutFind(box, g.rows, g.cols, wanted);
            const okMin = bestCellRaw(box, g.rows, g.cols).cell >= MIN_CELL_PX - 1e-6;
            if (okMin || (g.rows === 2 && g.cols === 2)) {
              expect(L.cell, `${name} ${rows}x${cols} w${wanted}`).toBeGreaterThanOrEqual(Math.min(MIN_CELL_PX, bestCellRaw(box, g.rows, g.cols).cell) - 1e-6);
              expect(L.cell * GLYPH_FACTOR, `${name} ${rows}x${cols} w${wanted}`).toBeGreaterThanOrEqual(MIN_GLYPH_PX - 0.5);
            }
            expect(L.x0).toBeGreaterThanOrEqual(box.x - 1e-6);
            expect(L.y0).toBeGreaterThanOrEqual(box.y - 1e-6);
            expect(L.x0 + L.cell * L.dispCols).toBeLessThanOrEqual(box.x + box.w + 1e-6);
            expect(L.y0 + L.cell * L.dispRows).toBeLessThanOrEqual(box.y + box.h + 1e-6);
            expect(L.cell).toBeLessThanOrEqual(Math.max(wanted, MIN_CELL_PX) + 1e-6);
          }
        }
      }
    }
  });

  it('Handy hochkant: Das Standardraster 5 × 8 wird hochkant gedreht dargestellt, bleibt vollständig und lesbar', () => {
    const box = boxFor(390, 844);
    const g = fitGrid(box, 5, 8);
    expect(g.reduced).toBe(false);
    const L = layoutFind(box, 5, 8, 95);
    expect(L.transposed).toBe(true);
    expect(L.dispCols).toBe(5);
    expect(L.dispRows).toBe(8);
    expect(L.cell * GLYPH_FACTOR).toBeGreaterThanOrEqual(MIN_GLYPH_PX);
  });

  it('Das größte Raster 12 × 16 wird auf dem Handy verkleinert (reduced), ist aber nie unter 36 px pro Feld', () => {
    const box = boxFor(390, 844);
    const g = fitGrid(box, 12, 16);
    expect(g.reduced).toBe(true);
    expect(bestCellRaw(box, g.rows, g.cols).cell).toBeGreaterThanOrEqual(MIN_CELL_PX);
  });

  it('auf großer Bühne bleibt das Raster unverändert', () => {
    const box = boxFor(1180, 820);
    expect(fitGrid(box, 5, 8)).toEqual({ rows: 5, cols: 8, reduced: false });
    expect(fitGrid(box, 12, 16).reduced).toBe(false);
  });

  it('Zuordnung Feld ↔ Bildpunkt ist umkehrbar (normal und gedreht), Punkte außerhalb → −1', () => {
    for (const [w, h] of [
      [1180, 820],
      [390, 844],
    ]) {
      const box = boxFor(w, h);
      const L = layoutFind(box, 5, 8, 95);
      for (let i = 0; i < 40; i++) {
        const xy = findCellXY(L, i);
        expect(findCellAt(L, xy.x + L.cell / 2, xy.y + L.cell / 2)).toBe(i);
        expect(findCellAt(L, xy.x + 1, xy.y + 1)).toBe(i);
        expect(findCellAt(L, xy.x + L.cell - 1, xy.y + L.cell - 1)).toBe(i);
      }
      expect(findCellAt(L, L.x0 - 3, L.y0 + 5)).toBe(-1);
      expect(findCellAt(L, L.x0 + L.cell * L.dispCols + 3, L.y0 + 5)).toBe(-1);
      expect(findCellAt(L, L.x0 + 5, L.y0 - 3)).toBe(-1);
    }
  });
});
