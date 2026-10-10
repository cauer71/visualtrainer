/**
 * Kalibrierung als Schrittfolge (Farbmodell und Rechenwege: calibration/*.ts):
 *   Profilleiste (aktives Profil wählen, neu, umbenennen, löschen, Export/Import JSON)
 *   0 Vorbereitung → 1 Messbild (Vollbild) → 2 Foto rotes Glas → 3 Foto zweites Glas → 4 Berechnung →
 *   5 Feinabstimmung nach Auge (Regler, Vorschau mit Spielfeld-Ausschnitt, „Als Profil speichern“) →
 *   6 Kontrolle der Zuordnung (optional).
 * Fotos werden nur im Browser ausgewertet (kein Upload); nur die Messwerte landen im Profil.
 */
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { adviceFor, CAL_STEPS, CHECK_STEPS, checkShows, EMPTY_RESULTS, type Calibration, type CalibrationResults, type EyeAnswer } from '../calibration/calibration';
import { computeColors, evaluateGlass, FIELDS, isOverexposed, rateCrosstalk, RED_GREEN_START_G, sampleBox, type BoxSample, type CalcResult, type Field } from '../calibration/photometry';
import { cleanProfileName, exportProfiles, findProfile, importProfiles, isStartProfile, makeProfile, mergeProfiles, paletteOf, startProfileFor, type ColorProfile } from '../calibration/profiles';
import { paletteFromTuning, tuningFromPalette, TUNING_RANGE, type Tuning } from '../calibration/tuning';
import type { Settings } from '../data/settings';
import { makeRng } from '../games/common';
import { buildPath, FIELD_H, FIELD_W } from '../games/nachzeichnen/path';
import { t } from '../texts';
import { filterOf, fullColorOf, NEUTRAL_LEVEL, rgbCss, secondFilter, toHex, type Glasses, type Palette, type RGB, type VisionSettings } from '../vision/color';
import { renderItems, type Item } from '../vision/renderer';
import { Choice, de, download, Screen } from './common';
import { ProfileSwatch } from './ProfilePicker';

type Props = {
  settings: Settings;
  calibration: Calibration;
  profiles: ColorProfile[];
  activeProfileId: string;
  onSettings: (patch: Partial<Settings>) => void;
  onProfiles: (profiles: ColorProfile[], activeId: string) => void;
  onCalibration: (c: Calibration) => void;
  /** weiter zur Auswahl vor dem Spiel */
  onDone: () => void;
  /** „Mit Startwerten spielen“ (Startprofil des Brillentyps) */
  onBack: () => void;
};

interface Photo {
  name: string;
  image: ImageData;
  /** verkleinerte Kopie zum schnellen Zeichnen */
  preview: HTMLCanvasElement;
  points: BoxSample[];
}

const PATTERN: Record<Field, string> = { white: '#FFFFFF', red: '#FF0000', green: '#00FF00', blue: '#0000FF', black: '#000000' };
const GREY = `rgb(${NEUTRAL_LEVEL},${NEUTRAL_LEVEL},${NEUTRAL_LEVEL})`;

const num = (v: number, digits = 4): string => (Number.isFinite(v) ? v.toLocaleString('de-DE', { maximumSignificantDigits: digits }) : '∞');
const pctText = (v: number): string => (Number.isFinite(v) ? `${de(v * 100, 2)} %` : '∞');

// --- Foto öffnen ------------------------------------------------------------------------------

async function looksHeic(file: File): Promise<boolean> {
  if (/\.(heic|heif)$/i.test(file.name) || /hei[cf]/i.test(file.type)) return true;
  try {
    const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());
    const brand = String.fromCharCode(...Array.from(head.slice(4, 12)));
    return /^ftyp(heic|heix|hevc|hevx|heim|heis)/.test(brand);
  } catch {
    return false;
  }
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('decode'));
    };
    img.src = url;
  });
}

/** Foto dekodieren: volle Auflösung als ImageData (für die Messung) und eine kleine Vorschau */
async function decodePhoto(file: File): Promise<Omit<Photo, 'points'>> {
  if (await looksHeic(file)) throw new Error('heic');
  let src: ImageBitmap | HTMLImageElement;
  try {
    src = await createImageBitmap(file);
  } catch {
    src = await loadImage(file);
  }
  const w = src.width;
  const h = src.height;
  if (!w || !h) throw new Error('decode');
  const full = document.createElement('canvas');
  full.width = w;
  full.height = h;
  const fg = full.getContext('2d', { willReadFrequently: true });
  if (!fg) throw new Error('decode');
  fg.drawImage(src, 0, 0);
  const image = fg.getImageData(0, 0, w, h);
  const k = Math.min(1, 1400 / w);
  const preview = document.createElement('canvas');
  preview.width = Math.max(1, Math.round(w * k));
  preview.height = Math.max(1, Math.round(h * k));
  preview.getContext('2d')?.drawImage(full, 0, 0, preview.width, preview.height);
  if ('close' in src) src.close();
  return { name: file.name, image, preview };
}

// --- Bausteine --------------------------------------------------------------------------------

function Range({ id, label, value, min, max, step = 1, onInput, shown }: { id: string; label: string; value: number; min: number; max: number; step?: number; onInput: (v: number) => void; shown?: string }) {
  return (
    <label class="bm-range" for={id}>
      <span class="bm-range-label">{label}</span>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onInput={(e) => onInput(Number((e.currentTarget as HTMLInputElement).value))} />
      <output for={id}>{shown ?? String(value)}</output>
    </label>
  );
}

function Swatch({ color, label, id }: { color: RGB; label: string; id: string }) {
  return (
    <span class="bm-result-chip" id={id} data-hex={toHex(color)}>
      <span class="bm-swatch" style={{ background: rgbCss(color) }} /> {label} <code>{toHex(color)}</code>
    </span>
  );
}

/** Messbild im Vollbild: fünf große Felder auf Schwarz, graue Beschriftung; Antippen oder Esc schließt */
function PatternOverlay({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    let entered = false;
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', key);
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        document.documentElement
          .requestFullscreen()
          .then(() => (entered = true))
          .catch(() => undefined);
      }
    } catch {
      // Vollbild nicht erlaubt – das Messbild deckt trotzdem die ganze Seite ab
    }
    return () => {
      window.removeEventListener('keydown', key);
      if (entered && document.fullscreenElement) document.exitFullscreen?.().catch(() => undefined);
    };
  }, []);
  return (
    <div class="bm-pattern" id="cal-pattern" role="dialog" aria-label={t.calPatternTitle} onClick={onClose}>
      <div class="bm-pattern-row">
        {FIELDS.map((f) => (
          <div class="bm-pattern-cell" key={f}>
            <div class={`bm-pattern-field${f === 'black' ? ' is-black' : ''}`} style={{ background: PATTERN[f] }} />
            <span>{t.calFieldNames[f]}</span>
          </div>
        ))}
      </div>
      <p class="bm-pattern-hint">{t.calPatternClose}</p>
    </div>
  );
}

/** Foto eines Glases: hochladen, Felder antippen, Werte anzeigen */
function PhotoPanel({ id, title, photo, onPhoto, sym }: { id: string; title: string; photo: Photo | null; onPhoto: (p: Photo | null | ((prev: Photo | null) => Photo | null)) => void; sym: 'a' | 'c' }) {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv || !photo) return;
    const draw = () => {
      const w = cv.clientWidth || 600;
      const h = Math.round((w * photo.image.height) / photo.image.width);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      cv.style.height = `${h}px`;
      const g = cv.getContext('2d');
      if (!g) return;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.drawImage(photo.preview, 0, 0, w, h);
      const k = w / photo.image.width;
      photo.points.forEach((p, i) => {
        g.lineWidth = 2;
        g.strokeStyle = '#ffffff';
        g.strokeRect(p.x0 * k - 1, p.y0 * k - 1, Math.max(3, p.w * k) + 2, Math.max(3, p.h * k) + 2);
        g.strokeStyle = '#000000';
        g.lineWidth = 1;
        g.strokeRect(p.x0 * k - 3, p.y0 * k - 3, Math.max(3, p.w * k) + 6, Math.max(3, p.h * k) + 6);
        const mx = p.x * k + 16;
        const my = p.y * k - 16;
        g.beginPath();
        g.arc(mx, my, 11, 0, Math.PI * 2);
        g.fillStyle = 'rgba(0,0,0,0.8)';
        g.fill();
        g.strokeStyle = '#ffffff';
        g.lineWidth = 1.5;
        g.stroke();
        g.fillStyle = '#ffffff';
        g.font = '700 13px system-ui, sans-serif';
        g.textAlign = 'center';
        g.textBaseline = 'middle';
        g.fillText(String(i + 1), mx, my + 0.5);
      });
    };
    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, [photo]);

  const onFile = async (e: Event) => {
    const input = e.currentTarget as HTMLInputElement;
    const f = input.files?.[0];
    input.value = '';
    if (!f) return;
    setError('');
    setBusy(true);
    try {
      const d = await decodePhoto(f);
      onPhoto({ ...d, points: [] });
    } catch (err) {
      const heic = (err as Error)?.message === 'heic' || (await looksHeic(f));
      setError(heic ? t.calPhotoHeic : t.calPhotoError);
      onPhoto(null);
    } finally {
      setBusy(false);
    }
  };

  const onTap = (e: MouseEvent) => {
    const cv = ref.current;
    if (!cv || !photo || photo.points.length >= FIELDS.length) return;
    const r = cv.getBoundingClientRect();
    const ix = ((e.clientX - r.left) / r.width) * photo.image.width;
    const iy = ((e.clientY - r.top) / r.height) * photo.image.height;
    // funktional aktualisieren: schnelle Folge-Tipps sehen immer den neuesten Stand
    onPhoto((prev) => (prev && prev.points.length < FIELDS.length ? { ...prev, points: [...prev.points, sampleBox(prev.image, ix, iy)] } : prev));
  };

  const meas = photo ? evaluateGlass(photo.points) : null;
  const over = photo ? photo.points.map((p, i) => (isOverexposed(p, FIELDS[i]) ? t.calFieldNames[FIELDS[i]] : '')).filter(Boolean) : [];
  const nextField = photo && photo.points.length < FIELDS.length ? t.calFieldNames[FIELDS[photo.points.length]] : null;

  return (
    <div class="bm-photo" id={id}>
      <h2>{title}</h2>
      <p class="bm-muted">{t.calPhotoHint}</p>
      <label class="bm-btn bm-file">
        {t.calPhotoPick}
        <input type="file" accept="image/jpeg,image/png,image/*" id={`${id}-file`} onChange={onFile} disabled={busy} />
      </label>
      {error && (
        <p class="bm-error" role="alert" id={`${id}-error`}>
          {error}
        </p>
      )}
      {photo && (
        <>
          <p class="bm-q" aria-live="polite" id={`${id}-next`}>
            {nextField ? t.calPhotoNextField(nextField) : t.calPhotoAllDone}
          </p>
          <canvas ref={ref} class="bm-photo-canvas" id={`${id}-canvas`} onClick={onTap} aria-label={photo.name} />
          <div class="bm-actions">
            <button class="bm-btn" id={`${id}-reset`} disabled={!photo.points.length} onClick={() => onPhoto({ ...photo, points: [] })}>
              {t.calPhotoReset}
            </button>
          </div>
          {photo.points.length > 0 && (
            <div class="bm-table-wrap">
              <table class="bm-table" id={`${id}-table`}>
                <thead>
                  <tr>
                    <th>{t.calPhotoField}</th>
                    <th>{t.calPhotoRaw}</th>
                    <th>{t.calPhotoY}</th>
                  </tr>
                </thead>
                <tbody>
                  {photo.points.map((p, i) => (
                    <tr key={i} class={isOverexposed(p, FIELDS[i]) ? 'is-warn' : ''}>
                      <td>
                        {i + 1}. {t.calFieldNames[FIELDS[i]]}
                      </td>
                      <td>
                        {Math.round(p.raw.r)} / {Math.round(p.raw.g)} / {Math.round(p.raw.b)}
                      </td>
                      <td>{num(p.Y)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {over.length > 0 && (
            <p class="bm-error" role="alert" id={`${id}-over`}>
              {t.calPhotoOver(over.join(', '))}
            </p>
          )}
          {meas && (
            <p class="bm-summary" id={`${id}-result`}>
              {t.calPhotoResult(sym, num(meas.values.R), num(meas.values.G), num(meas.values.B))}
            </p>
          )}
        </>
      )}
    </div>
  );
}

/** Vorschau der Feinabstimmung: rotes Quadrat, Kreis in Zweitfarbe, daneben ein Pfad wie im Spiel „Nachzeichnen“ */
function FinePreview({ vis }: { vis: VisionSettings }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const items = useMemo((): Item[] => {
    const path = buildPath(makeRng(11), { points: 6, spread: 0.7 });
    const cut = Math.floor(path.pts.length / 2);
    return [
      { shape: { t: 'poly', pts: path.pts.slice(0, cut + 1), w: 16 }, eye: 'AMBLYOPIC', k: 1 },
      { shape: { t: 'poly', pts: path.pts.slice(cut), w: 16 }, eye: 'FELLOW', k: 1 },
      { shape: { t: 'poly', pts: path.pts.slice(0, Math.floor(cut * 0.7)), w: 6 }, eye: 'BOTH', k: 1, layer: 1 },
      { shape: { t: 'disc', x: path.start.x, y: path.start.y, r: 13 }, eye: 'BOTH', k: 1, layer: 1 },
      { shape: { t: 'ring', x: path.goal.x, y: path.goal.y, r: 26, w: 7 }, eye: 'BOTH', k: 1, layer: 1 },
    ];
  }, []);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const draw = () => {
      const w = cv.clientWidth || 600;
      const h = cv.clientHeight || 260;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      const g = cv.getContext('2d');
      if (!g) return;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.fillStyle = rgbCss(vis.palette.background);
      g.fillRect(0, 0, w, h);
      const left = Math.round(w * 0.4);
      const r = Math.min(left * 0.17, h * 0.22);
      g.fillStyle = rgbCss(vis.palette.red);
      g.fillRect(left * 0.28 - r, h * 0.45 - r, 2 * r, 2 * r);
      g.fillStyle = rgbCss(vis.palette.second);
      g.beginPath();
      g.arc(left * 0.72, h * 0.45, r * 1.1, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = GREY;
      g.font = '12px system-ui, sans-serif';
      g.textAlign = 'center';
      g.fillText(t.calPreviewRed, left * 0.28, h * 0.45 + r + 20);
      g.fillText(t.calPreviewSecond, left * 0.72, h * 0.45 + r + 20);
      // Ausschnitt wie im Spiel „Nachzeichnen“ (Pfad in beiden Farben, graue Linie, Start und Ziel)
      g.save();
      g.beginPath();
      g.rect(left, 0, w - left, h);
      g.clip();
      g.translate(left, 0);
      const sc = Math.min((w - left) / FIELD_W, h / FIELD_H);
      g.setTransform(dpr * sc, 0, 0, dpr * sc, dpr * (left + (w - left - FIELD_W * sc) / 2), dpr * ((h - FIELD_H * sc) / 2));
      renderItems(g, items, vis, { view: 'BINOCULAR' });
      g.restore();
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.strokeStyle = '#333';
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(left + 0.5, 0);
      g.lineTo(left + 0.5, h);
      g.stroke();
    };
    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, [JSON.stringify(vis)]);
  return <canvas ref={ref} class="bm-cal-canvas bm-fine-preview" id="fine-preview" aria-label={`${t.calPreviewRed}, ${t.calPreviewSecond}, ${t.calPreviewGame}`} />;
}

/** Kontrolle der Zuordnung: Form für ein Auge (bzw. beide) in den Profilfarben auf dem Profilhintergrund */
function CheckCanvas({ step, vis }: { step: (typeof CHECK_STEPS)[number]; vis: VisionSettings }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = c.clientWidth || 300;
    const h = c.clientHeight || 200;
    c.width = Math.round(w * dpr);
    c.height = Math.round(h * dpr);
    const g = c.getContext('2d');
    if (!g) return;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = rgbCss(vis.palette.background);
    g.fillRect(0, 0, w, h);
    const e = checkShows(step);
    const r = Math.min(w, h) * 0.3;
    const cx = w / 2;
    const cy = h / 2;
    g.fillStyle = e === 'BOTH' ? GREY : rgbCss(fullColorOf(filterOf(e, vis), vis.palette));
    g.beginPath();
    if (e === 'LEFT') {
      g.moveTo(cx, cy - r);
      g.lineTo(cx + r, cy + r * 0.75);
      g.lineTo(cx - r, cy + r * 0.75);
    } else if (e === 'RIGHT') {
      for (let i = 0; i < 10; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 5;
        const rr = i % 2 ? r * 0.45 : r;
        g.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
      }
    } else {
      g.moveTo(cx, cy - r);
      g.lineTo(cx + r * 0.8, cy);
      g.lineTo(cx, cy + r);
      g.lineTo(cx - r * 0.8, cy);
    }
    g.closePath();
    g.fill();
  }, [step, JSON.stringify(vis)]);
  return <canvas ref={ref} class="bm-cal-canvas" data-testid="cal-canvas" aria-hidden="true" />;
}

// --- Bildschirm -------------------------------------------------------------------------------

export function CalibrationScreen({ settings, calibration, profiles, activeProfileId, onSettings, onProfiles, onCalibration, onDone, onBack }: Props) {
  const active = findProfile(profiles, activeProfileId);
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<Glasses>(active.mode);
  const [tuning, setTuning] = useState<Tuning>(() => tuningFromPalette(paletteOf(active), active.mode));
  const [photoRed, setPhotoRed] = useState<Photo | null>(null);
  const [photoSecond, setPhotoSecond] = useState<Photo | null>(null);
  const [greenG, setGreenG] = useState(RED_GREEN_START_G);
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [showPattern, setShowPattern] = useState(false);
  const [checkIdx, setCheckIdx] = useState(0);
  const [results, setResults] = useState<CalibrationResults>({ ...EMPTY_RESULTS });

  const second = secondFilter(mode);
  const secondName = t.filterName[second];
  const measA = photoRed ? evaluateGlass(photoRed.points) : null;
  const measC = photoSecond ? evaluateGlass(photoSecond.points) : null;
  const calc: CalcResult | null = useMemo(
    () => (measA && measC ? computeColors(mode, measA.values, measC.values, startProfileFor(mode).background, greenG) : null),
    [JSON.stringify(measA?.values), JSON.stringify(measC?.values), mode, greenG],
  );
  const palette: Palette = paletteFromTuning(tuning);
  const vis: VisionSettings = { amblyopicEye: settings.amblyopicEye, glasses: mode, leftLens: settings.leftLens, amblyopicContrast: 100, fellowEyeContrast: 100, palette };

  const startTuning = (m: Glasses = mode): Tuning =>
    calc && m === mode ? tuningFromPalette({ red: calc.red, second: calc.second, background: calc.background }, m) : tuningFromPalette(paletteOf(startProfileFor(m)), m);

  const go = (i: number) => {
    setStep(Math.max(0, Math.min(CAL_STEPS.length - 1, i)));
    setNote('');
  };

  // beim Schrittwechsel die Schrittleiste ins Bild holen (nicht beim ersten Öffnen)
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    document.getElementById('cal-steps')?.scrollIntoView({ block: 'start' });
  }, [step]);

  const pickProfile = (id: string) => {
    const p = findProfile(profiles, id);
    onProfiles(profiles, p.id);
    setMode(p.mode);
    setTuning(tuningFromPalette(paletteOf(p), p.mode));
    setNote('');
  };

  const changeMode = (m: Glasses) => {
    setMode(m);
    setGreenG(RED_GREEN_START_G);
    setTuning(tuningFromPalette(paletteOf(startProfileFor(m)), m));
  };

  const newCalibration = () => {
    setPhotoRed(null);
    setPhotoSecond(null);
    setGreenG(RED_GREEN_START_G);
    setTuning(tuningFromPalette(paletteOf(startProfileFor(mode)), mode));
    setName('');
    setResults({ ...EMPTY_RESULTS });
    setCheckIdx(0);
    go(0);
  };

  const rename = () => {
    if (isStartProfile(active.id)) return;
    const v = cleanProfileName(window.prompt(t.calProfileRenamePrompt, active.name) ?? '');
    if (!v) return;
    onProfiles(
      profiles.map((p) => (p.id === active.id ? { ...p, name: v } : p)),
      active.id,
    );
    setNote(t.calProfileRenamed);
  };

  const remove = () => {
    if (isStartProfile(active.id) || !window.confirm(t.calProfileDeleteConfirm(active.name))) return;
    const rest = profiles.filter((p) => p.id !== active.id);
    const next = startProfileFor(active.mode);
    onProfiles(rest, next.id);
    setMode(next.mode);
    setTuning(tuningFromPalette(paletteOf(next), next.mode));
    setNote(t.calProfileDeleted);
  };

  const save = () => {
    const date = new Date().toLocaleDateString('de-DE');
    const n = cleanProfileName(name) || t.calProfileDefaultName(mode === 'RED_CYAN' ? t.glassesRedCyan : t.glassesRedGreen, date);
    const measurement = measA && measC ? { a: measA.values, c: measC.values } : undefined;
    const p = makeProfile(n, mode, palette, measurement ? 'photo' : 'manual', measurement);
    onProfiles(mergeProfiles(profiles, [p]), p.id);
    onCalibration({ ...calibration, completedAt: new Date().toISOString() });
    setResults({ ...EMPTY_RESULTS });
    setCheckIdx(0);
    setStep(6);
    setNote(t.calProfileSaved(p.name));
  };

  const answer = (v: EyeAnswer) => {
    const key = CHECK_STEPS[checkIdx];
    const next = { ...results, [key]: v };
    setResults(next);
    setCheckIdx(checkIdx + 1);
    if (checkIdx + 1 >= CHECK_STEPS.length) onCalibration({ ...calibration, results: next });
  };

  const hasOwn = profiles.some((p) => !isStartProfile(p.id));
  const stepName = CAL_STEPS[step];
  const checkDone = checkIdx >= CHECK_STEPS.length;

  return (
    <Screen
      title={t.calTitle}
      onBack={onBack}
      wide
      aside={
        <button class="bm-btn bm-btn-stop" onClick={onBack}>
          {t.complaints}
        </button>
      }
    >
      {showPattern && <PatternOverlay onClose={() => setShowPattern(false)} />}
      <p class="bm-lead">{t.calIntro}</p>
      <section class="bm-card bm-profilebar" id="cal-profiles">
        <h2>{t.calProfiles}</h2>
        <div class="bm-profilebar-row">
          <label class="bm-field" for="cal-profile">
            <span>{t.calProfileActive}</span>
            <select id="cal-profile" value={active.id} onChange={(e) => pickProfile((e.currentTarget as HTMLSelectElement).value)}>
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <ProfileSwatch p={active} />
          <code class="bm-profile-hex">
            {toHex(active.red)} · {toHex(active.second)} · {toHex(active.background)}
          </code>
        </div>
        {isStartProfile(active.id) && <p class="bm-muted">{t.calProfileStartNote}</p>}
        <div class="bm-actions">
          <button class="bm-btn" id="cal-new" onClick={newCalibration}>
            {t.calProfileNew}
          </button>
          <button class="bm-btn" id="cal-rename" disabled={isStartProfile(active.id)} onClick={rename}>
            {t.calProfileRename}
          </button>
          <button class="bm-btn" id="cal-delete" disabled={isStartProfile(active.id)} onClick={remove}>
            {t.calProfileDelete}
          </button>
          <button class="bm-btn" id="cal-export" disabled={!hasOwn} onClick={() => download('binokular-farbprofile.json', exportProfiles(profiles), 'application/json')}>
            {t.calProfileExport}
          </button>
          <label class="bm-btn bm-file">
            {t.calProfileImport}
            <input
              type="file"
              accept="application/json,.json"
              id="cal-import"
              onChange={async (e) => {
                const input = e.currentTarget as HTMLInputElement;
                const f = input.files?.[0];
                input.value = '';
                if (!f) return;
                const r = importProfiles(await f.text());
                if (!r.ok) {
                  setNote(t.calProfileImportError[r.error]);
                  return;
                }
                onProfiles(mergeProfiles(profiles, r.profiles), activeProfileId);
                setNote(t.calProfileImported(r.profiles.length));
              }}
            />
          </label>
        </div>
      </section>

      <div class="bm-row">
        <Choice
          name="cal-glasses"
          label={t.calGlasses}
          value={mode}
          options={[
            { value: 'RED_CYAN', label: t.glassesRedCyan },
            { value: 'RED_GREEN', label: t.glassesRedGreen },
          ]}
          onChange={changeMode}
        />
        <Choice
          name="cal-lens"
          label={t.calMapping}
          value={settings.leftLens}
          options={[
            { value: 'RED', label: t.lensLeftRed(secondName) },
            { value: 'OTHER', label: t.lensLeftOther(secondName) },
          ]}
          onChange={(v) => onSettings({ leftLens: v })}
        />
      </div>

      <p class="bm-note" role="status" aria-live="polite" id="cal-note">
        {note}
      </p>

      <nav class="bm-steps" id="cal-steps" aria-label={t.calTitle}>
        {CAL_STEPS.map((s, i) => (
          <button key={s} class={`bm-step${i === step ? ' is-on' : ''}`} data-step={s} aria-current={i === step ? 'step' : undefined} onClick={() => go(i)}>
            <span class="bm-step-no">{i}</span> {t.calStepNames[i]}
          </button>
        ))}
      </nav>

      <section class="bm-card bm-cal-step" data-step={stepName} id="cal-step">
        {stepName === 'prep' && (
          <>
            <h2>{t.calPrepTitle}</h2>
            <ul>
              {t.calPrep.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <div class="bm-actions">
              <button
                class="bm-btn"
                onClick={() => {
                  try {
                    void document.documentElement.requestFullscreen?.().catch(() => undefined);
                  } catch {
                    // Vollbild nicht erlaubt
                  }
                }}
              >
                {t.calFullscreen}
              </button>
            </div>
          </>
        )}
        {stepName === 'pattern' && (
          <>
            <h2>{t.calPatternTitle}</h2>
            <ul>
              {t.calPattern.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <div class="bm-actions">
              <button class="bm-btn bm-btn-primary" id="cal-pattern-open" onClick={() => setShowPattern(true)}>
                {t.calPatternOpen}
              </button>
            </div>
          </>
        )}
        {stepName === 'photoRed' && <PhotoPanel id="photo-red" title={t.calPhotoTitleRed} photo={photoRed} onPhoto={setPhotoRed} sym="a" />}
        {stepName === 'photoSecond' && <PhotoPanel id="photo-second" title={t.calPhotoTitleSecond(t.calGlassAdj[second])} photo={photoSecond} onPhoto={setPhotoSecond} sym="c" />}
        {stepName === 'compute' && (
          <>
            <h2>{t.calComputeTitle}</h2>
            {!calc || !measA || !measC ? (
              <p id="cal-compute-missing">{t.calComputeMissing}</p>
            ) : (
              <>
                <h3>{t.calMeasured}</h3>
                <div class="bm-table-wrap">
                  <table class="bm-table" id="cal-measure">
                    <thead>
                      <tr>
                        <th />
                        <th>R</th>
                        <th>G</th>
                        <th>B</th>
                      </tr>
                    </thead>
                    <tbody>
                      {([
                        [t.calGlassRed, measA.values],
                        [t.calGlassSecond, measC.values],
                      ] as const).map(([label, v]) => (
                        <tr key={label}>
                          <th>{label}</th>
                          <td>{num(v.R)}</td>
                          <td>{num(v.G)}</td>
                          <td>{num(v.B)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {mode === 'RED_GREEN' && <Range id="cal-green-g" label={t.calGreenG} value={greenG} min={0.05} max={1} step={0.01} onInput={setGreenG} shown={num(greenG, 3)} />}
                <h3>{t.calCandidates}</h3>
                <div class="bm-table-wrap">
                  <table class="bm-table" id="cal-candidates">
                    <thead>
                      <tr>
                        <th>g</th>
                        <th>b</th>
                        <th>L</th>
                        <th>C</th>
                        <th>C/L</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {calc.candidates.map((c, i) => (
                        <tr key={i} class={i === calc.chosen ? 'is-chosen' : ''} data-chosen={i === calc.chosen ? '1' : undefined}>
                          <td>{num(c.g, 3)}</td>
                          <td>{num(c.b, 3)}</td>
                          <td>{num(c.L)}</td>
                          <td>{num(c.C)}</td>
                          <td>{num(c.ratio, 3)}</td>
                          <td>{i === calc.chosen ? `◀ ${t.calChosen}` : ''}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p class="bm-muted">{t.calChoiceRule}</p>
                <h3>{t.calResult}</h3>
                <div class="bm-result">
                  <Swatch id="cal-res-red" color={calc.red} label={t.calColorRed} />
                  <Swatch id="cal-res-second" color={calc.second} label={t.calColorSecond} />
                  <Swatch id="cal-res-bg" color={calc.background} label={t.calColorBackground} />
                </div>
                {calc.fallback && (
                  <p class="bm-error" role="alert">
                    {t.calFallback}
                  </p>
                )}
                {calc.compensation.clamped && <p class="bm-muted">{t.calClamped}</p>}
                <h3>{t.calCrosstalk}</h3>
                <ul id="cal-crosstalk">
                  {(['redGlassGreen', 'redGlassBlue', 'secondGlassRed'] as const).map((k) => {
                    const v = calc.crosstalk[k];
                    const rating = rateCrosstalk(v);
                    return (
                      <li key={k} data-rating={rating}>
                        {t.calCrosstalkItems[k]}: <strong>{pctText(v)}</strong> – {t.calRating[rating]}
                      </li>
                    );
                  })}
                </ul>
                <p class="bm-muted">{t.calCrosstalkHint}</p>
                <div class="bm-actions">
                  <button
                    class="bm-btn bm-btn-primary"
                    id="cal-apply"
                    onClick={() => {
                      setTuning(startTuning());
                      go(5);
                    }}
                  >
                    {t.calApply}
                  </button>
                </div>
              </>
            )}
          </>
        )}
        {stepName === 'fine' && (
          <>
            <h2>{t.calFineTitle}</h2>
            <p>{t.calFineIntro}</p>
            <FinePreview vis={vis} />
            <div class="bm-fine-sliders">
              <Range id="fine-bg-red" label={t.calSliderBgRed} value={tuning.bgRed} {...TUNING_RANGE.bgRed} onInput={(v) => setTuning({ ...tuning, bgRed: v })} />
              <Range id="fine-bg-second" label={t.calSliderBgSecond} value={tuning.bgSecond} {...TUNING_RANGE.bgSecond} onInput={(v) => setTuning({ ...tuning, bgSecond: v })} />
              <Range
                id="fine-second"
                label={t.calSliderSecond}
                value={Math.round(tuning.secondLevel)}
                {...TUNING_RANGE.secondLevel}
                onInput={(v) => setTuning({ ...tuning, secondLevel: v })}
              />
              <Range id="fine-red" label={t.calSliderRed} value={tuning.redValue} {...TUNING_RANGE.redValue} onInput={(v) => setTuning({ ...tuning, redValue: v })} />
            </div>
            <div class="bm-result" id="fine-colors">
              <Swatch id="fine-res-red" color={palette.red} label={t.calColorRed} />
              <Swatch id="fine-res-second" color={palette.second} label={t.calColorSecond} />
              <Swatch id="fine-res-bg" color={palette.background} label={t.calColorBackground} />
            </div>
            <ol class="bm-fine-steps">
              {t.calFineSteps.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ol>
            <div class="bm-actions">
              <button class="bm-btn" id="fine-reset" onClick={() => setTuning(startTuning())}>
                {t.calStartValues}
              </button>
            </div>
            <p class="bm-muted">{t.calStartValuesHint(!!calc)}</p>
            <label class="bm-field" for="fine-name">
              <span>{t.calProfileName}</span>
              <input id="fine-name" type="text" maxLength={40} value={name} onInput={(e) => setName((e.currentTarget as HTMLInputElement).value)} />
            </label>
            <div class="bm-actions">
              <button class="bm-btn bm-btn-primary" id="fine-save" onClick={save}>
                {t.calSaveProfile}
              </button>
            </div>
          </>
        )}
        {stepName === 'check' && (
          <>
            <h2>{t.calCheckTitle}</h2>
            <p class="bm-muted">{t.calCheckIntro}</p>
            {!checkDone ? (
              <div aria-live="polite">
                <p class="bm-muted">{t.calCheckStep(checkIdx + 1, CHECK_STEPS.length)}</p>
                <CheckCanvas step={CHECK_STEPS[checkIdx]} vis={vis} />
                <p class="bm-q" id="cal-question">
                  {t.calQ[CHECK_STEPS[checkIdx]]}
                </p>
                <div class="bm-actions">
                  {(
                    [
                      ['left', t.calEyeLeft],
                      ['right', t.calEyeRight],
                      ['both', t.calEyeBoth],
                      ['none', t.calEyeNone],
                    ] as const
                  ).map(([v, label]) => (
                    <button key={v} class="bm-btn" data-answer={v} onClick={() => answer(v)}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div aria-live="polite">
                <h3 id="cal-done">{t.calDone}</h3>
                <p>{t.calAdvice[adviceFor(results)]}</p>
                <div class="bm-actions">
                  {adviceFor(results) === 'swapLenses' && (
                    <button class="bm-btn" onClick={() => onSettings({ leftLens: settings.leftLens === 'RED' ? 'OTHER' : 'RED' })}>
                      {t.calSwap}
                    </button>
                  )}
                  <button
                    class="bm-btn"
                    onClick={() => {
                      setResults({ ...EMPTY_RESULTS });
                      setCheckIdx(0);
                    }}
                  >
                    {t.calRepeat}
                  </button>
                </div>
              </div>
            )}
            <div class="bm-actions">
              <button class="bm-btn bm-btn-primary" id="cal-continue" onClick={onDone}>
                {t.calContinue}
              </button>
            </div>
          </>
        )}
      </section>

      <div class="bm-actions bm-cal-nav">
        <button class="bm-btn" id="cal-prev" disabled={step === 0} onClick={() => go(step - 1)}>
          ← {t.back}
        </button>
        {step < CAL_STEPS.length - 1 && (
          <button class="bm-btn" id="cal-next" onClick={() => go(step + 1)}>
            {t.calNext} →
          </button>
        )}
        {step <= 3 && (
          <button class="bm-btn" id="cal-skip" onClick={() => go(5)}>
            {t.calSkipPhotos}
          </button>
        )}
      </div>
    </Screen>
  );
}
