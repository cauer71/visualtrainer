/**
 * Hintergrundtexte zu den Übungen (Seite "Hintergrund & Studien").
 * Quellen wurden recherchiert und per Link geprüft – siehe docs/wissenschaft/.
 */
import type { Lang } from '../i18n/lang';

export type EvidenceLevel = 'strong' | 'medium' | 'weak';

export interface ScienceText {
  /** Was wird trainiert (1 Satz) */
  trains: string;
  /** Wofür im Alltag */
  daily: string;
  /** Was die Forschung sagt (2–4 Sätze, ehrlich) */
  research: string;
  /** Was gegenüber einfachen Browser-Spielen verbessert wurde */
  improved: string;
}

export interface ScienceSource {
  label: string;
  url: string;
}

export interface ScienceEntry {
  id: string;
  evidence: EvidenceLevel;
  texts: Record<Lang, ScienceText>;
  sources: ScienceSource[];
}

export const SCIENCE: Record<string, ScienceEntry> = {};
