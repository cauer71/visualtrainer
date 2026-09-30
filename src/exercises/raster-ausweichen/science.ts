import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/806-dynamic-grid-evasion.md und docs/uebungskatalog/literatur/lit-W11-koerper-b.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'raster-ausweichen',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Unter einer Frist erkennen, welche Felder eines 3×3-Rasters besetzt werden, und rechtzeitig ein freies Feld antippen.',
      daily: 'Überall, wo man schnell eine freie Stelle wählt: eine Lücke im Gedränge, eine freie Spur, ein freier Platz, eine freie Taste.',
      research:
        'Hinweisreize am richtigen Ort beschleunigen die Antwort, am falschen verlangsamen sie, auch ohne Blickbewegung. Gesucht ist hier das Feld ohne Markierung; ein fehlendes Merkmal wird weniger leicht gefunden als ein vorhandenes. Liegen Reiz und Antwort räumlich eng beieinander, kostet eine zusätzliche Auswahl kaum Zeit, und mit Übung flacht dieser Zusammenhang weiter ab. Gemessene Zeiten am Touchscreen enthalten Verzögerungen des Geräts. Für diese Übung gibt es keine eigene Studie; ein Nutzen für Sport, Spiele oder den Alltag ist nicht belegt.',
      improved:
        'Das Original ist ein Maus-Spiel mit pulsierender Warnung, roter Explosion, rotem Vollbild-Blitz, Wackeln und Zeitbonus. Hier steht ehrlich, dass du mit dem Finger am Bildschirm tippst und dass es kein Reaktionstest ist. Besetzte Felder sind mit Schraffur und Raute markiert, nicht nur mit Farbe, und pulsieren sanft mit höchstens zwei Schwankungen pro Sekunde; später werden sie ruhig grau „belegt“. Dein eigenes Feld ist immer dabei, damit du wechseln musst. Kein Rot, kein Blitz, kein Wackeln; Rückmeldung mit ✓/✗. Jede Welle läuft bis zum Ende der Wartezeit, ein früher Tipp bringt keinen Bonus. Wartezeit und Zahl der besetzten Felder passen sich an. Die gemessene Zeit enthält die Verzögerung des Touchscreens und ist nur im Vergleich mit dir selbst auf diesem Gerät sinnvoll.',
    },
    it: {
      trains: 'Riconoscere sotto una scadenza quali riquadri di una griglia 3×3 verranno occupati e toccare in tempo un riquadro libero.',
      daily: 'Ovunque si scelga in fretta un posto libero: un varco tra la folla, una corsia libera, un posto libero, un tasto libero.',
      research:
        'Gli indizi nel posto giusto accelerano la risposta, nel posto sbagliato la rallentano, anche senza movimento degli occhi. Qui si cerca il riquadro senza segno; una caratteristica mancante si trova meno facilmente di una presente. Se stimolo e risposta sono vicini nello spazio, una scelta in più costa poco tempo, e con l’esercizio questo rapporto si appiattisce ancora. I tempi misurati su touchscreen includono ritardi del dispositivo. Per questo esercizio non esiste uno studio specifico; un beneficio per sport, giochi o vita quotidiana non è dimostrato.',
      improved:
        'L’originale è un gioco con il mouse con avviso pulsante, esplosione rossa, lampo rosso a schermo intero, scosse e bonus di tempo. Qui è chiaro che tocchi con il dito sullo schermo e che non è un test di reazione. I riquadri occupati sono segnati con tratteggio e rombo, non solo con il colore, e pulsano dolcemente al massimo due volte al secondo; poi diventano «occupati» in un grigio calmo. Il tuo riquadro è sempre incluso, così devi cambiare. Nessun rosso, nessun lampo, nessuna scossa; riscontro con ✓/✗. Ogni ondata dura fino alla fine del tempo di attesa, un tocco anticipato non dà bonus. Tempo di attesa e numero di riquadri occupati si adattano. Il tempo misurato include il ritardo dello schermo tattile ed è significativo solo nel confronto con te stesso su questo dispositivo.',
    },
  },
  sources: [
    src('Posner (1980). Orienting of attention. Quarterly Journal of Experimental Psychology', 'https://doi.org/10.1080/00335558008248231'),
    src('Treisman & Souther (1985). Search asymmetry: A diagnostic for preattentive processing of separable features. Journal of Experimental Psychology: General', 'https://doi.org/10.1037/0096-3445.114.3.285'),
    src("Proctor & Schneider (2018). Hick's law for choice reaction time: A review. Quarterly Journal of Experimental Psychology", 'https://doi.org/10.1080/17470218.2017.1322622'),
    src('Pronk, Wiers, Molenkamp & Murre (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
    src('Woods, Wyma, Yund, Herron & Reed (2015). Factors influencing the latency of simple reaction time. Frontiers in Human Neuroscience', 'https://doi.org/10.3389/fnhum.2015.00131'),
  ],
};
