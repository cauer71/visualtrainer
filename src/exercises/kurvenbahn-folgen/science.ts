import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/507-flow-state.md und docs/uebungskatalog/literatur/lit-W06-fps-a.md, lit-W07-fps-b.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'kurvenbahn-folgen',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Nachführen mit der Hand: einem Ziel auf weichen Kurvenbahnen, das nie anhält, mit dem Finger folgen und die Marke im Ring halten.',
      daily: 'Mit dem Finger einer gleitenden Bewegung folgen, Kurven nachfahren, die Hand vorausplanen statt hinterherlaufen.',
      research:
        'Weil die Hand nach etwa 110 bis 200 Millisekunden auf ein bewegtes Ziel reagiert, gelingt genaues Folgen nur mit Vorausschätzen; bei glatten, vorhersagbaren Bahnen geht das gut. Manuelles Nachführen verläuft in kleinen Korrekturschüben. Mit Übung wird man in der geübten Aufgabe besser; Actionspiele verbesserten in einer Studie eine Labor-Nachführaufgabe, für solche Drills selbst gibt es keine Studie. Ein Nutzen für Konzentration, „Flow“ oder Arbeit ist nicht belegt, Videospiel-Training zeigt in Übersichtsarbeiten keinen Ferntransfer. Gemessen wird die Fingerposition gegen das Ziel, nicht der Blick.',
      improved:
        'Das Vorbild ist ein Maus-Drill mit Bahnstücken mit Knicken, Combo-Multiplikator, Zeitbonus und einem Level, das nur steigt. Hier: wirklich glatte Bahn ohne Halt und ohne Knick (Lissajous-Kurve, sanfter Start); ein Stück der Bahn voraus ist gestrichelt zu sehen; die Bahn hat in jedem Durchgang eine andere Phasenlage; gemessen wird die Zeit im Ring statt einer Serie; feste Dauer je Durchgang ohne Zeitbonus; das Ziel bewegt sich nach Zeit, nicht nach Bildzahl (60- und 120-Hz-Geräte gleich). Tempo und Bahnform (einfacher bis verschlungener) passen sich nach oben und unten an. „Flow“ wird weder versprochen noch gemessen.',
    },
    it: {
      trains: 'Inseguimento con la mano: seguire con il dito un bersaglio su percorsi a curve morbide che non si ferma mai e tenere il segno nell’anello.',
      daily: 'Seguire con il dito un movimento che scivola, ripassare curve, pianificare la mano in anticipo invece di rincorrere.',
      research:
        'Poiché la mano reagisce a un bersaglio in movimento dopo circa 110–200 millisecondi, un inseguimento preciso riesce solo stimando in anticipo; con percorsi lisci e prevedibili è possibile. L’inseguimento manuale procede a piccoli scatti di correzione. Con la pratica si migliora nel compito esercitato; in uno studio i videogiochi d’azione hanno migliorato un compito di inseguimento in laboratorio, per questi esercizi in sé non esistono studi. Un beneficio per concentrazione, «flow» o lavoro non è dimostrato; le rassegne non trovano un trasferimento a distanza dall’allenamento con videogiochi. Si misura la posizione del dito rispetto al bersaglio, non lo sguardo.',
      improved:
        'Il modello è un esercizio con il mouse con tratti a spigolo, moltiplicatore di combo, bonus di tempo e un livello che può solo salire. Qui: percorso davvero liscio, senza soste e senza spigoli (curva di Lissajous, partenza morbida); un pezzo del percorso davanti è tratteggiato; in ogni turno il percorso ha una fase diversa; si misura il tempo nell’anello invece di una serie; durata fissa per turno senza bonus di tempo; il bersaglio si muove in base al tempo, non al numero di immagini (uguale su dispositivi a 60 e 120 Hz). Velocità e forma del percorso (da più semplice a più intrecciato) si adattano verso l’alto e verso il basso. Il «flow» non viene né promesso né misurato.',
    },
  },
  sources: [
    src('Miall, Weir & Stein (1993). Intermittency in human manual tracking tasks. Journal of Motor Behavior', 'https://doi.org/10.1080/00222895.1993.9941639'),
    src('Brenner & Smeets (1997). Fast responses of the human hand to changes in target position. Journal of Motor Behavior', 'https://doi.org/10.1080/00222899709600017'),
    src('Kowler et al. (2019). Predictive smooth pursuit eye movements. Annual Review of Vision Science', 'https://doi.org/10.1146/annurev-vision-091718-014901'),
    src('Gauthier et al. (1988). Oculo-manual tracking of visual targets: Control learning, coordination control and coordination model. Experimental Brain Research', 'https://doi.org/10.1007/BF00279667'),
    src('Wilson et al. (2019). The Eighty Five Percent Rule for optimal learning. Nature Communications', 'https://doi.org/10.1038/s41467-019-12552-4'),
    src('Sala, Tatlidil & Gobet (2018). Video game training does not enhance cognitive ability: A comprehensive meta-analytic investigation. Psychological Bulletin', 'https://doi.org/10.1037/bul0000139'),
    src('Fong, Zaleski & Leach (2015). The challenge–skill balance and antecedents of flow: A meta-analytic investigation. The Journal of Positive Psychology', 'https://doi.org/10.1080/17439760.2014.967799'),
  ],
};
