/**
 * Stopp & Los – bei Grün sofort tippen, bei Rot nicht (Go/No-Go).
 *
 * Trainiert schnelles Reagieren und das Bremsen einer schon „geplanten“ Bewegung.
 * - 75 % Grün: Das Tippen wird zur Gewohnheit – genau deshalb fordert Rot heraus.
 * - Form + Farbe + Helligkeit (heller runder Kreis vs. dunkleres Achteck mit Balken) → auch bei
 *   Rot-Grün-Schwäche eindeutig.
 * - Adaptives Antwortfenster nur über die grünen Durchgänge (3-down/1-up ≈ 79 % rechtzeitig):
 *   Je besser es läuft, desto kürzer bleibt das Zeichen stehen. Tippen bei Rot ändert die Frist
 *   nicht (wird getrennt gezählt) – sonst würde vorschnelles Tippen belohnt.
 *   (docs/wissenschaft/01-reaktion-und-impulskontrolle.md, Abschnitt 2.4)
 * - Tipps in der Pause werden nicht bestraft (nur gezählt); Tipps < 100 ms nach dem Erscheinen
 *   gelten als geraten und zählen weder als Treffer noch als Fehler.
 * - Auswertung mit Signalentdeckung (d′, Loglinear-Korrektur) – nur intern für den Tipp.
 */
import { background, C, circle, fillRR, font, glow, octagon, ring } from '../../core/draw';
import type { Rng } from '../../core/rng';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, dPrime, easeOut, median } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, Metric, PointerInfo } from '../../core/types';
import { de, it } from './texts';

const TRIALS = 40;
const QUICK_TRIALS = 5;
const STOP_SHARE = 0.25;
const ISI_MIN = 500;
const ISI_MAX = 1100;
/** Nach einem Fehler etwas länger warten, damit man die Rückmeldung lesen kann */
const ERROR_PAUSE = 300;
/** Schneller als das kann niemand reagieren → geraten */
const ANTICIPATION_MS = 100;
/** Tipps kurz nach dem Ende eines Durchgangs (Doppel-Tipp, knapp zu spät) werden ignoriert */
const GRACE_MS = 250;
/** Nach einem zu frühen Tipp kommt das nächste Zeichen frühestens so viel später */
const EARLY_PUSH_MS = 350;
const LEVEL_MIN = 1;
const LEVEL_MAX = 18;
const GO_COLOR = '#22C55E';
const GO_LIGHT = '#4ADE80';
const GO_BRIGHT = '#BBF7D0';
const STOP_COLOR = '#EF4444';
const DEMO_WINDOW = 1100;
const DEMO_ISI = 700;
/** Die kleine Legende unten wird nach so vielen Durchgängen ausgeblendet */
const LEGEND_TRIALS = 6;

type Kind = 'go' | 'stop';
type Phase = 'isi' | 'stim' | 'done';
type FxKind = 'hit' | 'withhold' | 'fadeGo' | 'fadeStop';

interface Fx {
  kind: FxKind;
  t0: number;
}

/** Antwortfenster in ms: Stufe 1 = 950 ms, danach je −7 %, mindestens 300 ms. */
export function windowMs(level: number): number {
  return Math.max(300, 950 * Math.pow(0.93, level - 1));
}

/**
 * Reihenfolge der Zeichen: genau 25 % Rot, die ersten zwei sind Grün,
 * nie mehr als zwei Rot hintereinander.
 */
export function makePlan(n: number, rng: Rng): Kind[] {
  const nStop = Math.round(n * STOP_SHARE);
  const nGo = n - nStop;
  const valid = (p: readonly Kind[]): boolean => {
    if (p[0] === 'stop' || p[1] === 'stop') return false;
    let run = 0;
    for (const k of p) {
      run = k === 'stop' ? run + 1 : 0;
      if (run > 2) return false;
    }
    return true;
  };
  for (let attempt = 0; attempt < 400; attempt++) {
    const p: Kind[] = [];
    for (let i = 0; i < nGo; i++) p.push('go');
    for (let i = 0; i < nStop; i++) p.push('stop');
    rng.shuffle(p);
    if (valid(p)) return p;
  }
  // Sicherheitsnetz: Rot-Zeichen in die Lücken nach dem 2., 3., … Grün verteilen (je höchstens 2)
  const gaps = new Array<number>(Math.max(1, nGo - 1)).fill(0);
  for (let i = 0; i < nStop; i++) {
    const open = gaps.map((c, j) => (c < 2 ? j : -1)).filter((j) => j >= 0);
    gaps[open.length ? rng.pick(open) : gaps.length - 1]++;
  }
  const out: Kind[] = ['go'];
  for (let k = 1; k < nGo; k++) {
    out.push('go');
    for (let s = 0; s < gaps[k - 1]; s++) out.push('stop');
  }
  return out.slice(0, n);
}

// ---------------------------------------------------------------------------
// Zeichnen

/** Grüner Kreis – bewusst heller als das rote Zeichen (Helligkeit als zusätzliches Merkmal) */
function drawGo(g: CanvasRenderingContext2D, x: number, y: number, r: number, alpha: number): void {
  glow(g, x, y, r, GO_LIGHT, alpha);
  g.save();
  g.globalAlpha = alpha;
  const grad = g.createRadialGradient(x - r * 0.3, y - r * 0.35, r * 0.05, x, y, r);
  grad.addColorStop(0, GO_BRIGHT);
  grad.addColorStop(0.5, GO_LIGHT);
  grad.addColorStop(1, GO_COLOR);
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.fillStyle = grad;
  g.fill();
  g.restore();
}

/** Rotes Achteck mit weißem Querbalken – wie ein Verbotsschild; dunkler als der grüne Kreis */
function drawStop(g: CanvasRenderingContext2D, x: number, y: number, r: number, alpha: number): void {
  glow(g, x, y, r, STOP_COLOR, 0.35 * alpha);
  g.save();
  g.globalAlpha = alpha;
  octagon(g, x, y, r, STOP_COLOR);
  const bw = r * 1.2;
  const bh = r * 0.3;
  fillRR(g, x - bw / 2, y - bh / 2, bw, bh, bh * 0.18, '#FFFFFF');
  g.restore();
}

function drawCheck(g: CanvasRenderingContext2D, x: number, y: number, s: number, color: string, width: number, alpha: number): void {
  g.save();
  g.globalAlpha = alpha;
  g.beginPath();
  g.moveTo(x - 0.42 * s, y + 0.02 * s);
  g.lineTo(x - 0.13 * s, y + 0.31 * s);
  g.lineTo(x + 0.44 * s, y - 0.3 * s);
  g.strokeStyle = 'rgba(5,10,20,0.55)';
  g.lineWidth = width + 4;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.stroke();
  g.strokeStyle = color;
  g.lineWidth = width;
  g.stroke();
  g.restore();
}

// ---------------------------------------------------------------------------

class StoppLos implements Exercise {
  private readonly demo: boolean;
  private readonly total: number;
  private readonly stair: Staircase;
  private plan: Kind[] = [];
  private phase: Phase = 'isi';
  private idx = 0;
  private isiEnd = 0;
  private onset = 0;
  private win = 950;
  private trialLevel = 1;
  /** Ende des letzten Durchgangs (für Doppel-Tipps) */
  private lastEnd = -1e9;
  private lastEarlyToast = -1e9;
  private doneAt = 0;
  private finished = false;
  private fx: Fx | null = null;
  private legendFadeAt = Infinity;
  // Auswertung
  private hits = 0;
  private misses = 0;
  private commissions = 0;
  private withholds = 0;
  private early = 0;
  private rts: number[] = [];
  private points = 0;
  // Autoplay / Demo
  private autoStimPlanned = false;
  private autoIsiPlanned = false;
  private captionAt = Infinity;

  constructor(private ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    this.total = this.demo ? 4 : ctx.quick ? QUICK_TRIALS : TRIALS;
    this.stair = new Staircase({ start: ctx.startLevel ?? 3, min: LEVEL_MIN, max: LEVEL_MAX, down: 3, up: 1 });
  }

  start(t: number): void {
    const { rng, hud, texts, ghost } = this.ctx;
    this.plan = this.demo ? ['go', 'stop', 'go', 'stop'] : makePlan(this.total, rng);
    // Erste Pause etwas länger: ankommen, Blick in die Mitte
    this.isiEnd = t + (this.demo ? 1500 : rng.range(900, 1300));
    hud.setScore(this.demo ? null : 0);
    this.updateHud();
    if (this.demo) hud.caption(texts.captions.go);
    if (this.ctx.autoplay) {
      const rest = this.restPos();
      ghost.moveTo(rest.x, rest.y, { move: 500 });
    }
  }

  // --- Geometrie (immer live aus der Bühne → robust bei Drehen/Größenwechsel) ---

  /** Mindestens 40 px (≈ 1,5 cm Durchmesser auf dem Tablet) */
  private radius(): number {
    return Math.max(40, this.ctx.stage.u * 9);
  }

  private center(): { x: number; y: number } {
    const { w, h } = this.ctx.stage;
    return { x: w / 2, y: h / 2 };
  }

  /** Ruheposition der Geister-Hand: rechts unten, weg von Zeichen und Bildunterschrift */
  private restPos(): { x: number; y: number } {
    const { w, h } = this.ctx.stage;
    const c = this.center();
    const r = this.radius();
    return { x: Math.min(w * 0.8, c.x + Math.max(r * 2.6, w * 0.22)), y: Math.min(h * 0.68, c.y + r * 1.6) };
  }

  private toastY(): number {
    return this.center().y - this.radius() * 1.75 - this.ctx.stage.u * 2;
  }

  private updateHud(): void {
    const { hud, texts } = this.ctx;
    hud.setProgress(this.idx / this.total);
    if (this.demo) return;
    hud.setScore(this.points);
    hud.setLabel(`${texts.feedback.level} ${Math.max(1, Math.floor(this.stair.level + 1e-9))}`);
  }

  // --- Ablauf ---

  update(_dt: number, t: number): void {
    if (this.phase === 'isi') {
      if (this.demo && t >= this.captionAt) {
        this.captionAt = Infinity;
        this.ctx.hud.caption(this.plan[this.idx] === 'go' ? this.ctx.texts.captions.go : this.ctx.texts.captions.stop);
      }
      if (t >= this.isiEnd) this.showStimulus(t);
    } else if (this.phase === 'stim') {
      if (t - this.onset >= this.win) this.timeout(t);
    } else if (this.phase === 'done' && !this.finished && t >= this.doneAt) {
      this.finish();
      return;
    }
    if (this.ctx.autoplay) this.autoplay(t);
  }

  private showStimulus(t: number): void {
    this.phase = 'stim';
    this.onset = t; // Reizbeginn = Zeit des Frames, in dem das Zeichen zum ersten Mal gezeichnet wird
    this.trialLevel = this.stair.level;
    this.win = this.demo ? DEMO_WINDOW : windowMs(this.trialLevel);
    this.autoStimPlanned = false;
  }

  /** Antwortfenster abgelaufen, ohne gültigen Tipp */
  private timeout(t: number): void {
    const { sfx, hud, texts } = this.ctx;
    if (this.plan[this.idx] === 'go') {
      this.misses++;
      sfx.bad();
      hud.toast(texts.feedback.slow, 'bad', { y: this.toastY(), ms: 900 });
      this.fx = { kind: 'fadeGo', t0: t };
      this.endTrial(false, t);
    } else {
      this.withholds++;
      this.fx = { kind: 'withhold', t0: t };
      this.endTrial(true, t);
    }
  }

  private endTrial(correct: boolean, t: number): void {
    // Die Frist passt sich nur über Grün an: rechtzeitig → schwerer, verpasst → leichter
    if (this.plan[this.idx] === 'go') this.stair.update(correct);
    if (correct) this.points += 10 + Math.floor(this.trialLevel + 1e-9);
    this.idx++;
    this.lastEnd = t;
    if (!this.demo) {
      // Geplante Tipps der Test-Hand gehören zum alten Durchgang
      this.ctx.ghost.clear();
      if (this.idx === LEGEND_TRIALS) this.legendFadeAt = t;
    }
    this.updateHud();
    if (this.idx >= this.total) {
      this.phase = 'done';
      this.doneAt = t + (this.demo ? 1000 : 800);
      return;
    }
    this.phase = 'isi';
    this.autoIsiPlanned = false;
    const isi = this.demo ? DEMO_ISI : this.ctx.rng.range(ISI_MIN, ISI_MAX) + (correct ? 0 : ERROR_PAUSE);
    this.isiEnd = t + isi;
    if (this.demo) this.captionAt = t + 300;
  }

  pointerDown(p: PointerInfo): void {
    if (this.phase === 'done') return;
    if (this.phase === 'isi') {
      // Doppel-Tipp oder knapp nach dem Ende → nicht werten
      if (p.t - this.lastEnd < GRACE_MS) return;
      this.earlyTap(p);
      return;
    }
    const rt = p.t - this.onset;
    if (rt > this.win) {
      // Das Fenster war schon zu, der Frame kam nur noch nicht dran
      this.timeout(this.onset + this.win);
      return;
    }
    if (rt < ANTICIPATION_MS) {
      this.earlyTap(p);
      return;
    }
    const { sfx, hud, texts } = this.ctx;
    if (this.plan[this.idx] === 'go') {
      this.hits++;
      this.rts.push(rt);
      sfx.good();
      this.fx = { kind: 'hit', t0: p.t };
      this.endTrial(true, p.t);
    } else {
      this.commissions++;
      sfx.bad();
      hud.toast(texts.feedback.stop, 'bad', { y: this.toastY(), ms: 900 });
      this.fx = { kind: 'fadeStop', t0: p.t };
      this.endTrial(false, p.t);
    }
  }

  /** Tipp ohne Zeichen (oder geraten): nicht bestrafen, nur zählen und kurz Bescheid geben */
  private earlyTap(p: PointerInfo): void {
    this.early++;
    if (this.phase === 'isi') this.isiEnd = Math.max(this.isiEnd, p.t + EARLY_PUSH_MS);
    if (p.t - this.lastEarlyToast > 500) {
      this.lastEarlyToast = p.t;
      const u = this.ctx.stage.u;
      this.ctx.hud.toast(this.ctx.texts.feedback.early, 'info', { y: this.toastY(), ms: 650, size: clamp(u * 3.8, 16, 32) });
    }
  }

  // --- Geister-Hand ---

  private autoplay(t: number): void {
    if (this.demo) {
      this.demoScript();
      return;
    }
    // Test-Modus: meist richtig, manchmal zu langsam, manchmal bei Rot getippt
    const { ghost, rng } = this.ctx;
    const rest = this.restPos();
    if (this.phase === 'isi' && !this.autoIsiPlanned) {
      this.autoIsiPlanned = true;
      if (rng.chance(0.04)) ghost.tap(rest.x, rest.y, { delay: Math.max(GRACE_MS + 30, (this.isiEnd - t) * 0.5), move: 0 });
    }
    if (this.phase === 'stim' && !this.autoStimPlanned) {
      this.autoStimPlanned = true;
      const go = this.plan[this.idx] === 'go';
      if (go ? rng.chance(0.93) : rng.chance(0.2)) ghost.tap(rest.x, rest.y, { delay: rng.range(280, 470), move: 0 });
    }
  }

  /** Intro-Film: bei Grün tippt die Hand nach ~350 ms, bei Rot nähert sie sich und zieht zurück */
  private demoScript(): void {
    if (this.phase !== 'stim' || this.autoStimPlanned) return;
    this.autoStimPlanned = true;
    const { ghost, stage } = this.ctx;
    const rest = this.restPos();
    if (this.plan[this.idx] === 'go') {
      // Zeitplan: 1 Frame bis die Hand startet + 175 ms warten + 160 ms Fahrt ≈ 350 ms
      ghost.tap(rest.x - stage.w * 0.025, rest.y - stage.h * 0.035, { delay: 175, move: 160 });
      ghost.moveTo(rest.x, rest.y, { delay: 250, move: 350 });
    } else {
      const c = this.center();
      const r = this.radius();
      ghost.moveTo(c.x + r * 1.45, c.y + r * 1.05, { delay: 120, move: 380 });
      ghost.moveTo(rest.x, rest.y, { delay: 320, move: 420 });
    }
  }

  // --- Zeichnen ---

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, u, dpr } = this.ctx.stage;
    background(g, w, h, dpr);
    const { x: cx, y: cy } = this.center();
    const r = this.radius();

    // Dezente "Bühne" für das Zeichen
    g.save();
    circle(g, cx, cy, r * 1.55, 'rgba(255,255,255,0.028)');
    ring(g, cx, cy, r * 1.55, 'rgba(255,255,255,0.075)', Math.max(1.5, u * 0.25));
    g.restore();

    if (!this.demo) this.drawLegend(g, t);

    if (this.phase === 'stim') {
      const s = 0.9 + 0.1 * easeOut((t - this.onset) / 70);
      if (this.plan[this.idx] === 'go') drawGo(g, cx, cy, r * s, 1);
      else drawStop(g, cx, cy, r * s, 1);
    } else {
      // Fixationspunkt
      g.save();
      g.globalAlpha = 0.85;
      circle(g, cx, cy, Math.max(3, u * 0.8), C.fg);
      g.restore();
    }

    this.drawFx(g, t, cx, cy, r);
  }

  private drawFx(g: CanvasRenderingContext2D, t: number, cx: number, cy: number, r: number): void {
    const fx = this.fx;
    if (!fx) return;
    const u = this.ctx.stage.u;
    const age = t - fx.t0;
    if (fx.kind === 'hit') {
      const k = age / 460;
      if (k >= 1) return;
      g.save();
      g.globalAlpha = 0.6 * (1 - k);
      ring(g, cx, cy, r * (1 + 0.4 * easeOut(k)), GO_COLOR, Math.max(2.5, u * 0.6));
      g.restore();
      const a = k < 0.55 ? 1 : 1 - (k - 0.55) / 0.45;
      drawCheck(g, cx, cy, r * (0.92 + 0.1 * easeOut(k * 2)), GO_LIGHT, Math.max(5, r * 0.17), a);
    } else if (fx.kind === 'withhold') {
      // Richtig gebremst: kurzer, ruhiger grüner Ring
      const k = age / 520;
      if (k >= 1) return;
      g.save();
      g.globalAlpha = 0.7 * (1 - k);
      ring(g, cx, cy, r * (1.02 + 0.3 * easeOut(k)), GO_LIGHT, Math.max(2.5, u * 0.55));
      g.restore();
    } else {
      // Zeichen verschwindet sehr schnell (kein hartes Blitzen)
      const k = age / 140;
      if (k >= 1) return;
      if (fx.kind === 'fadeGo') drawGo(g, cx, cy, r, 1 - k);
      else drawStop(g, cx, cy, r, 1 - k);
    }
  }

  /** Kleine Erinnerung unten: Kreis = tippen, Achteck = nicht tippen (nur am Anfang) */
  private drawLegend(g: CanvasRenderingContext2D, t: number): void {
    const alpha = 1 - clamp((t - this.legendFadeAt) / 700, 0, 1);
    if (alpha <= 0) return;
    const { w, h, u } = this.ctx.stage;
    const { texts } = this.ctx;
    const fs = clamp(u * 2.7, 14, 21);
    const ir = fs * 0.62;
    const gap = fs * 0.5;
    const between = fs * 2.2;
    g.save();
    g.font = font(fs, 700);
    const w1 = g.measureText(texts.feedback.legendGo).width;
    const w2 = g.measureText(texts.feedback.legendStop).width;
    const total = ir * 2 + gap + w1 + between + ir * 2 + gap + w2;
    let x = (w - total) / 2;
    const y = h - Math.max(30, u * 6);
    g.globalAlpha = 0.8 * alpha;
    circle(g, x + ir, y, ir, GO_COLOR);
    x += ir * 2 + gap;
    g.fillStyle = C.dim;
    g.textAlign = 'left';
    g.textBaseline = 'middle';
    g.fillText(texts.feedback.legendGo, x, y + 1);
    x += w1 + between;
    octagon(g, x + ir, y, ir * 1.05, STOP_COLOR);
    fillRR(g, x + ir - ir * 0.6, y - ir * 0.15, ir * 1.2, ir * 0.3, ir * 0.05, '#FFFFFF');
    x += ir * 2 + gap;
    g.fillStyle = C.dim;
    g.fillText(texts.feedback.legendStop, x, y + 1);
    g.restore();
  }

  // --- Ergebnis ---

  private finish(): void {
    this.finished = true;
    const nGo = this.plan.filter((k) => k === 'go').length;
    const nStop = this.plan.length - nGo;
    const threshold = this.stair.threshold();
    const accuracy = this.plan.length ? ((this.hits + this.withholds) / this.plan.length) * 100 : 0;
    const commissionRate = nStop ? this.commissions / nStop : 0;
    const omissionRate = nGo ? this.misses / nGo : 0;
    // d′ (Loglinear-Korrektur): trennt „gut unterschieden“ von „einfach vorsichtig“ – nur intern
    const sensitivity = dPrime(this.hits, nGo, this.commissions, nStop);
    // Die Frist pendelt sich auf ≈ 79 % rechtzeitig ein → ≈ 20 % Verpasser sind normal
    let tip = 'great';
    if (commissionRate > 0.25) tip = 'brake';
    else if (omissionRate > 0.3) tip = 'faster';
    else if (sensitivity < 1.3) tip = commissionRate >= 0.15 ? 'brake' : 'faster';
    const secondary: Metric[] = [
      { key: 'accuracy', value: Math.round(accuracy), unit: 'percent' },
      { key: 'stopErrors', value: this.commissions, unit: 'count' },
      ...(this.rts.length ? [{ key: 'rt', value: Math.round(median(this.rts)), unit: 'time' as const }] : []),
      { key: 'missed', value: this.misses, unit: 'count' },
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

export const stoppLos: ExerciseDefinition = {
  id: 'stopp-los',
  category: 'reaktion',
  minutes: 1,
  color: '#C8641E',
  showsLevel: true,
  icon:
    '<circle cx="12.5" cy="24" r="8" fill="currentColor"/><path fill="currentColor" fill-rule="evenodd" d="M43.2 20v8l-5.7 5.7h-8l-5.7-5.7v-8l5.7-5.7h8zM27.3 22.2h12.4v3.6H27.3z"/>',
  texts: { de, it },
  create: (ctx) => new StoppLos(ctx),
};
