/**
 * Worth-Vier-Punkte (Labor) – Funktionsübung nach dem Prinzip des klassischen Worth-Vier-Punkte-Verfahrens mit Rot-Grün-Brille.
 *
 * Vier Lichter in Rautenform auf schwarzem Grund: oben ein rotes, links und rechts je eines in der zweiten Farbe (Grün, Cyan
 * oder Blau), unten ein weißes. Mit der Brille sieht jedes Auge durch sein Glas nur Teile davon, das weiße Licht sehen beide.
 * Du zählst die Lichter und tippst die Zahl (2, 3, 4, 5 oder „Unklar“). Reine Logik in logic.ts (`WorthSession`).
 *
 * - Hauptwert: beantwortete Darbietungen (`answered`, Zahl der Eingaben, keine Leistung). Gezeigt werden Übungswerte: wie oft
 *   welche Zahl gemeldet wurde und wie einheitlich die Antworten waren. Die App deutet die Zahl nicht und nennt keine Richtwerte.
 * - Die Raute liegt im Feld (Größe in cm mit Kalibrierung, auf kleinen Bildschirmen begrenzt; die gezeichnete Größe steht im
 *   Ergebnis). Tasten ≥ 56 px, neutral hellgrau; kein Flackern, keine Blitze, kein Fusionsrahmen (er würde die Trennung aufheben).
 * - Gemessen wird nur, was du eintippst – nicht, ob du die Brille trägst oder die Augen zuhältst.
 */
import { calibOf } from '../../core/calib';
import { hit, type Rect } from '../../core/draw';
import { paramsOf } from '../../core/params';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseParams, ExerciseResult, ExerciseTexts, Metric, PointerInfo, ResultDetailRow, ResultDetailTable } from '../../core/types';
import { anaColorCheck, anaColorName, anaCss, anaEyeOf, anaLensName, withAnaColor, type AnaCss } from '../_shared/pruefung-anaglyph';
import { drawBtn, drawHint, pruefLayout, splitRow, type PruefLayout } from '../_shared/pruefung-ui';
import { restPoint } from '../_shared/tippziele';
import { ANSWERS, PARAMS, tipFor, WorthSession, worthParams, type WorthAnswer, type WorthParams, type WorthSummary } from './logic';
import { de, it } from './texts';

const BLACK = '#000000';
const LEAD_MS = 600;
const DEMO_START_MS = 1500;
const DEMO_END_MS = 1200;
/** Im Schnelllauf (`?quick=1`): Darbietungen */
const QUICK_REPEATS = 3;
// Intro-Film: zwei Darbietungen, größere Lichter (die Bühne ist dort nur etwa 13 cm hoch)
const DEMO_PARAMS: Partial<WorthParams> = { repeats: 2, dotCm: 1.6, varySize: false, leftLens: 'red', tones: 'redgreen', redLevel: 100, secondLevel: 100 };

class WorthVierPunkte implements Exercise {
  private readonly demo: boolean;
  private readonly p: WorthParams;
  private readonly css: AnaCss;
  private readonly session: WorthSession;
  private started = false;
  private startAt = 0;
  private done = false;
  private finishAt = -1;
  private queued = false;
  private lastCaption = '';
  private lastIdx = -1;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = worthParams(paramsOf(ctx, PARAMS));
    this.p = this.demo ? { ...base, ...DEMO_PARAMS } : ctx.quick ? { ...base, repeats: Math.min(base.repeats, QUICK_REPEATS) } : base;
    this.css = anaCss(this.p);
    this.session = new WorthSession(this.p);
  }

  // --- Geometrie: immer live aus der Bühne ---

  private layout(): PruefLayout {
    return pruefLayout(this.ctx.stage, this.demo, 1);
  }

  /** Tasten 2, 3, 4, 5, Unklar */
  private buttons(L: PruefLayout): Rect[] {
    return splitRow(L.rows[0], [1, 1, 1, 1, 1.7], L.gap);
  }

  /** Radius der Lichter (px) für die Größe `cm`, begrenzt, damit die Raute (Mittenabstand 2,6 r) ins Feld passt */
  private radius(L: PruefLayout, cm: number): number {
    const calib = calibOf(this.ctx);
    const f = L.field;
    const rMax = (Math.min(f.w, f.h) / 2 - 4) / 3.6;
    return Math.max(3, Math.min(calib.sizePx(cm) / 2, rMax));
  }

  resize(): void {
    if (this.ctx.autoplay) {
      this.ctx.ghost.clear();
      this.queued = false;
    }
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    this.startAt = t + (this.demo ? DEMO_START_MS : LEAD_MS);
    hud.setProgress(0);
    hud.setScore(null);
    hud.setLabel(this.demo ? null : this.label());
    if (this.demo) {
      const r = restPoint(this.ctx.stage);
      ghost.moveTo(r.x, r.y, { move: 0 });
      this.caption('look');
    }
  }

  private caption(key: string): void {
    if (this.lastCaption === key) return;
    this.lastCaption = key;
    this.ctx.hud.caption(this.ctx.texts.captions[key]);
  }

  private label(): string {
    const s = this.session;
    return this.ctx.texts.feedback.progress.replace('{n}', String(Math.min(s.idx + 1, s.sizes.length))).replace('{total}', String(s.sizes.length));
  }

  update(_dt: number, t: number): void {
    if (this.done) return;
    const s = this.session;
    if (!this.started) {
      if (t < this.startAt) return;
      this.started = true;
      s.start(t);
      if (this.demo) this.caption('count');
    }
    if (s.idx !== this.lastIdx) {
      this.lastIdx = s.idx;
      this.ctx.hud.setProgress(Math.min(1, s.idx / s.sizes.length));
      if (!this.demo) this.ctx.hud.setLabel(this.label());
    }
    if (s.finished) {
      if (this.finishAt < 0) {
        this.finishAt = t + (this.demo ? DEMO_END_MS : 0);
        if (this.demo) this.caption('done');
      }
      if (t >= this.finishAt) this.finishSession();
      return;
    }
    if (this.ctx.autoplay) this.autoUpdate();
  }

  // --- Eingabe ---

  private pad(r: Rect): number {
    return Math.max(0, 24 - Math.min(r.w, r.h) / 2);
  }

  pointerDown(p: PointerInfo): void {
    if (this.done || !this.started) return;
    if (p.type === 'ghost') this.queued = false;
    const btns = this.buttons(this.layout());
    for (let i = 0; i < btns.length; i++) {
      if (hit(btns[i], p.x, p.y, this.pad(btns[i]))) {
        this.answer(ANSWERS[i], p.t);
        return;
      }
    }
  }

  keyDown(key: string, t: number): void {
    if (this.done || !this.started) return;
    if (key === '2' || key === '3' || key === '4' || key === '5') this.answer(Number(key) as WorthAnswer, t);
    else if (key === '?') this.answer('unclear', t);
  }

  private answer(a: WorthAnswer, t: number): void {
    const s = this.session;
    if (s.finished) return;
    const L = this.layout();
    const calib = calibOf(this.ctx);
    const eff = (2 * this.radius(L, s.currentSize)) / calib.pxPerCm;
    if (s.answer(a, t, eff)) this.ctx.sfx.tap();
  }

  // --- Autoplay (Intro-Film und Tests) ---

  private autoUpdate(): void {
    const { ghost, rng } = this.ctx;
    if (this.queued || !ghost.idle || !this.started) return;
    const s = this.session;
    const L = this.layout();
    const btns = this.buttons(L);
    let a: WorthAnswer = 4;
    if (!this.demo) {
      const r = rng.next();
      a = r < 0.7 ? 4 : r < 0.8 ? 2 : r < 0.88 ? 3 : r < 0.94 ? 5 : 'unclear';
    }
    const b = btns[ANSWERS.indexOf(a)];
    const quick = this.ctx.quick;
    const delay = this.demo ? (s.idx === 0 ? 3100 : 1500) : quick ? rng.range(150, 350) : rng.range(700, 1500);
    const move = this.demo ? 480 : quick ? 200 : rng.range(240, 380);
    this.queued = true;
    if (this.demo && s.idx === 0) this.caption('answer');
    ghost.tap(b.x + b.w / 2, b.y + b.h / 2, { delay, move });
  }

  // --- Ende ---

  private finishSession(): void {
    if (this.done) return;
    this.done = true;
    this.ctx.hud.setProgress(1);
    const sum = this.session.summary();
    if (this.demo) {
      this.ctx.finish({ primary: { key: 'answered', value: sum.answered, unit: 'count', better: 'higher' }, secondary: [], score: 0, level: 1 });
      return;
    }
    this.ctx.sfx.done();
    this.ctx.finish(this.buildResult(sum));
  }

  buildResult(sum: WorthSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const f = texts.feedback;
    const calib = calibOf(this.ctx);
    const secondary: Metric[] = [
      { key: 'lights4', value: sum.n4, unit: 'count' },
      { key: 'lights2', value: sum.n2, unit: 'count' },
      { key: 'lights3', value: sum.n3, unit: 'count' },
      { key: 'lights5', value: sum.n5, unit: 'count' },
    ];
    const n = sum.answered;
    const row = (k: number, c: number): ResultDetailRow => ({ label: f.rowLights.replace('{k}', String(k)), value: f.countValue.replace('{k}', String(c)).replace('{n}', String(n)) });
    const rows: ResultDetailRow[] = [row(4, sum.n4), row(2, sum.n2), row(3, sum.n3), row(5, sum.n5)];
    rows.push({ label: f.rowUnclear, value: f.countValue.replace('{k}', String(sum.unclear)).replace('{n}', String(n)) });
    if (sum.sameShare !== null) rows.push({ label: f.rowSame, value: f.sameValue.replace('{v}', fmt.num(sum.sameShare, 0)) });
    const details: ResultDetailTable[] = [{ title: f.valuesTitle, rows, note: n < 6 ? `${f.valuesNote} ${f.fewNote}` : f.valuesNote }];

    // Anordnung: Zuordnung der Lichter zu den Gläsern und gezeichnete Größen
    const tones = this.p.tones;
    const eyeName = (e: 'left' | 'right') => (e === 'left' ? f.eyeLeft : f.eyeRight);
    const layoutText = f.layoutText
      .replace('{eyeA}', eyeName(anaEyeOf(this.p.leftLens, 'a')))
      .replace('{lensA}', anaLensName(texts, tones, 'a'))
      .replace('{adjB}', anaAdj(texts, tones))
      .replace('{eyeB}', eyeName(anaEyeOf(this.p.leftLens, 'b')))
      .replace('{lensB}', anaLensName(texts, tones, 'b'));
    const trials = this.session.trials;
    const sizes = [...new Set(trials.map((t) => t.dotCmEff))].sort((a, b) => a - b);
    const limited = trials.some((t) => t.dotCmEff < t.dotCm - 0.05);
    const sizeValue = sizes.length > 1 ? f.sizeValue2.replace('{s}', fmt.num(sizes[0], 1)).replace('{b}', fmt.num(sizes[sizes.length - 1], 1)) : f.sizeValue.replace('{cm}', fmt.num(sizes[0] ?? this.p.dotCm, 1));
    const sizeNotes: string[] = [];
    if (limited) sizeNotes.push(f.limited);
    if (!calib.calibrated) sizeNotes.push(f.notCalibrated);
    details.push({
      title: f.layoutTitle,
      rows: [
        {
          label: f.layoutRow,
          value: f.layoutValue.replace('{a}', anaColorName(texts, tones, 'a')).replace('{b}', anaColorName(texts, tones, 'b')),
          text: layoutText,
        },
        { label: f.sizeRow, value: sizeValue, text: sizeNotes.length ? sizeNotes.join(' · ') : undefined },
      ],
    });

    return {
      primary: { key: 'answered', value: sum.answered, unit: 'count', better: 'higher' },
      secondary,
      details,
      score: sum.answered,
      level: 1,
      tip: tipFor(sum),
    };
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D): void {
    const { w, h } = this.ctx.stage;
    g.fillStyle = BLACK;
    g.fillRect(0, 0, w, h);
    if (!this.started) return;
    const s = this.session;
    const L = this.layout();
    const f = L.field;
    const r = this.radius(L, s.currentSize);
    const d = r * 2.6;
    const cx = f.x + f.w / 2;
    const cy = f.y + f.h / 2;
    const disc = (x: number, y: number) => {
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fill();
    };
    withAnaColor(g, this.css.a, () => disc(cx, cy - d));
    withAnaColor(g, this.css.b, () => {
      disc(cx - d, cy);
      disc(cx + d, cy);
    });
    withAnaColor(g, '#ffffff', () => disc(cx, cy + d));
    drawHint(g, this.ctx.stage, L, this.ctx.texts.feedback.ask);
    const btns = this.buttons(L);
    btns.forEach((b, i) => drawBtn(g, b, ANSWERS[i] === 'unclear' ? this.ctx.texts.feedback.unclear : String(ANSWERS[i]), { size: clamp(b.h * 0.42, 14, 30) }));
  }
}

/** Zweite Farbe als Eigenschaftswort (grüne, cyanfarbene, blaue; Mehrzahl wird im Text mit „n“ ergänzt) */
function anaAdj(tx: ExerciseTexts, tones: WorthParams['tones']): string {
  const f = tx.feedback;
  return tones === 'redcyan' ? f.adjCyan : tones === 'redblue' ? f.adjBlue : f.adjGreen;
}

function colorCheck(params: ExerciseParams, tx: ExerciseTexts) {
  return anaColorCheck(params, tx, PARAMS);
}

export const laborWorth: ExerciseDefinition = {
  id: 'labor-worth',
  category: 'wahrnehmung',
  minutes: 2,
  color: '#8C6D4A',
  icon:
    '<g fill="currentColor"><circle cx="24" cy="10" r="5.2"/><circle cx="10" cy="24" r="5.2" opacity=".5"/><circle cx="38" cy="24" r="5.2" opacity=".5"/></g><circle cx="24" cy="38" r="5.2" fill="none" stroke="currentColor" stroke-width="2.6"/>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  colorCheck,
  create: (ctx) => new WorthVierPunkte(ctx),
};
