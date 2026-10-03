// Quellen: jede Angabe einzeln per Crossref (Metadaten, Autoren, Zeitschrift, Band, Seiten) und – wo vorhanden – über
// PubMed/OpenAlex (Abstract) geprüft (02.10.2026). Die Aussagen im Text wurden mit dem Abstract abgeglichen.
// Aus dem Labor-Prototyp (help/sequence.js) bestätigt: Miller (1956; PubMed ohne Abstract, Abstract über OpenAlex) und
// Cowan (2001; Abstract nennt Miller). NICHT aufgenommen: Milner (1971), Br Med Bull 27, 272–277 – die Metadaten stimmen
// (Crossref, DOI 10.1093/oxfordjournals.bmb.a070866), aber weder PubMed noch OpenAlex haben einen Abstract, und über
// Berch et al. (1998), Wikipedia und weitere Seiten ließ sich nicht bestätigen, dass dort die Block-Tapping-Aufgabe
// beschrieben wird (die Aufgabe geht auf die Doktorarbeit von P. M. Corsi, McGill 1972, zurück). Stattdessen: Berch et al.
// (1998), dessen Abstract die Aufgabe, ihre Verwendung und ihre methodischen Varianten beschreibt.
// Ergänzt und geprüft: Luck & Vogel (1997), Melby-Lervåg et al. (2016), Pronk et al. (2020).
// Gestrichen aus dem Prototyp-Text (nicht belegt oder wie ein Normwert): „viele Erwachsene erreichen 5 bis 7 Felder“,
// „Müdigkeit senkt die Merkspanne deutlich“, „Blockspannen-Test“.
import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'labor-sequenz-gedaechtnis',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Eine Folge aufleuchtender Felder merken und in derselben Reihenfolge antippen – das Merken von Orten und Reihenfolgen. Raster, Leuchtdauer, Pausen und Regeln stellst du selbst ein.',
      daily: 'Überall, wo man sich Orte oder Reihenfolgen kurz merken muss: ein Weg, eine Folge von Handgriffen, eine Tastenfolge. Ob die Übung dabei hilft, ist nicht belegt.',
      research:
        'Die Aufgabe ähnelt der Klötzchen-Aufgabe von Corsi (Corsi block-tapping task): Klötze werden in einer Folge angetippt, die man wiederholen soll. Sie wird in Forschung und Klinik viel genutzt, aber Aufbau, Ablauf und Auswertung unterscheiden sich von Studie zu Studie stark (Berch et al., 1998) – Zahlen aus verschiedenen Fassungen sind deshalb nicht vergleichbar. Das Merken von Dingen auf einmal ist begrenzt: Miller (1956) fasste zusammen, dass die unmittelbare Merkspanne eng begrenzt ist und sich durch Zusammenfassen zu Einheiten („Chunks“) dehnen lässt. Cowan (2001) schätzt die Grenze eher auf etwa vier Einheiten, wenn Wiederholen und Zusammenfassen verhindert werden; die Sieben war nur eine grobe Schätzung. Für das Merken von Farben oder Ausrichtungen von Objekten fanden Luck & Vogel (1997) ebenfalls etwa vier Objekte – dort mit anderen Aufgaben als hier. Was Üben bringt: In einer Auswertung von 87 Veröffentlichungen verbesserte Gedächtnistraining zwar die geübten und ähnliche Gedächtnisaufgaben, aber nicht überzeugend andere Fähigkeiten wie Denkaufgaben oder Lesen (Melby-Lervåg et al., 2016). Eine Verbesserung in dieser Übung zeigt also vor allem, dass du die Aufgabe besser kennst. Touchscreens messen Reaktionszeiten durchweg etwas zu lang, je nach Gerät unterschiedlich (Pronk et al., 2020); Tablets wurden dort nicht untersucht. Darum zählt nur der Vergleich mit dir selbst auf demselben Gerät und mit denselben Einstellungen. Für genau diese Übung gibt es keine Studie.',
      improved:
        'Jedes Feld leuchtet mindestens 400 Millisekunden, und es gibt höchstens zweieinhalb Feldwechsel pro Sekunde; die Felder blenden weich ein und aus, statt zu blinken. Das Raster passt sich dem Bildschirm an (auch im Hochformat und beim Drehen), und die Felder sind groß genug zum Antippen; ein zweiter Tipp auf dasselbe Feld direkt danach zählt nicht als Fehler. Die Rückmeldung zeigt ✓/✗ und eine gestrichelte Umrandung statt Blitzen, und die Aufgabe nennt keine Richtwerte. Verlauf, Bestwert und „Letztes Mal“ vergleichen nur Durchläufe mit gleichen Einstellungen. Gezeigt werden die längste richtige Folge, richtig wiederholte Folgen, Fehler, richtige Eingaben und die Zeit pro Eingabe – keine Noten, Normwerte oder Ranglisten.',
    },
    it: {
      trains: 'Ricordare una sequenza di campi che si illuminano e toccarli nello stesso ordine – ricordare luoghi e ordini. Griglia, durata della luce, pause e regole li imposti tu.',
      daily: 'Ovunque si debbano ricordare per poco luoghi o ordini: un percorso, una serie di gesti, una sequenza di tasti. Che l’esercizio aiuti non è dimostrato.',
      research:
        'Il compito somiglia al compito dei blocchetti di Corsi (Corsi block-tapping task): si toccano dei blocchetti in una sequenza che poi va ripetuta. È molto usato nella ricerca e in clinica, ma struttura, svolgimento e valutazione variano molto da studio a studio (Berch et al., 1998) – i numeri di versioni diverse non sono quindi confrontabili. Ricordare più cose insieme è limitato: Miller (1956) riassunse che la memoria immediata è strettamente limitata e si può estendere raggruppando in unità (“chunk”). Cowan (2001) stima il limite piuttosto intorno a quattro unità, quando si impediscono ripetizione e raggruppamento; il sette era solo una stima approssimativa. Per ricordare colori o orientamenti di oggetti Luck e Vogel (1997) trovarono ugualmente circa quattro oggetti – lì con compiti diversi da questo. Cosa porta l’esercizio: in un’analisi di 87 pubblicazioni l’allenamento della memoria migliorava i compiti di memoria esercitati e simili, ma non in modo convincente altre capacità come compiti di ragionamento o la lettura (Melby-Lervåg et al., 2016). Un miglioramento in questo esercizio mostra quindi soprattutto che conosci meglio il compito. I touchscreen misurano il tempo di reazione sistematicamente un po’ in eccesso, in modo diverso a seconda del dispositivo (Pronk et al., 2020); i tablet non erano stati studiati. Per questo conta solo il confronto con te stesso sullo stesso dispositivo e con le stesse impostazioni. Per questo esercizio non esiste uno studio.',
      improved:
        'Ogni campo resta illuminato almeno 400 millisecondi, e ci sono al massimo due cambi di campo e mezzo al secondo; i campi appaiono e svaniscono dolcemente invece di lampeggiare. La griglia si adatta allo schermo (anche in verticale e quando lo giri) e i campi sono abbastanza grandi da toccare; un secondo tocco sullo stesso campo subito dopo non conta come errore. Il riscontro mostra ✓/✗ e un contorno tratteggiato invece di lampi, e l’esercizio non indica valori di riferimento. Andamento, record e “ultima volta” confrontano solo giri con le stesse impostazioni. Vengono mostrati la sequenza giusta più lunga, le sequenze ripetute giuste, gli errori, i tocchi giusti e il tempo per tocco – niente voti, valori normali o classifiche.',
    },
  },
  sources: [
    src('Berch, Krikorian & Huha (1998). The Corsi block-tapping task: Methodological and theoretical considerations. Brain and Cognition', 'https://doi.org/10.1006/brcg.1998.1039'),
    src('Miller (1956). The magical number seven, plus or minus two: Some limits on our capacity for processing information. Psychological Review', 'https://doi.org/10.1037/h0043158'),
    src('Cowan (2001). The magical number 4 in short-term memory: A reconsideration of mental storage capacity. Behavioral and Brain Sciences', 'https://doi.org/10.1017/S0140525X01003922'),
    src('Luck & Vogel (1997). The capacity of visual working memory for features and conjunctions. Nature', 'https://doi.org/10.1038/36846'),
    src('Melby-Lervåg, Redick & Hulme (2016). Working memory training does not improve performance on measures of intelligence or other measures of “far transfer”: Evidence from a meta-analytic review. Perspectives on Psychological Science', 'https://doi.org/10.1177/1745691616635612'),
    src('Pronk, Wiers, Molenkamp & Murre (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
  ],
};
