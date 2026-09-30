/**
 * Hintergrundtexte zu den Übungen (Seite "Hintergrund & Studien").
 *
 * Grundlage: docs/wissenschaft/01–04 (Recherche mit geprüften Quellen, Stand 29.09.2026).
 * Formulierungsregeln: nur beschreiben, was geübt wird und dass man in der Übung besser wird;
 * keine Wirk- oder Heilversprechen, keine Diagnose, keine Vergleiche mit anderen
 * (siehe docs/wissenschaft/01-reaktion-und-impulskontrolle.md, Abschnitt 4).
 */
import type { Lang } from '../i18n/lang';
import { science as leuchtfolgeScience } from '../exercises/leuchtfolge/science';
import { science as zahlenspanneScience } from '../exercises/zahlenspanne/science';
import { science as rastermusterScience } from '../exercises/rastermuster/science';
import { science as rueckblickScience } from '../exercises/rueckblick/science';
import { science as woWarEsScience } from '../exercises/wo-war-es/science';
import { science as leuchtpfadScience } from '../exercises/leuchtpfad/science';
import { science as liegendeAchtScience } from '../exercises/liegende-acht/science';
import { science as wellenbahnScience } from '../exercises/wellenbahn/science';
import { science as zweiZieleScience } from '../exercises/zwei-ziele/science';
import { science as sekundenGefuehlScience } from '../exercises/sekunden-gefuehl/science';
import { science as blicksprungGalerieScience } from '../exercises/blicksprung-galerie/science';
import { science as fuenfTuerenScience } from '../exercises/fuenf-tueren/science';
import { science as fallendeZieleScience } from '../exercises/fallende-ziele/science';
import { science as hellsteKugelScience } from '../exercises/hellste-kugel/science';
import { science as ziehenAblegenScience } from '../exercises/ziehen-ablegen/science';

export type EvidenceLevel = 'strong' | 'medium' | 'weak';

export interface ScienceText {
  /** Was wird geübt (1 Satz) */
  trains: string;
  /** Wo so etwas im Alltag gefragt ist (beschreibend) */
  daily: string;
  /** Was die Forschung sagt (2–4 Sätze, ehrlich) */
  research: string;
  /** Was gegenüber einfachen Browser-Spielen verbessert wurde */
  improved: string;
}

export interface ScienceSource {
  label: string;
  url: string;
}

export interface ScienceEntry {
  id: string;
  /** Wie gut ist der Nutzen in der Übung und darüber hinaus untersucht (Gesamteinschätzung) */
  evidence: EvidenceLevel;
  texts: Record<Lang, ScienceText>;
  sources: ScienceSource[];
}

const src = (label: string, url: string): ScienceSource => ({ label, url });

export const SCIENCE: Record<string, ScienceEntry> = {
  blitzreaktion: {
    id: 'blitzreaktion',
    evidence: 'weak',
    texts: {
      de: {
        trains: 'Schnell und gleichmäßig auf ein plötzlich auftauchendes Licht reagieren – in der Mitte und am Rand.',
        daily: 'Überall, wo etwas unerwartet auftaucht: im Verkehr, beim Sport, bei der Arbeit.',
        research:
          'Die Aufgabe entspricht dem in der Schlafforschung genutzten Reaktionstest (PVT), der sehr empfindlich auf Müdigkeit reagiert. In der Übung wird man anfangs besser, danach bleibt die reine Reaktionszeit meist stabil – sie gilt als kaum trainierbar. Eine Übertragung auf Straßenverkehr oder Sport ist nicht belegt. Touchscreens messen je nach Gerät 30–130 ms zu lang, deshalb nur mit sich selbst vergleichen.',
        improved:
          'Nicht vorhersagbare Wartezeiten (Raten lohnt sich nicht), gelegentliche Durchgänge ohne Licht, "zu früh" unter 100 ms, Median statt Mittelwert, Schwankung und Mitte/Rand getrennt ausgewertet, präzise Zeitmessung über die Eingabezeitstempel.',
      },
      it: {
        trains: 'Reagire in modo rapido e costante a una luce che compare all’improvviso – al centro e ai lati.',
        daily: 'Ovunque qualcosa compaia inaspettatamente: nel traffico, nello sport, al lavoro.',
        research:
          'Il compito corrisponde al test di reazione usato nella ricerca sul sonno (PVT), molto sensibile alla stanchezza. All’inizio si migliora, poi il tempo di reazione puro resta per lo più stabile – è considerato poco allenabile. Un trasferimento al traffico o allo sport non è dimostrato. A seconda del dispositivo i touchscreen misurano 30–130 ms in più: confrontati solo con te stesso.',
        improved:
          'Attese imprevedibili (indovinare non conviene), passaggi occasionali senza luce, “troppo presto” sotto i 100 ms, mediana invece della media, variabilità e centro/lati valutati separatamente, misura precisa tramite i timestamp dell’input.',
      },
    },
    sources: [
      src('Basner & Dinges (2011). Maximizing sensitivity of the Psychomotor Vigilance Test (PVT) to sleep loss. Sleep', 'https://doi.org/10.1093/sleep/34.5.581'),
      src('Basner et al. (2018). Repeated administration effects on Psychomotor Vigilance Test performance. Sleep', 'https://doi.org/10.1093/sleep/zsx187'),
      src('Pronk et al. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
      src('Appelbaum & Erickson (2018). Sports vision training: A review of the state-of-the-art in digital training techniques. Int. Review of Sport and Exercise Psychology', 'https://doi.org/10.1080/1750984X.2016.1266376'),
      src('Guo et al. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
    ],
  },

  'stopp-los': {
    id: 'stopp-los',
    evidence: 'medium',
    texts: {
      de: {
        trains: 'Schnell reagieren – und eine schon geplante Reaktion im richtigen Moment zurückhalten.',
        daily: 'Situationen, in denen man eine Bewegung stoppen muss: nicht losfahren, obwohl man wollte; beim Sport eine Finte erkennen.',
        research:
          'Go/No-Go ist eine klassische Aufgabe zur Impulskontrolle. In der Aufgabe selbst wird man mit Übung schneller und treffsicherer. Ein Training der Impulskontrolle übertrug sich in Studien aber nicht auf andere Aufgaben oder auf das Fahren im Simulator.',
        improved:
          '75 % Grün-Reize, damit das Tippen zur Gewohnheit wird und Bremsen wirklich gefordert ist; die Antwortfrist passt sich nur über die Grün-Reize an; Grün und Rot unterscheiden sich zusätzlich in Form und Helligkeit (Rot-Grün-Schwäche betrifft etwa 8 % der Männer).',
      },
      it: {
        trains: 'Reagire in fretta – e trattenere al momento giusto una reazione già pronta.',
        daily: 'Situazioni in cui bisogna fermare un movimento: non partire anche se si voleva; riconoscere una finta nello sport.',
        research:
          'Il Go/No-Go è un classico compito sul controllo degli impulsi. Nel compito stesso, con l’allenamento si diventa più veloci e precisi. Negli studi, però, l’allenamento del controllo degli impulsi non si è trasferito ad altri compiti né alla guida al simulatore.',
        improved:
          '75 % di stimoli verdi, così toccare diventa un’abitudine e fermarsi è davvero impegnativo; il tempo di risposta si adatta solo con gli stimoli verdi; verde e rosso si distinguono anche per forma e luminosità (il daltonismo rosso-verde riguarda circa l’8 % degli uomini).',
      },
    },
    sources: [
      src('Wessel (2018). Prepotent motor activity and inhibitory control demands in different variants of the go/no-go paradigm. Psychophysiology', 'https://doi.org/10.1111/psyp.12871'),
      src('Enge et al. (2014). No evidence for true training and transfer effects after inhibitory control training in young healthy adults. J Exp Psychol: LMC', 'https://doi.org/10.1037/a0036165'),
      src('Hatfield et al. (2018). The effects of training impulse control on simulated driving. Accident Analysis & Prevention', 'https://doi.org/10.1016/j.aap.2018.06.012'),
      src('Birch (2012). Worldwide prevalence of red-green color deficiency. JOSA A', 'https://doi.org/10.1364/JOSAA.29.000313'),
    ],
  },

  zielfang: {
    id: 'zielfang',
    evidence: 'medium',
    texts: {
      de: {
        trains: 'Auge und Hand zusammen: ein bewegtes Ziel sehen, seine Bahn vorausahnen und im richtigen Moment treffen.',
        daily: 'Einen Ball fangen, nach etwas Rollendem greifen, Spiele mit Kindern oder Enkeln, Rückschlagsport.',
        research:
          'Beim Abfangen sagt das Gehirn die Bahn laufend voraus und korrigiert ständig nach – bei schnellen Zielen tippt man typischerweise leicht dahinter. In der Aufgabe werden Treffsicherheit und Timing mit Übung besser. Dass sich das auf Ballsport oder Alltag überträgt, ist nur schwach belegt.',
        improved:
          'Tempo in echter Zeit (gleich schnell auf 60- und 120-Hz-Geräten), große Touch-Ziele, adaptive Schwierigkeit (Tempo, Zielgröße, Zeit) und eine Auswertung, ob du eher vor oder hinter das Ziel tippst.',
      },
      it: {
        trains: 'Occhio e mano insieme: vedere un bersaglio in movimento, prevederne il percorso e colpirlo al momento giusto.',
        daily: 'Prendere una palla, afferrare qualcosa che rotola, giocare con bambini o nipoti, sport con la racchetta.',
        research:
          'Per intercettare, il cervello prevede continuamente il percorso e corregge di continuo – con bersagli veloci di solito si tocca un po’ dietro. Nel compito precisione e tempismo migliorano con l’allenamento. Il trasferimento agli sport con la palla o alla vita quotidiana è dimostrato solo debolmente.',
        improved:
          'Velocità in tempo reale (uguale su schermi a 60 e 120 Hz), bersagli grandi per il tocco, difficoltà adattiva (velocità, dimensione, tempo) e un’analisi se tocchi più davanti o dietro al bersaglio.',
      },
    },
    sources: [
      src('Brenner & Smeets (2018). Continuously updating one\u2019s predictions underlies successful interception. J Neurophysiology', 'https://doi.org/10.1152/jn.00517.2018'),
      src('Brouwer, Brenner & Smeets (2002). Hitting moving objects: Is target speed used in guiding the hand? Experimental Brain Research', 'https://doi.org/10.1007/s00221-001-0980-x'),
      src('Laby & Appelbaum (2021). Vision and on-field performance: A critical review of visual assessment and training studies with athletes. Optometry and Vision Science', 'https://doi.org/10.1097/OPX.0000000000001729'),
      src('Parhi, Karlson & Bederson (2006). Target size study for one-handed thumb use on small touchscreen devices. MobileHCI', 'https://doi.org/10.1145/1152215.1152260'),
    ],
  },

  'scharf-in-bewegung': {
    id: 'scharf-in-bewegung',
    evidence: 'medium',
    texts: {
      de: {
        trains: 'Einem bewegten Ziel ruhig mit den Augen folgen und dabei ein kleines Detail erkennen.',
        daily: 'Schilder oder Hausnummern im Vorbeifahren lesen, einen Ball im Blick behalten, eine Anzeigetafel.',
        research:
          'Details auf bewegten Objekten zu erkennen ist eine eigene Fähigkeit, die mit dem Tempo und im Alter nachlässt. In Laborstudien ließ sie sich durch Üben verbessern. Eine Wirkung auf Alltag, Verkehr oder Sport ist nicht nachgewiesen. Die Übung ersetzt keine Brille und keine Untersuchung – eine gut angepasste Nahkorrektur ist Voraussetzung.',
        improved:
          'Statt nur mit dem Finger einem Ball zu folgen, erzwingt das kurz eingeblendete Sehzeichen (Landolt-Ring) das Folgen mit den Augen. Das Tempo passt sich an, die Bewegung ist weich und nicht vorhersehbar, alles zeitbasiert.',
      },
      it: {
        trains: 'Seguire con calma con lo sguardo un bersaglio in movimento e riconoscere nel frattempo un piccolo dettaglio.',
        daily: 'Leggere cartelli o numeri civici passando, tenere d’occhio una palla, un tabellone.',
        research:
          'Riconoscere dettagli su oggetti in movimento è una capacità a sé, che cala con la velocità e con l’età. Negli studi di laboratorio è migliorata con l’esercizio. Un effetto sulla vita quotidiana, sul traffico o sullo sport non è dimostrato. L’esercizio non sostituisce occhiali né visite – una buona correzione da vicino è il presupposto.',
        improved:
          'Invece di seguire una palla solo con il dito, il simbolo mostrato per un attimo (anello di Landolt) obbliga a seguire con gli occhi. La velocità si adatta, il movimento è fluido e imprevedibile, tutto basato sul tempo.',
      },
    },
    sources: [
      src('Long & Rourke (1989). Training effects on the resolution of moving targets – dynamic visual acuity. Human Factors', 'https://doi.org/10.1177/001872088903100407'),
      src('Long & Crambert (1990). The nature and basis of age-related changes in dynamic visual acuity. Psychology and Aging', 'https://doi.org/10.1037/0882-7974.5.1.138'),
      src('Uchida et al. (2012). Origins of superior dynamic visual acuity in baseball players. PLoS ONE', 'https://doi.org/10.1371/journal.pone.0031530'),
      src('Shekar et al. (2021). Efficacy of a digital sports vision training program for improving visual abilities in collegiate baseball and softball athletes. Optometry and Vision Science', 'https://doi.org/10.1097/OPX.0000000000001740'),
    ],
  },

  'kugel-detektiv': {
    id: 'kugel-detektiv',
    evidence: 'medium',
    texts: {
      de: {
        trains: 'Mehrere bewegte Objekte gleichzeitig im Blick behalten, während ähnlich aussehende ablenken.',
        daily: 'Kreuzungen mit Autos, Rädern und Fußgängern, Mannschaftssport, Kinder auf dem Spielplatz.',
        research:
          'Das "Multiple Object Tracking" ist gut erforscht: In der Aufgabe wird man durch Üben zuverlässig besser – auch im höheren Alter. Ob sich das auf Sport oder Straßenverkehr überträgt, ist bisher nicht belegt; eine Nachfolgestudie im Fußball fand keinen Effekt. Hilfreich ist, in die Mitte der Gruppe zu schauen statt einzelnen Kugeln hinterherzublicken.',
        improved:
          'Mehrere kurze Runden statt eines langen Durchgangs, das Tempo passt sich an (Ziel: etwa drei von vier Runden fehlerfrei), weiche Bewegung ohne harte Zusammenstöße, alles zeitbasiert.',
      },
      it: {
        trains: 'Tenere d’occhio più oggetti in movimento allo stesso tempo, mentre altri simili distraggono.',
        daily: 'Incroci con auto, bici e pedoni, sport di squadra, bambini al parco giochi.',
        research:
          'Il “Multiple Object Tracking” è molto studiato: nel compito si migliora in modo affidabile con l’allenamento – anche in età avanzata. Non è dimostrato che questo si trasferisca allo sport o al traffico; uno studio successivo nel calcio non ha trovato effetti. Aiuta guardare al centro del gruppo invece di inseguire le singole palline.',
        improved:
          'Più giri brevi invece di un’unica lunga prova, la velocità si adatta (obiettivo: circa tre giri su quattro senza errori), movimento fluido senza urti bruschi, tutto basato sul tempo.',
      },
    },
    sources: [
      src('Pylyshyn & Storm (1988). Tracking multiple independent targets: Evidence for a parallel tracking mechanism. Spatial Vision', 'https://doi.org/10.1163/156856888X00122'),
      src('Legault, Allard & Faubert (2013). Healthy older observers show equivalent perceptual-cognitive training benefits to young adults for multiple object tracking. Frontiers in Psychology', 'https://doi.org/10.3389/fpsyg.2013.00323'),
      src('Fehd & Seiffert (2008). Eye movements during multiple object tracking: Where do participants look? Cognition', 'https://doi.org/10.1016/j.cognition.2007.11.008'),
      src('Vater, Gray & Holcombe (2021). A critical systematic review of the Neurotracker perceptual-cognitive training tool. Psychonomic Bulletin & Review', 'https://doi.org/10.3758/s13423-021-01892-2'),
      src('Romeas et al. (2025). No transfer of 3D-Multiple Object Tracking training on game performance in soccer. Psychology of Sport and Exercise', 'https://doi.org/10.1016/j.psychsport.2024.102770'),
    ],
  },

  punktlandung: {
    id: 'punktlandung',
    evidence: 'medium',
    texts: {
      de: {
        trains: 'Den Moment abschätzen, in dem etwas auf dich zukommt – allein aus der Art, wie es größer wird.',
        daily: 'Bremsen, Abstand halten, Straße queren, einen Ball fangen oder schlagen.',
        research:
          'Wie schnell ein Bild größer wird, verrät dem Gehirn die Zeit bis zum Kontakt – ein seit den 1970er-Jahren gut untersuchtes Prinzip. In solchen Timing-Aufgaben wird man mit Übung besser. Ob sich das auf Verkehr oder Sport überträgt, ist nicht belegt. Echtes räumliches (3D-)Sehen lässt sich an einem normalen Bildschirm nicht trainieren – die Übung nutzt Hinweise, die man auch mit einem Auge sieht.',
        improved:
          'Echte perspektivische Annäherung (die Kugel wird immer schneller größer, wie in Wirklichkeit) statt linearem Wachstum, Verdeckung kurz vor dem Ziel als Schwierigkeitsstufe und eine Rückmeldung in Millisekunden: zu früh oder zu spät.',
      },
      it: {
        trains: 'Stimare il momento in cui qualcosa ti arriva addosso – solo dal modo in cui diventa più grande.',
        daily: 'Frenare, mantenere la distanza, attraversare la strada, prendere o colpire una palla.',
        research:
          'La velocità con cui un’immagine si ingrandisce rivela al cervello il tempo al contatto – un principio ben studiato dagli anni ’70. In questi compiti di tempismo si migliora con l’allenamento. Non è dimostrato che questo si trasferisca al traffico o allo sport. La vera visione tridimensionale non si può allenare su uno schermo normale – l’esercizio usa indizi visibili anche con un occhio solo.',
        improved:
          'Vero avvicinamento prospettico (la palla si ingrandisce sempre più in fretta, come nella realtà) invece di una crescita lineare, copertura poco prima dell’arrivo come livello di difficoltà e un riscontro in millisecondi: troppo presto o troppo tardi.',
      },
    },
    sources: [
      src('Lee (1976). A theory of visual control of braking based on information about time-to-collision. Perception', 'https://doi.org/10.1068/p050437'),
      src('Gray & Regan (1998). Accuracy of estimating time to collision using binocular and monocular information. Vision Research', 'https://doi.org/10.1016/S0042-6989(97)00230-7'),
      src('Tresilian (1995). Perceptual and cognitive processes in time-to-contact estimation. Perception & Psychophysics', 'https://doi.org/10.3758/BF03206510'),
      src('Ding & Levi (2011). Recovery of stereopsis through perceptual learning in human adults with abnormal binocular vision. PNAS', 'https://doi.org/10.1073/pnas.1105183108'),
    ],
  },

  suchbild: {
    id: 'suchbild',
    evidence: 'medium',
    texts: {
      de: {
        trains: 'Gezielt ein bestimmtes Zeichen zwischen vielen ähnlichen finden.',
        daily: 'Schilder im Verkehr, Produkte im Regal, Fahrpläne, Bildschirme.',
        research:
          'Visuelle Suche gehört zu den am besten erforschten Aufgaben: Je ähnlicher Ziel und Ablenker und je mehr Elemente, desto länger dauert es. Suchaufgaben werden mit Übung nachweislich schneller, oft schon nach wenigen hundert Durchgängen und dauerhaft. Ein Nutzen für das Suchen im Alltag ist möglich, aber bei Gesunden nicht bewiesen.',
        improved:
          'Anzahl und Ähnlichkeit der Zeichen passen sich an (vom leichten "X zwischen O" bis zu gespiegelten Buchstaben), genug Abstand zwischen den Zeichen, große Touch-Flächen und die Suchrichtung, die wirklich schwer ist ("O zwischen C" statt nur "C zwischen O").',
      },
      it: {
        trains: 'Trovare in modo mirato un certo simbolo tra tanti simili.',
        daily: 'Cartelli nel traffico, prodotti sullo scaffale, orari, schermi.',
        research:
          'La ricerca visiva è tra i compiti più studiati: più bersaglio e distrattori sono simili e più elementi ci sono, più tempo serve. Con l’allenamento la ricerca diventa dimostrabilmente più veloce, spesso già dopo qualche centinaio di prove e in modo duraturo. Un beneficio nella vita quotidiana è possibile, ma nelle persone sane non è dimostrato.',
        improved:
          'Numero e somiglianza dei simboli si adattano (dalla facile “X tra le O” fino alle lettere speculari), spazio sufficiente tra i simboli, grandi aree di tocco e la direzione di ricerca davvero difficile (“O tra le C” e non solo “C tra le O”).',
      },
    },
    sources: [
      src('Treisman & Gelade (1980). A feature-integration theory of attention. Cognitive Psychology', 'https://doi.org/10.1016/0010-0285(80)90005-5'),
      src('Treisman & Souther (1985). Search asymmetry: A diagnostic for preattentive processing of separable features. J Exp Psychol: General', 'https://doi.org/10.1037/0096-3445.114.3.285'),
      src('Duncan & Humphreys (1989). Visual search and stimulus similarity. Psychological Review', 'https://doi.org/10.1037/0033-295X.96.3.433'),
      src('Sireteanu & Rettenbach (1995). Perceptual learning in visual search: Fast, enduring, but non-specific. Vision Research', 'https://doi.org/10.1016/0042-6989(94)00295-W'),
    ],
  },

  blitzblick: {
    id: 'blitzblick',
    evidence: 'strong',
    texts: {
      de: {
        trains: 'In einem kurzen Augenblick gleichzeitig erfassen, was in der Mitte und was am Rand ist.',
        daily: 'Autofahren, Kreuzungen, Menschenmengen – überall, wo man Mitte und Umgebung zugleich im Blick braucht.',
        research:
          'Die Übung ist an einen gut untersuchten Test angelehnt ("Useful Field of View"). In einer großen Studie mit älteren Menschen (ACTIVE) verbesserte ein ähnliches, betreutes Training genau diese Fähigkeit deutlich und über Jahre. Unsere Online-Version ist davon inspiriert, aber selbst nicht wissenschaftlich geprüft – sie ersetzt keine Fahreignungs- oder Sehuntersuchung.',
        improved:
          'Aufbau wie im Studienprotokoll: Aufgabe in der Mitte plus Ziel am Rand, später mit Ablenkern, danach eine Maske, damit kein "Nachbild" hilft. Die Anzeigezeit passt sich an – bis hinunter zu einem einzigen Bild (≈ 17 ms).',
      },
      it: {
        trains: 'Cogliere in un attimo, allo stesso tempo, cosa c’è al centro e cosa ai lati.',
        daily: 'Guidare, incroci, folle – ovunque serva tenere d’occhio centro e dintorni insieme.',
        research:
          'L’esercizio si ispira a un test molto studiato (“Useful Field of View”). In un grande studio con persone anziane (ACTIVE) un allenamento simile e supervisionato ha migliorato proprio questa capacità in modo netto e per anni. La nostra versione online ne è ispirata, ma non è stata verificata scientificamente – non sostituisce visite di idoneità alla guida o della vista.',
        improved:
          'Struttura come nel protocollo degli studi: compito al centro più bersaglio ai lati, poi con distrattori, seguito da una maschera perché non aiuti una “immagine residua”. Il tempo di visualizzazione si adatta – fino a una sola immagine (≈ 17 ms).',
      },
    },
    sources: [
      src('Ball et al. (2002). Effects of cognitive training interventions with older adults: A randomized controlled trial (ACTIVE). JAMA', 'https://doi.org/10.1001/jama.288.18.2271'),
      src('Ball et al. (2010). Cognitive training decreases motor vehicle collision involvement of older drivers. J Am Geriatr Soc', 'https://doi.org/10.1111/j.1532-5415.2010.03138.x'),
      src('Aust & Edwards (2016). Incremental validity of Useful Field of View subtests for the prediction of instrumental activities of daily living. J Clin Exp Neuropsychology', 'https://doi.org/10.1080/13803395.2015.1125453'),
      src('Simons et al. (2016). Do "brain-training" programs work? Psychological Science in the Public Interest', 'https://doi.org/10.1177/1529100616661983'),
    ],
  },

  'aus-dem-takt': {
    id: 'aus-dem-takt',
    evidence: 'weak',
    texts: {
      de: {
        trains: 'Feine Unterschiede im Rhythmus erkennen: Welches Feld pulsiert anders als die anderen?',
        daily: 'Ein ruhiges Konzentrationsspiel – z. B. als Abwechslung zwischen den anderen Übungen.',
        research:
          'Menschen können Taktunterschiede von etwa 8 % unterscheiden. Trainingsstudien bei Gesunden gibt es kaum, ein Alltagsnutzen ist nicht belegt. Die "Flimmerverschmelzung" (50–90 Hz) lässt sich an einem Bildschirm weder messen noch trainieren – das behaupten wir deshalb auch nicht.',
        improved:
          'Alle Felder gleich hell und zufällig versetzt (man findet das Feld wirklich über den Rhythmus, nicht über die Helligkeit), anpassbarer Unterschied – und strenge Sicherheitsgrenzen: höchstens 2,5 Pulse pro Sekunde, nur sanftes Pulsieren mit geringem Helligkeitsunterschied.',
      },
      it: {
        trains: 'Riconoscere piccole differenze di ritmo: quale riquadro pulsa diversamente dagli altri?',
        daily: 'Un tranquillo gioco di concentrazione – per esempio come pausa tra gli altri esercizi.',
        research:
          'Le persone distinguono differenze di ritmo di circa l’8 %. Studi di allenamento su persone sane quasi non esistono e un beneficio nella vita quotidiana non è dimostrato. La “fusione dello sfarfallio” (50–90 Hz) su uno schermo non si può né misurare né allenare – per questo non lo affermiamo.',
        improved:
          'Tutti i riquadri ugualmente luminosi e sfasati a caso (si trova il riquadro davvero dal ritmo, non dalla luminosità), differenza adattabile – e limiti di sicurezza severi: al massimo 2,5 pulsazioni al secondo, solo una pulsazione dolce con poca differenza di luminosità.',
      },
    },
    sources: [
      src('Mandler (1984). Temporal frequency discrimination above threshold. Vision Research', 'https://doi.org/10.1016/0042-6989(84)90020-8'),
      src('Harding et al. (2005). Photic- and pattern-induced seizures: Expert consensus of the Epilepsy Foundation of America Working Group. Epilepsia', 'https://doi.org/10.1111/j.1528-1167.2005.31305.x'),
      src('W3C (2023). Web Content Accessibility Guidelines (WCAG) 2.2 – Success Criterion 2.3.1 Three Flashes or Below Threshold', 'https://www.w3.org/TR/WCAG22/'),
      src('ITU-R BT.1702. Guidance for the reduction of photosensitive epileptic seizures caused by television', 'https://www.itu.int/rec/R-REC-BT.1702/en'),
    ],
  },
  'pfeil-duell': {
    id: 'pfeil-duell',
    evidence: 'medium',
    texts: {
      de: {
        trains: 'Nur auf das Wichtige achten: Es zählt, wohin der Pfeil zeigt – nicht, wo er steht oder wohin seine Nachbarn zeigen.',
        daily: 'Überall, wo Nebensächliches ablenkt: ein Schild lesen, während daneben etwas blinkt, oder bei der Arbeit Störendes ausblenden.',
        research:
          'Die Übung beruht auf bekannten Aufgaben aus der Forschung (räumlicher Stroop- und Flanker-Effekt). In der geübten Aufgabe wird man mit Übung schneller, auch im höheren Alter. Dass sich das auf „Konzentration allgemein“ oder den Alltag überträgt, ist nicht belegt. Der Unterschied zwischen passenden und widersprüchlichen Pfeilen schwankt von Tag zu Tag stark – deshalb ist er nur ein Zusatzwert.',
        improved:
          'Farbfrei und sprachfrei statt Farbwörter (für Menschen mit Rot-Grün-Schwäche und in beiden Sprachen gleich), passende und widersprüchliche Durchgänge je zur Hälfte gemischt, keine direkten Wiederholungen, frame-genaue Reaktionszeit, Raten unter 150 ms wird nicht gewertet, Antwortfrist passt sich an (≈ 80 % richtig).',
      },
      it: {
        trains: 'Badare solo a ciò che conta: vale la direzione della freccia – non dove si trova o dove puntano le vicine.',
        daily: 'Ovunque i dettagli secondari distraggano: leggere un cartello mentre accanto qualcosa lampeggia, o ignorare le interruzioni al lavoro.',
        research:
          'L’esercizio si basa su compiti noti della ricerca (effetto Stroop spaziale ed effetto flanker). Nel compito allenato si diventa più veloci con la pratica, anche in età avanzata. Che questo si trasferisca alla “concentrazione in generale” o alla vita quotidiana non è dimostrato. La differenza tra frecce concordi e discordanti varia molto da un giorno all’altro – per questo è solo un valore aggiuntivo.',
        improved:
          'Senza colori e senza parole invece delle parole-colore (adatto a chi confonde rosso e verde e uguale in entrambe le lingue), metà prove concordi e metà discordanti mescolate, nessuna ripetizione diretta, tempo di reazione preciso al fotogramma, risposte sotto i 150 ms non contano, il tempo a disposizione si adatta (≈ 80 % di risposte giuste).',
      },
    },
    sources: [
      src('Viviani et al. (2024). The Stroop legacy: A cautionary tale on methodological issues and a proposed spatial solution. Behavior Research Methods', 'https://doi.org/10.3758/s13428-023-02215-0'),
      src('Eriksen & Eriksen (1974). Effects of noise letters upon the identification of a target letter in a nonsearch task. Perception & Psychophysics', 'https://doi.org/10.3758/BF03203267'),
      src('Lu & Proctor (1995). The influence of irrelevant location information on performance: A review of the Simon and spatial Stroop effects. Psychonomic Bulletin & Review', 'https://doi.org/10.3758/BF03210959'),
      src('Wilkinson & Yang (2012). Plasticity of inhibition in older adults: Retest practice and transfer effects. Psychology and Aging', 'https://doi.org/10.1037/a0025926'),
      src('Hedge, Powell & Sumner (2018). The reliability paradox: Why robust cognitive tasks do not produce reliable individual differences. Behavior Research Methods', 'https://doi.org/10.3758/s13428-017-0935-1'),
      src('Birch (2012). Worldwide prevalence of red-green color deficiency. J Opt Soc Am A', 'https://doi.org/10.1364/JOSAA.29.000313'),
    ],
  },

  wachposten: {
    id: 'wachposten',
    evidence: 'medium',
    texts: {
      de: {
        trains: 'Ein paar Minuten aufmerksam bleiben und ein seltenes Zeichen nicht verpassen – auch wenn lange nichts passiert.',
        daily: 'Überall, wo man lange aufpassen muss, obwohl selten etwas geschieht: lange Autobahnfahrten, Überwachungs- und Kontrollaufgaben.',
        research:
          'Aufgaben dieser Art („Vigilanz“) werden seit Jahrzehnten erforscht. Fast allen fällt das Aufpassen mit der Zeit schwerer – das ist normal und zeigt, warum Pausen wichtig sind. Dass ein solches Training die Aufmerksamkeit im Alltag verbessert, ist nicht belegt. Die Übung ist kein Aufmerksamkeits- oder ADHS-Test.',
        improved:
          'Klassisches Format mit seltenen Zielen (keine Dublette zu „Stopp & Los“), feste Dauer ohne Zeitbonus, farbfreie Zeichen, weiches Ein- und Ausblenden statt Blitzen. Getrennt ausgewertet werden Treffer, Auslassungen, Fehlalarme und richtig ausgelassene Zeichen – je Hälfte, damit man sieht, wie gut man durchhält. Kein Alarmton bei Fehlern.',
      },
      it: {
        trains: 'Restare attenti per qualche minuto e non perdere un segnale raro – anche quando a lungo non succede nulla.',
        daily: 'Ovunque si debba stare attenti a lungo anche se accade raramente qualcosa: lunghi viaggi in autostrada, compiti di sorveglianza e controllo.',
        research:
          'I compiti di questo tipo (“vigilanza”) sono studiati da decenni. Quasi a tutti con il tempo diventa più difficile restare attenti – è normale e mostra perché le pause sono importanti. Che un allenamento del genere migliori l’attenzione nella vita quotidiana non è dimostrato. L’esercizio non è un test dell’attenzione né dell’ADHD.',
        improved:
          'Formato classico con bersagli rari (nessun doppione di “Stop o via”), durata fissa senza bonus di tempo, segni senza colori, comparsa e scomparsa morbide invece di lampi. Vengono valutati separatamente colpi, omissioni, falsi allarmi e segni giustamente ignorati – per ogni metà, così si vede quanto si tiene duro. Nessun suono d’allarme in caso di errore.',
      },
    },
    sources: [
      src('Rosvold et al. (1956). A continuous performance test of brain damage. Journal of Consulting Psychology', 'https://doi.org/10.1037/h0043220'),
      src('Warm, Parasuraman & Matthews (2008). Vigilance requires hard mental work and is stressful. Human Factors', 'https://doi.org/10.1518/001872008X312152'),
      src('Helton (2009). Impulsive responding and the sustained attention to response task. J Clin Exp Neuropsychology', 'https://doi.org/10.1080/13803390801978856'),
      src('Fortenbaugh et al. (2015). Sustained attention across the life span in a sample of 10,000: Dissociating ability and strategy. Psychological Science', 'https://doi.org/10.1177/0956797615594896'),
      src('Esterman et al. (2013). In the zone or zoning out? Tracking behavioral and neural fluctuations during sustained attention. Cerebral Cortex', 'https://doi.org/10.1093/cercor/bhs261'),
    ],
  },

  'zeichen-code': {
    id: 'zeichen-code',
    evidence: 'medium',
    texts: {
      de: {
        trains: 'Zeichen so schnell und sicher wie möglich in Zahlen übersetzen – mit einem Schlüssel, der jedes Mal neu ist.',
        daily: 'Überall, wo man Zeichen rasch zuordnet: Symbole auf Schildern und Geräten, Tabellen, Fahrpläne.',
        research:
          'Symbol-Zahl-Aufgaben werden in der Forschung genutzt, um das Verarbeitungstempo zu beschreiben – sie reagieren empfindlich auf Müdigkeit und Alter. Anfangs wird man spürbar schneller, danach erreicht man ein persönliches Niveau; das ist normal. Eine Übertragung auf andere Fähigkeiten oder den Alltag ist kaum belegt. Die Werte sind kein medizinischer Test.',
        improved:
          'Der Schlüssel steht nie in der Reihenfolge der Tasten (das Vorbild war rein über die Position lösbar), wird jede Sitzung neu gemischt und nutzt eigene, gut unterscheidbare Formen. Große Tasten, feste Dauer ohne Zeitbonus, Stufen mit 3, 6 und 9 Paaren, Hauptwert = richtige Zuordnungen pro Minute auf der erreichten Stufe.',
      },
      it: {
        trains: 'Tradurre simboli in numeri nel modo più rapido e sicuro possibile – con una chiave che cambia ogni volta.',
        daily: 'Ovunque si abbinino segni in fretta: simboli su cartelli e apparecchi, tabelle, orari.',
        research:
          'I compiti simbolo-numero sono usati nella ricerca per descrivere la velocità di elaborazione – sono sensibili alla stanchezza e all’età. All’inizio si diventa nettamente più veloci, poi si raggiunge un livello personale; è normale. Un trasferimento ad altre capacità o alla vita quotidiana è poco dimostrato. I valori non sono un test medico.',
        improved:
          'La chiave non è mai nell’ordine dei tasti (l’originale si risolveva solo con la posizione), viene rimescolata a ogni sessione e usa forme proprie ben distinguibili. Tasti grandi, durata fissa senza bonus di tempo, livelli con 3, 6 e 9 coppie, valore principale = abbinamenti corretti al minuto al livello raggiunto.',
      },
    },
    sources: [
      src('Hoyer et al. (2004). Adult age and digit symbol substitution performance: A meta-analysis. Psychology and Aging', 'https://doi.org/10.1037/0882-7974.19.1.211'),
      src('Jaeger (2018). Digit Symbol Substitution Test: The case for sensitivity over specificity in neuropsychological testing. J Clin Psychopharmacology', 'https://doi.org/10.1097/JCP.0000000000000941'),
      src('Pham et al. (2021). Smartphone-based symbol-digit modalities test reliably captures brain damage in multiple sclerosis. npj Digital Medicine', 'https://doi.org/10.1038/s41746-021-00401-y'),
      src('Benedict et al. (2012). Reliability and equivalence of alternate forms for the Symbol Digit Modalities Test. Multiple Sclerosis Journal', 'https://doi.org/10.1177/1352458511435717'),
      src('Calamia, Markon & Tranel (2012). Scoring higher the second time around: Meta-analyses of practice effects in neuropsychological assessment. The Clinical Neuropsychologist', 'https://doi.org/10.1080/13854046.2012.680913'),
    ],
  },

  zahlenjagd: {
    id: 'zahlenjagd',
    evidence: 'weak',
    texts: {
      de: {
        trains: 'Geordnet suchen: Zahlen der Reihe nach finden – später abwechselnd mit Buchstaben (1 – A – 2 – B …).',
        daily: 'Überall, wo man in einer unübersichtlichen Fläche Dinge der Reihe nach sucht: Regale, Formulare, Tastenfelder.',
        research:
          'Die Übung verbindet die bekannte Schulte-Tabelle mit dem Prinzip des „Trail Making“ (abwechselnder Pfad). Solche Aufgaben werden vor allem zum Messen verwendet; mit Wiederholung wird man darin schneller. Behauptungen, solche Tabellen würden das periphere Sehen oder das Schnelllesen trainieren, sind wissenschaftlich nicht belegt.',
        improved:
          'Große Felder und Ziffern (keine Mini-Schrift), gefundene Zahlen bleiben sichtbar (die Suche wird nicht mit jeder Zahl leichter), aufeinanderfolgende Zahlen liegen nie direkt nebeneinander, Zahlen im Kreis und Buchstaben im Quadrat (Form statt Farbe), jede Tafel neu gemischt, feste Dauer ohne Zeitbonus.',
      },
      it: {
        trains: 'Cercare con ordine: trovare i numeri in sequenza – più avanti alternati a lettere (1 – A – 2 – B …).',
        daily: 'Ovunque si cerchino cose in ordine in un’area confusa: scaffali, moduli, tastiere.',
        research:
          'L’esercizio unisce la nota tabella di Schulte al principio del “Trail Making” (percorso alternato). Compiti del genere si usano soprattutto per misurare; ripetendoli si diventa più veloci. Le affermazioni secondo cui queste tabelle allenerebbero la visione periferica o la lettura veloce non sono dimostrate scientificamente.',
        improved:
          'Caselle e cifre grandi (niente caratteri minuscoli), i numeri trovati restano visibili (la ricerca non diventa più facile a ogni numero), numeri consecutivi mai uno accanto all’altro, numeri nel cerchio e lettere nel quadrato (forma invece del colore), ogni tabella rimescolata, durata fissa senza bonus di tempo.',
      },
    },
    sources: [
      src('Reitan (1958). Validity of the Trail Making Test as an indicator of organic brain damage. Perceptual and Motor Skills', 'https://doi.org/10.2466/pms.1958.8.3.271'),
      src('Salthouse (2011). What cognitive abilities are involved in trail-making performance? Intelligence', 'https://doi.org/10.1016/j.intell.2011.03.001'),
      src('Buck, Atkinson & Ryan (2008). Evidence of practice effects in variants of the Trail Making Test during serial assessment. J Clin Exp Neuropsychology', 'https://doi.org/10.1080/13803390701390483'),
      src('Rayner et al. (2016). So much to read, so little time: How do we read, and can speed reading help? Psychological Science in the Public Interest', 'https://doi.org/10.1177/1529100615623267'),
    ],
  },

  weichensteller: {
    id: 'weichensteller',
    evidence: 'medium',
    texts: {
      de: {
        trains: 'Zwischen zwei Regeln hin- und herschalten: Mal zählt „gerade oder ungerade“, mal „kleiner oder größer als 5“ – der Rahmen zeigt, welche Regel gilt.',
        daily: 'Überall, wo man rasch umdenken muss: zwischen Aufgaben wechseln, auf neue Anweisungen reagieren.',
        research:
          'Jeder Regelwechsel kostet ein paar hundert Millisekunden – das geht allen so, mit dem Alter oft etwas mehr. Mit Übung werden die Wechsel in der Übung flüssiger, und ähnliche Wechselaufgaben profitieren teilweise mit. Dass das die Konzentration oder Intelligenz allgemein verbessert, ist nicht belegt.',
        improved:
          'Echter Aufgabenwechsel statt zweier gleichzeitiger Ströme, Regelwechsel immer angekündigt und nie nur über Farbe (Rahmenform, Symbol, Frage und Tastenform), Einzelblöcke und gemischter Block, Vorwarnzeit passt sich an. Wechsel- und Mischkosten in Millisekunden als Zusatzwerte.',
      },
      it: {
        trains: 'Passare da una regola all’altra: a volte conta “pari o dispari”, a volte “minore o maggiore di 5” – la cornice dice quale regola vale.',
        daily: 'Ovunque si debba cambiare idea in fretta: passare da un compito all’altro, reagire a nuove istruzioni.',
        research:
          'Ogni cambio di regola costa qualche centinaio di millisecondi – succede a tutti, con l’età spesso un po’ di più. Con la pratica i cambi nell’esercizio diventano più fluidi e in parte ne beneficiano anche compiti simili. Che questo migliori la concentrazione o l’intelligenza in generale non è dimostrato.',
        improved:
          'Vero cambio di compito invece di due flussi contemporanei, cambio di regola sempre annunciato e mai solo tramite il colore (forma della cornice, simbolo, domanda e forma dei tasti), blocchi singoli e blocco misto, tempo di preavviso adattivo. Costi di cambio e di mescolanza in millisecondi come valori aggiuntivi.',
      },
    },
    sources: [
      src('Rogers & Monsell (1995). Costs of a predictable switch between simple cognitive tasks. J Exp Psychology: General', 'https://doi.org/10.1037/0096-3445.124.2.207'),
      src('Kiesel et al. (2010). Control and interference in task switching – A review. Psychological Bulletin', 'https://doi.org/10.1037/a0019842'),
      src('Wasylyshyn, Verhaeghen & Sliwinski (2011). Aging and task switching: A meta-analysis. Psychology and Aging', 'https://doi.org/10.1037/a0020912'),
      src('Karbach & Kray (2009). How useful is executive control training? Age differences in near and far transfer of task-switching training. Developmental Science', 'https://doi.org/10.1111/j.1467-7687.2009.00846.x'),
      src('Karbach & Verhaeghen (2014). Making working memory work: A meta-analysis of executive-control and working memory training in older adults. Psychological Science', 'https://doi.org/10.1177/0956797614548725'),
    ],
  },

  'doppelt-gefordert': {
    id: 'doppelt-gefordert',
    evidence: 'medium',
    texts: {
      de: {
        trains: 'Zwei Dinge gleichzeitig: eine Kugel auf der Spur halten und nebenbei kurz auftauchende Formen beantworten.',
        daily: 'Überall, wo zwei Dinge auf einmal gefragt sind – beim Gehen reden, beim Kochen zuhören. (Am Steuer gilt trotzdem: nicht telefonieren.)',
        research:
          'Fast jeder wird bei zwei gleichzeitigen Aufgaben langsamer oder ungenauer – mit dem Alter oft mehr. In Laborstudien gelingt das Zusammenspiel mit Übung besser, vor allem in der geübten Aufgabe. Ob sich das auf Gehen, Autofahren oder den Alltag überträgt, ist nicht belegt.',
        improved:
          'Jede Sitzung misst erst beide Teile einzeln und dann zusammen – so zeigt der Wert „Zusammenspiel“ die echten Kosten der Doppelaufgabe statt nur Punkte. Die versprochene Bewegung ist da (fortlaufende Steueraufgabe), Schwierigkeit passt sich in den Einzelteilen an, Formen statt Farben, Mehrfinger-Bedienung.',
      },
      it: {
        trains: 'Due cose insieme: tenere una pallina sul percorso e intanto rispondere a forme che compaiono per un attimo.',
        daily: 'Ovunque servano due cose alla volta – parlare camminando, ascoltare mentre si cucina. (Al volante vale comunque: niente telefono.)',
        research:
          'Quasi tutti con due compiti contemporanei diventano più lenti o meno precisi – con l’età spesso di più. Negli studi di laboratorio con la pratica il gioco di squadra migliora, soprattutto nel compito allenato. Se questo si trasferisca al camminare, alla guida o alla vita quotidiana non è dimostrato.',
        improved:
          'Ogni sessione misura prima le due parti da sole e poi insieme – così il valore “gioco di squadra” mostra i veri costi del doppio compito invece di soli punti. Il movimento promesso c’è (compito di guida continuo), la difficoltà si adatta nelle parti singole, forme invece di colori, uso con più dita.',
      },
    },
    sources: [
      src('Pashler (1994). Dual-task interference in simple tasks: Data and theory. Psychological Bulletin', 'https://doi.org/10.1037/0033-2909.116.2.220'),
      src('Verhaeghen et al. (2003). Aging and dual-task performance: A meta-analysis. Psychology and Aging', 'https://doi.org/10.1037/0882-7974.18.3.443'),
      src('Bherer et al. (2005). Training effects on dual-task performance: Are there age-related differences in plasticity of attentional control? Psychology and Aging', 'https://doi.org/10.1037/0882-7974.20.4.695'),
      src('Anguera et al. (2013). Video game training enhances cognitive control in older adults. Nature', 'https://doi.org/10.1038/nature12486'),
      src('Strayer & Johnston (2001). Driven to distraction: Dual-task studies of simulated driving and conversing on a cellular telephone. Psychological Science', 'https://doi.org/10.1111/1467-9280.00386'),
    ],
  },

  'reihen-raetsel': {
    id: 'reihen-raetsel',
    evidence: 'strong',
    texts: {
      de: {
        trains: 'Die Regel hinter einer Zahlen-, Buchstaben- oder Formenreihe finden und die Reihe fortsetzen – in Ruhe, ohne Zeitdruck.',
        daily: 'Überall, wo man Muster erkennt und daraus schließt: Pläne und Abläufe verstehen, Regelmäßigkeiten bemerken.',
        research:
          'Ähnliche Reihen-Aufgaben wurden in einer großen Studie mit älteren Menschen (ACTIVE) in einem betreuten Kurs geübt – die geübte Fähigkeit blieb über Jahre besser. Im Alltag berichteten die Teilnehmenden nur selbst von kleinen Vorteilen; eine allgemeine Verbesserung des Denkens ist nicht belegt. Unsere Version ist davon inspiriert, aber selbst nicht untersucht.',
        improved:
          'Neu in dieser Kategorie (beim Vorbild fehlt „Denken“ ganz). Die Aufgaben werden jedes Mal neu erzeugt, die falschen Antworten entsprechen typischen Denkfehlern, und nach jeder Antwort wird die Regel in Alltagssprache erklärt – wie im Studienkurs, der Strategien vermittelte. Kein Zeitdruck, Schwierigkeit passt sich an (≈ 70 % richtig).',
      },
      it: {
        trains: 'Trovare la regola dietro una serie di numeri, lettere o forme e continuarla – con calma, senza fretta.',
        daily: 'Ovunque si riconoscano schemi e se ne traggano conclusioni: capire piani e procedure, notare regolarità.',
        research:
          'Compiti simili con serie sono stati allenati in un grande studio con persone anziane (ACTIVE) in un corso guidato – la capacità allenata è rimasta migliore per anni. Nella vita quotidiana i partecipanti hanno riferito solo piccoli vantaggi percepiti; un miglioramento generale del pensiero non è dimostrato. La nostra versione ne è ispirata, ma non è stata studiata.',
        improved:
          'Nuovo in questa categoria (nell’originale il “pensiero” manca del tutto). I compiti vengono generati ogni volta, le risposte sbagliate corrispondono a tipici errori di ragionamento e dopo ogni risposta la regola viene spiegata con parole semplici – come nel corso dello studio, che insegnava strategie. Nessuna fretta, la difficoltà si adatta (≈ 70 % di risposte giuste).',
      },
    },
    sources: [
      src('Ball et al. (2002). Effects of cognitive training interventions with older adults: A randomized controlled trial (ACTIVE). JAMA', 'https://doi.org/10.1001/jama.288.18.2271'),
      src('Willis et al. (2006). Long-term effects of cognitive training on everyday functional outcomes in older adults. JAMA', 'https://doi.org/10.1001/jama.296.23.2805'),
      src('Rebok et al. (2014). Ten-year effects of the ACTIVE cognitive training trial on cognition and everyday functioning in older adults. J Am Geriatr Soc', 'https://doi.org/10.1111/jgs.12607'),
      src('Basak, Qin & O’Connell (2020). Differential effects of cognitive training modules in healthy aging and mild cognitive impairment: A comprehensive meta-analysis. Psychology and Aging', 'https://doi.org/10.1037/pag0000442'),
      src('Stojanoski et al. (2018). Targeted training: Converging evidence against the transferable benefits of online brain training on cognitive function. Neuropsychologia', 'https://doi.org/10.1016/j.neuropsychologia.2018.07.013'),
    ],
  },
  ...Object.fromEntries(
    [leuchtfolgeScience, zahlenspanneScience, rastermusterScience, rueckblickScience, woWarEsScience, leuchtpfadScience, liegendeAchtScience, wellenbahnScience, zweiZieleScience, sekundenGefuehlScience, blicksprungGalerieScience, fuenfTuerenScience, fallendeZieleScience, hellsteKugelScience, ziehenAblegenScience].map((e) => [e.id, e]),
  ),
};

/** Allgemeine Quellen zu Aufbau und Grenzen der Übungen */
export const GENERAL_SOURCES: ScienceSource[] = [
  src('Levitt (1971). Transformed up-down methods in psychoacoustics. J Acoust Soc Am', 'https://doi.org/10.1121/1.1912375'),
  src('Kaernbach (1991). Simple adaptive testing with the weighted up-down method. Perception & Psychophysics', 'https://doi.org/10.3758/BF03214307'),
  src('Wilson et al. (2019). The Eighty Five Percent Rule for optimal learning. Nature Communications', 'https://doi.org/10.1038/s41467-019-12552-4'),
  src('Lampit, Hallock & Valenzuela (2014). Computerized cognitive training in cognitively healthy older adults: A systematic review and meta-analysis. PLoS Medicine', 'https://doi.org/10.1371/journal.pmed.1001756'),
  src('Simons et al. (2016). Do "brain-training" programs work? Psychological Science in the Public Interest', 'https://doi.org/10.1177/1529100616661983'),
  src('Pronk et al. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
];
