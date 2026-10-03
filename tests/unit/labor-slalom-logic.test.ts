/**
 * Slalom (Labor): reine Logik – Einstellungen, Anpassung der Größen an das Feld, Tore (Abstand, Geschwindigkeit, Beschleunigung),
 * Wertung (durchfahren/berührt, Serie, Abweichung), Drehen des Tablets, Autopilot.
 */
import { describe, expect, it } from 'vitest';
import { defaultParams, sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import {
  autopilotInput,
  autopilotTarget,
  ballRadius,
  effectiveGap,
  effectiveSpacing,
  PARAMS,
  pointsFor,
  slalomParams,
  SlalomSession,
  tipFor,
  type SlalomParams,
} from '../../src/exercises/labor-slalom/logic';

const base = (o: Partial<SlalomParams> = {}): SlalomParams => ({ ...slalomParams(defaultParams(PARAMS)), ...o });

/** Läuft in 16-ms-Schritten, mit der Eingabe von `steer(session)` */
function run(s: SlalomSession, seconds: number, steer: (s: SlalomSession) => Parameters<SlalomSession['update']>[1], t0 = 0): number {
  s.start(t0);
  let t = t0;
  while (t - t0 < seconds * 1000 && !s.finished) {
    t += 16;
    s.update(t, steer(s));
  }
  return t;
}

describe('Einstellungen', () => {
  it('Standardwerte wie vorgesehen; alle gehören zum Vergleichsschlüssel (kein Ton)', () => {
    expect(slalomParams(defaultParams(PARAMS))).toEqual({ durationS: 60, gapCm: 12, speedCmS: 14, speedUpPct: 20, spacingCm: 14, control: 'pointer' });
    expect(PARAMS.filter((p) => p.neutral)).toEqual([]);
    expect(PARAMS.filter((p) => p.summary).map((p) => p.key)).toEqual(['gapCm', 'speedCmS', 'control']);
    const c = PARAMS.find((p) => p.key === 'control')!;
    expect(c.type === 'select' && c.options).toEqual(['pointer', 'keys', 'tilt']);
  });

  it('bereinigt kaputte Werte', () => {
    expect(slalomParams(sanitizeParams(PARAMS, { durationS: 1, gapCm: 99, speedCmS: 0, speedUpPct: 500, spacingCm: 1, control: 'joystick' }))).toEqual({ durationS: 20, gapCm: 24, speedCmS: 4, speedUpPct: 100, spacingCm: 8, control: 'pointer' });
    expect(slalomParams({}).control).toBe('pointer');
    expect(slalomParams(sanitizeParams(PARAMS, { control: 'tilt' })).control).toBe('tilt');
  });
});

describe('Größen passen sich dem Feld an', () => {
  it('Kugelradius ≈ 10 % der kürzeren Seite, 0,5–1,2 cm', () => {
    expect(ballRadius(30, 20)).toBe(1.2);
    expect(ballRadius(10.3, 22)).toBeCloseTo(1.03, 9);
    expect(ballRadius(18, 7.5)).toBe(0.75);
    expect(ballRadius(2, 2)).toBe(0.5);
  });

  it('Torlücke: höchstens 80 % der Breite, mindestens Kugeldurchmesser + 1,2 cm', () => {
    expect(effectiveGap(12, 30, 1.2)).toBe(12);
    expect(effectiveGap(24, 10.3, 1.03)).toBeCloseTo(8.24, 9); // Handy
    expect(effectiveGap(4, 30, 1.2)).toBe(4);
    expect(effectiveGap(1, 30, 1.2)).toBeCloseTo(3.6, 9);
    expect(effectiveGap(24, 3, 0.5)).toBeCloseTo(2.4, 9); // winziges Feld: höchstens 80 % der Breite, nie unter dem Mindestwert 2,2
  });

  it('Abstand der Tore: höchstens 60 % der Höhe, mindestens 3 cm', () => {
    expect(effectiveSpacing(14, 40)).toBe(14);
    expect(effectiveSpacing(30, 22)).toBeCloseTo(13.2, 9);
    expect(effectiveSpacing(8, 3)).toBe(3);
  });

  it('die Sitzung benutzt die angepassten Werte und weist sie aus', () => {
    const s = new SlalomSession(base({ gapCm: 24, spacingCm: 30 }), { rng: createRng(1), fieldWcm: 10.3, fieldHcm: 22 });
    expect(s.gap).toBeCloseTo(8.24, 9);
    expect(s.spacing).toBeCloseTo(13.2, 9);
    expect(s.summary().gapCm).toBe(8.2);
    expect(s.summary().spacingCm).toBe(13.2);
  });
});

describe('Tore und Wertung', () => {
  const env = (seed = 3) => ({ rng: createRng(seed), fieldWcm: 30, fieldHcm: 20 });

  it('Tore laufen von oben nach unten im festen Abstand; Geschwindigkeit steigt mit der Zeit um speedUpPct je Minute', () => {
    const s = new SlalomSession(base({ speedUpPct: 50, speedCmS: 10, spacingCm: 10 }), env());
    expect(s.speed()).toBe(10);
    s.elapsed = 60;
    expect(s.speed()).toBeCloseTo(15, 9);
    const s2 = new SlalomSession(base({ speedUpPct: 0, speedCmS: 10, spacingCm: 10, durationS: 20 }), env());
    run(s2, 3, () => null);
    expect(s2.gates.length).toBeGreaterThanOrEqual(2);
    for (let i = 1; i < s2.gates.length; i++) expect(s2.gates[i - 1].y - s2.gates[i].y).toBeCloseTo(10, 0);
    expect(s2.gates.every((g) => g.cx >= g.gap / 2 && g.cx <= 30 - g.gap / 2)).toBe(true);
  });

  it('Bewegung unabhängig von der Bildrate: gleiche Strecke bei 30 und 144 Hz', () => {
    const dist = (step: number) => {
      const s = new SlalomSession(base({ speedUpPct: 0, speedCmS: 10, durationS: 20 }), env());
      s.start(0);
      for (let t = step; t <= 2000; t += step) s.update(t, null);
      return s.gates[0].y;
    };
    expect(Math.abs(dist(1000 / 30) - dist(1000 / 144))).toBeLessThan(0.4);
  });

  it('Ball in der Mitte der Lücke: durchfahren; weit daneben: berührt; Serie und Abweichung stimmen', () => {
    const s = new SlalomSession(base({ speedUpPct: 0, durationS: 20, speedCmS: 14 }), env(5));
    run(s, 20, (q) => {
      const g = q.gates.find((x) => !x.evaluated && x.y < q.ballY);
      return g ? { mode: 'position', x: (g.cx - q.ballR) / (q.W - 2 * q.ballR) } : null;
    });
    const sum = s.summary();
    expect(sum.gates).toBeGreaterThanOrEqual(8);
    expect(sum.hits).toBe(0);
    expect(sum.passed).toBe(sum.gates);
    expect(sum.accuracy).toBe(100);
    expect(sum.streak).toBe(sum.gates);
    expect(sum.centerDev).toBeLessThan(0.6);
    // ein Ball, der am linken Rand klebt, berührt früher oder später Stangen
    const s2 = new SlalomSession(base({ speedUpPct: 0, durationS: 20 }), env(5));
    run(s2, 20, () => ({ mode: 'position', x: 0 }));
    expect(s2.summary().hits).toBeGreaterThan(0);
    expect(s2.summary().streak).toBeLessThan(s2.summary().gates);
  });

  it('Wertung: genau am Rand der Lücke (Radius berücksichtigt) zählt noch, einen Hauch weiter nicht', () => {
    const s = new SlalomSession(base({ gapCm: 12 }), env());
    const room = 12 / 2 - s.ballR;
    const probe = (off: number) => {
      const q = new SlalomSession(base({ gapCm: 12 }), env());
      q.start(0);
      q.x = 15 + off;
      q.gates.push({ id: 99, y: q.ballY + 0.01, cx: 15, gap: q.gap, evaluated: false });
      q.update(16, null);
      return q.trials[q.trials.length - 1]?.passed;
    };
    expect(probe(room - 0.05)).toBe(true);
    expect(probe(room + 0.05)).toBe(false);
  });

  it('endet nach der Dauer; ohne Tore nie NaN', () => {
    const s = new SlalomSession(base({ durationS: 20 }), env());
    s.start(0);
    const sum = s.summary();
    expect(sum.accuracy).toBeNull();
    expect(sum.centerDev).toBeNull();
    run(s, 25, () => null);
    expect(s.finished).toBe(true);
    expect(s.elapsed).toBeGreaterThanOrEqual(20);
  });

  it('Steuerung: Achse bewegt mit Höchstgeschwindigkeit, Kugel bleibt ganz im Feld', () => {
    const s = new SlalomSession(base({ durationS: 100 }), env());
    s.start(0);
    for (let t = 16; t < 5000; t += 16) s.update(t, { mode: 'axis', a: -1 });
    expect(s.x).toBeCloseTo(s.ballR, 9);
    for (let t = 5000; t < 10000; t += 16) s.update(t, { mode: 'axis', a: 1 });
    expect(s.x).toBeCloseTo(30 - s.ballR, 9);
    s.update(10016, { mode: 'position', x: 0.5 });
    expect(s.x).toBeCloseTo(15, 9);
  });
});

describe('Tablet drehen', () => {
  it('Tore und Kugel werden umgerechnet und bleiben im Feld', () => {
    const s = new SlalomSession(base({ durationS: 100, speedUpPct: 0 }), { rng: createRng(2), fieldWcm: 30, fieldHcm: 20 });
    run(s, 4, () => ({ mode: 'position', x: 0.8 }));
    s.setField(20, 30);
    expect(s.W).toBe(20);
    expect(s.H).toBe(30);
    expect(s.ballY).toBeCloseTo(25.5, 9);
    expect(s.x).toBeLessThanOrEqual(20 - s.ballR + 1e-9);
    for (const g of s.gates) {
      expect(g.cx).toBeGreaterThanOrEqual(g.gap / 2 - 1e-9);
      expect(g.cx).toBeLessThanOrEqual(20 - g.gap / 2 + 1e-9);
      expect(g.gap).toBe(s.gap);
    }
    s.update(5000, null);
    expect(Number.isFinite(s.x)).toBe(true);
    s.setField(20, 30); // gleiche Größe: nichts ändert sich
  });
});

describe('Autopilot (Film und Autoplay)', () => {
  it('fährt mit Zeiger- und Achsen-Eingabe sauber durch alle Tore', () => {
    for (const mode of ['position', 'axis'] as const) {
      const s = new SlalomSession(base({ durationS: 25, speedUpPct: 0 }), { rng: createRng(8), fieldWcm: 30, fieldHcm: 20 });
      run(s, 25, (q) => autopilotInput(q, autopilotTarget(q, new Set()), mode));
      const sum = s.summary();
      expect(sum.gates, mode).toBeGreaterThan(10);
      expect(sum.accuracy, mode).toBeGreaterThanOrEqual(95);
    }
  });

  it('steuert bei markierten Toren absichtlich daneben und verfehlt sie', () => {
    const s = new SlalomSession(base({ durationS: 25, speedUpPct: 0 }), { rng: createRng(8), fieldWcm: 30, fieldHcm: 20 });
    const errors = new Set<number>([3, 6]);
    run(s, 25, (q) => autopilotInput(q, autopilotTarget(q, errors), 'position'));
    const failed = s.trials.filter((t) => !t.passed).map((t) => t.nr);
    expect(failed).toEqual(expect.arrayContaining([3, 6]));
    expect(s.trials.filter((t) => t.passed).length).toBeGreaterThan(5);
  });

  it('ohne Tor: Feldmitte', () => {
    const s = new SlalomSession(base(), { rng: createRng(1), fieldWcm: 30, fieldHcm: 20 });
    expect(autopilotTarget(s, new Set())).toBe(15);
  });
});

describe('Tipp und Punkte', () => {
  it('Tipp-Schlüssel nach Faustregeln', () => {
    const mk = (o: Partial<ReturnType<SlalomSession['summary']>>) => ({ passed: 20, hits: 5, gates: 25, accuracy: 80, streak: 6, centerDev: 1, gapCm: 12, spacingCm: 14, trials: [], ...o });
    expect(tipFor(mk({ passed: 0 }))).toBe('few');
    expect(tipFor(mk({ accuracy: 50 }))).toBe('easier');
    expect(tipFor(mk({ accuracy: 95, passed: 24 }))).toBe('harder');
    expect(tipFor(mk({ centerDev: 4 }))).toBe('center');
    expect(tipFor(mk({}))).toBe('compare');
    expect(pointsFor(12)).toBe(120);
  });
});
