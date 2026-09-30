/**
 * Rand im Blick (id „randabwehr“) – langsame Punkte gleiten vom Rand zur Mitte; tippe sie an, bevor sie
 * die Mitte-Zone erreichen. Die Mitte bleibt die ruhige Fixationsmarke, der Rand wird „mit dem Augenwinkel“ beachtet.
 *
 * Vorbild: „Peripheres Sehen trainieren – Blick zentrieren“ (Katalog 801). Das Original ist ein Maus-Spiel mit
 * Zeigersperre: Fadenkreuz steuern, Combo, Zeitbonus und Zeitstrafe, Rotblitz, Bildwackeln, und die Schlangenlinie
 * hängt an der Bildrate. Hier ist es eine Tipp-Aufgabe für das Tablet:
 *
 * - Flugzeit in Sekunden (4,0 s → 1,4 s) statt px/s: gleich schwer in jeder Richtung, im Hoch- und Querformat und
 *   auf 60- wie 120-Hz-Geräten. Gerade, gut vorhersehbare Bahnen; Punkte kommen weich herein (Einblenden ≥ 250 ms).
 * - Stufe (Staircase 3-down/1-up → ≈ 79 % abgefangen): Tempo, Zahl gleichzeitiger Punkte (1 → 4), Größe.
 * - Feste Sitzungsdauer, keine Zeitgutschrift, keine Zeitstrafe, kein Rot, kein Blitz, kein Wackeln.
 * - Tipp ins Leere: nur ein weiches Zeichen, keine Strafe. Trefferradius ≥ 28 px.
 * - Gemessen wird nur, ob und wo du tippst. Ob dein Blick in der Mitte bleibt, wird NICHT gemessen (kein Eye-Tracker);
 *   die Übung ist kein Gesichtsfeldtest.
 * - Abgrenzung: Fallende Ziele (Ziele fallen von oben), Rand-Ping (kurz aufleuchtender Punkt, Ort antippen) und
 *   Zielfang (ein Ziel frei über die Fläche). Hier kommen mehrere Punkte aus allen Richtungen zur Mitte.
 */
import { background, C, circle, glow, ring, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut, mean } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo, ToastKind } from '../../core/types';
import {
  caughtPct,
  dotPos,
  edgeDistance,
  findHit,
  flightSecondsFor,
  hitRadiusFor,
  MAX_LEVEL,
  MIN_LEVEL,
  pickAngle,
  pointsFor,
  type Pt,
  radiusFor,
  type Rect,
  simultaneousFor,
  spawnGapSecondsFor,
  zoneRadiusFor,
} from './logic';
import { de, it } from './texts';

const SESSION_MS = 50_000;
const QUICK_SESSION_MS = 10_000;
const BURST_MS = 420;
const FADE_MS = 320;
const MARK_MS = 450;
const IN_MS = 280;
const DEMO_FLIGHT_S = 4;
const DEMO_END_MS = 1300;

const DOT = '#FDBA74';
const DOT_CORE = '#FFF7ED';

interface Dot {
  angle: number;
  /** Fortschritt 0 (Rand) … 1 (Mitte-Zone) */
  p: number;
  T: number;
  lvl: number;
  born: number;
  judged: boolean;
  planned: boolean;
}

interface Fx {
  kind: 'burst' | 'fade' | 'mark';
  x: number;
  y: number;
  r: number;
  t0: number;
}

interface DemoItem {
  at: number;
  angle: number;
  tapP: number;
}

/** Intro-Film: drei Punkte aus verschiedenen Richtungen, je einer wird abgefangen */
const DEMO: DemoItem[] = [
  { at: 500, angle: Math.PI * 1.2, tapP: 0.42 },
  { at: 3000, angle: Math.PI * 0.12, tapP: 0.45 },
  { at: 5500, angle: Math.PI * 0.62, tapP: 0.42 },
];

/** Oberkante der Bildunterschrift im Intro-Film (gleiche Formel wie im Runner) */
function captionTop(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return s.h - size * 2.1 - s.h * 0.05;
}

class Randabwehr implements Exercise {
  private readonly stair: Staircase;
  private readonly duration: number;
  private phase: 'play' | 'done' = 'play';
  private t0 = 0;
  private dots: Dot[] = [];
  private fx: Fx[] = [];
  private nextSpawnAt = 0;
  private caught = 0;
  private passed = 0;
  private points = 0;
  private catchP: number[] = [];
  private lastW = 0;
  private lastH = 0;
  private capState = '';
  // Autoplay / Intro-Film
  private autoAt = 0;
  private demoIdx = 0;
  private demoEndAt = 0;
  private endT = Infinity;

  constructor(private readonly ctx: ExerciseContext) {
    this.stair = new Staircase({ start: ctx.startLevel ?? MIN_LEVEL, min: MIN_LEVEL, max: MAX_LEVEL, down: 3, up: 1 });
    this.duration = ctx.quick ? QUICK_SESSION_MS : SESSION_MS;
  }

  private get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  /** Stufe für Tempo, Größe und Zahl (im Intro-Film immer die leichteste) */
  private get level(): number {
    return this.demo ? MIN_LEVEL : this.stair.level;
  }

  // -------------------------------------------------------------------------
  // Geometrie (jedes Bild aus der aktuellen Bühne berechnet → Drehen des Tablets ist unkritisch)

  private geo(): { c: Pt; field: Rect; zoneR: number; u: number } {
    const { w, h, u } = this.ctx.stage;
    const m = Math.max(10, u * 2);
    const bottom = this.demo ? captionTop(this.ctx.stage) - 8 : h - m;
    const field: Rect = { minX: m, maxX: Math.max(m + 60, w - m), minY: m, maxY: Math.max(m + 60, bottom) };
    return { c: { x: (field.minX + field.maxX) / 2, y: (field.minY + field.maxY) / 2 }, field, zoneR: zoneRadiusFor(u), u };
  }

  private radius(D: Dot): number {
    return radiusFor(D.lvl, this.ctx.stage.u);
  }

  /** Abstand der Startstelle (am Rand) von der Mitte */
  private d0(D: Dot): number {
    const { c, field, zoneR, u } = this.geo();
    return Math.max(zoneR + 3 * u, edgeDistance(c, D.angle, field) - this.radius(D) * 0.6);
  }

  private posAt(D: Dot, p: number): Pt {
    const { c, zoneR } = this.geo();
    return dotPos(c, D.angle, this.d0(D), zoneR, p);
  }

  start(t: number): void {
    const { hud, ghost, stage } = this.ctx;
    this.t0 = t;
    this.lastW = stage.w;
    this.lastH = stage.h;
    this.nextSpawnAt = t + 600;
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateLabel();
    if (this.ctx.autoplay) {
      const rest = this.restPoint();
      ghost.moveTo(rest.x, rest.y, { move: 0 });
    }
    if (this.demo) this.setCaption('edge', this.ctx.texts.captions.edge);
  }

  update(dt: number, t: number): void {
    if (this.phase === 'done') return;
    if (!this.demo) {
      const elapsed = t - this.t0;
      this.ctx.hud.setProgress(elapsed / this.duration);
      if (elapsed >= this.duration) {
        this.end();
        return;
      }
    }
    // Bewegung: nur dt, nie „pro Bild“
    for (const D of this.dots) D.p += dt / D.T;
    for (const D of [...this.dots]) if (D.p >= 1) this.reached(D, t);
    if (this.demo) this.demoUpdate(t);
    else {
      this.spawnLogic(t);
      if (this.ctx.autoplay) this.autoUpdate(t);
    }
    if (this.fx.length) this.fx = this.fx.filter((f) => t - f.t0 < (f.kind === 'burst' ? BURST_MS : f.kind === 'fade' ? FADE_MS : MARK_MS));
  }

  // -------------------------------------------------------------------------
  // Neue Punkte

  private spawnLogic(t: number): void {
    const { rng } = this.ctx;
    const lv = this.stair.level;
    if (this.dots.length >= simultaneousFor(lv) || t < this.nextSpawnAt) return;
    this.spawn(t);
    this.nextSpawnAt = t + spawnGapSecondsFor(lv) * 1000 * rng.range(0.85, 1.25);
  }

  private spawn(t: number, angleFixed?: number): Dot {
    const { rng } = this.ctx;
    const lvl = this.level;
    // Richtungen meiden, aus denen gerade noch ein Punkt weit außen kommt
    const occupied = this.dots.filter((D) => D.p < 0.5).map((D) => D.angle);
    const angle = angleFixed ?? pickAngle(() => rng.next(), occupied);
    const D: Dot = {
      angle,
      p: 0,
      T: this.demo ? DEMO_FLIGHT_S : flightSecondsFor(lvl) * rng.range(0.92, 1.08),
      lvl,
      born: t,
      judged: false,
      planned: false,
    };
    this.dots.push(D);
    return D;
  }

  private remove(D: Dot): void {
    this.dots = this.dots.filter((o) => o !== D);
  }

  // -------------------------------------------------------------------------
  // Ergebnisse

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'play') return;
    const { sfx, hud, stage } = this.ctx;
    const live = this.dots.filter((D) => p.t >= D.born);
    const items = live.map((D) => {
      const pos = this.posAt(D, D.p);
      return { x: pos.x, y: pos.y, hitR: hitRadiusFor(this.radius(D)) };
    });
    const i = findHit(items, p.x, p.y);
    if (i < 0) {
      // Tipp ins Leere: nur ein weiches Zeichen, keine Strafe
      this.fx.push({ kind: 'mark', x: p.x, y: p.y, r: 0, t0: p.t });
      sfx.tap();
      return;
    }
    const D = live[i];
    const pos = items[i];
    const r = this.radius(D);
    const pts = pointsFor(this.level, D.p);
    this.caught++;
    this.points += pts;
    this.catchP.push(clamp(D.p, 0, 1));
    this.judge(D, true);
    sfx.good();
    if (!this.ctx.reducedMotion) this.fx.push({ kind: 'burst', x: pos.x, y: pos.y, r, t0: p.t });
    this.toastAt(`✓ +${pts}`, 'good', pos.x, pos.y - r, 700, clamp(stage.u * 4.4, 17, 36));
    if (!this.demo) hud.setScore(this.points);
    this.remove(D);
  }

  /** Punkt hat die Mitte-Zone erreicht */
  private reached(D: Dot, t: number): void {
    const pos = this.posAt(D, 1);
    const r = this.radius(D);
    this.remove(D);
    this.passed++;
    this.judge(D, false);
    this.fx.push({ kind: 'mark', x: pos.x, y: pos.y, r, t0: t });
    if (!this.ctx.reducedMotion) this.fx.push({ kind: 'fade', x: pos.x, y: pos.y, r, t0: t });
    this.ctx.sfx.tick();
    this.toastAt(this.ctx.texts.feedback.passed, 'info', pos.x, pos.y - r * 1.6, 800, clamp(this.ctx.stage.u * 3.6, 15, 28));
  }

  /** Treppe: höchstens ein Ergebnis pro Punkt (im Film gibt es keine Treppe) */
  private judge(D: Dot, ok: boolean): void {
    if (D.judged) return;
    D.judged = true;
    if (this.demo) return;
    this.stair.update(ok);
    this.updateLabel();
  }

  private toastAt(text: string, kind: ToastKind, x: number, top: number, ms: number, size: number): void {
    const { w } = this.ctx.stage;
    const half = Math.min(w / 2, text.length * size * 0.3 + 8);
    this.ctx.hud.toast(text, kind, { x: clamp(x, half, w - half), y: Math.max(size * 1.1, top - size * 0.8), ms, size });
  }

  private updateLabel(): void {
    this.ctx.hud.setLabel(`${this.ctx.texts.feedback.level} ${Math.floor(this.level + 1e-9)}`);
  }

  private setCaption(state: string, txt: string): void {
    if (this.capState === state) return;
    this.capState = state;
    this.ctx.hud.caption(txt);
  }

  // -------------------------------------------------------------------------
  // Geister-Hand

  /** Ruheplatz der Hand: unten rechts, weit weg von der Mitte */
  private restPoint(): Pt {
    const { w, h, u } = this.ctx.stage;
    const hs = clamp(u * 13, 48, 110);
    const baseY = this.demo ? captionTop(this.ctx.stage) - hs * 0.95 : h - hs * 0.7;
    return { x: w - hs * 0.75, y: baseY };
  }

  /** Film: fest geskriptet */
  private demoUpdate(t: number): void {
    const { ghost, texts } = this.ctx;
    const el = t - this.t0;
    // Ein Punkt erscheint erst, wenn die Hand frei ist – so stimmt der Zeitpunkt des Antippens immer
    while (this.demoIdx < DEMO.length && el >= DEMO[this.demoIdx].at && ghost.idle) {
      const d = DEMO[this.demoIdx++];
      const D = this.spawn(t, d.angle);
      D.planned = true;
      if (this.demoIdx === 1) this.setCaption('tap', texts.captions.tap);
      if (this.demoIdx === DEMO.length) this.setCaption('fix', texts.captions.fix);
      const pos = this.posAt(D, d.tapP);
      const move = 700;
      ghost.tap(pos.x, pos.y, { delay: Math.max(0, d.tapP * D.T * 1000 - move - 30), move });
      const rest = this.restPoint();
      ghost.moveTo(rest.x, rest.y, { delay: 220, move: 560 });
    }
    if (this.demoIdx >= DEMO.length && !this.dots.length && ghost.idle && !this.demoEndAt) this.demoEndAt = t + DEMO_END_MS;
    if (this.demoEndAt && t >= this.demoEndAt) {
      this.phase = 'done';
      this.endT = t;
      this.ctx.hud.caption(null);
      this.ctx.finish({
        primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' },
        secondary: [{ key: 'count', value: this.caught, unit: 'count' }],
        score: this.points,
        level: MIN_LEVEL,
      });
    }
  }

  /** Autoplay (Tests): fängt meist richtig, lässt manche durch */
  private autoUpdate(t: number): void {
    const { ghost, rng } = this.ctx;
    if (!ghost.idle || t < this.autoAt) return;
    const lv = this.level;
    // dringendster Punkt (am weitesten innen) zuerst
    const cand = this.dots.filter((D) => !D.planned && D.p > 0.06).sort((a, b) => b.p - a.p)[0];
    if (!cand) return;
    cand.planned = true;
    const move = rng.range(300, 480);
    const pp = cand.p + (move + 30) / 1000 / cand.T;
    const pOk = clamp(0.95 - 0.02 * (lv - 1), 0.55, 0.95);
    if (pp > 0.92 || !rng.chance(pOk)) {
      // durchlassen
      this.autoAt = t + rng.range(120, 260);
      return;
    }
    const pos = this.posAt(cand, pp);
    const r = this.radius(cand);
    ghost.tap(pos.x + rng.normal() * r * 0.2, pos.y + rng.normal() * r * 0.2, { move });
    this.autoAt = t + move + rng.range(120, 260);
  }

  // -------------------------------------------------------------------------

  private end(): void {
    this.phase = 'done';
    this.endT = this.ctx.now();
    const { sfx, hud } = this.ctx;
    hud.setProgress(1);
    sfx.done();
    const thr = this.stair.threshold();
    const pct = caughtPct(this.caught, this.passed);
    let tip = 'great';
    if (this.passed > 0 && this.passed >= this.caught * 0.6) tip = 'many';
    else if (this.catchP.length >= 5 && mean(this.catchP) > 0.72) tip = 'late';
    this.ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), MIN_LEVEL, MAX_LEVEL), unit: 'level', better: 'higher' },
      secondary: [
        { key: 'caught', value: pct, unit: 'percent' },
        { key: 'passed', value: this.passed, unit: 'count' },
        { key: 'count', value: this.caught, unit: 'count' },
      ],
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip,
    });
  }

  resize(w: number, h: number): void {
    const sx = this.lastW > 0 ? w / this.lastW : 1;
    const sy = this.lastH > 0 ? h / this.lastH : 1;
    this.lastW = w;
    this.lastH = h;
    for (const f of this.fx) {
      f.x *= sx;
      f.y *= sy;
    }
    // Punkte werden jedes Bild aus (Richtung, p) berechnet – nichts weiter zu tun
  }

  // -------------------------------------------------------------------------

  render(g: CanvasRenderingContext2D, now: number): void {
    const { w, h, u, dpr } = this.ctx.stage;
    const t = Math.min(now, this.endT);
    background(g, w, h, dpr);
    const { c, field, zoneR } = this.geo();
    // Feldrand: hier kommen die Punkte herein (ganz dezent)
    g.save();
    g.setLineDash([Math.max(8, u * 1.4), Math.max(8, u * 1.4)]);
    g.strokeStyle = 'rgba(190,212,245,0.16)';
    g.lineWidth = 2;
    g.strokeRect(field.minX, field.minY, field.maxX - field.minX, field.maxY - field.minY);
    g.restore();
    // Mitte-Zone mit Fixationsmarke
    circle(g, c.x, c.y, zoneR, 'rgba(255,255,255,0.05)');
    ring(g, c.x, c.y, zoneR, 'rgba(232,238,247,0.55)', Math.max(2, u * 0.3), [Math.max(8, u * 1.4), Math.max(7, u * 1.1)]);
    const k = Math.max(7, u * 1.3);
    g.save();
    g.lineCap = 'round';
    g.strokeStyle = 'rgba(232,238,247,0.9)';
    g.lineWidth = Math.max(2.5, u * 0.4);
    g.beginPath();
    g.moveTo(c.x - k, c.y);
    g.lineTo(c.x + k, c.y);
    g.moveTo(c.x, c.y - k);
    g.lineTo(c.x, c.y + k);
    g.stroke();
    g.restore();

    for (const f of this.fx) {
      const kk = clamp((t - f.t0) / (f.kind === 'burst' ? BURST_MS : f.kind === 'fade' ? FADE_MS : MARK_MS), 0, 1);
      if (f.kind === 'burst') ring(g, f.x, f.y, f.r * (0.9 + 1.2 * easeOut(kk)), withAlpha('#FFEDD5', 0.85 * (1 - kk)), Math.max(1, 4 * (1 - kk)));
      else if (f.kind === 'fade') drawDot(g, f.x, f.y, f.r * (1 - 0.4 * easeOut(kk)), 1 - kk, 0, 0);
      else drawMark(g, f.x, f.y, kk, u);
    }
    for (const D of this.dots) {
      const pos = this.posAt(D, D.p);
      const r = this.radius(D);
      const fade = this.ctx.reducedMotion ? 1 : clamp((t - D.born) / IN_MS, 0, 1);
      // Schweif zeigt nach außen (von der Mitte weg) – die Richtung ist erkennbar
      drawDot(g, pos.x, pos.y, r, fade, D.angle, r * 2.6);
    }
  }
}

// ---------------------------------------------------------------------------
// Zeichnen

/** Punkt: gefüllter Kreis mit hellem Kern und kurzem Schweif nach außen */
function drawDot(g: CanvasRenderingContext2D, x: number, y: number, r: number, alpha: number, angle: number, tail: number): void {
  if (alpha <= 0.01 || r <= 0) return;
  g.save();
  g.globalAlpha = clamp(alpha, 0, 1);
  if (tail > 0) {
    const ex = x + Math.cos(angle) * tail;
    const ey = y + Math.sin(angle) * tail;
    const grad = g.createLinearGradient(x, y, ex, ey);
    grad.addColorStop(0, withAlpha(DOT, 0.5));
    grad.addColorStop(1, withAlpha(DOT, 0));
    g.strokeStyle = grad;
    g.lineWidth = r * 1.3;
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(ex, ey);
    g.stroke();
  }
  glow(g, x, y, r, DOT, 0.7);
  circle(g, x, y, r, DOT);
  ring(g, x, y, r - 0.75, 'rgba(255,247,237,0.8)', 1.5);
  circle(g, x, y, r * 0.36, DOT_CORE);
  g.restore();
}

/** Fehltipp bzw. durchgelassener Punkt: kleines helles ✗, das verblasst (kein Rot) */
function drawMark(g: CanvasRenderingContext2D, x: number, y: number, k: number, u: number): void {
  const s = Math.max(8, u * 1.6) * (0.85 + 0.15 * easeOut(Math.min(1, k * 4)));
  const lw = Math.max(3, u * 0.5);
  g.save();
  g.globalAlpha = 1 - k;
  g.lineCap = 'round';
  g.beginPath();
  g.moveTo(x - s, y - s);
  g.lineTo(x + s, y + s);
  g.moveTo(x + s, y - s);
  g.lineTo(x - s, y + s);
  g.strokeStyle = 'rgba(5,10,20,0.75)';
  g.lineWidth = lw + 3;
  g.stroke();
  g.strokeStyle = C.fg;
  g.lineWidth = lw;
  g.stroke();
  g.restore();
}

export const randabwehr: ExerciseDefinition = {
  id: 'randabwehr',
  category: 'bewegung',
  minutes: 1,
  color: '#2B78B5',
  showsLevel: true,
  icon:
    '<circle cx="24" cy="24" r="7" fill="none" stroke="currentColor" stroke-width="2.8" stroke-dasharray="4 3"/><path d="M21 24h6M24 21v6" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><circle cx="8" cy="9" r="3.6" fill="currentColor"/><circle cx="41" cy="12" r="3.6" fill="currentColor"/><circle cx="36" cy="41" r="3.6" fill="currentColor"/><path d="M11.5 12.5l6.5 5M38 15l-6 5M34.5 37.5l-4-7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" opacity=".5"/>',
  texts: { de, it },
  create: (ctx) => new Randabwehr(ctx),
};
