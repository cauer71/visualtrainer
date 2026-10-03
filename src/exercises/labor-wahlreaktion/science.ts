// Quellen: jede Angabe einzeln per Crossref (Metadaten) und, wo vorhanden, über PubMed (Abstract) geprüft (02.10.2026).
// Hick (1952) und Hyman (1953): Metadaten bestätigt (Crossref); PubMed hat
// für Hick keinen Eintrag, für Hyman keinen Abstract (ältere Arbeiten). Der Inhalt („Wahlreaktionszeit steigt mit der Zahl der
// Möglichkeiten“) ist über Proctor & Schneider (2018, Abstract: Hicks Gesetz, Reiz-Antwort-Kompatibilität, Übung, große
// Mengen, Wiederholungen) und Schneider & Anderson (2011, Abstract: „annähernd linearer Anstieg mit dem Logarithmus der
// Zahl der Alternativen“) bestätigt. Zahlen aus dem Volltext von Proctor & Schneider (2018) wurden nicht eingesehen (nicht
// frei zugänglich) und stehen deshalb nicht im Text.
// Ergänzt und geprüft (Abstract gelesen): Heitz 2014 (Tempo-Genauigkeits-Austausch), Han & Proctor 2022 (Wartezeit-Effekt,
// auch nach der vorigen Wartezeit), Pronk et al. 2020 (Touchgeräte: Reaktionszeiten zu lang; geprüfte Geräte laut Volltext:
// Laptops, Samsung Galaxy S7, iPhone 6S – keine Tablets), Guo et al. 2025 (Lerneffekt, Titel korrekt).
// „Ziel: Genauigkeit über 95 % halten“ steht nur als „unsere Faustregel“ im Übungstext (keine Vorgabe aus der Forschung).
// Mountford et al. (2004, S. 43–44): Messwerte am lebenden Auge streuen stärker als an Prüfkörpern, Mehrfachmessung nötig
// (Hornhautvermessung; hier nur als allgemeiner Messgrundsatz genannt).
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
        'Je mehr Antwortmöglichkeiten es gibt, desto länger dauert eine Wahlreaktion im Durchschnitt: Die Zeit steigt ungefähr linear mit dem Logarithmus der Zahl der Möglichkeiten (Hick-Hyman-Gesetz; Hick, 1952; Hyman, 1953; Schneider & Anderson, 2011). Der Zusammenhang ist nicht überall gleich: Er hängt davon ab, wie selbstverständlich Zeichen und Taste zusammenpassen, und wird von Übung, sehr großen Mengen und Wiederholungen beeinflusst (Proctor & Schneider, 2018). Dazu kommt der Austausch zwischen Tempo und Genauigkeit: Wer schneller entscheidet, macht im Allgemeinen mehr Fehler (Heitz, 2014) – deshalb werden beide Werte zusammen gezeigt. Die Wartezeit ist zufällig, damit du den Zeitpunkt nicht erraten kannst; ihre Dauer und die der vorigen Wartezeit beeinflussen die Reaktionszeit (Han & Proctor, 2022). Mit Übung wirst du in dieser Aufgabe besser; ein großer Teil davon ist Gewöhnung an Aufgabe und Gerät: Bei Seh- und Reaktionsübungen fallen Verbesserungen deutlich größer aus, wenn die Prüfung der geübten Aufgabe ähnelt (Guo et al., 2025). Touchscreens messen die Reaktionszeit durchweg etwas zu lang, je nach Gerät unterschiedlich (Pronk et al., 2020); Tablets wurden dort nicht untersucht. Messwerte am Menschen streuen von Durchgang zu Durchgang, am lebenden Auge stärker als an Prüfkörpern; deshalb sind Mehrfachmessung und Mittelung üblich (Mountford et al., 2004, S. 43–44, am Beispiel der Hornhautvermessung), und die Übung zeigt Mittel, Median und Streuung über viele Zeichen statt eines Einzelwerts. Darum zählt nur der Vergleich mit dir selbst auf demselben Gerät und mit denselben Einstellungen. Für genau diese Übung gibt es keine Studie.',
      improved:
        'Die Übung ist so gebaut, dass die Farbe nie allein entscheidet: Bei „Farben“ trägt jede Farbe zusätzlich ein Zeichen (Kreis, Dreieck, Quadrat, Stern, Raute, Kreuz), auf dem Reiz wie auf der Taste, bei „Formen“ gibt es weiße Zeichen ohne Farbe. Die Zeichen sind gleichmäßig auf die Tasten verteilt; die Tasten haben eine Mindestgröße für Touch-Eingaben und stehen bei vielen Tasten auf dem Handy in zwei Reihen, die Zeichengröße wird in Zentimetern angegeben (nach Kalibrierung) und auf kleinen Bildschirmen begrenzt. Die Wartezeit ist zufällig; ein Tipp vor dem Zeichen oder in den ersten 100 Millisekunden danach kann noch keine Antwort sein und zählt als „zu früh“, er wird nicht gewertet, und ein Doppeltipp wird ignoriert. Gemessen wird die Zeit zwischen dem Erscheinen des Zeichens und der Berührung über die Zeitstempel der Eingabe; wohin du schaust, erfasst die App nicht. Die Rückmeldung bleibt zurückhaltend: ✓ oder ✗ am Zeichen, bei einem Fehler oder einem verpassten Zeichen zusätzlich ein gestrichelter Ring um die richtige Taste, ohne farbige Blitze. Jeder Durchlauf merkt sich seine Einstellungen, und Verlauf, Bestwert und „Letztes Mal“ vergleichen nur Läufe mit gleichen Einstellungen (der Ton zählt nicht dazu); gezeigt werden Genauigkeit, Reaktionszeit (Mittel, Median, Streuung) sowie falsche, verpasste und zu frühe Antworten – ohne Noten, Normwerte und Ranglisten.',
    },
    it: {
      trains:
        'Toccare il più in fretta possibile il tasto giusto per un segno al centro – riconoscere, decidere e toccare insieme. Con le impostazioni si scelgono da soli numero di tasti, colori o forme, tempo di risposta, attesa e dimensione del segno.',
      daily:
        'Ovunque si debba scegliere in fretta quella giusta tra più possibilità: tasti al distributore, sportelli e pannelli di comando. Che l’esercizio aiuti non è dimostrato.',
      research:
        'Più possibilità di risposta ci sono, più a lungo dura in media una reazione di scelta: il tempo cresce circa in modo lineare con il logaritmo del numero di possibilità (legge di Hick-Hyman; Hick, 1952; Hyman, 1953; Schneider & Anderson, 2011). Il rapporto non è uguale ovunque: dipende da quanto segno e tasto si corrispondono in modo naturale ed è influenzato da esercizio, insiemi molto grandi e ripetizioni (Proctor & Schneider, 2018). A ciò si aggiunge lo scambio tra rapidità e precisione: chi decide più in fretta in generale fa più errori (Heitz, 2014) – per questo i due valori vengono mostrati insieme. L’attesa è casuale, così non puoi indovinare il momento; la sua durata e quella dell’attesa precedente influenzano il tempo di reazione (Han & Proctor, 2022). Con l’esercizio in questo compito migliori; gran parte è abitudine al compito e al dispositivo: negli esercizi visivi e di reazione i miglioramenti risultano nettamente maggiori quando la verifica somiglia al compito allenato (Guo et al., 2025). I touchscreen misurano il tempo di reazione sistematicamente un po’ in eccesso, in modo diverso a seconda del dispositivo (Pronk et al., 2020); i tablet non erano stati studiati. I valori misurati sulle persone variano da una prova all’altra, sull’occhio vivente più che su corpi di prova; per questo sono d’uso la misurazione ripetuta e la media (Mountford et al., 2004, pag. 43–44, a proposito della misurazione della cornea), e l’esercizio mostra media, mediana e variazione su molti segni invece di un singolo valore. Per questo conta solo il confronto con te stesso sullo stesso dispositivo e con le stesse impostazioni. Per questo esercizio non esiste uno studio.',
      improved:
        'L’esercizio è costruito in modo che il colore non decida mai da solo: con “Colori” ogni colore porta in più un segno (cerchio, triangolo, quadrato, stella, rombo, croce), sullo stimolo come sul tasto; con “Forme” ci sono segni bianchi senza colore. I segni sono distribuiti in modo uniforme sui tasti; i tasti hanno una dimensione minima per l’input touch e, con molti tasti sul cellulare, stanno su due file; la dimensione del segno è espressa in centimetri (dopo la calibrazione) e limitata sugli schermi piccoli. L’attesa è casuale; un tocco prima del segno o nei primi 100 millisecondi dopo non può ancora essere una risposta e vale come “troppo presto”, non viene valutato, e un tocco doppio viene ignorato. Si misura il tempo tra la comparsa del segno e il tocco con i timestamp dell’input; dove guardi, l’app non lo rileva. La risposta resta sobria: ✓ o ✗ sul segno, in caso di errore o di segno mancato in più un anello tratteggiato intorno al tasto giusto, senza lampi colorati. Ogni giro ricorda le sue impostazioni, e andamento, record e “ultima volta” confrontano solo giri con le stesse impostazioni (il suono non conta); vengono mostrati precisione, tempo di reazione (media, mediana, variazione) e risposte sbagliate, mancate e troppo presto – senza voti, valori di riferimento e classifiche.',
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
    src('Mountford, Ruston & Dave (2004). Orthokeratology: Principles and Practice, S. 43–44 (Wiederholbarkeit von Messungen). Butterworth-Heinemann', 'https://openlibrary.org/isbn/9780750640077'),
  ],
};
