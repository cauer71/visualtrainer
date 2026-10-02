// Quellen: jede Angabe einzeln per Crossref (Metadaten) und über PubMed (Abstract) geprüft (02.10.2026); die Aussagen im
// Text halten sich an das, was im Abstract steht. Der Labor-Prototyp (help/saccade.js) hatte KEINE Quellen
// (`references: []`); alle Quellen sind neu gesucht und geprüft (teils aus docs/uebungskatalog/literatur/lit-W13, dort
// ebenfalls per Crossref/Abstract geprüft, hier erneut abgefragt):
// - Deubel & Schneider (1996): Aufmerksamkeit und Blicksprung-Ziel sind gekoppelt (Abstract).
// - Baloh et al. (1975): Sprungdauer wächst linear mit der Sprungweite, im Mittel 2,7 ms je Grad, 25 Gesunde (Abstract).
// - Neggers & Bekkering (2000): Blick bleibt am Ziel einer Zeigebewegung verankert, Blicksprünge während des Zeigens im
//   Mittel 155 ms verzögert (Abstract; Laborversuch mit Zeigebewegungen, nicht Tippen auf dem Tablet).
// - Repp (2005): Übersicht zum Mitklopfen zu einem Takt; es wird nur die Tatsache der Forschungslage genannt, keine Zahl
//   (der Abstract nennt Themen, keine Ergebnisse).
// - Karantinos et al. (2025): Wiederholen von Blicksprung-Aufgaben verbesserte Genauigkeit, Tempo, Stabilität (30 Personen,
//   Eye-Tracking, andere Aufgaben) (Abstract).
// - Pronk et al. (2020), Guo et al. (2025): Grenzen der Messung am Touchgerät bzw. Gewöhnungseffekt (Abstract).
// Nicht übernommen: Aussagen des Prototyp-Textes ohne Quelle („erst in der Ruhe dazwischen wird Information aufgenommen“ – nicht
// geprüft; „stellt sicher, dass der Blick tatsächlich dort angekommen ist“ – die App kann den Blick nicht messen; „schult
// präzise Blicksprünge“ – Wirkversprechen). Für genau diese Übung (Takt, springendes Zeichen, Antippen) wurde keine Studie
// gefunden. Nicht bestätigt werden konnte: Volltext der Studien (nur Abstracts gelesen).
import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'labor-takt-sakkaden',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Im Takt eines Metronoms ein springendes Zeichen ansehen und laut lesen, auf Wunsch zusätzlich im Takt antippen. Takt, Anordnung, Zeichenart und Größe stellst du selbst ein.',
      daily: 'Überall, wo der Blick im Rhythmus zwischen weit auseinanderliegenden Stellen wechselt, zum Beispiel beim Abgleichen zweier Listen. Ob die Übung dabei hilft, ist nicht belegt.',
      research:
        'Sakkaden sind die schnellen Sprünge der Augen von einem Punkt zum nächsten. Vor dem Sprung wandert die Aufmerksamkeit zum Ziel: Das Erkennen gelingt dort am besten, an Nachbarobjekten nur noch etwa zufällig (Deubel & Schneider, 1996). Je weiter der Sprung, desto länger dauert er – in einer Studie mit 25 Gesunden im Mittel 2,7 ms mehr je Grad (Baloh et al., 1975); darum zeigt die App den größten Sprung auch als Sehwinkel. Beim Zeigen auf ein Ziel bleibt der Blick offenbar am Ziel verankert: Blicksprünge zu einem neuen Ziel während einer Zeigebewegung waren im Mittel 155 ms verzögert (Neggers & Bekkering, 2000, Laborversuch mit Zeigebewegungen). Wir vermuten daher, dass „Berühren im Takt“ schwerer ist als nur Lesen; geprüft ist das für diese Übung nicht. Das Mitklopfen zu einem Ton ist als Aufgabe gut untersucht (Repp, 2005). Beim Wiederholen von Blicksprung-Aufgaben wurden gesunde Erwachsene genauer, schneller und gleichmäßiger, unabhängig von der Tageszeit (Karantinos et al., 2025; gemessen mit Eye-Tracking an anderen Aufgaben, nicht an dieser). Ein Teil der Verbesserung in der geübten Aufgabe ist Gewöhnung an Aufgabe und Gerät: In Studien zu solchen Übungen fiel sie deutlich größer aus, wenn die Prüfung der geübten Aufgabe ähnelte (Guo et al., 2025). Touchscreens messen Reaktionszeiten durchweg etwas zu lang, je nach Gerät unterschiedlich (Pronk et al., 2020; Tablets wurden dort nicht untersucht); darum zählt nur der Vergleich mit dir selbst auf demselben Gerät und mit denselben Einstellungen. Takt, Anordnungen, Zeichenarten und Größen sind eigene Festlegungen der App. Wohin du schaust und ob du laut liest, wird nicht gemessen (kein Eye-Tracking); mit Berühren wird nur die Antwort der Hand erfasst. Dass sich das Üben auf Lesen, Sport oder Alltag überträgt, ist nicht belegt. Für genau diese Übung gibt es keine Studie.',
      improved:
        'Ein Schlag ist genau ein Zeichen; die Schläge liegen exakt im Takt (ein verspätetes Bild holt verpasste Schläge nach), und die App sagt ehrlich, dass Zeichen und Ton erst im nächsten Bild erscheinen. Die Zeichen blenden weich ein und aus, es gibt kein Blinken im Takt, höchstens 140 Schläge pro Minute (etwa 2,3 Wechsel pro Sekunde). Größen in Zentimetern (nach Kalibrierung des Bildschirms), auf kleinen Bildschirmen so verkleinert, dass sich die Zeichen nicht überlappen; der größte Sprung wird auch als Sehwinkel gezeigt. Die Trefferfläche ist mindestens so groß wie eine Fingerkuppe, ein zweiter Tipp direkt nach einem Treffer zählt nicht als Fehltipp. Jeder Durchlauf merkt sich seine Einstellungen: Verlauf, Bestwert und „Letztes Mal“ vergleichen nur Läufe mit gleichen Einstellungen (der Ton zählt nicht dazu). Ohne Berühren steht die Zahl der gezeigten Zeichen fest und sagt nichts über dich; mit Berühren ist der Hauptwert die Trefferquote. Keine Noten, keine Normwerte, keine Ranglisten.',
    },
    it: {
      trains: 'Guardare e leggere a voce alta un segno che salta a ritmo di metronomo, se vuoi anche toccarlo a ritmo. Ritmo, disposizione, tipo di segni e dimensione li scegli tu.',
      daily: 'Ovunque lo sguardo cambi a ritmo tra punti ben distanti, per esempio confrontando due elenchi. Che l’esercizio aiuti non è dimostrato.',
      research:
        'Le saccadi sono i rapidi salti degli occhi da un punto al successivo. Prima del salto l’attenzione si sposta verso il bersaglio: il riconoscimento è lì migliore, sugli oggetti vicini solo più o meno casuale (Deubel & Schneider, 1996). Più il salto è ampio, più dura – in uno studio con 25 persone sane in media 2,7 ms in più per grado (Baloh et al., 1975); per questo l’app mostra il salto più grande anche come angolo visivo. Quando si indica un bersaglio lo sguardo sembra restare ancorato al bersaglio: i salti verso un nuovo bersaglio durante un movimento di puntamento erano in media ritardati di 155 ms (Neggers & Bekkering, 2000, esperimento di laboratorio con movimenti di puntamento). Supponiamo quindi che “Tocco a ritmo” sia più difficile del solo leggere; per questo esercizio non è verificato. Battere il ritmo su un suono è un compito ben studiato (Repp, 2005). Ripetendo compiti di saccadi, adulti sani sono diventati più precisi, più rapidi e più regolari, indipendentemente dall’ora del giorno (Karantinos et al., 2025; misurato con eye-tracking su altri compiti, non su questo). Una parte del miglioramento nel compito allenato è abitudine al compito e al dispositivo: negli studi su esercizi di questo tipo era nettamente maggiore quando la verifica somigliava al compito allenato (Guo et al., 2025). I touchscreen misurano i tempi di reazione sistematicamente un po’ in eccesso, in modo diverso a seconda del dispositivo (Pronk et al., 2020; i tablet non erano stati studiati); per questo conta solo il confronto con te stesso sullo stesso dispositivo e con le stesse impostazioni. Ritmo, disposizioni, tipi di segni e dimensioni sono scelte proprie dell’app. Dove guardi e se leggi a voce alta non viene misurato (nessun eye-tracking); con il tocco viene rilevata solo la risposta della mano. Non è dimostrato che l’allenamento si trasferisca alla lettura, allo sport o alla vita quotidiana. Per questo esercizio non esiste uno studio.',
      improved:
        'Un battito è esattamente un segno; i battiti sono esattamente a ritmo (un’immagine in ritardo recupera i battiti persi), e l’app dice onestamente che segno e suono compaiono solo nell’immagine successiva. I segni compaiono e spariscono con dissolvenza morbida, nessun lampeggio a ritmo, al massimo 140 battiti al minuto (circa 2,3 cambi al secondo). Dimensioni in centimetri (dopo la calibrazione dello schermo), sugli schermi piccoli ridotte in modo che i segni non si sovrappongano; il salto più grande viene mostrato anche come angolo visivo. L’area di tocco è almeno grande quanto la punta di un dito, un secondo tocco subito dopo un colpo a segno non conta come tocco a vuoto. Ogni giro ricorda le sue impostazioni: andamento, record e “ultima volta” confrontano solo giri con le stesse impostazioni (il suono non conta). Senza tocco il numero di segni mostrati è fissato e non dice nulla su di te; con il tocco il valore principale è la percentuale di colpi. Niente voti, niente valori di riferimento, niente classifiche.',
    },
  },
  sources: [
    src('Deubel & Schneider (1996). Saccade target selection and object recognition: Evidence for a common attentional mechanism. Vision Research', 'https://doi.org/10.1016/0042-6989(95)00294-4'),
    src('Baloh, Sills, Kumley & Honrubia (1975). Quantitative measurement of saccade amplitude, duration, and velocity. Neurology', 'https://doi.org/10.1212/WNL.25.11.1065'),
    src('Neggers & Bekkering (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. Journal of Neurophysiology', 'https://doi.org/10.1152/jn.2000.83.2.639'),
    src('Repp (2005). Sensorimotor synchronization: A review of the tapping literature. Psychonomic Bulletin & Review', 'https://doi.org/10.3758/BF03206433'),
    src('Karantinos, Kotsiou, Drouza, Mantas, Anderson, Klein & Smyrnis (2025). Diurnal variation and practice effects in saccade task performance. Experimental Brain Research', 'https://doi.org/10.1007/s00221-025-07131-7'),
    src('Pronk, Wiers, Molenkamp & Murre (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
  ],
};
