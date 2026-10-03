import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/604-n-back.md und docs/uebungskatalog/literatur/lit-W08-gedaechtnis.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'rueckblick',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Die letzten Formen im Kopf behalten, bei jeder neuen nachschieben und jedes Mal entscheiden: gleich wie vor N Schritten oder anders?',
      daily: 'Überall, wo man eine Information kurz im Kopf hält und laufend aktualisiert: einer Wegbeschreibung folgen, im Gespräch mitdenken, Namen und Zahlen behalten.',
      research:
        'Die Aufgabe stammt aus der Gedächtnisforschung und wird dort seit Jahrzehnten benutzt. In Trainingsstudien (meist 20 und mehr Sitzungen) wird die geübte Aufgabe deutlich besser, und auch ähnliche N-Back-Varianten gelingen besser. Auf andere Gedächtnisaufgaben überträgt sich das nur wenig, und dass N-Back-Training die allgemeine Intelligenz steigert, ist nicht belegt: Mit aktiven Kontrollgruppen blieb der Effekt aus. Für so kurze Durchgänge wie hier gibt es keine eigenen Studien.',
      improved:
        'Die Übung verwendet sprachneutrale Formen, die sich nur im Umriss unterscheiden, und blendet sie im Abstand von zwei Sekunden weich ein und aus. Sie beginnt bei einem Schritt zurück mit einer kurzen Erklärkarte, die ersten Formen werden nur angeschaut. Ausgewertet wird in Blöcken zu 20 Formen, von denen ein fester Anteil „gleich“ ist; ab zwei Schritten zurück sind gezielte Köder dabei. Nach jedem Block passt sich die Stufe nach oben oder unten an, und der Hauptwert verlangt erkannte Treffer, sodass reines „Anders“-Tippen nicht weiterführt. Zusätzlich werden Trefferquote und Fehlalarme gezeigt. Die zwei großen Tasten tragen Zeichen statt Farben, und es gibt kein rotes Aufblitzen.',
    },
    it: {
      trains: 'Tenere a mente le ultime forme, aggiornarle a ogni nuova forma e decidere ogni volta: uguale a N passi fa oppure diverso?',
      daily: 'Ovunque si tenga un’informazione a mente per poco tempo e la si aggiorni di continuo: seguire un’indicazione stradale, seguire un discorso, ricordare nomi e numeri.',
      research:
        'Il compito proviene dalla ricerca sulla memoria e vi è usato da decenni. Negli studi di allenamento (di solito 20 sedute o più) il compito allenato migliora nettamente, e anche varianti simili di N-back riescono meglio. Su altri compiti di memoria il trasferimento è scarso, e che l’allenamento N-back aumenti l’intelligenza generale non è dimostrato: con gruppi di controllo attivi l’effetto è mancato. Per passaggi brevi come questi non esistono studi specifici.',
      improved:
        'L’esercizio usa forme neutre dal punto di vista linguistico, che si distinguono solo per il contorno, e le fa comparire e scomparire con dissolvenza morbida a intervalli di due secondi. Inizia da un passo indietro con una breve scheda esplicativa; le prime forme si guardano soltanto. La valutazione avviene in blocchi da 20 forme, di cui una quota fissa è «uguale»; da due passi indietro compaiono anche distrattori mirati. Dopo ogni blocco il livello si adatta verso l’alto o verso il basso, e il valore principale richiede riconoscimenti corretti, così toccare sempre «Diverso» non porta avanti. Si mostrano inoltre la quota di riconoscimenti e i falsi allarmi. I due grandi tasti portano simboli invece di colori e non ci sono lampi rossi.',
    },
  },
  sources: [
    src('Kirchner (1958). Age differences in short-term retention of rapidly changing information. Journal of Experimental Psychology', 'https://doi.org/10.1037/h0043688'),
    src('Owen et al. (2010). Putting brain training to the test. Nature', 'https://doi.org/10.1038/nature09042'),
    src('Soveri et al. (2017). Working memory training revisited: A multi-level meta-analysis of n-back training studies. Psychonomic Bulletin & Review', 'https://doi.org/10.3758/s13423-016-1217-0'),
    src('Redick et al. (2013). No evidence of intelligence improvement after working memory training: A randomized, placebo-controlled study. Journal of Experimental Psychology: General', 'https://doi.org/10.1037/a0029082'),
    src('Meule (2017). Reporting and interpreting working memory performance in n-back tasks. Frontiers in Psychology', 'https://doi.org/10.3389/fpsyg.2017.00352'),
  ],
};
