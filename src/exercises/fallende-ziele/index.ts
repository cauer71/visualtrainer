/**
 * Fallende Ziele – Ziele fangen, bevor sie den Boden berühren (Auge-Hand-Koordination).
 *
 * Gegenüber dem Vorbild („Reaktionstest-Spiel“: rote Punkte, Combo, Zeitstrafe, Fehlerblitz):
 * - Fallzeit in Sekunden statt px/s (gleiche Aufgabe im Hoch- und Querformat, gleich schnell auf
 *   60- und 120-Hz-Geräten); ab Stufe 8 leichte Beschleunigung, Gesamtfallzeit bleibt erhalten.
 * - Adaptiv in beide Richtungen (3-down/1-up → ≈ 79 % gefangene Ziele) statt an Punkte gekoppelt:
 *   mit der Stufe fallen die Ziele schneller, kleiner und bis zu 3 gleichzeitig.
 * - Feste Sitzungsdauer, keine Zeitstrafe, kein Wackeln, kein roter Blitz.
 * - Ab Stufe 9 erscheinen Quadrate mit Kreuz (Stör-Objekte), die man nicht antippen soll
 *   (Go/No-Go). Sie unterscheiden sich durch die Form, nicht nur durch die Farbe.
 * - Trefferprüfung an der zuletzt gezeigten Position; Trefferradius ≥ 26 px.
 * - Misst, wie hoch man die Ziele fängt (Anteil der Fallstrecke), statt einer „Reaktionszeit“.
 */
import { background, circle, fillRR, glow, ring, rrPath, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut, lerp, mean } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo, ToastKind } from '../../core/types';
import {
  accelFor,
  advance,
  fallTimeFor,
  findHit,
  hitRadiusFor,
  MAX_LEVEL,
  meanHeightPct,
  MIN_LEVEL,
  pickLane,
  pointsFor,
  radiusFor,
  simultaneousFor,
  stopChance,
} from './logic';
import { de, it } from './texts';

const SESSION_MS = 50_000;
const QUICK_SESSION_MS = 10_000;
const BURST_MS = 420;
const FADE_MS = 300;
const MARK_MS = 420;
/** Intro-Film: langsam (4 s Fallzeit) */
const DEMO_FALL_S = 4;
const DEMO_END_MS = 1300;

const BLUE = '#38BDF8';
const BLUE_LIGHT = '#BAE6FD';
const AMBER = '#FBBF24';
const MISS = '#F87171';

interface Faller {
  /** Stör-Objekt (Quadrat mit Kreuz) – nicht antippen */
  stop: boolean;
  /** Waagrechte Bahn 0..1 */
  nx: number;
  /** Fortschritt 0 (oben) … 1 (Boden) */
  p: number;
  /** Gesamtfallzeit in s und Beschleunigung dieses Objekts */
  T: number;
  a: number;
  /** Stufe beim Erscheinen – bestimmt die Größe */
  lvl: number;
  born: number;
  judged: boolean;
  /** Autoplay hat sich schon um dieses Ziel gekümmert */
  planned: boolean;
}

interface Fx {
  kind: 'burst' | 'fade' | 'mark';
  x: number;
  y: number;
  r: number;
  t0: number;
  stop?: boolean;
}

interface DemoItem {
  /** ms nach dem Start */
  at: number;
  nx: number;
  stop: boolean;
  /** Fortschritt, bei dem die Hand das Ziel antippt */
  tapP?: number;
}

/** Intro-Film: zwei Ziele fangen, dann ein Quadrat fallen lassen */
const DEMO: DemoItem[] = [
  { at: 500, nx: 0.3, stop: false, tapP: 0.4 },
  { at: 3000, nx: 0.72, stop: false, tapP: 0.5 },
  { at: 5600, nx: 0.34, stop: false, tapP: 0.45 },
  { at: 5600, nx: 0.7, stop: true },
];

/** Oberkante der Bildunterschrift im Intro-Film (gleiche Formel wie im Runner) */
function captionTop(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return s.h - size * 2.1 - s.h * 0.05;
}

class FallendeZiele implements Exercise {
  private readonly stair: Staircase;
  private readonly duration: number;
  private phase: 'play' | 'done' = 'play';
  private t0 = 0;
  private fallers: Faller[] = [];
  private fx: Fx[] = [];
  private nextSpawnAt = 0;
  private caught = 0;
  private escaped = 0;
  private stopTaps = 0;
  private points = 0;
  /** Fortschritt p beim Fang (0 = oben … 1 = Boden) */
  private catchP: number[] = [];
  private lastBadSfx = -1e9;
  private stopHinted = false;
  private lastW = 0;
  private lastH = 0;
  // Autoplay / Intro-Film
  private autoAt = 0;
  private demoIdx = 0;
  private demoEndAt = 0;
  private endT = Infinity;

  constructor(private readonly ctx: ExerciseContext) {
    this.stair = new Staircase({ start: ctx.startLevel ?? 1, min: MIN_LEVEL, max: MAX_LEVEL, down: 3, up: 1 });
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

  private geo(): { w: number; m: number; ground: number; u: number } {
    const { w, h, u } = this.ctx.stage;
    const m = Math.max(6, u * 1.2);
    const ground = this.demo ? captionTop(this.ctx.stage) - 10 : h - Math.max(14, u * 2.6);
    return { w, m, ground, u };
  }

  private radius(F: Faller): number {
    return radiusFor(F.lvl, this.ctx.stage.u);
  }

  /** Position bei Fortschritt p */
  private posAt(F: Faller, p: number): { x: number; y: number } {
    const { w, m, ground } = this.geo();
    const r = this.radius(F);
    return { x: lerp(m + r, Math.max(m + r, w - m - r), F.nx), y: lerp(m - r, ground - r, p) };
  }

  start(t: number): void {
    const { hud, ghost, texts, stage } = this.ctx;
    this.t0 = t;
    this.lastW = stage.w;
    this.lastH = stage.h;
    this.nextSpawnAt = t + 350;
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateLabel();
    if (this.ctx.autoplay) {
      const rest = this.restPoint();
      ghost.moveTo(rest.x, rest.y, { move: 0 });
    }
    if (this.demo) hud.caption(texts.captions.tap);
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
    for (const F of this.fallers) {
      F.p = advance(F.p, dt, F.T, F.a);
    }
    for (const F of [...this.fallers]) if (F.p >= 1) this.landed(F, t);
    if (this.demo) this.demoUpdate(t);
    else {
      this.spawnLogic(t);
      if (this.ctx.autoplay) this.autoUpdate(t);
    }
    if (this.fx.length) this.fx = this.fx.filter((f) => t - f.t0 < (f.kind === 'burst' ? BURST_MS : f.kind === 'fade' ? FADE_MS : MARK_MS));
  }

  // -------------------------------------------------------------------------
  // Neue Ziele

  private spawnLogic(t: number): void {
    const { rng } = this.ctx;
    const lv = this.stair.level;
    const real = this.fallers.filter((F) => !F.stop).length;
    if (real >= simultaneousFor(lv) || t < this.nextSpawnAt) return;
    const sc = stopChance(lv);
    if (sc > 0 && !this.fallers.some((F) => F.stop) && rng.chance(sc)) {
      this.spawn(t, true);
      this.nextSpawnAt = t + rng.range(200, 450);
      if (!this.stopHinted) {
        this.stopHinted = true;
        this.ctx.hud.toast(this.ctx.texts.feedback.hint, 'info', { x: this.ctx.stage.w / 2, y: this.ctx.stage.h * 0.16, ms: 2200, size: clamp(this.ctx.stage.u * 4.2, 16, 32) });
      }
    } else {
      this.spawn(t, false);
      this.nextSpawnAt = t + rng.range(350, 700);
    }
  }

  private spawn(t: number, stop: boolean, nxFixed?: number): Faller {
    const { rng, stage } = this.ctx;
    const lvl = this.level;
    const { m, w } = this.geo();
    const r = radiusFor(lvl, stage.u);
    // Bahnen, in denen gerade noch ein Objekt hoch hängt, meiden
    const occupied = this.fallers.filter((F) => F.p < 0.4).map((F) => F.nx);
    const span = Math.max(1, w - 2 * (m + r));
    const sep = (2.6 * hitRadiusFor(r)) / span;
    const nx = nxFixed ?? pickLane(() => rng.next(), occupied, sep);
    const F: Faller = {
      stop,
      nx,
      p: 0,
      T: this.demo ? DEMO_FALL_S : fallTimeFor(lvl) * rng.range(0.9, 1.1),
      a: this.demo ? 0 : accelFor(lvl),
      lvl,
      born: t,
      judged: false,
      planned: false,
    };
    this.fallers.push(F);
    return F;
  }

  private remove(F: Faller, t: number): void {
    this.fallers = this.fallers.filter((o) => o !== F);
    // kleine Pause, bevor das nächste Ziel kommt (kein starrer Rhythmus)
    if (!F.stop) this.nextSpawnAt = Math.max(this.nextSpawnAt, t + this.ctx.rng.range(200, 500));
  }

  // -------------------------------------------------------------------------
  // Ergebnisse

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'play') return;
    const { sfx, hud, stage } = this.ctx;
    const live = this.fallers.filter((F) => p.t >= F.born);
    const items = live.map((F) => {
      const pos = this.posAt(F, F.p);
      return { x: pos.x, y: pos.y, hitR: hitRadiusFor(this.radius(F)) };
    });
    const i = findHit(items, p.x, p.y);
    if (i < 0) {
      // Tipp ins Leere: nur ein weiches Zeichen, keine Strafe
      this.fx.push({ kind: 'mark', x: p.x, y: p.y, r: 0, t0: p.t });
      sfx.tap();
      return;
    }
    const F = live[i];
    const pos = items[i];
    const r = this.radius(F);
    if (F.stop) {
      this.stopTaps++;
      this.judge(F, false);
      this.fx.push({ kind: 'mark', x: pos.x, y: pos.y, r, t0: p.t, stop: true });
      if (p.t - this.lastBadSfx > 350) {
        sfx.bad();
        this.lastBadSfx = p.t;
      }
      this.toastAt(this.ctx.texts.feedback.wrong, 'bad', pos.x, pos.y - r, 900, clamp(stage.u * 4, 16, 32));
      this.remove(F, p.t);
      return;
    }
    const pts = pointsFor(this.level);
    this.caught++;
    this.points += pts;
    this.catchP.push(clamp(F.p, 0, 1));
    this.judge(F, true);
    sfx.good();
    if (!this.ctx.reducedMotion) this.fx.push({ kind: 'burst', x: pos.x, y: pos.y, r, t0: p.t });
    this.toastAt(`+${pts}`, 'good', pos.x, pos.y - r, 700, clamp(stage.u * 4.6, 18, 38));
    if (!this.demo) hud.setScore(this.points);
    this.remove(F, p.t);
  }

  /** Objekt hat den Boden erreicht */
  private landed(F: Faller, t: number): void {
    const pos = this.posAt(F, 1);
    const r = this.radius(F);
    this.remove(F, t);
    if (F.stop) return; // richtig ignoriert – weder Lob noch Strafe
    this.escaped++;
    this.judge(F, false);
    if (!this.ctx.reducedMotion) this.fx.push({ kind: 'fade', x: pos.x, y: pos.y, r, t0: t });
    this.toastAt(this.ctx.texts.feedback.escaped, 'bad', pos.x, pos.y - r * 1.6, 800, clamp(this.ctx.stage.u * 3.8, 15, 30));
  }

  /** Treppe: höchstens ein Ergebnis pro Objekt (im Film gibt es keine Treppe) */
  private judge(F: Faller, ok: boolean): void {
    if (F.judged) return;
    F.judged = true;
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

  // -------------------------------------------------------------------------
  // Geister-Hand

  /** Ruheplatz der Hand: unten rechts, nicht über den Bahnen der Ziele */
  private restPoint(): { x: number; y: number } {
    const { w, h, u } = this.ctx.stage;
    const hs = clamp(u * 13, 48, 110);
    const baseY = this.demo ? captionTop(this.ctx.stage) - hs * 0.95 : h - hs * 0.7;
    return { x: w - hs * 0.75, y: baseY };
  }

  /** Film: fest geskriptet */
  private demoUpdate(t: number): void {
    const { ghost, hud, texts } = this.ctx;
    const el = t - this.t0;
    while (this.demoIdx < DEMO.length && el >= DEMO[this.demoIdx].at) {
      const d = DEMO[this.demoIdx++];
      const F = this.spawn(t, d.stop, d.nx);
      F.planned = true;
      if (d.stop) {
        hud.caption(texts.captions.stop);
      } else if (d.tapP !== undefined) {
        const pos = this.posAt(F, d.tapP);
        const move = 700;
        ghost.tap(pos.x, pos.y, { delay: Math.max(0, d.tapP * F.T * 1000 - move - 30), move });
        const rest = this.restPoint();
        ghost.moveTo(rest.x, rest.y, { delay: 220, move: 560 });
      }
    }
    if (this.demoIdx >= DEMO.length && !this.fallers.length && ghost.idle && !this.demoEndAt) this.demoEndAt = t + DEMO_END_MS;
    if (this.demoEndAt && t >= this.demoEndAt) {
      this.phase = 'done';
      this.endT = t;
      this.ctx.finish({
        primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' },
        secondary: [{ key: 'count', value: this.caught, unit: 'count' }],
        score: this.points,
        level: MIN_LEVEL,
      });
    }
  }

  /** Autoplay (Tests): fängt meist richtig, lässt manche fallen, tippt selten ein Quadrat an */
  private autoUpdate(t: number): void {
    const { ghost, rng } = this.ctx;
    if (!ghost.idle || t < this.autoAt) return;
    const lv = this.level;
    // Quadrat versehentlich antippen (selten)
    const stopF = this.fallers.find((F) => F.stop && !F.planned && F.p > 0.1 && F.p < 0.7);
    if (stopF && rng.chance(0.05)) {
      stopF.planned = true;
      const move = rng.range(320, 460);
      const pos = this.posAt(stopF, advance(stopF.p, (move + 30) / 1000, stopF.T, stopF.a));
      ghost.tap(pos.x, pos.y, { move });
      this.autoAt = t + move + rng.range(150, 300);
      return;
    }
    // dringendstes Ziel (am weitesten unten) zuerst
    const cand = this.fallers.filter((F) => !F.stop && !F.planned && F.p > 0.05).sort((a, b) => b.p - a.p)[0];
    if (!cand) return;
    cand.planned = true;
    const move = rng.range(300, 480);
    const pp = advance(cand.p, (move + 30) / 1000, cand.T, cand.a);
    const pOk = clamp(0.96 - 0.02 * (lv - 1), 0.55, 0.96);
    if (pp > 0.93 || !rng.chance(pOk)) {
      // entwischen lassen (manchmal gezielt daneben tippen)
      this.autoAt = t + rng.range(120, 260);
      return;
    }
    const pos = this.posAt(cand, pp);
    ghost.tap(pos.x + rng.normal() * this.radius(cand) * 0.2, pos.y + rng.normal() * this.radius(cand) * 0.2, { move });
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
    const total = this.caught + this.escaped;
    const pct = total ? Math.round((100 * this.caught) / total) : 0;
    let tip = 'great';
    if (this.stopTaps >= 2) tip = 'stop';
    else if (this.catchP.length >= 5 && mean(this.catchP) > 0.72) tip = 'late';
    this.ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), MIN_LEVEL, MAX_LEVEL), unit: 'level', better: 'higher' },
      secondary: [
        { key: 'caught', value: pct, unit: 'percent' },
        { key: 'count', value: this.caught, unit: 'count' },
        ...(this.catchP.length ? [{ key: 'height', value: meanHeightPct(this.catchP), unit: 'percent' as const }] : []),
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
    // Objekte werden jedes Bild aus (nx, p) berechnet – nichts weiter zu tun
  }

  // -------------------------------------------------------------------------

  render(g: CanvasRenderingContext2D, now: number): void {
    const { w, h, u, dpr } = this.ctx.stage;
    const t = Math.min(now, this.endT);
    background(g, w, h, dpr, 'grid');
    const { m, ground } = this.geo();
    // Boden: gestrichelte Linie + weiche Fläche darunter
    const band = g.createLinearGradient(0, ground, 0, h);
    band.addColorStop(0, 'rgba(255,255,255,0.10)');
    band.addColorStop(1, 'rgba(255,255,255,0.02)');
    g.fillStyle = band;
    g.fillRect(0, ground, w, Math.max(0, h - ground));
    g.save();
    g.strokeStyle = 'rgba(232,238,247,0.45)';
    g.lineWidth = Math.max(2, u * 0.35);
    g.setLineDash([Math.max(10, u * 1.6), Math.max(8, u * 1.2)]);
    g.beginPath();
    g.moveTo(m, ground);
    g.lineTo(w - m, ground);
    g.stroke();
    g.restore();

    for (const f of this.fx) {
      const k = clamp((t - f.t0) / (f.kind === 'burst' ? BURST_MS : f.kind === 'fade' ? FADE_MS : MARK_MS), 0, 1);
      if (f.kind === 'burst') drawBurst(g, f.x, f.y, f.r, k);
      else if (f.kind === 'fade') drawTarget(g, f.x, f.y, f.r * (1 - 0.4 * easeOut(k)), 1 - k);
      else drawMark(g, f.x, f.y, k, u, f.stop ? f.r : 0);
    }
    for (const F of this.fallers) {
      const pos = this.posAt(F, F.p);
      const r = this.radius(F);
      if (F.stop) drawStop(g, pos.x, pos.y, r);
      else drawTarget(g, pos.x, pos.y, r, 1);
    }
  }
}

// ---------------------------------------------------------------------------
// Zeichnen

/** Ziel: heller Ring außen, weißer Punkt innen (Kreis) */
function drawTarget(g: CanvasRenderingContext2D, x: number, y: number, rr: number, alpha: number): void {
  if (alpha <= 0.01 || rr <= 0) return;
  glow(g, x, y, rr, BLUE, 0.85 * alpha);
  g.save();
  g.globalAlpha = clamp(alpha, 0, 1);
  circle(g, x, y, rr, 'rgba(56,189,248,0.18)');
  ring(g, x, y, rr * 0.79, BLUE, Math.max(2, rr * 0.24));
  ring(g, x, y, rr - 0.75, 'rgba(224,242,254,0.75)', 1.5);
  circle(g, x, y, rr * 0.36, '#FFFFFF');
  g.restore();
}

/** Stör-Objekt: Quadrat mit Kreuz – andere Form als das Ziel, nicht nur andere Farbe */
function drawStop(g: CanvasRenderingContext2D, x: number, y: number, r: number): void {
  const s = r * 0.92;
  glow(g, x, y, r, AMBER, 0.6);
  fillRR(g, x - s, y - s, 2 * s, 2 * s, s * 0.26, withAlpha(AMBER, 0.24));
  g.save();
  rrPath(g, x - s, y - s, 2 * s, 2 * s, s * 0.26);
  g.strokeStyle = AMBER;
  g.lineWidth = Math.max(2.5, r * 0.17);
  g.stroke();
  const c = s * 0.46;
  g.lineCap = 'round';
  g.lineWidth = Math.max(3, r * 0.2);
  g.strokeStyle = '#FEF3C7';
  g.beginPath();
  g.moveTo(x - c, y - c);
  g.lineTo(x + c, y + c);
  g.moveTo(x + c, y - c);
  g.lineTo(x - c, y + c);
  g.stroke();
  g.restore();
}

/** Fang: sich ausbreitender Ring (sanft, ohne Blitz) */
function drawBurst(g: CanvasRenderingContext2D, x: number, y: number, r: number, k: number): void {
  const e = easeOut(k);
  ring(g, x, y, r * (0.9 + 1.2 * e), withAlpha(BLUE_LIGHT, 0.85 * (1 - k)), Math.max(1, 4 * (1 - k)));
}

/** Fehltipp bzw. angetipptes Quadrat: kleines ✗, das verblasst */
function drawMark(g: CanvasRenderingContext2D, x: number, y: number, k: number, u: number, big: number): void {
  const s = Math.max(9, u * 1.8, big * 0.55) * (0.85 + 0.15 * easeOut(Math.min(1, k * 4)));
  const lw = Math.max(3.5, u * 0.6);
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
  g.strokeStyle = MISS;
  g.lineWidth = lw;
  g.stroke();
  g.restore();
}

export const fallendeZiele: ExerciseDefinition = {
  id: 'fallende-ziele',
  category: 'bewegung',
  minutes: 1,
  color: '#2E6DB4',
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="3"><circle cx="14" cy="11" r="6.2"/><circle cx="34" cy="21" r="6.2"/></g><circle cx="14" cy="11" r="2.3" fill="currentColor"/><circle cx="34" cy="21" r="2.3" fill="currentColor"/><path d="M14 21v3.5M14 29v2M34 31v3" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" opacity=".5"/><path d="M5 42h38" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-dasharray="6 4.5"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new FallendeZiele(ctx),
};
