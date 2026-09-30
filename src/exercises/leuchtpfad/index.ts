/**
 * Leuchtpfad – leuchtende Blöcke der Reihe nach nachtippen (Corsi-artig, Katalog 607).
 *
 * Umsetzung nach den Empfehlungen des Katalogs (Abschnitt 10):
 * - Ehrlicher Name, kein „Test“: 9 Blöcke an festen, unregelmäßigen Positionen (wie beim Corsi-Klötzchen-Tippen,
 *   aber ohne Normwerte). Die Folge springt frei zwischen den Blöcken; jeder Block höchstens einmal je Folge.
 * - Darbietung: jeder Block leuchtet ca. 0,8 s weich auf (Helligkeit + dicker Rand + heller Punkt in der Mitte,
 *   nicht nur Farbe), danach 0,25 s Pause – höchstens etwa 1 Aufleuchten pro Sekunde, kein Blitzen.
 * - Eingabe: Tippen in derselben Reihenfolge, kein Zeitlimit. Trefferfläche ≥ 26 px Radius, Doppelkontakte
 *   auf demselben Block (< 250 ms) werden ignoriert. Rückmeldung mit Zeichen (✗, Haken), kein rotes Aufblitzen.
 * - Stufe: Erfolg → eine Stelle länger, Fehler → eine Stelle kürzer (Staircase 1-down/1-up); der zweite Fehler
 *   beendet die Runde. Start bei 2 (oder eine unter der letzten Spanne). Hauptwert = längste richtig nachgetippte Folge.
 * - Ab Spanne 5 wird eine freiwillige Bonusrunde „rückwärts“ angeboten (von hinten nach vorn tippen, bis 7 Blöcke);
 *   ihr Wert erscheint als Zusatzwert und fließt nicht in den Hauptwert.
 */
import { background, button, C, fillRR, font, glow, hit, rrPath, text, withAlpha, type Rect } from '../../core/draw';
import { nextStartLevel } from '../../core/staircase';
import { clamp, easeInOut, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo } from '../../core/types';
import {
  BACKWARD_FROM,
  expectedAt,
  makeSequence,
  MAX_STRIKES,
  nearestBlock,
  POSITIONS,
  SpanRun,
  START_LEN,
} from './logic';
import { de, it } from './texts';

const ACCENT = '#2F8F83';
const LIGHT = '#6FD3C4';
const LIT_MS = 800;
const GAP_MS = 250;
const READY_MS = 900;
const TAP_FLASH_MS = 380;
const FB_OK_MS = 1000;
const FB_BAD_MS = 1400;
const DOUBLE_MS = 250;
const QUICK_ATTEMPTS = 3;
const DEMO_LEN = 4;
const MIN_HIT = 26;

type Phase = 'ready' | 'show' | 'input' | 'feedback' | 'offer' | 'done';

interface Layout {
  pillCy: number;
  pillH: number;
  pipsY: number;
  gx: number;
  gy: number;
  side: number;
  bs: number;
  hitR: number;
  strikesY: number;
  go: Rect;
  skip: Rect;
  restX: number;
  restY: number;
  introTop: number;
  introBottom: number;
}

/** Platz, den die Bildunterschrift im Intro-Film unten braucht (wie im Runner berechnet) */
function captionReserve(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return size * 2.1 + s.h * 0.05 + Math.max(6, s.u * 1.5);
}

class Leuchtpfad implements Exercise {
  private fwd: SpanRun;
  private back: SpanRun | null = null;
  private run: SpanRun;
  private phase: Phase = 'ready';
  private phaseT = 0;
  private seq: number[] = [];
  private prevSeq: number[] = [];
  private tapIdx = 0;
  private lastTap = { block: -1, t: -1e9 };
  private tapT: number[] = new Array<number>(POSITIONS.length).fill(-1e9);
  private wrongBlock = -1;
  private lastOk = false;
  private lay: Layout | null = null;
  private points = 0;
  private plannedInput = false;
  private offerPlanned = false;
  private backPlayed = false;

  constructor(private readonly ctx: ExerciseContext) {
    const s = Math.round(ctx.startLevel ?? START_LEN);
    const start = clamp(Number.isFinite(s) ? s : START_LEN, START_LEN, 8);
    this.fwd = new SpanRun({ start });
    this.run = this.fwd;
  }

  private get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  private get backward(): boolean {
    return this.run.backward;
  }

  start(t: number): void {
    this.lay = this.computeLayout();
    this.ctx.hud.setScore(this.demo ? null : 0);
    this.ctx.hud.setProgress(0);
    this.newTrial(t);
  }

  // ------------------------------------------------------------------ Ablauf

  private newTrial(t: number): void {
    const { ctx } = this;
    const len = this.demo ? DEMO_LEN : this.run.length;
    this.seq = makeSequence(ctx.rng, len, this.prevSeq);
    this.prevSeq = this.seq;
    this.tapIdx = 0;
    this.wrongBlock = -1;
    this.lastTap = { block: -1, t: -1e9 };
    this.plannedInput = false;
    this.setPhase('ready', t);
    ctx.ghost.clear();
    if (!this.demo) {
      const f = ctx.texts.feedback;
      ctx.hud.setLabel(`${this.backward ? f.backward : f.forward} · ${f.length} ${len}`);
      ctx.hud.setProgress(Math.min(1, this.fwd.best / 9));
    }
  }

  private setPhase(p: Phase, t: number): void {
    this.phase = p;
    this.phaseT = t;
    if (!this.demo) return;
    const c = this.ctx.texts.captions;
    const { hud } = this.ctx;
    if (p === 'show') hud.caption(c.watch);
    else if (p === 'input') hud.caption(c.repeat);
    else if (p === 'feedback') hud.caption(c.ok);
  }

  update(_dt: number, t: number): void {
    const { ctx } = this;
    const el = t - this.phaseT;
    switch (this.phase) {
      case 'ready':
        if (el >= READY_MS) this.setPhase('show', t);
        break;
      case 'show':
        if (el >= this.seq.length * (LIT_MS + GAP_MS)) this.setPhase('input', t);
        break;
      case 'input':
        if (ctx.autoplay && !this.plannedInput) this.planGhost();
        break;
      case 'feedback':
        if (el >= (this.lastOk ? FB_OK_MS : FB_BAD_MS)) this.afterFeedback(t);
        break;
      case 'offer':
        if (ctx.autoplay && !this.offerPlanned && this.lay) {
          this.offerPlanned = true;
          const c = this.center(this.lay.go);
          ctx.ghost.tap(c.x, c.y, { delay: 900, move: 500 });
        }
        break;
      default:
        break;
    }
  }

  private center(r: Rect): { x: number; y: number } {
    return { x: r.x + r.w / 2, y: r.y + r.h * 0.52 };
  }

  private blockCenter(i: number): { x: number; y: number } {
    const L = this.lay!;
    return { x: L.gx + POSITIONS[i].x * L.side, y: L.gy + POSITIONS[i].y * L.side };
  }

  private afterFeedback(t: number): void {
    const { ctx } = this;
    if (this.demo) {
      this.phase = 'done';
      ctx.hud.caption(null);
      ctx.finish({ primary: { key: 'level', value: 1, unit: 'level', better: 'higher' }, secondary: [], score: 0, level: 1 });
      return;
    }
    if (ctx.quick && this.run.attempts >= QUICK_ATTEMPTS) this.run.ended = true;
    if (!this.run.ended) {
      this.newTrial(t);
      return;
    }
    if (!this.backward && !ctx.quick && this.fwd.best >= BACKWARD_FROM) {
      this.phase = 'offer';
      this.offerPlanned = false;
      ctx.hud.setLabel(null);
      return;
    }
    this.finish();
  }

  // ------------------------------------------------------------------ Layout

  private computeLayout(): Layout {
    const { w, h, u } = this.ctx.stage;
    const side = Math.max(12, u * 3);
    const top = Math.max(8, u * 2);
    const pillH = Math.max(40, u * 7.5);
    const pipsH = Math.max(18, u * 3.6);
    const bottom = this.demo ? captionReserve(this.ctx.stage) : Math.max(u * 7, 44);
    const gap = Math.max(8, u * 2);
    const y0 = top + pillH + gap + pipsH + gap * 0.5;
    const availW = Math.max(1, w - 2 * side);
    const availH = Math.max(1, h - y0 - bottom);
    const bside = Math.min(availW, availH, 560);
    const btnH = Math.max(64, u * 13);
    const bgap = Math.max(10, u * 3);
    const btnW = clamp((w - 2 * side - bgap) / 2, 110, u * 46);
    const btnY = h - Math.max(14, u * 3) - btnH;
    return {
      pillCy: top + pillH / 2,
      pillH,
      pipsY: top + pillH + gap + pipsH / 2,
      gx: (w - bside) / 2,
      gy: y0 + (availH - bside) / 2,
      side: bside,
      bs: bside * 0.17,
      hitR: Math.max(MIN_HIT, bside * 0.12),
      strikesY: h - bottom / 2,
      go: { x: w / 2 - bgap / 2 - btnW, y: btnY, w: btnW, h: btnH },
      skip: { x: w / 2 + bgap / 2, y: btnY, w: btnW, h: btnH },
      restX: w - Math.max(18, u * 3.5),
      restY: h * 0.5,
      introTop: top + pillH + gap,
      introBottom: btnY - bgap,
    };
  }

  resize(): void {
    if (!this.lay) return;
    this.lay = this.computeLayout();
    if (this.ctx.autoplay) {
      this.ctx.ghost.clear();
      this.plannedInput = false;
      this.offerPlanned = false;
    }
  }

  // ------------------------------------------------------------------ Geister-Hand

  private planGhost(): void {
    const { ghost, rng } = this.ctx;
    this.plannedInput = true;
    const L = this.seq.length;
    let failAt = -1;
    if (!this.demo) {
      const pOk = clamp(0.95 - 0.09 * (L - 2), 0.3, 0.95);
      if (!rng.chance(pOk)) failAt = rng.int(L);
    }
    for (let i = this.tapIdx; i < L; i++) {
      let b = expectedAt(this.seq, i, this.backward);
      if (i === failAt) {
        const others = POSITIONS.map((_, k) => k).filter((k) => k !== b);
        b = rng.pick(others);
      }
      const c = this.blockCenter(b);
      const first = i === this.tapIdx;
      const delay = this.demo ? (first ? 900 : 450) : first ? 700 : rng.range(350, 650);
      ghost.tap(c.x, c.y, { delay, move: this.demo ? 450 : 350 });
      if (i === failAt) break;
    }
    if (this.demo) ghost.moveTo(this.lay!.restX, this.lay!.restY, { delay: 500, move: 600 });
  }

  // ------------------------------------------------------------------ Eingabe

  pointerDown(p: PointerInfo): void {
    const L = this.lay;
    if (!L) return;
    if (this.phase === 'offer') {
      if (hit(L.go, p.x, p.y, 8)) {
        this.ctx.sfx.tap();
        this.startBackward(p.t);
      } else if (hit(L.skip, p.x, p.y, 8)) {
        this.ctx.sfx.tap();
        this.finish();
      }
      return;
    }
    if (this.phase !== 'input') return;
    const centers = POSITIONS.map((_, i) => this.blockCenter(i));
    const b = nearestBlock(p.x, p.y, centers, L.hitR);
    if (b < 0) return;
    if (b === this.lastTap.block && p.t - this.lastTap.t < DOUBLE_MS) return; // Doppelkontakt
    this.lastTap = { block: b, t: p.t };
    this.onBlock(b, p.t);
  }

  private startBackward(t: number): void {
    this.back = new SpanRun({ backward: true, start: START_LEN });
    this.run = this.back;
    this.backPlayed = true;
    this.prevSeq = [];
    this.newTrial(t);
  }

  private onBlock(b: number, t: number): void {
    const { ctx } = this;
    this.tapT[b] = t;
    const need = expectedAt(this.seq, this.tapIdx, this.backward);
    if (b === need) {
      ctx.sfx.tap();
      this.tapIdx++;
      if (this.tapIdx >= this.seq.length) this.trialDone(true, t);
    } else {
      this.wrongBlock = b;
      this.trialDone(false, t);
    }
  }

  private trialDone(ok: boolean, t: number): void {
    const { ctx } = this;
    const f = ctx.texts.feedback;
    this.lastOk = ok;
    ctx.ghost.clear();
    if (!this.demo) {
      if (ok) this.points += 10 * this.seq.length;
      ctx.hud.setScore(this.points);
      this.run.report(ok);
    }
    if (ok) {
      ctx.sfx.good();
      ctx.hud.toast(f.done, 'good', { y: this.lay!.pillCy, ms: FB_OK_MS });
    } else {
      ctx.sfx.bad();
      ctx.hud.toast(f.wrong, 'info', { y: this.lay!.pillCy, ms: FB_BAD_MS });
    }
    this.setPhase('feedback', t);
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    const L = this.lay;
    if (!L) return;
    this.drawPill(g, L);
    if (this.phase === 'offer') {
      this.drawOffer(g, L);
      return;
    }
    this.drawPips(g, L, t);
    this.drawBlocks(g, L, t);
    if (!this.demo) this.drawStrikes(g, L);
  }

  private statusText(): string {
    const f = this.ctx.texts.feedback;
    if (this.phase === 'feedback') return this.lastOk ? f.done : f.wrong;
    if (this.phase === 'input') return this.backward ? f.yourBack : f.your;
    if (this.phase === 'show') return f.watch;
    return f.ready;
  }

  private drawPill(g: CanvasRenderingContext2D, L: Layout): void {
    const { w } = this.ctx.stage;
    const label = this.phase === 'offer' ? this.ctx.texts.feedback.bonusTitle : this.statusText();
    const px = Math.round(L.pillH * 0.42);
    g.save();
    g.font = font(px, 800);
    const tw = g.measureText(label).width;
    g.restore();
    const pw = tw + L.pillH;
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

  /** Punkte: so viele wie die Folge lang ist; gefüllt = schon gezeigt bzw. getippt */
  private drawPips(g: CanvasRenderingContext2D, L: Layout, t: number): void {
    const { w } = this.ctx.stage;
    const n = this.seq.length;
    if (!n) return;
    let filled = 0;
    if (this.phase === 'show') filled = Math.min(n, Math.floor((t - this.phaseT) / (LIT_MS + GAP_MS)) + 1);
    else if (this.phase === 'input') filled = this.tapIdx;
    else if (this.phase === 'feedback') filled = this.lastOk ? n : this.tapIdx;
    const r = clamp(L.pillH * 0.11, 4, 8);
    const step = r * 3.2;
    const x0 = w / 2 - ((n - 1) * step) / 2;
    for (let i = 0; i < n; i++) {
      const x = x0 + i * step;
      g.save();
      g.beginPath();
      g.arc(x, L.pipsY, r, 0, Math.PI * 2);
      if (i < filled) {
        g.fillStyle = this.phase === 'feedback' && !this.lastOk ? C.warn : LIGHT;
        g.fill();
      } else {
        g.strokeStyle = 'rgba(255,255,255,0.4)';
        g.lineWidth = 2;
        g.stroke();
      }
      g.restore();
    }
  }

  private drawBlocks(g: CanvasRenderingContext2D, L: Layout, t: number): void {
    const still = this.ctx.reducedMotion;
    // Welcher Block leuchtet gerade (Darbietung)?
    let litBlock = -1;
    let litA = 0;
    if (this.phase === 'show') {
      const cyc = LIT_MS + GAP_MS;
      const el = t - this.phaseT;
      const i = Math.floor(el / cyc);
      const tau = el - i * cyc;
      if (i >= 0 && i < this.seq.length && tau <= LIT_MS) {
        litBlock = this.seq[i];
        litA = Math.min(easeInOut(tau / 170), easeInOut((LIT_MS - tau) / 230));
      }
    }
    const lw = Math.max(2, L.bs * 0.05);
    for (let i = 0; i < POSITIONS.length; i++) {
      const c = this.blockCenter(i);
      const lit = i === litBlock ? litA : 0;
      const tap = clamp(1 - (t - this.tapT[i]) / TAP_FLASH_MS, 0, 1);
      const wrong = i === this.wrongBlock && (this.phase === 'feedback' || this.phase === 'input');
      const s = L.bs * (1 + (still ? 0 : 0.1) * lit);
      const x = c.x - s / 2;
      const y = c.y - s / 2;
      const rad = s * 0.18;
      if (lit > 0.02) glow(g, c.x, c.y, s * 0.6, C.light, lit);
      fillRR(g, x, y, s, s, rad, 'rgba(255,255,255,0.10)');
      if (lit > 0.01) fillRR(g, x, y, s, s, rad, withAlpha(C.light, 0.25 + 0.7 * lit));
      if (tap > 0.01 && !wrong) fillRR(g, x, y, s, s, rad, withAlpha(LIGHT, 0.55 * tap));
      g.save();
      rrPath(g, x + lw / 2, y + lw / 2, s - lw, s - lw, rad);
      g.strokeStyle = lit > 0.01 ? withAlpha('#FFFFFF', 0.4 + 0.6 * lit) : tap > 0.01 ? withAlpha(LIGHT, 0.5 + 0.5 * tap) : 'rgba(255,255,255,0.28)';
      g.lineWidth = lit > 0.01 ? lw * (1 + lit) : lw;
      g.stroke();
      g.restore();
      // heller Punkt in der Mitte: zweites Merkmal neben der Helligkeit
      if (lit > 0.01) {
        g.save();
        g.globalAlpha = lit;
        g.beginPath();
        g.arc(c.x, c.y, s * 0.17, 0, Math.PI * 2);
        g.fillStyle = 'rgba(11,20,36,0.75)';
        g.fill();
        g.restore();
      }
      if (wrong) {
        rrPath(g, x + lw / 2, y + lw / 2, s - lw, s - lw, rad);
        g.save();
        g.strokeStyle = C.warn;
        g.lineWidth = lw * 1.6;
        g.stroke();
        g.restore();
        text(g, '✗', c.x, c.y + s * 0.02, s * 0.6, C.warn, { weight: 800 });
      } else if (tap > 0.01) {
        text(g, '✓', c.x, c.y + s * 0.02, s * 0.5, C.white, { weight: 800, alpha: easeOut(tap) });
      }
    }
  }

  private drawStrikes(g: CanvasRenderingContext2D, L: Layout): void {
    const { w, u } = this.ctx.stage;
    const f = this.ctx.texts.feedback;
    const px = clamp(u * 3.2, 13, 22);
    const r = px * 0.62;
    const label = f.misses;
    g.save();
    g.font = font(px, 700);
    const lw = g.measureText(label).width;
    g.restore();
    const total = lw + px * 0.8 + MAX_STRIKES * r * 2.6;
    let x = w / 2 - total / 2;
    text(g, label, x, L.strikesY, px, C.dim, { align: 'left', weight: 700 });
    x += lw + px * 0.8 + r;
    for (let i = 0; i < MAX_STRIKES; i++) {
      const used = i < this.run.strikes;
      g.save();
      g.beginPath();
      g.arc(x, L.strikesY, r, 0, Math.PI * 2);
      g.strokeStyle = used ? C.warn : 'rgba(255,255,255,0.4)';
      g.lineWidth = 2;
      g.stroke();
      g.restore();
      if (used) text(g, '✗', x, L.strikesY + 1, r * 1.5, C.warn, { weight: 800 });
      x += r * 2.6;
    }
  }

  private wrap(g: CanvasRenderingContext2D, s: string, maxW: number, px: number): string[] {
    g.save();
    g.font = font(px, 700);
    const lines: string[] = [];
    let cur = '';
    for (const wd of s.split(' ')) {
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

  private drawOffer(g: CanvasRenderingContext2D, L: Layout): void {
    const { w, u } = this.ctx.stage;
    const f = this.ctx.texts.feedback;
    const maxW = Math.min(w - 2 * Math.max(16, u * 4), u * 70);
    const tSize = clamp(u * 3.9, 15, 26);
    let y = L.introTop + tSize * 1.6;
    for (const ln of this.wrap(g, f.bonusText, maxW, tSize)) {
      text(g, ln, w / 2, y, tSize, C.fg, { weight: 700 });
      y += tSize * 1.4;
    }
    y += tSize * 0.6;
    text(g, f.bonusOptional, w / 2, y, tSize * 0.9, C.dim, { weight: 600 });
    const px = clamp(L.go.h * 0.34, 18, 30);
    button(g, L.go, 'normal');
    text(g, f.go, L.go.x + L.go.w / 2, L.go.y + L.go.h / 2 + 1, px, C.white, { weight: 800 });
    button(g, L.skip, 'normal');
    text(g, f.skip, L.skip.x + L.skip.w / 2, L.skip.y + L.skip.h / 2 + 1, px, C.white, { weight: 800 });
  }

  // ------------------------------------------------------------------ Ergebnis

  private finish(): void {
    const { ctx } = this;
    this.phase = 'done';
    ctx.ghost.clear();
    const best = Math.max(1, this.fwd.best);
    const backBest = this.back ? this.back.best : 0;
    let tip = 'great';
    if (this.backPlayed && backBest < best - 2) tip = 'back';
    else if (best <= 4) tip = 'group';
    ctx.sfx.done();
    ctx.finish({
      primary: { key: 'level', value: best, unit: 'level', better: 'higher' },
      secondary: [
        { key: 'correct', value: this.fwd.successes, unit: 'count' },
        { key: 'errors', value: this.fwd.strikes, unit: 'count' },
        ...(this.backPlayed ? [{ key: 'backSpan', value: backBest, unit: 'count' as const }] : []),
      ],
      score: this.points,
      level: nextStartLevel(best, START_LEN, 8, 1),
      tip,
    });
  }
}

export const leuchtpfad: ExerciseDefinition = {
  id: 'leuchtpfad',
  category: 'gedaechtnis',
  minutes: 2,
  color: ACCENT,
  showsLevel: true,
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="2.6"><rect x="4" y="30" width="11" height="11" rx="2.5" opacity=".55"/><rect x="31" y="31" width="11" height="11" rx="2.5" opacity=".55"/><rect x="33" y="5" width="11" height="11" rx="2.5"/></g><rect x="15" y="6" width="12" height="12" rx="3" fill="currentColor"/><rect x="6" y="6" width="9" height="9" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.6" opacity=".55"/><path d="M21 18 20 27 10 31M20 27l13 7M38 16l-3 15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="1 4.5" opacity=".75"/>',
  texts: { de, it },
  create: (ctx) => new Leuchtpfad(ctx),
};
