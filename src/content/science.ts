/**
 * Hintergrundtexte zu den Übungen (Seite "Hintergrund & Studien").
 *
 * Grundlage: docs/wissenschaft/01–04 (Recherche mit geprüften Quellen, Stand 29.09.2026).
 * Formulierungsregeln: nur beschreiben, was geübt wird und dass man in der Übung besser wird;
 * keine Wirk- oder Heilversprechen, keine Diagnose, keine Vergleiche mit anderen
 * (siehe docs/wissenschaft/01-reaktion-und-impulskontrolle.md, Abschnitt 4).
 */
import type { Lang } from '../i18n/lang';
import { science as wortstromScience } from '../exercises/wortstrom/science';
import { science as abprallFangScience } from '../exercises/abprall-fang/science';
import { science as dunkelphasenScience } from '../exercises/dunkelphasen/science';
import { science as tempoWechselScience } from '../exercises/tempo-wechsel/science';
import { science as nachziehSpurScience } from '../exercises/nachzieh-spur/science';
import { science as hoehenwechselBahnScience } from '../exercises/hoehenwechsel-bahn/science';
import { science as richtungschaosScience } from '../exercises/richtungschaos/science';
import { science as flickZieleScience } from '../exercises/flick-ziele/science';
import { science as sofortReaktionScience } from '../exercises/sofort-reaktion/science';
import { science as gegenhaltenScience } from '../exercises/gegenhalten/science';
import { science as seitwaertsFolgenScience } from '../exercises/seitwaerts-folgen/science';
import { science as randzielFlickScience } from '../exercises/randziel-flick/science';
import { science as kurvenbahnFolgenScience } from '../exercises/kurvenbahn-folgen/science';
import { science as mikrokorrekturScience } from '../exercises/mikrokorrektur/science';
import { science as zielauswahlScience } from '../exercises/zielauswahl/science';
import { science as winkelHaltenScience } from '../exercises/winkel-halten/science';
import { science as ausweichFolgenScience } from '../exercises/ausweich-folgen/science';
import { science as zickzackFolgenScience } from '../exercises/zickzack-folgen/science';
import { science as glattFolgenScience } from '../exercises/glatt-folgen/science';
import { science as hochRunterFolgenScience } from '../exercises/hoch-runter-folgen/science';
import { science as zielKlickenScience } from '../exercises/ziel-klicken/science';
import { science as tastenWahlScience } from '../exercises/tasten-wahl/science';
import { science as praezisionsFlickScience } from '../exercises/praezisions-flick/science';
import { science as zielketteScience } from '../exercises/zielkette/science';
import { science as randabwehrScience } from '../exercises/randabwehr/science';
import { science as kugelnFangenScience } from '../exercises/kugeln-fangen/science';
import { science as ausweichenScience } from '../exercises/ausweichen/science';
import { science as schrumpfendeZieleScience } from '../exercises/schrumpfende-ziele/science';
import { science as inDieBahnScience } from '../exercises/in-die-bahn/science';
import { science as rasterAusweichenScience } from '../exercises/raster-ausweichen/science';
import { science as sprossenLeiterScience } from '../exercises/sprossen-leiter/science';
import { science as gegenDenWindScience } from '../exercises/gegen-den-wind/science';
import { science as sprungAbfangenScience } from '../exercises/sprung-abfangen/science';
import { science as diagonalKorridorScience } from '../exercises/diagonal-korridor/science';
import { science as musterNachzeichnenScience } from '../exercises/muster-nachzeichnen/science';
import { science as richtungWortScience } from '../exercises/richtung-wort/science';
import { science as seiteErkennenScience } from '../exercises/seite-erkennen/science';
import { science as zahlBuchstabeWirbelScience } from '../exercises/zahl-buchstabe-wirbel/science';
import { science as vierZieleWechselScience } from '../exercises/vier-ziele-wechsel/science';
import { science as pendelballScience } from '../exercises/pendelball/science';
import { science as laborSpotTouchScience } from '../exercises/labor-spot-touch/science';
import { science as laborZieleOrdnenScience } from '../exercises/labor-ziele-ordnen/science';
import { science as laborWahlreaktionScience } from '../exercises/labor-wahlreaktion/science';
import { science as laborStartZielScience } from '../exercises/labor-start-ziel/science';

import { science as laborBlitzErkennungScience } from '../exercises/labor-blitz-erkennung/science';
import { science as laborPeripheresErkennenScience } from '../exercises/labor-peripheres-erkennen/science';
import { science as laborDoppelaufgabeScience } from '../exercises/labor-doppelaufgabe/science';

import { science as laborZielVerfolgenScience } from '../exercises/labor-ziel-verfolgen/science';
import { science as laborTaktSakkadenScience } from '../exercises/labor-takt-sakkaden/science';
import { science as laborBuchstabentafelScience } from '../exercises/labor-buchstabentafel/science';

import { science as laborSequenzGedaechtnisScience } from '../exercises/labor-sequenz-gedaechtnis/science';
import { science as laborWoerterBauenScience } from '../exercises/labor-woerter-bauen/science';
import { science as laborZeichenFindenScience } from '../exercises/labor-zeichen-finden/science';
import { science as laborMentaleRotationScience } from '../exercises/labor-mentale-rotation/science';
import { science as sanfteBlickfolgeScience } from '../exercises/sanfte-blickfolge/science';
import { science as zickzackBahnScience } from '../exercises/zickzack-bahn/science';
import { science as dreiecksbahnScience } from '../exercises/dreiecksbahn/science';
import { science as ausweichzielScience } from '../exercises/ausweichziel/science';
import { science as sprungzielScience } from '../exercises/sprungziel/science';
import { science as landepunktScience } from '../exercises/landepunkt/science';
import { science as zieleAbraeumenScience } from '../exercises/ziele-abraeumen/science';
import { science as pendelFangScience } from '../exercises/pendel-fang/science';
import { science as hinterDerDeckungScience } from '../exercises/hinter-der-deckung/science';
import { science as schwarmWechselScience } from '../exercises/schwarm-wechsel/science';
import { science as randPingScience } from '../exercises/rand-ping/science';
import { science as tippTempoScience } from '../exercises/tipp-tempo/science';
import { science as wortlisteScience } from '../exercises/wortliste/science';
import { science as ruhigeHandScience } from '../exercises/ruhige-hand/science';
import { science as spurFolgenScience } from '../exercises/spur-folgen/science';
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
          'Die Aufgabe entspricht dem in der Schlafforschung genutzten Reaktionstest (PVT), der sehr empfindlich auf Müdigkeit reagiert. In der Übung wird man anfangs besser, danach bleibt die reine Reaktionszeit meist stabil – sie gilt als kaum trainierbar. Eine Übertragung auf Straßenverkehr oder Sport ist nicht belegt. Touchscreens messen je nach Gerät 30–130 ms zu lang, deshalb nur mit sich selbst vergleichen. Messungen am Menschen streuen von Durchgang zu Durchgang; aussagekräftig ist daher der Median über viele Durchgänge, nicht ein Einzelwert.',
        improved:
          'Ein Messblock besteht aus 2 Aufwärmreizen und 24 gewerteten Reizen, je ein Drittel in der Mitte, auf einem mittleren und auf einem äußeren Ring. Die Wartezeit ist nicht vorhersagbar (1 s plus ein zufälliger Anteil), und gelegentlich folgt gar kein Licht; so lohnt sich Raten nicht. Ein Tipp vor dem Licht oder weniger als 100 ms danach zählt als „zu früh“ und wird getrennt gezählt, ohne Zeitstrafe. Gemessen wird über die Zeitstempel der Eingabe; ausgewertet werden der Median, weil er einzelne Aussetzer ausblendet, die Schwankung sowie Mitte und Rand getrennt. Ein persönliches Zeitziel passt sich an und bestimmt nur die Punkte, nicht den Reiz. Die Zeiten sind kein Normwert, sondern für den Vergleich mit sich selbst auf demselben Gerät gedacht.',
      },
      it: {
        trains: 'Reagire in modo rapido e costante a una luce che compare all’improvviso – al centro e ai lati.',
        daily: 'Ovunque qualcosa compaia inaspettatamente: nel traffico, nello sport, al lavoro.',
        research:
          'Il compito corrisponde al test di reazione usato nella ricerca sul sonno (PVT), molto sensibile alla stanchezza. All’inizio si migliora, poi il tempo di reazione puro resta per lo più stabile – è considerato poco allenabile. Un trasferimento al traffico o allo sport non è dimostrato. A seconda del dispositivo i touchscreen misurano 30–130 ms in più: confrontati solo con te stesso. Le misure sulle persone variano da una prova all’altra; è quindi significativa la mediana su molte prove, non un singolo valore.',
        improved:
          'Un blocco di misura consiste in 2 stimoli di riscaldamento e 24 stimoli valutati, un terzo al centro, un terzo su un anello intermedio e un terzo su un anello esterno. L’attesa è imprevedibile (1 s più una parte casuale) e ogni tanto non segue alcuna luce, così indovinare non conviene. Un tocco prima della luce o meno di 100 ms dopo conta come “troppo presto” e viene contato a parte, senza penalità di tempo. La misura si basa sui timestamp dell’input; si valutano la mediana, perché esclude i singoli lapsus, la variabilità e, separatamente, centro e lati. Un obiettivo di tempo personale si adatta e determina solo i punti, non lo stimolo. I tempi non sono un valore normativo, ma servono al confronto con se stessi sullo stesso dispositivo.',
      },
    },
    sources: [
      src('Basner & Dinges (2011). Maximizing sensitivity of the Psychomotor Vigilance Test (PVT) to sleep loss. Sleep', 'https://doi.org/10.1093/sleep/34.5.581'),
      src('Basner et al. (2018). Repeated administration effects on Psychomotor Vigilance Test performance. Sleep', 'https://doi.org/10.1093/sleep/zsx187'),
      src('Pronk et al. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
      src('Appelbaum & Erickson (2018). Sports vision training: A review of the state-of-the-art in digital training techniques. Int. Review of Sport and Exercise Psychology', 'https://doi.org/10.1080/1750984X.2016.1266376'),
      src('Guo et al. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
      src('Mountford, Ruston & Dave (2004). Orthokeratology: Principles and Practice, S. 43–44. Butterworth-Heinemann', 'https://openlibrary.org/isbn/9780750640077'),
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
          'Go/No-Go ist eine klassische Aufgabe zur Impulskontrolle. In der Aufgabe selbst wird man mit Übung schneller und treffsicherer. Ein Training der Impulskontrolle übertrug sich in Studien aber nicht auf andere Aufgaben oder auf das Fahren im Simulator. Mit nur zehn Stopp-Zeichen je Block streut die Fehlerquote bei Rot; aussagekräftig ist der Verlauf über mehrere Blöcke.',
        improved:
          'Ein Block besteht aus 40 Durchgängen, genau ein Viertel davon sind Stopp-Zeichen, nie mehr als zwei in Folge. Weil meist Grün kommt, wird das Tippen zur Gewohnheit, und das Zurückhalten bei Rot fordert wirklich. Die Antwortfrist passt sich nur über die grünen Zeichen an; ein Tipp bei Rot verändert sie nicht, damit Ungeduld nicht belohnt wird. Grün und Rot unterscheiden sich zusätzlich in Form und Helligkeit (heller Kreis, dunkleres Achteck mit Balken), weil eine Rot-Grün-Schwäche etwa 8 % der Männer betrifft. Tipps in der Pause werden nur gezählt, nicht bestraft; ausgewertet werden die erreichte Stufe, die Reaktionszeit bei Grün, Tipps bei Rot und Verpasstes getrennt.',
      },
      it: {
        trains: 'Reagire in fretta – e trattenere al momento giusto una reazione già pronta.',
        daily: 'Situazioni in cui bisogna fermare un movimento: non partire anche se si voleva; riconoscere una finta nello sport.',
        research:
          'Il Go/No-Go è un classico compito sul controllo degli impulsi. Nel compito stesso, con l’allenamento si diventa più veloci e precisi. Negli studi, però, l’allenamento del controllo degli impulsi non si è trasferito ad altri compiti né alla guida al simulatore. Con soli dieci segnali di stop per blocco la quota di errori sul rosso varia molto; è significativo l’andamento su più blocchi.',
        improved:
          'Un blocco consiste in 40 prove, esattamente un quarto sono segnali di stop, mai più di due di seguito. Poiché per lo più compare il verde, toccare diventa un’abitudine e trattenersi sul rosso è davvero impegnativo. Il tempo di risposta si adatta solo con i segnali verdi; un tocco sul rosso non lo modifica, così l’impazienza non viene premiata. Verde e rosso si distinguono anche per forma e luminosità (cerchio chiaro, ottagono più scuro con barra), perché il daltonismo rosso-verde riguarda circa l’8 % degli uomini. I tocchi durante la pausa vengono solo contati, non penalizzati; si valutano separatamente il livello raggiunto, il tempo di reazione sul verde, i tocchi sul rosso e i mancati.',
      },
    },
    sources: [
      src('Wessel (2018). Prepotent motor activity and inhibitory control demands in different variants of the go/no-go paradigm. Psychophysiology', 'https://doi.org/10.1111/psyp.12871'),
      src('Enge et al. (2014). No evidence for true training and transfer effects after inhibitory control training in young healthy adults. J Exp Psychol: LMC', 'https://doi.org/10.1037/a0036165'),
      src('Hatfield et al. (2018). The effects of training impulse control on simulated driving. Accident Analysis & Prevention', 'https://doi.org/10.1016/j.aap.2018.06.012'),
      src('Birch (2012). Worldwide prevalence of red-green color deficiency. JOSA A', 'https://doi.org/10.1364/JOSAA.29.000313'),
      src('Mountford, Ruston & Dave (2004). Orthokeratology: Principles and Practice, S. 43–44. Butterworth-Heinemann', 'https://openlibrary.org/isbn/9780750640077'),
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
          'Beim Abfangen sagt das Gehirn die Bahn laufend voraus und korrigiert ständig nach – bei schnellen Zielen tippt man typischerweise leicht dahinter. In der Aufgabe werden Treffsicherheit und Timing mit Übung besser. Dass sich das auf Ballsport oder Alltag überträgt, ist nur schwach belegt. Eine ähnliche Zeigebewegung nutzen Ärzte klinisch (Finger-Nase-Versuch); die Übung ist kein solcher Test und ersetzt keine Untersuchung.',
        improved:
          'Der Punkt bewegt sich in Echtzeit und ist deshalb auf 60- und 120-Hz-Geräten und auf jeder Bildschirmgröße gleich schnell. Mit der Stufe wird er schneller, etwas kleiner und bleibt kürzer; drei gefangene Ziele machen es schwerer, ein verfehltes leichter, sodass etwa vier von fünf Zielen gelingen. Das Tempo schwankt von Ziel zu Ziel leicht, und ab Stufe 6 laufen sanfte Kurven, damit man jedes Mal neu vorausschätzen muss. Die Trefferfläche ist größer als der sichtbare Punkt und auf den Finger abgestimmt. Bei jedem Tipp wird gemessen, ob er hinter oder vor dem Punkt liegt; daraus entsteht am Ende der persönliche Tipp. Die Runde dauert 45 s, Fehltipps kosten keine Zeit.',
      },
      it: {
        trains: 'Occhio e mano insieme: vedere un bersaglio in movimento, prevederne il percorso e colpirlo al momento giusto.',
        daily: 'Prendere una palla, afferrare qualcosa che rotola, giocare con bambini o nipoti, sport con la racchetta.',
        research:
          'Per intercettare, il cervello prevede continuamente il percorso e corregge di continuo – con bersagli veloci di solito si tocca un po’ dietro. Nel compito precisione e tempismo migliorano con l’allenamento. Il trasferimento agli sport con la palla o alla vita quotidiana è dimostrato solo debolmente. Un movimento di puntamento simile viene usato clinicamente dai medici (prova indice-naso); l’esercizio non è un test del genere e non sostituisce una visita.',
        improved:
          'Il punto si muove in tempo reale ed è quindi ugualmente veloce su schermi a 60 e 120 Hz e con qualsiasi dimensione dello schermo. Con il livello diventa più veloce, un po’ più piccolo e resta visibile meno a lungo; tre bersagli presi rendono tutto più difficile, uno mancato più facile, così riescono circa quattro bersagli su cinque. La velocità varia leggermente da bersaglio a bersaglio e dal livello 6 compaiono curve dolci, così bisogna ogni volta stimare di nuovo in anticipo. L’area di tocco è più grande del punto visibile ed è adatta al dito. A ogni tocco si misura se cade dietro o davanti al punto; ne nasce il consiglio personale alla fine. Il turno dura 45 s e i tocchi sbagliati non costano tempo.',
      },
    },
    sources: [
      src('Brenner & Smeets (2018). Continuously updating one\u2019s predictions underlies successful interception. J Neurophysiology', 'https://doi.org/10.1152/jn.00517.2018'),
      src('Brouwer, Brenner & Smeets (2002). Hitting moving objects: Is target speed used in guiding the hand? Experimental Brain Research', 'https://doi.org/10.1007/s00221-001-0980-x'),
      src('Laby & Appelbaum (2021). Vision and on-field performance: A critical review of visual assessment and training studies with athletes. Optometry and Vision Science', 'https://doi.org/10.1097/OPX.0000000000001729'),
      src('Parhi, Karlson & Bederson (2006). Target size study for one-handed thumb use on small touchscreen devices. MobileHCI', 'https://doi.org/10.1145/1152215.1152260'),
      src('Muchnick (2008). Clinical Medicine in Optometric Practice, 2nd ed., S. 6, 28. Mosby/Elsevier', 'https://openlibrary.org/isbn/9780323029612'),
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
          'Details auf bewegten Objekten zu erkennen ist eine eigene Fähigkeit, die mit dem Tempo und im Alter nachlässt. In Laborstudien ließ sie sich durch Üben verbessern. Eine Wirkung auf Alltag, Verkehr oder Sport ist nicht nachgewiesen. Die Übung ersetzt keine Brille und keine Untersuchung – eine gut angepasste Nahkorrektur ist Voraussetzung. Ärzte prüfen die Augenfolgebewegung anders, etwa mit dem „H“-Muster; diese Übung ist keine Prüfung und misst die Augenbewegung nicht. Bei neuen Doppelbildern oder plötzlichem Sehverlust gehört die Abklärung zur Ärztin oder zum Arzt, nicht in die Übung.',
        improved:
          'Man folgt dem Ball nur mit den Augen; ein kurz eingeblendetes Sehzeichen (Landolt-Ring) im Ball macht das Mitgehen zur Voraussetzung der Aufgabe, denn nur wer dem Ball ruhig folgt, erkennt die Öffnung. Das Zeichen hat eine feste Größe unabhängig vom Ball und vier mögliche Richtungen; beantwortet wird mit einem großen Knopf, nicht mit dem Finger auf dem Ball, und die Knöpfe leuchten erst nach dem Zeichen auf, damit sie den Blick nicht weglocken. Das Tempo passt sich an (nach drei richtigen Antworten schneller, nach einer falschen langsamer), und die Anzeigedauer des Zeichens sinkt von 0,5 auf 0,22 s. Die Bahn ist weich und nicht vorhersehbar und wird in Echtzeit gerechnet, ist also auf jedem Gerät gleich schnell. Das Ergebnis zeigt, ob das Zeichen erkannt wurde, nicht wie die Augen dem Ball folgen.',
      },
      it: {
        trains: 'Seguire con calma con lo sguardo un bersaglio in movimento e riconoscere nel frattempo un piccolo dettaglio.',
        daily: 'Leggere cartelli o numeri civici passando, tenere d’occhio una palla, un tabellone.',
        research:
          'Riconoscere dettagli su oggetti in movimento è una capacità a sé, che cala con la velocità e con l’età. Negli studi di laboratorio è migliorata con l’esercizio. Un effetto sulla vita quotidiana, sul traffico o sullo sport non è dimostrato. L’esercizio non sostituisce occhiali né visite – una buona correzione da vicino è il presupposto. I medici esaminano i movimenti oculari di inseguimento in altro modo, per esempio con lo schema a «H»; questo esercizio non è un esame e non misura il movimento degli occhi. In caso di nuova visione doppia o perdita improvvisa della vista bisogna rivolgersi al medico, non esercitarsi.',
        improved:
          'Si segue la palla solo con gli occhi; un simbolo mostrato per un attimo (anello di Landolt) dentro la palla rende il seguirla una condizione del compito, perché solo chi segue la palla con calma riconosce l’apertura. Il simbolo ha una dimensione fissa, indipendente dalla palla, e quattro direzioni possibili; si risponde con un grande pulsante e non con il dito sulla palla, e i pulsanti si illuminano solo dopo il simbolo, per non distogliere lo sguardo. La velocità si adatta (dopo tre risposte giuste più veloce, dopo una sbagliata più lenta) e il tempo di visualizzazione del simbolo scende da 0,5 a 0,22 s. Il percorso è fluido e imprevedibile e viene calcolato in tempo reale, quindi ha la stessa velocità su ogni dispositivo. Il risultato mostra se il simbolo è stato riconosciuto, non come gli occhi seguono la palla.',
      },
    },
    sources: [
      src('Long & Rourke (1989). Training effects on the resolution of moving targets – dynamic visual acuity. Human Factors', 'https://doi.org/10.1177/001872088903100407'),
      src('Long & Crambert (1990). The nature and basis of age-related changes in dynamic visual acuity. Psychology and Aging', 'https://doi.org/10.1037/0882-7974.5.1.138'),
      src('Uchida et al. (2012). Origins of superior dynamic visual acuity in baseball players. PLoS ONE', 'https://doi.org/10.1371/journal.pone.0031530'),
      src('Shekar et al. (2021). Efficacy of a digital sports vision training program for improving visual abilities in collegiate baseball and softball athletes. Optometry and Vision Science', 'https://doi.org/10.1097/OPX.0000000000001740'),
      src('Muchnick (2008). Clinical Medicine in Optometric Practice, 2nd ed., S. 6, 32–35. Mosby/Elsevier', 'https://openlibrary.org/isbn/9780323029612'),
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
          'Das "Multiple Object Tracking" ist gut erforscht: In der Aufgabe wird man durch Üben zuverlässig besser – auch im höheren Alter. Ob sich das auf Sport oder Straßenverkehr überträgt, ist bisher nicht belegt; eine Nachfolgestudie im Fußball fand keinen Effekt. Hilfreich ist, in die Mitte der Gruppe zu schauen statt einzelnen Kugeln hinterherzublicken. Fällt ein Teil des Gesichtsfelds aus, sind Kugeln dort nicht sichtbar; das ist kein Übungsfehler, unklare Ausfälle gehören augenärztlich abgeklärt.',
        improved:
          'Eine Sitzung besteht aus sechs kurzen Runden mit je sechs Sekunden Verfolgen, weil sich die Kapazität in kurzen Durchgängen sauberer erfassen lässt als in einem langen. Nach einer fehlerfreien Runde wird das Tempo etwas höher, nach einem Fehler deutlich niedriger, sodass etwa drei von vier Runden fehlerfrei gelingen. Alle Kugeln sind gleich schnell und bewegen sich weich; nahe Kugeln drehen sanft voneinander weg, statt hart zu stoßen, denn enge Begegnungen sind die häufigste Ursache für Verwechslungen. Das Tempo wird in Echtzeit gerechnet und ist auf jedem Gerät gleich. Ein Punkt in der Mitte bietet dem Blick einen Halt, ohne ihn vorzuschreiben; die Auflösung zeigt Treffer und Fehler mit Form und Farbe.',
      },
      it: {
        trains: 'Tenere d’occhio più oggetti in movimento allo stesso tempo, mentre altri simili distraggono.',
        daily: 'Incroci con auto, bici e pedoni, sport di squadra, bambini al parco giochi.',
        research:
          'Il “Multiple Object Tracking” è molto studiato: nel compito si migliora in modo affidabile con l’allenamento – anche in età avanzata. Non è dimostrato che questo si trasferisca allo sport o al traffico; uno studio successivo nel calcio non ha trovato effetti. Aiuta guardare al centro del gruppo invece di inseguire le singole palline. Se una parte del campo visivo è assente, le palline lì non si vedono; non è un errore dell’esercizio e le lacune poco chiare vanno fatte controllare dall’oculista.',
        improved:
          'Una sessione consiste in sei brevi turni con sei secondi di inseguimento ciascuno, perché la capacità si rileva in modo più pulito in prove brevi che in una lunga. Dopo un turno senza errori la velocità aumenta un po’, dopo un errore diminuisce nettamente, così circa tre turni su quattro riescono senza errori. Tutte le palline hanno la stessa velocità e si muovono in modo fluido; quelle vicine si allontanano dolcemente invece di urtarsi, perché gli incontri ravvicinati sono la causa più frequente di scambi. La velocità è calcolata in tempo reale ed è uguale su ogni dispositivo. Un punto al centro offre allo sguardo un appoggio senza imporlo; la risoluzione mostra successi ed errori con forma e colore.',
      },
    },
    sources: [
      src('Pylyshyn & Storm (1988). Tracking multiple independent targets: Evidence for a parallel tracking mechanism. Spatial Vision', 'https://doi.org/10.1163/156856888X00122'),
      src('Legault, Allard & Faubert (2013). Healthy older observers show equivalent perceptual-cognitive training benefits to young adults for multiple object tracking. Frontiers in Psychology', 'https://doi.org/10.3389/fpsyg.2013.00323'),
      src('Fehd & Seiffert (2008). Eye movements during multiple object tracking: Where do participants look? Cognition', 'https://doi.org/10.1016/j.cognition.2007.11.008'),
      src('Vater, Gray & Holcombe (2021). A critical systematic review of the Neurotracker perceptual-cognitive training tool. Psychonomic Bulletin & Review', 'https://doi.org/10.3758/s13423-021-01892-2'),
      src('Romeas et al. (2025). No transfer of 3D-Multiple Object Tracking training on game performance in soccer. Psychology of Sport and Exercise', 'https://doi.org/10.1016/j.psychsport.2024.102770'),
      src('Muchnick (2008). Clinical Medicine in Optometric Practice, 2nd ed., S. 32. Mosby/Elsevier', 'https://openlibrary.org/isbn/9780323029612'),
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
          'Wie schnell ein Bild größer wird, verrät dem Gehirn die Zeit bis zum Kontakt – ein seit den 1970er-Jahren gut untersuchtes Prinzip. In solchen Timing-Aufgaben wird man mit Übung besser. Ob sich das auf Verkehr oder Sport überträgt, ist nicht belegt. Echtes räumliches (3D-)Sehen lässt sich an einem normalen Bildschirm nicht trainieren – die Übung nutzt Hinweise, die man auch mit einem Auge sieht. Ein konstantes „zu spät“ kann zum Teil an der Gerätelatenz liegen; deshalb zählt der Verlauf am selben Gerät, nicht der Einzelwert.',
        improved:
          'Die Kugel nähert sich wie ein echter Ball mit gleichbleibender Geschwindigkeit: Ihr Bild wächst nicht linear, sondern zum Schluss immer schneller, und genau daran lässt sich die Ankunftszeit ablesen. Startgröße, Flugzeit und Vorlauf sind zufällig, damit man nicht zählen oder einen Rhythmus nutzen kann. Als Schwierigkeitsstufe verschwindet die Kugel in den letzten 0,2 bis 1,2 s vor dem Ring, sodass man ihre Ankunft gedanklich fortführen muss. Nach jedem Tipp zeigt die Übung die Abweichung in Millisekunden („zu früh“ oder „zu spät“) mit einem Zeitbalken; die Tippzeit stammt aus dem Zeitstempel des Ereignisses, und die Stufe passt sich an (nach drei gelungenen Versuchen schwerer, nach einem Fehlversuch leichter). Es geht um Timing, nicht um räumliches Sehen: Am flachen Bildschirm sehen beide Augen dasselbe Bild.',
      },
      it: {
        trains: 'Stimare il momento in cui qualcosa ti arriva addosso – solo dal modo in cui diventa più grande.',
        daily: 'Frenare, mantenere la distanza, attraversare la strada, prendere o colpire una palla.',
        research:
          'La velocità con cui un’immagine si ingrandisce rivela al cervello il tempo al contatto – un principio ben studiato dagli anni ’70. In questi compiti di tempismo si migliora con l’allenamento. Non è dimostrato che questo si trasferisca al traffico o allo sport. La vera visione tridimensionale non si può allenare su uno schermo normale – l’esercizio usa indizi visibili anche con un occhio solo. Un «troppo tardi» costante può dipendere in parte dalla latenza del dispositivo; conta quindi l’andamento sullo stesso dispositivo, non il singolo valore.',
        improved:
          'La palla si avvicina come una vera palla a velocità costante: la sua immagine non cresce in modo lineare, ma sempre più in fretta verso la fine, ed è proprio da questo che si legge il momento dell’arrivo. Dimensione iniziale, durata del volo e fase di attesa sono casuali, così non si può contare né sfruttare un ritmo. Come livello di difficoltà la palla scompare negli ultimi 0,2–1,2 s prima dell’anello, e si deve proseguire mentalmente il suo arrivo. Dopo ogni tocco l’esercizio mostra lo scarto in millisecondi («troppo presto» o «troppo tardi») con una barra del tempo; il momento del tocco viene dal timestamp dell’evento e il livello si adatta (dopo tre prove riuscite più difficile, dopo una fallita più facile). Conta il tempismo, non la visione spaziale: su uno schermo piatto entrambi gli occhi vedono la stessa immagine.',
      },
    },
    sources: [
      src('Lee (1976). A theory of visual control of braking based on information about time-to-collision. Perception', 'https://doi.org/10.1068/p050437'),
      src('Gray & Regan (1998). Accuracy of estimating time to collision using binocular and monocular information. Vision Research', 'https://doi.org/10.1016/S0042-6989(97)00230-7'),
      src('Tresilian (1995). Perceptual and cognitive processes in time-to-contact estimation. Perception & Psychophysics', 'https://doi.org/10.3758/BF03206510'),
      src('Ding & Levi (2011). Recovery of stereopsis through perceptual learning in human adults with abnormal binocular vision. PNAS', 'https://doi.org/10.1073/pnas.1105183108'),
      src('Mountford, Ruston & Dave (2004). Orthokeratology: Principles and Practice, S. 43–44. Butterworth-Heinemann', 'https://openlibrary.org/isbn/9780750640077'),
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
          'Visuelle Suche gehört zu den am besten erforschten Aufgaben: Je ähnlicher Ziel und Ablenker und je mehr Elemente, desto länger dauert es. Suchaufgaben werden mit Übung nachweislich schneller, oft schon nach wenigen hundert Durchgängen und dauerhaft. Ein Nutzen für das Suchen im Alltag ist möglich, aber bei Gesunden nicht bewiesen. Dicht gedrängte Zeichen werden schlechter erkannt als einzelne (Crowding); deshalb sind die Abstände hier großzügig gewählt.',
        improved:
          'Das Suchfeld wird in 12 Stufen schwerer: Zeichenzahl (12 bis 56) und Ähnlichkeit von Ziel und Ablenkern steigen, die Abstände werden enger, bleiben aber so groß, dass sich Nachbarn nicht gegenseitig verdrängen (Crowding). Auch die schwere Suchrichtung kommt vor: Ein O zwischen C ist schwerer zu finden als ein C zwischen O, weil dem Ziel dann ein Merkmal fehlt. Eine Suche gilt als gelungen, wenn das Ziel in 1,2 s plus 75 ms je Zeichen gefunden wird; die Stufe passt sich so an, dass etwa sieben von zehn Suchen gelingen. Buchstaben werden nach ihrer sichtbaren Form zentriert, damit sich b, d, p und q nicht durch Ober- und Unterlängen verraten, und die Tippflächen sind groß. Fehltipps kosten nichts, werden aber gezählt.',
      },
      it: {
        trains: 'Trovare in modo mirato un certo simbolo tra tanti simili.',
        daily: 'Cartelli nel traffico, prodotti sullo scaffale, orari, schermi.',
        research:
          'La ricerca visiva è tra i compiti più studiati: più bersaglio e distrattori sono simili e più elementi ci sono, più tempo serve. Con l’allenamento la ricerca diventa dimostrabilmente più veloce, spesso già dopo qualche centinaio di prove e in modo duraturo. Un beneficio nella vita quotidiana è possibile, ma nelle persone sane non è dimostrato. I segni molto ravvicinati vengono riconosciuti peggio di quelli isolati (crowding); per questo qui le distanze sono generose.',
        improved:
          'Il campo di ricerca diventa più difficile in 12 livelli: aumentano il numero di segni (da 12 a 56) e la somiglianza tra bersaglio e distrattori, le distanze si riducono ma restano abbastanza ampie da evitare che i segni vicini si disturbino a vicenda (crowding). Compare anche la direzione di ricerca difficile: una O tra molte C è più difficile da trovare di una C tra molte O, perché al bersaglio manca una caratteristica. Una ricerca è riuscita se il bersaglio viene trovato entro 1,2 s più 75 ms per segno; il livello si adatta in modo che riescano circa sette ricerche su dieci. Le lettere vengono centrate sulla loro forma visibile, così b, d, p e q non si distinguono per le aste ascendenti e discendenti, e le aree di tocco sono grandi. I tocchi sbagliati non costano nulla, ma vengono contati.',
      },
    },
    sources: [
      src('Treisman & Gelade (1980). A feature-integration theory of attention. Cognitive Psychology', 'https://doi.org/10.1016/0010-0285(80)90005-5'),
      src('Treisman & Souther (1985). Search asymmetry: A diagnostic for preattentive processing of separable features. J Exp Psychol: General', 'https://doi.org/10.1037/0096-3445.114.3.285'),
      src('Duncan & Humphreys (1989). Visual search and stimulus similarity. Psychological Review', 'https://doi.org/10.1037/0033-295X.96.3.433'),
      src('Sireteanu & Rettenbach (1995). Perceptual learning in visual search: Fast, enduring, but non-specific. Vision Research', 'https://doi.org/10.1016/0042-6989(94)00295-W'),
      src('Bouma (1970). Interaction effects in parafoveal letter recognition. Nature', 'https://doi.org/10.1038/226177a0'),
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
          'Die Übung ist an einen gut untersuchten Test angelehnt ("Useful Field of View"). In einer großen Studie mit älteren Menschen (ACTIVE) verbesserte ein ähnliches, betreutes Training genau diese Fähigkeit deutlich und über Jahre. Unsere Online-Version ist davon inspiriert, aber selbst nicht wissenschaftlich geprüft – sie ersetzt keine Fahreignungs- oder Sehuntersuchung. Bei Gesichtsfeldausfällen können Randreize im Ausfallbereich liegen; das ist kein Übungsfehler, und unklare Ausfälle gehören augenärztlich abgeklärt.',
        improved:
          'Jeder Durchgang folgt dem Aufbau der Studienprotokolle: Nach einer kurzen Fixation erscheinen für einen Moment ein Fahrzeug in der Mitte und ein Stern an einer von acht Randpositionen, ab Stufe 9 zusätzlich Dreiecke als Ablenker; danach überdeckt eine Maske das Bild, damit kein Nachbild hilft. Geantwortet wird zweimal (Fahrzeug und Position), und nur wenn beides stimmt, zählt der Durchgang; Raten gelingt so nur in einem von 16 Fällen. Die Anzeigezeit wird in ganzen Bildern aus der gemessenen Bildrate umgesetzt, von 0,5 s bis hinunter zu einem einzigen Bild, und Durchgänge mit Rucklern zählen nicht für die Stufe. Nach einer richtigen Antwort wird es eine Stufe schwerer, nach einer falschen drei Stufen leichter, sodass etwa drei von vier Durchgängen gelingen. Die Reize sind kurz und ohne Flimmern, die Maske ist weich; die Übung ist kein Sehfeldtest und sagt nichts über die Fahreignung.',
      },
      it: {
        trains: 'Cogliere in un attimo, allo stesso tempo, cosa c’è al centro e cosa ai lati.',
        daily: 'Guidare, incroci, folle – ovunque serva tenere d’occhio centro e dintorni insieme.',
        research:
          'L’esercizio si ispira a un test molto studiato (“Useful Field of View”). In un grande studio con persone anziane (ACTIVE) un allenamento simile e supervisionato ha migliorato proprio questa capacità in modo netto e per anni. La nostra versione online ne è ispirata, ma non è stata verificata scientificamente – non sostituisce visite di idoneità alla guida o della vista. In caso di deficit del campo visivo gli stimoli periferici possono cadere nell’area assente; non è un errore dell’esercizio e le lacune poco chiare vanno fatte controllare dall’oculista.',
        improved:
          'Ogni prova segue la struttura dei protocolli degli studi: dopo una breve fissazione compaiono per un attimo un veicolo al centro e una stella in una di otto posizioni periferiche, dal livello 9 anche triangoli come distrattori; poi una maschera copre l’immagine, perché nessuna immagine residua possa aiutare. Si risponde due volte (veicolo e posizione) e la prova conta solo se entrambe le risposte sono giuste; così indovinare riesce solo una volta su 16. Il tempo di visualizzazione viene realizzato in fotogrammi interi in base alla frequenza misurata, da 0,5 s fino a un solo fotogramma, e le prove con scatti non contano per il livello. Dopo una risposta giusta il livello sale di uno, dopo una sbagliata scende di tre, così riescono circa tre prove su quattro. Gli stimoli sono brevi e senza sfarfallio, la maschera è morbida; l’esercizio non è un test del campo visivo e non dice nulla sull’idoneità alla guida.',
      },
    },
    sources: [
      src('Ball et al. (2002). Effects of cognitive training interventions with older adults: A randomized controlled trial (ACTIVE). JAMA', 'https://doi.org/10.1001/jama.288.18.2271'),
      src('Ball et al. (2010). Cognitive training decreases motor vehicle collision involvement of older drivers. J Am Geriatr Soc', 'https://doi.org/10.1111/j.1532-5415.2010.03138.x'),
      src('Aust & Edwards (2016). Incremental validity of Useful Field of View subtests for the prediction of instrumental activities of daily living. J Clin Exp Neuropsychology', 'https://doi.org/10.1080/13803395.2015.1125453'),
      src('Simons et al. (2016). Do "brain-training" programs work? Psychological Science in the Public Interest', 'https://doi.org/10.1177/1529100616661983'),
      src('Muchnick (2008). Clinical Medicine in Optometric Practice, 2nd ed., S. 32. Mosby/Elsevier', 'https://openlibrary.org/isbn/9780323029612'),
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
          'Menschen können Taktunterschiede von etwa 8 % unterscheiden. Trainingsstudien bei Gesunden gibt es kaum, ein Alltagsnutzen ist nicht belegt. Die "Flimmerverschmelzung" (50–90 Hz) lässt sich an einem Bildschirm weder messen noch trainieren – das behaupten wir deshalb auch nicht. Wer an einem Anfallsleiden leidet oder sehr lichtempfindlich ist, sollte vorher ärztlich Rücksprache halten.',
        improved:
          'Alle Felder pulsieren gleich hell und mit zufälliger Phase, sodass sich das abweichende Feld nur über den Rhythmus finden lässt, nicht über Helligkeit oder Gleichtakt der Nachbarn. Das Grundtempo wechselt von Durchgang zu Durchgang, damit man keinen festen Takt lernen kann, und das Zielfeld ist zufällig schneller oder langsamer. Der Tempounterschied beginnt bei 40 % und wird nach zwei richtigen Antworten kleiner, nach einer falschen wieder größer; geantwortet werden kann erst nach zwei Sekunden Zuschauen, denn der Vergleich braucht mehrere Pulse und Raten lohnt nicht. Für das Pulsieren gelten strenge Sicherheitsgrenzen: höchstens 2,5 Pulse pro Sekunde, ein sanfter Verlauf mit geringem Helligkeitsunterschied, kein Rot, keine Störblitze und nach höchstens neun Sekunden ein ruhiges Standbild. Die Rückmeldung erscheint als ruhiger Rahmen.',
      },
      it: {
        trains: 'Riconoscere piccole differenze di ritmo: quale riquadro pulsa diversamente dagli altri?',
        daily: 'Un tranquillo gioco di concentrazione – per esempio come pausa tra gli altri esercizi.',
        research:
          'Le persone distinguono differenze di ritmo di circa l’8 %. Studi di allenamento su persone sane quasi non esistono e un beneficio nella vita quotidiana non è dimostrato. La “fusione dello sfarfallio” (50–90 Hz) su uno schermo non si può né misurare né allenare – per questo non lo affermiamo. Chi soffre di crisi epilettiche o è molto sensibile alla luce dovrebbe prima consultare un medico.',
        improved:
          'Tutti i riquadri pulsano con la stessa luminosità e con fase casuale, così il riquadro diverso si trova solo dal ritmo, non dalla luminosità né dal sincronismo dei vicini. Il ritmo di base cambia da una prova all’altra, per non poter imparare un tempo fisso, e il riquadro bersaglio è a caso più veloce o più lento. La differenza di ritmo parte dal 40 % e dopo due risposte giuste diventa più piccola, dopo una sbagliata di nuovo più grande; si può rispondere solo dopo due secondi di osservazione, perché il confronto richiede più impulsi e tirare a indovinare non conviene. Per la pulsazione valgono limiti di sicurezza severi: al massimo 2,5 impulsi al secondo, un andamento dolce con poca differenza di luminosità, niente rosso, niente lampi di disturbo e, dopo al massimo nove secondi, un’immagine ferma e calma. Il riscontro appare come una cornice tranquilla.',
      },
    },
    sources: [
      src('Mandler (1984). Temporal frequency discrimination above threshold. Vision Research', 'https://doi.org/10.1016/0042-6989(84)90020-8'),
      src('Harding et al. (2005). Photic- and pattern-induced seizures: Expert consensus of the Epilepsy Foundation of America Working Group. Epilepsia', 'https://doi.org/10.1111/j.1528-1167.2005.31305.x'),
      src('W3C (2023). Web Content Accessibility Guidelines (WCAG) 2.2 – Success Criterion 2.3.1 Three Flashes or Below Threshold', 'https://www.w3.org/TR/WCAG22/'),
      src('ITU-R BT.1702. Guidance for the reduction of photosensitive epileptic seizures caused by television', 'https://www.itu.int/rec/R-REC-BT.1702/en'),
      src('Muchnick (2008). Clinical Medicine in Optometric Practice, 2nd ed., S. 7. Mosby/Elsevier', 'https://openlibrary.org/isbn/9780323029612'),
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
          'Die Übung beruht auf bekannten Aufgaben aus der Forschung (räumlicher Stroop- und Flanker-Effekt). In der geübten Aufgabe wird man mit Übung schneller, auch im höheren Alter. Dass sich das auf „Konzentration allgemein“ oder den Alltag überträgt, ist nicht belegt. Der Unterschied zwischen passenden und widersprüchlichen Pfeilen schwankt von Tag zu Tag stark – deshalb ist er nur ein Zusatzwert. Wie bei jeder Messung am Menschen sagt der Median vieler Durchgänge mehr als ein Einzelwert (Mountford et al. 2004, aus der Hornhautvermessung übertragen).',
        improved:
          'Der Pfeil erscheint farbfrei und sprachfrei, sodass die Aufgabe in beiden Sprachen gleich ist und auch bei Rot-Grün-Schwäche funktioniert. Zuerst zeigt er nach links oder rechts, später in eine von vier Diagonalrichtungen; Nachbarpfeile kommen erst danach hinzu. Passende und widersprüchliche Durchgänge sind je zur Hälfte gemischt, ohne direkte Wiederholung von Richtung oder Platz. Die Reaktionszeit wird bildgenau erfasst, Antworten unter 150 ms gelten als geraten und zählen nicht. Die Antwortfrist passt sich so an, dass etwa vier von fünf Antworten richtig sind; gezeigt werden die erreichte Stufe, die Treffsicherheit und der Median der Reaktionszeit, der Zeitverlust durch widersprüchliche Reize nur als Zusatzwert.',
      },
      it: {
        trains: 'Badare solo a ciò che conta: vale la direzione della freccia – non dove si trova o dove puntano le vicine.',
        daily: 'Ovunque i dettagli secondari distraggano: leggere un cartello mentre accanto qualcosa lampeggia, o ignorare le interruzioni al lavoro.',
        research:
          'L’esercizio si basa su compiti noti della ricerca (effetto Stroop spaziale ed effetto flanker). Nel compito allenato si diventa più veloci con la pratica, anche in età avanzata. Che questo si trasferisca alla “concentrazione in generale” o alla vita quotidiana non è dimostrato. La differenza tra frecce concordi e discordanti varia molto da un giorno all’altro – per questo è solo un valore aggiuntivo. Come in ogni misurazione sulle persone, la mediana di molte prove dice più di un singolo valore (Mountford et al. 2004, principio tratto dalla misurazione della cornea).',
        improved:
          'La freccia compare senza colori e senza parole, così il compito è identico nelle due lingue e funziona anche per chi confonde rosso e verde. All’inizio punta a sinistra o a destra, poi in una di quattro direzioni diagonali; le frecce vicine si aggiungono solo dopo. Le prove concordi e quelle discordanti sono mescolate metà e metà, senza ripetizioni dirette di direzione o posizione. Il tempo di reazione è rilevato con precisione al fotogramma; le risposte sotto i 150 ms valgono come tentativi a caso e non vengono contate. Il tempo a disposizione si adatta in modo che circa quattro risposte su cinque siano giuste; vengono mostrati il livello raggiunto, la precisione e la mediana del tempo di reazione, mentre la perdita di tempo dovuta agli stimoli discordanti è solo un valore aggiuntivo.',
      },
    },
    sources: [
      src('Viviani et al. (2024). The Stroop legacy: A cautionary tale on methodological issues and a proposed spatial solution. Behavior Research Methods', 'https://doi.org/10.3758/s13428-023-02215-0'),
      src('Eriksen & Eriksen (1974). Effects of noise letters upon the identification of a target letter in a nonsearch task. Perception & Psychophysics', 'https://doi.org/10.3758/BF03203267'),
      src('Lu & Proctor (1995). The influence of irrelevant location information on performance: A review of the Simon and spatial Stroop effects. Psychonomic Bulletin & Review', 'https://doi.org/10.3758/BF03210959'),
      src('Wilkinson & Yang (2012). Plasticity of inhibition in older adults: Retest practice and transfer effects. Psychology and Aging', 'https://doi.org/10.1037/a0025926'),
      src('Hedge, Powell & Sumner (2018). The reliability paradox: Why robust cognitive tasks do not produce reliable individual differences. Behavior Research Methods', 'https://doi.org/10.3758/s13428-017-0935-1'),
      src('Birch (2012). Worldwide prevalence of red-green color deficiency. J Opt Soc Am A', 'https://doi.org/10.1364/JOSAA.29.000313'),
      src('Mountford, Ruston & Dave (2004). Orthokeratology: Principles and Practice. Butterworth-Heinemann, S. 43–44', 'https://openlibrary.org/isbn/9780750640077'),
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
          'Das Format folgt klassischen Daueraufmerksamkeitsaufgaben: Getippt wird nur bei einem seltenen Ziel (18 von 100 Zeichen), nicht bei häufigen Zeichen. Die Dauer ist fest ohne Zeitbonus, die Zeichen sind farbfrei und werden weich ein- und ausgeblendet statt zu blitzen. Getrennt ausgewertet werden Treffer, Auslassungen, Fehlalarme und richtig ausgelassene Zeichen, je für die erste und die zweite Hälfte, damit man sieht, wie gut man durchhält. Die Schwierigkeit richtet sich danach, wie ähnlich die anderen Zeichen dem Ziel sind, und bleibt während der Sitzung gleich. Fehler lösen keinen Alarmton aus.',
      },
      it: {
        trains: 'Restare attenti per qualche minuto e non perdere un segnale raro – anche quando a lungo non succede nulla.',
        daily: 'Ovunque si debba stare attenti a lungo anche se accade raramente qualcosa: lunghi viaggi in autostrada, compiti di sorveglianza e controllo.',
        research:
          'I compiti di questo tipo (“vigilanza”) sono studiati da decenni. Quasi a tutti con il tempo diventa più difficile restare attenti – è normale e mostra perché le pause sono importanti. Che un allenamento del genere migliori l’attenzione nella vita quotidiana non è dimostrato. L’esercizio non è un test dell’attenzione né dell’ADHD.',
        improved:
          'Il formato segue i classici compiti di attenzione sostenuta: si tocca solo davanti a un bersaglio raro (18 segni su 100), non davanti ai segni frequenti. La durata è fissa, senza bonus di tempo; i segni sono senza colori e compaiono e scompaiono in modo morbido invece di lampeggiare. Vengono valutati separatamente colpi, omissioni, falsi allarmi e segni giustamente ignorati, per ciascuna metà, così si vede quanto si tiene duro. La difficoltà dipende da quanto i segni distraenti assomigliano al bersaglio e resta uguale per tutta la sessione. Gli errori non provocano alcun suono d’allarme.',
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
          'Der Schlüssel steht nie in der Reihenfolge der Tasten, sodass man die Zahl wirklich ablesen muss und die Aufgabe sich nicht über die Position lösen lässt. Er wird in jeder Sitzung und bei jedem Stufenwechsel neu gemischt und verwendet eigene, gut unterscheidbare Formen. Die Stufen haben 3, 6 und 9 Paare und richten sich nach den richtigen Zuordnungen je Block von acht Zeichen. Die Tasten sind groß, die Dauer ist fest, und es gibt weder Zeitbonus noch Zeitstrafe. Hauptwert sind die richtigen Zuordnungen pro Minute auf der erreichten Stufe.',
      },
      it: {
        trains: 'Tradurre simboli in numeri nel modo più rapido e sicuro possibile – con una chiave che cambia ogni volta.',
        daily: 'Ovunque si abbinino segni in fretta: simboli su cartelli e apparecchi, tabelle, orari.',
        research:
          'I compiti simbolo-numero sono usati nella ricerca per descrivere la velocità di elaborazione – sono sensibili alla stanchezza e all’età. All’inizio si diventa nettamente più veloci, poi si raggiunge un livello personale; è normale. Un trasferimento ad altre capacità o alla vita quotidiana è poco dimostrato. I valori non sono un test medico.',
        improved:
          'La chiave non è mai nell’ordine dei tasti, così il numero va davvero letto e il compito non si risolve con la sola posizione. Viene rimescolata a ogni sessione e a ogni cambio di livello e usa forme proprie ben distinguibili. I livelli hanno 3, 6 e 9 coppie e dipendono dalle risposte giuste in ogni blocco di otto simboli. I tasti sono grandi, la durata è fissa e non ci sono né bonus di tempo né penalità. Il valore principale sono gli abbinamenti corretti al minuto al livello raggiunto.',
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
          'Die Tafel hat große Felder und Ziffern (am Tablet mindestens 12 Millimeter), damit die Ziffern gut lesbar sind. Gefundene Zahlen bleiben sichtbar, sodass die Suche nicht mit jeder Zahl leichter wird, und aufeinanderfolgende Zahlen liegen nie direkt nebeneinander, sodass sich der Weg nicht erraten lässt. Auf höheren Stufen wechselt der Pfad zwischen Zahlen im Kreis und Buchstaben im Quadrat; die Unterscheidung erfolgt über die Form, nicht über Farbe. Jede Tafel wird neu gemischt, die Stufe richtet sich nach der Zeit je Tafel, und eine Sitzung hat eine feste Dauer ohne Zeitbonus, wobei eine angefangene Tafel immer zu Ende gespielt wird. Gezeigt werden die erreichte Stufe, die Zeit pro Zahl, die geschafften Tafeln und die Fehltipps.',
      },
      it: {
        trains: 'Cercare con ordine: trovare i numeri in sequenza – più avanti alternati a lettere (1 – A – 2 – B …).',
        daily: 'Ovunque si cerchino cose in ordine in un’area confusa: scaffali, moduli, tastiere.',
        research:
          'L’esercizio unisce la nota tabella di Schulte al principio del “Trail Making” (percorso alternato). Compiti del genere si usano soprattutto per misurare; ripetendoli si diventa più veloci. Le affermazioni secondo cui queste tabelle allenerebbero la visione periferica o la lettura veloce non sono dimostrate scientificamente.',
        improved:
          'La tabella ha caselle e cifre grandi (sul tablet almeno 12 millimetri), così le cifre sono ben leggibili. I numeri trovati restano visibili, quindi la ricerca non diventa più facile a ogni numero, e i numeri consecutivi non sono mai uno accanto all’altro, così il percorso non si può indovinare. Ai livelli più alti il percorso alterna numeri nel cerchio e lettere nel quadrato; la distinzione avviene tramite la forma, non il colore. Ogni tabella è rimescolata, il livello dipende dal tempo per tabella e la sessione ha una durata fissa senza bonus di tempo; una tabella iniziata viene sempre finita. Vengono mostrati il livello raggiunto, il tempo per numero, le tabelle completate e i tocchi sbagliati.',
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
          'Der Wechsel zwischen den beiden Regeln wird immer vorher angekündigt: Rahmenform, Symbol und Frage zeigen die geltende Regel, auch Form und Beschriftung der Tasten passen dazu, und Farbe dient nur als Zugabe. Beide Regeln werden mit denselben zwei Tasten beantwortet, sodass ein reiner Aufgabenwechsel gemessen wird und nicht das gleichzeitige Bearbeiten zweier Aufgaben. Eine Sitzung beginnt mit je einem kurzen Block pro Regel und geht dann in einen gemischten Block mit etwa 50 Prozent Regelwechseln über. Die Vorwarnzeit zwischen Hinweis und Ziffer passt sich der eigenen Leistung an. Wechsel- und Mischkosten werden in Millisekunden als Zusatzwerte gezeigt; Hauptwert ist die erreichte Stufe.',
      },
      it: {
        trains: 'Passare da una regola all’altra: a volte conta “pari o dispari”, a volte “minore o maggiore di 5” – la cornice dice quale regola vale.',
        daily: 'Ovunque si debba cambiare idea in fretta: passare da un compito all’altro, reagire a nuove istruzioni.',
        research:
          'Ogni cambio di regola costa qualche centinaio di millisecondi – succede a tutti, con l’età spesso un po’ di più. Con la pratica i cambi nell’esercizio diventano più fluidi e in parte ne beneficiano anche compiti simili. Che questo migliori la concentrazione o l’intelligenza in generale non è dimostrato.',
        improved:
          'Il cambio tra le due regole è sempre annunciato prima: forma della cornice, simbolo e domanda indicano la regola in vigore, anche forma ed etichetta dei tasti sono coerenti e il colore è solo un’aggiunta. Entrambe le regole si applicano con gli stessi due tasti, così si misura un vero cambio di compito e non l’esecuzione simultanea di due compiti. Una sessione inizia con un breve blocco per ciascuna regola e passa poi a un blocco misto con circa il 50 per cento di cambi di regola. Il tempo di preavviso tra l’indicazione e la cifra si adatta alla prestazione personale. I costi di cambio e di mescolanza vengono mostrati in millisecondi come valori aggiuntivi; il valore principale è il livello raggiunto.',
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
          'Jede Sitzung misst zuerst die Kugelaufgabe allein, dann die Zeichenaufgabe allein und danach beides zusammen; so zeigt der Wert „Zusammenspiel“ die tatsächlichen Kosten der Doppelaufgabe statt nur Punkte. Die Kugel folgt der Höhe eines Fingers auf einer fortlaufend schwingenden Spur, die Zeichen sind Formen statt Farben und werden mit zwei großen Tasten beantwortet; der Kugel-Finger und die tippende Hand werden getrennt verfolgt (Mehrfinger-Bedienung). In den Einzelteilen passt sich die Schwierigkeit an, im Doppelteil bleibt sie fest, damit die Kosten vergleichbar sind. Der Vorrang wechselt zwischen Kugel und Zeichen, es gibt weder Zeitbonus noch Zeitstrafe, und die Rückmeldung erfolgt nie nur über Farbe.',
      },
      it: {
        trains: 'Due cose insieme: tenere una pallina sul percorso e intanto rispondere a forme che compaiono per un attimo.',
        daily: 'Ovunque servano due cose alla volta – parlare camminando, ascoltare mentre si cucina. (Al volante vale comunque: niente telefono.)',
        research:
          'Quasi tutti con due compiti contemporanei diventano più lenti o meno precisi – con l’età spesso di più. Negli studi di laboratorio con la pratica il gioco di squadra migliora, soprattutto nel compito allenato. Se questo si trasferisca al camminare, alla guida o alla vita quotidiana non è dimostrato.',
        improved:
          'Ogni sessione misura prima il compito della pallina da solo, poi quello dei segni da solo e infine entrambi insieme; così il valore “gioco di squadra” mostra i veri costi del doppio compito invece di soli punti. La pallina segue l’altezza di un dito su una pista che oscilla di continuo, i segni sono forme invece di colori e si risponde con due grandi tasti; il dito della pallina e la mano che tocca vengono seguiti separatamente (uso con più dita). Nelle parti singole la difficoltà si adatta, nella parte doppia resta fissa, perché i costi siano confrontabili. La priorità passa dalla pallina ai segni e viceversa, non ci sono né bonus di tempo né penalità, e il riscontro non avviene mai solo tramite il colore.',
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
          'Ähnliche Reihen-Aufgaben wurden in einer großen Studie mit älteren Menschen (ACTIVE) in einem betreuten Kurs geübt – die geübte Fähigkeit blieb über Jahre besser. Im Alltag berichteten die Teilnehmenden nur selbst von kleinen Vorteilen; eine allgemeine Verbesserung des Denkens ist nicht belegt. Unsere Version ist davon inspiriert, aber selbst nicht untersucht. Neu auftretende Gedächtnis- oder Denkstörungen, Doppelbilder oder plötzliche Sehverschlechterung gehören ärztlich abgeklärt; die Übung ist weder Test noch Diagnose (Lehrbuchwissen: Muchnick, 2008).',
        improved:
          'Die Aufgaben werden bei jedem Durchgang neu erzeugt (26 Regelbausteine auf 8 Stufen mit Zahlen-, Buchstaben-, Formen- und Pfeilreihen), die falschen Antworten entsprechen typischen Denkfehlern, und nach jeder Antwort wird die Regel in Alltagssprache erklärt; in der Studie, an die die Aufgabenart angelehnt ist, wurden Strategien vermittelt. Es gibt vier große Antworttasten und keinen Zeitdruck, weiter geht es erst mit „Weiter“. Eine Sitzung hat zehn Aufgaben, und die Stufe passt sich an (zwei richtige Antworten in Folge machen es schwerer, ein Fehler leichter; Ziel sind etwa 70 % richtig). Die Zeit pro Aufgabe wird nur als Information gezeigt und geht nicht in die Stufe ein. Formen unterscheiden sich immer in der Gestalt, die Farbe ist nur eine Zugabe.',
      },
      it: {
        trains: 'Trovare la regola dietro una serie di numeri, lettere o forme e continuarla – con calma, senza fretta.',
        daily: 'Ovunque si riconoscano schemi e se ne traggano conclusioni: capire piani e procedure, notare regolarità.',
        research:
          'Compiti simili con serie sono stati allenati in un grande studio con persone anziane (ACTIVE) in un corso guidato – la capacità allenata è rimasta migliore per anni. Nella vita quotidiana i partecipanti hanno riferito solo piccoli vantaggi percepiti; un miglioramento generale del pensiero non è dimostrato. La nostra versione ne è ispirata, ma non è stata studiata. Disturbi della memoria o del pensiero di nuova insorgenza, visione doppia o improvviso peggioramento della vista vanno chiariti dal medico; l’esercizio non è né un test né una diagnosi (manuale: Muchnick, 2008).',
        improved:
          'I compiti vengono generati di nuovo a ogni turno (26 regole di base su 8 livelli, con serie di numeri, lettere, forme e frecce), le risposte sbagliate corrispondono a tipici errori di ragionamento e dopo ogni risposta la regola viene spiegata con parole semplici; nello studio a cui si ispira questo tipo di compito venivano insegnate delle strategie. Ci sono quattro grandi tasti di risposta e nessuna pressione di tempo, si prosegue solo con «Avanti». Una sessione ha dieci compiti e il livello si adatta (due risposte giuste di fila lo rendono più difficile, un errore più facile; l’obiettivo è circa il 70 % di risposte giuste). Il tempo per compito viene mostrato solo come informazione e non entra nel livello. Le forme si distinguono sempre per la figura, il colore è solo un di più.',
      },
    },
    sources: [
      src('Ball et al. (2002). Effects of cognitive training interventions with older adults: A randomized controlled trial (ACTIVE). JAMA', 'https://doi.org/10.1001/jama.288.18.2271'),
      src('Willis et al. (2006). Long-term effects of cognitive training on everyday functional outcomes in older adults. JAMA', 'https://doi.org/10.1001/jama.296.23.2805'),
      src('Rebok et al. (2014). Ten-year effects of the ACTIVE cognitive training trial on cognition and everyday functioning in older adults. J Am Geriatr Soc', 'https://doi.org/10.1111/jgs.12607'),
      src('Basak, Qin & O’Connell (2020). Differential effects of cognitive training modules in healthy aging and mild cognitive impairment: A comprehensive meta-analysis. Psychology and Aging', 'https://doi.org/10.1037/pag0000442'),
      src('Stojanoski et al. (2018). Targeted training: Converging evidence against the transferable benefits of online brain training on cognitive function. Neuropsychologia', 'https://doi.org/10.1016/j.neuropsychologia.2018.07.013'),
      src('Muchnick (2008). Clinical Medicine in Optometric Practice, 2nd ed. Mosby/Elsevier, S. 6, 7, 28–30 (Warnzeichen mit Abklärungsbedarf; Gedächtnisprüfung als klinische Untersuchung)', 'https://openlibrary.org/isbn/9780323029612'),
    ],
  },
  ...Object.fromEntries(
    [leuchtfolgeScience, zahlenspanneScience, rastermusterScience, rueckblickScience, woWarEsScience, leuchtpfadScience, liegendeAchtScience, wellenbahnScience, zweiZieleScience, sekundenGefuehlScience, blicksprungGalerieScience, fuenfTuerenScience, fallendeZieleScience, hellsteKugelScience, ziehenAblegenScience, sanfteBlickfolgeScience, zickzackBahnScience, dreiecksbahnScience, ausweichzielScience, sprungzielScience, landepunktScience, zieleAbraeumenScience, pendelFangScience, hinterDerDeckungScience, schwarmWechselScience, randPingScience, tippTempoScience, wortlisteScience, ruhigeHandScience, spurFolgenScience, wortstromScience, abprallFangScience, dunkelphasenScience, tempoWechselScience, nachziehSpurScience, hoehenwechselBahnScience, richtungschaosScience, flickZieleScience, sofortReaktionScience, gegenhaltenScience, seitwaertsFolgenScience, randzielFlickScience, kurvenbahnFolgenScience, mikrokorrekturScience, zielauswahlScience, winkelHaltenScience, ausweichFolgenScience, zickzackFolgenScience, glattFolgenScience, hochRunterFolgenScience, zielKlickenScience, tastenWahlScience, praezisionsFlickScience, zielketteScience, randabwehrScience, kugelnFangenScience, ausweichenScience, schrumpfendeZieleScience, inDieBahnScience, rasterAusweichenScience, sprossenLeiterScience, gegenDenWindScience, sprungAbfangenScience, diagonalKorridorScience, musterNachzeichnenScience, richtungWortScience, seiteErkennenScience, zahlBuchstabeWirbelScience, vierZieleWechselScience, pendelballScience, laborSpotTouchScience, laborZieleOrdnenScience, laborWahlreaktionScience, laborStartZielScience, laborBlitzErkennungScience, laborPeripheresErkennenScience, laborDoppelaufgabeScience, laborZielVerfolgenScience, laborTaktSakkadenScience, laborBuchstabentafelScience, laborSequenzGedaechtnisScience, laborWoerterBauenScience, laborZeichenFindenScience, laborMentaleRotationScience].map((e) => [e.id, e]),
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
