/**
 * „Nachzeichnen“: Pfaderzeugung (Seed), Spline und Bogenlänge, Fortschritt in kleinen Schritten, Fehler-Zustandsautomat,
 * Wertung, Farbwechsel (Zeit ODER Strecke, Fade nacheinander) und Einstellungen.
 */
import { describe, expect, it } from 'vitest';
import { makeRng } from '../../src/binokular/games/common';
import { colorK, newSchedule, stepSchedule, visibleColors, type ScheduleConfig, type ScheduleState } from '../../src/binokular/games/nachzeichnen/colorSchedule';
import { arcLengths, buildPath, catmullRom, FIELD_H, FIELD_W, generateControlPoints, pathFromControl, resample, SAMPLE_SPACING, type Pt } from '../../src/binokular/games/nachzeichnen/path';
import { DEFAULT_NACH, GOAL_RADIUS, minErrorDist, normalizeNach, RESUME_RADIUS, START_RADIUS } from '../../src/binokular/games/nachzeichnen/settings';
import { accuracyOf, avgDeviationOf, clearLine, newTrace, penDown, penMove, penUp, toleranceOf, type TraceConfig, type TraceEvent } from '../../src/binokular/games/nachzeichnen/trace';

const straight = () =>
  pathFromControl([
    { x: 100, y: 300 },
    { x: 400, y: 300 },
    { x: 700, y: 300 },
    { x: 1000, y: 300 },
  ]);
const cfg: TraceConfig = { pathWidth: 16, errorDist: 28, errorLimit: 0 };
const types = (ev: TraceEvent[]) => ev.map((e) => e.type);

describe('Pfaderzeugung', () => {
  it('gleicher Seed → gleicher Pfad; anderer Seed → anderer Pfad', () => {
    const a = generateControlPoints(makeRng(42), { points: 6, spread: 0.6 });
    const b = generateControlPoints(makeRng(42), { points: 6, spread: 0.6 });
    const c = generateControlPoints(makeRng(43), { points: 6, spread: 0.6 });
    expect(a).toEqual(b);
    expect(a).not.toEqual(c);
    expect(buildPath(makeRng(5), { points: 6, spread: 0.6 }).pts).toEqual(buildPath(makeRng(5), { points: 6, spread: 0.6 }).pts);
  });
  it('Stützpunkte: Anzahl, streng von links nach rechts, im Spielfeld', () => {
    for (const n of [4, 6, 10]) {
      for (let seed = 1; seed <= 25; seed++) {
        const pts = generateControlPoints(makeRng(seed), { points: n, spread: 1 });
        expect(pts).toHaveLength(n);
        for (let i = 1; i < n; i++) expect(pts[i].x).toBeGreaterThan(pts[i - 1].x);
        for (const p of pts) {
          expect(p.x).toBeGreaterThan(0);
          expect(p.x).toBeLessThan(FIELD_W);
          expect(p.y).toBeGreaterThan(0);
          expect(p.y).toBeLessThan(FIELD_H);
        }
      }
    }
  });
  it('Streuung 0 → gerade Mitte; große Streuung → größere Höhenunterschiede', () => {
    const flat = generateControlPoints(makeRng(3), { points: 6, spread: 0 });
    expect(new Set(flat.map((p) => p.y)).size).toBe(1);
    const range = (spread: number) => {
      let m = 0;
      for (let s = 1; s <= 30; s++) {
        const ys = generateControlPoints(makeRng(s), { points: 6, spread }).map((p) => p.y);
        m += Math.max(...ys) - Math.min(...ys);
      }
      return m;
    };
    expect(range(1)).toBeGreaterThan(range(0.3));
  });
});

describe('Spline und Bogenlänge', () => {
  it('Catmull-Rom läuft durch die Stützpunkte; Start/Ziel am Rand', () => {
    const ctrl: Pt[] = [
      { x: 100, y: 200 },
      { x: 300, y: 500 },
      { x: 600, y: 150 },
      { x: 900, y: 400 },
    ];
    const poly = catmullRom(ctrl, 10);
    expect(poly).toHaveLength(3 * 10 + 1);
    ctrl.forEach((c, i) => {
      const p = poly[Math.min(i * 10, poly.length - 1)];
      expect(p.x).toBeCloseTo(c.x, 6);
      expect(p.y).toBeCloseTo(c.y, 6);
    });
  });
  it('Bogenlänge einer Geraden und Abtastung mit gleichen Abständen', () => {
    const len = arcLengths([
      { x: 0, y: 0 },
      { x: 3, y: 4 },
      { x: 3, y: 14 },
    ]);
    expect(len).toEqual([0, 5, 15]);
    const p = straight();
    expect(p.length).toBeCloseTo(900, 3);
    expect(p.start).toEqual({ x: 100, y: 300 });
    expect(p.goal.x).toBeCloseTo(1000, 6);
    for (let i = 1; i < p.pts.length; i++) {
      const d = Math.hypot(p.pts[i].x - p.pts[i - 1].x, p.pts[i].y - p.pts[i - 1].y);
      expect(d).toBeLessThanOrEqual(SAMPLE_SPACING + 0.01);
      expect(d).toBeGreaterThan(SAMPLE_SPACING * 0.9);
    }
    const r = resample(
      [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
      ],
      10,
    );
    expect(r).toHaveLength(11);
  });
  it('gebogener Pfad ist länger als die Sehne; Abtastung ist glatt', () => {
    const p = buildPath(makeRng(9), { points: 8, spread: 1 });
    expect(p.length).toBeGreaterThan(p.goal.x - p.start.x);
    const dir = (i: number) => Math.atan2(p.pts[i + 1].y - p.pts[i].y, p.pts[i + 1].x - p.pts[i].x);
    for (let i = 1; i < p.pts.length - 2; i++) {
      let d = Math.abs(dir(i) - dir(i - 1));
      if (d > Math.PI) d = 2 * Math.PI - d;
      expect(d).toBeLessThan(0.5);
    }
  });
});

describe('Zeichnen: Start, Fortschritt, Abkürzungen', () => {
  it('Zeichnen beginnt nur im Startkreis (Radius 24); sonst Hinweis, gleiten in den Kreis startet', () => {
    const path = straight();
    const s = newTrace();
    expect(types(penDown(s, path, cfg, { x: 100 + START_RADIUS + 5, y: 300 }))).toEqual(['hint']);
    expect(s.status).toBe('ready');
    expect(s.strokes).toHaveLength(0);
    penUp(s);
    expect(types(penDown(s, path, cfg, { x: 100 + START_RADIUS - 2, y: 300 }))).toEqual(['start']);
    expect(s.status).toBe('drawing');
    // Stift setzt außerhalb auf und gleitet hinein
    const t = newTrace();
    penDown(t, path, cfg, { x: 200, y: 400 });
    expect(types(penMove(t, path, cfg, { x: 100, y: 300 }))).toContain('start');
  });
  it('Fortschritt wächst nur vorwärts und in kleinen Schritten; Ziel nur im Zielring am Pfadende', () => {
    const path = straight();
    const s = newTrace();
    penDown(s, path, cfg, path.start);
    let prev = 0;
    for (let x = 104; x <= 600; x += 4) {
      penMove(s, path, cfg, { x, y: 300 });
      expect(s.progress).toBeGreaterThanOrEqual(prev);
      expect(s.progress - prev).toBeLessThanOrEqual(Math.ceil(10 / SAMPLE_SPACING));
      prev = s.progress;
    }
    // zurückfahren: Fortschritt sinkt nicht
    for (let x = 600; x >= 400; x -= 4) penMove(s, path, cfg, { x, y: 300 });
    expect(s.progress).toBe(prev);
    expect(s.finished).toBeNull();
    // bis kurz vor das Ziel: noch nicht fertig
    for (let x = 400; x <= 1000 - GOAL_RADIUS - 6; x += 4) penMove(s, path, cfg, { x, y: 300 });
    expect(s.finished).toBeNull();
    const ev = penMove(s, path, cfg, { x: 1000, y: 300 });
    expect(types(ev)).toContain('goal');
    expect(s.finished).toBe('goal');
    expect(s.errors).toBe(0);
  });
  it('Abkürzung zählt nicht: quer über die Schleife kommt der Stift nicht ans Ziel', () => {
    const path = pathFromControl([
      { x: 100, y: 600 },
      { x: 1000, y: 600 },
      { x: 1000, y: 100 },
      { x: 100, y: 100 },
    ]);
    const s = newTrace();
    penDown(s, path, cfg, path.start);
    const ev: TraceEvent[] = [];
    for (let y = 596; y >= 100; y -= 4) ev.push(...penMove(s, path, cfg, { x: 100, y }));
    expect(types(ev)).toContain('error');
    expect(s.finished).toBeNull();
    expect(s.progress).toBeLessThan(path.pts.length * 0.1);
    // ein einziger langer Sprung ins Ziel: ebenfalls kein Erfolg
    const t = newTrace();
    penDown(t, path, cfg, path.start);
    penMove(t, path, cfg, path.goal);
    expect(t.finished).toBeNull();
    expect(t.progress).toBeLessThan(path.pts.length * 0.1);
  });
});

describe('Fehler: Zustandsautomat', () => {
  const along = (s: ReturnType<typeof newTrace>, path = straight(), to = 300) => {
    penDown(s, path, cfg, path.start);
    for (let x = 104; x <= to; x += 4) penMove(s, path, cfg, { x, y: 300 });
  };
  it('Verlassen über die Fehlergrenze: genau EIN Fehler je Ausflug, Punkte außerhalb zählen und zeichnen nicht', () => {
    const path = straight();
    const s = newTrace();
    along(s);
    const strokeLen = s.strokes[0].length;
    const samples = s.samples;
    const ev: TraceEvent[] = [];
    for (let y = 304; y <= 420; y += 4) ev.push(...penMove(s, path, cfg, { x: 300, y }));
    for (let x = 300; x <= 340; x += 4) ev.push(...penMove(s, path, cfg, { x, y: 420 }));
    expect(types(ev).filter((x) => x === 'error')).toHaveLength(1);
    expect(s.errors).toBe(1);
    expect(s.status).toBe('error');
    expect(s.samples - samples).toBeLessThanOrEqual(Math.ceil(cfg.errorDist / 4) + 1); // nur Punkte VOR der Grenze
    const after = s.samples;
    expect(s.strokes[0].length).toBeLessThanOrEqual(strokeLen + Math.ceil(cfg.errorDist / 4) + 1);
    for (let i = 0; i < 20; i++) penMove(s, path, cfg, { x: 340 + i, y: 430 });
    expect(s.samples).toBe(after);
    expect(s.errors).toBe(1);
  });
  it('Weiterzeichnen erst im Rückkehrradius (30 px) um den letzten gültigen Punkt', () => {
    const path = straight();
    const s = newTrace();
    along(s);
    const last = { ...s.lastValid! };
    for (let y = 304; y <= 400; y += 4) penMove(s, path, cfg, { x: 300, y });
    expect(s.status).toBe('error');
    // zurück auf den Pfad, aber weit vom Linienende: bleibt im Fehlerzustand
    penMove(s, path, cfg, { x: 500, y: 400 });
    penMove(s, path, cfg, { x: 500, y: 300 });
    expect(s.status).toBe('error');
    expect(s.strokes.flat().some((p) => p.x > last.x + 8)).toBe(false);
    // zum Linienende zurück
    const ev = penMove(s, path, cfg, { x: last.x + 10, y: 300 });
    expect(types(ev)).toContain('resume');
    expect(s.status).toBe('drawing');
    expect(s.errors).toBe(1);
    // weitermalen
    for (let x = last.x + 30; x <= last.x + 80; x += 4) penMove(s, path, cfg, { x, y: 300 });
    expect(s.lastValid!.x).toBeGreaterThan(last.x + 60);
    // zweiter Ausflug = zweiter Fehler
    for (let y = 304; y <= 400; y += 4) penMove(s, path, cfg, { x: s.lastValid!.x, y });
    expect(s.errors).toBe(2);
  });
  it('Stift abgesetzt: nur am Linienende weiter, sonst Hinweis', () => {
    const path = straight();
    const s = newTrace();
    along(s);
    penUp(s);
    expect(s.status).toBe('lifted');
    expect(types(penDown(s, path, cfg, { x: 600, y: 300 }))).toEqual(['hint']);
    expect(s.status).toBe('lifted');
    penUp(s);
    const end = s.lastValid!;
    expect(types(penDown(s, path, cfg, { x: end.x + RESUME_RADIUS - 4, y: 300 }))).toEqual(['resume']);
    expect(s.status).toBe('drawing');
    // nach Fehler und Absetzen: ebenfalls nur am Linienende
    for (let y = 304; y <= 400; y += 4) penMove(s, path, cfg, { x: end.x, y });
    penUp(s);
    expect(s.status).toBe('error');
    expect(types(penDown(s, path, cfg, { x: 800, y: 300 }))).toEqual(['hint']);
    penUp(s);
    expect(types(penDown(s, path, cfg, { x: end.x + 5, y: 300 }))).toEqual(['resume']);
  });
  it('Fehlerlimit beendet die Runde (0 = aus)', () => {
    const path = straight();
    const limited: TraceConfig = { ...cfg, errorLimit: 2 };
    const s = newTrace();
    penDown(s, path, limited, path.start);
    for (let x = 104; x <= 300; x += 4) penMove(s, path, limited, { x, y: 300 });
    for (let y = 304; y <= 400; y += 4) penMove(s, path, limited, { x: 300, y });
    expect(s.finished).toBeNull();
    penMove(s, path, limited, { x: s.lastValid!.x, y: 302 });
    expect(s.status).toBe('drawing');
    let ev: TraceEvent[] = [];
    for (let y = 304; y <= 400; y += 4) ev = ev.concat(penMove(s, path, limited, { x: s.lastValid!.x, y }));
    expect(types(ev)).toContain('limit');
    expect(s.finished).toBe('limit');
    // danach keine Eingabe mehr
    expect(penMove(s, path, limited, { x: 500, y: 300 })).toEqual([]);
    // ohne Limit endet es nie durch Fehler
    const u = newTrace();
    penDown(u, path, cfg, path.start);
    for (let k = 0; k < 5; k++) {
      for (let y = 304; y <= 400; y += 4) penMove(u, path, cfg, { x: 150, y });
      penMove(u, path, cfg, { x: u.lastValid!.x, y: 302 });
    }
    expect(u.errors).toBeGreaterThanOrEqual(5);
    expect(u.finished).toBeNull();
  });
  it('Linie löschen: von vorn, Fehlerzähler der Session bleiben', () => {
    const path = straight();
    const s = newTrace();
    along(s);
    for (let y = 304; y <= 400; y += 4) penMove(s, path, cfg, { x: 300, y });
    clearLine(s);
    expect(s.status).toBe('ready');
    expect(s.strokes).toEqual([]);
    expect(s.progress).toBe(0);
    expect(s.errors).toBe(1);
  });
});

describe('Wertung', () => {
  it('Genauigkeit = Anteil Punkte in der Toleranzzone, Abweichung = Mittel der Abstände', () => {
    const path = straight();
    expect(toleranceOf(16)).toBe(22);
    const s = newTrace();
    penDown(s, path, cfg, path.start);
    for (let x = 104; x <= 500; x += 4) penMove(s, path, cfg, { x, y: 300 }); // genau
    const exact = s.samples;
    expect(accuracyOf(s)).toBe(100);
    expect(avgDeviationOf(s)).toBeLessThan(0.5);
    for (let x = 504; x <= 900; x += 4) penMove(s, path, cfg, { x, y: 325 }); // 25 px daneben: gültig, aber außerhalb der Toleranz
    expect(s.errors).toBe(0);
    const acc = accuracyOf(s);
    expect(acc).toBeGreaterThan(40);
    expect(acc).toBeLessThan(60);
    expect(s.inTolerance).toBeLessThanOrEqual(exact + 10);
    expect(avgDeviationOf(s)).toBeGreaterThan(9);
    expect(avgDeviationOf(s)).toBeLessThan(16);
    expect(accuracyOf(newTrace())).toBe(100);
    expect(avgDeviationOf(newTrace())).toBe(0);
  });
});

describe('Farbwechsel-Planer', () => {
  const hard: ScheduleConfig = { intervalMs: 2000, distancePx: 150, onlyDistance: false, mode: 'HARD', fadeMs: 800 };
  const fade: ScheduleConfig = { ...hard, mode: 'FADE' };
  const run = (c: ScheduleConfig, s: ScheduleState, dt: number, px = 0) => stepSchedule(s, c, dt, px);

  it('Zeitintervall: Wechsel nach 2 s, Zähler zurückgesetzt', () => {
    let s = newSchedule('AMBLYOPIC');
    let r = run(hard, s, 1900);
    expect(r.changed).toBe(0);
    s = r.state;
    r = run(hard, s, 100);
    expect(r.changed).toBe(1);
    expect(r.state.eye).toBe('FELLOW');
    expect(r.state.elapsedMs).toBe(0);
    expect(r.state.drawnPx).toBe(0);
    expect(r.state.changes).toBe(1);
  });
  it('Strecke: Wechsel nach 150 px, auch vor Ablauf der Zeit; danach beide Zähler zurück', () => {
    let s = newSchedule('FELLOW');
    let r = run(hard, s, 100, 100);
    expect(r.changed).toBe(0);
    s = r.state;
    expect(s.drawnPx).toBe(100);
    r = run(hard, s, 100, 60);
    expect(r.changed).toBe(1);
    expect(r.state.eye).toBe('AMBLYOPIC');
    expect(r.state.elapsedMs).toBe(0);
    expect(r.state.drawnPx).toBe(0);
  });
  it('„Nur Strecke“: die Zeit löst nie aus', () => {
    const c: ScheduleConfig = { ...hard, onlyDistance: true };
    let s = newSchedule('AMBLYOPIC');
    s = run(c, s, 60000).state;
    expect(s.eye).toBe('AMBLYOPIC');
    expect(s.changes).toBe(0);
    s = run(c, s, 0, 149).state;
    expect(s.changes).toBe(0);
    s = run(c, s, 0, 1).state;
    expect(s.changes).toBe(1);
  });
  it('mehrere Wechsel in einem langen Zeitschritt', () => {
    const r = run(hard, newSchedule('AMBLYOPIC'), 5000);
    expect(r.changed).toBe(2);
    expect(r.state.elapsedMs).toBe(1000);
  });
  it('Fade: erst alte Farbe aus (k 1 → 0), dann neue ein (k 0 → 1); nie beide zugleich', () => {
    let s = newSchedule('AMBLYOPIC');
    s = run(fade, s, 2000).state;
    expect(s.phase).toBe('fadeOut');
    expect(s.eye).toBe('AMBLYOPIC');
    expect(colorK(s, fade)).toBe(1);
    let sawOut = false;
    let sawIn = false;
    let prevK = 1;
    let prevIn = 0;
    for (let ms = 0; ms < 800; ms += 20) {
      s = run(fade, s, 20).state;
      const vis = visibleColors(s, fade);
      const lit = vis.filter((v) => v.k > 0);
      expect(lit.length).toBeLessThanOrEqual(1); // nie beide gleichzeitig
      const [a, f] = vis;
      expect(a.k > 0 && f.k > 0).toBe(false);
      if (s.phase === 'fadeOut') {
        sawOut = true;
        expect(s.eye).toBe('AMBLYOPIC');
        expect(colorK(s, fade)).toBeLessThanOrEqual(prevK);
      }
      if (s.phase === 'fadeIn') {
        sawIn = true;
        expect(s.eye).toBe('FELLOW');
        expect(colorK(s, fade)).toBeGreaterThanOrEqual(prevIn);
        prevIn = colorK(s, fade);
      }
      prevK = colorK(s, fade);
    }
    expect(sawOut).toBe(true);
    expect(sawIn).toBe(true);
    expect(s.phase).toBe('steady');
    expect(s.eye).toBe('FELLOW');
    expect(s.changes).toBe(1);
    expect(colorK(s, fade)).toBe(1);
    // Nullpunkt zwischen beiden Hälften
    const mid = run(fade, run(fade, newSchedule('AMBLYOPIC'), 2000).state, 400);
    expect(colorK(mid.state, fade)).toBe(0);
  });
  it('Fade: Zähler stehen während des Fades; danach auf null', () => {
    let s = run(fade, newSchedule('AMBLYOPIC'), 2000).state;
    expect(s.phase).toBe('fadeOut');
    const before = { e: s.elapsedMs, d: s.drawnPx };
    s = run(fade, s, 300, 500).state; // Strecke und Zeit im Fade zählen nicht
    expect(s.phase).toBe('fadeOut');
    expect({ e: s.elapsedMs, d: s.drawnPx }).toEqual(before);
    s = run(fade, s, 500, 500).state;
    expect(s.phase).toBe('steady');
    expect(s.elapsedMs).toBe(0);
    expect(s.drawnPx).toBe(0);
    // durch die Strecke ausgelöst: ebenfalls Fade
    const d = run(fade, newSchedule('FELLOW'), 10, 200).state;
    expect(d.phase).toBe('fadeOut');
  });
  it('Zufallstest: nie zwei Farben sichtbar, Wechsel zählen einzeln', () => {
    const rng = makeRng(7);
    let s = newSchedule('AMBLYOPIC');
    let total = 0;
    for (let i = 0; i < 2000; i++) {
      const r = run(fade, s, rng() * 90, rng() < 0.5 ? rng() * 40 : 0);
      s = r.state;
      total += r.changed;
      const vis = visibleColors(s, fade);
      expect(vis.filter((v) => v.k > 0).length).toBeLessThanOrEqual(1);
      for (const v of vis) {
        expect(v.k).toBeGreaterThanOrEqual(0);
        expect(v.k).toBeLessThanOrEqual(1);
      }
    }
    expect(total).toBe(s.changes);
    expect(total).toBeGreaterThan(5);
  });
});

describe('Einstellungen Nachzeichnen', () => {
  it('Standardwerte laut Spezifikation', () => {
    expect(DEFAULT_NACH).toMatchObject({ pathWidth: 16, intervalS: 2, distancePx: 150, onlyDistance: false, changeMode: 'HARD', fadeS: 0.8, errorDist: 28 });
    expect(normalizeNach(undefined)).toEqual(DEFAULT_NACH);
    expect(normalizeNach('quatsch')).toEqual(DEFAULT_NACH);
  });
  it('Werte werden streng begrenzt', () => {
    const n = normalizeNach({ pathWidth: 3, curvePoints: 99, curveSpread: -1, intervalS: 100, distancePx: 1, changeMode: 'FADE', fadeS: 0, errorDist: 5, errorLimit: 3.6, onlyDistance: 'ja' });
    expect(n.pathWidth).toBe(8);
    expect(n.curvePoints).toBe(10);
    expect(n.curveSpread).toBe(20);
    expect(n.intervalS).toBe(6);
    expect(n.distancePx).toBe(40);
    expect(n.changeMode).toBe('FADE');
    expect(n.fadeS).toBe(0.2);
    expect(n.errorDist).toBe(minErrorDist(8));
    expect(n.errorLimit).toBe(4);
    expect(n.onlyDistance).toBe(false);
    expect(normalizeNach({ intervalS: NaN, distancePx: Infinity }).intervalS).toBe(2);
  });
  it('Fehlerabstand liegt immer jenseits der Toleranzzone', () => {
    for (const w of [8, 16, 24, 40]) {
      const n = normalizeNach({ pathWidth: w, errorDist: 16 });
      expect(n.errorDist).toBeGreaterThan(toleranceOf(w));
    }
  });
  it('Start- und Rückkehrradius laut Spezifikation', () => {
    expect(START_RADIUS).toBe(24);
    expect(RESUME_RADIUS).toBe(30);
  });
});
