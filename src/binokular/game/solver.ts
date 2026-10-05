/**
 * Automatischer Löser und Binokular-Prüfer.
 *
 * Der Löser plant mit einem WISSEN, das auf bestimmte Objektklassen beschränkt sein kann (z. B. nur das, was das
 * dominante Auge sieht). Er plant per Breitensuche über abstrakte Zustände (Position, gegrabene Felder, Tür,
 * Plattform, Gegenstände) und führt den Plan dann über dieselbe Eingabe aus wie ein Spieler: `engine.tap(x, y)`.
 *
 *  - Mit beiden Augen (volles Wissen) muss jedes Level lösbar sein (Grundlage für `?autoplay=1`).
 *  - Mit nur einem Auge darf es nicht lösbar sein (Spezifikation „binokulare Erfordernis“), siehe Tests.
 *
 * Was der Löser unabhängig vom Auge weiß: Feldraster (Fels/Erde/Luft, neutral), Zahl der benötigten Kristalle
 * (Anzeige oben) und Meldungen wie „Gefahr berührt bei Feld x,y“ (neutraler Text), aus denen er lernt.
 */
import type { LevelDef, LevelObjectDef } from '../levels/types';
import type { EyeVisibility } from '../vision/color';
import { Engine, type EngineOptions } from './engine';
import { cellKey, type Cell, type Tile } from './types';
import { findPath as worldPath, neighbors, parseMap, type WorldModel } from './world';

export interface Knowledge {
  /** gesehene Augenklassen (BOTH ist immer bekannt) */
  eyes: EyeVisibility[];
  /** Objektarten, die trotz Augenklasse NICHT bekannt sind (Prüfung einzelner Paare) */
  hide?: string[];
  /** Objektarten, die trotz Augenklasse bekannt sind (Prüfung „selbst mit diesem Wissen nicht lösbar“) */
  grant?: string[];
}

export const BOTH_EYES: Knowledge = { eyes: ['AMBLYOPIC', 'FELLOW'] };
export const AMBLYOPIC_ONLY: Knowledge = { eyes: ['AMBLYOPIC'] };
export const FELLOW_ONLY: Knowledge = { eyes: ['FELLOW'] };

type Action =
  | { type: 'move'; to: Cell }
  | { type: 'dig'; x: number; y: number }
  | { type: 'pickup' }
  | { type: 'unlock'; x: number; y: number }
  | { type: 'toggle' }
  | { type: 'deliver' };

interface PItem {
  id: string;
  kind: 'key' | 'crystal';
  x: number;
  y: number;
  group?: string;
}

interface Belief {
  cols: number;
  rows: number;
  tiles: Tile[][];
  ladders: Set<string>;
  dirt: Cell[];
  robot: Cell | null;
  items: PItem[];
  doors: { x: number; y: number; group?: string }[];
  switches: { x: number; y: number; group?: string }[];
  platforms: { w: number; off: Cell; on: Cell; group?: string }[];
  base: Cell | null;
  hazards: Set<string>;
  required: number;
}

/** abstrakter Zustand: Position, Bitmasken, Status je Gegenstand (0 liegt, 1 getragen, 2 erledigt) */
interface PState {
  x: number;
  y: number;
  dug: number;
  doors: number;
  plats: number;
  items: number[];
}

const keyOf = (s: PState): string => `${s.x},${s.y}|${s.dug}|${s.doors}|${s.plats}|${s.items.join('')}`;

function knows(kind: string, eye: EyeVisibility, k: Knowledge): boolean {
  if (k.hide?.includes(kind)) return false;
  if (k.grant?.includes(kind)) return true;
  return eye === 'BOTH' || k.eyes.includes(eye);
}

/** Anfangswissen aus der Leveldefinition, gefiltert nach Augenklassen */
export function buildBelief(level: LevelDef, k: Knowledge): Belief {
  const m = parseMap(level.map);
  const known = (o: LevelObjectDef) => knows(o.kind, o.eye, k);
  const ladders = new Set<string>();
  if (knows('ladder', level.ladderEye, k)) for (const l of m.ladders) ladders.add(cellKey(l.x, l.y));
  const dirt: Cell[] = [];
  m.tiles.forEach((row, y) => row.forEach((t, x) => t === 'dirt' && dirt.push({ x, y })));
  const objs = level.objects.filter(known);
  const robot = objs.find((o) => o.kind === 'robot' && o.id === level.solverRobot);
  const base = objs.find((o) => o.kind === 'base');
  return {
    cols: m.cols,
    rows: m.rows,
    tiles: m.tiles,
    ladders,
    dirt,
    robot: robot ? { x: robot.x, y: robot.y } : null,
    items: objs.filter((o) => o.kind === 'key' || o.kind === 'crystal').map((o) => ({ id: o.id, kind: o.kind as 'key' | 'crystal', x: o.x, y: o.y, group: o.group })),
    doors: objs.filter((o) => o.kind === 'door').map((o) => ({ x: o.x, y: o.y, group: o.group })),
    switches: objs.filter((o) => o.kind === 'switch').map((o) => ({ x: o.x, y: o.y, group: o.group })),
    platforms: objs.filter((o) => o.kind === 'platform').map((o) => ({ w: o.w ?? 1, off: { x: o.x, y: o.y }, on: { x: o.toX ?? o.x, y: o.toY ?? o.y }, group: o.group })),
    base: base ? { x: base.x, y: base.y } : null,
    hazards: new Set(objs.filter((o) => o.kind === 'hazard').map((o) => cellKey(o.x, o.y))),
    required: level.requiredCrystals,
  };
}

function beliefWorld(b: Belief, s: PState): WorldModel {
  const dug = new Set<string>();
  b.dirt.forEach((c, i) => s.dug & (1 << i) && dug.add(cellKey(c.x, c.y)));
  const plat = new Set<string>();
  b.platforms.forEach((p, i) => {
    const c = s.plats & (1 << i) ? p.on : p.off;
    for (let j = 0; j < p.w; j++) plat.add(cellKey(c.x + j, c.y));
  });
  return {
    cols: b.cols,
    rows: b.rows,
    tileAt: (x, y) => {
      const t = b.tiles[y]?.[x] ?? 'rock';
      return t === 'dirt' && dug.has(cellKey(x, y)) ? 'air' : t;
    },
    hasLadder: (x, y) => b.ladders.has(cellKey(x, y)),
    lockedDoorAt: (x, y) => b.doors.some((d, i) => !(s.doors & (1 << i)) && d.x === x && d.y === y),
    platformAt: (x, y) => plat.has(cellKey(x, y)),
  };
}

function isGoal(b: Belief, s: PState): boolean {
  const crystals = b.items.map((it, i) => ({ it, st: s.items[i] })).filter((q) => q.it.kind === 'crystal');
  return crystals.length >= b.required && crystals.filter((q) => q.st === 2).length >= b.required;
}

/** Breitensuche über abstrakte Zustände; liefert die Aktionsfolge oder null */
export function plan(b: Belief, start: PState, maxStates = 400000): Action[] | null {
  if (!b.base) return null;
  if (b.items.filter((i) => i.kind === 'crystal').length < b.required) return null;
  const prev = new Map<string, { from: string; action: Action } | null>();
  const states = new Map<string, PState>();
  const k0 = keyOf(start);
  prev.set(k0, null);
  states.set(k0, start);
  const queue: string[] = [k0];
  for (let qi = 0; qi < queue.length && prev.size < maxStates; qi++) {
    const key = queue[qi];
    const s = states.get(key)!;
    if (isGoal(b, s)) {
      const actions: Action[] = [];
      let cur: string | null = key;
      while (cur) {
        const p = prev.get(cur);
        if (!p) break;
        actions.unshift(p.action);
        cur = p.from;
      }
      return actions;
    }
    const w = beliefWorld(b, s);
    const carrying = s.items.indexOf(1);
    const push = (n: PState, a: Action) => {
      const nk = keyOf(n);
      if (prev.has(nk)) return;
      prev.set(nk, { from: key, action: a });
      states.set(nk, n);
      queue.push(nk);
    };
    // Bewegen (bekannte Gefahren meiden)
    for (const n of neighbors(w, s)) {
      if (b.hazards.has(cellKey(n.x, n.y))) continue;
      push({ ...s, x: n.x, y: n.y }, { type: 'move', to: n });
    }
    // Graben (waagrecht; bekannte Glutnester meiden)
    for (const dx of [-1, 1]) {
      const i = b.dirt.findIndex((c) => c.x === s.x + dx && c.y === s.y);
      if (i < 0 || s.dug & (1 << i) || b.hazards.has(cellKey(s.x + dx, s.y))) continue;
      push({ ...s, dug: s.dug | (1 << i) }, { type: 'dig', x: s.x + dx, y: s.y });
    }
    // Aufnehmen
    if (carrying < 0) {
      b.items.forEach((it, i) => {
        if (s.items[i] !== 0 || it.x !== s.x || it.y !== s.y) return;
        if (w.tileAt(it.x, it.y) !== 'air') return;
        const items = [...s.items];
        items[i] = 1;
        push({ ...s, items }, { type: 'pickup' });
      });
    }
    // Aufschließen
    if (carrying >= 0 && b.items[carrying].kind === 'key') {
      b.doors.forEach((d, i) => {
        if (s.doors & (1 << i) || d.y !== s.y || Math.abs(d.x - s.x) !== 1) return;
        const key = b.items[carrying];
        if (d.group && key.group && d.group !== key.group) return;
        const items = [...s.items];
        items[carrying] = 2;
        push({ ...s, doors: s.doors | (1 << i), items }, { type: 'unlock', x: d.x, y: d.y });
      });
    }
    // Schalter
    const sw = b.switches.find((q) => q.x === s.x && q.y === s.y);
    if (sw) {
      let plats = s.plats;
      b.platforms.forEach((p, i) => {
        if (!sw.group || p.group === sw.group) plats ^= 1 << i;
      });
      push({ ...s, plats }, { type: 'toggle' });
    }
    // Abliefern
    if (carrying >= 0 && b.items[carrying].kind === 'crystal' && b.base.x === s.x && b.base.y === s.y) {
      const items = [...s.items];
      items[carrying] = 2;
      push({ ...s, items }, { type: 'deliver' });
    }
  }
  return null;
}

/** Zustand nach einer Aktion (für das Nachführen des eigenen Wissens beim Ausführen) */
function applyAction(b: Belief, s: PState, a: Action): PState {
  switch (a.type) {
    case 'move':
      return { ...s, x: a.to.x, y: a.to.y };
    case 'dig': {
      const i = b.dirt.findIndex((c) => c.x === a.x && c.y === a.y);
      return { ...s, dug: s.dug | (1 << i) };
    }
    case 'pickup': {
      const i = b.items.findIndex((it, j) => s.items[j] === 0 && it.x === s.x && it.y === s.y);
      const items = [...s.items];
      items[i] = 1;
      return { ...s, items };
    }
    case 'unlock': {
      const c = s.items.indexOf(1);
      const di = b.doors.findIndex((d) => d.x === a.x && d.y === a.y);
      const items = [...s.items];
      items[c] = 2;
      return { ...s, doors: s.doors | (1 << di), items };
    }
    case 'toggle': {
      const sw = b.switches.find((q) => q.x === s.x && q.y === s.y);
      let plats = s.plats;
      b.platforms.forEach((p, i) => {
        if (!sw?.group || p.group === sw.group) plats ^= 1 << i;
      });
      return { ...s, plats };
    }
    case 'deliver': {
      const c = s.items.indexOf(1);
      const items = [...s.items];
      items[c] = 2;
      return { ...s, items };
    }
  }
}

export interface SolveResult {
  completed: boolean;
  failures: number;
  /** Eingaben in Reihenfolge (für die automatische Wiedergabe `?autoplay=1`) */
  commands: SolverCommand[];
  activeMs: number;
  reason: 'solved' | 'noRobot' | 'noPlan' | 'blocked' | 'gaveUp';
}

const TICK = 50;

/** Eingabe des Lösers: Feld antippen wie ein Spieler, oder reines Hinlaufen (`moveTo`, ohne Aktion am Ziel) */
export interface SolverCommand {
  type: 'tap' | 'move';
  x: number;
  y: number;
}

/** Führt eine Eingabe in der Spiellogik aus */
export function applyCommand(e: Engine, c: SolverCommand): void {
  if (c.type === 'tap') e.tap(c.x, c.y);
  else e.moveTo(c.x, c.y);
}

/** Eingabe ausführen und die Zeit laufen lassen, bis alle Roboter stehen */
function commandAndWait(e: Engine, c: SolverCommand, log: SolverCommand[]): void {
  applyCommand(e, c);
  log.push({ ...c });
  for (let i = 0; i < 4000 && !e.isIdle(); i++) e.tick(TICK);
}

function tapAndWait(e: Engine, c: Cell, log: SolverCommand[]): void {
  commandAndWait(e, { type: 'tap', x: c.x, y: c.y }, log);
}

/**
 * Löst ein Level mit begrenztem Wissen und führt die Aktionen in einer echten `Engine` aus.
 * Bei einer Gefahr lernt der Löser deren Feld aus der (neutralen) Meldung und plant neu.
 */
export function solveLevel(level: LevelDef, k: Knowledge = BOTH_EYES, opts: EngineOptions = {}): SolveResult {
  const e = new Engine(level, opts);
  const b = buildBelief(level, k);
  const taps: SolverCommand[] = [];
  const done = (completed: boolean, reason: SolveResult['reason']): SolveResult => ({ completed, failures: e.failures, commands: taps, activeMs: e.elapsedMs, reason });
  if (!b.robot) return done(false, 'noRobot');
  let state: PState = { x: b.robot.x, y: b.robot.y, dug: 0, doors: 0, plats: 0, items: b.items.map(() => 0) };
  // Roboter auswählen
  tapAndWait(e, b.robot, taps);
  for (let attempt = 0; attempt < 6; attempt++) {
    const actions = plan(b, state);
    if (!actions) return done(e.status === 'won', e.status === 'won' ? 'solved' : 'noPlan');
    let replan = false;
    let i = 0;
    while (i < actions.length && !replan) {
      const a = actions[i];
      if (a.type === 'move') {
        // aufeinanderfolgende Schritte zusammenfassen, solange die Wegsuche des Spiels genau diesen Weg nimmt
        const from = { x: state.x, y: state.y };
        let best = i;
        for (let j = i; j < actions.length && actions[j].type === 'move'; j++) {
          const sub = actions.slice(i, j + 1).map((q) => (q as { to: Cell }).to);
          const p = e.findPath(from, sub[sub.length - 1]);
          if (!p || p.length !== sub.length || !p.every((c, n) => c.x === sub[n].x && c.y === sub[n].y)) break;
          best = j;
        }
        const target = (actions[best] as { to: Cell }).to;
        const before = e.failures;
        commandAndWait(e, { type: 'move', ...target }, taps);
        const events = e.drainEvents();
        if (e.failures > before) {
          // Gefahr: Feld merken, vom tatsächlichen Standort neu planen
          for (const ev of events) if (ev.msg === 'hazard' && ev.cell) b.hazards.add(cellKey(ev.cell.x, ev.cell.y));
          const rc = e.robotCell(level.solverRobot)!;
          state = { ...state, x: rc.x, y: rc.y };
          replan = true;
          break;
        }
        const rc = e.robotCell(level.solverRobot)!;
        if (rc.x !== target.x || rc.y !== target.y) return done(false, 'blocked');
        for (let n = i; n <= best; n++) state = applyAction(b, state, actions[n]);
        i = best + 1;
        // Ziel war der Schalter: das Spiel hat ihn beim Ankommen schon betätigt
        if (actions[i]?.type === 'toggle' && events.some((ev) => ev.msg === 'switchOn' || ev.msg === 'switchOff')) {
          state = applyAction(b, state, actions[i]);
          i++;
        }
        if (e.status === 'won') return done(true, 'solved');
        continue;
      }
      const snap = e.snapshot();
      const before = e.failures;
      if (a.type === 'pickup') {
        if (snap.carrying === null) tapAndWait(e, { x: state.x, y: state.y }, taps);
        if (e.snapshot().carrying === null) return done(false, 'blocked');
      } else if (a.type === 'deliver') {
        if (snap.carrying === 'crystal') tapAndWait(e, { x: state.x, y: state.y }, taps);
        if (e.snapshot().delivered <= state.items.filter((q, n) => q === 2 && b.items[n].kind === 'crystal').length) return done(false, 'blocked');
      } else if (a.type === 'toggle') {
        tapAndWait(e, { x: state.x, y: state.y }, taps);
        if (!e.drainEvents().some((ev) => ev.msg === 'switchOn' || ev.msg === 'switchOff')) return done(false, 'blocked');
      } else if (a.type === 'unlock') {
        tapAndWait(e, { x: a.x, y: a.y }, taps);
        if (!e.drainEvents().some((ev) => ev.msg === 'doorOpened')) return done(false, 'blocked');
      } else if (a.type === 'dig') {
        tapAndWait(e, { x: a.x, y: a.y }, taps);
        const evs = e.drainEvents();
        if (e.failures > before) {
          for (const ev of evs) if (ev.msg === 'hazard' && ev.cell) b.hazards.add(cellKey(ev.cell.x, ev.cell.y));
          const rc = e.robotCell(level.solverRobot)!;
          state = { ...applyAction(b, state, a), x: rc.x, y: rc.y };
          // das Glutnest ist erloschen: Feld wieder freigeben
          b.hazards.delete(cellKey(a.x, a.y));
          replan = true;
          break;
        }
        if (e.world().tileAt(a.x, a.y) !== 'air') return done(false, 'blocked');
      }
      e.drainEvents();
      state = applyAction(b, state, a);
      i++;
      if (e.status === 'won') return done(true, 'solved');
    }
    if (e.status === 'won') return done(true, 'solved');
    if (!replan) return done(false, 'noPlan');
  }
  return done(e.status === 'won', e.status === 'won' ? 'solved' : 'gaveUp');
}

/** Erreichbarkeit im Anfangswissen (Hilfe für Tests/Debug) */
export function initialPath(level: LevelDef, k: Knowledge, to: Cell): Cell[] | null {
  const b = buildBelief(level, k);
  if (!b.robot) return null;
  const s: PState = { x: b.robot.x, y: b.robot.y, dug: 0, doors: 0, plats: 0, items: b.items.map(() => 0) };
  return worldPath(beliefWorld(b, s), b.robot, to);
}
