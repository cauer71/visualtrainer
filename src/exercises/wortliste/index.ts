/**
 * Wortliste – Wörter nacheinander merken und aus einer Auswahl wiedererkennen (Katalog 606).
 *
 * Umsetzung nach den Empfehlungen des Katalogs (Abschnitt 10) und für das Tablet gebaut:
 * - Die Wörter erscheinen nacheinander (je ≈ 2 s, weich ein- und ausgeblendet, höchstens ein Wechsel alle 2 s).
 *   Das macht Merkstrategien möglich und vermeidet das Durchlesen eines Wortblocks in 2 s.
 * - Antwort ohne Tastatur: Aus gezeigten und neuen, ähnlich langen Wörtern (2 Spalten, Buttons ≥ 56 px hoch;
 *   nur wenn das nicht passt, 3–4 Spalten) tippt man die gezeigten an und bestätigt mit „Fertig“.
 *   Gemessen wird also Wiedererkennen, nicht Tippen oder Rechtschreiben.
 * - Stufe = Wortzahl (5 … 12), Staircase 1-down/1-up: Liste gelungen → ein Wort mehr, sonst eines weniger.
 *   Gelungen = nichts Falsches und nichts vergessen (ab 9 Wörtern eine Abweichung erlaubt).
 *   Hauptwert = größte Wortzahl, bei der eine Liste gelang. Zusatzwerte: richtig erkannt, falsche Alarme, Listen.
 * - Deutsche und italienische Wortliste getrennt (`words.ts`); ein Wort kommt in einer Sitzung möglichst nur einmal vor.
 * - Rückmeldung nach jedem Durchgang mit ✓/✗ und Rahmenform, kein rotes Blitzen. Keine Normwerte, kein „Test“.
 */
import { background, button, C, fillRR, font, hit, rrPath, text, withAlpha, type Rect } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo } from '../../core/types';
import {
  buildTrial,
  gridFor,
  isMastered,
  MAX_WORDS,
  MIN_BUTTON_H,
  MIN_WORDS,
  scoreTrial,
  showMsFor,
  type Score,
  type Trial,
  wordAlpha,
  wordCountFor,
  WordBag,
  wordsFor,
} from './logic';
import { de, it } from './texts';

const ACCENT = '#2E9284';
const LIGHT = '#7AD9CB';
const READY_MS = 1100;
const GAP_MS = 500;
const FB_OK_MS = 1500;
const FB_BAD_MS = 2400;
const DOUBLE_MS = 250;
const ROUNDS = 8;
const QUICK_ROUNDS = 2;
const DEMO_WORDS = 3;
const DEMO_DISTRACTORS = 3;

type Phase = 'ready' | 'show' | 'gap' | 'choose' | 'feedback' | 'done';

interface Layout {
  pillCy: number;
  pillH: number;
  pipsY: number;
  counterY: number;
  gridTop: number;
  gridBottom: number;
  gridMaxW: number;
  done: Rect;
  centerY: number;
  restX: number;
  restY: number;
}

/** Platz, den die Bildunterschrift im Intro-Film unten braucht (wie im Runner berechnet) */
function captionReserve(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return size * 2.1 + s.h * 0.05 + Math.max(6, s.u * 1.5);
}

class Wortliste implements Exercise {
  private readonly stair: Staircase;
  private readonly bag: WordBag;
  private readonly total: number;
  private phase: Phase = 'ready';
  private phaseT = 0;
  private trial: Trial = { n: 0, targets: [], choices: [] };
  private picks = new Set<string>();
  private rects: Rect[] = [];
  private fontPx = -1;
  private lay: Layout | null = null;
  private lastTap = { idx: -1, t: -1e9 };
  private lastScore: Score = { hits: 0, misses: 0, falseAlarms: 0 };
  private lastOk = false;
  private plan: string[] | null = null;
  private plannedInput = false;
  private hinted = false;
  // Auswertung
  private rounds = 0;
  private best = 0;
  private mastered = 0;
  private sumHits = 0;
  private sumShown = 0;
  private sumFalse = 0;
  private points = 0;

  constructor(private readonly ctx: ExerciseContext) {
    const s = Math.round(ctx.startLevel ?? MIN_WORDS);
    const start = clamp(Number.isFinite(s) ? s : MIN_WORDS, MIN_WORDS, MAX_WORDS);
    this.stair = new Staircase({ start, min: MIN_WORDS, max: MAX_WORDS, down: 1, up: 1, initialBoost: 1 });
    this.bag = new WordBag(wordsFor(ctx.lang), ctx.rng);
    this.total = ctx.mode === 'demo' ? 1 : ctx.quick ? QUICK_ROUNDS : ROUNDS;
  }

  private get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  /** Schnelltest: Pausen halbiert */
  private get pace(): number {
    return this.ctx.quick ? 0.5 : 1;
  }

  private get showMs(): number {
    return showMsFor({ demo: this.demo, quick: this.ctx.quick });
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
    const n = this.demo ? DEMO_WORDS : wordCountFor(this.stair.level);
    this.trial = buildTrial(ctx.rng, this.bag, n, this.demo ? DEMO_DISTRACTORS : undefined);
    this.picks = new Set();
    this.rects = [];
    this.fontPx = -1;
    this.lastTap = { idx: -1, t: -1e9 };
    this.plan = null;
    this.plannedInput = false;
    this.setPhase('ready', t);
    ctx.ghost.clear();
    if (!this.demo) {
      ctx.hud.setLabel(`${ctx.texts.feedback.list} ${n} · ${Math.min(this.rounds + 1, this.total)}/${this.total}`);
      ctx.hud.setProgress(this.rounds / this.total);
    }
  }

  private setPhase(p: Phase, t: number): void {
    this.phase = p;
    this.phaseT = t;
    if (!this.demo) return;
    const c = this.ctx.texts.captions;
    const { hud } = this.ctx;
    if (p === 'show') hud.caption(c.watch);
    else if (p === 'choose') hud.caption(c.pick);
    else if (p === 'feedback') hud.caption(null);
  }

  update(_dt: number, t: number): void {
    const { ctx } = this;
    const el = t - this.phaseT;
    switch (this.phase) {
      case 'ready':
        if (el >= READY_MS * this.pace) this.setPhase('show', t);
        break;
      case 'show':
        if (el >= this.trial.n * this.showMs) this.setPhase('gap', t);
        break;
      case 'gap':
        if (el >= GAP_MS * this.pace) {
          this.buildGrid();
          this.setPhase('choose', t);
        }
        break;
      case 'choose':
        if (ctx.autoplay && !this.plannedInput) this.planGhost();
        break;
      case 'feedback':
        if (el >= (this.lastOk ? FB_OK_MS : FB_BAD_MS) * this.pace) this.afterFeedback(t);
        break;
      default:
        break;
    }
  }

  private afterFeedback(t: number): void {
    const { ctx } = this;
    if (this.demo) {
      this.phase = 'done';
      ctx.hud.caption(null);
      ctx.finish({ primary: { key: 'level', value: 1, unit: 'level', better: 'higher' }, secondary: [], score: 0, level: MIN_WORDS });
      return;
    }
    if (this.rounds >= this.total) {
      this.finish();
      return;
    }
    this.newTrial(t);
  }

  // ------------------------------------------------------------------ Layout

  private computeLayout(): Layout {
    const { w, h, u } = this.ctx.stage;
    const top = Math.max(8, u * 2);
    const pillH = Math.max(40, u * 7.5);
    const gap = Math.max(8, u * 2);
    const counterH = Math.max(24, u * 4.4);
    const doneH = Math.max(MIN_BUTTON_H, u * 11);
    const bottom = this.demo ? captionReserve(this.ctx.stage) : Math.max(14, u * 3);
    const doneW = Math.min(w - 2 * Math.max(12, u * 3), u * 52);
    const doneY = h - bottom - doneH;
    const gridTop = top + pillH + gap + counterH;
    return {
      pillCy: top + pillH / 2,
      pillH,
      pipsY: top + pillH + gap + counterH / 2,
      counterY: top + pillH + gap + counterH / 2,
      gridTop,
      gridBottom: doneY - gap,
      gridMaxW: Math.min(w - 2 * Math.max(12, u * 3), u * 110),
      done: { x: (w - doneW) / 2, y: doneY, w: doneW, h: doneH },
      centerY: (top + pillH + gap + doneY) / 2,
      restX: w - Math.max(18, u * 3.5),
      restY: h * 0.5,
    };
  }

  /** Raster der Auswahl für den aktuellen Durchgang */
  private buildGrid(): void {
    const L = this.lay;
    if (!L) return;
    const { w, u } = this.ctx.stage;
    const n = this.trial.choices.length;
    const gap = Math.max(8, u * 1.6);
    const availH = Math.max(1, L.gridBottom - L.gridTop);
    const grid = gridFor(n, L.gridMaxW, availH, gap, MIN_BUTTON_H, Math.max(MIN_BUTTON_H + 8, u * 11));
    const usedW = grid.cols * grid.btnW + (grid.cols - 1) * gap;
    const usedH = grid.rows * grid.btnH + (grid.rows - 1) * gap;
    const x0 = (w - usedW) / 2;
    const y0 = L.gridTop + Math.max(0, (availH - usedH) / 2);
    this.rects = this.trial.choices.map((_, i) => {
      const c = i % grid.cols;
      const r = Math.floor(i / grid.cols);
      return { x: x0 + c * (grid.btnW + gap), y: y0 + r * (grid.btnH + gap), w: grid.btnW, h: grid.btnH };
    });
    this.fontPx = -1;
  }

  resize(): void {
    if (!this.lay) return;
    this.lay = this.computeLayout();
    if (this.rects.length) this.buildGrid();
    if (this.ctx.autoplay && this.phase === 'choose') {
      this.ctx.ghost.clear();
      this.plannedInput = false;
    }
  }

  private center(r: Rect): { x: number; y: number } {
    return { x: r.x + r.w / 2, y: r.y + r.h / 2 };
  }

  // ------------------------------------------------------------------ Geister-Hand

  private planGhost(): void {
    const { ghost, rng } = this.ctx;
    const L = this.lay;
    if (!L) return;
    this.plannedInput = true;
    if (!this.plan) {
      const n = this.trial.n;
      const pHit = clamp(0.97 - 0.025 * (n - MIN_WORDS), 0.75, 0.97);
      const words = rng.shuffle(this.trial.targets.slice()).filter(() => this.demo || rng.chance(pHit));
      if (!this.demo && rng.chance(0.15)) {
        const wrong = this.trial.choices.filter((w) => !this.trial.targets.includes(w));
        if (wrong.length) words.push(rng.pick(wrong));
      }
      if (!words.length) words.push(this.trial.targets[0]);
      this.plan = words;
    }
    let first = true;
    for (const word of this.plan) {
      if (this.picks.has(word)) continue;
      const c = this.center(this.rects[this.trial.choices.indexOf(word)]);
      const delay = this.demo ? (first ? 900 : 380) : first ? 700 * this.pace : rng.range(250, 450) * this.pace;
      ghost.tap(c.x, c.y, { delay, move: this.demo ? 480 : 360 });
      first = false;
    }
    const d = this.center(L.done);
    ghost.tap(d.x, d.y, { delay: this.demo ? 650 : 500, move: this.demo ? 520 : 400 });
    if (this.demo) ghost.moveTo(L.restX, L.restY, { delay: 400, move: 600 });
  }

  // ------------------------------------------------------------------ Eingabe

  pointerDown(p: PointerInfo): void {
    const L = this.lay;
    if (!L || this.phase !== 'choose') return;
    const idx = this.rects.findIndex((r) => hit(r, p.x, p.y));
    if (idx >= 0) {
      if (idx === this.lastTap.idx && p.t - this.lastTap.t < DOUBLE_MS) return; // Doppelkontakt
      this.lastTap = { idx, t: p.t };
      const word = this.trial.choices[idx];
      if (this.picks.has(word)) this.picks.delete(word);
      else this.picks.add(word);
      this.ctx.sfx.tap();
      return;
    }
    if (hit(L.done, p.x, p.y, 6)) {
      if (this.picks.size === 0) {
        if (!this.hinted) {
          this.hinted = true;
          this.ctx.hud.toast(this.ctx.texts.feedback.needOne, 'info', { y: L.pillCy, ms: 1200 });
        }
        return;
      }
      this.ctx.sfx.tap();
      this.submit(p.t);
    }
  }

  private submit(t: number): void {
    const { ctx } = this;
    const f = ctx.texts.feedback;
    const n = this.trial.n;
    const s = scoreTrial(this.trial.targets, [...this.picks]);
    const ok = isMastered(n, s);
    this.lastScore = s;
    this.lastOk = ok;
    ctx.ghost.clear();
    if (!this.demo) {
      this.rounds++;
      this.sumHits += s.hits;
      this.sumShown += n;
      this.sumFalse += s.falseAlarms;
      this.points += Math.max(0, s.hits * 10 - s.falseAlarms * 5) + (ok ? n * 5 : 0);
      ctx.hud.setScore(this.points);
      ctx.hud.setProgress(this.rounds / this.total);
      if (ok) {
        this.mastered++;
        this.best = Math.max(this.best, n);
      }
      this.stair.update(ok);
    }
    if (ok) {
      ctx.sfx.good();
      ctx.hud.toast(f.good, 'good', { y: this.lay!.pillCy, ms: FB_OK_MS });
    } else {
      ctx.sfx.bad();
      ctx.hud.toast(f.almost, 'info', { y: this.lay!.pillCy, ms: FB_BAD_MS });
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
    if (this.phase === 'show' || this.phase === 'ready' || this.phase === 'gap') this.drawShow(g, L, t);
    else this.drawChoices(g, L);
  }

  private statusText(): string {
    const f = this.ctx.texts.feedback;
    if (this.phase === 'feedback') {
      const s = this.lastScore;
      return `${s.hits} ${f.of} ${this.trial.n} ${f.found}${s.falseAlarms ? ` · ${s.falseAlarms} ${f.wrong}` : ''}`;
    }
    if (this.phase === 'choose') return f.pick;
    if (this.phase === 'show') return f.watch;
    return f.ready;
  }

  private drawPill(g: CanvasRenderingContext2D, L: Layout): void {
    const { w } = this.ctx.stage;
    const label = this.statusText();
    let px = Math.round(L.pillH * 0.42);
    g.save();
    g.font = font(px, 800);
    const maxW = w - 2 * Math.max(12, this.ctx.stage.u * 3) - L.pillH;
    const tw0 = g.measureText(label).width;
    if (tw0 > maxW) px = Math.max(12, Math.floor((px * maxW) / tw0));
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

  /** Merkphase: ein Wort in der Mitte, darunter Punkte (so viele wie Wörter; gefüllt = schon gezeigt) */
  private drawShow(g: CanvasRenderingContext2D, L: Layout, t: number): void {
    const { w, u } = this.ctx.stage;
    const n = this.trial.n;
    const el = t - this.phaseT;
    let idx = -1;
    let alpha = 0;
    if (this.phase === 'show') {
      idx = Math.min(n - 1, Math.floor(el / this.showMs));
      alpha = wordAlpha(el - idx * this.showMs, this.showMs);
    }
    // Rahmen (ruhig, feststehend) und Wort
    const panelW = Math.min(w - 2 * Math.max(12, u * 3), u * 84);
    const panelH = Math.max(90, u * 26);
    fillRR(g, w / 2 - panelW / 2, L.centerY - panelH / 2, panelW, panelH, panelH * 0.2, 'rgba(255,255,255,0.06)');
    g.save();
    rrPath(g, w / 2 - panelW / 2 + 0.75, L.centerY - panelH / 2 + 0.75, panelW - 1.5, panelH - 1.5, panelH * 0.2);
    g.strokeStyle = withAlpha(LIGHT, 0.28);
    g.lineWidth = 1.5;
    g.stroke();
    g.restore();
    if (idx >= 0 && alpha > 0.005) {
      const word = this.trial.targets[idx];
      let px = clamp(u * 12, 34, 120);
      g.save();
      g.font = font(px, 800);
      const tw = g.measureText(word).width;
      const maxW = panelW * 0.88;
      if (tw > maxW) px = Math.floor((px * maxW) / tw);
      g.restore();
      text(g, word, w / 2, L.centerY + px * 0.04, px, C.white, { weight: 800, alpha });
    }
    // Punkte
    const r = clamp(L.pillH * 0.11, 4, 8);
    const step = r * 3.2;
    const x0 = w / 2 - ((n - 1) * step) / 2;
    const filled = this.phase === 'show' ? idx + (alpha > 0.5 ? 1 : 0) : this.phase === 'gap' ? n : 0;
    for (let i = 0; i < n; i++) {
      g.save();
      g.beginPath();
      g.arc(x0 + i * step, L.centerY + panelH / 2 + r * 4, r, 0, Math.PI * 2);
      if (i < filled) {
        g.fillStyle = LIGHT;
        g.fill();
      } else {
        g.strokeStyle = 'rgba(255,255,255,0.4)';
        g.lineWidth = 2;
        g.stroke();
      }
      g.restore();
    }
  }

  /** Schriftgröße so, dass das längste Wort in einen Button passt */
  private fitFont(g: CanvasRenderingContext2D): number {
    if (this.fontPx > 0) return this.fontPx;
    const r = this.rects[0];
    if (!r) return 16;
    g.save();
    g.font = font(100, 800);
    let widest = 1;
    for (const wd of this.trial.choices) widest = Math.max(widest, g.measureText(wd).width);
    g.restore();
    const usable = r.w - 2 * Math.max(8, r.w * 0.06);
    this.fontPx = Math.max(11, Math.min(r.h * 0.4, (usable / widest) * 100, 38));
    return this.fontPx;
  }

  private drawBadge(g: CanvasRenderingContext2D, r: Rect, kind: 'on' | 'missed' | 'wrong'): void {
    const br = Math.max(10, r.h * 0.2);
    const cx = r.x + r.w - br * 0.75;
    const cy = r.y + br * 0.75;
    g.save();
    g.beginPath();
    g.arc(cx, cy, br, 0, Math.PI * 2);
    if (kind === 'on') {
      g.fillStyle = C.white;
      g.fill();
    } else if (kind === 'wrong') {
      g.fillStyle = C.warn;
      g.fill();
    } else {
      g.fillStyle = 'rgba(11,20,36,0.85)';
      g.fill();
      g.setLineDash([4, 3]);
      g.strokeStyle = LIGHT;
      g.lineWidth = 2;
      g.stroke();
    }
    g.restore();
    const sym = kind === 'wrong' ? '✗' : '✓';
    text(g, sym, cx, cy + 1, br * 1.35, kind === 'missed' ? LIGHT : '#0B1424', { weight: 800 });
  }

  private drawChoices(g: CanvasRenderingContext2D, L: Layout): void {
    const { w, u } = this.ctx.stage;
    const f = this.ctx.texts.feedback;
    const fb = this.phase === 'feedback';
    const px = this.fitFont(g);
    const targets = new Set(this.trial.targets);
    this.trial.choices.forEach((word, i) => {
      const r = this.rects[i];
      if (!r) return;
      const picked = this.picks.has(word);
      const isT = targets.has(word);
      const rad = Math.min(r.h, r.w) * 0.22;
      let tcol: string = C.white;
      let talpha = 1;
      if (!fb) {
        if (picked) {
          fillRR(g, r.x, r.y, r.w, r.h, rad, withAlpha(ACCENT, 0.9));
          g.save();
          rrPath(g, r.x + 1.5, r.y + 1.5, r.w - 3, r.h - 3, rad);
          g.strokeStyle = C.white;
          g.lineWidth = 3;
          g.stroke();
          g.restore();
        } else button(g, r, 'normal', rad);
      } else if (isT && picked) {
        fillRR(g, r.x, r.y, r.w, r.h, rad, withAlpha(ACCENT, 0.9));
        g.save();
        rrPath(g, r.x + 1.5, r.y + 1.5, r.w - 3, r.h - 3, rad);
        g.strokeStyle = C.white;
        g.lineWidth = 3;
        g.stroke();
        g.restore();
      } else if (isT) {
        button(g, r, 'normal', rad);
        g.save();
        rrPath(g, r.x + 1.5, r.y + 1.5, r.w - 3, r.h - 3, rad);
        g.setLineDash([8, 5]);
        g.strokeStyle = LIGHT;
        g.lineWidth = 3;
        g.stroke();
        g.restore();
      } else if (picked) {
        button(g, r, 'normal', rad);
        g.save();
        rrPath(g, r.x + 1.5, r.y + 1.5, r.w - 3, r.h - 3, rad);
        g.strokeStyle = C.warn;
        g.lineWidth = 3;
        g.stroke();
        g.restore();
      } else {
        button(g, r, 'disabled', rad);
        talpha = 0.45;
        tcol = C.dim;
      }
      text(g, word, r.x + r.w / 2, r.y + r.h / 2 + px * 0.04, px, tcol, { weight: 800, alpha: talpha });
      if (!fb) {
        if (picked) this.drawBadge(g, r, 'on');
      } else if (isT && picked) this.drawBadge(g, r, 'on');
      else if (isT) this.drawBadge(g, r, 'missed');
      else if (picked) this.drawBadge(g, r, 'wrong');
    });
    if (!fb) {
      // Zähler und „Fertig“
      const size = clamp(u * 3.4, 14, 24);
      text(g, `${f.chosen}: ${this.picks.size} ${f.of} ${this.trial.n}`, w / 2, L.counterY, size, C.dim, { weight: 700 });
      const enabled = this.picks.size > 0;
      button(g, L.done, enabled ? 'active' : 'normal');
      const dpx = clamp(L.done.h * 0.36, 18, 30);
      text(g, f.done, L.done.x + L.done.w / 2, L.done.y + L.done.h / 2 + 1, dpx, C.white, { weight: 800, alpha: enabled ? 1 : 0.6 });
    }
  }

  // ------------------------------------------------------------------ Ergebnis

  private finish(): void {
    const { ctx } = this;
    this.phase = 'done';
    ctx.ghost.clear();
    ctx.sfx.done();
    const thr = this.stair.threshold();
    const recognized = this.sumShown ? Math.round((100 * this.sumHits) / this.sumShown) : 0;
    let tip = 'great';
    if (this.sumFalse >= 3) tip = 'alarm';
    else if (recognized < 75) tip = 'group';
    ctx.finish({
      primary: { key: 'level', value: this.best, unit: 'level', better: 'higher' },
      secondary: [
        { key: 'recognized', value: recognized, unit: 'percent' },
        { key: 'falseAlarms', value: this.sumFalse, unit: 'count' },
        { key: 'lists', value: this.mastered, unit: 'count' },
      ],
      score: this.points,
      level: Math.round(nextStartLevel(thr, MIN_WORDS, MAX_WORDS, 1)),
      tip,
    });
  }
}

export const wortliste: ExerciseDefinition = {
  id: 'wortliste',
  category: 'gedaechtnis',
  minutes: 3,
  color: ACCENT,
  showsLevel: true,
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><path d="M7 12h20M7 24h26M7 36h14" opacity=".85"/><path d="M30 34l5 5 9-11" stroke-width="3.6" stroke-linejoin="round"/></g>',
  texts: { de, it },
  create: (ctx) => new Wortliste(ctx),
};
