/** Schlichte Linien-Icons (eigene Zeichnung, 24×24). */
const PATHS: Record<string, string> = {
  close: 'M6 6l12 12M18 6 6 18',
  expand: 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',
  shrink: 'M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5',
  pause: 'M9 5v14M15 5v14',
  play: 'M8 5.5v13l10.5-6.5z',
  soundOn: 'M4 10v4h4l5 4V6L8 10H4zM16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12',
  soundOff: 'M4 10v4h4l5 4V6L8 10H4zM17 9.5l5 5M22 9.5l-5 5',
  back: 'M15 5l-7 7 7 7',
  next: 'M9 5l7 7-7 7',
  arrowRight: 'M5 12h13M13 6l6 6-6 6',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  refresh: 'M4.5 12a7.5 7.5 0 0 1 13-5.1L20 9.5M20 4.5v5h-5M19.5 12a7.5 7.5 0 0 1-13 5.1L4 14.5M4 19.5v-5h5',
  flame: 'M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.4 1.3-3.8 2.5-5 .2 1.7 1 2.7 2 3 .3-3 .1-5.5.5-8z',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2h5c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3z',
  clock: 'M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z',
  trophy: 'M8 4h8v5a4 4 0 0 1-8 0V4zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20h7M10 17h4',
  info: 'M12 11v6M12 7.5v.5M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z',
  eye: 'M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  calendar: 'M4 7h16v13H4zM4 11h16M8 4v4M16 4v4',
  book: 'M12 6.5C10.3 5.2 7.9 4.5 4 4.5v13c3.9 0 6.3.7 8 2 1.7-1.3 4.1-2 8-2v-13c-3.9 0-6.3.7-8 2zM12 6.5v13',
  warn: 'M12 4 2.5 20h19L12 4zM12 10v4.5M12 17.2v.3',
  sparkle: 'M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z',
  trash: 'M4 7h16M9 7V4h6v3M6.5 7l1 13h9l1-13',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z',
};

export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 24, stroke = 2.2, class: cls }: { name: IconName; size?: number; stroke?: number; class?: string }) {
  const filled = name === 'play' || name === 'flame';
  return (
    <svg
      class={cls}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      stroke-width={stroke}
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

/** Übungs-/Kategorie-Symbol aus inneren SVG-Elementen (viewBox 48×48) */
export function ArtIcon({ svg, size = 32, class: cls }: { svg: string; size?: number; class?: string }) {
  return (
    <svg
      class={cls}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
      // eslint-disable-next-line react/no-danger -- statische, eigene SVG-Inhalte
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
