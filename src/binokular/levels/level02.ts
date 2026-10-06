import type { LevelDef } from './types';

/**
 * Level 2 „Zwei Schlüssel“ – zwei Schlüssel/Tür-Paare, erkennbar am Kennzeichen (1 oder 2 Kerben am Schlüssel,
 * 1 oder 2 Punkte an der Tür – keine Farbe, denn Farbe gehört der Brille).
 *
 * Ablauf: Schlüssel 1 unten links holen → über den kleinen Bogen am Glutnest vorbei → Tür 1 aufschließen →
 * Schlüssel 2 holen → oben Tür 2 aufschließen → zwei Kristalle freigraben und zur Basis bringen.
 * Rechts oben steckt ein Glutnest in der Erde (nur das amblyope Auge sieht es) – dort nicht graben.
 *
 * Binokulare Paare:
 *  1. Roboter (amblyopes Auge) ↔ Kristalle und Basis (dominantes Auge)
 *  2. Schlüssel 1 und 2 (amblyopes Auge) ↔ Tür 1 und 2 (dominantes Auge), passend über das Kennzeichen
 *
 *   x: 0123456789012345
 *  y0  RRRRRRRRRRRRRRRR
 *  y1  RB.A.L....T.ccgR    T Tür 2, c Kristall in Erde, g Glutnest in Erde
 *  y2  RRRRRLRRRRRRRRRR
 *  y3  RRRRRL...RRRRRRR    Bogen über das Glutnest
 *  y4  RRRRRLLRLRRRRRRR
 *  y5  R.K..LLGLT.K...R    K Schlüssel 1, G Glutnest, T Tür 1, K Schlüssel 2
 *  y6  RRRRRRRRRRRRRRRR
 */
export const level02: LevelDef = {
  id: 'level02',
  number: 2,
  nameKey: 'level02',
  map: [
    'RRRRRRRRRRRRRRRR',
    'R....L......DDDR',
    'RRRRRLRRRRRRRRRR',
    'RRRRRL...RRRRRRR',
    'RRRRRLLRLRRRRRRR',
    'R....LL.L......R',
    'RRRRRRRRRRRRRRRR',
  ],
  ladderEye: 'BOTH',
  objects: [
    { kind: 'base', id: 'base', x: 1, y: 1, eye: 'FELLOW' },
    { kind: 'robot', id: 'robotA', x: 3, y: 1, eye: 'AMBLYOPIC' },
    { kind: 'key', id: 'key1', x: 2, y: 5, eye: 'AMBLYOPIC', group: 'door1', mark: 1 },
    { kind: 'door', id: 'door1', x: 9, y: 5, eye: 'FELLOW', group: 'door1', mark: 1 },
    { kind: 'key', id: 'key2', x: 11, y: 5, eye: 'AMBLYOPIC', group: 'door2', mark: 2 },
    { kind: 'door', id: 'door2', x: 10, y: 1, eye: 'FELLOW', group: 'door2', mark: 2 },
    { kind: 'crystal', id: 'crystal1', x: 12, y: 1, eye: 'FELLOW' },
    { kind: 'crystal', id: 'crystal2', x: 13, y: 1, eye: 'FELLOW' },
    { kind: 'hazard', id: 'hazard1', x: 7, y: 5, eye: 'AMBLYOPIC' },
    { kind: 'hazard', id: 'hazard2', x: 14, y: 1, eye: 'AMBLYOPIC' },
    { kind: 'lamp', id: 'lamp1', x: 8, y: 1, eye: 'BOTH' },
    { kind: 'lamp', id: 'lamp2', x: 13, y: 5, eye: 'BOTH' },
  ],
  requiredCrystals: 2,
  maxFailuresForStar: 0,
  difficulty: {
    objectSize: 0.9,
    contrast: { amblyopic: 1, fellow: 1, target: 1, neutral: 1, distractor: 0.35 },
    moveSpeed: 2.5,
    hazardSpeed: 0,
    objectCount: 9,
    pairDistance: 6,
    distraction: 0.15,
    complexity: 3,
    reactionTimeMs: null,
    binocularDurationS: 180,
  },
  pairs: [
    { amblyopic: ['robot'], fellow: ['crystal', 'base'], note: 'Roboter ↔ Kristalle/Basis' },
    { amblyopic: ['key'], fellow: ['door'], note: 'Schlüssel 1/2 ↔ Tür 1/2 (Kennzeichen)' },
  ],
  solverRobots: ['robotA'],
};
