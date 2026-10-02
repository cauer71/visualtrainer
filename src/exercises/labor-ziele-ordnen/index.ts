/**
 * Bewegte Ziele ordnen (Labor) – Zahlen, Buchstaben, Wörter oder Rechnungen bewegen sich über die Fläche; man berührt
 * sie in der richtigen Reihenfolge.
 *
 * Portierung der Labor-Übung `ordering` (Prototyp ex/ordering.js): Größen in cm (`ctx.calib`), Einstellungen
 * (`ctx.params`, siehe logic.ts `PARAMS`), reine Logik in logic.ts (`OrderSession`). Die Darstellung rechnet Pixel der
 * Bühne in cm des Spielfelds um (Feld = Bühne ohne Rand; im Intro-Film oberhalb von Hand und Bildunterschrift).
 *
 * - Hauptwert: Gesamtzeit (`total`, weniger = besser), keine Stufen (`level` = 1). Mit Zeitlimit endet der Lauf nach
 *   Ablauf der Zeit, die Gesamtzeit ist dann das Limit (`solved` zeigt, wie weit es gereicht hat).
 * - Bewegung rechnet mit der Zeitdifferenz (bildratenunabhängig); Zeichengröße wird auf kleinen Bühnen begrenzt.
 * - Rückmeldung weich: ✓ am richtigen Ziel (es löst sich auf), ✗ am falschen Ziel bzw. am Fehltipp; kein Blitz,
 *   keine Vollflächeneffekte. Ton nur, wenn „Ton“ an ist.
 * - Gemessen wird nur dein Tippen, nicht dein Blick; die App prüft nicht, ob du das Ziel gelesen oder geraten hast.
 */
import { background, C, fillRR, ring, rrPath, text } from '../../core/draw';
import { paramsOf } from '../../core/params';
import { calibOf } from '../../core/calib';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, Metric, PointerInfo, ResultDetailRow } from '../../core/types';
import { playField, restPoint } from '../_shared/tippziele';
import { drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import {
  type Item,
  MIN_HIT_PX,
  OrderSession,
  orderParams,
  type OrderParams,
  type OrderSummary,
  PARAMS,
  pointsFor,
  QUICK_COUNT,
  QUICK_MAX_S,
  tipFor,
} from './logic';
import { de, it } from './texts';

/** Anlaufzeit mit stehenden Zielen vor dem Start (Spielmodus) */
const LEAD_MS = 700;
const CHECK_MS = 520;
const CROSS_MS = 650;
const BURST_MS = 300;

const BOX_FILL = '#17263F';
const BOX_LINE = 'rgba(232,238,247,0.38)';

// Intro-Film: vier Zahlen auf einer flachen Ellipse, langsam; ein falsches Ziel wird absichtlich berührt
const DEMO_PARAMS: Partial<OrderParams> = { content: 'numbers', count: 4, motion: 'ellipse', speedCmS: 2.2, sizeCm: 2, direction: 'cw', timeLimitS: 0, sound: 'no' };
const DEMO_LEAD_MS = 1000;
/** Ablauf der Hand im Film: Nummer (ab 0) des Ziels in der Reihenfolge; `wrong` = absichtlich ein späteres Ziel */
const DEMO_STEPS: Array<{ order: number; wrong?: boolean }> = [{ order: 0 }, { order: 2, wrong: true }, { order: 1 }, { order: 2 }, { order: 3 }];
/** Sicherheitsnetz: der Film endet spätestens so viele ms nach dem Start */
const DEMO_END_MS = 12500;

interface Mark {
  x: number;
  y: number;
  t0: number;
}
interface Burst extends Mark {
  r: number;
}

class ZieleOrdnen implements Exercise {
  private readonly demo: boolean;
  private readonly p: OrderParams;
  private readonly session: OrderSession;
  private startAt = 0;
  private started = false;
  private done = false;
  private endT = Infinity;
  private endAt = Infinity;
  private checks: Mark[] = [];
  private crosses: Mark[] = [];
  private bursts: Burst[] = [];
  private demoStep = 0;
  private lastLabel = '';

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = orderParams(paramsOf(ctx, PARAMS));
    const calib = calibOf(ctx);
    let p: OrderParams = this.demo ? { ...base, ...DEMO_PARAMS } : base;
    if (!this.demo && ctx.quick) {
      p = { ...p, count: Math.min(p.count, QUICK_COUNT), timeLimitS: p.timeLimitS > 0 ? Math.min(p.timeLimitS, QUICK_MAX_S) : QUICK_MAX_S };
    }
    this.p = { ...p, sizeCm: calib.fitCm(p.sizeCm) };
    const f = this.field();
    const ppc = calib.pxPerCm;
    this.session = new OrderSession(this.p, { rng: ctx.rng, fieldWcm: f.w / ppc, fieldHcm: f.h / ppc, minHitHalfCm: MIN_HIT_PX / ppc });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private field(): { x: number; y: number; w: number; h: number } {
    return playField(this.ctx.stage, this.demo);
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
    this.session.setField(f.w / k, f.h / k);
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    this.startAt = t + (this.demo ? DEMO_LEAD_MS : LEAD_MS);
    hud.setProgress(0);
    hud.setScore(null);
    this.updateLabel(0);
    if (this.demo) {
      const r = restPoint(this.ctx.stage);
      ghost.moveTo(r.x, r.y, { move: 0 });
      hud.caption(texts.captions.watch);
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
    if (this.ctx.autoplay) this.autoUpdate();
    this.updateHud(t);
    if (s.finished || (this.demo && t - this.startAt >= DEMO_END_MS)) this.finishSession(t);
    this.prune(t);
  }

  private updateLabel(t: number): void {
    const { hud, texts } = this.ctx;
    if (this.demo) return;
    const s = this.session;
    const rem = this.started ? s.remainingS(t) : this.p.timeLimitS > 0 ? this.p.timeLimitS : null;
    const tpl = rem === null ? texts.feedback.label : texts.feedback.labelLimit;
    const label = tpl.replace('{n}', String(s.next)).replace('{total}', String(s.items.length)).replace('{s}', String(Math.ceil(rem ?? 0)));
    if (label !== this.lastLabel) {
      this.lastLabel = label;
      hud.setLabel(label);
    }
  }

  private updateHud(t: number): void {
    const s = this.session;
    const solvedFrac = s.next / s.items.length;
    const timeFrac = this.p.timeLimitS > 0 ? s.elapsedMs(t) / (this.p.timeLimitS * 1000) : 0;
    this.ctx.hud.setProgress(Math.max(solvedFrac, clamp(timeFrac, 0, 1)));
    this.updateLabel(t);
  }

  // --- Eingabe ---

  pointerDown(p: PointerInfo): void {
    if (this.done || !this.started) return;
    const f = this.field();
    const k = this.ppc();
    const res = this.session.tap((p.x - f.x) / k, (p.y - f.y) / k, p.t);
    if (!res || res.type === 'ignored') return;
    const { sfx } = this.ctx;
    if (res.type === 'hit') {
      const c = this.toPx(res.item.x, res.item.y);
      this.checks.push({ x: c.x, y: c.y, t0: p.t });
      if (!this.ctx.reducedMotion) this.bursts.push({ x: c.x, y: c.y, r: Math.max(res.item.hh, res.item.hw * 0.6) * k, t0: p.t });
      if (this.p.sound === 'yes') sfx.good();
      if (this.demo) this.demoTapped();
    } else if (res.type === 'wrong') {
      const c = this.toPx(res.item.x, res.item.y);
      this.crosses.push({ x: c.x, y: c.y, t0: p.t });
      if (this.p.sound === 'yes') sfx.bad();
      if (this.demo) this.ctx.hud.caption(this.ctx.texts.captions.wrong);
    } else {
      this.crosses.push({ x: p.x, y: p.y, t0: p.t });
      if (this.p.sound === 'yes') sfx.bad();
    }
  }

  // --- Intro-Film ---

  private demoTapped(): void {
    const { hud, texts } = this.ctx;
    const n = this.session.next;
    if (n === 2) hud.caption(texts.captions.next);
    if (this.session.finished) {
      hud.caption(texts.captions.done);
      this.endAt = this.ctx.now() + 1500;
    }
  }

  /** Eine Handbewegung zum vorausberechneten Ort des Ziels planen (Ziele bewegen sich während der Fahrt) */
  private planTap(item: Item, delay: number, move: number, offCm = 0, angle = 0): void {
    const lead = delay + move + 20;
    const pos = this.session.positionAfter(item, lead);
    const c = this.toPx(pos.x + Math.cos(angle) * offCm, pos.y + Math.sin(angle) * offCm);
    this.ctx.ghost.tap(c.x, c.y, { delay, move });
  }

  /** Film und Autoplay (Tests): die Hand berührt die Ziele der Reihe nach, im Film mit einem absichtlich falschen */
  private autoUpdate(): void {
    const { ghost, rng } = this.ctx;
    const s = this.session;
    if (!ghost.idle || s.finished) return;
    if (this.demo) {
      const step = DEMO_STEPS[this.demoStep];
      if (!step) return;
      this.demoStep++;
      const idx = step.wrong ? s.order[Math.min(step.order, s.order.length - 1)] : s.order[s.next];
      if (this.demoStep === 1) this.ctx.hud.caption(this.ctx.texts.captions.tap);
      this.planTap(s.items[idx], this.demoStep === 1 ? 700 : 800, 850);
      return;
    }
    const exp = s.expected();
    if (!exp) return;
    const delay = rng.range(200, 650);
    const move = rng.range(420, 800);
    const roll = rng.next();
    if (roll < 0.08 && s.next + 1 < s.order.length) {
      // ein falsches Ziel
      const wrong = s.items[s.order[s.next + 1 + rng.int(s.order.length - s.next - 1)]];
      this.planTap(wrong, delay, move);
    } else if (roll < 0.14) {
      // daneben
      this.planTap(exp, delay, move, s.sizeCm * 2.4 + 1, rng.range(0, Math.PI * 2));
    } else {
      this.planTap(exp, delay, move);
    }
  }

  private prune(t: number): void {
    if (this.checks.length) this.checks = this.checks.filter((m) => t - m.t0 < CHECK_MS);
    if (this.crosses.length) this.crosses = this.crosses.filter((m) => t - m.t0 < CROSS_MS);
    if (this.bursts.length) this.bursts = this.bursts.filter((m) => t - m.t0 < BURST_MS);
  }

  // --- Ende ---

  private finishSession(t: number): void {
    if (this.done) return;
    this.done = true;
    this.endT = t;
    const { hud, sfx } = this.ctx;
    hud.setProgress(1);
    if (!this.session.finished) this.session.finish(t);
    const sum = this.session.summary();
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'total', value: sum.totalMs ?? 0, unit: 'time', better: 'lower' },
        secondary: [{ key: 'wrong', value: sum.wrong, unit: 'count' }],
        score: 0,
        level: 1,
      });
      return;
    }
    if (this.p.sound === 'yes') sfx.done();
    this.ctx.finish(this.buildResult(sum));
  }

  private buildResult(sum: OrderSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const secondary: Metric[] = [
      { key: 'solved', value: sum.solved, unit: 'count' },
      { key: 'wrong', value: sum.wrong, unit: 'count' },
      { key: 'stray', value: sum.stray, unit: 'count' },
    ];
    if (sum.tMeanMs !== null) secondary.push({ key: 't_mean', value: sum.tMeanMs, unit: 'ms' });
    const rows: ResultDetailRow[] = [];
    if (sum.tSdMs !== null) rows.push({ label: texts.metrics.t_sd, value: fmt.ms(sum.tSdMs) });
    return {
      primary: { key: 'total', value: sum.totalMs ?? 0, unit: 'time', better: 'lower' },
      secondary,
      ...(rows.length ? { details: [{ title: texts.feedback.moreTitle, rows, note: texts.feedback.moreNote }] } : {}),
      score: pointsFor(sum.solved),
      level: 1,
      tip: tipFor(sum),
    };
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, now: number): void {
    const t = Math.min(now, this.endT);
    const { w, h, dpr, u } = this.ctx.stage;
    background(g, w, h, dpr);
    const f = this.field();
    const k = this.ppc();
    // Aufgabe oben im Bild
    const tsize = clamp(u * 3.4, 13, 22);
    const task = this.ctx.texts.feedback[`task_${this.p.content}`] ?? '';
    text(g, task, w / 2, Math.max(tsize * 0.9, f.y * 0.5), tsize, C.dim, { weight: 700, alpha: 0.95 });
    const sizePx = this.session.sizeCm * k;
    const fontPx = sizePx * 0.8;
    for (const it of this.session.items) {
      if (it.done) continue;
      const c = this.toPx(it.x, it.y);
      const bw = it.hw * 2 * k;
      const bh = it.hh * 2 * k;
      fillRR(g, c.x - bw / 2, c.y - bh / 2, bw, bh, Math.min(bh * 0.22, 12), BOX_FILL);
      g.save();
      rrPath(g, c.x - bw / 2 + 0.5, c.y - bh / 2 + 0.5, bw - 1, bh - 1, Math.min(bh * 0.22, 12));
      g.strokeStyle = BOX_LINE;
      g.lineWidth = 2;
      g.stroke();
      g.restore();
      text(g, it.label, c.x, c.y + fontPx * 0.04, fontPx, C.fg, { weight: 700 });
    }
    for (const b of this.bursts) {
      const kk = clamp((t - b.t0) / BURST_MS, 0, 1);
      g.save();
      g.globalAlpha = 0.7 * (1 - kk);
      ring(g, b.x, b.y, b.r * (1 + 0.5 * easeOut(kk)), '#FFFFFF', Math.max(2, b.r * 0.06));
      g.restore();
    }
    const cs = clamp(sizePx * 0.4, 10, 28);
    for (const m of this.checks) drawSoftCheck(g, m.x, m.y, cs, markAlpha(t - m.t0, CHECK_MS));
    const xs = clamp(u * 2.2, 10, 22);
    for (const m of this.crosses) drawSoftCross(g, m.x, m.y, xs, markAlpha(t - m.t0, CROSS_MS));
  }
}

export const laborZieleOrdnen: ExerciseDefinition = {
  id: 'labor-ziele-ordnen',
  category: 'konzentration',
  minutes: 2,
  color: '#7A5195',
  icon:
    '<rect x="5" y="9" width="14" height="14" rx="3.5" fill="none" stroke="currentColor" stroke-width="3.2"/><rect x="29" y="25" width="14" height="14" rx="3.5" fill="currentColor"/><path d="M12 16v0M36 32v0" stroke="#fff" stroke-width="0"/><path d="M22 16h8c4 0 6 2 6 6v1" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="1 5"/><path d="M33 20l3 4 3-4" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 34h14" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" opacity=".45"/>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  create: (ctx) => new ZieleOrdnen(ctx),
};
