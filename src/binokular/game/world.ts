/**
 * Bewegungsregeln im Raster (Seitenansicht) und Wegsuche. Rein, ohne Zustand.
 *
 * Regeln:
 *  - Ein Roboter steht in einem Luftfeld ohne verschlossene Tür und ohne Plattform („begehbar“).
 *  - Er braucht Halt: festes Feld darunter (Fels, Erde, verschlossene Tür, Plattform) oder eine Leiter im eigenen
 *    Feld bzw. im Feld darunter (oben auf der Leiter).
 *  - Waagrecht geht es in jedes benachbarte haltbare Feld, senkrecht nur über Leitern.
 *
 * Dieselben Regeln nutzt der automatische Löser mit seinem (evtl. unvollständigen) Wissen.
 */
import { cellKey, type Cell, type Tile } from './types';

export interface WorldModel {
  cols: number;
  rows: number;
  tileAt(x: number, y: number): Tile;
  hasLadder(x: number, y: number): boolean;
  lockedDoorAt(x: number, y: number): boolean;
  platformAt(x: number, y: number): boolean;
}

export function inBounds(w: WorldModel, x: number, y: number): boolean {
  return x >= 0 && y >= 0 && x < w.cols && y < w.rows;
}

export function isSolid(w: WorldModel, x: number, y: number): boolean {
  if (!inBounds(w, x, y)) return true;
  const t = w.tileAt(x, y);
  return t !== 'air' || w.lockedDoorAt(x, y) || w.platformAt(x, y);
}

export function isPassable(w: WorldModel, x: number, y: number): boolean {
  return inBounds(w, x, y) && !isSolid(w, x, y);
}

export function isStandable(w: WorldModel, x: number, y: number): boolean {
  if (!isPassable(w, x, y)) return false;
  return isSolid(w, x, y + 1) || w.hasLadder(x, y) || (inBounds(w, x, y + 1) && w.hasLadder(x, y + 1));
}

/** Nachbarfelder, in die ein Roboter von `c` aus in einem Schritt gehen kann (feste Reihenfolge: links, rechts, oben, unten) */
export function neighbors(w: WorldModel, c: Cell): Cell[] {
  const out: Cell[] = [];
  for (const dx of [-1, 1]) {
    if (isStandable(w, c.x + dx, c.y)) out.push({ x: c.x + dx, y: c.y });
  }
  for (const dy of [-1, 1]) {
    const nx = c.x;
    const ny = c.y + dy;
    if (!isStandable(w, nx, ny)) continue;
    if (w.hasLadder(c.x, c.y) || w.hasLadder(nx, ny)) out.push({ x: nx, y: ny });
  }
  return out;
}

/**
 * Kürzester Weg (Breitensuche) von `from` nach `to`, ohne Start, mit Ziel. `[]` wenn schon da, `null` wenn kein Weg.
 * `avoid`: Felder, die nicht betreten werden sollen (z. B. bekannte Gefahren).
 */
export function findPath(w: WorldModel, from: Cell, to: Cell, avoid?: ReadonlySet<string>): Cell[] | null {
  if (from.x === to.x && from.y === to.y) return [];
  if (!isStandable(w, to.x, to.y)) return null;
  const prev = new Map<string, string | null>();
  const start = cellKey(from.x, from.y);
  const goal = cellKey(to.x, to.y);
  prev.set(start, null);
  const queue: Cell[] = [from];
  for (let i = 0; i < queue.length; i++) {
    const c = queue[i];
    for (const n of neighbors(w, c)) {
      const k = cellKey(n.x, n.y);
      if (prev.has(k)) continue;
      if (avoid?.has(k) && k !== goal) continue;
      prev.set(k, cellKey(c.x, c.y));
      if (k === goal) {
        const path: Cell[] = [];
        let cur: string | null = k;
        while (cur && cur !== start) {
          const [x, y] = cur.split(',').map(Number);
          path.unshift({ x, y });
          cur = prev.get(cur) ?? null;
        }
        return path;
      }
      queue.push(n);
    }
  }
  return null;
}

/** Alle von `from` aus erreichbaren Felder */
export function reachable(w: WorldModel, from: Cell): Set<string> {
  const seen = new Set<string>([cellKey(from.x, from.y)]);
  const queue: Cell[] = [from];
  for (let i = 0; i < queue.length; i++) {
    for (const n of neighbors(w, queue[i])) {
      const k = cellKey(n.x, n.y);
      if (!seen.has(k)) {
        seen.add(k);
        queue.push(n);
      }
    }
  }
  return seen;
}

/** Zeichenraster eines Levels in Feldtypen und Leiterfelder zerlegen */
export function parseMap(map: readonly string[]): { tiles: Tile[][]; ladders: Cell[]; cols: number; rows: number } {
  const rows = map.length;
  const cols = Math.max(...map.map((r) => r.length));
  const tiles: Tile[][] = [];
  const ladders: Cell[] = [];
  for (let y = 0; y < rows; y++) {
    const row: Tile[] = [];
    for (let x = 0; x < cols; x++) {
      const ch = map[y][x] ?? 'R';
      if (ch === 'R') row.push('rock');
      else if (ch === 'D') row.push('dirt');
      else {
        row.push('air');
        if (ch === 'L') ladders.push({ x, y });
      }
    }
    tiles.push(row);
  }
  return { tiles, ladders, cols, rows };
}
