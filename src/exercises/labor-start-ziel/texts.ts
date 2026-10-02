import type { ExerciseTexts } from '../../core/types';

// Quelle: Labor-Prototyp (help/sprint.js), für Blickfit geglättet: du-Form, einfache Sprache, Fachwörter erklärt
// (Reaktionszeit = Loslassen, Bewegungszeit = Weg zum Ziel; Median/Streuung in den Erklärungen der Werte).
// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-, Heil- oder
// Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst auf diesem Gerät.
// `short` in params: Vorlage für die Kurzfassung der Einstellungen auf der Ergebnisseite ({v} = Wert; „|“ trennt die
// Form für genau 1 von der Form für andere Zahlen).
// feedback: `hint*` = Hinweiszeile oben im Bild, `start`/`hold` = Beschriftung der Startfläche.

export const de: ExerciseTexts = {
  title: 'Start-Ziel-Reaktion',
  tagline: 'Finger halten, bei Aufleuchten loslassen und das Ziel berühren.',
  steps: [
    'Lege den Finger auf START und halte ihn dort.',
    'Leuchtet das Ziel auf: loslassen und das Ziel berühren.',
    'Zu früh losgelassen? Dann beginnt der Durchgang neu.',
  ],
  why:
    'Hier trennst du Reaktion und Bewegung: Die Reaktionszeit ist die Zeit vom Aufleuchten bis zum Loslassen, die Bewegungszeit die Zeit vom Loslassen bis zur Berührung des Ziels. Je weiter weg und kleiner das Ziel, desto länger dauert die Bewegung. Beide Zeiten enthalten die Verzögerung von Bildschirm und Touch-Sensor und sind nur auf demselben Gerät vergleichbar. Ob sich das Üben auf Alltag, Sport oder Verkehr überträgt, ist nicht belegt.',
  goodFor: ['Reagieren', 'Auge und Hand', 'Ruhig bereit sein'],
  captions: {
    hold: 'Finger auf START legen und halten',
    early: 'Zu früh losgelassen? Noch einmal',
    wait: 'Warten, bis das Ziel aufleuchtet',
    go: 'Jetzt loslassen und das Ziel berühren',
    next: 'Und noch einmal',
  },
  metrics: {
    hits: 'Erfolgreiche Durchgänge',
    false_starts: 'Fehlstarts (zu früh losgelassen)',
    error_taps: 'Fehltipps neben das Ziel',
    rt_mean: 'Reaktionszeit Loslassen (Mittel)',
    rt_median: 'Reaktionszeit Loslassen (Median)',
    rt_sd: 'Reaktionszeit (Streuung)',
    mt_mean: 'Bewegungszeit zum Ziel (Mittel)',
  },
  metricHints: {
    hits: 'So viele Durchgänge hast du geschafft: rechtzeitig losgelassen und das Ziel rechtzeitig berührt. Fehlstarts zählen hier nicht als Durchgang.',
    false_starts: 'Wie oft du die Startfläche losgelassen hast, bevor das Ziel aufleuchtete oder in den ersten 100 Millisekunden danach. Viele Fehlstarts heißen: Du warst ungeduldig oder angespannt.',
    error_taps: 'Berührungen neben das Ziel, nachdem du die Startfläche losgelassen hattest.',
    rt_mean: 'Durchschnittliche Zeit vom Aufleuchten des Ziels bis zum Loslassen der Startfläche, über alle Durchgänge mit Loslassen. Weniger ist schneller. Die Zeit enthält die Verzögerung des Geräts und ist nur auf demselben Gerät vergleichbar. Wurde nie rechtzeitig losgelassen, steht hier die Zeitgrenze von 2000 Millisekunden.',
    rt_median: 'Der mittlere Wert, wenn man alle Zeiten der Größe nach ordnet: Die Hälfte war schneller, die Hälfte langsamer. Einzelne Ausreißer ziehen ihn weniger als den Durchschnitt.',
    rt_sd: 'Wie stark deine Reaktionszeiten schwanken (Standardabweichung). Kleinere Werte bedeuten gleichmäßigeres Reagieren.',
    mt_mean: 'Durchschnittliche Zeit vom Loslassen bis zur Berührung des Ziels, nur für erfolgreiche Durchgänge. Sie hängt von Abstand und Größe des Ziels ab.',
  },
  tips: {
    few: 'Diesmal gab es keinen Durchgang mit Loslassen. Halte den Finger ruhig auf START und lass los, sobald das Ziel aufleuchtet. Mit einem großen Ziel (6 cm) und kürzerem Abstand (10 cm) fällt es leichter.',
    false_start: 'Du lässt öfter zu früh los. Halte den Finger locker, aber ruhig, und reagiere erst, wenn das Ziel wirklich leuchtet. Nach einem Fehlstart kurz durchatmen.',
    aim: 'Du tippst öfter neben das Ziel. Berühre das Ziel in der Mitte und nimm dir für den Weg etwas mehr Ruhe – oder wähle ein größeres Ziel.',
    slow: 'Manchmal hast du nicht rechtzeitig losgelassen. Bleib aufmerksam, aber nicht verkrampft: Entspannt halten, dann reagieren.',
    harder: 'Du schaffst fast alles ohne Fehler. Wenn du magst, mach genau eine Einstellung schwerer, zum Beispiel ein kleineres Ziel oder einen größeren Abstand.',
    steady: 'Deine Reaktionszeiten schwanken ziemlich. Bleib locker und halte den Finger gleichmäßig auf START.',
    compare: 'Vergleiche diesen Durchlauf nur mit Durchläufen, die dieselben Einstellungen hatten – auf diesem Gerät, mit derselben Hand und Haltung.',
  },
  feedback: {
    label: '{n} / {total}',
    start: 'START',
    hold: 'HALTEN',
    hintIdle: 'Finger auf START legen und halten',
    hintArmed: 'Halten … gleich leuchtet das Ziel',
    hintGo: 'Jetzt loslassen und das Ziel berühren',
    falseStart: 'Zu früh losgelassen',
    late: 'Zu langsam',
    noTarget: 'Ziel nicht erreicht',
    moreTitle: 'Weitere Werte',
    moreNote: 'Die Reaktionszeit enthält auch die Verzögerung von Bildschirm und Touch-Sensor. Vergleiche sie nur mit deinen eigenen Werten auf diesem Gerät.',
  },
  progression: [
    'Leichter: großes Ziel (6 bis 8 cm), kürzerer Abstand (10 bis 15 cm), Ziel immer oben.',
    'Schwerer: kleines Ziel (2 bis 3 cm), größerer Abstand (25 bis 35 cm), Ziel zufällig im Halbkreis.',
    'Ändere die Wartezeit (zum Beispiel zwischen 1 und 5 Sekunden), damit du dich nicht auf einen Rhythmus einstellst.',
    'Unsere Faustregel (keine Vorgabe aus der Forschung): Schau Reaktionszeit und Bewegungszeit getrennt an und ändere immer nur eine Einstellung auf einmal. Wirst du ohne Fehlstarts und Fehltipps fertig, kannst du eine Einstellung schwerer machen.',
  ],
  cautions: [
    'Stell den Bildschirm einmal ein („Bildschirm kalibrieren“), damit Abstand und Größe des Ziels in Zentimetern stimmen. Auf kleinen Bildschirmen werden Abstand und Ziel auf das begrenzt, was ins Bild passt.',
    'Der Bildschirm liegt flach oder steht leicht geneigt; START ist unten in der Mitte, das Ziel darüber. Stütze die Hand so, dass der Zeigefinger ohne Druck auf START ruht. Für Vergleiche immer dieselbe Hand und dieselbe Haltung.',
    'Schnelle, kurze Bewegungen: Lockere Handgelenk und Finger regelmäßig. Bei Beschwerden in Hand oder Arm hör auf.',
    'Das Ziel leuchtet plötzlich auf. Bist du lichtempfindlich oder hattest du schon einmal einen epileptischen Anfall, verzichte bitte darauf oder sprich vorher mit deiner Ärztin oder deinem Arzt.',
    'Die App misst nur, wann du loslässt und wann du das Ziel berührst – nicht, wohin du schaust.',
  ],
  params: {
    trials: {
      label: 'Anzahl der Durchgänge',
      hint: 'Wie viele Durchgänge es gibt (Fehlstarts zählen nicht mit). Für verlässliche Durchschnittswerte sind mindestens 10 bis 15 sinnvoll.',
      short: '{v} Durchgang|{v} Durchgänge',
    },
    minDelayMs: {
      label: 'Wartezeit mindestens',
      hint: 'Kürzeste Wartezeit zwischen dem Halten der Startfläche und dem Aufleuchten des Ziels. Ist die längste Wartezeit kleiner, gilt die kürzeste für beide.',
    },
    maxDelayMs: {
      label: 'Wartezeit höchstens',
      hint: 'Längste Wartezeit. Die tatsächliche Wartezeit liegt zufällig dazwischen, damit du den Zeitpunkt nicht erraten kannst.',
    },
    distanceCm: {
      label: 'Abstand Start–Ziel',
      hint: 'Abstand zwischen Startfläche und Ziel in Zentimetern. Größere Abstände verlängern die Bewegungszeit. Auf kleinen Bildschirmen wird der Abstand bei Bedarf begrenzt.',
    },
    targetCm: {
      label: 'Durchmesser des Ziels',
      hint: 'Durchmesser des Ziels in Zentimetern. Kleinere Ziele verlangen genaueres Zielen und verlängern die Bewegungszeit.',
    },
    target: {
      label: 'Zielposition',
      hint: '„Immer oben“: Das Ziel liegt senkrecht über der Startfläche. „Zufällig im Halbkreis“: Die Richtung wechselt bis etwa 60 Grad nach links oder rechts.',
      options: { top: 'Immer oben', random: 'Zufällig im Halbkreis' },
    },
    sound: {
      label: 'Ton',
      hint: 'Kurzer Ton, wenn das Ziel aufleuchtet, und bei Treffern bzw. Fehlern. Der Ton ändert die Vergleichbarkeit nicht.',
      options: { no: 'Aus', yes: 'An' },
    },
  },
};

export const it: ExerciseTexts = {
  title: 'Reazione start-bersaglio',
  tagline: 'Tieni il dito, lascia quando si accende e tocca il bersaglio.',
  steps: [
    'Appoggia il dito su START e tienilo lì.',
    'Si accende il bersaglio: lascia e tocca il bersaglio.',
    'Lasciato troppo presto? Il giro ricomincia.',
  ],
  why:
    'Qui separi reazione e movimento: il tempo di reazione è il tempo da quando il bersaglio si accende a quando lasci, il tempo di movimento quello da quando lasci a quando tocchi il bersaglio. Più il bersaglio è lontano e piccolo, più il movimento dura. Entrambi i tempi comprendono il ritardo di schermo e sensore touch e sono confrontabili solo sullo stesso dispositivo. Non è dimostrato che l’allenamento si trasferisca alla vita quotidiana, allo sport o al traffico.',
  goodFor: ['Reagire', 'Occhio e mano', 'Essere pronti con calma'],
  captions: {
    hold: 'Dito su START e tienilo',
    early: 'Lasciato troppo presto? Di nuovo',
    wait: 'Aspetta che il bersaglio si accenda',
    go: 'Ora lascia e tocca il bersaglio',
    next: 'E ancora una volta',
  },
  metrics: {
    hits: 'Giri riusciti',
    false_starts: 'Partenze false (lasciato troppo presto)',
    error_taps: 'Tocchi fuori dal bersaglio',
    rt_mean: 'Tempo di reazione al rilascio (media)',
    rt_median: 'Tempo di reazione al rilascio (mediana)',
    rt_sd: 'Tempo di reazione (variazione)',
    mt_mean: 'Tempo di movimento verso il bersaglio (media)',
  },
  metricHints: {
    hits: 'Quanti giri hai portato a termine: lasciato in tempo e toccato il bersaglio in tempo. Le partenze false qui non contano come giro.',
    false_starts: 'Quante volte hai lasciato l’area di partenza prima che il bersaglio si accendesse o nei primi 100 millisecondi dopo. Molte partenze false significano: eri impaziente o teso.',
    error_taps: 'Tocchi accanto al bersaglio dopo che avevi lasciato l’area di partenza.',
    rt_mean: 'Tempo medio da quando il bersaglio si accende a quando lasci l’area di partenza, su tutti i giri con rilascio. Meno è più veloce. Il tempo comprende il ritardo del dispositivo ed è confrontabile solo sullo stesso dispositivo. Se non hai mai lasciato in tempo, qui c’è il limite di tempo di 2000 millisecondi.',
    rt_median: 'Il valore centrale quando si ordinano tutti i tempi: metà erano più veloci, metà più lenti. I valori anomali lo influenzano meno della media.',
    rt_sd: 'Quanto variano i tuoi tempi di reazione (deviazione standard). Valori più piccoli indicano una reazione più regolare.',
    mt_mean: 'Tempo medio da quando lasci a quando tocchi il bersaglio, solo per i giri riusciti. Dipende da distanza e dimensione del bersaglio.',
  },
  tips: {
    few: 'Stavolta nessun giro con rilascio. Tieni il dito fermo su START e lascia appena il bersaglio si accende. Con un bersaglio grande (6 cm) e una distanza minore (10 cm) è più facile.',
    false_start: 'Lasci spesso troppo presto. Tieni il dito rilassato ma fermo e reagisci solo quando il bersaglio si accende davvero. Dopo una partenza falsa respira un momento.',
    aim: 'Tocchi spesso accanto al bersaglio. Tocca il bersaglio al centro e prenditi un po’ più di calma per il percorso – oppure scegli un bersaglio più grande.',
    slow: 'A volte non hai lasciato in tempo. Resta attento ma non teso: tieni rilassato, poi reagisci.',
    harder: 'Porti a termine quasi tutto senza errori. Se vuoi, rendi più difficile una sola impostazione, per esempio un bersaglio più piccolo o una distanza maggiore.',
    steady: 'I tuoi tempi di reazione variano parecchio. Resta rilassato e tieni il dito in modo regolare su START.',
    compare: 'Confronta questo giro solo con giri che avevano le stesse impostazioni – su questo dispositivo, con la stessa mano e la stessa posizione.',
  },
  feedback: {
    label: '{n} / {total}',
    start: 'START',
    hold: 'TIENI',
    hintIdle: 'Dito su START e tienilo',
    hintArmed: 'Tieni … tra poco si accende il bersaglio',
    hintGo: 'Ora lascia e tocca il bersaglio',
    falseStart: 'Lasciato troppo presto',
    late: 'Troppo lento',
    noTarget: 'Bersaglio non raggiunto',
    moreTitle: 'Altri valori',
    moreNote: 'Il tempo di reazione comprende anche il ritardo di schermo e sensore touch. Confrontalo solo con i tuoi valori su questo dispositivo.',
  },
  progression: [
    'Più facile: bersaglio grande (da 6 a 8 cm), distanza minore (da 10 a 15 cm), bersaglio sempre in alto.',
    'Più difficile: bersaglio piccolo (da 2 a 3 cm), distanza maggiore (da 25 a 35 cm), bersaglio a caso nel semicerchio.',
    'Cambia l’attesa (per esempio tra 1 e 5 secondi), così non ti abitui a un ritmo.',
    'La nostra regola pratica (non è un’indicazione della ricerca): guarda tempo di reazione e tempo di movimento separatamente e cambia sempre una sola impostazione alla volta. Se finisci senza partenze false e tocchi a vuoto, puoi rendere più difficile un’impostazione.',
  ],
  cautions: [
    'Calibra lo schermo una volta (“Calibra lo schermo”), così distanza e dimensione del bersaglio in centimetri sono corrette. Sugli schermi piccoli distanza e bersaglio vengono limitati a ciò che sta nell’immagine.',
    'Lo schermo è piatto o leggermente inclinato; START è in basso al centro, il bersaglio sopra. Appoggia la mano in modo che l’indice riposi su START senza premere. Per i confronti sempre la stessa mano e la stessa posizione.',
    'Movimenti rapidi e brevi: rilassa polso e dita regolarmente. In caso di disturbi a mano o braccio smetti.',
    'Il bersaglio si accende all’improvviso. Se sei fotosensibile o hai già avuto una crisi epilettica, non eseguire l’esercizio oppure parlane prima con il tuo medico.',
    'L’app misura solo quando lasci e quando tocchi il bersaglio – non dove guardi.',
  ],
  params: {
    trials: {
      label: 'Numero di giri',
      hint: 'Quanti giri ci sono (le partenze false non contano). Per medie affidabili sono sensati almeno 10–15.',
      short: '{v} giro|{v} giri',
    },
    minDelayMs: {
      label: 'Attesa minima',
      hint: 'Attesa più breve tra il tenere l’area di partenza e l’accendersi del bersaglio. Se l’attesa massima è più piccola, vale la più breve per entrambe.',
    },
    maxDelayMs: {
      label: 'Attesa massima',
      hint: 'Attesa più lunga. L’attesa effettiva è casuale tra le due, così non puoi indovinare il momento.',
    },
    distanceCm: {
      label: 'Distanza start–bersaglio',
      hint: 'Distanza tra area di partenza e bersaglio in centimetri. Distanze maggiori allungano il tempo di movimento. Sugli schermi piccoli la distanza viene limitata se necessario.',
    },
    targetCm: {
      label: 'Diametro del bersaglio',
      hint: 'Diametro del bersaglio in centimetri. Bersagli più piccoli richiedono una mira più precisa e allungano il tempo di movimento.',
    },
    target: {
      label: 'Posizione del bersaglio',
      hint: '“Sempre in alto”: il bersaglio sta in verticale sopra l’area di partenza. “A caso nel semicerchio”: la direzione cambia fino a circa 60 gradi a sinistra o a destra.',
      options: { top: 'Sempre in alto', random: 'A caso nel semicerchio' },
    },
    sound: {
      label: 'Suono',
      hint: 'Suono breve quando il bersaglio si accende e per colpi o errori. Il suono non cambia la confrontabilità.',
      options: { no: 'No', yes: 'Sì' },
    },
  },
};
