/**
 * Sofort-Reaktion – tippe, sobald die Mitte aufleuchtet (Katalog 503, Touch-Fassung der „Sofortreaktion“).
 *
 * Unterschied zu Blitzreaktion: Dort gibt es Mitte und Rand, ein persönliches Zeitziel und Punkte dafür. Hier ist es
 * ein schlankes Reaktionszeit-Protokoll mit genau einem Ort: weiche Vorperiode, klare Antizipations-Erkennung,
 * Auswertung mit Median und Streuung.
 *
 * - Reiz: die Mitte leuchtet warmweiß weich auf (ease-out in 100 ms), kein Grün, kein Rot, kein Blitz. Form-Hinweis:
 *   aus einem hohlen Ring wird eine gefüllte Scheibe. Das Licht bleibt bis zum Tipp (höchstens 1,5 s).
 * - Wartezeit: 900 ms + exponentieller Anteil (nicht alternd) – sie lässt sich nicht erraten.
 * - Frühstart: Tipp in der Wartezeit oder < 100 ms nach Beginn → zählt nicht, neue Wartezeit, Frühstart-Zähler +1.
 *   Antworten von 100–149 ms zählen, werden aber für den Tipp „auffallend schnell“ gezählt.
 * - 2 Aufwärm- und 16 gewertete Durchgänge, kein Zeitkonto, keine Strafzeit, keine Ränge.
 * - Ehrlich: Gemessen wird die Zeit vom Beginn des Aufleuchtens bis zum Berühren des Bildschirms. Touchscreen und
 *   Anzeige addieren eine Verzögerung (nach Messungen grob 50–130 ms): Die Zeit ist zu lang und nur als Vergleich mit dir
 *   selbst auf diesem Gerät zu lesen. Tippen irgendwo – gemessen wird das Erkennen, nicht das Zielen.
 */
import { background, circle, glow, ring } from '../../core/draw';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { classifyTap } from '../_shared/vorperiode';
import { drawMissMark, toastAt } from '../_shared/ziel-auftauchen';
import {
  computeStats,
  COUNTED_TRIALS,
  EARLY_EXTRA_MS,
  glowAlpha,
  judge,
  LAPSE_MS,
  pointsFor,
  QUICK_TRIALS,
  savedLevel,
  tipFor,
  waitMs,
  WARMUP_TRIALS,
} from './logic';
import { de, it } from './texts';

const FEEDBACK_MS = 650;
const OFF_MS = 160;
const MARK_MS = 650;
const START_GRACE_MS = 700;
// Intro-Film: 3 Durchgänge, der 2. beginnt mit einem Frühstart
const DEMO_TRIALS = 3;
// Wartezeiten je Durchgang; beim 2. läuft erst die längere Zeit (Frühstart-Tipp bei 0,8 s), dann DEMO_RETRY_WAIT
const DEMO_WAITS = [1300, 1600, 1200];
const DEMO_RETRY_WAIT = 1000;

const WARM = '#FFD27A';
const WARM_WHITE = '#FFF4D6';
const MARK = '#FBBF24';

type Phase = 'wait' | 'stim' | 'feedback' | 'done';

class SofortReaktion implements Exercise {
  private readonly demo: boolean;
  private readonly warmups: number;
  private readonly total: number;
  private phase: Phase = 'wait';
  private phaseT = 0;
  private waitUntil = 0;
  private onset = 0;
  private offT = -1e9;
  private idx = 0;
  private rts: number[] = [];
  private early = 0;
  private missed = 0;
  private points = 0;
  private graceUntil = 0;
  private markT = -1e9;
  private autoPlanned = false;
  /** Im Film: der Frühstart des 2. Durchgangs wurde schon gezeigt */
  private demoEarlyDone = false;
  private endT = Infinity;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.warmups = this.demo || ctx.quick ? 0 : WARMUP_TRIALS;
    this.total = this.demo ? DEMO_TRIALS : ctx.quick ? QUICK_TRIALS : this.warmups + COUNTED_TRIALS;
  }

  // --- Geometrie: immer live aus der Bühne ---

  private radius(): number {
    return clamp(this.ctx.stage.u * 8, 40, 110);
  }

  private center(): { x: number; y: number } {
    const { w, h } = this.ctx.stage;
    return { x: w / 2, y: h / 2 };
  }

  /** Ruheplatz der Geister-Hand: rechts unterhalb der Mitte (verdeckt das Licht nicht) */
  private rest(): { x: number; y: number } {
    const { w, h } = this.ctx.stage;
    return { x: w * 0.76, y: h * 0.66 };
  }

  private isWarmup(): boolean {
    return this.idx < this.warmups;
  }

  start(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    this.graceUntil = t + START_GRACE_MS;
    hud.setScore(this.demo ? null : 0);
    this.newWait(t, 0);
    this.updateHud();
    if (this.demo) {
      hud.caption(texts.captions.look);
      const r = this.rest();
      ghost.moveTo(r.x, r.y, { move: 0 });
    }
  }

  private newWait(t: number, extra: number): void {
    const { rng, ghost } = this.ctx;
    this.phase = 'wait';
    this.phaseT = t;
    this.autoPlanned = false;
    const base = this.demo ? (this.idx === 1 && this.demoEarlyDone ? DEMO_RETRY_WAIT : DEMO_WAITS[this.idx]) : waitMs(rng);
    this.waitUntil = t + base + extra;
    if (this.demo && this.idx === 1 && !this.demoEarlyDone) {
      // Frühstart zeigen: Die Hand tippt mitten in der Wartezeit
      const r = this.rest();
      ghost.tap(r.x, r.y, { delay: 800, move: 0 });
    }
  }

  private updateHud(): void {
    const { hud, texts } = this.ctx;
    if (this.demo) return;
    const counted = this.total - this.warmups;
    const done = Math.max(0, this.idx - this.warmups);
    hud.setProgress(this.total ? this.idx / this.total : 0);
    hud.setLabel(this.isWarmup() ? texts.feedback.warmup : `${Math.min(done + 1, counted)} / ${counted}`);
  }

  update(_dt: number, t: number): void {
    if (this.phase === 'done') return;
    const { ghost, hud, texts, rng } = this.ctx;
    if (this.phase === 'wait') {
      if (t >= this.waitUntil) {
        this.phase = 'stim';
        this.onset = t;
        this.phaseT = t;
        this.autoPlanned = false;
        if (this.demo) hud.caption(texts.captions.tap);
      } else if (this.ctx.autoplay && !this.demo && !this.autoPlanned && ghost.idle) {
        // Autoplay (Tests): ab und zu ein Frühstart, sonst ruhig warten
        this.autoPlanned = true;
        if (rng.chance(0.06)) {
          const r = this.rest();
          ghost.tap(r.x, r.y, { delay: rng.range(250, Math.max(300, (this.waitUntil - t) * 0.8)), move: 0 });
        }
      }
    } else if (this.phase === 'stim') {
      if (this.ctx.autoplay && !this.autoPlanned) {
        this.autoPlanned = true;
        const r = this.rest();
        // Film: fester, gut sichtbarer Abstand; Tests: menschlich streuend
        ghost.tap(r.x, r.y, { delay: this.demo ? 340 : rng.range(230, 480), move: 0 });
        if (!this.demo && rng.chance(0.03)) ghost.clear();
      }
      if (t - this.onset >= LAPSE_MS) this.lapse(t);
    } else if (this.phase === 'feedback' && t - this.phaseT >= FEEDBACK_MS) {
      this.idx++;
      this.updateHud();
      if (this.idx >= this.total) {
        this.finishSession(t);
        return;
      }
      this.newWait(t, 0);
      if (this.demo) hud.caption(this.idx === 1 ? texts.captions.early : texts.captions.look);
    }
  }

  /** Tastatur: Leertaste/Enter wirkt wie ein Tipp (Computer ohne Touch). */
  keyDown(key: string, t: number): void {
    if (key !== ' ' && key !== 'Enter') return;
    const c = this.center();
    this.pointerDown({ id: -2, x: c.x, y: c.y, t, type: 'mouse' });
  }

  pointerDown(p: PointerInfo): void {
    if (p.t < this.graceUntil) return;
    if (this.phase === 'wait') {
      this.earlyStart(p.t);
      return;
    }
    if (this.phase !== 'stim' || p.t < this.onset) return;
    const since = p.t - this.onset;
    if (classifyTap(since) === 'early') {
      this.earlyStart(p.t);
      return;
    }
    this.answer(p.t, since);
  }

  private earlyStart(t: number): void {
    const { sfx, texts, stage, hud, ghost } = this.ctx;
    if (!this.isWarmup()) this.early++;
    sfx.bad();
    ghost.clear();
    this.markT = t;
    // Zweiter Finger/Doppeltipp direkt danach zählt nicht noch einmal
    this.graceUntil = t + 350;
    const c = this.center();
    toastAt(this.ctx, texts.feedback.early, 'bad', c.x, c.y - this.radius() * 1.5, 900, clamp(stage.u * 4.4, 17, 34));
    if (this.demo) {
      this.demoEarlyDone = true;
      hud.caption(texts.captions.again);
    }
    // Derselbe Durchgang mit neuer Wartezeit (plus kurze Extrapause)
    this.newWait(t, EARLY_EXTRA_MS);
  }

  private answer(t: number, since: number): void {
    const { sfx, hud, fmt, stage } = this.ctx;
    const warm = this.isWarmup();
    if (!warm) {
      this.rts.push(since);
      this.points += pointsFor(since);
      hud.setScore(this.demo ? null : this.points);
    }
    sfx.good();
    this.offT = t;
    const c = this.center();
    toastAt(this.ctx, fmt.time(since), judge(since) === 'fast' ? 'info' : 'good', c.x, c.y - this.radius() * 1.5, FEEDBACK_MS + 100, clamp(stage.u * 4.4, 17, 34));
    this.phase = 'feedback';
    this.phaseT = t;
  }

  private lapse(t: number): void {
    const { sfx, texts, stage } = this.ctx;
    if (!this.isWarmup()) this.missed++;
    sfx.bad();
    this.offT = t;
    const c = this.center();
    toastAt(this.ctx, texts.feedback.missed, 'info', c.x, c.y - this.radius() * 1.5, FEEDBACK_MS + 100, clamp(stage.u * 4, 16, 30));
    this.phase = 'feedback';
    this.phaseT = t;
  }

  // -------------------------------------------------------------------------

  private finishSession(t: number): void {
    this.phase = 'done';
    this.endT = t;
    const { hud, sfx } = this.ctx;
    hud.setProgress(1);
    const stats = computeStats(this.rts, this.early, this.missed);
    const med = Number.isFinite(stats.medianMs) ? stats.medianMs : LAPSE_MS;
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'median', value: Math.round(med), unit: 'time', better: 'lower' },
        secondary: [{ key: 'valid', value: stats.valid, unit: 'count' }],
        score: this.points,
        level: savedLevel(med),
      });
      return;
    }
    sfx.done();
    const secondary = [
      ...(Number.isFinite(stats.spreadMs) ? [{ key: 'spread', value: Math.round(stats.spreadMs), unit: 'ms' as const }] : []),
      { key: 'early', value: stats.early, unit: 'count' as const },
      { key: 'valid', value: stats.valid, unit: 'count' as const },
    ];
    this.ctx.finish({
      primary: { key: 'median', value: Math.round(med), unit: 'time', better: 'lower' },
      secondary,
      score: this.points,
      level: savedLevel(med),
      tip: tipFor(stats),
    });
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, now: number): void {
    const t = Math.min(now, this.endT);
    const { w, h, u, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    const c = this.center();
    const R = this.radius();
    // Ruhezustand: hohler Ring (Form), darin eine dunkle Scheibe
    circle(g, c.x, c.y, R, 'rgba(255,255,255,0.05)');
    ring(g, c.x, c.y, R, 'rgba(232,238,247,0.4)', Math.max(2.5, u * 0.5));
    // Leuchten: weich auf, nach dem Tipp weich aus
    let a = 0;
    if (this.phase === 'stim') a = glowAlpha(t - this.onset);
    else if (this.phase === 'feedback' && t - this.offT < OFF_MS) a = 1 - clamp((t - this.offT) / OFF_MS, 0, 1);
    if (a > 0.01) {
      glow(g, c.x, c.y, R * 1.7, WARM, 0.9 * a);
      g.save();
      g.globalAlpha = a;
      const grad = g.createRadialGradient(c.x, c.y, 0, c.x, c.y, R);
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.55, WARM_WHITE);
      grad.addColorStop(1, WARM);
      g.beginPath();
      g.arc(c.x, c.y, R * 0.94, 0, Math.PI * 2);
      g.fillStyle = grad;
      g.fill();
      ring(g, c.x, c.y, R, WARM_WHITE, Math.max(3.5, u * 0.8));
      g.restore();
    }
    const k = clamp((t - this.markT) / MARK_MS, 0, 1);
    if (k < 1) drawMissMark(g, c.x, c.y, k, u, MARK);
  }
}

export const sofortReaktion: ExerciseDefinition = {
  id: 'sofort-reaktion',
  category: 'reaktion',
  minutes: 1,
  color: '#C8641E',
  icon:
    '<circle cx="24" cy="24" r="13" fill="none" stroke="currentColor" stroke-width="3.2"/><circle cx="24" cy="24" r="6.5" fill="currentColor"/><path d="M24 3.5v4.5M24 40v4.5M3.5 24H8M40 24h4.5" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" opacity=".55"/>',
  texts: { de, it },
  create: (ctx) => new SofortReaktion(ctx),
};
