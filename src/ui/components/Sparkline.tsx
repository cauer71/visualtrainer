/** Mini-Verlauf der letzten Durchgänge. "Oben" ist immer besser. */
export function Sparkline({ values, better, width = 280, height = 72, color = 'var(--primary)' }: {
  values: number[];
  better: 'higher' | 'lower';
  width?: number;
  height?: number;
  color?: string;
}) {
  if (values.length < 2) return null;
  const vs = values.slice(-12);
  const lo = Math.min(...vs);
  const hi = Math.max(...vs);
  const span = hi - lo || Math.abs(hi) * 0.1 || 1;
  const pad = 8;
  const pts = vs.map((v, i) => {
    const x = pad + (i * (width - pad * 2)) / (vs.length - 1);
    const norm = (v - lo) / span;
    const up = better === 'higher' ? norm : 1 - norm;
    const y = height - pad - up * (height - pad * 2);
    return [x, y] as const;
  });
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const area = `${d} L${pts[pts.length - 1][0].toFixed(1)},${height - 2} L${pts[0][0].toFixed(1)},${height - 2} Z`;
  const last = pts[pts.length - 1];
  return (
    <svg class="sparkline" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <path d={area} fill={color} opacity="0.10" />
      <path d={d} fill="none" stroke={color} stroke-width="3" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === pts.length - 1 ? 5 : 3} fill={i === pts.length - 1 ? color : '#fff'} stroke={color} stroke-width="2" vector-effect="non-scaling-stroke" />
      ))}
      <circle cx={last[0]} cy={last[1]} r="9" fill={color} opacity="0.18" />
    </svg>
  );
}
