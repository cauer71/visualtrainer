import { describe, expect, it } from 'vitest';
import {
  BLOCKS,
  BLOCK_MS,
  DEMO_PLAN,
  END_MS,
  LEAD_MS,
  PLAN,
  QUICK_PLAN,
  REST_MS,
  TapGate,
  blockStart,
  computeStats,
  liveRate,
  rateHz,
  timelineAt,
  tipFor,
  totalMs,
} from '../../src/exercises/tipp-tempo/logic';

describe('tipp-tempo: Zeitplan', () => {
  it('Standard: 3 Runden à 20 s mit Pausen, Gesamtdauer stimmt', () => {
    expect(BLOCKS).toBe(3);
    expect(BLOCK_MS).toBe(20000);
    expect(REST_MS).toBeGreaterThanOrEqual(15000);
    expect(totalMs(PLAN)).toBe(LEAD_MS + 3 * BLOCK_MS + 2 * REST_MS + END_MS);
    expect(blockStart(PLAN, 0)).toBe(LEAD_MS);
    expect(blockStart(PLAN, 2)).toBe(LEAD_MS + 2 * (BLOCK_MS + REST_MS));
  });

  it('Phasen in der richtigen Reihenfolge', () => {
    const seq: string[] = [];
    for (let e = 0; e <= totalMs(PLAN) + 1000; e += 100) {
      const tl = timelineAt(e, PLAN);
      const key = `${tl.phase}${tl.phase === 'block' || tl.phase === 'rest' ? tl.block : ''}`;
      if (seq[seq.length - 1] !== key) seq.push(key);
    }
    expect(seq).toEqual(['lead', 'block0', 'rest0', 'block1', 'rest1', 'block2', 'end', 'done']);
  });

  it('Grenzen: Start der Runde gehört zur Runde, Ende zur Pause, genau nach dem Nachspiel „done“', () => {
    expect(timelineAt(LEAD_MS - 1, PLAN).phase).toBe('lead');
    expect(timelineAt(LEAD_MS, PLAN).phase).toBe('block');
    expect(timelineAt(LEAD_MS + BLOCK_MS - 1, PLAN).phase).toBe('block');
    expect(timelineAt(LEAD_MS + BLOCK_MS, PLAN).phase).toBe('rest');
    expect(timelineAt(totalMs(PLAN) - 1, PLAN).phase).toBe('end');
    expect(timelineAt(totalMs(PLAN), PLAN).phase).toBe('done');
    expect(timelineAt(-50, PLAN).phase).toBe('lead');
  });

  it('Rundenzeit und Restzeit passen zusammen', () => {
    const tl = timelineAt(LEAD_MS + 5000, PLAN);
    expect(tl.phase).toBe('block');
    expect(tl.into).toBe(5000);
    expect(tl.left).toBe(BLOCK_MS - 5000);
  });

  it('Countdown 3-2-1 zu Beginn und in den letzten Sekunden der Pause, sonst 0', () => {
    expect(timelineAt(0, PLAN).countdown).toBe(3);
    expect(timelineAt(1100, PLAN).countdown).toBe(2);
    expect(timelineAt(2100, PLAN).countdown).toBe(1);
    expect(timelineAt(LEAD_MS + BLOCK_MS + 5000, PLAN).countdown).toBe(0);
    const restEnd = LEAD_MS + BLOCK_MS + REST_MS;
    expect(timelineAt(restEnd - 2900, PLAN).countdown).toBe(3);
    expect(timelineAt(restEnd - 1500, PLAN).countdown).toBe(2);
    expect(timelineAt(restEnd - 400, PLAN).countdown).toBe(1);
    expect(timelineAt(LEAD_MS + 1000, PLAN).countdown).toBe(0);
  });

  it('Test-Modus und Intro-Film sind kurz', () => {
    expect(totalMs(QUICK_PLAN)).toBeLessThan(20000);
    expect(QUICK_PLAN.blocks).toBe(3);
    const demo = totalMs(DEMO_PLAN);
    expect(demo).toBeGreaterThanOrEqual(8000);
    expect(demo).toBeLessThanOrEqual(14000);
  });
});

describe('tipp-tempo: nur ein Finger zählt', () => {
  it('erster Finger zählt, zweiter gleichzeitiger nicht', () => {
    const g = new TapGate();
    expect(g.press(1, 0)).toBe(true);
    expect(g.press(2, 40)).toBe(false);
    expect(g.press(3, 80)).toBe(false);
  });

  it('Finger heben und anderen aufsetzen: zählt wieder', () => {
    const g = new TapGate();
    expect(g.press(1, 0)).toBe(true);
    g.release(1);
    expect(g.press(2, 120)).toBe(true);
    g.release(2);
    expect(g.press(1, 240)).toBe(true);
  });

  it('Dauertippen mit demselben Finger (mehrfach ohne „hoch“, z. B. Geister-Hand) zählt immer', () => {
    const g = new TapGate();
    for (let i = 0; i < 10; i++) expect(g.press(-1, i * 150)).toBe(true);
  });

  it('Wird der erste Finger gehoben, zählt der zweite, der noch aufliegt, erst wieder nach dem nächsten Aufsetzen', () => {
    const g = new TapGate();
    expect(g.press(1, 0)).toBe(true);
    expect(g.press(2, 30)).toBe(false);
    g.release(1);
    // 2 liegt weiter auf: ein neuer Tipp von 1 wird nicht gewertet, bis 2 gehoben ist
    expect(g.press(1, 100)).toBe(false);
    g.release(2);
    g.release(1);
    expect(g.press(1, 200)).toBe(true);
  });

  it('Hängengebliebene Finger (nie „hoch“) sperren höchstens 600 ms', () => {
    const g = new TapGate();
    expect(g.press(7, 0)).toBe(true);
    expect(g.press(8, 300)).toBe(false);
    expect(g.press(9, 1000)).toBe(true);
  });

  it('reset leert alles', () => {
    const g = new TapGate();
    g.press(1, 0);
    g.reset();
    expect(g.press(2, 10)).toBe(true);
  });
});

describe('tipp-tempo: Raten', () => {
  it('Tipps pro Sekunde einer Runde', () => {
    expect(rateHz(100, 20000)).toBe(5);
    expect(rateHz(0, 20000)).toBe(0);
    expect(rateHz(10, 0)).toBe(0);
  });

  it('laufende Rate: letzte 2 s, in den ersten Sekunden durch die vergangene Zeit', () => {
    // 10 Tipps in 2 s = 5 pro Sekunde
    const times = Array.from({ length: 10 }, (_, i) => 8000 + i * 200);
    expect(liveRate(times, 9900, 5000)).toBeCloseTo(5, 6);
    // alte Tipps zählen nicht
    expect(liveRate([100, 200, 300], 9000, 9000)).toBe(0);
    // Anfang: 3 Tipps in 0,6 s → 5 pro Sekunde, nicht durch volle 2 s geteilt
    expect(liveRate([0, 200, 400], 600, 600)).toBeCloseTo(5, 6);
    // ganz am Anfang nie durch weniger als 0,5 s
    expect(liveRate([10], 20, 20)).toBeCloseTo(2, 6);
  });
});

describe('tipp-tempo: Auswertung', () => {
  it('Durchschnitt, beste Runde, Abfall in %', () => {
    const s = computeStats([100, 90, 80], 20000);
    expect(s.mean).toBe(90);
    expect(s.best).toBe(100);
    expect(s.meanHz).toBeCloseTo(4.5, 6);
    expect(s.bestHz).toBe(5);
    expect(s.dropPct).toBeCloseTo(20, 6);
  });

  it('Negativer Abfall, wenn die letzte Runde die beste ist', () => {
    const s = computeStats([80, 85, 92], 20000);
    expect(s.dropPct).toBeCloseTo(-15, 6);
    expect(s.best).toBe(92);
  });

  it('Sonderfälle: keine Tipps, erste Runde 0, nur eine Runde', () => {
    expect(computeStats([], 20000).mean).toBe(0);
    expect(computeStats([0, 0, 0], 20000).dropPct).toBe(0);
    expect(computeStats([0, 50, 60], 20000).dropPct).toBe(0);
    expect(computeStats([70], 20000).dropPct).toBe(0);
  });

  it('Tipps: nichts gezählt > mehrere Finger > Ermüdung > Anlaufen > gleichmäßig', () => {
    const even = computeStats([100, 98, 97], 20000);
    expect(tipFor(even, 0)).toBe('even');
    expect(tipFor(computeStats([0, 0, 0], 20000), 0)).toBe('none');
    expect(tipFor(even, 6)).toBe('onefinger');
    expect(tipFor(even, 5)).toBe('even');
    expect(tipFor(computeStats([100, 85, 70], 20000), 0)).toBe('fatigue');
    expect(tipFor(computeStats([80, 85, 92], 20000), 0)).toBe('warm');
    expect(tipFor(computeStats([0, 0, 0], 20000), 9)).toBe('none');
  });
});
