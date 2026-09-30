/**
 * Hoch und runter folgen – reine Bewegungsregel (Katalog 515, „Vertikales Nachführen“; Original: Kugel wird vom unteren Rand
 * nach oben geworfen, wird langsamer, steht am Scheitel kurz still und fällt dann immer schneller zurück; gelegentlich springt
 * sie zur Seite oder nach oben).
 *
 * Das Ziel springt in weichen Bögen wie ein Ball: Vom Boden (unten im Feld) in die Höhe, am Scheitel langsam, dann zurück.
 * Die Schwerkraft ist je Stufe FEST (so kann man die Fallkurve „lernen“), die Scheitelhöhe schwankt von Bogen zu Bogen.
 * Am Boden wird das Tempo sanft umgekehrt (kein Knick). Ab Stufe 4 gibt es manchmal im Scheitel einen zusätzlichen „Schub“
 * nach oben – er wird ≈ 0,5 s vorher durch einen Pfeil über der Marke angekündigt (`hint`). Die Seitenbewegung ist klein und
 * langsam (nur ein leichtes Schwanken). Stufe: stärkere Schwerkraft (schnellere Bögen), höhere Scheitel, mehr Schübe.
 *
 * Die Regel hängt nur von der Zeit ab: Der Bogenablauf wird beim Bau einmal mit `setup.rng` gewürfelt und aufsummiert.
 */
import { clamp } from '../../core/stats';
import { buildPath, keepInside, PATH_STEP_S, type PathTable } from '../_shared/folgen-bahn';
import { MAX_LEVEL, MIN_LEVEL, rampTime, smoothstep, type RuleSetup, type TrackRule, type Vec } from '../_shared/nachfuehren-logic';

/** Dauer (s) der weichen Umkehr am Boden bzw. des Schubs im Scheitel */
export const BOUNCE_S = 0.26;
export const BOOST_S = 0.3;
/** Der erste Abwurf läuft aus der Ruhe langsam an (s) */
export const FIRST_LAUNCH_S = 1.0;
/** Wie lange vor dem Schub der Pfeil erscheint (s) */
export const BOOST_WARN_S = 0.55;

const lv = (level: number) => clamp(Math.round(level), MIN_LEVEL, MAX_LEVEL);

/** Anpassung an die Feldhöhe (Querformat-Tablet ≈ 1,05; flache Felder kleiner): Höhe und Schwerkraft wachsen gemeinsam, die Flugdauer bleibt */
export function heightScale(hh: number): number {
  return clamp((2 * hh) / 60, 0.6, 1.15);
}

/** Schwerkraft (u/s²), je Stufe fest: 6,5 auf Stufe 1 (langsame, weit schwebende Bögen) … 23 auf Stufe 12 (mal `heightScale`) */
export function gravityFor(level: number, scale = 1): number {
  return (6.5 + 1.5 * (lv(level) - 1)) * scale;
}

/** Mittlere Scheitelhöhe über dem Boden (u): 10 … 15 (Bogen zu Bogen ×0,7 … ×1,25; mal `heightScale`) */
export function apexBaseFor(level: number, scale = 1): number {
  return (10 + 0.45 * (lv(level) - 1)) * scale;
}

/** Wahrscheinlichkeit für einen angekündigten Schub im Scheitel: 0 bis Stufe 3, dann 0,2 … 0,6 */
export function boostChanceFor(level: number): number {
  const l = lv(level);
  return l < 4 ? 0 : clamp(0.2 + 0.05 * (l - 4), 0, 0.6);
}

/** Seitliches Schwanken (halbe Weite, u): klein, höchstens 20 % der halben Feldbreite */
export function sideAmplitudeFor(level: number, hw: number): number {
  return Math.min(0.2 * hw, 5 + 0.4 * lv(level));
}

export interface Arc {
  /** Beginn der Umkehr am Boden (s) */
  t: number;
  /** Abwurf-Tempo nach oben (u/s, positiv) */
  v0: number;
  /** Geplante Scheitelhöhe über dem Boden (u) */
  apex: number;
  /** Schubhöhe (u) oder 0 */
  boost: number;
}

export interface ArcPlan {
  path: PathTable;
  arcs: Arc[];
  /** Zeitfenster [von, bis] der Schub-Ankündigung (s) */
  warnings: { from: number; to: number }[];
  floorY: number;
  ceilY: number;
}

/** Bogenfolge planen (Würfel: Scheitelhöhe, Schübe) und den senkrechten Ort aufsummieren. */
export function arcPlan(setup: RuleSetup): ArcPlan {
  const { rng, hh } = setup;
  const level = lv(setup.level);
  const sc = heightScale(hh);
  const g = gravityFor(level, sc);
  const base = apexBaseFor(level, sc);
  // Boden: in hohen Feldern nicht ganz unten, damit die Bögen mittig im Feld liegen
  const floorY = Math.max(Math.min(hh - 3.5, 0.5 * (1.25 * base + 4) + 0.15 * hh), 0.3 * hh);
  const ceilY = -hh + 1.5;
  const range = Math.max(floorY - ceilY, 2);
  const arcs: Arc[] = [];
  const warnings: { from: number; to: number }[] = [];

  type Mode = 'bounce' | 'flight' | 'boost';
  let mode: Mode = 'bounce';
  let tM = 0;
  let trM = FIRST_LAUNCH_S;
  let aSpeed = 0; // Tempo (u/s, nach unten positiv) zu Beginn der Umkehr bzw. des Schubs
  let vTarget = 0; // Tempo am Ende (nach oben negativ)
  let vy = 0;
  let pendingBoost = 0; // geplante Schubhöhe
  let boostVel = 0;

  /** Neuen Bogen planen: Ziel-Tempo so, dass der Scheitel bei `floorY − H` liegt (Umkehr-Weg eingerechnet) */
  const planArc = (s: number, yNow: number, a: number, tr: number): void => {
    const h = Math.min(base * rng.range(0.7, 1.25), 0.9 * range);
    const yApex = floorY - h;
    let v = Math.sqrt(2 * g * Math.max(0.1, yNow - yApex));
    for (let i = 0; i < 4; i++) {
      const yEnd = yNow + (tr * (a - v)) / 2;
      v = Math.sqrt(2 * g * Math.max(0.1, yEnd - yApex));
    }
    vTarget = -v;
    aSpeed = a;
    tM = s;
    trM = tr;
    mode = 'bounce';
    // Schub im Scheitel?
    pendingBoost = 0;
    boostVel = 0;
    const apexT = s + tr + v / g;
    let boost = 0;
    if (rng.chance(boostChanceFor(level)) && v / g >= BOOST_WARN_S + 0.15) {
      const room = yApex - ceilY - 0.5;
      let hb = Math.min(rng.range(0.4, 0.75) * base, room);
      for (let i = 0; i < 12 && hb + 0.15 * Math.sqrt(2 * g * Math.max(hb, 0)) > room; i++) hb *= 0.9;
      if (hb >= 3) {
        boost = hb;
        pendingBoost = hb;
        boostVel = Math.sqrt(2 * g * hb);
        warnings.push({ from: apexT - BOOST_WARN_S, to: apexT + 0.06 });
      }
    }
    arcs.push({ t: s, v0: v, apex: h, boost });
  };

  let first = true;
  const path = buildPath({ x: 0, y: floorY }, setup.seconds + 0.6, (s, pos) => {
    if (first) {
      first = false;
      planArc(0, pos.y, 0, FIRST_LAUNCH_S);
    }
    let v = 0;
    if (mode === 'bounce' || mode === 'boost') {
      const k = (s - tM) / trM;
      if (k < 1) {
        v = aSpeed + (vTarget - aSpeed) * smoothstep(k);
        return { x: 0, y: keepInside(pos.y, v, hh) };
      }
      vy = vTarget;
      mode = 'flight';
    }
    // freier Flug mit fester Schwerkraft
    v = vy;
    vy += g * PATH_STEP_S;
    if (pos.y >= floorY && v > 0) {
      planArc(s, pos.y, v, BOUNCE_S);
      return { x: 0, y: keepInside(pos.y, v, hh) };
    }
    if (pendingBoost > 0 && v >= 0) {
      aSpeed = v;
      vTarget = -boostVel;
      tM = s;
      trM = BOOST_S;
      mode = 'boost';
      pendingBoost = 0;
      return { x: 0, y: keepInside(pos.y, v, hh) };
    }
    return { x: 0, y: keepInside(pos.y, v, hh) };
  });
  return { path, arcs, warnings, floorY, ceilY };
}

/** Bewegungsregel für den Kern (`axes: 'xy'`, die Bewegung ist überwiegend senkrecht, x schwankt nur leicht). */
export function arcRule(setup: RuleSetup): TrackRule {
  const { rng, hw } = setup;
  const level = lv(setup.level);
  const plan = arcPlan(setup);
  const amp = sideAmplitudeFor(level, hw);
  const f = 0.05 + 0.008 * level;
  const ph = rng.range(0, 2 * Math.PI);
  const x = (s: number): number => amp * Math.sin(2 * Math.PI * f * rampTime(s, 1.5) + ph);
  return {
    target: (s): Vec => ({ x: x(s), y: plan.path.at(s).y }),
    hint: (s): Vec => (plan.warnings.some((w) => s >= w.from && s <= w.to) ? { x: 0, y: -1 } : { x: 0, y: 0 }),
  };
}

/** Kurze Vorschau (s) der Bahn auf den unteren Stufen (Bögen sind vorhersagbar): 0,9 s bis Stufe 3, sonst keine */
export function arcPreviewSeconds(level: number): number {
  return lv(level) <= 3 ? 0.9 : 0;
}
