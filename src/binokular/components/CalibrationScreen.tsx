/**
 * Kalibrierung: Farbkanäle (A/B/beide), Augen (links/rechts/gemeinsam), Feineinstellung RGB/HSV.
 */
import { useEffect, useRef, useState } from 'preact/hooks';
import {
  adviceFor,
  CALIBRATION_STEPS,
  DEFAULT_CALIBRATION,
  EMPTY_RESULTS,
  stepShows,
  type Calibration,
  type CalibrationResults,
  type CalibrationStep,
} from '../calibration/calibration';
import type { Settings } from '../data/settings';
import { t } from '../texts';
import { baseColorOf, filterOf, NEUTRAL_LEVEL, rgbCss, secondFilter, type CalibratedColors, type RGB } from '../vision/color';
import { Choice, Screen } from './common';
import { FineCalibration } from './FineCalibration';

type Props = {
  settings: Settings;
  calibration: Calibration;
  onSettings: (patch: Partial<Settings>) => void;
  onCalibration: (c: Calibration) => void;
  onDone: () => void;
  onBack: () => void;
};

/** Zeichnet eine Form in einer Farbe auf Schwarz */
function shape(g: CanvasRenderingContext2D, kind: 'circle' | 'square' | 'triangle' | 'star' | 'diamond', cx: number, cy: number, r: number, color: string) {
  g.fillStyle = color;
  g.beginPath();
  if (kind === 'circle') g.arc(cx, cy, r, 0, Math.PI * 2);
  else if (kind === 'square') g.rect(cx - r * 0.85, cy - r * 0.85, r * 1.7, r * 1.7);
  else if (kind === 'triangle') {
    g.moveTo(cx, cy - r);
    g.lineTo(cx + r, cy + r * 0.75);
    g.lineTo(cx - r, cy + r * 0.75);
  } else if (kind === 'diamond') {
    g.moveTo(cx, cy - r);
    g.lineTo(cx + r * 0.8, cy);
    g.lineTo(cx, cy + r);
    g.lineTo(cx - r * 0.8, cy);
  } else {
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const rr = i % 2 ? r * 0.45 : r;
      g.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
    }
  }
  g.closePath();
  g.fill();
}

function useCanvas(draw: (g: CanvasRenderingContext2D, w: number, h: number) => void, deps: unknown[]) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = c.clientWidth || 300;
    const h = c.clientHeight || 160;
    c.width = Math.round(w * dpr);
    c.height = Math.round(h * dpr);
    const g = c.getContext('2d');
    if (!g) return;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = '#000';
    g.fillRect(0, 0, w, h);
    g.globalCompositeOperation = 'lighter';
    draw(g, w, h);
    g.globalCompositeOperation = 'source-over';
  }, deps);
  return ref;
}

function StepCanvas({ step, settings, colors }: { step: CalibrationStep; settings: Settings; colors: CalibratedColors }) {
  const ref = useCanvas(
    (g, w, h) => {
      const r = Math.min(w, h) * 0.22;
      const show = stepShows(step);
      const red = rgbCss(colors.red);
      const second = rgbCss(baseColorOf(secondFilter(settings.glasses), colors));
      if (show.filters) {
        const two = show.filters.length === 2;
        show.filters.forEach((f, i) => {
          const cx = two ? w * (i === 0 ? 0.33 : 0.67) : w / 2;
          shape(g, f === 'RED' ? 'circle' : 'square', cx, h / 2, r, f === 'RED' ? red : second);
        });
      } else if (show.eyes) {
        const e = show.eyes[0];
        if (e === 'BOTH') shape(g, 'diamond', w / 2, h / 2, r, rgbCss({ r: NEUTRAL_LEVEL, g: NEUTRAL_LEVEL, b: NEUTRAL_LEVEL }));
        else shape(g, e === 'LEFT' ? 'triangle' : 'star', w / 2, h / 2, r, rgbCss(baseColorOf(filterOf(e, settings), colors)));
      }
    },
    [step, settings.glasses, settings.leftLens, JSON.stringify(colors)],
  );
  return <canvas ref={ref} class="bm-cal-canvas" data-testid="cal-canvas" aria-hidden="true" />;
}

function Slider({ label, value, max, onInput, id }: { label: string; value: number; max: number; onInput: (v: number) => void; id: string }) {
  return (
    <label class="bm-slider" for={id}>
      <span>{label}</span>
      <input id={id} type="range" min={0} max={max} step={1} value={value} onInput={(e) => onInput(Number((e.currentTarget as HTMLInputElement).value))} />
      <output>{value}</output>
    </label>
  );
}

function ColorEditor({ name, color, onChange, idPrefix }: { name: string; color: RGB; onChange: (c: RGB) => void; idPrefix: string }) {
  return (
    <fieldset class="bm-color-editor">
      <legend>
        <span class="bm-swatch" style={{ background: rgbCss(color) }} /> {name} <code>rgb({color.r}, {color.g}, {color.b})</code>
      </legend>
      <div class="bm-color-grid">
        <Slider id={`${idPrefix}-r`} label="R" value={color.r} max={255} onInput={(v) => onChange({ ...color, r: v })} />
        <Slider id={`${idPrefix}-g`} label="G" value={color.g} max={255} onInput={(v) => onChange({ ...color, g: v })} />
        <Slider id={`${idPrefix}-b`} label="B" value={color.b} max={255} onInput={(v) => onChange({ ...color, b: v })} />
      </div>
    </fieldset>
  );
}

function CrosstalkPreview({ settings, colors }: { settings: Settings; colors: CalibratedColors }) {
  const ref = useCanvas(
    (g, w, h) => {
      const r = Math.min(w / 4, h) * 0.32;
      shape(g, 'circle', w * 0.3, h / 2, r, rgbCss(colors.red));
      shape(g, 'square', w * 0.7, h / 2, r, rgbCss(baseColorOf(secondFilter(settings.glasses), colors)));
      g.globalCompositeOperation = 'source-over';
      g.fillStyle = '#bbb';
      g.font = '13px system-ui, sans-serif';
      g.textAlign = 'center';
      g.fillText(t.calFormRed, w * 0.3, h - 8);
      g.fillText(t.calFormOther, w * 0.7, h - 8);
    },
    [settings.glasses, JSON.stringify(colors)],
  );
  return <canvas ref={ref} class="bm-cal-canvas bm-cal-small" aria-hidden="true" />;
}

export function CalibrationScreen({ settings, calibration, onSettings, onCalibration, onDone, onBack }: Props) {
  const [step, setStep] = useState(0);
  const [results, setResults] = useState<CalibrationResults>({ ...EMPTY_RESULTS });
  const done = step >= CALIBRATION_STEPS.length;
  const current = CALIBRATION_STEPS[Math.min(step, CALIBRATION_STEPS.length - 1)];
  const otherName = settings.glasses === 'RED_CYAN' ? t.calColorCyan : t.calColorGreen;

  const answer = (v: string) => {
    const next = { ...results, [current]: v } as CalibrationResults;
    setResults(next);
    setStep(step + 1);
    if (step + 1 >= CALIBRATION_STEPS.length) onCalibration({ ...calibration, results: next, completedAt: new Date().toISOString() });
  };

  const setColors = (colors: CalibratedColors) => onCalibration({ ...calibration, colors });
  const second = secondFilter(settings.glasses);

  let buttons: { v: string; label: string }[] = [];
  if (current === 'objectA') buttons = [{ v: 'seen', label: t.calSeeA }, { v: 'notSeen', label: t.calSeeNothing }];
  else if (current === 'objectB') buttons = [{ v: 'seen', label: t.calSeeB }, { v: 'notSeen', label: t.calSeeNothing }];
  else if (current === 'objectsBoth') buttons = [{ v: 'both', label: t.calSeeBoth }, { v: 'one', label: t.calSeeOne }, { v: 'none', label: t.calSeeNothing }];
  else
    buttons = [
      { v: 'left', label: t.calEyeLeft },
      { v: 'right', label: t.calEyeRight },
      { v: 'both', label: t.calEyeBoth },
      { v: 'none', label: t.calEyeNone },
    ];

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
      <p class="bm-lead">{t.calIntro}</p>
      <div class="bm-row">
        <Choice
          name="cal-glasses"
          label={t.calGlasses}
          value={settings.glasses}
          options={[
            { value: 'RED_CYAN', label: t.glassesRedCyan },
            { value: 'RED_GREEN', label: t.glassesRedGreen },
          ]}
          onChange={(v) => onSettings({ glasses: v })}
        />
        <Choice
          name="cal-lens"
          label={t.calMapping}
          value={settings.leftLens}
          options={[
            { value: 'RED', label: t.lensLeftRed(otherName) },
            { value: 'OTHER', label: t.lensLeftOther(otherName) },
          ]}
          onChange={(v) => onSettings({ leftLens: v })}
        />
      </div>
      {!done ? (
        <section class="bm-card bm-cal-step" aria-live="polite">
          <p class="bm-muted">
            {step < 3 ? t.calPart1 : t.calPart2} · {t.calStep(step + 1, CALIBRATION_STEPS.length)}
          </p>
          <StepCanvas step={current} settings={settings} colors={calibration.colors} />
          <p class="bm-q" id="cal-question">
            {t.calQ[current]}
          </p>
          <div class="bm-actions">
            {buttons.map((b) => (
              <button key={b.v} class="bm-btn" data-answer={b.v} onClick={() => answer(b.v)}>
                {b.label}
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section class="bm-card" aria-live="polite">
          <h2 id="cal-done">{t.calDone}</h2>
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
                setStep(0);
              }}
            >
              {t.calRepeat}
            </button>
            <button class="bm-btn bm-btn-primary" id="cal-continue" onClick={onDone}>
              {t.calContinue}
            </button>
          </div>
        </section>
      )}
      <details class="bm-card bm-fine">
        <summary>{t.calFine}</summary>
        <p class="bm-muted">{t.calFineHint}</p>
        <FineCalibration key={`${settings.glasses}-${settings.leftLens}`} settings={settings} colors={calibration.colors} onColors={setColors} />
        <CrosstalkPreview settings={settings} colors={calibration.colors} />
        <details class="bm-fine-expert">
          <summary>{t.fineExpert}</summary>
          <ColorEditor idPrefix="c-red" name={t.calColorRed} color={calibration.colors.red} onChange={(c) => setColors({ ...calibration.colors, red: c })} />
          {second === 'CYAN' ? (
            <ColorEditor idPrefix="c-cyan" name={t.calColorCyan} color={calibration.colors.cyan} onChange={(c) => setColors({ ...calibration.colors, cyan: c })} />
          ) : (
            <ColorEditor idPrefix="c-green" name={t.calColorGreen} color={calibration.colors.green} onChange={(c) => setColors({ ...calibration.colors, green: c })} />
          )}
        </details>
        <button class="bm-btn" onClick={() => setColors(JSON.parse(JSON.stringify(DEFAULT_CALIBRATION.colors)))}>
          {t.calReset}
        </button>
      </details>
    </Screen>
  );
}
