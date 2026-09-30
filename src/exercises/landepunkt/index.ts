/**
 * Landepunkt – tippe dorthin, wo der verdeckte Ball landen wird.
 *
 * Vorbild: „Prädiktive Blickverfolgung bei Verdeckung“ (Katalog 407). Das Original verspricht eine
 * Verdeckung, verdeckt aber nie und misst nichts. Hier fliegt ein Ball in einer Wurfparabel (Wurf-
 * physik, Flugzeit mit dt aufsummiert) über die Bühne und verschwindet zu einem Teil des Flugs hinter
 * einer Wand. Man tippt dorthin, wo er landen wird – der Blick muss den Landepunkt vorhersagen.
 * Danach wird die Wand durchsichtig: Man sieht den Ball landen, den eigenen Tipp und den Fehler.
 *
 * - Fehler = Abstand zwischen Tipp und Landepunkt in % der Bühnenbreite; Treffer ≤ 6 %.
 * - Adaptiv (3-down/1-up): Stufen regeln Verdeckungsanteil, Tempo (Flugdauer) und Bogenhöhe.
 * - Hauptwert: Stufe; Zusatz: mittlerer Fehler in %. Ob die Augen wirklich zum Landepunkt springen,
 *   wird nicht gemessen – nur, wo getippt wird.
 * - Nie nur Farbe: Landepunkt = Kugel mit gestricheltem Ring, Tipp = Fadenkreuz, Wertung mit ✓/✗.
 */
import { background, C, circle, ring } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { captionBottom, drawBadge } from '../_shared/zeichenaufgabe';
import {
  errorPct,
  HIT_TOL_PCT,
  hideSeconds,
  isHit,
  makeThrow,
  MAX_LEVEL,
  meanError,
  MIN_LEVEL,
  noisyTap,
  pointsFor,
  type Pt,
  type Throw,
  throwPos,
} from './logic';
import { de, it } from './texts';

const TRIALS = 14;
const QUICK_TRIALS = 3;
const DEMO_TRIALS = 2;
/** So lange nach der Landung (s) kann noch getippt werden */
const ANSWER_EXTRA_S = 1.6;
/** So lange nach Landung und Tipp (s) bleibt die Auflösung stehen */
const REVEAL_HOLD_S = 1.15;
const GAP_MS: [number, number] = [500, 800];
const FIRST_MS: [number, number] = [1000, 1500];
const END_DELAY_MS = 700;
const DEMO_FIRST_MS = 1700;
const DEMO_GAP_MS = 500;
const DEMO_LEVEL = 3;
const WALL_FADE_S = 0.3;
const WALL_ALPHA_REVEAL = 0.28;

const BALL = '#F8FAFC';
const WALL = '#111D32';

type Phase = 'ready' | 'fly' | 'reveal' | 'done';

interface Geo {
  key: string;
  groundLine: number;
  /** Ballmitte im Ruhezustand */
  groundY: number;
  r: number;
  topY: number;
  wallTop: number;
  margin: number;
  rest: { x: number; y: number };
}

interface TrialRec {
  level: number;
  ok: boolean;
  late: boolean;
  err: number;
}

class Landepunkt implements Exercise {
  private readonly stair: Staircase;
  private readonly total: number;
  private phase: Phase = 'ready';
  private nextAt = 0;
  private geo: Geo | null = null;
  private th: Throw | null = null;
  private curLevel = 1;
  /** Flugzeit in s (mit dt aufsummiert) */
  private s = 0;
  private revealEndS = 0;
  private revealClock = 0;
  private idx = 0;
  private hits = 0;
  private late = 0;
  private points = 0;
  private trials: TrialRec[] = [];
  private tap: Pt | null = null;
  private err = 0;
  private ok = false;
  private capState = '';

  constructor(private readonly ctx: ExerciseContext) {
    this.stair = new Staircase({
      start: ctx.startLevel ?? MIN_LEVEL,
      min: MIN_LEVEL,
      max: MAX_LEVEL,
      down: 3,
      up: 1,
    });
    this.total = ctx.mode === 'demo' ? DEMO_TRIALS : ctx.quick ? QUICK_TRIALS : TRIALS;
  }

  private get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  private get level(): number {
    return this.demo ? DEMO_LEVEL : this.stair.level;
  }

  // -------------------------------------------------------------------------
  // Layout

  private layout(): Geo {
    const { w, h, u } = this.ctx.stage;
    const key = `${w}x${h}:${this.demo ? 1 : 0}`;
    if (this.geo && this.geo.key === key) return this.geo;
    const r = clamp(u * 2.6, 13, 24);
    const groundLine = h * 0.86;
    const top = this.demo ? captionBottom(this.ctx.stage) + 4 : 0;
    const hs = clamp(u * 13, 48, 110);
    this.geo = {
      key,
      groundLine,
      groundY: groundLine - r,
      r,
      topY: top + h * 0.05 + r,
      wallTop: top + h * 0.015,
      margin: Math.max(u * 2, 8) + r,
      rest: { x: w - hs * 0.6, y: groundLine + (h - groundLine) * 0.3 },
    };
    // Wurf an die neue Größe anpassen (Tablet gedreht): neu abwerfen
    if (this.th && this.phase !== 'done') {
      if (this.phase !== 'ready') {
        this.phase = 'ready';
        this.nextAt = this.ctx.now() + 600;
        this.ctx.ghost.clear();
      }
      this.prepareThrow();
    }
    return this.geo;
  }

  resize(): void {
    this.geo = null;
    this.layout();
  }

  // -------------------------------------------------------------------------
  // Ablauf

  start(t: number): void {
    const { rng, ghost, texts } = this.ctx;
    const G = this.layout();
    this.phase = 'ready';
    this.nextAt = t + (this.demo ? DEMO_FIRST_MS : rng.range(FIRST_MS[0], FIRST_MS[1]));
    this.updateHud();
    if (this.demo) {
      this.setCaption('watch', texts.captions.watch);
      ghost.moveTo(G.rest.x, G.rest.y, { move: 0 });
    }
    // ruhender Ball am Abwurfort zeigen
    this.prepareThrow();
  }

  private prepareThrow(): void {
    const { rng, stage } = this.ctx;
    const G = this.layout();
    this.curLevel = this.level;
    this.th = makeThrow(
      {
        w: stage.w,
        groundY: G.groundY,
        topY: G.topY,
        margin: G.margin,
        level: this.curLevel,
        fixed: this.demo
          ? { T: 2.3, hidden: 0.5, height: 0.42, dist: stage.w * 0.56, dir: this.idx % 2 === 0 ? 1 : -1 }
          : undefined,
      },
      rng,
    );
  }

  update(dt: number, t: number): void {
    if (this.phase === 'done') return;
    const th = this.th;
    if (this.phase === 'ready') {
      if (t >= this.nextAt) {
        if (this.idx >= this.total) {
          this.end();
          return;
        }
        this.launch();
      }
    } else if (this.phase === 'fly' && th) {
      this.s += dt;
      if (this.demo && this.s >= hideSeconds(th)) this.setCaption('tap', this.ctx.texts.captions.tap);
      if (this.s >= th.T + ANSWER_EXTRA_S) this.timeout();
    } else if (this.phase === 'reveal') {
      this.s += dt;
      this.revealClock += dt;
      if (this.s >= this.revealEndS) this.afterReveal(t);
    }
  }

  private launch(): void {
    if (!this.th) this.prepareThrow();
    this.phase = 'fly';
    this.s = 0;
    this.tap = null;
    this.revealClock = 0;
    if (this.demo) this.setCaption('fly', this.ctx.texts.captions.watch);
    if (this.ctx.autoplay) this.planGhost();
  }

  pointerDown(p: PointerInfo): void {
    const th = this.th;
    if (this.phase !== 'fly' || !th) return;
    // getippt wird erst, wenn der Ball verdeckt ist; nur der erste Tipp zählt
    if (this.s < hideSeconds(th)) return;
    const land = this.landing(th);
    this.tap = { x: p.x, y: p.y };
    this.err = errorPct(this.tap, land, this.ctx.stage.w);
    this.ok = isHit(this.err);
    this.finishTrial(false);
  }

  private timeout(): void {
    this.tap = null;
    this.err = NaN;
    this.ok = false;
    this.finishTrial(true);
  }

  private landing(th: Throw): Pt {
    const G = this.layout();
    return { x: th.x0 + th.dir * th.dist, y: G.groundLine };
  }

  private finishTrial(late: boolean): void {
    const { sfx, hud, fmt, stage } = this.ctx;
    const th = this.th;
    if (!th) return;
    if (late) {
      this.late++;
      sfx.bad();
    } else if (this.ok) {
      this.hits++;
      this.points += pointsFor(this.err, this.curLevel);
      sfx.good();
    } else {
      sfx.bad();
    }
    this.trials.push({ level: this.curLevel, ok: this.ok, late, err: this.err });
    if (!this.demo) this.stair.update(this.ok);
    this.idx++;
    this.updateHud();
    this.phase = 'reveal';
    this.revealClock = 0;
    this.revealEndS = Math.max(th.T, this.s) + REVEAL_HOLD_S;
    const land = this.landing(th);
    const size = clamp(stage.u * 5, 18, 40);
    const text = late ? this.ctx.texts.feedback.late : `${this.ok ? '✓' : '✗'} ${fmt.num(this.err, 1)} %`;
    const half = Math.min(stage.w / 2, text.length * size * 0.32 + 10);
    hud.toast(text, this.ok ? 'good' : 'bad', {
      x: clamp(land.x, half, stage.w - half),
      y: Math.max(size * 1.2, land.y - HIT_TOL_PCT * 0.01 * stage.w - size * 2.2),
      ms: 1000,
      size,
    });
    if (this.demo) this.setCaption('check', this.ctx.texts.captions.check);
  }

  private afterReveal(t: number): void {
    const { rng } = this.ctx;
    this.phase = 'ready';
    this.th = null;
    this.tap = null;
    if (this.idx >= this.total) {
      this.nextAt = t + END_DELAY_MS;
      this.phase = 'ready';
      return;
    }
    this.prepareThrow();
    this.nextAt = t + (this.demo ? DEMO_GAP_MS : rng.range(GAP_MS[0], GAP_MS[1]));
    if (this.demo) this.setCaption('watch', this.ctx.texts.captions.watch);
  }

  private setCaption(state: string, text: string): void {
    if (this.capState === state) return;
    this.capState = state;
    this.ctx.hud.caption(text, 'top');
  }

  private updateHud(): void {
    const { hud, texts } = this.ctx;
    hud.setProgress(this.idx / this.total);
    hud.setScore(this.hits);
    hud.setLabel(`${texts.feedback.level} ${Math.floor(this.level + 1e-9)}`);
  }

  // -------------------------------------------------------------------------
  // Geister-Hand

  /** Intro-Film und Autoplay: Hand tippt kurz nach dem Verschwinden in die Nähe des Landepunkts */
  private planGhost(): void {
    const { ghost, rng, stage } = this.ctx;
    const th = this.th;
    if (!th) return;
    const G = this.layout();
    ghost.clear();
    if (!this.demo && rng.chance(0.05)) return;
    const land = this.landing(th);
    let tp: Pt;
    if (this.demo) tp = { x: land.x + th.dir * stage.w * 0.012, y: land.y - stage.h * 0.01 };
    else tp = noisyTap(land, 1.5 + 0.28 * this.curLevel, stage.w, rng);
    tp = { x: clamp(tp.x, 10, stage.w - 10), y: clamp(tp.y, G.topY, stage.h - 10) };
    const move = this.demo ? 560 : rng.range(320, 460);
    const arrive = hideSeconds(th) * 1000 + (this.demo ? 450 : rng.range(250, 850));
    ghost.tap(tp.x, tp.y, { delay: Math.max(0, arrive - move), move });
    ghost.moveTo(G.rest.x, G.rest.y, { delay: 500, move: 520 });
  }

  // -------------------------------------------------------------------------

  private end(): void {
    this.phase = 'done';
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'level', value: DEMO_LEVEL, unit: 'level', better: 'higher' },
        secondary: [{ key: 'hits', value: this.hits, unit: 'count' }],
        score: this.points,
        level: MIN_LEVEL,
      });
      return;
    }
    this.ctx.sfx.done();
    const n = this.trials.length;
    const thr = this.stair.threshold();
    const errs = this.trials.filter((r) => !r.late).map((r) => r.err);
    const mean = meanError(errs);
    const acc = n ? (100 * this.hits) / n : 0;
    const maxLevel = this.trials.reduce((m, tr) => Math.max(m, tr.level), MIN_LEVEL);
    const manyLate = this.late >= Math.max(2, Math.ceil(n * 0.2));
    let tip = 'great';
    if (manyLate) tip = 'late';
    else if (Number.isFinite(mean) && mean > 10) tip = 'far';
    const secondary = [
      ...(Number.isFinite(mean) ? [{ key: 'meanError', value: Math.round(mean * 10) / 10, unit: 'percent' as const }] : []),
      { key: 'accuracy', value: Math.round(acc), unit: 'percent' as const },
      { key: 'maxLevel', value: Math.floor(maxLevel + 1e-9), unit: 'level' as const },
    ];
    this.ctx.finish({
      primary: { key: 'level', value: Math.max(MIN_LEVEL, Math.round(thr)), unit: 'level', better: 'higher' },
      secondary,
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip,
    });
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D): void {
    const { w, h, dpr } = this.ctx.stage;
    const G = this.layout();
    background(g, w, h, dpr);
    // Boden
    g.fillStyle = 'rgba(3,8,18,0.4)';
    g.fillRect(0, G.groundLine, w, h - G.groundLine);
    g.fillStyle = 'rgba(255,255,255,0.16)';
    g.fillRect(0, Math.round(G.groundLine), w, 2);
    const th = this.th;
    if (!th) return;
    // Abwurfmarke
    ring(g, th.x0, G.groundLine, G.r * 0.9, 'rgba(255,255,255,0.22)', 2);
    const pos = this.phase === 'ready' ? { x: th.x0, y: th.y0 } : throwPos(th, this.s);
    // Ball (vor der Wand gezeichnet, die Wand verdeckt ihn dann)
    circle(g, pos.x, pos.y, G.r, BALL);
    this.drawWall(g, G, th);
    if (this.phase === 'reveal') this.drawReveal(g, G, th);
  }

  private wallEdge(G: Geo, th: Throw): number {
    const xHide = throwPos(th, hideSeconds(th)).x;
    return xHide - th.dir * G.r * 1.1;
  }

  private drawWall(g: CanvasRenderingContext2D, G: Geo, th: Throw): void {
    const { w, h } = this.ctx.stage;
    const edge = this.wallEdge(G, th);
    const x0 = th.dir === 1 ? edge : 0;
    const x1 = th.dir === 1 ? w : edge;
    let alpha = 1;
    if (this.phase === 'reveal') {
      alpha = this.ctx.reducedMotion ? WALL_ALPHA_REVEAL : 1 + (WALL_ALPHA_REVEAL - 1) * clamp(this.revealClock / WALL_FADE_S, 0, 1);
    }
    g.save();
    g.globalAlpha = alpha;
    g.fillStyle = WALL;
    g.fillRect(x0, G.wallTop, x1 - x0, h - G.wallTop);
    // Schraffur, damit die Wand als Fläche erkennbar ist (nicht nur Farbe)
    g.beginPath();
    g.rect(x0, G.wallTop, x1 - x0, h - G.wallTop);
    g.clip();
    g.strokeStyle = 'rgba(140,175,230,0.10)';
    g.lineWidth = 2;
    const step = 26;
    g.beginPath();
    for (let x = x0 - h; x < x1 + h; x += step) {
      g.moveTo(x, h);
      g.lineTo(x + (h - G.wallTop), G.wallTop);
    }
    g.stroke();
    g.restore();
    // Kante der Wand
    g.save();
    g.globalAlpha = alpha;
    g.strokeStyle = 'rgba(190,212,245,0.4)';
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(edge, G.wallTop);
    g.lineTo(edge, h);
    g.stroke();
    // Boden hinter der Wand gestrichelt: hier wird getippt
    g.setLineDash([10, 8]);
    g.strokeStyle = 'rgba(210,225,250,0.5)';
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(x0, G.groundLine);
    g.lineTo(x1, G.groundLine);
    g.stroke();
    g.restore();
  }

  private drawReveal(g: CanvasRenderingContext2D, G: Geo, th: Throw): void {
    const { w } = this.ctx.stage;
    const land = this.landing(th);
    const tolPx = (HIT_TOL_PCT / 100) * w;
    const fade = this.ctx.reducedMotion ? 1 : clamp(this.revealClock / WALL_FADE_S, 0, 1);
    g.save();
    g.globalAlpha = fade;
    // Toleranzring um den Landepunkt (gestrichelt)
    ring(g, land.x, land.y, tolPx, 'rgba(232,238,247,0.55)', 2.5, [8, 7]);
    // Landepunkt des Balls: Kreis in Ballgröße
    ring(g, land.x, G.groundY, G.r + 2, BALL, 3);
    // Tipp: Fadenkreuz im Ring, mit Verbindungslinie
    if (this.tap) {
      const tp = this.tap;
      g.strokeStyle = 'rgba(232,238,247,0.4)';
      g.lineWidth = 2;
      g.setLineDash([4, 5]);
      g.beginPath();
      g.moveTo(tp.x, tp.y);
      g.lineTo(land.x, land.y);
      g.stroke();
      g.setLineDash([]);
      const k = 13;
      g.lineCap = 'round';
      g.strokeStyle = 'rgba(11,20,36,0.85)';
      g.lineWidth = 7;
      g.beginPath();
      g.moveTo(tp.x - k, tp.y);
      g.lineTo(tp.x + k, tp.y);
      g.moveTo(tp.x, tp.y - k);
      g.lineTo(tp.x, tp.y + k);
      g.stroke();
      g.strokeStyle = C.info;
      g.lineWidth = 3.5;
      g.beginPath();
      g.moveTo(tp.x - k, tp.y);
      g.lineTo(tp.x + k, tp.y);
      g.moveTo(tp.x, tp.y - k);
      g.lineTo(tp.x, tp.y + k);
      g.stroke();
      ring(g, tp.x, tp.y, k + 4, C.info, 2.5);
    }
    // Wertung als Abzeichen (✓ / ✗) am Landepunkt
    const rad = clamp(G.r * 0.9, 11, 18);
    drawBadge(g, land.x + tolPx * 0.72, land.y - tolPx * 0.72, rad, this.ok ? 'ok' : 'bad');
    g.restore();
  }
}

export const landepunkt: ExerciseDefinition = {
  id: 'landepunkt',
  category: 'bewegung',
  minutes: 1,
  color: '#2F6FB8',
  icon:
    '<path d="M6 36C12 10 30 10 36 34" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-dasharray="1 6.5"/><circle cx="13" cy="21" r="4.4" fill="currentColor"/><rect x="26" y="8" width="16" height="32" rx="2.5" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="4 3"/><path d="M4 41h40" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/><path d="M34.5 36.5l3 3m0-3l-3 3" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new Landepunkt(ctx),
};
