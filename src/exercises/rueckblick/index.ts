/**
 * Rückblick – „Gleich wie vor N Schritten?“ (Prinzip der N-Back-Aufgabe, Katalog 604).
 *
 * Umsetzung nach den Empfehlungen des Katalogs (Abschnitt 10):
 * - Sprachneutrale Formen (Kreis, Quadrat, Dreieck, Stern, Kreuz, Herz, Mond) statt Buchstaben – nur über
 *   den Umriss unterscheidbar, keine Farbe. Weich ein- und ausgeblendet (kein Blitzen), Takt 2 s.
 * - Start bei 1-Back mit Einweisung; ausgewertet in Blöcken zu 20 Reizen (30 % „Gleich“). Nach jedem Block
 *   kündigt eine Karte die neue Regel an (Stufe rauf, runter oder gleich) – jeder Block beginnt mit
 *   neuer Einprägephase (die ersten N Formen, bei denen noch keine Antwort gefragt ist).
 * - Zwei große Tasten „= Gleich“ / „≠ Anders“ (Symbol + Wort, nie nur Farbe); Tastatur: ← / →.
 * - Keine Antwort zählt als Fehler; nur die erste Antwort je Form zählt. Nicht-Treffer schließen die Form von
 *   vor N Schritten aus, ab 2-Back gibt es gezielte Köder (gleich wie vor N−1 / N+1 Schritten).
 * - Stufe: adaptiv über die Blockgenauigkeit (≥ 85 % hoch, < 72 % runter, sonst gleich) mit der Staircase.
 *   Hauptwert = höchste Stufe N mit „geschafftem“ Block (≥ 80 % richtig, ≥ 50 % der Treffer erkannt, höchstens
 *   30 % Fehlalarme) – „immer Anders“ ergäbe nur ≈ 70 % und zählt nicht. Dazu Trefferquote und Fehlalarme.
 * - Sitzung: 3 Blöcke (≈ 2,5 Minuten). Kein Zeitdruck außer dem ruhigen Takt, keine Farb- oder Blitzeffekte.
 */
import { background, button, C, fillRR, font, hit, rrPath, text, withAlpha, type Rect } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeInOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo } from '../../core/types';
import { drawForm } from '../_formen';
import {
  applyVerdict,
  bestPassedN,
  blockPassed,
  blockVerdict,
  expectedAnswer,
  makeBlock,
  MAX_N,
  MIN_N,
  scoreBlock,
  totals,
  type Answer,
  type Block,
  type BlockScore,
  type Verdict,
} from './logic';
import { de, it } from './texts';

const ACCENT = '#2F8F83';
const LIGHT = '#6FD3C4';
const BLOCKS = 3;
const SCORED = 20;
const QUICK_SCORED = 6;
const CADENCE_MS = 2000;
const QUICK_CADENCE_MS = 1100;
const DEMO_CADENCE_MS = 1500;
const LEAD_MS = 900;
const MARK_MS = 700;
/** Formen, die im Rückblick vorkommen (Indizes in _formen.ts): Kreis, Quadrat, Dreieck, Stern, Kreuz, Herz, Mond */
const SHAPE_IDS = [0, 2, 3, 5, 6, 8, 9] as const;

/** Film: 1-Back mit fünf Antworten – Anders, Gleich, Anders, Anders, Gleich */
const DEMO_STIMULI = [0, 1, 1, 2, 0, 0];

type Phase = 'intro' | 'lead' | 'stream' | 'done';
type IntroKind = 'first' | 'up' | 'down' | 'same';

interface Layout {
  pillCy: number;
  pillH: number;
  plate: { cx: number; cy: number; s: number };
  same: Rect;
  diff: Rect;
  go: Rect;
  qY: number;
  qSize: number;
  introTop: number;
  introBottom: number;
}

/** Platz, den die Bildunterschrift im Intro-Film unten braucht (wie im Runner berechnet) */
function captionReserve(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return size * 2.1 + s.h * 0.05 + Math.max(6, s.u * 1.5);
}

function fill(s: string, n: number): string {
  return s.replace('{n}', String(n));
}

class Rueckblick implements Exercise {
  private n = MIN_N;
  private stair: Staircase;
  private block: Block = { n: 1, stimuli: [], target: [], scored: 0 };
  private answers: Answer[] = [];
  private results: Array<{ n: number; score: BlockScore }> = [];
  private blockIdx = 0;
  private phase: Phase = 'intro';
  private streamT0 = 0;
  private doneAt = 0;
  private lay: Layout | null = null;
  private fb: { k: number; ok: boolean; t: number } | null = null;
  private points = 0;
  private introKind: IntroKind = 'first';
  private lastScore: BlockScore | null = null;
  private plannedFor = -1;
  private introPlanned = false;

  constructor(private readonly ctx: ExerciseContext) {
    const s = Math.round(ctx.startLevel ?? MIN_N);
    const start = clamp(Number.isFinite(s) ? s : MIN_N, MIN_N, MAX_N);
    this.n = this.demo ? 1 : start;
    this.stair = new Staircase({ start: this.n, min: MIN_N, max: MAX_N, down: 1, up: 1, initialBoost: 1 });
  }

  private get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  private get cad(): number {
    if (this.demo) return DEMO_CADENCE_MS;
    return this.ctx.quick ? QUICK_CADENCE_MS : CADENCE_MS;
  }

  private get blocksTotal(): number {
    return this.ctx.quick ? 1 : BLOCKS;
  }

  private get scoredPerBlock(): number {
    return this.ctx.quick ? QUICK_SCORED : SCORED;
  }

  start(t: number): void {
    this.lay = this.computeLayout();
    this.ctx.hud.setScore(this.demo ? null : 0);
    this.ctx.hud.setProgress(0);
    if (this.demo) this.beginBlock(t);
    else this.showIntro();
  }

  // ------------------------------------------------------------------ Layout

  private computeLayout(): Layout {
    const { w, h, u } = this.ctx.stage;
    const side = Math.max(12, u * 3);
    const top = Math.max(8, u * 2);
    const pillH = Math.max(40, u * 7.5);
    const bottom = this.demo ? captionReserve(this.ctx.stage) : Math.max(14, u * 3);
    const btnH = Math.max(64, u * 13);
    const gap = Math.max(10, u * 3);
    const btnW = clamp((w - 2 * side - gap) / 2, 110, u * 46);
    const btnY = h - bottom - btnH;
    const goW = clamp(w - 2 * side, 160, u * 50);
    const qSize = clamp(u * 3.6, 14, 26);
    const qY = btnY - gap - qSize * 0.7;
    const y0 = top + pillH + gap;
    const y1 = qY - qSize - gap * 0.6;
    const availH = Math.max(60, y1 - y0);
    const s = Math.max(60, Math.min(availH, w - 2 * side, u * 52));
    return {
      pillCy: top + pillH / 2,
      pillH,
      plate: { cx: w / 2, cy: y0 + availH / 2, s },
      same: { x: w / 2 - gap / 2 - btnW, y: btnY, w: btnW, h: btnH },
      diff: { x: w / 2 + gap / 2, y: btnY, w: btnW, h: btnH },
      go: { x: (w - goW) / 2, y: btnY, w: goW, h: btnH },
      qY,
      qSize,
      introTop: top + pillH + gap,
      introBottom: btnY - gap,
    };
  }

  resize(): void {
    this.lay = this.computeLayout();
    if (this.ctx.autoplay) {
      this.ctx.ghost.clear();
      this.plannedFor = -1;
      this.introPlanned = false;
    }
  }

  // ------------------------------------------------------------------ Ablauf

  private showIntro(): void {
    this.phase = 'intro';
    this.introPlanned = false;
    this.ctx.hud.setLabel(this.blockLabel());
  }

  private blockLabel(): string {
    const f = this.ctx.texts.feedback;
    return `${this.backText(this.n)} · ${f.block} ${Math.min(this.blockIdx + 1, this.blocksTotal)}/${this.blocksTotal}`;
  }

  private backText(n: number): string {
    const f = this.ctx.texts.feedback;
    return n === 1 ? f.back1 : fill(f.backN, n);
  }

  private beginBlock(t: number): void {
    const { ctx } = this;
    if (this.demo) {
      const target = DEMO_STIMULI.map((s, i) => i >= 1 && s === DEMO_STIMULI[i - 1]);
      this.block = { n: 1, stimuli: DEMO_STIMULI.slice(), target, scored: DEMO_STIMULI.length - 1 };
      this.n = 1;
    } else {
      this.block = makeBlock(ctx.rng, this.n, this.scoredPerBlock);
    }
    this.answers = new Array<Answer>(this.block.stimuli.length).fill(null);
    this.fb = null;
    this.phase = 'lead';
    this.streamT0 = t + LEAD_MS;
    this.plannedFor = -1;
    ctx.ghost.clear();
    if (!this.demo) ctx.hud.setLabel(this.blockLabel());
  }

  update(_dt: number, t: number): void {
    const { ctx } = this;
    if (this.phase === 'done') {
      if (this.demo && t >= this.doneAt) {
        this.doneAt = Infinity;
        ctx.finish({ primary: { key: 'level', value: 1, unit: 'level', better: 'higher' }, secondary: [], score: 0, level: 1 });
      }
      return;
    }
    if (this.phase === 'intro') {
      if (ctx.autoplay && !this.introPlanned && this.lay) {
        this.introPlanned = true;
        const c = this.center(this.lay.go);
        ctx.ghost.tap(c.x, c.y, { delay: 900, move: 500 });
      }
      return;
    }
    if (this.phase === 'lead') {
      if (t >= this.streamT0) this.phase = 'stream';
      else return;
    }
    // phase === 'stream'
    const len = this.block.stimuli.length;
    const idx = Math.floor((t - this.streamT0) / this.cad);
    if (!this.demo) {
      const frac = (this.blockIdx + clamp(idx / len, 0, 1)) / this.blocksTotal;
      ctx.hud.setProgress(Math.min(1, frac));
    }
    if (idx >= len) {
      this.endBlock(t);
      return;
    }
    if (idx !== this.plannedFor) {
      this.plannedFor = idx;
      if (this.demo) this.demoCaption(idx);
      if (ctx.autoplay) this.planGhost(idx);
    }
  }

  private demoCaption(idx: number): void {
    const c = this.ctx.texts.captions;
    const { hud } = this.ctx;
    if (idx === 0) hud.caption(c.shapes);
    else if (idx === 1) hud.caption(c.compare);
    else if (idx === 2) hud.caption(c.same);
    else if (idx === 3) hud.caption(c.diff);
    else if (idx === 4) hud.caption(c.later);
  }

  private center(r: Rect): { x: number; y: number } {
    return { x: r.x + r.w / 2, y: r.y + r.h * 0.52 };
  }

  private planGhost(idx: number): void {
    const { ghost, rng } = this.ctx;
    const L = this.lay;
    const exp = expectedAnswer(this.block, idx);
    if (!L || !exp) return;
    const cad = this.cad;
    let ans: 'same' | 'diff' | null = exp;
    let delay: number;
    let move: number;
    if (this.demo) {
      delay = cad * 0.3;
      move = cad * 0.3;
    } else {
      // Spielmodus (nur Tests): meist richtig, mit höherer Stufe öfter falsch, selten keine Antwort
      const pOk = clamp(0.92 - 0.1 * (this.n - 1), 0.6, 0.92);
      if (rng.chance(0.04)) ans = null;
      else if (!rng.chance(pOk)) ans = exp === 'same' ? 'diff' : 'same';
      delay = rng.range(0.22, 0.5) * cad;
      move = cad * 0.18;
    }
    if (!ans) return;
    const c = this.center(ans === 'same' ? L.same : L.diff);
    ghost.tap(c.x, c.y, { delay, move });
  }

  private endBlock(t: number): void {
    const { ctx } = this;
    this.phase = 'done';
    ctx.ghost.clear();
    if (this.demo) {
      ctx.hud.caption(null);
      this.doneAt = t + 700;
      return;
    }
    const score = scoreBlock(this.block, this.answers);
    this.results.push({ n: this.n, score });
    this.lastScore = score;
    const verdict: Verdict = blockVerdict(score);
    const prevN = this.n;
    const { n } = applyVerdict(this.stair, verdict);
    this.n = n;
    this.introKind = n > prevN ? 'up' : n < prevN ? 'down' : 'same';
    this.blockIdx++;
    if (this.blockIdx >= this.blocksTotal) {
      this.finish();
      return;
    }
    this.showIntro();
  }

  // ------------------------------------------------------------------ Eingabe

  keyDown(key: string, t: number): void {
    if (this.phase === 'intro') {
      if (key === 'Enter' || key === ' ') this.beginBlock(t);
      return;
    }
    if (key === 'ArrowLeft' || key === '1') this.answer('same', t);
    else if (key === 'ArrowRight' || key === '2') this.answer('diff', t);
  }

  pointerDown(p: PointerInfo): void {
    const L = this.lay;
    if (!L) return;
    if (this.phase === 'intro') {
      if (hit(L.go, p.x, p.y, 8)) {
        this.ctx.sfx.tap();
        this.beginBlock(p.t);
      }
      return;
    }
    if (this.phase !== 'stream') return;
    if (hit(L.same, p.x, p.y, 6)) this.answer('same', p.t);
    else if (hit(L.diff, p.x, p.y, 6)) this.answer('diff', p.t);
  }

  private answer(a: 'same' | 'diff', t: number): void {
    if (this.phase !== 'stream') return;
    const k = Math.floor((t - this.streamT0) / this.cad);
    if (k < this.block.n || k >= this.block.stimuli.length) return; // Einprägephase bzw. außerhalb
    if (this.answers[k] !== null) return; // nur die erste Antwort je Form zählt
    this.answers[k] = a;
    const ok = expectedAnswer(this.block, k) === a;
    this.fb = { k, ok, t };
    const { ctx } = this;
    if (ok) ctx.sfx.good();
    else ctx.sfx.bad();
    if (!this.demo && ok) {
      this.points += 10 + 4 * this.n;
      ctx.hud.setScore(this.points);
    }
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    const L = this.lay;
    if (!L) return;
    this.drawPill(g, L);
    if (this.phase === 'intro') {
      this.drawIntro(g, L);
      return;
    }
    this.drawStream(g, L, t);
  }

  private drawPill(g: CanvasRenderingContext2D, L: Layout): void {
    const { w } = this.ctx.stage;
    const label = this.backText(this.n);
    const px = Math.round(L.pillH * 0.42);
    g.save();
    g.font = font(px, 800);
    const tw = g.measureText(label).width;
    g.restore();
    const pw = tw + L.pillH * 1.0;
    const x0 = w / 2 - pw / 2;
    fillRR(g, x0, L.pillCy - L.pillH / 2, pw, L.pillH, L.pillH / 2, 'rgba(255,255,255,0.10)');
    g.save();
    rrPath(g, x0 + 0.75, L.pillCy - L.pillH / 2 + 0.75, pw - 1.5, L.pillH - 1.5, L.pillH / 2);
    g.strokeStyle = withAlpha(LIGHT, 0.55);
    g.lineWidth = 1.5;
    g.stroke();
    g.restore();
    text(g, label, w / 2, L.pillCy + 1, px, C.white, { weight: 800 });
  }

  private drawStream(g: CanvasRenderingContext2D, L: Layout, t: number): void {
    const { w } = this.ctx.stage;
    const f = this.ctx.texts.feedback;
    const cad = this.cad;
    const k = this.phase === 'stream' ? Math.floor((t - this.streamT0) / cad) : -1;
    const learning = k < this.block.n;
    const { cx, cy, s } = L.plate;
    // Platte
    fillRR(g, cx - s / 2, cy - s / 2, s, s, s * 0.12, 'rgba(255,255,255,0.055)');
    g.save();
    rrPath(g, cx - s / 2 + 0.75, cy - s / 2 + 0.75, s - 1.5, s - 1.5, s * 0.12);
    g.strokeStyle = 'rgba(255,255,255,0.16)';
    g.lineWidth = 1.5;
    g.stroke();
    g.restore();
    // Reiz: weich ein- und ausblenden
    if (k >= 0 && k < this.block.stimuli.length) {
      const tau = t - (this.streamT0 + k * cad);
      const fin = Math.min(260, cad * 0.14);
      const fout = Math.min(320, cad * 0.17);
      const vis = cad * 0.86;
      const a = easeInOut(tau / fin) * (1 - easeInOut((tau - (vis - fout)) / fout));
      if (a > 0.01) {
        g.save();
        g.globalAlpha = clamp(a, 0, 1);
        drawForm(g, SHAPE_IDS[this.block.stimuli[k] % SHAPE_IDS.length], cx, cy, s * 0.3, C.fg);
        g.restore();
      }
    }
    // Rückmeldung (Zeichen, nicht nur Farbe)
    if (this.fb && this.fb.k === k) {
      const age = t - this.fb.t;
      if (age >= 0 && age < MARK_MS) {
        const al = 1 - clamp((age - MARK_MS * 0.6) / (MARK_MS * 0.4), 0, 1);
        text(g, this.fb.ok ? '✓' : '✗', cx + s * 0.36, cy - s * 0.36, s * 0.2, this.fb.ok ? C.good : C.warn, { weight: 800, alpha: al });
      }
    }
    // Frage bzw. Hinweis
    if (this.phase !== 'done') {
      const q = learning ? (this.block.n === 1 ? f.memorize1 : f.memorizeN) : this.block.n === 1 ? f.q1 : fill(f.qN, this.block.n);
      text(g, q, w / 2, L.qY, L.qSize, learning ? C.light : C.fg, { weight: 700 });
    }
    // Tasten
    const active = this.phase === 'stream' && !learning && k >= 0;
    const chosen = this.answers[k] ?? null;
    const st = (which: 'same' | 'diff') => (!active ? 'disabled' : chosen === which ? 'active' : 'normal');
    this.drawButton(g, L.same, st('same'), '=', f.same);
    this.drawButton(g, L.diff, st('diff'), '≠', f.diff);
  }

  private drawButton(g: CanvasRenderingContext2D, r: Rect, state: 'normal' | 'active' | 'disabled', glyph: string, label: string): void {
    button(g, r, state);
    const px = clamp(r.h * 0.34, 18, 30);
    const col = state === 'disabled' ? C.faint : C.white;
    g.save();
    g.font = font(px, 800);
    const lw = g.measureText(label).width;
    const gw = px * 1.3;
    g.restore();
    const x0 = r.x + r.w / 2 - (gw + lw) / 2;
    text(g, glyph, x0 + gw / 2, r.y + r.h / 2 + 1, px * 1.35, col, { weight: 800 });
    text(g, label, x0 + gw, r.y + r.h / 2 + 1, px, col, { weight: 800, align: 'left' });
  }

  private wrap(g: CanvasRenderingContext2D, s: string, maxW: number, px: number, weight = 700): string[] {
    g.save();
    g.font = font(px, weight);
    const words = s.split(' ');
    const lines: string[] = [];
    let cur = '';
    for (const wd of words) {
      const next = cur ? `${cur} ${wd}` : wd;
      if (cur && g.measureText(next).width > maxW) {
        lines.push(cur);
        cur = wd;
      } else cur = next;
    }
    if (cur) lines.push(cur);
    g.restore();
    return lines;
  }

  private drawIntro(g: CanvasRenderingContext2D, L: Layout): void {
    const { w, u } = this.ctx.stage;
    const f = this.ctx.texts.feedback;
    const n = this.n;
    const maxW = Math.min(w - 2 * Math.max(16, u * 4), u * 70);
    const tSize = clamp(u * 3.8, 15, 26);
    const hSize = clamp(u * 6, 22, 40);
    let y = L.introTop + hSize * 0.6;
    const kindText =
      this.introKind === 'first' ? f.introFirst : this.introKind === 'up' ? f.introUp : this.introKind === 'down' ? f.introDown : f.introSame;
    if (this.lastScore) {
      text(g, f.lastBlock.replace('{c}', String(this.lastScore.correct)).replace('{t}', String(this.lastScore.trials)), w / 2, y, tSize, C.dim, { weight: 700 });
      y += tSize * 1.5;
    }
    text(g, kindText, w / 2, y, tSize, C.light, { weight: 800 });
    y += hSize * 1.15;
    text(g, this.backText(n), w / 2, y, hSize, C.white, { weight: 800 });
    y += hSize * 0.9;
    // Skizze: Form vor N Schritten = aktuelle Form
    const availDiag = Math.max(40, L.introBottom - y - tSize * 4.2);
    const ps = clamp(Math.min(availDiag * 0.6, (maxW / (n + 1)) * 0.72, u * 11), 26, 56);
    this.drawDiagram(g, w / 2, y + ps * 0.95, n, ps, maxW);
    y += ps * 2.15;
    const lines = this.wrap(g, n === 1 ? f.rule1 : fill(f.ruleN, n), maxW, tSize);
    for (const ln of lines) {
      text(g, ln, w / 2, y, tSize, C.fg, { weight: 700 });
      y += tSize * 1.35;
    }
    if (L.introBottom - y > tSize * 1.4) text(g, f.answerAll, w / 2, y + tSize * 0.2, tSize * 0.85, C.dim, { weight: 600 });
    // Start-Taste
    button(g, L.go, 'normal');
    const px = clamp(L.go.h * 0.36, 20, 32);
    text(g, f.go, L.go.x + L.go.w / 2, L.go.y + L.go.h / 2 + 1, px, C.white, { weight: 800 });
  }

  /** n + 1 kleine Platten: die erste und die letzte Form sind gleich (Bogen mit „=“) */
  private drawDiagram(g: CanvasRenderingContext2D, cx: number, cy: number, n: number, ps: number, maxW: number): void {
    const count = n + 1;
    const gap = Math.min(ps * 0.45, (maxW - count * ps) / Math.max(1, count - 1));
    const total = count * ps + (count - 1) * Math.max(6, gap);
    const step = ps + Math.max(6, gap);
    const x0 = cx - total / 2 + ps / 2;
    const others = [1, 2, 4, 0];
    for (let i = 0; i < count; i++) {
      const x = x0 + i * step;
      const isEnds = i === 0 || i === n;
      fillRR(g, x - ps / 2, cy - ps / 2, ps, ps, ps * 0.14, isEnds ? 'rgba(255,255,255,0.13)' : 'rgba(255,255,255,0.06)');
      if (isEnds) {
        g.save();
        rrPath(g, x - ps / 2 + 1, cy - ps / 2 + 1, ps - 2, ps - 2, ps * 0.14);
        g.strokeStyle = withAlpha(LIGHT, 0.8);
        g.lineWidth = 2;
        g.stroke();
        g.restore();
      }
      const id = isEnds ? 3 : others[(i - 1) % others.length];
      drawForm(g, SHAPE_IDS[id], x, cy, ps * 0.3, C.fg);
    }
    // Bogen über die Platten
    const xa = x0;
    const xb = x0 + n * step;
    const ya = cy - ps / 2 - 4;
    const lift = Math.max(10, ps * 0.5);
    g.save();
    g.strokeStyle = withAlpha(LIGHT, 0.9);
    g.lineWidth = 2.5;
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(xa, ya);
    g.quadraticCurveTo((xa + xb) / 2, ya - lift * 1.6, xb, ya);
    g.stroke();
    g.restore();
    text(g, '=', (xa + xb) / 2, ya - lift * 0.95, Math.max(16, ps * 0.5), C.white, { weight: 800 });
  }

  // ------------------------------------------------------------------ Ergebnis

  private finish(): void {
    const { ctx } = this;
    this.phase = 'done';
    this.doneAt = Infinity;
    ctx.ghost.clear();
    const best = bestPassedN(this.results);
    const tt = totals(this.results);
    let tip = 'great';
    if (tt.omissions >= 4) tip = 'omit';
    else if (tt.faRate > 0.3) tip = 'fa';
    else if (tt.hitRate < 0.5) tip = 'miss';
    else if (!this.results.some((r) => blockPassed(r.score))) tip = 'miss';
    ctx.sfx.done();
    ctx.finish({
      primary: { key: 'level', value: best, unit: 'level', better: 'higher' },
      secondary: [
        { key: 'hitRate', value: Math.round(tt.hitRate * 100), unit: 'percent' },
        { key: 'falseAlarms', value: tt.falseAlarms, unit: 'count' },
        { key: 'accuracy', value: Math.round(tt.accuracy * 100), unit: 'percent' },
      ],
      score: this.points,
      level: nextStartLevel(best, MIN_N, MAX_N, 1),
      tip,
    });
  }
}

export const rueckblick: ExerciseDefinition = {
  id: 'rueckblick',
  category: 'gedaechtnis',
  minutes: 3,
  color: ACCENT,
  showsLevel: true,
  icon:
    '<circle cx="9" cy="32" r="5" fill="currentColor" opacity=".55"/><rect x="19" y="27" width="10" height="10" rx="2" fill="currentColor" opacity=".55"/><polygon points="39,24.5 40.94,29.33 46.13,29.68 42.14,33.02 43.41,38.07 39,35.3 34.59,38.07 35.86,33.02 31.87,29.68 37.06,29.33" fill="currentColor"/><path d="M38 20C33 7 15 7 10 18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="m5.5 14 4.6 5 5.2-3.6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
  texts: { de, it },
  create: (ctx) => new Rueckblick(ctx),
};
