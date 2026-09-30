/**
 * Gemeinsamer Rahmen für Übungen mit Zeichenaufgabe („Ausweichziel“, „Sprungziel“).
 *
 * Ein Ziel (helle Kugel) bewegt sich; zu einem Zeitpunkt, den die Übung bestimmt, erscheint in der
 * Kugel kurz ein Landolt-Ring („C“). Man meldet per großem Button unten (≥ 56 px), wohin seine
 * Öffnung zeigt. Die Buttons liegen im Antwortstreifen unten – der Finger verdeckt nie das Ziel.
 *
 * - Adaptiv (3-down/1-up → ≈ 79 % richtig), Stufe 1–20, höher = schwerer.
 * - Ehrlich: Ob die Augen wirklich folgen, wird nicht gemessen – nur, ob das Zeichen erkannt wird.
 * - Nie nur Farbe: Rückmeldung mit ✓/✗-Abzeichen und Umriss; keine Blitze.
 * - Unterklassen liefern Bewegung und Zeichnung der Welt und rufen `beginSign(t)`, wenn das Zeichen
 *   erscheinen soll; den Rest (Antwort, Wertung, Treppe, Ergebnis, Intro-Film, Autoplay) macht die Basis.
 */
import { background, button, type ButtonState, C, circle, landoltC, type Rect, rrPath } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, PointerInfo, StageInfo, ToastKind } from '../../core/types';

export const SIGN_MIN_LEVEL = 1;
export const SIGN_MAX_LEVEL = 20;

/** So lange sind die Buttons nach dem Zeichen aktiv */
const ANSWER_MS = 2500;
const FEEDBACK_MS = 750;
const END_DELAY_MS = 900;
const DEMO_SHOW_MS = 900;
const DEMO_DIRS = [0, 3, 2];

export const BALL = '#F8FAFC';
export const INK = '#0F172A';

/** Antwort-Buttons in der Reihenfolge ← ↑ ↓ → (landoltC: 0 = rechts, 1 = unten, 2 = links, 3 = oben) */
export const BUTTON_DIRS = [2, 3, 1, 0];

/** Durchmesser des Landolt-Rings in px – wird mit der Stufe kleiner (nie unter 30 px) */
export function signSizeFor(level: number, u: number): number {
  return clamp(u * (6 - 0.14 * (level - 1)), 30, 56);
}

/** Radius der Kugel, in der das Zeichen erscheint */
export function ballRadiusFor(signSize: number): number {
  return signSize * 0.78;
}

/** Zufällige Richtung 0..3, aber nie dreimal hintereinander dieselbe */
export function nextDirection(pick: () => number, history: readonly number[]): number {
  let d = Math.floor(pick() * 4) % 4;
  const n = history.length;
  if (n >= 2 && history[n - 1] === d && history[n - 2] === d) d = (d + 1 + (Math.floor(pick() * 3) % 3)) % 4;
  return d;
}

/** Richtung (0..3) zur Pfeiltaste, sonst −1 */
export function dirFromKey(key: string): number {
  return key === 'ArrowRight' ? 0 : key === 'ArrowDown' ? 1 : key === 'ArrowLeft' ? 2 : key === 'ArrowUp' ? 3 : -1;
}

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

/** Bewegungsfeld und Antwortleiste (für Tests und Unterklassen) */
export interface BarLayout {
  key: string;
  barTop: number;
  gap: number;
  btns: Rect[];
  /** Bereich oberhalb der Leiste: [minX, maxX, minY, maxY] für den Kugelrand */
  world: { x0: number; x1: number; y0: number; y1: number };
  /** Ruheplatz der Geister-Hand */
  rest: { x: number; y: number };
}

/** Antwortleiste unten mit 4 großen Buttons (Höhe ≥ 68 px, Breite ≥ 56 px) */
export function barLayout(stage: StageInfo, demo: boolean): BarLayout {
  const { w, h, u } = stage;
  const barH = clamp(0.2 * h, 88, 140);
  const barTop = h - barH;
  const pad = clamp(barH * 0.12, 10, 16);
  const bh = barH - 2 * pad;
  const gap = clamp(w * 0.016, 8, 16);
  const hs = clamp(u * 13, 48, 110); // Handgröße wie im Runner
  // Im Intro-Film rechts Platz für die parkende Hand lassen
  const reserve = demo ? hs * 0.8 : 0;
  let bw = Math.min((w - 2 * pad - reserve - 3 * gap) / 4, bh * 1.35, 170);
  bw = Math.max(bw, demo ? 56 : 72);
  bw = Math.min(bw, (w - 8 - 3 * gap) / 4);
  const groupW = 4 * bw + 3 * gap;
  let gx = (w - groupW) / 2;
  if (demo) gx = Math.max(4, Math.min(gx, w - pad - reserve - groupW));
  const btns = [0, 1, 2, 3].map((i) => ({ x: gx + i * (bw + gap), y: barTop + pad, w: bw, h: bh }));
  const top = demo ? captionBottom(stage) + 4 : 0;
  const rest = { x: Math.min(w - hs * 0.6, gx + groupW + hs * 0.3), y: barTop + pad + bh * 0.2 };
  return { key: `${w}x${h}:${demo ? 1 : 0}`, barTop, gap, btns, world: { x0: 0, x1: w, y0: top, y1: barTop }, rest };
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

export interface SignConfig {
  /** Durchgänge im Spielmodus */
  trials: number;
  /** Durchgänge im Schnelltest (?quick=1) */
  quickTrials: number;
  /** Durchgänge im Intro-Film */
  demoTrials: number;
  /** feste Stufe im Intro-Film */
  demoLevel: number;
  /** Anzeigedauer des Zeichens in ms je Stufe */
  exposureFor(level: number): number;
}

export abstract class SignExercise implements Exercise {
  protected readonly stair: Staircase;
  protected readonly total: number;
  protected phase: Phase = 'wait';
  protected idx = 0;
  /** frühester Zeitpunkt für das Ende, nachdem alle Durchgänge gespielt sind */
  protected nextAt = 0;
  private onset = 0;
  private showMs = 400;
  private answerFrom = 0;
  protected dir = 0;
  private dirs: number[] = [];
  private trials: TrialRec[] = [];
  private correct = 0;
  private late = 0;
  private points = 0;
  private fb: Feedback | null = null;
  private lay: BarLayout | null = null;
  private followCaption = true;
  /** Zeitpunkt des Endes – danach steht die Rückmeldung still */
  private endT = Infinity;

  constructor(
    protected readonly ctx: ExerciseContext,
    protected readonly cfg: SignConfig,
  ) {
    this.stair = new Staircase({
      start: ctx.startLevel ?? SIGN_MIN_LEVEL,
      min: SIGN_MIN_LEVEL,
      max: SIGN_MAX_LEVEL,
      down: 3,
      up: 1,
    });
    this.total = ctx.mode === 'demo' ? cfg.demoTrials : ctx.quick ? cfg.quickTrials : cfg.trials;
  }

  // ---- von Unterklassen -------------------------------------------------

  /** Bühne bereit: Welt aufbauen (Layout steht, `this.layout()` ist nutzbar) */
  protected abstract worldStart(t: number): void;
  /** Pro Frame: Welt bewegen und ggf. `beginSign(t)` rufen */
  protected abstract worldUpdate(dt: number, t: number): void;
  /** Welt zeichnen (Hintergrund und Leiste sind schon gezeichnet) */
  protected abstract worldRender(g: CanvasRenderingContext2D, t: number): void;
  /** Mittelpunkt der Kugel, in der das Zeichen erscheint */
  protected abstract signCenter(): { x: number; y: number };
  /** Durchmesser des Zeichens (px) */
  protected abstract signDiameter(): number;
  /** Nach einem Durchgang: nächstes Ereignis planen (nicht nach dem letzten Durchgang) */
  protected abstract onTrialDone(t: number): void;
  /** Bewegungsfeld der Welt neu berechnen (Bühne hat sich geändert) */
  protected abstract onLayout(L: BarLayout): void;
  /** Hinweistext im Intro-Film beim Start */
  protected get followKey(): string {
    return 'follow';
  }

  // ---- Zustand für Unterklassen ----------------------------------------

  protected get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  /** Stufe, nach der die Welt gerade eingestellt wird */
  protected get level(): number {
    return this.demo ? this.cfg.demoLevel : this.stair.level;
  }

  /** alle Durchgänge gespielt – keine neuen Ereignisse mehr planen */
  protected get finished(): boolean {
    return this.idx >= this.total;
  }

  /** Zeichen gerade sichtbar oder Antwort offen */
  protected get busy(): boolean {
    return this.phase === 'show' || this.phase === 'answer';
  }

  protected layout(): BarLayout {
    const key = `${this.ctx.stage.w}x${this.ctx.stage.h}:${this.demo ? 1 : 0}`;
    if (this.lay && this.lay.key === key) return this.lay;
    this.lay = barLayout(this.ctx.stage, this.demo);
    this.onLayout(this.lay);
    return this.lay;
  }

  // ---- Exercise --------------------------------------------------------

  start(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    const L = this.layout();
    this.phase = 'wait';
    this.worldStart(t);
    this.updateHud();
    if (this.demo) {
      hud.caption(texts.captions[this.followKey] ?? texts.captions.follow, 'top');
      ghost.moveTo(L.rest.x, L.rest.y, { move: 0 });
    }
  }

  update(dt: number, t: number): void {
    if (this.phase === 'done') return;
    this.worldUpdate(dt, t);
    if (this.phase === 'wait') {
      if (this.demo && !this.followCaption && (!this.fb || t >= this.fb.until)) {
        this.ctx.hud.caption(this.ctx.texts.captions[this.followKey] ?? this.ctx.texts.captions.follow, 'top');
        this.followCaption = true;
      }
      if (this.finished && t >= this.nextAt) this.end();
    } else if (this.phase === 'show') {
      if (t - this.onset >= this.showMs) {
        this.phase = 'answer';
        this.answerFrom = t;
      }
    } else if (this.phase === 'answer' && t - this.answerFrom >= ANSWER_MS) {
      this.timeout(t);
    }
  }

  /** Zeichen erscheint jetzt (t = Zeit des Frames) – nur im Zustand „wait“ wirksam */
  protected beginSign(t: number): void {
    if (this.phase !== 'wait' || this.finished) return;
    this.dir = this.demo ? DEMO_DIRS[this.idx % DEMO_DIRS.length] : nextDirection(() => this.ctx.rng.next(), this.dirs);
    if (!this.demo) this.dirs.push(this.dir);
    this.onset = t;
    this.showMs = this.demo ? DEMO_SHOW_MS : this.cfg.exposureFor(this.stair.level);
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
    const dir = dirFromKey(key);
    if (dir < 0) return;
    if (!this.busy || t < this.onset) return;
    const btn = BUTTON_DIRS.indexOf(dir);
    if (btn >= 0) this.respond(btn, t);
  }

  pointerDown(p: PointerInfo): void {
    // Außerhalb der Antwortphase zählen die Buttons nicht; nur die erste Antwort je Zeichen wird gewertet
    // (nach respond() ist die Phase 'wait'). Wer schon während der Anzeige antwortet, wird gewertet.
    if (!this.busy || p.t < this.onset) return;
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

  resize(): void {
    this.lay = null;
    this.layout();
  }

  // ---- Durchgänge ------------------------------------------------------

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
    if (!this.demo) this.stair.update(ok);
    this.idx++;
    this.updateHud();
    this.phase = 'wait';
    if (this.finished) this.nextAt = t + END_DELAY_MS;
    else this.onTrialDone(t);
  }

  private toastAtTarget(text: string, kind: ToastKind): void {
    const { w, u } = this.ctx.stage;
    const r = ballRadiusFor(this.signDiameter());
    const size = text.length === 1 ? clamp(u * 7, 26, 52) : clamp(u * 5, 18, 40);
    const half = Math.min(w / 2, text.length * size * 0.3 + 8);
    const p = this.signCenter();
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

  // ---- Geister-Hand ----------------------------------------------------

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

  // ---- Ende ------------------------------------------------------------

  private end(): void {
    this.phase = 'done';
    this.endT = this.ctx.now();
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'level', value: this.cfg.demoLevel, unit: 'level', better: 'higher' },
        secondary: [{ key: 'correct', value: this.correct, unit: 'count' }],
        score: this.points,
        level: SIGN_MIN_LEVEL,
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
    const maxLevel = this.trials.reduce((m, tr) => Math.max(m, tr.level), SIGN_MIN_LEVEL);
    this.ctx.finish({
      primary: { key: 'level', value: Math.max(SIGN_MIN_LEVEL, Math.round(thr)), unit: 'level', better: 'higher' },
      secondary: [
        { key: 'accuracy', value: Math.round(acc), unit: 'percent' },
        { key: 'maxLevel', value: Math.floor(maxLevel + 1e-9), unit: 'level' },
        { key: 'correct', value: this.correct, unit: 'count' },
      ],
      score: this.points,
      level: nextStartLevel(thr, SIGN_MIN_LEVEL, SIGN_MAX_LEVEL),
      tip,
    });
  }

  // ---- Zeichnen --------------------------------------------------------

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
    this.worldRender(g, now);
    if (this.phase === 'show') {
      const p = this.signCenter();
      landoltC(g, p.x, p.y, this.signDiameter(), this.dir, INK);
    }
    this.drawButtons(g, L, t);
  }

  private drawButtons(g: CanvasRenderingContext2D, L: BarLayout, t: number): void {
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
