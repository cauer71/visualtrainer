/**
 * Wortstrom – ein vorher genanntes Zielwort im ruhigen Wortstrom wiedererkennen und antippen.
 *
 * Vorbild: „Schnelllesetest / RSVP-Lesetraining“ (Katalog 203), im Katalog bewusst NICHT übernommen,
 * weil das Schnelllese-Versprechen nicht belegt ist (Rayner et al. 2016). Diese Fassung ist ehrlich:
 * Wörter erscheinen einzeln in der Mitte, weich ein- und ausgeblendet (keine Blitze), mit realistischer
 * Anzeigedauer (Start 700 ms, niedrigstens 350 ms) und höchstens 2,5 Wörtern pro Sekunde. Das
 * Antwortfenster ist nie kürzer als 600 ms. Es wird KEIN Leseverständnis und kein Lesetempo gemessen –
 * nur, ob man ein bekanntes Wort im Strom wiedererkennt.
 *
 * - Durchgang: Zielwort groß zeigen (≈ 2 s), kurze Ruhe, Wortstrom (8–10 Wörter, Ziel genau einmal, mit
 *   je ≥ 2 Wörtern davor und danach), Tipp irgendwo = „da ist es“. Wortlisten DE/IT aus „Wortliste“.
 * - Stufe 1–12 (2-down/1-up): Anzeigedauer 700 → 350 ms, Antwortfenster 1,4 → 0,7 s, ab Stufe 7 viele
 *   gleich lange Wörter im Strom. Geschafft = Zielwort im Fenster getippt, sonst kein Tipp zu viel.
 * - Fehlalarm = Tipp außerhalb des Fensters (weiches ✗). Feste Zahl an Durchgängen, keine Zeitstrafe.
 * - Hauptwert = Stufe; dazu gefundene Zielwörter, Fehlalarme, Median der Zeit bis zum Tipp und die
 *   Anzeigedauer der erreichten Stufe. Keine „Wörter pro Minute“, kein Lesetest.
 */
import { background, circle, fillRR, rrPath } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { captionTop, drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import {
  buildTrial,
  computeStats,
  DOUBLE_TAP_MS,
  isHit,
  levelOf,
  MAX_LEVEL,
  MIN_LEVEL,
  pointsFor,
  showMsFor,
  slotAt,
  soaMs,
  streamWords,
  tipFor,
  type Trial,
  windowMs,
  wordAlpha,
} from './logic';
import { de, it } from './texts';

const TRIALS = 8;
const QUICK_TRIALS = 2;
const ANNOUNCE_MS = 2200;
const QUICK_ANNOUNCE_MS = 1100;
const READY_MS = 700;
const QUICK_READY_MS = 400;
const TAIL_MS = 300;
const FB_MS = 900;
const FIRST_MS = 900;
const MARK_MS = 800;
const ANN_FADE_MS = 160;

const INK = '#E8EEF7';
const WARM = '#FBBF24';

interface Mark {
  kind: 'good' | 'bad';
  t0: number;
}

interface Timeline {
  trial: Trial;
  lvl: number;
  start: number;
  streamStart: number;
  soa: number;
  show: number;
  window: number;
  targetOnset: number;
  streamEnd: number;
  end: number;
  hit: boolean;
  hitRt: number;
  falseAlarms: number;
  plannedHit: boolean;
  plannedFa: boolean;
  faIdx: number;
}

class Wortstrom implements Exercise {
  private readonly demo: boolean;
  private readonly total: number;
  private readonly stair: Staircase;
  private readonly words: readonly string[];
  private readonly used = new Set<string>();
  private tl: Timeline | null = null;
  private marks: Mark[] = [];
  private trialsDone = 0;
  private nextAt = 0;
  private endAt = Infinity;
  private endT = Infinity;
  private done = false;
  private lastTapT = -1e9;
  private pressAt = -1e9;
  private autoBusyUntil = 0;
  private capShown = 0;

  private hits = 0;
  private falseAlarms = 0;
  private points = 0;
  private rts: number[] = [];

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.total = this.demo ? 1 : ctx.quick ? QUICK_TRIALS : TRIALS;
    this.words = streamWords(ctx.lang);
    this.stair = new Staircase({ start: ctx.startLevel ?? MIN_LEVEL, min: MIN_LEVEL, max: MAX_LEVEL, down: 2, up: 1 });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private hs(): number {
    return clamp(this.ctx.stage.u * 13, 48, 110);
  }

  private button(): { x: number; y: number; w: number; h: number } {
    const s = this.ctx.stage;
    const bh = clamp(s.u * 11, 56, 96);
    const bw = Math.min(s.w * 0.8, 520);
    const bottom = this.demo ? captionTop(s) - this.hs() * 0.35 - 8 : s.h - Math.max(14, s.u * 2.5);
    return { x: (s.w - bw) / 2, y: bottom - bh, w: bw, h: bh };
  }

  private wordCenterY(): number {
    const s = this.ctx.stage;
    const top = Math.max(84, s.u * 14);
    return (top + this.button().y) / 2;
  }

  private restPoint(): { x: number; y: number } {
    const b = this.button();
    return { x: b.x + b.w * 0.88, y: b.y + b.h * 0.55 };
  }

  private level(): number {
    return this.demo ? MIN_LEVEL : levelOf(this.stair.level);
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    this.nextAt = t + (this.demo ? 500 : FIRST_MS);
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateLabel();
    if (this.demo) {
      const r = this.restPoint();
      ghost.moveTo(r.x, r.y, { move: 0 });
    }
  }

  update(_dt: number, t: number): void {
    if (this.done) return;
    if (t >= this.endAt) {
      this.finishSession(t);
      return;
    }
    if (!this.tl && this.trialsDone < this.total && t >= this.nextAt) this.startTrial(t);
    const tl = this.tl;
    if (tl) {
      if (t >= tl.end) this.endTrial(t);
      else {
        if (this.demo) this.demoCaptions(t, tl);
        if (this.ctx.autoplay) this.autoUpdate(t, tl);
      }
    }
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
  }

  private startTrial(t: number): void {
    const { rng, quick } = this.ctx;
    const lvl = this.level();
    const trial = buildTrial(rng, this.words, lvl, this.used);
    this.used.add(trial.target);
    if (this.used.size >= this.words.length - 12) this.used.clear();
    const ann = quick ? QUICK_ANNOUNCE_MS : ANNOUNCE_MS;
    const ready = quick ? QUICK_READY_MS : READY_MS;
    const soa = soaMs(lvl);
    const streamStart = t + ann + ready;
    const targetOnset = streamStart + trial.targetIndex * soa;
    const streamEnd = streamStart + trial.words.length * soa;
    const window = windowMs(lvl);
    // Fehlalarm-Tipp im Autoplay: bei einem Wort deutlich vor dem Zielwort
    const faIdx = !this.demo && trial.targetIndex >= 2 && this.ctx.rng.chance(0.07) ? this.ctx.rng.int(trial.targetIndex - 1) : -1;
    this.tl = {
      trial,
      lvl,
      start: t,
      streamStart,
      soa,
      show: showMsFor(lvl),
      window,
      targetOnset,
      streamEnd,
      end: Math.max(streamEnd, targetOnset + window) + TAIL_MS,
      hit: false,
      hitRt: -1,
      falseAlarms: 0,
      plannedHit: false,
      plannedFa: false,
      faIdx,
    };
    this.capShown = 0;
    this.updateLabel();
  }

  /** Bildunterschriften im Intro-Film: Zielwort – Strom – jetzt tippen */
  private demoCaptions(t: number, tl: Timeline): void {
    const { hud, texts } = this.ctx;
    if (this.capShown < 1 && t >= tl.start) {
      hud.caption(texts.captions.target);
      this.capShown = 1;
    } else if (this.capShown < 2 && t >= tl.streamStart) {
      hud.caption(texts.captions.stream);
      this.capShown = 2;
    } else if (this.capShown < 3 && t >= tl.targetOnset) {
      hud.caption(texts.captions.tap);
      this.capShown = 3;
    }
  }

  /** Intro-Film und Autoplay: die Geister-Hand tippt auf den Knopf, wenn das Zielwort erscheint */
  private autoUpdate(t: number, tl: Timeline): void {
    const { ghost, rng } = this.ctx;
    if (!ghost.idle || t < this.autoBusyUntil) return;
    const b = this.button();
    const cx = b.x + b.w / 2;
    const cy = b.y + b.h / 2;
    if (!tl.plannedFa && tl.faIdx >= 0 && t >= tl.streamStart + tl.faIdx * tl.soa) {
      tl.plannedFa = true;
      ghost.tap(cx + rng.normal() * 10, cy + rng.normal() * 5, { delay: rng.range(80, 160), move: rng.range(220, 300) });
      this.autoBusyUntil = t + 700;
      return;
    }
    if (!tl.plannedHit && t >= tl.targetOnset) {
      tl.plannedHit = true;
      if (this.demo) {
        ghost.tap(cx, cy, { delay: 350, move: 650 });
        return;
      }
      if (rng.chance(0.06)) return; // ausgelassen
      const delay = rng.range(110, 190);
      const move = rng.range(240, 320);
      ghost.tap(cx + rng.normal() * 10, cy + rng.normal() * 5, { delay, move });
      this.autoBusyUntil = t + delay + move + 200;
    }
  }

  // --- Eingabe ---

  pointerDown(p: PointerInfo): void {
    this.tap(p.t);
  }

  keyDown(key: string, t: number): void {
    if (key === ' ' || key === 'Enter') this.tap(t);
  }

  private tap(t: number): void {
    const tl = this.tl;
    if (this.done || !tl || t < tl.streamStart || t - this.lastTapT < DOUBLE_TAP_MS) return;
    this.lastTapT = t;
    this.pressAt = t;
    if (!tl.hit && isHit(t, tl.targetOnset, tl.window)) {
      tl.hit = true;
      tl.hitRt = t - tl.targetOnset;
      this.marks.push({ kind: 'good', t0: t });
      this.ctx.sfx.good();
      return;
    }
    if (tl.hit && t <= tl.targetOnset + tl.window) return; // zweiter Tipp zum selben Zielwort
    tl.falseAlarms++;
    this.marks.push({ kind: 'bad', t0: t });
    this.ctx.sfx.bad();
  }

  private endTrial(t: number): void {
    const { hud, texts, stage } = this.ctx;
    const tl = this.tl!;
    this.tl = null;
    this.trialsDone++;
    this.nextAt = t + FB_MS;
    const size = clamp(stage.u * 5, 18, 34);
    const x = stage.w / 2;
    const y = this.wordCenterY();
    if (!this.demo) {
      if (tl.hit) {
        this.hits++;
        this.rts.push(tl.hitRt);
        this.points += pointsFor(tl.lvl, tl.hitRt, tl.window);
      }
      this.falseAlarms += tl.falseAlarms;
      this.stair.update(tl.hit && tl.falseAlarms === 0);
      hud.setProgress(clamp(this.trialsDone / this.total, 0, 1));
      hud.setScore(this.points);
    }
    if (tl.hit) hud.toast(`✓ ${texts.feedback.found}`, 'good', { x, y, ms: 800, size });
    else hud.toast(`✗ ${texts.feedback.notFound}: ${tl.trial.target}`, 'info', { x, y, ms: 1400, size });
    this.updateLabel();
    if (this.trialsDone >= this.total) this.endAt = t + FB_MS;
  }

  private updateLabel(): void {
    if (this.demo) return;
    this.ctx.hud.setLabel(`${this.ctx.texts.feedback.level} ${this.level()}`);
  }

  // -------------------------------------------------------------------------

  private finishSession(t: number): void {
    this.done = true;
    this.endT = t;
    this.ctx.hud.setProgress(1);
    const s = computeStats(this.trialsDone, this.hits, this.falseAlarms, this.rts);
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' },
        secondary: [{ key: 'hits', value: 1, unit: 'count' }],
        score: 0,
        level: MIN_LEVEL,
      });
      return;
    }
    this.ctx.sfx.done();
    const thr = this.stair.threshold();
    const lvl = clamp(Math.round(thr), MIN_LEVEL, MAX_LEVEL);
    const secondary = [
      { key: 'hits', value: s.hits, unit: 'count' as const },
      { key: 'falseAlarms', value: s.falseAlarms, unit: 'count' as const },
      ...(Number.isFinite(s.medianMs) ? [{ key: 'median', value: Math.round(s.medianMs), unit: 'time' as const }] : []),
      { key: 'showMs', value: showMsFor(lvl), unit: 'ms' as const },
    ];
    this.ctx.finish({
      primary: { key: 'level', value: lvl, unit: 'level', better: 'higher' },
      secondary,
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip: tipFor(s),
    });
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, now: number): void {
    const t = Math.min(now, this.endT);
    const { w, h, u, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    const tl = this.tl;
    const cy = this.wordCenterY();
    if (tl) {
      const ann = tl.streamStart - tl.start - (this.ctx.quick ? QUICK_READY_MS : READY_MS);
      const tt = t - tl.start;
      if (tt < ann) this.drawAnnounce(g, tl, tt, ann, cy, u);
      else {
        this.drawReminder(g, tl, u);
        if (t < tl.streamStart) {
          // Ruhe vor dem Strom: kleiner Punkt als Blickpunkt, sanft ein- und ausgeblendet
          const k = clamp((t - (tl.start + ann)) / 240, 0, 1);
          g.save();
          g.globalAlpha = 0.6 * k;
          circle(g, w / 2, cy, Math.max(4, u * 0.8), INK);
          g.restore();
        } else {
          const slot = slotAt(t - tl.streamStart, tl.soa, tl.trial.words.length);
          if (slot.index >= 0) {
            const a = wordAlpha(slot.tau, tl.show);
            if (a > 0.005) this.drawWord(g, tl.trial.words[slot.index], cy, a, u);
          }
        }
      }
    }
    this.drawButton(g, t);
    for (const m of this.marks) {
      const a = markAlpha(t - m.t0, MARK_MS);
      const b = this.button();
      const s = Math.max(12, u * 3);
      const y = b.y - s * 1.6;
      if (m.kind === 'bad') drawSoftCross(g, w / 2, y, s, a, WARM);
      else drawSoftCheck(g, w / 2, y, s, a);
    }
  }

  /** Großes Wort in der Mitte; wird bei Bedarf verkleinert, damit es in die Breite passt */
  private drawWord(g: CanvasRenderingContext2D, word: string, cy: number, alpha: number, u: number): void {
    const { w } = this.ctx.stage;
    let size = clamp(u * 9.5, 34, 104);
    g.save();
    g.globalAlpha = alpha;
    g.font = `800 ${Math.round(size)}px system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;
    const tw = g.measureText(word).width;
    if (tw > w * 0.9) {
      size *= (w * 0.9) / tw;
      g.font = `800 ${Math.round(size)}px system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;
    }
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillStyle = INK;
    g.fillText(word, w / 2, cy);
    g.restore();
  }

  /** Vorab: Zielwort groß mit Erklärung, weich ein- und ausgeblendet */
  private drawAnnounce(g: CanvasRenderingContext2D, tl: Timeline, tt: number, ann: number, cy: number, u: number): void {
    const { w } = this.ctx.stage;
    const { texts } = this.ctx;
    const a = Math.min(clamp(tt / ANN_FADE_MS, 0, 1), clamp((ann - tt) / ANN_FADE_MS, 0, 1));
    const small = clamp(u * 3.8, 15, 28);
    g.save();
    g.globalAlpha = a;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.font = `700 ${Math.round(small)}px system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;
    g.fillStyle = 'rgba(232,238,247,0.7)';
    g.fillText(texts.feedback.announce, w / 2, cy - clamp(u * 12, 48, 110));
    g.fillText(texts.feedback.announceHint, w / 2, cy + clamp(u * 12, 48, 110));
    g.restore();
    this.drawWord(g, tl.trial.target, cy, a, u);
  }

  /** Während des Stroms: kleine Erinnerung an das Zielwort oben */
  private drawReminder(g: CanvasRenderingContext2D, tl: Timeline, u: number): void {
    const { w } = this.ctx.stage;
    const size = clamp(u * 3.6, 15, 26);
    g.save();
    g.font = `700 ${Math.round(size)}px system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillStyle = 'rgba(232,238,247,0.6)';
    g.fillText(`${this.ctx.texts.feedback.target}: ${tl.trial.target}`, w / 2, Math.max(62, u * 11));
    g.restore();
  }

  private drawButton(g: CanvasRenderingContext2D, t: number): void {
    const b = this.button();
    const { u } = this.ctx.stage;
    const pressed = t - this.pressAt < 160 && t >= this.pressAt;
    g.save();
    fillRR(g, b.x, b.y, b.w, b.h, b.h * 0.3, pressed ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.12)');
    rrPath(g, b.x + 0.5, b.y + 0.5, b.w - 1, b.h - 1, b.h * 0.3);
    g.strokeStyle = 'rgba(255,255,255,0.3)';
    g.lineWidth = 1.5;
    g.stroke();
    const size = clamp(u * 4.2, 17, 30);
    g.font = `800 ${Math.round(size)}px system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillStyle = INK;
    g.fillText(this.ctx.texts.feedback.tapHere, b.x + b.w / 2, b.y + b.h / 2);
    g.restore();
  }
}

export const wortstrom: ExerciseDefinition = {
  id: 'wortstrom',
  category: 'konzentration',
  minutes: 2,
  color: '#7A5195',
  icon:
    '<rect x="3" y="18" width="10" height="12" rx="3" fill="none" stroke="currentColor" stroke-width="2.4" opacity=".4"/><rect x="15" y="14" width="18" height="20" rx="4" fill="none" stroke="currentColor" stroke-width="3"/><path d="M20 24h8M20 28h5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><rect x="35" y="18" width="10" height="12" rx="3" fill="none" stroke="currentColor" stroke-width="2.4" opacity=".4"/><path d="M24 5v5m-3-2l3 3 3-3" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 41h16" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new Wortstrom(ctx),
};
