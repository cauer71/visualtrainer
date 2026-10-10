import { useEffect, useMemo, useState } from 'preact/hooks';
import { brand } from '../config/brand';
import { feedbackStore, type StoreSnapshot } from '../feedback/store';
import type { Improvement } from '../feedback/logic';
import {
  isNewlyImproved,
  latestByExercise,
  latestStarsByExercise,
  notificationCount,
  parseRatedFilter,
  unsent,
  type OwnRating,
  type OwnRemote,
  type RatedFilter,
} from '../feedback/own';
import { useApp } from './app-context';

export interface FeedbackView {
  /** nur Trainer/Entwickler sehen Abzeichen und Seiten */
  enabled: boolean;
  own: OwnRating[];
  remote: Map<number, OwnRemote>;
  /** neueste eigene Sterne je Übung */
  stars: Map<string, number>;
  /** Übungen, die ich (auf diesem Gerät) bewertet habe */
  rated: Set<string>;
  improvedBy: Map<string, Improvement>;
  improved: Set<string>;
  /** „Neu verbessert“ (neuer als meine letzte Bewertung oder neuer als der letzte Besuch) */
  isNew(exercise: string): boolean;
  /** Anzahl ungesehener Antworten und Verbesserungen (Hinweispunkt am Menü) */
  count: number;
  unsentCount: number;
}

/**
 * Eigene Bewertungen, Antworten und „verbessert“-Meldungen für die Oberfläche (leer, solange die Rolle kein Trainer ist).
 * `freezeSeen`: „Neu verbessert“ bleibt auf dieser Seite sichtbar, auch wenn die Meldung inzwischen als gesehen gilt.
 */
export function useFeedbackView(freezeSeen = false): FeedbackView {
  const { isOptician } = useApp();
  const [snap, setSnap] = useState<StoreSnapshot>(() => feedbackStore.getSnapshot());
  const [frozen] = useState(() => feedbackStore.getSnapshot().seen);
  useEffect(() => {
    setSnap(feedbackStore.getSnapshot());
    return feedbackStore.subscribe(() => setSnap(feedbackStore.getSnapshot()));
  }, []);
  return useMemo<FeedbackView>(() => {
    if (!isOptician) {
      return { enabled: false, own: [], remote: new Map(), stars: new Map(), rated: new Set(), improvedBy: new Map(), improved: new Set(), isNew: () => false, count: 0, unsentCount: 0 };
    }
    const latest = latestByExercise(snap.own);
    const improvedBy = new Map(snap.improvements.map((i) => [i.exercise, i]));
    const seen = freezeSeen ? frozen : snap.seen;
    return {
      enabled: true,
      own: snap.own,
      remote: snap.remote,
      stars: latestStarsByExercise(snap.own),
      rated: new Set(latest.keys()),
      improvedBy,
      improved: new Set(improvedBy.keys()),
      isNew: (ex) => {
        const imp = improvedBy.get(ex);
        return !!imp && isNewlyImproved(imp, latest.get(ex), seen);
      },
      count: notificationCount(snap.remote, snap.own, snap.improvements, snap.seen),
      unsentCount: unsent(snap.own).length,
    };
  }, [snap, isOptician, freezeSeen, frozen]);
}

/** Filter „Alle · Von mir bewertet · Noch nicht bewertet · Verbessert“ (Trainer-Ansicht), die Wahl bleibt in sessionStorage */
const KEY = `${brand.storageKey}:ratedfilter`;
function session(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}
export function useRatedFilter(): [RatedFilter, (f: RatedFilter) => void] {
  const [f, setF] = useState<RatedFilter>(() => {
    try {
      return parseRatedFilter(session()?.getItem(KEY));
    } catch {
      return 'all';
    }
  });
  return [
    f,
    (next) => {
      setF(next);
      try {
        session()?.setItem(KEY, next);
      } catch {
        /* gesperrt: nur für diese Ansicht */
      }
    },
  ];
}
