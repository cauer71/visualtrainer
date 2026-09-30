import { describe, expect, it } from 'vitest';
import { PursuitExercise } from '../../src/exercises/_shared/pursuit';
import { MAX_TRACK_WIDTH, span, targetRadiusFor, type Bounds } from '../../src/exercises/_shared/pursuit-logic';
import { ALPHA_MAX, ALPHA_MIN, angleFor, segmentCount, speedFor, turnFor, ZigzagTrack } from '../../src/exercises/zickzack-bahn/logic';
import { simulate } from './_pursuit-sim';

const AREA: Bounds = span(60, 1134, 60, 640);
const W = 1194;

function make(level: number, area = AREA, w = W, u = 8): ZigzagTrack {
  const tr = new ZigzagTrack();
  tr.setLevel(level);
  tr.layout(area, w, u);
  tr.begin(0.37, 1);
  return tr;
}

function run(track: ZigzagTrack, dtFor: (i: number) => number, seconds: number, speed: number) {
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

describe('zickzack-bahn: Stufen', () => {
  it('Knickwinkel und Tempo steigen mit der Stufe', () => {
    expect(angleFor(1)).toBe(ALPHA_MIN);
    expect(angleFor(20)).toBe(ALPHA_MAX);
    for (let l = 2; l <= 20; l++) expect(angleFor(l)).toBeGreaterThanOrEqual(angleFor(l - 1));
    expect(turnFor(1)).toBe(110);
    expect(turnFor(20)).toBe(160);
    expect(speedFor(20)).toBeGreaterThan(speedFor(1));
    // Gebrochene Stufen zählen zur unteren ganzen Stufe
    expect(angleFor(6.7)).toBe(angleFor(6));
  });

  it('Streckenzahl 3 … 6, je kleiner die Bühne desto weniger', () => {
    const big = segmentCount(0.6 * 1194, 8);
    const small = segmentCount(0.6 * 360, 3.6);
    expect(big).toBeGreaterThanOrEqual(3);
    expect(big).toBeLessThanOrEqual(6);
    expect(small).toBe(3);
    expect(big).toBeGreaterThanOrEqual(small);
  });
});

describe('ZigzagTrack', () => {
  it('bleibt im Feld und höchstens 60 % der Bühnenbreite breit, auf allen Stufen', () => {
    for (const level of [1, 6, 13, 20]) {
      const tr = make(level);
      const pts = run(tr, () => 1 / 60, 40, speedFor(level) * 8);
      for (const p of pts) {
        expect(p.x).toBeGreaterThanOrEqual(AREA.minX - 1e-6);
        expect(p.x).toBeLessThanOrEqual(AREA.maxX + 1e-6);
        expect(p.y).toBeGreaterThanOrEqual(AREA.minY - 1e-6);
        expect(p.y).toBeLessThanOrEqual(AREA.maxY + 1e-6);
      }
      const xs = pts.map((p) => p.x);
      expect(Math.max(...xs) - Math.min(...xs)).toBeLessThanOrEqual(MAX_TRACK_WIDTH * W + 1);
      // läuft von Ende zu Ende und zurück
      expect(Math.max(...xs) - Math.min(...xs)).toBeGreaterThan(0.85 * MAX_TRACK_WIDTH * W);
    }
  });

  it('passt sich dem Hochformat an (kleines Feld)', () => {
    const small = span(30, 330, 40, 520);
    const tr = make(20, small, 360, 3.6);
    for (const p of run(tr, () => 1 / 60, 40, 60 * 3.6)) {
      expect(p.x).toBeGreaterThanOrEqual(small.minX - 1e-6);
      expect(p.x).toBeLessThanOrEqual(small.maxX + 1e-6);
      expect(p.y).toBeGreaterThanOrEqual(small.minY - 1e-6);
      expect(p.y).toBeLessThanOrEqual(small.maxY + 1e-6);
    }
    const xs = run(make(5, small, 360, 3.6), () => 1 / 60, 30, 100).map((p) => p.x);
    expect(Math.max(...xs) - Math.min(...xs)).toBeLessThanOrEqual(0.6 * 360 + 1);
  });

  it('Neigung der Strecken: Stufe 1 ≈ 55°, Stufe 20 steiler (Feldhöhe begrenzt)', () => {
    const a = make(1);
    const b = make(20);
    expect(a.angle).toBeCloseTo(ALPHA_MIN, 3);
    expect(b.angle).toBeGreaterThan(a.angle + 10);
    expect(b.angle).toBeLessThanOrEqual(ALPHA_MAX + 1e-6);
  });

  it('läuft mit gleichmäßigem Tempo und ist bildratenunabhängig', () => {
    const v = 300;
    const a = run(make(8), () => 1 / 60, 20, v);
    const b = run(make(8), () => 1 / 120, 20, v);
    const c = run(make(8), (i) => (i % 2 ? 1 / 30 : 1 / 90), 20, v);
    const ea = a[a.length - 1];
    for (const e of [b[b.length - 1], c[c.length - 1]]) expect(Math.hypot(e.x - ea.x, e.y - ea.y)).toBeLessThan(1);
    // Weg je Schritt = v·dt, außer im Schritt, der einen Knick enthält (dort kürzer, nie länger)
    const dt = 1 / 60;
    let prev = a[0];
    let full = 0;
    for (let i = 1; i < a.length; i++) {
      const d = Math.hypot(a[i].x - prev.x, a[i].y - prev.y);
      expect(d).toBeLessThanOrEqual(v * dt + 1e-6);
      if (d > v * dt - 1e-6) full++;
      prev = a[i];
    }
    expect(full).toBeGreaterThan(a.length * 0.9);
  });

  it('kehrt an den Enden abrupt um, ohne abzubremsen', () => {
    const tr = make(5);
    tr.begin(0.97, 1);
    const xs: number[] = [];
    const v = 400;
    for (let i = 0; i < 120; i++) {
      tr.step(1 / 60, v);
      xs.push(tr.pos.x);
    }
    // x steigt bis zum Ende, danach fällt es wieder – ohne Stillstand dazwischen
    const max = Math.max(...xs);
    const idx = xs.indexOf(max);
    expect(idx).toBeGreaterThan(0);
    expect(idx).toBeLessThan(xs.length - 3);
    expect(xs[idx + 2]).toBeLessThan(max);
    expect(tr.cruise()).toBe(1);
  });

  it('springt beim Stufenwechsel nicht (Winkel wird weich nachgeführt)', () => {
    const tr = make(2);
    run(tr, () => 1 / 60, 5, 150);
    let prev = { ...tr.pos };
    tr.setLevel(18);
    let maxJump = 0;
    for (let i = 0; i < 180; i++) {
      tr.step(1 / 60, 150);
      maxJump = Math.max(maxJump, Math.hypot(tr.pos.x - prev.x, tr.pos.y - prev.y));
      prev = { ...tr.pos };
    }
    // Tempo 150/60 = 2,5 px je Bild plus die Verformung der Bahn, aber nie ein Sprung
    expect(maxJump).toBeLessThan(2.5 + 6);
    expect(tr.angle).toBeGreaterThan(angleFor(2) + 10);
  });

  it('safeFor: nur auf geraden Stücken mit Abstand – und das Zeichen bleibt danach auch wirklich frei vom Knick', () => {
    for (const level of [1, 10, 20]) {
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
        // Prüfen: in den nächsten `seconds` (auf einer Kopie) kommt kein Knick näher als `margin`
        Object.assign(copy, tr);
        let t = 0;
        while (t < seconds) {
          copy.step(1 / 60, v);
          t += 1 / 60;
          const d = copy.distances();
          expect(Math.min(d.ahead, d.behind)).toBeGreaterThanOrEqual(margin - v / 60 - 1e-6);
        }
      }
      expect(open).toBeGreaterThan(0);
      expect(closed).toBeGreaterThan(0);
    }
  }, 60000);

  it('kurze Strecken: safeFor bleibt „nie“ statt falsch „immer“', () => {
    const tr = make(1);
    // absurd großer Abstand → nie frei
    tr.step(1 / 60, 100);
    expect(tr.safeFor(0.5, 10000)).toBe(false);
  });
});

describe('zickzack-bahn: Kern mit Autoplay', () => {
  const stages: [string, number, number][] = [
    ['Tablet quer', 1194, 834],
    ['Tablet hoch', 834, 1194],
    ['Handy hoch', 390, 844],
    ['Intro-Film 16:11', 880, 606],
  ];

  for (const [name, w, h] of stages) {
    for (const start of [1, 12, 20]) {
      it(`${name}, Startstufe ${start}: Zeichen nie im Knick, Sitzung endet`, () => {
        const track = new ZigzagTrack();
        let minDist = Infinity;
        let radiusOk = true;
        const { result, shows } = simulate(
          (ctx) => new PursuitExercise(ctx, { track, speedFor, demoLevel: 3 }),
          {
            w,
            h,
            startLevel: start,
            onShowFrame: (_ex, signSize) => {
              const d = track.distances();
              const m = Math.min(d.ahead, d.behind);
              minDist = Math.min(minDist, m);
              if (m < targetRadiusFor(signSize)) radiusOk = false;
            },
          },
        );
        expect(result).not.toBeNull();
        expect(shows).toBeGreaterThanOrEqual(15);
        expect(radiusOk).toBe(true);
        expect(minDist).toBeGreaterThan(0);
      });
    }
  }

  it('Intro-Film: 8–14 s, endet mit finish, Zeichen nie im Knick', () => {
    for (const [w, h] of [[880, 606], [606, 880]] as const) {
      const track = new ZigzagTrack();
      let ok = true;
      const r = simulate((ctx) => new PursuitExercise(ctx, { track, speedFor, demoLevel: 3 }), {
        w,
        h,
        mode: 'demo',
        onShowFrame: (_ex, s) => {
          const d = track.distances();
          if (Math.min(d.ahead, d.behind) < targetRadiusFor(s)) ok = false;
        },
      });
      expect(r.result).not.toBeNull();
      expect(ok).toBe(true);
      expect(r.seconds).toBeGreaterThan(7);
      expect(r.seconds).toBeLessThan(16);
    }
  });
});
