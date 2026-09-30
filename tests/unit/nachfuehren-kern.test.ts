/**
 * Tests für den gemeinsamen Kern „Nachführen mit dem Finger“ (src/exercises/_shared/nachfuehren*.ts):
 * reine Logik + Durchlauf mit einer Attrappen-Übung (Film, Autoplay, Pause beim Abheben, Bildratenunabhängigkeit).
 */
import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import type { ExerciseDefinition, ExerciseTexts } from '../../src/core/types';
import {
  DEMO_SEGMENT_S,
  LEAD_S,
  MAX_LEVEL,
  MIN_LEVEL,
  nachfuehren,
  type RuleSetup,
  type TrackRule,
} from '../../src/exercises/_shared/nachfuehren';
import {
  defaultBandU,
  deviationPercent,
  fingerOffsetPx,
  freeDisturbance,
  lockAxes,
  markerFrom,
  PASS_FRACTION,
  pointsFor,
  QUICK_SEGMENT_S,
  rampTime,
  SEGMENT_S,
  segmentSeconds,
  smoothstep,
  TrackStats,
  Trail,
  trapezoid,
  Wobble,
} from '../../src/exercises/_shared/nachfuehren-logic';
import { simulate } from './_sim-w08-w09';

const texts: ExerciseTexts = {
  title: 'Test',
  tagline: 't',
  steps: ['a', 'b'],
  why: 'w',
  goodFor: ['x'],
  captions: { touch: 'touch', follow: 'follow', band: 'band', goal: 'goal' },
  metrics: { level: 'l', inBand: 'i', deviation: 'd', passed: 'p' },
  tips: { ahead: 'a', calm: 'c', great: 'g' },
  feedback: { level: 'Stufe', inBand: 'im Band', start: 'start' },
};

/** Attrappen-Regel: Ziel läuft auf einem Kreis, optional mit konstanter Störung */
function circleRule(dist?: { x: number; y: number }) {
  return (s: RuleSetup): TrackRule => ({
    target: (t) => ({ x: Math.cos(0.4 * rampTime(t, 1)) * 0.5 * s.hw, y: Math.sin(0.4 * rampTime(t, 1)) * 0.5 * s.hh }),
    disturbance: dist ? (t) => ({ x: dist.x * smoothstep(t / 1.5), y: dist.y * smoothstep(t / 1.5) }) : undefined,
  });
}

function defOf(axes: 'x' | 'y' | 'xy', makeRule: (s: RuleSetup) => TrackRule, extra: object = {}): ExerciseDefinition {
  return {
    id: 'kern-test',
    category: 'bewegung',
    minutes: 2,
    color: '#2E6DB4',
    icon: '',
    texts: { de: texts, it: texts },
    create: nachfuehren({ axes, makeRule, ...extra }),
  };
}

describe('nachfuehren-logic: Stufen, Band, Dauer', () => {
  it('Band wird mit der Stufe schmaler, bleibt im Bereich', () => {
    for (let l = MIN_LEVEL + 1; l <= MAX_LEVEL; l++) expect(defaultBandU(l)).toBeLessThan(defaultBandU(l - 1));
    expect(defaultBandU(MIN_LEVEL)).toBeCloseTo(5, 9);
    expect(defaultBandU(MAX_LEVEL)).toBeGreaterThan(3);
    expect(defaultBandU(-3)).toBe(defaultBandU(MIN_LEVEL));
    expect(defaultBandU(99)).toBe(defaultBandU(MAX_LEVEL));
  });

  it('feste Dauer je Durchgang: 11 s, Kurzmodus 4 s, Film 6,5 s', () => {
    expect(segmentSeconds({ demo: false, quick: false })).toBe(SEGMENT_S);
    expect(segmentSeconds({ demo: false, quick: true })).toBe(QUICK_SEGMENT_S);
    expect(segmentSeconds({ demo: true, quick: false })).toBe(DEMO_SEGMENT_S);
    expect(segmentSeconds({ demo: false, quick: false }, 9)).toBe(9);
  });

  it('Versatz ≈ 6 u, nie kleiner als Markenradius + 26 px; Punkte = Stufe × Anteil', () => {
    expect(fingerOffsetPx(7.68, 11)).toBeCloseTo(6 * 7.68, 6);
    expect(fingerOffsetPx(3, 11)).toBe(37);
    expect(pointsFor(3, 1)).toBe(30);
    expect(pointsFor(3, 0.5)).toBe(15);
    expect(pointsFor(3, 2)).toBe(30);
    expect(pointsFor(3, -1)).toBe(0);
  });
});

describe('nachfuehren-logic: Zeitverzerrung und Schwanken', () => {
  it('rampTime: 0 bis 0, stetig, Geschwindigkeit wächst bis 1 und bleibt dann 1', () => {
    expect(rampTime(-1, 1.5)).toBe(0);
    expect(rampTime(0, 1.5)).toBe(0);
    expect(rampTime(1.5, 1.5)).toBeCloseTo(0.75, 9);
    expect(rampTime(1.5 + 1e-9, 1.5)).toBeCloseTo(rampTime(1.5, 1.5), 6);
    expect(rampTime(3, 1.5)).toBeCloseTo(2.25, 9);
    const v = (s: number) => (rampTime(s + 1e-4, 1.5) - rampTime(s, 1.5)) / 1e-4;
    expect(v(0.01)).toBeLessThan(0.02);
    expect(v(0.75)).toBeCloseTo(0.5, 2);
    expect(v(2)).toBeCloseTo(1, 3);
    expect(rampTime(5, 0)).toBe(5);
  });

  it('smoothstep: 0…1, monoton', () => {
    expect(smoothstep(-1)).toBe(0);
    expect(smoothstep(2)).toBe(1);
    expect(smoothstep(0.5)).toBeCloseTo(0.5, 9);
    let prev = 0;
    for (let k = 0; k <= 1; k += 0.05) {
      expect(smoothstep(k)).toBeGreaterThanOrEqual(prev - 1e-12);
      prev = smoothstep(k);
    }
  });

  it('trapezoid: 0 → 1, monoton, stetig, Geschwindigkeit ohne Sprünge', () => {
    for (const a of [0.1, 0.2, 0.5]) {
      expect(trapezoid(0, a)).toBe(0);
      expect(trapezoid(1, a)).toBeCloseTo(1, 9);
      expect(trapezoid(0.5, a)).toBeCloseTo(0.5, 9);
      let prev = 0;
      let maxJump = 0;
      let pv = 0;
      for (let u = 0; u <= 1; u += 0.001) {
        const y = trapezoid(u, a);
        expect(y).toBeGreaterThanOrEqual(prev - 1e-12);
        const v = (y - prev) / 0.001;
        if (u > 0.002) maxJump = Math.max(maxJump, Math.abs(v - pv));
        pv = v;
        prev = y;
      }
      expect(maxJump).toBeLessThan(0.05 / a);
    }
    expect(trapezoid(-1)).toBe(0);
    expect(trapezoid(3)).toBe(1);
  });

  it('Wobble: in [−1, 1], deterministisch, Steigung beschränkt', () => {
    const a = new Wobble(createRng(3), 3, 2.5, 7);
    const b = new Wobble(createRng(3), 3, 2.5, 7);
    const c = new Wobble(createRng(4), 3, 2.5, 7);
    expect(a.at(4.2)).toBe(b.at(4.2));
    expect(a.at(4.2)).not.toBeCloseTo(c.at(4.2), 4);
    let peak = 0;
    let slope = 0;
    for (let s = 0; s < 60; s += 0.01) {
      peak = Math.max(peak, Math.abs(a.at(s)));
      slope = Math.max(slope, Math.abs(a.at(s + 0.01) - a.at(s)) / 0.01);
    }
    expect(peak).toBeLessThanOrEqual(1 + 1e-9);
    expect(peak).toBeGreaterThan(0.2);
    expect(slope).toBeLessThanOrEqual(a.maxSlope + 1e-6);
  });
});

describe('nachfuehren-logic: Marke, Achsen, Auswertung', () => {
  it('gesperrte Achsen liegen auf der Zielmarke, die Störung wirkt nur auf freie Achsen', () => {
    const tg = { x: 5, y: -3 };
    expect(lockAxes({ x: 9, y: 9 }, 'x', tg)).toEqual({ x: 9, y: -3 });
    expect(lockAxes({ x: 9, y: 9 }, 'y', tg)).toEqual({ x: 5, y: 9 });
    expect(lockAxes({ x: 9, y: 9 }, 'xy', tg)).toEqual({ x: 9, y: 9 });
    expect(freeDisturbance({ x: 2, y: 3 }, 'y')).toEqual({ x: 0, y: 3 });
    expect(freeDisturbance({ x: 2, y: 3 }, 'x')).toEqual({ x: 2, y: 0 });
    expect(freeDisturbance(undefined, 'xy')).toEqual({ x: 0, y: 0 });
    expect(markerFrom({ x: 1, y: 1 }, 'y', tg, { x: 4, y: -2 }, 50, 50)).toEqual({ x: 5, y: -1 });
  });

  it('Marke wird aufs Feld (plus Rand) begrenzt', () => {
    const m = markerFrom({ x: 500, y: -500 }, 'xy', { x: 0, y: 0 }, undefined, 30, 20);
    expect(m).toEqual({ x: 32, y: -22 });
  });

  it('Zeit im Band und mittlerer Abstand sind zeitgewichtet und relativ zum Bandradius', () => {
    const s = new TrackStats();
    s.add(3, 0, 4);
    s.add(1, 8, 4); // doppelt so weit wie das Band
    expect(s.time).toBeCloseTo(4, 9);
    expect(s.fraction).toBeCloseTo(0.75, 9);
    expect(s.meanRelative).toBeCloseTo((1 * 2) / 4, 9);
    expect(deviationPercent(s.meanRelative)).toBe(50);
    expect(s.passed).toBe(true);
    const f = new TrackStats();
    f.add(1, 0, 4);
    f.add(1, 20, 4);
    expect(f.fraction).toBeCloseTo(0.5, 9);
    expect(f.passed).toBe(false);
    f.add(0, 1, 4);
    f.add(-1, 1, 4);
    f.add(1, 1, 0);
    expect(f.time).toBe(2);
    const m = new TrackStats();
    m.merge(s);
    m.merge(f);
    expect(m.time).toBeCloseTo(6, 9);
    expect(PASS_FRACTION).toBeGreaterThan(0.5);
  });

  it('gleicher Abstand bei anderem Band: relative Abweichung unabhängig von der Stufe', () => {
    const a = new TrackStats();
    const b = new TrackStats();
    a.add(2, 2, 4);
    b.add(2, 1.5, 3);
    expect(a.meanRelative).toBeCloseTo(b.meanRelative, 9);
  });

  it('Trail: höchstens ein Punkt je 1/60 s (bildratenunabhängig), Länge begrenzt', () => {
    const t60 = new Trail(1000);
    const t120 = new Trail(1000);
    for (let i = 0; i < 600; i++) t60.add(1 / 60, { x: i, y: 0 });
    for (let i = 0; i < 1200; i++) t120.add(1 / 120, { x: i, y: 0 });
    expect(Math.abs(t60.length - t120.length)).toBeLessThanOrEqual(2);
    const t = new Trail(10);
    for (let i = 0; i < 50; i++) t.add(0.02, { x: i, y: 0 });
    expect(t.length).toBe(10);
    expect(t.at(9).x).toBe(49);
    t.clear();
    expect(t.length).toBe(0);
  });
});

describe('nachfuehren (Kern): Durchlauf', () => {
  it('Intro-Film: endet mit finish nach 8–14 s, versteckt die Engine-Hand, Bildunterschriften der Reihe nach', () => {
    const r = simulate({ def: defOf('xy', circleRule()), mode: 'demo', seed: 2, renderEvery: 3, maxSeconds: 40 });
    expect(r.result).not.toBeNull();
    expect(r.seconds).toBeGreaterThanOrEqual(8);
    expect(r.seconds).toBeLessThanOrEqual(14);
    expect(r.hiddenGhost).toBe(true);
    expect(r.captions).toEqual(['touch', 'follow', 'band', 'goal']);
  });

  for (const axes of ['x', 'y', 'xy'] as const) {
    it(`Autoplay (Spielmodus, Achsen ${axes}): Sitzung endet sauber mit gültigem Ergebnis`, () => {
      const r = simulate({ def: defOf(axes, circleRule()), quick: true, seed: 5, renderEvery: 2, maxSeconds: 120 });
      expect(r.result).not.toBeNull();
      const res = r.result!;
      expect(res.primary.key).toBe('level');
      expect(Number.isInteger(res.primary.value)).toBe(true);
      expect(res.primary.value).toBeGreaterThanOrEqual(MIN_LEVEL);
      expect(res.primary.value).toBeLessThanOrEqual(MAX_LEVEL);
      expect(res.secondary.map((m) => m.key)).toEqual(['inBand', 'deviation', 'passed']);
      expect(res.secondary[0].value).toBeGreaterThan(40);
      expect(res.secondary[0].value).toBeLessThanOrEqual(100);
      expect(res.secondary[2].value).toBeLessThanOrEqual(2);
      expect(res.level).toBeGreaterThanOrEqual(MIN_LEVEL);
      expect(res.tip).toBeDefined();
      // 2 Durchgänge à Einlauf + 4 s + Rückmeldung
      expect(r.seconds).toBeGreaterThan(2 * (QUICK_SEGMENT_S + LEAD_S));
      expect(r.seconds).toBeLessThan(40);
    });
  }

  it('volle Sitzung: 5 Durchgänge, Fortschritt und Stufenschild; Ergebnis deterministisch zum Startwert', () => {
    const a = simulate({ def: defOf('xy', circleRule()), seed: 11, maxSeconds: 400 });
    const b = simulate({ def: defOf('xy', circleRule()), seed: 11, maxSeconds: 400 });
    expect(a.result).toEqual(b.result);
    expect(a.labels.filter((l) => /· \d\/5$/.test(l)).length).toBe(5);
    expect(a.seconds).toBeGreaterThan(5 * (SEGMENT_S + LEAD_S));
    expect(a.seconds).toBeLessThan(5 * (SEGMENT_S + LEAD_S + 6) + 10);
  });

  it('bildratenunabhängig: 60 Hz und 120 Hz ergeben gleiche Dauer und ähnliche Wertung', () => {
    const f60 = simulate({ def: defOf('xy', circleRule()), quick: true, seed: 9, fps: 60, maxSeconds: 120 });
    const f120 = simulate({ def: defOf('xy', circleRule()), quick: true, seed: 9, fps: 120, maxSeconds: 120 });
    expect(Math.abs(f60.seconds - f120.seconds)).toBeLessThan(0.6);
    expect(Math.abs(f60.result!.secondary[0].value - f120.result!.secondary[0].value)).toBeLessThan(25);
  });

  it('Störung (Wind/Drift): Finger, der nicht ausgleicht, verfehlt; Autoplay gleicht aus', () => {
    const rule = circleRule({ x: 14, y: -12 });
    const auto = simulate({ def: defOf('xy', rule), quick: true, seed: 3, maxSeconds: 120 });
    expect(auto.result!.secondary[0].value).toBeGreaterThan(40);
    // Finger bleibt stur an der Startposition (gleicht nicht aus): Wertung des ersten Durchgangs niedrig
    let stubborn = -1;
    simulate({
      def: defOf('xy', rule),
      quick: true,
      autoplay: false,
      seed: 3,
      maxSeconds: 10,
      onFrame: (ex, t) => {
        const e = ex as unknown as Record<string, any>;
        if (!e.finger && e.phase === 'play') {
          e.pointerDown({ id: 1, x: e.cx + e.fm.x * e.pu, y: e.cy + e.fm.y * e.pu + e.off, t, type: 'touch' });
        }
        if (e.phase === 'fb' && stubborn < 0) stubborn = e.stats.fraction;
      },
    });
    expect(stubborn).toBeGreaterThanOrEqual(0);
    expect(stubborn).toBeLessThan(0.3);
  });

  it('Abheben = Pause: Bahnzeit steht still ohne Finger; Durchgang dauert genau Einlauf + Dauer an Fingerkontakt', () => {
    let downTime = 0;
    let s = -99;
    let done = false;
    let phaseLog: number[] = [];
    const r = simulate({
      def: defOf('xy', circleRule()),
      quick: true,
      autoplay: false,
      seed: 4,
      maxSeconds: 60,
      onFrame: (ex, t) => {
        const e = ex as unknown as Record<string, any>;
        // perfekt nachführen, aber zwischen 2 s und 5 s abheben
        const lift = t > 2000 && t < 5000;
        if (!lift && !e.finger && e.phase === 'play') {
          e.pointerDown({ id: 1, x: e.cx + e.fm.x * e.pu, y: e.cy + e.fm.y * e.pu + e.off, t, type: 'touch' });
        }
        if (lift && e.finger) e.pointerUp({ id: 1, x: 0, y: 0, t, type: 'touch' });
        if (e.finger && e.phase === 'play') {
          const tg = e.tgt;
          e.pointerMove({ id: 1, x: e.cx + tg.x * e.pu, y: e.cy + tg.y * e.pu + e.off, t, type: 'touch' });
        }
        if (e.phase === 'play') {
          if (lift) phaseLog.push(e.s);
          if (!lift && e.finger) downTime += 1 / 60;
          s = e.s;
        }
        if (e.phase === 'fb' && !done) {
          done = true;
          expect(e.stats.time).toBeCloseTo(QUICK_SEGMENT_S, 1);
          expect(e.stats.fraction).toBeGreaterThan(0.95);
        }
      },
    });
    void r;
    expect(done).toBe(true);
    expect(s).toBeGreaterThan(-99);
    // während des Abhebens bleibt die Bahnzeit konstant
    expect(Math.max(...phaseLog) - Math.min(...phaseLog)).toBeLessThan(1e-9);
    // Fingerkontakt bis Ende des ersten Durchgangs ≈ Einlauf + Dauer
    expect(downTime).toBeGreaterThan(LEAD_S + QUICK_SEGMENT_S - 0.5);
  });

  it('Mehrere Finger: nur der erste zählt', () => {
    simulate({
      def: defOf('xy', circleRule()),
      quick: true,
      autoplay: false,
      seed: 4,
      maxSeconds: 1,
      onFrame: (ex, t) => {
        const e = ex as unknown as Record<string, any>;
        if (t < 50) {
          e.pointerDown({ id: 1, x: 300, y: 400, t, type: 'touch' });
          e.pointerDown({ id: 2, x: 600, y: 300, t, type: 'touch' });
          e.pointerMove({ id: 2, x: 650, y: 350, t, type: 'touch' });
          expect(e.finger.id).toBe(1);
          expect(e.fingerPx).toEqual({ x: 300, y: 400 });
        }
      },
    });
  });

  it('Hochformat und Größenänderung stürzen nicht ab', () => {
    let resized = false;
    const r = simulate({
      def: defOf('xy', circleRule()),
      quick: true,
      w: 480,
      h: 860,
      seed: 6,
      renderEvery: 2,
      maxSeconds: 120,
      onFrame: (ex, t) => {
        if (!resized && t > 3000) {
          resized = true;
          ex.resize?.(480, 860);
        }
      },
    });
    expect(r.result).not.toBeNull();
  });

  it('Regel-Bau: rng, hw/hh (Rand abgezogen), Stufe und Dauer kommen an', () => {
    const seen: RuleSetup[] = [];
    simulate({
      def: defOf('xy', (s) => {
        seen.push(s);
        return circleRule()(s);
      }),
      quick: true,
      seed: 1,
      startLevel: 5,
      maxSeconds: 120,
    });
    expect(seen.length).toBeGreaterThanOrEqual(2);
    expect(seen[0].level).toBe(5);
    expect(seen[0].seconds).toBe(QUICK_SEGMENT_S);
    expect(seen[0].demo).toBe(false);
    expect(seen[0].hw).toBeGreaterThan(10);
    expect(seen[0].hh).toBeGreaterThan(10);
    expect(typeof seen[0].rng.next()).toBe('number');
    const film: RuleSetup[] = [];
    simulate({
      def: defOf('xy', (s) => {
        film.push(s);
        return circleRule()(s);
      }, { demoLevel: 2 }),
      mode: 'demo',
      maxSeconds: 40,
    });
    expect(film[0].demo).toBe(true);
    expect(film[0].level).toBe(2);
  });
});
