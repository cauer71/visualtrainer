/**
 * Automatischer Löser und Binokular-Prüfer.
 *
 * Der Löser plant mit einem WISSEN, das auf bestimmte Objektklassen beschränkt sein kann (z. B. nur das, was das
 * dominante Auge sieht). Er sucht (Dijkstra, kürzeste Gesamtweglänge) über abstrakte Zustände – Positionen der
 * Roboter, gegrabene Felder, offene Türen, Schalterstellungen, Zustand jedes Gegenstands – und springt dabei nur
 * zwischen „interessanten“ Feldern (Gegenstände, Schalter, Druckplatten, Basis, Felder neben Erde und Türen);
 * der Weg dazwischen ist eine Breitensuche im Raster. Den Plan führt er über dieselbe Eingabe aus wie ein Spieler:
 * Roboter antippen, Feld antippen (`engine.tap`) bzw. hinlaufen (`engine.moveTo`).
 *
 *  - Mit beiden Augen (volles Wissen) muss jedes Level lösbar sein (Grundlage für `?autoplay=1`).
 *  - Mit nur einem Auge darf es nicht lösbar sein (Spezifikation „binokulare Erfordernis“), siehe Tests.
 *
 * Mechaniken: mehrere Roboter (Level 4, 10: einer hält die Druckplatte, der andere läuft über die Brücke),
 * umgekehrte Plattformen (Reihenfolge der Schalter, Level 7), wandernde Gefahr mit festem Zeitplan (Level 6 ff.:
 * Kennt der Löser die Gefahr, wartet er, bis der Weg laut Zeitplan frei ist – `engine.moveIsSafe`).
 *
 * Was der Löser unabhängig vom Auge weiß: Feldraster (Fels/Erde/Luft, neutral), Zahl der benötigten Kristalle
 * (Anzeige oben) und Meldungen wie „Gefahr berührt bei Feld x,y“ (neutraler Text), aus denen er lernt.
 */
import type { LevelDef, LevelObjectDef } from '../levels/types';
import type { EyeVisibility } from '../vision/color';
import { Engine, type EngineOptions } from './engine';
import { cellKey, type Cell, type Tile } from './types';
import { findPath as worldPath, isStandable, neighbors, parseMap, type WorldModel } from './world';

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
  | { type: 'move'; r: number; path: Cell[] }
  | { type: 'dig'; r: number; x: number; y: number }
  | { type: 'pickup'; r: number; item: number }
  | { type: 'unlock'; r: number; x: number; y: number }
  | { type: 'toggle'; r: number }
  | { type: 'deliver'; r: number };

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
  robotIds: string[];
  robots: Cell[];
  items: PItem[];
  doors: { x: number; y: number; group?: string }[];
  switches: { x: number; y: number; group?: string }[];
  plates: { x: number; y: number; group?: string }[];
  platforms: { w: number; off: Cell; on: Cell; group?: string; inverted: boolean }[];
  base: Cell | null;
  /** bekannte feste Gefahren (werden gemieden) */
  hazards: Set<string>;
  /** sind wandernde Gefahren bekannt? (dann vor dem Losgehen auf freien Weg warten) */
  movingHazards: boolean;
  required: number;
}

/** Zustand des Gegenstands: liegt, erledigt (benutzt/abgeliefert) oder getragen von Roboter r (CARRIED + r) */
const LYING = 0;
const DONE = 1;
const CARRIED = 2;

/** abstrakter Zustand */
interface PState {
  pos: Cell[];
  dug: number;
  doors: number;
  sw: number;
  items: number[];
}

const keyOf = (s: PState): string => `${s.pos.map((c) => `${c.x},${c.y}`).join(';')}|${s.dug}|${s.doors}|${s.sw}|${s.items.join('')}`;

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
  for (const o of objs) if (o.kind === 'ladder') ladders.add(cellKey(o.x, o.y));
  const robots = level.solverRobots.map((id) => objs.find((o) => o.kind === 'robot' && o.id === id)).filter((o): o is LevelObjectDef => !!o);
  const base = objs.find((o) => o.kind === 'base');
  const hazards = objs.filter((o) => o.kind === 'hazard');
  return {
    cols: m.cols,
    rows: m.rows,
    tiles: m.tiles,
    ladders,
    dirt,
    robotIds: robots.map((o) => o.id),
    robots: robots.map((o) => ({ x: o.x, y: o.y })),
    items: objs.filter((o) => o.kind === 'key' || o.kind === 'crystal').map((o) => ({ id: o.id, kind: o.kind as 'key' | 'crystal', x: o.x, y: o.y, group: o.group })),
    doors: objs.filter((o) => o.kind === 'door').map((o) => ({ x: o.x, y: o.y, group: o.group })),
    switches: objs.filter((o) => o.kind === 'switch').map((o) => ({ x: o.x, y: o.y, group: o.group })),
    plates: objs.filter((o) => o.kind === 'plate').map((o) => ({ x: o.x, y: o.y, group: o.group })),
    platforms: objs
      .filter((o) => o.kind === 'platform')
      .map((o) => ({ w: o.w ?? 1, off: { x: o.x, y: o.y }, on: { x: o.toX ?? o.x, y: o.toY ?? o.y }, group: o.group, inverted: o.inverted === true })),
    base: base ? { x: base.x, y: base.y } : null,
    hazards: new Set(hazards.filter((o) => !o.patrol || o.patrol.length < 2).map((o) => cellKey(o.x, o.y))),
    movingHazards: hazards.some((o) => o.patrol && o.patrol.length >= 2),
    required: level.requiredCrystals,
  };
}

/**
 * Welt im Zustand `s`. `ignoreRobot`: dieser Roboter drückt keine Druckplatte (er läuft gerade los – sobald er die
 * Platte verlässt, fährt deren Plattform zurück; darauf darf sein eigener Weg nicht bauen).
 */
function beliefWorld(b: Belief, s: PState, ignoreRobot = -1): WorldModel {
  const dug = new Set<string>();
  b.dirt.forEach((c, i) => s.dug & (1 << i) && dug.add(cellKey(c.x, c.y)));
  const pressed = b.plates.filter((pl) => s.pos.some((c, r) => r !== ignoreRobot && c.x === pl.x && c.y === pl.y));
  const plat = new Set<string>();
  for (const p of b.platforms) {
    const powered = b.switches.some((sw, i) => s.sw & (1 << i) && (!sw.group || sw.group === p.group)) || pressed.some((pl) => !pl.group || pl.group === p.group);
    const c = powered !== p.inverted ? p.on : p.off;
    for (let j = 0; j < p.w; j++) plat.add(cellKey(c.x + j, c.y));
  }
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
  let done = 0;
  b.items.forEach((it, i) => it.kind === 'crystal' && s.items[i] === DONE && done++);
  return done >= b.required;
}

/** alle Roboter haben Halt (sonst würde das Spiel sie zurücksetzen – solche Züge plant der Löser nicht) */
function allStand(b: Belief, s: PState): boolean {
  const w = beliefWorld(b, s);
  return s.pos.every((c) => isStandable(w, c.x, c.y));
}

/** Breitensuche ab `from`: Vorgänger je erreichbarem Feld (bekannte Gefahren gemieden) */
function bfs(w: WorldModel, from: Cell, avoid: ReadonlySet<string>): Map<string, string | null> {
  const prev = new Map<string, string | null>([[cellKey(from.x, from.y), null]]);
  const queue: Cell[] = [from];
  for (let i = 0; i < queue.length; i++) {
    const c = queue[i];
    for (const n of neighbors(w, c)) {
      const k = cellKey(n.x, n.y);
      if (prev.has(k) || avoid.has(k)) continue;
      prev.set(k, cellKey(c.x, c.y));
      queue.push(n);
    }
  }
  return prev;
}

function pathTo(prev: Map<string, string | null>, to: Cell): Cell[] {
  const path: Cell[] = [];
  let cur: string | null = cellKey(to.x, to.y);
  while (cur) {
    const p: string | null = prev.get(cur) ?? null;
    if (p === null) break;
    const [x, y] = cur.split(',').map(Number);
    path.unshift({ x, y });
    cur = p;
  }
  return path;
}

/** einfache Prioritätswarteschlange (binärer Heap) */
class Heap<T> {
  private a: { p: number; n: number; v: T }[] = [];
  private n = 0;
  get size(): number {
    return this.a.length;
  }
  push(p: number, v: T): void {
    const a = this.a;
    a.push({ p, n: this.n++, v });
    let i = a.length - 1;
    while (i > 0) {
      const j = (i - 1) >> 1;
      if (a[j].p < a[i].p || (a[j].p === a[i].p && a[j].n < a[i].n)) break;
      [a[i], a[j]] = [a[j], a[i]];
      i = j;
    }
  }
  pop(): { p: number; v: T } | undefined {
    const a = this.a;
    if (!a.length) return undefined;
    const top = a[0];
    const last = a.pop()!;
    if (a.length) {
      a[0] = last;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1;
        const r = l + 1;
        let m = i;
        if (l < a.length && (a[l].p < a[m].p || (a[l].p === a[m].p && a[l].n < a[m].n))) m = l;
        if (r < a.length && (a[r].p < a[m].p || (a[r].p === a[m].p && a[r].n < a[m].n))) m = r;
        if (m === i) break;
        [a[i], a[m]] = [a[m], a[i]];
        i = m;
      }
    }
    return top;
  }
}

/** Folgezustände eines Zustands mit Kosten (Weglänge in Feldern, Aktion = 1) */
function successors(b: Belief, s: PState): { n: PState; a: Action; cost: number }[] {
  const out: { n: PState; a: Action; cost: number }[] = [];
  const w = beliefWorld(b, s);
  for (let r = 0; r < s.pos.length; r++) {
    const at = s.pos[r];
    const carrying = s.items.findIndex((q) => q === CARRIED + r);
    // Bewegen zu interessanten Feldern
    const prev = bfs(beliefWorld(b, s, r), at, b.hazards);
    const targets = new Map<string, Cell>();
    const addT = (x: number, y: number) => {
      const k = cellKey(x, y);
      if (prev.has(k) && !(x === at.x && y === at.y) && !s.pos.some((c, j) => j !== r && c.x === x && c.y === y)) targets.set(k, { x, y });
    };
    if (b.base) addT(b.base.x, b.base.y);
    b.items.forEach((it, i) => s.items[i] === LYING && addT(it.x, it.y));
    for (const q of b.switches) addT(q.x, q.y);
    for (const q of b.plates) addT(q.x, q.y);
    b.dirt.forEach((c, i) => {
      if (!(s.dug & (1 << i))) {
        addT(c.x - 1, c.y);
        addT(c.x + 1, c.y);
      }
    });
    b.doors.forEach((d, i) => {
      if (!(s.doors & (1 << i))) {
        addT(d.x - 1, d.y);
        addT(d.x + 1, d.y);
      }
    });
    for (const t of targets.values()) {
      const path = pathTo(prev, t);
      const pos = s.pos.map((c, j) => (j === r ? t : c));
      const n = { ...s, pos };
      if (!allStand(b, n)) continue;
      out.push({ n, a: { type: 'move', r, path }, cost: path.length });
    }
    // Graben (waagrecht; bekannte Glutnester meiden)
    for (const dx of [-1, 1]) {
      const i = b.dirt.findIndex((c) => c.x === at.x + dx && c.y === at.y);
      if (i < 0 || s.dug & (1 << i) || b.hazards.has(cellKey(at.x + dx, at.y))) continue;
      const n = { ...s, dug: s.dug | (1 << i) };
      if (allStand(b, n)) out.push({ n, a: { type: 'dig', r, x: at.x + dx, y: at.y }, cost: 1 });
    }
    // Aufnehmen
    if (carrying < 0) {
      b.items.forEach((it, i) => {
        if (s.items[i] !== LYING || it.x !== at.x || it.y !== at.y || w.tileAt(it.x, it.y) !== 'air') return;
        const items = [...s.items];
        items[i] = CARRIED + r;
        out.push({ n: { ...s, items }, a: { type: 'pickup', r, item: i }, cost: 1 });
      });
    }
    // Aufschließen
    if (carrying >= 0 && b.items[carrying].kind === 'key') {
      const key = b.items[carrying];
      b.doors.forEach((d, i) => {
        if (s.doors & (1 << i) || d.y !== at.y || Math.abs(d.x - at.x) !== 1) return;
        if (d.group && key.group && d.group !== key.group) return;
        const items = [...s.items];
        items[carrying] = DONE;
        out.push({ n: { ...s, doors: s.doors | (1 << i), items }, a: { type: 'unlock', r, x: d.x, y: d.y }, cost: 1 });
      });
    }
    // Schalter
    const swi = b.switches.findIndex((q) => q.x === at.x && q.y === at.y);
    if (swi >= 0) {
      const n = { ...s, sw: s.sw ^ (1 << swi) };
      if (allStand(b, n)) out.push({ n, a: { type: 'toggle', r }, cost: 1 });
    }
    // Abliefern
    if (carrying >= 0 && b.items[carrying].kind === 'crystal' && b.base && b.base.x === at.x && b.base.y === at.y) {
      const items = [...s.items];
      items[carrying] = DONE;
      out.push({ n: { ...s, items }, a: { type: 'deliver', r }, cost: 1 });
    }
  }
  return out;
}

/** Kürzeste Aktionsfolge (Dijkstra) oder null */
export function plan(b: Belief, start: PState, maxStates = 250000): Action[] | null {
  if (!b.base || !b.robots.length) return null;
  if (b.items.filter((i) => i.kind === 'crystal').length < b.required) return null;
  const best = new Map<string, number>();
  const prev = new Map<string, { from: string; action: Action } | null>();
  const states = new Map<string, PState>();
  const k0 = keyOf(start);
  best.set(k0, 0);
  prev.set(k0, null);
  states.set(k0, start);
  const heap = new Heap<string>();
  heap.push(0, k0);
  const closed = new Set<string>();
  while (heap.size && states.size < maxStates) {
    const top = heap.pop()!;
    const key = top.v;
    if (closed.has(key) || top.p > (best.get(key) ?? Infinity)) continue;
    closed.add(key);
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
    for (const { n, a, cost } of successors(b, s)) {
      const nk = keyOf(n);
      const c = top.p + cost;
      if (c >= (best.get(nk) ?? Infinity)) continue;
      best.set(nk, c);
      prev.set(nk, { from: key, action: a });
      states.set(nk, n);
      heap.push(c, nk);
    }
  }
  return null;
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
/** längste Wartezeit auf freien Weg vor einer wandernden Gefahr */
const MAX_WAIT_MS = 30000;

/**
 * Eingabe des Lösers: Feld antippen wie ein Spieler, oder reines Hinlaufen (`moveTo`, ohne Aktion am Ziel).
 * `safe`: vorher warten, bis der Weg laut Zeitplan frei von der wandernden Gefahr ist (`engine.moveIsSafe`).
 */
export interface SolverCommand {
  type: 'tap' | 'move';
  x: number;
  y: number;
  safe?: boolean;
}

/** Darf die Eingabe jetzt ausgeführt werden? (Automatik wartet bei `safe` auf freien Weg) */
export function commandReady(e: Engine, c: SolverCommand): boolean {
  return !c.safe || e.moveIsSafe(c.x, c.y);
}

/** Führt eine Eingabe in der Spiellogik aus */
export function applyCommand(e: Engine, c: SolverCommand): void {
  if (c.type === 'tap') e.tap(c.x, c.y);
  else e.moveTo(c.x, c.y);
}

/** Eingabe ausführen (bei `safe` vorher auf freien Weg warten) und die Zeit laufen lassen, bis alle Roboter stehen */
function commandAndWait(e: Engine, c: SolverCommand, log: SolverCommand[]): void {
  for (let t = 0; t < MAX_WAIT_MS && !commandReady(e, c); t += TICK) e.tick(TICK);
  applyCommand(e, c);
  log.push({ ...c });
  for (let i = 0; i < 4000 && !e.isIdle(); i++) e.tick(TICK);
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
  if (!b.robots.length) return done(false, 'noRobot');
  let state: PState = { pos: b.robots.map((c) => ({ ...c })), dug: 0, doors: 0, sw: 0, items: b.items.map(() => LYING) };
  const resync = () => {
    state = { ...state, pos: b.robotIds.map((id) => e.robotCell(id)!) };
  };
  const select = (r: number) => {
    const id = b.robotIds[r];
    if (e.selected === id) return;
    const c = e.robotCell(id)!;
    commandAndWait(e, { type: 'tap', x: c.x, y: c.y }, taps);
    e.drainEvents();
  };
  const learn = (events: ReturnType<Engine['drainEvents']>) => {
    for (const ev of events) if (ev.msg === 'hazard' && ev.cell && !ev.mobile) b.hazards.add(cellKey(ev.cell.x, ev.cell.y));
  };
  for (let attempt = 0; attempt < 12; attempt++) {
    const actions = plan(b, state);
    if (!actions) return done(e.status === 'won', e.status === 'won' ? 'solved' : 'noPlan');
    let replan = false;
    for (let i = 0; i < actions.length && !replan; i++) {
      const a = actions[i];
      select(a.r);
      const id = b.robotIds[a.r];
      const before = e.failures;
      if (a.type === 'move') {
        // in Stücke teilen, die die Wegsuche des Spiels genau so läuft
        let from = state.pos[a.r];
        let at = 0;
        while (at < a.path.length) {
          let end = -1;
          for (let j = at; j < a.path.length; j++) {
            const sub = a.path.slice(at, j + 1);
            const p = e.findPath(from, sub[sub.length - 1]);
            if (!p || p.length !== sub.length || !p.every((c, n) => c.x === sub[n].x && c.y === sub[n].y)) break;
            end = j;
          }
          if (end < 0) return done(false, 'blocked');
          const target = a.path[end];
          commandAndWait(e, { type: 'move', x: target.x, y: target.y, ...(b.movingHazards ? { safe: true } : {}) }, taps);
          const events = e.drainEvents();
          if (e.failures > before) {
            learn(events);
            resync();
            replan = true;
            break;
          }
          if (e.status === 'won') return done(true, 'solved');
          const rc = e.robotCell(id)!;
          if (rc.x !== target.x || rc.y !== target.y) return done(false, 'blocked');
          from = target;
          at = end + 1;
        }
        if (replan) break;
        state = { ...state, pos: state.pos.map((c, j) => (j === a.r ? { ...from } : c)) };
        // Engine-Zustand der übrigen Roboter (z. B. von einer zurückfahrenden Plattform zurückgesetzt) übernehmen
        resync();
        continue;
      }
      const at = state.pos[a.r];
      if (a.type === 'pickup') {
        if (e.snapshot().carrying === null) commandAndWait(e, { type: 'tap', x: at.x, y: at.y }, taps);
        if (e.snapshot().carrying === null) return done(false, 'blocked');
      } else if (a.type === 'deliver') {
        const already = state.items.filter((q, n) => q === DONE && b.items[n].kind === 'crystal').length;
        if (e.snapshot().carrying === 'crystal') commandAndWait(e, { type: 'tap', x: at.x, y: at.y }, taps);
        if (e.snapshot().delivered <= already && e.status !== 'won') return done(false, 'blocked');
      } else if (a.type === 'toggle') {
        commandAndWait(e, { type: 'tap', x: at.x, y: at.y }, taps);
        if (!e.drainEvents().some((ev) => ev.msg === 'switchOn' || ev.msg === 'switchOff')) return done(false, 'blocked');
      } else if (a.type === 'unlock') {
        commandAndWait(e, { type: 'tap', x: a.x, y: a.y }, taps);
        if (!e.drainEvents().some((ev) => ev.msg === 'doorOpened')) return done(false, 'blocked');
      } else if (a.type === 'dig') {
        commandAndWait(e, { type: 'tap', x: a.x, y: a.y }, taps);
        const evs = e.drainEvents();
        if (e.failures > before) {
          learn(evs);
          const di = b.dirt.findIndex((c) => c.x === a.x && c.y === a.y);
          state = { ...state, dug: state.dug | (1 << di) };
          resync();
          // das Glutnest ist erloschen: Feld wieder freigeben
          b.hazards.delete(cellKey(a.x, a.y));
          replan = true;
          break;
        }
        if (e.world().tileAt(a.x, a.y) !== 'air') return done(false, 'blocked');
      }
      e.drainEvents();
      if (e.failures > before) {
        resync();
        replan = true;
        break;
      }
      state = applyAction(b, state, a);
      if (e.status === 'won') return done(true, 'solved');
    }
    if (e.status === 'won') return done(true, 'solved');
    if (!replan) return done(false, 'noPlan');
  }
  return done(e.status === 'won', e.status === 'won' ? 'solved' : 'gaveUp');
}

/** Zustand nach einer Nicht-Lauf-Aktion */
function applyAction(b: Belief, s: PState, a: Action): PState {
  const items = [...s.items];
  switch (a.type) {
    case 'move':
      return { ...s, pos: s.pos.map((c, j) => (j === a.r ? a.path[a.path.length - 1] : c)) };
    case 'dig':
      return { ...s, dug: s.dug | (1 << b.dirt.findIndex((c) => c.x === a.x && c.y === a.y)) };
    case 'pickup':
      items[a.item] = CARRIED + a.r;
      return { ...s, items };
    case 'unlock': {
      const c = items.findIndex((q) => q === CARRIED + a.r);
      items[c] = DONE;
      return { ...s, doors: s.doors | (1 << b.doors.findIndex((d) => d.x === a.x && d.y === a.y)), items };
    }
    case 'toggle':
      return { ...s, sw: s.sw ^ (1 << b.switches.findIndex((q) => q.x === s.pos[a.r].x && q.y === s.pos[a.r].y)) };
    case 'deliver': {
      const c = items.findIndex((q) => q === CARRIED + a.r);
      items[c] = DONE;
      return { ...s, items };
    }
  }
}

/**
 * Wiedergabe einer Eingabefolge wie die Automatik im Browser: unregelmäßige Bildzeiten, Pause zwischen den Eingaben,
 * bei `safe` warten auf freien Weg. Prüft, dass die Automatik das Level auch außerhalb des Lösers schafft.
 */
export function replayCommands(level: LevelDef, cmds: readonly SolverCommand[], opts: EngineOptions = {}, frames: readonly number[] = [16, 17, 16, 33], gapMs = 180): { completed: boolean; failures: number; activeMs: number } {
  const e = new Engine(level, opts);
  let i = 0;
  let wait = 600;
  for (let f = 0; f < 200000 && e.status !== 'won'; f++) {
    const dt = frames[f % frames.length];
    e.tick(dt);
    wait -= dt;
    if (i < cmds.length && e.isIdle() && wait <= 0 && commandReady(e, cmds[i])) {
      applyCommand(e, cmds[i++]);
      wait = gapMs;
    }
    if (i >= cmds.length && e.isIdle() && wait <= -2000) break;
  }
  return { completed: e.status === 'won', failures: e.failures, activeMs: e.elapsedMs };
}

/** Erreichbarkeit im Anfangswissen (Hilfe für Tests/Debug) */
export function initialPath(level: LevelDef, k: Knowledge, to: Cell): Cell[] | null {
  const b = buildBelief(level, k);
  if (!b.robots.length) return null;
  const s: PState = { pos: b.robots.map((c) => ({ ...c })), dug: 0, doors: 0, sw: 0, items: b.items.map(() => LYING) };
  return worldPath(beliefWorld(b, s), b.robots[0], to);
}
