/**
 * Orts-Projektion (Labor) – Funktionsübung: Ein Punkt erscheint kurz (du siehst dabei ein Kreuz in der Mitte an) und
 * verschwindet; nach einer einstellbaren Wartezeit tippst du auf die Stelle, wo er war. Keine Brille nötig.
 *
 * Ablauf eines Punktes: Kreuz 0,7 s → Punkt (Anzeigedauer einstellbar, ab 0,1 s, an die Bildwiederholrate gebunden) → optionale
 * Wartezeit → Antwort → kurze Rückmeldung (Ort und Antwort, abschaltbar). Es erscheint immer nur ein Punkt, nie mehrmals pro
 * Sekunde. Reine Logik in logic.ts (`ProjectionSession`); Orte als Anteile des Feldes, damit eine gedrehte Bühne denselben Ort zeigt.
 *
 * - Hauptwert: beantwortete Punkte (`n`, Zahl der Eingaben, keine Leistung). Abweichung (cm, Sehwinkel), seitliche und senkrechte
 *   Verschiebung und Streuung stehen als Übungswerte im Ergebnis, ohne Deutung und ohne Richtwerte.
 * - Gemessen wird nur, wohin du tippst – nicht, ob dein Blick in der Mitte geblieben ist.
 */
import { calibOf } from '../../core/calib';
import { C, circle, ring } from '../../core/draw';
import { paramsOf } from '../../core/params';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, Metric, PointerInfo, ResultDetailRow, ResultDetailTable } from '../../core/types';
import { drawHint, pruefLayout, type PruefLayout } from '../_shared/pruefung-ui';
import { restPoint } from '../_shared/tippziele';
import { PARAMS, ProjectionSession, projectionParams, QUICK_TRIALS, tipFor, type ProjectionParams, type ProjectionSummary } from './logic';
import { de, it } from './texts';

const DOT = '#FFD23F';
const LEAD_MS = 600;
const DEMO_START_MS = 1500;
const DEMO_END_MS = 1000;
// Intro-Film: zwei Punkte, länger sichtbar, größer (die Bühne ist dort nur etwa 13 cm hoch)
const DEMO_PARAMS: Partial<ProjectionParams> = { trials: 2, flashMs: 600, delayMs: 0, zone: 'all', showTarget: true, sizeCm: 1.5 };

class OrtsProjektion implements Exercise {
  private readonly demo: boolean;
  private readonly p: ProjectionParams;
  private readonly session: ProjectionSession;
  private started = false;
  private startAt = 0;
  private done = false;
  private finishAt = -1;
  private queued = false;
  private lastCaption = '';
  private lastIdx = -1;
  private lastPhase = '';

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = projectionParams(paramsOf(ctx, PARAMS));
    this.p = this.demo ? { ...base, ...DEMO_PARAMS } : ctx.quick ? { ...base, trials: Math.min(base.trials, QUICK_TRIALS) } : base;
    const calib = calibOf(ctx);
    const f = this.layout().field;
    this.session = new ProjectionSession(this.p, ctx.rng, calib.viewDistanceCm, { w: f.w / calib.pxPerCm, h: f.h / calib.pxPerCm });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private layout(): PruefLayout {
    return pruefLayout(this.ctx.stage, this.demo, 0);
  }

  private targetPx(L: PruefLayout): { x: number; y: number } {
    const f = L.field;
    const t = this.session.target;
    return { x: f.x + t.fx * f.w, y: f.y + t.fy * f.h };
  }

  private syncField(): void {
    const calib = calibOf(this.ctx);
    const f = this.layout().field;
    this.session.setField(f.w / calib.pxPerCm, f.h / calib.pxPerCm);
  }

  resize(): void {
    if (this.ctx.autoplay) {
      this.ctx.ghost.clear();
      this.queued = false;
    }
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    this.startAt = t + (this.demo ? DEMO_START_MS : LEAD_MS);
    hud.setProgress(0);
    hud.setScore(null);
    hud.setLabel(this.demo ? null : this.label());
    if (this.demo) {
      const r = restPoint(this.ctx.stage);
      ghost.moveTo(r.x, r.y, { move: 0 });
      this.caption('look');
    }
  }

  private caption(key: string): void {
    if (this.lastCaption === key) return;
    this.lastCaption = key;
    this.ctx.hud.caption(this.ctx.texts.captions[key]);
  }

  private label(): string {
    return this.ctx.texts.feedback.progress.replace('{n}', String(Math.min(this.session.idx + 1, this.p.trials))).replace('{total}', String(this.p.trials));
  }

  update(_dt: number, t: number): void {
    if (this.done) return;
    const s = this.session;
    if (!this.started) {
      if (t < this.startAt) return;
      this.started = true;
      this.syncField();
      s.start(t);
    }
    this.syncField();
    s.update(t);
    if (s.idx !== this.lastIdx) {
      this.lastIdx = s.idx;
      this.ctx.hud.setProgress(Math.min(1, s.idx / this.p.trials));
      if (!this.demo) this.ctx.hud.setLabel(this.label());
    }
    if (s.phase !== this.lastPhase) {
      this.lastPhase = s.phase;
      if (this.demo) {
        if (s.phase === 'fix') this.caption('look');
        else if (s.phase === 'flash') this.caption('flash');
        else if (s.phase === 'respond') this.caption('tap');
      }
    }
    if (s.finished) {
      if (this.finishAt < 0) {
        this.finishAt = t + (this.demo ? DEMO_END_MS : 0);
        if (this.demo) this.caption('done');
      }
      if (t >= this.finishAt) this.finishSession();
      return;
    }
    if (this.ctx.autoplay) this.autoUpdate();
  }

  // --- Eingabe ---

  pointerDown(p: PointerInfo): void {
    if (this.done || !this.started) return;
    if (p.type === 'ghost') this.queued = false;
    const s = this.session;
    if (s.phase !== 'respond') return;
    const calib = calibOf(this.ctx);
    const tp = this.targetPx(this.layout());
    const dx = (p.x - tp.x) / calib.pxPerCm;
    const up = (tp.y - p.y) / calib.pxPerCm;
    if (s.respond(dx, up, { x: p.x, y: p.y }, p.t)) this.ctx.sfx.tap();
  }

  // --- Autoplay (Intro-Film und Tests) ---

  private autoUpdate(): void {
    const { ghost, rng } = this.ctx;
    const s = this.session;
    if (this.queued || !ghost.idle || !this.started || s.phase !== 'respond') return;
    const calib = calibOf(this.ctx);
    const tp = this.targetPx(this.layout());
    // Streuung der Hand: etwa ±0,8 cm, leicht nach rechts und oben verschoben
    const nx = (this.demo ? 0.5 : rng.range(-0.6, 1.0)) * calib.pxPerCm;
    const ny = (this.demo ? -0.4 : rng.range(-0.9, 0.5)) * calib.pxPerCm;
    const quick = this.ctx.quick;
    const delay = this.demo ? 600 : quick ? rng.range(60, 160) : rng.range(250, 700);
    const move = this.demo ? 450 : quick ? 180 : rng.range(240, 380);
    this.queued = true;
    ghost.tap(tp.x + nx, tp.y + ny, { delay, move });
  }

  // --- Ende ---

  private finishSession(): void {
    if (this.done) return;
    this.done = true;
    this.ctx.hud.setProgress(1);
    const sum = this.session.summary();
    if (this.demo) {
      this.ctx.finish({ primary: { key: 'n', value: sum.n, unit: 'count', better: 'higher' }, secondary: [], score: 0, level: 1 });
      return;
    }
    this.ctx.sfx.done();
    this.ctx.finish(this.buildResult(sum));
  }

  buildResult(sum: ProjectionSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const f = texts.feedback;
    const calib = calibOf(this.ctx);
    const secondary: Metric[] = [];
    if (sum.rtMean !== null) secondary.push({ key: 'rt_mean', value: sum.rtMean, unit: 'ms' });

    const signed = (v: number): string => `${v > 0 ? '+' : v < 0 ? '−' : ''}${fmt.num(Math.abs(v), 2)}`;
    const cm = (v: string): string => f.errValue.replace('{v}', v);
    const rows: ResultDetailRow[] = [];
    if (sum.errMean !== null) rows.push({ label: f.rowErr, value: cm(fmt.num(sum.errMean, 2)) });
    if (sum.errDeg !== null) rows.push({ label: f.rowErrDeg, value: f.degValue.replace('{v}', fmt.num(sum.errDeg, 2)), text: f.degText.replace('{d}', fmt.num(calib.viewDistanceCm, 0)) });
    if (sum.biasX !== null) rows.push({ label: f.rowBiasX, value: cm(signed(sum.biasX)), text: f.biasXText });
    if (sum.biasY !== null) rows.push({ label: f.rowBiasY, value: cm(signed(sum.biasY)), text: f.biasYText });
    if (sum.scatter !== null) rows.push({ label: f.rowScatter, value: cm(fmt.num(sum.scatter, 2)), text: f.scatterText });
    const details: ResultDetailTable[] = [{ title: f.valuesTitle, rows, note: sum.n < 20 ? `${f.valuesNote} ${f.fewNote}` : f.valuesNote }];

    const setup: ResultDetailRow[] = [
      { label: f.rowFlash, value: f.flashValue.replace('{v}', fmt.num(this.p.flashMs, 0)), text: f.flashText },
      { label: f.rowDelay, value: this.p.delayMs > 0 ? f.flashValue.replace('{v}', fmt.num(this.p.delayMs, 0)) : f.delayNone },
      { label: f.rowZone, value: this.p.zone === 'periphery' ? f.zonePeriphery : f.zoneAll },
      { label: f.rowShow, value: this.p.showTarget ? f.showYes : f.showNo, text: calib.calibrated ? undefined : f.notCalibrated },
    ];
    details.push({ title: f.setupTitle, rows: setup });

    return {
      primary: { key: 'n', value: sum.n, unit: 'count', better: 'higher' },
      secondary,
      details,
      score: sum.n,
      level: 1,
      tip: tipFor(sum),
    };
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D): void {
    const { w, h } = this.ctx.stage;
    g.fillStyle = C.bg;
    g.fillRect(0, 0, w, h);
    if (!this.started) return;
    const s = this.session;
    const L = this.layout();
    const f = L.field;
    const cx = f.x + f.w / 2;
    const cy = f.y + f.h / 2;
    const r = calibOf(this.ctx).sizePx(this.p.sizeCm) / 2;
    if (s.phase === 'fix' || s.phase === 'flash' || s.phase === 'delay') {
      g.save();
      g.strokeStyle = C.dim;
      g.lineWidth = 3;
      g.lineCap = 'round';
      g.beginPath();
      g.moveTo(cx - 14, cy);
      g.lineTo(cx + 14, cy);
      g.moveTo(cx, cy - 14);
      g.lineTo(cx, cy + 14);
      g.stroke();
      g.restore();
    }
    if (s.visible) {
      const tp = this.targetPx(L);
      circle(g, tp.x, tp.y, r, DOT);
    }
    if (s.phase === 'respond') drawHint(g, this.ctx.stage, L, this.ctx.texts.feedback.ask, C.fg);
    if (s.phase === 'feedback' && this.p.showTarget && s.lastResp) {
      const tp = this.targetPx(L);
      g.save();
      g.strokeStyle = C.faint;
      g.lineWidth = 2;
      g.setLineDash([6, 5]);
      g.beginPath();
      g.moveTo(tp.x, tp.y);
      g.lineTo(s.lastResp.x, s.lastResp.y);
      g.stroke();
      g.restore();
      circle(g, tp.x, tp.y, r, DOT);
      ring(g, s.lastResp.x, s.lastResp.y, 12, C.white, 3);
    }
  }
}

export const laborProjektion: ExerciseDefinition = {
  id: 'labor-projektion',
  category: 'wahrnehmung',
  minutes: 3,
  color: '#8C6D4A',
  icon:
    '<path d="M24 14v20M14 24h20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" opacity=".45"/><circle cx="35" cy="13" r="4.6" fill="currentColor"/><circle cx="31" cy="19" r="6.4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-dasharray="2.5 3" opacity=".6"/>',
  texts: { de, it },
  warning: 'flash',
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  create: (ctx) => new OrtsProjektion(ctx),
};
