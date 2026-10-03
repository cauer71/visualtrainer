/**
 * Invasoren (Labor): reine Logik – Einstellungen, Anpassung der Größen an das Feld, Schiffe (Erscheinen, Fallen), Haltezeit
 * (Aufbau, Abbau), Treffer und Verpasste, Drehen des Tablets, Autopilot.
 */
import { describe, expect, it } from 'vitest';
import { defaultParams, sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import {
  autopilotInput,
  autopilotTarget,
  DECAY,
  effectiveTolerance,
  FIRST_SPAWN_MS,
  invaderParams,
  InvadersSession,
  LOCK_FROM,
  PARAMS,
  pointsFor,
  shipRadius,
  tipFor,
  type InvaderParams,
} from '../../src/exercises/labor-invasoren/logic';

const base = (o: Partial<InvaderParams> = {}): InvaderParams => ({ ...invaderParams(defaultParams(PARAMS)), ...o });
const env = (seed = 3, w = 30, h = 20) => ({ rng: createRng(seed), fieldWcm: w, fieldHcm: h });

function run(s: InvadersSession, seconds: number, steer: (s: InvadersSession) => Parameters<InvadersSession['update']>[1], t0 = 0): number {
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
    expect(invaderParams(defaultParams(PARAMS))).toEqual({ durationS: 60, spawnMs: 2200, fallCmS: 8, dwellMs: 400, toleranceCm: 2, control: 'pointer' });
    expect(PARAMS.filter((p) => p.neutral)).toEqual([]);
    expect(PARAMS.filter((p) => p.summary).map((p) => p.key)).toEqual(['fallCmS', 'dwellMs', 'control']);
  });

  it('bereinigt kaputte Werte', () => {
    expect(invaderParams(sanitizeParams(PARAMS, { durationS: 1, spawnMs: 1, fallCmS: 99, dwellMs: 1, toleranceCm: 99, control: 'joystick' }))).toEqual({ durationS: 20, spawnMs: 800, fallCmS: 25, dwellMs: 100, toleranceCm: 6, control: 'pointer' });
    expect(invaderParams(sanitizeParams(PARAMS, { control: 'keys' })).control).toBe('keys');
    expect(invaderParams({}).control).toBe('pointer');
  });
});

describe('Größen passen sich dem Feld an', () => {
  it('Schiffsgröße ≈ 8 % der kürzeren Seite, 0,6–1,6 cm; Toleranz höchstens ein Viertel der Breite', () => {
    expect(shipRadius(30, 20)).toBe(1.6);
    expect(shipRadius(10.3, 22)).toBeCloseTo(0.824, 9);
    expect(shipRadius(5, 5)).toBe(0.6);
    expect(effectiveTolerance(2, 30)).toBe(2);
    expect(effectiveTolerance(6, 10.3)).toBeCloseTo(2.575, 9);
    expect(effectiveTolerance(0.5, 1)).toBe(0.3);
    const s = new InvadersSession(base({ toleranceCm: 6 }), env(1, 10.3, 22));
    expect(s.tol).toBeCloseTo(2.575, 9);
    expect(s.summary().toleranceCm).toBe(2.6);
  });
});

describe('Schiffe und Haltezeit', () => {
  it('das erste Schiff erscheint 0,6 s nach dem Start, danach im eingestellten Takt, ganz im Feld', () => {
    const s = new InvadersSession(base({ spawnMs: 1000, fallCmS: 3 }), env());
    s.start(0);
    s.update(FIRST_SPAWN_MS - 16, null);
    expect(s.invaders).toHaveLength(0);
    for (let t = FIRST_SPAWN_MS; t <= 4700; t += 16) s.update(t, null);
    const n = s.invaders.length + s.trials.length;
    expect(n).toBeGreaterThanOrEqual(4);
    expect(n).toBeLessThanOrEqual(5);
    for (const v of s.invaders) {
      expect(v.x).toBeGreaterThanOrEqual(s.shipR - 1e-9);
      expect(v.x).toBeLessThanOrEqual(30 - s.shipR + 1e-9);
    }
  });

  it('Schiffe fallen mit der Zeit (bildratenunabhängig)', () => {
    const y = (step: number) => {
      const s = new InvadersSession(base({ fallCmS: 10, spawnMs: 5000 }), env());
      s.start(0);
      for (let t = step; t <= 2000; t += step) s.update(t, null);
      return s.invaders[0].y;
    };
    expect(Math.abs(y(1000 / 30) - y(1000 / 144))).toBeLessThan(0.4);
  });

  it('ausgerichtet bleiben, bis die Haltezeit voll ist: Schiff wird getroffen; Zeit seit dem Erscheinen wird gezählt', () => {
    const s = new InvadersSession(base({ fallCmS: 4, dwellMs: 400, spawnMs: 20000, durationS: 30 }), env(2));
    run(s, 10, (q) => autopilotInput(q, autopilotTarget(q, new Set()), 'position'));
    expect(s.destroyed).toBeGreaterThanOrEqual(1);
    const t = s.trials[0];
    expect(t.outcome).toBe('destroyed');
    expect(t.ms).toBeGreaterThan(400); // mindestens die Haltezeit
    expect(s.summary().tMean).toBe(t.ms);
    expect(s.summary().accuracy).toBe(100);
  });

  it('geplante Lage der Schiffe (Intro-Film) gilt, null und ungültige Werte überlässt es dem Zufall; Lage bleibt im Feld', () => {
    const s = new InvadersSession(base({ spawnMs: 800, fallCmS: 3 }), { ...env(), spawnX: (n) => (n === 1 ? 0 : n === 2 ? 1 : n === 3 ? Number.NaN : n === 4 ? 7 : null) });
    s.start(0);
    for (let t = 16; t <= 4000; t += 16) s.update(t, null);
    const xs = [...s.invaders].map((v) => v.x);
    expect(xs.length).toBeGreaterThanOrEqual(4);
    const lo = s.shipR;
    const hi = 30 - s.shipR;
    expect(xs[0]).toBeCloseTo(lo, 9);
    expect(xs[1]).toBeCloseTo(hi, 9);
    expect(xs[3]).toBeCloseTo(hi, 9); // 7 wird auf 1 begrenzt
    for (const x of xs) {
      expect(x).toBeGreaterThanOrEqual(lo - 1e-9);
      expect(x).toBeLessThanOrEqual(hi + 1e-9);
    }
  });

  it('im oberen Viertel kann nichts gehalten werden', () => {
    const s = new InvadersSession(base({ fallCmS: 1, spawnMs: 20000, dwellMs: 100 }), env(2));
    s.start(0);
    s.update(700, null);
    const v = s.invaders[0];
    s.x = v.x;
    expect(v.y).toBeLessThan(s.H * LOCK_FROM);
    expect(s.aligned(v)).toBe(false);
    v.y = s.H * LOCK_FROM + 0.01;
    expect(s.aligned(v)).toBe(true);
  });

  it('Abweichung baut die Haltezeit doppelt so schnell ab, wie sie aufgebaut wird; sie fällt nie unter 0', () => {
    const s = new InvadersSession(base({ fallCmS: 0.0001 + 3, spawnMs: 20000, dwellMs: 1500 }), env(2));
    s.start(0);
    s.update(700, null);
    const v = s.invaders[0];
    v.y = s.H * 0.5;
    s.x = v.x;
    let t = 700;
    for (let i = 0; i < 25; i++) s.update((t += 16), null); // 0,4 s ausgerichtet
    const built = v.lock;
    expect(built).toBeGreaterThan(300);
    s.x = v.x + s.tol + 3 <= s.W - s.shipR ? v.x + s.tol + 3 : v.x - s.tol - 3; // deutlich neben dem Schiff
    for (let i = 0; i < 12; i++) s.update((t += 16), null); // 0,19 s daneben
    expect(v.lock).toBeLessThan(built - 0.19 * 1000 * (DECAY - 0.4)); // fast doppelt so schnell abgebaut
    for (let i = 0; i < 100; i++) s.update((t += 16), null);
    expect(v.lock).toBe(0);
  });

  it('nicht erreichtes Schiff: am unteren Rand zählt es als verpasst, ohne Zeit', () => {
    const s = new InvadersSession(base({ fallCmS: 10, spawnMs: 20000, durationS: 30 }), env(2));
    run(s, 6, () => ({ mode: 'position', x: 0 }));
    expect(s.missed).toBeGreaterThanOrEqual(1);
    const m = s.trials.find((t) => t.outcome === 'missed')!;
    expect(m.ms).toBeNull();
    expect(s.summary().tMean).toBeNull(); // nie NaN
    expect(s.summary().accuracy).toBe(0);
  });

  it('endet nach der Dauer; ohne Schiffe nie NaN', () => {
    const s = new InvadersSession(base({ durationS: 20 }), env());
    s.start(0);
    const sum = s.summary();
    expect(sum.accuracy).toBeNull();
    expect(sum.tMean).toBeNull();
    expect(sum.tMedian).toBeNull();
    run(s, 25, () => null);
    expect(s.finished).toBe(true);
  });

  it('Steuerung: Zielpunkt bleibt ganz im Feld', () => {
    const s = new InvadersSession(base({ durationS: 100 }), env());
    s.start(0);
    for (let t = 16; t < 5000; t += 16) s.update(t, { mode: 'axis', a: -1 });
    expect(s.x).toBeCloseTo(s.shipR, 9);
    for (let t = 5000; t < 10000; t += 16) s.update(t, { mode: 'axis', a: 1 });
    expect(s.x).toBeCloseTo(30 - s.shipR, 9);
  });
});

describe('Tablet drehen', () => {
  it('Schiffe und Zielpunkt werden umgerechnet und bleiben im Feld', () => {
    const s = new InvadersSession(base({ durationS: 100, spawnMs: 800, fallCmS: 3 }), env(2));
    run(s, 4, () => ({ mode: 'position', x: 0.9 }));
    s.setField(20, 30);
    expect(s.W).toBe(20);
    expect(s.H).toBe(30);
    expect(s.x).toBeLessThanOrEqual(20 - s.shipR + 1e-9);
    for (const v of s.invaders) {
      expect(v.x).toBeGreaterThanOrEqual(s.shipR - 1e-9);
      expect(v.x).toBeLessThanOrEqual(20 - s.shipR + 1e-9);
    }
    s.update(5000, null);
    expect(Number.isFinite(s.x)).toBe(true);
  });
});

describe('Autopilot (Film und Autoplay)', () => {
  it('trifft mit Zeiger- und Achsen-Eingabe fast alle Schiffe', () => {
    for (const mode of ['position', 'axis'] as const) {
      const s = new InvadersSession(base({ durationS: 40, fallCmS: 8, spawnMs: 2200 }), env(8));
      run(s, 40, (q) => autopilotInput(q, autopilotTarget(q, new Set()), mode));
      const sum = s.summary();
      expect(sum.total, mode).toBeGreaterThan(8);
      expect(sum.accuracy, mode).toBeGreaterThanOrEqual(85);
    }
  });

  it('lässt markierte Schiffe durch', () => {
    const s = new InvadersSession(base({ durationS: 40, fallCmS: 8, spawnMs: 4000 }), env(8));
    run(s, 40, (q) => autopilotInput(q, autopilotTarget(q, new Set([2, 4])), 'position'));
    expect(s.trials.filter((t) => t.outcome === 'missed').length).toBeGreaterThanOrEqual(2);
    expect(s.destroyed).toBeGreaterThanOrEqual(3);
  });

  it('wählt das tiefste Schiff, ohne Schiff die Feldmitte', () => {
    const s = new InvadersSession(base(), env(1));
    expect(autopilotTarget(s, new Set())).toBe(15);
    s.invaders.push({ id: 1, x: 5, y: 3, lock: 0, spawnedAt: 0 }, { id: 2, x: 22, y: 9, lock: 0, spawnedAt: 0 });
    expect(autopilotTarget(s, new Set())).toBe(22);
    expect(autopilotTarget(s, new Set([2]))).toBe(5);
  });
});

describe('Tipp und Punkte', () => {
  it('Tipp-Schlüssel nach Faustregeln', () => {
    const mk = (o: Partial<ReturnType<InvadersSession['summary']>>) => ({ destroyed: 15, missed: 5, total: 20, accuracy: 75, tMean: 2500, tMedian: 2400, toleranceCm: 2, trials: [], ...o });
    expect(tipFor(mk({ destroyed: 0 }))).toBe('few');
    expect(tipFor(mk({ accuracy: 50 }))).toBe('easier');
    expect(tipFor(mk({ accuracy: 95, destroyed: 19 }))).toBe('harder');
    expect(tipFor(mk({}))).toBe('compare');
    expect(pointsFor(7)).toBe(70);
  });
});
