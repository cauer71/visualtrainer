/**
 * Orientierung (Labor) – ein Punkt leuchtet in einer von 4 oder 8 Richtungen auf; die übende Person bewegt ihren Körper in diese
 * Richtung, eine Hilfsperson bestätigt per Bildschirmtaste (oder Tastatur), wenn die Richtung erreicht ist. Optional folgt die
 * Rückkehr zur Mitte.
 *
 * Portierung der Labor-Übung `orient`: Größe in cm (`ctx.calib`), Einstellungen (`ctx.params`, siehe
 * logic.ts `PARAMS`), reine Logik in logic.ts (`OrientSession`).
 *
 * - Kategorie `wahrnehmung`: ein sichtbarer Reiz bestimmt die Zielrichtung der eigenen Bewegung (räumliche Orientierung nach
 *   visuellem Reiz). Hauptwert: erreichte Ziele (`reached`); dazu Zeit bis zur Bestätigung und Rückkehr zur Mitte. Keine Stufen.
 * - Hilfsperson: große Bildschirmtasten „Erreicht“ und „Falsche Richtung“ (≥ 56 px, Text und Zeichen) plus Tastatur (Leertaste/
 *   Enter, X/Rücktaste). Die App liest nichts von einer Plattform und misst weder Gleichgewicht noch Haltung, nur die Zeit
 *   bis zum Tipp der Hilfsperson.
 * - Farbe nie allein: das Ziel ist gefüllt und hat einen Pfeil nach außen, die übrigen Richtungen sind nur Umrisse; ein Text
 *   oben sagt, was gerade gilt. Rückmeldung weich (✓/✗), kein Blitz. Ton nur, wenn „Ton“ an ist.
 */
import { background, C, circle, ring, text } from '../../core/draw';
import { paramsOf } from '../../core/params';
import { calibOf } from '../../core/calib';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, Metric, PointerInfo, ResultDetailRow, ResultDetailTable } from '../../core/types';
import { drawHelperButton, helperAt, helperKeyKind, helperLayout, helperZoneHeight, MIN_HELPER_BUTTON_PX, type HelperButton } from '../_shared/labor-helfer';
import { playField, restPoint } from '../_shared/tippziele';
import { drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import {
  OrientSession,
  orientLayout,
  orientParams,
  type OrientLayout,
  type OrientParams,
  type OrientPress,
  type OrientSummary,
  PARAMS,
  pointsFor,
  QUICK_TRIALS,
  QUICK_WAIT_MS,
  tipFor,
} from './logic';
import { de, it } from './texts';

const TARGET_COLOR = '#FFD23F';
const FADE_IN_MS = 110;
const MARK_MS = 700;
const GONE_MS = 450;
const LEAD_MS = 400;

// Intro-Film: drei Ziele (ein Mal „Falsche Richtung“), jeweils mit Rückkehr zur Mitte
const DEMO_PARAMS: Partial<OrientParams> = { trials: 3, directions: 4, returnToCenter: true, waitMs: 1100, timeoutS: 0, sizeCm: 3, sound: 'no' };
const DEMO_LEAD_MS = 1000;
const DEMO_TARGET_MS = 1250;
const DEMO_CENTER_MS = 950;
const DEMO_WRONG_TRIAL = 1;
const DEMO_END_MS = 14000;

interface Mark {
  x: number;
  y: number;
  t0: number;
  good: boolean;
}

class Orientierung implements Exercise {
  private readonly demo: boolean;
  private readonly p: OrientParams;
  private readonly session: OrientSession;
  private startAt = 0;
  private started = false;
  private done = false;
  private endT = Infinity;
  private endAt = Infinity;
  private marks: Mark[] = [];
  private gone: Array<{ x: number; y: number; t0: number }> = [];
  private press: { kind: 'ok' | 'bad'; t0: number } | null = null;
  private seenTrials = 0;
  private plannedFor = '';
  private lastLabel = '';

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = orientParams(paramsOf(ctx, PARAMS));
    let p: OrientParams = this.demo ? { ...base, ...DEMO_PARAMS } : base;
    if (!this.demo && ctx.quick) p = { ...p, trials: Math.min(p.trials, QUICK_TRIALS), waitMs: Math.min(p.waitMs, QUICK_WAIT_MS) };
    this.p = p;
    this.session = new OrientSession(this.p, { rng: ctx.rng });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private minBtn(): number {
    return this.demo ? 26 : MIN_HELPER_BUTTON_PX;
  }

  private layout(): OrientLayout {
    const s = this.ctx.stage;
    const f = playField(s, this.demo);
    return orientLayout(f, this.p.directions, calibOf(this.ctx).sizePx(this.p.sizeCm), helperZoneHeight(s.u, this.minBtn()), s.u);
  }

  private buttons(): HelperButton[] {
    const s = this.ctx.stage;
    const f = playField(s, this.demo);
    return helperLayout(['ok', 'bad'], f.x, f.x + f.w, f.y + f.h, s.u, this.minBtn());
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
      hud.caption(texts.captions.target);
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
    const before = s.state;
    s.update(t);
    if (before !== s.state && s.state === 'target' && this.p.sound === 'yes') this.ctx.sfx.tap();
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
    const n = Math.min(this.p.trials, s.idx + 1);
    const label = this.ctx.texts.feedback.label.replace('{n}', String(n)).replace('{total}', String(this.p.trials));
    if (label !== this.lastLabel) {
      this.lastLabel = label;
      this.ctx.hud.setLabel(label);
    }
  }

  /** Zeitüberschreitungen bemerken (Ziel löst sich als gestrichelter Ring auf) */
  private noticeEvents(t: number): void {
    const s = this.session;
    const l = this.layout();
    while (this.seenTrials < s.trials.length) {
      const tr = s.trials[this.seenTrials++];
      if (tr.outcome === 'timeout') this.gone.push({ x: l.points[tr.dir].x, y: l.points[tr.dir].y, t0: t });
    }
  }

  // --- Eingabe ---

  private act(kind: 'ok' | 'bad', t: number): void {
    const s = this.session;
    const l = this.layout();
    const dir = s.current();
    const res: OrientPress = kind === 'ok' ? s.reached(t) : s.wrong(t);
    if (!res || res.type === 'ignored') return;
    const { sfx } = this.ctx;
    this.press = { kind, t0: t };
    if (res.type === 'center') {
      this.marks.push({ x: l.cx, y: l.cy, t0: t, good: true });
      if (this.p.sound === 'yes') sfx.good();
    } else if (dir !== null) {
      this.marks.push({ x: l.points[dir].x, y: l.points[dir].y, t0: t, good: res.type === 'reached' });
      if (this.p.sound === 'yes') (res.type === 'reached' ? sfx.good : sfx.bad)();
    }
  }

  pointerDown(p: PointerInfo): void {
    if (this.done || !this.started) return;
    const k = helperAt(this.buttons(), p.x, p.y);
    if (k === 'ok' || k === 'bad') this.act(k, p.t);
  }

  keyDown(key: string, t: number): void {
    if (this.done || !this.started) return;
    const k = helperKeyKind(key);
    if (k === 'ok' || k === 'bad') this.act(k, t);
  }

  // --- Intro-Film und Autoplay ---

  private button(kind: 'ok' | 'bad'): { x: number; y: number } {
    const r = this.buttons().find((b) => b.kind === kind)!.rect;
    return { x: r.x + r.w / 2, y: r.y + r.h / 2 };
  }

  /** Film und Autoplay (Tests): die Hand tippt als Hilfsperson meist „Erreicht“, selten „Falsche Richtung“ */
  private autoUpdate(): void {
    const { ghost, rng, hud, texts } = this.ctx;
    const s = this.session;
    if (s.finished) return;
    const key = `${s.idx}:${s.state}:${this.ctx.stage.w}x${this.ctx.stage.h}`; // nach dem Drehen neu planen: die Tasten liegen woanders
    if (this.plannedFor === key || (s.state !== 'target' && s.state !== 'center')) return;
    this.plannedFor = key;
    ghost.clear();
    if (this.demo) {
      if (s.state === 'target') {
        hud.caption(s.idx === 0 ? texts.captions.move : s.idx === DEMO_WRONG_TRIAL ? texts.captions.wrong : texts.captions.confirm);
        const c = this.button(s.idx === DEMO_WRONG_TRIAL ? 'bad' : 'ok');
        ghost.tap(c.x, c.y, { delay: DEMO_TARGET_MS - 500, move: 500 });
      } else {
        hud.caption(texts.captions.back);
        const c = this.button('ok');
        ghost.tap(c.x, c.y, { delay: DEMO_CENTER_MS - 500, move: 500 });
      }
      return;
    }
    const to = this.p.timeoutS * 1000;
    const rt = s.state === 'target' ? rng.range(900, 2200) : rng.range(700, 1500);
    const move = rng.range(280, 450);
    // mit Zeitlimit: selten gar nicht tippen; ohne Limit muss die Hilfsperson immer tippen, sonst wartet die Übung ewig
    if (to > 0 && (rt + 200 > to || rng.chance(0.04))) return;
    const bad = s.state === 'target' && rng.chance(0.1);
    const c = this.button(bad ? 'bad' : 'ok');
    ghost.tap(c.x, c.y, { delay: Math.max(0, rt - move - 17), move });
  }

  private prune(t: number): void {
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
    if (this.gone.length) this.gone = this.gone.filter((m) => t - m.t0 < GONE_MS);
    if (this.press && t - this.press.t0 > 260) this.press = null;
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
        primary: { key: 'reached', value: sum.reached, unit: 'count', better: 'higher' },
        secondary: [{ key: 'wrong', value: sum.wrong, unit: 'count' }],
        score: 0,
        level: 1,
      });
      return;
    }
    if (this.p.sound === 'yes') sfx.done();
    this.ctx.finish(this.buildResult(sum));
  }

  private buildResult(sum: OrientSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const secondary: Metric[] = [];
    if (sum.tMean !== null) secondary.push({ key: 't_mean', value: sum.tMean, unit: 'ms' });
    secondary.push({ key: 'wrong', value: sum.wrong, unit: 'count' });
    if (this.p.timeoutS > 0) secondary.push({ key: 'timeouts', value: sum.timeouts, unit: 'count' });
    if (this.p.returnToCenter && sum.returnMean !== null) secondary.push({ key: 'return_mean', value: sum.returnMean, unit: 'ms' });
    const rows: ResultDetailRow[] = [];
    if (sum.tMedian !== null) rows.push({ label: texts.metrics.t_median, value: fmt.ms(sum.tMedian) });
    if (sum.tSd !== null) rows.push({ label: texts.metrics.t_sd, value: fmt.ms(sum.tSd) });
    const details: ResultDetailTable[] = [];
    if (rows.length) details.push({ title: texts.feedback.moreTitle, rows, note: texts.feedback.moreNote });
    if (sum.perDirection.length >= 2) {
      const per = 8 / this.p.directions;
      details.push({
        title: texts.feedback.dirTitle,
        rows: sum.perDirection.map((d) => ({
          label: texts.feedback[`dir${d.dir * per}`] ?? String(d.dir),
          value:
            d.tMean !== null
              ? texts.feedback.dirValue.replace('{ms}', fmt.ms(d.tMean)).replace('{n}', String(d.n)).replace('{of}', String(d.of))
              : texts.feedback.dirValueNone.replace('{of}', String(d.of)),
        })),
        note: texts.feedback.dirNote,
      });
    }
    return {
      primary: { key: 'reached', value: sum.reached, unit: 'count', better: 'higher' },
      secondary,
      ...(details.length ? { details } : {}),
      score: pointsFor(sum.reached),
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
    const l = this.layout();
    const s = this.session;
    const { texts } = this.ctx;
    const state = this.started ? s.state : 'wait';
    const msg = state === 'target' ? texts.feedback.target : state === 'center' ? texts.feedback.center : texts.feedback.wait;
    text(g, msg, l.label.cx, l.label.cy, clamp(u * 3.4, 14, 24), C.dim);
    // alle Richtungen als Umrisse
    const lw = Math.max(2, l.r * 0.07);
    for (const q of l.points) ring(g, q.x, q.y, l.r, 'rgba(255,255,255,0.3)', lw);
    ring(g, l.cx, l.cy, l.r, 'rgba(255,255,255,0.3)', lw);
    for (const gn of this.gone) {
      g.save();
      g.globalAlpha = 0.6 * (1 - clamp((t - gn.t0) / GONE_MS, 0, 1));
      ring(g, gn.x, gn.y, l.r, '#FFFFFF', Math.max(2, l.r * 0.06), [6, 6]);
      g.restore();
    }
    const dir = this.started ? s.current() : null;
    if (dir !== null) {
      const q = l.points[dir];
      const a = 0.35 + 0.65 * easeOut((t - s.shownAt) / FADE_IN_MS);
      g.save();
      g.globalAlpha = a;
      circle(g, q.x, q.y, l.r, TARGET_COLOR);
      ring(g, q.x, q.y, l.r + Math.max(2, l.r * 0.08), '#FFFFFF', Math.max(2.5, l.r * 0.1));
      // Pfeil nach außen: die Richtung steht nicht nur in der Farbe
      const ang = (dir * 2 * Math.PI) / this.p.directions;
      g.translate(q.x, q.y);
      g.rotate(ang);
      g.fillStyle = '#0B1424';
      g.beginPath();
      g.moveTo(0, -l.r * 0.62);
      g.lineTo(l.r * 0.42, -l.r * 0.1);
      g.lineTo(l.r * 0.16, -l.r * 0.1);
      g.lineTo(l.r * 0.16, l.r * 0.5);
      g.lineTo(-l.r * 0.16, l.r * 0.5);
      g.lineTo(-l.r * 0.16, -l.r * 0.1);
      g.lineTo(-l.r * 0.42, -l.r * 0.1);
      g.closePath();
      g.fill();
      g.restore();
    }
    if (state === 'center') {
      // Mitte gefüllt, mit Punkt: „hierher zurück“
      const a = 0.35 + 0.65 * easeOut((t - s.centerAt) / FADE_IN_MS);
      g.save();
      g.globalAlpha = a;
      circle(g, l.cx, l.cy, l.r, '#9FD8FF');
      ring(g, l.cx, l.cy, l.r + Math.max(2, l.r * 0.08), '#FFFFFF', Math.max(2.5, l.r * 0.1));
      circle(g, l.cx, l.cy, l.r * 0.28, '#0B1424');
      g.restore();
    }
    for (const b of this.buttons()) {
      const pressedAge = this.press && this.press.kind === b.kind ? t - this.press.t0 : null;
      drawHelperButton(g, b, b.kind === 'ok' ? texts.feedback.btnOk : texts.feedback.btnBad, b.kind === 'ok' ? texts.feedback.keyOk : texts.feedback.keyBad, { pressedAge, dim: state === 'wait' });
    }
    const cs = clamp(l.r * 0.5, 12, 34);
    for (const m of this.marks) {
      const alpha = markAlpha(t - m.t0, MARK_MS);
      if (m.good) drawSoftCheck(g, m.x, m.y, cs, alpha);
      else drawSoftCross(g, m.x, m.y, cs * 0.8, alpha);
    }
  }
}

export const laborOrientierung: ExerciseDefinition = {
  id: 'labor-orientierung',
  category: 'wahrnehmung',
  minutes: 3,
  color: '#8C6D4A',
  icon:
    '<circle cx="24" cy="24" r="4" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="24" cy="7" r="4.5" fill="currentColor"/><circle cx="41" cy="24" r="4" fill="none" stroke="currentColor" stroke-width="3" opacity=".5"/><circle cx="24" cy="41" r="4" fill="none" stroke="currentColor" stroke-width="3" opacity=".5"/><circle cx="7" cy="24" r="4" fill="none" stroke="currentColor" stroke-width="3" opacity=".5"/>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  create: (ctx) => new Orientierung(ctx),
};
