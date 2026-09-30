import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'fuenf-tueren',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Ein kurz erscheinendes Ziel an einer von fünf Stellen entdecken und genau diese Stelle treffen.',
      daily: 'Umschauen, wenn etwas plötzlich an einer von mehreren möglichen Stellen auftaucht; Ballspiele; schnelle Auswahl auf dem Bildschirm.',
      research:
        'Ein plötzlich erscheinendes Objekt zieht die Aufmerksamkeit von selbst an; Blick und Hand folgen dem Ort meist ohne viel Überlegen, deshalb steigt die Reaktionszeit bei direktem Zeigen mit mehr Orten nur wenig. In Studien werden Zeige- und Reaktionsaufgaben mit Übung deutlich besser – ein Teil davon ist Gewöhnung an Gerät und Aufgabe. Ein Nutzen für Sport, Straßenverkehr oder Alltag ist nicht belegt. Vergleiche dich nur mit dir selbst auf demselben Gerät.',
      improved:
        'Die Türreihenfolge ist unvorhersehbar (nie dieselbe Tür direkt hintereinander, keine 1-2-3-Läufe, zufällige Pausen), die Sichtbarkeit passt sich adaptiv an, der Stern blendet weich ein und aus (kein Blitzen, kein rotes Warnlicht), ein Fehler wird mit Symbol und Hinweis auf die richtige Tür gezeigt, große Trefferflächen, Median statt Mittelwert.',
    },
    it: {
      trains: 'Scoprire un bersaglio che compare per un attimo in uno di cinque punti e toccare proprio quel punto.',
      daily: 'Guardarsi intorno quando qualcosa compare all’improvviso in uno dei tanti punti possibili; giochi con la palla; scelta rapida sullo schermo.',
      research:
        'Un oggetto che compare all’improvviso attira da solo l’attenzione; sguardo e mano seguono di solito il luogo senza molto pensare, perciò con il puntamento diretto il tempo di reazione cresce poco con più posizioni. Negli studi i compiti di puntamento e di reazione migliorano nettamente con l’esercizio – in parte è abitudine al dispositivo e al compito. Un’utilità per sport, traffico o vita quotidiana non è dimostrata. Confrontati solo con te stesso sullo stesso dispositivo.',
      improved:
        'L’ordine delle porte è imprevedibile (mai la stessa porta di seguito, niente sequenze 1-2-3, pause casuali), la visibilità si adatta, la stella compare e scompare gradualmente (nessun lampo, nessuna luce rossa di avviso), un errore viene mostrato con un simbolo e l’indicazione della porta giusta, grandi aree di tocco, mediana invece della media.',
    },
  },
  sources: [
    src('Yantis & Jonides (1984). Abrupt visual onsets and selective attention: Evidence from visual search. Journal of Experimental Psychology: Human Perception and Performance', 'https://doi.org/10.1037/0096-1523.10.5.601'),
    src('Posner, Snyder & Davidson (1980). Attention and the detection of signals. Journal of Experimental Psychology: General', 'https://doi.org/10.1037/0096-3445.109.2.160'),
    src('Proctor & Schneider (2018). Hick’s law for choice reaction time: A review. Quarterly Journal of Experimental Psychology', 'https://doi.org/10.1080/17470218.2017.1322622'),
    src('Kveraga, Boucher & Hughes (2002). Saccades operate in violation of Hick’s law. Experimental Brain Research', 'https://doi.org/10.1007/s00221-002-1168-8'),
    src('Fitts (1954). The information capacity of the human motor system in controlling the amplitude of movement. Journal of Experimental Psychology', 'https://doi.org/10.1037/h0055392'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
    src('Fransen (2024). There is no supporting evidence for a far transfer of general perceptual or cognitive training to sports performance. Sports Medicine', 'https://doi.org/10.1007/s40279-024-02060-x'),
  ],
};
