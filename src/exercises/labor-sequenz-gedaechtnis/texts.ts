import type { ExerciseTexts } from '../../core/types';

// Quelle: Labor-Prototyp (help/sequence.js), für Blickfit geglättet: du-Form, einfache Sprache, Fachwörter erklärt.
// Streichungen gegenüber dem Prototyp: „Viele Erwachsene erreichen 5 bis 7 Felder“ (Richtwert wie ein Normwert, nicht belegt),
// „Müdigkeit senkt die Merkspanne deutlich“ (nicht belegt), „bestanden“, „Blockspannen-Test“ (kein „Test“).
// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-, Heil- oder
// Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst auf diesem Gerät.
// `short` in params: Vorlage für die Kurzfassung der Einstellungen auf der Ergebnisseite ({v} = Wert; „|“ trennt die Form
// für genau 1 von der Form für andere Zahlen).

export const de: ExerciseTexts = {
  title: 'Sequenz-Gedächtnis',
  tagline: 'Felder leuchten nacheinander auf – tippe sie in derselben Reihenfolge an.',
  steps: [
    'Schau zu, wie die Felder nacheinander aufleuchten.',
    'Tippe sie danach in genau derselben Reihenfolge an.',
    'Richtig? Dann wird die nächste Folge länger.',
  ],
  why:
    'Hier merkst du dir, welche Felder in welcher Reihenfolge aufleuchten – eine Aufgabe für das Merken von Orten, ähnlich der Klötzchen-Aufgabe von Corsi. Wie viele Positionen man sich gleichzeitig merken kann, ist begrenzt; Gruppieren („Ecke, Mitte, Rand“) kann dabei helfen. Ob sich das Üben auf Alltag, Schule oder Beruf überträgt, ist nicht belegt.',
  goodFor: ['Merken', 'Reihenfolge', 'Orte'],
  captions: {
    ready: 'Gleich leuchten Felder auf',
    watch: 'Merke dir die Reihenfolge',
    yours: 'Tippe sie in derselben Reihenfolge',
    longer: 'Richtig – die Folge wird länger',
    again: 'Jetzt ein Feld mehr',
    count: 'Gezählt: deine längste richtige Folge',
  },
  metrics: {
    span: 'Längste richtige Folge',
    rounds: 'Richtig wiederholte Folgen',
    errors: 'Fehler',
    accuracy: 'Richtige Eingaben',
    rt_mean: 'Zeit pro richtiger Eingabe (Mittel)',
    total: 'Gesamtzeit',
  },
  metricHints: {
    span: 'Länge der längsten Folge, die du vollständig richtig wiederholt hast. Das ist der Hauptwert. Er hängt stark von den Einstellungen ab (Raster, Leuchtdauer, Regeln), deshalb vergleichst du nur Läufe mit gleichen Einstellungen.',
    rounds: 'Wie viele Folgen du insgesamt richtig wiederholt hast.',
    errors: 'Wie oft du ein falsches Feld getippt hast. Jeder Fehler beendet die laufende Runde.',
    accuracy: 'Anteil der richtigen Eingaben an allen Eingaben (Tippen auf Felder).',
    rt_mean: 'Durchschnittliche Zeit vom Ende der Anzeige bis zur ersten Eingabe und danach von Eingabe zu Eingabe, nur für richtige Eingaben. Sie enthält die Verzögerung des Geräts und ist nur auf demselben Gerät vergleichbar.',
    total: 'Zeit vom Start bis zum Ende der Übung, einschließlich der Anzeige der Folgen.',
  },
  tips: {
    few: 'Diesmal ist keine Folge gelungen. Probiere eine kürzere Startlänge (1 oder 2), eine längere Leuchtdauer oder ein kleineres Raster.',
    chunk: 'Gliedere die Folge in Gruppen oder Wege, zum Beispiel „Ecke – Mitte – Rand“ oder eine Linie. Das ist oft leichter, als sich jedes Feld einzeln zu merken.',
    harder: 'Du triffst fast alles. Wenn du magst, mach genau eine Einstellung schwerer: ein größeres Raster, eine kürzere Leuchtdauer oder „Komplett neue Folge“.',
    slow: 'Du überlegst bei vielen Eingaben lange. Das ist in Ordnung. Bei Unsicherheit helfen eine längere Leuchtdauer oder ein kleineres Raster.',
    compare: 'Vergleiche diesen Durchlauf nur mit Durchläufen, die dieselben Einstellungen hatten – auf diesem Gerät. Ruhe und wenig Ablenkung machen den Vergleich fairer.',
  },
  feedback: {
    watch: 'Merken',
    yours: 'Du bist dran',
    right: 'Richtig',
    wrong: 'Falsch – das richtige Feld ist markiert',
    label: 'Länge {n} · Fehler {e}',
    labelMax: 'Länge {n} · Fehler {e} von {m}',
    moreTitle: 'Weitere Werte',
    moreNote: 'Die Zeiten enthalten auch die Verzögerung von Bildschirm und Touch-Sensor. Vergleiche sie nur mit deinen eigenen Werten auf diesem Gerät.',
  },
  progression: [
    'Leichter: kleineres Raster (zum Beispiel 2 × 3 oder 3 × 3), längere Leuchtdauer (900 bis 1.200 ms), nach einem Fehler „Eine Länge kürzer“.',
    'Schwerer: größeres Raster (4 × 4 oder 5 × 5), kürzere Leuchtdauer (400 bis 500 ms), kurze Pausen, „Komplett neue Folge“, nach einem Fehler „Von vorn beginnen“. Kürzer als 400 ms leuchtet kein Feld.',
    'Ändere immer nur eine Einstellung auf einmal und vergleiche nur Läufe mit gleichen Einstellungen. Eine Zahl, die „normal“ wäre, gibt es hier nicht.',
    'Unsere Faustregel (keine Vorgabe aus der Forschung): Hast du in mehreren Durchläufen hintereinander über 90 % richtige Eingaben, mach eine Einstellung schwerer.',
  ],
  cautions: [
    'Die Felder leuchten nacheinander auf, weich und nie schneller als etwa zweieinhalb Wechsel pro Sekunde. Bist du lichtempfindlich oder hattest du schon einmal einen epileptischen Anfall, verzichte bitte darauf.',
    'Sitz bequem und schalte Ablenkungen aus (zum Beispiel Benachrichtigungen). Ausgeruht lassen sich Läufe besser miteinander vergleichen.',
    'Dein Blick wird nicht gemessen. Du darfst die Felder ansehen, wie es dir passt, auch auf die Mitte des Rasters schauen.',
    'Große Raster werden auf kleinen Bildschirmen kleiner gezeichnet; die Felder bleiben antippbar.',
    'Mehrere Fehler hintereinander? Mach eine Pause oder wähle eine leichtere Einstellung. Bei Kopfschmerzen oder Augenbeschwerden: aufhören.',
  ],
  params: {
    rows: {
      label: 'Zeilen',
      hint: 'Zahl der Zeilen im Raster. Mehr Felder machen die Aufgabe schwerer.',
      short: '{v} Zeile|{v} Zeilen',
    },
    cols: {
      label: 'Spalten',
      hint: 'Zahl der Spalten im Raster. Mehr Felder machen die Aufgabe schwerer.',
      short: '{v} Spalte|{v} Spalten',
    },
    startLength: {
      label: 'Startlänge der Folge',
      hint: 'Länge der ersten Folge. 2 ist ein guter Einstieg, größere Werte sind etwas für später.',
      short: 'Start mit {v}',
    },
    showMs: {
      label: 'Leuchtdauer je Feld',
      hint: 'Wie lange jedes Feld leuchtet. Kürzere Zeiten sind schwerer. Kürzer als 400 Millisekunden geht nicht, damit das Aufleuchten ruhig bleibt.',
    },
    gapMs: {
      label: 'Pause zwischen den Feldern',
      hint: 'Pause in Millisekunden zwischen zwei aufleuchtenden Feldern. Kürzere Pausen sind schwerer zu verfolgen.',
    },
    growth: {
      label: 'Nächste Folge',
      hint: '„Alte Folge plus ein Feld“: Dieselbe Folge wird um ein Feld länger, du kannst auf Bekanntem aufbauen. „Komplett neue Folge“: Jedes Mal erscheint eine neue Folge, das ist schwerer.',
      options: { extend: 'Alte Folge plus ein Feld', fresh: 'Komplett neue Folge' },
    },
    onError: {
      label: 'Nach einem Fehler',
      hint: 'Was nach einem Fehler passiert: gleiche Länge mit neuer Folge, eine Länge kürzer (nie unter der Startlänge) oder von vorn mit der Startlänge.',
      options: { same: 'Gleiche Länge, neue Folge', down: 'Eine Länge kürzer', restart: 'Von vorn beginnen' },
    },
    maxErrors: {
      label: 'Ende nach Fehlern',
      hint: 'Nach so vielen Fehlern endet die Übung. 0 heißt unbegrenzt – dann endet sie bei der Ziellänge, nach dem Zeitlimit oder wenn du abbrichst.',
    },
    maxLength: {
      label: 'Ende bei Länge',
      hint: 'Hast du eine Folge dieser Länge richtig wiederholt, endet die Übung.',
    },
    durationS: {
      label: 'Zeitlimit',
      hint: 'Optionales Zeitlimit für die ganze Übung in Sekunden. 0 heißt: kein Limit. Die laufende Runde wird noch zu Ende gespielt.',
    },
  },
};

export const it: ExerciseTexts = {
  title: 'Memoria di sequenze',
  tagline: 'I campi si illuminano uno dopo l’altro – toccali nello stesso ordine.',
  steps: [
    'Guarda come i campi si illuminano uno dopo l’altro.',
    'Poi toccali esattamente nello stesso ordine.',
    'Giusto? Allora la sequenza successiva è più lunga.',
  ],
  why:
    'Qui ricordi quali campi si illuminano e in quale ordine – un compito per ricordare i luoghi, simile al compito dei blocchetti di Corsi. Il numero di posizioni che si possono tenere a mente insieme è limitato; raggruppare (“angolo, centro, bordo”) può aiutare. Non è dimostrato che l’esercizio si trasferisca alla vita quotidiana, alla scuola o al lavoro.',
  goodFor: ['Ricordare', 'Ordine', 'Luoghi'],
  captions: {
    ready: 'Tra poco si illuminano dei campi',
    watch: 'Ricorda l’ordine',
    yours: 'Toccali nello stesso ordine',
    longer: 'Giusto – la sequenza si allunga',
    again: 'Ora un campo in più',
    count: 'Conta: la tua sequenza più lunga',
  },
  metrics: {
    span: 'Sequenza giusta più lunga',
    rounds: 'Sequenze ripetute giuste',
    errors: 'Errori',
    accuracy: 'Tocchi giusti',
    rt_mean: 'Tempo per tocco giusto (media)',
    total: 'Tempo totale',
  },
  metricHints: {
    span: 'Lunghezza della sequenza più lunga che hai ripetuto per intero senza errori. È il valore principale. Dipende molto dalle impostazioni (griglia, durata della luce, regole), quindi si confrontano solo giri con le stesse impostazioni.',
    rounds: 'Quante sequenze hai ripetuto giuste in totale.',
    errors: 'Quante volte hai toccato un campo sbagliato. Ogni errore termina il turno in corso.',
    accuracy: 'Quota dei tocchi giusti su tutti i tocchi (sui campi).',
    rt_mean: 'Tempo medio dalla fine della presentazione al primo tocco e poi da tocco a tocco, solo per i tocchi giusti. Comprende il ritardo del dispositivo ed è confrontabile solo sullo stesso dispositivo.',
    total: 'Tempo dall’inizio alla fine dell’esercizio, compresa la presentazione delle sequenze.',
  },
  tips: {
    few: 'Questa volta nessuna sequenza è riuscita. Prova una lunghezza iniziale più breve (1 o 2), una luce più lunga o una griglia più piccola.',
    chunk: 'Dividi la sequenza in gruppi o percorsi, per esempio “angolo – centro – bordo” o una linea. Spesso è più facile che ricordare ogni campo da solo.',
    harder: 'Colpisci quasi tutto. Se vuoi, rendi più difficile una sola impostazione: una griglia più grande, una luce più breve o “Sequenza tutta nuova”.',
    slow: 'Con molti tocchi rifletti a lungo. Va bene. Se sei incerto aiutano una luce più lunga o una griglia più piccola.',
    compare: 'Confronta questo giro solo con giri che avevano le stesse impostazioni – su questo dispositivo. Calma e poche distrazioni rendono il confronto più corretto.',
  },
  feedback: {
    watch: 'Ricorda',
    yours: 'Tocca a te',
    right: 'Giusto',
    wrong: 'Sbagliato – il campo giusto è segnato',
    label: 'Lunghezza {n} · Errori {e}',
    labelMax: 'Lunghezza {n} · Errori {e} su {m}',
    moreTitle: 'Altri valori',
    moreNote: 'I tempi comprendono anche il ritardo di schermo e sensore touch. Confrontali solo con i tuoi valori su questo dispositivo.',
  },
  progression: [
    'Più facile: griglia più piccola (per esempio 2 × 3 o 3 × 3), luce più lunga (da 900 a 1.200 ms), dopo un errore “Una lunghezza in meno”.',
    'Più difficile: griglia più grande (4 × 4 o 5 × 5), luce più breve (da 400 a 500 ms), pause brevi, “Sequenza tutta nuova”, dopo un errore “Ricominciare da capo”. Nessun campo si illumina per meno di 400 ms.',
    'Cambia sempre una sola impostazione alla volta e confronta solo giri con le stesse impostazioni. Qui non esiste un numero “normale”.',
    'La nostra regola pratica (non è un’indicazione della ricerca): se in più giri di seguito hai oltre il 90 % di tocchi giusti, rendi più difficile un’impostazione.',
  ],
  cautions: [
    'I campi si illuminano uno dopo l’altro, in modo morbido e mai più veloce di circa due cambi e mezzo al secondo. Se sei sensibile alla luce o hai già avuto una crisi epilettica, rinuncia, per favore.',
    'Siediti comodo e spegni le distrazioni (per esempio le notifiche). Da riposati i giri si confrontano meglio.',
    'Il tuo sguardo non viene misurato. Puoi guardare i campi come preferisci, anche al centro della griglia.',
    'Sugli schermi piccoli le griglie grandi vengono disegnate più piccole; i campi restano toccabili.',
    'Più errori di seguito? Fai una pausa o scegli un’impostazione più facile. In caso di mal di testa o disturbi agli occhi: smetti.',
  ],
  params: {
    rows: {
      label: 'Righe',
      hint: 'Numero di righe della griglia. Più campi rendono il compito più difficile.',
      short: '{v} riga|{v} righe',
    },
    cols: {
      label: 'Colonne',
      hint: 'Numero di colonne della griglia. Più campi rendono il compito più difficile.',
      short: '{v} colonna|{v} colonne',
    },
    startLength: {
      label: 'Lunghezza iniziale',
      hint: 'Lunghezza della prima sequenza. 2 è un buon inizio, valori più grandi sono per dopo.',
      short: 'Inizio con {v}',
    },
    showMs: {
      label: 'Durata della luce per campo',
      hint: 'Per quanto tempo ogni campo resta illuminato. Tempi più brevi sono più difficili. Meno di 400 millisecondi non è possibile, perché la luce resti calma.',
    },
    gapMs: {
      label: 'Pausa tra i campi',
      hint: 'Pausa in millisecondi tra due campi che si illuminano. Pause più brevi sono più difficili da seguire.',
    },
    growth: {
      label: 'Sequenza successiva',
      hint: '“Vecchia sequenza più un campo”: la stessa sequenza si allunga di un campo, puoi partire da ciò che conosci. “Sequenza tutta nuova”: ogni volta compare una sequenza nuova, è più difficile.',
      options: { extend: 'Vecchia sequenza più un campo', fresh: 'Sequenza tutta nuova' },
    },
    onError: {
      label: 'Dopo un errore',
      hint: 'Cosa succede dopo un errore: stessa lunghezza con sequenza nuova, una lunghezza in meno (mai sotto la lunghezza iniziale) o da capo con la lunghezza iniziale.',
      options: { same: 'Stessa lunghezza, sequenza nuova', down: 'Una lunghezza in meno', restart: 'Ricominciare da capo' },
    },
    maxErrors: {
      label: 'Fine dopo errori',
      hint: 'Dopo tanti errori l’esercizio finisce. 0 significa illimitato: allora finisce alla lunghezza obiettivo, dopo il limite di tempo o quando interrompi.',
    },
    maxLength: {
      label: 'Fine alla lunghezza',
      hint: 'Se hai ripetuto giusta una sequenza di questa lunghezza, l’esercizio finisce.',
    },
    durationS: {
      label: 'Limite di tempo',
      hint: 'Limite di tempo facoltativo per tutto l’esercizio, in secondi. 0 significa nessun limite. Il turno in corso viene portato a termine.',
    },
  },
};
