import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'zwei-ziele',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Den Blick in der Mitte lassen und trotzdem bemerken, auf welcher Seite sich eine von zwei bis vier Kugeln kurz anders bewegt.',
      daily: 'Nach vorn schauen und links und rechts mitbekommen, was passiert: im Straßenverkehr, im Gedränge, beim Mannschaftsspiel.',
      research:
        'Aufmerksamkeit lässt sich auf mehrere Orte gleichzeitig verteilen, auch ohne hinzuschauen. Bewegung wird im seitlichen Sehen ähnlich fein wahrgenommen wie in der Mitte, Formen und Details dagegen deutlich schlechter. Aufgaben mit mehreren bewegten Zielen werden durch Üben besser, eine Übertragung auf andere Aufgaben oder auf den Sport ist aber schwach und meist nicht belegt. Diese Übung selbst wurde nicht untersucht.',
      improved:
        'Gelegentlich stockt eine Kugel, und du meldest die Seite – so gibt es eine Aufgabe, die sich am besten mit ruhigem Blick lösen lässt. Alle Kugeln laufen mit gleichem, gleichmäßigem Tempo, damit jede Verlangsamung eindeutig die gesuchte Abweichung ist, und die Buttons verraten nichts. Tempo, Zielzahl (1 bis 2 je Seite) und Dauer des Stopps passen sich deinem Ergebnis an. Tippen ohne Stopp wird als Fehlalarm gezählt, damit Raten nichts bringt. Ob dein Blick wirklich in der Mitte bleibt, wird ohne Eye-Tracker nicht gemessen.',
    },
    it: {
      trains: 'Tenere lo sguardo al centro e notare comunque su quale lato una tra due e quattro sfere si muove per un attimo in modo diverso.',
      daily: 'Guardare avanti e accorgersi di ciò che succede a sinistra e a destra: nel traffico, nella folla, negli sport di squadra.',
      research:
        'L’attenzione può essere distribuita su più punti contemporaneamente, anche senza guardarli. Il movimento viene percepito nella visione laterale con una finezza simile a quella centrale, forme e dettagli invece molto peggio. I compiti con più bersagli in movimento migliorano con l’esercizio, ma il trasferimento ad altri compiti o allo sport è debole e per lo più non dimostrato. Questo esercizio in sé non è stato studiato.',
      improved:
        'Ogni tanto una sfera si ferma e tu segnali il lato: così c’è un compito che si risolve meglio con lo sguardo fermo. Tutte le sfere vanno alla stessa velocità regolare, perché ogni rallentamento sia chiaramente lo scostamento cercato, e i pulsanti non rivelano nulla. Velocità, numero di bersagli (da 1 a 2 per lato) e durata dell’arresto si adattano al tuo risultato. Toccare senza arresto viene contato come falso allarme, perché tirare a indovinare non serva a nulla. Senza eye-tracker non viene misurato se il tuo sguardo resta davvero al centro.',
    },
  },
  sources: [
    src(
      'Awh & Pashler (2000). Evidence for split attentional foci. Journal of Experimental Psychology: Human Perception and Performance',
      'https://doi.org/10.1037/0096-1523.26.2.834',
    ),
    src(
      'Cavanagh & Alvarez (2005). Tracking multiple targets with multifocal attention. Trends in Cognitive Sciences',
      'https://doi.org/10.1016/j.tics.2005.05.009',
    ),
    src(
      'Alvarez & Cavanagh (2005). Independent resources for attentional tracking in the left and right visual hemifields. Psychological Science',
      'https://doi.org/10.1111/j.1467-9280.2005.01587.x',
    ),
    src('Fehd & Seiffert (2010). Looking at the center of the targets helps multiple object tracking. Journal of Vision', 'https://doi.org/10.1167/10.4.19'),
    src('McKee & Nakayama (1984). The detection of motion in the peripheral visual field. Vision Research', 'https://doi.org/10.1016/0042-6989(84)90140-8'),
    src(
      'Vater, Gray & Holcombe (2021). A critical systematic review of the Neurotracker perceptual-cognitive training tool. Psychonomic Bulletin & Review',
      'https://doi.org/10.3758/s13423-021-01892-2',
    ),
  ],
};
