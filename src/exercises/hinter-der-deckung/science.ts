import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'hinter-der-deckung',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Ein kurz hinter einer Deckung auftauchendes Ziel an wechselnden Orten entdecken und gezielt antippen, bevor es wieder verschwindet.',
      daily: 'Umschauen, wenn etwas kurz hinter einer Kante oder einem Hindernis auftaucht; Ballspiele; schnelle Auswahl auf dem Bildschirm.',
      research:
        'Ein plötzlich erscheinendes Objekt zieht die Aufmerksamkeit von selbst an; der Blick springt meist zuerst zum Ziel (nach etwa 180 ms bei jungen Erwachsenen), die Hand folgt dem Auge rund 100 ms später. Weiß man, wo das Ziel wahrscheinlich erscheint, geht es schneller – ein Ortswechsel kostet dagegen Zeit. Mit der Zahl der möglichen Orte steigt die Reaktionszeit beim direkten Zeigen kaum. In Studien werden Zeige- und Reaktionsaufgaben mit Übung deutlich besser – ein großer Teil davon ist Gewöhnung an Gerät und Aufgabe. Für genau diese Übung gibt es keine Studie; ein Nutzen für Sport, Straßenverkehr oder Alltag ist nicht belegt. Vergleiche dich nur mit dir selbst auf demselben Gerät.',
      improved:
        'Das Ziel schiebt sich weich hinter der Kante hervor und zieht sich zurück (kein Blitzen, kein Rot), die Deckungen haben wechselnde Form und Lage, und die Stufe regelt, wie lange das Ziel zu sehen ist und wie oft der Ort wechselt. Ein Fehler wird mit Symbol und Hinweis auf den richtigen Ort gezeigt, Tipps, die geraten sein müssen (zu früh), zählen nicht, die Trefferflächen sind groß, und der Median ersetzt den Mittelwert. Das Ergebnis vergleicht dich nur mit dir selbst.',
    },
    it: {
      trains: 'Scoprire in luoghi diversi un bersaglio che spunta per poco da dietro un riparo e toccarlo con precisione prima che sparisca di nuovo.',
      daily: 'Guardarsi intorno quando qualcosa compare per poco dietro uno spigolo o un ostacolo; giochi con la palla; scelta rapida sullo schermo.',
      research:
        'Un oggetto che compare all’improvviso attira da solo l’attenzione; lo sguardo salta di solito per primo sul bersaglio (dopo circa 180 ms nei giovani adulti) e la mano segue l’occhio circa 100 ms dopo. Se si sa dove il bersaglio comparirà probabilmente, si è più veloci – un cambio di posto costa invece tempo. Con più posizioni possibili il tempo di reazione nel puntamento diretto cresce poco. Negli studi i compiti di puntamento e di reazione migliorano nettamente con l’esercizio – in gran parte è abitudine al dispositivo e al compito. Per questo esercizio non esiste uno studio; un’utilità per sport, traffico o vita quotidiana non è dimostrata. Confrontati solo con te stesso sullo stesso dispositivo.',
      improved:
        'Il bersaglio esce dolcemente da dietro lo spigolo e si ritira (nessun lampo, nessun rosso), i ripari hanno forma e posizione diverse e il livello regola per quanto tempo il bersaglio si vede e quanto spesso cambia posto. Un errore viene mostrato con un simbolo e l’indicazione del punto giusto, i tocchi troppo presto per non essere casuali non contano, le aree di tocco sono grandi e la mediana sostituisce la media. Il risultato ti confronta solo con te stesso.',
    },
  },
  sources: [
    src('Yantis & Jonides (1984). Abrupt visual onsets and selective attention: Evidence from visual search. Journal of Experimental Psychology: Human Perception and Performance', 'https://doi.org/10.1037/0096-1523.10.5.601'),
    src('Posner, Snyder & Davidson (1980). Attention and the detection of signals. Journal of Experimental Psychology: General', 'https://doi.org/10.1037/0096-3445.109.2.160'),
    src('Kveraga, Boucher & Hughes (2002). Saccades operate in violation of Hick’s law. Experimental Brain Research', 'https://doi.org/10.1007/s00221-002-1168-8'),
    src('Bargary, Bosten, Goodbourn, Lawrance-Owen, Hogg & Mollon (2017). Individual differences in human eye movements: An oculomotor signature? Vision Research', 'https://doi.org/10.1016/j.visres.2017.03.001'),
    src('Prablanc, Echallier, Komilis & Jeannerod (1979). Optimal response of eye and hand motor systems in pointing at a visual target. I. Biological Cybernetics', 'https://doi.org/10.1007/BF00337436'),
    src('Fitts (1954). The information capacity of the human motor system in controlling the amplitude of movement. Journal of Experimental Psychology', 'https://doi.org/10.1037/h0055392'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
    src('Fransen (2024). There is no supporting evidence for a far transfer of general perceptual or cognitive training to sports performance. Sports Medicine', 'https://doi.org/10.1007/s40279-024-02060-x'),
  ],
};
