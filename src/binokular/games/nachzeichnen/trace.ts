/**
 * Zeichenlogik von „Nachzeichnen“ (rein, ohne DOM): Zustandsautomat für Stift, Linie, Fortschritt, Fehler und
 * Wertung. Eingabe sind nur Stiftpunkte in Spielkoordinaten; Zeit und Farben kennt dieses Modul nicht.
 *
 * Regeln:
 *  - Zeichnen beginnt nur im Startkreis (Radius START_RADIUS). Nach dem Absetzen geht es nur dort weiter, wo die
 *    Linie endete (Radius RESUME_RADIUS); sonst gibt es einen Hinweis.
 *  - Fortschritt = nächstgelegener Pfadpunkt in einem kleinen Fenster vor dem bisherigen Fortschritt. Der Index
 *    wächst je Stiftpunkt nur in kleinen Schritten (MAX_STEP_PX Bogenlänge), und lange Stiftbewegungen werden in
 *    Teilschritte (STEP_PX) zerlegt: Abkürzungen zählen nicht.
 *  - Toleranzzone: Abstand ≤ halbe Pfadbreite + Rand → „genau“. Fehlergrenze: Abstand > Fehlerabstand. Beim
 *    Überschreiten wird genau EIN Fehler gezählt (nicht je Pixel), die Linie wird unterbrochen, Punkte außerhalb
 *    werden weder gezeichnet noch gewertet. Weiter geht es erst, wenn der Stift wieder im Rückkehrradius um den
 *    letzten gültigen Punkt ist (und nicht jenseits der Fehlergrenze).
 *  - Ziel erreicht: Fortschritt am Pfadende und Stift im Zielring.
 *  - Fehlerlimit (optional): danach ist die Runde zu Ende.
 */
import { dist, nearestInWindow, SAMPLE_SPACING, type Pt, type TracePath } from './path';
import { GOAL_RADIUS, RESUME_RADIUS, START_RADIUS, TOLERANCE_MARGIN } from './settings';

/** Teilschritt bei langen Stiftbewegungen (px) */
export const STEP_PX = 4;
/** größter Fortschritt je Teilschritt (px Bogenlänge) – größere Sprünge im Pfad zählen nicht */
export const MAX_STEP_PX = 10;
/** Rückwärtsfenster der Nächster-Punkt-Suche (px Bogenlänge), damit Kehrtwenden nicht „klemmen“ */
const BACK_PX = 12;

export type PenStatus =
  /** noch keine Linie */
  | 'ready'
  /** Stift unten, Linie wächst */
  | 'drawing'
  /** Stift abgesetzt, Linie steht */
  | 'lifted'
  /** Fehlergrenze überschritten: Stift muss zum Linienende zurück */
  | 'error';

export type TraceEvent =
  | { type: 'start' }
  | { type: 'resume' }
  | { type: 'error' }
  | { type: 'goal' }
  | { type: 'limit' }
  /** Hinweis (Schlüssel in texts.ts): Stift am falschen Ort angesetzt */
  | { type: 'hint'; key: 'start' | 'resume' };

export interface TraceConfig {
  pathWidth: number;
  errorDist: number;
  errorLimit: number;
}

export interface TraceState {
  status: PenStatus;
  penDown: boolean;
  /** Fortschrittsindex im abgetasteten Pfad (0 … pts.length − 1) */
  progress: number;
  /** gezeichnete Linie: Abschnitte (Stift-Striche), jeder eine Folge gültiger Punkte */
  strokes: Pt[][];
  /** letzter gültiger Punkt der Linie */
  lastValid: Pt | null;
  /** letzter Stiftpunkt (für Teilschritte) */
  lastPen: Pt | null;
  errors: number;
  /** gewertete Punkte (gültig, innerhalb der Fehlergrenze) */
  samples: number;
  /** davon in der Toleranzzone */
  inTolerance: number;
  /** Summe der Abstände zum Pfad (px) */
  devSum: number;
  /** gezeichnete Strecke insgesamt (px) */
  drawnPx: number;
  finished: null | 'goal' | 'limit';
}

export function newTrace(): TraceState {
  return { status: 'ready', penDown: false, progress: 0, strokes: [], lastValid: null, lastPen: null, errors: 0, samples: 0, inTolerance: 0, devSum: 0, drawnPx: 0, finished: null };
}

export const toleranceOf = (pathWidth: number): number => pathWidth / 2 + TOLERANCE_MARGIN;

const windowPts = (px: number) => Math.ceil(px / SAMPLE_SPACING);

/** Genauigkeit in % (Anteil gewerteter Punkte in der Toleranzzone); ohne Punkte 100 */
export function accuracyOf(s: Pick<TraceState, 'samples' | 'inTolerance'>): number {
  return s.samples === 0 ? 100 : (s.inTolerance / s.samples) * 100;
}

/** durchschnittliche Abweichung vom Pfad in px; ohne Punkte 0 */
export function avgDeviationOf(s: Pick<TraceState, 'samples' | 'devSum'>): number {
  return s.samples === 0 ? 0 : s.devSum / s.samples;
}

/**
 * Abstand eines Punkts zum Pfad: zuerst im kleinen Fenster um den Fortschritt (vorwärts höchstens MAX_STEP_PX).
 * Liegt der Punkt dort zu weit weg, zählt der bereits gezeichnete Teil (Zurückfahren auf der eigenen Linie ist kein
 * Fehler, bringt aber keinen Fortschritt); der noch nicht erreichte Teil des Pfads zählt nicht (Abkürzungen).
 */
function probe(path: TracePath, progress: number, p: Pt, errorDist: number): { index: number; dist: number } {
  const f = nearestInWindow(path.pts, p, progress - windowPts(BACK_PX), progress + windowPts(MAX_STEP_PX));
  if (f.dist > errorDist && progress > 0) {
    const b = nearestInWindow(path.pts, p, 0, progress);
    if (b.dist < f.dist) return b;
  }
  return f;
}

function currentStroke(s: TraceState): Pt[] {
  if (s.strokes.length === 0) s.strokes.push([]);
  return s.strokes[s.strokes.length - 1];
}

/** Stift aufsetzen. Gibt Ereignisse zurück (ändert `s`). */
export function penDown(s: TraceState, path: TracePath, cfg: TraceConfig, p: Pt): TraceEvent[] {
  const ev: TraceEvent[] = [];
  if (s.finished) return ev;
  s.penDown = true;
  s.lastPen = p;
  if (s.status === 'ready') {
    if (dist(p, path.start) <= START_RADIUS) {
      s.status = 'drawing';
      s.lastValid = { ...path.start };
      s.strokes.push([{ ...path.start }]);
      ev.push({ type: 'start' });
    } else {
      s.penDown = true;
      ev.push({ type: 'hint', key: 'start' });
    }
    return ev;
  }
  if ((s.status === 'lifted' || s.status === 'error') && s.lastValid) {
    const near = dist(p, s.lastValid) <= RESUME_RADIUS;
    if (near && probe(path, s.progress, p, cfg.errorDist).dist <= cfg.errorDist) {
      s.status = 'drawing';
      s.strokes.push([{ ...s.lastValid }]);
      ev.push({ type: 'resume' });
    } else {
      ev.push({ type: 'hint', key: 'resume' });
    }
  }
  return ev;
}

/** Stift abheben */
export function penUp(s: TraceState): void {
  s.penDown = false;
  s.lastPen = null;
  if (s.status === 'drawing') s.status = 'lifted';
}

/** Stift bewegt: in Teilschritten verarbeiten. Gibt Ereignisse zurück (ändert `s`). */
export function penMove(s: TraceState, path: TracePath, cfg: TraceConfig, p: Pt): TraceEvent[] {
  const ev: TraceEvent[] = [];
  if (s.finished || !s.penDown) return ev;
  const from = s.lastPen ?? p;
  const d = dist(from, p);
  const n = Math.max(1, Math.ceil(d / STEP_PX));
  for (let i = 1; i <= n && !s.finished; i++) {
    const q = n === 1 ? p : { x: from.x + ((p.x - from.x) * i) / n, y: from.y + ((p.y - from.y) * i) / n };
    stepPoint(s, path, cfg, q, ev);
  }
  s.lastPen = p;
  return ev;
}

function stepPoint(s: TraceState, path: TracePath, cfg: TraceConfig, q: Pt, ev: TraceEvent[]): void {
  if (s.status === 'ready') {
    // Stift wurde außerhalb aufgesetzt und gleitet in den Startkreis
    if (dist(q, path.start) <= START_RADIUS) {
      s.status = 'drawing';
      s.lastValid = { ...path.start };
      s.strokes.push([{ ...path.start }]);
      ev.push({ type: 'start' });
    }
    return;
  }
  const hit = probe(path, s.progress, q, cfg.errorDist);
  if (s.status === 'error' || s.status === 'lifted') {
    // erst zurück zum Linienende (Rückkehrradius), nicht jenseits der Fehlergrenze
    if (s.lastValid && dist(q, s.lastValid) <= RESUME_RADIUS && hit.dist <= cfg.errorDist) {
      s.status = 'drawing';
      s.strokes.push([{ ...s.lastValid }]);
      ev.push({ type: 'resume' });
    }
    return;
  }
  // status 'drawing'
  if (hit.dist > cfg.errorDist) {
    s.status = 'error';
    s.errors++;
    ev.push({ type: 'error' });
    if (cfg.errorLimit > 0 && s.errors >= cfg.errorLimit) {
      s.finished = 'limit';
      ev.push({ type: 'limit' });
    }
    return;
  }
  // gültiger Punkt: Fortschritt in kleinen Schritten, Linie, Wertung
  const maxIdx = s.progress + windowPts(MAX_STEP_PX);
  if (hit.index > s.progress) s.progress = Math.min(hit.index, maxIdx, path.pts.length - 1);
  const prev = s.lastValid;
  if (prev) s.drawnPx += dist(prev, q);
  currentStroke(s).push({ x: q.x, y: q.y });
  s.lastValid = { x: q.x, y: q.y };
  s.samples++;
  s.devSum += hit.dist;
  if (hit.dist <= toleranceOf(cfg.pathWidth)) s.inTolerance++;
  if (s.progress >= path.pts.length - 1 - 1 && dist(q, path.goal) <= GOAL_RADIUS) {
    s.finished = 'goal';
    ev.push({ type: 'goal' });
  }
}

/** Linie löschen: neu beginnen am Startpunkt; Fehler- und Wertungszähler der Runde bleiben (Sessionwerte) */
export function clearLine(s: TraceState): void {
  s.status = 'ready';
  s.penDown = false;
  s.progress = 0;
  s.strokes = [];
  s.lastValid = null;
  s.lastPen = null;
  s.finished = null;
}
