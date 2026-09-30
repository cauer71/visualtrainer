import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/805-reaction-chain.md und docs/uebungskatalog/literatur/lit-W10-koerper-a.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'in-die-bahn',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Vorausdenken am Ort: Ein Ziel läuft mehrmals über dieselbe Bahn; der Finger wird vorab auf einen Punkt der Bahn gesetzt und liegen gelassen, bis das Ziel vorbeiläuft.',
      daily: 'Dorthin greifen, wo etwas gleich sein wird – etwas auffangen, Ballspiele, genaues Tippen am Tablet.',
      research:
        'Beim Abfangen bewegter Ziele ist es oft günstiger, den Ort anzupassen als den Zeitpunkt: Menschen sind zeitlich sehr präzise, wenn sie frei wählen dürfen, wo sie das Ziel treffen. Für bewegte Ziele gilt Fitts’ Gesetz nur eingeschränkt, eine Abwandlung mit der Zielgeschwindigkeit passt besser. Aufgaben am Bildschirm werden mit Übung besser, ein großer Teil davon ist Gewöhnung an Aufgabe und Gerät; ein dreiwöchiges, anpassendes Hemmungstraining (Stoppen einer geplanten Bewegung) war in einer Studie einer aktiven Kontrollgruppe nicht überlegen. Zu dieser Übung gibt es keine Studie, und ein Nutzen für Sport oder Alltag ist nicht belegt. Wohin deine Augen schauen, wird hier nicht gemessen – nur, wo du den Finger hinsetzt.',
      improved:
        'Für den Finger gebaut: Tippen und liegen lassen statt Maus mit Zeigersperre; Stillhalten heißt hier „Finger bleibt auf der Stelle“. Entschieden wird über die Zeit und den Abstand zur Bahn statt über die Verschiebung pro Bild – damit gleich auf 60- und 120-Hz-Geräten. Erst ein Durchlauf zum Zuschauen, dann der Fangdurchlauf; die Durchlaufzeit in Sekunden ist die Stufe (Hoch- und Querformat fordern gleich viel), Schwierigkeit in beide Richtungen angepasst. Keine Zeitstrafe, kein roter Blitz, kein Wackeln; ein zu spätes Tippen wird nicht als Fehlmessung gewertet. Gemessen wird der Abstand zum Durchlaufpunkt in Prozent, und danach siehst du, wo das Ziel vorbeilief.',
    },
    it: {
      trains: 'Prevedere sul posto: un bersaglio percorre più volte la stessa traiettoria; il dito viene messo in anticipo su un punto della traiettoria e lasciato lì finché il bersaglio passa.',
      daily: 'Afferrare dove qualcosa sarà tra poco – prendere qualcosa al volo, giochi con la palla, toccare con precisione sul tablet.',
      research:
        'Nell’intercettare bersagli in movimento spesso conviene adattare il luogo anziché il momento: le persone sono molto precise nei tempi quando possono scegliere liberamente dove colpire il bersaglio. Per i bersagli in movimento la legge di Fitts vale solo in parte; una variante con la velocità del bersaglio si adatta meglio. I compiti sullo schermo migliorano con l’esercizio, in gran parte per abitudine al compito e al dispositivo; un allenamento inibitorio adattivo di tre settimane (fermare un movimento pianificato) in uno studio non era superiore a un gruppo di controllo attivo. Su questo esercizio non esiste alcuno studio e un beneficio per lo sport o la vita quotidiana non è dimostrato. Dove guardi con gli occhi qui non viene misurato – solo dove metti il dito.',
      improved:
        'Pensato per il dito: toccare e lasciare il dito invece del mouse con blocco del puntatore; stare fermi significa qui “il dito resta dov’è”. Si decide in base al tempo e alla distanza dalla traiettoria invece che allo spostamento per immagine – quindi uguale su schermi a 60 e 120 Hz. Prima un passaggio per guardare, poi quello da intercettare; il tempo di percorrenza in secondi è il livello (formato verticale e orizzontale richiedono lo stesso impegno), difficoltà adattata in entrambe le direzioni. Niente penalità di tempo, niente lampo rosso né scosse; un tocco troppo tardi non viene contato come errore di misura. Si misura la distanza dal punto di passaggio in percentuale e poi vedi dove è passato il bersaglio.',
    },
  },
  sources: [
    src('Brenner & Smeets (2015). How people achieve their amazing temporal precision in interception. Journal of Vision', 'https://doi.org/10.1167/15.3.8'),
    src('Mrotek & Soechting (2007). Target interception: Hand–eye coordination and strategies. The Journal of Neuroscience', 'https://doi.org/10.1523/JNEUROSCI.2046-07.2007'),
    src('Hoffmann (1991). Capture of moving targets: A modification of Fitts’ law. Ergonomics', 'https://doi.org/10.1080/00140139108967307'),
    src('MacKenzie, Kauppinen & Silfverberg (2001). Accuracy measures for evaluating computer pointing devices. Proceedings of CHI ’01', 'https://doi.org/10.1145/365024.365028'),
    src('Enge et al. (2014). No evidence for true training and transfer effects after inhibitory control training in young healthy adults. Journal of Experimental Psychology: Learning, Memory, and Cognition', 'https://doi.org/10.1037/a0036165'),
    src('Guo et al. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
  ],
};
