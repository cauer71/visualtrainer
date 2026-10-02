/**
 * Spot-Touch (Labor): reine Logik. Übertragen aus labor/test/spots.test.js (Labor-Prototyp) und erweitert:
 * Zeiten in ms, Koordinaten in cm, Zufall über createRng (kein Math.random).
 */
import { describe, expect, it } from 'vitest';
import { defaultParams, sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import {
  DOUBLE_TAP_MS,
  MIN_HIT_PX,
  PARAMS,
  pointsFor,
  SLACK_CM,
  SpotSession,
  spotParams,
  tipFor,
  zoneOk,
  type SpotSummary,
} from '../../src/exercises/labor-spot-touch/logic';

function make(over: Record<string, unknown> = {}, seed = 1, extra: { w?: number; h?: number; minHit?: number } = {}): SpotSession {
  const p = spotParams(sanitizeParams(PARAMS, { ...defaultParams(PARAMS), ...over }));
  return new SpotSession(p, { rng: createRng(seed), fieldWcm: extra.w ?? 60, fieldHcm: extra.h ?? 34, minHitRadiusCm: extra.minHit });
}

describe('Spot-Touch: Ablauf (aus dem Prototyp)', () => {
  it('Spot erscheint nach Start; Treffer misst die Reaktionszeit', () => {
    const s = make();
    s.start(1000);
    s.update(1000);
    expect(s.active.length).toBe(1);
    const sp = s.active[0];
    const res = s.tap(sp.x, sp.y, 1420);
    expect(res).toMatchObject({ type: 'hit', rt: 420 });
    expect(s.active.length).toBe(0);
    expect(s.trials[0]).toMatchObject({ hit: true, rtMs: 420 });
  });

  it('nach einem Treffer kommt der nächste Spot erst nach der Pause', () => {
    const s = make({ gapMs: 500 });
    s.start(0);
    s.update(0);
    const sp = s.active[0];
    s.tap(sp.x, sp.y, 300);
    s.update(600);
    expect(s.active.length, 'bei 600 ms noch Pause (bis 800 ms)').toBe(0);
    s.update(800);
    expect(s.active.length).toBe(1);
  });

  it('daneben tippen zählt als Fehltipp, der Spot bleibt', () => {
    const s = make();
    s.start(0);
    s.update(0);
    const sp = s.active[0];
    const farX = sp.x < 30 ? sp.x + 20 : sp.x - 20;
    expect(s.tap(farX, sp.y, 200)).toEqual({ type: 'stray' });
    expect(s.strayTaps).toBe(1);
    expect(s.active.length).toBe(1);
  });

  it('Toleranz: knapp neben dem Rand zählt noch, deutlich daneben nicht', () => {
    const s = make({ diameterCm: 4 });
    s.start(0);
    s.update(0);
    const sp = s.active[0];
    expect(s.tap(sp.x + 2.2, sp.y, 100)?.type, '0,2 cm neben dem Rand, innerhalb der Toleranz').toBe('hit');
    s.update(1000);
    const sp2 = s.active[0];
    expect(s.tap(sp2.x + 2.6, sp2.y, 1100)?.type, '0,6 cm neben dem Rand').toBe('stray');
  });

  it('Ablauf der Sichtbarkeit zählt als verpasst, die Pause beginnt ab Ablaufzeit', () => {
    const s = make({ persistenceS: 1, gapMs: 200 });
    s.start(0);
    s.update(0);
    s.update(1000);
    expect(s.trials.length).toBe(1);
    expect(s.trials[0].hit).toBe(false);
    expect(s.trials[0].rtMs).toBeNull();
    expect(s.active.length).toBe(0);
    s.update(1199);
    expect(s.active.length).toBe(0);
    s.update(1200);
    expect(s.active.length).toBe(1);
  });

  it('Zone Peripherie: alle Spots liegen im Außenbereich', () => {
    const s = make({ zone: 'periphery', gapMs: 0 }, 5);
    s.start(0);
    for (let i = 0; i < 150; i++) {
      s.update(i * 10);
      for (const sp of s.active) {
        const u = (sp.x - 30) / 30;
        const v = (sp.y - 17) / 17;
        expect(Math.sqrt(u * u + v * v)).toBeGreaterThanOrEqual(0.6 - 1e-9);
      }
    }
  });

  it('Zone Zentrum und Kreuz: Spot hält Abstand zur Mitte und bleibt innen', () => {
    const s = make({ zone: 'center', fixation: 'yes', gapMs: 0, diameterCm: 3 }, 9);
    s.start(0);
    for (let i = 0; i < 100; i++) {
      s.update(i * 10);
      for (const sp of s.active) {
        expect(Math.hypot(sp.x - 30, sp.y - 17)).toBeGreaterThanOrEqual(1.5 + 1.2 - 1e-9);
        expect(Math.sqrt(((sp.x - 30) / 30) ** 2 + ((sp.y - 17) / 17) ** 2)).toBeLessThanOrEqual(0.45 + 1e-9);
      }
    }
  });

  it('mehrere gleichzeitige Spots überlappen nicht und halten die Zahl', () => {
    const s = make({ simultaneous: 4, diameterCm: 5 }, 3);
    s.start(0);
    s.update(0);
    expect(s.active.length).toBe(4);
    for (let i = 0; i < s.active.length; i++) {
      for (let j = i + 1; j < s.active.length; j++) {
        expect(Math.hypot(s.active[i].x - s.active[j].x, s.active[i].y - s.active[j].y)).toBeGreaterThanOrEqual(2 * 2.5 + 0.5 - 1e-9);
      }
    }
  });

  it('Spots liegen vollständig im Feld', () => {
    const s = make({ diameterCm: 8, gapMs: 0 }, 11);
    s.start(0);
    for (let i = 0; i < 200; i++) {
      s.update(i * 5);
      for (const sp of s.active) {
        expect(sp.x).toBeGreaterThanOrEqual(4 - 1e-9);
        expect(sp.x).toBeLessThanOrEqual(56 + 1e-9);
        expect(sp.y).toBeGreaterThanOrEqual(4 - 1e-9);
        expect(sp.y).toBeLessThanOrEqual(30 + 1e-9);
      }
    }
  });

  it('Ende nach Dauer; danach keine Eingaben mehr; Kennzahlen stimmen', () => {
    const s = make({ durationS: 10, persistenceS: 2, gapMs: 0 });
    s.start(0);
    s.update(0);
    let a = s.active[0];
    s.tap(a.x, a.y, 400); // Treffer, rt 400
    s.update(400);
    a = s.active[0];
    s.tap(a.x, a.y, 1000); // Treffer, rt 600
    s.update(1000); // neuer Spot
    s.update(3000); // läuft ab → verpasst; neuer Spot
    s.tap(0, 0, 3100); // Fehltipp (weit weg vom Spot)
    s.update(10000);
    expect(s.finished).toBe(true);
    expect(s.tap(1, 1, 10050)).toBeNull();
    const sum = s.summary();
    expect(sum.hits).toBe(2);
    expect(sum.misses).toBe(1);
    expect(sum.stray).toBe(1);
    expect(sum.accuracy).toBe(66.7);
    expect(sum.rtMean).toBe(500);
    expect(sum.rtMedian).toBe(500);
    expect(sum.rate).toBe(12);
    expect(sum.trials.length).toBe(3);
  });

  it('ohne Ereignisse: Kennzahlen sind null statt NaN', () => {
    const s = make({ durationS: 10 });
    s.start(0);
    s.update(10000);
    const sum = s.summary();
    expect(sum.hits).toBe(0);
    expect(sum.accuracy).toBeNull();
    expect(sum.rtMean).toBeNull();
    expect(sum.rtMedian).toBeNull();
    expect(sum.rtSd).toBeNull();
    for (const v of [sum.hits, sum.misses, sum.stray, sum.rate ?? 0]) expect(Number.isFinite(v)).toBe(true);
  });

  it('gleicher Startwert macht den Ablauf reproduzierbar', () => {
    function seq(seed: number): string {
      const s = make({ gapMs: 0, persistenceS: 0.5 }, seed);
      s.start(0);
      const out: string[] = [];
      for (let i = 0; i < 20; i++) {
        s.update(i * 600);
        for (const a of s.active) out.push(`${a.x.toFixed(3)},${a.y.toFixed(3)}`);
      }
      return out.join('|');
    }
    expect(seq(21)).toBe(seq(21));
    expect(seq(21)).not.toBe(seq(22));
  });

  it('Einstellungen werden bereinigt (Zahlen geklemmt, Auswahl nur erlaubt)', () => {
    const p = spotParams(sanitizeParams(PARAMS, { durationS: 99999, diameterCm: -3, zone: 'quatsch' }));
    expect(p.durationS).toBe(600);
    expect(p.diameterCm).toBe(1);
    expect(p.zone).toBe('all');
    expect(p.persistenceS).toBe(1.5);
    expect(p.simultaneous).toBe(1);
  });
});

describe('Spot-Touch: Ergänzungen gegenüber dem Prototyp', () => {
  it('Standardwerte entsprechen dem Prototyp', () => {
    expect(spotParams(defaultParams(PARAMS))).toEqual({
      durationS: 60,
      diameterCm: 5,
      persistenceS: 1.5,
      simultaneous: 1,
      gapMs: 300,
      zone: 'all',
      fixation: 'no',
      sound: 'no',
    });
  });

  it('Ton ist neutral, alles andere zählt für die Vergleichbarkeit', () => {
    expect(PARAMS.filter((d) => d.neutral).map((d) => d.key)).toEqual(['sound']);
  });

  it('ein Spot kann erst getroffen werden, wenn er gezeigt wurde (Tipp-Zeit vor Erscheinen = Fehltipp)', () => {
    const s = make();
    s.start(1000);
    s.update(1000);
    const sp = s.active[0];
    expect(s.tap(sp.x, sp.y, 990)?.type).toBe('stray');
    expect(s.active.length).toBe(1);
    expect(s.tap(sp.x, sp.y, 1000)?.type).toBe('hit');
  });

  it('Doppeltipp: zweiter Tipp auf dieselbe Stelle direkt nach dem Treffer wird ignoriert, später zählt er', () => {
    const s = make({ gapMs: 0, persistenceS: 5 });
    s.start(0);
    s.update(0);
    const sp = s.active[0];
    expect(s.tap(sp.x, sp.y, 400)?.type).toBe('hit');
    s.update(400); // nächster Spot an anderer Stelle
    expect(s.tap(sp.x, sp.y, 400 + DOUBLE_TAP_MS - 1)).toEqual({ type: 'ignored' });
    expect(s.strayTaps).toBe(0);
    expect(s.taps).toBe(1);
    const far = s.active[0];
    // weit weg vom alten Spot und nicht auf dem neuen: Fehltipp zählt wieder
    const farX = far.x < 30 ? far.x + 20 : far.x - 20;
    expect(s.tap(farX, far.y, 400 + DOUBLE_TAP_MS + 1)?.type).toBe('stray');
  });

  it('Trefferradius: Radius + 0,3 cm, mindestens 24 px (Touch-Ziel)', () => {
    const small = make({ diameterCm: 1 }, 1, { minHit: MIN_HIT_PX / 38 });
    expect(small.hitRadius).toBeCloseTo(Math.max(0.5 + SLACK_CM, 24 / 38), 9);
    const dense = make({ diameterCm: 1 }, 1, { minHit: MIN_HIT_PX / 160 });
    expect(dense.hitRadius).toBeCloseTo(0.5 + SLACK_CM, 9);
    // wirkt auch beim Tippen: 0,6 cm neben der Mitte eines 1-cm-Spots, bei 38 px/cm
    small.start(0);
    small.update(0);
    const sp = small.active[0];
    expect(small.tap(sp.x + 0.62, sp.y, 100)?.type).toBe('hit');
  });

  it('bei mehreren Spots trifft der Tipp den berührten, die anderen bleiben sichtbar', () => {
    const s = make({ simultaneous: 3, diameterCm: 5 }, 4);
    s.start(0);
    s.update(0);
    const [a, b, c] = s.active;
    const r = s.tap(b.x + 0.1, b.y - 0.1, 250);
    expect(r?.type).toBe('hit');
    if (r?.type === 'hit') expect(r.spot.id).toBe(b.id);
    expect(s.active.map((x) => x.id)).toEqual([a.id, c.id]);
  });

  it('Feld ändert sich (Tablet gedreht): sichtbare Spots werden ins neue Feld geschoben, Größe folgt', () => {
    const s = make({ diameterCm: 6, persistenceS: 10 }, 7, { w: 60, h: 34 });
    s.start(0);
    s.update(0);
    s.setField(20, 30, 4);
    expect(s.r).toBe(2);
    for (const sp of s.active) {
      expect(sp.x).toBeGreaterThanOrEqual(2 - 1e-9);
      expect(sp.x).toBeLessThanOrEqual(18 + 1e-9);
      expect(sp.y).toBeGreaterThanOrEqual(2 - 1e-9);
      expect(sp.y).toBeLessThanOrEqual(28 + 1e-9);
    }
  });

  it('Feld kleiner als der Spot: Spot sitzt in der Mitte, es gibt keinen Absturz', () => {
    const s = make({ diameterCm: 15 }, 1, { w: 10, h: 8 });
    s.start(0);
    s.update(0);
    expect(s.active.length).toBe(1);
    expect(s.active[0].x).toBeCloseTo(5, 9);
    expect(s.active[0].y).toBeCloseTo(4, 9);
  });

  it('Streuung gibt es erst ab zwei Treffern; Median bei gerader Zahl = Mitte der beiden mittleren', () => {
    const s = make({ durationS: 10, persistenceS: 3, gapMs: 0 });
    s.start(0);
    s.update(0);
    let a = s.active[0];
    s.tap(a.x, a.y, 300);
    expect(s.summary().rtSd).toBeNull();
    s.update(300);
    a = s.active[0];
    s.tap(a.x, a.y, 300 + 700);
    s.update(10000);
    const sum = s.summary();
    expect(sum.rtMedian).toBe(500);
    expect(sum.rtSd).toBe(283); // Stichproben-Streuung von 300 und 700
  });

  it('Fortschritt und Restzeit', () => {
    const s = make({ durationS: 20 });
    expect(s.remainingS(0)).toBe(20);
    s.start(500);
    expect(s.elapsedFrac(500)).toBe(0);
    expect(s.elapsedFrac(10500)).toBeCloseTo(0.5, 9);
    expect(s.remainingS(10500)).toBeCloseTo(10, 9);
    expect(s.elapsedFrac(99999)).toBe(1);
  });

  it('Zonenfunktion: Mitte, Rand und dazwischen', () => {
    expect(zoneOk('center', 30, 17, 60, 34)).toBe(true);
    expect(zoneOk('center', 59, 17, 60, 34)).toBe(false);
    expect(zoneOk('periphery', 30, 17, 60, 34)).toBe(false);
    expect(zoneOk('periphery', 58, 17, 60, 34)).toBe(true);
    expect(zoneOk('all', 0, 0, 60, 34)).toBe(true);
    // zwischen 45 % und 60 % des Radius: weder Zentrum noch Peripherie
    expect(zoneOk('center', 30 + 0.5 * 30, 17, 60, 34)).toBe(false);
    expect(zoneOk('periphery', 30 + 0.5 * 30, 17, 60, 34)).toBe(false);
  });

  it('Punkte: 10 je Treffer', () => {
    expect(pointsFor(0)).toBe(0);
    expect(pointsFor(7)).toBe(70);
    expect(pointsFor(-3)).toBe(0);
  });
});

describe('Spot-Touch: persönlicher Tipp', () => {
  const base: SpotSummary = { hits: 20, misses: 2, stray: 0, accuracy: 90.9, rtMean: 500, rtMedian: 480, rtSd: 80, rate: 20, trials: [] };
  it('keine Treffer → few', () => expect(tipFor({ ...base, hits: 0, accuracy: 0, rtMean: null, rtSd: null })).toBe('few'));
  it('viele Fehltipps → stray', () => expect(tipFor({ ...base, stray: 8 })).toBe('stray'));
  it('viele verpasste → misses', () => expect(tipFor({ ...base, hits: 5, misses: 8, accuracy: 38 })).toBe('misses'));
  it('sehr sicher → harder', () => expect(tipFor({ ...base, misses: 1, accuracy: 95 })).toBe('harder'));
  it('stark schwankende Zeiten → steady', () => expect(tipFor({ ...base, accuracy: 80, rtSd: 300 })).toBe('steady'));
  it('sonst → compare', () => expect(tipFor({ ...base, accuracy: 80 })).toBe('compare'));
});
