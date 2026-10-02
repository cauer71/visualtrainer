import { useEffect, useRef } from 'preact/hooks';
import { snapNumber } from '../../core/params';

/**
 * Zahl einstellen: Knöpfe „−“ und „+“ (≥ 56 px, bei gedrückt gehaltenem Knopf wiederholt sich der Schritt) mit dem
 * Wert in der Mitte und darunter ein Schieberegler (`input type=range`, ≥ 44 px hoch, Tastatur: Pfeiltasten).
 * Der Wert wird immer auf das Raster min + k · step gerundet und in [min, max] gehalten.
 */
export interface StepperProps {
  value: number;
  min: number;
  max: number;
  step: number;
  /** Wert als Text, z. B. „1,5“ (Sprachformat) */
  format: (v: number) => string;
  /** Einheit neben dem Wert, z. B. „s“ (leer = keine) */
  unit?: string;
  /** Name der Einstellung für Screenreader */
  label: string;
  lessLabel: string;
  moreLabel: string;
  onChange: (v: number) => void;
  /** Schrittweite der Knöpfe (Standard = `step`) */
  buttonStep?: number;
}

export function Stepper({ value, min, max, step, format, unit, label, lessLabel, moreLabel, onChange, buttonStep }: StepperProps) {
  const valueRef = useRef(value);
  valueRef.current = value;
  const timers = useRef<{ delay: number; repeat: number }>({ delay: 0, repeat: 0 });
  const grid = { min, max, step };
  const bs = buttonStep ?? step;

  const stop = () => {
    window.clearTimeout(timers.current.delay);
    window.clearInterval(timers.current.repeat);
    timers.current = { delay: 0, repeat: 0 };
  };
  useEffect(() => stop, []);

  const bump = (dir: 1 | -1) => {
    const next = snapNumber(grid, valueRef.current + dir * bs);
    if (next !== valueRef.current) {
      valueRef.current = next;
      onChange(next);
    }
  };

  const hold = (dir: 1 | -1) => (e: PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    stop();
    bump(dir);
    timers.current.delay = window.setTimeout(() => {
      timers.current.repeat = window.setInterval(() => bump(dir), 90);
    }, 420);
  };

  // Tastatur (Enter/Leertaste) und Hilfstechnik lösen einen Klick ohne Zeiger aus (detail 0) → ein Schritt;
  // echte Zeiger laufen über pointerdown (deren Klick hat detail ≥ 1 und zählt nicht doppelt)
  const click = (dir: 1 | -1) => (e: MouseEvent) => {
    if (e.detail === 0) bump(dir);
  };

  const valueText = unit ? `${format(value)} ${unit}` : format(value);
  return (
    <div class="stepper">
      <div class="stepper-row">
        <button
          type="button"
          class="stepper-btn"
          aria-label={lessLabel}
          disabled={value <= min}
          onPointerDown={hold(-1)}
          onPointerUp={stop}
          onPointerLeave={stop}
          onPointerCancel={stop}
          onClick={click(-1)}
        >
          <span aria-hidden="true">−</span>
        </button>
        <output class="stepper-value" aria-live="polite">
          <span class="stepper-num">{format(value)}</span>
          {unit ? <span class="stepper-unit"> {unit}</span> : null}
        </output>
        <button
          type="button"
          class="stepper-btn"
          aria-label={moreLabel}
          disabled={value >= max}
          onPointerDown={hold(1)}
          onPointerUp={stop}
          onPointerLeave={stop}
          onPointerCancel={stop}
          onClick={click(1)}
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>
      <input
        class="stepper-range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        aria-valuetext={valueText}
        onInput={(e) => {
          const next = snapNumber(grid, Number((e.currentTarget as HTMLInputElement).value));
          if (next !== valueRef.current) {
            valueRef.current = next;
            onChange(next);
          }
        }}
      />
    </div>
  );
}
