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
        'Ein neu auftauchendes Objekt zieht die Aufmerksamkeit von selbst an, und bei Suchaufgaben mit mehreren Zielen unterlaufen nach einem gefundenen Ziel leichter Fehler bei den übrigen. Die Bewegungszeit zum Antippen steigt mit dem Weg und sinkt mit der Zielgröße (Fitts’sches Gesetz). In Studien werden Zeige- und Antippaufgaben mit Übung deutlich besser – ein großer Teil davon ist Gewöhnung an Gerät und Aufgabe. Für genau diese Übung gibt es keine Studie; ein Nutzen für Sport, Straßenverkehr oder Alltag ist nicht belegt. Vergleiche dich nur mit dir selbst auf demselben Gerät; einzelne Werte streuen, aussagekräftiger sind der Median über viele Kreise und der Verlauf über mehrere Sitzungen. Die Übung prüft das Gesichtsfeld nicht: Ausfälle können unbemerkt bleiben und gehören augenärztlich untersucht.',
      improved:
        'Jeder Kreis trägt einen Ring, der seine Restzeit anzeigt; so ist „Was ist dringend?“ eine Entscheidung nach Sicht und keine Gedächtnisaufgabe. Wie viele Kreise gleichzeitig liegen (zwei bis fünf), wie groß sie sind und wie viel Zeit jeder bekommt, richtet sich nach der Stufe; sie steigt nach drei Treffern in Folge und sinkt nach einem Fehler, nicht nach Punkten. Die Sitzung dauert eine feste Minute. Ein danebengesetzter Tipp wird mit einem weichen Symbol markiert, ohne Blitz und ohne Wackeln; die Kreise tragen verschiedene Zeichen statt nur Farbe, und die Trefferflächen sind größer als die sichtbaren Kreise. Gemessen wird der Abstand zwischen zwei Treffern (Median), keine Reaktionszeit, weil die Wahl der Reihenfolge darin steckt.',
    },
    it: {
      trains: 'Tenere d’occhio più bersagli visibili contemporaneamente, scegliere da sé l’ordine e toccarli uno dopo l’altro prima che il loro tempo scada.',
      daily: 'Tenere d’occhio più cose insieme e decidere cosa viene prima – per esempio mentre si cucina, nelle faccende di casa o giocando con i bambini.',
      research:
        'Un oggetto che compare di nuovo attira da solo l’attenzione e, nei compiti di ricerca con più bersagli, dopo aver trovato un bersaglio si sbaglia più facilmente con gli altri. Il tempo di movimento per toccare cresce con la distanza e diminuisce con la grandezza del bersaglio (legge di Fitts). Negli studi i compiti di puntamento e di tocco migliorano nettamente con l’esercizio – in gran parte è abitudine al dispositivo e al compito. Per questo esercizio non esiste uno studio; un’utilità per sport, traffico o vita quotidiana non è dimostrata. Confrontati solo con te stesso sullo stesso dispositivo; i singoli valori oscillano, sono più significativi la mediana su molti cerchi e l’andamento su più sessioni. L’esercizio non esamina il campo visivo: eventuali difetti possono passare inosservati e vanno fatti valutare da un oculista.',
      improved:
        'Ogni cerchio ha un anello che mostra il suo tempo residuo: così «cosa è urgente?» è una decisione presa a colpo d’occhio e non un compito di memoria. Quanti cerchi sono presenti contemporaneamente (da due a cinque), quanto sono grandi e quanto tempo ha ciascuno dipende dal livello; questo sale dopo tre colpi riusciti di fila e scende dopo un errore, non in base ai punti. La sessione dura un minuto fisso. Un tocco accanto ai cerchi è segnalato con un simbolo delicato, senza lampi e senza scosse; i cerchi portano segni diversi invece del solo colore e le aree di tocco sono più grandi dei cerchi visibili. Si misura l’intervallo tra due colpi (mediana), non un tempo di reazione, perché la scelta dell’ordine ne fa parte.',
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
    src('Muchnick (2008). Clinical Medicine in Optometric Practice (2nd ed.). Mosby/Elsevier, S. 5, 32', 'https://openlibrary.org/isbn/9780323029612'),
    src('Mountford, Ruston & Dave (2004). Orthokeratology: Principles and Practice. Butterworth-Heinemann, S. 43–44', 'https://openlibrary.org/isbn/9780750640077'),
  ],
};
