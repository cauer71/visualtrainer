import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'wortstrom',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Ein vorher genanntes Zielwort in einer Folge einzeln gezeigter Wörter wiedererkennen und im richtigen Moment antippen, ohne bei anderen Wörtern zu tippen.',
      daily: 'Ein bestimmtes Wort oder einen Namen in einer Liste, auf einer Anzeigetafel oder in einer Meldungsfolge erkennen.',
      research:
        'Bei der Wort-für-Wort-Anzeige (RSVP) fallen die Blicksprünge von Wort zu Wort weg, aber die Augen verbringen beim normalen Lesen nur etwa 10 Prozent der Zeit in Bewegung; die Behauptung, 80 Prozent der Lesezeit gingen für Augenbewegungen verloren, wird in der Fachübersicht von Rayner et al. (2016) ausdrücklich zurückgewiesen. Nach einem Schnelllesekurs stieg das Tempo von etwa 280 auf 400 Wörter pro Minute, das Verständnis sank von 81 auf 74 Prozent; Erwachsene lesen im Mittel etwa 240 bis 260 Wörter pro Minute (Brysbaert 2019). Bei schneller Wort-für-Wort-Anzeige verstanden Versuchspersonen weniger als bei normalem Lesen (Benedetto et al. 2015; Acklin & Papesh 2017). Reines Entziffern kurzer Wörter ist dagegen sehr schnell möglich (Rubin & Turano 1992). Diese Übung verlangt nur das Wiedererkennen eines bekannten Wortes und misst weder Leseverständnis noch Lesetempo. Ein Nutzen für Lesen, Studium oder Alltag ist nicht belegt.',
      improved:
        'Die Wörter erscheinen einzeln und weich ein- und ausgeblendet (keine Blitze), mit mindestens 350 Millisekunden Anzeigedauer und höchstens 2,5 Wörtern pro Sekunde. Das Antwortfenster ist nie kürzer als 600 Millisekunden, damit ein erkanntes Wort auch beantwortet werden kann. Die Wörter werden bei jedem Durchgang zufällig aus Wortlisten der gewählten Sprache gezogen und das Zielwort steht vorher fest; es gibt also keine feste Wortfolge, die man auswendig lernen könnte. Die Stufe richtet sich nach Erfolg: Die Anzeigedauer sinkt von 700 auf 350 Millisekunden, ab Stufe 7 stehen viele gleich lange Wörter im Strom. Gemessen wird nur, ob das Zielwort erkannt wird; es gibt keine „Wörter pro Minute“, keine Ränge und keinen Lesetest.',
    },
    it: {
      trains: 'Riconoscere una parola bersaglio annunciata prima in una sequenza di parole mostrate una alla volta e toccare al momento giusto, senza toccare sulle altre parole.',
      daily: 'Riconoscere una parola o un nome in un elenco, su un tabellone o in una serie di messaggi.',
      research:
        'Nella visualizzazione parola per parola (RSVP) i salti dello sguardo da parola a parola vengono meno, ma nella lettura normale gli occhi sono in movimento solo per circa il 10 per cento del tempo; l’affermazione che l’80 per cento del tempo di lettura vada perso in movimenti oculari viene esplicitamente respinta nella rassegna di Rayner et al. (2016). Dopo un corso di lettura veloce la velocità è salita da circa 280 a 400 parole al minuto, la comprensione è scesa dall’81 al 74 per cento; gli adulti leggono in media circa 240–260 parole al minuto (Brysbaert 2019). Con la visualizzazione rapida parola per parola le persone hanno compreso meno che con la lettura normale (Benedetto et al. 2015; Acklin e Papesh 2017). Decifrare semplici parole brevi è invece possibile molto in fretta (Rubin e Turano 1992). Questo esercizio richiede solo di riconoscere una parola nota e non misura né la comprensione né la velocità di lettura. Un’utilità per lettura, studio o vita quotidiana non è dimostrata.',
      improved:
        'Le parole compaiono una alla volta, con dissolvenza morbida (nessun lampo), per almeno 350 millisecondi e al massimo 2,5 parole al secondo. La finestra di risposta non è mai più breve di 600 millisecondi, così una parola riconosciuta può anche essere indicata in tempo. A ogni prova le parole sono estratte a caso da elenchi della lingua scelta e la parola bersaglio è nota prima; non esiste quindi una sequenza fissa da imparare a memoria. Il livello dipende dal successo: la durata di visualizzazione scende da 700 a 350 millisecondi e, dal livello 7, nel flusso compaiono molte parole della stessa lunghezza. Si misura soltanto se la parola bersaglio viene riconosciuta; non ci sono «parole al minuto», né classifiche né test di lettura.',
    },
  },
  sources: [
    src('Rayner, Schotter, Masson, Potter & Treiman (2016). So much to read, so little time: How do we read, and can speed reading help? Psychological Science in the Public Interest', 'https://doi.org/10.1177/1529100615623267'),
    src('Brysbaert (2019). How many words do we read per minute? A review and meta-analysis of reading rate. Journal of Memory and Language', 'https://doi.org/10.1016/j.jml.2019.104047'),
    src('Benedetto et al. (2015). Rapid serial visual presentation in reading: The case of Spritz. Computers in Human Behavior', 'https://doi.org/10.1016/j.chb.2014.12.043'),
    src('Acklin & Papesh (2017). Modern speed-reading apps do not foster reading comprehension. The American Journal of Psychology', 'https://doi.org/10.5406/amerjpsyc.130.2.0183'),
    src('Rubin & Turano (1992). Reading without saccadic eye movements. Vision Research', 'https://doi.org/10.1016/0042-6989(92)90032-E'),
    src('Masson (1983). Conceptual processing of text during skimming and rapid sequential reading. Memory & Cognition', 'https://doi.org/10.3758/BF03196973'),
    src('Pronk, Wiers, Molenkamp & Murre (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
  ],
};
