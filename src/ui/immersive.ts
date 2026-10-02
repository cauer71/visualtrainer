/**
 * Bildschirm-wach-halten während einer Übung (kein Browser-Vollbild, siehe enterImmersive).
 * Alles "best effort": wo der Browser es nicht kann (z. B. iPhone), passiert einfach nichts.
 */
import { getSettings, updateSettings } from '../core/storage';

type FsDoc = Document & { webkitFullscreenElement?: Element; webkitExitFullscreen?: () => void };

let wakeLock: { release(): Promise<void> } | null = null;
let enteredFullscreen = false;

export function enterImmersive(): void {
  // Kein requestFullscreen: Browser blenden dabei jedes Mal den Hinweis „Zum Beenden Esc drücken“ ein,
  // der das Spiel stört und sich von der Seite nicht dauerhaft abstellen lässt. Die Übung füllt ohnehin
  // das ganze Fenster (position: fixed); als installierte App (Zum Startbildschirm) gibt es keine Leisten.
  void requestWakeLock();
  document.addEventListener('visibilitychange', onVisibility);
}

export function exitImmersive(): void {
  const doc = document as FsDoc;
  document.removeEventListener('visibilitychange', onVisibility);
  try {
    if (enteredFullscreen && (doc.fullscreenElement || doc.webkitFullscreenElement)) {
      if (doc.exitFullscreen) void doc.exitFullscreen().catch(() => {});
      else doc.webkitExitFullscreen?.();
    }
  } catch {
    /* ignorieren */
  }
  enteredFullscreen = false;
  void wakeLock?.release().catch(() => {});
  wakeLock = null;
}

async function requestWakeLock(): Promise<void> {
  try {
    const nav = navigator as Navigator & { wakeLock?: { request(type: 'screen'): Promise<{ release(): Promise<void> }> } };
    if (nav.wakeLock && !wakeLock) wakeLock = await nav.wakeLock.request('screen');
  } catch {
    wakeLock = null;
  }
}

function onVisibility(): void {
  if (document.visibilityState === 'visible') {
    wakeLock = null;
    void requestWakeLock();
  }
}


// ---------------------------------------------------------------------------
// Vollbild der ganzen App – nur auf Wunsch (Knopf in der Kopfzeile)
//
// Der Browser zeigt beim Wechsel in den Vollbildmodus jedes Mal „Zum Beenden Esc drücken“. Die App ist
// eine einzige Seite: einmal aktiviert, bleibt der Vollbildmodus über alle Übungen bestehen, die Meldung
// erscheint also höchstens einmal je Besuch. Wer Vollbild nie wählt, sieht sie nie.

const fsDoc = document as FsDoc & { fullscreenEnabled?: boolean };

export const fullscreenSupported = (): boolean => !!(fsDoc.fullscreenEnabled && document.documentElement.requestFullscreen);
export const isFullscreen = (): boolean => !!(fsDoc.fullscreenElement || fsDoc.webkitFullscreenElement);

function enterFullscreen(): void {
  try {
    void document.documentElement.requestFullscreen({ navigationUI: 'hide' }).catch(() => {});
  } catch {
    /* nicht unterstützt */
  }
}

/** Knopf: Vollbild ein/aus. Merkt die Wahl. */
export function toggleFullscreen(): void {
  if (isFullscreen()) {
    updateSettings({ fullscreen: false });
    void fsDoc.exitFullscreen?.().catch(() => {});
  } else {
    updateSettings({ fullscreen: true });
    enterFullscreen();
  }
}

let started = false;
/** Einmal beim Start: gewünschten Vollbildmodus beim ersten Antippen wieder aufnehmen; Verlassen (Esc) schaltet den Wunsch aus. */
export function initFullscreenPreference(): void {
  if (started || !fullscreenSupported()) return;
  started = true;
  document.addEventListener('fullscreenchange', () => {
    if (!isFullscreen() && getSettings().fullscreen) updateSettings({ fullscreen: false });
  });
  if (getSettings().fullscreen && !isFullscreen()) {
    const once = () => {
      document.removeEventListener('pointerdown', once, true);
      if (getSettings().fullscreen && !isFullscreen()) enterFullscreen();
    };
    document.addEventListener('pointerdown', once, true);
  }
}
