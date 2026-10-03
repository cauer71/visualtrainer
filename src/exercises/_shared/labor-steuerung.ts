/**
 * Seitliche Steuerung für Übungen mit Bewegung nach links und rechts (Slalom, Invasoren): Zeiger (Maus/Finger),
 * Pfeiltasten (auch A und D) oder Gerätekippen. Reine Logik und eine kleine Klasse, die Ereignisse eines
 * übergebenen Ziels (im Browser `window`) abonniert; ohne Ziel (Tests, Node) bleibt nur der Zeiger.
 *
 * Gerätekippen (DeviceOrientation):
 * - Auf iOS/iPadOS fragt der Browser erst nach, wenn die Person es erlaubt (`DeviceOrientationEvent.requestPermission`,
 *   nur aus einer Berührung heraus). Die Übung ruft `requestTilt()` deshalb nur nach einem Tippen der Person auf.
 * - Andere Geräte liefern die Ereignisse ohne Nachfrage; Rechner ohne Sensor liefern keine oder leere Werte.
 *   Kommt kein gültiger Wert, fällt die Übung auf Zeiger/Pfeiltasten zurück (Entscheidung in der Übung).
 * - Gemessen wird die Neigung der Bildschirmfläche nach links/rechts, bezogen auf die Haltung beim Start (`recenter()`):
 *   Kippwinkel aus `gamma` (Hochformat) bzw. `beta` (Querformat), je nach Bildschirmdrehung.
 * - Es verlassen keine Daten das Gerät; die Werte werden nur für die Steuerung gelesen, nicht gespeichert.
 *
 * Gegenüber dem Labor-Prototyp: Kippen ist relativ zur Startlage (nicht absolut), vollen Ausschlag gibt es ab ±20° statt ±25°,
 * die Querformat-Drehung wird berücksichtigt, die Position wird so begrenzt, dass die Figur ganz im Feld bleibt (`margin`).
 */

export type SteerKind = 'pointer' | 'keys' | 'tilt';

/** Eingabe pro Bild: absolute Position (Anteil der Feldbreite 0..1) oder Achse (−1 links … 1 rechts); null = unverändert */
export type SteerInput = { mode: 'position'; x: number } | { mode: 'axis'; a: number } | null;

/** Kippwinkel (Grad) bis zu dem nichts passiert */
export const TILT_DEAD_DEG = 2;
/** Kippwinkel (Grad) für den vollen Ausschlag */
export const TILT_FULL_DEG = 20;

const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));

/** Pfeiltasten (und A/D) → Achse −1, 0 oder 1 */
export function axisFromKeys(down: { left: boolean; right: boolean }): number {
  return (down.right ? 1 : 0) - (down.left ? 1 : 0);
}

/** Kippwinkel (Grad, links negativ) → Achse −1..1; kleine Winkel werden ausgeblendet, ab `TILT_FULL_DEG` Vollausschlag */
export function axisFromTilt(deg: number | null | undefined): number {
  if (typeof deg !== 'number' || !Number.isFinite(deg)) return 0;
  if (Math.abs(deg) < TILT_DEAD_DEG) return 0;
  const v = (Math.abs(deg) - TILT_DEAD_DEG) / (TILT_FULL_DEG - TILT_DEAD_DEG);
  return clamp(Math.sign(deg) * v, -1, 1);
}

/**
 * Neigung der Bildschirmfläche nach rechts (Grad, rechts positiv) aus den Lagewinkeln des Geräts und der Drehung des
 * Bildschirms (0, 90, 180, 270). Hochformat: `gamma`; Querformat: `beta` (Drehung 90) bzw. −`beta` (Drehung 270).
 */
export function screenTiltDeg(beta: number, gamma: number, screenAngle: number): number {
  const a = ((Math.round(screenAngle / 90) * 90) % 360 + 360) % 360;
  if (a === 90) return beta;
  if (a === 180) return -gamma;
  if (a === 270) return -beta;
  return gamma;
}

/** Kleinste Winkeldifferenz in Grad (−180..180) */
export function angleDiff(a: number, b: number): number {
  let d = (a - b) % 360;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
}

/**
 * Wendet eine Eingabe auf die Position x (cm) an. `maxSpeed` in cm/s, `dt` in s, `W` Feldbreite in cm, `margin` = Abstand
 * zum Rand (cm), den die Figur nie unterschreitet (Radius der Figur).
 */
export function applySteering(x: number, input: SteerInput, dt: number, maxSpeed: number, W: number, margin = 0): number {
  const lo = Math.min(margin, W / 2);
  const hi = Math.max(W - margin, W / 2);
  let nx = x;
  if (input && input.mode === 'position' && Number.isFinite(input.x)) nx = lo + clamp(input.x, 0, 1) * (hi - lo);
  else if (input && input.mode === 'axis' && Number.isFinite(input.a)) nx = x + clamp(input.a, -1, 1) * maxSpeed * dt;
  return clamp(nx, lo, hi);
}

// ---------------------------------------------------------------------------

/** Das, was die Klasse vom Ziel (Fenster) braucht – damit sie ohne Browser getestet werden kann */
export interface EventTargetLike {
  addEventListener(type: string, fn: (ev: any) => void): void; // eslint-disable-line @typescript-eslint/no-explicit-any
  removeEventListener(type: string, fn: (ev: any) => void): void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * Stand des Kippens: `off` (nicht gewählt), `idle` (noch nicht angefragt), `asking` (Nachfrage läuft), `listening` (erlaubt,
 * wartet auf den ersten gültigen Wert), `ready` (Werte kommen), `denied` (abgelehnt), `unsupported` (kein Sensor/Browser).
 */
export type TiltStatus = 'off' | 'idle' | 'asking' | 'listening' | 'ready' | 'denied' | 'unsupported';

/** Ergebnis von `requestTilt()`; `retry` = der Browser wollte die Anfrage nicht (keine Berührung): später noch einmal versuchen */
export type TiltRequest = 'listening' | 'denied' | 'unsupported' | 'retry';

export interface SteeringOptions {
  /** Aktive Steuerungen; die erste ist die gewählte */
  kinds: readonly SteerKind[];
  /** Ziel der Tasten- und Kippereignisse (im Browser `window`); ohne Ziel gibt es nur den Zeiger */
  target?: EventTargetLike | null;
  /** Drehung des Bildschirms in Grad (Standard: aus `screen.orientation`) */
  screenAngle?: () => number;
  /** Erlaubnis anfragen; `null` = nicht nötig (Standard: `DeviceOrientationEvent.requestPermission`, falls es das gibt) */
  requestPermission?: (() => Promise<string>) | null;
  /** Gibt es Kippereignisse überhaupt? (Standard: `DeviceOrientationEvent` vorhanden) */
  tiltAvailable?: boolean;
}

const KEY_LEFT = new Set(['ArrowLeft', 'a', 'A']);
const KEY_RIGHT = new Set(['ArrowRight', 'd', 'D']);

interface TiltEventLike {
  beta?: number | null;
  gamma?: number | null;
}

function defaultAngle(): number {
  const g = globalThis as { screen?: { orientation?: { angle?: number } }; orientation?: number };
  const a = g.screen?.orientation?.angle ?? g.orientation ?? 0;
  return typeof a === 'number' && Number.isFinite(a) ? a : 0;
}

function defaultPermission(): (() => Promise<string>) | null {
  const D = (globalThis as { DeviceOrientationEvent?: { requestPermission?: () => Promise<string> } }).DeviceOrientationEvent;
  return D && typeof D.requestPermission === 'function' ? () => D.requestPermission!() : null;
}

/** Steuerung: liest je Bild `read()` und gibt die Eingabe der gewählten Steuerung zurück. */
export class Steering {
  private kinds: SteerKind[];
  private readonly target: EventTargetLike | null;
  private readonly angle: () => number;
  private readonly permission: (() => Promise<string>) | null;
  private readonly tiltOk: boolean;
  private readonly subs: Array<() => void> = [];
  private down = { left: false, right: false };
  private ptr = 0.5;
  private ptrUsed = false;
  private neutral: number | null = null;
  private rawTilt: number | null = null;
  private tiltRel = 0;
  private tiltSub = false;
  status: TiltStatus;

  constructor(o: SteeringOptions) {
    this.kinds = [...o.kinds];
    this.target = o.target ?? null;
    this.angle = o.screenAngle ?? defaultAngle;
    this.permission = o.requestPermission === undefined ? defaultPermission() : o.requestPermission;
    this.tiltOk = o.tiltAvailable ?? (typeof (globalThis as { DeviceOrientationEvent?: unknown }).DeviceOrientationEvent !== 'undefined');
    this.status = this.kinds.includes('tilt') ? 'idle' : 'off';
    if (this.target) {
      const t = this.target;
      const key = (v: boolean) => (ev: { key?: string; preventDefault?: () => void }) => {
        const k = ev.key ?? '';
        if (KEY_LEFT.has(k)) {
          this.down.left = v;
          ev.preventDefault?.();
        } else if (KEY_RIGHT.has(k)) {
          this.down.right = v;
          ev.preventDefault?.();
        }
      };
      const kd = key(true);
      const ku = key(false);
      t.addEventListener('keydown', kd);
      t.addEventListener('keyup', ku);
      this.subs.push(() => t.removeEventListener('keydown', kd), () => t.removeEventListener('keyup', ku));
    }
  }

  /** Welche Steuerungen gerade gelten (die erste ist die gewählte) */
  get active(): readonly SteerKind[] {
    return this.kinds;
  }

  /** Auf andere Steuerungen wechseln (z. B. nach abgelehntem Kippen auf Zeiger und Tasten) */
  setActive(kinds: readonly SteerKind[]): void {
    this.kinds = [...kinds];
  }

  /** Zeigerposition als Anteil der Feldbreite (0..1) */
  pointer(frac: number): void {
    if (!Number.isFinite(frac)) return;
    this.ptr = clamp(frac, 0, 1);
    this.ptrUsed = true;
  }

  /** Neigung in Grad relativ zur Startlage (rechts positiv); 0 ohne Sensor */
  get tiltDeg(): number {
    return this.tiltRel;
  }

  /** Gerät in der jetzigen Haltung als „Mitte“ nehmen */
  recenter(): void {
    if (this.rawTilt !== null) this.neutral = this.rawTilt;
    this.tiltRel = 0;
  }

  private onTilt = (ev: TiltEventLike): void => {
    const beta = ev.beta;
    const gamma = ev.gamma;
    if (typeof beta !== 'number' || typeof gamma !== 'number' || !Number.isFinite(beta) || !Number.isFinite(gamma)) return;
    const raw = screenTiltDeg(beta, gamma, this.angle());
    this.rawTilt = raw;
    if (this.neutral === null) this.neutral = raw;
    this.tiltRel = angleDiff(raw, this.neutral);
    if (this.status === 'listening' || this.status === 'asking') this.status = 'ready';
  };

  private listenTilt(): void {
    if (this.tiltSub || !this.target) return;
    this.tiltSub = true;
    const t = this.target;
    t.addEventListener('deviceorientation', this.onTilt);
    this.subs.push(() => t.removeEventListener('deviceorientation', this.onTilt));
  }

  /**
   * Kippen einschalten: erst die Erlaubnis anfragen (falls nötig), dann auf Werte warten. Nur aus einer Berührung der
   * Person aufrufen. Ergebnis `listening` heißt: erlaubt – ob wirklich Werte kommen, zeigt `status === 'ready'`.
   */
  async requestTilt(): Promise<TiltRequest> {
    if (!this.kinds.includes('tilt')) return 'unsupported';
    if (!this.target || !this.tiltOk) {
      this.status = 'unsupported';
      return 'unsupported';
    }
    if (this.status === 'ready' || this.status === 'listening') return 'listening';
    if (this.permission) {
      this.status = 'asking';
      try {
        const r = await this.permission();
        if (r !== 'granted') {
          this.status = 'denied';
          return 'denied';
        }
      } catch (e) {
        const name = (e as { name?: string } | null)?.name;
        if (name === 'NotAllowedError' || name === 'SecurityError') {
          this.status = 'idle';
          return 'retry';
        }
        this.status = 'unsupported';
        return 'unsupported';
      }
    }
    this.listenTilt();
    if ((this.status as TiltStatus) !== 'ready') this.status = 'listening';
    return 'listening';
  }

  /** Eingabe dieses Bildes */
  read(): SteerInput {
    if (this.kinds.includes('keys')) {
      const a = axisFromKeys(this.down);
      if (a !== 0) {
        this.ptrUsed = false; // der Zeiger übernimmt erst wieder, wenn er sich bewegt
        return { mode: 'axis', a };
      }
    }
    if (this.kinds.includes('tilt') && this.status === 'ready') return { mode: 'axis', a: axisFromTilt(this.tiltRel) };
    if (this.kinds.includes('pointer') && this.ptrUsed) return { mode: 'position', x: this.ptr };
    return null;
  }

  dispose(): void {
    for (const f of this.subs) f();
    this.subs.length = 0;
    this.tiltSub = false;
  }
}
