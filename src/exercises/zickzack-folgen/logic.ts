/**
 * Zickzack folgen – reine Bewegungsregel (Katalog 513, „Zickzack-Nachführen“; Original: Kugel fährt in geraden, schrägen
 * Stücken über die Fläche und knickt unregelmäßig ab).
 *
 * Das Ziel läuft in geraden Teilstücken, die abwechselnd nach „schräg oben“ und „schräg unten“ zeigen, im Mittel quer über
 * das Feld und an den Rändern zurück. An jedem Knick ändert sich die Richtung um den Knickwinkel der Stufe – aber MIT Rundung
 * und kurzer Tempo-Senke (kein Sprung der Richtung, anders als im Original). Stufe: Knickwinkel wächst von ≈ 40° auf ≈ 110°,
 * Tempo steigt, die Teilstücke werden kürzer.
 *
 * Die Regel hängt nur von der Zeit ab (vorab gewürfelte Knickzeiten, Bahn einmal aufsummiert).
 */
import { clamp } from '../../core/stats';
import { blend, buildPath, keepInside, type PathTable } from '../_shared/folgen-bahn';
import { MAX_LEVEL, MIN_LEVEL, smoothstep, type RuleSetup, type TrackRule, type Vec } from '../_shared/nachfuehren-logic';

export const START_RAMP_S = 0.9;

const lv = (level: number) => clamp(Math.round(level), MIN_LEVEL, MAX_LEVEL);

/** Knickwinkel (Grad) zwischen zwei Teilstücken: 40° auf Stufe 1 … ≈ 111° auf Stufe 12 */
export function zigAngleDeg(level: number): number {
  return 40 + 6.5 * (lv(level) - 1);
}

/** Tempo (u/s): 7 … ≈ 15 */
export function zigSpeed(level: number): number {
  return 7 + 0.75 * (lv(level) - 1);
}

/** Mittlere Dauer eines Teilstücks (s): 2,0 … ≈ 1,0 */
export function zigLegSeconds(level: number): number {
  return 2.0 - 0.09 * (lv(level) - 1);
}

/** Dauer der Rundung am Knick (s): 0,55 … ≈ 0,33 */
export function zigTurnTime(level: number): number {
  return 0.55 - 0.02 * (lv(level) - 1);
}

/** Kleinster Winkelunterschied a − b in (−π, π] */
export function angleDiff(a: number, b: number): number {
  let d = (a - b) % (2 * Math.PI);
  if (d > Math.PI) d -= 2 * Math.PI;
  if (d <= -Math.PI) d += 2 * Math.PI;
  return d;
}

export interface ZigLeg {
  /** Beginn des Teilstücks (Knickzeit, s) */
  t: number;
  /** Richtung (rad, y nach unten) */
  phi: number;
  /** Drehung gegenüber dem Teilstück davor (rad, 0 beim ersten) */
  turn: number;
  /** Knick am Feldrand (Richtung der Hauptbewegung umgekehrt)? */
  bounce: boolean;
}

export interface ZigPlan {
  path: PathTable;
  legs: ZigLeg[];
}

/** Bahn planen (Knickzeiten mit `setup.rng`, Ort aufsummiert). */
export function zigzagPlan(setup: RuleSetup): ZigPlan {
  const { rng, hw, hh } = setup;
  const level = lv(setup.level);
  const speed = zigSpeed(level);
  const half = (zigAngleDeg(level) * Math.PI) / 360;
  const tr = zigTurnTime(level);
  const xlim = Math.max(3, hw - 3);
  const ylim = Math.max(2.5, hh - 2);
  const heading = (dir: number, z: number) => (dir > 0 ? 0 : Math.PI) + z * half;

  let dir = rng.chance(0.5) ? 1 : -1;
  const start: Vec = { x: -dir * 0.5 * hw, y: 0 };

  /** nächstes Teilstück wählen: Hauptrichtung (Feldrand), Zickzack-Seite (abwechselnd, zur Mitte hin falls nötig), Dauer (Höhengrenze) */
  const chooseLeg = (pos: Vec, zPrev: number | null): { dir: number; z: number; phi: number; d: number; bounce: boolean } => {
    let d = zigLegSeconds(level) * rng.range(0.85, 1.15);
    let bounce = false;
    let dirNew = dir;
    const dx = Math.cos(half) * speed * d;
    if (Math.abs(pos.x + dirNew * dx) > xlim) {
      bounce = true;
      dirNew = -dirNew;
      if (Math.abs(pos.x + dirNew * dx) > xlim) {
        dirNew = pos.x > 0 ? -1 : 1;
        d = Math.max(0.7, Math.min(d, (Math.abs(pos.x) + xlim) / (Math.cos(half) * speed)));
      }
    }
    let zs = zPrev === null ? (rng.chance(0.5) ? [1, -1] : [-1, 1]) : [-zPrev, zPrev];
    if (Math.abs(pos.y) > 0.55 * hh) {
      const towardCenter = (z: number) => Math.sin(heading(dirNew, z)) * pos.y < 0;
      zs = [...zs].sort((a, b) => Number(towardCenter(b)) - Number(towardCenter(a)));
    }
    const z = zs[0];
    const phi = heading(dirNew, z);
    const vy = Math.sin(phi) * speed;
    if (vy !== 0 && Math.abs(pos.y + vy * d) > ylim) {
      d = clamp((Math.sign(vy) * ylim - pos.y) / vy, 0.5, d);
    }
    return { dir: dirNew, z, phi, d, bounce };
  };

  const legs: ZigLeg[] = [];
  const f0 = chooseLeg(start, null);
  dir = f0.dir;
  let z = f0.z;
  let phiPrev = f0.phi;
  let phiCur = f0.phi;
  let dip = 0;
  let tCur = 0;
  let nextT = f0.d;
  legs.push({ t: 0, phi: phiCur, turn: 0, bounce: false });

  const path = buildPath(start, setup.seconds + 0.6, (s, pos) => {
    if (s >= nextT - 1e-9) {
      const f = chooseLeg(pos, z);
      dir = f.dir;
      z = f.z;
      phiPrev = phiCur;
      phiCur = f.phi;
      tCur = nextT;
      nextT = tCur + f.d;
      const turn = angleDiff(phiCur, phiPrev);
      dip = 0.4 * (Math.abs(turn) / Math.PI);
      legs.push({ t: tCur, phi: phiCur, turn, bounce: f.bounce });
    }
    const k = clamp((s - tCur) / tr, 0, 1);
    const b = blend(s, tCur, tr);
    const h = phiPrev + angleDiff(phiCur, phiPrev) * b;
    const sp = speed * (1 - dip * Math.sin(Math.PI * k)) * smoothstep(s / START_RAMP_S);
    return { x: keepInside(pos.x, Math.cos(h) * sp, hw), y: keepInside(pos.y, Math.sin(h) * sp, hh) };
  });
  return { path, legs };
}

/** Bewegungsregel für den Kern (`axes: 'xy'`). */
export function zigzagRule(setup: RuleSetup): TrackRule {
  const { path } = zigzagPlan(setup);
  return { target: (s) => path.at(s) };
}
