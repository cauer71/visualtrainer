/**
 * Diplopie-Karte (Labor): reine Logik – Einstellungen, neun Blickrichtungen, Antworten „Ein Bild“/„Zwei Bilder“, Ausgleich in
 * Prismendioptrien Δ, Auswertung.
 */
import { describe, expect, it } from 'vitest';
import { sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import { cmToPd } from '../../src/exercises/_shared/pruefung-anaglyph';
import { directionKey, DiplopiaSession, diplopiaParams, MARGIN_CM, PARAMS, QUICK_POSITIONS, tipFor } from '../../src/exercises/labor-diplopie/logic';

const P = (over: Record<string, unknown> = {}) => diplopiaParams(sanitizeParams(PARAMS, over));
const make = (over: Record<string, unknown> = {}, env: { w?: number; h?: number; dist?: number; max?: number; seed?: number } = {}) =>
  new DiplopiaSession(P(over), { rng: createRng(env.seed ?? 4), wCm: env.w ?? 60, hCm: env.h ?? 60, distCm: env.dist ?? 50, maxPoints: env.max });

/** Alle Richtungen durchgehen: `doubleAt(id)` entscheidet je Richtung; Versatz (cm) in x und y */
function playAll(s: DiplopiaSession, doubleAt: (id: number) => boolean, dx = 1, dy = 0): void {
  let t = 0;
  while (s.state === 'ask') {
    const cur = s.current()!;
    t += 1000;
    if (doubleAt(cur.id)) {
      s.answerDouble();
      s.place(cur.x + dx, cur.y + dy);
      s.confirm(t);
    } else s.answerSingle(t);
  }
}

describe('Einstellungen', () => {
  it('Standardwerte und Grenzen', () => {
    expect(P()).toMatchObject({ gazeDeg: 15, targetCm: 1, leftLens: 'red', tones: 'redgreen' });
    expect(P({ gazeDeg: 90 }).gazeDeg).toBe(35);
    expect(P({ gazeDeg: 1 }).gazeDeg).toBe(5);
    expect(P({ targetCm: 9 }).targetCm).toBe(2.5);
    expect(P({ targetCm: 0.1 }).targetCm).toBe(0.5);
  });
});

describe('Blickrichtungen', () => {
  it('neun Richtungen in zufälliger Reihenfolge, jede genau einmal; Schnelllauf kürzt', () => {
    const s = make();
    expect(s.total).toBe(9);
    expect([...s.order].sort((a, b) => a - b)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    expect(s.order).not.toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    expect(make({}, { max: QUICK_POSITIONS }).total).toBe(QUICK_POSITIONS);
    expect(make({}, { max: 1 }).total).toBe(1);
    // andere Zufallsfolge → andere Reihenfolge
    expect(make({}, { seed: 99 }).order).not.toEqual(s.order);
  });

  it('Winkel und Orte: Mitte 0°, Randpunkte im eingestellten Winkel, Orte nach Abstand · tan(Winkel), y nach oben', () => {
    const s = make({ gazeDeg: 10 });
    const c = s.points.find((p) => p.ring === 'center')!;
    expect([c.hx, c.vy, c.x, c.y]).toEqual([0, 0, 0, 0]);
    const tr = s.points.find((p) => p.hx > 0 && p.vy > 0)!;
    expect(tr.hx).toBeCloseTo(10, 6);
    expect(tr.x).toBeCloseTo(50 * Math.tan((10 * Math.PI) / 180), 6);
    expect(tr.y).toBeGreaterThan(0);
    expect(s.fit.clamped).toBe(false);
  });

  it('kleines Feld verkleinert den Winkel, alles bleibt im Feld (mit Rand)', () => {
    const s = make({ gazeDeg: 35 }, { w: 16, h: 24 });
    expect(s.fit.clamped).toBe(true);
    expect(s.summary().effDeg).toBeLessThan(35);
    for (const q of s.points) {
      expect(Math.abs(q.x)).toBeLessThanOrEqual(16 / 2 - MARGIN_CM + 1e-6);
      expect(Math.abs(q.y)).toBeLessThanOrEqual(24 / 2 - MARGIN_CM + 1e-6);
    }
    expect(tipFor(s.summary())).toBe('smallScreen');
    expect(tipFor(make().summary())).toBe('calm');
  });

  it('Richtung benennen: Mitte, oben, unten, links, rechts und Ecken', () => {
    expect(directionKey(0, 0)).toEqual({ v: '', h: '' });
    expect(directionKey(0, 15)).toEqual({ v: 'up', h: '' });
    expect(directionKey(-15, -15)).toEqual({ v: 'down', h: 'left' });
    expect(directionKey(15, 0)).toEqual({ v: '', h: 'right' });
    expect(directionKey(0.01, 0.01)).toEqual({ v: '', h: '' });
  });
});

describe('Antworten', () => {
  it('„Ein Bild“ geht sofort zur nächsten Richtung und speichert Versatz 0', () => {
    const s = make();
    s.start(0);
    expect(s.answerSingle(800)).toBe(true);
    expect(s.results[0]).toMatchObject({ double: false, sepHPd: 0, sepVPd: 0, ms: 800 });
    expect(s.state).toBe('ask');
    expect(s.k).toBe(1);
  });

  it('„Zwei Bilder“: Ausgleichen, „Deckungsgleich“ erst nach einer Bewegung; Versatz in Δ über den Abstand (waagerecht + rechts, senkrecht + oben)', () => {
    const s = make({}, { dist: 50 });
    s.start(0);
    const t = s.current()!;
    expect(s.answerDouble()).toBe(true);
    expect(s.state).toBe('align');
    expect(s.marker).toEqual({ x: t.x, y: t.y });
    expect(s.answerSingle(1)).toBe(false);
    expect(s.confirm(1000)).toBe(false);
    s.place(t.x + 1, t.y + 0.5);
    expect(s.moved).toBe(true);
    expect(s.confirm(2000)).toBe(true);
    const r = s.results[0];
    expect(r.double).toBe(true);
    expect(r.sepHPd).toBeCloseTo(cmToPd(1, 50), 1); // 2,0 Δ
    expect(r.sepVPd).toBeCloseTo(cmToPd(0.5, 50), 1); // 1,0 Δ
    expect(r.sepHPd).toBe(2);
    expect(r.sepVPd).toBe(1);
    expect(s.state).toBe('ask');
    // Gegenrichtung: negative Werte
    const t2 = s.current()!;
    s.answerDouble();
    s.place(t2.x - 0.5, t2.y - 1);
    s.confirm(3000);
    expect(s.results[1].sepHPd).toBe(-1);
    expect(s.results[1].sepVPd).toBe(-2);
  });

  it('nach der letzten Richtung kommt die Karte; „Weiter“ beendet; danach nimmt nichts mehr etwas an', () => {
    const s = make({}, { max: 2 });
    s.start(0);
    playAll(s, () => false);
    expect(s.state).toBe('chart');
    expect(s.current()).toBeNull();
    expect(s.answerSingle(1)).toBe(false);
    expect(s.answerDouble()).toBe(false);
    s.place(1, 1);
    expect(s.moved).toBe(false);
    expect(s.finished).toBe(false);
    expect(s.closeChart()).toBe(true);
    expect(s.finished).toBe(true);
    expect(s.closeChart()).toBe(false);
  });
});

describe('Auswertung', () => {
  it('Zählung, Anteil, mittlerer und größter Versatz (Betrag aus waagerecht und senkrecht), Mitte', () => {
    const s = make({}, { dist: 50 });
    s.start(0);
    // Richtungen mit gerader Nummer: zwei Bilder, Versatz 0,5 cm waagerecht und 0,5 cm senkrecht bzw. nur waagerecht
    playAll(s, (id) => id % 2 === 0, 0.5, 0.5);
    const sum = s.summary();
    expect(sum.positions).toBe(9);
    expect(sum.doubleCount).toBe(4);
    expect(sum.doublePct).toBe(44);
    const mag = Math.hypot(cmToPd(0.5, 50), cmToPd(0.5, 50));
    expect(sum.sepMean).toBeCloseTo(mag, 1);
    expect(sum.sepMax).toBeCloseTo(mag, 1);
    // Mitte hat die Nummer 5 → ein Bild
    expect(sum.centerDouble).toBe(0);
    expect(sum.msMean).toBe(1000);
  });

  it('Doppelbilder in der Mitte: 1; Mitte nicht geprüft: null; ohne Doppelbilder kein Versatz', () => {
    const a = make();
    a.start(0);
    playAll(a, (id) => id === 5);
    expect(a.summary().centerDouble).toBe(1);
    const b = make({}, { max: 1, seed: 11 });
    b.start(0);
    playAll(b, () => false);
    const sb = b.summary();
    expect(sb.doubleCount).toBe(0);
    expect(sb.sepMean).toBeNull();
    expect(sb.sepMax).toBeNull();
    expect(sb.doublePct).toBe(0);
    const empty = make().summary();
    expect(empty.positions).toBe(0);
    expect(empty.doublePct).toBeNull();
    expect(empty.msMean).toBeNull();
    expect(empty.centerDouble).toBeNull();
  });

  it('Karte: Ergebnisse tragen Winkel und Orte für die Darstellung', () => {
    const s = make();
    s.start(0);
    playAll(s, (id) => id === 1, 1, -1);
    const r = s.results.find((x) => x.id === 1)!;
    expect(r.hDeg).toBeLessThan(0);
    expect(r.vDeg).toBeGreaterThan(0);
    expect(r.mx - r.tx).toBeCloseTo(1, 9);
    expect(r.my - r.ty).toBeCloseTo(-1, 9);
    const single = s.results.find((x) => x.id === 2)!;
    expect(single.mx).toBe(single.tx);
    expect(single.my).toBe(single.ty);
  });
});
