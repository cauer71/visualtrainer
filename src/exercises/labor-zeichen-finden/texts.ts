import type { ExerciseTexts } from '../../core/types';

// Stil: du-Form, einfache Sprache, Fachwörter erklärt
// („Suchaufgabe“ statt „Streichungsaufgabe“, Median entfällt).
// Nicht aufgenommen: „Wenn Buchstaben bei dir häufig gespiegelt oder vertauscht erscheinen, dies
// fachlich abklären lassen“ (klingt nach Diagnose) → jetzt: misst nicht Lesen oder Schreiben und sagt nichts über die Augen;
// „Verwechslungen … werden hier gezielt geübt“ und „trainiert genaues Unterscheiden“ (Wirkversprechen) entfallen; „rot“ für Fehltipps
// → ✗ und gestricheltes Feld (Farbe nie allein).
// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-, Heil- oder
// Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst auf diesem Gerät.
// `short` in params: Muster für die Kurzfassung der Einstellungen auf der Ergebnisseite ({v} = Wert; „|“ trennt die Form
// für genau 1 von der Form für andere Zahlen).

export const de: ExerciseTexts = {
  title: 'Zeichen finden',
  tagline: 'Finde alle gleichen Zeichen in einem Raster ähnlicher Zeichen.',
  steps: [
    'Oben steht das gesuchte Zeichen, darunter das Raster.',
    'Tippe jedes gleiche Zeichen an, nicht die ähnlichen.',
    'Nichts mehr gefunden? Tippe „Fertig“.',
  ],
  why:
    'Hier suchst du ein Zeichen zwischen sehr ähnlichen Zeichen und musst genau hinsehen. In der Forschung zur visuellen Suche wird die Suche schwerer, je ähnlicher das gesuchte Zeichen den anderen ist; auch bei Buchstaben lassen sich manche Paare leichter verwechseln als andere. Ob sich das Üben auf Lesen, Schule oder Alltag überträgt, ist nicht belegt.',
  goodFor: ['Genau hinsehen', 'Suchen', 'Konzentration'],
  captions: {
    ready: 'Gleich erscheint eine Tafel',
    find: 'Tippe alle Zeichen wie das obere',
    wrong: 'Falsches Zeichen? Es wird markiert',
    giveup: 'Nichts mehr gefunden? Tippe „Fertig“',
  },
  metrics: {
    found: 'Zielzeichen gefunden',
    missed: 'Zielzeichen übersehen',
    false_taps: 'Falsche Zeichen getippt',
    accuracy: 'Genauigkeit',
    per_target: 'Zeit pro gefundenem Zeichen',
    total: 'Gesamtzeit',
  },
  metricHints: {
    found: 'Wie viele Zielzeichen du im ganzen Durchlauf gefunden hast.',
    missed: 'Zielzeichen, die noch nicht gefunden waren, als du „Fertig“ getippt hast.',
    false_taps: 'Angetippte Zeichen, die nicht das gesuchte waren. Sie werden markiert und können nicht noch einmal getippt werden.',
    accuracy: 'Gefundene Zeichen geteilt durch alle gefundenen, übersehenen und falsch getippten, in Prozent. Näher an 100 heißt: wenig übersehen und wenig falsch getippt. Das ist ein Vergleich mit dir selbst, keine Bewertung.',
    per_target: 'Gesamtzeit aller Tafeln geteilt durch die Zahl der gefundenen Zeichen. Sie enthält die Verzögerung des Geräts und ist nur auf demselben Gerät mit denselben Einstellungen vergleichbar.',
    total: 'Summe der Zeiten aller Tafeln, ohne die kurzen Pausen dazwischen.',
  },
  tips: {
    false: 'Du tippst öfter ein falsches Zeichen. Achte auf das Merkmal, das das gesuchte Zeichen von den ähnlichen unterscheidet (zum Beispiel auf welcher Seite der Bogen von b und d sitzt), und tippe nur, wenn du sicher bist.',
    missed: 'Du hast einige Zeichen übersehen. Such Zeile für Zeile von links nach rechts und tippe erst auf „Fertig“, wenn du jede Zeile geprüft hast.',
    harder: 'Fast alles gefunden und kaum falsch getippt. Wenn du magst, mach genau eine Einstellung schwerer: mehr Felder, weniger Zielzeichen oder kleinere Felder.',
    slow: 'Das Suchen dauert lange. Probiere weniger Felder oder einen höheren Anteil an Zielzeichen – und ändere immer nur eine Einstellung.',
    compare: 'Vergleiche diesen Durchlauf nur mit Durchläufen, die dieselben Einstellungen hatten – auf diesem Gerät. Das gesuchte Zeichen wechselt, und manche Paare sind schwerer als andere.',
  },
  feedback: {
    findAll: 'Finde alle:',
    done: 'Fertig',
    label: 'Tafel {i}/{n}',
    moreTitle: 'Weitere Werte',
    moreNote: 'Die Zeit enthält auch die Verzögerung von Bildschirm und Touch-Sensor. Vergleiche sie nur mit deinen eigenen Werten auf diesem Gerät.',
    gridReduced: 'Auf diesem Bildschirm war das Raster kleiner als eingestellt, damit die Zeichen gut lesbar bleiben.',
  },
  progression: [
    'Leichter: weniger Felder (zum Beispiel 4 × 6), mehr Zielzeichen (30 bis 40 %), größere Felder, Zeichenvorrat „Ziffern“.',
    'Schwerer: mehr Felder (8 × 12), weniger Zielzeichen (10 %), kleinere Felder (1,5 bis 2 cm), Vorrat „b d p q“ oder „Gemischt“. Die Felder werden nie so klein, dass die Zeichen schlecht lesbar sind.',
    'Wechsle zwischen den Zeichenvorräten, wenn dir eine Aufgabe zu vertraut wird.',
    'Unsere Faustregel (keine Vorgabe aus der Forschung): Liegt die Genauigkeit in mehreren Durchläufen hintereinander über 95 %, mach eine Einstellung schwerer. Ändere immer nur eine auf einmal.',
  ],
  cautions: [
    'Stell den Bildschirm einmal ein („Bildschirm kalibrieren“), damit die Feldgröße in Zentimetern stimmt.',
    'Auf kleinen Bildschirmen wird das Raster gedreht dargestellt oder verkleinert, damit die Zeichen gut lesbar bleiben. Das steht dann auf der Ergebnisseite.',
    'Die Ähnlichkeit der Zeichen ist nicht gleichmäßig: Manche Paare (zum Beispiel b und d) sind leichter zu verwechseln als andere. Darum wechselt das gesuchte Zeichen reihum. Sie misst nicht, wie gut du liest oder schreibst, und sagt nichts über deine Augen aus.',
    'Dein Blick wird nicht gemessen, nur dein Tippen.',
    'Ähnliche Zeichen sind anstrengend für die Augen. Mach nach etwa 10 Minuten eine Pause. Bei Kopfschmerzen oder Augenbrennen: aufhören.',
  ],
  params: {
    set: {
      label: 'Zeichenvorrat',
      hint: '„b d p q“: spiegelähnliche Buchstaben. „Ziffern“: 1 7 4 9 6 2 5 3. „Ähnliche Buchstaben“: O Q C G D U E F. „Gemischt“: eine Auswahl aus allen. Das gesuchte Zeichen wechselt von Tafel zu Tafel.',
      options: { pbdq: 'b d p q', digits: 'Ziffern', similar: 'Ähnliche Buchstaben', mixed: 'Gemischt' },
    },
    rows: {
      label: 'Zeilen',
      hint: 'Zeilen des Rasters. Mehr Zeilen bedeuten mehr Felder und eine längere Suche. Passt das Raster nicht auf den Bildschirm, wird es gedreht oder verkleinert.',
      short: '{v} Zeile|{v} Zeilen',
    },
    cols: {
      label: 'Spalten',
      hint: 'Spalten des Rasters. Mehr Spalten bedeuten mehr Felder und eine längere Suche. Passt das Raster nicht auf den Bildschirm, wird es gedreht oder verkleinert.',
      short: '{v} Spalte|{v} Spalten',
    },
    density: {
      label: 'Anteil der Zielzeichen',
      hint: 'Anteil der Felder, die das gesuchte Zeichen tragen. Weniger Zielzeichen machen die Suche schwerer. Es gibt mindestens eins, nie in allen Feldern.',
    },
    cellCm: {
      label: 'Feldgröße',
      hint: 'Kantenlänge eines Feldes in Zentimetern. Sie passt sich an, wenn das Raster nicht auf den Bildschirm passt; die Zeichen bleiben dabei gut lesbar.',
    },
    rounds: {
      label: 'Anzahl der Tafeln',
      hint: 'Wie viele Tafeln ein Durchlauf hat. Das gesuchte Zeichen wechselt von Tafel zu Tafel.',
      short: '{v} Tafel|{v} Tafeln',
    },
  },
};

export const it: ExerciseTexts = {
  title: 'Trova i caratteri',
  tagline: 'Trova tutti i caratteri uguali in una griglia di caratteri simili.',
  steps: [
    'In alto c’è il carattere cercato, sotto la griglia.',
    'Tocca ogni carattere uguale, non quelli simili.',
    'Non trovi più niente? Tocca “Fatto”.',
  ],
  why:
    'Qui cerchi un carattere tra caratteri molto simili e devi guardare con attenzione. Nella ricerca sulla ricerca visiva la ricerca diventa più difficile quanto più il carattere cercato somiglia agli altri; anche con le lettere alcune coppie si confondono più facilmente di altre. Non è dimostrato che l’esercizio si trasferisca alla lettura, alla scuola o alla vita quotidiana.',
  goodFor: ['Guardare bene', 'Cercare', 'Concentrazione'],
  captions: {
    ready: 'Tra poco compare una tavola',
    find: 'Tocca i caratteri come quello in alto',
    wrong: 'Carattere sbagliato? Viene segnato',
    giveup: 'Non trovi più niente? Tocca “Fatto”',
  },
  metrics: {
    found: 'Caratteri cercati trovati',
    missed: 'Caratteri cercati non visti',
    false_taps: 'Caratteri sbagliati toccati',
    accuracy: 'Precisione',
    per_target: 'Tempo per carattere trovato',
    total: 'Tempo totale',
  },
  metricHints: {
    found: 'Quanti caratteri cercati hai trovato in tutto il giro.',
    missed: 'Caratteri cercati che non erano ancora stati trovati quando hai toccato “Fatto”.',
    false_taps: 'Caratteri toccati che non erano quello cercato. Vengono segnati e non si possono toccare di nuovo.',
    accuracy: 'Caratteri trovati divisi per tutti i trovati, non visti e toccati sbagliati, in percentuale. Più vicino a 100 significa: pochi non visti e pochi toccati sbagliati. È un confronto con te stesso, non una valutazione.',
    per_target: 'Tempo totale di tutte le tavole diviso per il numero di caratteri trovati. Comprende il ritardo del dispositivo ed è confrontabile solo sullo stesso dispositivo con le stesse impostazioni.',
    total: 'Somma dei tempi di tutte le tavole, senza le brevi pause tra l’una e l’altra.',
  },
  tips: {
    false: 'Tocchi spesso un carattere sbagliato. Fai attenzione alla caratteristica che distingue quello cercato dai simili (per esempio da che parte sta la pancia di b e d) e tocca solo quando sei sicuro.',
    missed: 'Alcuni caratteri ti sono sfuggiti. Cerca riga per riga da sinistra a destra e tocca “Fatto” solo quando hai controllato ogni riga.',
    harder: 'Hai trovato quasi tutto e toccato quasi nulla di sbagliato. Se vuoi, rendi più difficile una sola impostazione: più campi, meno caratteri cercati o campi più piccoli.',
    slow: 'La ricerca richiede molto tempo. Prova meno campi o una quota maggiore di caratteri cercati – e cambia sempre una sola impostazione.',
    compare: 'Confronta questo giro solo con giri che avevano le stesse impostazioni – su questo dispositivo. Il carattere cercato cambia e alcune coppie sono più difficili di altre.',
  },
  feedback: {
    findAll: 'Trova tutti:',
    done: 'Fatto',
    label: 'Tavola {i}/{n}',
    moreTitle: 'Altri valori',
    moreNote: 'Il tempo comprende anche il ritardo di schermo e sensore touch. Confrontalo solo con i tuoi valori su questo dispositivo.',
    gridReduced: 'Su questo schermo la griglia era più piccola di quanto impostato, perché i caratteri restassero ben leggibili.',
  },
  progression: [
    'Più facile: meno campi (per esempio 4 × 6), più caratteri cercati (dal 30 al 40 %), campi più grandi, serie di caratteri “Cifre”.',
    'Più difficile: più campi (8 × 12), meno caratteri cercati (10 %), campi più piccoli (da 1,5 a 2 cm), serie “b d p q” o “Misto”. I campi non diventano mai così piccoli da rendere i caratteri poco leggibili.',
    'Alterna le serie di caratteri quando un compito ti diventa troppo familiare.',
    'La nostra regola pratica (non è un’indicazione della ricerca): se in più giri di seguito la precisione supera il 95 %, rendi più difficile un’impostazione. Cambiane sempre una sola alla volta.',
  ],
  cautions: [
    'Imposta lo schermo una volta (“Calibra lo schermo”), così la grandezza dei campi in centimetri è giusta.',
    'Sugli schermi piccoli la griglia viene disegnata ruotata o ridotta, perché i caratteri restino ben leggibili. Lo trovi poi nella pagina del risultato.',
    'La somiglianza dei caratteri non è uniforme: alcune coppie (per esempio b e d) si confondono più facilmente di altre. Per questo il carattere cercato cambia a turno. Non misura quanto bene leggi o scrivi e non dice nulla sui tuoi occhi.',
    'Il tuo sguardo non viene misurato, solo il tuo tocco.',
    'I caratteri simili affaticano gli occhi. Dopo circa 10 minuti fai una pausa. In caso di mal di testa o bruciore agli occhi: smetti.',
  ],
  params: {
    set: {
      label: 'Serie di caratteri',
      hint: '“b d p q”: lettere simili a specchio. “Cifre”: 1 7 4 9 6 2 5 3. “Lettere simili”: O Q C G D U E F. “Misto”: una scelta da tutte. Il carattere cercato cambia da tavola a tavola.',
      options: { pbdq: 'b d p q', digits: 'Cifre', similar: 'Lettere simili', mixed: 'Misto' },
    },
    rows: {
      label: 'Righe',
      hint: 'Righe della griglia. Più righe significano più campi e una ricerca più lunga. Se la griglia non sta sullo schermo, viene ruotata o ridotta.',
      short: '{v} riga|{v} righe',
    },
    cols: {
      label: 'Colonne',
      hint: 'Colonne della griglia. Più colonne significano più campi e una ricerca più lunga. Se la griglia non sta sullo schermo, viene ruotata o ridotta.',
      short: '{v} colonna|{v} colonne',
    },
    density: {
      label: 'Quota di caratteri cercati',
      hint: 'Quota dei campi che contengono il carattere cercato. Meno caratteri cercati rendono la ricerca più difficile. Ce n’è almeno uno, mai in tutti i campi.',
    },
    cellCm: {
      label: 'Grandezza dei campi',
      hint: 'Lato di un campo in centimetri. Si adatta se la griglia non sta sullo schermo; i caratteri restano ben leggibili.',
    },
    rounds: {
      label: 'Numero di tavole',
      hint: 'Quante tavole ha un giro. Il carattere cercato cambia da tavola a tavola.',
      short: '{v} tavola|{v} tavole',
    },
  },
};
