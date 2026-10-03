/**
 * Zentrale Typen der Übungs-Engine.
 *
 * Eine Übung ist ein reines Canvas-Modul (kein Framework nötig). Die Engine
 * (Runner) kümmert sich um Canvas, Pixeldichte, Zeitschleife, Pause, Eingaben,
 * die animierte "Geister-Hand" im Intro und das Einblenden von Texten.
 */
import type { Lang } from '../i18n/lang';
import type { Rng } from './rng';

export type CategoryId = 'reaktion' | 'bewegung' | 'wahrnehmung' | 'konzentration' | 'gedaechtnis';
export type Mode = 'play' | 'demo';

/**
 * Einheiten für Kennzahlen:
 * - time:    Wert in ms, angezeigt als Sekunden ("0,31 s")
 * - ms:      Wert in ms, angezeigt als Millisekunden ("48 ms")
 * - msSigned: Wert in ms mit Vorzeichen ("+48 ms" / "−48 ms"), z. B. Tendenz zu früh/zu spät
 * - percent: 0–100
 * - count:   ganze Zahl
 * - points:  Punkte
 * - level:   Stufe
 */
export type MetricUnit = 'time' | 'ms' | 'msSigned' | 'percent' | 'count' | 'points' | 'level';
export type Better = 'higher' | 'lower';

export interface Metric {
  /** Schlüssel in ExerciseTexts.metrics */
  key: string;
  value: number;
  unit: MetricUnit;
}

export interface PrimaryMetric extends Metric {
  better: Better;
}

/** Eine Zeile einer Detailtabelle auf dem Ergebnis-Bildschirm (Texte sind schon in der Sprache der Übung) */
export interface ResultDetailRow {
  label: string;
  /** fertig formatierter Wert, z. B. "612 ms" */
  value: string;
  /** optionaler kurzer Zusatz unter dem Label, z. B. "schnellste" */
  text?: string;
}

/** Kleine Tabelle unter den Zusatzwerten (optional; Übungen ohne `details` sehen aus wie bisher) */
export interface ResultDetailTable {
  title: string;
  rows: ResultDetailRow[];
  /** Hinweis unter der Tabelle */
  note?: string;
}

export interface ExerciseResult {
  /** Hauptkennzahl – wird mit früheren Durchgängen verglichen */
  primary: PrimaryMetric;
  /** 2–4 Zusatzwerte für den Ergebnis-Bildschirm */
  secondary: Metric[];
  /** Optionale Detailtabellen (z. B. Richtungen); gespeichert wird weiterhin nur Hauptwert + Stufe */
  details?: ResultDetailTable[];
  /** Punkte (Motivation) */
  score: number;
  /** Schwierigkeitsstufe, mit der die nächste Sitzung startet */
  level: number;
  /** Schlüssel in ExerciseTexts.tips – ein persönlicher Tipp */
  tip?: string;
}

export interface PointerInfo {
  id: number;
  /** Koordinaten in CSS-Pixeln relativ zur Bühne */
  x: number;
  y: number;
  /** Zeitpunkt in virtueller Zeit (ms, steht während der Pause still) */
  t: number;
  type: 'mouse' | 'touch' | 'pen' | 'ghost';
}

/** Live-Maße der Bühne (ändern sich z. B. beim Drehen des Tablets). */
export interface StageInfo {
  readonly w: number;
  readonly h: number;
  /** 1 % der kürzeren Seite in px – bequeme Einheit für Größen */
  readonly u: number;
  readonly dpr: number;
}

export type ToastKind = 'good' | 'bad' | 'info' | 'big';

export interface ToastOptions {
  x?: number;
  y?: number;
  /** Anzeigedauer in ms (Standard 800) */
  ms?: number;
  size?: number;
}

export interface Hud {
  /** Fortschritt 0..1 (Zeit oder Durchgänge) */
  setProgress(frac: number): void;
  /** Zahl oben rechts (null = ausblenden) */
  setScore(value: number | null): void;
  /** Kleiner Statustext, z. B. "Runde 2/6" */
  setLabel(text: string | null): void;
  /** Kurz eingeblendeter Text auf der Bühne */
  toast(text: string, kind?: ToastKind, opts?: ToastOptions): void;
  /** Erklärtext im Intro-Film (nur Demo-Modus sichtbar) */
  caption(text: string | null, pos?: 'top' | 'bottom'): void;
}

export interface GhostTapOptions {
  /** Wartezeit bevor die Hand losfährt (ms) */
  delay?: number;
  /** Dauer der Bewegung zum Ziel (ms) */
  move?: number;
}

/** Animierte Hand, die im Intro-Film vormacht, wie die Übung geht. */
export interface Ghost {
  /** Hand zum Punkt bewegen und dort tippen (löst pointerDown der Übung aus) */
  tap(x: number, y: number, opts?: GhostTapOptions): void;
  /** Hand nur bewegen */
  moveTo(x: number, y: number, opts?: GhostTapOptions): void;
  /** Warteschlange leeren */
  clear(): void;
  show(): void;
  hide(): void;
  /** true, wenn keine Aktion mehr aussteht */
  readonly idle: boolean;
}

export interface Sfx {
  /** Leiser, gleichmäßiger Taktschlag (optionales Metronom einer Übung); fehlt bei einfachen Test-Stubs */
  beat?(): void;
  tick(): void;
  go(): void;
  good(): void;
  bad(): void;
  tap(): void;
  done(): void;
}

export interface Formatter {
  /** Zahl mit fester Nachkommastellenzahl im Sprachformat */
  num(v: number, digits?: number): string;
  /** ms → "0,31 s" */
  time(ms: number, digits?: number): string;
  /** ms → "48 ms" */
  ms(ms: number): string;
  /** vorzeichenbehaftet: "+48 ms" / "−48 ms" */
  msSigned(ms: number): string;
  pct(v: number): string;
}

/**
 * Wahl, die eine Übung vor dem Start anbietet (z. B. ein Takt): ein Schalter (Standard aus) und, wenn an,
 * eine Auswahl (z. B. Tempo). Die Auswahl wird lokal gespeichert (storage.ts) und der Übung als
 * `ctx.options[key]` übergeben; Intro-Film und Autoplay laufen immer ohne.
 */
export interface ExerciseOptionDef {
  key: string;
  /** Wahlmöglichkeiten bei eingeschaltetem Schalter, z. B. ['slow', 'medium', 'fast'] */
  choices: readonly string[];
  defaultChoice: string;
}

export interface ExerciseOptionValue {
  on: boolean;
  choice: string;
}

/** Texte einer Option in einer Sprache (Schlüssel wie `ExerciseOptionDef.key`) */
export interface ExerciseOptionTexts {
  title: string;
  /** Kurzer Hinweis unter dem Schalter */
  hint: string;
  /** Beschriftung je Wahlmöglichkeit */
  choices: Record<string, string>;
}

/**
 * Einstellbare Größen einer Übung (z. B. Labor-Übungen). Standard und Grenzen stehen hier, die Texte
 * (Beschriftung, Erklärung, Auswahl-Namen) unter `ExerciseTexts.params`. Die Übung bekommt die bereinigten
 * Werte als `ctx.params` (Zahlen auf min/max/step gerundet und geklemmt, Auswahl nur erlaubte Werte, sonst Standard).
 */
export type ParamUnit = 'cm' | 's' | 'ms' | 'bpm' | 'count' | 'deg' | 'percent';

interface ParamDefBase {
  /** Schlüssel in `ctx.params` und in `ExerciseTexts.params` */
  key: string;
  /**
   * `true` = ändert die Vergleichbarkeit der Ergebnisse nicht (z. B. Ton). Alle anderen Einstellungen gehören zum
   * Variantenschlüssel: Verlauf, Bestwert und „Letztes Mal“ vergleichen nur Läufe mit gleichem Schlüssel.
   */
  neutral?: boolean;
  /** `true` = erscheint in der Kurzfassung auf der Ergebnisseite (z. B. „5 cm · 1,5 s · 1 Spot“) */
  summary?: boolean;
}

export interface NumberParamDef extends ParamDefBase {
  type: 'number';
  default: number;
  min: number;
  max: number;
  step: number;
  unit?: ParamUnit;
}

export interface SelectParamDef extends ParamDefBase {
  type: 'select';
  /** Standard-Wert (einer aus `options`) */
  default: string;
  /** Erlaubte Werte; die sichtbaren Namen stehen in `ExerciseTexts.params[key].options` */
  options: readonly string[];
}

export type ParamDef = NumberParamDef | SelectParamDef;
export type ParamValue = number | string;
export type ExerciseParams = Readonly<Record<string, ParamValue>>;

/** Texte einer Einstellung in einer Sprache */
export interface ParamTexts {
  label: string;
  /** Kurz-Erklärung unter der Einstellung */
  hint?: string;
  /** Namen der Auswahl-Werte (nur bei `type: 'select'`) */
  options?: Record<string, string>;
  /**
   * Vorlage für die Kurzfassung auf der Ergebnisseite, `{v}` = Wert (z. B. „{v} Spot|{v} Spots“: erste Form bei
   * genau 1, zweite sonst). Fehlt sie, steht bei Zahlen der Wert mit Einheit, bei Auswahlen der Name des Werts.
   */
  short?: string;
}

/** Gewählte Kalibrierung (Einstellung, lokal gespeichert): Pixel pro cm (null = nicht kalibriert) und Sehentfernung in cm */
export interface CalibSettings {
  pxPerCm: number | null;
  viewDistanceCm: number;
}

/**
 * Umrechnung cm ↔ Pixel ↔ Sehwinkel (CSS-Pixel der Bühne). Ohne Kalibrierung gilt die Schätzung 38 px/cm
 * (`calibrated: false`), damit alle Übungen weiter laufen.
 */
export interface Calib {
  readonly pxPerCm: number;
  readonly viewDistanceCm: number;
  /** `false` = Schätzung, der Bildschirm wurde nicht kalibriert */
  readonly calibrated: boolean;
  cmToPx(cm: number): number;
  pxToCm(px: number): number;
  /** Sehwinkel in Grad, unter dem ein Objekt der Größe `cm` erscheint */
  cmToDeg(cm: number): number;
  /** Größe in cm, die unter dem Sehwinkel `deg` erscheint */
  degToCm(deg: number): number;
  /** Größe in px, höchstens 0,9 × kürzere Bühnenseite (die Bühne wird nie gesprengt); live zur aktuellen Bühne */
  sizePx(cm: number): number;
  /** Größe in cm nach derselben Begrenzung wie `sizePx` */
  fitCm(cm: number): number;
  /** `true`, wenn `cm` auf dieser Bühne begrenzt würde */
  isLimited(cm: number): boolean;
  /** Größte darstellbare Größe in cm auf der aktuellen Bühne */
  maxCm(): number;
}

export interface ExerciseTexts {
  /** Name der Übung */
  title: string;
  /** Nutzen in einem Satz – locker, nicht wissenschaftlich */
  tagline: string;
  /** Sehr kurze Schritte (2–3) */
  steps: string[];
  /** "Für Neugierige": 2–3 Sätze in Alltagssprache */
  why: string;
  /** Wofür im Alltag gut (Stichworte für Karten) */
  goodFor: string[];
  /** Texte im Intro-Film */
  captions: Record<string, string>;
  /** Bezeichnungen der Kennzahlen */
  metrics: Record<string, string>;
  /** Persönliche Tipps nach dem Durchgang */
  tips: Record<string, string>;
  /** Kurze Rückmeldungen während der Übung ("Zu früh!") */
  feedback: Record<string, string>;
  /** Texte der Optionen aus `ExerciseDefinition.options` (nur für Übungen mit Optionen) */
  options?: Record<string, ExerciseOptionTexts>;
  /** Texte der Einstellungen aus `ExerciseDefinition.params` (Schlüssel wie `ParamDef.key`) */
  params?: Record<string, ParamTexts>;
  /** Erklärung je Kennzahl (Schlüssel wie in `metrics`); erscheint auf der Ergebnisseite unter „Was bedeuten die Werte?“ */
  metricHints?: Record<string, string>;
  /** „So wird es leichter/schwerer“: einklappbarer Abschnitt auf der Intro-Seite */
  progression?: string[];
  /** „Gut zu wissen“: Hinweise zur Vorsicht, einklappbarer Abschnitt auf der Intro-Seite */
  cautions?: string[];
}

export interface ExerciseContext {
  readonly mode: Mode;
  /** Demo/Autoplay: Die Übung spielt sich mit der Geister-Hand selbst */
  readonly autoplay: boolean;
  /** Test-Modus: sehr kurze Sitzungen */
  readonly quick: boolean;
  /** Systemeinstellung "Bewegung reduzieren": Effekt-Animationen (Aufploppen, Ausbreiten) weglassen */
  readonly reducedMotion: boolean;
  /** Gespeicherte Schwierigkeitsstufe (null = erster Durchgang) */
  readonly startLevel: number | null;
  /** Gewählte Optionen (siehe `ExerciseDefinition.options`); im Intro-Film nicht gesetzt */
  readonly options?: Readonly<Record<string, ExerciseOptionValue>>;
  /**
   * Bereinigte Einstellungen (siehe `ExerciseDefinition.params`); im Intro-Film die Standardwerte. Der Runner setzt es
   * immer – optional nur, damit ältere Test-Attrappen weiter passen (dann `paramsOf(ctx, defs)` aus core/params nutzen).
   */
  readonly params?: ExerciseParams;
  /** Kalibrierung cm/Sehwinkel; der Runner setzt sie immer (sonst `calibOf(ctx)` aus core/calib nutzen) */
  readonly calib?: Calib;
  readonly lang: Lang;
  readonly texts: ExerciseTexts;
  readonly rng: Rng;
  readonly sfx: Sfx;
  readonly hud: Hud;
  readonly ghost: Ghost;
  readonly stage: StageInfo;
  readonly fmt: Formatter;
  /** Aktuelle virtuelle Zeit in ms */
  now(): number;
  /** Übung beenden und Ergebnis melden */
  finish(result: ExerciseResult): void;
}

export interface Exercise {
  /** Wird einmal aufgerufen, sobald die Bühne bereit ist */
  start(t: number): void;
  /** Pro Frame: dt in Sekunden (begrenzt), t = virtuelle Zeit in ms */
  update(dt: number, t: number): void;
  /** Pro Frame zeichnen (Koordinaten in CSS-Pixeln) */
  render(g: CanvasRenderingContext2D, t: number): void;
  pointerDown?(p: PointerInfo): void;
  pointerMove?(p: PointerInfo): void;
  pointerUp?(p: PointerInfo): void;
  /**
   * Optionale Tastatursteuerung (Computer): ' ' (Leertaste), 'Enter', 'ArrowLeft', 'ArrowRight',
   * 'ArrowUp', 'ArrowDown', Ziffern '0'–'9', Buchstaben ('a'–'z', 'A'–'Z'), '?' und 'Backspace'. t = virtuelle Zeit des
   * Tastendrucks. Übungen ignorieren Tasten, die sie nicht brauchen.
   */
  keyDown?(key: string, t: number): void;
  /** Bühne hat sich in der Größe geändert */
  resize?(w: number, h: number): void;
  destroy?(): void;
}

/**
 * Prüfbild im Intro (ohne Wertung), z. B. zwei Farbflächen zum Prüfen einer Rot-Grün-Brille: Titel, Erklärtext und
 * Flächen (Farbe und Beschriftung, die Farbe ist nie der einzige Hinweis).
 */
export interface ColorCheckInfo {
  title: string;
  text: string;
  panels: Array<{ color: string; label: string }>;
}

export interface ExerciseDefinition {
  /** URL- und Speicher-Kennung, z. B. "blitzreaktion" */
  id: string;
  category: CategoryId;
  /** Ungefähre Dauer in Minuten */
  minutes: number;
  /** Akzentfarbe (Karte, Symbol) */
  color: string;
  /** Inneres SVG (viewBox 0 0 48 48) für Karten */
  icon: string;
  texts: Record<Lang, ExerciseTexts>;
  /** Hinweis im Intro: 'flicker' = sanft pulsierende Flächen, 'flash' = sehr kurze Einblendungen / schnelle Wechsel */
  warning?: 'flicker' | 'flash';
  /** Ob die gespeicherte Stufe auf der Karte angezeigt wird */
  showsLevel?: boolean;
  /** Optionen, die das Intro vor dem Start anbietet (Standard aus, Auswahl wird gespeichert) */
  options?: readonly ExerciseOptionDef[];
  /** Marken, z. B. `'labor'` (Marke „Labor“ auf den Karten, Filter, nicht im Tagestraining) */
  tags?: string[];
  /** Einstellungen, die das Intro (einklappbar) anbietet; Werte kommen als `ctx.params` */
  params?: readonly ParamDef[];
  /** `true` = die Übung rechnet in cm/Sehwinkel (`ctx.calib`); das Intro weist auf die Kalibrierung hin */
  usesCalibration?: boolean;
  /** Prüfbild, das das Intro unter den Einstellungen zeigt (aus den aktuellen Einstellungen und den Texten der Sprache) */
  colorCheck?: (params: ExerciseParams, texts: ExerciseTexts) => ColorCheckInfo;
  create(ctx: ExerciseContext): Exercise;
}
