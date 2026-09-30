import { describe, expect, it } from 'vitest';
import { MAX_TRACK_WIDTH, span, type Bounds } from '../../src/exercises/_shared/pursuit-logic';
import { heightUFor, RECOVER_S, SEGMENTS, speedFor, StairTrack, stairVertices } from '../../src/exercises/hoehenwechsel-bahn/logic';

const AREA: Bounds = span(60, 1134, 60, 640);
const W = 1194;
const U = 8;

function make(level: number, area = AREA, w = W, u = U): StairTrack {
  const tr = new StairTrack();
  tr.setLevel(level);
  tr.layout(area, w, u);
  tr.begin(0.37, 1);
  return tr;
}

function run(track: StairTrack, dtFor: (i: number) => number, seconds: number, speed: number) {
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

describe('hoehenwechsel-bahn: Stufen', () => {
  it('Höhe der Treppe und Tempo steigen mit der Stufe', () => {
    expect(heightUFor(1)).toBe(12);
    expect(heightUFor(20)).toBeGreaterThan(54);
    expect(heightUFor(20)).toBeLessThan(58);
    for (let l = 2; l <= 20; l++) {
      expect(heightUFor(l)).toBeGreaterThan(heightUFor(l - 1));
      expect(speedFor(l)).toBeGreaterThan(speedFor(l - 1));
    }
    // gebrochene Stufen zählen zur unteren ganzen Stufe
    expect(heightUFor(6.7)).toBe(heightUFor(6));
    expect(speedFor(1)).toBeCloseTo(15);
    expect(speedFor(20)).toBeLessThan(70);
  });

  it('Treppen-Eckpunkte: x abwechselnd links/rechts, y gleichmäßig von oben nach unten', () => {
    const pts = stairVertices(SEGMENTS, 100, 700, 300, 120);
    expect(pts).toHaveLength(SEGMENTS + 1);
    expect(pts[0]).toEqual({ x: 100, y: 240 });
    expect(pts[SEGMENTS].y).toBeCloseTo(360, 9);
    for (let k = 0; k <= SEGMENTS; k++) expect(pts[k].x).toBe(k % 2 === 0 ? 100 : 700);
    for (let k = 1; k <= SEGMENTS; k++) expect(pts[k].y - pts[k - 1].y).toBeCloseTo(120 / SEGMENTS, 9);
  });
});

describe('StairTrack', () => {
  it('bleibt im Feld, höchstens 60 % der Bühnenbreite breit, läuft von Ende zu Ende und zurück', () => {
    for (const level of [1, 6, 13, 20]) {
      const tr = make(level);
      const pts = run(tr, () => 1 / 60, 60, speedFor(level) * U);
      for (const p of pts) {
        expect(p.x).toBeGreaterThanOrEqual(AREA.minX - 1e-6);
        expect(p.x).toBeLessThanOrEqual(AREA.maxX + 1e-6);
        expect(p.y).toBeGreaterThanOrEqual(AREA.minY - 1e-6);
        expect(p.y).toBeLessThanOrEqual(AREA.maxY + 1e-6);
      }
      const xs = pts.map((p) => p.x);
      expect(Math.max(...xs) - Math.min(...xs)).toBeLessThanOrEqual(MAX_TRACK_WIDTH * W + 1);
      expect(Math.max(...xs) - Math.min(...xs)).toBeGreaterThan(0.85 * MAX_TRACK_WIDTH * W);
    }
  });

  it('Höhenwechsel langsam: die Strecken sind fast waagerecht, der Anteil senkrechter Bewegung klein', () => {
    const a = make(1);
    const b = make(20);
    expect(a.angle).toBeGreaterThan(0.5);
    expect(a.angle).toBeLessThan(3);
    expect(b.angle).toBeGreaterThan(a.angle * 2);
    expect(b.angle).toBeLessThan(10);
    // Höhe wächst mit der Stufe, Breite bleibt
    expect(b.height).toBeGreaterThan(a.height * 3);
    expect(b.trackWidth).toBe(a.trackWidth);
    // Senkrechtanteil der Weglänge
    const pts = run(make(10), () => 1 / 60, 30, 300);
    let vert = 0;
    let total = 0;
    for (let i = 1; i < pts.length; i++) {
      vert += Math.abs(pts[i].y - pts[i - 1].y);
      total += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    }
    expect(vert / total).toBeLessThan(0.12);
  });

  it('Höhe führt sich bei Stufenwechsel weich nach (kein Sprung des Ziels)', () => {
    const tr = make(2);
    const h0 = tr.height;
    tr.setLevel(18);
    let prev = { ...tr.pos };
    let maxJump = 0;
    for (let i = 0; i < 120; i++) {
      tr.step(1 / 60, 200);
      maxJump = Math.max(maxJump, Math.hypot(tr.pos.x - prev.x, tr.pos.y - prev.y));
      prev = { ...tr.pos };
    }
    expect(tr.height).toBeGreaterThan(h0 * 2);
    // je Bild höchstens Weg (200/60 ≈ 3,3 px) plus geringe Formänderung
    expect(maxJump).toBeLessThan(200 / 60 + 4);
  });

  it('läuft mit gleichmäßigem Tempo und ist bildratenunabhängig', () => {
    const v = 300;
    const a = run(make(8), () => 1 / 60, 20, v);
    const b = run(make(8), () => 1 / 120, 20, v);
    const c = run(make(8), (i) => (i % 2 ? 1 / 30 : 1 / 90), 20, v);
    const ea = a[a.length - 1];
    for (const e of [b[b.length - 1], c[c.length - 1]]) expect(Math.hypot(e.x - ea.x, e.y - ea.y)).toBeLessThan(1);
    const dt = 1 / 60;
    let prev = a[0];
    let full = 0;
    for (let i = 1; i < a.length; i++) {
      const d = Math.hypot(a[i].x - prev.x, a[i].y - prev.y);
      expect(d).toBeLessThanOrEqual(v * dt + 1e-6);
      if (d > v * dt - 1e-6) full++;
      prev = a[i];
    }
    expect(full).toBeGreaterThan(a.length * 0.98);
  });

  it('kehrt in den Wendepunkten abrupt um, ohne abzubremsen', () => {
    const tr = make(5);
    tr.begin(0.97, 1);
    const xs: number[] = [];
    const v = 400;
    for (let i = 0; i < 90; i++) {
      tr.step(1 / 60, v);
      xs.push(tr.pos.x);
    }
    // am Ende der Treppe (Eckpunkt 6) kehrt die Richtung in x um: Schritt vorher und nachher gleich lang
    let flip = -1;
    for (let i = 2; i < xs.length; i++) {
      if (Math.sign(xs[i] - xs[i - 1]) !== Math.sign(xs[i - 1] - xs[i - 2])) {
        flip = i;
        break;
      }
    }
    expect(flip).toBeGreaterThan(2);
    expect(flip).toBeLessThan(xs.length - 3);
    const before = Math.abs(xs[flip - 2] - xs[flip - 3]);
    const after = Math.abs(xs[flip + 1] - xs[flip]);
    expect(Math.abs(after - before)).toBeLessThan(0.5);
    expect(after).toBeGreaterThan(before * 0.95);
  });

  it('safeFor: Zeichen nur weit von den Wendepunkten (vor und nach dem Zeichen)', () => {
    const tr = make(6);
    const v = 250;
    let windows = 0;
    let closed = 0;
    for (let i = 0; i < 60 * 40; i++) {
      tr.step(1 / 60, v);
      const d = tr.distances();
      const ok = tr.safeFor(0.8, 50);
      if (ok) {
        windows++;
        expect(d.ahead).toBeGreaterThanOrEqual(50 + v * 0.8 - 1e-6);
        expect(d.behind).toBeGreaterThanOrEqual(50 + RECOVER_S * v - 1e-6);
      } else closed++;
    }
    expect(windows).toBeGreaterThan(300);
    // in der Nähe der Wendepunkte ist das Fenster zu
    expect(closed).toBeGreaterThan(60);
  });

  it('passt sich dem Hochformat an (kleines Feld)', () => {
    const small = span(30, 330, 40, 520);
    const tr = make(20, small, 360, 3.6);
    const pts = run(tr, () => 1 / 60, 40, 60 * 3.6);
    for (const p of pts) {
      expect(p.x).toBeGreaterThanOrEqual(small.minX - 1e-6);
      expect(p.x).toBeLessThanOrEqual(small.maxX + 1e-6);
      expect(p.y).toBeGreaterThanOrEqual(small.minY - 1e-6);
      expect(p.y).toBeLessThanOrEqual(small.maxY + 1e-6);
    }
    const xs = run(make(5, small, 360, 3.6), () => 1 / 60, 30, 100).map((p) => p.x);
    expect(Math.max(...xs) - Math.min(...xs)).toBeLessThanOrEqual(0.6 * 360 + 1);
  });

  it('layout() während des Laufs behält den Fortschritt', () => {
    const tr = make(6);
    run(tr, () => 1 / 60, 12, 250);
    const before = tr.pos;
    tr.layout(AREA, W, U);
    expect(Math.hypot(tr.pos.x - before.x, tr.pos.y - before.y)).toBeLessThan(3);
  });
});
