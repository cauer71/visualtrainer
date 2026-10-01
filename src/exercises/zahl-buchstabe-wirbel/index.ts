/**
 * Zahlen-Buchstaben-Wirbel – Zahlen und Buchstaben drehen sich langsam, jedes um einen eigenen,
 * etwas versetzten Mittelpunkt; man tippt sie abwechselnd in aufsteigender Folge an: 1 – A – 2 – B – 3 – C …
 *
 * Abgrenzung zur Zahlenjagd (statische Tafel, einfache Folge): Hier bewegen sich die Zeichen,
 * überlappen teilweise, und die Folge wechselt immer zwischen Zahl und Buchstabe. Das ist das
 * Prinzip des Trail Making Test B (Reitan, 1958), dessen Zeit vor allem am Arbeitsgedächtnis,
 * am Wechsel zwischen den Folgen und am Verarbeitungstempo hängt (Sánchez-Cubillo et al., 2009;
 * Salthouse, 2011). Verdeckung und enge Abstände erschweren die Suche (Crowding; Whitney & Levi, 2011).
 *
 * Bewegung (belegt, Beobachtung des Auftraggebers, der das Original gespielt hat): „Die Zeichen drehen
 * alle um ein Zentrum. Jedes Zentrum ist etwas versetzt; je höher der Schwierigkeitsgrad, desto höher
 * der Versatz (x und y).“ Umsetzung: alle Zeichen mit gleicher Winkelgeschwindigkeit ω und gleicher
 * Richtung, p_i(t) = C + o_i + Rot(ω·t)·(b_i − o_i) (Einzelheiten in logic.ts). Die Position ist eine
 * reine Funktion der Zeit; die Geister-Hand zielt deshalb exakt auf die Stelle, an der das Zeichen
 * beim Tippen stehen wird.
 *
 * ANNAHME (Hypothese): Die Regel des Originals war im Video nicht zu sehen (nur drehende Zahlen 5–14
 * und Buchstaben E–P, kein Antippen). Die abwechselnde Folge ist unsere Vermutung in Anlehnung an
 * Trail Making B; die Texte kennzeichnen das („angelehnt“, „nicht eigens untersucht“). Die Zahlenwerte
 * für Tempo und Versatz sind unsere Festlegung, kein Nachbau des Originals.
 *
 * - Stufe 1–12 (2-down/1-up → ≈ 71 %): Paare 3 → 9 (6 → 18 Zeichen), Versatz der Drehmittelpunkte
 *   ±3 % → ±28 % der Spielfläche (x: Breite, y: Höhe getrennt), eine Umdrehung in 60 s → 20 s
 *   (Stufe 1–2 sehr langsam), Mindestabstand der Zeichen sinkt (ab Stufe 6 darf teilweise überlappt
 *   werden), die Spielfläche wird kleiner. Geschafft = höchstens 1 Fehltipp und Zeit je Zeichen
 *   ≤ 3,6 s − 0,15 s · Stufe (mind. 1,8 s).
 * - Getippte Zeichen bleiben sichtbar (die Suchmenge bleibt gleich), werden aber blass und tragen
 *   einen kleinen Punkt – wie bei der Zahlenjagd, nicht wie im Video (dort ist nichts getippt).
 * - Trefferprüfung bei Überlappung: Liegt das gesuchte Zeichen unter dem Finger, zählt es; sonst
 *   das nächste ungetippte. Fehltipp = weiches ✗ (Form, kein Blitz), ohne Zeitstrafe, zählt aber.
 *   Ein Tipp ins Leere zeigt nur einen blassen Ring und zählt nicht als Fehltipp.
 * - Alles zeitbasiert (virtuelle Zeit), Zufall nur über ctx.rng. „Bewegung reduzieren“ → die Zeichen stehen.
 * - Messung: Zeit von der Anzeige bis zum letzten richtigen Tipp. Wohin man schaut, wird nicht gemessen.
 *   Keine Normwerte; Zeit je Zeichen nur im Vergleich mit früher auf diesem Gerät.
 */
import { circle, fillRR, font, rrPath } from '../../core/draw';
import { Staircase } from '../../core/staircase';
import { clamp, easeOut } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { captionTop, handSize, restPoint } from '../_shared/tippziele';
import { drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import {
  type FieldGeom,
  type Orbit,
  type Rect,
  type RoundRecord,
  MAX_LEVEL,
  MIN_LEVEL,
  PALETTE,
  areaPerCharFor,
  arenaFraction,
  arenaRect,
  buildOrbits,
  fieldGeometry,
  glyphPx,
  hitHalf,
  isLetterAt,
  levelOf,
  nextLevel,
  offsetFracFor,
  omegaFor,
  orbitPos,
  pairsFor,
  pickTap,
  primaryLevel,
  resizeOrbits,
  roundBonus,
  roundSuccess,
  separationFor,
  sequence,
  summarize,
  tapPoints,
  thetaAt,
  tipFor,
  visibleHalf,
} from './logic';
import { de, it } from './texts';

const SESSION_MS = 100_000;
const QUICK_SESSION_MS = 8_000;
/** So weit darf die letzte Runde die Sitzung überziehen; danach wird keine neue begonnen */
const OVERRUN_MS = 25_000;
/** Notbremse (z. B. Tablet weggelegt): danach endet die Sitzung auch mitten in der Runde */
const HARD_CAP_MS = 260_000;
const QUICK_HARD_CAP_MS = 45_000;
const APPEAR_MS = 240;
const CLEAR_MS = 1300;
const DEMO_END_MS = 1500;
const DOUBLE_TAP_MS = 80;
const OK_MS = 650;
const BAD_MS = 900;
const MISS_MS = 520;

const ACCENT = PALETTE.accent;
const INK = PALETTE.ink;
const HALO = 'rgba(245,247,250,0.92)';
const LABEL_INK = PALETTE.label;
const OK_GREEN = PALETTE.ok;
const BAD_AMBER = PALETTE.bad;

interface Params {
  pairs: number;
  /** Winkelgeschwindigkeit in rad/s (gleich für alle Zeichen) */
  omega: number;
  sep: number;
  /** Spielfläche je Zeichen in Vielfachen von F² */
  area: number;
  /** Versatz der Drehmittelpunkte als Anteil der Spielfläche */
  offset: number;
}

/** Intro-Film: leichte, feste Werte (eine Umdrehung in 26 s, mittlerer Versatz, keine Überlappung am Start) */
const DEMO: Params = { pairs: 4, omega: (2 * Math.PI) / 26, sep: 0.9, area: 30, offset: 0.14 };

type Phase = 'play' | 'clear' | 'end' | 'done';

interface Glyph {
  /** Position in der Folge (0 = „1“) */
  k: number;
  label: string;
  x: number;
  y: number;
  hw: number;
  hh: number;
  hx: number;
  hy: number;
  done: boolean;
  /** Zeichenreihenfolge bei Überdeckung (kleiner = weiter unten) */
  z: number;
  /** Kreisbahn: Start b und Drehmittelpunkt c */
  orbit: Orbit;
}

interface Fx {
  kind: 'ok' | 'bad' | 'miss';
  x: number;
  y: number;
  t0: number;
}

let bgCache: { key: string; canvas: HTMLCanvasElement } | null = null;

/** Heller Grund wie im Vorlagevideo: in der Mitte fast weiß, zum Rand ein kühles Hellgrau (gecacht) */
function lightBackground(g: CanvasRenderingContext2D, w: number, h: number, dpr: number): void {
  const key = `${w}x${h}@${dpr}`;
  if (!bgCache || bgCache.key !== key) {
    const cv = document.createElement('canvas');
    cv.width = Math.max(1, Math.round(w * dpr));
    cv.height = Math.max(1, Math.round(h * dpr));
    const c = cv.getContext('2d')!;
    c.scale(dpr, dpr);
    c.fillStyle = PALETTE.bgEdge;
    c.fillRect(0, 0, w, h);
    const grad = c.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.hypot(w, h) / 1.5);
    grad.addColorStop(0, PALETTE.bgCenter);
    grad.addColorStop(1, 'rgba(211,217,226,0)');
    c.fillStyle = grad;
    c.fillRect(0, 0, w, h);
    bgCache = { key, canvas: cv };
  }
  g.drawImage(bgCache.canvas, 0, 0, w, h);
}

class ZahlBuchstabeWirbel implements Exercise {
  private readonly demo: boolean;
  private readonly duration: number;
  private readonly stair: Staircase;
  private phase: Phase = 'play';
  private phaseT = 0;
  private sessionT0 = 0;
  private roundT0 = 0;
  private onset = -1;
  private lastTapT = 0;
  private lastDownT = -1e9;
  private next = 0;
  private roundErrors = 0;
  private roundLevel = 1;
  private steps: number[] = [];
  private cur: Params = DEMO;
  private glyphs: Glyph[] = [];
  /** Zeitpunkt (virtuelle ms), an dem der Drehwinkel 0 war */
  private rotT0 = 0;
  /** Zeit des letzten update() */
  private lastT = 0;
  private geom!: FieldGeom;
  private arena!: Rect;
  private F = 40;
  private fx: Fx[] = [];
  /** Meldung am Rundenende; ersetzt in der Anzeige oben „Als Nächstes:“ */
  private msg: string | null = null;
  private rounds: RoundRecord[] = [];
  private errorsTotal = 0;
  private points = 0;
  // Intro-Film / Autoplay
  private plannedFor = -1;
  private autoAt = 0;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.duration = ctx.quick ? QUICK_SESSION_MS : SESSION_MS;
    const s = Math.round(ctx.startLevel ?? MIN_LEVEL);
    this.stair = new Staircase({ start: clamp(Number.isFinite(s) ? s : MIN_LEVEL, MIN_LEVEL, MAX_LEVEL), min: MIN_LEVEL, max: MAX_LEVEL, down: 2, up: 1 });
  }

  private get level(): number {
    return levelOf(this.stair.level);
  }

  start(t: number): void {
    this.sessionT0 = t;
    this.ctx.hud.setScore(this.demo ? null : 0);
    this.ctx.hud.setProgress(0);
    if (this.demo) {
      const r = restPoint(this.ctx.stage);
      this.ctx.ghost.moveTo(r.x, r.y, { move: 0 });
    }
    this.newRound(t);
  }

  // ------------------------------------------------------------------ Runden

  private params(): Params {
    if (this.demo) return DEMO;
    const L = this.level;
    return {
      pairs: pairsFor(L),
      omega: omegaFor(L),
      sep: separationFor(L),
      area: areaPerCharFor(L),
      offset: offsetFracFor(L),
    };
  }

  /** Spielfeld, Zeichengröße und Spielfläche aus der Live-Bühne (nach dem Drehen neu) */
  private layout(): void {
    const s = this.ctx.stage;
    const m = Math.max(8, s.u * 1.6);
    const bottom = this.demo ? captionTop(s) - handSize(s) * 0.9 - 6 : s.h - m;
    this.geom = fieldGeometry(s.w, s.h, s.u, bottom);
    this.F = glyphPx(s.u);
    const f = this.geom.field;
    this.arena = arenaRect(f, arenaFraction(this.cur.area, 2 * this.cur.pairs, this.F, f.w * f.h));
  }

  /** Drehwinkel zur virtuellen Zeit t (bei „Bewegung reduzieren“ immer 0: die Zeichen stehen) */
  private thetaAtTime(t: number): number {
    return this.ctx.reducedMotion ? 0 : thetaAt(this.cur.omega, Math.max(0, t - this.rotT0));
  }

  private newRound(t: number): void {
    const { ctx } = this;
    const { rng, hud, texts } = ctx;
    this.cur = this.params();
    this.roundLevel = this.demo ? MIN_LEVEL : this.level;
    this.layout();
    const labels = sequence(this.cur.pairs);
    const halves = labels.map((l) => visibleHalf(l, this.F));
    const orbits = buildOrbits(halves, this.roundLevel, this.arena, rng, { sep: this.cur.sep, offsetFrac: this.cur.offset });
    const zs = rng.shuffle(labels.map((_, i) => i));
    this.rotT0 = t;
    this.lastT = t;
    this.glyphs = labels.map((label, k) => {
      const hv = halves[k];
      const hit = hitHalf(hv);
      return { k, label, x: orbits[k].bx, y: orbits[k].by, hw: hv.hw, hh: hv.hh, hx: hit.hx, hy: hit.hy, done: false, z: zs[k], orbit: orbits[k] };
    });
    this.syncGlyphs(t);
    this.next = 0;
    this.roundErrors = 0;
    this.steps = [];
    this.fx = [];
    this.msg = null;
    this.phase = 'play';
    this.phaseT = t;
    this.roundT0 = t;
    this.onset = t;
    this.lastTapT = t;
    this.plannedFor = -1;
    this.autoAt = t + 900;
    if (this.demo) hud.caption(texts.captions.drift);
    else hud.setLabel(`${texts.feedback.level} ${this.level}`);
  }

  /** Zeichen an ihre Stelle auf der Kreisbahn zur Zeit t setzen */
  private syncGlyphs(t: number): void {
    const th = this.thetaAtTime(t);
    for (const g of this.glyphs) {
      const p = orbitPos(g.orbit, th);
      g.x = p.x;
      g.y = p.y;
    }
  }

  /**
   * Nach dem Drehen: Die Zeichen bleiben, wo sie gerade stehen (anteilig umgerechnet); die Bahnen
   * werden in die neue Spielfläche eingepasst, Größen folgen der neuen Zeichengröße.
   */
  resize(): void {
    if (!this.glyphs.length) return;
    const old = this.arena;
    const oldF = this.F;
    const theta = this.thetaAtTime(this.lastT);
    this.layout();
    const k = this.F / oldF;
    for (const g of this.glyphs) {
      g.hw *= k;
      g.hh *= k;
      const hit = hitHalf({ hw: g.hw, hh: g.hh });
      g.hx = hit.hx;
      g.hy = hit.hy;
    }
    const orbits = resizeOrbits(
      this.glyphs.map((g) => g.orbit),
      theta,
      old,
      this.arena,
      this.glyphs,
    );
    this.glyphs.forEach((g, i) => (g.orbit = orbits[i]));
    this.rotT0 = this.lastT;
    this.syncGlyphs(this.lastT);
    this.fx = [];
    if (this.ctx.autoplay) {
      this.ctx.ghost.clear();
      this.plannedFor = -1;
    }
  }

  // ------------------------------------------------------------------ Ablauf

  update(_dt: number, t: number): void {
    if (this.phase === 'done') return;
    const { ctx } = this;
    if (!this.demo) {
      const el = t - this.sessionT0;
      ctx.hud.setProgress(Math.min(1, el / this.duration));
      if (el >= (ctx.quick ? QUICK_HARD_CAP_MS : HARD_CAP_MS)) {
        this.finish();
        return;
      }
    }
    this.lastT = t;
    this.syncGlyphs(t);
    if (this.fx.length) this.fx = this.fx.filter((f) => t - f.t0 < (f.kind === 'ok' ? OK_MS : f.kind === 'bad' ? BAD_MS : MISS_MS));
    switch (this.phase) {
      case 'play':
        if (this.demo) this.demoStep();
        else if (ctx.autoplay) this.autoStep(t);
        break;
      case 'clear':
        if (t - this.phaseT >= CLEAR_MS) this.afterRound(t);
        break;
      case 'end':
        if (t - this.phaseT >= DEMO_END_MS) {
          this.phase = 'done';
          ctx.finish({ primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' }, secondary: [], score: 0, level: MIN_LEVEL });
        }
        break;
      default:
        break;
    }
  }

  // ------------------------------------------------------------------ Eingabe

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'play' || this.onset < 0 || !this.glyphs.length) return;
    // Prellen / zweiter Finger im selben Moment nicht doppelt werten
    if (p.t - this.lastDownT < DOUBLE_TAP_MS) return;
    this.lastDownT = p.t;
    const res = pickTap(this.glyphs, p.x, p.y, this.next);
    switch (res.kind) {
      case 'target':
        this.onTarget(this.glyphs[res.i], p.t);
        break;
      case 'wrong':
        this.onWrong(this.glyphs[res.i], p.t);
        break;
      case 'none':
        this.fx.push({ kind: 'miss', x: p.x, y: p.y, t0: p.t });
        break;
      default:
        break; // schon getipptes Zeichen: ignorieren
    }
  }

  private onTarget(g: Glyph, t: number): void {
    const { ctx } = this;
    g.done = true;
    this.steps.push(Math.max(0, t - this.lastTapT));
    this.lastTapT = t;
    this.next++;
    ctx.sfx.tap();
    this.fx.push({ kind: 'ok', x: g.x, y: g.y - this.F * 0.95, t0: t });
    if (!this.demo) {
      this.points += tapPoints(this.roundLevel);
      ctx.hud.setScore(this.points);
    }
    if (this.demo) this.demoCaptions();
    if (this.next >= this.glyphs.length) this.roundDone(t);
  }

  private onWrong(g: Glyph, t: number): void {
    if (!this.demo) {
      this.roundErrors++;
      this.errorsTotal++;
    }
    this.ctx.sfx.bad();
    this.fx.push({ kind: 'bad', x: g.x, y: g.y, t0: t });
  }

  private roundDone(t: number): void {
    const { ctx } = this;
    const total = Math.max(1, t - this.onset);
    const n = this.glyphs.length;
    ctx.ghost.clear();
    ctx.sfx.good();
    if (this.demo) {
      this.phase = 'end';
      this.phaseT = t;
      this.msg = ctx.texts.feedback.done;
      ctx.ghost.moveTo(restPoint(ctx.stage).x, restPoint(ctx.stage).y, { delay: 300, move: 600 });
      return;
    }
    const level = this.roundLevel;
    const success = roundSuccess(this.roundErrors, total, n, level);
    this.rounds.push({ level, pairs: n / 2, chars: n, ms: total, errors: this.roundErrors, success, steps: this.steps.slice() });
    this.points += roundBonus(level, success);
    ctx.hud.setScore(this.points);
    this.stair.update(success);
    const up = this.level > level;
    this.msg = `${ctx.fmt.time(total / n, 1)} ${ctx.texts.feedback.perChar}${up ? ` · ${ctx.texts.feedback.up}` : ''}`;
    this.phase = 'clear';
    this.phaseT = t;
  }

  private afterRound(t: number): void {
    const el = t - this.sessionT0;
    if (el >= this.duration) {
      this.finish();
      return;
    }
    // Eine Runde, die die Sitzung weit überziehen würde, wird nicht mehr begonnen
    const L = this.level;
    const est = 2 * pairsFor(L) * 1500;
    if (!this.ctx.quick && el + est > this.duration + OVERRUN_MS) {
      this.finish();
      return;
    }
    this.newRound(t);
  }

  private finish(): void {
    const { ctx } = this;
    this.phase = 'done';
    ctx.ghost.clear();
    ctx.sfx.done();
    const s = summarize(this.rounds);
    // Ohne beendete Runde (Notbremse mitten in der ersten Runde): eine Stufe unter der angefangenen
    const lvl = this.rounds.length ? primaryLevel(s) : clamp(this.roundLevel - 1, MIN_LEVEL, MAX_LEVEL);
    ctx.finish({
      primary: { key: 'level', value: lvl, unit: 'level', better: 'higher' },
      secondary: [
        ...(Number.isFinite(s.perCharMs) ? [{ key: 'perChar', value: Math.round(s.perCharMs), unit: 'time' as const }] : []),
        { key: 'errors', value: s.errors, unit: 'count' as const },
        ...(s.lastPairs > 0 ? [{ key: 'pairs', value: s.lastPairs, unit: 'count' as const }] : []),
        ...(Number.isFinite(s.letterGapMs) ? [{ key: 'letterGap', value: Math.round(s.letterGapMs), unit: 'msSigned' as const }] : []),
      ],
      score: this.points,
      level: this.rounds.length ? nextLevel(s) : lvl,
      tip: tipFor(s),
    });
  }

  // ------------------------------------------------------------------ Geister-Hand

  /** Wohin tippen, damit das Zeichen nach `seconds` getroffen wird (exakt aus der Kreisformel) */
  private aim(g: Glyph, seconds: number): { x: number; y: number } {
    return orbitPos(g.orbit, this.thetaAtTime(this.lastT + seconds * 1000));
  }

  private demoCaptions(): void {
    const { hud, texts } = this.ctx;
    if (this.next === 1) hud.caption(texts.captions.alt);
    else if (this.next === 3) hud.caption(texts.captions.next);
    else if (this.next === 5) hud.caption(texts.captions.kept);
    else if (this.next === 7) hud.caption(texts.captions.overlap);
  }

  /** Intro-Film: die Hand tippt 1 – A – 2 – B – … der Reihe nach, dem kreisenden Zeichen voraus */
  private demoStep(): void {
    const { ghost } = this.ctx;
    if (!ghost.idle || this.plannedFor === this.next || this.next >= this.glyphs.length) return;
    this.plannedFor = this.next;
    const g = this.glyphs[this.next];
    const first = this.next === 0;
    const delay = first ? 900 : 140;
    const move = first ? 800 : 640;
    const a = this.aim(g, (delay + move + 40) / 1000);
    ghost.tap(a.x, a.y, { delay, move });
  }

  /** Autoplay (Tests): meist das gesuchte Zeichen, selten ein falsches, mit Suchzeit je nach Menge */
  private autoStep(t: number): void {
    const { ghost, rng } = this.ctx;
    if (!ghost.idle || t < this.autoAt || this.next >= this.glyphs.length) return;
    const remaining = this.glyphs.length - this.next;
    const delay = (260 + 22 * remaining) * rng.range(0.6, 1.4);
    const move = rng.range(260, 420);
    const s = (delay + move + 40) / 1000;
    let target = this.glyphs[this.next];
    if (rng.chance(0.07)) {
      const others = this.glyphs.filter((g) => !g.done && g.k !== this.next);
      if (others.length) target = rng.pick(others);
    }
    let a = this.aim(target, s);
    a = { x: a.x + clamp(rng.normal() * 0.12, -0.3, 0.3) * target.hx, y: a.y + clamp(rng.normal() * 0.12, -0.3, 0.3) * target.hy };
    ghost.tap(a.x, a.y, { delay, move });
    this.autoAt = t + delay + move + 250;
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr } = this.ctx.stage;
    lightBackground(g, w, h, dpr);
    if (!this.glyphs.length) return;
    this.drawGlyphs(g, t);
    this.drawFx(g, t);
    this.drawPill(g, t);
  }

  private drawGlyphs(g: CanvasRenderingContext2D, t: number): void {
    const F = this.F;
    const appear = clamp((t - this.roundT0) / APPEAR_MS, 0, 1);
    // Getippte liegen unten, damit sie nie ein gesuchtes Zeichen verdecken; sonst feste Zufallsreihenfolge
    const order = this.glyphs.slice().sort((p, q) => (p.done === q.done ? p.z - q.z : p.done ? -1 : 1));
    g.save();
    g.font = font(F, 800);
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.lineJoin = 'round';
    for (const q of order) {
      g.globalAlpha = appear * (q.done ? 0.4 : 1);
      g.lineWidth = F * 0.16;
      g.strokeStyle = HALO;
      g.strokeText(q.label, q.x, q.y + F * 0.04);
      g.fillStyle = INK;
      g.fillText(q.label, q.x, q.y + F * 0.04);
      if (q.done) {
        // Kleiner Punkt oben rechts: getippt, das Zeichen selbst bleibt sichtbar
        g.globalAlpha = appear * 0.9;
        const r = Math.max(3.5, F * 0.1);
        circle(g, q.x + q.hw * 0.95 + r * 0.8, q.y - q.hh * 0.95, r, ACCENT);
      }
    }
    g.restore();
  }

  private drawFx(g: CanvasRenderingContext2D, t: number): void {
    const F = this.F;
    for (const f of this.fx) {
      const age = t - f.t0;
      if (f.kind === 'ok') drawSoftCheck(g, f.x, f.y, F * 0.4, markAlpha(age, OK_MS), OK_GREEN);
      else if (f.kind === 'bad') drawSoftCross(g, f.x, f.y, F * 0.36, markAlpha(age, BAD_MS), BAD_AMBER);
      else {
        // Tipp ins Leere: nur ein blasser Ring, zählt nicht als Fehltipp
        g.save();
        g.globalAlpha = 0.5 * markAlpha(age, MISS_MS);
        g.beginPath();
        g.arc(f.x, f.y, Math.max(12, F * 0.4), 0, Math.PI * 2);
        g.strokeStyle = INK;
        g.lineWidth = 2.5;
        g.stroke();
        g.restore();
      }
    }
  }

  /** Anzeige oben: „Als Nächstes: B“ – Zahl im Kreis, Buchstabe im Quadrat (Form, nicht nur Schrift) */
  private drawPill(g: CanvasRenderingContext2D, t: number): void {
    const { w } = this.ctx.stage;
    const P = this.geom.pill;
    const H = P.h;
    const cy = P.y + H / 2;
    const done = this.next >= this.glyphs.length;
    const label = this.msg ?? this.ctx.texts.feedback.next;
    const box = H * 0.86;
    const padL = H * 0.5;
    const gap = H * 0.22;
    const padR = H * 0.28;
    // Schriftgröße der Beschriftung: bei langen Meldungen so weit verkleinern, dass die Anzeige auf die Bühne passt
    let labelPx = Math.round(clamp(H * 0.46, 22, 30));
    g.save();
    g.font = font(labelPx, 700);
    let lw = g.measureText(label).width;
    const maxLw = Math.max(40, w - 2 * P.x - padL - gap - box - padR);
    if (lw > maxLw) {
      labelPx = Math.max(14, Math.floor((labelPx * maxLw) / lw));
      g.font = font(labelPx, 700);
      lw = g.measureText(label).width;
    }
    g.restore();
    const pw = padL + lw + gap + box + padR;
    const x0 = w / 2 - pw / 2;
    fillRR(g, x0, P.y, pw, H, H / 2, 'rgba(255,255,255,0.92)');
    g.save();
    rrPath(g, x0 + 0.75, P.y + 0.75, pw - 1.5, H - 1.5, H / 2);
    g.strokeStyle = 'rgba(38,43,51,0.18)';
    g.lineWidth = 1.5;
    g.stroke();
    g.restore();
    g.save();
    g.font = font(labelPx, 700);
    g.fillStyle = LABEL_INK;
    g.textAlign = 'left';
    g.textBaseline = 'middle';
    g.fillText(label, x0 + padL, cy + 1);
    g.restore();
    const bx = x0 + padL + lw + gap + box / 2;
    const letter = !done && isLetterAt(this.next);
    const fill = done ? OK_GREEN : ACCENT;
    // Kleiner Impuls beim Wechsel der Anzeige (nicht bei „Bewegung reduzieren“)
    const k = this.ctx.reducedMotion ? 1 : easeOut(clamp((t - this.lastTapT) / 200, 0, 1));
    const sc = this.phase === 'play' && this.next > 0 ? 0.92 + 0.08 * k : 1;
    g.save();
    g.translate(bx, cy);
    g.scale(sc, sc);
    if (letter) fillRR(g, -box / 2, -box / 2, box, box, box * 0.22, fill);
    else circle(g, 0, 0, box / 2, fill);
    if (done) {
      g.beginPath();
      g.moveTo(-box * 0.24, box * 0.02);
      g.lineTo(-box * 0.06, box * 0.2);
      g.lineTo(box * 0.26, -box * 0.18);
      g.strokeStyle = '#FFFFFF';
      g.lineWidth = Math.max(3.5, box * 0.1);
      g.lineCap = 'round';
      g.lineJoin = 'round';
      g.stroke();
    } else {
      g.font = font(box * 0.74, 800);
      g.fillStyle = '#FFFFFF';
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.fillText(this.glyphs[this.next].label, 0, box * 0.03);
    }
    g.restore();
  }
}

export const zahlBuchstabeWirbel: ExerciseDefinition = {
  id: 'zahl-buchstabe-wirbel',
  category: 'konzentration',
  minutes: 2,
  color: ACCENT,
  showsLevel: true,
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 17l5-4v17"/><path d="M26 31l6.5-18 6.5 18M28.4 25h8.2"/><path d="M9 38c6 6.5 22 6.5 29-1" stroke-dasharray="1 5.2" opacity=".7"/><path d="M35.5 32.2l3.2 5.3-6 1.4" opacity=".85"/></g>',
  texts: { de, it },
  create: (ctx) => new ZahlBuchstabeWirbel(ctx),
};
