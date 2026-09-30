/**
 * Pendel-Fang – ein Ziel schwingt auf einer Linie hin und her; getippt wird, wenn es im
 * markierten Fangbereich in der Mitte ist.
 *
 * Abgrenzung: Zielfang (Ziel bewegt sich frei über die Fläche und wird direkt angetippt), Fünf Türen
 * und Blicksprung-Galerie (Ort erkennen) und Fallende Ziele (Ziele früh fangen). Hier ist der Ort
 * bekannt – es zählt allein der richtige Moment. Das Ziel schwingt gleichmäßig (Sinus), man kann
 * die Bewegung also vorausahnen; getippt wird irgendwo auf der Bühne, nicht auf das Ziel.
 *
 * - Bewegung: x = A · sin(φ), Phase φ wächst mit dt (bildratenunabhängig); Stufenwechsel werden
 *   weich übergeblendet (Tempo, Weite und Fangbereich ändern sich nie sprunghaft).
 * - Stufe (Staircase, 2-down/1-up → ≈ 71 % Treffer): Tempo (Schwingdauer 5,0 s → 2,8 s), Pendelweite
 *   (32 u → 44 u) und Breite des Fangbereichs (14 u → 7,5 u).
 * - Gewertet wird der erste Tipp je Versuch an der Phase zum Zeitpunkt des Tipps (p.t, nicht zur Bildzeit):
 *   Abweichung in ms zum Durchgang durch die Mitte (− = vor der Mitte/zu früh, + = dahinter/zu spät)
 *   und in % der Bahnbreite. Nach dem Tipp zeigt ein Ring, wo das Ziel war (✓ oder ✗, kein Blitz).
 * - Eine Sitzung hat 18 Versuche. Ohne Tipp zählt ein Versuch nach 1,6 Schwingungen als „nicht getippt“.
 * - Tastatur (Computer): Leertaste oder Enter tippt.
 * - Die Abweichung enthält auch die Verzögerung von Gerät und Finger; sie ist nur ein Vergleich mit dir
 *   selbst auf demselben Gerät.
 */
import { background, circle, glow, ring, rrPath, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo, ToastKind } from '../../core/types';
import {
  type TapSample,
  advancePhase,
  computeStats,
  gapMs,
  judgeTap,
  levelOf,
  MAX_LEVEL,
  MIN_LEVEL,
  nextCrossingMs,
  periodMs,
  pointsFor,
  posOf,
  QUICK_TRIALS,
  swingPx,
  timeoutMs,
  tipFor,
  TRIALS,
  windowMs,
  zonePx,
} from './logic';
import { de, it } from './texts';

const START_LEVEL = 2;
const MARK_MS = 1200;
const BURST_MS = 420;
/** Intro-Film: langsame Schwingung (4 s), Stufe 1; Versuch 3 kommt absichtlich zu früh */
const DEMO_PERIOD_MS = 4000;
const DEMO_GAP_MS = 900;
const DEMO_OFFSETS = [25, -30, -330];
const DEMO_CAPTIONS = ['wait', 'tap', 'tap'];
const DEMO_MOVE_MS = 650;

const BLUE = '#5AA9F0';
const BLUE_DARK = '#2F6FB5';
const BLUE_LIGHT = '#CFE6FF';
const WARM = '#FBBF24';

interface Result {
  /** Ort beim Tipp als Bruchteil der halben Bahn (−1…1) */
  frac: number;
  hit: boolean;
  t0: number;
}

interface Burst {
  frac: number;
  t0: number;
}

class PendelFang implements Exercise {
  private readonly demo: boolean;
  private readonly total: number;
  private readonly stair: Staircase;
  private phase = 0;
  private tPhi = 0;
  /** Sanft nachgeführte (gebrochene) Stufe: Tempo, Weite und Fangbereich gleiten beim Stufenwechsel */
  private lvlF: number;
  private state: 'cool' | 'ready' | 'done' = 'cool';
  private readyAt = 0;
  private readySince = 0;
  private planned = false;
  private attempts = 0;
  private resolved = 0;
  private lvlAtAttempt = MIN_LEVEL;
  private samples: TapSample[] = [];
  private none = 0;
  private points = 0;
  private results: Result[] = [];
  private bursts: Burst[] = [];
  private endAt = 0;
  private endT = Infinity;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.total = this.demo ? DEMO_OFFSETS.length : ctx.quick ? QUICK_TRIALS : TRIALS;
    this.stair = new Staircase({
      start: ctx.startLevel ?? START_LEVEL,
      min: MIN_LEVEL,
      max: MAX_LEVEL,
      down: 2,
      up: 1,
    });
    this.lvlF = this.demo ? MIN_LEVEL : levelOf(this.stair.level);
  }

  // --- Geometrie: immer live aus der Bühne ---

  private hs(): number {
    return clamp(this.ctx.stage.u * 13, 48, 110);
  }

  /** Höhe der Linie: im Intro-Film oberhalb von Hand und Bildunterschrift */
  private trackY(): number {
    const s = this.ctx.stage;
    return this.demo ? Math.max(s.h * 0.3, Math.min(s.h * 0.4, captionTop(s) - this.hs() * 2.3 - s.u * 12)) : s.h * 0.44;
  }

  private restPoint(): { x: number; y: number } {
    const { w } = this.ctx.stage;
    const hs = this.hs();
    return { x: w - hs * 0.75, y: captionTop(this.ctx.stage) - hs * 0.95 };
  }

  private targetR(): number {
    return clamp(this.ctx.stage.u * 3.4, 14, 34);
  }

  private amp(): number {
    const s = this.ctx.stage;
    return swingPx(this.lvlF, s.u, s.w, Math.max(14, s.u * 3) + this.targetR());
  }

  private zone(): number {
    return zonePx(this.lvlF, this.ctx.stage.u, this.amp());
  }

  private period(): number {
    return this.demo ? DEMO_PERIOD_MS : periodMs(this.lvlF);
  }

  /** Phase zu einer (virtuellen) Zeit: Phase der letzten Aktualisierung + Weiterlaufen bis dahin */
  private phaseAt(t: number): number {
    return this.phase + (2 * Math.PI * (t - this.tPhi)) / this.period();
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost, rng } = this.ctx;
    // Intro-Film: Ziel startet am linken Rand und schwingt nach rechts
    this.phase = this.demo ? -Math.PI / 2 : rng.range(0, Math.PI * 2);
    this.tPhi = t;
    this.state = 'cool';
    this.readyAt = t + (this.demo ? 700 : 1100);
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateLabel();
    if (this.demo) {
      hud.caption(this.ctx.texts.captions.watch);
      const r = this.restPoint();
      ghost.moveTo(r.x, r.y, { move: 0 });
    }
  }

  update(dt: number, t: number): void {
    if (this.state === 'done') return;
    // Stufe weich nachführen (gebrochene Stufe), dann Phase mit dt weiterdrehen
    if (!this.demo) this.lvlF += (levelOf(this.stair.level) - this.lvlF) * Math.min(1, dt * 1.6);
    this.phase = advancePhase(this.phase, dt, this.period());
    this.tPhi = t;
    if (this.state === 'cool' && t >= this.readyAt) {
      if (this.attempts >= this.total) {
        this.finishSession(t);
        return;
      }
      this.beginAttempt(t);
    }
    if (this.state === 'ready') {
      if (!this.demo && t - this.readySince >= timeoutMs(this.period())) this.noTap(t);
      else if (this.demo) this.demoPlan(t);
      else if (this.ctx.autoplay) this.autoUpdate(t);
    }
    this.prune(t);
    if (this.demo && this.endAt && t >= this.endAt) this.finishSession(t);
  }

  private beginAttempt(t: number): void {
    this.state = 'ready';
    this.readySince = t;
    this.planned = false;
    this.lvlAtAttempt = this.demo ? MIN_LEVEL : levelOf(this.stair.level);
    this.attempts++;
    this.updateLabel();
    if (this.demo) this.ctx.hud.caption(this.ctx.texts.captions[DEMO_CAPTIONS[this.attempts - 1]]);
  }

  /**
   * Hand (Intro-Film und Autoplay) so losschicken, dass der Tipp `offsetMs` nach dem nächsten
   * Durchgang durch die Mitte ankommt (negativ = davor).
   */
  private planTap(t: number, offsetMs: number, move: number, delayExtra = 0): void {
    const { ghost } = this.ctx;
    const period = this.period();
    let ahead = nextCrossingMs(this.phaseAt(t), period);
    // +16 ms: die Hand startet erst im nächsten Bild
    while (ahead + offsetMs - move - delayExtra - 16 < 0) ahead += period / 2;
    const s = this.ctx.stage;
    ghost.tap(s.w / 2, this.trackY() + this.targetR() * 5.4, { delay: ahead + offsetMs - move - delayExtra - 16, move });
    const r = this.restPoint();
    if (this.demo) ghost.moveTo(r.x, r.y, { delay: 250, move: 420 });
  }

  /** Autoplay (Tests): meist nahe der Mitte, manchmal daneben oder gar nicht */
  private autoUpdate(t: number): void {
    const { ghost, rng } = this.ctx;
    if (this.demo || this.planned || !ghost.idle) return;
    this.planned = true;
    if (rng.chance(0.04)) return;
    const win = windowMs(this.period(), this.amp(), this.zone());
    const bad = rng.chance(0.12);
    const off = bad ? (rng.chance(0.5) ? -1 : 1) * rng.range(win * 0.8, win * 1.8) : rng.normal() * win * 0.25;
    this.planTap(t, off, rng.range(200, 320), rng.range(0, 60));
  }

  /** Demo-Skript: Hand je Versuch einmal losschicken */
  private demoPlan(t: number): void {
    if (this.planned || !this.ctx.ghost.idle) return;
    this.planned = true;
    this.planTap(t, DEMO_OFFSETS[this.attempts - 1], DEMO_MOVE_MS);
  }

  /** Tastatur: Leertaste oder Enter tippt. */
  keyDown(key: string, t: number): void {
    if (key !== ' ' && key !== 'Enter') return;
    this.pointerDown({ id: -2, x: this.ctx.stage.w / 2, y: this.trackY(), t, type: 'mouse' });
  }

  pointerDown(p: PointerInfo): void {
    // In der Pause nach einem Versuch (z. B. zweiter Finger oder Doppeltipp) nichts werten
    if (this.state !== 'ready' || p.t < this.readySince) return;
    const amp = this.amp();
    const zone = this.zone();
    const phi = this.phaseAt(p.t);
    const j = judgeTap(phi, this.period(), amp, zone);
    this.resolve(p.t, j.hit, j.offsetMs, j.offsetPct, posOf(phi, amp) / amp, windowMs(this.period(), amp, zone));
  }

  private resolve(t: number, hit: boolean, offsetMs: number, offsetPct: number, frac: number, win: number): void {
    const { sfx, hud, fmt, texts, reducedMotion, stage } = this.ctx;
    this.samples.push({ hit, offsetMs, offsetPct });
    this.results.push({ frac, hit, t0: t });
    const s = stage;
    const cx = s.w / 2;
    const y = this.trackY();
    const r = this.targetR();
    if (hit) {
      this.points += pointsFor(this.lvlAtAttempt, offsetMs, win);
      sfx.good();
      if (!reducedMotion) this.bursts.push({ frac, t0: t });
      this.toastAt(`✓ ${fmt.msSigned(offsetMs)}`, 'good', cx, y - r * 3.2, 900, clamp(s.u * 4.2, 16, 32));
      hud.setScore(this.demo ? null : this.points);
    } else {
      sfx.bad();
      const word = offsetMs < 0 ? texts.feedback.early : texts.feedback.late;
      if (this.demo) hud.caption(texts.captions.early);
      this.toastAt(`✗ ${word}`, 'info', cx, y - r * 3.2, 900, clamp(s.u * 3.8, 15, 28));
    }
    if (!this.demo) this.stair.update(hit);
    this.afterResolve(t);
  }

  private noTap(t: number): void {
    const { stage, texts } = this.ctx;
    this.none++;
    this.toastAt(`✗ ${texts.feedback.none}`, 'info', stage.w / 2, this.trackY() - this.targetR() * 3.2, 900, clamp(stage.u * 3.8, 15, 28));
    if (!this.demo) this.stair.update(false);
    this.afterResolve(t);
  }

  private afterResolve(t: number): void {
    this.resolved++;
    this.state = 'cool';
    this.readyAt = t + (this.demo ? DEMO_GAP_MS : gapMs(this.ctx.rng));
    this.ctx.hud.setProgress(this.resolved / this.total);
    this.updateLabel();
    if (this.demo && this.resolved >= this.total) {
      this.endAt = t + 2400;
      this.readyAt = Infinity;
    }
  }

  private toastAt(text: string, kind: ToastKind, x: number, top: number, ms: number, size: number): void {
    const { w } = this.ctx.stage;
    const half = Math.min(w / 2, text.length * size * 0.3 + 8);
    this.ctx.hud.toast(text, kind, { x: clamp(x, half, w - half), y: Math.max(size * 1.1, top - size * 0.8), ms, size });
  }

  private updateLabel(): void {
    if (this.demo) return;
    this.ctx.hud.setLabel(`${this.ctx.texts.feedback.level} ${this.state === 'ready' ? this.lvlAtAttempt : levelOf(this.stair.level)}`);
  }

  private prune(t: number): void {
    if (this.results.length) this.results = this.results.filter((m) => t - m.t0 < MARK_MS);
    if (this.bursts.length) this.bursts = this.bursts.filter((b) => t - b.t0 < BURST_MS);
  }

  // -------------------------------------------------------------------------

  private finishSession(t: number): void {
    this.state = 'done';
    this.endT = t;
    const { sfx, hud } = this.ctx;
    hud.setProgress(1);
    const stats = computeStats(this.samples, this.none);
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' },
        secondary: [{ key: 'hitRate', value: Math.round(stats.hitRate), unit: 'percent' }],
        score: this.points,
        level: MIN_LEVEL,
      });
      return;
    }
    sfx.done();
    const thr = this.stair.threshold();
    const secondary = [
      { key: 'hitRate', value: Math.round(stats.hitRate), unit: 'percent' as const },
      ...(Number.isFinite(stats.meanDevMs) ? [{ key: 'meanDev', value: Math.round(stats.meanDevMs), unit: 'ms' as const }] : []),
      ...(Number.isFinite(stats.meanDevPct) ? [{ key: 'meanDevPct', value: Math.round(stats.meanDevPct), unit: 'percent' as const }] : []),
      ...(Number.isFinite(stats.tendencyMs) ? [{ key: 'tendency', value: Math.round(stats.tendencyMs), unit: 'msSigned' as const }] : []),
    ];
    this.ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), MIN_LEVEL, MAX_LEVEL), unit: 'level', better: 'higher' },
      secondary,
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip: tipFor(stats),
    });
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, now: number): void {
    const t = Math.min(now, this.endT);
    const { w, h, u, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    const cx = w / 2;
    const y = this.trackY();
    const amp = this.amp();
    const zone = this.zone();
    const r = this.targetR();
    this.drawTrack(g, cx, y, amp, r, u);
    this.drawZone(g, cx, y, zone, r, u);
    for (const b of this.bursts) this.drawBurst(g, b, cx, y, amp, r, t);
    for (const m of this.results) this.drawResult(g, m, cx, y, amp, r, t, u);
    this.drawTarget(g, cx + posOf(this.phaseAt(t), amp), y, r);
  }

  /** Bahn: Linie mit Endanschlägen */
  private drawTrack(g: CanvasRenderingContext2D, cx: number, y: number, amp: number, r: number, u: number): void {
    const lw = Math.max(3, u * 0.6);
    g.save();
    g.lineCap = 'round';
    g.strokeStyle = 'rgba(207,230,255,0.28)';
    g.lineWidth = lw;
    g.beginPath();
    g.moveTo(cx - amp, y);
    g.lineTo(cx + amp, y);
    g.stroke();
    for (const s of [-1, 1]) {
      g.beginPath();
      g.moveTo(cx + s * amp, y - r * 0.9);
      g.lineTo(cx + s * amp, y + r * 0.9);
      g.stroke();
    }
    g.restore();
  }

  /** Fangbereich: Rahmen in der Mitte mit Mittellinie (Form, nicht nur Farbe) */
  private drawZone(g: CanvasRenderingContext2D, cx: number, y: number, zone: number, r: number, u: number): void {
    const hh = r * 2.1;
    const ready = this.state === 'ready';
    g.save();
    rrPath(g, cx - zone / 2, y - hh, zone, hh * 2, Math.min(zone / 2, r * 0.6));
    g.fillStyle = withAlpha(BLUE, ready ? 0.14 : 0.07);
    g.fill();
    g.lineWidth = Math.max(2, u * 0.5);
    g.setLineDash(ready ? [] : [Math.max(5, u), Math.max(5, u)]);
    g.strokeStyle = withAlpha(BLUE_LIGHT, ready ? 0.9 : 0.5);
    g.stroke();
    g.setLineDash([]);
    g.lineWidth = Math.max(1.5, u * 0.3);
    g.strokeStyle = withAlpha(BLUE_LIGHT, ready ? 0.55 : 0.25);
    g.beginPath();
    g.moveTo(cx, y - hh * 0.8);
    g.lineTo(cx, y - r * 1.05);
    g.moveTo(cx, y + r * 1.05);
    g.lineTo(cx, y + hh * 0.8);
    g.stroke();
    g.restore();
  }

  /** Zielscheibe (Ring + Punkt), sanftes Leuchten */
  private drawTarget(g: CanvasRenderingContext2D, x: number, y: number, r: number): void {
    glow(g, x, y, r, BLUE, 0.6);
    circle(g, x, y, r, BLUE_DARK);
    ring(g, x, y, r * 0.94, BLUE_LIGHT, Math.max(2, r * 0.1));
    ring(g, x, y, r * 0.55, BLUE_LIGHT, Math.max(1.5, r * 0.08));
    circle(g, x, y, r * 0.2, '#FFFFFF');
  }

  /** Nach dem Tipp: gestrichelter Ring dort, wo das Ziel war, mit ✓ bzw. ✗ darüber (verblasst langsam) */
  private drawResult(g: CanvasRenderingContext2D, m: Result, cx: number, y: number, amp: number, r: number, t: number, u: number): void {
    const k = clamp((t - m.t0) / MARK_MS, 0, 1);
    const a = Math.min(1, k * 10) * (1 - k);
    const x = cx + m.frac * amp;
    g.save();
    g.globalAlpha = a;
    g.setLineDash([Math.max(4, u * 0.9), Math.max(4, u * 0.9)]);
    g.lineWidth = Math.max(2.5, u * 0.5);
    g.strokeStyle = m.hit ? BLUE_LIGHT : WARM;
    g.beginPath();
    g.arc(x, y, r * 1.35, 0, Math.PI * 2);
    g.stroke();
    g.setLineDash([]);
    const s = Math.max(8, u * 1.7);
    const my = y + r * 2.9;
    g.lineCap = 'round';
    g.lineJoin = 'round';
    g.beginPath();
    if (m.hit) {
      g.moveTo(x - s, my);
      g.lineTo(x - s * 0.3, my + s * 0.75);
      g.lineTo(x + s, my - s * 0.7);
    } else {
      g.moveTo(x - s * 0.8, my - s * 0.8);
      g.lineTo(x + s * 0.8, my + s * 0.8);
      g.moveTo(x + s * 0.8, my - s * 0.8);
      g.lineTo(x - s * 0.8, my + s * 0.8);
    }
    g.strokeStyle = 'rgba(5,10,20,0.75)';
    g.lineWidth = Math.max(3.5, u * 0.7) + 3;
    g.stroke();
    g.strokeStyle = m.hit ? BLUE_LIGHT : WARM;
    g.lineWidth = Math.max(3.5, u * 0.7);
    g.stroke();
    g.restore();
  }

  private drawBurst(g: CanvasRenderingContext2D, b: Burst, cx: number, y: number, amp: number, r: number, t: number): void {
    const k = clamp((t - b.t0) / BURST_MS, 0, 1);
    g.save();
    g.beginPath();
    g.arc(cx + b.frac * amp, y, r * (1.1 + 0.9 * easeOut(k)), 0, Math.PI * 2);
    g.strokeStyle = withAlpha(BLUE_LIGHT, 0.8 * (1 - k));
    g.lineWidth = Math.max(1.5, 4 * (1 - k));
    g.stroke();
    g.restore();
  }
}

/** Oberkante der Bildunterschrift im Intro-Film (gleiche Formel wie im Runner) */
function captionTop(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return s.h - size * 2.1 - s.h * 0.05;
}

export const pendelFang: ExerciseDefinition = {
  id: 'pendel-fang',
  category: 'bewegung',
  minutes: 1,
  color: '#2557A0',
  icon:
    '<path d="M6 30h36" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M6 24v12M42 24v12" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><rect x="18.5" y="16" width="11" height="28" rx="3.5" fill="none" stroke="currentColor" stroke-width="2.8" stroke-dasharray="3 3"/><circle cx="34" cy="30" r="5.5" fill="currentColor"/><path d="M10 12c4-3.4 9-3.4 13 0M25 12c4-3.4 9-3.4 13 0" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new PendelFang(ctx),
};
