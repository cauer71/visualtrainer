/**
 * Blitz-Erkennung (Labor): reine Logik. Übertragen aus labor/test/flash.test.js (Labor-Prototyp) und erweitert:
 * Anzeigedauer in ganzen Bildern, gestörte Darbietung, adaptive Treppe in Bildern, Blinkregel, Einstellungen.
 * Zeiten in ms (Bildzeit), Zufall über createRng (kein Math.random), keine festen Zufallswerte.
 */
import { describe, expect, it } from 'vitest';
import { defaultParams, sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import { MIN_CYCLE_MS } from '../../src/exercises/_shared/labor-bilder';
import {
  DIGITS,
  FEEDBACK_MS,
  FIX_MS,
  FlashSession,
  flashParams,
  LETTERS,
  MASK_MS,
  minCycleMs,
  PARAMS,
  pointsFor,
  round,
  tipFor,
  type FlashSummary,
} from '../../src/exercises/labor-blitz-erkennung/logic';
import { de, it as itTexts } from '../../src/exercises/labor-blitz-erkennung/texts';

const P = 1000 / 60;

function make(over: Record<string, unknown> = {}, seed = 1, period = P): FlashSession {
  const p = flashParams(sanitizeParams(PARAMS, { ...defaultParams(PARAMS), ...over }));
  const s = new FlashSession(p, { rng: createRng(seed) });
  s.setPeriod(period);
  return s;
}

/** Bild für Bild weiter, bis die Phase erreicht ist (Zeit in Bildern); gibt die Zeit zurück */
function until(s: FlashSession, t0: number, phase: string, period = P): number {
  let t = t0;
  for (let i = 0; i < 100000 && s.phase !== phase; i++) {
    t += period;
    s.update(t);
  }
  expect(s.phase).toBe(phase);
  return t;
}

/** Spielt einen Durchgang bis nach der Rückmeldung; gibt die Zeit zurück */
function playTrial(s: FlashSession, t0: number, correct: boolean, entryMs = 1000, period = P): number {
  let t = until(s, t0, 'input', period);
  t += entryMs;
  let res;
  s.target.forEach((sym) => {
    const sent = correct ? sym : s.pool.find((x) => x !== sym && !s.target.includes(x))!;
    res = s.press(sent, t);
  });
  expect(res).toMatchObject({ type: 'result' });
  expect(s.phase).toBe('feedback');
  t += FEEDBACK_MS + 1;
  s.update(t);
  return t;
}

describe('Blitz-Erkennung: Phasen und Zeiten (aus dem Prototyp, jetzt in Bildern)', () => {
  it('Kreuz → Anzeige → Maske → Eingabe', () => {
    const s = make({ durationMs: 200, mask: 'yes' });
    s.start(0);
    expect(s.phase).toBe('fix');
    s.update(FIX_MS - 1);
    expect(s.phase).toBe('fix');
    s.update(FIX_MS);
    expect(s.phase).toBe('show');
    expect(s.frames).toBe(12);
    // 12 Bilder: die Anzeige endet erst im Bild nach 11,5 Bilddauern
    s.update(FIX_MS + 11 * P);
    expect(s.phase).toBe('show');
    s.update(FIX_MS + 12 * P);
    expect(s.phase).toBe('mask');
    expect(s.shownMs).toBeCloseTo(12 * P, 6);
    s.update(FIX_MS + 12 * P + MASK_MS - 1);
    expect(s.phase).toBe('mask');
    s.update(FIX_MS + 12 * P + MASK_MS);
    expect(s.phase).toBe('input');
  });

  it('ohne Maske geht es direkt in die Eingabe', () => {
    const s = make({ durationMs: 100, mask: 'no' });
    s.start(0);
    s.update(FIX_MS);
    until(s, FIX_MS, 'input');
    expect(s.phase).toBe('input');
  });

  it('genau so viele Bilder wie geplant werden gezeigt (60, 120 und 144 Hz, kürzeste Dauer 10 ms = 1 Bild)', () => {
    for (const hz of [30, 60, 90, 120, 144]) {
      const per = 1000 / hz;
      for (const d of [10, 20, 50, 100, 150, 200, 500]) {
        const s = make({ durationMs: d }, 3, per);
        s.start(0);
        let t = 0;
        let shownFrames = 0;
        for (let i = 0; i < 5000 && s.phase !== 'input'; i++) {
          t += per;
          s.update(t);
          if (s.phase === 'show') shownFrames++; // „gezeichnet“ wird in jedem Bild, in dem die Phase `show` ist
        }
        const want = Math.max(1, Math.round(d / per));
        expect(s.frames, `${hz} Hz ${d} ms`).toBe(want);
        expect(shownFrames, `${hz} Hz ${d} ms`).toBe(want);
        expect(s.clean).toBe(true);
        expect(s.shownMs).toBeCloseTo(want * per, 4);
      }
    }
  });

  it('ein ausgelassenes Bild macht die Darbietung „gestört“ und die gemessene Dauer länger', () => {
    const s = make({ durationMs: 100 });
    s.start(0);
    s.update(FIX_MS);
    expect(s.frames).toBe(6);
    s.update(FIX_MS + 2 * P);
    s.update(FIX_MS + 8 * P); // Ruckler: 6 Bilder auf einmal vergangen
    expect(s.phase).not.toBe('show');
    expect(s.clean).toBe(false);
    expect(s.shownMs).toBeCloseTo(8 * P, 6);
  });

  it('Zielzeichen sind verschieden und aus dem Vorrat', () => {
    for (const kind of ['digits', 'letters'] as const) {
      const s = make({ symbols: kind, length: 6 }, 3);
      for (let i = 0; i < 30; i++) {
        s.begin(0);
        expect(s.target.length).toBe(6);
        expect(new Set(s.target).size).toBe(6);
        for (const c of s.target) expect(s.pool).toContain(c);
      }
    }
    expect(DIGITS.length).toBe(10);
    expect(LETTERS.length).toBe(18);
  });

  it('Vorrat wird beim Mischen nicht verändert', () => {
    const s = make({ symbols: 'letters', length: 4 }, 5);
    const before = [...s.pool];
    for (let i = 0; i < 10; i++) s.begin(0);
    expect([...s.pool]).toEqual(before);
    expect([...LETTERS].join('')).toBe('ABDEFGHKLMNPRSTUVZ');
  });
});

describe('Blitz-Erkennung: Eingabe', () => {
  it('nur in der Eingabephase; Löschen; automatische Auswertung; Eingabezeit', () => {
    const s = make({ durationMs: 100, mask: 'no', length: 2 });
    s.start(0);
    expect(s.press('1', 100)).toBeNull();
    const t0 = until(s, 0, 'input');
    const target = s.target.slice();
    expect(s.press(target[0], t0 + 100)).toEqual({ type: 'entry', entry: target[0] });
    s.back();
    expect(s.entry.length).toBe(0);
    s.press(target[0], t0 + 200);
    const res = s.press(target[1], t0 + 400);
    expect(res).toEqual({ type: 'result', correct: true, target: target.join('') });
    expect(s.trials[0].entryMs).toBe(400);
    expect(s.phase).toBe('feedback');
    expect(s.press('1', t0 + 500)).toBeNull();
    s.back(); // außerhalb der Eingabe wirkungslos
    expect(s.trials.length).toBe(1);
  });

  it('Zeichen außerhalb des Vorrats und überzählige Tasten werden ignoriert', () => {
    const s = make({ durationMs: 100, mask: 'no', length: 2, symbols: 'digits' });
    s.start(0);
    const t0 = until(s, 0, 'input');
    expect(s.press('Z', t0 + 10)).toBeNull();
    expect(s.entry.length).toBe(0);
    s.press(s.pool[0], t0 + 20);
    s.press(s.pool[1], t0 + 30);
    expect(s.press(s.pool[2], t0 + 40)).toBeNull();
  });

  it('teilweise richtige Eingabe zählt bei den Zeichen', () => {
    const s = make({ durationMs: 100, mask: 'no', length: 3 });
    s.start(0);
    const t0 = until(s, 0, 'input');
    const t = s.target;
    const other = s.pool.find((x) => !t.includes(x))!;
    s.press(t[0], t0 + 100);
    s.press(t[1], t0 + 200);
    const res = s.press(other, t0 + 300);
    expect(res).toMatchObject({ type: 'result', correct: false });
    expect(s.trials[0].symbolsOk).toBe(2);
    expect(s.trials[0].answer).toBe(t[0] + t[1] + other);
  });

  it('Löschen in leerer Eingabe ist harmlos', () => {
    const s = make({ durationMs: 100, mask: 'no' });
    s.start(0);
    until(s, 0, 'input');
    s.back();
    s.back();
    expect(s.entry).toEqual([]);
  });
});

describe('Blitz-Erkennung: Durchlauf und Kennzahlen', () => {
  it('Ende nach allen Durchgängen; Kennzahlen bei fester Dauer', () => {
    const s = make({ trials: 5, durationMs: 200, adaptive: 'no', length: 3 }, 5);
    s.start(0);
    let t = 0;
    for (const ok of [true, true, true, false, false]) t = playTrial(s, t, ok, 800);
    expect(s.finished).toBe(true);
    expect(s.phase).toBe('done');
    const sum = s.summary();
    expect(sum.n).toBe(5);
    expect(sum.correct).toBe(3);
    expect(sum.accuracy).toBe(60);
    expect(sum.durationMs).toBe(200);
    expect(sum.thresholdMs).toBeNull();
    expect(sum.entryMean).toBe(800);
    expect(sum.shownMean).toBeCloseTo(12 * P, 0);
    expect(sum.framesLast).toBe(12);
    expect(sum.jerks).toBe(0);
    expect(sum.refreshHz).toBe(60);
    expect(sum.symbolAccuracy).toBeGreaterThan(55); // 3 Durchgänge ganz, 2 ohne richtige Zeichen
    expect(sum.trials.length).toBe(5);
    for (const tr of sum.trials) expect(tr.clean).toBe(true);
  });

  it('Zusammenfassung ohne Durchgang enthält kein NaN', () => {
    const s = make({ trials: 5 });
    const sum = s.summary();
    expect(sum.n).toBe(0);
    for (const [k, v] of Object.entries(sum)) {
      if (typeof v === 'number') expect(Number.isFinite(v), k).toBe(true);
    }
    expect(sum.accuracy).toBeNull();
    expect(sum.symbolAccuracy).toBeNull();
    expect(sum.entryMean).toBeNull();
    expect(sum.shownMean).toBeNull();
    expect(sum.finalMs).toBeNull();
  });

  it('ein einziger Durchgang: Streuung fehlt statt NaN', () => {
    const s = make({ trials: 5 });
    s.start(0);
    playTrial(s, 0, true);
    const sum = s.summary();
    expect(sum.n).toBe(1);
    expect(sum.shownSd).toBeNull();
    expect(sum.accuracy).toBe(100);
  });

  it('gemessene Dauer ist die tatsächlich verstrichene Zeit (bei 120 Hz und bei Ruckeln)', () => {
    const s = make({ trials: 5, durationMs: 100 }, 2, 1000 / 120);
    s.start(0);
    playTrial(s, 0, true, 500, 1000 / 120);
    expect(s.trials[0].frames).toBe(12);
    expect(s.trials[0].shownMs).toBeCloseTo(100, 0);
    expect(s.summary().refreshHz).toBe(120);
  });

  it('Adaptiv: Bilder sinken nach zwei richtigen und steigen nach einem Fehler', () => {
    const s = make({ trials: 10, durationMs: 200, adaptive: 'yes', mask: 'yes' }, 2);
    s.start(0);
    let t = 0;
    t = playTrial(s, t, true);
    expect(s.control.frames()).toBe(12);
    t = playTrial(s, t, true);
    expect(s.control.frames()).toBe(10);
    t = until(s, t, 'show');
    expect(s.frames).toBe(10); // der nächste Durchgang nutzt bereits die neue Dauer
    t = playTrial(s, t, false);
    expect(s.control.frames()).toBe(13);
    for (let i = 0; i < 4; i++) t = playTrial(s, t, i % 3 !== 0);
    const sum = s.summary();
    expect(sum.thresholdFrames === null || sum.thresholdFrames > 0).toBe(true);
    if (sum.thresholdMs !== null) expect(sum.thresholdMs).toBeGreaterThan(0);
  });

  it('Adaptiv: gestörte Durchgänge verändern die Treppe nicht und werden gezählt', () => {
    const s = make({ trials: 10, durationMs: 100, adaptive: 'yes' }, 4);
    s.start(0);
    let t = 0;
    for (let i = 0; i < 3; i++) {
      // Anzeige mit Ruckler: ein Bild fehlt
      t += FIX_MS + 1;
      s.update(t);
      expect(s.phase).toBe('show');
      t += (s.frames + 1) * P;
      s.update(t);
      expect(s.clean).toBe(false);
      t = until(s, t, 'input');
      t += 500;
      s.target.forEach((sym) => s.press(sym, t));
      t += FEEDBACK_MS + 1;
      s.update(t);
    }
    expect(s.control.frames()).toBe(6); // 3 richtige, aber gestörte Durchgänge: Dauer unverändert
    expect(s.summary().jerks).toBe(3);
  });

  it('Adaptiv: die Schwelle wird in ms aus gemessener Bilddauer angegeben und liegt zwischen den gezeigten Dauern', () => {
    const rng = createRng(11);
    const s = make({ trials: 40, durationMs: 300, adaptive: 'yes', mask: 'yes', length: 3 }, 9);
    s.start(0);
    let t = 0;
    for (let i = 0; i < 40; i++) {
      t = until(s, t, 'input');
      // simulierte Person: erkennt bei ≥ 5 Bildern fast sicher, darunter selten
      const ok = s.frames >= 5 ? rng.chance(0.95) : rng.chance(0.2);
      t += 700;
      s.target.forEach((sym) => s.press(ok ? sym : s.pool.find((x) => x !== sym && !s.target.includes(x))!, t));
      t += FEEDBACK_MS + 1;
      s.update(t);
    }
    const sum = s.summary();
    expect(sum.n).toBe(40);
    expect(sum.thresholdMs).not.toBeNull();
    expect(sum.thresholdMs!).toBeGreaterThan(30);
    expect(sum.thresholdMs!).toBeLessThan(200);
    expect(sum.thresholdFrames!).toBeGreaterThanOrEqual(1);
    const frames = sum.trials.map((x) => x.frames);
    expect(Math.min(...frames)).toBeGreaterThanOrEqual(1);
  });
});

describe('Blitz-Erkennung: Blinkregel', () => {
  it('zwischen zwei Anzeigen liegen immer mindestens MIN_CYCLE_MS, auch bei sofortiger Antwort und kürzester Dauer', () => {
    for (const over of [{ mask: 'no', durationMs: 10 }, { mask: 'yes', durationMs: 10 }, { mask: 'yes', durationMs: 200, adaptive: 'yes' }]) {
      const s = make({ trials: 10, length: 1, ...over }, 7);
      s.start(0);
      const starts: number[] = [];
      let t = 0;
      let lastSeen: number | null = null;
      for (let i = 0; i < 20000 && !s.finished; i++) {
        t += P;
        s.update(t);
        if (s.lastShowAt !== null && s.lastShowAt !== lastSeen) {
          lastSeen = s.lastShowAt;
          starts.push(s.lastShowAt);
        }
        if (s.phase === 'input') s.press(s.target[0], t); // sofort antworten (Länge 1)
      }
      expect(starts.length).toBe(10);
      for (let i = 1; i < starts.length; i++) expect(starts[i] - starts[i - 1], JSON.stringify(over)).toBeGreaterThanOrEqual(MIN_CYCLE_MS);
    }
    expect(minCycleMs(false, P)).toBeGreaterThanOrEqual(MIN_CYCLE_MS);
    expect(minCycleMs(true, P)).toBeGreaterThanOrEqual(MIN_CYCLE_MS);
  });

  it('Kreuzdauer wird nie unter FIX_MS gesetzt', () => {
    const p = flashParams(defaultParams(PARAMS));
    const s = new FlashSession(p, { rng: createRng(1), fixMs: 10 });
    s.setPeriod(P);
    s.start(0);
    s.update(FIX_MS - 1);
    expect(s.phase).toBe('fix');
  });
});

describe('Blitz-Erkennung: Einstellungen', () => {
  it('Standardwerte und Grenzen entsprechen dem Prototyp (Dauer ab 10 statt 16 ms, damit 200 auf dem Raster liegt)', () => {
    const d = defaultParams(PARAMS);
    expect(d).toEqual({ trials: 20, symbols: 'digits', length: 3, durationMs: 200, adaptive: 'no', mask: 'yes', sizeCm: 3 });
    const clean = sanitizeParams(PARAMS, d);
    expect(clean).toEqual(d);
    const dur = PARAMS.find((x) => x.key === 'durationMs')!;
    expect(dur).toMatchObject({ min: 10, max: 2000, step: 10, unit: 'ms' });
    expect(sanitizeParams(PARAMS, { durationMs: 3 }).durationMs).toBe(10);
    expect(sanitizeParams(PARAMS, { durationMs: 99999 }).durationMs).toBe(2000);
    expect(sanitizeParams(PARAMS, { durationMs: 155 }).durationMs).toBe(160);
  });

  it('jeder Standardwert liegt auf dem Raster min + k · Schritt (sonst würde die Bereinigung ihn verschieben)', () => {
    for (const d of PARAMS) {
      if (d.type !== 'number') continue;
      const k = (d.default - d.min) / d.step;
      expect(Math.abs(k - Math.round(k)), d.key).toBeLessThan(1e-9);
      expect(sanitizeParams(PARAMS, {})[d.key], d.key).toBe(d.default);
    }
  });

  it('Bereinigung: kaputte Werte → Standard, Auswahl nur erlaubte Werte', () => {
    const p = sanitizeParams(PARAMS, { trials: 'x', symbols: 'greek', length: 99, mask: 5, adaptive: 'maybe', sizeCm: -4 });
    expect(p).toMatchObject({ trials: 20, symbols: 'digits', length: 6, mask: 'yes', adaptive: 'no', sizeCm: 1 });
    expect(flashParams({})).toMatchObject({ trials: 20, symbols: 'digits', length: 3, durationMs: 200, adaptive: 'no', mask: 'yes', sizeCm: 3 });
  });

  it('Marke und Auswahlwerte sind in den Texten benannt', () => {
    for (const t of [de, itTexts]) {
      for (const d of PARAMS) {
        expect(t.params?.[d.key]?.label, d.key).toBeTruthy();
        if (d.type === 'select') for (const o of d.options) expect(t.params?.[d.key]?.options?.[o], `${d.key}.${o}`).toBeTruthy();
      }
    }
  });
});

describe('Blitz-Erkennung: Tipps, Punkte, Hilfen', () => {
  const base = (over: Partial<FlashSummary> = {}): FlashSummary => ({
    n: 20,
    correct: 12,
    accuracy: 60,
    symbolAccuracy: 80,
    entryMean: 1200,
    thresholdMs: null,
    thresholdFrames: null,
    finalMs: 200,
    durationMs: 200,
    shownMean: 200,
    shownSd: 1,
    framesLast: 12,
    jerks: 0,
    refreshHz: 60,
    trials: [],
    ...over,
  });
  const fixed = flashParams({});
  const adaptive = flashParams({ adaptive: 'yes' });

  it('wählt den passenden Tipp (Schlüssel existieren in beiden Sprachen)', () => {
    const cases: Array<[string, string]> = [
      [tipFor(base({ n: 0, correct: 0 }), fixed), 'few'],
      [tipFor(base({ correct: 0, accuracy: 0 }), fixed), 'few'],
      [tipFor(base({ jerks: 5 }), fixed), 'jerks'],
      [tipFor(base({ thresholdMs: 90 }), adaptive), 'threshold'],
      [tipFor(base(), adaptive), 'adaptiveShort'],
      [tipFor(base({ accuracy: 30, correct: 6, symbolAccuracy: 70 }), fixed), 'partial'],
      [tipFor(base({ accuracy: 45, correct: 9, symbolAccuracy: 50 }), fixed), 'easier'],
      [tipFor(base({ accuracy: 95, correct: 19 }), fixed), 'harder'],
      [tipFor(base({ accuracy: 75, correct: 15 }), fixed), 'compare'],
    ];
    for (const [got, want] of cases) {
      expect(got).toBe(want);
      expect(de.tips[got], got).toBeTruthy();
      expect(itTexts.tips[got], got).toBeTruthy();
    }
  });

  it('Punkte: 10 je ganz richtigem Durchgang, nie negativ', () => {
    expect(pointsFor(0)).toBe(0);
    expect(pointsFor(7)).toBe(70);
    expect(pointsFor(-3)).toBe(0);
  });

  it('round: nicht endliche Werte → null', () => {
    expect(round(NaN)).toBeNull();
    expect(round(undefined)).toBeNull();
    expect(round(Infinity)).toBeNull();
    expect(round(1.234, 1)).toBe(1.2);
  });
});
