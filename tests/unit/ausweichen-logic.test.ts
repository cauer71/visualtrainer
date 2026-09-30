import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  AIMED_SHARE,
  chooseDodge,
  clampFigure,
  countFor,
  fingerOffsetPx,
  FIGURE_HIT,
  FIGURE_R_U,
  grabRadiusPx,
  isGone,
  levelInt,
  makeDemoOb,
  makeOb,
  MAX_LEVEL,
  MIN_LEVEL,
  type Ob,
  obRadius,
  pointsFor,
  segmentTouches,
  sizeUFor,
  speedUFor,
  stepOb,
  survivalPct,
} from '../../src/exercises/ausweichen/logic';

const W = 1180;
const H = 820;
const u = 7.8;
const field = { minX: 70, maxX: 1110, minY: 70, maxY: 700 };

const ball = (x: number, y: number, vx = 0, vy = 0, r = 26): Ob => ({ kind: 'ball', x, y, vx, vy, r, hw: r, hh: r, alpha: 1, dying: false });
const box = (x: number, y: number, hw = 30, hh = 20): Ob => ({ kind: 'box', x, y, vx: 0, vy: 0, r: 30, hw, hh, alpha: 1, dying: false });

describe('ausweichen: Stufenfunktionen', () => {
  it('Zahl der Hindernisse: 2 bis 7, nie sinkend', () => {
    expect(countFor(1)).toBe(2);
    expect(countFor(3.9)).toBe(2);
    expect(countFor(4)).toBe(3);
    expect(countFor(MAX_LEVEL)).toBe(7);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(countFor(l)).toBeGreaterThanOrEqual(countFor(l - 1));
    expect(levelInt(0)).toBe(MIN_LEVEL);
    expect(levelInt(99)).toBe(MAX_LEVEL);
  });

  it('Tempo steigt langsam (11 → etwa 24 u/s), Größe nur leicht', () => {
    expect(speedUFor(1)).toBeCloseTo(11, 6);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(speedUFor(l)).toBeGreaterThan(speedUFor(l - 1));
    expect(speedUFor(MAX_LEVEL)).toBeLessThan(26);
    expect(sizeUFor(MAX_LEVEL) - sizeUFor(1)).toBeLessThan(1.2);
  });

  it('Versatz und Aufsetzkreis sind fingerfreundlich', () => {
    expect(fingerOffsetPx(3.6)).toBeGreaterThanOrEqual(50);
    expect(fingerOffsetPx(7.68)).toBeGreaterThan(FIGURE_R_U * 7.68 * 2);
    expect(grabRadiusPx(3.6)).toBeGreaterThanOrEqual(34);
  });

  it('Punkte: mehr mit der Stufe, weniger bei Berührungen, nie negativ', () => {
    expect(pointsFor(5, 0)).toBeGreaterThan(pointsFor(1, 0));
    expect(pointsFor(5, 2)).toBeLessThan(pointsFor(5, 0));
    expect(pointsFor(1, 99)).toBe(0);
  });
});

describe('ausweichen: Berührung entlang der Strecke', () => {
  it('Kugel: Berührung, wenn der Abstand von der Strecke klein genug ist', () => {
    const b = ball(200, 100, 0, 0, 20);
    expect(segmentTouches({ x: 100, y: 100 }, { x: 300, y: 100 }, 10, b)).toBe(true);
    // springt an der Kugel vorbei durch sie hindurch: wird trotzdem erkannt
    expect(segmentTouches({ x: 100, y: 100 }, { x: 600, y: 100 }, 10, b)).toBe(true);
    expect(segmentTouches({ x: 100, y: 140 }, { x: 300, y: 140 }, 10, b)).toBe(false);
    expect(segmentTouches({ x: 100, y: 125 }, { x: 300, y: 125 }, 10, b)).toBe(true);
  });

  it('Quader: Berührung an Kante und Ecke, kein Durchspringen', () => {
    const b = box(200, 100, 30, 20);
    expect(segmentTouches({ x: 100, y: 100 }, { x: 600, y: 100 }, 10, b)).toBe(true);
    expect(segmentTouches({ x: 100, y: 140 }, { x: 300, y: 140 }, 10, b)).toBe(false);
    expect(segmentTouches({ x: 100, y: 125 }, { x: 300, y: 125 }, 10, b)).toBe(true);
    // Ecke: Abstand zur Ecke (230, 120) größer als 10
    expect(segmentTouches({ x: 245, y: 135 }, { x: 245, y: 135 }, 10, b)).toBe(false);
    expect(segmentTouches({ x: 236, y: 126 }, { x: 236, y: 126 }, 10, b)).toBe(true);
  });

  it('ruhende Figur wird von einem hereingleitenden Hindernis berührt, aber nicht zu früh', () => {
    const b = ball(0, 100, 60, 0, 20);
    const fig = { x: 200, y: 100 };
    let first = -1;
    for (let i = 0; i < 400; i++) {
      stepOb(b, 1 / 60);
      if (first < 0 && segmentTouches(fig, fig, 12, b)) first = i;
    }
    expect(first).toBeGreaterThan(0);
    // Berührung erst, wenn der Abstand kleiner als 32 ist: x ≥ 168 → t ≈ 2,8 s
    expect(first / 60).toBeGreaterThan(2.6);
    expect(first / 60).toBeLessThan(3.0);
  });

  it('gleiches Ergebnis bei 60 und 120 Hz', () => {
    const run = (hz: number) => {
      const b = ball(0, 100, 60, 0, 20);
      const fig = { x: 200, y: 100 };
      for (let i = 0; i < 10 * hz; i++) {
        stepOb(b, 1 / hz);
        if (segmentTouches(fig, fig, 12, b)) return i / hz;
      }
      return -1;
    };
    expect(Math.abs(run(60) - run(120))).toBeLessThan(0.02);
  });
});

describe('ausweichen: neue Hindernisse', () => {
  it('kommen von links, rechts oder oben (nie von unten) und fliegen ins Feld', () => {
    const rng = createRng(3);
    const fig = { x: 600, y: 500 };
    const sides = { L: 0, R: 0, T: 0 };
    for (let level = 1; level <= MAX_LEVEL; level += 3) {
      for (let i = 0; i < 80; i++) {
        const o = makeOb({ w: W, h: H, field, u, level, fig }, rng);
        const r = obRadius(o);
        if (o.x < 0) sides.L++;
        else if (o.x > W) sides.R++;
        else {
          sides.T++;
          expect(o.y).toBeLessThan(0);
        }
        // startet außerhalb der Bühne und hat ein Tempo in der Stufe
        expect(o.x < -r + 0.5 || o.x > W + r - 0.5 || o.y < -r + 0.5).toBe(true);
        const sp = Math.hypot(o.vx, o.vy);
        expect(sp).toBeGreaterThan(speedUFor(level) * u * 0.9);
        expect(sp).toBeLessThan(speedUFor(level) * u * 1.1);
        // fliegt auf die Bühne zu, nicht davon weg
        if (o.x < 0) expect(o.vx).toBeGreaterThan(0);
        if (o.x > W) expect(o.vx).toBeLessThan(0);
        if (o.y < 0 && o.x >= 0 && o.x <= W) expect(o.vy).toBeGreaterThan(0);
      }
    }
    expect(sides.L).toBeGreaterThan(0);
    expect(sides.R).toBeGreaterThan(0);
    expect(sides.T).toBeGreaterThan(0);
  });

  it('etwa die Hälfte zielt auf die Figur (geht bei ruhender Figur dicht an ihr vorbei)', () => {
    const rng = createRng(8);
    const fig = { x: 600, y: 420 };
    let aimed = 0;
    const n = 400;
    for (let i = 0; i < n; i++) {
      const o = makeOb({ w: W, h: H, field, u, level: 3, fig }, rng);
      // kleinster Abstand der Flugbahn zur Figur
      const sp = Math.hypot(o.vx, o.vy);
      const ux = o.vx / sp;
      const uy = o.vy / sp;
      const t = (fig.x - o.x) * ux + (fig.y - o.y) * uy;
      const d = Math.hypot(o.x + ux * t - fig.x, o.y + uy * t - fig.y);
      if (d < 2 * u) aimed++;
    }
    expect(aimed / n).toBeGreaterThan(AIMED_SHARE - 0.12);
    expect(aimed / n).toBeLessThan(AIMED_SHARE + 0.15);
  });

  it('Hindernis ist erst „weg“, wenn es weit draußen ist und weiter wegfliegt', () => {
    expect(isGone(ball(-200, 100, -10, 0, 20), W, H, 10)).toBe(true);
    expect(isGone(ball(-200, 100, 10, 0, 20), W, H, 10)).toBe(false); // fliegt noch herein
    expect(isGone(ball(600, 400, 10, 0, 20), W, H, 10)).toBe(false);
    expect(isGone(ball(W + 200, 100, 10, 0, 20), W, H, 10)).toBe(true);
  });

  it('Film-Hindernis gleitet auf die Figur zu', () => {
    const fig = { x: 600, y: 500 };
    const o = makeDemoOb(fig, u, { kind: 'ball', fromDeg: 180, distU: 40, speedU: 15 });
    expect(o.x).toBeCloseTo(fig.x - 40 * u, 6);
    expect(o.vx).toBeGreaterThan(0);
    expect(Math.abs(o.vy)).toBeLessThan(1e-9);
    const t = (40 * u) / (15 * u);
    expect(o.x + o.vx * t).toBeCloseTo(fig.x, 4);
  });
});

describe('ausweichen: Figur', () => {
  it('bleibt im Feld', () => {
    expect(clampFigure({ x: -50, y: 9999 }, field)).toEqual({ x: 70, y: 700 });
    expect(clampFigure({ x: 300, y: 300 }, field)).toEqual({ x: 300, y: 300 });
  });

  it('Überlebenszeit-Anteil in %', () => {
    expect(survivalPct(0, 0)).toBe(100);
    expect(survivalPct(21, 42)).toBe(50);
    expect(survivalPct(50, 42)).toBe(100);
  });
});

/** Kleine Simulation: Vorausschau weicht gezielt fliegenden Hindernissen aus (Grundlage für Film und Autoplay) */
describe('ausweichen: Vorausschau (Film und Autoplay)', () => {
  function simulate(seed: number, level: number, seconds: number, blind = false): number {
    const rng = createRng(seed);
    const pu = u;
    const figR = FIGURE_R_U * pu;
    const hitR = figR * FIGURE_HIT;
    let fig = { x: 590, y: 480 };
    let obs: Ob[] = [];
    let vel = { x: 0, y: 0 };
    let touches = 0;
    let nextSpawn = 0;
    const dt = 1 / 60;
    let cool = 0;
    for (let t = 0; t < seconds; t += dt) {
      if (obs.filter((o) => !o.dying).length < countFor(level) && t >= nextSpawn) {
        obs.push(makeOb({ w: W, h: H, field, u: pu, level, fig }, rng));
        nextSpawn = t + rng.range(0.5, 1.1);
      }
      const want = blind ? { x: 0, y: 0 } : chooseDodge(fig, hitR, obs, field, 30 * pu, 1.6, { x: 590, y: 400 });
      const q = 1 - Math.exp(-dt * 10);
      vel = { x: vel.x + (want.x * 30 * pu - vel.x) * q, y: vel.y + (want.y * 30 * pu - vel.y) * q };
      const next = clampFigure({ x: fig.x + vel.x * dt, y: fig.y + vel.y * dt }, field);
      let hit = false;
      for (const o of obs) {
        if (!o.dying && segmentTouches(fig, next, hitR, o)) hit = true;
      }
      fig = next;
      for (const o of obs) stepOb(o, dt);
      for (const o of obs) if (!o.dying && segmentTouches(fig, fig, hitR, o)) hit = true;
      obs = obs.filter((o) => !isGone(o, W, H, 2 * pu));
      cool -= dt;
      if (hit && cool <= 0) {
        touches++;
        cool = 1;
        // Berührtes Hindernis verschwindet wie in der Übung
        obs = obs.filter((o) => !segmentTouches(fig, fig, hitR + 4 * pu, o));
      }
    }
    return touches;
  }

  it('weicht auf niedrigen und mittleren Stufen fast immer aus, ein ruhender Finger würde oft berührt', () => {
    let aware = 0;
    let blind = 0;
    for (let seed = 1; seed <= 6; seed++) {
      aware += simulate(seed, 1, 40);
      aware += simulate(seed + 20, 7, 40);
      blind += simulate(seed, 1, 40, true);
      blind += simulate(seed + 20, 7, 40, true);
    }
    expect(aware).toBeLessThanOrEqual(6);
    expect(blind).toBeGreaterThan(aware + 4);
  });
});
