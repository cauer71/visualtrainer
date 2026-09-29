/**
 * Weichensteller – zwischen zwei Regeln umschalten (Aufgabenwechsel mit Hinweisreiz).
 *
 * Ersetzt „Multitasking“ des Vorbilds (docs/wissenschaft/04-konzentration-und-denken.md, Abschnitt 8).
 * - Eine Ziffer (1–4, 6–9) wird nach Regel A „gerade oder ungerade?“ oder Regel B „kleiner oder größer
 *   als 5?“ beurteilt. Gleiche zwei Tasten für beide Regeln (links: gerade/kleiner, rechts:
 *   ungerade/größer) → zweiwertige Reize und Antworten.
 * - Hinweis nie nur über Farbe: Rahmenform (Kreis vs. Quadrat) + Symbol („2/3“ vs. „< 5 >“) + Frage;
 *   zusätzlich passen Form und Beschriftung der Tasten zur Regel. Farbe (Okabe-Ito) nur als Zugabe.
 * - Ablauf: Hinweis → Vorwarnzeit (Cue-Target-Intervall) → Ziffer bis zur Antwort (max. 3 s) →
 *   Rückmeldung → kurze Pause. Reizbeginn = Bild, in dem die Ziffer erstmals gezeichnet wird;
 *   Antworten < 150 ms danach gelten als geraten und werden nicht gewertet.
 * - Sitzung: Kurzblock nur A (5), nur B (5), dann gemischt (24; genau ~50 % Wechsel, zufällig,
 *   höchstens 4 gleiche Regeln in Folge) ≈ 90 s.
 * - Eine Schwierigkeitsskala, Stufe 1–20 (3-down/1-up ≈ 79 %, nur im gemischten Block):
 *   Vorwarnzeit 1000 · 0,75^(L−1) ms (1000 → 100 ms ab Stufe 9) und eine weiche Antwortfrist
 *   2400 · 0,94^(L−1) ms (2400 → 740 ms). „Geschafft“ = richtig und innerhalb der Frist. Die Frist
 *   beendet den Durchgang nicht (die Reaktionszeit bleibt vollständig erhalten); ohne sie würde die
 *   Treppe bei fast allen schon nach ~20 Durchgängen am Anschlag (100 ms) kleben.
 * - Kennwerte: Wechselkosten = Median-RT(Wechsel) − Median-RT(Wiederholung), Mischkosten =
 *   Median-RT(Wiederholung gemischt) − Median-RT(Reinblock); nur richtige Antworten, ohne den ersten
 *   Durchgang eines Blocks und ohne Durchgänge direkt nach einem Fehler.
 * - Hauptwert = Stufe: Differenzwerte wie Wechselkosten sind als persönlicher Einzelwert wenig
 *   zuverlässig (Hedge et al., 2018) und werden deshalb nur als Zusatzwert gezeigt.
 */
import { background, button, C, circle, fillRR, font, hit, ring, rrPath, text, withAlpha, type Rect } from '../../core/draw';
import type { Rng } from '../../core/rng';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, easeOut, median } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, Metric, PointerInfo, StageInfo } from '../../core/types';
import { de, it } from './texts';

const N_PURE = 5;
const N_MIXED = 24;
const QUICK_PURE = 1;
const QUICK_MIXED = 3;
const LEVEL_MIN = 1;
const LEVEL_MAX = 20;
const MAX_RT = 3000;
const ANTICIPATION_MS = 150;
const ITI_MS = 400;
const ERROR_EXTRA_MS = 350;
const FB_OK_MS = 450;
const FB_BAD_MS = 950;
const DIGITS = [1, 2, 3, 4, 6, 7, 8, 9];
/** Okabe-Ito: Himmelblau (Regel A) und Orange (Regel B) – nur zusätzlich zu Form und Wort */
const RULE_COLOR = ['#56B4E9', '#E69F00'] as const;

type Rule = 0 | 1; // 0 = gerade/ungerade (Kreis), 1 = kleiner/größer als 5 (Quadrat)
type Side = 0 | 1; // 0 = links, 1 = rechts
type BlockKind = 'pureA' | 'pureB' | 'mixed';
type Phase = 'banner' | 'iti' | 'cue' | 'target' | 'feedback' | 'done';
type TrialKind = 'first' | 'pure' | 'repeat' | 'switch';

interface PlanItem {
  block: BlockKind;
  rule: Rule;
  digit: number;
  kind: TrialKind;
}

interface Trial extends PlanItem {
  level: number;
  cti: number;
  deadline: number;
  /** tatsächliche Vorwarnzeit (ms, Bildgenau) */
  ctiShown: number;
  rt: number | null;
  answer: Side | null;
  correct: boolean;
  timeout: boolean;
  afterError: boolean;
}

interface Layout {
  cx: number;
  cy: number;
  /** Radius des Kreises (Quadrat: halbe Kantenlänge 0,9 · R → ähnliche Fläche) */
  R: number;
  qy: number;
  fsQ: number;
  badgeH: number;
  btn: [Rect, Rect];
  rest: { x: number; y: number };
  wide: boolean;
}

/** Vorwarnzeit (ms) einer Stufe: 1000 ms → 100 ms (ab Stufe 9) */
export function ctiMs(level: number): number {
  return Math.max(100, Math.round(1000 * 0.75 ** (level - 1)));
}

/** Weiche Antwortfrist (ms) einer Stufe */
export function deadlineMs(level: number): number {
  return Math.round(2400 * 0.94 ** (level - 1));
}

/** Richtige Seite: links = gerade bzw. kleiner, rechts = ungerade bzw. größer */
export function correctSide(rule: Rule, digit: number): Side {
  return rule === 0 ? (digit % 2 === 0 ? 0 : 1) : digit < 5 ? 0 : 1;
}

/**
 * Regelfolge des gemischten Blocks: genau die Hälfte der Übergänge sind Wechsel (bei ungerader Zahl
 * zufällig auf- oder abgerundet), höchstens 4 gleiche Regeln hintereinander.
 */
export function mixedRules(n: number, rng: Rng): Rule[] {
  if (n <= 0) return [];
  const trans = n - 1;
  const nSwitch = trans % 2 === 0 ? trans / 2 : Math.floor(trans / 2) + (rng.chance(0.5) ? 1 : 0);
  const first: Rule = rng.chance(0.5) ? 0 : 1;
  for (let attempt = 0; attempt < 300; attempt++) {
    const sw: boolean[] = [];
    for (let i = 0; i < trans; i++) sw.push(i < nSwitch);
    rng.shuffle(sw);
    let run = 0;
    let ok = true;
    for (const s of sw) {
      run = s ? 0 : run + 1;
      if (run > 3) {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    const out: Rule[] = [first];
    for (const s of sw) out.push((s ? 1 - out[out.length - 1] : out[out.length - 1]) as Rule);
    return out;
  }
  // Sicherheitsnetz: streng abwechselnd mit gelegentlicher Wiederholung
  const out: Rule[] = [first];
  for (let i = 1; i < n; i++) out.push((i % 3 === 0 ? out[i - 1] : 1 - out[i - 1]) as Rule);
  return out;
}

/** Platz, den die Bildunterschrift im Intro-Film unten braucht (wie im Runner berechnet) */
function captionReserve(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return size * 2.1 + s.h * 0.05 + Math.max(6, s.u * 1.5);
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

/** Schriftgröße so wählen, dass der Text in die Breite passt */
function fitSize(g: CanvasRenderingContext2D, s: string, maxW: number, size: number, weight = 700, min = 10): number {
  g.save();
  g.font = font(size, weight);
  const tw = g.measureText(s).width;
  g.restore();
  return tw <= maxW ? size : Math.max(min, (size * maxW) / Math.max(1, tw));
}

// ---------------------------------------------------------------------------

class Weichensteller implements Exercise {
  private readonly demo: boolean;
  private readonly stair: Staircase;
  private plan: PlanItem[] = [];
  private idx = 0;
  private phase: Phase = 'iti';
  private phaseT = 0;
  private phaseMs = 0;
  private bannerBlock: BlockKind = 'pureA';
  private trial: Trial | null = null;
  private trials: Trial[] = [];
  private cueT = 0;
  private onset = 0;
  private period = 1000 / 60;
  private frameIv: number[] = [];
  private lastFrameT = -1;
  private lastEarlyToast = -1e9;
  private early = 0;
  private points = 0;
  private finished = false;
  private ghostPlanned = false;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.stair = new Staircase({ start: ctx.startLevel ?? 3, min: LEVEL_MIN, max: LEVEL_MAX, down: 3, up: 1 });
  }

  // ------------------------------------------------------------------ Planung

  private buildPlan(): PlanItem[] {
    const { rng } = this.ctx;
    if (this.demo) {
      return [
        { block: 'mixed', rule: 0, digit: 4, kind: 'first' },
        { block: 'mixed', rule: 1, digit: 7, kind: 'switch' },
        { block: 'mixed', rule: 0, digit: 3, kind: 'switch' },
      ];
    }
    const nPure = this.ctx.quick ? QUICK_PURE : N_PURE;
    const nMixed = this.ctx.quick ? QUICK_MIXED : N_MIXED;
    const rules: Array<[BlockKind, Rule]> = [];
    for (let i = 0; i < nPure; i++) rules.push(['pureA', 0]);
    for (let i = 0; i < nPure; i++) rules.push(['pureB', 1]);
    for (const r of mixedRules(nMixed, rng)) rules.push(['mixed', r]);
    // Ziffern gleichmäßig aus einem Beutel, nie zweimal dieselbe hintereinander
    let bag: number[] = [];
    let prev = -1;
    const out: PlanItem[] = [];
    rules.forEach(([block, rule], i) => {
      if (!bag.length) bag = rng.shuffle([...DIGITS]);
      let d = bag.pop()!;
      if (d === prev) {
        if (!bag.length) bag = rng.shuffle(DIGITS.filter((x) => x !== d));
        const e = bag.pop()!;
        bag.unshift(d);
        d = e;
      }
      prev = d;
      const first = i === 0 || rules[i - 1][0] !== block;
      const kind: TrialKind = first ? 'first' : block !== 'mixed' ? 'pure' : rules[i - 1][1] === rule ? 'repeat' : 'switch';
      out.push({ block, rule, digit: d, kind });
    });
    return out;
  }

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    this.plan = this.buildPlan();
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateLabel();
    if (this.demo) {
      this.setPhase('iti', t, 700);
      hud.caption(this.ctx.texts.captions.circle);
    } else {
      this.bannerBlock = this.plan[0].block;
      this.setPhase('banner', t, this.bannerMs(this.bannerBlock));
    }
    if (this.ctx.autoplay) {
      const r = this.layout().rest;
      ghost.moveTo(r.x, r.y, { move: this.demo ? 1 : 400 });
    }
  }

  private bannerMs(b: BlockKind): number {
    if (this.ctx.quick) return 600;
    return b === 'pureA' ? 2600 : b === 'pureB' ? 2000 : 2600;
  }

  private setPhase(p: Phase, t: number, ms = 0): void {
    this.phase = p;
    this.phaseT = t;
    this.phaseMs = ms;
  }

  private updateLabel(): void {
    if (this.demo) return;
    const { hud, texts } = this.ctx;
    hud.setLabel(`${texts.feedback.level} ${Math.max(1, Math.floor(this.stair.level + 1e-9))}`);
  }

  // ------------------------------------------------------------------ Layout

  private layout(): Layout {
    const s = this.ctx.stage;
    const { w, u } = s;
    const h = Math.max(80, s.h - (this.demo ? captionReserve(s) : 0));
    // Im Film wird nichts wirklich angetippt: Mindestgrößen dürfen dort mit kleinen Bühnen schrumpfen
    const k = this.demo ? Math.min(1, u / 4.3) : 1;
    const m = Math.max(12, u * 3);
    const fsQ = clamp(u * 4.6, 18 * k, 34);
    const wide = w >= h * 1.2;
    let R: number;
    let cy: number;
    let qy: number;
    let badgeH: number;
    let btn: [Rect, Rect];
    const block = (r: number, bh: number) => fsQ * 1.2 + fsQ * 0.55 + bh / 2 + 2 * r;
    if (wide) {
      R = clamp(Math.min(h * 0.25, w * 0.15), 52 * k, 175);
      badgeH = clamp(R * 0.3, 22 * k, 42);
      while (block(R, badgeH) > h - 2 * m && R > 40 * k) {
        R *= 0.94;
        badgeH = clamp(R * 0.3, 20 * k, 42);
      }
      const top = (h - block(R, badgeH)) / 2;
      qy = top + fsQ * 0.6;
      cy = top + fsQ * 1.75 + badgeH / 2 + R;
      const region = w / 2 - R * 1.35 - m;
      const bw = clamp(region * 0.88, 96 * k, 320);
      const bh = clamp(Math.min(bw * 0.78, h * 0.46), 80 * k, 250);
      const lx = m + (region - bw) / 2;
      const by = clamp(cy - bh / 2 + R * 0.12, m, h - m - bh);
      btn = [
        { x: lx, y: by, w: bw, h: bh },
        { x: w - lx - bw, y: by, w: bw, h: bh },
      ];
    } else {
      const gap = Math.max(12, u * 3);
      const bw = Math.min((w - 2 * m - gap) / 2, 340);
      const bh = clamp(h * 0.17, 84 * k, 200);
      const by = h - m * 1.3 - bh;
      const avail = by - 2 * m;
      R = clamp(Math.min(w * 0.31, (avail - fsQ * 2.2) / 2 / 1.12), 48 * k, 190);
      badgeH = clamp(R * 0.3, 22 * k, 42);
      const top = m + Math.max(0, (avail - block(R, badgeH)) / 2);
      qy = top + fsQ * 0.6;
      cy = top + fsQ * 1.75 + badgeH / 2 + R;
      const x0 = (w - 2 * bw - gap) / 2;
      btn = [
        { x: x0, y: by, w: bw, h: bh },
        { x: x0 + bw + gap, y: by, w: bw, h: bh },
      ];
    }
    const cx = w / 2;
    // Ruheplatz der Hand: unter dem Rahmen, zwischen den Tasten – nicht auf Ziffer oder Bildunterschrift
    const rest = wide ? { x: cx + R * 0.35, y: Math.min(h - m * 0.6, cy + R * 1.25) } : { x: cx, y: Math.min(h - 4, btn[0].y + btn[0].h + m * 0.6) };
    return { cx, cy, R, qy, fsQ, badgeH, btn, rest, wide };
  }

  // ------------------------------------------------------------------ Ablauf

  update(_dt: number, t: number): void {
    if (this.lastFrameT >= 0) {
      const iv = t - this.lastFrameT;
      if (iv > 3 && iv < 70) {
        this.frameIv.push(iv);
        if (this.frameIv.length > 90) this.frameIv.shift();
      }
    }
    this.lastFrameT = t;
    const el = t - this.phaseT;
    switch (this.phase) {
      case 'banner':
        if (el >= this.phaseMs) this.setPhase('iti', t, ITI_MS);
        break;
      case 'iti':
        if (el >= this.phaseMs) this.showCue(t);
        break;
      case 'cue': {
        const tr = this.trial!;
        // Ziffer im Bild, das der Soll-Vorwarnzeit am nächsten liegt
        if (t - this.cueT >= tr.cti - this.period * 0.5) {
          tr.ctiShown = t - this.cueT;
          this.onset = t; // Reizbeginn = dieses Bild (render folgt im selben Frame)
          this.setPhase('target', t);
          this.ghostPlanned = false;
        }
        break;
      }
      case 'target':
        if (t - this.onset >= MAX_RT) this.respond(null, this.onset + MAX_RT);
        break;
      case 'feedback':
        if (el >= this.phaseMs) this.next(t);
        break;
      case 'done':
        if (!this.finished && el >= this.phaseMs) this.finish();
        return;
    }
    if (this.ctx.autoplay) this.autoplay();
  }

  private measurePeriod(): number {
    if (this.frameIv.length < 5) return 1000 / 60;
    return clamp(median(this.frameIv), 4, 50);
  }

  private showCue(t: number): void {
    const p = this.plan[this.idx];
    const level = Math.floor(this.stair.level + 1e-9);
    const prev = this.trials[this.trials.length - 1];
    this.period = this.measurePeriod();
    this.trial = {
      ...p,
      level,
      cti: this.demo ? 1100 : ctiMs(level),
      deadline: this.demo ? MAX_RT : deadlineMs(level),
      ctiShown: 0,
      rt: null,
      answer: null,
      correct: false,
      timeout: false,
      afterError: !!prev && !prev.correct && prev.block === p.block,
    };
    this.cueT = t;
    this.setPhase('cue', t);
    if (this.demo) {
      const c = this.ctx.texts.captions;
      this.ctx.hud.caption(this.idx === 0 ? c.circle : this.idx === 1 ? c.square : c.watch);
    }
  }

  private next(t: number): void {
    this.idx++;
    this.ctx.hud.setProgress(this.idx / this.plan.length);
    this.trial = null;
    if (!this.demo) this.ctx.ghost.clear();
    if (this.idx >= this.plan.length) {
      this.setPhase('done', t, this.demo ? 900 : 500);
      return;
    }
    const nb = this.plan[this.idx].block;
    if (!this.demo && nb !== this.plan[this.idx - 1].block) {
      this.bannerBlock = nb;
      this.setPhase('banner', t, this.bannerMs(nb));
      return;
    }
    const last = this.trials[this.trials.length - 1];
    const extra = last && !last.correct ? ERROR_EXTRA_MS : 0;
    this.setPhase('iti', t, (this.demo ? 700 : ITI_MS) + extra);
  }

  /** Antwort (oder Zeitablauf bei side = null) auswerten */
  private respond(side: Side | null, t: number): void {
    const tr = this.trial;
    if (!tr || this.phase !== 'target') return;
    const { ctx } = this;
    const { hud, sfx, texts } = ctx;
    tr.answer = side;
    tr.timeout = side === null;
    tr.rt = side === null ? null : t - this.onset;
    tr.correct = side !== null && side === correctSide(tr.rule, tr.digit);
    const inTime = tr.correct && tr.rt !== null && tr.rt <= tr.deadline;
    this.trials.push(tr);
    if (!this.demo) {
      if (tr.block === 'mixed') this.stair.update(inTime);
      if (tr.correct) this.points += 10 + tr.level;
      hud.setScore(this.points);
      this.updateLabel();
    }
    const L = this.layout();
    const ty = this.toastY(L);
    const size = clamp(ctx.stage.u * 4.4, 17, 34);
    if (tr.correct) {
      sfx.good();
      if (!inTime) hud.toast(texts.feedback.slow, 'info', { x: L.cx, y: ty, ms: 800, size: size * 0.85 });
    } else {
      sfx.bad();
      const key = tr.timeout ? 'timeout' : tr.rule === 0 ? (tr.digit % 2 === 0 ? 'isEven' : 'isOdd') : tr.digit < 5 ? 'isSmall' : 'isBig';
      hud.toast(texts.feedback[key].replace('{n}', String(tr.digit)), 'bad', { x: L.cx, y: ty, ms: FB_BAD_MS + 150, size });
    }
    this.setPhase('feedback', t, this.demo ? 800 : tr.correct ? FB_OK_MS : FB_BAD_MS);
  }

  // ------------------------------------------------------------------ Eingabe

  keyDown(key: string, t: number): void {
    if (key === 'ArrowLeft') this.answer(0, t);
    else if (key === 'ArrowRight') this.answer(1, t);
  }

  pointerDown(p: PointerInfo): void {
    const L = this.layout();
    for (let i = 0; i < 2; i++) {
      if (hit(L.btn[i], p.x, p.y, Math.max(10, this.ctx.stage.u * 2))) {
        this.answer(i as Side, p.t);
        return;
      }
    }
  }

  private answer(side: Side, t: number): void {
    if (this.phase === 'cue') {
      this.earlyNote(t, 'wait');
      return;
    }
    if (this.phase !== 'target') return; // Doppel-Tipps, Pause zwischen den Durchgängen
    const rt = t - this.onset;
    if (rt < ANTICIPATION_MS) {
      // geraten – nicht werten, die Ziffer bleibt stehen
      this.earlyNote(t, 'early');
      return;
    }
    if (rt > MAX_RT) {
      this.respond(null, this.onset + MAX_RT);
      return;
    }
    this.respond(side, t);
  }

  private earlyNote(t: number, key: 'wait' | 'early'): void {
    this.early++;
    if (t - this.lastEarlyToast < 600) return;
    this.lastEarlyToast = t;
    const L = this.layout();
    this.ctx.hud.toast(this.ctx.texts.feedback[key], 'info', {
      x: L.cx,
      y: this.toastY(L),
      ms: 700,
      size: clamp(this.ctx.stage.u * 3.8, 16, 30),
    });
  }

  /** Rückmeldungen unter dem Rahmen – die Frage oben bleibt lesbar */
  private toastY(L: Layout): number {
    return Math.min(L.cy + L.R + L.fsQ * 1.25, this.ctx.stage.h - L.fsQ);
  }

  // ------------------------------------------------------------------ Geister-Hand

  private autoplay(): void {
    if (this.phase !== 'target' || this.ghostPlanned || !this.trial) return;
    this.ghostPlanned = true;
    const { ghost, rng } = this.ctx;
    const tr = this.trial;
    const L = this.layout();
    const ok = correctSide(tr.rule, tr.digit);
    const at = (s: Side) => ({ x: L.btn[s].x + L.btn[s].w / 2, y: L.btn[s].y + L.btn[s].h * 0.55 });
    if (this.demo) {
      const p = at(ok);
      ghost.tap(p.x, p.y, { delay: 250, move: 550 });
      ghost.moveTo(L.rest.x, L.rest.y, { delay: 350, move: 500 });
      return;
    }
    // Spielmodus (nur Tests): meist richtig, beim Wechsel etwas langsamer und fehleranfälliger
    if (rng.chance(0.03)) return; // Zeitablauf
    const sw = tr.kind === 'switch';
    const side: Side = rng.chance(sw ? 0.88 : 0.94) ? ok : ((1 - ok) as Side);
    const rt = rng.range(480, 950) + (sw ? rng.range(80, 260) : 0);
    const p = at(side);
    ghost.tap(p.x, p.y, { delay: Math.max(0, rt - 220), move: 220 });
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    const L = this.layout();
    const tr = this.trial;
    if (this.phase === 'banner') {
      this.drawBanner(g, L);
      return;
    }
    const cueTr = tr && (this.phase === 'cue' || this.phase === 'target' || this.phase === 'feedback') ? tr : null;
    if (cueTr) {
      const a = this.ctx.reducedMotion ? 1 : clamp((t - this.cueT) / 120, 0, 1);
      this.drawCue(g, L, cueTr.rule, a, true);
      if (this.phase !== 'cue') this.drawDigit(g, L, cueTr, t);
    } else {
      // Pause zwischen den Durchgängen: nur ein ruhiger Punkt in der Mitte
      g.save();
      g.globalAlpha = 0.75;
      circle(g, L.cx, L.cy, Math.max(3, this.ctx.stage.u * 0.8), C.fg);
      g.restore();
    }
    this.drawButtons(g, L, cueTr ? cueTr.rule : null);
  }

  private drawCue(g: CanvasRenderingContext2D, L: Layout, rule: Rule, alpha: number, question: boolean, at?: { x: number; y: number; R: number }): void {
    const { u } = this.ctx.stage;
    const { texts } = this.ctx;
    const col = RULE_COLOR[rule];
    const cx = at?.x ?? L.cx;
    const cy = at?.y ?? L.cy;
    const R = at?.R ?? L.R;
    const lw = Math.max(3, R * 0.07);
    g.save();
    g.globalAlpha = alpha;
    let topEdge: number;
    if (rule === 0) {
      circle(g, cx, cy, R, withAlpha(col, 0.08));
      ring(g, cx, cy, R - lw / 2, col, lw);
      topEdge = cy - R + lw / 2;
    } else {
      const s = R * 0.9;
      fillRR(g, cx - s, cy - s, 2 * s, 2 * s, Math.max(2, R * 0.04), withAlpha(col, 0.08));
      g.save();
      rrPath(g, cx - s + lw / 2, cy - s + lw / 2, 2 * s - lw, 2 * s - lw, Math.max(2, R * 0.03));
      g.strokeStyle = col;
      g.lineWidth = lw;
      g.stroke();
      g.restore();
      topEdge = cy - s + lw / 2;
    }
    // Symbol-Plakette auf der oberen Kante (Form der Plakette folgt dem Rahmen)
    const sym = rule === 0 ? texts.feedback.symA : texts.feedback.symB;
    const bh = at ? Math.max(16, R * 0.34) : L.badgeH;
    const fs = bh * 0.62;
    g.font = font(fs, 800);
    const bw = g.measureText(sym).width + bh * 0.9;
    fillRR(g, cx - bw / 2, topEdge - bh / 2, bw, bh, rule === 0 ? bh / 2 : Math.max(2, bh * 0.12), col);
    text(g, sym, cx, topEdge + 1, fs, '#0B1424', { weight: 800 });
    if (question) {
      const q = rule === 0 ? texts.feedback.ruleA : texts.feedback.ruleB;
      const qs = fitSize(g, q, this.ctx.stage.w - 2 * Math.max(12, u * 3), L.fsQ, 800);
      text(g, q, cx, L.qy, qs, C.fg, { weight: 800 });
    }
    g.restore();
  }

  private drawDigit(g: CanvasRenderingContext2D, L: Layout, tr: Trial, t: number): void {
    const pop = this.ctx.reducedMotion ? 1 : 0.86 + 0.14 * easeOut((t - this.onset) / 90);
    const fs = L.R * 1.05 * pop;
    let color: string = C.white;
    if (this.phase === 'feedback') color = tr.correct ? '#BBF7D0' : '#FECACA';
    text(g, String(tr.digit), L.cx, L.cy + fs * 0.04, fs, color, { weight: 800 });
  }

  private drawButtons(g: CanvasRenderingContext2D, L: Layout, rule: Rule | null, forBanner = false): void {
    const { u } = this.ctx.stage;
    const { texts } = this.ctx;
    const fb = this.phase === 'feedback' ? this.trial : null;
    for (const i of [0, 1] as Side[]) {
      const r = L.btn[i];
      const chosen = !!fb && fb.answer === i;
      const state = fb && chosen ? (fb.correct ? 'good' : 'bad') : rule === null ? 'disabled' : 'normal';
      const radius = rule === 0 ? Math.min(r.h, r.w) / 2 : rule === 1 ? Math.max(4, u * 0.7) : Math.min(r.h, r.w) * 0.22;
      button(g, r, state, radius);
      if (rule !== null) {
        g.save();
        rrPath(g, r.x + 1.5, r.y + 1.5, r.w - 3, r.h - 3, Math.max(0, radius - 1.5));
        g.strokeStyle = withAlpha(RULE_COLOR[rule], forBanner ? 0.6 : 0.85);
        g.lineWidth = Math.max(2.5, u * 0.45);
        g.stroke();
        g.restore();
        const main = rule === 0 ? (i === 0 ? texts.feedback.even : texts.feedback.odd) : i === 0 ? texts.feedback.small : texts.feedback.big;
        const sub = rule === 1 ? (i === 0 ? texts.feedback.smallSub : texts.feedback.bigSub) : null;
        const fs = fitSize(g, main, r.w * 0.8, clamp(Math.min(r.h * 0.3, r.w * 0.2), 18, 46), 800, 14);
        const cy = r.y + r.h / 2 - (sub ? fs * 0.38 : 0);
        text(g, main, r.x + r.w / 2, cy, fs, C.white, { weight: 800 });
        if (sub) text(g, sub, r.x + r.w / 2, cy + fs * 1.05, fs * 0.75, withAlpha(C.fg, 0.8), { weight: 800 });
      }
      // Tastatur-Hinweis (Pfeil) dezent in der unteren Ecke
      if (!this.demo) {
        const as = clamp(u * 2.4, 12, 18);
        text(g, i === 0 ? '←' : '→', i === 0 ? r.x + as * 1.1 : r.x + r.w - as * 1.1, r.y + r.h - as * 0.95, as, C.faint, { weight: 700 });
      }
      if (fb && chosen) badge(g, r.x + r.w - Math.max(11, u * 1.9) * 0.3, r.y + Math.max(11, u * 1.9) * 0.3, Math.max(11, u * 1.9), fb.correct);
      if (fb && !chosen && !fb.correct && i === correctSide(fb.rule, fb.digit)) {
        // richtige Taste zeigen
        g.save();
        rrPath(g, r.x - 3, r.y - 3, r.w + 6, r.h + 6, radius + 3);
        g.strokeStyle = C.good;
        g.lineWidth = 4;
        g.stroke();
        g.restore();
      }
    }
  }

  /** Blockbeginn: Regel(n) vorstellen */
  private drawBanner(g: CanvasRenderingContext2D, L: Layout): void {
    const { texts, stage } = this.ctx;
    const b = this.bannerBlock;
    const maxW = stage.w - 2 * Math.max(12, stage.u * 3);
    if (b === 'mixed') {
      const title = texts.feedback.mixed;
      text(g, title, L.cx, L.qy, fitSize(g, title, maxW, L.fsQ, 800), C.fg, { weight: 800 });
      // beide Regeln nebeneinander
      const r = L.R * 0.5;
      const dx = Math.min(L.R * 0.95, stage.w * 0.22);
      const lab = clamp(stage.u * 3, 13, 22);
      for (const rule of [0, 1] as Rule[]) {
        const x = L.cx + (rule === 0 ? -dx : dx);
        const y = L.cy - L.R * 0.12;
        this.drawCue(g, L, rule, 1, false, { x, y, R: r });
        const q = rule === 0 ? texts.feedback.ruleA : texts.feedback.ruleB;
        const fs = fitSize(g, q, dx * 1.9, lab, 700, 11);
        text(g, q, x, y + r + fs * 1.3, fs, C.dim, { weight: 700 });
      }
      this.drawButtons(g, L, null, true);
      return;
    }
    const rule: Rule = b === 'pureA' ? 0 : 1;
    this.drawCue(g, L, rule, 1, true);
    const msg = b === 'pureA' ? texts.feedback.pureA : texts.feedback.pureB;
    // Hinweis in der Mitte des Rahmens (zweizeilig, falls nötig)
    const fs = clamp(L.R * 0.16, 13, 24);
    const words = msg.split(' ');
    const lines: string[] = [];
    g.save();
    g.font = font(fs, 700);
    let cur = '';
    for (const wd of words) {
      const tryS = cur ? `${cur} ${wd}` : wd;
      if (g.measureText(tryS).width > L.R * 1.55 && cur) {
        lines.push(cur);
        cur = wd;
      } else cur = tryS;
    }
    if (cur) lines.push(cur);
    g.restore();
    lines.forEach((ln, i) => text(g, ln, L.cx, L.cy + (i - (lines.length - 1) / 2) * fs * 1.3, fs, C.dim, { weight: 700 }));
    this.drawButtons(g, L, rule, true);
  }

  // ------------------------------------------------------------------ Ergebnis

  private finish(): void {
    const { ctx } = this;
    this.finished = true;
    ctx.ghost.clear();
    if (this.demo) {
      ctx.finish({ primary: { key: 'level', value: 1, unit: 'level', better: 'higher' }, secondary: [], score: 0, level: 1 });
      return;
    }
    const all = this.trials;
    const valid = all.filter((x) => x.correct && x.rt !== null && x.kind !== 'first' && !x.afterError);
    const rts = (k: TrialKind) => valid.filter((x) => x.kind === k).map((x) => x.rt!);
    const sw = rts('switch');
    const rep = rts('repeat');
    const pure = rts('pure');
    const switchCost = sw.length >= 3 && rep.length >= 3 ? median(sw) - median(rep) : null;
    const mixCost = rep.length >= 3 && pure.length >= 3 ? median(rep) - median(pure) : null;
    const accuracy = all.length ? (100 * all.filter((x) => x.correct).length) / all.length : 0;
    const mixed = all.filter((x) => x.block === 'mixed');
    const mixedAcc = mixed.length ? mixed.filter((x) => x.correct).length / mixed.length : 1;
    const inTime = mixed.length ? mixed.filter((x) => x.correct && x.rt !== null && x.rt <= x.deadline).length / mixed.length : 1;
    const thr = this.stair.threshold();
    const lastLevel = Math.floor(this.stair.level + 1e-9);
    let tip = 'great';
    if (mixedAcc < 0.8) tip = 'frame';
    else if (switchCost !== null && switchCost > 300) tip = 'prepare';
    else if (inTime < 0.65) tip = 'tempo';
    const secondary: Metric[] = [
      { key: 'accuracy', value: Math.round(accuracy), unit: 'percent' },
      ...(switchCost !== null ? [{ key: 'switchCost', value: Math.round(switchCost), unit: 'msSigned' as const }] : []),
      ...(mixCost !== null ? [{ key: 'mixCost', value: Math.round(mixCost), unit: 'msSigned' as const }] : []),
      { key: 'lead', value: ctiMs(lastLevel), unit: 'ms' },
    ];
    ctx.sfx.done();
    ctx.finish({
      primary: { key: 'level', value: clamp(Math.round(thr), LEVEL_MIN, LEVEL_MAX), unit: 'level', better: 'higher' },
      secondary,
      score: this.points,
      level: nextStartLevel(thr, LEVEL_MIN, LEVEL_MAX),
      tip,
    });
  }
}

export const weichensteller: ExerciseDefinition = {
  id: 'weichensteller',
  category: 'konzentration',
  minutes: 2,
  color: '#7A5195',
  showsLevel: true,
  icon:
    '<path d="M24 45V31M24 31 13.5 18.5M24 31l10.5-12.5" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10.5" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="3.2"/><rect x="31" y="4" width="14" height="14" rx="1.5" fill="none" stroke="currentColor" stroke-width="3.2"/>',
  texts: { de, it },
  create: (ctx) => new Weichensteller(ctx),
};
