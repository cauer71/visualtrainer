import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  MAX_LEVEL,
  MIN_LEVEL,
  ORDER_TOLERANCE_MS,
  bounce,
  computeStats,
  countFor,
  hitRadius,
  initialFractions,
  isInOrder,
  levelOf,
  lifeMs,
  mostUrgent,
  pickSpawnPoint,
  pointsFor,
  radiusPx,
  radiusU,
  respawnDelayMs,
  separate,
  span,
  speedFor,
  steer,
  tipFor,
} from '../../src/exercises/schwarm-wechsel/logic';

describe('schwarm-wechsel: Stufenfunktionen', () => {
  it('Anzahl 2–5, nur steigend', () => {
    expect(countFor(MIN_LEVEL)).toBe(2);
    expect(countFor(4)).toBe(2);
    expect(countFor(5)).toBe(3);
    expect(countFor(9)).toBe(4);
    expect(countFor(13)).toBe(5);
    expect(countFor(MAX_LEVEL)).toBe(5);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(countFor(l)).toBeGreaterThanOrEqual(countFor(l - 1));
  });

  it('Tempo steigt, Größe sinkt (nie unter 26 px), Stufen werden begrenzt', () => {
    for (let l = 2; l <= MAX_LEVEL; l++) {
      expect(speedFor(l)).toBeGreaterThan(speedFor(l - 1));
      expect(radiusU(l)).toBeLessThanOrEqual(radiusU(l - 1));
    }
    expect(speedFor(MIN_LEVEL)).toBeCloseTo(6, 5);
    expect(speedFor(MAX_LEVEL)).toBeLessThan(25);
    expect(radiusPx(MAX_LEVEL, 3)).toBe(26);
    expect(radiusPx(1, 8)).toBeGreaterThan(radiusPx(MAX_LEVEL, 8));
    expect(levelOf(-3)).toBe(MIN_LEVEL);
    expect(levelOf(99)).toBe(MAX_LEVEL);
    expect(levelOf(4.9)).toBe(4);
    expect(speedFor(99)).toBe(speedFor(MAX_LEVEL));
  });

  it('Trefferradius ist immer mindestens 24 px (Regel), genau ≥ 32 px', () => {
    expect(hitRadius(10)).toBeGreaterThanOrEqual(32);
    expect(hitRadius(26)).toBeGreaterThanOrEqual(36);
    expect(hitRadius(60)).toBe(70);
  });

  it('Lebensdauer ist immer schaffbar: mehr als Anzahl × Zeit pro Ziel', () => {
    for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) {
      const need = countFor(l) * (1.2 - 0.027 * (l - 1)) * 1000;
      expect(lifeMs(l)).toBeGreaterThan(need);
      expect(lifeMs(l)).toBeGreaterThanOrEqual(3000);
      expect(lifeMs(l)).toBeLessThanOrEqual(8000);
    }
  });

  it('Wartezeit bis zum nächsten Ziel liegt zwischen 280 und 520 ms', () => {
    const rng = createRng(3);
    for (let i = 0; i < 200; i++) {
      const d = respawnDelayMs(rng);
      expect(d).toBeGreaterThanOrEqual(280);
      expect(d).toBeLessThan(520);
    }
  });
});

describe('schwarm-wechsel: Dringlichkeit', () => {
  it('Start-Anteile sind verschieden und liegen zwischen 0,45 und 1', () => {
    const rng = createRng(5);
    for (const n of [2, 3, 4, 5]) {
      const f = initialFractions(n, rng);
      expect(f).toHaveLength(n);
      expect(new Set(f).size).toBe(n);
      expect(Math.min(...f)).toBeCloseTo(0.45, 5);
      expect(Math.max(...f)).toBeCloseTo(1, 5);
    }
    expect(initialFractions(1, rng)).toEqual([1]);
  });

  it('dringendstes Ziel = kleinste Restzeit', () => {
    expect(mostUrgent([3000, 1200, 2500])).toBe(1);
    expect(mostUrgent([500])).toBe(0);
    expect(mostUrgent([])).toBe(-1);
  });

  it('„in Reihenfolge“ mit Toleranz', () => {
    const rem = [1000, 1000 + ORDER_TOLERANCE_MS, 1000 + ORDER_TOLERANCE_MS + 1];
    expect(isInOrder(rem, 0)).toBe(true);
    expect(isInOrder(rem, 1)).toBe(true);
    expect(isInOrder(rem, 2)).toBe(false);
    expect(isInOrder(rem, -1)).toBe(false);
    expect(isInOrder(rem, 7)).toBe(false);
  });
});

describe('schwarm-wechsel: Bewegung', () => {
  it('Wandern bleibt weich: Drehrate begrenzt, Winkel ändert sich pro Schritt nur wenig', () => {
    const rng = createRng(9);
    const w = { x: 0, y: 0, ang: 0, turn: 0 };
    let maxStep = 0;
    for (let i = 0; i < 6000; i++) {
      const before = w.ang;
      steer(w, 1 / 60, rng);
      maxStep = Math.max(maxStep, Math.abs(w.ang - before));
      expect(Math.abs(w.turn)).toBeLessThanOrEqual(1.6);
    }
    expect(maxStep).toBeLessThan(1.6 / 60 + 1e-9);
  });

  it('Streuung der Drehrate ist bildratenunabhängig (60 Hz ≈ 120 Hz)', () => {
    const sd = (hz: number) => {
      const rng = createRng(21);
      const w = { x: 0, y: 0, ang: 0, turn: 0 };
      let s = 0;
      let n = 0;
      for (let i = 0; i < hz * 400; i++) {
        steer(w, 1 / hz, rng);
        s += w.turn * w.turn;
        n++;
      }
      return Math.sqrt(s / n);
    };
    const a = sd(60);
    const b = sd(120);
    expect(Math.abs(a - b)).toBeLessThan(0.12);
    expect(a).toBeGreaterThan(0.35);
    expect(a).toBeLessThan(0.85);
  });

  it('Abprallen hält Ziele im Feld und spiegelt die Richtung', () => {
    const b = span(10, 90, 10, 90);
    const o = { x: 95, y: 50, ang: 0, turn: 0.4 };
    expect(bounce(o, b)).toBe(true);
    expect(o.x).toBeLessThanOrEqual(90);
    expect(Math.cos(o.ang)).toBeLessThan(0);
    expect(o.turn).toBeCloseTo(-0.4, 6);
    const p = { x: 50, y: 5, ang: -Math.PI / 2, turn: 0 };
    expect(bounce(p, b)).toBe(true);
    expect(p.y).toBeGreaterThanOrEqual(10);
    expect(Math.sin(p.ang)).toBeGreaterThan(0);
    const q = { x: 50, y: 50, ang: 1, turn: 0 };
    expect(bounce(q, b)).toBe(false);
  });

  it('span schrumpft einen zu kleinen Bereich auf die Mitte', () => {
    const b = span(80, 20, 10, 90);
    expect(b.minX).toBe(b.maxX);
    expect(b.minX).toBe(50);
  });

  it('Trennen: überlappende Ziele erhalten den Mindestabstand', () => {
    const items = [
      { x: 100, y: 100, r: 30 },
      { x: 110, y: 100, r: 30 },
      { x: 105, y: 108, r: 26 },
    ];
    for (let i = 0; i < 20; i++) separate(items, 10);
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const d = Math.hypot(items[i].x - items[j].x, items[i].y - items[j].y);
        expect(d).toBeGreaterThanOrEqual(items[i].r + items[j].r + 10 - 1);
      }
    }
    // Deckungsgleich: kein NaN
    const same = [
      { x: 5, y: 5, r: 10 },
      { x: 5, y: 5, r: 10 },
    ];
    separate(same, 4);
    expect(Number.isFinite(same[0].x + same[1].x + same[0].y + same[1].y)).toBe(true);
  });

  it('Startort: weit von anderen Zielen und vom Finger, im Feld', () => {
    const rng = createRng(17);
    const b = span(40, 960, 40, 700);
    const others = [
      { x: 200, y: 200 },
      { x: 800, y: 500 },
    ];
    const avoid = { x: 500, y: 350 };
    for (let i = 0; i < 100; i++) {
      const p = pickSpawnPoint(rng, b, others, avoid, 150, 100);
      expect(p.x).toBeGreaterThanOrEqual(b.minX);
      expect(p.x).toBeLessThanOrEqual(b.maxX);
      expect(p.y).toBeGreaterThanOrEqual(b.minY);
      expect(p.y).toBeLessThanOrEqual(b.maxY);
      for (const o of others) expect(Math.hypot(p.x - o.x, p.y - o.y)).toBeGreaterThanOrEqual(150);
      expect(Math.hypot(p.x - avoid.x, p.y - avoid.y)).toBeGreaterThanOrEqual(100);
    }
    // Sehr enges Feld: liefert trotzdem einen Punkt im Feld
    const tiny = span(10, 20, 10, 20);
    const q = pickSpawnPoint(rng, tiny, others, avoid, 500, 500);
    expect(q.x).toBeGreaterThanOrEqual(10);
    expect(q.x).toBeLessThanOrEqual(20);
  });
});

describe('schwarm-wechsel: Auswertung', () => {
  it('Kennzahlen', () => {
    const s = computeStats([900, 700, 1100, 800], [true, true, false, true], 2, 1);
    expect(s.hits).toBe(4);
    expect(s.medianMs).toBe(850);
    expect(s.orderRate).toBeCloseTo(75, 6);
    expect(s.missTaps).toBe(2);
    expect(s.expired).toBe(1);
  });

  it('ohne Treffer: Median NaN, Reihenfolge NaN', () => {
    const s = computeStats([], [], 1, 2);
    expect(s.hits).toBe(0);
    expect(Number.isNaN(s.medianMs)).toBe(true);
    expect(Number.isNaN(s.orderRate)).toBe(true);
  });

  it('Tipps: Ablauf > Fehltipp > Reihenfolge > gut', () => {
    const base = { hits: 10, medianMs: 800, orderRate: 90, missTaps: 0, expired: 0 };
    expect(tipFor(base)).toBe('great');
    expect(tipFor({ ...base, expired: 3 })).toBe('expired');
    expect(tipFor({ ...base, missTaps: 5 })).toBe('miss');
    expect(tipFor({ ...base, missTaps: 3, expired: 3 })).toBe('expired');
    expect(tipFor({ ...base, missTaps: 5, expired: 3 })).toBe('miss');
    expect(tipFor({ ...base, orderRate: 40 })).toBe('order');
    expect(tipFor({ ...base, orderRate: NaN })).toBe('great');
  });

  it('Punkte: Stufe und Reihenfolge zählen', () => {
    expect(pointsFor(1, false)).toBe(10);
    expect(pointsFor(1, true)).toBe(15);
    expect(pointsFor(6, true)).toBe(25);
    expect(pointsFor(99, false)).toBe(pointsFor(MAX_LEVEL, false));
  });
});
