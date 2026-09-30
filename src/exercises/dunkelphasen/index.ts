/**
 * Dunkelphasen – einer Kugel folgen, die weich ausblendet und unsichtbar weiterläuft, und nach dem
 * Wiederauftauchen ein Zeichen erkennen. SICHERE Fassung des Stroboskop-Originals.
 *
 * Vorbild: „Blickfolge mit Dunkelphasen / Strobe Prediction Pursuit“ (Katalog 409). Das Original lässt
 * einen Punkt im festen Takt hart blinken (je nach Gerät mehrere Blitze pro Sekunde, rot, mit Leuchtsaum)
 * und misst nichts. Hier ist es ausdrücklich NICHT das blinkende Original:
 *
 * - Das Ziel blendet SINUSFÖRMIG aus und wieder ein; jede Blende dauert mindestens 200 ms
 *   (`MIN_FADE_MS`, Halbwertszeit ≥ 200 ms).
 * - Dunkelphasen höchstens 1 pro 2 s (≤ 0,5 Hz, `MIN_PERIOD_MS`) – hart in `DarkCycle` begrenzt,
 *   im Test für alle Stufen geprüft.
 * - Kein Leuchtsaum, kein Rot, keine Vollflächeneffekte; Warnhinweis im Intro (`warning: 'flicker'`).
 * - Die Bewegung läuft im Dunkeln unsichtbar weiter (Vorhersage!); die Bahn bleibt dabei gerade
 *   (`turnToOpen`: das Ziel wird vorher zur freien Seite gelenkt). Erst nach dem Wiederauftauchen
 *   erscheint in der Kugel ein Landolt-Ring, den man per großem Button unten meldet.
 * - Stufen: Länge der Dunkelheit, Zeit bis zum Zeichen, Tempo, Zeichengröße und -dauer; auf den Stufen
 *   1–3 zeigt ein schwacher Umriss im Dunkeln als Einstiegshilfe, wo die Kugel ist.
 *
 * Ob die Augen wirklich im Dunkeln weiterlaufen, wird nicht gemessen – nur, ob das Zeichen erkannt wird.
 */
import { ring } from '../../core/draw';
import type { ExerciseContext, ExerciseDefinition } from '../../core/types';
import { deg } from '../_shared/freibahn';
import { FreeFlightExercise } from '../_shared/blickfolge-varianten';
import { ballRadiusFor } from '../_shared/zeichenaufgabe';
import {
  DarkCycle,
  darkTotalMs,
  drawWaitMs,
  exposureFor,
  fadeMsFor,
  holdMsFor,
  ringHelpFor,
  signDelayFor,
  speedFor,
} from './logic';
import { de, it } from './texts';

const TRIALS = 10;
const QUICK_TRIALS = 3;
const DEMO_TRIALS = 2;
const FIRST_MS: [number, number] = [1500, 2100];
const DEMO_FIRST_MS = 2000;
const DEMO_WAIT_MS = 1700;
const DEMO_SIGN_DELAY_MS = 650;
const DEMO_SHOW_MS = 900;
/** Sicherheitsnetz: nach dieser Wartezeit beginnt die Dunkelphase auch ohne freie Strecke */
const STEER_WAIT_MAX_MS = 5000;

type Sub = 'run' | 'dark' | 'pre' | 'busy';

class Dunkelphasen extends FreeFlightExercise {
  private readonly cycle = new DarkCycle();
  private sub: Sub = 'run';
  private darkAt = 0;
  private signAt = 0;
  private alpha = 1;

  constructor(ctx: ExerciseContext) {
    super(ctx, { trials: TRIALS, quickTrials: QUICK_TRIALS, demoTrials: DEMO_TRIALS, demoLevel: 3, exposureFor });
  }

  protected baseSpeed(level: number): number {
    return speedFor(level);
  }

  protected ballAlpha(): number {
    return this.alpha;
  }

  protected ballGlow(): number {
    return 0;
  }

  protected flightStart(t: number): void {
    const { rng } = this.ctx;
    this.place(rng.range(0.25, 0.75), rng.range(0.3, 0.7), this.demo ? deg(200) : rng.range(-Math.PI, Math.PI));
    this.sub = 'run';
    this.alpha = 1;
    this.darkAt = t + (this.demo ? DEMO_FIRST_MS : rng.range(FIRST_MS[0], FIRST_MS[1]));
  }

  /** Sekunden Weg, die das Ziel von Beginn der Dunkelphase bis Ende des Zeichens geradeaus braucht */
  private needSeconds(): number {
    const L = this.level;
    const dark = darkTotalMs(fadeMsFor(L), holdMsFor(L));
    const delay = this.demo ? DEMO_SIGN_DELAY_MS : signDelayFor(L);
    const show = this.demo ? DEMO_SHOW_MS : exposureFor(L);
    return (dark + delay + show) / 1000;
  }

  protected flightUpdate(_dt: number, t: number): void {
    if (this.sub === 'run') {
      if (!this.finished && this.phase === 'wait') {
        if (t >= this.darkAt && this.cycle.canStart(t)) this.tryDark(t);
        else this.steerOpen(this.needSeconds());
      }
    } else if (this.sub === 'dark') {
      if (!this.cycle.isActive(t)) {
        this.sub = 'pre';
        this.signAt = t + (this.demo ? DEMO_SIGN_DELAY_MS : signDelayFor(this.level));
      }
    } else if (this.sub === 'pre') {
      if (t >= this.signAt) {
        this.sub = 'busy';
        this.beginSign(t);
      }
    }
    this.alpha = this.cycle.alpha(t);
  }

  /** Dunkelphase beginnen, sobald das Ziel für die ganze Dauer geradeaus laufen kann; sonst weich zur freien Seite lenken */
  private tryDark(t: number): void {
    if (t - this.darkAt < STEER_WAIT_MAX_MS) {
      if (this.path.turning) return;
      if (!this.roomAhead(this.needSeconds())) {
        this.steerOpen(this.needSeconds());
        return;
      }
    }
    const L = this.level;
    // hartes Limit steckt in DarkCycle: Blende ≥ 200 ms, Abstand der Dunkelphasen ≥ 2 s
    if (this.cycle.start(t, fadeMsFor(L), holdMsFor(L))) {
      this.sub = 'dark';
      if (this.demo) this.ctx.hud.caption(this.ctx.texts.captions.dark, 'top');
    }
  }

  protected flightTrialDone(t: number): void {
    this.sub = 'run';
    this.darkAt = t + (this.demo ? DEMO_WAIT_MS : drawWaitMs(this.ctx.rng.next()));
  }

  /** Einstiegshilfe: schwacher Umriss an der wahren Position, nur im Dunkeln und nur auf niedrigen Stufen */
  protected renderAbove(g: CanvasRenderingContext2D, _t: number, alpha: number): void {
    const help = ringHelpFor(this.level);
    const a = help * (1 - alpha);
    if (a < 0.004) return;
    const r = ballRadiusFor(this.signNow);
    ring(g, this.path.x, this.path.y, r, `rgba(232,238,247,${a.toFixed(3)})`, 2.5, [5, 5]);
  }
}

export const dunkelphasen: ExerciseDefinition = {
  id: 'dunkelphasen',
  category: 'bewegung',
  minutes: 1,
  color: '#27508F',
  icon:
    '<circle cx="11" cy="24" r="6" fill="currentColor"/><circle cx="24" cy="24" r="6" fill="currentColor" opacity="0.4"/><circle cx="37" cy="24" r="6" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="3.6 3.6"/><path d="M6 38h36" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.5"/>',
  texts: { de, it },
  warning: 'flicker',
  showsLevel: true,
  create: (ctx) => new Dunkelphasen(ctx),
};
