import { useEffect, useState } from 'preact/hooks';
import { makeCalib } from '../../core/calib';
import { createFormatter } from '../../core/format';
import { formatNumberParam, isDefaultParams } from '../../core/params';
import { getCalibSettings, getExerciseParams, resetExerciseParams, setExerciseParam } from '../../core/storage';
import type { ExerciseDefinition, NumberParamDef, ParamUnit, ParamValue, SelectParamDef } from '../../core/types';
import { useApp } from '../app-context';
import { href } from '../router';
import { Icon } from './Icon';
import { Stepper } from './Stepper';

/**
 * Einstellungen einer Übung (nur bei Übungen mit `params`): einklappbarer Bereich auf der Intro-Seite.
 * Zahlen als Stepper (− Wert Einheit +) mit Schieberegler, Auswahlen als Auswahl-Chips (Radiogruppe, ✓ an der gewählten),
 * unter jeder Einstellung die Kurz-Erklärung. Alles wird sofort lokal gespeichert; „Standard wiederherstellen“ setzt zurück.
 */
export function ExerciseParams({ def, onChange }: { def: ExerciseDefinition; onChange?: () => void }) {
  const { ui, lang } = useApp();
  const defs = def.params;
  const [values, setValues] = useState<Record<string, ParamValue>>(() => getExerciseParams(def.id, defs));
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  useEffect(() => {
    setValues(getExerciseParams(def.id, defs));
    setMsg('');
  }, [def.id]);
  if (!defs?.length) return null;
  const tx = def.texts[lang].params ?? {};
  const fmt = createFormatter(lang);
  const custom = !isDefaultParams(defs, values);
  const unitLabel = (u?: ParamUnit): string => (u ? ui.params.units[u] : '');

  const change = (key: string, v: ParamValue) => {
    setValues(setExerciseParam(def.id, defs, key, v));
    setMsg('');
    onChange?.();
  };
  const reset = () => {
    setValues(resetExerciseParams(def.id, defs));
    setMsg(ui.params.resetDone);
    onChange?.();
  };

  return (
    <details class="params" open={open} onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}>
      <summary>
        <span class="params-title">
          <Icon name="sliders" size={18} /> {ui.params.title}
        </span>
        <span class={`chip chip-sm ${custom ? 'chip-warn' : 'chip-new'}`}>{custom ? `✎ ${ui.params.custom}` : ui.params.standard}</span>
      </summary>
      <div class="params-body">
        {defs.map((d) => {
          const t = tx[d.key];
          const label = t?.label ?? d.key;
          const id = `param-${def.id}-${d.key}`;
          return (
            <section class="param" key={d.key} aria-labelledby={id}>
              <h3 class="param-label" id={id}>
                {label}
              </h3>
              {d.type === 'number' ? (
                <NumberRow def={d} value={Number(values[d.key])} label={label} unit={unitLabel(d.unit)} fmtNum={(v) => formatNumberParam(d, v, fmt)} onChange={(v) => change(d.key, v)} less={ui.params.lessOf(label)} more={ui.params.moreOf(label)} />
              ) : (
                <SelectRow def={d} value={String(values[d.key])} label={label} names={t?.options} onChange={(v) => change(d.key, v)} />
              )}
              {t?.hint ? <p class="param-hint">{t.hint}</p> : null}
            </section>
          );
        })}
        <div class="params-actions">
          <button type="button" class="btn btn-ghost" onClick={reset} disabled={!custom}>
            <Icon name="refresh" size={18} /> {ui.params.reset}
          </button>
          {def.usesCalibration ? (
            <a class="btn btn-ghost" href={href('/kalibrieren')}>
              <Icon name="eye" size={18} /> {ui.params.calibrateLink}
            </a>
          ) : null}
          {msg ? (
            <span class="footer-msg" role="status">
              {msg}
            </span>
          ) : null}
        </div>
        {custom ? <p class="param-hint">{ui.params.differs}</p> : null}
      </div>
    </details>
  );
}

function NumberRow({
  def,
  value,
  label,
  unit,
  fmtNum,
  onChange,
  less,
  more,
}: {
  def: NumberParamDef;
  value: number;
  label: string;
  unit: string;
  fmtNum: (v: number) => string;
  onChange: (v: number) => void;
  less: string;
  more: string;
}) {
  return <Stepper value={value} min={def.min} max={def.max} step={def.step} format={fmtNum} unit={unit} label={label} lessLabel={less} moreLabel={more} onChange={onChange} />;
}

function SelectRow({ def, value, label, names, onChange }: { def: SelectParamDef; value: string; label: string; names?: Record<string, string>; onChange: (v: string) => void }) {
  return (
    <div class="option-choices param-choices" role="radiogroup" aria-label={label}>
      {def.options.map((o) => (
        <button key={o} type="button" role="radio" aria-checked={value === o} class={`option-choice${value === o ? ' is-on' : ''}`} onClick={() => onChange(o)}>
          {value === o ? '✓ ' : ''}
          {names?.[o] ?? o}
        </button>
      ))}
    </div>
  );
}

/**
 * Hinweis auf der Intro-Seite: „Größen in cm – Bildschirm kalibrieren“ (solange nicht kalibriert) und – nur wenn
 * tatsächlich begrenzt – „… auf diesem Bildschirm auf … cm begrenzt“. Ohne Kalibrierung laufen alle Übungen weiter.
 */
export function CalibNotice({ def }: { def: ExerciseDefinition; /** wird bei geänderten Einstellungen erhöht (zum Neuzeichnen) */ version?: number }) {
  const { ui, lang } = useApp();
  const [size, setSize] = useState(() => viewport());
  useEffect(() => {
    const on = () => setSize(viewport());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  if (!def.usesCalibration) return null;
  const fmt = createFormatter(lang);
  const settings = getCalibSettings();
  const calib = makeCalib(settings, size);
  const values = getExerciseParams(def.id, def.params);
  const tx = def.texts[lang].params ?? {};
  const limited = (def.params ?? [])
    .filter((d): d is NumberParamDef => d.type === 'number' && d.unit === 'cm' && calib.isLimited(Number(values[d.key])))
    .map((d) => ui.calibNotice.limited(tx[d.key]?.label ?? d.key, fmt.num(Math.floor(calib.maxCm() * 10) / 10, 1)));
  if (calib.calibrated && !limited.length) return null;
  return (
    <div class="notice notice-calib" role="note">
      <Icon name="info" size={18} />
      <div>
        {!calib.calibrated ? (
          <p>
            <strong>{ui.calibNotice.text}</strong> – {ui.calibNotice.detail}{' '}
            <a href={href('/kalibrieren')}>{ui.calibNotice.link}</a>
          </p>
        ) : null}
        {limited.map((l) => (
          <p key={l}>{l}</p>
        ))}
      </div>
    </div>
  );
}

/** Ungefähre Bühne der Übung: Fenster ohne die Kopfleiste (~56 px) */
function viewport(): { w: number; h: number } {
  return { w: window.innerWidth, h: Math.max(100, window.innerHeight - 56) };
}
