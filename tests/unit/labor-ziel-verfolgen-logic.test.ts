/**
 * Ziel verfolgen (Labor): reine Logik. Übertragen aus labor/test/follow.test.js (Labor-Prototyp) und erweitert:
 * Zeiten in ms, Koordinaten in cm, keine festen Zufallswerte (die Bahn ist fest, es gibt keinen Zufall).
 */
import { describe, expect, it } from 'vitest';
import { defaultParams, sanitizeParams } from '../../src/core/params';
import {
  FollowSession,
  followParams,
  makePath,
  MIN_HIT_PX,
  PARAMS,
  pathMargin,
  pathPoint,
  pointsFor,
  QUICK_DURATION_S,
  round,
  tipFor,
  type FollowSummary,
  type PathKind,
} from '../../src/exercises/labor-ziel-verfolgen/logic';

type Over = Record<string, unknown>;

function make(over: Over = {}, extra: { w?: number; h?: number; minHit?: number } = {}): FollowSession {
  const p = followParams(sanitizeParams(PARAMS, { ...defaultParams(PARAMS), ...over }));
  const s = new FollowSession(p, { fieldWcm: extra.w ?? 60, fieldHcm: extra.h ?? 34, minHitRadiusCm: extra.minHit });
  s.start(0);
  return s;
}

interface PlayState {
  down: boolean;
  dx?: number;
  dy?: number;
}

/** Lässt den Finger ideal mitlaufen: der Zeiger steht dort, wo das Ziel nach dem nächsten Schritt ist. */
function play(s: FollowSession, until: number, stepMs: number, fn?: (t: number) => PlayState): void {
  for (let t = stepMs; t <= until; t += stepMs) {
    const next = s.elapsed + stepMs / 1000;
    const target = s.path.at(s.p.speedCmS * next);
    const st = fn ? fn(t) : { down: true, dx: 0, dy: 0 };
    s.setPointer(target.x + (st.dx ?? 0), target.y + (st.dy ?? 0), st.down);
    s.update(t);
  }
}

const KINDS: PathKind[] = ['ellipse', 'eight', 'lissajous'];

describe('Ziel verfolgen: Bahn (aus dem Prototyp)', () => {
  it('geschlossen, im Feld, gleichmäßige Geschwindigkeit entlang der Bogenlänge', () => {
    for (const kind of KINDS) {
      const path = makePath(kind, 60, 34, 2.5);
      expect(path.length).toBeGreaterThan(50);
      const a = path.at(0);
      const b = path.at(path.length);
      expect(Math.hypot(a.x - b.x, a.y - b.y), `${kind} nicht geschlossen`).toBeLessThan(1e-6);
      for (const pt of path.points) {
        expect(pt.x).toBeGreaterThanOrEqual(2.5 - 1e-6);
        expect(pt.x).toBeLessThanOrEqual(57.5 + 1e-6);
        expect(pt.y).toBeGreaterThanOrEqual(2.5 - 1e-6);
        expect(pt.y).toBeLessThanOrEqual(31.5 + 1e-6);
      }
      const ds = path.length / 400;
      for (let i = 0; i < 400; i++) {
        const p1 = path.at(i * ds);
        const p2 = path.at((i + 1) * ds);
        const chord = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        expect(chord, `${kind} Sehne länger als Bogen`).toBeLessThanOrEqual(ds * 1.0005);
        expect(chord, `${kind} Sehne zu kurz`).toBeGreaterThanOrEqual(ds * 0.85);
      }
    }
  });

  it('beliebig oft um die Bahn: negative und große Strecken bleiben auf der Bahn', () => {
    const path = makePath('eight', 40, 24, 2);
    const a = path.at(3.7);
    const b = path.at(3.7 + 5 * path.length);
    const c = path.at(3.7 - 2 * path.length);
    expect(Math.hypot(a.x - b.x, a.y - b.y)).toBeLessThan(1e-6);
    expect(Math.hypot(a.x - c.x, a.y - c.y)).toBeLessThan(1e-6);
  });

  it('pathPoint: Ellipse in der Mitte beginnt rechts, Acht und Kurve beginnen auf der Mittellinie bzw. am Rand', () => {
    expect(pathPoint('ellipse', 0, 10, 5, 4, 2)).toEqual({ x: 14, y: 5 });
    expect(pathPoint('eight', 0, 10, 5, 4, 2).x).toBeCloseTo(10, 9);
    expect(pathPoint('lissajous', 0, 10, 5, 4, 2).x).toBeCloseTo(10 + 4 * Math.sin(Math.PI / 2), 9);
  });

  it('kleines Feld (Handy hochkant): Bahn bleibt im Feld, auch mit großem Ziel', () => {
    for (const d of [1, 3, 6, 9]) {
      for (const kind of KINDS) {
        const W = 10.3;
        const H = 22;
        const m = pathMargin(d);
        const path = makePath(kind, W, H, m);
        for (const pt of path.points) {
          expect(pt.x).toBeGreaterThanOrEqual(Math.min(m, W / 2 - 1) - 1e-6 - 1);
          expect(pt.x).toBeLessThanOrEqual(W + 1e-6);
          expect(pt.y).toBeGreaterThanOrEqual(-1e-6);
          expect(pt.y).toBeLessThanOrEqual(H + 1e-6);
          expect(Number.isFinite(pt.x) && Number.isFinite(pt.y)).toBe(true);
        }
      }
    }
  });
});

describe('Ziel verfolgen: Wertung (aus dem Prototyp)', () => {
  it('ideales Mitlaufen: nahezu 100 % auf dem Ziel, keine Verluste', () => {
    const s = make({ durationS: 10, speedCmS: 10 });
    play(s, 10500, 50);
    expect(s.finished).toBe(true);
    const sum = s.summary();
    expect(sum.onPct!).toBeGreaterThan(99);
    expect(sum.losses).toBe(0);
    expect(sum.bestRun).toBeGreaterThan(9.5);
    expect(sum.meanDist!).toBeLessThan(0.01);
    expect(sum.touchPct!).toBeGreaterThan(99);
  });

  it('ohne Berührung: 0 % auf dem Ziel, Abweichung null statt NaN', () => {
    const s = make({ durationS: 10 });
    play(s, 10500, 50, () => ({ down: false }));
    const sum = s.summary();
    expect(sum.onPct).toBe(0);
    expect(sum.touchPct).toBe(0);
    expect(sum.meanDist).toBeNull();
    expect(sum.losses).toBe(0);
  });

  it('Verlust wird gezählt, längste Verfolgung stimmt', () => {
    const s = make({ durationS: 10, speedCmS: 8 });
    play(s, 10500, 50, (t) => (t > 3000 && t <= 4000 ? { down: false } : { down: true, dx: 0, dy: 0 }));
    const sum = s.summary();
    expect(sum.losses).toBe(1);
    expect(Math.abs(sum.bestRun - 6)).toBeLessThan(0.2);
    expect(sum.onPct!).toBeGreaterThan(85);
    expect(sum.onPct!).toBeLessThan(95);
  });

  it('Abweichung: Zeiger weit neben dem Ziel gilt nicht als „auf dem Ziel“', () => {
    const s = make({ durationS: 10, diameterCm: 3, toleranceCm: 0.5 });
    play(s, 10500, 50, () => ({ down: true, dx: 5, dy: 0 }));
    const sum = s.summary();
    expect(sum.onPct).toBe(0);
    expect(sum.touchPct!).toBeGreaterThan(99);
    expect(Math.abs(sum.meanDist! - 5)).toBeLessThan(0.01);
  });

  it('Spielraum: knapp außerhalb des Zielrands zählt noch', () => {
    const s = make({ durationS: 10, diameterCm: 3, toleranceCm: 0.5 });
    play(s, 10500, 50, () => ({ down: true, dx: 1.9, dy: 0 }));
    expect(s.summary().onPct!).toBeGreaterThan(99);
  });

  it('Ende nach Dauer; Zeitsprünge werden begrenzt', () => {
    const s = make({ durationS: 10 });
    s.update(60000);
    expect(s.elapsed).toBeLessThanOrEqual(0.1 + 1e-9); // ein langer Sprung zählt höchstens 0,1 s
    expect(s.finished).toBe(false);
    const sum = s.summary();
    for (const v of [sum.onPct, sum.onS, sum.bestRun, sum.losses, sum.touchPct, sum.totalS]) expect(Number.isFinite(v as number)).toBe(true);
  });
});

describe('Ziel verfolgen: Erweiterungen und Grenzfälle', () => {
  it('vor dem Start und ohne Zeit: nichts wird gezählt, Kennzahlen sind null statt NaN', () => {
    const p = followParams(defaultParams(PARAMS));
    const s = new FollowSession(p, { fieldWcm: 60, fieldHcm: 34 });
    s.setPointer(10, 10, true);
    s.update(1000); // nicht gestartet: ohne Wirkung
    expect(s.elapsed).toBe(0);
    const sum = s.summary();
    expect(sum.onPct).toBeNull();
    expect(sum.touchPct).toBeNull();
    expect(sum.meanDist).toBeNull();
    expect(s.liveOnPct()).toBe(0);
    s.start(0);
    s.update(0); // gleiche Zeit: keine Dauer
    expect(s.summary().onPct).toBeNull();
  });

  it('Geschwindigkeit in cm/s ist bildratenunabhängig (60 und 144 Bilder pro Sekunde)', () => {
    const a = make({ durationS: 20, speedCmS: 12 });
    const b = make({ durationS: 20, speedCmS: 12 });
    for (let t = 1000 / 60; t <= 10000 + 1e-6; t += 1000 / 60) a.update(t);
    for (let t = 1000 / 144; t <= 10000 + 1e-6; t += 1000 / 144) b.update(t);
    expect(a.distance).toBeCloseTo(120, 0);
    expect(b.distance).toBeCloseTo(120, 0);
    expect(Math.hypot(a.target.x - b.target.x, a.target.y - b.target.y)).toBeLessThan(0.5);
  });

  it('die Strecke wächst mit der Geschwindigkeit: 8 cm/s über 10 s = 80 cm', () => {
    const s = make({ durationS: 30, speedCmS: 8 });
    play(s, 10000, 20, () => ({ down: false }));
    expect(s.distance).toBeCloseTo(80, 0);
  });

  it('Trefferradius: Radius + Spielraum, mindestens 24 px (Touch-Ziel)', () => {
    const k = 38;
    const s = make({ diameterCm: 1, toleranceCm: 0 }, { minHit: MIN_HIT_PX / k });
    expect(s.hitRadius).toBeCloseTo(24 / 38, 9);
    expect(make({ diameterCm: 3, toleranceCm: 0.5 }, { minHit: MIN_HIT_PX / k }).hitRadius).toBe(2);
    expect(make({ diameterCm: 3, toleranceCm: 0.5 }).hitRadius).toBe(2);
    // ein 0,6 cm neben der Mitte liegender Finger zählt beim 1-cm-Ziel mit Mindestradius
    s.setPointer(s.target.x + 0.6, s.target.y, true);
    expect(s.isOn(s.target.x + 0.6, s.target.y)).toBe(true);
    expect(s.isOn(s.target.x + 0.7, s.target.y)).toBe(false);
  });

  it('Abheben und Wiederansetzen: jede Unterbrechung zählt einen Verlust, die längste Serie wird je Serie neu gezählt', () => {
    const s = make({ durationS: 20, speedCmS: 8 });
    play(s, 20500, 50, (t) => (t % 5000 > 4000 ? { down: false } : { down: true, dx: 0, dy: 0 }));
    const sum = s.summary();
    expect(sum.losses).toBe(4); // Lücken bei 4–5 s, 9–10 s, 14–15 s und 19–20 s
    expect(sum.bestRun).toBeGreaterThan(3.5);
    expect(sum.bestRun).toBeLessThan(4.2);
    expect(sum.touchPct!).toBeLessThan(85);
  });

  it('verlorene Verbindung: Finger sehr weit weg zählt wie Abheben, aber als Fingerkontakt', () => {
    const s = make({ durationS: 10, speedCmS: 8 });
    play(s, 10500, 50, (t) => (t > 3000 && t <= 4000 ? { down: true, dx: 20, dy: 0 } : { down: true, dx: 0, dy: 0 }));
    const sum = s.summary();
    expect(sum.losses).toBe(1);
    expect(sum.touchPct!).toBeGreaterThan(99);
    expect(sum.onPct!).toBeLessThan(95);
  });

  it('setField (Tablet gedreht): Bahn wird neu gebaut, das Ziel bleibt an derselben Stelle der Runde und im Feld', () => {
    const s = make({ durationS: 60, speedCmS: 10, path: 'eight' }, { w: 60, h: 34 });
    play(s, 7000, 50, () => ({ down: false }));
    const frac = (s.distance % s.path.length) / s.path.length;
    s.setField(34, 60);
    expect((s.distance % s.path.length) / s.path.length).toBeCloseTo(frac, 9);
    for (const pt of s.path.points) {
      expect(pt.x).toBeGreaterThanOrEqual(0);
      expect(pt.x).toBeLessThanOrEqual(34);
      expect(pt.y).toBeGreaterThanOrEqual(0);
      expect(pt.y).toBeLessThanOrEqual(60);
    }
    const before = s.distance;
    s.update(7100);
    expect(s.distance).toBeGreaterThan(before);
    expect(s.target.x).toBeGreaterThanOrEqual(0);
    expect(s.target.x).toBeLessThanOrEqual(34);
  });

  it('setField mit neuer Zielgröße ändert Durchmesser, Trefferradius und Bahnabstand', () => {
    const s = make({ diameterCm: 8, toleranceCm: 0.5 }, { w: 20, h: 20 });
    s.setField(10, 22, 4);
    expect(s.diameter).toBe(4);
    expect(s.hitRadius).toBe(2.5);
    const m = pathMargin(4);
    for (const pt of s.path.points) expect(pt.x).toBeGreaterThanOrEqual(Math.min(m, 5 - 1) - 1e-6);
  });

  it('Einstellungen werden bereinigt (Zahlen geklemmt, Auswahl nur erlaubt)', () => {
    const p = followParams(sanitizeParams(PARAMS, { durationS: 99999, speedCmS: -3, diameterCm: 77, path: 'quatsch', showTrail: 'vielleicht', toleranceCm: 0.04 }));
    expect(p.durationS).toBe(180);
    expect(p.speedCmS).toBe(2);
    expect(p.diameterCm).toBe(10);
    expect(p.path).toBe('ellipse');
    expect(p.showTrail).toBe('yes');
    expect(p.toleranceCm).toBe(0);
    const d = followParams(defaultParams(PARAMS));
    expect(d).toEqual({ durationS: 30, path: 'ellipse', speedCmS: 8, diameterCm: 3, toleranceCm: 0.5, showTrail: 'yes' });
    // ältere Attrappen ohne Werte → Standard
    expect(followParams({})).toEqual(d);
  });

  it('PARAMS: Schlüssel, Grenzen und Standard wie im Prototyp, höchstens drei in der Kurzfassung', () => {
    expect(PARAMS.map((d) => d.key)).toEqual(['durationS', 'path', 'speedCmS', 'diameterCm', 'toleranceCm', 'showTrail']);
    const num = (k: string) => PARAMS.find((d) => d.key === k) as { min: number; max: number; step: number; default: number };
    expect(num('durationS')).toMatchObject({ min: 10, max: 180, step: 5, default: 30 });
    expect(num('speedCmS')).toMatchObject({ min: 2, max: 40, step: 1, default: 8 });
    expect(num('diameterCm')).toMatchObject({ min: 1, max: 10, step: 0.5, default: 3 });
    expect(num('toleranceCm')).toMatchObject({ min: 0, max: 3, step: 0.1, default: 0.5 });
    expect(PARAMS.filter((d) => d.summary).length).toBeLessThanOrEqual(3);
    expect(PARAMS.some((d) => d.neutral)).toBe(false);
    expect(QUICK_DURATION_S).toBeLessThanOrEqual(10);
  });

  it('liveOnPct und Zeit bis zum Ende', () => {
    const s = make({ durationS: 10 });
    play(s, 5000, 50, (t) => (t <= 2500 ? { down: true } : { down: false }));
    expect(s.liveOnPct()).toBeGreaterThan(45);
    expect(s.liveOnPct()).toBeLessThan(55);
    expect(s.remainingS()).toBeCloseTo(5, 1);
  });

  it('round: nicht endliche Werte werden null', () => {
    expect(round(Number.NaN)).toBeNull();
    expect(round(undefined)).toBeNull();
    expect(round(Number.POSITIVE_INFINITY)).toBeNull();
    expect(round(1.2349, 2)).toBe(1.23);
  });

  it('Punkte nur zur Motivation: 10 je Sekunde auf dem Ziel', () => {
    expect(pointsFor(0)).toBe(0);
    expect(pointsFor(12.34)).toBe(123);
    expect(pointsFor(-5)).toBe(0);
  });

  it('persönlicher Tipp je nach Verlauf', () => {
    const base: FollowSummary = { onPct: 70, onS: 21, meanDist: 1, bestRun: 4, losses: 2, touchPct: 95, totalS: 30 };
    expect(tipFor({ ...base, touchPct: 10 })).toBe('touch');
    expect(tipFor({ ...base, onPct: null, touchPct: null })).toBe('touch');
    expect(tipFor({ ...base, onPct: 95, losses: 1 })).toBe('harder');
    expect(tipFor({ ...base, onPct: 40 })).toBe('easier');
    expect(tipFor({ ...base, losses: 8 })).toBe('lost');
    expect(tipFor(base)).toBe('compare');
  });
});
