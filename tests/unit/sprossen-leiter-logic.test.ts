import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  beatPhase,
  beatPulse,
  LadderRun,
  LEAD_BEATS,
  levelOf,
  MAX_LEVEL,
  meanAbs,
  meanSigned,
  MIN_LEVEL,
  neededOnTime,
  periodMsFor,
  planTaps,
  pointsFor,
  rungAt,
  rungCountFor,
  rungPositions,
  toleranceMsFor,
} from '../../src/exercises/sprossen-leiter/logic';

describe('sprossen-leiter: Stufenfunktionen', () => {
  it('Takt wird schneller, nie über 2 Hz', () => {
    for (let l = MIN_LEVEL + 1; l <= MAX_LEVEL; l++) expect(periodMsFor(l)).toBeLessThan(periodMsFor(l - 1));
    expect(periodMsFor(MIN_LEVEL)).toBeCloseTo(1000);
    expect(periodMsFor(MAX_LEVEL)).toBeCloseTo(500);
    for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) expect(1000 / periodMsFor(l)).toBeLessThanOrEqual(2 + 1e-9);
  });

  it('Toleranz liegt deutlich unter einem halben Takt', () => {
    for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) expect(toleranceMsFor(l)).toBeLessThan(periodMsFor(l) / 2);
  });

  it('Sprossenzahl 4 bis 7, nimmt nie ab', () => {
    expect(rungCountFor(1)).toBe(4);
    expect(rungCountFor(6)).toBe(4);
    expect(rungCountFor(7)).toBe(5);
    expect(rungCountFor(MAX_LEVEL)).toBe(7);
    for (let l = MIN_LEVEL + 1; l <= MAX_LEVEL; l++) expect(rungCountFor(l)).toBeGreaterThanOrEqual(rungCountFor(l - 1));
  });

  it('begrenzt Stufen; Mindestzahl und Punkte', () => {
    expect(levelOf(0)).toBe(MIN_LEVEL);
    expect(periodMsFor(99)).toBeCloseTo(periodMsFor(MAX_LEVEL));
    expect(neededOnTime(4)).toBe(3);
    expect(neededOnTime(5)).toBe(4);
    expect(neededOnTime(7)).toBe(6);
    expect(pointsFor(3, 4)).toBe(32);
    expect(pointsFor(3, 0)).toBe(0);
  });
});

describe('sprossen-leiter: Anordnung', () => {
  const area = { cx: 500, top: 200, bottom: 700, dx: 100 };

  it('Zickzack von unten nach oben, abwechselnd links und rechts', () => {
    const r = rungPositions(5, area);
    expect(r).toHaveLength(5);
    expect(r[0].y).toBeCloseTo(700);
    expect(r[4].y).toBeCloseTo(200);
    r.forEach((p, i) => {
      expect(p.x).toBe(i % 2 === 0 ? 400 : 600);
      if (i) expect(p.y).toBeLessThan(r[i - 1].y);
    });
    expect(rungPositions(4, area, true)[0].x).toBe(600);
  });

  it('Treffer auf Sprossen mit Rand, sonst −1', () => {
    const r = rungPositions(4, area);
    expect(rungAt(r[1].x, r[1].y, r, 120, 60, 10)).toBe(1);
    expect(rungAt(r[1].x + 60 + 8, r[1].y, r, 120, 60, 10)).toBe(1);
    expect(rungAt(r[1].x + 60 + 40, r[1].y, r, 120, 60, 10)).toBe(-1);
    expect(rungAt(0, 0, r, 120, 60, 10)).toBe(-1);
  });
});

describe('sprossen-leiter: Taktschlag', () => {
  it('Kosinus-Hügel: 1 im Schlag, 0 weit davon, periodisch', () => {
    const P = 800;
    expect(beatPulse(0, P)).toBeCloseTo(1);
    expect(beatPulse(P, P)).toBeCloseTo(1);
    expect(beatPulse(-3 * P, P)).toBeCloseTo(1);
    expect(beatPulse(P / 2, P)).toBe(0);
    expect(beatPulse(130, P)).toBeGreaterThan(0);
    expect(beatPulse(130, P)).toBeLessThan(1);
  });

  it('Übergänge sind weich: Anstieg höchstens ca. 1 pro 100 ms', () => {
    for (const P of [500, 800, 1000]) {
      let worst = 0;
      for (let rel = -P; rel < P; rel += 1) worst = Math.max(worst, Math.abs(beatPulse(rel + 1, P) - beatPulse(rel, P)));
      // Änderung je Millisekunde ≤ 1/100 → kein Sprung unter 100 ms
      expect(worst).toBeLessThan(0.0112);
    }
  });

  it('Phase läuft 0..1 zwischen zwei Schlägen', () => {
    expect(beatPhase(0, 1000)).toBe(0);
    expect(beatPhase(250, 1000)).toBeCloseTo(0.25);
    expect(beatPhase(-250, 1000)).toBeCloseTo(0.75);
  });
});

describe('sprossen-leiter: Verlauf einer Leiter', () => {
  it('Treffer im Fenster mit Abweichung, „im Takt“ gemäß Toleranz', () => {
    const run = new LadderRun(4, 1000, 300);
    const a = run.tap(-120, 0);
    expect(a.kind).toBe('hit');
    expect(a.dev).toBe(-120);
    expect(a.onTime).toBe(true);
    const b = run.tap(1000 + 400, 1);
    expect(b.kind).toBe('hit');
    expect(b.dev).toBe(400);
    expect(b.onTime).toBe(false);
    expect(run.onTimeCount).toBe(1);
    expect(run.hitCount).toBe(2);
    expect(run.next).toBe(2);
  });

  it('falsche Sprosse, doppelter Tipp, zu früh, zu spät', () => {
    const run = new LadderRun(3, 800, 240);
    expect(run.tap(-500, 0).kind).toBe('early');
    expect(run.tap(0, 2).kind).toBe('wrong');
    expect(run.tap(50, 0).kind).toBe('dup');
    expect(run.results[0].state).toBe('wrong');
    expect(run.errorCount).toBe(1);
    expect(run.tap(3 * 800, 2).kind).toBe('late');
  });

  it('abgelaufene Fenster werden verpasst, danach ist die Leiter fertig', () => {
    const run = new LadderRun(3, 1000, 300);
    expect(run.sweep(100)).toEqual([]);
    expect(run.sweep(520)).toEqual([0]);
    expect(run.next).toBe(1);
    run.tap(1000, 1);
    expect(run.sweep(2600)).toEqual([2]);
    expect(run.done).toBe(true);
    expect(run.errorCount).toBe(2);
    expect(run.passed).toBe(false);
  });

  it('gelungen, wenn genug Sprossen im Takt sind; Abweichungen und Tendenz', () => {
    const run = new LadderRun(4, 1000, 300);
    run.tap(-40, 0);
    run.tap(1060, 1);
    run.tap(2010, 2);
    run.tap(3000 + 450, 3);
    expect(run.onTimeCount).toBe(3);
    expect(run.passed).toBe(true);
    expect(run.devs).toEqual([-40, 60, 10, 450]);
    expect(meanAbs(run.devs)).toBeCloseTo(140);
    expect(meanSigned(run.devs)).toBeCloseTo(120);
    expect(meanAbs([])).toBeNaN();
    expect(meanSigned([])).toBeNaN();
  });

  it('Fenster lückenlos: jeder Zeitpunkt ab −½ Takt gehört zu genau einem Fenster', () => {
    const run = new LadderRun(5, 700, 200);
    expect(run.windowOf(-351)).toBe(-1);
    expect(run.windowOf(-349)).toBe(0);
    expect(run.windowOf(349)).toBe(0);
    expect(run.windowOf(351)).toBe(1);
    expect(run.windowOf(4 * 700 + 349)).toBe(4);
    expect(run.windowOf(4 * 700 + 351)).toBe(5);
  });
});

describe('sprossen-leiter: Autoplay-Plan', () => {
  it('ein Eintrag je Sprosse, Zeiten liegen im jeweiligen Fenster', () => {
    const rng = createRng(9);
    for (const level of [1, 10, 20]) {
      const P = periodMsFor(level);
      const plan = planTaps(rng, 6, level);
      expect(plan).toHaveLength(6);
      plan.forEach((p, k) => {
        expect(Math.abs(p.rel - k * P)).toBeLessThan(P / 2);
        expect(p.rung).toBeLessThan(6);
      });
    }
  });

  it('Film-Plan: feste Abweichungen, nie Fehler', () => {
    const plan = planTaps(createRng(1), 4, 2, [-18, 12]);
    expect(plan.map((p) => p.rung)).toEqual([0, 1, 2, 3]);
    expect(plan[0].rel).toBeCloseTo(-18);
    expect(plan[1].rel).toBeCloseTo(periodMsFor(2) + 12);
  });

  it('meist richtig, manchmal Fehler', () => {
    const rng = createRng(4);
    let ok = 0;
    let all = 0;
    for (let i = 0; i < 100; i++) {
      planTaps(rng, 5, 8).forEach((p, k) => {
        all++;
        if (p.rung === k) ok++;
      });
    }
    expect(ok / all).toBeGreaterThan(0.85);
    expect(ok / all).toBeLessThan(1);
  });

  it('Vorlauf: drei Schläge', () => {
    expect(LEAD_BEATS).toBe(3);
  });
});
