import type { ExerciseTexts } from '../../core/types';

export const de: ExerciseTexts = {
  title: 'Stopp & Los',
  tagline: 'Blitzschnell reagieren – und im richtigen Moment bremsen.',
  steps: ['Grüner Kreis: sofort tippen – egal wo.', 'Rotes Stoppschild: Finger weg!', 'Es wird immer flotter – bleib wachsam.'],
  why:
    'Oft musst du in Sekundenbruchteilen entscheiden: losfahren oder stehen bleiben, zugreifen oder abwarten. Hier übst du beides zugleich – schnell sein und dich im richtigen Moment bremsen. So reagierst du flott, ohne vorschnell zu handeln.',
  goodFor: ['Straßenverkehr', 'Ballsport', 'Konzentration'],
  captions: {
    go: 'Grün: sofort tippen!',
    stop: 'Rot: Finger weg!',
  },
  metrics: {
    level: 'Stufe',
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
  tagline: 'Reagire in un lampo – e fermarsi al momento giusto.',
  steps: ['Cerchio verde: tocca subito, dove vuoi.', 'Segnale rosso: non toccare!', 'Si va sempre più veloci – resta attento.'],
  why:
    'Spesso devi decidere in una frazione di secondo: partire o restare fermo, afferrare o aspettare. Qui alleni entrambe le cose insieme – essere veloce e frenarti al momento giusto. Così reagisci in fretta, senza agire d’impulso.',
  goodFor: ['Traffico', 'Sport con la palla', 'Concentrazione'],
  captions: {
    go: 'Verde: tocca subito!',
    stop: 'Rosso: non toccare!',
  },
  metrics: {
    level: 'Livello',
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
