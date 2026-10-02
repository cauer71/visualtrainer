// Quellen: jede Angabe einzeln per Crossref (Metadaten) und, wo vorhanden, über PubMed (Abstract) geprüft (02.10.2026).
// Aus dem Labor-Prototyp (help/choice.js) stammen Hick (1952) und Hyman (1953): Metadaten bestätigt (Crossref); PubMed hat
// für Hick keinen Eintrag, für Hyman keinen Abstract (ältere Arbeiten). Der Inhalt („Wahlreaktionszeit steigt mit der Zahl der
// Möglichkeiten“) ist über Proctor & Schneider (2018, Abstract: Hicks Gesetz, Reiz-Antwort-Kompatibilität, Übung, große
// Mengen, Wiederholungen) und Schneider & Anderson (2011, Abstract: „annähernd linearer Anstieg mit dem Logarithmus der
// Zahl der Alternativen“) bestätigt. Zahlen aus dem Volltext von Proctor & Schneider (2018) wurden nicht eingesehen (nicht
// frei zugänglich) und stehen deshalb nicht im Text.
// Ergänzt und geprüft (Abstract gelesen): Heitz 2014 (Tempo-Genauigkeits-Austausch), Han & Proctor 2022 (Wartezeit-Effekt,
// auch nach der vorigen Wartezeit), Pronk et al. 2020 (Touchgeräte: Reaktionszeiten zu lang; geprüfte Geräte laut Volltext:
// Laptops, Samsung Galaxy S7, iPhone 6S – keine Tablets), Guo et al. 2025 (Lerneffekt, Titel korrekt).
// Nicht aus dem Prototyp übernommen: keine Aussage; „Ziel: Genauigkeit über 95 % halten“ ist nur noch als „unsere Faustregel“
// im Übungstext (keine Vorgabe aus der Forschung).
// Nicht belegt / nicht gefunden: Studien zu dieser Übung (Farben mit Zeichen auf dem Touchscreen), Wirkung auf den Alltag.
import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'labor-wahlreaktion',
  evidence: 'weak',
  texts: {
    de: {
      trains:
        'Auf ein Zeichen in der Mitte so schnell wie möglich die passende Taste tippen – Erkennen, Entscheiden und Tippen zusammen. Mit den Einstellungen lassen sich Anzahl der Tasten, Farben oder Formen, Antwortzeit, Wartezeit und Größe des Zeichens selbst festlegen.',
      daily:
        'Überall, wo man unter mehreren Möglichkeiten schnell die passende wählen muss: Tasten am Automaten, Schalter und Bedienfelder. Ob die Übung dabei hilft, ist nicht belegt.',
      research:
        'Je mehr Antwortmöglichkeiten es gibt, desto länger dauert eine Wahlreaktion im Durchschnitt: Die Zeit steigt ungefähr linear mit dem Logarithmus der Zahl der Möglichkeiten (Hick-Hyman-Gesetz; Hick, 1952; Hyman, 1953; Schneider & Anderson, 2011). Der Zusammenhang ist nicht überall gleich: Er hängt davon ab, wie selbstverständlich Zeichen und Taste zusammenpassen, und wird von Übung, sehr großen Mengen und Wiederholungen beeinflusst (Proctor & Schneider, 2018). Dazu kommt der Austausch zwischen Tempo und Genauigkeit: Wer schneller entscheidet, macht im Allgemeinen mehr Fehler (Heitz, 2014) – deshalb werden beide Werte zusammen gezeigt. Die Wartezeit ist zufällig, damit du den Zeitpunkt nicht erraten kannst; ihre Dauer und die der vorigen Wartezeit beeinflussen die Reaktionszeit (Han & Proctor, 2022). Mit Übung wirst du in dieser Aufgabe besser; ein großer Teil davon ist Gewöhnung an Aufgabe und Gerät: Bei Seh- und Reaktionsübungen fallen Verbesserungen deutlich größer aus, wenn die Prüfung der geübten Aufgabe ähnelt (Guo et al., 2025). Touchscreens messen die Reaktionszeit durchweg etwas zu lang, je nach Gerät unterschiedlich (Pronk et al., 2020); Tablets wurden dort nicht untersucht. Darum zählt nur der Vergleich mit dir selbst auf demselben Gerät und mit denselben Einstellungen. Für genau diese Übung gibt es keine Studie.',
      improved:
        'Jede Farbe trägt zusätzlich ein Zeichen (Kreis, Dreieck, Quadrat, Stern, Raute, Kreuz), bei „Formen“ gibt es gar keine Farbe; die Tasten sind mindestens so groß wie eine Fingerkuppe, bei vielen Tasten auf dem Handy in zwei Reihen. Zeichengröße in Zentimetern (nach Kalibrierung), auf kleinen Bildschirmen begrenzt. Die Zeichen sind gleichmäßig auf die Tasten verteilt. Tippen vor dem Zeichen oder in den ersten 100 Millisekunden danach zählt als „zu früh“ und wird nicht gewertet; Doppeltipps werden ignoriert. Zeit über die Eingabe-Zeitstempel gemessen. Weiche Rückmeldung mit ✓/✗ und einem gestrichelten Ring um die richtige Taste statt farbiger Blitze. Jeder Durchlauf merkt sich seine Einstellungen: Verlauf, Bestwert und „Letztes Mal“ vergleichen nur Läufe mit gleichen Einstellungen (der Ton zählt nicht dazu). Gezeigt werden Genauigkeit, Reaktionszeit (Mittel, Median, Streuung), falsche, verpasste und zu frühe Antworten – keine Noten, keine Normwerte, keine Ranglisten.',
    },
    it: {
      trains:
        'Toccare il più in fretta possibile il tasto giusto per un segno al centro – riconoscere, decidere e toccare insieme. Con le impostazioni si scelgono da soli numero di tasti, colori o forme, tempo di risposta, attesa e dimensione del segno.',
      daily:
        'Ovunque si debba scegliere in fretta quella giusta tra più possibilità: tasti al distributore, sportelli e pannelli di comando. Che l’esercizio aiuti non è dimostrato.',
      research:
        'Più possibilità di risposta ci sono, più a lungo dura in media una reazione di scelta: il tempo cresce circa in modo lineare con il logaritmo del numero di possibilità (legge di Hick-Hyman; Hick, 1952; Hyman, 1953; Schneider & Anderson, 2011). Il rapporto non è uguale ovunque: dipende da quanto segno e tasto si corrispondono in modo naturale ed è influenzato da esercizio, insiemi molto grandi e ripetizioni (Proctor & Schneider, 2018). A ciò si aggiunge lo scambio tra rapidità e precisione: chi decide più in fretta in generale fa più errori (Heitz, 2014) – per questo i due valori vengono mostrati insieme. L’attesa è casuale, così non puoi indovinare il momento; la sua durata e quella dell’attesa precedente influenzano il tempo di reazione (Han & Proctor, 2022). Con l’esercizio in questo compito migliori; gran parte è abitudine al compito e al dispositivo: negli esercizi visivi e di reazione i miglioramenti risultano nettamente maggiori quando la verifica somiglia al compito allenato (Guo et al., 2025). I touchscreen misurano il tempo di reazione sistematicamente un po’ in eccesso, in modo diverso a seconda del dispositivo (Pronk et al., 2020); i tablet non erano stati studiati. Per questo conta solo il confronto con te stesso sullo stesso dispositivo e con le stesse impostazioni. Per questo esercizio non esiste uno studio.',
      improved:
        'Ogni colore porta in più un segno (cerchio, triangolo, quadrato, stella, rombo, croce), con “Forme” non c’è alcun colore; i tasti sono almeno grandi quanto la punta di un dito, con molti tasti sul cellulare su due file. Dimensione del segno in centimetri (dopo la calibrazione), limitata sugli schermi piccoli. I segni sono distribuiti in modo uniforme sui tasti. Toccare prima del segno o nei primi 100 millisecondi dopo vale come “troppo presto” e non viene valutato; i tocchi doppi vengono ignorati. Tempo misurato con i timestamp dell’input. Risposta morbida con ✓/✗ e un anello tratteggiato intorno al tasto giusto invece di lampi colorati. Ogni giro ricorda le sue impostazioni: andamento, record e “ultima volta” confrontano solo giri con le stesse impostazioni (il suono non conta). Vengono mostrati precisione, tempo di reazione (media, mediana, variazione), risposte sbagliate, mancate e troppo presto – niente voti, niente valori di riferimento, niente classifiche.',
    },
  },
  sources: [
    src('Hick (1952). On the rate of gain of information. Quarterly Journal of Experimental Psychology', 'https://doi.org/10.1080/17470215208416600'),
    src('Hyman (1953). Stimulus information as a determinant of reaction time. Journal of Experimental Psychology', 'https://doi.org/10.1037/h0056940'),
    src('Schneider & Anderson (2011). A memory-based model of Hick’s law. Cognitive Psychology', 'https://doi.org/10.1016/j.cogpsych.2010.11.001'),
    src('Proctor & Schneider (2018). Hick’s law for choice reaction time: A review. Quarterly Journal of Experimental Psychology', 'https://doi.org/10.1080/17470218.2017.1322622'),
    src('Heitz (2014). The speed-accuracy tradeoff: History, physiology, methodology, and behavior. Frontiers in Neuroscience', 'https://doi.org/10.3389/fnins.2014.00150'),
    src('Han & Proctor (2022). Revisiting variable-foreperiod effects: Evaluating the repetition priming account. Attention, Perception, & Psychophysics', 'https://doi.org/10.3758/s13414-022-02476-5'),
    src('Pronk, Wiers, Molenkamp & Murre (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
  ],
};
