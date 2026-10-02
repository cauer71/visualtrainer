/**
 * Spot-Touch (Labor) – farbige Punkte erscheinen zufällig, tippe jeden so schnell wie möglich an.
 *
 * Referenz-Portierung der Labor-Übung `spots` (Prototyp ex/spots.js): Größen in cm (`ctx.calib`), Einstellungen
 * (`ctx.params`, siehe logic.ts `PARAMS`), reine Logik in logic.ts (`SpotSession`). Die Darstellung rechnet Pixel
 * der Bühne in cm des Spielfelds um (Feld = ganze Bühne; im Intro-Film oberhalb von Hand und Bildunterschrift).
 *
 * - Hauptwert: getroffene Punkte (`hits`, höher = mehr), keine Stufen (`level` = 1).
 * - Größen in cm sprengen die Bühne nie: `calib.fitCm` begrenzt auf 0,9 × kürzere Bühnenseite; die Übung meldet das
 *   nicht als Fehler (das Intro weist darauf hin).
 * - Rückmeldung weich: ✓ am getroffenen Punkt, ✗ am Fehltipp, verpasste Punkte lösen sich als gestrichelter Ring
 *   auf; kein Blitz, keine Vollflächeneffekte, Punkte blenden in 110 ms ein. Ton nur, wenn „Ton“ an ist.
 * - Gemessen wird nur dein Tippen (Zeit vom Erscheinen bis zur Berührung), nicht dein Blick – auch nicht beim Kreuz.
 */
import { background, circle, ring } from '../../core/draw';
import { paramsOf } from '../../core/params';
import { calibOf } from '../../core/calib';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, Metric, PointerInfo, ResultDetailRow } from '../../core/types';
import { playField, restPoint, toastNear } from '../_shared/tippziele';
import { drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import {
  MIN_HIT_PX,
  PARAMS,
  pointsFor,
  QUICK_DURATION_S,
  SpotSession,
  spotParams,
  tipFor,
  type Spot,
  type SpotParams,
  type SpotSummary,
} from './logic';
import { de, it } from './texts';

const FADE_IN_MS = 110;
const CHECK_MS = 520;
const BURST_MS = 300;
const GONE_MS = 350;
const CROSS_MS = 650;
/** Kurze Anlaufzeit vor dem ersten Punkt (Spielmodus) */
const LEAD_MS = 500;

// Farben der Punkte (nur zur Abwechslung, sie bedeuten nichts); weißer Ring + Umriss halten sie sichtbar
const SPOT_COLORS = ['#FFD23F', '#3BCEAC', '#F2708F', '#5DADE2'];
const CROSS_COLOR = '#9AA7B8';

// Intro-Film: ein Punkt nach dem anderen, zwei Treffer, ein verpasster, zwei weitere Treffer
const DEMO_PARAMS: Partial<SpotParams> = { durationS: 14, diameterCm: 3.5, persistenceS: 2.4, simultaneous: 1, gapMs: 500, zone: 'all', fixation: 'no', sound: 'no' };
const DEMO_LEAD_MS = 1200;
/** Nummer (ab 1) des Punktes, den die Hand im Film auslässt */
const DEMO_MISS_NR = 3;
const DEMO_HITS = 4;
/** Sicherheitsnetz: der Film endet spätestens so viele ms nach dem ersten Punkt */
const DEMO_END_MS = 11500;

interface Gone {
  x: number;
  y: number;
  t0: number;
}
interface Mark {
  x: number;
  y: number;
  t0: number;
}
interface Burst extends Mark {
  r: number;
}

class SpotTouch implements Exercise {
  private readonly demo: boolean;
  private readonly p: SpotParams;
  private readonly session: SpotSession;
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
  private checks: Mark[] = [];
  private bursts: Burst[] = [];
  private gone: Gone[] = [];
  private crosses: Mark[] = [];
  private colorOf = new Map<number, string>();

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = spotParams(paramsOf(ctx, PARAMS));
    this.p = this.demo ? { ...base, ...DEMO_PARAMS } : ctx.quick ? { ...base, durationS: Math.min(base.durationS, QUICK_DURATION_S) } : base;
    const f = this.field();
    const ppc = calibOf(ctx).pxPerCm;
    this.session = new SpotSession(
      { ...this.p, diameterCm: this.diameterCm() },
      { rng: ctx.rng, fieldWcm: f.w / ppc, fieldHcm: f.h / ppc, minHitRadiusCm: MIN_HIT_PX / ppc },
    );
  }

  // --- Geometrie: immer live aus der Bühne ---

  /** Spielfeld in Bühnenpixeln: ganze Bühne, im Intro-Film oberhalb von Hand und Bildunterschrift */
  private field(): { x: number; y: number; w: number; h: number } {
    const s = this.ctx.stage;
    return this.demo ? playField(s, true) : { x: 0, y: 0, w: s.w, h: s.h };
  }

  /** Durchmesser in cm, auf die Bühne begrenzt */
  private diameterCm(): number {
    return calibOf(this.ctx).fitCm(this.p.diameterCm);
  }

  private ppc(): number {
    return calibOf(this.ctx).pxPerCm;
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
    hud.setLabel(this.demo ? null : texts.feedback.time.replace('{s}', String(Math.ceil(this.p.durationS))));
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
    }
    if (this.demo && t >= this.endAt) {
      this.finishSession(t);
      return;
    }
    s.update(t);
    this.noticeEvents(t);
    if (this.ctx.autoplay) this.autoUpdate();
    this.updateHud(t);
    if (s.finished || (this.demo && t - this.startAt >= DEMO_END_MS)) this.finishSession(t);
    this.prune(t);
  }

  /** Neu erschienene und verpasste Punkte bemerken (Bildunterschriften im Film, Auflösen verpasster Punkte) */
  private noticeEvents(t: number): void {
    const s = this.session;
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
      if (this.demo) this.ctx.hud.caption(this.ctx.texts.captions.late);
    }
  }

  private updateHud(t: number): void {
    const { hud, texts } = this.ctx;
    const s = this.session;
    hud.setProgress(s.elapsedFrac(t));
    if (this.demo) return;
    hud.setScore(s.trials.filter((x) => x.hit).length);
    hud.setLabel(texts.feedback.time.replace('{s}', String(Math.ceil(s.remainingS(t)))));
  }

  // --- Eingabe ---

  pointerDown(p: PointerInfo): void {
    if (this.done || !this.started) return;
    const f = this.field();
    const k = this.ppc();
    const res = this.session.tap((p.x - f.x) / k, (p.y - f.y) / k, p.t);
    if (!res || res.type === 'ignored') return;
    const { sfx, hud, stage, fmt } = this.ctx;
    if (res.type === 'hit') {
      const c = this.toPx(res.spot.x, res.spot.y);
      const rPx = this.session.r * k;
      this.checks.push({ x: c.x, y: c.y, t0: p.t });
      if (!this.ctx.reducedMotion) this.bursts.push({ x: c.x, y: c.y, r: rPx, t0: p.t });
      if (this.p.sound === 'yes') sfx.good();
      if (this.p.simultaneous <= 2) {
        const size = clamp(stage.u * 4, 16, 28);
        toastNear(hud, stage.w, `✓ ${fmt.ms(res.rt)}`, 'good', c.x, c.y - rPx * 1.1, 700, size);
      }
      if (this.demo) this.demoHit();
    } else {
      this.crosses.push({ x: p.x, y: p.y, t0: p.t });
      if (this.p.sound === 'yes') sfx.bad();
    }
  }

  // --- Intro-Film ---

  private demoSpawned(sp: Spot): void {
    const { hud, ghost, texts } = this.ctx;
    if (this.spawnNr === 1) hud.caption(texts.captions.appear);
    const c = this.toPx(sp.x, sp.y);
    if (this.spawnNr === DEMO_MISS_NR) {
      // die Hand wartet am Rand – dieser Punkt wird nicht erreicht
      const r = restPoint(this.ctx.stage);
      ghost.moveTo(r.x, r.y, { move: 600 });
      return;
    }
    ghost.tap(c.x, c.y, { delay: 450, move: 520 });
  }

  private demoHit(): void {
    const { hud, texts } = this.ctx;
    this.demoHits++;
    if (this.demoHits === 1) hud.caption(texts.captions.next);
    if (this.demoHits === DEMO_HITS - 1) hud.caption(texts.captions.count);
    if (this.demoHits >= DEMO_HITS) this.endAt = this.ctx.now() + 1400;
  }

  /** Autoplay (Tests): trifft meist mittig, selten daneben, selten gar nicht */
  private autoUpdate(): void {
    if (this.demo) return;
    const { ghost, rng } = this.ctx;
    if (!ghost.idle) return;
    const sp = this.session.active.find((a) => !this.planned.has(a.id));
    if (!sp) return;
    this.planned.add(sp.id);
    if (rng.chance(0.08)) return;
    const move = rng.range(260, 420);
    const room = this.p.persistenceS * 1000 - move - 120;
    if (room < 80) return;
    const delay = rng.range(60, Math.min(700, room));
    const c = this.toPx(sp.x, sp.y);
    const rPx = this.session.r * this.ppc();
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
  }

  // --- Ende ---

  private finishSession(t: number): void {
    if (this.done) return;
    this.done = true;
    this.endT = t;
    const { hud, sfx } = this.ctx;
    hud.setProgress(1);
    const sum = this.session.summary();
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'hits', value: sum.hits, unit: 'count', better: 'higher' },
        secondary: [{ key: 'misses', value: sum.misses, unit: 'count' }],
        score: 0,
        level: 1,
      });
      return;
    }
    if (this.p.sound === 'yes') sfx.done();
    this.ctx.finish(this.buildResult(sum));
  }

  private buildResult(sum: SpotSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const secondary: Metric[] = [];
    if (sum.rtMean !== null) secondary.push({ key: 'rt_mean', value: sum.rtMean, unit: 'ms' });
    if (sum.accuracy !== null) secondary.push({ key: 'accuracy', value: sum.accuracy, unit: 'percent' });
    secondary.push({ key: 'misses', value: sum.misses, unit: 'count' });
    secondary.push({ key: 'stray', value: sum.stray, unit: 'count' });
    const rows: ResultDetailRow[] = [];
    if (sum.rtMedian !== null) rows.push({ label: texts.metrics.rt_median, value: fmt.ms(sum.rtMedian) });
    if (sum.rtSd !== null) rows.push({ label: texts.metrics.rt_sd, value: fmt.ms(sum.rtSd) });
    if (sum.rate !== null) rows.push({ label: texts.metrics.rate, value: fmt.num(sum.rate, 1) });
    return {
      primary: { key: 'hits', value: sum.hits, unit: 'count', better: 'higher' },
      secondary,
      ...(rows.length ? { details: [{ title: texts.feedback.moreTitle, rows, note: texts.feedback.moreNote }] } : {}),
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
    const rPx = this.session.r * k;
    for (const gn of this.gone) {
      const a = 0.6 * (1 - clamp((t - gn.t0) / GONE_MS, 0, 1));
      g.save();
      g.globalAlpha = a;
      ring(g, gn.x, gn.y, rPx, '#FFFFFF', Math.max(2, rPx * 0.06), [6, 6]);
      g.restore();
    }
    if (this.started) for (const sp of this.session.active) this.drawSpot(g, sp, t, rPx);
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

export const laborSpotTouch: ExerciseDefinition = {
  id: 'labor-spot-touch',
  category: 'reaktion',
  minutes: 1,
  color: '#C8641E',
  icon:
    '<circle cx="14" cy="15" r="7.5" fill="currentColor"/><circle cx="34" cy="14" r="4.5" fill="currentColor" opacity=".45"/><circle cx="32" cy="33" r="9" fill="none" stroke="currentColor" stroke-width="3.2"/><circle cx="32" cy="33" r="3.2" fill="currentColor"/><path d="M8 38l7-4" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" fill="none"/>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  create: (ctx) => new SpotTouch(ctx),
};
