import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (docs/wissenschaft/01-…, 4.4 und 04-…, 1.5/10): nur beschreiben, was man in der
// Übung tut – keine Wirkversprechen, keine Test- oder Diagnosewörter, kein Vergleich mit anderen.

export const de: ExerciseTexts = {
  title: 'Pfeil-Duell',
  tagline: 'Wohin zeigt der Pfeil? Lass dich nicht vom Platz austricksen.',
  steps: [
    'Tippe die Taste, in deren Richtung der Pfeil zeigt.',
    'Wo der Pfeil steht, ist egal – nur die Richtung zählt.',
    'Später: vier Richtungen und Nachbar-Pfeile.',
  ],
  why:
    'Beim Pfeil-Duell zählt nur, wohin der Pfeil zeigt – nicht, wo er steht oder wohin seine Nachbarn zeigen. Das fordert die Fähigkeit, Störendes auszublenden; die Übung ist an bekannte Aufgaben aus der Forschung angelehnt. Mit Übung wirst du darin schneller – ob das im Alltag hilft, ist nicht belegt.',
  goodFor: ['Störendes ausblenden', 'Schnell entscheiden', 'Genau hinschauen'],
  captions: {
    dir: 'Tippe, wohin der Pfeil zeigt',
    place: 'Egal, wo er steht – nur die Richtung!',
    flank: 'Später: Nur der mittlere Pfeil zählt',
  },
  metrics: {
    level: 'Erreichte Stufe',
    accuracy: 'Treffsicherheit',
    rt: 'Reaktionszeit',
    interference: 'Zeitverlust durch Täuschung',
  },
  tips: {
    slow: 'Einige Pfeile sind dir davongelaufen. Halte die Finger locker über den Tasten bereit.',
    trap: 'Du hast dich öfter vom Platz oder von den Nachbarn täuschen lassen. Schau nur auf die Spitze des Pfeils.',
    early: 'Warte, bis der Pfeil da ist – vorher zu tippen bringt nichts.',
    great: 'Stark! Schnell und sicher. Nächstes Mal wird es kniffliger.',
    steady: 'Gut gemacht. Ganz ruhig: erst die Spitze anschauen, dann tippen.',
  },
  feedback: {
    slow: 'Zu langsam',
    wrong: 'Andere Richtung',
    early: 'Warte auf den Pfeil',
    level: 'Stufe',
    newStage: 'Neue Stufe',
    easier: 'Etwas leichter',
    stage1: 'Links oder rechts?',
    stage1Hint: 'Nur die Richtung zählt',
    stage2: 'Vier Richtungen',
    stage2Hint: 'Tippe die passende Ecke',
    stage3: 'Nur der mittlere Pfeil zählt',
    stage3Hint: 'Die Nachbarn wollen dich täuschen',
    stage4: 'Alles gemischt',
    stage4Hint: 'Mal der Platz, mal die Nachbarn',
  },
};

export const it: ExerciseTexts = {
  title: 'Frecce in conflitto',
  tagline: 'Dove punta la freccia? Non farti ingannare dalla posizione.',
  steps: [
    'Tocca il tasto nella direzione in cui punta la freccia.',
    'Non conta dove si trova – conta solo la direzione.',
    'Più avanti: quattro direzioni e frecce vicine.',
  ],
  why:
    'In Frecce in conflitto conta solo la direzione della freccia – non dove si trova o dove puntano le frecce vicine. Serve a ignorare ciò che distrae; l’esercizio si ispira a compiti noti della ricerca. Con la pratica diventi più veloce in questo esercizio – che ciò aiuti nella vita di tutti i giorni non è dimostrato.',
  goodFor: ['Ignorare le distrazioni', 'Decidere in fretta', 'Guardare con attenzione'],
  captions: {
    dir: 'Tocca dove punta la freccia',
    place: 'Non conta dove sta: solo la direzione!',
    flank: 'Poi: conta solo la freccia centrale',
  },
  metrics: {
    level: 'Livello raggiunto',
    accuracy: 'Precisione',
    rt: 'Tempo di reazione',
    interference: 'Tempo perso per l’inganno',
  },
  tips: {
    slow: 'Alcune frecce ti sono sfuggite. Tieni le dita rilassate e pronte sopra i tasti.',
    trap: 'Ti sei fatto ingannare spesso dalla posizione o dalle frecce vicine. Guarda solo la punta della freccia.',
    early: 'Aspetta che compaia la freccia – toccare prima non serve.',
    great: 'Ottimo! Veloce e preciso. La prossima volta sarà più difficile.',
    steady: 'Buon lavoro. Con calma: prima guarda la punta, poi tocca.',
  },
  feedback: {
    slow: 'Troppo lento',
    wrong: 'Altra direzione',
    early: 'Aspetta la freccia',
    level: 'Livello',
    newStage: 'Nuovo livello',
    easier: 'Un po’ più facile',
    stage1: 'Sinistra o destra?',
    stage1Hint: 'Conta solo la direzione',
    stage2: 'Quattro direzioni',
    stage2Hint: 'Tocca l’angolo giusto',
    stage3: 'Conta solo la freccia centrale',
    stage3Hint: 'Le vicine cercano di ingannarti',
    stage4: 'Tutto mescolato',
    stage4Hint: 'Ora la posizione, ora le vicine',
  },
};
