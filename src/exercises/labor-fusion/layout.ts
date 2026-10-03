/**
 * Fusion – Anordnung auf der Bühne (reine Rechnung, damit sie getestet werden kann), von oben nach unten: Hinweiszeile,
 * das Ziel (Kreise mit Mittelpunkt, je Auge in seiner Farbe) mit den beiden Kontrollstrichen darüber und darunter, die große
 * Taste „Doppelt“ / „Wieder einfach“ und darunter die beiden Tasten „Strich fehlt“. Alles wird bei jedem Bild aus den
 * Live-Maßen der Bühne berechnet (Tablet drehen).
 *
 * Die beiden Zielbilder wandern bei einem Versatz auseinander: je Bild um die Hälfte. Damit sie nie über den Rand ragen,
 * wird zuerst das Ziel verkleinert (bis auf gut ein Drittel), dann der größte darstellbare Versatz (`maxShiftPx`) begrenzt.
 */
import type { Rect } from '../../core/draw';
import { clamp } from '../../core/stats';

export interface FusionLayoutInput {
  /** Bühne in px; `u` = 1 % der kürzeren Seite */
  w: number;
  h: number;
  u: number;
  /** Platz unten im Intro-Film für Hand und Bildunterschrift (0 im Spielmodus) */
  captionReserve: number;
  demo: boolean;
  /** gewünschter Zieldurchmesser in px (nach Begrenzung auf die Bühne, `calib.sizePx`) */
  wantDiameterPx: number;
  /** gewünschter größter Versatz der beiden Bilder in px (für die Obergrenze in Δ) */
  needShiftPx: number;
}

export interface FusionLayout {
  /** Mitte des Ziels (ohne Versatz) und Radius des äußeren Rings */
  cx: number;
  cy: number;
  r: number;
  /** Größter Versatz der beiden Bilder (px), den die Bühne zulässt: höchstens `needShiftPx` */
  maxShiftPx: number;
  /** Kontrollstriche (senkrechte Balken, fest in der Mitte): Mittelpunkte y und Länge/Dicke */
  strokes: { x: number; yA: number; yB: number; len: number; thick: number };
  /** Hinweiszeile (Mitte y) und Schriftgröße */
  msgY: number;
  msgSize: number;
  /** Große Taste „Doppelt“ / „Wieder einfach“ */
  main: Rect;
  /** Tasten „Strich fehlt“: roter Strich oben (a), Strich der zweiten Farbe unten (b) */
  missA: Rect;
  missB: Rect;
}

/** Kleinste Taste im Spielmodus (px) – Buttons ≥ 56 px */
export const MIN_KEY_PX = 56;

/** Höhe des Zielblocks (mit Kontrollstrichen) in Vielfachen des Radius */
const BLOCK_R = 4.3;
/** Breite eines Zielbildes in Vielfachen des Radius (mit den kleinen Strichen am Rand) */
const IMAGE_R = 1.3;

export function fusionLayout(i: FusionLayoutInput): FusionLayout {
  const { w, h, u, demo } = i;
  // Im Film wird nichts wirklich angetippt: Mindestgrößen dürfen mit kleinen Bühnen schrumpfen
  const k = demo ? Math.min(1, u / 4.3) : 1;
  const margin = Math.max(6, u * 2);
  const side = w < 460 ? 6 : margin;
  const gap = clamp(u * 1.6, 6, 14) * (demo ? k : 1);
  const bottom = demo ? i.captionReserve : margin;
  const keyH = Math.max(MIN_KEY_PX * k, 44 * k);

  // Tasten unten: erst „Strich fehlt“ (zwei nebeneinander), darüber die große Taste
  const rowW = Math.min(w - 2 * side, 520);
  const rowX = (w - rowW) / 2;
  const missW = (rowW - gap) / 2;
  const missY = h - bottom - keyH;
  const missA: Rect = { x: rowX, y: missY, w: missW, h: keyH };
  const missB: Rect = { x: rowX + missW + gap, y: missY, w: missW, h: keyH };
  const mainH = Math.max(MIN_KEY_PX * k, 64 * k);
  const mainW = Math.min(rowW, 420);
  const main: Rect = { x: (w - mainW) / 2, y: missY - gap - mainH, w: mainW, h: mainH };

  // Hinweiszeile oben
  const top = demo ? Math.max(6, u * 2) : Math.max(44, u * 8);
  const msgSize = clamp(u * 3.4, 13, 22);
  const msgH = msgSize * 1.9;
  const msgY = top + msgH / 2;

  // Ziel: Mitte zwischen Hinweiszeile und großer Taste
  const regionTop = top + msgH + gap * 0.5;
  const regionBottom = main.y - gap;
  const regionH = Math.max(40, regionBottom - regionTop);
  const cy = regionTop + regionH / 2;
  const want = Math.max(14, i.wantDiameterPx / 2);
  const r1 = Math.max(10, Math.min(want, regionH / BLOCK_R));
  const need = Math.max(0, i.needShiftPx);
  const avail = (r: number): number => 2 * (w / 2 - side - IMAGE_R * r);
  let r = r1;
  if (need > avail(r1)) {
    const fit = (w / 2 - side - need / 2) / IMAGE_R;
    r = clamp(fit, Math.max(10, r1 * 0.35), r1);
  }
  const maxShiftPx = Math.max(0, Math.min(need, avail(r)));
  return {
    cx: w / 2,
    cy,
    r,
    maxShiftPx,
    strokes: {
      x: w / 2,
      yA: cy - r * 1.65,
      yB: cy + r * 1.65,
      len: r * 0.5,
      thick: clamp(r * 0.07, 3, 8),
    },
    msgY,
    msgSize,
    main,
    missA,
    missB,
  };
}
