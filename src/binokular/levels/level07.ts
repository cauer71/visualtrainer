import type { LevelDef } from './types';

/**
 * Level 7 „Die Wippe“ – ein Schalter bewegt zwei Plattformen gegenläufig: Die linke Brücke steht anfangs und fährt
 * beim Umlegen ein, die rechte fährt dabei aus. Die Reihenfolge zählt: erst links alles holen, dann umlegen
 * (sonst muss man zurückschalten). Unten im Gang wandert eine Glut auf ihrer Bahn.
 *
 * Ablauf (kürzeste Reihenfolge): über die linke Brücke Kristall 3 zur Basis → Schlüssel 1 holen → Leiter hinunter
 * (Bahn der Glut queren) → Schalter umlegen → über die rechte Brücke Tür 1 aufschließen → Kristall 1 →
 * unten Schlüssel 2, Tür 2, Kristall 2.
 *
 * Binokulare Paare:
 *  1. Roboter (amblyopes Auge) ↔ Kristalle und Basis (dominantes Auge)
 *  2. Schalter (amblyopes Auge) ↔ beide Brücken (dominantes Auge)
 *  3. Schlüssel 1/2 (amblyopes Auge) ↔ Tür 1/2 (dominantes Auge)
 *  Zusätzlich: wandernde Glut und Bahn nur für das amblyope Auge, Glutnest in der Erde links unten.
 *
 *   x: 0123456789012345
 *  y0  RRRRRRRRRRRRRRRR
 *  y1  RCK--.BA.L.__TCR    -- linke Brücke (steht), __ rechte Brücke (eingefahren), T Tür 1
 *  y2  RRR..RRRRLR..RRR
 *  y3  RRR..~~~~~~==RRR    ~ Bahn der Glut (x5–10), == rechte Plattform eingefahren
 *  y4  RRRRRRRRRLRRRRRR
 *  y5  RgK..W...L..T.CR    W Schalter, T Tür 2
 *  y6  RRRRRRRRRRRRRRRR
 */
export const level07: LevelDef = {
  id: 'level07',
  number: 7,
  nameKey: 'level07',
  map: [
    'RRRRRRRRRRRRRRRR',
    'R........L.....R',
    'RRR..RRRRLR..RRR',
    'RRR......L...RRR',
    'RRRRRRRRRLRRRRRR',
    'RD.......L.....R',
    'RRRRRRRRRRRRRRRR',
  ],
  ladderEye: 'BOTH',
  objects: [
    { kind: 'base', id: 'base', x: 6, y: 1, eye: 'FELLOW' },
    { kind: 'robot', id: 'robotA', x: 7, y: 1, eye: 'AMBLYOPIC' },
    { kind: 'crystal', id: 'crystal3', x: 1, y: 1, eye: 'FELLOW' },
    { kind: 'key', id: 'key1', x: 2, y: 1, eye: 'AMBLYOPIC', group: 'door1', mark: 1 },
    { kind: 'door', id: 'door1', x: 13, y: 1, eye: 'FELLOW', group: 'door1', mark: 1 },
    { kind: 'crystal', id: 'crystal1', x: 14, y: 1, eye: 'FELLOW' },
    { kind: 'key', id: 'key2', x: 2, y: 5, eye: 'AMBLYOPIC', group: 'door2', mark: 2 },
    { kind: 'door', id: 'door2', x: 12, y: 5, eye: 'FELLOW', group: 'door2', mark: 2 },
    { kind: 'crystal', id: 'crystal2', x: 14, y: 5, eye: 'FELLOW' },
    { kind: 'switch', id: 'switch1', x: 5, y: 5, eye: 'AMBLYOPIC', group: 'seesaw' },
    { kind: 'platform', id: 'bridgeR', x: 11, y: 3, w: 2, toX: 11, toY: 2, eye: 'FELLOW', group: 'seesaw' },
    { kind: 'platform', id: 'bridgeL', x: 3, y: 3, w: 2, toX: 3, toY: 2, eye: 'FELLOW', group: 'seesaw', inverted: true },
    {
      kind: 'hazard',
      id: 'ember1',
      x: 5,
      y: 3,
      eye: 'AMBLYOPIC',
      patrol: [5, 6, 7, 8, 9, 10].map((x) => ({ x, y: 3 })),
    },
    { kind: 'hazard', id: 'hazard2', x: 1, y: 5, eye: 'AMBLYOPIC' },
    { kind: 'lamp', id: 'lamp1', x: 11, y: 5, eye: 'BOTH' },
  ],
  requiredCrystals: 3,
  maxFailuresForStar: 0,
  difficulty: {
    objectSize: 0.75,
    contrast: { amblyopic: 1, fellow: 1, target: 1, neutral: 1, distractor: 0.45 },
    moveSpeed: 2.5,
    hazardSpeed: 0.5,
    objectCount: 13,
    pairDistance: 9,
    distraction: 0.4,
    complexity: 5,
    reactionTimeMs: 2000,
    binocularDurationS: 240,
  },
  pairs: [
    { amblyopic: ['robot'], fellow: ['crystal', 'base'], note: 'Roboter ↔ Kristalle/Basis' },
    { amblyopic: ['switch'], fellow: ['platform'], note: 'Schalter ↔ beide Brücken (gegenläufig)' },
    { amblyopic: ['key'], fellow: ['door'], note: 'Schlüssel 1/2 ↔ Tür 1/2' },
  ],
  solverRobots: ['robotA'],
};
