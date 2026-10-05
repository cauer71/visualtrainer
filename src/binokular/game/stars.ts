/**
 * Sterne (höchstens 3) aus Abschluss, benötigter Zeit und Fehlversuchen:
 *  ★   Level abgeschlossen
 *  ★★  + aktive Spielzeit höchstens Richtzeit (60 s × Levelkomplexität × Faktor des Schwierigkeitsgrads)
 *  ★★★ + höchstens `maxFailuresForStar` Fehlversuche (Gefahr berührt)
 * Ohne Abschluss: 0 Sterne.
 */
export interface StarInput {
  completed: boolean;
  activeMs: number;
  failures: number;
}

export interface StarRules {
  parTimeS: number;
  maxFailures: number;
}

export function calcStars(r: StarInput, rules: StarRules): 0 | 1 | 2 | 3 {
  if (!r.completed) return 0;
  let s = 1;
  if (r.activeMs <= rules.parTimeS * 1000) s++;
  if (r.failures <= rules.maxFailures) s++;
  return s as 1 | 2 | 3;
}

/** Richtzeit für den Zeitstern in Sekunden */
export function parTimeS(complexity: number, difficultyFactor = 1): number {
  return Math.round(60 * Math.max(1, complexity) * difficultyFactor);
}
