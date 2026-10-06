import type { LevelDef } from './types';

/**
 * Level 6 „Wandernde Glut“ – eine Glut wandert gemächlich auf einer festen Bahn hin und her (0,5 Felder/s,
 * also alle 2 s ein Feld). Bahn und Glut sieht nur das amblyope Auge. Keine Eile: abwarten, bis die Glut weit weg
 * ist, dann die Bahn queren. Berührt der Roboter die Glut, ist das ein Fehlversuch (zurück zum sicheren Punkt).
 *
 * Ablauf: Leiter hinunter (die Bahn kreuzt die Leiter) → Schlüssel 1 holen → Tür 1 → Kristall 3 zur Basis →
 * Schlüssel 2 holen → oben Tür 2 → auf der Bahn nach links zum Schalter (Brücke fährt aus) → Kristalle 1 und 2
 * hinter der Brücke holen. Links unten steckt ein Glutnest in der Erde.
 *
 * Binokulare Paare:
 *  1. Roboter (amblyopes Auge) ↔ Kristalle und Basis (dominantes Auge)
 *  2. Schlüssel 1/2 (amblyopes Auge) ↔ Tür 1/2 (dominantes Auge)
 *  3. Schalter (amblyopes Auge) ↔ Brücke/Plattform (dominantes Auge)
 *  Zusätzlich: wandernde Glut und Bahn nur für das amblyope Auge.
 *
 *   x: 0123456789012345
 *  y0  RRRRRRRRRRRRRRRR
 *  y1  RB.A..L...T--cCR    T Tür 2, -- Brücke, c Kristall in Erde
 *  y2  RRRRRRLRRRR..RRR
 *  y3  RW.~~~L~~~R==RRR    W Schalter, ~ Bahn der Glut (x3–9), == Plattform eingefahren
 *  y4  RRRRRRLRRRRRRRRR
 *  y5  RgK...L.T...K.CR    g Glutnest in Erde, K Schlüssel 1/2, T Tür 1
 *  y6  RRRRRRRRRRRRRRRR
 */
export const level06: LevelDef = {
  id: 'level06',
  number: 6,
  nameKey: 'level06',
  map: [
    'RRRRRRRRRRRRRRRR',
    'R.....L......D.R',
    'RRRRRRLRRRR..RRR',
    'R.....L...R..RRR',
    'RRRRRRLRRRRRRRRR',
    'RD....L........R',
    'RRRRRRRRRRRRRRRR',
  ],
  ladderEye: 'BOTH',
  objects: [
    { kind: 'base', id: 'base', x: 1, y: 1, eye: 'FELLOW' },
    { kind: 'robot', id: 'robotA', x: 3, y: 1, eye: 'AMBLYOPIC' },
    { kind: 'key', id: 'key1', x: 2, y: 5, eye: 'AMBLYOPIC', group: 'door1', mark: 1 },
    { kind: 'door', id: 'door1', x: 8, y: 5, eye: 'FELLOW', group: 'door1', mark: 1 },
    { kind: 'key', id: 'key2', x: 12, y: 5, eye: 'AMBLYOPIC', group: 'door2', mark: 2 },
    { kind: 'door', id: 'door2', x: 10, y: 1, eye: 'FELLOW', group: 'door2', mark: 2 },
    { kind: 'switch', id: 'switch1', x: 1, y: 3, eye: 'AMBLYOPIC', group: 'bridge' },
    { kind: 'platform', id: 'bridge1', x: 11, y: 3, w: 2, toX: 11, toY: 2, eye: 'FELLOW', group: 'bridge' },
    { kind: 'crystal', id: 'crystal1', x: 14, y: 1, eye: 'FELLOW' },
    { kind: 'crystal', id: 'crystal2', x: 13, y: 1, eye: 'FELLOW' },
    { kind: 'crystal', id: 'crystal3', x: 14, y: 5, eye: 'FELLOW' },
    {
      kind: 'hazard',
      id: 'ember1',
      x: 3,
      y: 3,
      eye: 'AMBLYOPIC',
      patrol: [3, 4, 5, 6, 7, 8, 9].map((x) => ({ x, y: 3 })),
    },
    { kind: 'hazard', id: 'hazard2', x: 1, y: 5, eye: 'AMBLYOPIC' },
    { kind: 'lamp', id: 'lamp1', x: 8, y: 1, eye: 'BOTH' },
    { kind: 'lamp', id: 'lamp2', x: 10, y: 5, eye: 'BOTH' },
  ],
  requiredCrystals: 3,
  maxFailuresForStar: 0,
  difficulty: {
    objectSize: 0.75,
    contrast: { amblyopic: 1, fellow: 1, target: 1, neutral: 1, distractor: 0.45 },
    moveSpeed: 2.5,
    hazardSpeed: 0.5,
    objectCount: 12,
    pairDistance: 8,
    distraction: 0.4,
    complexity: 4,
    reactionTimeMs: 2000,
    binocularDurationS: 230,
  },
  pairs: [
    { amblyopic: ['robot'], fellow: ['crystal', 'base'], note: 'Roboter ↔ Kristalle/Basis' },
    { amblyopic: ['key'], fellow: ['door'], note: 'Schlüssel 1/2 ↔ Tür 1/2' },
    { amblyopic: ['switch'], fellow: ['platform'], note: 'Schalter ↔ Brücke' },
  ],
  solverRobots: ['robotA'],
};
