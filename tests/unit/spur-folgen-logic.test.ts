import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import { spurFolgen } from '../../src/exercises/spur-folgen';
import {
  amplitudeFor,
  BAND_U,
  deviationPercent,
  fingerOffsetPx,
  frequencyFor,
  MAX_LEVEL,
  MIN_LEVEL,
  PASS_FRACTION,
  peakVerticalSpeedFor,
  pointsFor,
  QUICK_SEGMENT_S,
  SEGMENT_S,
  segmentSeconds,
  speedFor,
  TrackStats,
  Trail,
  Wave,
  wavelengthFor,
} from '../../src/exercises/spur-folgen/logic';
import { simulate } from './_sim-w08-w09';

describe('spur-folgen: Stufenfunktionen', () => {
  it('Tempo, Wellenhöhe und Frequenz steigen, die Wellenlänge sinkt – innerhalb der Grenzen', () => {
    for (let l = MIN_LEVEL + 1; l <= MAX_LEVEL; l++) {
      expect(speedFor(l)).toBeGreaterThan(speedFor(l - 1));
      expect(amplitudeFor(l)).toBeGreaterThan(amplitudeFor(l - 1));
      expect(wavelengthFor(l)).toBeLessThan(wavelengthFor(l - 1));
      expect(frequencyFor(l)).toBeGreaterThan(frequencyFor(l - 1));
      expect(peakVerticalSpeedFor(l)).toBeGreaterThan(peakVerticalSpeedFor(l - 1));
    }
    expect(speedFor(0)).toBe(speedFor(1));
    expect(speedFor(99)).toBe(speedFor(MAX_LEVEL));
  });

  it('Einstieg ruhig, höchste Stufe machbar (senkrechte Spitzengeschwindigkeit ≤ 50 u/s, Frequenz < 0,5 Hz)', () => {
    expect(peakVerticalSpeedFor(1)).toBeLessThan(8);
    expect(peakVerticalSpeedFor(MAX_LEVEL)).toBeLessThan(50);
    expect(frequencyFor(MAX_LEVEL)).toBeLessThan(0.5);
    expect(frequencyFor(1)).toBeLessThan(0.15);
  });

  it('Band ≈ 5 mm (3,6 u), Versatz ≈ 6 u, Durchgang 11 s', () => {
    expect(BAND_U).toBeCloseTo(3.6, 6);
    expect(fingerOffsetPx(7.68, 11)).toBeCloseTo(6 * 7.68, 6);
    expect(fingerOffsetPx(3, 11)).toBe(37);
    expect(SEGMENT_S).toBe(11);
    expect(segmentSeconds({ demo: false, quick: false })).toBe(SEGMENT_S);
    expect(segmentSeconds({ demo: false, quick: true })).toBe(QUICK_SEGMENT_S);
    expect(segmentSeconds({ demo: true, quick: false })).toBeLessThan(SEGMENT_S);
  });

  it('Punkte: Stufe × Anteil im Band', () => {
    expect(pointsFor(3, 1)).toBe(30);
    expect(pointsFor(3, 0.5)).toBe(15);
    expect(pointsFor(3, 2)).toBe(30);
    expect(pointsFor(3, -1)).toBe(0);
  });
});

describe('spur-folgen: Welle', () => {
  it('gleicher Startwert → gleiche Welle; andere → andere', () => {
    const a = new Wave(createRng(4), 5, 100);
    const b = new Wave(createRng(4), 5, 100);
    const c = new Wave(createRng(5), 5, 100);
    expect(a.y(33)).toBe(b.y(33));
    expect(a.y(33)).not.toBeCloseTo(c.y(33), 3);
  });

  it('flach vor und nach der Welle, stetig, nie über der Wellenhöhe (auch mit Begrenzung)', () => {
    for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) {
      const w = new Wave(createRng(l), l, 90, 9);
      expect(w.y(-5)).toBe(0);
      expect(w.y(0)).toBe(0);
      expect(w.y(90)).toBe(0);
      expect(w.y(120)).toBe(0);
      let prev = 0;
      let maxStep = 0;
      let peak = 0;
      for (let s = 0; s <= 90; s += 0.1) {
        const y = w.y(s);
        peak = Math.max(peak, Math.abs(y));
        maxStep = Math.max(maxStep, Math.abs(y - prev));
        prev = y;
      }
      expect(peak).toBeLessThanOrEqual(9 + 1e-9);
      expect(w.amp).toBeLessThanOrEqual(9);
      // in 0,1 u höchstens ≈ 0,7 u Sprung (Steigung < 7) – keine Kanten
      expect(maxStep).toBeLessThan(0.7);
    }
  });

  it('Wellenhöhe wird ohne Begrenzung erreicht', () => {
    const w = new Wave(createRng(1), 6, 200);
    let peak = 0;
    for (let s = 0; s <= 200; s += 0.1) peak = Math.max(peak, Math.abs(w.y(s)));
    expect(peak).toBeGreaterThan(0.55 * amplitudeFor(6));
    expect(peak).toBeLessThanOrEqual(amplitudeFor(6) + 1e-9);
  });
});

describe('spur-folgen: Auswertung', () => {
  it('Zeit im Band und mittlere Abweichung sind zeitgewichtet', () => {
    const s = new TrackStats();
    s.add(3, 0);
    s.add(1, 2 * BAND_U);
    expect(s.time).toBeCloseTo(4, 9);
    expect(s.fraction).toBeCloseTo(0.75, 9);
    expect(s.meanDeviation).toBeCloseTo((1 * 2 * BAND_U) / 4, 9);
    expect(s.passed).toBe(true);
    const f = new TrackStats();
    f.add(1, 0);
    f.add(1, 5 * BAND_U);
    expect(f.fraction).toBeCloseTo(0.5, 9);
    expect(f.passed).toBe(false);
    expect(PASS_FRACTION).toBeGreaterThan(0.5);
  });

  it('Bandrand zählt noch als im Band; Vorzeichen egal; dt ≤ 0 wird ignoriert', () => {
    const s = new TrackStats();
    s.add(1, BAND_U);
    s.add(1, -BAND_U);
    s.add(0, 100);
    s.add(-1, 100);
    expect(s.fraction).toBe(1);
    expect(s.time).toBe(2);
  });

  it('leere Auswertung: 0 % und keine Abweichung, nicht gelungen', () => {
    const s = new TrackStats();
    expect(s.fraction).toBe(0);
    expect(s.meanDeviation).toBe(0);
    expect(s.passed).toBe(false);
  });

  it('merge summiert; Abweichung in % der Bandbreite', () => {
    const a = new TrackStats();
    const b = new TrackStats();
    a.add(2, 0);
    b.add(2, 2 * BAND_U);
    a.merge(b);
    expect(a.time).toBe(4);
    expect(a.fraction).toBeCloseTo(0.5, 9);
    expect(deviationPercent(BAND_U)).toBe(100);
    expect(deviationPercent(0)).toBe(0);
    expect(deviationPercent(a.meanDeviation)).toBe(100);
  });

  it('Bildrate ändert die Wertung nicht (gleiche Zeit, gleiche Werte bei 30, 60 und 144 Hz)', () => {
    const w = new Wave(createRng(2), 4, 100);
    const res: number[] = [];
    for (const fps of [30, 60, 144]) {
      const st = new TrackStats();
      const dt = 1 / fps;
      let sNow = 0;
      const speed = speedFor(4);
      for (let i = 0; i < fps * 8; i++) {
        sNow += speed * dt;
        // Finger mit festem Zeitversatz von 0,1 s hinter der Linie
        st.add(dt, w.y(sNow - 0.1 * speed) - w.y(sNow));
      }
      res.push(st.fraction);
    }
    expect(Math.abs(res[0] - res[1])).toBeLessThan(0.03);
    expect(Math.abs(res[1] - res[2])).toBeLessThan(0.03);
  });
});

describe('spur-folgen: Verlauf', () => {
  it('Trail begrenzt seine Länge und lässt sich leeren', () => {
    const t = new Trail(5);
    for (let i = 0; i < 12; i++) t.add(i, i * 2);
    expect(t.length).toBe(5);
    expect(t.at(0)).toEqual({ s: 7, y: 14 });
    expect(t.at(4)).toEqual({ s: 11, y: 22 });
    t.clear();
    expect(t.length).toBe(0);
  });
});

describe('spur-folgen: Durchlauf ohne Browser (Film und Autoplay)', () => {
  it('Intro-Film: 8–14 s, ruft finish, Bildunterschriften laufen', () => {
    for (const [w, h] of [
      [1024, 704],
      [360, 640],
      [1180, 820],
    ]) {
      const r = simulate({ def: spurFolgen, mode: 'demo', w, h, renderEvery: 2 });
      expect(r.result).not.toBeNull();
      expect(r.seconds).toBeGreaterThan(8);
      expect(r.seconds).toBeLessThan(14);
      expect(r.captions.length).toBeGreaterThanOrEqual(3);
      expect(r.hiddenGhost).toBe(true);
    }
  });

  it('Film: Die Marke bleibt fast immer im Band (sieht gut aus)', () => {
    let frames = 0;
    let inBand = 0;
    simulate({
      def: spurFolgen,
      mode: 'demo',
      onFrame: (ex) => {
        const e = ex as unknown as { finger: unknown; sNow: number; mk: number; wave: Wave };
        if (e.finger && e.sNow > 0 && e.sNow < e.wave.length) {
          frames++;
          if (Math.abs(e.mk - e.wave.y(e.sNow)) <= BAND_U) inBand++;
        }
      },
    });
    expect(frames).toBeGreaterThan(100);
    expect(inBand / frames).toBeGreaterThan(0.85);
  });

  it('Autoplay im Spielmodus (DE und IT): Sitzung endet mit gültigem Ergebnis', () => {
    for (const lang of ['de', 'it'] as const) {
      const r = simulate({ def: spurFolgen, lang, quick: true, renderEvery: 4 });
      expect(r.result).not.toBeNull();
      const res = r.result!;
      expect(res.primary.key).toBe('level');
      expect(Number.isInteger(res.primary.value)).toBe(true);
      expect(res.primary.value).toBeGreaterThanOrEqual(MIN_LEVEL);
      expect(res.primary.value).toBeLessThanOrEqual(MAX_LEVEL);
      expect(res.secondary.length).toBeGreaterThanOrEqual(2);
      expect(res.secondary.length).toBeLessThanOrEqual(4);
      for (const m of [res.primary, ...res.secondary]) expect(spurFolgen.texts[lang].metrics[m.key]).toBeTruthy();
      const pct = res.secondary.find((m) => m.key === 'inBand')!;
      expect(pct.value).toBeGreaterThanOrEqual(0);
      expect(pct.value).toBeLessThanOrEqual(100);
      if (res.tip) expect(spurFolgen.texts[lang].tips[res.tip]).toBeTruthy();
    }
  });

  it('Autoplay: mehrere Sitzungen, Hoch- und Querformat, reduzierte Bewegung, hohe Startstufe – immer fertig', () => {
    for (let seed = 1; seed <= 6; seed++) {
      const r = simulate({
        def: spurFolgen,
        seed,
        quick: true,
        w: seed % 2 ? 360 : 1024,
        h: seed % 2 ? 640 : 768,
        startLevel: 1 + ((seed * 2) % 12),
        reducedMotion: seed % 3 === 0,
        renderEvery: 3,
      });
      expect(r.result).not.toBeNull();
    }
  });

  it('volle Sitzung endet von selbst und dauert etwa 1–2 Minuten', () => {
    const r = simulate({ def: spurFolgen, seed: 13, renderEvery: 0 });
    expect(r.result).not.toBeNull();
    expect(r.seconds).toBeGreaterThan(55);
    expect(r.seconds).toBeLessThan(140);
  });
});
