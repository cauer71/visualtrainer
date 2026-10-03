/**
 * Balance-Touch (Labor): reine Logik – Zähler der Hilfsperson auf der Spot-Touch-Logik, Doppeltipp-Schutz, Auswertung,
 * Einstellungen, Begrenzung der Punktgröße.
 */
import { describe, expect, it } from 'vitest';
import { defaultParams, sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import { SpotSession } from '../../src/exercises/labor-spot-touch/logic';
import {
  balanceParams,
  BalanceSession,
  DOUBLE_LOSS_MS,
  limitDiameter,
  MAX_SPOT_FRACTION,
  PARAMS,
  pointsFor,
  tipFor,
  type BalanceParams,
} from '../../src/exercises/labor-balance-touch/logic';

const base = (o: Partial<BalanceParams> = {}): BalanceParams => ({ ...balanceParams(defaultParams(PARAMS)), ...o });
const env = (seed = 3) => ({ rng: createRng(seed), fieldWcm: 30, fieldHcm: 20, minHitRadiusCm: 0.6 });

describe('Einstellungen', () => {
  it('Standardwerte und Auswahl wie vorgesehen; alle gehören zum Vergleichsschlüssel (kein Ton)', () => {
    expect(balanceParams(defaultParams(PARAMS))).toEqual({ stance: 'both', durationS: 60, diameterCm: 6, persistenceS: 2, gapMs: 500, zone: 'all', fixation: 'yes' });
    expect(PARAMS.filter((p) => p.neutral)).toEqual([]);
    expect(PARAMS.filter((p) => p.summary).map((p) => p.key)).toEqual(['stance', 'diameterCm']);
    const stance = PARAMS.find((p) => p.key === 'stance')!;
    expect(stance.type === 'select' && stance.options).toEqual(['both', 'platform', 'single', 'tandem']);
  });

  it('bereinigt kaputte Werte', () => {
    const p = balanceParams(sanitizeParams(PARAMS, { stance: 'kopfstand', durationS: 5, diameterCm: 99, zone: 'x', fixation: 'vielleicht', gapMs: -5 }));
    expect(p).toMatchObject({ stance: 'both', durationS: 20, diameterCm: 15, zone: 'all', fixation: 'yes', gapMs: 0 });
    expect(balanceParams({}).durationS).toBe(60);
  });

  it('Punktgröße: höchstens 40 % der kürzeren Feldseite, nie unter 0,5 cm', () => {
    expect(limitDiameter(6, 30, 20)).toBe(6);
    expect(limitDiameter(15, 30, 20)).toBeCloseTo(MAX_SPOT_FRACTION * 20, 9);
    expect(limitDiameter(15, 8, 10)).toBeCloseTo(3.2, 9);
    expect(limitDiameter(2, 0.5, 0.5)).toBe(0.5);
  });
});

describe('Hilfsperson: Gleichgewicht verloren', () => {
  it('zählt Verluste mit Zeitpunkt seit Beginn; vor dem Start und nach dem Ende ohne Wirkung', () => {
    const s = new BalanceSession(base({ durationS: 20 }), env());
    expect(s.loss(100)).toBeNull(); // noch nicht gestartet
    s.start(1000);
    expect(s.loss(3500)).toEqual({ type: 'loss', n: 1 });
    expect(s.loss(3500 + DOUBLE_LOSS_MS)).toEqual({ type: 'loss', n: 2 });
    expect(s.losses).toEqual([2500, 3000]); // Zeitpunkte in ms seit Beginn
    expect(s.loss(1000 + 20000)).toBeNull(); // Zeit vorbei
    s.update(1000 + 20000);
    expect(s.finished).toBe(true);
    expect(s.loss(1000 + 20500)).toBeNull();
    expect(s.summary().losses).toBe(2);
  });

  it('Doppeltipp binnen 500 ms zählt nicht doppelt', () => {
    const s = new BalanceSession(base(), env());
    s.start(0);
    expect(s.loss(5000)?.type).toBe('loss');
    expect(s.loss(5000 + DOUBLE_LOSS_MS - 1)?.type).toBe('ignored');
    expect(s.loss(5000 + DOUBLE_LOSS_MS)?.type).toBe('loss');
    expect(s.losses).toHaveLength(2);
  });

  it('Verluste pro Minute: nur nach Ende der Sitzung, aus der Dauer', () => {
    const s = new BalanceSession(base({ durationS: 30 }), env());
    s.start(0);
    expect(s.summary().lossesPerMin).toBeNull();
    s.loss(5000);
    s.loss(9000);
    s.loss(15000);
    s.update(30000);
    const sum = s.summary();
    expect(sum.losses).toBe(3);
    expect(sum.lossesPerMin).toBe(6); // 3 in 0,5 min
    expect(sum.lossTimes).toEqual([5000, 9000, 15000]);
  });
});

describe('Punkte: dieselbe Logik wie Spot-Touch', () => {
  it('benutzt SpotSession aus Spot-Touch (nicht kopiert) und gibt Treffer, verpasste und Fehltipps weiter', () => {
    const s = new BalanceSession(base({ persistenceS: 1, gapMs: 100, zone: 'all', fixation: 'no' }), env(4));
    expect(s.spots).toBeInstanceOf(SpotSession);
    expect(s.spots.p.simultaneous).toBe(1);
    s.start(0);
    s.update(0);
    const sp = s.spots.active[0];
    expect(sp).toBeTruthy();
    expect(s.tap(sp.x, sp.y, 400)?.type).toBe('hit');
    expect(s.tap(0, 0, 3000)?.type).toBe('stray');
    s.update(500); // Pause
    s.update(1600);
    const sum = s.summary();
    expect(sum.hits).toBe(1);
    expect(sum.stray).toBe(1);
    expect(sum.shown).toBe(sum.hits + sum.misses);
    expect(sum.rtMean).toBe(400);
  });

  it('Feldwechsel (Tablet drehen) und neue Größe laufen durch', () => {
    const s = new BalanceSession(base(), env());
    s.start(0);
    s.update(0);
    s.setField(18, 30, 3);
    expect(s.spots.r).toBe(1.5);
    for (const sp of s.spots.active) {
      expect(sp.x).toBeLessThanOrEqual(18);
      expect(sp.y).toBeLessThanOrEqual(30);
    }
  });
});

describe('Tipp und Punkte', () => {
  it('Tipp-Schlüssel nach Faustregeln', () => {
    const mk = (o: Partial<ReturnType<BalanceSession['summary']>>) => ({
      hits: 12,
      misses: 2,
      stray: 0,
      accuracy: 85,
      rtMean: 800,
      rtMedian: 780,
      rtSd: 120,
      rate: 12,
      trials: [],
      losses: 0,
      lossesPerMin: 0,
      shown: 14,
      lossTimes: [],
      ...o,
    });
    expect(tipFor(mk({ hits: 0 }))).toBe('few');
    expect(tipFor(mk({ losses: 3 }))).toBe('losses');
    expect(tipFor(mk({ stray: 5 }))).toBe('stray');
    expect(tipFor(mk({ accuracy: 60, shown: 20 }))).toBe('misses');
    expect(tipFor(mk({ accuracy: 95 }))).toBe('harder');
    expect(tipFor(mk({ accuracy: 95, losses: 1 }))).toBe('compare');
    expect(pointsFor(9)).toBe(90);
  });
});
