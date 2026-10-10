/**
 * „Nachzeichnen“ – Level: Komplexität je Level (monoton), gültige Pfade für viele Seeds und alle Level (im Feld,
 * Bogenlänge, Schleifen, Abstände, Krümmung), Selbstkreuzungen und der Fortschritt (kein Überspringen einer Schleife),
 * Level-Einstellungen, gespeichertes Höchstlevel und Levelliste der Session.
 */
import { describe, expect, it } from 'vitest';
import { makeRng } from '../../src/binokular/games/common';
import {
  buildLevelPath,
  centripetalCatmullRom,
  clampLevel,
  complexityFor,
  complexityScore,
  effectiveCurlRadius,
  fieldMargin,
  MAX_LEVEL,
  MIN_LENGTH,
  minCurvatureRadius,
  validatePath,
  MAX_LENGTH,
} from '../../src/binokular/games/nachzeichnen/levels';
import { dist, FIELD_H, FIELD_W, nearestInWindow, type Pt, type TracePath } from '../../src/binokular/games/nachzeichnen/path';
import { DEFAULT_NACH, normalizeNach } from '../../src/binokular/games/nachzeichnen/settings';
import { MAX_STEP_PX, newTrace, penDown, penMove, type TraceConfig, type TraceEvent, type TraceState } from '../../src/binokular/games/nachzeichnen/trace';
import { defaultStore, normalizeStore } from '../../src/binokular/data/storage';
import { normalizeSession, SessionRecorder } from '../../src/binokular/therapy/session';

const cfg: TraceConfig = { pathWidth: 16, errorDist: 28, errorLimit: 0 };
const opts = { pathWidth: 16, errorDist: 28 };
const LEVELS = Array.from({ length: MAX_LEVEL }, (_, i) => i + 1);

/** Selbstkreuzungen der Polylinie (unabhängige Brute-Force-Suche): Indexpaare (i < j) */
function selfCrossings(pts: readonly Pt[]): { i: number; j: number; x: number; y: number }[] {
  const out: { i: number; j: number; x: number; y: number }[] = [];
  const inter = (a: Pt, b: Pt, c: Pt, d: Pt) => {
    const rx = b.x - a.x;
    const ry = b.y - a.y;
    const sx = d.x - c.x;
    const sy = d.y - c.y;
    const den = rx * sy - ry * sx;
    if (Math.abs(den) < 1e-12) return null;
    const t = ((c.x - a.x) * sy - (c.y - a.y) * sx) / den;
    const u = ((c.x - a.x) * ry - (c.y - a.y) * rx) / den;
    return t >= 0 && t <= 1 && u >= 0 && u <= 1 ? { x: a.x + rx * t, y: a.y + ry * t } : null;
  };
  for (let i = 0; i < pts.length - 1; i++) {
    for (let j = i + 20; j < pts.length - 1; j++) {
      const x = inter(pts[i], pts[i + 1], pts[j], pts[j + 1]);
      if (x && !out.some((o) => Math.hypot(o.x - x.x, o.y - x.y) < 12)) out.push({ i, j, ...x });
    }
  }
  return out;
}

describe('complexityFor', () => {
  it('Level wird auf 1 … 12 begrenzt, ungültig → 1', () => {
    expect(clampLevel(0)).toBe(1);
    expect(clampLevel(99)).toBe(12);
    expect(clampLevel(NaN)).toBe(1);
    expect(clampLevel(3.6)).toBe(4);
    expect(complexityFor(13)).toEqual({ ...complexityFor(12), level: 12 });
    expect(complexityFor(-5).level).toBe(1);
  });
  it('Level 1: sanfte Kurve mit 4–6 Stützpunkten, keine Schleife; Level 2–3 ohne Schleifen; ab Level 4 Schleifen', () => {
    const c1 = complexityFor(1);
    expect(c1.points).toBeGreaterThanOrEqual(4);
    expect(c1.points).toBeLessThanOrEqual(6);
    expect(c1.curls).toBe(0);
    expect(complexityFor(2).curls).toBe(0);
    expect(complexityFor(3).curls).toBe(0);
    for (let l = 4; l <= 12; l++) expect(complexityFor(l).curls).toBeGreaterThanOrEqual(1);
    expect(complexityFor(12).curls).toBeGreaterThan(complexityFor(4).curls);
    expect(complexityFor(12).curls).toBe(3);
  });
  it('monoton nicht fallend: Punkte, Streuung, Schleifen, Wackeln, Gesamtwert; Schleifenradius nicht steigend', () => {
    for (let l = 2; l <= MAX_LEVEL; l++) {
      const a = complexityFor(l - 1);
      const b = complexityFor(l);
      expect(b.points).toBeGreaterThanOrEqual(a.points);
      expect(b.spread).toBeGreaterThanOrEqual(a.spread);
      expect(b.curls).toBeGreaterThanOrEqual(a.curls);
      expect(b.wobble).toBeGreaterThanOrEqual(a.wobble);
      if (a.curls > 0) expect(b.curlRadius).toBeLessThanOrEqual(a.curlRadius);
      expect(complexityScore(b)).toBeGreaterThan(complexityScore(a));
    }
  });
  it('Schleifenradius nie unter 1,8 × Fehlerabstand', () => {
    for (const ed of [16, 28, 50, 80]) for (const l of LEVELS) if (complexityFor(l).curls > 0) expect(effectiveCurlRadius(complexityFor(l), ed)).toBeGreaterThanOrEqual(1.8 * ed);
  });
});

describe('Pfade je Level', () => {
  it('gleicher Seed und Level → gleicher Pfad; anderer Seed → anderer Pfad', () => {
    for (const l of [1, 5, 12]) {
      const a = buildLevelPath(makeRng(7), l, opts).path.pts;
      const b = buildLevelPath(makeRng(7), l, opts).path.pts;
      const c = buildLevelPath(makeRng(8), l, opts).path.pts;
      expect(a).toEqual(b);
      expect(a).not.toEqual(c);
    }
  });
  it('viele Seeds × alle Level: gültig (im Feld mit Rand, Bogenlänge, Start links vom Ziel, Krümmung, Abstände), Schleifen wie verlangt', () => {
    for (const l of LEVELS) {
      const want = complexityFor(l);
      for (let seed = 1; seed <= 15; seed++) {
        const r = buildLevelPath(makeRng(seed * 31 + l), l, opts);
        const p = r.path;
        const m = fieldMargin(opts.pathWidth);
        for (const q of p.pts) {
          expect(q.x).toBeGreaterThanOrEqual(m);
          expect(q.x).toBeLessThanOrEqual(FIELD_W - m);
          expect(q.y).toBeGreaterThanOrEqual(m);
          expect(q.y).toBeLessThanOrEqual(FIELD_H - m);
        }
        expect(p.length).toBeGreaterThanOrEqual(MIN_LENGTH);
        expect(p.length).toBeLessThanOrEqual(MAX_LENGTH);
        expect(p.start.x).toBeLessThan(p.goal.x);
        expect(r.curls).toBe(want.curls);
        expect(r.attempts).toBeLessThanOrEqual(120);
        const chk = validatePath(p, { ...opts, curls: r.curls });
        expect(chk.reasons).toEqual([]);
        expect(chk.minRadius).toBeGreaterThanOrEqual(1.3 * opts.errorDist);
        // keine Zacken: Abtastpunkte gleichmäßig (kein Abschnitt kürzer als 1 px außer ggf. dem letzten), Stützpunkte nicht aufeinander
        for (let i = 1; i < p.pts.length - 1; i++) expect(dist(p.pts[i - 1], p.pts[i])).toBeGreaterThan(1);
        for (let i = 1; i < p.ctrl.length; i++) expect(dist(p.ctrl[i - 1], p.ctrl[i])).toBeGreaterThan(8);
      }
    }
  });
  it('Selbstkreuzungen: Level 1–3 keine, ab Level 4 genau so viele wie Schleifen (unabhängig nachgezählt)', () => {
    for (const l of LEVELS) {
      for (let seed = 1; seed <= 8; seed++) {
        const r = buildLevelPath(makeRng(seed * 17 + l), l, opts);
        expect(selfCrossings(r.path.pts)).toHaveLength(complexityFor(l).curls);
      }
    }
  });
  it('Pfade werden mit dem Level im Mittel länger und kurviger', () => {
    const mean = (l: number, f: (p: TracePath) => number) => {
      let s = 0;
      for (let seed = 1; seed <= 20; seed++) s += f(buildLevelPath(makeRng(seed + 100 * l), l, opts).path);
      return s / 20;
    };
    expect(mean(4, (p) => p.length)).toBeGreaterThan(mean(1, (p) => p.length));
    expect(mean(12, (p) => p.length)).toBeGreaterThan(mean(4, (p) => p.length));
  });
  it('andere Einstellungen (dünner/breiter Pfad, kleiner/großer Fehlerabstand) bleiben gültig; Schleifen nur so viele wie passen', () => {
    for (const [pathWidth, errorDist] of [
      [8, 20],
      [24, 40],
      [40, 80],
    ]) {
      for (const l of [1, 3, 6, 9, 12]) {
        for (let seed = 1; seed <= 4; seed++) {
          const r = buildLevelPath(makeRng(seed * 5 + l), l, { pathWidth, errorDist });
          expect(r.curls).toBeLessThanOrEqual(complexityFor(l).curls);
          expect(r.curlRadius === 0 || r.curlRadius >= 1.8 * errorDist).toBe(true);
          const chk = validatePath(r.path, { pathWidth, errorDist, curls: r.curls });
          expect(chk.reasons).toEqual([]);
        }
      }
    }
  });
  it('Einstellung „Kurvigkeit“ verschiebt Punkte und Streuung relativ zum Level', () => {
    const base = buildLevelPath(makeRng(3), 2, opts);
    const more = buildLevelPath(makeRng(3), 2, { ...opts, pointsDelta: 3 });
    expect(more.path.ctrl.length).toBe(base.path.ctrl.length + 3);
  });
  it('Zentripetaler Spline läuft durch die Stützpunkte', () => {
    const ctrl = [
      { x: 0, y: 0 },
      { x: 100, y: 50 },
      { x: 110, y: 52 },
      { x: 300, y: -40 },
    ];
    const poly = centripetalCatmullRom(ctrl, 20);
    for (const c of ctrl) expect(Math.min(...poly.map((p) => dist(p, c)))).toBeLessThan(1e-6);
  });
  it('Krümmungsradius: Kreis liefert seinen Radius, Gerade unendlich', () => {
    const circle = Array.from({ length: 400 }, (_, i) => ({ x: 100 * Math.cos(i / 50), y: 100 * Math.sin(i / 50) }));
    expect(minCurvatureRadius(circle, 3)).toBeCloseTo(100, 0);
    expect(minCurvatureRadius(Array.from({ length: 100 }, (_, i) => ({ x: i * 3, y: 5 })))).toBe(Infinity);
  });
});

describe('Fortschritt an Selbstkreuzungen', () => {
  /** Pfad mit mindestens einer Schleife */
  function loopPath(seed = 1, level = 5): { path: TracePath; i1: number; i2: number } {
    const path = buildLevelPath(makeRng(seed), level, opts).path;
    const c = selfCrossings(path.pts);
    expect(c.length).toBeGreaterThanOrEqual(1);
    return { path, i1: c[0].i, i2: c[0].j };
  }
  /** Stift am Start aufsetzen und der Linie bis Index `upto` folgen (Schritte von `step` Punkten) */
  function follow(path: TracePath, upto: number, step = 2): { s: TraceState; ev: TraceEvent[]; progress: number[] } {
    const s = newTrace();
    const ev: TraceEvent[] = [];
    const progress: number[] = [];
    ev.push(...penDown(s, path, cfg, path.pts[0]));
    for (let i = step; i <= upto; i += step) {
      ev.push(...penMove(s, path, cfg, path.pts[i]));
      progress.push(s.progress);
    }
    return { s, ev, progress };
  }

  it('Der Pfad wird in allen Leveln Punkt für Punkt nachgezeichnet: Ziel erreicht, kein Fehler, Fortschritt nur vorwärts', () => {
    for (const l of LEVELS) {
      for (const seed of [1, 2, 3]) {
        const path = buildLevelPath(makeRng(seed * 3 + l), l, opts).path;
        const { s, ev, progress } = follow(path, path.pts.length - 1, 2);
        // letzter Punkt sicher anfahren
        ev.push(...penMove(s, path, cfg, path.goal));
        expect(ev.filter((e) => e.type === 'error')).toHaveLength(0);
        expect(s.finished).toBe('goal');
        for (let i = 1; i < progress.length; i++) {
          expect(progress[i]).toBeGreaterThanOrEqual(progress[i - 1]);
          expect(progress[i] - progress[i - 1]).toBeLessThanOrEqual(Math.ceil((2 * 3 + 4) / 3) + Math.ceil(MAX_STEP_PX / 3));
        }
      }
    }
  });

  it('Das Nächster-Punkt-Fenster liegt um den Fortschritt: am Kreuzungspunkt bleibt der Index auf dem eigenen Pfadstück', () => {
    const { path, i1, i2 } = loopPath();
    const x = { x: (path.pts[i1].x + path.pts[i1 + 1].x) / 2, y: (path.pts[i1].y + path.pts[i1 + 1].y) / 2 };
    expect(dist(x, path.pts[i2])).toBeLessThan(6); // dort liegen beide Pfadstücke aufeinander
    const w1 = nearestInWindow(path.pts, x, i1 - 4, i1 + 4);
    expect(Math.abs(w1.index - i1)).toBeLessThanOrEqual(5);
    const w2 = nearestInWindow(path.pts, x, i2 - 4, i2 + 4);
    expect(Math.abs(w2.index - i2)).toBeLessThanOrEqual(6);
    expect(w2.index).toBeGreaterThan(i1 + 100);
  });

  it('Gerade durch die Kreuzung zeichnen überspringt die Schleife nicht: der Fortschritt bleibt vor der Schleife, die Schleife ist zu durchlaufen', () => {
    for (const [seed, level] of [
      [1, 5],
      [2, 7],
      [4, 9],
      [5, 12],
    ]) {
      const { path, i1, i2 } = loopPath(seed, level);
      // der Stift folgt dem Pfad bis kurz vor die Kreuzung …
      const before = i1 - 15;
      const { s, ev } = follow(path, before, 2);
      expect(ev.filter((e) => e.type === 'error')).toHaveLength(0);
      expect(s.progress).toBeLessThanOrEqual(before + 4);
      // … und zieht dann in gerader Linie zum Pfadpunkt hinter der Schleife (Abkürzung durch die Kreuzung hindurch)
      const target = path.pts[Math.min(path.pts.length - 1, i2 + 40)];
      penMove(s, path, cfg, target);
      expect(s.progress).toBeLessThan(i1 + 20); // kein Sprung über die Schleife
      expect(s.progress).toBeLessThan(i2 - 30);
      expect(s.finished).toBeNull();
      // die Abkürzung führt weit vom noch nicht gezeichneten Pfad weg: Fehler statt Fortschritt
      expect(s.errors).toBe(1);
    }
  });

  it('An der Kreuzung auf den anderen Ast abbiegen (Weg hinter die Schleife) wird als Fehler gezählt, der Fortschritt springt nicht', () => {
    for (const [seed, level] of [
      [1, 5],
      [3, 8],
    ]) {
      const { path, i1, i2 } = loopPath(seed, level);
      const { s } = follow(path, i1, 2);
      const p0 = s.progress;
      expect(p0).toBeLessThanOrEqual(i1 + 2);
      let errors = 0;
      // nun dem zweiten Durchgang folgen (Ausgang der Schleife), obwohl die Schleife noch nicht gezeichnet ist
      for (let i = i2; i < Math.min(path.pts.length - 1, i2 + 60); i += 2) {
        const ev = penMove(s, path, cfg, path.pts[i]);
        errors += ev.filter((e) => e.type === 'error').length;
        expect(s.progress).toBeLessThan(i1 + 20);
      }
      expect(errors).toBe(1);
      expect(s.status).toBe('error');
      expect(s.finished).toBeNull();
    }
  });

  it('Nach der Schleife geht der Fortschritt über den zweiten Durchgang der Kreuzung hinaus (kein Zurückspringen auf den ersten)', () => {
    const { path, i1, i2 } = loopPath(2, 7);
    const { progress } = follow(path, i2 + 60, 2);
    const last = progress[progress.length - 1];
    expect(last).toBeGreaterThan(i2 + 40);
    // an keiner Stelle springt der Fortschritt zurück oder um mehr als ein paar Punkte vor
    for (let i = 1; i < progress.length; i++) {
      expect(progress[i]).toBeGreaterThanOrEqual(progress[i - 1]);
      expect(progress[i] - progress[i - 1]).toBeLessThanOrEqual(8);
    }
    expect(i2).toBeGreaterThan(i1 + 100);
  });
});

describe('Level-Einstellungen, Höchstlevel, Levelliste', () => {
  it('Startlevel 1–12 (Standard 1) und „Level steigen automatisch“ (Standard an)', () => {
    expect(DEFAULT_NACH.startLevel).toBe(1);
    expect(DEFAULT_NACH.autoLevel).toBe(true);
    expect(normalizeNach({ startLevel: 99 }).startLevel).toBe(12);
    expect(normalizeNach({ startLevel: 0 }).startLevel).toBe(1);
    expect(normalizeNach({ startLevel: 'x' }).startLevel).toBe(1);
    expect(normalizeNach({ startLevel: 4.4 }).startLevel).toBe(4);
    expect(normalizeNach({ autoLevel: false }).autoLevel).toBe(false);
    expect(normalizeNach({ autoLevel: 'nein' }).autoLevel).toBe(true);
    expect(normalizeNach(null)).toEqual(DEFAULT_NACH);
  });
  it('Höchstes erreichtes Level im Speicher: Standard 1, streng begrenzt, bleibt beim Laden erhalten', () => {
    expect(defaultStore().nachMaxLevel).toBe(1);
    expect(normalizeStore({ nachMaxLevel: 7 }).nachMaxLevel).toBe(7);
    expect(normalizeStore({ nachMaxLevel: 99 }).nachMaxLevel).toBe(12);
    expect(normalizeStore({ nachMaxLevel: -3 }).nachMaxLevel).toBe(1);
    expect(normalizeStore({ nachMaxLevel: 'viel' }).nachMaxLevel).toBe(1);
    expect(normalizeStore(JSON.parse(JSON.stringify({ ...defaultStore(), nachMaxLevel: 5 }))).nachMaxLevel).toBe(5);
  });
  it('Session speichert die Levelliste; Einlesen prüft streng', () => {
    const rec = new SessionRecorder({ gameId: 'nachzeichnen', patientId: '', amblyopicContrast: 100, fellowEyeContrast: 20, amblyopicEye: 'LEFT', glasses: 'RED_CYAN', leftLens: 'RED' }, () => 0).finish('user', {
      points: 2,
      errors: 3,
      colorChanges: 5,
      completed: true,
      details: { level: 3, maxLevel: 3 },
      levels: [
        { level: 1, ms: 20000, errors: 1, accuracy: 91.5, completed: true },
        { level: 2, ms: 30000, errors: 2, accuracy: 85, completed: true },
        { level: 3, ms: 4000, errors: 0, accuracy: 100, completed: false },
      ],
    });
    expect(rec.levels).toHaveLength(3);
    const back = normalizeSession(JSON.parse(JSON.stringify(rec)));
    expect(back?.levels).toEqual(rec.levels);
    const dirty = normalizeSession({ ...rec, levels: [{ level: 99, ms: -5, errors: 2.6, accuracy: 500, completed: 'ja' }, 'x', null, { level: 'a' }] });
    expect(dirty?.levels).toEqual([{ level: 12, ms: 0, errors: 3, accuracy: 100, completed: false }]);
    expect(normalizeSession({ ...rec, levels: 'nichts' })?.levels).toBeUndefined();
    // Spiele ohne Level: kein Feld
    const pong = new SessionRecorder({ gameId: 'pong', patientId: '', amblyopicContrast: 100, fellowEyeContrast: 20, amblyopicEye: 'LEFT', glasses: 'RED_CYAN', leftLens: 'RED' }, () => 0).finish('score', { points: 1, errors: 0, colorChanges: 0, completed: true, details: {} });
    expect('levels' in pong).toBe(false);
  });
});
