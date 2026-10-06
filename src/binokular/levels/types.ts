/**
 * Level als Daten. Ein Level besteht aus einem Feldraster (Zeichen je Feld), einer Objektliste mit Augenklasse
 * und Schwierigkeitsparametern. Jedes Level ist eine Datei `levelNN.ts` (1–10), die Liste steht in `index.ts`.
 */
import type { Cell } from '../game/types';
import type { EyeVisibility } from '../vision/color';

/**
 * Schwierigkeitsparameter (Spezifikation „progressive Schwierigkeit“). Mehrere unabhängige Größen,
 * damit Schwierigkeit nicht nur über Geschwindigkeit steigt.
 */
export interface DifficultyParams {
  /** Objektgröße relativ zum Feld (0,4–1). */
  objectSize: number;
  /**
   * Objektkontraste je Klasse (0–1), werden mit den Augenkontrasten multipliziert. `target` ist der Kontrast der
   * Ziele (Kristalle, Basis) – ab Level 8 geringer als der übrigen Objekte des dominanten Auges.
   */
  contrast: { amblyopic: number; fellow: number; target: number; neutral: number; distractor: number };
  /** Robotertempo in Feldern pro Sekunde (in allen Leveln ruhig 2,5 – keine schnelle Action). */
  moveSpeed: number;
  /** Tempo der wandernden Gefahr in Feldern pro Sekunde; 0 = nichts bewegt sich von selbst (Level 1–5). */
  hazardSpeed: number;
  /** Anzahl relevanter Objekte (Roboter, Kristalle, Schlüssel, Türen, Schalter, Platten, Plattformen, Gefahren), wird geprüft */
  objectCount: number;
  /** größter Abstand zwischen zusammengehörigen Objekten eines Paares in Feldern (Schlüssel ↔ Tür …), wird geprüft */
  pairDistance: number;
  /** visuelle Ablenkung 0–1: Deko-Steine (24 × Wert) und ab 0,25 neutrale Erzbrocken (20 × (Wert − 0,2)). */
  distraction: number;
  /** Levelkomplexität 1–5 (Zahl der Arbeitsschritte). Richtzeit für den Zeitstern = 60 s × Komplexität. */
  complexity: number;
  /**
   * Reaktionszeit in ms: so lange bleibt die wandernde Gefahr auf einem Feld (= 1000 / hazardSpeed) – Zeit zum
   * Erkennen und Losschicken. null = keine Zeitvorgabe (Level ohne bewegte Gefahr).
   */
  reactionTimeMs: number | null;
  /** erwartete Dauer durchgehender binokularer Nutzung in Sekunden (Richtwert 120–300, geschätzt) */
  binocularDurationS: number;
}

export interface LevelObjectDef {
  kind: 'robot' | 'key' | 'door' | 'switch' | 'plate' | 'platform' | 'crystal' | 'base' | 'hazard' | 'lamp' | 'ladder';
  id: string;
  x: number;
  y: number;
  eye: EyeVisibility;
  /** Plattform: Breite und Zielposition (eingefahren = x/y, ausgefahren = toX/toY) */
  w?: number;
  toX?: number;
  toY?: number;
  /** Plattform: umgekehrt – steht anfangs ausgefahren und fährt ein, wenn ihr Schalter umgelegt wird */
  inverted?: boolean;
  /** Tür ↔ Schlüssel bzw. Schalter/Druckplatte ↔ Plattform gehören über `group` zusammen */
  group?: string;
  /** Kennzeichen 1–3 für zusammengehörige Schlüssel und Türen (Zahl der Kerben/Punkte, keine Farbe) */
  mark?: number;
  /** eigener Objektkontrast 0–1 (überschreibt den Klassenwert aus `difficulty.contrast`) */
  contrast?: number;
  /** Gefahr: Bahn der wandernden Gefahr (hin und zurück, Start = erstes Feld = x/y) */
  patrol?: Cell[];
}

/** Ein Paar binokularer Information: Teil A sieht nur das amblyope Auge, Teil B nur das dominante */
export interface BinocularPair {
  amblyopic: string[];
  fellow: string[];
  /** kurze Beschreibung für Doku/Debug */
  note: string;
}

export interface LevelDef {
  id: string;
  number: number;
  /** Schlüssel des Levelnamens in texts.ts */
  nameKey: string;
  /**
   * Feldraster, eine Zeichenkette je Zeile:
   *  R = Fels, D = Erde (grabbar), . = Luft, L = Luft mit Leiter (Leiter: Klasse aus `ladderEye`)
   */
  map: string[];
  ladderEye: EyeVisibility;
  objects: LevelObjectDef[];
  /** Zahl der Kristalle, die zur Basis gebracht werden müssen */
  requiredCrystals: number;
  /** Fehlversuche, die für den Fehler-Stern höchstens erlaubt sind */
  maxFailuresForStar: number;
  difficulty: DifficultyParams;
  pairs: BinocularPair[];
  /** Roboter, die der automatische Löser steuert (Level 4 und 10: zwei, die zusammenarbeiten müssen) */
  solverRobots: string[];
}
