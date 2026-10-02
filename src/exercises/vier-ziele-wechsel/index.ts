/**
 * 4-Ziele-Wechsel – die Vier-Tafel-Übung (Hart-Chart-Verfahren, Katalog 905).
 *
 * Aufbau: In den vier Ecken steht je eine Tafel, ein Raster aus Buchstaben (Zeilen × Spalten), im Aussehen einer
 * Hart-Chart (heller Karton, dunkle Buchstaben). Die Tafeln sind gleich groß, enthalten aber verschieden
 * gemischte Buchstaben (`ctx.rng`).
 *
 * Leseregel (Kern, logic.ts `Reader`): ein Buchstabe von jeder Tafel im Wechsel – Position p der ersten Tafel,
 * Position p der zweiten, dritten, vierten Tafel, dann Position p + 1 der ersten … bis alle Buchstaben gelesen
 * sind. Im Original wird laut vorgelesen; auf dem Tablet tippt man die Buchstaben in dieser Reihenfolge an. Getippte
 * Buchstaben werden blass (bleiben sichtbar wie beim Zahlen-Buchstaben-Wirbel); der nächste Buchstabe jeder Tafel
 * ist damit immer der erste nicht blasse. Ein falscher Buchstabe (jeder andere als der erwartete) ist ein Fehler
 * (weiches ✗, kein Strafabzug), der erwartete bleibt gesucht. Ein Tipp neben die Tafeln zählt nicht.
 *
 * - Führung (abnehmend, logic.ts `LEVELS`): zuerst ein Ring um den nächsten Buchstaben, dann ein Ring um die
 *   nächste Tafel, zuletzt keine (nur die Regel; die blassen Buchstaben zeigen den Stand). Die Ringe blinken nie,
 *   sie wechseln weich (Überblendung 160–180 ms).
 * - Stufen 1–15: je Schritt ändert sich genau ein Parameter (Abstand der Tafeln, Tafelgröße, Buchstabengröße,
 *   Führung, Reihenfolge, Wechsel-Granularität, Buchstabenvorrat). Eine Sitzung = 3 Runden (Schnellmodus: 2 Runden
 *   mit je 8 Buchstaben); nach jeder Runde (alle vier Tafeln gelesen) gilt die Regel ≥ 90 % richtig und
 *   gleichmäßige Zeit → eine Stufe schwerer, 75–89 % gleich, < 75 % eine Stufe leichter. Hauptwert = erreichte Stufe.
 * - Zwischen den Runden eine kurze Pause (Vorschlag 10 s, durch „Weiter“ beendbar).
 * - Gemessen wird nur die Zeit von Tipp zu Tipp (der erste Tipp einer Runde zählt nicht als Zeit; Runden mit einem
 *   Fehler vor dem Treffer gehen nicht in die Zeitmittel ein). Der Blick selbst wird nicht gemessen. Auswertung:
 *   Zeit je Buchstabe, Dauer und Fehler je Runde, erste gegen letzte Hälfte, Tafelwechsel nach Richtung
 *   (→ ← ↓ ↑ ↘ ↖ ↗ ↙, Mittel ab 8 gültigen Wechseln) und bei Wechsel nach 2 Buchstaben die „Sprungkosten“
 *   (Tafelwechsel gegen Zeit innerhalb derselben Tafel; nur Vergleich mit früher).
 * - Rückmeldung weich: richtig = Buchstabe wird blass + kurzer Ring, falsch = ✗ am Ort; kein Rot, kein Blitz.
 * - Auf kleinen Bühnen (Handy) schrumpft das Raster, damit jede Zelle (= Zielfläche eines Buchstabens) mindestens
 *   50 px groß bleibt; das Raster einer Runde ändert sich beim Drehen nicht, nur die Zellgröße folgt.
 */
import { background, circle, fillRR, font as fontOf, glow, ring, rrPath, text, withAlpha } from '../../core/draw';
import { nextStartLevel } from '../../core/staircase';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, PointerInfo, ResultDetailRow, ResultDetailTable } from '../../core/types';
import { captionTop, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import {
  applyMove,
  ARROW,
  BEAT_CHOICES,
  BEAT_DEFAULT,
  BEAT_START_MS,
  beatMsFor,
  cellAt,
  cellRect,
  DIRECTIONS,
  DOUBLE_TAP_MS,
  evalRound,
  fitGrid,
  gridOfPos,
  layoutFor,
  levelOf,
  makeCharts,
  MAX_LEVEL,
  MIN_CELL_PX,
  MIN_FOR_DIRECTION,
  MIN_LEVEL,
  moveFor,
  onBeat,
  paramsFor,
  pointsFor,
  Reader,
  reachedLevel,
  roundPlan,
  roundRecord,
  summarize,
  tipFor,
  type Cell,
  type Layout,
  type LevelParams,
  type RoundLog,
  type RoundRec,
  type StepRec,
} from './logic';
import { de, it } from './texts';

const APPEAR_MS = 260;
const RING_FADE_MS = 170;
const BURST_MS = 300;
const MARK_MS = 850;
/** Tipps in den ersten Millisekunden einer Runde sind meist der Rest vom „Weiter“-Tipp */
const LOCK_MS = 400;

// Farben: Hart-Chart-Karton und Tinte; blasse Buchstaben = dieselbe Tinte mit wenig Deckkraft
const PAPER = '#E9EEF6';
const PAPER_EDGE = '#B9C6D8';
const INK = '#0F1A2B';
const PALE_ALPHA = 0.2;
const RING_ON_PAPER = '#1F6FD1';
const FRAME = '#7DB9F5';
const ACCENT = '#5AA9F0';
const DIM = '#8A9BB5';
const LIGHT = '#F4F7FC';

// Intro-Film: Stufe 1 (Buchstabenring), erste Runde im Uhrzeigersinn, ein falscher Tipp
const DEMO_TAPS = 10;
const DEMO_WRONG_AT = 6;
const DEMO_START_MS = 1500;
const DEMO_CAPTIONS: Record<number, string> = { 0: 'ring', 2: 'first', 4: 'again', 8: 'pale' };

type Phase = 'read' | 'rest' | 'done';

interface Burst {
  x: number;
  y: number;
  r: number;
  t0: number;
}
interface Mark {
  x: number;
  y: number;
  s: number;
  t0: number;
}
interface RingTarget {
  key: string;
  kind: 'letter' | 'chart';
  chart: number;
  pos: number;
}

const tpl = (s: string, vars: Record<string, string | number>): string => s.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ''));

class VierZieleWechsel implements Exercise {
  private readonly demo: boolean;
  private readonly plan: ReturnType<typeof roundPlan>;
  private phase: Phase = 'read';
  private level: number;
  private pendingLevel: number | null = null;
  private maxPlayedLevel: number;
  private roundIdx = 0;
  private rp: LevelParams;
  private cols = 3;
  private rows = 3;
  private letters: string[][] = [];
  private reader = new Reader(1, 1, 'cw');
  private steps: StepRec[] = [];
  private roundFrom = 0;
  private roundLog: RoundLog[] = [];
  private roundRecs: RoundRec[] = [];
  private roundT0 = 0;
  private firstTapT: number | null = null;
  private lastCorrectT: number | null = null;
  private lastTapT = -1e9;
  private pendingErrors = 0;
  private restStart = 0;
  private restPlanned = false;
  private points = 0;
  private bursts: Burst[] = [];
  private marks: Mark[] = [];
  private ringNow: RingTarget | null = null;
  private ringPrev: RingTarget | null = null;
  private ringT0 = -1e9;
  private hintGoneT = Infinity;
  private lastLabel = '';
  private endT = Infinity;
  private endAt = Infinity;
  private autoAt = 0;
  private demoWrongDone = false;
  private layCache: { key: string; lay: Layout } | null = null;
  /** Takt (Option): Abstand der Schläge in ms, 0 = aus; Schläge bei beatT0 + k · beatMs */
  private readonly beatMs: number;
  private readonly beatChoice: string;
  private beatT0 = 0;
  private beatIdx = -1;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.plan = roundPlan(ctx.quick);
    this.level = this.demo ? MIN_LEVEL : levelOf(ctx.startLevel ?? MIN_LEVEL);
    this.maxPlayedLevel = this.level;
    this.rp = paramsFor(this.level);
    // Takt nur im echten Spiel; Intro-Film und Autoplay laufen immer ohne
    const bo = ctx.options?.metronome;
    this.beatMs = !this.demo && !ctx.autoplay && bo?.on ? beatMsFor(bo.choice) : 0;
    this.beatChoice = bo?.choice ?? '';
  }

  // --- Geometrie: immer live aus der Bühne ---

  private fieldH(): number {
    const s = this.ctx.stage;
    return this.demo ? captionTop(s) - 6 : s.h;
  }

  private lay(): Layout {
    const s = this.ctx.stage;
    const h = this.fieldH();
    const key = `${Math.round(s.w)}x${Math.round(h)}:${s.u.toFixed(2)}:${this.rp.level}:${this.cols}x${this.rows}`;
    if (!this.layCache || this.layCache.key !== key) {
      this.layCache = { key, lay: layoutFor(s.w, h, s.u, this.rp.size, this.rp.reach, this.cols, this.rows, this.rp.scan) };
    }
    return this.layCache.lay;
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost, stage } = this.ctx;
    hud.setProgress(0);
    hud.setScore(null);
    this.beginRound(t);
    if (this.demo) {
      ghost.moveTo(stage.w / 2, this.fieldH() / 2, { move: 0 });
      hud.caption(this.ctx.texts.captions.start);
      this.autoAt = t + DEMO_START_MS;
    }
  }

  private beginRound(t: number): void {
    const s = this.ctx.stage;
    this.phase = 'read';
    this.rp = paramsFor(this.demo ? MIN_LEVEL : this.level);
    // Intro-Film: kleine Bühne im Kartenformat, die Hand tippt nur, daher darf die Zelle kleiner sein
    const g = fitGrid(s.w, this.fieldH(), s.u, this.rp.cols, this.rp.rows, this.demo ? 16 : MIN_CELL_PX);
    this.cols = g.cols;
    this.rows = g.rows;
    const n = g.cols * g.rows;
    this.letters = makeCharts(this.ctx.rng, this.rp.chars, n);
    this.reader = new Reader(n, this.rp.gran, this.rp.order);
    this.roundFrom = this.steps.length;
    this.roundT0 = t;
    this.firstTapT = null;
    this.lastCorrectT = null;
    this.pendingErrors = 0;
    this.bursts = [];
    this.marks = [];
    this.ringNow = this.ringTarget();
    this.ringPrev = null;
    this.ringT0 = t;
    this.hintGoneT = Infinity;
    this.autoAt = t + (this.ctx.quick ? 600 : 1500);
    this.beatT0 = t + BEAT_START_MS;
    this.beatIdx = -1;
    this.layCache = null;
    this.updateLabel();
  }

  update(dt: number, t: number): void {
    void dt;
    if (this.phase === 'done') return;
    if (this.demo && t >= this.endAt) {
      this.finishSession(t);
      return;
    }
    if (this.phase === 'rest') {
      if (t - this.restStart >= this.plan.restMs) this.endRest(t);
      else if (this.ctx.autoplay) this.autoRest(t);
      this.updateProgress();
      this.prune(t);
      return;
    }
    if (!this.demo && t - this.roundT0 >= this.plan.capMs) {
      this.endRound(t);
      return;
    }
    if (this.beatMs) this.tickBeat(t);
    if (this.ctx.autoplay) this.autoUpdate(t);
    this.updateProgress();
    this.prune(t);
  }

  /** Leiser, gleichmäßiger Taktschlag (nur Ton, kein Lichtreiz); höchstens einer je Frame */
  private tickBeat(t: number): void {
    if (t < this.beatT0) return;
    const idx = Math.floor((t - this.beatT0) / this.beatMs);
    if (idx > this.beatIdx) {
      this.beatIdx = idx;
      this.ctx.sfx.beat?.();
    }
  }

  // --- Führung ---

  /** Wohin der Ring zeigt (Stufe mit Buchstaben- oder Tafelring und eindeutigem nächsten Buchstaben), sonst null */
  private ringTarget(): RingTarget | null {
    if (this.rp.guide === 'none' || this.reader.finished) return null;
    const c = this.reader.next();
    if (!c) return null;
    if (this.rp.guide === 'chart') return { key: `chart:${c.chart}`, kind: 'chart', chart: c.chart, pos: c.pos };
    return { key: `letter:${c.chart}:${c.pos}`, kind: 'letter', chart: c.chart, pos: c.pos };
  }

  private refreshRing(t: number): void {
    const nt = this.ringTarget();
    if ((nt?.key ?? '') === (this.ringNow?.key ?? '')) {
      if (nt) this.ringNow = nt;
      return;
    }
    this.ringPrev = this.ringNow;
    this.ringNow = nt;
    this.ringT0 = t;
  }

  // --- Eingabe und Wertung ---

  pointerDown(p: PointerInfo): void {
    if (this.phase === 'rest') {
      this.restTap(p);
      return;
    }
    if (this.phase !== 'read' || this.reader.finished) return;
    if (p.t - this.roundT0 < LOCK_MS || p.t - this.lastTapT < DOUBLE_TAP_MS) return;
    const lay = this.lay();
    const cell = cellAt(lay, p.x, p.y);
    if (!cell) return; // Tipp ins Leere: ohne Wirkung
    this.lastTapT = p.t;
    if (this.reader.accept(cell)) this.hit(cell, p.t, lay);
    else this.miss(cell, p, lay);
  }

  private hit(cell: Cell, t: number, lay: Layout): void {
    const from = this.steps.length > this.roundFrom ? this.steps[this.steps.length - 1].chart : null;
    const rt = this.lastCorrectT === null ? null : t - this.lastCorrectT;
    const rec: StepRec = {
      round: this.roundIdx,
      index: this.steps.length - this.roundFrom,
      level: this.demo ? MIN_LEVEL : this.level,
      chart: cell.chart,
      pos: cell.pos,
      from,
      gran: this.rp.gran,
      rt,
      errors: this.pendingErrors,
      ...(this.beatMs ? { onBeat: onBeat(t, this.beatT0, this.beatMs) } : {}),
    };
    this.steps.push(rec);
    if (!this.demo) this.points += pointsFor(rec.level, rec.errors === 0 ? rt : null);
    this.pendingErrors = 0;
    if (this.firstTapT === null) {
      this.firstTapT = t;
      this.hintGoneT = t;
    }
    this.lastCorrectT = t;
    this.ctx.sfx.good();
    const r = cellRect(lay, cell.chart, cell.pos);
    this.bursts.push({ x: r.cx, y: r.cy, r: lay.cell * 0.46, t0: t });
    this.refreshRing(t);
    if (this.demo) {
      if (this.reader.count >= DEMO_TAPS) this.endAt = t + 1200;
      return;
    }
    if (this.reader.finished || this.reader.count >= this.plan.capSteps) this.endRound(t);
  }

  private miss(cell: Cell, p: PointerInfo, lay: Layout): void {
    this.pendingErrors++;
    this.ctx.sfx.bad();
    const r = cellRect(lay, cell.chart, cell.pos);
    this.marks.push({ x: r.cx, y: r.cy, s: Math.max(11, lay.cell * 0.28), t0: p.t });
    if (this.demo) this.ctx.hud.caption(this.ctx.texts.captions.wrong);
  }

  // --- Runden ---

  private endRound(t: number): void {
    const mine = this.steps.slice(this.roundFrom);
    const st = evalRound(mine);
    const dur = Math.max(0, t - (this.firstTapT ?? t));
    this.roundRecs.push(roundRecord(mine, this.roundIdx, this.level, dur));
    this.roundLog.push({ level: this.level, accuracy: st.accuracy });
    this.pendingLevel = applyMove(this.level, moveFor(st));
    this.roundIdx++;
    if (this.roundIdx >= this.plan.rounds) {
      this.finishSession(t);
      return;
    }
    this.phase = 'rest';
    this.restStart = t;
    this.restPlanned = false;
    this.updateLabel();
  }

  private restButton(): { x: number; y: number; w: number; h: number } {
    const { w, h, u } = this.ctx.stage;
    const bw = clamp(u * 38, 210, 340);
    const bh = Math.max(64, u * 9);
    return { x: (w - bw) / 2, y: h * 0.62, w: bw, h: bh };
  }

  private restTap(p: PointerInfo): void {
    if (p.t - this.restStart < 900) return; // der letzte Tipp der Runde soll nicht gleich „Weiter“ auslösen
    const b = this.restButton();
    if (p.x >= b.x - 10 && p.x <= b.x + b.w + 10 && p.y >= b.y - 10 && p.y <= b.y + b.h + 10) this.endRest(p.t);
  }

  private endRest(t: number): void {
    this.ctx.sfx.tick();
    this.lastTapT = t;
    if (this.pendingLevel !== null) {
      this.level = this.pendingLevel;
      this.maxPlayedLevel = Math.max(this.maxPlayedLevel, this.level);
      this.pendingLevel = null;
    }
    this.beginRound(t);
  }

  private updateLabel(): void {
    if (this.demo) return;
    const fb = this.ctx.texts.feedback;
    const n = Math.min(this.roundIdx + 1, this.plan.rounds);
    // schmale Bühne (Handy): kurze Fassung, damit die Kopfleiste nichts abschneidet
    const lv = this.phase === 'rest' && this.pendingLevel !== null ? this.pendingLevel : this.level;
    const s = this.ctx.stage.w < 520 ? `${fb.level} ${lv} · ${n}/${this.plan.rounds}` : `${tpl(fb.round, { n, m: this.plan.rounds })} · ${fb.level} ${lv}`;
    if (s !== this.lastLabel) {
      this.lastLabel = s;
      this.ctx.hud.setLabel(s);
    }
  }

  private updateProgress(): void {
    if (this.demo) {
      this.ctx.hud.setProgress(clamp(this.reader.count / DEMO_TAPS, 0, 1));
      return;
    }
    const inRound = this.phase === 'rest' ? 0 : clamp(this.reader.count / Math.min(this.reader.total, this.plan.capSteps), 0, 1);
    this.ctx.hud.setProgress(clamp((this.roundIdx + inRound) / this.plan.rounds, 0, 1));
  }

  private prune(t: number): void {
    if (this.bursts.length) this.bursts = this.bursts.filter((b) => t - b.t0 < BURST_MS);
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
  }

  // --- Autoplay (Tests) und Intro-Film: die Geister-Hand tippt ---

  private autoUpdate(t: number): void {
    const { ghost, rng } = this.ctx;
    if (!ghost.idle || t < this.autoAt || this.reader.finished) return;
    if (this.demo && this.reader.count >= DEMO_TAPS) return;
    const exp = this.reader.expected();
    if (!exp.length) return;
    const lay = this.lay();
    if (this.demo) {
      const k = this.reader.count;
      const cap = DEMO_CAPTIONS[k];
      if (cap) this.ctx.hud.caption(this.ctx.texts.captions[cap]);
      let target = exp[0];
      let delay = k === 0 ? 400 : 100;
      if (k === DEMO_WRONG_AT && !this.demoWrongDone) {
        // ein falscher Tipp: der Nachbar-Buchstabe derselben Tafel
        this.demoWrongDone = true;
        target = { chart: exp[0].chart, pos: Math.min(this.reader.n - 1, exp[0].pos + 1) };
        if (target.pos === exp[0].pos) target = { chart: exp[0].chart, pos: Math.max(0, exp[0].pos - 1) };
        delay = 300;
      }
      const r = cellRect(lay, target.chart, target.pos);
      ghost.tap(r.cx, r.cy, { delay, move: k === 0 ? 600 : 450 });
      return;
    }
    // selten ein falscher Buchstabe, sonst der erwartete (bei freier Wahl eine zufällige noch offene Tafel)
    let target: Cell = rng.pick(exp);
    if (rng.chance(0.06)) {
      const wrong = this.randomOther(exp);
      if (wrong) target = wrong;
    }
    const r = cellRect(lay, target.chart, target.pos);
    const jit = lay.cell * 0.07;
    const dx = clamp(rng.normal() * jit, -lay.cell * 0.3, lay.cell * 0.3);
    const dy = clamp(rng.normal() * jit, -lay.cell * 0.3, lay.cell * 0.3);
    ghost.tap(r.cx + dx, r.cy + dy, { delay: rng.range(120, 380), move: rng.range(260, 420) });
  }

  private randomOther(exp: readonly Cell[]): Cell | null {
    const { rng } = this.ctx;
    for (let i = 0; i < 12; i++) {
      const c: Cell = { chart: rng.int(4) as Cell['chart'], pos: rng.int(this.reader.n) };
      if (!exp.some((e) => e.chart === c.chart && e.pos === c.pos)) return c;
    }
    return null;
  }

  private autoRest(t: number): void {
    const { ghost } = this.ctx;
    if (this.restPlanned || !ghost.idle || t - this.restStart < 1300) return;
    this.restPlanned = true;
    const b = this.restButton();
    ghost.tap(b.x + b.w / 2, b.y + b.h / 2, { delay: 300, move: 600 });
  }

  resize(): void {
    this.layCache = null;
    this.updateLabel();
  }

  // -------------------------------------------------------------------------
  // Ergebnis

  private finishSession(t: number): void {
    this.phase = 'done';
    this.endT = t;
    const { hud, ghost } = this.ctx;
    hud.setProgress(1);
    if (this.demo) {
      ghost.clear();
      this.ctx.finish({
        primary: { key: 'level', value: MIN_LEVEL, unit: 'level', better: 'higher' },
        secondary: [{ key: 'hits', value: DEMO_TAPS, unit: 'count' }],
        score: 0,
        level: MIN_LEVEL,
      });
      return;
    }
    this.ctx.sfx.done();
    this.ctx.finish(this.buildResult());
  }

  private buildResult(): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const fb = texts.feedback;
    const s = summarize(this.steps);
    const reached = reachedLevel(this.roundLog, this.level);
    const ms = (v: number): string => (Number.isFinite(v) ? fmt.ms(Math.round(v)) : fb.noData);

    const secondary: ExerciseResult['secondary'] = [
      ...(Number.isFinite(s.meanMs) ? [{ key: 'time', value: Math.round(s.meanMs), unit: 'ms' as const }] : []),
      { key: 'hits', value: s.hits, unit: 'count' as const },
      { key: 'wrong', value: s.errors, unit: 'count' as const },
      ...(s.beat ? [{ key: 'beat', value: Math.round(s.beat.share * 100), unit: 'percent' as const }] : []),
    ];

    const roundRows: ResultDetailRow[] = this.roundRecs.map((r) => ({
      label: `${tpl(fb.round, { n: r.round + 1, m: this.plan.rounds })} · ${fb.level} ${r.level}`,
      value: ms(r.meanMs),
      text: tpl(fb.roundText, { n: r.hits, d: fmt.time(r.durationMs, 0), e: r.errors }),
    }));

    const timeRows: ResultDetailRow[] = [
      { label: fb.median, value: ms(s.medianMs), text: fb.wholeSession },
      { label: fb.first, value: ms(s.firstHalfMs), text: tpl(fb.halfText, { a: s.firstHalfOk, b: s.firstHalfTotal }) },
      { label: fb.last, value: ms(s.lastHalfMs), text: tpl(fb.halfText, { a: s.lastHalfOk, b: s.lastHalfTotal }) },
    ];

    const dirRows: ResultDetailRow[] = DIRECTIONS.map((dir) => {
      const d = s.directions.find((x) => x.dir === dir)!;
      const tag = s.fastest === dir ? fb.fastest : s.slowest === dir ? fb.slowest : d.n < MIN_FOR_DIRECTION ? fb.fewHits : '';
      return { label: `${ARROW[dir]} ${fb[dir]}`, value: ms(d.meanMs), text: [tpl(fb.count, { n: d.n }), tag].filter(Boolean).join(' · ') };
    });

    const details: ResultDetailTable[] = [
      { title: fb.roundsTitle, rows: roundRows },
      { title: fb.timeTitle, rows: timeRows },
      { title: fb.dirTitle, rows: dirRows, note: fb.note },
    ];
    if (s.jump) {
      const j = s.jump;
      const both = Number.isFinite(j.switchMs) && Number.isFinite(j.withinMs);
      details.push({
        title: fb.jumpTitle,
        rows: [
          { label: fb.jumpSwitch, value: ms(j.switchMs), text: tpl(fb.count, { n: j.switchN }) },
          { label: fb.jumpWithin, value: ms(j.withinMs), text: tpl(fb.count, { n: j.withinN }) },
          { label: fb.jumpCost, value: both ? fmt.msSigned(Math.round(j.switchMs - j.withinMs)) : fb.noData, text: both ? undefined : fb.fewHits },
        ],
        note: fb.jumpNote,
      });
    }

    if (s.beat) {
      // Takt (Option): Stufe und Zeiten werden wie sonst gerechnet; der Takt steht nur als Zusatzzeile da
      const opt = texts.options?.metronome;
      const tempo = (opt?.choices[this.beatChoice] ?? this.beatChoice).replace('\n', ' · ');
      details.push({
        title: fb.beatTitle,
        rows: [
          { label: fb.beatTempo, value: tempo },
          { label: fb.beatShare, value: fmt.pct(s.beat.share * 100), text: tpl(fb.beatShareText, { a: s.beat.on, b: s.beat.n }) },
        ],
        note: fb.beatNote,
      });
    }

    return {
      primary: { key: 'level', value: reached, unit: 'level', better: 'higher' },
      secondary,
      details,
      score: this.points,
      level: nextStartLevel(reached, MIN_LEVEL, MAX_LEVEL),
      tip: tipFor(s),
    };
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, now: number): void {
    const t = Math.min(now, this.endT);
    const { w, h, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    if (this.phase === 'rest') {
      this.drawRest(g, t);
      return;
    }
    const lay = this.lay();
    const appear = clamp((t - this.roundT0) / APPEAR_MS, 0, 1);
    this.drawRing(g, lay, t, appear, 'glow');
    for (const c of lay.charts) this.drawChart(g, lay, c.corner, appear);
    this.drawRing(g, lay, t, appear, 'ring');
    for (const b of this.bursts) {
      if (this.ctx.reducedMotion) break;
      const k = clamp((t - b.t0) / BURST_MS, 0, 1);
      ring(g, b.x, b.y, b.r * (1 + 0.45 * k), withAlpha(RING_ON_PAPER, 0.75 * (1 - k)), Math.max(2, lay.cell * 0.06 * (1 - k)));
    }
    for (const m of this.marks) drawSoftCross(g, m.x, m.y, m.s, markAlpha(t - m.t0, MARK_MS));
    if (!this.demo) this.drawHint(g, lay, t, appear);
  }

  /** Eine Tafel: heller Karton, Buchstaben in Leserichtung; gelesene Buchstaben blass (bleiben sichtbar) */
  private drawChart(g: CanvasRenderingContext2D, lay: Layout, corner: number, appear: number): void {
    const c = lay.charts[corner];
    const rad = Math.max(8, lay.cell * 0.14);
    g.save();
    g.globalAlpha = appear;
    fillRR(g, c.x, c.y, c.w, c.h, rad, PAPER);
    rrPath(g, c.x + 0.75, c.y + 0.75, c.w - 1.5, c.h - 1.5, rad);
    g.strokeStyle = PAPER_EDGE;
    g.lineWidth = 1.5;
    g.stroke();
    g.font = fontOf(lay.font, 800);
    g.textAlign = 'center';
    g.textBaseline = 'alphabetic';
    g.fillStyle = INK;
    const letters = this.letters[corner];
    const done = this.reader.done[corner];
    for (let i = 0; i < letters.length; i++) {
      const { col, row } = gridOfPos(i, lay.cols, lay.rows, lay.scan);
      g.globalAlpha = appear * (done[i] ? PALE_ALPHA : 1);
      g.fillText(letters[i], c.gx + (col + 0.5) * lay.cell, c.gy + (row + 0.5) * lay.cell + lay.font * 0.36);
    }
    g.restore();
  }

  /** Führung: Ring um den nächsten Buchstaben oder um die nächste Tafel; weich überblendet, nie blinkend */
  private drawRing(g: CanvasRenderingContext2D, lay: Layout, t: number, appear: number, part: 'glow' | 'ring'): void {
    const k = clamp((t - this.ringT0) / RING_FADE_MS, 0, 1);
    if (this.ringPrev && k < 1) this.drawRingAt(g, lay, this.ringPrev, (1 - k) * appear, part);
    if (this.ringNow) this.drawRingAt(g, lay, this.ringNow, k * appear, part);
  }

  /** Teil „glow“ (Schein hinter der Tafel, vor dem Zeichnen der Tafeln) oder „ring“ (Ring bzw. Rahmen darüber) */
  private drawRingAt(g: CanvasRenderingContext2D, lay: Layout, tg: RingTarget, a: number, part: 'glow' | 'ring'): void {
    if (a <= 0.01) return;
    if (tg.kind === 'chart' && part === 'glow') {
      const c = lay.charts[tg.chart];
      glow(g, c.x + c.w / 2, c.y + c.h / 2, Math.max(c.w, c.h) * 0.62, ACCENT, 0.5 * a);
      return;
    }
    if (part === 'glow') return;
    if (tg.kind === 'letter') {
      const r = cellRect(lay, tg.chart, tg.pos);
      const rad = lay.cell * 0.47;
      const lw = Math.max(3.5, lay.cell * 0.07);
      g.save();
      g.globalAlpha = a;
      circle(g, r.cx, r.cy, rad, 'rgba(31,111,209,0.14)');
      ring(g, r.cx, r.cy, rad - lw / 2, 'rgba(255,255,255,0.9)', lw + 3);
      ring(g, r.cx, r.cy, rad - lw / 2, RING_ON_PAPER, lw);
      g.restore();
    } else {
      const c = lay.charts[tg.chart];
      const off = Math.max(6, lay.cell * 0.12);
      const lw = Math.max(4, lay.cell * 0.075);
      g.save();
      g.globalAlpha = a;
      rrPath(g, c.x - off, c.y - off, c.w + 2 * off, c.h + 2 * off, Math.max(10, lay.cell * 0.2));
      g.strokeStyle = FRAME;
      g.lineWidth = lw;
      g.stroke();
      g.restore();
    }
  }

  /** Regelhinweis in der freien Zone zwischen den Tafeln, bis der erste Buchstabe getippt ist (nur die Regel, keine Führung) */
  private drawHint(g: CanvasRenderingContext2D, lay: Layout, t: number, appear: number): void {
    const fb = this.ctx.texts.feedback;
    const k = t >= this.hintGoneT ? 1 - clamp((t - this.hintGoneT) / 300, 0, 1) : 1;
    if (k <= 0.01) return;
    const o = this.rp.order;
    let lines = [o === 'reading' ? fb.orderReading : o === 'cw' ? fb.orderCw : o === 'zigzag' ? fb.orderZigzag : fb.orderFree];
    if (this.rp.scan === 'cols') lines.push(fb.scanCols);
    const { w, u } = this.ctx.stage;
    const top = lay.charts[0].y + lay.charts[0].h;
    const bottom = lay.charts[2].y;
    const band = bottom - top - 6;
    const maxW = w * 0.92;
    g.save();
    const widest = (ls: string[], px: number): number => {
      g.font = fontOf(px, 700);
      return Math.max(...ls.map((ln) => g.measureText(ln).width));
    };
    const heightOf = (n: number, px: number): number => px * 1.1 * n + px + (n - 1) * px * 0.3;
    // Schrift so weit verkleinern, dass der Hinweis samt Rand in die freie Zone zwischen den Tafeln passt;
    // reicht die Höhe nicht für zwei Zeilen (Querformat), kommt alles in eine Zeile
    const fitSize = (ls: string[]): number => {
      let sz = clamp(u * 3.2, 15, 26);
      while (sz > 13 && (widest(ls, sz) + sz * 1.8 > maxW || heightOf(ls.length, sz) > band)) sz -= 1;
      return sz;
    };
    let size = fitSize(lines);
    if (lines.length > 1 && size < 17) {
      lines = [lines.join(' · ')];
      size = fitSize(lines);
    }
    const bh = heightOf(lines.length, size);
    if (bh > band) {
      g.restore();
      return;
    }
    const bw = Math.min(maxW, widest(lines, size) + size * 1.8);
    const x = (w - bw) / 2;
    const y = (top + bottom) / 2 - bh / 2;
    g.globalAlpha = appear * k;
    rrPath(g, x, y, bw, bh, Math.min(bh / 2, size * 1.2));
    g.fillStyle = 'rgba(255,255,255,0.94)';
    g.fill();
    g.fillStyle = '#0F172A';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.font = fontOf(size, 700);
    lines.forEach((ln, i) => g.fillText(ln, w / 2, y + size * 0.5 + size * 0.55 + i * size * 1.4 + 1, maxW - size));
    g.restore();
  }

  /** Pausenbild zwischen den Runden: Hinweis, Rest-Sekunden, großer Weiter-Knopf (≥ 56 px hoch) */
  private drawRest(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, u } = this.ctx.stage;
    const fb = this.ctx.texts.feedback;
    const cx = w / 2;
    const title = clamp(u * 6.2, 24, 54);
    const body = clamp(u * 3.6, 16, 26);
    text(g, fb.restTitle, cx, h * 0.28, title, LIGHT, { weight: 800 });
    const lines = wrap(g, tpl(fb.restText, { n: this.roundIdx, m: this.plan.rounds }), w * 0.86, body);
    lines.forEach((ln, i) => text(g, ln, cx, h * 0.28 + title * 1.1 + i * body * 1.4, body, 'rgba(232,238,247,0.85)', { weight: 600 }));
    const left = Math.max(0, Math.ceil((this.plan.restMs - (t - this.restStart)) / 1000));
    text(g, tpl(fb.restIn, { s: left }), cx, h * 0.5, body * 1.15, DIM, { weight: 700 });
    const b = this.restButton();
    const ready = t - this.restStart >= 900;
    fillRR(g, b.x, b.y, b.w, b.h, b.h / 2, withAlpha(ACCENT, ready ? 0.92 : 0.45));
    g.save();
    rrPath(g, b.x + 1, b.y + 1, b.w - 2, b.h - 2, b.h / 2);
    g.strokeStyle = 'rgba(255,255,255,0.5)';
    g.lineWidth = 2;
    g.stroke();
    g.restore();
    text(g, `${fb.next}  →`, cx, b.y + b.h / 2 + 1, clamp(b.h * 0.38, 20, 30), '#07121F', { weight: 800 });
  }
}

function wrap(g: CanvasRenderingContext2D, s: string, maxW: number, size: number): string[] {
  g.save();
  g.font = `600 ${Math.round(size)}px system-ui, sans-serif`;
  const words = s.split(' ');
  const lines: string[] = [];
  let cur = '';
  for (const wd of words) {
    const tryLine = cur ? `${cur} ${wd}` : wd;
    if (g.measureText(tryLine).width > maxW && cur) {
      lines.push(cur);
      cur = wd;
    } else cur = tryLine;
  }
  if (cur) lines.push(cur);
  g.restore();
  return lines;
}

export const vierZieleWechsel: ExerciseDefinition = {
  id: 'vier-ziele-wechsel',
  category: 'bewegung',
  minutes: 4,
  color: '#2E6DB4',
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="2.4"><rect x="3" y="3" width="18" height="18" rx="3.5"/><rect x="27" y="3" width="18" height="18" rx="3.5"/><rect x="3" y="27" width="18" height="18" rx="3.5"/><rect x="27" y="27" width="18" height="18" rx="3.5"/></g><g fill="currentColor"><circle cx="9" cy="9" r="2.1"/><circle cx="15" cy="9" r="2.1" opacity=".35"/><circle cx="9" cy="15" r="2.1" opacity=".35"/><circle cx="15" cy="15" r="2.1" opacity=".35"/><circle cx="33" cy="9" r="2.1"/><circle cx="39" cy="9" r="2.1" opacity=".35"/><circle cx="33" cy="15" r="2.1" opacity=".35"/><circle cx="39" cy="15" r="2.1" opacity=".35"/><circle cx="9" cy="33" r="2.1"/><circle cx="15" cy="33" r="2.1" opacity=".35"/><circle cx="9" cy="39" r="2.1" opacity=".35"/><circle cx="15" cy="39" r="2.1" opacity=".35"/><circle cx="33" cy="33" r="2.1"/><circle cx="39" cy="33" r="2.1" opacity=".35"/><circle cx="33" cy="39" r="2.1" opacity=".35"/><circle cx="39" cy="39" r="2.1" opacity=".35"/></g>',
  texts: { de, it },
  showsLevel: true,
  options: [{ key: 'metronome', choices: BEAT_CHOICES, defaultChoice: BEAT_DEFAULT }],
  create: (ctx) => new VierZieleWechsel(ctx),
};
