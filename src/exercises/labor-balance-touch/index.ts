/**
 * Balance-Touch (Labor) – Spot-Touch im Stand: ein Punkt erscheint, tippe ihn an. Eine Hilfsperson tippt auf „Gleichgewicht
 * verloren“ (oder B), sooft du das Gleichgewicht verlierst.
 *
 * Portierung der Labor-Übung `balancetouch`: Größen in cm (`ctx.calib`), Einstellungen
 * (`ctx.params`, siehe logic.ts `PARAMS`), reine Logik in logic.ts (`BalanceSession` um die `SpotSession` aus Spot-Touch).
 *
 * - Kategorie `bewegung`: Tippen im Stand (Haltung und Auge-Hand zugleich). Hauptwert: getroffene Punkte (`hits`, höher = mehr);
 *   dazu die von der Hilfsperson gezählten Verluste, Trefferquote und Reaktionszeit. Keine Stufen (`level` = 1).
 * - Hilfsperson: große Bildschirmtaste „Gleichgewicht verloren“ (≥ 56 px, Text und Zeichen) plus Taste B. Die App liest nichts von
 *   einer Plattform und misst weder Gleichgewicht noch Haltung: Verluste sind Zählwerte der Hilfsperson.
 * - Rückmeldung weich: ✓ am getroffenen Punkt, ✗ am Fehltipp, verpasste Punkte lösen sich als gestrichelter Ring auf; ein
 *   Verlust wird nur gezählt und kurz bestätigt (kein Blitz, kein Rot). Punkte blenden in 110 ms ein.
 * - Gemessen wird nur dein Tippen (Zeit vom Erscheinen bis zur Berührung), nicht dein Blick – auch nicht beim Kreuz.
 */
import { background, circle, ring } from '../../core/draw';
import { paramsOf } from '../../core/params';
import { calibOf } from '../../core/calib';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, Metric, PointerInfo, ResultDetailRow } from '../../core/types';
import { drawHelperButton, helperAt, helperKeyKind, helperLayout, helperZoneHeight, MIN_HELPER_BUTTON_PX, type HelperButton } from '../_shared/labor-helfer';
import { playField, restPoint, toastNear } from '../_shared/tippziele';
import { drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import type { Spot } from '../labor-spot-touch/logic';
import {
  BalanceSession,
  balanceParams,
  type BalanceParams,
  type BalanceSummary,
  limitDiameter,
  MIN_HIT_PX,
  PARAMS,
  pointsFor,
  QUICK_DURATION_S,
  tipFor,
} from './logic';
import { de, it } from './texts';

const FADE_IN_MS = 110;
const CHECK_MS = 520;
const BURST_MS = 300;
const GONE_MS = 350;
const CROSS_MS = 650;
const LEAD_MS = 500;

// Farben der Punkte (nur zur Abwechslung, sie bedeuten nichts); weißer Ring + Umriss halten sie sichtbar
const SPOT_COLORS = ['#FFD23F', '#3BCEAC', '#F2708F', '#5DADE2'];
const CROSS_COLOR = '#9AA7B8';

// Intro-Film: zwei Treffer, dann zählt die Hilfsperson einen Verlust (der Punkt dabei verfällt), dann zwei weitere Treffer
const DEMO_PARAMS: Partial<BalanceParams> = { stance: 'both', durationS: 14, diameterCm: 3, persistenceS: 2.4, gapMs: 500, zone: 'all', fixation: 'no' };
const DEMO_LEAD_MS = 1200;
const DEMO_LOSS_NR = 3;
const DEMO_HITS = 4;
const DEMO_END_MS = 12500;

interface Mark {
  x: number;
  y: number;
  t0: number;
}
interface Burst extends Mark {
  r: number;
}

class BalanceTouch implements Exercise {
  private readonly demo: boolean;
  private readonly p: BalanceParams;
  private readonly session: BalanceSession;
  private startAt = 0;
  private started = false;
  private done = false;
  private endT = Infinity;
  private endAt = Infinity;
  private seenId = 0;
  private seenTrials = 0;
  private spawnNr = 0;
  private demoHits = 0;
  private planned = new Set<number>();
  private nextLossAt = -1;
  private checks: Mark[] = [];
  private bursts: Burst[] = [];
  private gone: Mark[] = [];
  private crosses: Mark[] = [];
  private lossPress: number | null = null;
  private colorOf = new Map<number, string>();
  private lastLabel = '';

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = balanceParams(paramsOf(ctx, PARAMS));
    this.p = this.demo ? { ...base, ...DEMO_PARAMS } : ctx.quick ? { ...base, durationS: Math.min(base.durationS, QUICK_DURATION_S) } : base;
    const f = this.field();
    const k = this.ppc();
    this.session = new BalanceSession(this.p, {
      rng: ctx.rng,
      fieldWcm: f.w / k,
      fieldHcm: f.h / k,
      minHitRadiusCm: MIN_HIT_PX / k,
    });
    this.session.setField(f.w / k, f.h / k, this.diameterCm());
  }

  // --- Geometrie: immer live aus der Bühne ---

  private minBtn(): number {
    return this.demo ? 28 : MIN_HELPER_BUTTON_PX;
  }

  private ppc(): number {
    return calibOf(this.ctx).pxPerCm;
  }

  /** Spielfeld in Bühnenpixeln: der Platz über der Taste der Hilfsperson (im Intro-Film oberhalb von Hand und Bildunterschrift) */
  private field(): { x: number; y: number; w: number; h: number } {
    const s = this.ctx.stage;
    const f = playField(s, this.demo);
    return { x: f.x, y: f.y, w: f.w, h: Math.max(40, f.h - helperZoneHeight(s.u, this.minBtn())) };
  }

  private button(): HelperButton {
    const s = this.ctx.stage;
    const f = playField(s, this.demo);
    return helperLayout(['loss'], f.x, f.x + f.w, f.y + f.h, s.u, this.minBtn())[0];
  }

  /** Durchmesser in cm: auf die Bühne und auf einen Anteil des Felds begrenzt */
  private diameterCm(): number {
    const f = this.field();
    const k = this.ppc();
    return limitDiameter(calibOf(this.ctx).fitCm(this.p.diameterCm), f.w / k, f.h / k);
  }

  private toPx(xCm: number, yCm: number): { x: number; y: number } {
    const f = this.field();
    const k = this.ppc();
    return { x: f.x + xCm * k, y: f.y + yCm * k };
  }

  resize(): void {
    const f = this.field();
    const k = this.ppc();
    this.session.setField(f.w / k, f.h / k, this.diameterCm());
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    this.startAt = t + (this.demo ? DEMO_LEAD_MS : LEAD_MS);
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateLabel(this.p.durationS, 0);
    if (this.demo) {
      const r = restPoint(this.ctx.stage);
      ghost.moveTo(r.x, r.y, { move: 0 });
      hud.caption(texts.captions.wait);
    }
  }

  update(_dt: number, t: number): void {
    if (this.done) return;
    const s = this.session;
    if (!this.started) {
      if (t < this.startAt) return;
      this.started = true;
      s.start(t);
      this.nextLossAt = t + (this.ctx.quick ? this.ctx.rng.range(2500, 4500) : this.ctx.rng.range(12000, 30000));
    }
    if (this.demo && t >= this.endAt) {
      this.finishSession(t);
      return;
    }
    s.update(t);
    this.noticeEvents(t);
    if (this.ctx.autoplay) this.autoUpdate(t);
    this.updateHud(t);
    if (s.finished || (this.demo && t - this.startAt >= DEMO_END_MS)) this.finishSession(t);
    this.prune(t);
  }

  private updateLabel(remainingS: number, losses: number): void {
    if (this.demo) return;
    const label = this.ctx.texts.feedback.hud.replace('{s}', String(Math.ceil(remainingS))).replace('{n}', String(losses));
    if (label !== this.lastLabel) {
      this.lastLabel = label;
      this.ctx.hud.setLabel(label);
    }
  }

  private updateHud(t: number): void {
    const { hud } = this.ctx;
    const s = this.session;
    hud.setProgress(s.spots.elapsedFrac(t));
    if (this.demo) return;
    hud.setScore(s.spots.trials.filter((x) => x.hit).length);
    this.updateLabel(s.spots.remainingS(t), s.losses.length);
  }

  /** Neu erschienene und verpasste Punkte bemerken (Bildunterschriften im Film, Auflösen verpasster Punkte) */
  private noticeEvents(t: number): void {
    const s = this.session.spots;
    for (const sp of s.active) {
      if (sp.id > this.seenId) {
        this.seenId = sp.id;
        this.spawnNr++;
        this.colorOf.set(sp.id, SPOT_COLORS[(sp.id - 1) % SPOT_COLORS.length]);
        if (this.demo) this.demoSpawned(sp);
      }
    }
    while (this.seenTrials < s.trials.length) {
      const tr = s.trials[this.seenTrials++];
      if (tr.hit) continue;
      const c = this.toPx(tr.xCm, tr.yCm);
      this.gone.push({ x: c.x, y: c.y, t0: t });
    }
  }

  // --- Eingabe ---

  private noteLoss(t: number): void {
    const res = this.session.loss(t);
    if (!res || res.type === 'ignored') return;
    const { hud, stage, texts } = this.ctx;
    this.lossPress = t;
    const b = this.button().rect;
    const size = clamp(stage.u * 3.8, 15, 24);
    toastNear(hud, stage.w, texts.feedback.lossNoted.replace('{n}', String(res.n)), 'info', b.x + b.w / 2, b.y - size * 0.4, 900, size);
  }

  pointerDown(p: PointerInfo): void {
    if (this.done || !this.started) return;
    if (helperAt([this.button()], p.x, p.y) === 'loss') {
      this.noteLoss(p.t);
      return;
    }
    const f = this.field();
    const k = this.ppc();
    const res = this.session.tap((p.x - f.x) / k, (p.y - f.y) / k, p.t);
    if (!res || res.type === 'ignored') return;
    const { hud, stage, fmt } = this.ctx;
    if (res.type === 'hit') {
      const c = this.toPx(res.spot.x, res.spot.y);
      const rPx = this.session.spots.r * k;
      this.checks.push({ x: c.x, y: c.y, t0: p.t });
      if (!this.ctx.reducedMotion) this.bursts.push({ x: c.x, y: c.y, r: rPx, t0: p.t });
      const size = clamp(stage.u * 4, 16, 28);
      toastNear(hud, stage.w, `✓ ${fmt.ms(res.rt)}`, 'good', c.x, c.y - rPx * 1.1, 700, size);
      if (this.demo) this.demoHit();
    } else {
      this.crosses.push({ x: p.x, y: p.y, t0: p.t });
    }
  }

  keyDown(key: string, t: number): void {
    if (this.done || !this.started) return;
    if (helperKeyKind(key) === 'loss') this.noteLoss(t);
  }

  // --- Intro-Film ---

  private demoSpawned(sp: Spot): void {
    const { hud, ghost, texts } = this.ctx;
    if (this.spawnNr === 1) hud.caption(texts.captions.appear);
    if (this.spawnNr === DEMO_LOSS_NR) {
      // die Hand ist jetzt die Hilfsperson: sie tippt „Gleichgewicht verloren“; dieser Punkt wird nicht erreicht
      hud.caption(texts.captions.loss);
      const b = this.button().rect;
      ghost.tap(b.x + b.w / 2, b.y + b.h / 2, { delay: 500, move: 700 });
      return;
    }
    const c = this.toPx(sp.x, sp.y);
    ghost.tap(c.x, c.y, { delay: 450, move: 520 });
  }

  private demoHit(): void {
    const { hud, texts } = this.ctx;
    this.demoHits++;
    if (this.demoHits === 1) hud.caption(texts.captions.next);
    if (this.demoHits === DEMO_HITS - 1) hud.caption(texts.captions.count);
    if (this.demoHits >= DEMO_HITS) this.endAt = this.ctx.now() + 1400;
  }

  /** Autoplay (Tests): trifft meist mittig, selten daneben oder gar nicht; die Hilfsperson zählt ab und zu einen Verlust */
  private autoUpdate(t: number): void {
    if (this.demo) return;
    const { ghost, rng } = this.ctx;
    if (!ghost.idle) return;
    if (t >= this.nextLossAt) {
      this.nextLossAt = t + rng.range(12000, 30000);
      const b = this.button().rect;
      ghost.tap(b.x + b.w / 2, b.y + b.h / 2, { delay: 100, move: rng.range(350, 550) });
      return;
    }
    const sp = this.session.spots.active.find((a) => !this.planned.has(a.id));
    if (!sp) return;
    this.planned.add(sp.id);
    if (rng.chance(0.08)) return;
    const move = rng.range(260, 420);
    const room = this.p.persistenceS * 1000 - move - 120;
    if (room < 80) return;
    const delay = rng.range(60, Math.min(700, room));
    const c = this.toPx(sp.x, sp.y);
    const rPx = this.session.spots.r * this.ppc();
    const roll = rng.next();
    const off = roll < 0.07 ? rPx * 2.6 : Math.min(rPx * 0.9, Math.abs(rng.normal()) * rPx * 0.3);
    const a = rng.range(0, Math.PI * 2);
    ghost.tap(c.x + Math.cos(a) * off, c.y + Math.sin(a) * off, { delay, move });
  }

  private prune(t: number): void {
    if (this.checks.length) this.checks = this.checks.filter((m) => t - m.t0 < CHECK_MS);
    if (this.bursts.length) this.bursts = this.bursts.filter((m) => t - m.t0 < BURST_MS);
    if (this.gone.length) this.gone = this.gone.filter((m) => t - m.t0 < GONE_MS);
    if (this.crosses.length) this.crosses = this.crosses.filter((m) => t - m.t0 < CROSS_MS);
    if (this.lossPress !== null && t - this.lossPress > 300) this.lossPress = null;
  }

  // --- Ende ---

  private finishSession(t: number): void {
    if (this.done) return;
    this.done = true;
    this.endT = t;
    const { hud } = this.ctx;
    hud.setProgress(1);
    const sum = this.session.summary();
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'hits', value: sum.hits, unit: 'count', better: 'higher' },
        secondary: [{ key: 'losses', value: sum.losses, unit: 'count' }],
        score: 0,
        level: 1,
      });
      return;
    }
    this.ctx.finish(this.buildResult(sum));
  }

  private buildResult(sum: BalanceSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const secondary: Metric[] = [{ key: 'losses', value: sum.losses, unit: 'count' }];
    if (sum.accuracy !== null) secondary.push({ key: 'accuracy', value: sum.accuracy, unit: 'percent' });
    if (sum.rtMean !== null) secondary.push({ key: 'rt_mean', value: sum.rtMean, unit: 'ms' });
    secondary.push({ key: 'misses', value: sum.misses, unit: 'count' });
    const rows: ResultDetailRow[] = [{ label: texts.metrics.stray, value: fmt.num(sum.stray, 0) }];
    if (sum.lossesPerMin !== null) rows.push({ label: texts.metrics.losses_per_min, value: fmt.num(sum.lossesPerMin, 1) });
    if (sum.rtMedian !== null) rows.push({ label: texts.metrics.rt_median, value: fmt.ms(sum.rtMedian) });
    if (sum.rtSd !== null) rows.push({ label: texts.metrics.rt_sd, value: fmt.ms(sum.rtSd) });
    return {
      primary: { key: 'hits', value: sum.hits, unit: 'count', better: 'higher' },
      secondary,
      details: [{ title: texts.feedback.moreTitle, rows, note: texts.feedback.moreNote }],
      score: pointsFor(sum.hits),
      level: 1,
      tip: tipFor(sum),
    };
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, now: number): void {
    const t = Math.min(now, this.endT);
    const { w, h, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    if (this.p.fixation === 'yes') this.drawFixation(g);
    const k = this.ppc();
    const rPx = this.session.spots.r * k;
    for (const gn of this.gone) {
      const a = 0.6 * (1 - clamp((t - gn.t0) / GONE_MS, 0, 1));
      g.save();
      g.globalAlpha = a;
      ring(g, gn.x, gn.y, rPx, '#FFFFFF', Math.max(2, rPx * 0.06), [6, 6]);
      g.restore();
    }
    if (this.started) for (const sp of this.session.spots.active) this.drawSpot(g, sp, t, rPx);
    for (const b of this.bursts) {
      const kk = clamp((t - b.t0) / BURST_MS, 0, 1);
      g.save();
      g.globalAlpha = 0.7 * (1 - kk);
      ring(g, b.x, b.y, b.r * (1 + 0.5 * easeOut(kk)), '#FFFFFF', Math.max(2, b.r * 0.08));
      g.restore();
    }
    const cs = clamp(rPx * 0.45, 10, 30);
    for (const m of this.checks) drawSoftCheck(g, m.x, m.y, cs, markAlpha(t - m.t0, CHECK_MS));
    const xs = clamp(this.ctx.stage.u * 2.2, 10, 22);
    for (const m of this.crosses) drawSoftCross(g, m.x, m.y, xs, markAlpha(t - m.t0, CROSS_MS));
    const { texts } = this.ctx;
    drawHelperButton(g, this.button(), texts.feedback.btnLoss, texts.feedback.keyLoss, { pressedAge: this.lossPress === null ? null : t - this.lossPress });
  }

  private drawSpot(g: CanvasRenderingContext2D, sp: Spot, t: number, rPx: number): void {
    const c = this.toPx(sp.x, sp.y);
    const age = t - sp.shownAt;
    if (age < 0) return;
    const a = 0.35 + 0.65 * easeOut(age / FADE_IN_MS);
    const color = this.colorOf.get(sp.id) ?? SPOT_COLORS[0];
    g.save();
    g.globalAlpha = a;
    circle(g, c.x, c.y, rPx, color);
    ring(g, c.x, c.y, Math.max(1, rPx - Math.max(1.5, rPx * 0.03)), 'rgba(255,255,255,0.9)', Math.max(2, rPx * 0.06));
    ring(g, c.x, c.y, rPx + 1.5, 'rgba(5,10,20,0.6)', 2);
    g.restore();
  }

  /** Kreuz in der Mitte des Feldes (Sehhilfe zum Halten des Blicks) */
  private drawFixation(g: CanvasRenderingContext2D): void {
    const f = this.field();
    const cx = f.x + f.w / 2;
    const cy = f.y + f.h / 2;
    const arm = clamp(this.ppc() * 0.4, 9, 20);
    g.save();
    g.lineCap = 'round';
    g.strokeStyle = CROSS_COLOR;
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(cx - arm, cy);
    g.lineTo(cx + arm, cy);
    g.moveTo(cx, cy - arm);
    g.lineTo(cx, cy + arm);
    g.stroke();
    g.restore();
  }
}

export const laborBalanceTouch: ExerciseDefinition = {
  id: 'labor-balance-touch',
  category: 'bewegung',
  minutes: 2,
  color: '#2E6DB4',
  icon:
    '<circle cx="16" cy="14" r="6.5" fill="currentColor"/><circle cx="35" cy="20" r="4" fill="currentColor" opacity=".45"/><path d="M10 40h28" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/><path d="M24 40l-3-8m3 8l3-8m-3 0v-6" stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none"/><circle cx="24" cy="22.5" r="2.6" fill="currentColor"/>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  create: (ctx) => new BalanceTouch(ctx),
};
