// Quellen: jede Angabe einzeln per Crossref (Metadaten) und über PubMed (Abstract) geprüft (02.10.2026); die Aussagen im
// Text halten sich an das, was im Abstract steht. Der Labor-Prototyp (help/follow.js) hatte KEINE Quellen
// (`references: []`); alle Quellen sind neu gesucht und geprüft:
// - Engel et al. (2000): Augen- und Handführung reagieren auf einen Richtungswechsel ähnlich (Abstract).
// - Danion & Flanagan (2018): beim Führen mit der Hand weniger Aufholsprünge der Augen, genaueres Mitgleiten (Abstract;
//   Laborgerät mit Handgriff und Zeiger, nicht Finger auf dem Bildschirm – so im Text vermerkt).
// - Miall et al. (1993): Handführen als „ruckweises“ Nachregeln; bei höherem Zieltempo wuchs der Startfehler (Abstract).
// - de’Sperati & Viviani (1997): Genauigkeit der Augen auf Ellipsen hängt von Tempo und Krümmung ab (Abstract).
// - Eibenberger et al. (2012): kleine Studie (10 Personen), Training des Augenfolgens – nur so wiedergegeben.
// - Pronk et al. (2020), Guo et al. (2025): Grenzen der Messung am Touchgerät bzw. Gewöhnungseffekt (Abstract).
// Nicht übernommen: Aussagen des Prototyp-Textes ohne Quelle („bei höheren Geschwindigkeiten oder unvorhersehbaren
// Bewegungen schalten die Augen auf Aufholsprünge um“ – im Abstract nicht bestätigt; „trainiert das gleitende Verfolgen“ –
// Wirkversprechen, für diese Übung nicht untersucht). Für genau diese Übung (Finger auf bewegtem Ziel) wurde keine Studie
// gefunden. Nicht bestätigt werden konnte: Volltext der Studien (nur Abstracts gelesen).
import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'labor-ziel-verfolgen',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Den Finger auf einem gleichmäßig wandernden Ziel halten – die Augen folgen dem Ziel, die Hand führt mit. Bahn, Tempo, Größe und Spielraum stellst du selbst ein.',
      daily: 'Überall, wo Auge und Hand gemeinsam ein bewegtes Ziel verfolgen, etwa beim Führen eines Zeigers oder Stifts über den Bildschirm. Ob die Übung dabei hilft, ist nicht belegt.',
      research:
        'Wer ein bewegtes Ziel mit den Augen verfolgt, gleitet mit und macht dabei kleine Aufholsprünge. Bei einem abrupten Richtungswechsel des Ziels reagierten Augen und Hand in einer Laborstudie ähnlich; die Autoren schließen auf gemeinsame Mechanismen (Engel et al., 2000). Wer mit der Hand folgt, benutzt die Augen etwas anders als beim reinen Zuschauen: weniger Aufholsprünge, genaueres Mitgleiten (Danion & Flanagan, 2018; dort mit Handgriff statt Finger auf dem Bildschirm). Die Hand führt dabei nicht ganz gleichmäßig, sondern in kleinen Korrekturschritten, und bei höherem Zieltempo wuchs der Abstand, bei dem eine Korrektur einsetzt (Miall et al., 1993). Wie genau die Augen einer Ellipse folgen, hängt von Tempo und Krümmung ab (de’Sperati & Viviani, 1997); hier läuft das Ziel mit gleichbleibendem Tempo – das ist wie Bahnformen, Tempo, Größe und Spielraum eine eigene Festlegung der App. In einer kleinen Studie mit zehn Personen verbesserte kurzes Üben des Augenfolgens am Bildschirm das Folgen in einer anschließenden Prüfung (Eibenberger et al., 2012); ob das Führen mit dem Finger ähnlich profitiert, ist nicht untersucht. Verbesserungen in der geübten Aufgabe sind zum Teil Gewöhnung an Aufgabe und Gerät: In Studien zu solchen Übungen fielen sie deutlich größer aus, wenn die Prüfung der geübten Aufgabe ähnelte (Guo et al., 2025). Touchscreens messen Reaktionszeiten durchweg etwas zu lang, je nach Gerät unterschiedlich (Pronk et al., 2020; Tablets wurden dort nicht untersucht); hier wird zwar keine Reaktionszeit gemessen, aber es zählt trotzdem nur der Vergleich mit dir selbst auf demselben Gerät und mit denselben Einstellungen. Wohin du schaust, wird nicht gemessen (kein Eye-Tracking). Für genau diese Übung gibt es keine Studie.',
      improved:
        'Der Finger liegt wie im Original auf dem Ziel, gezählt wird nur bei aufliegendem Finger. Größe und Tempo in Zentimetern (nach Kalibrierung des Bildschirms), das Ziel wird nie größer als die Bühne, die Trefferfläche ist mindestens so groß wie eine Fingerkuppe. Vor der Bewegung steht das Ziel einen Moment still, damit du den Finger auflegen kannst; erst dann zählt die Zeit. Beim Drehen des Tablets bleibt das Ziel an derselben Stelle der Runde. Ein Ring um das Ziel zeigt den Spielraum (gestrichelt, bei „auf dem Ziel“ durchgezogen und dicker, dazu ein ✓ – nicht nur ein Farbwechsel), eine gestrichelte Linie führt zum Ziel, wenn der Finger daneben liegt; nur ein Finger zählt. Jeder Durchlauf merkt sich seine Einstellungen: Verlauf, Bestwert und „Letztes Mal“ vergleichen nur Läufe mit gleichen Einstellungen. Gezeigt werden Anteil auf dem Ziel, längste Verfolgung, verlorene Verbindungen, Zeit mit Fingerkontakt und mittlere Abweichung – keine Noten, keine Normwerte, keine Ranglisten.',
    },
    it: {
      trains: 'Tenere il dito su un bersaglio che si muove in modo regolare – gli occhi seguono il bersaglio, la mano guida insieme. Percorso, velocità, dimensione e margine li scegli tu.',
      daily: 'Ovunque occhio e mano seguano insieme un bersaglio in movimento, per esempio guidando un puntatore o una penna sullo schermo. Che l’esercizio aiuti non è dimostrato.',
      research:
        'Chi segue con gli occhi un bersaglio in movimento scorre con esso e fa piccoli scatti di recupero. In un cambio improvviso di direzione del bersaglio, occhi e mano hanno reagito in modo simile in uno studio di laboratorio; gli autori deducono meccanismi comuni (Engel et al., 2000). Chi segue con la mano usa gli occhi in modo un po’ diverso rispetto al solo guardare: meno scatti di recupero, inseguimento più preciso (Danion & Flanagan, 2018; lì con un’impugnatura invece del dito sullo schermo). La mano non guida in modo del tutto uniforme, ma a piccoli passi di correzione, e a velocità maggiori del bersaglio cresceva la distanza alla quale parte una correzione (Miall et al., 1993). Quanto gli occhi seguono con precisione un’ellisse dipende da velocità e curvatura (de’Sperati & Viviani, 1997); qui il bersaglio si muove a velocità costante – come forma del percorso, velocità, dimensione e margine è una scelta propria dell’app. In un piccolo studio con dieci persone, un breve allenamento dell’inseguimento con gli occhi sullo schermo ha migliorato l’inseguimento in una verifica successiva (Eibenberger et al., 2012); se la guida con il dito ne tragga lo stesso vantaggio non è stato studiato. I miglioramenti nel compito allenato sono in parte abitudine al compito e al dispositivo: negli studi su esercizi di questo tipo erano nettamente maggiori quando la verifica somigliava al compito allenato (Guo et al., 2025). I touchscreen misurano i tempi di reazione sistematicamente un po’ in eccesso, in modo diverso a seconda del dispositivo (Pronk et al., 2020; i tablet non erano stati studiati); qui non viene misurato un tempo di reazione, ma conta comunque solo il confronto con te stesso sullo stesso dispositivo e con le stesse impostazioni. Dove guardi non viene misurato (nessun eye-tracking). Per questo esercizio non esiste uno studio.',
      improved:
        'Come nell’originale il dito sta sul bersaglio, e si conta solo con il dito appoggiato. Dimensione e velocità in centimetri (dopo la calibrazione dello schermo), il bersaglio non diventa mai più grande dell’area di gioco, l’area di tocco è almeno grande quanto la punta di un dito. Prima del movimento il bersaglio resta fermo un momento, così puoi appoggiare il dito; solo allora il tempo conta. Girando il tablet il bersaglio resta nello stesso punto del giro. Un anello intorno al bersaglio mostra il margine (tratteggiato, “sul bersaglio” continuo e più spesso, con un ✓ – non solo un cambio di colore), una linea tratteggiata porta al bersaglio quando il dito è fuori; conta un solo dito. Ogni giro ricorda le sue impostazioni: andamento, record e “ultima volta” confrontano solo giri con le stesse impostazioni. Vengono mostrati quota sul bersaglio, inseguimento più lungo, contatti persi, tempo con il dito sullo schermo e scostamento medio – niente voti, niente valori di riferimento, niente classifiche.',
    },
  },
  sources: [
    src('Engel, Anderson & Soechting (2000). Similarity in the response of smooth pursuit and manual tracking to a change in the direction of target motion. Journal of Neurophysiology', 'https://doi.org/10.1152/jn.2000.84.3.1149'),
    src('Danion & Flanagan (2018). Different gaze strategies during eye versus hand tracking of a moving target. Scientific Reports', 'https://doi.org/10.1038/s41598-018-28434-6'),
    src('Miall, Weir & Stein (1993). Intermittency in human manual tracking tasks. Journal of Motor Behavior', 'https://doi.org/10.1080/00222895.1993.9941639'),
    src('de’Sperati & Viviani (1997). The relationship between curvature and velocity in two-dimensional smooth pursuit eye movements. The Journal of Neuroscience', 'https://doi.org/10.1523/JNEUROSCI.17-10-03932.1997'),
    src('Eibenberger, Ring & Haslwanter (2012). Sustained effects for training of smooth pursuit plasticity. Experimental Brain Research', 'https://doi.org/10.1007/s00221-012-3009-8'),
    src('Pronk, Wiers, Molenkamp & Murre (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
  ],
};
