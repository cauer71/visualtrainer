import type { LevelDef } from './types';

/**
 * Level 8 „Blasse Kristalle“ – die Ziele (Kristalle und Basis) haben nur 60 % Objektkontrast im dominanten Auge;
 * genaues Hinschauen statt Tempo. Die Glut wandert unten-mittig auf ihrer Bahn, die man zum Schalter entlanggehen muss.
 *
 * Ablauf: Leiter hinunter → Schlüssel 1 holen → links Tür 1 aufschließen → Schlüssel 2 holen → oben Tür 2 →
 * auf der Bahn nach rechts zum Schalter, wenn die Glut links ist (Brücke fährt aus) → vier Kristalle zur Basis.
 *
 * Binokulare Paare:
 *  1. Roboter (amblyopes Auge) ↔ Kristalle und Basis (dominantes Auge, geringer Kontrast)
 *  2. Schlüssel 1/2 (amblyopes Auge) ↔ Tür 1/2 (dominantes Auge)
 *  3. Schalter (amblyopes Auge) ↔ Brücke/Plattform (dominantes Auge)
 *  Zusätzlich: wandernde Glut mit Bahn, Glutnest in der Erde rechts unten (amblyopes Auge).
 *
 *   x: 0123456789012345
 *  y0  RRRRRRRRRRRRRRRR
 *  y1  RCc.--T..L..C.ABR   c Kristall in Erde, -- Brücke, T Tür 2
 *  y2  RRRR..RRRLRRRRRR
 *  y3  RRRR==R~~~~~~~WR    ~ Bahn der Glut (x7–13), W Schalter
 *  y4  RRRRRRRRRLRRRRRR
 *  y5  RCKT.....L...KgR    T Tür 1, K Schlüssel 2 (links) / 1 (rechts), g Glutnest in Erde
 *  y6  RRRRRRRRRRRRRRRR
 */
export const level08: LevelDef = {
  id: 'level08',
  number: 8,
  nameKey: 'level08',
  map: [
    'RRRRRRRRRRRRRRRR',
    'R.D......L.....R',
    'RRRR..RRRLRRRRRR',
    'RRRR..R..L.....R',
    'RRRRRRRRRLRRRRRR',
    'R........L....DR',
    'RRRRRRRRRRRRRRRR',
  ],
  ladderEye: 'BOTH',
  objects: [
    { kind: 'base', id: 'base', x: 14, y: 1, eye: 'FELLOW' },
    { kind: 'robot', id: 'robotA', x: 13, y: 1, eye: 'AMBLYOPIC' },
    { kind: 'key', id: 'key1', x: 13, y: 5, eye: 'AMBLYOPIC', group: 'door1', mark: 1 },
    { kind: 'door', id: 'door1', x: 3, y: 5, eye: 'FELLOW', group: 'door1', mark: 1 },
    { kind: 'key', id: 'key2', x: 2, y: 5, eye: 'AMBLYOPIC', group: 'door2', mark: 2 },
    { kind: 'door', id: 'door2', x: 6, y: 1, eye: 'FELLOW', group: 'door2', mark: 2 },
    { kind: 'switch', id: 'switch1', x: 14, y: 3, eye: 'AMBLYOPIC', group: 'bridge' },
    { kind: 'platform', id: 'bridge1', x: 4, y: 3, w: 2, toX: 4, toY: 2, eye: 'FELLOW', group: 'bridge' },
    { kind: 'crystal', id: 'crystal1', x: 1, y: 1, eye: 'FELLOW' },
    { kind: 'crystal', id: 'crystal2', x: 2, y: 1, eye: 'FELLOW' },
    { kind: 'crystal', id: 'crystal3', x: 1, y: 5, eye: 'FELLOW' },
    { kind: 'crystal', id: 'crystal4', x: 11, y: 1, eye: 'FELLOW' },
    {
      kind: 'hazard',
      id: 'ember1',
      x: 7,
      y: 3,
      eye: 'AMBLYOPIC',
      patrol: [7, 8, 9, 10, 11, 12, 13].map((x) => ({ x, y: 3 })),
    },
    { kind: 'hazard', id: 'hazard2', x: 14, y: 5, eye: 'AMBLYOPIC' },
    { kind: 'lamp', id: 'lamp1', x: 7, y: 5, eye: 'BOTH' },
  ],
  requiredCrystals: 4,
  maxFailuresForStar: 0,
  difficulty: {
    objectSize: 0.75,
    contrast: { amblyopic: 1, fellow: 1, target: 0.6, neutral: 1, distractor: 0.5 },
    moveSpeed: 2.5,
    hazardSpeed: 0.55,
    objectCount: 13,
    pairDistance: 9,
    distraction: 0.45,
    complexity: 5,
    reactionTimeMs: 1818,
    binocularDurationS: 250,
  },
  pairs: [
    { amblyopic: ['robot'], fellow: ['crystal', 'base'], note: 'Roboter ↔ blasse Kristalle/Basis' },
    { amblyopic: ['key'], fellow: ['door'], note: 'Schlüssel 1/2 ↔ Tür 1/2' },
    { amblyopic: ['switch'], fellow: ['platform'], note: 'Schalter ↔ Brücke' },
  ],
  solverRobots: ['robotA'],
};
