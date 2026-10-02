/**
 * Doppelaufgabe (Labor) – In der Mitte läuft eine Zahlenfolge: Bei der Zielzahl berührst du die Mitte. Gleichzeitig
 * erscheinen am Rand Punkte, die du ebenfalls berührst. Wahlweise nur eine der beiden Aufgaben (Vergleichsbasis).
 *
 * Portierung der Labor-Übung `dual` (Prototyp ex/dual.js): Einstellungen (`ctx.params`, siehe logic.ts `PARAMS`),
 * Größen in cm (`ctx.calib`), reine Logik in logic.ts (`DualSession`; der Rand-Teil nutzt `SpotSession` aus Spot-Touch).
 *
 * - Hauptwert: erkannte Zielzahlen in der Mitte (`c_hits`, höher = mehr); im Modus „Nur Rand“ die getroffenen Punkte (`p_hits`).
 * - Größen in cm sprengen die Bühne nie (`calib.fitCm`, zusätzlich Platz neben dem Kreis in der Mitte).
 * - Rückmeldung weich: ✓ am Treffer, ✗ am Fehltipp, kein Blitz, kein Rot, keine Vollflächeneffekte; die Zahl in der Mitte
 *   blendet in 120 ms ein und wechselt höchstens 2,5-mal pro Sekunde; im Intro `warning: 'flash'` und ein Hinweis in
 *   „Gut zu wissen“. Ton nur, wenn „Ton“ an ist.
 * - Gemessen wird nur dein Tippen, nicht dein Blick: „Blick in der Mitte lassen“ ist eine Bitte.
 */
import { background, circle, ring, text } from '../../core/draw';
import { calibOf } from '../../core/calib';
import { paramsOf } from '../../core/params';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, Metric, PointerInfo, ResultDetailRow, ResultDetailTable } from '../../core/types';
import { playField, restPoint } from '../_shared/tippziele';
import { drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import type { Spot } from '../labor-spot-touch/logic';
import {
  DualSession,
  dualParams,
  MIN_HIT_PX,
  PARAMS,
  pointsFor,
  primaryOf,
  QUICK_DURATION_S,
  tipFor,
  type DualParams,
  type DualSummary,
} from './logic';
import { de, it } from './texts';

const FADE_IN_MS = 110;
const DIGIT_FADE_MS = 120;
const CHECK_MS = 520;
const CROSS_MS = 650;
const GONE_MS = 350;
const LEAD_MS = 500;
const SPOT_COLORS = ['#FFD23F', '#3BCEAC', '#F2708F', '#5DADE2'];
const RING_COLOR = 'rgba(232,238,247,0.38)';
const DIGIT_COLOR = '#E1E8F3';
const CROSS_COLOR = '#9AA7B8';

// Intro-Film: Zahlen wechseln langsam, Zielzahl 7 erscheint als 3. und 6. Zahl, dazwischen Randpunkte
const DEMO_PARAMS: Partial<DualParams> = { mode: 'dual', durationS: 20, intervalMs: 1600, targetDigit: 7, targetRate: 20, spotCm: 3, persistenceS: 2.4, gapMs: 1500, sound: 'no' };
const DEMO_LEAD_MS = 1200;
const DEMO_TARGET_STEPS = [2, 5];
const DEMO_HITS = 2;
const DEMO_END_MS = 12500;

interface Mark {
  x: number;
  y: number;
  t0: number;
}

class Doppelaufgabe implements Exercise {
  private readonly demo: boolean;
  private readonly p: DualParams;
  private readonly session: DualSession;
  private startAt = 0;
  private started = false;
  private done = false;
  private endT = Infinity;
  private endAt = Infinity;
  private seenSpotId = 0;
  private seenTrials = 0;
  private seenSteps = 0;
  private spawnNr = 0;
  private demoCentral = 0;
  private plannedSpots = new Set<number>();
  private plannedSteps = new Set<number>();
  private checks: Mark[] = [];
  private crosses: Mark[] = [];
  private gone: Mark[] = [];
  private colorOf = new Map<number, string>();

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = dualParams(paramsOf(ctx, PARAMS));
    this.p = this.demo
      ? { ...base, ...DEMO_PARAMS }
      : ctx.quick
        ? { ...base, durationS: Math.min(base.durationS, QUICK_DURATION_S), targetRate: Math.max(base.targetRate, 40) }
        : base;
    const f = this.field();
    const ppc = this.ppc();
    this.session = new DualSession(this.p, {
      rng: ctx.rng,
      fieldWcm: f.w / ppc,
      fieldHcm: f.h / ppc,
      minHitRadiusCm: MIN_HIT_PX / ppc,
      spotCm: calibOf(ctx).fitCm(this.p.spotCm),
      plan: this.demo ? (n) => DEMO_TARGET_STEPS.includes(n) : undefined,
    });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private field(): { x: number; y: number; w: number; h: number } {
    const s = this.ctx.stage;
    return this.demo ? playField(s, true) : { x: 0, y: 0, w: s.w, h: s.h };
  }

  private ppc(): number {
    return calibOf(this.ctx).pxPerCm;
  }

  private center(): { x: number; y: number } {
    const f = this.field();
    return { x: f.x + f.w / 2, y: f.y + f.h / 2 };
  }

  private toPx(xCm: number, yCm: number): { x: number; y: number } {
    const f = this.field();
    const k = this.ppc();
    return { x: f.x + xCm * k, y: f.y + yCm * k };
  }

  resize(): void {
    const f = this.field();
    const k = this.ppc();
    this.session.setField(f.w / k, f.h / k, calibOf(this.ctx).fitCm(this.p.spotCm));
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    this.startAt = t + (this.demo ? DEMO_LEAD_MS : LEAD_MS);
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    hud.setLabel(this.demo ? null : this.label(this.p.durationS));
    if (this.demo) {
      const r = restPoint(this.ctx.stage);
      ghost.moveTo(r.x, r.y, { move: 0 });
      hud.caption(texts.captions.wait);
    }
  }

  private label(sec: number): string {
    const { texts } = this.ctx;
    const s = String(Math.ceil(sec));
    return this.p.mode === 'periphery' ? texts.feedback.labelEdge.replace('{s}', s) : texts.feedback.labelCenter.replace('{s}', s).replace('{d}', String(this.p.targetDigit));
  }

  update(_dt: number, t: number): void {
    if (this.done) return;
    const s = this.session;
    if (!this.started) {
      if (t < this.startAt) return;
      this.started = true;
      s.start(t);
      if (this.demo) this.ctx.hud.caption(this.ctx.texts.captions.center);
    }
    if (this.demo && t >= this.endAt) {
      this.finishSession(t);
      return;
    }
    s.update(t);
    this.noticeEvents(t);
    if (this.ctx.autoplay) this.autoUpdate();
    this.updateHud(t);
    if (s.finished || (this.demo && s.startedAt !== null && t - s.startedAt >= DEMO_END_MS)) this.finishSession(t);
    this.prune(t);
  }

  /** Neue Randpunkte, neue Zahlen und verpasste Punkte bemerken (Film, Auflösen verpasster Punkte) */
  private noticeEvents(t: number): void {
    const s = this.session;
    if (s.spots) {
      for (const sp of s.spots.active) {
        if (sp.id > this.seenSpotId) {
          this.seenSpotId = sp.id;
          this.spawnNr++;
          this.colorOf.set(sp.id, SPOT_COLORS[(sp.id - 1) % SPOT_COLORS.length]);
          if (this.demo) this.demoSpot(sp);
        }
      }
      while (this.seenTrials < s.spots.trials.length) {
        const tr = s.spots.trials[this.seenTrials++];
        if (tr.hit) continue;
        const c = this.toPx(tr.xCm, tr.yCm);
        this.gone.push({ x: c.x, y: c.y, t0: t });
      }
    }
    const c = s.central;
    if (c && c.steps > this.seenSteps) {
      this.seenSteps = c.steps;
      if (this.demo && c.isTarget) this.demoTarget();
    }
  }

  private updateHud(t: number): void {
    const { hud } = this.ctx;
    const s = this.session;
    hud.setProgress(s.elapsedFrac(t));
    if (this.demo) return;
    hud.setScore(s.summary().hitsTotal);
    hud.setLabel(this.label(s.remainingS(t)));
  }

  // --- Eingabe ---

  pointerDown(p: PointerInfo): void {
    if (this.done || !this.started) return;
    const f = this.field();
    const k = this.ppc();
    const res = this.session.tap((p.x - f.x) / k, (p.y - f.y) / k, p.t);
    if (!res || res.type === 'ignored') return;
    const { sfx, hud, stage, fmt } = this.ctx;
    const sound = this.p.sound === 'yes';
    if (res.type === 'hit' && 'spot' in res) {
      const c = this.toPx(res.spot.x, res.spot.y);
      this.checks.push({ x: c.x, y: c.y, t0: p.t });
      if (sound) sfx.good();
      const size = clamp(stage.u * 4, 16, 28);
      const r = this.session.spots!.r * k;
      hud.toast(`✓ ${fmt.ms(res.rt)}`, 'good', { x: clamp(c.x, 40, stage.w - 40), y: Math.max(size * 1.1, c.y - r * 1.1 - size * 0.8), ms: 700, size });
    } else if (res.type === 'hit') {
      const c = this.center();
      this.checks.push({ x: c.x, y: c.y - this.session.centralR * k - clamp(stage.u * 3, 14, 26), t0: p.t });
      if (sound) sfx.good();
      if (this.demo) this.demoHit();
    } else {
      // false_alarm (Mitte ohne Zielzahl) oder stray (daneben)
      this.crosses.push({ x: p.x, y: p.y, t0: p.t });
      if (sound) sfx.bad();
    }
  }

  // --- Intro-Film ---

  private demoSpot(sp: Spot): void {
    const { hud, ghost, texts } = this.ctx;
    if (this.spawnNr === 1) hud.caption(texts.captions.edge);
    const c = this.toPx(sp.x, sp.y);
    ghost.tap(c.x, c.y, { delay: 450, move: 520 });
  }

  private demoTarget(): void {
    const { hud, ghost, texts } = this.ctx;
    hud.caption(texts.captions.target);
    const c = this.center();
    ghost.tap(c.x, c.y, { delay: 250, move: 450 });
  }

  private demoHit(): void {
    const { hud, texts } = this.ctx;
    this.demoCentral++;
    if (this.demoCentral === 1) hud.caption(texts.captions.both);
    if (this.demoCentral >= DEMO_HITS) {
      hud.caption(texts.captions.count);
      this.endAt = this.ctx.now() + 1500;
    }
  }

  /** Autoplay (Tests): erkennt Zielzahlen meist, tippt Randpunkte meist, selten daneben; die Hand schafft nicht immer beides */
  private autoUpdate(): void {
    if (this.demo) return;
    const { ghost, rng } = this.ctx;
    if (!ghost.idle) return;
    const s = this.session;
    const k = this.ppc();
    const c = s.central;
    if (c && c.isTarget && !c.answered && !this.plannedSteps.has(c.steps)) {
      this.plannedSteps.add(c.steps);
      if (rng.chance(0.85)) {
        const move = rng.range(200, 300);
        const room = this.p.intervalMs - move - 150;
        if (room >= 60) {
          const ctr = this.center();
          const r = s.centralR * k * 0.5;
          const a = rng.range(0, Math.PI * 2);
          ghost.tap(ctr.x + Math.cos(a) * r * rng.next(), ctr.y + Math.sin(a) * r * rng.next(), { delay: rng.range(40, Math.min(500, room)), move });
          return;
        }
      }
    }
    const sp = s.spots?.active.find((a) => !this.plannedSpots.has(a.id));
    if (!sp || !s.spots) return;
    this.plannedSpots.add(sp.id);
    if (rng.chance(0.08)) return;
    const move = rng.range(260, 420);
    const room = this.p.persistenceS * 1000 - move - 120;
    if (room < 80) return;
    const delay = rng.range(60, Math.min(700, room));
    const pt = this.toPx(sp.x, sp.y);
    const rPx = s.spots.r * k;
    const off = rng.chance(0.07) ? rPx * 2.6 : Math.min(rPx * 0.9, Math.abs(rng.normal()) * rPx * 0.3);
    const ang = rng.range(0, Math.PI * 2);
    ghost.tap(pt.x + Math.cos(ang) * off, pt.y + Math.sin(ang) * off, { delay, move });
  }

  private prune(t: number): void {
    if (this.checks.length) this.checks = this.checks.filter((m) => t - m.t0 < CHECK_MS);
    if (this.crosses.length) this.crosses = this.crosses.filter((m) => t - m.t0 < CROSS_MS);
    if (this.gone.length) this.gone = this.gone.filter((m) => t - m.t0 < GONE_MS);
  }

  // --- Ende ---

  private finishSession(t: number): void {
    if (this.done) return;
    this.done = true;
    this.endT = t;
    this.session.update(this.session.startedAt === null ? t : Math.max(t, this.session.startedAt + this.p.durationS * 1000));
    this.ctx.hud.setProgress(1);
    const sum = this.session.summary();
    if (this.demo) {
      const pr = primaryOf(sum);
      this.ctx.finish({ primary: { key: pr.key, value: pr.value, unit: 'count', better: 'higher' }, secondary: [], score: 0, level: 1 });
      return;
    }
    if (this.p.sound === 'yes') this.ctx.sfx.done();
    this.ctx.finish(this.buildResult(sum));
  }

  private buildResult(sum: DualSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const pr = primaryOf(sum);
    const c = sum.central;
    const e = sum.spots;
    const sec: Metric[] = [];
    const details: ResultDetailTable[] = [];
    if (c && e) {
      sec.push({ key: 'c_misses', value: c.misses, unit: 'count' });
      if (c.rtMean !== null) sec.push({ key: 'c_rt', value: c.rtMean, unit: 'ms' });
      sec.push({ key: 'p_hits', value: e.hits, unit: 'count' });
      if (e.rtMean !== null) sec.push({ key: 'p_rt', value: e.rtMean, unit: 'ms' });
      const rowsC: ResultDetailRow[] = [
        { label: texts.metrics.c_targets, value: fmt.num(c.targets, 0) },
        { label: texts.metrics.c_false, value: fmt.num(c.falseAlarms, 0) },
      ];
      const rowsE: ResultDetailRow[] = [
        { label: texts.metrics.p_misses, value: fmt.num(e.misses, 0) },
        { label: texts.metrics.p_stray, value: fmt.num(e.stray, 0) },
      ];
      details.push({ title: texts.feedback.titleCenter, rows: rowsC }, { title: texts.feedback.titleEdge, rows: rowsE, note: texts.feedback.moreNote });
    } else if (c) {
      sec.push({ key: 'c_targets', value: c.targets, unit: 'count' }, { key: 'c_misses', value: c.misses, unit: 'count' }, { key: 'c_false', value: c.falseAlarms, unit: 'count' });
      if (c.rtMean !== null) sec.push({ key: 'c_rt', value: c.rtMean, unit: 'ms' });
    } else if (e) {
      sec.push({ key: 'p_misses', value: e.misses, unit: 'count' }, { key: 'p_stray', value: e.stray, unit: 'count' });
      if (e.rtMean !== null) sec.push({ key: 'p_rt', value: e.rtMean, unit: 'ms' });
    }
    return {
      primary: { key: pr.key, value: pr.value, unit: 'count', better: 'higher' },
      secondary: sec.slice(0, 4),
      ...(details.length ? { details } : {}),
      score: pointsFor(sum.hitsTotal),
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
    if (this.p.mode === 'periphery') this.drawCross(g);
    else this.drawCentral(g, t);
    const k = this.ppc();
    const s = this.session;
    const rPx = (s.spots?.r ?? 0) * k;
    for (const gn of this.gone) {
      g.save();
      g.globalAlpha = 0.6 * (1 - clamp((t - gn.t0) / GONE_MS, 0, 1));
      ring(g, gn.x, gn.y, rPx, '#FFFFFF', Math.max(2, rPx * 0.06), [6, 6]);
      g.restore();
    }
    if (this.started && s.spots) for (const sp of s.spots.active) this.drawSpot(g, sp, t, rPx);
    const cs = clamp(Math.max(rPx, this.session.centralR * k * 0.5) * 0.45, 10, 30);
    for (const m of this.checks) drawSoftCheck(g, m.x, m.y, cs, markAlpha(t - m.t0, CHECK_MS));
    const xs = clamp(this.ctx.stage.u * 2.2, 10, 22);
    for (const m of this.crosses) drawSoftCross(g, m.x, m.y, xs, markAlpha(t - m.t0, CROSS_MS));
  }

  private drawCentral(g: CanvasRenderingContext2D, t: number): void {
    const c = this.center();
    const rPx = this.session.centralR * this.ppc();
    ring(g, c.x, c.y, rPx, RING_COLOR, 3);
    const cs = this.session.central;
    if (!this.started || !cs || cs.symbol === null) return;
    const a = 0.35 + 0.65 * easeOut((t - cs.shownAt) / DIGIT_FADE_MS);
    text(g, cs.symbol, c.x, c.y + 1, rPx * 1.15, DIGIT_COLOR, { weight: 700, alpha: clamp(a, 0, 1) });
  }

  private drawSpot(g: CanvasRenderingContext2D, sp: Spot, t: number, rPx: number): void {
    const c = this.toPx(sp.x, sp.y);
    const age = t - sp.shownAt;
    if (age < 0) return;
    const a = 0.35 + 0.65 * easeOut(age / FADE_IN_MS);
    g.save();
    g.globalAlpha = a;
    circle(g, c.x, c.y, rPx, this.colorOf.get(sp.id) ?? SPOT_COLORS[0]);
    ring(g, c.x, c.y, Math.max(1, rPx - Math.max(1.5, rPx * 0.03)), 'rgba(255,255,255,0.9)', Math.max(2, rPx * 0.06));
    ring(g, c.x, c.y, rPx + 1.5, 'rgba(5,10,20,0.6)', 2);
    g.restore();
  }

  /** Kreuz in der Mitte (nur im Modus „Nur Rand“) */
  private drawCross(g: CanvasRenderingContext2D): void {
    const c = this.center();
    const arm = clamp(this.ppc() * 0.4, 9, 20);
    g.save();
    g.lineCap = 'round';
    g.strokeStyle = CROSS_COLOR;
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(c.x - arm, c.y);
    g.lineTo(c.x + arm, c.y);
    g.moveTo(c.x, c.y - arm);
    g.lineTo(c.x, c.y + arm);
    g.stroke();
    g.restore();
  }
}

export const laborDoppelaufgabe: ExerciseDefinition = {
  id: 'labor-doppelaufgabe',
  category: 'konzentration',
  minutes: 1,
  color: '#7A5195',
  icon:
    '<circle cx="24" cy="24" r="9" fill="none" stroke="currentColor" stroke-width="3.2"/><path d="M21 24h6M24 21v6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="8.5" cy="9" r="4.5" fill="currentColor"/><circle cx="40" cy="38.5" r="4.5" fill="currentColor" opacity=".5"/><circle cx="40" cy="9" r="3" fill="none" stroke="currentColor" stroke-width="2.6"/>',
  texts: { de, it },
  warning: 'flash',
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  create: (ctx) => new Doppelaufgabe(ctx),
};
