import { describe, expect, it } from 'vitest';
import { createFormatter } from '../../src/core/format';
import { createRng } from '../../src/core/rng';
import type { Exercise, ExerciseContext, ExerciseOptionValue, ExerciseResult, PointerInfo } from '../../src/core/types';
import { vierZieleWechsel } from '../../src/exercises/vier-ziele-wechsel';
import { science } from '../../src/exercises/vier-ziele-wechsel/science';
import { de, it as itTexts } from '../../src/exercises/vier-ziele-wechsel/texts';
import {
  applyMove,
  ARROW,
  BEAT_CHOICES,
  BEAT_DEFAULT,
  BEAT_MS,
  BEAT_START_MS,
  BEAT_WINDOW_MS,
  beatMsFor,
  beatOffset,
  CELL_PER_FONT,
  cellAt,
  cellMaxFor,
  cellRect,
  changedParams,
  CHART_ORDER,
  CORNERS,
  DIRECTIONS,
  directionOf,
  evalRound,
  fitGrid,
  gridOfPos,
  isClean,
  isStable,
  layoutFor,
  layoutForLevel,
  LETTERS,
  LEVELS,
  levelOf,
  makeChart,
  makeCharts,
  MAX_LEVEL,
  MIN_CELL_PX,
  MIN_FOR_DIRECTION,
  MIN_LEVEL,
  moveFor,
  onBeat,
  PARAM_KEYS,
  paramsFor,
  posOfGrid,
  pointsFor,
  reachedLevel,
  Reader,
  readingSequence,
  roundPlan,
  roundRecord,
  SIZES,
  summarize,
  tipFor,
  type Cell,
  type Corner,
  type Direction,
  type FixedOrder,
  type Layout,
  type Order,
  type Scan,
  type StepRec,
} from '../../src/exercises/vier-ziele-wechsel/logic';

/** Bühnen: Feld in CSS-px unter der Kopfleiste (Tablet quer 1180×820, hoch 820×1180, Handy 390×844 minus Kopfleiste) */
const VIEWPORTS = [
  { name: 'Tablet quer', w: 1180, h: 752, tablet: true },
  { name: 'Tablet hoch', w: 820, h: 1112, tablet: true },
  { name: 'Handy hoch', w: 390, h: 776, tablet: false },
  { name: 'Handy quer', w: 760, h: 300, tablet: false },
  { name: 'Intro-Film', w: 960, h: 520, tablet: false },
];

const cellKey = (c: Cell): string => `${c.chart}:${c.pos}`;

// ---------------------------------------------------------------------------
describe('Stufentabelle', () => {
  it('hat 17 Stufen mit laufender Nummer', () => {
    expect(LEVELS).toHaveLength(MAX_LEVEL);
    expect(MAX_LEVEL).toBe(17);
    LEVELS.forEach((l, i) => expect(l.level).toBe(i + 1));
    expect(MIN_LEVEL).toBe(1);
  });

  it('jeder Schritt ändert genau einen Parameter', () => {
    for (let i = 1; i < LEVELS.length; i++) {
      const ch = changedParams(LEVELS[i - 1], LEVELS[i]);
      expect(ch, `Stufe ${i} → ${i + 1}`).toHaveLength(1);
    }
  });

  it('Reihenfolge der Änderungen: Abstand, Tafelgröße, Schrift, Führung, 5×5, Reihenfolge, … Buchstabenvorrat zuletzt', () => {
    const order = LEVELS.slice(1).map((l, i) => changedParams(LEVELS[i], l)[0]);
    expect(order).toEqual(['reach', 'grid', 'size', 'guide', 'grid', 'order', 'reach', 'gran', 'scan', 'order', 'size', 'guide', 'order', 'size', 'chars', 'chars']);
    // alle acht Parameter kommen vor
    expect(new Set(order).size).toBe(8);
    expect([...new Set(order)].sort()).toEqual([...PARAM_KEYS].sort());
  });

  it('jeder Schritt macht in seinem Parameter schwerer, nie leichter', () => {
    const guideRank = { letter: 0, chart: 1, none: 2 } as const;
    const orderRank = { reading: 0, cw: 1, zigzag: 2, varying: 3 } as const;
    const scanRank = { rows: 0, cols: 1 } as const;
    const charsRank = { distinct: 0, similar: 1, mixed: 2 } as const;
    for (let i = 1; i < LEVELS.length; i++) {
      const a = LEVELS[i - 1];
      const b = LEVELS[i];
      expect(b.size).toBeGreaterThanOrEqual(a.size);
      expect(b.cols * b.rows).toBeGreaterThanOrEqual(a.cols * a.rows);
      expect(b.reach).toBeGreaterThanOrEqual(a.reach);
      expect(b.gran).toBeGreaterThanOrEqual(a.gran);
      expect(orderRank[b.order]).toBeGreaterThanOrEqual(orderRank[a.order]);
      expect(scanRank[b.scan]).toBeGreaterThanOrEqual(scanRank[a.scan]);
      expect(guideRank[b.guide]).toBeGreaterThanOrEqual(guideRank[a.guide]);
      expect(charsRank[b.chars]).toBeGreaterThanOrEqual(charsRank[a.chars]);
    }
  });

  it('Stufe 1: großer Buchstabenring-Einstieg (3×3, Leserichtung der Tafeln, zeilenweise, nach jedem Buchstaben wechseln, deutlich verschiedene Buchstaben)', () => {
    const p = paramsFor(1);
    expect(p).toMatchObject({ size: 0, cols: 3, rows: 3, gran: 1, order: 'reading', scan: 'rows', guide: 'letter', chars: 'distinct' });
    expect(p.reach).toBeLessThan(paramsFor(MAX_LEVEL).reach);
  });

  it('Stufe 1 liest die Tafeln in Leserichtung: oben links, oben rechts, unten links, unten rechts (nicht im Uhrzeigersinn)', () => {
    expect(readingSequence(3, 1, paramsFor(1).order as FixedOrder).slice(0, 4).map((c) => c.chart)).toEqual([0, 1, 2, 3]);
    expect(CHART_ORDER.reading).toEqual([0, 1, 2, 3]);
    expect(CHART_ORDER.cw).not.toEqual(CHART_ORDER.reading);
  });

  it('5×5 wie in den Quellen ab der Mitte der Treppe (Stufe 6), Stufe 1 darf kleiner sein', () => {
    expect(LEVELS.findIndex((l) => l.cols === 5 && l.rows === 5) + 1).toBe(6);
    for (const l of LEVELS.slice(5)) expect([l.cols, l.rows]).toEqual([5, 5]);
    expect(paramsFor(1).cols * paramsFor(1).rows).toBeLessThan(25);
  });

  it('schwerste Stufe: kleinste Schrift, 5×5, ganz in den Ecken, wechselnd, spaltenweise, keine Führung, Groß-/Kleinbuchstaben und Ziffern', () => {
    const p = paramsFor(MAX_LEVEL);
    expect(p).toMatchObject({ size: SIZES.length - 1, cols: 5, rows: 5, reach: 1, gran: 2, order: 'varying', scan: 'cols', guide: 'none', chars: 'mixed' });
  });

  it('Führung wird abgebaut: Buchstabenring → Tafelring → keine; „wechselnd“ gibt es nur ohne Führung (die Person wählt die Reihenfolge)', () => {
    const guides = LEVELS.map((l) => l.guide);
    expect(guides[0]).toBe('letter');
    expect(guides[MAX_LEVEL - 1]).toBe('none');
    expect(guides.indexOf('chart')).toBeGreaterThan(guides.indexOf('letter'));
    expect(guides.indexOf('none')).toBeGreaterThan(guides.lastIndexOf('chart'));
    for (const l of LEVELS) if (l.order === 'varying') expect(l.guide, `Stufe ${l.level}`).toBe('none');
    const orders = LEVELS.map((l) => l.order);
    expect(orders.indexOf('cw')).toBeGreaterThan(orders.lastIndexOf('reading'));
    expect(orders.indexOf('zigzag')).toBeGreaterThan(orders.lastIndexOf('cw'));
    expect(orders.indexOf('varying')).toBeGreaterThan(orders.lastIndexOf('zigzag'));
    // spaltenweise erst, wenn „über Kreuz“ und „wechselnd“ noch ausstehen
    expect(LEVELS.findIndex((l) => l.scan === 'cols')).toBeGreaterThan(5);
  });

  it('levelOf klemmt auf 1..17', () => {
    expect(paramsFor(0)).toBe(LEVELS[0]);
    expect(paramsFor(99)).toBe(LEVELS[MAX_LEVEL - 1]);
    expect(levelOf(3.9)).toBe(3);
  });
});

// ---------------------------------------------------------------------------
describe('Leseregel: ein Buchstabe von jeder Tafel im Wechsel', () => {
  /** Erwartete Folge nach der Regel, unabhängig vom Automaten gerechnet */
  const expectedSeq = (n: number, gran: number, order: readonly Corner[]): Cell[] => {
    const out: Cell[] = [];
    for (let b = 0; b * gran < n; b++)
      for (const chart of order) for (let k = 0; k < gran && b * gran + k < n; k++) out.push({ chart, pos: b * gran + k });
    return out;
  };

  it('Tafelreihenfolgen: Leserichtung oben links → oben rechts → unten links → unten rechts; Uhrzeigersinn …→ unten rechts → unten links; über Kreuz', () => {
    expect(CHART_ORDER.reading).toEqual([0, 1, 2, 3]);
    expect(CHART_ORDER.cw).toEqual([0, 1, 3, 2]);
    expect(CHART_ORDER.zigzag).toEqual([0, 3, 1, 2]);
  });

  it('Beispiel Leserichtung, nach jedem Buchstaben: Position p der Tafeln oben links, oben rechts, unten links, unten rechts, dann p+1', () => {
    const seq = readingSequence(3, 1, 'reading').map(cellKey);
    expect(seq).toEqual(['0:0', '1:0', '2:0', '3:0', '0:1', '1:1', '2:1', '3:1', '0:2', '1:2', '2:2', '3:2']);
  });

  it('Beispiel Uhrzeigersinn, nach jedem Buchstaben: Position p der Tafeln 1,2,3,4, dann p+1', () => {
    const seq = readingSequence(3, 1, 'cw').map(cellKey);
    expect(seq).toEqual(['0:0', '1:0', '3:0', '2:0', '0:1', '1:1', '3:1', '2:1', '0:2', '1:2', '3:2', '2:2']);
  });

  it('Beispiel Zickzack, nach 2 Buchstaben: zwei aus der Tafel, dann die nächste', () => {
    const seq = readingSequence(4, 2, 'zigzag').map(cellKey);
    expect(seq).toEqual(['0:0', '0:1', '3:0', '3:1', '1:0', '1:1', '2:0', '2:1', '0:2', '0:3', '3:2', '3:3', '1:2', '1:3', '2:2', '2:3']);
  });

  for (const order of ['reading', 'cw', 'zigzag'] as const) {
    for (const gran of [1, 2]) {
      it(`${order}, Wechsel nach ${gran}: Reihenfolge der Taps stimmt für alle Tafelgrößen, jedes Feld genau einmal`, () => {
        for (const n of [4, 6, 9, 12, 16, 20, 25]) {
          const got = readingSequence(n, gran, order);
          expect(got, `n=${n}`).toEqual(expectedSeq(n, gran, CHART_ORDER[order]));
          expect(got).toHaveLength(4 * n);
          expect(new Set(got.map(cellKey)).size).toBe(4 * n);
          // innerhalb einer Tafel immer in Leserichtung
          for (const c of CORNERS) expect(got.filter((x) => x.chart === c).map((x) => x.pos)).toEqual(Array.from({ length: n }, (_, i) => i));
        }
      });
    }
  }

  it('Reader: nur der erwartete Buchstabe zählt, alles andere bleibt ein Fehler ohne den Stand zu ändern', () => {
    const r = new Reader(9, 1, 'cw');
    expect(r.expected()).toEqual([{ chart: 0, pos: 0 }]);
    expect(r.accept({ chart: 1, pos: 0 })).toBe(false); // falsche Tafel
    expect(r.accept({ chart: 0, pos: 1 })).toBe(false); // richtige Tafel, falsche Position
    expect(r.count).toBe(0);
    expect(r.accept({ chart: 0, pos: 0 })).toBe(true);
    expect(r.accept({ chart: 0, pos: 0 })).toBe(false); // schon gelesen
    expect(r.next()).toEqual({ chart: 1, pos: 0 });
    expect(r.accept({ chart: 3, pos: 0 })).toBe(false); // Tafel 3 kommt erst nach Tafel 2
    expect(r.done[0][0]).toBe(true);
    expect(r.done[1][0]).toBe(false);
    expect(r.count).toBe(1);
    expect(r.last).toEqual({ chart: 0, pos: 0 });
  });

  it('Reader bei Wechsel nach 2: mitten im Block geht es in derselben Tafel weiter', () => {
    const r = new Reader(4, 2, 'cw');
    r.accept({ chart: 0, pos: 0 });
    expect(r.midBlock).toBe(true);
    expect(r.expected()).toEqual([{ chart: 0, pos: 1 }]);
    expect(r.accept({ chart: 1, pos: 0 })).toBe(false);
    r.accept({ chart: 0, pos: 1 });
    expect(r.midBlock).toBe(false);
    expect(r.expected()).toEqual([{ chart: 1, pos: 0 }]);
  });

  it('ungerade Tafelgröße bei Wechsel nach 2: der letzte Durchlauf hat nur einen Buchstaben je Tafel', () => {
    const seq = readingSequence(5, 2, 'cw');
    expect(seq).toHaveLength(20);
    expect(seq.slice(-4).map(cellKey)).toEqual(['0:4', '1:4', '3:4', '2:4']);
  });

  it('wechselnde Reihenfolge: am Blockanfang ist jede noch offene Tafel erlaubt, danach nur noch die übrigen', () => {
    const r = new Reader(4, 1, 'varying');
    expect(r.expected().map(cellKey)).toEqual(['0:0', '1:0', '2:0', '3:0']);
    expect(r.next()).toBeNull(); // keine eindeutige nächste Tafel
    expect(r.accept({ chart: 2, pos: 0 })).toBe(true);
    expect(r.expected().map(cellKey)).toEqual(['0:0', '1:0', '3:0']);
    expect(r.accept({ chart: 2, pos: 1 })).toBe(false); // diese Tafel ist in diesem Durchlauf schon dran gewesen
    expect(r.accept({ chart: 3, pos: 1 })).toBe(false); // Position p + 1 erst, wenn alle vier Tafeln Position p haben
    r.accept({ chart: 0, pos: 0 });
    r.accept({ chart: 3, pos: 0 });
    r.accept({ chart: 1, pos: 0 });
    expect(r.passIndex).toBe(1);
    expect(r.expected().map(cellKey)).toEqual(['0:1', '1:1', '2:1', '3:1']);
  });

  it('wechselnde Reihenfolge (Wechsel nach 1 und 2), beliebige Wahl über 100 Startwerte: jedes Feld genau einmal, jeder Durchlauf liest jede Tafel einmal', () => {
    for (const gran of [1, 2]) {
      for (let seed = 1; seed <= 100; seed++) {
        const rng = createRng(seed);
        const n = [4, 9, 12, 25][seed % 4];
        const r = new Reader(n, gran, 'varying');
        const seq: Cell[] = [];
        let guard = 0;
        while (!r.finished && guard++ < 1000) {
          const exp = r.expected();
          expect(exp.length).toBeGreaterThan(0);
          const pick = rng.pick(exp);
          expect(r.accept(pick)).toBe(true);
          seq.push(pick);
        }
        expect(seq).toHaveLength(4 * n);
        expect(new Set(seq.map(cellKey)).size).toBe(4 * n);
        // Durchläufe: je gran·4 Buchstaben, jede Tafel genau gran Mal am Stück
        const per = 4 * gran;
        for (let b = 0; b * gran < n; b++) {
          const pass = seq.slice(b * per, (b + 1) * per);
          const len = Math.min(gran, n - b * gran);
          expect(pass).toHaveLength(4 * len);
          const charts: number[] = [];
          for (let k = 0; k < pass.length; k += len) {
            const block = pass.slice(k, k + len);
            expect(new Set(block.map((x) => x.chart)).size).toBe(1);
            expect(block.map((x) => x.pos)).toEqual(Array.from({ length: len }, (_, i) => b * gran + i));
            charts.push(block[0].chart);
          }
          expect([...charts].sort()).toEqual([0, 1, 2, 3]);
        }
      }
    }
  });

  it('Reader endet nach 4·n Buchstaben und erwartet danach nichts mehr', () => {
    const r = new Reader(2, 1, 'zigzag');
    for (const c of readingSequence(2, 1, 'zigzag')) r.accept(c);
    expect(r.finished).toBe(true);
    expect(r.count).toBe(r.total);
    expect(r.expected()).toEqual([]);
    expect(r.next()).toBeNull();
    expect(r.accept({ chart: 0, pos: 0 })).toBe(false);
  });

  it('die erste Tafel jeder festen Reihenfolge ist oben links', () => {
    for (const o of ['reading', 'cw', 'zigzag'] as const) expect(new Reader(9, 1, o).next()).toEqual({ chart: 0, pos: 0 });
  });
});

// ---------------------------------------------------------------------------
describe('Buchstaben der Tafeln', () => {
  it('vier verschieden gemischte Tafeln, nie derselbe Buchstabe zweimal hintereinander, nur aus dem Vorrat der Stufe', () => {
    for (const chars of ['distinct', 'similar', 'mixed'] as const) {
      for (let seed = 1; seed <= 30; seed++) {
        const charts = makeCharts(createRng(seed), chars, 25);
        expect(charts).toHaveLength(4);
        for (const ch of charts) {
          expect(ch).toHaveLength(25);
          for (const l of ch) expect(LETTERS[chars]).toContain(l);
          for (let i = 1; i < ch.length; i++) expect(ch[i]).not.toBe(ch[i - 1]);
        }
        expect(new Set(charts.map((c) => c.join(''))).size).toBe(4);
      }
    }
  });

  it('deterministisch mit demselben Startwert, andere Startwerte ergeben andere Tafeln', () => {
    expect(makeChart(createRng(5), 'distinct', 16)).toEqual(makeChart(createRng(5), 'distinct', 16));
    expect(makeChart(createRng(5), 'distinct', 16)).not.toEqual(makeChart(createRng(6), 'distinct', 16));
  });

  it('Vorräte: deutlich verschieden, ähnlich B D P R E F, gemischt mit Klein- und Großbuchstaben und Ziffern', () => {
    expect(LETTERS.similar).toEqual(['B', 'D', 'P', 'R', 'E', 'F']);
    expect(LETTERS.distinct.every((l) => /^[A-Z]$/.test(l))).toBe(true);
    expect(new Set(LETTERS.distinct).size).toBe(LETTERS.distinct.length);
    // verwechselbare Zeichen (I, l, 1, O, 0) nur, wo sie nicht mit Ziffern kollidieren
    expect(LETTERS.mixed.some((l) => /^[a-z]$/.test(l))).toBe(true);
    expect(LETTERS.mixed.some((l) => /^[A-Z]$/.test(l))).toBe(true);
    expect(LETTERS.mixed.some((l) => /^[0-9]$/.test(l))).toBe(true);
    for (const bad of ['I', 'l', '1', '0']) expect(LETTERS.mixed).not.toContain(bad);
    for (const k of Object.keys(LETTERS) as Array<keyof typeof LETTERS>) expect(new Set(LETTERS[k]).size).toBe(LETTERS[k].length);
    expect(paramsFor(15).chars).toBe('distinct');
    expect(paramsFor(16).chars).toBe('similar');
    expect(paramsFor(17).chars).toBe('mixed');
  });
});

// ---------------------------------------------------------------------------
describe('Anpassungsregel 90 / 75 %', () => {
  it('≥ 90 % mit gleichmäßiger Zeit → schwerer', () => {
    expect(moveFor({ accuracy: 0.9, stable: true })).toBe('harder');
    expect(moveFor({ accuracy: 1, stable: true })).toBe('harder');
  });
  it('≥ 90 % aber unruhige Zeit → gleich', () => {
    expect(moveFor({ accuracy: 1, stable: false })).toBe('same');
  });
  it('75–89 % → gleich; < 75 % → leichter', () => {
    expect(moveFor({ accuracy: 0.89, stable: true })).toBe('same');
    expect(moveFor({ accuracy: 0.75, stable: true })).toBe('same');
    expect(moveFor({ accuracy: 0.74, stable: true })).toBe('easier');
    expect(moveFor({ accuracy: 0, stable: false })).toBe('easier');
  });
  it('Stufe bleibt zwischen 1 und 17', () => {
    expect(applyMove(1, 'easier')).toBe(1);
    expect(applyMove(17, 'harder')).toBe(17);
    expect(applyMove(5, 'harder')).toBe(6);
    expect(applyMove(5, 'easier')).toBe(4);
    expect(applyMove(5, 'same')).toBe(5);
  });
  it('stabile Zeit: Quartilsabstand höchstens 60 % des Medians, mindestens 4 Werte', () => {
    expect(isStable([800, 820, 900, 950, 870, 910])).toBe(true);
    expect(isStable([500, 2500, 600, 2800, 700, 3000])).toBe(false);
    expect(isStable([800, 900, 850])).toBe(false);
  });
  it('erreichte Stufe: höchste Stufe mit ≥ 75 %, sonst eine unter der niedrigsten', () => {
    expect(reachedLevel([], 4)).toBe(4);
    expect(reachedLevel([{ level: 3, accuracy: 0.92 }, { level: 4, accuracy: 0.6 }, { level: 3, accuracy: 0.8 }], 3)).toBe(3);
    expect(reachedLevel([{ level: 3, accuracy: 0.92 }, { level: 4, accuracy: 0.8 }, { level: 5, accuracy: 0.5 }], 4)).toBe(4);
    expect(reachedLevel([{ level: 1, accuracy: 0.5 }], 1)).toBe(1);
    expect(reachedLevel([{ level: 6, accuracy: 0.5 }, { level: 5, accuracy: 0.4 }], 4)).toBe(4);
  });
  it('Grenzfälle der Runde: 36 Buchstaben mit 3 Fehlern = 92 % → schwerer; mit 5 Fehlern = 88 % → gleich; mit 13 Fehlern = 73 % → leichter', () => {
    const run = (errors: number) => {
      const steps = Array.from({ length: 36 }, (_, i) => mk(i, CHART_ORDER.cw[i % 4], 700 + (i % 5) * 20, i < errors ? 1 : 0));
      return moveFor(evalRound(steps));
    };
    expect(run(3)).toBe('harder');
    expect(run(5)).toBe('same');
    expect(run(13)).toBe('easier');
  });
});

// ---------------------------------------------------------------------------
// Datensätze

function mk(index: number, chart: number, rt: number | null, errors = 0, o: Partial<StepRec> = {}): StepRec {
  const from = index === 0 ? null : ((chart + 1) % 4 as Corner);
  return { round: 0, index, level: 1, chart: chart as Corner, pos: index >> 2, from, gran: 1, rt: index === 0 ? null : rt, errors, ...o };
}

describe('Fehler- und Treffer-Zählung', () => {
  it('Treffer = gelesene Buchstaben, Fehler = falsche Tipps davor, Genauigkeit = Treffer / Tipps', () => {
    const steps = [mk(0, 0, null), mk(1, 1, 700), mk(2, 3, 800, 2), mk(3, 2, 900), mk(4, 0, 1000, 1)];
    const st = evalRound(steps);
    expect(st.hits).toBe(5);
    expect(st.errors).toBe(3);
    expect(st.taps).toBe(8);
    expect(st.accuracy).toBeCloseTo(5 / 8, 9);
  });

  it('Zeit je Buchstabe: der erste Tipp der Runde und Buchstaben mit Fehler davor gehen nicht in die Mittel ein', () => {
    const steps = [mk(0, 0, null), mk(1, 1, 700), mk(2, 3, 5000, 1), mk(3, 2, 900)];
    expect(steps.map(isClean)).toEqual([false, true, false, true]);
    expect(evalRound(steps).meanMs).toBe(800);
    const s = summarize(steps);
    expect(s.meanMs).toBe(800);
    expect(s.medianMs).toBe(800);
  });

  it('leere Runde: 0 % und keine Zeit; eine Runde nur mit dem ersten Tipp hat keine Zeit', () => {
    const e = evalRound([]);
    expect(e.accuracy).toBe(0);
    expect(Number.isNaN(e.meanMs)).toBe(true);
    expect(Number.isNaN(evalRound([mk(0, 0, null)]).meanMs)).toBe(true);
    expect(evalRound([mk(0, 0, null)]).accuracy).toBe(1);
  });

  it('Rundendatensatz trägt Stufe, Dauer, Treffer, Fehler und mittlere Zeit', () => {
    const steps = [mk(0, 0, null), mk(1, 1, 600, 1), mk(2, 3, 800), mk(3, 2, 1000)];
    expect(roundRecord(steps, 2, 7, 41000)).toEqual({ round: 2, level: 7, durationMs: 41000, hits: 4, errors: 1, meanMs: 900 });
  });

  it('Punkte wachsen mit der Stufe, nur zur Motivation', () => {
    expect(pointsFor(5, 800)).toBeGreaterThan(pointsFor(1, 800));
    expect(pointsFor(1, null)).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
describe('Richtungsklassifikation', () => {
  it('→ ← ↓ ↑ ↘ ↖ ↗ ↙ aus Ecke zu Ecke (0 oben links, 1 oben rechts, 2 unten links, 3 unten rechts)', () => {
    const want: Array<[number, number, Direction]> = [
      [0, 1, 'right'],
      [2, 3, 'right'],
      [1, 0, 'left'],
      [3, 2, 'left'],
      [0, 2, 'down'],
      [1, 3, 'down'],
      [2, 0, 'up'],
      [3, 1, 'up'],
      [0, 3, 'downRight'],
      [3, 0, 'upLeft'],
      [2, 1, 'upRight'],
      [1, 2, 'downLeft'],
    ];
    for (const [a, b, d] of want) expect(directionOf(a, b), `${a}→${b}`).toBe(d);
    expect(directionOf(2, 2)).toBeNull();
    expect(want.map(([, , d]) => ARROW[d]).join('')).toBe('→→←←↓↓↑↑↘↖↗↙');
  });

  it('jede der 8 Klassen kommt vor; die 12 Wechsel verteilen sich 2+2+2+2+1+1+1+1', () => {
    const count = new Map<Direction, number>();
    for (const a of CORNERS) for (const b of CORNERS) if (a !== b) count.set(directionOf(a, b)!, (count.get(directionOf(a, b)!) ?? 0) + 1);
    expect(count.size).toBe(8);
    expect(DIRECTIONS.map((d) => count.get(d))).toEqual([2, 2, 2, 2, 1, 1, 1, 1]);
  });

  it('Leserichtung: → ↙ → ↖; Uhrzeigersinn: → ↓ ← ↑; über Kreuz: ↘ ↑ ↙ ↑ (aus den Tafelwechseln einer gelesenen Runde)', () => {
    const dirs = (order: FixedOrder) => {
      const seq = readingSequence(2, 1, order);
      const out: Direction[] = [];
      for (let i = 1; i < 5; i++) out.push(directionOf(seq[i - 1].chart, seq[i].chart)!);
      return out;
    };
    expect(dirs('reading')).toEqual(['right', 'downLeft', 'right', 'upLeft']);
    expect(dirs('cw')).toEqual(['right', 'down', 'left', 'up']);
    expect(dirs('zigzag')).toEqual(['downRight', 'up', 'downLeft', 'up']);
  });
});

// ---------------------------------------------------------------------------
describe('Zusammenfassung', () => {
  /** gelesene Runde als Datensätze: feste Reihenfolge, Zeiten aus `rt(i)` */
  function roundSteps(n: number, gran: number, order: FixedOrder, rt: (i: number, from: number | null, to: number) => number, round = 0, level = 1): StepRec[] {
    const seq = readingSequence(n, gran, order);
    return seq.map((c, i) => {
      const from = i === 0 ? null : seq[i - 1].chart;
      return { round, index: i, level, chart: c.chart, pos: c.pos, from, gran, rt: i === 0 ? null : rt(i, from, c.chart), errors: 0 };
    });
  }

  it('erste und letzte Hälfte getrennt (Mittelwert ab 3 gültigen Zeiten)', () => {
    const steps = roundSteps(9, 1, 'cw', (i) => (i < 18 ? 700 : 900));
    const s = summarize(steps);
    expect(s.total).toBe(36);
    expect(s.firstHalfMs).toBeCloseTo(700, 6);
    expect(s.lastHalfMs).toBe(900);
    expect(s.firstHalfTotal).toBe(18);
    expect(s.lastHalfTotal).toBe(18);
    expect(s.firstHalfOk).toBe(18);
    // zu wenige gültige Zeiten in der ersten Hälfte
    const few = steps.map((x, i) => (i < 18 ? { ...x, errors: 1 } : x));
    const sf = summarize(few);
    expect(Number.isNaN(sf.firstHalfMs)).toBe(true);
    expect(sf.firstHalfOk).toBe(0);
    // ungerade Zahl: der mittlere Buchstabe gehört zu keiner Hälfte
    const odd = summarize(steps.slice(0, 35));
    expect(odd.firstHalfTotal + odd.lastHalfTotal).toBe(34);
  });

  it('Tafelwechsel nach Richtung: Mittel erst ab genug gültigen Wechseln (Standard 8), schnellste und langsamste Richtung', () => {
    // Uhrzeigersinn: 0→1 (→), 1→3 (↓), 3→2 (←), 2→0 (↑) je Durchlauf; 3×3 → 9 Durchläufe, 8 gültige Wechsel je Klasse
    const steps = roundSteps(10, 1, 'cw', (_i, from, to) => (from === 0 && to === 1 ? 600 : from === 3 && to === 2 ? 1000 : 800));
    const s = summarize(steps);
    expect(MIN_FOR_DIRECTION).toBe(8);
    const get = (d: Direction) => s.directions.find((x) => x.dir === d)!;
    expect(get('right').n).toBe(10);
    expect(get('right').meanMs).toBe(600);
    expect(get('left').meanMs).toBe(1000);
    expect(get('down').meanMs).toBe(800);
    expect(get('up').n).toBe(9); // der Wechsel 2→0 des letzten Durchlaufs fehlt (Runde endet)
    expect(get('up').meanMs).toBe(800);
    expect(Number.isNaN(get('upLeft').meanMs)).toBe(true);
    expect(get('upLeft').n).toBe(0);
    expect(s.fastest).toBe('right');
    expect(s.slowest).toBe('left');
    expect(s.directions).toHaveLength(8);
    // mit Schwelle 3 genauso, mit Schwelle 11 nirgends genug
    expect(summarize(steps, 11).directions.every((d) => Number.isNaN(d.meanMs))).toBe(true);
    expect(summarize(steps, 11).fastest).toBeNull();
  });

  it('Wechsel in dieselbe Tafel (Wechsel nach 2) zählen in keiner Richtung; der erste Buchstabe einer Runde auch nicht', () => {
    const steps = roundSteps(4, 2, 'cw', () => 700);
    const s = summarize(steps, 1);
    const inDir = s.directions.reduce((a, d) => a + d.n, 0);
    const changes = steps.filter((x) => x.from !== null && x.from !== x.chart).length;
    expect(inDir).toBe(changes);
    expect(inDir).toBeLessThan(steps.length - 1);
  });

  it('Sprungkosten beim Wechsel nach 2: Zeit beim Tafelwechsel gegen Zeit innerhalb derselben Tafel', () => {
    const steps = roundSteps(12, 2, 'zigzag', (_i, from, to) => (from === to ? 450 : 750));
    const s = summarize(steps);
    expect(s.jump).not.toBeNull();
    expect(s.jump!.switchMs).toBe(750);
    expect(s.jump!.withinMs).toBe(450);
    expect(s.jump!.switchN).toBeGreaterThanOrEqual(8);
    expect(s.jump!.withinN).toBeGreaterThanOrEqual(8);
    expect(s.jump!.switchN + s.jump!.withinN).toBe(steps.length - 1);
    // Wechsel nach 1: keine Sprungkosten
    expect(summarize(roundSteps(9, 1, 'cw', () => 700)).jump).toBeNull();
    // zu wenige Zeiten: Mittel fehlt, Anzahl bleibt
    const j = summarize(roundSteps(2, 2, 'cw', () => 700)).jump!;
    expect(Number.isNaN(j.switchMs)).toBe(true);
    expect(j.switchN + j.withinN).toBe(7);
  });

  it('Auswertung mischt Runden mit Wechsel nach 1 und 2: Sprungkosten nur aus den Wechsel-2-Runden', () => {
    const a = roundSteps(9, 1, 'cw', () => 2000, 0, 1);
    const b = roundSteps(8, 2, 'zigzag', (_i, f, t) => (f === t ? 500 : 800), 1, 7);
    const s = summarize([...a, ...b]);
    expect(s.jump!.switchMs).toBe(800);
    expect(s.jump!.withinMs).toBe(500);
  });

  it('leere Sitzung ist unauffällig', () => {
    const s = summarize([]);
    expect(s.total).toBe(0);
    expect(Number.isNaN(s.meanMs)).toBe(true);
    expect(s.directions).toHaveLength(8);
    expect(s.jump).toBeNull();
    expect(tipFor(s)).toBe('great');
  });

  it('Tipps: Fehler, Ermüdung, Sprungkosten, Richtung; Schlüssel gibt es in beiden Sprachen', () => {
    const base = () => roundSteps(9, 1, 'cw', () => 800);
    const wrong = base().map((x, i) => (i % 6 === 1 ? { ...x, errors: 1 } : x));
    expect(tipFor(summarize(wrong))).toBe('wrong');
    const tired = roundSteps(9, 1, 'cw', (i) => (i < 18 ? 700 : 900));
    expect(tipFor(summarize(tired))).toBe('tired');
    const jump = roundSteps(12, 2, 'zigzag', (_i, f, t) => (f === t ? 450 : 750));
    expect(tipFor(summarize(jump))).toBe('jump');
    const dir = roundSteps(10, 1, 'cw', (_i, f, t) => (f === 0 && t === 1 ? 500 : 900));
    expect(tipFor(summarize(dir))).toBe('direction');
    expect(tipFor(summarize(base()))).toBe('great');
    for (const k of ['wrong', 'tired', 'jump', 'direction', 'great']) {
      expect(de.tips[k], k).toBeTruthy();
      expect(itTexts.tips[k], k).toBeTruthy();
    }
  });
});

// ---------------------------------------------------------------------------
describe('Geometrie: Tafeln in den Ecken, jede Stufe', () => {
  for (const vp of VIEWPORTS) {
    const u = Math.min(vp.w, vp.h) / 100;
    it(`${vp.name} ${vp.w}×${vp.h}: Tafeln liegen im Feld, überlappen nicht, sind klar getrennt`, () => {
      for (const L of LEVELS) {
        const lay = layoutForLevel(vp.w, vp.h, u, L.level);
        expect(lay.charts).toHaveLength(4);
        for (const c of lay.charts) {
          expect(c.x, `Stufe ${L.level} links`).toBeGreaterThanOrEqual(-1e-6);
          expect(c.y, `Stufe ${L.level} oben`).toBeGreaterThanOrEqual(-1e-6);
          expect(c.x + c.w, `Stufe ${L.level} rechts`).toBeLessThanOrEqual(vp.w + 1e-6);
          expect(c.y + c.h, `Stufe ${L.level} unten`).toBeLessThanOrEqual(vp.h + 1e-6);
          // Raster liegt innerhalb der Karte
          expect(c.gx + lay.cols * lay.cell).toBeLessThanOrEqual(c.x + c.w + 1e-6);
          expect(c.gy + lay.rows * lay.cell).toBeLessThanOrEqual(c.y + c.h + 1e-6);
        }
        for (let i = 0; i < 4; i++)
          for (let j = i + 1; j < 4; j++) {
            const a = lay.charts[i];
            const b = lay.charts[j];
            const gapX = Math.max(b.x - (a.x + a.w), a.x - (b.x + b.w));
            const gapY = Math.max(b.y - (a.y + a.h), a.y - (b.y + b.h));
            // getrennt in mindestens einer Richtung, mit Abstand ≥ 16 px
            expect(Math.max(gapX, gapY), `Stufe ${L.level} Tafeln ${i}-${j}`).toBeGreaterThanOrEqual(16);
          }
        // Ecken: 0 oben links, 1 oben rechts, 2 unten links, 3 unten rechts
        const [t0, t1, t2, t3] = lay.charts;
        expect(t0.x).toBeLessThan(t1.x);
        expect(t2.x).toBeLessThan(t3.x);
        expect(t0.y).toBeLessThan(t2.y);
        expect(t1.y).toBeLessThan(t3.y);
        expect(t0.x).toBeCloseTo(t2.x, 6);
        expect(t1.y).toBeCloseTo(t0.y, 6);
        // gleich große Tafeln, symmetrisch im Feld
        expect(t1.x + t1.w).toBeCloseTo(vp.w - t0.x, 6);
        expect(t2.y + t2.h).toBeCloseTo(vp.h - t0.y, 6);
      }
    });

    it(`${vp.name}: Zielfläche je Buchstabe (Zelle) ≥ 48 px, Schrift nie unter 22 px und kleiner als die Zelle`, () => {
      for (const L of LEVELS) {
        const lay = layoutForLevel(vp.w, vp.h, u, L.level);
        expect(lay.cell, `Stufe ${L.level}`).toBeGreaterThanOrEqual(48);
        expect(lay.cell).toBeGreaterThanOrEqual(MIN_CELL_PX - 1e-6);
        expect(lay.font, `Stufe ${L.level}`).toBeGreaterThanOrEqual(22 - 1e-6);
        expect(lay.font).toBeLessThan(lay.cell);
        // das Raster gibt es höchstens so groß wie gewünscht, nie kleiner als 2 × 2
        expect(lay.cols).toBeLessThanOrEqual(L.cols);
        expect(lay.rows).toBeLessThanOrEqual(L.rows);
        expect(lay.cols).toBeGreaterThanOrEqual(2);
        expect(lay.rows).toBeGreaterThanOrEqual(2);
      }
    });

    it(`${vp.name}: Stufe 1 hat Schrift ≥ 28 px`, () => {
      expect(layoutForLevel(vp.w, vp.h, u, 1).font).toBeGreaterThanOrEqual(28 - 1e-6);
    });
  }

  it('auf dem Tablet (quer und hoch) bleibt das gewünschte Raster in jeder Stufe vollständig', () => {
    for (const vp of VIEWPORTS.filter((v) => v.tablet)) {
      const u = Math.min(vp.w, vp.h) / 100;
      for (const L of LEVELS) {
        const lay = layoutForLevel(vp.w, vp.h, u, L.level);
        expect([lay.cols, lay.rows], `${vp.name} Stufe ${L.level}`).toEqual([L.cols, L.rows]);
      }
    }
  });

  it('Handy darf kleinere Tafeln haben: das Raster schrumpft, die Zellen bleiben ≥ 48 px', () => {
    const lay = layoutForLevel(390, 776, 3.9, 9);
    expect(lay.cols * lay.rows).toBeLessThan(25);
    expect(lay.cell).toBeGreaterThanOrEqual(48);
    expect(fitGrid(390, 776, 3.9, 3, 3)).toEqual({ cols: 3, rows: 3 });
    expect(fitGrid(1180, 752, 7.52, 5, 5)).toEqual({ cols: 5, rows: 5 });
    const g = fitGrid(390, 776, 3.9, 5, 5);
    expect(cellMaxFor(390, 776, 3.9, g.cols, g.rows)).toBeGreaterThanOrEqual(MIN_CELL_PX);
  });

  it('Tablet: Schrift wird von Stufe zu Stufe nie größer und nimmt zwischen Schriftstufen ab (Stufe 1: ≥ 40 px, schwerste ≈ 22–25 px)', () => {
    for (const vp of VIEWPORTS.slice(0, 2)) {
      const u = Math.min(vp.w, vp.h) / 100;
      const fonts = LEVELS.map((L) => layoutForLevel(vp.w, vp.h, u, L.level).font);
      for (let i = 1; i < fonts.length; i++) expect(fonts[i]).toBeLessThanOrEqual(fonts[i - 1] + 1e-6);
      expect(fonts[0]).toBeGreaterThanOrEqual(40);
      expect(fonts[fonts.length - 1]).toBeGreaterThanOrEqual(22);
      expect(fonts[fonts.length - 1]).toBeLessThanOrEqual(26);
      const sizes = [0, 1, 2, 3].map((s) => layoutFor(vp.w, vp.h, u, s, 1, 3, 3).font);
      for (let i = 1; i < sizes.length; i++) expect(sizes[i]).toBeLessThan(sizes[i - 1]);
    }
  });

  it('Abstand: je größer „reach“, desto weiter außen liegen die Tafeln (Lücke zwischen ihnen wächst)', () => {
    const u = 7.52;
    const gap = (reach: number) => {
      const l = layoutFor(1180, 752, u, 1, reach, 4, 4);
      return { x: l.charts[1].x - (l.charts[0].x + l.charts[0].w), y: l.charts[2].y - (l.charts[0].y + l.charts[0].h) };
    };
    expect(gap(0.75).x).toBeGreaterThan(gap(0.5).x);
    expect(gap(1).x).toBeGreaterThan(gap(0.75).x);
    expect(gap(1).y).toBeGreaterThan(gap(0.5).y);
    const full = layoutFor(1180, 752, u, 1, 1, 4, 4);
    expect(full.charts[0].x).toBeCloseTo(Math.max(8, u * 1.5), 6);
    expect(full.charts[0].y).toBeCloseTo(Math.max(8, u * 1.5), 6);
  });

  it('Zellgröße = Zielfläche: Schrift mal 1,75, mindestens 50 px', () => {
    const lay = layoutFor(1180, 752, 7.52, 0, 1, 3, 3);
    expect(lay.cell).toBeCloseTo(lay.font * CELL_PER_FONT, 1);
    expect(layoutFor(1180, 752, 7.52, 3, 1, 5, 5).cell).toBe(MIN_CELL_PX);
  });

  it('cellAt: die Mitte jeder Zelle gehört zu ihrer Zelle, jede Zelle ist ≥ 48 px groß, Zellen überlappen nicht', () => {
    for (const vp of VIEWPORTS) {
      const u = Math.min(vp.w, vp.h) / 100;
      for (const level of [1, 6, 10, 17]) {
        const lay = layoutForLevel(vp.w, vp.h, u, level);
        const n = lay.cols * lay.rows;
        for (const chart of CORNERS)
          for (let pos = 0; pos < n; pos++) {
            const r = cellRect(lay, chart, pos);
            expect(r.w).toBeGreaterThanOrEqual(48);
            expect(r.h).toBeGreaterThanOrEqual(48);
            expect(cellAt(lay, r.cx, r.cy)).toEqual({ chart, pos });
            // Ecken der Zelle (knapp innen) gehören auch zu ihr
            expect(cellAt(lay, r.x + 1, r.y + 1)).toEqual({ chart, pos });
            expect(cellAt(lay, r.x + r.w - 1, r.y + r.h - 1)).toEqual({ chart, pos });
          }
      }
    }
  });

  it('Leserichtung in der Tafel: zeilenweise Zeile für Zeile, spaltenweise Spalte für Spalte (Umrechnung Position ↔ Zelle)', () => {
    for (const scan of ['rows', 'cols'] as Scan[])
      for (const [cols, rows] of [[3, 3], [4, 4], [5, 5], [3, 5], [5, 2]]) {
        const seen = new Set<string>();
        for (let pos = 0; pos < cols * rows; pos++) {
          const { col, row } = gridOfPos(pos, cols, rows, scan);
          expect(col).toBeGreaterThanOrEqual(0);
          expect(col).toBeLessThan(cols);
          expect(row).toBeGreaterThanOrEqual(0);
          expect(row).toBeLessThan(rows);
          expect(posOfGrid(col, row, cols, rows, scan)).toBe(pos);
          seen.add(`${col},${row}`);
        }
        expect(seen.size).toBe(cols * rows);
      }
    // zeilenweise: 0 1 2 / 3 4 5; spaltenweise: erst die erste Spalte von oben nach unten
    expect([0, 1, 2, 3].map((p) => gridOfPos(p, 3, 3, 'rows'))).toEqual([{ col: 0, row: 0 }, { col: 1, row: 0 }, { col: 2, row: 0 }, { col: 0, row: 1 }]);
    expect([0, 1, 2, 3].map((p) => gridOfPos(p, 3, 3, 'cols'))).toEqual([{ col: 0, row: 0 }, { col: 0, row: 1 }, { col: 0, row: 2 }, { col: 1, row: 0 }]);
    const rowsLay = layoutFor(1180, 752, 7.52, 1, 1, 4, 4, 'rows');
    const colsLay = layoutFor(1180, 752, 7.52, 1, 1, 4, 4, 'cols');
    const r01 = [cellRect(rowsLay, 0, 0), cellRect(rowsLay, 0, 1)];
    expect(r01[1].cx).toBeGreaterThan(r01[0].cx);
    expect(r01[1].cy).toBeCloseTo(r01[0].cy, 6);
    const c01 = [cellRect(colsLay, 0, 0), cellRect(colsLay, 0, 1)];
    expect(c01[1].cy).toBeGreaterThan(c01[0].cy);
    expect(c01[1].cx).toBeCloseTo(c01[0].cx, 6);
    // Treffer findet die richtige Position in beiden Leserichtungen
    expect(cellAt(colsLay, c01[1].cx, c01[1].cy)).toEqual({ chart: 0, pos: 1 });
    expect(cellAt(rowsLay, r01[1].cx, r01[1].cy)).toEqual({ chart: 0, pos: 1 });
  });

  it('cellAt: Tipp neben die Tafeln = null, Tipp auf den Kartonrand = nächste Zelle', () => {
    const lay = layoutFor(1180, 752, 7.52, 1, 0.75, 4, 4);
    expect(cellAt(lay, 590, 376)).toBeNull();
    expect(cellAt(lay, -5, -5)).toBeNull();
    const c = lay.charts[3];
    expect(cellAt(lay, c.x + c.w - 1, c.y + c.h - 1)).toEqual({ chart: 3, pos: 15 });
    expect(cellAt(lay, c.x + 1, c.y + 1)).toEqual({ chart: 3, pos: 0 });
  });
});

// ---------------------------------------------------------------------------
describe('Rundenplan', () => {
  it('3 Runden, Pause ≥ 5 s vorgeschlagen, alle Buchstaben je Runde; Schnellmodus kleiner', () => {
    const p = roundPlan(false);
    expect(p.rounds).toBe(3);
    expect(p.restMs).toBeGreaterThanOrEqual(5000);
    expect(p.capSteps).toBe(Infinity);
    expect(p.capMs).toBeGreaterThanOrEqual(120_000);
    const q = roundPlan(true);
    expect(q.rounds).toBeGreaterThanOrEqual(2);
    expect(q.capSteps).toBeLessThanOrEqual(12);
    expect(q.restMs).toBeLessThan(p.restMs);
  });
});

// ---------------------------------------------------------------------------
// Simulationsspieler: ganze Sitzungen mit Leseregel, Fehlern, Runden und Anpassung

interface Skill {
  /** Wahrscheinlichkeit, einen Buchstaben ohne Fehltipp zu treffen, auf Stufe 1 und Abnahme je Stufe */
  acc1: number;
  perLevel: number;
  /** mittlere Zeit von Tipp zu Tipp in ms auf Stufe 1, Zuwachs je Stufe (ms) */
  rt1: number;
  rtPerLevel: number;
  /** Zusatzzeit beim Tafelwechsel (ms) */
  jump: number;
  /** Ermüdung: Zeitzuwachs je Buchstabe in ms */
  tire: number;
}

function simulate(seed: number, skill: Skill, level0 = 1, rounds = 3, vp = VIEWPORTS[0]) {
  const rng = createRng(seed);
  const u = Math.min(vp.w, vp.h) / 100;
  let level = level0;
  const steps: StepRec[] = [];
  const log: Array<{ level: number; accuracy: number }> = [];
  const levels: number[] = [];
  const sizes: number[] = [];
  for (let r = 0; r < rounds; r++) {
    const p = paramsFor(level);
    const g = fitGrid(vp.w, vp.h, u, p.cols, p.rows);
    const n = g.cols * g.rows;
    const reader = new Reader(n, p.gran, p.order);
    const charts = makeCharts(rng, p.chars, n);
    expect(charts[0]).toHaveLength(n);
    const from0 = steps.length;
    let prev: Corner | null = null;
    let t = 0;
    let tapped = 0;
    const acc = Math.min(0.995, Math.max(0.05, skill.acc1 - skill.perLevel * (level - 1)));
    while (!reader.finished) {
      const exp = reader.expected();
      const target = rng.pick(exp);
      // Fehltipps: andere Zelle als erwartet, die Regel darf sie nie annehmen
      let errors = 0;
      while (!rng.chance(acc)) {
        const wrong: Cell = { chart: rng.int(4) as Corner, pos: rng.int(n) };
        if (exp.some((e) => e.chart === wrong.chart && e.pos === wrong.pos)) continue;
        expect(reader.accept(wrong)).toBe(false);
        errors++;
        if (errors >= 4) break;
      }
      const jump = prev !== null && prev !== target.chart ? skill.jump : 0;
      const dt = Math.max(180, skill.rt1 + skill.rtPerLevel * (level - 1) + jump + skill.tire * steps.length + rng.normal() * 90);
      t += dt;
      expect(reader.accept(target)).toBe(true);
      steps.push({ round: r, index: tapped, level, chart: target.chart, pos: target.pos, from: prev, gran: p.gran, rt: prev === null ? null : dt, errors });
      prev = target.chart;
      tapped++;
    }
    expect(tapped).toBe(4 * n);
    const mine = steps.slice(from0);
    const st = evalRound(mine);
    log.push({ level, accuracy: st.accuracy });
    levels.push(level);
    sizes.push(n);
    level = applyMove(level, moveFor(st));
  }
  return { steps, level, log, levels, sizes, reached: reachedLevel(log, level) };
}

describe('Simulationsspieler über viele Startwerte', () => {
  const STRONG: Skill = { acc1: 0.997, perLevel: 0.001, rt1: 620, rtPerLevel: 6, jump: 120, tire: 0.2 };
  const MID: Skill = { acc1: 0.96, perLevel: 0.02, rt1: 800, rtPerLevel: 14, jump: 160, tire: 0.5 };
  const WEAK: Skill = { acc1: 0.75, perLevel: 0.05, rt1: 1100, rtPerLevel: 25, jump: 250, tire: 0.8 };

  it('starker Spieler klettert höher als der mittlere, dieser höher als der schwache (60 Startwerte)', () => {
    const avg = (s: Skill) => {
      let sum = 0;
      for (let seed = 1; seed <= 60; seed++) sum += simulate(seed, s).reached;
      return sum / 60;
    };
    const strong = avg(STRONG);
    const mid = avg(MID);
    const weak = avg(WEAK);
    expect(strong).toBeGreaterThan(mid);
    expect(mid).toBeGreaterThan(weak);
    expect(strong).toBeGreaterThanOrEqual(2.5);
    expect(weak).toBeLessThanOrEqual(1.5);
  });

  it('die Stufe ändert sich nur um höchstens eins je Runde und bleibt in 1..17', () => {
    for (let seed = 1; seed <= 60; seed++) {
      const sim = simulate(seed, MID, 1 + (seed % MAX_LEVEL), 3);
      for (let i = 1; i < sim.levels.length; i++) expect(Math.abs(sim.levels[i] - sim.levels[i - 1])).toBeLessThanOrEqual(1);
      for (const l of sim.levels) {
        expect(l).toBeGreaterThanOrEqual(MIN_LEVEL);
        expect(l).toBeLessThanOrEqual(MAX_LEVEL);
      }
    }
  });

  it('alle Stufen werden auf Tablet und Handy vollständig durchgelesen (jedes Feld genau einmal)', () => {
    for (const vp of VIEWPORTS.slice(0, 3)) {
      for (let level = 1; level <= MAX_LEVEL; level++) {
        const sim = simulate(level * 7, { acc1: 1, perLevel: 0, rt1: 700, rtPerLevel: 0, jump: 100, tire: 0 }, level, 1, vp);
        const keys = sim.steps.map((s) => `${s.chart}:${s.pos}`);
        expect(new Set(keys).size).toBe(keys.length);
        expect(keys.length).toBe(4 * sim.sizes[0]);
      }
    }
  });

  it('ein Spieler mit 100 % und gleichmäßiger Zeit steigt jede Runde, einer mit < 75 % fällt zurück', () => {
    const perfect: Skill = { acc1: 1, perLevel: 0, rt1: 700, rtPerLevel: 0, jump: 100, tire: 0 };
    const sim = simulate(2, perfect, 1, 3);
    expect(sim.levels).toEqual([1, 2, 3]);
    const hopeless: Skill = { acc1: 0.3, perLevel: 0, rt1: 1500, rtPerLevel: 0, jump: 100, tire: 0 };
    const low = simulate(2, hopeless, 7, 3);
    expect(low.levels[0]).toBe(7);
    expect(low.levels[2]).toBeLessThan(7);
  });

  it('Auswertung ist über viele Sitzungen in sich stimmig', () => {
    for (let seed = 1; seed <= 60; seed++) {
      const { steps } = simulate(seed, MID, 1 + (seed % 9));
      const s = summarize(steps);
      expect(s.total).toBe(steps.length);
      expect(s.hits).toBe(s.total);
      expect(s.taps).toBe(s.total + s.errors);
      expect(s.accuracy).toBeCloseTo(s.total / (s.total + s.errors), 9);
      for (const d of s.directions) expect(Number.isFinite(d.meanMs)).toBe(d.n >= MIN_FOR_DIRECTION);
      expect(s.firstHalfTotal).toBe(s.lastHalfTotal);
      if (s.fastest && s.slowest) {
        const f = s.directions.find((d) => d.dir === s.fastest)!;
        const l = s.directions.find((d) => d.dir === s.slowest)!;
        expect(f.meanMs).toBeLessThanOrEqual(l.meanMs);
      }
      const timed = steps.filter(isClean).length;
      expect(timed).toBeLessThanOrEqual(steps.length - 3); // erster Buchstabe jeder der 3 Runden hat keine Zeit
    }
  });

  it('Ermüdung erscheint als Unterschied zwischen erster und letzter Hälfte', () => {
    const tired: Skill = { acc1: 0.997, perLevel: 0, rt1: 600, rtPerLevel: 0, jump: 100, tire: 5 };
    const s = summarize(simulate(9, tired, 1, 3).steps);
    expect(s.lastHalfMs).toBeGreaterThan(s.firstHalfMs + 100);
  });

  it('Sprungkosten tauchen in der Simulation auf, wenn Wechsel nach 2 gespielt wird', () => {
    const sk: Skill = { acc1: 0.997, perLevel: 0, rt1: 600, rtPerLevel: 0, jump: 200, tire: 0 };
    const s = summarize(simulate(4, sk, 9, 1).steps);
    expect(s.jump).not.toBeNull();
    expect(s.jump!.switchMs - s.jump!.withinMs).toBeGreaterThan(150);
    expect(s.jump!.switchMs - s.jump!.withinMs).toBeLessThan(250);
  });
});

// ---------------------------------------------------------------------------
describe('Texte', () => {
  const both = { de, it: itTexts };
  it('DE und IT haben dieselben Schlüssel, Längen wie in neue-uebung.md', () => {
    for (const k of ['captions', 'metrics', 'tips', 'feedback'] as const) expect(Object.keys(itTexts[k]).sort()).toEqual(Object.keys(de[k]).sort());
    for (const t of Object.values(both)) {
      expect(t.tagline.length).toBeLessThanOrEqual(80);
      expect(t.steps.length).toBeGreaterThanOrEqual(2);
      expect(t.steps.length).toBeLessThanOrEqual(3);
      for (const s of t.steps) expect(s.length).toBeLessThanOrEqual(60);
      for (const c of Object.values(t.captions)) expect(c.length).toBeLessThanOrEqual(40);
    }
    expect(de.why.endsWith('ist nicht belegt.')).toBe(true);
    expect(itTexts.why).toMatch(/non è dimostrato/i);
  });

  it('Titel bleibt „4-Ziele-Wechsel“, Untertitel und Anleitung beschreiben die vier Tafeln', () => {
    expect(de.title).toBe('4-Ziele-Wechsel');
    expect(de.tagline).toMatch(/Tafel/);
    expect(de.steps.join(' ')).toMatch(/Tafel/);
    expect(de.steps.join(' ')).toMatch(/blass/);
    expect(itTexts.tagline).toMatch(/tavol/);
    expect(itTexts.steps.join(' ')).toMatch(/chiar/);
  });

  it('alle von der Übung benutzten Schlüssel gibt es', () => {
    for (const t of Object.values(both)) {
      for (const k of ['start', 'ring', 'first', 'pale', 'again', 'wrong']) expect(t.captions[k], k).toBeTruthy();
      for (const k of ['level', 'time', 'hits', 'wrong']) expect(t.metrics[k], k).toBeTruthy();
      for (const k of [
        'level', 'round', 'restTitle', 'restText', 'restIn', 'next', 'orderReading', 'orderCw', 'orderZigzag', 'orderFree', 'scanCols', 'roundsTitle', 'roundText', 'timeTitle', 'median',
        'wholeSession', 'first', 'last', 'halfText', 'dirTitle', 'right', 'left', 'down', 'up', 'downRight', 'upLeft', 'upRight', 'downLeft', 'fastest', 'slowest',
        'fewHits', 'count', 'note', 'jumpTitle', 'jumpSwitch', 'jumpWithin', 'jumpCost', 'jumpNote', 'noData',
      ])
        expect(t.feedback[k], k).toBeTruthy();
    }
    // Platzhalter
    expect(de.feedback.roundText).toMatch(/\{n\}.*\{d\}.*\{e\}/);
    expect(itTexts.feedback.roundText).toMatch(/\{n\}.*\{d\}.*\{e\}/);
  });

  it('keine Fachwörter, keine Diagnose-/Test-/Normwert-Sprache, keine Wirkversprechen, keine Praxisangaben als Aussage', () => {
    const all = JSON.stringify([de, itTexts, science.texts]);
    expect(all).not.toMatch(/sakkad|saccad|diagnos|normwert|valori normali|\btest\b|heilt|heilen|garantier|garanti|nach einigen Tagen|periphere|sprungkosten|costi del salto/i);
    expect(de.why).not.toMatch(/Eye-Tracking/);
    expect(science.texts.de.research).toMatch(/kein Eye-Tracking/);
    expect(science.texts.de.research).toMatch(/nicht belegt/);
    expect(science.texts.de.research).toMatch(/eigene Festlegungen/);
    expect(science.texts.de.daily).toMatch(/ist nicht belegt\.$/);
    expect(science.texts.it.daily).toMatch(/non è dimostrato\.$/);
  });

  it('Zeit heißt „Zeit je Buchstabe (Tipp → Tipp)“ und der Hinweis nennt den Gerätefehler und dass der Blick nicht gemessen wird', () => {
    expect(de.metrics.time).toBe('Zeit je Buchstabe (Tipp → Tipp)');
    expect(de.feedback.note).toMatch(/50–70 ms/);
    expect(itTexts.feedback.note).toMatch(/50–70 ms/);
    expect(de.feedback.note).toMatch(/nicht der Blick allein/);
    expect(de.feedback.note).toMatch(/zum großen Teil vom Fingerweg/);
    expect(itTexts.feedback.note).toMatch(/percorso del dito/);
    expect(de.feedback.dirTitle).toMatch(/Zeit von Tipp zu Tipp nach Richtung/);
  });

  it('Quellenliste: mindestens 3 https-Quellen (doi.org)', () => {
    expect(science.sources.length).toBeGreaterThanOrEqual(3);
    for (const s of science.sources) expect(s.url).toMatch(/^https:\/\/doi\.org\//);
    expect(science.id).toBe('vier-ziele-wechsel');
  });

  it('Reihenfolge-Typen sind vollständig benannt', () => {
    const orders: Order[] = ['reading', 'cw', 'zigzag', 'varying'];
    expect(new Set(LEVELS.map((l) => l.order))).toEqual(new Set(orders));
  });
});

// ---------------------------------------------------------------------------
// Takt (Metronom-Option)

describe('Takt: Fenster und Zählung', () => {
  it('Tempi: langsam 1,4 s · mittel 1,0 s (= 60 pro Minute) · schnell 0,8 s, Standard mittel, Fenster ±300 ms', () => {
    expect(BEAT_MS).toEqual({ slow: 1400, medium: 1000, fast: 800 });
    expect(60_000 / BEAT_MS.medium).toBe(60);
    expect([...BEAT_CHOICES]).toEqual(['slow', 'medium', 'fast']);
    expect(BEAT_DEFAULT).toBe('medium');
    expect(BEAT_WINDOW_MS).toBe(300);
    expect(beatMsFor('fast')).toBe(800);
    expect(beatMsFor('unbekannt')).toBe(1000);
  });

  it('Abstand zum nächsten Taktschlag: Schläge bei t0 + k · Abstand (k ≥ 0), davor zählt der erste', () => {
    expect(beatOffset(1000, 1000, 1000)).toBe(0);
    expect(beatOffset(1250, 1000, 1000)).toBe(250);
    expect(beatOffset(1500, 1000, 1000)).toBe(500);
    expect(beatOffset(1700, 1000, 1000)).toBe(300); // näher am zweiten Schlag (2000)
    expect(beatOffset(500, 1000, 1000)).toBe(500); // vor dem ersten Schlag
    expect(beatOffset(100, 1000, 1000)).toBe(900);
  });

  it('im Takt = höchstens 300 ms neben einem Schlag (Grenze zählt), nie ein Fehlergrund', () => {
    const t0 = 900;
    for (const [off, want] of [[0, true], [299, true], [300, true], [301, false], [500, false], [-300, true], [-301, false]] as const) expect(onBeat(t0 + 2 * 1000 + off, t0, 1000), `${off}`).toBe(want);
    // in der Auswertung sind Fehltipps unabhängig vom Takt
    const steps: StepRec[] = [
      { ...mk(0, 0, null), onBeat: true },
      { ...mk(1, 1, 700, 2), onBeat: false },
    ];
    expect(evalRound(steps).accuracy).toBeCloseTo(2 / 4, 9);
  });

  it('Auswertung: Anteil der richtigen Tipps im Taktfenster; ohne Takt gespielte Sitzung hat keinen Taktwert', () => {
    const mkb = (i: number, on: boolean | undefined): StepRec => ({ ...mk(i, CHART_ORDER.cw[i % 4], 700), ...(on === undefined ? {} : { onBeat: on }) });
    const steps = Array.from({ length: 8 }, (_, i) => mkb(i, i < 5));
    expect(summarize(steps).beat).toEqual({ n: 8, on: 5, share: 5 / 8 });
    expect(summarize(Array.from({ length: 8 }, (_, i) => mkb(i, undefined))).beat).toBeNull();
    // gemischt (zwei Sitzungsteile): nur Schritte mit Taktangabe zählen
    const mixed = [...Array.from({ length: 4 }, (_, i) => mkb(i, undefined)), ...Array.from({ length: 4 }, (_, i) => mkb(i + 4, i < 3))];
    expect(summarize(mixed).beat).toEqual({ n: 4, on: 3, share: 0.75 });
    expect(summarize([]).beat).toBeNull();
  });

  it('Zufallsniveau: bei gleichmäßig verteilten Tipps liegt der Anteil im Fenster bei 600/Abstand (Hinweis im Ergebnistext)', () => {
    const rng = createRng(11);
    for (const [tempo, ms] of Object.entries(BEAT_MS)) {
      let on = 0;
      const N = 4000;
      for (let i = 0; i < N; i++) if (onBeat(900 + rng.range(0, 60_000), 900, ms)) on++;
      expect(on / N, tempo).toBeCloseTo(Math.min(1, (2 * BEAT_WINDOW_MS) / ms), 1);
    }
    expect(de.feedback.beatNote).toMatch(/zufällig/);
    expect(itTexts.feedback.beatNote).toMatch(/per caso/);
  });
});

// ---------------------------------------------------------------------------
// Übung ohne Canvas durchgespielt (Harness wie bei anderen Übungen)

interface Peek {
  lay: () => Layout;
  reader: Reader;
  phase: string;
  rp: { level: number };
  beatT0: number;
}

interface Harness {
  ex: Exercise;
  finished: ExerciseResult[];
  calls: { beat: number[]; good: number; bad: number; captions: string[]; labels: string[]; ghostTaps: number };
  readonly t: number;
  step: (dt: number) => void;
  /** bis zur Zeit `ms` in 60-Hz-Schritten weiterschalten */
  runTo: (ms: number) => void;
  down: (x: number, y: number, t?: number) => void;
  peek: () => Peek;
}

function harness(
  o: { mode?: 'play' | 'demo'; quick?: boolean; autoplay?: boolean; seed?: number; startLevel?: number | null; options?: Record<string, ExerciseOptionValue>; w?: number; h?: number; lang?: 'de' | 'it' } = {},
): Harness {
  const finished: ExerciseResult[] = [];
  const calls = { beat: [] as number[], good: 0, bad: 0, captions: [] as string[], labels: [] as string[], ghostTaps: 0 };
  const w = o.w ?? 1180;
  const h = o.h ?? 752;
  const stage = { w, h, u: Math.min(w, h) / 100, dpr: 1 };
  let now = 0;
  let pending: { x: number; y: number; due: number } | null = null;
  let busyUntil = 0;
  const ghost = {
    tap: (x: number, y: number, opt: { delay?: number; move?: number } = {}) => {
      calls.ghostTaps++;
      pending = { x, y, due: now + (opt.delay ?? 0) + (opt.move ?? 380) };
    },
    moveTo: () => {},
    clear: () => {
      pending = null;
    },
    show: () => {},
    hide: () => {},
    get idle() {
      return !pending && now >= busyUntil;
    },
  };
  const ctx = {
    mode: o.mode ?? 'play',
    autoplay: !!o.autoplay || o.mode === 'demo',
    quick: !!o.quick,
    reducedMotion: false,
    startLevel: o.startLevel ?? null,
    options: o.mode === 'demo' ? undefined : o.options,
    lang: o.lang ?? 'de',
    texts: o.lang === 'it' ? itTexts : de,
    rng: createRng(o.seed ?? 1),
    sfx: {
      beat: () => calls.beat.push(now),
      tick() {},
      go() {},
      good: () => calls.good++,
      bad: () => calls.bad++,
      tap() {},
      done() {},
    },
    hud: {
      setProgress() {},
      setScore() {},
      setLabel: (t: string | null) => t && calls.labels.push(t),
      toast() {},
      caption: (t: string | null) => t && calls.captions.push(t),
    },
    ghost,
    stage,
    fmt: createFormatter(o.lang ?? 'de'),
    now: () => now,
    finish: (r: ExerciseResult) => finished.push(r),
  } as unknown as ExerciseContext;
  const ex = vierZieleWechsel.create(ctx);
  ex.start(0);
  const hn: Harness = {
    ex,
    finished,
    calls,
    get t() {
      return now;
    },
    peek: () => ex as unknown as Peek,
    down: (x, y, t) => ex.pointerDown?.({ id: 1, x, y, t: t ?? now, type: 'touch' } as PointerInfo),
    step: (dt) => {
      now += dt * 1000;
      if (pending && now >= pending.due) {
        const p = pending;
        pending = null;
        busyUntil = now + 170;
        ex.pointerDown?.({ id: -1, x: p.x, y: p.y, t: now, type: 'ghost' } as PointerInfo);
      }
      ex.update(dt, now);
    },
    runTo: (ms) => {
      while (now < ms) hn.step(1 / 60);
    },
  };
  return hn;
}

const centerOf = (hn: Harness, c: Cell) => {
  const r = cellRect(hn.peek().lay(), c.chart, c.pos);
  return { x: r.cx, y: r.cy };
};

/** Spieler: tippt den erwarteten Buchstaben alle `think` ms (nur in der Lesephase), auf Wunsch mit Fehltipps */
function bot(hn: Harness, o: { think?: number; maxMs?: number; wrongEvery?: number } = {}): void {
  const think = o.think ?? 600;
  const maxMs = o.maxMs ?? 900_000;
  let since = 0;
  let count = 0;
  while (hn.finished.length === 0 && hn.t < maxMs) {
    hn.step(1 / 60);
    const pk = hn.peek();
    if (pk.phase !== 'read') {
      since = -2000; // in der Pause wartet der Spieler; sie endet von selbst
      continue;
    }
    since += 1000 / 60;
    if (since < think) continue;
    since = 0;
    count++;
    const exp = pk.reader.expected();
    if (!exp.length) continue;
    if (o.wrongEvery && count % o.wrongEvery === 0) {
      const wrong: Cell = { chart: ((exp[0].chart + 1) % 4) as Corner, pos: (exp[0].pos + 3) % pk.reader.n };
      if (!exp.some((e) => e.chart === wrong.chart && e.pos === wrong.pos)) {
        const wp = centerOf(hn, wrong);
        hn.down(wp.x, wp.y);
        hn.step(1 / 30); // Doppeltipp-Sperre abwarten
        hn.step(1 / 30);
      }
    }
    const p = centerOf(hn, exp[0]);
    hn.down(p.x, p.y);
  }
}

describe('Übung ohne Canvas durchgespielt', () => {
  it('Schnellmodus, fehlerfreier Spieler: 2 Runden × 8 Buchstaben, Ergebnis vollständig, kein Takt-Wert', () => {
    const hn = harness({ quick: true, seed: 3 });
    bot(hn, { think: 600 });
    expect(hn.finished).toHaveLength(1);
    const r = hn.finished[0];
    expect(r.primary).toMatchObject({ key: 'level', unit: 'level', better: 'higher' });
    expect(Number.isInteger(r.primary.value)).toBe(true);
    const sec = Object.fromEntries(r.secondary.map((m) => [m.key, m.value]));
    expect(sec.hits).toBe(16);
    expect(sec.wrong).toBe(0);
    expect(sec.time).toBeGreaterThan(500);
    expect(sec.time).toBeLessThan(700);
    expect(sec.beat).toBeUndefined();
    expect(r.secondary.length).toBeLessThanOrEqual(4);
    expect(hn.calls.beat).toHaveLength(0);
    expect((r.details ?? []).map((d) => d.title)).toEqual([de.feedback.roundsTitle, de.feedback.timeTitle, de.feedback.dirTitle]);
    expect(r.details![0].rows).toHaveLength(2);
    expect(r.details![2].rows).toHaveLength(8);
    expect(r.tip).toBeTruthy();
    expect(de.tips[r.tip!]).toBeTruthy();
  });

  it('volle Sitzung auf Stufe 1: 3 Runden, jede Tafel vollständig, Stufe steigt bei 100 % und gleichmäßiger Zeit', () => {
    const hn = harness({ seed: 5 });
    bot(hn, { think: 500 });
    expect(hn.finished).toHaveLength(1);
    const r = hn.finished[0];
    expect(r.secondary.find((m) => m.key === 'hits')!.value).toBe(36 + 36 + 64); // Stufe 1 (3×3), Stufe 2 (3×3), Stufe 3 (4×4)
    expect(r.primary.value).toBe(3);
    expect(r.details![0].rows).toHaveLength(3);
    expect(hn.calls.labels.some((l) => /Runde 3\/3/.test(l))).toBe(true);
  });

  it('Spaltenweise Stufe (10): der Spieler tippt Spalte für Spalte, die Sitzung wird vollständig gelesen', () => {
    const hn = harness({ quick: true, seed: 6, startLevel: 10 });
    bot(hn, { think: 700 });
    expect(hn.finished).toHaveLength(1);
    expect(hn.finished[0].secondary.find((m) => m.key === 'wrong')!.value).toBe(0);
  });

  it('Fehler werden gezählt, der erwartete Buchstabe bleibt gesucht, die Genauigkeit senkt die Stufe', () => {
    const hn = harness({ quick: true, seed: 8, startLevel: 5 });
    bot(hn, { think: 700, wrongEvery: 2 });
    const r = hn.finished[0];
    const sec = Object.fromEntries(r.secondary.map((m) => [m.key, m.value]));
    expect(sec.hits).toBe(16);
    expect(sec.wrong).toBeGreaterThanOrEqual(6);
    expect(hn.calls.bad).toBe(sec.wrong);
    expect(r.primary.value).toBeLessThanOrEqual(5);
  });

  it('Tipp neben die Tafeln und Doppeltipp zählen nicht; kurz nach Rundenbeginn wird nichts gewertet', () => {
    const hn = harness({ quick: true, seed: 2 });
    hn.runTo(1000);
    const first = hn.peek().reader.expected()[0];
    hn.down(590, 376); // Mitte des Feldes: zwischen den Tafeln
    expect(hn.peek().reader.count).toBe(0);
    expect(hn.calls.bad).toBe(0);
    const p = centerOf(hn, first);
    hn.down(p.x, p.y, 1000);
    expect(hn.peek().reader.count).toBe(1);
    hn.down(p.x, p.y, 1050); // Doppeltipp 50 ms später: ignoriert, kein Fehler
    expect(hn.calls.bad).toBe(0);
    expect(hn.peek().reader.count).toBe(1);
    const hn2 = harness({ quick: true });
    hn2.down(p.x, p.y, 100); // Rest vom „Weiter“-Tipp
    expect(hn2.peek().reader.count).toBe(0);
  });

  it('Intro-Film: 8–14 s, ein falscher Tipp, Bildunterschriften, Ergebnis wird gemeldet, kein Takt', () => {
    const hn = harness({ mode: 'demo', options: { metronome: { on: true, choice: 'fast' } } });
    while (hn.finished.length === 0 && hn.t < 30_000) hn.step(1 / 60);
    expect(hn.finished).toHaveLength(1);
    expect(hn.t).toBeGreaterThanOrEqual(8000);
    expect(hn.t).toBeLessThanOrEqual(14_000);
    expect(hn.calls.bad).toBe(1);
    expect(hn.calls.good).toBe(10);
    expect(hn.calls.beat).toHaveLength(0);
    for (const c of hn.calls.captions) expect(Object.values(de.captions)).toContain(c);
    expect(new Set(hn.calls.captions).size).toBeGreaterThanOrEqual(5);
  });

  for (const lang of ['de', 'it'] as const) {
    it(`Autoplay im Spielmodus (${lang}): Sitzung endet mit Ergebnis; ein Takt läuft dabei nie`, () => {
      for (const seed of [1, 2, 3]) {
        const hn = harness({ autoplay: true, quick: true, seed, lang, options: { metronome: { on: true, choice: 'fast' } } });
        while (hn.finished.length === 0 && hn.t < 120_000) hn.step(1 / 60);
        expect(hn.finished, `seed ${seed}`).toHaveLength(1);
        const sec = Object.fromEntries(hn.finished[0].secondary.map((m) => [m.key, m.value]));
        expect(sec.hits).toBe(16);
        expect(sec.beat).toBeUndefined();
        expect(hn.calls.beat).toHaveLength(0);
      }
    });
  }

  it('Autoplay auf allen Stufen (Schnellmodus): endet immer, auch mit wechselnder Reihenfolge ohne Führung', () => {
    for (let level = 1; level <= MAX_LEVEL; level++) {
      const hn = harness({ autoplay: true, quick: true, seed: level, startLevel: level });
      while (hn.finished.length === 0 && hn.t < 120_000) hn.step(1 / 60);
      expect(hn.finished, `Stufe ${level}`).toHaveLength(1);
    }
  });

  it('Takt aus (Standard): kein Taktschlag und kein Takt-Wert', () => {
    for (const options of [undefined, {}, { metronome: { on: false, choice: 'fast' } }] as Array<Record<string, ExerciseOptionValue> | undefined>) {
      const hn = harness({ quick: true, seed: 4, options });
      bot(hn, { think: 600 });
      expect(hn.calls.beat).toHaveLength(0);
      expect(hn.finished[0].secondary.find((m) => m.key === 'beat')).toBeUndefined();
      expect(hn.finished[0].details!.find((d) => d.title === de.feedback.beatTitle)).toBeUndefined();
    }
  });

  it('Takt an (mittel): Schläge im Abstand von 1,0 s, nicht in der Pause; Zählung „im Takt“; Stufe, Fehler und Zeiten wie ohne Takt', () => {
    const I = BEAT_MS.medium;
    const hn = harness({ quick: true, seed: 4, options: { metronome: { on: true, choice: 'medium' } } });
    const seq = readingSequence(9, 1, 'reading').slice(0, 8);
    // Runde 1: Tipps relativ zu den Schlägen bei 900 + k · 1000: Abstand 0, 250, 300, 350, 550, −300, −350, 100 ms
    const offs = [0, 250, 300, 350, 550, -300, -350, 100];
    let lastTapT = 0;
    seq.forEach((c, i) => {
      const tapT = BEAT_START_MS + (i + 1) * I + offs[i];
      hn.runTo(tapT);
      const p = centerOf(hn, c);
      hn.down(p.x, p.y, tapT);
      lastTapT = tapT;
    });
    expect(hn.peek().phase).toBe('rest');
    const round1Beats = hn.calls.beat.filter((b) => b <= lastTapT + 40);
    expect(round1Beats).toHaveLength(9); // 900, 1900, … 8900
    expect(round1Beats[0]).toBeGreaterThanOrEqual(BEAT_START_MS);
    expect(round1Beats[0]).toBeLessThanOrEqual(BEAT_START_MS + 40);
    for (let i = 1; i < round1Beats.length; i++) expect(Math.abs(round1Beats[i] - round1Beats[i - 1] - I)).toBeLessThanOrEqual(34);
    // Pause (Schnellmodus 2,2 s): kein Schlag, dann beginnt Runde 2
    hn.runTo(lastTapT + 2400);
    expect(hn.peek().phase).toBe('read');
    const t0 = hn.peek().beatT0;
    expect(hn.calls.beat.filter((b) => b > lastTapT + 40 && b < t0)).toHaveLength(0);
    // Runde 2: Tipps genau auf den Schlägen
    seq.forEach((c, i) => {
      const tapT = t0 + i * I + 20;
      hn.runTo(tapT);
      const p = centerOf(hn, c);
      hn.down(p.x, p.y, tapT);
    });
    expect(hn.finished).toHaveLength(1);
    const r = hn.finished[0];
    const beat = r.secondary.find((m) => m.key === 'beat')!;
    expect(beat.unit).toBe('percent');
    // Runde 1: im Takt [ja, ja, ja, nein, nein, ja, nein, ja] = 5 von 8; Runde 2: 8 von 8 → 13 von 16 = 81 %
    expect(beat.value).toBe(81);
    const tbl = r.details!.find((d) => d.title === de.feedback.beatTitle)!;
    expect(tbl.rows[0].value).toBe('Mittel · 1,0 s');
    expect(tbl.rows[1].value).toBe('81 %');
    expect(tbl.rows[1].text).toBe('13 von 16 Tipps innerhalb von ±0,3 s um einen Taktschlag');
    expect(tbl.note).toMatch(/nie ein Fehlergrund/);
    // der Takt ändert Zählung und Fehler nicht
    const sec = Object.fromEntries(r.secondary.map((m) => [m.key, m.value]));
    expect(sec.hits).toBe(16);
    expect(sec.wrong).toBe(0);
    expect(hn.calls.bad).toBe(0);
    expect(r.secondary.length).toBeLessThanOrEqual(4);
  });

  it('Takt langsam / schnell: Schlagabstand folgt dem Tempo', () => {
    for (const [choice, ms] of [['slow', 1400], ['fast', 800]] as const) {
      const hn = harness({ quick: true, seed: 9, options: { metronome: { on: true, choice } } });
      hn.runTo(6000);
      const b = hn.calls.beat;
      expect(b.length).toBeGreaterThanOrEqual(Math.floor((6000 - BEAT_START_MS) / ms));
      for (let i = 1; i < b.length; i++) expect(Math.abs(b[i] - b[i - 1] - ms)).toBeLessThanOrEqual(34);
    }
  });
});

describe('Optionen: Definition und Texte', () => {
  it('Übung bietet genau die Option „Takt“ an: drei Tempi, Standard mittel', () => {
    expect(vierZieleWechsel.options).toEqual([{ key: 'metronome', choices: ['slow', 'medium', 'fast'], defaultChoice: 'medium' }]);
  });

  it('Texte der Option in DE und IT: Titel, Hinweis (optional, nicht belegt), drei Beschriftungen mit Sekunden', () => {
    for (const t of [de, itTexts]) {
      const o = t.options!.metronome;
      expect(o.title.length).toBeGreaterThan(3);
      expect(Object.keys(o.choices).sort()).toEqual(['fast', 'medium', 'slow']);
      expect(o.choices.slow).toMatch(/1,4 s/);
      expect(o.choices.medium).toMatch(/1,0 s/);
      expect(o.choices.fast).toMatch(/0,8 s/);
      expect(o.hint).toMatch(/60/);
    }
    expect(de.options!.metronome.hint).toMatch(/Takt ist optional; ob er etwas bringt, ist nicht belegt\./);
    expect(de.options!.metronome.hint).toMatch(/ein Schlag für einen Buchstaben/);
    expect(itTexts.options!.metronome.hint).toMatch(/non è dimostrato/);
    for (const k of ['beatTitle', 'beatTempo', 'beatShare', 'beatShareText', 'beatNote']) {
      expect(de.feedback[k], k).toBeTruthy();
      expect(itTexts.feedback[k], k).toBeTruthy();
    }
    expect(de.metrics.beat).toBe('Im Takt');
    expect(Object.keys(itTexts.metrics).sort()).toEqual(Object.keys(de.metrics).sort());
  });
});
