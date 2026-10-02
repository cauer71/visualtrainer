// Quellen: jede Angabe einzeln per Crossref (Metadaten) und PubMed (Abstract) geprüft (02.10.2026).
// Aus dem Labor-Prototyp (help/dual.js) stammt Pashler (1994): Crossref ✓ (Psychol Bull 116(2), 220–244), PubMed-Abstract gelesen:
// „Menschen haben oft Mühe, zwei relativ einfache Aufgaben gleichzeitig auszuführen; Studien zur psychologischen Refraktärperiode
// zeigen einen hartnäckigen Engpass bei der Wahl der Handlung (und wohl dem Abruf aus dem Gedächtnis); weitere Grenzen betreffen
// Vorbereitung, sensorisch-perzeptive Prozesse und Zeitsteuerung“. NICHT aus dem Abstract belegt und daher gestrichen: die
// Prototyp-Aussagen „Doppelaufgaben-Effekt ist ein Standardmaß für Aufmerksamkeitskapazität“ und „konkurrieren um dieselben
// Kapazitäten (Aufmerksamkeit, Antwortauswahl)“ (nur die Antwortauswahl als Engpass ist belegt; die Formulierung „Kapazität“ ist
// umstritten – Pashler selbst nennt die Frage kontrovers).
// Ergänzt und geprüft (Crossref + PubMed-Abstract): Schumacher et al. (2001; nach mäßig viel Übung erreichen zumindest einige
// Personen „praktisch perfekte Zeitteilung“ bei einfachen Wahlreaktionen), Ruthruff et al. (2006; Übung verkürzt den Engpass, bei einigen
// Personen wurde er durch Automatisierung umgangen), Ball et al. (1988; nützliches Sehfeld, Modell mit Ablenkern und Zweitaufgaben),
// Vater & Strasburger (2021; 93 Studien zu Randsehen, keine mit Eye-Tracking; beste „passive“ Kontrolle durch Zweitaufgaben in der Mitte),
// Guo et al. (2025; Lerneffekt bei digitalen Sehübungen).
// Nicht bestätigt werden konnte: nichts Aufgenommenes. Offen: ob und wie stark sich diese Übung (Berührung statt Tastendruck, Zahlenfolge mit
// Zielzahl statt Wahlreaktion) auf die Befunde der Laborstudien übertragen lässt – dazu gibt es keine Studie.
import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'labor-doppelaufgabe',
  evidence: 'weak',
  texts: {
    de: {
      trains:
        'Zwei Aufgaben gleichzeitig erledigen: in der Mitte bei einer Zielzahl der Zahlenfolge die Mitte berühren und am Rand auftauchende Punkte antippen. Mit den Modi „Nur Mitte“ und „Nur Rand“ siehst du, wie sich jede Aufgabe allein verhält; Tempo, Zielzahl, Punktgröße und Sichtbarkeit stellst du selbst ein.',
      daily:
        'Überall, wo man auf zwei Dinge gleichzeitig achten muss, zum Beispiel beim Zuhören und Notieren oder beim Beobachten mehrerer Stellen. Ob die Übung dabei hilft, ist nicht belegt.',
      research:
        'Menschen haben oft Mühe, zwei einfache Aufgaben gleichzeitig auszuführen. Studien dazu zeigen einen Engpass bei der Wahl der Handlung, der die zweite Reaktion verzögern kann; weitere Grenzen betreffen Vorbereitung, Wahrnehmung und Zeitsteuerung (Pashler, 1994). Mit Übung wird es besser: Bei einfachen Wahlreaktionen erreichten zumindest einige Personen nach mäßig viel Übung praktisch perfekte Zeitteilung (Schumacher et al., 2001); in anderen Versuchen verkürzte Übung den Engpass, und nur bei einigen Personen wurde er umgangen (Ruthruff et al., 2006). Dort ging es um die geübte Aufgabe; in Studien zu Sehübungen fallen Verbesserungen deutlich größer aus, wenn die Prüfung der geübten Aufgabe ähnelt – ein großer Teil ist Gewöhnung an Aufgabe und Gerät (Guo et al., 2025). Das „nützliche Sehfeld“, der Bereich, aus dem man in einem Blick Information aufnehmen kann, hängt auch von Ablenkern und Zweitaufgaben ab (Ball et al., 1988). Eine Übersicht zu Geräten für das Randsehen im Sport fand unter 93 Studien keine mit Blickmessung; am besten kontrolliert waren Aufgaben mit einer Zweitaufgabe in der Mitte (Vater & Strasburger, 2021). Auch diese App misst den Blick nicht: „Blick in der Mitte lassen“ ist eine Bitte, keine Kontrolle. Was die Doppelaufgabe bei dir „kostet“, siehst du im Vergleich der drei Modi – das ist deine eigene Beobachtung, kein Maß aus der Forschung. Für genau diese Übung gibt es keine Studie; ein Nutzen für Alltag, Sport oder Verkehr ist nicht belegt.',
      improved:
        'Die Zahlenfolge wechselt höchstens 2,5-mal pro Sekunde und blendet weich ein; die Randpunkte nutzen dieselbe Logik wie Spot-Touch (Größen in Zentimetern, auf der Bühne begrenzt) und halten Abstand zum Kreis in der Mitte, damit nichts überdeckt wird. Die Modi „Nur Mitte“ und „Nur Rand“ sind eingebaut, jeder Modus hat seinen eigenen Verlauf. Eine zum Schluss nur angeschnittene Zielzahl zählt nicht mit, sodass „erkannt plus verpasst gleich gezeigt“ gilt. Die Zeit wird über die Eingabe-Zeitstempel gemessen, ein Doppeltipp auf einen Punkt zählt nicht als Fehltipp. Weiche Rückmeldung mit ✓/✗ statt Blitzen. Gezeigt werden erkannte und verpasste Zielzahlen, Berührungen ohne Zielzahl, getroffene und verpasste Punkte, Fehltipps und Reaktionszeiten – keine Noten, keine Normwerte, keine Ranglisten.',
    },
    it: {
      trains:
        'Svolgere due compiti insieme: al centro toccare il centro quando compare il numero bersaglio della sequenza e toccare i punti che compaiono al margine. Con le modalità “Solo centro” e “Solo margine” vedi come si comporta ogni compito da solo; ritmo, numero bersaglio, dimensione dei punti e visibilità li imposti tu.',
      daily:
        'Ovunque si debba fare attenzione a due cose insieme, per esempio ascoltare e annotare o osservare più punti. Che l’esercizio aiuti non è dimostrato.',
      research:
        'Le persone hanno spesso difficoltà a svolgere insieme due compiti semplici. Gli studi mostrano un collo di bottiglia nella scelta dell’azione, che può ritardare la seconda reazione; altri limiti riguardano preparazione, percezione e controllo temporale (Pashler, 1994). Con l’esercizio si migliora: nelle semplici reazioni di scelta almeno alcune persone, dopo un esercizio moderato, raggiungevano una condivisione del tempo praticamente perfetta (Schumacher et al., 2001); in altri esperimenti l’esercizio accorciava il collo di bottiglia, e solo in alcune persone veniva aggirato (Ruthruff et al., 2006). Si trattava del compito esercitato; negli studi sugli esercizi visivi i miglioramenti risultano nettamente maggiori quando la verifica somiglia al compito allenato – gran parte è abitudine al compito e al dispositivo (Guo et al., 2025). Il “campo visivo utile”, l’area dalla quale si acquisisce informazione in uno sguardo, dipende anche da distrattori e compiti secondari (Ball et al., 1988). Una rassegna sugli strumenti per la visione periferica nello sport non ha trovato, tra 93 studi, nessuno con misurazione dello sguardo; meglio controllati erano i compiti con un compito secondario al centro (Vater & Strasburger, 2021). Anche questa app non misura lo sguardo: “sguardo al centro” è una richiesta, non un controllo. Quanto ti “costa” la doppia attività lo vedi confrontando le tre modalità – è una tua osservazione, non una misura della ricerca. Per questo esercizio non esiste uno studio; un’utilità per vita quotidiana, sport o traffico non è dimostrata.',
      improved:
        'La sequenza di numeri cambia al massimo 2,5 volte al secondo e compare gradualmente; i punti al margine usano la stessa logica di Spot-Touch (dimensioni in centimetri, limitate allo schermo) e restano a distanza dal cerchio al centro, così nulla viene coperto. Le modalità “Solo centro” e “Solo margine” sono integrate, ogni modalità ha il suo andamento. Un numero bersaglio mostrato solo a metà alla fine non conta, così vale “riconosciuti più mancati uguale mostrati”. Il tempo si misura con i timestamp dell’input, un doppio tocco su un punto non conta come tocco a vuoto. Risposta morbida con ✓/✗ invece di lampi. Si mostrano numeri bersaglio riconosciuti e mancati, tocchi senza numero bersaglio, punti colpiti e mancati, tocchi a vuoto e tempi di reazione – niente voti, niente valori di riferimento, niente classifiche.',
    },
  },
  sources: [
    src('Pashler (1994). Dual-task interference in simple tasks: Data and theory. Psychological Bulletin', 'https://doi.org/10.1037/0033-2909.116.2.220'),
    src('Schumacher, Seymour, Glass, Fencsik, Lauber, Kieras & Meyer (2001). Virtually perfect time sharing in dual-task performance: Uncorking the central cognitive bottleneck. Psychological Science', 'https://doi.org/10.1111/1467-9280.00318'),
    src('Ruthruff, Van Selst, Johnston & Remington (2006). How does practice reduce dual-task interference: Integration, automatization, or just stage-shortening? Psychological Research', 'https://doi.org/10.1007/s00426-004-0192-7'),
    src('Ball, Beard, Roenker, Miller & Griggs (1988). Age and visual search: Expanding the useful field of view. Journal of the Optical Society of America A', 'https://doi.org/10.1364/JOSAA.5.002210'),
    src('Vater & Strasburger (2021). Topical review: The top five peripheral vision tools in sport. Optometry and Vision Science', 'https://doi.org/10.1097/OPX.0000000000001732'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
  ],
};
