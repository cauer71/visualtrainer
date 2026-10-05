/**
 * Therapeuten-PIN. Nur clientseitig und damit ein leichter Schutz gegen versehentliches Verstellen –
 * keine Sicherheit gegen Personen mit Zugriff auf das Gerät (README).
 */
export const DEFAULT_PIN = '726';

/** gültige PIN: 3–8 Ziffern */
export function isValidPin(pin: string): boolean {
  return /^\d{3,8}$/.test(pin);
}

export function checkPin(input: string, stored: string): boolean {
  const s = isValidPin(stored) ? stored : DEFAULT_PIN;
  return input.trim() === s;
}

/** Neue PIN übernehmen: nur wenn gültig und zweimal gleich eingegeben */
export function changePin(next: string, repeat: string): { ok: true; pin: string } | { ok: false; error: 'invalid' | 'mismatch' } {
  if (!isValidPin(next)) return { ok: false, error: 'invalid' };
  if (next !== repeat) return { ok: false, error: 'mismatch' };
  return { ok: true, pin: next };
}
