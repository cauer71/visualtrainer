/**
 * Zahlenspanne – Ziffern nacheinander ansehen, merken und über ein großes Zahlenfeld eingeben
 * (Katalog 602, docs/uebungskatalog/uebungen/602-digit-span.md).
 *
 * Umsetzung der Empfehlungen aus Abschnitt 10 des Katalogeintrags:
 * - Anzeige seriell: eine große Ziffer nach der anderen, ≈ 1 s je Ziffer (weich ein- und ausgeblendet, 140 ms),
 *   danach Eingabe über ein 3 × 4-Zahlenfeld (Tasten ≥ 56 px, auf dem Tablet deutlich größer).
 * - Folgen ohne Zahlenmuster: nie dieselbe Ziffer zweimal direkt hintereinander, keine drei Ziffern mit gleichem
 *   Abstand (123, 135, 864 …), siehe logic.ts.
 * - Gedächtnis statt Tempo: kein Zeitlimit; feste Rundenzahl (7 vorwärts; Test-Modus 2) statt Uhr.
 * - Eingabe bewusst mit Bestätigen (✓) und Löschen: Ein versehentlicher Tipp beendet die Runde nicht.
 * - Schwierigkeit: 1-auf/1-ab-Treppe über die Länge (3–12, Start 3 bzw. gespeicherte Stufe). Richtig → eine
 *   Ziffer mehr, falsch → eine weniger.
 * - Rückwärts-Variante ab höherer Stufe: Wurde vorwärts eine Folge mit ≥ 6 Ziffern richtig eingegeben, folgen
 *   zwei Runden rückwärts (Start 3 Ziffern kürzer als die beste Vorwärts-Folge; im Test-Modus ab 3).
 * - Rückmeldung nicht nur über Farbe: ✓ / ✗ und bei einem Fehler die richtige Eingabe als Text; kein Vollbild-Schimmer.
 * - Hauptwert: längste richtig eingegebene Vorwärts-Folge (Ziffern). Dazu richtige Folgen, richtig erinnerte
 *   Ziffern und – falls gespielt – die längste richtige Rückwärts-Folge. Nur Vergleich mit sich selbst.
 */
import { background, button, C, fillRR, hit, rrPath, ring, text, withAlpha, type ButtonState, type Rect } from '../../core/draw';
import { nextStartLevel, type Staircase } from '../../core/staircase';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo } from '../../core/types';
import {
  BACKWARD_ROUNDS,
  createBackwardStaircase,
  createForwardStaircase,
  DIGIT_MS,
  digitAlpha,
  expected,
  FORWARD_ROUNDS,
  isCorrect,
  makeDigits,
  MAX_LEN,
  MIN_LEN,
  playsBackward,
  QUICK_BACKWARD_ROUNDS,
  QUICK_FORWARD_ROUNDS,
  showDurationMs,
} from './logic';
import { de, it } from './texts';

const ACCENT = '#2F8F83';
const READY_MS = 800;
const SHOW_LEAD_MS = 250;
const SHOW_TAIL_MS = 250;
const RESULT_OK_MS = 1000;
const RESULT_BAD_MS = 2400;
const DOUBLE_TAP_MS = 180;
const PRESS_MS = 140;
const DEMO_END_MS = 1500;
const DEMO_LEN = 3;
/** Belegung des Zahlenfelds (Reihenfolge wie beim Telefon, unten Löschen – 0 – Bestätigen) */
type Key = number | 'del' | 'ok';
const KEYS: readonly Key[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'del', 0, 'ok'];

type Phase = 'ready' | 'show' | 'input' | 'result' | 'end' | 'done';

interface Layout {
  statusY: number;
  statusPx: number;
  /** Mitte des Anzeigebereichs (große Ziffer) */
  cx: number;
  cy: number;
  keys: Rect[];
  gap: number;
  slots: Rect[];
  slotPx: number;
  answerY: number;
}

/** Platz, den die Bildunterschrift im Intro-Film unten braucht (wie im Runner berechnet) */
function captionReserve(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return size * 2.1 + s.h * 0.05 + Math.max(6, s.u * 1.5);
}

class Zahlenspanne implements Exercise {
  private readonly fwdStair: Staircase;
  private bwdStair: Staircase | null = null;
  private backward = false;
  private readonly fwdTotal: number;
  private readonly bwdTotal: number;
  private fwdDone = 0;
  private bwdDone = 0;
  private len = MIN_LEN;
  private digits: number[] = [];
  private entered: number[] = [];
  private phase: Phase = 'ready';
  private phaseT = 0;
  private showT0 = 0;
  private showEnd = 0;
  private tickIdx = 0;
  private ok = false;
  private lastTap = { k: '' as string, t: -1e9 };
  private pressed = { i: -1, t: -1e9 };
  private plannedFor = -1;
  private roundNo = 0;
  private lay: Layout | null = null;
  private layKey = '';
  private progress = 0;
  // Auswertung
  private points = 0;
  private bestFwd = 0;
  private bestBwd = 0;
  private correct = 0;
  private matched = 0;
  private wrongFwd = 0;
  private wrongBwd = 0;
  private swapped = 0;
  private wrong = 0;

  constructor(private readonly ctx: ExerciseContext) {
    this.fwdStair = createForwardStaircase(ctx.startLevel);
    this.fwdTotal = this.demo ? 1 : ctx.quick ? QUICK_FORWARD_ROUNDS : FORWARD_ROUNDS;
    this.bwdTotal = ctx.quick ? QUICK_BACKWARD_ROUNDS : BACKWARD_ROUNDS;
  }

  private get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  /** Bekannte Gesamtzahl der Runden (Rückwärts-Runden zählen erst, wenn sie feststehen) */
  private get total(): number {
    return this.fwdTotal + (this.backward || (!this.demo && playsBackward(this.bestFwd, this.ctx.quick)) ? this.bwdTotal : 0);
  }

  start(t: number): void {
    this.ctx.hud.setScore(this.demo ? null : 0);
    this.ctx.hud.setProgress(0);
    this.newRound(t);
  }

  // ------------------------------------------------------------------ Runden

  private newRound(t: number): void {
    const { ctx } = this;
    this.len = this.demo ? DEMO_LEN : this.backward ? this.bwdStair!.level : this.fwdStair.level;
    this.digits = makeDigits(ctx.rng, this.len);
    this.entered = [];
    this.ok = false;
    this.phase = 'ready';
    this.phaseT = t;
    this.tickIdx = 0;
    this.lastTap = { k: '', t: -1e9 };
    this.pressed = { i: -1, t: -1e9 };
    this.plannedFor = -1;
    if (this.demo) ctx.hud.caption(ctx.texts.captions.watch);
    else ctx.hud.setLabel(`${ctx.texts.feedback.round} ${this.roundNo + 1}/${this.total}`);
  }

  private startShow(t: number): void {
    this.phase = 'show';
    this.phaseT = t;
    this.showT0 = t + SHOW_LEAD_MS;
    this.showEnd = this.showT0 + showDurationMs(this.len) + SHOW_TAIL_MS;
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
    switch (this.phase) {
      case 'ready':
        if (t - this.phaseT >= READY_MS) this.startShow(t);
        break;
      case 'show':
        while (this.tickIdx < this.len && t >= this.showT0 + this.tickIdx * DIGIT_MS) {
          ctx.sfx.tick();
          this.tickIdx++;
        }
        if (t >= this.showEnd) this.startInput(t);
        break;
      case 'input':
        if (ctx.autoplay && this.plannedFor !== this.roundNo) this.planGhost();
        break;
      case 'result': {
        const dur = this.demo ? 1300 : this.ok ? RESULT_OK_MS : RESULT_BAD_MS;
        if (t - this.phaseT >= dur) this.afterRound(t);
        break;
      }
      case 'end':
        if (t - this.phaseT >= DEMO_END_MS) {
          this.phase = 'done';
          ctx.finish({ primary: { key: 'span', value: DEMO_LEN, unit: 'count', better: 'higher' }, secondary: [], score: 0, level: MIN_LEN });
        }
        break;
      default:
        break;
    }
  }

  private afterRound(t: number): void {
    const { ctx } = this;
    this.roundNo++;
    if (this.demo) {
      this.phase = 'end';
      this.phaseT = t;
      ctx.ghost.moveTo(ctx.stage.w * 0.06, ctx.stage.h * 0.3, { delay: 100, move: 600 });
      return;
    }
    if (!this.backward) {
      this.fwdDone++;
      if (this.fwdDone >= this.fwdTotal) {
        if (playsBackward(this.bestFwd, ctx.quick)) {
          this.backward = true;
          this.bwdStair = createBackwardStaircase(this.bestFwd);
        } else {
          this.finish();
          return;
        }
      }
    } else {
      this.bwdDone++;
      if (this.bwdDone >= this.bwdTotal) {
        this.finish();
        return;
      }
    }
    this.newRound(t);
  }

  // ------------------------------------------------------------------ Layout

  private layout(): Layout {
    const { w, h, u } = this.ctx.stage;
    const key = `${w}x${h}:${this.len}:${this.demo ? 1 : 0}`;
    if (this.lay && key === this.layKey) return this.lay;
    const side = Math.max(12, u * 3);
    const top = Math.max(8, u * 2);
    const statusPx = clamp(u * 4.4, 16, 34);
    const statusY = top + statusPx * 0.6;
    const bottom = this.demo ? captionReserve(this.ctx.stage) : Math.max(12, u * 3);
    const gap = Math.max(8, u * 1.6);
    const bodyTop = statusY + statusPx * 1.1;
    const bodyH = Math.max(1, h - bodyTop - bottom);
    const wide = w >= h * 1.25;
    // Bereiche: Anzeige/Eingabefelder und Zahlenfeld
    let dispX = side;
    let dispW = w - 2 * side;
    let dispY = bodyTop;
    let dispH = bodyH * 0.3;
    let padX = side;
    let padW = w - 2 * side;
    let padY = bodyTop + dispH + gap;
    let padH = bodyH - dispH - gap;
    if (wide) {
      dispX = side;
      dispW = (w - 3 * side) * 0.46;
      dispY = bodyTop;
      dispH = bodyH;
      padX = side * 2 + dispW;
      padW = w - padX - side;
      padY = bodyTop;
      padH = bodyH;
    }
    // Zahlenfeld: 3 Spalten × 4 Reihen, Tasten mindestens 56 px
    const bw = clamp((padW - 2 * gap) / 3, 56, 132);
    const bh = clamp(Math.min((padH - 3 * gap) / 4, bw * 0.82), 56, 110);
    const kw = bw * 3 + gap * 2;
    const kh = bh * 4 + gap * 3;
    const kx = padX + (padW - kw) / 2;
    const ky = padY + Math.max(0, padH - kh) / 2;
    const keys: Rect[] = KEYS.map((_, i) => ({ x: kx + (i % 3) * (bw + gap), y: ky + Math.floor(i / 3) * (bh + gap), w: bw, h: bh }));
    // Eingabefelder (ggf. in zwei Reihen)
    const sw0 = clamp(u * 8, 34, 66);
    const perRowMax = Math.max(1, Math.floor((dispW + gap) / (sw0 + gap)));
    const rows = Math.ceil(this.len / perRowMax);
    const perRow = Math.ceil(this.len / rows);
    const sw = Math.min(sw0, (dispW - (perRow - 1) * gap) / perRow);
    const sh = sw * 1.3;
    const blockH = rows * sh + (rows - 1) * gap;
    const cy0 = dispY + (wide ? Math.max(0, dispH * 0.5 - blockH - gap * 3) : Math.max(0, (dispH - blockH) * 0.4));
    const slots: Rect[] = [];
    for (let i = 0; i < this.len; i++) {
      const r = Math.floor(i / perRow);
      const inRow = Math.min(perRow, this.len - r * perRow);
      const x0 = dispX + (dispW - (inRow * sw + (inRow - 1) * gap)) / 2;
      slots.push({ x: x0 + (i - r * perRow) * (sw + gap), y: cy0 + r * (sh + gap), w: sw, h: sh });
    }
    const slotPx = sh * 0.6;
    const answerY = cy0 + blockH + Math.max(gap * 2.2, sh * 0.6);
    this.layKey = key;
    this.lay = { statusY, statusPx, cx: w / 2, cy: bodyTop + bodyH / 2, keys, gap, slots, slotPx, answerY };
    return this.lay;
  }

  resize(): void {
    this.lay = null;
    if (this.ctx.autoplay) {
      this.ctx.ghost.clear();
      this.plannedFor = -1;
    }
  }

  // ------------------------------------------------------------------ Eingabe

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'input') return;
    const L = this.layout();
    let best = -1;
    let bestD = Infinity;
    for (let i = 0; i < L.keys.length; i++) {
      const r = L.keys[i];
      if (!hit(r, p.x, p.y, L.gap / 2)) continue;
      const d = Math.hypot(p.x - (r.x + r.w / 2), p.y - (r.y + r.h / 2));
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    if (best >= 0) this.handleKey(KEYS[best], best, p.t);
  }

  keyDown(key: string, t: number): void {
    if (this.phase !== 'input') return;
    if (key === 'Enter') this.handleKey('ok', KEYS.indexOf('ok'), t);
    else if (/^[1-9]$/.test(key)) this.handleKey(Number(key), KEYS.indexOf(Number(key)), t);
  }

  private handleKey(k: Key, idx: number, t: number): void {
    const id = String(k);
    // Doppel-Tipp ignorieren (dieselbe Ziffer steht nie direkt zweimal hintereinander; Löschen darf wiederholt werden)
    if (k !== 'del' && id === this.lastTap.k && t - this.lastTap.t < DOUBLE_TAP_MS) return;
    this.lastTap = { k: id, t };
    this.pressed = { i: idx, t };
    if (k === 'del') {
      if (this.entered.length) this.entered.pop();
      this.ctx.sfx.tap();
    } else if (k === 'ok') {
      if (this.entered.length >= this.len) this.evaluate(t);
    } else if (this.entered.length < this.len) {
      this.entered.push(k);
      this.ctx.sfx.tap();
    }
  }

  private evaluate(t: number): void {
    const { ctx } = this;
    const ok = isCorrect(this.entered, this.digits, this.backward);
    this.ok = ok;
    this.phase = 'result';
    this.phaseT = t;
    ctx.ghost.clear();
    if (ok) ctx.sfx.good();
    else ctx.sfx.bad();
    const L = this.layout();
    ctx.hud.toast(ok ? ctx.texts.feedback.right : ctx.texts.feedback.wrong, ok ? 'good' : 'info', { y: L.statusY, ms: this.demo ? 1100 : ok ? 900 : 1700 });
    if (this.demo) {
      ctx.hud.caption(ctx.texts.captions.longer);
      return;
    }
    const exp = expected(this.digits, this.backward);
    this.matched += this.entered.filter((d, i) => d === exp[i]).length;
    const stair = this.backward ? this.bwdStair! : this.fwdStair;
    stair.update(ok);
    if (ok) {
      this.correct++;
      this.points += this.len * (this.backward ? 12 : 10);
      if (this.backward) this.bestBwd = Math.max(this.bestBwd, this.len);
      else this.bestFwd = Math.max(this.bestFwd, this.len);
      ctx.hud.setScore(this.points);
    } else {
      this.wrong++;
      if (this.backward) this.wrongBwd++;
      else this.wrongFwd++;
      if ([...this.entered].sort().join() === [...exp].sort().join()) this.swapped++;
    }
    this.progress = Math.max(this.progress, (this.roundNo + 1) / this.total);
    ctx.hud.setProgress(this.progress);
  }

  // ------------------------------------------------------------------ Autoplay (Demo und Tests)

  private planGhost(): void {
    const { ghost, rng } = this.ctx;
    this.plannedFor = this.roundNo;
    const L = this.layout();
    const center = (k: Key) => {
      const r = L.keys[KEYS.indexOf(k)];
      return { x: r.x + r.w / 2, y: r.y + r.h / 2 };
    };
    const exp = expected(this.digits, this.backward);
    const from = this.entered.length;
    if (this.demo) {
      for (let i = from; i < this.len; i++) {
        const c = center(exp[i]);
        ghost.tap(c.x, c.y, { delay: i === 0 ? 600 : 300, move: i === 0 ? 700 : 500 });
      }
      const ok = center('ok');
      ghost.tap(ok.x, ok.y, { delay: 350, move: 550 });
      return;
    }
    // Spielmodus (nur Tests): meist richtig, je länger, desto öfter eine falsche Ziffer
    const wrongAt = rng.chance(clamp(0.05 * (this.len - 2), 0, 0.6)) ? rng.int(this.len) : -1;
    for (let i = from; i < this.len; i++) {
      let d = exp[i];
      if (i === wrongAt) d = (d + 1 + rng.int(9)) % 10;
      const c = center(d);
      ghost.tap(c.x + rng.range(-0.15, 0.15) * L.keys[0].w, c.y + rng.range(-0.15, 0.15) * L.keys[0].h, { delay: rng.range(200, 400), move: 260 });
    }
    const ok = center('ok');
    ghost.tap(ok.x, ok.y, { delay: rng.range(250, 500), move: 280 });
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    if (!this.digits.length) return;
    const L = this.layout();
    this.drawStatus(g, L);
    if (this.phase === 'ready' || this.phase === 'show') this.drawShow(g, L, t);
    else if (this.phase === 'input' || this.phase === 'result' || this.phase === 'end') {
      this.drawSlots(g, L);
      this.drawKeys(g, L, t);
    }
  }

  private drawStatus(g: CanvasRenderingContext2D, L: Layout): void {
    const { w } = this.ctx.stage;
    const f = this.ctx.texts.feedback;
    let label = '';
    if (this.phase === 'ready' || this.phase === 'show') label = this.backward ? f.watchBack : f.watch;
    else if (this.phase === 'input') label = this.backward ? f.inputBack : f.inputFwd;
    if (!label) return;
    text(g, label, w / 2, L.statusY, L.statusPx, this.phase === 'input' ? C.white : C.dim, { weight: 800 });
  }

  private drawShow(g: CanvasRenderingContext2D, L: Layout, t: number): void {
    const { w, h } = this.ctx.stage;
    const px = Math.min(w, h) * 0.42;
    const cy = L.cy;
    if (this.phase === 'show') {
      const idx = Math.floor((t - this.showT0) / DIGIT_MS);
      if (idx >= 0 && idx < this.len) {
        const a = digitAlpha(t - this.showT0 - idx * DIGIT_MS);
        if (a > 0.005) text(g, String(this.digits[idx]), L.cx, cy, px, C.white, { weight: 800, alpha: a });
      }
    }
    // Punkte: wie viele Ziffern kommen, welche gerade läuft
    const d = clamp(Math.min(w, h) * 0.022, 6, 14);
    const step = d * 2.6;
    const x0 = L.cx - (step * (this.len - 1)) / 2;
    const idxNow = this.phase === 'show' ? Math.floor((t - this.showT0) / DIGIT_MS) : -1;
    for (let i = 0; i < this.len; i++) {
      const cx = x0 + i * step;
      const y = cy + px * 0.62;
      if (i <= idxNow) {
        g.save();
        g.beginPath();
        g.arc(cx, y, d * 0.5, 0, Math.PI * 2);
        g.fillStyle = i === idxNow ? C.white : C.dim;
        g.fill();
        g.restore();
      } else ring(g, cx, y, d * 0.5, 'rgba(232,238,247,0.35)', 2);
    }
  }

  private drawSlots(g: CanvasRenderingContext2D, L: Layout): void {
    const res = this.phase !== 'input';
    const exp = expected(this.digits, this.backward);
    for (let i = 0; i < this.len; i++) {
      const r = L.slots[i];
      const isCur = this.phase === 'input' && i === this.entered.length;
      const d = this.entered[i];
      fillRR(g, r.x, r.y, r.w, r.h, r.w * 0.16, 'rgba(255,255,255,0.08)');
      g.save();
      rrPath(g, r.x + 1, r.y + 1, r.w - 2, r.h - 2, r.w * 0.16);
      g.strokeStyle = isCur ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.22)';
      g.lineWidth = isCur ? 3 : 1.5;
      g.stroke();
      g.restore();
      if (d !== undefined) text(g, String(d), r.x + r.w / 2, r.y + r.h / 2 + L.slotPx * 0.04, L.slotPx, C.white, { weight: 800 });
      if (res) {
        const good = d === exp[i];
        const cx = r.x + r.w / 2;
        const cy = r.y + r.h + r.w * 0.32;
        const s = r.w * 0.17;
        g.save();
        g.lineWidth = Math.max(2.5, r.w * 0.07);
        g.lineCap = 'round';
        g.lineJoin = 'round';
        g.strokeStyle = good ? C.good : C.fg;
        g.beginPath();
        if (good) {
          g.moveTo(cx - s, cy);
          g.lineTo(cx - s * 0.3, cy + s * 0.7);
          g.lineTo(cx + s, cy - s * 0.7);
        } else {
          g.moveTo(cx - s, cy - s);
          g.lineTo(cx + s, cy + s);
          g.moveTo(cx + s, cy - s);
          g.lineTo(cx - s, cy + s);
        }
        g.stroke();
        g.restore();
      }
    }
    if (this.phase === 'result' && !this.ok) {
      const f = this.ctx.texts.feedback;
      const label = `${f.answer} ${expected(this.digits, this.backward).join(' ')}`;
      const first = L.slots[0];
      const last = L.slots[this.len - 1];
      text(g, label, (first.x + last.x + last.w) / 2, L.answerY + first.h * 0.4, clamp(L.slotPx * 0.62, 15, 30), C.fg, { weight: 700 });
    }
  }

  private drawKeys(g: CanvasRenderingContext2D, L: Layout, t: number): void {
    const inputOn = this.phase === 'input';
    const full = this.entered.length >= this.len;
    for (let i = 0; i < KEYS.length; i++) {
      const k = KEYS[i];
      const r = L.keys[i];
      const pressed = inputOn && this.pressed.i === i && t - this.pressed.t < PRESS_MS;
      let state: ButtonState = pressed ? 'active' : 'normal';
      if (!inputOn) state = 'disabled';
      else if (k === 'ok' && !full) state = 'disabled';
      else if (k === 'del' && !this.entered.length) state = 'disabled';
      if (k === 'ok' && inputOn && full) {
        fillRR(g, r.x, r.y, r.w, r.h, Math.min(r.w, r.h) * 0.22, withAlpha(ACCENT, pressed ? 1 : 0.85));
      } else button(g, r, state);
      const cx = r.x + r.w / 2;
      const cy = r.y + r.h / 2;
      const dim = state === 'disabled';
      const col = dim ? 'rgba(232,238,247,0.3)' : C.white;
      const px = Math.min(r.h * 0.5, r.w * 0.5);
      if (typeof k === 'number') {
        text(g, String(k), cx, cy + px * 0.04, px, col, { weight: 800 });
      } else if (k === 'ok') {
        g.save();
        g.strokeStyle = col;
        g.lineWidth = Math.max(3, px * 0.14);
        g.lineCap = 'round';
        g.lineJoin = 'round';
        g.beginPath();
        g.moveTo(cx - px * 0.4, cy + px * 0.02);
        g.lineTo(cx - px * 0.1, cy + px * 0.32);
        g.lineTo(cx + px * 0.45, cy - px * 0.3);
        g.stroke();
        g.restore();
      } else {
        // Löschen: Pfeil-Schild mit Kreuz
        const a = px * 0.5;
        g.save();
        g.strokeStyle = col;
        g.lineWidth = Math.max(2.5, px * 0.1);
        g.lineCap = 'round';
        g.lineJoin = 'round';
        g.beginPath();
        g.moveTo(cx - a * 1.05, cy);
        g.lineTo(cx - a * 0.3, cy - a * 0.72);
        g.lineTo(cx + a * 1.0, cy - a * 0.72);
        g.lineTo(cx + a * 1.0, cy + a * 0.72);
        g.lineTo(cx - a * 0.3, cy + a * 0.72);
        g.closePath();
        g.moveTo(cx - a * 0.05, cy - a * 0.28);
        g.lineTo(cx + a * 0.6, cy + a * 0.28);
        g.moveTo(cx + a * 0.6, cy - a * 0.28);
        g.lineTo(cx - a * 0.05, cy + a * 0.28);
        g.stroke();
        g.restore();
      }
    }
  }

  // ------------------------------------------------------------------ Ergebnis

  private finish(): void {
    const { ctx } = this;
    this.phase = 'done';
    ctx.ghost.clear();
    let tip = 'great';
    if (this.wrong) {
      if (this.wrongBwd > 0 && this.wrongBwd >= this.wrongFwd) tip = 'back';
      else if (this.swapped > 0) tip = 'group';
      else tip = 'say';
    }
    ctx.sfx.done();
    ctx.finish({
      primary: { key: 'span', value: this.bestFwd, unit: 'count', better: 'higher' },
      secondary: [
        { key: 'correct', value: this.correct, unit: 'count' },
        { key: 'matched', value: this.matched, unit: 'count' },
        ...(this.bwdDone > 0 ? [{ key: 'backSpan', value: this.bestBwd, unit: 'count' as const }] : []),
      ],
      score: this.points,
      level: nextStartLevel(this.fwdStair.threshold(), MIN_LEN, MAX_LEN, 1),
      tip,
    });
  }
}

export const zahlenspanne: ExerciseDefinition = {
  id: 'zahlenspanne',
  category: 'gedaechtnis',
  minutes: 2,
  color: '#2B8A99',
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="5" width="36" height="38" rx="6"/></g><g fill="currentColor"><circle cx="16" cy="15" r="3"/><circle cx="24" cy="15" r="3"/><circle cx="32" cy="15" r="3"/><circle cx="16" cy="24" r="3"/><circle cx="24" cy="24" r="3"/><circle cx="32" cy="24" r="3"/><circle cx="16" cy="33" r="3"/><circle cx="24" cy="33" r="3" opacity=".45"/><circle cx="32" cy="33" r="3"/></g>',
  texts: { de, it },
  create: (ctx) => new Zahlenspanne(ctx),
};
