// Quellen: jede Angabe einzeln per Crossref (Metadaten, Autoren, Zeitschrift, Band, Seiten) und über PubMed/OpenAlex
// (Abstract) geprüft (02.10.2026); die Aussagen im Text wurden mit dem Abstract abgeglichen.
// Der Labor-Prototyp (help/findchars.js) hat KEINE Quellen (`references: []`): alle Quellen sind ergänzt und geprüft.
// Nicht aufgenommen: Treisman & Gelade (1980), Cogn Psychol 12, 97–136 (10.1016/0010-0285(80)90005-5) – Metadaten bestätigt,
// aber weder PubMed noch OpenAlex haben einen Abstract; die Aussage zur Ähnlichkeit steht stattdessen über Duncan & Humphreys (1989)
// (Abstract bestätigt).
// Gestrichen aus dem Prototyp-Text (nicht belegt oder Wirkversprechen): „Verwechslungen von Zeichen … werden hier gezielt geübt“,
// „sind in der Lesentwicklung häufig“ (nur noch vorsichtig über Dehaene et al. 2010), „ein aussagekräftiges Maß ist …“,
// der Hinweis, Spiegelungen „fachlich abklären zu lassen“ (klingt nach Diagnose).
// Nicht belegt und im Text gekennzeichnet: ob Üben der Zeichensuche Lesen oder Rechtschreibung beeinflusst.
import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'labor-zeichen-finden',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Zwischen sehr ähnlichen Zeichen alle Exemplare eines Zielzeichens finden – genaues Hinsehen und Absuchen. Zeichenvorrat, Rastergröße, Anteil der Zielzeichen und Feldgröße stellst du selbst ein.',
      daily: 'Überall, wo man etwas zwischen sehr ähnlichen Dingen suchen muss: Zahlen in einer Liste, Teile in einer Schublade, Einträge in einem Formular. Ob die Übung dabei oder beim Lesen und Schreiben hilft, ist nicht belegt.',
      research:
        'Aufgaben, in denen man ein Zielzeichen zwischen anderen Zeichen sucht, gehören zur visuellen Suche. Wie schwer sie ist, hängt davon ab, wie ähnlich Ziel und Störzeichen sind: Je ähnlicher das Ziel den anderen Zeichen und je unähnlicher diese untereinander sind, desto schwerer wird die Suche (Duncan & Humphreys, 1989). Wohin die Aufmerksamkeit beim Suchen geht, wird von mehreren Faktoren gelenkt, zum Beispiel von auffälligen Merkmalen, vom gesuchten Merkmal und von der bisherigen Suche (Wolfe & Horowitz, 2017). Bei Buchstaben fasst eine Übersichtsarbeit zusammen, dass die Trefferquote beim Erkennen häufig auf Wahrnehmbarkeit, Antwortneigung und Ähnlichkeit der Buchstaben zurückgeführt wird (Mueller & Weidemann, 2012). Die Ähnlichkeit ist also nicht für alle Paare gleich, und deshalb wechselt hier das gesuchte Zeichen reihum, damit jedes etwa gleich oft vorkommt. Zu Spiegelpaaren wie b und d: Das Sehsystem behandelt Spiegelbilder von Bildern zunächst als dasselbe; beim Lesenlernen muss das für Buchstaben überwunden werden, was die Spiegelfehler kleiner Kinder erklären könnte (Dehaene et al., 2010). Ob Üben der Zeichensuche das Lesen oder die Rechtschreibung beeinflusst, ist nicht belegt; die Übung misst das nicht und sagt nichts über deine Augen oder deine Lesefähigkeit. Touchscreens messen Zeiten durchweg etwas zu lang, je nach Gerät unterschiedlich (Pronk et al., 2020); Tablets wurden dort nicht untersucht. Darum zählt nur der Vergleich mit dir selbst auf demselben Gerät und mit denselben Einstellungen. Für genau diese Übung gibt es keine Studie.',
      improved:
        'Felder in Zentimetern (nach Kalibrierung des Bildschirms); die Zeichen sind mindestens etwa 22 Pixel groß. Passt das Raster nicht auf den Bildschirm, wird es gedreht dargestellt oder für diese Tafel verkleinert, und die Ergebnisseite sagt es. Das gesuchte Zeichen wechselt reihum statt zufällig mit Zurücklegen (der Prototyp zog jedes Mal neu). Die Zeit läuft erst, wenn die Tafel zu sehen ist. Rückmeldung mit ✓/Ring und ✗/gestricheltem Feld statt Rot, nach „Fertig“ werden übersehene Zeichen gestrichelt umrandet, kein Blitzen. Jeder Durchlauf merkt sich seine Einstellungen: Verlauf, Bestwert und „Letztes Mal“ vergleichen nur Läufe mit gleichen Einstellungen. Gezeigt werden Genauigkeit, Zeit pro gefundenem Zeichen, gefundene, übersehene und falsch getippte Zeichen – keine Noten, keine Normwerte, keine Ranglisten.',
    },
    it: {
      trains: 'Trovare tutti gli esemplari di un carattere cercato tra caratteri molto simili – guardare bene e passare in rassegna. Serie di caratteri, grandezza della griglia, quota dei caratteri cercati e grandezza dei campi li imposti tu.',
      daily: 'Ovunque si debba cercare qualcosa tra cose molto simili: numeri in un elenco, pezzi in un cassetto, voci in un modulo. Che l’esercizio aiuti in questo o nel leggere e scrivere non è dimostrato.',
      research:
        'I compiti in cui si cerca un carattere tra altri caratteri appartengono alla ricerca visiva. La difficoltà dipende da quanto somigliano bersaglio e distrattori: quanto più il bersaglio somiglia agli altri caratteri e quanto meno questi somigliano tra loro, tanto più difficile diventa la ricerca (Duncan e Humphreys, 1989). Dove va l’attenzione durante la ricerca è guidato da più fattori, per esempio da caratteristiche vistose, dalla caratteristica cercata e dalla ricerca precedente (Wolfe e Horowitz, 2017). Per le lettere una rassegna riassume che la precisione nel riconoscimento è spesso attribuita a percepibilità, tendenza a rispondere e somiglianza delle lettere (Mueller e Weidemann, 2012). La somiglianza non è quindi uguale per tutte le coppie, e per questo qui il carattere cercato cambia a turno, perché ciascuno compaia circa ugualmente spesso. Sulle coppie speculari come b e d: il sistema visivo tratta dapprima le immagini speculari delle figure come la stessa cosa; imparando a leggere questo va superato per le lettere, il che potrebbe spiegare gli errori speculari dei bambini piccoli (Dehaene et al., 2010). Che esercitare la ricerca di caratteri influenzi la lettura o l’ortografia non è dimostrato; l’esercizio non lo misura e non dice nulla sui tuoi occhi o sulla tua capacità di lettura. I touchscreen misurano i tempi sistematicamente un po’ in eccesso, in modo diverso a seconda del dispositivo (Pronk et al., 2020); i tablet non erano stati studiati. Per questo conta solo il confronto con te stesso sullo stesso dispositivo e con le stesse impostazioni. Per questo esercizio non esiste uno studio.',
      improved:
        'Campi in centimetri (dopo la calibrazione dello schermo); i caratteri sono grandi almeno circa 22 pixel. Se la griglia non sta sullo schermo, viene disegnata ruotata o ridotta per questa tavola, e la pagina del risultato lo dice. Il carattere cercato cambia a turno invece che a caso con reinserimento (il prototipo lo estraeva ogni volta di nuovo). Il tempo parte solo quando la tavola è visibile. Risposta con ✓/anello e ✗/campo tratteggiato invece del rosso, dopo “Fatto” i caratteri non visti sono circondati da un tratteggio, nessun lampeggio. Ogni giro ricorda le sue impostazioni: andamento, record e “ultima volta” confrontano solo giri con le stesse impostazioni. Vengono mostrati precisione, tempo per carattere trovato, caratteri trovati, non visti e toccati sbagliati – niente voti, niente valori normali, niente classifiche.',
    },
  },
  sources: [
    src('Duncan & Humphreys (1989). Visual search and stimulus similarity. Psychological Review', 'https://doi.org/10.1037/0033-295x.96.3.433'),
    src('Wolfe & Horowitz (2017). Five factors that guide attention in visual search. Nature Human Behaviour', 'https://doi.org/10.1038/s41562-017-0058'),
    src('Mueller & Weidemann (2012). Alphabetic letter identification: Effects of perceivability, similarity, and bias. Acta Psychologica', 'https://doi.org/10.1016/j.actpsy.2011.09.014'),
    src('Dehaene, Nakamura, Jobert, Kuroki, Ogawa & Cohen (2010). Why do children make mirror errors in reading? Neural correlates of mirror invariance in the visual word form area. NeuroImage', 'https://doi.org/10.1016/j.neuroimage.2009.09.024'),
    src('Pronk, Wiers, Molenkamp & Murre (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
  ],
};
