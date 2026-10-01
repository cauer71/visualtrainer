/**
 * Zahlen-Buchstaben-Wirbel – reine Logik (ohne Canvas), damit sie per vitest prüfbar ist.
 *
 * Zahlen und Buchstaben drehen sich langsam, jedes Zeichen um einen eigenen, etwas versetzten
 * Mittelpunkt. Man tippt sie abwechselnd in aufsteigender Folge an: 1 – A – 2 – B – 3 – C …
 * (Zahl n gehört zum n-ten Buchstaben).
 *
 * Bewegung (belegt durch den Auftraggeber, der das Original gespielt hat: „Die Zeichen drehen alle um
 * ein Zentrum. Jedes Zentrum ist etwas versetzt; je höher der Schwierigkeitsgrad, desto höher der
 * Versatz (x und y).“): Alle Zeichen drehen mit derselben Winkelgeschwindigkeit ω in derselben
 * Richtung. Zeichen i startet bei b_i und dreht um c_i = C + o_i:
 *
 *     p_i(t) = C + o_i + Rot(ω·t)·(b_i − o_i)
 *
 * Bei Versatz 0 dreht sich die ganze Anordnung starr um die Mitte C (Karussell, alle Abstände
 * bleiben gleich). Mit wachsendem Versatz ändern sich die Abstände der Zeichen zueinander immer
 * stärker – der Abstand zweier Zeichen schwingt zwischen | |Δc| − |Δr| | und |Δc| + |Δr|
 * (Δc = Unterschied der Mittelpunkte, Δr = Unterschied der Startabstände zum eigenen Mittelpunkt).
 * Erweiterung nach dem Probespiel des Auftraggebers („Das Feld ist zu klein“): ein Teil der Zeichen läuft
 * auf Ellipsen statt auf Kreisen (Halbachsen im Verhältnis der Spielfläche, füllen das Feld), mit
 * steigender Stufe dreht ein wachsender Anteil in Gegenrichtung (gleiches ω), und die Paarzahl steigt
 * bis 15 (30 Zeichen, Buchstaben je Sprache). Für gegensinnige Paare und Ellipsen gilt die einfache
 * Abstandsformel nicht mehr; der Mindestabstand wird deshalb über eine volle Periode abgetastet.
 * Dichtliegende Zeichen mit ähnlichem Versatz bleiben deshalb lange übereinander, wie im Video
 * („13“ über „10“, „G“ und „O“, „11“ und „H“). Die Überlappung ergibt sich aus der Geometrie; die
 * Stufe regelt nur, wie weit sie gehen darf (Mindestabstand) und wie groß der Versatz ist.
 *
 * Grundlagen (für die Kommentare; Quellen sind im Katalog / in science.ts geprüft):
 * - Wechsel zwischen zwei Folgen (Zahl ↔ Buchstabe) ist das Prinzip des Trail Making Test B
 *   (Reitan, 1958). Die B-Zeit hängt nach Sánchez-Cubillo et al. (2009) vor allem am
 *   Arbeitsgedächtnis und erst danach am Aufgabenwechsel, Teil A vor allem an der Wahrnehmung;
 *   nach Salthouse (2011) spiegelt Trail Making vor allem Verarbeitungstempo wider.
 * - Bewegung und Überlappung der Zeichen erschweren die visuelle Suche (Verdeckung, Crowding:
 *   Whitney & Levi, 2011). Der Versatz der Drehmittelpunkte ist deshalb der Schwierigkeitsregler:
 *   je größer, desto stärker verändern sich die Nachbarschaften der Zeichen, und desto öfter
 *   schieben sich Zeichen übereinander.
 * - Bei Trail-Making-Aufgaben ist die Dauer die übliche Messgröße. Wir nennen keine Normen:
 *   Hauptwert ist die Stufe; die Zeit je Zeichen taugt nur zum Vergleich mit früher auf demselben
 *   Gerät (Übungseffekte sind groß: Buck et al., 2008).
 *
 * ANNAHME (Hypothese): Welche Regel das Original verlangt, war im Video nicht zu sehen (nur drehende
 * Zahlen 5–14 und Buchstaben E–P, kein Antippen). Dass hier die Folge Zahl–Buchstabe abwechselnd
 * (1–A–2–B …) gefragt ist, bleibt unsere Vermutung in Anlehnung an Trail Making B. Die Bewegung
 * (Drehung um versetzte Mittelpunkte) ist dagegen durch die Beobachtung des Auftraggebers belegt;
 * die Zahlenwerte (Tempo, Versatz je Stufe) sind unsere Festlegung.
 *
 * Alle Zufälle laufen über den übergebenen Rng; die Position hängt nur von der Zeit ab (kein
 * Schrittverfahren), ist also bildratenunabhängig und für jeden Zeitpunkt exakt berechenbar.
 */
import type { Rng } from '../../core/rng';
import { clamp, median } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 12;

/** Farben (hell wie im Vorlagevideo, Zeichen dunkelgrau); Kontraste sind im Test gemessen */
export const PALETTE = {
  /** Grund in der Mitte / am Rand */
  bgCenter: '#F6F8FA',
  bgEdge: '#D3D9E2',
  /** Zeichen */
  ink: '#262B33',
  /** Akzent (Anzeige „Als Nächstes“, Punkt an getippten Zeichen) */
  accent: '#6D4C8C',
  /** Beschriftung auf der weißen Anzeige */
  label: '#374151',
  ok: '#15803D',
  bad: '#B45309',
} as const;

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

// ---------------------------------------------------------------------------
// Stufen

/** Anzahl Paare (Zahl + Buchstabe) je Stufe: 3 → 15, also 6 → 30 Zeichen */
const PAIRS = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15] as const;
/**
 * Buchstaben der Folge je Sprache (Zahl n gehört zum n-ten Buchstaben): Deutsch A–O, Italienisch
 * ohne J und K (A B C D E F G H I L M N O P Q); jeweils 15 Buchstaben.
 */
export const LETTERS_DE = 'ABCDEFGHIJKLMNO';
export const LETTERS_IT = 'ABCDEFGHILMNOPQ';
export const MAX_PAIRS = LETTERS_DE.length;
export const lettersFor = (lang: string): string => (lang === 'it' ? LETTERS_IT : LETTERS_DE);

export const pairsFor = (level: number): number => PAIRS[levelOf(level) - 1];
export const charsFor = (level: number): number => 2 * pairsFor(level);

/**
 * Dauer einer vollen Umdrehung in Sekunden: Stufe 1 → 60 s (sehr langsam), Stufe 12 → 20 s.
 * Alle Zeichen drehen mit derselben Winkelgeschwindigkeit (nur die Richtung kann wechseln).
 */
export function periodFor(level: number): number {
  return 60 - (40 * (levelOf(level) - 1)) / (MAX_LEVEL - MIN_LEVEL);
}

/** Winkelgeschwindigkeit ω in rad/s (Betrag; die Richtung steht je Zeichen in der Bahn) */
export const omegaFor = (level: number): number => (2 * Math.PI) / periodFor(level);

/**
 * Größe des Versatzes der Drehmittelpunkte als Anteil der Spielflächen-Breite (x) bzw. -Höhe (y):
 * Stufe 1 → ±3 %, Stufe 12 → ±28 %. Die Mittelpunkte liegen je Zeichen zufällig in diesem Rechteck.
 */
export const OFFSET_MIN = 0.03;
export const OFFSET_MAX = 0.28;
export function offsetFracFor(level: number): number {
  return OFFSET_MIN + ((OFFSET_MAX - OFFSET_MIN) * (levelOf(level) - MIN_LEVEL)) / (MAX_LEVEL - MIN_LEVEL);
}

/**
 * Anteil der Zeichen, die auf einer Ellipse statt auf einem Kreis laufen (Halbachsen im Verhältnis
 * Breite : Höhe der Spielfläche, füllt das Feld besser): Stufe 1 → 30 %, Stufe 12 → 70 %.
 */
export function ellipseFracFor(level: number): number {
  return 0.3 + (0.4 * (levelOf(level) - MIN_LEVEL)) / (MAX_LEVEL - MIN_LEVEL);
}

/**
 * Anteil der Zeichen, die gegen die übrigen drehen (gleiche Winkelgeschwindigkeit, umgekehrte
 * Richtung): Stufe 1–2 keines, Stufe 3 → 10 %, Stufe 12 → 50 %.
 */
export function reverseFracFor(level: number): number {
  const L = levelOf(level);
  return L <= 2 ? 0 : 0.1 + (0.4 * (L - 3)) / (MAX_LEVEL - 3);
}

/**
 * Mindestabstand zwischen zwei Zeichen als Anteil der Zeichengröße, **zu jedem Zeitpunkt der Drehung**:
 * ≥ 1 heißt „berühren sich nie“ (Stufe 1–5), darunter dürfen sie sich überlappen
 * (0,45 = höchstens etwa die Hälfte).
 */
const SEP = [1.3, 1.3, 1.0, 1.0, 1.0, 0.85, 0.75, 0.65, 0.58, 0.52, 0.48, 0.45] as const;
export const separationFor = (level: number): number => SEP[levelOf(level) - 1];

/**
 * Spielfläche je Zeichen in Vielfachen von F² (F = Schriftgröße): je kleiner, desto dichter.
 * Gemessen an der Zeichengröße, damit Handy und Tablet gleich eng werden (nicht gleich viel Prozent
 * der Bühne).
 */
const AREA_PER_CHAR = [58, 48, 44, 38, 34, 24, 19, 15.5, 13, 11, 10, 8.5] as const;
export const areaPerCharFor = (level: number): number => AREA_PER_CHAR[levelOf(level) - 1];

/** Anteil des Spielfelds, auf dem sich die Zeichen bewegen (0,3–1), bei `area` px² je F² und Zeichen */
export function arenaFraction(area: number, chars: number, F: number, fieldArea: number): number {
  return clamp((area * chars * F * F) / Math.max(1, fieldArea), 0.3, 1);
}
export const arenaFractionFor = (level: number, F: number, fieldArea: number): number => arenaFraction(areaPerCharFor(level), charsFor(level), F, fieldArea);

/**
 * Zeit je Zeichen in ms, bis zu der eine Runde als geschafft zählt: 3,6 s − 0,15 s · Stufe (mindestens
 * 1,8 s) plus 30 ms je Zeichen über 6 (mehr Zeichen = längere Suche), also 3,45 s (Stufe 1) bis 2,52 s (Stufe 12).
 */
export const limitPerCharMs = (level: number): number => Math.max(1800, 3600 - 150 * levelOf(level)) + 30 * (charsFor(level) - 6);

/** Geschafft = höchstens ein Fehltipp und im Zeitrahmen. Alles andere macht die nächste Runde leichter. */
export function roundSuccess(errors: number, totalMs: number, chars: number, level: number): boolean {
  return errors <= 1 && totalMs / Math.max(1, chars) <= limitPerCharMs(level);
}

// ---------------------------------------------------------------------------
// Folge

/** Beschriftung an Position k der Folge: 0 → „1“, 1 → „A“, 2 → „2“, 3 → „B“ … */
export function labelAt(k: number, letters: string = LETTERS_DE): string {
  return k % 2 === 0 ? String(k / 2 + 1) : letters[(k - 1) / 2];
}

export const isLetterAt = (k: number): boolean => k % 2 === 1;

export function sequence(pairs: number, letters: string = LETTERS_DE): string[] {
  const n = clamp(Math.round(pairs), 1, Math.min(MAX_PAIRS, letters.length));
  return Array.from({ length: 2 * n }, (_, k) => labelAt(k, letters));
}

// ---------------------------------------------------------------------------
// Geometrie

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Schriftgröße der Zeichen in px: mindestens 34 px (Handy), auf dem Tablet ≈ 50 px – die Ziffernhöhe
 * liegt damit bei etwa 1° aus 40 cm (Empfehlung im Dokument zur Zahlenjagd: ≥ 1°).
 */
export const glyphPx = (u: number): number => clamp(6.2 * u, 34, 72);

/** Mindest-Halbmaß der Trefferfläche: 30 px → mindestens 60 × 60 px (gefordert ≥ 56 px) */
export const HIT_MIN = 30;
const HIT_PAD = 14;

export interface Half {
  hw: number;
  hh: number;
}

/** Sichtbares Halbmaß eines Zeichens (Näherung für fette Systemschrift) in px */
export function visibleHalf(label: string, F: number): Half {
  const n = label.length;
  const letter = /^[A-Z]$/.test(label);
  return { hw: F * (letter ? 0.36 : n === 1 ? 0.3 : 0.3 * n - 0.02), hh: F * 0.38 };
}

/** Halbmaß der Trefferfläche: etwas größer als das Zeichen, nie unter HIT_MIN */
export function hitHalf(vis: Half): { hx: number; hy: number } {
  return { hx: Math.max(HIT_MIN, vis.hw + HIT_PAD), hy: Math.max(HIT_MIN, vis.hh + HIT_PAD) };
}

export interface FieldGeom {
  /** Platz der Anzeige „Als Nächstes“ */
  pill: Rect;
  /** Spielfeld darunter */
  field: Rect;
}

/**
 * Aufteilung der Bühne: oben die Anzeige, darunter das Spielfeld. `bottom` ist die Unterkante des
 * Spielfelds (im Intro-Film bleibt unten Platz für Hand und Bildunterschrift).
 */
export function fieldGeometry(w: number, h: number, u: number, bottom: number): FieldGeom {
  const m = Math.max(8, u * 1.6);
  const pillH = Math.max(54, u * 8);
  const top = m + pillH + Math.max(8, u * 1.4);
  return {
    pill: { x: m, y: m, w: Math.max(40, w - 2 * m), h: pillH },
    field: { x: m, y: top, w: Math.max(40, w - 2 * m), h: Math.max(40, Math.min(h - m, bottom) - top) },
  };
}

/** Spielfläche der Zeichen: um die Mitte des Spielfelds verkleinert (Fläche = Anteil · Spielfeld) */
export function arenaRect(field: Rect, fraction: number): Rect {
  const s = Math.sqrt(clamp(fraction, 0.05, 1));
  const w = field.w * s;
  const h = field.h * s;
  return { x: field.x + (field.w - w) / 2, y: field.y + (field.h - h) / 2, w, h };
}

// ---------------------------------------------------------------------------
// Bewegung: Drehung um versetzte Mittelpunkte (Kreise und Ellipsen, gleich- und gegensinnig)

/**
 * Bahn eines Zeichens: Startposition b und Drehmittelpunkt c = C + o, beide absolut in px.
 * - `k` = Halbachsenverhältnis Breite : Höhe (1 = Kreis; Ellipse: Verhältnis der Spielfläche).
 *   Die Drehung läuft in Koordinaten, in denen x durch k geteilt ist, und wird danach wieder mit k
 *   gestreckt: p = c + S·Rot(±θ)·S⁻¹·(b − c) mit S = diag(k, 1).
 * - `dir` = Drehrichtung (+1 im Uhrzeigersinn, −1 dagegen); die Winkelgeschwindigkeit ist für alle gleich.
 * - `ell` = Ellipse (nur zur Unterscheidung, damit `k` nach dem Drehen des Tablets neu bestimmt wird).
 */
export interface Orbit {
  bx: number;
  by: number;
  cx: number;
  cy: number;
  k?: number;
  dir?: 1 | -1;
  ell?: boolean;
}

/** Winkel ω·t in rad für die Zeit `ms` (Millisekunden seit Rundenbeginn) */
export const thetaAt = (omega: number, ms: number): number => (omega * ms) / 1000;

/**
 * Mitte des Zeichens beim Drehwinkel θ (θ > 0 und dir = +1: im Uhrzeigersinn, y zeigt auf dem
 * Bildschirm nach unten). Exakt für jeden Zeitpunkt – kein Schrittverfahren.
 */
export function orbitPos(o: Orbit, theta: number): { x: number; y: number } {
  const k = o.k ?? 1;
  const phi = (o.dir ?? 1) * theta;
  const qx = (o.bx - o.cx) / k;
  const qy = o.by - o.cy;
  const c = Math.cos(phi);
  const s = Math.sin(phi);
  return { x: o.cx + k * (qx * c - qy * s), y: o.cy + qx * s + qy * c };
}

/** Normierter Radius der Bahn: bei einem Kreis der Radius in px, bei einer Ellipse die y-Halbachse */
export const orbitRadius = (o: Orbit): number => Math.hypot((o.bx - o.cx) / (o.k ?? 1), o.by - o.cy);

/** Halbachsen der Bahn in px (x, y) */
export function orbitExtent(o: Orbit): { rx: number; ry: number } {
  const rho = orbitRadius(o);
  return { rx: rho * (o.k ?? 1), ry: rho };
}

type R = Pick<Rng, 'next' | 'range' | 'shuffle'>;

/** Bereich, in dem die Mitte eines Zeichens liegen darf (Zeichen bleibt ganz in der Spielfläche) */
export function centerRange(a: Rect, m: Half): { minX: number; maxX: number; minY: number; maxY: number } {
  let minX = a.x + m.hw;
  let maxX = a.x + a.w - m.hw;
  let minY = a.y + m.hh;
  let maxY = a.y + a.h - m.hh;
  if (maxX < minX) minX = maxX = a.x + a.w / 2;
  if (maxY < minY) minY = maxY = a.y + a.h / 2;
  return { minX, maxX, minY, maxY };
}

/** Liegt die ganze Bahn (nicht nur der Start) im erlaubten Bereich? `eps` = Rundungstoleranz in px */
export function orbitFits(o: Orbit, arena: Rect, half: Half, eps = 1e-6): boolean {
  const r = centerRange(arena, half);
  const { rx, ry } = orbitExtent(o);
  return o.cx - rx >= r.minX - eps && o.cx + rx <= r.maxX + eps && o.cy - ry >= r.minY - eps && o.cy + ry <= r.maxY + eps;
}

/**
 * Passt die Bahn ins Rechteck: Der Start wird hineingeschoben, und reicht die Bahn noch darüber
 * hinaus, wandert der Drehmittelpunkt auf der Linie zum Start (die Bahn schrumpft mit; k und Richtung
 * bleiben). Bei Radius 0 steht das Zeichen still. Eine Bahn, die schon passt, bleibt unverändert.
 */
export function fitOrbit(o: Orbit, arena: Rect, half: Half): Orbit {
  const r = centerRange(arena, half);
  const mx = (r.minX + r.maxX) / 2;
  const my = (r.minY + r.maxY) / 2;
  const Hx = (r.maxX - r.minX) / 2;
  const Hy = (r.maxY - r.minY) / 2;
  const bx = clamp(o.bx, r.minX, r.maxX) - mx;
  const by = clamp(o.by, r.minY, r.maxY) - my;
  const cx = o.cx - mx;
  const cy = o.cy - my;
  const k = o.k ?? 1;
  const rho = Math.hypot((bx - cx) / k, by - cy);
  const radX = k * rho;
  const radY = rho;
  let s = 1;
  // Bedingung |c_x| + rx ≤ Hx; mit c' = b + s·(c − b) gilt |c'_x| + s·rx ≤ (1 − s)|b_x| + s(|c_x| + rx)
  if (Math.abs(cx) + radX > Hx) s = Math.min(s, Math.max(0, (Hx - Math.abs(bx)) / (Math.abs(cx) + radX - Math.abs(bx))));
  if (Math.abs(cy) + radY > Hy) s = Math.min(s, Math.max(0, (Hy - Math.abs(by)) / (Math.abs(cy) + radY - Math.abs(by))));
  return { ...o, bx: bx + mx, by: by + my, cx: bx + s * (cx - bx) + mx, cy: by + s * (cy - by) + my };
}

/** Zeitproben je Umdrehung bei der Prüfung des Mindestabstands (gegensinnige Paare laufen doppelt so schnell gegeneinander) */
export const SEP_SAMPLES = 360;
/** Reserve in px gegen Lücken zwischen den Zeitproben (nur bei Mindestabstand ≥ 1) */
const SEP_SLACK = 8;

const tableCache = new Map<number, { cos: Float64Array; sin: Float64Array }>();
function angleTable(n: number): { cos: Float64Array; sin: Float64Array } {
  let t = tableCache.get(n);
  if (!t) {
    t = { cos: new Float64Array(n), sin: new Float64Array(n) };
    for (let i = 0; i < n; i++) {
      t.cos[i] = Math.cos((2 * Math.PI * i) / n);
      t.sin[i] = Math.sin((2 * Math.PI * i) / n);
    }
    tableCache.set(n, t);
  }
  return t;
}

/** Positionen der Bahn an `n` gleichen Winkelschritten einer vollen Umdrehung */
function pathOf(o: Orbit, n: number): { xs: Float64Array; ys: Float64Array } {
  const t = angleTable(n);
  const k = o.k ?? 1;
  const d = o.dir ?? 1;
  const qx = (o.bx - o.cx) / k;
  const qy = o.by - o.cy;
  const xs = new Float64Array(n);
  const ys = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const c = t.cos[i];
    const s = d * t.sin[i];
    xs[i] = o.cx + k * (qx * c - qy * s);
    ys[i] = o.cy + qx * s + qy * c;
  }
  return { xs, ys };
}

/** Größte Überdeckung (px) zweier Wege; Abbruch, sobald `limit` erreicht ist */
function pathViolation(a: { xs: Float64Array; ys: Float64Array }, b: { xs: Float64Array; ys: Float64Array }, wx: number, wy: number, limit = Infinity): number {
  let worst = 0;
  for (let i = 0; i < a.xs.length; i++) {
    const ox = wx - Math.abs(b.xs[i] - a.xs[i]);
    if (ox <= 0) continue;
    const oy = wy - Math.abs(b.ys[i] - a.ys[i]);
    if (oy <= 0) continue;
    const m = ox < oy ? ox : oy;
    if (m > worst) {
      worst = m;
      if (worst >= limit) return worst;
    }
  }
  return worst;
}

/** Größtmöglicher Abstand eines Zeichens von seinem Drehmittelpunkt */
const reachOf = (o: Orbit): number => orbitRadius(o) * Math.max(1, o.k ?? 1);

/**
 * Größte Überdeckung (px) zweier Zeichen über eine volle Umdrehung, gemessen an den mit `sep`
 * skalierten Kästen plus `slack`; 0 = die beiden kommen sich nie zu nah. Gilt für jede Kombination aus
 * Kreis/Ellipse und gleich-/gegensinnig (Abtastung über die ganze Periode; alle Zeichen haben dieselbe
 * Winkelgeschwindigkeit, die Periode ist also für alle 2π). Liegen die Mittelpunkte so weit auseinander,
 * dass sich die Bahnen nicht erreichen können, entfällt die Rechnung.
 */
export function pairViolation(a: Orbit, ha: Half, b: Orbit, hb: Half, sep: number, slack = 0, samples = SEP_SAMPLES): number {
  const wx = (ha.hw + hb.hw) * sep + slack;
  const wy = (ha.hh + hb.hh) * sep + slack;
  if (Math.hypot(a.cx - b.cx, a.cy - b.cy) - reachOf(a) - reachOf(b) >= Math.hypot(wx, wy)) return 0;
  return pathViolation(pathOf(a, samples), pathOf(b, samples), wx, wy);
}

/** Größte Überdeckung (px) über alle Paare, siehe pairViolation (für Prüfungen) */
export function worstViolation(orbits: readonly Orbit[], halves: readonly Half[], sep: number, slack = 0, samples = SEP_SAMPLES): number {
  let worst = 0;
  for (let i = 0; i < orbits.length; i++) {
    for (let j = i + 1; j < orbits.length; j++) worst = Math.max(worst, pairViolation(orbits[i], halves[i], orbits[j], halves[j], sep, slack, samples));
  }
  return worst;
}

export interface OrbitOptions {
  /** Versatz als Anteil der Spielfläche (Standard: offsetFracFor(level)); 0 = starres Karussell */
  offsetFrac?: number;
  /** Mindestabstand (Standard: separationFor(level)) */
  sep?: number;
  /** Anteil Ellipsen (Standard: ellipseFracFor(level)) */
  ellipseFrac?: number;
  /** Anteil gegensinnig drehender Zeichen (Standard: reverseFracFor(level)) */
  reverseFrac?: number;
  /** Versuche je Zeichen */
  tries?: number;
}

/**
 * Bahnen aller Zeichen. Je Zeichen wird (über rng, Anteile je Stufe fest) festgelegt: Kreis oder
 * Ellipse, gleich- oder gegensinnig. Dann: Mittelpunkt c = C + o mit o zufällig im Rechteck
 * ±(Anteil · Breite, Anteil · Höhe) der Spielfläche; Start b zufällig auf einer Bahn um c, deren Größe
 * so begrenzt ist, dass die ganze Bahn in der Spielfläche bleibt (nie ein Austritt, nie ein Abprall).
 * Ellipsen haben das Halbachsenverhältnis der Spielfläche und füllen sie dadurch aus; die erste Ellipse
 * (der „Rahmenläufer“) bekommt immer eine große Bahn mit kleinem Versatz.
 * Ein Kandidat zählt, wenn er sich mit den schon gesetzten Zeichen zu **keinem Zeitpunkt** der Umdrehung
 * näher kommt als der Mindestabstand der Stufe (Stufe 1–5: nie berühren, danach darf teilweise
 * überlappt werden). Gelingt das nicht, wird der Versatz schrittweise kleiner; am Ende gilt der
 * Kandidat mit der geringsten Überdeckung. Ellipsen werden zuerst gesetzt.
 */
export function buildOrbits(halves: readonly Half[], level: number, arena: Rect, rng: R, opt: OrbitOptions = {}): Orbit[] {
  // Bleibt eine Überdeckung über dem erlaubten Maß, wird die ganze Aufstellung neu gewürfelt (wenige Male)
  let best: { orbits: Orbit[]; worst: number } | null = null;
  for (let attempt = 0; attempt < BUILD_ATTEMPTS; attempt++) {
    const r = buildOnce(halves, level, arena, rng, opt);
    if (!best || r.worst < best.worst) best = r;
    if (best.worst <= 0) break;
  }
  return best!.orbits;
}

const BUILD_ATTEMPTS = 6;

function buildOnce(halves: readonly Half[], level: number, arena: Rect, rng: R, opt: OrbitOptions): { orbits: Orbit[]; worst: number } {
  const n = halves.length;
  let worstAll = 0;
  const sep = opt.sep ?? separationFor(level);
  const frac = Math.max(0, opt.offsetFrac ?? offsetFracFor(level));
  const ellFrac = clamp(opt.ellipseFrac ?? ellipseFracFor(level), 0, 1);
  const revFrac = clamp(opt.reverseFrac ?? reverseFracFor(level), 0, 1);
  const tries = Math.max(1, Math.round(opt.tries ?? 300));
  const slack = sep >= 1 ? SEP_SLACK : 0;
  const nEll = ellFrac <= 0 ? 0 : clamp(Math.round(ellFrac * n), Math.min(1, n), n);
  const nRev = Math.min(n, Math.round(revFrac * n));
  const ellOrder = rng.shuffle(Array.from({ length: n }, (_, i) => i));
  const isEll = new Array<boolean>(n).fill(false);
  ellOrder.slice(0, nEll).forEach((i) => (isEll[i] = true));
  const isRev = new Array<boolean>(n).fill(false);
  rng
    .shuffle(Array.from({ length: n }, (_, i) => i))
    .slice(0, nRev)
    .forEach((i) => (isRev[i] = true));
  const order = ellOrder; // die ersten nEll sind Ellipsen und werden zuerst gesetzt
  const Ox = frac * arena.w;
  const Oy = frac * arena.h;
  const out = new Array<Orbit>(n);
  const paths: Array<{ xs: Float64Array; ys: Float64Array }> = [];
  const placed: number[] = [];
  order.forEach((i, pos) => {
    const r = centerRange(arena, halves[i]);
    const Hx = (r.maxX - r.minX) / 2;
    const Hy = (r.maxY - r.minY) / 2;
    const mx = (r.minX + r.maxX) / 2;
    const my = (r.minY + r.maxY) / 2;
    const ell = isEll[i];
    const anchor = ell && pos === 0;
    const k = ell && Hy > 1e-6 && Hx > 1e-6 ? Hx / Hy : 1;
    const dir: 1 | -1 = isRev[i] ? -1 : 1;
    let best: Orbit = { cx: mx, cy: my, bx: mx, by: my, k, dir, ell };
    let bestPath: { xs: Float64Array; ys: Float64Array } | null = null;
    let bestScore = Infinity;
    for (let t = 0; t < tries; t++) {
      // Nach 60 % der Versuche rückt der Mittelpunkt schrittweise zur Mitte (kleinerer Versatz)
      const shrink = (anchor ? 0.5 : 1) * (t < tries * 0.6 ? 1 : Math.max(0.2, 1 - (0.8 * (t - tries * 0.6)) / (tries * 0.4)));
      const ox = clamp(rng.range(-Ox, Ox) * shrink, -0.6 * Hx, 0.6 * Hx);
      const oy = clamp(rng.range(-Oy, Oy) * shrink, -0.6 * Hy, 0.6 * Hy);
      const rmax = Math.max(0, Math.min((Hx - Math.abs(ox)) / k, Hy - Math.abs(oy)));
      const f = anchor ? rng.range(0.9, 1) : ell ? 0.5 + 0.5 * Math.sqrt(rng.next()) : 0.15 + 0.85 * Math.sqrt(rng.next());
      const rho = rmax * f;
      const ang = rng.range(0, 2 * Math.PI);
      const cand: Orbit = { cx: mx + ox, cy: my + oy, bx: mx + ox + k * rho * Math.cos(ang), by: my + oy + rho * Math.sin(ang), k, dir, ell };
      const reach = reachOf(cand);
      const path = pathOf(cand, SEP_SAMPLES);
      let score = 0;
      for (let q = 0; q < placed.length && score < bestScore; q++) {
        const j = placed[q];
        const wx = (halves[i].hw + halves[j].hw) * sep + slack;
        const wy = (halves[i].hh + halves[j].hh) * sep + slack;
        if (Math.hypot(cand.cx - out[j].cx, cand.cy - out[j].cy) - reach - reachOf(out[j]) >= Math.hypot(wx, wy)) continue;
        score = Math.max(score, pathViolation(path, paths[q], wx, wy, bestScore));
      }
      if (score < bestScore) {
        best = cand;
        bestPath = path;
        bestScore = score;
        if (score <= 0) break;
      }
    }
    out[i] = best;
    worstAll = Math.max(worstAll, bestScore);
    paths.push(bestPath ?? pathOf(best, SEP_SAMPLES));
    placed.push(i);
  });
  return { orbits: out, worst: worstAll };
}

/**
 * Nach dem Drehen des Tablets: Die Zeichen stehen dort, wo sie gerade sind (Winkel θ), umgerechnet in die
 * neue Spielfläche (gleichmäßig verkleinert bzw. vergrößert um die Mitte); Ellipsen bekommen das
 * Halbachsenverhältnis der neuen Fläche, die Bahnen werden neu eingepasst, der Winkel beginnt danach
 * wieder bei 0.
 */
export function resizeOrbits(orbits: readonly Orbit[], theta: number, from: Rect, to: Rect, halves: readonly Half[]): Orbit[] {
  const s = Math.min(to.w / Math.max(1, from.w), to.h / Math.max(1, from.h));
  const fx = from.x + from.w / 2;
  const fy = from.y + from.h / 2;
  const tx = to.x + to.w / 2;
  const ty = to.y + to.h / 2;
  return orbits.map((o, i) => {
    const p = orbitPos(o, theta);
    const r = centerRange(to, halves[i]);
    const Hx = (r.maxX - r.minX) / 2;
    const Hy = (r.maxY - r.minY) / 2;
    const k = o.ell && Hx > 1e-6 && Hy > 1e-6 ? Hx / Hy : o.ell ? (o.k ?? 1) : 1;
    return fitOrbit({ ...o, k, bx: tx + (p.x - fx) * s, by: ty + (p.y - fy) * s, cx: tx + (o.cx - fx) * s, cy: ty + (o.cy - fy) * s }, to, halves[i]);
  });
}

// ---------------------------------------------------------------------------
// Antippen

export interface Hittable {
  x: number;
  y: number;
  hx: number;
  hy: number;
  done: boolean;
  /** Position in der Folge */
  k: number;
}

export type TapResult = { kind: 'target'; i: number } | { kind: 'wrong'; i: number } | { kind: 'old'; i: number } | { kind: 'none' };

/**
 * Welches Zeichen ist gemeint? Liegen mehrere unter dem Finger, hat das gesuchte Vorrang
 * (Fairness bei Überlappung); sonst zählt das nächste ungetippte, das den Punkt trifft.
 * Schon getippte Zeichen werden ignoriert („old“); daneben = „none“.
 */
export function pickTap(items: readonly Hittable[], px: number, py: number, next: number): TapResult {
  let wrong = -1;
  let wrongD = Infinity;
  let old = -1;
  for (let i = 0; i < items.length; i++) {
    const m = items[i];
    const dx = px - m.x;
    const dy = py - m.y;
    if (Math.abs(dx) > m.hx || Math.abs(dy) > m.hy) continue;
    if (m.done) {
      old = i;
      continue;
    }
    if (m.k === next) return { kind: 'target', i };
    const d = (dx / m.hx) ** 2 + (dy / m.hy) ** 2;
    if (d < wrongD) {
      wrongD = d;
      wrong = i;
    }
  }
  if (wrong >= 0) return { kind: 'wrong', i: wrong };
  if (old >= 0) return { kind: 'old', i: old };
  return { kind: 'none' };
}

// ---------------------------------------------------------------------------
// Auswertung

export interface RoundRecord {
  level: number;
  pairs: number;
  chars: number;
  /** Dauer von der Anzeige bis zum letzten richtigen Tipp (ms) */
  ms: number;
  errors: number;
  success: boolean;
  /** Zeit je richtigem Tipp (ms) in Reihenfolge der Folge; Index k = Zeit bis zum k-ten Zeichen */
  steps: number[];
}

export interface Summary {
  rounds: number;
  errors: number;
  /** Ø Zeit je Zeichen über alle Runden in ms (NaN ohne Runde) */
  perCharMs: number;
  /** Höchste Stufe mit geschaffter Runde (0 = keine) */
  bestLevel: number;
  /** Paare der letzten Runde (0 = keine) */
  lastPairs: number;
  /** Mehrzeit für Buchstaben: Median Zeit zum Buchstaben minus Median Zeit zur Zahl in ms (NaN bei zu wenig Werten) */
  letterGapMs: number;
  /** Runden, in denen die Zeit je Zeichen über der Grenze lag */
  slowRounds: number;
  /** Niedrigste gespielte Stufe */
  minLevel: number;
}

/** Mindestanzahl Zeiten je Gruppe, damit die Mehrzeit für Buchstaben angezeigt wird */
export const MIN_GAP_SAMPLES = 5;

export function summarize(rounds: readonly RoundRecord[]): Summary {
  const chars = rounds.reduce((s, r) => s + r.chars, 0);
  const ms = rounds.reduce((s, r) => s + r.ms, 0);
  const letters: number[] = [];
  const numbers: number[] = [];
  for (const r of rounds) {
    r.steps.forEach((t, k) => {
      if (k === 0) return; // die Suche nach der „1“ enthält das erste Orientieren
      (isLetterAt(k) ? letters : numbers).push(t);
    });
  }
  const gap = letters.length >= MIN_GAP_SAMPLES && numbers.length >= MIN_GAP_SAMPLES ? median(letters) - median(numbers) : NaN;
  const ok = rounds.filter((r) => r.success);
  return {
    rounds: rounds.length,
    errors: rounds.reduce((s, r) => s + r.errors, 0),
    perCharMs: chars > 0 ? ms / chars : NaN,
    bestLevel: ok.length ? Math.max(...ok.map((r) => r.level)) : 0,
    lastPairs: rounds.length ? rounds[rounds.length - 1].pairs : 0,
    letterGapMs: gap,
    slowRounds: rounds.filter((r) => r.ms / Math.max(1, r.chars) > limitPerCharMs(r.level)).length,
    minLevel: rounds.length ? Math.min(...rounds.map((r) => r.level)) : MIN_LEVEL,
  };
}

/** Hauptwert: höchste Stufe mit geschaffter Runde; ohne geschaffte Runde eine unter der niedrigsten gespielten */
export function primaryLevel(s: Summary): number {
  return s.bestLevel > 0 ? s.bestLevel : clamp(s.minLevel - 1, MIN_LEVEL, MAX_LEVEL);
}

/** Startstufe der nächsten Sitzung: dort, wo man zuletzt eine Runde geschafft hat */
export const nextLevel = primaryLevel;

/** Schlüssel in texts.tips: errors | letters | slow | great */
export function tipFor(s: Summary): string {
  if (s.errors >= 3 && s.errors >= 1.5 * s.rounds) return 'errors';
  if (Number.isFinite(s.letterGapMs) && s.letterGapMs > 500) return 'letters';
  if (s.rounds >= 1 && s.slowRounds >= Math.ceil(s.rounds / 2)) return 'slow';
  return 'great';
}

/** Punkte für ein richtig getipptes Zeichen */
export const tapPoints = (level: number): number => 2 + levelOf(level);
/** Bonus für eine geschaffte Runde */
export const roundBonus = (level: number, success: boolean): number => (success ? 10 * levelOf(level) : 0);
