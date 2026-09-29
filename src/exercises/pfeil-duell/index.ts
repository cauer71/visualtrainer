/**
 * Pfeil-Duell – Pfeilrichtung antippen, Platz und Nachbarn ignorieren (Interferenzkontrolle).
 *
 * Ersetzt Farbwort-Stroop und Wahlreaktion des Vorbilds: farbfrei, sprachfrei (DE/IT identisch),
 * mit kongruenten UND inkongruenten Durchgängen und frame-genauer Reaktionszeit
 * (docs/wissenschaft/04-konzentration-und-denken.md, Abschnitte 1.2.2, 1.4 und 2.4).
 *
 * Stufenleiter (eine durchgehende Stufe 1–24, höher = schwerer):
 *   1–5   zwei Richtungen (←/→), Pfeil links oder rechts der Mitte (räumlicher Stroop), 2 Tasten
 *   6–10  vier Diagonalen, Pfeil in einer von 4 Ecken um die Mitte, 4 Ecktasten (Hick: 2 → 4)
 *   11–15 Nachbar-Pfeile (Flanker): Mittelpfeil zwischen gleich oder entgegengesetzt zeigenden
 *   16–24 gemischt (mal Platz, mal Nachbarn)
 * Innerhalb einer Leiter-Sprosse wird die Antwortfrist kürzer (× 0,88 je Stufe, 2.000 → 500 ms).
 * Die Stufe folgt einem gewichteten Up-Down (Kaernbach 1991): richtig in der Frist +0,25,
 * falsch/zu langsam −1 → pendelt sich bei ≈ 80 % richtig ein. Damit die Tasten an einer
 * Sprossen-Grenze nicht hin- und herspringen, geht es erst eine Sprosse zurück, wenn man mehr als
 * eine Stufe unter deren Beginn fällt (Hysterese).
 *
 * Ablauf je Durchgang: Fixationskreuz 500 ms → Pfeil bis zur Antwort bzw. Frist → 500 ms Pause
 * (nach Fehlern +300 ms). 50 % kongruent (Achter-Beutel), höchstens 3 gleiche Kongruenz in Folge,
 * keine direkte Wiederholung von Richtung oder Platz (bei 2 Richtungen: kein identischer Reiz und
 * höchstens 2 gleiche Antworten in Folge – ein striktes Wiederholungsverbot wäre dort reines
 * Abwechseln und damit vorhersagbar).
 * Antworten < 150 ms nach Reizbeginn gelten als geraten und werden nicht gewertet.
 * Kennwerte: Stufe (Schwelle aus den Umkehrpunkten), Treffsicherheit, Median-RT (nur richtige),
 * Interferenz = Median-RT inkongruent − kongruent.
 */
import { background, button, type ButtonState, C, circle, font, hit, type Rect, rrPath } from '../../core/draw';
import type { Rng } from '../../core/rng';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut, median } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, Metric, PointerInfo, StageInfo } from '../../core/types';
import { de, it } from './texts';

const SESSION_MS = 66000;
const QUICK_MS = 7000;
const FIX_MS = 500;
const PAUSE_MS = 500;
/** Nach Fehlern etwas länger, damit man die richtige Taste sehen kann */
const ERROR_EXTRA = 300;
/** Schneller kann niemand eine Wahl treffen → geraten */
const ANTICIPATION_MS = 150;
/** Tipps kurz nach einer Antwort (Doppel-Tipp) werden ignoriert */
const GRACE_MS = 250;
const BANNER_MS = 1700;
const DEADLINE_MIN = 400;
const DEADLINE_MAX = 2000;
const DEADLINE_FACTOR = 0.88;
const LEVEL_MIN = 1;
const LEVEL_MAX = 24;
/** Zwei Pfeiltasten gelten als „gleichzeitig“, wenn sie so kurz nacheinander kommen (↑ + ← = ↖) */
const CHORD_MS = 220;
const DEMO_DEADLINE = 4000;
/** Intro-Film: etwas ruhigerer Takt, damit man mitlesen kann */
const DEMO_FIX = 750;
const DEMO_PAUSE = 750;

const INK = '#F1F5F9';
const ACCENT = '#C4A5DE';

type Kind = 'spatial' | 'flanker';
type Phase = 'banner' | 'fix' | 'stim' | 'fb' | 'done';

interface StageDef {
  /** erste Stufe dieser Sprosse */
  start: number;
  dirs: 2 | 4;
  kinds: Kind[];
  /** Frist in ms auf der ersten Stufe der Sprosse */
  base: number;
}

const STAGES: StageDef[] = [
  { start: 1, dirs: 2, kinds: ['spatial'], base: 2000 },
  { start: 6, dirs: 4, kinds: ['spatial'], base: 1800 },
  { start: 11, dirs: 4, kinds: ['flanker'], base: 1600 },
  { start: 16, dirs: 4, kinds: ['spatial', 'flanker'], base: 1400 },
];

/**
 * Richtungen/Plätze/Tasten:
 *  2 Richtungen: 0 = links, 1 = rechts
 *  4 Richtungen: 0 = oben links, 1 = oben rechts, 2 = unten links, 3 = unten rechts
 */
const ANGLES: Record<2 | 4, number[]> = {
  2: [Math.PI, 0],
  4: [(-3 * Math.PI) / 4, -Math.PI / 4, (3 * Math.PI) / 4, Math.PI / 4],
};

interface Trial {
  kind: Kind;
  n: 2 | 4;
  dir: number;
  /** Platz (nur räumlich): gleiche Kodierung wie dir; −1 = Mitte */
  pos: number;
  congruent: boolean;
  /** nur Intro-Film */
  caption?: string;
}

interface LogEntry {
  ok: boolean;
  timeout: boolean;
  rt: number;
  congruent: boolean;
}

interface Feedback {
  chosen: number;
  correct: number;
  ok: boolean;
  t0: number;
}

interface Layout {
  key: string;
  /** 4 Tastenplätze (oben links, oben rechts, unten links, unten rechts) */
  slots: Rect[];
  /** Tasten für 2 Richtungen (je linke/rechte Spalte zusammengefasst) */
  pair: Rect[];
  cx: number;
  cy: number;
  /** Breite der freien Mitte (zwischen bzw. über den Tasten) */
  zw: number;
  /** Pfeillänge */
  a: number;
  off2: number;
  off4: number;
  rest: { x: number; y: number };
}

/** Frist für eine Stufe (innerhalb der jeweiligen Sprosse) */
export function deadlineMs(stage: number, level: number): number {
  const S = STAGES[stage];
  const k = Math.floor(level + 1e-9) - S.start;
  return clamp(S.base * Math.pow(DEADLINE_FACTOR, k), DEADLINE_MIN, DEADLINE_MAX);
}

/** Sprosse ohne Hysterese (Sitzungsbeginn) */
function stageOf(level: number): number {
  const L = Math.floor(level + 1e-9);
  let s = 0;
  while (s + 1 < STAGES.length && L >= STAGES[s + 1].start) s++;
  return s;
}

/** Sprosse mit Hysterese: zurück erst, wenn man mehr als eine Stufe unter deren Beginn fällt */
function stageWithHysteresis(level: number, cur: number): number {
  const L = Math.floor(level + 1e-9);
  let s = cur;
  while (s + 1 < STAGES.length && L >= STAGES[s + 1].start) s++;
  while (s > 0 && L < STAGES[s].start - 1) s--;
  return s;
}

/** Unterkante der Bildunterschrift oben im Intro-Film (gleiche Formel wie im Runner) */
function captionBottom(s: StageInfo): number {
  return s.h * 0.05 + clamp(s.u * 4.6, 14, 30) * 2.1;
}

// ---------------------------------------------------------------------------
// Reihenfolge

/**
 * Erzeugt Durchgänge nacheinander: 50 % kongruent (Beutel aus 4 + 4), höchstens 3 gleiche
 * Kongruenz in Folge, keine direkte Wiederholung von Richtung oder Platz.
 */
export class TrialMaker {
  private bag: boolean[] = [];
  private lastC: boolean | null = null;
  private runC = 0;
  private sameDirRun = 0;
  last: Trial | null = null;

  constructor(private rng: Rng) {}

  private nextCongruent(): boolean {
    if (!this.bag.length) this.bag = this.rng.shuffle([true, true, true, true, false, false, false, false]);
    if (this.runC >= 3 && this.bag[0] === this.lastC) {
      const j = this.bag.findIndex((c) => c !== this.lastC);
      if (j < 0) return !this.lastC; // Beutel hat nur noch die gleiche Sorte → ausnahmsweise erzwingen
      [this.bag[0], this.bag[j]] = [this.bag[j], this.bag[0]];
    }
    return this.bag.shift()!;
  }

  /** forced: Kongruenz vorgeben (Wiederholung nach geratener Antwort, Beutel bleibt unberührt) */
  make(stage: number, forced?: { kind: Kind; congruent: boolean }): Trial {
    const S = STAGES[stage];
    const rng = this.rng;
    const kind: Kind = forced ? forced.kind : S.kinds.length > 1 ? rng.pick(S.kinds) : S.kinds[0];
    const congruent = forced ? forced.congruent : this.nextCongruent();
    const n = S.dirs;
    const prev = this.last && this.last.n === n ? this.last : null;
    const all = n === 2 ? [0, 1] : [0, 1, 2, 3];
    let dirs = all;
    if (prev) {
      if (n === 4) {
        dirs = all.filter((d) => d !== prev.dir && !(kind === 'spatial' && congruent && d === prev.pos));
      } else {
        // 2 Richtungen: kein identischer Reiz, höchstens 2 gleiche Antworten in Folge
        dirs = all.filter((d) => !(d === prev.dir && (this.sameDirRun >= 2 || (kind === prev.kind && congruent === prev.congruent))));
      }
      if (!dirs.length) dirs = all.filter((d) => d !== prev.dir);
    }
    const dir = rng.pick(dirs);
    let pos = -1;
    if (kind === 'spatial') {
      if (congruent) pos = dir;
      else if (n === 2) pos = 1 - dir;
      else {
        let cand = all.filter((p) => p !== dir && !(prev && prev.kind === 'spatial' && p === prev.pos));
        if (!cand.length) cand = all.filter((p) => p !== dir);
        pos = rng.pick(cand);
      }
    }
    return { kind, n, dir, pos, congruent };
  }

  /** Durchgang abgeschlossen → zählt für die Wiederholungsregeln */
  commit(tr: Trial): void {
    this.sameDirRun = this.last && this.last.n === tr.n && this.last.dir === tr.dir ? this.sameDirRun + 1 : 1;
    this.runC = this.lastC === tr.congruent ? this.runC + 1 : 1;
    this.lastC = tr.congruent;
    this.last = tr;
  }
}

// ---------------------------------------------------------------------------
// Zeichnen

/** Pfeil mit Spitze in Richtung ang (Mittelpunkt x/y, Gesamtlänge len) */
function drawArrow(g: CanvasRenderingContext2D, x: number, y: number, len: number, ang: number, color: string, alpha = 1): void {
  const hl = len * 0.46;
  const hw = len * 0.31;
  const sw = len * 0.095;
  const tip = len / 2;
  g.save();
  g.translate(x, y);
  g.rotate(ang);
  g.globalAlpha = alpha;
  g.beginPath();
  g.moveTo(tip, 0);
  g.lineTo(tip - hl, -hw);
  g.lineTo(tip - hl, -sw);
  g.lineTo(-tip, -sw);
  g.lineTo(-tip, sw);
  g.lineTo(tip - hl, sw);
  g.lineTo(tip - hl, hw);
  g.closePath();
  g.fillStyle = color;
  g.fill();
  g.lineJoin = 'round';
  g.lineWidth = Math.max(1.5, len * 0.05);
  g.strokeStyle = color;
  g.stroke();
  g.restore();
}

/** Kleines weißes Abzeichen mit ✓ (grün) oder ✗ (rot) – Form zusätzlich zur Farbe */
function drawBadge(g: CanvasRenderingContext2D, cx: number, cy: number, rad: number, kind: 'ok' | 'bad'): void {
  circle(g, cx, cy, rad, '#FFFFFF');
  g.save();
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.lineWidth = Math.max(2, rad * 0.3);
  g.strokeStyle = kind === 'ok' ? '#15803D' : '#B91C1C';
  g.beginPath();
  if (kind === 'ok') {
    g.moveTo(cx - rad * 0.45, cy + rad * 0.02);
    g.lineTo(cx - rad * 0.1, cy + rad * 0.38);
    g.lineTo(cx + rad * 0.48, cy - rad * 0.36);
  } else {
    const q = rad * 0.38;
    g.moveTo(cx - q, cy - q);
    g.lineTo(cx + q, cy + q);
    g.moveTo(cx + q, cy - q);
    g.lineTo(cx - q, cy + q);
  }
  g.stroke();
  g.restore();
}

function fitText(g: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, color: string, maxW: number, weight = 800): void {
  g.save();
  g.font = font(size, weight);
  g.fillStyle = color;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(s, x, y, maxW);
  g.restore();
}

// ---------------------------------------------------------------------------

class PfeilDuell implements Exercise {
  private readonly demo: boolean;
  private readonly stair: Staircase;
  private readonly maker: TrialMaker;
  private readonly duration: number;
  private stage: number;
  private phase: Phase = 'fix';
  private phaseEnd = 0;
  private t0 = 0;
  private trial: Trial;
  private onset = 0;
  private deadline = DEADLINE_MAX;
  private trialLevel = 1;
  private lastAnswer = -1e9;
  private lastEarlyToast = -1e9;
  private fb: Feedback | null = null;
  private bannerKey: string | null = null;
  private bannerDown = false;
  private doneAt = 0;
  private finished = false;
  private lay: Layout | null = null;
  private pendingKey: { key: string; t: number } | null = null;
  // Auswertung
  private log: LogEntry[] = [];
  private early = 0;
  private points = 0;
  // Intro-Film
  private demoTrials: Trial[] = [];
  private demoIdx = 0;
  private autoPlanned = false;

  constructor(private ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.duration = ctx.quick ? QUICK_MS : SESSION_MS;
    const start = this.demo ? 1 : clamp(ctx.startLevel ?? 1, LEVEL_MIN, LEVEL_MAX);
    this.stair = new Staircase({
      start,
      min: LEVEL_MIN,
      max: LEVEL_MAX,
      down: 1,
      up: 1,
      stepHarder: 0.25,
      stepEasier: 1,
      // Große Anfangsschritte nur beim allerersten Mal – sonst kostet ein früher Fehler gleich 2 Stufen
      initialBoost: ctx.startLevel === null ? 2 : 1,
    });
    this.stage = stageOf(start);
    this.maker = new TrialMaker(ctx.rng);
    // Platzhalter – der erste echte Durchgang wird nach dem Einblenden der Sprosse erzeugt
    this.trial = { kind: 'spatial', n: STAGES[this.stage].dirs, dir: 0, pos: 0, congruent: true };
  }

  start(t: number): void {
    const { hud } = this.ctx;
    this.t0 = t;
    if (this.demo) {
      this.demoTrials = [
        { kind: 'spatial', n: 2, dir: 1, pos: 1, congruent: true, caption: 'dir' },
        { kind: 'spatial', n: 2, dir: 0, pos: 1, congruent: false, caption: 'place' },
        { kind: 'spatial', n: 2, dir: 1, pos: 0, congruent: false, caption: 'place' },
        { kind: 'flanker', n: 4, dir: 1, pos: -1, congruent: false, caption: 'flank' },
      ];
      this.trial = this.demoTrials[0];
      hud.setScore(null);
      hud.caption(this.ctx.texts.captions.dir, 'top');
      this.toFix(t + 1100);
    } else {
      hud.setScore(0);
      // Zu Beginn kurz zeigen, worum es auf dieser Sprosse geht
      this.showBanner(t, false);
    }
    this.updateHud(t);
    if (this.ctx.autoplay) {
      const L = this.layout();
      this.ctx.ghost.moveTo(L.rest.x, L.rest.y, { move: 450 });
    }
  }

  // --- Geometrie ---

  private layout(): Layout {
    const st = this.ctx.stage;
    const { w, h, u } = st;
    const key = `${w}x${h}`;
    if (this.lay && this.lay.key === key) return this.lay;
    const land = w >= h * 1.15;
    const m = clamp(u * 2.4, 10, 24);
    const gap = clamp(u * 2, 10, 20);
    const top = this.demo ? captionBottom(st) + 4 : 0;
    // Tasten ≥ 80 px (≈ 15 mm auf dem Tablet), auf großen Bildschirmen bis 150 px
    let B = clamp(u * 17, 80, 150);
    let slots: Rect[];
    let zx: number;
    let zy: number;
    let zw: number;
    let zh: number;
    let rest: { x: number; y: number };
    if (land) {
      // Quer: je zwei Tasten links und rechts, auf halber Höhe – gut mit beiden Daumen erreichbar
      B = Math.max(56, Math.min(B, (h - top - 2 * m - gap) / 2));
      const midY = (top + h) / 2;
      const yT = midY - gap / 2 - B;
      const yB = midY + gap / 2;
      const xR = w - m - B;
      slots = [
        { x: m, y: yT, w: B, h: B },
        { x: xR, y: yT, w: B, h: B },
        { x: m, y: yB, w: B, h: B },
        { x: xR, y: yB, w: B, h: B },
      ];
      zx = m + B + m;
      zw = w - 2 * zx;
      zy = top;
      zh = h - top;
    } else {
      // Hoch: 2 × 2 Tasten unten, links und rechts
      const bw = Math.min(B * 1.6, (w - 2 * m - gap) / 2);
      const yB = h - m - B;
      const yT = yB - gap - B;
      slots = [
        { x: m, y: yT, w: bw, h: B },
        { x: w - m - bw, y: yT, w: bw, h: B },
        { x: m, y: yB, w: bw, h: B },
        { x: w - m - bw, y: yB, w: bw, h: B },
      ];
      zx = 0;
      zw = w;
      zy = top;
      zh = yT - m - top;
    }
    const pair: Rect[] = [0, 1].map((i) => {
      const a = slots[i];
      const b = slots[i + 2];
      return { x: a.x, y: a.y, w: a.w, h: b.y + b.h - a.y };
    });
    const cx = zx + zw / 2;
    const cy = zy + zh / 2;
    // Pfeil ≥ 54 px (≈ 1,5° bei 40 cm); muss mit Platz-Versatz bzw. Nachbar-Reihe in die Mitte passen
    const a = Math.max(36, Math.min(clamp(u * 11, 54, 130), zw / 5.2, zh / 3.4));
    const off2 = a * 1.25;
    const off4 = a * 0.95;
    const hs = clamp(u * 13, 48, 110);
    if (land) rest = { x: cx + a * 0.4, y: Math.min(h - hs * 0.95, cy + off4 + a * 1.25) };
    else rest = { x: w / 2, y: slots[2].y + B * 0.15 };
    this.lay = { key, slots, pair, cx, cy, zw, a, off2, off4, rest };
    return this.lay;
  }

  resize(): void {
    this.lay = null;
  }

  /** Aktuelle Anzahl Richtungen (bestimmt die Tasten) */
  private nDirs(): 2 | 4 {
    if (this.phase === 'banner') return STAGES[this.stage].dirs;
    return this.trial.n;
  }

  private buttons(): Rect[] {
    const L = this.layout();
    return this.nDirs() === 2 ? L.pair : L.slots;
  }

  private btnCenter(i: number): { x: number; y: number } {
    const R = this.buttons()[i];
    return { x: R.x + R.w / 2, y: R.y + R.h / 2 };
  }

  private toastY(): number {
    const L = this.layout();
    const top = this.demo ? captionBottom(this.ctx.stage) : 0;
    return Math.max(top + L.a * 0.4, L.cy - L.off4 - L.a * 1.05);
  }

  private updateHud(t: number): void {
    const { hud, texts } = this.ctx;
    if (this.demo) {
      hud.setProgress(this.demoIdx / Math.max(1, this.demoTrials.length));
      return;
    }
    hud.setProgress(clamp((t - this.t0) / this.duration, 0, 1));
    hud.setScore(this.points);
    hud.setLabel(`${texts.feedback.level} ${Math.max(1, Math.floor(this.stair.level + 1e-9))}`);
  }

  // --- Ablauf ---

  private showBanner(t: number, down: boolean): void {
    this.phase = 'banner';
    this.bannerKey = `stage${this.stage + 1}`;
    this.bannerDown = down;
    this.phaseEnd = t + (this.ctx.quick ? 900 : BANNER_MS);
  }

  private toFix(until: number): void {
    this.phase = 'fix';
    this.phaseEnd = until;
    this.autoPlanned = false;
  }

  update(_dt: number, t: number): void {
    if (this.phase === 'banner') {
      if (t >= this.phaseEnd) {
        this.trial = this.maker.make(this.stage);
        this.toFix(t + FIX_MS);
      }
    } else if (this.phase === 'fix') {
      if (t >= this.phaseEnd) this.showStimulus(t);
    } else if (this.phase === 'stim') {
      if (t - this.onset >= this.deadline) this.timeout(this.onset + this.deadline);
    } else if (this.phase === 'fb') {
      if (t >= this.phaseEnd) this.next(t);
    } else if (this.phase === 'done' && !this.finished && t >= this.doneAt) {
      this.finish();
      return;
    }
    if (!this.demo) this.ctx.hud.setProgress(clamp((t - this.t0) / this.duration, 0, 1));
    if (this.ctx.autoplay) this.autoplay();
  }

  private showStimulus(t: number): void {
    this.phase = 'stim';
    // Reizbeginn = Zeit des Frames, in dem der Pfeil zum ersten Mal gezeichnet wird
    this.onset = t;
    this.trialLevel = this.stair.level;
    this.deadline = this.demo ? DEMO_DEADLINE : deadlineMs(this.stage, this.trialLevel);
    this.autoPlanned = false;
  }

  private answer(btn: number, t: number): void {
    const tr = this.trial;
    const rt = t - this.onset;
    const ok = btn === tr.dir;
    this.log.push({ ok, timeout: false, rt, congruent: tr.congruent });
    const { sfx, hud, texts } = this.ctx;
    if (ok) {
      sfx.good();
      this.points += 10 + Math.floor(this.trialLevel + 1e-9);
    } else {
      sfx.bad();
      hud.toast(texts.feedback.wrong, 'bad', { y: this.toastY(), ms: 900 });
    }
    this.endTrial(ok, btn, t);
  }

  private timeout(t: number): void {
    this.log.push({ ok: false, timeout: true, rt: NaN, congruent: this.trial.congruent });
    this.ctx.sfx.bad();
    this.ctx.hud.toast(this.ctx.texts.feedback.slow, 'bad', { y: this.toastY(), ms: 900 });
    this.endTrial(false, -1, t);
  }

  private endTrial(ok: boolean, chosen: number, t: number): void {
    if (!this.demo) this.stair.update(ok);
    this.maker.commit(this.trial);
    this.fb = { chosen, correct: this.trial.dir, ok, t0: t };
    this.lastAnswer = t;
    this.phase = 'fb';
    this.phaseEnd = t + (this.demo ? DEMO_PAUSE : PAUSE_MS) + (ok ? 0 : ERROR_EXTRA);
    // Geplante Tipps der Test-Hand gehören zum alten Durchgang
    if (!this.demo) this.ctx.ghost.clear();
    this.updateHud(t);
  }

  private next(t: number): void {
    if (this.demo) {
      this.demoIdx++;
      this.updateHud(t);
      if (this.demoIdx >= this.demoTrials.length) {
        this.phase = 'done';
        this.doneAt = t + 900;
        return;
      }
      this.trial = this.demoTrials[this.demoIdx];
      const cap = this.trial.caption;
      if (cap) this.ctx.hud.caption(this.ctx.texts.captions[cap], 'top');
      // Vor dem Wechsel auf vier Tasten etwas länger Zeit zum Lesen
      this.toFix(t + (this.trial.n === 4 ? 1700 : DEMO_FIX));
      return;
    }
    if (t - this.t0 >= this.duration) {
      this.phase = 'done';
      this.doneAt = t + 600;
      return;
    }
    const s = stageWithHysteresis(this.stair.level, this.stage);
    if (s !== this.stage) {
      const down = s < this.stage;
      this.stage = s;
      this.ctx.ghost.clear();
      if (!down) this.ctx.sfx.go();
      this.showBanner(t, down);
      return;
    }
    this.trial = this.maker.make(this.stage);
    this.toFix(t + FIX_MS);
  }

  /** Tipp/Taste vor dem Pfeil oder < 150 ms danach: nicht werten, kurz Bescheid geben */
  private tooEarly(t: number): void {
    this.early++;
    if (t - this.lastEarlyToast > 600) {
      this.lastEarlyToast = t;
      const u = this.ctx.stage.u;
      this.ctx.hud.toast(this.ctx.texts.feedback.early, 'info', { y: this.toastY(), ms: 750, size: clamp(u * 3.8, 16, 32) });
    }
    if (this.phase === 'stim') {
      // Geratener Durchgang: neuer Pfeil mit gleicher Art/Kongruenz, Stufe bleibt
      this.trial = this.maker.make(this.stage, { kind: this.trial.kind, congruent: this.trial.congruent });
      this.ctx.ghost.clear();
      this.toFix(t + FIX_MS + 300);
    } else {
      this.phaseEnd = Math.max(this.phaseEnd, t + 400);
    }
  }

  private respond(btn: number, t: number): void {
    if (this.phase === 'fix') {
      if (t - this.lastAnswer < PAUSE_MS + GRACE_MS) return;
      this.tooEarly(t);
      return;
    }
    if (this.phase !== 'stim') return;
    const rt = t - this.onset;
    if (rt > this.deadline) {
      // Die Frist war schon abgelaufen, der Frame kam nur noch nicht dran
      this.timeout(this.onset + this.deadline);
      return;
    }
    if (rt < ANTICIPATION_MS) {
      this.tooEarly(t);
      return;
    }
    this.answer(btn, t);
  }

  pointerDown(p: PointerInfo): void {
    const btns = this.buttons();
    for (let i = 0; i < btns.length; i++) {
      if (hit(btns[i], p.x, p.y, 6)) {
        this.respond(i, p.t);
        return;
      }
    }
  }

  /**
   * Tastatur: 2 Richtungen ← / → (oder 4 / 6);
   * 4 Richtungen: zwei Pfeiltasten zusammen (↑ + ← = ↖ …) oder Ziffernblock 7 / 9 / 1 / 3.
   */
  keyDown(key: string, t: number): void {
    if (this.nDirs() === 2) {
      const m: Record<string, number> = { ArrowLeft: 0, ArrowRight: 1, '4': 0, '6': 1, '7': 0, '1': 0, '9': 1, '3': 1 };
      if (key in m) this.respond(m[key], t);
      return;
    }
    const num: Record<string, number> = { '7': 0, '9': 1, '1': 2, '3': 3 };
    if (key in num) {
      this.respond(num[key], t);
      return;
    }
    if (!key.startsWith('Arrow')) return;
    const vertical = (k: string) => k === 'ArrowUp' || k === 'ArrowDown';
    const p = this.pendingKey;
    if (p && t - p.t <= CHORD_MS && vertical(p.key) !== vertical(key)) {
      this.pendingKey = null;
      const keys = [p.key, key];
      const btn = (keys.includes('ArrowUp') ? 0 : 2) + (keys.includes('ArrowLeft') ? 0 : 1);
      this.respond(btn, t);
    } else {
      this.pendingKey = { key, t };
    }
  }

  // --- Geister-Hand ---

  private autoplay(): void {
    if (this.phase !== 'stim' || this.autoPlanned) return;
    this.autoPlanned = true;
    const { ghost, rng } = this.ctx;
    const L = this.layout();
    if (this.demo) {
      const c = this.btnCenter(this.trial.dir);
      ghost.tap(c.x, c.y, { delay: this.trial.kind === 'flanker' ? 700 : 380, move: 380 });
      ghost.moveTo(L.rest.x, L.rest.y, { delay: 250, move: 380 });
      return;
    }
    // Test-Modus: meist richtig, bei Täuschung öfter falsch, manchmal zu langsam
    const n = this.trial.n;
    const wrongP = this.trial.congruent ? 0.05 : 0.16;
    let btn = this.trial.dir;
    if (rng.chance(wrongP)) btn = rng.pick((n === 2 ? [0, 1] : [0, 1, 2, 3]).filter((b) => b !== this.trial.dir));
    const total = rng.range(420, 820) + (this.trial.congruent ? 0 : 90) + (n === 4 ? 80 : 0);
    const c = this.btnCenter(btn);
    ghost.tap(c.x, c.y, { delay: Math.max(0, total - 240), move: 240 });
  }

  // --- Zeichnen ---

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, u, dpr } = this.ctx.stage;
    const L = this.layout();
    background(g, w, h, dpr);
    this.drawButtons(g, t);

    const { cx, cy, a } = L;
    if (this.phase === 'banner') {
      this.drawBanner(g, t);
    } else if (this.phase === 'fix') {
      // Fixationskreuz
      const arm = Math.max(9, u * 2.2);
      g.save();
      g.strokeStyle = C.fg;
      g.globalAlpha = 0.85;
      g.lineWidth = Math.max(2, u * 0.5);
      g.lineCap = 'round';
      g.beginPath();
      g.moveTo(cx - arm, cy);
      g.lineTo(cx + arm, cy);
      g.moveTo(cx, cy - arm);
      g.lineTo(cx, cy + arm);
      g.stroke();
      g.restore();
    } else if (this.phase === 'stim') {
      const s = this.ctx.reducedMotion ? 1 : 0.92 + 0.08 * easeOut((t - this.onset) / 60);
      this.drawTrial(g, this.trial, a * s, 1);
    } else if (this.phase === 'fb' && this.fb) {
      // Pfeil kurz und weich ausblenden (kein hartes Blitzen)
      const k = (t - this.fb.t0) / 160;
      if (k < 1) this.drawTrial(g, this.trial, a, 1 - k);
    }
  }

  private drawTrial(g: CanvasRenderingContext2D, tr: Trial, a: number, alpha: number): void {
    const L = this.layout();
    const ang = ANGLES[tr.n];
    // Mitte bleibt als kleiner Punkt sichtbar – so ist klar, dass der Pfeil daneben steht
    g.save();
    g.globalAlpha = 0.35 * alpha;
    circle(g, L.cx, L.cy, Math.max(2.5, this.ctx.stage.u * 0.55), C.fg);
    g.restore();
    if (tr.kind === 'spatial') {
      let x = L.cx;
      let y = L.cy;
      if (tr.n === 2) x += (tr.pos === 0 ? -1 : 1) * L.off2;
      else {
        x += (tr.pos % 2 === 0 ? -1 : 1) * L.off4;
        y += (tr.pos < 2 ? -1 : 1) * L.off4;
      }
      drawArrow(g, x, y, a, ang[tr.dir], INK, alpha);
    } else {
      // Nachbar-Pfeile: gleiche Farbe und Größe – nur die Richtung unterscheidet sich
      const af = a * 0.78;
      const step = af * 1.3;
      const other = tr.congruent ? tr.dir : tr.n === 2 ? 1 - tr.dir : 3 - tr.dir;
      for (let i = -2; i <= 2; i++) {
        drawArrow(g, L.cx + i * step, L.cy, af, ang[i === 0 ? tr.dir : other], INK, alpha);
      }
    }
  }

  private drawButtons(g: CanvasRenderingContext2D, t: number): void {
    const btns = this.buttons();
    const n = this.nDirs();
    const fb = this.fb && this.phase === 'fb' ? this.fb : null;
    const showFb = fb && t - fb.t0 < PAUSE_MS + ERROR_EXTRA;
    const fbSameLayout = fb && this.trial.n === n;
    for (let i = 0; i < btns.length; i++) {
      const R = btns[i];
      let state: ButtonState = 'normal';
      let badge: 'ok' | 'bad' | null = null;
      let outline = false;
      if (showFb && fbSameLayout && fb) {
        if (i === fb.chosen) {
          state = fb.ok ? 'good' : 'bad';
          badge = fb.ok ? 'ok' : 'bad';
        } else if (!fb.ok && i === fb.correct) {
          outline = true;
          badge = 'ok';
        }
      }
      button(g, R, state);
      if (outline) {
        g.save();
        rrPath(g, R.x - 2.5, R.y - 2.5, R.w + 5, R.h + 5, Math.min(R.w, R.h) * 0.22 + 2.5);
        g.strokeStyle = C.good;
        g.lineWidth = 3.5;
        g.stroke();
        g.restore();
      }
      const s = Math.min(R.w, R.h);
      const ink = state === 'good' || state === 'bad' ? '#FFFFFF' : this.phase === 'stim' ? INK : 'rgba(241,245,249,0.72)';
      drawArrow(g, R.x + R.w / 2, R.y + R.h / 2, s * 0.52, ANGLES[n][i], ink);
      if (badge) {
        const rad = clamp(s * 0.13, 9, 15);
        drawBadge(g, R.x + R.w - rad - 6, R.y + rad + 6, rad, badge);
      }
    }
  }

  private drawBanner(g: CanvasRenderingContext2D, t: number): void {
    const L = this.layout();
    const { u } = this.ctx.stage;
    const { texts } = this.ctx;
    const key = this.bannerKey ?? 'stage1';
    const k = clamp((this.phaseEnd - t) / 250, 0, 1);
    const a = this.ctx.reducedMotion ? 1 : Math.min(1, (t - (this.phaseEnd - (this.ctx.quick ? 900 : BANNER_MS))) / 200) * k;
    const maxW = L.zw * 0.92;
    const big = clamp(u * 5.4, 22, 44);
    const small = clamp(u * 3.2, 15, 24);
    const isStart = this.log.length === 0 && !this.bannerDown;
    const kicker = this.bannerDown ? texts.feedback.easier : isStart ? `${texts.feedback.level} ${Math.floor(this.stair.level + 1e-9)}` : texts.feedback.newStage;
    g.save();
    g.globalAlpha = Math.max(0, a);
    fitText(g, kicker.toUpperCase(), L.cx, L.cy - big * 1.35, small, ACCENT, maxW, 800);
    fitText(g, texts.feedback[key], L.cx, L.cy, big, C.fg, maxW, 850);
    fitText(g, texts.feedback[`${key}Hint`] ?? '', L.cx, L.cy + big * 1.25, small, C.dim, maxW, 700);
    g.restore();
  }

  // --- Ergebnis ---

  private finish(): void {
    this.finished = true;
    const scored = this.log;
    const correct = scored.filter((r) => r.ok);
    const accuracy = scored.length ? (correct.length / scored.length) * 100 : 0;
    const rtC = correct.filter((r) => r.congruent).map((r) => r.rt);
    const rtI = correct.filter((r) => !r.congruent).map((r) => r.rt);
    const rtAll = correct.map((r) => r.rt);
    const interference = rtC.length >= 3 && rtI.length >= 3 ? median(rtI) - median(rtC) : NaN;
    const threshold = this.demo ? 1 : this.stair.threshold();
    const timeouts = scored.filter((r) => r.timeout).length;
    const inc = scored.filter((r) => !r.congruent);
    const con = scored.filter((r) => r.congruent);
    const errRate = (xs: LogEntry[]) => (xs.length ? xs.filter((r) => !r.ok && !r.timeout).length / xs.length : 0);
    let tip = accuracy >= 85 ? 'great' : 'steady';
    if (this.early >= 3) tip = 'early';
    else if (scored.length && timeouts / scored.length > 0.2) tip = 'slow';
    else if (errRate(inc) - errRate(con) > 0.12 && inc.filter((r) => !r.ok && !r.timeout).length >= 3) tip = 'trap';
    const secondary: Metric[] = [
      { key: 'accuracy', value: Math.round(accuracy), unit: 'percent' },
      ...(rtAll.length ? [{ key: 'rt', value: Math.round(median(rtAll)), unit: 'time' as const }] : []),
      ...(Number.isFinite(interference) ? [{ key: 'interference', value: Math.round(interference), unit: 'ms' as const }] : []),
    ];
    this.ctx.sfx.done();
    this.ctx.finish({
      primary: { key: 'level', value: Math.max(LEVEL_MIN, Math.round(threshold)), unit: 'level', better: 'higher' },
      secondary,
      score: this.points,
      level: nextStartLevel(threshold, LEVEL_MIN, LEVEL_MAX),
      tip,
    });
  }
}

export const pfeilDuell: ExerciseDefinition = {
  id: 'pfeil-duell',
  category: 'konzentration',
  minutes: 1,
  color: '#7A5195',
  showsLevel: true,
  icon:
    '<g fill="currentColor"><path d="M29 15.5l11.5 8.5L29 32.5v-5H8v-7h21z"/><path opacity=".55" d="M17 3v3.5h21v5H17V15L8 9z"/><path opacity=".55" d="M17 33v3.5h21v5H17V45L8 39z"/></g>',
  texts: { de, it },
  create: (ctx) => new PfeilDuell(ctx),
};
