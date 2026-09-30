/**
 * Rastermuster – einige Felder eines Rasters leuchten kurz, danach werden genau diese Felder angetippt
 * (Katalog 603, docs/uebungskatalog/uebungen/603-grid-memorization.md, Memory-Matrix-Prinzip).
 *
 * Umsetzung der Empfehlungen aus Abschnitt 10 des Katalogeintrags:
 * - Stufen 1–12: 3×3 mit 3 Feldern → 6×6 mit 11 Feldern (Dichte stets unter 45 %). Auf kleinen Bühnen (Handy)
 *   wird das Raster kleiner, damit jedes Feld mindestens ≈ 50 px misst.
 * - Muster mit kontrollierter Struktur: höchstens zwei Felder je Zeile/Spalte (keine Reihe, die sich als „Strich“ merken
 *   ließe), nie zweimal dasselbe Muster hintereinander (siehe logic.ts).
 * - Markierung nicht nur über Farbe: Leuchtende Felder werden heller UND tragen eine Raute; richtig getippte Felder
 *   zeigen ein ✓, falsche ein ✗, verpasste Felder am Ende eine Raute im Umriss. Weiche Ein-/Ausblendung (220/280 ms),
 *   kein Blitzen, kein Vollbild-Aufleuchten, kein Rot.
 * - Anzeigedauer: 1,6 s + 0,1 s je Feld.
 * - Gedächtnis statt Tempo: kein Zeitlimit, feste Zahl von Mustern (8; Test-Modus 3) statt Uhr. Ein Fehlversuch
 *   kostet keine Zeit, nur ein Feld im Fehlerzähler: Zwei falsche Tipps beenden das Muster, bei einem darf es
 *   trotzdem gelingen.
 * - Treppe mit Abstieg: 2 gemeisterte Muster in Folge → eine Stufe höher, 1 nicht gemeistertes → eine tiefer
 *   (≈ 71 % Erfolg; Levitt 1971). Start bei Stufe 2 bzw. gespeicherter Stufe.
 * - Auslösen beim Antippen; bereits markierte Felder werden ignoriert (Doppel-Tipps schaden nicht).
 * - Hauptwert: höchste gemeisterte Stufe; dazu gemeisterte Muster, größtes Muster (Felder) und Anteil richtig
 *   erinnerter Felder. Nur Vergleich mit sich selbst, keine Normwerte.
 */
import { background, C, fillRR, rrPath, text, withAlpha } from '../../core/draw';
import { nextStartLevel, type Staircase } from '../../core/staircase';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo } from '../../core/types';
import { cellLight, createStaircase, effectiveSpec, isMastered, makePattern, MAX_LEVEL, MAX_WRONG, PATTERNS, QUICK_PATTERNS, showMs } from './logic';
import { de, it } from './texts';

const ACCENT = '#2F8F83';
/** Helles Türkis für leuchtende Felder (weich, nicht grell) */
const LIT = '#8BE9DC';
const DARK = '#0B1424';
const READY_MS = 900;
const SHOW_LEAD_MS = 250;
const SHOW_TAIL_MS = 250;
const RESULT_OK_MS = 1000;
const RESULT_BAD_MS = 2000;
const POP_MS = 200;
const DEMO_END_MS = 1500;
/** Kleinste Feldbreite (Mittenabstand) in px für die Berechnung der maximalen Rastergröße */
const MIN_PITCH = 52;

type Phase = 'ready' | 'show' | 'input' | 'result' | 'end' | 'done';

interface Layout {
  statusY: number;
  statusPx: number;
  infoY: number;
  pitch: number;
  cell: number;
  gx: number;
  gy: number;
}

/** Platz, den die Bildunterschrift im Intro-Film unten braucht (wie im Runner berechnet) */
function captionReserve(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return size * 2.1 + s.h * 0.05 + Math.max(6, s.u * 1.5);
}

function diamond(g: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
  g.beginPath();
  g.moveTo(cx, cy - r);
  g.lineTo(cx + r * 0.8, cy);
  g.lineTo(cx, cy + r);
  g.lineTo(cx - r * 0.8, cy);
  g.closePath();
}

class Rastermuster implements Exercise {
  private readonly stair: Staircase;
  private readonly total: number;
  private round = 0;
  private level = 1;
  private n = 3;
  private k = 3;
  private pattern: number[] = [];
  private prevPattern: number[] | undefined;
  private found = new Set<number>();
  private wrongCells = new Set<number>();
  private popT = new Map<number, number>();
  private phase: Phase = 'ready';
  private phaseT = 0;
  private showT0 = 0;
  private showDur = 0;
  private showEnd = 0;
  private ok = false;
  private plannedRound = -1;
  private lay: Layout | null = null;
  private layKey = '';
  // Auswertung
  private points = 0;
  private bestLevel = 0;
  private mastered = 0;
  private bestK = 0;
  private foundTotal = 0;
  private shownTotal = 0;
  private wrongTotal = 0;

  constructor(private readonly ctx: ExerciseContext) {
    this.stair = createStaircase(ctx.startLevel);
    this.total = this.demo ? 1 : ctx.quick ? QUICK_PATTERNS : PATTERNS;
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

  /** Größtes Raster, dessen Felder mindestens MIN_PITCH px messen */
  private maxN(): number {
    const { w, h, u } = this.ctx.stage;
    const side = Math.max(12, u * 3);
    const statusPx = clamp(u * 4.4, 16, 34);
    const head = Math.max(8, u * 2) + statusPx * 2.6 + Math.max(8, u * 2);
    const bottom = this.demo ? captionReserve(this.ctx.stage) : Math.max(12, u * 3);
    const avail = Math.min(w - 2 * side, h - head - bottom);
    return Math.max(3, Math.floor(avail / MIN_PITCH));
  }

  private newRound(t: number): void {
    const { ctx } = this;
    this.level = this.demo ? 1 : Math.round(this.stair.level);
    const spec = effectiveSpec(this.level, this.maxN());
    this.n = spec.n;
    this.k = spec.k;
    this.pattern = makePattern(ctx.rng, this.n, this.k, this.prevPattern);
    this.prevPattern = this.pattern;
    this.found = new Set();
    this.wrongCells = new Set();
    this.popT = new Map();
    this.ok = false;
    this.phase = 'ready';
    this.phaseT = t;
    this.plannedRound = -1;
    this.lay = null;
    if (this.demo) ctx.hud.caption(ctx.texts.captions.watch);
    else ctx.hud.setLabel(`${ctx.texts.feedback.round} ${this.round + 1}/${this.total}`);
  }

  private startShow(t: number): void {
    this.phase = 'show';
    this.phaseT = t;
    this.showDur = showMs(this.k);
    this.showT0 = t + SHOW_LEAD_MS;
    this.showEnd = this.showT0 + this.showDur + SHOW_TAIL_MS;
    this.ctx.sfx.tick();
  }

  private startInput(t: number): void {
    this.phase = 'input';
    this.phaseT = t;
    if (this.demo) this.ctx.hud.caption(this.ctx.texts.captions.repeat);
  }

  update(_dt: number, t: number): void {
    if (this.phase === 'done') return;
    const { ctx } = this;
    switch (this.phase) {
      case 'ready':
        if (t - this.phaseT >= READY_MS) this.startShow(t);
        break;
      case 'show':
        if (t >= this.showEnd) this.startInput(t);
        break;
      case 'input':
        if (ctx.autoplay && this.plannedRound !== this.round) this.planGhost();
        break;
      case 'result': {
        const dur = this.demo ? 1300 : this.ok ? RESULT_OK_MS : RESULT_BAD_MS;
        if (t - this.phaseT >= dur) this.afterRound(t);
        break;
      }
      case 'end':
        if (t - this.phaseT >= DEMO_END_MS) {
          this.phase = 'done';
          ctx.finish({ primary: { key: 'level', value: 1, unit: 'level', better: 'higher' }, secondary: [], score: 0, level: 1 });
        }
        break;
      default:
        break;
    }
  }

  private afterRound(t: number): void {
    const { ctx } = this;
    this.round++;
    if (this.demo) {
      this.phase = 'end';
      this.phaseT = t;
      ctx.ghost.moveTo(ctx.stage.w * 0.93, ctx.stage.h * 0.45, { delay: 100, move: 600 });
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
    const key = `${w}x${h}:${this.n}:${this.demo ? 1 : 0}`;
    if (this.lay && key === this.layKey) return this.lay;
    const side = Math.max(12, u * 3);
    const top = Math.max(8, u * 2);
    const statusPx = clamp(u * 4.4, 16, 34);
    const statusY = top + statusPx * 0.6;
    const infoY = statusY + statusPx * 1.35;
    const gridTop = infoY + statusPx * 0.9 + Math.max(8, u * 2);
    const bottom = this.demo ? captionReserve(this.ctx.stage) : Math.max(12, u * 3);
    const availW = Math.max(1, w - 2 * side);
    const availH = Math.max(1, h - gridTop - bottom);
    const pitch = Math.min(Math.min(availW, availH) / this.n, 128);
    const gap = Math.max(4, pitch * 0.09);
    const size = pitch * this.n;
    this.layKey = key;
    this.lay = {
      statusY,
      statusPx,
      infoY,
      pitch,
      cell: pitch - gap,
      gx: (w - size) / 2 + gap / 2,
      gy: gridTop + Math.max(0, availH - size) / 2 + gap / 2,
    };
    return this.lay;
  }

  resize(): void {
    this.lay = null;
    if (this.ctx.autoplay) {
      this.ctx.ghost.clear();
      this.plannedRound = -1;
    }
  }

  private cellRect(i: number): { x: number; y: number; s: number; cx: number; cy: number } {
    const L = this.layout();
    const x = L.gx + (i % this.n) * L.pitch;
    const y = L.gy + Math.floor(i / this.n) * L.pitch;
    return { x, y, s: L.cell, cx: x + L.cell / 2, cy: y + L.cell / 2 };
  }

  // ------------------------------------------------------------------ Eingabe

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'input') return;
    const L = this.layout();
    const off = (L.pitch - L.cell) / 2;
    const col = Math.floor((p.x - L.gx + off) / L.pitch);
    const row = Math.floor((p.y - L.gy + off) / L.pitch);
    if (col < 0 || row < 0 || col >= this.n || row >= this.n) return;
    this.tapCell(row * this.n + col, p.t);
  }

  private tapCell(i: number, t: number): void {
    // bereits markierte Felder (richtig oder falsch) ignorieren – Doppel-Tipps schaden nicht
    if (this.found.has(i) || this.wrongCells.has(i)) return;
    const { ctx } = this;
    this.popT.set(i, t);
    if (this.pattern.includes(i)) {
      this.found.add(i);
      ctx.sfx.tap();
      if (this.found.size >= this.k) this.endRound(t);
    } else {
      this.wrongCells.add(i);
      ctx.sfx.bad();
      if (this.wrongCells.size >= MAX_WRONG) this.endRound(t);
    }
  }

  private endRound(t: number): void {
    const { ctx } = this;
    this.ok = isMastered(this.found.size, this.k, this.wrongCells.size);
    this.phase = 'result';
    this.phaseT = t;
    ctx.ghost.clear();
    const L = this.layout();
    if (this.ok) ctx.sfx.good();
    ctx.hud.toast(this.ok ? ctx.texts.feedback.right : ctx.texts.feedback.wrong, this.ok ? 'good' : 'info', { y: L.statusY, ms: this.demo ? 1100 : this.ok ? 900 : 1600 });
    if (this.demo) {
      ctx.hud.caption(ctx.texts.captions.bigger);
      return;
    }
    this.foundTotal += this.found.size;
    this.shownTotal += this.k;
    this.wrongTotal += this.wrongCells.size;
    if (this.ok) {
      this.mastered++;
      this.bestLevel = Math.max(this.bestLevel, this.level);
      this.bestK = Math.max(this.bestK, this.k);
      this.points += this.level * 10 + (this.wrongCells.size === 0 ? 10 : 0);
      ctx.hud.setScore(this.points);
    }
    this.stair.update(this.ok);
    ctx.hud.setProgress((this.round + 1) / this.total);
  }

  // ------------------------------------------------------------------ Autoplay (Demo und Tests)

  private planGhost(): void {
    const { ghost, rng } = this.ctx;
    this.plannedRound = this.round;
    const todo = this.pattern.filter((c) => !this.found.has(c));
    if (this.demo) {
      todo.forEach((c, i) => {
        const r = this.cellRect(c);
        ghost.tap(r.cx, r.cy, { delay: i === 0 ? 700 : 300, move: i === 0 ? 700 : 500 });
      });
      return;
    }
    // Spielmodus (nur Tests): meist richtig, mit wachsender Stufe öfter ein oder zwei Fehltipps
    rng.shuffle(todo);
    const wrongs = rng.chance(clamp(0.05 * this.level, 0, 0.6)) ? 1 + (rng.chance(0.3) ? 1 : 0) : 0;
    const empties = rng.shuffle(Array.from({ length: this.n * this.n }, (_, i) => i).filter((c) => !this.pattern.includes(c)));
    const plan: number[] = [...todo];
    for (let w = 0; w < wrongs && w < empties.length; w++) plan.splice(rng.int(plan.length + 1), 0, empties[w]);
    for (const c of plan) {
      const r = this.cellRect(c);
      ghost.tap(r.cx + rng.range(-0.15, 0.15) * r.s, r.cy + rng.range(-0.15, 0.15) * r.s, { delay: rng.range(250, 500), move: 240 });
    }
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    if (!this.pattern.length) return;
    const L = this.layout();
    this.drawStatus(g, L);
    this.drawGrid(g, L, t);
  }

  private drawStatus(g: CanvasRenderingContext2D, L: Layout): void {
    const { w } = this.ctx.stage;
    const f = this.ctx.texts.feedback;
    let label = '';
    if (this.phase === 'ready' || this.phase === 'show') label = f.watch;
    else if (this.phase === 'input') label = f.tap;
    if (label) text(g, label, w / 2, L.statusY, L.statusPx, this.phase === 'input' ? C.white : C.dim, { weight: 800 });
    if (this.phase === 'input' || this.phase === 'result') {
      // Info-Zeile über dem Raster: links „Noch N“, rechts zwei Fehler-Felder (✗ = verbraucht)
      const x0 = L.gx - (L.pitch - L.cell) / 2;
      const x1 = x0 + L.pitch * this.n;
      const left = this.phase === 'input' ? `${f.left} ${this.k - this.found.size}` : '';
      if (left) text(g, left, x0 + 2, L.infoY, L.statusPx * 0.85, C.fg, { align: 'left', weight: 700 });
      const box = L.statusPx * 0.95;
      for (let m = 0; m < MAX_WRONG; m++) {
        const bx = x1 - 2 - box - (MAX_WRONG - 1 - m) * (box + 8);
        const used = m < this.wrongCells.size;
        const by = L.infoY - box / 2;
        fillRR(g, bx, by, box, box, box * 0.22, used ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.06)');
        g.save();
        rrPath(g, bx + 1, by + 1, box - 2, box - 2, box * 0.22);
        g.strokeStyle = 'rgba(255,255,255,0.35)';
        g.lineWidth = 1.5;
        g.stroke();
        if (used) {
          g.strokeStyle = C.fg;
          g.lineWidth = Math.max(2.5, box * 0.11);
          g.lineCap = 'round';
          g.beginPath();
          g.moveTo(bx + box * 0.3, by + box * 0.3);
          g.lineTo(bx + box * 0.7, by + box * 0.7);
          g.moveTo(bx + box * 0.7, by + box * 0.3);
          g.lineTo(bx + box * 0.3, by + box * 0.7);
          g.stroke();
        }
        g.restore();
      }
    }
  }

  private drawGrid(g: CanvasRenderingContext2D, L: Layout, t: number): void {
    const still = this.ctx.reducedMotion;
    const showing = this.phase === 'show';
    const light = showing ? cellLight(t - this.showT0, this.showDur) : 0;
    const reveal = this.phase === 'result' && !this.ok;
    const r = L.cell * 0.18;
    const lw = Math.max(2, L.cell * 0.04);
    for (let i = 0; i < this.n * this.n; i++) {
      const q = this.cellRect(i);
      const inPattern = this.pattern.includes(i);
      const isFound = this.found.has(i);
      const isWrong = this.wrongCells.has(i);
      const pk = this.popT.get(i);
      const pop = pk === undefined || still ? 0 : 0.1 * (1 - easeOut(clamp((t - pk) / POP_MS, 0, 1)));
      const s = q.s * (1 + pop);
      const x = q.cx - s / 2;
      const y = q.cy - s / 2;
      fillRR(g, x, y, s, s, r, 'rgba(255,255,255,0.09)');
      const lit = inPattern ? light : 0;
      if (lit > 0.01) fillRR(g, x, y, s, s, r, withAlpha(LIT, 0.95 * lit));
      if (isFound) fillRR(g, x, y, s, s, r, withAlpha(ACCENT, 0.55));
      g.save();
      rrPath(g, x + 1, y + 1, s - 2, s - 2, r);
      g.strokeStyle = isFound ? withAlpha(LIT, 0.9) : isWrong ? C.fg : lit > 0.01 ? withAlpha(LIT, 0.4 + 0.6 * lit) : 'rgba(255,255,255,0.2)';
      g.lineWidth = isFound || isWrong ? lw * 1.4 : lw;
      g.stroke();
      g.restore();
      // Raute in leuchtenden Feldern (Form zusätzlich zur Helligkeit)
      if (lit > 0.01) {
        g.save();
        g.globalAlpha = lit;
        diamond(g, q.cx, q.cy, q.s * 0.28);
        g.fillStyle = DARK;
        g.fill();
        g.restore();
      }
      // Richtig: Haken, falsch: Kreuz
      if (isFound) this.mark(g, q.cx, q.cy, q.s * 0.2, C.white, lw * 1.6, true);
      if (isWrong) this.mark(g, q.cx, q.cy, q.s * 0.19, C.fg, lw * 1.6, false);
      // Verpasste Felder am Ende: Raute im Umriss
      if (reveal && inPattern && !isFound) {
        g.save();
        diamond(g, q.cx, q.cy, q.s * 0.26);
        g.strokeStyle = withAlpha(LIT, 0.95);
        g.lineWidth = lw * 1.3;
        g.setLineDash([lw * 2.2, lw * 1.6]);
        g.stroke();
        g.restore();
      }
    }
  }

  private mark(g: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string, lw: number, check: boolean): void {
    g.save();
    g.strokeStyle = color;
    g.lineWidth = lw;
    g.lineCap = 'round';
    g.lineJoin = 'round';
    g.beginPath();
    if (check) {
      g.moveTo(cx - r, cy);
      g.lineTo(cx - r * 0.3, cy + r * 0.7);
      g.lineTo(cx + r, cy - r * 0.7);
    } else {
      g.moveTo(cx - r, cy - r);
      g.lineTo(cx + r, cy + r);
      g.moveTo(cx + r, cy - r);
      g.lineTo(cx - r, cy + r);
    }
    g.stroke();
    g.restore();
  }

  // ------------------------------------------------------------------ Ergebnis

  private finish(): void {
    const { ctx } = this;
    this.phase = 'done';
    ctx.ghost.clear();
    let tip = 'great';
    if (this.mastered < this.total) tip = this.wrongTotal >= 3 ? 'calm' : 'groups';
    ctx.sfx.done();
    ctx.finish({
      primary: { key: 'level', value: this.bestLevel, unit: 'level', better: 'higher' },
      secondary: [
        { key: 'mastered', value: this.mastered, unit: 'count' },
        { key: 'biggest', value: this.bestK, unit: 'count' },
        { key: 'recall', value: this.shownTotal ? Math.round((100 * this.foundTotal) / this.shownTotal) : 0, unit: 'percent' },
      ],
      score: this.points,
      level: nextStartLevel(this.stair.threshold(), 1, MAX_LEVEL, 1),
      tip,
    });
  }
}

export const rastermuster: ExerciseDefinition = {
  id: 'rastermuster',
  category: 'gedaechtnis',
  minutes: 2,
  color: '#3A8F6E',
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="2.4"><rect x="5" y="5" width="11" height="11" rx="3"/><rect x="18.5" y="5" width="11" height="11" rx="3"/><rect x="32" y="5" width="11" height="11" rx="3"/><rect x="5" y="18.5" width="11" height="11" rx="3"/><rect x="32" y="18.5" width="11" height="11" rx="3"/><rect x="5" y="32" width="11" height="11" rx="3"/><rect x="32" y="32" width="11" height="11" rx="3"/></g><rect x="18.5" y="18.5" width="11" height="11" rx="3" fill="currentColor"/><rect x="18.5" y="32" width="11" height="11" rx="3" fill="currentColor" opacity=".55"/><path d="M24 21.5l2.5 3-2.5 3-2.5-3z" fill="#fff"/>',
  texts: { de, it },
  create: (ctx) => new Rastermuster(ctx),
};
