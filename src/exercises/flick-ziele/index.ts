/**
 * Flick-Ziele – einzelne Ziele erscheinen plötzlich an zufälligen Orten, du tippst sie an
 * (Katalog 501, Touch-Fassung des „Flick“-Drills).
 *
 * Abgrenzung: Blicksprung-Galerie und Fünf Türen zeigen feste, sichtbar markierte Orte; Blitzreaktion
 * verlangt kein Zielen; Zielfang bewegt das Ziel. Hier erscheint jedes Ziel an einem freien Ort der ganzen
 * Bühne, und der Weg vom letzten Ziel wechselt zwischen kurz, mittel und weit (nie dreimal dieselbe Klasse).
 *
 * Gegenüber dem Vorbild (Maus mit gesperrtem Zeiger, Zeitkonto, Serien-„Hitze“, roter Schimmer, Bildschütteln):
 * - Fester Ablauf: 24 Ziele, kein Zeitbonus, keine Strafzeit, kein Schütteln, kein Rot-Blitz.
 * - Stufe (Staircase, 3-down/1-up → ≈ 79 % Treffer): Zielgröße 7,5 u → 3,6 u, Sichtzeit 1,7 s → 0,52 s.
 *   Das Ziel blendet je 130 ms weich ein und aus. Trefferradius mindestens 28 px (Finger).
 * - Gewertet wird der erste Tipp pro Ziel: im Trefferkreis = Treffer, sonst = Fehlklick (✗ + gestrichelter Ring
 *   am Ziel), kein Tipp = weg. Zeit = Tipp (p.t) minus erstes gezeichnetes Bild des Ziels; Auswertung mit Median.
 * - Es wird nur die Zeit bis zum Tipp gemessen – keine Augenbewegung, keine Mausübersetzung.
 */
import { background } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import {
  captionTop,
  drawDisc,
  drawHitRing,
  drawMissMark,
  fadeAlpha,
  FADE_MS,
  hitRadiusFor,
  restPoint,
  toastAt,
} from '../_shared/ziel-auftauchen';
import {
  type DistClass,
  type HitSample,
  classOfDistance,
  computeStats,
  diagonal,
  gapMs,
  levelOf,
  lifeMs,
  MAX_LEVEL,
  MIN_LEVEL,
  pickDistClass,
  pickTarget,
  playArea,
  pointsFor,
  radiusU,
  tipFor,
} from './logic';
import { de, it } from './texts';

const TRIALS = 24;
const QUICK_TRIALS = 4;
const RING_MS = 700;
const MARK_MS = 650;
const BURST_MS = 420;
/** Mindestradius des sichtbaren Ziels in px */
const MIN_VISIBLE_R = 15;
// Intro-Film: Stufe 1, lange sichtbar; das 3. Ziel bleibt unangetippt („Weg? Nicht schlimm“)
const DEMO_LIFE_MS = 2500;
const DEMO_GAP_MS = 600;
const DEMO_POS = [
  { nx: 0.3, ny: 0.3 },
  { nx: 0.78, ny: 0.24 },
  { nx: 0.2, ny: 0.55 },
  { nx: 0.58, ny: 0.45 },
];
const DEMO_TAPS = [true, true, false, true];
const DEMO_CAPTIONS = ['watch', 'tap', 'gone', 'tap'];

const CYAN = '#38BDF8';
const CYAN_LIGHT = '#BAE6FD';
const WARM = '#FBBF24';

interface Target {
  nx: number;
  ny: number;
  lvl: number;
  cls: DistClass;
  born: number;
  life: number;
  judged: boolean;
}

/** Kurzlebige Effekte in normierten Bühnenkoordinaten (robust beim Drehen) */
interface Fx {
  nx: number;
  ny: number;
  t0: number;
  /** sichtbarer Zielradius in px zum Zeitpunkt des Ereignisses */
  r: number;
}

class FlickZiele implements Exercise {
  private readonly demo: boolean;
  private readonly total: number;
  private readonly stair: Staircase;
  private phase: 'gap' | 'target' | 'done' = 'gap';
  private gapUntil = 0;
  private target: Target | null = null;
  private last = { nx: 0.5, ny: 0.5 };
  private classes: DistClass[] = [];
  private spawned = 0;
  private resolved = 0;
  private samples: HitSample[] = [];
  private wrong = 0;
  private missed = 0;
  private points = 0;
  private marks: Fx[] = [];
  private hints: Fx[] = [];
  private bursts: Fx[] = [];
  private autoPlanned = false;
  private endAt = 0;
  private endT = Infinity;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.total = this.demo ? DEMO_POS.length : ctx.quick ? QUICK_TRIALS : TRIALS;
    this.stair = new Staircase({ start: ctx.startLevel ?? MIN_LEVEL, min: MIN_LEVEL, max: MAX_LEVEL, down: 3, up: 1 });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private visibleR(lvl: number): number {
    return Math.max(MIN_VISIBLE_R, radiusU(lvl) * this.ctx.stage.u);
  }

  private area(lvl: number) {
    const s = this.ctx.stage;
    const pad = hitRadiusFor(this.visibleR(lvl)) + Math.max(4, s.u * 0.8);
    return playArea(s.w, s.h, pad, this.demo ? captionTop(s) - 6 : s.h);
  }

  start(t: number): void {
    const { hud, ghost, stage } = this.ctx;
    this.phase = 'gap';
    this.gapUntil = t + (this.demo ? 500 : 650);
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateLabel();
    if (this.demo) {
      hud.caption(this.ctx.texts.captions[DEMO_CAPTIONS[0]]);
      const r = restPoint(stage);
      ghost.moveTo(r.x, r.y, { move: 0 });
    }
  }

  update(_dt: number, t: number): void {
    if (this.phase === 'done') return;
    if (this.phase === 'gap' && t >= this.gapUntil) {
      if (this.spawned >= this.total) {
        this.finishSession(t);
        return;
      }
      this.spawn(t);
    }
    const T = this.target;
    if (this.phase === 'target' && T) {
      if (t - T.born >= T.life) this.timeout(T, t);
      else if (this.ctx.autoplay && !this.demo) this.autoUpdate(T);
    }
    this.prune(t);
    if (this.demo && this.endAt && t >= this.endAt) this.finishSession(t);
  }

  private spawn(t: number): void {
    const { rng, hud, ghost, texts, stage } = this.ctx;
    const lvl = this.demo ? MIN_LEVEL : levelOf(this.stair.level);
    let nx: number;
    let ny: number;
    let cls: DistClass;
    if (this.demo) {
      ({ nx, ny } = DEMO_POS[this.spawned]);
      const a = this.area(lvl);
      cls = classOfDistance(Math.hypot((nx - this.last.nx) * stage.w, (ny - this.last.ny) * stage.h), diagonal(a));
    } else {
      const want = pickDistClass(rng, this.classes);
      const a = this.area(lvl);
      const p = pickTarget(rng, a, { x: this.last.nx * stage.w, y: this.last.ny * stage.h }, want);
      nx = p.x / stage.w;
      ny = p.y / stage.h;
      cls = classOfDistance(p.dist, diagonal(a));
      this.classes.push(want);
    }
    this.last = { nx, ny };
    this.target = { nx, ny, lvl, cls, born: t, life: this.demo ? DEMO_LIFE_MS : lifeMs(lvl), judged: false };
    this.spawned++;
    this.phase = 'target';
    this.autoPlanned = false;
    this.updateLabel();
    if (this.demo) {
      hud.caption(texts.captions[DEMO_CAPTIONS[this.spawned - 1]]);
      if (DEMO_TAPS[this.spawned - 1]) {
        ghost.tap(nx * stage.w, ny * stage.h, { delay: 450, move: 650 });
        const r = restPoint(stage);
        ghost.moveTo(r.x, r.y, { delay: 250, move: 420 });
      }
    }
  }

  /** Autoplay (Tests): meist treffen, manchmal knapp daneben oder gar nicht tippen */
  private autoUpdate(T: Target): void {
    const { ghost, rng, stage } = this.ctx;
    if (this.autoPlanned || !ghost.idle) return;
    this.autoPlanned = true;
    if (rng.chance(0.04)) return;
    const hitR = hitRadiusFor(this.visibleR(T.lvl));
    const off = rng.chance(0.08) ? hitR * 2.4 : 0;
    const a = rng.range(0, Math.PI * 2);
    const x = T.nx * stage.w + rng.normal() * 3 + Math.cos(a) * off;
    const y = T.ny * stage.h + rng.normal() * 3 + Math.sin(a) * off;
    ghost.tap(x, y, { delay: rng.range(140, 300), move: rng.range(260, 420) });
  }

  pointerDown(p: PointerInfo): void {
    const T = this.target;
    // In der Pause zwischen Zielen (z. B. zweiter Finger) und nach dem ersten Tipp nichts werten
    if (this.phase !== 'target' || !T || T.judged || p.t < T.born) return;
    const { stage } = this.ctx;
    const tx = T.nx * stage.w;
    const ty = T.ny * stage.h;
    if (Math.hypot(p.x - tx, p.y - ty) <= hitRadiusFor(this.visibleR(T.lvl))) this.hit(T, p.t);
    else this.miss(T, p);
  }

  private hit(T: Target, t: number): void {
    const { sfx, hud, fmt, stage } = this.ctx;
    const rt = t - T.born;
    T.judged = true;
    this.samples.push({ ms: rt, cls: T.cls });
    this.points += pointsFor(T.lvl, rt, T.life);
    sfx.good();
    const x = T.nx * stage.w;
    const y = T.ny * stage.h;
    if (!this.ctx.reducedMotion) this.bursts.push({ nx: T.nx, ny: T.ny, t0: t, r: this.visibleR(T.lvl) });
    toastAt(this.ctx, fmt.time(rt), 'good', x, y - this.visibleR(T.lvl), 700, clamp(stage.u * 4.2, 16, 32));
    hud.setScore(this.points);
    if (!this.demo) this.stair.update(true);
    this.afterResolve(t);
  }

  private miss(T: Target, p: PointerInfo): void {
    const { sfx, stage, texts } = this.ctx;
    T.judged = true;
    this.wrong++;
    sfx.bad();
    this.marks.push({ nx: p.x / stage.w, ny: p.y / stage.h, t0: p.t, r: 0 });
    this.hints.push({ nx: T.nx, ny: T.ny, t0: p.t, r: this.visibleR(T.lvl) });
    toastAt(this.ctx, texts.feedback.wrong, 'bad', p.x, p.y - this.visibleR(T.lvl), 800, clamp(stage.u * 3.8, 15, 28));
    if (!this.demo) this.stair.update(false);
    this.afterResolve(p.t);
  }

  private timeout(T: Target, t: number): void {
    const { stage, texts } = this.ctx;
    T.judged = true;
    this.missed++;
    this.hints.push({ nx: T.nx, ny: T.ny, t0: t, r: this.visibleR(T.lvl) });
    toastAt(this.ctx, texts.feedback.gone, 'info', T.nx * stage.w, T.ny * stage.h - this.visibleR(T.lvl), 700, clamp(stage.u * 3.8, 15, 28));
    if (!this.demo) this.stair.update(false);
    this.afterResolve(t);
  }

  private afterResolve(t: number): void {
    this.resolved++;
    this.target = null;
    this.phase = 'gap';
    this.gapUntil = t + (this.demo ? DEMO_GAP_MS : gapMs(this.ctx.rng));
    this.ctx.hud.setProgress(this.resolved / this.total);
    this.updateLabel();
    if (this.demo && this.resolved >= this.total) this.endAt = t + 1000;
  }

  private updateLabel(): void {
    if (this.demo) return;
    const lvl = this.target ? this.target.lvl : levelOf(this.stair.level);
    this.ctx.hud.setLabel(`${this.ctx.texts.feedback.level} ${lvl}`);
  }

  private prune(t: number): void {
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
    if (this.hints.length) this.hints = this.hints.filter((m) => t - m.t0 < RING_MS);
    if (this.bursts.length) this.bursts = this.bursts.filter((b) => t - b.t0 < BURST_MS);
  }

  // -------------------------------------------------------------------------

  private finishSession(t: number): void {
    this.phase = 'done';
    this.endT = t;
    const { sfx, hud } = this.ctx;
    hud.setProgress(1);
    const stats = computeStats(this.samples, this.wrong, this.missed);
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' },
        secondary: [{ key: 'hits', value: stats.hits, unit: 'count' }],
        score: this.points,
        level: MIN_LEVEL,
      });
      return;
    }
    sfx.done();
    const thr = this.stair.threshold();
    const secondary = [
      { key: 'hits', value: stats.hits, unit: 'count' as const },
      ...(Number.isFinite(stats.medianMs) ? [{ key: 'medianTime', value: Math.round(stats.medianMs), unit: 'time' as const }] : []),
      { key: 'wrong', value: stats.wrong, unit: 'count' as const },
      { key: 'missed', value: stats.missed, unit: 'count' as const },
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
    for (const hnt of this.hints) this.drawHint(g, hnt, t, u);
    for (const b of this.bursts) drawHitRing(g, b.nx * w, b.ny * h, b.r, clamp((t - b.t0) / BURST_MS, 0, 1), CYAN_LIGHT);
    const T = this.target;
    if (T && this.phase === 'target') {
      const age = t - T.born;
      const a = fadeAlpha(age, T.life);
      const r0 = this.visibleR(T.lvl);
      const r = this.ctx.reducedMotion ? r0 : r0 * (0.88 + 0.12 * easeOut(age / FADE_MS));
      drawDisc(g, T.nx * w, T.ny * h, r, a, CYAN, CYAN_LIGHT);
    }
    for (const m of this.marks) drawMissMark(g, m.nx * w, m.ny * h, clamp((t - m.t0) / MARK_MS, 0, 1), u, WARM);
  }

  /** „Hier war es“: gestrichelter Ring am Ziel nach Fehltipp oder wenn es weg war */
  private drawHint(g: CanvasRenderingContext2D, hnt: Fx, t: number, u: number): void {
    const { w, h } = this.ctx.stage;
    const k = clamp((t - hnt.t0) / RING_MS, 0, 1);
    g.save();
    g.globalAlpha = Math.min(1, k * 6) * (1 - k) * 0.9;
    g.setLineDash([Math.max(4, u), Math.max(4, u)]);
    g.lineWidth = Math.max(2, u * 0.45);
    g.strokeStyle = CYAN_LIGHT;
    g.beginPath();
    g.arc(hnt.nx * w, hnt.ny * h, hnt.r * 1.4, 0, Math.PI * 2);
    g.stroke();
    g.restore();
  }
}

export const flickZiele: ExerciseDefinition = {
  id: 'flick-ziele',
  category: 'bewegung',
  minutes: 1,
  color: '#2E6DB4',
  icon:
    '<circle cx="31" cy="17" r="9" fill="none" stroke="currentColor" stroke-width="3.2"/><circle cx="31" cy="17" r="3.2" fill="currentColor"/><path d="M6 40c5-2 11-6 16-14" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-dasharray="1 6.5"/><path d="M16 44.5l9-2.5-3-8.5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" transform="translate(-2 -4)"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new FlickZiele(ctx),
};
