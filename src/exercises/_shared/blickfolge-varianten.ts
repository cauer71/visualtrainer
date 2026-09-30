/**
 * Gemeinsamer Unterbau für Blickfolge-Übungen mit Zeichenaufgabe, bei denen sich ein Ziel frei über
 * das Feld bewegt („Tempo-Wechsel“, „Nachzieh-Spur“, „Richtungschaos“, „Dunkelphasen“).
 *
 * Aufbauend auf `SignExercise` (Antwortleiste, Landolt-Ring, Staircase, Intro-Film, Autoplay) und
 * `MotionPath` (gleichmäßiger Lauf mit weichem Ausweichen vor dem Rand). Was hier dazukommt:
 *
 * - `FreeFlightExercise`: Ziel + Feld + weich nachgeführtes Tempo und Zeichengröße; Unterklassen
 *   legen nur fest, WANN etwas passiert (Wechsel, Dunkelphase, Zeichen).
 * - Hilfen zur Sicherheit des Zeichens: Das Zeichen erscheint nur, wenn das Ziel noch genug freie
 *   Strecke vor sich hat (`roomAhead`) – es dreht also während der Anzeige nicht am Rand um.
 * - `turnToOpen`: sucht den kleinsten weichen Bogen, nach dem wieder genug Platz geradeaus ist.
 *
 * Reine Helfer (`wallMargin`, `turnToOpen`) ohne Canvas – per Unit-Test prüfbar.
 */
import { circle, glow } from '../../core/draw';
import { clamp } from '../../core/stats';
import type { ExerciseContext } from '../../core/types';
import { approach, deg, type Field, freeDistance, makeField, MotionPath, type Pt } from './freibahn';
import { BALL, ballRadiusFor, type BarLayout, type SignConfig, SignExercise, signSizeFor } from './zeichenaufgabe';

/** Anzeigedauer des Zeichens im Intro-Film (gleich wie in `zeichenaufgabe.ts`) */
const DEMO_SHOW_MS = 900;
/** Sicherheitsnetz: Findet sich auf kleiner Bühne nie ein freies Fenster, geht es nach dieser Zeit trotzdem weiter */
export const ROOM_WAIT_MAX_MS = 3500;
/** Dauer des weichen Lenk-Bogens zur freien Seite (ms) */
export const STEER_MS = 900;

/**
 * Abstand vor einer Wand, ab dem `MotionPath` weich beidreht (gleiche Formel wie dort:
 * 2 · Mindestkurvenradius + 50 ms Vorausschau). Vor der Wand darf das Zeichen nicht mehr erscheinen.
 */
export function wallMargin(f: Field, speed: number): number {
  const minDim = Math.max(1, Math.min(f.maxX - f.minX, f.maxY - f.minY));
  const R = clamp(minDim * 0.22, 1, Math.max(1, speed * 0.9));
  return R * 2 + speed * 0.05;
}

/** Freie Strecke geradeaus (px) bis zum Beginn des Beidrehens vor dem Rand; nie negativ */
export function roomFor(f: Field, p: Pt, theta: number, speed: number): number {
  return Math.max(0, freeDistance(f, p.x, p.y, theta) - wallMargin(f, speed));
}

/**
 * Drehwinkel (Radiant, mit Vorzeichen), nach dem es geradeaus mindestens `need` px weit frei ist.
 * Gewählt wird der kleinste dafür nötige Winkel (in 15°-Schritten, bei gleichem Betrag die Seite mit
 * mehr Platz); reicht nirgends der Platz, der Winkel mit der größten freien Strecke.
 */
export function turnToOpen(f: Field, p: Pt, theta: number, need: number, speed: number): number {
  let best = 0;
  let bestRoom = -1;
  for (let k = 0; k <= 12; k++) {
    const signs = k === 0 ? [1] : [1, -1];
    const cand = signs.map((s) => {
      const delta = s * deg(15 * k);
      return { delta, room: roomFor(f, p, theta + delta, speed) };
    });
    cand.sort((a, b) => b.room - a.room);
    if (cand[0].room >= need) return cand[0].delta;
    if (cand[0].room > bestRoom) {
      bestRoom = cand[0].room;
      best = cand[0].delta;
    }
  }
  return best;
}

export abstract class FreeFlightExercise extends SignExercise {
  protected readonly path = new MotionPath();
  /** weich nachgeführtes Grundtempo in px/s */
  protected speedNow = 0;
  /** weich nachgeführte Zeichengröße in px */
  protected signNow = 40;

  constructor(ctx: ExerciseContext, cfg: SignConfig) {
    super(ctx, cfg);
  }

  // ---- von Unterklassen -------------------------------------------------

  /** Grundtempo in u/s (1 u = 1 % der kürzeren Seite) */
  protected abstract baseSpeed(level: number): number;
  /** Ziel platzieren (`this.place`), Ereignisse planen */
  protected abstract flightStart(t: number): void;
  /** Pro Frame nach der Bewegung: Ereignisse steuern, ggf. `beginSign(t)` */
  protected abstract flightUpdate(dt: number, t: number): void;
  /** Nach einem Durchgang: nächstes Ereignis planen */
  protected abstract flightTrialDone(t: number): void;

  /** Faktor auf das Tempo (Tempo-Wechsel) */
  protected speedFactor(): number {
    return 1;
  }

  /** Sichtbarkeit des Ziels 0..1 (Dunkelphasen) */
  protected ballAlpha(): number {
    return 1;
  }

  /** Stärke des Leuchtsaums (0 = keiner) */
  protected ballGlow(): number {
    return 0.45;
  }

  /** hinter dem Ziel zeichnen (Spur) */
  protected renderBehind(_g: CanvasRenderingContext2D, _t: number): void {}

  /** über dem Ziel zeichnen (nur Ergänzungen; das Zeichen malt die Basis) */
  protected renderAbove(_g: CanvasRenderingContext2D, _t: number, _alpha: number): void {}

  /** Bewegung für dt Sekunden (Unterklassen mit eigener Richtungsführung überschreiben) */
  protected move(dt: number): void {
    this.path.step(dt, this.speedPx);
  }

  // ---- gemeinsam --------------------------------------------------------

  /** aktuelles Tempo in px/s */
  protected get speedPx(): number {
    return this.speedNow * this.speedFactor();
  }

  /** Ziel an normierter Position (0..1 im Feld) mit Richtung theta (Radiant) platzieren */
  protected place(fx: number, fy: number, theta: number): void {
    const f = this.path.field;
    this.path.place(f.minX + (f.maxX - f.minX) * fx, f.minY + (f.maxY - f.minY) * fy, theta);
  }

  /**
   * Größte freie Strecke (px), die das Feld überhaupt bietet: der beste Strahl aus der Feldmitte
   * (abzüglich Beidrehbereich), zu 80 %. Begrenzt die Anforderung auf sehr kleinen Bühnen, damit dort
   * nicht ewig auf ein Fenster gewartet wird.
   */
  protected roomCap(): number {
    const f = this.path.field;
    const c = { x: (f.minX + f.maxX) / 2, y: (f.minY + f.maxY) / 2 };
    let best = 0;
    for (let k = 0; k < 16; k++) best = Math.max(best, roomFor(f, c, (k / 16) * Math.PI * 2, this.speedPx));
    return best * 0.8;
  }

  /** Nötige freie Strecke (px) für `seconds` Sekunden geradeaus, begrenzt durch `roomCap` */
  protected needPx(seconds: number): number {
    return Math.min(this.speedPx * seconds, this.roomCap());
  }

  /** Reicht die freie Strecke geradeaus für `seconds` Sekunden Weg (mit Beidrehbereich)? */
  protected roomAhead(seconds: number): boolean {
    return roomFor(this.path.field, this.path, this.path.theta, this.speedPx) >= this.needPx(seconds);
  }

  /** Anzeigedauer des Zeichens in s (Intro-Film: fest) */
  protected showSeconds(): number {
    return (this.demo ? DEMO_SHOW_MS : this.cfg.exposureFor(this.stair.level)) / 1000;
  }

  /**
   * Darf das Zeichen jetzt erscheinen? Nur wenn das Ziel während der Anzeige nicht an den Rand kommt;
   * `waitedMs` = seit wann gewartet wird (nach `ROOM_WAIT_MAX_MS` geht es auch so).
   */
  protected signRoom(waitedMs: number): boolean {
    return this.roomAhead(this.showSeconds() * 1.1) || waitedMs >= ROOM_WAIT_MAX_MS;
  }

  /**
   * Reicht die freie Strecke für das Zeichen nicht, das Ziel in einem weichen Bogen (nicht während eines
   * anderen Bogens) zur freieren Seite lenken; danach wird erneut geprüft.
   */
  protected steerForSign(): void {
    if (this.path.turning) return;
    this.steerOpen(this.showSeconds() * 1.1);
  }

  /** Bogen zur freieren Seite, falls für `seconds` Sekunden geradeaus nicht genug Platz ist (nicht während eines Bogens) */
  protected steerOpen(seconds: number): void {
    if (this.path.turning) return;
    const need = this.needPx(seconds);
    const f = this.path.field;
    if (roomFor(f, this.path, this.path.theta, this.speedPx) >= need) return;
    const delta = turnToOpen(f, this.path, this.path.theta, need, this.speedPx);
    if (Math.abs(delta) > 1e-3) this.path.startTurn(delta, STEER_MS);
  }

  protected onLayout(L: BarLayout): void {
    const { u } = this.ctx.stage;
    const r = ballRadiusFor(signSizeFor(1, u));
    const m = Math.max(6, u * 1.2) + r;
    this.path.setField(makeField(L.world.x0 + m, L.world.x1 - m, L.world.y0 + m, L.world.y1 - m));
  }

  protected worldStart(t: number): void {
    const { stage } = this.ctx;
    this.speedNow = this.baseSpeed(this.level) * stage.u;
    this.signNow = signSizeFor(this.level, stage.u);
    this.flightStart(t);
  }

  protected worldUpdate(dt: number, t: number): void {
    const { u } = this.ctx.stage;
    this.speedNow = approach(this.speedNow, this.baseSpeed(this.level) * u, dt, 0.6);
    this.signNow = approach(this.signNow, signSizeFor(this.level, u), dt, 0.4);
    this.move(dt);
    this.flightUpdate(dt, t);
  }

  protected onTrialDone(t: number): void {
    this.flightTrialDone(t);
  }

  protected signCenter(): { x: number; y: number } {
    return { x: this.path.x, y: this.path.y };
  }

  protected signDiameter(): number {
    return this.signNow;
  }

  protected worldRender(g: CanvasRenderingContext2D, t: number): void {
    this.renderBehind(g, t);
    const a = clamp(this.ballAlpha(), 0, 1);
    if (a > 0.003) {
      const r = ballRadiusFor(this.signNow);
      const gl = this.ballGlow();
      g.save();
      g.globalAlpha = a;
      if (gl > 0) glow(g, this.path.x, this.path.y, r, BALL, gl);
      circle(g, this.path.x, this.path.y, clamp(r, 1, 200), BALL);
      g.restore();
    }
    this.renderAbove(g, t, a);
  }
}
