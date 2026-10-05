/**
 * Spiellogik eines Levels („Binocular Mine“). Ohne DOM, ohne Farben, deterministisch.
 *
 * Eingabe ist nur `tap(x, y)` (Feld angetippt) plus `dropItem()`; die Zeit läuft über `tick(dtMs)`.
 * Ausgabe ist eine Szene aus `GameObject`s mit `eyeVisibility` und `contrast` (siehe `scene()`), Meldungen
 * (`drainEvents()`) und Zählwerte (`snapshot()`).
 *
 * Bedienung (Touch und Maus gleich):
 *  - Roboter antippen → auswählen. Ausgewählten Roboter noch einmal antippen → Aktion an Ort und Stelle
 *    (Schalter betätigen, Kristall abliefern, Gegenstand aufnehmen oder ablegen).
 *  - Leeres Feld antippen → Roboter läuft auf dem kürzesten Weg dorthin (Wegsuche, Gefahren werden NICHT umgangen –
 *    sie sieht nur das amblyope Auge, der Spieler muss selbst ausweichen).
 *  - Erde antippen → hinlaufen und graben. Tür antippen → hinlaufen und (mit Schlüssel) aufschließen.
 *  - Schalter, Basis, Gegenstand antippen → hinlaufen und benutzen / abliefern / aufnehmen.
 */
import { LEVELS } from '../levels';
import type { LevelDef } from '../levels/types';
import { cellKey, type Cell, type GameEvent, type GameMessage, type GameObject, type Scene, type Tile } from './types';
import { findPath, isStandable, neighbors, parseMap, type WorldModel } from './world';
import type { EyeVisibility } from '../vision/color';

export interface EngineOptions {
  /** Felder pro Sekunde (überschreibt den Levelwert) */
  moveSpeed?: number;
  /** Objektgröße relativ zum Feld (überschreibt den Levelwert) */
  objectSize?: number;
  /** visuelle Ablenkung 0–1 (überschreibt den Levelwert) */
  distraction?: number;
}

type Intent =
  | { type: 'dig'; x: number; y: number }
  | { type: 'unlock'; x: number; y: number }
  | { type: 'pickup' }
  | { type: 'toggle' }
  | { type: 'deliver' }
  | { type: 'act' };

interface Robot {
  id: string;
  start: Cell;
  cell: Cell;
  path: Cell[];
  progress: number;
  carrying: string | null;
  intent: Intent | null;
  /** letzter sicherer Punkt (Feld, von dem aus der aktuelle Weg begann) */
  safe: Cell;
  /** ms seit dem letzten Zurücksetzen (weiche Einblendung) */
  sinceSpawn: number;
  eye: EyeVisibility;
}

interface Item {
  id: string;
  kind: 'key' | 'crystal';
  x: number;
  y: number;
  state: 'buried' | 'free' | 'carried' | 'used' | 'delivered';
  carriedBy: string | null;
  group?: string;
  eye: EyeVisibility;
}

interface Door {
  id: string;
  x: number;
  y: number;
  open: boolean;
  group?: string;
  eye: EyeVisibility;
}

interface Switch {
  id: string;
  x: number;
  y: number;
  on: boolean;
  group?: string;
  eye: EyeVisibility;
}

interface Platform {
  id: string;
  w: number;
  off: Cell;
  on: Cell;
  active: boolean;
  /** Anzeigeposition 0 (eingefahren) … 1 (ausgefahren) */
  anim: number;
  group?: string;
  eye: EyeVisibility;
}

interface Hazard {
  id: string;
  x: number;
  y: number;
  active: boolean;
  eye: EyeVisibility;
}

interface Static {
  id: string;
  kind: 'lamp' | 'pebble' | 'ladder';
  x: number;
  y: number;
  eye: EyeVisibility;
  distractor: boolean;
}

export interface EngineSnapshot {
  status: 'playing' | 'won';
  delivered: number;
  required: number;
  failures: number;
  elapsedMs: number;
  selected: string | null;
  carrying: string | null;
  moving: boolean;
}

/** Plattform-Fahrzeit in ms (weich, kein Ruck) */
export const PLATFORM_MS = 700;
/** Einblendzeit eines zurückgesetzten Roboters in ms */
export const RESPAWN_FADE_MS = 400;

/** kleiner deterministischer Zufallsgenerator (für Deko-Steine) */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class Engine {
  readonly level: LevelDef;
  readonly cols: number;
  readonly rows: number;
  readonly tiles: Tile[][];
  status: 'playing' | 'won' = 'playing';
  failures = 0;
  delivered = 0;
  elapsedMs = 0;
  selected: string | null = null;
  readonly speed: number;
  readonly objectSize: number;
  private robots: Robot[] = [];
  private items: Item[] = [];
  private doors: Door[] = [];
  private switches: Switch[] = [];
  private platforms: Platform[] = [];
  private hazards: Hazard[] = [];
  private statics: Static[] = [];
  private base: Cell & { eye: EyeVisibility };
  private ladderSet = new Set<string>();
  private events: GameEvent[] = [];

  constructor(level: LevelDef = LEVELS[0], opts: EngineOptions = {}) {
    this.level = level;
    const m = parseMap(level.map);
    this.cols = m.cols;
    this.rows = m.rows;
    this.tiles = m.tiles;
    this.speed = opts.moveSpeed ?? level.difficulty.moveSpeed;
    this.objectSize = Math.min(1, Math.max(0.4, opts.objectSize ?? level.difficulty.objectSize));
    let base: (Cell & { eye: EyeVisibility }) | null = null;
    for (const l of m.ladders) {
      this.ladderSet.add(cellKey(l.x, l.y));
      this.statics.push({ id: `ladder${l.x}_${l.y}`, kind: 'ladder', x: l.x, y: l.y, eye: level.ladderEye, distractor: false });
    }
    for (const o of level.objects) {
      switch (o.kind) {
        case 'robot':
          this.robots.push({ id: o.id, start: { x: o.x, y: o.y }, cell: { x: o.x, y: o.y }, path: [], progress: 0, carrying: null, intent: null, safe: { x: o.x, y: o.y }, sinceSpawn: RESPAWN_FADE_MS, eye: o.eye });
          break;
        case 'key':
        case 'crystal':
          this.items.push({ id: o.id, kind: o.kind, x: o.x, y: o.y, state: this.tiles[o.y][o.x] === 'dirt' ? 'buried' : 'free', carriedBy: null, group: o.group, eye: o.eye });
          break;
        case 'door':
          this.doors.push({ id: o.id, x: o.x, y: o.y, open: false, group: o.group, eye: o.eye });
          break;
        case 'switch':
          this.switches.push({ id: o.id, x: o.x, y: o.y, on: false, group: o.group, eye: o.eye });
          break;
        case 'platform':
          this.platforms.push({ id: o.id, w: o.w ?? 1, off: { x: o.x, y: o.y }, on: { x: o.toX ?? o.x, y: o.toY ?? o.y }, active: false, anim: 0, group: o.group, eye: o.eye });
          break;
        case 'hazard':
          this.hazards.push({ id: o.id, x: o.x, y: o.y, active: true, eye: o.eye });
          break;
        case 'base':
          base = { x: o.x, y: o.y, eye: o.eye };
          break;
        case 'lamp':
          this.statics.push({ id: o.id, kind: 'lamp', x: o.x, y: o.y, eye: o.eye, distractor: false });
          break;
        case 'ladder':
          this.ladderSet.add(cellKey(o.x, o.y));
          this.statics.push({ id: o.id, kind: 'ladder', x: o.x, y: o.y, eye: o.eye, distractor: false });
          break;
      }
    }
    if (!base) throw new Error(`Level ${level.id}: Basis fehlt`);
    this.base = base;
    this.addDistractors(opts.distraction ?? level.difficulty.distraction);
  }

  /** Deko-Steine auf Felswänden neben Gängen: neutral und je Auge (geringer Kontrast), Anzahl aus `distraction` */
  private addDistractors(distraction: number): void {
    const n = Math.round(Math.min(1, Math.max(0, distraction)) * 24);
    if (n <= 0) return;
    const rnd = mulberry32(this.level.number * 7919 + 17);
    const spots: Cell[] = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.tiles[y][x] !== 'rock') continue;
        const nearAir = [[0, -1], [0, 1], [-1, 0], [1, 0]].some(([dx, dy]) => this.tiles[y + dy]?.[x + dx] === 'air');
        if (nearAir) spots.push({ x, y });
      }
    }
    const eyes: EyeVisibility[] = ['BOTH', 'AMBLYOPIC', 'FELLOW'];
    for (let i = 0; i < n && spots.length; i++) {
      const s = spots.splice(Math.floor(rnd() * spots.length), 1)[0];
      this.statics.push({ id: `pebble${i}`, kind: 'pebble', x: s.x, y: s.y, eye: eyes[i % 3], distractor: true });
    }
  }

  // --- Weltmodell (volles Wissen) ---------------------------------------------------------------

  private platformCells(): Set<string> {
    const s = new Set<string>();
    for (const p of this.platforms) {
      const c = p.active ? p.on : p.off;
      for (let i = 0; i < p.w; i++) s.add(cellKey(c.x + i, c.y));
    }
    return s;
  }

  world(): WorldModel {
    const plat = this.platformCells();
    return {
      cols: this.cols,
      rows: this.rows,
      tileAt: (x, y) => this.tiles[y]?.[x] ?? 'rock',
      hasLadder: (x, y) => this.ladderSet.has(cellKey(x, y)),
      lockedDoorAt: (x, y) => this.doors.some((d) => !d.open && d.x === x && d.y === y),
      platformAt: (x, y) => plat.has(cellKey(x, y)),
    };
  }

  /** Wegsuche mit vollem Weltwissen (Gefahren werden nicht umgangen) */
  findPath(from: Cell, to: Cell): Cell[] | null {
    return findPath(this.world(), from, to);
  }

  // --- Abfragen ---------------------------------------------------------------------------------

  robotIds(): string[] {
    return this.robots.map((r) => r.id);
  }

  robotCell(id: string): Cell | null {
    const r = this.robots.find((q) => q.id === id);
    return r ? { ...r.cell } : null;
  }

  /** Kein Roboter in Bewegung */
  isIdle(): boolean {
    return this.robots.every((r) => r.path.length === 0);
  }

  snapshot(): EngineSnapshot {
    const sel = this.robots.find((r) => r.id === this.selected);
    return {
      status: this.status,
      delivered: this.delivered,
      required: this.level.requiredCrystals,
      failures: this.failures,
      elapsedMs: this.elapsedMs,
      selected: this.selected,
      carrying: sel?.carrying ? (this.items.find((i) => i.id === sel.carrying)?.kind ?? null) : null,
      moving: !this.isIdle(),
    };
  }

  drainEvents(): GameEvent[] {
    const e = this.events;
    this.events = [];
    return e;
  }

  private emit(msg: GameMessage, extra: Omit<GameEvent, 'msg'> = {}): void {
    this.events.push({ msg, ...extra });
  }

  // --- Eingabe ----------------------------------------------------------------------------------

  select(id: string): void {
    if (!this.robots.some((r) => r.id === id)) return;
    this.selected = id;
    this.emit('robotSelected', { robotId: id });
  }

  /** Ein Feld wurde angetippt (Touch/Maus). Gibt zurück, ob etwas passiert ist. */
  tap(x: number, y: number): boolean {
    if (this.status !== 'playing') return false;
    const here = this.robots.find((r) => r.cell.x === x && r.cell.y === y && r.path.length === 0) ?? this.robots.find((r) => r.cell.x === x && r.cell.y === y);
    if (here) {
      if (this.selected === here.id && here.path.length === 0) {
        this.runIntent(here, { type: 'act' });
        return true;
      }
      this.select(here.id);
      return true;
    }
    const r = this.robots.find((q) => q.id === this.selected);
    if (!r) {
      this.emit('selectRobot');
      return false;
    }
    const tile = this.tiles[y]?.[x];
    if (tile === undefined) return false;
    if (tile === 'dirt') return this.goBeside(r, x, y, { type: 'dig', x, y });
    if (this.doors.some((d) => !d.open && d.x === x && d.y === y)) return this.goBeside(r, x, y, { type: 'unlock', x, y });
    if (this.switches.some((s) => s.x === x && s.y === y)) return this.goTo(r, { x, y }, { type: 'toggle' });
    if (this.base.x === x && this.base.y === y) return this.goTo(r, { x, y }, { type: 'deliver' });
    if (this.items.some((i) => i.state === 'free' && i.x === x && i.y === y)) return this.goTo(r, { x, y }, { type: 'pickup' });
    return this.goTo(r, { x, y }, null);
  }

  /** Ausgewählter Roboter läuft nur hin, ohne Aktion am Ziel (Automatik/Löser; Abliefern an der Basis bleibt automatisch) */
  moveTo(x: number, y: number): boolean {
    const r = this.robots.find((q) => q.id === this.selected);
    if (!r || this.status !== 'playing') return false;
    return this.goTo(r, { x, y }, null);
  }

  /** Ausgewählter Roboter legt seinen Gegenstand ab (Knopf „Ablegen“) */
  dropItem(): boolean {
    const r = this.robots.find((q) => q.id === this.selected);
    if (!r || !r.carrying || r.path.length) return false;
    return this.drop(r);
  }

  /** Startfeld für eine neue Wegsuche: läuft der Roboter gerade, zählt das nächste Feld */
  private planFrom(r: Robot): Cell {
    return r.path.length ? r.path[0] : r.cell;
  }

  private setPath(r: Robot, path: Cell[], intent: Intent | null): void {
    if (r.path.length) {
      r.path = [r.path[0], ...path];
    } else {
      r.path = path;
      r.progress = 0;
      r.safe = { ...r.cell };
    }
    r.intent = intent;
    if (!r.path.length) this.arrive(r);
  }

  private goTo(r: Robot, target: Cell, intent: Intent | null): boolean {
    const from = this.planFrom(r);
    const path = this.findPath(from, target);
    if (!path) {
      this.emit('noPath', { robotId: r.id, cell: target });
      return false;
    }
    this.setPath(r, path, intent);
    return true;
  }

  /** Neben ein Feld (links/rechts) laufen, z. B. zum Graben oder Aufschließen */
  private goBeside(r: Robot, x: number, y: number, intent: Intent): boolean {
    const from = this.planFrom(r);
    let best: Cell[] | null = null;
    for (const dx of [-1, 1]) {
      const c = { x: x + dx, y };
      const p = this.findPath(from, c);
      if (p && (!best || p.length < best.length)) best = p;
    }
    if (!best) {
      this.emit('noPath', { robotId: r.id, cell: { x, y } });
      return false;
    }
    this.setPath(r, best, intent);
    return true;
  }

  // --- Zeit -------------------------------------------------------------------------------------

  tick(dtMs: number): void {
    const dt = Math.max(0, Math.min(dtMs, 1000));
    for (const p of this.platforms) {
      const target = p.active ? 1 : 0;
      const step = dt / PLATFORM_MS;
      p.anim = p.anim < target ? Math.min(target, p.anim + step) : Math.max(target, p.anim - step);
    }
    for (const r of this.robots) r.sinceSpawn += dt;
    if (this.status !== 'playing') return;
    this.elapsedMs += dt;
    for (const r of this.robots) {
      if (!r.path.length) continue;
      r.progress += (dt / 1000) * this.speed;
      while (r.progress >= 1 && r.path.length) {
        const next = r.path[0];
        // Welt könnte sich geändert haben (Tür, Plattform): Schritt erneut prüfen
        const w = this.world();
        if (!neighbors(w, r.cell).some((n) => n.x === next.x && n.y === next.y)) {
          r.path = [];
          r.progress = 0;
          r.intent = null;
          this.emit('noPath', { robotId: r.id, cell: next });
          break;
        }
        r.path.shift();
        r.cell = { ...next };
        r.progress -= 1;
        if (this.hazardAt(r.cell.x, r.cell.y)) {
          this.fail(r, r.cell);
          break;
        }
        if (!r.path.length) {
          r.progress = 0;
          this.arrive(r);
        }
      }
    }
  }

  private hazardAt(x: number, y: number): Hazard | undefined {
    return this.hazards.find((h) => h.active && h.x === x && h.y === y && this.tiles[y][x] === 'air');
  }

  /** Gefahr berührt: Fehlversuch, zurück zum letzten sicheren Punkt (ruhig, weich eingeblendet) */
  private fail(r: Robot, at: Cell): void {
    this.failures++;
    this.emit('hazard', { robotId: r.id, cell: { ...at } });
    this.respawn(r);
  }

  private respawn(r: Robot): void {
    const w = this.world();
    const target = isStandable(w, r.safe.x, r.safe.y) && !this.hazardAt(r.safe.x, r.safe.y) ? r.safe : r.start;
    r.cell = { ...target };
    r.path = [];
    r.progress = 0;
    r.intent = null;
    r.sinceSpawn = 0;
  }

  /** Nach Änderungen der Welt: Roboter ohne Halt kehren zum sicheren Punkt zurück (kein Fehlversuch) */
  private settle(): void {
    const w = this.world();
    for (const r of this.robots) {
      if (!isStandable(w, r.cell.x, r.cell.y)) this.respawn(r);
    }
  }

  private arrive(r: Robot): void {
    const intent = r.intent;
    r.intent = null;
    if (intent) this.runIntent(r, intent);
    else if (this.isBase(r.cell) && this.carriedKind(r) === 'crystal') this.deliver(r);
  }

  private isBase(c: Cell): boolean {
    return c.x === this.base.x && c.y === this.base.y;
  }

  private carriedKind(r: Robot): 'key' | 'crystal' | null {
    return r.carrying ? (this.items.find((i) => i.id === r.carrying)?.kind ?? null) : null;
  }

  private runIntent(r: Robot, it: Intent): void {
    switch (it.type) {
      case 'dig':
        return this.dig(r, it.x, it.y);
      case 'unlock':
        return this.unlock(r, it.x, it.y);
      case 'toggle':
        return this.toggle(r);
      case 'deliver':
        return this.deliver(r);
      case 'pickup':
        return this.pickup(r);
      case 'act': {
        if (this.switches.some((s) => s.x === r.cell.x && s.y === r.cell.y)) return this.toggle(r);
        if (this.isBase(r.cell) && this.carriedKind(r) === 'crystal') return this.deliver(r);
        const item = this.freeItemAt(r.cell);
        if (item && !r.carrying) return this.pickup(r);
        if (r.carrying) {
          this.drop(r);
          return;
        }
        this.emit('nothingHere', { robotId: r.id });
      }
    }
  }

  private freeItemAt(c: Cell): Item | undefined {
    return this.items.find((i) => i.state === 'free' && i.x === c.x && i.y === c.y);
  }

  private dig(r: Robot, x: number, y: number): void {
    if (Math.abs(r.cell.x - x) !== 1 || r.cell.y !== y || this.tiles[y]?.[x] !== 'dirt') return;
    this.tiles[y][x] = 'air';
    for (const i of this.items) if (i.state === 'buried' && i.x === x && i.y === y) i.state = 'free';
    const h = this.hazards.find((q) => q.active && q.x === x && q.y === y);
    if (h) {
      // Glutnest in der Erde: Fehlversuch, das Nest erlischt
      h.active = false;
      this.fail(r, { x, y });
    } else {
      this.emit('dug', { robotId: r.id, cell: { x, y } });
    }
    this.settle();
  }

  private unlock(r: Robot, x: number, y: number): void {
    const door = this.doors.find((d) => !d.open && d.x === x && d.y === y);
    if (!door || Math.abs(r.cell.x - x) !== 1 || r.cell.y !== y) return;
    const key = this.items.find((i) => i.id === r.carrying && i.kind === 'key' && (!door.group || !i.group || i.group === door.group));
    if (!key) {
      this.emit('needKey', { robotId: r.id, cell: { x, y } });
      return;
    }
    door.open = true;
    key.state = 'used';
    key.carriedBy = null;
    r.carrying = null;
    this.emit('doorOpened', { robotId: r.id, cell: { x, y } });
  }

  private toggle(r: Robot): void {
    const sw = this.switches.find((s) => s.x === r.cell.x && s.y === r.cell.y);
    if (!sw) {
      this.emit('nothingHere', { robotId: r.id });
      return;
    }
    sw.on = !sw.on;
    for (const p of this.platforms) if (!sw.group || p.group === sw.group) p.active = sw.on;
    this.emit(sw.on ? 'switchOn' : 'switchOff', { robotId: r.id, cell: { ...r.cell } });
    this.settle();
  }

  private pickup(r: Robot): void {
    const item = this.freeItemAt(r.cell);
    if (!item) {
      this.emit('nothingHere', { robotId: r.id });
      return;
    }
    if (r.carrying) {
      this.emit('handsFull', { robotId: r.id });
      return;
    }
    item.state = 'carried';
    item.carriedBy = r.id;
    r.carrying = item.id;
    this.emit(item.kind === 'key' ? 'pickedKey' : 'pickedCrystal', { robotId: r.id });
    if (item.kind === 'crystal' && this.isBase(r.cell)) this.deliver(r);
  }

  private drop(r: Robot): boolean {
    const item = this.items.find((i) => i.id === r.carrying);
    if (!item) return false;
    if (this.freeItemAt(r.cell)) {
      this.emit('handsFull', { robotId: r.id });
      return false;
    }
    if (item.kind === 'crystal' && this.isBase(r.cell)) {
      this.deliver(r);
      return true;
    }
    item.state = 'free';
    item.carriedBy = null;
    item.x = r.cell.x;
    item.y = r.cell.y;
    r.carrying = null;
    this.emit('dropped', { robotId: r.id });
    return true;
  }

  private deliver(r: Robot): void {
    if (!this.isBase(r.cell)) return;
    const item = this.items.find((i) => i.id === r.carrying);
    if (!item || item.kind !== 'crystal') {
      this.emit('needCrystal', { robotId: r.id });
      return;
    }
    item.state = 'delivered';
    item.carriedBy = null;
    r.carrying = null;
    this.delivered++;
    this.emit('delivered', { robotId: r.id });
    if (this.delivered >= this.level.requiredCrystals) {
      this.status = 'won';
      for (const q of this.robots) {
        q.path = [];
        q.intent = null;
      }
      this.emit('won');
    }
  }

  // --- Szene für die Darstellung ------------------------------------------------------------------

  private robotPos(r: Robot): { x: number; y: number } {
    if (!r.path.length) return { x: r.cell.x, y: r.cell.y };
    const n = r.path[0];
    const t = Math.min(1, r.progress);
    return { x: r.cell.x + (n.x - r.cell.x) * t, y: r.cell.y + (n.y - r.cell.y) * t };
  }

  /** Alle darstellbaren Objekte in Zeichenreihenfolge (hinten → vorne) */
  scene(): Scene {
    const d = this.level.difficulty;
    const size = this.objectSize;
    const k = (eye: EyeVisibility, distractor = false): number =>
      distractor ? d.contrast.distractor : eye === 'AMBLYOPIC' ? d.contrast.amblyopic : eye === 'FELLOW' ? d.contrast.fellow : d.contrast.neutral;
    const objs: GameObject[] = [];
    const add = (o: Omit<GameObject, 'w' | 'size' | 'alpha' | 'contrast'> & Partial<Pick<GameObject, 'w' | 'size' | 'alpha' | 'contrast'>>) =>
      objs.push({ w: 1, size, alpha: 1, contrast: k(o.eyeVisibility), ...o });
    for (const s of this.statics) add({ id: s.id, kind: s.kind, x: s.x, y: s.y, eyeVisibility: s.eye, contrast: k(s.eye, s.distractor), size: s.kind === 'pebble' ? 0.3 : size });
    add({ id: 'base', kind: 'base', x: this.base.x, y: this.base.y, eyeVisibility: this.base.eye, flags: { delivered: this.delivered, required: this.level.requiredCrystals } });
    for (const p of this.platforms) {
      const t = p.anim * p.anim * (3 - 2 * p.anim);
      add({ id: p.id, kind: 'platform', x: p.off.x + (p.on.x - p.off.x) * t, y: p.off.y + (p.on.y - p.off.y) * t, w: p.w, eyeVisibility: p.eye });
    }
    for (const dr of this.doors) add({ id: dr.id, kind: 'door', x: dr.x, y: dr.y, eyeVisibility: dr.eye, flags: { open: dr.open } });
    for (const s of this.switches) add({ id: s.id, kind: 'switch', x: s.x, y: s.y, eyeVisibility: s.eye, flags: { on: s.on } });
    for (const h of this.hazards) if (h.active) add({ id: h.id, kind: 'hazard', x: h.x, y: h.y, eyeVisibility: h.eye, flags: { buried: this.tiles[h.y][h.x] === 'dirt' } });
    for (const i of this.items) {
      if (i.state === 'free' || i.state === 'buried') add({ id: i.id, kind: i.kind, x: i.x, y: i.y, eyeVisibility: i.eye, flags: { buried: i.state === 'buried' } });
    }
    const sel = this.robots.find((r) => r.id === this.selected);
    if (sel && sel.path.length) {
      const end = sel.path[sel.path.length - 1];
      add({ id: 'marker', kind: 'marker', x: end.x, y: end.y, eyeVisibility: sel.eye });
    }
    for (const r of this.robots) {
      const p = this.robotPos(r);
      const alpha = Math.min(1, r.sinceSpawn / RESPAWN_FADE_MS);
      add({ id: r.id, kind: 'robot', x: p.x, y: p.y, eyeVisibility: r.eye, alpha, flags: { selected: r.id === this.selected, label: this.robots.indexOf(r) + 1 } });
      const carried = this.items.find((i) => i.id === r.carrying);
      if (carried) add({ id: carried.id, kind: carried.kind, x: p.x, y: p.y - 0.42, eyeVisibility: carried.eye, alpha, size: size * 0.6, flags: { carried: true } });
    }
    return { cols: this.cols, rows: this.rows, tiles: this.tiles.map((row) => [...row]), objects: objs };
  }
}
