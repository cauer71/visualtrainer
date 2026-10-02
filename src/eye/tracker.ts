// EYE-EXPERIMENT: Tracker-Kern – Kamera, MediaPipe Face Landmarker, Kalibrierung, Blickschätzung.
// Unabhängig von der Seite (kein HTML von uns): die Testumgebung (Phase 1) und später die Spielseite (Phase 2) sind
// nur Nutzerinnen dieser API. Das Kamerabild bleibt im Gerät; es wird nichts hochgeladen oder gespeichert.
//
//   const tracker = new EyeTracker({ modelBase: '../../eye-models/' });
//   await tracker.start();                       // Kamera + Modell
//   const cal = await tracker.calibrate({ onPoint }); // 9 Punkte, ~11 s
//   const off = tracker.onGaze((g) => …);        // geglätteter Blickpunkt in Fenster-Pixeln + Viertel
//   tracker.stop();                              // Stream beenden, Modell freigeben
import { CALIBRATION_POINTS, fitGazeModel, isStale, predictGaze, summarizePoint, toPx, type CalibrationPoint, type FeatureFrame, type FitResult, type GazeModel } from './calibration';
import { extractFeatures, type FaceMetrics } from './features';
import { GazeFilter } from './filters';
import { lumaStats, brightnessAdvice, reflectionLikely, type BrightnessAdvice, type LumaStats } from './luma';
import { RateMeter, RollingStats } from './meters';
import { installNetworkGuard } from './netguard';
import { quadrantOf } from './quadrants';
import { synthFeatures, synthMetrics } from './synthetic';
import type { GazeSample, Landmark, Pt, Size } from './types';

export type TrackerStatus = 'idle' | 'starting' | 'loading-model' | 'running' | 'no-face' | 'error' | 'stopped';
export type TrackerErrorCode = 'insecure' | 'no-camera-api' | 'denied' | 'no-camera' | 'camera-busy' | 'camera-failed' | 'no-wasm' | 'no-simd' | 'model-failed' | 'unknown';

export class TrackerError extends Error {
  constructor(
    public code: TrackerErrorCode,
    detail?: string,
  ) {
    super(detail ? `${code}: ${detail}` : code);
    this.name = 'TrackerError';
  }
}

export type Delegate = 'auto' | 'GPU' | 'CPU';

export interface TrackerOptions {
  /** URL des Ordners mit face_landmarker.task und vision_wasm_internal.{js,wasm} (relativ zur Seite oder absolut) */
  modelBase: string;
  /** Größe des „Bildschirms“, auf den der Blick abgebildet wird; Standard: Fenster der Seite */
  viewport?: () => Size;
  delegate?: Delegate;
  /** 0 (kaum) … 1 (stark), Standard 0,5 */
  smoothing?: number;
  /** Wunsch-Auflösung der Kamera (der Browser wählt das nächstliegende, tatsächliche Maß steht in stats().camera) */
  resolution?: CameraResolution;
}

/** low = 640×480 · hd = 1280×720 · fullhd = 1920×1080 · max = bis 3840×2160 (Iris wird mit mehr Pixeln aufgelöst, kostet Rechenzeit) */
export type CameraResolution = 'low' | 'hd' | 'fullhd' | 'max';
export const RESOLUTIONS: Record<CameraResolution, { w: number; h: number }> = {
  low: { w: 640, h: 480 },
  hd: { w: 1280, h: 720 },
  fullhd: { w: 1920, h: 1080 },
  max: { w: 3840, h: 2160 },
};

export interface StartOptions {
  deviceId?: string;
  /** Testmodus: keine Kamera, kein Modell – Merkmale kommen aus setSyntheticTruth() */
  synthetic?: boolean;
  onProgress?: (p: { phase: 'camera' | 'model' | 'engine'; ratio: number }) => void;
}

export interface ImageCheck {
  faceLuma: LumaStats;
  advice: BrightnessAdvice;
  reflection: boolean;
}

export interface FrameInfo {
  t: number;
  face: boolean;
  metrics: FaceMetrics | null;
  landmarks: Landmark[] | null;
  imgSize: Size;
  procMs: number;
  image: ImageCheck | null;
}

export interface TrackerStats {
  camFps: number;
  evalFps: number;
  procMsMean: number;
  procMsMax: number;
  frames: number;
  camera: { label: string; width: number; height: number; frameRateSetting: number | null; deviceId: string | null };
  delegate: 'GPU' | 'CPU' | 'synthetic' | null;
}

export interface CalibrateOptions {
  /** Punkte in Bruchteilen des Fensters (Standard: die 9 Kalibrierpunkte) */
  points?: readonly Pt[];
  viewport?: Size;
  /** Zeit je Punkt, die verworfen wird (Standard 400 ms) und die gesammelt wird (Standard 800 ms) */
  settleMs?: number;
  collectMs?: number;
  onPoint?: (info: { index: number; total: number; target: Pt; normalized: Pt; phase: 'start' | 'done'; ok?: boolean }) => void;
  signal?: AbortSignal;
}

export type CalibrationOutcome =
  | { ok: true; model: GazeModel; pointsUsed: number; pointsSkipped: number[]; tried: Extract<FitResult, { ok: true }>['tried'] }
  | { ok: false; reason: 'aborted' | 'not-running' | Extract<FitResult, { ok: false }>['reason']; pointsUsed: number; pointsSkipped: number[] };

export interface TimedGaze {
  t: number;
  x: number;
  y: number;
}
export interface PointCollection {
  target: Pt;
  normalized: Pt;
  samples: TimedGaze[];
}
export interface CollectOptions {
  viewport?: Size;
  settleMs?: number;
  collectMs?: number;
  onPoint?: (info: { index: number; total: number; target: Pt; normalized: Pt; phase: 'start' | 'done' }) => void;
  signal?: AbortSignal;
}

/** Nach so vielen ms ohne Gesicht wechselt der Status auf „no-face“. */
export const NO_FACE_MS = 300;
/** Nach so vielen ms ohne Blickpunkt wird der Filter neu gestartet (kein Nachziehen aus alter Position). */
const FILTER_RESET_MS = 600;
const MODEL_FILE = 'face_landmarker.task';
const MODEL_BYTES_FALLBACK = 3758596;
const FRAME_STEP_MS = 1000 / 30;

type Listener<T> = (v: T) => void;

export const sleep = (ms: number, signal?: AbortSignal): Promise<void> =>
  new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(new DOMException('aborted', 'AbortError'));
    const id = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(id);
      reject(new DOMException('aborted', 'AbortError'));
    };
    signal?.addEventListener('abort', onAbort, { once: true });
  });

export const isAbort = (e: unknown) => e instanceof DOMException && e.name === 'AbortError';

const gauss = (): number => {
  const u = Math.max(1e-9, Math.random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * Math.random());
};

interface MinimalLandmarker {
  detectForVideo(video: HTMLVideoElement, ts: number): { faceLandmarks: Landmark[][]; facialTransformationMatrixes?: { data: number[] }[] };
  close(): void;
}

export class EyeTracker {
  readonly opts: Required<Omit<TrackerOptions, 'viewport'>> & { viewport: () => Size };
  /** Das Kamerabild-Element (für die Live-Vorschau; außerhalb des Dokuments, bis jemand es einhängt). */
  readonly video: HTMLVideoElement;

  private _status: TrackerStatus = 'idle';
  private _error: TrackerError | null = null;
  private statusL = new Set<Listener<TrackerStatus>>();
  private gazeL = new Set<Listener<GazeSample>>();
  private frameL = new Set<Listener<FrameInfo>>();

  private stream: MediaStream | null = null;
  private landmarker: MinimalLandmarker | null = null;
  private delegateUsed: 'GPU' | 'CPU' | 'synthetic' | null = null;
  private deviceId: string | null = null;
  private running = false;
  private synthTimer: ReturnType<typeof setInterval> | null = null;
  private synthTruth: (() => Pt | null) | null = null;
  private rvfcId = 0;
  private rafId = 0;
  private lastVideoTime = -1;
  private lastTs = 0;

  private camMeter = new RateMeter(1000);
  private evalMeter = new RateMeter(1000);
  private procStats = new RollingStats(120);
  private camSamples: { t: number; frames: number }[] = [];
  private camFps = 0;
  private frames = 0;
  private lastFaceT = -Infinity;
  private lastGazeT = -Infinity;
  private _lastGaze: GazeSample | null = null;
  private _lastMetrics: FaceMetrics | null = null;
  private image: ImageCheck | null = null;
  private lastImageT = -Infinity;
  private canvas: HTMLCanvasElement | null = null;

  private model: GazeModel | null = null;
  private filter: GazeFilter;
  private collector: ((t: number, f: number[]) => void) | null = null;

  constructor(opts: TrackerOptions) {
    this.opts = {
      modelBase: opts.modelBase.endsWith('/') ? opts.modelBase : opts.modelBase + '/',
      viewport: opts.viewport ?? (() => ({ w: window.innerWidth, h: window.innerHeight })),
      delegate: opts.delegate ?? 'auto',
      smoothing: opts.smoothing ?? 0.5,
      resolution: opts.resolution ?? 'hd',
    };
    this.filter = new GazeFilter(this.opts.smoothing);
    this.video = document.createElement('video');
    this.video.muted = true;
    this.video.playsInline = true;
    this.video.setAttribute('playsinline', '');
    this.video.autoplay = true;
  }

  // ---------- Zustand ----------

  get status(): TrackerStatus {
    return this._status;
  }
  get error(): TrackerError | null {
    return this._error;
  }
  get lastGaze(): GazeSample | null {
    return this._lastGaze;
  }
  get lastMetrics(): FaceMetrics | null {
    return this._lastMetrics;
  }
  get isRunning(): boolean {
    return this.running;
  }
  get isCalibrated(): boolean {
    return this.model !== null;
  }
  get calibration(): GazeModel | null {
    return this.model;
  }

  private setStatus(s: TrackerStatus): void {
    if (this._status === s) return;
    this._status = s;
    for (const cb of [...this.statusL]) cb(s);
  }

  onStatus(cb: Listener<TrackerStatus>): () => void {
    this.statusL.add(cb);
    return () => this.statusL.delete(cb);
  }
  onGaze(cb: Listener<GazeSample>): () => void {
    this.gazeL.add(cb);
    return () => this.gazeL.delete(cb);
  }
  onFrame(cb: Listener<FrameInfo>): () => void {
    this.frameL.add(cb);
    return () => this.frameL.delete(cb);
  }

  stats(): TrackerStats {
    const track = this.stream?.getVideoTracks()[0];
    const s = track?.getSettings?.();
    return {
      camFps: this.camFps,
      evalFps: this.evalMeter.rate(performance.now()),
      procMsMean: this.procStats.mean,
      procMsMax: this.procStats.max,
      frames: this.frames,
      camera: {
        label: track?.label ?? '',
        width: this.video.videoWidth || s?.width || 0,
        height: this.video.videoHeight || s?.height || 0,
        frameRateSetting: s?.frameRate ?? null,
        deviceId: this.deviceId,
      },
      delegate: this.delegateUsed,
    };
  }

  // ---------- Start / Stop ----------

  /** Kamera öffnen, Modell laden, Auswertung starten. Wirft TrackerError. Einwilligung muss vorher eingeholt sein. */
  async start(o: StartOptions = {}): Promise<void> {
    if (this.running || this._status === 'starting' || this._status === 'loading-model') return;
    this._error = null;
    this.setStatus('starting');
    try {
      if (o.synthetic) {
        this.delegateUsed = 'synthetic';
        this.running = true;
        this.resetCounters();
        this.synthTimer = setInterval(() => this.synthStep(), FRAME_STEP_MS);
        this.setStatus('running');
        return;
      }
      await this.openCamera(o.deviceId, o.onProgress);
      this.setStatus('loading-model');
      await this.loadEngine(o.onProgress);
      this.running = true;
      this.resetCounters();
      this.setStatus('running');
      this.startLoop();
    } catch (e) {
      this.teardown();
      this._error = e instanceof TrackerError ? e : new TrackerError('unknown', e instanceof Error ? e.message : String(e));
      this.setStatus('error');
      throw this._error;
    }
  }

  /** Alles beenden: Videostrom stoppen (Kamera-Lampe aus), Modell freigeben, Zeitgeber löschen. */
  stop(): void {
    this.teardown(); // die Kalibrierung bleibt im Speicher (z. B. für „Kamera wechseln“)
    if (this._status !== 'error') this.setStatus('stopped');
  }

  private teardown(): void {
    this.running = false;
    if (this.synthTimer) clearInterval(this.synthTimer);
    this.synthTimer = null;
    if (this.rvfcId && 'cancelVideoFrameCallback' in this.video) (this.video as HTMLVideoElement & { cancelVideoFrameCallback(id: number): void }).cancelVideoFrameCallback(this.rvfcId);
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rvfcId = 0;
    this.rafId = 0;
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    try {
      this.video.pause();
    } catch {
      /* ignorieren */
    }
    this.video.srcObject = null;
    try {
      this.landmarker?.close();
    } catch {
      /* ignorieren */
    }
    this.landmarker = null;
    this.collector = null;
    this.canvas = null;
    this.delegateUsed = null;
  }

  private resetCounters(): void {
    this.camMeter.reset();
    this.evalMeter.reset();
    this.procStats.reset();
    this.camSamples = [];
    this.camFps = 0;
    this.frames = 0;
    this.lastFaceT = performance.now();
    this.lastGazeT = -Infinity;
    this.lastVideoTime = -1;
    this.lastTs = 0;
    this.image = null;
    this.lastImageT = -Infinity;
    this.filter.reset();
  }

  // ---------- Kamera ----------

  async listCameras(): Promise<{ deviceId: string; label: string }[]> {
    try {
      const all = await navigator.mediaDevices.enumerateDevices();
      return all.filter((d) => d.kind === 'videoinput').map((d, i) => ({ deviceId: d.deviceId, label: d.label || `Kamera ${i + 1}` }));
    } catch {
      return [];
    }
  }

  private async openCamera(deviceId: string | undefined, onProgress?: StartOptions['onProgress']): Promise<void> {
    if (!window.isSecureContext) throw new TrackerError('insecure');
    if (!navigator.mediaDevices?.getUserMedia) throw new TrackerError('no-camera-api');
    onProgress?.({ phase: 'camera', ratio: 0 });
    const want = RESOLUTIONS[this.opts.resolution ?? 'hd'];
    const base: MediaTrackConstraints = { width: { ideal: want.w }, height: { ideal: want.h }, frameRate: { ideal: 30 } };
    const video: MediaTrackConstraints = deviceId ? { ...base, deviceId: { exact: deviceId } } : { ...base, facingMode: 'user' };
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video, audio: false });
    } catch (e) {
      const name = (e as DOMException)?.name;
      if (name === 'NotAllowedError' || name === 'SecurityError') throw new TrackerError('denied');
      if (name === 'NotFoundError' || name === 'OverconstrainedError') throw new TrackerError('no-camera', name);
      if (name === 'NotReadableError' || name === 'AbortError') throw new TrackerError('camera-busy');
      throw new TrackerError('camera-failed', (e as Error)?.message);
    }
    const track = this.stream.getVideoTracks()[0];
    this.deviceId = track?.getSettings?.().deviceId ?? deviceId ?? null;
    this.video.srcObject = this.stream;
    try {
      await this.video.play();
    } catch (e) {
      throw new TrackerError('camera-failed', (e as Error)?.message);
    }
    if (!this.video.videoWidth) {
      await new Promise<void>((resolve, reject) => {
        const to = setTimeout(() => reject(new TrackerError('camera-failed', 'kein Videobild')), 8000);
        this.video.addEventListener(
          'loadedmetadata',
          () => {
            clearTimeout(to);
            resolve();
          },
          { once: true },
        );
      });
    }
    onProgress?.({ phase: 'camera', ratio: 1 });
  }

  // ---------- Modell ----------

  private async loadEngine(onProgress?: StartOptions['onProgress']): Promise<void> {
    if (typeof WebAssembly !== 'object') throw new TrackerError('no-wasm');
    installNetworkGuard(); // MediaPipe will Nutzungsstatistik an Google senden – wird abgefangen (siehe netguard.ts)
    let vision: typeof import('@mediapipe/tasks-vision');
    try {
      vision = await import('@mediapipe/tasks-vision');
    } catch (e) {
      throw new TrackerError('model-failed', (e as Error)?.message);
    }
    if (!(await vision.FilesetResolver.isSimdSupported())) throw new TrackerError('no-simd');
    const bytes = await this.fetchModel(onProgress);
    onProgress?.({ phase: 'engine', ratio: 0 });
    const fileset = { wasmLoaderPath: this.opts.modelBase + 'vision_wasm_internal.js', wasmBinaryPath: this.opts.modelBase + 'vision_wasm_internal.wasm' };
    const make = (delegate: 'GPU' | 'CPU') =>
      vision.FaceLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetBuffer: bytes.slice(), delegate },
        runningMode: 'VIDEO',
        numFaces: 1,
        outputFaceBlendshapes: false,
        outputFacialTransformationMatrixes: true,
      }) as unknown as Promise<MinimalLandmarker>;
    const want = this.opts.delegate;
    try {
      if (want === 'CPU') {
        this.landmarker = await make('CPU');
        this.delegateUsed = 'CPU';
      } else {
        try {
          this.landmarker = await make('GPU');
          this.delegateUsed = 'GPU';
        } catch (e) {
          if (want === 'GPU') throw e;
          this.landmarker = await make('CPU');
          this.delegateUsed = 'CPU';
        }
      }
    } catch (e) {
      throw new TrackerError('model-failed', (e as Error)?.message);
    }
    onProgress?.({ phase: 'engine', ratio: 1 });
  }

  private async fetchModel(onProgress?: StartOptions['onProgress']): Promise<Uint8Array> {
    const url = this.opts.modelBase + MODEL_FILE;
    let res: Response;
    try {
      res = await fetch(url);
    } catch (e) {
      throw new TrackerError('model-failed', (e as Error)?.message);
    }
    if (!res.ok || !res.body) throw new TrackerError('model-failed', `HTTP ${res.status}`);
    const total = Number(res.headers.get('content-length')) || MODEL_BYTES_FALLBACK;
    const reader = res.body.getReader();
    const chunks: Uint8Array[] = [];
    let got = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      got += value.length;
      onProgress?.({ phase: 'model', ratio: Math.min(1, got / total) });
    }
    const out = new Uint8Array(got);
    let o = 0;
    for (const c of chunks) {
      out.set(c, o);
      o += c.length;
    }
    onProgress?.({ phase: 'model', ratio: 1 });
    return out;
  }

  // ---------- Bildschleife ----------

  private startLoop(): void {
    type Vfc = HTMLVideoElement & { requestVideoFrameCallback(cb: (now: number, meta: VideoFrameCallbackMetadata) => void): number };
    const v = this.video as Vfc;
    if (typeof v.requestVideoFrameCallback === 'function') {
      const step = (now: number, meta: VideoFrameCallbackMetadata) => {
        if (!this.running) return;
        this.onVideoFrame(now, meta);
        this.rvfcId = v.requestVideoFrameCallback(step);
      };
      this.rvfcId = v.requestVideoFrameCallback(step);
    } else {
      const tick = () => {
        if (!this.running) return;
        if (this.video.currentTime !== this.lastVideoTime && this.video.readyState >= 2) {
          this.lastVideoTime = this.video.currentTime;
          this.onVideoFrame(performance.now(), null);
        }
        this.rafId = requestAnimationFrame(tick);
      };
      this.rafId = requestAnimationFrame(tick);
    }
  }

  private onVideoFrame(now: number, meta: VideoFrameCallbackMetadata | null): void {
    if (!this.landmarker) return;
    // Kamera-Bildrate aus den vom Browser gezählten Bildern (auch die, die wir wegen Rechenzeit übersprungen haben)
    if (meta && typeof meta.presentedFrames === 'number') {
      this.camSamples.push({ t: now, frames: meta.presentedFrames });
      while (this.camSamples.length > 2 && now - this.camSamples[0].t > 1500) this.camSamples.shift();
      const a = this.camSamples[0];
      const b = this.camSamples[this.camSamples.length - 1];
      if (b.t > a.t) this.camFps = ((b.frames - a.frames) * 1000) / (b.t - a.t);
    } else {
      this.camMeter.tick(now);
      this.camFps = this.camMeter.rate(now);
    }
    const cap = meta?.captureTime;
    const t = cap && now - cap >= 0 && now - cap < 500 ? cap : now;
    const img: Size = { w: this.video.videoWidth, h: this.video.videoHeight };
    const t0 = performance.now();
    let ts = t0;
    if (ts <= this.lastTs) ts = this.lastTs + 1;
    this.lastTs = ts;
    let lms: Landmark[] | null = null;
    let metrics: FaceMetrics | null = null;
    try {
      const res = this.landmarker.detectForVideo(this.video, ts);
      lms = res.faceLandmarks?.[0] ?? null;
      metrics = lms ? extractFeatures(lms, res.facialTransformationMatrixes?.[0]?.data, img) : null;
    } catch {
      lms = null;
      metrics = null;
    }
    const procMs = performance.now() - t0;
    this.checkImage(now, img, metrics);
    this.ingest(t, metrics, lms, img, procMs);
  }

  /** Alle ~0,5 s: Helligkeit des Gesichts und der Augenbereiche prüfen (kleines Bild, billig). */
  private checkImage(now: number, img: Size, metrics: FaceMetrics | null): void {
    if (now - this.lastImageT < 500) return;
    this.lastImageT = now;
    if (!metrics || !img.w) {
      this.image = null;
      return;
    }
    try {
      const w = 160;
      const h = Math.max(1, Math.round((160 * img.h) / img.w));
      if (!this.canvas) this.canvas = document.createElement('canvas');
      this.canvas.width = w;
      this.canvas.height = h;
      const ctx = this.canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(this.video, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;
      const faceLuma = lumaStats(data, w, h, metrics.faceBox);
      const eyes = metrics.eyeBoxes.map((b) => lumaStats(data, w, h, b));
      this.image = { faceLuma, advice: brightnessAdvice(faceLuma), reflection: reflectionLikely(eyes) };
    } catch {
      this.image = null;
    }
  }

  private synthStep(): void {
    const t = performance.now();
    const truth = this.synthTruth?.() ?? null;
    if (!truth) return this.ingest(t, null, null, { w: 640, h: 480 }, 0);
    const metrics = synthMetrics(synthFeatures(truth, gauss));
    this.ingest(t, metrics, null, { w: 640, h: 480 }, 0);
  }

  /** Testmodus: liefert den „wahren“ Blickpunkt (Bruchteile des Fensters) oder null (= kein Gesicht). */
  setSyntheticTruth(fn: (() => Pt | null) | null): void {
    this.synthTruth = fn;
  }

  private ingest(t: number, metrics: FaceMetrics | null, lms: Landmark[] | null, img: Size, procMs: number): void {
    this.frames++;
    this._lastMetrics = metrics;
    if (metrics) {
      this.lastFaceT = t;
      this.evalMeter.tick(t);
      this.procStats.push(procMs);
      if (this._status === 'no-face') this.setStatus('running');
    } else if (t - this.lastFaceT > NO_FACE_MS && this._status === 'running') {
      this.setStatus('no-face');
    }
    const info: FrameInfo = { t, face: !!metrics, metrics, landmarks: lms, imgSize: img, procMs, image: this.image };
    for (const cb of [...this.frameL]) cb(info);
    if (!metrics || metrics.blink) return; // Lidschlag: Bild auslassen, Gesicht gilt nicht als verloren
    this.collector?.(t, metrics.features);
    if (this.model) this.emitGaze(t, metrics.features);
  }

  private emitGaze(t: number, feat: number[]): void {
    const model = this.model;
    if (!model) return;
    const raw = predictGaze(model, feat);
    if (!Number.isFinite(raw.x) || !Number.isFinite(raw.y)) return;
    if (t - this.lastGazeT > FILTER_RESET_MS) this.filter.reset();
    this.lastGazeT = t;
    const f = this.filter.filter(raw.x, raw.y, t);
    const nx = Math.min(1, Math.max(0, f.x));
    const ny = Math.min(1, Math.max(0, f.y));
    const vp = this.opts.viewport();
    const x = nx * vp.w;
    const y = ny * vp.h;
    const g: GazeSample = { t, x, y, nx, ny, rawNx: raw.x, rawNy: raw.y, quadrant: quadrantOf({ x, y }, vp) };
    this._lastGaze = g;
    for (const cb of [...this.gazeL]) cb(g);
  }

  // ---------- Kalibrierung ----------

  /** Gespeicherte Kalibrierung einsetzen (z. B. aus sessionStorage) oder mit null löschen. */
  setCalibration(m: GazeModel | null): void {
    this.model = m;
    this.filter.reset();
    this._lastGaze = null;
  }

  /** Ist die Kalibrierung für das aktuelle Fenster nicht mehr brauchbar (Drehung/Größe)? */
  isStale(): boolean {
    return !!this.model && isStale(this.model.viewport, this.opts.viewport());
  }

  setSmoothing(s: number): void {
    this.opts.smoothing = s;
    this.filter.setSmoothing(s);
  }

  /**
   * 9-Punkte-Kalibrierung (je 1,2 s: die ersten 0,4 s verwerfen, danach Median). Die Seite zeigt die Punkte selbst
   * (`onPoint`); der Tracker misst nur und passt das Modell an. Bei Erfolg ist es sofort aktiv.
   */
  async calibrate(o: CalibrateOptions = {}): Promise<CalibrationOutcome> {
    if (!this.running) return { ok: false, reason: 'not-running', pointsUsed: 0, pointsSkipped: [] };
    const vp = o.viewport ?? this.opts.viewport();
    const pts = o.points ?? CALIBRATION_POINTS;
    const settle = o.settleMs ?? 400;
    const collect = o.collectMs ?? 800;
    const data: CalibrationPoint[] = [];
    const skipped: number[] = [];
    try {
      for (let i = 0; i < pts.length; i++) {
        const target = toPx(pts[i], vp);
        o.onPoint?.({ index: i, total: pts.length, target, normalized: pts[i], phase: 'start' });
        const frames: FeatureFrame[] = [];
        const t0 = performance.now();
        this.collector = (t, f) => frames.push({ t, f });
        try {
          await sleep(settle + collect, o.signal);
        } finally {
          this.collector = null;
        }
        const s = summarizePoint(frames, t0, settle);
        if (s) data.push({ target, feat: s.feat });
        else skipped.push(i);
        o.onPoint?.({ index: i, total: pts.length, target, normalized: pts[i], phase: 'done', ok: !!s });
      }
    } catch (e) {
      if (isAbort(e)) return { ok: false, reason: 'aborted', pointsUsed: data.length, pointsSkipped: skipped };
      throw e;
    }
    const fit = fitGazeModel(data, vp);
    if (!fit.ok) return { ok: false, reason: fit.reason, pointsUsed: data.length, pointsSkipped: skipped };
    this.setCalibration(fit.model);
    return { ok: true, model: fit.model, pointsUsed: data.length, pointsSkipped: skipped, tried: fit.tried };
  }

  /**
   * Blickpunkte an vorgegebenen Orten sammeln (Genauigkeitsprüfung, Ruhetest). Je Punkt: `settleMs` verwerfen,
   * `collectMs` aufzeichnen. Braucht eine aktive Kalibrierung. Rückgabe null bei Abbruch.
   */
  async collectGaze(points: readonly Pt[], o: CollectOptions = {}): Promise<PointCollection[] | null> {
    const vp = o.viewport ?? this.opts.viewport();
    const settle = o.settleMs ?? 600;
    const collect = o.collectMs ?? 1200;
    const out: PointCollection[] = [];
    try {
      for (let i = 0; i < points.length; i++) {
        const target = toPx(points[i], vp);
        o.onPoint?.({ index: i, total: points.length, target, normalized: points[i], phase: 'start' });
        const samples: TimedGaze[] = [];
        const t0 = performance.now();
        const off = this.onGaze((g) => {
          if (g.t - t0 >= settle) samples.push({ t: g.t, x: g.x, y: g.y });
        });
        try {
          await sleep(settle + collect, o.signal);
        } finally {
          off();
        }
        out.push({ target, normalized: points[i], samples });
        o.onPoint?.({ index: i, total: points.length, target, normalized: points[i], phase: 'done' });
      }
    } catch (e) {
      if (isAbort(e)) return null;
      throw e;
    }
    return out;
  }
}
