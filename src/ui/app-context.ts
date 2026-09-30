import { createContext } from 'preact';
import { useContext } from 'preact/hooks';
import type { Lang } from '../i18n/lang';
import type { OptStrings } from '../i18n/optiker';
import type { UiStrings } from '../i18n/ui';
import type { Role } from '../core/storage';

export interface AppState {
  lang: Lang;
  ui: UiStrings;
  /** Texte für Rollenwahl, Optiker-Bereich, Katalog */
  opt: OptStrings;
  setLang(l: Lang): void;
  /** Aktuelle Ansicht (null = noch nicht gewählt) */
  role: Role | null;
  setRole(r: Role): void;
  /** Wahl der Rolle erneut anzeigen */
  askRole(): void;
  isOptician: boolean;
  /** Übungen, die Kunden sehen (Kennungen) */
  customerIds: string[];
  setCustomerIds(ids: string[]): void;
  sound: boolean;
  setSound(on: boolean): void;
  /** Wird erhöht, wenn sich gespeicherte Daten ändern (für Neuzeichnen) */
  dataVersion: number;
  bumpData(): void;
}

export const AppCtx = createContext<AppState | null>(null);

export function useApp(): AppState {
  const v = useContext(AppCtx);
  if (!v) throw new Error('AppCtx fehlt');
  return v;
}
