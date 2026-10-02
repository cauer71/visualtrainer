// EYE-EXPERIMENT: Netzwächter. Die MediaPipe-Bibliothek sendet von sich aus eine Nutzungsstatistik an Google
// (https://odml.pa.googleapis.com/v1/log). Hier wird alles, was nicht von der eigenen Seite kommt, abgefangen, bevor es das
// Gerät verlässt (zusätzlich zur CSP `connect-src 'self'`, die dasselbe auf Browserebene verhindert).

/** Soll die Anfrage blockiert werden? Erlaubt sind nur gleiche Herkunft sowie blob:/data:. */
export function shouldBlock(url: string, origin: string): boolean {
  let u: URL;
  try {
    u = new URL(url, origin);
  } catch {
    return true;
  }
  if (u.protocol === 'blob:' || u.protocol === 'data:') return false;
  return u.origin !== origin;
}

let installed = false;

/** Umhüllt window.fetch einmalig: Fremd-Anfragen werden nicht gesendet, sondern mit 204 beantwortet. */
export function installNetworkGuard(): void {
  if (installed || typeof window === 'undefined' || typeof window.fetch !== 'function') return;
  installed = true;
  const original = window.fetch.bind(window);
  window.fetch = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    if (shouldBlock(url, window.location.origin)) return Promise.resolve(new Response(null, { status: 204, statusText: 'blockiert (EYE-EXPERIMENT Netzwächter)' }));
    return original(input, init);
  };
}
