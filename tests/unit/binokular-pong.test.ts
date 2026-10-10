/**
 * „Farbwechsel-Pong“: Abprallwinkel nach Trefferposition, Geschwindigkeit ×1,04 mit Obergrenze, Computergegner mit
 * begrenzter, mit dem Spielstand steigender Geschwindigkeit, Farbwechsel bei Kontakt und im Flug (genau einmal je
 * Überquerung), Startfarbe aus dem Seed, Punktestand und Spielende, Zwei-Spieler-Modus, Einstellungen.
 */
import { describe, expect, it } from 'vitest';
import { makeRng } from '../../src/binokular/games/common';
import {
  AI_CAP,
  aiBaseSpeed,
  aiSpeed,
  BOTTOM_Y,
  bounceAngle,
  frontY,
  H,
  KEY_SPEED,
  MAX_ANGLE,
  newPong,
  nextSpeed,
  PADDLE_H,
  setPaddle,
  SPEED_FACTOR,
  speedCap,
  STEP_S,
  stepPong,
  TOP_Y,
  W,
  type PongEvent,
  type PongState,
} from '../../src/binokular/games/pong/logic';
import { DEFAULT_PONG, normalizePong, type PongSettings } from '../../src/binokular/games/pong/settings';

const cfg: PongSettings = { ...DEFAULT_PONG };
const noKeys = { keys: { top: 0, bottom: 0 } };

/** Spielzustand mitten im Ballwechsel: Ball kurz vor dem unteren Schläger, fällt nach unten */
function falling(c: PongSettings, hitOffset: number, rng = makeRng(1)): PongState {
  const s = newPong(rng);
  s.phase = 'play';
  s.bottom = 360;
  s.speed = c.startSpeed;
  s.ball = { x: 360 + hitOffset, y: frontY('bottom') - c.ballRadius - 3, vx: 0, vy: c.startSpeed };
  return s;
}

function runUntil(s: PongState, c: PongSettings, rng: () => number, pred: (e: PongEvent) => boolean, max = 2000): PongEvent[] {
  const all: PongEvent[] = [];
  for (let i = 0; i < max; i++) {
    const ev = stepPong(s, c, noKeys, rng);
    all.push(...ev);
    if (ev.some(pred)) return all;
  }
  return all;
}

describe('Schlägerkontakt und Winkel', () => {
  it('Abprallwinkel hängt von der Trefferposition ab: Mitte senkrecht, Rand flach, symmetrisch', () => {
    expect(bounceAngle(0)).toBe(0);
    expect(bounceAngle(1)).toBeCloseTo(MAX_ANGLE, 9);
    expect(bounceAngle(-1)).toBeCloseTo(-MAX_ANGLE, 9);
    expect(bounceAngle(0.5)).toBeCloseTo(MAX_ANGLE / 2, 9);
    expect(bounceAngle(5)).toBeCloseTo(MAX_ANGLE, 9);
    expect(MAX_ANGLE).toBeLessThan(Math.PI / 2);
  });
  it('Treffer rechts → Ball fliegt nach rechts oben; links → links; Mitte → gerade nach oben', () => {
    const rng = makeRng(3);
    const mid = falling(cfg, 0);
    runUntil(mid, cfg, rng, (e) => e.type === 'hit');
    expect(Math.abs(mid.ball.vx)).toBeLessThan(1e-6);
    expect(mid.ball.vy).toBeLessThan(0);
    const right = falling(cfg, 60);
    runUntil(right, cfg, rng, (e) => e.type === 'hit');
    expect(right.ball.vx).toBeGreaterThan(50);
    expect(right.ball.vy).toBeLessThan(0);
    const left = falling(cfg, -60);
    runUntil(left, cfg, rng, (e) => e.type === 'hit');
    expect(left.ball.vx).toBeLessThan(-50);
    // weiter außen → flacherer Winkel (größeres |vx|)
    const edge = falling(cfg, 90);
    runUntil(edge, cfg, rng, (e) => e.type === 'hit');
    expect(edge.ball.vx).toBeGreaterThan(right.ball.vx);
  });
  it('Geschwindigkeit steigt je Schlag um den Faktor 1,04, begrenzt; Betrag der Geschwindigkeit bleibt', () => {
    expect(SPEED_FACTOR).toBe(1.04);
    expect(nextSpeed(500, 500)).toBeCloseTo(520, 9);
    expect(nextSpeed(speedCap(500) - 1, 500)).toBe(speedCap(500));
    expect(nextSpeed(speedCap(500), 500)).toBe(speedCap(500));
    const s = falling(cfg, 30);
    runUntil(s, cfg, makeRng(1), (e) => e.type === 'hit');
    expect(s.speed).toBeCloseTo(cfg.startSpeed * 1.04, 6);
    expect(Math.hypot(s.ball.vx, s.ball.vy)).toBeCloseTo(s.speed, 6);
    // viele Schläge: nie über der Obergrenze
    let v = cfg.startSpeed;
    for (let i = 0; i < 100; i++) v = nextSpeed(v, cfg.startSpeed);
    expect(v).toBe(speedCap(cfg.startSpeed));
  });
  it('Ball verpasst → Punkt für die Gegenseite, Ball zurück in die Mitte, Anspiel nach Wartezeit', () => {
    const s = falling(cfg, 0);
    s.bottom = 100; // weit weg
    const ev = runUntil(s, cfg, makeRng(1), (e) => e.type === 'point');
    expect(ev.find((e) => e.type === 'point')).toEqual({ type: 'point', scorer: 'top' });
    expect(s.score).toEqual({ top: 1, bottom: 0 });
    expect(s.phase).toBe('serve');
    expect(s.ball).toMatchObject({ x: W / 2, y: H / 2, vx: 0, vy: 0 });
    expect(s.speed).toBe(0);
    // zum Verlierer anspielen (unten)
    expect(s.serveDir).toBe(1);
    const served = runUntil(s, cfg, makeRng(2), (e) => e.type === 'serve');
    expect(served.some((e) => e.type === 'serve')).toBe(true);
    expect(s.phase).toBe('play');
    expect(s.speed).toBe(cfg.startSpeed);
    expect(s.ball.vy).toBeGreaterThan(0);
  });
  it('Seitenwände: Ball prallt ab und bleibt im Feld', () => {
    const s = newPong(makeRng(1));
    s.phase = 'play';
    s.speed = 500;
    s.ball = { x: cfg.ballRadius + 2, y: 640, vx: -500, vy: 100 };
    const ev = runUntil(s, cfg, makeRng(1), (e) => e.type === 'bounce');
    expect(ev.some((e) => e.type === 'bounce')).toBe(true);
    expect(s.ball.vx).toBeGreaterThan(0);
    expect(s.ball.x).toBeGreaterThanOrEqual(cfg.ballRadius);
  });
  it('großer Ball: Durchmesser mindestens 24 px bei jeder Einstellung', () => {
    for (const r of [-5, 0, 1, 11, 12, 20, 99]) expect(2 * normalizePong({ ballRadius: r }).ballRadius).toBeGreaterThanOrEqual(24);
  });
  it('kein Durchfliegen: auch bei höchster Geschwindigkeit trifft der Schläger', () => {
    const fast: PongSettings = { ...cfg, startSpeed: 900, ballRadius: 12 };
    const s = falling(fast, 0);
    s.speed = speedCap(900);
    s.ball.vy = s.speed;
    const ev = runUntil(s, fast, makeRng(1), (e) => e.type === 'hit' || e.type === 'point');
    expect(ev.some((e) => e.type === 'hit')).toBe(true);
  });
});

describe('Computergegner', () => {
  it('Grundgeschwindigkeit steigt mit der Stärke; mit dem Spielstand steigt sie weiter, aber nie über die Obergrenze', () => {
    for (let k = 1; k < 5; k++) expect(aiBaseSpeed(k + 1)).toBeGreaterThan(aiBaseSpeed(k));
    expect(aiSpeed(3, 0)).toBe(aiBaseSpeed(3));
    expect(aiSpeed(3, 3)).toBeGreaterThan(aiSpeed(3, 0));
    expect(aiSpeed(3, 5)).toBeGreaterThan(aiSpeed(3, 3));
    for (let sc = 0; sc < 200; sc++) expect(aiSpeed(5, sc)).toBeLessThanOrEqual(AI_CAP);
    expect(aiSpeed(5, 10000)).toBe(AI_CAP);
    expect(aiSpeed(1, -4)).toBe(aiBaseSpeed(1));
  });
  it('Computerschläger bewegt sich höchstens mit seiner Geschwindigkeit je Schritt', () => {
    const s = newPong(makeRng(1));
    s.phase = 'play';
    s.speed = 500;
    s.ball = { x: 700, y: 400, vx: 0, vy: -500 };
    s.top = 100;
    const v = aiSpeed(cfg.opponent, 0);
    for (let i = 0; i < 20; i++) {
      const before = s.top;
      stepPong(s, cfg, noKeys, makeRng(1));
      expect(Math.abs(s.top - before)).toBeLessThanOrEqual(v * STEP_S + 1e-9);
      s.ball.y = 400;
      s.ball.vy = -500;
    }
    expect(s.top).toBeGreaterThan(100);
  });
  it('ein stärkerer Gegner erreicht dieselbe Strecke in kürzerer Zeit', () => {
    const time = (opp: number) => {
      const s = newPong(makeRng(1));
      s.phase = 'play';
      s.ball = { x: 650, y: 300, vx: 0, vy: -1 };
      s.speed = 1;
      s.top = 100;
      const c = { ...cfg, opponent: opp };
      let n = 0;
      while (Math.abs(s.top - 650) > 5 && n < 5000) {
        s.ball.y = 300;
        stepPong(s, c, noKeys, makeRng(1));
        n++;
      }
      return n;
    };
    expect(time(5)).toBeLessThan(time(1));
  });
});

describe('Farbwechsel', () => {
  it('Startfarbe zufällig, aber durch den Seed bestimmt', () => {
    expect(newPong(makeRng(11)).eye).toBe(newPong(makeRng(11)).eye);
    const eyes = new Set<string>();
    for (let seed = 0; seed < 40; seed++) eyes.add(newPong(makeRng(seed)).eye);
    expect(eyes).toEqual(new Set(['AMBLYOPIC', 'FELLOW']));
  });
  it('bei jedem Schlägerkontakt wechselt der Ball die Farbe (Grundstufe, nie im Flug)', () => {
    const s = falling(cfg, 10);
    const start = s.eye;
    const ev = runUntil(s, cfg, makeRng(1), (e) => e.type === 'hit');
    expect(ev.filter((e) => e.type === 'colorChange')).toEqual([{ type: 'colorChange', cause: 'contact' }]);
    expect(s.eye).not.toBe(start);
    expect(s.colorChanges).toBe(1);
    expect(s.flightY).toBeNull();
    // Ohne Schlägerkontakt (Wandabprall) keine Änderung
    const w = newPong(makeRng(1));
    w.phase = 'play';
    w.speed = 500;
    w.ball = { x: cfg.ballRadius + 1, y: 600, vx: -500, vy: 0.001 };
    const e0 = w.eye;
    runUntil(w, cfg, makeRng(1), (e) => e.type === 'bounce');
    expect(w.eye).toBe(e0);
  });
  it('Farbwechsel im Flug: nach dem Kontakt wird eine y-Position zwischen den Schlägern bestimmt; beim Überqueren genau ein Wechsel', () => {
    const c: PongSettings = { ...cfg, flightChange: true };
    const rng = makeRng(5);
    const s = falling(c, 20, rng);
    const e0 = s.eye;
    runUntil(s, c, rng, (e) => e.type === 'hit');
    expect(s.eye).not.toBe(e0);
    expect(s.flightY).not.toBeNull();
    const fy = s.flightY!;
    expect(fy).toBeLessThan(frontY('bottom'));
    expect(fy).toBeGreaterThan(frontY('top'));
    const afterContact = s.eye;
    const ev: PongEvent[] = [];
    let crossed = 0;
    for (let i = 0; i < 4000 && s.phase === 'play' && s.ball.y > fy; i++) {
      const ev2 = stepPong(s, c, noKeys, rng);
      ev.push(...ev2);
      if (ev2.some((e) => e.type === 'hit' || e.type === 'point')) break;
    }
    crossed = ev.filter((e) => e.type === 'colorChange' && e.cause === 'flight').length;
    expect(crossed).toBe(1);
    expect(s.eye).not.toBe(afterContact);
    expect(s.flightY).toBeNull();
    // weiter bis zum nächsten Kontakt: kein zweiter Flugwechsel
    const more = runUntil(s, c, rng, (e) => e.type === 'hit' || e.type === 'point');
    expect(more.filter((e) => e.type === 'colorChange' && e.cause === 'flight')).toHaveLength(0);
  });
  it('Simulation: Flugwechsel genau einmal je Ballflug; Wechsel insgesamt = Kontakte + Flugwechsel', () => {
    const c: PongSettings = { ...cfg, flightChange: true, targetScore: 21 };
    const rng = makeRng(99);
    const s = newPong(rng);
    let contacts = 0;
    let flights = 0;
    let flipsSeen = 0;
    let parity = s.eye;
    for (let i = 0; i < 120 * 120 && s.phase !== 'over'; i++) {
      // eigener Schläger folgt dem Ball (gut, aber nicht perfekt)
      if (s.phase === 'play' && s.ball.vy > 0) setPaddle(s, c, 'bottom', s.ball.x);
      for (const e of stepPong(s, c, noKeys, rng)) {
        if (e.type === 'hit') contacts++;
        if (e.type === 'colorChange') {
          flipsSeen++;
          parity = parity === 'AMBLYOPIC' ? 'FELLOW' : 'AMBLYOPIC';
          if (e.cause === 'flight') flights++;
        }
      }
      expect(s.eye).toBe(parity);
    }
    expect(contacts).toBeGreaterThan(5);
    expect(flights).toBeGreaterThanOrEqual(contacts - 1);
    expect(flights).toBeLessThanOrEqual(contacts);
    expect(flipsSeen).toBe(contacts + flights);
    expect(s.colorChanges).toBe(flipsSeen);
  });
});

describe('Punktestand und Spielende', () => {
  it('Spiel endet, wenn eine Seite die Zielpunkte erreicht (Standard 7)', () => {
    expect(DEFAULT_PONG.targetScore).toBe(7);
    const c: PongSettings = { ...cfg, targetScore: 2 };
    const rng = makeRng(4);
    const s = newPong(rng);
    s.score.bottom = 1;
    s.phase = 'play';
    s.speed = 500;
    s.ball = { x: 360, y: TOP_Y - 10, vx: 0, vy: -500 };
    s.top = 700; // Gegner weit weg
    const ev = runUntil(s, c, rng, (e) => e.type === 'over');
    expect(ev.some((e) => e.type === 'over' && e.winner === 'bottom')).toBe(true);
    expect(s.phase).toBe('over');
    expect(s.winner).toBe('bottom');
    expect(stepPong(s, c, noKeys, rng)).toEqual([]);
  });
});

describe('Steuerung und Zwei-Spieler-Modus', () => {
  it('Schläger bleibt im Spielfeld', () => {
    const s = newPong(makeRng(1));
    setPaddle(s, cfg, 'bottom', -500);
    expect(s.bottom).toBe(cfg.paddleWidth / 2);
    setPaddle(s, cfg, 'bottom', 5000);
    expect(s.bottom).toBe(W - cfg.paddleWidth / 2);
    expect(BOTTOM_Y).toBeGreaterThan(H / 2);
    expect(TOP_Y).toBeLessThan(H / 2);
    expect(PADDLE_H).toBeGreaterThan(10);
  });
  it('Tastatur: unten mit Pfeilen, im Zwei-Spieler-Modus oben mit eigenen Tasten', () => {
    const c: PongSettings = { ...cfg, twoPlayer: true };
    const s = newPong(makeRng(1));
    s.phase = 'serve';
    s.serveMs = 1e9;
    stepPong(s, c, { keys: { top: 1, bottom: -1 } }, makeRng(1));
    expect(s.top).toBeCloseTo(W / 2 + KEY_SPEED * STEP_S, 6);
    expect(s.bottom).toBeCloseTo(W / 2 - KEY_SPEED * STEP_S, 6);
  });
  it('Zwei Spieler: kein Computergegner – der obere Schläger bewegt sich nur durch Eingabe', () => {
    const c: PongSettings = { ...cfg, twoPlayer: true };
    const s = newPong(makeRng(1));
    s.phase = 'play';
    s.speed = 500;
    s.ball = { x: 650, y: 400, vx: 0, vy: -500 };
    const top0 = s.top;
    for (let i = 0; i < 30; i++) {
      s.ball.y = 400;
      stepPong(s, c, noKeys, makeRng(1));
    }
    expect(s.top).toBe(top0);
    // gegen den Computer bewegt er sich
    const s1 = newPong(makeRng(1));
    s1.phase = 'play';
    s1.speed = 500;
    s1.ball = { x: 650, y: 400, vx: 0, vy: -500 };
    for (let i = 0; i < 30; i++) {
      s1.ball.y = 400;
      stepPong(s1, cfg, noKeys, makeRng(1));
    }
    expect(s1.top).toBeGreaterThan(top0);
  });
});

describe('Einstellungen Pong', () => {
  it('Standardwerte laut Spezifikation', () => {
    expect(DEFAULT_PONG.gain).toBe(1.3);
    expect(DEFAULT_PONG.targetScore).toBe(7);
    expect(DEFAULT_PONG.flightChange).toBe(false);
    expect(DEFAULT_PONG.twoPlayer).toBe(false);
    expect(normalizePong(null)).toEqual(DEFAULT_PONG);
  });
  it('Werte streng begrenzt, ungültige Typen → Standard', () => {
    const n = normalizePong({ ballRadius: 999, startSpeed: 1, paddleWidth: 'breit', opponent: 9.4, flightChange: 1, twoPlayer: true, gain: 0, targetScore: 50.4 });
    expect(n).toEqual({ ballRadius: 40, startSpeed: 300, paddleWidth: DEFAULT_PONG.paddleWidth, opponent: 5, flightChange: false, twoPlayer: true, gain: 0.5, targetScore: 21 });
    expect(normalizePong({ gain: NaN, startSpeed: Infinity }).gain).toBe(1.3);
    expect(normalizePong({ gain: 1.25 }).gain).toBe(1.3);
  });
});
