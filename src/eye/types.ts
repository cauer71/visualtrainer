// EYE-EXPERIMENT: gemeinsame Typen des Blickschätzungs-Experiments (nur src/eye/ nutzt sie).

export interface Pt {
  x: number;
  y: number;
}
export interface Size {
  w: number;
  h: number;
}
/** Landmark wie von MediaPipe: x/y normiert auf das Kamerabild (0..1), z relativ. */
export interface Landmark {
  x: number;
  y: number;
  z: number;
}
/** Viertel des Bildschirms: oben links, oben rechts, unten links, unten rechts. */
export type Quadrant = 'tl' | 'tr' | 'bl' | 'br';

/** Ein Blickpunkt-Ergebnis des Trackers (Bildschirm = Fenster der Seite, in CSS-Pixeln). */
export interface GazeSample {
  /** performance.now() des Kamerabilds in ms */
  t: number;
  /** geglättet, in Fenster-Pixeln */
  x: number;
  y: number;
  /** geglättet, normiert 0..1 (Fensterbreite/-höhe) */
  nx: number;
  ny: number;
  /** ungeglättet, normiert */
  rawNx: number;
  rawNy: number;
  /** Viertel, in dem der geglättete Punkt liegt (null, wenn außerhalb des Fensters) */
  quadrant: Quadrant | null;
}
