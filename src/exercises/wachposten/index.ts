/**
 * Wachposten – zwei Minuten lang ein seltenes Zeichen entdecken (Daueraufmerksamkeit).
 *
 * Bewusst KEIN SART (häufig tippen, selten stoppen – das misst vor allem Bremsen und wäre eine
 * Dublette zu „Stopp & Los“), sondern das klassische Format: nur beim seltenen Ziel tippen
 * (docs/wissenschaft/04-konzentration-und-denken.md, Abschnitte 6.2 und 6.4; Helton 2009).
 *
 * - Zeichen: Ring mit Lücke (eigene Grafik, farbfrei). Ziel = eine Lücken-Richtung, die zu Beginn
 *   groß gezeigt wird und oben links als Erinnerung stehen bleibt (je Sitzung zufällig oben/rechts/
 *   unten/links).
 * - Takt: alle 1,2 s ein Zeichen, 500 ms sichtbar (weich ein- und ausgeblendet, keine Blitze),
 *   danach leer. 100 Zeichen ≈ 2 min, davon 18 Ziele (18 %), je Hälfte genau 9; zwischen zwei Zielen
 *   liegen mindestens 2 andere Zeichen, das erste Ziel kommt frühestens als 4. Zeichen.
 * - Antwortfenster je Zeichen: 150 ms nach Beginn bis 150 ms nach Beginn des nächsten Zeichens
 *   (lückenlos, eindeutige Zuordnung; nur der erste Tipp je Zeichen zählt). Ein Tipp in den ersten
 *   150 ms gehört also noch zum vorigen Zeichen (späte Antwort).
 * - Schwierigkeit (eine Größe): Ähnlichkeit der Ablenker. Die Hälfte der Ablenker ist um ±δ gedreht
 *   (δ = 90° · 0,82^(Stufe−1): Stufe 1 = 90°, Stufe 10 ≈ 15°), die andere Hälfte zeigt in eine
 *   der drei anderen Hauptrichtungen. Die Stufe bleibt WÄHREND der Sitzung gleich – nur so sind
 *   erste und zweite Hälfte vergleichbar („Durchhalten“) – und passt sich danach an (d′ gesamt).
 * - Auswertung: Treffer, Auslassungen, Fehlalarme, korrekte Zurückweisungen; d′ (Loglinear) je
 *   Hälfte für den Tipp; Median-RT der Treffer.
 * - Hauptwert „Treffsicherheit“ = Mittel aus Trefferquote und Quote korrekt nicht getippter Zeichen
 *   (balanced accuracy). Anders als der einfache Anteil richtiger Reaktionen (bei 82 % Ablenkern
 *   bekäme „nie tippen“ schon 82 %) liefern „nie tippen“ und „immer tippen“ hier beide 50 %; der
 *   Wert ist für Laien als Prozentzahl verständlich und hängt eng mit d′ zusammen.
 * - Fehler ohne Alarmton (Stress vermeiden, Warm et al. 2008).
 */
import { background, C, circle, fillRR, font, ring } from '../../core/draw';
import type { Rng } from '../../core/rng';
import { clamp, dPrime, easeOut, median } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, Metric, PointerInfo, StageInfo } from '../../core/types';
import { de, it } from './texts';

const SOA = 1200;
const SHOW_MS = 500;
const WINDOW_START = 150;
const TOTAL = 100;
const TARGETS_PER_HALF = 9;
const QUICK_TOTAL = 10;
const QUICK_TARGETS_PER_HALF = 1;
/** Zwischen zwei Zielen mindestens so viele Plätze Abstand (3 = zwei andere Zeichen dazwischen) */
const MIN_GAP = 3;
const FIRST_TARGET_MIN = 3;
const INTRO_MS = 3400;
const DEMO_INTRO_MS = 2400;
const LEVEL_MIN = 1;
const LEVEL_MAX = 10;
const INK = '#E8EEF7';
const HIT = '#4ADE80';

type Phase = 'intro' | 'run' | 'done';
type Outcome = 'hit' | 'miss' | 'fa' | 'cr';

interface Stim {
  target: boolean;
  /** Richtung der Lücke (Canvas: 0 = rechts, −π/2 = oben) */
  ang: number;
  near: boolean;
  /** nur Intro-Film */
  caption?: string;
}

interface Fx {
  kind: 'hit';
  t0: number;
}

/** Winkelabstand der ähnlichen Ablenker in Grad */
export function nearDeg(level: number): number {
  return 90 * Math.pow(0.82, clamp(level, LEVEL_MIN, LEVEL_MAX) - 1);
}

/** m Plätze aus [a, b) mit Mindestabstand gap, gleichverteilt über alle gültigen Lagen */
function spaced(rng: Rng, a: number, b: number, m: number, gap: number): number[] | null {
  const free = b - a - (m - 1) * (gap - 1);
  if (free < m) return null;
  const pool = Array.from({ length: free }, (_, i) => i);
  rng.shuffle(pool);
  return pool
    .slice(0, m)
    .sort((x, y) => x - y)
    .map((v, k) => a + v + k * (gap - 1));
}

/**
 * Reihenfolge: je Hälfte gleich viele Ziele, Mindestabstand zwischen Zielen (auch über die
 * Hälften-Grenze), kein Ablenker zweimal direkt hintereinander.
 */
export function makePlan(n: number, perHalf: number, rng: Rng, targetAng: number, level: number): Stim[] {
  const half = Math.floor(n / 2);
  let idx: number[] = [];
  for (let attempt = 0; attempt < 60; attempt++) {
    const a = spaced(rng, Math.min(FIRST_TARGET_MIN, half - 1), half, perHalf, MIN_GAP);
    const b = spaced(rng, half, n, perHalf, MIN_GAP);
    if (!a || !b) break;
    idx = [...a, ...b];
    if (!a.length || !b.length || b[0] - a[a.length - 1] >= MIN_GAP) break;
    idx = [];
  }
  if (!idx.length) {
    // Sicherheitsnetz: gleichmäßig verteilt
    for (let hh = 0; hh < 2; hh++) for (let k = 0; k < perHalf; k++) idx.push(hh * half + Math.floor(((k + 0.5) * half) / perHalf));
  }
  const targets = new Set(idx);
  const d = (nearDeg(level) * Math.PI) / 180;
  const far = [Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
  const out: Stim[] = [];
  let prevAng = NaN;
  for (let i = 0; i < n; i++) {
    if (targets.has(i)) {
      out.push({ target: true, ang: targetAng, near: false });
      prevAng = targetAng;
      continue;
    }
    let ang = 0;
    let near = false;
    for (let tries = 0; tries < 8; tries++) {
      near = rng.chance(0.5);
      ang = targetAng + (near ? (rng.chance(0.5) ? d : -d) : rng.pick(far));
      if (Math.abs(normAng(ang - prevAng)) > 1e-3) break;
    }
    out.push({ target: false, ang, near });
    prevAng = ang;
  }
  return out;
}

function normAng(a: number): number {
  let x = a % (Math.PI * 2);
  if (x > Math.PI) x -= Math.PI * 2;
  if (x < -Math.PI) x += Math.PI * 2;
  return x;
}

/** Unterkante der Bildunterschrift oben bzw. Oberkante unten (gleiche Formel wie im Runner) */
function captionTop(s: StageInfo): number {
  return s.h - clamp(s.u * 4.6, 14, 30) * 2.1 - s.h * 0.05;
}

// ---------------------------------------------------------------------------
// Zeichnen

/** Ring mit Lücke in Richtung ang (Strich und Lücke je 1/5 des Durchmessers, Lücke mit parallelen Kanten) */
function gapRing(g: CanvasRenderingContext2D, cx: number, cy: number, d: number, ang: number, color: string, alpha = 1): void {
  const stroke = d / 5;
  const rm = d / 2 - stroke / 2;
  g.save();
  g.globalAlpha = alpha;
  g.translate(cx, cy);
  g.rotate(ang);
  g.beginPath();
  g.rect(-d, -d, 2 * d, 2 * d);
  g.rect(0, -stroke / 2, d, stroke);
  g.clip('evenodd');
  g.beginPath();
  g.arc(0, 0, rm, 0, Math.PI * 2);
  g.lineWidth = stroke;
  g.strokeStyle = color;
  g.stroke();
  g.restore();
}

function drawCheck(g: CanvasRenderingContext2D, x: number, y: number, s: number, color: string, alpha: number): void {
  g.save();
  g.globalAlpha = alpha;
  g.beginPath();
  g.moveTo(x - 0.42 * s, y + 0.02 * s);
  g.lineTo(x - 0.13 * s, y + 0.31 * s);
  g.lineTo(x + 0.44 * s, y - 0.3 * s);
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.strokeStyle = 'rgba(5,10,20,0.55)';
  g.lineWidth = s * 0.2 + 4;
  g.stroke();
  g.strokeStyle = color;
  g.lineWidth = s * 0.2;
  g.stroke();
  g.restore();
}

// ---------------------------------------------------------------------------

class Wachposten implements Exercise {
  private readonly demo: boolean;
  private readonly total: number;
  private readonly level: number;
  private readonly targetAng: number;
  private plan: Stim[] = [];
  private phase: Phase = 'intro';
  private runStart = 0;
  private cur = -1;
  private onsets: number[] = [];
  private responded: boolean[] = [];
  private outcome: Array<Outcome | null> = [];
  private rtOf: number[] = [];
  private nextResolve = 0;
  private doneAt = 0;
  private finished = false;
  private fx: Fx | null = null;
  private points = 0;
  private lastToast = -1e9;

  constructor(private ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.total = this.demo ? 6 : ctx.quick ? QUICK_TOTAL : TOTAL;
    this.level = this.demo ? 1 : clamp(Math.round(ctx.startLevel ?? 2), LEVEL_MIN, LEVEL_MAX);
    // Ziel: Lücke oben, rechts, unten oder links (je Sitzung neu; im Intro-Film immer oben)
    this.targetAng = this.demo ? -Math.PI / 2 : ctx.rng.pick([-Math.PI / 2, 0, Math.PI / 2, Math.PI]);
  }

  start(t: number): void {
    const { rng, hud, texts } = this.ctx;
    if (this.demo) {
      const up = this.targetAng;
      this.plan = [
        { target: false, ang: up + Math.PI, near: false, caption: 'wait' },
        { target: true, ang: up, near: false, caption: 'tap' },
        { target: false, ang: up + Math.PI / 2, near: false, caption: 'wait' },
        { target: false, ang: up - Math.PI / 2, near: false },
        { target: true, ang: up, near: false, caption: 'tap' },
        { target: false, ang: up + Math.PI, near: false, caption: 'wait' },
      ];
      hud.setScore(null);
      hud.caption(texts.captions.target);
    } else {
      const perHalf = this.ctx.quick ? QUICK_TARGETS_PER_HALF : TARGETS_PER_HALF;
      this.plan = makePlan(this.total, perHalf, rng, this.targetAng, this.level);
      hud.setScore(0);
    }
    this.runStart = t + (this.demo ? DEMO_INTRO_MS : this.ctx.quick ? 1800 : INTRO_MS);
    this.updateHud();
    if (this.ctx.autoplay) {
      const r = this.restPos();
      this.ctx.ghost.moveTo(r.x, r.y, { move: 500 });
    }
  }

  // --- Geometrie (immer live aus der Bühne → robust bei Drehen) ---

  private geo(): { cx: number; cy: number; d: number; plate: number } {
    const st = this.ctx.stage;
    const { w, h, u } = st;
    const bottom = this.demo ? captionTop(st) : h;
    const top = Math.min(h * 0.12, clamp(u * 9, 40, 70));
    // Zeichen ≥ 80 px (≈ 2° bei 40 cm), ruhig und groß
    const d = clamp(Math.min(u * 22, (bottom - top) * 0.34, w * 0.4), 64, 170);
    return { cx: w / 2, cy: (top + bottom) / 2, d, plate: d * 0.82 };
  }

  private restPos(): { x: number; y: number } {
    const { w, h } = this.ctx.stage;
    const G = this.geo();
    return { x: Math.min(w * 0.86, G.cx + Math.max(G.plate * 2.2, w * 0.24)), y: Math.min(h * 0.66, G.cy + G.plate * 0.9) };
  }

  private toastY(): number {
    const G = this.geo();
    return G.cy - G.plate - clamp(this.ctx.stage.u * 5, 22, 44);
  }

  private updateHud(): void {
    const { hud, texts } = this.ctx;
    hud.setProgress(Math.max(0, this.cur + 1) / this.total);
    if (this.demo) return;
    hud.setScore(this.points);
    hud.setLabel(`${texts.feedback.level} ${this.level}`);
  }

  // --- Ablauf ---

  update(_dt: number, t: number): void {
    if (this.phase === 'intro') {
      if (t >= this.runStart) this.phase = 'run';
      else return;
    }
    if (this.phase === 'run') {
      const next = this.cur + 1;
      if (next < this.total && t >= this.runStart + next * SOA) {
        this.cur = next;
        // Reizbeginn = Zeit des Frames, in dem das Zeichen zum ersten Mal gezeichnet wird
        this.onsets[next] = t;
        this.updateHud();
        const cap = this.plan[next].caption;
        if (this.demo && cap) this.ctx.hud.caption(this.ctx.texts.captions[cap]);
        if (this.ctx.autoplay) this.autoplay(next);
      }
      // Antwortfenster schließen
      while (this.nextResolve <= this.cur && t >= this.onsets[this.nextResolve] + SOA + WINDOW_START) {
        this.resolve(this.nextResolve);
        this.nextResolve++;
      }
      if (this.nextResolve >= this.total) {
        this.phase = 'done';
        this.doneAt = t + (this.demo ? 700 : 500);
      }
    } else if (this.phase === 'done' && !this.finished && t >= this.doneAt) {
      this.finish();
    }
  }

  private resolve(j: number): void {
    const s = this.plan[j];
    if (this.responded[j]) return; // Treffer bzw. Fehlalarm wurde schon beim Tippen gewertet
    if (s.target) {
      this.outcome[j] = 'miss';
      const u = this.ctx.stage.u;
      // Ruhige Rückmeldung, kein Alarmton
      this.ctx.hud.toast(this.ctx.texts.feedback.missed, 'info', { y: this.toastY(), ms: 900, size: clamp(u * 3.8, 16, 30) });
    } else {
      this.outcome[j] = 'cr';
    }
  }

  /** Tastatur: Leertaste/Enter wirkt wie ein Tipp (Computer ohne Touch). */
  keyDown(key: string, t: number): void {
    if (key !== ' ' && key !== 'Enter') return;
    const { w, h } = this.ctx.stage;
    this.pointerDown({ id: -2, x: w / 2, y: h / 2, t, type: 'mouse' });
  }

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'run') return;
    // Zu welchem Zeichen gehört der Tipp? Zum letzten, dessen Fenster schon offen ist.
    let j = this.cur;
    while (j >= 0 && p.t < this.onsets[j] + WINDOW_START) j--;
    if (j < 0 || j < this.nextResolve || this.responded[j]) return;
    if (p.t >= this.onsets[j] + SOA + WINDOW_START) return; // gehört schon zum nächsten, noch nicht gezeigten Zeichen
    this.responded[j] = true;
    const rt = p.t - this.onsets[j];
    const { sfx, hud, texts } = this.ctx;
    if (this.plan[j].target) {
      this.outcome[j] = 'hit';
      this.rtOf[j] = rt;
      this.points += 10 + this.level;
      sfx.good();
      this.fx = { kind: 'hit', t0: p.t };
    } else {
      this.outcome[j] = 'fa';
      if (p.t - this.lastToast > 400) {
        this.lastToast = p.t;
        const u = this.ctx.stage.u;
        hud.toast(texts.feedback.wrong, 'bad', { y: this.toastY(), ms: 800, size: clamp(u * 3.8, 16, 30) });
      }
    }
    this.updateHud();
  }

  // --- Geister-Hand ---

  private autoplay(i: number): void {
    const { ghost, rng } = this.ctx;
    const s = this.plan[i];
    if (this.demo) {
      if (!s.target) return;
      const G = this.geo();
      const r = this.restPos();
      ghost.tap(G.cx + G.plate * 1.35, G.cy + G.plate * 0.75, { delay: 120, move: 260 });
      ghost.moveTo(r.x, r.y, { delay: 250, move: 420 });
      return;
    }
    // Test-Modus: meist gefunden, selten bei ähnlichen Zeichen getippt
    const r = this.restPos();
    const p = s.target ? 0.88 : s.near ? 0.07 : 0.015;
    if (rng.chance(p)) ghost.tap(r.x, r.y, { delay: rng.range(330, 720), move: 0 });
  }

  // --- Zeichnen ---

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, u, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    const G = this.geo();
    const { cx, cy, d, plate } = G;

    // Ruhige „Bühne“ für die Zeichen
    circle(g, cx, cy, plate, 'rgba(255,255,255,0.03)');
    ring(g, cx, cy, plate, 'rgba(255,255,255,0.08)', Math.max(1.5, u * 0.25));

    if (this.phase === 'intro') {
      this.drawIntro(g, t);
      return;
    }
    this.drawReminder(g);

    const i = this.cur;
    const since = i >= 0 ? t - this.onsets[i] : Infinity;
    if (i >= 0 && since < SHOW_MS) {
      // Weich ein- und ausblenden (kein hartes Blitzen); ab dem ersten Frame schon gut sichtbar
      const a = this.ctx.reducedMotion ? 1 : Math.min(1, 0.45 + since / 60) * clamp((SHOW_MS - since) / 90, 0, 1);
      gapRing(g, cx, cy, d, this.plan[i].ang, INK, a);
    } else {
      g.save();
      g.globalAlpha = 0.5;
      circle(g, cx, cy, Math.max(2.5, u * 0.6), C.fg);
      g.restore();
    }

    const fx = this.fx;
    if (fx) {
      const k = (t - fx.t0) / 650;
      if (k < 1) {
        const grow = this.ctx.reducedMotion ? 0 : 0.12 * easeOut(k);
        g.save();
        g.globalAlpha = 0.75 * (1 - k);
        ring(g, cx, cy, plate * (1 + grow), HIT, Math.max(3, u * 0.7));
        g.restore();
        const a = k < 0.6 ? 1 : 1 - (k - 0.6) / 0.4;
        drawCheck(g, cx, cy + plate + clamp(u * 5, 20, 40), clamp(u * 6, 24, 48), HIT, a);
      }
    }
  }

  /** Zu Beginn: „Dein Zeichen“ groß zeigen */
  private drawIntro(g: CanvasRenderingContext2D, t: number): void {
    const { cx, cy, d, plate } = this.geo();
    const { texts } = this.ctx;
    const { w, u } = this.ctx.stage;
    const introLen = this.demo ? DEMO_INTRO_MS : this.ctx.quick ? 1800 : INTRO_MS;
    const left = this.runStart - t;
    const a = this.ctx.reducedMotion ? 1 : clamp((introLen - left) / 250, 0, 1) * clamp(left / 300, 0, 1);
    const fs = clamp(u * 4.4, 18, 34);
    g.save();
    g.globalAlpha = a;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.font = font(fs, 800);
    g.fillStyle = C.fg;
    g.fillText(texts.feedback.target, cx, cy - plate - fs * 1.1, w * 0.9);
    if (!this.demo) {
      g.font = font(fs * 0.72, 700);
      g.fillStyle = C.dim;
      g.fillText(texts.feedback.onlyThis, cx, cy + plate + fs * 1.1, w * 0.9);
    }
    g.restore();
    gapRing(g, cx, cy, d, this.targetAng, INK, a);
  }

  /** Kleine Erinnerung oben links: das Zielzeichen */
  private drawReminder(g: CanvasRenderingContext2D): void {
    const { u } = this.ctx.stage;
    const m = clamp(u * 2.2, 10, 20);
    const fs = clamp(u * 2.6, 13, 19);
    const rd = clamp(u * 4.4, 22, 36);
    const label = this.ctx.texts.feedback.target;
    g.save();
    g.font = font(fs, 700);
    const tw = g.measureText(label).width;
    const pad = fs * 0.6;
    const bw = pad + tw + pad * 0.8 + rd + pad;
    const bh = rd + pad * 1.4;
    fillRR(g, m, m, bw, bh, bh * 0.3, 'rgba(255,255,255,0.06)');
    g.fillStyle = C.dim;
    g.textAlign = 'left';
    g.textBaseline = 'middle';
    g.fillText(label, m + pad, m + bh / 2 + 1);
    g.restore();
    gapRing(g, m + pad + tw + pad * 0.8 + rd / 2, m + bh / 2, rd, this.targetAng, INK, 0.9);
  }

  // --- Ergebnis ---

  private finish(): void {
    this.finished = true;
    const half = Math.floor(this.total / 2);
    const count = (from: number, to: number) => {
      let T = 0;
      let N = 0;
      let H = 0;
      let F = 0;
      for (let i = from; i < to; i++) {
        const o = this.outcome[i];
        if (this.plan[i].target) {
          T++;
          if (o === 'hit') H++;
        } else {
          N++;
          if (o === 'fa') F++;
        }
      }
      const bal = T && N ? 50 * (H / T + 1 - F / N) : NaN;
      return { T, N, H, F, bal, d: dPrime(H, T, F, N) };
    };
    const all = count(0, this.total);
    const h1 = count(0, half);
    const h2 = count(half, this.total);
    const rts = this.rtOf.filter((v) => Number.isFinite(v));
    // Nächste Stufe: dezent, höchstens ±2 je Sitzung (d′ gesamt, Loglinear-Korrektur)
    let step = 0;
    if (all.d >= 4.3) step = 2;
    else if (all.d >= 3.5) step = 1;
    else if (all.d < 1.5) step = -2;
    else if (all.d < 2.3) step = -1;
    const next = this.demo ? 1 : clamp(this.level + step, LEVEL_MIN, LEVEL_MAX);
    let tip = next > this.level ? 'harder' : 'steady';
    if (h2.d < h1.d - 0.7 && h2.bal < h1.bal - 3) tip = 'fade';
    else if (all.N && all.F / all.N > 0.07) tip = 'careful';
    else if (all.T && (all.T - all.H) / all.T > 0.2) tip = 'watch';
    const secondary: Metric[] = [
      ...(Number.isFinite(h1.bal) ? [{ key: 'half1', value: Math.round(h1.bal), unit: 'percent' as const }] : []),
      ...(Number.isFinite(h2.bal) ? [{ key: 'half2', value: Math.round(h2.bal), unit: 'percent' as const }] : []),
      { key: 'missed', value: all.T - all.H, unit: 'count' },
      { key: 'falseAlarms', value: all.F, unit: 'count' },
      ...(rts.length ? [{ key: 'rt', value: Math.round(median(rts)), unit: 'time' as const }] : []),
    ];
    this.ctx.sfx.done();
    this.ctx.finish({
      primary: { key: 'accuracy', value: Math.round(Number.isFinite(all.bal) ? all.bal : 0), unit: 'percent', better: 'higher' },
      secondary,
      score: this.points,
      level: next,
      tip,
    });
  }
}

export const wachposten: ExerciseDefinition = {
  id: 'wachposten',
  category: 'konzentration',
  minutes: 2,
  color: '#7A5195',
  showsLevel: true,
  icon:
    '<path d="M20.2 9.5A15 15 0 1 0 27.8 9.5" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="24" cy="24" r="3" fill="currentColor"/><circle cx="4.5" cy="24" r="2.2" fill="currentColor" opacity=".5"/><circle cx="43.5" cy="24" r="2.2" fill="currentColor" opacity=".5"/>',
  texts: { de, it },
  create: (ctx) => new Wachposten(ctx),
};
