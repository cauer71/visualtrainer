/**
 * Doppelaufgabe (Labor): reine Logik. Übertragen aus labor/test/dual.test.js (Labor-Prototyp) und erweitert:
 * Abstand der Randpunkte zum Berührkreis, Bilanz „erkannt + verpasst = gezeigt“, Feldänderung, Einstellungen.
 * Zeiten in ms, Koordinaten in cm, Zufall über createRng (keine festen Zufallswerte).
 */
import { describe, expect, it } from 'vitest';
import { defaultParams, sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import {
  CENTRAL_GAP_CM,
  CENTRAL_R_CM,
  centralRadius,
  CentralStream,
  DualSession,
  dualParams,
  maxSpotCm,
  MIN_INTERVAL_MS,
  PARAMS,
  pointsFor,
  primaryOf,
  tipFor,
  type DualSummary,
} from '../../src/exercises/labor-doppelaufgabe/logic';
import { de, it as itTexts } from '../../src/exercises/labor-doppelaufgabe/texts';

function make(over: Record<string, unknown> = {}, seed = 1, env: { w?: number; h?: number; minHit?: number; plan?: (n: number) => boolean } = {}): DualSession {
  const p = dualParams(sanitizeParams(PARAMS, { ...defaultParams(PARAMS), ...over }));
  return new DualSession(p, { rng: createRng(seed), fieldWcm: env.w ?? 60, fieldHcm: env.h ?? 34, minHitRadiusCm: env.minHit, plan: env.plan });
}

function stream(over: Partial<{ intervalMs: number; targetDigit: number; targetRate: number }> = {}, seed = 1, plan?: (n: number) => boolean): CentralStream {
  return new CentralStream({ intervalMs: 1000, targetDigit: 7, targetRate: 100, ...over }, createRng(seed), plan);
}

describe('Zahlenfolge in der Mitte (aus dem Prototyp)', () => {
  it('bei 100 % immer Zielzahl, bei 0 % nie; nie dieselbe Zahl zweimal hintereinander', () => {
    const a = stream({ targetRate: 100 });
    a.start(0);
    for (let i = 0; i < 10; i++) {
      a.update(1000 * (i + 1));
      expect(a.symbol).toBe('7');
      expect(a.isTarget).toBe(true);
    }
    const b = stream({ targetRate: 0 });
    b.start(0);
    let prev = b.symbol;
    for (let i = 0; i < 80; i++) {
      b.update(1000 * (i + 1));
      expect(b.symbol).not.toBe('7');
      expect(b.symbol).not.toBe(prev);
      expect(b.symbol).toMatch(/^[1-9]$/);
      prev = b.symbol;
    }
  });

  it('Treffer, verpasst, falscher Alarm', () => {
    const s = stream({ targetRate: 100 });
    s.start(0);
    expect(s.respond(420)).toEqual({ type: 'hit', rt: 420 });
    expect(s.rts).toEqual([420]);
    expect(s.respond(500)).toEqual({ type: 'false_alarm' }); // zweite Berührung derselben Zielzahl
    s.update(1000); // nächste Zielzahl, die erste war beantwortet
    expect(s.misses).toBe(0);
    s.update(2000); // zweite Zielzahl unbeantwortet
    expect(s.misses).toBe(1);
    const n = stream({ targetRate: 0 });
    n.start(0);
    expect(n.respond(100)).toEqual({ type: 'false_alarm' });
    expect(n.falseAlarms).toBe(1);
  });

  it('eine Berührung nach dem Wechsel gehört zur neuen Zahl (Ereigniszeit zählt)', () => {
    const s = stream({ targetRate: 0 }, 3, (n) => n === 1);
    s.start(0);
    // die Zielzahl erscheint bei 1000; eine Berührung bei 1300 ist ein Treffer mit Reaktionszeit 300
    expect(s.respond(1300)).toEqual({ type: 'hit', rt: 300 });
    // eine Berührung kurz vor dem Wechsel bei 2000 trifft noch die Zielzahl (schon beantwortet) → falscher Alarm
    expect(s.respond(1999)).toEqual({ type: 'false_alarm' });
  });

  it('fester Ablauf (Film): Zielzahlen genau an den vorgegebenen Stellen', () => {
    const s = stream({ intervalMs: 500 }, 5, (n) => n === 2 || n === 5);
    s.start(0);
    const seq: boolean[] = [s.isTarget];
    for (let i = 1; i < 8; i++) {
      s.update(500 * i);
      seq.push(s.isTarget);
    }
    expect(seq).toEqual([false, false, true, false, false, true, false, false]);
    expect(s.targets).toBe(2);
  });

  it('Bilanz: erkannt + verpasst = gezeigt, auch beim Ende mitten in einer Zielzahl', () => {
    for (let seed = 1; seed <= 20; seed++) {
      const rng = createRng(seed + 100);
      const s = stream({ intervalMs: 500, targetRate: 35 }, seed);
      s.start(0);
      let t = 0;
      while (t < 20000) {
        t += rng.range(30, 400);
        if (rng.chance(0.4)) s.respond(t);
        else s.update(t);
      }
      s.close(t);
      expect(s.hits + s.misses, `seed ${seed}`).toBe(s.targets);
      expect(s.rts.length).toBe(s.hits);
    }
  });

  it('nach dem Schließen ändert sich nichts mehr', () => {
    const s = stream({ targetRate: 100 });
    s.start(0);
    s.close(2500);
    const snapshot = JSON.stringify([s.hits, s.misses, s.targets, s.falseAlarms]);
    expect(s.respond(3000)).toBeNull();
    s.update(9000);
    expect(JSON.stringify([s.hits, s.misses, s.targets, s.falseAlarms])).toBe(snapshot);
  });
});

describe('Doppelaufgabe: Modi', () => {
  it('„Nur Mitte“: keine Randpunkte, Berührung außerhalb wird ignoriert', () => {
    const s = make({ mode: 'central' });
    expect(s.spots).toBeNull();
    s.start(0);
    expect(s.tap(2, 2, 100)).toBeNull();
    expect(s.tap(30, 17, 100)).not.toBeNull();
  });

  it('„Nur Rand“: keine Zahlenfolge, Mitte wird ignoriert, Punkt wird getroffen', () => {
    const s = make({ mode: 'periphery', gapMs: 0 });
    expect(s.central).toBeNull();
    s.start(0);
    s.update(0);
    expect(s.tap(30, 17, 100)).toBeNull();
    const sp = s.spots!.active[0];
    expect(sp).toBeTruthy();
    expect(s.tap(sp.x, sp.y, 400)).toMatchObject({ type: 'hit' });
  });

  it('Randpunkte liegen in der Peripherie und halten Abstand zur Mitte und zum Berührkreis', () => {
    const s = make({ mode: 'periphery', gapMs: 0, persistenceS: 0.4, spotCm: 5 }, 3);
    s.start(0);
    let seen = 0;
    for (let t = 0; t < 20000; t += 100) {
      s.update(t);
      for (const sp of s.spots!.active) {
        seen++;
        const u = (sp.x - 30) / 30;
        const v = (sp.y - 17) / 17;
        expect(Math.sqrt(u * u + v * v)).toBeGreaterThanOrEqual(0.6 - 1e-9);
        expect(Math.hypot(sp.x - 30, sp.y - 17)).toBeGreaterThanOrEqual(s.spots!.r + s.centralR + CENTRAL_GAP_CM - 1e-9);
      }
    }
    expect(seen).toBeGreaterThan(20);
  });

  it('auf einem Handy-Feld (10 × 22 cm) bleibt Platz neben dem Kreis: Punkte erscheinen und liegen frei', () => {
    const s = make({ mode: 'periphery', gapMs: 0, persistenceS: 0.4, spotCm: 12 }, 4, { w: 10, h: 22 });
    // Größe wird begrenzt
    expect(s.spots!.r * 2).toBeLessThanOrEqual(maxSpotCm(10, 22) + 1e-9);
    s.start(0);
    let seen = 0;
    for (let t = 0; t < 20000; t += 100) {
      s.update(t);
      for (const sp of s.spots!.active) {
        seen++;
        expect(Math.hypot(sp.x - 5, sp.y - 11)).toBeGreaterThanOrEqual(s.spots!.r + s.centralR + CENTRAL_GAP_CM - 1e-9);
        expect(sp.x - s.spots!.r).toBeGreaterThanOrEqual(-1e-9);
        expect(sp.x + s.spots!.r).toBeLessThanOrEqual(10 + 1e-9);
      }
    }
    expect(seen).toBeGreaterThan(10);
  });

  it('beide Aufgaben laufen, Ende nach der Dauer, danach keine Berührung mehr', () => {
    const s = make({ mode: 'dual', durationS: 20, targetRate: 50 }, 5);
    s.start(0);
    s.update(0);
    expect(s.central && s.spots).toBeTruthy();
    const sp = s.spots!.active[0];
    expect(s.tap(sp.x, sp.y, 500)).toMatchObject({ type: 'hit' });
    s.update(19999);
    expect(s.finished).toBe(false);
    s.update(20000);
    expect(s.finished).toBe(true);
    expect(s.tap(30, 17, 20001)).toBeNull();
    const sum = s.summary();
    expect(sum.central).not.toBeNull();
    expect(sum.spots).not.toBeNull();
    expect(sum.spots!.hits).toBe(1);
    expect(sum.hitsTotal).toBe(sum.central!.hits + 1);
  });

  it('Berührung der Mitte bei Zielzahl wird als Treffer gewertet', () => {
    const s = make({ mode: 'central', targetRate: 50 }, 2);
    s.start(0);
    let t = 0;
    while (!s.central!.isTarget && t < 100000) {
      t += 900;
      s.update(t);
    }
    expect(s.central!.isTarget).toBe(true);
    expect(s.tap(30, 17, t + 200)).toMatchObject({ type: 'hit' });
    expect(s.central!.hits).toBe(1);
  });

  it('Treffer und Fehlalarm durch den Berührkreis: Radius und Rand', () => {
    const s = make({ mode: 'central' });
    s.start(0);
    expect(s.inCenter(30 + CENTRAL_R_CM - 0.01, 17)).toBe(true);
    expect(s.inCenter(30 + CENTRAL_R_CM + 0.01, 17)).toBe(false);
  });

  it('Bilanz bei vollem Lauf mit zufälligen Berührungen: erkannt + verpasst = gezeigt', () => {
    for (const seed of [1, 2, 3, 4]) {
      const rng = createRng(seed * 31);
      const s = make({ mode: 'dual', durationS: 20, intervalMs: 500, targetRate: 30 }, seed);
      s.start(0);
      for (let t = 0; t <= 21000; t += 40) {
        s.update(t);
        if (rng.chance(0.08)) {
          const near = rng.chance(0.5);
          s.tap(near ? 30 + rng.range(-1, 1) : rng.range(0, 60), near ? 17 + rng.range(-1, 1) : rng.range(0, 34), t);
        }
      }
      const sum = s.summary();
      expect(sum.central!.hits + sum.central!.misses, `seed ${seed}`).toBe(sum.central!.targets);
      expect(sum.spots!.hits + sum.spots!.misses).toBeGreaterThan(0);
    }
  });

  it('Feld ändern (Tablet gedreht): Kreis und Randpunkte passen sich an', () => {
    const s = make({ mode: 'dual', spotCm: 5 }, 6);
    s.start(0);
    s.update(0);
    const r0 = s.centralR;
    s.setField(10, 22, 5);
    expect(s.fieldW).toBe(10);
    expect(s.centralR).toBeLessThanOrEqual(r0);
    expect(s.spots!.centralR).toBe(s.centralR);
    expect(s.spots!.r * 2).toBeLessThanOrEqual(maxSpotCm(10, 22) + 1e-9);
    for (const sp of s.spots!.active) {
      expect(sp.x).toBeGreaterThanOrEqual(0);
      expect(sp.x).toBeLessThanOrEqual(10);
    }
  });

  it('Zusammenfassung ohne Berührung: keine NaN, Reaktionszeit fehlt statt NaN', () => {
    const s = make({ mode: 'dual', durationS: 20 }, 1);
    s.start(0);
    s.update(20000);
    const sum = s.summary();
    expect(sum.central!.rtMean).toBeNull();
    expect(sum.spots!.rtMean).toBeNull();
    for (const part of [sum.central!, sum.spots!]) for (const [k, v] of Object.entries(part)) if (typeof v === 'number') expect(Number.isFinite(v), k).toBe(true);
    expect(primaryOf(sum)).toEqual({ key: 'c_hits', value: 0 });
  });
});

describe('Doppelaufgabe: Geometrie', () => {
  it('Berührkreis: höchstens 3 cm, auf kleinen Feldern kleiner, nie unter 0,8 cm', () => {
    expect(centralRadius(60, 34)).toBe(3);
    expect(centralRadius(10, 22)).toBeCloseTo(2.8, 6);
    expect(centralRadius(3, 3)).toBeCloseTo(0.84, 9);
    expect(centralRadius(0, 0)).toBe(0.8);
  });

  it('größter Randpunkt lässt neben dem Kreis Platz und ist nie unter 1 cm', () => {
    expect(maxSpotCm(60, 34)).toBeCloseTo(30 - 3 - CENTRAL_GAP_CM, 9);
    expect(maxSpotCm(10, 22)).toBeCloseTo(11 - centralRadius(10, 22) - CENTRAL_GAP_CM, 9);
    expect(maxSpotCm(2, 2)).toBe(1);
  });
});

describe('Doppelaufgabe: Einstellungen', () => {
  it('Standardwerte und Grenzen entsprechen dem Prototyp', () => {
    expect(defaultParams(PARAMS)).toEqual({ mode: 'dual', durationS: 60, intervalMs: 900, targetDigit: 7, targetRate: 20, spotCm: 5, persistenceS: 1.5, gapMs: 400, sound: 'no' });
    expect(PARAMS.find((x) => x.key === 'intervalMs')).toMatchObject({ min: MIN_INTERVAL_MS, max: 2500, step: 50 });
    expect(PARAMS.find((x) => x.key === 'sound')).toMatchObject({ neutral: true });
    expect(sanitizeParams(PARAMS, { intervalMs: 100 }).intervalMs).toBe(MIN_INTERVAL_MS);
    expect(sanitizeParams(PARAMS, { targetDigit: 0 }).targetDigit).toBe(1);
    expect(sanitizeParams(PARAMS, { persistenceS: 1.46 }).persistenceS).toBe(1.5);
  });

  it('jeder Standardwert liegt auf dem Raster min + k · Schritt', () => {
    for (const d of PARAMS) {
      if (d.type !== 'number') continue;
      const k = (d.default - d.min) / d.step;
      expect(Math.abs(k - Math.round(k)), d.key).toBeLessThan(1e-9);
      expect(sanitizeParams(PARAMS, {})[d.key], d.key).toBe(d.default);
    }
  });

  it('Bereinigung: kaputte Werte → Standard; Typ-Lesefunktion', () => {
    const p = sanitizeParams(PARAMS, { mode: 'triple', durationS: 'x', sound: 1 });
    expect(p).toMatchObject({ mode: 'dual', durationS: 60, sound: 'no' });
    expect(dualParams({})).toMatchObject({ mode: 'dual', durationS: 60, intervalMs: 900, targetDigit: 7, targetRate: 20, spotCm: 5, persistenceS: 1.5, gapMs: 400, sound: 'no' });
  });

  it('Zahlenwechsel nie schneller als 2,5 pro Sekunde', () => {
    const p = dualParams(sanitizeParams(PARAMS, { intervalMs: 400 }));
    const s = new CentralStream(p, createRng(2));
    s.start(0);
    const stamps: number[] = [0];
    let last = s.symbol;
    for (let t = 1; t < 10000; t++) {
      s.update(t);
      if (s.symbol !== last || s.shownAt !== stamps[stamps.length - 1]) {
        if (s.shownAt !== stamps[stamps.length - 1]) stamps.push(s.shownAt);
        last = s.symbol;
      }
    }
    for (let i = 1; i < stamps.length; i++) expect(stamps[i] - stamps[i - 1]).toBeGreaterThanOrEqual(400);
  });
});

describe('Doppelaufgabe: Tipps und Punkte', () => {
  const sum = (over: Partial<DualSummary> = {}): DualSummary => ({
    mode: 'dual',
    central: { targets: 10, hits: 7, misses: 3, falseAlarms: 1, rtMean: 640 },
    spots: { hits: 20, misses: 3, stray: 2, rtMean: 700 },
    hitsTotal: 27,
    ...over,
  });

  it('wählt den passenden Tipp (Schlüssel existieren in beiden Sprachen)', () => {
    const cases: Array<[string, string]> = [
      [tipFor(sum({ hitsTotal: 0 })), 'few'],
      [tipFor(sum({ central: { targets: 10, hits: 5, misses: 5, falseAlarms: 6, rtMean: 600 } })), 'falseAlarms'],
      [tipFor(sum({ central: { targets: 10, hits: 5, misses: 5, falseAlarms: 0, rtMean: 600 } })), 'centerMiss'],
      [tipFor(sum({ spots: { hits: 5, misses: 10, stray: 0, rtMean: 800 } })), 'edgeMiss'],
      [tipFor(sum()), 'costs'],
      [tipFor(sum({ mode: 'central', spots: null })), 'compare'],
    ];
    for (const [got, want] of cases) {
      expect(got).toBe(want);
      expect(de.tips[got], got).toBeTruthy();
      expect(itTexts.tips[got], got).toBeTruthy();
    }
  });

  it('Hauptwert: Zielzahlen in der Mitte; im Modus „Nur Rand“ die Punkte', () => {
    expect(primaryOf(sum())).toEqual({ key: 'c_hits', value: 7 });
    expect(primaryOf(sum({ mode: 'periphery', central: null }))).toEqual({ key: 'p_hits', value: 20 });
  });

  it('Punkte: 10 je Treffer, nie negativ', () => {
    expect(pointsFor(0)).toBe(0);
    expect(pointsFor(27)).toBe(270);
    expect(pointsFor(-4)).toBe(0);
  });
});
