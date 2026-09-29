/**
 * Doppelt gefordert – geteilte Aufmerksamkeit (Doppelaufgabe) mit echter Kostenmessung.
 *
 * Teil A (dauerhaft): Eine Kugel mit dem Finger auf einer sanft schwingenden Spur halten.
 * Die Spur läuft von rechts heran (Vorschau wie auf einer Straße), die Kugel sitzt auf einer
 * senkrechten Leiste und folgt der Fingerhöhe – der Finger darf irgendwo im Feld liegen (z. B. am
 * linken Rand), damit er Kugel und Spur nicht verdeckt. Gemessen: Zeit auf der Spur (%).
 * Teil B (einzeln): Alle 2–3 s erscheint kurz (~400 ms) ein Kreis oder ein Quadrat; mit zwei großen
 * Tasten beantworten (Form, nicht Farbe). Gemessen: Treffsicherheit innerhalb der Antwortfrist, Median-RT.
 *
 * Ablauf (~2 min): Teil 1 = A allein (20 s), Teil 2 = B allein (20 s), Teil 3 = beides (60 s, zwei
 * Hälften mit wechselndem Vorrang). In den Einzelteilen stellt sich die Schwierigkeit ein
 * (A: 1-up/1-down auf 2-s-Fenstern mit Kriterium ≥ 80 % auf der Spur → Median ≈ 80 %;
 * B: 3-down/1-up ≈ 79 %). Im Doppelteil bleibt sie FEST auf dem Niveau, auf dem die
 * Einzel-Basislinie gemessen wurde – nur so sind die Doppelaufgaben-Kosten
 * (Doppel − Einzel) / Einzel vergleichbar (Anguera et al., 2013).
 *
 * Verbesserungen gegenüber dem Vorbild („Geteilte Aufmerksamkeit“):
 * - Einzelaufgaben-Basislinie in jeder Sitzung → echte Kosten je Teilaufgabe statt nur Punkte.
 * - Die versprochene Bewegung ist da: kontinuierliche Steueraufgabe, zeitbasiert (dt), Tempo adaptiv.
 * - Rückmeldung nie nur über Farbe (✓/✗, gestrichelter Ring + Pfeil bei „neben der Spur“).
 * - Multitouch: Der Kugel-Finger wird über seine Pointer-ID verfolgt; Tipps im Zeichen-Feld
 *   stören ihn nicht (und umgekehrt).
 *
 * Hauptwert „Zusammenspiel“ = Mittel aus (Doppel ÷ Einzel) beider Teile, je höchstens 100 %.
 * Er ist unabhängig von der Stufe (beide Basislinien stammen aus derselben Sitzung und Stufe) und
 * damit über Sitzungen vergleichbar; die Stufe selbst zeigt die Karte an.
 *
 * Gespeicherte Stufe: Es gibt nur eine Zahl, aber zwei Treppen. Kodierung:
 * level = M + D/1000 mit M = Mittel beider Stufen (0,1er-Raster) und D = A − B (0,1er-Raster,
 * |D| < 20). Gerundet ergibt das die mittlere Stufe (Anzeige), dekodiert beide Startstufen.
 */
import { background, button, type ButtonState, C, circle, font, glow, hand, type Rect, ring, rrPath, star, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, median } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, Metric, PointerInfo, StageInfo } from '../../core/types';
import { de, it } from './texts';

const MIN_LEVEL = 1;
const MAX_LEVEL = 20;

type Kind = 'introA' | 'soloA' | 'introB' | 'soloB' | 'introD' | 'dual';

interface Seg {
  kind: Kind;
  ms: number;
}

const PLAY_SEGS: Seg[] = [
  { kind: 'introA', ms: 2600 },
  { kind: 'soloA', ms: 20000 },
  { kind: 'introB', ms: 2600 },
  { kind: 'soloB', ms: 20000 },
  { kind: 'introD', ms: 3400 },
  { kind: 'dual', ms: 60000 },
];
const QUICK_SEGS: Seg[] = [
  { kind: 'introA', ms: 700 },
  { kind: 'soloA', ms: 3500 },
  { kind: 'introB', ms: 700 },
  { kind: 'soloB', ms: 5000 },
  { kind: 'introD', ms: 900 },
  { kind: 'dual', ms: 6000 },
];
/** Intro-Film: kurz A, kurz B, dann beides (ohne Zwischenkarten – dafür Bildunterschriften) */
const DEMO_SEGS: Seg[] = [
  { kind: 'soloA', ms: 3800 },
  { kind: 'soloB', ms: 3800 },
  { kind: 'dual', ms: 5800 },
];

// Teil A – Spur
/** Bewertungsfenster für die Treppe (ms) und Kriterium „auf der Spur“ */
const WIN_MS = 2000;
const QUICK_WIN_MS = 1000;
const WIN_CRIT = 0.8;
/** Anfangs nicht werten (Finger finden) */
const WARM_MS = 1500;
const QUICK_WARM_MS = 400;
/** So viel Spur (in Weg-Einheiten, 1 Einheit ≈ 1 s auf Stufe 1) ist voraus zu sehen */
const AHEAD_D = 1.4;
/** größte Auslenkung der Spurmitte (Anteil des Steuerbereichs) */
const AMP = 0.31;
/** Überlagerte Sinuswellen (Frequenz auf Stufe 1 in Hz, Gewicht) – 0,1–0,4 Hz, nicht vorhersagbar */
const WAVES: ReadonlyArray<[number, number]> = [
  [0.13, 0.5],
  [0.23, 0.3],
  [0.37, 0.2],
];
// Teil B – Zeichen
const GAP_MS: [number, number] = [2000, 3000];
const QUICK_GAP_MS: [number, number] = [1800, 2200];
const FIRST_SOLO_MS = 1000;
const FIRST_DUAL_MS = 1800;
const QUICK_FIRST_MS = 600;
const FEEDBACK_MS = 700;
const PRESS_MS = 140;
/** Punkte zählen doppelt für die Teilaufgabe mit Vorrang */
const PRIO_FACTOR = 2;
// Intro-Film
const DEMO_A_LEVEL = 3;
const DEMO_SHOW_MS = 700;
const DEMO_DEADLINE_MS = 2200;
/** Zeichen im Film: [Segment, ms nach Segmentbeginn, Form] */
const DEMO_SIGNS: ReadonlyArray<[Kind, number, 0 | 1]> = [
  ['soloB', 500, 0],
  ['soloB', 2300, 1],
  ['dual', 1100, 1],
  ['dual', 3300, 0],
];
const DEMO_TAP_MS = 680;

const ACCENT = '#7A5195';
const ACCENT_LIGHT = '#C9A7E3';
const ROAD = '#B794D6';
const OFF = '#FBBF24';

/** Tempo der Spur (Weg-Einheiten pro s) */
const speedFor = (level: number): number => Math.pow(1.1, level - 1);
/** halbe Spurbreite (Anteil des Steuerbereichs) */
const halfWidthFor = (level: number): number => Math.max(0.06, 0.16 - 0.0053 * (level - 1));
/** Antwortfrist für ein Zeichen (ms) */
const deadlineFor = (level: number): number => Math.round(1700 * Math.pow(0.945, level - 1));
/** Anzeigedauer eines Zeichens (ms) – um 400 ms, wird mit der Stufe etwas kürzer */
const showFor = (level: number): number => Math.max(250, Math.round(450 - 10 * (level - 1)));
/** Punkte-Faktor je Stufe */
const levelFactor = (level: number): number => 1 + 0.1 * (level - 1);

interface Point {
  x: number;
  y: number;
}

interface Layout {
  key: string;
  land: boolean;
  A: Rect;
  B: Rect;
  head: number;
  /** Steuerbereich der Kugel (y in px) */
  c0: number;
  c1: number;
  /** x der Leiste, auf der die Kugel sitzt */
  col: number;
  pxPerD: number;
  /** x, an dem der (gezeichnete) Kugel-Finger im Film liegt */
  grip: number;
  ballR: number;
  win: Rect;
  sym: number;
  btns: [Rect, Rect];
  /** Tipps unterhalb dieser Linie im Zeichen-Feld zählen als Antwort */
  zoneTop: number;
  gap: number;
  rest: Point;
  handSize: number;
}

interface Trial {
  shape: 0 | 1;
  onset: number;
  show: number;
  deadline: number;
  level: number;
  dual: boolean;
  /** Hälfte des Doppelteils (0/1) */
  half: number;
  done: boolean;
  ok: boolean;
  late: boolean;
  rt: number;
}

interface Feedback {
  chosen: number;
  correct: number;
  ok: boolean;
  until: number;
}

class DoppeltGefordert implements Exercise {
  private readonly segs: Seg[];
  private readonly totalMs: number;
  private readonly stairA: Staircase;
  private readonly stairB: Staircase;
  private si = 0;
  private segT0 = 0;
  private doneMs = 0;
  private finished = false;
  private endT = Infinity;
  private lay: Layout | null = null;
  // Spur
  private dist = 0;
  private phase = [0, 0, 0];
  private sp = 1;
  private hw = 0.16;
  private ballN = 0.5;
  /** 0 = auf der Spur, 1 = daneben (geglättet, nur für die Darstellung) */
  private offK = 0;
  private on = true;
  // Finger
  private aId: number | null = null;
  private lastHover = -1e9;
  private lastFinger = 0;
  // Teil A – Treppe & Messung
  private winStart = 0;
  private winOn = 0;
  private winTot = 0;
  private baseOn = 0;
  private baseTot = 0;
  private baseLvl = 0;
  private levelADual = 1;
  private dualOn = 0;
  private dualTot = 0;
  private noFinger = 0;
  // Teil B
  private trial: Trial | null = null;
  private trials: Trial[] = [];
  private nextOnset = Infinity;
  private demoSign = 0;
  private shapes: number[] = [];
  private levelBDual = 1;
  private fb: Feedback | null = null;
  private pressT = [-1e9, -1e9];
  // Doppelteil: Vorrang 0 = Kugel, 1 = Zeichen
  private prio = 0;
  private prioSince = 0;
  private points = 0;
  // Geister-Hände (Film/Autoplay)
  private autoN = 0.5;
  private noise = 0;
  private handAlpha = 0;

  constructor(private readonly ctx: ExerciseContext) {
    this.segs = ctx.mode === 'demo' ? DEMO_SEGS : ctx.quick ? QUICK_SEGS : PLAY_SEGS;
    this.totalMs = this.segs.reduce((s, x) => s + x.ms, 0);
    const [a, b] = decodeLevel(ctx.startLevel);
    this.stairA = new Staircase({ start: a, min: MIN_LEVEL, max: MAX_LEVEL, down: 1, up: 1 });
    // Nur ~8 Zeichen pro Einzelteil → Zweierschritte, damit die Treppe in wenigen Sitzungen ankommt
    this.stairB = new Staircase({ start: b, min: MIN_LEVEL, max: MAX_LEVEL, down: 3, up: 1, stepHarder: 2, stepEasier: 2 });
    this.levelADual = a;
    this.levelBDual = b;
  }

  private get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  private get kind(): Kind {
    return this.segs[Math.min(this.si, this.segs.length - 1)].kind;
  }

  /** Stufe der Spur im aktuellen Abschnitt */
  private get levelA(): number {
    if (this.demo) return DEMO_A_LEVEL;
    const k = this.kind;
    return k === 'introD' || k === 'dual' ? this.levelADual : this.stairA.level;
  }

  private get levelB(): number {
    return this.kind === 'dual' ? this.levelBDual : this.stairB.level;
  }

  /** Kugel-Feld aktiv (Spur läuft) */
  private aActive(k: Kind = this.kind): boolean {
    return k === 'introA' || k === 'soloA' || k === 'introD' || k === 'dual';
  }

  /** Zeichen-Feld aktiv */
  private bActive(k: Kind = this.kind): boolean {
    return k === 'introB' || k === 'soloB' || k === 'introD' || k === 'dual';
  }

  // -------------------------------------------------------------------------

  start(t: number): void {
    const { rng, ghost } = this.ctx;
    this.phase = WAVES.map(() => rng.range(0, Math.PI * 2));
    this.dist = rng.range(0, 20);
    this.sp = speedFor(this.levelA);
    this.hw = halfWidthFor(this.levelA);
    this.ballN = this.roadAt(this.dist);
    this.autoN = this.ballN;
    this.segT0 = t;
    this.lastFinger = t;
    this.ctx.hud.setScore(0);
    this.enter(this.kind, t);
    if (this.ctx.autoplay) {
      const L = this.layout();
      ghost.moveTo(L.rest.x, L.rest.y, { move: 0 });
    }
  }

  update(dt: number, t: number): void {
    if (this.finished) return;
    // Abschnitte weiterschalten (Zeitplan fest, unabhängig von den Antworten)
    while (t - this.segT0 >= this.segs[this.si].ms) {
      const seg = this.segs[this.si];
      const tEnd = this.segT0 + seg.ms;
      this.leave(seg.kind, tEnd);
      this.doneMs += seg.ms;
      this.si++;
      if (this.si >= this.segs.length) {
        this.end(tEnd);
        return;
      }
      this.segT0 = tEnd;
      this.enter(this.kind, tEnd);
    }
    const kind = this.kind;
    const el = t - this.segT0;
    const seg = this.segs[this.si];
    if (!this.demo) this.ctx.hud.setProgress((this.doneMs + el) / this.totalMs);

    // Spur: Tempo und Breite weich an die Stufe anpassen, Weg zeitbasiert
    const lvl = this.levelA;
    const k = 1 - Math.exp(-dt / 0.6);
    this.sp += (speedFor(lvl) - this.sp) * k;
    this.hw += (halfWidthFor(lvl) - this.hw) * k;
    if (this.aActive(kind)) this.dist += this.sp * dt;

    if (this.ctx.autoplay) this.autoTrack(dt, t, kind);
    this.on = Math.abs(this.ballN - this.roadAt(this.dist)) <= this.hw;
    // Darstellung „neben der Spur“ nur, solange die Kugel-Aufgabe läuft
    this.offK += ((this.on || !this.aActive(kind) ? 0 : 1) - this.offK) * (1 - Math.exp(-dt / 0.07));

    // Finger-Status (für den Hinweis und die Auswertung)
    const fingerDown = this.ctx.autoplay || this.aId !== null || t - this.lastHover < 600;
    if (fingerDown || !this.aActive(kind)) this.lastFinger = t;

    if (kind === 'soloA') this.measureSolo(dt, t, el, seg.ms, lvl);
    else if (kind === 'dual') {
      this.dualTot += dt;
      if (this.on) this.dualOn += dt;
      if (!fingerDown) this.noFinger += dt;
      if (this.on) this.points += dt * 4 * levelFactor(lvl) * (this.prio === 0 ? PRIO_FACTOR : 1);
      if (this.prio === 0 && !this.demo && el >= seg.ms / 2) this.switchPrio(t);
    }

    if (kind === 'soloB' || kind === 'dual') this.updateSigns(t, this.segT0 + seg.ms);
    this.ctx.hud.setScore(Math.floor(this.points));
    if (this.demo && kind === 'dual' && el >= seg.ms - 1700) this.ctx.hud.caption(this.ctx.texts.captions.end, 'top');
  }

  private enter(kind: Kind, t0: number): void {
    const { hud, texts, sfx, rng } = this.ctx;
    const part = kind === 'introA' || kind === 'soloA' ? 1 : kind === 'introB' || kind === 'soloB' ? 2 : 3;
    if (!this.demo) hud.setLabel(`${texts.feedback.part} ${part}/3`);
    const quick = this.ctx.quick;
    if (kind === 'soloA') {
      this.winStart = t0 + (quick ? QUICK_WARM_MS : WARM_MS);
      this.winOn = this.winTot = 0;
      if (this.demo) hud.caption(texts.captions.track, 'top');
      else sfx.go();
    } else if (kind === 'soloB') {
      this.nextOnset = this.demo ? Infinity : t0 + (quick ? QUICK_FIRST_MS : FIRST_SOLO_MS);
      if (this.demo) hud.caption(texts.captions.sign, 'top');
      else sfx.go();
    } else if (kind === 'dual') {
      this.nextOnset = this.demo ? Infinity : t0 + (quick ? QUICK_FIRST_MS + 400 : FIRST_DUAL_MS + rng.range(0, 400));
      this.prio = 0;
      this.prioSince = t0;
      if (this.demo) hud.caption(texts.captions.both, 'top');
      else sfx.go();
    }
  }

  private leave(kind: Kind, t: number): void {
    if (kind === 'soloA') {
      // Stufe für den Doppelteil = mittlere Stufe, auf der die Basislinie gemessen wurde
      this.levelADual = this.baseTot > 0 ? this.baseLvl / this.baseTot : this.stairA.level;
    } else if (kind === 'soloB' || kind === 'dual') {
      if (this.trial && !this.trial.done) this.timeout(this.trial, t);
      this.trial = null;
      this.nextOnset = Infinity;
      if (kind === 'soloB') {
        const solo = this.trials.filter((tr) => !tr.dual);
        this.levelBDual = solo.length ? solo.reduce((s, tr) => s + tr.level, 0) / solo.length : this.stairB.level;
      }
    }
  }

  // -------------------------------------------------------------------------
  // Teil A

  /** Mitte der Spur (0..1 des Steuerbereichs) an Wegpunkt d */
  private roadAt(d: number): number {
    let s = 0;
    for (let i = 0; i < WAVES.length; i++) s += WAVES[i][1] * Math.sin(2 * Math.PI * WAVES[i][0] * d + this.phase[i]);
    return 0.5 + AMP * s;
  }

  private measureSolo(dt: number, t: number, el: number, segMs: number, lvl: number): void {
    if (t < this.winStart) return;
    this.winTot += dt;
    if (this.on) this.winOn += dt;
    if (this.on) this.points += dt * 4 * levelFactor(lvl);
    // Basislinie: zweite Hälfte des Einzelteils (Stufe hat sich dann eingependelt)
    if (el >= segMs / 2) {
      this.baseTot += dt;
      if (this.on) this.baseOn += dt;
      this.baseLvl += lvl * dt;
    }
    const winMs = this.ctx.quick ? QUICK_WIN_MS : WIN_MS;
    if (t - this.winStart >= winMs) {
      if (!this.demo && this.winTot > 0) this.stairA.update(this.winOn / this.winTot >= WIN_CRIT);
      this.winStart = t;
      this.winOn = this.winTot = 0;
    }
  }

  private setBall(y: number): void {
    const L = this.layout();
    this.ballN = clamp((y - L.c0) / Math.max(1, L.c1 - L.c0), 0, 1);
  }

  // -------------------------------------------------------------------------
  // Teil B

  private updateSigns(t: number, segEnd: number): void {
    const tr = this.trial;
    if (tr && !tr.done && t - tr.onset > tr.deadline) this.timeout(tr, t);
    if (this.demo) {
      const s = DEMO_SIGNS[this.demoSign];
      if (s && s[0] === this.kind && t - this.segT0 >= s[1]) {
        this.demoSign++;
        this.spawn(t, s[2], DEMO_A_LEVEL, DEMO_SHOW_MS, DEMO_DEADLINE_MS);
      }
      return;
    }
    if (t < this.nextOnset) return;
    const { rng, quick } = this.ctx;
    const lvl = this.levelB;
    const dl = deadlineFor(lvl);
    if (t + dl > segEnd) {
      this.nextOnset = Infinity;
      return;
    }
    this.spawn(t, this.pickShape(), lvl, showFor(lvl), dl);
    const gap = quick ? QUICK_GAP_MS : GAP_MS;
    this.nextOnset = t + rng.range(gap[0], gap[1]);
  }

  /** Zufällige Form, aber nie dreimal hintereinander dieselbe */
  private pickShape(): 0 | 1 {
    const { rng } = this.ctx;
    let s = rng.int(2);
    const n = this.shapes.length;
    if (n >= 2 && this.shapes[n - 1] === s && this.shapes[n - 2] === s) s = 1 - s;
    this.shapes.push(s);
    return s as 0 | 1;
  }

  private spawn(t: number, shape: 0 | 1, level: number, show: number, deadline: number): void {
    const dual = this.kind === 'dual';
    const half = dual ? this.prio : 0;
    const tr: Trial = { shape, onset: t, show, deadline, level, dual, half, done: false, ok: false, late: false, rt: NaN };
    this.trial = tr;
    this.trials.push(tr);
    this.fb = null;
    if (this.demo) this.demoTap(tr);
    else if (this.ctx.autoplay) this.autoTap(tr);
  }

  private answer(btn: number, t: number): void {
    this.pressT[btn] = t;
    const tr = this.trial;
    if (!tr || tr.done || t < tr.onset) return;
    if (t - tr.onset > tr.deadline) {
      this.timeout(tr, t);
      return;
    }
    const { sfx } = this.ctx;
    tr.done = true;
    tr.ok = btn === tr.shape;
    tr.rt = t - tr.onset;
    if (tr.ok) {
      sfx.good();
      this.points += 10 * levelFactor(tr.level) * (tr.dual && this.prio === 1 ? PRIO_FACTOR : 1);
    } else {
      sfx.bad();
    }
    if (!tr.dual && !this.demo) this.stairB.update(tr.ok);
    this.fb = { chosen: btn, correct: tr.shape, ok: tr.ok, until: t + FEEDBACK_MS };
  }

  private timeout(tr: Trial, t: number): void {
    tr.done = true;
    tr.late = true;
    this.ctx.sfx.bad();
    if (!tr.dual && !this.demo) this.stairB.update(false);
    this.fb = { chosen: -1, correct: tr.shape, ok: false, until: t + FEEDBACK_MS + 200 };
    const L = this.layout();
    const size = clamp(this.ctx.stage.u * 4, 16, 30);
    this.ctx.hud.toast(this.ctx.texts.feedback.late, 'bad', { x: L.win.x + L.win.w / 2, y: L.win.y + L.win.h / 2, ms: 800, size });
  }

  private switchPrio(t: number): void {
    this.prio = 1;
    this.prioSince = t;
    const L = this.layout();
    const text = this.ctx.texts.feedback.prioSign;
    // Schriftgröße so wählen, dass der Hinweis ins Zeichen-Feld passt
    const size = Math.min(clamp(this.ctx.stage.u * 3.6, 15, 28), (L.B.w * 0.92) / (text.length * 0.56));
    this.ctx.hud.toast(text, 'info', {
      x: L.B.x + L.B.w / 2,
      y: L.B.y + L.head + size * 1.2,
      ms: 2200,
      size,
    });
    this.ctx.sfx.tick();
  }

  // -------------------------------------------------------------------------
  // Eingaben

  pointerDown(p: PointerInfo): void {
    const L = this.layout();
    const g = L.gap / 2;
    const inA = p.x >= L.A.x - g && p.x <= L.A.x + L.A.w + g && p.y >= L.A.y - g && p.y <= L.A.y + L.A.h + g;
    if (inA && p.type !== 'ghost') {
      // Der neueste Finger im Kugel-Feld übernimmt die Steuerung
      this.aId = p.id;
      if (this.aActive()) this.setBall(p.y);
      return;
    }
    const inB = p.x >= L.B.x - g && p.x <= L.B.x + L.B.w + g && p.y >= L.zoneTop && p.y <= L.B.y + L.B.h + g;
    if (inB && (this.kind === 'soloB' || this.kind === 'dual')) this.answer(p.x < L.B.x + L.B.w / 2 ? 0 : 1, p.t);
  }

  pointerMove(p: PointerInfo): void {
    if (p.id === this.aId) {
      if (this.aActive()) this.setBall(p.y);
      return;
    }
    // Computer: Die Maus steuert die Kugel auch ohne gedrückte Taste, solange sie im Kugel-Feld ist
    if (p.type === 'mouse' && this.aId === null) {
      const L = this.layout();
      if (p.x >= L.A.x && p.x <= L.A.x + L.A.w && p.y >= L.A.y && p.y <= L.A.y + L.A.h) {
        this.lastHover = p.t;
        if (this.aActive()) this.setBall(p.y);
      }
    }
  }

  pointerUp(p: PointerInfo): void {
    if (p.id === this.aId) this.aId = null;
  }

  /** Tastatur: ← / 1 = Kreis, → / 2 = Quadrat (Kugel dann mit der Maus) */
  keyDown(key: string, t: number): void {
    const btn = key === 'ArrowLeft' || key === '1' ? 0 : key === 'ArrowRight' || key === '2' ? 1 : -1;
    if (btn >= 0 && (this.kind === 'soloB' || this.kind === 'dual')) this.answer(btn, t);
  }

  // -------------------------------------------------------------------------
  // Geister-Hände

  /**
   * Kugel-Hand (nur Film/Autoplay – die Engine-Hand kann nur tippen): folgt der Spur mit
   * etwas Verzögerung und Zittern; im Doppelteil lenkt jedes Zeichen kurz ab.
   */
  private autoTrack(dt: number, t: number, kind: Kind): void {
    const { rng } = this.ctx;
    const active = this.aActive(kind);
    this.handAlpha += ((active ? 1 : 0) - this.handAlpha) * (1 - Math.exp(-dt / 0.2));
    if (!this.aActive(kind)) return;
    const tr = this.trial;
    const busy = kind === 'dual' && !!tr && t - tr.onset < 900;
    let tau: number;
    let sigma: number;
    if (this.demo) {
      tau = 0.09;
      sigma = 0.012;
    } else {
      tau = (0.08 + 0.011 * this.levelA) * (busy ? 2.4 : 1);
      sigma = busy ? 0.07 : 0.035;
    }
    // Rauschen als träger Zufallsprozess (kein Pixelzittern)
    this.noise += (-this.noise / 0.5) * dt + sigma * Math.sqrt(dt) * rng.normal();
    const aim = this.roadAt(this.dist + this.sp * 0.12) + this.noise;
    this.autoN += (aim - this.autoN) * (1 - Math.exp(-dt / tau));
    this.autoN = clamp(this.autoN, 0, 1);
    this.ballN = this.autoN;
  }

  /** Autoplay (Tests): meist richtig, im Doppelteil langsamer und öfter falsch */
  private autoTap(tr: Trial): void {
    const { ghost, rng } = this.ctx;
    ghost.clear();
    if (rng.chance(0.04)) return;
    const L = this.layout();
    const rt = rng.range(430, 720) + (tr.dual ? rng.range(60, 320) : 0);
    const pOk = tr.dual ? 0.86 : 0.95;
    const btn = rng.chance(pOk) ? tr.shape : 1 - tr.shape;
    const R = L.btns[btn];
    const move = Math.min(360, rt - 80);
    ghost.tap(R.x + R.w * rng.range(0.35, 0.65), R.y + R.h * rng.range(0.35, 0.6), { delay: rt - move, move });
    ghost.moveTo(L.rest.x, L.rest.y, { delay: 220, move: 420 });
  }

  private demoTap(tr: Trial): void {
    const { ghost } = this.ctx;
    ghost.clear();
    const L = this.layout();
    const R = L.btns[tr.shape];
    const move = 440;
    ghost.tap(R.x + R.w / 2, R.y + R.h * 0.42, { delay: DEMO_TAP_MS - move, move });
    ghost.moveTo(L.rest.x, L.rest.y, { delay: 380, move: 480 });
  }

  // -------------------------------------------------------------------------

  private end(t: number): void {
    this.finished = true;
    this.endT = t;
    const { hud, sfx } = this.ctx;
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'together', value: 90, unit: 'percent', better: 'higher' },
        secondary: [],
        score: Math.floor(this.points),
        level: MIN_LEVEL,
      });
      return;
    }
    hud.setProgress(1);
    sfx.done();
    const totBase = this.baseTot > 0 ? this.baseOn / this.baseTot : NaN;
    const totDual = this.dualTot > 0 ? this.dualOn / this.dualTot : 0;
    const solo = this.trials.filter((tr) => !tr.dual);
    const dual = this.trials.filter((tr) => tr.dual);
    const accBase = solo.length ? solo.filter((tr) => tr.ok).length / solo.length : NaN;
    const accDual = dual.length ? dual.filter((tr) => tr.ok).length / dual.length : NaN;
    // Verhältnis Doppel ÷ Einzel (Schutz gegen winzige Basislinien); ohne Daten: keine Kosten
    const rA = Number.isFinite(totBase) ? clamp(totDual / Math.max(0.05, totBase), 0, 1) : 1;
    const rB = Number.isFinite(accBase) && Number.isFinite(accDual) ? clamp(accDual / Math.max(0.1, accBase), 0, 1) : 1;
    const together = Math.round(((rA + rB) / 2) * 100);
    const costA = Math.round((1 - rA) * 100);
    const costB = Math.round((1 - rB) * 100);
    const rtDual = median(dual.filter((tr) => tr.ok).map((tr) => tr.rt));
    const noFingerFrac = this.dualTot > 0 ? this.noFinger / this.dualTot : 0;
    let tip = 'balance';
    if (noFingerFrac > 0.3) tip = 'finger';
    else if (together >= 90) tip = 'great';
    else if (costA >= costB + 10) tip = 'track';
    else if (costB >= costA + 10) tip = 'signs';
    const secondary: Metric[] = [
      { key: 'costTrack', value: costA, unit: 'percent' },
      { key: 'costSign', value: costB, unit: 'percent' },
      { key: 'onRoad', value: Math.round(totDual * 100), unit: 'percent' },
    ];
    // 4 Kacheln (2 × 2): Antwortzeit, sonst – ohne richtige Antwort im Doppelteil – die Treffsicherheit
    if (Number.isFinite(rtDual)) secondary.push({ key: 'rtSign', value: Math.round(rtDual), unit: 'time' });
    else if (Number.isFinite(accDual)) secondary.push({ key: 'signOk', value: Math.round(accDual * 100), unit: 'percent' });
    const nextA = nextStartLevel(this.stairA.threshold(), MIN_LEVEL, MAX_LEVEL);
    const nextB = nextStartLevel(this.stairB.threshold(), MIN_LEVEL, MAX_LEVEL);
    this.ctx.finish({
      primary: { key: 'together', value: together, unit: 'percent', better: 'higher' },
      secondary,
      score: Math.floor(this.points),
      level: encodeLevel(nextA, nextB),
      tip,
    });
  }

  // -------------------------------------------------------------------------
  // Layout

  private layout(): Layout {
    const st = this.ctx.stage;
    const { w, h, u } = st;
    const key = `${w}x${h}`;
    if (this.lay && this.lay.key === key) return this.lay;
    const land = w >= h * 1.05;
    const m = clamp(u * 1.6, 8, 18);
    const gap = clamp(u * 1.8, 8, 18);
    const top = this.demo ? captionBottom(st) + 2 : 0;
    let A: Rect;
    let B: Rect;
    if (land) {
      const aw = (w - 2 * m - gap) * 0.57;
      A = { x: m, y: top + m, w: aw, h: h - top - 2 * m };
      B = { x: m + aw + gap, y: top + m, w: w - 2 * m - gap - aw, h: h - top - 2 * m };
    } else {
      const ah = (h - top - 2 * m - gap) * 0.56;
      A = { x: m, y: top + m, w: w - 2 * m, h: ah };
      B = { x: m, y: top + m + ah + gap, w: w - 2 * m, h: h - top - 2 * m - gap - ah };
    }
    const head = clamp(u * 5.4, 30, 46);
    const ballR = clamp(u * 3, 13, 26);
    // Steuerbereich: höchstens ~64 u hoch (bequemer Fingerweg), mittig im Feld
    const range = Math.max(40, Math.min(A.h - head - 2 * ballR - 10, u * 64));
    const mid = A.y + head + (A.h - head) / 2;
    const col = A.x + A.w * 0.3;
    const pad = clamp(u * 2, 8, 18);
    const btnH = clamp((B.h - head) * 0.36, 64, 170);
    const bw = (B.w - 3 * pad) / 2;
    const by = B.y + B.h - pad - btnH;
    const btns: [Rect, Rect] = [
      { x: B.x + pad, y: by, w: bw, h: btnH },
      { x: B.x + 2 * pad + bw, y: by, w: bw, h: btnH },
    ];
    const areaTop = B.y + head;
    const areaBot = by - pad;
    const sym = clamp(Math.min(u * 9, (areaBot - areaTop) * 0.45), 30, 84);
    const ws = Math.min(sym * 1.9, areaBot - areaTop - 4, B.w - 2 * pad);
    const win = { x: B.x + B.w / 2 - ws / 2, y: areaTop + (areaBot - areaTop - ws) / 2, w: ws, h: ws };
    const handSize = clamp(u * 13, 48, 110);
    this.lay = {
      key,
      land,
      A,
      B,
      head,
      c0: mid - range / 2,
      c1: mid + range / 2,
      col,
      pxPerD: (A.x + A.w - col) / AHEAD_D,
      grip: A.x + Math.min(A.w * 0.09, 44),
      ballR,
      win,
      sym,
      btns,
      zoneTop: Math.min(by - pad * 1.5, win.y + win.h + pad * 0.5),
      gap,
      rest: { x: B.x + B.w / 2, y: by + btnH * 0.93 },
      handSize,
    };
    return this.lay;
  }

  resize(): void {
    // Kugel und Spur sind normiert gespeichert – nur das Layout neu berechnen
    this.lay = null;
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, now: number): void {
    const { w, h, dpr } = this.ctx.stage;
    const L = this.layout();
    const t = Math.min(now, this.endT);
    const kind = this.kind;
    background(g, w, h, dpr);
    const inDual = kind === 'dual' || kind === 'introD';
    this.drawPanel(g, L.A, L.head, this.ctx.texts.feedback.panelTrack, 'track', inDual && this.prio === 0 && !this.demo, t);
    this.drawPanel(g, L.B, L.head, this.ctx.texts.feedback.panelSign, 'sign', kind === 'dual' && this.prio === 1 && !this.demo, t);
    this.drawRoad(g, L);
    this.drawBall(g, L);
    this.drawSigns(g, L, t);
    if (!this.aActive(kind)) dim(g, L.A);
    if (!this.bActive(kind)) dim(g, L.B);
    if (!this.ctx.autoplay) this.drawFingerHint(g, L, t);
    this.drawIntroCard(g, L, t);
    if (this.ctx.autoplay && this.handAlpha > 0.02) {
      g.save();
      g.globalAlpha = this.handAlpha;
      // gespiegelte (linke) Hand, Fingerspitze am Griffpunkt auf Höhe der Kugel
      const y = L.c0 + this.ballN * (L.c1 - L.c0);
      g.translate(L.grip, 0);
      g.scale(-1, 1);
      hand(g, 0, y, L.handSize, false);
      g.restore();
    }
  }

  private drawPanel(g: CanvasRenderingContext2D, R: Rect, head: number, label: string, icon: 'track' | 'sign', prio: boolean, t: number): void {
    const u = this.ctx.stage.u;
    const rad = clamp(u * 2.2, 10, 20);
    fillRRc(g, R, rad, 'rgba(255,255,255,0.035)');
    g.save();
    rrPath(g, R.x + 0.5, R.y + 0.5, R.w - 1, R.h - 1, rad);
    g.strokeStyle = prio ? withAlpha(ACCENT_LIGHT, 0.7) : 'rgba(255,255,255,0.1)';
    g.lineWidth = prio ? 2 : 1;
    g.stroke();
    g.restore();
    const fs = clamp(head * 0.45, 13, 20);
    const cy = R.y + head / 2 + 2;
    const ix = R.x + head * 0.5 + (icon === 'sign' ? fs * 0.3 : 0);
    // kleines Symbol vor der Überschrift
    if (icon === 'track') {
      circle(g, ix, cy, fs * 0.36, ACCENT_LIGHT);
    } else {
      ring(g, ix - fs * 0.28, cy, fs * 0.24, ACCENT_LIGHT, 2);
      g.strokeStyle = ACCENT_LIGHT;
      g.lineWidth = 2;
      g.strokeRect(ix + fs * 0.06, cy - fs * 0.24, fs * 0.48, fs * 0.48);
    }
    g.save();
    g.font = font(fs, 750);
    g.fillStyle = C.dim;
    g.textAlign = 'left';
    g.textBaseline = 'middle';
    g.fillText(label, ix + fs * (icon === 'sign' ? 0.8 : 0.7), cy);
    g.restore();
    if (prio) {
      // Vorrang: Stern + Wort (nicht nur Farbe)
      const k = this.ctx.reducedMotion ? 1 : clamp((t - this.prioSince) / 300, 0, 1);
      const text = this.ctx.texts.feedback.priority;
      g.save();
      g.globalAlpha = k;
      g.font = font(fs * 0.9, 800);
      const tw = g.measureText(text).width;
      const pw = tw + fs * 2.2;
      const px = R.x + R.w - pw - head * 0.3;
      const ph = fs * 1.6;
      fillRRc(g, { x: px, y: cy - ph / 2, w: pw, h: ph }, ph / 2, withAlpha(ACCENT, 0.9));
      star(g, px + fs * 0.85, cy, fs * 0.5, '#FFFFFF');
      g.fillStyle = '#FFFFFF';
      g.textAlign = 'left';
      g.textBaseline = 'middle';
      g.fillText(text, px + fs * 1.5, cy + 1);
      g.restore();
    }
  }

  private drawRoad(g: CanvasRenderingContext2D, L: Layout): void {
    const { A, c0, c1, col, pxPerD } = L;
    const range = c1 - c0;
    const x0 = A.x;
    const x1 = A.x + A.w;
    const step = 6;
    const top: number[] = [];
    const bot: number[] = [];
    const mid: number[] = [];
    const xs: number[] = [];
    for (let x = x0; x <= x1 + step - 0.01; x += step) {
      const xx = Math.min(x, x1);
      const c = this.roadAt(this.dist + (xx - col) / pxPerD);
      const y = c0 + c * range;
      xs.push(xx);
      mid.push(y);
      top.push(y - this.hw * range);
      bot.push(y + this.hw * range);
    }
    g.save();
    rrPath(g, A.x, A.y + L.head, A.w, A.h - L.head, clamp(this.ctx.stage.u * 2.2, 10, 20));
    g.clip();
    // Verlauf: hinten (vorbei) blass, an der Kugel kräftig, ganz vorne ausblendend
    const grad = g.createLinearGradient(x0, 0, x1, 0);
    const fc = (col - x0) / Math.max(1, x1 - x0);
    grad.addColorStop(0, withAlpha(ROAD, 0.07));
    grad.addColorStop(fc, withAlpha(ROAD, 0.34));
    grad.addColorStop(Math.min(1, fc + (1 - fc) * 0.7), withAlpha(ROAD, 0.22));
    grad.addColorStop(1, withAlpha(ROAD, 0.02));
    g.beginPath();
    g.moveTo(xs[0], top[0]);
    for (let i = 1; i < xs.length; i++) g.lineTo(xs[i], top[i]);
    for (let i = xs.length - 1; i >= 0; i--) g.lineTo(xs[i], bot[i]);
    g.closePath();
    g.fillStyle = grad;
    g.fill();
    const edge = g.createLinearGradient(x0, 0, x1, 0);
    edge.addColorStop(0, 'rgba(255,255,255,0.08)');
    edge.addColorStop(fc, 'rgba(255,255,255,0.7)');
    edge.addColorStop(1, 'rgba(255,255,255,0.05)');
    g.strokeStyle = edge;
    g.lineWidth = 2.5;
    g.lineJoin = 'round';
    for (const arr of [top, bot]) {
      g.beginPath();
      g.moveTo(xs[0], arr[0]);
      for (let i = 1; i < xs.length; i++) g.lineTo(xs[i], arr[i]);
      g.stroke();
    }
    // Mittellinie gestrichelt (wandert mit der Spur)
    g.setLineDash([10, 12]);
    g.lineDashOffset = (this.dist * pxPerD) % 22;
    g.strokeStyle = 'rgba(255,255,255,0.16)';
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(xs[0], mid[0]);
    for (let i = 1; i < xs.length; i++) g.lineTo(xs[i], mid[i]);
    g.stroke();
    g.setLineDash([]);
    g.restore();
    // Leiste, auf der die Kugel läuft
    g.save();
    g.strokeStyle = 'rgba(255,255,255,0.13)';
    g.lineWidth = Math.max(3, L.ballR * 0.35);
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(col, c0 - L.ballR * 0.6);
    g.lineTo(col, c1 + L.ballR * 0.6);
    g.stroke();
    g.restore();
  }

  private drawBall(g: CanvasRenderingContext2D, L: Layout): void {
    const x = L.col;
    const y = L.c0 + this.ballN * (L.c1 - L.c0);
    const r = L.ballR;
    const off = this.offK;
    if (off < 0.5) glow(g, x, y, r, ACCENT_LIGHT, 0.8 * (1 - off * 2));
    circle(g, x, y, r, '#FFFFFF');
    circle(g, x, y, r * 0.42, off < 0.5 ? ACCENT : '#92400E');
    if (off >= 0.5) {
      // Neben der Spur: gestrichelter Ring + Pfeil zur Spur (zusätzlich zur Farbe)
      ring(g, x, y, r + 5, OFF, 3, [5, 4]);
      const c = L.c0 + this.roadAt(this.dist) * (L.c1 - L.c0);
      const dir = c < y ? -1 : 1;
      const ay = y + dir * (r + 12);
      const s = Math.max(7, r * 0.5);
      g.save();
      g.fillStyle = OFF;
      g.beginPath();
      g.moveTo(x, ay + dir * s);
      g.lineTo(x - s, ay);
      g.lineTo(x + s, ay);
      g.closePath();
      g.fill();
      g.restore();
    } else {
      ring(g, x, y, r + 3, withAlpha(ACCENT_LIGHT, 0.9), 2.5);
    }
  }

  private drawSigns(g: CanvasRenderingContext2D, L: Layout, t: number): void {
    const { win, sym } = L;
    fillRRc(g, win, win.w * 0.16, 'rgba(3,8,18,0.55)');
    g.save();
    rrPath(g, win.x + 0.5, win.y + 0.5, win.w - 1, win.h - 1, win.w * 0.16);
    g.strokeStyle = 'rgba(255,255,255,0.16)';
    g.lineWidth = 1.5;
    g.stroke();
    g.restore();
    const cx = win.x + win.w / 2;
    const cy = win.y + win.h / 2;
    const tr = this.trial;
    if (tr && t >= tr.onset && t - tr.onset < tr.show) {
      // gleiche Fläche für Kreis und Quadrat → nur die Form unterscheidet
      if (tr.shape === 0) circle(g, cx, cy, sym / 2, '#FFFFFF');
      else {
        const s = sym * 0.886;
        g.fillStyle = '#FFFFFF';
        g.fillRect(cx - s / 2, cy - s / 2, s, s);
      }
    } else {
      circle(g, cx, cy, Math.max(2, sym * 0.05), 'rgba(255,255,255,0.22)');
    }
    const fb = this.fb && t < this.fb.until ? this.fb : null;
    const active = this.kind === 'soloB' || this.kind === 'dual';
    const u = this.ctx.stage.u;
    for (let i = 0; i < 2; i++) {
      const R = L.btns[i];
      let state: ButtonState = active || this.kind === 'introB' || this.kind === 'introD' ? 'normal' : 'disabled';
      let badge: 'ok' | 'bad' | null = null;
      let outline = false;
      if (fb) {
        if (i === fb.chosen) {
          state = fb.ok ? 'good' : 'bad';
          badge = fb.ok ? 'ok' : 'bad';
        } else if (i === fb.correct) {
          outline = true;
          badge = 'ok';
        }
      } else if (t - this.pressT[i] < PRESS_MS) state = 'active';
      button(g, R, state);
      if (outline) {
        g.save();
        rrPath(g, R.x - 2.5, R.y - 2.5, R.w + 5, R.h + 5, Math.min(R.w, R.h) * 0.22 + 2.5);
        g.strokeStyle = C.good;
        g.lineWidth = 3.5;
        g.stroke();
        g.restore();
      }
      const ink = state === 'disabled' ? 'rgba(232,238,247,0.34)' : '#FFFFFF';
      const lbl = clamp(u * 2.6, 13, 20);
      const is = Math.min(R.h - lbl * 2.4, R.w * 0.5, 64);
      const icy = R.y + (R.h - lbl * 1.3) / 2;
      if (i === 0) {
        ring(g, R.x + R.w / 2, icy, is * 0.45, ink, Math.max(3, is * 0.1));
      } else {
        const s = is * 0.8;
        g.strokeStyle = ink;
        g.lineWidth = Math.max(3, is * 0.1);
        g.strokeRect(R.x + R.w / 2 - s / 2, icy - s / 2, s, s);
      }
      g.save();
      g.font = font(lbl, 700);
      g.fillStyle = ink;
      g.globalAlpha = state === 'disabled' ? 1 : 0.85;
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.fillText(i === 0 ? this.ctx.texts.feedback.circle : this.ctx.texts.feedback.square, R.x + R.w / 2, R.y + R.h - lbl * 1.05, R.w - 8);
      g.restore();
      if (badge) {
        const rad = clamp(Math.min(R.w, R.h) * 0.13, 9, 15);
        drawBadge(g, R.x + R.w - rad - 6, R.y + rad + 6, rad, badge);
      }
    }
  }

  private drawFingerHint(g: CanvasRenderingContext2D, L: Layout, t: number): void {
    const kind = this.kind;
    if (!this.aActive(kind) || kind === 'introA' || kind === 'introD') return;
    if (t - this.lastFinger < 1200) return;
    const y = L.c0 + this.ballN * (L.c1 - L.c0);
    const pulse = this.ctx.reducedMotion ? 0.5 : 0.5 + 0.5 * Math.sin(t / 260);
    ring(g, L.grip + 10, y, L.ballR * (1.1 + 0.25 * pulse), withAlpha('#FFFFFF', 0.4 + 0.4 * pulse), 3);
    const fs = clamp(this.ctx.stage.u * 3, 14, 22);
    g.save();
    g.font = font(fs, 750);
    const text = this.ctx.texts.feedback.finger;
    const tw = g.measureText(text).width;
    const bx = L.A.x + L.A.w / 2 - tw / 2 - fs * 0.8;
    const bw = tw + fs * 1.6;
    const byy = L.A.y + L.head + 6;
    fillRRc(g, { x: bx, y: byy, w: bw, h: fs * 2 }, fs, 'rgba(255,255,255,0.92)');
    g.fillStyle = '#0F172A';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(text, L.A.x + L.A.w / 2, byy + fs + 1);
    g.restore();
  }

  /** Karte zu Beginn jedes Teils: „Teil 1 von 3“ + Aufgabe (nur Spielmodus) */
  private drawIntroCard(g: CanvasRenderingContext2D, L: Layout, t: number): void {
    const kind = this.kind;
    if (kind !== 'introA' && kind !== 'introB' && kind !== 'introD') return;
    const { texts, stage, reducedMotion } = this.ctx;
    const f = texts.feedback;
    const seg = this.segs[this.si];
    const el = t - this.segT0;
    const n = kind === 'introA' ? 1 : kind === 'introB' ? 2 : 3;
    const main = kind === 'introA' ? f.introTrack : kind === 'introB' ? f.introSign : f.introBoth;
    const sub = kind === 'introD' ? f.prioTrack : null;
    const area: Rect = kind === 'introA' ? L.A : kind === 'introB' ? L.B : { x: 0, y: 0, w: stage.w, h: stage.h };
    const u = stage.u;
    const big = clamp(u * 4.4, 18, 34);
    const small = clamp(u * 2.8, 13, 20);
    const maxW = Math.min(area.w * 0.86, 560);
    g.save();
    g.font = font(big, 800);
    const lines = wrap(g, main, maxW - big * 1.6);
    const tw = Math.max(...lines.map((s) => g.measureText(s).width));
    g.font = font(small, 700);
    const sw = sub ? g.measureText(sub).width : 0;
    const cw = Math.min(maxW, Math.max(tw, sw) + big * 1.6);
    const ch = small * 2.2 + lines.length * big * 1.25 + (sub ? small * 2 : 0) + big * 0.9;
    const cx = area.x + area.w / 2;
    // Teil 1 und 3: oben ins Feld, damit Spur und Kugel frei bleiben (Finger schon auflegen)
    const cy = kind === 'introB' ? area.y + area.h / 2 : Math.max(L.A.y + L.head + ch / 2 + 4, Math.min(L.c0 - ch / 2 - 6, area.y + area.h / 2));
    const a = reducedMotion ? 1 : clamp(el / 200, 0, 1) * clamp((seg.ms - el) / 200, 0, 1);
    g.globalAlpha = a;
    const R = { x: cx - cw / 2, y: cy - ch / 2, w: cw, h: ch };
    fillRRc(g, R, big * 0.7, 'rgba(255,255,255,0.95)');
    let y = R.y + big * 0.5 + small * 0.9;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.font = font(small, 800);
    g.fillStyle = ACCENT;
    g.fillText(f.partOf.replace('{n}', String(n)), cx, y);
    y += small * 1.3 + big * 0.6;
    g.font = font(big, 800);
    g.fillStyle = '#0F172A';
    for (const s of lines) {
      g.fillText(s, cx, y);
      y += big * 1.25;
    }
    if (sub) {
      y += small * 0.4;
      star(g, cx - sw / 2 - small * 0.9, y - small * 0.05, small * 0.55, ACCENT);
      g.font = font(small, 700);
      g.fillStyle = '#334155';
      g.fillText(sub, cx + small * 0.2, y);
    }
    // Fortschritt bis zum Start als dünner Balken
    const k = clamp(el / seg.ms, 0, 1);
    fillRRc(g, { x: R.x + big * 0.7, y: R.y + R.h - 7, w: (R.w - big * 1.4) * (1 - k), h: 3 }, 1.5, withAlpha(ACCENT, 0.6));
    g.restore();
  }
}

// ---------------------------------------------------------------------------
// Hilfsfunktionen

/** Stufen beider Teile in eine Zahl packen: M + D/1000 (siehe Kopfkommentar) */
export function encodeLevel(a: number, b: number): number {
  const M = Math.round(((a + b) / 2) * 10) / 10;
  const D = clamp(Math.round((a - b) * 10) / 10, -19.9, 19.9);
  return Math.round((M + D / 1000) * 10000) / 10000;
}

export function decodeLevel(v: number | null): [number, number] {
  if (v === null || !Number.isFinite(v)) return [MIN_LEVEL, MIN_LEVEL];
  const M = Math.round(v * 10) / 10;
  const D = Math.round((v - M) * 10000) / 10;
  const a = clamp(M + D / 2, MIN_LEVEL, MAX_LEVEL);
  const b = clamp(M - D / 2, MIN_LEVEL, MAX_LEVEL);
  return [Math.round(a * 100) / 100, Math.round(b * 100) / 100];
}

/** Unterkante der Bildunterschrift oben im Intro-Film (gleiche Formel wie im Runner) */
function captionBottom(s: StageInfo): number {
  return s.h * 0.05 + clamp(s.u * 4.6, 14, 30) * 2.1;
}

function fillRRc(g: CanvasRenderingContext2D, R: Rect, r: number, color: string): void {
  rrPath(g, R.x, R.y, R.w, R.h, r);
  g.fillStyle = color;
  g.fill();
}

function dim(g: CanvasRenderingContext2D, R: Rect): void {
  fillRRc(g, { x: R.x - 1, y: R.y - 1, w: R.w + 2, h: R.h + 2 }, 18, 'rgba(6,12,24,0.62)');
}

/** Text auf mehrere Zeilen umbrechen (g.font muss gesetzt sein) */
function wrap(g: CanvasRenderingContext2D, s: string, maxW: number): string[] {
  const words = s.split(' ');
  const lines: string[] = [];
  let cur = '';
  for (const wd of words) {
    const next = cur ? `${cur} ${wd}` : wd;
    if (cur && g.measureText(next).width > maxW) {
      lines.push(cur);
      cur = wd;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
}

/** Kleines weißes Abzeichen mit ✓ (grün) oder ✗ (rot) */
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

export const doppeltGefordert: ExerciseDefinition = {
  id: 'doppelt-gefordert',
  category: 'konzentration',
  minutes: 2,
  color: '#7A5195',
  icon:
    '<path d="M3 17c6-10 12-10 18 0s12 10 18 0" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><circle cx="12" cy="9.5" r="4.6" fill="currentColor"/><circle cx="14" cy="37" r="6.5" fill="currentColor"/><rect x="27.5" y="30.5" width="13" height="13" rx="1.5" fill="currentColor"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new DoppeltGefordert(ctx),
};
