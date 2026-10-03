import { describe, expect, it } from 'vitest';
import { sanitizeParams, variantKey } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import { arcsecToCm, pixelArcsec } from '../../src/exercises/_shared/anaglyph';
import { laborStereo } from '../../src/exercises/labor-stereo';
import { stereoLayout } from '../../src/exercises/labor-stereo/layout';
import {
  CHANCE_PCT,
  dotDisparityCm,
  LIVE_COARSE_ARCSEC,
  LIVE_STEP_ARCSEC,
  LOCATIONS,
  makeScene,
  MAX_ARCSEC,
  MIN_ARCSEC,
  PARAMS,
  pointsFor,
  regionSize,
  stereoParams,
  StereoSession,
  summarize,
  tipFor,
  type Location,
  type StereoParams,
  type StereoTrial,
} from '../../src/exercises/labor-stereo/logic';

const params = (over: Record<string, unknown> = {}): StereoParams => stereoParams(sanitizeParams(PARAMS, over));
const CALIB = { distCm: 40, pxPerCm: 38 };

function make(over: Record<string, unknown> = {}, seed = 5, trainerAvailable = true) {
  const s = new StereoSession(params(over), { rng: createRng(seed), ...CALIB, trainerAvailable });
  s.start(0);
  return s;
}

/** Zeit in Schritten von 1/60 s fortschreiben */
function advance(s: StereoSession, from: number, ms: number): number {
  let t = from;
  const end = from + ms;
  while (t < end) {
    t += 1000 / 60;
    s.update(t);
  }
  return t;
}

/** Eine Antwort geben (richtig oder falsch) und die Rückmeldung abwarten */
function answer(s: StereoSession, t: number, right: boolean): number {
  const wrong = LOCATIONS.find((l) => l !== s.location) as Location;
  s.answer(right ? s.location : wrong, t + 700);
  return advance(s, t + 700, 800);
}

describe('Einstellungen', () => {
  it('Standard: 24 Durchgänge, Start 600 ″, automatisch, Feld 14 cm, Quadrat 5 cm, 600 Punkte, Punkt 0,25 cm, Rauschen ein', () => {
    expect(params()).toMatchObject({ trials: 24, startArcsec: 600, control: 'adaptive', fieldCm: 14, regionCm: 5, dots: 600, dotCm: 0.25, noise: true, leftLens: 'red', tones: 'redgreen', glassesCheck: 'steps' });
  });

  it('Grenzen und ungültige Werte', () => {
    expect(params({ trials: 3 }).trials).toBe(8);
    expect(params({ trials: 500 }).trials).toBe(80);
    expect(params({ startArcsec: 1 }).startArcsec).toBe(20);
    expect(params({ startArcsec: 99999 }).startArcsec).toBe(3600);
    expect(params({ dots: 10 }).dots).toBe(150);
    expect(params({ dots: 5000 }).dots).toBe(1500);
    expect(params({ control: 'bogus', noise: 'maybe' })).toMatchObject({ control: 'adaptive', noise: true });
    expect(params({ noise: 'off' }).noise).toBe(false);
    expect(stereoParams({})).toMatchObject({ trials: 24, control: 'adaptive' });
  });

  it('Variantenschlüssel: Startwert und Steuerungsart gehören dazu, Prüfbild-Ansicht nicht', () => {
    const key = (o: Record<string, unknown>) => variantKey(PARAMS, sanitizeParams(PARAMS, o));
    expect(key({ control: 'fixed' })).not.toBe(key({}));
    expect(key({ control: 'trainer' })).toContain('control=trainer');
    expect(key({ startArcsec: 400 })).toContain('startArcsec=400');
    expect(key({ startArcsec: 400 })).not.toBe(key({}));
    expect(key({ noise: 'off' })).not.toBe(key({}));
    expect(key({ glassesCheck: 'simple' })).toBe(key({}));
  });
});

describe('Szene: Zufallspunkte und Quadrat', () => {
  const p = params({ dots: 1500, fieldCm: 14, regionCm: 5 });

  it('Anzahl, Lage im Feld, Quadrat liegt in der gewählten Richtung, alle vier Lagen kommen vor', () => {
    const rng = createRng(3);
    for (const loc of LOCATIONS) {
      const sc = makeScene(rng, p, loc);
      expect(sc.dots).toHaveLength(1500);
      for (const d of sc.dots) {
        expect(Math.abs(d.x)).toBeLessThanOrEqual(7);
        expect(Math.abs(d.y)).toBeLessThanOrEqual(7);
        expect(d.k).toBeGreaterThanOrEqual(-1);
        expect(d.k).toBeLessThanOrEqual(1);
      }
      const r = sc.region;
      expect(r.size).toBe(5);
      if (loc === 'up') expect(r.y < 0 && r.x === 0).toBe(true);
      if (loc === 'down') expect(r.y > 0 && r.x === 0).toBe(true);
      if (loc === 'left') expect(r.x < 0 && r.y === 0).toBe(true);
      if (loc === 'right') expect(r.x > 0 && r.y === 0).toBe(true);
      // Quadrat liegt ganz im Feld
      expect(Math.abs(r.x) + r.size / 2).toBeLessThanOrEqual(7);
      expect(Math.abs(r.y) + r.size / 2).toBeLessThanOrEqual(7);
      const inside = sc.dots.filter((d) => d.inside);
      expect(inside.length).toBeGreaterThan(100);
      for (const d of inside) {
        expect(Math.abs(d.x - r.x)).toBeLessThanOrEqual(2.5 + 1e-9);
        expect(Math.abs(d.y - r.y)).toBeLessThanOrEqual(2.5 + 1e-9);
      }
      for (const d of sc.dots.filter((q) => !q.inside)) expect(Math.abs(d.x - r.x) > 2.5 || Math.abs(d.y - r.y) > 2.5).toBe(true);
    }
  });

  it('das Quadrat ist höchstens 60 % des Feldes und liegt auch im kleinsten Feld ganz darin', () => {
    expect(regionSize(8, 10)).toBeCloseTo(4.8, 10);
    expect(regionSize(14, 5)).toBe(5);
    const small = params({ fieldCm: 8, regionCm: 10, dots: 300 });
    for (const loc of LOCATIONS) {
      const sc = makeScene(createRng(2), small, loc);
      expect(sc.region.size).toBeCloseTo(4.8, 10);
      expect(Math.abs(sc.region.x) + sc.region.size / 2).toBeLessThanOrEqual(4 + 1e-9);
      expect(Math.abs(sc.region.y) + sc.region.size / 2).toBeLessThanOrEqual(4 + 1e-9);
    }
  });

  it('Zufall nur über den übergebenen Rng: gleicher Startwert gleiche Szene, anderer Startwert andere', () => {
    const a = makeScene(createRng(9), p, 'left');
    const b = makeScene(createRng(9), p, 'left');
    const c = makeScene(createRng(10), p, 'left');
    expect(a).toEqual(b);
    expect(a.dots[0]).not.toEqual(c.dots[0]);
  });

  it('Disparität: im Quadrat sign × dcm (positiv = gekreuzt, näher), Hintergrund bei Rauschen zwischen −2 und +2 × dcm, ohne Rauschen 0', () => {
    const sc = makeScene(createRng(4), p, 'up');
    const dcm = arcsecToCm(600, 40);
    const inside = sc.dots.filter((d) => d.inside);
    const outside = sc.dots.filter((d) => !d.inside);
    for (const sign of [1, -1] as const) {
      for (const d of inside) expect(dotDisparityCm(d, sign, dcm, true)).toBeCloseTo(sign * dcm, 12);
      for (const d of inside) expect(dotDisparityCm(d, sign, dcm, false)).toBeCloseTo(sign * dcm, 12);
    }
    const noisy = outside.map((d) => dotDisparityCm(d, 1, dcm, true));
    for (const v of noisy) expect(Math.abs(v)).toBeLessThanOrEqual(2 * dcm + 1e-12);
    expect(noisy.some((v) => v > 0) && noisy.some((v) => v < 0)).toBe(true);
    for (const d of outside) expect(dotDisparityCm(d, 1, dcm, false)).toBe(0);
  });
});

describe('Ablauf', () => {
  it('ein Durchgang: zeigen, eine Antwort, Rückmeldung, nächster Durchgang; nach allen Durchgängen Ende', () => {
    const s = make({ trials: 8 });
    expect(s.phase).toBe('show');
    expect(s.scene).not.toBeNull();
    let t = 0;
    for (let i = 0; i < 8; i++) {
      expect(s.phase).toBe('show');
      const tr = s.answer(s.location, t + 600);
      expect(tr?.correct).toBe(true);
      expect(s.answer('up', t + 610)).toBeNull(); // nur eine Antwort je Durchgang
      expect(s.phase).toBe('feedback');
      t = advance(s, t + 600, 800);
    }
    expect(s.finished).toBe(true);
    expect(s.phase).toBe('done');
    expect(s.trials).toHaveLength(8);
    expect(s.trials.map((x) => x.nr)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(s.answer('up', t)).toBeNull();
  });

  it('Antwort wird bewertet, mit Antwortzeit, Tiefe (vor/hinter) und der angezeigten Disparität', () => {
    const s = make({ trials: 8, control: 'fixed', startArcsec: 640 });
    const loc = s.location;
    const sign = s.sign;
    const wrong = LOCATIONS.find((l) => l !== loc) as Location;
    const tr = s.answer(wrong, 750)!;
    expect(tr).toMatchObject({ nr: 1, location: loc, answer: wrong, correct: false, arcsec: 640, rtMs: 750, depth: sign > 0 ? 'near' : 'far' });
    expect(s.last).toBe(tr);
  });

  it('alle vier Lagen und beide Tiefen kommen über viele Durchgänge vor', () => {
    const seen = new Set<string>();
    const depths = new Set<string>();
    for (let seed = 1; seed < 80; seed++) {
      const s = make({ trials: 8 }, seed);
      seen.add(s.location);
      depths.add(s.sign > 0 ? 'near' : 'far');
    }
    expect(seen.size).toBe(4);
    expect(depths.size).toBe(2);
  });

  it('Rückmeldung dauert 700 ms, davor kein neuer Durchgang', () => {
    const s = make({ trials: 8 });
    s.answer(s.location, 500);
    advance(s, 500, 600);
    expect(s.phase).toBe('feedback');
    advance(s, 1100, 300);
    expect(s.phase).toBe('show');
    expect(s.idx).toBe(1);
  });
});

describe('Disparitätssteuerung', () => {
  it('automatisch (Stufenverfahren): zwei richtige in Folge → kleiner (×0,8), ein Fehler → größer (×1,25), nie unter 20 und nie über 3600', () => {
    const s = make({ trials: 40, control: 'adaptive', startArcsec: 600 });
    let t = 0;
    expect(s.arcsec).toBe(600);
    t = answer(s, t, true);
    expect(s.arcsec).toBe(600); // erst die zweite richtige Antwort in Folge macht es schwerer
    t = answer(s, t, true);
    expect(s.arcsec).toBe(480);
    t = answer(s, t, false);
    expect(s.arcsec).toBe(600);
    const seen: number[] = [];
    for (let i = 0; i < 30; i++) {
      t = answer(s, t, true);
      seen.push(s.arcsec);
    }
    expect(Math.min(...seen)).toBeGreaterThanOrEqual(MIN_ARCSEC);
    expect(s.arcsec).toBeLessThan(100);
    const hi = make({ trials: 40, control: 'adaptive', startArcsec: 3000 });
    let t2 = 0;
    for (let i = 0; i < 10; i++) t2 = answer(hi, t2, false);
    expect(hi.arcsec).toBe(MAX_ARCSEC);
  });

  it('fest: immer der Startwert, egal wie geantwortet wird', () => {
    const s = make({ trials: 12, control: 'fixed', startArcsec: 300 });
    let t = 0;
    for (let i = 0; i < 6; i++) {
      t = answer(s, t, i % 2 === 0);
      expect(s.arcsec).toBe(300);
    }
    expect(s.stair).toBeNull();
  });

  it('Trainer: Start = Startwert, nur der Regler ändert die Disparität (0 … 3600), Antworten ändern nichts', () => {
    const s = make({ trials: 12, control: 'trainer', startArcsec: 500 });
    expect(s.trainerMode).toBe(true);
    expect(s.arcsec).toBe(500);
    let t = answer(s, 0, true);
    t = answer(s, t, true);
    expect(s.arcsec).toBe(500);
    s.setLive(700, t);
    t = advance(s, t, 400);
    expect(s.arcsec).toBe(700);
    for (let i = 0; i < 20; i++) {
      s.setLive(s.live.target - 400, t);
      t = advance(s, t, 300);
    }
    expect(s.arcsec).toBe(0);
    for (let i = 0; i < 20; i++) {
      s.setLive(s.live.target + 400, t);
      t = advance(s, t, 300);
    }
    expect(s.arcsec).toBe(MAX_ARCSEC);
  });

  it('automatisch und fest: der Regler legt einen Zusatz auf den Ausgangswert (nie unter 20, nie über 3600)', () => {
    const s = make({ trials: 12, control: 'fixed', startArcsec: 300 });
    s.setLive(400, 0);
    advance(s, 0, 500);
    expect(s.arcsec).toBe(700);
    s.setLive(0, 600);
    advance(s, 600, 500);
    expect(s.arcsec).toBe(300);
    for (let i = 0; i < 6; i++) s.setLive(s.live.target - 400, 1200 + i);
    advance(s, 1200, 500);
    expect(s.arcsec).toBe(MIN_ARCSEC);
    const a = make({ trials: 12, control: 'adaptive', startArcsec: 600 });
    a.setLive(400, 0);
    advance(a, 0, 500);
    expect(a.arcsec).toBe(1000);
    expect(a.targetArcsec).toBe(1000);
  });

  it('ohne verfügbaren Regler bleibt „Trainer“ bei der eingestellten Disparität (fest)', () => {
    const s = make({ trials: 12, control: 'trainer', startArcsec: 500 }, 5, false);
    expect(s.trainerMode).toBe(false);
    let t = answer(s, 0, true);
    t = answer(s, t, false);
    expect(s.arcsec).toBe(500);
  });

  it('Regler: nie mehr als 400 ″ je Änderung, Anzeige gleitet in mindestens 150 ms, Protokoll mit Zeitpunkt, Wert, Durchgang, Gesamtwert', () => {
    const s = make({ trials: 12, control: 'fixed', startArcsec: 600 });
    expect(LIVE_COARSE_ARCSEC).toBe(400);
    expect(LIVE_STEP_ARCSEC).toBe(100);
    let t = advance(s, 0, 1000);
    expect(s.setLive(9999, t)).toBe(400);
    expect(s.arcsec).toBe(600);
    let steps = 0;
    while (!s.live.settled && steps++ < 600) {
      t += 1000 / 60;
      s.update(t);
      expect(s.arcsec).toBeLessThanOrEqual(1000);
    }
    expect(steps * (1000 / 60)).toBeGreaterThanOrEqual(150);
    expect(s.arcsec).toBe(1000);
    expect(s.live.log).toHaveLength(1);
    expect(s.live.log[0]).toMatchObject({ value: 400, trial: 1, total: 1000 });
    expect(s.live.log[0].t).toBe(Math.round(s.live.log[0].t));
    expect(s.setLive(400, t)).toBeNull();
    t = answer(s, t, true);
    s.setLive(300, t);
    expect(s.live.log[1]).toMatchObject({ value: 300, trial: 2, total: 900 });
  });

  it('Regler wirkt nicht vor dem Start und nach dem Ende', () => {
    const s = new StereoSession(params({ trials: 8 }), { rng: createRng(1), ...CALIB, trainerAvailable: true });
    expect(s.setLive(100, 0)).toBeNull();
  });
});

describe('Pixelgrenze und Umrechnung', () => {
  it('feinste Stufe = Disparität eines Pixels, aus Abstand und Pixeln je cm; Versatz in cm folgt der Sehentfernung', () => {
    const s = make({ trials: 8 });
    expect(s.pixelArcsec).toBeCloseTo(pixelArcsec(40, 38), 9);
    expect(s.pixelArcsec).toBeCloseTo(135.7, 1);
    const far = new StereoSession(params({ trials: 8 }), { rng: createRng(1), distCm: 80, pxPerCm: 38, trainerAvailable: true });
    expect(far.pixelArcsec).toBeLessThan(s.pixelArcsec);
    const fine = new StereoSession(params({ trials: 8 }), { rng: createRng(1), distCm: 40, pxPerCm: 110, trainerAvailable: true });
    expect(fine.pixelArcsec).toBeLessThan(s.pixelArcsec);
    const f = make({ trials: 8, control: 'fixed', startArcsec: 600 });
    expect(f.disparityCm).toBeCloseTo(arcsecToCm(600, 40), 12);
  });
});

describe('Auswertung', () => {
  const trial = (o: Partial<StereoTrial>): StereoTrial => ({ nr: 1, location: 'up', answer: 'up', depth: 'near', correct: true, arcsec: 600, rtMs: 800, liveChanges: 0, ...o });

  it('Anteil richtig, Antwortzeit, letzte/kleinste/größte Disparität', () => {
    const sum = summarize([trial({ arcsec: 600 }), trial({ correct: false, arcsec: 480, rtMs: 1200 }), trial({ arcsec: 384, rtMs: 1000 }), trial({ arcsec: 480, rtMs: 1000 })]);
    expect(sum).toMatchObject({ n: 4, correct: 3, accuracy: 75, rtMean: 1000, finalArcsec: 480, minArcsec: 384, maxArcsec: 600 });
  });

  it('leer: keine NaN, alles null', () => {
    const e = summarize([]);
    expect(e).toMatchObject({ n: 0, correct: 0, accuracy: null, rtMean: null, finalArcsec: null, minArcsec: null, maxArcsec: null, nearChance: false });
    expect(JSON.stringify(e)).not.toMatch(/NaN/);
  });

  it('Zufallsniveau: nur mit mindestens 12 Durchgängen und nahe 25 % „nahe am Zufall“', () => {
    const wrongs = (n: number, k: number) => Array.from({ length: n }, (_, i) => trial({ correct: i < k }));
    expect(summarize(wrongs(12, 3)).nearChance).toBe(true); // 25 %
    expect(summarize(wrongs(12, 4)).nearChance).toBe(true); // 33 %
    expect(summarize(wrongs(12, 8)).nearChance).toBe(false);
    expect(summarize(wrongs(8, 2)).nearChance).toBe(false); // zu wenige Durchgänge
    expect(CHANCE_PCT).toBe(25);
  });

  it('Tipps nach den eigenen Faustregeln, Punkte', () => {
    const many = (k: number) => summarize(Array.from({ length: 20 }, (_, i) => trial({ correct: i < k })));
    expect(tipFor(summarize([]))).toBe('few');
    expect(tipFor(many(5))).toBe('chance');
    expect(tipFor(many(19))).toBe('harder');
    expect(tipFor(many(14))).toBe('compare');
    expect(pointsFor(7)).toBe(70);
  });

  it('Regleränderungen werden summiert', () => {
    expect(summarize([trial({ liveChanges: 2 }), trial({ liveChanges: 1 })]).liveChanges).toBe(3);
  });
});

describe('Anordnung', () => {
  const stages = [
    { name: 'Tablet quer', w: 1180, h: 770 },
    { name: 'Tablet hoch', w: 820, h: 1120 },
    { name: 'Handy', w: 390, h: 640 },
    { name: 'Handy quer', w: 780, h: 290 },
  ];
  for (const st of stages) {
    it(`${st.name}: vier Tasten ≥ 56 px in einer Reihe, Feld quadratisch zwischen Hinweiszeile und Tasten, alles auf der Bühne`, () => {
      const u = Math.min(st.w, st.h) / 100;
      const L = stereoLayout({ w: st.w, h: st.h, u, captionReserve: 0, demo: false, wantFieldPx: 14 * 38 });
      expect(L.buttons).toHaveLength(4);
      for (let i = 0; i < 4; i++) {
        const r = L.buttons[i];
        expect(r.w).toBeGreaterThanOrEqual(56 - 1e-9);
        expect(r.h).toBeGreaterThanOrEqual(56);
        expect(r.x).toBeGreaterThanOrEqual(-0.5);
        expect(r.x + r.w).toBeLessThanOrEqual(st.w + 0.5);
        expect(r.y + r.h).toBeLessThanOrEqual(st.h + 0.5);
        if (i > 0) expect(L.buttons[i - 1].x + L.buttons[i - 1].w).toBeLessThanOrEqual(r.x + 0.5);
        expect(r.y).toBe(L.buttons[0].y);
      }
      expect(L.cx - L.field / 2).toBeGreaterThanOrEqual(-0.5);
      expect(L.cx + L.field / 2).toBeLessThanOrEqual(st.w + 0.5);
      expect(L.cy + L.field / 2).toBeLessThanOrEqual(L.buttons[0].y + 0.5);
      expect(L.cy - L.field / 2).toBeGreaterThanOrEqual(L.msgY - 0.5);
      expect(L.field).toBeGreaterThan(0);
    });
  }

  it('Tablet quer: Feld behält die gewünschte Größe; kleine Bühne: Feld wird begrenzt', () => {
    expect(stereoLayout({ w: 1180, h: 770, u: 7.7, captionReserve: 0, demo: false, wantFieldPx: 14 * 38 }).field).toBe(14 * 38);
    expect(stereoLayout({ w: 390, h: 640, u: 3.9, captionReserve: 0, demo: false, wantFieldPx: 26 * 38 }).field).toBeLessThan(26 * 38);
  });

  it('Film: Platz für Bildunterschrift, Tasten dürfen schrumpfen', () => {
    const L = stereoLayout({ w: 520, h: 300, u: 3, captionReserve: 70, demo: true, wantFieldPx: 9 * 23 });
    expect(L.buttons[0].y + L.buttons[0].h).toBeLessThanOrEqual(300 - 70 + 0.5);
  });
});

describe('Definition', () => {
  it('Kennung, Kategorie, Marke labor, Kalibrierung, keine Stufen', () => {
    expect(laborStereo).toMatchObject({ id: 'labor-stereo', category: 'wahrnehmung', tags: ['labor'], showsLevel: false, usesCalibration: true });
    expect(laborStereo.liveControls?.[0]).toMatchObject({ key: 'disparity', unit: '″', step: LIVE_STEP_ARCSEC, coarseStep: LIVE_COARSE_ARCSEC });
  });
});
