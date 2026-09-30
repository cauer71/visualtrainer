/**
 * Ziele abräumen – mehrere Kreise liegen gleichzeitig auf der Bühne und müssen in beliebiger
 * Reihenfolge weggetippt werden, bevor ihr Ring leer ist.
 *
 * Abgrenzung: Zielfang (ein bewegtes Ziel), Fünf Türen (ein Ziel an festen Orten), Blicksprung-Galerie
 * (ein Ziel im Raster) und Fallende Ziele (Ziele fallen nach unten) haben immer nur eine Aufgabe
 * zur Zeit bzw. eine feste Richtung. Hier liegen 2–5 ruhende Kreise gleichzeitig da und man wählt
 * selbst die Reihenfolge – der schrumpfende Ring zeigt, welcher am dringendsten ist.
 *
 * - Stufe (Staircase, 3-down/1-up → ≈ 79 % abgeräumt): Anzahl 2 → 5, Größe 7,2 u → 4 u, Zeit je
 *   Kreis 1,8 s → 0,6 s (Lebensdauer = Anzahl × Zeit je Kreis).
 * - Feste Sitzungsdauer (keine Zeitgutschrift). Jeder Kreis läuft für sich ab; wird einer
 *   weggetippt oder läuft ab, kommt nach kurzer Pause ein neuer an anderer Stelle.
 * - Fehlklick (Tipp neben jeden Kreis) = Fehler: weiches ✗ an der Tipp-Stelle, kein Blitz, kein Wackeln.
 * - Kreise tragen unterscheidbare Symbole (Dreieck, Quadrat, Raute, Plus, Stern) – nicht nur Farbe.
 * - Trefferradius ≥ 24 px. Gemessen wird der Abstand zwischen zwei Treffern (Median), nicht eine
 *   „Reaktionszeit“: Die Wahl der Reihenfolge steckt darin.
 */
import { background, circle, glow, ring, star, triangle, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo, ToastKind } from '../../core/types';
import {
  type Norm,
  computeStats,
  countFor,
  freeSymbol,
  hitRadiusPx,
  levelOf,
  lifeMs,
  MAX_INTERVAL_MS,
  MAX_LEVEL,
  MIN_LEVEL,
  pickSpot,
  pointsFor,
  radiusPx,
  ringFraction,
  spawnGapMs,
  tipFor,
} from './logic';
import { de, it } from './texts';

const SESSION_MS = 60_000;
const QUICK_SESSION_MS = 12_000;
/** Kein Nachschub in den letzten ms der Sitzung */
const NO_SPAWN_END_MS = 700;
const POP_MS = 170;
const GONE_MS = 320;
const BURST_MS = 420;
const MARK_MS = 650;
/** Zwei Fehlklicks näher beisammen als das zählen als ein Fehler */
const WRONG_COOLDOWN_MS = 400;

const BLUE = '#5AA9F0';
const BLUE_DARK = '#2F6FB5';
const BLUE_LIGHT = '#CFE6FF';
const WARM = '#FBBF24';

// Intro-Film: Stufe 1, lange Zeit. Kreis A und B liegen da, nach jedem Tipp kommt einer nach;
// Kreis C läuft absichtlich ab („Ring leer? Dann ist er weg“), D wird zum Schluss angetippt.
interface DemoSpawn {
  key: string;
  nx: number;
  ny: number;
  life: number;
}
interface DemoEvent {
  at: number;
  spawn?: DemoSpawn;
  caption?: string;
  tap?: { key: string; move: number };
  rest?: boolean;
  end?: boolean;
}
const DEMO_EVENTS: DemoEvent[] = [
  { at: 0, caption: 'watch' },
  { at: 300, spawn: { key: 'A', nx: 0.22, ny: 0.3, life: 7000 } },
  { at: 1200, spawn: { key: 'B', nx: 0.74, ny: 0.4, life: 7000 } },
  { at: 2600, caption: 'tap', tap: { key: 'A', move: 800 } },
  { at: 3700, caption: 'more', spawn: { key: 'C', nx: 0.46, ny: 0.72, life: 2600 } },
  { at: 4300, tap: { key: 'B', move: 700 } },
  { at: 5400, caption: 'gone', spawn: { key: 'D', nx: 0.2, ny: 0.66, life: 7000 } },
  { at: 6700, rest: true },
  { at: 7300, caption: 'tap', tap: { key: 'D', move: 700 } },
  { at: 8500, rest: true },
  { at: 10200, end: true },
];

interface Target {
  key: string;
  slot: number;
  /** Ort in Feldkoordinaten 0..1 (robust beim Drehen) */
  nx: number;
  ny: number;
  lvl: number;
  born: number;
  life: number;
  judged: boolean;
  planned: boolean;
}

interface Gone {
  kind: 'hit' | 'gone';
  nx: number;
  ny: number;
  r: number;
  slot: number;
  t0: number;
}

interface Mark {
  /** Bühnenkoordinaten 0..1 */
  sx: number;
  sy: number;
  t0: number;
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

class ZieleAbraeumen implements Exercise {
  private readonly demo: boolean;
  private readonly sessionMs: number;
  private readonly stair: Staircase;
  private targets: Target[] = [];
  private gone: Gone[] = [];
  private marks: Mark[] = [];
  private t0 = 0;
  private endAt = Infinity;
  private endT = Infinity;
  private done = false;
  private nextSpawnAt = 0;
  private lastWrongT = -1e9;
  private lastClearT = -1;
  private intervals: number[] = [];
  private cleared = 0;
  private missed = 0;
  private wrong = 0;
  private points = 0;
  private demoIdx = 0;
  private nextKey = 0;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.sessionMs = ctx.quick ? QUICK_SESSION_MS : SESSION_MS;
    this.stair = new Staircase({ start: ctx.startLevel ?? MIN_LEVEL, min: MIN_LEVEL, max: MAX_LEVEL, down: 3, up: 1 });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private hs(): number {
    return clamp(this.ctx.stage.u * 13, 48, 110);
  }

  /** Spielfeld: oben Platz für Anzeige, im Intro-Film unten Platz für Hand und Bildunterschrift */
  private field(): Rect {
    const s = this.ctx.stage;
    const m = Math.max(10, s.u * 2);
    const top = Math.max(44, s.u * 8);
    const bottom = this.demo ? captionTop(s) - this.hs() * 1.0 - 6 : s.h - m;
    return { x: m, y: top, w: Math.max(40, s.w - 2 * m), h: Math.max(40, bottom - top) };
  }

  private restPoint(): { x: number; y: number } {
    const { w } = this.ctx.stage;
    const hs = this.hs();
    return { x: w - hs * 0.75, y: captionTop(this.ctx.stage) - hs * 0.95 };
  }

  private px(T: { nx: number; ny: number }): { x: number; y: number } {
    const f = this.field();
    return { x: f.x + T.nx * f.w, y: f.y + T.ny * f.h };
  }

  private level(): number {
    return this.demo ? MIN_LEVEL : levelOf(this.stair.level);
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    this.t0 = t;
    this.nextSpawnAt = t + 500;
    this.endAt = this.demo ? Infinity : t + this.sessionMs;
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
    if (this.demo) this.runDemo(t);
    else {
      if (t >= this.endAt) {
        this.finishSession(t);
        return;
      }
      this.ctx.hud.setProgress(clamp((t - this.t0) / this.sessionMs, 0, 1));
      this.refill(t);
    }
    for (const T of [...this.targets]) if (!T.judged && t - T.born >= T.life) this.expire(T, t);
    if (this.ctx.autoplay && !this.demo) this.autoUpdate();
    this.prune(t);
  }

  /** Nachschub: bis zur Sollzahl, je einer nach kurzer Pause, an einem Platz fern der anderen */
  private refill(t: number): void {
    if (t < this.nextSpawnAt || t > this.endAt - NO_SPAWN_END_MS) return;
    const lvl = this.level();
    if (this.targets.length >= countFor(lvl)) return;
    const f = this.field();
    const r = radiusPx(lvl, this.ctx.stage.u);
    const spot = pickSpot(this.ctx.rng, f.w, f.h, r, this.targets);
    this.addTarget(spot, lvl, lifeMs(lvl), t);
    this.nextSpawnAt = t + spawnGapMs(this.ctx.rng);
  }

  private addTarget(spot: Norm, lvl: number, life: number, t: number, key?: string): Target {
    const T: Target = {
      key: key ?? `t${this.nextKey++}`,
      slot: freeSymbol(this.targets.map((o) => o.slot)),
      nx: spot.nx,
      ny: spot.ny,
      lvl,
      born: t,
      life,
      judged: false,
      planned: false,
    };
    this.targets.push(T);
    this.updateLabel();
    return T;
  }

  // --- Intro-Film ---

  private runDemo(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    const el = t - this.t0;
    while (this.demoIdx < DEMO_EVENTS.length && el >= DEMO_EVENTS[this.demoIdx].at) {
      const e = DEMO_EVENTS[this.demoIdx++];
      if (e.caption) hud.caption(texts.captions[e.caption]);
      if (e.spawn) this.addTarget({ nx: e.spawn.nx, ny: e.spawn.ny }, MIN_LEVEL, e.spawn.life, t, e.spawn.key);
      if (e.tap) {
        const T = this.targets.find((o) => o.key === e.tap!.key);
        if (T) {
          const p = this.px(T);
          ghost.tap(p.x, p.y, { move: e.tap.move });
        }
      }
      if (e.rest) {
        const r = this.restPoint();
        ghost.moveTo(r.x, r.y, { move: 420 });
      }
      if (e.end) {
        this.finishSession(t);
        return;
      }
    }
  }

  /** Autoplay (Tests): dringendsten Kreis antippen, selten daneben oder gar nicht */
  private autoUpdate(): void {
    const { ghost, rng } = this.ctx;
    if (!ghost.idle) return;
    let pick: Target | null = null;
    for (const T of this.targets) if (!T.judged && !T.planned && (!pick || T.born + T.life < pick.born + pick.life)) pick = T;
    if (!pick) return;
    pick.planned = true;
    if (rng.chance(0.05)) return;
    const p = this.px(pick);
    const r = radiusPx(pick.lvl, this.ctx.stage.u);
    const off = rng.chance(0.07) ? r * 3.2 : 0;
    const a = rng.range(0, Math.PI * 2);
    ghost.tap(p.x + Math.cos(a) * off + rng.normal() * 3, p.y + Math.sin(a) * off + rng.normal() * 3, {
      delay: rng.range(120, 300),
      move: rng.range(220, 380),
    });
  }

  // --- Eingabe ---

  pointerDown(p: PointerInfo): void {
    if (this.done) return;
    let best: Target | null = null;
    let bestD = Infinity;
    for (const T of this.targets) {
      if (T.judged || p.t < T.born) continue;
      const c = this.px(T);
      const d = Math.hypot(p.x - c.x, p.y - c.y);
      if (d <= hitRadiusPx(radiusPx(T.lvl, this.ctx.stage.u)) && d < bestD) {
        best = T;
        bestD = d;
      }
    }
    if (best) this.clear(best, p.t);
    else this.miss(p);
  }

  private clear(T: Target, t: number): void {
    const { sfx, hud, stage } = this.ctx;
    T.judged = true;
    this.targets = this.targets.filter((o) => o !== T);
    this.cleared++;
    const frac = ringFraction(t - T.born, T.life);
    this.points += pointsFor(T.lvl, frac);
    if (this.lastClearT >= 0 && t - this.lastClearT <= MAX_INTERVAL_MS) this.intervals.push(t - this.lastClearT);
    this.lastClearT = t;
    this.gone.push({ kind: 'hit', nx: T.nx, ny: T.ny, r: radiusPx(T.lvl, stage.u), slot: T.slot, t0: t });
    sfx.good();
    hud.setScore(this.demo ? null : this.points);
    if (!this.demo) this.stair.update(true);
    this.updateLabel();
  }

  private expire(T: Target, t: number): void {
    const { stage, texts } = this.ctx;
    T.judged = true;
    this.targets = this.targets.filter((o) => o !== T);
    this.missed++;
    this.gone.push({ kind: 'gone', nx: T.nx, ny: T.ny, r: radiusPx(T.lvl, stage.u), slot: T.slot, t0: t });
    if (this.demo) {
      const c = this.px(T);
      this.toastAt(`✗ ${texts.feedback.gone}`, 'info', c.x, c.y - radiusPx(T.lvl, stage.u) * 1.5, 900, clamp(stage.u * 3.8, 15, 28));
    } else this.stair.update(false);
    this.updateLabel();
  }

  /** Tipp neben jeden Kreis: Fehler, weiches ✗ (keine Wirkung im Intro-Film) */
  private miss(p: PointerInfo): void {
    if (this.demo || p.t - this.lastWrongT < WRONG_COOLDOWN_MS) return;
    const { sfx, stage } = this.ctx;
    this.lastWrongT = p.t;
    this.wrong++;
    sfx.bad();
    this.marks.push({ sx: p.x / stage.w, sy: p.y / stage.h, t0: p.t });
    this.stair.update(false);
  }

  private toastAt(text: string, kind: ToastKind, x: number, top: number, ms: number, size: number): void {
    const { w } = this.ctx.stage;
    const half = Math.min(w / 2, text.length * size * 0.3 + 8);
    this.ctx.hud.toast(text, kind, { x: clamp(x, half, w - half), y: Math.max(size * 1.1, top - size * 0.8), ms, size });
  }

  private updateLabel(): void {
    if (this.demo) return;
    this.ctx.hud.setLabel(`${this.ctx.texts.feedback.level} ${this.level()}`);
  }

  private prune(t: number): void {
    if (this.gone.length) this.gone = this.gone.filter((g) => t - g.t0 < (g.kind === 'hit' ? BURST_MS : GONE_MS));
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
  }

  // -------------------------------------------------------------------------

  private finishSession(t: number): void {
    this.done = true;
    this.endT = t;
    const { sfx, hud } = this.ctx;
    hud.setProgress(1);
    const stats = computeStats(this.cleared, this.missed, this.wrong, this.intervals);
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' },
        secondary: [{ key: 'cleared', value: stats.cleared, unit: 'count' }],
        score: this.points,
        level: MIN_LEVEL,
      });
      return;
    }
    sfx.done();
    const thr = this.stair.threshold();
    const secondary = [
      { key: 'cleared', value: stats.cleared, unit: 'count' as const },
      { key: 'missed', value: stats.missed, unit: 'count' as const },
      ...(Number.isFinite(stats.medianMs) ? [{ key: 'perTarget', value: Math.round(stats.medianMs), unit: 'time' as const }] : []),
      { key: 'wrong', value: stats.wrong, unit: 'count' as const },
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
    for (const d of this.gone) this.drawGone(g, d, t);
    for (const T of this.targets) this.drawTarget(g, T, t, u);
    for (const m of this.marks) this.drawMark(g, m, t, u);
  }

  /** Kreis mit Symbol und Restzeit-Ring (Länge des Rings = verbleibende Zeit) */
  private drawTarget(g: CanvasRenderingContext2D, T: Target, t: number, u: number): void {
    const age = t - T.born;
    const a = clamp(age / POP_MS, 0, 1);
    if (a <= 0.01) return;
    const c = this.px(T);
    const r0 = radiusPx(T.lvl, u);
    const r = this.ctx.reducedMotion ? r0 : r0 * (0.8 + 0.2 * easeOut(age / POP_MS));
    const frac = ringFraction(age, T.life);
    g.save();
    g.globalAlpha = a;
    glow(g, c.x, c.y, r0, BLUE, 0.6);
    circle(g, c.x, c.y, r, BLUE_DARK);
    ring(g, c.x, c.y, r - Math.max(1.5, r * 0.05), BLUE_LIGHT, Math.max(2, r * 0.08));
    drawSymbol(g, T.slot, c.x, c.y, r * 0.5, '#FFFFFF');
    // Restzeit-Ring: Spur + verbleibender Bogen, bei wenig Rest gestrichelt (Form, nicht nur Farbe)
    const rr = r * 1.34;
    const lw = Math.max(3, r * 0.15);
    ring(g, c.x, c.y, rr, 'rgba(207,230,255,0.16)', lw);
    if (frac > 0.002) {
      g.beginPath();
      g.arc(c.x, c.y, rr, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * frac);
      g.lineWidth = lw;
      g.lineCap = 'round';
      if (frac < 0.3) g.setLineDash([lw * 1.6, lw * 1.3]);
      g.strokeStyle = BLUE_LIGHT;
      g.stroke();
    }
    g.restore();
  }

  /** Weggetippt: kurzer Ring; abgelaufen: Kreis blendet mit gestricheltem Rand aus */
  private drawGone(g: CanvasRenderingContext2D, d: Gone, t: number): void {
    const c = this.px(d);
    if (d.kind === 'hit') {
      if (this.ctx.reducedMotion) return;
      const k = clamp((t - d.t0) / BURST_MS, 0, 1);
      g.save();
      g.beginPath();
      g.arc(c.x, c.y, d.r * (1.05 + 0.8 * easeOut(k)), 0, Math.PI * 2);
      g.strokeStyle = withAlpha(BLUE_LIGHT, 0.85 * (1 - k));
      g.lineWidth = Math.max(1.5, 4 * (1 - k));
      g.stroke();
      g.restore();
      return;
    }
    const k = clamp((t - d.t0) / GONE_MS, 0, 1);
    g.save();
    g.globalAlpha = 0.85 * (1 - k);
    circle(g, c.x, c.y, d.r, withAlpha(BLUE_DARK, 0.8));
    ring(g, c.x, c.y, d.r * 1.34, BLUE_LIGHT, Math.max(2, d.r * 0.08), [6, 6]);
    drawSymbol(g, d.slot, c.x, c.y, d.r * 0.5, 'rgba(255,255,255,0.8)');
    g.restore();
  }

  /** Fehlklick: ✗ (Form, nicht nur Farbe), langsam verblassend, kein Blitz */
  private drawMark(g: CanvasRenderingContext2D, m: Mark, t: number, u: number): void {
    const { w, h } = this.ctx.stage;
    const k = clamp((t - m.t0) / MARK_MS, 0, 1);
    const s = Math.max(10, u * 2.2);
    const lw = Math.max(3.5, u * 0.7);
    const x = m.sx * w;
    const y = m.sy * h;
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

/** Symbole im Kreis: 0 Dreieck, 1 Quadrat, 2 Raute, 3 Plus, 4 Stern */
function drawSymbol(g: CanvasRenderingContext2D, slot: number, cx: number, cy: number, s: number, color: string): void {
  switch (slot % 5) {
    case 0:
      triangle(g, cx, cy - s * 0.12, s * 1.1, color);
      break;
    case 1:
      g.fillStyle = color;
      g.fillRect(cx - s * 0.8, cy - s * 0.8, s * 1.6, s * 1.6);
      break;
    case 2:
      g.beginPath();
      g.moveTo(cx, cy - s * 1.15);
      g.lineTo(cx + s * 0.95, cy);
      g.lineTo(cx, cy + s * 1.15);
      g.lineTo(cx - s * 0.95, cy);
      g.closePath();
      g.fillStyle = color;
      g.fill();
      break;
    case 3:
      g.fillStyle = color;
      g.fillRect(cx - s * 0.3, cy - s, s * 0.6, s * 2);
      g.fillRect(cx - s, cy - s * 0.3, s * 2, s * 0.6);
      break;
    default:
      star(g, cx, cy + s * 0.05, s * 1.2, color);
  }
}

/** Oberkante der Bildunterschrift im Intro-Film (gleiche Formel wie im Runner) */
function captionTop(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return s.h - size * 2.1 - s.h * 0.05;
}

export const zieleAbraeumen: ExerciseDefinition = {
  id: 'ziele-abraeumen',
  category: 'bewegung',
  minutes: 1,
  color: '#2C6FBB',
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="2.8"><circle cx="15" cy="16" r="8"/><circle cx="34" cy="22" r="7"/><circle cx="19" cy="37" r="6"/></g><path d="M15 11.6l1.3 2.7 3 .4-2.2 2.1.5 3-2.6-1.4-2.6 1.4.5-3-2.2-2.1 3-.4z" fill="currentColor"/><path d="M30.6 22.2l2.3 2.5 4.2-4.8" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new ZieleAbraeumen(ctx),
};
