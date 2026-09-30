/**
 * Schwarm-Wechsel – mehrere wandernde Kugeln in der Reihenfolge ihrer Dringlichkeit antippen.
 *
 * Abgrenzung zu Zielfang (ein bewegtes Ziel) und Ziele abräumen (ruhende Ziele): Hier wandern
 * 2–5 Kugeln gleichzeitig, jede mit einem sichtbaren Restzeit-Ring. Man wählt selbst, welche
 * zuerst drankommt (kürzester Ring), tippt sie an und wechselt sofort zur nächsten.
 *
 * - Bewegung weich (schwankende Drehrate, Abprallen am Rand), alles mit dt in u/s gerechnet →
 *   gleich schnell auf 60- und 120-Hz-Geräten und jeder Bühnengröße.
 * - Stufe (Staircase, 3-down/1-up → ≈ 79 %): Anzahl (2–5), Tempo, Größe und Lebensdauer.
 * - Fehler = Fehltipp (✗). Ein abgelaufenes Ziel zählt für die Stufe ebenfalls als Fehler.
 * - Gemessen wird die Zeit von Treffer zu Treffer (Median) und ob das dringendste Ziel zuerst kam.
 *   Wohin man schaut, wird nicht gemessen.
 * - Trefferfläche größer als das sichtbare Ziel (≥ 32 px Radius).
 */
import { background, circle, orb, ring, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo, ToastKind } from '../../core/types';
import {
  type Bounds,
  type Pt,
  type Walker,
  MAX_LEVEL,
  MIN_LEVEL,
  bounce,
  computeStats,
  countFor,
  hitRadius,
  initialFractions,
  isInOrder,
  levelOf,
  lifeMs,
  mostUrgent,
  pickSpawnPoint,
  pointsFor,
  radiusPx,
  respawnDelayMs,
  separate,
  span,
  speedFor,
  steer,
  tipFor,
} from './logic';
import { de, it } from './texts';

const SESSION_MS = 45000;
const QUICK_SESSION_MS = 8000;
const FADE_IN_MS = 250;
const FADE_OUT_MS = 300;
const CHECK_MS = 520;
const BURST_MS = 480;
const MARK_MS = 420;
const DEMO_MARK_MS = 800;
const DOUBLE_TAP_MS = 80;
// Intro-Film: zwei langsame Kugeln mit langer Lebensdauer, vier Treffer
const DEMO_LIFE_MS = 10000;
const DEMO_SPEED_U = 3.5;
const DEMO_HITS = 4;
const DEMO_FIRST_TAP_MS = 2300;
const DEMO_SPAWNS: Array<{ nx: number; ny: number; deg: number; frac: number }> = [
  { nx: 0.22, ny: 0.4, deg: 20, frac: 0.55 },
  { nx: 0.74, ny: 0.62, deg: 200, frac: 1 },
];

const ORB = '#5BA4E6';
const RING_HI = 'rgba(232,238,247,0.9)';
const RING_LOW = '#FBBF24';
const MISS = '#F87171';

interface Orb extends Walker {
  lvl: number;
  /** Tempo-Faktor dieses Ziels (0,85–1,15) */
  factor: number;
  /** aktuelles Tempo in u/s */
  speed: number;
  /** Radius in px (nachgeführt) */
  r: number;
  /** Erscheinen (für das weiche Einblenden) */
  shown: number;
  /** „Geburt“ für die Restzeit – bei den Start-Zielen rückdatiert, damit sie verschieden dringend sind */
  born: number;
  life: number;
}

interface Fx extends Pt {
  t0: number;
  r: number;
}

class SchwarmWechsel implements Exercise {
  private readonly demo: boolean;
  private readonly duration: number;
  private readonly stair: Staircase;
  private phase: 'play' | 'done' = 'play';
  private t0 = 0;
  private orbs: Orb[] = [];
  private pending: number[] = [];
  private lastTap: (Pt & { t: number }) | null = null;
  private lastDownT = -1e9;
  private lastHitT = 0;
  private lastBadSfx = -1e9;
  private gaps: number[] = [];
  private orderFlags: boolean[] = [];
  private missTaps = 0;
  private expired = 0;
  private points = 0;
  private checks: Fx[] = [];
  private bursts: Fx[] = [];
  private fades: Fx[] = [];
  private marks: Fx[] = [];
  private lastW = 0;
  private lastH = 0;
  private spawnCount = 0;
  // Autoplay / Intro-Film
  private autoAt = 0;
  private demoHits = 0;
  private demoNextAt = 0;
  private demoPlanned = false;
  private demoEndAt = 0;
  /** Zeitpunkt des Endes – danach steht das Bild still */
  private endT = Infinity;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.duration = ctx.quick ? QUICK_SESSION_MS : SESSION_MS;
    this.stair = new Staircase({ start: ctx.startLevel ?? MIN_LEVEL, min: MIN_LEVEL, max: MAX_LEVEL, down: 3, up: 1 });
  }

  // --- Stufen-Werte (im Intro-Film immer die leichteste, feste Stufe) ---

  private get level(): number {
    return this.demo ? MIN_LEVEL : levelOf(this.stair.level);
  }

  private get desired(): number {
    return this.demo ? 2 : countFor(this.stair.level);
  }

  private radiusFor(lvl: number): number {
    return radiusPx(lvl, this.ctx.stage.u);
  }

  /** Abstand zwischen Kugel und Restzeit-Ring */
  private ringGap(): number {
    return Math.max(5, this.ctx.stage.u * 0.9);
  }

  private ringWidth(): number {
    return Math.max(3.5, this.ctx.stage.u * 0.75);
  }

  /** Bereich, in dem sich der Mittelpunkt einer Kugel mit Radius r bewegen darf (Ring inklusive) */
  private bounds(r: number): Bounds {
    const { w, h, u } = this.ctx.stage;
    const m = Math.max(4, u * 1.2) + this.ringGap() + this.ringWidth();
    const bottom = this.demo ? captionTop(this.ctx.stage) - 6 : h - m;
    return span(m + r, w - m - r, m + r, bottom - r);
  }

  start(t: number): void {
    const { hud, ghost, texts, stage } = this.ctx;
    this.t0 = t;
    this.lastHitT = t;
    this.lastW = stage.w;
    this.lastH = stage.h;
    hud.setProgress(0);
    hud.setScore(0);
    this.updateLabel();
    const n = this.desired;
    const fr = this.demo ? DEMO_SPAWNS.map((s) => s.frac) : initialFractions(n, this.ctx.rng);
    for (let i = 0; i < n; i++) this.spawn(t, fr[i] ?? 1);
    if (this.demo) {
      hud.caption(texts.captions.rings);
      const rest = this.restPoint();
      ghost.moveTo(rest.x, rest.y, { move: 0 });
      this.demoNextAt = t + DEMO_FIRST_TAP_MS;
    } else {
      this.autoAt = t + 900;
    }
  }

  // -------------------------------------------------------------------------
  // Ziele

  private spawn(t: number, frac = 1): void {
    const { rng, stage } = this.ctx;
    const lvl = this.level;
    const r = this.radiusFor(lvl);
    const b = this.bounds(r);
    const script = this.demo ? DEMO_SPAWNS[this.spawnCount] : undefined;
    let p: Pt;
    let ang: number;
    if (script) {
      p = { x: b.minX + (b.maxX - b.minX) * script.nx, y: b.minY + (b.maxY - b.minY) * script.ny };
      ang = (script.deg * Math.PI) / 180;
    } else {
      const recent = this.lastTap && t - this.lastTap.t < 2500 ? this.lastTap : null;
      p = pickSpawnPoint(rng, b, this.orbs, recent, Math.max(14 * stage.u, r * 4), 10 * stage.u);
      ang = rng.range(0, Math.PI * 2);
    }
    const life = this.demo ? DEMO_LIFE_MS : lifeMs(lvl);
    const factor = this.demo ? 1 : rng.range(0.85, 1.15);
    this.orbs.push({
      x: p.x,
      y: p.y,
      ang,
      turn: 0,
      lvl,
      factor,
      speed: this.demo ? DEMO_SPEED_U : speedFor(lvl) * factor,
      r,
      shown: t,
      born: t - life * (1 - frac),
      life,
    });
    this.spawnCount++;
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
    // Fehlende Ziele nachliefern (nach Treffer/Ablauf oder wenn die Stufe mehr Ziele verlangt)
    while (this.orbs.length + this.pending.length < this.desired) this.pending.push(t + respawnDelayMs(this.ctx.rng));
    if (this.pending.length) {
      const due = this.pending.filter((x) => x <= t).length;
      if (due) {
        this.pending = this.pending.filter((x) => x > t);
        for (let i = 0; i < due; i++) this.spawn(t);
      }
    }
    this.moveAll(dt);
    for (const T of [...this.orbs]) if (t - T.born >= T.life) this.expire(T, t);
    this.prune(t);
    if (this.demo) this.demoUpdate(t);
    else if (this.ctx.autoplay) this.autoUpdate(t);
  }

  private moveAll(dt: number): void {
    const { rng, stage } = this.ctx;
    for (const T of this.orbs) {
      T.r = this.radiusFor(T.lvl);
      // Tempo weich an die aktuelle Stufe anpassen
      const goal = this.demo ? DEMO_SPEED_U : speedFor(this.stair.level) * T.factor;
      T.speed += (goal - T.speed) * (1 - Math.exp(-dt / 0.5));
      steer(T, dt, rng);
      const v = T.speed * stage.u;
      T.x += Math.cos(T.ang) * v * dt;
      T.y += Math.sin(T.ang) * v * dt;
      bounce(T, this.bounds(T.r));
    }
    if (this.orbs.length > 1) {
      separate(this.orbs, this.ringGap() * 2 + this.ringWidth());
      for (const T of this.orbs) {
        const b = this.bounds(T.r);
        T.x = clamp(T.x, b.minX, b.maxX);
        T.y = clamp(T.y, b.minY, b.maxY);
      }
    }
  }

  private remaining(T: Orb, t: number): number {
    return T.life - (t - T.born);
  }

  private expire(T: Orb, t: number): void {
    const { texts, stage } = this.ctx;
    this.orbs = this.orbs.filter((o) => o !== T);
    this.expired++;
    this.fades.push({ x: T.x, y: T.y, t0: t, r: T.r });
    this.toastAt(texts.feedback.expired, 'info', T.x, T.y - T.r, 800, clamp(stage.u * 3.8, 15, 28));
    if (!this.demo) this.stair.update(false);
    this.updateLabel();
  }

  // -------------------------------------------------------------------------
  // Eingabe

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'play') return;
    // Prellen / zweiter Finger im selben Moment nicht doppelt werten
    if (p.t - this.lastDownT < DOUBLE_TAP_MS) return;
    this.lastDownT = p.t;
    this.lastTap = { x: p.x, y: p.y, t: p.t };
    // Nächstes Ziel innerhalb des Trefferradius (Stelle im letzten Bild, so wie man es gesehen hat)
    let best: Orb | null = null;
    let bestD = Infinity;
    for (const T of this.orbs) {
      if (p.t < T.shown) continue;
      const d = Math.hypot(p.x - T.x, p.y - T.y);
      if (d <= hitRadius(T.r) && d < bestD) {
        best = T;
        bestD = d;
      }
    }
    if (best) this.hit(best, p);
    else this.miss(p);
  }

  private hit(T: Orb, p: PointerInfo): void {
    const { sfx, hud, stage } = this.ctx;
    const t = p.t;
    const rem = this.orbs.map((o) => this.remaining(o, t));
    const inOrder = isInOrder(rem, this.orbs.indexOf(T));
    this.orbs = this.orbs.filter((o) => o !== T);
    this.gaps.push(Math.max(0, t - this.lastHitT));
    this.lastHitT = t;
    this.orderFlags.push(inOrder);
    const pts = pointsFor(T.lvl, inOrder);
    this.points += pts;
    sfx.good();
    this.checks.push({ x: T.x, y: T.y, t0: t, r: T.r });
    if (!this.ctx.reducedMotion) this.bursts.push({ x: T.x, y: T.y, t0: t, r: T.r });
    this.toastAt(`+${pts}`, 'good', T.x, T.y - T.r * 1.6, 650, clamp(stage.u * 4.2, 16, 32));
    hud.setScore(this.points);
    if (!this.demo) this.stair.update(true);
    this.updateLabel();
    if (this.demo) this.demoAfterTap(t, true);
  }

  private miss(p: PointerInfo): void {
    const { sfx } = this.ctx;
    this.missTaps++;
    this.marks.push({ x: p.x, y: p.y, t0: p.t, r: 0 });
    // Leise halten: bei schnellem Mehrfach-Tippen nicht jedes Mal
    if (p.t - this.lastBadSfx > 350) {
      sfx.bad();
      this.lastBadSfx = p.t;
    }
    if (!this.demo) this.stair.update(false);
    this.updateLabel();
    if (this.demo) this.demoAfterTap(p.t, false);
  }

  private toastAt(text: string, kind: ToastKind, x: number, top: number, ms: number, size: number): void {
    const { w } = this.ctx.stage;
    const half = Math.min(w / 2, text.length * size * 0.3 + 8);
    this.ctx.hud.toast(text, kind, { x: clamp(x, half, w - half), y: Math.max(size * 1.1, top - size * 0.8), ms, size });
  }

  private updateLabel(): void {
    this.ctx.hud.setLabel(this.demo ? null : `${this.ctx.texts.feedback.level} ${levelOf(this.stair.level)}`);
  }

  private prune(t: number): void {
    if (this.checks.length) this.checks = this.checks.filter((c) => t - c.t0 < CHECK_MS);
    if (this.bursts.length) this.bursts = this.bursts.filter((c) => t - c.t0 < BURST_MS);
    if (this.fades.length) this.fades = this.fades.filter((c) => t - c.t0 < FADE_OUT_MS);
    if (this.marks.length) this.marks = this.marks.filter((c) => t - c.t0 < (this.demo ? DEMO_MARK_MS : MARK_MS));
  }

  // -------------------------------------------------------------------------
  // Geister-Hand

  /** Wohin tippen, damit man die Kugel nach `move` ms trifft (gerade Fortsetzung der Bewegung) */
  private aimAt(T: Orb, move: number): Pt {
    const v = T.speed * this.ctx.stage.u;
    const b = this.bounds(T.r);
    const s = (move + 30) / 1000;
    return {
      x: clamp(T.x + Math.cos(T.ang) * v * s, b.minX, b.maxX),
      y: clamp(T.y + Math.sin(T.ang) * v * s, b.minY, b.maxY),
    };
  }

  /** Autoplay (Tests): meist das dringendste Ziel, manchmal ein anderes, selten daneben */
  private autoUpdate(t: number): void {
    const { ghost, rng, stage } = this.ctx;
    if (!ghost.idle || t < this.autoAt || !this.orbs.length) return;
    const move = rng.range(260, 440);
    const rem = this.orbs.map((o) => this.remaining(o, t));
    const roll = rng.next();
    if (roll < 0.05) {
      const pt = pickSpawnPoint(rng, this.bounds(stage.u * 4), this.orbs, null, stage.u * 12, 0);
      ghost.tap(pt.x, pt.y, { move });
    } else {
      let idx = mostUrgent(rem);
      if (roll < 0.15 && this.orbs.length > 1) idx = (idx + 1 + rng.int(this.orbs.length - 1)) % this.orbs.length;
      const T = this.orbs[idx];
      const pt = this.aimAt(T, move);
      ghost.tap(pt.x + rng.normal() * T.r * 0.2, pt.y + rng.normal() * T.r * 0.2, { move });
    }
    this.autoAt = t + move + rng.range(220, 420);
  }

  private demoUpdate(t: number): void {
    const { ghost, hud, texts } = this.ctx;
    if (this.demoEndAt && t >= this.demoEndAt) {
      this.phase = 'done';
      this.endT = t;
      this.ctx.finish({
        primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' },
        secondary: [{ key: 'hits', value: this.orderFlags.length, unit: 'count' }],
        score: this.points,
        level: MIN_LEVEL,
      });
      return;
    }
    if (this.demoEndAt || this.demoPlanned || t < this.demoNextAt || !ghost.idle || !this.orbs.length) return;
    // Nur Kugeln, die schon deutlich sichtbar sind
    const cand = this.orbs.filter((o) => t - o.shown >= 450);
    if (!cand.length) return;
    const T = cand[mostUrgent(cand.map((o) => this.remaining(o, t)))];
    if (this.demoHits === 0) hud.caption(texts.captions.urgent);
    const move = 850;
    const pt = this.aimAt(T, move);
    ghost.tap(pt.x, pt.y, { move });
    this.demoPlanned = true;
  }

  private demoAfterTap(t: number, ok: boolean): void {
    const { ghost, hud, texts } = this.ctx;
    this.demoPlanned = false;
    if (ok) this.demoHits++;
    ghost.moveTo(this.restPoint().x, this.restPoint().y, { delay: 250, move: 520 });
    if (ok && this.demoHits === 1) hud.caption(texts.captions.next);
    if (this.demoHits >= DEMO_HITS) this.demoEndAt = t + 1000;
    this.demoNextAt = t + 1300;
  }

  /** Ruheplatz der Hand im Intro-Film: unten rechts, über der Bildunterschrift */
  private restPoint(): Pt {
    const { w, u } = this.ctx.stage;
    const hs = clamp(u * 13, 48, 110);
    return { x: w - hs * 0.75, y: captionTop(this.ctx.stage) - hs * 0.95 };
  }

  // -------------------------------------------------------------------------

  private end(): void {
    this.phase = 'done';
    this.endT = this.ctx.now();
    const { sfx, hud } = this.ctx;
    hud.setProgress(1);
    sfx.done();
    const thr = this.stair.threshold();
    const s = computeStats(this.gaps, this.orderFlags, this.missTaps, this.expired);
    const secondary = [
      { key: 'hits', value: s.hits, unit: 'count' as const },
      ...(Number.isFinite(s.medianMs) ? [{ key: 'medianTime', value: Math.round(s.medianMs), unit: 'time' as const }] : []),
      ...(Number.isFinite(s.orderRate) ? [{ key: 'order', value: Math.round(s.orderRate), unit: 'percent' as const }] : []),
      { key: 'expired', value: s.expired, unit: 'count' as const },
    ];
    this.ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), MIN_LEVEL, MAX_LEVEL), unit: 'level', better: 'higher' },
      secondary,
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip: tipFor(s),
    });
  }

  resize(w: number, h: number): void {
    const sx = this.lastW > 0 ? w / this.lastW : 1;
    const sy = this.lastH > 0 ? h / this.lastH : 1;
    this.lastW = w;
    this.lastH = h;
    const move = (p: Pt) => {
      p.x *= sx;
      p.y *= sy;
    };
    this.checks.forEach(move);
    this.bursts.forEach(move);
    this.fades.forEach(move);
    this.marks.forEach(move);
    if (this.lastTap) move(this.lastTap);
    for (const T of this.orbs) {
      move(T);
      T.r = this.radiusFor(T.lvl);
      const b = this.bounds(T.r);
      T.x = clamp(T.x, b.minX, b.maxX);
      T.y = clamp(T.y, b.minY, b.maxY);
    }
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, now: number): void {
    const { w, h, u, dpr } = this.ctx.stage;
    const t = Math.min(now, this.endT);
    background(g, w, h, dpr);
    for (const f of this.fades) this.drawFade(g, f, t, u);
    for (const T of this.orbs) this.drawOrb(g, T, t);
    for (const b of this.bursts) {
      const k = clamp((t - b.t0) / BURST_MS, 0, 1);
      ring(g, b.x, b.y, b.r * (1 + 0.9 * easeOut(k)), withAlpha('#E0F2FE', 0.85 * (1 - k)), Math.max(1.5, 4 * (1 - k)));
    }
    for (const c of this.checks) this.drawCheck(g, c, t, u);
    for (const m of this.marks) this.drawMark(g, m, t, u);
  }

  /** Abgelaufenes Ziel: Kugel blendet aus, gestrichelter Ring (Form, nicht nur Farbe) */
  private drawFade(g: CanvasRenderingContext2D, f: Fx, t: number, u: number): void {
    const k = clamp((t - f.t0) / FADE_OUT_MS, 0, 1);
    g.save();
    g.globalAlpha = 1 - k;
    circle(g, f.x, f.y, f.r * (this.ctx.reducedMotion ? 1 : 1 - 0.3 * easeOut(k)), withAlpha(ORB, 0.45));
    const dash = Math.max(4, u);
    ring(g, f.x, f.y, f.r + this.ringGap() + this.ringWidth() / 2, RING_LOW, Math.max(2, u * 0.45), [dash, dash]);
    g.restore();
  }

  private drawOrb(g: CanvasRenderingContext2D, T: Orb, t: number): void {
    const age = Math.max(0, t - T.shown);
    const a = clamp(age / FADE_IN_MS, 0, 1);
    const pop = this.ctx.reducedMotion ? 1 : 0.8 + 0.2 * easeOut(age / FADE_IN_MS);
    const r = T.r * pop;
    g.save();
    g.globalAlpha = a;
    orb(g, T.x, T.y, r, ORB, { glow: 0.55 });
    circle(g, T.x, T.y, r * 0.3, 'rgba(255,255,255,0.92)');
    // Restzeit-Ring: die Länge des Bogens zeigt, wie lange die Kugel noch bleibt
    const frac = clamp(this.remaining(T, t) / T.life, 0, 1);
    const rr = T.r + this.ringGap() + this.ringWidth() / 2;
    g.lineCap = 'round';
    g.lineWidth = this.ringWidth();
    g.beginPath();
    g.arc(T.x, T.y, rr, 0, Math.PI * 2);
    g.strokeStyle = 'rgba(255,255,255,0.12)';
    g.stroke();
    if (frac > 0.005) {
      g.beginPath();
      g.arc(T.x, T.y, rr, -Math.PI / 2, -Math.PI / 2 + frac * Math.PI * 2);
      g.strokeStyle = frac > 0.3 ? RING_HI : RING_LOW;
      g.stroke();
    }
    g.restore();
  }

  /** Treffer: ✓ (Form, nicht nur Farbe) */
  private drawCheck(g: CanvasRenderingContext2D, c: Fx, t: number, u: number): void {
    const k = clamp((t - c.t0) / CHECK_MS, 0, 1);
    const s = Math.max(10, c.r * 0.55);
    const rise = this.ctx.reducedMotion ? 0 : -easeOut(k) * u * 1.5;
    g.save();
    g.globalAlpha = Math.min(1, k * 10) * (1 - k);
    g.lineCap = 'round';
    g.lineJoin = 'round';
    g.beginPath();
    g.moveTo(c.x - s * 0.7, c.y + rise);
    g.lineTo(c.x - s * 0.2, c.y + s * 0.5 + rise);
    g.lineTo(c.x + s * 0.8, c.y - s * 0.55 + rise);
    g.strokeStyle = 'rgba(5,10,20,0.75)';
    g.lineWidth = Math.max(5, u * 1.1) + 3;
    g.stroke();
    g.strokeStyle = '#4ADE80';
    g.lineWidth = Math.max(5, u * 1.1);
    g.stroke();
    g.restore();
  }

  /** Fehltipp: ✗, das verblasst */
  private drawMark(g: CanvasRenderingContext2D, m: Fx, t: number, u: number): void {
    const k = clamp((t - m.t0) / (this.demo ? DEMO_MARK_MS : MARK_MS), 0, 1);
    const s = Math.max(9, u * 1.8) * (0.85 + 0.15 * easeOut(Math.min(1, k * 4)));
    const lw = Math.max(3.5, u * 0.6);
    g.save();
    g.globalAlpha = 1 - k;
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(m.x - s, m.y - s);
    g.lineTo(m.x + s, m.y + s);
    g.moveTo(m.x + s, m.y - s);
    g.lineTo(m.x - s, m.y + s);
    g.strokeStyle = 'rgba(5,10,20,0.75)';
    g.lineWidth = lw + 3;
    g.stroke();
    g.strokeStyle = MISS;
    g.lineWidth = lw;
    g.stroke();
    g.restore();
  }
}

/** Oberkante der Bildunterschrift im Intro-Film (gleiche Formel wie im Runner) */
function captionTop(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return s.h - size * 2.1 - s.h * 0.05;
}

export const schwarmWechsel: ExerciseDefinition = {
  id: 'schwarm-wechsel',
  category: 'bewegung',
  minutes: 1,
  color: '#3A78B8',
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M16 4.5a8.5 8.5 0 1 1-8.5 8.5" opacity=".9"/><path d="M38 14.5a7 7 0 1 1-7 7" opacity=".9"/><path d="M14 29.5a6 6 0 1 1-6 6" opacity=".9"/></g><circle cx="16" cy="13" r="4.2" fill="currentColor"/><circle cx="38" cy="21.5" r="3.4" fill="currentColor"/><circle cx="14" cy="35.5" r="3" fill="currentColor"/><path d="M27 38.5c3 .5 6-.5 8-3" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="1 5" opacity=".6"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new SchwarmWechsel(ctx),
};
