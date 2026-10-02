import type { ExerciseTexts } from '../../core/types';

// Quelle: Labor-Prototyp (help/dual.js), für Blickfit geglättet: du-Form, einfache Sprache, Fachwörter erklärt
// (Peripherie → „Rand“, geteilte Aufmerksamkeit → „zwei Aufgaben gleichzeitig“). Formulierungsregeln (Optiker-Seite): nur
// beschreiben, was man in der Übung tut; keine Wirk-, Heil- oder Sicherheitsversprechen, keine Prüfbegriffe, keine Normwerte;
// Vergleich nur mit sich selbst auf diesem Gerät. Ehrlich benannt: Blick wird nicht gemessen, Touch-Verzögerung. Aus dem
// Prototyp gestrichen: „Mit der Zeit werden Teilbewegungen automatischer; das ist das Ziel des Trainings“ und „Standardmaß für
// Aufmerksamkeitskapazität“ (nicht belegt). Die „Kosten“ der Doppelaufgabe sind eine eigene Beobachtung der Person.

export const de: ExerciseTexts = {
  title: 'Doppelaufgabe',
  tagline: 'Zahlenfolge in der Mitte, Punkte am Rand – beides gleichzeitig.',
  steps: [
    'Bei der Zielzahl in der Mitte tippst du die Mitte an.',
    'Punkte am Rand tippst du ebenfalls an.',
    'Dein Blick bleibt dabei möglichst in der Mitte.',
  ],
  why:
    'Hier übst du, zwei Aufgaben gleichzeitig zu erledigen: in der Mitte auf eine Zielzahl achten und am Rand auf auftauchende Punkte reagieren. Kommen zwei Aufgaben zusammen, wird meist mindestens eine langsamer oder fehlerhafter; mit „Nur Mitte“ und „Nur Rand“ siehst du selbst, wie groß der Unterschied bei dir ist. Ob das Üben im Alltag, im Sport oder im Verkehr etwas bringt, ist nicht belegt.',
  goodFor: ['Aufmerksamkeit teilen', 'Reaktion', 'Randwahrnehmung'],
  captions: {
    wait: 'Gleich läuft eine Zahlenfolge',
    center: 'In der Mitte laufen Zahlen durch',
    edge: 'Am Rand: Punkte antippen',
    target: 'Bei der 7: die Mitte antippen',
    both: 'Beides läuft gleichzeitig',
    count: 'Gezählt werden deine Treffer',
  },
  metrics: {
    c_hits: 'Mitte: Zielzahlen erkannt',
    c_targets: 'Mitte: Zielzahlen gezeigt',
    c_misses: 'Mitte: Zielzahlen verpasst',
    c_false: 'Mitte: Berührung ohne Zielzahl',
    c_rt: 'Mitte: Reaktionszeit (Mittel)',
    p_hits: 'Rand: Punkte getroffen',
    p_misses: 'Rand: Punkte verpasst',
    p_stray: 'Rand: Fehltipps (daneben)',
    p_rt: 'Rand: Reaktionszeit (Mittel)',
  },
  metricHints: {
    c_hits: 'Zielzahlen, bei denen du die Mitte rechtzeitig berührt hast, solange die Zielzahl zu sehen war. Im Modus „Nur Rand“ gibt es diesen Wert nicht; dort zählt „Punkte getroffen“.',
    c_targets: 'Wie viele Zielzahlen insgesamt gezeigt wurden (eine zum Schluss nur angeschnittene zählt nicht mit). Erkannte plus verpasste ergeben diese Zahl.',
    c_misses: 'Zielzahlen, bei denen du nicht reagiert hast, solange sie zu sehen war. Bei sehr kurzem Wechsel (unter etwa 600 ms) wird das Zeitfenster knapp.',
    c_false: 'Berührungen der Mitte, obwohl keine Zielzahl zu sehen war oder obwohl du schon reagiert hattest.',
    c_rt: 'Durchschnittliche Zeit vom Erscheinen einer Zielzahl bis zur Berührung der Mitte (nur bei erkannten). Sie enthält die Verzögerung des Touch-Sensors und ist nur auf demselben Gerät vergleichbar.',
    p_hits: 'Randpunkte, die du rechtzeitig berührt hast.',
    p_misses: 'Randpunkte, die verschwunden sind, bevor du sie berührt hast.',
    p_stray: 'Berührungen, die weder die Mitte noch einen Randpunkt getroffen haben.',
    p_rt: 'Durchschnittliche Zeit vom Erscheinen eines Randpunkts bis zur Berührung (nur getroffene). Sie enthält die Verzögerung des Touch-Sensors.',
  },
  tips: {
    few: 'Diesmal gab es keinen Treffer. Probiere einen langsameren Zahlenwechsel, größere Punkte oder eine längere Sichtbarkeit – oder übe erst „Nur Mitte“ und „Nur Rand“.',
    falseAlarms: 'Du berührst die Mitte oft, obwohl keine Zielzahl da ist. Probiere, die Zahl erst zu erkennen und dann zu tippen.',
    centerMiss: 'Viele Zielzahlen sind unbeantwortet geblieben. Mach es leichter: langsamerer Wechsel, seltenere Zielzahlen – oder übe erst „Nur Mitte“.',
    edgeMiss: 'Viele Randpunkte sind verschwunden, bevor du sie berührt hast. Mach es leichter: größere Punkte oder längere Sichtbarkeit – oder übe erst „Nur Rand“.',
    costs: 'Mach auch einen Durchlauf „Nur Mitte“ und einen „Nur Rand“ mit sonst gleichen Einstellungen. Der Unterschied zu „Beide gleichzeitig“ zeigt dir, wie viel die zweite Aufgabe bei dir kostet. Die App vergleicht die Modi nicht automatisch.',
    compare: 'Vergleiche diesen Durchlauf nur mit Durchläufen mit denselben Einstellungen – auf diesem Gerät und mit derselben Hand.',
  },
  feedback: {
    labelCenter: '{s} s · Mitte bei {d}',
    labelEdge: '{s} s',
    titleCenter: 'Mitte (Zahlenfolge)',
    titleEdge: 'Rand (Punkte)',
    moreNote: 'Die Reaktionszeiten enthalten die Verzögerung von Bildschirm und Touch-Sensor. Vergleiche sie nur mit deinen eigenen Werten auf diesem Gerät.',
  },
  progression: [
    'Leichter: Zahlenwechsel langsamer (1.200 bis 1.800 ms), seltene Zielzahlen (10 bis 15 %), große Randpunkte (7 bis 9 cm), lange Sichtbarkeit.',
    'Schwerer: Zahlenwechsel schneller (500 bis 700 ms), häufigere Zielzahlen (30 bis 40 %), kleinere Randpunkte (3 bis 4 cm), kurze Sichtbarkeit, kurze Pause.',
    'Vergleichsmessung: Spiele „Beide gleichzeitig“, „Nur Mitte“ und „Nur Rand“ mit sonst gleichen Einstellungen; jeder Modus hat seinen eigenen Verlauf. Je kleiner der Unterschied, desto besser gelingt dir die Aufteilung – das ist deine eigene Beobachtung, kein Maß aus der Forschung.',
    'Ist die Mitte zu leicht, erhöhe das Tempo oder den Anteil der Zielzahlen.',
  ],
  cautions: [
    'Die Zahl in der Mitte wechselt (höchstens 2,5-mal pro Sekunde, weich eingeblendet), und die Punkte erscheinen und verschwinden. Bist du lichtempfindlich oder hattest du schon einmal einen epileptischen Anfall, verzichte bitte darauf.',
    'Stell den Bildschirm einmal ein („Bildschirm kalibrieren“), damit die Punktgröße in Zentimetern stimmt. Auf kleinen Bildschirmen wird die Größe begrenzt, damit neben dem Kreis in der Mitte Platz für die Punkte bleibt.',
    'Sitz etwa 50 bis 60 cm vom Bildschirm entfernt. Der Blick bleibt möglichst in der Mitte, die Hand wechselt zwischen Mitte und Rand. Die App kann nicht prüfen, wohin du schaust – das ist eine Bitte, keine Messung.',
    'Für den Vergleich spielst du je einen Durchlauf in jedem der drei Modi mit sonst gleichen Einstellungen. Die Ergebnisse jedes Modus werden getrennt gespeichert.',
    'Die Doppelaufgabe ist anstrengend: höchstens etwa 10 Minuten am Stück. Wechsle die Hand und lockere die Finger. Bei Schwindel oder Augenbeschwerden: Pause machen.',
  ],
  params: {
    mode: {
      label: 'Aufgaben',
      hint: '„Beide gleichzeitig“ ist die Doppelaufgabe. „Nur Mitte“ und „Nur Rand“ messen jede Aufgabe einzeln – als Vergleichsbasis.',
      options: { dual: 'Beide gleichzeitig', central: 'Nur Mitte (Zahlenfolge)', periphery: 'Nur Rand (Punkte)' },
    },
    durationS: {
      label: 'Dauer',
      hint: 'Wie lange der Durchlauf dauert, in Sekunden.',
    },
    intervalMs: {
      label: 'Zahlenwechsel alle',
      hint: 'Alle wie viele Millisekunden die Zahl in der Mitte wechselt. Kürzere Zeiten verlangen schnelleres Erkennen; unter 600 ms wird das Zeitfenster knapp. Schneller als alle 400 ms wechselt die Zahl nie.',
    },
    targetDigit: {
      label: 'Zielzahl',
      hint: 'Bei dieser Zahl berührst du die Mitte.',
    },
    targetRate: {
      label: 'Anteil der Zielzahlen',
      hint: 'Wie viel Prozent der Zahlen Zielzahlen sind. Höhere Anteile bedeuten mehr nötige Reaktionen.',
    },
    spotCm: {
      label: 'Größe der Randpunkte',
      hint: 'Durchmesser der Randpunkte in Zentimetern. Auf kleinen Bildschirmen wird die Größe begrenzt, damit neben dem Kreis in der Mitte Platz bleibt.',
      short: '{v} cm',
    },
    persistenceS: {
      label: 'Sichtbarkeit der Randpunkte',
      hint: 'Wie lange ein Randpunkt sichtbar bleibt, bevor er als verpasst gilt.',
    },
    gapMs: {
      label: 'Pause zwischen Randpunkten',
      hint: 'Pause in Millisekunden zwischen einem Randpunkt und dem nächsten.',
    },
    sound: {
      label: 'Ton',
      hint: 'Kurzer Ton bei einem Treffer (hoch) und bei einem Fehltipp (tief). Der Ton ändert die Vergleichbarkeit nicht.',
      options: { no: 'Aus', yes: 'An' },
    },
  },
};

export const it: ExerciseTexts = {
  title: 'Doppelaufgabe',
  tagline: 'Sequenza di numeri al centro, punti al margine – tutto insieme.',
  steps: [
    'Al numero bersaglio al centro tocca il centro.',
    'Tocca anche i punti al margine.',
    'Lo sguardo resta il più possibile al centro.',
  ],
  why:
    'Qui ti alleni a svolgere due compiti insieme: al centro fare attenzione a un numero bersaglio e al margine reagire ai punti che compaiono. Quando i compiti si sommano, di solito almeno uno diventa più lento o meno preciso; con “Solo centro” e “Solo margine” vedi tu stesso quanto è grande la differenza per te. Non è dimostrato che l’allenamento serva nella vita quotidiana, nello sport o nel traffico.',
  goodFor: ['Dividere l’attenzione', 'Reazione', 'Percezione al margine'],
  captions: {
    wait: 'Tra poco scorre una sequenza',
    center: 'Al centro scorrono dei numeri',
    edge: 'Al margine: tocca i punti',
    target: 'Al 7: tocca il centro',
    both: 'Entrambe insieme',
    count: 'Contano i tuoi colpi a segno',
  },
  metrics: {
    c_hits: 'Centro: numeri bersaglio riconosciuti',
    c_targets: 'Centro: numeri bersaglio mostrati',
    c_misses: 'Centro: numeri bersaglio mancati',
    c_false: 'Centro: tocco senza numero bersaglio',
    c_rt: 'Centro: tempo di reazione (media)',
    p_hits: 'Margine: punti colpiti',
    p_misses: 'Margine: punti mancati',
    p_stray: 'Margine: tocchi a vuoto',
    p_rt: 'Margine: tempo di reazione (media)',
  },
  metricHints: {
    c_hits: 'Numeri bersaglio per i quali hai toccato il centro in tempo, finché il numero era visibile. Nella modalità “Solo margine” questo valore non c’è; lì contano i “punti colpiti”.',
    c_targets: 'Quanti numeri bersaglio sono stati mostrati in tutto (uno solo a metà alla fine non conta). Riconosciuti più mancati danno questo numero.',
    c_misses: 'Numeri bersaglio ai quali non hai reagito finché erano visibili. Con cambi molto rapidi (sotto circa 600 ms) la finestra di tempo diventa stretta.',
    c_false: 'Tocchi del centro anche se non era visibile alcun numero bersaglio o se avevi già reagito.',
    c_rt: 'Tempo medio da quando compare un numero bersaglio fino al tocco del centro (solo per quelli riconosciuti). Comprende il ritardo del sensore touch ed è confrontabile solo sullo stesso dispositivo.',
    p_hits: 'Punti al margine che hai toccato in tempo.',
    p_misses: 'Punti al margine che sono spariti prima che li toccassi.',
    p_stray: 'Tocchi che non hanno colpito né il centro né un punto al margine.',
    p_rt: 'Tempo medio da quando compare un punto al margine fino al tocco (solo quelli colpiti). Comprende il ritardo del sensore touch.',
  },
  tips: {
    few: 'Stavolta nessun colpo a segno. Prova un cambio di numeri più lento, punti più grandi o una visibilità più lunga – oppure esercitati prima con “Solo centro” e “Solo margine”.',
    falseAlarms: 'Tocchi spesso il centro anche se non c’è un numero bersaglio. Prova a riconoscere prima il numero e poi a toccare.',
    centerMiss: 'Molti numeri bersaglio sono rimasti senza risposta. Rendilo più facile: cambio più lento, numeri bersaglio più rari – oppure esercitati prima con “Solo centro”.',
    edgeMiss: 'Molti punti al margine sono spariti prima che li toccassi. Rendilo più facile: punti più grandi o visibilità più lunga – oppure esercitati prima con “Solo margine”.',
    costs: 'Fai anche un giro “Solo centro” e uno “Solo margine” con le stesse impostazioni. La differenza rispetto a “Entrambe insieme” ti mostra quanto costa per te il secondo compito. L’app non confronta le modalità in automatico.',
    compare: 'Confronta questo giro solo con giri con le stesse impostazioni – su questo dispositivo e con la stessa mano.',
  },
  feedback: {
    labelCenter: '{s} s · Centro al {d}',
    labelEdge: '{s} s',
    titleCenter: 'Centro (sequenza di numeri)',
    titleEdge: 'Margine (punti)',
    moreNote: 'I tempi di reazione comprendono il ritardo di schermo e sensore touch. Confrontali solo con i tuoi valori su questo dispositivo.',
  },
  progression: [
    'Più facile: cambio dei numeri più lento (1.200–1.800 ms), numeri bersaglio rari (10–15 %), punti grandi al margine (7–9 cm), visibilità lunga.',
    'Più difficile: cambio più rapido (500–700 ms), numeri bersaglio più frequenti (30–40 %), punti più piccoli (3–4 cm), visibilità breve, pausa breve.',
    'Misura di confronto: gioca “Entrambe insieme”, “Solo centro” e “Solo margine” con le stesse impostazioni; ogni modalità ha il suo andamento. Più piccola è la differenza, meglio riesci a dividerti – è una tua osservazione, non una misura della ricerca.',
    'Se il centro è troppo facile, aumenta il ritmo o la quota di numeri bersaglio.',
  ],
  cautions: [
    'Il numero al centro cambia (al massimo 2,5 volte al secondo, con comparsa graduale) e i punti compaiono e spariscono. Se sei fotosensibile o hai già avuto una crisi epilettica, per favore non eseguirlo.',
    'Imposta lo schermo una volta (“Calibra lo schermo”) perché la dimensione dei punti in centimetri sia corretta. Sugli schermi piccoli la dimensione viene limitata perché accanto al cerchio al centro resti posto per i punti.',
    'Siediti a circa 50–60 cm dallo schermo. Lo sguardo resta il più possibile al centro, la mano passa tra centro e margine. L’app non può controllare dove guardi – è una richiesta, non una misurazione.',
    'Per il confronto fai un giro in ciascuna delle tre modalità con le stesse impostazioni. I risultati di ogni modalità vengono salvati separatamente.',
    'La doppia attività è faticosa: al massimo circa 10 minuti di fila. Cambia mano e rilassa le dita. In caso di vertigini o disturbi agli occhi: fai una pausa.',
  ],
  params: {
    mode: {
      label: 'Compiti',
      hint: '“Entrambe insieme” è la doppia attività. “Solo centro” e “Solo margine” misurano ogni compito da solo – come base di confronto.',
      options: { dual: 'Entrambe insieme', central: 'Solo centro (numeri)', periphery: 'Solo margine (punti)' },
    },
    durationS: {
      label: 'Durata',
      hint: 'Quanto dura il giro, in secondi.',
    },
    intervalMs: {
      label: 'Cambio del numero ogni',
      hint: 'Ogni quanti millisecondi cambia il numero al centro. Tempi più brevi richiedono di riconoscere più in fretta; sotto 600 ms la finestra di tempo diventa stretta. Il numero non cambia mai più rapidamente di ogni 400 ms.',
    },
    targetDigit: {
      label: 'Numero bersaglio',
      hint: 'A questo numero tocchi il centro.',
    },
    targetRate: {
      label: 'Quota di numeri bersaglio',
      hint: 'Quale percentuale dei numeri è un numero bersaglio. Quote più alte richiedono più reazioni.',
    },
    spotCm: {
      label: 'Dimensione dei punti al margine',
      hint: 'Diametro dei punti al margine in centimetri. Sugli schermi piccoli la dimensione viene limitata perché accanto al cerchio al centro resti posto.',
      short: '{v} cm',
    },
    persistenceS: {
      label: 'Visibilità dei punti al margine',
      hint: 'Per quanto tempo un punto al margine resta visibile prima di contare come mancato.',
    },
    gapMs: {
      label: 'Pausa tra i punti al margine',
      hint: 'Pausa in millisecondi tra un punto al margine e il successivo.',
    },
    sound: {
      label: 'Suono',
      hint: 'Breve suono per un colpo a segno (acuto) e per un tocco a vuoto (grave). Il suono non cambia la confrontabilità.',
      options: { no: 'Spento', yes: 'Acceso' },
    },
  },
};
