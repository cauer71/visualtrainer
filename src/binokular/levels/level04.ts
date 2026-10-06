import type { LevelDef } from './types';

/**
 * Level 4 „Teamarbeit“ – zwei Roboter müssen zusammenarbeiten. Die Brücke über die Grube fährt nur aus, solange
 * ein Roboter auf der Druckplatte steht. Roboter wechselt man durch Antippen.
 *
 * Ablauf: Roboter 2 holt unten den Schlüssel, schließt die Tür auf und stellt sich auf die Druckplatte →
 * Roboter 1 läuft oben über die Brücke, gräbt die Kristalle frei und bringt sie zur Basis (Roboter 2 bleibt stehen);
 * Kristall 3 liegt unten vor der Tür.
 * Ein Glutnest liegt im unteren Gang; der kleine Bogen darüber ist sicher.
 *
 * Binokulare Paare:
 *  1. Roboter (amblyopes Auge) ↔ Kristalle und Basis (dominantes Auge)
 *  2. Druckplatte (amblyopes Auge) ↔ Brücke/Plattform (dominantes Auge)
 *  3. Schlüssel (amblyopes Auge) ↔ Tür (dominantes Auge)
 *
 *   x: 0123456789012345
 *  y0  RRRRRRRRRRRRRRRR
 *  y1  RB.1....L--.cDCR    1 Roboter 1, -- Brücke (ausgefahren), c Kristall in Erde
 *  y2  RRRRRRRRL..RRRRR
 *  y3  RRRRL..RL==RRRRR    == Plattform (eingefahren), Bogen x4–6
 *  y4  RRRRLRLRLRRRRRRR
 *  y5  R2.KLGL.L..CT.PR    2 Roboter 2, K Schlüssel, G Glutnest, C Kristall 3, T Tür, P Druckplatte
 *  y6  RRRRRRRRRRRRRRRR
 */
export const level04: LevelDef = {
  id: 'level04',
  number: 4,
  nameKey: 'level04',
  map: [
    'RRRRRRRRRRRRRRRR',
    'R.......L....D.R',
    'RRRRRRRRL..RRRRR',
    'RRRRL..RL..RRRRR',
    'RRRRLRLRLRRRRRRR',
    'R...L.L.L......R',
    'RRRRRRRRRRRRRRRR',
  ],
  ladderEye: 'BOTH',
  objects: [
    { kind: 'base', id: 'base', x: 1, y: 1, eye: 'FELLOW' },
    { kind: 'robot', id: 'robot1', x: 3, y: 1, eye: 'AMBLYOPIC' },
    { kind: 'robot', id: 'robot2', x: 1, y: 5, eye: 'AMBLYOPIC' },
    { kind: 'key', id: 'key1', x: 3, y: 5, eye: 'AMBLYOPIC', group: 'door1' },
    { kind: 'door', id: 'door1', x: 12, y: 5, eye: 'FELLOW', group: 'door1' },
    { kind: 'plate', id: 'plate1', x: 14, y: 5, eye: 'AMBLYOPIC', group: 'bridge' },
    { kind: 'platform', id: 'bridge1', x: 9, y: 3, w: 2, toX: 9, toY: 2, eye: 'FELLOW', group: 'bridge' },
    { kind: 'crystal', id: 'crystal1', x: 13, y: 1, eye: 'FELLOW' },
    { kind: 'crystal', id: 'crystal2', x: 14, y: 1, eye: 'FELLOW' },
    { kind: 'crystal', id: 'crystal3', x: 11, y: 5, eye: 'FELLOW' },
    { kind: 'hazard', id: 'hazard1', x: 5, y: 5, eye: 'AMBLYOPIC' },
    { kind: 'lamp', id: 'lamp1', x: 5, y: 1, eye: 'BOTH' },
    { kind: 'lamp', id: 'lamp2', x: 10, y: 5, eye: 'BOTH' },
  ],
  requiredCrystals: 3,
  maxFailuresForStar: 0,
  difficulty: {
    objectSize: 0.85,
    contrast: { amblyopic: 1, fellow: 1, target: 1, neutral: 1, distractor: 0.35 },
    moveSpeed: 2.5,
    hazardSpeed: 0,
    objectCount: 10,
    pairDistance: 8,
    distraction: 0.2,
    complexity: 4,
    reactionTimeMs: null,
    binocularDurationS: 210,
  },
  pairs: [
    { amblyopic: ['robot'], fellow: ['crystal', 'base'], note: 'Roboter ↔ Kristalle/Basis' },
    { amblyopic: ['plate'], fellow: ['platform'], note: 'Druckplatte ↔ Brücke' },
    { amblyopic: ['key'], fellow: ['door'], note: 'Schlüssel ↔ Tür' },
  ],
  solverRobots: ['robot1', 'robot2'],
};
