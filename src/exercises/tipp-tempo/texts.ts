import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-, Heil-
// oder Gesundheitsversprechen (nicht „stärkt Sehnen“), kein „Test“, keine Normwerte, Vergleich nur
// mit sich selbst auf diesem Gerät. Die Ermüdung bei schnellem Tippen ehrlich benennen.

export const de: ExerciseTexts = {
  title: 'Tipp-Tempo',
  tagline: 'Tippe so schnell du kannst – in drei kurzen Runden mit Pause.',
  steps: [
    'Tippe 20 Sekunden lang so schnell du kannst auf die Kugel.',
    'Es zählt immer nur ein Finger – oder die Leertaste.',
    'Nach jeder Runde gibt es eine Pause – drei Runden insgesamt.',
  ],
  why:
    'Schnelles Tippen ermüdet schon nach wenigen Sekunden – darum gibt es drei kurze Runden mit Pausen, und es ist normal, wenn die Zahl von Runde zu Runde etwas sinkt. Vergleiche dich nur mit dir selbst auf diesem Gerät, und hör auf, wenn Hand oder Finger schmerzen. Ob Tipp-Training Handgeschick oder Alltag verbessert, ist nicht belegt.',
  goodFor: ['Schnelles Tippen', 'Tablet und Handy', 'Spiele mit Tippen'],
  captions: {
    tap: 'Tippe so schnell du kannst',
    rest: 'Dann Pause – die Hand ruht',
    again: 'Nächste Runde – locker bleiben',
    slower: 'Später wird es oft etwas langsamer',
  },
  metrics: {
    tapsPerBlock: 'Tipps pro Runde (Ø, 20 s)',
    bestBlock: 'Beste Runde',
    drop: 'Abfall erste → letzte Runde',
  },
  tips: {
    none: 'Es wurden keine Tipps gezählt. Tippe direkt auf die Kugel – mit einem Finger oder der Leertaste.',
    onefinger: 'Mehrere Finger gleichzeitig zählen nicht – es zählt immer nur ein Finger. Nimm am besten den Zeigefinger.',
    fatigue: 'Gegen Ende wurdest du langsamer – das ist bei schnellem Tippen normal. Lass die Hand in den Pausen locker hängen.',
    warm: 'Deine letzte Runde war deine beste – du brauchst etwas Anlauf. Lass dir in den Pausen Zeit.',
    even: 'Schön gleichmäßig über alle Runden! Vergleiche dich nächstes Mal wieder mit diesem Wert – auf diesem Gerät.',
  },
  feedback: {
    block: 'Runde',
    of: 'von',
    ready: 'Gleich geht’s los',
    taps: 'Tipps',
    perSecond: 'Tipps pro Sekunde',
    oneFinger: 'Es zählt nur ein Finger',
    rest: 'Pause',
    relax: 'Lass die Hand locker hängen',
    done: 'Geschafft!',
    aim: 'Tippe auf die Kugel',
  },
};

export const it: ExerciseTexts = {
  title: 'Ritmo di tocco',
  tagline: 'Tocca più in fretta che puoi – in tre brevi serie con pausa.',
  steps: [
    'Per 20 secondi tocca la sfera più in fretta che puoi.',
    'Conta sempre un solo dito – oppure la barra spaziatrice.',
    'Dopo ogni serie c’è una pausa – tre serie in tutto.',
  ],
  why:
    'Toccare velocemente stanca già dopo pochi secondi – per questo ci sono tre brevi serie con pause ed è normale che il numero cali un po’ da una serie all’altra. Confrontati solo con te stesso su questo dispositivo e fermati se senti dolore alla mano o alle dita. Che l’allenamento al tocco migliori l’abilità manuale o la vita quotidiana non è dimostrato.',
  goodFor: ['Toccare velocemente', 'Tablet e smartphone', 'Giochi con il tocco'],
  captions: {
    tap: 'Tocca più in fretta che puoi',
    rest: 'Poi pausa – la mano riposa',
    again: 'Serie successiva – resta rilassato',
    slower: 'Più tardi spesso si rallenta un po’',
  },
  metrics: {
    tapsPerBlock: 'Tocchi per serie (media, 20 s)',
    bestBlock: 'Serie migliore',
    drop: 'Calo dalla prima all’ultima serie',
  },
  tips: {
    none: 'Non è stato contato nessun tocco. Tocca direttamente la sfera – con un dito o la barra spaziatrice.',
    onefinger: 'Più dita insieme non contano – conta sempre un solo dito. Usa meglio l’indice.',
    fatigue: 'Verso la fine sei diventato più lento – con i tocchi veloci è normale. Lascia la mano rilassata durante le pause.',
    warm: 'La tua ultima serie è stata la migliore – ti serve un po’ di rincorsa. Prenditi il tempo nelle pause.',
    even: 'Bello e regolare in tutte le serie! La prossima volta confrontati di nuovo con questo valore – su questo dispositivo.',
  },
  feedback: {
    block: 'Serie',
    of: 'di',
    ready: 'Si parte tra un attimo',
    taps: 'Tocchi',
    perSecond: 'tocchi al secondo',
    oneFinger: 'Conta un solo dito',
    rest: 'Pausa',
    relax: 'Lascia la mano rilassata',
    done: 'Fatto!',
    aim: 'Tocca la sfera',
  },
};
