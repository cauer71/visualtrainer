import { describe, expect, it } from 'vitest';
import { deg, freeDistance, makeField, MotionPath } from '../../src/exercises/_shared/freibahn';
import { roomFor, turnToOpen, wallMargin } from '../../src/exercises/_shared/blickfolge-varianten';

const F = makeField(40, 1140, 40, 560);

describe('blickfolge-varianten: Randabstand', () => {
  it('wallMargin entspricht dem Beidrehbereich von MotionPath: dort beginnt das Beidrehen', () => {
    // Ziel läuft mit v nach rechts auf die Wand zu: Beidrehen beginnt, sobald der Abstand unter wallMargin fällt
    for (const v of [80, 200, 420]) {
      const m = new MotionPath();
      m.setField(F);
      m.place(300, 300, 0);
      let started = -1;
      for (let i = 0; i < 60 * 30; i++) {
        m.step(1 / 60, v);
        if (Math.abs(m.theta) > 0.002) {
          started = F.maxX - (m.x - Math.cos(m.theta) * 0); // Abstand bei Beginn (grob)
          break;
        }
      }
      expect(started).toBeGreaterThan(0);
      // Beginn nahe dem vorhergesagten Abstand (±15 px für den Schritt, in dem es losgeht)
      expect(Math.abs(started - wallMargin(F, v))).toBeLessThan(Math.max(15, v / 20));
    }
  });

  it('roomFor: freie Strecke geradeaus abzüglich Randabstand, nie negativ', () => {
    const v = 200;
    const p = { x: 300, y: 300 };
    expect(roomFor(F, p, 0, v)).toBeCloseTo(freeDistance(F, p.x, p.y, 0) - wallMargin(F, v), 9);
    expect(roomFor(F, { x: 1139, y: 300 }, 0, v)).toBe(0);
    expect(roomFor(F, p, Math.PI, v)).toBeLessThan(roomFor(F, p, 0, v));
  });
});

describe('turnToOpen: Bogen zur freien Seite', () => {
  it('0°, wenn schon genug Platz ist', () => {
    expect(turnToOpen(F, { x: 300, y: 300 }, 0, 400, 150)).toBe(0);
  });

  it('dreht vom Rand weg, mit dem kleinsten nötigen Winkel', () => {
    const p = { x: 1000, y: 300 };
    const d = turnToOpen(F, p, 0, 500, 150);
    expect(Math.abs(d)).toBeGreaterThan(deg(60));
    expect(roomFor(F, p, d, 150)).toBeGreaterThanOrEqual(500);
    // kleinerer Winkel würde nicht reichen
    const smaller = Math.abs(d) - deg(15);
    expect(roomFor(F, p, Math.sign(d) * smaller, 150)).toBeLessThan(500);
    expect(roomFor(F, p, -Math.sign(d) * smaller, 150)).toBeLessThan(500);
  });

  it('wählt bei gleichem Betrag die Seite mit mehr Platz', () => {
    // nahe der oberen Wand, Richtung nach oben-rechts → besser nach rechts unten drehen (mit positivem Winkel: im Uhrzeigersinn)
    const p = { x: 300, y: 60 };
    const theta = -Math.PI / 2;
    const d = turnToOpen(F, p, theta, 400, 150);
    expect(roomFor(F, p, theta + d, 150)).toBeGreaterThanOrEqual(400);
  });

  it('findet nichts Ausreichendes: nimmt die Richtung mit der größten freien Strecke', () => {
    const tiny = makeField(0, 120, 0, 90);
    const p = { x: 60, y: 45 };
    const d = turnToOpen(tiny, p, 0, 5000, 80);
    let best = 0;
    for (let k = -12; k <= 12; k++) best = Math.max(best, roomFor(tiny, p, deg(15 * k), 80));
    expect(roomFor(tiny, p, d, 80)).toBeCloseTo(best, 6);
  });
});
