/**
 * Raster-Ausweichen – ein freies Feld im 3×3-Raster antippen, bevor die besetzten Felder „belegt“ sind
 * (Katalog 806, „Dynamic Grid Evasion“ – hier als ehrliche Touch-Übung am Bildschirm, kein Reaktionstest).
 *
 * Das Original ist ein Maus-Spiel (Fadenkreuz per Pointer-Lock, pulsierende Bernstein-Warnung mit 2 Hz, rote Explosion, roter
 * Vollbild-Blitz, Bildschirm-Wackeln, Zeitbonus, Normtabelle). Hier:
 * - Dein Finger „steht“ auf einem Feld (Figur „Du“). Einige Felder werden als besetzt angekündigt: Schraffur + Rautensymbol,
 *   sanftes Pulsieren (≤ 2 Hz, weich), keine rote Fläche. Dein eigenes Feld ist immer dabei – du musst wechseln.
 * - Tippe ein freies Feld an, bevor die Wartezeit abläuft; dann werden die besetzten Felder „belegt“ (ruhiger Übergang, dichte
 *   Schraffur + ausgefüllte Raute). Die Figur zieht auf das angetippte Feld. Tipp auf ein besetztes Feld oder zu spät = weiches ✗.
 * - Die Welle läuft immer bis zum Ende der Wartezeit durch, auch nach einem frühen Tipp (kein Zeitbonus, kein Hetzen). Die Zeit
 *   bis zum Tipp wird mitgeschrieben (Median); Start = erster Frame, in dem die Ankündigung gezeichnet wird, Ende = Zeit des Fingers.
 * - Stufe (Staircase 3-down/1-up): Wartezeit 2,6 s → 0,9 s, besetzte Felder 3 → 7 von 9. Feste Zahl von Wellen.
 *   Hauptwert = Stufe; Zusatz: Trefferquote, Median-Zeit, höchste Stufe.
 * - Ehrlich: Gemessen werden Entscheiden und Tippen unter einer Frist inklusive der Verzögerung des Touchscreens – kein
 *   reiner Reaktionstest, kein Blick, keine Normwerte.
 *
 * Geister-Hand (Film/Autoplay): Die Übung führt selbst eine virtuelle Hand, die zeitgenau ein freies Feld antippt.
 */
import { background, C, circle, fillRR, rrPath, text, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, lerp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { captionTopY, handSize, restSpot, softBadge, softWave, VirtualHand } from '../_shared/koerper-b';
import {
  type Area,
  CELLS,
  cellAt,
  cellRect,
  classifyTap,
  makeWave,
  MAX_LEVEL,
  medianTime,
  MIN_LEVEL,
  occupiedCountFor,
  planReaction,
  type PlannedReaction,
  pointsFor,
  waitMsFor,
} from './logic';
import { de, it } from './texts';

const WAVES = 12;
const QUICK_WAVES = 3;
const DEMO_WAVES = 2;
const HOLD_MS = 1000;
const GAP_MS: [number, number] = [450, 800];
const FIRST_MS: [number, number] = [900, 1300];
const DEMO_FIRST_MS = 1100;
const DEMO_GAP_MS = 500;
const DEMO_WAIT = 3300;
const DEMO_LEVEL = 1;
const END_DELAY_MS = 500;
const MIN_PU = 6;
const VF_ID = -2;
const FADE_IN_MS = 160;
const FADE_BELEGT_MS = 260;

const AMBER = '#E9C46A';
const CELL = '#13233F';
const SLATE = '#3B4C6B';

type Phase = 'gap' | 'warn' | 'belegt' | 'done';
type Kind = 'ok' | 'occupied' | 'late';

interface Result {
  kind: Kind;
  cell: number;
  rt: number;
  at: number;
}

class RasterAusweichen implements Exercise {
  private readonly stair: Staircase;
  private readonly total: number;
  private phase: Phase = 'gap';
  private phaseT = 0;
  private nextAt = 0;
  private area: Area = { x: 0, y: 0, w: 100, h: 100, gap: 8 };
  private areaKey = '';
  // Welle
  private level = MIN_LEVEL;
  private wait = 2600;
  private occupied: number[] = [];
  private prevWave: number[] | undefined;
  private onsetT = -1;
  private result: Result | null = null;
  // Figur
  private own = 4;
  private tokenFrom = 4;
  private tokenT = -1e9;
  // Auswertung
  private idx = 0;
  private hits = 0;
  private late = 0;
  private wrong = 0;
  private points = 0;
  private rts: number[] = [];
  private maxLevel = MIN_LEVEL;
  private capState = '';
  // virtuelle Hand
  private readonly vh = new VirtualHand();
  private plan: PlannedReaction | null = null;
  private planAt = 0;
  private handDone = false;

  constructor(private readonly ctx: ExerciseContext) {
    const s = Math.round(ctx.startLevel ?? MIN_LEVEL);
    const start = clamp(Number.isFinite(s) ? s : MIN_LEVEL, MIN_LEVEL, MAX_LEVEL);
    this.stair = new Staircase({ start, min: MIN_LEVEL, max: MAX_LEVEL, down: 3, up: 1 });
    this.total = ctx.mode === 'demo' ? DEMO_WAVES : ctx.quick ? QUICK_WAVES : WAVES;
  }

  private get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  // ------------------------------------------------------------------ Geometrie

  private layout(): Area {
    const { w, h, u } = this.ctx.stage;
    const key = `${w}x${h}:${this.demo ? 1 : 0}`;
    if (key === this.areaKey) return this.area;
    const pu = Math.max(u, MIN_PU);
    const mx = 4 * pu;
    const top = this.demo ? 6 * pu : 14 * pu;
    const bottom = this.demo ? captionTopY(this.ctx.stage) - 1.5 * pu : h - 3 * pu;
    this.area = { x: mx, y: top, w: Math.max(120, w - 2 * mx), h: Math.max(120, bottom - top), gap: Math.max(8, 1.3 * pu) };
    this.areaKey = key;
    return this.area;
  }

  resize(): void {
    this.areaKey = '';
    this.layout();
  }

  // ------------------------------------------------------------------ Ablauf

  start(t: number): void {
    const { hud, ghost, rng } = this.ctx;
    this.layout();
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    if (this.ctx.autoplay) ghost.hide();
    const rp = restSpot(this.ctx.stage, false);
    this.vh.snap(rp.x, rp.y);
    this.own = 4;
    this.tokenFrom = 4;
    this.phase = 'gap';
    this.nextAt = t + (this.demo ? DEMO_FIRST_MS : rng.range(FIRST_MS[0], FIRST_MS[1]));
    this.updateHud();
    if (this.demo) this.setCaption('watch', this.ctx.texts.captions.watch);
  }

  private beginWave(t: number): void {
    const { rng } = this.ctx;
    this.level = this.demo ? DEMO_LEVEL : Math.floor(this.stair.level + 1e-9);
    this.maxLevel = Math.max(this.maxLevel, this.level);
    this.wait = this.demo ? DEMO_WAIT : waitMsFor(this.level);
    this.occupied = makeWave(rng, occupiedCountFor(this.level), this.own, this.prevWave);
    this.prevWave = this.occupied;
    this.phase = 'warn';
    this.phaseT = t;
    this.onsetT = -1;
    this.result = null;
    this.plan = null;
    this.handDone = false;
  }

  update(_dt: number, t: number): void {
    if (this.phase === 'done') return;
    this.vh.update(t);
    if (this.phase === 'gap') {
      if (t >= this.nextAt) {
        if (this.idx >= this.total) {
          this.end();
          return;
        }
        this.beginWave(t);
      }
    } else if (this.phase === 'warn') {
      if (this.onsetT < 0) return;
      if (this.demo && this.capState === 'watch' && t - this.onsetT > 800) this.setCaption('tap', this.ctx.texts.captions.tap);
      if (this.ctx.autoplay) this.autoUpdate(t);
      if (t >= this.onsetT + this.wait) {
        if (!this.result) this.register('late', -1, this.wait, t);
        this.phase = 'belegt';
        this.phaseT = t;
        if (this.demo) this.setCaption('check', this.ctx.texts.captions.check);
        if (this.ctx.autoplay) this.vh.glide(restSpot(this.ctx.stage, false).x, restSpot(this.ctx.stage, false).y, t + 300, 700);
      }
    } else if (this.phase === 'belegt') {
      if (t - this.phaseT >= HOLD_MS) {
        this.phase = 'gap';
        this.nextAt = t + (this.idx >= this.total ? END_DELAY_MS : this.demo ? DEMO_GAP_MS : this.ctx.rng.range(GAP_MS[0], GAP_MS[1]));
        if (this.demo && this.idx < this.total) this.setCaption('watch', this.ctx.texts.captions.watch);
      }
    }
  }

  private register(kind: Kind, cell: number, rt: number, t: number): void {
    const { sfx, hud, fmt, texts } = this.ctx;
    if (this.result) return;
    this.result = { kind, cell, rt, at: t };
    if (kind === 'ok') {
      this.hits++;
      this.rts.push(rt);
      this.points += pointsFor(this.level);
      this.tokenFrom = this.own;
      this.own = cell;
      this.tokenT = t;
      sfx.good();
    } else {
      if (kind === 'late') this.late++;
      else this.wrong++;
      sfx.bad();
    }
    if (!this.demo) this.stair.update(kind === 'ok');
    this.idx++;
    this.updateHud();
    const G = this.layout();
    const size = clamp(this.ctx.stage.u * 4.4, 17, 32);
    const label = kind === 'ok' ? `✓ ${fmt.time(rt, 2)}` : kind === 'occupied' ? `✗ ${texts.feedback.occupied}` : `✗ ${texts.feedback.late}`;
    hud.toast(label, kind === 'ok' ? 'good' : 'bad', {
      x: this.ctx.stage.w / 2,
      y: Math.max(size * 1.5, G.y - size * 0.4),
      ms: Math.max(900, this.wait - rt + HOLD_MS - 200),
      size,
    });
  }

  private setCaption(state: string, txt: string): void {
    if (this.capState === state) return;
    this.capState = state;
    this.ctx.hud.caption(txt, 'bottom');
  }

  private updateHud(): void {
    const { hud, texts } = this.ctx;
    hud.setProgress(this.idx / this.total);
    hud.setScore(this.demo ? null : this.hits);
    hud.setLabel(`${texts.feedback.level} ${Math.floor((this.demo ? DEMO_LEVEL : this.stair.level) + 1e-9)}`);
  }

  // ------------------------------------------------------------------ Eingabe

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'warn' || this.onsetT < 0 || this.result) return;
    // Nur was nach dem ersten Zeichnen der Ankündigung kommt, ist eine Antwort
    if (p.t < this.onsetT) return;
    const cell = cellAt(p.x, p.y, this.layout());
    if (cell < 0) return;
    const rt = p.t - this.onsetT;
    if (rt > this.wait) {
      this.register('late', cell, this.wait, p.t);
      return;
    }
    this.register(classifyTap(cell, this.occupied) === 'free' ? 'ok' : 'occupied', cell, rt, p.t);
  }

  // ------------------------------------------------------------------ virtuelle Hand

  private autoUpdate(t: number): void {
    const { rng } = this.ctx;
    if (!this.plan) {
      this.plan = planReaction(rng, this.level, this.occupied, this.demo, this.idx % 2 === 0 ? 1700 : 1900);
      this.planAt = this.onsetT + this.plan.rt;
      if (this.plan.cell >= 0) {
        const c = cellRect(this.plan.cell, this.layout());
        this.vh.glide(c.cx, c.cy, t, Math.max(180, this.planAt - t - 10));
      }
      return;
    }
    if (this.handDone || t < this.planAt) return;
    this.handDone = true;
    if (this.plan.cell < 0) return;
    const c = cellRect(this.plan.cell, this.layout());
    this.vh.snap(c.cx, c.cy);
    this.vh.press(this.planAt);
    this.pointerDown({ id: VF_ID, x: c.cx, y: c.cy, t: this.planAt, type: 'ghost' });
    const rp = restSpot(this.ctx.stage, false);
    this.vh.glide(rp.x, rp.y, t + 450, 700);
  }

  // ------------------------------------------------------------------ Ende

  private end(): void {
    this.phase = 'done';
    this.ctx.hud.caption(null);
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'level', value: DEMO_LEVEL, unit: 'level', better: 'higher' },
        secondary: [{ key: 'accuracy', value: Math.round((100 * this.hits) / Math.max(1, this.total)), unit: 'percent' }],
        score: this.points,
        level: MIN_LEVEL,
      });
      return;
    }
    this.ctx.sfx.done();
    const n = Math.max(1, this.idx);
    const thr = this.stair.threshold();
    const acc = (100 * this.hits) / n;
    const med = medianTime(this.rts);
    let tip = 'great';
    if (this.late >= Math.max(2, Math.ceil(n * 0.25))) tip = 'late';
    else if (this.wrong >= Math.max(2, Math.ceil(n * 0.25))) tip = 'look';
    this.ctx.finish({
      primary: { key: 'level', value: Math.max(MIN_LEVEL, Math.round(thr)), unit: 'level', better: 'higher' },
      secondary: [
        { key: 'accuracy', value: Math.round(acc), unit: 'percent' },
        ...(Number.isFinite(med) ? [{ key: 'medianTime', value: Math.round(med), unit: 'time' as const }] : []),
        { key: 'maxLevel', value: Math.floor(this.maxLevel + 1e-9), unit: 'level' as const },
      ],
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip,
    });
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr } = this.ctx.stage;
    const A = this.layout();
    // erster gezeichneter Frame der Ankündigung = Reizbeginn
    if (this.phase === 'warn' && this.onsetT < 0) this.onsetT = t;
    background(g, w, h, dpr);
    for (let i = 0; i < CELLS; i++) this.drawCell(g, A, i, t);
    this.drawToken(g, A, t);
    this.drawResult(g, A, t);
    this.drawWaitBar(g, A, t);
    if (this.ctx.autoplay) this.vh.render(g, t, handSize(this.ctx.stage));
  }

  private drawCell(g: CanvasRenderingContext2D, A: Area, i: number, t: number): void {
    const c = cellRect(i, A);
    const { u } = this.ctx.stage;
    const rad = Math.min(c.w, c.h) * 0.1;
    fillRR(g, c.x, c.y, c.w, c.h, rad, CELL);
    g.save();
    rrPath(g, c.x, c.y, c.w, c.h, rad);
    g.strokeStyle = 'rgba(232,238,247,0.22)';
    g.lineWidth = 2;
    g.stroke();
    g.restore();
    const occ = this.phase !== 'gap' && this.occupied.includes(i);
    if (!occ) return;
    const reduced = this.ctx.reducedMotion;
    const inA = reduced || this.onsetT < 0 ? 1 : clamp((t - this.onsetT) / FADE_IN_MS, 0, 1);
    const bel = this.phase === 'belegt' ? (reduced ? 1 : clamp((t - this.phaseT) / FADE_BELEGT_MS, 0, 1)) : 0;
    const pulse = softWave(t, 1.2, reduced);
    // Ankündigung: Bernstein, Schraffur, Raute
    g.save();
    rrPath(g, c.x, c.y, c.w, c.h, rad);
    g.clip();
    g.globalAlpha = inA * (1 - bel);
    g.fillStyle = withAlpha(AMBER, 0.07 + 0.1 * pulse);
    g.fillRect(c.x, c.y, c.w, c.h);
    hatch(g, c, 16, withAlpha(AMBER, 0.5), 2.5, 1);
    g.restore();
    // belegt: ruhiger Grauton, dichtere Kreuzschraffur, kräftiger Rand
    if (bel > 0) {
      g.save();
      rrPath(g, c.x, c.y, c.w, c.h, rad);
      g.clip();
      g.globalAlpha = bel;
      g.fillStyle = withAlpha(SLATE, 0.92);
      g.fillRect(c.x, c.y, c.w, c.h);
      hatch(g, c, 9, 'rgba(232,238,247,0.34)', 2.2, 1);
      hatch(g, c, 9, 'rgba(232,238,247,0.22)', 2, -1);
      g.restore();
      g.save();
      g.globalAlpha = bel;
      rrPath(g, c.x + 1.5, c.y + 1.5, c.w - 3, c.h - 3, rad);
      g.strokeStyle = 'rgba(232,238,247,0.75)';
      g.lineWidth = 4;
      g.stroke();
      g.restore();
    }
    // Raute (Symbol „besetzt“): Umriss bei Ankündigung, gefüllt bei „belegt“
    const s = Math.min(c.w, c.h) * 0.17;
    const dx = c.cx + c.w * 0.1;
    const dy = c.cy - c.h * 0.08;
    g.save();
    g.beginPath();
    g.moveTo(dx, dy - s);
    g.lineTo(dx + s, dy);
    g.lineTo(dx, dy + s);
    g.lineTo(dx - s, dy);
    g.closePath();
    g.globalAlpha = inA;
    g.lineWidth = Math.max(3, u * 0.5);
    g.strokeStyle = AMBER;
    g.stroke();
    if (bel > 0) {
      g.globalAlpha = bel;
      g.fillStyle = C.white;
      g.fill();
    }
    g.restore();
  }

  private drawToken(g: CanvasRenderingContext2D, A: Area, t: number): void {
    const a = cellRect(this.tokenFrom, A);
    const b = cellRect(this.own, A);
    const k = this.ctx.reducedMotion ? 1 : clamp((t - this.tokenT) / 220, 0, 1);
    const e = k * k * (3 - 2 * k);
    const ox = -0.22;
    const oy = 0.2;
    const x = lerp(a.cx + a.w * ox, b.cx + b.w * ox, e);
    const y = lerp(a.cy + a.h * oy, b.cy + b.h * oy, e);
    const r = Math.max(14, Math.min(b.w, b.h) * 0.13);
    circle(g, x, y, r, C.white);
    g.save();
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.lineWidth = Math.max(2.5, r * 0.14);
    g.strokeStyle = '#1E3A5F';
    g.stroke();
    g.restore();
    text(g, this.ctx.texts.feedback.you, x, y + 1, Math.max(11, r * 0.8), '#1E3A5F', { weight: 800 });
  }

  private drawResult(g: CanvasRenderingContext2D, A: Area, t: number): void {
    const r = this.result;
    if (!r || this.phase === 'gap') return;
    const cellIdx = r.cell >= 0 ? r.cell : this.own;
    const c = cellRect(cellIdx, A);
    const rad = clamp(Math.min(c.w, c.h) * 0.12, 13, 22);
    const a = this.ctx.reducedMotion ? 1 : clamp((t - r.at) / 160, 0, 1);
    g.save();
    g.globalAlpha = a;
    softBadge(g, c.x + c.w - rad * 1.6, c.y + rad * 1.6, rad, r.kind === 'ok' ? 'ok' : 'bad');
    g.restore();
  }

  /** dünne Fristleiste über dem Raster: schrumpft bis zum Ende der Wartezeit (weich, ohne Flackern) */
  private drawWaitBar(g: CanvasRenderingContext2D, A: Area, t: number): void {
    if (this.phase !== 'warn' || this.onsetT < 0) return;
    const f = clamp(1 - (t - this.onsetT) / this.wait, 0, 1);
    const hgt = Math.max(5, this.ctx.stage.u * 0.9);
    const y = A.y - hgt * 2.4;
    g.save();
    fillRR(g, A.x, y, A.w, hgt, hgt / 2, 'rgba(255,255,255,0.10)');
    if (f > 0.005) fillRR(g, A.x, y, Math.max(hgt, A.w * f), hgt, hgt / 2, withAlpha(AMBER, 0.85));
    g.restore();
  }
}

/** Diagonale Schraffur in einem Feld (dir = 1: von links unten nach rechts oben, −1: gespiegelt) */
function hatch(g: CanvasRenderingContext2D, c: { x: number; y: number; w: number; h: number }, step: number, color: string, lw: number, dir: 1 | -1): void {
  g.save();
  g.strokeStyle = color;
  g.lineWidth = lw;
  g.beginPath();
  const span = c.w + c.h;
  for (let k = -c.h; k < span; k += step) {
    if (dir === 1) {
      g.moveTo(c.x + k, c.y + c.h);
      g.lineTo(c.x + k + c.h, c.y);
    } else {
      g.moveTo(c.x + k, c.y);
      g.lineTo(c.x + k + c.h, c.y + c.h);
    }
  }
  g.stroke();
  g.restore();
}

export const rasterAusweichen: ExerciseDefinition = {
  id: 'raster-ausweichen',
  category: 'konzentration',
  minutes: 1,
  color: '#7A5195',
  showsLevel: true,
  icon:
    '<rect x="5" y="5" width="11" height="11" rx="2.4" fill="none" stroke="currentColor" stroke-width="2.4"/><rect x="18.5" y="5" width="11" height="11" rx="2.4" fill="currentColor" opacity=".3"/><rect x="32" y="5" width="11" height="11" rx="2.4" fill="none" stroke="currentColor" stroke-width="2.4"/><rect x="5" y="18.5" width="11" height="11" rx="2.4" fill="currentColor" opacity=".3"/><rect x="18.5" y="18.5" width="11" height="11" rx="2.4" fill="none" stroke="currentColor" stroke-width="2.4"/><rect x="32" y="18.5" width="11" height="11" rx="2.4" fill="none" stroke="currentColor" stroke-width="2.4"/><rect x="5" y="32" width="11" height="11" rx="2.4" fill="none" stroke="currentColor" stroke-width="2.4"/><rect x="18.5" y="32" width="11" height="11" rx="2.4" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="37.5" cy="37.5" r="4.4" fill="currentColor"/>',
  texts: { de, it },
  create: (ctx) => new RasterAusweichen(ctx),
};
