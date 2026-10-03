import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/802-drop-catch.md und docs/uebungskatalog/literatur/lit-W10-koerper-a.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'kugeln-fangen',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Schnell entscheiden, ob zugegriffen wird: fallende Kreise antippen und Quadrate durchlassen – erkannt allein an der Form.',
      daily: 'Zugreifen oder lieber nicht: etwas Fallendes auffangen, bei anderem die Hand zurückhalten; Ballspiele, Spiele mit Kindern.',
      research:
        'Die Aufgabe entspricht dem „Go/No-Go“-Format: Bei Kreisen tippen, bei Quadraten nicht. Damit das Nicht-Tippen eine echte Entscheidung bleibt, sollte die Durchlass-Form seltener kommen als die Tipp-Form; ein Anteil von etwa einem Fünftel bis einem Drittel wird in der Fachliteratur als günstig beschrieben. Ein dreiwöchiges, anpassendes Hemmungstraining war in einer Studie mit 122 jungen Erwachsenen einer aktiven Kontrollgruppe nicht überlegen. Nach intensivem Baseballtraining verbesserte sich die Go/No-Go-Reaktionszeit, die einfache Reaktionszeit aber nicht – der umgekehrte Weg (Bildschirmspiel verbessert Sport) ist nicht gezeigt. In Bildschirmaufgaben wird man mit Übung besser; ein großer Teil davon ist Gewöhnung an Aufgabe und Gerät. Ein Nutzen für Alltag oder Sport ist nicht belegt.',
      improved:
        'Kreise werden angetippt, Quadrate lässt man durch; beide haben dieselbe Farbe und Helligkeit und unterscheiden sich nur durch die Form, damit die Aufgabe auch bei Farbschwäche eindeutig ist. Der Anteil der Quadrate bleibt zwischen einem Fünftel und einem Drittel, damit das Durchlassen eine echte Entscheidung bleibt, und es kommen nie mehr als zwei Quadrate hintereinander. Die Fallzeit ist in Sekunden vorgegeben, der Fall gleichmäßig; Hoch- und Querformat fordern gleich viel, und 60- und 120-Hz-Geräte sind gleich schnell. Mit der Stufe fallen die Formen schneller und dichter, die Schwierigkeit passt sich nach oben und unten an. Die Sitzung hat eine feste Dauer, ein Tipp ins Leere wird nicht bestraft, es gibt keinen Blitz und kein Wackeln. Gemessen werden die Fangquote und die angetippten Quadrate – keine Reaktionszeit.',
    },
    it: {
      trains: 'Decidere in fretta se afferrare: toccare i cerchi che cadono e lasciar passare i quadrati – riconosciuti solo dalla forma.',
      daily: 'Afferrare o meglio di no: prendere qualcosa che cade, trattenere la mano in altri casi; giochi con la palla, giocare con i bambini.',
      research:
        'Il compito corrisponde al formato “Go/No-Go”: toccare con i cerchi, non con i quadrati. Perché il non toccare resti una vera decisione, la forma da lasciar passare dovrebbe comparire meno spesso di quella da toccare; una quota da circa un quinto a un terzo è descritta in letteratura come favorevole. Un allenamento inibitorio adattivo di tre settimane, in uno studio con 122 giovani adulti, non era superiore a un gruppo di controllo attivo. Dopo un intenso allenamento di baseball è migliorato il tempo di reazione Go/No-Go, ma non quello semplice – il percorso inverso (un gioco sullo schermo migliora lo sport) non è dimostrato. Nei compiti sullo schermo si migliora con l’esercizio; in gran parte si tratta di abitudine al compito e al dispositivo. Un beneficio per la vita quotidiana o lo sport non è dimostrato.',
      improved:
        'I cerchi si toccano, i quadrati si lasciano passare; hanno lo stesso colore e la stessa luminosità e si distinguono solo per la forma, così il compito è chiaro anche con debolezza cromatica. La quota di quadrati resta tra un quinto e un terzo, perché lasciar passare resti una vera decisione, e non compaiono mai più di due quadrati di fila. Il tempo di caduta è dato in secondi e la caduta è uniforme; formato verticale e orizzontale richiedono lo stesso impegno, e gli schermi a 60 e 120 Hz sono ugualmente veloci. Con il livello le forme cadono più veloci e più fitte, la difficoltà si adatta verso l’alto e verso il basso. La sessione ha una durata fissa, un tocco a vuoto non viene penalizzato, non ci sono lampi né scosse. Si misurano la percentuale di prese e i quadrati toccati – nessun tempo di reazione.',
    },
  },
  sources: [
    src('Gomez, Ratcliff & Perea (2007). A model of the go/no-go task. Journal of Experimental Psychology: General', 'https://doi.org/10.1037/0096-3445.136.3.389'),
    src('Wessel (2018). Prepotent motor activity and inhibitory control demands in different variants of the go/no-go paradigm. Psychophysiology', 'https://doi.org/10.1111/psyp.12871'),
    src('Young, Sutherland & McCoy (2018). Optimal go/no-go ratios to maximize false alarms. Behavior Research Methods', 'https://doi.org/10.3758/s13428-017-0923-5'),
    src('Enge et al. (2014). No evidence for true training and transfer effects after inhibitory control training in young healthy adults. Journal of Experimental Psychology: Learning, Memory, and Cognition', 'https://doi.org/10.1037/a0036165'),
    src('Kida, Oda & Matsumura (2005). Intensive baseball practice improves the Go/Nogo reaction time, but not the simple reaction time. Cognitive Brain Research', 'https://doi.org/10.1016/j.cogbrainres.2004.09.003'),
    src('Guo et al. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
  ],
};
