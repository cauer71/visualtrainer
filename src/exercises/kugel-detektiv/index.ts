/**
 * Kugel-Detektiv – mehrere bewegte Kugeln gleichzeitig verfolgen
 * (Multiple Object Tracking, Ablauf ähnlich NeuroTracker).
 *
 * Pro Runde: zeigen → Ziele leuchten → überblenden → verfolgen → auswählen → auflösen.
 *
 * Verbesserungen gegenüber dem Vorbild:
 * - Mehrere kurze Runden pro Sitzung statt eines einzigen langen Durchgangs.
 * - Adaptives Tempo pro Runde (gewichtete Treppe, Ziel ≈ 75 % fehlerfreie Runden – motivierender
 *   als 1-up/1-down mit 50 %). Erfolg = alle Ziele richtig.
 * - Bewegung zeitbasiert (u/s × dt, mit Teilschritten) – auf 60- und 120-Hz-Displays gleich schnell.
 * - Alle Kugeln gleich schnell, weiche Richtungsschwankung, gleiche Zeichenreihenfolge →
 *   die Ziele verraten sich nicht.
 * - Weiche Abstoßung statt harter Stöße: Nahe Kugeln drehen sanft voneinander weg (enge Begegnungen
 *   sind die Hauptursache für Verwechslungen). Nur wenn das nicht reicht, echter elastischer Stoß.
 * - Fixationspunkt in der Mitte (Tipp: Blick locker in die Mitte – wird angeboten, nicht erzwungen).
 * - Auflösung mit Form und Farbe (✓, ✗, gestrichelter Ring) – auch bei Rot-Grün-Schwäche lesbar.
 */
import { background, C, circle, font, glow, ring, rrPath, type Rect } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeInOut, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { de, it } from './texts';

// ---------------------------------------------------------------------------
// Parameter

const BALLS = 8;
const TARGETS = 3;
const ROUNDS = 6;
const LEVEL_MIN = 1;
const LEVEL_MAX = 25;
/** Tempo auf Stufe 1 in u/s (≈ 3°/s auf dem iPad bei 40 cm); jede Stufe × 1,1 */
const SPEED_BASE = 12;
const SPEED_FACTOR = 1.1;
/** Weiche Richtungsschwankung: Spitze in rad/s */
const WOBBLE = 0.6;
/** Weiche Abstoßung ab diesem Mittelpunktsabstand (in r; 5 r = 2,5 Durchmesser) … */
const REPEL_DIST = 5;
/**
 * … Drehrate (rad/s) × Stärke (1 − d/dmin). Per Simulation abgestimmt: Auf Stufe 1 sinkt die Zeit
 * sehr enger Begegnungen (< 1,5 Ø) von ≈ 3,7 s auf ≈ 0,5 s pro Runde, harte Stöße fast nie. Bei hohem
 * Tempo reicht die Zeit zum Ausweichen nicht mehr ganz – enge Begegnungen werden dann bewusst häufiger.
 */
const REPEL_TURN = 7;

const MS = {
  show: 500,
  mark: 2000,
  blend: 400,
  track: 6000,
  trackQuick: 2500,
  reveal: 1600,
  fade: 250,
  doubleTap: 250,
};

/** Intro-Film: wenige, langsame Kugeln */
const DEMO = { balls: 6, targets: 2, mark: 1600, track: 3500, speed: 12, reveal: 2300 };

const COL = {
  ball: '#CBD5E1',
  target: '#F59E0B',
  ink: '#0F172A',
};

const TAU = Math.PI * 2;

// ---------------------------------------------------------------------------
// Helfer

type RGB = readonly [number, number, number];

function rgb(hex: string): RGB {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mix(a: RGB, b: RGB, k: number): string {
  const m = (i: number) => Math.round(a[i] + (b[i] - a[i]) * clamp(k, 0, 1));
  return `rgb(${m(0)},${m(1)},${m(2)})`;
}

const RGB_BALL = rgb(COL.ball);
const RGB_TARGET = rgb(COL.target);
const RGB_GOOD = rgb(C.good);
const RGB_BAD = rgb(C.bad);

/** Platzhalter {k}, {n} … ersetzen */
function fill(s: string, vars: Record<string, string | number>): string {
  return s.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ''));
}

/** Platz, den die Bildunterschrift im Intro-Film unten belegt (wie im Runner berechnet) */
function captionSpace(h: number, u: number): number {
  return h * 0.05 + clamp(u * 4.6, 14, 30) * 2.1 + Math.max(6, u);
}

/** Kugel mit dezentem Glanz (heller Fleck oben links, leicht dunklerer Rand) */
function drawBall(g: CanvasRenderingContext2D, x: number, y: number, r: number, color: string): void {
  circle(g, x, y, r, color);
  const sh = g.createRadialGradient(x - r * 0.36, y - r * 0.4, r * 0.05, x, y, r);
  sh.addColorStop(0, 'rgba(255,255,255,0.5)');
  sh.addColorStop(0.32, 'rgba(255,255,255,0.1)');
  sh.addColorStop(0.72, 'rgba(255,255,255,0)');
  sh.addColorStop(1, 'rgba(15,23,42,0.26)');
  g.beginPath();
  g.arc(x, y, r, 0, TAU);
  g.fillStyle = sh;
  g.fill();
}

function checkMark(g: CanvasRenderingContext2D, x: number, y: number, s: number, color: string, lw: number): void {
  g.save();
  g.strokeStyle = color;
  g.lineWidth = lw;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.beginPath();
  g.moveTo(x - s * 0.44, y + s * 0.02);
  g.lineTo(x - s * 0.14, y + s * 0.32);
  g.lineTo(x + s * 0.46, y - s * 0.3);
  g.stroke();
  g.restore();
}

function crossMark(g: CanvasRenderingContext2D, x: number, y: number, s: number, color: string, lw: number): void {
  g.save();
  g.strokeStyle = color;
  g.lineWidth = lw;
  g.lineCap = 'round';
  g.beginPath();
  g.moveTo(x - s * 0.32, y - s * 0.32);
  g.lineTo(x + s * 0.32, y + s * 0.32);
  g.moveTo(x + s * 0.32, y - s * 0.32);
  g.lineTo(x - s * 0.32, y + s * 0.32);
  g.stroke();
  g.restore();
}

// ---------------------------------------------------------------------------

interface Ball {
  x: number;
  y: number;
  /** Bewegungsrichtung (Einheitsvektor) – das Tempo ist für alle gleich */
  dx: number;
  dy: number;
  target: boolean;
  sel: boolean;
  /** Zeitpunkt des letzten An-/Abwählens (ms) – Animation und Doppel-Tipp-Schutz */
  selT: number;
  /** Richtungsschwankung: zwei langsame Sinus-Anteile (Hz) mit zufälligen Phasen */
  f1: number;
  f2: number;
  p1: number;
  p2: number;
}

function rotate(b: Ball, a: number): void {
  const c = Math.cos(a);
  const s = Math.sin(a);
  const dx = b.dx * c - b.dy * s;
  b.dy = b.dx * s + b.dy * c;
  b.dx = dx;
}

function normalize(b: Ball, fx: number, fy: number): void {
  const l = Math.hypot(b.dx, b.dy);
  if (l < 1e-4) {
    b.dx = fx;
    b.dy = fy;
  } else {
    b.dx /= l;
    b.dy /= l;
  }
}

/**
 * Richtung sanft vom Nachbarn (liegt in Richtung n) wegdrehen – höchstens bis „genau weg von ihm“.
 * Wirkt auch bei nebeneinander fahrenden Kugeln. Frontal weichen beide zur selben Seite (relativ zur
 * eigenen Fahrtrichtung) aus und fahren aneinander vorbei. Das Tempo bleibt gleich (reine Drehung).
 */
function turnAway(b: Ball, nx: number, ny: number, strength: number, h: number): void {
  const toward = b.dx * nx + b.dy * ny;
  const cross = b.dx * ny - b.dy * nx;
  const turn = Math.min(REPEL_TURN * strength * h, Math.acos(clamp(-toward, -1, 1)));
  rotate(b, (cross >= 0 ? -1 : 1) * turn);
}

type Phase = 'show' | 'mark' | 'blend' | 'track' | 'select' | 'reveal' | 'done';

class KugelDetektiv implements Exercise {
  private readonly demo: boolean;
  private readonly nBalls: number;
  private readonly nTargets: number;
  private readonly rounds: number;
  private readonly stair: Staircase;
  private phase: Phase = 'show';
  private phaseT = 0;
  private round = 0;
  private roundLevel = LEVEL_MIN;
  /** Bewegungszeit der Runde in s (Zeitachse der Richtungsschwankung) */
  private trackS = 0;
  private balls: Ball[] = [];
  private arena: Rect = { x: 0, y: 0, w: 1, h: 1 };
  private r = 20;
  // Auswertung
  private hitsTotal = 0;
  private perfectRounds = 0;
  private levels: number[] = [];
  private score = 0;

  constructor(private ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.nBalls = this.demo ? DEMO.balls : BALLS;
    this.nTargets = this.demo ? DEMO.targets : TARGETS;
    this.rounds = this.demo || ctx.quick ? 1 : ROUNDS;
    // Gewichtete Treppe (Kaernbach): +0,6 nach Erfolg, −1,8 nach Fehler → Gleichgewicht bei 75 % Erfolg
    this.stair = new Staircase({
      start: ctx.startLevel ?? 1,
      min: LEVEL_MIN,
      max: LEVEL_MAX,
      down: 1,
      up: 1,
      stepHarder: 0.6,
      stepEasier: 1.8,
      initialBoost: 2,
    });
    this.layout();
  }

  // --- Dauer der Phasen -----------------------------------------------------

  private get markMs(): number {
    return this.demo ? DEMO.mark : MS.mark;
  }

  private get trackMs(): number {
    return this.demo ? DEMO.track : this.ctx.quick ? MS.trackQuick : MS.track;
  }

  private get revealMs(): number {
    return this.demo ? DEMO.reveal : MS.reveal;
  }

  /** Tempo in u/s */
  private speed(): number {
    return this.demo ? DEMO.speed : SPEED_BASE * Math.pow(SPEED_FACTOR, this.roundLevel - 1);
  }

  // --- Layout ---------------------------------------------------------------

  private statusSize(): number {
    return clamp(this.ctx.stage.u * 3.4, 15, 26);
  }

  /** Höhe der Statuszeile über dem Spielfeld (nur im Spielmodus) */
  private bandH(): number {
    return Math.max(44, this.statusSize() * 2.5);
  }

  private layout(): void {
    const { w, h, u } = this.ctx.stage;
    const m = Math.max(10, u * 2.2);
    const top = this.demo ? m : this.bandH();
    const bottom = this.demo ? captionSpace(h, u) : m;
    this.r = Math.max(20, u * 4.6);
    this.arena = { x: m, y: top, w: Math.max(this.r * 4, w - 2 * m), h: Math.max(this.r * 4, h - top - bottom) };
  }

  private bounds(): { x0: number; x1: number; y0: number; y1: number } {
    const { arena: A, r } = this;
    return { x0: A.x + r, x1: A.x + A.w - r, y0: A.y + r, y1: A.y + A.h - r };
  }

  private clampAll(): void {
    const { x0, x1, y0, y1 } = this.bounds();
    for (const b of this.balls) {
      b.x = clamp(b.x, x0, x1);
      b.y = clamp(b.y, y0, y1);
    }
  }

  // --- Ablauf ---------------------------------------------------------------

  start(t: number): void {
    this.layout();
    const { hud } = this.ctx;
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    if (this.demo) {
      hud.caption(this.ctx.texts.captions.mark);
      this.ghostAway(0);
    }
    this.startRound(t);
  }

  private startRound(t: number): void {
    this.roundLevel = this.demo ? LEVEL_MIN : this.stair.level;
    this.trackS = 0;
    this.place();
    this.phase = 'show';
    this.phaseT = t;
    if (!this.demo) this.ctx.hud.setLabel(fill(this.ctx.texts.feedback.round, { k: this.round + 1, n: this.rounds }));
  }

  /** Nicht überlappende Startpositionen, zufällige Richtungen, zufällige Ziele */
  private place(): void {
    const { rng } = this.ctx;
    const { arena: A, r } = this;
    const { x0, x1, y0, y1 } = this.bounds();
    const cx = A.x + A.w / 2;
    const cy = A.y + A.h / 2;
    const n = this.nBalls;
    // Erst großzügiger Abstand (2,5 Durchmesser), sonst mindestens 3 r; Fixationspunkt frei lassen
    const tries: Array<[number, number, boolean]> = [
      [REPEL_DIST * r, 1500, true],
      [3 * r, 2500, true],
      [3 * r, 2500, false],
      [2.2 * r, 2500, false],
    ];
    let pts: Array<{ x: number; y: number }> = [];
    for (const [minD, attempts, freeCenter] of tries) {
      pts = [];
      for (let i = 0; i < attempts && pts.length < n; i++) {
        const x = rng.range(x0, Math.max(x0, x1));
        const y = rng.range(y0, Math.max(y0, y1));
        if (freeCenter && Math.hypot(x - cx, y - cy) < 2.4 * r) continue;
        if (pts.every((p) => Math.hypot(p.x - x, p.y - y) >= minD)) pts.push({ x, y });
      }
      if (pts.length >= n) break;
    }
    if (pts.length < n) {
      // Notfall (winzige Bühne): Raster
      const cols = Math.max(1, Math.ceil(Math.sqrt((n * A.w) / A.h)));
      const rows = Math.ceil(n / cols);
      pts = Array.from({ length: n }, (_, k) => ({
        x: A.x + ((k % cols) + 0.5) * (A.w / cols),
        y: A.y + (Math.floor(k / cols) + 0.5) * (A.h / rows),
      }));
    }
    const order = rng.shuffle(Array.from({ length: n }, (_, i) => i));
    const targets = new Set(order.slice(0, this.nTargets));
    this.balls = pts.map((p, i) => {
      const a = rng.range(0, TAU);
      return {
        x: p.x,
        y: p.y,
        dx: Math.cos(a),
        dy: Math.sin(a),
        target: targets.has(i),
        sel: false,
        selT: -1e9,
        f1: rng.range(0.12, 0.3),
        f2: rng.range(0.35, 0.7),
        p1: rng.range(0, TAU),
        p2: rng.range(0, TAU),
      };
    });
    this.clampAll();
  }

  update(dt: number, t: number): void {
    const el = t - this.phaseT;
    switch (this.phase) {
      case 'show':
        if (el >= MS.show) this.enter('mark', t);
        break;
      case 'mark':
        if (el >= this.markMs) this.enter('blend', t);
        break;
      case 'blend':
        if (el >= MS.blend) this.enter('track', t);
        break;
      case 'track':
        this.simulate(dt);
        if (el >= this.trackMs) this.enter('select', t);
        break;
      case 'reveal':
        if (el >= this.revealMs) this.nextRound(t);
        break;
      default:
        break;
    }
  }

  private enter(phase: Phase, t: number): void {
    this.phase = phase;
    this.phaseT = t;
    const { hud, texts } = this.ctx;
    if (phase === 'track' && this.demo) hud.caption(texts.captions.track);
    if (phase === 'select') {
      if (this.demo) hud.caption(texts.captions.select);
      this.planGhost();
    }
  }

  private nextRound(t: number): void {
    this.round++;
    this.ctx.hud.setProgress(this.round / this.rounds);
    if (this.round >= this.rounds) {
      this.phase = 'done';
      this.finish();
      return;
    }
    this.startRound(t);
  }

  // --- Bewegung -------------------------------------------------------------

  private simulate(dt: number): void {
    if (dt <= 0 || !this.balls.length) return;
    const v = this.speed() * this.ctx.stage.u; // px/s
    const r = this.r;
    // Teilschritte: höchstens ~0,3 r pro Schritt → keine "Tunnel"-Effekte bei hohem Tempo
    const steps = clamp(Math.ceil((v * dt) / (r * 0.3)), 1, 12);
    const h = dt / steps;
    const { x0, x1, y0, y1 } = this.bounds();
    for (let s = 0; s < steps; s++) {
      const ts = this.trackS;
      for (const b of this.balls) {
        // glattes Rauschen der Drehrate (Spitze ±WOBBLE rad/s)
        rotate(b, WOBBLE * (0.65 * Math.sin(TAU * b.f1 * ts + b.p1) + 0.35 * Math.sin(TAU * b.f2 * ts + b.p2)) * h);
      }
      this.repel(h);
      for (const b of this.balls) {
        b.x += b.dx * v * h;
        b.y += b.dy * v * h;
        // Wände reflektieren
        if (b.x < x0) {
          b.x = Math.min(x1, 2 * x0 - b.x);
          b.dx = Math.abs(b.dx);
        } else if (b.x > x1) {
          b.x = Math.max(x0, 2 * x1 - b.x);
          b.dx = -Math.abs(b.dx);
        }
        if (b.y < y0) {
          b.y = Math.min(y1, 2 * y0 - b.y);
          b.dy = Math.abs(b.dy);
        } else if (b.y > y1) {
          b.y = Math.max(y0, 2 * y1 - b.y);
          b.dy = -Math.abs(b.dy);
        }
      }
      this.collide();
      this.trackS += h;
    }
  }

  /** Weiche Abstoßung: näher als 2,5 Durchmesser → Richtungen sanft voneinander wegdrehen */
  private repel(h: number): void {
    const bs = this.balls;
    const dmin = REPEL_DIST * this.r;
    for (let i = 0; i < bs.length; i++) {
      const a = bs[i];
      for (let j = i + 1; j < bs.length; j++) {
        const b = bs[j];
        const ex = b.x - a.x;
        const ey = b.y - a.y;
        const d = Math.hypot(ex, ey);
        if (d >= dmin || d < 1e-6) continue;
        const nx = ex / d;
        const ny = ey / d;
        const strength = 1 - d / dmin;
        turnAway(a, nx, ny, strength, h);
        turnAway(b, -nx, -ny, strength, h);
      }
    }
  }

  /**
   * Notfall, wenn die weiche Abstoßung nicht reicht (hohes Tempo): Überlappung auflösen und –
   * nur wenn sie sich aufeinander zubewegen – elastisch stoßen (gleiche Masse: Normalkomponenten
   * tauschen), danach das Tempo wieder auf v normieren.
   */
  private collide(): void {
    const bs = this.balls;
    const minD = 2 * this.r;
    for (let i = 0; i < bs.length; i++) {
      const a = bs[i];
      for (let j = i + 1; j < bs.length; j++) {
        const b = bs[j];
        let nx = b.x - a.x;
        let ny = b.y - a.y;
        const d2 = nx * nx + ny * ny;
        if (d2 >= minD * minD) continue;
        const d = Math.sqrt(d2);
        if (d > 1e-6) {
          nx /= d;
          ny /= d;
        } else {
          nx = 1;
          ny = 0;
        }
        const push = (minD - d) / 2;
        a.x -= nx * push;
        a.y -= ny * push;
        b.x += nx * push;
        b.y += ny * push;
        const an = a.dx * nx + a.dy * ny;
        const bn = b.dx * nx + b.dy * ny;
        const dn = bn - an;
        if (dn < 0) {
          a.dx += dn * nx;
          a.dy += dn * ny;
          b.dx -= dn * nx;
          b.dy -= dn * ny;
          normalize(a, -nx, -ny);
          normalize(b, nx, ny);
        }
      }
    }
    this.clampAll();
  }

  /** Nur Überlappungen auflösen (z. B. nach dem Drehen des Tablets) */
  private separate(iterations: number): void {
    const bs = this.balls;
    const minD = 2 * this.r + 1;
    for (let k = 0; k < iterations; k++) {
      let moved = false;
      for (let i = 0; i < bs.length; i++) {
        for (let j = i + 1; j < bs.length; j++) {
          const a = bs[i];
          const b = bs[j];
          const ex = b.x - a.x;
          const ey = b.y - a.y;
          const d = Math.hypot(ex, ey);
          if (d >= minD) continue;
          const nx = d > 1e-6 ? ex / d : 1;
          const ny = d > 1e-6 ? ey / d : 0;
          const push = (minD - d) / 2;
          a.x -= nx * push;
          a.y -= ny * push;
          b.x += nx * push;
          b.y += ny * push;
          moved = true;
        }
      }
      this.clampAll();
      if (!moved) break;
    }
  }

  // --- Eingabe --------------------------------------------------------------

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'select') return;
    const hitR = this.r + Math.max(12, this.ctx.stage.u * 2);
    let best: Ball | null = null;
    let bestD = Infinity;
    for (const b of this.balls) {
      const d = Math.hypot(b.x - p.x, b.y - p.y);
      if (d <= hitR && d < bestD) {
        best = b;
        bestD = d;
      }
    }
    if (!best) return;
    // Doppel-Tipp (zwei Finger / Prellen) nicht als An- und sofortiges Abwählen werten
    if (p.t - best.selT < MS.doubleTap) return;
    best.sel = !best.sel;
    best.selT = p.t;
    this.ctx.sfx.tap();
    if (this.balls.filter((b) => b.sel).length >= this.nTargets) this.reveal(p.t);
  }

  private reveal(t: number): void {
    const { hud, sfx, texts, stage } = this.ctx;
    const hits = this.balls.filter((b) => b.sel && b.target).length;
    this.phase = 'reveal';
    this.phaseT = t;
    if (this.demo) {
      hud.caption(texts.captions.reveal);
      this.ghostAway(700, 350);
      return;
    }
    const perfect = hits === this.nTargets;
    this.hitsTotal += hits;
    if (perfect) this.perfectRounds++;
    this.levels.push(this.roundLevel);
    this.score += Math.round(hits * 10 * Math.pow(SPEED_FACTOR, this.roundLevel - 1));
    this.stair.update(perfect);
    hud.setScore(this.hitsTotal);
    const size = this.statusSize() * 1.3;
    hud.toast(fill(perfect ? texts.feedback.perfect : texts.feedback.partial, { k: hits, n: this.nTargets }), perfect ? 'good' : 'info', {
      x: stage.w / 2,
      y: this.bandH() / 2 + size * 0.3,
      ms: 1450,
      size,
    });
    if (perfect) sfx.good();
    else if (hits > 0) sfx.tick();
    else sfx.bad();
  }

  // --- Geister-Hand ---------------------------------------------------------

  private handSize(): number {
    return clamp(this.ctx.stage.u * 13, 48, 110);
  }

  /** Hand rechts unten aus dem Bild fahren (nicht über den Kugeln parken) */
  private ghostAway(move: number, delay = 0): void {
    const { w, h } = this.ctx.stage;
    this.ctx.ghost.moveTo(w + this.handSize() * 0.9, h * 0.8, { move, delay });
  }

  private planGhost(): void {
    const { ghost, rng, autoplay, stage } = this.ctx;
    if (!autoplay) return;
    const free = this.balls.filter((b) => !b.sel);
    const need = this.nTargets - (this.balls.length - free.length);
    if (need <= 0) return;
    if (this.demo) {
      // Die Hand kommt von rechts unten: zuerst das nähere Ziel
      const dist = (b: Ball) => Math.hypot(stage.w - b.x, stage.h - b.y);
      const tg = free.filter((b) => b.target).sort((a, b) => dist(a) - dist(b));
      tg.forEach((b, i) => ghost.tap(b.x, b.y, { delay: i === 0 ? 500 : 280, move: i === 0 ? 750 : 560 }));
      return;
    }
    // Test-Autoplay: meist richtig, bei hohem Tempo öfter falsch
    const pOk = clamp(0.97 - 0.035 * (this.roundLevel - 1), 0.55, 0.97);
    const tg = rng.shuffle(free.filter((b) => b.target));
    const other = rng.shuffle(free.filter((b) => !b.target));
    for (let i = 0; i < need; i++) {
      const b = (rng.chance(pOk) ? tg.pop() : other.pop()) ?? tg.pop() ?? other.pop();
      if (!b) break;
      ghost.tap(b.x, b.y, { delay: i === 0 ? rng.range(350, 700) : rng.range(180, 420), move: rng.range(320, 520) });
    }
  }

  // --- Größenänderung -------------------------------------------------------

  resize(): void {
    const oldA = this.arena;
    const oldR = this.r;
    this.layout();
    if (!this.balls.length) return;
    const A = this.arena;
    const r = this.r;
    const ow = Math.max(1, oldA.w - 2 * oldR);
    const oh = Math.max(1, oldA.h - 2 * oldR);
    for (const b of this.balls) {
      const nx = clamp((b.x - oldA.x - oldR) / ow, 0, 1);
      const ny = clamp((b.y - oldA.y - oldR) / oh, 0, 1);
      b.x = A.x + r + nx * Math.max(0, A.w - 2 * r);
      b.y = A.y + r + ny * Math.max(0, A.h - 2 * r);
    }
    this.separate(40);
    if (this.ctx.autoplay && this.phase === 'select') {
      this.ctx.ghost.clear();
      this.planGhost();
    }
  }

  // --- Zeichnen -------------------------------------------------------------

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, u, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    const A = this.arena;
    // Spielfeld
    rrPath(g, A.x, A.y, A.w, A.h, Math.min(28, u * 3));
    g.fillStyle = 'rgba(255,255,255,0.028)';
    g.fill();
    g.strokeStyle = 'rgba(255,255,255,0.08)';
    g.lineWidth = 1;
    g.stroke();
    // Fixationspunkt in der Mitte
    const fx = A.x + A.w / 2;
    const fy = A.y + A.h / 2;
    ring(g, fx, fy, Math.max(7, u * 1.5), 'rgba(232,238,247,0.24)', Math.max(1.5, u * 0.22));
    circle(g, fx, fy, Math.max(2.5, u * 0.55), 'rgba(232,238,247,0.85)');

    const el = t - this.phaseT;
    // Sanftes Ein-/Ausblenden zwischen den Runden
    let alpha = 1;
    if (this.phase === 'show') alpha = easeOut(el / MS.fade);
    else if (this.phase === 'reveal' && this.round + 1 < this.rounds) alpha = 1 - easeInOut((el - (this.revealMs - MS.fade)) / MS.fade);

    const revealed = this.phase === 'reveal' || this.phase === 'done';
    const rk = revealed ? easeOut((t - this.phaseT) / 220) : 0;
    // Pass 1: Leuchten (unter allen Kugeln, damit es keine Nachbarn einfärbt)
    for (const b of this.balls) {
      const hi = this.highlight(b, el);
      if (hi > 0) glow(g, b.x, b.y, this.r, COL.target, 0.85 * hi * alpha);
      else if (revealed && b.sel && b.target) glow(g, b.x, b.y, this.r, C.good, 0.55 * rk * alpha);
    }
    // Pass 2: Kugeln und Markierungen
    for (const b of this.balls) {
      if (revealed) this.drawRevealed(g, b, t, rk, alpha);
      else this.drawBallState(g, b, t, el, alpha);
    }
    g.globalAlpha = 1;
    if (!this.demo) this.drawStatus(g, el);
  }

  /** Hervorhebung der Ziele 0..1 (Markieren und Überblenden) */
  private highlight(b: Ball, el: number): number {
    if (!b.target) return 0;
    if (this.phase === 'mark') return easeOut(el / 220);
    if (this.phase === 'blend') return 1 - easeInOut(el / MS.blend);
    return 0;
  }

  private drawBallState(g: CanvasRenderingContext2D, b: Ball, t: number, el: number, alpha: number): void {
    const r = this.r;
    const hi = this.highlight(b, el);
    g.globalAlpha = alpha;
    drawBall(g, b.x, b.y, r, hi > 0 ? mix(RGB_BALL, RGB_TARGET, hi) : COL.ball);
    if (hi > 0) {
      // pulsierender Ring (langsam, ~1,4 Hz Größenänderung – kein Blinken)
      const pulse = Math.sin((t / 1000) * TAU * 1.4);
      g.globalAlpha = alpha * hi * 0.9;
      ring(g, b.x, b.y, r + Math.max(6, r * 0.3) + pulse * Math.max(2, r * 0.08), COL.target, Math.max(2.5, r * 0.1));
    }
    if (this.phase === 'select' && b.sel) {
      const k = easeOut((t - b.selT) / 160);
      g.globalAlpha = alpha;
      ring(g, b.x, b.y, r + Math.max(5, r * 0.22) + (1 - k) * r * 0.35, '#FFFFFF', Math.max(3, r * 0.13));
      checkMark(g, b.x, b.y, r * (0.6 + 0.35 * k), COL.ink, Math.max(3, r * 0.19));
    }
  }

  private drawRevealed(g: CanvasRenderingContext2D, b: Ball, t: number, k: number, alpha: number): void {
    const r = this.r;
    const pop = 1 + 0.1 * Math.sin(Math.PI * clamp((t - this.phaseT) / 260, 0, 1));
    const lw = Math.max(3, r * 0.19);
    if (b.sel && b.target) {
      // richtig gewählt: grün + ✓
      g.globalAlpha = alpha;
      drawBall(g, b.x, b.y, r * pop, mix(RGB_BALL, RGB_GOOD, k));
      checkMark(g, b.x, b.y, r * 0.95, '#FFFFFF', lw);
    } else if (b.sel) {
      // falsch gewählt: rot + ✗
      g.globalAlpha = alpha;
      drawBall(g, b.x, b.y, r * pop, mix(RGB_BALL, RGB_BAD, k));
      crossMark(g, b.x, b.y, r * 0.95, '#FFFFFF', lw);
    } else if (b.target) {
      // übersehen: gestrichelter Amber-Ring (langsam drehend)
      g.globalAlpha = alpha;
      drawBall(g, b.x, b.y, r, mix(RGB_BALL, RGB_TARGET, 0.45 * k));
      g.save();
      g.translate(b.x, b.y);
      g.rotate((t / 1000) * 0.9);
      g.globalAlpha = alpha * k;
      ring(g, 0, 0, r + Math.max(6, r * 0.26), COL.target, Math.max(3, r * 0.12), [Math.max(6, r * 0.3), Math.max(5, r * 0.22)]);
      g.restore();
    } else {
      g.globalAlpha = alpha * (1 - 0.55 * k);
      drawBall(g, b.x, b.y, r, COL.ball);
    }
  }

  /** Kurze Anweisung über dem Spielfeld (nur Spielmodus – im Film erklären die Bildunterschriften) */
  private drawStatus(g: CanvasRenderingContext2D, el: number): void {
    const { w, u } = this.ctx.stage;
    const fb = this.ctx.texts.feedback;
    let s = '';
    let alpha = 1;
    let dots = false;
    switch (this.phase) {
      case 'show':
        s = fill(fb.memorize, { n: this.nTargets });
        alpha = easeOut(el / MS.fade);
        break;
      case 'mark':
      case 'blend':
        s = fill(fb.memorize, { n: this.nTargets });
        break;
      case 'track':
        s = fb.track;
        alpha = 0.55 * easeOut(el / 300);
        break;
      case 'select':
        s = fill(fb.pick, { n: this.nTargets });
        dots = true;
        break;
      default:
        return;
    }
    const size0 = this.statusSize();
    g.save();
    g.font = font(size0, 750);
    const tw0 = g.measureText(s).width;
    const dotR0 = size0 * 0.3;
    const dotsW0 = dots ? this.nTargets * dotR0 * 2 + (this.nTargets - 1) * dotR0 * 1.1 : 0;
    const gap0 = dots ? size0 * 0.9 : 0;
    const maxW = w - 2 * Math.max(12, u * 3);
    const f = Math.min(1, maxW / Math.max(1, tw0 + gap0 + dotsW0));
    const size = size0 * f;
    const dotR = dotR0 * f;
    const total = (tw0 + gap0 + dotsW0) * f;
    const x = (w - total) / 2;
    const y = this.bandH() / 2 + 1;
    g.globalAlpha = alpha;
    g.font = font(size, 750);
    g.fillStyle = C.fg;
    g.textAlign = 'left';
    g.textBaseline = 'middle';
    g.fillText(s, x, y);
    if (dots) {
      const chosen = this.balls.filter((b) => b.sel).length;
      let dx = x + (tw0 + gap0) * f + dotR;
      for (let i = 0; i < this.nTargets; i++) {
        if (i < chosen) circle(g, dx, y, dotR, '#FFFFFF');
        else ring(g, dx, y, dotR - 1, 'rgba(255,255,255,0.55)', Math.max(1.5, dotR * 0.28));
        dx += dotR * 3.1;
      }
    }
    g.restore();
  }

  // --- Ergebnis -------------------------------------------------------------

  private finish(): void {
    const { ctx } = this;
    if (this.demo) {
      ctx.finish({ primary: { key: 'level', value: 1, unit: 'level', better: 'higher' }, secondary: [], score: 0, level: 1 });
      return;
    }
    const thr = this.stair.threshold();
    const total = this.levels.length * this.nTargets;
    const accuracy = total ? (this.hitsTotal / total) * 100 : 0;
    const tip = accuracy < 60 ? 'center' : accuracy < 78 ? 'steady' : 'great';
    ctx.hud.setProgress(1);
    ctx.sfx.done();
    ctx.finish({
      primary: { key: 'level', value: Math.round(thr), unit: 'level', better: 'higher' },
      secondary: [
        { key: 'perfectRounds', value: this.perfectRounds, unit: 'count' },
        { key: 'accuracy', value: Math.round(accuracy), unit: 'percent' },
        { key: 'maxLevel', value: this.levels.length ? Math.max(...this.levels) : this.stair.level, unit: 'level' },
      ],
      score: this.score,
      level: nextStartLevel(thr, LEVEL_MIN, LEVEL_MAX),
      tip,
    });
  }
}

export const kugelDetektiv: ExerciseDefinition = {
  id: 'kugel-detektiv',
  category: 'bewegung',
  minutes: 2,
  color: '#2E6DB4',
  icon:
    '<g fill="currentColor"><circle cx="38.5" cy="9.5" r="4" opacity=".5"/><circle cx="42" cy="25" r="3.5" opacity=".5"/><circle cx="8.5" cy="39.5" r="4" opacity=".5"/><circle cx="24" cy="42" r="3.5" opacity=".5"/><circle cx="19" cy="19" r="5.5"/></g><circle cx="19" cy="19" r="11" fill="none" stroke="currentColor" stroke-width="3.4"/><path d="M27.2 27.2l7.3 7.3" stroke="currentColor" stroke-width="4.6" stroke-linecap="round"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new KugelDetektiv(ctx),
};
