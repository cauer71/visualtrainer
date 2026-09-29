/**
 * Vollbild + Bildschirm-wach-halten während einer Übung.
 * Alles "best effort": wo der Browser es nicht kann (z. B. iPhone), passiert einfach nichts.
 */
type FsDoc = Document & { webkitFullscreenElement?: Element; webkitExitFullscreen?: () => void };
type FsEl = HTMLElement & { webkitRequestFullscreen?: () => void };

let wakeLock: { release(): Promise<void> } | null = null;
let enteredFullscreen = false;

export function enterImmersive(): void {
  const doc = document as FsDoc;
  const el = document.documentElement as FsEl;
  try {
    if (!doc.fullscreenElement && !doc.webkitFullscreenElement) {
      if (el.requestFullscreen) {
        el.requestFullscreen({ navigationUI: 'hide' }).then(
          () => (enteredFullscreen = true),
          () => {},
        );
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
        enteredFullscreen = true;
      }
    }
  } catch {
    /* nicht unterstützt */
  }
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
