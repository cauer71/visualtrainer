import type { ExerciseTexts } from '../../core/types';

// Eigene Übung der Marke „Labor“ (klassische dichoptische Rot-Grün-Aufgabe), Texte in du-Form und einfacher Sprache.
// Formulierungsregeln: nur beschreiben, was man in der Übung tut; keine Wirk-, Heil- oder Sicherheitsversprechen, keine
// Prüf- oder Befundbegriffe, keine Normwerte, Vergleich nur mit sich selbst auf diesem Gerät. Die App sagt nie, welches
// Auge „schwächer“ ist; die Auswertung nach Farbe und Auge ist ein Hinweis, kein Befund.
// Sicherheitshinweise (Pflicht): Rot-Grün-Farbsehschwäche (Birch, 2012), Doppelbilder/Schielen/Schwindel/Kopf- oder
// Augenschmerz (Muchnick, 2008, S. 6 und 28), kurze Durchgänge mit Pausen, Abstand etwa 40 cm.
// `short` in params: Muster für die Kurzfassung der Einstellungen auf der Ergebnisseite.

export const de: ExerciseTexts = {
  title: 'Rot-Grün-Lesen',
  tagline: 'Lies mit Rot-Grün-Brille eine Folge in zwei Farben und tippe sie ein.',
  steps: [
    'Rot-Grün-Brille auf, Abstand etwa 40 cm.',
    'Lies ruhig die ganze Folge in beiden Farben.',
    'Tippe sie der Reihe nach ein, dann „Fertig“.',
  ],
  why:
    'Hier liest du eine Folge aus Ziffern oder Buchstaben, deren Zeichen teils rot, teils grün auf Schwarz stehen. Mit einer Rot-Grün-Brille sieht jedes Auge nur die Zeichen seiner Farbe hell; die ganze Folge liest nur, wer beide Augen zusammen nutzt. Ein Rahmen und ein kleines Kreuz sieht jedes Auge, sie helfen, die beiden Bilder zusammenzuhalten. Die App zählt nur, welche Zeichen und welche Farbe fehlten – das ist kein Befund, auch Brille, Bildschirmfarben und Helligkeit spielen eine Rolle. Ob das Üben beidäugiges Sehen im Alltag, im Sport oder im Verkehr verbessert, ist nicht belegt.',
  goodFor: ['Genaues Lesen', 'Ruhiger Blick', 'Aufmerksamkeit'],
  captions: {
    look: 'Ruhig auf das Kreuz in der Mitte schauen',
    read: 'Mit Brille liest du Rot und Grün zusammen',
    enter: 'Tippe die ganze Folge der Reihe nach ein',
    unsure: 'Nicht gesehen? Tippe das Fragezeichen',
    done: 'Dann tippst du auf „Fertig“',
  },
  metrics: {
    accuracy: 'Ganz richtige Folgen (Anteil)',
    correct: 'Ganz richtige Folgen',
    symbol_accuracy: 'Richtige Zeichen (Anteil)',
    err_red: 'Rote Zeichen: fehlend oder falsch',
    err_second: 'Grüne oder cyanfarbene Zeichen: fehlend oder falsch',
    err_left: 'Linkes Auge: fehlend oder falsch',
    err_right: 'Rechtes Auge: fehlend oder falsch',
    entry_mean: 'Eingabezeit je Folge (Mittel)',
    chars: 'Zeichen richtig insgesamt',
    size: 'Zeichenhöhe',
    shown: 'Anzeigedauer der Folge',
  },
  metricHints: {
    accuracy:
      'Anteil der Folgen, die du ganz richtig eingegeben hast: alle Zeichen an der richtigen Stelle. Das ist ein Vergleichswert mit dir selbst bei gleichen Einstellungen, keine Bewertung deiner Augen.',
    correct: 'Folgen, in denen du alle Zeichen an der richtigen Stelle eingegeben hast.',
    symbol_accuracy: 'Anteil aller Zeichen, die an der richtigen Stelle standen. Milder als die ganzen Folgen: Ein Teil richtig zählt hier mit.',
    err_red:
      'Anteil der roten Zeichen, die fehlten („?“ oder nicht eingegeben) oder falsch waren. Erst ab 20 Zeichen je Farbe gezeigt. Der Vergleich der Farben ist nur ein Hinweis, kein Befund: Auch Brille, Bildschirmfarben und Helligkeit spielen eine Rolle.',
    err_second:
      'Anteil der grünen (bei Rot und Cyan: cyanfarbenen) Zeichen, die fehlten oder falsch waren. Erst ab 20 Zeichen je Farbe gezeigt. Nur ein Hinweis, kein Befund.',
    err_left:
      'Anteil der Zeichen, die über das linke Auge laufen (die Farbe, die das Glas vor dem linken Auge durchlässt), und die fehlten oder falsch waren. Ein Hinweis, kein Befund; er stimmt nur, wenn „Linkes Glas“ richtig eingestellt ist.',
    err_right:
      'Anteil der Zeichen, die über das rechte Auge laufen, und die fehlten oder falsch waren. Ein Hinweis, kein Befund; er stimmt nur, wenn „Linkes Glas“ richtig eingestellt ist.',
    entry_mean:
      'Durchschnittliche Zeit von dem Moment, ab dem du eingeben kannst, bis „Fertig“. Bei unbegrenzter Anzeige zählt das Lesen mit, und die Verzögerung des Touch-Sensors ist enthalten. Nur auf demselben Gerät mit denselben Einstellungen vergleichbar.',
    chars: 'Wie viele Zeichen insgesamt an der richtigen Stelle standen, von allen gezeigten Zeichen.',
    size:
      'Höhe der Zeichen in Zentimetern und der Sehwinkel, unter dem sie bei deinem Abstand erscheinen (berechnet aus der Kalibrierung und dem Abstand). Sie ist kleiner als eingestellt, wenn die Folge sonst nicht auf den Bildschirm passt.',
    shown: 'Wie lange die Folge sichtbar war, bevor du eingeben konntest, oder „unbegrenzt“ (dann blieb sie beim Eintippen sichtbar).',
  },
  tips: {
    few:
      'Fast kein Zeichen war richtig. Schau dir das Prüfbild an: Mit dem roten Glas vor dem Auge sollte die grüne Fläche dunkel sein und umgekehrt. Sitzt jedes Glas vor dem richtigen Auge? Prüfe Brille, Helligkeit und Nachtmodus – oder wähle weniger Zeichen und unbegrenzte Anzeige.',
    oneColor:
      'Eine Farbe fehlte fast immer vollständig. Prüfe das Prüfbild und die Helligkeit. Bleibt es so oder siehst du Doppelbilder: nicht allein weiterüben, sondern bei deiner Optikerin, deinem Optiker oder bei einer Augenärztin, einem Augenarzt abklären lassen.',
    colorMore:
      'Eine Farbe fehlte öfter als die andere. Das ist nur ein Hinweis, kein Befund: Auch Brille, Bildschirmfarben und Helligkeit spielen eine Rolle. Prüfe zuerst das Prüfbild; bleibt es über mehrere Durchläufe so, sprich mit deiner Optikerin oder deinem Optiker.',
    notEnough: 'Für einen Farbvergleich braucht es mindestens 20 Zeichen je Farbe. Spiele mehr Folgen oder längere Folgen.',
    easier: 'Viele Folgen waren nicht ganz richtig. Mach es leichter: weniger Zeichen, größere Zeichen, abwechselnde Farben oder unbegrenzte Anzeige – und ändere immer nur eine Einstellung.',
    harder: 'Du löst fast alle Folgen ganz richtig. Wenn du magst, mach genau eine Einstellung schwerer: mehr Zeichen, kleinere Zeichen oder begrenzte Anzeige.',
    compare: 'Vergleiche diesen Durchlauf nur mit Durchläufen mit denselben Einstellungen – auf diesem Gerät und bei ähnlichem Licht.',
  },
  feedback: {
    trial: '{n} / {total}',
    right: 'Richtig',
    partial: '{k} von {n} Zeichen richtig',
    ask: 'Gib die Folge ein. Nicht gesehen? Tippe „?“.',
    erase: 'Löschen',
    done: 'Fertig',
    unlimited: 'unbegrenzt',
    nameRed: 'Rot',
    nameGreen: 'Grün',
    nameCyan: 'Cyan',
    lensRed: 'rot',
    lensGreen: 'grün',
    lensCyan: 'cyan',
    rowColor: '{c}',
    colorRow: '{bad} von {n}',
    colorDetail: '{p} % · {miss} fehlend · {wrong} verwechselt',
    colorTitle: 'Nach Farbe',
    colorNote: 'Das ist ein Vergleich innerhalb dieses Durchlaufs, kein Befund. Auch Brille, Bildschirmfarben und Helligkeit spielen eine Rolle.',
    colorFew: 'Für einen Farbvergleich braucht es mindestens {min} Zeichen je Farbe; hier waren es {a} und {b}. Spiele mehr Folgen oder längere Folgen.',
    eyeTitle: 'Nach Auge (Hinweis, kein Befund)',
    eyeLeft: 'Linkes Auge ({lens})',
    eyeRight: 'Rechtes Auge ({lens})',
    eyeMoreLeft: 'Zeichen, die über das linke Auge laufen, fehlten öfter oder waren öfter falsch.',
    eyeMoreRight: 'Zeichen, die über das rechte Auge laufen, fehlten öfter oder waren öfter falsch.',
    eyeEven: 'Zwischen den Farben gab es keinen deutlichen Unterschied (unter {gap} Prozentpunkten; unsere Faustregel).',
    eyeNote: 'Das ist kein Befund. Die Zuordnung stimmt nur, wenn „Linkes Glas“ richtig eingestellt ist.',
    charsValue: '{ok} von {n}',
    sizeValue: '{cm} cm',
    sizeDetail: 'etwa {deg}° bei {d} cm',
    limited: 'Auf diesem Bildschirm begrenzt',
    notCalibrated: 'nicht kalibriert: Schätzung',
    moreTitle: 'Weitere Werte',
    moreNote:
      'Bei unbegrenzter Anzeige enthält die Eingabezeit auch die Zeit zum Lesen und die Verzögerung des Touch-Sensors. Vergleiche nur mit deinen eigenen Werten auf diesem Gerät und mit denselben Einstellungen.',
    checkTitle: 'Prüfbild für die Brille (ohne Wertung)',
    checkText:
      'Mit dem roten Glas vor dem Auge sollte die grüne (bei Rot und Cyan: cyanfarbene) Fläche dunkel erscheinen und umgekehrt. Wenn nicht: Helligkeit und Brille prüfen oder die Farbtöne ändern.',
  },
  progression: [
    'Leichter: weniger Zeichen (4 bis 5), größere Zeichen (1,5 bis 2 cm), abwechselnde Farben, unbegrenzte Anzeige, Ziffern.',
    'Schwerer: mehr Zeichen (8 bis 12), kleinere Zeichen, zufällig gemischte Farben, Anzeige nur 4 oder 2 Sekunden, Buchstaben oder gemischt.',
    'Stelle ein, welches Glas vor deinem linken Auge sitzt („Linkes Glas“); nur dann kann die Auswertung nach Auge stimmen. Ein Farbvergleich gilt erst ab 20 Zeichen je Farbe – das sind etwa 4 Folgen mit 10 Zeichen.',
    'Unsere Faustregel (keine Vorgabe aus der Forschung): Löst du in drei Durchläufen hintereinander über 90 % ganz richtig, mach eine Einstellung schwerer; unter 50 % mach sie leichter. Ändere immer nur eine Einstellung auf einmal.',
  ],
  cautions: [
    'Rot-Grün-Farbsehschwäche: Etwa 8 von 100 Männern und 4 von 1000 Frauen europäischer Herkunft haben sie (Birch, 2012). Dann werden Rot und Grün falsch getrennt, und die Übung ist für dich nicht geeignet.',
    'Doppelbilder, Schielen, Schwindel, Kopfschmerz oder Augenschmerz: sofort aufhören und bei deiner Optikerin, deinem Optiker oder bei einer Augenärztin, einem Augenarzt abklären lassen (Muchnick, 2008, S. 6 und 28).',
    'Fehlt eine Farbe fast immer vollständig oder siehst du Doppelbilder: nicht allein weiterüben, sondern bei deiner Optikerin, deinem Optiker oder bei einer Augenärztin, einem Augenarzt abklären lassen.',
    'Halte jeden Durchlauf kurz, mach Pausen und höre bei Ermüdung auf. Halte den Kopf ruhig und sitze etwa 40 cm vom Bildschirm entfernt. Es gibt kein Flackern und keine schnellen Wechsel.',
    'Die Aufgabe selbst beruht auf den Farben Rot und Grün; die Bedienung (Tasten mit Beschriftung, ✓ und ✗ als Zeichen) kommt ohne Farbe aus.',
    'Prüfe vor dem Start das Prüfbild: Mit dem roten Glas vor dem Auge sollte die grüne Fläche dunkel erscheinen und umgekehrt. Schalte Nachtmodus und Farbfilter des Geräts aus; sie verändern die Farben. Vermeide Spiegelungen auf dem Bildschirm.',
    'Stell den Bildschirm einmal ein („Bildschirm kalibrieren“), damit die Zeichengröße in Zentimetern stimmt; im Ergebnis steht die Größe mit dem Sehwinkel. Auf kleinen Bildschirmen wird die Größe begrenzt, wenn die Folge sonst nicht passt.',
    'Die App kann nicht prüfen, ob du die Brille trägst oder wohin du schaust. Gemessen wird nur, was du eintippst. Die Auswertung nach Farbe und Auge ist ein Hinweis, kein Befund.',
  ],
  params: {
    symbols: {
      label: 'Zeichenart',
      hint: 'Ziffern, Buchstaben oder beides gemischt (ohne leicht verwechselbare Zeichen). In einer Folge kommt kein Zeichen doppelt vor, solange der Vorrat reicht.',
      options: { digits: 'Ziffern', letters: 'Buchstaben', mixed: 'Gemischt' },
    },
    length: {
      label: 'Länge der Folge',
      hint: 'Wie viele Zeichen eine Folge hat (4 bis 12). Längere Folgen sind schwerer und liefern mehr Zeichen für den Farbvergleich; verglichen wird ab 20 Zeichen je Farbe.',
      short: '{v} Zeichen|{v} Zeichen',
    },
    sizeCm: {
      label: 'Zeichengröße',
      hint: 'Höhe der Zeichen in Zentimetern (nach Kalibrierung des Bildschirms). 1,2 cm sind bei 40 cm Abstand etwa 1,7 Grad Sehwinkel; im Ergebnis steht die tatsächliche Größe mit Sehwinkel. Auf kleinen Bildschirmen wird sie begrenzt, wenn die Folge sonst nicht passt.',
      short: '{v} cm',
    },
    mix: {
      label: 'Verteilung der Farben',
      hint: 'Abwechselnd: Rot und Grün wechseln sich ab, der Anfang wechselt zufällig. Zufällig gemischt: Jede Farbe kommt in jeder Folge mindestens zu einem Drittel vor.',
      options: { alternate: 'Abwechselnd', random: 'Zufällig gemischt' },
    },
    leftLens: {
      label: 'Linkes Glas der Brille',
      hint: 'Welches Glas sitzt vor deinem linken Auge? Das braucht nur die Auswertung nach Auge; für die Aufgabe selbst ist es egal.',
      options: { red: 'Rot', green: 'Grün (bzw. Cyan)' },
    },
    showFor: {
      label: 'Anzeigedauer der Folge',
      hint: 'Unbegrenzt: Die Folge bleibt beim Eintippen sichtbar (zum Einstieg). Sonst verschwindet sie nach der Zeit, und du tippst sie danach aus dem Gedächtnis ein.',
      options: { unlimited: 'Unbegrenzt', '8': '8 Sekunden', '4': '4 Sekunden', '2': '2 Sekunden' },
    },
    trials: {
      label: 'Anzahl der Folgen',
      hint: 'Wie viele Folgen ein Durchlauf hat (6 bis 20). Halte den Durchlauf kurz; bei Ermüdung höre auf.',
      short: '{v} Folgen|{v} Folgen',
    },
    tones: {
      label: 'Farbtöne',
      hint: 'Standard ist reines Rot (#FF0000) und reines Grün (#00FF00). Alternative: Rot und Cyan (#FF0000 und #00FFFF), wenn deine Brille Rot-Cyan-Gläser hat. Das Prüfbild zeigt die eingestellten Farben.',
      options: { redgreen: 'Rot und Grün', redcyan: 'Rot und Cyan' },
    },
    brightness: {
      label: 'Helligkeit der Farben',
      hint: 'Anteil der vollen Farbhelligkeit, 80 bis 100 Prozent. Passt die Helligkeit nicht zur Brille, hilft oft ein kleiner Schritt; prüfe es mit dem Prüfbild.',
      short: '{v} %',
    },
  },
};

export const it: ExerciseTexts = {
  title: 'Leggere rosso-verde',
  tagline: 'Leggi con gli occhiali rosso-verdi una sequenza in due colori e digitala.',
  steps: [
    'Metti gli occhiali rosso-verdi, circa 40 cm.',
    'Leggi con calma tutta la sequenza nei due colori.',
    'Digitala in ordine, poi tocca “Fatto”.',
  ],
  why:
    'Qui leggi una sequenza di cifre o lettere i cui simboli sono in parte rossi e in parte verdi su nero. Con gli occhiali rosso-verdi ogni occhio vede chiari solo i simboli del proprio colore; la sequenza intera la legge solo chi usa i due occhi insieme. Una cornice e una piccola croce le vede ogni occhio e aiutano a tenere insieme le due immagini. L’app conta solo quali simboli e quale colore mancavano – non è un referto, contano anche occhiali, colori dello schermo e luminosità. Non è dimostrato che l’esercizio migliori la visione con due occhi nella vita quotidiana, nello sport o nel traffico.',
  goodFor: ['Lettura precisa', 'Sguardo calmo', 'Attenzione'],
  captions: {
    look: 'Guarda con calma la croce al centro',
    read: 'Con gli occhiali leggi entrambi i colori',
    enter: 'Digita tutta la sequenza in ordine',
    unsure: 'Non visto? Tocca il punto interrogativo',
    done: 'Poi tocca “Fatto”',
  },
  metrics: {
    accuracy: 'Sequenze completamente giuste (quota)',
    correct: 'Sequenze completamente giuste',
    symbol_accuracy: 'Simboli giusti (quota)',
    err_red: 'Simboli rossi: mancanti o sbagliati',
    err_second: 'Simboli verdi o ciano: mancanti o sbagliati',
    err_left: 'Occhio sinistro: mancanti o sbagliati',
    err_right: 'Occhio destro: mancanti o sbagliati',
    entry_mean: 'Tempo di digitazione per sequenza (media)',
    chars: 'Simboli giusti in totale',
    size: 'Altezza dei simboli',
    shown: 'Durata di visualizzazione della sequenza',
  },
  metricHints: {
    accuracy:
      'Quota delle sequenze che hai digitato completamente giuste: tutti i simboli al posto giusto. È un valore di confronto con te stesso a parità di impostazioni, non una valutazione dei tuoi occhi.',
    correct: 'Sequenze in cui hai digitato tutti i simboli al posto giusto.',
    symbol_accuracy: 'Quota di tutti i simboli che erano al posto giusto. Più indulgente delle sequenze complete: qui conta anche una parte giusta.',
    err_red:
      'Quota dei simboli rossi che mancavano (“?” o non digitati) o erano sbagliati. Mostrata solo da 20 simboli per colore. Il confronto dei colori è solo un’indicazione, non un referto: contano anche occhiali, colori dello schermo e luminosità.',
    err_second:
      'Quota dei simboli verdi (con rosso e ciano: ciano) che mancavano o erano sbagliati. Mostrata solo da 20 simboli per colore. Solo un’indicazione, non un referto.',
    err_left:
      'Quota dei simboli che passano per l’occhio sinistro (il colore che la lente davanti all’occhio sinistro lascia passare) e che mancavano o erano sbagliati. Un’indicazione, non un referto; vale solo se “Lente sinistra” è impostata correttamente.',
    err_right:
      'Quota dei simboli che passano per l’occhio destro e che mancavano o erano sbagliati. Un’indicazione, non un referto; vale solo se “Lente sinistra” è impostata correttamente.',
    entry_mean:
      'Tempo medio da quando puoi digitare fino a “Fatto”. Con la visualizzazione illimitata conta anche la lettura, ed è compreso il ritardo del sensore touch. Confrontabile solo sullo stesso dispositivo con le stesse impostazioni.',
    chars: 'Quanti simboli in totale erano al posto giusto, su tutti i simboli mostrati.',
    size:
      'Altezza dei simboli in centimetri e angolo visivo sotto cui appaiono alla tua distanza (calcolato dalla calibrazione e dalla distanza). È minore di quella impostata se la sequenza altrimenti non entra nello schermo.',
    shown: 'Per quanto tempo la sequenza è rimasta visibile prima che potessi digitare, oppure “illimitata” (allora è rimasta visibile mentre digitavi).',
  },
  tips: {
    few:
      'Quasi nessun simbolo era giusto. Guarda l’immagine di controllo: con la lente rossa davanti all’occhio la superficie verde dovrebbe apparire scura e viceversa. Ogni lente è davanti all’occhio giusto? Controlla occhiali, luminosità e modalità notturna – oppure scegli meno simboli e visualizzazione illimitata.',
    oneColor:
      'Un colore mancava quasi sempre del tutto. Controlla l’immagine di controllo e la luminosità. Se resta così o vedi doppio: non esercitarti da solo, fai chiarire la cosa dall’ottico o dall’oculista.',
    colorMore:
      'Un colore mancava più spesso dell’altro. È solo un’indicazione, non un referto: contano anche occhiali, colori dello schermo e luminosità. Controlla prima l’immagine di controllo; se resta così per più giri, parlane con il tuo ottico.',
    notEnough: 'Per un confronto dei colori servono almeno 20 simboli per colore. Gioca più sequenze o sequenze più lunghe.',
    easier: 'Molte sequenze non erano completamente giuste. Rendilo più facile: meno simboli, simboli più grandi, colori alternati o visualizzazione illimitata – e cambia sempre una sola impostazione.',
    harder: 'Risolvi quasi tutte le sequenze completamente bene. Se vuoi, rendi più difficile una sola impostazione: più simboli, simboli più piccoli o visualizzazione limitata.',
    compare: 'Confronta questo giro solo con giri con le stesse impostazioni – su questo dispositivo e con luce simile.',
  },
  feedback: {
    trial: '{n} / {total}',
    right: 'Giusto',
    partial: '{k} simboli su {n} giusti',
    ask: 'Digita la sequenza. Non visto? Tocca “?”.',
    erase: 'Cancella',
    done: 'Fatto',
    unlimited: 'illimitata',
    nameRed: 'Rosso',
    nameGreen: 'Verde',
    nameCyan: 'Ciano',
    lensRed: 'rossa',
    lensGreen: 'verde',
    lensCyan: 'ciano',
    rowColor: '{c}',
    colorRow: '{bad} su {n}',
    colorDetail: '{p} % · {miss} mancanti · {wrong} scambiati',
    colorTitle: 'Per colore',
    colorNote: 'È un confronto all’interno di questo giro, non un referto. Contano anche occhiali, colori dello schermo e luminosità.',
    colorFew: 'Per un confronto dei colori servono almeno {min} simboli per colore; qui erano {a} e {b}. Gioca più sequenze o sequenze più lunghe.',
    eyeTitle: 'Per occhio (indicazione, non referto)',
    eyeLeft: 'Occhio sinistro ({lens})',
    eyeRight: 'Occhio destro ({lens})',
    eyeMoreLeft: 'I simboli che passano per l’occhio sinistro mancavano più spesso o erano sbagliati più spesso.',
    eyeMoreRight: 'I simboli che passano per l’occhio destro mancavano più spesso o erano sbagliati più spesso.',
    eyeEven: 'Tra i colori non c’era una differenza netta (sotto {gap} punti percentuali; la nostra regola pratica).',
    eyeNote: 'Non è un referto. L’assegnazione vale solo se “Lente sinistra” è impostata correttamente.',
    charsValue: '{ok} su {n}',
    sizeValue: '{cm} cm',
    sizeDetail: 'circa {deg}° a {d} cm',
    limited: 'Limitata su questo schermo',
    notCalibrated: 'non calibrato: stima',
    moreTitle: 'Altri valori',
    moreNote:
      'Con la visualizzazione illimitata il tempo di digitazione comprende anche il tempo di lettura e il ritardo del sensore touch. Confronta solo con i tuoi valori su questo dispositivo e con le stesse impostazioni.',
    checkTitle: 'Immagine di controllo per gli occhiali (senza valutazione)',
    checkText:
      'Con la lente rossa davanti all’occhio la superficie verde (con rosso e ciano: ciano) dovrebbe apparire scura e viceversa. In caso contrario: controlla luminosità e occhiali o cambia le tonalità.',
  },
  progression: [
    'Più facile: meno simboli (4–5), simboli più grandi (1,5–2 cm), colori alternati, visualizzazione illimitata, cifre.',
    'Più difficile: più simboli (8–12), simboli più piccoli, colori mescolati a caso, visualizzazione di soli 4 o 2 secondi, lettere o miste.',
    'Imposta quale lente è davanti al tuo occhio sinistro (“Lente sinistra”); solo così la valutazione per occhio può essere corretta. Un confronto dei colori vale solo da 20 simboli per colore – circa 4 sequenze di 10 simboli.',
    'La nostra regola pratica (non è una indicazione della ricerca): se in tre giri di fila risolvi completamente bene oltre il 90 %, rendi più difficile un’impostazione; sotto il 50 % rendila più facile. Cambia sempre una sola impostazione alla volta.',
  ],
  cautions: [
    'Alterazione della visione dei colori rosso-verde: circa 8 uomini su 100 e 4 donne su 1000 di origine europea (Birch, 2012). Allora rosso e verde vengono separati in modo errato e l’esercizio non è adatto a te.',
    'Visione doppia, strabismo, vertigini, mal di testa o dolore agli occhi: smetti subito e fai chiarire la cosa dal tuo ottico o dall’oculista (Muchnick, 2008, p. 6 e 28).',
    'Se un colore manca quasi sempre del tutto o vedi doppio: non esercitarti da solo, fai chiarire la cosa dal tuo ottico o dall’oculista.',
    'Tieni ogni giro breve, fai pause e smetti in caso di stanchezza. Tieni la testa ferma e siediti a circa 40 cm dallo schermo. Non c’è sfarfallio né cambi rapidi.',
    'Il compito stesso si basa sui colori rosso e verde; l’uso (tasti con etichetta, ✓ e ✗ come segni) non dipende dal colore.',
    'Prima di iniziare controlla l’immagine di controllo: con la lente rossa davanti all’occhio la superficie verde dovrebbe apparire scura e viceversa. Disattiva la modalità notturna e i filtri colore del dispositivo; cambiano i colori. Evita i riflessi sullo schermo.',
    'Imposta lo schermo una volta (“Calibra lo schermo”) perché la dimensione dei simboli in centimetri sia corretta; nel risultato trovi la dimensione con l’angolo visivo. Sugli schermi piccoli la dimensione viene limitata se la sequenza altrimenti non entra.',
    'L’app non può controllare se porti gli occhiali o dove guardi. Si misura solo ciò che digiti. La valutazione per colore e per occhio è un’indicazione, non un referto.',
  ],
  params: {
    symbols: {
      label: 'Tipo di simboli',
      hint: 'Cifre, lettere o entrambe mescolate (senza simboli facilmente confondibili). In una sequenza nessun simbolo compare due volte finché la scorta basta.',
      options: { digits: 'Cifre', letters: 'Lettere', mixed: 'Miste' },
    },
    length: {
      label: 'Lunghezza della sequenza',
      hint: 'Quanti simboli ha una sequenza (da 4 a 12). Sequenze più lunghe sono più difficili e danno più simboli per il confronto dei colori; si confronta da 20 simboli per colore.',
      short: '{v} simbolo|{v} simboli',
    },
    sizeCm: {
      label: 'Dimensione dei simboli',
      hint: 'Altezza dei simboli in centimetri (dopo la calibrazione dello schermo). 1,2 cm a 40 cm di distanza sono circa 1,7 gradi di angolo visivo; nel risultato trovi la dimensione effettiva con l’angolo visivo. Sugli schermi piccoli viene limitata se la sequenza altrimenti non entra.',
      short: '{v} cm',
    },
    mix: {
      label: 'Distribuzione dei colori',
      hint: 'Alternati: rosso e verde si alternano, l’inizio cambia a caso. Mescolati a caso: ogni colore compare in ogni sequenza almeno per un terzo.',
      options: { alternate: 'Alternati', random: 'Mescolati a caso' },
    },
    leftLens: {
      label: 'Lente sinistra degli occhiali',
      hint: 'Quale lente è davanti al tuo occhio sinistro? Serve solo alla valutazione per occhio; per il compito stesso non importa.',
      options: { red: 'Rossa', green: 'Verde (o ciano)' },
    },
    showFor: {
      label: 'Durata di visualizzazione della sequenza',
      hint: 'Illimitata: la sequenza resta visibile mentre digiti (per iniziare). Altrimenti scompare dopo il tempo e la digiti poi a memoria.',
      options: { unlimited: 'Illimitata', '8': '8 secondi', '4': '4 secondi', '2': '2 secondi' },
    },
    trials: {
      label: 'Numero di sequenze',
      hint: 'Quante sequenze ha un giro (da 6 a 20). Tieni il giro breve; in caso di stanchezza smetti.',
      short: '{v} sequenza|{v} sequenze',
    },
    tones: {
      label: 'Tonalità',
      hint: 'Lo standard è rosso puro (#FF0000) e verde puro (#00FF00). Alternativa: rosso e ciano (#FF0000 e #00FFFF), se i tuoi occhiali hanno lenti rosso-ciano. L’immagine di controllo mostra i colori impostati.',
      options: { redgreen: 'Rosso e verde', redcyan: 'Rosso e ciano' },
    },
    brightness: {
      label: 'Luminosità dei colori',
      hint: 'Quota della luminosità piena dei colori, dall’80 al 100 per cento. Se la luminosità non si adatta agli occhiali, spesso aiuta un piccolo passo; controllalo con l’immagine di controllo.',
      short: '{v} %',
    },
  },
};
