/**
 * Feinkalibrierung per Auswahl (statt Regler): Raster aus 3 × 3 Farbkästen, zwei Schritte je Runde, zwei Runden je Farbe.
 * Logik in `calibration/fine.ts`.
 */
import { useState } from 'preact/hooks';
import { centerOf, chooseFallback, fineColorOf, fineVariants, type FineRound, type FineVariant } from '../calibration/fine';
import type { Settings } from '../data/settings';
import { t } from '../texts';
import { filterOf, rgbCss, secondFilter, type CalibratedColors, type Eye, type FilterColor } from '../vision/color';

type Phase = 'vanish' | 'clear';

interface Props {
  settings: Settings;
  colors: CalibratedColors;
  onColors: (c: CalibratedColors) => void;
  onFinished?: () => void;
}

/** Auge hinter einer Filterfarbe */
function eyeBehind(f: FilterColor, s: Settings): Eye {
  return filterOf('LEFT', s) === f ? 'LEFT' : 'RIGHT';
}

export function FineCalibration({ settings, colors, onColors, onFinished }: Props) {
  const filters: FilterColor[] = ['RED', secondFilter(settings.glasses)];
  const [idx, setIdx] = useState(0);
  const [round, setRound] = useState<FineRound>(1);
  const [phase, setPhase] = useState<Phase>('vanish');
  const [marked, setMarked] = useState<number[]>([]);
  const [center, setCenter] = useState<{ hue: number; v: number } | null>(null);
  const [finished, setFinished] = useState(false);

  const filter = filters[Math.min(idx, 1)];
  const color = fineColorOf(filter);
  const variants: FineVariant[] = fineVariants(color, round, center ?? centerOf(color, colors[color]));
  const own = eyeBehind(filter, settings);
  const other: Eye = own === 'LEFT' ? 'RIGHT' : 'LEFT';
  const colorName = filter === 'RED' ? t.calColorRed : filter === 'CYAN' ? t.calColorCyan : t.calColorGreen;

  const restart = () => {
    setIdx(0);
    setRound(1);
    setPhase('vanish');
    setMarked([]);
    setCenter(null);
    setFinished(false);
  };

  const choose = (v: FineVariant) => {
    if (round === 1) {
      setCenter({ hue: v.hue, v: v.v });
      setRound(2);
      setPhase('vanish');
      setMarked([]);
      return;
    }
    onColors({ ...colors, [color]: v.rgb });
    if (idx === 0) {
      setIdx(1);
      setRound(1);
      setPhase('vanish');
      setMarked([]);
      setCenter(null);
    } else {
      setFinished(true);
      onFinished?.();
    }
  };

  if (finished) {
    return (
      <div class="bm-fine-done" data-testid="fine-done">
        <p>{t.fineDone}</p>
        <div class="bm-fine-result">
          {filters.map((f) => {
            const c = colors[fineColorOf(f)];
            return (
              <span key={f} class="bm-fine-chip">
                <span class="bm-swatch" style={{ background: rgbCss(c) }} /> {f === 'RED' ? t.calColorRed : f === 'CYAN' ? t.calColorCyan : t.calColorGreen}
              </span>
            );
          })}
        </div>
        <button class="bm-btn" onClick={restart}>
          {t.fineAgain}
        </button>
      </div>
    );
  }

  const selectable = phase === 'clear' && marked.length ? variants.filter((v) => marked.includes(v.nr)) : variants;
  const toggle = (nr: number) => setMarked(marked.includes(nr) ? marked.filter((x) => x !== nr) : [...marked, nr]);

  return (
    <div class="bm-fine-step" data-testid="fine-step" data-phase={phase} data-round={round} data-color={color}>
      <p class="bm-muted">{t.fineProgress(colorName, idx + 1, round)}</p>
      <p class="bm-q" id="fine-question">
        {phase === 'vanish' ? t.fineVanish(colorName, own, other) : t.fineClear(colorName, other, own)}
      </p>
      <div class="bm-fine-grid" role="group" aria-labelledby="fine-question">
        {variants.map((v) => {
          const isMarked = marked.includes(v.nr);
          const dim = phase === 'clear' && marked.length > 0 && !isMarked;
          return (
            <button
              key={`${round}-${v.nr}`}
              type="button"
              class={`bm-fine-box${isMarked && phase === 'vanish' ? ' is-marked' : ''}${dim ? ' is-dim' : ''}`}
              data-nr={v.nr}
              aria-pressed={phase === 'vanish' ? isMarked : undefined}
              disabled={dim}
              onClick={() => (phase === 'vanish' ? toggle(v.nr) : choose(v))}
            >
              <span class="bm-fine-swatch" style={{ background: rgbCss(v.rgb) }} />
              <span class="bm-fine-nr">
                {v.nr}
                {isMarked && phase === 'vanish' ? ' ✓' : ''}
              </span>
            </button>
          );
        })}
      </div>
      <div class="bm-actions">
        {phase === 'vanish' ? (
          <>
            <button class="bm-btn bm-btn-primary" id="fine-next" disabled={marked.length === 0} onClick={() => setPhase('clear')}>
              {t.fineNext(marked.length)}
            </button>
            <button class="bm-btn" id="fine-none" onClick={() => choose(chooseFallback(variants))}>
              {t.fineNone}
            </button>
          </>
        ) : (
          <button class="bm-btn" onClick={() => setPhase('vanish')}>
            {t.fineBack}
          </button>
        )}
        <button class="bm-btn bm-btn-ghost" onClick={restart}>
          {t.fineRestart}
        </button>
      </div>
      {phase === 'vanish' && <p class="bm-muted bm-fine-tip">{t.fineTip}</p>}
      {selectable.length === 0 && <p class="bm-muted">{t.fineNoneHint}</p>}
    </div>
  );
}
