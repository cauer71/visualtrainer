/**
 * Gemeinsame Bausteine der Funktionsübungen (Hess-Schirm, Worth-Vier-Punkte, Schober, Diplopie-Karte, Subjektive
 * Vertikale, Orts-Projektion): Anordnung (Hinweiszeile oben, Feld, Tastenreihe unten), neutrale Tasten ≥ 56 px,
 * umbrochener Hinweistext. Alles wird live aus der Bühne berechnet (Tablet drehen).
 *
 * Tasten und Beschriftung sind neutral hellgrau (beide Augen sehen sie) und hängen nie nur an der Farbe.
 */
import { C, fillRR, font, rrPath, text, type Rect } from '../../core/draw';
import { clamp } from '../../core/stats';
import type { StageInfo } from '../../core/types';
import { captionTop, handSize } from './tippziele';

type G = CanvasRenderingContext2D;

/** Mindestgröße der Tasten im Spiel (px); im kleinen Intro-Film dürfen sie schrumpfen */
export const MIN_BTN_PX = 56;
export const MIN_BTN_PX_DEMO = 34;
/** Hell- und Dunkelton der neutralen Bedienelemente */
export const UI_LINE = 'rgba(255,255,255,0.30)';
export const UI_FILL = 'rgba(255,255,255,0.12)';
export const UI_FILL_ON = 'rgba(255,255,255,0.26)';

export interface PruefLayout {
  /** Rand links/rechts */
  margin: number;
  /** Schriftgröße des Hinweises */
  hintSize: number;
  /** Oberkante des Hinweises (unter der Anzeige oben) */
  hintTop: number;
  /** Höhe des Hinweisbereichs */
  hintH: number;
  /** Zeilen des Hinweises (auf schmalen Bühnen drei) */
  hintLines: number;
  /** Feld (zwischen Hinweis und Tasten) */
  field: Rect;
  /** Tastenzeilen von oben nach unten (leer, wenn `rows` = 0) */
  rows: Rect[];
  btnH: number;
  gap: number;
}

/**
 * Anordnung: oben Platz für die Anzeige des Runners, darunter ein Hinweis (bis zu zwei Zeilen), dann das Feld, unten
 * `rows` Tastenzeilen (je ≥ 56 px hoch). Im Intro-Film ist unten Platz für Hand und Bildunterschrift reserviert.
 */
export function pruefLayout(s: StageInfo, demo: boolean, rows: number): PruefLayout {
  const margin = Math.max(10, s.u * 2);
  const top = Math.max(44, s.u * 8);
  const bottom = demo ? captionTop(s) - handSize(s) - 6 : s.h - margin;
  const minBtn = demo ? MIN_BTN_PX_DEMO : MIN_BTN_PX;
  const btnH = clamp(s.u * 9, minBtn, 72);
  const gap = Math.max(demo ? 4 : 8, s.u * 1.6);
  const hintSize = clamp(s.u * 3.4, demo ? 11 : 13, 22);
  const hintLines = s.w < 600 && !demo ? 3 : 2;
  const hintH = hintSize * (hintLines * 1.25 + 0.1);
  const rowRects: Rect[] = [];
  const total = rows * btnH + Math.max(0, rows - 1) * gap;
  for (let i = 0; i < rows; i++) rowRects.push({ x: margin, y: bottom - total + i * (btnH + gap), w: Math.max(40, s.w - 2 * margin), h: btnH });
  const fieldTop = top + hintH;
  const fieldBottom = rows ? bottom - total - gap : bottom;
  return {
    margin,
    hintSize,
    hintTop: top,
    hintH,
    hintLines,
    field: { x: margin, y: fieldTop, w: Math.max(40, s.w - 2 * margin), h: Math.max(40, fieldBottom - fieldTop) },
    rows: rowRects,
    btnH,
    gap,
  };
}

/** Teilt eine Tastenzeile in `weights.length` Tasten mit Abstand `gap` (Breiten im Verhältnis der Gewichte) */
export function splitRow(row: Rect, weights: readonly number[], gap: number): Rect[] {
  const n = weights.length;
  const sum = weights.reduce((a, b) => a + b, 0);
  const room = row.w - gap * (n - 1);
  let x = row.x;
  return weights.map((wt) => {
    const w = (room * wt) / sum;
    const r = { x, y: row.y, w, h: row.h };
    x += w + gap;
    return r;
  });
}

/** Zeilenumbruch nach Wörtern für eine Breite `maxW` (Maß über `measureText`), höchstens `maxLines` Zeilen (Rest wird angehängt) */
export function wrapLines(g: G, str: string, maxW: number, maxLines = 2): string[] {
  const words = str.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (cur && g.measureText(next).width > maxW && lines.length < maxLines - 1) {
      lines.push(cur);
      cur = w;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
}

/** Hinweistext, mittig, höchstens zwei Zeilen; verkleinert bei Bedarf, damit er auf die Bühne passt */
export function drawHint(g: G, s: StageInfo, L: PruefLayout, msg: string, color: string = C.dim): void {
  g.save();
  let size = L.hintSize;
  g.font = font(size, 600);
  const maxW = s.w - 2 * L.margin;
  let lines = wrapLines(g, msg, maxW, L.hintLines);
  // passt eine Zeile immer noch nicht, Schrift verkleinern (nicht unter 10 px)
  for (let i = 0; i < 8 && lines.some((l) => g.measureText(l).width > maxW) && size > 10; i++) {
    size = Math.max(10, size * 0.92);
    g.font = font(size, 600);
    lines = wrapLines(g, msg, maxW, L.hintLines);
  }
  g.restore();
  lines.forEach((l, i) => text(g, l, s.w / 2, L.hintTop + size * 0.7 + i * size * 1.25, size, color, { weight: 600 }));
}

export interface BtnOpts {
  /** gedrückt/ausgewählt: kräftigere Füllung und ✓ vor der Beschriftung */
  on?: boolean;
  /** ausgegraut (nicht bedienbar) */
  disabled?: boolean;
  /** Hervorgehobene Haupttaste */
  primary?: boolean;
  /** Schriftgröße, sonst aus der Höhe */
  size?: number;
}

/** Neutrale Taste mit Beschriftung (verkleinert die Schrift, wenn der Text nicht passt) */
export function drawBtn(g: G, r: Rect, label: string, o: BtnOpts = {}): void {
  g.save();
  g.globalAlpha = o.disabled ? 0.35 : 1;
  const rad = Math.min(r.w, r.h) * 0.22;
  fillRR(g, r.x, r.y, r.w, r.h, rad, o.on ? UI_FILL_ON : o.primary ? 'rgba(255,255,255,0.20)' : UI_FILL);
  rrPath(g, r.x + 0.5, r.y + 0.5, r.w - 1, r.h - 1, rad);
  g.strokeStyle = o.primary ? 'rgba(255,255,255,0.55)' : UI_LINE;
  g.lineWidth = o.primary ? 2.5 : 1.5;
  g.stroke();
  const str = o.on ? `✓ ${label}` : label;
  let size = o.size ?? clamp(r.h * 0.34, 12, 24);
  g.font = font(size, 700);
  const room = r.w - 12;
  const width = g.measureText(str).width;
  if (width > room) size = Math.max(9, size * (room / width));
  g.restore();
  text(g, str, r.x + r.w / 2, r.y + r.h / 2 + 1, size, C.fg, { weight: 700, alpha: o.disabled ? 0.35 : 1 });
}
