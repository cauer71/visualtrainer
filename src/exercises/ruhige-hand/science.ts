import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/705-steady-hand.md und docs/uebungskatalog/literatur/lit-W09-motorik.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'ruhige-hand',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Langsames, genaues Führen: einen Ball mit dem Finger durch eine schmale, kurvige Bahn lenken, ohne die Wand zu berühren.',
      daily: 'Linien am Tablet nachziehen, Schmales entlangführen, genaues Bedienen von Touch-Oberflächen.',
      research:
        'Wie schnell man entlang einer Bahn fahren kann, hängt von ihrer Breite ab: Je enger und länger die Bahn, desto langsamer muss man sein (Steuerungsgesetz). Mit dem Finger kommt dazu, dass die Hand die Bahn verdeckt und die Fingerposition nur auf etwa einen Millimeter genau ist – deshalb sitzt der Ball hier über dem Finger und die Bahn ist breit genug. Motorische Fertigkeiten verbessern sich mit Übung, bleiben aber eng an die geübte Aufgabe gebunden. Ein Nutzen für den Alltag ist nicht belegt. Was die Hand beim Zittern macht, wird hier weder gemessen noch beurteilt. Zittern, Unsicherheit beim Gehen oder andere neurologische Beschwerden gehören in ärztliche Abklärung; die Übung ist kein Koordinationstest (Muchnick, 2008, S. 28, 30–31).',
      improved:
        'Der Ball sitzt über dem Finger, damit die Hand weder Ball noch Bahn verdeckt; aufgesetzt wird in einem großzügigen Kreis unter dem Ball, und Abheben des Fingers ist eine Pause. Die Bahn hat echte Kurven, ist von Anfang an ganz zu sehen, beginnt breit und wird mit der Stufe enger und kurviger. Berührt der Ball die Wand, gleitet er am Rand entlang und ein weiches Symbol erscheint – ohne Blitz, ohne Wackeln und ohne Rücksprung zum Start. Die Strecke zwischen zwei Bildern wird geprüft, die Wand lässt sich daher nicht überspringen. Es gibt keinen Zeitdruck. Gemessen werden Berührungen und die Zeit auf der Bahn; die Schwierigkeit passt sich nach oben und unten an.',
    },
    it: {
      trains: 'Guida lenta e precisa: condurre una palla con il dito lungo un percorso stretto e tortuoso senza toccare la parete.',
      daily: 'Ripassare linee sul tablet, seguire qualcosa di stretto, usare con precisione le superfici touch.',
      research:
        'La velocità con cui si può seguire un percorso dipende dalla sua larghezza: più il percorso è stretto e lungo, più lentamente bisogna andare (legge dello sterzo). Con il dito si aggiunge che la mano copre il percorso e che la posizione del dito è precisa solo a circa un millimetro – per questo qui la palla sta sopra il dito e il percorso è abbastanza largo. Le abilità motorie migliorano con la pratica, ma restano strettamente legate al compito esercitato. Un beneficio per la vita quotidiana non è dimostrato. Che cosa fa la mano in caso di tremore qui non viene né misurato né valutato. Tremore, insicurezza nel camminare o altri disturbi neurologici vanno chiariti dal medico; l’esercizio non è un test di coordinazione (Muchnick, 2008, pp. 28, 30–31).',
      improved:
        'La palla sta sopra il dito, così la mano non copre né la palla né il percorso; si appoggia il dito in un’area generosa sotto la palla, e sollevare il dito è una pausa. Il percorso ha vere curve, è visibile per intero fin dall’inizio, parte largo e con il livello diventa più stretto e più tortuoso. Se la palla tocca la parete, scivola lungo il bordo e compare un simbolo morbido – senza lampi, senza tremolii e senza ritorno al via. Il tratto tra due immagini viene controllato, perciò la parete non si può saltare. Non c’è pressione di tempo. Si misurano i contatti e il tempo sul percorso; la difficoltà si adatta verso l’alto e verso il basso.',
    },
  },
  sources: [
    src('Accot & Zhai (1997). Beyond Fitts’ law: Models for trajectory-based HCI tasks. CHI ’97', 'https://doi.org/10.1145/258549.258760'),
    src('Vogel & Baudisch (2007). Shift: A technique for operating pen-based interfaces using touch. CHI ’07', 'https://doi.org/10.1145/1240624.1240727'),
    src('Bi, Li & Zhai (2013). FFitts law: Modeling finger touch with Fitts’ law. CHI ’13', 'https://doi.org/10.1145/2470654.2466180'),
    src('Findlater et al. (2013). Age-related differences in performance with touchscreens compared to traditional mouse input. CHI ’13', 'https://doi.org/10.1145/2470654.2470703'),
    src('Guadagnoli & Lee (2004). Challenge point: A framework for conceptualizing the effects of various practice conditions in motor learning. Journal of Motor Behavior', 'https://doi.org/10.3200/JMBR.36.2.212-224'),
    src('Karni et al. (1995). Functional MRI evidence for adult motor cortex plasticity during motor skill learning. Nature', 'https://doi.org/10.1038/377155a0'),
    src('Muchnick BG (2008). Clinical Medicine in Optometric Practice. 2nd ed. Mosby/Elsevier. S. 28, 30–31', 'https://openlibrary.org/isbn/9780323029612'),
  ],
};
