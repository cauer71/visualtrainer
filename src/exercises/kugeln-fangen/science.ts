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
        'Für den Finger gebaut: Tippen statt Maus mit Zeigersperre, große Trefferfläche. Kreis und Quadrat unterscheiden sich nur durch die Form (gleiche Farbe und Helligkeit), damit es auch bei Farbschwäche eindeutig ist. Quadrat-Anteil nur zwischen einem Fünftel und einem Drittel statt bis fast zur Hälfte, nie mehr als zwei Quadrate hintereinander. Fallzeit in Sekunden statt Pixeln pro Sekunde (Hoch- und Querformat fordern gleich viel, 60- und 120-Hz-Geräte sind gleich schnell), Schwierigkeit in beide Richtungen angepasst. Feste Dauer ohne Zeitbonus und Zeitstrafe, kein roter Blitz, kein Wackeln; ein Tipp ins Leere wird nicht bestraft. Gemessen werden Fangquote und angetippte Quadrate – keine Reaktionszeit.',
    },
    it: {
      trains: 'Decidere in fretta se afferrare: toccare i cerchi che cadono e lasciar passare i quadrati – riconosciuti solo dalla forma.',
      daily: 'Afferrare o meglio di no: prendere qualcosa che cade, trattenere la mano in altri casi; giochi con la palla, giocare con i bambini.',
      research:
        'Il compito corrisponde al formato “Go/No-Go”: toccare con i cerchi, non con i quadrati. Perché il non toccare resti una vera decisione, la forma da lasciar passare dovrebbe comparire meno spesso di quella da toccare; una quota da circa un quinto a un terzo è descritta in letteratura come favorevole. Un allenamento inibitorio adattivo di tre settimane, in uno studio con 122 giovani adulti, non era superiore a un gruppo di controllo attivo. Dopo un intenso allenamento di baseball è migliorato il tempo di reazione Go/No-Go, ma non quello semplice – il percorso inverso (un gioco sullo schermo migliora lo sport) non è dimostrato. Nei compiti sullo schermo si migliora con l’esercizio; in gran parte si tratta di abitudine al compito e al dispositivo. Un beneficio per la vita quotidiana o lo sport non è dimostrato.',
      improved:
        'Pensato per il dito: toccare invece del mouse con blocco del puntatore, area di tocco ampia. Cerchio e quadrato si distinguono solo per la forma (stesso colore e luminosità), così è chiaro anche con debolezza cromatica. Quota di quadrati solo tra un quinto e un terzo invece di quasi la metà, mai più di due quadrati di fila. Tempo di caduta in secondi invece di pixel al secondo (formato verticale e orizzontale richiedono lo stesso impegno, schermi a 60 e 120 Hz ugualmente veloci), difficoltà adattata in entrambe le direzioni. Durata fissa senza bonus né penalità di tempo, niente lampo rosso né scosse; un tocco a vuoto non viene penalizzato. Si misurano la percentuale di prese e i quadrati toccati – nessun tempo di reazione.',
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
