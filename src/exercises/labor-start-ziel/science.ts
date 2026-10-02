// Quellen: jede Angabe einzeln per Crossref (Metadaten) und, wo vorhanden, über PubMed (Abstract) bzw. Volltext geprüft (02.10.2026).
// Aus dem Labor-Prototyp (help/sprint.js) stammt nur Fitts (1954): Metadaten bestätigt (Crossref; PubMed ohne Abstract, ältere
// Arbeit). Der Inhalt (Bewegungszeit hängt von Abstand und Zielbreite ab) ist über Soukoreff & MacKenzie (2004) bestätigt:
// Volltext gelesen, Einleitung „Fitts’ law (1954) describes the relationship between movement time, distance, and accuracy for
// people engaged in rapid aimed movements … applies to pointing and dragging using a mouse, trackball, stylus, joystick, and
// touchscreen“. MacKenzie (1992), von Phase A als Inhaltsquelle genannt, ist nur als Scan (ohne Text) verfügbar und wurde
// deshalb nicht aufgenommen.
// Ergänzt und geprüft (Abstract gelesen): Woods et al. 2015 (einfache Reaktionszeit = Erkennen + Bewegungsbeginn), Han & Proctor
// 2022 (Wartezeit-Effekt, auch durch die vorige Wartezeit), Pronk et al. 2020 (Touchgeräte: Reaktionszeiten zu lang; geprüfte
// Geräte laut Volltext: Laptops, Samsung Galaxy S7, iPhone 6S – keine Tablets), Guo et al. 2025 (Lerneffekt, Titel korrekt).
// Nicht aus dem Prototyp übernommen: „Die Trennung beider Anteile ist aus der Sportwissenschaft bekannt“ – keine Quelle gefunden,
// gestrichen. Nicht belegt / nicht gefunden: Studien zur Reaktionsmessung über das Loslassen einer Startfläche auf dem
// Touchscreen; Wirkung auf den Alltag.
import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'labor-start-ziel',
  evidence: 'weak',
  texts: {
    de: {
      trains:
        'Den Finger auf einer Startfläche halten, beim Aufleuchten des Ziels loslassen und das Ziel berühren – Reaktion und Bewegung werden getrennt gemessen. Mit den Einstellungen lassen sich Wartezeit, Abstand, Zielgröße und Zielposition selbst festlegen.',
      daily:
        'Überall, wo man aus der Ruhe heraus auf ein Signal reagieren und dann gezielt zugreifen muss: Griff zu einer Taste oder zu einem Schalter, Handgriffe im Sport oder bei der Arbeit. Ob die Übung dabei hilft, ist nicht belegt.',
      research:
        'Die Übung trennt zwei Teile, die man sonst zusammen misst: die Zeit bis zum Loslassen (Erkennen des Ziels und Start der Bewegung) und die Zeit für den Weg zum Ziel. Schon die einfache Reaktionszeit besteht aus der Zeit für das Erkennen des Reizes und der Zeit bis zum Beginn der Bewegung (Woods et al., 2015). Die Bewegungszeit hängt nach dem Fitts’schen Gesetz von Abstand und Größe des Ziels ab: je weiter weg und kleiner, desto länger (Fitts, 1954); das Gesetz wurde für Zeigen und Ziehen auch auf Touchscreens beschrieben (Soukoreff & MacKenzie, 2004). Deshalb verändern Abstand und Zielgröße die Bewegungszeit stark. Die Wartezeit ist zufällig, damit du den Zeitpunkt nicht erraten kannst; ihre Dauer und die der vorigen Wartezeit beeinflussen die Reaktionszeit (Han & Proctor, 2022). Dass die Reaktion hier über das Loslassen einer Startfläche gemessen wird, ist eine Besonderheit dieser Übung – dafür gibt es keine Studie. Touchscreens messen Reaktionszeiten durchweg etwas zu lang, je nach Gerät unterschiedlich (Pronk et al., 2020); Tablets und das Loslassen wurden dort nicht untersucht. Bei Seh- und Reaktionsübungen fallen Verbesserungen deutlich größer aus, wenn die Prüfung der geübten Aufgabe ähnelt – ein großer Teil ist Gewöhnung an Aufgabe und Gerät (Guo et al., 2025). Darum zählt nur der Vergleich mit dir selbst auf demselben Gerät und mit denselben Einstellungen.',
      improved:
        'Abstand und Zielgröße in Zentimetern statt Pixeln (nach Kalibrierung des Bildschirms); auf kleinen Bildschirmen werden sie so begrenzt, dass das Ziel nie über den Rand ragt, die Trefferfläche ist mindestens so groß wie eine Fingerkuppe. Loslassen in den ersten 100 Millisekunden nach dem Aufleuchten kann keine Reaktion sein und zählt als Fehlstart; Fehlstarts zählen nicht als Durchgang. Die Reaktionszeit wird über alle Durchgänge mit Loslassen gebildet (nicht nur über Treffer), die Bewegungszeit über die Treffer. Zeiten über die Eingabe-Zeitstempel gemessen; ein zweiter Finger oder Doppeltipp stört nicht. Weiche Rückmeldung mit Text, ✓/✗ und der Beschriftung der Startfläche („START“, „HALTEN“) statt Blitzen. Jeder Durchlauf merkt sich seine Einstellungen: Verlauf, Bestwert und „Letztes Mal“ vergleichen nur Läufe mit gleichen Einstellungen (der Ton zählt nicht dazu). Gezeigt werden Reaktionszeit (Mittel, Median, Streuung), Bewegungszeit, Fehlstarts und Fehltipps – keine Noten, keine Normwerte, keine Ranglisten.',
    },
    it: {
      trains:
        'Tenere il dito su un’area di partenza, lasciare quando il bersaglio si accende e toccare il bersaglio – reazione e movimento vengono misurati separatamente. Con le impostazioni si scelgono da soli attesa, distanza, dimensione e posizione del bersaglio.',
      daily:
        'Ovunque si debba reagire a un segnale partendo da fermi e poi afferrare con precisione: la mano verso un tasto o un interruttore, gesti nello sport o al lavoro. Che l’esercizio aiuti non è dimostrato.',
      research:
        'L’esercizio separa due parti che di solito si misurano insieme: il tempo fino al rilascio (riconoscere il bersaglio e avviare il movimento) e il tempo per il percorso verso il bersaglio. Già il semplice tempo di reazione consiste nel tempo per riconoscere lo stimolo e in quello fino all’inizio del movimento (Woods et al., 2015). Il tempo di movimento dipende, secondo la legge di Fitts, da distanza e dimensione del bersaglio: più lontano e più piccolo, più a lungo (Fitts, 1954); la legge è stata descritta per puntare e trascinare anche sui touchscreen (Soukoreff & MacKenzie, 2004). Per questo distanza e dimensione del bersaglio cambiano molto il tempo di movimento. L’attesa è casuale, così non puoi indovinare il momento; la sua durata e quella dell’attesa precedente influenzano il tempo di reazione (Han & Proctor, 2022). Che qui la reazione venga misurata con il rilascio di un’area di partenza è una particolarità di questo esercizio – per questo non esiste uno studio. I touchscreen misurano i tempi di reazione sistematicamente un po’ in eccesso, in modo diverso a seconda del dispositivo (Pronk et al., 2020); i tablet e il rilascio non erano stati studiati. Negli esercizi visivi e di reazione i miglioramenti risultano nettamente maggiori quando la verifica somiglia al compito allenato – gran parte è abitudine al compito e al dispositivo (Guo et al., 2025). Per questo conta solo il confronto con te stesso sullo stesso dispositivo e con le stesse impostazioni.',
      improved:
        'Distanza e dimensione del bersaglio in centimetri invece che in pixel (dopo la calibrazione dello schermo); sugli schermi piccoli vengono limitate in modo che il bersaglio non esca mai dal bordo, l’area di tocco è almeno grande quanto la punta di un dito. Lasciare nei primi 100 millisecondi dopo l’accensione non può essere una reazione e vale come partenza falsa; le partenze false non contano come giro. Il tempo di reazione si calcola su tutti i giri con rilascio (non solo sui colpi a segno), il tempo di movimento sui colpi a segno. Tempi misurati con i timestamp dell’input; un secondo dito o un tocco doppio non disturba. Risposta morbida con testo, ✓/✗ e la scritta sull’area di partenza (“START”, “TIENI”) invece di lampi. Ogni giro ricorda le sue impostazioni: andamento, record e “ultima volta” confrontano solo giri con le stesse impostazioni (il suono non conta). Vengono mostrati tempo di reazione (media, mediana, variazione), tempo di movimento, partenze false e tocchi fuori – niente voti, niente valori di riferimento, niente classifiche.',
    },
  },
  sources: [
    src('Fitts (1954). The information capacity of the human motor system in controlling the amplitude of movement. Journal of Experimental Psychology', 'https://doi.org/10.1037/h0055392'),
    src('Soukoreff & MacKenzie (2004). Towards a standard for pointing device evaluation, perspectives on 27 years of Fitts’ law research in HCI. International Journal of Human-Computer Studies', 'https://doi.org/10.1016/j.ijhcs.2004.09.001'),
    src('Woods, Wyma, Yund, Herron & Reed (2015). Factors influencing the latency of simple reaction time. Frontiers in Human Neuroscience', 'https://doi.org/10.3389/fnhum.2015.00131'),
    src('Han & Proctor (2022). Revisiting variable-foreperiod effects: Evaluating the repetition priming account. Attention, Perception, & Psychophysics', 'https://doi.org/10.3758/s13414-022-02476-5'),
    src('Pronk, Wiers, Molenkamp & Murre (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
  ],
};
