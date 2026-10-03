/**
 * Orts-Projektion (Labor): reine Logik – Einstellungen, Ablauf eines Punktes (Kreuz → Punkt → Wartezeit → Antwort → Rückmeldung),
 * Wahl der Orte, Auswertung (Abstand, Verschiebung, Streuung).
 */
import { describe, expect, it } from 'vitest';
import { sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import { CENTER_GAP_CM, FEEDBACK_MS, FEEDBACK_SHORT_MS, FIX_MS, MARGIN_CM, PARAMS, ProjectionSession, projectionParams, QUICK_TRIALS, tipFor } from '../../src/exercises/labor-projektion/logic';

const P = (over: Record<string, unknown> = {}) => projectionParams(sanitizeParams(PARAMS, over));
const make = (over: Record<string, unknown> = {}, seed = 8, field = { w: 30, h: 20 }) => new ProjectionSession(P(over), createRng(seed), 40, field);

/** Spielt die Zeit voran, bis die Phase erreicht ist; gibt die Zeit zurück */
function until(s: ProjectionSession, phase: string, t0: number): number {
  let t = t0;
  for (let i = 0; i < 100000 && s.phase !== phase; i++) {
    t += 10;
    s.update(t);
  }
  expect(s.phase).toBe(phase);
  return t;
}

describe('Einstellungen', () => {
  it('Standardwerte und Grenzen', () => {
    expect(P()).toEqual({ trials: 20, flashMs: 300, delayMs: 0, zone: 'all', showTarget: true, sizeCm: 1 });
    expect(P({ trials: 99 }).trials).toBe(60);
    expect(P({ trials: 2 }).trials).toBe(6);
    expect(P({ flashMs: 10 }).flashMs).toBe(100); // kein Aufblitzen unter 0,1 s
    expect(P({ flashMs: 5000 }).flashMs).toBe(2000);
    expect(P({ delayMs: 9999 }).delayMs).toBe(5000);
    expect(P({ zone: 'periphery' }).zone).toBe('periphery');
    expect(P({ zone: 'x' }).zone).toBe('all');
    expect(P({ showTarget: 'no' }).showTarget).toBe(false);
    expect(P({ sizeCm: 9 }).sizeCm).toBe(3);
    expect(QUICK_TRIALS).toBe(3);
  });
});

describe('Ablauf eines Punktes', () => {
  it('Kreuz → Punkt (nur während der Anzeigedauer sichtbar) → Antwort → Rückmeldung → nächster Punkt', () => {
    const s = make({ trials: 6, flashMs: 400 });
    s.start(0);
    expect(s.phase).toBe('fix');
    expect(s.visible).toBe(false);
    s.update(FIX_MS - 1);
    expect(s.phase).toBe('fix');
    s.update(FIX_MS);
    expect(s.phase).toBe('flash');
    expect(s.visible).toBe(true);
    s.update(FIX_MS + 399);
    expect(s.visible).toBe(true);
    s.update(FIX_MS + 400);
    expect(s.phase).toBe('respond');
    expect(s.visible).toBe(false);
    expect(s.respond(0.5, -0.5, { x: 10, y: 10 }, FIX_MS + 900)).toBe(true);
    expect(s.phase).toBe('feedback');
    expect(s.trials[0].rtMs).toBe(500);
    s.update(FIX_MS + 900 + FEEDBACK_MS - 1);
    expect(s.phase).toBe('feedback');
    s.update(FIX_MS + 900 + FEEDBACK_MS);
    expect(s.phase).toBe('fix');
    expect(s.idx).toBe(1);
  });

  it('mit Wartezeit: erst „Wartezeit“, dann Antwort; ohne Rückmeldung nur kurze Pause', () => {
    const s = make({ delayMs: 1000, showTarget: 'no', trials: 6, flashMs: 200 });
    s.start(0);
    let t = until(s, 'flash', 0);
    t = until(s, 'delay', t);
    const delayStart = t;
    expect(s.visible).toBe(false);
    t = until(s, 'respond', t);
    expect(t - delayStart).toBeGreaterThanOrEqual(1000);
    expect(t - delayStart).toBeLessThan(1100);
    s.respond(0, 0, { x: 0, y: 0 }, t);
    const fb = t;
    t = until(s, 'fix', t);
    expect(t - fb).toBeLessThan(FEEDBACK_MS);
    expect(t - fb).toBeGreaterThanOrEqual(FEEDBACK_SHORT_MS);
  });

  it('Antworten außerhalb der Antwortphase werden nicht gezählt', () => {
    const s = make({ trials: 6 });
    s.start(0);
    expect(s.respond(1, 1, { x: 0, y: 0 }, 100)).toBe(false);
    until(s, 'flash', 0);
    expect(s.respond(1, 1, { x: 0, y: 0 }, 100)).toBe(false);
    expect(s.trials).toHaveLength(0);
  });

  it('nach dem letzten Punkt ist der Durchlauf zu Ende, danach geschieht nichts mehr', () => {
    const s = make({ trials: 6 });
    s.start(0);
    let t = 0;
    for (let i = 0; i < 6; i++) {
      t = until(s, 'respond', t);
      s.respond(0, 0, { x: 0, y: 0 }, t);
      t += 10;
    }
    t = until(s, 'done', t);
    expect(s.finished).toBe(true);
    expect(s.trials).toHaveLength(6);
    s.update(t + 100000);
    expect(s.phase).toBe('done');
    expect(s.respond(0, 0, { x: 0, y: 0 }, t)).toBe(false);
  });

  it('nie mehrmals pro Sekunde: zwischen zwei Aufleuchten vergehen mindestens Kreuz-, Anzeige- und Rückmeldezeit', () => {
    for (const flashMs of [100, 300, 1000]) {
      const s = make({ trials: 6, flashMs, showTarget: 'no' });
      s.start(0);
      const onsets: number[] = [];
      let t = 0;
      for (let i = 0; i < 6; i++) {
        t = until(s, 'flash', t);
        onsets.push(t);
        t = until(s, 'respond', t);
        s.respond(0, 0, { x: 0, y: 0 }, t);
      }
      for (let i = 1; i < onsets.length; i++) expect(onsets[i] - onsets[i - 1]).toBeGreaterThanOrEqual(FIX_MS + flashMs + FEEDBACK_SHORT_MS - 10);
      expect(FIX_MS + 100 + FEEDBACK_SHORT_MS).toBeGreaterThan(1000);
    }
  });
});

describe('Orte', () => {
  it('mit Rand, nicht in der Mitte; Anteile des Feldes', () => {
    const s = make();
    for (let i = 0; i < 400; i++) {
      const t = s.pick();
      expect(t.fx).toBeGreaterThanOrEqual(MARGIN_CM / 30 - 1e-9);
      expect(t.fx).toBeLessThanOrEqual(1 - MARGIN_CM / 30 + 1e-9);
      expect(t.fy).toBeGreaterThanOrEqual(MARGIN_CM / 20 - 1e-9);
      expect(t.fy).toBeLessThanOrEqual(1 - MARGIN_CM / 20 + 1e-9);
      expect(Math.hypot((t.fx - 0.5) * 30, (t.fy - 0.5) * 20)).toBeGreaterThanOrEqual(CENTER_GAP_CM - 1e-9);
    }
  });

  it('„Nur Rand“: nur außerhalb der inneren 60 % (elliptisch gemessen)', () => {
    const s = make({ zone: 'periphery' });
    for (let i = 0; i < 400; i++) {
      const t = s.pick();
      expect(Math.hypot((t.fx - 0.5) / 0.5, (t.fy - 0.5) / 0.5)).toBeGreaterThanOrEqual(0.6 - 1e-9);
    }
  });

  it('die Orte streuen über das Feld, und das Feld darf sich ändern (Drehen)', () => {
    const s = make({}, 12);
    const xs: number[] = [];
    for (let i = 0; i < 200; i++) xs.push(s.pick().fx);
    expect(Math.min(...xs)).toBeLessThan(0.2);
    expect(Math.max(...xs)).toBeGreaterThan(0.8);
    s.setField(20, 30);
    const t = s.pick();
    expect(t.fy).toBeGreaterThanOrEqual(MARGIN_CM / 30 - 1e-9);
    s.setField(0, 0); // nie ein Fehler
    expect(Number.isFinite(s.pick().fx)).toBe(true);
  });
});

describe('Auswertung', () => {
  function answers(list: Array<[number, number]>, over: Record<string, unknown> = {}) {
    const s = make({ trials: Math.max(6, list.length + (list.length % 2)), ...over });
    s.start(0);
    let t = 0;
    for (const [dx, up] of list) {
      t = until(s, 'respond', t);
      s.respond(dx, up, { x: 0, y: 0 }, t + 400);
      t += 410;
    }
    return s;
  }

  it('Abstand (cm und Sehwinkel), Verschiebung (+ rechts, + oben), Streuung, Zeit', () => {
    const s = answers([
      [3, 4],
      [-3, -4],
    ]);
    const sum = s.summary();
    expect(sum.n).toBe(2);
    expect(sum.errMean).toBe(5);
    expect(sum.errDeg).toBeCloseTo((2 * Math.atan(5 / 80) * 180) / Math.PI, 2);
    expect(sum.biasX).toBe(0);
    expect(sum.biasY).toBe(0);
    // Stichproben-Streuung: sd(3, −3) = 4,243, sd(4, −4) = 5,657 → √(18 + 32) = 7,07
    expect(sum.scatter).toBeCloseTo(7.07, 2);
    expect(sum.rtMean).toBe(400);
    expect(s.trials[0]).toMatchObject({ errXCm: 3, errUpCm: 4, errCm: 5 });
  });

  it('systematische Verschiebung: alle Antworten rechts und oberhalb → positive Werte, Streuung klein', () => {
    const s = answers([
      [1, 0.5],
      [1.1, 0.4],
      [0.9, 0.6],
      [1, 0.5],
    ]);
    const sum = s.summary();
    expect(sum.biasX!).toBeCloseTo(1, 2);
    expect(sum.biasY!).toBeCloseTo(0.5, 2);
    expect(sum.scatter!).toBeLessThan(0.3);
    expect(sum.errMean!).toBeGreaterThan(1);
  });

  it('eine Antwort: keine Streuung (null statt NaN); leer ebenso', () => {
    const sum = answers([[1, 1]]).summary();
    expect(sum.n).toBe(1);
    expect(sum.scatter).toBeNull();
    expect(sum.errMean).toBeCloseTo(1.41, 2);
    const none = make().summary();
    expect(none).toMatchObject({ n: 0, errMean: null, errDeg: null, biasX: null, biasY: null, scatter: null, rtMean: null });
  });

  it('Tipp: wenige Punkte vor Standard', () => {
    const base = make().summary();
    expect(tipFor({ ...base, n: 10 })).toBe('more');
    expect(tipFor({ ...base, n: 20 })).toBe('calm');
  });
});
