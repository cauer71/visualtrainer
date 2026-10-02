import type { ExerciseTexts } from '../../core/types';

// Quelle: Labor-Prototyp (help/periphery.js), für Blickfit geglättet: du-Form, einfache Sprache, Fachwörter erklärt
// (Peripherie → „Rand“, Fixationskreuz entfällt: die Zahl in der Mitte, Exzentrizität → „Abstand von der Mitte als
// Sehwinkel in Grad“, Schwelle und Umkehrpunkte erklärt). Formulierungsregeln (Optiker-Seite): nur beschreiben, was man tut;
// keine Wirk-, Heil- oder Sicherheitsversprechen, keine Prüfbegriffe, keine Normwerte; Vergleich nur mit sich selbst auf diesem
// Gerät. Ehrlich benannt: kein Eye-Tracking (die Mitte ist eine Bitte), Anzeigedauer auf ganze Bilder gerundet, Kalibrierung ist
// eine Eingabe der Person, Winkel wird auf das Machbare begrenzt. Aus dem Prototyp gestrichen: „Kinnstütze verbessert die
// Messung“, „Zufallsniveau normalerweise deutlich niedriger in größerer Entfernung“ (nicht belegt als Aussage dieser App).

export const de: ExerciseTexts = {
  title: 'Peripheres Erkennen',
  tagline: 'Blick in der Mitte lassen – Buchstaben am Rand erkennen.',
  steps: [
    'Schau auf die Zahl in der Mitte und bleib dort.',
    'Am Rand blitzt kurz ein Buchstabe auf.',
    'Tippe danach den Buchstaben an, den du gesehen hast.',
  ],
  why:
    'Hier übst du, etwas am Rand deines Blickfelds wahrzunehmen, während du in der Mitte hinschaust. Zum Rand hin nimmt die Schärfe ab, deshalb braucht ein Buchstabe dort mehr Größe oder mehr Zeit. Ob du wirklich in der Mitte bleibst, kann die App nicht messen. Ob das Üben im Alltag, im Sport oder im Verkehr etwas bringt, ist nicht belegt.',
  goodFor: ['Randwahrnehmung', 'Blick halten', 'Aufmerksamkeit'],
  captions: {
    look: 'Blick bleibt auf der Zahl in der Mitte',
    flash: 'Am Rand blitzt kurz ein Buchstabe auf',
    pick: 'Tippe den Buchstaben an',
    again: 'Wieder: Blick in der Mitte lassen',
    miss: 'Falsch? Dann siehst du, was es war',
  },
  metrics: {
    correct: 'Richtig erkannte Buchstaben',
    accuracy: 'Richtig erkannt (Anteil)',
    chance: 'Zufallsniveau',
    acc_horizontal: 'Richtig links/rechts',
    acc_vertical: 'Richtig oben/unten',
    ecc: 'Tatsächlicher Abstand von der Mitte (Mittel)',
    rt_mean: 'Antwortzeit (Mittel)',
    threshold: 'Geschätzte Schwelle der Dauer',
    threshold_frames: 'Schwelle in Bildern',
    duration: 'Eingestellte Dauer',
    shown: 'Gezeigte Dauer (gemessen, Mittel)',
    refresh: 'Bildwiederholrate (geschätzt)',
    jerks: 'Gestörte Durchgänge',
  },
  metricHints: {
    correct: 'Anzahl der Buchstaben, die du richtig gewählt hast.',
    accuracy:
      'Anteil richtiger Antworten. Vergleiche ihn mit dem Zufallsniveau: Liegt er nahe daran, hast du eher geraten. Mit „Dauer automatisch anpassen“ pendelt er sich durch das Verfahren meist deutlich über der Hälfte ein (rechnerisch bei etwa 70 %) – dann ist die Schwelle der aussagekräftigere Wert.',
    chance: 'Trefferquote, die man durch reines Raten erwarten würde: 100 % geteilt durch die Zahl der Antwortmöglichkeiten. Sie ist nur ein Bezugspunkt.',
    acc_horizontal: 'Anteil richtiger Antworten bei Buchstaben links oder rechts.',
    acc_vertical: 'Anteil richtiger Antworten bei Buchstaben oben oder unten (nur wenn alle vier Richtungen eingestellt waren).',
    ecc: 'Tatsächlicher mittlerer Abstand des Buchstabens von der Mitte als Sehwinkel in Grad (Winkel zwischen der Blickrichtung zur Mitte und der zum Buchstaben). Er weicht von deiner Einstellung ab, wenn der Bildschirm den Winkel nicht zulässt. Er hängt von deiner Kalibrierung und dem eingetragenen Sehabstand ab; stimmt beides nicht, stimmt auch der Winkel nicht.',
    rt_mean: 'Durchschnittliche Zeit vom Erscheinen der Antwortfelder bis zur Wahl. Sie enthält die Verzögerung des Touch-Sensors und ist nur auf demselben Gerät vergleichbar.',
    threshold:
      'Geschätzte Dauer, um die sich das Verfahren einpendelt – rechnerisch dort, wo etwa 7 von 10 Antworten richtig sind, bei diesem Abstand. Sie ist der Mittelwert der Stellen, an denen die Dauer von kürzer zu länger oder umgekehrt wechselte, und bei kurzen Läufen ungenau. Nur mit „Dauer automatisch anpassen“ und wenn genug Wechsel vorkamen.',
    threshold_frames: 'Dieselbe Schwelle in Bildern des Bildschirms. Kürzer als ein Bild geht nicht.',
    duration: 'Die von dir eingestellte Dauer (bei automatischer Anpassung der Startwert). Gezeigt werden nur ganze Bilder, deshalb kann die gemessene Dauer etwas abweichen.',
    shown: 'Mittlere, tatsächlich gemessene Dauer der Anzeige. Sie ist ein Vielfaches der Bilddauer des Bildschirms und kann deshalb von der eingestellten Dauer abweichen.',
    refresh: 'Aus den Zeitpunkten der Bilder geschätzt. 60 Hz bedeutet ein Bild alle 17 Millisekunden, 120 Hz alle 8 Millisekunden.',
    jerks: 'Durchgänge, in denen ein Bild ausgelassen oder doppelt gezeigt wurde. Sie gehen nicht in die automatische Anpassung ein. Viele davon? Schließe andere Programme und Apps.',
  },
  tips: {
    few: 'Diesmal gab es keine auswertbaren Durchgänge. Probiere einen kleineren Abstand und eine längere Dauer.',
    jerks: 'Bei einigen Durchgängen hat der Bildschirm geruckelt. Schließe andere Programme und Apps, dann ist die Anzeigedauer verlässlicher.',
    limited: 'Auf diesem Bildschirm war der gewünschte Abstand meist nicht möglich und wurde begrenzt. Der tatsächliche Winkel steht in den weiteren Werten; vergleiche nur Läufe mit demselben tatsächlichen Abstand.',
    threshold: 'Die Schwelle gilt nur für diesen Abstand und diese Einstellungen. Vergleiche sie nur mit Durchläufen mit denselben Einstellungen – auf diesem Gerät und im selben Sehabstand.',
    adaptiveShort: 'Für eine Schwelle gab es zu wenige Wechsel zwischen kürzer und länger. Spiele mehr Durchgänge (mindestens 24).',
    chance: 'Du liegst nahe am Zufallsniveau. Mach es leichter: kleinerer Abstand, längere Dauer oder größere Buchstaben – und ändere immer nur eine Einstellung.',
    sides: 'Links/rechts und oben/unten klappen bei dir unterschiedlich gut. Das kann an der Richtung, aber auch an Zufall oder Haltung liegen; vergleiche später nur gleiche Einstellungen.',
    harder: 'Du erkennst fast alle Buchstaben. Wenn du magst, mach genau eine Einstellung schwerer: größerer Abstand, kürzere Dauer oder kleinere Buchstaben.',
    compare: 'Vergleiche diesen Durchlauf nur mit Durchläufen mit denselben Einstellungen – auf diesem Gerät und im selben Sehabstand.',
  },
  feedback: {
    trial: '{n} / {total}',
    right: 'Richtig',
    itWas: 'Es war {s}',
    ask: 'Welcher Buchstabe war es?',
    limited: 'Abstand auf diesem Bildschirm auf {deg} ° begrenzt',
    moreTitle: 'Weitere Werte',
    moreNote:
      'Die Anzeigedauer ist auf Bildschirmen auf ganze Bilder gerundet (bei 60 Hz etwa 17 ms je Bild); gezeigt wird die tatsächlich gemessene Dauer. Die Antwortzeit enthält die Verzögerung des Touch-Sensors. Der Winkel gilt für den eingetragenen Sehabstand. Vergleiche nur mit deinen eigenen Werten auf diesem Gerät.',
    startValue: 'Startwert',
    framesValue: '{n} Bilder',
    eccLimited: 'eingestellt: {set} °, begrenzt',
    eccAsSet: 'wie eingestellt',
  },
  progression: [
    'Leichter: kleiner Abstand (4 bis 8 Grad), lange Dauer (200 bis 400 ms), große Buchstaben (4 bis 5 cm), nur links und rechts, 3 Antwortmöglichkeiten.',
    'Schwerer: größerer Abstand (12 bis 25 Grad), kurze Dauer (50 bis 100 ms), kleinere Buchstaben, alle vier Richtungen, mehr Antwortmöglichkeiten.',
    'Mit „Dauer automatisch anpassen“ wird die Anzeige nach zwei richtigen Antworten in Folge kürzer und nach jedem Fehler länger. So kannst du die Schwelle bei einem bestimmten Abstand über Wochen vergleichen – nur bei gleichem Abstand, gleicher Größe und gleichem Sehabstand.',
    'Unsere Faustregel (keine Vorgabe aus der Forschung): Liegst du in drei Durchläufen hintereinander über 90 %, mach eine Einstellung schwerer; liegst du nahe am Zufallsniveau, mach sie leichter. Ändere immer nur eine Einstellung auf einmal.',
  ],
  cautions: [
    'Am Rand blitzt kurz ein Buchstabe auf (höchstens einmal pro Sekunde, nur auf einer kleinen Fläche), und die Zahl in der Mitte wechselt etwa 1,7-mal pro Sekunde. Bist du lichtempfindlich oder hattest du schon einmal einen epileptischen Anfall, verzichte bitte darauf.',
    'Stell den Bildschirm einmal ein („Bildschirm kalibrieren“) und trage deinen echten Sehabstand ein: Der Abstand vom Rand wird als Sehwinkel in Grad angegeben und hängt davon ab. Sitz dann in diesem Abstand, den Kopf mittig vor dem Bildschirm.',
    'Auf kleinen Bildschirmen passt der gewünschte Winkel nicht immer. Er wird begrenzt – nach außen, damit der Buchstabe auf dem Bildschirm bleibt, nach innen, damit er nicht über der Zahl liegt. Das siehst du in einer Meldung zu Beginn und im Ergebnis unter „Tatsächlicher Abstand“.',
    'Die App kann nicht messen, wohin du schaust – es gibt kein Eye-Tracking. „Blick in der Mitte lassen“ ist eine Bitte. Schaust du doch zum Rand, ist der Durchgang nicht mehr vergleichbar; sei ehrlich zu dir selbst.',
    'Die Anzeigedauer ist auf Bildschirmen auf ganze Bilder gerundet: bei 60 Hz in Schritten von etwa 17 ms, bei 120 Hz von etwa 8 ms. Die App zählt die Bilder und zeigt dir die tatsächlich gemessene Dauer. Wie lange der Buchstabe wirklich leuchtet, hängt zusätzlich von der Bildschirmtechnik ab; das misst die App nicht.',
    'Die Übung prüft dein Gesichtsfeld nicht und ersetzt keine augenärztliche Untersuchung.',
    'Halte die Einheit kurz (höchstens etwa 10 Minuten) und mach Pausen. Bei Schwindel, Kopfschmerzen, Flimmern oder Augenbeschwerden: aufhören.',
  ],
  params: {
    trials: {
      label: 'Anzahl der Durchgänge',
      hint: 'Für eine halbwegs verlässliche Schwelle sind mindestens 24 Durchgänge sinnvoll.',
    },
    eccentricityDeg: {
      label: 'Abstand von der Mitte',
      hint: 'Wie weit der Buchstabe von der Mitte entfernt erscheint, als Sehwinkel in Grad (Winkel zwischen der Blickrichtung zur Mitte und der zum Buchstaben), umgerechnet über deinen eingetragenen Sehabstand. Größere Winkel sind schwerer. Auf kleinen Bildschirmen wird er begrenzt.',
      short: '{v} °',
    },
    directions: {
      label: 'Richtungen',
      hint: 'Nur links und rechts, oder zusätzlich oben und unten. Die Ergebnisse trennen die Richtungen; ob eine besser klappt als die andere, kann auch Zufall sein.',
      options: { horizontal: 'Links und rechts', all4: 'Links, rechts, oben, unten' },
    },
    durationMs: {
      label: 'Anzeigedauer',
      hint: 'Wie lange der Buchstabe zu sehen ist, in Millisekunden. Gezeigt werden ganze Bilder des Bildschirms (bei 60 Hz etwa 17 ms je Bild); die gemessene Dauer steht im Ergebnis. Mit automatischer Anpassung ist das der Startwert.',
    },
    adaptive: {
      label: 'Dauer automatisch anpassen',
      hint: 'Bei „Ja“ wird die Dauer nach zwei richtigen Antworten in Folge kürzer und nach jedem Fehler länger. So sucht die App die Dauer, bei der etwa 7 von 10 Antworten richtig sind (rechnerischer Wert, bei kurzen Läufen ungenau).',
      options: { no: 'Nein (feste Dauer)', yes: 'Ja (Schwelle suchen)' },
    },
    sizeCm: {
      label: 'Buchstabenhöhe',
      hint: 'Höhe des Buchstabens in Zentimetern. Weiter außen hilft ein größerer Buchstabe, weil die Schärfe zum Rand hin abnimmt.',
      short: '{v} cm',
    },
    choices: {
      label: 'Antwortmöglichkeiten',
      hint: 'Wie viele Buchstaben zur Auswahl stehen. Mehr Möglichkeiten senken die Trefferchance durch Raten.',
    },
  },
};

export const it: ExerciseTexts = {
  title: 'Peripheres Erkennen',
  tagline: 'Sguardo al centro – riconosci le lettere ai margini.',
  steps: [
    'Guarda il numero al centro e resta lì.',
    'Al margine lampeggia per un attimo una lettera.',
    'Poi tocca la lettera che hai visto.',
  ],
  why:
    'Qui ti alleni a notare qualcosa al margine del campo visivo mentre guardi al centro. Verso il margine la nitidezza diminuisce, perciò lì una lettera ha bisogno di più grandezza o di più tempo. Se resti davvero al centro, l’app non può misurarlo. Non è dimostrato che l’allenamento serva nella vita quotidiana, nello sport o nel traffico.',
  goodFor: ['Percezione al margine', 'Tenere lo sguardo', 'Attenzione'],
  captions: {
    look: 'Lo sguardo resta sul numero al centro',
    flash: 'Al margine lampeggia una lettera',
    pick: 'Tocca la lettera',
    again: 'Di nuovo: sguardo al centro',
    miss: 'Sbagliato? Vedi cos’era',
  },
  metrics: {
    correct: 'Lettere riconosciute giuste',
    accuracy: 'Riconosciute giuste (quota)',
    chance: 'Livello del caso',
    acc_horizontal: 'Giuste a sinistra/destra',
    acc_vertical: 'Giuste in alto/in basso',
    ecc: 'Distanza effettiva dal centro (media)',
    rt_mean: 'Tempo di risposta (media)',
    threshold: 'Soglia stimata della durata',
    threshold_frames: 'Soglia in immagini',
    duration: 'Durata impostata',
    shown: 'Durata mostrata (misurata, media)',
    refresh: 'Frequenza dello schermo (stimata)',
    jerks: 'Turni disturbati',
  },
  metricHints: {
    correct: 'Numero di lettere che hai scelto correttamente.',
    accuracy:
      'Quota di risposte giuste. Confrontala con il livello del caso: se è vicina, hai piuttosto tirato a indovinare. Con “Adatta la durata automaticamente” questo valore, per via del metodo, si assesta di solito nettamente sopra la metà (in teoria intorno al 70 %) – allora la soglia è il valore più significativo.',
    chance: 'Quota di risposte giuste che ci si aspetterebbe tirando a indovinare: 100 % diviso per il numero di possibilità di risposta. È solo un punto di riferimento.',
    acc_horizontal: 'Quota di risposte giuste con lettere a sinistra o a destra.',
    acc_vertical: 'Quota di risposte giuste con lettere in alto o in basso (solo se erano impostate tutte e quattro le direzioni).',
    ecc: 'Distanza media effettiva della lettera dal centro come angolo visivo in gradi (angolo tra la direzione dello sguardo verso il centro e quella verso la lettera). Si discosta dalla tua impostazione se lo schermo non consente l’angolo. Dipende dalla calibrazione e dalla distanza di visione inserita; se non sono corrette, non è corretto nemmeno l’angolo.',
    rt_mean: 'Tempo medio da quando compaiono i campi di risposta fino alla scelta. Comprende il ritardo del sensore touch ed è confrontabile solo sullo stesso dispositivo.',
    threshold:
      'Durata stimata attorno alla quale si assesta il metodo – in teoria dove circa 7 risposte su 10 sono giuste, a questa distanza. È la media dei punti in cui la durata passava da più breve a più lunga o viceversa, ed è imprecisa nei giri brevi. Solo con “Adatta la durata automaticamente” e se ci sono stati abbastanza cambi.',
    threshold_frames: 'La stessa soglia in immagini dello schermo. Meno di un’immagine non è possibile.',
    duration: 'La durata che hai impostato (con l’adattamento automatico il valore di partenza). Si mostrano solo immagini intere, perciò la durata misurata può discostarsi un poco.',
    shown: 'Durata media realmente misurata della visualizzazione. È un multiplo della durata di un’immagine dello schermo e può quindi differire da quella impostata.',
    refresh: 'Stimata dagli istanti delle immagini. 60 Hz significa un’immagine ogni 17 millisecondi, 120 Hz ogni 8 millisecondi.',
    jerks: 'Turni in cui un’immagine è stata saltata o mostrata due volte. Non entrano nell’adattamento automatico. Sono molti? Chiudi altri programmi e app.',
  },
  tips: {
    few: 'Stavolta non c’erano turni valutabili. Prova una distanza minore e una durata più lunga.',
    jerks: 'In alcuni turni lo schermo è scattato. Chiudi altri programmi e app: la durata di visualizzazione sarà più affidabile.',
    limited: 'Su questo schermo la distanza desiderata per lo più non era possibile ed è stata limitata. L’angolo effettivo è negli altri valori; confronta solo giri con la stessa distanza effettiva.',
    threshold: 'La soglia vale solo per questa distanza e queste impostazioni. Confrontala solo con giri con le stesse impostazioni – su questo dispositivo e alla stessa distanza di visione.',
    adaptiveShort: 'Per una soglia c’erano troppi pochi cambi tra più breve e più lungo. Gioca più turni (almeno 24).',
    chance: 'Sei vicino al livello del caso. Rendilo più facile: distanza minore, durata più lunga o lettere più grandi – e cambia sempre una sola impostazione.',
    sides: 'Sinistra/destra e alto/basso funzionano in modo diverso per te. Può dipendere dalla direzione, ma anche dal caso o dalla postura; confronta poi solo impostazioni uguali.',
    harder: 'Riconosci quasi tutte le lettere. Se vuoi, rendi più difficile una sola impostazione: distanza maggiore, durata più breve o lettere più piccole.',
    compare: 'Confronta questo giro solo con giri con le stesse impostazioni – su questo dispositivo e alla stessa distanza di visione.',
  },
  feedback: {
    trial: '{n} / {total}',
    right: 'Giusto',
    itWas: 'Era {s}',
    ask: 'Quale lettera era?',
    limited: 'Distanza limitata su questo schermo a {deg} °',
    moreTitle: 'Altri valori',
    moreNote:
      'Sugli schermi la durata di visualizzazione è arrotondata a immagini intere (a 60 Hz circa 17 ms per immagine); viene mostrata la durata realmente misurata. Il tempo di risposta comprende il ritardo del sensore touch. L’angolo vale per la distanza di visione inserita. Confronta solo con i tuoi valori su questo dispositivo.',
    startValue: 'Valore di partenza',
    framesValue: '{n} immagini',
    eccLimited: 'impostato: {set} °, limitato',
    eccAsSet: 'come impostato',
  },
  progression: [
    'Più facile: distanza piccola (4–8 gradi), durata lunga (200–400 ms), lettere grandi (4–5 cm), solo sinistra e destra, 3 possibilità di risposta.',
    'Più difficile: distanza maggiore (12–25 gradi), durata breve (50–100 ms), lettere più piccole, tutte e quattro le direzioni, più possibilità di risposta.',
    'Con “Adatta la durata automaticamente” la visualizzazione diventa più breve dopo due risposte giuste di fila e più lunga dopo ogni errore. Così puoi confrontare nel tempo la soglia a una certa distanza – solo con stessa distanza, stessa grandezza e stessa distanza di visione.',
    'La nostra regola pratica (non è una indicazione della ricerca): se in tre giri di fila superi il 90 %, rendi più difficile un’impostazione; se sei vicino al livello del caso, rendila più facile. Cambia sempre una sola impostazione alla volta.',
  ],
  cautions: [
    'Al margine lampeggia per un attimo una lettera (al massimo una volta al secondo, solo su una piccola area), e il numero al centro cambia circa 1,7 volte al secondo. Se sei fotosensibile o hai già avuto una crisi epilettica, per favore non eseguirlo.',
    'Imposta lo schermo una volta (“Calibra lo schermo”) e inserisci la tua vera distanza di visione: la distanza dal margine è indicata come angolo visivo in gradi e ne dipende. Poi siediti a quella distanza, con la testa al centro davanti allo schermo.',
    'Sugli schermi piccoli l’angolo desiderato non sempre entra. Viene limitato – verso l’esterno, perché la lettera resti sullo schermo, verso l’interno, perché non stia sopra il numero. Lo vedi in un messaggio all’inizio e nel risultato sotto “Distanza effettiva”.',
    'L’app non può misurare dove guardi – non c’è eye-tracking. “Sguardo al centro” è una richiesta. Se guardi comunque al margine, il turno non è più confrontabile; sii onesto con te stesso.',
    'Sugli schermi la durata di visualizzazione è arrotondata a immagini intere: a 60 Hz a passi di circa 17 ms, a 120 Hz di circa 8 ms. L’app conta le immagini e ti mostra la durata realmente misurata. Per quanto tempo la lettera resta davvero accesa dipende inoltre dalla tecnologia dello schermo; l’app non lo misura.',
    'L’esercizio non controlla il tuo campo visivo e non sostituisce una visita oculistica.',
    'Tieni breve la sessione (al massimo circa 10 minuti) e fai pause. In caso di vertigini, mal di testa, sfarfallio o disturbi agli occhi: smetti.',
  ],
  params: {
    trials: {
      label: 'Numero di turni',
      hint: 'Per una soglia abbastanza affidabile sono sensati almeno 24 turni.',
    },
    eccentricityDeg: {
      label: 'Distanza dal centro',
      hint: 'A che distanza dal centro compare la lettera, come angolo visivo in gradi (angolo tra la direzione dello sguardo verso il centro e quella verso la lettera), calcolato con la distanza di visione inserita. Angoli maggiori sono più difficili. Sugli schermi piccoli viene limitata.',
      short: '{v} °',
    },
    directions: {
      label: 'Direzioni',
      hint: 'Solo sinistra e destra, oppure anche alto e basso. I risultati separano le direzioni; se una funziona meglio dell’altra può essere anche un caso.',
      options: { horizontal: 'Sinistra e destra', all4: 'Sinistra, destra, alto, basso' },
    },
    durationMs: {
      label: 'Durata di visualizzazione',
      hint: 'Per quanto tempo la lettera resta visibile, in millisecondi. Si mostrano immagini intere dello schermo (a 60 Hz circa 17 ms per immagine); la durata misurata è nel risultato. Con l’adattamento automatico è il valore di partenza.',
    },
    adaptive: {
      label: 'Adatta la durata automaticamente',
      hint: 'Con “Sì” la durata diventa più breve dopo due risposte giuste di fila e più lunga dopo ogni errore. Così l’app cerca la durata alla quale circa 7 risposte su 10 sono giuste (valore teorico, impreciso nei giri brevi).',
      options: { no: 'No (durata fissa)', yes: 'Sì (cerca la soglia)' },
    },
    sizeCm: {
      label: 'Altezza della lettera',
      hint: 'Altezza della lettera in centimetri. Più all’esterno aiuta una lettera più grande, perché la nitidezza diminuisce verso il margine.',
      short: '{v} cm',
    },
    choices: {
      label: 'Possibilità di risposta',
      hint: 'Quante lettere sono a scelta. Più possibilità riducono la probabilità di indovinare a caso.',
    },
  },
};
