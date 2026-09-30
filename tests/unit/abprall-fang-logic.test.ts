import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  askedBounceFor,
  contactPoint,
  errorPct,
  fold,
  HIT_TOL_PCT,
  hitTolPct,
  impactsOf,
  isHit,
  leadSecondsFor,
  makeTrial,
  MAX_LEVEL,
  meanError,
  MIN_LEVEL,
  noisyTap,
  pointsFor,
  positionAt,
  SECOND_BOUNCE_FROM,
} from '../../src/exercises/abprall-fang/logic';

const F = { minX: 40, maxX: 1140, minY: 30, maxY: 790 };
const P = { field: F, r: 18, minSpeed: 30, maxSpeed: 350 };

describe('abprall-fang: Stufenfunktionen', () => {
  it('Zeit bis zum gefragten Abprall sinkt mit der Stufe, innerhalb jeder Abprall-Art', () => {
    for (let l = MIN_LEVEL + 1; l < SECOND_BOUNCE_FROM; l++) expect(leadSecondsFor(l)).toBeLessThanOrEqual(leadSecondsFor(l - 1));
    for (let l = SECOND_BOUNCE_FROM + 1; l <= MAX_LEVEL; l++) expect(leadSecondsFor(l)).toBeLessThanOrEqual(leadSecondsFor(l - 1));
    expect(leadSecondsFor(1)).toBeCloseTo(3.2, 5);
    expect(leadSecondsFor(8)).toBeGreaterThanOrEqual(1.3);
    expect(leadSecondsFor(MAX_LEVEL)).toBeGreaterThanOrEqual(2.3);
    expect(leadSecondsFor(99)).toBe(leadSecondsFor(MAX_LEVEL));
  });

  it('Ab Stufe 9 ist der übernächste Abprall gefragt', () => {
    expect(askedBounceFor(1)).toBe(1);
    expect(askedBounceFor(8.9)).toBe(1);
    expect(askedBounceFor(9)).toBe(2);
    expect(askedBounceFor(20)).toBe(2);
  });
});

describe('abprall-fang: Bahn und Spiegelung', () => {
  it('fold spiegelt an den Grenzen und bleibt im Bereich', () => {
    expect(fold(5, 0, 10)).toBe(5);
    expect(fold(12, 0, 10)).toBeCloseTo(8);
    expect(fold(25, 0, 10)).toBeCloseTo(5);
    expect(fold(-3, 0, 10)).toBeCloseTo(3);
    for (let v = -100; v <= 100; v += 3.7) {
      const r = fold(v, 10, 30);
      expect(r).toBeGreaterThanOrEqual(10);
      expect(r).toBeLessThanOrEqual(30);
    }
  });

  it('Position bleibt im Feld und ist stetig (kein Sprung zwischen zwei kleinen Schritten)', () => {
    const start = { x: 300, y: 200 };
    const a = (37 * Math.PI) / 180;
    const dir = { x: Math.cos(a), y: Math.sin(a) };
    let prev = positionAt(start, dir, F, 0);
    for (let s = 1; s < 6000; s += 1) {
      const p = positionAt(start, dir, F, s);
      expect(p.x).toBeGreaterThanOrEqual(F.minX - 1e-9);
      expect(p.x).toBeLessThanOrEqual(F.maxX + 1e-9);
      expect(p.y).toBeGreaterThanOrEqual(F.minY - 1e-9);
      expect(p.y).toBeLessThanOrEqual(F.maxY + 1e-9);
      expect(Math.hypot(p.x - prev.x, p.y - prev.y)).toBeLessThanOrEqual(1.0001);
      prev = p;
    }
  });

  it('Abpraller: erster an der richtigen Wand, Einfalls- gleich Ausfallswinkel', () => {
    // schräg nach rechts oben: die obere Wand kommt vor der rechten
    const start = { x: 300, y: 500 };
    const a = (-50 * Math.PI) / 180;
    const dir = { x: Math.cos(a), y: Math.sin(a) };
    const imps = impactsOf(start, dir, F, 3);
    expect(imps).toHaveLength(3);
    expect(imps[0].wall).toBe('T');
    expect(imps[0].y).toBeCloseTo(F.minY, 6);
    // danach wandert y wieder nach unten, x läuft weiter nach rechts
    const after = positionAt(start, dir, F, imps[0].s + 10);
    expect(after.y).toBeGreaterThan(F.minY);
    expect(after.x).toBeGreaterThan(imps[0].x);
    // Spiegelung: Abstand vor und nach dem Abprall in y ist gleich
    const before = positionAt(start, dir, F, imps[0].s - 50);
    const later = positionAt(start, dir, F, imps[0].s + 50);
    expect(before.y - F.minY).toBeCloseTo(later.y - F.minY, 6);
    // sortiert nach Weg
    for (let i = 1; i < imps.length; i++) expect(imps[i].s).toBeGreaterThanOrEqual(imps[i - 1].s);
  });

  it('Abpraller liegen wirklich auf dem Rand des Felds', () => {
    const rng = createRng(7);
    for (let i = 0; i < 100; i++) {
      const start = { x: rng.range(F.minX + 50, F.maxX - 50), y: rng.range(F.minY + 50, F.maxY - 50) };
      const ang = rng.range(0, Math.PI * 2);
      const dir = { x: Math.cos(ang), y: Math.sin(ang) };
      for (const im of impactsOf(start, dir, F, 4)) {
        const onEdge =
          (im.wall === 'L' && Math.abs(im.x - F.minX) < 1e-6) ||
          (im.wall === 'R' && Math.abs(im.x - F.maxX) < 1e-6) ||
          (im.wall === 'T' && Math.abs(im.y - F.minY) < 1e-6) ||
          (im.wall === 'B' && Math.abs(im.y - F.maxY) < 1e-6);
        expect(onEdge).toBe(true);
      }
    }
  });

  it('Berührungspunkt liegt um den Radius außerhalb des Mittelpunkts', () => {
    expect(contactPoint({ s: 0, wall: 'L', x: 40, y: 100 }, 18)).toEqual({ x: 22, y: 100 });
    expect(contactPoint({ s: 0, wall: 'R', x: 40, y: 100 }, 18)).toEqual({ x: 58, y: 100 });
    expect(contactPoint({ s: 0, wall: 'T', x: 40, y: 100 }, 18)).toEqual({ x: 40, y: 82 });
    expect(contactPoint({ s: 0, wall: 'B', x: 40, y: 100 }, 18)).toEqual({ x: 40, y: 118 });
  });
});

describe('abprall-fang: Durchgang', () => {
  it('erzeugt gültige Durchgänge für alle Stufen: Start im Feld, Zeit und Tempo im Rahmen, keine Ecken', () => {
    const rng = createRng(11);
    for (let level = MIN_LEVEL; level <= MAX_LEVEL; level++) {
      for (let i = 0; i < 60; i++) {
        const t = makeTrial({ ...P, level }, rng);
        expect(t.asked).toBe(askedBounceFor(level));
        expect(t.impacts).toHaveLength(t.asked);
        expect(t.start.x).toBeGreaterThanOrEqual(F.minX);
        expect(t.start.x).toBeLessThanOrEqual(F.maxX);
        expect(t.start.y).toBeGreaterThanOrEqual(F.minY);
        expect(t.start.y).toBeLessThanOrEqual(F.maxY);
        expect(Math.hypot(t.dir.x, t.dir.y)).toBeCloseTo(1, 6);
        expect(t.speed).toBeGreaterThan(0);
        expect(t.sAsked / t.speed).toBeCloseTo(t.lead, 6);
        const base = leadSecondsFor(level);
        expect(t.lead).toBeGreaterThanOrEqual(base * 0.93 - 1e-6);
        expect(t.lead).toBeLessThanOrEqual(base * 1.07 + 1e-6);
        // Winkel weit genug von den Achsen entfernt
        expect(Math.abs(t.dir.x)).toBeGreaterThan(0.28);
        expect(Math.abs(t.dir.y)).toBeGreaterThan(0.28);
      }
    }
  });

  it('ist mit gleichem Startwert reproduzierbar', () => {
    const a = makeTrial({ ...P, level: 12 }, createRng(5));
    const b = makeTrial({ ...P, level: 12 }, createRng(5));
    expect(a).toEqual(b);
  });

  it('feste Bahn (Intro-Film): Zeit bis zum Abprall wie vorgegeben', () => {
    const t = makeTrial({ ...P, level: 2, fixed: { fx: 0.3, fy: 0.45, angleDeg: -50, lead: 2.4 } }, createRng(1));
    expect(t.lead).toBe(2.4);
    expect(t.impacts[0].wall).toBe('T');
    expect(t.sAsked / t.speed).toBeCloseTo(2.4, 6);
  });

  it('gefragter Abprall: der Berührungspunkt gehört zum gefragten (letzten) Abprall', () => {
    const rng = createRng(3);
    const t = makeTrial({ ...P, level: 12 }, rng);
    const last = t.impacts[t.impacts.length - 1];
    expect(t.contact).toEqual(contactPoint(last, P.r));
    // nach der Flugzeit steht das Ziel genau dort (Mittelpunkt)
    const pos = positionAt(t.start, t.dir, F, t.speed * t.lead);
    expect(pos.x).toBeCloseTo(last.x, 4);
    expect(pos.y).toBeCloseTo(last.y, 4);
  });

  it('funktioniert auch in einem kleinen Feld (Handy hochkant)', () => {
    const small = { minX: 14, maxX: 330, minY: 14, maxY: 560 };
    const rng = createRng(2);
    for (let level = 1; level <= MAX_LEVEL; level += 3) {
      const t = makeTrial({ field: small, r: 11, level, minSpeed: 14, maxSpeed: 160 }, rng);
      expect(Number.isFinite(t.speed)).toBe(true);
      expect(t.speed).toBeGreaterThan(0);
    }
  });
});

describe('abprall-fang: Wertung', () => {
  it('Fehler in % der kürzeren Seite, Treffer innerhalb der Toleranz', () => {
    const short = 700;
    const c = { x: 100, y: 100 };
    expect(errorPct({ x: 100, y: 100 }, c, short)).toBe(0);
    expect(errorPct({ x: 149, y: 100 }, c, short)).toBeCloseTo(7, 6);
    expect(isHit(HIT_TOL_PCT - 0.01, short)).toBe(true);
    expect(isHit(HIT_TOL_PCT + 1, short)).toBe(false);
    expect(isHit(NaN, short)).toBe(false);
  });

  it('Trefferkreis ist nie kleiner als 28 px (kleines Feld)', () => {
    expect(hitTolPct(700)).toBe(HIT_TOL_PCT);
    const short = 300;
    expect((hitTolPct(short) / 100) * short).toBeGreaterThanOrEqual(28 - 1e-9);
    expect((hitTolPct(1000) / 100) * 1000).toBeGreaterThanOrEqual(28);
  });

  it('Punkte: nur bei Treffer, mehr bei höherer Stufe und genauerem Tipp', () => {
    expect(pointsFor(20, 5, 700)).toBe(0);
    expect(pointsFor(0, 1, 700)).toBeGreaterThan(pointsFor(6, 1, 700));
    expect(pointsFor(0, 10, 700)).toBeGreaterThan(pointsFor(0, 1, 700));
  });

  it('mittlere Abweichung ignoriert NaN', () => {
    expect(meanError([2, 4, NaN])).toBe(3);
    expect(Number.isNaN(meanError([]))).toBe(true);
  });

  it('Autoplay-Ungenauigkeit streut um den Berührungspunkt', () => {
    const rng = createRng(9);
    const c = { x: 500, y: 400 };
    let sx = 0;
    const n = 400;
    for (let i = 0; i < n; i++) sx += noisyTap(c, 3, 700, rng).x - c.x;
    expect(Math.abs(sx / n)).toBeLessThan(6);
  });
});
