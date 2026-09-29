/**
 * Reihen-Rätsel – Regel hinter einer Zahlen-, Buchstaben- oder Formenreihe finden und fortsetzen.
 *
 * Angelehnt an das „Reasoning“-Training der ACTIVE-Studie (Aufgaben mit seriellem Muster; Ball et al.,
 * 2002; docs/wissenschaft/04-konzentration-und-denken.md, Abschnitt 9.2). Unsere Version ist nicht
 * untersucht – die Texte versprechen nichts über die Übung hinaus.
 * - Aufgaben werden generiert (puzzles.ts): 26 Regelbausteine auf 8 Stufen (+k, −k, ×2, ×3, abwechselnd,
 *   zwei verschränkte Reihen, wachsender Abstand, Muster wiederholen, Anzahl, Drehung, Buchstaben …).
 *   Ablenker = typische Fehler (Richtung vertauscht, um eins daneben, andere Teilreihe …).
 * - 4 Antwortmöglichkeiten als große Tasten, kein Zeitdruck. Nach jeder Antwort wird die Regel in
 *   Alltagssprache erklärt; weiter geht es erst mit „Weiter“ (eigenes Tempo).
 * - 10 Aufgaben pro Sitzung, adaptiv über die Regelstufe (2-down/1-up ≈ 71 % richtig).
 * - Zeit pro Aufgabe wird nur als Info gezeigt (Median, virtuelle Zeit → Pausen zählen nicht).
 * - Formen unterscheiden sich immer in der Gestalt (Kreis, Dreieck, Quadrat, Stern, Raute); die Farbe
 *   ist nur eine Zugabe.
 */
import { background, button, C, circle, fillRR, font, hit, rrPath, star, text, triangle, withAlpha, type Rect } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut, median } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, Metric, PointerInfo, StageInfo } from '../../core/types';
import { demoPuzzles, itemKey, letter, makePuzzle, MAX_LEVEL, type Family, type Item, type Puzzle, type Shape } from './puzzles';
import { de, it } from './texts';

const TASKS = 10;
const QUICK_TASKS = 2;
/** Nach der Antwort kurz sperren, damit ein Doppel-Tipp die Erklärung nicht überspringt */
const NEXT_LOCK_MS = 450;
const ACCENT = '#B794D6';
const SHAPE_COLOR: Record<Shape, string> = {
  circle: '#56B4E9',
  triangle: '#E69F00',
  square: '#009E73',
  star: '#F0E442',
  diamond: '#CC79A7',
};

type Phase = 'ask' | 'answered' | 'done';

interface Record_ {
  puzzle: Puzzle;
  correct: boolean;
  ms: number;
}

interface Layout {
  cells: Rect[];
  cs: number;
  panel: Rect;
  next: Rect;
  opts: Rect[];
  fsE: number;
  rest: { x: number; y: number };
}

/** Platz, den die Bildunterschrift im Intro-Film unten braucht (wie im Runner berechnet) */
function captionReserve(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return size * 2.1 + s.h * 0.05 + Math.max(6, s.u * 1.5);
}

function badge(g: CanvasRenderingContext2D, x: number, y: number, r: number, ok: boolean): void {
  circle(g, x, y, r + 2, C.bg);
  circle(g, x, y, r, ok ? C.good : C.bad);
  g.save();
  g.strokeStyle = C.white;
  g.lineWidth = Math.max(2, r * 0.3);
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.beginPath();
  if (ok) {
    g.moveTo(x - r * 0.45, y + r * 0.02);
    g.lineTo(x - r * 0.1, y + r * 0.36);
    g.lineTo(x + r * 0.48, y - r * 0.34);
  } else {
    const k = r * 0.36;
    g.moveTo(x - k, y - k);
    g.lineTo(x + k, y + k);
    g.moveTo(x + k, y - k);
    g.lineTo(x - k, y + k);
  }
  g.stroke();
  g.restore();
}

function wrap(g: CanvasRenderingContext2D, s: string, maxW: number): string[] {
  const words = s.split(' ');
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    const t = cur ? `${cur} ${w}` : w;
    if (cur && g.measureText(t).width > maxW) {
      lines.push(cur);
      cur = w;
    } else cur = t;
  }
  if (cur) lines.push(cur);
  return lines;
}

// ---------------------------------------------------------------------------
// Zeichen der Reihen

function drawShape(g: CanvasRenderingContext2D, s: Shape, x: number, y: number, r: number): void {
  const col = SHAPE_COLOR[s];
  switch (s) {
    case 'circle':
      circle(g, x, y, r * 0.88, col);
      break;
    case 'triangle':
      triangle(g, x, y - r * 0.12, r * 1.05, col);
      break;
    case 'square':
      fillRR(g, x - r * 0.78, y - r * 0.78, r * 1.56, r * 1.56, r * 0.14, col);
      break;
    case 'star':
      star(g, x, y + r * 0.05, r * 1.08, col);
      break;
    default:
      g.beginPath();
      g.moveTo(x, y - r);
      g.lineTo(x + r * 0.72, y);
      g.lineTo(x, y + r);
      g.lineTo(x - r * 0.72, y);
      g.closePath();
      g.fillStyle = col;
      g.fill();
  }
}

/** Anordnung wie auf einem Würfel (−1 … 1) – Anzahl auf einen Blick zählbar */
const PIPS: number[][][] = [
  [],
  [[0, 0]],
  [
    [-1, -1],
    [1, 1],
  ],
  [
    [-1, -1],
    [0, 0],
    [1, 1],
  ],
  [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ],
  [
    [-1, -1],
    [1, -1],
    [0, 0],
    [-1, 1],
    [1, 1],
  ],
  [
    [-1, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [1, 1],
  ],
  [
    [-1, -1],
    [1, -1],
    [-1, 0],
    [0, 0],
    [1, 0],
    [-1, 1],
    [1, 1],
  ],
  [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ],
  [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [0, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ],
];

function drawArrow(g: CanvasRenderingContext2D, x: number, y: number, size: number, r8: number, color: string): void {
  g.save();
  g.translate(x, y);
  g.rotate((r8 * Math.PI) / 4);
  const L = size * 0.4;
  const hw = size * 0.2;
  g.beginPath();
  g.moveTo(0, -L);
  g.lineTo(hw, -L + hw * 1.15);
  g.lineTo(hw * 0.42, -L + hw * 1.15);
  g.lineTo(hw * 0.42, L);
  g.lineTo(-hw * 0.42, L);
  g.lineTo(-hw * 0.42, -L + hw * 1.15);
  g.lineTo(-hw, -L + hw * 1.15);
  g.closePath();
  g.fillStyle = color;
  g.fill();
  g.restore();
}

/** Ein Element der Reihe zentriert in einem Feld der Größe size zeichnen */
function drawItem(g: CanvasRenderingContext2D, it: Item, x: number, y: number, size: number, color: string = C.white, counting = false): void {
  if (it.t === 'n' || it.t === 'l') {
    const s = it.t === 'n' ? String(it.v) : letter(it.v);
    let fs = size * (it.t === 'l' ? 0.56 : 0.52);
    g.save();
    g.font = font(fs, 800);
    const tw = g.measureText(s).width;
    g.restore();
    if (tw > size * 0.84) fs *= (size * 0.84) / tw;
    text(g, s, x, y + fs * 0.04, fs, color, { weight: 800 });
  } else if (it.t === 's') {
    const pips = PIPS[clamp(it.n, 1, 9)];
    // Bei Anzahl-Reihen alle Formen gleich groß zeichnen, sonst wirkt „eine“ wie „eine große“
    if (it.n === 1 && !counting) drawShape(g, it.s, x, y, size * 0.3);
    else {
      const sp = size * 0.27;
      const r = size * (it.n <= 4 ? 0.13 : 0.105);
      for (const [px, py] of pips) drawShape(g, it.s, x + px * sp, y + py * sp, r);
    }
  } else {
    drawArrow(g, x, y, size, it.r, color);
  }
}

// ---------------------------------------------------------------------------

class ReihenRaetsel implements Exercise {
  private readonly demo: boolean;
  private readonly total: number;
  private readonly stair: Staircase;
  private readonly demoSet: Puzzle[];
  private puzzle!: Puzzle;
  private phase: Phase = 'ask';
  private idx = 0;
  private t0 = 0;
  private answeredAt = 0;
  private chosen = -1;
  private correct = false;
  private records: Record_[] = [];
  private recent: string[] = [];
  private recentFam: Family[] = [];
  private points = 0;
  private ghostPlanned = false;
  private doneAt = 0;
  private finished = false;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.total = this.demo ? 2 : ctx.quick ? QUICK_TASKS : TASKS;
    this.stair = new Staircase({ start: ctx.startLevel ?? 1, min: 1, max: MAX_LEVEL, down: 2, up: 1 });
    this.demoSet = demoPuzzles();
  }

  start(t: number): void {
    const { hud } = this.ctx;
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.newPuzzle(t);
    if (this.ctx.autoplay) {
      const r = this.layout().rest;
      this.ctx.ghost.moveTo(r.x, r.y, { move: this.demo ? 1 : 400 });
    }
  }

  private newPuzzle(t: number): void {
    const { ctx } = this;
    if (this.demo) this.puzzle = this.demoSet[this.idx];
    else {
      this.puzzle = makePuzzle(this.stair.level, ctx.rng, this.recent, this.recentFam);
      this.recent = [...this.recent, this.puzzle.id].slice(-3);
      this.recentFam = [...this.recentFam, this.puzzle.family].slice(-2);
      ctx.hud.setLabel(`${ctx.texts.feedback.level} ${this.puzzle.level}`);
    }
    this.phase = 'ask';
    this.t0 = t;
    this.chosen = -1;
    this.correct = false;
    this.ghostPlanned = false;
    if (this.demo) ctx.hud.caption(this.idx === 0 ? ctx.texts.captions.ask : ctx.texts.captions.shapes);
  }

  // ------------------------------------------------------------------ Layout

  private layout(): Layout {
    const s = this.ctx.stage;
    const { w, u } = s;
    const h = Math.max(120, s.h - (this.demo ? captionReserve(s) : 0));
    const k = this.demo ? Math.min(1, u / 4.3) : 1;
    const m = Math.max(12, u * 3);
    const W = Math.min(w - 2 * m, 980);
    const wide = w >= h * 1.05;
    const n = this.puzzle.seq.length + 1;
    const gapS = Math.max(6, u * 1.4);
    let rows = 1;
    let per = n;
    let cs = Math.min((W - gapS * (n - 1)) / n, 132);
    if (cs < 60 * k && n > 4) {
      rows = 2;
      per = Math.ceil(n / 2);
      cs = Math.min((W - gapS * (per - 1)) / per, 110);
    }
    const cols = wide ? 4 : 2;
    const gapO = Math.max(10, u * 2.2);
    const optW = Math.min((W - gapO * (cols - 1)) / cols, wide ? 210 : 260);
    let optH = clamp(optW * (wide ? 0.7 : 0.62), 64 * k, 130);
    const fsE = clamp(u * 3.3, 15 * k, 25);
    const nextH = clamp(fsE * 2.6, 56 * k, 72);
    const pad = Math.max(10, u * 2);
    const panelH = Math.max(nextH + 2 * pad, fsE * 1.3 * 3 + 2 * pad);
    let gap = Math.max(14, u * 3.5);
    const optRows = 4 / cols;
    const totalH = () => rows * cs + (rows - 1) * gapS + gap + panelH + gap + optRows * optH + (optRows - 1) * gapO;
    // Zu wenig Höhe (kleine Bühne, Intro-Film): Felder und Tasten gemeinsam verkleinern
    for (let i = 0; i < 20 && totalH() > h - 2 * m; i++) {
      cs = Math.max(34, cs * 0.93);
      optH = Math.max(52 * k, optH * 0.93);
      gap = Math.max(8, gap * 0.9);
    }
    let y = m + Math.max(0, (h - 2 * m - totalH()) / 2);
    const cells: Rect[] = [];
    for (let rI = 0; rI < rows; rI++) {
      const cnt = rI === rows - 1 ? n - per * (rows - 1) : per;
      const rowW = cnt * cs + (cnt - 1) * gapS;
      const x0 = (w - rowW) / 2;
      for (let c = 0; c < cnt; c++) cells.push({ x: x0 + c * (cs + gapS), y, w: cs, h: cs });
      y += cs + (rI < rows - 1 ? gapS : 0);
    }
    y += gap;
    const optBlockW = cols * optW + (cols - 1) * gapO;
    const seqW = per * cs + (per - 1) * gapS;
    const panelW = Math.min(W, Math.max(optBlockW, seqW));
    const panel = { x: (w - panelW) / 2, y, w: panelW, h: panelH };
    const nextW = clamp(panelW * 0.28, 104 * k, 200);
    const next = { x: panel.x + panel.w - pad - nextW, y: panel.y + (panel.h - nextH) / 2, w: nextW, h: nextH };
    y += panelH + gap;
    const opts: Rect[] = [];
    const ox = (w - optBlockW) / 2;
    for (let i = 0; i < 4; i++) {
      const c = i % cols;
      const rr = Math.floor(i / cols);
      opts.push({ x: ox + c * (optW + gapO), y: y + rr * (optH + gapO), w: optW, h: optH });
    }
    const rest = { x: w - Math.max(20, m * 1.1), y: Math.min(h - m, panel.y + panel.h + gap * 0.5) };
    return { cells, cs, panel, next, opts, fsE, rest };
  }

  // ------------------------------------------------------------------ Ablauf

  update(_dt: number, t: number): void {
    if (this.phase === 'done') {
      if (!this.finished && t >= this.doneAt) this.finish();
      return;
    }
    if (this.ctx.autoplay) this.autoplay(t);
  }

  private answer(i: number, t: number): void {
    if (this.phase !== 'ask' || i < 0 || i > 3) return;
    const { ctx } = this;
    const p = this.puzzle;
    this.chosen = i;
    this.correct = itemKey(p.options[i]) === itemKey(p.answer);
    this.phase = 'answered';
    this.answeredAt = t;
    this.ghostPlanned = false;
    if (this.correct) ctx.sfx.good();
    else ctx.sfx.bad();
    if (!this.demo) {
      this.records.push({ puzzle: p, correct: this.correct, ms: t - this.t0 });
      this.stair.update(this.correct);
      if (this.correct) this.points += 10 + 5 * p.level;
      ctx.hud.setScore(this.records.filter((r) => r.correct).length);
    } else if (this.idx === 0) ctx.hud.caption(ctx.texts.captions.rule);
  }

  private next(t: number): void {
    if (this.phase !== 'answered' || t - this.answeredAt < NEXT_LOCK_MS) return;
    this.ctx.sfx.tap();
    this.idx++;
    this.ctx.hud.setProgress(this.idx / this.total);
    if (!this.demo) this.ctx.ghost.clear();
    if (this.idx >= this.total) {
      this.phase = 'done';
      this.doneAt = t + 300;
      return;
    }
    this.newPuzzle(t);
  }

  // ------------------------------------------------------------------ Eingabe

  keyDown(key: string, t: number): void {
    if (this.phase === 'ask' && key >= '1' && key <= '4') this.answer(Number(key) - 1, t);
    else if (this.phase === 'answered' && (key === 'Enter' || key === ' ' || key === 'ArrowRight')) this.next(t);
  }

  pointerDown(p: PointerInfo): void {
    const L = this.layout();
    if (this.phase === 'ask') {
      for (let i = 0; i < 4; i++) {
        if (hit(L.opts[i], p.x, p.y, 4)) {
          this.answer(i, p.t);
          return;
        }
      }
    } else if (this.phase === 'answered' && hit(L.next, p.x, p.y, 10)) {
      this.next(p.t);
    }
  }

  // ------------------------------------------------------------------ Geister-Hand

  private autoplay(t: number): void {
    if (this.ghostPlanned) return;
    const { ghost, rng } = this.ctx;
    const L = this.layout();
    const center = (r: Rect) => ({ x: r.x + r.w / 2, y: r.y + r.h * 0.55 });
    const ansIdx = this.puzzle.options.findIndex((o) => itemKey(o) === itemKey(this.puzzle.answer));
    this.ghostPlanned = true;
    if (this.demo) {
      if (this.phase === 'ask') {
        const c = center(L.opts[ansIdx]);
        ghost.tap(c.x, c.y, { delay: this.idx === 0 ? 1900 : 1500, move: 700 });
      } else if (this.phase === 'answered') {
        if (this.idx === 0) {
          const c = center(L.next);
          ghost.tap(c.x, c.y, { delay: 1700, move: 600 });
          ghost.moveTo(L.rest.x, L.rest.y, { delay: 250, move: 500 });
        } else {
          // Film endet nach der zweiten Erklärung
          ghost.moveTo(L.rest.x, L.rest.y, { delay: 300, move: 600 });
          this.phase = 'done';
          this.doneAt = t + 2600;
        }
      }
      return;
    }
    // Spielmodus (nur Tests): meist richtig, mit steigender Stufe öfter falsch
    if (this.phase === 'ask') {
      const pOk = clamp(0.93 - 0.07 * (this.puzzle.level - 1), 0.45, 0.93);
      const i = rng.chance(pOk) ? ansIdx : (ansIdx + 1 + rng.int(3)) % 4;
      const c = center(L.opts[i]);
      ghost.tap(c.x, c.y, { delay: rng.range(900, 2200), move: 400 });
    } else if (this.phase === 'answered') {
      const c = center(L.next);
      ghost.tap(c.x, c.y, { delay: rng.range(900, 1500), move: 400 });
    }
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr, u } = this.ctx.stage;
    background(g, w, h, dpr);
    const L = this.layout();
    const p = this.puzzle;
    const answered = this.phase !== 'ask';
    const counting = [...p.seq, ...p.options].some((o) => o.t === 's' && o.n > 1);
    const lw = Math.max(2, u * 0.35);

    // Reihe
    L.cells.forEach((r, i) => {
      const isQ = i === L.cells.length - 1;
      const rad = r.w * 0.16;
      if (!isQ) {
        fillRR(g, r.x, r.y, r.w, r.h, rad, 'rgba(255,255,255,0.07)');
        g.save();
        rrPath(g, r.x + 0.5, r.y + 0.5, r.w - 1, r.h - 1, rad);
        g.strokeStyle = C.line;
        g.lineWidth = 1;
        g.stroke();
        g.restore();
        drawItem(g, p.seq[i], r.x + r.w / 2, r.y + r.h / 2, r.w, C.white, counting);
        return;
      }
      if (answered) {
        const k = this.ctx.reducedMotion ? 1 : easeOut((t - this.answeredAt) / 220);
        fillRR(g, r.x, r.y, r.w, r.h, rad, withAlpha(C.good, 0.22));
        g.save();
        rrPath(g, r.x + 1, r.y + 1, r.w - 2, r.h - 2, rad);
        g.strokeStyle = C.good;
        g.lineWidth = lw + 1;
        g.stroke();
        g.restore();
        g.save();
        g.globalAlpha = k;
        drawItem(g, p.answer, r.x + r.w / 2, r.y + r.h / 2, r.w * (0.85 + 0.15 * k), C.white, counting);
        g.restore();
      } else {
        fillRR(g, r.x, r.y, r.w, r.h, rad, withAlpha(ACCENT, 0.12));
        g.save();
        rrPath(g, r.x + 1, r.y + 1, r.w - 2, r.h - 2, rad);
        g.strokeStyle = ACCENT;
        g.lineWidth = lw;
        g.setLineDash([Math.max(4, r.w * 0.08), Math.max(3, r.w * 0.06)]);
        g.stroke();
        g.restore();
        text(g, '?', r.x + r.w / 2, r.y + r.h / 2 + r.w * 0.02, r.w * 0.5, ACCENT, { weight: 800 });
      }
    });

    this.drawPanel(g, L);

    // Antworttasten
    const ansKey = itemKey(p.answer);
    L.opts.forEach((r, i) => {
      const isAns = itemKey(p.options[i]) === ansKey;
      const chosen = this.chosen === i;
      const state = answered ? (chosen ? (this.correct ? 'good' : 'bad') : 'normal') : 'normal';
      button(g, r, state);
      if (answered && !chosen && isAns) {
        g.save();
        rrPath(g, r.x - 2, r.y - 2, r.w + 4, r.h + 4, Math.min(r.w, r.h) * 0.22 + 2);
        g.strokeStyle = C.good;
        g.lineWidth = 4;
        g.stroke();
        g.restore();
      }
      const dim = answered && !chosen && !isAns;
      g.save();
      if (dim) g.globalAlpha = 0.45;
      drawItem(g, p.options[i], r.x + r.w / 2, r.y + r.h / 2, Math.min(r.h * 1.05, r.w * 0.8), C.white, counting);
      g.restore();
      if (!this.demo && !answered) text(g, String(i + 1), r.x + clamp(u * 1.8, 10, 16), r.y + clamp(u * 2, 11, 18), clamp(u * 2.2, 11, 16), C.faint, { weight: 700 });
      if (answered && chosen) {
        const br = Math.max(11, u * 1.9);
        badge(g, r.x + r.w - br * 0.3, r.y + br * 0.3, br, this.correct);
      }
    });
  }

  private drawPanel(g: CanvasRenderingContext2D, L: Layout): void {
    const { texts } = this.ctx;
    const P = L.panel;
    fillRR(g, P.x, P.y, P.w, P.h, Math.min(22, P.h * 0.3), 'rgba(255,255,255,0.055)');
    const fs = L.fsE;
    if (this.phase === 'ask') {
      g.save();
      g.font = font(fs, 700);
      const lines = wrap(g, texts.feedback.ask, P.w - 24);
      g.restore();
      lines.forEach((ln, i) => text(g, ln, P.x + P.w / 2, P.y + P.h / 2 + (i - (lines.length - 1) / 2) * fs * 1.3, fs, C.dim, { weight: 700 }));
      return;
    }
    // Erklärung links, „Weiter“ rechts
    const pad = Math.max(10, this.ctx.stage.u * 2);
    const tx = P.x + pad;
    const maxW = L.next.x - pad - tx;
    const head = this.correct ? texts.feedback.right : texts.feedback.wrong;
    const f = texts.feedback;
    const why = this.puzzle.why;
    let body = f[why.key] ?? '';
    for (const [k, v] of Object.entries(why.vars ?? {})) {
      const val = typeof v === 'string' && v.startsWith('@') ? (f[v.slice(1)] ?? '') : String(v);
      body = body.split(`{${k}}`).join(val);
    }
    g.save();
    g.font = font(fs, 700);
    let size = fs;
    let lines = wrap(g, body, maxW);
    // Bei wenig Platz etwas kleiner schreiben statt abzuschneiden
    while (lines.length > 2 && size > fs * 0.78) {
      size *= 0.94;
      g.font = font(size, 700);
      lines = wrap(g, body, maxW);
    }
    g.restore();
    const lh = size * 1.28;
    const blockH = lh * (lines.length + 1);
    let y = P.y + (P.h - blockH) / 2 + lh / 2;
    text(g, head, tx, y, size * 1.02, this.correct ? '#4ADE80' : '#FCA5A5', { weight: 800, align: 'left' });
    for (const ln of lines) {
      y += lh;
      text(g, ln, tx, y, size, C.fg, { weight: 700, align: 'left' });
    }
    const nr = Math.min(L.next.h, L.next.w) * 0.22;
    fillRR(g, L.next.x, L.next.y, L.next.w, L.next.h, nr, '#7A5195');
    g.save();
    rrPath(g, L.next.x + 0.75, L.next.y + 0.75, L.next.w - 1.5, L.next.h - 1.5, nr);
    g.strokeStyle = withAlpha(ACCENT, 0.9);
    g.lineWidth = 1.5;
    g.stroke();
    g.restore();
    text(g, `${f.next} →`, L.next.x + L.next.w / 2, L.next.y + L.next.h / 2 + 1, clamp(L.next.h * 0.34, 15, 24), C.white, { weight: 800 });
  }

  // ------------------------------------------------------------------ Ergebnis

  private finish(): void {
    const { ctx } = this;
    this.finished = true;
    ctx.ghost.clear();
    if (this.demo) {
      ctx.finish({ primary: { key: 'level', value: 1, unit: 'level', better: 'higher' }, secondary: [], score: 0, level: 1 });
      return;
    }
    const recs = this.records;
    const nOk = recs.filter((r) => r.correct).length;
    const acc = recs.length ? nOk / recs.length : 0;
    const medMs = median(recs.map((r) => r.ms));
    const solved = recs.filter((r) => r.correct).map((r) => r.puzzle.level);
    const hardest = solved.length ? Math.max(...solved) : 0;
    const wrongFam = recs.filter((r) => !r.correct).map((r) => r.puzzle.family);
    const thr = this.stair.threshold();
    let tip = 'great';
    if (acc < 0.5 && medMs < 7000) tip = 'calm';
    else if (wrongFam.includes('two')) tip = 'two';
    else if (wrongFam.some((f) => f === 'diff' || f === 'mult')) tip = 'steps';
    else if (acc < 0.7) tip = 'calm';
    const secondary: Metric[] = [
      { key: 'correct', value: nOk, unit: 'count' },
      ...(hardest ? [{ key: 'hardest', value: hardest, unit: 'level' as const }] : []),
      ...(Number.isFinite(medMs) ? [{ key: 'time', value: Math.round(medMs), unit: 'time' as const }] : []),
    ];
    ctx.sfx.done();
    ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), 1, MAX_LEVEL), unit: 'level', better: 'higher' },
      secondary,
      score: this.points,
      level: nextStartLevel(thr, 1, MAX_LEVEL),
      tip,
    });
  }
}

export const reihenRaetsel: ExerciseDefinition = {
  id: 'reihen-raetsel',
  category: 'konzentration',
  minutes: 3,
  color: '#7A5195',
  showsLevel: true,
  icon:
    '<rect x="3" y="29" width="8" height="11" rx="1.6" fill="currentColor"/><rect x="13.5" y="23" width="8" height="17" rx="1.6" fill="currentColor"/><rect x="24" y="17" width="8" height="23" rx="1.6" fill="currentColor"/><rect x="35" y="9.5" width="10.5" height="30.5" rx="2.2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-dasharray="3.6 2.8"/><path d="M37.6 20.6a2.7 2.7 0 1 1 4 2.4c-.9.5-1.4 1.1-1.4 2.2v.6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="40.2" cy="30.3" r="1.5" fill="currentColor"/>',
  texts: { de, it },
  create: (ctx) => new ReihenRaetsel(ctx),
};
