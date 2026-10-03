/**
 * Rot-Grün-Lesen (Labor) – mit Rot-Grün-Brille eine Folge aus Ziffern oder Buchstaben lesen, deren Zeichen teils rot, teils
 * grün (oder cyan) auf Schwarz stehen, und sie mit Bildschirmtasten der Reihe nach eintippen.
 *
 * Eigene Umsetzung der klassischen dichoptischen Aufgabe (jedes Auge sieht durch sein Farbglas nur die Zeichen „seiner“
 * Farbe): Einstellungen (`ctx.params`, siehe logic.ts `PARAMS`), Zeichenhöhe in cm mit Sehwinkel (`ctx.calib`), reine Logik
 * in logic.ts (`RgSession`), Anordnung in layout.ts.
 *
 * - Hauptwert: Anteil ganz richtiger Folgen (`accuracy`, höher = besser). Zusätzlich richtige Zeichen, fehlende oder
 *   verwechselte Zeichen je Farbe (erst ab 20 Zeichen je Farbe verglichen) und je Auge (nur als Hinweis, kein Befund),
 *   mittlere Eingabezeit.
 * - Schwarzer Grund, reines Rot (255,0,0) und reines Grün (0,255,0) bzw. Cyan (0,255,255), skaliert mit der Helligkeit.
 *   Ein neutral hellgrauer Rahmen und ein kleines Kreuz werden von beiden Augen gesehen und halten die Bilder zusammen.
 *   Bedienung (Tasten, Beschriftungen, ✓/✗) hängt nicht an der Farbe; nur die Aufgabe selbst ist farbbasiert.
 * - Ruhig: kein Flackern, keine schnellen Wechsel, keine Blitze; Rückmeldung weich (✓/✗ als Symbol, kein Rotblitz).
 * - Gemessen wird nur, was du eintippst – nicht, ob du die Brille trägst, wohin du schaust, oder welches Auge etwas sieht.
 */
import { calibOf } from '../../core/calib';
import { C, fillRR, font, hit, rrPath, text, type Rect } from '../../core/draw';
import { paramsOf } from '../../core/params';
import { clamp } from '../../core/stats';
import type { ColorCheckInfo, Exercise, ExerciseContext, ExerciseDefinition, ExerciseParams, ExerciseResult, ExerciseTexts, Metric, PointerInfo, ResultDetailRow, ResultDetailTable } from '../../core/types';
import { restPoint } from '../_shared/tippziele';
import { drawSoftCheck, drawSoftCross } from '../_shared/weiche-marken';
import { rgLayout, type RgLayout } from './layout';
import {
  COLOR_GAP_PCT,
  eyeColors,
  MIN_PER_COLOR,
  PARAMS,
  pointsFor,
  QUICK_TRIALS,
  rgParams,
  RgSession,
  showMs,
  tipFor,
  toneCss,
  UNSURE,
  visualAngleDeg,
  type ColorId,
  type ColorTally,
  type RgParams,
  type RgSummary,
  type ToneCss,
} from './logic';
import { de, it } from './texts';

const LEAD_MS = 500;
const BLACK = '#000000';
/** Neutrales Hellgrau für Bedienelemente und Beschriftung (beide Augen sehen es) */
const UI_LINE = 'rgba(255,255,255,0.28)';
const UI_FILL = 'rgba(255,255,255,0.12)';

// Intro-Film: zwei kurze Folgen; bei der zweiten zeigt die Hand, wie man „nicht gesehen“ eingibt
const DEMO_PARAMS: Partial<RgParams> = { trials: 2, symbols: 'digits', length: 4, sizeCm: 1.8, mix: 'alternate', showFor: 'unlimited', leftLens: 'red', tones: 'redgreen', brightness: 100 };
const DEMO_LEAD_MS = 800;
const DEMO_FEEDBACK_MS = 1000;
const DEMO_START_MS = 600;

interface Mark {
  t0: number;
}

class RotGruenLesen implements Exercise {
  private readonly demo: boolean;
  private readonly p: RgParams;
  private readonly css: ToneCss;
  private readonly session: RgSession;
  private started = false;
  private startAt = 0;
  private done = false;
  private seenTrials = 0;
  private mark: Mark | null = null;
  private lastPhase = '';
  /** Autoplay: geplante Tasten der laufenden Folge (letzte: `done`) */
  private autoKeys: string[] = [];
  private autoPos = 0;
  private autoFor = -1;
  private autoPlanned = false;
  private limited = false;
  private lastCaption = '';

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = rgParams(paramsOf(ctx, PARAMS));
    this.p = this.demo ? { ...base, ...DEMO_PARAMS } : ctx.quick ? { ...base, trials: Math.min(base.trials, QUICK_TRIALS) } : base;
    this.css = toneCss(this.p.tones, this.p.brightness);
    this.session = new RgSession(this.p, {
      rng: ctx.rng,
      leadMs: this.demo ? DEMO_LEAD_MS : undefined,
      feedbackMs: this.demo ? DEMO_FEEDBACK_MS : undefined,
    });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private layout(): RgLayout {
    const s = this.ctx.stage;
    return rgLayout({
      w: s.w,
      h: s.h,
      u: s.u,
      captionReserve: this.demo ? this.captionReserve() : 0,
      demo: this.demo,
      wantGlyphPx: calibOf(this.ctx).sizePx(this.p.sizeCm),
      length: this.p.length,
      keyCount: this.session.keys.length,
    });
  }

  /** Platz unten im Intro-Film für Hand und Bildunterschrift */
  private captionReserve(): number {
    const s = this.ctx.stage;
    const size = clamp(s.u * 4.6, 14, 30);
    return size * 2.1 + s.h * 0.05 + Math.max(6, s.u * 1.5);
  }

  private glyphCm(L: RgLayout): number {
    return L.glyph / calibOf(this.ctx).pxPerCm;
  }

  resize(): void {
    // Alles wird aus der Bühne neu berechnet; nur der geplante Tipp der Geister-Hand muss neu gesetzt werden
    if (this.ctx.autoplay) {
      this.ctx.ghost.clear();
      this.autoPlanned = false;
    }
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    this.startAt = t + (this.demo ? DEMO_START_MS : LEAD_MS);
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    hud.setLabel(this.demo ? null : this.trialLabel());
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

  private trialLabel(): string {
    const n = Math.min(this.session.idx + 1, this.p.trials);
    return this.ctx.texts.feedback.trial.replace('{n}', String(n)).replace('{total}', String(this.p.trials));
  }

  update(_dt: number, t: number): void {
    if (this.done) return;
    const s = this.session;
    if (!this.started) {
      if (t < this.startAt) return;
      this.started = true;
      s.start(t);
      this.limited = this.glyphCm(this.layout()) < this.p.sizeCm - 0.05;
    }
    s.update(t);
    if (s.phase !== this.lastPhase) this.onPhase(s.phase);
    this.noticeResult(t);
    if (this.ctx.autoplay) this.autoUpdate();
    if (s.finished) this.finishSession();
  }

  private onPhase(phase: string): void {
    this.lastPhase = phase;
    const s = this.session;
    const { hud } = this.ctx;
    if (phase === 'lead') {
      hud.setProgress(Math.min(1, s.idx / this.p.trials));
      if (!this.demo) hud.setLabel(this.trialLabel());
      if (this.demo && s.idx > 0) this.caption('look');
    }
    if (phase === 'input' && this.demo) this.caption(s.idx === 0 ? 'read' : 'unsure');
  }

  /** Auswertung einer Folge bemerken (Ton, Zeichen, Punkte) */
  private noticeResult(t: number): void {
    const s = this.session;
    while (this.seenTrials < s.trials.length) {
      const tr = s.trials[this.seenTrials++];
      this.mark = { t0: t };
      if (tr.correct) this.ctx.sfx.good();
      else this.ctx.sfx.bad();
      if (!this.demo) this.ctx.hud.setScore(s.trials.filter((x) => x.correct).length);
    }
  }

  // --- Eingabe ---

  private pad(r: Rect): number {
    return Math.max(0, 24 - Math.min(r.w, r.h) / 2); // Trefferfläche mindestens ≈ 24 px Radius
  }

  pointerDown(p: PointerInfo): void {
    if (this.done || !this.started) return;
    const s = this.session;
    if (!s.canEnter) return;
    if (p.type === 'ghost' && this.autoPlanned) {
      this.autoPlanned = false;
      this.autoPos++;
    }
    const L = this.layout();
    if (hit(L.done, p.x, p.y, this.pad(L.done))) {
      this.submit(p.t);
      return;
    }
    if (hit(L.back, p.x, p.y, this.pad(L.back))) {
      if (s.back()) this.ctx.sfx.tap();
      return;
    }
    for (let i = 0; i < L.keys.length; i++) {
      const r = L.keys[i];
      if (hit(r, p.x, p.y, this.pad(r))) {
        this.press(s.keys[i]);
        return;
      }
    }
  }

  keyDown(key: string, t: number): void {
    if (this.done || !this.started || !this.session.canEnter) return;
    if (key === 'Enter') this.submit(t);
    else if (key === 'Backspace') {
      if (this.session.back()) this.ctx.sfx.tap();
    } else if (key.length === 1) {
      const k = key === UNSURE ? UNSURE : key.toUpperCase();
      this.press(k);
    }
  }

  private press(key: string): void {
    const s = this.session;
    if (!s.press(key)) return;
    this.ctx.sfx.tap();
    if (this.demo && s.idx === 0) this.caption(s.entry.length >= this.p.length ? 'done' : 'enter');
  }

  private submit(t: number): void {
    this.session.submit(t);
  }

  // --- Autoplay (Intro-Film und Tests) ---

  private buildAutoKeys(): string[] {
    const s = this.session;
    const { rng } = this.ctx;
    const out: string[] = [];
    s.target.forEach((cell, i) => {
      if (this.demo) {
        // Film: erste Folge ganz richtig, in der zweiten ist ein Zeichen „nicht gesehen“
        out.push(s.idx === 1 && i === 2 ? UNSURE : cell.ch);
        return;
      }
      const r = rng.next();
      if (r < 0.06) out.push(UNSURE);
      else if (r < 0.13) out.push(s.pool.find((x) => x !== cell.ch && !s.target.some((c) => c.ch === x)) ?? s.pool.find((x) => x !== cell.ch) ?? cell.ch);
      else out.push(cell.ch);
    });
    out.push('done');
    return out;
  }

  private autoUpdate(): void {
    const s = this.session;
    if (s.phase !== 'input') return;
    if (this.autoFor !== s.idx) {
      this.autoFor = s.idx;
      this.autoKeys = this.buildAutoKeys();
      this.autoPos = 0;
      this.autoPlanned = false;
    }
    const { ghost, rng } = this.ctx;
    if (this.autoPlanned || !ghost.idle) return;
    const key = this.autoKeys[this.autoPos];
    if (key === undefined) return;
    const L = this.layout();
    const r = key === 'done' ? L.done : L.keys[s.keys.indexOf(key)];
    if (!r) return;
    const quick = this.ctx.quick;
    let delay: number;
    let move: number;
    if (this.demo) {
      delay = this.autoPos === 0 ? 500 : 150;
      move = 450;
    } else {
      delay = quick ? rng.range(60, 140) : rng.range(150, 380);
      move = quick ? 200 : rng.range(240, 380);
    }
    if (key === 'done') delay += this.demo ? 100 : 250;
    this.autoPlanned = true;
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
        primary: { key: 'accuracy', value: sum.accuracy ?? 0, unit: 'percent', better: 'higher' },
        secondary: [{ key: 'correct', value: sum.correct, unit: 'count' }],
        score: 0,
        level: 1,
      });
      return;
    }
    this.ctx.sfx.done();
    this.ctx.finish(this.buildResult(sum));
  }

  private colorName(c: ColorId): string {
    const f = this.ctx.texts.feedback;
    return c === 'a' ? f.nameRed : this.p.tones === 'redcyan' ? f.nameCyan : f.nameGreen;
  }

  private tallyText(tl: ColorTally): string {
    return this.ctx.texts.feedback.colorRow.replace('{bad}', String(tl.missing + tl.wrong)).replace('{n}', String(tl.shown));
  }

  private errText(tl: ColorTally): string | undefined {
    if (!tl.shown) return undefined;
    const f = this.ctx.texts.feedback;
    return f.colorDetail
      .replace('{p}', this.ctx.fmt.num((100 * (tl.missing + tl.wrong)) / tl.shown, 0))
      .replace('{miss}', String(tl.missing))
      .replace('{wrong}', String(tl.wrong));
  }

  buildResult(sum: RgSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const f = texts.feedback;
    const sec: Metric[] = [];
    if (sum.symbolAccuracy !== null) sec.push({ key: 'symbol_accuracy', value: sum.symbolAccuracy, unit: 'percent' });
    if (sum.enough && sum.errA !== null && sum.errB !== null) {
      sec.push({ key: 'err_red', value: sum.errA, unit: 'percent' });
      sec.push({ key: 'err_second', value: sum.errB, unit: 'percent' });
    } else sec.push({ key: 'correct', value: sum.correct, unit: 'count' });
    if (sum.entryMean !== null) sec.push({ key: 'entry_mean', value: sum.entryMean, unit: 'ms' });
    const secondary = sec.slice(0, 4);

    const details: ResultDetailTable[] = [];
    // Nach Farbe
    const colorRows: ResultDetailRow[] = (['a', 'b'] as ColorId[]).map((c) => ({
      label: f.rowColor.replace('{c}', this.colorName(c)),
      value: this.tallyText(sum.byColor[c]),
      text: this.errText(sum.byColor[c]),
    }));
    details.push({
      title: f.colorTitle,
      rows: colorRows,
      note: sum.enough
        ? f.colorNote
        : f.colorFew.replace('{min}', String(MIN_PER_COLOR)).replace('{a}', String(sum.byColor.a.shown)).replace('{b}', String(sum.byColor.b.shown)),
    });
    // Nach Auge (nur mit genug Zeichen je Farbe)
    if (sum.enough) {
      const eyes = eyeColors(this.p.leftLens);
      const lens = (c: ColorId) => (c === 'a' ? f.lensRed : this.p.tones === 'redcyan' ? f.lensCyan : f.lensGreen);
      const eyeRows: ResultDetailRow[] = [
        { label: f.eyeLeft.replace('{lens}', lens(eyes.left)), value: this.tallyText(sum.byEye.left), text: this.errText(sum.byEye.left) },
        { label: f.eyeRight.replace('{lens}', lens(eyes.right)), value: this.tallyText(sum.byEye.right), text: this.errText(sum.byEye.right) },
      ];
      const hintText =
        sum.moreOftenEye === 'left' ? f.eyeMoreLeft : sum.moreOftenEye === 'right' ? f.eyeMoreRight : f.eyeEven.replace('{gap}', String(COLOR_GAP_PCT));
      details.push({ title: f.eyeTitle, rows: eyeRows, note: `${hintText} ${f.eyeNote}` });
    }
    // Weitere Werte
    const L = this.layout();
    const cm = this.glyphCm(L);
    const calib = calibOf(this.ctx);
    const deg = visualAngleDeg(cm, calib.viewDistanceCm);
    const more: ResultDetailRow[] = [];
    if (sum.symbolsTotal) more.push({ label: texts.metrics.chars, value: f.charsValue.replace('{ok}', String(sum.symbolsOk)).replace('{n}', String(sum.symbolsTotal)) });
    const sizeNotes = [
      f.sizeDetail.replace('{deg}', fmt.num(deg, 1)).replace('{d}', fmt.num(calib.viewDistanceCm, 0)),
      ...(this.limited ? [f.limited] : calib.calibrated ? [] : [f.notCalibrated]),
    ];
    more.push({ label: texts.metrics.size, value: f.sizeValue.replace('{cm}', fmt.num(cm, 1)), text: sizeNotes.join(' · ') });
    const ms = showMs(this.p);
    more.push({ label: texts.metrics.shown, value: ms === null ? f.unlimited : fmt.time(ms, 0) });
    details.push({ title: f.moreTitle, rows: more, note: f.moreNote });

    return {
      primary: { key: 'accuracy', value: sum.accuracy ?? 0, unit: 'percent', better: 'higher' },
      secondary,
      details,
      score: pointsFor(sum.correct),
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
    this.drawFrame(g, L);
    if (s.visible) this.drawChars(g, L);
    const active = s.phase === 'input';
    this.drawEntry(g, L);
    if (s.phase === 'feedback') {
      this.drawMarks(g, L, t);
      this.drawVerdict(g, L);
    } else if (!this.demo && active) this.drawAsk(g, L);
    this.drawActions(g, L, active);
    this.drawKeys(g, L, active);
  }

  /** Fusionsrahmen und Kreuz: neutral hellgrau, von beiden Augen gesehen */
  private drawFrame(g: CanvasRenderingContext2D, L: RgLayout): void {
    const f = L.frame;
    g.save();
    g.strokeStyle = this.css.neutral;
    g.lineWidth = 3;
    rrPath(g, f.x, f.y, f.w, f.h, Math.min(18, f.h * 0.12));
    g.stroke();
    g.lineWidth = 2.5;
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(L.crossX - L.crossArm, L.crossY);
    g.lineTo(L.crossX + L.crossArm, L.crossY);
    g.moveTo(L.crossX, L.crossY - L.crossArm);
    g.lineTo(L.crossX, L.crossY + L.crossArm);
    g.stroke();
    g.restore();
  }

  /** Die Folge: jedes Zeichen in seiner Farbe */
  private drawChars(g: CanvasRenderingContext2D, L: RgLayout): void {
    g.save();
    g.font = font(L.glyph / 0.72, 700);
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    this.session.target.forEach((c, i) => {
      g.fillStyle = c.color === 'a' ? this.css.a : this.css.b;
      g.fillText(c.ch, L.chars[i].x, L.chars[i].y);
    });
    g.restore();
  }

  /** Eingabefeld: ein Platz je Zeichen mit Unterstrich, getippte Zeichen neutral hell darin */
  private drawEntry(g: CanvasRenderingContext2D, L: RgLayout): void {
    const s = this.session;
    const n = this.p.length;
    const size = L.entrySize;
    const x0 = this.ctx.stage.w / 2 - ((n - 1) / 2) * L.entryPitch;
    const typing = s.phase === 'input';
    for (let i = 0; i < n; i++) {
      const x = x0 + i * L.entryPitch;
      const active = typing && i === s.entry.length;
      g.save();
      g.strokeStyle = active ? C.fg : 'rgba(255,255,255,0.35)';
      g.lineWidth = active ? 3.5 : 2.5;
      g.lineCap = 'round';
      g.beginPath();
      g.moveTo(x - size * 0.4, L.entryY + size * 0.62);
      g.lineTo(x + size * 0.4, L.entryY + size * 0.62);
      g.stroke();
      g.restore();
    }
    g.save();
    g.font = font(size / 0.72, 700);
    g.fillStyle = C.fg;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    s.entry.forEach((c, i) => g.fillText(c, x0 + i * L.entryPitch, L.entryY));
    g.restore();
  }

  private drawAsk(g: CanvasRenderingContext2D, L: RgLayout): void {
    const msg = this.ctx.texts.feedback.ask;
    const w = this.ctx.stage.w - 16;
    g.save();
    g.font = font(L.askSize, 700);
    const width = g.measureText(msg).width;
    g.restore();
    const size = width > w ? Math.max(10, L.askSize * (w / width)) : L.askSize;
    text(g, msg, this.ctx.stage.w / 2, L.askY, size, C.dim, { weight: 700 });
  }

  /** Marken ✓/✗ unter jedem Zeichen, weich eingeblendet (bei reduzierter Bewegung sofort) */
  private drawMarks(g: CanvasRenderingContext2D, L: RgLayout, t: number): void {
    const last = this.session.last;
    if (!last || !this.mark) return;
    const a = this.ctx.reducedMotion ? 1 : clamp((t - this.mark.t0) / 180, 0, 1);
    const ms = clamp(L.glyph * 0.16, 6, 14);
    last.marks.forEach((m, i) => {
      const x = L.chars[i].x;
      const y = L.chars[i].y + L.markDy;
      if (m === 'ok') drawSoftCheck(g, x, y, ms, a);
      else drawSoftCross(g, x, y, ms, a);
    });
  }

  private drawVerdict(g: CanvasRenderingContext2D, L: RgLayout): void {
    const last = this.session.last;
    if (!last) return;
    const f = this.ctx.texts.feedback;
    const msg = last.correct ? f.right : f.partial.replace('{k}', String(last.symbolsOk)).replace('{n}', String(this.p.length));
    const size = clamp(this.ctx.stage.u * 3.8, 14, 24);
    text(g, msg, this.ctx.stage.w / 2, L.askY, size, C.fg, { weight: 700 });
  }

  private btn(g: CanvasRenderingContext2D, r: Rect, fill: string, dashed = false): void {
    fillRR(g, r.x, r.y, r.w, r.h, Math.min(r.w, r.h) * 0.22, fill);
    g.save();
    rrPath(g, r.x + 0.5, r.y + 0.5, r.w - 1, r.h - 1, Math.min(r.w, r.h) * 0.22);
    g.strokeStyle = UI_LINE;
    g.lineWidth = 1.5;
    if (dashed) g.setLineDash([6, 5]);
    g.stroke();
    g.restore();
  }

  private drawKeys(g: CanvasRenderingContext2D, L: RgLayout, active: boolean): void {
    const s = this.session;
    const keySize = Math.min(L.keys[0].h * 0.52, 34);
    g.save();
    g.globalAlpha = active ? 1 : 0.35;
    L.keys.forEach((r, i) => {
      const isUnsure = s.keys[i] === UNSURE;
      this.btn(g, r, UI_FILL, isUnsure);
      text(g, s.keys[i], r.x + r.w / 2, r.y + r.h / 2 + 1, keySize, C.fg, { weight: 700 });
    });
    g.restore();
  }

  private drawActions(g: CanvasRenderingContext2D, L: RgLayout, active: boolean): void {
    const { texts } = this.ctx;
    const s = this.session;
    const size = clamp(L.back.h * 0.3, 12, 20);
    // Löschen: Pfeil nach links + Text (nie nur Symbol)
    const b = L.back;
    g.save();
    g.globalAlpha = active ? 1 : 0.35;
    this.btn(g, b, 'rgba(255,255,255,0.08)');
    const aw = clamp(b.h * 0.2, 6, 11);
    const ax = b.x + b.w * 0.13;
    const ay = b.y + b.h / 2;
    g.strokeStyle = C.fg;
    g.lineWidth = 2.5;
    g.lineCap = 'round';
    g.lineJoin = 'round';
    g.beginPath();
    g.moveTo(ax + aw, ay - aw);
    g.lineTo(ax, ay);
    g.lineTo(ax + aw, ay + aw);
    g.moveTo(ax, ay);
    g.lineTo(ax + aw * 2, ay);
    g.stroke();
    text(g, texts.feedback.erase, b.x + b.w * 0.62, ay + 1, size, C.fg, { weight: 700 });
    g.restore();
    // Fertig: Haken + Text; erst nach dem ersten Zeichen deutlich
    const d = L.done;
    const ready = active && s.canSubmit;
    g.save();
    g.globalAlpha = ready ? 1 : active ? 0.5 : 0.35;
    this.btn(g, d, ready ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)');
    const dx = d.x + d.w * 0.15;
    const dy = d.y + d.h / 2;
    g.strokeStyle = C.fg;
    g.lineWidth = 3;
    g.lineCap = 'round';
    g.lineJoin = 'round';
    g.beginPath();
    g.moveTo(dx - aw, dy);
    g.lineTo(dx - aw * 0.25, dy + aw * 0.75);
    g.lineTo(dx + aw, dy - aw * 0.7);
    g.stroke();
    text(g, texts.feedback.done, d.x + d.w * 0.6, dy + 1, size, C.fg, { weight: 700 });
    g.restore();
  }
}

/** Prüfbild im Intro (ohne Wertung): zwei Flächen in den eingestellten Farben, damit die Brille geprüft werden kann */
function colorCheck(params: ExerciseParams, tx: ExerciseTexts): ColorCheckInfo {
  const p = rgParams(params);
  const css = toneCss(p.tones, p.brightness);
  const f = tx.feedback;
  return {
    title: f.checkTitle,
    text: f.checkText,
    panels: [
      { color: css.a, label: f.nameRed },
      { color: css.b, label: p.tones === 'redcyan' ? f.nameCyan : f.nameGreen },
    ],
  };
}

export const laborRotGruenLesen: ExerciseDefinition = {
  id: 'labor-rot-gruen-lesen',
  category: 'wahrnehmung',
  minutes: 2,
  color: '#8C6D4A',
  icon:
    '<rect x="5" y="9" width="38" height="30" rx="5" fill="none" stroke="currentColor" stroke-width="2.6" opacity=".55"/><path d="M24 12v5M21.5 14.5h5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><g fill="currentColor"><rect x="10" y="22" width="5" height="9" rx="1.4"/><rect x="18" y="22" width="5" height="9" rx="1.4" opacity=".4"/><rect x="26" y="22" width="5" height="9" rx="1.4"/><rect x="34" y="22" width="5" height="9" rx="1.4" opacity=".4"/></g>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  colorCheck,
  create: (ctx) => new RotGruenLesen(ctx),
};
