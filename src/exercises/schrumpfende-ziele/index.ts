/**
 * Schrumpfende Ziele – mehrere Kreise schrumpfen gleichzeitig: den kleinsten zuerst antippen.
 *
 * Abgrenzung: Präzisions-Flick hat nur ein Ziel und zählt die Mittigkeit. Ziele abräumen zeigt die
 * Restzeit an einem Ring und lässt die Reihenfolge frei. Hier ist die Größe selbst die Dringlichkeit:
 * alle Kreise schrumpfen gleich schnell und verschwinden bei derselben (gestrichelt gezeichneten)
 * Mindestgröße – der kleinste ist also immer der, der als Erster weg ist. Es geht ums Abwägen:
 * welcher ist dran? Die Mitte treffen ist nicht nötig.
 *
 * - Runden: 2–5 Kreise erscheinen gleichzeitig, eine Runde endet, wenn alle getippt oder verschwunden
 *   sind. Feste Zahl an Runden, keine Zeitstrafe, kein Zeitbonus.
 * - Stufe (Staircase, 2-down/1-up, je Runde ein Ergebnis): Anzahl und Schrumpftempo. Erfolg einer Runde =
 *   kein Kreis verschwunden. Die Reihenfolge fließt nur in die Zusatzwerte ein (Reihenfolge-Treffer in %).
 * - Dt-basiert (u/s), gleich schnell auf 60- und 120-Hz-Geräten und auf jeder Bühnengröße.
 * - Fehltipp (neben jeden Kreis) = ✗ an der Stelle; ein Tipp auf einen größeren Kreis (obwohl ein
 *   kleinerer da ist) zeigt ein ruhiges „Kleineres zuerst“, der Kreis gilt trotzdem als getippt.
 * - Trefferfläche ≥ 24 px Radius. Nächste Runde erscheint nie unter dem zuletzt getippten Punkt.
 * - Gemessen wird nur dein Tippen, nicht dein Blick.
 */
import { background, circle, glow, ring, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { drawCheck, drawCross, playField, restPoint, toastNear } from '../_shared/tippziele';
import {
  type Placed,
  computeStats,
  hitRadiusPx,
  isInOrder,
  levelOf,
  lifespans,
  MAX_LEVEL,
  MIN_LEVEL,
  MIN_RADIUS_U,
  placeTargets,
  pointsFor,
  QUICK_ROUNDS,
  radiusU,
  ROUNDS,
  roundGapMs,
  shrinkRateU,
  startRadiusU,
  tipFor,
} from './logic';
import { de, it } from './texts';

const FADE_IN_MS = 250;
const FADE_OUT_MS = 320;
const BURST_MS = 420;
const CHECK_MS = 700;
const MARK_MS = 650;
const WRONG_COOLDOWN_MS = 400;
const END_HOLD_MS = 900;

const BLUE = '#5AA9F0';
const BLUE_DARK = '#2F6FB5';
const BLUE_LIGHT = '#CFE6FF';
const WARM = '#FBBF24';

// Intro-Film: Stufe 1, sehr langsames Schrumpfen. Runde 1 mit drei Kreisen (kleinster zuerst),
// Runde 2 mit zwei Kreisen. Alle Tipps trifft die Hand in der Kreismitte.
const DEMO_RATE_U = 0.65;
interface DemoRound {
  at: number;
  lives: number[];
  spots: Placed[];
  /** Reihenfolge der Tipps (Indizes in lives) mit Wartezeit vor der Fahrt und Fahrzeit */
  taps: Array<{ i: number; delay: number; move: number }>;
}
const DEMO_ROUNDS: DemoRound[] = [
  {
    at: 1300,
    lives: [5000, 6800, 8600],
    spots: [
      { nx: 0.2, ny: 0.45 },
      { nx: 0.5, ny: 0.68 },
      { nx: 0.8, ny: 0.4 },
    ],
    taps: [
      { i: 0, delay: 1500, move: 700 },
      { i: 1, delay: 500, move: 650 },
      { i: 2, delay: 500, move: 650 },
    ],
  },
  {
    at: 7700,
    lives: [4600, 6400],
    spots: [
      { nx: 0.65, ny: 0.3 },
      { nx: 0.3, ny: 0.62 },
    ],
    taps: [
      { i: 0, delay: 900, move: 650 },
      { i: 1, delay: 400, move: 650 },
    ],
  },
];
const DEMO_END_MS = 11900;

interface Target {
  nx: number;
  ny: number;
  born: number;
  life: number;
  rate: number;
  judged: boolean;
  planned: boolean;
}

interface Fx {
  kind: 'hit' | 'gone' | 'check';
  nx: number;
  ny: number;
  r: number;
  t0: number;
}

interface Mark {
  sx: number;
  sy: number;
  t0: number;
}

class SchrumpfendeZiele implements Exercise {
  private readonly demo: boolean;
  private readonly total: number;
  private readonly stair: Staircase;
  private targets: Target[] = [];
  private fx: Fx[] = [];
  private marks: Mark[] = [];
  private t0 = 0;
  private endAt = Infinity;
  private endT = Infinity;
  private done = false;
  private nextAt = 0;
  private roundsStarted = 0;
  private roundsDone = 0;
  private roundVanished = 0;
  private roundLevel = MIN_LEVEL;
  private lastTap: { x: number; y: number } | null = null;
  private lastWrongT = -1e9;
  private lastHintT = -1e9;
  private orderFlags: boolean[] = [];
  private vanished = 0;
  private wrong = 0;
  private points = 0;
  private demoIdx = 0;
  private demoNextShown = false;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.total = ctx.quick ? QUICK_ROUNDS : ROUNDS;
    this.stair = new Staircase({ start: ctx.startLevel ?? MIN_LEVEL, min: MIN_LEVEL, max: MAX_LEVEL, down: 2, up: 1 });
  }

  // --- Geometrie: immer live aus der Bühne ---

  /** Einheit für Größen: 1 % der kürzeren Seite, auf kleinen Bühnen nie unter 5 px */
  private unit(): number {
    return Math.max(this.ctx.stage.u, 5);
  }

  private px(T: { nx: number; ny: number }): { x: number; y: number } {
    const f = playField(this.ctx.stage, this.demo);
    return { x: f.x + T.nx * f.w, y: f.y + T.ny * f.h };
  }

  private radiusNow(T: Target, t: number): number {
    return radiusU(T.rate, T.life, t - T.born) * this.unit();
  }

  private level(): number {
    return this.demo ? MIN_LEVEL : levelOf(this.stair.level);
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    this.t0 = t;
    this.nextAt = t + 600;
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateLabel();
    if (this.demo) {
      const r = restPoint(this.ctx.stage);
      ghost.moveTo(r.x, r.y, { move: 0 });
      hud.caption(this.ctx.texts.captions.watch);
    }
  }

  update(_dt: number, t: number): void {
    if (this.done) return;
    if (t >= this.endAt) {
      this.finishSession(t);
      return;
    }
    if (this.demo) this.runDemo(t);
    else if (this.targets.length === 0 && this.roundsStarted < this.total && t >= this.nextAt) this.spawnRound(t);
    for (const T of [...this.targets]) if (!T.judged && t - T.born >= T.life) this.expire(T, t);
    if (this.ctx.autoplay && !this.demo) this.autoUpdate(t);
    this.prune(t);
  }

  /** Neue Runde: Lebensdauern zufällig auf die Orte verteilt, Orte weit auseinander und fern vom Finger */
  private spawnRound(t: number, demoRound?: DemoRound): void {
    const { rng, stage } = this.ctx;
    const f = playField(stage, this.demo);
    const U = this.unit();
    const lvl = this.level();
    const rate = demoRound ? DEMO_RATE_U : shrinkRateU(lvl);
    const lives = demoRound ? demoRound.lives : rng.shuffle(lifespans(lvl));
    const radii = lives.map((l) => startRadiusU(rate, l) * U);
    const spots =
      demoRound?.spots ??
      placeTargets(
        rng,
        f.w,
        f.h,
        radii,
        U * 1.2,
        this.lastTap ? { x: this.lastTap.x - f.x, y: this.lastTap.y - f.y } : null,
        Math.min(f.w, f.h) * 0.3,
      );
    this.targets = lives.map((life, i) => ({ nx: spots[i].nx, ny: spots[i].ny, born: t, life, rate, judged: false, planned: false }));
    this.roundsStarted++;
    this.roundVanished = 0;
    this.roundLevel = lvl;
    this.updateLabel();
  }

  // --- Intro-Film ---

  private runDemo(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    const el = t - this.t0;
    if (this.demoIdx < DEMO_ROUNDS.length && el >= DEMO_ROUNDS[this.demoIdx].at && this.targets.length === 0) {
      const d = DEMO_ROUNDS[this.demoIdx++];
      this.spawnRound(t, d);
      hud.caption(this.demoIdx === 1 ? texts.captions.smallest : texts.captions.again);
      const made = [...this.targets];
      for (const tp of d.taps) {
        const c = this.px(made[tp.i]);
        ghost.tap(c.x, c.y, { delay: tp.delay, move: tp.move });
      }
      const rest = restPoint(this.ctx.stage);
      ghost.moveTo(rest.x, rest.y, { delay: 500, move: 500 });
    }
    if (!this.demoNextShown && this.demoIdx === 1 && this.orderFlags.length >= 1) {
      this.demoNextShown = true;
      hud.caption(texts.captions.next);
    }
    if (el >= DEMO_END_MS) this.finishSession(t);
  }

  /** Autoplay (Tests): meist den kleinsten, manchmal einen anderen, selten gar keinen */
  private autoUpdate(t: number): void {
    const { ghost, rng } = this.ctx;
    if (!ghost.idle) return;
    const open = this.targets.filter((T) => !T.judged && !T.planned);
    if (!open.length) return;
    let pick: Target;
    if (rng.chance(0.85)) {
      pick = open[0];
      for (const T of open) if (this.radiusNow(T, t) < this.radiusNow(pick, t)) pick = T;
    } else pick = rng.pick(open);
    pick.planned = true;
    if (rng.chance(0.04)) return;
    const c = this.px(pick);
    const off = rng.chance(0.06) ? this.radiusNow(pick, t) * 3.5 + 30 : 0;
    const a = rng.range(0, Math.PI * 2);
    ghost.tap(c.x + Math.cos(a) * off + rng.normal() * 3, c.y + Math.sin(a) * off + rng.normal() * 3, {
      delay: rng.range(150, 350),
      move: rng.range(220, 380),
    });
  }

  // --- Eingabe ---

  pointerDown(p: PointerInfo): void {
    if (this.done) return;
    let best: Target | null = null;
    let bestD = Infinity;
    for (const T of this.targets) {
      if (T.judged || p.t < T.born + 60) continue;
      const c = this.px(T);
      const d = Math.hypot(p.x - c.x, p.y - c.y);
      if (d <= hitRadiusPx(this.radiusNow(T, p.t)) && d < bestD) {
        best = T;
        bestD = d;
      }
    }
    if (best) this.clear(best, p);
    else this.miss(p);
  }

  private clear(T: Target, p: PointerInfo): void {
    const { sfx, hud, stage, texts } = this.ctx;
    const live = this.targets.filter((o) => !o.judged);
    const radii = live.map((o) => this.radiusNow(o, p.t));
    const inOrder = isInOrder(radii, live.indexOf(T));
    T.judged = true;
    this.targets = this.targets.filter((o) => o !== T);
    this.lastTap = { x: p.x, y: p.y };
    this.orderFlags.push(inOrder);
    const r = this.radiusNow(T, p.t);
    const c = this.px(T);
    this.fx.push({ kind: inOrder ? 'check' : 'hit', nx: T.nx, ny: T.ny, r, t0: p.t });
    if (inOrder) this.fx.push({ kind: 'hit', nx: T.nx, ny: T.ny, r, t0: p.t });
    this.points += pointsFor(this.roundLevel, inOrder);
    hud.setScore(this.demo ? null : this.points);
    if (inOrder) sfx.good();
    else {
      sfx.bad();
      if (p.t - this.lastHintT > 900) {
        this.lastHintT = p.t;
        toastNear(hud, stage.w, `✗ ${texts.feedback.smaller}`, 'info', c.x, c.y - r * 1.5, 1000, clamp(stage.u * 3.8, 15, 28));
      }
    }
    this.afterResolve(p.t);
  }

  private expire(T: Target, t: number): void {
    T.judged = true;
    this.targets = this.targets.filter((o) => o !== T);
    this.vanished++;
    this.roundVanished++;
    this.fx.push({ kind: 'gone', nx: T.nx, ny: T.ny, r: this.radiusNow(T, t), t0: t });
    this.afterResolve(t);
  }

  /** Nach jedem Kreis prüfen, ob die Runde zu Ende ist */
  private afterResolve(t: number): void {
    if (this.targets.length > 0) return;
    const { hud } = this.ctx;
    this.roundsDone++;
    hud.setProgress(clamp(this.roundsDone / this.total, 0, 1));
    if (!this.demo) this.stair.update(this.roundVanished === 0);
    if (!this.demo && this.roundsDone >= this.total) this.endAt = t + END_HOLD_MS;
    this.nextAt = t + roundGapMs(this.ctx.rng);
    this.updateLabel();
  }

  /** Tipp neben alle Kreise: Fehltipp, weiches ✗ (keine Wirkung im Intro-Film) */
  private miss(p: PointerInfo): void {
    if (this.demo || p.t - this.lastWrongT < WRONG_COOLDOWN_MS) return;
    const { sfx, stage } = this.ctx;
    this.lastWrongT = p.t;
    this.wrong++;
    sfx.bad();
    this.marks.push({ sx: p.x / stage.w, sy: p.y / stage.h, t0: p.t });
  }

  private updateLabel(): void {
    if (this.demo) return;
    const { hud, texts } = this.ctx;
    hud.setLabel(`${texts.feedback.level} ${this.level()} · ${Math.min(this.roundsStarted, this.total)}/${this.total}`);
  }

  private prune(t: number): void {
    if (this.fx.length) this.fx = this.fx.filter((g) => t - g.t0 < (g.kind === 'gone' ? FADE_OUT_MS : g.kind === 'check' ? CHECK_MS : BURST_MS));
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
  }

  // -------------------------------------------------------------------------

  private finishSession(t: number): void {
    this.done = true;
    this.endT = t;
    const { sfx, hud } = this.ctx;
    hud.setProgress(1);
    const stats = computeStats(this.orderFlags, this.vanished, this.wrong);
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
      ...(Number.isFinite(stats.orderRate) ? [{ key: 'orderRate', value: Math.round(stats.orderRate), unit: 'percent' as const }] : []),
      { key: 'cleared', value: stats.cleared, unit: 'count' as const },
      { key: 'vanished', value: stats.vanished, unit: 'count' as const },
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
    for (const d of this.fx) this.drawFx(g, d, t);
    for (const T of this.targets) this.drawTarget(g, T, t);
    for (const m of this.marks) drawCross(g, m.sx * w, m.sy * h, clamp((t - m.t0) / MARK_MS, 0, 1), u, WARM);
  }

  /**
   * Kreis mit gestricheltem Innenkreis (= Größe, bei der er verschwindet). Je kleiner der Kreis,
   * desto dringender – die Größe ist die einzige Angabe, kein Zähler.
   */
  private drawTarget(g: CanvasRenderingContext2D, T: Target, t: number): void {
    const age = t - T.born;
    const a = clamp(age / FADE_IN_MS, 0, 1);
    if (a <= 0.01) return;
    const c = this.px(T);
    const r = this.radiusNow(T, t);
    const lim = MIN_RADIUS_U * this.unit();
    g.save();
    g.globalAlpha = a;
    glow(g, c.x, c.y, r, BLUE, 0.5);
    circle(g, c.x, c.y, r, BLUE_DARK);
    ring(g, c.x, c.y, r - Math.max(1.5, r * 0.04), BLUE_LIGHT, Math.max(2, r * 0.06));
    ring(g, c.x, c.y, Math.min(lim, r), 'rgba(255,255,255,0.8)', Math.max(1.6, lim * 0.14), [4, 4]);
    g.restore();
  }

  private drawFx(g: CanvasRenderingContext2D, d: Fx, t: number): void {
    const c = this.px(d);
    if (d.kind === 'check') {
      const k = clamp((t - d.t0) / CHECK_MS, 0, 1);
      drawCheck(g, c.x, c.y, k, clamp(d.r * 0.55, 8, 28), '#86EFAC');
      return;
    }
    if (d.kind === 'hit') {
      if (this.ctx.reducedMotion) return;
      const k = clamp((t - d.t0) / BURST_MS, 0, 1);
      g.save();
      g.beginPath();
      g.arc(c.x, c.y, d.r * (1.05 + 0.7 * easeOut(k)), 0, Math.PI * 2);
      g.strokeStyle = withAlpha(BLUE_LIGHT, 0.85 * (1 - k));
      g.lineWidth = Math.max(1.5, 4 * (1 - k));
      g.stroke();
      g.restore();
      return;
    }
    const k = clamp((t - d.t0) / FADE_OUT_MS, 0, 1);
    g.save();
    g.globalAlpha = 0.85 * (1 - k);
    circle(g, c.x, c.y, d.r, withAlpha(BLUE_DARK, 0.8));
    ring(g, c.x, c.y, d.r, BLUE_LIGHT, Math.max(2, d.r * 0.1), [6, 6]);
    g.restore();
  }
}

export const schrumpfendeZiele: ExerciseDefinition = {
  id: 'schrumpfende-ziele',
  category: 'bewegung',
  minutes: 1,
  color: '#1F5F99',
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="2.8"><circle cx="15" cy="16" r="10"/><circle cx="35" cy="22" r="6.5"/><circle cx="21" cy="38" r="3.8"/></g><circle cx="21" cy="38" r="1.2" fill="currentColor"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new SchrumpfendeZiele(ctx),
};
