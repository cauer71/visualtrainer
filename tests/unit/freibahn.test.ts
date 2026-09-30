import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  approach,
  arcProgress,
  deg,
  freeDistance,
  insideField,
  makeField,
  MotionPath,
  pickJumpTarget,
  pickTurnSign,
  wrapAngle,
} from '../../src/exercises/_shared/freibahn';

const F = makeField(60, 1120, 60, 560);

function drive(p: MotionPath, seconds: number, dtFor: (i: number) => number, speed: number, each?: (p: MotionPath) => void): void {
  let t = 0;
  let i = 0;
  while (t < seconds - 1e-9) {
    const dt = Math.min(dtFor(i++), seconds - t);
    p.step(dt, speed);
    t += dt;
    each?.(p);
  }
}

describe('freibahn: Hilfsfunktionen', () => {
  it('wrapAngle liegt in (−π, π]', () => {
    for (const a of [-10, -3.2, 0, 3.2, 7, 100]) {
      const w = wrapAngle(a);
      expect(w).toBeGreaterThanOrEqual(-Math.PI - 1e-9);
      expect(w).toBeLessThanOrEqual(Math.PI + 1e-9);
      expect(Math.cos(w)).toBeCloseTo(Math.cos(a), 6);
    }
  });

  it('arcProgress ist monoton von 0 bis 1 mit sanftem Anfang und Ende', () => {
    expect(arcProgress(0)).toBe(0);
    expect(arcProgress(1)).toBeCloseTo(1, 9);
    let prev = 0;
    for (let i = 1; i <= 100; i++) {
      const v = arcProgress(i / 100);
      expect(v).toBeGreaterThanOrEqual(prev - 1e-12);
      prev = v;
    }
    // Drehrate am Anfang und am Ende ≈ 0
    expect(arcProgress(0.01)).toBeLessThan(0.0001);
    expect(1 - arcProgress(0.99)).toBeLessThan(0.0001);
    // Mitte: halb gedreht
    expect(arcProgress(0.5)).toBeCloseTo(0.5, 9);
  });

  it('freeDistance misst bis zum Feldrand', () => {
    expect(freeDistance(F, 100, 100, 0)).toBeCloseTo(1020);
    expect(freeDistance(F, 100, 100, Math.PI)).toBeCloseTo(40);
    expect(freeDistance(F, 100, 100, Math.PI / 2)).toBeCloseTo(460);
    expect(freeDistance(F, 100, 100, -Math.PI / 2)).toBeCloseTo(40);
  });

  it('approach nähert sich bildratenunabhängig an', () => {
    let a = 0;
    for (let i = 0; i < 60; i++) a = approach(a, 1, 1 / 60, 0.5);
    let b = 0;
    for (let i = 0; i < 120; i++) b = approach(b, 1, 1 / 120, 0.5);
    expect(a).toBeCloseTo(b, 6);
  });

  it('makeField entartet nicht', () => {
    const f = makeField(100, 50, 10, 5);
    expect(f.minX).toBe(f.maxX);
    expect(f.minY).toBe(f.maxY);
  });
});

describe('freibahn: MotionPath', () => {
  it('läuft mit gleichmäßigem Tempo geradeaus (bildratenunabhängig)', () => {
    const run = (fps: number) => {
      const p = new MotionPath();
      p.setField(F);
      p.place(200, 300, 0);
      drive(p, 1, () => 1 / fps, 200);
      return { x: p.x, y: p.y };
    };
    const a = run(60);
    const b = run(144);
    expect(a.x).toBeCloseTo(400, 3);
    expect(a.y).toBeCloseTo(300, 3);
    expect(b.x).toBeCloseTo(a.x, 3);
  });

  it('Ausweichbogen dreht genau um den gewünschten Winkel, weich und in der Dauer', () => {
    const p = new MotionPath();
    p.setField(makeField(-1e5, 1e5, -1e5, 1e5));
    p.place(0, 0, 0);
    p.startTurn(deg(90), 500);
    expect(p.turning).toBe(true);
    const speed = 300;
    const thetas: number[] = [p.theta];
    let t = 0;
    while (t < 0.45) {
      p.step(1 / 60, speed);
      t += 1 / 60;
      thetas.push(p.theta);
    }
    expect(p.turning).toBe(true);
    // größter Schritt der Richtung pro Bild: weich, klein gegenüber dem Gesamtwinkel
    let maxStep = 0;
    for (let i = 1; i < thetas.length; i++) maxStep = Math.max(maxStep, Math.abs(thetas[i] - thetas[i - 1]));
    expect(maxStep).toBeLessThan(((2 * deg(90)) / 0.5 / 60) * 1.05);
    while (t < 0.6) {
      p.step(1 / 60, speed);
      t += 1 / 60;
    }
    expect(p.turning).toBe(false);
    expect(p.theta).toBeCloseTo(deg(90), 6);
  });

  it('Ausweichen mit Gegenrichtung (negativer Winkel)', () => {
    const p = new MotionPath();
    p.setField(makeField(-1e5, 1e5, -1e5, 1e5));
    p.place(0, 0, 0);
    p.startTurn(-deg(120), 300);
    drive(p, 0.5, () => 1 / 60, 100);
    expect(p.theta).toBeCloseTo(-deg(120), 6);
  });

  it('Tempo bleibt während des Bogens konstant (Weg je Zeit = Nenntempo)', () => {
    const p = new MotionPath();
    p.setField(makeField(-1e5, 1e5, -1e5, 1e5));
    p.place(0, 0, 0);
    p.startTurn(deg(150), 400);
    let len = 0;
    let px = p.x;
    let py = p.y;
    drive(p, 1, () => 1 / 60, 240, () => {
      len += Math.hypot(p.x - px, p.y - py);
      px = p.x;
      py = p.y;
    });
    expect(len).toBeCloseTo(240, 0);
  });

  it('bleibt in langen Läufen im Feld (auch mit Ausweichen, Ruckler, hohen Tempi)', () => {
    for (const [speed, seed] of [
      [80, 1],
      [300, 2],
      [740, 3],
    ] as const) {
      const rng = createRng(seed);
      const p = new MotionPath();
      p.setField(F);
      p.place(600, 300, rng.range(-3, 3));
      let nextTurn = 1;
      let t = 0;
      let i = 0;
      while (t < 120) {
        const dt = i++ % 37 === 0 ? 0.05 : 1 / 60;
        t += dt;
        if (t >= nextTurn && !p.turning) {
          const a = deg(rng.range(40, 160));
          p.startTurn(pickTurnSign(F, p, p.theta, a, rng) * a, rng.range(250, 700));
          nextTurn = t + rng.range(0.8, 2.5);
        }
        p.step(dt, speed);
        expect(insideField(F, p.x, p.y, 1e-6)).toBe(true);
      }
    }
  });

  it('dreht am Rand weich bei statt hart abzuprallen', () => {
    const p = new MotionPath();
    p.setField(F);
    p.place(900, 300, 0); // läuft auf die rechte Wand zu
    const speed = 300;
    let maxStep = 0;
    let prev = p.theta;
    drive(p, 6, () => 1 / 60, speed, () => {
      maxStep = Math.max(maxStep, Math.abs(wrapAngle(p.theta - prev)));
      prev = p.theta;
    });
    // Drehrate je Bild deutlich unter einem Abprall (π) – Kurven höchstens ≈ 10° pro Bild
    expect(maxStep).toBeLessThan(deg(10));
  });

  it('moveTo versetzt nur den Ort, nicht die Richtung', () => {
    const p = new MotionPath();
    p.setField(F);
    p.place(200, 200, 1);
    p.moveTo(700, 400);
    expect(p.x).toBe(700);
    expect(p.y).toBe(400);
    expect(p.theta).toBeCloseTo(1, 9);
    p.moveTo(99999, -5);
    expect(p.x).toBe(F.maxX);
    expect(p.y).toBe(F.minY);
  });
});

describe('freibahn: Drehrichtung und Sprungziel', () => {
  it('pickTurnSign wählt meist die Seite mit mehr Platz', () => {
    const rng = createRng(5);
    // nahe der oberen Wand, Richtung nach rechts: Drehung nach unten (positives Vorzeichen = im Uhrzeigersinn, y nach unten)
    let down = 0;
    for (let i = 0; i < 400; i++) if (pickTurnSign(F, { x: 600, y: 80 }, 0, deg(70), rng) === 1) down++;
    expect(down).toBeGreaterThan(400 * 0.6);
    expect(down).toBeLessThan(400 * 0.9);
  });

  it('pickJumpTarget liegt im Feld, hat die gewünschte Weite und Platz nach vorn', () => {
    const rng = createRng(11);
    for (let i = 0; i < 300; i++) {
      const from = { x: rng.range(F.minX, F.maxX), y: rng.range(F.minY, F.maxY) };
      const theta = rng.range(-Math.PI, Math.PI);
      const want = rng.range(120, 600);
      const p = pickJumpTarget(F, from, theta, want, rng, 200);
      expect(insideField(F, p.x, p.y, 1e-6)).toBe(true);
      const d = Math.hypot(p.x - from.x, p.y - from.y);
      expect(d).toBeGreaterThan(Math.min(want, 40) * 0.3);
      expect(d).toBeLessThanOrEqual(want + 1e-6);
      expect(d).toBeGreaterThanOrEqual(want * 0.4);
    }
  });

  it('pickJumpTarget trifft die Wunschweite, wenn Platz ist', () => {
    const rng = createRng(3);
    const p = pickJumpTarget(F, { x: 600, y: 300 }, 0, 250, rng, 100);
    expect(Math.hypot(p.x - 600, p.y - 300)).toBeCloseTo(250, 6);
    expect(freeDistance(F, p.x, p.y, 0)).toBeGreaterThanOrEqual(100);
  });
});
