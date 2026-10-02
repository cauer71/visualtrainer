/**
 * Wahlreaktion (Labor): reine Logik. Übertragen aus labor/test/choice.test.js (Labor-Prototyp) und erweitert:
 * Zeiten in ms, Zufall über createRng (kein Math.random), keine festen Zufallswerte.
 */
import { describe, expect, it } from 'vitest';
import { defaultParams, sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import {
  answerLayout,
  buttonAt,
  ChoiceSession,
  choiceParams,
  DOUBLE_TAP_MS,
  MIN_BUTTON_PX,
  MIN_RT_MS,
  makeStimuli,
  PARAMS,
  pointsFor,
  tipFor,
  type ChoiceSummary,
} from '../../src/exercises/labor-wahlreaktion/logic';

function make(over: Record<string, unknown> = {}, seed = 1): ChoiceSession {
  const p = choiceParams(sanitizeParams(PARAMS, { ...defaultParams(PARAMS), ...over }));
  return new ChoiceSession(p, { rng: createRng(seed) });
}

describe('Wahlreaktion: Reize (aus dem Prototyp)', () => {
  it('Reize sind gleichmäßig verteilt', () => {
    const s = make({ trials: 40, options: 4 });
    const cnt = [0, 0, 0, 0];
    for (const x of s.stimuli) cnt[x]++;
    expect(cnt).toEqual([10, 10, 10, 10]);
    const t = make({ trials: 10, options: 4 });
    const c2 = [0, 0, 0, 0];
    for (const x of t.stimuli) c2[x]++;
    expect(t.stimuli.length).toBe(10);
    expect(Math.max(...c2) - Math.min(...c2)).toBeLessThanOrEqual(1);
  });

  it('jede Zahl von Tasten (2–6) und Reizen (10–200) ergibt gültige, ausgeglichene Folgen', () => {
    for (const options of [2, 3, 4, 5, 6]) {
      for (const trials of [10, 35, 200]) {
        const st = makeStimuli(trials, options, createRng(options * 7 + trials));
        expect(st.length).toBe(trials);
        const cnt = new Array(options).fill(0);
        for (const x of st) {
          expect(x).toBeGreaterThanOrEqual(0);
          expect(x).toBeLessThan(options);
          cnt[x]++;
        }
        expect(Math.max(...cnt) - Math.min(...cnt)).toBeLessThanOrEqual(1);
      }
    }
  });

  it('gleicher Startwert, gleiche Reize und gleiche Wartezeiten', () => {
    const a = make({}, 5);
    const b = make({}, 5);
    expect(a.stimuli).toEqual(b.stimuli);
    a.start(0);
    b.start(0);
    expect(a.onsetAt).toBe(b.onsetAt);
  });
});

describe('Wahlreaktion: Ablauf (aus dem Prototyp)', () => {
  it('Wartezeit, Anzeige, richtige und falsche Antwort', () => {
    const s = make({ trials: 10, options: 3, waitMinMs: 600, waitMaxMs: 600, stimulusMs: 1000 });
    s.start(0);
    expect(s.state).toBe('wait');
    s.update(599);
    expect(s.state).toBe('wait');
    s.update(600);
    expect(s.state).toBe('show');
    const stim = s.current()!;
    expect(stim).toBeGreaterThanOrEqual(0);
    expect(stim).toBeLessThan(3);
    const r = s.respond(stim, 950);
    expect(r).toMatchObject({ type: 'correct', rt: 350 });
    expect(s.state).toBe('wait');
    s.update(1550); // zweite Anzeige beginnt (950 + 600)
    expect(s.state).toBe('show');
    const wrong = (s.current()! + 1) % 3;
    expect(s.respond(wrong, 1700)!.type).toBe('wrong');
    expect(s.trials.length).toBe(2);
    expect(s.trials[1].outcome).toBe('wrong');
  });

  it('Zu früh getippt zählt nicht als Durchgang', () => {
    const s = make({ trials: 10, waitMinMs: 1000, waitMaxMs: 1000 });
    s.start(0);
    expect(s.respond(0, 300)).toEqual({ type: 'early' });
    expect(s.early).toBe(1);
    expect(s.trials.length).toBe(0);
    expect(s.state).toBe('wait');
  });

  it('Keine Antwort: nach Ablauf der Antwortzeit', () => {
    const s = make({ trials: 10, waitMinMs: 300, waitMaxMs: 300, stimulusMs: 500 });
    s.start(0);
    s.update(300);
    expect(s.state).toBe('show');
    s.update(799);
    expect(s.state).toBe('show');
    s.update(800);
    expect(s.trials[0].outcome).toBe('omission');
    expect(s.trials[0].rtMs).toBeNull();
    expect(s.state).toBe('wait');
  });

  it('Ende nach allen Durchgängen; Kennzahlen (Prototyp-Test)', () => {
    const s = make({ trials: 10, options: 2, waitMinMs: 300, waitMaxMs: 300, stimulusMs: 1000 }, 4);
    s.start(0);
    let t = 0;
    for (let i = 0; i < 10; i++) {
      t += 300;
      s.update(t);
      if (i < 6) {
        s.respond(s.current()!, t + 400); // 6 richtig, je 400 ms
        t += 400;
      } else if (i < 8) {
        s.respond((s.current()! + 1) % 2, t + 500); // 2 falsch
        t += 500;
      } else {
        t += 1000; // 2 ohne Antwort
        s.update(t);
      }
    }
    expect(s.finished).toBe(true);
    expect(s.state).toBe('done');
    const sum = s.summary();
    expect(sum.correct).toBe(6);
    expect(sum.wrong).toBe(2);
    expect(sum.omissions).toBe(2);
    expect(sum.accuracy).toBe(60);
    expect(sum.rtMean).toBe(400);
    expect(sum.rtSd).toBe(0);
    expect(sum.rtMedian).toBe(400);
    expect(s.respond(0, t + 10)).toBeNull();
  });

  it('Wartezeit-Maximum unter dem Minimum wird angehoben (Prototyp-Test)', () => {
    const s = make({ waitMinMs: 2000, waitMaxMs: 500 });
    s.start(0);
    expect(s.onsetAt).toBe(2000);
  });

  it('Wartezeit liegt immer zwischen Minimum und Maximum und streut', () => {
    const seen = new Set<number>();
    for (let seed = 1; seed <= 60; seed++) {
      const s = make({ waitMinMs: 600, waitMaxMs: 1800 }, seed);
      s.start(1000);
      expect(s.onsetAt!).toBeGreaterThanOrEqual(1600);
      expect(s.onsetAt!).toBeLessThanOrEqual(2800);
      seen.add(Math.round(s.onsetAt! / 50));
    }
    expect(seen.size).toBeGreaterThan(10);
  });
});

describe('Wahlreaktion: Ergänzungen (zu früh, Doppeltipp)', () => {
  it('Antwort in den ersten 100 ms nach dem Erscheinen zählt als „zu früh“, der Reiz bleibt stehen', () => {
    const s = make({ waitMinMs: 500, waitMaxMs: 500, stimulusMs: 2000 });
    s.start(0);
    s.update(500);
    expect(s.state).toBe('show');
    expect(s.respond(s.current()!, 500 + MIN_RT_MS - 1)).toEqual({ type: 'early' });
    expect(s.early).toBe(1);
    expect(s.state).toBe('show');
    expect(s.trials.length).toBe(0);
    // genau 100 ms ist schon eine Antwort
    expect(s.respond(s.current()!, 500 + MIN_RT_MS)!.type).toBe('correct');
  });

  it('Antwort vor der Anzeigezeit (Ereigniszeit liegt vor der Bildzeit) ist „zu früh“, nie eine negative Zeit', () => {
    const s = make({ waitMinMs: 500, waitMaxMs: 500 });
    s.start(0);
    s.update(500);
    expect(s.respond(s.current()!, 490)).toEqual({ type: 'early' });
    expect(s.trials.length).toBe(0);
  });

  it('Doppeltipp direkt nach einer Antwort wird ignoriert (weder „zu früh“ noch Antwort), später zählt er', () => {
    const s = make({ waitMinMs: 600, waitMaxMs: 600, stimulusMs: 2000 });
    s.start(0);
    s.update(600);
    s.respond(s.current()!, 1000);
    expect(s.respond(0, 1000 + DOUBLE_TAP_MS - 5)).toEqual({ type: 'ignored' });
    expect(s.early).toBe(0);
    expect(s.trials.length).toBe(1);
    // später, aber noch vor dem nächsten Reiz: zu früh
    expect(s.respond(0, 1000 + DOUBLE_TAP_MS + 5)).toEqual({ type: 'early' });
    expect(s.early).toBe(1);
  });

  it('zu frühe Tipps verschieben den nächsten Reiz nicht', () => {
    const s = make({ waitMinMs: 1000, waitMaxMs: 1000 });
    s.start(0);
    const onset = s.onsetAt;
    s.respond(0, 200);
    s.respond(1, 500);
    expect(s.onsetAt).toBe(onset);
  });
});

describe('Wahlreaktion: Kennzahlen', () => {
  it('ohne Antworten: kein NaN, Zeiten fehlen', () => {
    const s = make({ trials: 10, waitMinMs: 300, waitMaxMs: 300, stimulusMs: 300 });
    s.start(0);
    let t = 0;
    for (let i = 0; i < 400 && !s.finished; i++) s.update((t += 50));
    const sum = s.summary();
    expect(sum.omissions).toBe(10);
    expect(sum.correct).toBe(0);
    expect(sum.accuracy).toBe(0);
    expect(sum.rtMean).toBeNull();
    expect(sum.rtSd).toBeNull();
    expect(Number.isFinite(sum.accuracy as number)).toBe(true);
  });

  it('eine einzige richtige Antwort: Streuung fehlt statt 0/NaN, vor dem Start ist die Zusammenfassung leer', () => {
    const e = make().summary();
    expect(e.trials).toBe(0);
    expect(e.accuracy).toBeNull();
    const s = make({ trials: 10, waitMinMs: 300, waitMaxMs: 300 });
    s.start(0);
    s.update(300);
    s.respond(s.current()!, 700);
    const sum = s.summary();
    expect(sum.correct).toBe(1);
    expect(sum.rtMean).toBe(400);
    expect(sum.rtSd).toBeNull();
  });

  it('Reaktionszeit zählt nur richtige Antworten', () => {
    const s = make({ trials: 10, options: 2, waitMinMs: 300, waitMaxMs: 300 });
    s.start(0);
    s.update(300);
    s.respond((s.current()! + 1) % 2, 800); // falsch, 500 ms
    s.update(1100);
    s.respond(s.current()!, 1500); // richtig, 400 ms
    expect(s.summary().rtMean).toBe(400);
  });

  it('Einstellungen werden bereinigt', () => {
    const p = choiceParams(sanitizeParams(PARAMS, { trials: 3, options: 9, stimulus: 'x', stimulusMs: 20, waitMinMs: 90000, waitMaxMs: 10, sizeCm: 2.3, sound: '1' }));
    expect(p).toEqual({ trials: 10, options: 6, stimulus: 'color', stimulusMs: 300, waitMinMs: 3000, waitMaxMs: 300, sizeCm: 2.5, sound: 'no' });
    expect(choiceParams(defaultParams(PARAMS))).toEqual({ trials: 40, options: 4, stimulus: 'color', stimulusMs: 1500, waitMinMs: 600, waitMaxMs: 1800, sizeCm: 6, sound: 'no' });
    expect(choiceParams({})).toEqual(choiceParams(defaultParams(PARAMS)));
  });

  it('PARAMS entsprechen dem Prototyp; nur der Ton ist neutral', () => {
    expect(PARAMS.map((d) => d.key)).toEqual(['trials', 'options', 'stimulus', 'stimulusMs', 'waitMinMs', 'waitMaxMs', 'sizeCm', 'sound']);
    const num = (k: string) => PARAMS.find((d) => d.key === k) as { min: number; max: number; step: number; default: number };
    expect(num('trials')).toMatchObject({ min: 10, max: 200, step: 5, default: 40 });
    expect(num('options')).toMatchObject({ min: 2, max: 6, step: 1, default: 4 });
    expect(num('stimulusMs')).toMatchObject({ min: 300, max: 3000, step: 50, default: 1500 });
    expect(num('waitMinMs')).toMatchObject({ min: 300, max: 3000, step: 50, default: 600 });
    expect(num('waitMaxMs')).toMatchObject({ min: 300, max: 5000, step: 50, default: 1800 });
    expect(num('sizeCm')).toMatchObject({ min: 2, max: 12, step: 0.5, default: 6 });
    expect(PARAMS.filter((d) => d.neutral).map((d) => d.key)).toEqual(['sound']);
    expect(PARAMS.filter((d) => d.summary).length).toBeLessThanOrEqual(3);
  });
});

describe('Wahlreaktion: Tasten-Anordnung', () => {
  const sizes: Array<[number, number, number]> = [
    [1180, 820, 8.2],
    [820, 1180, 8.2],
    [390, 844, 3.9],
    [360, 640, 3.6],
    [320, 568, 3.2],
  ];
  it('jede Taste ist mindestens so groß wie ein Touch-Ziel, liegt in der Bühne und überlappt keine andere', () => {
    for (const [w, h, u] of sizes) {
      for (let n = 2; n <= 6; n++) {
        const rs = answerLayout(n, 10, w - 10, h - 10, u);
        expect(rs.length).toBe(n);
        rs.forEach((r, i) => {
          expect(r.w, `${w}x${h} n=${n}`).toBeGreaterThanOrEqual(MIN_BUTTON_PX);
          expect(r.h).toBeGreaterThanOrEqual(MIN_BUTTON_PX);
          expect(r.x).toBeGreaterThanOrEqual(10 - 1e-6);
          expect(r.x + r.w).toBeLessThanOrEqual(w - 10 + 1e-6);
          expect(r.y + r.h).toBeLessThanOrEqual(h - 10 + 1e-6);
          for (let j = i + 1; j < n; j++) {
            const q = rs[j];
            const sep = r.x + r.w <= q.x + 1e-6 || q.x + q.w <= r.x + 1e-6 || r.y + r.h <= q.y + 1e-6 || q.y + q.h <= r.y + 1e-6;
            expect(sep, `Tasten ${i}/${j} überlappen bei ${w}x${h}, n=${n}`).toBe(true);
          }
        });
      }
    }
  });

  it('auf dem Handy mit vielen Tasten zwei Reihen, auf dem Tablet eine', () => {
    const rowsOf = (n: number, w: number, h: number, u: number) => new Set(answerLayout(n, 10, w - 10, h - 10, u).map((r) => Math.round(r.y))).size;
    expect(rowsOf(6, 390, 844, 3.9)).toBe(2);
    expect(rowsOf(6, 1180, 820, 8.2)).toBe(1);
    expect(rowsOf(2, 390, 844, 3.9)).toBe(1);
  });

  it('buttonAt trifft die richtige Taste, daneben −1', () => {
    const rs = answerLayout(4, 10, 1170, 800, 8.2);
    rs.forEach((r, i) => expect(buttonAt(rs, r.x + r.w / 2, r.y + r.h / 2)).toBe(i));
    expect(buttonAt(rs, 5, 5)).toBe(-1);
    expect(buttonAt(rs, rs[0].x + rs[0].w / 2, rs[0].y - 40)).toBe(-1);
  });
});

describe('Wahlreaktion: Tipps und Punkte', () => {
  const base: ChoiceSummary = { trials: 40, correct: 34, wrong: 2, omissions: 2, early: 1, accuracy: 85, rtMean: 600, rtSd: 100, rtMedian: 590, list: [] };
  it('Tipp-Schlüssel nach Faustregeln', () => {
    expect(tipFor({ ...base, correct: 0 })).toBe('few');
    expect(tipFor({ ...base, trials: 0, correct: 0 })).toBe('few');
    expect(tipFor({ ...base, early: 8 })).toBe('early');
    expect(tipFor({ ...base, wrong: 8, correct: 30 })).toBe('wrong');
    expect(tipFor({ ...base, omissions: 8, correct: 30 })).toBe('slow');
    expect(tipFor({ ...base, wrong: 0, omissions: 0, accuracy: 100, correct: 40 })).toBe('harder');
    expect(tipFor({ ...base, rtSd: 400 })).toBe('steady');
    expect(tipFor(base)).toBe('compare');
  });
  it('Punkte: 10 je richtiger Antwort, nie negativ', () => {
    expect(pointsFor(30)).toBe(300);
    expect(pointsFor(-1)).toBe(0);
  });
});
