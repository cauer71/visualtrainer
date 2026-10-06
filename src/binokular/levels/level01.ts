import type { LevelDef } from './types';

/**
 * Level 1 „Der erste Schacht“ – Einstieg: große Objekte, wenige Elemente, kaum Ablenkung.
 *
 * Ablauf (eine mögliche Lösung): Schlüssel unten links holen → Erde vor der Tür wegräumen → Tür aufschließen →
 * Schalter betätigen (fährt die Plattform über die Grube) → oben rechts zwei Kristalle freigraben →
 * nacheinander zur Basis oben links bringen. Unten liegt ein Glutnest im Gang; der Umweg oben herum ist sicher.
 *
 * Binokulare Paare (nur mit beiden Augen lösbar, geprüft in tests/unit/binokular-level.test.ts):
 *  1. Roboter (amblyopes Auge)  ↔ Kristalle und Basis (dominantes Auge)
 *  2. Schlüssel (amblyopes Auge) ↔ Tür (dominantes Auge)
 *  3. Schalter (amblyopes Auge)  ↔ Plattform (dominantes Auge)
 *  Zusätzlich: Glutnest (Gefahr) nur für das amblyope Auge.
 *
 *   x: 0123456789012345
 *  y0  RRRRRRRRRRRRRRRR
 *  y1  RB.A.L......KDKR    B Basis, A Roboter A, K Kristall in Erde
 *  y2  RRRRRLRRRR..RRRR    Grube (x10–11)
 *  y3  RRRRRL...RPPRRRR    Umweg oben (x6–8), Plattform eingefahren (x10–11)
 *  y4  RRRRRLLRLRRRRRRR
 *  y5  RBS..LLGLDT.W.LR    Roboter B, Schlüssel, Glutnest G, Erde, Tür T, Schalter W, Lampe
 *  y6  RRRRRRRRRRRRRRRR
 */
export const level01: LevelDef = {
  id: 'level01',
  number: 1,
  nameKey: 'level01',
  map: [
    'RRRRRRRRRRRRRRRR',
    'R....L......DDDR',
    'RRRRRLRRRR..RRRR',
    'RRRRRL...R..RRRR',
    'RRRRRLLRLRRRRRRR',
    'R....LL.LD.....R',
    'RRRRRRRRRRRRRRRR',
  ],
  ladderEye: 'BOTH',
  objects: [
    { kind: 'base', id: 'base', x: 1, y: 1, eye: 'FELLOW' },
    { kind: 'robot', id: 'robotA', x: 3, y: 1, eye: 'AMBLYOPIC' },
    { kind: 'robot', id: 'robotB', x: 1, y: 5, eye: 'AMBLYOPIC' },
    { kind: 'key', id: 'key1', x: 2, y: 5, eye: 'AMBLYOPIC', group: 'door1' },
    { kind: 'door', id: 'door1', x: 10, y: 5, eye: 'FELLOW', group: 'door1' },
    { kind: 'switch', id: 'switch1', x: 12, y: 5, eye: 'AMBLYOPIC', group: 'plat1' },
    { kind: 'platform', id: 'plat1', x: 10, y: 3, w: 2, toX: 10, toY: 2, eye: 'FELLOW', group: 'plat1' },
    { kind: 'crystal', id: 'crystal1', x: 12, y: 1, eye: 'FELLOW' },
    { kind: 'crystal', id: 'crystal2', x: 14, y: 1, eye: 'FELLOW' },
    { kind: 'hazard', id: 'hazard1', x: 7, y: 5, eye: 'AMBLYOPIC' },
    { kind: 'lamp', id: 'lamp1', x: 8, y: 1, eye: 'BOTH' },
    { kind: 'lamp', id: 'lamp2', x: 14, y: 5, eye: 'BOTH' },
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
    { amblyopic: ['key'], fellow: ['door'], note: 'Schlüssel ↔ Tür' },
    { amblyopic: ['switch'], fellow: ['platform'], note: 'Schalter ↔ Plattform' },
  ],
  solverRobots: ['robotA'],
};
