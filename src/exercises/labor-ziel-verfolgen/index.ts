/**
 * Ziel verfolgen (Labor) – ein Ziel wandert gleichmäßig auf einer geschlossenen Bahn, der Finger bleibt auf dem Ziel.
 *
 * Portierung der Labor-Übung `follow` (Prototyp ex/follow.js): Größen und Tempo in cm (`ctx.calib`), Einstellungen
 * (`ctx.params`, siehe logic.ts `PARAMS`), reine Logik in logic.ts (`FollowSession`).
 *
 * - Hauptwert: Zeit auf dem Ziel in % der ganzen Zeit (`on_pct`, höher = mehr), keine Stufen (`level` = 1).
 * - Touch-Fassung: Wie im Prototyp liegt der Finger AUF dem Ziel (kein Versatz); gemessen wird das Halten auf dem Ziel.
 *   Weil der Finger das Ziel zum Teil verdeckt, zeigt ein Ring um das Ziel (gestrichelt, bei „auf dem Ziel“ durchgezogen
 *   und dicker, dazu ein ✓ neben dem Ring), wie nah der Finger sein muss; ist er daneben, verbindet eine gestrichelte
 *   Linie Finger und Ziel. Farbe ist nie das einzige Zeichen. Einzelner Finger: ein zweiter Finger wird ignoriert.
 * - Bewegung bildratenunabhängig: Die Strecke wächst mit `dt` (cm/s entlang der Bahn). Vor dem Start steht das Ziel
 *   ruhig am Startpunkt (kurze Anlaufzeit, damit der Finger aufgelegt werden kann); die Zeit zählt erst ab der Bewegung.
 * - Größen sprengen die Bühne nie (`calib.fitCm`), die Bahn bleibt beim Drehen des Tablets an derselben Stelle der Runde.
 * - Gemessen wird nur dein Finger, nicht dein Blick.
 *
 * Film und Autoplay: Die Engine-Hand kann nur Tipps; für das Mitgleiten führt die Übung einen „virtuellen Finger“
 * (Hand wird im Canvas gezeichnet, die Engine-Hand ist verborgen), mit kleiner Verzögerung und Rauschen und – im Film
 * absichtlich – einem Moment, in dem der Finger das Ziel verliert und wieder ansetzt.
 */
import { background, circle, hand, ring, text } from '../../core/draw';
import { paramsOf } from '../../core/params';
import { calibOf } from '../../core/calib';
import { clamp, easeInOut, lerp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, Metric, PointerInfo, ResultDetailRow } from '../../core/types';
import { handSize, playField, restPoint } from '../_shared/tippziele';
import { drawSoftCheck } from '../_shared/weiche-marken';
import {
  type FollowParams,
  followParams,
  FollowSession,
  type FollowSummary,
  MIN_HIT_PX,
  PARAMS,
  pointsFor,
  QUICK_DURATION_S,
  tipFor,
  type Vec,
} from './logic';
import { de, it } from './texts';

/** Anlaufzeit vor der Bewegung (Spielmodus): Finger auflegen */
const LEAD_MS = 1800;
const DEMO_LEAD_MS = 2200;
const DEMO_END_MS = 1100;
const VF_ID = -2;
const TARGET_COLOR = '#FDE68A';
const RIM_COLOR = 'rgba(5,10,20,0.6)';

// Intro-Film: ruhige Ellipse, ein Moment, in dem der Finger das Ziel verliert und wieder ansetzt
const DEMO_PARAMS: Partial<FollowParams> = { durationS: 8.5, path: 'ellipse', speedCmS: 4.5, diameterCm: 2.6, toleranceCm: 0.5, showTrail: 'yes' };
/** Zeitpunkt (Sekunden nach Beginn der Bewegung), an dem die Hand im Film abhebt */
const DEMO_LIFT_S = 3.6;
const DEMO_LIFT_LEN_S = 0.9;
const DEMO_COUNT_S = 6.6;

type AutoState = 'rest' | 'approach' | 'carry' | 'lift' | 'after';

interface Auto {
  st: AutoState;
  t0: number;
  from: Vec;
  dur: number;
  noise: Vec;
  /** Bewegungszeit (s), ab der abgehoben wird; −1 = nie */
  liftAt: number;
  liftLen: number;
  lifted: boolean;
  liftT0: number;
  restWait: number;
  captioned: number;
}

class ZielVerfolgen implements Exercise {
  private readonly demo: boolean;
  private readonly p: FollowParams;
  private readonly session: FollowSession;
  private startAt = 0;
  private started = false;
  private done = false;
  private endAt = Infinity;
  private finger: { id: number } | null = null;
  private fingerPx: Vec = { x: 0, y: 0 };
  /** weiche Hervorhebung „auf dem Ziel“ 0…1 (gleitender Übergang statt Hin- und Herspringen) */
  private blend = 0;
  // virtueller Finger (Film / Autoplay)
  private vf: Vec = { x: 0, y: 0 };
  private auto: Auto = {
    st: 'rest',
    t0: 0,
    from: { x: 0, y: 0 },
    dur: 800,
    noise: { x: 0, y: 0 },
    liftAt: -1,
    liftLen: 0.8,
    lifted: false,
    liftT0: 0,
    restWait: 0,
    captioned: 0,
  };

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = followParams(paramsOf(ctx, PARAMS));
    this.p = this.demo ? { ...base, ...DEMO_PARAMS } : ctx.quick ? { ...base, durationS: Math.min(base.durationS, QUICK_DURATION_S) } : base;
    const f = this.field();
    const ppc = this.ppc();
    this.session = new FollowSession({ ...this.p, diameterCm: this.diameterCm() }, { fieldWcm: f.w / ppc, fieldHcm: f.h / ppc, minHitRadiusCm: MIN_HIT_PX / ppc });
  }

  // --- Geometrie: immer live aus der Bühne ---

  /** Spielfeld in Bühnenpixeln: ganze Bühne, im Intro-Film oberhalb von Hand und Bildunterschrift */
  private field(): { x: number; y: number; w: number; h: number } {
    const s = this.ctx.stage;
    return this.demo ? playField(s, true) : { x: 0, y: 0, w: s.w, h: s.h };
  }

  private ppc(): number {
    return calibOf(this.ctx).pxPerCm;
  }

  /** Durchmesser in cm, auf die Bühne begrenzt */
  private diameterCm(): number {
    return calibOf(this.ctx).fitCm(this.p.diameterCm);
  }

  private toPx(xCm: number, yCm: number): Vec {
    const f = this.field();
    const k = this.ppc();
    return { x: f.x + xCm * k, y: f.y + yCm * k };
  }

  private targetPx(): Vec {
    return this.toPx(this.session.target.x, this.session.target.y);
  }

  resize(): void {
    const f = this.field();
    const k = this.ppc();
    this.session.setField(f.w / k, f.h / k, this.diameterCm());
    if (this.ctx.autoplay) this.vf = this.clampStage(this.vf);
  }

  /** Ruheplatz der Hand: im Film über der Bildunterschrift, sonst rechts unten */
  private restPos(): Vec {
    const st = this.ctx.stage;
    if (this.demo) return restPoint(st);
    const hs = handSize(st);
    return { x: st.w - hs * 0.75, y: st.h - hs * 0.7 };
  }

  private clampStage(p: Vec): Vec {
    const { w, h } = this.ctx.stage;
    return { x: clamp(p.x, 8, Math.max(8, w - 8)), y: clamp(p.y, 2, Math.max(2, h - 2)) };
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    this.startAt = t + (this.demo ? DEMO_LEAD_MS : LEAD_MS);
    hud.setProgress(0);
    hud.setScore(null);
    hud.setLabel(this.demo ? null : this.liveLabel());
    this.vf = this.restPos();
    if (this.ctx.autoplay) ghost.hide(); // die Hand zeichnet diese Übung selbst
    if (this.demo) hud.caption(texts.captions.wait);
  }

  update(dt: number, t: number): void {
    if (this.done) return;
    const s = this.session;
    if (!this.started && t >= this.startAt) {
      this.started = true;
      s.start(t);
    }
    if (this.demo && t >= this.endAt) {
      this.finishSession();
      return;
    }
    if (this.started && !s.finished) {
      s.update(t);
      this.updateHud();
    }
    // weiche Hervorhebung
    const fc = this.fingerCm();
    const on = this.finger && this.started && s.isOn(fc.x, fc.y) ? 1 : 0;
    this.blend += (on - this.blend) * (1 - Math.exp(-dt * 7));
    if (this.ctx.autoplay) this.autoUpdate(dt, t);
    if (s.finished && this.endAt === Infinity) {
      this.finger = null;
      if (this.demo) this.endAt = t + DEMO_END_MS;
      else this.finishSession();
    }
  }

  private liveLabel(): string {
    const s = this.session;
    return this.ctx.texts.feedback.live.replace('{s}', String(Math.ceil(s.remainingS()))).replace('{p}', String(Math.round(s.liveOnPct())));
  }

  private updateHud(): void {
    const { hud } = this.ctx;
    const s = this.session;
    hud.setProgress(clamp(s.elapsed / s.p.durationS, 0, 1));
    if (!this.demo) hud.setLabel(this.liveLabel());
  }

  // --- Eingabe (ein Finger; ein zweiter wird ignoriert) ---

  private fingerCm(): Vec {
    const f = this.field();
    const k = this.ppc();
    return { x: (this.fingerPx.x - f.x) / k, y: (this.fingerPx.y - f.y) / k };
  }

  private applyFinger(down: boolean): void {
    const c = this.fingerCm();
    this.session.setPointer(c.x, c.y, down);
  }

  pointerDown(p: PointerInfo): void {
    if (this.done || this.finger) return;
    this.finger = { id: p.id };
    this.fingerPx = { x: p.x, y: p.y };
    this.applyFinger(true);
    if (this.demo && this.auto.captioned < 1) {
      this.auto.captioned = 1;
      this.ctx.hud.caption(this.ctx.texts.captions.touch);
    }
  }

  pointerMove(p: PointerInfo): void {
    const f = this.finger;
    if (!f || p.id !== f.id || this.done) return;
    this.fingerPx = { x: p.x, y: p.y };
    this.applyFinger(true);
  }

  pointerUp(p: PointerInfo): void {
    const f = this.finger;
    if (!f || p.id !== f.id) return;
    this.fingerPx = { x: p.x, y: p.y };
    this.finger = null;
    this.applyFinger(false);
  }

  // --- virtueller Finger (Film / Autoplay) ---

  private info(p: Vec, t: number): PointerInfo {
    return { id: VF_ID, x: p.x, y: p.y, t, type: 'ghost' };
  }

  private autoUpdate(dt: number, t: number): void {
    const { rng, hud, texts } = this.ctx;
    const A = this.auto;
    const s = this.session;
    const demo = this.demo;
    const aimPx = this.targetPx();
    if (A.st === 'rest') {
      if (A.restWait === 0) A.restWait = t + (demo ? 600 : rng.range(250, 650));
      if (t < A.restWait) return;
      A.st = 'approach';
      A.t0 = t;
      A.from = { ...this.vf };
      A.dur = demo ? 1100 : rng.range(550, 850);
      A.liftAt = this.planLift();
      A.lifted = false;
      return;
    }
    if (A.st === 'approach') {
      const k = clamp((t - A.t0) / A.dur, 0, 1);
      const e = easeInOut(k);
      this.vf = { x: lerp(A.from.x, aimPx.x, e), y: lerp(A.from.y, aimPx.y, e) };
      if (k >= 1) {
        this.vf = this.clampStage(aimPx);
        this.pointerDown(this.info(this.vf, t));
        A.st = 'carry';
        A.noise = { x: 0, y: 0 };
      }
      return;
    }
    if (A.st === 'carry') {
      if (s.finished) {
        this.pointerUp(this.info(this.vf, t));
        A.st = 'after';
        return;
      }
      // Sollort: Ziel mit kleiner Verzögerung (Sehen → Hand) plus Rauschen
      const lag = demo ? 0.04 : 0.06 + 0.015 * rng.normal();
      const ahead = this.session.path.at(Math.max(0, s.distance - Math.max(0, lag) * s.p.speedCmS));
      const aim = this.toPx(ahead.x, ahead.y);
      const sigma = (demo ? 0.18 : 0.3) * s.hitRadius * this.ppc();
      const k = 3 * dt;
      const q = Math.sqrt(dt) * 2.4;
      A.noise = { x: A.noise.x - A.noise.x * k + rng.normal() * sigma * q, y: A.noise.y - A.noise.y * k + rng.normal() * sigma * q };
      const goal = this.clampStage({ x: aim.x + A.noise.x, y: aim.y + A.noise.y });
      const qq = 1 - Math.exp(-dt * (demo ? 20 : 16));
      this.vf = { x: lerp(this.vf.x, goal.x, qq), y: lerp(this.vf.y, goal.y, qq) };
      this.pointerMove(this.info(this.vf, t));
      if (demo && A.captioned < 2 && s.elapsed > 0.6) {
        A.captioned = 2;
        hud.caption(texts.captions.follow);
      }
      if (demo && A.captioned < 4 && s.elapsed >= DEMO_COUNT_S) {
        A.captioned = 4;
        hud.caption(texts.captions.count);
      }
      if (!A.lifted && A.liftAt >= 0 && s.elapsed >= A.liftAt) {
        A.lifted = true;
        A.st = 'lift';
        A.liftT0 = t;
        A.from = { ...this.vf };
        this.pointerUp(this.info(this.vf, t));
        if (demo && A.captioned < 3) {
          A.captioned = 3;
          hud.caption(texts.captions.lost);
        }
      }
      return;
    }
    if (A.st === 'lift') {
      // Hand schwebt kurz über dem Bildschirm (nach oben weg), dann setzt sie wieder an
      const el = (t - A.liftT0) / 1000;
      const up = Math.sin(clamp(el / A.liftLen, 0, 1) * Math.PI);
      const away = this.clampStage({ x: A.from.x, y: A.from.y - handSize(this.ctx.stage) * 0.9 * up });
      this.vf = el < A.liftLen ? away : this.vf;
      if (s.finished) {
        A.st = 'after';
        return;
      }
      if (el >= A.liftLen) {
        A.st = 'approach';
        A.t0 = t;
        A.from = { ...this.vf };
        A.dur = demo ? 750 : rng.range(450, 700);
      }
      return;
    }
    if (A.st === 'after') {
      const rp = this.restPos();
      const q = 1 - Math.exp(-dt * 3);
      this.vf = { x: lerp(this.vf.x, rp.x, q), y: lerp(this.vf.y, rp.y, q) };
    }
  }

  /** Bewegungszeit (s), ab der die Hand abhebt (−1 = nie): im Film fest, im Autoplay meist ein Mal */
  private planLift(): number {
    if (this.demo) {
      this.auto.liftLen = DEMO_LIFT_LEN_S;
      return DEMO_LIFT_S;
    }
    const { rng } = this.ctx;
    if (!rng.chance(0.6)) return -1;
    this.auto.liftLen = rng.range(0.5, 1.1);
    return rng.range(0.2, 0.75) * this.p.durationS;
  }

  // --- Ende ---

  private finishSession(): void {
    if (this.done) return;
    this.done = true;
    const { hud, sfx } = this.ctx;
    hud.setProgress(1);
    hud.caption(null);
    const sum = this.session.summary();
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'on_pct', value: Math.round(sum.onPct ?? 0), unit: 'percent', better: 'higher' },
        secondary: [{ key: 'losses', value: sum.losses, unit: 'count' }],
        score: 0,
        level: 1,
      });
      return;
    }
    sfx.done();
    this.ctx.finish(this.buildResult(sum));
  }

  private buildResult(sum: FollowSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const secondary: Metric[] = [
      { key: 'best_run', value: Math.round(sum.bestRun * 1000), unit: 'time' },
      { key: 'losses', value: sum.losses, unit: 'count' },
    ];
    if (sum.touchPct !== null) secondary.push({ key: 'touch_pct', value: sum.touchPct, unit: 'percent' });
    const rows: ResultDetailRow[] = [{ label: texts.metrics.on_s, value: fmt.time(sum.onS * 1000, 1) }];
    if (sum.meanDist !== null) rows.push({ label: texts.metrics.mean_dist, value: `${fmt.num(sum.meanDist, 1)} ${texts.feedback.cm}` });
    return {
      primary: { key: 'on_pct', value: sum.onPct ?? 0, unit: 'percent', better: 'higher' },
      secondary,
      details: [{ title: texts.feedback.moreTitle, rows, note: texts.feedback.moreNote }],
      score: pointsFor(sum.onS),
      level: 1,
      tip: tipFor(sum),
    };
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D): void {
    const { w, h, dpr, u } = this.ctx.stage;
    background(g, w, h, dpr, 'grid');
    if (this.p.showTrail === 'yes') this.drawTrail(g);
    this.drawTarget(g);
    if (!this.demo && !this.finger && !this.done && !this.ctx.autoplay) {
      const size = clamp(u * 3.6, 14, 24);
      text(g, this.ctx.texts.feedback.start, w / 2, h - Math.max(18, u * 3.5) - size * 0.5, size, '#E8EEF7', { weight: 700 });
    }
    if (this.ctx.autoplay) hand(g, this.vf.x, this.vf.y, handSize(this.ctx.stage), !!this.finger);
  }

  /** Bahn als dünne Linie (nur jeder 6. Stützpunkt reicht, die Bahn ist glatt) */
  private drawTrail(g: CanvasRenderingContext2D): void {
    const pts = this.session.path.points;
    g.save();
    g.lineJoin = 'round';
    g.lineCap = 'round';
    g.strokeStyle = 'rgba(232,238,247,0.3)';
    g.lineWidth = 3;
    g.beginPath();
    for (let i = 0; i < pts.length; i += 6) {
      const p = this.toPx(pts[i].x, pts[i].y);
      if (i) g.lineTo(p.x, p.y);
      else g.moveTo(p.x, p.y);
    }
    g.closePath();
    g.stroke();
    g.restore();
  }

  private drawTarget(g: CanvasRenderingContext2D): void {
    const s = this.session;
    const k = this.ppc();
    const c = this.targetPx();
    const r = (s.diameter * k) / 2;
    const R = Math.max(s.hitRadius * k, r);
    const b = this.blend;
    // Ring um das Ziel: der Bereich, in dem „auf dem Ziel“ zählt (gestrichelt; bei Treffer durchgezogen und dicker)
    g.save();
    g.strokeStyle = `rgba(253,230,138,${0.5 + 0.45 * b})`;
    g.lineWidth = 2.5 + 2.5 * b;
    g.setLineDash(b > 0.5 ? [] : [7, 7]);
    g.beginPath();
    g.arc(c.x, c.y, R, 0, Math.PI * 2);
    g.stroke();
    g.restore();
    // Ziel
    circle(g, c.x, c.y, r, TARGET_COLOR);
    ring(g, c.x, c.y, r + 1.5, RIM_COLOR, 2);
    g.save();
    g.globalAlpha = 0.35;
    circle(g, c.x - r * 0.28, c.y - r * 0.3, r * 0.3, '#ffffff');
    g.restore();
    if (!this.started && !this.done) {
      // Vor dem Start: ruhiger Hinweisring außen (Form, kein Blinken)
      ring(g, c.x, c.y, R + 8, 'rgba(255,255,255,0.35)', 2, [3, 9]);
    }
    if (this.finger && this.started) {
      const f = this.fingerPx;
      const on = s.isOn(this.fingerCm().x, this.fingerCm().y);
      if (!on) {
        // Finger daneben: gestrichelte Linie zum Ziel
        g.save();
        g.strokeStyle = 'rgba(255,255,255,0.5)';
        g.lineWidth = 2.5;
        g.setLineDash([6, 7]);
        g.beginPath();
        g.moveTo(f.x, f.y);
        g.lineTo(c.x, c.y);
        g.stroke();
        g.restore();
        ring(g, f.x, f.y, Math.max(12, this.ctx.stage.u * 1.6), 'rgba(255,255,255,0.6)', 2.5);
      }
    }
    // ✓ neben dem Ring, solange der Finger auf dem Ziel liegt (sichtbar, auch wenn der Finger das Ziel verdeckt)
    if (b > 0.05) {
      const size = clamp(R * 0.3, 10, 20);
      const above = c.y - R - size * 2.2 > 0;
      const y = above ? c.y - R - size * 1.4 : c.y + R + size * 1.4;
      drawSoftCheck(g, clamp(c.x, size * 1.5, this.ctx.stage.w - size * 1.5), y, size, b);
    }
  }
}

export const laborZielVerfolgen: ExerciseDefinition = {
  id: 'labor-ziel-verfolgen',
  category: 'bewegung',
  minutes: 1,
  color: '#2E6DB4',
  icon:
    '<path d="M8 33c0-9 7-15 16-15s16 6 16 15" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="3 5" stroke-linecap="round"/><circle cx="31" cy="21" r="6.5" fill="currentColor"/><circle cx="31" cy="21" r="10.5" fill="none" stroke="currentColor" stroke-width="2.4" opacity=".55"/><path d="M12 42l7-5" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" fill="none"/>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  create: (ctx) => new ZielVerfolgen(ctx),
};
