import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'zielkette',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Ruhende Kreise der Reihe nach antippen und dabei zügig von einem Ziel zum nächsten wechseln – mit wachsender Kettenlänge, kleineren Zielen und größeren Abständen.',
      daily: 'Nacheinander mehrere Felder treffen: Tasten auf dem Handy, Felder auf dem Tablet, Schalter und Knöpfe im Haushalt.',
      research:
        'Die Zeit für eine Zielbewegung wächst mit dem Weg und sinkt mit der Zielgröße (Fitts’sches Gesetz). Folgt auf eine Bewegung gleich die nächste, überlappen sich beide in der Steuerung – die erste Bewegung wird dann etwas anders, als wenn sie allein stünde. Schnellere Bewegungen streuen stärker (Tempo gegen Genauigkeit). Mit dem Finger ist ein kleines Ziel nur ungenau zu treffen, und der Finger oder die Hand verdeckt es leicht. In Studien werden Zielaufgaben mit Übung deutlich besser – ein großer Teil davon ist Gewöhnung an Gerät und Aufgabe. Für genau diese Übung gibt es keine Studie; ein Nutzen für Sport oder Alltag ist nicht belegt. Vergleiche dich nur mit dir selbst auf demselben Gerät.',
      improved:
        'Nur das nächste Ziel ist markiert, ein Pfeil zeigt vom zuletzt getippten Kreis zu ihm. Die Anordnung ändert sich in jeder Runde, sodass nichts auswendig zu lernen oder zu suchen ist und nur der Zielwechsel zählt. Eine Sitzung hat eine feste Zahl an Ketten; die Zeitmarke je Kette ist ein ruhiger Balken, kein Blinken, und die Stufe richtet sich nach dem Erfolg je Kette. Die Trefferflächen sind für den Finger großzügig, neue Ketten erscheinen nie unter dem zuletzt getippten Punkt. Fehltipps zeigen ein Symbol, ohne Blitz und ohne Wackeln. Gemessen werden die Zeit je Kette (Median) und die Fehltipps – keine Noten, kein Blick.',
    },
    it: {
      trains: 'Toccare in sequenza cerchi fermi, passando in fretta da un bersaglio al successivo – con catene sempre più lunghe, bersagli più piccoli e distanze maggiori.',
      daily: 'Colpire più campi uno dopo l’altro: tasti sul cellulare, campi sul tablet, interruttori e pulsanti in casa.',
      research:
        'Il tempo di un movimento verso un bersaglio cresce con la distanza e diminuisce con la grandezza del bersaglio (legge di Fitts). Quando a un movimento ne segue subito un altro, i due si sovrappongono nel controllo – il primo movimento risulta un po’ diverso rispetto a quando è da solo. I movimenti più veloci si disperdono di più (velocità contro precisione). Con il dito un bersaglio piccolo si colpisce solo in modo impreciso e il dito o la mano lo coprono facilmente. Negli studi i compiti di puntamento migliorano nettamente con l’esercizio – in gran parte è abitudine al dispositivo e al compito. Per questo esercizio non esiste uno studio; un’utilità per sport o vita quotidiana non è dimostrata. Confrontati solo con te stesso sullo stesso dispositivo.',
      improved:
        'Solo il bersaglio successivo è evidenziato, una freccia lo indica a partire dall’ultimo cerchio toccato. La disposizione cambia a ogni turno, così non c’è nulla da memorizzare o cercare e conta solo il passaggio da bersaglio a bersaglio. Una sessione ha un numero fisso di catene; il segnale di tempo per catena è una barra calma, senza lampeggi, e il livello dipende dal successo di ogni catena. Le aree di tocco sono ampie per il dito, le nuove catene non compaiono mai sotto l’ultimo punto toccato. I tocchi sbagliati mostrano un simbolo, senza lampi e senza tremolii. Si misurano il tempo per catena (mediana) e i tocchi sbagliati – niente voti, niente sguardo.',
    },
  },
  sources: [
    src('Fitts (1954). The information capacity of the human motor system in controlling the amplitude of movement. Journal of Experimental Psychology', 'https://doi.org/10.1037/h0055392'),
    src('MacKenzie (1992). Fitts’ law as a research and design tool in human-computer interaction. Human–Computer Interaction', 'https://doi.org/10.1207/s15327051hci0701_3'),
    src('Adam, Nieuwenstein, Huys, Paas, Kingma, Willems & Werry (2000). Control of rapid aimed hand movements: The one-target advantage. Journal of Experimental Psychology: Human Perception and Performance', 'https://doi.org/10.1037/0096-1523.26.1.295'),
    src('Harris & Wolpert (1998). Signal-dependent noise determines motor planning. Nature', 'https://doi.org/10.1038/29528'),
    src('Bi, Li & Zhai (2013). FFitts law: Modeling finger touch with Fitts’ law. Proceedings of CHI ’13', 'https://doi.org/10.1145/2470654.2466180'),
    src('Vogel & Baudisch (2007). Shift: A technique for operating pen-based interfaces using touch. Proceedings of CHI ’07', 'https://doi.org/10.1145/1240624.1240727'),
    src('Parhi, Karlson & Bederson (2006). Target size study for one-handed thumb use on small touchscreen devices. Proceedings of MobileHCI ’06', 'https://doi.org/10.1145/1152215.1152260'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
  ],
};
