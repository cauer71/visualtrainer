/**
 * Einfache SVG-Diagramme ohne Bibliothek für die Verlaufsansicht.
 * Eine Reihe je Diagramm (Titel benennt sie, keine Legende), neutrale Akzentfarbe (Lavendel, weder Rot noch Cyan,
 * damit nichts mit den Brillenfarben verwechselt wird), dünne Linien, Haarlinien-Raster, Tooltips über <title>.
 */
import type { ComponentChildren } from 'preact';

const W = 600;
const H = 220;
const PAD = { l: 44, r: 16, t: 24, b: 34 };

export interface Point {
  label: string;
  value: number | null;
  /** Text für den Tooltip */
  tip: string;
}

/** Zahl mit Dezimalkomma, höchstens eine Nachkommastelle */
const fmt = (v: number): string => v.toLocaleString('de-DE', { maximumFractionDigits: 1 });

function yTicks(max: number): number[] {
  const step = max <= 10 ? 2 : max <= 50 ? 10 : 25;
  const out: number[] = [];
  for (let v = 0; v <= max + 1e-9; v += step) out.push(v);
  return out;
}

function niceMax(values: number[], floor: number): number {
  const m = Math.max(floor, ...values);
  if (m <= 10) return Math.ceil(m / 2) * 2;
  if (m <= 50) return Math.ceil(m / 10) * 10;
  return Math.ceil(m / 25) * 25;
}

/** x-Beschriftungen ausdünnen (höchstens ~8) */
function showLabel(i: number, n: number): boolean {
  if (n <= 8) return true;
  const every = Math.ceil(n / 8);
  return i % every === 0 || i === n - 1;
}

function Frame({ max, children, labels, unit }: { max: number; children: ComponentChildren; labels: string[]; unit: string }) {
  const iw = W - PAD.l - PAD.r;
  const ih = H - PAD.t - PAD.b;
  const n = labels.length;
  return (
    <svg class="bm-chart" viewBox={`0 0 ${W} ${H}`} role="img" preserveAspectRatio="xMidYMid meet">
      {yTicks(max).map((v) => {
        const y = PAD.t + ih - (v / max) * ih;
        return (
          <g key={v}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y} y2={y} class={v === 0 ? 'bm-axis' : 'bm-grid'} />
            <text x={PAD.l - 6} y={y + 4} text-anchor="end" class="bm-tick">
              {v}
              {unit}
            </text>
          </g>
        );
      })}
      {labels.map((l, i) =>
        showLabel(i, n) ? (
          <text key={i} x={PAD.l + (n === 1 ? iw / 2 : (i + 0.5) * (iw / n))} y={H - 12} text-anchor="middle" class="bm-tick">
            {l}
          </text>
        ) : null,
      )}
      {children}
    </svg>
  );
}

export function LineChart({ points, max = 100, unit = '' }: { points: Point[]; max?: number; unit?: string }) {
  const iw = W - PAD.l - PAD.r;
  const ih = H - PAD.t - PAD.b;
  const n = points.length;
  const x = (i: number) => PAD.l + (n === 1 ? iw / 2 : (i + 0.5) * (iw / n));
  const y = (v: number) => PAD.t + ih - (Math.min(max, Math.max(0, v)) / max) * ih;
  // Linie mit Lücken bei fehlenden Werten
  const segs: string[] = [];
  let cur = '';
  points.forEach((p, i) => {
    if (p.value === null) {
      if (cur) segs.push(cur);
      cur = '';
      return;
    }
    cur += `${cur ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`;
  });
  if (cur) segs.push(cur);
  const lastIdx = points.map((p) => p.value !== null).lastIndexOf(true);
  return (
    <Frame max={max} labels={points.map((p) => p.label)} unit={unit}>
      {segs.map((d, i) => (
        <path key={i} d={d} class="bm-line" />
      ))}
      {points.map((p, i) =>
        p.value === null ? null : (
          <g key={i} class="bm-pt">
            <circle cx={x(i)} cy={y(p.value)} r={14} class="bm-hit">
              <title>{p.tip}</title>
            </circle>
            <circle cx={x(i)} cy={y(p.value)} r={4.5} class="bm-dot" />
          </g>
        ),
      )}
      {lastIdx >= 0 && (
        <text x={Math.min(W - PAD.r - 2, x(lastIdx) + 8)} y={y(points[lastIdx].value!) - 8} class="bm-vlabel" text-anchor={x(lastIdx) > W - 80 ? 'end' : 'start'}>
          {fmt(points[lastIdx].value!)}
          {unit}
        </text>
      )}
    </Frame>
  );
}

export function ColumnChart({ points, unit = '', floorMax = 10 }: { points: Point[]; unit?: string; floorMax?: number }) {
  const iw = W - PAD.l - PAD.r;
  const ih = H - PAD.t - PAD.b;
  const n = points.length;
  const max = niceMax(points.map((p) => p.value ?? 0), floorMax);
  const band = iw / Math.max(1, n);
  const bw = Math.min(24, band * 0.6);
  const lastIdx = points.map((p) => p.value !== null).lastIndexOf(true);
  return (
    <Frame max={max} labels={points.map((p) => p.label)} unit={unit}>
      {points.map((p, i) => {
        if (p.value === null) return null;
        const h = (Math.min(max, p.value) / max) * ih;
        const x0 = PAD.l + (i + 0.5) * band - bw / 2;
        const y0 = PAD.t + ih - h;
        const r = Math.min(4, h / 2, bw / 2);
        // oben abgerundet, unten eckig (auf der Grundlinie)
        const d = h <= 0 ? '' : `M${x0},${PAD.t + ih}V${y0 + r}Q${x0},${y0} ${x0 + r},${y0}H${x0 + bw - r}Q${x0 + bw},${y0} ${x0 + bw},${y0 + r}V${PAD.t + ih}Z`;
        return (
          <g key={i} class="bm-pt">
            <rect x={PAD.l + i * band} y={PAD.t} width={band} height={ih} class="bm-hit">
              <title>{p.tip}</title>
            </rect>
            {d && <path d={d} class="bm-bar" />}
            {i === lastIdx && (
              <text x={x0 + bw / 2} y={y0 - 6} text-anchor="middle" class="bm-vlabel">
                {fmt(p.value)}
                {unit}
              </text>
            )}
          </g>
        );
      })}
    </Frame>
  );
}
