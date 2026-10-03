import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'landepunkt',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Die Flugbahn eines Balls, der zum Teil hinter einer Wand verschwindet, vorausahnen und die Landestelle antippen.',
      daily: 'Vorausahnen, wohin sich etwas bewegt, das kurz verdeckt ist: ein Ball im Flug, ein Fahrzeug hinter einer Ecke.',
      research:
        'Im Labor werden vorhersagbare Bewegungen schnell gelernt, und der Blick eilt der Zielbewegung teilweise voraus. Aufholsprünge des Blicks rechnen Position und Tempo des Ziels mit ein. Bei kurz verdeckten Zielen wurde die Blickfolge mit Rückmeldung nach acht bis zehn Sitzungen deutlich genauer als ohne. Diese Studien arbeiteten mit Blickmessung, nicht mit einer Tipp-Aufgabe wie dieser. Ein Nutzen für Sport, Bildschirmspiele oder den Alltag ist nicht belegt.',
      improved:
        'Der Ball fliegt in einer echten Wurfparabel und verschwindet hinter einer Wand; erst wenn er verdeckt ist, tippst du dorthin, wo er landen wird. So muss die Bahn aus Richtung und Tempo vorhergesagt werden, statt nur gesehen zu werden. Danach wird die Wand durchsichtig, und du siehst Landepunkt, Tipp und Abweichung in Prozent der Bildschirmbreite sowie ✓/✗ – diese Rückmeldung gibt dem Üben ein Lernsignal. Verdeckung (40 bis 80 % der Flugzeit), Flugdauer und Bogenhöhe passen sich deinem Ergebnis an. Wohin dein Blick dabei wirklich geht, wird nicht gemessen, nur wo du tippst.',
    },
    it: {
      trains: 'Prevedere la traiettoria di una palla che sparisce in parte dietro un muro e toccare il punto di atterraggio.',
      daily: 'Prevedere dove va qualcosa che è coperto per un attimo: una palla in volo, un veicolo dietro l’angolo.',
      research:
        'In laboratorio i movimenti prevedibili vengono appresi in fretta e lo sguardo anticipa in parte il movimento del bersaglio. Gli scatti di recupero dello sguardo tengono conto di posizione e velocità del bersaglio. Con bersagli coperti per un attimo, l’inseguimento con riscontro è diventato nettamente più preciso dopo otto-dieci sessioni rispetto a senza riscontro. Questi studi usavano la misurazione dello sguardo, non un compito di tocco come questo. Un beneficio per lo sport, i videogiochi o la vita quotidiana non è dimostrato.',
      improved:
        'La palla vola in una vera parabola e sparisce dietro un muro; solo quando è coperta tocchi dove atterrerà. Così la traiettoria deve essere prevista da direzione e velocità, invece di essere solo vista. Poi il muro diventa trasparente e vedi punto di arrivo, tocco e scostamento in percentuale della larghezza dello schermo, oltre a ✓/✗: questo riscontro dà all’esercizio un segnale di apprendimento. Copertura (dal 40 all’80 % del tempo di volo), durata del volo e altezza dell’arco si adattano al tuo risultato. Dove guardi davvero non viene misurato, ma solo dove tocchi.',
    },
  },
  sources: [
    src('Kowler, Rubinstein, Santos & Wang (2019). Predictive smooth pursuit eye movements. Annual Review of Vision Science', 'https://doi.org/10.1146/annurev-vision-091718-014901'),
    src(
      'de Brouwer, Missal, Barnes & Lefèvre (2002). Quantitative analysis of catch-up saccades during sustained pursuit. Journal of Neurophysiology',
      'https://doi.org/10.1152/jn.00621.2001',
    ),
    src(
      'Madelain & Krauzlis (2003). Effects of learning on smooth pursuit during transient disappearance of a visual target. Journal of Neurophysiology',
      'https://doi.org/10.1152/jn.00869.2002',
    ),
    src('Barnes (2008). Cognitive processes involved in smooth pursuit eye movements. Brain and Cognition', 'https://doi.org/10.1016/j.bandc.2008.08.020'),
    src(
      'Fischer & Ramsperger (1984). Human express saccades: Extremely short reaction times of goal directed eye movements. Experimental Brain Research',
      'https://doi.org/10.1007/BF00231145',
    ),
  ],
};
