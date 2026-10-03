/**
 * Farb- und Brillenhilfen der Funktionsübungen mit Rot-Grün-Brille (Hess-Schirm, Worth-Vier-Punkte, Schober,
 * Diplopie-Karte): Einstellungen für Brille und Farben, Farben je Auge, Umrechnung Prismendioptrien ↔ cm ↔ Pixel
 * und das Prüfbild „Schritt für Schritt“ für das Intro.
 *
 * Bewusst eigenständig und klein (Namen mit `ana…`/`Ana…`), damit sich die Übungen später auf eine gemeinsame
 * Anaglyphen-Hilfe umstellen lassen, ohne dass ein Verhalten ändert.
 *
 * Prinzip: Ein Auge sieht durch das Rotglas nur Rotes, das andere durch das Grün-/Cyan-/Blauglas nur die zweite
 * Farbe. Auf schwarzem Grund ist ein rotes Zeichen für das zweite Auge unsichtbar und umgekehrt – so bekommt jedes
 * Auge sein eigenes Bild. Nichts hier misst, ob die Brille getragen wird.
 */
import type { ColorCheckAdjust, ColorCheckInfo, ExerciseParams, ExerciseTexts, NumberParamDef, ParamDef } from '../../core/types';

export type AnaLens = 'red' | 'green';
export type AnaTones = 'redgreen' | 'redcyan' | 'redblue';
export type AnaGlassesCheck = 'simple' | 'steps';
/** `a` = Rot, `b` = zweite Farbe (Grün, Cyan oder Blau) */
export type AnaColor = 'a' | 'b';

/** Einstellungen für Brille und Farben (Texte in `_shared/pruefung-texte.ts`); an die eigenen Einstellungen anhängen */
export const ANA_PARAMS: readonly ParamDef[] = [
  { key: 'leftLens', type: 'select', default: 'red', options: ['red', 'green'] },
  { key: 'tones', type: 'select', default: 'redgreen', options: ['redgreen', 'redcyan', 'redblue'] },
  { key: 'redLevel', type: 'number', unit: 'percent', min: 30, max: 100, step: 10, default: 100 },
  { key: 'secondLevel', type: 'number', unit: 'percent', min: 30, max: 100, step: 10, default: 100 },
  // Ansicht im Intro (Prüfbild einfach oder Schritt für Schritt): ändert die Übung nicht
  { key: 'glassesCheck', type: 'select', default: 'steps', options: ['simple', 'steps'], neutral: true },
];

export interface AnaParams {
  leftLens: AnaLens;
  tones: AnaTones;
  /** Helligkeit je Farbe in % (30–100) */
  redLevel: number;
  secondLevel: number;
  glassesCheck: AnaGlassesCheck;
}

/** Brillen-Einstellungen aus den bereinigten Einstellungen; fehlende oder ungültige Werte → Standard */
export function anaParams(p: ExerciseParams): AnaParams {
  const num = (key: 'redLevel' | 'secondLevel'): number => {
    const v = p[key];
    return typeof v === 'number' && Number.isFinite(v) ? Math.min(100, Math.max(30, v)) : 100;
  };
  const sel = <T extends string>(key: string, allowed: readonly T[], def: T): T => {
    const v = p[key];
    return typeof v === 'string' && (allowed as readonly string[]).includes(v) ? (v as T) : def;
  };
  return {
    leftLens: sel<AnaLens>('leftLens', ['red', 'green'], 'red'),
    tones: sel<AnaTones>('tones', ['redgreen', 'redcyan', 'redblue'], 'redgreen'),
    redLevel: num('redLevel'),
    secondLevel: num('secondLevel'),
    glassesCheck: sel<AnaGlassesCheck>('glassesCheck', ['simple', 'steps'], 'steps'),
  };
}

/** Grundfarben bei voller Helligkeit (R, G, B): reines Rot, reines Grün, Cyan, Blau (Rot-Cyan-Brillen) */
export const ANA_BASE_RGB: Record<'red' | AnaTones, readonly [number, number, number]> = {
  red: [255, 0, 0],
  redgreen: [0, 255, 0],
  redcyan: [0, 255, 255],
  redblue: [0, 160, 255],
};

export interface AnaCss {
  /** Rot */
  a: string;
  /** Grün, Cyan oder Blau */
  b: string;
  /** Neutrales Hellgrau (Beschriftung, Tasten): beide Augen sehen es */
  neutral: string;
}

/** Farben als CSS-Werte, je Farbe mit eigener Helligkeit (30–100 %) */
export function anaCss(a: Pick<AnaParams, 'tones' | 'redLevel' | 'secondLevel'>): AnaCss {
  const paint = (rgb: readonly [number, number, number], level: number): string => {
    const f = Math.max(0, Math.min(100, level)) / 100;
    return `rgb(${rgb.map((c) => Math.round(c * f)).join(',')})`;
  };
  return { a: paint(ANA_BASE_RGB.red, a.redLevel), b: paint(ANA_BASE_RGB[a.tones], a.secondLevel), neutral: 'rgb(200,200,200)' };
}

/** Welche Farbe sieht welches Auge (Rotglas = Rot, anderes Glas = zweite Farbe) */
export function anaEyeColors(leftLens: AnaLens): { left: AnaColor; right: AnaColor } {
  return leftLens === 'red' ? { left: 'a', right: 'b' } : { left: 'b', right: 'a' };
}

/** Auge (`left`/`right`), das die Farbe `c` sieht */
export function anaEyeOf(leftLens: AnaLens, c: AnaColor): 'left' | 'right' {
  return anaEyeColors(leftLens).left === c ? 'left' : 'right';
}

// ---------------------------------------------------------------------------
// Prismendioptrien

/** 1 Prismendioptrie (Δ) = 1 cm Ablenkung auf 1 m Entfernung: Versatz in cm bei `distCm` Sehentfernung */
export function pdToCm(pd: number, distCm: number): number {
  return (pd * distCm) / 100;
}

/** Umkehrung von `pdToCm` */
export function cmToPd(cm: number, distCm: number): number {
  return (cm / distCm) * 100;
}

// ---------------------------------------------------------------------------
// Zeichnen

type G = CanvasRenderingContext2D;

/** Zeichnet `fn` in der Farbe mit additiver Mischung (wirkt auf dunklem Grund: Überlagertes addiert sich) */
export function withAnaColor(g: G, color: string, fn: () => void): void {
  g.save();
  g.globalCompositeOperation = 'lighter';
  g.fillStyle = color;
  g.strokeStyle = color;
  fn();
  g.restore();
}

// ---------------------------------------------------------------------------
// Prüfbild im Intro

/** Name der Farbe (Rot; Grün, Cyan oder Blau je nach Farbpaar), aus den Texten `feedback.nameRed` usw. */
export function anaColorName(tx: ExerciseTexts, tones: AnaTones, c: AnaColor): string {
  const f = tx.feedback;
  return c === 'a' ? f.nameRed : tones === 'redcyan' ? f.nameCyan : tones === 'redblue' ? f.nameBlue : f.nameGreen;
}

/** Name des Glases (rot; grün, cyan oder blau) */
export function anaLensName(tx: ExerciseTexts, tones: AnaTones, c: AnaColor): string {
  const f = tx.feedback;
  return c === 'a' ? f.lensRed : tones === 'redcyan' ? f.lensCyan : tones === 'redblue' ? f.lensBlue : f.lensGreen;
}

/**
 * Prüfbild für das Intro (`ExerciseDefinition.colorCheck`), ohne Wertung: zwei Farbflächen in den eingestellten Farben.
 * Mit „Schritt für Schritt“ (Einstellung `glassesCheck`): Brille aufsetzen, je ein Auge zuhalten, Glas wählen, Helligkeit
 * je Farbe einstellen (30–100 %, Schritte 10 %), ein Satz zu Geisterbildern. Die Werte werden als Einstellungen gespeichert.
 * Nötig sind die Einstellungen `ANA_PARAMS` der Übung und die Texte aus `ANA_FEEDBACK` in `feedback`.
 */
export function anaColorCheck(params: ExerciseParams, tx: ExerciseTexts, defs: readonly ParamDef[]): ColorCheckInfo {
  const p = anaParams(params);
  const css = anaCss(p);
  const f = tx.feedback;
  const info: ColorCheckInfo = {
    title: f.checkTitle,
    text: f.checkText,
    panels: [
      { color: css.a, label: anaColorName(tx, p.tones, 'a') },
      { color: css.b, label: anaColorName(tx, p.tones, 'b') },
    ],
  };
  if (p.glassesCheck !== 'steps') return info;
  const eyes = anaEyeColors(p.leftLens);
  const adj = (c: AnaColor) => (c === 'a' ? f.adjRed : p.tones === 'redcyan' ? f.adjCyan : p.tones === 'redblue' ? f.adjBlue : f.adjGreen);
  const lensOption = (v: AnaLens) => ({ value: v, label: f.checkLensIs.replace('{c}', anaLensName(tx, p.tones, v === 'red' ? 'a' : 'b')) });
  const level = (key: 'redLevel' | 'secondLevel', c: AnaColor): ColorCheckAdjust => {
    const d = defs.find((x) => x.key === key) as NumberParamDef;
    const value = key === 'redLevel' ? p.redLevel : p.secondLevel;
    const name = anaColorName(tx, p.tones, c);
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
        adjust: [{ kind: 'choice', key: 'leftLens', label: tx.params?.leftLens?.label ?? 'leftLens', value: p.leftLens, options: [lensOption('red'), lensOption('green')] }],
      },
      { text: f.checkStepLevel, adjust: [level('redLevel', 'a'), level('secondLevel', 'b')] },
    ],
    note: f.checkGhost,
  };
}
