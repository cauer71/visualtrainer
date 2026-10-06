import type { LevelDef } from './types';

/**
 * Level 9 „Die große Mine“ – 24 × 10 Felder, weite Wege zwischen zusammengehörigen Objekten. Auf kleinen Bildschirmen
 * zeigt die Kamera einen Ausschnitt (Felder bleiben mindestens 48 px groß); Ziehen verschiebt den Ausschnitt,
 * der ausgewählte Roboter bleibt im Bild.
 *
 * Ablauf: links Kristall 4 freigraben → zum Schlüssel 1 ganz rechts (am Glutnest über den Bogen vorbei) →
 * mittlere Leiter hinunter auf die Bahn der Glut, Tür 1 aufschließen, Schlüssel 2 holen → Schalter betätigen
 * (Brücke oben) → über die Brücke, rechts hinunter zur Tür 2 → Kristalle 1–3 einsammeln.
 *
 * Binokulare Paare:
 *  1. Roboter (amblyopes Auge) ↔ Kristalle und Basis (dominantes Auge)
 *  2. Schlüssel 1/2 (amblyopes Auge) ↔ Tür 1/2 (dominantes Auge) – weit voneinander entfernt
 *  3. Schalter (amblyopes Auge) ↔ Brücke/Plattform (dominantes Auge)
 *  Zusätzlich: wandernde Glut, Glutnest im Gang, Glutnest in der Erde (amblyopes Auge).
 *
 *   x: 000000000011111111112222
 *      012345678901234567890123
 *  y0  RRRRRRRRRRRRRRRRRRRRRRRR
 *  y1  RB.A...L..--.....L...dCR    -- Brücke, d Erde, C Kristall 1
 *  y2  RRRRRRRLRR..RRRRRLRRRRRR
 *  y3  Rc.....L..==Rg...L.T..CR    c Kristall 4 in Erde, == Plattform, g Glutnest in Erde, T Tür 2
 *  y4  RRRRRRRLRLRRRRRRRRRRRRRR
 *  y5  R......LGL....L.W...L.KR    G Glutnest, W Schalter, K Schlüssel 1
 *  y6  RRRRRRRRRRRRRRLRRRRRLRRR
 *  y7  RRRRRRRRRRRRRRLRRRRRLRRR
 *  y8  R..K......T~~~L~~~R.L.CR    K Schlüssel 2, T Tür 1, ~ Bahn der Glut (x11–17)
 *  y9  RRRRRRRRRRRRRRRRRRRRRRRR
 */
export const level09: LevelDef = {
  id: 'level09',
  number: 9,
  nameKey: 'level09',
  map: [
    'RRRRRRRRRRRRRRRRRRRRRRRR',
    'R......L.........L...D.R',
    'RRRRRRRLRR..RRRRRLRRRRRR',
    'RD.....L....RD...L.....R',
    'RRRRRRRLRLRRRRRRRRRRRRRR',
    'R......L.L....L.....L..R',
    'RRRRRRRRRRRRRRLRRRRRLRRR',
    'RRRRRRRRRRRRRRLRRRRRLRRR',
    'R.............L...R.L..R',
    'RRRRRRRRRRRRRRRRRRRRRRRR',
  ],
  ladderEye: 'BOTH',
  objects: [
    { kind: 'base', id: 'base', x: 1, y: 1, eye: 'FELLOW' },
    { kind: 'robot', id: 'robotA', x: 3, y: 1, eye: 'AMBLYOPIC' },
    { kind: 'crystal', id: 'crystal1', x: 22, y: 1, eye: 'FELLOW' },
    { kind: 'crystal', id: 'crystal2', x: 22, y: 3, eye: 'FELLOW' },
    { kind: 'crystal', id: 'crystal3', x: 22, y: 8, eye: 'FELLOW' },
    { kind: 'crystal', id: 'crystal4', x: 1, y: 3, eye: 'FELLOW' },
    { kind: 'key', id: 'key1', x: 22, y: 5, eye: 'AMBLYOPIC', group: 'door1', mark: 1 },
    { kind: 'door', id: 'door1', x: 10, y: 8, eye: 'FELLOW', group: 'door1', mark: 1 },
    { kind: 'key', id: 'key2', x: 3, y: 8, eye: 'AMBLYOPIC', group: 'door2', mark: 2 },
    { kind: 'door', id: 'door2', x: 19, y: 3, eye: 'FELLOW', group: 'door2', mark: 2 },
    { kind: 'switch', id: 'switch1', x: 16, y: 5, eye: 'AMBLYOPIC', group: 'bridge' },
    { kind: 'platform', id: 'bridge1', x: 10, y: 3, w: 2, toX: 10, toY: 2, eye: 'FELLOW', group: 'bridge' },
    { kind: 'hazard', id: 'hazard1', x: 8, y: 5, eye: 'AMBLYOPIC' },
    { kind: 'hazard', id: 'hazard2', x: 13, y: 3, eye: 'AMBLYOPIC' },
    {
      kind: 'hazard',
      id: 'ember1',
      x: 11,
      y: 8,
      eye: 'AMBLYOPIC',
      patrol: [11, 12, 13, 14, 15, 16, 17].map((x) => ({ x, y: 8 })),
    },
    { kind: 'lamp', id: 'lamp1', x: 5, y: 1, eye: 'BOTH' },
    { kind: 'lamp', id: 'lamp2', x: 14, y: 1, eye: 'BOTH' },
    { kind: 'lamp', id: 'lamp3', x: 11, y: 5, eye: 'BOTH' },
    { kind: 'lamp', id: 'lamp4', x: 6, y: 8, eye: 'BOTH' },
  ],
  requiredCrystals: 4,
  maxFailuresForStar: 0,
  difficulty: {
    objectSize: 0.7,
    contrast: { amblyopic: 1, fellow: 1, target: 0.6, neutral: 1, distractor: 0.5 },
    moveSpeed: 2.5,
    hazardSpeed: 0.6,
    objectCount: 14,
    pairDistance: 15,
    distraction: 0.45,
    complexity: 5,
    reactionTimeMs: 1667,
    binocularDurationS: 280,
  },
  pairs: [
    { amblyopic: ['robot'], fellow: ['crystal', 'base'], note: 'Roboter ↔ Kristalle/Basis' },
    { amblyopic: ['key'], fellow: ['door'], note: 'Schlüssel 1/2 ↔ Tür 1/2 (weit auseinander)' },
    { amblyopic: ['switch'], fellow: ['platform'], note: 'Schalter ↔ Brücke' },
  ],
  solverRobots: ['robotA'],
};
