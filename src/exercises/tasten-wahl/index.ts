/**
 * Tasten-Wahl – ein Zeichen erscheint oben, man tippt die gleiche Bildschirmtaste (Wahlreaktion).
 *
 * Vorbild: „Tastatur-Reaktionszeit-Test / Keybind-Trainer“ (Katalog 703). Das Original braucht eine
 * echte Tastatur. Auf dem Tablet bleibt die Kernaufgabe: Reiz–Antwort-Zuordnung mit wachsender Zahl
 * der Alternativen (Hick-Hyman, 2 → 4). Abgrenzung zu „Pfeil-Duell“: dort geht es um räumliche
 * Störung (Pfeilrichtung gegen Platz), hier um das Zuordnen eines Zeichens zu seiner Taste.
 *
 * - Zeichen = Form + Buchstabe (Dreieck A, Quadrat B, Raute C, Kreis D); Farbe nur zusätzlich.
 * - Stufe 1–12 (3-down/1-up ≈ 79 % richtig): 2 → 3 → 4 Tasten, ab Stufe 9 wechseln die Tastenplätze
 *   vor jedem Durchgang (gleiten weich, der Reiz kommt erst nach ≥ 0,7 s Ruhe), Antwortfrist 3,0 → 1,35 s.
 * - Feste Zahl an Durchgängen (keine Zeitstrafe, kein Zeitbonus). Hauptwert = Stufe; dazu Median und
 *   Streuung der Zeiten, Fehler und zu Langsames. Zeit = Reizbeginn (erster gezeichneter Frame) bis
 *   Tipp (Ereigniszeit). Auf dem Touchscreen wird 30–130 ms zu lang gemessen (Pronk et al., 2020).
 * - Zu frühes Tippen (vor dem Reiz oder < 120 ms danach) zählt nicht als Antwort, verschiebt den
 *   nächsten Reiz. Doppeltipps (< 350 ms nach einer Antwort) werden ignoriert.
 * - Tastatur optional: Ziffern 1–4 = A–D. Trefferfläche je Taste ≥ 56 px.
 */
import { background, circle, fillRR, rrPath, triangle } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { captionTop, drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import {
  computeStats,
  deadlineMs,
  DOUBLE_TAP_MS,
  itiMs,
  keyCountFor,
  keyLayout,
  LETTERS,
  levelOf,
  MAX_LEVEL,
  MIN_LEVEL,
  MIN_RT_MS,
  nextStimulus,
  pointsFor,
  shuffleFor,
  slotOrder,
  tipFor,
} from './logic';
import { de, it } from './texts';

const TRIALS = 36;
const QUICK_TRIALS = 6;
const DEMO_DEADLINE_MS = 4500;
const DEMO_ITI_MS = 900;
const MARK_MS = 800;
const FADE_STIM_MS = 160;
const FLASH_MS = 700;
const FB_OK_MS = 420;
const FB_BAD_MS = 900;

/** Farben je Taste (nur zusätzlich zu Form und Buchstabe) */
const KEY_COLORS = ['#5AA9F0', '#F5A524', '#2DD4BF', '#C4A1FF'];
const INK = '#E8EEF7';
const CARD = '#14233B';

interface DemoStep {
  id: number;
  n: number;
  shuffle: boolean;
  caption: string;
}
// Intro-Film: zwei Tasten, dann vier, zuletzt mit vertauschten Plätzen
const DEMO_STEPS: DemoStep[] = [
  { id: 1, n: 2, shuffle: false, caption: 'watch' },
  { id: 0, n: 2, shuffle: false, caption: 'tap' },
  { id: 2, n: 4, shuffle: false, caption: 'more' },
  { id: 3, n: 4, shuffle: true, caption: 'mix' },
];

interface KeyView {
  x: number;
  a: number;
}
interface Flash {
  t0: number;
  kind: 'good' | 'bad' | 'hint';
}
interface Mark {
  x: number;
  y: number;
  t0: number;
  kind: 'bad' | 'good';
}

class TastenWahl implements Exercise {
  private readonly demo: boolean;
  private readonly total: number;
  private readonly stair: Staircase;
  private views: KeyView[] = [];
  private flashes: Array<Flash | null> = [null, null, null, null];
  private marks: Mark[] = [];
  private fade: { id: number; t0: number } | null = null;

  private n = 2;
  private slot: number[] = [0, 1];
  private history: number[] = [];
  private nextId = 0;
  private stimId = -1;
  private stimOn = false;
  private onset = NaN;
  private deadline = 3000;
  private lvlNow = MIN_LEVEL;
  private planned = false;
  private nextStimAt = 0;
  private lastRespT = -1e9;
  private trialsDone = 0;
  private endAt = Infinity;
  private done = false;
  private endT = Infinity;

  private rts: number[] = [];
  private wrong = 0;
  private slow = 0;
  private early = 0;
  private points = 0;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.total = this.demo ? DEMO_STEPS.length : ctx.quick ? QUICK_TRIALS : TRIALS;
    this.stair = new Staircase({ start: ctx.startLevel ?? MIN_LEVEL, min: MIN_LEVEL, max: MAX_LEVEL, down: 3, up: 1 });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private layout() {
    const { w, h, u } = this.ctx.stage;
    return keyLayout(this.n, w, h, u);
  }

  private keyY(size: number): number {
    const s = this.ctx.stage;
    const bottom = this.demo ? captionTop(s) - 12 : s.h - Math.max(14, s.u * 3);
    return bottom - size / 2;
  }

  private slotX(id: number): number {
    const L = this.layout();
    return L.xs[clamp(this.slot[id] ?? id, 0, L.xs.length - 1)];
  }

  private keyCenter(id: number): { x: number; y: number } {
    return { x: this.views[id]?.x ?? this.slotX(id), y: this.keyY(this.layout().size) };
  }

  private level(): number {
    return this.demo ? MIN_LEVEL : levelOf(this.stair.level);
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud } = this.ctx;
    this.prepare();
    this.views = Array.from({ length: 4 }, (_, id) => ({ x: id < this.n ? this.slotX(id) : this.ctx.stage.w / 2, a: id < this.n ? 1 : 0 }));
    this.nextStimAt = t + (this.demo ? 1400 : 1200);
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateLabel();
  }

  /** Tastenzahl, Plätze und nächstes Zeichen festlegen – schon in der Pause, damit die Tasten ruhen, bevor der Reiz kommt */
  private prepare(): void {
    const { rng } = this.ctx;
    if (this.demo) {
      const step = DEMO_STEPS[Math.min(this.trialsDone, DEMO_STEPS.length - 1)];
      this.n = step.n;
      this.slot = slotOrder(rng, step.n, step.shuffle, this.slot.length === step.n ? this.slot : undefined);
      this.nextId = step.id;
      this.lvlNow = MIN_LEVEL;
      if (this.trialsDone === 2) this.ctx.hud.caption(this.ctx.texts.captions.more);
      if (this.trialsDone === 3) this.ctx.hud.caption(this.ctx.texts.captions.mix);
      return;
    }
    const lvl = this.level();
    this.lvlNow = lvl;
    this.n = keyCountFor(lvl);
    this.slot = slotOrder(rng, this.n, shuffleFor(lvl), this.slot.length === this.n ? this.slot : undefined);
    this.nextId = nextStimulus(rng, this.n, this.history);
  }

  update(dt: number, t: number): void {
    if (this.done) return;
    this.animateKeys(dt);
    if (t >= this.endAt) {
      this.finishSession(t);
      return;
    }
    if (!this.stimOn && this.trialsDone < this.total && t >= this.nextStimAt) this.showStimulus();
    if (this.stimOn && !Number.isNaN(this.onset) && t - this.onset >= this.deadline) this.resolve(t, 'slow', -1, this.deadline);
    if (this.ctx.autoplay && this.stimOn && !Number.isNaN(this.onset)) this.autoUpdate();
    this.prune(t);
  }

  /** Tasten gleiten weich auf ihre Plätze (dt-basiert); bei „Bewegung reduzieren“ springen sie */
  private animateKeys(dt: number): void {
    const k = this.ctx.reducedMotion ? 1 : 1 - Math.exp(-dt * 14);
    for (let id = 0; id < 4; id++) {
      const v = this.views[id];
      if (!v) continue;
      const on = id < this.n;
      const tx = on ? this.slotX(id) : v.x;
      v.x += (tx - v.x) * k;
      if (Math.abs(tx - v.x) < 0.3) v.x = tx;
      const ka = this.ctx.reducedMotion ? 1 : 1 - Math.exp(-dt * 10);
      v.a += ((on ? 1 : 0) - v.a) * ka;
      if (Math.abs((on ? 1 : 0) - v.a) < 0.01) v.a = on ? 1 : 0;
    }
  }

  private showStimulus(): void {
    this.stimId = this.nextId;
    this.stimOn = true;
    this.onset = NaN; // wird im ersten gezeichneten Frame gesetzt (render)
    this.planned = false;
    this.deadline = this.demo ? DEMO_DEADLINE_MS : deadlineMs(this.lvlNow);
    this.history.push(this.stimId);
    if (this.history.length > 4) this.history.shift();
    if (this.demo) {
      const step = DEMO_STEPS[Math.min(this.trialsDone, DEMO_STEPS.length - 1)];
      if (step.caption === 'watch' || step.caption === 'tap') this.ctx.hud.caption(this.ctx.texts.captions[step.caption]);
    }
  }

  // --- Autoplay / Intro-Film: die Geister-Hand tippt die Taste ---

  private autoUpdate(): void {
    const { ghost, rng } = this.ctx;
    if (this.planned || !ghost.idle) return;
    this.planned = true;
    let id = this.stimId;
    if (!this.demo) {
      if (rng.chance(0.05)) return; // ausgelassen
      if (rng.chance(0.08) && this.n > 1) id = (id + 1 + rng.int(this.n - 1)) % this.n; // absichtlich daneben
    }
    const c = this.keyCenter(id);
    const size = this.layout().size;
    const jit = this.demo ? 0 : size * 0.08;
    ghost.tap(c.x + rng.normal() * jit, c.y + rng.normal() * jit, {
      delay: this.demo ? 450 : rng.range(120, 260),
      move: this.demo ? 650 : rng.range(250, 380),
    });
  }

  // --- Eingabe ---

  pointerDown(p: PointerInfo): void {
    if (this.done || p.t - this.lastRespT < DOUBLE_TAP_MS) return;
    const L = this.layout();
    const half = Math.max(L.size / 2, 28);
    const y = this.keyY(L.size);
    for (let id = 0; id < this.n; id++) {
      const v = this.views[id];
      if (!v || v.a < 0.5) continue;
      if (Math.abs(p.x - v.x) <= half && Math.abs(p.y - y) <= half) {
        this.answer(id, p.t, p.x, p.y);
        return;
      }
    }
  }

  keyDown(key: string, t: number): void {
    if (this.done || t - this.lastRespT < DOUBLE_TAP_MS) return;
    const id = Number(key) - 1;
    if (!Number.isInteger(id) || id < 0 || id >= this.n) return;
    const c = this.keyCenter(id);
    this.answer(id, t, c.x, c.y);
  }

  private answer(id: number, t: number, x: number, y: number): void {
    if (!this.stimOn || Number.isNaN(this.onset) || t - this.onset < MIN_RT_MS) {
      this.tooEarly(t, x, y);
      return;
    }
    const rt = t - this.onset;
    this.resolve(t, id === this.stimId ? 'hit' : 'wrong', id, rt);
  }

  /** Vor dem Reiz (oder < 120 ms danach) getippt: zählt nicht als Antwort, der nächste Reiz kommt später */
  private tooEarly(t: number, x: number, y: number): void {
    if (this.demo) return;
    this.early++;
    this.lastRespT = t - DOUBLE_TAP_MS + 150;
    if (!this.stimOn) this.nextStimAt = Math.max(this.nextStimAt, t + 700);
    this.marks.push({ x, y, t0: t, kind: 'bad' });
    this.ctx.sfx.tick();
  }

  private resolve(t: number, kind: 'hit' | 'wrong' | 'slow', tapped: number, rt: number): void {
    const { sfx, hud, rng, stage } = this.ctx;
    const L = this.layout();
    const ky = this.keyY(L.size);
    this.stimOn = false;
    this.lastRespT = t;
    this.fade = { id: this.stimId, t0: t };
    const lvl = this.lvlNow;
    if (kind === 'hit') {
      this.rts.push(rt);
      this.points += pointsFor(lvl, rt, this.deadline);
      this.flashes[this.stimId] = { t0: t, kind: 'good' };
      this.marks.push({ x: stage.w / 2, y: this.cardCenterY(), t0: t, kind: 'good' });
      sfx.good();
      if (!this.demo) this.stair.update(true);
    } else {
      if (kind === 'wrong') {
        this.wrong++;
        this.flashes[tapped] = { t0: t, kind: 'bad' };
        this.marks.push({ x: this.keyCenter(tapped).x, y: ky - L.size * 0.62, t0: t, kind: 'bad' });
      } else {
        this.slow++;
        this.marks.push({ x: stage.w / 2, y: this.cardCenterY(), t0: t, kind: 'bad' });
      }
      this.flashes[this.stimId] = { t0: t, kind: 'hint' };
      sfx.bad();
      if (!this.demo) this.stair.update(false);
    }
    this.trialsDone++;
    hud.setProgress(clamp(this.trialsDone / this.total, 0, 1));
    hud.setScore(this.demo ? null : this.points);
    this.updateLabel();
    const fb = kind === 'hit' ? FB_OK_MS : FB_BAD_MS;
    if (this.trialsDone >= this.total) {
      this.endAt = t + fb;
      return;
    }
    this.nextStimAt = t + fb + (this.demo ? DEMO_ITI_MS : itiMs(rng));
    this.prepare();
  }

  private updateLabel(): void {
    if (this.demo) return;
    this.ctx.hud.setLabel(`${this.ctx.texts.feedback.level} ${this.level()}`);
  }

  private prune(t: number): void {
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
    if (this.fade && t - this.fade.t0 > FADE_STIM_MS) this.fade = null;
    for (let i = 0; i < this.flashes.length; i++) {
      const f = this.flashes[i];
      if (f && t - f.t0 > FLASH_MS) this.flashes[i] = null;
    }
  }

  // -------------------------------------------------------------------------

  private finishSession(t: number): void {
    this.done = true;
    this.endT = t;
    this.ctx.hud.setProgress(1);
    const s = computeStats(this.rts, this.wrong, this.slow, this.early);
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' },
        secondary: [{ key: 'hits', value: s.hits, unit: 'count' }],
        score: this.points,
        level: MIN_LEVEL,
      });
      return;
    }
    this.ctx.sfx.done();
    const thr = this.stair.threshold();
    const secondary = [
      ...(Number.isFinite(s.medianMs) ? [{ key: 'median', value: Math.round(s.medianMs), unit: 'time' as const }] : []),
      ...(s.hits >= 2 ? [{ key: 'spread', value: Math.round(s.sdMs), unit: 'ms' as const }] : []),
      { key: 'wrong', value: s.wrong, unit: 'count' as const },
      { key: 'slow', value: s.slow, unit: 'count' as const },
    ];
    this.ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), MIN_LEVEL, MAX_LEVEL), unit: 'level', better: 'higher' },
      secondary,
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip: tipFor(s),
    });
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  private cardGeom(): { cx: number; cy: number; s: number } {
    const { w, u } = this.ctx.stage;
    const L = this.layout();
    const top = Math.max(44, this.ctx.stage.u * 8);
    const keysTop = this.keyY(L.size) - L.size / 2;
    const s = clamp(Math.min(keysTop - top - 18, w * 0.5, u * 34), 70, 260);
    return { cx: w / 2, cy: (top + keysTop) / 2, s };
  }

  private cardCenterY(): number {
    return this.cardGeom().cy;
  }

  render(g: CanvasRenderingContext2D, now: number): void {
    const t = Math.min(now, this.endT);
    const { w, h, dpr, u } = this.ctx.stage;
    background(g, w, h, dpr);
    // Reizbeginn = erster gezeichneter Frame
    if (this.stimOn && Number.isNaN(this.onset)) this.onset = t;

    const geo = this.cardGeom();
    if (this.stimOn) this.drawCard(g, geo, this.stimId, 1);
    else if (this.fade) this.drawCard(g, geo, this.fade.id, 1 - clamp((t - this.fade.t0) / FADE_STIM_MS, 0, 1));
    else this.drawEmptyCard(g, geo);

    const L = this.layout();
    const ky = this.keyY(L.size);
    for (let id = 0; id < 4; id++) {
      const v = this.views[id];
      if (!v || v.a <= 0.01) continue;
      this.drawKey(g, id, v, ky, L.size, t);
    }
    for (const m of this.marks) {
      const a = markAlpha(t - m.t0, MARK_MS);
      const s = Math.max(10, u * 2.4);
      if (m.kind === 'bad') drawSoftCross(g, m.x, m.y, s, a);
      else drawSoftCheck(g, m.x, m.y, s * 1.1, a);
    }
  }

  private drawEmptyCard(g: CanvasRenderingContext2D, geo: { cx: number; cy: number; s: number }): void {
    g.save();
    rrPath(g, geo.cx - geo.s / 2, geo.cy - geo.s / 2, geo.s, geo.s, geo.s * 0.14);
    g.setLineDash([8, 8]);
    g.strokeStyle = 'rgba(232,238,247,0.22)';
    g.lineWidth = 2;
    g.stroke();
    g.restore();
  }

  private drawCard(g: CanvasRenderingContext2D, geo: { cx: number; cy: number; s: number }, id: number, alpha: number): void {
    if (alpha <= 0.01) return;
    g.save();
    g.globalAlpha = alpha;
    fillRR(g, geo.cx - geo.s / 2, geo.cy - geo.s / 2, geo.s, geo.s, geo.s * 0.14, CARD);
    rrPath(g, geo.cx - geo.s / 2, geo.cy - geo.s / 2, geo.s, geo.s, geo.s * 0.14);
    g.strokeStyle = KEY_COLORS[id];
    g.lineWidth = Math.max(3, geo.s * 0.03);
    g.stroke();
    drawShape(g, id, geo.cx, geo.cy - geo.s * 0.1, geo.s * 0.27, INK);
    this.letter(g, LETTERS[id], geo.cx, geo.cy + geo.s * 0.3, geo.s * 0.22);
    g.restore();
  }

  private letter(g: CanvasRenderingContext2D, s: string, x: number, y: number, size: number): void {
    g.font = `800 ${Math.round(size)}px system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillStyle = INK;
    g.fillText(s, x, y);
  }

  private drawKey(g: CanvasRenderingContext2D, id: number, v: KeyView, ky: number, size: number, t: number): void {
    const x = v.x - size / 2;
    const y = ky - size / 2;
    const fl = this.flashes[id];
    const fk = fl ? clamp(1 - (t - fl.t0) / FLASH_MS, 0, 1) : 0;
    g.save();
    g.globalAlpha = v.a;
    fillRR(g, x, y, size, size, size * 0.16, fl && fl.kind === 'good' ? `rgba(34,197,94,${0.25 + 0.3 * fk})` : CARD);
    rrPath(g, x, y, size, size, size * 0.16);
    g.strokeStyle = KEY_COLORS[id];
    g.lineWidth = Math.max(3, size * 0.035);
    g.stroke();
    if (fl && fl.kind === 'hint') {
      // richtige Taste nach einem Fehler: gestrichelter heller Rahmen (Form, nicht nur Farbe)
      rrPath(g, x - 5, y - 5, size + 10, size + 10, size * 0.2);
      g.setLineDash([9, 7]);
      g.strokeStyle = `rgba(232,238,247,${0.35 + 0.6 * fk})`;
      g.lineWidth = 3;
      g.stroke();
      g.setLineDash([]);
    }
    if (fl && fl.kind === 'bad') {
      rrPath(g, x + 2, y + 2, size - 4, size - 4, size * 0.14);
      g.strokeStyle = `rgba(251,191,36,${0.3 + 0.6 * fk})`;
      g.lineWidth = 3;
      g.stroke();
    }
    drawShape(g, id, v.x, ky - size * 0.1, size * 0.2, INK);
    this.letter(g, LETTERS[id], v.x, ky + size * 0.3, size * 0.2);
    // Ziffer für die optionale Tastatur (klein, zurückhaltend)
    g.font = `700 ${Math.max(11, Math.round(size * 0.13))}px system-ui, sans-serif`;
    g.textAlign = 'left';
    g.textBaseline = 'top';
    g.fillStyle = 'rgba(232,238,247,0.45)';
    g.fillText(String(id + 1), x + size * 0.09, y + size * 0.07);
    g.restore();
  }
}

/** Formen: 0 Dreieck, 1 Quadrat, 2 Raute, 3 Kreis (Kreis und Raute gefüllt, Stern nicht benutzt) */
function drawShape(g: CanvasRenderingContext2D, id: number, cx: number, cy: number, r: number, color: string): void {
  switch (id) {
    case 0:
      triangle(g, cx, cy - r * 0.1, r * 1.15, color);
      break;
    case 1:
      g.fillStyle = color;
      g.fillRect(cx - r * 0.85, cy - r * 0.85, r * 1.7, r * 1.7);
      break;
    case 2:
      g.beginPath();
      g.moveTo(cx, cy - r * 1.2);
      g.lineTo(cx + r * 1.0, cy);
      g.lineTo(cx, cy + r * 1.2);
      g.lineTo(cx - r * 1.0, cy);
      g.closePath();
      g.fillStyle = color;
      g.fill();
      break;
    default:
      circle(g, cx, cy, r * 0.95, color);
  }
}

export const tastenWahl: ExerciseDefinition = {
  id: 'tasten-wahl',
  category: 'reaktion',
  minutes: 2,
  color: '#C8641E',
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"><rect x="5" y="27" width="16" height="16" rx="4"/><rect x="27" y="27" width="16" height="16" rx="4"/></g><path d="M13 31.5l4 7h-8z" fill="currentColor"/><circle cx="35" cy="35" r="4.2" fill="currentColor"/><path d="M24 5l7 10H17z" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/><path d="M24 19v5" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new TastenWahl(ctx),
};
