/**
 * Gemeinsame Schnittstelle der Spiele. Ein Spiel ist ein Modul in `games/<id>/` mit
 *  - Kennung, Titel, Beschreibung, Spielfeldgröße (feste Innenkoordinaten, Hoch- oder Querformat),
 *  - Standard-Einstellungen und `normalize` (streng, auch für Import),
 *  - `create(canvas, ctx, settings)` → Spielinstanz (start / pause / resume / destroy, Zusammenfassung).
 * Die Spiellogik liegt in reinen Modulen (ohne DOM, getestet); die Instanz verbindet sie mit Canvas, Zeigern, Tasten.
 * Farben kommen nie aus dem Spiel, sondern ausschließlich über `vision/color.ts` aus dem aktiven Profil.
 */
import type { SoundEvent } from '../audio';
import type { VisionSettings } from '../vision/color';
import type { DebugView } from '../vision/renderer';

export type GameId = 'nachzeichnen' | 'pong';
export const GAME_IDS: readonly GameId[] = ['nachzeichnen', 'pong'];

/** Warum eine Spielrunde/Session endete */
export type FinishReason = 'goal' | 'limit' | 'score' | 'user' | 'complaints' | 'interrupted';

/** Anzeige-Zeile der Live-Anzeige (grau) */
export interface HudItem {
  id: string;
  label: string;
  value: string;
}

/** Zusätzliche Knöpfe eines Spiels in der Leiste (z. B. „Neuer Pfad“) */
export interface GameAction {
  id: string;
  label: string;
}

export interface GameSnapshot {
  hud: HudItem[];
  /** grauer Hinweistext (leer = keiner) */
  message: string;
}

/** Zusammenfassung einer Spielrunde bzw. Session (Grundlage des Session-Datensatzes) */
export interface GameSummary {
  points: number;
  errors: number;
  colorChanges: number;
  /** spielspezifische Werte (nur Zahlen), z. B. { accuracy: 93.5, avgDeviation: 4.2 } */
  details: Record<string, number>;
  /** Spielziel erreicht bzw. Spiel regulär zu Ende gespielt */
  completed: boolean;
}

/** Umgebung, die die Oberfläche einem Spiel gibt */
export interface GameContext {
  /** Seh-Einstellungen samt Profilpalette (während des Spiels unverändert) */
  vision: VisionSettings;
  /** Ton (Audio-Modul) */
  play(ev: SoundEvent): void;
  /** Vibration, wo unterstützt (Fehler werden verschluckt) */
  vibrate(ms: number): void;
  /** aktuelle Debug-Ansicht */
  view(): DebugView;
  /** festes Seeds für Tests (`?seed=N`), sonst null */
  seed: number | null;
  /** Das Spiel meldet sein Ende (Ziel, Fehlerlimit, Punktestand) */
  finish(reason: FinishReason): void;
  /** Debug-Modus aktiv (Entwickleransicht) */
  debug: boolean;
}

export interface GameInstance {
  start(): void;
  pause(): void;
  resume(): void;
  destroy(): void;
  /** Live-Anzeige und Hinweis (wird ca. 4× pro Sekunde abgefragt) */
  snapshot(): GameSnapshot;
  summary(): GameSummary;
  actions: GameAction[];
  runAction(id: string): void;
  /** Zustand für Tests (`?debug=1` → `window.__binokular`) */
  debugState(): Record<string, unknown>;
  /** nur Tests (`?debug=1`): Spielzustand direkt setzen */
  debugSet?(patch: Record<string, unknown>): void;
  /** Spielkoordinaten → Client-Koordinaten (für Tests) */
  toClient(x: number, y: number): { x: number; y: number };
}

export interface GameModule<S = unknown> {
  id: GameId;
  title: string;
  description: string;
  /** Spielfeld in Innenkoordinaten; Hochformat (Pong) oder Querformat (Nachzeichnen) */
  design: { w: number; h: number };
  defaults: S;
  /** beliebige Daten streng auf gültige Einstellungen bringen */
  normalize(x: unknown): S;
  create(canvas: HTMLCanvasElement, ctx: GameContext, settings: S): GameInstance;
  /** Ergebniszeilen für Zusammenfassung und Verlauf (Beschriftung, Wert) aus Summary-Daten */
  rows(sum: GameSummary): { label: string; value: string }[];
}
