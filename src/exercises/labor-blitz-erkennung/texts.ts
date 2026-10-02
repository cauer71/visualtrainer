import type { ExerciseTexts } from '../../core/types';

// Quelle: Labor-Prototyp (help/flash.js), für Blickfit geglättet: du-Form, einfache Sprache, Fachwörter erklärt
// (Fixationskreuz → „Kreuz in der Mitte“, Tachistoskop-Prinzip entfällt, „Schwelle“ und „Umkehrpunkte“ erklärt).
// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-, Heil- oder
// Sicherheitsversprechen, keine Prüfbegriffe, keine Normwerte, Vergleich nur mit sich selbst auf diesem Gerät.
// Ehrlich benannt: Blick wird nicht gemessen; Anzeigedauer ist auf ganze Bilder gerundet; Touch-Verzögerung.
// `short` in params: Vorlage für die Kurzfassung der Einstellungen auf der Ergebnisseite.

export const de: ExerciseTexts = {
  title: 'Blitz-Erkennung',
  tagline: 'Zeichen blitzen kurz auf – erkenne sie und tippe sie ein.',
  steps: [
    'Schau auf das Kreuz in der Mitte.',
    'Merke dir die Zeichen, die kurz aufblitzen.',
    'Tippe sie in der gleichen Reihenfolge ein.',
  ],
  why:
    'Hier übst du, aus einem sehr kurzen Blick möglichst viel aufzunehmen: Ziffern oder Buchstaben stehen nur Bruchteile einer Sekunde da, danach tippst du sie aus dem Gedächtnis ein. Wer wenig Zeit hat, sieht oft mehr, als er hinterher wiedergeben kann – ein Teil der Aufgabe ist also das kurze Merken. Ob das Üben im Alltag, im Sport oder im Verkehr etwas bringt, ist nicht belegt.',
  goodFor: ['Schnelles Erfassen', 'Kurzes Merken', 'Aufmerksamkeit'],
  captions: {
    look: 'Blick auf das Kreuz in der Mitte',
    flash: 'Die Zeichen blitzen nur kurz auf',
    enter: 'Tippe sie der Reihe nach ein',
    again: 'Wieder: erst schauen, dann tippen',
    miss: 'Falsch? Dann siehst du, was es war',
  },
  metrics: {
    correct: 'Ganz richtige Durchgänge',
    accuracy: 'Ganz richtig (Anteil)',
    symbol_accuracy: 'Richtige Zeichen (Anteil)',
    entry_mean: 'Eingabezeit (Mittel)',
    threshold: 'Geschätzte Schwelle der Dauer',
    threshold_frames: 'Schwelle in Bildern',
    final_duration: 'Dauer des letzten Durchgangs',
    duration: 'Eingestellte Dauer',
    shown: 'Gezeigte Dauer (gemessen, Mittel)',
    shown_sd: 'Schwankung der gemessenen Dauer',
    refresh: 'Bildwiederholrate (geschätzt)',
    jerks: 'Gestörte Durchgänge',
    size: 'Zeichenhöhe (tatsächlich)',
  },
  metricHints: {
    correct: 'Durchgänge, in denen du alle Zeichen an der richtigen Stelle eingegeben hast.',
    accuracy:
      'Anteil der Durchgänge, die du ganz richtig hattest. Mit „Dauer automatisch anpassen“ pendelt sich dieser Wert durch das Verfahren meist deutlich über der Hälfte ein (rechnerisch bei etwa 70 %) – dann ist die Schwelle der aussagekräftigere Wert.',
    symbol_accuracy: 'Anteil der Zeichen, die an der richtigen Stelle standen. Milder als die ganzen Durchgänge: Ein Teil richtig zählt hier mit.',
    entry_mean: 'Durchschnittliche Zeit vom Erscheinen des Tastenfelds bis zur letzten Taste. Sie enthält die Verzögerung des Touch-Sensors und ist nur auf demselben Gerät vergleichbar.',
    threshold:
      'Geschätzte Dauer, um die sich das Verfahren einpendelt – rechnerisch dort, wo etwa 7 von 10 Durchgängen ganz richtig sind. Sie ist der Mittelwert der Stellen, an denen die Dauer von kürzer zu länger oder umgekehrt wechselte, und bei kurzen Läufen ungenau. Nur mit „Dauer automatisch anpassen“ und wenn genug Wechsel vorkamen; sie gilt nur für genau diese Einstellungen.',
    threshold_frames: 'Dieselbe Schwelle in Bildern des Bildschirms. Kürzer als ein Bild geht nicht.',
    final_duration: 'Gemessene Dauer der Anzeige im letzten Durchgang.',
    duration: 'Die von dir eingestellte Dauer (bei automatischer Anpassung der Startwert). Gezeigt werden nur ganze Bilder, deshalb kann die gemessene Dauer etwas abweichen.',
    shown: 'Mittlere, tatsächlich gemessene Dauer der Anzeige. Sie ist ein Vielfaches der Bilddauer des Bildschirms und kann deshalb von der eingestellten Dauer abweichen.',
    shown_sd: 'Wie stark die gemessene Dauer von Durchgang zu Durchgang schwankt. Kleine Werte sind gut; große Werte heißen, dass Gerät oder Bildschirm ruckeln.',
    refresh: 'Aus den Zeitpunkten der Bilder geschätzt. 60 Hz bedeutet ein Bild alle 17 Millisekunden, 120 Hz alle 8 Millisekunden.',
    jerks: 'Durchgänge, in denen ein Bild ausgelassen oder doppelt gezeigt wurde. Sie gehen nicht in die automatische Anpassung ein. Viele davon? Schließe andere Programme und Apps.',
    size: 'Höhe der Zeichen in Zentimetern, wie sie auf diesem Bildschirm wirklich gezeigt wurde. Sie ist kleiner als eingestellt, wenn die Zeichenzeile sonst nicht auf den Bildschirm passt.',
  },
  tips: {
    few: 'Diesmal war kein Durchgang ganz richtig. Probiere eine längere Anzeige (zum Beispiel 400 Millisekunden) oder weniger Zeichen.',
    jerks: 'Bei einigen Durchgängen hat der Bildschirm geruckelt. Schließe andere Programme und Apps, dann ist die Anzeigedauer verlässlicher.',
    threshold: 'Die Schwelle gilt nur für diese Einstellungen. Vergleiche sie mit früheren Durchläufen mit denselben Einstellungen – auf diesem Gerät und bei ähnlichem Licht.',
    adaptiveShort: 'Für eine Schwelle gab es zu wenige Wechsel zwischen kürzer und länger. Spiele mehr Durchgänge (mindestens 20).',
    partial: 'Einzelne Zeichen erkennst du, ganz richtig sind aber wenige Durchgänge. Mit weniger Zeichen oder längerer Anzeige wird es leichter – ändere nur eine Einstellung.',
    easier: 'Viele Durchgänge waren nicht ganz richtig. Mach es leichter: weniger Zeichen, längere Anzeige oder ohne Maske – und ändere immer nur eine Einstellung.',
    harder: 'Du löst fast alle Durchgänge ganz richtig. Wenn du magst, mach genau eine Einstellung schwerer: kürzere Anzeige oder ein Zeichen mehr.',
    compare: 'Vergleiche diesen Durchlauf nur mit Durchläufen mit denselben Einstellungen – auf diesem Gerät und bei ähnlichem Licht.',
  },
  feedback: {
    trial: '{n} / {total}',
    right: 'Richtig',
    shown: 'Gezeigt: {s}',
    yours: 'Deine Eingabe: {s}',
    ask: 'Welche Zeichen waren es?',
    erase: 'Löschen',
    moreTitle: 'Weitere Werte',
    moreNote:
      'Die Anzeigedauer ist auf Bildschirmen auf ganze Bilder gerundet (bei 60 Hz etwa 17 ms je Bild); gezeigt wird die tatsächlich gemessene Dauer. Die Eingabezeit enthält die Verzögerung des Touch-Sensors. Vergleiche nur mit deinen eigenen Werten auf diesem Gerät.',
    startValue: 'Startwert',
    framesValue: '{n} Bilder',
    limited: 'Auf diesem Bildschirm begrenzt',
  },
  progression: [
    'Leichter: weniger Zeichen (2 bis 3), längere Dauer (300 bis 500 ms), Ziffern, ohne Maske.',
    'Schwerer: mehr Zeichen (4 bis 6), kürzere Dauer (50 bis 120 ms), Buchstaben, mit Maske.',
    'Mit „Dauer automatisch anpassen“ wird die Anzeige nach zwei richtigen Durchgängen in Folge kürzer und nach jedem Fehler länger. Die Schwelle ist der Mittelwert der Stellen, an denen es umkehrt; dafür sind mindestens 20 Durchgänge sinnvoll.',
    'Unsere Faustregel (keine Vorgabe aus der Forschung): Löst du in drei Durchläufen hintereinander über 90 % ganz richtig, mach eine Einstellung schwerer; unter 60 % mach sie leichter. Ändere immer nur eine Einstellung auf einmal.',
  ],
  cautions: [
    'Die Zeichen blitzen sehr kurz auf, danach erscheint kurz eine Maske. Das sind schnelle Helligkeitswechsel – höchstens einer pro Sekunde und nur auf einer kleinen Fläche in der Mitte. Bist du lichtempfindlich oder hattest du schon einmal einen epileptischen Anfall, verzichte bitte darauf.',
    'Stell den Bildschirm einmal ein („Bildschirm kalibrieren“), damit die Zeichenhöhe in Zentimetern stimmt. Auf kleinen Bildschirmen wird die Höhe begrenzt, wenn die Zeichen sonst nicht nebeneinander passen; das steht dann im Ergebnis.',
    'Die Anzeigedauer ist auf Bildschirmen auf ganze Bilder gerundet: bei 60 Hz in Schritten von etwa 17 ms, bei 120 Hz von etwa 8 ms. Die App zählt die Bilder und zeigt dir die tatsächlich gemessene Dauer. Sehr kurze Zeiten unter etwa 50 ms bestehen je nach Bildschirm nur aus wenigen Bildern. Wie lange die Zeichen wirklich leuchten, hängt zusätzlich von der Bildschirmtechnik ab; das misst die App nicht.',
    'Sitz etwa 50 bis 60 cm vom Bildschirm entfernt. Vermeide Spiegelungen und grelles Licht: Kurze Anzeigen leiden darunter besonders.',
    'Die App kann nicht prüfen, wohin du schaust. Das Kreuz in der Mitte ist eine Bitte; gemessen wird nur, was du eintippst.',
    'Halte die Einheit kurz (höchstens etwa 10 Minuten) und mach Pausen. Bei Kopfschmerzen, Flimmern oder Augenbeschwerden: aufhören.',
  ],
  params: {
    trials: {
      label: 'Anzahl der Durchgänge',
      hint: 'Für eine halbwegs verlässliche Schwelle sind mindestens 20 Durchgänge sinnvoll.',
    },
    symbols: {
      label: 'Zeichenart',
      hint: 'Ziffern oder Buchstaben; in einem Durchgang kommt kein Zeichen doppelt vor. Bei Buchstaben gibt es mehr Auswahl (18 statt 10), Raten führt seltener zum Erfolg.',
      options: { digits: 'Ziffern', letters: 'Buchstaben' },
    },
    length: {
      label: 'Zeichen pro Durchgang',
      hint: 'Wie viele Zeichen auf einmal aufblitzen. Mehr Zeichen sind schwerer. Auf kleinen Bildschirmen passen weniger große Zeichen nebeneinander.',
      short: '{v} Zeichen|{v} Zeichen',
    },
    durationMs: {
      label: 'Anzeigedauer',
      hint: 'Wie lange die Zeichen zu sehen sind, in Millisekunden. Gezeigt werden ganze Bilder des Bildschirms (bei 60 Hz etwa 17 ms je Bild); die gemessene Dauer steht im Ergebnis. Mit automatischer Anpassung ist das der Startwert.',
    },
    adaptive: {
      label: 'Dauer automatisch anpassen',
      hint: 'Bei „Ja“ wird die Dauer nach zwei richtigen Durchgängen in Folge kürzer und nach jedem Fehler länger. So sucht die App die Dauer, bei der etwa 7 von 10 Durchgängen ganz richtig sind (rechnerischer Wert, bei kurzen Läufen ungenau).',
      options: { no: 'Nein (feste Dauer)', yes: 'Ja (Schwelle suchen)' },
    },
    mask: {
      label: 'Maske nach der Anzeige',
      hint: 'Direkt nach der Anzeige erscheint kurz (0,15 s) ein Muster aus grauen Blöcken. Ohne Maske klingt der Eindruck der Zeichen noch etwas nach – du hast dann effektiv länger Zeit als die Anzeigedauer.',
      options: { yes: 'Ja', no: 'Nein' },
    },
    sizeCm: {
      label: 'Zeichenhöhe',
      hint: 'Höhe der Zeichen in Zentimetern. Bei sehr kurzen Zeiten helfen größere Zeichen. Auf kleinen Bildschirmen wird die Höhe begrenzt, wenn die Zeichen sonst nicht passen.',
      short: '{v} cm',
    },
  },
};

export const it: ExerciseTexts = {
  title: 'Blitz-Erkennung',
  tagline: 'I simboli lampeggiano per un attimo – riconoscili e digitali.',
  steps: [
    'Guarda la croce al centro.',
    'Ricorda i simboli che lampeggiano un attimo.',
    'Digitali nello stesso ordine.',
  ],
  why:
    'Qui ti alleni a cogliere il più possibile in un colpo d’occhio molto breve: cifre o lettere restano visibili solo per frazioni di secondo, poi le digiti a memoria. Con poco tempo si vede spesso più di quanto si riesca a riferire dopo – una parte del compito è quindi ricordare per un istante. Non è dimostrato che l’allenamento serva nella vita quotidiana, nello sport o nel traffico.',
  goodFor: ['Cogliere in fretta', 'Ricordare per un istante', 'Attenzione'],
  captions: {
    look: 'Guarda la croce al centro',
    flash: 'I simboli lampeggiano solo un attimo',
    enter: 'Digitali uno dopo l’altro',
    again: 'Di nuovo: prima guarda, poi digita',
    miss: 'Sbagliato? Vedi cos’era',
  },
  metrics: {
    correct: 'Turni completamente giusti',
    accuracy: 'Completamente giusti (quota)',
    symbol_accuracy: 'Simboli giusti (quota)',
    entry_mean: 'Tempo di digitazione (media)',
    threshold: 'Soglia stimata della durata',
    threshold_frames: 'Soglia in immagini',
    final_duration: 'Durata dell’ultimo turno',
    duration: 'Durata impostata',
    shown: 'Durata mostrata (misurata, media)',
    shown_sd: 'Variazione della durata misurata',
    refresh: 'Frequenza dello schermo (stimata)',
    jerks: 'Turni disturbati',
    size: 'Altezza dei simboli (effettiva)',
  },
  metricHints: {
    correct: 'Turni in cui hai digitato tutti i simboli al posto giusto.',
    accuracy:
      'Quota dei turni completamente giusti. Con “Adatta la durata automaticamente” questo valore, per via del metodo, si assesta di solito nettamente sopra la metà (in teoria intorno al 70 %) – allora la soglia è il valore più significativo.',
    symbol_accuracy: 'Quota dei simboli al posto giusto. Più indulgente dei turni completi: qui conta anche una parte giusta.',
    entry_mean: 'Tempo medio da quando compare la tastiera fino all’ultimo tasto. Comprende il ritardo del sensore touch ed è confrontabile solo sullo stesso dispositivo.',
    threshold:
      'Durata stimata attorno alla quale si assesta il metodo – in teoria dove circa 7 turni su 10 sono completamente giusti. È la media dei punti in cui la durata passava da più breve a più lunga o viceversa, ed è imprecisa nei giri brevi. Solo con “Adatta la durata automaticamente” e se ci sono stati abbastanza cambi; vale solo per queste impostazioni.',
    threshold_frames: 'La stessa soglia in immagini dello schermo. Meno di un’immagine non è possibile.',
    final_duration: 'Durata misurata della visualizzazione nell’ultimo turno.',
    duration: 'La durata che hai impostato (con l’adattamento automatico il valore di partenza). Si mostrano solo immagini intere, perciò la durata misurata può discostarsi un poco.',
    shown: 'Durata media realmente misurata della visualizzazione. È un multiplo della durata di un’immagine dello schermo e può quindi differire da quella impostata.',
    shown_sd: 'Quanto varia la durata misurata da un turno all’altro. Valori piccoli sono buoni; valori grandi indicano che dispositivo o schermo scattano.',
    refresh: 'Stimata dagli istanti delle immagini. 60 Hz significa un’immagine ogni 17 millisecondi, 120 Hz ogni 8 millisecondi.',
    jerks: 'Turni in cui un’immagine è stata saltata o mostrata due volte. Non entrano nell’adattamento automatico. Sono molti? Chiudi altri programmi e app.',
    size: 'Altezza dei simboli in centimetri, come è stata davvero mostrata su questo schermo. È minore di quella impostata se la riga di simboli altrimenti non entra nello schermo.',
  },
  tips: {
    few: 'Stavolta nessun turno era completamente giusto. Prova una visualizzazione più lunga (per esempio 400 millisecondi) o meno simboli.',
    jerks: 'In alcuni turni lo schermo è scattato. Chiudi altri programmi e app: la durata di visualizzazione sarà più affidabile.',
    threshold: 'La soglia vale solo per queste impostazioni. Confrontala con giri precedenti con le stesse impostazioni – su questo dispositivo e con luce simile.',
    adaptiveShort: 'Per una soglia c’erano troppi pochi cambi tra più breve e più lungo. Gioca più turni (almeno 20).',
    partial: 'Riconosci singoli simboli, ma pochi turni sono completamente giusti. Con meno simboli o visualizzazione più lunga è più facile – cambia una sola impostazione.',
    easier: 'Molti turni non erano completamente giusti. Rendilo più facile: meno simboli, visualizzazione più lunga o senza maschera – e cambia sempre una sola impostazione.',
    harder: 'Risolvi quasi tutti i turni completamente bene. Se vuoi, rendi più difficile una sola impostazione: visualizzazione più breve o un simbolo in più.',
    compare: 'Confronta questo giro solo con giri con le stesse impostazioni – su questo dispositivo e con luce simile.',
  },
  feedback: {
    trial: '{n} / {total}',
    right: 'Giusto',
    shown: 'Mostrato: {s}',
    yours: 'Hai digitato: {s}',
    ask: 'Quali simboli erano?',
    erase: 'Cancella',
    moreTitle: 'Altri valori',
    moreNote:
      'Sugli schermi la durata di visualizzazione è arrotondata a immagini intere (a 60 Hz circa 17 ms per immagine); viene mostrata la durata realmente misurata. Il tempo di digitazione comprende il ritardo del sensore touch. Confronta solo con i tuoi valori su questo dispositivo.',
    startValue: 'Valore di partenza',
    framesValue: '{n} immagini',
    limited: 'Limitata su questo schermo',
  },
  progression: [
    'Più facile: meno simboli (2–3), durata più lunga (300–500 ms), cifre, senza maschera.',
    'Più difficile: più simboli (4–6), durata più breve (50–120 ms), lettere, con maschera.',
    'Con “Adatta la durata automaticamente” la visualizzazione diventa più breve dopo due turni giusti di fila e più lunga dopo ogni errore. La soglia è la media dei punti in cui avviene l’inversione; servono almeno 20 turni.',
    'La nostra regola pratica (non è una indicazione della ricerca): se in tre giri di fila risolvi completamente bene oltre il 90 %, rendi più difficile un’impostazione; sotto il 60 % rendila più facile. Cambia sempre una sola impostazione alla volta.',
  ],
  cautions: [
    'I simboli lampeggiano per un attimo, poi compare brevemente una maschera. Sono rapidi cambi di luminosità – al massimo uno al secondo e solo su una piccola area al centro. Se sei fotosensibile o hai già avuto una crisi epilettica, per favore non eseguirlo.',
    'Imposta lo schermo una volta (“Calibra lo schermo”) perché l’altezza dei simboli in centimetri sia corretta. Sugli schermi piccoli l’altezza viene limitata se i simboli altrimenti non stanno affiancati; lo vedi poi nel risultato.',
    'Sugli schermi la durata di visualizzazione è arrotondata a immagini intere: a 60 Hz a passi di circa 17 ms, a 120 Hz di circa 8 ms. L’app conta le immagini e ti mostra la durata realmente misurata. Tempi molto brevi, sotto circa 50 ms, sono fatti di poche immagini a seconda dello schermo. Per quanto tempo i simboli restano davvero accesi dipende inoltre dalla tecnologia dello schermo; l’app non lo misura.',
    'Siediti a circa 50–60 cm dallo schermo. Evita riflessi e luce abbagliante: le visualizzazioni brevi ne risentono in modo particolare.',
    'L’app non può controllare dove guardi. La croce al centro è una richiesta; si misura solo ciò che digiti.',
    'Tieni breve la sessione (al massimo circa 10 minuti) e fai pause. In caso di mal di testa, sfarfallio o disturbi agli occhi: smetti.',
  ],
  params: {
    trials: {
      label: 'Numero di turni',
      hint: 'Per una soglia abbastanza affidabile sono sensati almeno 20 turni.',
    },
    symbols: {
      label: 'Tipo di simboli',
      hint: 'Cifre o lettere; in un turno nessun simbolo compare due volte. Con le lettere c’è più scelta (18 invece di 10) e indovinare riesce più di rado.',
      options: { digits: 'Cifre', letters: 'Lettere' },
    },
    length: {
      label: 'Simboli per turno',
      hint: 'Quanti simboli lampeggiano insieme. Più simboli sono più difficili. Sugli schermi piccoli ne stanno affiancati meno e più piccoli.',
      short: '{v} simbolo|{v} simboli',
    },
    durationMs: {
      label: 'Durata di visualizzazione',
      hint: 'Per quanto tempo i simboli restano visibili, in millisecondi. Si mostrano immagini intere dello schermo (a 60 Hz circa 17 ms per immagine); la durata misurata è nel risultato. Con l’adattamento automatico è il valore di partenza.',
    },
    adaptive: {
      label: 'Adatta la durata automaticamente',
      hint: 'Con “Sì” la durata diventa più breve dopo due turni giusti di fila e più lunga dopo ogni errore. Così l’app cerca la durata alla quale circa 7 turni su 10 sono completamente giusti (valore teorico, impreciso nei giri brevi).',
      options: { no: 'No (durata fissa)', yes: 'Sì (cerca la soglia)' },
    },
    mask: {
      label: 'Maschera dopo la visualizzazione',
      hint: 'Subito dopo la visualizzazione compare per un attimo (0,15 s) un motivo di blocchi grigi. Senza maschera l’impressione dei simboli persiste un poco – hai quindi effettivamente più tempo della durata di visualizzazione.',
      options: { yes: 'Sì', no: 'No' },
    },
    sizeCm: {
      label: 'Altezza dei simboli',
      hint: 'Altezza dei simboli in centimetri. Con tempi molto brevi aiutano simboli più grandi. Sugli schermi piccoli l’altezza viene limitata se i simboli altrimenti non entrano.',
      short: '{v} cm',
    },
  },
};
