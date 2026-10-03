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
        'Weil die Hand nach etwa 110 bis 200 Millisekunden auf ein bewegtes Ziel reagiert, gelingt genaues Folgen nur mit Vorausschätzen; bei glatten, vorhersagbaren Bahnen geht das gut. Manuelles Nachführen verläuft in kleinen Korrekturschüben. Mit Übung wird man in der geübten Aufgabe besser; Actionspiele verbesserten in einer Studie eine Labor-Nachführaufgabe, für solche Übungen selbst gibt es keine Studie. Ein Nutzen für Konzentration, „Flow“ oder Arbeit ist nicht belegt, Videospiel-Training zeigt in Übersichtsarbeiten keinen Ferntransfer. Gemessen wird die Fingerposition gegen das Ziel, nicht der Blick.',
      improved:
        'Die Bahn ist wirklich glatt: Das Ziel läuft ohne Halt und ohne Knick auf einer geschlossenen Kurve (Lissajous-Figur) und startet sanft aus dem Stand. Ein Stück der Bahn voraus ist gestrichelt zu sehen, damit sich die Bewegung vorausplanen lässt; die Vorschau wird mit der Stufe kürzer, und jeder Durchgang hat eine andere Phasenlage und damit eine andere Kurve. Gewertet wird die Zeit im Ring um das Ziel (mindestens 60 % im Ring gelten als gelungen) bei fester Dauer je Durchgang und ohne Zeitbonus; das Ziel bewegt sich nach der Uhr, nicht nach der Bildzahl, sodass 60- und 120-Hz-Geräte gleich laufen. Tempo und Bahnform (von einfachen bis zu verschlungenen Kurven) passen sich nach oben und unten an; „Flow“ wird weder versprochen noch gemessen.',
    },
    it: {
      trains: 'Inseguimento con la mano: seguire con il dito un bersaglio su percorsi a curve morbide che non si ferma mai e tenere il segno nell’anello.',
      daily: 'Seguire con il dito un movimento che scivola, ripassare curve, pianificare la mano in anticipo invece di rincorrere.',
      research:
        'Poiché la mano reagisce a un bersaglio in movimento dopo circa 110–200 millisecondi, un inseguimento preciso riesce solo stimando in anticipo; con percorsi lisci e prevedibili è possibile. L’inseguimento manuale procede a piccoli scatti di correzione. Con la pratica si migliora nel compito esercitato; in uno studio i videogiochi d’azione hanno migliorato un compito di inseguimento in laboratorio, per questi esercizi in sé non esistono studi. Un beneficio per concentrazione, «flow» o lavoro non è dimostrato; le rassegne non trovano un trasferimento a distanza dall’allenamento con videogiochi. Si misura la posizione del dito rispetto al bersaglio, non lo sguardo.',
      improved:
        'Il percorso è davvero liscio: il bersaglio corre senza soste e senza spigoli su una curva chiusa (figura di Lissajous) e parte dolcemente da fermo. Un pezzo del percorso davanti è tratteggiato, così il movimento si può pianificare in anticipo; l’anteprima si accorcia con il livello e ogni turno ha una fase diversa e quindi una curva diversa. Si valuta il tempo nell’anello attorno al bersaglio (almeno il 60 % nell’anello vale come riuscito), con durata fissa per turno e senza bonus di tempo; il bersaglio si muove in base all’orologio, non al numero di immagini, quindi i dispositivi a 60 e 120 Hz si comportano allo stesso modo. Velocità e forma del percorso (da curve semplici a curve intrecciate) si adattano verso l’alto e verso il basso; il «flow» non viene né promesso né misurato.',
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
