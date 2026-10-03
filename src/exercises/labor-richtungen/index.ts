/**
 * Richtungen (Labor) – ein Pfeil erscheint; man gibt seine Richtung (oder die Gegenrichtung) an: per Berührung auf einem
 * Richtungsfeld oder mit einer Hilfsperson, die „Richtig“ oder „Falsch“ tippt, während die übende Person die Richtung
 * mit dem Körper ausführt.
 *
 * Portierung der Labor-Übung `directions`: Größe in cm (`ctx.calib`), Einstellungen
 * (`ctx.params`, siehe logic.ts `PARAMS`), reine Logik in logic.ts (`DirectionSession`, erbt von `ChoiceSession`).
 *
 * - Kategorie `reaktion`: Wahlreaktion mit Richtungszuordnung (Reiz → Antwort), wie „Wahlreaktion“, aber mit Körperbewegung
 *   als mögliche Antwort. Hauptwert: Genauigkeit (`accuracy`); dazu Reaktionszeit (Mittel) und Fehler. Keine Stufen.
 * - Hilfsperson: große Bildschirmtasten („Richtig“, „Falsch“, ≥ 56 px, Text und Zeichen) plus Tastatur (Leertaste/Enter,
 *   X/Rücktaste). Die Hilfsperson steuert nur die Zählung; die App liest nichts von einer Plattform und misst weder
 *   Gleichgewicht noch Haltung.
 * - Berührung: Richtungsfeld aus 4 oder 8 Tasten (≥ 56 px, nie überlappend), Pfeiltasten antworten ebenfalls (4 Richtungen
 *   und die Hauptrichtungen bei 8).
 * - Rückmeldung weich: ✓/✗ in der Mitte, bei Fehler oder verpasstem Pfeil zeigt ein gestrichelter Ring die richtige Taste;
 *   kein Blitz, keine Vollflächeneffekte. Ton nur, wenn „Ton“ an ist.
 */
import { background, C, circle, rrPath, text } from '../../core/draw';
import { paramsOf } from '../../core/params';
import { calibOf } from '../../core/calib';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, Metric, PointerInfo, ResultDetailRow, ResultDetailTable } from '../../core/types';
import { drawHelperButton, helperAt, helperKeyKind, helperLayout, helperZoneHeight, MIN_HELPER_BUTTON_PX, type HelperButton } from '../_shared/labor-helfer';
import { playField, restPoint } from '../_shared/tippziele';
import { drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import { buttonAt, type Rect } from '../labor-wahlreaktion/logic';
import {
  type DirectionParams,
  DirectionSession,
  directionLayout,
  directionParams,
  dirAngle,
  type DirLayout,
  type InputKind,
  PARAMS,
  perDirection,
  pointsFor,
  QUICK_TRIALS,
  QUICK_WAIT_MAX_MS,
  tipFor,
} from './logic';
import type { ChoiceSummary } from '../labor-wahlreaktion/logic';
import { de, it } from './texts';

const INK = '#F2F5F7';
const FADE_IN_MS = 110;
const MARK_MS = 700;
const PRESS_MS = 240;
const HINT_MS = 900;
/** Anlaufzeit vor dem ersten Wartekreuz (Spielmodus) */
const LEAD_MS = 400;

// Intro-Film: fünf Pfeile; die ersten beiden per Berührung, danach mit Hilfsperson („Richtig“, „Falsch“, „Richtig“)
const DEMO_PARAMS: Partial<DirectionParams> = { trials: 5, directions: 4, rule: 'same', input: 'touch', stimulusMs: 6000, waitMinMs: 1100, waitMaxMs: 1100, sizeCm: 3.5, sound: 'no' };
const DEMO_LEAD_MS = 1000;
const DEMO_HELPER_FROM = 2;
const DEMO_WRONG_TRIAL = 3;
const DEMO_REACT_MS = 950;
const DEMO_END_MS = 14500;

interface Mark {
  x: number;
  y: number;
  t0: number;
  good: boolean;
}

/** Pfeil mit Spitze nach oben, um (cx, cy) gedreht; `size` = Gesamtlänge */
function drawArrow(g: CanvasRenderingContext2D, cx: number, cy: number, size: number, angle: number, fill: string, outline?: string): void {
  const s = size / 2;
  g.save();
  g.translate(cx, cy);
  g.rotate(angle);
  g.beginPath();
  g.moveTo(0, -s);
  g.lineTo(s * 0.7, -s * 0.1);
  g.lineTo(s * 0.28, -s * 0.1);
  g.lineTo(s * 0.28, s);
  g.lineTo(-s * 0.28, s);
  g.lineTo(-s * 0.28, -s * 0.1);
  g.lineTo(-s * 0.7, -s * 0.1);
  g.closePath();
  g.fillStyle = fill;
  g.fill();
  if (outline) {
    g.lineWidth = 2;
    g.lineJoin = 'round';
    g.strokeStyle = outline;
    g.stroke();
  }
  g.restore();
}

class Richtungen implements Exercise {
  private readonly demo: boolean;
  private readonly p: DirectionParams;
  private readonly session: DirectionSession;
  /** Eingabeart, die gerade gezeichnet wird (im Film wechselt sie von Berührung zu Hilfsperson) */
  private ui: InputKind;
  private startAt = 0;
  private started = false;
  private done = false;
  private endT = Infinity;
  private endAt = Infinity;
  private marks: Mark[] = [];
  private press: { id: number | 'ok' | 'bad'; t0: number } | null = null;
  private hint: { i: number; t0: number } | null = null;
  private seenTrials = 0;
  private plannedWait = -1;
  private plannedShow = -1;
  private lastLabel = '';

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = directionParams(paramsOf(ctx, PARAMS));
    let p: DirectionParams = this.demo ? { ...base, ...DEMO_PARAMS } : base;
    if (!this.demo && ctx.quick) {
      p = { ...p, trials: Math.min(p.trials, QUICK_TRIALS), waitMaxMs: Math.min(p.waitMaxMs, Math.max(p.waitMinMs, QUICK_WAIT_MAX_MS)) };
    }
    this.p = p;
    this.ui = p.input;
    this.session = new DirectionSession(this.p, { rng: ctx.rng });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private minBtn(): number {
    return this.demo ? 26 : MIN_HELPER_BUTTON_PX;
  }

  private layout(): DirLayout {
    const s = this.ctx.stage;
    const f = playField(s, this.demo);
    const arrowPx = calibOf(this.ctx).sizePx(this.p.sizeCm);
    return directionLayout(f, this.p.directions, this.ui, arrowPx, helperZoneHeight(s.u, this.minBtn()), s.u, this.minBtn());
  }

  /** Tasten der Hilfsperson (nur wenn `ui === 'helper'`) */
  private helperButtons(): HelperButton[] {
    const s = this.ctx.stage;
    const f = playField(s, this.demo);
    return helperLayout(['ok', 'bad'], f.x, f.x + f.w, f.y + f.h, s.u, this.minBtn());
  }

  /** Tasten des Richtungsfelds als Rechtecke */
  private padRects(): Rect[] {
    const l = this.layout();
    const b = l.pad.size;
    return l.pad.centers.map((c) => ({ x: c.x - b / 2, y: c.y - b / 2, w: b, h: b }));
  }

  resize(): void {
    // alles wird je Bild aus der Bühne berechnet
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    this.startAt = t + (this.demo ? DEMO_LEAD_MS : LEAD_MS);
    hud.setProgress(0);
    hud.setScore(null);
    this.updateLabel();
    if (this.demo) {
      const r = restPoint(this.ctx.stage);
      ghost.moveTo(r.x, r.y, { move: 0 });
      hud.caption(texts.captions.appear);
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
    this.ctx.hud.setProgress(s.idx / this.p.trials);
    this.updateLabel();
    if (s.finished || (this.demo && t - this.startAt >= DEMO_END_MS)) this.finishSession(t);
    this.prune(t);
  }

  private updateLabel(): void {
    if (this.demo) return;
    const s = this.session;
    const n = Math.min(this.p.trials, s.idx + (s.state === 'show' ? 1 : 0));
    const label = this.ctx.texts.feedback.label.replace('{n}', String(n)).replace('{total}', String(this.p.trials));
    if (label !== this.lastLabel) {
      this.lastLabel = label;
      this.ctx.hud.setLabel(label);
    }
  }

  /** Verpasste Pfeile bemerken (Hinweis auf die richtige Taste) */
  private noticeEvents(t: number): void {
    const s = this.session;
    while (this.seenTrials < s.trials.length) {
      const tr = s.trials[this.seenTrials++];
      if (tr.outcome === 'omission') {
        this.hint = { i: s.expectedFor(tr.stimulus), t0: t };
        this.toastAtArrow(this.ctx.texts.feedback.slow, 'info');
      }
    }
  }

  private toastAtArrow(txt: string, kind: 'info' | 'good' | 'bad'): void {
    const { hud, stage } = this.ctx;
    const a = this.layout().arrow;
    const size = clamp(stage.u * 4, 16, 28);
    hud.toast(txt, kind, { x: a.cx, y: Math.max(size * 1.5, a.cy - a.size / 2 - size * 0.6), ms: 800, size });
  }

  // --- Eingabe ---

  private afterAnswer(res: ReturnType<DirectionSession['respondDir']>, pressId: number | 'ok' | 'bad', t: number, stim: number | null): void {
    if (!res || res.type === 'ignored') return;
    const { sfx, texts } = this.ctx;
    if (res.type === 'early') {
      this.toastAtArrow(texts.feedback.early, 'info');
      if (this.p.sound === 'yes') sfx.bad();
      return;
    }
    const a = this.layout().arrow;
    this.press = { id: pressId, t0: t };
    this.marks.push({ x: a.cx, y: a.cy, t0: t, good: res.type === 'correct' });
    if (res.type === 'wrong' && stim !== null) this.hint = { i: this.session.expectedFor(stim), t0: t };
    if (this.p.sound === 'yes') (res.type === 'correct' ? sfx.good : sfx.bad)();
  }

  private answerDir(option: number, t: number): void {
    const stim = this.session.current();
    this.afterAnswer(this.session.respondDir(option, t), option, t, stim);
  }

  private answerHelper(correct: boolean, t: number): void {
    const stim = this.session.current();
    this.afterAnswer(this.session.respondHelper(correct, t), correct ? 'ok' : 'bad', t, stim);
  }

  pointerDown(p: PointerInfo): void {
    if (this.done || !this.started) return;
    if (this.ui === 'helper') {
      const k = helperAt(this.helperButtons(), p.x, p.y);
      if (k === 'ok') this.answerHelper(true, p.t);
      else if (k === 'bad') this.answerHelper(false, p.t);
      return;
    }
    const i = buttonAt(this.padRects(), p.x, p.y);
    if (i >= 0) this.answerDir(i, p.t);
  }

  keyDown(key: string, t: number): void {
    if (this.done || !this.started) return;
    if (this.ui === 'helper') {
      const k = helperKeyKind(key);
      if (k === 'ok') this.answerHelper(true, t);
      else if (k === 'bad') this.answerHelper(false, t);
      return;
    }
    // Pfeiltasten: die vier Hauptrichtungen (0 = oben, im Uhrzeigersinn)
    const per = this.p.directions / 4;
    const main: Record<string, number> = { ArrowUp: 0, ArrowRight: 1 * per, ArrowDown: 2 * per, ArrowLeft: 3 * per };
    if (key in main) this.answerDir(main[key], t);
  }

  // --- Intro-Film und Autoplay ---

  /** Mitte der Taste, die die Hand antippt: Richtungsfeld oder Hilfsperson-Taste */
  private target(opt: number | 'ok' | 'bad'): { x: number; y: number } {
    if (typeof opt === 'number') {
      const c = this.layout().pad.centers[opt];
      return { x: c.x, y: c.y };
    }
    const b = this.helperButtons().find((h) => h.kind === opt)!.rect;
    return { x: b.x + b.w / 2, y: b.y + b.h / 2 };
  }

  /** Film und Autoplay (Tests): die Hand antwortet meist richtig, im Film einmal „Falsch“ */
  private autoUpdate(): void {
    const { ghost, rng, hud, texts } = this.ctx;
    const s = this.session;
    if (s.finished) return;
    if (s.state === 'wait' && this.plannedWait !== s.idx) {
      this.plannedWait = s.idx;
      if (this.demo) {
        if (s.idx === DEMO_HELPER_FROM) {
          this.ui = 'helper';
          hud.caption(texts.captions.helper);
        } else if (s.idx === 1) hud.caption(texts.captions.next);
      } else if (rng.chance(0.04)) {
        // einmal zu früh tippen
        const c = this.target(this.ui === 'helper' ? 'ok' : rng.int(this.p.directions));
        ghost.clear();
        ghost.tap(c.x, c.y, { delay: rng.range(120, 300), move: 350 });
      }
    } else if (s.state === 'show' && this.plannedShow !== s.idx) {
      this.plannedShow = s.idx;
      const stim = s.current() ?? 0;
      const exp = s.expectedFor(stim);
      ghost.clear();
      if (this.demo) {
        if (s.idx === 0) hud.caption(texts.captions.touch);
        let opt: number | 'ok' | 'bad';
        if (this.ui === 'touch') opt = exp;
        else {
          opt = s.idx === DEMO_WRONG_TRIAL ? 'bad' : 'ok';
          if (opt === 'bad') hud.caption(texts.captions.wrong);
        }
        const c = this.target(opt);
        ghost.tap(c.x, c.y, { delay: DEMO_REACT_MS - 500, move: 500 });
        return;
      }
      const roll = rng.next();
      if (roll < 0.05) return; // keine Antwort
      const helper = this.ui === 'helper';
      const room = s.p.stimulusMs - 250;
      const rt = helper ? rng.range(900, Math.max(1000, Math.min(1600, room))) : rng.range(380, Math.min(900, room));
      const move = rng.range(280, 450);
      if (rt > room) return;
      let opt: number | 'ok' | 'bad';
      if (helper) opt = roll < 0.15 ? 'bad' : 'ok';
      else opt = roll < 0.15 ? (exp + 1 + rng.int(this.p.directions - 1)) % this.p.directions : exp;
      const c = this.target(opt);
      ghost.tap(c.x, c.y, { delay: Math.max(0, rt - move - 17), move });
    }
  }

  private prune(t: number): void {
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
    if (this.press && t - this.press.t0 > PRESS_MS) this.press = null;
    if (this.hint && t - this.hint.t0 > HINT_MS) this.hint = null;
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
        primary: { key: 'accuracy', value: sum.accuracy ?? 0, unit: 'percent', better: 'higher' },
        secondary: [{ key: 'correct', value: sum.correct, unit: 'count' }],
        score: 0,
        level: 1,
      });
      return;
    }
    if (this.p.sound === 'yes') sfx.done();
    this.ctx.finish(this.buildResult(sum));
  }

  private buildResult(sum: ChoiceSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const secondary: Metric[] = [];
    if (sum.rtMean !== null) secondary.push({ key: 'rt_mean', value: sum.rtMean, unit: 'ms' });
    secondary.push({ key: 'wrong', value: sum.wrong, unit: 'count' });
    secondary.push({ key: 'omissions', value: sum.omissions, unit: 'count' });
    secondary.push({ key: 'early', value: sum.early, unit: 'count' });
    const rows: ResultDetailRow[] = [{ label: texts.metrics.correct, value: fmt.num(sum.correct, 0) }];
    if (sum.rtMedian !== null) rows.push({ label: texts.metrics.rt_median, value: fmt.ms(sum.rtMedian) });
    if (sum.rtSd !== null) rows.push({ label: texts.metrics.rt_sd, value: fmt.ms(sum.rtSd) });
    const details: ResultDetailTable[] = [{ title: texts.feedback.moreTitle, rows, note: texts.feedback.moreNote }];
    const dirs = perDirection(sum, this.p.directions);
    if (dirs.length >= 2) {
      const per = 8 / this.p.directions;
      details.push({
        title: texts.feedback.dirTitle,
        rows: dirs.map((d) => ({
          label: texts.feedback[`dir${d.dir * per}`] ?? String(d.dir),
          value:
            d.rtMean !== null
              ? texts.feedback.dirValue.replace('{ms}', fmt.ms(d.rtMean)).replace('{n}', String(d.n)).replace('{of}', String(d.of))
              : texts.feedback.dirValueNone.replace('{of}', String(d.of)),
        })),
        note: texts.feedback.dirNote,
      });
    }
    return {
      primary: { key: 'accuracy', value: sum.accuracy ?? 0, unit: 'percent', better: 'higher' },
      secondary,
      details,
      score: pointsFor(sum.correct),
      level: 1,
      tip: tipFor(sum, this.p.input),
    };
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, now: number): void {
    const t = Math.min(now, this.endT);
    const { w, h, dpr, u } = this.ctx.stage;
    background(g, w, h, dpr);
    const l = this.layout();
    const s = this.session;
    const { texts } = this.ctx;
    text(g, this.p.rule === 'opposite' ? texts.feedback.taskOpposite : texts.feedback.taskSame, l.label.cx, l.label.cy, clamp(u * 3.4, 14, 24), C.dim);
    const cur = this.started ? s.current() : null;
    if (cur === null) this.drawWaitCross(g, l.arrow.cx, l.arrow.cy, l.arrow.size);
    else {
      const alpha = 0.35 + 0.65 * easeOut((t - (s.shownAt ?? t)) / FADE_IN_MS);
      g.save();
      g.globalAlpha = alpha;
      drawArrow(g, l.arrow.cx, l.arrow.cy, l.arrow.size, dirAngle(cur, this.p.directions), INK, 'rgba(5,10,20,0.6)');
      g.restore();
    }
    if (this.ui === 'helper') this.drawHelper(g, t);
    else this.drawPad(g, l, t);
    const cs = clamp(l.arrow.size * 0.25, 12, 34);
    for (const m of this.marks) {
      const alpha = markAlpha(t - m.t0, MARK_MS);
      if (m.good) drawSoftCheck(g, m.x, m.y, cs, alpha);
      else drawSoftCross(g, m.x, m.y, cs * 0.8, alpha);
    }
  }

  private drawWaitCross(g: CanvasRenderingContext2D, cx: number, cy: number, size: number): void {
    const arm = clamp(size * 0.09, 8, 18);
    g.save();
    g.lineCap = 'round';
    g.strokeStyle = C.dim;
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(cx - arm, cy);
    g.lineTo(cx + arm, cy);
    g.moveTo(cx, cy - arm);
    g.lineTo(cx, cy + arm);
    g.stroke();
    g.restore();
  }

  private drawHelper(g: CanvasRenderingContext2D, t: number): void {
    const { texts } = this.ctx;
    for (const b of this.helperButtons()) {
      const pressedAge = this.press && this.press.id === b.kind ? t - this.press.t0 : null;
      drawHelperButton(g, b, b.kind === 'ok' ? texts.feedback.btnOk : texts.feedback.btnBad, b.kind === 'ok' ? texts.feedback.keyOk : texts.feedback.keyBad, { pressedAge });
    }
    // Hinweis auf die Hilfsperson-Bedienung bei falscher/fehlender Antwort entfällt: die Hilfsperson sieht ja die Bewegung
  }

  private drawPad(g: CanvasRenderingContext2D, l: DirLayout, t: number): void {
    const n = this.p.directions;
    const b = l.pad.size;
    l.pad.centers.forEach((c, i) => {
      const rad = b * 0.22;
      g.save();
      rrPath(g, c.x - b / 2, c.y - b / 2, b, b, rad);
      g.fillStyle = 'rgba(255,255,255,0.13)';
      g.fill();
      g.lineWidth = 1.5;
      g.strokeStyle = 'rgba(255,255,255,0.3)';
      g.stroke();
      g.restore();
      drawArrow(g, c.x, c.y, b * 0.56, dirAngle(i, n), '#C9D4E5');
      if (this.press && this.press.id === i && t - this.press.t0 < PRESS_MS) {
        g.save();
        rrPath(g, c.x - b / 2 - 2, c.y - b / 2 - 2, b + 4, b + 4, rad + 2);
        g.strokeStyle = C.white;
        g.lineWidth = 4;
        g.stroke();
        g.restore();
      }
      if (this.hint && this.hint.i === i && t - this.hint.t0 < HINT_MS) {
        g.save();
        g.globalAlpha = markAlpha(t - this.hint.t0, HINT_MS, 140);
        rrPath(g, c.x - b / 2 - 4, c.y - b / 2 - 4, b + 8, b + 8, rad + 4);
        g.setLineDash([9, 7]);
        g.strokeStyle = C.white;
        g.lineWidth = 3.5;
        g.stroke();
        g.restore();
      }
    });
    // kleiner Mittelpunkt: das Feld gehört zusammen
    circle(g, l.pad.centers.reduce((a, c) => a + c.x, 0) / n, l.pad.centers.reduce((a, c) => a + c.y, 0) / n, 3, 'rgba(255,255,255,0.25)');
  }
}

export const laborRichtungen: ExerciseDefinition = {
  id: 'labor-richtungen',
  category: 'reaktion',
  minutes: 2,
  color: '#C8641E',
  icon:
    '<circle cx="24" cy="24" r="5" fill="currentColor"/><path d="M24 3l6.5 10h-13z" fill="currentColor"/><path d="M45 24l-10 6.5v-13z" fill="currentColor" opacity=".45"/><path d="M24 45l-6.5-10h13z" fill="currentColor" opacity=".45"/><path d="M3 24l10-6.5v13z" fill="currentColor" opacity=".45"/>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  create: (ctx) => new Richtungen(ctx),
};
