import type { ExerciseTexts } from '../../core/types';
import { anaglyphFeedbackDe, anaglyphFeedbackIt, anaglyphParamsDe, anaglyphParamsIt } from '../_shared/anaglyph-texts';

// Eigene Übung der Marke „Labor“ (Tiefe sehen mit Zufallspunkten, Rot-Grün-/Rot-Cyan-Brille), Texte in du-Form und einfacher
// Sprache. Formulierungsregeln: nur beschreiben, was man in der Übung tut; die Werte sind Übungswerte: keine Messung einer
// Stereoschwelle, keine Aussage über Sehschärfe oder Stereosehen, keine Normwerte, kein Wirk- oder Heilversprechen, Vergleich
// nur mit sich selbst auf diesem Gerät. Ehrlich genannt werden die Grenzen: Anaglyphen lassen Farbsäume sichtbar, ein
// Bildschirm gibt nur grobe Orientierung und löst nur ganze Pixel auf, ein 2D-Bildschirm liefert Disparität, aber keine
// natürliche Tiefe (die Schärfeentfernung bleibt am Bildschirm). Das ist keine klinische Untersuchung des Stereosehens.
// Sicherheitshinweise (Pflicht): Rot-Grün-Farbsehschwäche (Birch, 2012), Schwindel, Kopfschmerz, Doppelbilder (Muchnick, 2008,
// S. 6 und 28), Raum abdunkeln, Überbrille. Erfahrungswissen der funktionellen Optometrie ohne Quelle ist gekennzeichnet.

export const de: ExerciseTexts = {
  title: 'Tiefe sehen – Zufallspunkte',
  tagline: 'Finde mit Rot-Grün-Brille das Quadrat, das vor oder hinter den Punkten schwebt.',
  steps: [
    'Rot-Grün-Brille auf, Raum eher dunkel, Abstand etwa 40 cm.',
    'Schau weich auf das ganze Punktfeld, nicht auf Einzelnes.',
    'Tippe, wo das Quadrat liegt: oben, unten, links, rechts.',
  ],
  why:
    'Hier siehst du ein Feld aus Zufallspunkten, in dem ein Quadrat vor oder hinter der Fläche schwebt. Mit einer Rot-Grün-Brille sieht jedes Auge sein eigenes Punktbild; der kleine Unterschied zwischen beiden (die Disparität, in Winkelsekunden) lässt das Quadrat räumlich erscheinen. Du sagst, wo es liegt. Die Werte sind Übungswerte, die du nur mit dir selbst vergleichst – keine Messung einer Schwelle und keine Aussage über dein Sehen. Farbsäume bleiben sichtbar, ein Bildschirm gibt nur grobe Orientierung und löst nur ganze Pixel auf, und die Schärfe bleibt am Bildschirm. Ob das Üben das räumliche Sehen im Alltag, im Sport oder im Verkehr verbessert, ist nicht belegt.',
  goodFor: ['Räumliches Sehen', 'Ruhiger Blick', 'Aufmerksamkeit'],
  captions: {
    look: 'Weich auf das ganze Feld schauen',
    answer: 'Wo schwebt das Quadrat? Tippe die Richtung',
    result: 'Du siehst kurz, wo es lag',
  },
  metrics: {
    accuracy: 'Richtige Antworten (Anteil)',
    correct: 'Richtige Antworten',
    final_arcsec: 'Letzte Disparität',
    rt_mean: 'Antwortzeit (Mittel)',
    px_arcsec: 'Feinste Stufe des Bildschirms (1 Pixel)',
    control: 'Disparitätssteuerung',
    start: 'Start-Disparität',
    field: 'Kantenlänge des Punktfeldes',
    region: 'Kantenlänge des Quadrats',
    dots: 'Anzahl der Punkte',
  },
  metricHints: {
    accuracy:
      'Anteil der Durchgänge, in denen du die Lage des Quadrats richtig angegeben hast. Zufälliges Raten ergibt bei vier Möglichkeiten etwa 25 %. Das ist ein Übungswert zum Vergleich mit dir selbst bei gleichen Einstellungen – keine Messung einer Schwelle und keine Aussage über dein Sehen.',
    correct: 'Wie oft du die Lage des Quadrats richtig angegeben hast.',
    final_arcsec:
      'Die Disparität, die beim letzten Durchgang angezeigt wurde, in Winkelsekunden (″; 3600 ″ sind ein Grad). Bei automatischer Anpassung ergibt sie sich aus deinen Antworten, sonst aus der Einstellung oder dem Trainer-Regler. Ein Übungswert, keine Schwelle.',
    rt_mean: 'Durchschnittliche Zeit vom Erscheinen des Feldes bis zu deiner Antwort. Die Verzögerung des Touch-Sensors ist enthalten; vergleiche nur auf demselben Gerät.',
    px_arcsec:
      'Die Disparität, die einem einzelnen Bildpunkt (Pixel) entspricht, mit dem Abstand aus der Kalibrierung berechnet. Der Bildschirm kann nur in ganzen Pixeln verschieben; kleinere Unterschiede entstehen höchstens durch die Glättung der Ränder und sind nicht verlässlich.',
    control: 'Wie die Disparität geführt wurde: automatisch (Stufenverfahren), fest, oder nur durch den Trainer-Regler.',
    start: 'Die eingestellte Disparität zu Beginn, in Winkelsekunden.',
    field: 'Kantenlänge des Punktfeldes in Zentimetern; kleiner als eingestellt, wenn es sonst nicht auf den Bildschirm passt.',
    region: 'Kantenlänge des schwebenden Quadrats in Zentimetern (höchstens 60 % des Feldes).',
    dots: 'Anzahl der Punkte im Feld und ob der Hintergrund Rauschen hat.',
  },
  tips: {
    few: 'Es wurde kein Durchgang abgeschlossen. Prüfe das Prüfbild für die Brille und starte mit einer großen Disparität und einem großen Quadrat.',
    chance:
      'Deine Antworten lagen nah am Zufall. Prüfe das Prüfbild (Geisterbilder?), mach die Disparität größer, das Quadrat größer oder das Rauschen aus – und schau weich auf das ganze Feld. Das sagt nichts über dein Sehen: Auch Brille, Bildschirm und Abstand spielen eine Rolle.',
    harder: 'Du triffst fast immer richtig. Wenn du magst, mach genau eine Einstellung schwerer: kleinere Disparität, kleineres Quadrat oder Rauschen an.',
    compare: 'Vergleiche diesen Durchlauf nur mit Durchläufen mit denselben Einstellungen – auf diesem Gerät, bei ähnlichem Licht und gleichem Abstand.',
  },
  feedback: {
    ...anaglyphFeedbackDe,
    trial: '{n} / {total}',
    ask: 'Wo schwebt das Quadrat?',
    right: 'Richtig',
    wrong: 'Es lag: {loc}',
    locUp: 'Oben',
    locDown: 'Unten',
    locLeft: 'Links',
    locRight: 'Rechts',
    arcTitle: 'Tiefe (Disparität)',
    arcValue: '{v} ″',
    arcDetail: 'etwa {cm} cm (≈ {px} px) zwischen den beiden Bildern bei {d} cm Abstand',
    rangeRow: 'Gezeigt von … bis',
    pixelDetail: '1 Pixel bei {d} cm Abstand',
    pixelNote:
      'Der Bildschirm verschiebt nur in ganzen Pixeln: feinere Stufen als die letzte Zeile gibt es nicht. Winkelsekunden sind aus Abstand und Pixelgröße der Kalibrierung berechnet und nur so genau wie diese Eingaben.',
    controlAdaptive: 'automatisch (Stufenverfahren)',
    controlFixed: 'fest',
    controlTrainer: 'nur der Trainer-Regler',
    controlLive: 'der Trainer-Regler legt einen Zusatz darauf',
    controlFallback: 'Trainer-Regler nicht verfügbar: Die Disparität blieb fest',
    depthTitle: 'Antworten nach Lage',
    depthNear: 'Quadrat vor der Fläche',
    depthFar: 'Quadrat hinter der Fläche',
    depthValue: '{k} von {n} richtig',
    chanceRow: 'Zufallsniveau beim Raten',
    depthNote: 'Bei vier Möglichkeiten ergibt reines Raten etwa 25 %. Kleine Zahlen schwanken stark.',
    settingsTitle: 'Einstellungen',
    cmValue: '{cm} cm',
    limited: 'Auf diesem Bildschirm begrenzt',
    noiseOn: 'mit Rauschen im Hintergrund',
    noiseOff: 'ohne Rauschen im Hintergrund',
    notCalibrated: 'nicht kalibriert: Schätzung',
    valuesNote:
      'Alle Werte sind Übungswerte: keine Messung einer Stereoschwelle, keine Aussage über Sehschärfe oder Stereosehen und kein Ersatz für eine Untersuchung. Anaglyphen lassen Farbsäume sichtbar, und ein Bildschirm gibt nur grobe Orientierung. Vergleiche nur mit deinen eigenen Werten auf diesem Gerät.',
    liveTitle: 'Trainer-Regler (während der Übung)',
    liveCount: 'Disparität vom Trainer verändert',
    liveCountValue: '{n}-mal, zuletzt {v} {u} (Disparität danach {t} {u})',
    liveEntry: 'Durchgang {k}, {time}',
    liveEntryValue: '{v} {u} (Disparität danach {t} {u})',
    liveMore: '… und {n} weitere Änderungen',
    liveNote:
      'Der Regler gilt nur für diesen Durchlauf und verändert keine Einstellungen. Bei „automatisch“ und „fest“ ist die Disparität der Ausgangswert plus der Zusatz; bei „Trainer“ bestimmt allein der Regler die Disparität. Angezeigt und gespeichert wurde jeweils der Wert in dem Moment, in dem du geantwortet hast.',
  },
  progression: [
    'Leichter: größere Start-Disparität (1000 bis 2000 ″), größeres Quadrat (7 bis 10 cm), mehr Punkte, kein Rauschen.',
    'Schwerer: kleinere Start-Disparität, kleineres Quadrat (3 cm), Rauschen an. Ändere immer nur eine Einstellung auf einmal.',
    'Automatisch (Stufenverfahren): Nach zwei richtigen Antworten in Folge wird die Disparität kleiner, nach jedem Fehler größer. Fest: Es bleibt der Startwert. Trainer: Nur der Trainer-Regler bestimmt die Disparität.',
    'Lass den Blick weich werden und schau auf das ganze Feld statt auf einzelne Punkte; rate, wenn du nichts siehst, und starre nicht. Das ist Erfahrungswissen der Praxis der funktionellen Optometrie, nicht durch Studien belegt.',
    'Vergleiche nur Durchläufe mit denselben Einstellungen, derselben Brille, demselben Gerät und demselben Abstand. Die Auflösung des Bildschirms begrenzt, wie klein die Disparität werden kann.',
  ],
  cautions: [
    'Rot-Grün-Farbsehschwäche: Etwa 8 von 100 Männern und 4 von 1000 Frauen europäischer Herkunft haben sie (Birch, 2012). Dann werden Rot und Grün falsch getrennt, und die Übung ist für dich nicht geeignet.',
    'Schwindel, Kopfschmerz, Augenschmerz oder Doppelbilder: sofort aufhören und bei deiner Optikerin, deinem Optiker oder bei einer Augenärztin, einem Augenarzt abklären lassen (Muchnick, 2008, S. 6 und 28). Bei Schielen oder Doppelbildern nur nach Absprache mit der behandelnden Fachperson üben.',
    'Halte jeden Durchlauf kurz, mach Pausen (bei vielen Durchgängen etwa alle 5 Minuten), blinzle und höre bei Ermüdung auf. Halte den Kopf ruhig und sitze etwa 40 cm vom Bildschirm entfernt. Es gibt kein Flackern.',
    'Dunkler Raum und Überbrille: Rot und Grün trennen sich besser bei gedämpftem Raumlicht und ohne Spiegelungen auf dem Bildschirm. Trägst du eine Korrekturbrille, nimm eine Überbrille. Schalte Nachtmodus und Farbfilter des Geräts aus. Prüfe im Prüfbild, dass kein Geisterbild entsteht.',
    'Grenzen: Anaglyphen lassen Farbsäume sichtbar, und ein Bildschirm gibt nur grobe Orientierung. Ein 2D-Bildschirm liefert zwar den Unterschied zwischen den Augenbildern (Disparität), aber keine natürliche Tiefe: Die Schärfe bleibt am Bildschirm.',
    'Die Werte sind Übungswerte: keine Messung einer Stereoschwelle, keine Aussage über Sehschärfe oder Stereosehen, kein Ersatz für eine klinische Untersuchung des Stereosehens. Bei Verdacht auf fehlendes räumliches Sehen (zum Beispiel nach Schielen) lass es abklären, statt zu üben.',
    'Der Bildschirm verschiebt nur in ganzen Pixeln: Die feinste Stufe steht im Ergebnis. Stell den Bildschirm einmal ein („Bildschirm kalibrieren“) und trage den echten Abstand ein; die Winkelsekunden werden daraus berechnet.',
    'Die App kann nicht prüfen, ob du die Brille trägst oder wohin du schaust. Gespeichert wird nur, was du antwortest.',
    'Trainer-Regler: In der Trainer- und Entwickler-Ansicht kann die Disparität während der Übung in kleinen Schritten verändert werden (höchstens 400 ″ je Tastendruck, Anzeige gleitet weich, jede Änderung wird mit Zeitpunkt festgehalten). Bei Schwindel oder Kopfschmerz sofort zurücknehmen und Pause machen.',
    'Die Aufgabe selbst beruht auf den Farben Rot und Grün; die Bedienung (Tasten mit Beschriftung und Pfeil, ✓ und ✗ als Zeichen) kommt ohne Farbe aus.',
  ],
  liveLabels: { disparity: 'Disparität (Winkelsekunden)' },
  params: {
    ...anaglyphParamsDe,
    trials: {
      label: 'Anzahl der Durchgänge',
      hint: 'Wie viele Durchgänge ein Durchlauf hat (8 bis 80). Halte den Durchlauf kurz; bei Ermüdung höre auf.',
      short: '{v} Durchgänge|{v} Durchgänge',
    },
    startArcsec: {
      label: 'Start-Disparität (Winkelsekunden)',
      hint: 'Der Unterschied zwischen den beiden Bildern zu Beginn, in Winkelsekunden (″; 3600 ″ sind ein Grad). Bei „fest“ bleibt es dieser Wert, bei „Trainer“ ist es der Startwert des Reglers. Ein Pixel entspricht je nach Abstand und Bildschirm etwa 100 bis 200 ″; im Ergebnis steht der genaue Wert.',
      short: 'Start {v} ″',
    },
    control: {
      label: 'Disparitätssteuerung',
      hint: 'Automatisch: Nach zwei richtigen Antworten wird die Disparität kleiner, nach jedem Fehler größer. Fest: Sie bleibt der Startwert. Trainer: Nur der Trainer-Regler bestimmt sie (Trainer- oder Entwickler-Ansicht), beginnend beim Startwert; ohne Regler bleibt sie fest. Bei „automatisch“ und „fest“ legt der Regler zusätzlich einen Zusatz darauf.',
      options: { adaptive: 'Automatisch', fixed: 'Fest', trainer: 'Trainer' },
    },
    fieldCm: {
      label: 'Kantenlänge des Punktfeldes',
      hint: 'Kantenlänge des quadratischen Punktfeldes in Zentimetern (nach Kalibrierung des Bildschirms). Ein größeres Feld ist leichter zu überblicken; auf kleinen Bildschirmen wird es begrenzt.',
      short: 'Feld {v} cm',
    },
    regionCm: {
      label: 'Kantenlänge des Quadrats',
      hint: 'Kantenlänge des schwebenden Quadrats in Zentimetern. Kleinere Quadrate sind schwerer; höchstens 60 % des Feldes.',
      short: 'Quadrat {v} cm',
    },
    dots: {
      label: 'Anzahl der Punkte',
      hint: 'Anzahl der Punkte im Feld (150 bis 1500). Mehr Punkte zeigen mehr vom Quadrat, wirken aber dichter.',
      short: '{v} Punkt|{v} Punkte',
    },
    dotCm: {
      label: 'Punktdurchmesser',
      hint: 'Durchmesser der einzelnen Punkte in Zentimetern. Kleinere Punkte sind schwerer zu sehen.',
      short: 'Punkt {v} cm',
    },
    noise: {
      label: 'Rauschen im Hintergrund',
      hint: 'Mit Rauschen haben die Punkte außerhalb des Quadrats zufällige, größere Unterschiede zwischen den Augenbildern. Das macht die Aufgabe schwerer.',
      options: { on: 'Ein', off: 'Aus' },
    },
    leftLens: {
      label: 'Linkes Glas der Brille',
      hint: 'Welches Glas sitzt vor deinem linken Auge? Das bestimmt, welches Punktbild nach rechts und welches nach links verschoben wird: Stimmt die Einstellung nicht, erscheint das Quadrat hinter statt vor der Fläche (und umgekehrt).',
      options: { red: 'Rot', green: 'Grün, Cyan oder Blau' },
    },
    redLevel: {
      label: 'Helligkeit Rot',
      hint: 'Anteil der Helligkeit des roten Bildes, 30 bis 100 Prozent in Schritten von 10. Im Prüfbild („Schritt für Schritt“) stellst du sie mit „Rot dunkler“ und „Rot heller“ ein.',
      short: 'Rot {v} %',
    },
    secondLevel: {
      label: 'Helligkeit zweite Farbe',
      hint: 'Anteil der Helligkeit des grünen, cyanfarbenen oder blauen Bildes, 30 bis 100 Prozent in Schritten von 10. Im Prüfbild („Schritt für Schritt“) stellst du sie mit den Tasten „dunkler“ und „heller“ ein.',
      short: 'Zweite Farbe {v} %',
    },
  },
};

export const it: ExerciseTexts = {
  title: 'Vedere la profondità – punti casuali',
  tagline: 'Con gli occhiali rosso-verdi trova il quadrato davanti o dietro i punti.',
  steps: [
    'Occhiali rosso-verdi, stanza piuttosto buia, circa 40 cm.',
    'Guarda con morbidezza tutto il campo, non un dettaglio.',
    'Tocca dov’è il quadrato: sopra, sotto, sinistra, destra.',
  ],
  why:
    'Qui vedi un campo di punti casuali in cui un quadrato fluttua davanti o dietro la superficie. Con gli occhiali rosso-verdi ogni occhio vede la propria immagine di punti; la piccola differenza tra le due (la disparità, in secondi d’arco) fa apparire il quadrato in rilievo. Tu dici dove si trova. I valori sono valori di esercizio che confronti solo con te stesso – non una misurazione di una soglia e nessuna indicazione sulla tua vista. Restano visibili aloni colorati, uno schermo dà solo un orientamento grossolano e risolve solo pixel interi, e la messa a fuoco resta sullo schermo. Non è dimostrato che l’esercizio migliori la visione spaziale nella vita quotidiana, nello sport o nel traffico.',
  goodFor: ['Visione spaziale', 'Sguardo calmo', 'Attenzione'],
  captions: {
    look: 'Guarda con morbidezza tutto il campo',
    answer: 'Dov’è il quadrato? Tocca la direzione',
    result: 'Vedi per un attimo dov’era',
  },
  metrics: {
    accuracy: 'Risposte giuste (quota)',
    correct: 'Risposte giuste',
    final_arcsec: 'Ultima disparità',
    rt_mean: 'Tempo di risposta (media)',
    px_arcsec: 'Passo più fine dello schermo (1 pixel)',
    control: 'Guida della disparità',
    start: 'Disparità iniziale',
    field: 'Lato del campo di punti',
    region: 'Lato del quadrato',
    dots: 'Numero di punti',
  },
  metricHints: {
    accuracy:
      'Quota dei passaggi in cui hai indicato giusta la posizione del quadrato. Indovinando a caso con quattro possibilità si ottiene circa il 25 %. È un valore di esercizio per confrontarti con te stesso a parità di impostazioni – non una misurazione di una soglia e nessuna indicazione sulla tua vista.',
    correct: 'Quante volte hai indicato giusta la posizione del quadrato.',
    final_arcsec:
      'La disparità mostrata nell’ultimo passaggio, in secondi d’arco (″; 3600 ″ sono un grado). Con l’adattamento automatico deriva dalle tue risposte, altrimenti dall’impostazione o dal regolatore del trainer. Un valore di esercizio, non una soglia.',
    rt_mean: 'Tempo medio da quando compare il campo alla tua risposta. È compreso il ritardo del sensore touch; confronta solo sullo stesso dispositivo.',
    px_arcsec:
      'La disparità che corrisponde a un singolo punto dello schermo (pixel), calcolata con la distanza della calibrazione. Lo schermo può spostare solo in pixel interi; differenze minori nascono al massimo dalla levigatura dei bordi e non sono affidabili.',
    control: 'Come è stata guidata la disparità: automaticamente (procedura a gradini), fissa, oppure solo dal regolatore del trainer.',
    start: 'La disparità impostata all’inizio, in secondi d’arco.',
    field: 'Lato del campo di punti in centimetri; minore di quello impostato se altrimenti non entra nello schermo.',
    region: 'Lato del quadrato fluttuante in centimetri (al massimo il 60 % del campo).',
    dots: 'Numero di punti nel campo e se lo sfondo ha rumore.',
  },
  tips: {
    few: 'Nessun passaggio è stato completato. Controlla l’immagine di controllo per gli occhiali e inizia con una disparità grande e un quadrato grande.',
    chance:
      'Le tue risposte erano vicine al caso. Controlla l’immagine di controllo (immagini fantasma?), aumenta la disparità, ingrandisci il quadrato o togli il rumore – e guarda con morbidezza tutto il campo. Questo non dice nulla sulla tua vista: contano anche occhiali, schermo e distanza.',
    harder: 'Indovini quasi sempre. Se vuoi, rendi più difficile una sola impostazione: disparità più piccola, quadrato più piccolo o rumore attivo.',
    compare: 'Confronta questo giro solo con giri con le stesse impostazioni – su questo dispositivo, con luce simile e alla stessa distanza.',
  },
  feedback: {
    ...anaglyphFeedbackIt,
    trial: '{n} / {total}',
    ask: 'Dov’è il quadrato?',
    right: 'Giusto',
    wrong: 'Era: {loc}',
    locUp: 'Sopra',
    locDown: 'Sotto',
    locLeft: 'Sinistra',
    locRight: 'Destra',
    arcTitle: 'Profondità (disparità)',
    arcValue: '{v} ″',
    arcDetail: 'circa {cm} cm (≈ {px} px) tra le due immagini a {d} cm di distanza',
    rangeRow: 'Mostrata da … a',
    pixelDetail: '1 pixel a {d} cm di distanza',
    pixelNote:
      'Lo schermo sposta solo in pixel interi: passi più fini dell’ultima riga non esistono. I secondi d’arco sono calcolati da distanza e dimensione dei pixel della calibrazione e sono precisi quanto queste indicazioni.',
    controlAdaptive: 'automatica (procedura a gradini)',
    controlFixed: 'fissa',
    controlTrainer: 'solo il regolatore del trainer',
    controlLive: 'il regolatore del trainer aggiunge un valore',
    controlFallback: 'Regolatore del trainer non disponibile: la disparità è rimasta fissa',
    depthTitle: 'Risposte per posizione',
    depthNear: 'Quadrato davanti alla superficie',
    depthFar: 'Quadrato dietro la superficie',
    depthValue: '{k} su {n} giuste',
    chanceRow: 'Livello del caso indovinando',
    depthNote: 'Con quattro possibilità indovinare a caso dà circa il 25 %. Numeri piccoli oscillano molto.',
    settingsTitle: 'Impostazioni',
    cmValue: '{cm} cm',
    limited: 'Limitato su questo schermo',
    noiseOn: 'con rumore sullo sfondo',
    noiseOff: 'senza rumore sullo sfondo',
    notCalibrated: 'non calibrato: stima',
    valuesNote:
      'Tutti i valori sono valori di esercizio: non una misurazione di una soglia stereoscopica, nessuna indicazione su acuità visiva o visione stereoscopica e non sostituiscono una visita. Gli anaglifi lasciano aloni colorati e uno schermo dà solo un orientamento grossolano. Confronta solo con i tuoi valori su questo dispositivo.',
    liveTitle: 'Regolatore del trainer (durante l’esercizio)',
    liveCount: 'Disparità modificata dal trainer',
    liveCountValue: '{n} volte, da ultimo {v} {u} (disparità dopo {t} {u})',
    liveEntry: 'Passaggio {k}, {time}',
    liveEntryValue: '{v} {u} (disparità dopo {t} {u})',
    liveMore: '… e altre {n} modifiche',
    liveNote:
      'Il regolatore vale solo per questo giro e non cambia le impostazioni. Con “automatica” e “fissa” la disparità è il valore di partenza più l’aggiunta; con “Trainer” decide solo il regolatore. Sono stati mostrati e salvati i valori nel momento in cui hai risposto.',
  },
  progression: [
    'Più facile: disparità iniziale più grande (da 1000 a 2000 ″), quadrato più grande (da 7 a 10 cm), più punti, senza rumore.',
    'Più difficile: disparità iniziale più piccola, quadrato più piccolo (3 cm), rumore attivo. Cambia sempre una sola impostazione alla volta.',
    'Automatica (procedura a gradini): dopo due risposte giuste di fila la disparità diminuisce, dopo ogni errore aumenta. Fissa: resta il valore iniziale. Trainer: solo il regolatore del trainer decide la disparità.',
    'Lascia che lo sguardo diventi morbido e guarda tutto il campo invece di singoli punti; indovina se non vedi nulla e non fissare. È sapere empirico della pratica dell’optometria funzionale, non dimostrato da studi.',
    'Confronta solo giri con le stesse impostazioni, gli stessi occhiali, lo stesso dispositivo e la stessa distanza. La risoluzione dello schermo limita quanto piccola può diventare la disparità.',
  ],
  cautions: [
    'Alterazione della visione dei colori rosso-verde: circa 8 uomini su 100 e 4 donne su 1000 di origine europea (Birch, 2012). Allora rosso e verde vengono separati in modo errato e l’esercizio non è adatto a te.',
    'Vertigini, mal di testa, dolore agli occhi o visione doppia: smetti subito e fai chiarire la cosa dal tuo ottico o dall’oculista (Muchnick, 2008, p. 6 e 28). In caso di strabismo o visione doppia esercitati solo dopo accordo con lo specialista che ti segue.',
    'Tieni ogni giro breve, fai pause (con molti passaggi circa ogni 5 minuti), sbatti le palpebre e smetti in caso di stanchezza. Tieni la testa ferma e siediti a circa 40 cm dallo schermo. Non c’è sfarfallio.',
    'Stanza buia e occhiali da sovrapporre: rosso e verde si separano meglio con luce soffusa e senza riflessi sullo schermo. Se porti occhiali correttivi, usa occhiali da sovrapporre. Disattiva la modalità notturna e i filtri colore del dispositivo. Controlla nell’immagine di controllo che non ci siano immagini fantasma.',
    'Limiti: gli anaglifi lasciano aloni colorati e uno schermo dà solo un orientamento grossolano. Uno schermo 2D fornisce la differenza tra le immagini degli occhi (disparità), ma non una profondità naturale: la messa a fuoco resta sullo schermo.',
    'I valori sono valori di esercizio: non una misurazione di una soglia stereoscopica, nessuna indicazione su acuità visiva o visione stereoscopica, non sostituiscono una visita clinica della visione stereoscopica. Se sospetti che manchi la visione spaziale (per esempio dopo uno strabismo) fai chiarire la cosa invece di esercitarti.',
    'Lo schermo sposta solo in pixel interi: il passo più fine è nel risultato. Imposta lo schermo una volta (“Calibra lo schermo”) e inserisci la distanza vera; i secondi d’arco si calcolano da lì.',
    'L’app non può controllare se porti gli occhiali o dove guardi. Si salva solo ciò che rispondi.',
    'Regolatore del trainer: nella vista del trainer e dello sviluppatore la disparità può essere cambiata durante l’esercizio a piccoli passi (al massimo 400 ″ per tasto, la visualizzazione scorre dolcemente, ogni modifica viene registrata con l’orario). In caso di vertigini o mal di testa riduci subito e fai una pausa.',
    'Il compito stesso si basa sui colori rosso e verde; l’uso (tasti con etichetta e freccia, ✓ e ✗ come segni) non dipende dal colore.',
  ],
  liveLabels: { disparity: 'Disparità (secondi d’arco)' },
  params: {
    ...anaglyphParamsIt,
    trials: {
      label: 'Numero di passaggi',
      hint: 'Quanti passaggi ha un giro (da 8 a 80). Tieni il giro breve; in caso di stanchezza smetti.',
      short: '{v} passaggio|{v} passaggi',
    },
    startArcsec: {
      label: 'Disparità iniziale (secondi d’arco)',
      hint: 'La differenza tra le due immagini all’inizio, in secondi d’arco (″; 3600 ″ sono un grado). Con “fissa” resta questo valore, con “Trainer” è il valore iniziale del regolatore. Un pixel corrisponde, a seconda di distanza e schermo, a circa 100–200 ″; nel risultato trovi il valore esatto.',
      short: 'Inizio {v} ″',
    },
    control: {
      label: 'Guida della disparità',
      hint: 'Automatica: dopo due risposte giuste la disparità diminuisce, dopo ogni errore aumenta. Fissa: resta il valore iniziale. Trainer: solo il regolatore del trainer la decide (vista del trainer o dello sviluppatore), partendo dal valore iniziale; senza regolatore resta fissa. Con “automatica” e “fissa” il regolatore aggiunge inoltre un valore.',
      options: { adaptive: 'Automatica', fixed: 'Fissa', trainer: 'Trainer' },
    },
    fieldCm: {
      label: 'Lato del campo di punti',
      hint: 'Lato del campo di punti quadrato in centimetri (dopo la calibrazione dello schermo). Un campo più grande è più facile da abbracciare con lo sguardo; sugli schermi piccoli viene limitato.',
      short: 'Campo {v} cm',
    },
    regionCm: {
      label: 'Lato del quadrato',
      hint: 'Lato del quadrato fluttuante in centimetri. Quadrati più piccoli sono più difficili; al massimo il 60 % del campo.',
      short: 'Quadrato {v} cm',
    },
    dots: {
      label: 'Numero di punti',
      hint: 'Numero di punti nel campo (da 150 a 1500). Più punti mostrano più del quadrato, ma sembrano più fitti.',
      short: '{v} punto|{v} punti',
    },
    dotCm: {
      label: 'Diametro dei punti',
      hint: 'Diametro dei singoli punti in centimetri. Punti più piccoli sono più difficili da vedere.',
      short: 'Punto {v} cm',
    },
    noise: {
      label: 'Rumore sullo sfondo',
      hint: 'Con il rumore i punti fuori dal quadrato hanno differenze casuali e più grandi tra le immagini degli occhi. Questo rende il compito più difficile.',
      options: { on: 'Sì', off: 'No' },
    },
    leftLens: {
      label: 'Lente sinistra degli occhiali',
      hint: 'Quale lente è davanti al tuo occhio sinistro? Decide quale immagine di punti viene spostata a destra e quale a sinistra: se l’impostazione è sbagliata, il quadrato appare dietro invece che davanti alla superficie (e viceversa).',
      options: { red: 'Rossa', green: 'Verde, ciano o blu' },
    },
    redLevel: {
      label: 'Luminosità del rosso',
      hint: 'Quota della luminosità dell’immagine rossa, dal 30 al 100 per cento a passi di 10. Nell’immagine di controllo (“Passo dopo passo”) la regoli con “Rosso più scuro” e “Rosso più chiaro”.',
      short: 'Rosso {v} %',
    },
    secondLevel: {
      label: 'Luminosità del secondo colore',
      hint: 'Quota della luminosità dell’immagine verde, ciano o blu, dal 30 al 100 per cento a passi di 10. Nell’immagine di controllo (“Passo dopo passo”) la regoli con i tasti “più scuro” e “più chiaro”.',
      short: 'Secondo colore {v} %',
    },
  },
};
