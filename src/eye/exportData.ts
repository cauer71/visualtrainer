// EYE-EXPERIMENT: Messwerte als JSON zusammenstellen („Messwerte kopieren“) – rein. Es wird nichts gesendet.

/** Rundet alle Zahlen in einem verschachtelten Objekt auf `digits` Nachkommastellen; NaN/Infinity werden zu null. */
export function roundDeep<T>(v: T, digits = 2): T {
  const f = 10 ** digits;
  const walk = (x: unknown): unknown => {
    if (typeof x === 'number') return Number.isFinite(x) ? Math.round(x * f) / f : null;
    if (Array.isArray(x)) return x.map(walk);
    if (x && typeof x === 'object') return Object.fromEntries(Object.entries(x as Record<string, unknown>).map(([k, val]) => [k, walk(val)]));
    return x;
  };
  return walk(v) as T;
}

export interface ExportParts {
  generatedAt: string;
  device: Record<string, unknown>;
  camera: Record<string, unknown>;
  assumptions: Record<string, unknown>;
  timing: Record<string, unknown>;
  calibration: unknown;
  accuracy: unknown;
  jitter: unknown;
  quarterTest: unknown;
  switchTest: unknown;
}

export const EXPORT_SCHEMA = 'blickfit-eye-labor/1';

export function buildExport(parts: ExportParts): Record<string, unknown> {
  return roundDeep({
    schema: EXPORT_SCHEMA,
    hinweis: 'Messwerte der Testumgebung (Experiment). Grobe Schätzung der Blickrichtung über die Frontkamera – keine Messung der Augenbewegung, keine Diagnose, keine Normwerte.',
    ...parts,
  });
}
