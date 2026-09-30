import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'schrumpfende-ziele',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Mehrere gleichzeitig schrumpfende Kreise überblicken, den kleinsten als den dringendsten erkennen und ihn zuerst antippen.',
      daily: 'Mehrere Dinge gleichzeitig im Blick behalten und entscheiden, was zuerst dran ist – etwa beim Kochen, im Haushalt oder bei Spielen auf dem Tablet.',
      research:
        'Zum Zeigen und Antippen gibt es viel Forschung: Die Zeit hängt von Entfernung und Zielgröße ab (Fitts’sches Gesetz), und beim Suchen mehrerer Ziele passieren nach dem ersten gefundenen leichter Fehler bei den übrigen. Plötzlich Auftauchendes zieht die Aufmerksamkeit an. Mit Übung werden Zielaufgaben deutlich besser – ein großer Teil davon ist Gewöhnung an Gerät und Aufgabe, der Übertrag auf andere Aufgaben ist klein. Für genau diese Übung – die Größe als Zeichen für Dringlichkeit – gibt es keine Studie; ein Nutzen für Sport, Straßenverkehr oder Alltag ist nicht belegt. Vergleiche dich nur mit dir selbst auf demselben Gerät.',
      improved:
        'Alle Kreise schrumpfen gleich schnell (mit der Zeit gerechnet, gleich auf jedem Gerät), der kleinste ist wirklich immer als Erster weg – die Größe verrät die Dringlichkeit ehrlich. Ein gestrichelter Innenkreis zeigt, wann ein Kreis verschwindet. Feste Zahl an Runden ohne Zeitgutschrift oder Zeitstrafe, Stufe nach Erfolg statt nach Punkten, große Trefferflächen für den Finger, Fehler mit Symbol statt rotem Blitz, nichts wackelt. Gemessen werden der Anteil „kleinster zuerst“ und die Verpassten – keine Noten, kein Blick.',
    },
    it: {
      trains: 'Tenere sott’occhio più cerchi che si rimpiccioliscono insieme, riconoscere il più piccolo come il più urgente e toccarlo per primo.',
      daily: 'Tenere d’occhio più cose insieme e decidere cosa viene prima – per esempio mentre si cucina, nelle faccende di casa o nei giochi sul tablet.',
      research:
        'Sul puntare e toccare esiste molta ricerca: il tempo dipende dalla distanza e dalla grandezza del bersaglio (legge di Fitts), e nella ricerca di più bersagli, dopo il primo trovato si sbaglia più facilmente con gli altri. Ciò che compare all’improvviso attira l’attenzione. Con l’esercizio i compiti di puntamento migliorano nettamente – in gran parte è abitudine al dispositivo e al compito, il trasferimento ad altri compiti è piccolo. Per questo esercizio – la grandezza come segno di urgenza – non esiste uno studio; un’utilità per sport, traffico o vita quotidiana non è dimostrata. Confrontati solo con te stesso sullo stesso dispositivo.',
      improved:
        'Tutti i cerchi si rimpiccioliscono alla stessa velocità (in base al tempo, uguale su ogni dispositivo), il più piccolo sparisce davvero sempre per primo – la grandezza rivela onestamente l’urgenza. Un cerchio interno tratteggiato mostra quando un cerchio sparisce. Numero fisso di turni senza tempo in regalo né penalità, livello in base al successo e non ai punti, ampie aree di tocco per il dito, errori con un simbolo invece di un lampo rosso, nulla trema. Si misurano la quota «il più piccolo prima» e i cerchi persi – niente voti, niente sguardo.',
    },
  },
  sources: [
    src('Fitts (1954). The information capacity of the human motor system in controlling the amplitude of movement. Journal of Experimental Psychology', 'https://doi.org/10.1037/h0055392'),
    src('Yantis & Jonides (1984). Abrupt visual onsets and selective attention: Evidence from visual search. Journal of Experimental Psychology: Human Perception and Performance', 'https://doi.org/10.1037/0096-1523.10.5.601'),
    src('Adamo, Cain & Mitroff (2013). Self-induced attentional blink: A cause of errors in multiple-target search. Psychological Science', 'https://doi.org/10.1177/0956797613497970'),
    src('Bi, Li & Zhai (2013). FFitts law: Modeling finger touch with Fitts’ law. Proceedings of CHI ’13', 'https://doi.org/10.1145/2470654.2466180'),
    src('Guadagnoli & Lee (2004). Challenge point: A framework for conceptualizing the effects of various practice conditions in motor learning. Journal of Motor Behavior', 'https://doi.org/10.3200/JMBR.36.2.212-224'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
    src('Fransen (2024). There is no supporting evidence for a far transfer of general perceptual or cognitive training to sports performance. Sports Medicine', 'https://doi.org/10.1007/s40279-024-02060-x'),
  ],
};
