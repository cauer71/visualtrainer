import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (docs/wissenschaft/01-…, 4.4): nur beschreiben, was man in der Übung tut –
// keine Wirkversprechen für Alltag, Verkehr oder Gesundheit.

export const de: ExerciseTexts = {
  title: 'Stopp & Los',
  tagline: 'Bei Grün los, bei Rot stopp – schnell sein und trotzdem bremsen.',
  steps: ['Grüner Kreis: sofort tippen – egal wo.', 'Rotes Stoppschild: Finger weg!', 'Es wird immer flotter – bleib wachsam.'],
  why:
    'Bei Grün tippst du blitzschnell, bei Rot hältst du still. Weil fast immer Grün kommt, wird das Tippen zur Gewohnheit – deshalb ist das Bremsen bei Rot so knifflig. Mit etwas Übung wirst du darin besser; ob sich das auf Verkehr oder Sport überträgt, ist nicht belegt.',
  goodFor: ['Anfahren an der Ampel', 'Bremsen im Verkehr', 'Ballspiele'],
  captions: {
    go: 'Grün: sofort tippen!',
    stop: 'Rot: Finger weg!',
  },
  metrics: {
    level: 'Erreichte Stufe',
    accuracy: 'Treffsicherheit',
    stopErrors: 'Bei Rot getippt',
    rt: 'Reaktionszeit bei Grün',
    missed: 'Verpasst',
  },
  tips: {
    brake: 'Du hast öfter bei Rot getippt. Gönn dir einen winzigen Moment: erst schauen, dann tippen.',
    faster: 'Ein paar grüne Kreise sind durchgerutscht. Halte den Finger knapp über dem Bildschirm bereit – dann bist du schneller.',
    great: 'Stark! Schnell und trotzdem kontrolliert. Nächstes Mal geht es noch ein bisschen flotter.',
  },
  feedback: {
    slow: 'Zu langsam',
    stop: 'Stopp!',
    early: 'Zu früh',
    level: 'Stufe',
    legendGo: 'tippen',
    legendStop: 'nicht tippen',
  },
};

export const it: ExerciseTexts = {
  title: 'Stop o via',
  tagline: 'Col verde vai, col rosso ti fermi – veloce, ma pronto a frenare.',
  steps: ['Cerchio verde: tocca subito, dove vuoi.', 'Segnale rosso: non toccare!', 'Si va sempre più veloci – resta attento.'],
  why:
    'Col verde tocchi in un lampo, col rosso resti fermo. Visto che arriva quasi sempre il verde, toccare diventa un’abitudine – per questo frenarsi sul rosso è così difficile. Con un po’ di pratica migliori in questo esercizio; che serva anche nel traffico o nello sport, non è dimostrato.',
  goodFor: ['Partire al semaforo', 'Frenare nel traffico', 'Giochi con la palla'],
  captions: {
    go: 'Verde: tocca subito!',
    stop: 'Rosso: non toccare!',
  },
  metrics: {
    level: 'Livello raggiunto',
    accuracy: 'Precisione',
    stopErrors: 'Toccato sul rosso',
    rt: 'Tempo di reazione sul verde',
    missed: 'Mancati',
  },
  tips: {
    brake: 'Hai toccato spesso sul rosso. Concediti un attimo: prima guarda, poi tocca.',
    faster: 'Qualche cerchio verde ti è sfuggito. Tieni il dito pronto appena sopra lo schermo – così sei più veloce.',
    great: 'Ottimo! Veloce ma sempre sotto controllo. La prossima volta si va un po’ più svelti.',
  },
  feedback: {
    slow: 'Troppo lento',
    stop: 'Stop!',
    early: 'Troppo presto',
    level: 'Livello',
    legendGo: 'tocca',
    legendStop: 'non toccare',
  },
};
