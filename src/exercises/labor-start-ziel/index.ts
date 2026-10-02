/**
 * Start-Ziel-Reaktion (Labor) – Finger auf START halten, bei Aufleuchten des Ziels loslassen und das Ziel berühren.
 * Reaktionszeit (Loslassen) und Bewegungszeit (Weg zum Ziel) werden getrennt gemessen.
 *
 * Portierung der Labor-Übung `sprint` (Prototyp ex/sprint.js): Größen in cm (`ctx.calib`), Einstellungen (`ctx.params`,
 * siehe logic.ts `PARAMS`), reine Logik in logic.ts (`SprintSession`). Abstand und Ziel werden aufs Feld begrenzt.
 *
 * - Hauptwert: mittlere Reaktionszeit beim Loslassen (`rt_mean`, ms, weniger = schneller); dazu Bewegungszeit, Fehlstarts
 *   und Fehltipps. Keine Stufen (`level` = 1). Gibt es kein einziges Loslassen, steht die Zeitgrenze (2000 ms) als Wert.
 * - Eingabe: `pointerDown` auf START beginnt das Halten, `pointerUp` (oder Abbruch) ist das Loslassen, danach das Ziel
 *   mit einem neuen Tipp berühren. Zweiter Finger oder Doppeltipp stören nicht (nur der erste Finger auf START zählt).
 * - Film und Autoplay: eine eigene „virtuelle Hand“ (wie bei `ziehen-ablegen`), weil die Geister-Hand nur tippen kann; sie
 *   legt den Finger auf START, lässt (im Film einmal zu früh) los, geht zum Ziel und tippt.
 * - Rückmeldung weich: Text oben im Bild, ✓/✗ als Zeichen, START ändert die Beschriftung („HALTEN“), das Ziel blendet in
 *   110 ms ein; kein Blitz, keine Vollflächeneffekte. Ton nur, wenn „Ton“ an ist.
 * - Gemessen werden nur Loslassen und Berühren, nicht dein Blick.
 */
import { background, C, circle, hand, ring, text } from '../../core/draw';
import { paramsOf } from '../../core/params';
import { calibOf } from '../../core/calib';
import { clamp, easeInOut, easeOut, lerp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, Metric, PointerInfo, ResultDetailRow } from '../../core/types';
import { drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import { handSize, playField, restPoint, toastNear } from '../_shared/tippziele';
import {
  GO_TIMEOUT_MS,
  HOME_R_CM,
  MIN_HIT_PX,
  PARAMS,
  pointsFor,
  QUICK_DELAY_MAX_MS,
  QUICK_DELAY_MIN_MS,
  QUICK_TRIALS,
  SprintSession,
  sprintParams,
  tipFor,
  type SprintParams,
  type SprintSummary,
} from './logic';
import { de, it } from './texts';

const VF_ID = -7;
const FADE_IN_MS = 110;
const MARK_MS = 650;
const MSG_MS = 1600;
/** Anlaufzeit (Spielmodus) vor dem ersten Halten */
const LEAD_MS = 300;

const TARGET_COLOR = '#FFD23F';
const HOME_HELD = '#3FB6A0';

// Intro-Film: zuerst zu früh losgelassen, dann zwei erfolgreiche Durchgänge
const DEMO_PARAMS: Partial<SprintParams> = { trials: 2, minDelayMs: 1500, maxDelayMs: 1500, distanceCm: 6, targetCm: 2.5, target: 'top', sound: 'no' };
const DEMO_LEAD_MS = 1000;
/** Zeit von Halten bis zum zu frühen Loslassen im Film */
const DEMO_EARLY_AFTER_MS = 650;
/** Zeit von Aufleuchten bis Loslassen und Weg zum Ziel im Film */
const DEMO_REACT_MS = 480;
const DEMO_MOVE_MS = 650;
const DEMO_END_MS = 13000;

type AutoState = 'rest' | 'toHome' | 'holding' | 'toTarget' | 'retry';

interface Mark {
  x: number;
  y: number;
  t0: number;
  good: boolean;
}

interface Pt {
  x: number;
  y: number;
}

class StartZiel implements Exercise {
  private readonly demo: boolean;
  private readonly p: SprintParams;
  private readonly session: SprintSession;
  private startAt = 0;
  private started = false;
  private done = false;
  private endT = Infinity;
  private endAt = Infinity;
  private homePointer: number | null = null;
  private marks: Mark[] = [];
  private msg: { key: 'falseStart' | 'late' | 'noTarget'; t0: number } | null = null;
  private seenEvent = 0;
  private lastLabel = '';
  private prevState: string = 'idle';
  // virtuelle Hand (Film und Autoplay)
  private vf: Pt = { x: 0, y: 0 };
  private vfPressUntil = -1;
  private vfHeld = false;
  private auto: {
    st: AutoState;
    t0: number;
    from: Pt;
    to: Pt;
    dur: number;
    nextAt: number;
    releaseAt: number;
    releaseSet: boolean;
    skipRelease: boolean;
    skipTap: boolean;
    miss: boolean;
  } = { st: 'rest', t0: 0, from: { x: 0, y: 0 }, to: { x: 0, y: 0 }, dur: 0, nextAt: 0, releaseAt: Infinity, releaseSet: false, skipRelease: false, skipTap: false, miss: false };
  private holds = 0;
  private demoHits = 0;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = sprintParams(paramsOf(ctx, PARAMS));
    let p: SprintParams = this.demo ? { ...base, ...DEMO_PARAMS } : base;
    if (!this.demo && ctx.quick) {
      const lo = Math.min(p.minDelayMs, QUICK_DELAY_MIN_MS);
      p = { ...p, trials: Math.min(p.trials, QUICK_TRIALS), minDelayMs: lo, maxDelayMs: Math.max(lo, Math.min(p.maxDelayMs, QUICK_DELAY_MAX_MS)) };
    }
    const calib = calibOf(ctx);
    this.p = { ...p, targetCm: calib.fitCm(p.targetCm) };
    const f = this.field();
    const ppc = calib.pxPerCm;
    this.session = new SprintSession(this.p, { rng: ctx.rng, fieldWcm: f.w / ppc, fieldHcm: f.h / ppc, minHitRadiusCm: MIN_HIT_PX / ppc });
    this.vf = restPoint(ctx.stage);
  }

  // --- Geometrie: immer live aus der Bühne ---

  private field(): { x: number; y: number; w: number; h: number } {
    return playField(this.ctx.stage, this.demo);
  }

  private ppc(): number {
    return calibOf(this.ctx).pxPerCm;
  }

  private toPx(xCm: number, yCm: number): Pt {
    const f = this.field();
    const k = this.ppc();
    return { x: f.x + xCm * k, y: f.y + yCm * k };
  }

  private toCm(p: PointerInfo): Pt {
    const f = this.field();
    const k = this.ppc();
    return { x: (p.x - f.x) / k, y: (p.y - f.y) / k };
  }

  resize(): void {
    const f = this.field();
    const k = this.ppc();
    this.session.setField(f.w / k, f.h / k, calibOf(this.ctx).fitCm(this.p.targetCm));
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    this.startAt = t + (this.demo ? DEMO_LEAD_MS : LEAD_MS);
    hud.setProgress(0);
    hud.setScore(null);
    this.updateLabel();
    if (this.ctx.autoplay) ghost.hide(); // die Hand zeichnet diese Übung selbst
    if (this.demo) hud.caption(texts.captions.hold);
  }

  update(dt: number, t: number): void {
    if (this.done) return;
    const s = this.session;
    if (!this.started) {
      if (t < this.startAt) return;
      this.started = true;
      s.start(t);
      this.auto.nextAt = t + 200;
    }
    if (this.demo && t >= this.endAt) {
      this.finishSession(t);
      return;
    }
    s.update(t);
    this.noticeEvents(t);
    if (this.ctx.autoplay) this.autoUpdate(dt, t);
    this.ctx.hud.setProgress(s.done / this.p.trials);
    this.updateLabel();
    if (s.finished) {
      if (!this.demo) this.finishSession(t);
      else if (this.endAt === Infinity) this.endAt = t + 1200;
    }
    if (this.demo && t - this.startAt >= DEMO_END_MS) this.finishSession(t);
    this.prune(t);
  }

  private updateLabel(): void {
    if (this.demo) return;
    const s = this.session;
    const n = Math.min(this.p.trials, s.done + 1);
    const label = this.ctx.texts.feedback.label.replace('{n}', String(n)).replace('{total}', String(this.p.trials));
    if (label !== this.lastLabel) {
      this.lastLabel = label;
      this.ctx.hud.setLabel(label);
    }
  }

  /** Zustandswechsel und Ereignisse der Logik bemerken (Ziel leuchtet auf, Fehlstart, Zeitüberschreitung) */
  private noticeEvents(t: number): void {
    const s = this.session;
    const { sfx, hud, texts } = this.ctx;
    if (this.prevState !== 'go' && s.state === 'go') {
      if (this.p.sound === 'yes') sfx.go();
      if (this.demo) hud.caption(texts.captions.go);
    }
    if (this.prevState === 'go' && s.state === 'idle') this.homePointer = null; // nicht rechtzeitig losgelassen: neu auflegen
    this.prevState = s.state;
    const ev = s.lastEvent;
    if (ev && ev.t !== this.seenEvent) {
      this.seenEvent = ev.t;
      const key = ev.type === 'false_start' ? 'falseStart' : ev.type === 'no_release' ? 'late' : 'noTarget';
      this.msg = { key, t0: t };
      if (ev.type === 'false_start') {
        const h = this.toPx(s.home.x, s.home.y);
        this.marks.push({ x: h.x, y: h.y, t0: t, good: false });
        if (this.p.sound === 'yes') sfx.bad();
        if (this.demo) hud.caption(texts.captions.early);
      }
    }
  }

  // --- Eingabe ---

  pointerDown(p: PointerInfo): void {
    if (this.done || !this.started) return;
    const s = this.session;
    const c = this.toCm(p);
    if (this.homePointer === null && s.state === 'idle' && s.inHome(c.x, c.y)) {
      if (s.homeDown(p.t)) {
        this.homePointer = p.id;
        if (this.demo && this.holds >= 2) this.ctx.hud.caption(this.ctx.texts.captions.wait);
      }
      return;
    }
    const tgt = s.target ? { ...s.target } : null;
    const res = s.tap(c.x, c.y, p.t);
    if (!res) return;
    const { sfx, hud, stage, fmt } = this.ctx;
    if (res.type === 'hit' && tgt) {
      const tp = this.toPx(tgt.x, tgt.y);
      this.marks.push({ x: tp.x, y: tp.y, t0: p.t, good: true });
      if (this.p.sound === 'yes') sfx.good();
      const size = clamp(stage.u * 4, 16, 28);
      toastNear(hud, stage.w, `✓ ${fmt.ms(res.rt)}`, 'good', tp.x, tp.y - this.p.targetCm * this.ppc() * 0.6, 700, size);
      if (this.demo) {
        this.demoHits++;
        if (this.demoHits === 1) hud.caption(this.ctx.texts.captions.next);
      }
    } else if (res.type === 'miss_tap') {
      this.marks.push({ x: p.x, y: p.y, t0: p.t, good: false });
      if (this.p.sound === 'yes') sfx.bad();
    }
  }

  pointerUp(p: PointerInfo): void {
    if (this.done || !this.started) return;
    if (p.id !== this.homePointer) return;
    this.homePointer = null;
    const res = this.session.homeUp(p.t);
    if (res && res.type === 'released' && this.p.sound === 'yes') this.ctx.sfx.tap();
  }

  // --- Film und Autoplay: virtuelle Hand ---

  private info(t: number, x = this.vf.x, y = this.vf.y): PointerInfo {
    return { id: VF_ID, x, y, t, type: 'ghost' };
  }

  private beginMove(t: number, to: Pt, dur: number, st: AutoState): void {
    const a = this.auto;
    a.st = st;
    a.t0 = t;
    a.from = { ...this.vf };
    a.to = to;
    a.dur = dur;
  }

  /** Bewegt die Hand; liefert true, wenn sie angekommen ist */
  private stepMove(t: number): boolean {
    const a = this.auto;
    const k = a.dur <= 0 ? 1 : clamp((t - a.t0) / a.dur, 0, 1);
    const e = easeInOut(k);
    this.vf = { x: lerp(a.from.x, a.to.x, e), y: lerp(a.from.y, a.to.y, e) };
    return k >= 1;
  }

  private autoUpdate(_dt: number, t: number): void {
    const { rng } = this.ctx;
    const s = this.session;
    const a = this.auto;
    const demo = this.demo;
    if (s.finished) {
      // Hand zieht sich zurück
      const r = restPoint(this.ctx.stage);
      this.vf = { x: lerp(this.vf.x, r.x, 0.05), y: lerp(this.vf.y, r.y, 0.05) };
      this.vfHeld = false;
      return;
    }
    const homePx = (): Pt => this.toPx(s.home.x, s.home.y);
    switch (a.st) {
      case 'rest':
        if (s.state === 'idle' && t >= a.nextAt) this.beginMove(t, homePx(), demo ? (this.holds === 0 ? 850 : 520) : rng.range(450, 800), 'toHome');
        break;
      case 'toHome':
        if (this.stepMove(t)) {
          this.vf = homePx();
          this.holds++;
          this.pointerDown(this.info(t));
          this.vfHeld = this.homePointer !== null;
          a.releaseSet = false;
          a.releaseAt = Infinity;
          a.skipRelease = !demo && rng.chance(0.03);
          a.skipTap = !demo && rng.chance(0.03);
          a.miss = !demo && rng.chance(0.08);
          const anticipate = demo ? this.holds === 1 : rng.chance(0.07);
          if (anticipate) a.releaseAt = Math.max(t + (demo ? DEMO_EARLY_AFTER_MS : 250), s.onsetAt - (demo ? 800 : rng.range(250, 600)));
          a.st = 'holding';
          a.t0 = t;
        }
        break;
      case 'holding': {
        if (s.state === 'go' && !a.releaseSet && !a.skipRelease) {
          a.releaseSet = true;
          a.releaseAt = s.shownAt + (demo ? DEMO_REACT_MS : rng.range(250, 520));
        }
        if (this.homePointer === null && s.state !== 'armed' && s.state !== 'go') {
          // Zeitüberschreitung oder Fehlstart hat die Runde beendet: Finger heben, kurz zurück
          this.vfHeld = false;
          a.nextAt = t + (demo ? 900 : rng.range(350, 700));
          a.st = 'rest';
          break;
        }
        if (t >= a.releaseAt) {
          this.pointerUp(this.info(t));
          this.vfHeld = false;
          if (s.state === 'moving' && s.target) {
            const tp = this.toPx(s.target.x, s.target.y);
            const off = a.miss ? this.p.targetCm * this.ppc() * 1.9 : 0;
            const ang = rng.range(0, Math.PI * 2);
            this.beginMove(t, { x: tp.x + Math.cos(ang) * off, y: tp.y + Math.sin(ang) * off }, demo ? DEMO_MOVE_MS : rng.range(330, 600), 'toTarget');
          } else {
            a.nextAt = t + (demo ? 900 : rng.range(350, 700));
            a.st = 'rest';
          }
        }
        break;
      }
      case 'toTarget':
        if (a.skipTap) {
          // Ziel nicht erreichen: warten, bis der Durchgang endet
          if (s.state !== 'moving') {
            a.nextAt = t + 400;
            a.st = 'rest';
          }
          break;
        }
        if (this.stepMove(t)) {
          this.pointerDown(this.info(t));
          this.vfPressUntil = t + 170;
          if (s.state === 'moving') {
            a.t0 = t;
            a.st = 'retry';
          } else {
            a.nextAt = t + (demo ? 700 : rng.range(300, 600));
            a.st = 'rest';
          }
        }
        break;
      case 'retry':
        if (s.state !== 'moving') {
          a.nextAt = t + 400;
          a.st = 'rest';
        } else if (t - a.t0 >= 420) {
          const tp = s.target ? this.toPx(s.target.x, s.target.y) : this.vf;
          this.beginMove(t, tp, 260, 'toTarget');
          a.miss = false;
        }
        break;
    }
    // zwischen den Durchgängen leicht neben START parken (statt dauernd darüber)
    if (a.st === 'rest' && s.state === 'idle' && this.holds > 0 && !this.vfHeld) {
      const h = homePx();
      const hs = handSize(this.ctx.stage);
      const park = { x: h.x + hs * 0.9, y: h.y + hs * 0.35 };
      this.vf = { x: lerp(this.vf.x, park.x, 0.06), y: lerp(this.vf.y, park.y, 0.06) };
    }
  }

  private prune(t: number): void {
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
    if (this.msg && t - this.msg.t0 > MSG_MS) this.msg = null;
  }

  // --- Ende ---

  private finishSession(t: number): void {
    if (this.done) return;
    this.done = true;
    this.endT = t;
    const { hud, sfx } = this.ctx;
    hud.setProgress(1);
    const sum = this.session.summary();
    const rt = sum.rtMean ?? GO_TIMEOUT_MS;
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'rt_mean', value: rt, unit: 'ms', better: 'lower' },
        secondary: [{ key: 'hits', value: sum.hits, unit: 'count' }],
        score: 0,
        level: 1,
      });
      return;
    }
    if (this.p.sound === 'yes') sfx.done();
    this.ctx.finish(this.buildResult(sum));
  }

  private buildResult(sum: SprintSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const secondary: Metric[] = [];
    if (sum.mtMean !== null) secondary.push({ key: 'mt_mean', value: sum.mtMean, unit: 'ms' });
    secondary.push({ key: 'hits', value: sum.hits, unit: 'count' });
    secondary.push({ key: 'false_starts', value: sum.falseStarts, unit: 'count' });
    secondary.push({ key: 'error_taps', value: sum.errorTaps, unit: 'count' });
    const rows: ResultDetailRow[] = [];
    if (sum.rtMedian !== null) rows.push({ label: texts.metrics.rt_median, value: fmt.ms(sum.rtMedian) });
    if (sum.rtSd !== null) rows.push({ label: texts.metrics.rt_sd, value: fmt.ms(sum.rtSd) });
    return {
      primary: { key: 'rt_mean', value: sum.rtMean ?? GO_TIMEOUT_MS, unit: 'ms', better: 'lower' },
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
    const { w, h, dpr, u } = this.ctx.stage;
    background(g, w, h, dpr);
    const s = this.session;
    const f = this.field();
    const k = this.ppc();
    const texts = this.ctx.texts;
    // Hinweiszeile oben
    const tsize = clamp(u * 3.4, 13, 22);
    let line = '';
    if (this.msg) line = texts.feedback[this.msg.key];
    else if (s.state === 'idle') line = texts.feedback.hintIdle;
    else if (s.state === 'armed') line = texts.feedback.hintArmed;
    else if (s.state === 'go') line = texts.feedback.hintGo;
    if (line && this.started) text(g, line, w / 2, Math.max(tsize * 0.9, f.y * 0.5), tsize, this.msg ? C.fg : C.dim, { weight: 700 });
    // Startfläche
    const hp = this.toPx(s.home.x, s.home.y);
    const hr = HOME_R_CM * k;
    const held = s.state === 'armed' || s.state === 'go';
    circle(g, hp.x, hp.y, hr, held ? HOME_HELD : 'rgba(255,255,255,0.14)');
    ring(g, hp.x, hp.y, hr, held ? '#FFFFFF' : 'rgba(255,255,255,0.45)', held ? 4 : 3);
    text(g, held ? texts.feedback.hold : texts.feedback.start, hp.x, hp.y, clamp(hr * 0.36, 11, 20), held ? '#06201A' : C.fg, { weight: 800 });
    // Ziel
    if ((s.state === 'go' || s.state === 'moving') && s.target) {
      const tp = this.toPx(s.target.x, s.target.y);
      const tr = s.targetR * k;
      const a = 0.35 + 0.65 * easeOut((t - s.shownAt) / FADE_IN_MS);
      g.save();
      g.globalAlpha = a;
      circle(g, tp.x, tp.y, tr, TARGET_COLOR);
      ring(g, tp.x, tp.y, Math.max(1, tr - Math.max(1.5, tr * 0.04)), 'rgba(255,255,255,0.9)', Math.max(2, tr * 0.07));
      ring(g, tp.x, tp.y, tr + 1.5, 'rgba(5,10,20,0.6)', 2);
      circle(g, tp.x, tp.y, Math.max(2.5, tr * 0.12), 'rgba(5,10,20,0.7)');
      g.restore();
    }
    const cs = clamp(this.p.targetCm * k * 0.45, 10, 30);
    for (const m of this.marks) {
      const al = markAlpha(t - m.t0, MARK_MS);
      if (m.good) drawSoftCheck(g, m.x, m.y, cs, al);
      else drawSoftCross(g, m.x, m.y, clamp(u * 2.2, 10, 22), al);
    }
    if (this.ctx.autoplay) hand(g, this.vf.x, this.vf.y, handSize(this.ctx.stage), this.vfHeld || t < this.vfPressUntil);
  }
}

export const laborStartZiel: ExerciseDefinition = {
  id: 'labor-start-ziel',
  category: 'reaktion',
  minutes: 2,
  color: '#C8641E',
  icon:
    '<circle cx="24" cy="36" r="8" fill="none" stroke="currentColor" stroke-width="3.2"/><circle cx="24" cy="36" r="3" fill="currentColor"/><circle cx="24" cy="10" r="6" fill="currentColor"/><path d="M24 27V19" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-dasharray="1 5.5"/><path d="M19.5 21.5L24 17l4.5 4.5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  create: (ctx) => new StartZiel(ctx),
};
