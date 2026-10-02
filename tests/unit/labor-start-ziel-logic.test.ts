/**
 * Start-Ziel-Reaktion (Labor): reine Logik. Übertragen aus labor/test/sprint.test.js (Labor-Prototyp) und erweitert:
 * Zeiten in ms, Koordinaten in cm, Zufall über createRng (kein Math.random), keine festen Zufallswerte.
 */
import { describe, expect, it } from 'vitest';
import { defaultParams, sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import {
  GO_TIMEOUT_MS,
  HOME_R_CM,
  MIN_RT_MS,
  MOVE_TIMEOUT_MS,
  PARAMS,
  pointsFor,
  SLACK_CM,
  SprintSession,
  sprintParams,
  tipFor,
  type SprintSummary,
} from '../../src/exercises/labor-start-ziel/logic';

function make(over: Record<string, unknown> = {}, seed = 1, extra: { w?: number; h?: number; minHit?: number } = {}): SprintSession {
  const p = sprintParams(sanitizeParams(PARAMS, { ...defaultParams(PARAMS), ...over }));
  const s = new SprintSession(p, { rng: createRng(seed), fieldWcm: extra.w ?? 60, fieldHcm: extra.h ?? 34, minHitRadiusCm: extra.minHit });
  s.start(0);
  return s;
}

/** Ein erfolgreicher Durchgang; liefert die Zeit nach dem Tipp */
function playHit(s: SprintSession, t: number, rt = 250, mt = 300): number {
  s.homeDown(t);
  const go = s.onsetAt;
  s.update(go);
  s.homeUp(go + rt);
  s.tap(s.target!.x, s.target!.y, go + rt + mt);
  return go + rt + mt + 100;
}

describe('Start-Ziel-Reaktion: Ziel (aus dem Prototyp)', () => {
  it('Zielposition „oben“ liegt senkrecht über der Startfläche', () => {
    const s = make({ distanceCm: 20 });
    const t = s.pickTarget();
    expect(Math.abs(t.x - s.home.x)).toBeLessThan(1e-9);
    expect(Math.abs(t.y - (s.home.y - 20))).toBeLessThan(1e-9);
  });

  it('Zufällige Zielposition bleibt im Feld und im Abstand', () => {
    const s = make({ target: 'random', distanceCm: 25, targetCm: 6 }, 9);
    for (let i = 0; i < 200; i++) {
      const t = s.pickTarget();
      expect(t.x).toBeGreaterThanOrEqual(3);
      expect(t.x).toBeLessThanOrEqual(57);
      expect(t.y).toBeGreaterThanOrEqual(3);
      expect(t.y).toBeLessThanOrEqual(31);
    }
  });

  it('zufällige Richtung: bis etwa 60 Grad nach beiden Seiten, Abstand zur Startfläche bleibt, wo es das Feld erlaubt', () => {
    const s = make({ target: 'random', distanceCm: 15, targetCm: 3 }, 4);
    const xs: number[] = [];
    for (let i = 0; i < 300; i++) {
      const t = s.pickTarget();
      xs.push(t.x - s.home.x);
      expect(Math.hypot(t.x - s.home.x, t.y - s.home.y)).toBeCloseTo(15, 6);
    }
    expect(Math.min(...xs)).toBeLessThan(-8);
    expect(Math.max(...xs)).toBeGreaterThan(8);
    expect(Math.max(...xs.map(Math.abs))).toBeLessThanOrEqual(15 * Math.sin(Math.PI / 3) + 1e-9);
  });

  it('kleines Feld: Abstand wird so begrenzt, dass das Ziel im Feld bleibt und die Startfläche nicht überdeckt', () => {
    const s = make({ distanceCm: 60, targetCm: 12 }, 2, { w: 10, h: 22 });
    const t = s.pickTarget();
    expect(t.y - 6).toBeGreaterThanOrEqual(-1e-9);
    expect(t.y + 6).toBeLessThanOrEqual(22 + 1e-9);
    expect(t.x).toBeGreaterThanOrEqual(Math.min(6, 5) - 1e-9);
    // sehr kleines Feld (Intro-Film): kein Fehler, Ziel im Feld
    const f = make({ distanceCm: 40, targetCm: 5 }, 2, { w: 18, h: 7.5 });
    const u = f.pickTarget();
    expect(u.y).toBeGreaterThanOrEqual(0);
    expect(u.y).toBeLessThanOrEqual(7.5);
  });
});

describe('Start-Ziel-Reaktion: Ablauf (aus dem Prototyp)', () => {
  it('halten, Ziel erscheint, loslassen, berühren', () => {
    const s = make({ minDelayMs: 1000, maxDelayMs: 1000 });
    expect(s.homeDown(100)).toEqual({ type: 'armed' });
    s.update(1099);
    expect(s.state).toBe('armed');
    s.update(1100);
    expect(s.state).toBe('go');
    expect(s.target).toBeTruthy();
    const up = s.homeUp(1380);
    expect(up).toEqual({ type: 'released', rt: 280 });
    const res = s.tap(s.target!.x, s.target!.y, 1700);
    expect(res).toEqual({ type: 'hit', rt: 280, mt: 320 });
    expect(s.state).toBe('idle');
    expect(s.trials[0].outcome).toBe('hit');
    expect(s.trials[0]).toMatchObject({ rtMs: 280, mtMs: 320 });
  });

  it('Fehlstart: zu früh losgelassen', () => {
    const s = make({ minDelayMs: 1000, maxDelayMs: 1000 });
    s.homeDown(0);
    expect(s.homeUp(500)).toEqual({ type: 'false_start' });
    expect(s.falseStarts).toBe(1);
    expect(s.state).toBe('idle');
    expect(s.trials.length).toBe(0);
    expect(s.done).toBe(0);
    expect(s.lastEvent).toEqual({ type: 'false_start', t: 500 });
  });

  it('Fehltipp neben das Ziel, danach Treffer', () => {
    const s = make({ minDelayMs: 500, maxDelayMs: 500 });
    s.homeDown(0);
    s.update(500);
    s.homeUp(700);
    expect(s.tap(0, 0, 800)).toEqual({ type: 'miss_tap' });
    expect(s.errorTaps).toBe(1);
    expect(s.state).toBe('moving');
    expect(s.tap(s.target!.x, s.target!.y, 900)!.type).toBe('hit');
  });

  it('Zeitüberschreitungen: nicht losgelassen, Ziel nicht erreicht', () => {
    const a = make({ minDelayMs: 500, maxDelayMs: 500 });
    a.homeDown(0);
    a.update(500);
    a.update(500 + GO_TIMEOUT_MS - 1);
    expect(a.state).toBe('go');
    a.update(500 + GO_TIMEOUT_MS);
    expect(a.trials[0].outcome).toBe('no_release');
    expect(a.trials[0].rtMs).toBeNull();
    expect(a.state).toBe('idle');
    expect(a.lastEvent!.type).toBe('no_release');
    const b = make({ minDelayMs: 500, maxDelayMs: 500 });
    b.homeDown(0);
    b.update(500);
    b.homeUp(650);
    b.update(650 + MOVE_TIMEOUT_MS - 1);
    expect(b.state).toBe('moving');
    b.update(650 + MOVE_TIMEOUT_MS);
    expect(b.trials[0].outcome).toBe('no_target');
    expect(b.trials[0].rtMs).toBe(150);
    expect(b.trials[0].mtMs).toBeNull();
    expect(b.target).toBeNull();
  });

  it('Nur im Leerlauf kann die Startfläche gedrückt werden; Treffer an der Startfläche', () => {
    const s = make({});
    expect(s.inHome(s.home.x, s.home.y)).toBe(true);
    expect(s.inHome(0, 0)).toBe(false);
    s.homeDown(0);
    expect(s.homeDown(10)).toBeNull();
  });

  it('Ende nach allen Durchgängen; Kennzahlen (Prototyp-Test)', () => {
    const s = make({ trials: 5, minDelayMs: 500, maxDelayMs: 500 });
    let t = 0;
    for (let i = 0; i < 5; i++) {
      s.homeDown(t);
      t += 500;
      s.update(t);
      s.homeUp(t + 200 + i * 10);
      s.tap(s.target!.x, s.target!.y, t + 200 + i * 10 + 300);
      t += 1000;
    }
    expect(s.finished).toBe(true);
    expect(s.state).toBe('done');
    const sum = s.summary();
    expect(sum.hits).toBe(5);
    expect(sum.rtMean).toBe(220);
    expect(sum.rtMedian).toBe(220);
    expect(sum.mtMean).toBe(300);
    expect(s.homeDown(t)).toBeNull();
  });
});

describe('Start-Ziel-Reaktion: Ergänzungen', () => {
  it('Loslassen in den ersten 100 ms nach dem Aufleuchten ist ein Fehlstart, nicht eine Reaktion', () => {
    const s = make({ minDelayMs: 500, maxDelayMs: 500 });
    s.homeDown(0);
    s.update(500);
    expect(s.homeUp(500 + MIN_RT_MS - 1)).toEqual({ type: 'false_start' });
    expect(s.falseStarts).toBe(1);
    expect(s.state).toBe('idle');
    expect(s.target).toBeNull();
    // genau 100 ms ist schon eine Reaktion
    s.homeDown(1000);
    s.update(s.onsetAt);
    expect(s.homeUp(s.onsetAt + MIN_RT_MS)).toMatchObject({ type: 'released', rt: MIN_RT_MS });
  });

  it('Loslassen vor der Anzeigezeit (Ereigniszeit vor der Bildzeit) ergibt nie eine negative Zeit', () => {
    const s = make({ minDelayMs: 500, maxDelayMs: 500 });
    s.homeDown(0);
    s.update(500);
    expect(s.homeUp(497)).toEqual({ type: 'false_start' });
  });

  it('Loslassen im Leerlauf oder beim Bewegen ist wirkungslos', () => {
    const s = make({ minDelayMs: 500, maxDelayMs: 500 });
    expect(s.homeUp(10)).toBeNull();
    s.homeDown(0);
    s.update(500);
    s.homeUp(800);
    expect(s.homeUp(900)).toBeNull();
  });

  it('Wartezeit liegt zwischen Minimum und Maximum und streut; Maximum unter dem Minimum wird angehoben', () => {
    const seen = new Set<number>();
    for (let seed = 1; seed <= 60; seed++) {
      const s = make({ minDelayMs: 1000, maxDelayMs: 3500 }, seed);
      s.homeDown(2000);
      expect(s.onsetAt).toBeGreaterThanOrEqual(3000);
      expect(s.onsetAt).toBeLessThanOrEqual(5500);
      seen.add(Math.round(s.onsetAt / 100));
    }
    expect(seen.size).toBeGreaterThan(15);
    const t = make({ minDelayMs: 2000, maxDelayMs: 500 });
    t.homeDown(0);
    expect(t.onsetAt).toBe(2000);
  });

  it('Tipp außerhalb von „Bewegen“ (Leerlauf, Warten, vor dem Loslassen) zählt nicht als Fehltipp', () => {
    const s = make({ minDelayMs: 500, maxDelayMs: 500 });
    expect(s.tap(5, 5, 10)).toBeNull();
    s.homeDown(0);
    expect(s.tap(5, 5, 100)).toBeNull();
    s.update(500);
    expect(s.tap(s.target!.x, s.target!.y, 700)).toBeNull(); // zweiter Finger, erster noch auf START
    expect(s.errorTaps).toBe(0);
    expect(s.state).toBe('go');
  });

  it('Trefferfläche: Zielradius plus Toleranz, mindestens ein Touch-Ziel', () => {
    const s = make({ minDelayMs: 500, maxDelayMs: 500, targetCm: 1.5 }, 1, { minHit: 24 / 38 });
    expect(s.targetHitRadius).toBeGreaterThanOrEqual(24 / 38);
    expect(s.targetHitRadius).toBeCloseTo(Math.max(0.75 + SLACK_CM, 24 / 38), 9);
    expect(s.homeHitRadius).toBeGreaterThanOrEqual(HOME_R_CM + SLACK_CM);
    s.homeDown(0);
    s.update(500);
    s.homeUp(700);
    const tg = s.target!;
    expect(s.tap(tg.x + s.targetHitRadius - 0.01, tg.y, 800)!.type).toBe('hit');
  });

  it('Drehen des Tablets: Startfläche und sichtbares Ziel werden ins neue Feld gesetzt', () => {
    const s = make({ minDelayMs: 500, maxDelayMs: 500, distanceCm: 30, targetCm: 4 });
    s.homeDown(0);
    s.update(500);
    s.setField(34, 60);
    expect(s.home.x).toBeCloseTo(17, 9);
    expect(s.home.y).toBeCloseTo(Math.max(60 - HOME_R_CM - 1, 48), 9);
    const tg = s.target!;
    expect(tg.x).toBeGreaterThanOrEqual(2);
    expect(tg.x).toBeLessThanOrEqual(32);
    expect(tg.y).toBeGreaterThanOrEqual(2);
    expect(tg.y).toBeLessThanOrEqual(58);
    s.setField(18, 7.5, 2.5);
    expect(s.target!.y).toBeLessThanOrEqual(7.5);
    expect(s.targetR).toBe(1.25);
  });
});

describe('Start-Ziel-Reaktion: Kennzahlen', () => {
  it('mittlere Reaktionszeit zählt auch Durchgänge, in denen das Ziel danach nicht erreicht wurde', () => {
    const s = make({ trials: 5, minDelayMs: 500, maxDelayMs: 500 });
    let t = playHit(s, 0, 300, 400);
    // zweiter Durchgang: losgelassen (500 ms), Ziel nicht berührt
    s.homeDown(t);
    s.update(s.onsetAt);
    s.homeUp(s.onsetAt + 500);
    s.update(s.onsetAt + 500 + MOVE_TIMEOUT_MS);
    t = s.onsetAt + 500 + MOVE_TIMEOUT_MS + 100;
    const sum = s.summary();
    expect(sum.done).toBe(2);
    expect(sum.hits).toBe(1);
    expect(sum.rtMean).toBe(400);
    expect(sum.mtMean).toBe(400);
    expect(sum.rtSd).toBeCloseTo(141, 0);
  });

  it('ohne Durchgang: keine Zeiten statt NaN; nur nicht-losgelassene Durchgänge: keine Reaktionszeit', () => {
    const e = make().summary();
    expect(e.rtMean).toBeNull();
    expect(e.rtSd).toBeNull();
    expect(e.mtMean).toBeNull();
    expect(e.done).toBe(0);
    const s = make({ trials: 5, minDelayMs: 500, maxDelayMs: 500 });
    s.homeDown(0);
    s.update(500);
    s.update(500 + GO_TIMEOUT_MS);
    const sum = s.summary();
    expect(sum.noRelease).toBe(1);
    expect(sum.rtMean).toBeNull();
    expect(sum.hits).toBe(0);
    expect(Number.isFinite(sum.done)).toBe(true);
  });

  it('ein einziger Durchgang: Streuung fehlt statt 0/NaN', () => {
    const s = make({ trials: 5, minDelayMs: 500, maxDelayMs: 500 });
    playHit(s, 0, 260, 310);
    const sum = s.summary();
    expect(sum.rtMean).toBe(260);
    expect(sum.rtSd).toBeNull();
    expect(sum.mtMean).toBe(310);
  });

  it('Einstellungen werden bereinigt', () => {
    const p = sprintParams(sanitizeParams(PARAMS, { trials: 1, minDelayMs: 9999, maxDelayMs: 0, distanceCm: 99, targetCm: 2.3, target: 'x', sound: 7 }));
    expect(p).toEqual({ trials: 5, minDelayMs: 5000, maxDelayMs: 500, distanceCm: 60, targetCm: 2.5, target: 'top', sound: 'no' });
    expect(sprintParams(defaultParams(PARAMS))).toEqual({ trials: 15, minDelayMs: 1000, maxDelayMs: 3500, distanceCm: 20, targetCm: 4, target: 'top', sound: 'no' });
    expect(sprintParams({})).toEqual(sprintParams(defaultParams(PARAMS)));
  });

  it('PARAMS entsprechen dem Prototyp; nur der Ton ist neutral', () => {
    expect(PARAMS.map((d) => d.key)).toEqual(['trials', 'minDelayMs', 'maxDelayMs', 'distanceCm', 'targetCm', 'target', 'sound']);
    const num = (k: string) => PARAMS.find((d) => d.key === k) as { min: number; max: number; step: number; default: number };
    expect(num('trials')).toMatchObject({ min: 5, max: 60, step: 1, default: 15 });
    expect(num('minDelayMs')).toMatchObject({ min: 500, max: 5000, step: 100, default: 1000 });
    expect(num('maxDelayMs')).toMatchObject({ min: 500, max: 8000, step: 100, default: 3500 });
    expect(num('distanceCm')).toMatchObject({ min: 5, max: 60, step: 1, default: 20 });
    expect(num('targetCm')).toMatchObject({ min: 1.5, max: 12, step: 0.5, default: 4 });
    expect(PARAMS.filter((d) => d.neutral).map((d) => d.key)).toEqual(['sound']);
    expect(PARAMS.filter((d) => d.summary).length).toBeLessThanOrEqual(3);
  });
});

describe('Start-Ziel-Reaktion: Tipps und Punkte', () => {
  const base: SprintSummary = { hits: 14, done: 15, falseStarts: 1, errorTaps: 1, noRelease: 0, rtMean: 300, rtMedian: 290, rtSd: 40, mtMean: 400, trials: [] };
  it('Tipp-Schlüssel nach Faustregeln', () => {
    expect(tipFor({ ...base, done: 0, rtMean: null })).toBe('few');
    expect(tipFor({ ...base, rtMean: null })).toBe('few');
    expect(tipFor({ ...base, falseStarts: 6 })).toBe('false_start');
    expect(tipFor({ ...base, errorTaps: 6 })).toBe('aim');
    expect(tipFor({ ...base, noRelease: 3 })).toBe('slow');
    expect(tipFor({ ...base, hits: 15, falseStarts: 0, errorTaps: 0 })).toBe('harder');
    expect(tipFor({ ...base, rtSd: 200 })).toBe('steady');
    expect(tipFor(base)).toBe('compare');
  });
  it('Punkte: 10 je erfolgreichem Durchgang, nie negativ', () => {
    expect(pointsFor(14)).toBe(140);
    expect(pointsFor(-2)).toBe(0);
  });
});
