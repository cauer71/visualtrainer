import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import { science } from '../../src/exercises/vier-ziele-wechsel/science';
import { de, it as itTexts } from '../../src/exercises/vier-ziele-wechsel/texts';
import {
  applyMove,
  ARROW,
  blockPlan,
  changedParams,
  CORNERS,
  cornerAt,
  DIRECTIONS,
  directionOf,
  distractorHitR,
  distractorsFor,
  evalSegment,
  HIT_R_MIN_PX,
  HIT_R_PX,
  isStable,
  layoutFor,
  LEVELS,
  levelOf,
  MAX_LEVEL,
  MIN_FOR_DIRECTION,
  MIN_GLYPH_PX,
  MIN_LEVEL,
  moveFor,
  paramsFor,
  pauseMs,
  pauseWindow,
  reachedLevel,
  SEGMENT_TARGETS,
  SIGNS,
  summarize,
  TargetSequence,
  tipFor,
  type Direction,
  type Trial,
} from '../../src/exercises/vier-ziele-wechsel/logic';

/** Bühnen (Feldgröße in CSS-px, wie sie der Runner liefert: unter der Kopfleiste) */
const VIEWPORTS = [
  { name: 'Tablet quer', w: 1180, h: 740 },
  { name: 'Tablet hoch', w: 820, h: 1100 },
  { name: 'Handy hoch', w: 390, h: 700 },
  { name: 'Handy quer', w: 760, h: 300 },
  { name: 'Intro-Film 16:11', w: 960, h: 560 },
];

describe('Stufentabelle', () => {
  it('hat 12 Stufen mit laufender Nummer', () => {
    expect(LEVELS).toHaveLength(MAX_LEVEL);
    LEVELS.forEach((l, i) => expect(l.level).toBe(i + 1));
    expect(MIN_LEVEL).toBe(1);
  });

  it('jeder Schritt ändert genau einen Parameter', () => {
    for (let i = 1; i < LEVELS.length; i++) {
      const ch = changedParams(LEVELS[i - 1], LEVELS[i]);
      expect(ch, `Stufe ${i} → ${i + 1}`).toHaveLength(1);
    }
  });

  it('Reihenfolge Größe → Rand → Pause → Zeichen → Ablenker, jeder Schritt wird schwerer', () => {
    const order = LEVELS.slice(1).map((l, i) => changedParams(LEVELS[i], l)[0]);
    expect(order).toEqual(['sizeU', 'sizeU', 'reach', 'reach', 'pauseMs', 'pauseMs', 'pauseMs', 'signs', 'signs', 'distractors', 'distractors']);
    const signRank = { distinct: 0, similar: 1, symbols: 2 } as const;
    for (let i = 1; i < LEVELS.length; i++) {
      const a = LEVELS[i - 1];
      const b = LEVELS[i];
      expect(b.sizeU).toBeLessThanOrEqual(a.sizeU);
      expect(b.reach).toBeGreaterThanOrEqual(a.reach);
      expect(b.pauseMs).toBeLessThanOrEqual(a.pauseMs);
      expect(signRank[b.signs]).toBeGreaterThanOrEqual(signRank[a.signs]);
      expect(b.distractors).toBeGreaterThanOrEqual(a.distractors);
    }
  });

  it('Stufe 1 = sehr große Ziele (≥ 20 % der kürzeren Seite), Pause 1200 → 1000 → 800 → 600, bis zu 6 Ablenker', () => {
    expect(paramsFor(1).sizeU).toBeGreaterThanOrEqual(20);
    expect([1, 5, 6, 7, 8].map((l) => paramsFor(l).pauseMs)).toEqual([1200, 1200, 1000, 800, 600]);
    expect(paramsFor(MAX_LEVEL).distractors).toBe(6);
    expect(paramsFor(0)).toBe(LEVELS[0]);
    expect(paramsFor(99)).toBe(LEVELS[11]);
    expect(levelOf(3.9)).toBe(3);
  });

  it('Pausenfenster: Stufe 1 im Mittel ≈ 1 s, ab Stufe 8 genau 300–800 ms', () => {
    const w1 = pauseWindow(1);
    expect((w1.min + w1.max) / 2).toBeGreaterThan(950);
    expect((w1.min + w1.max) / 2).toBeLessThan(1250);
    expect(pauseWindow(8)).toEqual({ min: 300, max: 800 });
    const rng = createRng(3);
    for (let i = 0; i < 500; i++) {
      const p = pauseMs(rng, 8);
      expect(p).toBeGreaterThanOrEqual(300);
      expect(p).toBeLessThanOrEqual(800);
    }
  });

  it('Zeichensätze: je vier, ähnliche Zeichen B D P R, Symbole', () => {
    for (const k of Object.keys(SIGNS) as Array<keyof typeof SIGNS>) {
      expect(SIGNS[k]).toHaveLength(4);
      expect(new Set(SIGNS[k]).size).toBe(4);
    }
    expect(SIGNS.similar).toEqual(['B', 'D', 'P', 'R']);
    expect(paramsFor(9).signs).toBe('similar');
    expect(paramsFor(10).signs).toBe('symbols');
  });
});

describe('Anpassungsregel 90 / 75 %', () => {
  it('≥ 90 % mit gleichmäßiger Zeit → schwerer', () => {
    expect(moveFor({ accuracy: 11 / 12, stable: true })).toBe('harder');
    expect(moveFor({ accuracy: 1, stable: true })).toBe('harder');
    expect(moveFor({ accuracy: 0.9, stable: true })).toBe('harder');
  });
  it('≥ 90 % aber unruhige Zeit → gleich', () => {
    expect(moveFor({ accuracy: 1, stable: false })).toBe('same');
  });
  it('75–89 % → gleich; < 75 % → leichter', () => {
    expect(moveFor({ accuracy: 10 / 12, stable: true })).toBe('same');
    expect(moveFor({ accuracy: 0.75, stable: true })).toBe('same');
    expect(moveFor({ accuracy: 9 / 12, stable: true })).toBe('same');
    expect(moveFor({ accuracy: 8 / 12, stable: true })).toBe('easier');
    expect(moveFor({ accuracy: 0.74, stable: true })).toBe('easier');
    expect(moveFor({ accuracy: 0, stable: false })).toBe('easier');
  });
  it('Stufe bleibt zwischen 1 und 12', () => {
    expect(applyMove(1, 'easier')).toBe(1);
    expect(applyMove(12, 'harder')).toBe(12);
    expect(applyMove(5, 'harder')).toBe(6);
    expect(applyMove(5, 'easier')).toBe(4);
    expect(applyMove(5, 'same')).toBe(5);
  });
  it('stabile Zeit: Quartilsabstand höchstens 60 % des Medians, mindestens 4 Werte', () => {
    expect(isStable([800, 820, 900, 950, 870, 910])).toBe(true);
    expect(isStable([500, 2500, 600, 2800, 700, 3000])).toBe(false);
    expect(isStable([800, 900, 850])).toBe(false);
  });
  it('Abschnittswertung: Treffer = saubere Durchgänge', () => {
    const trials = Array.from({ length: 12 }, (_, i) => mk(i, i === 3 ? 2 : (i + 1) % 4, i * 0 + 700 + i * 5, { clean: i !== 5 }));
    const s = evalSegment(trials);
    expect(s.total).toBe(12);
    expect(s.hits).toBe(11);
    expect(s.accuracy).toBeCloseTo(11 / 12, 6);
    expect(Number.isFinite(s.meanMs)).toBe(true);
  });
  it('erreichte Stufe: höchste Stufe mit ≥ 75 %, sonst eine unter der niedrigsten', () => {
    expect(reachedLevel([], 4)).toBe(4);
    expect(reachedLevel([{ level: 3, accuracy: 0.92 }, { level: 4, accuracy: 0.6 }, { level: 3, accuracy: 0.8 }], 3)).toBe(3);
    expect(reachedLevel([{ level: 3, accuracy: 0.92 }, { level: 4, accuracy: 0.8 }, { level: 5, accuracy: 0.5 }], 4)).toBe(4);
    expect(reachedLevel([{ level: 1, accuracy: 0.5 }], 1)).toBe(1);
    expect(reachedLevel([{ level: 6, accuracy: 0.5 }, { level: 5, accuracy: 0.4 }], 4)).toBe(4);
  });
});

describe('Zielfolge', () => {
  const run = (seed: number, n: number): TargetSequence => {
    const rng = createRng(seed);
    const seq = new TargetSequence();
    for (let i = 0; i < n; i++) seq.next(rng);
    return seq;
  };

  it('nie dasselbe Ziel zweimal hintereinander, kein Pendeln A B A B', () => {
    for (let seed = 1; seed <= 40; seed++) {
      const h = run(seed, 300).history;
      for (let i = 1; i < h.length; i++) expect(h[i]).not.toBe(h[i - 1]);
      for (let i = 3; i < h.length; i++) expect(h[i] === h[i - 2] && h[i - 1] === h[i - 3]).toBe(false);
      expect(Math.min(...h)).toBe(0);
      expect(Math.max(...h)).toBe(3);
    }
  });

  it('die 12 gerichteten Wechsel kommen über 240 Wechsel etwa gleich oft vor (20 ± 4)', () => {
    for (let seed = 1; seed <= 40; seed++) {
      const seq = run(seed, 241);
      for (const a of CORNERS)
        for (const b of CORNERS) {
          if (a === b) {
            expect(seq.counts[a][b]).toBe(0);
          } else {
            expect(seq.counts[a][b], `seed ${seed} ${a}→${b}`).toBeGreaterThanOrEqual(16);
            expect(seq.counts[a][b], `seed ${seed} ${a}→${b}`).toBeLessThanOrEqual(24);
          }
        }
    }
  });

  it('auch in einer kurzen Sitzung (36 Ziele) ist kein Wechsel mehr als doppelt so häufig wie ein anderer plus 3', () => {
    for (let seed = 1; seed <= 40; seed++) {
      const seq = run(seed, 37);
      const flat = seq.counts.flatMap((row, a) => row.filter((_, b) => a !== b));
      expect(Math.max(...flat)).toBeLessThanOrEqual(Math.min(...flat) * 2 + 3);
    }
  });

  it('die Ecken kommen gleich oft vor (je 25 % ± 6)', () => {
    const h = run(7, 400).history;
    for (const c of CORNERS) {
      const share = h.filter((x) => x === c).length / h.length;
      expect(share).toBeGreaterThan(0.19);
      expect(share).toBeLessThan(0.31);
    }
  });

  it('ist nicht vorhersagbar: das häufigste Folgeziel trifft nur etwa jeden dritten Wechsel', () => {
    const h = run(11, 600).history;
    const next = new Map<string, Map<number, number>>();
    for (let i = 2; i < h.length; i++) {
      const key = `${h[i - 2]}${h[i - 1]}`;
      const m = next.get(key) ?? new Map<number, number>();
      m.set(h[i], (m.get(h[i]) ?? 0) + 1);
      next.set(key, m);
    }
    let best = 0;
    let all = 0;
    for (const m of next.values()) {
      best += Math.max(...m.values());
      all += [...m.values()].reduce((a, b) => a + b, 0);
    }
    expect(best / all).toBeLessThan(0.62);
  });

  it('läuft deterministisch mit demselben Startwert', () => {
    expect(run(5, 50).history).toEqual(run(5, 50).history);
    expect(run(5, 50).history).not.toEqual(run(6, 50).history);
  });
});

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
});

// ---------------------------------------------------------------------------
// Zusammenfassung

function mk(index: number, to: number, rt: number | null, o: Partial<Trial> = {}): Trial {
  const from = index === 0 ? null : (to + 1) % 4;
  return { index, from, to, level: 1, clean: rt !== null, rt, errors: 0, distractorTaps: 0, omitted: false, ...o };
}

describe('Zusammenfassung', () => {
  it('zählt Treffer, Fehler, Ablenker-Tipps und Auslassungen getrennt', () => {
    const trials: Trial[] = [
      mk(0, 1, 800),
      mk(1, 2, 900),
      mk(2, 0, null, { clean: false, errors: 2 }),
      mk(3, 3, null, { clean: false, distractorTaps: 1 }),
      mk(4, 1, null, { clean: false, omitted: true }),
      mk(5, 2, 700),
    ];
    const s = summarize(trials);
    expect(s.total).toBe(6);
    expect(s.hits).toBe(3);
    expect(s.errors).toBe(2);
    expect(s.distractorTaps).toBe(1);
    expect(s.omissions).toBe(1);
    expect(s.meanMs).toBeCloseTo(800, 6);
  });

  it('Auslassungen und Fehlversuche gehen nicht in den Mittelwert der Zeit ein', () => {
    const trials: Trial[] = [mk(0, 1, 800), mk(1, 2, 800), mk(2, 0, null, { clean: false, omitted: true, rt: null })];
    expect(summarize(trials).meanMs).toBe(800);
    expect(Number.isNaN(summarize([mk(0, 1, null, { clean: false, omitted: true })]).meanMs)).toBe(true);
  });

  it('erste und letzte Hälfte getrennt (Mittelwert ab 3 richtigen Antworten)', () => {
    const trials = Array.from({ length: 12 }, (_, i) => mk(i, (i + 1) % 4, i < 6 ? 700 : 900));
    const s = summarize(trials);
    expect(s.firstHalfMs).toBe(700);
    expect(s.lastHalfMs).toBe(900);
    expect(s.firstHalfTotal).toBe(6);
    expect(s.lastHalfTotal).toBe(6);
    expect(s.firstHalfHits).toBe(6);
    // zu wenige richtige
    const few = Array.from({ length: 12 }, (_, i) => mk(i, (i + 1) % 4, i < 2 ? 700 : null, { clean: i < 2 }));
    expect(Number.isNaN(summarize(few).firstHalfMs)).toBe(true);
    // ungerade Zahl: das mittlere Ziel gehört zu keiner Hälfte
    const odd = summarize(Array.from({ length: 11 }, (_, i) => mk(i, (i + 1) % 4, 800)));
    expect(odd.firstHalfTotal + odd.lastHalfTotal).toBe(10);
  });

  it('Richtungen: Mittelwert je Klasse erst ab genug richtigen Antworten (hier Schwelle 3), schnellste und langsamste Richtung', () => {
    // 5× 0→1 (→) mit 600 ms, 3× 1→0 (←) mit 1000 ms, 2× 0→2 (↓) mit 400 ms (zu wenige)
    const trials: Trial[] = [];
    let i = 0;
    const add = (from: number, to: number, rt: number | null, o: Partial<Trial> = {}) => trials.push({ index: i++, from, to, level: 1, clean: rt !== null, rt, errors: 0, distractorTaps: 0, omitted: false, ...o });
    for (let k = 0; k < 5; k++) add(0, 1, 600);
    for (let k = 0; k < 3; k++) add(1, 0, 1000);
    for (let k = 0; k < 2; k++) add(0, 2, 400);
    add(0, 1, null, { clean: false, errors: 1 }); // unsauber: nicht mitgezählt
    const s = summarize(trials, 3);
    const right = s.directions.find((d) => d.dir === 'right')!;
    const left = s.directions.find((d) => d.dir === 'left')!;
    const down = s.directions.find((d) => d.dir === 'down')!;
    expect(right.n).toBe(5);
    expect(right.meanMs).toBe(600);
    expect(left.n).toBe(3);
    expect(left.meanMs).toBe(1000);
    expect(down.n).toBe(2);
    expect(Number.isNaN(down.meanMs)).toBe(true);
    expect(s.fastest).toBe('right');
    expect(s.slowest).toBe('left');
    expect(s.directions).toHaveLength(8);
  });

  it('Standard-Schwelle für Richtungsmittel ist 8 (3 Werte sind bei Streuung ≈ 150 ms zu unsicher)', () => {
    expect(MIN_FOR_DIRECTION).toBe(8);
    const trials: Trial[] = [];
    for (let k = 0; k < 7; k++) trials.push({ index: k, from: 0, to: 1, level: 1, clean: true, rt: 600, errors: 0, distractorTaps: 0, omitted: false });
    expect(Number.isNaN(summarize(trials).directions.find((d) => d.dir === 'right')!.meanMs)).toBe(true);
    trials.push({ index: 7, from: 0, to: 1, level: 1, clean: true, rt: 600, errors: 0, distractorTaps: 0, omitted: false });
    expect(summarize(trials).directions.find((d) => d.dir === 'right')!.meanMs).toBe(600);
  });

  it('keine schnellste/langsamste Richtung, wenn weniger als zwei Richtungen genug Daten haben', () => {
    const trials = Array.from({ length: 6 }, (_, i) => ({ ...mk(i + 1, 1, 700), from: 0 }));
    const s = summarize(trials);
    expect(s.fastest).toBeNull();
    expect(s.slowest).toBeNull();
  });

  it('leere Sitzung ist unauffällig', () => {
    const s = summarize([]);
    expect(s.total).toBe(0);
    expect(Number.isNaN(s.meanMs)).toBe(true);
    expect(s.directions).toHaveLength(8);
    expect(tipFor(s)).toBe('great');
  });

  it('Tipps: Fehler, Ablenker, Auslassungen, Ermüdung, Richtung', () => {
    const base = (o: Partial<Trial>[]): Trial[] => Array.from({ length: 12 }, (_, i) => mk(i, (i + 1) % 4, 800, o[i] ?? {}));
    const bad = (e: Partial<Trial>) => ({ clean: false, rt: null, ...e });
    expect(tipFor(summarize(base([bad({ errors: 2 }), bad({ errors: 1 })])))).toBe('wrong');
    expect(tipFor(summarize(base([bad({ distractorTaps: 1 }), bad({ distractorTaps: 1 }), bad({ distractorTaps: 1 })])))).toBe('distractor');
    expect(tipFor(summarize(base([bad({ omitted: true }), bad({ omitted: true }), bad({ omitted: true })])))).toBe('slow');
    const tired = Array.from({ length: 24 }, (_, i) => mk(i, (i + 1) % 4, i < 12 ? 700 : 900));
    expect(tipFor(summarize(tired))).toBe('tired');
    expect(tipFor(summarize(Array.from({ length: 24 }, (_, i) => mk(i, (i + 1) % 4, 700))))).toBe('great');
  });
});

// ---------------------------------------------------------------------------
// Geometrie

describe('Geometrie: alle Ziele bleiben im Feld', () => {
  for (const vp of VIEWPORTS) {
    it(`${vp.name} ${vp.w}×${vp.h}: jede Stufe, Ziele und Trefferkreise im Feld, Kreise überlappen nie`, () => {
      const u = Math.min(vp.w, vp.h) / 100;
      for (const L of LEVELS) {
        const lay = layoutFor(vp.w, vp.h, u, L.sizeU, L.reach);
        expect(lay.centers).toHaveLength(4);
        for (const c of lay.centers) {
          expect(c.x - lay.hitR, `Stufe ${L.level} links`).toBeGreaterThanOrEqual(-1e-6);
          expect(c.x + lay.hitR, `Stufe ${L.level} rechts`).toBeLessThanOrEqual(vp.w + 1e-6);
          expect(c.y - lay.hitR, `Stufe ${L.level} oben`).toBeGreaterThanOrEqual(-1e-6);
          expect(c.y + lay.hitR, `Stufe ${L.level} unten`).toBeLessThanOrEqual(vp.h + 1e-6);
        }
        expect(lay.r).toBeLessThanOrEqual(lay.hitR - 5);
        for (let i = 0; i < 4; i++)
          for (let j = i + 1; j < 4; j++) {
            const d = Math.hypot(lay.centers[i].x - lay.centers[j].x, lay.centers[i].y - lay.centers[j].y);
            expect(d, `Stufe ${L.level} ${i}-${j}`).toBeGreaterThanOrEqual(2 * lay.hitR - 1e-6);
          }
        // Ecken: 0 oben links, 1 oben rechts, 2 unten links, 3 unten rechts
        expect(lay.centers[0].x).toBeLessThan(lay.centers[1].x);
        expect(lay.centers[0].y).toBeLessThan(lay.centers[2].y);
        expect(lay.centers[2].x).toBeLessThan(lay.centers[3].x);
        expect(lay.centers[1].y).toBeLessThan(lay.centers[3].y);
      }
    });

    it(`${vp.name}: Trefferradius ≥ 72 px (nur auf sehr kleinen Feldern bis 56), Zeichen nie unter 34 px`, () => {
      const u = Math.min(vp.w, vp.h) / 100;
      for (const L of LEVELS) {
        const lay = layoutFor(vp.w, vp.h, u, L.sizeU, L.reach);
        const short = Math.min(vp.w, vp.h);
        expect(lay.hitR).toBeGreaterThanOrEqual(short >= 300 ? HIT_R_PX : HIT_R_MIN_PX);
        expect(lay.glyph).toBeGreaterThanOrEqual(MIN_GLYPH_PX - 1e-6);
      }
    });
  }

  it('Stufe 1: Zeichenhöhe ≥ 20 % der kürzeren Seite (wo der Trefferkreis es zulässt)', () => {
    for (const vp of VIEWPORTS.slice(0, 3)) {
      const short = Math.min(vp.w, vp.h);
      const lay = layoutFor(vp.w, vp.h, short / 100, paramsFor(1).sizeU, paramsFor(1).reach);
      expect(lay.glyph).toBeGreaterThanOrEqual(0.2 * short - 1e-6);
    }
  });

  it('schwerste Stufe: Zeichenhöhe nicht unter 34 px, auf dem Tablet deutlich größer', () => {
    const lay = layoutFor(390, 700, 3.9, paramsFor(12).sizeU, paramsFor(12).reach);
    expect(lay.glyph).toBeGreaterThanOrEqual(34);
    expect(lay.glyph).toBeLessThan(45);
  });

  it('Rand: je größer „reach“, desto weiter sind die Ziele auseinander', () => {
    const a = layoutFor(1180, 740, 7.4, 9, 0.55);
    const b = layoutFor(1180, 740, 7.4, 9, 0.78);
    const c = layoutFor(1180, 740, 7.4, 9, 1);
    expect(b.centers[1].x - b.centers[0].x).toBeGreaterThan(a.centers[1].x - a.centers[0].x);
    expect(c.centers[1].x - c.centers[0].x).toBeGreaterThan(b.centers[1].x - b.centers[0].x);
    expect(c.centers[0].x).toBeCloseTo(c.hitR + Math.max(6, 7.4 * 1.2), 6);
  });

  it('cornerAt findet den Trefferkreis, außerhalb -1', () => {
    const lay = layoutFor(1180, 740, 7.4, 9, 1);
    CORNERS.forEach((c) => expect(cornerAt(lay, lay.centers[c].x + 3, lay.centers[c].y - 3)).toBe(c));
    expect(cornerAt(lay, 590, 370)).toBe(-1);
  });
});

describe('Ablenker', () => {
  const seeds = [123456, 98765, 4242, 31337, 777, 2024];
  for (const vp of VIEWPORTS.slice(0, 4)) {
    it(`${vp.name}: 6 Ablenker passen ins Feld, halten Abstand zu den Zielen und zueinander`, () => {
      const u = Math.min(vp.w, vp.h) / 100;
      const L = paramsFor(12);
      const lay = layoutFor(vp.w, vp.h, u, L.sizeU, L.reach);
      const d = distractorsFor(L.distractors, seeds, lay);
      expect(d).toHaveLength(6);
      const dh = distractorHitR(lay.glyph);
      for (const p of d) {
        expect(p.x - dh).toBeGreaterThanOrEqual(0);
        expect(p.x + dh).toBeLessThanOrEqual(vp.w);
        expect(p.y - dh).toBeGreaterThanOrEqual(0);
        expect(p.y + dh).toBeLessThanOrEqual(vp.h);
        for (const c of lay.centers) expect(Math.hypot(p.x - c.x, p.y - c.y)).toBeGreaterThanOrEqual(lay.hitR + dh);
      }
      for (let i = 0; i < d.length; i++)
        for (let j = i + 1; j < d.length; j++) expect(Math.hypot(d[i].x - d[j].x, d[i].y - d[j].y)).toBeGreaterThanOrEqual(2 * dh);
    });
  }

  it('deterministisch, die ersten n sind unabhängig von der Anzahl (nichts springt), nur Ablenker-Zeichen außerhalb der Symbole', () => {
    const lay = layoutFor(1180, 740, 7.4, 9, 1);
    const six = distractorsFor(6, seeds, lay);
    const three = distractorsFor(3, seeds, lay);
    expect(three).toEqual(six.slice(0, 3));
    expect(distractorsFor(6, seeds, lay)).toEqual(six);
    expect(distractorsFor(0, seeds, lay)).toEqual([]);
    expect(new Set(six.map((p) => p.kind)).size).toBe(6);
    for (const p of six) for (const s of SIGNS.symbols) expect(p.kind).not.toBe(s);
  });

  it('andere Startwerte ergeben andere Anordnungen', () => {
    const lay = layoutFor(1180, 740, 7.4, 9, 1);
    const a = distractorsFor(3, [1, 2, 3], lay);
    const b = distractorsFor(3, [900, 17, 4], lay);
    expect(a).not.toEqual(b);
  });
});

describe('Blockplan', () => {
  it('3 Blöcke à 60 s, Pause ≥ 5 s vorgeschlagen; Schnellmodus kürzer', () => {
    const p = blockPlan(false);
    expect(p.blocks).toBe(3);
    expect(p.blockMs).toBe(60000);
    expect(p.restMs).toBeGreaterThanOrEqual(5000);
    expect(p.segment).toBe(SEGMENT_TARGETS);
    const q = blockPlan(true);
    expect(q.blocks * q.blockMs).toBeLessThan(30000);
  });
});

// ---------------------------------------------------------------------------
// Simulationsspieler: ganze Sitzungen mit Folge, Fehlern, Abschnitten und Anpassung

interface Skill {
  /** Wahrscheinlichkeit eines sauberen Treffers auf Stufe 1 und Abnahme je Stufe */
  acc1: number;
  perLevel: number;
  /** mittlere Reaktionszeit in ms auf Stufe 1, Zuwachs je Stufe (ms) */
  rt1: number;
  rtPerLevel: number;
  /** Ermüdung: Zeitzuwachs je Ziel in ms */
  tire: number;
}

function simulate(seed: number, skill: Skill, level0 = 1, blocks = 3, targetsPerBlock = 28) {
  const rng = createRng(seed);
  const seq = new TargetSequence();
  const trials: Trial[] = [];
  const segLog: Array<{ level: number; accuracy: number }> = [];
  let level = level0;
  let segStart = 0;
  const levels: number[] = [];
  for (let b = 0; b < blocks; b++) {
    for (let k = 0; k < targetsPerBlock; k++) {
      const from = seq.last;
      const to = seq.next(rng);
      const acc = Math.min(0.995, Math.max(0.05, skill.acc1 - skill.perLevel * (level - 1)));
      const clean = rng.chance(acc);
      const diag = from !== null && directionOf(from, to)!.length > 5 ? 120 : 0;
      const rt = Math.max(250, skill.rt1 + skill.rtPerLevel * (level - 1) + diag + skill.tire * trials.length + rng.normal() * 110);
      trials.push({
        index: trials.length,
        from,
        to,
        level,
        clean,
        rt: clean ? rt : null,
        errors: clean ? 0 : rng.chance(0.7) ? 1 : 0,
        distractorTaps: 0,
        omitted: !clean && rng.chance(0.3),
      });
      levels.push(level);
      if (trials.length - segStart >= SEGMENT_TARGETS) {
        const st = evalSegment(trials.slice(segStart));
        segLog.push({ level, accuracy: st.accuracy });
        level = applyMove(level, moveFor(st));
        segStart = trials.length;
      }
    }
  }
  return { trials, level, segLog, levels, reached: reachedLevel(segLog, level) };
}

describe('Simulationsspieler über viele Startwerte', () => {
  const STRONG: Skill = { acc1: 0.995, perLevel: 0.002, rt1: 620, rtPerLevel: 6, tire: 0.3 };
  const MID: Skill = { acc1: 0.97, perLevel: 0.03, rt1: 800, rtPerLevel: 12, tire: 0.6 };
  const WEAK: Skill = { acc1: 0.8, perLevel: 0.06, rt1: 1100, rtPerLevel: 20, tire: 0.8 };

  it('starker Spieler klettert hoch, schwacher bleibt unten, mittlerer liegt dazwischen (50 Startwerte)', () => {
    const avg = (s: Skill) => {
      let sum = 0;
      for (let seed = 1; seed <= 50; seed++) sum += simulate(seed, s).reached;
      return sum / 50;
    };
    const strong = avg(STRONG);
    const mid = avg(MID);
    const weak = avg(WEAK);
    expect(strong).toBeGreaterThan(mid);
    expect(mid).toBeGreaterThan(weak);
    expect(strong).toBeGreaterThanOrEqual(6);
    expect(weak).toBeLessThanOrEqual(3);
  });

  it('die Stufe ändert sich nur um höchstens eins je Abschnitt und bleibt in 1..12', () => {
    for (let seed = 1; seed <= 50; seed++) {
      const sim = simulate(seed, MID, 1 + (seed % 12));
      const seg = sim.segLog.map((s) => s.level);
      for (let i = 1; i < seg.length; i++) expect(Math.abs(seg[i] - seg[i - 1])).toBeLessThanOrEqual(1);
      for (const l of sim.levels) {
        expect(l).toBeGreaterThanOrEqual(MIN_LEVEL);
        expect(l).toBeLessThanOrEqual(MAX_LEVEL);
      }
    }
  });

  it('Stufe wechselt nur zwischen Abschnitten (innerhalb von 12 Zielen konstant)', () => {
    const sim = simulate(3, STRONG);
    for (let i = 0; i + SEGMENT_TARGETS <= sim.levels.length; i += SEGMENT_TARGETS) {
      expect(new Set(sim.levels.slice(i, i + SEGMENT_TARGETS)).size).toBe(1);
    }
  });

  it('ein Spieler mit < 75 % fällt auf Stufe 1 zurück, mit 100 % und gleichmäßiger Zeit steigt er jeden Abschnitt', () => {
    const perfect: Skill = { acc1: 1, perLevel: 0, rt1: 700, rtPerLevel: 0, tire: 0 };
    const sim = simulate(2, perfect, 1, 3, 40);
    expect(sim.segLog.slice(0, 6).map((s) => s.level)).toEqual([1, 2, 3, 4, 5, 6]);
    const hopeless: Skill = { acc1: 0.3, perLevel: 0, rt1: 1500, rtPerLevel: 0, tire: 0 };
    const low = simulate(2, hopeless, 7);
    expect(low.levels[low.levels.length - 1]).toBeLessThan(7);
    expect(low.levels).toContain(1);
  });

  it('Auswertung ist über viele Sitzungen in sich stimmig: Treffer + unsaubere = alle, Richtungsmittel nur mit ≥ 8', () => {
    for (let seed = 1; seed <= 50; seed++) {
      const { trials } = simulate(seed, MID);
      const s = summarize(trials);
      expect(s.total).toBe(trials.length);
      expect(s.hits + trials.filter((t) => !t.clean).length).toBe(s.total);
      for (const d of s.directions) expect(Number.isFinite(d.meanMs)).toBe(d.n >= MIN_FOR_DIRECTION);
      expect(s.firstHalfTotal).toBe(s.lastHalfTotal);
      if (s.fastest && s.slowest) {
        const f = s.directions.find((d) => d.dir === s.fastest)!;
        const l = s.directions.find((d) => d.dir === s.slowest)!;
        expect(f.meanMs).toBeLessThanOrEqual(l.meanMs);
      }
      // nach drei Blöcken à 28 Zielen sind fast alle geraden Richtungen belegt
      expect(s.directions.filter((d) => d.n >= 3).length).toBeGreaterThanOrEqual(4);
    }
  });

  it('Ermüdung erscheint als Unterschied zwischen erster und letzter Hälfte', () => {
    const tired: Skill = { acc1: 0.995, perLevel: 0, rt1: 600, rtPerLevel: 0, tire: 5 };
    const s = summarize(simulate(9, tired, 1, 3, 30).trials);
    expect(s.lastHalfMs).toBeGreaterThan(s.firstHalfMs + 100);
  });
});

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

  it('keine Fachwörter, keine Diagnose-/Test-/Normwert-Sprache, keine Wirkversprechen', () => {
    const all = JSON.stringify([de, itTexts, science.texts]);
    expect(all).not.toMatch(/sakkad|saccad|diagnos|normwert|valori normali|\btest\b|heil|garantier|garanti/i);
    // „Test“ nur als Teil von Wörtern wie „Latest“ gibt es nicht; „Eye-Tracking“ nur als Verneinung
    expect(de.why).not.toMatch(/Eye-Tracking/);
    expect(science.texts.de.research).toMatch(/kein Eye-Tracking/);
  });

  it('Reaktionszeit heißt „Reaktionszeit Ziel → Touch“ und enthält den Gerätehinweis (Touch misst zu lang)', () => {
    expect(de.metrics.reaction).toBe('Reaktionszeit Ziel → Touch');
    expect(de.feedback.note).toMatch(/50–70 ms/);
    expect(itTexts.feedback.note).toMatch(/50–70 ms/);
    expect(de.feedback.note).toMatch(/nicht den Blick/);
  });

  it('Quellenliste: mindestens 3 https-Quellen', () => {
    expect(science.sources.length).toBeGreaterThanOrEqual(3);
    for (const s of science.sources) expect(s.url).toMatch(/^https:\/\/doi\.org\//);
  });
});
