/**
 * Blitzblick – Mitte und Rand in einem kurzen Moment erfassen (nach dem UFOV-Prinzip).
 *
 * Ersetzt das „Entropic Grid“ des Vorbilds. Aufbau wie beim „Useful Field of View“:
 * Fixation → Reiz (Auto/Lkw in der Mitte + Stern an einer von 8 Randpositionen, ab Stufe 9
 * zusätzlich 23 Dreiecke als Ablenker) → Maske (Blockrauschen) → zwei Antworten
 * (Fahrzeug + Sternposition). Richtig nur, wenn beides stimmt (Ratewahrscheinlichkeit 1/16).
 *
 * - Eine Schwierigkeitsskala, Stufe 1–20: L1–8 ohne Ablenker D = 500 · 0,75^(L−1) ms (500 … 67),
 *   L9–20 mit Ablenkern D = 500 · 0,75^(L−9) ms (500 … ≈ 21 ms ≈ 1 Bild).
 * - Darbietung in ganzen Bildern: Bildrate aus den rAF-Zeitstempeln (Median), Anzahl Bilder
 *   = round(D / Bilddauer), mindestens 1. Die tatsächliche Dauer wird protokolliert; weicht sie
 *   um mehr als 1 Bild von D ab (Ruckler), zählt der Durchgang nicht für die Treppe.
 * - Gewichtete Treppe (Kaernbach 1991): richtig → 1 Stufe schwerer, falsch → 3 Stufen leichter
 *   → ≈ 75 % richtig.
 * - Maske mit mittlerer Helligkeit nahe dem Hintergrund, kein Streifenmuster, sanftes Ausblenden.
 */
import { background, button, C, car, circle, fillRR, font, glow, hit, ring, rrPath, star, text, triangle, truck, withAlpha, type Rect } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, median } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo, StageInfo } from '../../core/types';
import { de, it } from './texts';

const TRIALS = 18;
const QUICK_TRIALS = 2;
const FIX_MS = 600;
const FIRST_FIX_MS = 900;
const HINT_FIX_MS = 1800;
const MASK_MS = 300;
const MASK_FADE_MS = 80;
const FEEDBACK_MS = 900;
const MAX_LEVEL = 20;
/** Stufen ohne Ablenker */
const PLAIN_LEVELS = 8;
/** Größte Exzentrizität der Randpositionen (≈ 10° bei 40 cm) */
const MAX_RADIUS = 380;
const BOX_FILL = '#15253D';

/** Soll-Darbietungsdauer (ms) einer Stufe */
function levelDuration(level: number): number {
  return level <= PLAIN_LEVELS ? 500 * 0.75 ** (level - 1) : 500 * 0.75 ** (level - PLAIN_LEVELS - 1);
}

type Vehicle = 0 | 1; // 0 = Auto, 1 = Lastwagen
type Phase = 'fix' | 'stim' | 'mask' | 'resp' | 'feedback' | 'done';
type RingName = 'outer' | 'mid' | 'inner';

interface Trial {
  level: number;
  vehicle: Vehicle;
  /** Randposition 0–7 (k · 45°, 0 = rechts, im Uhrzeigersinn) */
  pos: number;
  distract: boolean;
  /** Soll-Dauer (ms) */
  dur: number;
  /** geplante Anzahl Bilder */
  frames: number;
  /** tatsächliche Darbietungsdauer (ms) */
  shown: number;
  /** false = Ruckler, zählt nicht für die Treppe */
  valid: boolean;
  centerOk: boolean;
  edgeOk: boolean;
}

interface Layout {
  cx: number;
  cy: number;
  /** Kantenlänge der Mittelbox */
  box: number;
  rx: number;
  ry: number;
  /** Radius der runden Antwortfelder am Rand */
  tr: number;
  /** Radius von Stern und Dreiecken */
  item: number;
  /** Breite des Fahrzeugs */
  vw: number;
  btnW: number;
  btnH: number;
  gap: number;
}

/** Platz, den die Bildunterschrift im Intro-Film unten braucht (wie im Runner berechnet) */
function captionReserve(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return size * 2.1 + s.h * 0.05 + Math.max(6, s.u * 1.5);
}

function vehicle(g: CanvasRenderingContext2D, v: Vehicle, x: number, y: number, s: number, color: string, hub: string): void {
  if (v === 0) car(g, x, y, s, color, hub);
  else truck(g, x, y, s, color, hub);
}

/** Runder Haken/Kreuz – Rückmeldung nicht nur über die Farbe */
function badge(g: CanvasRenderingContext2D, x: number, y: number, r: number, ok: boolean): void {
  circle(g, x, y, r + 2, C.bg);
  circle(g, x, y, r, ok ? C.good : C.bad);
  g.save();
  g.strokeStyle = C.white;
  g.lineWidth = Math.max(2, r * 0.3);
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.beginPath();
  if (ok) {
    g.moveTo(x - r * 0.45, y + r * 0.02);
    g.lineTo(x - r * 0.1, y + r * 0.36);
    g.lineTo(x + r * 0.48, y - r * 0.34);
  } else {
    const k = r * 0.36;
    g.moveTo(x - k, y - k);
    g.lineTo(x + k, y + k);
    g.moveTo(x + k, y - k);
    g.lineTo(x - k, y + k);
  }
  g.stroke();
  g.restore();
}

// ---------------------------------------------------------------------------

class Blitzblick implements Exercise {
  private readonly stair: Staircase;
  private phase: Phase = 'fix';
  private phaseT = 0;
  private fixMs = FIRST_FIX_MS;
  private idx = 0;
  private trial: Trial | null = null;
  private done: Trial[] = [];
  private stimT0 = 0;
  private period = 1000 / 60;
  private choiceC: Vehicle | null = null;
  private choiceE: number | null = null;
  private posBag: number[] = [];
  private vehBag: Vehicle[] = [];
  private lastPos = -1;
  private mask: HTMLCanvasElement | null = null;
  private frameIv: number[] = [];
  private lastFrameT = -1;
  private hintShown = false;
  private ghostPlanned = false;
  private correct = 0;
  private score = 0;

  constructor(private readonly ctx: ExerciseContext) {
    // gewichtet auf ≈ 75 % richtig: richtig → +1, falsch → −3
    this.stair = new Staircase({ start: ctx.startLevel ?? 3, min: 1, max: MAX_LEVEL, down: 1, up: 1, stepHarder: 1, stepEasier: 3 });
  }

  private get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  private get total(): number {
    if (this.demo) return 2;
    return this.ctx.quick ? QUICK_TRIALS : TRIALS;
  }

  start(t: number): void {
    const { hud } = this.ctx;
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.newTrial(t);
    if (this.demo) {
      // Hand aus dem Bild in eine ruhige Ecke
      const p = this.restPos();
      this.ctx.ghost.moveTo(p.x, p.y, { move: 1 });
    }
  }

  // ------------------------------------------------------------------ Layout

  private layout(): Layout {
    const s = this.ctx.stage;
    const { w, u } = s;
    const h = Math.max(40, s.h - (this.demo ? captionReserve(s) : 0));
    // Im Film wird nichts wirklich angetippt: Mindestgrößen dürfen dort mit kleinen Bühnen schrumpfen
    const k = this.demo ? Math.min(1, u / 4.3) : 1;
    const tr = Math.max(28 * k, u * 4.4);
    const item = Math.max(12 * k, u * 3.5);
    const pad = Math.max(tr, item) + Math.max(6, u * 1.5);
    const rx = Math.max(0, Math.min(0.4 * w, w / 2 - pad, MAX_RADIUS));
    const ry = Math.max(0, Math.min(0.38 * h, h / 2 - pad, MAX_RADIUS));
    let box = clamp(u * 18, 90 * k, 150);
    // Innerer Ablenkerring darf die Box nicht berühren
    if (!this.demo) box = Math.min(box, Math.max(64, 2 * (0.55 * Math.min(rx, ry) - item * 1.05 - 4)));
    const btnH = clamp(box * 0.72, 72 * k, 112);
    return {
      cx: w / 2,
      cy: h / 2,
      box,
      rx,
      ry,
      tr,
      item,
      vw: Math.min(box * 0.8, clamp(box * 0.52, 62 * k, 78)),
      btnW: clamp(btnH * 1.3, 84 * k, 150),
      btnH,
      gap: Math.max(12 * k, u * 2.4),
    };
  }

  /** Position auf einem der drei Ringe (mittlerer Ring um 22,5° versetzt) */
  private spot(L: Layout, name: RingName, k: number): { x: number; y: number } {
    const f = name === 'outer' ? 1 : name === 'mid' ? 0.775 : 0.55;
    const a = (k * Math.PI) / 4 + (name === 'mid' ? Math.PI / 8 : 0);
    return { x: L.cx + L.rx * f * Math.cos(a), y: L.cy + L.ry * f * Math.sin(a) };
  }

  private buttons(L: Layout): [Rect, Rect] {
    const y = L.cy - L.btnH / 2;
    return [
      { x: L.cx - L.gap / 2 - L.btnW, y, w: L.btnW, h: L.btnH },
      { x: L.cx + L.gap / 2, y, w: L.btnW, h: L.btnH },
    ];
  }

  /** Ruheplatz der Hand im Film: rechts zwischen den Randfeldern, nicht auf der Bildunterschrift */
  private restPos(): { x: number; y: number } {
    const L = this.layout();
    return { x: L.cx + L.rx, y: L.cy + Math.max(L.ry * 0.5, L.tr + 8) };
  }

  resize(): void {
    // Positionen werden bei jedem Bild aus der Bühne berechnet; nur die Maske neu erzeugen
    if (this.trial) this.buildMask();
  }

  // ------------------------------------------------------------------ Ablauf

  private drawVehicle(): Vehicle {
    if (!this.vehBag.length) this.vehBag = this.ctx.rng.shuffle<Vehicle>([0, 0, 0, 1, 1, 1]);
    return this.vehBag.pop()!;
  }

  /** Jede Randposition gleich oft, nie zweimal hintereinander dieselbe */
  private drawPos(): number {
    if (!this.posBag.length) this.posBag = this.ctx.rng.shuffle([0, 1, 2, 3, 4, 5, 6, 7]);
    let p = this.posBag.pop()!;
    if (p === this.lastPos && this.posBag.length) {
      const q = this.posBag.pop()!;
      this.posBag.unshift(p);
      p = q;
    }
    this.lastPos = p;
    return p;
  }

  private newTrial(t: number): void {
    const { ctx } = this;
    const demo = this.demo;
    const level = demo ? 1 : clamp(Math.floor(this.stair.level + 1e-9), 1, MAX_LEVEL);
    const distract = !demo && level > PLAIN_LEVELS;
    this.trial = {
      level,
      // Film: Auto + Stern oben links, dann Lastwagen + Stern oben rechts (die Hand kreuzt so keinen Knopf)
      vehicle: demo ? (this.idx === 0 ? 0 : 1) : this.drawVehicle(),
      pos: demo ? (this.idx === 0 ? 5 : 7) : this.drawPos(),
      distract,
      dur: demo ? (this.idx === 0 ? 900 : 700) : levelDuration(level),
      frames: 0,
      shown: 0,
      valid: true,
      centerOk: false,
      edgeOk: false,
    };
    this.choiceC = null;
    this.choiceE = null;
    this.ghostPlanned = false;
    this.phase = 'fix';
    this.phaseT = t;
    this.fixMs = this.idx === 0 ? (demo ? 1300 : FIRST_FIX_MS) : demo ? 1000 : FIX_MS;
    if (distract && !this.hintShown) {
      // Erster Durchgang mit Ablenkern: kurz ankündigen (vor dem Reiz wieder weg)
      this.hintShown = true;
      this.fixMs = HINT_FIX_MS;
      const L = this.layout();
      ctx.hud.toast(ctx.texts.feedback.distract, 'info', { x: L.cx, y: L.cy - L.box * 0.95, ms: HINT_FIX_MS - 300, size: clamp(ctx.stage.u * 4, 16, 30) });
    }
    this.buildMask();
    if (demo) ctx.hud.caption(this.idx === 0 ? ctx.texts.captions.look : ctx.texts.captions.again);
    else ctx.hud.setLabel(`${ctx.texts.feedback.level} ${level}`);
  }

  /** Bilddauer aus den letzten rAF-Abständen (Median) */
  private measurePeriod(): number {
    if (this.frameIv.length < 5) return 1000 / 60;
    return clamp(median(this.frameIv), 4, 50);
  }

  update(_dt: number, t: number): void {
    if (this.lastFrameT >= 0) {
      const iv = t - this.lastFrameT;
      if (iv > 3 && iv < 70) {
        this.frameIv.push(iv);
        if (this.frameIv.length > 90) this.frameIv.shift();
      }
    }
    this.lastFrameT = t;
    const tr = this.trial;
    if (!tr) return;
    switch (this.phase) {
      case 'fix':
        if (t - this.phaseT >= this.fixMs) {
          // Reizbeginn = dieses Bild (render folgt im selben Frame)
          this.period = this.measurePeriod();
          tr.frames = Math.max(1, Math.round(tr.dur / this.period));
          this.stimT0 = t;
          this.phase = 'stim';
          this.phaseT = t;
          if (this.demo && this.idx === 0) this.ctx.hud.caption(this.ctx.texts.captions.what);
        }
        break;
      case 'stim':
        // Bilder über die Zeitstempel zählen: Ende, sobald „frames“ Bilder vergangen sind
        if (t - this.stimT0 >= (tr.frames - 0.5) * this.period) {
          tr.shown = t - this.stimT0;
          tr.valid = Math.abs(tr.shown - tr.dur) <= this.period + 1;
          this.phase = 'mask';
          this.phaseT = t;
        }
        break;
      case 'mask':
        if (t - this.phaseT >= MASK_MS) {
          this.phase = 'resp';
          this.phaseT = t;
          if (this.demo && this.idx === 1) this.ctx.hud.caption(this.ctx.texts.captions.what);
        }
        break;
      case 'resp':
        if (this.ctx.autoplay && !this.ghostPlanned) this.planGhost();
        break;
      case 'feedback':
        if (t - this.phaseT >= FEEDBACK_MS) {
          this.idx++;
          this.ctx.hud.setProgress(this.idx / this.total);
          if (this.idx >= this.total) this.finish();
          else this.newTrial(t);
        }
        break;
      default:
        break;
    }
  }

  private planGhost(): void {
    const { ghost, rng } = this.ctx;
    const tr = this.trial!;
    this.ghostPlanned = true;
    const L = this.layout();
    const btn = this.buttons(L);
    if (this.demo) {
      const b = btn[tr.vehicle];
      const bx = b.x + b.w / 2;
      const by = b.y + b.h / 2;
      const q = this.spot(L, 'outer', tr.pos);
      const rest = this.restPos();
      // von unten an den Knopf heran, damit die Hand nicht über den anderen Knopf fährt
      ghost.moveTo(bx, b.y + b.h + Math.max(L.tr * 0.8, 14), { delay: 450, move: 600 });
      ghost.tap(bx, by, { delay: 80, move: 280 });
      ghost.tap(q.x, q.y, { delay: 300, move: 650 });
      // zurück zur Ruhestelle – um die Knöpfe herum
      if (q.x < L.cx) ghost.moveTo(L.cx - L.rx * 0.45, L.cy + L.ry * 0.8, { delay: 450, move: 550 });
      ghost.moveTo(rest.x, rest.y, { delay: q.x < L.cx ? 0 : 450, move: 600 });
      return;
    }
    // Spielmodus (nur Tests): meist richtig, manchmal falsch
    ghost.clear();
    const v: Vehicle = rng.chance(0.9) ? tr.vehicle : ((1 - tr.vehicle) as Vehicle);
    const pos = rng.chance(Math.max(0.5, 0.92 - 0.02 * tr.level)) ? tr.pos : (tr.pos + 1 + rng.int(7)) % 8;
    const b = btn[v];
    const q = this.spot(L, 'outer', pos);
    ghost.tap(b.x + b.w / 2, b.y + b.h / 2, { delay: rng.range(250, 600), move: 300 });
    ghost.tap(q.x, q.y, { delay: rng.range(150, 400), move: 350 });
  }

  // ------------------------------------------------------------------ Eingabe

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'resp' || !this.trial) return;
    const L = this.layout();
    const btn = this.buttons(L);
    for (let i = 0; i < 2; i++) {
      if (hit(btn[i], p.x, p.y, 6)) {
        if (this.choiceC !== i) this.ctx.sfx.tap();
        this.choiceC = i as Vehicle;
        this.checkDone(p.t);
        return;
      }
    }
    let best = -1;
    let bestD = Infinity;
    for (let k = 0; k < 8; k++) {
      const q = this.spot(L, 'outer', k);
      const d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < bestD) {
        bestD = d;
        best = k;
      }
    }
    if (best >= 0 && bestD <= Math.max(L.tr + 12, 36)) {
      if (this.choiceE !== best) this.ctx.sfx.tap();
      this.choiceE = best;
      this.checkDone(p.t);
    }
  }

  /** Beide Antworten gegeben (Reihenfolge egal) → auswerten */
  private checkDone(t: number): void {
    if (this.choiceC === null || this.choiceE === null) return;
    const { ctx } = this;
    const tr = this.trial!;
    tr.centerOk = this.choiceC === tr.vehicle;
    tr.edgeOk = this.choiceE === tr.pos;
    const ok = tr.centerOk && tr.edgeOk;
    if (!this.demo) {
      // Ruckler: normales Feedback, aber nicht für die Treppe werten
      if (tr.valid) this.stair.update(ok);
      this.done.push(tr);
      if (ok) {
        this.correct++;
        this.score += 10 + 3 * (tr.level - 1);
      }
      ctx.hud.setScore(this.correct);
    }
    if (ok) ctx.sfx.good();
    else ctx.sfx.bad();
    const L = this.layout();
    ctx.hud.toast(ok ? ctx.texts.feedback.right : ctx.texts.feedback.wrong, ok ? 'good' : 'bad', {
      x: L.cx,
      y: L.cy - L.btnH / 2 - clamp(ctx.stage.u * 5, 22, 40),
      ms: FEEDBACK_MS,
      size: clamp(ctx.stage.u * 5, 18, 40),
    });
    this.phase = 'feedback';
    this.phaseT = t;
  }

  // ------------------------------------------------------------------ Maske

  /** Blockrauschen: zufällige helle und dunkle Blöcke in drei Größen, einmal pro Durchgang vorberechnet */
  private buildMask(): void {
    const { w, h, u } = this.ctx.stage;
    if (typeof document === 'undefined') return;
    if (!this.mask) this.mask = document.createElement('canvas');
    const cv = this.mask;
    // Auflösung = CSS-Pixel (Rauschen braucht keine Retina-Schärfe; spart Speicher)
    const W = Math.max(1, Math.round(w));
    const H = Math.max(1, Math.round(h));
    if (cv.width !== W) cv.width = W;
    if (cv.height !== H) cv.height = H;
    const c = cv.getContext('2d');
    if (!c) return;
    const { rng } = this.ctx;
    c.setTransform(W / w, 0, 0, H / h, 0, 0);
    c.clearRect(0, 0, w, h);
    const unit = Math.max(3, u);
    const L = this.layout();
    // Nur der Bereich, in dem Reize erscheinen (Ellipse bis knapp über den äußeren Ring)
    const ex = L.rx + L.tr + unit * 2;
    const ey = L.ry + L.tr + unit * 2;
    const inside = (x: number, y: number) => ((x - L.cx) / ex) ** 2 + ((y - L.cy) / ey) ** 2 <= 1;
    // gedämpfte Grautöne: mittlere Helligkeit bleibt nahe am Hintergrund
    const tones = ['rgba(214,224,238,0.5)', 'rgba(160,176,200,0.42)', 'rgba(112,130,158,0.42)', 'rgba(0,0,0,0.4)'];
    const layers = [
      { s: unit * 3.4, p: 0.1 },
      { s: unit * 1.9, p: 0.12 },
      { s: unit * 1.05, p: 0.15 },
    ];
    for (const ly of layers) {
      const ox = rng.range(-ly.s, 0);
      const oy = rng.range(-ly.s, 0);
      const cols = Math.ceil((w - ox) / ly.s);
      const rows = Math.ceil((h - oy) / ly.s);
      for (let r = 0; r < rows; r++) {
        for (let q = 0; q < cols; q++) {
          const x = ox + q * ly.s;
          const y = oy + r * ly.s;
          if (rng.next() > ly.p || !inside(x + ly.s / 2, y + ly.s / 2)) continue;
          c.fillStyle = tones[rng.int(tones.length)];
          c.fillRect(x, y, ly.s * (rng.chance(0.3) ? 2 : 1), ly.s * (rng.chance(0.3) ? 2 : 1));
        }
      }
    }
    // Die Reizorte (Mitte + alle Ringpositionen) zusätzlich sicher abdecken
    const spots = [{ x: L.cx, y: L.cy, r: L.box * 0.5 }];
    for (let k = 0; k < 8; k++) {
      for (const name of ['outer', 'mid', 'inner'] as const) spots.push({ ...this.spot(L, name, k), r: L.item * 1.4 });
    }
    const s = unit * 1.3;
    for (const sp of spots) {
      const n = Math.round(((sp.r * sp.r) / (s * s)) * 1.1);
      for (let i = 0; i < n; i++) {
        c.fillStyle = tones[rng.int(3)];
        c.fillRect(sp.x + rng.range(-sp.r, sp.r) - s / 2, sp.y + rng.range(-sp.r, sp.r) - s / 2, s * (rng.chance(0.4) ? 2 : 1), s);
      }
    }
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    const tr = this.trial;
    if (!tr) return;
    const L = this.layout();
    switch (this.phase) {
      case 'fix':
        this.drawBox(g, L);
        this.drawCross(g, L);
        break;
      case 'stim':
        this.drawBox(g, L);
        this.drawStimulus(g, L, tr);
        break;
      case 'mask':
        this.drawBox(g, L);
        this.drawMask(g, t);
        break;
      default:
        this.drawAnswer(g, L, tr);
        break;
    }
  }

  private drawBox(g: CanvasRenderingContext2D, L: Layout): void {
    const x = L.cx - L.box / 2;
    const y = L.cy - L.box / 2;
    const r = L.box * 0.16;
    fillRR(g, x, y, L.box, L.box, r, BOX_FILL);
    g.save();
    rrPath(g, x + 0.75, y + 0.75, L.box - 1.5, L.box - 1.5, r);
    g.strokeStyle = 'rgba(255,255,255,0.16)';
    g.lineWidth = 1.5;
    g.stroke();
    g.restore();
  }

  private drawCross(g: CanvasRenderingContext2D, L: Layout): void {
    const { u } = this.ctx.stage;
    const arm = Math.max(6, u * 1.4);
    g.save();
    g.strokeStyle = C.fg;
    g.globalAlpha = 0.9;
    g.lineWidth = Math.max(2, u * 0.4);
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(L.cx - arm, L.cy);
    g.lineTo(L.cx + arm, L.cy);
    g.moveTo(L.cx, L.cy - arm);
    g.lineTo(L.cx, L.cy + arm);
    g.stroke();
    g.restore();
  }

  private drawStimulus(g: CanvasRenderingContext2D, L: Layout, tr: Trial): void {
    vehicle(g, tr.vehicle, L.cx, L.cy, L.vw, C.white, BOX_FILL);
    const tri = L.item * 0.92;
    if (tr.distract) {
      for (let k = 0; k < 8; k++) {
        if (k !== tr.pos) {
          const o = this.spot(L, 'outer', k);
          triangle(g, o.x, o.y, tri, C.white);
        }
        const m = this.spot(L, 'mid', k);
        triangle(g, m.x, m.y, tri, C.white);
        const i = this.spot(L, 'inner', k);
        triangle(g, i.x, i.y, tri, C.white);
      }
    }
    const s = this.spot(L, 'outer', tr.pos);
    star(g, s.x, s.y, L.item, C.white);
  }

  private drawMask(g: CanvasRenderingContext2D, t: number): void {
    if (!this.mask) return;
    const { w, h } = this.ctx.stage;
    const left = MASK_MS - (t - this.phaseT);
    g.save();
    g.globalAlpha = clamp(left / MASK_FADE_MS, 0, 1);
    g.imageSmoothingEnabled = false;
    g.drawImage(this.mask, 0, 0, w, h);
    g.restore();
  }

  private drawAnswer(g: CanvasRenderingContext2D, L: Layout, tr: Trial): void {
    const { u } = this.ctx.stage;
    const fb = this.phase === 'feedback' || this.phase === 'done';
    const lw = Math.max(2.5, u * 0.45);
    const badgeR = Math.max(11, u * 1.9);
    if (fb && tr.centerOk && tr.edgeOk) glow(g, L.cx, L.cy, L.btnH * 0.8, C.good, 0.35);

    // Fahrzeug-Knöpfe
    const btn = this.buttons(L);
    for (let i = 0; i < 2; i++) {
      const r = btn[i];
      const chosen = this.choiceC === i;
      const state = fb ? (chosen ? (tr.centerOk ? 'good' : 'bad') : 'normal') : chosen ? 'active' : 'normal';
      button(g, r, state);
      if (!fb && chosen) {
        g.save();
        rrPath(g, r.x - 1, r.y - 1, r.w + 2, r.h + 2, Math.min(r.w, r.h) * 0.22 + 1);
        g.strokeStyle = C.white;
        g.lineWidth = 3;
        g.stroke();
        g.restore();
      }
      if (fb && !chosen && i === tr.vehicle) {
        // richtige Lösung zeigen
        g.save();
        rrPath(g, r.x - 2, r.y - 2, r.w + 4, r.h + 4, Math.min(r.w, r.h) * 0.22 + 2);
        g.strokeStyle = C.good;
        g.lineWidth = 4;
        g.stroke();
        g.restore();
      }
      const hub = fb && chosen ? (tr.centerOk ? '#1E7A43' : '#8E2A2A') : chosen ? '#3A4A63' : '#243349';
      vehicle(g, i as Vehicle, r.x + r.w / 2, r.y + r.h / 2 + r.h * 0.02, Math.min(r.w * 0.66, r.h * 1.1), C.white, hub);
      if (fb && chosen) badge(g, r.x + r.w - badgeR * 0.4, r.y + badgeR * 0.4, badgeR, tr.centerOk);
    }

    // Antwortfelder am Rand
    for (let k = 0; k < 8; k++) {
      const q = this.spot(L, 'outer', k);
      const chosen = this.choiceE === k;
      if (fb) {
        if (k === tr.pos) {
          circle(g, q.x, q.y, L.tr, withAlpha(C.good, 0.3));
          ring(g, q.x, q.y, L.tr, C.good, lw + 1.5);
          star(g, q.x, q.y, L.item * 0.85, C.white);
          if (chosen) badge(g, q.x + L.tr * 0.72, q.y - L.tr * 0.72, badgeR, true);
        } else if (chosen) {
          circle(g, q.x, q.y, L.tr, withAlpha(C.bad, 0.26));
          ring(g, q.x, q.y, L.tr, C.bad, lw + 1.5);
          badge(g, q.x + L.tr * 0.72, q.y - L.tr * 0.72, badgeR, false);
        } else {
          ring(g, q.x, q.y, L.tr, 'rgba(255,255,255,0.22)', lw);
        }
      } else if (chosen) {
        circle(g, q.x, q.y, L.tr, 'rgba(255,255,255,0.2)');
        ring(g, q.x, q.y, L.tr, C.white, lw + 1.5);
        star(g, q.x, q.y, L.item * 0.8, 'rgba(255,255,255,0.92)');
      } else {
        circle(g, q.x, q.y, L.tr, 'rgba(255,255,255,0.05)');
        ring(g, q.x, q.y, L.tr, 'rgba(255,255,255,0.5)', lw);
      }
    }

    // Kurzer Hinweis in den ersten Durchgängen (im Film übernimmt das die Bildunterschrift)
    if (!fb && !this.demo && this.idx < 3) {
      const { texts } = this.ctx;
      const msg = this.choiceC !== null ? texts.feedback.askEdge : this.choiceE !== null ? texts.feedback.askCenter : texts.feedback.ask;
      const size = clamp(u * 3.2, 14, 22);
      const top = L.cy - L.ry - L.tr;
      const y = top > size * 2.2 ? top / 2 : L.cy + L.btnH / 2 + size * 1.6;
      g.save();
      g.font = font(size, 700);
      const fits = g.measureText(msg).width < this.ctx.stage.w - 24;
      g.restore();
      if (fits) text(g, msg, L.cx, y, size, C.dim, { weight: 700 });
    }
  }

  // ------------------------------------------------------------------ Ergebnis

  private finish(): void {
    const { ctx } = this;
    this.phase = 'done';
    ctx.ghost.clear();
    if (this.demo) {
      ctx.finish({ primary: { key: 'level', value: 1, unit: 'level', better: 'higher' }, secondary: [], score: 0, level: 1 });
      return;
    }
    const n = this.done.length;
    const pct = (k: number) => (n ? Math.round((100 * k) / n) : 0);
    const acc = pct(this.correct);
    const cen = pct(this.done.filter((d) => d.centerOk).length);
    const edg = pct(this.done.filter((d) => d.edgeOk).length);
    const thr = this.stair.threshold();
    const last = [...this.done].reverse().find((d) => d.valid) ?? this.done[n - 1];
    let tip = 'great';
    if (edg < cen - 20) tip = 'wide';
    else if (cen < edg - 20) tip = 'center';
    ctx.sfx.done();
    ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), 1, MAX_LEVEL), unit: 'level', better: 'higher' },
      secondary: [
        { key: 'accuracy', value: acc, unit: 'percent' },
        { key: 'center', value: cen, unit: 'percent' },
        { key: 'edge', value: edg, unit: 'percent' },
        ...(last ? [{ key: 'viewTime', value: Math.round(last.shown), unit: 'ms' as const }] : []),
      ],
      score: this.score,
      level: nextStartLevel(thr, 1, MAX_LEVEL),
      tip,
    });
  }
}

export const blitzblick: ExerciseDefinition = {
  id: 'blitzblick',
  category: 'wahrnehmung',
  minutes: 2,
  color: '#8C6D4A',
  showsLevel: true,
  icon:
    '<rect x="16" y="16" width="16" height="16" rx="3.5" fill="none" stroke="currentColor" stroke-width="3.2"/><circle cx="24" cy="24" r="2.6" fill="currentColor"/><g fill="currentColor" opacity=".45"><circle cx="42" cy="24" r="2.4"/><circle cx="36.7" cy="36.7" r="2.4"/><circle cx="24" cy="42" r="2.4"/><circle cx="11.3" cy="36.7" r="2.4"/><circle cx="6" cy="24" r="2.4"/><circle cx="11.3" cy="11.3" r="2.4"/><circle cx="24" cy="6" r="2.4"/></g><path d="M36.7 4.4 38.4 8.9 43.3 9.2 39.5 12.2 40.8 16.9 36.7 14.3 32.6 16.9 33.9 12.2 30.1 9.2 35 8.9Z" fill="currentColor"/>',
  texts: { de, it },
  create: (ctx) => new Blitzblick(ctx),
};
