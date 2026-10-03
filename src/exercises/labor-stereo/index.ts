/**
 * Tiefe sehen – Zufallspunkte (Labor) – mit Rot-Grün-/Rot-Cyan-Brille ein Feld aus Zufallspunkten ansehen, in dem ein Quadrat
 * vor oder hinter der Fläche schwebt, und angeben, wo es liegt (oben, unten, links, rechts).
 *
 * Eigene Umsetzung des bekannten Zufallspunkt-Prinzips: Einstellungen (`ctx.params`, siehe logic.ts `PARAMS`), Feld und Punkte
 * in cm mit Disparität in Winkelsekunden (Umrechnung mit der Sehentfernung der Kalibrierung, `ctx.calib`), reine Logik in
 * logic.ts (`StereoSession`), Anordnung in layout.ts, gemeinsame Anaglyphen-Bausteine in _shared/anaglyph.ts.
 *
 * - Hauptwert: Anteil richtiger Antworten (`accuracy`, %). Das sind Übungswerte: keine Messung einer Stereoschwelle, keine
 *   Aussage über Sehschärfe oder Stereosehen, keine Normwerte; zufälliges Raten ergibt 25 %.
 * - Disparität: Stufenverfahren, fest oder durch den Trainer-Regler (nur Trainer-/Entwickler-Ansicht, höchstens 400 ″ je
 *   Tastendruck, Anzeige gleitet weich, jede Änderung mit Zeitpunkt protokolliert und im Ergebnis ausgewiesen). Der Bildschirm
 *   löst nur ganze Pixel auf: Die Disparität eines Pixels steht im Ergebnis als feinste Stufe.
 * - Ehrlich: Anaglyphen lassen Farbsäume sichtbar, ein Bildschirm gibt nur grobe Orientierung, auf einem 2D-Bildschirm
 *   bleibt die Schärfeentfernung am Bildschirm; kein klinischer Befund.
 * - Ruhig: kein Flackern; je Durchgang ein neues Bild; Rückmeldung weich (✓/✗ und Text, neutral hell); Bedienung neutral grau
 *   mit Beschriftung (Farbe nie allein).
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
import { anaglyphColorCheck, cssOf, eyeColors, liveDetail, readAnaglyph, withColor, type ToneCss } from '../_shared/anaglyph';
import { restPoint } from '../_shared/tippziele';
import { drawSoftCheck, drawSoftCross } from '../_shared/weiche-marken';
import { stereoLayout, type StereoLayout } from './layout';
import {
  CHANCE_PCT,
  LIVE_COARSE_ARCSEC,
  LIVE_STEP_ARCSEC,
  LOCATIONS,
  MAX_ARCSEC,
  PARAMS,
  pointsFor,
  QUICK_TRIALS,
  regionSize,
  StereoSession,
  stereoParams,
  tipFor,
  dotDisparityCm,
  type Location,
  type StereoParams,
  type StereoSummary,
} from './logic';
import { de, it } from './texts';

const BLACK = '#000000';
const LEAD_MS = 500;
/** Neutrales Hell für Beschriftung, Rahmen und weiche Marken (beide Augen sehen es) */
const UI_LINE = 'rgba(255,255,255,0.28)';
const UI_FILL = 'rgba(255,255,255,0.12)';
const UI_TEXT = '#D8D8DC';
const MARK_OK = '#E6E6EA';
const MARK_BAD = '#C9C9CF';

// Intro-Film: drei Durchgänge mit großer Disparität; die Hand tippt die Lage des Quadrats
const DEMO_PARAMS: Partial<StereoParams> = {
  trials: 3,
  startArcsec: 2400,
  control: 'fixed',
  fieldCm: 9,
  regionCm: 4,
  dots: 450,
  dotCm: 0.3,
  noise: false,
  leftLens: 'red',
  tones: 'redgreen',
  redLevel: 100,
  secondLevel: 100,
};
const DEMO_FEEDBACK_MS = 800;
const DEMO_START_MS = 600;
const DEMO_THINK_MS = 1500;
const QUICK_FEEDBACK_MS = 300;

class Stereo implements Exercise {
  private readonly demo: boolean;
  private readonly p: StereoParams;
  private readonly css: ToneCss;
  private readonly session: StereoSession;
  private started = false;
  private startAt = 0;
  private done = false;
  private lastIdx = -1;
  private lastPhase = '';
  private lastCaption = '';
  private markAt = 0;
  private seenTrials = 0;
  /** Autoplay: geplante Antwort der Hand */
  private autoPlan: { idx: number } | null = null;
  private autoForIdx = -1;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = stereoParams(paramsOf(ctx, PARAMS));
    this.p = this.demo ? { ...base, ...DEMO_PARAMS } : ctx.quick ? { ...base, trials: Math.min(base.trials, QUICK_TRIALS) } : base;
    this.css = cssOf({ tones: this.p.tones, brightness: 100, redLevel: this.p.redLevel, secondLevel: this.p.secondLevel });
    const calib = calibOf(ctx);
    // Regler vorhanden (Trainer-Ansicht) oder Autoplay (spielt selbst die Trainerin/den Trainer); sonst läuft „Trainer“ wie „fest“
    const trainerAvailable = !this.demo && (ctx.liveEnabled === true || ctx.autoplay);
    this.session = new StereoSession(this.p, {
      rng: ctx.rng,
      distCm: calib.viewDistanceCm,
      pxPerCm: calib.pxPerCm,
      trainerAvailable,
      feedbackMs: this.demo ? DEMO_FEEDBACK_MS : ctx.quick ? QUICK_FEEDBACK_MS : undefined,
    });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private layout(): StereoLayout {
    const s = this.ctx.stage;
    const calib = calibOf(this.ctx);
    return stereoLayout({
      w: s.w,
      h: s.h,
      u: s.u,
      captionReserve: this.demo ? this.captionReserve() : 0,
      demo: this.demo,
      wantFieldPx: calib.sizePx(this.p.fieldCm),
    });
  }

  /** Platz unten im Intro-Film für Hand und Bildunterschrift */
  private captionReserve(): number {
    const s = this.ctx.stage;
    const size = clamp(s.u * 4.6, 14, 30);
    return size * 2.1 + s.h * 0.05 + Math.max(6, s.u * 1.5);
  }

  /** Verhältnis angezeigtes Feld zu eingestelltem Feld (≤ 1, kleiner auf kleinen Bühnen) */
  private scale(L: StereoLayout): number {
    return L.field / (this.p.fieldCm * calibOf(this.ctx).pxPerCm);
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
    if (this.demo || this.done || !this.started || key !== 'disparity') return;
    this.session.setLive(value, this.ctx.now());
  }

  getLive(): LiveState | null {
    if (this.demo || this.done || !this.started || this.session.finished) return null;
    const s = this.session;
    return {
      key: 'disparity',
      value: s.live.target,
      min: s.live.min,
      max: s.live.max,
      step: LIVE_STEP_ARCSEC,
      coarseStep: LIVE_COARSE_ARCSEC,
      unit: '″',
      additive: !s.trainerMode,
      effective: s.arcsec,
    };
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost } = this.ctx;
    this.startAt = t + (this.demo ? DEMO_START_MS : LEAD_MS);
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
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
    }
    // Autoplay als Trainer: im Modus „Trainer“ verkleinert die Übung selbst von Durchgang zu Durchgang die Disparität
    if (this.ctx.autoplay && s.trainerMode && s.idx !== this.autoForIdx && s.phase === 'show') s.live.aim(Math.max(40, s.live.target * 0.9));
    s.update(t);
    if (s.idx !== this.lastIdx) this.onNewTrial();
    if (s.phase !== this.lastPhase) this.onPhase(s.phase);
    this.noticeResult(t);
    if (this.ctx.autoplay) this.autoUpdate();
    if (s.finished) this.finishSession();
  }

  private onNewTrial(): void {
    const s = this.session;
    this.lastIdx = s.idx;
    this.ctx.hud.setProgress(Math.min(1, s.idx / this.p.trials));
    if (!this.demo && !s.finished) this.ctx.hud.setLabel(this.trialLabel());
  }

  private onPhase(phase: string): void {
    this.lastPhase = phase;
    if (!this.demo) return;
    if (phase === 'show') this.caption(this.session.idx === 0 ? 'look' : 'answer');
    if (phase === 'feedback') this.caption('result');
  }

  /** Auswertung einer Antwort bemerken (Ton, Punkte) */
  private noticeResult(t: number): void {
    const s = this.session;
    while (this.seenTrials < s.trials.length) {
      const tr = s.trials[this.seenTrials++];
      this.markAt = t;
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
    if (p.type === 'ghost') this.autoPlan = null;
    if (this.session.phase !== 'show') return;
    const L = this.layout();
    for (let i = 0; i < L.buttons.length; i++) {
      if (hit(L.buttons[i], p.x, p.y, this.pad(L.buttons[i]))) {
        this.answer(LOCATIONS[i], p.t);
        return;
      }
    }
  }

  keyDown(key: string, t: number): void {
    if (this.done || !this.started) return;
    const map: Record<string, Location> = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
    const loc = map[key];
    if (loc) this.answer(loc, t);
  }

  private answer(loc: Location, t: number): void {
    this.session.answer(loc, t);
  }

  // --- Autoplay (Intro-Film und Tests) ---

  private autoUpdate(): void {
    const s = this.session;
    if (s.phase !== 'show') return;
    if (this.autoForIdx !== s.idx) {
      this.autoForIdx = s.idx;
      this.autoPlan = null;
    }
    const { ghost, rng } = this.ctx;
    if (this.autoPlan || !ghost.idle) return;
    // Die Hand liegt meist richtig; bei sehr kleiner Disparität (unter etwa zwei Pixeln) oft daneben
    const fine = s.arcsec >= 2 * s.pixelArcsec;
    const right = this.demo || rng.next() < (fine ? 0.88 : 0.45);
    const pick: Location = right ? s.location : (LOCATIONS.filter((l) => l !== s.location)[rng.int(3)] ?? 'up');
    const L = this.layout();
    const r = L.buttons[LOCATIONS.indexOf(pick)];
    const quick = this.ctx.quick;
    const delay = this.demo ? DEMO_THINK_MS : quick ? rng.range(40, 120) : rng.range(700, 1800);
    const move = this.demo ? 450 : quick ? 180 : rng.range(240, 380);
    this.autoPlan = { idx: s.idx };
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

  private locName(l: Location): string {
    const f = this.ctx.texts.feedback;
    return l === 'up' ? f.locUp : l === 'down' ? f.locDown : l === 'left' ? f.locLeft : f.locRight;
  }

  buildResult(sum: StereoSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const f = texts.feedback;
    const calib = calibOf(this.ctx);
    const dist = calib.viewDistanceCm;
    const s = this.session;
    const sec: Metric[] = [{ key: 'correct', value: sum.correct, unit: 'count' }];
    if (sum.finalArcsec !== null) sec.push({ key: 'final_arcsec', value: sum.finalArcsec, unit: 'arcsec' });
    if (sum.rtMean !== null) sec.push({ key: 'rt_mean', value: sum.rtMean, unit: 'ms' });
    sec.push({ key: 'px_arcsec', value: s.pixelArcsec, unit: 'arcsec' });
    const secondary = sec.slice(0, 4);

    const details: ResultDetailTable[] = [];
    // Tiefe (Disparität)
    const arc = (v: number) => f.arcValue.replace('{v}', fmt.num(Math.round(v), 0));
    const rows: ResultDetailRow[] = [];
    rows.push({
      label: texts.metrics.control,
      value: s.trainerMode ? f.controlTrainer : this.p.control === 'adaptive' ? f.controlAdaptive : f.controlFixed,
      text: this.p.control === 'trainer' && !s.trainerMode ? f.controlFallback : !s.trainerMode ? f.controlLive : undefined,
    });
    rows.push({ label: texts.metrics.start, value: arc(this.p.startArcsec) });
    if (sum.finalArcsec !== null) {
      const cm = (Math.tan((sum.finalArcsec / 3600) * (Math.PI / 180)) * dist);
      rows.push({
        label: texts.metrics.final_arcsec,
        value: arc(sum.finalArcsec),
        text: f.arcDetail.replace('{cm}', fmt.num(cm, 2)).replace('{px}', fmt.num(cm * calib.pxPerCm, 1)).replace('{d}', fmt.num(dist, 0)),
      });
    }
    if (sum.minArcsec !== null && sum.maxArcsec !== null) rows.push({ label: f.rangeRow, value: `${fmt.num(sum.minArcsec, 0)} – ${arc(sum.maxArcsec)}` });
    rows.push({
      label: texts.metrics.px_arcsec,
      value: arc(s.pixelArcsec),
      text: [f.pixelDetail.replace('{d}', fmt.num(dist, 0)), ...(calib.calibrated ? [] : [f.notCalibrated])].join(' · '),
    });
    details.push({ title: f.arcTitle, rows, note: f.pixelNote });
    // Antworten: vor und hinter der Fläche
    const near = sum.trials.filter((t) => t.depth === 'near');
    const far = sum.trials.filter((t) => t.depth === 'far');
    const part = (list: typeof near) => f.depthValue.replace('{k}', String(list.filter((t) => t.correct).length)).replace('{n}', String(list.length));
    details.push({
      title: f.depthTitle,
      rows: [
        { label: f.depthNear, value: part(near) },
        { label: f.depthFar, value: part(far) },
        { label: f.chanceRow, value: `${CHANCE_PCT} %` },
      ],
      note: f.depthNote,
    });
    // Einstellungen
    const L = this.layout();
    const fieldCm = L.field / calib.pxPerCm;
    const regionCm = regionSize(this.p.fieldCm, this.p.regionCm) * this.scale(L);
    details.push({
      title: f.settingsTitle,
      rows: [
        { label: texts.metrics.field, value: f.cmValue.replace('{cm}', fmt.num(fieldCm, 1)), text: fieldCm < this.p.fieldCm - 0.05 ? f.limited : undefined },
        { label: texts.metrics.region, value: f.cmValue.replace('{cm}', fmt.num(regionCm, 1)) },
        { label: texts.metrics.dots, value: String(this.p.dots), text: this.p.noise ? f.noiseOn : f.noiseOff },
      ],
      note: f.valuesNote,
    });
    const liveTable = liveDetail(s.live.log, f, fmt, '″', 0, !s.trainerMode);
    if (liveTable) details.push(liveTable);

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
    if (s.phase === 'show' || s.phase === 'feedback') this.drawFrame(g, L);
    if (s.phase === 'show') this.drawDots(g, L);
    if (s.phase === 'feedback') this.drawFeedback(g, L, t);
    if (s.phase === 'show') this.drawMessage(g, L, this.ctx.texts.feedback.ask);
    this.drawButtons(g, L);
  }

  /** Neutraler Rahmen um das Feld: beide Augen sehen ihn und halten die Bilder zusammen */
  private drawFrame(g: CanvasRenderingContext2D, L: StereoLayout): void {
    g.save();
    g.strokeStyle = UI_LINE;
    g.lineWidth = 2;
    g.strokeRect(L.cx - L.field / 2, L.cy - L.field / 2, L.field, L.field);
    g.restore();
  }

  /** Das Punktfeld: je Auge ein Bild in seiner Farbe, Punkte im Quadrat um ± die halbe Disparität gegeneinander verschoben */
  private drawDots(g: CanvasRenderingContext2D, L: StereoLayout): void {
    const s = this.session;
    const scene = s.scene;
    if (!scene) return;
    const calib = calibOf(this.ctx);
    const k = this.scale(L);
    const pxCm = calib.pxPerCm;
    const dcm = s.disparityCm;
    const dr = Math.max(1.5, (this.p.dotCm * pxCm * k) / 2);
    const eyes = eyeColors(this.p.leftLens);
    g.save();
    g.beginPath();
    g.rect(L.cx - L.field / 2, L.cy - L.field / 2, L.field, L.field);
    g.clip();
    const draw = (color: string, sgn: 1 | -1) => {
      withColor(g, color, () => {
        g.beginPath();
        for (const d of scene.dots) {
          // Disparität in cm × Pixel je cm (nicht mit dem Feldmaßstab verkleinert: sie gilt am Bildschirm)
          const off = (sgn * dotDisparityCm(d, s.sign, dcm, this.p.noise) * pxCm) / 2;
          const x = L.cx + d.x * pxCm * k + off;
          const y = L.cy + d.y * pxCm * k;
          g.moveTo(x + dr, y);
          g.arc(x, y, dr, 0, Math.PI * 2);
        }
        g.fill();
      });
    };
    // linkes Auge: Bild nach rechts verschoben (gekreuzt = näher), rechtes Auge: nach links
    draw(eyes.left === 'a' ? this.css.a : this.css.b, 1);
    draw(eyes.right === 'a' ? this.css.a : this.css.b, -1);
    g.restore();
  }

  /** Rückmeldung: neutral helle Umrandung des Quadrats an seiner Stelle, ✓/✗ und Text, weich eingeblendet */
  private drawFeedback(g: CanvasRenderingContext2D, L: StereoLayout, t: number): void {
    const s = this.session;
    const last = s.last;
    const scene = s.scene;
    if (!last || !scene) return;
    const k = this.scale(L);
    const pxCm = calibOf(this.ctx).pxPerCm;
    const a = this.ctx.reducedMotion ? 1 : clamp((t - this.markAt) / 180, 0, 1);
    const size = scene.region.size * pxCm * k;
    const x = L.cx + scene.region.x * pxCm * k - size / 2;
    const y = L.cy + scene.region.y * pxCm * k - size / 2;
    g.save();
    g.globalAlpha = a;
    g.strokeStyle = 'rgba(255,255,255,0.7)';
    g.lineWidth = 3;
    g.setLineDash([8, 6]);
    g.strokeRect(x, y, size, size);
    g.restore();
    const ms = clamp(L.field * 0.04, 7, 16);
    if (last.correct) drawSoftCheck(g, L.cx, L.cy - ms * 1.2, ms, a, MARK_OK);
    else drawSoftCross(g, L.cx, L.cy - ms * 1.2, ms, a, MARK_BAD);
    const f = this.ctx.texts.feedback;
    const msg = last.correct ? f.right : f.wrong.replace('{loc}', this.locName(last.location));
    const size2 = clamp(this.ctx.stage.u * 3.8, 14, 24);
    g.save();
    g.globalAlpha = a;
    text(g, msg, L.cx, L.cy + ms * 2.2, size2, C.fg, { weight: 700 });
    g.restore();
  }

  private drawMessage(g: CanvasRenderingContext2D, L: StereoLayout, msg: string): void {
    const w = this.ctx.stage.w - 16;
    g.save();
    g.font = font(L.msgSize, 700);
    const width = g.measureText(msg).width;
    g.restore();
    const size = width > w ? Math.max(10, L.msgSize * (w / width)) : L.msgSize;
    text(g, msg, this.ctx.stage.w / 2, L.msgY, size, UI_TEXT, { weight: 700 });
  }

  /** Die vier Tasten: Pfeil und Beschriftung (Farbe nie allein) */
  private drawButtons(g: CanvasRenderingContext2D, L: StereoLayout): void {
    const f = this.ctx.texts.feedback;
    const enabled = this.session.phase === 'show';
    const items = [
      { arrow: '↑', label: f.locUp },
      { arrow: '↓', label: f.locDown },
      { arrow: '←', label: f.locLeft },
      { arrow: '→', label: f.locRight },
    ];
    items.forEach((it2, i) => {
      const r = L.buttons[i];
      g.save();
      g.globalAlpha = enabled ? 1 : 0.35;
      fillRR(g, r.x, r.y, r.w, r.h, Math.min(r.w, r.h) * 0.22, UI_FILL);
      rrPath(g, r.x + 0.5, r.y + 0.5, r.w - 1, r.h - 1, Math.min(r.w, r.h) * 0.22);
      g.strokeStyle = UI_LINE;
      g.lineWidth = 1.5;
      g.stroke();
      const label = `${it2.arrow} ${it2.label}`;
      let size = clamp(r.h * 0.3, 12, 22);
      g.font = font(size, 700);
      const width = g.measureText(label).width;
      if (width > r.w * 0.9) size = Math.max(9, size * ((r.w * 0.9) / width));
      text(g, label, r.x + r.w / 2, r.y + r.h / 2 + 1, size, C.fg, { weight: 700 });
      g.restore();
    });
  }
}

/** Prüfbild im Intro (Schritt für Schritt oder einfach); Aufbau und Texte teilen sich die Anaglyphen-Übungen */
function colorCheck(params: ExerciseParams, tx: ExerciseTexts): ColorCheckInfo {
  return anaglyphColorCheck(readAnaglyph(params, false), tx);
}

export const laborStereo: ExerciseDefinition = {
  id: 'labor-stereo',
  category: 'wahrnehmung',
  minutes: 3,
  color: '#8C6D4A',
  icon:
    '<rect x="6" y="8" width="36" height="32" rx="5" fill="none" stroke="currentColor" stroke-width="2.6" opacity=".55"/><g fill="currentColor"><circle cx="13" cy="15" r="1.7"/><circle cx="21" cy="13" r="1.7" opacity=".6"/><circle cx="35" cy="16" r="1.7"/><circle cx="12" cy="31" r="1.7" opacity=".6"/><circle cx="37" cy="33" r="1.7"/><circle cx="27" cy="35" r="1.7" opacity=".6"/></g><rect x="17" y="18" width="14" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2.6"/>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  colorCheck,
  liveControls: [{ key: 'disparity', unit: '″', min: -MAX_ARCSEC, max: MAX_ARCSEC, step: LIVE_STEP_ARCSEC, coarseStep: LIVE_COARSE_ARCSEC }],
  create: (ctx) => new Stereo(ctx),
};
