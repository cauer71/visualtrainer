/**
 * 4-Ziele-Wechsel – schneller, gezielter Wechsel zwischen vier weit getrennten Positionen (Katalog 905).
 *
 * Aufbau: Vier Zeichen stehen in den Ecken des Feldes (1 oben links, 2 oben rechts, 3 unten links, 4 unten rechts).
 * Immer genau eines ist das aktuelle Ziel: Es bekommt weich (180 ms, kein Blinken) einen Ring und wird angetippt.
 * Danach folgt eine kurze, unvorhersehbare Pause und das nächste Ziel – nie dasselbe zweimal hintereinander,
 * kein Pendeln, die zwölf gerichteten Wechsel kommen über die Zeit etwa gleich oft vor (logic.ts, `TargetSequence`).
 *
 * - Stufen 1–12 (logic.ts): je Schritt ändert sich genau ein Parameter (Größe → Rand → Pause → ähnliche Zeichen →
 *   Symbole → Ablenker). Nach je 12 Zielen (Schnellmodus: 3) entscheidet die Regel: ≥ 90 % richtig und gleichmäßige
 *   Zeit → eine Stufe schwerer, 75–89 % → gleich, < 75 % → eine Stufe leichter. Die Stufe ändert sich nur in der
 *   Pause zwischen zwei Zielen, die Ziele gleiten weich auf ihre neue Größe/Lage. Hauptwert = erreichte Stufe.
 * - Drei Blöcke à 60 s mit Pause dazwischen (Vorschlag 10 s, jederzeit durch Antippen von „Weiter“ beendbar).
 * - Treffer = erster Tipp auf das aktive Ziel. Falsches Ziel: als Fehler gezählt, das richtige bleibt aktiv und muss
 *   danach getroffen werden. Ablenker berührt: getrennt gezählt, ebenfalls Fehler. Tipp ins Leere: ohne Wirkung.
 *   Auslassung: 6 s kein Tipp → einmal je Ziel gezählt, das Ziel bleibt aktiv (nichts verschwindet).
 * - Gemessen wird die Zeit vom ersten gezeichneten Frame des Rings bis zum Tipp (Ereigniszeit). Nur saubere
 *   Treffer gehen in die Mittelwerte ein (nicht: Durchgänge mit Fehler oder Auslassung). Der Blick selbst wird nicht
 *   gemessen. Auswertung: Mittel, erste gegen letzte Hälfte, Richtungen (→ ← ↓ ↑ ↘ ↖ ↗ ↙, Mittelwert ab 3 Treffern).
 * - Rückmeldung weich: Treffer = kurzer Ring + ✓, Fehler = ✗ am Ort; kein Rot, kein Blitz, keine lange Animation.
 * - Zeichen im Touch-Modus sind Fixationsziele: der Ring zeigt das Ziel an, das Zeichen wird nicht abgefragt.
 */
import { background, circle, fillRR, glow, ring, rrPath, text, withAlpha } from '../../core/draw';
import { nextStartLevel } from '../../core/staircase';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, PointerInfo, ResultDetailRow } from '../../core/types';
import { captionTop, drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import {
  applyMove,
  ARROW,
  blockPlan,
  cornerAt,
  DIRECTIONS,
  distractorHitR,
  distractorsFor,
  DOUBLE_TAP_MS,
  evalSegment,
  inCircle,
  layoutFor,
  levelOf,
  MAX_LEVEL,
  MIN_LEVEL,
  MIN_FOR_MEAN,
  MIN_RT_MS,
  moveFor,
  OMIT_MS,
  paramsFor,
  pauseMs,
  pointsFor,
  reachedLevel,
  SIGNS,
  summarize,
  TargetSequence,
  tipFor,
  type Distractor,
  type Layout,
  type Pt,
  type SegmentLog,
  type Trial,
} from './logic';
import { de, it } from './texts';

const RING_FADE_MS = 180;
const BURST_MS = 320;
const CHECK_MS = 520;
const MARK_MS = 850;
const MAX_DISTRACTORS = 6;

const ACCENT = '#5AA9F0';
const RING_COLOR = '#A9D3FF';
const INK = '#F4F7FC';
const DIM = '#8A9BB5';

// Intro-Film: Stufe 1; Ziele rechts oben, links unten, rechts unten (erst falsch getippt), links oben
interface DemoStep {
  to: number;
  caption: string;
  wrongFirst?: number;
}
const DEMO_STEPS: DemoStep[] = [
  { to: 1, caption: 'ring' },
  { to: 2, caption: 'next' },
  { to: 3, caption: 'only', wrongFirst: 0 },
  { to: 0, caption: 'again' },
];
const DEMO_START_MS = 1700;
const DEMO_PAUSE_MS = 800;

type Phase = 'wait' | 'active' | 'rest' | 'done';

/** Wohin die Geister-Hand als Nächstes tippt: eine Ecke, ein Ablenker oder (Pause) die Weiter-Taste */
interface AutoTap {
  corner?: number;
  distractor?: number;
  delay: number;
  move: number;
}

interface Active {
  id: number;
  from: number | null;
  /** Reizbeginn = erster gezeichneter Frame mit Ring (NaN bis dahin) */
  born: number;
  trial: Trial | null;
  omitted: boolean;
  queue: AutoTap[];
  planned: boolean;
  rolled: boolean;
  holdUntil: number;
}

interface Burst {
  corner: number;
  t0: number;
}
interface Mark {
  x: number;
  y: number;
  t0: number;
}

const tpl = (s: string, vars: Record<string, string | number>): string => s.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ''));

class VierZieleWechsel implements Exercise {
  private readonly demo: boolean;
  private readonly plan: ReturnType<typeof blockPlan>;
  private phase: Phase = 'wait';
  private readonly seq = new TargetSequence();
  private trials: Trial[] = [];
  private segStart = 0;
  private segLog: SegmentLog[] = [];
  private level: number;
  private pendingLevel: number | null = null;
  private maxPlayedLevel = MIN_LEVEL;
  private readonly seeds: number[];
  /** welches der vier Zeichen in welcher Ecke steht */
  private signSlot: number[];
  private prevCorner: number | null = null;
  private active: Active | null = null;
  private nextAt = 0;
  private lastTapT = -1e9;
  private blockIdx = 0;
  private blockStart = 0;
  private restStart = 0;
  private restPlanned = false;
  private demoStep = 0;
  private endAt = Infinity;
  private points = 0;
  private bursts: Burst[] = [];
  private marks: Mark[] = [];
  private checks: Burst[] = [];
  private lastLabel = '';
  private endT = Infinity;
  /** weich nachgeführte Größe und Randlage (ändern sich nur zwischen zwei Zielen) */
  private viewSize: number;
  private viewReach: number;
  private readonly distAlpha: number[] = new Array(MAX_DISTRACTORS).fill(0);
  private distCache: { key: string; list: Distractor[] } = { key: '', list: [] };

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.plan = blockPlan(ctx.quick);
    this.level = this.demo ? MIN_LEVEL : levelOf(ctx.startLevel ?? MIN_LEVEL);
    this.maxPlayedLevel = this.level;
    this.seeds = Array.from({ length: MAX_DISTRACTORS }, () => ctx.rng.int(1_000_000));
    this.signSlot = ctx.rng.shuffle([0, 1, 2, 3]);
    const p = this.params();
    this.viewSize = p.sizeU;
    this.viewReach = p.reach;
  }

  // --- Geometrie: immer live aus der Bühne ---

  private params() {
    return paramsFor(this.demo ? MIN_LEVEL : this.level);
  }

  private lay(): Layout {
    const s = this.ctx.stage;
    const h = this.demo ? captionTop(s) - 6 : s.h;
    return layoutFor(s.w, h, s.u, this.viewSize, this.viewReach);
  }

  /** Ablenker (nur Stufen mit Ablenkern sichtbar) – deterministisch, daher auch nach dem Drehen stimmig */
  private distractors(lay: Layout): Distractor[] {
    const key = `${Math.round(lay.w)}x${Math.round(lay.h)}:${lay.r.toFixed(1)}:${lay.centers[0].x.toFixed(1)}`;
    if (this.distCache.key !== key) this.distCache = { key, list: distractorsFor(MAX_DISTRACTORS, this.seeds, lay) };
    return this.distCache.list;
  }

  private signOf(corner: number): string {
    return SIGNS[this.params().signs][this.signSlot[corner]];
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost, stage } = this.ctx;
    hud.setProgress(0);
    hud.setScore(null);
    if (this.demo) {
      const lay = this.lay();
      ghost.moveTo(stage.w / 2, lay.h / 2, { move: 0 });
      hud.caption(this.ctx.texts.captions.start);
    }
    this.beginBlock(t, this.demo ? DEMO_START_MS : this.plan.startMs);
  }

  private beginBlock(t: number, startMs: number): void {
    this.phase = 'wait';
    this.active = null;
    this.prevCorner = null; // der erste Wechsel eines Blocks kommt nach einer Pause und zählt in keiner Richtung
    this.nextAt = t + startMs;
    this.blockStart = this.nextAt;
    this.updateLabel();
  }

  update(dt: number, t: number): void {
    if (this.phase === 'done') return;
    this.animate(dt);
    if (this.demo && t >= this.endAt) {
      this.finishSession(t);
      return;
    }
    if (this.phase === 'rest') {
      if (t - this.restStart >= this.plan.restMs) this.endRest(t);
      else if (this.ctx.autoplay) this.autoRest(t);
      this.updateProgress(t);
      this.prune(t);
      return;
    }
    if (!this.demo && t - this.blockStart >= this.plan.blockMs) {
      this.endBlock(t);
      return;
    }
    if (this.phase === 'wait' && t >= this.nextAt && !this.demoDone()) this.activate();
    const a = this.active;
    if (this.phase === 'active' && a) {
      if (Number.isFinite(a.born) && !a.omitted && t - a.born >= OMIT_MS) this.omit(a);
      if (this.ctx.autoplay) this.autoUpdate(a, t);
    }
    this.updateProgress(t);
    this.prune(t);
  }

  private demoDone(): boolean {
    return this.demo && this.demoStep >= DEMO_STEPS.length;
  }

  /** Größe, Rand und Ablenker gleiten weich (dt) auf ihren Sollwert; bei „Bewegung reduzieren“ springen sie */
  private animate(dt: number): void {
    const p = this.params();
    const snap = this.ctx.reducedMotion;
    const k = snap ? 1 : 1 - Math.exp(-dt * 9);
    this.viewSize += (p.sizeU - this.viewSize) * k;
    this.viewReach += (p.reach - this.viewReach) * k;
    if (Math.abs(p.sizeU - this.viewSize) < 0.01) this.viewSize = p.sizeU;
    if (Math.abs(p.reach - this.viewReach) < 0.002) this.viewReach = p.reach;
    const ka = snap ? 1 : 1 - Math.exp(-dt * 7);
    for (let i = 0; i < MAX_DISTRACTORS; i++) {
      const want = i < p.distractors ? 1 : 0;
      this.distAlpha[i] += (want - this.distAlpha[i]) * ka;
      if (Math.abs(want - this.distAlpha[i]) < 0.01) this.distAlpha[i] = want;
    }
  }

  private activate(): void {
    const { rng, hud, texts } = this.ctx;
    let id: number;
    if (this.demo) {
      const step = DEMO_STEPS[this.demoStep];
      id = step.to;
      hud.caption(texts.captions[step.caption]);
    } else {
      id = this.seq.next(rng);
    }
    this.phase = 'active';
    this.active = { id, from: this.prevCorner, born: NaN, trial: null, omitted: false, queue: [], planned: false, rolled: false, holdUntil: 0 };
    this.prevCorner = id;
    if (this.demo) {
      const step = DEMO_STEPS[this.demoStep];
      const q = this.active.queue;
      if (step.wrongFirst !== undefined) q.push({ corner: step.wrongFirst, delay: 500, move: 750 });
      q.push({ corner: id, delay: step.wrongFirst !== undefined ? 900 : 500, move: 700 });
      this.active.planned = true;
    }
    this.updateLabel();
  }

  // --- Wertung ---

  private curLevel(): number {
    return this.demo ? MIN_LEVEL : this.level;
  }

  /** Erste Wertung dieses Ziels (sauber oder nicht) – zählt für den Abschnitt */
  private verdict(a: Active, clean: boolean, rt: number | null): Trial {
    const tr: Trial = { index: this.trials.length, from: a.from, to: a.id, level: this.curLevel(), clean, rt, errors: 0, distractorTaps: 0, omitted: false };
    a.trial = tr;
    if (!this.demo) {
      this.trials.push(tr);
      if (this.trials.length - this.segStart >= this.plan.segment) this.closeSegment();
    }
    return tr;
  }

  private closeSegment(): void {
    const st = evalSegment(this.trials.slice(this.segStart));
    this.segLog.push({ level: this.level, accuracy: st.accuracy });
    this.segStart = this.trials.length;
    this.pendingLevel = applyMove(this.level, moveFor(st));
  }

  private applyPending(): boolean {
    if (this.pendingLevel === null) return false;
    const changed = this.pendingLevel !== this.level;
    this.level = this.pendingLevel;
    this.maxPlayedLevel = Math.max(this.maxPlayedLevel, this.level);
    this.pendingLevel = null;
    return changed;
  }

  private omit(a: Active): void {
    a.omitted = true;
    if (!a.trial) this.verdict(a, false, null);
    a.trial!.omitted = true;
  }

  pointerDown(p: PointerInfo): void {
    if (this.phase === 'rest') {
      this.restTap(p);
      return;
    }
    const a = this.active;
    if (this.phase !== 'active' || !a || !Number.isFinite(a.born)) return;
    // zu früh (Vorwegnehmen) oder Doppeltipp: keine Antwort
    if (p.t - a.born < MIN_RT_MS || p.t - this.lastTapT < DOUBLE_TAP_MS) return;
    const lay = this.lay();
    const c = cornerAt(lay, p.x, p.y);
    if (c === a.id) {
      this.hit(a, p);
      return;
    }
    if (c >= 0) {
      this.lastTapT = p.t;
      if (!a.trial) this.verdict(a, false, null);
      a.trial!.errors++;
      this.ctx.sfx.bad();
      this.marks.push({ x: p.x, y: p.y, t0: p.t });
      if (this.demo) this.ctx.hud.caption(this.ctx.texts.captions.wrong);
      return;
    }
    const dh = distractorHitR(lay.glyph);
    const list = this.distractors(lay);
    for (let i = 0; i < list.length; i++) {
      if (this.distAlpha[i] < 0.6) continue;
      if (inCircle(p.x, p.y, list[i].x, list[i].y, dh)) {
        this.lastTapT = p.t;
        if (!a.trial) this.verdict(a, false, null);
        a.trial!.distractorTaps++;
        this.ctx.sfx.bad();
        this.marks.push({ x: list[i].x, y: list[i].y, t0: p.t });
        return;
      }
    }
    // Tipp ins Leere: ohne Wirkung
  }

  private hit(a: Active, p: PointerInfo): void {
    this.lastTapT = p.t;
    if (!a.trial) {
      const rt = p.t - a.born;
      this.verdict(a, true, rt);
      this.points += pointsFor(this.curLevel(), rt);
    }
    this.ctx.sfx.good();
    this.bursts.push({ corner: a.id, t0: p.t });
    this.checks.push({ corner: a.id, t0: p.t });
    this.active = null;
    this.phase = 'wait';
    if (this.demo) {
      this.demoStep++;
      this.nextAt = p.t + DEMO_PAUSE_MS;
      if (this.demoStep >= DEMO_STEPS.length) this.endAt = p.t + 1200;
      return;
    }
    let pause = pauseMs(this.ctx.rng, this.level);
    if (this.applyPending()) pause = Math.max(pause, 550); // Ziele erst nach dem Gleiten auf die neue Größe
    this.nextAt = p.t + pause;
    this.updateLabel();
  }

  // --- Blöcke ---

  private endBlock(t: number): void {
    this.active = null; // ein Ziel ohne Wertung wird nicht gezählt
    this.applyPending();
    this.blockIdx++;
    if (this.blockIdx >= this.plan.blocks) {
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
    if (p.t - this.restStart < 900) return; // der letzte Tipp des Blocks soll nicht gleich „Weiter“ auslösen
    const b = this.restButton();
    if (p.x >= b.x - 10 && p.x <= b.x + b.w + 10 && p.y >= b.y - 10 && p.y <= b.y + b.h + 10) this.endRest(p.t);
  }

  private endRest(t: number): void {
    this.ctx.sfx.tick();
    this.lastTapT = t;
    this.beginBlock(t, this.plan.startMs);
  }

  private updateLabel(): void {
    if (this.demo) return;
    const fb = this.ctx.texts.feedback;
    const n = Math.min(this.blockIdx + 1, this.plan.blocks);
    // schmale Bühne (Handy): kurze Fassung, damit die Kopfleiste nichts abschneidet
    const s = this.ctx.stage.w < 520 ? `${fb.level} ${this.level} · ${n}/${this.plan.blocks}` : `${tpl(fb.block, { n, m: this.plan.blocks })} · ${fb.level} ${this.level}`;
    if (s !== this.lastLabel) {
      this.lastLabel = s;
      this.ctx.hud.setLabel(s);
    }
  }

  private updateProgress(t: number): void {
    if (this.demo) {
      this.ctx.hud.setProgress(clamp(this.demoStep / DEMO_STEPS.length, 0, 1));
      return;
    }
    const inBlock = this.phase === 'rest' ? 0 : clamp(t - this.blockStart, 0, this.plan.blockMs);
    this.ctx.hud.setProgress(clamp((this.blockIdx * this.plan.blockMs + inBlock) / (this.plan.blocks * this.plan.blockMs), 0, 1));
  }

  private prune(t: number): void {
    if (this.bursts.length) this.bursts = this.bursts.filter((b) => t - b.t0 < BURST_MS);
    if (this.checks.length) this.checks = this.checks.filter((b) => t - b.t0 < CHECK_MS);
    if (this.marks.length) this.marks = this.marks.filter((m) => t - m.t0 < MARK_MS);
  }

  // --- Autoplay (Tests) und Intro-Film: die Geister-Hand tippt ---

  private autoUpdate(a: Active, t: number): void {
    const { ghost, rng } = this.ctx;
    if (!ghost.idle || !Number.isFinite(a.born)) return;
    if (!a.planned) {
      if (!a.rolled) {
        a.rolled = true;
        // selten: ausgelassen (tippt erst nach der Frist)
        if (!this.demo && rng.chance(0.02)) a.holdUntil = a.born + OMIT_MS + 700;
      }
      if (t < a.holdUntil) return;
      a.planned = true;
      if (!this.demo) {
        const r = rng.next();
        const q = a.queue;
        const slow = rng.range(380, 520);
        if (r < 0.06) q.push({ corner: (a.id + 1 + rng.int(3)) % 4, delay: rng.range(250, 500), move: slow });
        else if (r < 0.09 && this.params().distractors > 0 && this.distAlpha[0] > 0.9) q.push({ distractor: rng.int(Math.min(3, this.params().distractors)), delay: rng.range(250, 500), move: slow });
        q.push({ corner: a.id, delay: q.length ? rng.range(450, 800) : rng.range(260, 640), move: rng.range(360, 520) });
      }
    }
    const next = a.queue.shift();
    if (!next) return;
    const lay = this.lay();
    let pt: Pt = lay.centers[next.corner ?? a.id];
    if (next.distractor !== undefined) pt = this.distractors(lay)[next.distractor] ?? lay.centers[a.id];
    const jit = this.demo ? 0 : lay.r * 0.1;
    ghost.tap(pt.x + rng.normal() * jit, pt.y + rng.normal() * jit, { delay: next.delay, move: next.move });
  }

  private autoRest(t: number): void {
    const { ghost } = this.ctx;
    if (this.restPlanned || !ghost.idle || t - this.restStart < 1300) return;
    this.restPlanned = true;
    const b = this.restButton();
    ghost.tap(b.x + b.w / 2, b.y + b.h / 2, { delay: 300, move: 600 });
  }

  resize(): void {
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
        secondary: [{ key: 'hits', value: DEMO_STEPS.length, unit: 'count' }],
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
    const s = summarize(this.trials);
    const reached = reachedLevel(this.segLog, this.level);
    const ms = (v: number): string => (Number.isFinite(v) ? fmt.ms(Math.round(v)) : fb.noData);

    const secondary: ExerciseResult['secondary'] = [
      ...(Number.isFinite(s.meanMs) ? [{ key: 'reaction', value: Math.round(s.meanMs), unit: 'ms' as const }] : []),
      { key: 'hits', value: s.hits, unit: 'count' as const },
      { key: 'wrong', value: s.errors, unit: 'count' as const },
      { key: 'omitted', value: s.omissions, unit: 'count' as const },
    ];

    const overview: ResultDetailRow[] = [
      { label: fb.first, value: ms(s.firstHalfMs), text: tpl(fb.halfText, { a: s.firstHalfHits, b: s.firstHalfTotal }) },
      { label: fb.last, value: ms(s.lastHalfMs), text: tpl(fb.halfText, { a: s.lastHalfHits, b: s.lastHalfTotal }) },
    ];
    if (this.maxPlayedLevel >= 11 || s.distractorTaps > 0) overview.push({ label: fb.distractorRow, value: String(s.distractorTaps) });

    const dirRows: ResultDetailRow[] = DIRECTIONS.map((dir) => {
      const d = s.directions.find((x) => x.dir === dir)!;
      const tag = s.fastest === dir ? fb.fastest : s.slowest === dir ? fb.slowest : d.n < MIN_FOR_MEAN ? fb.fewHits : '';
      return { label: `${ARROW[dir]} ${fb[dir]}`, value: ms(d.meanMs), text: [tpl(fb.count, { n: d.n }), tag].filter(Boolean).join(' · ') };
    });

    return {
      primary: { key: 'level', value: reached, unit: 'level', better: 'higher' },
      secondary,
      details: [
        { title: fb.overviewTitle, rows: overview },
        { title: fb.dirTitle, rows: dirRows, note: fb.note },
      ],
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
    // Reizbeginn = erster gezeichneter Frame mit Ring
    const a = this.active;
    if (this.phase === 'active' && a && Number.isNaN(a.born)) a.born = t;

    const lay = this.lay();
    // Ablenker unter den Zielen (still, kein Flackern, keine Bewegung)
    const list = this.distractors(lay);
    for (let i = 0; i < list.length; i++) {
      if (this.distAlpha[i] > 0.01) drawSign(g, list[i].kind, list[i].x, list[i].y, lay.glyph, DIM, 0.85 * this.distAlpha[i]);
    }
    for (let c = 0; c < 4; c++) {
      const isActive = this.phase === 'active' && a?.id === c;
      const k = isActive && a && Number.isFinite(a.born) ? clamp((t - a.born) / RING_FADE_MS, 0, 1) : 0;
      this.drawTarget(g, c, lay, k, t);
    }
    for (const b of this.bursts) this.drawBurst(g, lay, b, t);
    for (const b of this.checks) {
      const c = lay.centers[b.corner];
      const s = Math.max(10, lay.r * 0.2);
      drawSoftCheck(g, c.x + lay.r * 0.62, c.y - lay.r * 0.62, s, markAlpha(t - b.t0, CHECK_MS));
    }
    const u = this.ctx.stage.u;
    for (const m of this.marks) drawSoftCross(g, m.x, m.y, Math.max(11, u * 2.4), markAlpha(t - m.t0, MARK_MS));
  }

  /** Ein Ziel: schwaches Zeichen; das aktuelle Ziel zusätzlich mit Ring, Scheibe und hellem Zeichen (Form, nicht nur Farbe) */
  private drawTarget(g: CanvasRenderingContext2D, c: number, lay: Layout, k: number, t: number): void {
    const { x, y } = lay.centers[c];
    circle(g, x, y, lay.r, 'rgba(232,238,247,0.05)');
    if (k > 0.01) {
      const lw = Math.max(4, lay.r * 0.085);
      glow(g, x, y, lay.r * 0.95, ACCENT, 0.85 * k);
      circle(g, x, y, lay.r, withAlpha(ACCENT, 0.2 * k));
      ring(g, x, y, lay.r - lw / 2, withAlpha(RING_COLOR, k), lw);
      // Wo es nach einer Auslassung weitergeht: gestrichelter zweiter Ring, weich eingeblendet
      const a = this.active;
      if (a && a.omitted && Number.isFinite(a.born)) {
        const ka = clamp((t - a.born - OMIT_MS) / 400, 0, 1);
        if (ka > 0) ring(g, x, y, lay.r * 0.7, withAlpha(RING_COLOR, 0.8 * ka), Math.max(2.5, lw * 0.5), [lw * 1.2, lw * 1.2]);
      }
    }
    const col = k > 0.01 ? mix(DIM, INK, k) : DIM;
    drawSign(g, this.signOf(c), x, y, lay.glyph, col, 0.55 + 0.45 * k);
  }

  private drawBurst(g: CanvasRenderingContext2D, lay: Layout, b: Burst, t: number): void {
    if (this.ctx.reducedMotion) return;
    const k = clamp((t - b.t0) / BURST_MS, 0, 1);
    const c = lay.centers[b.corner];
    ring(g, c.x, c.y, lay.r * (1 + 0.28 * k), withAlpha(RING_COLOR, 0.7 * (1 - k)), Math.max(2, lay.r * 0.06 * (1 - k)));
  }

  /** Pausenbild zwischen den Blöcken: Hinweis, Rest-Sekunden, großer Weiter-Knopf (≥ 56 px hoch) */
  private drawRest(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, u } = this.ctx.stage;
    const fb = this.ctx.texts.feedback;
    const cx = w / 2;
    const title = clamp(u * 6.2, 24, 54);
    const body = clamp(u * 3.6, 16, 26);
    text(g, fb.restTitle, cx, h * 0.28, title, INK, { weight: 800 });
    const lines = wrap(g, tpl(fb.restText, { n: this.blockIdx, m: this.plan.blocks }), w * 0.86, body);
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

/** Farbe zwischen zwei #rrggbb-Werten */
function mix(a: string, b: string, k: number): string {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ch = (s: number) => Math.round(((pa >> s) & 255) * (1 - k) + ((pb >> s) & 255) * k);
  return `rgb(${ch(16)},${ch(8)},${ch(0)})`;
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

/**
 * Zeichen in der Mitte (x, y), Zeichenhöhe gh: Buchstaben und Ziffern als Text (Versalhöhe = gh), Symbole und
 * Ablenker als Pfade. Rein statisch, kein Flackern.
 */
function drawSign(g: CanvasRenderingContext2D, kind: string, x: number, y: number, gh: number, color: string, alpha: number): void {
  if (alpha <= 0.01) return;
  g.save();
  g.globalAlpha = clamp(alpha, 0, 1);
  g.fillStyle = color;
  g.strokeStyle = color;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  if (kind.length === 1 && kind !== 'x') {
    g.font = `800 ${Math.round(gh / 0.72)}px system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;
    g.textAlign = 'center';
    g.textBaseline = 'alphabetic';
    g.fillText(kind, x, y + gh / 2);
  } else if (kind === 'triangle') {
    g.beginPath();
    g.moveTo(x, y - gh * 0.52);
    g.lineTo(x + gh * 0.56, y + gh * 0.44);
    g.lineTo(x - gh * 0.56, y + gh * 0.44);
    g.closePath();
    g.fill();
  } else if (kind === 'square') {
    g.fillRect(x - gh * 0.42, y - gh * 0.42, gh * 0.84, gh * 0.84);
  } else if (kind === 'diamond') {
    g.beginPath();
    g.moveTo(x, y - gh * 0.58);
    g.lineTo(x + gh * 0.5, y);
    g.lineTo(x, y + gh * 0.58);
    g.lineTo(x - gh * 0.5, y);
    g.closePath();
    g.fill();
  } else if (kind === 'star') {
    g.beginPath();
    for (let i = 0; i < 10; i++) {
      const rad = (i % 2 === 0 ? 0.6 : 0.26) * gh;
      const ang = -Math.PI / 2 + (i * Math.PI) / 5;
      const px = x + Math.cos(ang) * rad;
      const py = y + Math.sin(ang) * rad * 1.0;
      if (i === 0) g.moveTo(px, py);
      else g.lineTo(px, py);
    }
    g.closePath();
    g.fill();
  } else if (kind === 'x' || kind === 'plus') {
    const s = gh * 0.36;
    g.lineWidth = Math.max(3, gh * 0.16);
    g.beginPath();
    if (kind === 'x') {
      g.moveTo(x - s, y - s);
      g.lineTo(x + s, y + s);
      g.moveTo(x + s, y - s);
      g.lineTo(x - s, y + s);
    } else {
      g.moveTo(x - s * 1.15, y);
      g.lineTo(x + s * 1.15, y);
      g.moveTo(x, y - s * 1.15);
      g.lineTo(x, y + s * 1.15);
    }
    g.stroke();
  } else if (kind === 'ring') {
    g.lineWidth = Math.max(3, gh * 0.14);
    g.beginPath();
    g.arc(x, y, gh * 0.36, 0, Math.PI * 2);
    g.stroke();
  }
  g.restore();
}

export const vierZieleWechsel: ExerciseDefinition = {
  id: 'vier-ziele-wechsel',
  category: 'bewegung',
  minutes: 4,
  color: '#2E6DB4',
  icon:
    '<circle cx="8.5" cy="8.5" r="3.6" fill="currentColor" opacity=".45"/><circle cx="8.5" cy="39.5" r="3.6" fill="currentColor" opacity=".45"/><circle cx="39.5" cy="39.5" r="3.6" fill="currentColor" opacity=".45"/><circle cx="39.5" cy="8.5" r="6.4" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="39.5" cy="8.5" r="2.6" fill="currentColor"/><path d="M13 35L33 14" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="0.5 6"/>',
  texts: { de, it },
  showsLevel: true,
  create: (ctx) => new VierZieleWechsel(ctx),
};
