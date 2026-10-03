// Quellen: jede Angabe einzeln per Crossref (Autoren, Jahr, Titel, Zeitschrift, Band, Seiten) und PubMed (Abstract) geprüft
// (03.10.2026); die Aussagen im Text wurden mit dem Abstract abgeglichen:
// - Henriques, Klier, Smith, Lowy & Crawford (1998): J Neurosci 18(4), 1583–1594; Abstract bestätigt: Zeigen im Dunkeln auf kurz
//   aufblitzende Ziele; genau, wenn der Blick auf dem Ziel blieb; bei festem Blick auf einen Randpunkt wurde die Exzentrizität des
//   mittleren Ziels um 13,4 ± 5,1 % überschätzt.
// - Lemay & Proteau (2002): J Mot Behav 34(1), 11–23; Abstract bestätigt: je 10 jüngere und ältere Erwachsene; kurzlebige (< 1 s)
//   visuelle Repräsentation des Ortes; kein Einfluss des Alters.
// - van Donkelaar & Staub (2000): Exp Brain Res 133(3), 414–418; Abstract bestätigt: Die Amplitude der Handbewegung war größer, wenn
//   sie allein statt zusammen mit einer Augenbewegung ausgeführt wurde, bei sichtbaren wie bei erinnerten Zielen.
// - Muchnick (2008), Lehrbuch (ISBN 9780323029612), S. 6 und 28 (Warnzeichen mit Abklärungsbedarf), Seitenangaben wie in den übrigen
//   Übungen; das Lehrbuch war hier nicht einsehbar, daher nur allgemein wiedergegeben.
// Nicht aufgenommen: jede Aussage zu Normbereichen, zur Deutung der Verschiebung als Befund oder zu einer Übertragung auf Alltag, Sport
// oder Verkehr; die Studien betreffen Laborbedingungen (Dunkelheit, Zeigen mit dem Arm), nicht diese Übung auf einem Bildschirm; ein
// Nutzen als Übung ist nicht belegt. Nicht bestätigt werden konnte: nichts Aufgenommenes (die Behauptung, bei längerer Wartezeit
// werde der Fehler „oft“ größer, ist bewusst nicht übernommen: Lemay & Proteau nennen eine kurzlebige Repräsentation unter einer
// Sekunde, aber keine allgemeine Regel für Antwortfehler).
import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'labor-projektion',
  evidence: 'weak',
  texts: {
    de: {
      trains:
        'Ein Punkt erscheint kurz, während du ein Kreuz in der Mitte ansiehst, und verschwindet; nach einer einstellbaren Wartezeit tippst du dorthin, wo er war. Gezählt wird, wie weit deine Antworten vom Punkt lagen und wie sie sich verteilten.',
      daily:
        'Überall, wo man nach etwas Gesehenem greift oder darauf zeigt, etwa auf dem Touchscreen. Ob die Übung dabei hilft, ist nicht belegt.',
      research:
        'Wenn man im Dunkeln auf kurz aufleuchtende Ziele zeigt, war das Zeigen genau, solange der Blick auf dem Ziel blieb; bei festem Blick auf einen Randpunkt wurde die Entfernung des mittleren Ziels vom Blickpunkt um etwa 13 % überschätzt (Henriques et al., 1998). Das Bild eines Ortes, an den man nach dem Verschwinden zeigen soll, hält nur sehr kurz: In einer Studie mit je 10 jüngeren und älteren Erwachsenen fand sich eine kurzlebige (unter einer Sekunde) visuelle Repräsentation des Ortes, ohne Einfluss des Alters (Lemay & Proteau, 2002). Die Handbewegung fiel größer aus, wenn sie allein statt zusammen mit einer Augenbewegung ausgeführt wurde, bei sichtbaren wie bei erinnerten Zielen (van Donkelaar & Staub, 2000). Das waren Laborstudien mit Zeigen im Dunkeln bzw. mit dem Arm, keine Übung wie diese auf einem Bildschirm; für genau diese Übung gibt es keine Studie, und die App deutet Verschiebungen nicht und kennt keine Richtwerte. Neu aufgetretene Doppelbilder, plötzlicher Sehverlust, Kopfschmerz mit Sehverschlechterung und Schwindel gehören ärztlich abgeklärt (Lehrbuchwissen: Muchnick, 2008). Ein Nutzen für Alltag, Sport oder Verkehr ist nicht belegt.',
      improved:
        'Der Punkt erscheint erst nach einem Kreuz in der Mitte (0,7 s), dann für die eingestellte Zeit (ab 0,1 s; die Dauer hängt an der Bildwiederholrate des Bildschirms), danach optional nach einer Wartezeit. Es erscheint immer nur ein Punkt, nie mehrmals pro Sekunde: kein Flackern. Die Orte sind zufällig, mit Rand und Abstand zur Mitte, auf Wunsch nur im äußeren Bereich; sie werden als Anteile des Feldes gespeichert, damit eine gedrehte Bühne denselben Ort zeigt. Der Fehler wird in Zentimetern (nach Kalibrierung) und als Sehwinkel (über den Abstand der Kalibrierung) angegeben, getrennt nach seitlich und senkrecht; die Streuung ist die der Antworten um ihren eigenen Mittelpunkt. Mit „Ort nach der Antwort zeigen“ siehst du kurz den echten Ort und deine Antwort; für reine Vergleiche lässt sich das abschalten. Die App kann nicht prüfen, ob dein Blick in der Mitte geblieben ist, und deutet nichts als Befund. Weil das Ergebnis von den Einstellungen abhängt, vergleichen Verlauf und „Letztes Mal“ nur Durchläufe mit gleichen Einstellungen.',
    },
    it: {
      trains:
        'Un punto compare per poco mentre guardi una croce al centro e sparisce; dopo un’attesa impostabile tocchi dove era. Si conta quanto le tue risposte erano lontane dal punto e come si distribuivano.',
      daily:
        'Ovunque si afferri o si indichi qualcosa di visto, per esempio sul touchscreen. Che l’esercizio aiuti in questo non è dimostrato.',
      research:
        'Quando al buio si indicano bersagli che si accendono per poco, l’indicazione era precisa finché lo sguardo restava sul bersaglio; con lo sguardo fisso su un punto periferico la distanza del bersaglio centrale dal punto di fissazione veniva sopravvalutata di circa il 13 % (Henriques et al., 1998). L’immagine di un luogo da indicare dopo che è sparito dura pochissimo: in uno studio con 10 adulti più giovani e 10 più anziani si è trovata una rappresentazione visiva di breve durata (meno di un secondo) del luogo, senza influenza dell’età (Lemay & Proteau, 2002). Il movimento della mano era più ampio quando veniva eseguito da solo anziché insieme a un movimento oculare, sia con bersagli visibili sia con bersagli ricordati (van Donkelaar & Staub, 2000). Erano studi di laboratorio con indicazione al buio o con il braccio, non un esercizio come questo su uno schermo; per questo esercizio non esiste uno studio e l’app non interpreta gli spostamenti e non conosce valori di riferimento. Visione doppia comparsa da poco, perdita improvvisa della vista, mal di testa con peggioramento della vista e vertigini vanno chiariti dal medico (manuale: Muchnick, 2008). Un’utilità per vita quotidiana, sport o traffico non è dimostrata.',
      improved:
        'Il punto compare dopo una croce al centro (0,7 s), poi per il tempo impostato (da 0,1 s; la durata dipende dalla frequenza di aggiornamento dello schermo), poi facoltativamente dopo un’attesa. Compare sempre un solo punto, mai più volte al secondo: nessuno sfarfallio. I luoghi sono casuali, con margine e distanza dal centro, a richiesta solo nella zona esterna; vengono memorizzati come quote del campo, perché uno schermo ruotato mostri lo stesso luogo. L’errore è indicato in centimetri (dopo la calibrazione) e come angolo visivo (con la distanza della calibrazione), separato in laterale e verticale; la dispersione è quella delle risposte intorno al proprio centro. Con «Mostrare la posizione dopo la risposta» vedi per poco la posizione vera e la tua risposta; per confronti puri si può disattivare. L’app non può verificare se lo sguardo è rimasto al centro e non interpreta nulla come referto. Poiché il risultato dipende dalle impostazioni, andamento e «ultima volta» confrontano solo giri con le stesse impostazioni.',
    },
  },
  sources: [
    src('Henriques, Klier, Smith, Lowy & Crawford (1998). Gaze-centered remapping of remembered visual space in an open-loop pointing task. The Journal of Neuroscience', 'https://doi.org/10.1523/jneurosci.18-04-01583.1998'),
    src('Lemay & Proteau (2002). Effects of target presentation time, recall delay, and aging on the accuracy of manual pointing to remembered targets. Journal of Motor Behavior', 'https://doi.org/10.1080/00222890209601927'),
    src('van Donkelaar & Staub (2000). Eye-hand coordination to visual versus remembered targets. Experimental Brain Research', 'https://doi.org/10.1007/s002210000422'),
    src('Muchnick (2008). Clinical Medicine in Optometric Practice, 2nd ed. Mosby/Elsevier, S. 6 und 28 (Warnzeichen mit Abklärungsbedarf)', 'https://openlibrary.org/isbn/9780323029612'),
  ],
};
