/**
 * Ausweichen – eine Figur mit dem Finger bewegen und langsamen Hindernissen (Kugeln und Quader) ausweichen.
 *
 * Vorbild: „Ausweich-Drill“ (Katalog 803, Quick Dodge). Das Original ist ein Maus-Spiel mit Zeigersperre:
 * Fadenkreuz steuern, rote Kugeln, die auf den Zeiger zielen und wachsen, Bildwackeln, Rotblitz, Combo, und jede
 * Runde endet faktisch in Treffern, weil Tempo und Punkte sich gegenseitig hochtreiben. Hier ist es eine
 * Finger-Aufgabe für das Tablet:
 *
 * - Die Figur sitzt ≈ 8 u über dem Finger (der Finger verdeckt nichts). Der Finger setzt in einem großzügigen
 *   Kreis unter der Figur auf und hält danach seinen Abstand (kein Sprung). Abheben = Pause: Hindernisse und Uhr stehen still.
 * - Hindernisse gleiten geradlinig und langsam (11 → 25 u/s), die Hälfte zielt auf die Stelle der Figur beim
 *   Erscheinen – der Weg ist von Anfang an abschätzbar. Sie kommen von links, rechts und oben herein.
 * - Berührung = weiches ✗, das berührte Hindernis blendet aus, kurze Pause (1 s). Keine Leben, keine Zeitstrafe,
 *   kein Rot, kein Blitz, kein Wackeln. Die Kollision wird entlang der Strecke zwischen zwei Bildern geprüft.
 * - Feste Sitzung: 12 Abschnitte à 3,5 s Spielzeit (die Pause zählt nicht mit). Stufe (Staircase 2-down/1-up): Abschnitt ohne
 *   Berührung = Erfolg. Stufen bestimmen Zahl (2 → 7) und Tempo der Hindernisse.
 * - Hauptwert: Stufe. Zusatz: Berührungen, Überlebenszeit-Anteil (Zeit bis zur ersten Berührung je Abschnitt), höchste Stufe.
 * - Gemessen wird nur, wann du berührt wirst – nicht, wohin die Augen schauen.
 *
 * Geister-Hand (Film/Autoplay): Die Engine kann nur Tipps simulieren. Für das Ziehen führt die Übung selbst einen
 * „virtuellen Finger“ und zeichnet die Hand; eine einfache Vorausschau (`chooseDodge`) weicht aus.
 */
import { background, C, circle, hand, orb, ring, rrPath, text, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeInOut, lerp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo } from '../../core/types';
import {
  chooseDodge,
  clampFigure,
  countFor,
  type DemoSpec,
  fingerOffsetPx,
  FIGURE_HIT,
  FIGURE_R_U,
  grabRadiusPx,
  isGone,
  makeDemoOb,
  makeOb,
  MAX_LEVEL,
  MIN_LEVEL,
  type Ob,
  pointsFor,
  type Pt,
  type Rect,
  segmentTouches,
  stepOb,
  survivalPct,
} from './logic';
import { de, it } from './texts';

const WINDOW_S = 3.5;
const QUICK_WINDOW_S = 2.5;
const WINDOWS = 12;
const QUICK_WINDOWS = 4;
const PAUSE_MS = 1000;
const CUE_MS = 900;
const FADE_IN_S = 0.3;
const FADE_OUT_S = 0.45;
const START_LEVEL = 1;
const VF_ID = -2;
const MIN_PU = 6;
/** Tempo der Figur im Film/Autoplay in u/s */
const AUTO_SPEED_U = 30;
/** Länge des Intro-Films (Spielzeit in s) */
const DEMO_ACTIVE_S = 9.5;

const FIG = '#FBBF24';
const OB = '#93B4F7';
const OB_DARK = '#4C6FB8';

/** Hindernisse im Intro-Film: zeitlich gestaffelt, alle zielen auf die Figur */
const DEMO_SCRIPT: Array<{ at: number; spec: DemoSpec }> = [
  { at: 0.4, spec: { kind: 'ball', fromDeg: 180, distU: 40, speedU: 15 } },
  { at: 3.0, spec: { kind: 'box', fromDeg: 270, distU: 34, speedU: 14 } },
  { at: 5.4, spec: { kind: 'ball', fromDeg: 0, distU: 40, speedU: 15 } },
  { at: 7.2, spec: { kind: 'box', fromDeg: 225, distU: 36, speedU: 14 } },
];

type Phase = 'play' | 'pause' | 'done';

interface Finger {
  id: number;
  /** Abstand Finger − Figur in px, beim Aufsetzen festgelegt */
  gx: number;
  gy: number;
  x: number;
  y: number;
}

interface Auto {
  st: 'idle' | 'approach' | 'play';
  t0: number;
  from: Pt;
  to: Pt;
  dur: number;
  react: number;
  frozenUntil: number;
  nextLapse: number;
  vel: Pt;
  captioned: number;
}

/** Oberkante der Bildunterschrift im Intro-Film (gleiche Formel wie im Runner) */
function captionTop(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return s.h - size * 2.1 - s.h * 0.05;
}

class Ausweichen implements Exercise {
  private readonly stair: Staircase;
  private readonly windowS: number;
  private readonly windows: number;
  private phase: Phase = 'play';
  private pauseT0 = 0;
  // Geometrie
  private pu = MIN_PU;
  private off = 50;
  private figR = 12;
  private field: Rect = { minX: 0, maxX: 100, minY: 0, maxY: 100 };
  private lastW = 0;
  private lastH = 0;
  // Zustand
  private fig: Pt = { x: 0, y: 0 };
  private finger: Finger | null = null;
  private obs: Ob[] = [];
  private clock = 0;
  private nextSpawn = 0;
  private demoIdx = 0;
  private started = false;
  private hintedAt = -1e9;
  private cueT = -1e9;
  // Abschnitte
  private winIdx = 0;
  private winT = 0;
  private winTouches = 0;
  private winFirst: number | null = null;
  private cleanWins = 0;
  private survived = 0;
  private touches = 0;
  private points = 0;
  private maxLevel = MIN_LEVEL;
  // virtueller Finger (Film / Autoplay)
  private vf: Pt = { x: 0, y: 0 };
  private auto: Auto = {
    st: 'idle',
    t0: 0,
    from: { x: 0, y: 0 },
    to: { x: 0, y: 0 },
    dur: 700,
    react: 600,
    frozenUntil: 0,
    nextLapse: 0,
    vel: { x: 0, y: 0 },
    captioned: 0,
  };

  constructor(private readonly ctx: ExerciseContext) {
    const s = Math.round(ctx.startLevel ?? START_LEVEL);
    const start = clamp(Number.isFinite(s) ? s : START_LEVEL, MIN_LEVEL, MAX_LEVEL);
    this.stair = new Staircase({ start, min: MIN_LEVEL, max: MAX_LEVEL, down: 2, up: 1 });
    this.windowS = ctx.quick ? QUICK_WINDOW_S : WINDOW_S;
    this.windows = ctx.quick ? QUICK_WINDOWS : WINDOWS;
  }

  private get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  private get level(): number {
    return this.demo ? START_LEVEL : this.stair.level;
  }

  // ------------------------------------------------------------------ Geometrie

  private geometry(): void {
    const { w, h, u } = this.ctx.stage;
    this.pu = Math.max(u, MIN_PU);
    this.off = fingerOffsetPx(this.pu);
    this.figR = FIGURE_R_U * this.pu;
    const mx = 3 * this.pu + this.figR;
    const top = (this.demo ? 5 : 5.5) * this.pu + this.figR;
    const bottom = (this.demo ? captionTop(this.ctx.stage) - 2 * this.pu : h - 2 * this.pu) - this.off;
    this.field = { minX: mx, maxX: Math.max(mx + 20, w - mx), minY: top, maxY: Math.max(top + 20, bottom) };
    this.fig = clampFigure(this.fig, this.field);
  }

  private grabPoint(): Pt {
    return { x: this.fig.x, y: this.fig.y + this.off };
  }

  // ------------------------------------------------------------------ Ablauf

  start(t: number): void {
    const { hud, ghost, stage } = this.ctx;
    this.lastW = stage.w;
    this.lastH = stage.h;
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.geometry();
    this.fig = {
      x: (this.field.minX + this.field.maxX) / 2,
      y: this.field.minY + (this.field.maxY - this.field.minY) * 0.68,
    };
    this.fig = clampFigure(this.fig, this.field);
    this.vf = this.restPoint();
    this.auto.react = this.demo ? 900 : this.ctx.rng.range(400, 800);
    this.auto.t0 = t;
    this.auto.nextLapse = this.ctx.rng.range(3, 8);
    if (this.ctx.autoplay) ghost.hide(); // die Hand zeichnet diese Übung selbst
    this.updateLabel();
    if (this.demo) hud.caption(this.ctx.texts.captions.place);
  }

  update(dt: number, t: number): void {
    if (this.phase === 'done') return;
    const { ctx } = this;
    if (ctx.autoplay) this.autoUpdate(dt, t);
    // weiches Ein- und Ausblenden (Darstellung), auch während der Pause
    for (const o of this.obs) {
      if (o.dying) o.alpha -= dt / FADE_OUT_S;
      else if (o.alpha < 1) o.alpha = ctx.reducedMotion ? 1 : Math.min(1, o.alpha + dt / FADE_IN_S);
    }
    if (this.obs.some((o) => o.dying && o.alpha <= 0)) this.obs = this.obs.filter((o) => !(o.dying && o.alpha <= 0));
    if (this.phase === 'pause') {
      if (t - this.pauseT0 >= PAUSE_MS) this.resumePlay();
      return;
    }
    if (!this.finger) return; // ohne Finger steht alles still
    this.simulate(dt);
  }

  private simulate(dt: number): void {
    const { ctx } = this;
    this.clock += dt;
    this.winT += dt;
    // neue Hindernisse
    if (this.demo) this.demoSpawn();
    else this.spawnLogic();
    // Bewegung (nur dt); Berührung auch, wenn ein Hindernis in die ruhende Figur gleitet
    const hitR = this.figR * FIGURE_HIT;
    let touched: Ob | null = null;
    for (const o of this.obs) {
      stepOb(o, dt);
      if (!touched && !o.dying && segmentTouches(this.fig, this.fig, hitR, o)) touched = o;
    }
    const { w, h } = ctx.stage;
    this.obs = this.obs.filter((o) => !isGone(o, w, h, 2 * this.pu));
    if (touched) {
      this.onTouch(ctx.now());
      return;
    }
    if (!this.demo) {
      ctx.hud.setProgress((this.winIdx + clamp(this.winT / this.windowS, 0, 1)) / this.windows);
      if (this.winT >= this.windowS) this.endWindow();
    } else if (this.clock >= DEMO_ACTIVE_S) this.finishDemo();
  }

  private spawnLogic(): void {
    const { rng, stage } = this.ctx;
    const lv = this.stair.level;
    const live = this.obs.filter((o) => !o.dying).length;
    if (live >= countFor(lv) || this.clock < this.nextSpawn) return;
    this.obs.push(makeOb({ w: stage.w, h: stage.h, field: this.field, u: this.pu, level: lv, fig: this.fig }, rng));
    this.nextSpawn = this.clock + rng.range(0.5, 1.1);
  }

  private demoSpawn(): void {
    while (this.demoIdx < DEMO_SCRIPT.length && this.clock >= DEMO_SCRIPT[this.demoIdx].at) {
      this.obs.push(makeDemoOb(this.fig, this.pu, DEMO_SCRIPT[this.demoIdx].spec));
      this.demoIdx++;
    }
  }

  private onTouch(t: number): void {
    const { ctx } = this;
    const hitR = this.figR * FIGURE_HIT;
    for (const o of this.obs) if (!o.dying && segmentTouches(this.fig, this.fig, hitR, o)) o.dying = true;
    this.touches++;
    this.winTouches++;
    if (this.winFirst === null) this.winFirst = this.winT;
    this.phase = 'pause';
    this.pauseT0 = t;
    this.cueT = t;
    ctx.sfx.bad();
    if (!this.demo) {
      const size = clamp(ctx.stage.u * 3.8, 16, 28);
      ctx.hud.toast(ctx.texts.feedback.touch, 'info', { x: this.fig.x, y: Math.max(size * 1.4, this.fig.y - this.figR * 4.4), ms: PAUSE_MS, size });
    }
  }

  /** Nach der Pause: Hindernisse direkt an der Figur sind weg, damit es nicht sofort erneut berührt */
  private resumePlay(): void {
    const keep = this.figR * FIGURE_HIT;
    for (const o of this.obs) {
      const d = Math.hypot(o.x - this.fig.x, o.y - this.fig.y);
      if (!o.dying && d < keep + (o.kind === 'ball' ? o.r : Math.hypot(o.hw, o.hh)) + 4 * this.pu) o.dying = true;
    }
    this.phase = 'play';
  }

  private endWindow(): void {
    const { ctx } = this;
    const clean = this.winTouches === 0;
    this.survived += this.winFirst ?? this.windowS;
    this.points += pointsFor(this.stair.level, this.winTouches);
    this.maxLevel = Math.max(this.maxLevel, Math.floor(this.stair.level + 1e-9));
    if (clean) {
      this.cleanWins++;
      ctx.sfx.good();
    } else ctx.sfx.tap();
    this.stair.update(clean);
    this.winIdx++;
    this.winT = 0;
    this.winTouches = 0;
    this.winFirst = null;
    ctx.hud.setScore(this.points);
    ctx.hud.setProgress(this.winIdx / this.windows);
    this.updateLabel();
    if (this.winIdx >= this.windows) this.finish();
  }

  private updateLabel(): void {
    const { hud, texts } = this.ctx;
    if (this.demo) return;
    hud.setLabel(`${texts.feedback.level} ${Math.floor(this.level + 1e-9)} · ${Math.min(this.winIdx + 1, this.windows)}/${this.windows}`);
  }

  // ------------------------------------------------------------------ Eingabe

  pointerDown(p: PointerInfo): void {
    if (this.phase === 'done' || this.finger) return;
    const g = this.grabPoint();
    if (Math.hypot(p.x - g.x, p.y - g.y) > grabRadiusPx(this.pu)) {
      // Daneben getippt: einmal kurz erklären (nicht bei jedem Tipp)
      if (!this.demo && p.t - this.hintedAt > 4000) {
        this.hintedAt = p.t;
        this.ctx.hud.toast(this.ctx.texts.feedback.hint, 'info', {
          x: g.x,
          y: Math.max(20, g.y + this.off * 0.9),
          ms: 1600,
          size: clamp(this.ctx.stage.u * 3.6, 15, 26),
        });
      }
      return;
    }
    this.finger = { id: p.id, gx: p.x - this.fig.x, gy: p.y - this.fig.y, x: p.x, y: p.y };
    this.started = true;
    this.ctx.sfx.tap();
    if (this.demo && this.auto.captioned < 1) {
      this.auto.captioned = 1;
      this.ctx.hud.caption(this.ctx.texts.captions.dodge);
    }
  }

  pointerMove(p: PointerInfo): void {
    const f = this.finger;
    if (!f || p.id !== f.id || this.phase === 'done') return;
    f.x = p.x;
    f.y = p.y;
    const prev = this.fig;
    const next = clampFigure({ x: p.x - f.gx, y: p.y - f.gy }, this.field);
    this.fig = next;
    if (this.phase !== 'play') return;
    // Weg zwischen zwei Bildern prüfen: auch ein weiter Sprung geht nicht durch ein Hindernis
    const hitR = this.figR * FIGURE_HIT;
    for (const o of this.obs) {
      if (!o.dying && segmentTouches(prev, next, hitR, o)) {
        this.onTouch(p.t);
        return;
      }
    }
  }

  pointerUp(p: PointerInfo): void {
    const f = this.finger;
    if (!f || p.id !== f.id) return;
    this.finger = null;
  }

  // ------------------------------------------------------------------ virtueller Finger (Film / Autoplay)

  private restPoint(): Pt {
    const { w, h } = this.ctx.stage;
    const hs = clamp(this.ctx.stage.u * 13, 48, 110);
    return { x: w - hs * 0.75, y: this.demo ? captionTop(this.ctx.stage) - hs * 0.95 : h - hs * 0.7 };
  }

  private autoUpdate(dt: number, t: number): void {
    const { rng, texts, hud } = this.ctx;
    const A = this.auto;
    const info = (p: Pt): PointerInfo => ({ id: VF_ID, x: p.x, y: p.y, t, type: 'ghost' });
    if (A.st === 'idle') {
      if (this.phase !== 'done' && t - A.t0 >= A.react) {
        const g = this.grabPoint();
        A.st = 'approach';
        A.t0 = t;
        A.from = { ...this.vf };
        A.to = { x: g.x + (this.demo ? 0 : rng.range(-6, 6)), y: g.y + (this.demo ? 0 : rng.range(-5, 5)) };
        A.dur = this.demo ? 800 : rng.range(450, 700);
      }
      return;
    }
    if (A.st === 'approach') {
      const k = clamp((t - A.t0) / A.dur, 0, 1);
      const e = easeInOut(k);
      this.vf = { x: lerp(A.from.x, A.to.x, e), y: lerp(A.from.y, A.to.y, e) };
      if (k >= 1) {
        this.pointerDown(info(this.vf));
        A.st = this.finger ? 'play' : 'idle';
        A.t0 = t;
      }
      return;
    }
    if (A.st === 'play') {
      const f = this.finger;
      if (!f) {
        A.st = 'idle';
        A.t0 = t;
        return;
      }
      if (this.phase === 'play') {
        // kleine „Unaufmerksamkeit“ nur im Spielmodus: einen Moment still stehen
        if (!this.demo && this.clock >= A.nextLapse) {
          A.frozenUntil = this.clock + rng.range(0.6, 1.1);
          A.nextLapse = this.clock + rng.range(4, 9) / (1 + 0.04 * this.level);
        }
        const speed = AUTO_SPEED_U * this.pu;
        let want: Pt = { x: 0, y: 0 };
        if (this.clock >= A.frozenUntil) {
          const pull = { x: (this.field.minX + this.field.maxX) / 2, y: this.field.minY + (this.field.maxY - this.field.minY) * 0.65 };
          want = chooseDodge(this.fig, this.figR * FIGURE_HIT, this.obs, this.field, speed, 1.6, pull);
        }
        // weiche Geschwindigkeitsänderung (kein Ruck)
        const q = 1 - Math.exp(-dt * 10);
        A.vel = { x: lerp(A.vel.x, want.x * speed, q), y: lerp(A.vel.y, want.y * speed, q) };
        const target = clampFigure({ x: this.fig.x + A.vel.x * dt, y: this.fig.y + A.vel.y * dt }, this.field);
        this.vf = { x: target.x + f.gx, y: target.y + f.gy };
        this.pointerMove(info(this.vf));
        if (this.demo) {
          if (A.captioned < 3 && this.clock > DEMO_ACTIVE_S - 2.6) {
            A.captioned = 3;
            hud.caption(texts.captions.calm);
          }
        }
      } else {
        // Pause: der Finger bleibt an seinem Platz
        this.vf = { x: this.fig.x + f.gx, y: this.fig.y + f.gy };
        A.vel = { x: 0, y: 0 };
      }
    }
  }

  // ------------------------------------------------------------------ Größenänderung

  resize(w: number, h: number): void {
    const sx = this.lastW > 0 ? w / this.lastW : 1;
    const sy = this.lastH > 0 ? h / this.lastH : 1;
    this.lastW = w;
    this.lastH = h;
    this.fig = { x: this.fig.x * sx, y: this.fig.y * sy };
    for (const o of this.obs) {
      o.x *= sx;
      o.y *= sy;
      o.vx *= sx;
      o.vy *= sy;
    }
    this.geometry();
    // Finger lösen: Das Tablet wurde gedreht, man setzt neu auf
    this.finger = null;
    this.vf = this.restPoint();
    this.auto.st = 'idle';
    this.auto.t0 = this.ctx.now();
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, u, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    for (const o of this.obs) this.drawOb(g, o);
    this.drawFigure(g, t);
    if (this.ctx.autoplay) hand(g, this.vf.x, this.vf.y, clamp(u * 13, 48, 110), !!this.finger);
  }

  private drawOb(g: CanvasRenderingContext2D, o: Ob): void {
    const a = clamp(o.alpha, 0, 1);
    if (a <= 0.01) return;
    const sp = Math.hypot(o.vx, o.vy);
    const rad = o.kind === 'ball' ? o.r : Math.hypot(o.hw, o.hh);
    g.save();
    g.globalAlpha = a;
    // kurzer Schweif entgegen der Flugrichtung: zeigt, wohin es fliegt
    if (sp > 1) {
      const ex = o.x - (o.vx / sp) * rad * 2.4;
      const ey = o.y - (o.vy / sp) * rad * 2.4;
      const grad = g.createLinearGradient(o.x, o.y, ex, ey);
      grad.addColorStop(0, withAlpha(OB, 0.4));
      grad.addColorStop(1, withAlpha(OB, 0));
      g.strokeStyle = grad;
      g.lineWidth = Math.min(rad * 1.2, 26);
      g.lineCap = 'round';
      g.beginPath();
      g.moveTo(o.x, o.y);
      g.lineTo(ex, ey);
      g.stroke();
    }
    if (o.kind === 'ball') {
      orb(g, o.x, o.y, o.r, OB, { glow: 0.35 });
      ring(g, o.x, o.y, o.r - 1, withAlpha(OB_DARK, 0.6), 2);
    } else {
      const x = o.x - o.hw;
      const y = o.y - o.hh;
      rrPath(g, x, y, 2 * o.hw, 2 * o.hh, Math.min(o.hw, o.hh) * 0.18);
      g.fillStyle = OB;
      g.fill();
      // Schraffur: „Quader“ ist auch ohne Farbe als Fläche mit Muster erkennbar
      g.save();
      g.clip();
      g.strokeStyle = withAlpha(OB_DARK, 0.45);
      g.lineWidth = Math.max(2, this.pu * 0.4);
      g.beginPath();
      const step = Math.max(9, this.pu * 1.8);
      for (let k = -2 * o.hh; k < 2 * o.hw + 2 * o.hh; k += step) {
        g.moveTo(x + k, y + 2 * o.hh);
        g.lineTo(x + k + 2 * o.hh, y);
      }
      g.stroke();
      g.restore();
      rrPath(g, x, y, 2 * o.hw, 2 * o.hh, Math.min(o.hw, o.hh) * 0.18);
      g.strokeStyle = withAlpha(OB_DARK, 0.9);
      g.lineWidth = Math.max(2, this.pu * 0.35);
      g.stroke();
    }
    g.restore();
  }

  private drawFigure(g: CanvasRenderingContext2D, t: number): void {
    const { u, h } = this.ctx.stage;
    const f = this.finger;
    const r = this.figR;
    const { x, y } = this.fig;
    // Aufsetzhilfe, solange kein Finger da ist
    if (!f && this.phase !== 'done') {
      const gp = this.grabPoint();
      const R = grabRadiusPx(this.pu);
      const pulse = this.ctx.reducedMotion ? 0.7 : 0.55 + 0.25 * Math.sin(t / 420);
      g.save();
      g.globalAlpha = pulse;
      ring(g, gp.x, gp.y, R, C.white, 2.5, [8, 7]);
      g.restore();
      g.save();
      g.strokeStyle = 'rgba(255,255,255,0.3)';
      g.lineWidth = Math.max(2, u * 0.3);
      g.setLineDash([6, 6]);
      g.beginPath();
      g.moveTo(x, y + r);
      g.lineTo(gp.x, gp.y - R);
      g.stroke();
      g.restore();
      const size = clamp(u * 3.2, 13, 22);
      text(g, this.started ? this.ctx.texts.feedback.resume : this.ctx.texts.feedback.grab, gp.x, Math.min(h - size, gp.y + R + size * 0.9), size, C.fg, { weight: 700 });
    } else if (f) {
      // Faden und Ring zeigen die Fingerposition (Finger liegt unter der Figur)
      g.save();
      g.strokeStyle = 'rgba(255,255,255,0.35)';
      g.lineWidth = Math.max(2, u * 0.3);
      g.setLineDash([6, 6]);
      g.beginPath();
      g.moveTo(f.x, f.y);
      g.lineTo(x, y + r);
      g.stroke();
      g.restore();
      ring(g, f.x, f.y, Math.max(10, u * 1.6), 'rgba(255,255,255,0.55)', 2.5);
    }
    // Berührung: weicher Schein und ✗ (ohne Rot, ohne Blitz)
    const cue = clamp(1 - (t - this.cueT) / CUE_MS, 0, 1);
    const pausing = this.phase === 'pause';
    if (pausing || cue > 0) {
      g.save();
      g.globalAlpha = pausing ? 0.5 : 0.5 * cue;
      circle(g, x, y, r * 2.2, 'rgba(255,255,255,0.3)');
      g.restore();
    }
    // Figur: Scheibe mit Ring und hellem Kern
    orb(g, x, y, r, FIG, { glow: 0.6, shine: false });
    ring(g, x, y, r + 2.5, 'rgba(255,255,255,0.7)', 2);
    circle(g, x, y, r * 0.38, '#FFFBEB');
    if (pausing || cue > 0) {
      const a = pausing ? 1 : cue;
      const by = y - r * 2.6;
      g.save();
      g.globalAlpha = a;
      circle(g, x, by, r * 1.15, C.white);
      g.restore();
      text(g, '✗', x, by + 1, r * 1.5, '#1E3A5F', { weight: 800, alpha: a });
    }
  }

  // ------------------------------------------------------------------ Ergebnis

  private finishDemo(): void {
    if (this.phase === 'done') return;
    this.phase = 'done';
    this.ctx.finish({
      primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' },
      secondary: [{ key: 'touches', value: this.touches, unit: 'count' }],
      score: 0,
      level: MIN_LEVEL,
    });
  }

  private finish(): void {
    if (this.phase === 'done') return;
    const { ctx } = this;
    this.phase = 'done';
    ctx.hud.setProgress(1);
    ctx.sfx.done();
    const thr = this.stair.threshold();
    const pct = survivalPct(this.survived, this.windows * this.windowS);
    let tip = 'great';
    if (this.touches >= this.windows * 0.6) tip = 'early';
    else if (pct < 80) tip = 'calm';
    ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), MIN_LEVEL, MAX_LEVEL), unit: 'level', better: 'higher' },
      secondary: [
        { key: 'touches', value: this.touches, unit: 'count' },
        { key: 'survive', value: pct, unit: 'percent' },
        { key: 'maxLevel', value: this.maxLevel, unit: 'level' },
      ],
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip,
    });
  }
}

export const ausweichen: ExerciseDefinition = {
  id: 'ausweichen',
  category: 'bewegung',
  minutes: 2,
  color: '#2A7CB8',
  showsLevel: true,
  icon:
    '<circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" stroke-width="3"/><rect x="29" y="8" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="3"/><path d="M8 26c8 0 6 14 16 14" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="1 5.5"/><circle cx="28" cy="36" r="5" fill="currentColor"/>',
  texts: { de, it },
  create: (ctx) => new Ausweichen(ctx),
};
