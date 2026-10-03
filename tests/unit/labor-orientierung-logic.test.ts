/**
 * Orientierung (Labor): reine Logik – Zustandsautomat (Pause, Ziel, Rückkehr zur Mitte, Zeitlimit), Bestätigungen der
 * Hilfsperson, Doppeltipp-Schutz, Einstellungen, Auswertung je Richtung, Anordnung der Ziele.
 */
import { describe, expect, it } from 'vitest';
import { defaultParams, sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import {
  DOUBLE_PRESS_MS,
  OrientSession,
  orientLayout,
  orientParams,
  PARAMS,
  pointsFor,
  tipFor,
  type OrientParams,
} from '../../src/exercises/labor-orientierung/logic';

const base = (o: Partial<OrientParams> = {}): OrientParams => ({ ...orientParams(defaultParams(PARAMS)), ...o });

/** Läuft, bis ein Ziel leuchtet; liefert den Zeitpunkt */
function toTarget(s: OrientSession, t0 = 0): number {
  s.start(t0);
  let t = t0;
  while (s.state !== 'target') {
    t += 50;
    s.update(t);
  }
  return t;
}

describe('Einstellungen', () => {
  it('Standardwerte wie vorgesehen; Ton gehört nicht zum Vergleichsschlüssel', () => {
    expect(orientParams(defaultParams(PARAMS))).toEqual({ trials: 24, directions: 4, returnToCenter: true, waitMs: 1500, timeoutS: 0, sizeCm: 5, sound: 'no' });
    expect(PARAMS.filter((p) => p.neutral).map((p) => p.key)).toEqual(['sound']);
    expect(PARAMS.filter((p) => p.summary).map((p) => p.key)).toEqual(['directions', 'returnToCenter']);
  });

  it('bereinigt kaputte Werte', () => {
    const p = orientParams(sanitizeParams(PARAMS, { trials: 1, directions: '5', returnToCenter: 'vielleicht', timeoutS: 99, sizeCm: 50 }));
    expect(p).toMatchObject({ trials: 8, directions: 4, returnToCenter: true, timeoutS: 30, sizeCm: 10 });
    expect(orientParams({}).trials).toBe(24);
    expect(orientParams(sanitizeParams(PARAMS, { directions: '8', returnToCenter: 'no' }))).toMatchObject({ directions: 8, returnToCenter: false });
  });
});

describe('Ablauf', () => {
  it('Reihenfolge: gleichmäßig verteilte Richtungen in gemischten Runden, genau `trials` Ziele', () => {
    for (const n of [4, 8] as const) {
      const s = new OrientSession(base({ directions: n, trials: n * 3 }), { rng: createRng(5) });
      expect(s.seq).toHaveLength(n * 3);
      const count = new Array(n).fill(0);
      for (const d of s.seq) count[d]++;
      expect(count.every((c) => c === 3)).toBe(true);
    }
    expect(new OrientSession(base({ trials: 10 }), { rng: createRng(1) }).seq).toHaveLength(10);
  });

  it('Pause → Ziel → Bestätigung → Rückkehr zur Mitte → Bestätigung → nächste Pause; Zeiten stimmen', () => {
    const s = new OrientSession(base({ trials: 8, waitMs: 1000 }), { rng: createRng(2) });
    s.start(0);
    expect(s.state).toBe('wait');
    expect(s.current()).toBeNull();
    s.update(999);
    expect(s.state).toBe('wait');
    s.update(1000);
    expect(s.state).toBe('target');
    expect(s.current()).toBe(s.seq[0]);
    expect(s.reached(2500)?.type).toBe('reached'); // 1500 ms nach dem Aufleuchten
    expect(s.state).toBe('center');
    expect(s.current()).toBeNull();
    expect(s.reached(2500 + DOUBLE_PRESS_MS + 600)?.type).toBe('center'); // 1000 ms zurück
    expect(s.state).toBe('wait');
    const sum = s.summary();
    expect(sum.reached).toBe(1);
    expect(sum.tMean).toBe(1500);
    expect(sum.returnMean).toBe(1000);
    expect(s.trials[0]).toMatchObject({ nr: 1, dir: s.seq[0], outcome: 'reached', ms: 1500, returnMs: 1000 });
  });

  it('ohne Rückkehr zur Mitte geht es nach der Bestätigung direkt in die Pause', () => {
    const s = new OrientSession(base({ returnToCenter: false, trials: 8, waitMs: 500 }), { rng: createRng(3) });
    const t = toTarget(s);
    expect(s.reached(t + 800)?.type).toBe('reached');
    expect(s.state).toBe('wait');
    expect(s.summary().returnMean).toBeNull();
  });

  it('Bestätigungen ohne Ziel (Pause, vor dem Start, nach dem Ende) bewirken nichts', () => {
    const s = new OrientSession(base({ trials: 8, waitMs: 1000 }), { rng: createRng(4) });
    expect(s.reached(10)).toBeNull();
    expect(s.wrong(10)).toBeNull();
    s.start(0);
    expect(s.reached(500)).toBeNull();
    expect(s.wrong(500)).toBeNull();
    expect(s.summary().total).toBe(0);
  });

  it('„Falsche Richtung“ zählt, danach folgt trotzdem die Rückkehr zur Mitte; in der Mitte ist „falsch“ ohne Wirkung', () => {
    const s = new OrientSession(base({ trials: 8, waitMs: 500 }), { rng: createRng(6) });
    const t = toTarget(s);
    expect(s.wrong(t + 700)?.type).toBe('wrong');
    expect(s.state).toBe('center');
    expect(s.wrong(t + 2000)).toBeNull();
    expect(s.reached(t + 2000)?.type).toBe('center');
    const sum = s.summary();
    expect(sum.wrong).toBe(1);
    expect(sum.reached).toBe(0);
    expect(sum.tMean).toBeNull(); // nichts erreicht → keine Zeit, nie NaN
  });

  it('Doppeltipp: ein zweiter Tipp binnen 400 ms wird ignoriert (bestätigt nicht zugleich die Rückkehr)', () => {
    const s = new OrientSession(base({ trials: 8, waitMs: 500 }), { rng: createRng(7) });
    const t = toTarget(s);
    expect(s.reached(t + 900)?.type).toBe('reached');
    expect(s.reached(t + 900 + DOUBLE_PRESS_MS - 1)?.type).toBe('ignored');
    expect(s.state).toBe('center');
    expect(s.reached(t + 900 + DOUBLE_PRESS_MS)?.type).toBe('center');
  });

  it('Zeitlimit: Ziel gilt als „Zeitlimit überschritten“, danach Rückkehr (mit eigenem Limit); ohne Limit nie', () => {
    const s = new OrientSession(base({ trials: 8, waitMs: 500, timeoutS: 2 }), { rng: createRng(8) });
    const t = toTarget(s);
    s.update(t + 1999);
    expect(s.state).toBe('target');
    s.update(t + 2000);
    expect(s.state).toBe('center');
    s.update(t + 3999);
    expect(s.state).toBe('center');
    s.update(t + 4000);
    expect(s.state).toBe('wait');
    const sum = s.summary();
    expect(sum.timeouts).toBe(1);
    expect(sum.trials[0].returnMs).toBe(2000);
    const free = new OrientSession(base({ trials: 8, waitMs: 500, timeoutS: 0 }), { rng: createRng(8) });
    const t2 = toTarget(free);
    free.update(t2 + 600000);
    expect(free.state).toBe('target');
  });

  it('endet nach dem letzten Ziel; Ergebnis mit Zeiten je Richtung', () => {
    const s = new OrientSession(base({ trials: 8, waitMs: 300, returnToCenter: false }), { rng: createRng(9) });
    s.start(0);
    let t = 0;
    while (!s.finished && t < 200000) {
      t += 25;
      s.update(t);
      if (s.state === 'target' && t - s.shownAt >= 800) s.reached(t);
    }
    expect(s.finished).toBe(true);
    expect(s.state).toBe('done');
    const sum = s.summary();
    expect(sum.total).toBe(8);
    expect(sum.reached).toBe(8);
    expect(sum.perDirection.map((d) => d.dir)).toEqual([0, 1, 2, 3]);
    expect(sum.perDirection.every((d) => d.of === 2 && d.n === 2 && d.tMean !== null && d.tMean >= 800)).toBe(true);
    expect(sum.tSd).not.toBeNull();
    expect(Number.isFinite(sum.tMedian!)).toBe(true);
  });
});

describe('Tipp und Punkte', () => {
  it('Tipp-Schlüssel nach Faustregeln', () => {
    const mk = (o: Partial<ReturnType<OrientSession['summary']>>) => ({ total: 20, reached: 12, wrong: 0, timeouts: 0, tMean: 1500, tMedian: 1400, tSd: 200, returnMean: 1000, perDirection: [], trials: [], ...o });
    expect(tipFor(mk({ reached: 0 }))).toBe('few');
    expect(tipFor(mk({ wrong: 4 }))).toBe('wrong');
    expect(tipFor(mk({ timeouts: 4 }))).toBe('timeouts');
    expect(tipFor(mk({ tSd: 900 }))).toBe('steady');
    expect(tipFor(mk({}))).toBe('compare');
    expect(pointsFor(5)).toBe(50);
    expect(pointsFor(-1)).toBe(0);
  });
});

describe('Anordnung auf der Bühne', () => {
  const stages: Array<[number, number]> = [
    [390, 844],
    [320, 560],
    [820, 1180],
    [1180, 820],
    [1024, 600],
    [520, 358],
  ];

  it('Punkte liegen im Feld, überlappen nie (auch bei großem Punkt und 8 Richtungen) und lassen Platz für die Tasten', () => {
    for (const [w, h] of stages) {
      for (const n of [4, 8]) {
        for (const dotCm of [1.5, 5, 10]) {
          const u = Math.min(w, h) / 100;
          const f = { x: 10, y: Math.max(44, u * 8), w: w - 20, h: h - 10 - Math.max(44, u * 8) };
          const helperH = Math.max(56, Math.min(112, u * 12)) + Math.max(8, u * 1.5);
          const l = orientLayout(f, n, dotCm * 38, helperH, u);
          const label = `${w}x${h} n=${n} ${dotCm} cm`;
          expect(l.points).toHaveLength(n);
          for (const q of l.points) {
            expect(q.x - l.r, label).toBeGreaterThanOrEqual(f.x - 1);
            expect(q.x + l.r, label).toBeLessThanOrEqual(f.x + f.w + 1);
            expect(q.y - l.r, label).toBeGreaterThanOrEqual(f.y - 1);
            expect(q.y + l.r, label).toBeLessThanOrEqual(f.y + f.h - helperH + 1);
          }
          for (let i = 0; i < n; i++) {
            expect(Math.hypot(l.points[i].x - l.cx, l.points[i].y - l.cy), label).toBeGreaterThanOrEqual(2 * l.r);
            for (let j = i + 1; j < n; j++) {
              expect(Math.hypot(l.points[i].x - l.points[j].x, l.points[i].y - l.points[j].y), `${label} ${i}-${j}`).toBeGreaterThanOrEqual(2 * l.r - 0.01);
            }
          }
          expect(l.r, label).toBeGreaterThanOrEqual(7);
        }
      }
    }
  });

  it('Richtung 0 liegt oben, 1 rechts (bei 4), im Uhrzeigersinn', () => {
    const l = orientLayout({ x: 0, y: 0, w: 600, h: 700 }, 4, 100, 80, 6);
    expect(l.points[0].y).toBeLessThan(l.cy);
    expect(Math.abs(l.points[0].x - l.cx)).toBeLessThan(0.001);
    expect(l.points[1].x).toBeGreaterThan(l.cx);
    expect(l.points[2].y).toBeGreaterThan(l.cy);
    expect(l.points[3].x).toBeLessThan(l.cx);
  });
});
