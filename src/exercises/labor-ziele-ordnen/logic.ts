/**
 * Bewegte Ziele ordnen – reine Logik (aus `OrderSession` im Labor-Prototyp, ex/ordering.js).
 *
 * Zeiten in ms (beliebige Zeitbasis, hier die virtuelle Zeit des Runners), Koordinaten in cm relativ zur linken oberen
 * Ecke des Spielfelds. Zufall nur über `Rng`. Keine Darstellung, keine Eingabe.
 *
 * Regeln (wie im Prototyp, wo nicht anders vermerkt):
 * - Zahlen, Buchstaben, Wörter oder Rechenaufgaben bewegen sich (geradeaus mit Abprall, auf Kreis- oder Ellipsenbahn)
 *   und müssen in der richtigen Reihenfolge berührt werden; berührte richtige Ziele verschwinden.
 * - Falsches Ziel = Fehler (nichts weiter passiert), Tipp neben alle Ziele = „Danebengetippt“.
 * - Treffer = Tipp im Kästchen plus 0,3 cm Toleranz; mindestens aber 24 px (Touch-Ziel).
 * - Die Zeit pro Schritt wird mit der Zeitdifferenz zweier Aufrufe gerechnet (höchstens 0,25 s je Schritt), also
 *   unabhängig von der Bildrate.
 * - Ergänzungen gegenüber dem Prototyp: (1) Doppeltipp (< 250 ms) auf dieselbe Stelle zählt nicht doppelt.
 *   (2) `setField` passt Feld, Kästchengröße und Bahn an (Tablet gedreht). (3) `positionAfter` sagt die Lage eines Ziels
 *   voraus (für den Intro-Film und den Autoplay). (4) Zeichengröße wird so begrenzt, dass das längste Kästchen ins
 *   Feld passt (Handy), nie kleiner als ein Touch-Ziel.
 */
import { mean, sd } from '../../core/stats';
import type { ExerciseParams, ParamDef } from '../../core/types';
import type { Rng } from '../../core/rng';
import { WOERTER } from '../_shared/labor-woerter';

/** Einstellungen (Standardwerte und Grenzen aus dem Prototyp); Texte in texts.ts */
export const PARAMS: readonly ParamDef[] = [
  { key: 'content', type: 'select', default: 'numbers', options: ['numbers', 'numbers_desc', 'letters', 'words', 'sums', 'products'], summary: true },
  { key: 'count', type: 'number', unit: 'count', min: 3, max: 15, step: 1, default: 8, summary: true },
  { key: 'motion', type: 'select', default: 'linear', options: ['linear', 'circle', 'ellipse'], summary: true },
  { key: 'speedCmS', type: 'number', min: 1, max: 30, step: 0.5, default: 6 },
  { key: 'sizeCm', type: 'number', unit: 'cm', min: 1.5, max: 8, step: 0.5, default: 3 },
  { key: 'direction', type: 'select', default: 'cw', options: ['cw', 'ccw'] },
  { key: 'timeLimitS', type: 'number', unit: 's', min: 0, max: 300, step: 5, default: 0 },
  // Ton ändert die Messung nicht: gehört nicht zum Vergleichsschlüssel
  { key: 'sound', type: 'select', default: 'no', options: ['no', 'yes'], neutral: true },
];

export type Content = 'numbers' | 'numbers_desc' | 'letters' | 'words' | 'sums' | 'products';
export type Motion = 'linear' | 'circle' | 'ellipse';

export interface OrderParams {
  content: Content;
  count: number;
  motion: Motion;
  speedCmS: number;
  sizeCm: number;
  direction: 'cw' | 'ccw';
  /** 0 = kein Zeitlimit */
  timeLimitS: number;
  sound: 'yes' | 'no';
}

const CONTENTS: readonly Content[] = ['numbers', 'numbers_desc', 'letters', 'words', 'sums', 'products'];
const MOTIONS: readonly Motion[] = ['linear', 'circle', 'ellipse'];

/** Bereinigte Einstellungen (`ctx.params`) als typisiertes Objekt; fehlende Werte → Standard */
export function orderParams(p: ExerciseParams): OrderParams {
  const num = (key: string): number => {
    const d = PARAMS.find((x) => x.key === key)!;
    const v = p[key];
    return typeof v === 'number' && Number.isFinite(v) ? v : (d.default as number);
  };
  const sel = <T extends string>(key: string, allowed: readonly T[], def: T): T => {
    const v = p[key];
    return typeof v === 'string' && (allowed as readonly string[]).includes(v) ? (v as T) : def;
  };
  return {
    content: sel('content', CONTENTS, 'numbers'),
    count: Math.round(num('count')),
    motion: sel('motion', MOTIONS, 'linear'),
    speedCmS: num('speedCmS'),
    sizeCm: num('sizeCm'),
    direction: sel('direction', ['cw', 'ccw'] as const, 'cw'),
    timeLimitS: num('timeLimitS'),
    sound: sel('sound', ['no', 'yes'] as const, 'no'),
  };
}

/** Toleranz für die ungenaue Fingerberührung (cm), zusätzlich zum Kästchen */
export const SLACK_CM = 0.3;
/** Kleinste halbe Kantenlänge des Trefferbereichs in Pixeln (Touch-Ziele ≥ 24 px) */
export const MIN_HIT_PX = 24;
/** Zweiter Tipp auf dieselbe Stelle so kurz danach: ignoriert */
export const DOUBLE_TAP_MS = 250;
/** Zeitschritt höchstens (s), z. B. nach einer Pause des Browsers */
export const MAX_STEP_S = 0.25;
/** Schnellmodus (?quick=1): Anzahl der Ziele und längste Dauer in Sekunden */
export const QUICK_COUNT = 4;
export const QUICK_MAX_S = 25;
/** Breite eines Zeichens relativ zur Zeichenhöhe (Kästchenbreite = Zeichen × Faktor) */
export const CHAR_W = 0.32;

const LETTER_POOL = 'ABCDEFGHIJKLMNOPRSTUVWZ'.split('');

export interface OrderEnv {
  rng: Rng;
  /** Feldgröße in cm */
  fieldWcm: number;
  fieldHcm: number;
  /** Kleinste halbe Trefferkante in cm (z. B. 24 px ÷ px/cm); Standard 0 */
  minHitHalfCm?: number;
}

export interface Item {
  id: number;
  label: string;
  /** Sortierschlüssel (Zahl oder Text) */
  key: number | string;
  /** halbe Breite/Höhe des Kästchens in cm */
  hw: number;
  hh: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Winkel auf der Bahn (Bogenmaß) */
  theta: number;
  done: boolean;
}

export interface OrderTrial {
  nr: number;
  label: string;
  /** Zeit seit dem vorigen richtigen Ziel (bzw. dem Start) in ms */
  msSincePrev: number;
  /** falsche Ziele zwischen dem vorigen und diesem */
  wrongBefore: number;
}

export type OrderTap =
  | { type: 'hit'; label: string; item: Item }
  | { type: 'wrong'; expected: string; item: Item }
  | { type: 'stray' }
  /** Doppeltipp auf dieselbe Stelle: ohne Wirkung */
  | { type: 'ignored' }
  | null;

export interface OrderSummary {
  /** richtig berührte Ziele */
  solved: number;
  count: number;
  /** Gesamtzeit in ms (bis zum letzten Ziel bzw. zum Zeitlimit); null, wenn nicht beendet */
  totalMs: number | null;
  wrong: number;
  stray: number;
  tMeanMs: number | null;
  tSdMs: number | null;
  /** alle Ziele geschafft (nicht durch das Zeitlimit beendet) */
  complete: boolean;
  trials: OrderTrial[];
}

/** Auf `d` Nachkommastellen runden; nicht endliche Werte → null */
export function round(x: number | null | undefined, d = 1): number | null {
  if (x === null || x === undefined || !Number.isFinite(x)) return null;
  const f = 10 ** d;
  return Math.round(x * f) / f;
}

function compareKeys(a: number | string, b: number | string): number {
  return typeof a === 'number' && typeof b === 'number' ? a - b : String(a).localeCompare(String(b), 'de');
}

interface Content1 {
  label: string;
  key: number | string;
}

/** Inhalt der Ziele (verschieden, eindeutig sortierbar) */
export function makeContent(content: Content, count: number, rng: Rng): Content1[] {
  const out: Content1[] = [];
  const n = Math.max(1, Math.round(count));
  if (content === 'numbers' || content === 'numbers_desc') {
    for (let i = 1; i <= n; i++) out.push({ label: String(i), key: content === 'numbers' ? i : -i });
  } else if (content === 'letters') {
    for (const c of rng.shuffle([...LETTER_POOL]).slice(0, n)) out.push({ label: c, key: c });
  } else if (content === 'words') {
    for (const w of rng.shuffle([...WOERTER]).slice(0, n)) out.push({ label: w, key: w });
  } else {
    const seen = new Set<number>();
    const mul = content === 'products';
    let guard = 0;
    while (out.length < n && guard++ < 5000) {
      const lo = 2;
      const hi = mul ? 9 : 30;
      const a = lo + rng.int(hi - lo + 1);
      const b = lo + rng.int(hi - lo + 1);
      const res = mul ? a * b : a + b;
      if (seen.has(res)) continue;
      seen.add(res);
      out.push({ label: `${a}${mul ? '×' : '+'}${b}`, key: res });
    }
  }
  return out;
}

/**
 * Zeichenhöhe in cm, die in das Feld passt: das längste Kästchen höchstens 90 % der Feldbreite, das Kästchen höchstens
 * 40 % der Feldhöhe – aber nie kleiner als ein Touch-Ziel (`minCm` = Kantenlänge in cm, z. B. 48 px).
 */
export function fitSizeCm(sizeCm: number, maxLabelLen: number, fieldWcm: number, fieldHcm: number, minCm = 0): number {
  const wFactor = Math.max(1, maxLabelLen * CHAR_W * 2); // Kästchenbreite / Zeichenhöhe, mindestens 1
  const byW = (0.9 * fieldWcm) / wFactor;
  const byH = 0.4 * fieldHcm;
  return Math.max(Math.min(sizeCm, byW, byH), Math.min(minCm, sizeCm));
}

/** Dreieckswelle: spiegelt `v` in [lo, hi] (Abprall) */
function reflect(v: number, lo: number, hi: number): number {
  if (hi <= lo) return (lo + hi) / 2;
  const span = hi - lo;
  const m = (((v - lo) % (2 * span)) + 2 * span) % (2 * span);
  return lo + (m <= span ? m : 2 * span - m);
}

/** Reine Spiellogik. */
export class OrderSession {
  readonly p: OrderParams;
  fieldW: number;
  fieldH: number;
  items: Item[];
  /** Reihenfolge der Item-IDs, wie sie berührt werden müssen */
  order: number[];
  next = 0;
  wrong = 0;
  stray = 0;
  trials: OrderTrial[] = [];
  startedAt: number | null = null;
  endedAt: number | null = null;
  finished = false;
  /** Bahn (nur Kreis/Ellipse) */
  cx = 0;
  cy = 0;
  rx = 0;
  ry = 0;
  omega = 0;
  /** aktuelle (begrenzte) Zeichenhöhe in cm */
  sizeCm: number;
  private last: number | null = null;
  private lastCorrectAt: number | null = null;
  private wrongSince = 0;
  private lastTap: { x: number; y: number; t: number } | null = null;
  private readonly rng: Rng;
  private readonly minHitHalf: number;
  private readonly baseSize: number;

  constructor(p: OrderParams, env: OrderEnv) {
    this.p = p;
    this.rng = env.rng;
    this.fieldW = env.fieldWcm;
    this.fieldH = env.fieldHcm;
    this.minHitHalf = env.minHitHalfCm ?? 0;
    this.baseSize = p.sizeCm;
    const content = makeContent(p.content, p.count, this.rng);
    const maxLen = Math.max(...content.map((c) => c.label.length));
    this.sizeCm = fitSizeCm(p.sizeCm, maxLen, this.fieldW, this.fieldH, this.minHitHalf * 2);
    this.items = content.map((c, i) => ({ id: i, label: c.label, key: c.key, hw: 0, hh: 0, x: 0, y: 0, vx: 0, vy: 0, theta: 0, done: false }));
    this.applySize();
    this.order = this.items
      .slice()
      .sort((a, b) => compareKeys(a.key, b.key))
      .map((it) => it.id);
    this.layout();
  }

  private applySize(): void {
    const s = this.sizeCm;
    for (const it of this.items) {
      it.hw = Math.max(s / 2, (it.label.length * s * CHAR_W));
      it.hh = s / 2;
    }
  }

  private recomputeSize(): void {
    const maxLen = Math.max(...this.items.map((i) => i.label.length));
    this.sizeCm = fitSizeCm(this.baseSize, maxLen, this.fieldW, this.fieldH, this.minHitHalf * 2);
    this.applySize();
  }

  private layout(): void {
    const { items, rng } = this;
    const p = this.p;
    if (p.motion === 'linear') {
      items.forEach((it, idx) => {
        let best = { x: it.hw, y: it.hh };
        let bestD = -1;
        for (let t = 0; t < 40; t++) {
          const x = it.hw + rng.next() * Math.max(0, this.fieldW - 2 * it.hw);
          const y = it.hh + rng.next() * Math.max(0, this.fieldH - 2 * it.hh);
          let d = Infinity;
          for (let j = 0; j < idx; j++) d = Math.min(d, Math.hypot(x - items[j].x, y - items[j].y));
          if (d > bestD) {
            bestD = d;
            best = { x, y };
          }
        }
        it.x = best.x;
        it.y = best.y;
        const a = rng.next() * Math.PI * 2;
        it.vx = Math.cos(a) * p.speedCmS;
        it.vy = Math.sin(a) * p.speedCmS;
      });
    } else {
      this.setOrbit();
      const shuffled = rng.shuffle(items.map((i) => i.id));
      shuffled.forEach((id, k) => {
        items[id].theta = (k * 2 * Math.PI) / items.length;
      });
      for (const it of items) this.place(it);
    }
  }

  /** Bahnmaße aus Feld und Kästchengröße */
  private setOrbit(): void {
    const maxHw = Math.max(...this.items.map((i) => i.hw));
    const maxHh = this.items[0].hh;
    this.cx = this.fieldW / 2;
    this.cy = this.fieldH / 2;
    let rx = Math.max(1, this.fieldW / 2 - maxHw - 0.5);
    let ry = Math.max(1, this.fieldH / 2 - maxHh - 0.5);
    if (this.p.motion === 'circle') rx = ry = Math.min(rx, ry);
    this.rx = rx;
    this.ry = ry;
    this.omega = (this.p.speedCmS / ((rx + ry) / 2)) * (this.p.direction === 'ccw' ? -1 : 1);
  }

  private place(it: Item): void {
    it.x = this.cx + this.rx * Math.cos(it.theta);
    it.y = this.cy + this.ry * Math.sin(it.theta);
  }

  /**
   * Feld hat sich geändert (Tablet gedreht): Kästchengröße, Bahn und Lage werden angepasst, die Reihenfolge der Ziele
   * auf der Bahn bleibt.
   */
  setField(wCm: number, hCm: number): void {
    this.fieldW = wCm;
    this.fieldH = hCm;
    this.recomputeSize();
    if (this.p.motion === 'linear') {
      for (const it of this.items) {
        const minX = Math.min(it.hw, this.fieldW / 2);
        const maxX = Math.max(this.fieldW - it.hw, this.fieldW / 2);
        const minY = Math.min(it.hh, this.fieldH / 2);
        const maxY = Math.max(this.fieldH - it.hh, this.fieldH / 2);
        it.x = Math.min(maxX, Math.max(minX, it.x));
        it.y = Math.min(maxY, Math.max(minY, it.y));
      }
    } else {
      this.setOrbit();
      for (const it of this.items) this.place(it);
    }
  }

  start(now: number): void {
    this.startedAt = now;
    this.last = now;
    this.lastCorrectAt = now;
  }

  expected(): Item | null {
    return this.next < this.order.length ? this.items[this.order[this.next]] : null;
  }

  /** Zeit seit dem Start in ms (0 vor dem Start) */
  elapsedMs(now: number): number {
    return this.startedAt === null ? 0 : Math.max(0, now - this.startedAt);
  }

  /** Verbleibende Sekunden bis zum Zeitlimit; null ohne Limit */
  remainingS(now: number): number | null {
    if (this.p.timeLimitS <= 0) return null;
    return Math.max(0, this.p.timeLimitS - this.elapsedMs(now) / 1000);
  }

  /** Lage eines Ziels `ms` Millisekunden später (ohne den Zustand zu ändern) */
  positionAfter(it: Item, ms: number): { x: number; y: number } {
    const s = ms / 1000;
    if (this.p.motion === 'linear') {
      return {
        x: reflect(it.x + it.vx * s, it.hw, this.fieldW - it.hw),
        y: reflect(it.y + it.vy * s, it.hh, this.fieldH - it.hh),
      };
    }
    const th = it.theta + this.omega * s;
    return { x: this.cx + this.rx * Math.cos(th), y: this.cy + this.ry * Math.sin(th) };
  }

  /** Pro Bild aufrufen: Ziele bewegen, Zeitlimit prüfen */
  update(now: number): void {
    if (this.startedAt === null || this.finished || this.last === null) return;
    const dt = Math.min(MAX_STEP_S, Math.max(0, (now - this.last) / 1000));
    this.last = now;
    const W = this.fieldW;
    const H = this.fieldH;
    for (const it of this.items) {
      if (it.done) continue;
      if (this.p.motion === 'linear') {
        it.x += it.vx * dt;
        it.y += it.vy * dt;
        if (it.x < it.hw) {
          it.x = 2 * it.hw - it.x;
          it.vx = -it.vx;
        }
        if (it.x > W - it.hw) {
          it.x = 2 * (W - it.hw) - it.x;
          it.vx = -it.vx;
        }
        if (it.y < it.hh) {
          it.y = 2 * it.hh - it.y;
          it.vy = -it.vy;
        }
        if (it.y > H - it.hh) {
          it.y = 2 * (H - it.hh) - it.y;
          it.vy = -it.vy;
        }
        // Feld kleiner als das Kästchen: in der Mitte halten statt zu pendeln
        if (W - it.hw < it.hw) it.x = W / 2;
        if (H - it.hh < it.hh) it.y = H / 2;
      } else {
        it.theta += this.omega * dt;
        this.place(it);
      }
    }
    if (this.p.timeLimitS > 0 && now - this.startedAt >= this.p.timeLimitS * 1000) this.finish(now);
  }

  finish(now: number): void {
    if (this.finished) return;
    this.finished = true;
    this.endedAt = now;
  }

  /** Halbe Trefferkante (Breite/Höhe) eines Ziels in cm */
  hitHalf(it: Item): { hw: number; hh: number } {
    return { hw: Math.max(it.hw, this.minHitHalf) + SLACK_CM, hh: Math.max(it.hh, this.minHitHalf) + SLACK_CM };
  }

  /** Tipp bei (x, y) in cm zur Zeit `now`; null = Sitzung läuft nicht */
  tap(x: number, y: number, now: number): OrderTap {
    if (this.startedAt === null || this.finished) return null;
    const lt = this.lastTap;
    if (lt && now - lt.t >= 0 && now - lt.t < DOUBLE_TAP_MS && Math.hypot(x - lt.x, y - lt.y) <= 1.2 + this.minHitHalf) {
      return { type: 'ignored' };
    }
    let hit: Item | null = null;
    let bestD = Infinity;
    for (const it of this.items) {
      if (it.done) continue;
      const h = this.hitHalf(it);
      if (Math.abs(x - it.x) <= h.hw && Math.abs(y - it.y) <= h.hh) {
        const d = Math.hypot(x - it.x, y - it.y);
        if (d < bestD) {
          bestD = d;
          hit = it;
        }
      }
    }
    this.lastTap = { x, y, t: now };
    if (!hit) {
      this.stray++;
      return { type: 'stray' };
    }
    const exp = this.expected()!;
    if (hit.id !== exp.id) {
      this.wrong++;
      this.wrongSince++;
      return { type: 'wrong', expected: exp.label, item: hit };
    }
    hit.done = true;
    this.trials.push({ nr: this.next + 1, label: hit.label, msSincePrev: Math.round(now - (this.lastCorrectAt ?? now)), wrongBefore: this.wrongSince });
    this.wrongSince = 0;
    this.lastCorrectAt = now;
    this.next++;
    if (this.next >= this.order.length) this.finish(now);
    return { type: 'hit', label: hit.label, item: hit };
  }

  summary(): OrderSummary {
    const times = this.trials.map((t) => t.msSincePrev);
    const total = this.endedAt !== null && this.startedAt !== null ? this.endedAt - this.startedAt : null;
    return {
      solved: this.trials.length,
      count: this.items.length,
      totalMs: total === null ? null : Math.round(total),
      wrong: this.wrong,
      stray: this.stray,
      tMeanMs: times.length ? round(mean(times), 0) : null,
      tSdMs: times.length >= 2 ? round(sd(times), 0) : null,
      complete: this.trials.length >= this.items.length,
      trials: this.trials.slice(),
    };
  }
}

/**
 * Persönlicher Tipp nach dem Durchlauf (Schlüssel in `texts.tips`). Eigene Faustregeln der App, keine Normwerte:
 * Zeitlimit erreicht → leichter einstellen; viele falsche Ziele → erst suchen, dann tippen; viele Fehltipps → genauer
 * zielen; ohne Fehler fertig → genau eine Einstellung schwerer; stark schwankende Zeiten → einzelne Ziele schwer zu finden.
 */
export function tipFor(s: OrderSummary): string {
  if (s.solved === 0) return 'few';
  if (!s.complete) return 'timeout';
  if (s.wrong >= 3 && s.wrong >= 0.4 * s.count) return 'wrong';
  if (s.stray >= 3 && s.stray >= 0.4 * s.count) return 'stray';
  if (s.wrong === 0 && s.stray <= 1 && s.count >= 5) return 'harder';
  if (s.tMeanMs !== null && s.tSdMs !== null && s.solved >= 5 && s.tSdMs > 0.8 * s.tMeanMs) return 'steady';
  return 'compare';
}

/** Punkte (nur Motivation, nicht Teil der Messung): 10 je richtigem Ziel */
export function pointsFor(solved: number): number {
  return Math.max(0, Math.round(solved)) * 10;
}
