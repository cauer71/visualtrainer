import type { ExerciseTexts } from '../../core/types';

// Stil: du-Form, einfache Sprache, Fachwörter erklärt
// (Hick-Hyman-Gesetz nur in der Wissenschaftsseite, Median/Streuung in den Erklärungen der Werte).
// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-, Heil- oder
// Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst auf diesem Gerät.
// `short` in params: Muster für die Kurzfassung der Einstellungen auf der Ergebnisseite ({v} = Wert; „|“ trennt die
// Form für genau 1 von der Form für andere Zahlen).

export const de: ExerciseTexts = {
  title: 'Wahlreaktion',
  tagline: 'Ein Zeichen erscheint – tippe schnell die passende Taste.',
  steps: [
    'In der Mitte erscheint ein Zeichen oder eine Farbe.',
    'Tippe unten die passende Taste – so schnell du kannst.',
    'Zu früh getippt zählt nicht, zu spät zählt als verpasst.',
  ],
  why:
    'Hier ordnest du einem Zeichen schnell die passende Taste zu. Je mehr Tasten es gibt, desto länger dauert die Entscheidung im Durchschnitt, und wer schneller antwortet, macht tendenziell mehr Fehler – deshalb zählen Genauigkeit und Zeit zusammen. Die Zeit wird am Tablet etwas zu lang gemessen; vergleiche sie nur mit dir selbst. Ob sich das Üben auf Alltag, Sport oder Verkehr überträgt, ist nicht belegt.',
  goodFor: ['Entscheiden', 'Zuordnen', 'Schnell antworten'],
  captions: {
    watch: 'Gleich erscheint ein Zeichen',
    tap: 'Tippe die passende Taste',
    early: 'Zu früh getippt? Das zählt nicht',
    next: 'Danach kommt das nächste Zeichen',
  },
  metrics: {
    correct: 'Richtige Antworten',
    wrong: 'Falsche Antworten',
    omissions: 'Keine Antwort',
    early: 'Zu früh getippt',
    accuracy: 'Genauigkeit',
    rt_mean: 'Reaktionszeit (Mittel)',
    rt_median: 'Reaktionszeit (Median)',
    rt_sd: 'Reaktionszeit (Streuung)',
  },
  metricHints: {
    correct: 'So viele Zeichen hast du mit der richtigen Taste beantwortet.',
    wrong: 'Antworten mit der falschen Taste. Sie zählen als Fehler, auch wenn sie schnell waren.',
    omissions: 'Zeichen, bei denen du innerhalb der Antwortzeit keine Taste getippt hast.',
    early: 'Tipps, bevor ein Zeichen erschien oder in den ersten 100 Millisekunden danach. Das kann noch keine Antwort auf das Zeichen sein; sie werden nicht gewertet.',
    accuracy: 'Anteil der richtigen Antworten an allen gezeigten Zeichen (falsche und verpasste zählen als nicht richtig). Der Wert hängt von den Einstellungen ab: Mit mehr Tasten oder kürzerer Antwortzeit wird er meist kleiner.',
    rt_mean: 'Durchschnittliche Zeit vom Erscheinen des Zeichens bis zur richtigen Antwort. Sie enthält die Verzögerung von Bildschirm und Touch-Sensor und ist nur auf demselben Gerät vergleichbar.',
    rt_median: 'Der mittlere Wert, wenn man alle Zeiten der Größe nach ordnet: Die Hälfte war schneller, die Hälfte langsamer. Einzelne Ausreißer ziehen ihn weniger als den Durchschnitt.',
    rt_sd: 'Wie stark deine Zeiten schwanken (Standardabweichung). Kleinere Werte bedeuten gleichmäßigeres Reagieren.',
  },
  tips: {
    few: 'Diesmal gab es keine richtige Antwort. Probiere weniger Tasten (2 oder 3) und eine längere Antwortzeit (2 Sekunden).',
    early: 'Du tippst öfter, bevor das Zeichen da ist. Warte kurz und tippe erst, wenn du es siehst – zu frühe Tipps zählen nicht.',
    wrong: 'Einige Male war es die falsche Taste. Schau kurz genau auf Farbe und Zeichen, bevor du tippst: Ein Fehler kostet mehr als ein paar Millisekunden.',
    slow: 'Oft war die Zeit um. Halte den Finger bereit über der Mitte der Tasten oder stell eine längere Antwortzeit ein – und ändere immer nur eine Einstellung.',
    harder: 'Du antwortest fast immer richtig. Wenn du magst, mach genau eine Einstellung schwerer, zum Beispiel mehr Tasten oder eine kürzere Antwortzeit.',
    steady: 'Deine Reaktionszeiten schwanken ziemlich. Bleib locker, atme ruhig und halte die Hand über der Mitte der Tasten bereit.',
    compare: 'Vergleiche diesen Durchlauf nur mit Durchläufen, die dieselben Einstellungen hatten – auf diesem Gerät und mit derselben Hand.',
  },
  feedback: {
    label: '{n} / {total}',
    early: 'Zu früh',
    slow: 'Zu langsam',
    moreTitle: 'Weitere Werte',
    moreNote: 'Die Reaktionszeit enthält auch die Verzögerung von Bildschirm und Touch-Sensor. Vergleiche sie nur mit deinen eigenen Werten auf diesem Gerät.',
  },
  progression: [
    'Leichter: 2 oder 3 Tasten, lange Antwortzeit (1500 Millisekunden und mehr), Farben.',
    'Schwerer: 5 oder 6 Tasten, kürzere Antwortzeit (600 bis 900 Millisekunden), Formen, kürzere und stärker schwankende Wartezeiten.',
    'Mit mehr Tasten dauert die Entscheidung länger. Das ist zu erwarten und kein Zeichen von Verschlechterung.',
    'Unsere Faustregel (keine Vorgabe aus der Forschung): Triffst du in mehreren Durchläufen hintereinander über 95 %, mach eine Einstellung schwerer; unter 80 % mach sie leichter. Ändere immer nur eine Einstellung auf einmal.',
  ],
  cautions: [
    'Stell den Bildschirm einmal ein („Bildschirm kalibrieren“), damit die Größe des Zeichens in Zentimetern stimmt. Auf kleinen Bildschirmen wird es verkleinert, damit es ins Bild passt.',
    'Sitz bequem, die Hand locker über der Mitte der Tasten. Schau auf die Mitte des Bildes, nicht auf die Tasten – ihre Plätze lernst du nach wenigen Durchgängen.',
    'Bei „Farben“ trägt jede Farbe zusätzlich ein Zeichen (Kreis, Ring, Quadrat …), sodass du nicht allein auf die Farbe angewiesen bist. Fallen dir Farben schwer, wähle „Formen“.',
    'Das Zeichen erscheint plötzlich und wechselt jedes Mal. Bist du lichtempfindlich oder hattest du schon einmal einen epileptischen Anfall, verzichte bitte darauf oder sprich vorher mit deiner Ärztin oder deinem Arzt.',
    'Bei Ermüdung oder nachlassender Konzentration mach eine Pause; die Werte werden dann ungenauer.',
  ],
  params: {
    trials: {
      label: 'Anzahl der Zeichen',
      hint: 'Wie viele Zeichen es im Durchlauf gibt. Die Zeichen sind gleichmäßig auf die Tasten verteilt. Für verlässliche Durchschnittswerte sind mindestens 30 sinnvoll.',
      short: '{v} Zeichen',
    },
    options: {
      label: 'Anzahl der Tasten',
      hint: 'Wie viele Farben oder Formen es gibt und damit wie viele Tasten. Mehr Tasten verlangen längere Entscheidungen.',
      short: '{v} Tasten',
    },
    stimulus: {
      label: 'Zeichenart',
      hint: '„Farben“: ein farbiger Kreis, dazu ein kleines Zeichen darin – tippe die Taste mit derselben Farbe. „Formen“: ein weißes Zeichen ohne Farbe – tippe die Taste mit derselben Form.',
      options: { color: 'Farben (mit Zeichen)', shape: 'Formen (ohne Farbe)' },
    },
    stimulusMs: {
      label: 'Antwortzeit je Zeichen',
      hint: 'Wie lange du Zeit hast, bevor die Antwort als „keine Antwort“ gilt. Kürzere Zeiten erhöhen den Zeitdruck.',
    },
    waitMinMs: {
      label: 'Wartezeit mindestens',
      hint: 'Kürzeste Wartezeit zwischen zwei Zeichen. Ist die höchste Wartezeit kleiner, gilt die kürzeste für beide.',
    },
    waitMaxMs: {
      label: 'Wartezeit höchstens',
      hint: 'Längste Wartezeit zwischen zwei Zeichen. Die tatsächliche Wartezeit liegt zufällig dazwischen, damit du den Zeitpunkt nicht erraten kannst.',
    },
    sizeCm: {
      label: 'Größe des Zeichens',
      hint: 'Größe des Zeichens in der Mitte in Zentimetern. Auf kleinen Bildschirmen wird es bei Bedarf verkleinert.',
      short: '{v} cm',
    },
    sound: {
      label: 'Ton',
      hint: 'Kurzer Ton bei jeder Antwort (hoch bei richtig, tief bei falsch). Der Ton ändert die Vergleichbarkeit nicht.',
      options: { no: 'Aus', yes: 'An' },
    },
  },
};

export const it: ExerciseTexts = {
  title: 'Reazione di scelta',
  tagline: 'Compare un segno – tocca in fretta il tasto giusto.',
  steps: [
    'Al centro compare un segno o un colore.',
    'Tocca in basso il tasto giusto – il più in fretta possibile.',
    'Troppo presto non conta, troppo tardi vale come mancato.',
  ],
  why:
    'Qui abbini in fretta a un segno il tasto giusto. Più tasti ci sono, più a lungo dura in media la decisione, e chi risponde più in fretta tende a fare più errori – per questo contano insieme precisione e tempo. Sul tablet il tempo viene misurato un po’ troppo lungo; confrontalo solo con te stesso. Non è dimostrato che l’allenamento si trasferisca alla vita quotidiana, allo sport o al traffico.',
  goodFor: ['Decidere', 'Abbinare', 'Rispondere in fretta'],
  captions: {
    watch: 'Tra poco compare un segno',
    tap: 'Tocca il tasto giusto',
    early: 'Troppo presto? Non conta',
    next: 'Poi arriva il segno successivo',
  },
  metrics: {
    correct: 'Risposte giuste',
    wrong: 'Risposte sbagliate',
    omissions: 'Nessuna risposta',
    early: 'Toccato troppo presto',
    accuracy: 'Precisione',
    rt_mean: 'Tempo di reazione (media)',
    rt_median: 'Tempo di reazione (mediana)',
    rt_sd: 'Tempo di reazione (variazione)',
  },
  metricHints: {
    correct: 'Quanti segni hai risposto con il tasto giusto.',
    wrong: 'Risposte con il tasto sbagliato. Contano come errore, anche se erano veloci.',
    omissions: 'Segni per cui non hai toccato nessun tasto entro il tempo di risposta.',
    early: 'Tocchi prima che comparisse un segno o nei primi 100 millisecondi dopo. Non possono ancora essere una risposta al segno; non vengono valutati.',
    accuracy: 'Quota delle risposte giuste su tutti i segni mostrati (sbagliate e mancate contano come non giuste). Il valore dipende dalle impostazioni: con più tasti o tempo di risposta più breve di solito è più basso.',
    rt_mean: 'Tempo medio da quando compare il segno alla risposta giusta. Comprende il ritardo di schermo e sensore touch ed è confrontabile solo sullo stesso dispositivo.',
    rt_median: 'Il valore centrale quando si ordinano tutti i tempi: metà erano più veloci, metà più lenti. I valori anomali lo influenzano meno della media.',
    rt_sd: 'Quanto variano i tuoi tempi (deviazione standard). Valori più piccoli indicano una reazione più regolare.',
  },
  tips: {
    few: 'Stavolta nessuna risposta giusta. Prova meno tasti (2 o 3) e un tempo di risposta più lungo (2 secondi).',
    early: 'Tocchi spesso prima che compaia il segno. Aspetta un momento e tocca solo quando lo vedi – i tocchi troppo presto non contano.',
    wrong: 'Alcune volte era il tasto sbagliato. Guarda un attimo con attenzione colore e segno prima di toccare: un errore costa più di qualche millisecondo.',
    slow: 'Spesso il tempo era scaduto. Tieni il dito pronto sopra il centro dei tasti o imposta un tempo di risposta più lungo – e cambia sempre una sola impostazione.',
    harder: 'Rispondi quasi sempre in modo giusto. Se vuoi, rendi più difficile una sola impostazione, per esempio più tasti o un tempo di risposta più breve.',
    steady: 'I tuoi tempi di reazione variano parecchio. Resta rilassato, respira con calma e tieni la mano pronta sopra il centro dei tasti.',
    compare: 'Confronta questo giro solo con giri che avevano le stesse impostazioni – su questo dispositivo e con la stessa mano.',
  },
  feedback: {
    label: '{n} / {total}',
    early: 'Troppo presto',
    slow: 'Troppo lento',
    moreTitle: 'Altri valori',
    moreNote: 'Il tempo di reazione comprende anche il ritardo di schermo e sensore touch. Confrontalo solo con i tuoi valori su questo dispositivo.',
  },
  progression: [
    'Più facile: 2 o 3 tasti, tempo di risposta lungo (1500 millisecondi e più), colori.',
    'Più difficile: 5 o 6 tasti, tempo di risposta più breve (da 600 a 900 millisecondi), forme, attese più brevi e più variabili.',
    'Con più tasti la decisione dura più a lungo. È prevedibile e non è un segno di peggioramento.',
    'La nostra regola pratica (non è un’indicazione della ricerca): se in più giri di seguito sei sopra il 95 %, rendi più difficile un’impostazione; sotto l’80 % rendila più facile. Cambia sempre una sola impostazione alla volta.',
  ],
  cautions: [
    'Calibra lo schermo una volta (“Calibra lo schermo”), così la dimensione del segno in centimetri è corretta. Sugli schermi piccoli viene ridotto perché stia nell’immagine.',
    'Siediti comodo, con la mano rilassata sopra il centro dei tasti. Guarda il centro dell’immagine, non i tasti – i loro posti li impari dopo pochi giri.',
    'Con “Colori” ogni colore porta in più un segno (cerchio, anello, quadrato …), così non dipendi solo dal colore. Se i colori ti riescono difficili, scegli “Forme”.',
    'Il segno compare all’improvviso e cambia ogni volta. Se sei fotosensibile o hai già avuto una crisi epilettica, non eseguire l’esercizio oppure parlane prima con il tuo medico.',
    'In caso di stanchezza o concentrazione che cala fai una pausa; i valori diventano allora meno precisi.',
  ],
  params: {
    trials: {
      label: 'Numero di segni',
      hint: 'Quanti segni ci sono nel giro. I segni sono distribuiti in modo uniforme sui tasti. Per medie affidabili sono sensati almeno 30.',
      short: '{v} segni',
    },
    options: {
      label: 'Numero di tasti',
      hint: 'Quanti colori o forme ci sono e quindi quanti tasti. Più tasti richiedono decisioni più lunghe.',
      short: '{v} tasti',
    },
    stimulus: {
      label: 'Tipo di segno',
      hint: '“Colori”: un cerchio colorato con un piccolo segno dentro – tocca il tasto con lo stesso colore. “Forme”: un segno bianco senza colore – tocca il tasto con la stessa forma.',
      options: { color: 'Colori (con segno)', shape: 'Forme (senza colore)' },
    },
    stimulusMs: {
      label: 'Tempo di risposta per segno',
      hint: 'Quanto tempo hai prima che la risposta valga come “nessuna risposta”. Tempi più brevi aumentano la pressione del tempo.',
    },
    waitMinMs: {
      label: 'Attesa minima',
      hint: 'Attesa più breve tra due segni. Se l’attesa massima è più piccola, vale la più breve per entrambe.',
    },
    waitMaxMs: {
      label: 'Attesa massima',
      hint: 'Attesa più lunga tra due segni. L’attesa effettiva è casuale tra le due, così non puoi indovinare il momento.',
    },
    sizeCm: {
      label: 'Dimensione del segno',
      hint: 'Dimensione del segno al centro in centimetri. Sugli schermi piccoli viene ridotto se necessario.',
      short: '{v} cm',
    },
    sound: {
      label: 'Suono',
      hint: 'Suono breve a ogni risposta (acuto se giusta, grave se sbagliata). Il suono non cambia la confrontabilità.',
      options: { no: 'No', yes: 'Sì' },
    },
  },
};
