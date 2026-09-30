/**
 * Glatt folgen – reine Bewegungsregel (Katalog 514, „Glattes Nachführen auf Kurvenbahn“; Original: Kugel zieht weiche
 * Schleifen aus zwei Sinusschwingungen, x langsam, y etwa 2,3- bis 2,8-mal so schnell).
 *
 * Das Ziel läuft auf einer sehr glatten, langsamen Kurvenbahn (zwei Sinus-Schwingungen mit festem Frequenzverhältnis je
 * Durchgang). Anders als im Original (dort sprang die Kugel, weil die Phase bei jeder Tempoänderung neu berechnet wurde)
 * läuft die Zeit-Verzerrung stetig aus dem Stand an (`rampTime`); das Tempo ist je Durchgang konstant und steigt nur mit der
 * Stufe. Ab Stufe 7 mischt sich eine kleine dritte, nicht-harmonische Schwingung dazu (die Bahn wird weniger vorhersagbar).
 * Keine Ecken, keine Richtungssprünge.
 */
import { clamp } from '../../core/stats';
import { MAX_LEVEL, MIN_LEVEL, rampTime, type RuleSetup, type TrackRule, type Vec } from '../_shared/nachfuehren-logic';

/** Dauer (s), in der die Bahn aus dem Stand auf volles Tempo anläuft */
export const SMOOTH_RAMP_S = 1.6;
/** Frequenzverhältnis der Zusatz-Schwingung (nicht ganzzahlig zum Hauptverhältnis) */
export const EXTRA_RATIO = 1.73;

const lv = (level: number) => clamp(Math.round(level), MIN_LEVEL, MAX_LEVEL);

/** Obere Schranke der Bahngeschwindigkeit (u/s): 5 auf Stufe 1 … 16 auf Stufe 12 (Durchschnitt ≈ 2/3 davon) */
export function smoothPeakSpeed(level: number): number {
  return 5 + 1.0 * (lv(level) - 1);
}

/** Anteil der Zusatz-Schwingung: 0 bis Stufe 6, danach 0,03 … 0,18 */
export function extraShare(level: number): number {
  return clamp(0.03 * (lv(level) - 6), 0, 0.18);
}

export interface SmoothShape {
  /** Halbe Breite/Höhe der Bahn (u) */
  a: number;
  b: number;
  /** Grundfrequenz waagrecht (Hz) und Verhältnis senkrecht : waagrecht */
  omega: number;
  ratio: number;
  /** Anteil der Zusatz-Schwingung */
  extra: number;
  phx: number;
  phy: number;
  ph3: number;
}

/** Form und Tempo der Bahn für einen Durchgang festlegen (würfelt Verhältnis und Phasen) */
export function smoothShape(setup: RuleSetup): SmoothShape {
  const { rng, hw, hh } = setup;
  const level = lv(setup.level);
  const a = Math.min(0.85 * hw, 28);
  const b = Math.min(0.85 * hh, 18);
  const ratio = rng.range(2.3, 2.8);
  const extra = extraShare(level);
  const k = 1 - extra + extra * EXTRA_RATIO;
  const omega = smoothPeakSpeed(level) / (2 * Math.PI * Math.hypot(a * k, ratio * b * k));
  return {
    a,
    b,
    omega,
    ratio,
    extra,
    phx: rng.range(0, 2 * Math.PI),
    phy: rng.range(0, 2 * Math.PI),
    ph3: rng.range(0, 2 * Math.PI),
  };
}

/** Ort der Zielmarke zur Bahnzeit s (u, Feldmitte = 0/0) */
export function smoothPoint(sh: SmoothShape, s: number): Vec {
  const th = 2 * Math.PI * sh.omega * rampTime(s, SMOOTH_RAMP_S);
  const m = 1 - sh.extra;
  return {
    x: sh.a * (m * Math.sin(th + sh.phx) + sh.extra * Math.sin(EXTRA_RATIO * th + sh.ph3)),
    y: sh.b * (m * Math.cos(sh.ratio * th + sh.phy) + sh.extra * Math.cos(EXTRA_RATIO * sh.ratio * th + sh.ph3 * 1.3)),
  };
}

/** Bewegungsregel für den Kern (`axes: 'xy'`). */
export function smoothRule(setup: RuleSetup): TrackRule {
  const sh = smoothShape(setup);
  return { target: (s) => smoothPoint(sh, s) };
}

/** Vorschau (s) der Bahn je Stufe: 1,6 s auf Stufe 1, nimmt ab, auf Stufe 12 kaum noch */
export function smoothPreviewSeconds(level: number): number {
  return Math.max(0, 1.6 - 0.14 * (lv(level) - 1));
}
