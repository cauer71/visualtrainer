/**
 * Richtungen (Labor): reine Logik – Abbildung Pfeil → Antwort (gleich/Gegenrichtung), Berührung und Hilfsperson, Einstellungen,
 * Auswertung je Richtung, Anordnung der Tasten auf der Bühne.
 */
import { describe, expect, it } from 'vitest';
import { defaultParams, sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import {
  directionLayout,
  directionParams,
  DirectionSession,
  dirAngle,
  effectiveStimulusMs,
  HELPER_MIN_STIMULUS_MS,
  PARAMS,
  perDirection,
  pointsFor,
  tipFor,
  type DirectionParams,
} from '../../src/exercises/labor-richtungen/logic';

const base = (o: Partial<DirectionParams> = {}): DirectionParams => ({ ...directionParams(defaultParams(PARAMS)), ...o });

/** Sitzung, bis der erste Pfeil zu sehen ist; liefert Pfeil und Zeitpunkt */
function toShow(s: DirectionSession, t0 = 0): { stim: number; t: number } {
  s.start(t0);
  let t = t0;
  while (s.state !== 'show') {
    t += 50;
    s.update(t);
  }
  return { stim: s.current()!, t };
}

describe('Einstellungen', () => {
  it('Standardwerte und Grenzen wie vorgesehen; Ton gehört nicht zum Vergleichsschlüssel', () => {
    const d = directionParams(defaultParams(PARAMS));
    expect(d).toMatchObject({ trials: 32, directions: 4, rule: 'same', input: 'touch', stimulusMs: 2500, waitMinMs: 800, waitMaxMs: 2000, sizeCm: 8, sound: 'no' });
    expect(PARAMS.filter((p) => p.neutral).map((p) => p.key)).toEqual(['sound']);
    expect(PARAMS.filter((p) => p.summary).map((p) => p.key)).toEqual(['directions', 'rule', 'input']);
  });

  it('bereinigt kaputte Werte', () => {
    const p = directionParams(sanitizeParams(PARAMS, { trials: 9999, directions: '6', rule: 'x', input: 'maus', sizeCm: 1, stimulusMs: 1 }));
    expect(p.trials).toBe(120);
    expect(p.directions).toBe(4);
    expect(p.rule).toBe('same');
    expect(p.input).toBe('touch');
    expect(p.sizeCm).toBe(3);
    expect(p.stimulusMs).toBe(500);
    expect(directionParams({}).trials).toBe(32);
    expect(directionParams(sanitizeParams(PARAMS, { directions: '8' })).directions).toBe(8);
  });

  it('mit Hilfsperson mindestens 1,5 s Antwortzeit, per Berührung wie eingestellt', () => {
    expect(effectiveStimulusMs({ input: 'helper', stimulusMs: 500 })).toBe(HELPER_MIN_STIMULUS_MS);
    expect(effectiveStimulusMs({ input: 'helper', stimulusMs: 4000 })).toBe(4000);
    expect(effectiveStimulusMs({ input: 'touch', stimulusMs: 500 })).toBe(500);
    const s = new DirectionSession(base({ input: 'helper', stimulusMs: 500 }), { rng: createRng(1) });
    expect(s.p.stimulusMs).toBe(1500);
  });
});

describe('Abbildung Pfeil → Antwort', () => {
  it('in Pfeilrichtung: die Richtung des Pfeils ist richtig, jede andere falsch (und wird so gespeichert)', () => {
    for (const n of [4, 8] as const) {
      for (let wrongStep = 0; wrongStep < n; wrongStep++) {
        const s = new DirectionSession(base({ directions: n, trials: 10, waitMinMs: 300, waitMaxMs: 300 }), { rng: createRng(3 + wrongStep) });
        const { stim, t } = toShow(s);
        const option = (stim + wrongStep) % n;
        const r = s.respondDir(option, t + 600);
        expect(r?.type, `n=${n} Schritt ${wrongStep}`).toBe(wrongStep === 0 ? 'correct' : 'wrong');
        expect(s.trials[0].answer).toBe(option); // die wirklich getippte Richtung
        expect(s.trials[0].stimulus).toBe(stim);
      }
    }
  });

  it('in Gegenrichtung: die entgegengesetzte Richtung ist richtig; die Pfeilrichtung selbst ist ein Fehler', () => {
    for (const n of [4, 8] as const) {
      const s = new DirectionSession(base({ directions: n, rule: 'opposite', trials: 10, waitMinMs: 300, waitMaxMs: 300 }), { rng: createRng(5) });
      for (let k = 0; k < n; k++) expect(s.expectedFor(k)).toBe((k + n / 2) % n);
      expect(s.expectedFor(0)).toBe(n / 2);
      const a = toShow(s);
      expect(s.respondDir(a.stim, a.t + 500)?.type).toBe('wrong'); // Pfeilrichtung getippt statt Gegenrichtung
      expect(s.trials[0].answer).toBe(a.stim);
      // nächster Pfeil: Gegenrichtung ist richtig
      let t = a.t + 500;
      while (s.state !== 'show') {
        t += 50;
        s.update(t);
      }
      const stim2 = s.current()!;
      expect(s.respondDir(s.expectedFor(stim2), t + 900)?.type).toBe('correct');
      expect(s.trials[1].answer).toBe(s.expectedFor(stim2));
    }
  });

  it('Hilfsperson: Richtig/Falsch zählt als richtig/falsch, Antwort wird als erwartete Richtung bzw. −1 gespeichert', () => {
    const s = new DirectionSession(base({ input: 'helper', rule: 'opposite', trials: 10, waitMinMs: 300, waitMaxMs: 300 }), { rng: createRng(8) });
    const a = toShow(s);
    expect(s.respondHelper(true, a.t + 1200)?.type).toBe('correct');
    expect(s.trials[0].answer).toBe(s.expectedFor(a.stim));
    let t = a.t + 1200;
    while (s.state !== 'show') {
      t += 50;
      s.update(t);
    }
    expect(s.respondHelper(false, t + 1300)?.type).toBe('wrong');
    expect(s.trials[1].answer).toBe(-1);
    const sum = s.summary();
    expect(sum.correct).toBe(1);
    expect(sum.wrong).toBe(1);
    expect(sum.accuracy).toBe(50); // 1 von 2 gewerteten Pfeilen
  });

  it('zu früh und Doppeltipp: Antwort vor dem Pfeil, in den ersten 100 ms und direkt nach einer Antwort', () => {
    const s = new DirectionSession(base({ trials: 10, waitMinMs: 300, waitMaxMs: 300 }), { rng: createRng(2) });
    s.start(0);
    expect(s.respondDir(0, 100)?.type).toBe('early');
    expect(s.respondHelper(true, 120)?.type).toBe('early');
    expect(s.summary().early).toBe(2);
    let t = 100;
    while (s.state !== 'show') {
      t += 20;
      s.update(t);
    }
    expect(s.respondDir(0, t + 50)?.type).toBe('early'); // < 100 ms nach dem Erscheinen
    const ok = s.respondDir(s.expectedFor(s.current()!), t + 600);
    expect(ok?.type).toBe('correct');
    expect(s.respondDir(0, t + 700)?.type).toBe('ignored'); // Doppeltipp
    expect(s.summary().correct).toBe(1);
    expect(s.summary().early).toBe(3);
  });

  it('keine Antwort in der Antwortzeit zählt als „keine Antwort“; die Sitzung endet nach allen Pfeilen', () => {
    const s = new DirectionSession(base({ trials: 4, stimulusMs: 500, waitMinMs: 300, waitMaxMs: 300 }), { rng: createRng(4) });
    s.start(0);
    for (let t = 0; t < 20000 && !s.finished; t += 25) s.update(t);
    expect(s.finished).toBe(true);
    const sum = s.summary();
    expect(sum.omissions).toBe(4);
    expect(sum.correct).toBe(0);
    expect(sum.accuracy).toBe(0);
    expect(sum.rtMean).toBeNull();
  });

  it('Pfeile sind gleichmäßig auf die Richtungen verteilt', () => {
    for (const n of [4, 8] as const) {
      const s = new DirectionSession(base({ directions: n, trials: n * 5 }), { rng: createRng(11) });
      const count = new Array(n).fill(0);
      for (const d of s.stimuli) count[d]++;
      expect(count.every((c) => c === 5)).toBe(true);
    }
  });
});

describe('Auswertung je Richtung', () => {
  it('zählt Pfeile, richtige Antworten und mittlere Zeit je Richtung; Richtungen ohne Pfeil fehlen', () => {
    const s = new DirectionSession(base({ trials: 8, waitMinMs: 300, waitMaxMs: 300 }), { rng: createRng(6) });
    s.start(0);
    let t = 0;
    let k = 0;
    while (!s.finished && t < 100000) {
      t += 25;
      s.update(t);
      if (s.state === 'show' && t - (s.shownAt ?? t) >= 400) {
        k++;
        // jeden dritten Pfeil falsch beantworten
        s.respondDir(k % 3 === 0 ? s.wrongFor(s.expectedFor(s.current()!)) : s.expectedFor(s.current()!), t);
      }
    }
    const rows = perDirection(s.summary(), 4);
    expect(rows.reduce((a, r) => a + r.of, 0)).toBe(8);
    expect(rows.reduce((a, r) => a + r.n, 0)).toBe(s.summary().correct);
    for (const r of rows) {
      if (r.n > 0) expect(r.rtMean).toBeGreaterThan(300);
      else expect(r.rtMean).toBeNull();
    }
  });
});

describe('Tipp und Punkte', () => {
  it('Tipp-Schlüssel nach Faustregeln', () => {
    const mk = (o: Partial<ReturnType<DirectionSession['summary']>>) => ({ trials: 20, correct: 10, wrong: 0, omissions: 0, early: 0, accuracy: 50, rtMean: 800, rtMedian: 800, rtSd: 100, list: [], ...o });
    expect(tipFor(mk({ correct: 0 }), 'touch')).toBe('few');
    expect(tipFor(mk({ early: 4 }), 'touch')).toBe('early');
    expect(tipFor(mk({ wrong: 4 }), 'touch')).toBe('wrong');
    expect(tipFor(mk({ omissions: 4 }), 'touch')).toBe('slow');
    expect(tipFor(mk({ accuracy: 97 }), 'touch')).toBe('harder');
    expect(tipFor(mk({}), 'helper')).toBe('helper');
    expect(tipFor(mk({}), 'touch')).toBe('compare');
    expect(pointsFor(7)).toBe(70);
    expect(pointsFor(-3)).toBe(0);
  });
});

describe('Anordnung auf der Bühne', () => {
  const stages: Array<[number, number]> = [
    [390, 844],
    [320, 560],
    [820, 1180],
    [1180, 820],
    [1024, 600],
    [520, 358],
  ];

  it('Richtungsfeld: Tasten ≥ 56 px (im Film ≥ 26), überlappen nie, liegen im Feld und unter dem Pfeil', () => {
    for (const [w, h] of stages) {
      for (const n of [4, 8]) {
        for (const demo of [false, true]) {
          const u = Math.min(w, h) / 100;
          const minBtn = demo ? 26 : 56;
          const top = Math.max(44, u * 8);
          const m = Math.max(10, u * 2);
          const f = demo ? { x: m, y: top, w: w - 2 * m, h: 207 * (h / 358) } : { x: m, y: top, w: w - 2 * m, h: h - m - top };
          const l = directionLayout(f, n, 'touch', 8 * 38, 80, u, minBtn);
          const label = `${w}x${h} n=${n} demo=${demo}`;
          expect(l.pad.centers.length, label).toBe(n);
          expect(l.pad.size, label).toBeGreaterThanOrEqual(minBtn - 0.01);
          for (const c of l.pad.centers) {
            expect(c.x - l.pad.size / 2, label).toBeGreaterThanOrEqual(f.x - 1);
            expect(c.x + l.pad.size / 2, label).toBeLessThanOrEqual(f.x + f.w + 1);
            expect(c.y + l.pad.size / 2, label).toBeLessThanOrEqual(f.y + f.h + 1);
          }
          for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
              const d = Math.hypot(l.pad.centers[i].x - l.pad.centers[j].x, l.pad.centers[i].y - l.pad.centers[j].y);
              expect(d, `${label} ${i}-${j}`).toBeGreaterThanOrEqual(l.pad.size);
            }
          }
          // Pfeil bleibt über dem Richtungsfeld
          const padTop = Math.min(...l.pad.centers.map((c) => c.y)) - l.pad.size / 2;
          expect(l.arrow.cy + l.arrow.size / 2, label).toBeLessThanOrEqual(padTop + 1);
          expect(l.arrow.size, label).toBeGreaterThanOrEqual(32);
          expect(l.arrow.cy - l.arrow.size / 2, label).toBeGreaterThanOrEqual(f.y);
        }
      }
    }
  });

  it('mit Hilfsperson: kein Richtungsfeld, Pfeil über dem Tastenbereich', () => {
    for (const [w, h] of stages) {
      const u = Math.min(w, h) / 100;
      const f = { x: 10, y: 50, w: w - 20, h: h - 60 };
      const l = directionLayout(f, 4, 'helper', 300, 90, u, 56);
      expect(l.pad.centers).toEqual([]);
      expect(l.arrow.cy + l.arrow.size / 2).toBeLessThanOrEqual(f.y + f.h - 90 + 1);
    }
  });

  it('Winkel: oben 0, im Uhrzeigersinn', () => {
    expect(dirAngle(0, 4)).toBe(0);
    expect(dirAngle(1, 4)).toBeCloseTo(Math.PI / 2, 9);
    expect(dirAngle(2, 4)).toBeCloseTo(Math.PI, 9);
    expect(dirAngle(1, 8)).toBeCloseTo(Math.PI / 4, 9);
  });
});
