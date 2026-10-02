/**
 * Mentale Rotation – reine Logik (aus `RotationSession` und `geometry` im Labor-Prototyp, ex/rotation.js).
 *
 * Zwei Figuren aus Quadraten stehen sich gegenüber: links die Vorlage, rechts die Vergleichsfigur. Sie ist gedreht und entweder
 * DIESELBE Figur („gleich“) oder ihr SPIEGELBILD („gespiegelt“). Zeiten in ms (virtuelle Zeit des Runners), Zufall nur über `Rng`,
 * keine Darstellung, keine Eingabe.
 *
 * Mathematik (durch Tests abgesichert, tests/unit/labor-mentale-rotation-logic.test.ts):
 * - Die Vergleichsfigur entsteht aus der Vorlage durch die lineare Abbildung `M = R(Winkel) · S`, `S` = Spiegelung an der
 *   senkrechten Achse (`diag(−1, 1)`) bei „gespiegelt“, sonst die Einheitsmatrix. `det R = +1` für jeden Winkel: Eine Drehung ändert
 *   nie die Händigkeit; `det S = −1`: Die Spiegelung ändert sie. Gezeichnet wird mit genau dieser Matrix (`transformPoint`).
 * - Eine Aufgabe ist nur eindeutig lösbar, wenn das Spiegelbild der Vorlage durch KEINE Drehung mit ihr zur Deckung kommt
 *   (chirale Figur, `isChiral`). Für Figuren aus Rasterquadraten genügen die vier Drehungen um 90°; eine Drehung um einen
 *   Winkel, der kein Vielfaches von 90° ist, kann Rasterquadrate nicht auf Rasterquadrate abbilden.
 *
 * Abweichungen vom Prototyp:
 * - Der Winkel 0° gehört zu den Aufgaben (Prototyp: nur Winkel ≥ Schrittweite): Ohne ihn hat die Einstellung „Vielfache von 90°“
 *   nur zwei verschiedene Winkelbeträge (90° und 180°) und der Anstieg der Antwortzeit wäre nie berechenbar.
 * - Winkel und „gleich/gespiegelt“ sind ausgewogen: jede Kombination aus Winkel und Art kommt (soweit die Zahl der Aufgaben reicht)
 *   gleich oft vor, nie mehr als zwei gleiche Arten hintereinander (Prototyp: zufällig).
 * - Die Figuren sind kompakt (Ausdehnung höchstens `ceil(n / 2) + 1` Quadrate), damit sie auf kleine Bühnen passen.
 * - Der Anstieg wird nur bei mindestens 6 richtigen Antworten mit mindestens 3 verschiedenen Winkelstufen berechnet, sonst
 *   weggelassen (Prototyp: ab 3 richtigen Antworten und 2 Winkeln).
 * - Die Antwortzeit läuft ab dem Anzeigen der Figuren (`beginTrial`); ein Zeitlimit zählt erst ab dann.
 */
import { mean, median } from '../../core/stats';
import type { Rng } from '../../core/rng';
import type { ExerciseParams, ParamDef } from '../../core/types';

/** Einstellungen (Standardwerte und Grenzen aus dem Prototyp); Texte in texts.ts */
export const PARAMS: readonly ParamDef[] = [
  { key: 'trials', type: 'number', unit: 'count', min: 6, max: 80, step: 2, default: 24, summary: true },
  { key: 'cells', type: 'number', unit: 'count', min: 4, max: 9, step: 1, default: 6, summary: true },
  { key: 'angles', type: 'select', default: '90', options: ['90', '45'], summary: true },
  { key: 'cellCm', type: 'number', unit: 'cm', min: 0.6, max: 3, step: 0.1, default: 1.2 },
  { key: 'timeoutS', type: 'number', unit: 's', min: 0, max: 60, step: 1, default: 0 },
];

export interface RotationParams {
  trials: number;
  cells: number;
  /** Schrittweite der Drehwinkel in Grad: 90 oder 45 */
  step: 90 | 45;
  cellCm: number;
  timeoutS: number;
}

/** Bereinigte Einstellungen (`ctx.params`) als typisiertes Objekt; fehlende Werte → Standard */
export function rotationParams(p: ExerciseParams): RotationParams {
  const num = (key: string): number => {
    const d = PARAMS.find((x) => x.key === key)!;
    const v = p[key];
    return typeof v === 'number' && Number.isFinite(v) ? v : (d.default as number);
  };
  return {
    trials: Math.round(num('trials')),
    cells: Math.round(num('cells')),
    step: p.angles === '45' ? 45 : 90,
    cellCm: num('cellCm'),
    timeoutS: num('timeoutS'),
  };
}

/** Kleinste Höhe der Antwortknöpfe (px) */
export const MIN_BUTTON_H = 64;
/** Anstieg der Antwortzeit: mindestens so viele richtige Antworten mit mindestens so vielen Winkelstufen */
export const MIN_SLOPE_POINTS = 6;
export const MIN_SLOPE_LEVELS = 3;
/** Schnellmodus (?quick=1): so viele Aufgaben */
export const QUICK_TRIALS = 4;

/** Auf `d` Nachkommastellen runden; nicht endliche Werte → null */
export function round(x: number | null | undefined, d = 1): number | null {
  if (x === null || x === undefined || !Number.isFinite(x)) return null;
  const f = 10 ** d;
  return Math.round(x * f) / f;
}

// ---------------------------------------------------------------------------
// Geometrie auf Rasterzellen (reine Funktionen)

/** Rasterzelle (x, y) */
export type Cell = readonly [number, number];

/** Verschiebt die Figur so, dass die kleinste x- und y-Koordinate 0 ist; sortiert */
export function normalize(cells: readonly Cell[]): Cell[] {
  const minx = Math.min(...cells.map((c) => c[0]));
  const miny = Math.min(...cells.map((c) => c[1]));
  return cells.map((c): Cell => [c[0] - minx, c[1] - miny]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}

/** Eindeutiger Schlüssel einer Figur bis auf Verschiebung */
export function keyOf(cells: readonly Cell[]): string {
  return normalize(cells)
    .map((c) => c.join(','))
    .join(';');
}

/** Drehung um k × 90° ((x, y) → (−y, x) je Schritt, also R(90°)ᵏ) */
export function rotate90(cells: readonly Cell[], k: number): Cell[] {
  let out: Cell[] = cells.map((c): Cell => [c[0], c[1]]);
  for (let i = 0; i < ((k % 4) + 4) % 4; i++) out = out.map((c): Cell => [-c[1], c[0]]);
  return out;
}

/** Spiegelung an der senkrechten Achse ((x, y) → (−x, y)) */
export function mirror(cells: readonly Cell[]): Cell[] {
  return cells.map((c): Cell => [-c[0], c[1]]);
}

/** Händigkeit: kleinster Schlüssel über alle vier Drehungen. Gleiche Händigkeit ⇔ gleicher Schlüssel (bis auf Drehung/Verschiebung) */
export function handKey(cells: readonly Cell[]): string {
  let best = '';
  for (let r = 0; r < 4; r++) {
    const k = keyOf(rotate90(cells, r));
    if (best === '' || k < best) best = k;
  }
  return best;
}

/** Chiral = das Spiegelbild ist durch keine Drehung mit der Figur zur Deckung zu bringen (nur dann ist die Aufgabe eindeutig) */
export function isChiral(cells: readonly Cell[]): boolean {
  const mk = keyOf(mirror(cells));
  for (let r = 0; r < 4; r++) if (keyOf(rotate90(cells, r)) === mk) return false;
  return true;
}

/** Breite und Höhe der Figur in Quadraten */
export function extentOf(cells: readonly Cell[]): { w: number; h: number } {
  const n = normalize(cells);
  return { w: Math.max(...n.map((c) => c[0])) + 1, h: Math.max(...n.map((c) => c[1])) + 1 };
}

/** Größte erlaubte Ausdehnung (Quadrate) einer Figur aus n Quadraten */
export const maxExtentFor = (n: number): number => Math.min(n, Math.ceil(n / 2) + 1);

/** Zusammenhängende, chirale Zufallsfigur aus n Quadraten (kompakt: Ausdehnung ≤ `maxExtentFor(n)`, falls möglich) */
export function randomFigure(n: number, rng: Rng): Cell[] {
  const dirs: Cell[] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  for (let attempt = 0; attempt < 1500; attempt++) {
    // nach 600 Versuchen die Kompaktheit lockern (nur wenn nötig)
    const cap = maxExtentFor(n) + (attempt >= 600 ? 1 : 0) + (attempt >= 1200 ? 1 : 0);
    const cells: Cell[] = [[0, 0]];
    const has = (x: number, y: number): boolean => cells.some((c) => c[0] === x && c[1] === y);
    let guard = 0;
    while (cells.length < n && guard++ < 300) {
      const base = rng.pick(cells);
      const d = rng.pick(dirs);
      const x = base[0] + d[0];
      const y = base[1] + d[1];
      if (!has(x, y)) cells.push([x, y]);
    }
    if (cells.length !== n) continue;
    const e = extentOf(cells);
    if (Math.max(e.w, e.h) > cap) continue;
    if (isChiral(cells)) return normalize(cells);
  }
  throw new Error('Keine passende Figur gefunden');
}

// ---------------------------------------------------------------------------
// Drehung und Spiegelung als Matrix

/** Lineare Abbildung [x'; y'] = [a b; c d] · [x; y] als [a, b, c, d] */
export type Mat = readonly [number, number, number, number];

export const IDENTITY: Mat = [1, 0, 0, 1];
/** Spiegelung an der senkrechten Achse */
export const MIRROR_X: Mat = [-1, 0, 0, 1];

/** Drehung um `deg` Grad: R(θ) = [cos −sin; sin cos]. Auf dem Bildschirm (y nach unten) ist das im Uhrzeigersinn. */
export function rotationMatrix(deg: number): Mat {
  const r = (deg * Math.PI) / 180;
  return [Math.cos(r), -Math.sin(r), Math.sin(r), Math.cos(r)];
}

export const matMul = (A: Mat, B: Mat): Mat => [
  A[0] * B[0] + A[1] * B[2],
  A[0] * B[1] + A[1] * B[3],
  A[2] * B[0] + A[3] * B[2],
  A[2] * B[1] + A[3] * B[3],
];

/** Determinante: +1 für Drehungen (Händigkeit bleibt), −1 für Spiegelungen (Händigkeit wechselt) */
export const det = (M: Mat): number => M[0] * M[3] - M[1] * M[2];

/** Abbildung der Vergleichsfigur: Drehung um `angleDeg` nach der (optionalen) Spiegelung */
export function trialMatrix(angleDeg: number, mirrored: boolean): Mat {
  return matMul(rotationMatrix(angleDeg), mirrored ? MIRROR_X : IDENTITY);
}

export function transformPoint(M: Mat, p: readonly [number, number]): [number, number] {
  return [M[0] * p[0] + M[1] * p[1], M[2] * p[0] + M[3] * p[1]];
}

/** Die vier Ecken von Rasterzelle (x, y) im Umlaufsinn (für Zeichnung und Händigkeitsprüfung) */
export function cellCorners(c: Cell): Array<[number, number]> {
  return [
    [c[0], c[1]],
    [c[0] + 1, c[1]],
    [c[0] + 1, c[1] + 1],
    [c[0], c[1] + 1],
  ];
}

/** Vorzeichenbehaftete Fläche eines Vielecks (Schnürsenkelformel): ändert bei einer Spiegelung das Vorzeichen, bei Drehung nie */
export function signedArea(poly: ReadonlyArray<readonly [number, number]>): number {
  let a = 0;
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i];
    const q = poly[(i + 1) % poly.length];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return a / 2;
}

/**
 * Die Vielecke (je Quadrat vier Ecken) der Figur nach der Abbildung `M`, um den Mittelpunkt des Umschlagsrechtecks der Figur
 * gedreht/gespiegelt; Einheit: Quadrate, Ursprung = Mittelpunkt der Figur.
 */
export function figurePolygons(cells: readonly Cell[], M: Mat): Array<Array<[number, number]>> {
  const e = extentOf(cells);
  const n = normalize(cells);
  return n.map((c) => cellCorners(c).map(([x, y]) => transformPoint(M, [x - e.w / 2, y - e.h / 2])));
}

/** Größter Abstand einer Ecke vom Mittelpunkt der Figur (Quadrate): bestimmt, wie viel Platz die gedrehte Figur braucht */
export function figureRadius(cells: readonly Cell[]): number {
  let r = 0;
  for (const poly of figurePolygons(cells, IDENTITY)) for (const [x, y] of poly) r = Math.max(r, Math.hypot(x, y));
  return r;
}

/** Winkelbetrag 0..180 für die Auswertung */
export function foldAngle(a: number): number {
  const x = ((a % 360) + 360) % 360;
  return x > 180 ? 360 - x : x;
}

/** Steigung der Regressionsgeraden y(x); null bei weniger als `minPoints` Werten oder zu wenig verschiedenen x */
export function slope(xs: readonly number[], ys: readonly number[], minPoints = 3, minLevels = 2): number | null {
  const n = xs.length;
  if (n < minPoints || new Set(xs).size < minLevels) return null;
  const mx = mean(xs);
  const my = mean(ys);
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (xs[i] - mx) * (ys[i] - my);
    den += (xs[i] - mx) * (xs[i] - mx);
  }
  return den === 0 ? null : num / den;
}

// ---------------------------------------------------------------------------
// Aufgaben

export interface TrialSpec {
  angle: number;
  same: boolean;
}

/** Winkel einer Einstellung: 0, Schritt, 2 × Schritt, … unter 360° */
export function anglesFor(step: 90 | 45): number[] {
  const out: number[] = [];
  for (let a = 0; a < 360; a += step) out.push(a);
  return out;
}

/**
 * Plan der Aufgaben: genau halb „gleich“, halb „gespiegelt“ (bei ungerader Zahl eins mehr), nie mehr als zwei gleiche hintereinander;
 * die Winkel laufen für beide Arten getrennt durch einen gemischten Beutel, sodass jeder Winkel gleich oft vorkommt (soweit die Zahl reicht).
 */
export function planTrials(n: number, step: 90 | 45, rng: Rng): TrialSpec[] {
  const angles = anglesFor(step);
  const bags: Record<'same' | 'mirror', number[]> = { same: [], mirror: [] };
  const draw = (kind: 'same' | 'mirror'): number => {
    if (!bags[kind].length) bags[kind] = rng.shuffle([...angles]);
    return bags[kind].pop()!;
  };
  const flags: boolean[] = [];
  for (let i = 0; i < n; i += 2) {
    const pair = rng.chance(0.5) ? [true, false] : [false, true];
    flags.push(pair[0]);
    if (i + 1 < n) flags.push(pair[1]);
  }
  return flags.map((same) => ({ same, angle: draw(same ? 'same' : 'mirror') }));
}

export interface Trial extends TrialSpec {
  /** Vorlage (links), normalisiert */
  base: Cell[];
  /** Abbildung der Vergleichsfigur (rechts) */
  matrix: Mat;
  /** Zeit, ab der die Aufgabe sichtbar ist (null, bis `beginTrial`) */
  shownAt: number | null;
}

export interface TrialRecord {
  nr: number;
  angle: number;
  folded: number;
  same: boolean;
  /** null = Zeit abgelaufen */
  answerSame: boolean | null;
  correct: boolean;
  /** null = Zeit abgelaufen */
  rtMs: number | null;
}

export type AnswerResult = { type: 'correct' | 'wrong'; same: boolean } | null;

export interface RotationSummary {
  correct: number;
  total: number;
  /** Anteil richtiger Antworten in %, null ohne Aufgaben */
  accuracy: number | null;
  rtMean: number | null;
  rtMedian: number | null;
  /** Anstieg der Antwortzeit je 90° Drehung in ms, null bei zu wenig Daten */
  slope: number | null;
  trials: TrialRecord[];
}

export interface RotationEnv {
  rng: Rng;
  /** Feste Aufgaben (Intro-Film) statt des Zufallsplans */
  fixedTrials?: readonly TrialSpec[];
}

/** Reine Spiellogik. */
export class RotationSession {
  readonly p: RotationParams;
  readonly plan: TrialSpec[];
  idx = 0;
  trials: TrialRecord[] = [];
  finished = false;
  trial: Trial | null = null;
  startedAt: number | null = null;
  endedAt: number | null = null;
  private readonly rng: Rng;

  constructor(p: RotationParams, env: RotationEnv) {
    this.p = p;
    this.rng = env.rng;
    this.plan = env.fixedTrials ? env.fixedTrials.slice() : planTrials(p.trials, p.step, env.rng);
  }

  get total(): number {
    return this.plan.length;
  }

  start(now: number): void {
    this.startedAt = now;
    this.next(now);
  }

  private next(now: number): void {
    if (this.idx >= this.plan.length) {
      this.finished = true;
      this.endedAt = now;
      this.trial = null;
      return;
    }
    const spec = this.plan[this.idx];
    const base = randomFigure(this.p.cells, this.rng);
    this.trial = { ...spec, base, matrix: trialMatrix(spec.angle, !spec.same), shownAt: null };
  }

  /** Die Figuren sind sichtbar geworden: ab hier läuft die Antwortzeit (und das Zeitlimit) */
  beginTrial(now: number): void {
    if (this.trial && this.trial.shownAt === null) this.trial.shownAt = now;
  }

  answer(isSame: boolean, now: number): AnswerResult {
    const t = this.trial;
    if (this.finished || !t || t.shownAt === null) return null;
    const correct = isSame === t.same;
    this.trials.push({
      nr: this.idx + 1,
      angle: t.angle,
      folded: foldAngle(t.angle),
      same: t.same,
      answerSame: isSame,
      correct,
      rtMs: Math.max(0, Math.round(now - t.shownAt)),
    });
    this.idx++;
    this.next(now);
    return { type: correct ? 'correct' : 'wrong', same: t.same };
  }

  /** Zeitlimit je Aufgabe: Überschreitung zählt als falsch ohne Antwort; liefert die abgelaufene Aufgabe */
  update(now: number): Trial | null {
    const t = this.trial;
    if (this.finished || !t || !this.p.timeoutS || t.shownAt === null) return null;
    if (now - t.shownAt < this.p.timeoutS * 1000) return null;
    this.trials.push({ nr: this.idx + 1, angle: t.angle, folded: foldAngle(t.angle), same: t.same, answerSame: null, correct: false, rtMs: null });
    this.idx++;
    this.next(now);
    return t;
  }

  summary(): RotationSummary {
    const ok = this.trials.filter((t) => t.correct);
    const rts = ok.map((t) => t.rtMs as number);
    const sl = slope(
      ok.map((t) => t.folded / 90),
      rts,
      MIN_SLOPE_POINTS,
      MIN_SLOPE_LEVELS,
    );
    return {
      correct: ok.length,
      total: this.trials.length,
      accuracy: this.trials.length ? round((100 * ok.length) / this.trials.length, 1) : null,
      rtMean: rts.length ? round(mean(rts), 0) : null,
      rtMedian: rts.length ? round(median(rts), 0) : null,
      slope: round(sl, 0),
      trials: this.trials.slice(),
    };
  }
}

// ---------------------------------------------------------------------------
// Layout

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface RotationLayout {
  /** Bereiche für Vorlage und Vergleichsfigur (ohne Beschriftung) */
  left: Box;
  right: Box;
  /** Beschriftungszeilen über den Bereichen */
  leftLabel: Box;
  rightLabel: Box;
  /** Antwortknöpfe: „gleich“ links, „gespiegelt“ rechts */
  btnSame: Box;
  btnMirror: Box;
  stacked: boolean;
}

/**
 * Aufteilung: oben (nach der Textzeile) die beiden Figurenbereiche – nebeneinander, bei hohem Bereich übereinander –, unten zwei
 * Antwortknöpfe (≥ `MIN_BUTTON_H` hoch). Alles liegt im Bereich `box`.
 */
export function layoutRotation(box: Box, header: number, labelH: number): RotationLayout {
  const gap = Math.max(8, Math.min(18, box.w * 0.03));
  const btnH = Math.max(MIN_BUTTON_H, Math.min(100, box.h * 0.16));
  const top = box.y + header;
  const areaH = Math.max(40, box.h - header - btnH - gap);
  const stacked = box.w < areaH * 1.05;
  let a: Box;
  let b: Box;
  if (stacked) {
    const h2 = (areaH - gap) / 2;
    a = { x: box.x, y: top, w: box.w, h: h2 };
    b = { x: box.x, y: top + h2 + gap, w: box.w, h: h2 };
  } else {
    const w2 = (box.w - gap) / 2;
    a = { x: box.x, y: top, w: w2, h: areaH };
    b = { x: box.x + w2 + gap, y: top, w: w2, h: areaH };
  }
  const label = (r: Box): Box => ({ x: r.x, y: r.y, w: r.w, h: labelH });
  const inner = (r: Box): Box => ({ x: r.x, y: r.y + labelH, w: r.w, h: Math.max(10, r.h - labelH) });
  const bw = Math.min(300, (box.w - gap) / 2);
  const by = box.y + box.h - btnH;
  return {
    left: inner(a),
    right: inner(b),
    leftLabel: label(a),
    rightLabel: label(b),
    btnSame: { x: box.x + box.w / 2 - gap / 2 - bw, y: by, w: bw, h: btnH },
    btnMirror: { x: box.x + box.w / 2 + gap / 2, y: by, w: bw, h: btnH },
    stacked,
  };
}

/** Kantenlänge eines Quadrats (px): die gewünschte, verkleinert, sodass die gedrehte Figur (Umkreis `radius` Quadrate) in den Bereich passt */
export function cellPxFor(area: Box, radius: number, wanted: number): number {
  const fit = (0.94 * Math.min(area.w, area.h)) / 2 / Math.max(1, radius);
  return Math.max(6, Math.min(wanted, fit));
}

/** Punkte (nur zur Motivation) */
export function pointsFor(correct: number): number {
  return correct * 10;
}

/** Schlüssel in texts.tips: ein persönlicher Tipp nach dem Lauf */
export function tipFor(sum: RotationSummary): string {
  if (sum.accuracy === null || sum.accuracy < 70) return 'slow';
  if (sum.accuracy >= 90) return 'harder';
  const missedMirror = sum.trials.filter((t) => !t.same && !t.correct).length;
  const missedSame = sum.trials.filter((t) => t.same && !t.correct).length;
  if (missedMirror > missedSame) return 'mirror';
  if (sum.slope !== null) return 'turn';
  return 'compare';
}
