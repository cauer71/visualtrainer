import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  DARK_MS,
  drawRunMs,
  exposureFor,
  FADE_IN_AT_MS,
  FADE_MS,
  JUMP_AT_MS,
  JUMP_TOTAL_MS,
  jumpAlpha,
  jumpFor,
  levelOf,
  MAX_LEVEL,
  MIN_LEVEL,
  signDelayFor,
  speedFor,
} from '../../src/exercises/sprungziel/logic';

describe('sprungziel: Stufenfunktionen', () => {
  it('werden mit der Stufe schwerer', () => {
    for (let l = MIN_LEVEL + 1; l <= MAX_LEVEL; l++) {
      expect(jumpFor(l)).toBeGreaterThan(jumpFor(l - 1));
      expect(speedFor(l)).toBeGreaterThan(speedFor(l - 1));
      expect(signDelayFor(l)).toBeLessThan(signDelayFor(l - 1));
      expect(exposureFor(l)).toBeLessThanOrEqual(exposureFor(l - 1));
    }
  });

  it('Bereiche: Sprung 16–77 u, Zeit nach dem Sprung 250–700 ms, Tempo ≤ 45 u/s', () => {
    expect(jumpFor(1)).toBeCloseTo(16);
    expect(jumpFor(MAX_LEVEL)).toBeGreaterThan(70);
    expect(jumpFor(MAX_LEVEL)).toBeLessThan(80);
    expect(signDelayFor(1)).toBeLessThanOrEqual(700);
    expect(signDelayFor(MAX_LEVEL)).toBeGreaterThanOrEqual(250);
    expect(speedFor(MAX_LEVEL)).toBeLessThan(45);
    expect(exposureFor(MAX_LEVEL)).toBeGreaterThanOrEqual(340);
  });

  it('das Zeichen erscheint erst, wenn das Einblenden fertig ist', () => {
    for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) expect(signDelayFor(l)).toBeGreaterThanOrEqual(FADE_MS);
  });

  it('begrenzt Stufen', () => {
    expect(levelOf(0)).toBe(MIN_LEVEL);
    expect(levelOf(50)).toBe(MAX_LEVEL);
    expect(jumpFor(99)).toBe(jumpFor(MAX_LEVEL));
  });

  it('Laufzeit vor dem Sprung ist unregelmäßig und nie unter 0,8 s', () => {
    const rng = createRng(4);
    const v = Array.from({ length: 300 }, () => drawRunMs(rng));
    expect(Math.min(...v)).toBeGreaterThanOrEqual(800);
    expect(Math.max(...v)).toBeLessThanOrEqual(1700);
    expect(Math.max(...v) - Math.min(...v)).toBeGreaterThan(500);
  });
});

describe('sprungziel: weiches Aus- und Einblenden (kein Blitzen)', () => {
  it('Aus- und Einblenden dauern je mindestens 150 ms', () => {
    expect(FADE_MS).toBeGreaterThanOrEqual(150);
    expect(JUMP_TOTAL_MS).toBe(2 * FADE_MS + DARK_MS);
    expect(FADE_IN_AT_MS).toBe(FADE_MS + DARK_MS);
  });

  it('Sichtbarkeit: 1 → 0 → 1, stetig und monoton je Phase', () => {
    expect(jumpAlpha(-50)).toBe(1);
    expect(jumpAlpha(0)).toBeCloseTo(1, 9);
    expect(jumpAlpha(FADE_MS)).toBeCloseTo(0, 9);
    expect(jumpAlpha(FADE_MS + DARK_MS / 2)).toBe(0);
    expect(jumpAlpha(FADE_IN_AT_MS)).toBeCloseTo(0, 9);
    expect(jumpAlpha(JUMP_TOTAL_MS)).toBe(1);
    expect(jumpAlpha(JUMP_TOTAL_MS + 500)).toBe(1);
    let prev = 1;
    for (let s = 0; s <= FADE_MS; s += 1) {
      const a = jumpAlpha(s);
      expect(a).toBeLessThanOrEqual(prev + 1e-12);
      prev = a;
    }
    prev = 0;
    for (let s = FADE_IN_AT_MS; s <= JUMP_TOTAL_MS; s += 1) {
      const a = jumpAlpha(s);
      expect(a).toBeGreaterThanOrEqual(prev - 1e-12);
      prev = a;
    }
  });

  it('Helligkeit ändert sich pro Millisekunde nur wenig (keine Sprünge)', () => {
    let worst = 0;
    for (let s = 0; s < JUMP_TOTAL_MS + 50; s++) worst = Math.max(worst, Math.abs(jumpAlpha(s + 1) - jumpAlpha(s)));
    // bei 60 Hz (16,7 ms) also höchstens ≈ 0,4 – kein Schlag von 0 auf 1
    expect(worst * 16.7).toBeLessThan(0.45);
  });

  it('Ortswechsel liegt mitten in der Dunkelphase', () => {
    expect(jumpAlpha(JUMP_AT_MS)).toBe(0);
    expect(JUMP_AT_MS).toBeGreaterThan(FADE_MS);
    expect(JUMP_AT_MS).toBeLessThan(FADE_IN_AT_MS);
  });
});
