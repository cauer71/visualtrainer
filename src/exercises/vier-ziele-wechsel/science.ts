// Quellen nur aus docs/uebungskatalog/literatur (dort per Crossref geprüft); Liste unverändert aus der ersten Fassung.
// Beschreibung für die Vier-Tafel-Übung (Hart-Chart): Praxisangaben der Sehtherapie werden nicht als Nutzen formuliert.
import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'vier-ziele-wechsel',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Reihum von vier Tafeln in den Ecken je einen Buchstaben lesen und antippen – der Blick wechselt dabei zwischen weit getrennten Stellen, und du musst die Reihenfolge im Kopf behalten.',
      daily: 'Blickwechsel zwischen weit entfernten Stellen kommen im Alltag oft vor, zum Beispiel zwischen Bildschirm und Tastatur; ob die Übung dabei hilft, ist nicht belegt.',
      research:
        'Das Vorbild sind Hart-Charts, Buchstabentafeln, die in der Sehtherapie in den vier Ecken aufgestellt und reihum gelesen werden; die dazu berichteten Wirkungen sind Praxisangaben ohne Beleg. Aus der Forschung ist bekannt, dass die Aufmerksamkeit schon vor der Augenbewegung zum nächsten Ziel wandert und das Erkennen dort am besten gelingt. Ein neu eingeblendeter Ring zieht die Aufmerksamkeit an – deshalb wird die Führung Stufe für Stufe abgebaut. Wie lange ein Tipp dauert, hängt von Weg und Größe des Ziels ab (Fitts’sches Gesetz); darum werden die Tafelwechsel nach Richtung getrennt gezeigt. Die gemessene Zeit von Tipp zu Tipp enthält Suchen, Erkennen und die Fingerbewegung – wohin du wirklich schaust, wird hier nicht gemessen (kein Eye-Tracking). Reihenfolge der Tafeln, Rastergröße, Abstände, Tempo des optionalen Takts und die Stufenfolge sind eigene Festlegungen der App, keine Vorgaben aus der Literatur. Mit Wiederholung wird man bei solchen Aufgaben schneller; ein Teil davon ist Gewöhnung an Aufgabe und Gerät. Touchscreens messen je nach Gerät 30–130 ms zu lang, deshalb zählt nur der Vergleich mit dir selbst auf demselben Gerät. Dass sich das Üben auf Sport, Straßenverkehr oder Sehen überträgt, ist nicht belegt; die Studienlage zu solchen Übungen ist umstritten.',
      improved:
        'Vier gleich große Tafeln mit verschieden gemischten Buchstaben, ein Buchstabe von jeder Tafel im Wechsel und erst dann der nächste, getippte Buchstaben werden blass statt zu verschwinden (so zeigt die Tafel den Stand), die Führung wird abgebaut (Ring um den Buchstaben, Ring um die Tafel, keine), pro Stufe ändert sich genau ein Merkmal (Abstand der Tafeln, Tafelgröße, Buchstabengröße, Führung, Reihenfolge, Wechsel nach einem oder zwei Buchstaben, Buchstabenvorrat), eine feste Regel passt die Stufe nach jeder Runde an (90 % / 75 %), falsche Buchstaben werden gezählt, aber nicht bestraft, drei Runden mit kurzer Pause, Tafelwechsel nach Richtung, erste gegen letzte Hälfte und der Mehraufwand beim Tafelwechsel als Vergleich mit dir selbst, weiche Rückmeldung und Ringe ohne Blinken.',
    },
    it: {
      trains: 'Leggere e toccare a turno una lettera da ciascuna delle quattro tavole negli angoli: lo sguardo passa tra punti ben separati e devi tenere a mente l’ordine.',
      daily: 'I cambi di sguardo tra punti lontani sono frequenti nella vita quotidiana, per esempio tra schermo e tastiera; che l’esercizio aiuti non è dimostrato.',
      research:
        'Il modello sono le Hart-Chart, tavole di lettere che nella terapia visiva vengono poste nei quattro angoli e lette a turno; gli effetti riferiti sono indicazioni della pratica senza prove. Dalla ricerca si sa che l’attenzione si sposta verso il bersaglio successivo già prima del movimento oculare e che lì il riconoscimento riesce meglio. Un anello che compare all’improvviso attira l’attenzione – per questo la guida viene ridotta livello dopo livello. Quanto dura un tocco dipende dalla distanza e dalle dimensioni del bersaglio (legge di Fitts); per questo i cambi di tavola vengono mostrati separatamente per direzione. Il tempo misurato da tocco a tocco comprende cercare, riconoscere e il movimento del dito – dove guardi davvero qui non viene misurato (nessun eye-tracking). L’ordine delle tavole, la dimensione della griglia, le distanze, il tempo del ritmo facoltativo e la sequenza dei livelli sono scelte proprie dell’app, non indicazioni della letteratura. Ripetendo, in questi compiti si diventa più veloci; in parte è abitudine al compito e al dispositivo. I touchscreen misurano, a seconda del dispositivo, 30–130 ms in più, per questo conta solo il confronto con te stesso sullo stesso dispositivo. Che l’esercizio si trasferisca allo sport, al traffico o alla vista non è dimostrato; i dati sugli esercizi di questo tipo sono controversi.',
      improved:
        'Quattro tavole della stessa dimensione con lettere mescolate in modo diverso, una lettera da ogni tavola a turno e solo dopo la successiva, le lettere toccate diventano chiare invece di sparire (la tavola mostra così a che punto sei), la guida viene ridotta (anello sulla lettera, anello sulla tavola, nessuno), a ogni livello cambia una sola caratteristica (distanza delle tavole, dimensione della tavola, dimensione delle lettere, guida, ordine, cambio dopo una o due lettere, insieme delle lettere), una regola fissa adatta il livello dopo ogni giro (90 % / 75 %), le lettere sbagliate vengono contate ma non penalizzate, tre giri con breve pausa, cambio di tavola per direzione, prima contro seconda metà e il costo aggiuntivo al cambio di tavola come confronto con te stesso, risposta morbida e anelli senza lampeggi.',
    },
  },
  sources: [
    src('Deubel & Schneider (1996). Saccade target selection and object recognition: Evidence for a common attentional mechanism. Vision Research', 'https://doi.org/10.1016/0042-6989(95)00294-4'),
    src('Yantis & Jonides (1984). Abrupt visual onsets and selective attention: Evidence from visual search. Journal of Experimental Psychology: Human Perception and Performance', 'https://doi.org/10.1037/0096-1523.10.5.601'),
    src('Darrien, Herd, Starling, Rosenberg & Morrison (2001). An analysis of the dependence of saccadic latency on target position and target characteristics in human subjects. BMC Neuroscience', 'https://doi.org/10.1186/1471-2202-2-13'),
    src('Pronk, Wiers, Molenkamp & Murre (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
    src('Saslow (1967). Effects of components of displacement-step stimuli upon latency for saccadic eye movement. Journal of the Optical Society of America', 'https://doi.org/10.1364/JOSA.57.001024'),
    src('MacKenzie (1992). Fitts’ law as a research and design tool in human-computer interaction. Human-Computer Interaction', 'https://doi.org/10.1207/s15327051hci0701_3'),
    src('Guo et al. (2025). Learning effects overestimate the effect of training when the test resembles the training. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
    src('Fransen (2024). There is no supporting evidence for a far transfer of general perceptual or cognitive training to sports performance. Sports Medicine', 'https://doi.org/10.1007/s40279-024-02060-x'),
    src('Appelbaum, Lochhead, Feng, Erickson, Liu & Laby (2025). Limited evidence is not no evidence: A rebuttal to Fransen, 2024. Sports Medicine', 'https://doi.org/10.1007/s40279-024-02141-x'),
  ],
};
