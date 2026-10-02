// Vorläufig: Quellen nur aus docs/uebungskatalog/literatur (dort per Crossref geprüft). Katalogeintrag und endgültige
// Fassung folgen durch den Auftraggeber.
import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'vier-ziele-wechsel',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Die Aufmerksamkeit schnell und gezielt zwischen vier weit getrennten Stellen wechseln und das jeweils markierte Ziel antippen.',
      daily: 'Blickwechsel zwischen weit entfernten Stellen kommen im Alltag oft vor, zum Beispiel zwischen Bildschirm und Tastatur; ob die Übung dabei hilft, ist nicht belegt.',
      research:
        'Taucht ein Ziel plötzlich auf, zieht es die Aufmerksamkeit an, und der Blick wird meist von selbst dorthin gelenkt; am Ziel gelingt das Erkennen am besten, weil Aufmerksamkeit und Blickziel gekoppelt sind. Die gemessene Zeit vom Erscheinen des Rings bis zum Tipp enthält Orientierung, Augenbewegung, Erkennen, Entscheiden und die Fingerbewegung – wohin du wirklich schaust, wird hier nicht gemessen (kein Eye-Tracking). Mit Wiederholung wird man bei solchen Aufgaben schneller; ein Teil davon ist Gewöhnung an Aufgabe und Gerät. Touchscreens messen je nach Gerät 30–130 ms zu lang, deshalb zählt nur der Vergleich mit dir selbst auf demselben Gerät. Dass sich das Üben auf Sport, Straßenverkehr oder Sehen überträgt, ist nicht belegt; die Studienlage zu solchen Übungen ist umstritten.',
      improved:
        'Nie dasselbe Ziel zweimal hintereinander und kein Pendeln, die zwölf Wechselrichtungen kommen gleich oft vor, die Pause dazwischen ist unvorhersehbar, nur ein Ziel ist markiert (Ring, nicht nur Farbe), pro Stufe ändert sich genau ein Merkmal (Größe, Abstand zum Rand, Pause, ähnliche Zeichen, Symbole, Ablenker), eine feste Regel passt die Stufe an (90 % / 75 %), falsche Ziele, berührte Ablenker und Auslassungen werden getrennt gezählt, drei kurze Blöcke mit Pause statt eines langen Durchgangs, Richtungen und erste gegen letzte Hälfte als Vergleich mit dir selbst, weiche Einblendungen ohne Blinken.',
    },
    it: {
      trains: 'Spostare rapidamente e con precisione l’attenzione tra quattro punti molto distanti e toccare il bersaglio evidenziato.',
      daily: 'I cambi di sguardo tra punti lontani sono frequenti nella vita quotidiana, per esempio tra schermo e tastiera; che l’esercizio aiuti non è dimostrato.',
      research:
        'Quando un bersaglio compare all’improvviso, attira l’attenzione e di solito lo sguardo viene guidato lì da solo; sul bersaglio il riconoscimento riesce meglio, perché attenzione e meta dello sguardo sono accoppiate. Il tempo misurato dalla comparsa dell’anello al tocco comprende orientamento, movimento oculare, riconoscimento, decisione e movimento del dito – dove guardi davvero qui non viene misurato (nessun eye-tracking). Ripetendo, in questi compiti si diventa più veloci; in parte è abitudine al compito e al dispositivo. I touchscreen misurano, a seconda del dispositivo, 30–130 ms in più, per questo conta solo il confronto con te stesso sullo stesso dispositivo. Che l’esercizio si trasferisca allo sport, al traffico o alla vista non è dimostrato; i dati sugli esercizi di questo tipo sono controversi.',
      improved:
        'Mai lo stesso bersaglio due volte di seguito e nessun andirivieni, le dodici direzioni di cambio compaiono con la stessa frequenza, la pausa tra i bersagli è imprevedibile, è evidenziato un solo bersaglio (anello, non solo colore), a ogni livello cambia una sola caratteristica (dimensione, distanza dal bordo, pausa, simboli simili, simboli, distrattori), una regola fissa adatta il livello (90 % / 75 %), bersagli sbagliati, distrattori toccati e bersagli saltati vengono contati separatamente, tre brevi serie con pausa invece di una lunga, direzioni e prima contro seconda metà come confronto con te stesso, comparse graduali senza lampeggi.',
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
