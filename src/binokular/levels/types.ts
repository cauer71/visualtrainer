/**
 * Level als Daten. Ein Level besteht aus einem Feldraster (Zeichen je Feld), einer Objektliste mit Augenklasse
 * und Schwierigkeitsparametern. Weitere Level (2–10) werden als weitere Dateien `levelNN.ts` ergänzt.
 */
import type { EyeVisibility } from '../vision/color';

/**
 * Schwierigkeitsparameter (Spezifikation „progressive Schwierigkeit“). Mehrere unabhängige Größen,
 * damit Schwierigkeit nicht nur über Geschwindigkeit steigt.
 */
export interface DifficultyParams {
  /** Objektgröße relativ zum Feld (0,4–1). Im MVP genutzt. */
  objectSize: number;
  /** Objektkontraste je Klasse (0–1), werden mit den Augenkontrasten multipliziert. Im MVP genutzt. */
  contrast: { amblyopic: number; fellow: number; neutral: number; distractor: number };
  /** Robotertempo in Feldern pro Sekunde. Im MVP genutzt (ruhig, keine schnelle Action). */
  moveSpeed: number;
  /** Anzahl relevanter Objekte (Kristalle, Schlüssel, Schalter …), nur Beschreibung im MVP */
  objectCount: number;
  /** typischer Abstand zwischen zusammengehörigen Objekten in Feldern, nur Beschreibung im MVP */
  pairDistance: number;
  /** visuelle Ablenkung 0–1 (Zahl neutraler und augenspezifischer Deko-Steine). Im MVP genutzt. */
  distraction: number;
  /** Levelkomplexität 1–5 (Zahl der Arbeitsschritte). Im MVP genutzt: Richtzeit für den Zeitstern = 60 s × Komplexität. */
  complexity: number;
  /** benötigte Reaktionszeit in ms; null = keine Zeitbegrenzung je Aktion (MVP: null) */
  reactionTimeMs: number | null;
  /** gewünschte Dauer durchgehender binokularer Nutzung in Sekunden (Richtwert, nur Beschreibung im MVP) */
  binocularDurationS: number;
}

export interface LevelObjectDef {
  kind: 'robot' | 'key' | 'door' | 'switch' | 'platform' | 'crystal' | 'base' | 'hazard' | 'lamp' | 'ladder';
  id: string;
  x: number;
  y: number;
  eye: EyeVisibility;
  /** Plattform: Breite und Zielposition (eingefahren = x/y, ausgefahren = toX/toY) */
  w?: number;
  toX?: number;
  toY?: number;
  /** Tür ↔ Schlüssel bzw. Schalter ↔ Plattform gehören über `group` zusammen */
  group?: string;
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
  /** Roboter, den der automatische Löser steuert */
  solverRobot: string;
}
