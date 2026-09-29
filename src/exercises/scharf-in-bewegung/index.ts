/**
 * Scharf in Bewegung – Details an einem bewegten Objekt erkennen.
 *
 * Ein Ball gleitet in weichen, unvorhersehbaren Kurven über den Bildschirm; man folgt ihm
 * nur mit den Augen. Kurz erscheint darin ein Landolt-Ring ("C"), man tippt unten, wohin
 * die Öffnung zeigt.
 *
 * Verbesserungen gegenüber dem Vorbild ("Kugel mit dem Cursor verfolgen"):
 * - Geübt wird wirklich das Erkennen in Bewegung: Die Aufgabe gelingt nur, wenn die Augen
 *   dem Ball sauber folgen – das Mitgehen wird erzwungen statt nur behauptet.
 * - Normiertes Sehzeichen (Landolt-C, Strich = Lücke = 1/5) in fester Größe, unabhängig vom
 *   Ball; 4 Richtungen, Antwort per großem Button statt Zielen mit dem Finger.
 * - Adaptiv (3-down/1-up → ≈ 79 % richtig): Mit der Stufe wird der Ball schneller und das C
 *   kürzer gezeigt. Das Tempo ändert sich weich.
 * - Glatte Bahn: Winkelgeschwindigkeit als Produkt zweier langsamer Schwingungen,
 *   in Randnähe sanftes Wegsteuern, am Rand Spiegelung.
 */
import { background, button, type ButtonState, C, circle, glow, landoltC, type Rect, rrPath } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, lerp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo, ToastKind } from '../../core/types';
import { de, it } from './texts';

const MIN_LEVEL = 1;
const MAX_LEVEL = 20;
const TRIALS = 20;
const QUICK_TRIALS = 3;
/** So lange sind die Buttons nach dem Sehzeichen aktiv */
const ANSWER_MS = 2500;
const FEEDBACK_MS = 750;
/** Pause nach einer Antwort bis zum nächsten C (zufällig) */
const GAP_MS: [number, number] = [1300, 2300];
const FIRST_MS: [number, number] = [1600, 2300];
const END_DELAY_MS = 900;
/** maximale Wegsteuer-Drehrate in Randnähe (rad/s) */
const STEER = 2.4;
// Intro-Film: mittleres Tempo, C länger sichtbar, feste Richtungen (rechts, oben, links)
const DEMO_LEVEL = 6;
const DEMO_SHOW_MS = 700;
const DEMO_DIRS = [0, 3, 2];
const DEMO_FIRST_MS = 2200;
const DEMO_GAP_MS = 2100;

const BALL = '#F8FAFC';
const INK = '#0F172A';

/** Antwort-Buttons in der Reihenfolge ← ↑ ↓ → (landoltC: 0 = rechts, 1 = unten, 2 = links, 3 = oben) */
const BUTTON_DIRS = [2, 3, 1, 0];

/** Tempo in u/s */
const speedFor = (level: number): number => 12 * Math.pow(1.13, level - 1);
/** Anzeigedauer des C in ms – wird mit der Stufe kürzer */
const exposureFor = (level: number): number => Math.max(220, 500 - 15 * (level - 1));

interface Point {
  x: number;
  y: number;
}

interface Bounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

interface Layout {
  key: string;
  barTop: number;
  gap: number;
  btns: Rect[];
  /** Ballradius */
  r: number;
  /** Durchmesser des Sehzeichens */
  d: number;
  /** Bewegungsbereich des Ballmittelpunkts */
  bounds: Bounds;
  /** Ruheplatz der Geister-Hand */
  rest: Point;
}

interface Feedback {
  /** gewählter Button (−1 = keine Antwort) */
  chosen: number;
  correct: number;
  ok: boolean;
  until: number;
}

interface TrialRec {
  level: number;
  ok: boolean;
  late: boolean;
}

type Phase = 'wait' | 'show' | 'answer' | 'done';

class ScharfInBewegung implements Exercise {
  private readonly stair: Staircase;
  private readonly total: number;
  private phase: Phase = 'wait';
  private t0 = 0;
  private nextAt = 0;
  private onset = 0;
  private showMs = 400;
  private answerFrom = 0;
  private dir = 0;
  private dirs: number[] = [];
  private idx = 0;
  private trials: TrialRec[] = [];
  private correct = 0;
  private late = 0;
  private points = 0;
  private fb: Feedback | null = null;
  private ball = { x: 0, y: 0, ang: 0, speed: 0 };
  private phi1 = 0;
  private phi2 = 0;
  private lay: Layout | null = null;
  private followCaption = true;
  /** Zeitpunkt des Endes – danach steht das Bild still */
  private endT = Infinity;

  constructor(private readonly ctx: ExerciseContext) {
    this.stair = new Staircase({ start: ctx.startLevel ?? 1, min: MIN_LEVEL, max: MAX_LEVEL, down: 3, up: 1 });
    this.total = ctx.mode === 'demo' ? DEMO_DIRS.length : ctx.quick ? QUICK_TRIALS : TRIALS;
  }

  private get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  private get level(): number {
    return this.demo ? DEMO_LEVEL : this.stair.level;
  }

  start(t: number): void {
    const { rng, hud, ghost, texts } = this.ctx;
    this.t0 = t;
    const L = this.layout();
    this.phi1 = rng.range(0, Math.PI * 2);
    this.phi2 = rng.range(0, Math.PI * 2);
    const B = L.bounds;
    this.ball = {
      x: lerp(B.minX, B.maxX, this.demo ? 0.3 : 0.5),
      y: lerp(B.minY, B.maxY, 0.5),
      ang: this.demo ? -0.35 : rng.range(0, Math.PI * 2),
      speed: speedFor(this.level),
    };
    this.phase = 'wait';
    this.nextAt = t + (this.demo ? DEMO_FIRST_MS : rng.range(FIRST_MS[0], FIRST_MS[1]));
    this.updateHud();
    if (this.demo) {
      hud.caption(texts.captions.follow, 'top');
      ghost.moveTo(L.rest.x, L.rest.y, { move: 0 });
    }
  }

  update(dt: number, t: number): void {
    if (this.phase === 'done') return;
    this.moveBall(dt, t);
    if (this.phase === 'wait') {
      if (this.demo && !this.followCaption && (!this.fb || t >= this.fb.until)) {
        this.ctx.hud.caption(this.ctx.texts.captions.follow, 'top');
        this.followCaption = true;
      }
      if (t >= this.nextAt) {
        if (this.idx >= this.total) {
          this.end();
          return;
        }
        this.show(t);
      }
    } else if (this.phase === 'show') {
      if (t - this.onset >= this.showMs) {
        this.phase = 'answer';
        this.answerFrom = t;
      }
    } else if (this.phase === 'answer' && t - this.answerFrom >= ANSWER_MS) {
      this.timeout(t);
    }
  }

  // -------------------------------------------------------------------------
  // Ball

  private moveBall(dt: number, t: number): void {
    const L = this.layout();
    const B = L.bounds;
    const b = this.ball;
    // Tempo weich an die Stufe anpassen
    b.speed += (speedFor(this.level) - b.speed) * (1 - Math.exp(-dt / 0.6));
    // Richtung ändert sich weich: ω(t) = 1,4 · sin(0,9 t + φ1) · cos(0,37 t + φ2)
    const s = (t - this.t0) / 1000;
    let omega = 1.4 * Math.sin(0.9 * s + this.phi1) * Math.cos(0.37 * s + this.phi2);
    // In Randnähe (< 2r) sanft vom Rand wegsteuern
    const zone = 2 * L.r;
    let ax = 0;
    let ay = 0;
    if (b.x - B.minX < zone) ax += 1 - (b.x - B.minX) / zone;
    if (B.maxX - b.x < zone) ax -= 1 - (B.maxX - b.x) / zone;
    if (b.y - B.minY < zone) ay += 1 - (b.y - B.minY) / zone;
    if (B.maxY - b.y < zone) ay -= 1 - (B.maxY - b.y) / zone;
    const mag = Math.hypot(ax, ay);
    if (mag > 1e-6) {
      const vx = Math.cos(b.ang);
      const vy = Math.sin(b.ang);
      const sin = (vx * ay - vy * ax) / mag; // > 0: Wegrichtung liegt "links" der Flugrichtung
      const cos = (vx * ax + vy * ay) / mag; // < 0: fliegt auf den Rand zu
      if (cos < 0.2) omega += STEER * Math.min(1, mag) * (sin >= 0 ? 1 : -1) * Math.min(1, (0.2 - cos) / 0.4);
    }
    b.ang += omega * dt;
    const v = b.speed * this.ctx.stage.u;
    b.x += Math.cos(b.ang) * v * dt;
    b.y += Math.sin(b.ang) * v * dt;
    bounce(b, B);
  }

  // -------------------------------------------------------------------------
  // Durchgänge

  private show(t: number): void {
    this.dir = this.pickDir();
    this.onset = t;
    this.showMs = this.demo ? DEMO_SHOW_MS : exposureFor(this.stair.level);
    this.phase = 'show';
    this.fb = null;
    if (this.demo) {
      this.ctx.hud.caption(this.ctx.texts.captions.where, 'top');
      this.followCaption = false;
      this.demoPlan();
    } else if (this.ctx.autoplay) {
      this.autoPlan();
    }
  }

  /** Zufällige Richtung, aber nie dreimal hintereinander dieselbe */
  private pickDir(): number {
    if (this.demo) return DEMO_DIRS[this.idx % DEMO_DIRS.length];
    const { rng } = this.ctx;
    let d = rng.int(4);
    const n = this.dirs.length;
    if (n >= 2 && this.dirs[n - 1] === d && this.dirs[n - 2] === d) d = (d + 1 + rng.int(3)) % 4;
    this.dirs.push(d);
    return d;
  }

  /** Tastatur: Pfeiltasten wählen die Öffnungsrichtung. */
  keyDown(key: string, t: number): void {
    const dir = key === 'ArrowRight' ? 0 : key === 'ArrowDown' ? 1 : key === 'ArrowLeft' ? 2 : key === 'ArrowUp' ? 3 : -1;
    if (dir < 0) return;
    if ((this.phase !== 'show' && this.phase !== 'answer') || t < this.onset) return;
    const btn = BUTTON_DIRS.indexOf(dir as (typeof BUTTON_DIRS)[number]);
    if (btn >= 0) this.respond(btn, t);
  }

  pointerDown(p: PointerInfo): void {
    // Außerhalb der Antwortphase zählen die Buttons nicht. Wer schon während der
    // Anzeige antwortet, wird gewertet (die Buttons leuchten erst danach auf,
    // damit sie den Blick nicht vom Ball weglocken).
    if ((this.phase !== 'show' && this.phase !== 'answer') || p.t < this.onset) return;
    const L = this.layout();
    if (p.y < L.barTop) return;
    for (let i = 0; i < L.btns.length; i++) {
      const R = L.btns[i];
      if (p.x >= R.x - L.gap / 2 && p.x <= R.x + R.w + L.gap / 2) {
        this.respond(i, p.t);
        return;
      }
    }
  }

  private respond(btn: number, t: number): void {
    const { sfx } = this.ctx;
    const correctBtn = BUTTON_DIRS.indexOf(this.dir);
    const ok = btn === correctBtn;
    if (ok) {
      this.correct++;
      this.points += 10 + 2 * (Math.floor(this.level + 1e-9) - 1);
      sfx.good();
      this.toastAtBall('✓', 'good');
    } else {
      sfx.bad();
    }
    this.fb = { chosen: btn, correct: correctBtn, ok, until: t + FEEDBACK_MS };
    this.finishTrial(t, ok, false);
  }

  private timeout(t: number): void {
    this.late++;
    this.ctx.sfx.bad();
    this.toastAtBall(this.ctx.texts.feedback.late, 'bad');
    this.fb = { chosen: -1, correct: BUTTON_DIRS.indexOf(this.dir), ok: false, until: t + FEEDBACK_MS + 250 };
    this.finishTrial(t, false, true);
  }

  private finishTrial(t: number, ok: boolean, late: boolean): void {
    this.trials.push({ level: this.level, ok, late });
    if (!this.demo) this.stair.update(ok);
    this.idx++;
    this.updateHud();
    this.phase = 'wait';
    const last = this.idx >= this.total;
    this.nextAt = t + (last ? END_DELAY_MS : this.demo ? DEMO_GAP_MS : this.ctx.rng.range(GAP_MS[0], GAP_MS[1]));
  }

  private toastAtBall(text: string, kind: ToastKind): void {
    const { w, u } = this.ctx.stage;
    const L = this.layout();
    // ✓ groß und deutlich, Text etwas kleiner
    const size = text.length === 1 ? clamp(u * 7, 26, 52) : clamp(u * 5, 18, 40);
    const half = Math.min(w / 2, text.length * size * 0.3 + 8);
    this.ctx.hud.toast(text, kind, {
      x: clamp(this.ball.x, half, w - half),
      y: Math.max(size * 1.1, this.ball.y - L.r - size * 0.7),
      ms: 750,
      size,
    });
  }

  private updateHud(): void {
    const { hud, texts } = this.ctx;
    hud.setProgress(this.idx / this.total);
    hud.setScore(this.correct);
    hud.setLabel(`${texts.feedback.level} ${Math.floor(this.level + 1e-9)}`);
  }

  // -------------------------------------------------------------------------
  // Geister-Hand

  /** Autoplay (Tests): meist richtig, manchmal falsch, selten gar nicht */
  private autoPlan(): void {
    const { ghost, rng } = this.ctx;
    ghost.clear();
    if (rng.chance(0.05)) return;
    const L = this.layout();
    const correctBtn = BUTTON_DIRS.indexOf(this.dir);
    const pOk = clamp(0.97 - 0.035 * (this.stair.level - 1), 0.5, 0.97);
    const btn = rng.chance(pOk) ? correctBtn : (correctBtn + 1 + rng.int(3)) % 4;
    const R = L.btns[btn];
    const move = rng.range(320, 460);
    const at = this.showMs + rng.range(200, 750);
    ghost.tap(R.x + R.w * rng.range(0.35, 0.65), R.y + R.h * rng.range(0.4, 0.65), { delay: Math.max(0, at - move), move });
    ghost.moveTo(L.rest.x, L.rest.y, { delay: 300, move: 450 });
  }

  /** Intro-Film: Hand tippt kurz nach dem C den richtigen Button und parkt dann wieder */
  private demoPlan(): void {
    const { ghost } = this.ctx;
    ghost.clear();
    const L = this.layout();
    const R = L.btns[BUTTON_DIRS.indexOf(this.dir)];
    const move = 480;
    ghost.tap(R.x + R.w / 2, R.y + R.h * 0.5, { delay: DEMO_SHOW_MS + 250 - move, move });
    ghost.moveTo(L.rest.x, L.rest.y, { delay: 420, move: 520 });
  }

  // -------------------------------------------------------------------------

  private end(): void {
    this.phase = 'done';
    this.endT = this.ctx.now();
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'level', value: DEMO_LEVEL, unit: 'level', better: 'higher' },
        secondary: [{ key: 'correct', value: this.correct, unit: 'count' }],
        score: this.points,
        level: MIN_LEVEL,
      });
      return;
    }
    this.ctx.sfx.done();
    const n = this.trials.length;
    const thr = this.stair.threshold();
    const acc = n ? (100 * this.correct) / n : 0;
    const wrong = n - this.correct - this.late;
    const manyLate = this.late >= Math.max(2, Math.ceil(n * 0.2));
    // Viele Auslasser sind meist der Grund für wenig Treffer → dann zuerst "schnell entscheiden"
    let tip = 'great';
    if (manyLate && this.late >= wrong) tip = 'decide';
    else if (acc < 60) tip = 'eyes';
    else if (manyLate) tip = 'decide';
    const maxLevel = this.trials.reduce((m, tr) => Math.max(m, tr.level), MIN_LEVEL);
    this.ctx.finish({
      primary: { key: 'level', value: Math.max(MIN_LEVEL, Math.round(thr)), unit: 'level', better: 'higher' },
      secondary: [
        { key: 'accuracy', value: Math.round(acc), unit: 'percent' },
        { key: 'maxLevel', value: Math.floor(maxLevel + 1e-9), unit: 'level' },
        { key: 'correct', value: this.correct, unit: 'count' },
      ],
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip,
    });
  }

  // -------------------------------------------------------------------------
  // Layout

  private layout(): Layout {
    const { w, h, u } = this.ctx.stage;
    const key = `${w}x${h}`;
    if (this.lay && this.lay.key === key) return this.lay;
    // Antwortleiste unten mit 4 großen Buttons
    const barH = clamp(0.2 * h, 88, 140);
    const barTop = h - barH;
    const pad = clamp(barH * 0.12, 10, 16);
    const bh = barH - 2 * pad;
    const gap = clamp(w * 0.016, 8, 16);
    const hs = clamp(u * 13, 48, 110); // Handgröße wie im Runner
    // Im Intro-Film rechts Platz für die parkende Hand lassen
    const reserve = this.demo ? hs * 0.8 : 0;
    let bw = Math.min((w - 2 * pad - reserve - 3 * gap) / 4, bh * 1.35, 170);
    bw = Math.max(bw, this.demo ? 56 : 72);
    bw = Math.min(bw, (w - 8 - 3 * gap) / 4);
    const groupW = 4 * bw + 3 * gap;
    let gx = (w - groupW) / 2;
    if (this.demo) gx = Math.max(4, Math.min(gx, w - pad - reserve - groupW));
    const btns = [0, 1, 2, 3].map((i) => ({ x: gx + i * (bw + gap), y: barTop + pad, w: bw, h: bh }));
    // Bewegungsfeld darüber (im Intro-Film unter der Bildunterschrift oben)
    const r = Math.max(26, 7 * u);
    const m = Math.max(6, u * 1.2);
    const top = this.demo ? captionBottom(this.ctx.stage) + 4 : 0;
    const bounds = span(m + r, w - m - r, top + m + r, barTop - m - r);
    const rest = { x: Math.min(w - hs * 0.6, gx + groupW + hs * 0.3), y: barTop + pad + bh * 0.2 };
    this.lay = { key, barTop, gap, btns, r, d: clamp(4.2 * u, 34, 40), bounds, rest };
    return this.lay;
  }

  resize(): void {
    const old = this.lay;
    this.lay = null;
    const L = this.layout();
    if (!old) return;
    // Ball relativ im Bewegungsfeld mitnehmen
    const b = this.ball;
    const fx = (b.x - old.bounds.minX) / Math.max(1, old.bounds.maxX - old.bounds.minX);
    const fy = (b.y - old.bounds.minY) / Math.max(1, old.bounds.maxY - old.bounds.minY);
    b.x = lerp(L.bounds.minX, L.bounds.maxX, clamp(fx, 0, 1));
    b.y = lerp(L.bounds.minY, L.bounds.maxY, clamp(fy, 0, 1));
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, now: number): void {
    const { w, h, dpr } = this.ctx.stage;
    const L = this.layout();
    const t = Math.min(now, this.endT);
    background(g, w, h, dpr);
    // Antwortleiste
    g.fillStyle = 'rgba(3,8,18,0.4)';
    g.fillRect(0, L.barTop, w, h - L.barTop);
    g.fillStyle = 'rgba(255,255,255,0.09)';
    g.fillRect(0, Math.round(L.barTop), w, 1);
    // Ball mit Sehzeichen
    const b = this.ball;
    glow(g, b.x, b.y, L.r, BALL, 0.45);
    circle(g, b.x, b.y, L.r, BALL);
    if (this.phase === 'show') landoltC(g, b.x, b.y, L.d, this.dir, INK);
    this.drawButtons(g, L, t);
  }

  private drawButtons(g: CanvasRenderingContext2D, L: Layout, t: number): void {
    const fb = this.fb && t < this.fb.until ? this.fb : null;
    const active = this.phase === 'answer';
    for (let i = 0; i < L.btns.length; i++) {
      const R = L.btns[i];
      let state: ButtonState = active ? 'normal' : 'disabled';
      let badge: 'ok' | 'bad' | null = null;
      let outline = false;
      if (fb) {
        if (i === fb.chosen) {
          state = fb.ok ? 'good' : 'bad';
          badge = fb.ok ? 'ok' : 'bad';
        } else if (i === fb.correct) {
          state = 'normal';
          outline = true;
          badge = 'ok';
        }
      }
      button(g, R, state);
      if (outline) {
        g.save();
        rrPath(g, R.x - 2.5, R.y - 2.5, R.w + 5, R.h + 5, Math.min(R.w, R.h) * 0.22 + 2.5);
        g.strokeStyle = C.good;
        g.lineWidth = 3.5;
        g.stroke();
        g.restore();
      }
      const ink = state === 'disabled' ? 'rgba(232,238,247,0.34)' : state === 'good' || state === 'bad' ? '#FFFFFF' : C.fg;
      const s = Math.min(R.w, R.h);
      landoltC(g, R.x + R.w / 2, R.y + R.h / 2, s * 0.5, BUTTON_DIRS[i], ink);
      // Zusätzlich zur Farbe ein Symbol (✓ / ✗) – auch bei Rot-Grün-Schwäche eindeutig
      if (badge) {
        const rad = clamp(s * 0.14, 9, 15);
        drawBadge(g, R.x + R.w - rad - 5, R.y + rad + 5, rad, badge);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Hilfsfunktionen

/** Unterkante der Bildunterschrift oben im Intro-Film (gleiche Formel wie im Runner) */
function captionBottom(s: StageInfo): number {
  return s.h * 0.05 + clamp(s.u * 4.6, 14, 30) * 2.1;
}

function span(minX: number, maxX: number, minY: number, maxY: number): Bounds {
  if (maxX < minX) minX = maxX = (minX + maxX) / 2;
  if (maxY < minY) minY = maxY = (minY + maxY) / 2;
  return { minX, maxX, minY, maxY };
}

/** Spiegelt Position und Richtung an den Grenzen des Bewegungsfelds */
function bounce(o: { x: number; y: number; ang: number }, b: Bounds): void {
  if (o.x < b.minX || o.x > b.maxX) {
    const low = o.x < b.minX;
    const outward = low ? Math.cos(o.ang) < 0 : Math.cos(o.ang) > 0;
    o.x = clamp(outward ? 2 * (low ? b.minX : b.maxX) - o.x : o.x, b.minX, b.maxX);
    if (outward) o.ang = Math.PI - o.ang;
  }
  if (o.y < b.minY || o.y > b.maxY) {
    const low = o.y < b.minY;
    const outward = low ? Math.sin(o.ang) < 0 : Math.sin(o.ang) > 0;
    o.y = clamp(outward ? 2 * (low ? b.minY : b.maxY) - o.y : o.y, b.minY, b.maxY);
    if (outward) o.ang = -o.ang;
  }
}

/** Kleines weißes Abzeichen mit ✓ (grün) oder ✗ (rot) */
function drawBadge(g: CanvasRenderingContext2D, cx: number, cy: number, rad: number, kind: 'ok' | 'bad'): void {
  circle(g, cx, cy, rad, '#FFFFFF');
  g.save();
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.lineWidth = Math.max(2, rad * 0.3);
  g.strokeStyle = kind === 'ok' ? '#15803D' : '#B91C1C';
  g.beginPath();
  if (kind === 'ok') {
    g.moveTo(cx - rad * 0.45, cy + rad * 0.02);
    g.lineTo(cx - rad * 0.1, cy + rad * 0.38);
    g.lineTo(cx + rad * 0.48, cy - rad * 0.36);
  } else {
    const q = rad * 0.38;
    g.moveTo(cx - q, cy - q);
    g.lineTo(cx + q, cy + q);
    g.moveTo(cx + q, cy - q);
    g.lineTo(cx - q, cy + q);
  }
  g.stroke();
  g.restore();
}

export const scharfInBewegung: ExerciseDefinition = {
  id: 'scharf-in-bewegung',
  category: 'bewegung',
  minutes: 1,
  color: '#2E6DB4',
  icon:
    '<circle cx="29" cy="24" r="14" fill="none" stroke="currentColor" stroke-width="3.4"/><path d="M33.9 22.2A5.2 5.2 0 1 0 33.9 25.8" fill="none" stroke="currentColor" stroke-width="3.4"/><path d="M3 17h8M1 24h8M3 31h8" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new ScharfInBewegung(ctx),
};
