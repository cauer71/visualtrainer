// Quellen: jede Angabe einzeln per Crossref (Metadaten) und, wo vorhanden, über PubMed/PMC (Abstract bzw. Volltext)
// geprüft (02.10.2026). Aus dem Labor-Prototyp (help/spots.js) stammt nur Fitts (1954): bestätigt (PubMed ohne Abstract;
// Inhalt über MacKenzie 1992). Die übrigen Quellen sind ergänzt und geprüft.
// Nicht aufgenommen: Aussagen des Prototyp-Textes, die keine Quelle haben („typisch einige zehn Millisekunden“ Geräteverzögerung
// – hier stattdessen Pronk et al. 2020: Reaktionszeiten wurden auf Touchgeräten durchweg überschätzt; „bei langen Läufen sinkt
// die Leistung durch Ermüdung“ – nicht belegt, daher nur als „kann nachlassen“ im Einstellungstext).
import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'labor-spot-touch',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Auf zufällig auftauchende Punkte schnell mit dem Finger reagieren – Sehen, Entscheiden und Handbewegung zusammen. Mit den Einstellungen lassen sich Größe, Sichtbarkeit, Anzahl und Bereich (auch der Rand mit Kreuz in der Mitte) selbst festlegen.',
      daily: 'Überall, wo man schnell nach etwas greifen oder tippen muss, das plötzlich auftaucht: kleine Schaltflächen auf Tablet und Handy, Handgriffe im Sport oder bei der Arbeit. Ob die Übung dabei hilft, ist nicht belegt.',
      research:
        'Schon die einfache Reaktionszeit besteht aus dem Erkennen des Reizes und dem Anlaufen der Bewegung (Woods et al., 2015); hier kommt die Bewegung zum Punkt dazu. Deren Zeit wächst mit dem Weg und sinkt mit der Größe des Ziels (Fitts’sches Gesetz, Fitts, 1954; MacKenzie, 1992) – deshalb sind Größe und Pause Einstellungen, die die Werte stark verändern. Zum Rand des Gesichtsfelds nimmt die Schärfe ab (Anstis, 1974), und die Reaktionszeit auf einen einfachen Lichtreiz steigt mit dem Abstand von der Mitte stetig, aber mäßig an (Strasburger et al., 2011). Übungen für den Rand mit Handantwort werden im Sport viel eingesetzt; in 93 Studien dazu wurde kein einziges Mal mit Eye-Tracking geprüft, ob wirklich am Rand gesehen wurde, und eine Übertragung auf den Sport wird erwartet, ist aber nicht nachgewiesen (Vater & Strasburger, 2021). Auch diese App kann den Blick nicht messen: Das Kreuz in der Mitte ist eine Bitte, keine Kontrolle. In Studien zu solchen Übungen fallen die Verbesserungen deutlich größer aus, wenn die Prüfung der geübten Aufgabe ähnelt – ein großer Teil ist Gewöhnung an Aufgabe und Gerät (Guo et al., 2025). Touchscreens messen die Reaktionszeit durchweg etwas zu lang, je nach Gerät unterschiedlich (Pronk et al., 2020); Tablets wurden dort nicht untersucht. Darum zählt nur der Vergleich mit dir selbst auf demselben Gerät und mit denselben Einstellungen. Für genau diese Übung gibt es keine Studie.',
      improved:
        'Größen in Zentimetern statt Pixeln (nach Kalibrierung des Bildschirms), auf kleinen Bildschirmen nie größer als die Bühne; die Trefferfläche ist mindestens so groß wie eine Fingerkuppe. Jeder Durchlauf merkt sich seine Einstellungen: Verlauf, Bestwert und „Letztes Mal“ vergleichen nur Läufe mit gleichen Einstellungen (der Ton zählt nicht dazu). Ein Punkt kann erst getroffen werden, wenn er zu sehen war, ein zweiter Tipp direkt nach einem Treffer wird nicht als Fehltipp gezählt. Weiche Rückmeldung mit ✓/✗ statt Blitzen, Punkte blenden weich ein, Zeit über die Eingabe-Zeitstempel gemessen. Gezeigt werden Mittel, Median und Streuung der Reaktionszeit, Trefferquote, verpasste Punkte und Fehltipps – keine Noten, keine Normwerte, keine Ranglisten.',
    },
    it: {
      trains: 'Reagire in fretta con il dito a punti che compaiono a caso – vedere, decidere e muovere la mano insieme. Con le impostazioni si scelgono da soli dimensione, visibilità, numero e zona (anche il bordo con la croce al centro).',
      daily: 'Ovunque si debba afferrare o toccare in fretta qualcosa che compare all’improvviso: piccoli pulsanti su tablet e cellulare, gesti nello sport o al lavoro. Che l’esercizio aiuti non è dimostrato.',
      research:
        'Già il semplice tempo di reazione consiste nel riconoscere lo stimolo e nell’avviare il movimento (Woods et al., 2015); qui si aggiunge il movimento verso il punto. Il suo tempo cresce con la distanza e diminuisce con la grandezza del bersaglio (legge di Fitts, Fitts, 1954; MacKenzie, 1992) – per questo dimensione e pausa sono impostazioni che cambiano molto i valori. Verso il bordo del campo visivo l’acuità diminuisce (Anstis, 1974) e il tempo di reazione a un semplice stimolo luminoso aumenta in modo costante ma moderato con la distanza dal centro (Strasburger et al., 2011). Gli esercizi per il bordo con risposta della mano sono molto usati nello sport; in 93 studi su di essi nessuno ha verificato con l’eye-tracking se si guardasse davvero al bordo, e un trasferimento allo sport è atteso ma non dimostrato (Vater & Strasburger, 2021). Anche questa app non può misurare lo sguardo: la croce al centro è una richiesta, non un controllo. Negli studi su esercizi di questo tipo i miglioramenti risultano nettamente maggiori quando la verifica somiglia al compito allenato – gran parte è abitudine al compito e al dispositivo (Guo et al., 2025). I touchscreen misurano il tempo di reazione sistematicamente un po’ in eccesso, in modo diverso a seconda del dispositivo (Pronk et al., 2020); i tablet non erano stati studiati. Per questo conta solo il confronto con te stesso sullo stesso dispositivo e con le stesse impostazioni. Per questo esercizio non esiste uno studio.',
      improved:
        'Dimensioni in centimetri invece che in pixel (dopo la calibrazione dello schermo), sugli schermi piccoli mai più grandi dell’area di gioco; l’area di tocco è almeno grande quanto la punta di un dito. Ogni giro ricorda le sue impostazioni: andamento, record e “ultima volta” confrontano solo giri con le stesse impostazioni (il suono non conta). Un punto può essere colpito solo dopo essere stato visibile, un secondo tocco subito dopo un colpo a segno non viene contato come tocco a vuoto. Risposta morbida con ✓/✗ invece di lampi, i punti compaiono dolcemente, tempo misurato con i timestamp dell’input. Vengono mostrati media, mediana e variazione del tempo di reazione, percentuale di colpi, punti mancati e tocchi a vuoto – niente voti, niente valori di riferimento, niente classifiche.',
    },
  },
  sources: [
    src('Fitts (1954). The information capacity of the human motor system in controlling the amplitude of movement. Journal of Experimental Psychology', 'https://doi.org/10.1037/h0055392'),
    src('MacKenzie (1992). Fitts’ law as a research and design tool in human-computer interaction. Human-Computer Interaction', 'https://doi.org/10.1207/s15327051hci0701_3'),
    src('Woods, Wyma, Yund, Herron & Reed (2015). Factors influencing the latency of simple reaction time. Frontiers in Human Neuroscience', 'https://doi.org/10.3389/fnhum.2015.00131'),
    src('Strasburger, Rentschler & Jüttner (2011). Peripheral vision and pattern recognition: A review. Journal of Vision', 'https://doi.org/10.1167/11.5.13'),
    src('Anstis (1974). A chart demonstrating variations in acuity with retinal position. Vision Research', 'https://doi.org/10.1016/0042-6989(74)90049-2'),
    src('Vater & Strasburger (2021). Topical review: The top five peripheral vision tools in sport. Optometry and Vision Science', 'https://doi.org/10.1097/OPX.0000000000001732'),
    src('Pronk, Wiers, Molenkamp & Murre (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
  ],
};
