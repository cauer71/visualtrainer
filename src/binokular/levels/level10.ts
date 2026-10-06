import type { LevelDef } from './types';

/**
 * Level 10 „Meisterprüfung“ – Kombination aus allem: zwei Roboter mit Druckplatte und Brücke, ein Schalter mit zwei
 * gegenläufigen Plattformen (Reihenfolge!), Leitern rechts nur für das amblyope Auge, wandernde Glut, blasse Ziele,
 * kleine Objekte und mehr Ablenkung.
 *
 * Ablauf: Roboter 2 holt über die rechte (unsichtbare) Leiter den Schlüssel, schließt die Tür auf und hält die
 * Druckplatte → Roboter 1 läuft über die Brücke, holt Kristall 1 hinter der rechten oberen Plattform (steht anfangs)
 * → links hinunter, an der Glut vorbei zum Schalter (obere Plattform fährt ein, mittlere aus) → über die Brücke und
 * die rechte Leiter Kristall 2 holen → links unten Kristall 3 freigraben.
 *
 * Binokulare Paare:
 *  1. Roboter (amblyopes Auge) ↔ Kristalle und Basis (dominantes Auge, geringer Kontrast)
 *  2. Druckplatte (amblyopes Auge) ↔ Brücke (dominantes Auge)
 *  3. Schalter (amblyopes Auge) ↔ zwei gegenläufige Plattformen (dominantes Auge)
 *  4. Schlüssel (amblyopes Auge) ↔ Tür (dominantes Auge)
 *  5. rechte Leiter (amblyopes Auge) ↔ Kristall 2 (dominantes Auge)
 *  Zusätzlich: wandernde Glut mit Bahn, Glutnest in der Erde (amblyopes Auge).
 *
 *   x: 00000000001111111111
 *      01234567890123456789
 *  y0  RRRRRRRRRRRRRRRRRRRR
 *  y1  RB.1.L...--....a.-.CR?   -- Brücke (Druckplatte), a Leiter nur amblyop, - obere Plattform (umgekehrt)
 *  y2  RRRRRLRRR..RRR.R.RRR
 *  y3  RW~~~L~~~RRK..a.._CR    W Schalter, ~ Bahn der Glut (x2–8), K Schlüssel, _ mittlere Plattform (eingefahren)
 *  y4  RRRRRLRRRRRRRR.RR.RR
 *  y5  Rc...L..gR..2.aTP..R    c Kristall 3 in Erde, g Glutnest in Erde, 2 Roboter 2, T Tür, P Druckplatte
 *  y6  RRRRRRRRRRRRRRRRRRRR
 */
const shaft = [1, 2, 3, 4, 5].map((y) => ({ kind: 'ladder' as const, id: `aladder${y}`, x: 14, y, eye: 'AMBLYOPIC' as const }));

export const level10: LevelDef = {
  id: 'level10',
  number: 10,
  nameKey: 'level10',
  map: [
    'RRRRRRRRRRRRRRRRRRRR',
    'R....L.............R',
    'RRRRRLRRR..RRR.R.RRR',
    'R....L...RR........R',
    'RRRRRLRRRRRRRR.RR.RR',
    'RD...L..DR.........R',
    'RRRRRRRRRRRRRRRRRRRR',
  ],
  ladderEye: 'BOTH',
  objects: [
    { kind: 'base', id: 'base', x: 1, y: 1, eye: 'FELLOW' },
    { kind: 'robot', id: 'robot1', x: 3, y: 1, eye: 'AMBLYOPIC' },
    { kind: 'robot', id: 'robot2', x: 12, y: 5, eye: 'AMBLYOPIC' },
    ...shaft,
    { kind: 'key', id: 'key1', x: 11, y: 3, eye: 'AMBLYOPIC', group: 'door1', mark: 1 },
    { kind: 'door', id: 'door1', x: 15, y: 5, eye: 'FELLOW', group: 'door1', mark: 1 },
    { kind: 'plate', id: 'plate1', x: 16, y: 5, eye: 'AMBLYOPIC', group: 'bridge' },
    { kind: 'platform', id: 'bridge1', x: 11, y: 2, w: 2, toX: 9, toY: 2, eye: 'FELLOW', group: 'bridge' },
    { kind: 'switch', id: 'switch1', x: 1, y: 3, eye: 'AMBLYOPIC', group: 'seesaw' },
    { kind: 'platform', id: 'upper', x: 17, y: 2, w: 1, toX: 16, toY: 2, eye: 'FELLOW', group: 'seesaw', inverted: true },
    { kind: 'platform', id: 'middle', x: 18, y: 4, w: 1, toX: 17, toY: 4, eye: 'FELLOW', group: 'seesaw' },
    { kind: 'crystal', id: 'crystal1', x: 18, y: 1, eye: 'FELLOW' },
    { kind: 'crystal', id: 'crystal2', x: 18, y: 3, eye: 'FELLOW' },
    { kind: 'crystal', id: 'crystal3', x: 1, y: 5, eye: 'FELLOW' },
    {
      kind: 'hazard',
      id: 'ember1',
      x: 2,
      y: 3,
      eye: 'AMBLYOPIC',
      patrol: [2, 3, 4, 5, 6, 7, 8].map((x) => ({ x, y: 3 })),
    },
    { kind: 'hazard', id: 'hazard2', x: 8, y: 5, eye: 'AMBLYOPIC' },
    { kind: 'lamp', id: 'lamp1', x: 7, y: 1, eye: 'BOTH' },
    { kind: 'lamp', id: 'lamp2', x: 12, y: 3, eye: 'BOTH' },
  ],
  requiredCrystals: 3,
  maxFailuresForStar: 0,
  difficulty: {
    objectSize: 0.7,
    contrast: { amblyopic: 1, fellow: 1, target: 0.55, neutral: 1, distractor: 0.5 },
    moveSpeed: 2.5,
    hazardSpeed: 0.65,
    objectCount: 14,
    pairDistance: 12,
    distraction: 0.5,
    complexity: 5,
    reactionTimeMs: 1538,
    binocularDurationS: 300,
  },
  pairs: [
    { amblyopic: ['robot'], fellow: ['crystal', 'base'], note: 'Roboter ↔ Kristalle/Basis (blass)' },
    { amblyopic: ['ladder'], fellow: ['crystal'], note: 'rechte Leiter ↔ Kristall 2' },
    { amblyopic: ['plate'], fellow: ['platform'], note: 'Druckplatte ↔ Brücke' },
    { amblyopic: ['switch'], fellow: ['platform'], note: 'Schalter ↔ zwei gegenläufige Plattformen' },
    { amblyopic: ['key'], fellow: ['door'], note: 'Schlüssel ↔ Tür' },
  ],
  solverRobots: ['robot1', 'robot2'],
};
