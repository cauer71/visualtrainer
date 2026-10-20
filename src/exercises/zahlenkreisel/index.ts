/**
 * Zahlenkreisel – die Zahlen 1 … N (Standard 40) stehen auf konzentrischen Ringen, die sich langsam drehen,
 * benachbarte Ringe gegeneinander. Die Ziffern bleiben aufrecht und schaukeln nur leicht um die eigene Achse.
 * Aufgabe: die Zahlen in aufsteigender Folge antippen, so zügig wie möglich; eine Stoppuhr läuft mit.
 *
 * Abgrenzung zur Zahlenjagd (ruhende Tafel): Hier bewegt sich die Suchmenge. Wer eine Zahl gesehen hat und
 * kurz wegschaut, findet sie nicht mehr am selben Ort – man muss bewegte Ziele im Blick behalten bzw. neu
 * finden, und die Gegenbewegung der Ringe lenkt ab. Hergeleitet aus der Literatur zur visuellen Suche (Prinzip
 * Zahlentafel/Trail Making A, Merkmals- und Ähnlichkeitssuche, dynamische Sehschärfe, Crowding; Quellen in
 * science.ts und im Katalog-Eintrag 935).
 *
 * - Ein Durchgang = eine Scheibe mit N Zahlen (Einstellung, 20–40, Standard 40). Die Uhr beginnt mit dem
 *   Erscheinen der Scheibe; gemessen wird bis zum letzten richtigen Tipp.
 * - Gefundene Zahlen bleiben unverändert sichtbar und bekommen nur einen kleinen Punkt (wie in der Zahlenjagd):
 *   die Suchmenge bleibt gleich groß, die Suche wird nicht mit jeder Zahl leichter. Die nächste Zahl wird im
 *   Feld nie hervorgehoben; oben steht nur „Gesucht: 7“.
 * - Fehltipp (andere, noch nicht gefundene Zahl): weiches ✗ am Ort, kein Zeitabzug, zählt als Fehltipp.
 *   Tipp auf schon gefundene Zahl: ignoriert. Tipp ins Leere: blasser Ring, zählt nicht.
 * - Stufe 1–8 (eine Scheibe je Sitzung): Tempo, Unterschied der Ringe und Schaukeln steigen. Geschafft (im
 *   Zeitrahmen, ≤ 5 % Fehltipps) → nächste Sitzung eine Stufe höher; deutlich zu langsam oder viele Fehltipps →
 *   eine tiefer. Hauptwert: geschaffte Stufe; dazu Gesamtzeit (Stoppuhr), Zeit pro Zahl und Fehltipps.
 * - Einstellungen (Intro, gelten als eigene Variante für Vergleiche): Anzahl Zahlen, Drehtempo (50–150 %),
 *   Gegenläufig an/aus, Schaukeln aus/leicht/normal/stark.
 * - „Bewegung reduzieren“: Ringe und Ziffern stehen still (dann ist es eine runde Zahlentafel).
 * - Alles zeitbasiert (virtuelle Zeit: steht in der Pause still), Zufall nur über ctx.rng. Wohin man schaut, wird
 *   nicht gemessen; keine Normwerte.
 * - Für Ende-zu-Ende-Tests: mit `?e2e=1` in der Adresse liest `window.__zahlenkreisel` die Plätze der Zahlen
 *   (nur lesend, nur im Spielmodus).
 */
import { background, C, circle, fillRR, font, rrPath, withAlpha } from '../../core/draw';
import { paramsOf } from '../../core/params';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { captionTop, handSize, restPoint } from '../_shared/tippziele';
import { drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import {
  type FieldGeom,
  type LevelSpec,
  type RingMotion,
  type RingPlan,
  type RunState,
  type Settings,
  type Slot,
  type Sway,
  type Verdict,
  MAX_LEVEL,
  MIN_LEVEL,
  PARAM_DEFS,
  assignNumbers,
  blockTimes,
  chooseLayout,
  isDone,
  judge,
  levelOf,
  levelSpec,
  makeSway,
  newRun,
  nextLevelAfter,
  perNumberMs,
  pickTap,
  primaryLevel,
  registerTap,
  ringMotions,
  roundBonus,
  settingsFrom,
  slotPos,
  slotsOf,
  stopwatch,
  tapPoints,
  tiltAt,
  tipFor,
} from './logic';
import { de, it } from './texts';

/** Notbremse (Tablet weggelegt): danach endet die Sitzung auch mitten in der Scheibe */
const HARD_CAP_MS = 300_000;
const QUICK_HARD_CAP_MS = 45_000;
const QUICK_COUNT = 10;
const APPEAR_MS = 300;
const CLEAR_MS = 1600;
const DEMO_END_MS = 1500;
const DOUBLE_TAP_MS = 80;
const OK_MS = 600;
const BAD_MS = 900;
const MISS_MS = 500;

const ACCENT = '#7A5195';
const MARK = '#C9A6E4';
const FIELD_BG = '#101C31';
const RING_LINE = 'rgba(255,255,255,0.07)';

/** Intro-Film: wenige Zahlen, gut sichtbare Gegenbewegung */
const DEMO_COUNT = 12;
const DEMO_SPEC: LevelSpec = { speedU: 7, ringVar: 0.15, swayDeg: 10, swayHz: 0.4 };
const DEMO_SETTINGS: Settings = { count: DEMO_COUNT, tempo: 1, counter: true, sway: 1 };
/** Im Film tippt die Hand nur die ersten … Zahlen */
const DEMO_TAPS = 5;

type Phase = 'play' | 'clear' | 'end' | 'done';

interface Item {
  num: number;
  label: string;
  slot: Slot;
  sway: Sway;
  x: number;
  y: number;
  tilt: number;
  done: boolean;
}

interface Fx {
  kind: 'ok' | 'bad' | 'miss';
  x: number;
  y: number;
  t0: number;
}

interface E2EView {
  next: number;
  total: number;
  phase: Phase;
  items: Array<{ num: number; x: number; y: number; r: number; done: boolean }>;
  canvasSize: { w: number; h: number };
}

const e2eEnabled = (): boolean => {
  try {
    return typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('e2e') === '1';
  } catch {
    return false;
  }
};

class Zahlenkreisel implements Exercise {
  private readonly demo: boolean;
  private readonly settings: Settings;
  private readonly spec: LevelSpec;
  private readonly level: number;
  private phase: Phase = 'play';
  private phaseT = 0;
  private sessionT0 = 0;
  private roundT0 = 0;
  private lastT = 0;
  private lastDownT = -1e9;
  private geom!: FieldGeom;
  private plan!: RingPlan;
  private motions: RingMotion[] = [];
  private items: Item[] = [];
  private run!: RunState;
  private fx: Fx[] = [];
  private verdict: Verdict = 'same';
  private points = 0;
  private endMs = 0;
  private msg: string | null = null;
  // Intro-Film / Autoplay
  private plannedFor = -1;
  private autoAt = 0;
  private readonly e2e: boolean;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.level = levelOf(ctx.startLevel ?? MIN_LEVEL);
    if (this.demo) {
      this.settings = DEMO_SETTINGS;
      this.spec = DEMO_SPEC;
    } else {
      const s = settingsFrom(paramsOf(ctx, PARAM_DEFS));
      this.settings = ctx.quick ? { ...s, count: Math.min(s.count, QUICK_COUNT) } : s;
      this.spec = levelSpec(this.level);
    }
    this.e2e = !this.demo && e2eEnabled();
  }

  // ------------------------------------------------------------------ Aufbau

  start(t: number): void {
    const { ctx } = this;
    this.sessionT0 = t;
    ctx.hud.setScore(this.demo ? null : 0);
    ctx.hud.setProgress(0);
    if (this.demo) {
      const r = restPoint(ctx.stage);
      ctx.ghost.moveTo(r.x, r.y, { move: 0 });
      ctx.hud.caption(ctx.texts.captions.rings);
    } else ctx.hud.setLabel(`${ctx.texts.feedback.level} ${this.level}`);
    this.layout(true);
    this.roundT0 = t;
    this.lastT = t;
    this.run = newRun(this.items.length, t);
    this.autoAt = t + 900;
    this.syncItems(t);
    if (this.e2e) this.exposeE2E();
  }

  /** Feld, Ringplan, Bewegung und (beim ersten Mal) Zuordnung der Zahlen aus der Live-Bühne */
  private layout(first: boolean): void {
    const { ctx } = this;
    const s = ctx.stage;
    const m = Math.max(8, s.u * 1.6);
    const bottom = this.demo ? captionTop(s) - handSize(s) * 0.6 - 6 : s.h - m;
    const N = this.settings.count;
    const lay = chooseLayout(s.w, s.h, s.u, bottom, N);
    this.geom = lay.geom;
    this.plan = lay.plan;
    this.motions = ringMotions(this.plan, this.spec, this.settings, s.u, ctx.rng);
    const slots = slotsOf(this.plan.counts);
    if (first) {
      const numberAt = assignNumbers(slots, this.plan.counts, ctx.rng);
      this.items = slots.map((slot, i) => ({
        num: numberAt[i],
        label: String(numberAt[i]),
        slot,
        sway: makeSway(this.spec, this.settings.sway, ctx.rng),
        x: 0,
        y: 0,
        tilt: 0,
        done: false,
      }));
    } else {
      // Nach dem Drehen des Geräts: dieselben Zahlen (in derselben Reihenfolge) auf die neuen Plätze
      const order = this.items.slice();
      this.items = slots.map((slot, i) => ({ ...order[i % order.length], slot }));
    }
  }

  private tSec(t: number): number {
    return this.ctx.reducedMotion ? 0 : Math.max(0, t - this.roundT0) / 1000;
  }

  /** Zahlen an ihre Stelle zur Zeit t setzen (Ring dreht, Ziffer bleibt aufrecht und schaukelt) */
  private syncItems(t: number): void {
    const ts = this.tSec(t);
    const { cx, cy } = this.geom;
    for (const it of this.items) {
      const p = slotPos(cx, cy, this.motions[it.slot.ring], it.slot.j, ts);
      it.x = p.x;
      it.y = p.y;
      it.tilt = this.ctx.reducedMotion ? 0 : tiltAt(it.sway, ts);
    }
  }

  private posAt(it: Item, t: number): { x: number; y: number } {
    return slotPos(this.geom.cx, this.geom.cy, this.motions[it.slot.ring], it.slot.j, this.tSec(t));
  }

  resize(): void {
    if (!this.items.length) return;
    this.layout(false);
    this.syncItems(this.lastT);
    this.fx = [];
    if (this.ctx.autoplay) {
      this.ctx.ghost.clear();
      this.plannedFor = -1;
    }
  }

  // ------------------------------------------------------------------ Ablauf

  update(_dt: number, t: number): void {
    if (this.phase === 'done') return;
    const { ctx } = this;
    this.lastT = t;
    if (!this.demo && this.phase === 'play') {
      ctx.hud.setProgress(Math.min(1, (this.run.next - 1) / Math.max(1, this.run.total)));
      if (t - this.sessionT0 >= (ctx.quick ? QUICK_HARD_CAP_MS : HARD_CAP_MS)) {
        this.endMs = t - this.roundT0;
        this.finish(false);
        return;
      }
    }
    this.syncItems(t);
    if (this.fx.length) this.fx = this.fx.filter((f) => t - f.t0 < (f.kind === 'ok' ? OK_MS : f.kind === 'bad' ? BAD_MS : MISS_MS));
    switch (this.phase) {
      case 'play':
        if (this.demo) this.demoStep(t);
        else if (ctx.autoplay) this.autoStep(t);
        break;
      case 'clear':
        if (t - this.phaseT >= CLEAR_MS) this.finish(true);
        break;
      case 'end':
        if (t - this.phaseT >= DEMO_END_MS) {
          this.phase = 'done';
          ctx.finish({ primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' }, secondary: [], score: 0, level: MIN_LEVEL });
        }
        break;
      default:
        break;
    }
  }

  // ------------------------------------------------------------------ Eingabe

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'play' || !this.items.length) return;
    if (p.t - this.lastDownT < DOUBLE_TAP_MS) return;
    this.lastDownT = p.t;
    // Position zum Zeitpunkt des Tipps (nicht des letzten Bildes)
    const hit = this.items.map((it) => {
      const q = this.posAt(it, p.t);
      return { x: q.x, y: q.y, r: this.plan.hitR, num: it.num, done: it.done };
    });
    const res = pickTap(hit, p.x, p.y, this.run.next);
    if (res.kind === 'none') {
      this.fx.push({ kind: 'miss', x: p.x, y: p.y, t0: p.t });
      return;
    }
    if (res.kind === 'old') return;
    const it = this.items[res.i];
    const kind = registerTap(this.run, it.num, p.t);
    if (kind === 'target') this.onTarget(it, p.t);
    else if (kind === 'wrong') this.onWrong(it, p.t);
  }

  private onTarget(it: Item, t: number): void {
    const { ctx } = this;
    it.done = true;
    ctx.sfx.tap();
    this.fx.push({ kind: 'ok', x: it.x, y: it.y - this.plan.F * 0.9, t0: t });
    if (!this.demo) {
      this.points += tapPoints(this.level);
      ctx.hud.setScore(this.points);
    } else this.demoCaptions();
    if (isDone(this.run)) this.roundDone(t);
  }

  private onWrong(it: Item, t: number): void {
    this.ctx.sfx.bad();
    this.fx.push({ kind: 'bad', x: it.x, y: it.y, t0: t });
  }

  private roundDone(t: number): void {
    const { ctx } = this;
    ctx.ghost.clear();
    ctx.sfx.good();
    this.endMs = t - this.roundT0;
    this.phaseT = t;
    if (this.demo) {
      this.phase = 'end';
      return;
    }
    this.verdict = judge(this.run.total, this.level, this.endMs, this.run.errors);
    this.points += roundBonus(this.level, this.verdict);
    ctx.hud.setScore(this.points);
    ctx.hud.setProgress(1);
    const up = this.verdict === 'success' && this.level < MAX_LEVEL;
    this.msg = `${ctx.texts.feedback.done} ${stopwatch(this.endMs)}${up ? ` · ${ctx.texts.feedback.up}` : ''}`;
    this.phase = 'clear';
  }

  private finish(complete: boolean): void {
    const { ctx } = this;
    this.phase = 'done';
    ctx.ghost.clear();
    ctx.sfx.done();
    const N = this.run.total;
    const verdict: Verdict = complete ? this.verdict : 'fail';
    const intervals = this.run.intervals;
    const per = perNumberMs(intervals);
    const blocks = blockTimes(intervals);
    const fmt = ctx.fmt;
    const tx = ctx.texts.feedback;
    ctx.finish({
      primary: { key: 'level', value: primaryLevel(this.level, verdict), unit: 'level', better: 'higher' },
      secondary: [
        ...(complete ? [{ key: 'total', value: Math.round(this.endMs), unit: 'time' as const }] : [{ key: 'found', value: this.run.next - 1, unit: 'count' as const }]),
        ...(Number.isFinite(per) ? [{ key: 'perNumber', value: Math.round(per), unit: 'time' as const }] : []),
        { key: 'errors', value: this.run.errors, unit: 'count' as const },
      ],
      details: blocks.length >= 2 ? [{ title: tx.blocks, rows: blocks.map((b) => ({ label: `${b.from}–${b.to}`, value: fmt.time(b.ms, 1), text: `${fmt.time(b.ms / Math.max(1, b.to - b.from + 1), 2)} ${tx.perNumber}` })), note: tx.blocksNote }] : undefined,
      score: this.points,
      level: nextLevelAfter(this.level, verdict),
      tip: tipFor({ N, level: this.level, totalMs: this.endMs, errors: this.run.errors, intervals, complete }),
    });
  }

  // ------------------------------------------------------------------ Geister-Hand

  private demoCaptions(): void {
    const { hud, texts } = this.ctx;
    const found = this.run.next - 1;
    if (found === 1) hud.caption(texts.captions.order);
    else if (found === 2) hud.caption(texts.captions.sway);
    else if (found === 3) hud.caption(texts.captions.marked);
    else if (found === 4) hud.caption(texts.captions.watch);
  }

  /** Intro-Film: die Hand tippt 1, 2, 3 … dem drehenden Ring voraus, nach DEMO_TAPS Zahlen ist Schluss */
  private demoStep(t: number): void {
    const { ghost, stage } = this.ctx;
    if (!ghost.idle || this.plannedFor === this.run.next) return;
    if (this.run.next > DEMO_TAPS) {
      this.plannedFor = this.run.next;
      ghost.moveTo(stage.w * 0.92, stage.h * 0.55, { delay: 300, move: 600 });
      this.msg = this.ctx.texts.feedback.demoEnd;
      this.phase = 'end';
      this.phaseT = t;
      return;
    }
    this.plannedFor = this.run.next;
    const it = this.items.find((q) => q.num === this.run.next);
    if (!it) return;
    const first = this.run.next === 1;
    const delay = first ? 1100 : 250;
    const move = first ? 800 : 620;
    const a = this.posAt(it, t + delay + move + 30);
    ghost.tap(a.x, a.y, { delay, move });
  }

  /** Autoplay (Tests): Suchzeit wächst mit der Zahl der Zahlen, selten ein Fehltipp */
  private autoStep(t: number): void {
    const { ghost, rng } = this.ctx;
    if (!ghost.idle || t < this.autoAt || isDone(this.run)) return;
    const delay = (200 + 14 * this.run.total) * rng.range(0.6, 1.3);
    const move = rng.range(240, 380);
    let target = this.items.find((q) => q.num === this.run.next)!;
    if (rng.chance(0.05)) {
      const others = this.items.filter((q) => !q.done && q.num !== this.run.next);
      if (others.length) target = rng.pick(others);
    }
    const a = this.posAt(target, t + delay + move + 30);
    const j = this.plan.hitR * 0.25;
    ghost.tap(a.x + rng.range(-j, j), a.y + rng.range(-j, j), { delay, move });
    this.autoAt = t + delay + move + 200;
  }

  // ------------------------------------------------------------------ Test-Zugang (nur ?e2e=1)

  private exposeE2E(): void {
    const view = (): E2EView => {
      this.syncItems(this.ctx.now());
      return {
        next: this.run.next,
        total: this.run.total,
        phase: this.phase,
        items: this.items.map((it) => ({ num: it.num, x: it.x, y: it.y, r: this.plan.hitR, done: it.done })),
        canvasSize: { w: this.ctx.stage.w, h: this.ctx.stage.h },
      };
    };
    (window as unknown as { __zahlenkreisel?: () => E2EView }).__zahlenkreisel = view;
  }

  destroy(): void {
    if (this.e2e) delete (window as unknown as { __zahlenkreisel?: unknown }).__zahlenkreisel;
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    if (!this.items.length) return;
    this.drawField(g);
    this.drawNumbers(g, t);
    this.drawFx(g, t);
    this.drawPill(g, t);
  }

  private drawField(g: CanvasRenderingContext2D): void {
    const { cx, cy, R } = this.geom;
    circle(g, cx, cy, R, FIELD_BG);
    // Kaum sichtbare Ringlinien (Orientierung, kein Reiz)
    g.save();
    g.strokeStyle = RING_LINE;
    g.lineWidth = 1.5;
    for (const m of this.motions) {
      if (m.r <= 0) continue;
      g.beginPath();
      g.arc(cx, cy, m.r, 0, Math.PI * 2);
      g.stroke();
    }
    g.restore();
  }

  private drawNumbers(g: CanvasRenderingContext2D, t: number): void {
    const F = this.plan.F;
    const still = this.ctx.reducedMotion;
    const appear = still ? 1 : easeOut(clamp((t - this.roundT0) / APPEAR_MS, 0, 1));
    const clear = this.phase === 'clear' || this.phase === 'end';
    g.save();
    g.font = font(F, 800);
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    for (const it of this.items) {
      g.save();
      g.globalAlpha = appear * (clear ? 0.85 : 1);
      g.translate(it.x, it.y);
      g.rotate(it.tilt);
      g.fillStyle = C.fg;
      g.fillText(it.label, 0, F * 0.04);
      g.restore();
      if (it.done) {
        // Kleiner Punkt oben rechts: gefunden – die Zahl selbst bleibt unverändert
        const r = Math.max(3.5, F * 0.1);
        const half = (it.label.length === 1 ? 0.3 : 0.58) * F;
        g.globalAlpha = appear * 0.95;
        circle(g, it.x + half + r * 0.6, it.y - F * 0.36, r, MARK);
      }
    }
    g.restore();
  }

  private drawFx(g: CanvasRenderingContext2D, t: number): void {
    const F = this.plan.F;
    for (const f of this.fx) {
      const age = t - f.t0;
      if (f.kind === 'ok') drawSoftCheck(g, f.x, f.y, F * 0.32, markAlpha(age, OK_MS));
      else if (f.kind === 'bad') drawSoftCross(g, f.x, f.y, F * 0.34, markAlpha(age, BAD_MS));
      else {
        g.save();
        g.globalAlpha = 0.45 * markAlpha(age, MISS_MS);
        g.beginPath();
        g.arc(f.x, f.y, Math.max(12, F * 0.4), 0, Math.PI * 2);
        g.strokeStyle = C.fg;
        g.lineWidth = 2.5;
        g.stroke();
        g.restore();
      }
    }
  }

  /** Anzeige oben: „Gesucht: 7“ und die Stoppuhr (mm:ss,hh); am Ende die Zeit */
  private drawPill(g: CanvasRenderingContext2D, t: number): void {
    const P = this.geom.pill;
    const H = P.h;
    const cy = P.y + H / 2;
    const tx = this.ctx.texts.feedback;
    const done = isDone(this.run) || this.phase !== 'play';
    const label = this.msg ?? tx.search;
    const elapsed = done ? this.endMs : Math.max(0, t - this.roundT0);
    const watch = stopwatch(elapsed);
    const box = H * 0.8;
    const padL = H * 0.45;
    const gap = H * 0.22;
    const padR = H * 0.4;
    let labelPx = Math.round(clamp(H * 0.42, 18, 28));
    let watchPx = Math.round(clamp(H * 0.36, 15, 24));
    g.save();
    g.font = font(labelPx, 700);
    let lw = g.measureText(label).width;
    g.font = font(watchPx, 700);
    let ww = this.msg ? 0 : g.measureText(watch).width;
    const showBox = !this.msg;
    const fixed = padL + gap + padR + (showBox ? box + gap : 0);
    const maxW = Math.max(60, P.w - fixed);
    if (lw + ww > maxW) {
      const k = maxW / (lw + ww);
      labelPx = Math.max(13, Math.floor(labelPx * k));
      watchPx = Math.max(12, Math.floor(watchPx * k));
      g.font = font(labelPx, 700);
      lw = g.measureText(label).width;
      g.font = font(watchPx, 700);
      ww = this.msg ? 0 : g.measureText(watch).width;
    }
    g.restore();
    const pw = padL + lw + (showBox ? gap + box : 0) + (ww ? gap * 2 + ww : 0) + padR;
    const x0 = P.x + P.w / 2 - pw / 2;
    fillRR(g, x0, P.y, pw, H, H / 2, 'rgba(255,255,255,0.10)');
    g.save();
    rrPath(g, x0 + 0.75, P.y + 0.75, pw - 1.5, H - 1.5, H / 2);
    g.strokeStyle = 'rgba(255,255,255,0.24)';
    g.lineWidth = 1.5;
    g.stroke();
    g.textAlign = 'left';
    g.textBaseline = 'middle';
    g.font = font(labelPx, 700);
    g.fillStyle = this.msg ? C.fg : C.dim;
    g.fillText(label, x0 + padL, cy + 1);
    let x = x0 + padL + lw;
    if (showBox) {
      x += gap;
      fillRR(g, x, cy - box / 2, box, box, box * 0.28, withAlpha(ACCENT, 0.6));
      g.textAlign = 'center';
      g.font = font(box * (this.run.next >= 10 ? 0.5 : 0.58), 800);
      g.fillStyle = C.white;
      g.fillText(done ? '✓' : String(this.run.next), x + box / 2, cy + 1);
      x += box;
    }
    if (ww) {
      x += gap;
      g.fillStyle = 'rgba(255,255,255,0.18)';
      g.fillRect(x, cy - H * 0.26, 1.5, H * 0.52);
      x += gap;
      g.textAlign = 'left';
      g.font = font(watchPx, 700);
      g.fillStyle = C.dim;
      g.fillText(watch, x, cy + 1);
    }
    g.restore();
  }
}

export const zahlenkreisel: ExerciseDefinition = {
  id: 'zahlenkreisel',
  category: 'konzentration',
  minutes: 2,
  color: ACCENT,
  showsLevel: true,
  params: PARAM_DEFS,
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="2.6"><circle cx="24" cy="24" r="19"/><circle cx="24" cy="24" r="11" opacity=".75"/></g><g fill="currentColor"><circle cx="24" cy="5" r="3.2"/><circle cx="41" cy="31" r="3.2"/><circle cx="8" cy="33" r="3.2"/><circle cx="33" cy="20" r="2.6"/><circle cx="16" cy="27" r="2.6"/></g><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M35 8.5l4 1.5-.6 4.2"/><path d="M15.5 17l-2.6 2.6 1.4 3.4"/></g>',
  texts: { de, it },
  create: (ctx) => new Zahlenkreisel(ctx),
};
