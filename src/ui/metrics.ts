import type { Formatter, MetricUnit } from '../core/types';
import type { UiStrings } from '../i18n/ui';

export interface MetricParts {
  value: string;
  unit: string;
  /** Vorangestelltes Label, z. B. "Stufe" */
  prefix?: string;
}

export function metricParts(value: number, unit: MetricUnit, fmt: Formatter, ui: UiStrings): MetricParts {
  switch (unit) {
    case 'time':
      return { value: fmt.num(value / 1000, 2), unit: ui.units.s };
    case 'ms':
      return { value: fmt.num(Math.round(value)), unit: ui.units.ms };
    case 'msSigned': {
      const r = Math.round(value);
      const sign = r > 0 ? '+' : r < 0 ? '\u2212' : '±';
      return { value: `${sign}${fmt.num(Math.abs(r))}`, unit: ui.units.ms };
    }
    case 'percent':
      return { value: fmt.num(Math.round(value)), unit: '%' };
    case 'points':
      return { value: fmt.num(Math.round(value)), unit: ui.units.points };
    case 'level':
      return { value: fmt.num(Math.floor(value + 1e-9)), unit: '', prefix: ui.units.level };
    case 'pd':
      return { value: fmt.num(value, 1), unit: 'Δ' };
    case 'arcsec':
      return { value: fmt.num(Math.round(value)), unit: '″' };
    case 'count':
    default:
      return { value: fmt.num(Math.round(value)), unit: '' };
  }
}

export function metricText(value: number, unit: MetricUnit, fmt: Formatter, ui: UiStrings): string {
  const p = metricParts(value, unit, fmt, ui);
  return [p.prefix, p.value, p.unit].filter(Boolean).join(' ').replace(/ %$/, ' %');
}
