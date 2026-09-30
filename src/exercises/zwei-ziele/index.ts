/**
 * Zwei Ziele – links und rechts bemerken, wo etwas stockt, während der Blick in der Mitte bleibt.
 *
 * Vorbild: „Geteilte Aufmerksamkeit / Split-Screen Tracking“ (Katalog 408). Im Original pendeln zwei
 * Leuchtpunkte, es gibt keine Aufgabe und keine Messung. Hier:
 * - Ein Fixierkreuz in der Mitte; in jeder Bühnenhälfte schweben 1 (ab Stufe 8: 2) Kugeln in weichen
 *   Kurven, alle mit exakt gleichem, konstantem Tempo.
 * - Gelegentlich stockt EINE Kugel kurz (sie bremst weich bis zum Halt und läuft wieder an). Wer das
 *   bemerkt, tippt auf die betroffene Seite (links/rechts – die ganze Bühnenhälfte und der große
 *   Button unten zählen). Es gibt keinen Schalter, der das Ereignis verrät: Die Buttons sehen immer
 *   gleich aus.
 * - Adaptiv (3-down/1-up → ≈ 79 % richtig): Tempo, Zielzahl 1 → 2, kürzere Stockung (1100 → 380 ms).
 * - Ehrlich: Ob der Blick wirklich in der Mitte bleibt, wird ohne Eye-Tracker nicht gemessen. Die
 *   Übung stellt nur die Aufgabe, die sich am besten mit ruhigem Blick lösen lässt. Tippen ohne
 *   Stockung zählt als „Fehlalarm“ (Zusatzwert), damit Raten nichts bringt.
 * - Bahnen spiegelbildlich um die Mitte, seitlich höchstens 30 % der Bühnenbreite (Querformat).
 * - Keine Blitze, gleichmäßig helle Kugeln, Rückmeldung mit ✓/✗ und gestrichelter Ring (nicht nur Farbe).
 */
import { background, button, type ButtonState, C, circle, font, glow, type Rect, ring, rrPath, text } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, median } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, Metric, PointerInfo, ToastKind } from '../../core/types';
import { captionBottom, drawBadge } from '../_shared/pursuit';
import type { Bounds } from '../_shared/pursuit-logic';
import {
  answerWindowMs,
  deviationFactor,
  deviationMsFor,
  type Fields,
  fieldsFor,
  pickSide,
  separate,
  speedFor,
  targetsFor,
  Wanderer,
  ZZ_MAX_LEVEL,
  ZZ_MIN_LEVEL,
} from './logic';
import { de, it } from './texts';

const TRIALS = 16;
const QUICK_TRIALS = 3;
const FEEDBACK_MS = 800;
/** Pause zwischen zwei Stockungen (zufällig), ab Ende der Antwort */
const GAP_MS: [number, number] = [2200, 3600];
const FIRST_MS: [number, number] = [2400, 3400];
const END_DELAY_MS = 900;
/** Tipps kurz nach einer Antwort (zweiter Finger, Doppel-Tap) sind kein Fehlalarm */
const DOUBLE_TAP_MS = 450;
const FADE_S = 0.5;
// Intro-Film: leichte Stufe, lange Stockung, feste Seiten (links, rechts, links)
const DEMO_LEVEL = 3;
const DEMO_DEV_MS = 1300;
const DEMO_SIDES = [0, 1, 0];
const DEMO_FIRST_MS = 2600;
const DEMO_GAP_MS = 2200;
const DEMO_TAP_MS = 1000;

const BALL = '#F8FAFC';
const CROSS = '#FFF4C2';

interface Slot {
  w: Wanderer;
  /** Sichtbarkeit 0..1 (Ein-/Ausblenden, wenn sich die Zielzahl ändert) */
  alpha: number;
  /** soll sichtbar sein (Zielzahl der Stufe) */
  want: boolean;
  /** wird überhaupt simuliert */
  on: boolean;
}

interface Ev {
  side: number;
  slot: number;
  onset: number;
  dev: number;
  answered: boolean;
}

interface Feedback {
  chosen: number;
  correct: number;
  ok: boolean;
  until: number;
  /** Ziel, das gestockt hat (für den gestrichelten Ring) */
  ringSide: number;
  ringSlot: number;
}

interface TrialRec {
  level: number;
  ok: boolean;
  late: boolean;
}

interface Layout {
  key: string;
  f: Fields;
  barTop: number;
  btns: [Rect, Rect];
  r: number;
  rest: { x: number; y: number };
}

type Phase = 'wait' | 'event' | 'done';

class ZweiZiele implements Exercise {
  private readonly stair: Staircase;
  private readonly total: number;
  private phase: Phase = 'wait';
  private t0 = 0;
  private nextAt = 0;
  private ev: Ev | null = null;
  private slots: [Slot[], Slot[]] = [[], []];
  private sides: number[] = [];
  private idx = 0;
  private trials: TrialRec[] = [];
  private correct = 0;
  private late = 0;
  private falseAlarms = 0;
  private rts: number[] = [];
  private points = 0;
  private lastAnswerT = -1e9;
  private fb: Feedback | null = null;
  private lay: Layout | null = null;
  private fixCaption = true;
  private endT = Infinity;

  constructor(private readonly ctx: ExerciseContext) {
    this.stair = new Staircase({ start: ctx.startLevel ?? ZZ_MIN_LEVEL, min: ZZ_MIN_LEVEL, max: ZZ_MAX_LEVEL, down: 3, up: 1 });
    this.total = ctx.mode === 'demo' ? DEMO_SIDES.length : ctx.quick ? QUICK_TRIALS : TRIALS;
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
    for (const side of [0, 1]) {
      for (let i = 0; i < 2; i++) {
        const want = i < targetsFor(this.level);
        this.slots[side].push({ w: this.spawn(side, i), alpha: want ? 1 : 0, want, on: want });
      }
    }
    this.nextAt = t + (this.demo ? DEMO_FIRST_MS : rng.range(FIRST_MS[0], FIRST_MS[1]));
    this.updateHud();
    if (this.demo) {
      hud.caption(texts.captions.fix, 'top');
      ghost.moveTo(L.rest.x, L.rest.y, { move: 0 });
    }
  }

  /** Neue Kugel im Feld der Seite, nicht zu nah an einer schon vorhandenen */
  private spawn(side: number, slot: number): Wanderer {
    const { rng } = this.ctx;
    const B = this.field(side);
    const r = this.layout().r;
    let x = 0;
    let y = 0;
    for (let k = 0; k < 24; k++) {
      x = rng.range(B.minX, B.maxX);
      y = rng.range(B.minY, B.maxY);
      const other = this.slots[side].find((s, i) => i !== slot && s.on);
      if (!other || Math.hypot(other.w.x - x, other.w.y - y) > 5 * r) break;
    }
    return new Wanderer(x, y, rng.range(0, Math.PI * 2), rng.range(0, Math.PI * 2), rng.range(0, Math.PI * 2));
  }

  private field(side: number): Bounds {
    const f = this.layout().f;
    return side === 0 ? f.left : f.right;
  }

  update(dt: number, t: number): void {
    if (this.phase === 'done') return;
    const { u } = this.ctx.stage;
    const L = this.layout();
    const speed = speedFor(this.level) * u;
    const s = (t - this.t0) / 1000;
    const zone = 2 * L.r;
    for (let side = 0; side < 2; side++) {
      const B = this.field(side);
      const list = this.slots[side];
      for (let i = 0; i < list.length; i++) {
        const sl = list[i];
        // Ein-/Ausblenden bei geänderter Zielzahl
        if (sl.want && !sl.on) {
          sl.on = true;
          sl.w = this.spawn(side, i);
          sl.alpha = this.ctx.reducedMotion ? 1 : 0;
        }
        if (!sl.on) continue;
        const target = sl.want ? 1 : 0;
        sl.alpha = this.ctx.reducedMotion ? target : clamp(sl.alpha + (target > sl.alpha ? 1 : -1) * (dt / FADE_S), 0, 1);
        if (!sl.want && sl.alpha <= 0) {
          sl.on = false;
          continue;
        }
        const ev = this.ev;
        const factor = ev && ev.side === side && ev.slot === i ? deviationFactor((t - ev.onset) / ev.dev) : 1;
        sl.w.step(dt, speed, factor, s, B, zone);
      }
      if (list[0].on && list[1].on) separate(list[0].w, list[1].w, 2.6 * L.r, B, dt);
    }
    const ev = this.ev;
    if (ev && t - ev.onset >= ev.dev) {
      // Stockung vorbei; nach der Antwortfrist zählt „keine Antwort“
      if (ev.answered) this.ev = null;
    }
    if (this.phase === 'wait') {
      if (this.demo && !this.fixCaption && (!this.fb || t >= this.fb.until)) {
        this.ctx.hud.caption(this.ctx.texts.captions.fix, 'top');
        this.fixCaption = true;
      }
      if (t >= this.nextAt && !this.ev) {
        // Zielzahl der Stufe erst zwischen den Durchgängen anpassen
        this.syncTargets();
        if (this.idx >= this.total) {
          this.end();
          return;
        }
        this.startEvent(t);
      }
    } else if (this.phase === 'event' && this.ev && !this.ev.answered && t - this.ev.onset >= answerWindowMs(this.ev.dev)) {
      this.timeout(t);
    }
  }

  private syncTargets(): void {
    const n = targetsFor(this.level);
    for (const side of [0, 1]) this.slots[side].forEach((sl, i) => (sl.want = i < n));
  }

  // -------------------------------------------------------------------------
  // Durchgänge

  private startEvent(t: number): void {
    const { rng } = this.ctx;
    const side = this.demo ? DEMO_SIDES[this.idx % DEMO_SIDES.length] : pickSide(() => rng.next(), this.sides);
    if (!this.demo) this.sides.push(side);
    const n = this.slots[side].filter((s) => s.want && s.on && s.alpha >= 0.99).length || 1;
    const slot = this.demo ? 0 : rng.int(n);
    const dev = this.demo ? DEMO_DEV_MS : deviationMsFor(this.stair.level);
    this.ev = { side, slot, onset: t, dev, answered: false };
    this.phase = 'event';
    this.fb = null;
    if (this.demo) {
      this.ctx.hud.caption(this.ctx.texts.captions.stop, 'top');
      this.fixCaption = false;
      this.planGhost(side, DEMO_TAP_MS, true);
    } else if (this.ctx.autoplay) {
      const { rng: r } = this.ctx;
      if (r.chance(0.05)) return;
      const pOk = clamp(0.95 - 0.03 * (this.stair.level - 1), 0.5, 0.95);
      const choose = r.chance(pOk) ? side : 1 - side;
      this.planGhost(choose, dev * 0.7 + r.range(300, 800), false);
    }
  }

  /** Geister-Hand tippt `afterMs` nach Beginn der Stockung auf den Button der Seite */
  private planGhost(side: number, afterMs: number, parkAfter: boolean): void {
    const { ghost, rng } = this.ctx;
    ghost.clear();
    const L = this.layout();
    const R = L.btns[side];
    const move = parkAfter ? 480 : rng.range(320, 460);
    const jx = parkAfter ? 0.5 : rng.range(0.35, 0.65);
    const jy = parkAfter ? 0.5 : rng.range(0.4, 0.65);
    ghost.tap(R.x + R.w * jx, R.y + R.h * jy, { delay: Math.max(0, afterMs - move), move });
    ghost.moveTo(L.rest.x, L.rest.y, { delay: 420, move: 520 });
  }

  /** Tastatur: ← / → melden die Seite. */
  keyDown(key: string, t: number): void {
    if (key === 'ArrowLeft') this.answer(0, t);
    else if (key === 'ArrowRight') this.answer(1, t);
  }

  pointerDown(p: PointerInfo): void {
    // Ganze Bühnenhälfte (und damit auch der große Button unten) zählt als Antwort für diese Seite
    this.answer(p.x < this.ctx.stage.w / 2 ? 0 : 1, p.t);
  }

  private answer(side: number, t: number): void {
    const ev = this.ev;
    if (this.phase !== 'event' || !ev || ev.answered) {
      // Tipp ohne aktuelle Stockung (ein zweiter Finger direkt nach einer Antwort zählt nicht)
      if (this.phase !== 'done' && t - this.lastAnswerT > DOUBLE_TAP_MS) this.falseAlarms++;
      return;
    }
    if (t < ev.onset) return;
    ev.answered = true;
    this.lastAnswerT = t;
    const ok = side === ev.side;
    const { sfx } = this.ctx;
    if (ok) {
      this.correct++;
      this.points += 10 + 2 * (Math.floor(this.level + 1e-9) - 1);
      this.rts.push(t - ev.onset);
      sfx.good();
      this.toastAtHalf(ev.side, '✓', 'good');
    } else {
      sfx.bad();
    }
    this.fb = { chosen: side, correct: ev.side, ok, until: t + FEEDBACK_MS, ringSide: ev.side, ringSlot: ev.slot };
    this.finishTrial(t, ok, false);
  }

  private timeout(t: number): void {
    const ev = this.ev;
    if (!ev) return;
    ev.answered = true;
    this.lastAnswerT = t;
    this.late++;
    this.ctx.sfx.bad();
    this.toastAtHalf(ev.side, this.ctx.texts.feedback.late, 'bad');
    this.fb = { chosen: -1, correct: ev.side, ok: false, until: t + FEEDBACK_MS + 250, ringSide: ev.side, ringSlot: ev.slot };
    this.finishTrial(t, false, true);
  }

  private finishTrial(t: number, ok: boolean, late: boolean): void {
    this.trials.push({ level: this.level, ok, late });
    if (!this.demo) this.stair.update(ok);
    this.idx++;
    this.updateHud();
    this.phase = 'wait';
    const last = this.idx >= this.total;
    const gap = last ? END_DELAY_MS : this.demo ? DEMO_GAP_MS : this.ctx.rng.range(GAP_MS[0], GAP_MS[1]);
    const ev = this.ev;
    // Die laufende Stockung läuft zu Ende, bevor es weitergeht
    const evEnd = ev ? ev.onset + ev.dev + 300 : t;
    this.nextAt = Math.max(t + gap, evEnd);
  }

  private toastAtHalf(side: number, txt: string, kind: ToastKind): void {
    const f = this.layout().f;
    const { w, u } = this.ctx.stage;
    const size = txt.length === 1 ? clamp(u * 7, 26, 52) : clamp(u * 5, 18, 40);
    const B = side === 0 ? f.left : f.right;
    const half = Math.min(w / 2, txt.length * size * 0.3 + 8);
    this.ctx.hud.toast(txt, kind, { x: clamp((B.minX + B.maxX) / 2, half, w - half), y: f.cy - f.cross * 2.4, ms: 750, size });
  }

  private updateHud(): void {
    const { hud, texts } = this.ctx;
    hud.setProgress(this.idx / this.total);
    hud.setScore(this.correct);
    hud.setLabel(`${texts.feedback.level} ${Math.floor(this.level + 1e-9)}`);
  }

  // -------------------------------------------------------------------------

  private end(): void {
    this.phase = 'done';
    this.endT = this.ctx.now();
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'level', value: DEMO_LEVEL, unit: 'level', better: 'higher' },
        secondary: [{ key: 'accuracy', value: 100, unit: 'percent' }],
        score: this.points,
        level: ZZ_MIN_LEVEL,
      });
      return;
    }
    this.ctx.sfx.done();
    const n = this.trials.length;
    const thr = this.stair.threshold();
    const acc = n ? (100 * this.correct) / n : 0;
    const manyLate = this.late >= Math.max(2, Math.ceil(n * 0.25));
    let tip = 'great';
    if (this.falseAlarms >= 3) tip = 'calm';
    else if (manyLate) tip = 'quick';
    else if (acc < 60) tip = 'center';
    const maxLevel = this.trials.reduce((m, tr) => Math.max(m, tr.level), ZZ_MIN_LEVEL);
    const secondary: Metric[] = [
      { key: 'accuracy', value: Math.round(acc), unit: 'percent' },
      { key: 'maxLevel', value: Math.floor(maxLevel + 1e-9), unit: 'level' },
      { key: 'falseAlarms', value: this.falseAlarms, unit: 'count' },
    ];
    if (this.rts.length) secondary.splice(2, 0, { key: 'rt', value: Math.round(median(this.rts)), unit: 'ms' });
    this.ctx.finish({
      primary: { key: 'level', value: Math.max(ZZ_MIN_LEVEL, Math.round(thr)), unit: 'level', better: 'higher' },
      secondary,
      score: this.points,
      level: nextStartLevel(thr, ZZ_MIN_LEVEL, ZZ_MAX_LEVEL),
      tip,
    });
  }

  // -------------------------------------------------------------------------
  // Layout

  private layout(): Layout {
    const { w, h, u } = this.ctx.stage;
    const key = `${w}x${h}`;
    if (this.lay && this.lay.key === key) return this.lay;
    // Antwortleiste unten: zwei große Buttons (Höhe ≥ 60 px)
    const barH = clamp(0.17 * h, 80, 124);
    const barTop = h - barH;
    const pad = clamp(barH * 0.12, 10, 16);
    const bh = barH - 2 * pad;
    const gap = clamp(w * 0.03, 12, 28);
    const bw = (w - 2 * pad - gap) / 2;
    const btns: [Rect, Rect] = [
      { x: pad, y: barTop + pad, w: bw, h: bh },
      { x: pad + bw + gap, y: barTop + pad, w: bw, h: bh },
    ];
    const r = clamp(2.8 * u, 16, 26);
    const top = this.demo ? captionBottom(this.ctx.stage) + 4 : 0;
    const f = fieldsFor(w, h, top, barTop, u, r);
    const rest = { x: w / 2, y: barTop + pad + bh * 0.3 };
    this.lay = { key, f, barTop, btns, r, rest };
    return this.lay;
  }

  resize(): void {
    const old = this.lay;
    this.lay = null;
    const L = this.layout();
    if (!old) return;
    const map = (v: number, a: number, b: number, c: number, d: number) => c + ((v - a) / Math.max(1, b - a)) * (d - c);
    for (const side of [0, 1]) {
      const from = side === 0 ? old.f.left : old.f.right;
      const to = side === 0 ? L.f.left : L.f.right;
      for (const sl of this.slots[side]) {
        sl.w.x = clamp(map(sl.w.x, from.minX, from.maxX, to.minX, to.maxX), to.minX, to.maxX);
        sl.w.y = clamp(map(sl.w.y, from.minY, from.maxY, to.minY, to.maxY), to.minY, to.maxY);
      }
    }
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
    // feine Mittellinie
    g.fillStyle = 'rgba(255,255,255,0.07)';
    g.fillRect(Math.round(L.f.cx) - 0.5, 0, 1, L.barTop);
    // Kugeln – gleichmäßig hell, kein Pulsieren
    for (let side = 0; side < 2; side++) {
      for (const sl of this.slots[side]) {
        if (!sl.on || sl.alpha <= 0) continue;
        g.save();
        g.globalAlpha = sl.alpha;
        glow(g, sl.w.x, sl.w.y, L.r, BALL, 0.4);
        circle(g, sl.w.x, sl.w.y, L.r, BALL);
        g.restore();
      }
    }
    // Rückmeldung: gestrichelter Ring um die Kugel, die gestockt hat
    const fb = this.fb && t < this.fb.until ? this.fb : null;
    if (fb) {
      const sl = this.slots[fb.ringSide][fb.ringSlot];
      if (sl && sl.on) ring(g, sl.w.x, sl.w.y, L.r * 1.7, fb.ok ? C.good : C.warn, 3.5, [7, 6]);
    }
    this.drawCross(g, L);
    this.drawButtons(g, L, fb);
  }

  private drawCross(g: CanvasRenderingContext2D, L: Layout): void {
    const { cx, cy, cross } = L.f;
    g.save();
    g.lineCap = 'round';
    for (const [w, col] of [
      [6, 'rgba(8,14,26,0.65)'],
      [3, CROSS],
    ] as const) {
      g.lineWidth = w;
      g.strokeStyle = col;
      g.beginPath();
      g.moveTo(cx - cross, cy);
      g.lineTo(cx + cross, cy);
      g.moveTo(cx, cy - cross);
      g.lineTo(cx, cy + cross);
      g.stroke();
    }
    g.restore();
    circle(g, cx, cy, 2.5, CROSS);
  }

  private drawButtons(g: CanvasRenderingContext2D, L: Layout, fb: Feedback | null): void {
    const { texts } = this.ctx;
    for (let i = 0; i < 2; i++) {
      const R = L.btns[i];
      // Immer gleich aussehen – der Zustand der Buttons darf das Ereignis nicht verraten
      let state: ButtonState = 'normal';
      let badge: 'ok' | 'bad' | null = null;
      let outline = false;
      if (fb) {
        if (i === fb.chosen) {
          state = fb.ok ? 'good' : 'bad';
          badge = fb.ok ? 'ok' : 'bad';
        } else if (i === fb.correct) {
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
      const ink = state === 'good' || state === 'bad' ? '#FFFFFF' : C.fg;
      const cy = R.y + R.h / 2;
      const size = clamp(R.h * 0.34, 15, 28);
      // Pfeil + Wort (Wort: Seite ist auch ohne Pfeil lesbar)
      g.save();
      g.font = font(size, 800);
      const label = i === 0 ? texts.feedback.left : texts.feedback.right;
      const tw = g.measureText(label).width;
      const aw = size * 1.1;
      const total = aw + size * 0.5 + tw;
      const x0 = R.x + R.w / 2 - total / 2;
      g.restore();
      const dir = i === 0 ? -1 : 1;
      const ax = i === 0 ? x0 + aw / 2 : x0 + total - aw / 2;
      arrow(g, ax, cy, aw, dir, ink);
      text(g, label, i === 0 ? x0 + aw + size * 0.5 + tw / 2 : x0 + tw / 2, cy, size, ink, { weight: 800 });
      if (badge) {
        const rad = clamp(R.h * 0.15, 9, 15);
        drawBadge(g, R.x + R.w - rad - 6, R.y + rad + 6, rad, badge);
      }
    }
  }
}

/** Dicker Pfeil nach links (dir = −1) oder rechts (dir = 1) */
function arrow(g: CanvasRenderingContext2D, cx: number, cy: number, s: number, dir: number, color: string): void {
  g.save();
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.lineWidth = Math.max(3, s * 0.2);
  g.strokeStyle = color;
  g.beginPath();
  g.moveTo(cx - (dir * s) / 2, cy);
  g.lineTo(cx + (dir * s) / 2, cy);
  g.moveTo(cx + (dir * s) / 2 - dir * s * 0.32, cy - s * 0.32);
  g.lineTo(cx + (dir * s) / 2, cy);
  g.lineTo(cx + (dir * s) / 2 - dir * s * 0.32, cy + s * 0.32);
  g.stroke();
  g.restore();
}

export const zweiZiele: ExerciseDefinition = {
  id: 'zwei-ziele',
  category: 'bewegung',
  minutes: 1,
  color: '#3F6FC0',
  icon:
    '<path d="M24 6v36" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="1 5.5" fill="none"/><circle cx="11" cy="17" r="6.2" fill="currentColor"/><circle cx="37" cy="31" r="6.2" fill="currentColor"/><path d="M22 24h4M24 22v4" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" fill="none"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new ZweiZiele(ctx),
};
