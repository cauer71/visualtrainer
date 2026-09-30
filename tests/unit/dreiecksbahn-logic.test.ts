import { describe, expect, it } from 'vitest';
import { PursuitExercise } from '../../src/exercises/_shared/pursuit';
import { MAX_TRACK_WIDTH, span, targetRadiusFor, type Bounds } from '../../src/exercises/_shared/pursuit-logic';
import { CORNER_TURN, cornerRadiusFraction, KAPPA, speedFor, TriangleTrack, triangleSide } from '../../src/exercises/dreiecksbahn/logic';
import { simulate } from './_pursuit-sim';

const AREA: Bounds = span(60, 1134, 60, 640);
const W = 1194;

function make(level: number, area = AREA, w = W, dir: 1 | -1 = 1): TriangleTrack {
  const tr = new TriangleTrack();
  tr.setLevel(level);
  tr.layout(area, w, 8);
  tr.begin(0.21, dir);
  return tr;
}

function run(track: TriangleTrack, dtFor: (i: number) => number, seconds: number, speed: number) {
  const out: { x: number; y: number }[] = [];
  let t = 0;
  let i = 0;
  while (t < seconds - 1e-9) {
    const dt = Math.min(dtFor(i++), seconds - t);
    track.step(dt, speed);
    t += dt;
    out.push({ ...track.pos });
  }
  return out;
}

/** Länge der Polylinie */
function pathLength(pts: readonly { x: number; y: number }[]): number {
  let s = 0;
  for (let i = 1; i < pts.length; i++) s += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  return s;
}

describe('dreiecksbahn: Stufen', () => {
  it('Ecken: abgerundet auf niedrigen Stufen, ab Stufe 9 spitz', () => {
    expect(cornerRadiusFraction(1)).toBeCloseTo(0.1, 9);
    expect(cornerRadiusFraction(9)).toBe(0);
    expect(cornerRadiusFraction(20)).toBe(0);
    for (let l = 2; l <= 20; l++) expect(cornerRadiusFraction(l)).toBeLessThanOrEqual(cornerRadiusFraction(l - 1));
    expect(speedFor(20)).toBeGreaterThan(speedFor(1));
    expect(KAPPA).toBeCloseTo((2 * Math.sqrt(3)) / CORNER_TURN, 9);
  });

  it('Kantenlänge: echtes gleichseitiges Dreieck, ≤ 60 % der Bühnenbreite, passt ins Feld', () => {
    expect(triangleSide(AREA, W)).toBeLessThanOrEqual(MAX_TRACK_WIDTH * W + 1e-9);
    const flat = span(60, 1134, 100, 300);
    expect(triangleSide(flat, W)).toBeCloseTo((2 * 200) / Math.sqrt(3), 6);
    const narrow = span(30, 330, 40, 700);
    expect(triangleSide(narrow, 360)).toBeLessThanOrEqual(0.6 * 360 + 1e-9);
  });
});

describe('TriangleTrack', () => {
  it('bleibt im Feld, ist höchstens 60 % breit und gleichseitig', () => {
    for (const level of [1, 5, 9, 20]) {
      const tr = make(level);
      const pts = run(tr, () => 1 / 60, 60, 300);
      for (const p of pts) {
        expect(p.x).toBeGreaterThanOrEqual(AREA.minX - 1e-6);
        expect(p.x).toBeLessThanOrEqual(AREA.maxX + 1e-6);
        expect(p.y).toBeGreaterThanOrEqual(AREA.minY - 1e-6);
        expect(p.y).toBeLessThanOrEqual(AREA.maxY + 1e-6);
      }
      const xs = pts.map((p) => p.x);
      const ys = pts.map((p) => p.y);
      const width = Math.max(...xs) - Math.min(...xs);
      const height = Math.max(...ys) - Math.min(...ys);
      expect(width).toBeLessThanOrEqual(MAX_TRACK_WIDTH * W + 1);
      // spitzes Dreieck: Breite a, Höhe a·√3/2; gerundet etwas weniger Höhe
      if (level >= 9) {
        expect(height / width).toBeGreaterThan(0.85);
        expect(height / width).toBeLessThan(0.88);
      }
    }
  });

  it('Bahnlänge: spitz 3 a, gerundet kürzer', () => {
    const sharp = make(20);
    const soft = make(1);
    const a = sharp.side;
    expect(pathLength(sharp.outline())).toBeCloseTo(3 * a, 0);
    const Ls = pathLength(soft.outline());
    const expected = 3 * a - 3 * (2 * soft.radius * Math.sqrt(3) - soft.radius * CORNER_TURN);
    expect(Ls).toBeLessThan(3 * a);
    expect(Math.abs(Ls - expected)).toBeLessThan(2);
  });

  it('gleichmäßiges Tempo auf allen Kanten und in den Rundungen, bildratenunabhängig', () => {
    for (const level of [1, 20]) {
      const v = 320;
      const a = run(make(level), () => 1 / 240, 20, v);
      // Weg je Schritt = v·dt (Sehnenfehler in den Rundungen vernachlässigbar)
      const dt = 1 / 240;
      let prev = a[0];
      let full = 0;
      for (let i = 1; i < a.length; i++) {
        const d = Math.hypot(a[i].x - prev.x, a[i].y - prev.y);
        expect(d).toBeLessThanOrEqual(v * dt + 1e-6);
        // nur der Schritt mit einer spitzen Ecke darf kürzer sein (Sehne über den Knick)
        if (d > v * dt * 0.97) full++;
        else expect(d).toBeGreaterThan(v * dt * 0.4);
        prev = a[i];
      }
      expect(full).toBeGreaterThan(a.length * 0.98);
      const b = run(make(level), () => 1 / 60, 20, v);
      const c = run(make(level), (i) => (i % 2 ? 1 / 30 : 1 / 90), 20, v);
      const eb = b[b.length - 1];
      for (const e of [a[a.length - 1], c[c.length - 1]]) expect(Math.hypot(e.x - eb.x, e.y - eb.y)).toBeLessThan(3);
    }
  });

  it('läuft in beide Richtungen um das Dreieck (Uhrzeigersinn und dagegen)', () => {
    const signedArea = (pts: { x: number; y: number }[]) => {
      let s = 0;
      for (let i = 1; i < pts.length; i++) s += pts[i - 1].x * pts[i].y - pts[i].x * pts[i - 1].y;
      return s;
    };
    const cw = run(make(20, AREA, W, 1), () => 1 / 60, 10, 400);
    const ccw = run(make(20, AREA, W, -1), () => 1 / 60, 10, 400);
    expect(Math.sign(signedArea(cw))).toBe(-Math.sign(signedArea(ccw)));
    // Dir = 1: Spitze oben → rechts unten → links unten → (Bildschirm: im Uhrzeigersinn)
    expect(signedArea(cw)).toBeGreaterThan(0);
  });

  it('Richtungswechsel: spitze Ecke knickt um 120°', () => {
    const tr = make(20);
    const v = 300;
    const dt = 1 / 240;
    const pts = run(tr, () => dt, 20, v);
    const head = (i: number) => Math.atan2(pts[i].y - pts[i - 1].y, pts[i].x - pts[i - 1].x);
    const turn = (x: number, y: number) => {
      let da = Math.abs(x - y);
      if (da > Math.PI) da = 2 * Math.PI - da;
      return da;
    };
    let sharpCorners = 0;
    for (let i = 4; i < pts.length - 4; i++) {
      if (turn(head(i), head(i + 1)) > 0.3) {
        sharpCorners++;
        // Richtung vor und nach der Ecke, je ein paar Schritte entfernt
        const deg = (turn(head(i - 2), head(i + 3)) * 180) / Math.PI;
        expect(deg).toBeGreaterThan(118);
        expect(deg).toBeLessThan(122);
        i += 6;
      }
    }
    expect(sharpCorners).toBeGreaterThanOrEqual(3);
  });

  it('gerundete Ecken haben keinen harten Knick', () => {
    const tr = make(1);
    const dt = 1 / 240;
    const pts = run(tr, () => dt, 20, 300);
    let maxTurn = 0;
    for (let i = 2; i < pts.length; i++) {
      const a1 = Math.atan2(pts[i - 1].y - pts[i - 2].y, pts[i - 1].x - pts[i - 2].x);
      const a2 = Math.atan2(pts[i].y - pts[i - 1].y, pts[i].x - pts[i - 1].x);
      let da = Math.abs(a2 - a1);
      if (da > Math.PI) da = 2 * Math.PI - da;
      maxTurn = Math.max(maxTurn, da);
    }
    expect(maxTurn).toBeLessThan(0.1);
  });

  it('springt beim Stufenwechsel nicht (Rundung wird weich nachgeführt)', () => {
    const tr = make(1);
    run(tr, () => 1 / 60, 7, 200);
    let prev = { ...tr.pos };
    tr.setLevel(12);
    let maxJump = 0;
    for (let i = 0; i < 240; i++) {
      tr.step(1 / 60, 200);
      maxJump = Math.max(maxJump, Math.hypot(tr.pos.x - prev.x, tr.pos.y - prev.y));
      prev = { ...tr.pos };
    }
    expect(tr.radius).toBeLessThan(1);
    expect(maxJump).toBeLessThan(200 / 60 + 6);
    // und umgekehrt: Ecken werden wieder rund
    tr.setLevel(1);
    for (let i = 0; i < 240; i++) {
      tr.step(1 / 60, 200);
      maxJump = Math.max(maxJump, Math.hypot(tr.pos.x - prev.x, tr.pos.y - prev.y));
      prev = { ...tr.pos };
    }
    expect(tr.radius).toBeGreaterThan(cornerRadiusFraction(1) * tr.side * 0.98);
    expect(maxJump).toBeLessThan(200 / 60 + 6);
  });

  it('safeFor: nie in der Ecke oder in der Rundung, und das Zeichen bleibt bis zum Ende frei', () => {
    for (const level of [1, 6, 20]) {
      const tr = make(level);
      const v = speedFor(level) * 8;
      const margin = 40;
      const seconds = 0.4;
      const copy = make(level);
      let open = 0;
      let closed = 0;
      for (let i = 0; i < 60 * 90; i++) {
        tr.step(1 / 60, v);
        if (!tr.safeFor(seconds, margin)) {
          closed++;
          continue;
        }
        open++;
        Object.assign(copy, tr);
        let t = 0;
        while (t < seconds) {
          copy.step(1 / 60, v);
          t += 1 / 60;
          const d = copy.distances();
          expect(d).not.toBeNull();
          expect(Math.min(d!.ahead, d!.behind)).toBeGreaterThanOrEqual(margin - v / 60 - 1e-6);
        }
      }
      expect(open).toBeGreaterThan(0);
      expect(closed).toBeGreaterThan(0);
    }
  }, 60000);

  it('passt sich dem Hochformat an', () => {
    const small = span(30, 330, 40, 600);
    const tr = make(3, small, 360);
    const pts = run(tr, () => 1 / 60, 30, 100);
    for (const p of pts) {
      expect(p.x).toBeGreaterThanOrEqual(small.minX - 1e-6);
      expect(p.x).toBeLessThanOrEqual(small.maxX + 1e-6);
      expect(p.y).toBeGreaterThanOrEqual(small.minY - 1e-6);
      expect(p.y).toBeLessThanOrEqual(small.maxY + 1e-6);
    }
    const xs = pts.map((p) => p.x);
    expect(Math.max(...xs) - Math.min(...xs)).toBeLessThanOrEqual(0.6 * 360 + 1);
  });
});

describe('dreiecksbahn: Kern mit Autoplay', () => {
  const stages: [string, number, number][] = [
    ['Tablet quer', 1194, 834],
    ['Tablet hoch', 834, 1194],
    ['Handy hoch', 390, 844],
    ['Intro-Film 16:11', 880, 606],
  ];

  for (const [name, w, h] of stages) {
    for (const start of [1, 12, 20]) {
      it(`${name}, Startstufe ${start}: Zeichen nie in der Ecke, Sitzung endet`, () => {
        const track = new TriangleTrack();
        let radiusOk = true;
        const { result, shows } = simulate(
          (ctx) => new PursuitExercise(ctx, { track, speedFor, demoLevel: 3 }),
          {
            w,
            h,
            startLevel: start,
            onShowFrame: (_ex, signSize) => {
              const d = track.distances();
              if (!d || Math.min(d.ahead, d.behind) < targetRadiusFor(signSize)) radiusOk = false;
            },
          },
        );
        expect(result).not.toBeNull();
        expect(shows).toBeGreaterThanOrEqual(15);
        expect(radiusOk).toBe(true);
      });
    }
  }

  it('Intro-Film: 8–14 s, endet mit finish, Zeichen nie in der Ecke', () => {
    for (const [w, h] of [[880, 606], [606, 880]] as const) {
      for (const seed of [1, 2, 3]) {
        const track = new TriangleTrack();
        let ok = true;
        const r = simulate((ctx) => new PursuitExercise(ctx, { track, speedFor, demoLevel: 3 }), {
          w,
          h,
          mode: 'demo',
          seed,
          onShowFrame: (_ex, s) => {
            const d = track.distances();
            if (!d || Math.min(d.ahead, d.behind) < targetRadiusFor(s)) ok = false;
          },
        });
        expect(r.result).not.toBeNull();
        expect(ok).toBe(true);
        expect(r.seconds).toBeGreaterThan(7);
        expect(r.seconds).toBeLessThan(15);
      }
    }
  });
});
