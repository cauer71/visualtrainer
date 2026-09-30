/**
 * Leuchtfolge – eine Folge aus leuchtenden Feldern ansehen, merken und in derselben Reihenfolge nachtippen
 * (Prinzip des Senso-Spiels; Katalog 601, docs/uebungskatalog/uebungen/601-color-sequence.md).
 *
 * Umsetzung der Empfehlungen aus Abschnitt 10 des Katalogeintrags:
 * - Farbe nie allein: Jedes der sechs Felder hat feste Position, eine eigene Farbe (Palette nach Okabe & Ito,
 *   auch bei Rot-Grün-Schwäche unterscheidbar) UND ein eigenes Symbol (Kreis, Dreieck, Quadrat, Stern,
 *   Raute, Plus). Das Symbol ist im dunklen wie im leuchtenden Zustand sichtbar. Rückmeldung nie nur über
 *   Farbe: ✓ / ✗ und Ringe.
 * - Weiche Helligkeitsübergänge (sinusartig, 150 ms ein / 150 ms aus), mindestens 300 ms dunkel zwischen zwei
 *   Leuchtphasen, höchstens ≈ 1,4 Leuchtphasen pro Sekunde. Kein Blitzen, kein Vollbild-Schimmer, kein Rot bei Fehlern.
 * - Folge: nie dasselbe Feld direkt hintereinander, keine „Treppen“ (siehe logic.ts).
 * - Gedächtnis statt Tempo: Kein Zeitlimit für die Antwort. Feste Rundenzahl (7; Test-Modus 3) statt Uhr.
 * - Schwierigkeit: 1-auf/1-ab-Treppe über die Folgenlänge (2–12, Start 3 bzw. gespeicherte Stufe). Richtig →
 *   eine Stelle länger, Fehler → eine kürzer. Eine neue Zufallsfolge je Runde.
 * - Ein falscher Tipp beendet die Runde sofort; danach wird die richtige Folge gezeigt (Symbolreihe).
 * - Hauptwert: längste fehlerfrei gemerkte Folge (Stufe = Länge). Dazu fehlerfreie Runden und richtig
 *   getippte Felder. Nur Vergleich mit sich selbst, kein Normwert.
 */
import { background, C, circle, fillRR, glow, ring, rrPath, star, text, triangle, withAlpha } from '../../core/draw';
import { nextStartLevel, type Staircase } from '../../core/staircase';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo } from '../../core/types';
import { brightness, createStaircase, FIELDS, MAX_LEN, MIN_LEN, makeSequence, periodMs, QUICK_ROUNDS, ROUNDS, showTiming, TAP_TIMING, type FlashTiming } from './logic';
import { de, it } from './texts';

const ACCENT = '#2F8F83';
const READY_MS = 900;
const SHOW_LEAD_MS = 250;
const SHOW_TAIL_MS = 250;
const RESULT_OK_MS = 1000;
const RESULT_BAD_MS = 2000;
const DOUBLE_TAP_MS = 220;
const DEMO_END_MS = 1500;
const DEMO_LENS = [2, 3];

/** Palette nach Okabe & Ito (farbsehschwächen-tauglich) – Identität zusätzlich über das Symbol */
const COLORS = ['#E69F00', '#56B4E9', '#009E73', '#F0E442', '#0072B2', '#CC79A7'] as const;
const DARK = '#0B1424';
const SYMBOL_LIGHT = 'rgba(232,238,247,0.85)';

type Phase = 'ready' | 'show' | 'input' | 'result' | 'end' | 'done';

interface Flash {
  f: number;
  t0: number;
  tm: FlashTiming;
}

interface Layout {
  cols: number;
  rows: number;
  cell: number;
  pitch: number;
  x0: number;
  y0: number;
  statusY: number;
  statusPx: number;
  slotY: number;
  slot: number;
}

/** Platz, den die Bildunterschrift im Intro-Film unten braucht (wie im Runner berechnet) */
function captionReserve(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return size * 2.1 + s.h * 0.05 + Math.max(6, s.u * 1.5);
}

function drawSymbol(g: CanvasRenderingContext2D, kind: number, cx: number, cy: number, r: number, color: string): void {
  switch (kind) {
    case 0:
      circle(g, cx, cy, r * 0.92, color);
      break;
    case 1:
      triangle(g, cx, cy - r * 0.05, r * 1.18, color);
      break;
    case 2:
      fillRR(g, cx - r * 0.82, cy - r * 0.82, r * 1.64, r * 1.64, r * 0.16, color);
      break;
    case 3:
      star(g, cx, cy + r * 0.05, r * 1.15, color, 5);
      break;
    case 4:
      g.beginPath();
      g.moveTo(cx, cy - r * 1.08);
      g.lineTo(cx + r * 0.85, cy);
      g.lineTo(cx, cy + r * 1.08);
      g.lineTo(cx - r * 0.85, cy);
      g.closePath();
      g.fillStyle = color;
      g.fill();
      break;
    default: {
      const a = r * 0.36;
      fillRR(g, cx - a, cy - r, a * 2, r * 2, a * 0.5, color);
      fillRR(g, cx - r, cy - a, r * 2, a * 2, a * 0.5, color);
    }
  }
}

function drawCross(g: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string, lw: number): void {
  g.save();
  g.strokeStyle = color;
  g.lineWidth = lw;
  g.lineCap = 'round';
  g.beginPath();
  g.moveTo(cx - r, cy - r);
  g.lineTo(cx + r, cy + r);
  g.moveTo(cx + r, cy - r);
  g.lineTo(cx - r, cy + r);
  g.stroke();
  g.restore();
}

function drawCheck(g: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string, lw: number): void {
  g.save();
  g.strokeStyle = color;
  g.lineWidth = lw;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.beginPath();
  g.moveTo(cx - r, cy);
  g.lineTo(cx - r * 0.3, cy + r * 0.7);
  g.lineTo(cx + r, cy - r * 0.7);
  g.stroke();
  g.restore();
}

class Leuchtfolge implements Exercise {
  private readonly stair: Staircase;
  private readonly total: number;
  private round = 0;
  private len = 3;
  private seq: number[] = [];
  private entered: number[] = [];
  private phase: Phase = 'ready';
  private phaseT = 0;
  private showT0 = 0;
  private showEnd = 0;
  private tickIdx = 0;
  private flashes: Flash[] = [];
  private lastTap = { f: -1, t: -1e9 };
  private errIdx = -1;
  private ok = false;
  private plannedRound = -1;
  private lay: Layout | null = null;
  private layKey = '';
  // Auswertung
  private points = 0;
  private bestOk = 0;
  private perfect = 0;
  private tapsOk = 0;
  private errIdxs: number[] = [];
  private errFrac: number[] = [];

  constructor(private readonly ctx: ExerciseContext) {
    this.stair = createStaircase(ctx.startLevel);
    this.total = this.demo ? DEMO_LENS.length : ctx.quick ? QUICK_ROUNDS : ROUNDS;
  }

  private get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  start(t: number): void {
    this.ctx.hud.setScore(this.demo ? null : 0);
    this.ctx.hud.setProgress(0);
    this.newRound(t);
  }

  // ------------------------------------------------------------------ Runden

  private newRound(t: number): void {
    const { ctx } = this;
    this.len = this.demo ? DEMO_LENS[this.round] : this.stair.level;
    this.seq = makeSequence(ctx.rng, this.len);
    this.entered = [];
    this.flashes = [];
    this.errIdx = -1;
    this.ok = false;
    this.tickIdx = 0;
    this.phase = 'ready';
    this.phaseT = t;
    this.lastTap = { f: -1, t: -1e9 };
    if (this.demo) ctx.hud.caption(this.round === 0 ? ctx.texts.captions.watch : ctx.texts.captions.longer);
    else ctx.hud.setLabel(`${ctx.texts.feedback.round} ${this.round + 1}/${this.total}`);
  }

  private startShow(t: number): void {
    this.phase = 'show';
    this.phaseT = t;
    this.showT0 = t + SHOW_LEAD_MS;
    const p = periodMs(this.len);
    const tm = showTiming(this.len);
    this.seq.forEach((f, i) => this.flashes.push({ f, t0: this.showT0 + i * p, tm }));
    this.showEnd = this.showT0 + this.len * p + SHOW_TAIL_MS;
    this.tickIdx = 0;
  }

  private startInput(t: number): void {
    this.phase = 'input';
    this.phaseT = t;
    this.entered = [];
    if (this.demo) this.ctx.hud.caption(this.ctx.texts.captions.repeat);
  }

  update(_dt: number, t: number): void {
    if (this.phase === 'done') return;
    const { ctx } = this;
    if (this.flashes.length > 24) this.flashes = this.flashes.filter((f) => t - f.t0 < 2000);
    switch (this.phase) {
      case 'ready':
        if (t - this.phaseT >= READY_MS) this.startShow(t);
        break;
      case 'show': {
        const p = periodMs(this.len);
        while (this.tickIdx < this.len && t >= this.showT0 + this.tickIdx * p) {
          ctx.sfx.tick();
          this.tickIdx++;
        }
        if (t >= this.showEnd) this.startInput(t);
        break;
      }
      case 'input':
        if (ctx.autoplay && this.plannedRound !== this.round) this.planGhost();
        break;
      case 'result': {
        const dur = this.demo ? 1100 : this.ok ? RESULT_OK_MS : RESULT_BAD_MS;
        if (t - this.phaseT >= dur) this.afterRound(t);
        break;
      }
      case 'end':
        if (t - this.phaseT >= DEMO_END_MS) {
          this.phase = 'done';
          ctx.finish({ primary: { key: 'level', value: 1, unit: 'level', better: 'higher' }, secondary: [], score: 0, level: MIN_LEN });
        }
        break;
      default:
        break;
    }
  }

  private afterRound(t: number): void {
    this.round++;
    if (this.demo) {
      if (this.round >= this.total) {
        this.phase = 'end';
        this.phaseT = t;
        this.ctx.ghost.moveTo(this.ctx.stage.w * 0.93, this.ctx.stage.h * 0.5, { delay: 100, move: 600 });
        return;
      }
      this.newRound(t);
      return;
    }
    if (this.round >= this.total) {
      this.finish();
      return;
    }
    this.newRound(t);
  }

  // ------------------------------------------------------------------ Layout

  private layout(): Layout {
    const { w, h, u } = this.ctx.stage;
    const key = `${w}x${h}:${this.len}:${this.demo ? 1 : 0}`;
    if (this.lay && key === this.layKey) return this.lay;
    const top = Math.max(8, u * 2);
    const statusPx = clamp(u * 4.4, 16, 34);
    const statusY = top + statusPx * 0.6;
    const slot = clamp(Math.min(u * 6.5, (w * 0.9) / (this.len * 1.35)), 16, 46);
    const slotY = statusY + statusPx * 0.6 + slot * 0.9;
    const fieldsTop = slotY + slot * 1.2 + Math.max(8, u * 2.5);
    const bottom = this.demo ? captionReserve(this.ctx.stage) : Math.max(12, u * 3);
    const availW = Math.max(1, w - 2 * Math.max(12, u * 3));
    const availH = Math.max(1, h - fieldsTop - bottom);
    const fit = (cols: number, rows: number) => Math.min(availW / cols, availH / rows);
    const wide = fit(3, 2) >= fit(2, 3);
    const cols = wide ? 3 : 2;
    const rows = wide ? 2 : 3;
    const pitch = Math.min(fit(cols, rows), 200);
    const cell = pitch - Math.max(8, pitch * 0.08);
    const x0 = (w - pitch * cols) / 2 + (pitch - cell) / 2;
    const y0 = fieldsTop + Math.max(0, availH - pitch * rows) / 2 + (pitch - cell) / 2;
    this.layKey = key;
    this.lay = { cols, rows, cell, pitch, x0, y0, statusY, statusPx, slotY, slot };
    return this.lay;
  }

  resize(): void {
    this.lay = null;
    if (this.ctx.autoplay) {
      this.ctx.ghost.clear();
      this.plannedRound = -1;
    }
  }

  private fieldRect(f: number): { x: number; y: number; s: number; cx: number; cy: number } {
    const L = this.layout();
    const x = L.x0 + (f % L.cols) * L.pitch;
    const y = L.y0 + Math.floor(f / L.cols) * L.pitch;
    return { x, y, s: L.cell, cx: x + L.cell / 2, cy: y + L.cell / 2 };
  }

  // ------------------------------------------------------------------ Eingabe

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'input') return;
    const L = this.layout();
    const col = Math.floor((p.x - L.x0 + (L.pitch - L.cell) / 2) / L.pitch);
    const row = Math.floor((p.y - L.y0 + (L.pitch - L.cell) / 2) / L.pitch);
    if (col < 0 || row < 0 || col >= L.cols || row >= L.rows) return;
    this.tapField(row * L.cols + col, p.t);
  }

  keyDown(key: string, t: number): void {
    if (this.phase !== 'input') return;
    const n = Number(key);
    if (Number.isInteger(n) && n >= 1 && n <= FIELDS) this.tapField(n - 1, t);
  }

  private tapField(f: number, t: number): void {
    // Doppel-Tipp auf dasselbe Feld ignorieren (dasselbe Feld kommt nie direkt zweimal hintereinander)
    if (f === this.lastTap.f && t - this.lastTap.t < DOUBLE_TAP_MS) return;
    this.lastTap = { f, t };
    this.flashes.push({ f, t0: t, tm: TAP_TIMING });
    this.ctx.sfx.tap();
    const idx = this.entered.length;
    if (f === this.seq[idx]) {
      this.entered.push(f);
      if (!this.demo) this.tapsOk++;
      if (this.entered.length >= this.len) this.endRound(true, t);
    } else {
      this.errIdx = idx;
      this.entered.push(f);
      this.endRound(false, t);
    }
  }

  private endRound(ok: boolean, t: number): void {
    const { ctx } = this;
    this.ok = ok;
    this.phase = 'result';
    this.phaseT = t;
    ctx.ghost.clear();
    const L = this.layout();
    if (ok) ctx.sfx.good();
    else ctx.sfx.bad();
    ctx.hud.toast(ok ? ctx.texts.feedback.right : ctx.texts.feedback.wrong, ok ? 'good' : 'info', { y: L.statusY, ms: this.demo ? 1000 : ok ? 900 : 1600 });
    if (this.demo) return;
    if (ok) {
      this.bestOk = Math.max(this.bestOk, this.len);
      this.perfect++;
      this.points += this.len * 10;
      ctx.hud.setScore(this.points);
    } else {
      this.errIdxs.push(this.errIdx);
      this.errFrac.push(this.errIdx / this.len);
    }
    this.stair.update(ok);
    ctx.hud.setProgress((this.round + 1) / this.total);
  }

  // ------------------------------------------------------------------ Autoplay (Demo und Tests)

  private planGhost(): void {
    const { ghost, rng } = this.ctx;
    this.plannedRound = this.round;
    const from = this.entered.length;
    if (this.demo) {
      for (let i = from; i < this.len; i++) {
        const r = this.fieldRect(this.seq[i]);
        const first = i === 0;
        ghost.tap(r.cx, r.cy, { delay: first ? 600 : 330, move: first ? 650 : 500 });
      }
      return;
    }
    // Spielmodus (nur Tests): meist richtig, je länger, desto öfter ein Fehltipp
    const pWrong = clamp(0.06 * (this.len - 2), 0, 0.6);
    const wrongAt = rng.chance(pWrong) ? from + rng.int(this.len - from) : -1;
    for (let i = from; i < this.len; i++) {
      let f = this.seq[i];
      if (i === wrongAt) f = (f + 1 + rng.int(FIELDS - 1)) % FIELDS;
      const r = this.fieldRect(f);
      ghost.tap(r.cx + rng.range(-0.15, 0.15) * r.s, r.cy + rng.range(-0.15, 0.15) * r.s, { delay: rng.range(200, 420), move: 260 });
    }
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    if (!this.seq.length) return;
    const L = this.layout();
    const still = this.ctx.reducedMotion;
    // Helligkeit je Feld: stärkste laufende Leuchtphase
    const lit = new Array<number>(FIELDS).fill(0);
    for (const fl of this.flashes) lit[fl.f] = Math.max(lit[fl.f], brightness(t - fl.t0, fl.tm));
    for (let f = 0; f < FIELDS; f++) this.drawField(g, f, lit[f], still);
    this.drawSlots(g, L);
    this.drawStatus(g, L);
  }

  private drawField(g: CanvasRenderingContext2D, f: number, b: number, still: boolean): void {
    const q = this.fieldRect(f);
    const col = COLORS[f];
    const grow = still ? 0 : 0.045 * b;
    const s = q.s * (1 + grow);
    const x = q.cx - s / 2;
    const y = q.cy - s / 2;
    const r = s * 0.18;
    if (b > 0.04) glow(g, q.cx, q.cy, q.s * 0.56, col, b * 0.85);
    fillRR(g, x, y, s, s, r, withAlpha(col, 0.2));
    if (b > 0.01) fillRR(g, x, y, s, s, r, withAlpha(col, b));
    g.save();
    rrPath(g, x + 1.5, y + 1.5, s - 3, s - 3, r);
    g.strokeStyle = withAlpha(col, 0.6 + 0.4 * b);
    g.lineWidth = Math.max(2.5, q.s * 0.03);
    g.stroke();
    g.restore();
    // Symbol: hell im Ruhezustand, dunkel auf leuchtender Fläche – immer sichtbar
    const sr = s * 0.25;
    if (b < 0.99) {
      g.save();
      g.globalAlpha = 1 - b;
      drawSymbol(g, f, q.cx, q.cy, sr, SYMBOL_LIGHT);
      g.restore();
    }
    if (b > 0.01) {
      g.save();
      g.globalAlpha = b;
      drawSymbol(g, f, q.cx, q.cy, sr, DARK);
      g.restore();
    }
  }

  /** Kleine Platzhalter für jede Stelle der Folge: leer, eingegeben oder – nach einem Fehler – die richtige Folge */
  private drawSlots(g: CanvasRenderingContext2D, L: Layout): void {
    const { w } = this.ctx.stage;
    const n = this.len;
    const step = L.slot * 1.35;
    const x0 = w / 2 - (step * (n - 1)) / 2;
    const r = L.slot * 0.36;
    const showAnswer = this.phase === 'result' && !this.ok;
    for (let i = 0; i < n; i++) {
      const cx = x0 + i * step;
      const cy = L.slotY;
      const isCur = this.phase === 'input' && i === this.entered.length;
      const filled = i < this.entered.length && !(showAnswer && i === this.errIdx);
      if (showAnswer) {
        drawSymbol(g, this.seq[i], cx, cy, r, COLORS[this.seq[i]]);
        if (i === this.errIdx) {
          ring(g, cx, cy, L.slot * 0.62, C.fg, Math.max(2, L.slot * 0.08));
          drawCross(g, cx, cy + L.slot * 1.05, L.slot * 0.26, C.fg, Math.max(2.5, L.slot * 0.1));
        }
      } else if (filled) {
        drawSymbol(g, this.entered[i], cx, cy, r, COLORS[this.entered[i]]);
        if (this.phase === 'result' && this.ok) drawCheck(g, cx, cy + L.slot * 1.05, L.slot * 0.26, C.fg, Math.max(2.5, L.slot * 0.1));
      } else {
        ring(g, cx, cy, r, isCur ? 'rgba(232,238,247,0.9)' : 'rgba(232,238,247,0.3)', Math.max(2, L.slot * (isCur ? 0.1 : 0.07)));
      }
    }
  }

  private drawStatus(g: CanvasRenderingContext2D, L: Layout): void {
    const { w } = this.ctx.stage;
    const f = this.ctx.texts.feedback;
    let label = '';
    if (this.phase === 'ready' || this.phase === 'show') label = f.watch;
    else if (this.phase === 'input') label = f.yourTurn;
    if (!label) return;
    text(g, label, w / 2, L.statusY, L.statusPx, this.phase === 'input' ? C.white : C.dim, { weight: 800 });
  }

  // ------------------------------------------------------------------ Ergebnis

  private finish(): void {
    const { ctx } = this;
    this.phase = 'done';
    ctx.ghost.clear();
    let tip = 'great';
    if (this.errFrac.length) {
      const avg = this.errFrac.reduce((a, b) => a + b, 0) / this.errFrac.length;
      tip = avg < 0.4 ? 'start' : avg > 0.75 ? 'end' : 'group';
    }
    ctx.sfx.done();
    ctx.finish({
      primary: { key: 'level', value: this.bestOk, unit: 'level', better: 'higher' },
      secondary: [
        { key: 'rounds', value: this.perfect, unit: 'count' },
        { key: 'taps', value: this.tapsOk, unit: 'count' },
      ],
      score: this.points,
      level: nextStartLevel(this.stair.threshold(), MIN_LEN, MAX_LEN, 1),
      tip,
    });
  }
}

export const leuchtfolge: ExerciseDefinition = {
  id: 'leuchtfolge',
  category: 'gedaechtnis',
  minutes: 2,
  color: ACCENT,
  icon:
    '<g stroke="currentColor" stroke-width="2.6"><rect x="5" y="6" width="17" height="17" rx="4" fill="currentColor" opacity=".9"/><rect x="26" y="6" width="17" height="17" rx="4" fill="none"/><rect x="5" y="27" width="17" height="17" rx="4" fill="none"/><rect x="26" y="27" width="17" height="17" rx="4" fill="none"/></g><circle cx="13.5" cy="14.5" r="4" fill="#fff"/><path d="M34.5 10.5 40 20.5H29z" fill="currentColor" opacity=".7"/><rect x="31" y="32" width="7" height="7" rx="1" fill="currentColor" opacity=".7"/><path d="M13.5 31.5l1.9 3.9 4.3.6-3.1 3 .7 4.2-3.8-2-3.8 2 .7-4.2-3.1-3 4.3-.6z" fill="currentColor" opacity=".7"/>',
  texts: { de, it },
  create: (ctx) => new Leuchtfolge(ctx),
};
