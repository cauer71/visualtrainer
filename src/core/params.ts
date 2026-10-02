/**
 * Einstellungen je Übung (`ExerciseDefinition.params`): Standardwerte, Bereinigung, Vergleichsschlüssel, Kurzfassung.
 *
 * Reine Funktionen ohne Oberfläche und ohne Speicher (der Speicher steht in storage.ts).
 */
import type { ExerciseContext, ExerciseParams, Formatter, NumberParamDef, ParamDef, ParamTexts, ParamUnit, ParamValue } from './types';

/** Standardwerte aller Einstellungen */
export function defaultParams(defs: readonly ParamDef[] | undefined): Record<string, ParamValue> {
  const out: Record<string, ParamValue> = {};
  for (const d of defs ?? []) out[d.key] = d.default;
  return out;
}

/** Anzahl der Nachkommastellen einer Schrittweite (0,5 → 1; 0,05 → 2; 5 → 0) */
export function decimalsOf(x: number): number {
  if (!Number.isFinite(x)) return 0;
  const s = String(x);
  if (s.includes('e-')) {
    const [mant, exp] = s.split('e-');
    return Number(exp) + (mant.split('.')[1]?.length ?? 0);
  }
  return s.split('.')[1]?.length ?? 0;
}

/** Zahl auf das Raster min + k · step runden und in [min, max] halten (ohne Gleitkomma-Reste) */
export function snapNumber(def: Pick<NumberParamDef, 'min' | 'max' | 'step'>, value: number): number {
  const { min, max, step } = def;
  const dec = Math.max(decimalsOf(step), decimalsOf(min));
  const clamped = Math.min(max, Math.max(min, value));
  if (!(step > 0)) return Number(clamped.toFixed(dec));
  let k = Math.round((clamped - min) / step);
  let v = min + k * step;
  // liegt der Maximalwert nicht auf dem Raster: eine Stufe zurück statt über das Maximum
  while (v > max + 1e-9 && k > 0) {
    k--;
    v = min + k * step;
  }
  return Number(Math.min(max, Math.max(min, v)).toFixed(dec));
}

/**
 * Eingabewerte (z. B. aus dem Speicher) zu gültigen Einstellungen machen: Zahlen auf min/max/step gerundet und
 * geklemmt, Auswahlen nur erlaubte Werte, sonst der Standard; unbekannte Schlüssel entfallen.
 */
export function sanitizeParams(defs: readonly ParamDef[] | undefined, values: Readonly<Record<string, unknown>> | null | undefined): Record<string, ParamValue> {
  const out: Record<string, ParamValue> = {};
  for (const d of defs ?? []) {
    const raw = values ? values[d.key] : undefined;
    if (d.type === 'number') {
      const n = typeof raw === 'number' ? raw : typeof raw === 'string' && raw.trim() !== '' ? Number(raw) : Number.NaN;
      out[d.key] = Number.isFinite(n) ? snapNumber(d, n) : snapNumber(d, d.default);
    } else {
      const s = raw === undefined || raw === null ? '' : String(raw);
      out[d.key] = d.options.includes(s) ? s : d.default;
    }
  }
  return out;
}

/** Einstellungen des Kontexts; fehlen sie (ältere Test-Attrappen), gelten die Standardwerte */
export function paramsOf(ctx: Pick<ExerciseContext, 'params'>, defs: readonly ParamDef[]): ExerciseParams {
  return ctx.params ?? defaultParams(defs);
}

/** Zahl-Einstellung lesen (immer eine Zahl; sonst Standard) */
export function numParam(p: ExerciseParams, def: NumberParamDef): number {
  const v = p[def.key];
  return typeof v === 'number' && Number.isFinite(v) ? v : def.default;
}

/** `true`, wenn alle Einstellungen dem Standard entsprechen (Eingabe wird erst bereinigt) */
export function isDefaultParams(defs: readonly ParamDef[] | undefined, values: Readonly<Record<string, unknown>> | null | undefined): boolean {
  const v = sanitizeParams(defs, values);
  return (defs ?? []).every((d) => v[d.key] === d.default);
}

/**
 * Variantenschlüssel: stabile Zeichenkette der Werte, die sich auf die Vergleichbarkeit auswirken (alle Einstellungen
 * außer `neutral`), nach Schlüsseln sortiert, z. B. `diameterCm=5|durationS=60|…`. Leer bei Übungen ohne
 * (vergleichsrelevante) Einstellungen – dann gilt alles wie bisher als eine Variante.
 */
export function variantKey(defs: readonly ParamDef[] | undefined, values: Readonly<Record<string, unknown>> | null | undefined): string {
  if (!defs?.length) return '';
  const v = sanitizeParams(defs, values);
  return defs
    .filter((d) => !d.neutral)
    .map((d) => d.key)
    .sort()
    .map((k) => `${k}=${v[k]}`)
    .join('|');
}

/** Beschriftung einer Einheit (aus den Oberflächentexten), z. B. `s` → „s“ */
export type UnitLabel = (u: ParamUnit) => string;

/**
 * Wert einer Zahl-Einstellung mit Nachkommastellen nach Schrittweite (Sprachformat), z. B. „5,0“ bei Schritt 0,5.
 * `compact`: ganze Zahlen ohne Nachkommastellen („5“), für die Kurzfassung.
 */
export function formatNumberParam(def: NumberParamDef, value: number, fmt: Pick<Formatter, 'num'>, compact = false): string {
  const dec = Math.max(decimalsOf(def.step), decimalsOf(def.min));
  return fmt.num(value, compact && Number.isInteger(value) ? 0 : dec);
}

/** Wert mit Einheit, z. B. „1,5 s“; Zahlen ohne Einheit (`count`) ohne Zusatz, Auswahlen mit dem Namen des Werts */
export function formatParamValue(def: ParamDef, value: ParamValue, tx: ParamTexts | undefined, fmt: Pick<Formatter, 'num'>, unit: UnitLabel, compact = false): string {
  if (def.type === 'select') return tx?.options?.[String(value)] ?? String(value);
  const n = formatNumberParam(def, Number(value), fmt, compact);
  const label = def.unit && def.unit !== 'count' ? unit(def.unit) : '';
  return label ? `${n} ${label}` : n;
}

/**
 * Kurzfassung für die Ergebnisseite: die mit `summary: true` markierten Einstellungen und alle, die vom Standard
 * abweichen (außer `neutral`), z. B. „5 cm · 1,5 s · 1 Punkt“. Zahlen mit Einheit oder mit `ParamTexts.short` als
 * Vorlage (`{v}` = Wert), Auswahlen als „Bereich: Nur Rand“.
 */
export function summarizeParams(
  defs: readonly ParamDef[] | undefined,
  texts: Record<string, ParamTexts> | undefined,
  values: Readonly<Record<string, unknown>> | null | undefined,
  fmt: Pick<Formatter, 'num'>,
  unit: UnitLabel,
): string[] {
  const v = sanitizeParams(defs, values);
  const out: string[] = [];
  for (const d of defs ?? []) {
    if (d.neutral) continue;
    if (!d.summary && v[d.key] === d.default) continue;
    const tx = texts?.[d.key];
    const plain = formatParamValue(d, v[d.key], tx, fmt, unit, true);
    if (d.type === 'select') {
      out.push(`${tx?.label ?? d.key}: ${plain}`);
    } else if (tx?.short) {
      // „{v} Punkt|{v} Punkte“: erste Form bei genau 1, zweite sonst
      const forms = tx.short.split('|');
      const form = forms.length > 1 && Number(v[d.key]) !== 1 ? forms[1] : forms[0];
      out.push(form.replace('{v}', formatNumberParam(d, Number(v[d.key]), fmt, true)));
    } else out.push(plain);
  }
  return out;
}
