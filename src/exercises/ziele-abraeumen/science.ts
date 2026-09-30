import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'ziele-abraeumen',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Mehrere gleichzeitig sichtbare Ziele im Blick behalten, selbst die Reihenfolge wählen und sie nacheinander antippen, bevor ihre Zeit abläuft.',
      daily: 'Mehrere Dinge gleichzeitig im Auge behalten und entscheiden, was zuerst dran ist – etwa beim Kochen, im Haushalt oder beim Spielen mit Kindern.',
      research:
        'Ein neu auftauchendes Objekt zieht die Aufmerksamkeit von selbst an, und bei Suchaufgaben mit mehreren Zielen unterlaufen nach einem gefundenen Ziel leichter Fehler bei den übrigen. Die Bewegungszeit zum Antippen steigt mit dem Weg und sinkt mit der Zielgröße (Fitts’sches Gesetz). In Studien werden Zeige- und Antippaufgaben mit Übung deutlich besser – ein großer Teil davon ist Gewöhnung an Gerät und Aufgabe. Für genau diese Übung gibt es keine Studie; ein Nutzen für Sport, Straßenverkehr oder Alltag ist nicht belegt. Vergleiche dich nur mit dir selbst auf demselben Gerät.',
      improved:
        'Der Ring zeigt die Restzeit jedes Kreises, sodass „was ist dringend?“ keine Gedächtnisaufgabe ist. Die Stufe steigt und sinkt je nach Erfolg (nicht nach Punkten), die Sitzung hat eine feste Dauer ohne Zeitgutschrift, und es gibt keinen roten Blitz, kein Wackeln und keine Noten. Fehlklicks werden mit einem weichen Symbol gezeigt, die Kreise tragen verschiedene Zeichen statt nur Farbe, die Trefferflächen sind groß. Gemessen wird der Abstand zwischen zwei Treffern (Median), keine „Reaktionszeit“.',
    },
    it: {
      trains: 'Tenere d’occhio più bersagli visibili contemporaneamente, scegliere da sé l’ordine e toccarli uno dopo l’altro prima che il loro tempo scada.',
      daily: 'Tenere d’occhio più cose insieme e decidere cosa viene prima – per esempio mentre si cucina, nelle faccende di casa o giocando con i bambini.',
      research:
        'Un oggetto che compare di nuovo attira da solo l’attenzione e, nei compiti di ricerca con più bersagli, dopo aver trovato un bersaglio si sbaglia più facilmente con gli altri. Il tempo di movimento per toccare cresce con la distanza e diminuisce con la grandezza del bersaglio (legge di Fitts). Negli studi i compiti di puntamento e di tocco migliorano nettamente con l’esercizio – in gran parte è abitudine al dispositivo e al compito. Per questo esercizio non esiste uno studio; un’utilità per sport, traffico o vita quotidiana non è dimostrata. Confrontati solo con te stesso sullo stesso dispositivo.',
      improved:
        'L’anello mostra il tempo residuo di ogni cerchio, così «cosa è urgente?» non è un compito di memoria. Il livello sale e scende in base al successo (non ai punti), la sessione ha una durata fissa senza tempo in regalo e non ci sono lampi rossi, scosse né voti. Gli errori di tocco sono mostrati con un simbolo delicato, i cerchi hanno segni diversi invece del solo colore, le aree di tocco sono grandi. Si misura l’intervallo tra due colpi (mediana), non un «tempo di reazione».',
    },
  },
  sources: [
    src('Fitts (1954). The information capacity of the human motor system in controlling the amplitude of movement. Journal of Experimental Psychology', 'https://doi.org/10.1037/h0055392'),
    src('Yantis & Jonides (1984). Abrupt visual onsets and selective attention: Evidence from visual search. Journal of Experimental Psychology: Human Perception and Performance', 'https://doi.org/10.1037/0096-1523.10.5.601'),
    src('Adamo, Cain & Mitroff (2013). Self-induced attentional blink: A cause of errors in multiple-target search. Psychological Science', 'https://doi.org/10.1177/0956797613497970'),
    src('Watson & Humphreys (1997). Visual marking: Prioritizing selection for new objects by top-down attentional inhibition of old objects. Psychological Review', 'https://doi.org/10.1037/0033-295X.104.1.90'),
    src('Land & Hayhoe (2001). In what ways do eye movements contribute to everyday activities? Vision Research', 'https://doi.org/10.1016/S0042-6989(01)00102-X'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
    src('Fransen (2024). There is no supporting evidence for a far transfer of general perceptual or cognitive training to sports performance. Sports Medicine', 'https://doi.org/10.1007/s40279-024-02060-x'),
  ],
};
