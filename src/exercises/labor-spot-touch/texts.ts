import type { ExerciseTexts } from '../../core/types';

// Quelle: Labor-Prototyp (help/spots.js), für Blickfit geglättet: du-Form, einfache Sprache, Fachwörter erklärt
// (Fixationskreuz → „Kreuz in der Mitte“, Peripherie → „Rand“, Median/Streuung erklärt).
// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-, Heil- oder
// Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst auf diesem Gerät.
// `short` in params: Vorlage für die Kurzfassung der Einstellungen auf der Ergebnisseite (nur Zahlen; {v} = Wert;
// „|“ trennt die Form für genau 1 von der Form für andere Zahlen).

export const de: ExerciseTexts = {
  title: 'Spot-Touch',
  tagline: 'Punkte erscheinen zufällig – tippe sie so schnell wie möglich an.',
  steps: [
    'Etwa 50 cm Abstand, die Hand locker über der Fläche.',
    'Tippe jeden Punkt an, sobald er erscheint.',
    'Zu spät? Der Punkt verschwindet und zählt als verpasst.',
  ],
  why:
    'Hier übst du, auf plötzlich auftauchende Ziele schnell mit der Hand zu reagieren – Auge und Hand arbeiten zusammen. Ein Teil der Zeit geht für Sehen und Entscheiden drauf, ein Teil für die Handbewegung; kleinere und weiter entfernte Punkte dauern länger. Ob sich das Üben auf Alltag, Sport oder Verkehr überträgt, ist nicht belegt.',
  goodFor: ['Reaktion', 'Auge und Hand', 'Zielen'],
  captions: {
    wait: 'Gleich erscheint ein Punkt',
    appear: 'Antippen – so schnell du kannst',
    next: 'Gleich folgt der nächste Punkt',
    late: 'Zu spät? Dann verschwindet er',
    count: 'Gezählt werden deine Treffer',
  },
  metrics: {
    hits: 'Getroffene Punkte',
    misses: 'Verpasste Punkte',
    stray: 'Fehltipps (daneben)',
    accuracy: 'Trefferquote',
    rt_mean: 'Reaktionszeit (Mittel)',
    rt_median: 'Reaktionszeit (Median)',
    rt_sd: 'Reaktionszeit (Streuung)',
    rate: 'Treffer pro Minute',
  },
  metricHints: {
    hits: 'So viele Punkte hast du rechtzeitig getroffen. Der Wert hängt stark von den Einstellungen ab (Größe, Sichtbarkeit, Pause).',
    misses: 'Punkte, die verschwunden sind, bevor du sie berührt hast. Viele verpasste Punkte heißen: Die Einstellung lässt dir zu wenig Zeit.',
    stray: 'Berührungen, die keinen Punkt getroffen haben. Viele Fehltipps passieren oft bei hastigem oder ungenauem Zielen.',
    accuracy: 'Anteil der getroffenen an allen gezeigten Punkten (getroffene plus verpasste). Fehltipps sind darin nicht enthalten.',
    rt_mean: 'Durchschnittliche Zeit vom Erscheinen eines Punktes bis zur Berührung, nur für getroffene Punkte. Sie enthält die Verzögerung des Geräts und ist nur auf demselben Gerät vergleichbar.',
    rt_median: 'Der mittlere Wert, wenn man alle Zeiten der Größe nach ordnet: Die Hälfte war schneller, die Hälfte langsamer. Einzelne Ausreißer ziehen ihn weniger als den Durchschnitt.',
    rt_sd: 'Wie stark deine Zeiten schwanken (Standardabweichung). Kleinere Werte bedeuten gleichmäßigeres Reagieren.',
    rate: 'Getroffene Punkte pro Minute. Die Pausen zählen mit; vergleichbar nur bei gleicher Pause und Sichtbarkeit.',
  },
  tips: {
    stray: 'Du tippst öfter neben die Punkte. Erst genau zielen, dann schnell: Wer hastig tippt, verliert durch Fehltipps oft mehr Zeit, als er gewinnt.',
    misses: 'Viele Punkte sind verschwunden, bevor du sie erreicht hast. Mach es dir leichter: größere Punkte oder längere Sichtbarkeit – und ändere immer nur eine Einstellung.',
    harder: 'Du triffst fast alle Punkte. Wenn du magst, mach genau eine Einstellung schwerer, zum Beispiel kleinere Punkte oder kürzere Sichtbarkeit.',
    steady: 'Deine Reaktionszeiten schwanken ziemlich. Bleib locker, atme ruhig und halte die Hand wie zum Sprung über der Fläche bereit.',
    compare: 'Vergleiche diesen Durchlauf nur mit Durchläufen, die dieselben Einstellungen hatten – auf diesem Gerät und mit derselben Hand.',
    few: 'Diesmal gab es keinen Treffer. Probiere größere Punkte (7 cm) und eine längere Sichtbarkeit (3 s).',
  },
  feedback: {
    time: '{s} s',
    moreTitle: 'Weitere Werte',
    moreNote: 'Die Reaktionszeit enthält auch die Verzögerung von Bildschirm und Touch-Sensor. Vergleiche sie nur mit deinen eigenen Werten auf diesem Gerät.',
  },
  progression: [
    'Leichter: größere Punkte (7 bis 9 cm), längere Sichtbarkeit (2 bis 3 s), nur ein Punkt, ganze Fläche, längere Pause.',
    'Schwerer: kleinere Punkte (3 bis 4 cm), kürzere Sichtbarkeit (0,8 bis 1 s), mehrere Punkte gleichzeitig, kurze oder keine Pause.',
    'Rand: erst „Ganze Fläche“ mit dem Kreuz in der Mitte, dann „Nur Rand“. Geh erst weiter, wenn du fast alle Punkte triffst.',
    'Unsere Faustregel (keine Vorgabe aus der Forschung): Triffst du in drei Durchläufen hintereinander über 90 %, mach eine Einstellung schwerer; unter 70 % mach sie leichter. Ändere immer nur eine Einstellung auf einmal.',
  ],
  cautions: [
    'Stell den Bildschirm einmal ein („Bildschirm kalibrieren“), damit die Größen in Zentimetern stimmen.',
    'Sitz etwa 50 bis 60 cm vom Bildschirm entfernt, sodass du jede Stelle bequem mit dem Finger erreichst. Halte die Hand locker über der Fläche und stütze sie nicht auf.',
    'Für Vergleiche: immer dieselbe Hand, derselbe Abstand, dasselbe Gerät. Ergebnisse mit anderen Einstellungen werden nicht miteinander verglichen.',
    'Mit dem Kreuz in der Mitte bleibt dein Blick auf dem Kreuz, die Punkte siehst du aus dem Augenwinkel. Ob du wirklich nicht hinschaust, kann die App nicht messen.',
    'Die Punkte erscheinen und verschwinden. Bei sehr kurzer Sichtbarkeit und mehreren Punkten kann das unruhig wirken. Bist du lichtempfindlich oder hattest du schon einmal einen epileptischen Anfall, verzichte bitte darauf.',
    'Lockere Finger und Handgelenk alle paar Minuten und wechsle die Hand. Bei Schwindel oder Augenbeschwerden: Pause machen.',
  ],
  params: {
    durationS: {
      label: 'Dauer',
      hint: 'Wie lange der Durchlauf dauert. 30 bis 60 Sekunden zum Ausprobieren, 2 bis 5 Minuten zum Üben. Bei langen Durchläufen kann die Konzentration nachlassen.',
    },
    diameterCm: {
      label: 'Größe der Punkte',
      hint: 'Durchmesser der Punkte in Zentimetern. Kleinere Punkte verlangen genaueres Zielen und sind schwerer. 5 cm ist ein guter Startwert.',
      short: '{v} cm',
    },
    persistenceS: {
      label: 'Sichtbarkeit je Punkt',
      hint: 'Wie lange ein Punkt sichtbar bleibt, bevor er als verpasst gilt. Kürzere Zeiten erhöhen den Zeitdruck.',
      short: '{v} s',
    },
    simultaneous: {
      label: 'Gleichzeitige Punkte',
      hint: 'Wie viele Punkte gleichzeitig zu sehen sind. Bei mehreren musst du entscheiden, welchen du zuerst nimmst – das erschwert die Aufgabe deutlich.',
      short: '{v} Punkt|{v} Punkte',
    },
    gapMs: {
      label: 'Pause bis zum nächsten Punkt',
      hint: 'Pause in Millisekunden zwischen einem Treffer und dem nächsten Punkt. Eine kurze Pause erhöht das Tempo, eine längere gibt Zeit, die Hand zurückzuführen.',
    },
    zone: {
      label: 'Bereich',
      hint: '„Ganze Fläche“: überall. „Nur Rand“: nur weit weg von der Mitte. „Nur Mitte“: nur im mittleren Bereich. „Nur Rand“ passt besonders gut zum Kreuz in der Mitte.',
      options: { all: 'Ganze Fläche', periphery: 'Nur Rand', center: 'Nur Mitte' },
    },
    fixation: {
      label: 'Kreuz in der Mitte',
      hint: 'Zeigt ein kleines Kreuz in der Mitte und hält die Punkte davon fern. Dein Blick soll auf dem Kreuz bleiben; die Punkte nimmst du aus dem Augenwinkel wahr.',
      options: { no: 'Nein', yes: 'Ja' },
    },
    sound: {
      label: 'Ton',
      hint: 'Kurzer Ton bei einem Treffer (hoch) und bei einem Fehltipp (tief). Hilft beim Lernen; für reine Messungen kann er aus bleiben. Der Ton ändert die Vergleichbarkeit nicht.',
      options: { no: 'Aus', yes: 'An' },
    },
  },
};

export const it: ExerciseTexts = {
  title: 'Spot-Touch',
  tagline: 'I punti compaiono a caso – toccali il più in fretta possibile.',
  steps: [
    'Circa 50 cm di distanza, mano rilassata sopra lo schermo.',
    'Tocca ogni punto non appena compare.',
    'Troppo tardi? Il punto sparisce e conta come mancato.',
  ],
  why:
    'Qui ti alleni a reagire in fretta con la mano a bersagli che compaiono all’improvviso – occhio e mano lavorano insieme. Una parte del tempo serve per vedere e decidere, una parte per il movimento della mano; i punti più piccoli e più lontani richiedono più tempo. Non è dimostrato che l’allenamento si trasferisca alla vita quotidiana, allo sport o al traffico.',
  goodFor: ['Reazione', 'Occhio e mano', 'Mirare'],
  captions: {
    wait: 'Tra poco compare un punto',
    appear: 'Toccalo – più in fretta che puoi',
    next: 'Subito dopo arriva il successivo',
    late: 'Troppo tardi? Allora sparisce',
    count: 'Contano i tuoi colpi a segno',
  },
  metrics: {
    hits: 'Punti colpiti',
    misses: 'Punti mancati',
    stray: 'Tocchi a vuoto (fuori)',
    accuracy: 'Percentuale di colpi',
    rt_mean: 'Tempo di reazione (media)',
    rt_median: 'Tempo di reazione (mediana)',
    rt_sd: 'Tempo di reazione (variazione)',
    rate: 'Colpi al minuto',
  },
  metricHints: {
    hits: 'Quanti punti hai colpito in tempo. Il valore dipende molto dalle impostazioni (dimensione, visibilità, pausa).',
    misses: 'Punti scomparsi prima che li toccassi. Molti punti mancati significano: l’impostazione ti lascia troppo poco tempo.',
    stray: 'Tocchi che non hanno colpito nessun punto. Molti tocchi a vuoto capitano spesso quando si mira in fretta o in modo impreciso.',
    accuracy: 'Quota dei punti colpiti su tutti quelli mostrati (colpiti più mancati). I tocchi a vuoto non sono inclusi.',
    rt_mean: 'Tempo medio da quando compare un punto a quando lo tocchi, solo per i punti colpiti. Comprende il ritardo del dispositivo ed è confrontabile solo sullo stesso dispositivo.',
    rt_median: 'Il valore centrale quando si ordinano tutti i tempi: metà erano più veloci, metà più lenti. I valori anomali lo influenzano meno della media.',
    rt_sd: 'Quanto variano i tuoi tempi (deviazione standard). Valori più piccoli indicano una reazione più regolare.',
    rate: 'Punti colpiti al minuto. Le pause contano; confrontabile solo con la stessa pausa e la stessa visibilità.',
  },
  tips: {
    stray: 'Tocchi spesso accanto ai punti. Prima mira con precisione, poi veloce: chi tocca in fretta perde spesso più tempo con i tocchi a vuoto di quanto ne guadagni.',
    misses: 'Molti punti sono spariti prima che li raggiungessi. Rendilo più facile: punti più grandi o visibilità più lunga – e cambia sempre una sola impostazione.',
    harder: 'Colpisci quasi tutti i punti. Se vuoi, rendi più difficile una sola impostazione, per esempio punti più piccoli o visibilità più breve.',
    steady: 'I tuoi tempi di reazione variano parecchio. Resta rilassato, respira con calma e tieni la mano pronta sopra lo schermo.',
    compare: 'Confronta questo giro solo con giri che avevano le stesse impostazioni – su questo dispositivo e con la stessa mano.',
    few: 'Stavolta nessun colpo a segno. Prova punti più grandi (7 cm) e una visibilità più lunga (3 s).',
  },
  feedback: {
    time: '{s} s',
    moreTitle: 'Altri valori',
    moreNote: 'Il tempo di reazione comprende anche il ritardo di schermo e sensore touch. Confrontalo solo con i tuoi valori su questo dispositivo.',
  },
  progression: [
    'Più facile: punti più grandi (da 7 a 9 cm), visibilità più lunga (da 2 a 3 s), un solo punto, tutta la superficie, pausa più lunga.',
    'Più difficile: punti più piccoli (da 3 a 4 cm), visibilità più breve (da 0,8 a 1 s), più punti insieme, pausa breve o nessuna.',
    'Bordo: prima “Tutta la superficie” con la croce al centro, poi “Solo bordo”. Procedi solo quando colpisci quasi tutti i punti.',
    'La nostra regola pratica (non è un’indicazione della ricerca): se in tre giri di seguito colpisci oltre il 90 %, rendi più difficile un’impostazione; sotto il 70 % rendila più facile. Cambia sempre una sola impostazione alla volta.',
  ],
  cautions: [
    'Calibra lo schermo una volta (“Calibra lo schermo”), così le dimensioni in centimetri sono corrette.',
    'Siediti a circa 50–60 cm dallo schermo, in modo da raggiungere comodamente ogni punto con il dito. Tieni la mano rilassata sopra lo schermo e non appoggiarla.',
    'Per i confronti: sempre la stessa mano, la stessa distanza, lo stesso dispositivo. I risultati con impostazioni diverse non vengono confrontati tra loro.',
    'Con la croce al centro lo sguardo resta sulla croce e i punti li vedi con la coda dell’occhio. Se davvero non guardi, l’app non può misurarlo.',
    'I punti compaiono e spariscono. Con visibilità molto breve e più punti può risultare agitato. Se sei fotosensibile o hai già avuto una crisi epilettica, non eseguire l’esercizio.',
    'Rilassa dita e polso ogni pochi minuti e cambia mano. In caso di vertigini o disturbi agli occhi: fai una pausa.',
  ],
  params: {
    durationS: {
      label: 'Durata',
      hint: 'Quanto dura il giro. Da 30 a 60 secondi per provare, da 2 a 5 minuti per allenarsi. Nei giri lunghi la concentrazione può calare.',
    },
    diameterCm: {
      label: 'Dimensione dei punti',
      hint: 'Diametro dei punti in centimetri. I punti più piccoli richiedono una mira più precisa e sono più difficili. 5 cm è un buon valore di partenza.',
      short: '{v} cm',
    },
    persistenceS: {
      label: 'Visibilità di ogni punto',
      hint: 'Quanto resta visibile un punto prima di contare come mancato. Tempi più brevi aumentano la pressione del tempo.',
      short: '{v} s',
    },
    simultaneous: {
      label: 'Punti contemporanei',
      hint: 'Quanti punti sono visibili contemporaneamente. Con più punti devi decidere quale prendere per primo – e questo rende il compito molto più difficile.',
      short: '{v} punto|{v} punti',
    },
    gapMs: {
      label: 'Pausa fino al punto successivo',
      hint: 'Pausa in millisecondi tra un colpo e il punto successivo. Una pausa breve aumenta il ritmo, una più lunga lascia tempo per riportare la mano.',
    },
    zone: {
      label: 'Zona',
      hint: '“Tutta la superficie”: ovunque. “Solo bordo”: solo lontano dal centro. “Solo centro”: solo nella zona centrale. “Solo bordo” si abbina bene alla croce al centro.',
      options: { all: 'Tutta la superficie', periphery: 'Solo bordo', center: 'Solo centro' },
    },
    fixation: {
      label: 'Croce al centro',
      hint: 'Mostra una piccola croce al centro e tiene lontani i punti. Lo sguardo dovrebbe restare sulla croce; i punti li percepisci con la coda dell’occhio.',
      options: { no: 'No', yes: 'Sì' },
    },
    sound: {
      label: 'Suono',
      hint: 'Suono breve per un colpo a segno (acuto) e per un tocco a vuoto (grave). Aiuta a imparare; per misure pure può restare spento. Il suono non cambia la confrontabilità.',
      options: { no: 'No', yes: 'Sì' },
    },
  },
};
