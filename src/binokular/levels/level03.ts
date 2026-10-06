import type { LevelDef } from './types';

/**
 * Level 3 „Unsichtbare Leitern“ – alle Leitern sieht nur das amblyope Auge, alle Ziele nur das dominante.
 * Das dominante Auge allein sieht die Kristalle, aber keinen Weg nach unten; das amblyope Auge sieht Wege und
 * Roboter, aber nicht, wohin sie führen sollen.
 *
 * Ablauf: über die linke Leiter zum Schlüssel → über die mittlere Leiter nach unten → Schalter betätigen
 * (Brücke oben fährt aus) → Tür aufschließen, Kristall unten rechts holen → über die Brücke und die rechte Leiter
 * die beiden übrigen Kristalle holen. Die kurze Leiter links unten endet an einem Glutnest – Umweg nehmen.
 *
 * Binokulare Paare:
 *  1. Roboter (amblyopes Auge) ↔ Basis (dominantes Auge)
 *  2. Leitern (amblyopes Auge) ↔ Kristalle (dominantes Auge)
 *  3. Schlüssel (amblyopes Auge) ↔ Tür (dominantes Auge)
 *  4. Schalter (amblyopes Auge) ↔ Brücke/Plattform (dominantes Auge)
 *
 *   x: 0123456789012345
 *  y0  RRRRRRRRRRRRRRRR
 *  y1  RB.A.L..--..L.cR    -- Brücke (ausgefahren), c Kristall in Erde
 *  y2  RRRRRLRR..RRLRRR
 *  y3  R.K..L.L==RRL.CR    == Plattform (eingefahren)
 *  y4  RRRLRRRLRRRRRRRR
 *  y5  R..G..WL..T...CR    G Glutnest, W Schalter, T Tür
 *  y6  RRRRRRRRRRRRRRRR
 */
export const level03: LevelDef = {
  id: 'level03',
  number: 3,
  nameKey: 'level03',
  map: [
    'RRRRRRRRRRRRRRRR',
    'R....L......L.DR',
    'RRRRRLRR..RRLRRR',
    'R....L.L..RRL..R',
    'RRRLRRRLRRRRRRRR',
    'R......L.......R',
    'RRRRRRRRRRRRRRRR',
  ],
  ladderEye: 'AMBLYOPIC',
  objects: [
    { kind: 'base', id: 'base', x: 1, y: 1, eye: 'FELLOW' },
    { kind: 'robot', id: 'robotA', x: 3, y: 1, eye: 'AMBLYOPIC' },
    { kind: 'key', id: 'key1', x: 2, y: 3, eye: 'AMBLYOPIC', group: 'door1' },
    { kind: 'door', id: 'door1', x: 10, y: 5, eye: 'FELLOW', group: 'door1' },
    { kind: 'switch', id: 'switch1', x: 6, y: 5, eye: 'AMBLYOPIC', group: 'plat1' },
    { kind: 'platform', id: 'plat1', x: 8, y: 3, w: 2, toX: 8, toY: 2, eye: 'FELLOW', group: 'plat1' },
    { kind: 'crystal', id: 'crystal1', x: 14, y: 1, eye: 'FELLOW' },
    { kind: 'crystal', id: 'crystal2', x: 14, y: 3, eye: 'FELLOW' },
    { kind: 'crystal', id: 'crystal3', x: 14, y: 5, eye: 'FELLOW' },
    { kind: 'hazard', id: 'hazard1', x: 3, y: 5, eye: 'AMBLYOPIC' },
    { kind: 'lamp', id: 'lamp1', x: 10, y: 1, eye: 'BOTH' },
    { kind: 'lamp', id: 'lamp2', x: 12, y: 5, eye: 'BOTH' },
  ],
  requiredCrystals: 3,
  maxFailuresForStar: 0,
  difficulty: {
    objectSize: 0.85,
    contrast: { amblyopic: 1, fellow: 1, target: 1, neutral: 1, distractor: 0.35 },
    moveSpeed: 2.5,
    hazardSpeed: 0,
    objectCount: 9,
    pairDistance: 8,
    distraction: 0.2,
    complexity: 3,
    reactionTimeMs: null,
    binocularDurationS: 200,
  },
  pairs: [
    { amblyopic: ['robot'], fellow: ['base'], note: 'Roboter ↔ Basis' },
    { amblyopic: ['ladder'], fellow: ['crystal'], note: 'Leitern ↔ Kristalle' },
    { amblyopic: ['key'], fellow: ['door'], note: 'Schlüssel ↔ Tür' },
    { amblyopic: ['switch'], fellow: ['platform'], note: 'Schalter ↔ Brücke' },
  ],
  solverRobots: ['robotA'],
};
