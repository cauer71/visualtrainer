/**
 * Spielfortschritt: aktuelles Level, freigeschaltete Level, beste Sterne je Level, Misserfolge in Folge
 * (für die adaptive Kontraststeuerung). Rein, ohne Speicherzugriff – getestet.
 *
 * Freischaltung: Level 1 ist immer offen; wer Level n abschließt (mindestens 1 Stern), schaltet Level n + 1 frei.
 * Im Therapeutenbereich lassen sich alle Level freischalten und ein Startlevel wählen (schaltet es mit frei).
 */
export interface Progress {
  /** Misserfolge in Folge (adaptive Kontraststeuerung) */
  consecutiveFailures: number;
  /** aktuelles Level (mit diesem beginnt das nächste Spiel) */
  level: number;
  /** höchstes freigeschaltetes Level */
  unlocked: number;
  /** beste Sterne je Level-ID */
  bestStars: Record<string, number>;
}

export function defaultProgress(): Progress {
  return { consecutiveFailures: 0, level: 1, unlocked: 1, bestStars: {} };
}

const clampLevel = (n: number, total: number) => Math.min(total, Math.max(1, Math.round(n)));

export function isUnlocked(p: Progress, n: number): boolean {
  return n >= 1 && n <= p.unlocked;
}

/** Level-ID zu Levelnummer (level01 → 1) */
export function levelNumberOfId(id: string): number | null {
  const m = /^level(\d+)$/.exec(id);
  return m ? Number(m[1]) : null;
}

/**
 * Ergebnis eines Levels übernehmen: beste Sterne, Freischaltung des nächsten Levels, nächstes aktuelles Level
 * (nach Abschluss das folgende, sonst dasselbe).
 */
export function afterLevel(p: Progress, r: { number: number; id: string; completed: boolean; stars: number; consecutiveFailures: number }, total: number): Progress {
  const next = r.completed ? clampLevel(r.number + 1, total) : clampLevel(r.number, total);
  return {
    consecutiveFailures: r.consecutiveFailures,
    level: next,
    unlocked: r.completed ? Math.max(p.unlocked, next) : p.unlocked,
    bestStars: { ...p.bestStars, [r.id]: Math.max(p.bestStars[r.id] ?? 0, Math.max(0, Math.min(3, r.stars))) },
  };
}

/** Therapeut: alle Level freischalten */
export function unlockAll(p: Progress, total: number): Progress {
  return { ...p, unlocked: total };
}

/** Therapeut bzw. Levelauswahl: Startlevel setzen (der Therapeut darf auch gesperrte wählen – sie werden frei) */
export function chooseLevel(p: Progress, n: number, total: number, force = false): Progress {
  const lv = clampLevel(n, total);
  if (!force && !isUnlocked(p, lv)) return p;
  return { ...p, level: lv, unlocked: Math.max(p.unlocked, lv) };
}

/**
 * Gespeicherten Fortschritt (auch aus älteren Versionen von `binokular:v1`) in das aktuelle Format bringen.
 * Ältere Daten (MVP mit nur einem Level) kennen `unlocked` nicht: Freigeschaltet ist dann bis zum gespeicherten
 * Level bzw. bis eins nach dem höchsten Level mit Sternen.
 */
export function normalizeProgress(x: unknown, total: number): Progress {
  const p = (x && typeof x === 'object' ? x : {}) as Record<string, unknown>;
  const bestStars: Record<string, number> = {};
  if (p.bestStars && typeof p.bestStars === 'object') {
    for (const [k, v] of Object.entries(p.bestStars as Record<string, unknown>)) if (typeof v === 'number' && Number.isFinite(v)) bestStars[k] = Math.max(0, Math.min(3, Math.round(v)));
  }
  const level = typeof p.level === 'number' && Number.isFinite(p.level) ? clampLevel(p.level, total) : 1;
  let unlocked: number;
  if (typeof p.unlocked === 'number' && Number.isFinite(p.unlocked)) unlocked = clampLevel(p.unlocked, total);
  else {
    const doneMax = Object.entries(bestStars).reduce((m, [id, s]) => (s > 0 ? Math.max(m, levelNumberOfId(id) ?? 0) : m), 0);
    unlocked = clampLevel(Math.max(1, level, doneMax + 1), total);
  }
  return {
    consecutiveFailures: typeof p.consecutiveFailures === 'number' && Number.isFinite(p.consecutiveFailures) ? Math.max(0, Math.round(p.consecutiveFailures)) : 0,
    level,
    unlocked: Math.max(unlocked, level, 1),
    bestStars,
  };
}
