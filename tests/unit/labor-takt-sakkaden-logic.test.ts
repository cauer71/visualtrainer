/**
 * Takt-Sakkaden (Labor): reine Logik. Übertragen aus labor/test/saccade.test.js (Labor-Prototyp) und erweitert:
 * Zeiten in ms, Koordinaten in cm, Zufall über createRng (kein Math.random), keine festen Zufallswerte.
 */
import { describe, expect, it } from 'vitest';
import { buildCalib } from '../../src/core/calib';
import { defaultParams, sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import {
  type BeatEvent,
  beatIntervalMs,
  beatParams,
  BeatSession,
  type BeatSummary,
  changesPerSecond,
  DOUBLE_TAP_MS,
  fitSizeCm,
  MAX_BPM,
  MAX_CHANGES_PER_S,
  MIN_SPACING,
  PARAMS,
  pointsFor,
  randomSymbol,
  round,
  SLACK_CM,
  tipFor,
  totalBeatsFor,
  type Pattern,
} from '../../src/exercises/labor-takt-sakkaden/logic';

const calib = buildCalib(40, 60, true);

function make(over: Record<string, unknown> = {}, seed = 1, extra: { w?: number; h?: number; minHit?: number } = {}): BeatSession {
  const p = beatParams(sanitizeParams(PARAMS, { ...defaultParams(PARAMS), ...over }));
  return new BeatSession(p, { rng: createRng(seed), fieldWcm: extra.w ?? 60, fieldHcm: extra.h ?? 34, minHitRadiusCm: extra.minHit, cmToDeg: calib.cmToDeg });
}

function runAll(s: BeatSession): BeatEvent[] {
  const events: BeatEvent[] = [];
  s.start(0);
  for (let t = 0; t <= 400000 && !s.finished; t += 10) events.push(...s.update(t));
  return events;
}

const get = (sum: BeatSummary, k: keyof BeatSummary) => sum[k];

describe('Takt-Sakkaden: Ablauf (aus dem Prototyp)', () => {
  it('Taktlänge und Zahl der Schläge', () => {
    expect(beatIntervalMs(60)).toBe(1000);
    expect(beatIntervalMs(120)).toBe(500);
    const s = make({ bpm: 60, durationS: 20 });
    expect(s.totalBeats).toBe(20);
    const ev = runAll(s);
    expect(ev.length).toBe(20);
    expect(s.finished).toBe(true);
  });

  it('Schläge liegen exakt im Takt; erster Schlag nach einer Taktlänge', () => {
    const s = make({ bpm: 90, durationS: 10 });
    const ev = runAll(s);
    const iv = 60000 / 90;
    ev.forEach((e, i) => expect(Math.abs(e.at - (i + 1) * iv)).toBeLessThan(1e-6));
  });

  it('verspäteter Aufruf holt verpasste Schläge nach', () => {
    const s = make({ bpm: 60, durationS: 10 });
    s.start(0);
    const ev = s.update(3500);
    expect(ev.length).toBe(3);
    expect(ev.map((e) => e.index)).toEqual([0, 1, 2]);
  });

  it('Reihenfolge „der Reihe nach“ umkreist die vier Ecken', () => {
    const s = make({ pattern: 'corners4', order: 'cycle', durationS: 10, bpm: 60 });
    const ev = runAll(s);
    const m = 3 / 2 + 0.5;
    expect(ev.length).toBe(10);
    const xy = (e: BeatEvent) => [Math.round(e.x), Math.round(e.y)].join(',');
    expect(ev.slice(0, 5).map(xy)).toEqual(
      [
        [m, m],
        [60 - m, m],
        [60 - m, 34 - m],
        [m, 34 - m],
        [m, m],
      ].map((a) => a.map(Math.round).join(',')),
    );
  });

  it('zufällige Reihenfolge: nie zweimal derselbe Punkt oder dasselbe Zeichen hintereinander', () => {
    for (const kind of ['digits', 'letters', 'syllables'] as const) {
      const s = make({ pattern: 'grid9', order: 'random', symbols: kind, durationS: 120, bpm: 60 }, 17);
      const ev = runAll(s);
      expect(ev.length).toBe(120);
      for (let i = 1; i < ev.length; i++) {
        expect(ev[i].point, `Punkt wiederholt bei ${i}`).not.toBe(ev[i - 1].point);
        expect(ev[i].symbol).not.toBe(ev[i - 1].symbol);
      }
      if (kind === 'digits') expect(ev.every((e) => /^[1-9]$/.test(e.symbol))).toBe(true);
      if (kind === 'letters') expect(ev.every((e) => /^[A-Z]$/.test(e.symbol))).toBe(true);
      if (kind === 'syllables') expect(ev.every((e) => /^[BDFGKLMNPRSTVZ][AEIOU]$/.test(e.symbol))).toBe(true);
    }
  });

  it('Muster mit zwei Punkten wechseln auch zufällig immer hin und her', () => {
    const s = make({ pattern: 'horizontal', order: 'random', durationS: 30, bpm: 60 }, 4);
    const ev = runAll(s);
    for (let i = 1; i < ev.length; i++) expect(ev[i].x).not.toBe(ev[i - 1].x);
  });

  it('alle Punkte liegen im Feld, auch bei großen Zeichen (Prototyp: Zeichen 10 cm)', () => {
    for (const pat of ['corners4', 'corners5', 'horizontal', 'vertical', 'grid9'] as const) {
      const s = make({ pattern: pat, sizeCm: 10 });
      const m = s.size / 2 + 0.5;
      for (const pt of s.points) {
        expect(pt.x, pat).toBeGreaterThanOrEqual(m - 1e-9);
        expect(pt.x, pat).toBeLessThanOrEqual(60 - m + 1e-9);
        expect(pt.y, pat).toBeGreaterThanOrEqual(m - 1e-9);
        expect(pt.y, pat).toBeLessThanOrEqual(34 - m + 1e-9);
      }
      // wie im Prototyp bleibt 10 cm, wo die Zeichen genug Platz haben; im 3 × 3-Raster werden sie etwas kleiner
      if (pat !== 'grid9') expect(s.size, pat).toBe(10);
      else expect(s.size).toBeCloseTo(8.25, 9);
    }
  });

  it('Berührungsmodus: Treffer, Verzögerung, verpasst, Fehltipp', () => {
    const s = make({ touch: 'yes', bpm: 60, durationS: 10 });
    s.start(0);
    const e0 = s.update(1000)[0];
    const hit = s.tap(e0.x, e0.y, 1350);
    expect(hit).toMatchObject({ type: 'hit', latency: 350 });
    expect(s.tap(e0.x, e0.y, 1400)?.type, 'zweiter Tipp unmittelbar danach: Doppeltipp ignoriert').toBe('ignored');
    expect(s.tap(e0.x, e0.y, 1800)?.type, 'zweite Berührung desselben Schlags später').toBe('stray');
    s.update(2000); // zweiter Schlag, nicht berührt
    s.update(3000);
    const e2 = s.current!;
    expect(s.tap(e2.x + 30, e2.y, 3100)?.type).toBe('stray');
    for (let t = 4000; t <= 12000; t += 1000) s.update(t);
    expect(s.finished).toBe(true);
    const sum = s.summary();
    expect(sum.hits).toBe(1);
    expect(sum.misses).toBe(9);
    expect(sum.stray).toBe(2);
    expect(sum.accuracy).toBe(10);
    expect(sum.latMean).toBe(350);
    expect(sum.touch).toBe(true);
  });

  it('ohne Berührungsmodus werden Tipps ignoriert, es gibt keine Treffer-Kennzahlen', () => {
    const s = make({ touch: 'no' });
    s.start(0);
    s.update(1000);
    expect(s.tap(1, 1, 1100)).toBeNull();
    const sum = s.summary();
    expect(sum.touch).toBe(false);
    expect(sum.accuracy).toBeNull();
    expect(sum.latMean).toBeNull();
    expect(sum.latSd).toBeNull();
    expect(sum.hits + sum.misses + sum.stray).toBe(0);
  });

  it('Strecke der Blicksprünge in cm und Grad', () => {
    const s = make({ pattern: 'horizontal', sizeCm: 3 });
    const margin = 2;
    const expectCm = 60 - 2 * margin;
    expect(Math.abs(s.maxAmplitudeCm() - expectCm)).toBeLessThan(1e-9);
    const sum = s.summary();
    expect(sum.ampCm).toBe(round(expectCm, 1));
    expect(Math.abs(sum.ampDeg! - (2 * Math.atan(expectCm / 120) * 180) / Math.PI)).toBeLessThan(0.06);
  });
});

describe('Takt-Sakkaden: Erweiterungen und Grenzfälle', () => {
  it('Zahl der Schläge: Dauer × Takt ÷ 60, abgerundet; nach dem letzten Schlag noch eine volle Taktlänge sichtbar', () => {
    expect(totalBeatsFor(10, 20)).toBe(3);
    expect(totalBeatsFor(60, 140)).toBe(140);
    expect(totalBeatsFor(10, 22)).toBe(3);
    const s = make({ bpm: 60, durationS: 10 });
    s.start(0);
    s.update(10000); // 10. Schlag liegt genau bei 10 s
    expect(s.finished).toBe(false);
    expect(s.current?.index).toBe(9);
    s.update(10999);
    expect(s.finished).toBe(false);
    s.update(11000);
    expect(s.finished).toBe(true);
    expect(s.summary().beats).toBe(10);
  });

  it('Sicherheit: höchstens 140 Schläge pro Minute = unter 2,5 Zeichenwechsel pro Sekunde', () => {
    const bpm = PARAMS.find((d) => d.key === 'bpm') as { max: number; min: number };
    expect(bpm.max).toBe(MAX_BPM);
    expect(changesPerSecond(bpm.max)).toBeLessThanOrEqual(MAX_CHANGES_PER_S);
    expect(changesPerSecond(60)).toBe(1);
    expect(beatParams(sanitizeParams(PARAMS, { bpm: 9999 })).bpm).toBe(140);
    expect(beatParams(sanitizeParams(PARAMS, { bpm: 1 })).bpm).toBe(20);
    expect(beatIntervalMs(140)).toBeGreaterThan(400);
  });

  it('Zeichengröße wird auf kleinen Feldern so begrenzt, dass sich die Zeichen nicht überlappen', () => {
    const phone = { w: 10.3, h: 22 };
    for (const pat of ['corners4', 'corners5', 'horizontal', 'vertical', 'grid9'] as Pattern[]) {
      for (const want of [1, 3, 6, 12]) {
        const size = fitSizeCm(pat, phone.w, phone.h, want);
        expect(size).toBeLessThanOrEqual(want);
        expect(size).toBeGreaterThanOrEqual(0.3);
        const s = make({ pattern: pat, sizeCm: want }, 1, { w: phone.w, h: phone.h });
        expect(s.size).toBeCloseTo(size, 9);
        for (let i = 0; i < s.points.length; i++) {
          expect(s.points[i].x).toBeGreaterThanOrEqual(s.size / 2 - 1e-9);
          expect(s.points[i].x).toBeLessThanOrEqual(phone.w - s.size / 2 + 1e-9);
          expect(s.points[i].y).toBeGreaterThanOrEqual(s.size / 2 - 1e-9);
          expect(s.points[i].y).toBeLessThanOrEqual(phone.h - s.size / 2 + 1e-9);
          for (let j = i + 1; j < s.points.length; j++) {
            if (s.size > 0.3 + 1e-9) {
              const d = Math.hypot(s.points[i].x - s.points[j].x, s.points[i].y - s.points[j].y);
              expect(d, `${pat} ${want}`).toBeGreaterThanOrEqual(MIN_SPACING * s.size - 1e-6);
            }
          }
        }
      }
    }
    // große Felder: gewünschte Größe bleibt
    expect(fitSizeCm('grid9', 60, 34, 3)).toBe(3);
    expect(fitSizeCm('corners4', 60, 34, 12)).toBe(12);
  });

  it('setField (Tablet gedreht): Punkte und Größe neu, das gezeigte Zeichen bleibt am selben Punkt des Musters', () => {
    const s = make({ pattern: 'corners4', order: 'cycle', bpm: 60 }, 3, { w: 60, h: 34 });
    s.start(0);
    s.update(2000); // zweiter Schlag: Punkt 1 (rechts oben)
    const idx = s.current!.point;
    expect(idx).toBe(1);
    s.setField(34, 60);
    expect(s.points[idx].x).toBeCloseTo(34 - 2, 9);
    expect(s.points[idx].y).toBeCloseTo(2, 9);
    expect(s.current!.x).toBeCloseTo(s.points[idx].x, 9);
    expect(s.current!.y).toBeCloseTo(s.points[idx].y, 9);
    s.setField(10.3, 22, 12);
    expect(s.size).toBeLessThan(12);
    expect(s.current!.x).toBeCloseTo(s.points[idx].x, 9);
    // ohne laufenden Takt kein Fehler
    const t = make();
    expect(() => t.setField(20, 20)).not.toThrow();
  });

  it('Trefferradius: Zeichenradius + Toleranz, mindestens 24 px (Touch-Ziel)', () => {
    expect(make({ sizeCm: 3 }).hitRadius).toBe(1.5 + SLACK_CM);
    // 1-cm-Zeichen bei 38 px/cm: 1,0 cm = 38 px reichen; bei grober Auflösung (20 px/cm) gelten 24 px = 1,2 cm
    expect(make({ sizeCm: 1 }, 1, { minHit: 24 / 38 }).hitRadius).toBe(1);
    expect(make({ sizeCm: 1 }, 1, { minHit: 24 / 20 }).hitRadius).toBeCloseTo(1.2, 9);
    expect(make({ sizeCm: 1 }, 1, { minHit: 2 }).hitRadius).toBe(2);
    // ein Tipp 1,1 cm neben einem 1-cm-Zeichen trifft nur mit Mindestradius
    const a = make({ sizeCm: 1, touch: 'yes' }, 1, { minHit: 24 / 20 });
    a.start(0);
    const e = a.update(1000)[0];
    expect(a.tap(e.x + 1.1, e.y, 1100)?.type).toBe('hit');
    const b = make({ sizeCm: 1, touch: 'yes' });
    b.start(0);
    const f = b.update(1000)[0];
    expect(b.tap(f.x + 1.1, f.y, 1100)?.type).toBe('stray');
  });

  it('Doppeltipp: ein zweiter Tipp innerhalb von 250 ms auf dem getroffenen Zeichen zählt weder als Treffer noch als Fehltipp', () => {
    const s = make({ touch: 'yes', bpm: 60, durationS: 10 });
    s.start(0);
    const e = s.update(1000)[0];
    expect(s.tap(e.x, e.y, 1300)?.type).toBe('hit');
    expect(s.tap(e.x, e.y, 1300 + DOUBLE_TAP_MS - 1)?.type).toBe('ignored');
    expect(s.strayTaps).toBe(0);
    expect(s.tap(e.x, e.y, 1300 + DOUBLE_TAP_MS)?.type).toBe('stray');
    expect(s.strayTaps).toBe(1);
    // nächstes Zeichen: neuer Treffer möglich, auch wenn nur wenig Zeit vergangen ist
    const e2 = s.update(2000)[0];
    expect(s.tap(e2.x, e2.y, 2100)?.type).toBe('hit');
  });

  it('Verzögerung ist nie negativ (Ereigniszeit knapp vor der Schlagzeit)', () => {
    const s = make({ touch: 'yes', bpm: 60, durationS: 10 });
    s.start(0);
    const e = s.update(1010)[0];
    const r = s.tap(e.x, e.y, 995);
    expect(r?.type).toBe('hit');
    if (r?.type === 'hit') expect(r.latency).toBe(0);
    for (let t = 2000; t <= 12000; t += 1000) s.update(t);
    expect(s.summary().trials[0].latencyMs).toBe(0);
  });

  it('Tipp nach dem Ende oder ohne gezeigtes Zeichen: null', () => {
    const s = make({ touch: 'yes', durationS: 10 });
    expect(s.tap(1, 1, 0)).toBeNull(); // nicht gestartet
    s.start(0);
    expect(s.tap(1, 1, 500)).toBeNull(); // noch kein Zeichen (Vorlauf)
    for (let t = 1000; t <= 12000; t += 1000) s.update(t);
    expect(s.finished).toBe(true);
    expect(s.tap(1, 1, 12500)).toBeNull();
  });

  it('Kennzahlen ohne Schläge sind null statt NaN', () => {
    const s = make({ touch: 'yes' });
    const sum = s.summary();
    expect(sum.beats).toBe(0);
    expect(sum.accuracy).toBeNull();
    expect(sum.latMean).toBeNull();
    expect(sum.latSd).toBeNull();
    for (const k of ['beats', 'hits', 'misses', 'stray', 'ampCm', 'bpm', 'positions'] as const) expect(Number.isFinite(get(sum, k) as number)).toBe(true);
  });

  it('Streuung der Verzögerung erst ab zwei Treffern', () => {
    const s = make({ touch: 'yes', bpm: 60, durationS: 10 });
    s.start(0);
    const e0 = s.update(1000)[0];
    s.tap(e0.x, e0.y, 1300);
    s.update(2000);
    for (let t = 3000; t <= 12000; t += 1000) s.update(t);
    expect(s.summary().latSd).toBeNull();
    const s2 = make({ touch: 'yes', bpm: 60, durationS: 10 });
    s2.start(0);
    const a = s2.update(1000)[0];
    s2.tap(a.x, a.y, 1300);
    const b = s2.update(2000)[0];
    s2.tap(b.x, b.y, 2500);
    for (let t = 3000; t <= 12000; t += 1000) s2.update(t);
    const sum = s2.summary();
    expect(sum.latMean).toBe(400);
    expect(sum.latSd).toBe(141);
  });

  it('gleicher Startwert macht den Ablauf reproduzierbar, anderer nicht', () => {
    const seq = (seed: number) =>
      runAll(make({ order: 'random', pattern: 'grid9', symbols: 'letters', durationS: 30 }, seed))
        .map((e) => `${e.point}${e.symbol}`)
        .join('|');
    expect(seq(5)).toBe(seq(5));
    expect(seq(5)).not.toBe(seq(6));
  });

  it('Einstellungen werden bereinigt (Zahlen geklemmt, Auswahl nur erlaubt)', () => {
    const p = beatParams(sanitizeParams(PARAMS, { bpm: 61, durationS: 99999, sizeCm: -3, pattern: 'quatsch', order: 1, symbols: null, touch: 'ja', sound: 'laut' }));
    expect(p.bpm).toBe(62);
    expect(p.durationS).toBe(300);
    expect(p.sizeCm).toBe(1);
    expect(p.pattern).toBe('corners4');
    expect(p.order).toBe('cycle');
    expect(p.symbols).toBe('digits');
    expect(p.touch).toBe('no');
    expect(p.sound).toBe('yes');
    expect(beatParams({})).toEqual(beatParams(defaultParams(PARAMS)));
  });

  it('PARAMS: Schlüssel, Grenzen und Standard wie im Prototyp; Ton ist neutral; höchstens drei in der Kurzfassung', () => {
    expect(PARAMS.map((d) => d.key)).toEqual(['bpm', 'durationS', 'sizeCm', 'pattern', 'order', 'symbols', 'touch', 'sound']);
    const num = (k: string) => PARAMS.find((d) => d.key === k) as { min: number; max: number; step: number; default: number };
    expect(num('bpm')).toMatchObject({ min: 20, max: 140, step: 2, default: 60 });
    expect(num('durationS')).toMatchObject({ min: 10, max: 300, step: 5, default: 60 });
    expect(num('sizeCm')).toMatchObject({ min: 1, max: 12, step: 0.5, default: 3 });
    expect(PARAMS.filter((d) => d.neutral).map((d) => d.key)).toEqual(['sound']);
    expect(PARAMS.filter((d) => d.summary).length).toBeLessThanOrEqual(3);
  });

  it('randomSymbol: Ziffern 1–9, Buchstaben ohne leicht verwechselbare, Silben Konsonant + Vokal', () => {
    const rng = createRng(2);
    for (let i = 0; i < 200; i++) {
      expect(randomSymbol('digits', rng)).toMatch(/^[1-9]$/);
      expect(randomSymbol('letters', rng)).toMatch(/^[ABDEFGHKLMNPRSTUVZ]$/);
      expect(randomSymbol('syllables', rng)).toMatch(/^[BDFGKLMNPRSTVZ][AEIOU]$/);
    }
  });

  it('round: nicht endliche Werte werden null', () => {
    expect(round(Number.NaN)).toBeNull();
    expect(round(undefined)).toBeNull();
    expect(round(2.345, 2)).toBe(2.35);
  });

  it('persönlicher Tipp je nach Verlauf', () => {
    const base: BeatSummary = { beats: 20, bpm: 60, positions: 4, ampCm: 50, ampDeg: 40, touch: true, hits: 15, misses: 5, stray: 1, accuracy: 75, latMean: 400, latSd: 80, trials: [] };
    expect(tipFor({ ...base, touch: false, hits: 0, misses: 0, stray: 0, accuracy: null })).toBe('read');
    expect(tipFor({ ...base, hits: 0, misses: 20, accuracy: 0 })).toBe('slower');
    expect(tipFor({ ...base, stray: 8 })).toBe('stray');
    expect(tipFor({ ...base, accuracy: 55, hits: 11, misses: 9 })).toBe('slower');
    expect(tipFor({ ...base, accuracy: 95, hits: 19, misses: 1 })).toBe('faster');
    expect(tipFor({ ...base, latSd: 300 })).toBe('steady');
    expect(tipFor(base)).toBe('compare');
  });

  it('Punkte nur zur Motivation', () => {
    const base = { beats: 20, bpm: 60, positions: 4, ampCm: 50, ampDeg: null, hits: 7, misses: 13, stray: 0, accuracy: 35, latMean: null, latSd: null, trials: [] };
    expect(pointsFor({ ...base, touch: true })).toBe(70);
    expect(pointsFor({ ...base, touch: false })).toBe(100);
  });
});
