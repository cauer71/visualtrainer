/**
 * Gemeinsamer Kern der Blickfolge-Übungen („Liegende Acht“, „Wellenbahn“, „Sanfte Blickfolge“,
 * „Zickzack-Bahn“, „Dreiecksbahn“).
 *
 * Eine Kugel läuft mit gleichmäßigem Tempo auf einer festen Bahn (die Bahn liefert eine
 * `PursuitTrack`-Klasse). Die Originale („Infinity Pursuit“, „Sine Wave Pursuit“) verlangen nur
 * „schauen“ und messen nichts. Hier erzwingt eine Aufgabe das Folgen: Kurz erscheint in der Kugel
 * ein Landolt-Ring („C“); man meldet per großem Button unten, wohin seine Öffnung zeigt.
 *
 * - Die Kugel trägt das Zeichen, die Buttons liegen unten im Antwortstreifen (≥ 56 px hoch) –
 *   der Finger verdeckt nie die Bahn. Während der Anzeige sind die Buttons nicht hervorgehoben,
 *   damit sie den Blick nicht von der Kugel weglocken; wer früher antwortet, wird gewertet.
 * - Adaptiv (3-down/1-up → ≈ 79 % richtig): Mit der Stufe werden Tempo, Zeichen-Größe und
 *   Anzeigedauer strenger; die Hilfslinie der Bahn blendet aus. Bahnform und Tempo werden weich
 *   nachgeführt, Bewegung strikt mit dt (bildratenunabhängig).
 * - Ehrlich: Ob die Augen wirklich folgen, wird nicht gemessen – nur, ob das Zeichen erkannt wird.
 * - Nie nur Farbe: Rückmeldung mit ✓/✗-Abzeichen und Umriss; keine Blitze (das Zeichen erscheint
 *   einmal je Durchgang und bleibt stehen).
 */
import { background, button, type ButtonState, C, circle, glow, landoltC, type Rect, rrPath } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { approach } from './pursuit-logic';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, PointerInfo, StageInfo, ToastKind } from '../../core/types';
import {
  type Bounds,
  exposureFor,
  guideAlpha,
  pickDirection,
  PURSUIT_MAX_LEVEL,
  PURSUIT_MIN_LEVEL,
  type PursuitTrack,
  signSizeFor,
  span,
  targetRadiusFor,
} from './pursuit-logic';

const TRIALS = 20;
const QUICK_TRIALS = 3;
/** So lange sind die Buttons nach dem Zeichen aktiv */
const ANSWER_MS = 2500;
const FEEDBACK_MS = 750;
/** Pause nach einer Antwort bis zum nächsten Zeichen (zufällig) */
const GAP_MS: [number, number] = [1300, 2300];
const FIRST_MS: [number, number] = [1600, 2300];
const END_DELAY_MS = 900;
/** Zeichen erst zeigen, wenn die Kugel mit (fast) vollem Tempo läuft – nicht in der Umkehr */
const CRUISE_MIN = 0.85;
/**
 * Bahnen mit Knicken (`safeFor`): Zeichen nur auf geraden Stücken, mit Abstand zu jedem Knick.
 * Sicherheitsnetz: Fände sich auf sehr kleiner Bühne nie ein Fenster, erscheint es nach dieser
 * Wartezeit trotzdem (damit die Sitzung nicht hängt).
 */
const SAFE_WAIT_MAX_MS = 6000;
/** Faktor auf das Tempo für den Weg während der Anzeige (Tempo wird weich nachgeführt) */
const SAFE_SPEED_FACTOR = 1.15;
// Intro-Film: leichte Stufe, Zeichen länger sichtbar, feste Richtungen (rechts, oben, links)
const DEMO_SHOW_MS = 800;
const DEMO_DIRS = [0, 3, 2];
const DEMO_FIRST_MS = 2200;
const DEMO_GAP_MS = 2100;

const BALL = '#F8FAFC';
const INK = '#0F172A';

/** Antwort-Buttons in der Reihenfolge ← ↑ ↓ → (landoltC: 0 = rechts, 1 = unten, 2 = links, 3 = oben) */
const BUTTON_DIRS = [2, 3, 1, 0];

export interface PursuitOptions {
  track: PursuitTrack;
  /** Tempo in u/s je Stufe */
  speedFor(level: number): number;
  /** feste Stufe im Intro-Film */
  demoLevel: number;
}

interface Layout {
  key: string;
  barTop: number;
  gap: number;
  btns: Rect[];
  /** Bewegungsfeld des Kugelmittelpunkts */
  area: Bounds;
  /** Ruheplatz der Geister-Hand */
  rest: { x: number; y: number };
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

export class PursuitExercise implements Exercise {
  private readonly stair: Staircase;
  private readonly total: number;
  private readonly track: PursuitTrack;
  private phase: Phase = 'wait';
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
  private lay: Layout | null = null;
  private followCaption = true;
  /** weich nachgeführte Werte */
  private speedNow = 0;
  private signNow = 40;
  private outlineRef: readonly unknown[] | null = null;
  private outlinePath: Path2D | null = null;
  /** Zeitpunkt des Endes – danach steht die Rückmeldung still */
  private endT = Infinity;

  constructor(
    private readonly ctx: ExerciseContext,
    private readonly o: PursuitOptions,
  ) {
    this.track = o.track;
    this.stair = new Staircase({
      start: ctx.startLevel ?? PURSUIT_MIN_LEVEL,
      min: PURSUIT_MIN_LEVEL,
      max: PURSUIT_MAX_LEVEL,
      down: 3,
      up: 1,
    });
    this.total = ctx.mode === 'demo' ? DEMO_DIRS.length : ctx.quick ? QUICK_TRIALS : TRIALS;
  }

  private get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  private get level(): number {
    return this.demo ? this.o.demoLevel : this.stair.level;
  }

  start(t: number): void {
    const { rng, hud, ghost, texts, stage } = this.ctx;
    this.track.setLevel(this.level);
    const L = this.layout();
    this.track.begin(rng.next(), this.demo || rng.chance(0.5) ? 1 : -1);
    this.speedNow = this.o.speedFor(this.level);
    this.signNow = signSizeFor(this.level, stage.u);
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
    const { u } = this.ctx.stage;
    this.speedNow = approach(this.speedNow, this.o.speedFor(this.level), dt, 0.6);
    this.signNow = approach(this.signNow, signSizeFor(this.level, u), dt, 0.4);
    this.track.step(dt, this.speedNow * u);
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
        if (this.track.cruise() >= CRUISE_MIN && (this.signWindowOpen() || t - this.nextAt >= SAFE_WAIT_MAX_MS)) this.show(t);
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
  // Durchgänge

  /** Bahn mit Knicken: Ist jetzt ein gerades Stück mit genug Platz vor und nach dem Zeichen? */
  private signWindowOpen(): boolean {
    const safe = this.track.safeFor;
    if (!safe) return true;
    const ms = this.demo ? DEMO_SHOW_MS : exposureFor(this.stair.level);
    const margin = targetRadiusFor(this.signNow) * 1.3;
    return safe.call(this.track, (ms / 1000) * SAFE_SPEED_FACTOR, margin);
  }

  private show(t: number): void {
    this.dir = this.demo ? DEMO_DIRS[this.idx % DEMO_DIRS.length] : pickDirection(this.ctx.rng, this.dirs);
    if (!this.demo) this.dirs.push(this.dir);
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

  /** Tastatur: Pfeiltasten wählen die Öffnungsrichtung. */
  keyDown(key: string, t: number): void {
    const dir = key === 'ArrowRight' ? 0 : key === 'ArrowDown' ? 1 : key === 'ArrowLeft' ? 2 : key === 'ArrowUp' ? 3 : -1;
    if (dir < 0) return;
    if ((this.phase !== 'show' && this.phase !== 'answer') || t < this.onset) return;
    const btn = BUTTON_DIRS.indexOf(dir);
    if (btn >= 0) this.respond(btn, t);
  }

  pointerDown(p: PointerInfo): void {
    // Außerhalb der Antwortphase zählen die Buttons nicht; nur die erste Antwort je Zeichen wird gewertet
    // (nach respond() ist die Phase 'wait'). Wer schon während der Anzeige antwortet, wird gewertet.
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
      this.toastAtTarget('✓', 'good');
    } else {
      sfx.bad();
    }
    this.fb = { chosen: btn, correct: correctBtn, ok, until: t + FEEDBACK_MS };
    this.finishTrial(t, ok, false);
  }

  private timeout(t: number): void {
    this.late++;
    this.ctx.sfx.bad();
    this.toastAtTarget(this.ctx.texts.feedback.late, 'bad');
    this.fb = { chosen: -1, correct: BUTTON_DIRS.indexOf(this.dir), ok: false, until: t + FEEDBACK_MS + 250 };
    this.finishTrial(t, false, true);
  }

  private finishTrial(t: number, ok: boolean, late: boolean): void {
    this.trials.push({ level: this.level, ok, late });
    if (!this.demo) {
      this.stair.update(ok);
      this.track.setLevel(this.stair.level);
    }
    this.idx++;
    this.updateHud();
    this.phase = 'wait';
    const last = this.idx >= this.total;
    this.nextAt = t + (last ? END_DELAY_MS : this.demo ? DEMO_GAP_MS : this.ctx.rng.range(GAP_MS[0], GAP_MS[1]));
  }

  private toastAtTarget(text: string, kind: ToastKind): void {
    const { w, u } = this.ctx.stage;
    const r = targetRadiusFor(this.signNow);
    const size = text.length === 1 ? clamp(u * 7, 26, 52) : clamp(u * 5, 18, 40);
    const half = Math.min(w / 2, text.length * size * 0.3 + 8);
    const p = this.track.pos;
    this.ctx.hud.toast(text, kind, {
      x: clamp(p.x, half, w - half),
      y: Math.max(size * 1.1, p.y - r - size * 0.7),
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

  /** Intro-Film: Hand tippt kurz nach dem Zeichen den richtigen Button und parkt dann wieder */
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
        primary: { key: 'level', value: this.o.demoLevel, unit: 'level', better: 'higher' },
        secondary: [{ key: 'correct', value: this.correct, unit: 'count' }],
        score: this.points,
        level: PURSUIT_MIN_LEVEL,
      });
      return;
    }
    this.ctx.sfx.done();
    const n = this.trials.length;
    const thr = this.stair.threshold();
    const acc = n ? (100 * this.correct) / n : 0;
    const wrong = n - this.correct - this.late;
    const manyLate = this.late >= Math.max(2, Math.ceil(n * 0.2));
    // Viele Auslasser sind meist der Grund für wenig Treffer → dann zuerst „schnell entscheiden“
    let tip = 'great';
    if (manyLate && this.late >= wrong) tip = 'decide';
    else if (acc < 60) tip = 'eyes';
    else if (manyLate) tip = 'decide';
    const maxLevel = this.trials.reduce((m, tr) => Math.max(m, tr.level), PURSUIT_MIN_LEVEL);
    this.ctx.finish({
      primary: { key: 'level', value: Math.max(PURSUIT_MIN_LEVEL, Math.round(thr)), unit: 'level', better: 'higher' },
      secondary: [
        { key: 'accuracy', value: Math.round(acc), unit: 'percent' },
        { key: 'maxLevel', value: Math.floor(maxLevel + 1e-9), unit: 'level' },
        { key: 'correct', value: this.correct, unit: 'count' },
      ],
      score: this.points,
      level: nextStartLevel(thr, PURSUIT_MIN_LEVEL, PURSUIT_MAX_LEVEL),
      tip,
    });
  }

  // -------------------------------------------------------------------------
  // Layout

  private layout(): Layout {
    const { w, h, u } = this.ctx.stage;
    const key = `${w}x${h}`;
    if (this.lay && this.lay.key === key) return this.lay;
    // Antwortleiste unten mit 4 großen Buttons (Höhe ≥ 68 px, Breite ≥ 56 px)
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
    const rMax = targetRadiusFor(signSizeFor(PURSUIT_MIN_LEVEL, u));
    const m = Math.max(6, u * 1.2);
    const top = this.demo ? captionBottom(this.ctx.stage) + 4 : 0;
    const area = span(m + rMax, w - m - rMax, top + m + rMax, barTop - m - rMax);
    const rest = { x: Math.min(w - hs * 0.6, gx + groupW + hs * 0.3), y: barTop + pad + bh * 0.2 };
    this.lay = { key, barTop, gap, btns, area, rest };
    this.track.layout(area, w, u);
    return this.lay;
  }

  resize(): void {
    this.lay = null;
    this.layout();
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
    this.drawGuide(g);
    // Kugel mit Zeichen – gleichmäßig hell, kein Pulsieren
    const p = this.track.pos;
    const r = targetRadiusFor(this.signNow);
    glow(g, p.x, p.y, r, BALL, 0.45);
    circle(g, p.x, p.y, r, BALL);
    if (this.phase === 'show') landoltC(g, p.x, p.y, this.signNow, this.dir, INK);
    this.drawButtons(g, L, t);
  }

  /** Dünne Hilfslinie der Bahn – auf leichten Stufen sichtbar, später ausgeblendet */
  private drawGuide(g: CanvasRenderingContext2D): void {
    const a = guideAlpha(this.level);
    if (a <= 0.004) return;
    const pts = this.track.outline();
    if (pts.length < 2) return;
    if (this.outlineRef !== pts || !this.outlinePath) {
      const path = new Path2D();
      path.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) path.lineTo(pts[i].x, pts[i].y);
      this.outlinePath = path;
      this.outlineRef = pts;
    }
    g.save();
    g.globalAlpha = a / 0.2;
    g.strokeStyle = 'rgba(232,238,247,0.2)';
    g.lineWidth = 3;
    g.lineJoin = 'round';
    g.lineCap = 'round';
    g.stroke(this.outlinePath);
    g.restore();
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
export function captionBottom(s: StageInfo): number {
  return s.h * 0.05 + clamp(s.u * 4.6, 14, 30) * 2.1;
}

/** Kleines weißes Abzeichen mit ✓ (grün) oder ✗ (rot) */
export function drawBadge(g: CanvasRenderingContext2D, cx: number, cy: number, rad: number, kind: 'ok' | 'bad'): void {
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
