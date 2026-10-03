// Quellen: jede Angabe einzeln per Crossref (Metadaten) und PubMed (Abstract, wo vorhanden) geprüft (02.10.2026).
// Aus dem Labor-Prototyp (help/flash.js) stammen Sperling (1960) und Levitt (1971):
// - Sperling (1960): Crossref ✓ (Psychol Monogr 74(11), S. 1–29); PubMed hat keinen Abstract – die Aussage („direkt nach
//   kurzer Anzeige ist mehr verfügbar, als berichtet werden kann; es schwindet schnell“) ist der bekannte Befund dieser
//   Arbeit und wird in aktuellen PubMed-Abstracts zum Teilbericht-Verfahren („Sperling partial report“) so beschrieben
//   (z. B. Smith & Busch 2025, J Neurosci); die Größenordnung „etwa eine Sekunde“ ist vorsichtig formuliert.
// - Levitt (1971): Crossref ✓ (JASA 49(2B), 467–477); kein PubMed-Abstract. Aussage: „2 richtig → schwerer, 1 falsch →
//   leichter“ ist eine der dort beschriebenen Transformed-up-down-Regeln. Die Angabe „konvergiert auf etwa 71 %“ des
//   Prototyps steht so NICHT mehr im Text: García-Pérez (1998; Abstract geprüft) zeigt, dass Regeln mit gleich großen
//   Schritten ihre rechnerischen Zielwerte bei festen Schrittweiten nicht zuverlässig erreichen und kurze Treppen
//   (bis 20 Umkehrpunkte) verzerrt und ungenau sind. Darum: „rechnerisch etwa 70 %, ungenau bei kurzen Läufen“.
// Ergänzt und geprüft (Crossref + PubMed-Abstract): Enns & Di Lollo (2000, Maske), García-Pérez (1998), Elze (2010,
// Bildzählen bei Kurzdarbietungen), Pronk et al. (2020, Touch/Web-Zeitgenauigkeit, „bei kurzen Dauern bis 100 ms weniger
// genau“), Anwyl-Irvine et al. (2021, Genauigkeit der Anzeigedauer im Web), Guo et al. (2025, Lerneffekt).
// Nicht aufgenommen: Aussagen des Prototyp-Textes ohne Beleg („Tachistoskop-Prinzip zeigt, wie viel in einem Blick
// erfasst wird“ – nur als vorsichtige Beschreibung, nicht als Messung; „mindestens 20 Durchgänge sinnvoll“ – nur als Hinweis,
// nicht als Vorgabe der Forschung; Abdunkeln des Raums als Voraussetzung – nicht belegt, nur als Hinweis auf Spiegelungen).
// Nicht bestätigt werden konnte: nichts Aufgenommenes; offen bleibt die genaue Zeitspanne des Nachklingens (Sperling).
import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'labor-blitz-erkennung',
  evidence: 'weak',
  texts: {
    de: {
      trains:
        'Ziffern oder Buchstaben, die nur Bruchteile einer Sekunde zu sehen sind, in einem Blick erfassen, kurz behalten und eintippen. Mit den Einstellungen legst du Anzahl und Art der Zeichen, Anzeigedauer, Maske und Größe selbst fest; auf Wunsch sucht die App die Dauer, um die sich dein Ergebnis einpendelt.',
      daily:
        'Überall, wo man etwas im Vorbeischauen erfassen muss, zum Beispiel eine Zahl auf einer Anzeige oder einem Bildschirm. Ob die Übung dabei hilft, ist nicht belegt.',
      research:
        'Direkt nach einer sehr kurzen Anzeige ist mehr Information im Kopf verfügbar, als man hinterher berichten kann; sie schwindet aber schnell, in der Größenordnung einer Sekunde (Sperling, 1960). Ein Muster direkt nach der Anzeige, die Maske, kann das Gesehene unsichtbar machen, und die Aufmerksamkeit spielt dabei eine große Rolle (Enns & Di Lollo, 2000). Die automatische Anpassung folgt einem klassischen Verfahren („zwei richtig → schwerer, ein Fehler → leichter“; Levitt, 1971). Es pendelt sich rechnerisch bei etwa 70 % richtigen Durchgängen ein; wie genau das stimmt, hängt von Schrittgröße und Länge des Laufs ab, und kurze Läufe sind ungenau (García-Pérez, 1998). Auf Bildschirmen wird die Dauer in ganzen Bildern gezeigt. Wie lange ein Zeichen wirklich leuchtet, hängt zusätzlich von der Bildschirmtechnik ab, und das bloße Zählen von Bildern kann bei sehr kurzen Zeiten die wahre Dauer verfehlen (Elze, 2010). In Messungen mit Web-Anwendungen war die Anzeigedauer meist brauchbar genau (Anwyl-Irvine et al., 2021), bei kurzen Dauern bis 100 ms aber weniger als im Labor, und Touchscreens messen Reaktionszeiten durchweg zu lang (Pronk et al., 2020; Tablets nicht untersucht). Darum zählt nur der Vergleich mit dir selbst auf demselben Gerät und mit denselben Einstellungen. In Studien zu Sehübungen fallen die Verbesserungen deutlich größer aus, wenn die Prüfung der geübten Aufgabe ähnelt – ein großer Teil ist Gewöhnung an Aufgabe und Gerät (Guo et al., 2025). Für genau diese Übung gibt es keine Studie; ein Nutzen für Alltag, Sport oder Verkehr ist nicht belegt.',
      improved:
        'Die Anzeigedauer wird in ganzen Bildern des Bildschirms gezählt, und die tatsächlich verstrichene Zeit je Durchgang wird gemessen und im Ergebnis gezeigt; Durchgänge, in denen ein Bild fehlte, zählen nicht für die automatische Anpassung, die deshalb in Bildern statt in Millisekunden läuft. Zwischen zwei Anzeigen liegt immer mehr als eine Sekunde, die Zeichen erscheinen in gedämpftem Hellgrau auf einer kleinen Fläche, und die Maske besteht aus mittelgrauen Blöcken, die weich ausblenden – ohne Rot und ohne Vollflächeneffekte, damit die Helligkeitswechsel schwach bleiben. Die Zeichenhöhe wird in Zentimetern eingestellt (nach Kalibrierung des Bildschirms) und auf kleinen Bildschirmen begrenzt. Weil das Ergebnis von den Einstellungen abhängt, vergleichen Verlauf, Bestwert und „Letztes Mal“ nur Durchläufe mit gleichen Einstellungen. Gezeigt werden der Anteil ganz richtiger Durchgänge, richtige Zeichen, Eingabezeit und gemessene Dauer; Noten, Normwerte und Ranglisten gibt es nicht, und wohin du schaust, misst die App nicht.',
    },
    it: {
      trains:
        'Cogliere in un colpo d’occhio cifre o lettere visibili solo per frazioni di secondo, ricordarle per un istante e digitarle. Con le impostazioni scegli da solo numero e tipo di simboli, durata, maschera e dimensione; a richiesta l’app cerca la durata attorno alla quale si assesta il tuo risultato.',
      daily:
        'Ovunque si debba cogliere qualcosa al volo, per esempio un numero su un display o su uno schermo. Che l’esercizio aiuti non è dimostrato.',
      research:
        'Subito dopo una visualizzazione molto breve è disponibile più informazione di quanta se ne riesca a riferire dopo; ma si dissolve in fretta, nell’ordine di un secondo (Sperling, 1960). Un motivo subito dopo la visualizzazione, la maschera, può rendere invisibile ciò che si è visto, e l’attenzione vi svolge un ruolo importante (Enns & Di Lollo, 2000). L’adattamento automatico segue un metodo classico (“due giusti → più difficile, un errore → più facile”; Levitt, 1971). In teoria si assesta intorno al 70 % di turni giusti; quanto sia preciso dipende dalla dimensione dei passi e dalla lunghezza del giro, e i giri brevi sono imprecisi (García-Pérez, 1998). Sugli schermi la durata viene mostrata in immagini intere. Per quanto tempo un simbolo resta davvero acceso dipende inoltre dalla tecnologia dello schermo, e il semplice conteggio delle immagini può mancare la durata reale con tempi molto brevi (Elze, 2010). Nelle misurazioni con applicazioni web la durata di visualizzazione era per lo più abbastanza precisa (Anwyl-Irvine et al., 2021), ma meno che in laboratorio con durate brevi fino a 100 ms, e i touchscreen misurano i tempi di reazione sistematicamente in eccesso (Pronk et al., 2020; i tablet non erano stati studiati). Per questo conta solo il confronto con te stesso sullo stesso dispositivo e con le stesse impostazioni. Negli studi sugli esercizi visivi i miglioramenti risultano nettamente maggiori quando la verifica somiglia al compito allenato – gran parte è abitudine al compito e al dispositivo (Guo et al., 2025). Per questo esercizio non esiste uno studio; un’utilità per vita quotidiana, sport o traffico non è dimostrata.',
      improved:
        'La durata di visualizzazione viene contata in immagini intere dello schermo, e il tempo realmente trascorso in ogni turno viene misurato e mostrato nel risultato; i turni in cui mancava un’immagine non contano per l’adattamento automatico, che procede perciò in immagini invece che in millisecondi. Tra due visualizzazioni passa sempre più di un secondo, i simboli compaiono in grigio chiaro attenuato su una piccola area e la maschera è fatta di blocchi grigio medio che svaniscono dolcemente – senza rosso e senza effetti a tutto schermo, così i cambi di luminosità restano deboli. L’altezza dei simboli si imposta in centimetri (dopo la calibrazione dello schermo) e sugli schermi piccoli viene limitata. Poiché il risultato dipende dalle impostazioni, andamento, record e “ultima volta” confrontano solo giri con le stesse impostazioni. Si mostrano la quota dei turni completamente giusti, i simboli giusti, il tempo di digitazione e la durata misurata; non ci sono voti, valori di riferimento né classifiche, e l’app non misura dove guardi.',
    },
  },
  sources: [
    src('Sperling (1960). The information available in brief visual presentations. Psychological Monographs: General and Applied', 'https://doi.org/10.1037/h0093759'),
    src('Enns & Di Lollo (2000). What’s new in visual masking? Trends in Cognitive Sciences', 'https://doi.org/10.1016/S1364-6613(00)01520-5'),
    src('Levitt (1971). Transformed up-down methods in psychoacoustics. The Journal of the Acoustical Society of America', 'https://doi.org/10.1121/1.1912375'),
    src('García-Pérez (1998). Forced-choice staircases with fixed step sizes: asymptotic and small-sample properties. Vision Research', 'https://doi.org/10.1016/S0042-6989(97)00340-4'),
    src('Elze (2010). Misspecifications of stimulus presentation durations in experimental psychology: A systematic review of the psychophysics literature. PLoS ONE', 'https://doi.org/10.1371/journal.pone.0012792'),
    src('Anwyl-Irvine, Dalmaijer, Hodges & Evershed (2021). Realistic precision and accuracy of online experiment platforms, web browsers, and devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-020-01501-5'),
    src('Pronk, Wiers, Molenkamp & Murre (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
  ],
};
