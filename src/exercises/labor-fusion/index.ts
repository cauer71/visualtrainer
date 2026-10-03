/**
 * Fusion – Bilder verschmelzen (Labor) – mit Rot-Grün-/Rot-Cyan-Brille ein Ziel (Kreise mit Mittelpunkt) ansehen, das jedem
 * Auge in seiner Farbe gezeigt wird. Der Versatz der beiden Bilder (in Prismendioptrien Δ) wächst, bis du „Doppelt“ meldest,
 * und schrumpft dann, bis du „Wieder einfach“ meldest. Konvergenz (Bild rückt näher) und Divergenz (Bild rückt weg).
 *
 * Eigene Umsetzung des bekannten Prinzips: Einstellungen (`ctx.params`, siehe logic.ts `PARAMS`), Zieldurchmesser in cm und
 * Versatz mit der Sehentfernung der Kalibrierung (`ctx.calib`), reine Logik in logic.ts (`FusionSession`), Anordnung in
 * layout.ts, gemeinsame Anaglyphen-Bausteine in _shared/anaglyph.ts.
 *
 * - Hauptwert: Mittel der Werte, bei denen du „Doppelt“ gemeldet hast (`break_mean`, Δ). Das sind Übungswerte: keine
 *   Prismenmessung, keine Prüfung, kein Normwert; ein höherer Wert ist nicht „besser“.
 * - Versatzsteuerung `auto`: Δ pro Sekunde; `trainer`: nur der Trainer-Regler. Der Regler (nur Trainer-/Entwickler-Ansicht)
 *   legt bei `auto` einen Zusatz darauf; höchstens 2 Δ je Tastendruck, die Anzeige gleitet weich; jede Änderung wird mit
 *   Zeitpunkt protokolliert und im Ergebnis ausgewiesen. Das Gemeldete ist immer der gerade angezeigte Wert.
 * - Ruhig: kein Flackern, keine schnellen Wechsel; Bedienung neutral grau mit Beschriftung (Farbe nie allein).
 * - Gemessen wird nur, was du meldest – nicht, ob du die Brille trägst, wohin du schaust, oder ob du wirklich doppelt siehst.
 */
import { calibOf } from '../../core/calib';
import { C, fillRR, font, hit, rrPath, text, type Rect } from '../../core/draw';
import { paramsOf } from '../../core/params';
import { clamp } from '../../core/stats';
import type {
  ColorCheckInfo,
  Exercise,
  ExerciseContext,
  ExerciseDefinition,
  ExerciseParams,
  ExerciseResult,
  ExerciseTexts,
  LiveState,
  Metric,
  PointerInfo,
  ResultDetailRow,
  ResultDetailTable,
} from '../../core/types';
import {
  anaglyphColorCheck,
  colorNameOf,
  colorOffsets,
  cssOf,
  liveDetail,
  pdToCm,
  pxToPd,
  readAnaglyph,
  shiftPx,
  withColor,
  type ColorId,
  type ToneCss,
} from '../_shared/anaglyph';
import { restPoint } from '../_shared/tippziele';
import { fusionLayout, type FusionLayout } from './layout';
import {
  fusionParams,
  HARD_MAX_PD,
  LIVE_MAX_JUMP_PD,
  LIVE_STEP_PD,
  PARAMS,
  pointsFor,
  QUICK_REPEATS,
  FusionSession,
  tipFor,
  type Dir,
  type FusionParams,
  type FusionSummary,
} from './logic';
import { de, it } from './texts';

const BLACK = '#000000';
const LEAD_MS = 500;
/** Neutrales Grau für Beschriftung und Bedienung (beide Augen sehen es) */
const UI_LINE = 'rgba(255,255,255,0.28)';
const UI_FILL = 'rgba(255,255,255,0.12)';
const UI_TEXT = '#D8D8DC';

// Intro-Film: ein Durchgang Konvergenz; die Hand tippt „Doppelt“ und später „Wieder einfach“
const DEMO_PARAMS: Partial<FusionParams> = {
  direction: 'convergence',
  control: 'auto',
  repeats: 1,
  rampPdPerS: 1.8,
  startPd: 0,
  maxPd: 14,
  targetCm: 3.6,
  leftLens: 'red',
  tones: 'redgreen',
  redLevel: 100,
  secondLevel: 100,
};
const DEMO_READY_MS = 1400;
const DEMO_START_MS = 600;
/** Schnellmodus (?quick=1): kürzere Ruhezeit und schnellere Änderung */
const QUICK_READY_MS = 600;
const QUICK_RAMP = 4;
/** Im Film: Versatz, ab dem die Hand „Doppelt“ tippt, und Abstand darunter, ab dem sie „Wieder einfach“ tippt */
const DEMO_BREAK_PD = 6;
const DEMO_GAP_PD = 3;

class Fusion implements Exercise {
  private readonly demo: boolean;
  private readonly p: FusionParams;
  private readonly css: ToneCss;
  private readonly session: FusionSession;
  private started = false;
  private startAt = 0;
  private done = false;
  private lastPhase = '';
  private lastIdx = -1;
  private lastCaption = '';
  /** Autoplay: geplanter Tipp der Geister-Hand und die Lage, für die er geplant wurde */
  private autoPlan: { key: 'main' | 'missA' | 'missB'; phase: string; idx: number } | null = null;
  /** Autoplay: Versatz, ab dem die Hand „Doppelt“ meldet, und der Abstand darunter für „Wieder einfach“ */
  private autoBreak = 6;
  private autoGap = 2;
  private autoForIdx = -1;
  private autoMissed = false;
  /** Kleinster Versatz (Δ), auf den enge Bühnen die Obergrenze begrenzt haben (null = nie) */
  private limitedPd: number | null = null;
  /** Kurzes Aufleuchten einer Taste „Strich fehlt“ nach dem Antippen */
  private flash: Record<'missA' | 'missB', number> = { missA: -1e9, missB: -1e9 };
  private readonly trainerAvailable: boolean;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = fusionParams(paramsOf(ctx, PARAMS));
    this.p = this.demo
      ? { ...base, ...DEMO_PARAMS }
      : ctx.quick
        ? { ...base, repeats: Math.min(base.repeats, QUICK_REPEATS), rampPdPerS: Math.max(base.rampPdPerS, QUICK_RAMP) }
        : base;
    this.css = cssOf({ tones: this.p.tones, brightness: 100, redLevel: this.p.redLevel, secondLevel: this.p.secondLevel });
    // Regler vorhanden (Trainer-Ansicht) oder Autoplay (spielt selbst die Trainerin/den Trainer); sonst läuft „Trainer“ wie „auto“
    this.trainerAvailable = !this.demo && (ctx.liveEnabled === true || ctx.autoplay);
    this.session = new FusionSession(this.p, { trainerAvailable: this.trainerAvailable, readyMs: this.demo ? DEMO_READY_MS : ctx.quick ? QUICK_READY_MS : undefined });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private layout(): FusionLayout {
    const s = this.ctx.stage;
    const calib = calibOf(this.ctx);
    return fusionLayout({
      w: s.w,
      h: s.h,
      u: s.u,
      captionReserve: this.demo ? this.captionReserve() : 0,
      demo: this.demo,
      wantDiameterPx: calib.sizePx(this.p.targetCm),
      needShiftPx: shiftPx(this.p.maxPd, calib.viewDistanceCm, calib.pxPerCm),
    });
  }

  /** Platz unten im Intro-Film für Hand und Bildunterschrift */
  private captionReserve(): number {
    const s = this.ctx.stage;
    const size = clamp(s.u * 4.6, 14, 30);
    return size * 2.1 + s.h * 0.05 + Math.max(6, s.u * 1.5);
  }

  /** Obergrenze der Bühne an die Sitzung melden (in Δ); merkt sich den kleinsten Wert, wenn sie die Einstellung unterschreitet */
  private syncLimit(L: FusionLayout): void {
    const calib = calibOf(this.ctx);
    const need = shiftPx(this.p.maxPd, calib.viewDistanceCm, calib.pxPerCm);
    const lim = L.maxShiftPx >= need - 0.5 ? this.p.maxPd : pxToPd(L.maxShiftPx, calib.viewDistanceCm, calib.pxPerCm);
    this.session.limitPd = Math.min(this.p.maxPd, Math.max(0.5, lim));
    if (lim < this.p.maxPd - 0.05) this.limitedPd = Math.min(this.limitedPd ?? Infinity, lim);
  }

  resize(): void {
    // Alles wird aus der Bühne neu berechnet; nur der geplante Tipp der Geister-Hand muss neu gesetzt werden
    if (this.ctx.autoplay) {
      this.ctx.ghost.clear();
      this.autoPlan = null;
    }
  }

  // --- Trainer-Regler ---

  setLive(key: string, value: number): void {
    if (this.demo || this.done || !this.started || key !== 'shiftPd') return;
    this.session.setLive(value, this.ctx.now());
  }

  getLive(): LiveState | null {
    if (this.demo || this.done || !this.started || this.session.finished) return null;
    const s = this.session;
    return {
      key: 'shiftPd',
      value: s.live.target,
      min: s.live.min,
      max: s.live.max,
      step: LIVE_STEP_PD,
      coarseStep: LIVE_MAX_JUMP_PD,
      unit: 'Δ',
      additive: !s.trainerMode,
      effective: s.shift,
    };
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    this.startAt = t + (this.demo ? DEMO_START_MS : LEAD_MS);
    hud.setProgress(0);
    hud.setScore(null);
    hud.setLabel(null);
    if (this.demo) {
      const r = restPoint(this.ctx.stage);
      ghost.moveTo(r.x, r.y, { move: 0 });
      this.caption('look');
    }
  }

  /** Bildunterschrift im Film, nur bei Änderung neu setzen */
  private caption(key: string): void {
    if (this.lastCaption === key) return;
    this.lastCaption = key;
    this.ctx.hud.caption(this.ctx.texts.captions[key]);
  }

  private dirName(d: Dir): string {
    const f = this.ctx.texts.feedback;
    return d === 'divergence' ? f.dirDivergence : f.dirConvergence;
  }

  private hudLabel(): string {
    const s = this.session;
    const n = Math.min(s.idx + 1, s.order.length);
    return this.ctx.texts.feedback.hudLabel.replace('{dir}', this.dirName(s.dir)).replace('{n}', String(n)).replace('{total}', String(s.order.length));
  }

  update(dt: number, t: number): void {
    if (this.done) return;
    const s = this.session;
    if (!this.started) {
      if (t < this.startAt) return;
      this.started = true;
      s.start(t);
    }
    this.syncLimit(this.layout());
    // Autoplay als Trainer: im Modus „Trainer“ führt die Übung selbst den Versatz (zusätzlich zu Eingaben am Regler)
    if (this.ctx.autoplay && s.trainerMode) this.autoTrainer(dt);
    s.update(t);
    if (s.idx !== this.lastIdx) this.onNewTrial();
    if (s.phase !== this.lastPhase) this.onPhase(s.phase);
    if (this.ctx.autoplay) this.autoUpdate();
    if (s.finished) this.finishSession();
  }

  private onNewTrial(): void {
    const s = this.session;
    this.lastIdx = s.idx;
    this.ctx.hud.setProgress(Math.min(1, s.idx / s.order.length));
    if (!this.demo) this.ctx.hud.setLabel(s.finished ? null : this.hudLabel());
  }

  private onPhase(phase: string): void {
    this.lastPhase = phase;
    if (!this.demo) return;
    if (phase === 'ready') {
      // Film: Die Hand zeigt zuerst die Taste „Strich fehlt“, dann folgt die große Taste
      this.caption('strokes');
      const r = this.layout().missA;
      this.ctx.ghost.moveTo(r.x + r.w / 2, r.y + r.h / 2, { move: 500 });
    } else if (phase === 'up') this.caption('up');
    else if (phase === 'down') this.caption('down');
  }

  // --- Eingabe ---

  private pad(r: Rect): number {
    return Math.max(0, 24 - Math.min(r.w, r.h) / 2); // Trefferfläche mindestens ≈ 24 px Radius
  }

  pointerDown(p: PointerInfo): void {
    if (this.done || !this.started) return;
    if (p.type === 'ghost') this.autoPlan = null;
    const L = this.layout();
    if (hit(L.main, p.x, p.y, this.pad(L.main))) return this.pressMain(p.t);
    if (hit(L.missA, p.x, p.y, this.pad(L.missA))) return this.pressMissing('a', p.t);
    if (hit(L.missB, p.x, p.y, this.pad(L.missB))) return this.pressMissing('b', p.t);
  }

  keyDown(key: string, t: number): void {
    if (this.done || !this.started) return;
    if (key === ' ' || key === 'Enter') this.pressMain(t);
    else if (key === 'ArrowUp') this.pressMissing('a', t);
    else if (key === 'ArrowDown') this.pressMissing('b', t);
  }

  /** Große Taste: im Bild-wird-doppelt-Teil „Doppelt“, danach „Wieder einfach“ */
  private pressMain(t: number): void {
    const s = this.session;
    if (s.phase === 'up') {
      if (s.reportDouble(t)) this.ctx.sfx.tap();
    } else if (s.phase === 'down') {
      if (s.reportSingle(t)) this.ctx.sfx.tap();
    }
  }

  private pressMissing(c: ColorId, t: number): void {
    if (!this.session.reportMissing(c)) return;
    this.flash[c === 'a' ? 'missA' : 'missB'] = t;
    this.ctx.sfx.tap();
  }

  // --- Autoplay (Intro-Film und Tests) ---

  /** Autoplay als Trainer: Versatz im Modus „Trainer“ steigen und fallen lassen (in der Geschwindigkeit der Einstellung) */
  private autoTrainer(dt: number): void {
    const s = this.session;
    const rate = this.p.rampPdPerS * dt;
    if (s.phase === 'up') s.live.aim(s.live.target + rate);
    else if (s.phase === 'down') s.live.aim(Math.max(0, s.live.target - rate));
  }

  private planTrial(): void {
    const s = this.session;
    const { rng } = this.ctx;
    this.autoForIdx = s.idx;
    this.autoMissed = false;
    if (this.demo) {
      this.autoBreak = DEMO_BREAK_PD;
      this.autoGap = DEMO_GAP_PD;
      return;
    }
    const top = Math.max(3, Math.min(s.capPd - 1, 16));
    this.autoBreak = rng.range(2.5, top);
    this.autoGap = rng.range(0.6, 3);
  }

  private autoUpdate(): void {
    const s = this.session;
    if (s.finished) return;
    if (this.autoForIdx !== s.idx) this.planTrial();
    const { ghost, rng } = this.ctx;
    // geplanter Tipp passt nicht mehr zur Lage (z. B. Obergrenze erreicht): verwerfen
    if (this.autoPlan && (this.autoPlan.phase !== s.phase || this.autoPlan.idx !== s.idx)) {
      ghost.clear();
      this.autoPlan = null;
    }
    if (this.autoPlan || !ghost.idle) return;
    const L = this.layout();
    let key: 'main' | 'missA' | 'missB' | null = null;
    if (s.phase === 'up' && s.shift >= this.autoBreak) key = 'main';
    else if (s.phase === 'down' && s.shift <= Math.max(0.3, this.autoBreak - this.autoGap)) key = 'main';
    else if (!this.demo && !this.autoMissed && (s.phase === 'up' || s.phase === 'down') && rng.next() < 0.002) {
      // gelegentlich meldet die Hand einen fehlenden Kontrollstrich (je Farbe, nur für Tests)
      this.autoMissed = true;
      key = rng.chance(0.5) ? 'missA' : 'missB';
    }
    if (!key) return;
    const r = L[key];
    const quick = this.ctx.quick;
    const delay = this.demo ? 250 : quick ? rng.range(40, 120) : rng.range(150, 420);
    const move = this.demo ? 450 : quick ? 180 : rng.range(240, 380);
    this.autoPlan = { key, phase: s.phase, idx: s.idx };
    ghost.tap(r.x + r.w / 2, r.y + r.h / 2, { delay, move });
  }

  // --- Ende ---

  private finishSession(): void {
    if (this.done) return;
    this.done = true;
    this.ctx.hud.setProgress(1);
    const sum = this.session.summary();
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'break_mean', value: sum.breakMean ?? 0, unit: 'pd', better: 'higher' },
        secondary: [],
        score: 0,
        level: 1,
      });
      return;
    }
    this.ctx.sfx.done();
    this.ctx.finish(this.buildResult(sum));
  }

  private colorName(c: ColorId): string {
    return colorNameOf(this.ctx.texts, this.p.tones, c);
  }

  private pdText(v: number | null): string {
    const f = this.ctx.texts.feedback;
    return v === null ? f.none : this.ctx.fmt.num(v, 1);
  }

  buildResult(sum: FusionSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const f = texts.feedback;
    const calib = calibOf(this.ctx);
    const sec: Metric[] = [];
    const add = (key: string, v: number | null) => {
      if (v !== null) sec.push({ key, value: v, unit: 'pd' });
    };
    add('break_conv', sum.conv.breakMean);
    add('break_div', sum.div.breakMean);
    add('rec_conv', sum.conv.recoveryMean);
    add('rec_div', sum.div.recoveryMean);
    const secondary = sec.slice(0, 4);

    const details: ResultDetailTable[] = [];
    // Nach Richtung
    const dirRows: ResultDetailRow[] = [];
    const dirRow = (d: Dir, ds: FusionSummary['conv']) => {
      if (!ds.n) return;
      dirRows.push({
        label: f.dirLabel.replace('{dir}', this.dirName(d)),
        value: f.dirValue.replace('{b}', this.pdText(ds.breakMean)).replace('{r}', this.pdText(ds.recoveryMean)),
        text: f.dirCount.replace('{n}', String(ds.n)).replace('{c}', String(ds.capped)).replace('{x}', String(ds.noRecovery)),
      });
    };
    dirRow('convergence', sum.conv);
    dirRow('divergence', sum.div);
    details.push({ title: f.dirTitle, rows: dirRows, note: f.dirNote });
    // Durchgänge
    details.push({
      title: f.runsTitle,
      rows: [
        { label: texts.metrics.trials, value: String(sum.n) },
        { label: texts.metrics.capped, value: String(sum.capped) },
        { label: texts.metrics.no_recovery, value: String(sum.noRecovery) },
      ],
      note: f.runsNote,
    });
    // Kontrollstriche: Zählung je Farbe (nur ein Hinweis)
    const missRow = (c: ColorId, k: number): ResultDetailRow => ({ label: f.strokeRow.replace('{c}', this.colorName(c)), value: f.strokeValue.replace('{k}', String(k)) });
    details.push({ title: f.strokeTitle, rows: [missRow('a', sum.missA), missRow('b', sum.missB)], note: f.strokeNote });
    // Einstellungen und Umrechnung
    const dist = calib.viewDistanceCm;
    const L = this.layout();
    const cmMax = pdToCm(this.p.maxPd, dist);
    const settings: ResultDetailRow[] = [];
    const trainerWanted = this.p.control === 'trainer';
    settings.push({
      label: texts.metrics.control,
      value: this.session.trainerMode ? f.controlTrainer.replace('{s}', fmt.num(this.p.startPd, 1)) : f.controlAuto.replace('{r}', fmt.num(this.p.rampPdPerS, 1)),
      text: trainerWanted && !this.session.trainerMode ? f.controlFallback : this.session.trainerMode ? undefined : f.controlLive,
    });
    const maxNotes = [f.maxDetail.replace('{cm}', fmt.num(cmMax, 1)).replace('{px}', fmt.num(cmMax * calib.pxPerCm, 0)).replace('{d}', fmt.num(dist, 0))];
    if (this.limitedPd !== null) maxNotes.push(f.maxLimited.replace('{pd}', fmt.num(this.limitedPd, 1)));
    if (!calib.calibrated) maxNotes.push(f.notCalibrated);
    settings.push({ label: texts.metrics.max, value: f.pdValue.replace('{pd}', fmt.num(this.p.maxPd, 0)), text: maxNotes.join(' · ') });
    const diaCm = (2 * L.r) / calib.pxPerCm;
    settings.push({
      label: texts.metrics.target,
      value: f.cmValue.replace('{cm}', fmt.num(diaCm, 1)),
      text: diaCm < this.p.targetCm - 0.05 ? f.targetLimited : undefined,
    });
    details.push({ title: f.settingsTitle, rows: settings, note: f.valuesNote });
    // Trainer-Regler: jede Änderung mit Zeitpunkt (nur wenn benutzt)
    const liveTable = liveDetail(this.session.live.log, f, fmt, 'Δ', 1, !this.session.trainerMode);
    if (liveTable) details.push(liveTable);

    return {
      primary: { key: 'break_mean', value: sum.breakMean ?? 0, unit: 'pd', better: 'higher' },
      secondary,
      details,
      score: pointsFor(sum.n),
      level: 1,
      tip: tipFor(sum),
    };
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h } = this.ctx.stage;
    g.fillStyle = BLACK;
    g.fillRect(0, 0, w, h);
    if (!this.started) return;
    const s = this.session;
    const L = this.layout();
    if (s.phase !== 'idle' && s.phase !== 'done') {
      this.drawTarget(g, L);
      this.drawStrokes(g, L);
      this.drawMessage(g, L);
    }
    this.drawButtons(g, L, t);
  }

  /** Das Ziel je Farbe: Rot und die zweite Farbe um den halben Versatz gegeneinander verschoben (additiv auf Schwarz) */
  private drawTarget(g: CanvasRenderingContext2D, L: FusionLayout): void {
    const calib = calibOf(this.ctx);
    const s = this.session;
    const px = Math.min(shiftPx(s.shift, calib.viewDistanceCm, calib.pxPerCm), L.maxShiftPx);
    const off = colorOffsets(this.p.leftLens, s.dir, px);
    (['a', 'b'] as ColorId[]).forEach((c) => {
      const color = c === 'a' ? this.css.a : this.css.b;
      const x = L.cx + off[c];
      const r = L.r;
      withColor(g, color, () => {
        g.lineWidth = Math.max(2, r * 0.07);
        g.lineCap = 'round';
        g.beginPath();
        g.arc(x, L.cy, r, 0, Math.PI * 2);
        g.stroke();
        g.beginPath();
        g.arc(x, L.cy, r * 0.55, 0, Math.PI * 2);
        g.stroke();
        g.beginPath();
        g.arc(x, L.cy, Math.max(2.5, r * 0.12), 0, Math.PI * 2);
        g.fill();
        // kleine Striche links und rechts außen
        g.beginPath();
        g.moveTo(x - r * 1.28, L.cy);
        g.lineTo(x - r * 1.08, L.cy);
        g.moveTo(x + r * 1.08, L.cy);
        g.lineTo(x + r * 1.28, L.cy);
        g.stroke();
      });
    });
  }

  /** Kontrollstriche: oben ein senkrechter Balken in Rot, unten einer in der zweiten Farbe, fest in der Mitte */
  private drawStrokes(g: CanvasRenderingContext2D, L: FusionLayout): void {
    const st = L.strokes;
    withColor(g, this.css.a, () => g.fillRect(st.x - st.thick / 2, st.yA - st.len / 2, st.thick, st.len));
    withColor(g, this.css.b, () => g.fillRect(st.x - st.thick / 2, st.yB - st.len / 2, st.thick, st.len));
  }

  private drawMessage(g: CanvasRenderingContext2D, L: FusionLayout): void {
    const f = this.ctx.texts.feedback;
    const phase = this.session.phase;
    const msg = phase === 'ready' ? f.msgReady : phase === 'up' ? f.msgUp : phase === 'down' ? f.msgDown : '';
    if (!msg) return;
    const w = this.ctx.stage.w - 16;
    g.save();
    g.font = font(L.msgSize, 700);
    const width = g.measureText(msg).width;
    g.restore();
    const size = width > w ? Math.max(10, L.msgSize * (w / width)) : L.msgSize;
    text(g, msg, this.ctx.stage.w / 2, L.msgY, size, UI_TEXT, { weight: 700 });
  }

  private btn(g: CanvasRenderingContext2D, r: Rect, fill: string): void {
    fillRR(g, r.x, r.y, r.w, r.h, Math.min(r.w, r.h) * 0.22, fill);
    g.save();
    rrPath(g, r.x + 0.5, r.y + 0.5, r.w - 1, r.h - 1, Math.min(r.w, r.h) * 0.22);
    g.strokeStyle = UI_LINE;
    g.lineWidth = 1.5;
    g.stroke();
    g.restore();
  }

  /** Beschriftung in die Taste einpassen (verkleinern, wenn nötig) */
  private fitLabel(g: CanvasRenderingContext2D, label: string, r: Rect, x: number, room: number, base: number): void {
    let size = base;
    g.save();
    g.font = font(size, 700);
    const width = g.measureText(label).width;
    g.restore();
    if (width > room) size = Math.max(9, size * (room / width));
    text(g, label, x, r.y + r.h / 2 + 1, size, C.fg, { weight: 700 });
  }

  private drawButtons(g: CanvasRenderingContext2D, L: FusionLayout, t: number): void {
    const { texts } = this.ctx;
    const f = texts.feedback;
    const s = this.session;
    const phase = s.phase;
    // große Taste
    const label = phase === 'down' ? f.singleBtn : f.doubleBtn;
    const live = phase === 'up' || phase === 'down';
    g.save();
    g.globalAlpha = live ? 1 : 0.35;
    this.btn(g, L.main, live ? 'rgba(255,255,255,0.22)' : UI_FILL);
    this.fitLabel(g, label, L.main, L.main.x + L.main.w / 2, L.main.w * 0.88, clamp(L.main.h * 0.36, 14, 26));
    g.restore();
    // Tasten „Strich fehlt“: Beschriftung mit Pfeil (oben/unten); beim Antippen kurz heller mit ✓
    const enabled = phase === 'ready' || phase === 'up' || phase === 'down';
    const items: Array<{ r: Rect; c: 'missA' | 'missB'; arrow: string; text: string }> = [
      { r: L.missA, c: 'missA', arrow: '↑', text: f.missRed },
      { r: L.missB, c: 'missB', arrow: '↓', text: this.p.tones === 'redcyan' ? f.missCyan : this.p.tones === 'redblue' ? f.missBlue : f.missGreen },
    ];
    for (const { r, c, arrow, text: label2 } of items) {
      const on = t - this.flash[c] < 700;
      g.save();
      g.globalAlpha = enabled ? 1 : 0.35;
      this.btn(g, r, on ? 'rgba(255,255,255,0.26)' : UI_FILL);
      this.fitLabel(g, `${arrow} ${label2}`, r, r.x + r.w * 0.56, r.w * 0.74, clamp(r.h * 0.28, 11, 19));
      if (on) {
        const aw = clamp(r.h * 0.2, 6, 11);
        const cx = r.x + r.w * 0.1;
        const cy = r.y + r.h / 2;
        g.strokeStyle = C.fg;
        g.lineWidth = 3;
        g.lineCap = 'round';
        g.lineJoin = 'round';
        g.beginPath();
        g.moveTo(cx - aw, cy);
        g.lineTo(cx - aw * 0.25, cy + aw * 0.75);
        g.lineTo(cx + aw, cy - aw * 0.7);
        g.stroke();
      }
      g.restore();
    }
  }
}

/** Prüfbild im Intro (Schritt für Schritt oder einfach); Aufbau und Texte teilen sich die Anaglyphen-Übungen */
function colorCheck(params: ExerciseParams, tx: ExerciseTexts): ColorCheckInfo {
  return anaglyphColorCheck(readAnaglyph(params, false), tx);
}

export const laborFusion: ExerciseDefinition = {
  id: 'labor-fusion',
  category: 'wahrnehmung',
  minutes: 3,
  color: '#8C6D4A',
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="2.6"><circle cx="19" cy="24" r="11" opacity=".55"/><circle cx="29" cy="24" r="11"/><circle cx="19" cy="24" r="5" opacity=".55"/><circle cx="29" cy="24" r="5"/></g><g fill="currentColor"><circle cx="19" cy="24" r="1.6" opacity=".6"/><circle cx="29" cy="24" r="1.6"/></g>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  colorCheck,
  liveControls: [{ key: 'shiftPd', unit: 'Δ', min: -HARD_MAX_PD, max: HARD_MAX_PD, step: LIVE_STEP_PD, coarseStep: LIVE_MAX_JUMP_PD }],
  create: (ctx) => new Fusion(ctx),
};
