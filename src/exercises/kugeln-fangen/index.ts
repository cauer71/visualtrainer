/**
 * Kugeln fangen – Kreise fallen und werden angetippt, Quadrate lässt man durch (Go/No-Go mit FORM statt Farbe).
 *
 * Vorbild: „Lineal-Falltest“ (Katalog 802, Drop Catch). Das Original ist ein Maus-Spiel (Zeigersperre, Fadenkreuz):
 * grüne Kugeln anklicken, rote durchlassen – also nur durch die Farbe unterschieden, mit Zeitbonus, Zeitstrafe,
 * Rotblitz und Bildwackeln; der Rot-Anteil steigt bis 45 %. Hier ist es eine Tipp-Aufgabe für das Tablet:
 *
 * - Kreis und Quadrat haben dieselbe Farbe und Helligkeit, nur die FORM unterscheidet sie (auch bei Farbsehschwäche
 *   eindeutig). Der Quadrat-Anteil bleibt mit 20 % → 34 % im Bereich, in dem Durchlassen eine echte Entscheidung ist;
 *   nie mehr als zwei Quadrate hintereinander.
 * - Fallzeit in Sekunden (4,0 s → 1,3 s) statt px/s, gleichmäßiger Fall (ehrlich: keine Erdbeschleunigung),
 *   gleich schnell auf 60- und 120-Hz-Geräten und im Hoch- wie Querformat.
 * - Stufe (Staircase 3-down/1-up → ≈ 79 % Kreise gefangen): Tempo, Quadrat-Anteil und Dichte (2 → 6 Objekte gleichzeitig).
 *   Kreis gefangen = Erfolg; Kreis verpasst oder Quadrat angetippt = Fehler; ein durchgelassenes Quadrat zählt nicht.
 * - Feste Sitzungsdauer, keine Zeitgutschrift, keine Zeitstrafe, kein Rot, kein Blitz, kein Wackeln. Trefferradius ≥ 28 px.
 * - Gemessen werden Fangquote (Kreise) und Fehlalarme (angetippte Quadrate) – keine Reaktionszeit.
 * - Abgrenzung: Fallende Ziele fängt Ziele früh und bringt Stör-Objekte erst ab Stufe 9; hier ist es von Anfang an die
 *   reine Go/No-Go-Aufgabe, und die Dichte (gleichzeitig fallende Objekte) steigt mit der Stufe.
 */
import { background, fillRR, glow, orb, ring, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut, lerp, mean } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo, ToastKind } from '../../core/types';
import {
  advance,
  catchPct,
  fallTimeFor,
  findHit,
  hitRadiusFor,
  type Kind,
  MAX_LEVEL,
  MIN_LEVEL,
  maxActiveFor,
  nextKind,
  pickLane,
  pointsFor,
  radiusFor,
  spawnGapSecondsFor,
  squareHalfSide,
  squareShareFor,
} from './logic';
import { de, it } from './texts';

const SESSION_MS = 50_000;
const QUICK_SESSION_MS = 10_000;
const BURST_MS = 420;
const FADE_MS = 300;
const MARK_MS = 450;
const IN_MS = 220;
/** Intro-Film: langsam (4 s Fallzeit) */
const DEMO_FALL_S = 4;
const DEMO_END_MS = 1300;

/** Kreis und Quadrat haben dieselbe Farbe: nur die Form unterscheidet sie */
const SHAPE = '#5EEAD4';
const SHAPE_DARK = '#0F3D3A';

interface Faller {
  kind: Kind;
  /** Waagrechte Bahn 0..1 */
  nx: number;
  /** Fortschritt 0 (oben) … 1 (Boden) */
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
  shape?: Kind;
}

interface DemoItem {
  at: number;
  nx: number;
  kind: Kind;
  tapP?: number;
}

/** Intro-Film: Kreise fangen, Quadrate fallen lassen */
const DEMO: DemoItem[] = [
  { at: 500, nx: 0.3, kind: 'circle', tapP: 0.4 },
  { at: 2400, nx: 0.7, kind: 'square' },
  { at: 3500, nx: 0.55, kind: 'circle', tapP: 0.45 },
  { at: 5100, nx: 0.25, kind: 'square' },
  { at: 5300, nx: 0.72, kind: 'circle', tapP: 0.42 },
];

/** Oberkante der Bildunterschrift im Intro-Film (gleiche Formel wie im Runner) */
function captionTop(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return s.h - size * 2.1 - s.h * 0.05;
}

class KugelnFangen implements Exercise {
  private readonly stair: Staircase;
  private readonly duration: number;
  private phase: 'play' | 'done' = 'play';
  private t0 = 0;
  private fallers: Faller[] = [];
  private fx: Fx[] = [];
  private nextSpawnAt = 0;
  private history: Kind[] = [];
  private caught = 0;
  private missed = 0;
  private falseAlarms = 0;
  private squaresPassed = 0;
  private points = 0;
  /** Fortschritt p beim Fang (0 = oben … 1 = Boden) */
  private catchP: number[] = [];
  private lastBadSfx = -1e9;
  private squareHinted = false;
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

  /** Stufe für Tempo, Größe und Dichte (im Intro-Film immer die leichteste) */
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

  private posAt(F: Faller, p: number): { x: number; y: number } {
    const { w, m, ground } = this.geo();
    const r = this.radius(F);
    return { x: lerp(m + r, Math.max(m + r, w - m - r), F.nx), y: lerp(m - r, ground - r, p) };
  }

  start(t: number): void {
    const { hud, ghost, stage } = this.ctx;
    this.t0 = t;
    this.lastW = stage.w;
    this.lastH = stage.h;
    this.nextSpawnAt = t + 400;
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateLabel();
    if (this.ctx.autoplay) {
      const rest = this.restPoint();
      ghost.moveTo(rest.x, rest.y, { move: 0 });
    }
    if (this.demo) this.setCaption('tap', this.ctx.texts.captions.tap);
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
    for (const F of this.fallers) F.p = advance(F.p, dt, F.T);
    for (const F of [...this.fallers]) if (F.p >= 1) this.landed(F, t);
    if (this.demo) this.demoUpdate(t);
    else {
      this.spawnLogic(t);
      if (this.ctx.autoplay) this.autoUpdate(t);
    }
    if (this.fx.length) this.fx = this.fx.filter((f) => t - f.t0 < (f.kind === 'burst' ? BURST_MS : f.kind === 'fade' ? FADE_MS : MARK_MS));
  }

  // -------------------------------------------------------------------------
  // Neue Objekte

  private spawnLogic(t: number): void {
    const { rng, hud, stage, texts } = this.ctx;
    const lv = this.stair.level;
    if (this.fallers.length >= maxActiveFor(lv) || t < this.nextSpawnAt) return;
    const kind = nextKind(() => rng.next(), squareShareFor(lv), this.history);
    this.spawn(t, kind);
    this.nextSpawnAt = t + spawnGapSecondsFor(lv) * 1000 * rng.range(0.75, 1.3);
    if (kind === 'square' && !this.squareHinted) {
      this.squareHinted = true;
      hud.toast(texts.feedback.hint, 'info', { x: stage.w / 2, y: stage.h * 0.16, ms: 2400, size: clamp(stage.u * 4.2, 16, 32) });
    }
  }

  private spawn(t: number, kind: Kind, nxFixed?: number): Faller {
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
      kind,
      nx,
      p: 0,
      T: this.demo ? DEMO_FALL_S : fallTimeFor(lvl) * rng.range(0.92, 1.08),
      lvl,
      born: t,
      judged: false,
      planned: false,
    };
    this.fallers.push(F);
    this.history.push(kind);
    if (this.history.length > 12) this.history.shift();
    return F;
  }

  private remove(F: Faller): void {
    this.fallers = this.fallers.filter((o) => o !== F);
  }

  // -------------------------------------------------------------------------
  // Ergebnisse

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'play') return;
    const { sfx, hud, stage, texts } = this.ctx;
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
    if (F.kind === 'square') {
      // Fehlalarm: Quadrat angetippt
      this.falseAlarms++;
      this.judge(F, false);
      this.fx.push({ kind: 'mark', x: pos.x, y: pos.y, r, t0: p.t, shape: 'square' });
      if (p.t - this.lastBadSfx > 350) {
        sfx.bad();
        this.lastBadSfx = p.t;
      }
      this.toastAt(`✗ ${texts.feedback.wrong}`, 'bad', pos.x, pos.y - r, 900, clamp(stage.u * 3.8, 16, 30));
      this.remove(F);
      return;
    }
    const pts = pointsFor(this.level);
    this.caught++;
    this.points += pts;
    this.catchP.push(clamp(F.p, 0, 1));
    this.judge(F, true);
    sfx.good();
    if (!this.ctx.reducedMotion) this.fx.push({ kind: 'burst', x: pos.x, y: pos.y, r, t0: p.t });
    this.toastAt(`✓ +${pts}`, 'good', pos.x, pos.y - r, 700, clamp(stage.u * 4.4, 17, 36));
    if (!this.demo) hud.setScore(this.points);
    this.remove(F);
  }

  /** Objekt hat den Boden erreicht */
  private landed(F: Faller, t: number): void {
    const pos = this.posAt(F, 1);
    const r = this.radius(F);
    this.remove(F);
    if (F.kind === 'square') {
      // richtig durchgelassen – weder Lob noch Strafe
      this.squaresPassed++;
      return;
    }
    this.missed++;
    this.judge(F, false);
    if (!this.ctx.reducedMotion) this.fx.push({ kind: 'fade', x: pos.x, y: pos.y, r, t0: t, shape: 'circle' });
    this.toastAt(this.ctx.texts.feedback.escaped, 'info', pos.x, pos.y - r * 1.6, 800, clamp(this.ctx.stage.u * 3.6, 15, 28));
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

  private setCaption(state: string, txt: string): void {
    if (this.capState === state) return;
    this.capState = state;
    this.ctx.hud.caption(txt);
  }

  // -------------------------------------------------------------------------
  // Geister-Hand

  /** Ruheplatz der Hand: unten rechts, nicht über den Bahnen der Objekte */
  private restPoint(): { x: number; y: number } {
    const { w, h, u } = this.ctx.stage;
    const hs = clamp(u * 13, 48, 110);
    const baseY = this.demo ? captionTop(this.ctx.stage) - hs * 0.95 : h - hs * 0.7;
    return { x: w - hs * 0.75, y: baseY };
  }

  /** Film: fest geskriptet */
  private demoUpdate(t: number): void {
    const { ghost, texts } = this.ctx;
    const el = t - this.t0;
    while (this.demoIdx < DEMO.length && el >= DEMO[this.demoIdx].at) {
      const d = DEMO[this.demoIdx++];
      const F = this.spawn(t, d.kind, d.nx);
      F.planned = true;
      if (d.kind === 'square') {
        this.setCaption('stop', texts.captions.stop);
      } else if (d.tapP !== undefined) {
        this.setCaption('tap', texts.captions.tap);
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
      this.ctx.hud.caption(null);
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
    const sq = this.fallers.find((F) => F.kind === 'square' && !F.planned && F.p > 0.1 && F.p < 0.7);
    if (sq && rng.chance(0.05)) {
      sq.planned = true;
      const move = rng.range(320, 460);
      const pos = this.posAt(sq, sq.p + (move + 30) / 1000 / sq.T);
      ghost.tap(pos.x, pos.y, { move });
      this.autoAt = t + move + rng.range(150, 300);
      return;
    }
    // dringendster Kreis (am weitesten unten) zuerst
    const cand = this.fallers.filter((F) => F.kind === 'circle' && !F.planned && F.p > 0.05).sort((a, b) => b.p - a.p)[0];
    if (!cand) return;
    cand.planned = true;
    const move = rng.range(300, 480);
    const pp = cand.p + (move + 30) / 1000 / cand.T;
    const pOk = clamp(0.96 - 0.02 * (lv - 1), 0.55, 0.96);
    if (pp > 0.93 || !rng.chance(pOk)) {
      // entwischen lassen
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
    const pct = catchPct(this.caught, this.missed);
    let tip = 'great';
    if (this.falseAlarms >= 3) tip = 'form';
    else if (this.catchP.length >= 5 && mean(this.catchP) > 0.72) tip = 'late';
    this.ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), MIN_LEVEL, MAX_LEVEL), unit: 'level', better: 'higher' },
      secondary: [
        { key: 'caught', value: pct, unit: 'percent' },
        { key: 'falseAlarms', value: this.falseAlarms, unit: 'count' },
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
      if (f.kind === 'burst') ring(g, f.x, f.y, f.r * (0.9 + 1.2 * easeOut(k)), withAlpha('#CCFBF1', 0.85 * (1 - k)), Math.max(1, 4 * (1 - k)));
      else if (f.kind === 'fade') drawCircleShape(g, f.x, f.y, f.r * (1 - 0.4 * easeOut(k)), 1 - k);
      else drawMark(g, f.x, f.y, k, u, f.shape === 'square' ? f.r : 0);
    }
    for (const F of this.fallers) {
      const pos = this.posAt(F, F.p);
      const r = this.radius(F);
      const fade = this.ctx.reducedMotion ? 1 : clamp((t - F.born) / IN_MS, 0, 1);
      if (F.kind === 'square') drawSquareShape(g, pos.x, pos.y, r, fade);
      else drawCircleShape(g, pos.x, pos.y, r, fade);
    }
  }
}

// ---------------------------------------------------------------------------
// Zeichnen

/** Kugel: runde, glänzende Scheibe */
function drawCircleShape(g: CanvasRenderingContext2D, x: number, y: number, r: number, alpha: number): void {
  if (alpha <= 0.01 || r <= 0) return;
  g.save();
  g.globalAlpha = clamp(alpha, 0, 1);
  orb(g, x, y, r, SHAPE, { glow: 0.6 });
  g.restore();
}

/** Quadrat: gleiche Farbe, gleiche Fläche, aber eckig und ohne Glanz – nur die Form unterscheidet */
function drawSquareShape(g: CanvasRenderingContext2D, x: number, y: number, r: number, alpha: number): void {
  if (alpha <= 0.01 || r <= 0) return;
  const s = squareHalfSide(r);
  g.save();
  g.globalAlpha = clamp(alpha, 0, 1);
  glow(g, x, y, r, SHAPE, 0.45);
  fillRR(g, x - s, y - s, 2 * s, 2 * s, s * 0.14, SHAPE);
  // feine dunkle Kante, damit die Ecken auch bei kleinem Kontrast klar sind
  g.strokeStyle = withAlpha(SHAPE_DARK, 0.5);
  g.lineWidth = Math.max(1.5, r * 0.08);
  g.strokeRect(x - s + 1, y - s + 1, 2 * s - 2, 2 * s - 2);
  g.restore();
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
  g.strokeStyle = '#F8FAFC';
  g.lineWidth = lw;
  g.stroke();
  g.restore();
}

export const kugelnFangen: ExerciseDefinition = {
  id: 'kugeln-fangen',
  category: 'reaktion',
  minutes: 1,
  color: '#C8641E',
  showsLevel: true,
  icon:
    '<circle cx="14" cy="13" r="7" fill="currentColor"/><rect x="27" y="22" width="13" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="3.2"/><path d="M14 24v4M33.5 8v6" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" opacity=".5"/><path d="M5 43h38" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-dasharray="6 4.5"/>',
  texts: { de, it },
  create: (ctx) => new KugelnFangen(ctx),
};
