import { describe, expect, it } from 'vitest';
import {
  deviationMs,
  isAccidentalTap,
  isSuccess,
  LADDER_MS,
  levelOf,
  MAX_LEVEL,
  rate,
  ringFraction,
  showHelpRing,
  summarize,
  targetSeries,
  timeoutMs,
  tipFor,
  toleranceMs,
  trialPoints,
} from '../../src/exercises/sekunden-gefuehl/logic';

describe('sekunden-gefuehl: Zielzeiten', () => {
  it('die Leiter steigt von 1 bis 8 s', () => {
    expect(LADDER_MS[0]).toBe(1000);
    expect(LADDER_MS[LADDER_MS.length - 1]).toBe(8000);
    for (let i = 1; i < LADDER_MS.length; i++) expect(LADDER_MS[i]).toBeGreaterThan(LADDER_MS[i - 1]);
  });

  it('liefert 6–8 Durchgänge aufsteigend, bei wenigen gleichmäßig verteilt', () => {
    expect(targetSeries(7)).toEqual([...LADDER_MS]);
    expect(targetSeries(12)).toEqual([...LADDER_MS]);
    expect(targetSeries(2)).toEqual([1000, 8000]);
    expect(targetSeries(1)).toEqual([1000]);
    const s = targetSeries(4);
    expect(s.length).toBe(4);
    expect(s[0]).toBe(1000);
    expect(s[3]).toBe(8000);
    for (let i = 1; i < s.length; i++) expect(s[i]).toBeGreaterThan(s[i - 1]);
  });
});

describe('sekunden-gefuehl: Abweichung und Bewertung', () => {
  it('rechnet die Abweichung mit Vorzeichen (− zu früh, + zu spät)', () => {
    expect(deviationMs(3120, 100, 3000)).toBe(20);
    expect(deviationMs(2950, 0, 3000)).toBe(-50);
    expect(deviationMs(3000, 0, 3000)).toBe(0);
  });

  it('Toleranz wird mit der Stufe enger, hat aber eine Untergrenze', () => {
    expect(toleranceMs(1, 3000)).toBeGreaterThan(toleranceMs(4, 3000));
    expect(toleranceMs(4, 3000)).toBeGreaterThan(toleranceMs(MAX_LEVEL, 3000));
    expect(toleranceMs(MAX_LEVEL, 1000)).toBe(100);
    expect(toleranceMs(1, 1000)).toBe(220);
    // Stufen werden begrenzt
    expect(levelOf(0)).toBe(1);
    expect(levelOf(99)).toBe(MAX_LEVEL);
    expect(toleranceMs(99, 8000)).toBe(toleranceMs(MAX_LEVEL, 8000));
  });

  it('bewertet in Stufen und nach Vorzeichen', () => {
    const tol = 200;
    expect(rate(0, tol)).toBe('exact');
    expect(rate(-50, tol)).toBe('exact');
    expect(rate(80, tol)).toBe('good');
    expect(rate(-150, tol)).toBe('near');
    expect(rate(-250, tol)).toBe('early');
    expect(rate(400, tol)).toBe('late');
    expect(isSuccess(200, tol)).toBe(true);
    expect(isSuccess(-201, tol)).toBe(false);
  });

  it('Punkte sinken mit der Abweichung und steigen mit der Stufe', () => {
    const tol = 200;
    expect(trialPoints(10, tol, 1)).toBe(100);
    expect(trialPoints(80, tol, 1)).toBe(70);
    expect(trialPoints(180, tol, 1)).toBe(40);
    expect(trialPoints(300, tol, 1)).toBe(10);
    expect(trialPoints(500, tol, 1)).toBe(0);
    expect(trialPoints(10, tol, 3)).toBe(120);
  });

  it('Hilfsring nur auf Stufe 1, Füllstand begrenzt', () => {
    expect(showHelpRing(1)).toBe(true);
    expect(showHelpRing(1.9)).toBe(true);
    expect(showHelpRing(2)).toBe(false);
    expect(ringFraction(-5, 3000)).toBe(0);
    expect(ringFraction(1500, 3000)).toBeCloseTo(0.5);
    expect(ringFraction(9000, 3000)).toBe(1);
  });

  it('Frist und Doppeltipp-Schutz', () => {
    expect(timeoutMs(1000)).toBeGreaterThan(1000);
    expect(timeoutMs(8000)).toBe(14000);
    expect(isAccidentalTap(120)).toBe(true);
    expect(isAccidentalTap(200)).toBe(false);
  });
});

describe('sekunden-gefuehl: Zusammenfassung und Tipp', () => {
  it('mittlere Abweichung, Tendenz und Treffer', () => {
    const devs = [-100, 50, 150];
    const s = summarize(devs, [200, 200, 100], [1000, 2000, 3000]);
    expect(s.meanAbs).toBeCloseTo(100);
    expect(s.bias).toBeCloseTo(100 / 3);
    expect(s.hits).toBe(2);
    expect(s.count).toBe(3);
    expect(Number.isNaN(summarize([], [], []).meanAbs)).toBe(true);
  });

  it('Tipp: früh, spät, lange Zeiten, sonst gut', () => {
    const targets = [1000, 2000, 3000, 4000, 5000];
    expect(tipFor([-150, -250, -300, -400, -500], targets)).toBe('early');
    expect(tipFor([150, 250, 300, 400, 500], targets)).toBe('late');
    // ausgeglichen, aber lange Zeiten streuen deutlich mehr (relativ)
    expect(tipFor([10, -10, 5, 500, -500], targets)).toBe('long');
    expect(tipFor([10, -20, 15, -30, 20], targets)).toBe('great');
    expect(tipFor([100], [1000])).toBe('great');
  });
});
