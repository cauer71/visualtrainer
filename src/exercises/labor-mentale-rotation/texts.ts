import type { ExerciseTexts } from '../../core/types';

// Quelle: Labor-Prototyp (help/rotation.js), für Blickfit geglättet: du-Form, einfache Sprache, Fachwörter erklärt
// („Anstieg“ und „Median“ erklärt).
// Streichungen gegenüber dem Prototyp: „Du trainierst räumliches Vorstellungsvermögen“ (Wirkversprechen), „Der Drehwinkel verlängert
// die Antwort. Das ist normal.“ (Normaussage), „kleinerer Anstieg (Hinweis auf effizientere mentale Drehung)“ und „Der Anstieg ist
// ein Maß für die Geschwindigkeit der mentalen Rotation“ (Deutung nicht belegt), „Erfolgsquote nicht zu weit unter 70 %“ als
// Vorgabe (jetzt „unsere Faustregel“). Der Anstieg ist nur ein Vergleich mit sich selbst, kein Normwert.
// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-, Heil- oder
// Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst auf diesem Gerät.
// `short` in params: Vorlage für die Kurzfassung der Einstellungen auf der Ergebnisseite ({v} = Wert; „|“ trennt die Form
// für genau 1 von der Form für andere Zahlen).

export const de: ExerciseTexts = {
  title: 'Mentale Rotation',
  tagline: 'Dieselbe Figur, nur gedreht – oder ihr Spiegelbild?',
  steps: [
    'Links siehst du die Vorlage, rechts eine gedrehte Figur.',
    'Nur gedreht? „Gleich“. Spiegelverkehrt? „Gespiegelt“.',
    'Danach folgt gleich die nächste Aufgabe.',
  ],
  why:
    'Hier stellst du dir vor, eine Figur zu drehen, und entscheidest, ob sie dieselbe oder ihr Spiegelbild ist. In klassischen Versuchen dauerte die Antwort umso länger, je größer der Drehwinkel war. Ob sich das Üben auf Alltag, Schule oder Beruf überträgt, ist nicht belegt.',
  goodFor: ['Vorstellen', 'Im Kopf drehen', 'Räumliches Denken'],
  captions: {
    look: 'Links Vorlage, rechts gedrehte Figur',
    same: 'Nur gedreht? Dann „Gleich“',
    mirror: 'Spiegelverkehrt? Dann „Gespiegelt“',
    again: 'Wieder nur gedreht: „Gleich“',
  },
  metrics: {
    correct: 'Richtige Antworten',
    accuracy: 'Genauigkeit',
    rt_mean: 'Antwortzeit richtiger Antworten (Mittel)',
    rt_median: 'Antwortzeit richtiger Antworten (Median)',
    slope: 'Anstieg der Antwortzeit je 90° Drehung',
  },
  metricHints: {
    correct: 'Wie viele Aufgaben du richtig beantwortet hast. Läuft ein Zeitlimit ab, zählt die Aufgabe als nicht richtig.',
    accuracy: 'Anteil der richtigen Antworten an allen Aufgaben, in Prozent. Bei reinem Raten kämen etwa 50 Prozent heraus, weil es nur zwei Antworten gibt.',
    rt_mean: 'Durchschnittliche Zeit vom Erscheinen der Figuren bis zur Antwort, nur für richtige Antworten. Sie enthält die Verzögerung des Geräts und ist nur auf demselben Gerät mit denselben Einstellungen vergleichbar.',
    rt_median: 'Der mittlere Wert, wenn man die Antwortzeiten der Größe nach ordnet: Die Hälfte war schneller, die Hälfte langsamer. Einzelne Ausreißer ziehen ihn weniger als den Durchschnitt.',
    slope: 'Um wie viele Millisekunden die Antwortzeit im Durchschnitt zunimmt, wenn der Drehwinkel um 90° wächst (Gerade durch deine richtigen Antworten; Winkel von 0° bis 180°, bei mehr zählt der kürzere Weg). Das ist nur ein Vergleich mit dir selbst – einen Richtwert gibt es nicht. Er wird erst ab 6 richtigen Antworten mit mindestens 3 verschiedenen Winkeln berechnet und schwankt bei wenigen Aufgaben stark.',
  },
  tips: {
    slow: 'Viele Antworten waren falsch. Lass dir mehr Zeit, nimm weniger Quadrate oder nur Drehungen in 90°-Schritten.',
    harder: 'Fast alles richtig. Wenn du magst, mach genau eine Einstellung schwerer: mehr Quadrate, Drehungen in 45°-Schritten oder ein Zeitlimit.',
    mirror: 'Verwechselt hast du vor allem Spiegelbilder. Such ein Merkmal der Figur (zum Beispiel einen Ausläufer oder eine Ecke) und verfolge, wo es nach der Drehung landen müsste: Beim Spiegelbild liegt es auf der falschen Seite.',
    turn: 'Bei größeren Drehwinkeln dauert die Antwort oft länger; in den klassischen Versuchen war das so. Vergleiche deinen Anstieg nur mit deinen früheren Läufen auf diesem Gerät.',
    compare: 'Vergleiche diesen Durchlauf nur mit Durchläufen, die dieselben Einstellungen hatten – auf diesem Gerät.',
  },
  feedback: {
    prompt: 'Dieselbe Figur – oder ihr Spiegelbild?',
    template: 'Vorlage',
    compare: 'Vergleich',
    same: 'Gleich (gedreht)',
    mirror: 'Gespiegelt',
    wasSame: 'Es war dieselbe Figur, nur gedreht.',
    wasMirror: 'Es war das Spiegelbild.',
    timeout: 'Zeit abgelaufen',
    label: 'Aufgabe {i} von {n}',
    moreTitle: 'Weitere Werte',
    moreNote: 'Die Zeiten enthalten auch die Verzögerung von Bildschirm und Touch-Sensor. Vergleiche sie nur mit deinen eigenen Werten auf diesem Gerät.',
    noSlope: 'Der Anstieg je 90° fehlt, weil es zu wenige richtige Antworten oder zu wenige verschiedene Drehwinkel gab (nötig: mindestens 6 richtige Antworten und 3 Winkelstufen).',
  },
  progression: [
    'Leichter: 4 bis 5 Quadrate pro Figur, nur Vielfache von 90°, größere Quadrate.',
    'Schwerer: 7 bis 9 Quadrate, Vielfache von 45°, ein Zeitlimit je Aufgabe (zum Beispiel 10 s).',
    'Für den Anstieg der Antwortzeit sind mindestens 20 Aufgaben sinnvoll; auch dann schwankt er von Lauf zu Lauf.',
    'Unsere Faustregel (keine Vorgabe aus der Forschung): Liegst du in mehreren Durchläufen hintereinander über 90 %, mach eine Einstellung schwerer; unter 70 % mach sie leichter. Ändere immer nur eine Einstellung.',
  ],
  cautions: [
    'Stell den Bildschirm einmal ein („Bildschirm kalibrieren“), damit die Quadratgröße in Zentimetern stimmt. Auf kleinen Bildschirmen werden die Figuren kleiner.',
    'Die Figuren sind bewusst nicht spiegelsymmetrisch, damit jede Aufgabe genau eine richtige Antwort hat. Die Drehung ändert nie die Figur selbst, die Spiegelung schon. Bei „45°“ erscheint die Vergleichsfigur auch schräg zu den Quadratreihen.',
    'Du darfst die Figur mit der Hand „mitdrehen“, wenn dir das hilft. Die App misst nur dein Tippen, nicht, wie du die Aufgabe löst.',
    'Der Anstieg der Antwortzeit ist ein Vergleich mit dir selbst auf diesem Gerät. Für ihn gibt es keinen Richtwert, und er sagt nichts über deine Fähigkeiten aus.',
    'Bei Kopfschmerzen, Schwindel oder Augenbeschwerden: aufhören. Wirst du ungeduldig, wähle eine leichtere Einstellung.',
  ],
  params: {
    trials: {
      label: 'Anzahl der Aufgaben',
      hint: 'Wie viele Aufgaben ein Durchlauf hat. Für einen halbwegs verlässlichen Anstieg der Antwortzeit sind mindestens 20 sinnvoll.',
      short: '{v} Aufgabe|{v} Aufgaben',
    },
    cells: {
      label: 'Quadrate pro Figur',
      hint: 'Aus wie vielen Quadraten jede Figur besteht. Mehr Quadrate machen die Aufgabe meist schwerer.',
      short: '{v} Quadrate',
    },
    angles: {
      label: 'Drehwinkel',
      hint: 'In welchen Schritten die Vergleichsfigur gedreht sein kann: nur Vielfache von 90° (0°, 90°, 180°, 270°) oder auch von 45°. 45°-Schritte sind schwerer. Die ungedrehte Figur (0°) gehört immer dazu.',
      options: { '90': 'Vielfache von 90°', '45': 'Vielfache von 45°' },
    },
    cellCm: {
      label: 'Quadratgröße',
      hint: 'Kantenlänge eines Quadrats in Zentimetern. Auf kleinen Bildschirmen werden die Figuren kleiner, damit sie auch gedreht Platz haben.',
    },
    timeoutS: {
      label: 'Zeitlimit je Aufgabe',
      hint: 'Optionales Zeitlimit je Aufgabe in Sekunden. 0 heißt: kein Limit. Wird es überschritten, zählt die Aufgabe als nicht richtig.',
    },
  },
};

export const it: ExerciseTexts = {
  title: 'Rotazione mentale',
  tagline: 'La stessa figura, solo ruotata – o la sua immagine speculare?',
  steps: [
    'A sinistra vedi il modello, a destra una figura ruotata.',
    'Solo ruotata? “Uguale”. Speculare? “Speculare”.',
    'Poi segue subito il compito successivo.',
  ],
  why:
    'Qui immagini di ruotare una figura e decidi se è la stessa o la sua immagine speculare. Negli esperimenti classici la risposta richiedeva tanto più tempo quanto più grande era l’angolo di rotazione. Non è dimostrato che l’esercizio si trasferisca alla vita quotidiana, alla scuola o al lavoro.',
  goodFor: ['Immaginare', 'Ruotare a mente', 'Pensiero spaziale'],
  captions: {
    look: 'Modello a sinistra, ruotata a destra',
    same: 'Solo ruotata? Allora “Uguale”',
    mirror: 'Speculare? Allora “Speculare”',
    again: 'Di nuovo solo ruotata: “Uguale”',
  },
  metrics: {
    correct: 'Risposte giuste',
    accuracy: 'Precisione',
    rt_mean: 'Tempo delle risposte giuste (media)',
    rt_median: 'Tempo delle risposte giuste (mediana)',
    slope: 'Aumento del tempo ogni 90° di rotazione',
  },
  metricHints: {
    correct: 'Quanti compiti hai risolto giusto. Se scade un limite di tempo, il compito non conta come giusto.',
    accuracy: 'Quota delle risposte giuste su tutti i compiti, in percentuale. A caso verrebbe circa il 50 per cento, perché ci sono solo due risposte.',
    rt_mean: 'Tempo medio da quando compaiono le figure alla risposta, solo per le risposte giuste. Comprende il ritardo del dispositivo ed è confrontabile solo sullo stesso dispositivo con le stesse impostazioni.',
    rt_median: 'Il valore centrale quando si ordinano i tempi per grandezza: metà è stata più veloce, metà più lenta. I singoli valori estremi lo spostano meno della media.',
    slope: 'Di quanti millisecondi aumenta in media il tempo di risposta quando l’angolo di rotazione cresce di 90° (retta attraverso le tue risposte giuste; angoli da 0° a 180°, oltre conta la via più breve). È solo un confronto con te stesso – un valore di riferimento non esiste. Viene calcolato solo con almeno 6 risposte giuste e almeno 3 angoli diversi e oscilla molto con pochi compiti.',
  },
  tips: {
    slow: 'Molte risposte erano sbagliate. Prenditi più tempo, usa meno quadrati o solo rotazioni a passi di 90°.',
    harder: 'Quasi tutto giusto. Se vuoi, rendi più difficile una sola impostazione: più quadrati, rotazioni a passi di 45° o un limite di tempo.',
    mirror: 'Hai confuso soprattutto le immagini speculari. Cerca una caratteristica della figura (per esempio una sporgenza o un angolo) e segui dove dovrebbe finire dopo la rotazione: nell’immagine speculare sta dalla parte sbagliata.',
    turn: 'Con angoli di rotazione maggiori la risposta spesso richiede più tempo; negli esperimenti classici era così. Confronta il tuo aumento solo con i tuoi giri precedenti su questo dispositivo.',
    compare: 'Confronta questo giro solo con giri che avevano le stesse impostazioni – su questo dispositivo.',
  },
  feedback: {
    prompt: 'La stessa figura – o la sua immagine speculare?',
    template: 'Modello',
    compare: 'Confronto',
    same: 'Uguale (ruotata)',
    mirror: 'Speculare',
    wasSame: 'Era la stessa figura, solo ruotata.',
    wasMirror: 'Era l’immagine speculare.',
    timeout: 'Tempo scaduto',
    label: 'Compito {i} di {n}',
    moreTitle: 'Altri valori',
    moreNote: 'I tempi comprendono anche il ritardo di schermo e sensore touch. Confrontali solo con i tuoi valori su questo dispositivo.',
    noSlope: 'L’aumento ogni 90° manca perché c’erano troppo poche risposte giuste o troppo pochi angoli diversi (servono almeno 6 risposte giuste e 3 livelli di angolo).',
  },
  progression: [
    'Più facile: da 4 a 5 quadrati per figura, solo multipli di 90°, quadrati più grandi.',
    'Più difficile: da 7 a 9 quadrati, multipli di 45°, un limite di tempo per compito (per esempio 10 s).',
    'Per l’aumento del tempo di risposta hanno senso almeno 20 compiti; anche allora oscilla da giro a giro.',
    'La nostra regola pratica (non è un’indicazione della ricerca): se in più giri di seguito superi il 90 %, rendi più difficile un’impostazione; sotto il 70 % rendila più facile. Cambia sempre una sola impostazione.',
  ],
  cautions: [
    'Imposta lo schermo una volta (“Calibra lo schermo”), così la grandezza dei quadrati in centimetri è giusta. Sugli schermi piccoli le figure diventano più piccole.',
    'Le figure non sono volutamente simmetriche a specchio, così ogni compito ha una sola risposta giusta. La rotazione non cambia mai la figura stessa, la specularità sì. Con “45°” la figura di confronto compare anche inclinata rispetto alle file di quadrati.',
    'Puoi “girare” la figura con la mano se ti aiuta. L’app misura solo il tuo tocco, non come risolvi il compito.',
    'L’aumento del tempo di risposta è un confronto con te stesso su questo dispositivo. Non esiste un valore di riferimento e non dice nulla sulle tue capacità.',
    'In caso di mal di testa, vertigini o disturbi agli occhi: smetti. Se diventi impaziente, scegli un’impostazione più facile.',
  ],
  params: {
    trials: {
      label: 'Numero di compiti',
      hint: 'Quanti compiti ha un giro. Per un aumento del tempo di risposta abbastanza affidabile hanno senso almeno 20.',
      short: '{v} compito|{v} compiti',
    },
    cells: {
      label: 'Quadrati per figura',
      hint: 'Da quanti quadrati è formata ogni figura. Più quadrati rendono il compito di solito più difficile.',
      short: '{v} quadrati',
    },
    angles: {
      label: 'Angolo di rotazione',
      hint: 'A quali passi può essere ruotata la figura di confronto: solo multipli di 90° (0°, 90°, 180°, 270°) o anche di 45°. I passi di 45° sono più difficili. La figura non ruotata (0°) c’è sempre.',
      options: { '90': 'Multipli di 90°', '45': 'Multipli di 45°' },
    },
    cellCm: {
      label: 'Grandezza dei quadrati',
      hint: 'Lato di un quadrato in centimetri. Sugli schermi piccoli le figure diventano più piccole, così hanno posto anche ruotate.',
    },
    timeoutS: {
      label: 'Limite di tempo per compito',
      hint: 'Limite di tempo facoltativo per compito, in secondi. 0 significa nessun limite. Se viene superato, il compito non conta come giusto.',
    },
  },
};
