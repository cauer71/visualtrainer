/**
 * Welche Seite? – Hand, Fuß oder Unterarm erscheint in einem hellen Kreis, man tippt LINKS oder RECHTS.
 *
 * Vorbild: Drei Videos einer Reha-/Neuro-Trainingssoftware (Touchmonitor, Beobachtung des Auftraggebers; keine
 * Online-Quelle): Strichzeichnung in einem hellen Kreis, unten grüne Antwortfelder. Die Aufgabe ist die klassische
 * Links-Rechts-Beurteilung von Körperteilen („mentale Drehung von Körperteilen“):
 *  - Cooper & Shepard (1975), Mental transformation in the identification of left and right hands, JEP:HPP 1, 48–56
 *  - Sekiyama (1982), Kinesthetic aspects of mental representations in the identification of left and right hands,
 *    Perception & Psychophysics 32, 89–95
 *  - Parsons (1987), Imagined spatial transformations of one's hands and feet, Cognitive Psychology 19, 178–241
 *  - (Hintergrund) Shepard & Metzler (1971), Mental rotation of three-dimensional objects, Science 171, 701–703
 * Antwortzeiten wachsen mit dem Drehwinkel und sind für körperlich unbequeme Drehungen länger; viele Menschen lösen die
 * Aufgabe, indem sie sich die eigene Hand/den eigenen Fuß in der gezeigten Lage vorstellen. Keine Diagnose: Links-Rechts-
 * Unsicherheit kommt auch bei Gesunden vor, die Übung heißt nicht „Test“ und nennt keine Normwerte.
 *
 * Gegenüber dem Video geändert (wissenschaftlich begründet, siehe logic.ts): Drehwinkel steigen in der Reihenfolge der
 * Antwortzeiten (0° → 45° → 90° → 135° → 180°); Wörter erscheinen ab Stufe 7 erst mit dem Bild; zwei statt vier Felder bis
 * Stufe 9; weiche Antwortfrist statt Zeitdruck; ✓/✗ statt Rotblitz, dazu eine kurze Benennung (z. B. „Rechter Fuß · Fußsohle“).
 *
 * - Zeichnungen prozedural (koerperteile.ts), in eigenen Koordinaten gezeichnet und mit ctx.rotate gedreht.
 * - Zeit = Reizbeginn (erster gezeichneter Frame) bis Tipp (Ereigniszeit). Tipps < 150 ms nach Reizbeginn und Doppeltipps
 *   (< 350 ms nach einer Antwort) zählen nicht. Zufall nur über ctx.rng.
 * - Zusatzwerte nur im Vergleich mit sich selbst auf diesem Gerät: Treffer %, Zeit (Median), Dreh-Aufschlag
 *   (gedreht ≥ 90° minus aufrecht ≤ 15°), Seitenverwechslungen.
 */
import { background, C, fillRR, font, hit, ring, rrPath, text } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { captionTop, drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import { buildFigure, drawFigure } from './koerperteile';
import {
  arrangementFor,
  arrangementVaries,
  balancedFlags,
  computeStats,
  correctCell,
  deadlineMs,
  DOUBLE_TAP_MS,
  feedbackMs,
  fieldCountFor,
  gapMs,
  judge,
  layoutFor,
  levelOf,
  MAX_LEVEL,
  MIN_LEVEL,
  MIN_RT_MS,
  pickFigure,
  planSides,
  pointsFor,
  QUICK_TRIALS,
  swapFor,
  tipFor,
  TRIALS,
  type Arrangement,
  type Figure,
  type Layout,
  type Outcome,
  type Rect,
  type Side,
  type TrialRecord,
  type Word,
} from './logic';
import { de, it } from './texts';

// Farben: Felder wie im Video grün, dunkle Schrift (Kontrast ≈ 6 : 1), Zeichnung dunkel auf hellem Kreis
export const FIELD_FILL = '#4CAF50';
export const FIELD_EDGE = '#2E7D32';
export const FIELD_INK = '#0B1F0D';
const DISC_FILL = '#E4EAF2';
const DISC_RING = '#9FB3CC';

const FADE_IN_MS = 120;
const FADE_OUT_MS = 160;
const MARK_MS = 900;
const LEAD_MS = 1200;
const DEMO_LEAD_MS = 900;
const DEMO_FB_MS = 900;
const DEMO_GAP_MS = 300;
const DEMO_DEADLINE_MS = 6000;

interface DemoStep {
  fig: Figure;
  swapped: boolean;
  caption: 'watch' | 'back' | 'turn' | 'swap';
}

/** Intro-Film: rechte Hand von der Handfläche, linker Handrücken, gedrehter Fuß, vertauschte Felder */
const DEMO_STEPS: DemoStep[] = [
  { fig: { part: 'hand', view: 'volar', side: 'right', angle: -10 }, swapped: false, caption: 'watch' },
  { fig: { part: 'hand', view: 'dorsal', side: 'left', angle: 15 }, swapped: false, caption: 'back' },
  { fig: { part: 'foot', view: 'volar', side: 'right', angle: 90 }, swapped: false, caption: 'turn' },
  { fig: { part: 'forearm', view: 'dorsal', side: 'left', angle: -90 }, swapped: true, caption: 'swap' },
];

interface Trial {
  fig: Figure;
  arr: Arrangement;
  /** Wörter wechseln von Durchgang zu Durchgang → erscheinen erst zusammen mit dem Bild */
  varies: boolean;
  level: number;
  deadline: number;
  caption?: DemoStep['caption'];
}

interface Feedback {
  t0: number;
  outcome: Outcome;
  tapped: number;
  correct: number;
}

class SeiteErkennen implements Exercise {
  private readonly demo: boolean;
  private readonly total: number;
  private readonly stair: Staircase;
  private sides: Side[] = [];
  private swapFlags: boolean[] = [];
  private figs: Figure[] = [];
  private prevArr: Arrangement | undefined;
  private trial!: Trial;
  private phase: 'gap' | 'stim' | 'fb' = 'gap';
  private idx = 0;
  private nextAt = 0;
  private onset = NaN;
  private fb: Feedback | null = null;
  private fbEnd = 0;
  private endAt = Infinity;
  private done = false;
  private lastRespT = -1e9;
  private planned = false;
  private points = 0;
  private records: TrialRecord[] = [];

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.total = this.demo ? DEMO_STEPS.length : ctx.quick ? QUICK_TRIALS : TRIALS;
    const start = ctx.startLevel ?? MIN_LEVEL;
    this.stair = new Staircase({ start, min: MIN_LEVEL, max: MAX_LEVEL, down: 3, up: 1 });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private layout(): Layout {
    const { w, h, u } = this.ctx.stage;
    const bottomReserve = this.demo ? Math.max(14, h - captionTop(this.ctx.stage) + 12) : undefined;
    return layoutFor(this.trial.arr.length as 2 | 4, w, h, u, { bottomReserve, compact: this.demo });
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, rng } = this.ctx;
    if (!this.demo) {
      this.sides = planSides(rng, this.total);
      this.swapFlags = balancedFlags(rng, this.total);
    }
    this.prepare();
    this.nextAt = t + (this.demo ? DEMO_LEAD_MS : LEAD_MS);
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateLabel();
  }

  /** Zeichnung, Feldanordnung und Frist des nächsten Durchgangs festlegen (die leere Pause davor zeigt schon die Felder) */
  private prepare(): void {
    const { rng } = this.ctx;
    if (this.demo) {
      const step = DEMO_STEPS[Math.min(this.idx, DEMO_STEPS.length - 1)];
      this.trial = {
        fig: step.fig,
        arr: arrangementFor(rng, 2, step.swapped),
        varies: step.swapped,
        level: MIN_LEVEL,
        deadline: DEMO_DEADLINE_MS,
        caption: step.caption,
      };
      return;
    }
    const lvl = levelOf(this.stair.level);
    const side = this.sides[Math.min(this.idx, this.sides.length - 1)];
    const fig = pickFigure(rng, lvl, side, this.figs);
    const fields = fieldCountFor(lvl);
    const swapped = swapFor(lvl) ? !!this.swapFlags[Math.min(this.idx, this.swapFlags.length - 1)] : false;
    const arr = arrangementFor(rng, fields, swapped, this.prevArr);
    this.trial = { fig, arr, varies: arrangementVaries(lvl), level: lvl, deadline: deadlineMs(lvl) };
  }

  update(_dt: number, t: number): void {
    if (this.done) return;
    if (t >= this.endAt) {
      this.finishSession();
      return;
    }
    if (this.phase === 'gap' && this.idx < this.total && t >= this.nextAt) this.showStimulus();
    else if (this.phase === 'stim' && !Number.isNaN(this.onset) && t - this.onset >= this.trial.deadline) this.resolve(t, 'slow', -1, this.trial.deadline);
    else if (this.phase === 'fb' && t >= this.fbEnd && this.idx < this.total) this.beginGap(t);
    if (this.ctx.autoplay && this.phase === 'stim' && !Number.isNaN(this.onset)) this.autoUpdate();
  }

  private showStimulus(): void {
    this.phase = 'stim';
    this.onset = NaN; // wird im ersten gezeichneten Frame gesetzt (render)
    this.planned = false;
    this.figs.push(this.trial.fig);
    this.prevArr = this.trial.arr;
    if (this.demo && this.trial.caption) this.ctx.hud.caption(this.ctx.texts.captions[this.trial.caption]);
  }

  private beginGap(t: number): void {
    this.phase = 'gap';
    this.fb = null;
    this.prepare();
    this.nextAt = t + (this.demo ? DEMO_GAP_MS : gapMs(this.ctx.rng));
  }

  // --- Autoplay / Intro-Film: die Geister-Hand tippt ein Feld ---

  private autoUpdate(): void {
    const { ghost, rng } = this.ctx;
    if (this.planned || !ghost.idle) return;
    this.planned = true;
    const L = this.layout();
    let cell = correctCell(this.trial.arr, this.trial.fig.side);
    let delay: number;
    let move: number;
    if (this.demo) {
      delay = 1000;
      move = 550;
    } else {
      if (rng.chance(0.03)) return; // ausgelassen → „zu langsam“
      const pOk = clamp(0.94 - 0.02 * (this.trial.level - 1), 0.7, 0.94);
      if (!rng.chance(pOk)) {
        const others = this.trial.arr.map((_, i) => i).filter((i) => i !== cell);
        cell = others[rng.int(others.length)];
      }
      delay = rng.range(600, 1300) + Math.abs(this.trial.fig.angle) * 4;
      move = rng.range(250, 420);
    }
    const r = L.fields[cell];
    const jit = this.demo ? 0 : Math.min(r.w, r.h) * 0.08;
    ghost.tap(r.x + r.w / 2 + rng.normal() * jit, r.y + r.h / 2 + rng.normal() * jit, { delay, move });
  }

  // --- Eingabe ---

  pointerDown(p: PointerInfo): void {
    if (this.done || this.phase !== 'stim' || p.t - this.lastRespT < DOUBLE_TAP_MS) return;
    const L = this.layout();
    for (let cell = 0; cell < L.fields.length; cell++) {
      if (hit(L.fields[cell], p.x, p.y, 6)) {
        this.answer(cell, p.t);
        return;
      }
    }
  }

  /** Tastatur (Computer): ← = LINKS, → = RECHTS, unabhängig davon, wo das Feld gerade liegt */
  keyDown(key: string, t: number): void {
    if (this.done || this.phase !== 'stim' || t - this.lastRespT < DOUBLE_TAP_MS) return;
    const word: Word | null = key === 'ArrowLeft' ? 'left' : key === 'ArrowRight' ? 'right' : null;
    if (!word) return;
    const cell = this.trial.arr.indexOf(word);
    if (cell >= 0) this.answer(cell, t);
  }

  private answer(cell: number, t: number): void {
    // Vor dem ersten gezeichneten Frame oder < 150 ms danach: Vorwegnehmen, zählt nicht
    if (Number.isNaN(this.onset) || t - this.onset < MIN_RT_MS) return;
    const j = judge(this.trial.arr[cell], this.trial.fig.side);
    this.resolve(t, j.outcome, cell, t - this.onset, j.swap);
  }

  private resolve(t: number, outcome: Outcome, tapped: number, rt: number, swap = false): void {
    const { sfx, hud } = this.ctx;
    const correct = correctCell(this.trial.arr, this.trial.fig.side);
    this.phase = 'fb';
    this.lastRespT = t;
    this.fb = { t0: t, outcome, tapped, correct };
    if (outcome === 'hit') {
      this.points += pointsFor(this.trial.level, rt, this.trial.deadline);
      sfx.good();
    } else {
      sfx.bad();
    }
    if (!this.demo) {
      this.stair.update(outcome === 'hit');
      this.records.push({ angle: this.trial.fig.angle, outcome, rt, swap });
    }
    this.idx++;
    hud.setProgress(clamp(this.idx / this.total, 0, 1));
    hud.setScore(this.demo ? null : this.points);
    this.updateLabel();
    // Intro-Film: Hand nach dem Tippen neben den Kreis zurückziehen, damit sie Felder und Bildunterschrift nicht verdeckt
    if (this.demo) {
      const { disc } = this.layout();
      const { w } = this.ctx.stage;
      this.ctx.ghost.moveTo(Math.min(w - 24, (disc.cx + disc.r + w) / 2), disc.cy + disc.r * 0.35, { delay: 350, move: 500 });
    }
    const ms = this.demo ? DEMO_FB_MS : feedbackMs(outcome);
    this.fbEnd = t + ms;
    if (this.idx >= this.total) this.endAt = t + ms;
  }

  private updateLabel(): void {
    if (this.demo) return;
    this.ctx.hud.setLabel(`${this.ctx.texts.feedback.level} ${levelOf(this.stair.level)}`);
  }

  resize(): void {
    if (this.ctx.autoplay) {
      this.ctx.ghost.clear();
      this.planned = false;
    }
  }

  // -------------------------------------------------------------------------

  private finishSession(): void {
    this.done = true;
    this.ctx.hud.setProgress(1);
    this.ctx.ghost.clear();
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' },
        secondary: [],
        score: 0,
        level: MIN_LEVEL,
      });
      return;
    }
    this.ctx.sfx.done();
    const s = computeStats(this.records);
    const thr = this.stair.threshold();
    const secondary = [
      { key: 'accuracy', value: Math.round(s.accuracy), unit: 'percent' as const },
      ...(Number.isFinite(s.medianMs) ? [{ key: 'rt', value: Math.round(s.medianMs), unit: 'time' as const }] : []),
      ...(s.rotationCostMs !== null ? [{ key: 'rotCost', value: Math.round(s.rotationCostMs), unit: 'msSigned' as const }] : []),
      { key: 'swaps', value: s.swaps, unit: 'count' as const },
    ];
    this.ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), MIN_LEVEL, MAX_LEVEL), unit: 'level', better: 'higher' },
      secondary,
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip: tipFor(s),
    });
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  /** Deckkraft von Bild und Wörtern: weiches Einblenden, am Ende der Rückmeldung weiches Ausblenden */
  private stimAlpha(t: number): number {
    if (this.phase === 'gap') return 0;
    const fade = this.ctx.reducedMotion ? 0 : 1;
    const inA = fade && !Number.isNaN(this.onset) ? clamp((t - this.onset) / FADE_IN_MS, 0, 1) : 1;
    if (this.phase === 'fb') {
      const outA = fade ? clamp((this.fbEnd - t) / FADE_OUT_MS, 0, 1) : 1;
      return Math.min(inA, this.idx >= this.total ? 1 : outA);
    }
    return Number.isNaN(this.onset) ? 0 : inA;
  }

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr, u } = this.ctx.stage;
    background(g, w, h, dpr);
    // Reizbeginn = erster gezeichneter Frame
    if (this.phase === 'stim' && Number.isNaN(this.onset)) this.onset = t;
    const L = this.layout();
    const { cx, cy, r } = L.disc;
    const a = this.stimAlpha(t);

    // Kreis
    g.save();
    g.beginPath();
    g.arc(cx, cy, r, 0, Math.PI * 2);
    g.fillStyle = DISC_FILL;
    g.fill();
    g.restore();
    ring(g, cx, cy, r - 1, DISC_RING, Math.max(2, r * 0.012));

    // Körperteil
    if (a > 0.01) {
      g.save();
      g.globalAlpha = a;
      const f = this.trial.fig;
      drawFigure(g, buildFigure(f.part, f.view, f.side), cx, cy, r * 0.84, f.angle);
      g.restore();
    }

    // Antwortfelder (Wörter: bei wechselnder Anordnung erst mit dem Bild)
    const wordAlpha = this.trial.varies ? a : 1;
    for (let i = 0; i < L.fields.length; i++) this.drawField(g, L, i, wordAlpha, t);

    // Rückmeldung: sanfte Zeichen, kein Blitz
    if (this.fb) {
      const age = t - this.fb.t0;
      const mk = markAlpha(age, MARK_MS);
      const s = clamp(r * 0.11, 11, 22);
      const mx = cx + r * 0.8;
      const my = cy - r * 0.8;
      if (this.fb.outcome === 'hit') drawSoftCheck(g, mx, my, s * 1.1, mk);
      else drawSoftCross(g, mx, my, s, mk);
      if (!this.demo && L.labelY > 0) this.drawLabel(g, L, a, w, u);
    }
  }

  private drawLabel(g: CanvasRenderingContext2D, L: Layout, alpha: number, w: number, u: number): void {
    const fbk = this.ctx.texts.feedback;
    const f = this.trial.fig;
    const label = `${fbk[`${f.part}_${f.side}`]} · ${fbk[`${f.view}_${f.part}`]}`;
    let px = 28;
    g.save();
    g.font = font(px, 700);
    const maxW = w - Math.max(24, u * 4);
    const tw = g.measureText(label).width;
    if (tw > maxW) px = Math.max(18, Math.floor((px * maxW) / tw));
    g.restore();
    text(g, label, w / 2, L.labelY, px, C.fg, { weight: 700, alpha: clamp(alpha, 0, 1) });
  }

  private drawField(g: CanvasRenderingContext2D, L: Layout, cell: number, wordAlpha: number, t: number): void {
    const r: Rect = L.fields[cell];
    const rad = Math.min(r.h * 0.2, 18);
    fillRR(g, r.x, r.y, r.w, r.h, rad, FIELD_FILL);
    g.save();
    rrPath(g, r.x + 1.5, r.y + 1.5, r.w - 3, r.h - 3, rad);
    g.strokeStyle = FIELD_EDGE;
    g.lineWidth = 3;
    g.stroke();
    g.restore();
    const word = this.trial.arr[cell];
    if (wordAlpha > 0.01) this.drawWord(g, L, r, this.ctx.texts.feedback[word], wordAlpha);
    // Rückmeldung am Feld (Form, nicht nur Farbe): richtiges Feld nach Fehler gestrichelt, getipptes falsches Feld mit Innenrahmen
    const fb = this.fb;
    if (!fb) return;
    const k = clamp(1 - (t - fb.t0) / 900, 0, 1);
    if (cell === fb.correct && fb.outcome !== 'hit') {
      g.save();
      rrPath(g, r.x - 5, r.y - 5, r.w + 10, r.h + 10, rad + 4);
      g.setLineDash([10, 7]);
      g.strokeStyle = `rgba(232,238,247,${0.4 + 0.55 * k})`;
      g.lineWidth = 3;
      g.stroke();
      g.restore();
    } else if (cell === fb.correct) {
      g.save();
      rrPath(g, r.x + 6, r.y + 6, r.w - 12, r.h - 12, Math.max(4, rad - 4));
      g.strokeStyle = `rgba(255,255,255,${0.35 + 0.55 * k})`;
      g.lineWidth = 3.5;
      g.stroke();
      g.restore();
    }
    if (cell === fb.tapped && fb.outcome === 'wrong') {
      g.save();
      rrPath(g, r.x + 6, r.y + 6, r.w - 12, r.h - 12, Math.max(4, rad - 4));
      g.strokeStyle = `rgba(251,191,36,${0.4 + 0.55 * k})`;
      g.lineWidth = 3.5;
      g.stroke();
      g.restore();
    }
  }

  private drawWord(g: CanvasRenderingContext2D, L: Layout, r: Rect, word: string, alpha: number): void {
    let px = L.fontPx;
    g.save();
    g.font = font(px, 800);
    const maxW = r.w - 16;
    const tw = g.measureText(word).width;
    if (tw > maxW) px = Math.max(this.demo ? 12 : 26, (px * maxW) / tw);
    g.restore();
    text(g, word, r.x + r.w / 2, r.y + r.h / 2 + 1, px, FIELD_INK, { weight: 800, alpha: clamp(alpha, 0, 1) });
  }
}

export const seiteErkennen: ExerciseDefinition = {
  id: 'seite-erkennen',
  category: 'wahrnehmung',
  minutes: 2,
  color: '#8C6D4A',
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M13 27V15M19 25V9M25 25V7M31 27V12"/><path d="M10 27h22v8c0 4-3 7-7 7H17c-4 0-7-3-7-7z"/><path d="M33 34l8-10"/></g><path d="M7 9l-3 3 3 3M41 9l3 3-3 3" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new SeiteErkennen(ctx),
};
