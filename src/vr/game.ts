/**
 * Kugel-Detektiv 3D – Szene, Ablauf und Eingabe (WebXR und flache Vorschau).
 *
 * Koordinaten: `root` sitzt an der Kopfposition beim Start (Blick nach -Z);
 * der Würfel liegt 2,4 m davor, die Bedienfläche 1,5 m. Die Brille wird nie
 * bewegt – keine künstliche Kamerabewegung (Komfort).
 */
import * as THREE from 'three';
import { createRng, type Rng } from '../core/rng';
import {
  CUE_SECONDS,
  createBalls,
  DEFAULTS,
  evaluate,
  makeStaircase,
  speedForLevel,
  step,
  summarize,
  TRACK_SECONDS,
  TRIALS_PER_SESSION,
  type Ball,
  type TrialResult,
} from './logic';
import { Panel, type PanelSpec } from './panel';
import type { VrTexts } from './texts';

export type Phase = 'menu' | 'cue' | 'track' | 'pick' | 'feedback' | 'summary';

const CUBE_Z = -2.4;
const FADE_SECONDS = 0.6;
const FEEDBACK_SECONDS = 3.2;
const PICK_TIMEOUT = 30;
const STORE_KEY = 'blickfit.vr.mot3d:v1';
const SIM_STEP = 1 / 60;

const COL_BALL = new THREE.Color(0x9db4d0);
const COL_TARGET = new THREE.Color(0xf2a03d);
const COL_PICK = new THREE.Color(0x7fd6ff);

interface Saved {
  best: number;
  sessions: number;
  stereoOnly: boolean;
}

function loadSaved(): Saved {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (raw) {
      const o = JSON.parse(raw) as Partial<Saved>;
      return { best: Number(o.best) || 0, sessions: Number(o.sessions) || 0, stereoOnly: !!o.stereoOnly };
    }
  } catch {
    /* ohne Speicher weiter */
  }
  return { best: 0, sessions: 0, stereoOnly: false };
}

function persist(s: Saved): void {
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(s));
  } catch {
    /* ignorieren */
  }
}

interface BallView {
  group: THREE.Group;
  mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshLambertMaterial>;
  mark: THREE.Sprite;
}

interface Pointer {
  origin: THREE.Vector3;
  dir: THREE.Vector3;
  line?: THREE.Line;
  connected: boolean;
}

export interface GameOptions {
  host: HTMLElement;
  t: VrTexts;
  /** nur für Tests: Zeitraffer der Spielzeit */
  timeScale?: number;
  seed?: number;
  onExit?: () => void;
}

function spriteTexture(draw: (c: CanvasRenderingContext2D, s: number) => void): THREE.CanvasTexture {
  const s = 128;
  const cv = document.createElement('canvas');
  cv.width = cv.height = s;
  const c = cv.getContext('2d');
  if (c) draw(c, s);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export class Game {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(62, 1, 0.05, 50);
  readonly root = new THREE.Group();
  private readonly cube = new THREE.Group();
  private readonly balls3d: BallView[] = [];
  private readonly panel: Panel;
  private readonly hud: Panel;
  private readonly pointers: Pointer[] = [];
  private readonly raycaster = new THREE.Raycaster();
  private readonly tex: Record<'ring' | 'sel' | 'hover' | 'check' | 'cross', THREE.CanvasTexture>;
  private readonly saved = loadSaved();
  private rng: Rng;
  private readonly t: VrTexts;
  private readonly opts: GameOptions;
  private readonly timeScale: number;

  private balls: Ball[] = [];
  private stair = makeStaircase();
  private results: TrialResult[] = [];
  private picks: number[] = [];
  private phase: Phase = 'menu';
  private clock = 0;
  private lastResult: TrialResult | null = null;
  private stereoOnly: boolean;
  private hoverBall = -1;
  private hoverBtn: string | null = null;
  private last = 0;
  private placed = false;
  private visible = true;
  private mouse: THREE.Vector2 | null = null;
  private readonly tmp = new THREE.Vector3();
  private readonly tmp2 = new THREE.Vector3();
  private readonly camPos = new THREE.Vector3();
  private session: XRSession | null = null;
  private summaryLines: string[] = [];
  private disposed = false;
  private resizeObs?: ResizeObserver;

  constructor(opts: GameOptions) {
    this.opts = opts;
    this.t = opts.t;
    this.timeScale = opts.timeScale ?? 1;
    this.rng = createRng(opts.seed);
    this.stereoOnly = this.saved.stereoOnly;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.xr.enabled = true;
    this.renderer.xr.setReferenceSpaceType('local-floor');
    this.renderer.xr.setFramebufferScaleFactor(1.0);
    this.renderer.domElement.className = 'vr-canvas';
    this.renderer.domElement.setAttribute('aria-label', this.t.h1);
    opts.host.appendChild(this.renderer.domElement);

    this.scene.background = new THREE.Color(0x0b1424);
    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x3a4a60, 1.6));
    const sun = new THREE.DirectionalLight(0xffffff, 1.6);
    sun.position.set(1.5, 3, 1.2);
    this.scene.add(sun);
    this.scene.add(this.root);

    this.tex = {
      ring: spriteTexture((c, s) => {
        c.strokeStyle = '#ffd08a';
        c.lineWidth = 9;
        c.beginPath();
        c.arc(s / 2, s / 2, s / 2 - 8, 0, Math.PI * 2);
        c.stroke();
      }),
      sel: spriteTexture((c, s) => {
        c.strokeStyle = '#7fd6ff';
        c.lineWidth = 9;
        c.beginPath();
        c.arc(s / 2, s / 2, s / 2 - 8, 0, Math.PI * 2);
        c.stroke();
        c.lineWidth = 5;
        c.beginPath();
        c.arc(s / 2, s / 2, s / 2 - 22, 0, Math.PI * 2);
        c.stroke();
      }),
      hover: spriteTexture((c, s) => {
        c.strokeStyle = 'rgba(255,255,255,0.9)';
        c.lineWidth = 5;
        c.setLineDash([10, 9]);
        c.beginPath();
        c.arc(s / 2, s / 2, s / 2 - 8, 0, Math.PI * 2);
        c.stroke();
      }),
      check: spriteTexture((c, s) => {
        c.strokeStyle = '#6fe08a';
        c.lineWidth = 11;
        c.beginPath();
        c.arc(s / 2, s / 2, s / 2 - 8, 0, Math.PI * 2);
        c.stroke();
        c.lineWidth = 14;
        c.lineCap = 'round';
        c.lineJoin = 'round';
        c.beginPath();
        c.moveTo(s * 0.3, s * 0.52);
        c.lineTo(s * 0.44, s * 0.66);
        c.lineTo(s * 0.72, s * 0.36);
        c.stroke();
      }),
      cross: spriteTexture((c, s) => {
        c.strokeStyle = '#ff9a8a';
        c.lineWidth = 11;
        c.beginPath();
        c.arc(s / 2, s / 2, s / 2 - 8, 0, Math.PI * 2);
        c.stroke();
        c.lineWidth = 14;
        c.lineCap = 'round';
        c.beginPath();
        c.moveTo(s * 0.32, s * 0.32);
        c.lineTo(s * 0.68, s * 0.68);
        c.moveTo(s * 0.68, s * 0.32);
        c.lineTo(s * 0.32, s * 0.68);
        c.stroke();
      }),
    };

    // Würfel: Kanten + zarte Raster an Boden und Rückwand (Tiefenhinweise)
    this.cube.position.set(0, 0, CUBE_Z);
    this.root.add(this.cube);
    const h = DEFAULTS.half;
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(h * 2, h * 2, h * 2)),
      new THREE.LineBasicMaterial({ color: 0x7fa3cf, transparent: true, opacity: 0.85 }),
    );
    this.cube.add(edges);
    const gridMat = { color: 0x3c5679 } as const;
    const floor = new THREE.GridHelper(h * 2, 8, gridMat.color, gridMat.color);
    floor.position.y = -h;
    this.cube.add(floor);
    const back = new THREE.GridHelper(h * 2, 8, gridMat.color, gridMat.color);
    back.rotation.x = Math.PI / 2;
    back.position.z = -h;
    this.cube.add(back);
    for (const g of [floor, back]) {
      const m = g.material as THREE.Material;
      m.transparent = true;
      m.opacity = 0.55;
    }

    // Kugeln
    const geo = new THREE.SphereGeometry(DEFAULTS.radius, 26, 18);
    for (let i = 0; i < DEFAULTS.count; i++) {
      const mat = new THREE.MeshLambertMaterial({ color: COL_BALL.clone() });
      const mesh = new THREE.Mesh(geo, mat);
      const group = new THREE.Group();
      group.add(mesh);
      const mark = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.tex.ring, transparent: true, depthWrite: false }));
      mark.scale.setScalar(DEFAULTS.radius * 2.9);
      mark.visible = false;
      group.add(mark);
      group.visible = false;
      this.cube.add(group);
      this.balls3d.push({ group, mesh, mark });
    }

    // Bedienflächen
    this.panel = new Panel(1.3, 0.86, 1024);
    this.panel.mesh.position.set(0, -0.15, -1.5);
    this.root.add(this.panel.mesh);
    this.hud = new Panel(1.8, 0.18, 1800);
    this.hud.mesh.position.set(0, -1.02, -2.05);
    this.hud.mesh.rotation.x = -0.3;
    this.root.add(this.hud.mesh);
    this.hud.visible = false;

    // Controller (WebXR)
    for (let i = 0; i < 2; i++) {
      const ctrl = this.renderer.xr.getController(i);
      const geom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -3)]);
      const line = new THREE.Line(geom, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 }));
      line.visible = false;
      ctrl.add(line);
      ctrl.addEventListener('connected', () => {
        this.pointers[i].connected = true;
        line.visible = true;
      });
      ctrl.addEventListener('disconnected', () => {
        this.pointers[i].connected = false;
        line.visible = false;
      });
      ctrl.addEventListener('selectstart', (ev) => {
        this.selectFrom(this.pointers[i]);
        this.haptic((ev as unknown as { data?: XRInputSource }).data);
      });
      this.scene.add(ctrl);
      this.pointers.push({ origin: new THREE.Vector3(), dir: new THREE.Vector3(0, 0, -1), line, connected: false });
    }

    this.setupDesktopInput();
    this.resize();
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObs = new ResizeObserver(() => this.resize());
      this.resizeObs.observe(opts.host);
    }
    this.showMenu();
  }

  // ---------------------------------------------------------------- Start/Ende

  /** Flache Vorschau am Bildschirm (Maus). */
  startPreview(): void {
    this.renderer.setAnimationLoop(this.frame);
  }

  async enterVR(): Promise<void> {
    const xr = (navigator as Navigator & { xr?: XRSystem }).xr;
    if (!xr) throw new Error('WebXR nicht verfügbar');
    const session = await xr.requestSession('immersive-vr', { optionalFeatures: ['local-floor'] });
    session.addEventListener('end', () => {
      this.session = null;
      this.placed = false;
      this.showMenu();
      this.opts.onExit?.();
    });
    session.addEventListener('visibilitychange', () => {
      this.visible = session.visibilityState === 'visible';
    });
    await this.renderer.xr.setSession(session);
    this.session = session;
    this.placed = false;
    this.showMenu(); // Menü mit den VR-Knöpfen (Stereo, Neu ausrichten, VR beenden)
    this.renderer.setAnimationLoop(this.frame);
  }

  stop(): void {
    if (this.session) void this.session.end().catch(() => undefined);
    this.renderer.setAnimationLoop(null);
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.stop();
    this.resizeObs?.disconnect();
    this.panel.dispose();
    this.hud.dispose();
    for (const k of Object.keys(this.tex) as (keyof typeof this.tex)[]) this.tex[k].dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  get isXR(): boolean {
    return this.renderer.xr.isPresenting;
  }

  // ---------------------------------------------------------------- Eingabe

  private setupDesktopInput(): void {
    const el = this.renderer.domElement;
    const ndc = (e: PointerEvent): THREE.Vector2 => {
      const r = el.getBoundingClientRect();
      return new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
    };
    el.addEventListener('pointermove', (e) => {
      if (this.isXR) return;
      this.mouse = ndc(e);
    });
    el.addEventListener('pointerleave', () => {
      this.mouse = null;
    });
    el.addEventListener('pointerdown', (e) => {
      if (this.isXR) return;
      this.mouse = ndc(e);
      this.updateMouseRay();
      this.selectFrom(this.pointers[0]);
    });
  }

  private updateMouseRay(): void {
    const p = this.pointers[0];
    if (!this.mouse) {
      p.connected = false;
      return;
    }
    this.camera.updateMatrixWorld();
    this.raycaster.setFromCamera(this.mouse, this.camera);
    p.origin.copy(this.raycaster.ray.origin);
    p.dir.copy(this.raycaster.ray.direction);
    p.connected = true;
  }

  private updateXrRays(): void {
    for (const p of this.pointers) {
      if (!p.connected) continue;
      const ctrl = p.line?.parent;
      if (!ctrl) continue;
      ctrl.updateMatrixWorld();
      p.origin.setFromMatrixPosition(ctrl.matrixWorld);
      p.dir.set(0, 0, -1).transformDirection(ctrl.matrixWorld);
    }
  }

  private haptic(src?: XRInputSource): void {
    try {
      const act = (src?.gamepad as unknown as { hapticActuators?: { pulse?: (i: number, d: number) => void }[] } | undefined)?.hapticActuators?.[0];
      act?.pulse?.(0.35, 35);
    } catch {
      /* ohne Vibration weiter */
    }
  }

  /** Bedienfläche unter dem Strahl: Knopf-Id oder null */
  private panelHit(ray: Pointer): { id: string | null; dist: number } | null {
    if (!this.panel.visible) return null;
    this.raycaster.set(ray.origin, ray.dir);
    const hit = this.raycaster.intersectObject(this.panel.mesh, false)[0];
    if (!hit?.uv) return null;
    return { id: this.panel.buttonAt(hit.uv), dist: hit.distance };
  }

  /** Index der Kugel unter dem Strahl (großzügiger Trefferradius) oder -1 */
  private ballHit(ray: Pointer): number {
    const inv = this.tmp2.copy(ray.origin);
    this.cube.worldToLocal(inv);
    const o = inv.clone();
    const d = this.tmp.copy(ray.dir).transformDirection(new THREE.Matrix4().copy(this.cube.matrixWorld).invert());
    let best = -1;
    let bestT = Infinity;
    let bestD = Infinity;
    const R = DEFAULTS.radius * 1.7;
    this.balls.forEach((b, i) => {
      const c = new THREE.Vector3(b.p.x, b.p.y, b.p.z);
      const oc = c.clone().sub(o);
      const t = oc.dot(d);
      if (t < 0) return;
      const dist2 = oc.lengthSq() - t * t;
      // Zielt man auf die Mitte einer verdeckten Kugel, gewinnt die, deren Mitte dem Strahl am nächsten liegt
      if (dist2 <= R * R && (dist2 < bestD - 1e-9 || (Math.abs(dist2 - bestD) <= 1e-9 && t < bestT))) {
        bestD = dist2;
        bestT = t;
        best = i;
      }
    });
    return best;
  }

  private selectFrom(ray: Pointer): void {
    const ph = this.panelHit(ray);
    if (ph) {
      if (ph.id) this.onButton(ph.id);
      return;
    }
    if (this.phase === 'pick') {
      const i = this.ballHit(ray);
      if (i >= 0) this.togglePick(i);
    }
  }

  private updateHover(): void {
    let btn: string | null = null;
    let ball = -1;
    for (const p of this.pointers) {
      if (!p.connected) continue;
      const ph = this.panelHit(p);
      if (ph) {
        if (ph.id && !btn) btn = ph.id;
        continue;
      }
      if (this.phase === 'pick' && ball < 0) ball = this.ballHit(p);
    }
    if (btn !== this.hoverBtn) {
      this.hoverBtn = btn;
      this.panel.setHover(btn);
    }
    if (ball !== this.hoverBall) {
      this.hoverBall = ball;
      this.refreshMarks();
    }
  }

  // ---------------------------------------------------------------- Ablauf

  private onButton(id: string): void {
    switch (id) {
      case 'start':
        this.startSession();
        break;
      case 'stereo':
        this.stereoOnly = !this.stereoOnly;
        this.saved.stereoOnly = this.stereoOnly;
        persist(this.saved);
        this.showMenu();
        break;
      case 'recenter':
        this.placed = false;
        break;
      case 'exit':
        this.opts.onExit?.();
        this.stop();
        if (!this.session) this.showMenu();
        break;
      default:
    }
  }

  private startSession(): void {
    this.stair = makeStaircase(Math.max(1, Math.round(this.saved.best > 4 ? this.saved.best - 1 : 4)));
    this.results = [];
    this.startTrial();
  }

  private startTrial(): void {
    const level = this.stair.level;
    this.balls = createBalls(this.rng, speedForLevel(level));
    this.picks = [];
    this.hoverBall = -1;
    this.lastResult = null;
    this.phase = 'cue';
    this.clock = 0;
    this.balls3d.forEach((v, i) => {
      v.group.visible = true;
      v.mesh.material.color.copy(this.balls[i].target ? COL_TARGET : COL_BALL);
      v.mesh.material.emissive.copy(this.balls[i].target ? new THREE.Color(0x6a3c08) : new THREE.Color(0x000000));
    });
    this.syncBalls();
    this.refreshMarks();
    this.panel.visible = false;
    this.hud.visible = true;
    this.updateHud();
  }

  private togglePick(i: number): void {
    const at = this.picks.indexOf(i);
    if (at >= 0) this.picks.splice(at, 1);
    else if (this.picks.length < DEFAULTS.targets) this.picks.push(i);
    this.refreshMarks();
    this.updateHud();
    if (this.picks.length >= DEFAULTS.targets) this.finishTrial();
  }

  private finishTrial(): void {
    const res = evaluate(this.balls, this.picks, this.stair.level);
    this.lastResult = res;
    this.results.push(res);
    this.stair.update(res.perfect);
    this.phase = 'feedback';
    this.clock = 0;
    this.refreshMarks();
    this.updateHud();
  }

  private finishSession(): void {
    const sum = summarize(this.results, this.stair);
    this.saved.sessions += 1;
    this.saved.best = Math.max(this.saved.best, Math.round(sum.thresholdLevel * 10) / 10);
    persist(this.saved);
    // Winkelgeschwindigkeit bei 2,4 m Abstand (Näherung: Quer-Bewegung)
    const deg = ((sum.thresholdSpeed / -CUBE_Z) * 180) / Math.PI;
    this.summaryLines = [
      this.t.summaryLine(sum.perfect, sum.trials),
      this.t.summarySpeed(sum.thresholdSpeed.toFixed(2), deg.toFixed(0)),
      this.t.summaryBest(Math.round(this.saved.best)),
      this.t.summaryNote,
    ];
    this.phase = 'summary';
    this.balls3d.forEach((v) => (v.group.visible = false));
    this.hud.visible = false;
    this.showPanel();
  }

  private showMenu(): void {
    this.phase = 'menu';
    this.balls = [];
    this.balls3d.forEach((v) => (v.group.visible = false));
    this.hud.visible = false;
    this.showPanel();
  }

  private showPanel(): void {
    const tt = this.t;
    let spec: PanelSpec;
    if (this.phase === 'summary') {
      spec = {
        title: tt.summaryTitle,
        lines: this.summaryLines,
        buttons: [
          { id: 'start', label: tt.again, primary: true },
          { id: 'exit', label: this.session || this.isXR ? tt.exitVr : tt.exitPreview },
        ],
      };
    } else {
      const xr = this.isXR || !!this.session;
      const buttons = [{ id: 'start', label: tt.start, primary: true }];
      if (xr) {
        buttons.push({ id: 'stereo', label: this.stereoOnly ? tt.stereoOn : tt.stereoOff, primary: false });
        buttons.push({ id: 'recenter', label: tt.recenter, primary: false });
      }
      buttons.push({ id: 'exit', label: xr ? tt.exitVr : tt.exitPreview, primary: false });
      spec = { title: tt.menuTitle, lines: tt.menuText, buttons };
    }
    this.panel.set(spec);
    this.panel.visible = true;
    this.hoverBtn = null;
  }

  private updateHud(): void {
    const tt = this.t;
    const n = Math.min(this.results.length + (this.phase === 'feedback' ? 0 : 1), TRIALS_PER_SESSION);
    const head = `${n}/${TRIALS_PER_SESSION} · `;
    let s = '';
    switch (this.phase) {
      case 'cue':
        s = tt.hudCue;
        break;
      case 'track':
        s = tt.hudTrack;
        break;
      case 'pick':
        s = tt.hudPick(DEFAULTS.targets - this.picks.length);
        break;
      case 'feedback':
        s = this.lastResult ? tt.hudResult(this.lastResult.correct, this.lastResult.of) : '';
        break;
      default:
    }
    this.hud.set({ title: head + s, compact: true });
  }

  /** Markierungen (Ringe, Häkchen, Kreuze) je nach Phase. */
  private refreshMarks(): void {
    this.balls3d.forEach((v, i) => {
      const b = this.balls[i];
      const mat = v.mark.material;
      v.mark.visible = false;
      mat.opacity = 1;
      if (!b) return;
      if (this.phase === 'cue') {
        if (b.target) {
          v.mark.visible = true;
          mat.map = this.tex.ring;
        }
      } else if (this.phase === 'pick') {
        if (this.picks.includes(i)) {
          v.mark.visible = true;
          mat.map = this.tex.sel;
          v.mesh.material.color.copy(COL_PICK);
        } else {
          v.mesh.material.color.copy(COL_BALL);
          if (i === this.hoverBall) {
            v.mark.visible = true;
            mat.map = this.tex.hover;
          }
        }
      } else if (this.phase === 'feedback') {
        const picked = this.picks.includes(i);
        if (b.target && picked) {
          v.mark.visible = true;
          mat.map = this.tex.check;
        } else if (!b.target && picked) {
          v.mark.visible = true;
          mat.map = this.tex.cross;
        } else if (b.target) {
          v.mark.visible = true;
          mat.map = this.tex.ring;
        }
        v.mesh.material.color.copy(b.target ? COL_TARGET : COL_BALL);
      }
    });
  }

  private syncBalls(): void {
    this.getCamPos();
    this.balls.forEach((b, i) => {
      const v = this.balls3d[i];
      v.group.position.set(b.p.x, b.p.y, b.p.z);
      let s = 1;
      if (this.stereoOnly && this.isXR) {
        // scheinbare Größe konstant: Größe ∝ Entfernung zum Kopf
        v.group.getWorldPosition(this.tmp);
        s = this.tmp.distanceTo(this.camPos) / -CUBE_Z;
      }
      v.group.scale.setScalar(s);
    });
  }

  private getCamPos(): void {
    const cam = this.isXR ? this.renderer.xr.getCamera() : this.camera;
    cam.getWorldPosition(this.camPos);
  }

  private update(dt: number): void {
    dt *= this.timeScale;
    this.clock += dt;
    switch (this.phase) {
      case 'cue': {
        const fade = Math.min(1, Math.max(0, (this.clock - CUE_SECONDS) / FADE_SECONDS));
        this.balls3d.forEach((v, i) => {
          const tgt = this.balls[i]?.target;
          if (!tgt) return;
          v.mesh.material.color.lerpColors(COL_TARGET, COL_BALL, fade);
          v.mesh.material.emissive.setRGB(0.42 * (1 - fade), 0.24 * (1 - fade), 0.03 * (1 - fade));
          v.mark.material.opacity = 1 - fade;
        });
        if (this.clock >= CUE_SECONDS + FADE_SECONDS) {
          this.phase = 'track';
          this.clock = 0;
          this.balls3d.forEach((v) => {
            v.mark.visible = false;
            v.mesh.material.emissive.setRGB(0, 0, 0);
            v.mesh.material.color.copy(COL_BALL);
          });
          this.updateHud();
        }
        break;
      }
      case 'track': {
        const speed = speedForLevel(this.stair.level);
        let left = dt;
        while (left > 1e-9) {
          const h = Math.min(SIM_STEP, left);
          step(this.balls, h, speed, this.rng);
          left -= h;
        }
        this.syncBalls();
        if (this.clock >= TRACK_SECONDS) {
          this.phase = 'pick';
          this.clock = 0;
          this.picks = [];
          this.refreshMarks();
          this.updateHud();
        }
        break;
      }
      case 'pick':
        if (this.clock >= PICK_TIMEOUT) this.finishTrial();
        else if (this.stereoOnly && this.isXR) this.syncBalls();
        break;
      case 'feedback':
        if (this.clock >= FEEDBACK_SECONDS) {
          if (this.results.length >= TRIALS_PER_SESSION) this.finishSession();
          else this.startTrial();
        }
        break;
      default:
    }
  }

  // ---------------------------------------------------------------- Schleife

  private tryPlace(): void {
    const cam = this.renderer.xr.getCamera();
    if (cam.cameras.length < 1) return;
    cam.getWorldPosition(this.tmp);
    if (this.tmp.y < 0.2) return; // noch keine gültige Kopfhaltung
    cam.getWorldDirection(this.tmp2);
    this.root.position.set(this.tmp.x, this.tmp.y, this.tmp.z);
    this.root.rotation.y = Math.atan2(-this.tmp2.x, -this.tmp2.z);
    this.root.updateMatrixWorld(true);
    this.placed = true;
  }

  private desktopCamera(): void {
    // leichte Mausparallaxe, damit die Tiefe in der flachen Vorschau erkennbar wird
    const m = this.mouse ?? new THREE.Vector2(0, 0);
    this.camera.position.set(m.x * 0.25, m.y * 0.15, 0.25);
    this.camera.lookAt(0, 0, CUBE_Z);
  }

  private frame = (time: number): void => {
    if (this.disposed) return;
    const dt = Math.min(0.05, Math.max(0, (time - this.last) / 1000));
    this.last = time;
    if (this.isXR) {
      if (!this.placed) this.tryPlace();
      this.updateXrRays();
    } else {
      this.desktopCamera();
      this.updateMouseRay();
    }
    if (this.visible && (this.isXR ? this.placed : true)) this.update(dt);
    this.updateHover();
    this.renderer.render(this.scene, this.camera);
  };

  private resize(): void {
    const host = this.opts.host;
    const w = Math.max(1, host.clientWidth);
    const h = Math.max(1, host.clientHeight);
    if (!this.isXR) {
      this.renderer.setSize(w, h, false);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }
  }

  // ---------------------------------------------------------------- Test-Hilfen

  /** Zustand und Bildschirm-/Weltpositionen für automatische Tests */
  debug() {
    this.camera.updateMatrixWorld();
    const rect = this.renderer.domElement.getBoundingClientRect();
    const toScreen = (w: THREE.Vector3) => {
      const p = w.clone().project(this.camera);
      return { x: rect.left + ((p.x + 1) / 2) * rect.width, y: rect.top + ((1 - p.y) / 2) * rect.height };
    };
    const world = (i: number) => {
      const v = new THREE.Vector3(this.balls[i].p.x, this.balls[i].p.y, this.balls[i].p.z);
      return this.cube.localToWorld(v);
    };
    return {
      phase: this.phase,
      trial: this.results.length,
      level: this.stair.level,
      picks: [...this.picks],
      targets: this.balls.map((b, i) => (b.target ? i : -1)).filter((i) => i >= 0),
      results: this.results.map((r) => ({ ...r })),
      placed: this.placed,
      xr: this.isXR,
      eyes: this.isXR ? this.renderer.xr.getCamera().cameras.length : 1,
      eyeSeparation: this.isXR && this.renderer.xr.getCamera().cameras.length === 2
        ? this.renderer.xr.getCamera().cameras[0].position.distanceTo(this.renderer.xr.getCamera().cameras[1].position)
        : 0,
      stereoOnly: this.stereoOnly,
      panelVisible: this.panel.visible,
      ballScreen: (i: number) => toScreen(world(i)),
      ballWorld: (i: number) => world(i).toArray() as [number, number, number],
      buttonWorld: (id: string): [number, number, number] | null => {
        const uv = this.panel.buttonUv(id);
        if (!uv) return null;
        return this.panel.mesh
          .localToWorld(new THREE.Vector3((uv.x - 0.5) * this.panel.widthM, (uv.y - 0.5) * this.panel.heightM, 0))
          .toArray() as [number, number, number];
      },
      buttonScreen: (id: string) => {
        const uv = this.panel.buttonUv(id);
        if (!uv) return null;
        return toScreen(
          this.panel.mesh.localToWorld(new THREE.Vector3((uv.x - 0.5) * this.panel.widthM, (uv.y - 0.5) * this.panel.heightM, 0)),
        );
      },
    };
  }
}
