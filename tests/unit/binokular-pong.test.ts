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
  planFlight,
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

const cfg: PongSettings = { ...DEFAULT_PONG, flightChange: false };
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
    expect(s.flightYs).toEqual([]);
    // Ohne Schlägerkontakt (Wandabprall) keine Änderung
    const w = newPong(makeRng(1));
    w.phase = 'play';
    w.speed = 500;
    w.ball = { x: cfg.ballRadius + 1, y: 600, vx: -500, vy: 0.001 };
    const e0 = w.eye;
    runUntil(w, cfg, makeRng(1), (e) => e.type === 'bounce');
    expect(w.eye).toBe(e0);
  });
  it('Farbwechsel im Flug: geplante Linien liegen zwischen 20 und 80 % der Strecke, sind verschieden und in Flugrichtung sortiert; jede wechselt genau einmal', () => {
    const c: PongSettings = { ...cfg, flightChange: true, flightFreq: 'often' };
    const a = frontY('bottom');
    const b = frontY('top');
    const counts = [0, 0, 0];
    for (let seed = 1; seed <= 300; seed++) {
      const ys = planFlight('bottom', c, makeRng(seed));
      counts[ys.length]++;
      for (const y of ys) {
        const f = (a - y) / (a - b);
        expect(f).toBeGreaterThanOrEqual(0.2 - 1e-9);
        expect(f).toBeLessThanOrEqual(0.8 + 1e-9);
      }
      for (let i = 1; i < ys.length; i++) expect(ys[i - 1] - ys[i]).toBeGreaterThan(0.1 * (a - b)); // Flug nach oben: fallende y
      const down = planFlight('top', c, makeRng(seed));
      for (let i = 1; i < down.length; i++) expect(down[i] - down[i - 1]).toBeGreaterThan(0.1 * (a - b));
    }
    expect(counts[0]).toBeGreaterThan(0);
    expect(counts[1]).toBeGreaterThan(0);
    expect(counts[2]).toBeGreaterThan(counts[0]); // „häufig“
    // Ball fliegt nach dem Kontakt durch alle Linien: je Linie genau ein Wechsel
    const rng = makeRng(5);
    const s = falling(c, 20, rng);
    runUntil(s, c, rng, (e) => e.type === 'hit');
    const planned = s.flightYs.length;
    const afterContact = s.eye;
    let flights = 0;
    for (let i = 0; i < 4000 && s.phase === 'play'; i++) {
      const ev = stepPong(s, c, noKeys, rng);
      flights += ev.filter((e) => e.type === 'colorChange' && e.cause === 'flight').length;
      if (ev.some((e) => e.type === 'hit' || e.type === 'point')) break;
      if (!s.flightYs.length && s.ball.y < frontY('top') + 200) break;
    }
    expect(flights).toBe(planned);
    expect(s.flightYs).toEqual([]);
    expect(s.eye).toBe(planned % 2 ? (afterContact === 'AMBLYOPIC' ? 'FELLOW' : 'AMBLYOPIC') : afterContact);
  });
  it('Häufigkeit: selten < normal < häufig (mittlere Anzahl Flugwechsel), „aus“ plant keine', () => {
    const mean = (f: 'rare' | 'normal' | 'often') => {
      let n = 0;
      for (let seed = 0; seed < 600; seed++) n += planFlight('bottom', { ...cfg, flightChange: true, flightFreq: f }, makeRng(seed)).length;
      return n / 600;
    };
    expect(mean('rare')).toBeLessThan(mean('normal'));
    expect(mean('normal')).toBeLessThan(mean('often'));
    for (let seed = 0; seed < 50; seed++) expect(planFlight('bottom', cfg, makeRng(seed))).toEqual([]);
  });
  /** Simulation mit zwei perfekten Schlägern (Zwei-Spieler-Modus): Farbe, mit der der Ball am unteren Schläger ankommt */
  function arrivalColours(c: PongSettings, seed: number, hits: number): string[] {
    const rng = makeRng(seed);
    const s = newPong(rng);
    const out: string[] = [];
    for (let i = 0; i < 120 * 3000 && out.length < hits && s.phase !== 'over'; i++) {
      if (s.phase === 'play') {
        setPaddle(s, c, 'bottom', s.ball.x);
        setPaddle(s, c, 'top', s.ball.x);
      }
      const before = s.eye;
      if (stepPong(s, c, noKeys, rng).some((e) => e.type === 'hit' && e.side === 'bottom')) out.push(before);
    }
    return out;
  }
  it('Statistik: am Schläger des Spielers kommt der Ball in beiden Farben an (Flugwechsel an); aus: immer dieselbe Farbe', () => {
    const on: PongSettings = { ...cfg, flightChange: true, flightFreq: 'normal', twoPlayer: true, targetScore: 21 };
    const all: string[] = [];
    for (let seed = 1; seed <= 10; seed++) all.push(...arrivalColours(on, seed, 20));
    expect(all.length).toBe(200);
    const share = all.filter((x) => x === 'AMBLYOPIC').length / all.length;
    expect(share).toBeGreaterThan(0.3);
    expect(share).toBeLessThan(0.7);
    // Gegenprobe: ohne Flugwechsel konstant je Spiel (der Test misst also etwas)
    const off: PongSettings = { ...on, flightChange: false };
    for (let seed = 1; seed <= 10; seed++) {
      const c = arrivalColours(off, seed, 20);
      expect(c.length).toBe(20);
      expect(new Set(c).size).toBe(1);
    }
    // mit Flugwechsel wechselt die Ankunftsfarbe je Spiel
    for (let seed = 1; seed <= 10; seed++) expect(new Set(arrivalColours(on, seed, 20)).size).toBe(2);
  });
  it('Simulation: Wechsel insgesamt = Kontakte + Flugwechsel, Farbe folgt jedem Wechsel', () => {
    const c: PongSettings = { ...cfg, flightChange: true, targetScore: 21 };
    const rng = makeRng(99);
    const s = newPong(rng);
    let contacts = 0;
    let flights = 0;
    let flipsSeen = 0;
    let parity = s.eye;
    for (let i = 0; i < 120 * 120 && s.phase !== 'over'; i++) {
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
    expect(flights).toBeGreaterThan(0);
    expect(flights).toBeLessThanOrEqual(2 * contacts);
    expect(flipsSeen).toBe(contacts + flights);
    expect(s.colorChanges).toBe(flipsSeen);
  });
});

describe('Computergegner verliert manchmal', () => {
  it('mit Standardeinstellungen verfehlt der Computer gegen einen mittelmäßigen Spieler zumindest manchmal (und gewinnt nicht immer)', () => {
    let aiMisses = 0;
    let humanMisses = 0;
    for (let seed = 1; seed <= 12; seed++) {
      const rng = makeRng(seed);
      const hrng = makeRng(seed + 1000);
      const s = newPong(rng);
      let offset = 0;
      for (let i = 0; i < 120 * 600 && s.phase !== 'over'; i++) {
        // „mittelmäßiger Mensch“: folgt dem Ball mit Fehler (neu gewürfelt je Schlag) und begrenzter Geschwindigkeit
        if (s.phase === 'play' && s.ball.vy > 0) {
          const d = Math.max(-380 * STEP_S, Math.min(380 * STEP_S, s.ball.x + offset - s.bottom));
          setPaddle(s, DEFAULT_PONG, 'bottom', s.bottom + d);
        }
        for (const e of stepPong(s, DEFAULT_PONG, noKeys, rng)) {
          if (e.type === 'hit' && e.side === 'top') offset = (hrng() * 2 - 1) * 80;
          if (e.type === 'point') e.scorer === 'bottom' ? aiMisses++ : humanMisses++;
        }
      }
    }
    expect(aiMisses).toBeGreaterThan(0);
    expect(humanMisses).toBeGreaterThan(0);
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
    expect(DEFAULT_PONG.flightChange).toBe(true);
    expect(DEFAULT_PONG.flightFreq).toBe('normal');
    expect(DEFAULT_PONG.twoPlayer).toBe(false);
    expect(normalizePong(null)).toEqual(DEFAULT_PONG);
  });
  it('Werte streng begrenzt, ungültige Typen → Standard', () => {
    const n = normalizePong({ ballRadius: 999, startSpeed: 1, paddleWidth: 'breit', opponent: 9.4, flightChange: 1, twoPlayer: true, gain: 0, targetScore: 50.4 });
    expect(n).toEqual({ ballRadius: 40, startSpeed: 300, paddleWidth: DEFAULT_PONG.paddleWidth, opponent: 5, flightChange: true, flightFreq: 'normal', twoPlayer: true, gain: 0.5, targetScore: 21 });
    expect(normalizePong({ flightFreq: 'oft' }).flightFreq).toBe('normal');
    expect(normalizePong({ flightFreq: 'often' }).flightFreq).toBe('often');
    expect(normalizePong({ gain: NaN, startSpeed: Infinity }).gain).toBe(1.3);
    expect(normalizePong({ gain: 1.25 }).gain).toBe(1.3);
  });
});
