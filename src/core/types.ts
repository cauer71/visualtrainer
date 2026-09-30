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

export interface ExerciseResult {
  /** Hauptkennzahl – wird mit früheren Durchgängen verglichen */
  primary: PrimaryMetric;
  /** 2–4 Zusatzwerte für den Ergebnis-Bildschirm */
  secondary: Metric[];
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
   * 'ArrowUp', 'ArrowDown' sowie Ziffern '1'–'9'. t = virtuelle Zeit des Tastendrucks.
   */
  keyDown?(key: string, t: number): void;
  /** Bühne hat sich in der Größe geändert */
  resize?(w: number, h: number): void;
  destroy?(): void;
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
  /** Hinweis im Intro, z. B. wegen pulsierender Flächen */
  warning?: 'flicker';
  /** Ob die gespeicherte Stufe auf der Karte angezeigt wird */
  showsLevel?: boolean;
  create(ctx: ExerciseContext): Exercise;
}
