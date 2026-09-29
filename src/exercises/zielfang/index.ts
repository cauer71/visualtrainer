/**
 * Zielfang – einen bewegten Punkt abfangen (Auge-Hand-Koordination).
 *
 * Verbesserungen gegenüber dem Vorbild ("bewegtes Ziel antippen"):
 * - Tempo in u/s und mit dt gerechnet → gleich schnell auf 60- und 120-Hz-Geräten
 *   und auf jeder Bildschirmgröße.
 * - Adaptiv (3-down/1-up → ≈ 79 % gefangene Ziele): Mit der Stufe wird der Punkt
 *   schneller, etwas kleiner und bleibt kürzer. Das laufende Ziel passt sein Tempo weich an.
 * - Tempo je Ziel leicht gemischt (±15 %) und ab Stufe 6 sanfte Kurven → man muss jedes
 *   Mal neu vorausschätzen, statt sich an ein festes Tempo zu gewöhnen.
 * - Fingerfreundlich: Trefferradius größer als das sichtbare Ziel (≥ 32 px).
 * - Misst bei jedem Tipp, ob man hinter den Punkt (reaktiv) oder davor (vorausschauend)
 *   tippt, und leitet daraus den persönlichen Tipp ab.
 */
import { background, circle, glow, ring, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeInOut, easeOut, lerp, median } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo, ToastKind } from '../../core/types';
import { de, it } from './texts';

const MIN_LEVEL = 1;
const MAX_LEVEL = 22;
const SESSION_MS = 45000;
const QUICK_SESSION_MS = 8000;
/** Pause zwischen zwei Zielen */
const GAP_MS = 250;
const POP_MS = 170;
const SPAWN_RING_MS = 450;
const FADE_MS = 260;
const BURST_MS = 480;
const MARK_MS = 400;
/** Kurven: ab dieser Stufe, Dauer einer Richtungsänderung */
const CURVE_LEVEL = 6;
const TURN_MS = 300;
/** Tipps bis zu 3 Trefferradien Abstand zählen für die Vorhalt-Messung */
const NEAR = 3;
const MIN_ALONG_SAMPLES = 8;
const ALONG_TIP = 0.3;
// Intro-Film: langsamer Punkt, etwas länger sichtbar, ✗ etwas länger zu sehen
const DEMO_SPEED_U = 18;
const DEMO_LIFE_MS = 3800;
const DEMO_MARK_MS = 800;

const BLUE = '#38BDF8';
const BLUE_LIGHT = '#BAE6FD';
const MISS = '#F87171';

/** Tempo in u/s */
const speedFor = (level: number): number => 14 * Math.pow(1.12, level - 1);
/** Sichtbarer Radius in px – wird mit der Stufe etwas kleiner (≈ 16 mm → 10 mm auf dem iPad) */
const radiusFor = (level: number, u: number): number => Math.max(26, 5.5 * u * (1 - 0.02 * (level - 1)));
/** Lebensdauer in ms – wird mit der Stufe kürzer */
const lifeFor = (level: number): number => Math.max(1600, 3000 - 70 * (level - 1));
/** Trefferradius: größer als das sichtbare Ziel (Fingerbreite) */
const hitRadius = (r: number): number => Math.max(r + 10, 32);

interface Point {
  x: number;
  y: number;
}

interface Bounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

interface Turn {
  t0: number;
  /** Gesamtdrehung in rad (Vorzeichen = Drehsinn) */
  total: number;
  /** bereits ausgeführter Anteil 0..1 (nach Easing) */
  done: number;
}

interface Target extends Point {
  ang: number;
  /** aktuelles Tempo in u/s */
  speed: number;
  /** Tempo-Faktor dieses Ziels (0,85–1,15) */
  factor: number;
  /** Stufe beim Erscheinen – bestimmt Größe und Lebensdauer */
  lvl: number;
  born: number;
  life: number;
  /** Treppe für dieses Ziel schon aktualisiert (höchstens ein Ergebnis pro Ziel) */
  judged: boolean;
  turn: Turn | null;
  nextTurn: number;
  lastBounce: number;
}

/** Kurzlebige Effekte: verblassendes Ziel, Treffer-Funken, ✗ */
interface Fx extends Point {
  t0: number;
  r: number;
  spin: number;
}

interface DemoAct {
  /** ms nach dem Erscheinen des Ziels */
  at: number;
  /** lead = mit Vorhalt fangen, behind = bewusst knapp dahinter tippen */
  kind: 'lead' | 'behind';
  move: number;
  wait?: number;
}

interface DemoTarget {
  nx: number;
  ny: number;
  deg: number;
  acts: DemoAct[];
}

/** Intro-Film: fangen – knapp dahinter (✗) – mit Vorhalt fangen – fangen – Ende */
const DEMO: DemoTarget[] = [
  { nx: 0.18, ny: 0.3, deg: 14, acts: [{ at: 1100, kind: 'lead', move: 600, wait: 200 }] },
  {
    nx: 0.8,
    ny: 0.2,
    deg: 162,
    acts: [
      { at: 900, kind: 'behind', move: 600 },
      { at: 2200, kind: 'lead', move: 550, wait: 200 },
    ],
  },
  { nx: 0.2, ny: 0.8, deg: -32, acts: [{ at: 1000, kind: 'lead', move: 600, wait: 200 }] },
  { nx: 0.55, ny: 0.4, deg: 205, acts: [] },
];

class Zielfang implements Exercise {
  private readonly stair: Staircase;
  private readonly duration: number;
  private phase: 'gap' | 'target' | 'done' = 'gap';
  private t0 = 0;
  private gapUntil = 0;
  private target: Target | null = null;
  private lastPos: Point | null = null;
  private fades: Fx[] = [];
  private bursts: Fx[] = [];
  private marks: Fx[] = [];
  private caught = 0;
  private escaped = 0;
  private missTaps = 0;
  private points = 0;
  /** Abweichung entlang der Flugrichtung in Radien (− = hinter dem Punkt, + = davor) */
  private along: number[] = [];
  private lastBadSfx = -1e9;
  private lastW = 0;
  private lastH = 0;
  private spawned = 0;
  // Autoplay / Intro-Film
  private autoAt = 0;
  private demoAct = 0;
  private demoEndAt = 0;

  constructor(private readonly ctx: ExerciseContext) {
    this.stair = new Staircase({ start: ctx.startLevel ?? 1, min: MIN_LEVEL, max: MAX_LEVEL, down: 3, up: 1 });
    this.duration = ctx.quick ? QUICK_SESSION_MS : SESSION_MS;
  }

  private get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  /** Stufe für Tempo, Größe und Punkte (im Intro-Film immer die leichteste) */
  private get level(): number {
    return this.demo ? MIN_LEVEL : this.stair.level;
  }

  private radius(T: Target): number {
    return radiusFor(T.lvl, this.ctx.stage.u);
  }

  /** Bereich, in dem sich der Mittelpunkt eines Ziels mit Radius r bewegen darf */
  private bounds(r: number): Bounds {
    const { w, h, u } = this.ctx.stage;
    const m = Math.max(4, u * 1.2);
    const bottom = this.demo ? captionTop(this.ctx.stage) - 6 : h - m;
    return span(m + r, w - m - r, m + r, bottom - r);
  }

  start(t: number): void {
    const { hud, ghost, texts, stage } = this.ctx;
    this.t0 = t;
    this.lastW = stage.w;
    this.lastH = stage.h;
    this.phase = 'gap';
    this.gapUntil = t + (this.demo ? 350 : 200);
    hud.setProgress(0);
    hud.setScore(0);
    this.updateLabel();
    if (this.demo) {
      hud.caption(texts.captions.tap);
      const rest = this.restPoint();
      ghost.moveTo(rest.x, rest.y, { move: 0 });
    }
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
    if (this.phase === 'gap' && t >= this.gapUntil) this.spawn(t);
    const T = this.target;
    if (this.phase === 'target' && T) {
      if (t > T.born) this.step(T, dt, t);
      if (t - T.born >= T.life) this.escape(T, t);
    }
    this.prune(t);
    if (this.demo) this.demoUpdate(t);
    else if (this.ctx.autoplay) this.autoUpdate(t);
  }

  // -------------------------------------------------------------------------
  // Bewegung

  private step(T: Target, dt: number, t: number): void {
    const { rng, stage } = this.ctx;
    // Tempo weich an die aktuelle Stufe anpassen
    const goal = this.demo ? DEMO_SPEED_U : speedFor(this.stair.level) * T.factor;
    T.speed += (goal - T.speed) * (1 - Math.exp(-dt / 0.35));
    // Ab Stufe 6: alle 0,8–1,6 s eine weiche Kurve von ±20–50°
    if (!this.demo && !T.turn && t >= T.nextTurn) {
      if (this.stair.level >= CURVE_LEVEL) {
        const deg = rng.range(20, 50) * (rng.chance(0.5) ? 1 : -1);
        T.turn = { t0: t, total: (deg * Math.PI) / 180, done: 0 };
      }
      T.nextTurn = t + rng.range(800, 1600);
    }
    if (T.turn) {
      const e = easeInOut((t - T.turn.t0) / TURN_MS);
      T.ang += T.turn.total * (e - T.turn.done);
      T.turn.done = e;
      if (e >= 1) T.turn = null;
    }
    const v = T.speed * stage.u;
    T.x += Math.cos(T.ang) * v * dt;
    T.y += Math.sin(T.ang) * v * dt;
    if (bounce(T, this.bounds(this.radius(T)))) {
      T.lastBounce = t;
      // Das Spiegeln kehrt auch den Drehsinn einer laufenden Kurve um
      if (T.turn) T.turn.total = -T.turn.total;
    }
  }

  /** Wo ist das Ziel in `ms` Millisekunden? (gerade Bahn mit Abprallen, ohne Kurven) */
  private predict(T: Target, ms: number): Point {
    const b = this.bounds(this.radius(T));
    const v = T.speed * this.ctx.stage.u;
    const o = { x: T.x, y: T.y, ang: T.ang };
    let rem = ms / 1000;
    while (rem > 1e-6) {
      const s = Math.min(0.01, rem);
      rem -= s;
      o.x += Math.cos(o.ang) * v * s;
      o.y += Math.sin(o.ang) * v * s;
      bounce(o, b);
    }
    return { x: o.x, y: o.y };
  }

  private spawn(t: number): void {
    const { rng, stage } = this.ctx;
    const lvl = this.level;
    const b = this.bounds(radiusFor(lvl, stage.u));
    const script = this.demo ? DEMO[this.spawned] : undefined;
    let p: Point;
    let ang: number;
    if (script) {
      p = { x: lerp(b.minX, b.maxX, script.nx), y: lerp(b.minY, b.maxY, script.ny) };
      ang = (script.deg * Math.PI) / 180;
    } else {
      p = this.spawnPoint(b);
      // schräg losfliegen (nicht genau waagrecht/senkrecht – sonst pendelt der Punkt nur hin und her)
      ang = rng.int(4) * (Math.PI / 2) + rng.range(0.26, 1.31);
    }
    const factor = this.demo ? 1 : rng.range(0.85, 1.15);
    this.target = {
      x: p.x,
      y: p.y,
      ang,
      factor,
      lvl,
      speed: this.demo ? DEMO_SPEED_U : speedFor(lvl) * factor,
      born: t,
      life: this.demo ? DEMO_LIFE_MS : lifeFor(lvl),
      judged: false,
      turn: null,
      nextTurn: t + rng.range(800, 1600),
      lastBounce: -1e9,
    };
    this.spawned++;
    this.phase = 'target';
    this.autoAt = t + rng.range(220, 520);
    this.demoAct = 0;
    if (this.demo && !this.demoEndAt && (!script || script.acts.length === 0)) this.demoEndAt = t + 1800;
  }

  /** Zufälliger Ort, mindestens 25 % der Bühnendiagonale vom letzten Ziel entfernt */
  private spawnPoint(b: Bounds): Point {
    const { rng, stage } = this.ctx;
    const minDist = 0.25 * Math.hypot(stage.w, stage.h);
    let best: Point = { x: (b.minX + b.maxX) / 2, y: (b.minY + b.maxY) / 2 };
    let bestD = -1;
    for (let i = 0; i < 40; i++) {
      const c = { x: rng.range(b.minX, b.maxX), y: rng.range(b.minY, b.maxY) };
      const d = this.lastPos ? Math.hypot(c.x - this.lastPos.x, c.y - this.lastPos.y) : Infinity;
      if (d > bestD) {
        best = c;
        bestD = d;
      }
      if (d >= minDist) break;
    }
    return best;
  }

  // -------------------------------------------------------------------------
  // Ergebnisse eines Ziels

  pointerDown(p: PointerInfo): void {
    const T = this.target;
    // In der kurzen Pause zwischen zwei Zielen (z. B. zweiter Finger) nichts werten
    if (this.phase !== 'target' || !T || p.t < T.born) return;
    const r = this.radius(T);
    const hitR = hitRadius(r);
    // Referenz: Position des Ziels im letzten Bild – so, wie man es gesehen hat
    const ox = p.x - T.x;
    const oy = p.y - T.y;
    const dist = Math.hypot(ox, oy);
    // Vorhalt-Messung (nur bei Tipps in der Nähe; direkt nach dem Auftauchen oder
    // Abprallen ist die Richtung noch nicht einschätzbar)
    if (dist <= NEAR * hitR && p.t - T.born >= 250 && p.t - T.lastBounce >= 200) {
      this.along.push((ox * Math.cos(T.ang) + oy * Math.sin(T.ang)) / r);
    }
    if (dist <= hitR) this.catchTarget(T, p.t);
    else this.missTap(T, p);
  }

  private catchTarget(T: Target, t: number): void {
    const { sfx, hud, rng, stage, ghost } = this.ctx;
    const pts = 10 + 2 * (Math.floor(this.level + 1e-9) - 1);
    this.caught++;
    this.points += pts;
    this.judge(T, true);
    sfx.good();
    const r = this.radius(T);
    this.bursts.push({ x: T.x, y: T.y, t0: t, r, spin: rng.range(0, Math.PI * 2) });
    this.toastAt(`+${pts}`, 'good', T.x, T.y - r, 700, clamp(stage.u * 4.6, 18, 38));
    hud.setScore(this.points);
    this.clearTarget(T, t);
    if (this.demo) {
      const rest = this.restPoint();
      ghost.moveTo(rest.x, rest.y, { delay: 260, move: 560 });
    }
  }

  private missTap(T: Target, p: PointerInfo): void {
    const { sfx, hud, texts, ghost, stage } = this.ctx;
    this.missTaps++;
    this.marks.push({ x: p.x, y: p.y, t0: p.t, r: 0, spin: 0 });
    // Leise halten: bei schnellem Mehrfach-Tippen nicht jedes Mal
    if (p.t - this.lastBadSfx > 350) {
      sfx.bad();
      this.lastBadSfx = p.t;
    }
    this.judge(T, false);
    if (this.demo) {
      hud.caption(texts.captions.lead);
      // Hand etwas zur Seite nehmen, damit das ✗ zu sehen ist
      const hs = clamp(stage.u * 13, 48, 110);
      ghost.moveTo(p.x + hs * 0.3, p.y + hs * 0.45, { delay: 60, move: 260 });
    }
  }

  private escape(T: Target, t: number): void {
    this.escaped++;
    this.judge(T, false);
    const r = this.radius(T);
    this.fades.push({ x: T.x, y: T.y, t0: t, r, spin: 0 });
    this.toastAt(this.ctx.texts.feedback.escaped, 'bad', T.x, T.y - r, 850, clamp(this.ctx.stage.u * 4.2, 16, 34));
    this.clearTarget(T, t);
  }

  /** Treppe: höchstens ein Ergebnis pro Ziel */
  private judge(T: Target, ok: boolean): void {
    if (T.judged) return;
    T.judged = true;
    if (this.demo) return;
    this.stair.update(ok);
    this.updateLabel();
  }

  private clearTarget(T: Target, t: number): void {
    this.lastPos = { x: T.x, y: T.y };
    this.target = null;
    this.phase = 'gap';
    this.gapUntil = t + GAP_MS;
  }

  private toastAt(text: string, kind: ToastKind, x: number, top: number, ms: number, size: number): void {
    const { w } = this.ctx.stage;
    const half = Math.min(w / 2, text.length * size * 0.3 + 8);
    this.ctx.hud.toast(text, kind, { x: clamp(x, half, w - half), y: Math.max(size * 1.1, top - size * 0.8), ms, size });
  }

  private updateLabel(): void {
    this.ctx.hud.setLabel(`${this.ctx.texts.feedback.level} ${Math.floor(this.level + 1e-9)}`);
  }

  private prune(t: number): void {
    const markMs = this.demo ? DEMO_MARK_MS : MARK_MS;
    if (this.fades.length) this.fades = this.fades.filter((f) => t - f.t0 < FADE_MS);
    if (this.bursts.length) this.bursts = this.bursts.filter((b) => t - b.t0 < BURST_MS);
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < markMs);
  }

  // -------------------------------------------------------------------------
  // Geister-Hand

  /** Autoplay (Tests): zielt mit Vorhalt, liegt manchmal zu weit hinten */
  private autoUpdate(t: number): void {
    const T = this.target;
    const { ghost, rng } = this.ctx;
    if (this.phase !== 'target' || !T || !ghost.idle || t < this.autoAt) return;
    const move = rng.range(260, 440);
    const pt = this.predict(T, move + 20);
    const r = this.radius(T);
    let { x, y } = pt;
    if (rng.chance(0.15)) {
      x -= Math.cos(T.ang) * r * 2.4;
      y -= Math.sin(T.ang) * r * 2.4;
    } else {
      x += rng.normal() * r * 0.25;
      y += rng.normal() * r * 0.25;
    }
    ghost.tap(x, y, { move });
    this.autoAt = t + move + rng.range(180, 380);
  }

  private demoUpdate(t: number): void {
    const T = this.target;
    const script = DEMO[this.spawned - 1];
    if (this.phase === 'target' && T && script) {
      const age = t - T.born;
      while (this.demoAct < script.acts.length && age >= script.acts[this.demoAct].at) {
        this.demoAction(T, script.acts[this.demoAct++]);
      }
    }
    if (this.demoEndAt && t >= this.demoEndAt) {
      this.phase = 'done';
      this.ctx.finish({
        primary: { key: 'points', value: this.points, unit: 'points', better: 'higher' },
        secondary: [{ key: 'caught', value: this.caught, unit: 'count' }],
        score: this.points,
        level: MIN_LEVEL,
      });
    }
  }

  private demoAction(T: Target, a: DemoAct): void {
    const { ghost } = this.ctx;
    if (a.kind === 'lead') {
      // Vorhalt: dorthin, wo der Punkt nach Fahrzeit + kurzem Warten sein wird
      const wait = a.wait ?? 0;
      const pt = this.predict(T, a.move + wait + 30);
      ghost.moveTo(pt.x, pt.y, { move: a.move });
      ghost.tap(pt.x, pt.y, { delay: wait, move: 0 });
    } else {
      // Ohne Vorhalt auf die aktuelle Stelle (etwas dahinter) – bis die Hand dort ist, ist der Punkt weg
      const r = this.radius(T);
      ghost.tap(T.x - Math.cos(T.ang) * r * 0.7, T.y - Math.sin(T.ang) * r * 0.7, { move: a.move });
    }
  }

  /** Ruheplatz der Hand im Intro-Film: unten rechts, über der Bildunterschrift */
  private restPoint(): Point {
    const { w, u } = this.ctx.stage;
    const hs = clamp(u * 13, 48, 110); // Handgröße wie im Runner
    return { x: w - hs * 0.75, y: captionTop(this.ctx.stage) - hs * 0.95 };
  }

  // -------------------------------------------------------------------------

  private end(): void {
    this.phase = 'done';
    const { sfx, hud } = this.ctx;
    hud.setProgress(1);
    sfx.done();
    const thr = this.stair.threshold();
    const taps = this.caught + this.missTaps;
    const accuracy = taps ? (100 * this.caught) / taps : 0;
    const med = this.along.length >= MIN_ALONG_SAMPLES ? median(this.along) : NaN;
    let tip = 'great';
    if (med < -ALONG_TIP) tip = 'lead';
    else if (med > ALONG_TIP) tip = 'center';
    else if (this.escaped > this.caught) tip = 'quicker';
    this.ctx.finish({
      primary: { key: 'points', value: this.points, unit: 'points', better: 'higher' },
      secondary: [
        { key: 'caught', value: this.caught, unit: 'count' },
        { key: 'accuracy', value: Math.round(accuracy), unit: 'percent' },
        { key: 'level', value: Math.max(MIN_LEVEL, Math.round(thr)), unit: 'level' },
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
    const move = (p: Point) => {
      p.x *= sx;
      p.y *= sy;
    };
    this.fades.forEach(move);
    this.bursts.forEach(move);
    this.marks.forEach(move);
    if (this.lastPos) move(this.lastPos);
    const T = this.target;
    if (T) {
      move(T);
      const b = this.bounds(this.radius(T));
      T.x = clamp(T.x, b.minX, b.maxX);
      T.y = clamp(T.y, b.minY, b.maxY);
    }
  }

  // -------------------------------------------------------------------------

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, u, dpr } = this.ctx.stage;
    background(g, w, h, dpr, 'grid');
    for (const f of this.fades) {
      const k = clamp((t - f.t0) / FADE_MS, 0, 1);
      drawTarget(g, f.x, f.y, f.r * (1 - 0.35 * easeOut(k)), 1 - k, f.r);
    }
    const T = this.target;
    if (T) this.drawLive(g, T, t, u);
    for (const b of this.bursts) drawBurst(g, b, clamp((t - b.t0) / BURST_MS, 0, 1));
    const markMs = this.demo ? DEMO_MARK_MS : MARK_MS;
    for (const m of this.marks) drawMark(g, m.x, m.y, clamp((t - m.t0) / markMs, 0, 1), u);
  }

  private drawLive(g: CanvasRenderingContext2D, T: Target, t: number, u: number): void {
    const r = this.radius(T);
    const age = Math.max(0, t - T.born);
    // Auftauch-Ring: hilft, das neue Ziel schnell zu finden
    if (age < SPAWN_RING_MS) {
      const k = age / SPAWN_RING_MS;
      ring(g, T.x, T.y, r * (1 + 1.1 * easeOut(k)), withAlpha(BLUE_LIGHT, 0.55 * (1 - k)), 2);
    }
    const rr = r * (0.6 + 0.4 * easeOut(age / POP_MS));
    // Restzeit als dezenter Bogen
    const frac = clamp(1 - age / T.life, 0, 1);
    if (frac > 0) {
      g.save();
      g.beginPath();
      g.arc(T.x, T.y, rr + Math.max(6, u * 1.0), -Math.PI / 2, -Math.PI / 2 + frac * Math.PI * 2);
      g.lineWidth = Math.max(2.5, u * 0.4);
      g.lineCap = 'round';
      g.strokeStyle = frac > 0.3 ? 'rgba(255,255,255,0.3)' : 'rgba(251,191,36,0.65)';
      g.globalAlpha = Math.min(1, age / 120);
      g.stroke();
      g.restore();
    }
    drawTarget(g, T.x, T.y, rr, Math.min(1, 0.2 + age / 90), r);
  }
}

// ---------------------------------------------------------------------------
// Hilfsfunktionen

/** Oberkante der Bildunterschrift im Intro-Film (gleiche Formel wie im Runner) */
function captionTop(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return s.h - size * 2.1 - s.h * 0.05;
}

function span(minX: number, maxX: number, minY: number, maxY: number): Bounds {
  if (maxX < minX) minX = maxX = (minX + maxX) / 2;
  if (maxY < minY) minY = maxY = (minY + maxY) / 2;
  return { minX, maxX, minY, maxY };
}

/** Spiegelt Position und Richtung an den Grenzen. true, wenn abgeprallt. */
function bounce(o: { x: number; y: number; ang: number }, b: Bounds): boolean {
  let bounced = false;
  if (o.x < b.minX || o.x > b.maxX) {
    const low = o.x < b.minX;
    const edge = low ? b.minX : b.maxX;
    const outward = low ? Math.cos(o.ang) < 0 : Math.cos(o.ang) > 0;
    o.x = clamp(outward ? 2 * edge - o.x : o.x, b.minX, b.maxX);
    if (outward) {
      o.ang = Math.PI - o.ang;
      bounced = true;
    }
  }
  if (o.y < b.minY || o.y > b.maxY) {
    const low = o.y < b.minY;
    const edge = low ? b.minY : b.maxY;
    const outward = low ? Math.sin(o.ang) < 0 : Math.sin(o.ang) > 0;
    o.y = clamp(outward ? 2 * edge - o.y : o.y, b.minY, b.maxY);
    if (outward) {
      o.ang = -o.ang;
      bounced = true;
    }
  }
  return bounced;
}

/** Zielscheibe: heller Ring außen, weißer Punkt innen */
function drawTarget(g: CanvasRenderingContext2D, x: number, y: number, rr: number, alpha: number, glowR: number): void {
  if (alpha <= 0.01 || rr <= 0) return;
  glow(g, x, y, glowR, BLUE, 0.9 * alpha);
  g.save();
  g.globalAlpha = clamp(alpha, 0, 1);
  circle(g, x, y, rr, 'rgba(56,189,248,0.18)');
  ring(g, x, y, rr * 0.79, BLUE, Math.max(2, rr * 0.24));
  ring(g, x, y, rr - 0.75, 'rgba(224,242,254,0.75)', 1.5);
  circle(g, x, y, rr * 0.36, '#FFFFFF');
  g.restore();
}

/** Treffer: sich ausbreitender Ring + Funken */
function drawBurst(g: CanvasRenderingContext2D, b: Fx, k: number): void {
  const e = easeOut(k);
  ring(g, b.x, b.y, b.r * (0.9 + 1.5 * e), withAlpha(BLUE_LIGHT, 0.9 * (1 - k)), Math.max(1, 4 * (1 - k)));
  for (let i = 0; i < 10; i++) {
    const a = b.spin + (i * Math.PI * 2) / 10;
    const d = b.r * (0.5 + 1.8 * e);
    circle(g, b.x + Math.cos(a) * d, b.y + Math.sin(a) * d, Math.max(0.6, b.r * 0.1 * (1 - k)), withAlpha('#E0F2FE', 1 - k));
  }
  circle(g, b.x, b.y, b.r * 0.6 * (1 - e), withAlpha('#FFFFFF', 0.9 * (1 - k)));
}

/** Fehltipp: kleines ✗, das verblasst */
function drawMark(g: CanvasRenderingContext2D, x: number, y: number, k: number, u: number): void {
  const s = Math.max(8, u * 1.6) * (0.85 + 0.15 * easeOut(Math.min(1, k * 4)));
  const lw = Math.max(3, u * 0.55);
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

export const zielfang: ExerciseDefinition = {
  id: 'zielfang',
  category: 'bewegung',
  minutes: 1,
  color: '#2E6DB4',
  icon:
    '<circle cx="29" cy="20" r="12" fill="none" stroke="currentColor" stroke-width="3.4"/><circle cx="29" cy="20" r="4.6" fill="currentColor"/><path d="M5 38.5c5.5-1.2 10.5-4.4 14-9.2" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-dasharray="1 6.5"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new Zielfang(ctx),
};
