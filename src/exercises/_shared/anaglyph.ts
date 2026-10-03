/**
 * Gemeinsame Bausteine der Labor-Übungen mit Rot-Grün-/Rot-Cyan-Brille (Anaglyphen): Rot-Grün-Lesen, Fusion und Tiefe sehen.
 *
 * Prinzip: Auf schwarzem Grund steht ein Teil des Bildes in reinem Rot, der andere in Grün, Cyan oder Blau. Das Glas vor
 * dem einen Auge lässt nur Rot durch, das vor dem anderen nur die zweite Farbe: Jedes Auge sieht nur „sein“ Bild hell.
 *
 * Enthalten sind: Farben und Helligkeit je Farbe, welches Auge welche Farbe sieht, Umrechnung zwischen Prismendioptrien Δ,
 * Zentimetern, Pixeln und Winkelsekunden (mit der Sehentfernung der Kalibrierung), das Vorzeichen des Versatzes für
 * Konvergenz und Divergenz, additives Zeichnen, die gemeinsamen Einstellungen (Farbpaar, linkes Glas, Helligkeit,
 * Prüfbild-Ansicht), das Prüfbild „Schritt für Schritt“ für das Intro und der Trainer-Regler (`LiveValue`).
 *
 * Reine Rechnung ohne DOM und ohne Zufall; die Zeit kommt als `dt` oder `now` von der Übung.
 */
import { clamp } from '../../core/stats';
import type { ColorCheckAdjust, ColorCheckInfo, ExerciseParams, ExerciseTexts, Formatter, NumberParamDef, ResultDetailTable, SelectParamDef } from '../../core/types';

// ---------------------------------------------------------------------------
// Farben

export type Tones = 'redgreen' | 'redcyan' | 'redblue';
export type Lens = 'red' | 'green';
/** `a` = Rot, `b` = zweite Farbe (Grün, Cyan oder Blau) */
export type ColorId = 'a' | 'b';
export type ShiftDir = 'convergence' | 'divergence';
export type GlassesCheck = 'simple' | 'steps';

export const TONES: readonly Tones[] = ['redgreen', 'redcyan', 'redblue'];

export interface ToneCss {
  /** Farbe Rot */
  a: string;
  /** Farbe Grün, Cyan bzw. Blau */
  b: string;
  /** Neutrales Hellgrau (Rahmen, Kreuz, Bedienung): beide Augen sehen es */
  neutral: string;
}

/** Grundfarben bei voller Helligkeit (R, G, B): reines Rot, reines Grün, Cyan, Blau (Rot-Cyan-Brillen) */
export const BASE_RGB: Record<'red' | Tones, readonly [number, number, number]> = {
  red: [255, 0, 0],
  redgreen: [0, 255, 0],
  redcyan: [0, 255, 255],
  redblue: [0, 160, 255],
};

/**
 * Farben als CSS-Werte: reines Rot (255,0,0) und reines Grün (0,255,0), Cyan (0,255,255) oder Blau (0,160,255), skaliert
 * mit der gemeinsamen Helligkeit (80–100 %) und – je Farbe getrennt – mit `redLevel` und `secondLevel` (30–100 %).
 */
export function toneCss(tones: Tones, brightness = 100, redLevel = 100, secondLevel = 100): ToneCss {
  const pct = (x: number) => Math.max(0, Math.min(100, x)) / 100;
  const k = pct(brightness);
  const paint = (rgb: readonly [number, number, number], level: number): string => {
    const f = k * pct(level);
    return `rgb(${rgb.map((c) => Math.round(c * f)).join(',')})`;
  };
  const n = Math.round(200 * k);
  return { a: paint(BASE_RGB.red, redLevel), b: paint(BASE_RGB[tones], secondLevel), neutral: `rgb(${n},${n},${n})` };
}

/** Welche Farbe sieht welches Auge (Rot-Glas = Rot sichtbar, Grün-/Cyan-Glas = zweite Farbe sichtbar) */
export function eyeColors(leftLens: Lens): { left: ColorId; right: ColorId } {
  return leftLens === 'red' ? { left: 'a', right: 'b' } : { left: 'b', right: 'a' };
}

/** Zeichnet `fn` mit additiver Mischung: Wo sich Rot und die zweite Farbe überdecken, addieren sich die Farben (wirkt auf Schwarz) */
export function withColor(g: CanvasRenderingContext2D, color: string, fn: () => void): void {
  g.save();
  g.globalCompositeOperation = 'lighter';
  g.fillStyle = color;
  g.strokeStyle = color;
  fn();
  g.restore();
}

// ---------------------------------------------------------------------------
// Umrechnung: Prismendioptrien Δ ↔ cm ↔ Pixel ↔ Winkelsekunden

/** 1 Prismendioptrie (Δ) = 1 cm Ablenkung auf 1 m Entfernung: Versatz in cm bei `distCm` Sehentfernung */
export function pdToCm(pd: number, distCm: number): number {
  return (pd * distCm) / 100;
}

/** Umkehrung von `pdToCm` */
export function cmToPd(cm: number, distCm: number): number {
  return (cm / distCm) * 100;
}

/** Versatz in Pixeln für `pd` Prismendioptrien bei Sehentfernung `distCm` und `pxPerCm` Pixeln je cm (Kalibrierung) */
export function shiftPx(pd: number, distCm: number, pxPerCm: number): number {
  return pdToCm(pd, distCm) * pxPerCm;
}

/** Umkehrung von `shiftPx` */
export function pxToPd(px: number, distCm: number, pxPerCm: number): number {
  return cmToPd(px / pxPerCm, distCm);
}

/** Versatz in cm, der bei `distCm` Abstand unter dem Winkel `arcsec` (Winkelsekunden) erscheint */
export function arcsecToCm(arcsec: number, distCm: number): number {
  return distCm * Math.tan(((arcsec / 3600) * Math.PI) / 180);
}

/** Umkehrung von `arcsecToCm` */
export function cmToArcsec(cm: number, distCm: number): number {
  return ((Math.atan(cm / distCm) * 180) / Math.PI) * 3600;
}

/** Versatz in Pixeln für `arcsec` Winkelsekunden */
export function arcsecToPx(arcsec: number, distCm: number, pxPerCm: number): number {
  return arcsecToCm(arcsec, distCm) * pxPerCm;
}

/** Winkelsekunden, die einem einzelnen Bildpunkt (CSS-Pixel) entsprechen: die feinste Stufe, die der Bildschirm darstellt */
export function pixelArcsec(distCm: number, pxPerCm: number): number {
  return cmToArcsec(1 / pxPerCm, distCm);
}

/** Sehwinkel in Grad für eine Höhe in cm bei einem Abstand in cm */
export function visualAngleDeg(cm: number, distCm: number): number {
  return (2 * Math.atan(cm / (2 * distCm)) * 180) / Math.PI;
}

/**
 * Waagerechte Verschiebung der Bilder je Farbe (px, plus = nach rechts) bei einem Versatz von `shift` px zwischen den
 * beiden Farbbildern. Gekreuzt (Konvergenz): Das Bild des linken Auges liegt rechts vom Bild des rechten Auges, das Bild
 * rückt scheinbar näher und verlangt mehr Konvergenz; Divergenz ist umgekehrt. Das linke Auge sieht die Farbe seines Glases
 * (`leftLens`). Die Farbe des linken Auges wandert bei Konvergenz um +shift/2, die des rechten um −shift/2.
 */
export function colorOffsets(leftLens: Lens, dir: ShiftDir, shift: number): Record<ColorId, number> {
  const sign = dir === 'divergence' ? -1 : 1;
  const left = eyeColors(leftLens).left;
  const right: ColorId = left === 'a' ? 'b' : 'a';
  return { [left]: (sign * shift) / 2, [right]: 0 - (sign * shift) / 2 } as Record<ColorId, number>;
}

// ---------------------------------------------------------------------------
// Gemeinsame Einstellungen

export const P_TONES: SelectParamDef = { key: 'tones', type: 'select', default: 'redgreen', options: TONES };
export const P_LEFT_LENS: SelectParamDef = { key: 'leftLens', type: 'select', default: 'red', options: ['red', 'green'] };
export const P_BRIGHTNESS: NumberParamDef = { key: 'brightness', type: 'number', unit: 'percent', min: 80, max: 100, step: 5, default: 100 };
export const P_RED_LEVEL: NumberParamDef = { key: 'redLevel', type: 'number', unit: 'percent', min: 30, max: 100, step: 10, default: 100 };
export const P_SECOND_LEVEL: NumberParamDef = { key: 'secondLevel', type: 'number', unit: 'percent', min: 30, max: 100, step: 10, default: 100 };
/** Ansicht im Intro (Prüfbild einfach oder Schritt für Schritt): ändert die Übung nicht */
export const P_GLASSES_CHECK: SelectParamDef = { key: 'glassesCheck', type: 'select', default: 'steps', options: ['simple', 'steps'], neutral: true };

/** Zahl aus den bereinigten Einstellungen; fehlend oder ungültig → Standard */
export function readNum(p: ExerciseParams, def: NumberParamDef): number {
  const v = p[def.key];
  return typeof v === 'number' && Number.isFinite(v) ? v : def.default;
}

/** Auswahl aus den bereinigten Einstellungen; fehlend oder nicht erlaubt → Standard */
export function readSel<T extends string>(p: ExerciseParams, def: SelectParamDef): T {
  const v = p[def.key];
  return (typeof v === 'string' && def.options.includes(v) ? v : def.default) as T;
}

export interface AnaglyphSettings {
  tones: Tones;
  leftLens: Lens;
  /** gemeinsame Helligkeit in % (80–100); Übungen ohne diese Einstellung nutzen 100 */
  brightness: number;
  redLevel: number;
  secondLevel: number;
  glassesCheck: GlassesCheck;
}

/** Die gemeinsamen Farb-Einstellungen aus `ctx.params`; `withBrightness` = die Übung hat die gemeinsame Helligkeit */
export function readAnaglyph(p: ExerciseParams, withBrightness = true): AnaglyphSettings {
  return {
    tones: readSel<Tones>(p, P_TONES),
    leftLens: readSel<Lens>(p, P_LEFT_LENS),
    brightness: withBrightness ? readNum(p, P_BRIGHTNESS) : 100,
    redLevel: readNum(p, P_RED_LEVEL),
    secondLevel: readNum(p, P_SECOND_LEVEL),
    glassesCheck: readSel<GlassesCheck>(p, P_GLASSES_CHECK),
  };
}

export function cssOf(s: Pick<AnaglyphSettings, 'tones' | 'brightness' | 'redLevel' | 'secondLevel'>): ToneCss {
  return toneCss(s.tones, s.brightness, s.redLevel, s.secondLevel);
}

// ---------------------------------------------------------------------------
// Namen und Prüfbild (Texte stehen in `texts.feedback`, siehe anaglyph-texts.ts)

/** Name der Farbe (Rot; Grün, Cyan oder Blau je nach Farbpaar) */
export function colorNameOf(tx: ExerciseTexts, tones: Tones, c: ColorId): string {
  const f = tx.feedback;
  return c === 'a' ? f.nameRed : tones === 'redcyan' ? f.nameCyan : tones === 'redblue' ? f.nameBlue : f.nameGreen;
}

/** Name des Glases (rot; grün, cyan oder blau) */
export function lensNameOf(tx: ExerciseTexts, tones: Tones, c: ColorId): string {
  const f = tx.feedback;
  return c === 'a' ? f.lensRed : tones === 'redcyan' ? f.lensCyan : tones === 'redblue' ? f.lensBlue : f.lensGreen;
}

/**
 * Prüfbild im Intro (ohne Wertung): zwei Flächen in den eingestellten Farben, damit die Brille geprüft werden kann.
 * Mit „Schritt für Schritt“ (Einstellung `glassesCheck`): Brille aufsetzen, je ein Auge zuhalten, Glas wählen, Helligkeit je
 * Farbe verstellen (30–100 %, Schritte 10 %), ein Satz zu Geisterbildern. Die Werte werden als Einstellungen gespeichert.
 * Nutzt die Texte `check…`, `name…`, `lens…`, `adj…` aus `texts.feedback` und `texts.params.leftLens`.
 */
export function anaglyphColorCheck(s: AnaglyphSettings, tx: ExerciseTexts): ColorCheckInfo {
  const css = cssOf(s);
  const f = tx.feedback;
  const info: ColorCheckInfo = {
    title: f.checkTitle,
    text: f.checkText,
    panels: [
      { color: css.a, label: colorNameOf(tx, s.tones, 'a') },
      { color: css.b, label: colorNameOf(tx, s.tones, 'b') },
    ],
  };
  if (s.glassesCheck !== 'steps') return info;
  const eyes = eyeColors(s.leftLens);
  const adj = (c: ColorId) => (c === 'a' ? f.adjRed : s.tones === 'redcyan' ? f.adjCyan : s.tones === 'redblue' ? f.adjBlue : f.adjGreen);
  const lensOption = (v: Lens) => ({ value: v, label: f.checkLensIs.replace('{c}', lensNameOf(tx, s.tones, v === 'red' ? 'a' : 'b')) });
  const level = (key: 'redLevel' | 'secondLevel', c: ColorId): ColorCheckAdjust => {
    const d = key === 'redLevel' ? P_RED_LEVEL : P_SECOND_LEVEL;
    const value = key === 'redLevel' ? s.redLevel : s.secondLevel;
    const name = colorNameOf(tx, s.tones, c);
    return {
      kind: 'level',
      key,
      value,
      min: d.min,
      max: d.max,
      step: d.step,
      valueText: f.checkLevelValue.replace('{c}', name).replace('{v}', String(value)),
      downLabel: f.checkLevelDown.replace('{c}', name),
      upLabel: f.checkLevelUp.replace('{c}', name),
    };
  };
  return {
    ...info,
    text: f.checkTextSteps,
    steps: [
      { text: f.checkStepGlasses },
      // Linkes Auge zugehalten → das rechte Auge sieht nur die Farbe seines Glases, und umgekehrt
      { text: f.checkStepLeft.replace('{c}', adj(eyes.right)) },
      { text: f.checkStepRight.replace('{c}', adj(eyes.left)) },
      {
        text: f.checkStepLens,
        adjust: [{ kind: 'choice', key: 'leftLens', label: tx.params?.leftLens?.label ?? 'leftLens', value: s.leftLens, options: [lensOption('red'), lensOption('green')] }],
      },
      { text: f.checkStepLevel, adjust: [level('redLevel', 'a'), level('secondLevel', 'b')] },
    ],
    note: f.checkGhost,
  };
}

// ---------------------------------------------------------------------------
// Trainer-Regler: ein Wert, den die Trainerin/der Trainer während der Übung verstellt

/** Eine Änderung durch die Trainerin/den Trainer, mit Zeitpunkt (virtuelle Zeit der Übung) */
export interface LiveLogEntry {
  /** Zeitpunkt in ms (virtuelle Zeit) */
  t: number;
  /** neuer Wert des Reglers */
  value: number;
  /** Nummer des Durchgangs (ab 1) */
  trial: number;
  /** Gesamtwert nach der Änderung (bei Zusatz-Reglern: automatischer Wert + Zusatz) */
  total: number;
}

export interface LiveValueOptions {
  start: number;
  min: number;
  max: number;
  /** Größte Änderung je Tastendruck (Δ bzw. Winkelsekunden); größere Wünsche werden darauf begrenzt */
  maxJump: number;
  /** Mindestdauer des Gleitens für einen Sprung von `maxJump` (ms, nicht unter 150) */
  glideMs?: number;
}

/** Mindestdauer, in der eine Änderung auf der Anzeige gleitet (ms) */
export const LIVE_GLIDE_MS = 200;

/**
 * Wert des Trainer-Reglers: `target` ist der gewünschte Wert, `shown` gleitet weich dorthin (nie schneller als
 * `maxJump` in `glideMs`, mindestens 150 ms). Jede Änderung wird mit Zeitpunkt protokolliert. Der Regler verändert keine
 * Einstellungen, nur den Lauf; `reset` setzt ihn zurück (ohne Protokoll).
 */
export class LiveValue {
  target: number;
  shown: number;
  readonly log: LiveLogEntry[] = [];
  private readonly o: Required<LiveValueOptions>;

  constructor(o: LiveValueOptions) {
    this.o = { ...o, glideMs: Math.max(150, o.glideMs ?? LIVE_GLIDE_MS) };
    this.target = clamp(o.start, o.min, o.max);
    this.shown = this.target;
  }

  get min(): number {
    return this.o.min;
  }
  get max(): number {
    return this.o.max;
  }
  get maxJump(): number {
    return this.o.maxJump;
  }

  /**
   * Wunschwert setzen: auf [min, max] und auf höchstens `maxJump` Abstand zum bisherigen Ziel begrenzt. Gibt den neuen
   * Zielwert zurück oder `null`, wenn sich nichts ändert. `total` ist der Gesamtwert für das Protokoll.
   */
  set(value: number, t: number, trial: number, total: (target: number) => number = (x) => x): number | null {
    if (!Number.isFinite(value)) return null;
    const cap = clamp(value, this.target - this.o.maxJump, this.target + this.o.maxJump);
    const next = Math.round(clamp(cap, this.o.min, this.o.max) * 1000) / 1000;
    if (next === this.target) return null;
    this.target = next;
    this.log.push({ t: Math.round(t), value: next, trial, total: Math.round(total(next) * 100) / 100 });
    return next;
  }

  /** Ziel ohne Protokoll setzen (z. B. Start eines Durchgangs, Autoplay); die Anzeige gleitet dorthin */
  aim(value: number): void {
    this.target = clamp(value, this.o.min, this.o.max);
  }

  /** Sofort auf den Wert springen (nur für Neubeginn, nicht für Änderungen durch die Trainerin/den Trainer) */
  jump(value: number): void {
    this.target = clamp(value, this.o.min, this.o.max);
    this.shown = this.target;
  }

  /** Anzeige gleiten lassen; `dtSec` in Sekunden */
  update(dtSec: number): void {
    const speed = this.o.maxJump / (this.o.glideMs / 1000);
    const d = this.target - this.shown;
    const step = speed * Math.max(0, dtSec);
    this.shown = Math.abs(d) <= step ? this.target : this.shown + Math.sign(d) * step;
  }

  /** Anzeige hat das Ziel erreicht */
  get settled(): boolean {
    return Math.abs(this.target - this.shown) < 1e-6;
  }
}

/** Zusammenfassung des Protokolls: Anzahl, letzter Wert, Gesamtwert danach */
export function liveSummary(log: readonly LiveLogEntry[]): { n: number; last: LiveLogEntry | null } {
  return { n: log.length, last: log.length ? log[log.length - 1] : null };
}

/** Zeit als „m:ss“ */
export function clock(ms: number): string {
  const s = Math.max(0, Math.round(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/** Höchste Zahl Einzelzeilen im Protokoll der Trainer-Änderungen auf der Ergebnisseite */
export const LIVE_ROWS_MAX = 10;

/**
 * Tabelle „Trainer-Regler“ für die Ergebnisseite: wie oft der Regler verstellt wurde, zuletzt auf welchen Wert, und die
 * ersten Änderungen mit Zeitpunkt (Durchgang, m:ss), Wert und Gesamtwert. `null`, wenn der Regler nicht benutzt wurde.
 * Texte aus `texts.feedback`: `liveTitle`, `liveCount`, `liveCountValue` ({n}, {v}, {t}, {u}), `liveEntry` ({k}, {time}),
 * `liveEntryValue` ({v}, {t}, {u}), `liveMore` ({n}), `liveNote`. `additive`: Werte mit Vorzeichen als „Zusatz“.
 */
export function liveDetail(log: readonly LiveLogEntry[], f: Record<string, string>, fmt: Pick<Formatter, 'num'>, unit: string, decimals: number, additive: boolean): ResultDetailTable | null {
  const { n, last } = liveSummary(log);
  if (!last) return null;
  const num = (v: number) => fmt.num(v, decimals);
  const val = (v: number) => (additive ? (v > 0 ? `+${num(v)}` : v < 0 ? `\u2212${num(Math.abs(v))}` : num(0)) : num(v));
  const all = (tpl: string, key: string, v: string) => tpl.split(key).join(v);
  const fill = (tpl: string, e: LiveLogEntry) => all(all(all(tpl, '{v}', val(e.value)), '{t}', num(e.total)), '{u}', unit);
  const rows = log.slice(0, LIVE_ROWS_MAX).map((e) => ({
    label: f.liveEntry.replace('{k}', String(e.trial)).replace('{time}', clock(e.t)),
    value: fill(f.liveEntryValue, e),
  }));
  if (n > LIVE_ROWS_MAX) rows.push({ label: f.liveMore.replace('{n}', String(n - LIVE_ROWS_MAX)), value: '' });
  return {
    title: f.liveTitle,
    rows: [{ label: f.liveCount, value: fill(f.liveCountValue.replace('{n}', String(n)), last) }, ...rows],
    note: f.liveNote,
  };
}
