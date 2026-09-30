import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'pendel-fang',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Den richtigen Moment abpassen: Ein gleichmäßig schwingendes Ziel beobachten und genau dann tippen, wenn es im markierten Bereich ist.',
      daily: 'Einen Ball oder ein schwingendes Objekt im richtigen Moment fangen oder treffen; Schaukel, Tür oder Rhythmus abpassen; Taktgefühl beim Spielen.',
      research:
        'Beim Treffen bewegter Ziele streut der Zeitpunkt der Hand im Mittel um etwa 20 ms; die Hand passt ihre Beschleunigung fortlaufend an die Geschwindigkeit des Ziels an (nach etwa 200 ms). Tippen oder Klicken auf bewegte Ziele landet im Schnitt etwas hinter dem Ziel, umso mehr, je schneller es ist. Bei Touchgeräten kommt eine Verzögerung von Gerät und System hinzu, die je nach Gerät stark verschieden ist. In Studien werden Abfang- und Zeigeaufgaben mit Übung deutlich besser – ein großer Teil davon ist Gewöhnung an Gerät und Aufgabe. Für genau diese Übung gibt es keine Studie; ein Nutzen für Sport, Straßenverkehr oder Alltag ist nicht belegt. Vergleiche dich nur mit dir selbst auf demselben Gerät.',
      improved:
        'Die Bewegung ist ein gleichmäßiges Pendeln (Sinus, mit der Bildzeit gerechnet, auf jedem Gerät gleich schnell); die Stufe ändert Tempo, Weite und Breite des Fangbereichs und blendet Änderungen weich über. Gewertet wird der Zeitpunkt des Tipps selbst, nicht des nächsten Bildes; das Ergebnis zeigt die Abweichung in ms und in Prozent der Bahnbreite samt Tendenz (eher früh oder spät). Es gibt keinen roten Blitz, kein Wackeln, keine Noten; Treffer und Fehler werden mit ✓/✗ und Ring gezeigt, nicht nur mit Farbe. Getippt wird irgendwo auf dem Bildschirm, nicht auf das kleine Ziel.',
    },
    it: {
      trains: 'Cogliere il momento giusto: osservare un bersaglio che oscilla in modo regolare e toccare proprio quando è nella zona segnata.',
      daily: 'Prendere o colpire una palla o un oggetto che oscilla nel momento giusto; cogliere il momento di un’altalena, di una porta o di un ritmo; senso del tempo nei giochi.',
      research:
        'Quando si colpiscono bersagli in movimento, il momento della mano varia in media di circa 20 ms; la mano adatta di continuo la propria accelerazione alla velocità del bersaglio (dopo circa 200 ms). Toccare o cliccare su bersagli in movimento finisce in media un po’ dietro il bersaglio, tanto più quanto è veloce. Sui dispositivi touch si aggiunge un ritardo di dispositivo e sistema, molto diverso da un dispositivo all’altro. Negli studi i compiti di intercettazione e puntamento migliorano nettamente con l’esercizio – in gran parte è abitudine al dispositivo e al compito. Per questo esercizio non esiste uno studio; un’utilità per sport, traffico o vita quotidiana non è dimostrata. Confrontati solo con te stesso sullo stesso dispositivo.',
      improved:
        'Il movimento è un’oscillazione regolare (seno, calcolata con il tempo dei fotogrammi, uguale su ogni dispositivo); il livello cambia velocità, ampiezza e larghezza della zona e sfuma i cambiamenti. Conta il momento del tocco stesso, non quello del fotogramma successivo; il risultato mostra lo scarto in ms e in percentuale della larghezza della linea, con la tendenza (piuttosto presto o tardi). Non ci sono lampi rossi, scosse né voti; colpi ed errori sono mostrati con ✓/✗ e anello, non solo con il colore. Si tocca ovunque sullo schermo, non sul piccolo bersaglio.',
    },
  },
  sources: [
    src('Brenner & Smeets (2009). Sources of variability in interceptive movements. Experimental Brain Research', 'https://doi.org/10.1007/s00221-009-1757-x'),
    src('Brenner, Smeets & de Lussanet (1998). Hitting moving targets: Continuous control of the acceleration of the hand on the basis of the target’s velocity. Experimental Brain Research', 'https://doi.org/10.1007/s002210050535'),
    src('Huang, Tian, Fan, Zhang & Zhai (2018). Understanding the uncertainty in 1D unidirectional moving target selection. Proceedings of CHI 2018', 'https://doi.org/10.1145/3173574.3173811'),
    src('Jagacinski, Repperger, Ward & Moran (1980). A test of Fitts’ law with moving targets. Human Factors', 'https://doi.org/10.1177/001872088002200211'),
    src('Casiez, Pietrzak, Marchal, Poulmane, Falce & Roussel (2017). Characterizing latency in touch and button-equipped interactive systems. Proceedings of UIST 2017', 'https://doi.org/10.1145/3126594.3126606'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
    src('Fransen (2024). There is no supporting evidence for a far transfer of general perceptual or cognitive training to sports performance. Sports Medicine', 'https://doi.org/10.1007/s40279-024-02060-x'),
  ],
};
