import { createContext } from 'preact';
import { useContext } from 'preact/hooks';
import type { Lang } from '../i18n/lang';
import type { UiStrings } from '../i18n/ui';

export interface AppState {
  lang: Lang;
  ui: UiStrings;
  setLang(l: Lang): void;
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
