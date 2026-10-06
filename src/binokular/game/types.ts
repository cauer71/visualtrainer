/**
 * Grundtypen der Spiellogik. Die Spiellogik weiß nichts über Farben, Filter oder Augen:
 * Jedes sichtbare Objekt trägt nur `eyeVisibility` und `contrast` – die Darstellung entscheidet `vision/`.
 */
import type { EyeVisibility } from '../vision/color';

export type { EyeVisibility };

export interface Cell {
  x: number;
  y: number;
}

/** Feldtyp im Raster (Seitenansicht). Fels und Erde sind fest, Luft ist begehbar (wenn gestützt). */
export type Tile = 'rock' | 'dirt' | 'air';

export type ObjectKind =
  | 'robot'
  | 'key'
  | 'door'
  | 'switch'
  | 'platform'
  | 'crystal'
  | 'base'
  | 'hazard'
  | 'ladder'
  | 'lamp'
  | 'pebble'
  | 'marker'
  | 'probe'
  /** Druckplatte: Plattform fährt nur, solange ein Roboter darauf steht (Level 4, 10) */
  | 'plate'
  /** neutraler Ablenker (Erzbrocken), nicht benutzbar (Level 5 ff.) */
  | 'decoy'
  /** Bahn einer wandernden Gefahr (macht die Bewegung vorhersehbar, Level 6 ff.) */
  | 'rail';

/**
 * Darstellbares Spielobjekt (Szene für den Renderer). Koordinaten in Feldern; Roboter und Plattform dürfen
 * Zwischenwerte haben (weiche Bewegung).
 */
export interface GameObject {
  id: string;
  kind: ObjectKind;
  x: number;
  y: number;
  /** Breite in Feldern (Plattform), sonst 1 */
  w: number;
  eyeVisibility: EyeVisibility;
  /** Objektkontrast 0–1 (wird mit dem Augenkontrast der Einstellungen multipliziert) */
  contrast: number;
  /** Relative Größe im Feld (0–1), aus dem Schwierigkeitsparameter Objektgröße */
  size: number;
  /** Deckkraft 0–1 für weiche Einblendungen (≥ 150 ms, kein Flackern) */
  alpha: number;
  /** Zusätzliche Zustände für die Form (z. B. offene Tür, Schalter an, ausgewählter Roboter, Symbolform) */
  flags?: Record<string, string | number | boolean>;
}

export interface Scene {
  cols: number;
  rows: number;
  tiles: Tile[][];
  objects: GameObject[];
}

/** Meldungen der Spiellogik an die Oberfläche (Schlüssel in texts.ts) */
export type GameMessage =
  | 'selectRobot'
  | 'robotSelected'
  | 'noPath'
  | 'needKey'
  | 'doorOpened'
  | 'switchOn'
  | 'switchOff'
  | 'dug'
  | 'pickedKey'
  | 'pickedCrystal'
  | 'handsFull'
  | 'dropped'
  | 'nothingHere'
  | 'delivered'
  | 'needCrystal'
  | 'hazard'
  | 'won'
  /** Roboter läuft los (nur Ton, kein Text) */
  | 'moveStart'
  /** Plattform setzt sich in Bewegung (nur Ton, kein Text) */
  | 'platformMoved'
  | 'plateOn'
  | 'plateOff';

export interface GameEvent {
  msg: GameMessage;
  /** Feld, auf das sich die Meldung bezieht (z. B. Gefahr) */
  cell?: Cell;
  robotId?: string;
  /** Gefahr war eine wandernde Gefahr (der Löser merkt sich deren Feld nicht als dauerhaft gefährlich) */
  mobile?: boolean;
}

export const cellKey = (x: number, y: number): string => `${x},${y}`;
