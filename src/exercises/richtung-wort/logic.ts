/**
 * Richtung & Wort – reine Logik (ohne Canvas), damit sie per vitest prüfbar ist.
 *
 * Aufgabe: Oben zeigt ein Zeichen eine Richtung (Pfeil im Kasten, Schrägpfeil in blauer Scheibe,
 * Dreieck mit Kurve). Unten liegen vier Felder in Kreuzanordnung (oben, rechts, unten, links), jedes
 * trägt ein Wort (OBEN, RECHTS, UNTEN, LINKS). Man tippt das Feld, dessen WORT die Richtung nennt.
 *
 * Wissenschaftlicher Kern (für die Stufen):
 * - Reiz–Antwort-Kompatibilität (Fitts & Seeger, 1953): Steht das Wort an seiner Lage (oben „OBEN“),
 *   ist die Zuordnung kompatibel und schnell. Stehen Wörter anderswo, konkurrieren Lage und Wort
 *   (räumlicher Stroop-/Simon-Konflikt, Lu & Proctor, 1995); Lesen läuft automatisch mit
 *   (Stroop, 1935; MacLeod, 1991). Das ist die eigentliche Schwierigkeit – Zeitdruck kommt erst ganz
 *   am Schluss (Stufe 10–12, weich).
 * - Deshalb baut die Stufenleiter die Kompatibilität schrittweise ab: Stufe 1–3 alle Wörter an der
 *   passenden Lage, 4–6 nur ein Paar vertauscht, 7–12 alle gemischt (nie die kompatible Anordnung).
 *   Danach erst Zeichenvielfalt (Schrägpfeil ab 5, Kurve ab 7) und die Antwortfrist (ab 10).
 * - Als Zusatzwerte nur Vergleiche mit sich selbst: Mehrzeit bei vertauschter Lage („Lage-Kosten“),
 *   Lage-Fehler (Feld dort getippt, wohin das Zeichen zeigt, trägt aber ein anderes Wort) und
 *   Achsenfehler (Wort der anderen Achse, z. B. „UNTEN“ statt „LINKS“ beim Schrägpfeil).
 */
import type { Rng } from '../../core/rng';
import { clamp, mean } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 12;
/** Durchgänge je Runde (je ein Tipp) */
export const TRIALS = 20;
export const QUICK_TRIALS = 4;
/** Antworten schneller als das nach Reizbeginn sind Vorwegnehmen, keine Antwort */
export const MIN_RT_MS = 150;
/** Nach einer Antwort werden weitere Taps (Doppeltipp) so lange ignoriert */
export const DOUBLE_TAP_MS = 350;
/** Ohne Frist (Stufe 1–9) geht es nach dieser Zeit ohne Strafe weiter */
export const IDLE_CAP_MS = 20000;
/** Mindestanzahl richtiger Antworten je Lage-Art, damit „Lage-Kosten“ ausgewiesen werden */
export const MIN_PER_KIND = 3;

// ---------------------------------------------------------------------------
// Richtungen, Zeichen

/** Richtungen im Uhrzeigersinn: 0 oben, 1 rechts, 2 unten, 3 links – zugleich Feld-Plätze und Wörter */
export type Dir = 0 | 1 | 2 | 3;
export const UP: Dir = 0;
export const RIGHT: Dir = 1;
export const DOWN: Dir = 2;
export const LEFT: Dir = 3;
export const DIRS: readonly Dir[] = [UP, RIGHT, DOWN, LEFT];
/** Nur links/rechts sind Antworten bei Schrägpfeil und Kurve */
export const SIDE_DIRS: readonly Dir[] = [RIGHT, LEFT];

export type Axis = 'v' | 'h';
export const axisOf = (d: Dir): Axis => (d % 2 === 0 ? 'v' : 'h');

/** Einheitsvektor einer Richtung in Bildkoordinaten (x nach rechts, y nach unten) */
export function dirVector(d: Dir): { x: number; y: number } {
  return d === UP ? { x: 0, y: -1 } : d === RIGHT ? { x: 1, y: 0 } : d === DOWN ? { x: 0, y: 1 } : { x: -1, y: 0 };
}

/** Drehwinkel (Grad, im Uhrzeigersinn) für einen nach oben gezeichneten Pfeil */
export const dirAngleDeg = (d: Dir): number => d * 90;

/** Zeichenfamilien: Pfeil im Kasten · Schrägpfeil in blauer Scheibe · Dreieck mit Kurve */
export type SignKind = 'box' | 'disc' | 'curve';

export interface Sign {
  kind: SignKind;
  /** Richtung, deren Wort getippt werden muss (Schrägpfeil und Kurve: nur RIGHT/LEFT) */
  answer: Dir;
  /** Kasten: dunkel statt hell */
  dark: boolean;
  /** Kasten: quadratisch statt lang gestreckt */
  square: boolean;
  /** Schrägpfeil: zeigt schräg nach unten (sonst nach oben) */
  down: boolean;
}

/** Winkel (Grad im Uhrzeigersinn ab „nach oben“) des Schrägpfeils: ↗ 45, ↘ 135, ↙ 225, ↖ 315 */
export function diagAngleDeg(s: Pick<Sign, 'answer' | 'down'>): number {
  const right = s.answer === RIGHT;
  if (right) return s.down ? 135 : 45;
  return s.down ? 225 : 315;
}

/** Richtung, in die das Zeichen sichtbar zeigt (Schrägpfeil: Einheitsvektor der Diagonale) */
export function signVector(s: Sign): { x: number; y: number } {
  if (s.kind !== 'disc') return dirVector(s.answer);
  const a = (diagAngleDeg(s) * Math.PI) / 180;
  return { x: Math.sin(a), y: -Math.cos(a) };
}

// ---------------------------------------------------------------------------
// Anordnung der Wörter

/** words[platz] = Wort (als Richtung), das auf dem Feld an diesem Platz steht */
export type Words = Dir[];
export type LayoutMode = 'identity' | 'swap' | 'mixed';

export const IDENTITY: Words = [UP, RIGHT, DOWN, LEFT];

export function fixedPoints(words: readonly number[]): number {
  let n = 0;
  for (let i = 0; i < words.length; i++) if (words[i] === i) n++;
  return n;
}

/** Art einer Anordnung: alles an der Lage · genau ein Paar vertauscht · mindestens drei Wörter verschoben */
export function layoutModeOf(words: readonly number[]): LayoutMode {
  const fp = fixedPoints(words);
  return fp === 4 ? 'identity' : fp === 2 ? 'swap' : 'mixed';
}

const sameWords = (a: readonly number[], b: readonly number[]) => a.length === b.length && a.every((v, i) => v === b[i]);

export function isPermutation(words: readonly number[]): boolean {
  return words.length === 4 && [0, 1, 2, 3].every((d) => words.includes(d));
}

/** Neue Anordnung der gewünschten Art; unterscheidet sich (wo möglich) von der vorherigen */
export function makeLayout(rng: Pick<Rng, 'int' | 'shuffle'>, mode: LayoutMode, prev?: readonly number[] | null): Words {
  if (mode === 'identity') return [...IDENTITY];
  for (let i = 0; i < 60; i++) {
    let cand: Words;
    if (mode === 'swap') {
      const a = rng.int(4);
      const b = (a + 1 + rng.int(3)) % 4;
      cand = [...IDENTITY];
      [cand[a], cand[b]] = [cand[b], cand[a]];
    } else {
      cand = rng.shuffle([...IDENTITY]);
      if (fixedPoints(cand) > 1) continue;
    }
    if (prev && sameWords(cand, prev)) continue;
    return cand;
  }
  // Notausgang (praktisch nie): feste, gültige Anordnung der Art
  return mode === 'swap' ? [RIGHT, UP, DOWN, LEFT] : [RIGHT, DOWN, LEFT, UP];
}

// ---------------------------------------------------------------------------
// Stufenleiter

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

export interface LevelSpec {
  layout: LayoutMode;
  /** Durchgänge, in denen eine Anordnung stehen bleibt (0 = wechselt unvorhersehbar) */
  block: number;
  /** Zeichenfamilien mit Gewicht */
  kinds: ReadonlyArray<readonly [SignKind, number]>;
  /** Wie viele Kasten-Aussehen (hell/lang, dunkel/lang, hell/quadratisch, dunkel/quadratisch) */
  looks: 1 | 2 | 4;
  /** Schrägpfeil auch nach oben (sonst nur schräg nach unten wie im Vorbild) */
  upDiag: boolean;
  /** Antwortfrist in ms (null = keine) */
  deadlineMs: number | null;
  /** Wahrscheinlichkeit, bei gemischter Anordnung ein an der Lage gebliebenes Wort zu verlangen */
  pHome: number;
}

const B: ReadonlyArray<readonly [SignKind, number]> = [['box', 1]];

const SPECS: Record<number, LevelSpec> = {
  1: { layout: 'identity', block: 0, kinds: B, looks: 1, upDiag: false, deadlineMs: null, pHome: 0 },
  2: { layout: 'identity', block: 0, kinds: B, looks: 2, upDiag: false, deadlineMs: null, pHome: 0 },
  3: { layout: 'identity', block: 0, kinds: B, looks: 4, upDiag: false, deadlineMs: null, pHome: 0 },
  4: { layout: 'swap', block: 4, kinds: B, looks: 4, upDiag: false, deadlineMs: null, pHome: 0 },
  5: { layout: 'swap', block: 4, kinds: [['box', 0.7], ['disc', 0.3]], looks: 4, upDiag: false, deadlineMs: null, pHome: 0 },
  6: { layout: 'swap', block: 3, kinds: [['box', 0.6], ['disc', 0.4]], looks: 4, upDiag: false, deadlineMs: null, pHome: 0 },
  7: { layout: 'mixed', block: 3, kinds: [['box', 0.5], ['disc', 0.3], ['curve', 0.2]], looks: 4, upDiag: false, deadlineMs: null, pHome: 0.3 },
  8: { layout: 'mixed', block: 2, kinds: [['box', 0.4], ['disc', 0.3], ['curve', 0.3]], looks: 4, upDiag: true, deadlineMs: null, pHome: 0.3 },
  9: { layout: 'mixed', block: 2, kinds: [['box', 0.34], ['disc', 0.33], ['curve', 0.33]], looks: 4, upDiag: true, deadlineMs: null, pHome: 0.3 },
  10: { layout: 'mixed', block: 0, kinds: [['box', 0.34], ['disc', 0.33], ['curve', 0.33]], looks: 4, upDiag: true, deadlineMs: 5000, pHome: 0.3 },
  11: { layout: 'mixed', block: 0, kinds: [['box', 0.34], ['disc', 0.33], ['curve', 0.33]], looks: 4, upDiag: true, deadlineMs: 4000, pHome: 0.3 },
  12: { layout: 'mixed', block: 0, kinds: [['box', 0.34], ['disc', 0.33], ['curve', 0.33]], looks: 4, upDiag: true, deadlineMs: 3000, pHome: 0.3 },
};

export const specFor = (level: number): LevelSpec => SPECS[levelOf(level)];

/** Wahrscheinlichkeit, dass die Anordnung vor einem Durchgang wechselt, wenn sie unvorhersehbar wechselt (Stufe 10–12) */
export const P_CHANGE = 0.75;

// ---------------------------------------------------------------------------
// Durchgänge planen

export interface Trial {
  sign: Sign;
  /** Wörter je Feld-Platz */
  words: Words;
  /** Platz des Felds, dessen Wort richtig ist */
  targetSlot: Dir;
  /** Das richtige Wort steht an seiner passenden Lage (targetSlot === Richtung) */
  compat: boolean;
  /** Dieser Durchgang bringt eine neue Anordnung */
  newLayout: boolean;
}

export const allowedAnswers = (kind: SignKind): readonly Dir[] => (kind === 'box' ? DIRS : SIDE_DIRS);

function pickKind(rng: Pick<Rng, 'next'>, kinds: LevelSpec['kinds']): SignKind {
  const total = kinds.reduce((s, [, w]) => s + w, 0);
  let x = rng.next() * total;
  for (const [k, w] of kinds) {
    x -= w;
    if (x < 0) return k;
  }
  return kinds[kinds.length - 1][0];
}

const sameSign = (a: Sign, b: Sign) =>
  a.kind === b.kind && a.answer === b.answer && a.dark === b.dark && a.square === b.square && a.down === b.down;

export class TrialPlanner {
  private words: Words | null = null;
  private mode: LayoutMode | null = null;
  private age = 0;
  private recent: Sign[] = [];

  constructor(private readonly rng: Rng) {}

  /** Nächster Durchgang für die aktuelle Stufe */
  next(level: number): Trial {
    const rng = this.rng;
    const spec = specFor(level);
    const need =
      this.words === null ||
      this.mode !== spec.layout ||
      (spec.layout !== 'identity' && (spec.block > 0 ? this.age >= spec.block : rng.chance(P_CHANGE)));
    if (need) {
      this.words = makeLayout(rng, spec.layout, this.mode === spec.layout ? this.words : null);
      this.mode = spec.layout;
      this.age = 0;
    }
    this.age++;
    const words = [...(this.words as Words)];

    let sign: Sign | null = null;
    for (let i = 0; i < 40 && !sign; i++) {
      const cand = this.drawSign(spec, words);
      const last = this.recent[this.recent.length - 1];
      const prev = this.recent[this.recent.length - 2];
      if (last && sameSign(cand, last)) continue;
      if (last && prev && cand.answer === last.answer && cand.answer === prev.answer) continue;
      sign = cand;
    }
    if (!sign) sign = this.drawSign(spec, words);
    this.recent.push(sign);
    if (this.recent.length > 3) this.recent.shift();

    const targetSlot = words.indexOf(sign.answer) as Dir;
    return { sign, words, targetSlot, compat: targetSlot === sign.answer, newLayout: need };
  }

  private drawSign(spec: LevelSpec, words: Words): Sign {
    const rng = this.rng;
    const kind = pickKind(rng, spec.kinds);
    const allowed = allowedAnswers(kind);
    let answer = rng.pick(allowed);
    if (spec.pHome > 0 && rng.chance(spec.pHome)) {
      const home = allowed.filter((d) => words[d] === d);
      if (home.length) answer = rng.pick(home);
    }
    const look = kind === 'box' ? rng.int(spec.looks) : 0;
    return {
      kind,
      answer,
      dark: kind === 'box' && (look & 1) === 1,
      square: kind === 'box' && (look >> 1) === 1,
      down: kind === 'disc' && (spec.upDiag ? rng.chance(0.5) : true),
    };
  }
}

// ---------------------------------------------------------------------------
// Antwort bewerten

export interface TapEval {
  correct: boolean;
  /** Wort auf dem getippten Feld */
  word: Dir;
  /** Lage-Fehler: getippt wurde das Feld dort, wohin das Zeichen zeigt – es trägt aber ein anderes Wort */
  positionError: boolean;
  /** Achsenfehler: getipptes Wort liegt auf der anderen Achse als das richtige (z. B. UNTEN statt LINKS) */
  axisError: boolean;
}

export function evaluateTap(trial: Pick<Trial, 'sign' | 'words'>, slot: number): TapEval {
  const word = trial.words[slot];
  const correct = word === trial.sign.answer;
  return {
    correct,
    word,
    positionError: !correct && slot === trial.sign.answer,
    axisError: !correct && axisOf(word) !== axisOf(trial.sign.answer),
  };
}

// ---------------------------------------------------------------------------
// Kennwerte

export interface TrialLog {
  /** richtig getippt */
  ok: boolean;
  /** Frist (oder Leerlauf-Grenze) überschritten */
  slow: boolean;
  /** Zeit bis zum Tipp in ms (nur sinnvoll bei ok) */
  rt: number;
  /** Wort stand an passender Lage */
  compat: boolean;
  positionError: boolean;
  axisError: boolean;
}

export interface Stats {
  trials: number;
  hits: number;
  wrong: number;
  slow: number;
  /** Anteil richtiger Antworten in % */
  accuracy: number;
  /** Ø Zeit richtiger Antworten (ms), NaN ohne Treffer */
  meanRt: number;
  /** Ø Zeit richtig bei Wort an passender Lage / bei abweichender Lage (NaN ohne Treffer) */
  meanCompat: number;
  meanMismatch: number;
  nCompat: number;
  nMismatch: number;
  /**
   * Lage-Kosten = Ø Zeit abweichend − Ø Zeit passend (NaN, wenn eine Art weniger als MIN_PER_KIND Treffer hat).
   * Gemittelt über die ganze Runde (auch über Stufenwechsel hinweg), daher nur als Vergleich mit früheren
   * Runden auf demselben Gerät gedacht – keine Messung im Sinne eines Laborwerts.
   */
  positionCost: number;
  positionErrors: number;
  axisErrors: number;
}

export function computeStats(log: readonly TrialLog[], early = 0): Stats & { early: number } {
  const hitsLog = log.filter((l) => l.ok);
  const compat = hitsLog.filter((l) => l.compat).map((l) => l.rt);
  const mismatch = hitsLog.filter((l) => !l.compat).map((l) => l.rt);
  const meanCompat = compat.length ? mean(compat) : NaN;
  const meanMismatch = mismatch.length ? mean(mismatch) : NaN;
  const trials = log.length;
  return {
    trials,
    hits: hitsLog.length,
    wrong: log.filter((l) => !l.ok && !l.slow).length,
    slow: log.filter((l) => l.slow).length,
    accuracy: trials ? (100 * hitsLog.length) / trials : 0,
    meanRt: hitsLog.length ? mean(hitsLog.map((l) => l.rt)) : NaN,
    meanCompat,
    meanMismatch,
    nCompat: compat.length,
    nMismatch: mismatch.length,
    positionCost: compat.length >= MIN_PER_KIND && mismatch.length >= MIN_PER_KIND ? meanMismatch - meanCompat : NaN,
    positionErrors: log.filter((l) => l.positionError).length,
    axisErrors: log.filter((l) => l.axisError).length,
    early,
  };
}

/** Punkte je richtiger Antwort: Grundwert steigt mit der Stufe, kleiner Bonus für zügige Antwort */
export function pointsFor(level: number, rtMs: number): number {
  const frac = clamp(1 - rtMs / 4000, 0, 1);
  return 10 + 2 * (levelOf(level) - 1) + Math.round(frac * 5);
}

/** Schlüssel in texts.tips: early | position | axis | slow | great */
export function tipFor(s: Pick<Stats, 'wrong' | 'slow' | 'positionErrors' | 'axisErrors'> & { early: number }): string {
  if (s.early >= 3 && s.early >= s.wrong) return 'early';
  if (s.positionErrors >= 2 && s.positionErrors >= s.axisErrors) return 'position';
  if (s.axisErrors >= 2) return 'axis';
  if (s.slow >= 2) return 'slow';
  return 'great';
}

// ---------------------------------------------------------------------------
// Farben und Kontrast (Feld: Wortfarbe auf Grün muss ≥ 4,5 : 1 haben)

export const FIELD_GREEN = '#5CBF62';
export const FIELD_INK = '#0B1F0E';

function channel(c: number): number {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

export function luminance(hex: string): number {
  const n = parseInt(hex.replace('#', '').slice(0, 6), 16);
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
}

/** Kontrastverhältnis nach WCAG (1 … 21) */
export function contrast(a: string, b: string): number {
  const x = luminance(a);
  const y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

// ---------------------------------------------------------------------------
// Geometrie: Zeichenfläche oben, Felder in Kreuzanordnung unten

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Geometry {
  /** Helle Fläche mit dem Zeichen */
  plate: Rect;
  /** Felder je Platz (0 oben, 1 rechts, 2 unten, 3 links) */
  fields: Rect[];
  /** Schrift der Wörter in px */
  wordPx: number;
  /** Kantenlänge des Zeichens in px (passt in die Fläche) */
  signSize: number;
  /** Abstand zwischen den Feldern (Trefferflächen reichen je eine halbe Lücke darüber hinaus) */
  gap: number;
  /** Kleine Bühne (Intro-Film, Handy quer): Mindestgrößen gelockert */
  small: boolean;
}

export const MIN_FIELD_H = 72;
export const MIN_WORD_PX = 30;
export const MAX_FIELD_H = 132;

export interface GeometryInput {
  w: number;
  h: number;
  /** 1 % der kürzeren Seite */
  u: number;
  /** Freier Rand unten (Intro-Film: Platz für die Bildunterschrift) */
  bottomReserve: number;
  /** Breite des längsten Worts in em (bei Fettschrift gemessen, z. B. SINISTRA ≈ 5,2) */
  wordEm: number;
}

export function geometry(inp: GeometryInput): Geometry {
  const { w, h, u, bottomReserve, wordEm } = inp;
  const m0 = clamp(w * 0.03, 8, 22);
  const g = clamp(u * 1.3, 6, 12);
  const topPad = clamp(u * 2, 8, 20);
  const bottom = h - bottomReserve;
  const availH = bottom - topPad;
  const small = availH < 560;
  const gapPlate = clamp(u * 2.5, 10, 24);
  const plateMin = small ? Math.max(96, availH * 0.38) : Math.max(120, availH * 0.34);
  const minFh = small ? 34 : MIN_FIELD_H;
  const byPlate = (availH - gapPlate - plateMin - 2 * g) / 3;
  const fh = Math.max(minFh, Math.min(availH * (small ? 0.2 : 0.15), MAX_FIELD_H, byPlate));

  const wpMin = small ? Math.min(MIN_WORD_PX, fh * 0.42) : MIN_WORD_PX;
  let wp = clamp(fh * 0.37, wpMin, 54);
  const needFor = (px: number) => px * (wordEm + 0.44);
  const cgMin = Math.max(g, 8);
  let m = m0;
  let fwMax = (w - 2 * m - cgMin) / 2;
  if (needFor(wp) > fwMax && needFor(wpMin) > fwMax) {
    // Notfall: schmalere Ränder, damit die Schrift nicht unter das Minimum fällt
    m = Math.min(m, 5);
    fwMax = (w - 2 * m - cgMin) / 2;
  }
  const fwDesired = Math.max(needFor(wp), fh * 2.2);
  const fw = Math.min(fwDesired, fwMax);
  if (needFor(wp) > fw) wp = Math.max(12, Math.min(wp, fw / (wordEm + 0.44)));

  const cross3 = 3 * fw + 2 * g;
  const Wc = Math.min(cross3, w - 2 * m);
  const x0 = (w - Wc) / 2;
  const yBottom = bottom - fh;
  const yMid = yBottom - g - fh;
  const yTop = yMid - g - fh;
  const cx = (w - fw) / 2;
  const fields: Rect[] = [
    { x: cx, y: yTop, w: fw, h: fh }, // oben
    { x: x0 + Wc - fw, y: yMid, w: fw, h: fh }, // rechts
    { x: cx, y: yBottom, w: fw, h: fh }, // unten
    { x: x0, y: yMid, w: fw, h: fh }, // links
  ];
  const plate: Rect = { x: x0, y: topPad, w: Wc, h: Math.max(40, yTop - gapPlate - topPad) };
  const signSize = Math.min(plate.h * 0.74, plate.w * 0.62, 380);
  return { plate, fields, wordPx: wp, signSize, gap: g, small };
}

/** Welches Feld liegt unter (x, y)? Die Trefferfläche reicht je eine halbe Lücke über das Feld hinaus. −1 = keines */
export function hitSlot(geo: Pick<Geometry, 'fields' | 'gap'>, x: number, y: number): number {
  const pad = geo.gap / 2;
  for (let i = 0; i < geo.fields.length; i++) {
    const f = geo.fields[i];
    if (x >= f.x - pad && x <= f.x + f.w + pad && y >= f.y - pad && y <= f.y + f.h + pad) return i;
  }
  return -1;
}
