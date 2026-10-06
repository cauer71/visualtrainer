import type { LevelDef } from './types';

/**
 * Level 5 „Glitzernde Wände“ – kleinere Objekte (Größe 0,75) und mehr Ablenkung: mehr Deko-Steine und neutrale
 * Erzbrocken, die Kristallen ähneln, aber nicht benutzbar sind (keine Blitze, kein Flackern).
 *
 * Ablauf: rechts hinunter zum Schlüssel 1 → unten den Schalter betätigen (Brücke oben fährt aus) → Tür 1
 * aufschließen → über den Bogen am Glutnest vorbei, Kristall 3 freigraben und zur Basis bringen → Schlüssel 2
 * holen → über die Brücke zur Tür 2 → Kristall 1 und 2 holen. Unten rechts steckt ein Glutnest in der Erde.
 *
 * Binokulare Paare:
 *  1. Roboter (amblyopes Auge) ↔ Kristalle und Basis (dominantes Auge)
 *  2. Schlüssel 1/2 (amblyopes Auge) ↔ Tür 1/2 (dominantes Auge), Kennzeichen 1/2
 *  3. Schalter (amblyopes Auge) ↔ Brücke/Plattform (dominantes Auge)
 *
 *   x: 0123456789012345
 *  y0  RRRRRRRRRRRRRRRR
 *  y1  RCc..T.--..L.ABR    C/c Kristall (frei/in Erde), T Tür 2, -- Brücke, A Roboter, B Basis
 *  y2  RRRRRRR..RRLRRRR
 *  y3  RK.c...==RRL..KR    K Schlüssel 2 (links) und 1 (rechts), == Plattform eingefahren
 *  y4  RRRRLRLRRRRLRRRR
 *  y5  R...LGLT...L.WgR    G Glutnest, T Tür 1, W Schalter, g Glutnest in Erde
 *  y6  RRRRRRRRRRRRRRRR
 */
export const level05: LevelDef = {
  id: 'level05',
  number: 5,
  nameKey: 'level05',
  map: [
    'RRRRRRRRRRRRRRRR',
    'R.D........L...R',
    'RRRRRRR..RRLRRRR',
    'R..D.....RRL...R',
    'RRRRLRLRRRRLRRRR',
    'R...L.L....L..DR',
    'RRRRRRRRRRRRRRRR',
  ],
  ladderEye: 'BOTH',
  objects: [
    { kind: 'base', id: 'base', x: 14, y: 1, eye: 'FELLOW' },
    { kind: 'robot', id: 'robotA', x: 13, y: 1, eye: 'AMBLYOPIC' },
    { kind: 'key', id: 'key1', x: 14, y: 3, eye: 'AMBLYOPIC', group: 'door1', mark: 1 },
    { kind: 'door', id: 'door1', x: 7, y: 5, eye: 'FELLOW', group: 'door1', mark: 1 },
    { kind: 'key', id: 'key2', x: 1, y: 3, eye: 'AMBLYOPIC', group: 'door2', mark: 2 },
    { kind: 'door', id: 'door2', x: 5, y: 1, eye: 'FELLOW', group: 'door2', mark: 2 },
    { kind: 'switch', id: 'switch1', x: 13, y: 5, eye: 'AMBLYOPIC', group: 'bridge' },
    { kind: 'platform', id: 'bridge1', x: 7, y: 3, w: 2, toX: 7, toY: 2, eye: 'FELLOW', group: 'bridge' },
    { kind: 'crystal', id: 'crystal1', x: 1, y: 1, eye: 'FELLOW' },
    { kind: 'crystal', id: 'crystal2', x: 2, y: 1, eye: 'FELLOW' },
    { kind: 'crystal', id: 'crystal3', x: 3, y: 3, eye: 'FELLOW' },
    { kind: 'hazard', id: 'hazard1', x: 5, y: 5, eye: 'AMBLYOPIC' },
    { kind: 'hazard', id: 'hazard2', x: 14, y: 5, eye: 'AMBLYOPIC' },
    { kind: 'lamp', id: 'lamp1', x: 9, y: 1, eye: 'BOTH' },
    { kind: 'lamp', id: 'lamp2', x: 2, y: 5, eye: 'BOTH' },
  ],
  requiredCrystals: 3,
  maxFailuresForStar: 0,
  difficulty: {
    objectSize: 0.75,
    contrast: { amblyopic: 1, fellow: 1, target: 1, neutral: 1, distractor: 0.45 },
    moveSpeed: 2.5,
    hazardSpeed: 0,
    objectCount: 12,
    pairDistance: 8,
    distraction: 0.4,
    complexity: 4,
    reactionTimeMs: null,
    binocularDurationS: 220,
  },
  pairs: [
    { amblyopic: ['robot'], fellow: ['crystal', 'base'], note: 'Roboter ↔ Kristalle/Basis' },
    { amblyopic: ['key'], fellow: ['door'], note: 'Schlüssel 1/2 ↔ Tür 1/2' },
    { amblyopic: ['switch'], fellow: ['platform'], note: 'Schalter ↔ Brücke' },
  ],
  solverRobots: ['robotA'],
};
