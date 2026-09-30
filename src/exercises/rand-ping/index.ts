/**
 * Rand-Ping – Mitte im Blick behalten, Punkt am Rand bemerken und seinen Ort antippen.
 *
 * Abgrenzung zu Blitzblick (Kurzdarbietung mit Maske und Fahrzeug-Wahl) und Blitzreaktion (einfaches
 * Antippen irgendwo): Hier ist das Fixierkreuz ruhig, ein Punkt blendet weich am Rand auf (8 Richtungen ×
 * 2–3 Ringe, die ganze Bühne) und man tippt, WO er war. Damit der Blick in der Mitte bleibt, steht dort
 * gleichzeitig ein kleines Zeichen (Kreis oder Quadrat), das man danach wählt – eine kleine Doppelaufgabe.
 *
 * - Reiz weich ein- und ausgeblendet (je ≥ 150 ms, Sinus-Übergang), kein Blitzen, keine Leuchtsäume.
 * - Stufe (Staircase, 2-down/1-up → ≈ 71 % Durchgänge ganz richtig): Anzeigedauer 1000 → 400 ms,
 *   ab Stufe 5 zusätzlich ein dritter, äußerer Ring, der Punkt wird etwas kleiner.
 * - Richtig = Ort (nächster der möglichen Orte) UND Zeichen. Quoten für Rand und Mitte getrennt.
 * - Ehrlich: Wohin man schaut, wird nicht gemessen (kein Eye-Tracker), und die Übung ist kein
 *   Gesichtsfeldtest.
 * - Tastatur (Computer): 1/← = Kreis, 2/→ = Quadrat; der Ort wird mit Maus oder Finger getippt.
 */
import { background, button, circle, glow, hit, ring, rrPath, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo } from '../../core/types';
import {
  type PingLayout,
  type Pt,
  type Rect,
  type Spot,
  type TrialResult,
  MAX_LEVEL,
  MIN_LEVEL,
  computeStats,
  dotRadiusU,
  exposureMs,
  layoutPing,
  levelOf,
  nearestSpot,
  pickSpot,
  pickSymbol,
  pointsFor,
  spotPos,
  spotsFor,
  tipFor,
  windowAlpha,
} from './logic';
import { de, it } from './texts';

const TRIALS = 16;
const QUICK_TRIALS = 3;
const FIRST_FIX_MS = [900, 1400] as const;
const FIX_MS = [700, 1300] as const;
/** Kurze Lücke zwischen Ende des Reizes und Antwortfeldern */
const AFTER_STIM_MS = 120;
const RESP_TIMEOUT_MS = 7000;
const FEEDBACK_MS = 900;
// Intro-Film: Stufe 1, lange Darbietung, zwei Durchgänge
const DEMO_EXPOSURE_MS = 1100;
const DEMO_FEEDBACK_MS = 1300;
const DEMO_TRIALS: Array<{ dir: number; ring: number; symbol: 0 | 1 }> = [
  { dir: 3, ring: 1, symbol: 0 },
  { dir: 6, ring: 0, symbol: 1 },
];

const DOT = '#FFE9B8';
const DOT_GLOW = '#D9B877';
const FG = 'rgba(232,238,247,0.9)';
const GOOD = '#4ADE80';
const MISS = '#F87171';

interface Trial {
  level: number;
  spots: Spot[];
  spotIdx: number;
  symbol: 0 | 1;
  exposure: number;
  /** Beginn des Reizes (erstes gezeichnetes Bild) */
  t0: number;
  edgeAns: number | null;
  centerAns: 0 | 1 | null;
  edgeOk: boolean;
  centerOk: boolean;
}

class RandPing implements Exercise {
  private readonly demo: boolean;
  private readonly total: number;
  private readonly stair: Staircase;
  private phase: 'fix' | 'stim' | 'resp' | 'feedback' | 'done' = 'fix';
  private until = 0;
  private respT0 = 0;
  private trial: Trial | null = null;
  private history: Spot[] = [];
  private symbols: number[] = [];
  private results: TrialResult[] = [];
  private points = 0;
  private autoPlanned = false;
  private endT = Infinity;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.total = this.demo ? DEMO_TRIALS.length : ctx.quick ? QUICK_TRIALS : TRIALS;
    this.stair = new Staircase({ start: ctx.startLevel ?? MIN_LEVEL, min: MIN_LEVEL, max: MAX_LEVEL, down: 2, up: 1 });
  }

  // --- Anordnung: immer live aus der Bühne ---

  private get level(): number {
    return this.demo ? MIN_LEVEL : levelOf(this.stair.level);
  }

  private dotR(): number {
    return dotRadiusU(this.trial ? this.trial.level : this.level) * this.ctx.stage.u;
  }

  private lay(): PingLayout {
    const s = this.ctx.stage;
    const bottom = this.demo ? captionTop(s) - 6 : s.h;
    return layoutPing(s.w, s.h, s.u, bottom, this.dotR());
  }

  /** Radius des zentralen Zeichens */
  private symR(): number {
    return Math.max(14, this.ctx.stage.u * 2.3);
  }

  private restPoint(): Pt {
    const { w, u } = this.ctx.stage;
    const hs = clamp(u * 13, 48, 110);
    return { x: w - hs * 0.75, y: captionTop(this.ctx.stage) - hs * 0.95 };
  }

  start(t: number): void {
    const { hud, ghost, texts, rng } = this.ctx;
    this.phase = 'fix';
    this.until = t + (this.demo ? 900 : rng.range(FIRST_FIX_MS[0], FIRST_FIX_MS[1]));
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateLabel();
    if (this.demo) {
      hud.caption(texts.captions.center);
      const r = this.restPoint();
      ghost.moveTo(r.x, r.y, { move: 0 });
    }
  }

  update(_dt: number, t: number): void {
    if (this.phase === 'done') return;
    const tr = this.trial;
    if (this.phase === 'fix' && t >= this.until) this.beginStim(t);
    else if (this.phase === 'stim' && tr && t - tr.t0 >= tr.exposure + AFTER_STIM_MS) this.beginResp(t);
    else if (this.phase === 'resp' && tr) {
      if (t - this.respT0 >= RESP_TIMEOUT_MS) this.resolve(t);
      else if (this.ctx.autoplay && !this.demo) this.autoUpdate(tr);
    } else if (this.phase === 'feedback' && t >= this.until) {
      if (this.results.length >= this.total) this.finishSession(t);
      else this.beginFix(t);
    }
  }

  // -------------------------------------------------------------------------
  // Ablauf eines Durchgangs: Fixieren → Reiz → Antwort → Rückmeldung

  private beginFix(t: number): void {
    const { rng, hud, texts } = this.ctx;
    this.trial = null;
    this.phase = 'fix';
    this.until = t + (this.demo ? 700 : rng.range(FIX_MS[0], FIX_MS[1]));
    if (this.demo) hud.caption(texts.captions.again);
  }

  private beginStim(t: number): void {
    const { rng, hud, texts } = this.ctx;
    const n = this.results.length;
    const level = this.level;
    const spots = spotsFor(level);
    let spotIdx: number;
    let symbol: 0 | 1;
    if (this.demo) {
      const s = DEMO_TRIALS[n];
      spotIdx = spots.findIndex((p) => p.dir === s.dir && p.ring === s.ring);
      symbol = s.symbol;
    } else {
      spotIdx = pickSpot(rng, spots, this.history);
      symbol = pickSymbol(rng, this.symbols);
    }
    this.history.push(spots[spotIdx]);
    this.symbols.push(symbol);
    this.trial = {
      level,
      spots,
      spotIdx,
      symbol,
      exposure: this.demo ? DEMO_EXPOSURE_MS : exposureMs(level),
      t0: t,
      edgeAns: null,
      centerAns: null,
      edgeOk: false,
      centerOk: false,
    };
    this.phase = 'stim';
    this.autoPlanned = false;
    this.updateLabel();
    if (this.demo && n === 0) hud.caption(texts.captions.dot);
  }

  private beginResp(t: number): void {
    const { ghost, hud, texts } = this.ctx;
    const tr = this.trial!;
    this.phase = 'resp';
    this.respT0 = t;
    if (!this.demo) return;
    if (this.results.length === 0) hud.caption(texts.captions.where);
    const lay = this.lay();
    const p = spotPos(lay, tr.spots[tr.spotIdx]);
    const b = tr.symbol === 0 ? lay.circleBtn : lay.squareBtn;
    ghost.tap(p.x, p.y, { delay: 350, move: 800 });
    ghost.tap(b.x + b.w / 2, b.y + b.h / 2, { delay: 250, move: 700 });
  }

  pointerDown(p: PointerInfo): void {
    const tr = this.trial;
    if (this.phase !== 'resp' || !tr) return;
    const lay = this.lay();
    const onCircle = hit(lay.circleBtn, p.x, p.y, 4);
    const onSquare = hit(lay.squareBtn, p.x, p.y, 4);
    if (onCircle || onSquare) {
      if (tr.centerAns === null) this.answerCenter(tr, onCircle ? 0 : 1, p.t);
      return;
    }
    if (tr.edgeAns !== null) return;
    // Tipps direkt in der Mitte gehören zu den Zeichen-Feldern, nicht zum Ort
    if (Math.hypot(p.x - lay.cx, p.y - lay.cy) < lay.centerExclusion) return;
    const idx = nearestSpot(lay, tr.spots, p.x, p.y);
    if (idx < 0) return;
    tr.edgeAns = idx;
    this.ctx.sfx.tap();
    if (this.demo && this.results.length === 0) this.ctx.hud.caption(this.ctx.texts.captions.symbol);
    this.checkComplete(tr, p.t);
  }

  /** Tastatur: 1 / ← / ↑ = Kreis, 2 / → / ↓ = Quadrat */
  keyDown(key: string, t: number): void {
    const tr = this.trial;
    if (this.phase !== 'resp' || !tr || tr.centerAns !== null) return;
    if (key === '1' || key === 'ArrowLeft' || key === 'ArrowUp') this.answerCenter(tr, 0, t);
    else if (key === '2' || key === 'ArrowRight' || key === 'ArrowDown') this.answerCenter(tr, 1, t);
  }

  private answerCenter(tr: Trial, v: 0 | 1, t: number): void {
    tr.centerAns = v;
    this.ctx.sfx.tap();
    this.checkComplete(tr, t);
  }

  private checkComplete(tr: Trial, t: number): void {
    if (tr.edgeAns !== null && tr.centerAns !== null) this.resolve(t);
  }

  /** Durchgang auswerten (auch bei Zeitablauf: Fehlendes zählt als falsch) */
  private resolve(t: number): void {
    const tr = this.trial;
    if (!tr || this.phase !== 'resp') return;
    const { sfx, hud, ghost } = this.ctx;
    tr.edgeOk = tr.edgeAns === tr.spotIdx;
    tr.centerOk = tr.centerAns === tr.symbol;
    this.results.push({ edgeOk: tr.edgeOk, centerOk: tr.centerOk, ring: tr.spots[tr.spotIdx].ring });
    this.points += pointsFor(tr.level, tr.edgeOk, tr.centerOk);
    if (tr.edgeOk && tr.centerOk) sfx.good();
    else sfx.bad();
    if (!this.demo) {
      this.stair.update(tr.edgeOk && tr.centerOk);
      hud.setScore(this.points);
    }
    hud.setProgress(this.results.length / this.total);
    this.phase = 'feedback';
    this.until = t + (this.demo ? DEMO_FEEDBACK_MS : FEEDBACK_MS);
    if (this.demo) {
      const r = this.restPoint();
      ghost.moveTo(r.x, r.y, { delay: 300, move: 500 });
    }
  }

  private updateLabel(): void {
    if (this.demo) return;
    this.ctx.hud.setLabel(`${this.ctx.texts.feedback.level} ${this.trial ? this.trial.level : levelOf(this.stair.level)}`);
  }

  /** Autoplay (Tests): meist richtiger Ort und richtiges Zeichen, manchmal der Nachbarort oder das falsche Zeichen */
  private autoUpdate(tr: Trial): void {
    const { ghost, rng } = this.ctx;
    if (this.autoPlanned || !ghost.idle) return;
    this.autoPlanned = true;
    const lay = this.lay();
    let idx = tr.spotIdx;
    if (!rng.chance(0.85)) {
      const s = tr.spots[tr.spotIdx];
      const nb = tr.spots.findIndex((q) => q.ring === s.ring && q.dir === (s.dir + 1) % 8);
      if (nb >= 0) idx = nb;
    }
    const p = spotPos(lay, tr.spots[idx]);
    const sym = rng.chance(0.88) ? tr.symbol : ((1 - tr.symbol) as 0 | 1);
    const b = sym === 0 ? lay.circleBtn : lay.squareBtn;
    ghost.tap(p.x, p.y, { delay: rng.range(450, 850), move: rng.range(300, 450) });
    ghost.tap(b.x + b.w / 2, b.y + b.h / 2, { delay: 120, move: rng.range(250, 400) });
  }

  // -------------------------------------------------------------------------

  private finishSession(t: number): void {
    this.phase = 'done';
    this.endT = t;
    const { sfx, hud } = this.ctx;
    hud.setProgress(1);
    const stats = computeStats(this.results);
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' },
        secondary: [{ key: 'edgeRate', value: Math.round(stats.edgeRate), unit: 'percent' }],
        score: this.points,
        level: MIN_LEVEL,
      });
      return;
    }
    sfx.done();
    const thr = this.stair.threshold();
    this.ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), MIN_LEVEL, MAX_LEVEL), unit: 'level', better: 'higher' },
      secondary: [
        { key: 'edgeRate', value: Math.round(stats.edgeRate), unit: 'percent' },
        { key: 'centerRate', value: Math.round(stats.centerRate), unit: 'percent' },
      ],
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip: tipFor(stats),
    });
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, now: number): void {
    const t = Math.min(now, this.endT);
    const { w, h, u, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    const lay = this.lay();
    const tr = this.trial;
    const symR = this.symR();
    const dotR = this.dotR();
    if (this.phase === 'resp' || this.phase === 'feedback') {
      if (tr) this.drawResponse(g, lay, tr, dotR, u);
      return;
    }
    drawFixation(g, lay.cx, lay.cy, symR, u);
    if (this.phase === 'stim' && tr) {
      const a = windowAlpha(t - tr.t0, tr.exposure);
      if (a <= 0.005) return;
      drawSymbol(g, lay.cx, lay.cy, symR, tr.symbol, FG, Math.max(3, u * 0.55), a);
      const p = spotPos(lay, tr.spots[tr.spotIdx]);
      drawDot(g, p.x, p.y, dotR, a);
    }
  }

  private drawResponse(g: CanvasRenderingContext2D, lay: PingLayout, tr: Trial, dotR: number, u: number): void {
    const fb = this.phase === 'feedback';
    // mögliche Orte: dezente Ringe (nur zur Orientierung beim Antworten)
    const mr = Math.max(7, dotR * 0.5);
    tr.spots.forEach((s, i) => {
      const p = spotPos(lay, s);
      const picked = tr.edgeAns === i;
      g.save();
      g.globalAlpha = picked ? 1 : 0.4;
      ring(g, p.x, p.y, mr, picked ? '#FFFFFF' : 'rgba(232,238,247,0.8)', picked ? Math.max(3, u * 0.5) : 1.5);
      if (picked) circle(g, p.x, p.y, mr * 0.45, 'rgba(255,255,255,0.85)');
      g.restore();
    });
    // Zeichen-Felder
    const pick = tr.centerAns;
    this.drawChoice(g, lay.circleBtn, 0, pick === 0 ? 'active' : 'normal', u);
    this.drawChoice(g, lay.squareBtn, 1, pick === 1 ? 'active' : 'normal', u);
    if (!fb) return;
    // Rückmeldung Ort: richtiger Punkt wird noch einmal gezeigt, ✓ bei Treffer, ✗ am getippten Ort bei Fehler
    const truth = spotPos(lay, tr.spots[tr.spotIdx]);
    drawDot(g, truth.x, truth.y, dotR, 0.85);
    ring(g, truth.x, truth.y, dotR * 1.9, withAlpha(DOT, 0.8), Math.max(2, u * 0.4), [Math.max(4, u), Math.max(4, u)]);
    if (tr.edgeOk) drawCheck(g, truth.x, truth.y - dotR * 2.7, Math.max(10, u * 2), u);
    else if (tr.edgeAns !== null) {
      const q = spotPos(lay, tr.spots[tr.edgeAns]);
      drawCross(g, q.x, q.y, Math.max(9, u * 1.8), u);
    }
    // Rückmeldung Zeichen: richtiges Feld grün umrandet, Wahl mit ✓/✗
    const right = tr.symbol === 0 ? lay.circleBtn : lay.squareBtn;
    g.save();
    rrPath(g, right.x - 3, right.y - 3, right.w + 6, right.h + 6, Math.min(right.w, right.h) * 0.25);
    g.strokeStyle = GOOD;
    g.lineWidth = Math.max(3, u * 0.5);
    g.stroke();
    g.restore();
    if (tr.centerAns !== null) {
      const b = tr.centerAns === 0 ? lay.circleBtn : lay.squareBtn;
      const cx = b.x + b.w - 6;
      const cy = b.y + 6;
      if (tr.centerOk) drawCheck(g, cx, cy, Math.max(9, u * 1.6), u);
      else drawCross(g, cx, cy, Math.max(8, u * 1.5), u);
    }
  }

  private drawChoice(g: CanvasRenderingContext2D, r: Rect, symbol: 0 | 1, state: 'normal' | 'active', u: number): void {
    button(g, r, state);
    drawSymbol(g, r.x + r.w / 2, r.y + r.h / 2, Math.min(r.w, r.h) * 0.27, symbol, FG, Math.max(3, u * 0.55), 1);
  }
}

/** Ruhiges Fixierkreuz mit freier Mitte für das Zeichen */
function drawFixation(g: CanvasRenderingContext2D, cx: number, cy: number, symR: number, u: number): void {
  const a = symR * 1.55;
  const b = symR * 2.6;
  g.save();
  g.strokeStyle = 'rgba(232,238,247,0.5)';
  g.lineWidth = Math.max(2, u * 0.4);
  g.lineCap = 'round';
  g.beginPath();
  g.moveTo(cx - b, cy);
  g.lineTo(cx - a, cy);
  g.moveTo(cx + a, cy);
  g.lineTo(cx + b, cy);
  g.moveTo(cx, cy - b);
  g.lineTo(cx, cy - a);
  g.moveTo(cx, cy + a);
  g.lineTo(cx, cy + b);
  g.stroke();
  g.restore();
  circle(g, cx, cy, Math.max(2, u * 0.35), 'rgba(232,238,247,0.55)');
}

/** Kreis (0) oder Quadrat (1) als Umriss */
function drawSymbol(g: CanvasRenderingContext2D, cx: number, cy: number, r: number, symbol: 0 | 1, color: string, lw: number, alpha: number): void {
  g.save();
  g.globalAlpha = alpha;
  g.strokeStyle = color;
  g.lineWidth = lw;
  g.lineJoin = 'round';
  g.beginPath();
  if (symbol === 0) g.arc(cx, cy, r, 0, Math.PI * 2);
  else g.rect(cx - r * 0.88, cy - r * 0.88, r * 1.76, r * 1.76);
  g.stroke();
  g.restore();
}

/** Weicher heller Punkt ohne harten Rand und ohne Leuchtsaum */
function drawDot(g: CanvasRenderingContext2D, x: number, y: number, r: number, alpha: number): void {
  glow(g, x, y, r, DOT_GLOW, 0.5 * alpha);
  g.save();
  g.globalAlpha = alpha;
  circle(g, x, y, r, DOT);
  g.restore();
}

function drawCheck(g: CanvasRenderingContext2D, x: number, y: number, s: number, u: number): void {
  g.save();
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.beginPath();
  g.moveTo(x - s * 0.7, y);
  g.lineTo(x - s * 0.2, y + s * 0.5);
  g.lineTo(x + s * 0.8, y - s * 0.55);
  g.strokeStyle = 'rgba(5,10,20,0.75)';
  g.lineWidth = Math.max(4, u * 0.9) + 3;
  g.stroke();
  g.strokeStyle = GOOD;
  g.lineWidth = Math.max(4, u * 0.9);
  g.stroke();
  g.restore();
}

function drawCross(g: CanvasRenderingContext2D, x: number, y: number, s: number, u: number): void {
  const lw = Math.max(3.5, u * 0.6);
  g.save();
  g.lineCap = 'round';
  g.beginPath();
  g.moveTo(x - s, y - s);
  g.lineTo(x + s, y + s);
  g.moveTo(x + s, y - s);
  g.lineTo(x - s, y + s);
  g.strokeStyle = 'rgba(5,10,20,0.75)';
  g.lineWidth = lw + 3;
  g.stroke();
  g.strokeStyle = MISS;
  g.lineWidth = lw;
  g.stroke();
  g.restore();
}

/** Oberkante der Bildunterschrift im Intro-Film (gleiche Formel wie im Runner) */
function captionTop(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return s.h - size * 2.1 - s.h * 0.05;
}

export const randPing: ExerciseDefinition = {
  id: 'rand-ping',
  category: 'wahrnehmung',
  minutes: 2,
  color: '#94744B',
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M24 17v14M17 24h14"/><circle cx="24" cy="24" r="19" stroke-dasharray="2 5.4" opacity=".55"/></g><circle cx="38.5" cy="10.5" r="4.6" fill="currentColor"/><circle cx="9" cy="37.5" r="3" fill="currentColor" opacity=".5"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new RandPing(ctx),
};
