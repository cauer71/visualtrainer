/**
 * Ziele erwischen – mehrere bewegte, atmende Kreise gleichzeitig antippen.
 *
 * Abgrenzung: Zielfang hat immer nur ein Ziel, das nach kurzer Zeit verschwindet. Schwarm-Wechsel
 * verlangt, das dringendste von mehreren wandernden Zielen zu wählen (Restzeit-Ring). Hier bleiben
 * 2–5 Kreise auf geraden Bahnen unterwegs, prallen weich am Rand ab und werden langsam größer und
 * kleiner; es zählt allein, sie zu treffen – ohne Ring, ohne Ablauf.
 *
 * - Bewegung in u/s mit dt (gleich schnell auf 60- und 120-Hz-Geräten und jeder Bühnengröße);
 *   Wandabprallung als weicher Bogen (Logik in logic.ts).
 * - Stufe (Staircase, 3-down/1-up → ≈ 79 % Treffer): Tempo, Größe und Anzahl. Treffer = Erfolg,
 *   Fehltipp (neben alle Kreise) = Fehlschlag mit ✗. Keine Zeitstrafe, keine Zeitgutschrift:
 *   feste Sitzungsdauer, ein getroffener Kreis wird nach kurzer Pause ersetzt.
 * - Gemessen wird Treffer, Trefferquote (Treffer ÷ alle Tipps) und die Zeit zwischen zwei Treffern
 *   (Median). Wohin du schaust, wird nicht gemessen.
 * - Trefferfläche größer als der sichtbare Kreis (≥ 28 px Radius); neue Kreise erscheinen nie unter
 *   dem zuletzt getippten Punkt. Kreise tragen Symbole (Dreieck, Quadrat, …), nicht nur Farbe.
 */
import { background, circle, glow, ring, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { drawCheck, drawCross, drawSymbol, freeSlot, playField, restPoint } from '../_shared/tippziele';
import {
  type Field,
  type Pt,
  baseRadiusPx,
  computeStats,
  countFor,
  hitRadiusPx,
  levelOf,
  makeField,
  MAX_GAP_MS,
  MAX_LEVEL,
  MIN_LEVEL,
  Mover,
  pickSpawn,
  pointsFor,
  predictPos,
  QUICK_SESSION_MS,
  radiusAt,
  respawnGapMs,
  SESSION_MS,
  SIZE_AMP,
  SIZE_FREQ_MAX,
  SIZE_FREQ_MIN,
  speedU,
  tipFor,
} from './logic';
import { de, it } from './texts';

const FADE_IN_MS = 250;
const BURST_MS = 420;
const CHECK_MS = 600;
const MARK_MS = 650;
const WRONG_COOLDOWN_MS = 400;
/** Kein Nachschub in den letzten ms der Sitzung */
const NO_SPAWN_END_MS = 700;

const BLUE = '#5AA9F0';
const BLUE_DARK = '#2F6FB5';
const BLUE_LIGHT = '#CFE6FF';
const WARM = '#FBBF24';

// Intro-Film: Stufe 1, langsam. Zwei Kreise unterwegs, die Hand tippt sie mit Vorhalt an
// (dorthin, wo der Kreis gleich ist); nach jedem Treffer kommt ein neuer.
const DEMO_SPEED_U = 4.5;
interface DemoSpawn {
  key: string;
  nx: number;
  ny: number;
  deg: number;
  phase: number;
}
interface DemoEvent {
  at: number;
  caption?: string;
  spawn?: DemoSpawn[];
  tap?: { key: string; delay: number; move: number };
  rest?: boolean;
  end?: boolean;
}
const DEMO_EVENTS: DemoEvent[] = [
  { at: 0, caption: 'watch' },
  {
    at: 500,
    spawn: [
      { key: 'A', nx: 0.22, ny: 0.35, deg: 20, phase: 0.6 },
      { key: 'B', nx: 0.76, ny: 0.62, deg: 200, phase: 2.6 },
    ],
  },
  { at: 2600, caption: 'size' },
  { at: 4300, caption: 'tap', tap: { key: 'A', delay: 500, move: 800 } },
  { at: 6000, rest: true },
  { at: 6200, spawn: [{ key: 'C', nx: 0.5, ny: 0.3, deg: 140, phase: 4.1 }] },
  { at: 7200, tap: { key: 'B', delay: 300, move: 800 } },
  { at: 8800, rest: true },
  { at: 9800, end: true },
];

interface Tgt {
  key: string;
  slot: number;
  lvl: number;
  m: Mover;
  /** Tempo-Faktor dieses Kreises (0,85–1,15) */
  factor: number;
  /** Basisradius in px */
  rb: number;
  phase: number;
  freq: number;
  born: number;
  judged: boolean;
  /** Bis dahin ist der Kreis Ziel eines geplanten Tipps der Hand (Autoplay) */
  plannedUntil: number;
}

interface Fx {
  kind: 'hit' | 'check';
  x: number;
  y: number;
  r: number;
  t0: number;
}

interface Mark {
  /** Bühnenkoordinaten 0..1 */
  sx: number;
  sy: number;
  t0: number;
}

class ZielKlicken implements Exercise {
  private readonly demo: boolean;
  private readonly sessionMs: number;
  private readonly stair: Staircase;
  private targets: Tgt[] = [];
  private fx: Fx[] = [];
  private marks: Mark[] = [];
  private t0 = 0;
  private endAt = Infinity;
  private endT = Infinity;
  private done = false;
  private nextSpawnAt = 0;
  private lastTap: Pt | null = null;
  private lastWrongT = -1e9;
  private lastHitT = -1;
  private gaps: number[] = [];
  private hits = 0;
  private misses = 0;
  private points = 0;
  private demoIdx = 0;
  private nextKey = 0;
  /** Autoplay: frühester Zeitpunkt für den nächsten geplanten Tipp */
  private autoFreeAt = 0;
  private rect = { x: 0, y: 0, w: 1, h: 1 };

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.sessionMs = ctx.quick ? QUICK_SESSION_MS : SESSION_MS;
    this.stair = new Staircase({ start: ctx.startLevel ?? MIN_LEVEL, min: MIN_LEVEL, max: MAX_LEVEL, down: 3, up: 1 });
  }

  // --- Geometrie: immer live aus der Bühne ---

  /** Einheit für Größen und Tempo: 1 % der kürzeren Seite, auf kleinen Bühnen nie unter 5 px */
  private unit(): number {
    return Math.max(this.ctx.stage.u, 5);
  }

  private level(): number {
    return this.demo ? MIN_LEVEL : levelOf(this.stair.level);
  }

  private speedPx(T: Tgt): number {
    const base = this.demo ? DEMO_SPEED_U : speedU(T.lvl);
    return base * this.unit() * T.factor;
  }

  private radiusNow(T: Tgt, t: number): number {
    return radiusAt(T.rb, T.phase, T.freq, t);
  }

  /** Erlaubter Bereich für den Mittelpunkt: Spielfeld abzüglich Kreisgröße */
  private fieldFor(T: { rb: number }): Field {
    const f = playField(this.ctx.stage, this.demo);
    const m = T.rb * (1 + SIZE_AMP) + 4;
    return makeField(f.x + m, f.x + f.w - m, f.y + m, f.y + f.h - m);
  }

  /** Bühne gedreht oder in der Größe geändert: Orte mitnehmen */
  private syncField(): void {
    const f = playField(this.ctx.stage, this.demo);
    const o = this.rect;
    if (Math.abs(f.x - o.x) + Math.abs(f.y - o.y) + Math.abs(f.w - o.w) + Math.abs(f.h - o.h) > 0.5) {
      for (const T of this.targets) {
        T.m.x = f.x + ((T.m.x - o.x) / Math.max(1, o.w)) * f.w;
        T.m.y = f.y + ((T.m.y - o.y) / Math.max(1, o.h)) * f.h;
      }
      this.rect = f;
    }
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    this.t0 = t;
    this.nextSpawnAt = t + 400;
    this.endAt = this.demo ? Infinity : t + this.sessionMs;
    this.rect = playField(this.ctx.stage, this.demo);
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateLabel();
    if (this.demo) {
      const r = restPoint(this.ctx.stage);
      ghost.moveTo(r.x, r.y, { move: 0 });
    }
  }

  update(dt: number, t: number): void {
    if (this.done) return;
    this.syncField();
    if (this.demo) this.runDemo(t);
    else {
      if (t >= this.endAt) {
        this.finishSession(t);
        return;
      }
      this.ctx.hud.setProgress(clamp((t - this.t0) / this.sessionMs, 0, 1));
      this.refill(t);
    }
    for (const T of this.targets) T.m.step(dt, this.speedPx(T), this.fieldFor(T));
    if (this.ctx.autoplay && !this.demo) this.autoUpdate(t);
    this.prune(t);
  }

  /** Nachschub: bis zur Sollzahl, je einer nach kurzer Pause, weit weg von den anderen und vom Finger */
  private refill(t: number): void {
    if (t < this.nextSpawnAt || t > this.endAt - NO_SPAWN_END_MS) return;
    if (this.targets.length >= countFor(this.level())) return;
    this.addTarget(t, this.level());
    this.nextSpawnAt = t + (this.targets.length < 2 ? 250 : respawnGapMs(this.ctx.rng));
  }

  private addTarget(t: number, lvl: number, demoSpawn?: DemoSpawn): Tgt {
    const { rng, stage } = this.ctx;
    const U = this.unit();
    const rb = baseRadiusPx(lvl, U);
    const shell = { rb };
    const f = this.fieldFor(shell);
    let x: number;
    let y: number;
    let theta: number;
    if (demoSpawn) {
      const pf = playField(stage, true);
      x = clamp(pf.x + demoSpawn.nx * pf.w, f.minX, f.maxX);
      y = clamp(pf.y + demoSpawn.ny * pf.h, f.minY, f.maxY);
      theta = (demoSpawn.deg * Math.PI) / 180;
    } else {
      const p = pickSpawn(rng, f, this.targets.map((o) => ({ x: o.m.x, y: o.m.y })), this.lastTap, rb * 4.5, Math.min(f.maxX - f.minX, f.maxY - f.minY) * 0.45);
      x = p.x;
      y = p.y;
      // grob zur Feldmitte, damit der Kreis nicht sofort auf eine Wand zuläuft
      theta = Math.atan2((f.minY + f.maxY) / 2 - y, (f.minX + f.maxX) / 2 - x) + rng.range(-0.9, 0.9);
    }
    const m = new Mover();
    m.place(x, y, theta);
    const T: Tgt = {
      key: demoSpawn?.key ?? `t${this.nextKey++}`,
      slot: freeSlot(this.targets.map((o) => o.slot)),
      lvl,
      m,
      factor: demoSpawn ? 1 : rng.range(0.85, 1.15),
      rb,
      phase: demoSpawn ? demoSpawn.phase : rng.range(0, Math.PI * 2),
      freq: demoSpawn ? 0.4 : rng.range(SIZE_FREQ_MIN, SIZE_FREQ_MAX),
      born: t,
      judged: false,
      plannedUntil: 0,
    };
    this.targets.push(T);
    return T;
  }

  // --- Intro-Film ---

  private runDemo(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    const el = t - this.t0;
    while (this.demoIdx < DEMO_EVENTS.length && el >= DEMO_EVENTS[this.demoIdx].at) {
      const e = DEMO_EVENTS[this.demoIdx++];
      if (e.caption) hud.caption(texts.captions[e.caption]);
      if (e.spawn) for (const s of e.spawn) this.addTarget(t, MIN_LEVEL, s);
      if (e.tap) {
        const T = this.targets.find((o) => o.key === e.tap!.key && !o.judged);
        if (T) {
          const secs = (e.tap.delay + e.tap.move) / 1000;
          const p = predictPos(this.fieldFor(T), { x: T.m.x, y: T.m.y }, T.m.theta, this.speedPx(T), secs);
          ghost.tap(p.x, p.y, { delay: e.tap.delay, move: e.tap.move });
        }
      }
      if (e.rest) {
        const r = restPoint(this.ctx.stage);
        ghost.moveTo(r.x, r.y, { move: 450 });
      }
      if (e.end) {
        this.finishSession(t);
        return;
      }
    }
  }

  /** Autoplay (Tests): einen Kreis mit Vorhalt antippen, selten daneben oder gar nicht */
  private autoUpdate(t: number): void {
    const { ghost, rng } = this.ctx;
    if (!ghost.idle || t < this.autoFreeAt) return;
    const open = this.targets.filter((T) => !T.judged && T.plannedUntil < t && t - T.born > FADE_IN_MS);
    if (!open.length) return;
    const T = rng.pick(open);
    const delay = rng.range(100, 300);
    const move = rng.range(250, 400);
    T.plannedUntil = t + delay + move + 150;
    this.autoFreeAt = t + delay + move + 250;
    if (rng.chance(0.04)) return;
    const p = predictPos(this.fieldFor(T), { x: T.m.x, y: T.m.y }, T.m.theta, this.speedPx(T), (delay + move) / 1000);
    const r = this.radiusNow(T, t + delay + move);
    const off = rng.chance(0.06) ? r * 3 + 30 : rng.normal() * r * 0.25;
    const a = rng.range(0, Math.PI * 2);
    ghost.tap(p.x + Math.cos(a) * off, p.y + Math.sin(a) * off, { delay, move });
  }

  // --- Eingabe ---

  pointerDown(p: PointerInfo): void {
    if (this.done) return;
    let best: Tgt | null = null;
    let bestD = Infinity;
    for (const T of this.targets) {
      if (T.judged || p.t < T.born + 60) continue;
      const d = Math.hypot(p.x - T.m.x, p.y - T.m.y);
      if (d <= hitRadiusPx(this.radiusNow(T, p.t)) && d < bestD) {
        best = T;
        bestD = d;
      }
    }
    if (best) this.hit(best, p);
    else this.miss(p);
  }

  private hit(T: Tgt, p: PointerInfo): void {
    const { sfx, hud } = this.ctx;
    T.judged = true;
    this.targets = this.targets.filter((o) => o !== T);
    this.hits++;
    this.lastTap = { x: p.x, y: p.y };
    if (this.lastHitT >= 0 && p.t - this.lastHitT <= MAX_GAP_MS) this.gaps.push(p.t - this.lastHitT);
    this.lastHitT = p.t;
    const r = this.radiusNow(T, p.t);
    this.fx.push({ kind: 'hit', x: T.m.x, y: T.m.y, r, t0: p.t });
    this.fx.push({ kind: 'check', x: T.m.x, y: T.m.y, r, t0: p.t });
    this.points += pointsFor(T.lvl);
    sfx.good();
    hud.setScore(this.demo ? null : this.points);
    if (!this.demo) this.stair.update(true);
    this.nextSpawnAt = Math.max(this.nextSpawnAt, p.t + respawnGapMs(this.ctx.rng));
    this.updateLabel();
  }

  /** Tipp neben alle Kreise: Fehltipp, weiches ✗ (keine Wirkung im Intro-Film) */
  private miss(p: PointerInfo): void {
    if (this.demo || p.t - this.lastWrongT < WRONG_COOLDOWN_MS) return;
    const { sfx, stage } = this.ctx;
    this.lastWrongT = p.t;
    this.misses++;
    sfx.bad();
    this.marks.push({ sx: p.x / stage.w, sy: p.y / stage.h, t0: p.t });
    this.stair.update(false);
    this.updateLabel();
  }

  private updateLabel(): void {
    if (this.demo) return;
    const { hud, texts } = this.ctx;
    hud.setLabel(`${texts.feedback.level} ${this.level()}`);
  }

  private prune(t: number): void {
    if (this.fx.length) this.fx = this.fx.filter((g) => t - g.t0 < (g.kind === 'hit' ? BURST_MS : CHECK_MS));
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
  }

  // -------------------------------------------------------------------------

  private finishSession(t: number): void {
    this.done = true;
    this.endT = t;
    const { sfx, hud } = this.ctx;
    hud.setProgress(1);
    const stats = computeStats(this.hits, this.misses, this.gaps);
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
      { key: 'hitRate', value: Math.round(stats.hitRate), unit: 'percent' as const },
      ...(Number.isFinite(stats.medianMs) ? [{ key: 'perHit', value: Math.round(stats.medianMs), unit: 'time' as const }] : []),
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
    for (const d of this.fx) this.drawFx(g, d, t);
    for (const T of this.targets) this.drawTarget(g, T, t);
    for (const m of this.marks) drawCross(g, m.sx * w, m.sy * h, clamp((t - m.t0) / MARK_MS, 0, 1), u, WARM);
  }

  /** Kreis mit Symbol; der Radius schwankt langsam (±25 %) */
  private drawTarget(g: CanvasRenderingContext2D, T: Tgt, t: number): void {
    const age = t - T.born;
    const a = clamp(age / FADE_IN_MS, 0, 1);
    if (a <= 0.01) return;
    const r0 = this.radiusNow(T, t);
    const r = this.ctx.reducedMotion ? r0 : r0 * (0.85 + 0.15 * easeOut(age / FADE_IN_MS));
    g.save();
    g.globalAlpha = a;
    glow(g, T.m.x, T.m.y, r0, BLUE, 0.6);
    circle(g, T.m.x, T.m.y, r, BLUE_DARK);
    ring(g, T.m.x, T.m.y, r - Math.max(1.5, r * 0.05), BLUE_LIGHT, Math.max(2, r * 0.08));
    drawSymbol(g, T.slot, T.m.x, T.m.y, r * 0.5, '#FFFFFF');
    g.restore();
  }

  private drawFx(g: CanvasRenderingContext2D, d: Fx, t: number): void {
    if (d.kind === 'check') {
      drawCheck(g, d.x, d.y, clamp((t - d.t0) / CHECK_MS, 0, 1), clamp(d.r * 0.5, 8, 26), '#86EFAC');
      return;
    }
    if (this.ctx.reducedMotion) return;
    const k = clamp((t - d.t0) / BURST_MS, 0, 1);
    g.save();
    g.beginPath();
    g.arc(d.x, d.y, d.r * (1.05 + 0.8 * easeOut(k)), 0, Math.PI * 2);
    g.strokeStyle = withAlpha(BLUE_LIGHT, 0.85 * (1 - k));
    g.lineWidth = Math.max(1.5, 4 * (1 - k));
    g.stroke();
    g.restore();
  }
}

export const zielKlicken: ExerciseDefinition = {
  id: 'ziel-klicken',
  category: 'bewegung',
  minutes: 1,
  color: '#3B82C4',
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="2.8"><circle cx="19" cy="19" r="9"/><circle cx="34" cy="33" r="6"/></g><path d="M5 38c4-4 9-6 14-6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="1 5"/><circle cx="19" cy="19" r="2.2" fill="currentColor"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new ZielKlicken(ctx),
};
