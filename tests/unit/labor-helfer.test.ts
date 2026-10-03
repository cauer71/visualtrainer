/**
 * Bildschirmtasten der Hilfsperson (Gleichgewichts-Übungen): Anordnung (≥ 56 px, nie überlappend, im Feld), Treffer, Tastenkürzel,
 * Zeichnen mit Text und Zeichen.
 */
import { describe, expect, it } from 'vitest';
import {
  drawHelperButton,
  helperAt,
  helperKeyKind,
  helperLayout,
  helperZoneHeight,
  MIN_HELPER_BUTTON_PX,
  type HelperKind,
} from '../../src/exercises/_shared/labor-helfer';

const stages: Array<[number, number]> = [
  [390, 844],
  [320, 560],
  [820, 1180],
  [1180, 820],
  [1024, 600],
];

describe('Anordnung', () => {
  it('jede Taste ist mindestens 56 px hoch und breit, die Tasten überlappen nie und liegen im Feld', () => {
    for (const [w, h] of stages) {
      const u = Math.min(w, h) / 100;
      const left = Math.max(10, u * 2);
      for (const kinds of [['ok', 'bad'], ['loss'], ['ok', 'bad', 'loss']] as HelperKind[][]) {
        const bs = helperLayout(kinds, left, w - left, h - left, u);
        expect(bs.map((b) => b.kind)).toEqual(kinds);
        for (const b of bs) {
          const r = b.rect;
          expect(r.h, `${w}x${h} ${b.kind}`).toBeGreaterThanOrEqual(MIN_HELPER_BUTTON_PX);
          expect(r.w, `${w}x${h} ${b.kind}`).toBeGreaterThanOrEqual(MIN_HELPER_BUTTON_PX);
          expect(r.x).toBeGreaterThanOrEqual(left - 0.01);
          expect(r.x + r.w).toBeLessThanOrEqual(w - left + 0.01);
          expect(r.y + r.h).toBeLessThanOrEqual(h - left + 0.01);
        }
        for (let i = 1; i < bs.length; i++) expect(bs[i].rect.x).toBeGreaterThanOrEqual(bs[i - 1].rect.x + bs[i - 1].rect.w);
      }
    }
  });

  it('im Intro-Film dürfen die Tasten kleiner sein (die Geister-Hand tippt), sonst nie', () => {
    const [b] = helperLayout(['loss'], 10, 200, 150, 2, 28);
    expect(b.rect.h).toBeGreaterThanOrEqual(28);
    expect(b.rect.h).toBeLessThan(MIN_HELPER_BUTTON_PX);
    const [c] = helperLayout(['loss'], 10, 200, 150, 2);
    expect(c.rect.h).toBeGreaterThanOrEqual(MIN_HELPER_BUTTON_PX);
  });

  it('Tastenreihe ist mittig; zwei Tasten ergeben „links = richtig, rechts = falsch“', () => {
    const bs = helperLayout(['ok', 'bad'], 0, 800, 700, 8);
    expect(bs[0].rect.x).toBeLessThan(400);
    expect(bs[1].rect.x).toBeGreaterThan(400);
    const total = bs[1].rect.x + bs[1].rect.w - bs[0].rect.x;
    expect(bs[0].rect.x + total / 2).toBeCloseTo(400, 6);
  });

  it('Zonenhöhe: Tastenhöhe plus Abstand', () => {
    for (const [w, h] of stages) {
      const u = Math.min(w, h) / 100;
      const z = helperZoneHeight(u);
      const [b] = helperLayout(['loss'], 0, w, h, u);
      expect(z).toBeGreaterThan(b.rect.h);
      expect(z).toBeLessThan(b.rect.h + 40);
    }
  });
});

describe('Treffer und Tastenkürzel', () => {
  it('helperAt: in der Taste (mit Toleranz) trifft, daneben nicht', () => {
    const bs = helperLayout(['ok', 'bad'], 0, 800, 700, 8);
    const c = (i: number) => ({ x: bs[i].rect.x + bs[i].rect.w / 2, y: bs[i].rect.y + bs[i].rect.h / 2 });
    expect(helperAt(bs, c(0).x, c(0).y)).toBe('ok');
    expect(helperAt(bs, c(1).x, c(1).y)).toBe('bad');
    expect(helperAt(bs, bs[0].rect.x - 4, c(0).y)).toBe('ok'); // 6 px Toleranz
    expect(helperAt(bs, c(0).x, bs[0].rect.y - 40)).toBeNull();
    expect(helperAt(bs, 5, 5)).toBeNull();
    expect(helperAt([], 5, 5)).toBeNull();
  });

  it('Kürzel: Leertaste/Enter richtig, X/Rücktaste falsch, B Gleichgewicht verloren, sonst nichts', () => {
    expect(helperKeyKind(' ')).toBe('ok');
    expect(helperKeyKind('Enter')).toBe('ok');
    expect(helperKeyKind('x')).toBe('bad');
    expect(helperKeyKind('X')).toBe('bad');
    expect(helperKeyKind('Backspace')).toBe('bad');
    expect(helperKeyKind('b')).toBe('loss');
    expect(helperKeyKind('B')).toBe('loss');
    for (const k of ['a', 'ArrowLeft', '1', 'Escape', '']) expect(helperKeyKind(k), k).toBeNull();
  });
});

describe('Zeichnen', () => {
  it('Text und Zeichen (✓, ✗, !) werden gezeichnet; kein Fehler bei schmalen Tasten, gedrückt und blass', () => {
    const drawn: string[] = [];
    const calls: string[] = [];
    const g = new Proxy({} as Record<string, unknown>, {
      get: (t, k: string) => {
        if (k === 'measureText') return (s: string) => ({ width: String(s).length * 9 });
        if (k === 'fillText') return (s: string) => drawn.push(String(s));
        if (typeof k === 'string' && ['moveTo', 'lineTo', 'arc', 'closePath'].includes(k)) return () => calls.push(k);
        return k in t ? t[k] : () => undefined;
      },
      set: (t, k: string, v) => ((t[k] = v), true),
    }) as unknown as CanvasRenderingContext2D;
    for (const kind of ['ok', 'bad', 'loss'] as HelperKind[]) {
      for (const width of [60, 177, 440]) {
        const b = { kind, rect: { x: 10, y: 10, w: width, h: 70 } };
        drawHelperButton(g, b, 'Gleichgewicht verloren', 'Taste B');
        drawHelperButton(g, b, 'Gleichgewicht verloren', 'Taste B', { pressedAge: 100, dim: true });
      }
    }
    expect(drawn).toContain('Gleichgewicht verloren');
    expect(calls).toContain('lineTo'); // Zeichen gezeichnet
    expect(calls).toContain('arc'); // Punkt des Ausrufezeichens
    // Tastenkürzel nur, wenn die Taste hoch genug ist
    drawn.length = 0;
    drawHelperButton(g, { kind: 'ok', rect: { x: 0, y: 0, w: 200, h: 60 } }, 'Richtig', 'Leertaste');
    expect(drawn).toEqual(['Richtig']);
    drawn.length = 0;
    drawHelperButton(g, { kind: 'ok', rect: { x: 0, y: 0, w: 200, h: 100 } }, 'Richtig', 'Leertaste');
    expect(drawn).toEqual(['Richtig', 'Leertaste']);
  });
});
