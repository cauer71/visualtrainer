/**
 * Fünf Türen – ein Stern erscheint kurz in einer von fünf Türen und muss angetippt werden.
 *
 * Abgrenzung zu Blitzreaktion (einfache Reaktion, kein Ort zu wählen), Zielfang (bewegtes Ziel)
 * und Blicksprung-Galerie (Raster): Hier gibt es genau fünf Orte in einer Reihe, man muss die
 * richtige Tür erkennen, und die Stufe regelt, wie kurz der Stern zu sehen ist.
 *
 * - Türreihenfolge unvorhersehbar: nie dieselbe Tür direkt hintereinander, keine 1-2-3-Läufe,
 *   Pause zufällig 0,55–1,15 s.
 * - Stufe (Staircase, 3-down/1-up → ≈ 79 % richtig): Sichtbarkeit 1,5 s → 0,42 s. Der Stern
 *   blendet je 130 ms weich ein und aus, kein Blitzen.
 * - Gewertet wird der erste Tipp pro Ziel: richtige Tür = Treffer, andere Tür = Fehler (✗ + gestrichelter
 *   Ring an der richtigen Tür), kein Tipp = weg. Zeit = Tipp (p.t) minus erstes gezeichnetes Bild.
 * - Trefferfläche = ganze Türspalte (≥ 24 px Radius), Ziel ist Stern-Form (nicht nur Farbe).
 * - Tastatur (Computer): Ziffern 1–5 wählen die Tür.
 */
import { background, circle, glow, star, text, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo, ToastKind } from '../../core/types';
import {
  type DoorLayout,
  type HitSample,
  DOORS,
  FADE_MS,
  MAX_LEVEL,
  MIN_LEVEL,
  computeStats,
  doorAt,
  gapMs,
  layoutDoors,
  levelOf,
  pickDoor,
  targetAlpha,
  tipFor,
  visibleMs,
} from './logic';
import { de, it } from './texts';

const TRIALS = 26;
const QUICK_TRIALS = 4;
const RING_MS = 700;
const MARK_MS = 650;
// Intro-Film: Stufe 1, lange sichtbar; 3. Stern bleibt unangetippt („Weg? Nicht schlimm“)
const DEMO_LIFE_MS = 2600;
const DEMO_GAP_MS = 650;
const DEMO_DOORS = [2, 4, 0, 1];
const DEMO_TAPS = [true, true, false, true];
const DEMO_CAPTIONS = ['watch', 'tap', 'gone', 'tap'];

const STAR = '#FDE68A';
const STAR_EDGE = '#F59E0B';
const WARM = '#FBBF24';

interface Target {
  door: number;
  lvl: number;
  born: number;
  life: number;
  judged: boolean;
}

/** Kurzlebige Effekte in normierten Bühnenkoordinaten (robust beim Drehen) */
interface Fx {
  nx: number;
  ny: number;
  t0: number;
  door?: number;
}

class FuenfTueren implements Exercise {
  private readonly demo: boolean;
  private readonly total: number;
  private readonly stair: Staircase;
  private phase: 'gap' | 'target' | 'done' = 'gap';
  private gapUntil = 0;
  private target: Target | null = null;
  private history: number[] = [];
  private spawned = 0;
  private resolved = 0;
  private samples: HitSample[] = [];
  private wrong = 0;
  private missed = 0;
  private points = 0;
  private marks: Fx[] = [];
  /** „Hier war er“: gestrichelter Ring an der richtigen Tür nach einem Fehltipp */
  private hints: Array<{ door: number; t0: number }> = [];
  private bursts: Fx[] = [];
  private autoPlanned = false;
  private endAt = 0;
  private endT = Infinity;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.total = this.demo ? DEMO_DOORS.length : ctx.quick ? QUICK_TRIALS : TRIALS;
    this.stair = new Staircase({ start: ctx.startLevel ?? MIN_LEVEL, min: MIN_LEVEL, max: MAX_LEVEL, down: 3, up: 1 });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private lay(): DoorLayout {
    const s = this.ctx.stage;
    // Im Intro-Film bleibt unter den Türen Platz für Ruheplatz der Hand und Bildunterschrift
    const hs = clamp(s.u * 13, 48, 110);
    const bottom = this.demo ? captionTop(s) - hs * 0.95 - 6 : s.h - Math.max(10, s.u * 2);
    return layoutDoors(s.w, s.u, bottom);
  }

  private restPoint(): { x: number; y: number } {
    const { w, u } = this.ctx.stage;
    const hs = clamp(u * 13, 48, 110);
    return { x: w - hs * 0.75, y: captionTop(this.ctx.stage) - hs * 0.95 };
  }

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    this.phase = 'gap';
    this.gapUntil = t + (this.demo ? 500 : 600);
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateLabel();
    if (this.demo) {
      hud.caption(this.ctx.texts.captions[DEMO_CAPTIONS[0]]);
      const r = this.restPoint();
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
    const { rng, hud, ghost, texts } = this.ctx;
    const lvl = this.demo ? MIN_LEVEL : levelOf(this.stair.level);
    const door = this.demo ? DEMO_DOORS[this.spawned] : pickDoor(rng, this.history);
    this.history.push(door);
    this.target = { door, lvl, born: t, life: this.demo ? DEMO_LIFE_MS : visibleMs(lvl), judged: false };
    this.spawned++;
    this.phase = 'target';
    this.autoPlanned = false;
    this.updateLabel();
    if (this.demo) {
      hud.caption(texts.captions[DEMO_CAPTIONS[this.spawned - 1]]);
      if (DEMO_TAPS[this.spawned - 1]) {
        const c = this.lay().targets[door];
        ghost.tap(c.x, c.y, { delay: 500, move: 600 });
        const r = this.restPoint();
        ghost.moveTo(r.x, r.y, { delay: 250, move: 420 });
      }
    }
  }

  /** Autoplay (Tests): meist die richtige Tür, manchmal eine falsche oder gar keine */
  private autoUpdate(T: Target): void {
    const { ghost, rng } = this.ctx;
    if (this.autoPlanned || !ghost.idle) return;
    this.autoPlanned = true;
    if (rng.chance(0.04)) return;
    let door = T.door;
    if (rng.chance(0.08)) door = (T.door + 1 + rng.int(DOORS - 1)) % DOORS;
    const c = this.lay().targets[door];
    ghost.tap(c.x + rng.normal() * 3, c.y + rng.normal() * 3, { delay: rng.range(120, 260), move: rng.range(180, 280) });
  }

  /** Tastatur: Ziffern 1–5 wählen die Tür (Computer ohne Touch). */
  keyDown(key: string, t: number): void {
    const n = Number(key);
    if (!Number.isInteger(n) || n < 1 || n > DOORS) return;
    const c = this.lay().targets[n - 1];
    this.pointerDown({ id: -2, x: c.x, y: c.y, t, type: 'mouse' });
  }

  pointerDown(p: PointerInfo): void {
    const T = this.target;
    // In der Pause zwischen Zielen (z. B. zweiter Finger) und nach dem ersten Tipp nichts werten
    if (this.phase !== 'target' || !T || T.judged || p.t < T.born) return;
    const lay = this.lay();
    const door = doorAt(lay, p.x, p.y);
    if (door < 0) return;
    if (door === T.door) this.hit(T, lay, p.t);
    else this.miss(T, lay, door, p.t);
  }

  private hit(T: Target, lay: DoorLayout, t: number): void {
    const { sfx, hud, fmt, stage } = this.ctx;
    const rt = t - T.born;
    T.judged = true;
    this.samples.push({ ms: rt, door: T.door });
    const pts = 10 + 2 * (T.lvl - 1) + Math.round(Math.max(0, 1 - rt / T.life) * 10);
    this.points += pts;
    sfx.good();
    const c = lay.targets[T.door];
    if (!this.ctx.reducedMotion) this.bursts.push({ nx: c.x / stage.w, ny: c.y / stage.h, t0: t });
    this.toastAt(fmt.time(rt), 'good', c.x, c.y - lay.radius, 700, clamp(stage.u * 4.2, 16, 32));
    hud.setScore(this.points);
    if (!this.demo) this.stair.update(true);
    this.afterResolve(t);
  }

  private miss(T: Target, lay: DoorLayout, door: number, t: number): void {
    const { sfx, stage, texts } = this.ctx;
    T.judged = true;
    this.wrong++;
    sfx.bad();
    const c = lay.targets[door];
    this.marks.push({ nx: c.x / stage.w, ny: c.y / stage.h, t0: t });
    this.hints.push({ door: T.door, t0: t });
    this.toastAt(texts.feedback.wrong, 'bad', c.x, c.y - lay.radius, 800, clamp(stage.u * 3.8, 15, 28));
    if (!this.demo) this.stair.update(false);
    this.afterResolve(t);
  }

  private timeout(T: Target, t: number): void {
    const { stage, texts } = this.ctx;
    T.judged = true;
    this.missed++;
    const lay = this.lay();
    const c = lay.targets[T.door];
    this.toastAt(texts.feedback.gone, 'info', c.x, c.y - lay.radius, 700, clamp(stage.u * 3.8, 15, 28));
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

  private toastAt(text: string, kind: ToastKind, x: number, top: number, ms: number, size: number): void {
    const { w } = this.ctx.stage;
    const half = Math.min(w / 2, text.length * size * 0.3 + 8);
    this.ctx.hud.toast(text, kind, { x: clamp(x, half, w - half), y: Math.max(size * 1.1, top - size * 0.8), ms, size });
  }

  private updateLabel(): void {
    if (this.demo) return;
    const lvl = this.target ? this.target.lvl : levelOf(this.stair.level);
    this.ctx.hud.setLabel(`${this.ctx.texts.feedback.level} ${lvl}`);
  }

  private prune(t: number): void {
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
    if (this.hints.length) this.hints = this.hints.filter((m) => t - m.t0 < RING_MS);
    if (this.bursts.length) this.bursts = this.bursts.filter((b) => t - b.t0 < 420);
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
      { key: 'accuracy', value: Math.round(stats.accuracy), unit: 'percent' as const },
      ...(Number.isFinite(stats.medianMs) ? [{ key: 'medianTime', value: Math.round(stats.medianMs), unit: 'time' as const }] : []),
      { key: 'hits', value: stats.hits, unit: 'count' as const },
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
    const lay = this.lay();
    this.drawDoors(g, lay, u);
    for (const hnt of this.hints) this.drawHint(g, lay, hnt, t, u);
    for (const b of this.bursts) this.drawBurst(g, b, t);
    const T = this.target;
    if (T && this.phase === 'target') this.drawStar(g, lay, T, t);
    for (const m of this.marks) this.drawMark(g, m, t, u);
  }

  /** Bogentüren mit Zahl darunter (Zahl = Orientierung und Tastenkürzel, nicht nur Farbe) */
  private drawDoors(g: CanvasRenderingContext2D, lay: DoorLayout, u: number): void {
    const fs = clamp(lay.labelH * 0.55, 12, 26);
    lay.doors.forEach((d, i) => {
      const inset = Math.max(3, u * 0.7);
      g.save();
      // Rahmen
      doorPath(g, d.x - inset, d.y - inset, d.w + inset * 2, d.h + inset);
      g.fillStyle = 'rgba(120,150,200,0.16)';
      g.fill();
      // dunkler Durchgang mit leichtem Verlauf nach unten
      doorPath(g, d.x, d.y, d.w, d.h);
      const grad = g.createLinearGradient(0, d.y, 0, d.y + d.h);
      grad.addColorStop(0, 'rgba(3,8,18,0.96)');
      grad.addColorStop(1, 'rgba(14,26,46,0.92)');
      g.fillStyle = grad;
      g.fill();
      g.lineWidth = Math.max(1.5, u * 0.3);
      g.strokeStyle = 'rgba(232,238,247,0.3)';
      g.stroke();
      g.restore();
      // Boden
      g.save();
      g.strokeStyle = 'rgba(232,238,247,0.22)';
      g.lineWidth = Math.max(2, u * 0.4);
      g.lineCap = 'round';
      g.beginPath();
      g.moveTo(d.x - inset, d.y + d.h);
      g.lineTo(d.x + d.w + inset, d.y + d.h);
      g.stroke();
      g.restore();
      text(g, String(i + 1), d.x + d.w / 2, d.y + d.h + lay.labelH * 0.62, fs, 'rgba(232,238,247,0.55)', { weight: 700 });
    });
  }

  /** Stern: weich ein, kurz halten, weich aus (kein Blitz) */
  private drawStar(g: CanvasRenderingContext2D, lay: DoorLayout, T: Target, t: number): void {
    const age = t - T.born;
    const a = targetAlpha(age, T.life);
    if (a <= 0.01) return;
    const c = lay.targets[T.door];
    const r0 = lay.radius;
    const r = this.ctx.reducedMotion ? r0 : r0 * (0.88 + 0.12 * easeOut(age / FADE_MS));
    glow(g, c.x, c.y, r0, STAR_EDGE, 0.7 * a);
    g.save();
    g.globalAlpha = a;
    star(g, c.x, c.y, r * 1.25, STAR_EDGE);
    star(g, c.x, c.y, r * 1.05, STAR);
    circle(g, c.x, c.y + r * 0.05, r * 0.26, '#FFFFFF');
    g.restore();
  }

  private drawBurst(g: CanvasRenderingContext2D, b: Fx, t: number): void {
    const { w, h } = this.ctx.stage;
    const lay = this.lay();
    const k = clamp((t - b.t0) / 420, 0, 1);
    const r = lay.radius * (1.1 + 0.9 * easeOut(k));
    g.save();
    g.beginPath();
    g.arc(b.nx * w, b.ny * h, r, 0, Math.PI * 2);
    g.strokeStyle = withAlpha(STAR, 0.8 * (1 - k));
    g.lineWidth = Math.max(1.5, 4 * (1 - k));
    g.stroke();
    g.restore();
  }

  /** Nach einem Fehltipp: gestrichelter Ring an der Tür, in der der Stern war */
  private drawHint(g: CanvasRenderingContext2D, lay: DoorLayout, h: { door: number; t0: number }, t: number, u: number): void {
    const k = clamp((t - h.t0) / RING_MS, 0, 1);
    const c = lay.targets[h.door];
    g.save();
    g.globalAlpha = Math.min(1, k * 6) * (1 - k) * 0.9;
    g.setLineDash([Math.max(4, u), Math.max(4, u)]);
    g.lineWidth = Math.max(2, u * 0.45);
    g.strokeStyle = STAR;
    g.beginPath();
    g.arc(c.x, c.y, lay.radius * 1.5, 0, Math.PI * 2);
    g.stroke();
    g.restore();
  }

  /** Falsche Tür: ✗ (Form, nicht nur Farbe), langsam verblassend, kein Blitz */
  private drawMark(g: CanvasRenderingContext2D, m: Fx, t: number, u: number): void {
    const { w, h } = this.ctx.stage;
    const k = clamp((t - m.t0) / MARK_MS, 0, 1);
    const s = Math.max(10, u * 2.2);
    const lw = Math.max(3.5, u * 0.7);
    const x = m.nx * w;
    const y = m.ny * h;
    g.save();
    g.globalAlpha = Math.min(1, k * 8) * (1 - k);
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(x - s, y - s);
    g.lineTo(x + s, y + s);
    g.moveTo(x + s, y - s);
    g.lineTo(x - s, y + s);
    g.strokeStyle = 'rgba(5,10,20,0.75)';
    g.lineWidth = lw + 3;
    g.stroke();
    g.strokeStyle = WARM;
    g.lineWidth = lw;
    g.stroke();
    g.restore();
  }
}

/** Pfad einer Bogentür (Rechteck mit Halbkreis oben) */
function doorPath(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): void {
  const r = w / 2;
  g.beginPath();
  g.moveTo(x, y + h);
  g.lineTo(x, y + r);
  g.arc(x + r, y + r, r, Math.PI, 0);
  g.lineTo(x + w, y + h);
  g.closePath();
}

/** Oberkante der Bildunterschrift im Intro-Film (gleiche Formel wie im Runner) */
function captionTop(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return s.h - size * 2.1 - s.h * 0.05;
}

export const fuenfTueren: ExerciseDefinition = {
  id: 'fuenf-tueren',
  category: 'bewegung',
  minutes: 1,
  color: '#2B63A8',
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"><path d="M3.5 38V20a3.5 3.5 0 0 1 7 0v18z"/><path d="M12.5 38V20a3.5 3.5 0 0 1 7 0v18z"/><path d="M21.5 38V20a3.5 3.5 0 0 1 7 0v18z"/><path d="M30.5 38V20a3.5 3.5 0 0 1 7 0v18z"/><path d="M39.5 38V20a3.5 3.5 0 0 1 7 0v18z"/></g><path d="M25 22.5l1.4 2.9 3.1.4-2.3 2.1.6 3.1-2.8-1.5-2.8 1.5.6-3.1-2.3-2.1 3.1-.4z" fill="currentColor"/><path d="M3 42.5h42" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new FuenfTueren(ctx),
};
