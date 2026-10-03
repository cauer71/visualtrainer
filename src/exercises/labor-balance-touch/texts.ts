import type { ExerciseTexts } from '../../core/types';
import { SAFETY_STANDING_DE, SAFETY_STANDING_IT, safetyList } from '../_shared/labor-sicherheit';

// Texte für Blickfit geschrieben (du-Form, einfache Sprache, Fachwörter erklärt).
// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-, Heil- oder
// Sicherheitsversprechen, keine Messung des Gleichgewichts, keine Normwerte, Vergleich nur mit sich selbst auf diesem Gerät.
// `short` in params: Vorlage für die Kurzfassung der Einstellungen auf der Ergebnisseite (nur Zahlen; {v} = Wert).

export const de: ExerciseTexts = {
  title: 'Balance-Touch',
  tagline: 'Punkte im Stand antippen – die Hilfsperson zählt jeden Gleichgewichtsverlust.',
  steps: [
    'Sicher stehen, Halt und Hilfsperson in Reichweite.',
    'Tippe jeden Punkt an, sobald er erscheint.',
    'Die Hilfsperson zählt jeden Verlust des Gleichgewichts.',
  ],
  why:
    'Hier löst du eine Tipp-Aufgabe im Stand und musst dabei zugleich das Gleichgewicht halten – eine Doppelaufgabe aus Haltung und Sehen. Wer nebenbei eine Aufgabe löst, hat weniger Aufmerksamkeit für die Haltung übrig. Eine Hilfsperson zählt, wie oft du das Gleichgewicht verlierst; die App misst weder Gleichgewicht noch Haltung. Ob sich das Üben auf Alltag, Sport oder Verkehr überträgt, ist nicht belegt.',
  goodFor: ['Tippen', 'Stand', 'Doppelaufgabe'],
  captions: {
    wait: 'Gleich erscheint ein Punkt',
    appear: 'Antippen – so schnell du kannst',
    loss: 'Die Hilfsperson zählt jeden Verlust',
    next: 'Gleich folgt der nächste Punkt',
    count: 'Gezählt: Treffer und Verluste',
  },
  metrics: {
    hits: 'Getroffene Punkte',
    misses: 'Verpasste Punkte',
    stray: 'Fehltipps (daneben)',
    accuracy: 'Trefferquote',
    rt_mean: 'Reaktionszeit (Mittel)',
    rt_median: 'Reaktionszeit (Median)',
    rt_sd: 'Reaktionszeit (Streuung)',
    losses: 'Verluste des Gleichgewichts (gezählt)',
    losses_per_min: 'Verluste pro Minute',
  },
  metricHints: {
    hits: 'So viele Punkte hast du rechtzeitig getroffen. Der Wert hängt stark von den Einstellungen und der Standposition ab.',
    misses: 'Punkte, die verschwunden sind, bevor du sie berührt hast. Viele verpasste Punkte heißen: Die Einstellung lässt dir zu wenig Zeit.',
    stray: 'Berührungen, die keinen Punkt getroffen haben. Viele Fehltipps passieren oft bei hastigem oder ungenauem Zielen.',
    accuracy: 'Anteil der getroffenen an allen gezeigten Punkten (getroffene plus verpasste). Fehltipps sind darin nicht enthalten.',
    rt_mean: 'Durchschnittliche Zeit vom Erscheinen eines Punktes bis zur Berührung, nur für getroffene Punkte. Sie enthält die Verzögerung des Geräts und ist nur auf demselben Gerät vergleichbar.',
    rt_median: 'Der mittlere Wert, wenn man alle Zeiten der Größe nach ordnet: Die Hälfte war schneller, die Hälfte langsamer. Einzelne Ausreißer ziehen ihn weniger als den Durchschnitt.',
    rt_sd: 'Wie stark deine Zeiten schwanken (Standardabweichung). Kleinere Werte bedeuten gleichmäßigeres Reagieren.',
    losses: 'Wie oft die Hilfsperson „Gleichgewicht verloren“ getippt hat. Was als Verlust zählt (Absetzen, Abstützen, Ausfallschritt, Festhalten), legt ihr vorher fest. Die App misst das nicht selbst; der Wert hängt von der Aufmerksamkeit der Hilfsperson ab und ist keine Messung des Gleichgewichts.',
    losses_per_min: 'Gezählte Verluste pro Minute, damit Durchläufe unterschiedlicher Dauer vergleichbar bleiben. Aussagekräftig erst ab etwa 30 bis 60 Sekunden Dauer – und nur bei gleicher Standposition und Hilfsperson.',
  },
  tips: {
    few: 'Diesmal gab es keinen Treffer. Probiere größere Punkte (7 cm), längere Sichtbarkeit (3 s) und einen festen, beidbeinigen Stand.',
    losses: 'Es gab mehrere Verluste des Gleichgewichts. Wähle beim nächsten Mal eine leichtere Standposition, größere Punkte oder eine kürzere Dauer – oder mach erst eine Pause.',
    stray: 'Du tippst öfter neben die Punkte. Erst genau zielen, dann schnell, und die Hand ruhig führen: Hektische Armbewegungen stören die Balance.',
    misses: 'Viele Punkte sind verschwunden, bevor du sie erreicht hast. Mach es dir leichter: größere Punkte oder längere Sichtbarkeit – und ändere immer nur eine Einstellung.',
    harder: 'Du triffst fast alle Punkte und die Hilfsperson hat keinen Verlust gezählt. Wenn du magst, mach genau eine Einstellung schwerer, zum Beispiel kleinere Punkte – nie die Standposition ohne Sicherung.',
    compare: 'Vergleiche diesen Durchlauf nur mit Durchläufen, die dieselben Einstellungen und dieselbe Standposition hatten – mit derselben Hilfsperson.',
  },
  feedback: {
    hud: 'Verluste {n}',
    btnLoss: 'Gleichgewicht verloren',
    keyLoss: 'Taste B',
    lossNoted: 'Gezählt: {n}',
    moreTitle: 'Weitere Werte',
    moreNote: 'Die Reaktionszeit enthält auch die Verzögerung von Bildschirm und Touch-Sensor. Die Verluste zählt die Hilfsperson – sie sind keine Messung des Gleichgewichts. Vergleiche nur mit deinen eigenen Werten bei gleicher Standposition und gleicher Hilfsperson.',
  },
  progression: [
    'Leichter: fester, beidbeiniger Stand, große Punkte (7 bis 9 cm), lange Sichtbarkeit (3 bis 4 s), Kreuz in der Mitte aus.',
    'Schwerer: erst später und nur mit Sicherung Tandem- oder Einbeinstand, kleinere Punkte (3 bis 4 cm), kurze Sichtbarkeit (1 bis 1,5 s), „Nur Rand“, Kreuz in der Mitte an.',
    'Auf wackligen Flächen zuerst nur kurze Durchläufe (20 bis 30 Sekunden) mit Pausen dazwischen.',
    'Unsere Faustregel (keine Vorgabe aus der Forschung): Mach zuerst einen Durchlauf im festen Stand als Vergleich und ändere dann immer nur eine Einstellung. Weniger gezählte Verluste bei gleicher Trefferquote heißen nur, dass es auf diesem Gerät mit dieser Hilfsperson besser lief.',
  ],
  cautions: [
    ...safetyList(SAFETY_STANDING_DE),
    'Stell den Bildschirm einmal ein („Bildschirm kalibrieren“), damit die Größe der Punkte in Zentimetern stimmt.',
    'Stell den Bildschirm so, dass du im Stand bequem jeden Punkt erreichst, ohne dich zu verrenken – zum Beispiel ein Tablet auf einem Ständer in Brusthöhe. Stütze dich nicht auf den Bildschirm, atme gleichmäßig und führe die Hand ruhig.',
    'Legt vorher fest, was als Verlust des Gleichgewichts zählt (Absetzen, Abstützen, Ausfallschritt, Festhalten), und haltet die Regel bei Wiederholungen ein. Die Hilfsperson bleibt in Reichweite und tippt „Gleichgewicht verloren“ (Taste B).',
    'Einbeinstand, Tandemstand und wackelige Flächen bergen das höchste Sturzrisiko: nur mit Sicherung und Aufsicht, zuerst kurze Durchläufe.',
    'Mit dem Kreuz in der Mitte bleibt dein Blick auf dem Kreuz, die Punkte siehst du aus dem Augenwinkel. Ob du wirklich nicht hinschaust, kann die App nicht messen.',
    'Die Punkte erscheinen und verschwinden. Bei sehr kurzer Sichtbarkeit kann das unruhig wirken; bist du lichtempfindlich oder hattest du schon einmal einen epileptischen Anfall, verzichte bitte darauf.',
  ],
  params: {
    stance: {
      label: 'Standposition',
      hint: 'Wie du stehst. Sie wird nur gespeichert und ändert die Punkte nicht, gehört aber zum Vergleich: Durchläufe mit anderer Standposition werden nicht miteinander verglichen. Einbeinstand, Tandemstand (ein Fuß vor dem anderen) und wackelige Flächen nur mit Sicherung.',
      options: { both: 'Beidbeinig, fest', platform: 'Wackelige Fläche', single: 'Einbeinig', tandem: 'Tandemstand' },
    },
    durationS: {
      label: 'Dauer',
      hint: 'Wie lange der Durchlauf dauert. Für die Verluste pro Minute sind mindestens 30 bis 60 Sekunden sinnvoll; in schwierigen Standpositionen lieber kurz.',
    },
    diameterCm: {
      label: 'Größe der Punkte',
      hint: 'Durchmesser der Punkte in Zentimetern. Größere Punkte sind leichter zu treffen. Auf kleinen Bildschirmen werden sie begrenzt.',
      short: '{v} cm',
    },
    persistenceS: {
      label: 'Sichtbarkeit je Punkt',
      hint: 'Wie lange ein Punkt sichtbar bleibt, bevor er als verpasst gilt. Kürzere Zeiten erhöhen den Zeitdruck.',
    },
    gapMs: {
      label: 'Pause bis zum nächsten Punkt',
      hint: 'Pause in Millisekunden zwischen einem Treffer und dem nächsten Punkt.',
    },
    zone: {
      label: 'Bereich',
      hint: '„Ganze Fläche“: überall. „Nur Rand“: nur weit weg von der Mitte. „Nur Mitte“: nur im mittleren Bereich. Der Rand ist im Stand besonders anspruchsvoll.',
      options: { all: 'Ganze Fläche', periphery: 'Nur Rand', center: 'Nur Mitte' },
    },
    fixation: {
      label: 'Kreuz in der Mitte',
      hint: 'Zeigt ein kleines Kreuz in der Mitte und hält die Punkte davon fern. Dein Blick soll auf dem Kreuz bleiben; das macht die Aufgabe deutlich schwerer.',
      options: { yes: 'Ja', no: 'Nein' },
    },
  },
};

export const it: ExerciseTexts = {
  title: 'Balance-Touch',
  tagline: 'Tocca i punti in piedi – la persona di aiuto conta ogni perdita di equilibrio.',
  steps: [
    'In piedi in sicurezza, appoggio e aiuto a portata di mano.',
    'Tocca ogni punto non appena compare.',
    'La persona di aiuto conta ogni perdita di equilibrio.',
  ],
  why:
    'Qui risolvi un compito di tocco in piedi e devi allo stesso tempo mantenere l’equilibrio – un doppio compito di postura e vista. Chi risolve un compito nel frattempo ha meno attenzione per la postura. Una persona di aiuto conta quante volte perdi l’equilibrio; l’app non misura né l’equilibrio né la postura. Non è dimostrato che l’allenamento si trasferisca alla vita quotidiana, allo sport o al traffico.',
  goodFor: ['Toccare', 'In piedi', 'Doppio compito'],
  captions: {
    wait: 'Tra poco compare un punto',
    appear: 'Toccalo – più in fretta che puoi',
    loss: 'L’aiutante conta ogni perdita',
    next: 'Subito dopo arriva il successivo',
    count: 'Si contano colpi e perdite',
  },
  metrics: {
    hits: 'Punti colpiti',
    misses: 'Punti mancati',
    stray: 'Tocchi a vuoto (fuori)',
    accuracy: 'Percentuale di colpi',
    rt_mean: 'Tempo di reazione (media)',
    rt_median: 'Tempo di reazione (mediana)',
    rt_sd: 'Tempo di reazione (variazione)',
    losses: 'Perdite di equilibrio (contate)',
    losses_per_min: 'Perdite al minuto',
  },
  metricHints: {
    hits: 'Quanti punti hai colpito in tempo. Il valore dipende molto dalle impostazioni e dalla posizione in piedi.',
    misses: 'Punti scomparsi prima che li toccassi. Molti punti mancati significano: l’impostazione ti lascia troppo poco tempo.',
    stray: 'Tocchi che non hanno colpito nessun punto. Molti tocchi a vuoto capitano spesso quando si mira in fretta o in modo impreciso.',
    accuracy: 'Quota dei punti colpiti su tutti quelli mostrati (colpiti più mancati). I tocchi a vuoto non sono inclusi.',
    rt_mean: 'Tempo medio da quando compare un punto a quando lo tocchi, solo per i punti colpiti. Comprende il ritardo del dispositivo ed è confrontabile solo sullo stesso dispositivo.',
    rt_median: 'Il valore centrale quando si ordinano tutti i tempi: metà erano più veloci, metà più lenti. I valori anomali lo influenzano meno della media.',
    rt_sd: 'Quanto variano i tuoi tempi (deviazione standard). Valori più piccoli indicano una reazione più regolare.',
    losses: 'Quante volte la persona di aiuto ha toccato «Equilibrio perso». Che cosa conta come perdita (appoggiare il piede, aggrapparsi, passo di recupero, tenersi) lo stabilite prima. L’app non lo misura da sola; il valore dipende dall’attenzione della persona di aiuto e non è una misurazione dell’equilibrio.',
    losses_per_min: 'Perdite contate al minuto, così i giri di durata diversa restano confrontabili. Significativo solo da circa 30–60 secondi di durata – e solo con la stessa posizione e la stessa persona di aiuto.',
  },
  tips: {
    few: 'Stavolta nessun colpo a segno. Prova punti più grandi (7 cm), visibilità più lunga (3 s) e una posizione stabile su due piedi.',
    losses: 'Ci sono state più perdite di equilibrio. La prossima volta scegli una posizione più facile, punti più grandi o una durata più breve – oppure fai prima una pausa.',
    stray: 'Tocchi spesso accanto ai punti. Prima mira con precisione, poi veloce, e muovi la mano con calma: i movimenti bruschi del braccio disturbano l’equilibrio.',
    misses: 'Molti punti sono spariti prima che li raggiungessi. Rendilo più facile: punti più grandi o visibilità più lunga – e cambia sempre una sola impostazione.',
    harder: 'Colpisci quasi tutti i punti e la persona di aiuto non ha contato perdite. Se vuoi, rendi più difficile una sola impostazione, per esempio punti più piccoli – mai la posizione senza protezione.',
    compare: 'Confronta questo giro solo con giri che avevano le stesse impostazioni e la stessa posizione – con la stessa persona di aiuto.',
  },
  feedback: {
    hud: 'Perdite {n}',
    btnLoss: 'Equilibrio perso',
    keyLoss: 'Tasto B',
    lossNoted: 'Contata: {n}',
    moreTitle: 'Altri valori',
    moreNote: 'Il tempo di reazione comprende anche il ritardo di schermo e sensore touch. Le perdite le conta la persona di aiuto – non sono una misurazione dell’equilibrio. Confrontale solo con i tuoi valori con la stessa posizione e la stessa persona di aiuto.',
  },
  progression: [
    'Più facile: posizione stabile su due piedi, punti grandi (da 7 a 9 cm), visibilità lunga (da 3 a 4 s), croce al centro disattivata.',
    'Più difficile: solo più avanti e solo con protezione posizione in tandem o su un piede, punti più piccoli (da 3 a 4 cm), visibilità breve (da 1 a 1,5 s), «Solo bordo», croce al centro attivata.',
    'Su superfici instabili prima solo giri brevi (da 20 a 30 secondi) con pause tra l’uno e l’altro.',
    'La nostra regola pratica (non è un’indicazione della ricerca): fai prima un giro in posizione stabile come confronto e cambia poi sempre una sola impostazione. Meno perdite contate con la stessa percentuale di colpi significano solo che su questo dispositivo con questa persona è andata meglio.',
  ],
  cautions: [
    ...safetyList(SAFETY_STANDING_IT),
    'Calibra lo schermo una volta («Calibra lo schermo»), così la dimensione dei punti in centimetri è corretta.',
    'Metti lo schermo in modo da raggiungere comodamente ogni punto in piedi senza contorcerti – per esempio un tablet su un supporto all’altezza del petto. Non appoggiarti allo schermo, respira con regolarità e muovi la mano con calma.',
    'Stabilite prima che cosa conta come perdita di equilibrio (appoggiare il piede, aggrapparsi, passo di recupero, tenersi) e mantenete la regola nelle ripetizioni. La persona di aiuto resta a portata di mano e tocca «Equilibrio perso» (tasto B).',
    'La posizione su un piede, in tandem e le superfici instabili comportano il rischio di caduta più alto: solo con protezione e sorveglianza, prima giri brevi.',
    'Con la croce al centro lo sguardo resta sulla croce e i punti li vedi con la coda dell’occhio. Se davvero non guardi, l’app non può misurarlo.',
    'I punti compaiono e spariscono. Con visibilità molto breve può risultare agitato; se sei fotosensibile o hai già avuto una crisi epilettica, non eseguire l’esercizio.',
  ],
  params: {
    stance: {
      label: 'Posizione in piedi',
      hint: 'Come stai in piedi. Viene solo salvata e non cambia i punti, ma conta per il confronto: i giri con una posizione diversa non vengono confrontati tra loro. Posizione su un piede, in tandem (un piede davanti all’altro) e superfici instabili solo con protezione.',
      options: { both: 'Su due piedi, stabile', platform: 'Superficie instabile', single: 'Su un piede', tandem: 'In tandem' },
    },
    durationS: {
      label: 'Durata',
      hint: 'Quanto dura il giro. Per le perdite al minuto servono almeno 30–60 secondi; nelle posizioni difficili meglio più breve.',
    },
    diameterCm: {
      label: 'Dimensione dei punti',
      hint: 'Diametro dei punti in centimetri. I punti più grandi sono più facili da colpire. Sugli schermi piccoli vengono limitati.',
      short: '{v} cm',
    },
    persistenceS: {
      label: 'Visibilità di ogni punto',
      hint: 'Quanto resta visibile un punto prima di contare come mancato. Tempi più brevi aumentano la pressione del tempo.',
    },
    gapMs: {
      label: 'Pausa fino al punto successivo',
      hint: 'Pausa in millisecondi tra un colpo e il punto successivo.',
    },
    zone: {
      label: 'Zona',
      hint: '«Tutta la superficie»: ovunque. «Solo bordo»: solo lontano dal centro. «Solo centro»: solo nella zona centrale. Il bordo è particolarmente impegnativo in piedi.',
      options: { all: 'Tutta la superficie', periphery: 'Solo bordo', center: 'Solo centro' },
    },
    fixation: {
      label: 'Croce al centro',
      hint: 'Mostra una piccola croce al centro e tiene lontani i punti. Lo sguardo dovrebbe restare sulla croce; questo rende il compito molto più difficile.',
      options: { yes: 'Sì', no: 'No' },
    },
  },
};
