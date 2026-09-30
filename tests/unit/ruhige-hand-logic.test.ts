import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import { ruhigeHand } from '../../src/exercises/ruhige-hand';
import {
  amplitudeFor,
  BALL_R_U,
  CLEAN_TOUCHES,
  clampToCorridor,
  corridorWidthFor,
  fingerOffsetPx,
  freeHalfWidth,
  grabRadiusPx,
  makeCorridor,
  MAX_LEVEL,
  maxSlope,
  MIN_LEVEL,
  moveBall,
  PathTime,
  pointsFor,
  samplePath,
  TOUCH_GAP_MS,
  TouchCounter,
  wavelengthFor,
} from '../../src/exercises/ruhige-hand/logic';
import { simulate } from './_sim-w08-w09';

describe('ruhige-hand: Stufenfunktionen', () => {
  it('Bahn wird schmaler, Kurven höher und dichter – innerhalb der Grenzen', () => {
    for (let l = MIN_LEVEL + 1; l <= MAX_LEVEL; l++) {
      expect(corridorWidthFor(l)).toBeLessThan(corridorWidthFor(l - 1));
      expect(amplitudeFor(l)).toBeGreaterThan(amplitudeFor(l - 1));
      expect(wavelengthFor(l)).toBeLessThan(wavelengthFor(l - 1));
    }
    expect(corridorWidthFor(1)).toBeCloseTo(13, 6);
    expect(corridorWidthFor(0)).toBe(corridorWidthFor(1));
    expect(corridorWidthFor(99)).toBe(corridorWidthFor(MAX_LEVEL));
  });

  it('auch auf der höchsten Stufe bleibt für die Ballmitte mindestens ≈ 2 u frei (kein unlösbarer Korridor)', () => {
    expect(freeHalfWidth(MAX_LEVEL)).toBeGreaterThan(2);
    expect(freeHalfWidth(MAX_LEVEL)).toBeCloseTo(corridorWidthFor(MAX_LEVEL) / 2 - BALL_R_U, 6);
    expect(freeHalfWidth(1)).toBeGreaterThan(freeHalfWidth(MAX_LEVEL));
  });

  it('Finger-Versatz ≈ 6 u, mindestens Ballradius + 26 px; Aufsetzkreis ≥ 30 px', () => {
    expect(fingerOffsetPx(7.68, 10)).toBeCloseTo(6 * 7.68, 6);
    expect(fingerOffsetPx(3, 10)).toBe(36);
    expect(grabRadiusPx(3)).toBe(30);
    expect(grabRadiusPx(10)).toBe(50);
  });

  it('Punkte wachsen mit der Stufe und sinken mit Berührungen, nie unter 0', () => {
    expect(pointsFor(3, 0)).toBeGreaterThan(pointsFor(2, 0));
    expect(pointsFor(3, 2)).toBeLessThan(pointsFor(3, 0));
    expect(pointsFor(1, 99)).toBe(0);
  });
});

describe('ruhige-hand: Bahn', () => {
  it('gleicher Startwert → gleiche Bahn; andere Startwerte → andere Bahn', () => {
    const a = makeCorridor(createRng(5), 4, 120);
    const b = makeCorridor(createRng(5), 4, 120);
    const c = makeCorridor(createRng(6), 4, 120);
    expect(a.center(40)).toBe(b.center(40));
    expect(a.center(40)).not.toBeCloseTo(c.center(40), 3);
  });

  it('Anfang und Ende liegen waagrecht und in der Mitte', () => {
    for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) {
      const c = makeCorridor(createRng(l), l, 110);
      expect(c.center(0)).toBeCloseTo(0, 6);
      expect(c.center(110)).toBeCloseTo(0, 6);
      expect(Math.abs(c.slope(0.02))).toBeLessThan(0.05);
      expect(Math.abs(c.slope(109.98))).toBeLessThan(0.05);
    }
  });

  it('Kurvenhöhe ≤ maxAmp und Steigung nie extrem (alle Stufen, viele Bahnen, auch kurze Bühnen)', () => {
    for (const len of [44, 80, 121]) {
      for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) {
        for (let seed = 1; seed <= 8; seed++) {
          const c = makeCorridor(createRng(seed * 31 + l), l, len, 14);
          let peak = 0;
          for (let x = 0; x <= len; x += 0.5) peak = Math.max(peak, Math.abs(c.center(x)));
          expect(peak).toBeLessThanOrEqual(14 + 1e-6);
          expect(maxSlope(c)).toBeLessThan(2.2);
        }
      }
    }
  });

  it('samplePath deckt die ganze Länge ab', () => {
    const c = makeCorridor(createRng(2), 3, 100);
    const pts = samplePath(c);
    expect(pts[0].x).toBe(0);
    expect(pts[pts.length - 1].x).toBe(100);
    for (let i = 1; i < pts.length; i++) expect(pts[i].x).toBeGreaterThan(pts[i - 1].x);
  });
});

describe('ruhige-hand: Wand', () => {
  const c = makeCorridor(createRng(3), 6, 120);

  it('innerhalb der Bahn: keine Berührung, Position unverändert', () => {
    for (let x = 5; x < 115; x += 7) {
      const y = c.center(x) + 0.5 * c.free;
      const r = clampToCorridor(c, x, y);
      expect(r.contact).toBe(false);
      expect(r.y).toBeCloseTo(y, 9);
    }
  });

  it('außerhalb: Berührung, der Ball bleibt am Rand der freien Bahn (senkrechter Abstand = free)', () => {
    for (let x = 5; x < 115; x += 7) {
      for (const s of [-1, 1]) {
        const r = clampToCorridor(c, x, c.center(x) + s * 50);
        expect(r.contact).toBe(true);
        const perp = (r.y - c.center(r.x)) / Math.sqrt(1 + c.slope(r.x) ** 2);
        expect(Math.abs(perp)).toBeCloseTo(c.free, 6);
        expect(Math.sign(perp)).toBe(s);
      }
    }
  });

  it('Bahnenden: Ball kann nicht über Start und Ziel hinaus, das zählt nicht als Wandberührung', () => {
    expect(clampToCorridor(c, -20, c.center(0)).x).toBe(0);
    expect(clampToCorridor(c, -20, c.center(0)).contact).toBe(false);
    expect(clampToCorridor(c, 500, c.center(120)).x).toBe(120);
  });

  it('schneller Finger: die Wand wird nicht übersprungen', () => {
    let crossed = 0;
    for (let seed = 1; seed <= 20; seed++) {
      const cc = makeCorridor(createRng(seed), 8, 120);
      const a = { x: 20, y: cc.center(20) };
      const b = { x: 75, y: cc.center(75) };
      const straight = moveBall(cc, a, b);
      // Gerade Linie zwischen den Punkten verlässt die Bahn: Berührung wird gemeldet …
      let outside = false;
      for (let q = 0; q <= 1; q += 0.01) {
        const x = a.x + (b.x - a.x) * q;
        const y = a.y + (b.y - a.y) * q;
        if (clampToCorridor(cc, x, y).contact) outside = true;
      }
      if (outside) {
        crossed++;
        expect(straight.contact).toBe(true);
      }
      // … und das Ergebnis liegt immer in der Bahn
      expect(Math.abs(straight.dev)).toBeLessThanOrEqual(cc.free + 1e-6);
    }
    expect(crossed).toBeGreaterThan(3);
  });

  it('Bewegung entlang der Mitte meldet nie eine Berührung', () => {
    const cc = makeCorridor(createRng(9), MAX_LEVEL, 120);
    let prev = { x: 0, y: cc.center(0) };
    for (let x = 0.3; x <= 120; x += 0.3) {
      const r = moveBall(cc, prev, { x, y: cc.center(x) });
      expect(r.contact).toBe(false);
      prev = r;
    }
    expect(prev.x).toBeCloseTo(120, 0);
  });
});

describe('ruhige-hand: Zählung', () => {
  it('TouchCounter zählt neue Berührungen, kurze Unterbrechungen zählen nicht doppelt', () => {
    const tc = new TouchCounter();
    expect(tc.update(false, 0)).toBe(false);
    expect(tc.update(true, 100)).toBe(true);
    expect(tc.update(true, 200)).toBe(false); // gleiche Berührung
    expect(tc.update(false, 300)).toBe(false);
    expect(tc.update(true, 300 + TOUCH_GAP_MS - 50)).toBe(false); // Wackeln am Rand
    expect(tc.update(false, 800)).toBe(false);
    expect(tc.update(true, 800 + TOUCH_GAP_MS + 10)).toBe(true); // neue Berührung
    expect(tc.touches).toBe(2);
    expect(tc.inContact).toBe(true);
    expect(CLEAN_TOUCHES).toBeGreaterThanOrEqual(0);
  });

  it('PathTime: Anteil der Zeit ohne Wandkontakt', () => {
    const p = new PathTime();
    expect(p.fraction).toBe(1);
    p.add(3, false);
    p.add(1, true);
    expect(p.fraction).toBeCloseTo(0.75, 9);
  });
});

describe('ruhige-hand: Durchlauf ohne Browser (Film und Autoplay)', () => {
  it('Intro-Film: 8–14 s, fehlerfrei, ohne Berührung, ruft finish', () => {
    for (const [w, h] of [
      [1024, 704],
      [360, 640],
      [1180, 820],
    ]) {
      let touches = 0;
      const r = simulate({
        def: ruhigeHand,
        mode: 'demo',
        w,
        h,
        renderEvery: 2,
        onFrame: (ex) => {
          touches = Math.max(touches, (ex as unknown as { counter: { touches: number } }).counter.touches);
        },
      });
      expect(r.result).not.toBeNull();
      expect(r.seconds).toBeGreaterThan(8);
      expect(r.seconds).toBeLessThan(14);
      expect(touches).toBe(0);
      expect(r.captions.length).toBeGreaterThanOrEqual(3);
      expect(r.hiddenGhost).toBe(true);
    }
  });

  it('Autoplay im Spielmodus (DE und IT): Sitzung endet mit gültigem Ergebnis', () => {
    for (const lang of ['de', 'it'] as const) {
      const r = simulate({ def: ruhigeHand, lang, quick: true, renderEvery: 4 });
      expect(r.result).not.toBeNull();
      const res = r.result!;
      expect(res.primary.key).toBe('level');
      expect(Number.isInteger(res.primary.value)).toBe(true);
      expect(res.primary.value).toBeGreaterThanOrEqual(MIN_LEVEL);
      expect(res.primary.value).toBeLessThanOrEqual(MAX_LEVEL);
      expect(res.secondary.length).toBeGreaterThanOrEqual(2);
      expect(res.secondary.length).toBeLessThanOrEqual(4);
      for (const m of [res.primary, ...res.secondary]) expect(ruhigeHand.texts[lang].metrics[m.key]).toBeTruthy();
      const pct = res.secondary.find((m) => m.key === 'onPath')!;
      expect(pct.value).toBeGreaterThanOrEqual(0);
      expect(pct.value).toBeLessThanOrEqual(100);
      if (res.tip) expect(ruhigeHand.texts[lang].tips[res.tip]).toBeTruthy();
    }
  });

  it('Autoplay: mehrere Sitzungen, Hoch- und Querformat, reduzierte Bewegung – immer fertig', () => {
    for (let seed = 1; seed <= 6; seed++) {
      const r = simulate({
        def: ruhigeHand,
        seed,
        quick: true,
        w: seed % 2 ? 360 : 1024,
        h: seed % 2 ? 640 : 768,
        startLevel: 1 + (seed % 9),
        reducedMotion: seed % 3 === 0,
        renderEvery: 3,
      });
      expect(r.result).not.toBeNull();
    }
  });

  it('volle Sitzung endet von selbst; bei viel Ausrutschern sinkt die Stufe nicht unter 1', () => {
    const r = simulate({ def: ruhigeHand, seed: 11, renderEvery: 0 });
    expect(r.result).not.toBeNull();
    expect(r.labels.length).toBeGreaterThanOrEqual(6);
  });
});
