/**
 * Wörter bauen (Labor) – durcheinandergewürfelte Buchstabenkacheln zu einem Wort ordnen.
 *
 * Portierung der Labor-Übung `wordbuild` (Prototyp ex/wordbuild.js): Wortliste je Sprache (Deutsch `_shared/labor-woerter.ts`,
 * Italienisch `woerter.ts`, Wahl über `ctx.lang`), Einstellungen (`ctx.params`), reine Logik in logic.ts (`WordSession`).
 *
 * - Hauptwert: Zeit pro Wort (Mittel, `t_mean`, weniger = besser). Der Prototyp nennt `solved` zuerst – das steht aber durch
 *   die Zahl der Wörter fest, ist also keine Leistung (siehe Meldung/Doku).
 * - Kachelgröße in cm (`ctx.calib.sizePx`), verkleinert sich bei schmaler Bühne, damit alle Buchstaben nebeneinander passen.
 * - Rückmeldung weich: ✓ mit dem fertigen Wort oben, bei einem falschen Wort ✗ mit Hinweistext und gestrichelter Umrandung der
 *   Felder; die Kacheln gehen zurück. Kein Blitz, kein Rot. Ton nur, wenn „Ton“ an ist.
 * - Gemessen wird nur dein Tippen, nicht, ob du das Wort laut liest oder dir vorstellst.
 */
import { background, button, C, fillRR, font, hit, rrPath, text } from '../../core/draw';
import { calibOf } from '../../core/calib';
import { paramsOf } from '../../core/params';
import { clamp } from '../../core/stats';
import type { Exercise, ExerciseContext, ExerciseDefinition, ExerciseResult, Metric, PointerInfo, ResultDetailRow } from '../../core/types';
import { playField, restPoint } from '../_shared/tippziele';
import { drawSoftCheck, drawSoftCross, markAlpha } from '../_shared/weiche-marken';
import {
  displayLetter,
  layoutWord,
  PARAMS,
  pointsFor,
  QUICK_LENGTH,
  QUICK_WORDS,
  rowRect,
  tipFor,
  WordSession,
  wordParams,
  type WordLayout,
  type WordParams,
  type WordSummary,
} from './logic';
import { de, it } from './texts';
import { sprachOf } from './woerter';

const LEAD_MS = 700;
const FB_SOLVED_MS = 800;
const FB_WRONG_MS = 800;
const MARK_MS = 800;
/** Zweiter „Zurück“-Tipp so kurz nach dem ersten: ignoriert (Doppeltipp würde zwei Buchstaben entfernen) */
const UNDO_GUARD_MS = 260;

const TILE_FILL = 'rgba(255,255,255,0.17)';
const TILE_EDGE = 'rgba(255,255,255,0.36)';
const SLOT_FILL = 'rgba(255,255,255,0.09)';
const SLOT_FILLED = 'rgba(255,255,255,0.24)';
const LETTER = '#F2F5F9';

// Intro-Film: zwei Wörter; beim zweiten wird erst eine falsche Kachel gesetzt und mit „Zurück“ wieder weggenommen
const DEMO_WORDS = { de: ['Haus', 'Hut'], it: ['casa', 'ape'] } as const;
const DEMO_PARAMS: Partial<WordParams> = { tileCm: 2.5, sound: 'no' };
const DEMO_LEAD_MS = 1200;
const DEMO_FB_MS = 1000;

interface Fb {
  kind: 'solved' | 'wrong' | 'finished';
  t0: number;
  end: number;
  /** gelegte Buchstaben (Kleinbuchstaben) */
  letters: string;
  /** Wort in der Schreibweise der Liste (nur bei richtig) */
  word: string;
}

class WoerterBauen implements Exercise {
  private readonly demo: boolean;
  private readonly p: WordParams;
  private readonly session: WordSession;
  private phase: 'lead' | 'play' | 'fb' = 'lead';
  private phaseAt = 0;
  private fb: Fb | null = null;
  private wordBegun = false;
  private lastUndoT = -1e9;
  private autoPlanned = false;
  private autoWrongAt = -1;
  private autoWordIdx = -1;
  private demoQueuedIdx = -1;
  private done = false;
  private endT = Infinity;

  constructor(private readonly ctx: ExerciseContext) {
    this.demo = ctx.mode === 'demo';
    const base = wordParams(paramsOf(ctx, PARAMS));
    this.p = this.demo ? { ...base, ...DEMO_PARAMS } : ctx.quick ? { ...base, words: Math.min(base.words, QUICK_WORDS), wordLength: Math.min(base.wordLength, QUICK_LENGTH) } : base;
    const lang = sprachOf(ctx.lang);
    this.session = new WordSession(this.p, {
      rng: ctx.rng,
      lang,
      fixedWords: this.demo ? DEMO_WORDS[lang] : undefined,
    });
  }

  // --- Geometrie: immer live aus der Bühne ---

  private headerH(): number {
    return clamp(this.ctx.stage.u * 7, 30, 56);
  }

  private layout(n: number = this.session.tiles.length): WordLayout {
    const f = playField(this.ctx.stage, this.demo);
    const wanted = calibOf(this.ctx).sizePx(this.p.tileCm);
    return layoutWord(f, n, wanted, this.headerH());
  }

  resize(): void {
    if (this.ctx.autoplay) {
      this.ctx.ghost.clear();
      this.autoPlanned = false;
      this.demoQueuedIdx = -1;
    }
  }

  // --- Ablauf ---

  start(t: number): void {
    const { hud, ghost, texts } = this.ctx;
    this.session.start(t);
    this.phase = 'lead';
    this.phaseAt = t + (this.demo ? DEMO_LEAD_MS : LEAD_MS);
    hud.setProgress(0);
    hud.setScore(this.demo ? null : 0);
    this.updateHud();
    if (this.demo) {
      const r = restPoint(this.ctx.stage);
      ghost.moveTo(r.x, r.y, { move: 0 });
      hud.caption(texts.captions.ready);
    }
  }

  update(_dt: number, t: number): void {
    if (this.done) return;
    if (this.phase === 'lead' && t >= this.phaseAt) {
      this.phase = 'play';
      this.wordBegun = false;
      this.autoPlanned = false;
      if (this.demo) this.beginDemoWord();
    } else if (this.phase === 'fb' && this.fb && t >= this.fb.end) {
      if (this.fb.kind === 'finished') {
        this.finishSession(t);
        return;
      }
      if (this.fb.kind === 'solved') {
        this.phase = 'play';
        this.wordBegun = false;
        this.autoPlanned = false;
        if (this.demo) this.beginDemoWord();
      } else {
        this.phase = 'play';
        this.autoPlanned = false;
      }
      this.fb = null;
    }
    if (this.ctx.autoplay && !this.demo && this.phase === 'play') this.autoUpdate();
  }

  private updateHud(): void {
    const { hud, texts } = this.ctx;
    const s = this.session;
    hud.setProgress(clamp(s.idx / s.words.length, 0, 1));
    if (this.demo) return;
    hud.setScore(s.idx);
    hud.setLabel(
      texts.feedback.label
        .replace('{i}', String(Math.min(s.idx + 1, s.words.length)))
        .replace('{n}', String(s.words.length))
        .replace('{e}', String(s.errors)),
    );
  }

  // --- Intro-Film ---

  /** Hand tippt die Kacheln in richtiger Reihenfolge; beim zweiten Wort erst eine falsche Kachel und „Zurück“ */
  private beginDemoWord(): void {
    const { ghost, hud, texts } = this.ctx;
    const s = this.session;
    if (this.demoQueuedIdx === s.idx) return;
    this.demoQueuedIdx = s.idx;
    const L = this.layout();
    const used = new Set<number>();
    const pick = (ch: string): number => {
      const i = s.tiles.findIndex((tl, k) => tl.ch === ch && !used.has(k));
      used.add(i);
      return i;
    };
    const tapTile = (i: number, delay: number): void => {
      const r = rowRect(L, i, L.tileY);
      ghost.tap(r.x + r.w / 2, r.y + r.h / 2, { delay, move: 420 });
    };
    const target = s.target.toLowerCase();
    let first = true;
    if (s.idx === 1) {
      hud.caption(texts.captions.undo);
      const wrongIdx = s.tiles.findIndex((tl) => tl.ch !== target[0]);
      tapTile(wrongIdx, 600);
      ghost.tap(L.undo.x + L.undo.w / 2, L.undo.y + L.undo.h / 2, { delay: 900, move: 450 });
      first = false;
    } else hud.caption(texts.captions.order);
    for (const ch of target) {
      tapTile(pick(ch), first ? 600 : 220);
      first = false;
    }
    const r = restPoint(this.ctx.stage);
    ghost.moveTo(r.x, r.y, { delay: 150, move: 500 });
  }

  /** Autoplay (Tests): legt meist das richtige Wort, gelegentlich eine falsche Kachel */
  private autoUpdate(): void {
    const { ghost, rng } = this.ctx;
    if (this.autoPlanned || !ghost.idle) return;
    const s = this.session;
    if (this.autoWordIdx !== s.idx) {
      this.autoWordIdx = s.idx;
      this.autoWrongAt = rng.chance(0.15) ? rng.int(s.target.length) : -1;
    }
    const k = s.slots.length;
    const target = s.target.toLowerCase();
    const free = s.tiles.map((tl, i) => ({ tl, i })).filter((x) => !x.tl.used);
    if (!free.length) return;
    let cand = free.filter((x) => x.tl.ch === target[k]);
    if (k === this.autoWrongAt) {
      const wrong = free.filter((x) => x.tl.ch !== target[k]);
      if (wrong.length) cand = wrong;
      this.autoWrongAt = -1;
    }
    if (!cand.length) cand = free;
    const pickTile = cand[rng.int(cand.length)];
    this.autoPlanned = true;
    const L = this.layout();
    const r = rowRect(L, pickTile.i, L.tileY);
    const jit = r.w * 0.1;
    ghost.tap(r.x + r.w / 2 + rng.normal() * jit * 0.5, r.y + r.h / 2 + rng.normal() * jit * 0.5, { delay: rng.range(120, 420), move: rng.range(250, 400) });
  }

  // --- Eingabe ---

  pointerDown(p: PointerInfo): void {
    if (this.done || this.phase !== 'play') return;
    const s = this.session;
    const L = this.layout();
    const { sfx } = this.ctx;
    const n = s.tiles.length;
    this.autoPlanned = false;
    if (hit(L.undo, p.x, p.y, 4)) {
      if (p.t - this.lastUndoT < UNDO_GUARD_MS) return;
      if (s.removeLast()) {
        this.lastUndoT = p.t;
        if (this.p.sound === 'yes') sfx.tap();
      }
      return;
    }
    // Antippen des letzten gefüllten Feldes nimmt den Buchstaben zurück
    const last = s.slots.length - 1;
    if (last >= 0 && hit(rowRect(L, last, L.slotY), p.x, p.y, 4)) {
      if (p.t - this.lastUndoT < UNDO_GUARD_MS) return;
      if (s.removeLast()) this.lastUndoT = p.t;
      return;
    }
    for (let i = 0; i < n; i++) {
      if (!hit(rowRect(L, i, L.tileY), p.x, p.y, 5)) continue;
      const res = s.place(i, p.t);
      if (!res) return;
      if (res.type === 'placed') {
        if (this.p.sound === 'yes') sfx.tap();
      } else if (res.type === 'wrong') {
        this.fb = { kind: 'wrong', t0: p.t, end: p.t + FB_WRONG_MS, letters: res.attempt, word: '' };
        this.phase = 'fb';
        if (this.p.sound === 'yes') sfx.bad();
      } else {
        const ms = this.demo ? DEMO_FB_MS : FB_SOLVED_MS;
        this.fb = { kind: res.type, t0: p.t, end: p.t + ms, letters: res.word.toLowerCase(), word: res.word };
        this.phase = 'fb';
        if (this.p.sound === 'yes') sfx.good();
        if (this.demo) this.ctx.hud.caption(res.type === 'finished' ? this.ctx.texts.captions.count : this.ctx.texts.captions.solved);
      }
      this.updateHud();
      return;
    }
  }

  // --- Ende ---

  private finishSession(t: number): void {
    if (this.done) return;
    this.done = true;
    this.endT = t;
    const { hud, sfx } = this.ctx;
    hud.setProgress(1);
    const sum = this.session.summary();
    if (this.demo) {
      this.ctx.finish({
        primary: { key: 't_mean', value: sum.tMean ?? 0, unit: 'time', better: 'lower' },
        secondary: [{ key: 'errors', value: sum.errors, unit: 'count' }],
        score: 0,
        level: 1,
      });
      return;
    }
    if (this.p.sound === 'yes') sfx.done();
    this.ctx.finish(this.buildResult(sum));
  }

  private buildResult(sum: WordSummary): ExerciseResult {
    const { texts, fmt } = this.ctx;
    const secondary: Metric[] = [{ key: 'errors', value: sum.errors, unit: 'count' }];
    if (sum.tMedian !== null) secondary.push({ key: 't_median', value: sum.tMedian, unit: 'time' });
    if (sum.totalMs !== null) secondary.push({ key: 'total', value: sum.totalMs, unit: 'time' });
    if (sum.lpm !== null) secondary.push({ key: 'lpm', value: sum.lpm, unit: 'count' });
    const rows: ResultDetailRow[] = [
      { label: texts.metrics.solved, value: texts.feedback.solvedOf.replace('{a}', String(sum.solved)).replace('{b}', String(sum.words)) },
    ];
    if (sum.trials.length) {
      const slowest = sum.trials.reduce((a, b) => (b.ms > a.ms ? b : a));
      rows.push({ label: texts.feedback.slowest, value: `${slowest.word} · ${fmt.time(slowest.ms)}` });
    }
    return {
      primary: { key: 't_mean', value: sum.tMean ?? 0, unit: 'time', better: 'lower' },
      secondary,
      details: [{ title: texts.feedback.moreTitle, rows, note: texts.feedback.moreNote }],
      score: pointsFor(sum.solved, sum.errors),
      level: 1,
      tip: tipFor(sum),
    };
  }

  // -------------------------------------------------------------------------
  // Zeichnen

  render(g: CanvasRenderingContext2D, now: number): void {
    const t = Math.min(now, this.endT);
    const { w, h, dpr, u } = this.ctx.stage;
    background(g, w, h, dpr);
    const s = this.session;
    // Die Zeit des Wortes läuft ab dem ersten gezeichneten Frame mit sichtbaren Kacheln
    if (this.phase === 'play' && !this.wordBegun) {
      this.wordBegun = true;
      s.beginWord(now);
    }
    const f = playField(this.ctx.stage, this.demo);
    const fb = this.fb;
    const n = s.tiles.length;
    // bei einem gelösten Wort bleibt die Anordnung des alten Wortes stehen (das neue ist schon vorbereitet)
    const L = this.layout(this.phase === 'fb' && fb && fb.kind !== 'wrong' ? fb.letters.length : n);
    const solvedFb = this.phase === 'fb' && fb && fb.kind !== 'wrong';
    const rad = Math.min(L.tile * 0.2, 16);

    this.drawHeader(g, f.x + f.w / 2, f.y + this.headerH() / 2, f.w, u, t);

    // Felder (oben): gelegte Buchstaben; bei Rückmeldung das fertige bzw. falsche Wort
    const letters = this.phase === 'fb' && fb ? fb.letters.split('') : s.slots.map((k) => s.tiles[k].ch);
    const slotN = this.phase === 'fb' && fb ? letters.length : n;
    for (let i = 0; i < slotN; i++) {
      const r = rowRect(L, i, L.slotY);
      const filled = i < letters.length;
      fillRR(g, r.x, r.y, r.w, r.h, rad, filled ? SLOT_FILLED : SLOT_FILL);
      g.save();
      rrPath(g, r.x + 1, r.y + 1, r.w - 2, r.h - 2, rad);
      if (!filled || (this.phase === 'fb' && fb?.kind === 'wrong')) g.setLineDash([7, 6]);
      g.strokeStyle = solvedFb ? 'rgba(255,255,255,0.8)' : TILE_EDGE;
      g.lineWidth = solvedFb ? 3 : 2;
      g.stroke();
      g.restore();
      if (filled) text(g, displayLetter(letters[i]), r.x + r.w / 2, r.y + r.h / 2 + 1, L.tile * 0.56, LETTER, { weight: 800 });
    }

    // Kacheln (Mitte): benutzte sind leer (gestrichelter Umriss); bei fertigem Wort bleibt die Reihe leer
    for (let i = 0; i < n; i++) {
      const r = rowRect(L, i, L.tileY);
      const tl = s.tiles[i];
      const empty = tl.used || !!solvedFb;
      if (empty) {
        g.save();
        rrPath(g, r.x + 1, r.y + 1, r.w - 2, r.h - 2, rad);
        g.setLineDash([5, 6]);
        g.strokeStyle = 'rgba(255,255,255,0.2)';
        g.lineWidth = 1.5;
        g.stroke();
        g.restore();
        continue;
      }
      fillRR(g, r.x, r.y, r.w, r.h, rad, TILE_FILL);
      g.save();
      rrPath(g, r.x + 0.75, r.y + 0.75, r.w - 1.5, r.h - 1.5, rad);
      g.strokeStyle = TILE_EDGE;
      g.lineWidth = 1.5;
      g.stroke();
      g.restore();
      text(g, displayLetter(tl.ch), r.x + r.w / 2, r.y + r.h / 2 + 1, L.tile * 0.56, LETTER, { weight: 800 });
    }

    // „Zurück“ (Pfeil + Wort: Form, nicht nur Farbe)
    const canUndo = this.phase === 'play' && s.slots.length > 0;
    button(g, L.undo, canUndo ? 'normal' : 'disabled');
    const cx = L.undo.x + L.undo.w / 2;
    const cy = L.undo.y + L.undo.h / 2;
    const label = this.ctx.texts.feedback.undo;
    const lp = clamp(L.undo.h * 0.36, 16, 24);
    g.save();
    g.font = font(lp, 700);
    const tw = g.measureText(label).width;
    g.restore();
    const col = canUndo ? C.fg : C.dim;
    text(g, label, cx + lp * 0.7, cy, lp, col, { weight: 700 });
    g.save();
    g.strokeStyle = col;
    g.lineWidth = Math.max(2.5, lp * 0.14);
    g.lineCap = 'round';
    g.lineJoin = 'round';
    const ax = cx - tw / 2 - lp * 0.1;
    g.beginPath();
    g.moveTo(ax + lp * 0.55, cy - lp * 0.42);
    g.lineTo(ax, cy);
    g.lineTo(ax + lp * 0.55, cy + lp * 0.42);
    g.moveTo(ax, cy);
    g.lineTo(ax + lp * 1.0, cy);
    g.stroke();
    g.restore();
  }

  /** Textzeile oben: Aufforderung, bei Rückmeldung ✓ mit dem Wort bzw. ✗ mit Hinweis */
  private drawHeader(g: CanvasRenderingContext2D, cx: number, cy: number, maxW: number, u: number, t: number): void {
    const { texts } = this.ctx;
    const fb = this.fb;
    let label = texts.feedback.prompt;
    let color: string = C.dim;
    let markOk: boolean | null = null;
    if (this.phase === 'fb' && fb) {
      markOk = fb.kind !== 'wrong';
      label = markOk ? fb.word : texts.feedback.wrong;
      color = C.fg;
    } else if (this.phase === 'lead') label = texts.feedback.prompt;
    let px = clamp(u * 3.8, 16, 26);
    g.save();
    g.font = font(px, 700);
    const tw = g.measureText(label).width;
    g.restore();
    const room = maxW - px * 3;
    if (tw > room) px = Math.max(13, Math.floor((px * room) / tw));
    text(g, label, cx, cy, px, color, { weight: 700 });
    if (markOk !== null && fb) {
      const a = markAlpha(t - fb.t0, MARK_MS);
      const mx = cx - Math.min(tw, room) / 2 - px * 1.3;
      if (markOk) drawSoftCheck(g, mx, cy, px * 0.62, a);
      else drawSoftCross(g, mx, cy, px * 0.55, a);
    }
  }
}

export const laborWoerterBauen: ExerciseDefinition = {
  id: 'labor-woerter-bauen',
  category: 'konzentration',
  minutes: 2,
  color: '#7A5195',
  icon:
    '<g fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"><rect x="4" y="6" width="11" height="12" rx="3"/><rect x="18.5" y="6" width="11" height="12" rx="3" fill="currentColor" stroke="none" opacity=".35"/><rect x="33" y="6" width="11" height="12" rx="3"/><rect x="4" y="30" width="11" height="12" rx="3" fill="currentColor" stroke="none"/><rect x="18.5" y="30" width="11" height="12" rx="3"/><rect x="33" y="30" width="11" height="12" rx="3" fill="currentColor" stroke="none" opacity=".6"/></g><path d="M24 21v6M21 24l3 3 3-3" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  texts: { de, it },
  showsLevel: false,
  tags: ['labor'],
  params: PARAMS,
  usesCalibration: true,
  create: (ctx) => new WoerterBauen(ctx),
};
