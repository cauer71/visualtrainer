/**
 * Peripheres Erkennen (Labor): reine Logik. Übertragen aus labor/test/periphery.test.js (Labor-Prototyp) und erweitert:
 * Winkelrechnung (Abstand = Sehabstand · tan Winkel), Begrenzung nach außen und innen, Anzeigedauer in ganzen Bildern,
 * adaptive Treppe in Bildern, Blinkregel, Einstellungen. Zeiten in ms, Zufall über createRng (keine festen Zufallswerte).
 */
import { describe, expect, it } from 'vitest';
import { buildCalib } from '../../src/core/calib';
import { defaultParams, sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import { MIN_CYCLE_MS } from '../../src/exercises/_shared/labor-bilder';
import {
  ANCHOR_CM,
  CENTER_STEP_MS,
  CLEAR_CM,
  EDGE_CM,
  FEEDBACK_MS,
  FIX_FLOOR_MS,
  LETTERS,
  offsetCm,
  offsetDeg,
  PARAMS,
  PeripherySession,
  peripheryParams,
  pointsFor,
  tipFor,
  type PeripherySummary,
} from '../../src/exercises/labor-peripheres-erkennen/logic';
import { de, it as itTexts } from '../../src/exercises/labor-peripheres-erkennen/texts';

const P = 1000 / 60;
const D = 60;

function make(over: Record<string, unknown> = {}, seed = 1, env: { w?: number; h?: number; d?: number; size?: number; plan?: Array<{ dir: 'left' | 'right' | 'up' | 'down'; letter?: string }> } = {}): PeripherySession {
  const p = peripheryParams(sanitizeParams(PARAMS, { ...defaultParams(PARAMS), ...over }));
  const s = new PeripherySession(p, { rng: createRng(seed), fieldWcm: env.w ?? 60, fieldHcm: env.h ?? 34, viewDistanceCm: env.d ?? D, sizeCm: env.size, plan: env.plan });
  s.setPeriod(P);
  return s;
}

/** Bild für Bild weiter, bis die Phase erreicht ist */
function until(s: PeripherySession, t0: number, phase: string): number {
  let t = t0;
  for (let i = 0; i < 100000 && s.phase !== phase; i++) {
    t += P;
    s.update(t);
  }
  expect(s.phase).toBe(phase);
  return t;
}

/** Spielt einen Durchgang bis nach der Rückmeldung; gibt die Zeit zurück */
function playTrial(s: PeripherySession, t0: number, correct: boolean, rt = 400): number {
  let t = until(s, t0, 'input');
  t += rt;
  const right = s.options.indexOf(s.letter);
  const res = s.answer(correct ? right : (right + 1) % s.options.length, t);
  expect(res).toMatchObject({ type: 'result' });
  t += FEEDBACK_MS + 1;
  s.update(t);
  return t;
}

describe('Winkelrechnung', () => {
  it('Abstand = Sehabstand · tan(Winkel) und zurück', () => {
    expect(offsetCm(10, 60)).toBeCloseTo(60 * Math.tan((10 * Math.PI) / 180), 9);
    for (const deg of [2, 5, 10, 20, 30, 40]) for (const d of [30, 40, 60, 100]) expect(offsetDeg(offsetCm(deg, d), d)).toBeCloseTo(deg, 9);
    expect(offsetCm(0, 40)).toBe(0);
  });

  it('weicht von der Objektgrößen-Formel der Kalibrierung bei kleinen Winkeln kaum ab, bei großen deutlich', () => {
    const c = buildCalib(40, 60, true);
    expect(Math.abs(offsetCm(10, 60) / c.degToCm(10) - 1)).toBeLessThan(0.01);
    expect(Math.abs(offsetCm(20, 60) / c.degToCm(20) - 1)).toBeLessThan(0.04);
    expect(Math.abs(offsetCm(40, 60) / c.degToCm(40) - 1)).toBeGreaterThan(0.1);
  });
});

describe('Peripheres Erkennen: Position und Begrenzung (aus dem Prototyp)', () => {
  it('Position entspricht dem eingestellten Sehwinkel', () => {
    const s = make({ eccentricityDeg: 10, directions: 'horizontal' }, 1);
    s.start(0);
    expect(Math.abs(s.pos.x - 30)).toBeCloseTo(offsetCm(10, D), 9);
    expect(s.pos.y).toBe(17);
    expect(s.ecc.clamped).toBe(false);
    expect(s.ecc.deg).toBeCloseTo(10, 9);
  });

  it('zu großer Winkel wird nach außen auf das Machbare begrenzt und gemeldet; vertikal gilt die Höhe', () => {
    const s = make({ eccentricityDeg: 40, sizeCm: 3 }, 1);
    s.start(0);
    expect(s.ecc.clamped).toBe(true);
    expect(s.ecc.cm).toBeCloseTo(30 - 1.5 - EDGE_CM, 9);
    expect(s.ecc.deg).toBeLessThan(40);
    const v = make({ eccentricityDeg: 40, directions: 'all4' }, 3);
    let sawVertical = false;
    for (let i = 0; i < 40; i++) {
      v.begin(0);
      if (v.dir === 'up' || v.dir === 'down') {
        sawVertical = true;
        expect(v.ecc.cm).toBeCloseTo(17 - 1.5 - EDGE_CM, 9);
      }
    }
    expect(sawVertical).toBe(true);
  });

  it('zu kleiner Winkel wird nach innen begrenzt: Buchstabe liegt nie über der Zahl in der Mitte', () => {
    const s = make({ eccentricityDeg: 2, sizeCm: 3 }, 1);
    s.start(0);
    const min = 1.5 + ANCHOR_CM / 2 + CLEAR_CM;
    expect(s.ecc.cm).toBeCloseTo(min, 9);
    expect(s.ecc.clamped).toBe(true);
    expect(s.ecc.deg).toBeCloseTo(offsetDeg(min, D), 9);
    // kleiner Buchstabe: derselbe Winkel ist möglich
    const t = make({ eccentricityDeg: 4, sizeCm: 1 }, 1);
    t.start(0);
    expect(t.ecc.clamped).toBe(false);
  });

  it('winzige Bühne: nie negativ, nie ein Fehler', () => {
    const s = make({ eccentricityDeg: 20, sizeCm: 12 }, 2, { w: 6, h: 4 });
    s.start(0);
    expect(s.ecc.cm).toBeGreaterThanOrEqual(0);
    expect(Number.isFinite(s.ecc.deg)).toBe(true);
    expect(s.ecc.clamped).toBe(true);
    s.setField(0, 0);
    s.begin(0);
    expect(s.ecc.cm).toBe(0);
  });

  it('Feld und Buchstabenhöhe lassen sich ändern (Tablet gedreht), gilt ab dem nächsten Durchgang', () => {
    const s = make({ eccentricityDeg: 30, sizeCm: 3, directions: 'horizontal' }, 1);
    s.start(0);
    const before = s.ecc.cm;
    s.setField(20, 30, 2);
    expect(s.ecc.cm).toBe(before);
    s.begin(0);
    expect(s.ecc.cm).toBeCloseTo(10 - 1 - EDGE_CM, 9);
  });

  it('Richtungen: horizontal nur links/rechts, alle vier mit oben/unten; Buchstaben im Vorrat', () => {
    const h = make({ directions: 'horizontal' }, 4);
    const seenH = new Set<string>();
    for (let i = 0; i < 60; i++) {
      h.begin(0);
      seenH.add(h.dir);
      expect(LETTERS).toContain(h.letter);
    }
    expect([...seenH].sort()).toEqual(['left', 'right']);
    const a = make({ directions: 'all4' }, 4);
    const seenA = new Set<string>();
    for (let i = 0; i < 100; i++) {
      a.begin(0);
      seenA.add(a.dir);
    }
    expect([...seenA].sort()).toEqual(['down', 'left', 'right', 'up']);
  });

  it('Antwortmöglichkeiten: enthalten den Buchstaben, verschieden, richtige Anzahl (2 bis 6)', () => {
    for (const n of [2, 3, 5, 6]) {
      const s = make({ choices: n }, 8);
      for (let i = 0; i < 30; i++) {
        s.begin(0);
        expect(s.options.length).toBe(n);
        expect(new Set(s.options).size).toBe(n);
        expect(s.options).toContain(s.letter);
      }
    }
  });

  it('fester Ablauf (Film): Richtung und Buchstabe wie vorgegeben', () => {
    const s = make({ trials: 8 }, 3, { plan: [{ dir: 'left', letter: 'K' }, { dir: 'right', letter: 'R' }] });
    s.start(0);
    expect([s.dir, s.letter]).toEqual(['left', 'K']);
    expect(s.pos.x).toBeLessThan(30);
    s.idx = 1;
    s.begin(0);
    expect([s.dir, s.letter]).toEqual(['right', 'R']);
    expect(s.pos.x).toBeGreaterThan(30);
  });
});

describe('Peripheres Erkennen: Ablauf', () => {
  it('Zahl in der Mitte → Blitz in ganzen Bildern → Antwort → Rückmeldung → Ende (nur eine Antwort je Durchgang)', () => {
    const s = make({ trials: 8, adaptive: 'no', durationMs: 100 }, 6);
    s.start(0);
    let t = 0;
    for (let i = 0; i < 8; i++) {
      t = until(s, t, 'input');
      expect(s.frames).toBe(6);
      expect(s.shownMs).toBeCloseTo(6 * P, 6);
      expect(s.answer(0, t + 10)).not.toBeNull();
      expect(s.answer(0, t + 20)).toBeNull();
      expect(s.answer(99, t + 20)).toBeNull();
      t += 10 + FEEDBACK_MS + 1;
      s.update(t);
    }
    expect(s.finished).toBe(true);
    expect(s.phase).toBe('done');
    expect(s.trials.length).toBe(8);
    expect(s.answer(0, t + 5)).toBeNull();
  });

  it('Antworten vor der Anzeige sind wirkungslos', () => {
    const s = make({}, 1);
    s.start(0);
    expect(s.answer(0, 100)).toBeNull();
    until(s, 0, 'flash');
    expect(s.answer(0, 5000)).toBeNull();
  });

  it('genau so viele Bilder wie geplant (60/120/144 Hz; 10 ms = ein Bild)', () => {
    for (const hz of [30, 60, 120, 144]) {
      const per = 1000 / hz;
      for (const d of [10, 50, 150, 400]) {
        const s = make({ durationMs: d }, 3);
        s.setPeriod(per);
        s.start(0);
        let t = 0;
        let frames = 0;
        for (let i = 0; i < 20000 && s.phase !== 'input'; i++) {
          t += per;
          s.update(t);
          if (s.phase === 'flash') frames++;
        }
        const want = Math.max(1, Math.round(d / per));
        expect(frames, `${hz} Hz ${d} ms`).toBe(want);
        expect(s.frames).toBe(want);
        expect(s.clean).toBe(true);
      }
    }
  });

  it('ein verspätetes Bild macht die Darbietung „gestört“', () => {
    const s = make({ durationMs: 100 }, 5);
    s.start(0);
    const t0 = until(s, 0, 'flash');
    s.update(t0 + 2 * P);
    s.update(t0 + 9 * P);
    expect(s.phase).toBe('input');
    expect(s.clean).toBe(false);
    expect(s.shownMs).toBeCloseTo(9 * P, 6);
  });

  it('Zahl in der Mitte wechselt im Takt, ist 2 bis 9 und nie zweimal dieselbe hintereinander', () => {
    const s = make({}, 2);
    s.start(0);
    const seen: string[] = [];
    let prev = s.centerDigit;
    for (let t = 0; t < 600 * 12; t += 20) {
      s.update(t);
      if (s.phase !== 'fix') break;
      if (s.centerDigit !== prev) {
        seen.push(s.centerDigit);
        prev = s.centerDigit;
      }
    }
    for (const d of seen) expect(d).toMatch(/^[2-9]$/);
    // es gibt immer mindestens einen Wechsel pro CENTER_STEP_MS, wenn die Wartezeit lang genug ist
    const long = make({}, 2);
    long.start(0);
    let changes = 0;
    let last = long.centerDigit;
    for (let t = 0; t < 600; t += 10) {
      long.update(t);
      if (long.centerDigit !== last) changes++;
      last = long.centerDigit;
    }
    expect(changes).toBe(0);
    long.update(CENTER_STEP_MS);
    expect(long.centerDigit).not.toBe('5');
  });
});

describe('Peripheres Erkennen: Kennzahlen', () => {
  it('Quote, Zufallsniveau, Antwortzeit, Seiten, Winkel', () => {
    const s = make({ trials: 8, choices: 4, adaptive: 'no', durationMs: 100 }, 6);
    s.start(0);
    let t = 0;
    for (let i = 0; i < 8; i++) t = playTrial(s, t, i < 6, 400);
    const sum = s.summary();
    expect(sum.correct).toBe(6);
    expect(sum.accuracy).toBe(75);
    expect(sum.chance).toBe(25);
    expect(sum.rtMean).toBe(400);
    expect(sum.durationMs).toBe(100);
    expect(sum.accVertical).toBeNull();
    expect(sum.accHorizontal).toBe(75);
    expect(sum.eccMeanDeg).toBeCloseTo(10, 1);
    expect(sum.limited).toBe(0);
    expect(sum.thresholdMs).toBeNull();
    expect(sum.shownMean).toBeCloseTo(6 * P, 0);
    expect(sum.jerks).toBe(0);
    expect(sum.refreshHz).toBe(60);
  });

  it('Zusammenfassung ohne Durchgang und mit einem Durchgang: kein NaN', () => {
    const s = make({}, 1);
    const e = s.summary();
    for (const [k, v] of Object.entries(e)) if (typeof v === 'number') expect(Number.isFinite(v), k).toBe(true);
    expect(e.accuracy).toBeNull();
    expect(e.eccMeanDeg).toBeNull();
    expect(e.rtMean).toBeNull();
    expect(e.shownMean).toBeNull();
    s.start(0);
    playTrial(s, 0, true);
    const one = s.summary();
    expect(one.shownSd).toBeNull();
    expect(one.accuracy).toBe(100);
  });

  it('Quote oben/unten nur bei vier Richtungen', () => {
    const s = make({ trials: 16, directions: 'all4', durationMs: 100 }, 9);
    s.start(0);
    let t = 0;
    for (let i = 0; i < 16; i++) t = playTrial(s, t, true);
    const sum = s.summary();
    expect(sum.accVertical).toBe(100);
    expect(sum.accHorizontal).toBe(100);
  });

  it('begrenzte Durchgänge werden gezählt und der tatsächliche Winkel gemittelt', () => {
    const s = make({ trials: 8, eccentricityDeg: 40, durationMs: 100 }, 4);
    s.start(0);
    let t = 0;
    for (let i = 0; i < 8; i++) t = playTrial(s, t, true);
    const sum = s.summary();
    expect(sum.limited).toBe(8);
    expect(sum.eccMeanDeg!).toBeLessThan(40);
    expect(sum.eccMeanDeg!).toBeCloseTo(offsetDeg(30 - 1.5 - EDGE_CM, D), 1);
  });

  it('Adaptiv: Bilder sinken nach zwei richtigen und steigen nach einem Fehler; Schwelle wird geschätzt', () => {
    const s = make({ trials: 24, adaptive: 'yes', durationMs: 200 }, 12);
    s.start(0);
    let t = 0;
    t = playTrial(s, t, true);
    expect(s.control.frames()).toBe(12);
    t = playTrial(s, t, true);
    expect(s.control.frames()).toBe(10);
    t = playTrial(s, t, false);
    expect(s.control.frames()).toBe(13);
    for (let i = 3; i < 24; i++) t = playTrial(s, t, i % 3 !== 2);
    const sum = s.summary();
    expect(sum.n).toBe(24);
    expect(sum.thresholdMs).not.toBeNull();
    expect(sum.thresholdMs!).toBeGreaterThan(0);
    expect(sum.thresholdFrames!).toBeGreaterThanOrEqual(1);
  });
});

describe('Peripheres Erkennen: Blinkregel', () => {
  it('zwischen zwei Blitzen liegen immer mindestens MIN_CYCLE_MS, auch bei sofortiger Antwort und kürzester Dauer', () => {
    for (const over of [{ durationMs: 10 }, { durationMs: 150 }, { durationMs: 200, adaptive: 'yes' }]) {
      const s = new PeripheryParamsSession(over);
      const starts: number[] = [];
      let t = 0;
      let seen: number | null = null;
      s.session.start(0);
      for (let i = 0; i < 40000 && !s.session.finished; i++) {
        t += P;
        s.session.update(t);
        if (s.session.lastShowAt !== null && s.session.lastShowAt !== seen) {
          seen = s.session.lastShowAt;
          starts.push(seen);
        }
        if (s.session.phase === 'input') s.session.answer(0, t);
      }
      expect(starts.length).toBe(8);
      for (let i = 1; i < starts.length; i++) expect(starts[i] - starts[i - 1], JSON.stringify(over)).toBeGreaterThanOrEqual(MIN_CYCLE_MS);
    }
  });

  it('Wartezeit nie unter FIX_FLOOR_MS (auch wenn weniger verlangt wird)', () => {
    const p = peripheryParams(defaultParams(PARAMS));
    const s = new PeripherySession(p, { rng: createRng(1), fieldWcm: 60, fieldHcm: 34, viewDistanceCm: D, fixMs: [10, 20] });
    for (let i = 0; i < 30; i++) {
      s.begin(0);
      expect(s.fixMs).toBeGreaterThanOrEqual(FIX_FLOOR_MS);
    }
    expect(FIX_FLOOR_MS + FEEDBACK_MS).toBeGreaterThanOrEqual(1000);
  });

  it('Standard-Wartezeit liegt zwischen 900 und 2200 ms (zufällig, nicht vorhersagbar)', () => {
    const s = make({}, 5);
    const xs = new Set<number>();
    for (let i = 0; i < 30; i++) {
      s.begin(0);
      expect(s.fixMs).toBeGreaterThanOrEqual(900);
      expect(s.fixMs).toBeLessThan(2200);
      xs.add(Math.round(s.fixMs));
    }
    expect(xs.size).toBeGreaterThan(20);
  });
});

/** Hilfsklasse: Session mit 10 Durchgängen für die Blinkregel (trials hat Mindestwert 8, Schritt 4) */
class PeripheryParamsSession {
  session: PeripherySession;
  constructor(over: Record<string, unknown>) {
    const p = peripheryParams(sanitizeParams(PARAMS, { ...defaultParams(PARAMS), trials: 8, choices: 2, ...over }));
    this.session = new PeripherySession(p, { rng: createRng(7), fieldWcm: 60, fieldHcm: 34, viewDistanceCm: D });
    this.session.setPeriod(P);
  }
}

describe('Peripheres Erkennen: Einstellungen', () => {
  it('Standardwerte und Grenzen entsprechen dem Prototyp (Dauer ab 10 statt 16 ms, damit 150 auf dem Raster liegt)', () => {
    expect(defaultParams(PARAMS)).toEqual({ trials: 32, eccentricityDeg: 10, directions: 'horizontal', durationMs: 150, adaptive: 'no', sizeCm: 3, choices: 4 });
    expect(PARAMS.find((x) => x.key === 'eccentricityDeg')).toMatchObject({ min: 2, max: 40, step: 1, unit: 'deg' });
    expect(PARAMS.find((x) => x.key === 'durationMs')).toMatchObject({ min: 10, max: 1500, step: 10, unit: 'ms' });
    expect(sanitizeParams(PARAMS, { durationMs: 1 }).durationMs).toBe(10);
    expect(sanitizeParams(PARAMS, { durationMs: 99999 }).durationMs).toBe(1500);
    expect(sanitizeParams(PARAMS, { eccentricityDeg: 99 }).eccentricityDeg).toBe(40);
  });

  it('jeder Standardwert liegt auf dem Raster min + k · Schritt', () => {
    for (const d of PARAMS) {
      if (d.type !== 'number') continue;
      const k = (d.default - d.min) / d.step;
      expect(Math.abs(k - Math.round(k)), d.key).toBeLessThan(1e-9);
      expect(sanitizeParams(PARAMS, {})[d.key], d.key).toBe(d.default);
    }
  });

  it('Bereinigung: kaputte Werte → Standard', () => {
    const p = sanitizeParams(PARAMS, { trials: 'x', directions: 'diagonal', choices: 99, adaptive: 7 });
    expect(p).toMatchObject({ trials: 32, directions: 'horizontal', choices: 6, adaptive: 'no' });
    expect(peripheryParams({})).toMatchObject({ trials: 32, eccentricityDeg: 10, directions: 'horizontal', durationMs: 150, adaptive: 'no', sizeCm: 3, choices: 4 });
  });
});

describe('Peripheres Erkennen: Tipps und Punkte', () => {
  const base = (over: Partial<PeripherySummary> = {}): PeripherySummary => ({
    n: 32,
    correct: 20,
    accuracy: 62.5,
    chance: 25,
    accHorizontal: 62,
    accVertical: null,
    eccMeanDeg: 10,
    limited: 0,
    rtMean: 900,
    thresholdMs: null,
    thresholdFrames: null,
    durationMs: 150,
    shownMean: 150,
    shownSd: 1,
    jerks: 0,
    refreshHz: 60,
    trials: [],
    ...over,
  });
  const fixed = peripheryParams({});
  const adaptive = peripheryParams({ adaptive: 'yes' });

  it('wählt den passenden Tipp (Schlüssel existieren in beiden Sprachen)', () => {
    const cases: Array<[string, string]> = [
      [tipFor(base({ n: 0 }), fixed), 'few'],
      [tipFor(base({ jerks: 9 }), fixed), 'jerks'],
      [tipFor(base({ limited: 20 }), fixed), 'limited'],
      [tipFor(base({ thresholdMs: 90 }), adaptive), 'threshold'],
      [tipFor(base(), adaptive), 'adaptiveShort'],
      [tipFor(base({ accuracy: 30, correct: 10 }), fixed), 'chance'],
      [tipFor(base({ accuracy: 70, accHorizontal: 95, accVertical: 50 }), { ...fixed, directions: 'all4' }), 'sides'],
      [tipFor(base({ accuracy: 95, correct: 30 }), fixed), 'harder'],
      [tipFor(base(), fixed), 'compare'],
    ];
    for (const [got, want] of cases) {
      expect(got).toBe(want);
      expect(de.tips[got], got).toBeTruthy();
      expect(itTexts.tips[got], got).toBeTruthy();
    }
  });

  it('Punkte: 10 je richtigem Durchgang, nie negativ', () => {
    expect(pointsFor(0)).toBe(0);
    expect(pointsFor(5)).toBe(50);
    expect(pointsFor(-1)).toBe(0);
  });
});
