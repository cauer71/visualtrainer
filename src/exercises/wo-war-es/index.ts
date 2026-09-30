/**
 * Wo war es? – Symbol und Ort zusammen merken (Objekt-Ort-Gedächtnis, Katalog 605).
 *
 * Umsetzung nach den Empfehlungen des Katalogs (Abschnitt 10):
 * - Eigener Formensatz (Kreis, Ring, Quadrat, Dreieck, Raute, Stern, Kreuz, Sechseck, Herz, Mond), überall gleich,
 *   klar verschiedene Umrisse – Farbe ist nur ein Zusatz. In einer Anordnung kommt jede Form nur einmal vor.
 * - Raster: bis 3 Symbole 3×3, bis 6 Symbole 4×4, darüber 5×5 (höchstens 9 Symbole, Zellen ≥ ≈ 50 px).
 * - Ablauf je Runde: Symbole liegen kurz (1,4 s + 0,5 s je Symbol), werden weich ausgeblendet, alle Felder sehen
 *   gleich aus (keine „Fragezeichen“, die verraten würden, wo etwas lag) → ein Symbol wird gezeigt → eine Zelle tippen.
 *   Kein Zeitdruck in der Antwort.
 * - Rückmeldung mit Zeichen (✓ / ✗) und Linie zum richtigen Feld; die übrigen Symbole erscheinen blass, so sieht man
 *   auch Verwechslungen. Kein rotes Aufblitzen.
 * - Stufe = Anzahl Symbole, adaptiv (Staircase 2-down/1-up, ≈ 71 % Treffer). 12 Runden (≈ 2 Minuten).
 * - Hauptwert: größte „sicher gemeisterte“ Symbolzahl (mindestens 2 Treffer auf der Stufe, Trefferquote dort ≥ 50 %).
 *   Zusatz: mittlerer Ortsfehler in % der Kantenlänge (Abstand der Zellmitten, alle Runden), Treffer, Verwechslungen.
 * - Es zählt die Zelle: „richtig“ = genau die Zelle, „knapp“ = Nachbarzelle (bekommt etwas Punkte, zählt aber nicht als Treffer).
 */
import { background, C, circle, fillRR, font, rrPath, text, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo } from '../../core/types';
import { drawForm, FORM_COLORS } from '../_formen';
import {
  classify,
  errorPct,
  gridFor,
  isSwap,
  MAX_OBJECTS,
  MIN_OBJECTS,
  pickAsked,
  placeObjects,
  showMs,
  START_OBJECTS,
  summarize,
  type Outcome,
  type Placed,
  type RoundRecord,
} from './logic';
import { de, it } from './texts';

const ACCENT = '#2F8F83';
const ROUNDS = 12;
const QUICK_ROUNDS = 3;
const READY_MS = 500;
const COVER_MS = 650;
const FADE_IN_MS = 300;
const FADE_OUT_MS = 400;
const ASK_LOCK_MS = 300;
const FB_OK_MS = 900;
const FB_MISS_MS = 1900;
const DEMO_SHOW_MS = 1800;
const DEMO_FB_MS = 1300;
const DEMO_KS = [3, 4];
const MAX_CELL = 120;

type Phase = 'ready' | 'show' | 'cover' | 'ask' | 'feedback' | 'done';

interface Layout {
  pillCy: number;
  pillH: number;
  gx: number;
  gy: number;
  cell: number;
  side: number;
  restX: number;
  restY: number;
}

/** Platz, den die Bildunterschrift im Intro-Film unten braucht (wie im Runner berechnet) */
function captionReserve(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return size * 2.1 + s.h * 0.05 + Math.max(6, s.u * 1.5);
}

class WoWarEs implements Exercise {
  private stair: Staircase;
  private k = START_OBJECTS;
  private G = 3;
  private round = 0;
  private demoRound = 0;
  private phase: Phase = 'ready';
  private phaseT = 0;
  private objs: Placed[] = [];
  private askedIdx = 0;
  private prevForm = -1;
  private tapped = -1;
  private outcome: Outcome = 'far';
  private lay: Layout | null = null;
  private records: RoundRecord[] = [];
  private points = 0;
  private plannedAsk = false;

  constructor(private readonly ctx: ExerciseContext) {
    const s = Math.round(ctx.startLevel ?? START_OBJECTS);
    const start = clamp(Number.isFinite(s) ? s : START_OBJECTS, START_OBJECTS, MAX_OBJECTS);
    this.stair = new Staircase({ start, min: MIN_OBJECTS, max: MAX_OBJECTS, down: 2, up: 1 });
  }

  private get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  private get rounds(): number {
    return this.ctx.quick ? QUICK_ROUNDS : ROUNDS;
  }

  start(t: number): void {
    this.ctx.hud.setScore(this.demo ? null : 0);
    this.ctx.hud.setProgress(0);
    this.newRound(t);
  }

  // ------------------------------------------------------------------ Runden

  private newRound(t: number): void {
    const { ctx } = this;
    this.k = this.demo ? DEMO_KS[Math.min(this.demoRound, DEMO_KS.length - 1)] : clamp(Math.round(this.stair.level), MIN_OBJECTS, MAX_OBJECTS);
    this.G = gridFor(this.k);
    this.objs = placeObjects(ctx.rng, this.k, this.G);
    this.askedIdx = pickAsked(ctx.rng, this.objs, this.prevForm);
    this.prevForm = this.objs[this.askedIdx].form;
    this.tapped = -1;
    this.phase = 'ready';
    this.phaseT = t;
    this.plannedAsk = false;
    this.lay = this.computeLayout();
    ctx.ghost.clear();
    if (!this.demo) {
      const f = ctx.texts.feedback;
      ctx.hud.setLabel(`${f.round} ${this.round + 1}/${this.rounds} · ${this.k} ${f.objects}`);
      ctx.hud.setProgress(this.round / this.rounds);
    }
  }

  private setPhase(p: Phase, t: number): void {
    this.phase = p;
    this.phaseT = t;
    if (!this.demo) return;
    const c = this.ctx.texts.captions;
    const { hud } = this.ctx;
    if (p === 'show') hud.caption(this.demoRound === 0 ? c.look : c.more);
    else if (p === 'cover') hud.caption(c.hide);
    else if (p === 'ask') hud.caption(c.ask);
    else if (p === 'feedback') hud.caption(c.ok);
  }

  update(_dt: number, t: number): void {
    const { ctx } = this;
    if (this.phase === 'done') return;
    const el = t - this.phaseT;
    switch (this.phase) {
      case 'ready':
        if (el >= READY_MS) this.setPhase('show', t);
        break;
      case 'show':
        if (el >= (this.demo ? DEMO_SHOW_MS : showMs(this.k))) this.setPhase('cover', t);
        break;
      case 'cover':
        if (el >= COVER_MS) this.setPhase('ask', t);
        break;
      case 'ask':
        if (ctx.autoplay && !this.plannedAsk) this.planGhost();
        break;
      case 'feedback': {
        const dur = this.demo ? DEMO_FB_MS : this.outcome === 'exact' ? FB_OK_MS : FB_MISS_MS;
        if (el >= dur) this.afterFeedback(t);
        break;
      }
      default:
        break;
    }
  }

  private afterFeedback(t: number): void {
    const { ctx } = this;
    if (this.demo) {
      this.demoRound++;
      if (this.demoRound >= DEMO_KS.length) {
        this.phase = 'done';
        ctx.hud.caption(null);
        ctx.finish({ primary: { key: 'level', value: 1, unit: 'level', better: 'higher' }, secondary: [], score: 0, level: 1 });
        return;
      }
      this.newRound(t);
      return;
    }
    this.round++;
    if (this.round >= this.rounds) {
      this.finish();
      return;
    }
    this.newRound(t);
  }

  // ------------------------------------------------------------------ Layout

  private computeLayout(): Layout {
    const { w, h, u } = this.ctx.stage;
    const side = Math.max(12, u * 3);
    const top = Math.max(8, u * 2);
    const pillH = Math.max(44, u * 8);
    const bottom = this.demo ? captionReserve(this.ctx.stage) : Math.max(12, u * 3);
    const fieldTop = top + pillH + Math.max(8, u * 2);
    const availW = Math.max(1, w - 2 * side);
    const availH = Math.max(1, h - fieldTop - bottom);
    const G = this.G;
    const boardSide = Math.min(availW, availH, G * MAX_CELL);
    return {
      pillCy: top + pillH / 2,
      pillH,
      gx: (w - boardSide) / 2,
      gy: fieldTop + (availH - boardSide) / 2,
      cell: boardSide / G,
      side: boardSide,
      restX: w - Math.max(18, u * 3.5),
      restY: h * 0.52,
    };
  }

  private cellRect(i: number): { x: number; y: number; s: number; cx: number; cy: number } {
    const L = this.lay!;
    const x = L.gx + (i % this.G) * L.cell;
    const y = L.gy + Math.floor(i / this.G) * L.cell;
    const inset = L.cell * 0.04;
    return { x: x + inset, y: y + inset, s: L.cell - 2 * inset, cx: x + L.cell / 2, cy: y + L.cell / 2 };
  }

  resize(): void {
    if (!this.lay) return;
    this.lay = this.computeLayout();
    if (this.ctx.autoplay) {
      this.ctx.ghost.clear();
      this.plannedAsk = false;
    }
  }

  // ------------------------------------------------------------------ Geister-Hand

  private planGhost(): void {
    const { ghost, rng } = this.ctx;
    this.plannedAsk = true;
    const N = this.G * this.G;
    const correct = this.objs[this.askedIdx].cell;
    let target = correct;
    if (this.demo) {
      const r = this.cellRect(target);
      ghost.tap(r.cx, r.cy, { delay: 1300, move: 700 });
      ghost.moveTo(this.lay!.restX, this.lay!.restY, { delay: 500, move: 600 });
      return;
    }
    // Spielmodus (nur Tests): meist richtig, mit mehr Symbolen öfter daneben (oft in die Nachbarzelle)
    const pOk = clamp(0.95 - 0.07 * (this.k - 2), 0.3, 0.95);
    if (!rng.chance(pOk)) {
      const near: number[] = [];
      for (let c = 0; c < N; c++) if (c !== correct && classify(c, correct, this.G) === 'near') near.push(c);
      const far: number[] = [];
      for (let c = 0; c < N; c++) if (c !== correct) far.push(c);
      target = near.length && rng.chance(0.5) ? rng.pick(near) : rng.pick(far);
    }
    const r = this.cellRect(target);
    ghost.tap(r.cx + rng.range(-0.15, 0.15) * r.s, r.cy + rng.range(-0.15, 0.15) * r.s, { delay: rng.range(900, 2200), move: 450 });
  }

  // ------------------------------------------------------------------ Eingabe

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'ask' || !this.lay) return;
    if (p.t - this.phaseT < ASK_LOCK_MS) return; // Reste vom vorigen Tippen ignorieren
    const L = this.lay;
    const col = Math.floor((p.x - L.gx) / L.cell);
    const row = Math.floor((p.y - L.gy) / L.cell);
    if (col < 0 || row < 0 || col >= this.G || row >= this.G) return;
    this.onTap(row * this.G + col, p.t);
  }

  private onTap(cell: number, t: number): void {
    const { ctx } = this;
    const correct = this.objs[this.askedIdx].cell;
    const oc = classify(cell, correct, this.G);
    this.tapped = cell;
    this.outcome = oc;
    ctx.ghost.clear();
    if (!this.demo) {
      this.records.push({ k: this.k, outcome: oc, errPct: errorPct(cell, correct, this.G), swap: isSwap(cell, this.objs, this.askedIdx) });
      this.stair.update(oc === 'exact');
      this.points += oc === 'exact' ? 10 * this.k : oc === 'near' ? 3 * this.k : 0;
      ctx.hud.setScore(this.points);
    }
    const f = ctx.texts.feedback;
    if (oc === 'exact') {
      ctx.sfx.good();
      ctx.hud.toast(f.right, 'good', { y: this.lay!.pillCy, ms: FB_OK_MS });
    } else {
      ctx.sfx.bad();
      ctx.hud.toast(oc === 'near' ? f.near : f.wrong, 'info', { y: this.lay!.pillCy, ms: 1300 });
    }
    this.setPhase('feedback', t);
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    if (!this.lay) return;
    this.drawPill(g);
    this.drawBoard(g, t);
  }

  private drawPill(g: CanvasRenderingContext2D): void {
    const L = this.lay!;
    const { w } = this.ctx.stage;
    const f = this.ctx.texts.feedback;
    const H = L.pillH;
    const asking = this.phase === 'ask' || this.phase === 'feedback';
    const label = asking ? f.ask : this.phase === 'cover' ? f.covered : f.memorize;
    const px = Math.round(H * 0.36);
    g.save();
    g.font = font(px, 700);
    const tw = g.measureText(label).width;
    g.restore();
    const box = H * 0.66;
    const pw = H * 0.5 + (asking ? box + H * 0.25 : 0) + tw + H * 0.5;
    const x0 = w / 2 - pw / 2;
    fillRR(g, x0, L.pillCy - H / 2, pw, H, H / 2, 'rgba(255,255,255,0.10)');
    g.save();
    rrPath(g, x0 + 0.75, L.pillCy - H / 2 + 0.75, pw - 1.5, H - 1.5, H / 2);
    g.strokeStyle = 'rgba(255,255,255,0.24)';
    g.lineWidth = 1.5;
    g.stroke();
    g.restore();
    let tx = x0 + H * 0.5;
    if (asking) {
      const o = this.objs[this.askedIdx];
      drawForm(g, o.form, tx + box / 2, L.pillCy, box * 0.42, FORM_COLORS[o.form]);
      tx += box + H * 0.25;
    }
    text(g, label, tx, L.pillCy + 1, px, C.white, { align: 'left', weight: 700 });
  }

  private drawBoard(g: CanvasRenderingContext2D, t: number): void {
    const L = this.lay!;
    const still = this.ctx.reducedMotion;
    const N = this.G * this.G;
    const el = t - this.phaseT;
    const r = L.cell * 0.14;
    const lw = Math.max(2, L.cell * 0.04);
    // Zellen
    for (let i = 0; i < N; i++) {
      const q = this.cellRect(i);
      fillRR(g, q.x, q.y, q.s, q.s, r, 'rgba(255,255,255,0.075)');
    }
    const correctCell = this.objs[this.askedIdx].cell;
    const fbk = this.phase === 'feedback';
    // Symbole
    let alpha = 0;
    if (this.phase === 'show') alpha = still ? 1 : easeOut(clamp(el / FADE_IN_MS, 0, 1));
    else if (this.phase === 'cover') alpha = still ? 0 : 1 - easeOut(clamp(el / FADE_OUT_MS, 0, 1));
    if (alpha > 0.01) {
      g.save();
      g.globalAlpha = alpha;
      for (const o of this.objs) {
        const q = this.cellRect(o.cell);
        drawForm(g, o.form, q.cx, q.cy, q.s * 0.3, FORM_COLORS[o.form]);
      }
      g.restore();
    }
    if (!fbk) return;
    // Rückmeldung: richtiges Feld, getipptes Feld, übrige Symbole blass
    const asked = this.objs[this.askedIdx];
    g.save();
    g.globalAlpha = 0.3;
    for (let i = 0; i < this.objs.length; i++) {
      if (i === this.askedIdx) continue;
      const q = this.cellRect(this.objs[i].cell);
      drawForm(g, this.objs[i].form, q.cx, q.cy, q.s * 0.26, FORM_COLORS[this.objs[i].form]);
    }
    g.restore();
    const cq = this.cellRect(correctCell);
    const ok = this.outcome === 'exact';
    if (!ok && this.tapped >= 0) {
      const tq = this.cellRect(this.tapped);
      g.save();
      g.setLineDash([lw * 2, lw * 2.4]);
      g.strokeStyle = 'rgba(255,255,255,0.55)';
      g.lineWidth = lw;
      g.lineCap = 'round';
      g.beginPath();
      g.moveTo(tq.cx, tq.cy);
      g.lineTo(cq.cx, cq.cy);
      g.stroke();
      g.restore();
      rrPath(g, tq.x + lw / 2, tq.y + lw / 2, tq.s - lw, tq.s - lw, r);
      g.save();
      g.strokeStyle = C.warn;
      g.lineWidth = lw * 1.3;
      g.stroke();
      g.restore();
      text(g, '✗', tq.cx, tq.cy + tq.s * 0.02, tq.s * 0.42, C.warn, { weight: 800 });
    }
    rrPath(g, cq.x + lw / 2, cq.y + lw / 2, cq.s - lw, cq.s - lw, r);
    g.save();
    g.strokeStyle = C.good;
    g.lineWidth = lw * 1.5;
    g.stroke();
    g.restore();
    drawForm(g, asked.form, cq.cx, cq.cy, cq.s * 0.3, FORM_COLORS[asked.form]);
    const badge = cq.s * 0.17;
    circle(g, cq.x + cq.s - badge * 1.1, cq.y + badge * 1.1, badge, withAlpha('#0B1424', 0.85));
    text(g, '✓', cq.x + cq.s - badge * 1.1, cq.y + badge * 1.1 + 1, badge * 1.4, C.good, { weight: 800 });
  }

  // ------------------------------------------------------------------ Ergebnis

  private finish(): void {
    const { ctx } = this;
    this.phase = 'done';
    ctx.ghost.clear();
    const sum = summarize(this.records);
    let tip = 'great';
    if (sum.swaps >= 2) tip = 'swap';
    else if (sum.near >= 3) tip = 'near';
    else if (sum.exact <= sum.rounds / 3) tip = 'anchor';
    ctx.sfx.done();
    ctx.finish({
      primary: { key: 'level', value: sum.mastered, unit: 'level', better: 'higher' },
      secondary: [
        { key: 'correct', value: sum.exact, unit: 'count' },
        { key: 'error', value: Math.round(sum.meanErrPct * 10) / 10, unit: 'percent' },
        { key: 'swaps', value: sum.swaps, unit: 'count' },
      ],
      score: this.points,
      level: Math.max(START_OBJECTS, nextStartLevel(sum.mastered, MIN_OBJECTS, MAX_OBJECTS, 1)),
      tip,
    });
  }
}

export const woWarEs: ExerciseDefinition = {
  id: 'wo-war-es',
  category: 'gedaechtnis',
  minutes: 2,
  color: ACCENT,
  showsLevel: true,
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="2.6"><rect x="6" y="6" width="16" height="16" rx="3"/><rect x="26" y="6" width="16" height="16" rx="3"/><rect x="6" y="26" width="16" height="16" rx="3"/></g><rect x="26" y="26" width="16" height="16" rx="3" fill="currentColor" opacity=".25"/><polygon points="34,27.5 35.7,31.65 40.18,31.99 36.76,34.9 37.82,39.26 34,36.9 30.18,39.26 31.24,34.9 27.82,31.99 32.3,31.65" fill="currentColor"/><circle cx="14" cy="14" r="3.6" fill="currentColor"/>',
  texts: { de, it },
  create: (ctx) => new WoWarEs(ctx),
};
