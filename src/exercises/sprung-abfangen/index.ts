/**
 * Sprungweite – mit dem Finger die Kraft dosieren, damit die Kugel auf der Zielmarke landet
 * (Katalog 809, „Sprungsequenz & Flugbahn-Abfangen“ – hier als ehrliche Touch-Übung am Bildschirm, keine Körperübung).
 *
 * Das Original ist ein Maus-Spiel (Taste halten = laden, loslassen = Sprung, Zeiger im Flug lenken; Pointer-Lock, roter
 * Vollbild-Blitz, Wackeln, Normtabelle, ungeprüfte Sprungkraft-Aussagen). Hier:
 * - Kugel am Boden, Zielmarke daneben. Der Finger zieht an einer Kraftleiste unten; die Länge des Ziehens bestimmt die
 *   Sprungweite (Verstärkung fest). Loslassen löst den Sprung aus. Der Finger bleibt unter dem Geschehen und verdeckt nichts.
 * - Die Kugel fliegt auf einer echten Wurfparabel (feste Abwurfrichtung und Schwerkraft, Flugzeit mit dt aufsummiert).
 * - Fehler = Abstand zwischen Landepunkt und Zielmitte in % der Bühnenbreite, mit „zu kurz/zu weit“. Treffer im Feld.
 * - Stufe (3-down/1-up): Trefferfeld schrumpft, die Hilfsmarke an der Leiste (zeigt anfangs die richtige Kraft) blendet aus,
 *   die Sprungweiten streuen stärker. Kein Zeitdruck, kein Rot, kein Wackeln; ✓/✗-Abzeichen statt Farbe.
 * - Unterschied zu „Landepunkt“ (verdeckter Ball, Landestelle antippen): hier wird die Weite dosiert, nichts ist verdeckt.
 * - Gemessen werden nur Zuglänge und Landepunkt auf diesem Gerät – nichts über Sprungkraft oder den Blick.
 *
 * Geister-Hand (Film/Autoplay): Die Übung führt selbst eine virtuelle Hand, die an der Leiste zieht.
 */
import { background, C, circle, fillRR, ring, text, withAlpha } from '../../core/draw';
import { nextStartLevel, Staircase } from '../../core/staircase';
import { clamp, lerp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, PointerInfo } from '../../core/types';
import { handSize, restSpot, softBadge, VirtualHand } from '../_shared/koerper-b';
import {
  guideAlphaFor,
  gravityFor,
  isHit,
  jumpPos,
  type Jump,
  landingX,
  makeJump,
  makeTrial,
  MAX_LEVEL,
  mean,
  MIN_LEVEL,
  MIN_POWER,
  noisyPower,
  pointsFor,
  powerForDist,
  powerToDist,
  pullToPower,
  signedErrorPct,
  tolerancePct,
  type Trial,
} from './logic';
import { de, it } from './texts';

const TRIALS = 12;
const QUICK_TRIALS = 3;
const DEMO_TRIALS = 2;
const REVEAL_S = 1.5;
const GAP_MS: [number, number] = [450, 750];
const FIRST_MS: [number, number] = [900, 1300];
const DEMO_FIRST_MS = 1300;
const DEMO_GAP_MS = 450;
const END_DELAY_MS = 600;
const DEMO_LEVEL = 1;
const VF_ID = -2;

const BALL = '#F8FAFC';
const SKY = '#38BDF8';
const GOAL = '#F5D67A';

type Phase = 'ready' | 'aim' | 'fly' | 'reveal' | 'done';

interface Geo {
  key: string;
  groundLine: number;
  groundY: number;
  r: number;
  margin: number;
  barY: number;
  barLen: number;
  barH: number;
  bandTop: number;
  barX0: number;
  barX1: number;
}

interface Rec {
  level: number;
  ok: boolean;
  abs: number;
  signed: number;
}

interface Finger {
  id: number;
  x: number;
}

interface Auto {
  st: 'idle' | 'approach' | 'pull' | 'hold' | 'after';
  t0: number;
  dur: number;
  startX: number;
  endX: number;
  captioned: number;
}

class SprungAbfangen implements Exercise {
  private readonly stair: Staircase;
  private readonly total: number;
  private phase: Phase = 'ready';
  private nextAt = 0;
  private geo: Geo | null = null;
  private trial: Trial | null = null;
  private jump: Jump | null = null;
  private curLevel = MIN_LEVEL;
  private s = 0;
  private revealClock = 0;
  private idx = 0;
  private hits = 0;
  private points = 0;
  private recs: Rec[] = [];
  private finger: Finger | null = null;
  private power = 0;
  private lastOk = false;
  private landX = 0;
  private capState = '';
  private hintedAt = -1e9;
  private readonly vh = new VirtualHand();
  private auto: Auto = { st: 'idle', t0: 0, dur: 0, startX: 0, endX: 0, captioned: 0 };

  constructor(private readonly ctx: ExerciseContext) {
    const s = Math.round(ctx.startLevel ?? MIN_LEVEL);
    const start = clamp(Number.isFinite(s) ? s : MIN_LEVEL, MIN_LEVEL, MAX_LEVEL);
    this.stair = new Staircase({ start, min: MIN_LEVEL, max: MAX_LEVEL, down: 3, up: 1 });
    this.total = ctx.mode === 'demo' ? DEMO_TRIALS : ctx.quick ? QUICK_TRIALS : TRIALS;
  }

  private get demo(): boolean {
    return this.ctx.mode === 'demo';
  }

  private get level(): number {
    return this.demo ? DEMO_LEVEL : this.stair.level;
  }

  // ------------------------------------------------------------------ Layout

  private layout(): Geo {
    const { w, h, u } = this.ctx.stage;
    const key = `${w}x${h}:${this.demo ? 1 : 0}`;
    if (this.geo && this.geo.key === key) return this.geo;
    const r = clamp(u * 2.6, 13, 24);
    const groundLine = h * 0.7;
    const barLen = Math.min(w * 0.56, 70 * Math.max(u, 4));
    const barH = clamp(u * 3.4, 22, 36);
    this.geo = {
      key,
      groundLine,
      groundY: groundLine - r,
      r,
      margin: Math.max(u * 2, 8) + r + 6,
      barY: h * 0.895,
      barLen,
      barH,
      bandTop: h * 0.78,
      barX0: w / 2 - barLen / 2,
      barX1: w / 2 + barLen / 2,
    };
    if (this.trial && this.phase !== 'done' && this.phase !== 'ready') {
      // gedrehtes Tablet: Durchgang neu beginnen
      this.phase = 'ready';
      this.nextAt = this.ctx.now() + 600;
      this.finger = null;
      this.power = 0;
    }
    if (this.phase !== 'done') this.prepareTrial();
    return this.geo;
  }

  resize(): void {
    this.geo = null;
    this.layout();
  }

  private anchorX(dir: 1 | -1): number {
    const G = this.layout();
    return dir === 1 ? G.barX0 : G.barX1;
  }

  // ------------------------------------------------------------------ Ablauf

  start(t: number): void {
    const { rng, texts } = this.ctx;
    this.layout();
    this.phase = 'ready';
    this.nextAt = t + (this.demo ? DEMO_FIRST_MS : rng.range(FIRST_MS[0], FIRST_MS[1]));
    if (this.ctx.autoplay) this.ctx.ghost.hide();
    const rp = restSpot(this.ctx.stage, false);
    this.vh.snap(rp.x, rp.y);
    this.updateHud();
    if (this.demo) this.setCaption('watch', texts.captions.watch);
    this.prepareTrial();
  }

  private prepareTrial(): void {
    const { rng, stage } = this.ctx;
    const G = this.geo ?? this.layout();
    this.curLevel = this.demo ? DEMO_LEVEL : Math.floor(this.stair.level + 1e-9);
    const prev = this.recs.length ? this.trial?.dir : undefined;
    this.trial = makeTrial(
      {
        w: stage.w,
        margin: G.margin,
        level: this.curLevel,
        prevDir: prev,
        fixed: this.demo
          ? this.idx % 2 === 0
            ? { dir: 1, x0: stage.w * 0.17, distFrac: 0.42 }
            : { dir: -1, x0: stage.w * 0.84, distFrac: 0.36 }
          : undefined,
      },
      rng,
    );
    this.jump = null;
  }

  update(dt: number, t: number): void {
    if (this.phase === 'done') return;
    this.vh.update(t);
    if (this.phase === 'ready') {
      if (t >= this.nextAt) {
        if (this.idx >= this.total) {
          this.end();
          return;
        }
        this.beginAim(t);
      }
    } else if (this.phase === 'aim') {
      if (this.ctx.autoplay) this.autoUpdate(t);
    } else if (this.phase === 'fly' && this.jump) {
      this.s += dt;
      if (this.s >= this.jump.T) this.land();
    } else if (this.phase === 'reveal') {
      this.revealClock += dt;
      if (this.revealClock >= REVEAL_S) this.afterReveal(t);
    }
    if (this.ctx.autoplay && this.phase !== 'aim') this.releaseAuto();
  }

  private beginAim(t: number): void {
    this.phase = 'aim';
    this.finger = null;
    this.power = 0;
    this.auto = { st: 'idle', t0: t, dur: 0, startX: 0, endX: 0, captioned: 0 };
    if (this.demo) this.setCaption('pull', this.ctx.texts.captions.pull);
  }

  private startJump(power: number): void {
    const { stage } = this.ctx;
    const G = this.layout();
    const tr = this.trial;
    if (!tr) return;
    const dist = powerToDist(power, stage.w);
    this.jump = makeJump(tr.x0, G.groundY, tr.dir, dist, gravityFor(stage.u));
    this.s = 0;
    this.phase = 'fly';
    this.finger = null;
    this.vh.holding = false;
    this.ctx.sfx.tap();
    if (this.demo) this.setCaption('fly', this.ctx.texts.captions.release);
  }

  private land(): void {
    const { sfx, hud, fmt, stage, texts } = this.ctx;
    const tr = this.trial;
    const j = this.jump;
    if (!tr || !j) return;
    const G = this.layout();
    this.landX = landingX(j);
    const signed = signedErrorPct(this.landX, tr.targetX, tr.dir, stage.w);
    const abs = Math.abs(signed);
    const ok = isHit(abs, this.curLevel);
    this.lastOk = ok;
    if (ok) {
      this.hits++;
      this.points += pointsFor(abs, this.curLevel);
      sfx.good();
    } else sfx.bad();
    this.recs.push({ level: this.curLevel, ok, abs, signed });
    if (!this.demo) this.stair.update(ok);
    this.idx++;
    this.updateHud();
    this.phase = 'reveal';
    this.revealClock = 0;
    const size = clamp(stage.u * 4.6, 18, 38);
    const dirWord = signed < 0 ? texts.feedback.short : texts.feedback.far;
    const label = ok ? `✓ ${fmt.num(abs, 1)} %` : `✗ ${dirWord} · ${fmt.num(abs, 1)} %`;
    const half = Math.min(stage.w / 2, label.length * size * 0.32 + 12);
    hud.toast(label, ok ? 'good' : 'bad', {
      x: clamp(tr.targetX, half, stage.w - half),
      y: Math.max(size * 1.4, G.groundLine - size * 4.2),
      ms: 1200,
      size,
    });
    if (this.demo) this.setCaption('check', texts.captions.check);
  }

  private afterReveal(t: number): void {
    const { rng } = this.ctx;
    this.phase = 'ready';
    if (this.idx >= this.total) {
      this.nextAt = t + END_DELAY_MS;
      return;
    }
    this.prepareTrial();
    this.nextAt = t + (this.demo ? DEMO_GAP_MS : rng.range(GAP_MS[0], GAP_MS[1]));
    if (this.demo) this.setCaption('watch', this.ctx.texts.captions.watch);
  }

  private setCaption(state: string, txt: string): void {
    if (this.capState === state) return;
    this.capState = state;
    this.ctx.hud.caption(txt, 'top');
  }

  private updateHud(): void {
    const { hud, texts } = this.ctx;
    hud.setProgress(this.idx / this.total);
    hud.setScore(this.demo ? null : this.hits);
    hud.setLabel(`${texts.feedback.level} ${Math.floor(this.level + 1e-9)}`);
  }

  // ------------------------------------------------------------------ Eingabe

  pointerDown(p: PointerInfo): void {
    if (this.phase !== 'aim' || this.finger || !this.trial) return;
    const G = this.layout();
    if (p.y < G.bandTop) {
      // Nicht im Ziehbereich: selten kurz erklären
      if (!this.demo && p.t - this.hintedAt > 4500) {
        this.hintedAt = p.t;
        this.ctx.hud.toast(this.ctx.texts.feedback.hint, 'info', { x: this.ctx.stage.w / 2, y: G.barY - G.barH * 2.4, ms: 1500, size: clamp(this.ctx.stage.u * 3.6, 15, 26) });
      }
      return;
    }
    this.finger = { id: p.id, x: p.x };
    this.setPower(p.x);
    this.ctx.sfx.tick();
  }

  pointerMove(p: PointerInfo): void {
    const f = this.finger;
    if (!f || p.id !== f.id || this.phase !== 'aim') return;
    f.x = p.x;
    this.setPower(p.x);
  }

  pointerUp(p: PointerInfo): void {
    const f = this.finger;
    if (!f || p.id !== f.id || this.phase !== 'aim') return;
    this.finger = null;
    this.setPower(p.x);
    if (this.power >= MIN_POWER) this.startJump(this.power);
    else if (!this.demo && p.t - this.hintedAt > 2500) {
      this.hintedAt = p.t;
      const G = this.layout();
      this.ctx.hud.toast(this.ctx.texts.feedback.hint, 'info', { x: this.ctx.stage.w / 2, y: G.barY - G.barH * 2.4, ms: 1500, size: clamp(this.ctx.stage.u * 3.6, 15, 26) });
    }
  }

  private setPower(x: number): void {
    const tr = this.trial;
    if (!tr) return;
    const G = this.layout();
    const pull = (x - this.anchorX(tr.dir)) * tr.dir;
    this.power = pullToPower(pull, G.barLen);
  }

  // ------------------------------------------------------------------ virtuelle Hand (Film / Autoplay)

  private autoUpdate(t: number): void {
    const { rng, stage } = this.ctx;
    const tr = this.trial;
    if (!tr) return;
    const G = this.layout();
    const A = this.auto;
    const demo = this.demo;
    const info = (x: number): PointerInfo => ({ id: VF_ID, x, y: this.vh.y, t, type: 'ghost' });
    if (A.st === 'idle') {
      const react = demo ? 1000 : rng.range(500, 1000);
      if (t - A.t0 < react) return;
      // Rare Aussetzer im Spielmodus: nichts tun (Durchgang wartet) – nur in den Tests, nie im Film
      A.st = 'approach';
      A.t0 = t;
      A.dur = demo ? 800 : rng.range(400, 650);
      const ax = this.anchorX(tr.dir);
      this.vh.glide(ax, G.barY, t, A.dur);
      return;
    }
    if (A.st === 'approach') {
      if (t - A.t0 < A.dur) return;
      this.vh.snap(this.anchorX(tr.dir), G.barY);
      this.pointerDown(info(this.vh.x));
      this.vh.holding = true;
      this.vh.press(t);
      const need = powerForDist(tr.dist, stage.w);
      const sigma = demo ? 0 : 0.02 + 0.002 * this.curLevel;
      const pw = demo ? need : noisyPower(need, sigma, rng);
      A.startX = this.vh.x;
      A.endX = this.anchorX(tr.dir) + tr.dir * pw * G.barLen;
      A.st = 'pull';
      A.t0 = t;
      A.dur = demo ? 2100 : rng.range(550, 850);
      if (demo && A.captioned < 1) {
        A.captioned = 1;
        this.setCaption('pull2', this.ctx.texts.captions.guide);
      }
      return;
    }
    if (A.st === 'pull') {
      const k = clamp((t - A.t0) / A.dur, 0, 1);
      const e = k * k * (3 - 2 * k);
      this.vh.snap(lerp(A.startX, A.endX, e), G.barY);
      this.pointerMove(info(this.vh.x));
      if (k >= 1) {
        A.st = 'hold';
        A.t0 = t;
        A.dur = demo ? 700 : 150;
      }
      return;
    }
    if (A.st === 'hold') {
      if (t - A.t0 < A.dur) return;
      this.vh.holding = false;
      this.pointerUp(info(this.vh.x));
      A.st = 'after';
      A.t0 = t;
      const rp = restSpot(stage, false);
      this.vh.glide(rp.x, rp.y, t + 350, 650);
      return;
    }  }

  private releaseAuto(): void {
    const A = this.auto;
    if (A.st === 'pull' || A.st === 'hold') {
      // Durchgang wurde von außen beendet (z. B. Drehen des Tablets): Hand loslassen
      this.vh.holding = false;
      A.st = 'after';
    }
  }

  // ------------------------------------------------------------------ Ende

  private end(): void {
    this.phase = 'done';
    this.ctx.hud.caption(null);
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 'level', value: DEMO_LEVEL, unit: 'level', better: 'higher' },
        secondary: [{ key: 'hits', value: this.hits, unit: 'count' }],
        score: this.points,
        level: MIN_LEVEL,
      });
      return;
    }
    this.ctx.sfx.done();
    const n = this.recs.length;
    const thr = this.stair.threshold();
    const meanErr = mean(this.recs.map((r) => r.abs));
    const bias = mean(this.recs.map((r) => r.signed));
    const acc = n ? (100 * this.hits) / n : 0;
    const maxLevel = this.recs.reduce((m, r) => Math.max(m, r.level), MIN_LEVEL);
    let tip = 'great';
    if (Number.isFinite(bias) && Math.abs(bias) >= 2) tip = bias < 0 ? 'short' : 'far';
    else if (Number.isFinite(meanErr) && meanErr > 6) tip = 'steady';
    this.ctx.finish({
      primary: { key: 'level', value: Math.max(MIN_LEVEL, Math.round(thr)), unit: 'level', better: 'higher' },
      secondary: [
        ...(Number.isFinite(meanErr) ? [{ key: 'meanError', value: Math.round(meanErr * 10) / 10, unit: 'percent' as const }] : []),
        { key: 'accuracy', value: Math.round(acc), unit: 'percent' as const },
        { key: 'maxLevel', value: Math.floor(maxLevel + 1e-9), unit: 'level' as const },
      ],
      score: this.points,
      level: nextStartLevel(thr, MIN_LEVEL, MAX_LEVEL),
      tip,
    });
  }

  // ------------------------------------------------------------------ Zeichnen

  render(g: CanvasRenderingContext2D, t: number): void {
    const { w, h, dpr } = this.ctx.stage;
    const G = this.layout();
    background(g, w, h, dpr);
    // Boden
    g.fillStyle = 'rgba(3,8,18,0.4)';
    g.fillRect(0, G.groundLine, w, h - G.groundLine);
    g.fillStyle = 'rgba(255,255,255,0.18)';
    g.fillRect(0, Math.round(G.groundLine), w, 2);
    const tr = this.trial;
    if (!tr) return;
    this.drawTarget(g, G, tr);
    // Absprungmarke
    ring(g, tr.x0, G.groundLine, G.r * 0.9, 'rgba(255,255,255,0.25)', 2);
    const j = this.jump;
    if (j && (this.phase === 'fly' || this.phase === 'reveal')) this.drawTrail(g, j);
    const pos = j && this.phase !== 'ready' && this.phase !== 'aim' ? jumpPos(j, this.s) : { x: tr.x0, y: G.groundY };
    circle(g, pos.x, pos.y, G.r, BALL);
    if (this.phase === 'reveal' && j) this.drawReveal(g, G, tr);
    if (this.phase === 'aim' || this.phase === 'ready') this.drawBar(g, G, tr, t);
    else this.drawBarIdle(g, G, tr);
    if (this.ctx.autoplay) this.vh.render(g, t, handSize(this.ctx.stage));
  }

  private drawTarget(g: CanvasRenderingContext2D, G: Geo, tr: Trial): void {
    const { w } = this.ctx.stage;
    const tol = (tolerancePct(this.curLevel) / 100) * w;
    const x0 = tr.targetX - tol;
    const x1 = tr.targetX + tol;
    const y = G.groundLine;
    // Trefferfeld: Streifen auf dem Boden mit Schraffur (nicht nur Farbe)
    g.save();
    g.beginPath();
    g.rect(x0, y - 6, x1 - x0, 12);
    g.clip();
    g.fillStyle = withAlpha(GOAL, 0.3);
    g.fillRect(x0, y - 6, x1 - x0, 12);
    g.strokeStyle = withAlpha(GOAL, 0.85);
    g.lineWidth = 2;
    g.beginPath();
    for (let x = x0 - 12; x < x1 + 12; x += 9) {
      g.moveTo(x, y + 6);
      g.lineTo(x + 12, y - 6);
    }
    g.stroke();
    g.restore();
    g.save();
    g.strokeStyle = GOAL;
    g.lineWidth = 3;
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(x0, y - 14);
    g.lineTo(x0, y + 14);
    g.moveTo(x1, y - 14);
    g.lineTo(x1, y + 14);
    g.stroke();
    // Fähnchen in der Mitte
    const poleH = clamp(G.r * 3.2, 34, 70);
    g.strokeStyle = C.white;
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(tr.targetX, y);
    g.lineTo(tr.targetX, y - poleH);
    g.stroke();
    g.fillStyle = GOAL;
    g.beginPath();
    g.moveTo(tr.targetX, y - poleH);
    g.lineTo(tr.targetX + tr.dir * -poleH * 0.45, y - poleH * 0.82);
    g.lineTo(tr.targetX, y - poleH * 0.62);
    g.closePath();
    g.fill();
    g.restore();
  }

  private drawTrail(g: CanvasRenderingContext2D, j: Jump): void {
    const n = 18;
    const until = this.phase === 'reveal' ? j.T : Math.min(this.s, j.T);
    g.save();
    for (let k = 0; k <= n; k++) {
      const p = jumpPos(j, (until * k) / n);
      g.globalAlpha = 0.18 + 0.4 * (k / n);
      circle(g, p.x, p.y, Math.max(2, this.geo ? this.geo.r * 0.22 : 3), C.white);
    }
    g.restore();
  }

  private drawBar(g: CanvasRenderingContext2D, G: Geo, tr: Trial, t: number): void {
    const x0 = G.barX0;
    const len = G.barLen;
    const y = G.barY;
    const hh = G.barH;
    fillRR(g, x0 - hh * 0.5, y - hh / 2, len + hh, hh, hh / 2, 'rgba(255,255,255,0.10)');
    const ax = this.anchorX(tr.dir);
    const endX = ax + tr.dir * this.power * len;
    // Füllung
    if (this.power > 0) {
      const a = Math.min(ax, endX);
      fillRR(g, a - hh * 0.5 * (tr.dir === 1 ? 1 : 0), y - hh / 2, Math.abs(endX - ax) + hh * 0.5, hh, hh / 2, withAlpha(SKY, 0.85));
    }
    // Hilfsmarke: Dreieck unter der Leiste an der richtigen Kraft (blendet mit der Stufe aus)
    const ga = this.demo ? 1 : guideAlphaFor(this.curLevel);
    if (ga > 0.02) {
      const gx = ax + tr.dir * powerForDist(tr.dist, this.ctx.stage.w) * len;
      g.save();
      g.globalAlpha = ga;
      g.fillStyle = GOAL;
      g.strokeStyle = '#0B1424';
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(gx, y + hh * 0.56);
      g.lineTo(gx - hh * 0.42, y + hh * 1.14);
      g.lineTo(gx + hh * 0.42, y + hh * 1.14);
      g.closePath();
      g.fill();
      g.stroke();
      g.restore();
    }
    // Startknopf am Anfang der Leiste (Ring mit Pfeil in Sprungrichtung)
    ring(g, ax, y, hh * 0.72, 'rgba(255,255,255,0.75)', 2.5);
    g.save();
    g.fillStyle = 'rgba(255,255,255,0.85)';
    g.beginPath();
    g.moveTo(ax + tr.dir * hh * 0.32, y);
    g.lineTo(ax - tr.dir * hh * 0.12, y - hh * 0.26);
    g.lineTo(ax - tr.dir * hh * 0.12, y + hh * 0.26);
    g.closePath();
    g.fill();
    g.restore();
    // Fingerknopf
    if (this.finger) {
      circle(g, endX, y, hh * 0.58, C.white);
      ring(g, endX, y, hh * 0.58, SKY, 3);
    } else if (this.phase === 'aim' && !this.ctx.reducedMotion) {
      const pulse = 0.55 + 0.25 * Math.sin(t / 420);
      g.save();
      g.globalAlpha = pulse;
      ring(g, ax, y, hh * 1.0, C.white, 2, [7, 6]);
      g.restore();
    }
    if (this.phase === 'aim' && !this.finger && !this.demo) {
      const size = clamp(this.ctx.stage.u * 3.2, 13, 22);
      text(g, this.ctx.texts.feedback.pull, this.ctx.stage.w / 2, y - hh * 1.35, size, C.fg, { weight: 700 });
    }
  }

  private drawBarIdle(g: CanvasRenderingContext2D, G: Geo, tr: Trial): void {
    const hh = G.barH;
    fillRR(g, G.barX0 - hh * 0.5, G.barY - hh / 2, G.barLen + hh, hh, hh / 2, 'rgba(255,255,255,0.06)');
    const ax = this.anchorX(tr.dir);
    ring(g, ax, G.barY, hh * 0.72, 'rgba(255,255,255,0.3)', 2);
  }

  private drawReveal(g: CanvasRenderingContext2D, G: Geo, tr: Trial): void {
    const fade = this.ctx.reducedMotion ? 1 : clamp(this.revealClock / 0.25, 0, 1);
    g.save();
    g.globalAlpha = fade;
    // Landepunkt: Ring in Kugelgröße, Verbindung zur Zielmitte gestrichelt
    ring(g, this.landX, G.groundY, G.r + 2, BALL, 3);
    g.strokeStyle = 'rgba(232,238,247,0.5)';
    g.lineWidth = 2.5;
    g.setLineDash([6, 6]);
    g.beginPath();
    g.moveTo(this.landX, G.groundLine + 14);
    g.lineTo(tr.targetX, G.groundLine + 14);
    g.stroke();
    g.setLineDash([]);
    const rad = clamp(G.r * 0.95, 12, 20);
    softBadge(g, tr.targetX, G.groundLine - clamp(G.r * 3.2, 34, 70) - rad * 1.5, rad, this.lastOk ? 'ok' : 'bad');
    g.restore();
  }
}

export const sprungAbfangen: ExerciseDefinition = {
  id: 'sprung-abfangen',
  category: 'bewegung',
  minutes: 1,
  color: '#2E7DB8',
  showsLevel: true,
  icon:
    '<path d="M6 34C12 8 30 8 40 34" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="1 6.2"/><circle cx="10" cy="24" r="4.6" fill="currentColor"/><path d="M4 40h40" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/><path d="M40 40V27l-8 3.4 8 3.6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
  texts: { de, it },
  create: (ctx) => new SprungAbfangen(ctx),
};
