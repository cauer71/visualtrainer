import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'flick-ziele',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Ein plötzlich erscheinendes Ziel an einem freien Ort entdecken, den Finger hinführen und es genau treffen.',
      daily: 'Nach etwas greifen, das plötzlich auftaucht; Ballspiele; schnelles Antippen kleiner Schaltflächen auf dem Bildschirm.',
      research:
        'Plötzlich auftauchende Reize ziehen die Aufmerksamkeit von selbst an. Wie lange eine Zielbewegung dauert, hängt vom Weg und von der Zielgröße ab (Fitts’sches Gesetz); wird die Zeit knapper, steigen die Fehler. In Zielaufgaben am Bildschirm werden Menschen mit Übung deutlich schneller – ein Teil davon ist Gewöhnung an Gerät und Aufgabe. Ein Nutzen für Sport, Straßenverkehr oder Alltag ist nicht belegt. Vergleiche dich nur mit dir selbst auf demselben Gerät: Die Verzögerung von Touchscreen und Anzeige steckt in jeder gemessenen Zeit.',
      improved:
        'Feste Dauer statt Zeitkonto, kein Strafabzug, kein Rot-Blitz, kein Bildschütteln; die Stufe (Größe und Sichtzeit) passt sich an; der Weg zum letzten Ziel wechselt zwischen kurz, mittel und weit; weiches Ein- und Ausblenden; große Trefferkreise für den Finger; Median statt Mittelwert; bei Fehltipps ✗ und Ring am richtigen Ort.',
    },
    it: {
      trains: 'Scoprire un bersaglio che compare all’improvviso in un punto libero, portarvi il dito e colpirlo con precisione.',
      daily: 'Afferrare qualcosa che compare all’improvviso; giochi con la palla; toccare rapidamente piccoli pulsanti sullo schermo.',
      research:
        'Gli stimoli che compaiono all’improvviso attirano da soli l’attenzione. La durata di un movimento verso un bersaglio dipende dalla distanza e dalla dimensione del bersaglio (legge di Fitts); se il tempo si riduce, aumentano gli errori. Nei compiti di puntamento sullo schermo le persone diventano nettamente più veloci con l’esercizio – in parte è abitudine al dispositivo e al compito. Un’utilità per sport, traffico o vita quotidiana non è dimostrata. Confrontati solo con te stesso sullo stesso dispositivo: il ritardo di touchscreen e schermo è contenuto in ogni tempo misurato.',
      improved:
        'Durata fissa invece del conto alla rovescia, nessuna penalità di tempo, nessun lampo rosso, nessun tremolio dell’immagine; il livello (dimensione e tempo di visibilità) si adatta; il percorso dall’ultimo bersaglio alterna corto, medio e lungo; comparsa e scomparsa graduali; ampie aree di tocco per il dito; mediana invece della media; in caso di errore ✗ e anello nel punto giusto.',
    },
  },
  sources: [
    src('Yantis & Jonides (1984). Abrupt visual onsets and selective attention: Evidence from visual search. Journal of Experimental Psychology: Human Perception and Performance', 'https://doi.org/10.1037/0096-1523.10.5.601'),
    src('Soukoreff & MacKenzie (2004). Towards a standard for pointing device evaluation, perspectives on 27 years of Fitts’ law research in HCI. International Journal of Human-Computer Studies', 'https://doi.org/10.1016/j.ijhcs.2004.09.001'),
    src('Wobbrock, Cutrell, Harada & MacKenzie (2008). An error model for pointing based on Fitts’ law. Proceedings of CHI ’08', 'https://doi.org/10.1145/1357054.1357306'),
    src('Warburton, Campagnoli, Mon-Williams, Mushtaq & Morehead (2023). Kinematic markers of skill in first-person shooter video games. PNAS Nexus', 'https://doi.org/10.1093/pnasnexus/pgad249'),
    src('Listman, Tsay, Kim, Mackey & Heeger (2021). Long-term motor learning in the "wild" with high volume video game data. Frontiers in Human Neuroscience', 'https://doi.org/10.3389/fnhum.2021.777779'),
    src('Cockburn, Ahlström & Gutwin (2012). Understanding performance in touch selections: Tap, drag and radial pointing drag with finger, stylus and mouse. International Journal of Human-Computer Studies', 'https://doi.org/10.1016/j.ijhcs.2011.11.002'),
    src('Deber, Jota, Forlines & Wigdor (2015). How much faster is fast enough? User perception of latency & latency improvements in direct and indirect touch. Proceedings of CHI ’15', 'https://doi.org/10.1145/2702123.2702300'),
    src('Bediou, Rodgers, Tipton, Mayer, Green & Bavelier (2023). Effects of action video game play on cognitive skills: A meta-analysis. Technology, Mind, and Behavior', 'https://doi.org/10.1037/tmb0000102'),
  ],
};
