// Quellen: jede Angabe einzeln per Crossref (Metadaten, Autoren, Zeitschrift, Band, Seiten) und über PubMed/OpenAlex
// (Abstract) geprüft (02.10.2026); die Aussagen im Text wurden mit dem Abstract abgeglichen.
// Der Labor-Prototyp (help/wordbuild.js) hat KEINE Quellen (`references: []`): alle Quellen sind ergänzt und geprüft.
// Nicht aufgenommen: Mayzner & Tresselt (1958), J Exp Psychol 56, 376–379 (10.1037/h0041542) – Metadaten bestätigt, aber kein
// Abstract in PubMed/OpenAlex, daher nur der Titel als Beleg („Lösungszeit als Funktion von Buchstabenreihenfolge und
// Worthäufigkeit“); die Aussagen stehen stattdessen über Mendelsohn & O’Brien (1974) und Gilhooly & Johnson (1978) im Text.
// Nicht belegt und im Text gekennzeichnet: die Wirkung von Wiederholungen der kleinen Wortliste auf die Zeit; ob die (englischen)
// Studienergebnisse für deutsche und italienische Wörter genauso gelten. Die italienische Wortliste wurde nicht von
// Muttersprachlerinnen oder Muttersprachlern geprüft.
import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'labor-woerter-bauen',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Aus durcheinandergewürfelten Buchstaben ein Wort legen – Umordnen im Kopf, Wortbild, Reihenfolge der Buchstaben. Wortlänge, Zahl der Wörter und Kachelgröße stellst du selbst ein; die Wörter sind Deutsch oder Italienisch, je nach Sprache der App.',
      daily: 'Überall, wo man Buchstaben oder Teile sinnvoll umordnen muss: Wortspiele, Rätsel, das Suchen eines Begriffs. Ob die Übung dabei oder beim Lesen und Schreiben hilft, ist nicht belegt.',
      research:
        'Wie schwer ein Buchstabenrätsel (Anagramm) ist, hängt von Eigenschaften der Lösung ab. In einer Studie mit Fünf-Buchstaben-Anagrammen hingen die Lösungsergebnisse vor allem mit Maßen für die Buchstabenpaare, dem Anfangsbuchstaben (Vokal oder Konsonant) und der Ähnlichkeit zwischen Anagramm und Lösungswort zusammen (Gilhooly & Johnson, 1978). Eine andere Studie fand, dass ein Maß für die Wahrscheinlichkeit der Buchstabenpaare und die Zahl der nötigen Umstellungen die Schwierigkeit stark vorhersagten, die Häufigkeit des Wortes nur schwach (Mendelsohn & O’Brien, 1974). Geübte Löserinnen und Löser erleben die Lösung häufiger als plötzliches „Aha“; trotzdem baut sich nach dieser Studie auch dann Teilwissen schrittweise auf (Novick & Sherman, 2003). Für die Übung heißt das: Wörter sind nicht gleich schwer, deshalb zählt der Durchschnitt über mehrere Wörter, und verglichen werden nur Läufe mit gleicher Wortlänge. Die Studien nutzten englische Wörter; ob das für deutsche und italienische Wörter genauso gilt, ist nicht geprüft. Die Wortliste ist klein: Bei häufigem Üben erkennst du Wörter wieder, und die Zeit kann auch deshalb sinken – das ist unsere Überlegung, für diese Übung nicht untersucht. Touchscreens messen Zeiten durchweg etwas zu lang, je nach Gerät unterschiedlich (Pronk et al., 2020); Tablets wurden dort nicht untersucht. Darum zählt nur der Vergleich mit dir selbst auf demselben Gerät, in derselben Sprache und mit denselben Einstellungen. Für genau diese Übung gibt es keine Studie.',
      improved:
        'Kacheln in Zentimetern (nach Kalibrierung des Bildschirms), auf schmalen Bildschirmen kleiner statt abgeschnitten. Die Buchstaben stehen als Großbuchstaben auf den Kacheln, damit der Anfang nicht verraten wird (im Prototyp blieb der Großbuchstabe am Wortanfang stehen); die Anordnung der Kacheln ist nie schon ein gültiges Wort; es zählt jedes Wort der Liste aus denselben Buchstaben. Die Zeit läuft erst, wenn die Kacheln zu sehen sind. Hauptwert ist die Zeit pro Wort statt der feststehenden Zahl gelöster Wörter. „Zurück“ nimmt Buchstaben weg, ein versehentlicher Doppeltipp entfernt nur einen. Jeder Durchlauf merkt sich seine Einstellungen: Verlauf, Bestwert und „Letztes Mal“ vergleichen nur Läufe mit gleichen Einstellungen (der Ton zählt nicht dazu). Rückmeldung mit ✓/✗ statt Blitzen, keine Noten, keine Normwerte, keine Ranglisten.',
    },
    it: {
      trains: 'Formare una parola da lettere in disordine – riordinare a mente, immagine della parola, ordine delle lettere. Lunghezza delle parole, numero di parole e grandezza delle tessere li imposti tu; le parole sono in tedesco o in italiano, a seconda della lingua dell’app.',
      daily: 'Ovunque si debbano riordinare in modo sensato lettere o parti: giochi di parole, enigmi, la ricerca di un termine. Che l’esercizio aiuti in questo o nel leggere e scrivere non è dimostrato.',
      research:
        'La difficoltà di un indovinello di lettere (anagramma) dipende da caratteristiche della soluzione. In uno studio con anagrammi di cinque lettere i punteggi di soluzione erano legati soprattutto a misure delle coppie di lettere, alla lettera iniziale (vocale o consonante) e alla somiglianza tra anagramma e parola soluzione (Gilhooly e Johnson, 1978). Un altro studio trovò che una misura della probabilità delle coppie di lettere e il numero di spostamenti necessari prevedevano bene la difficoltà, la frequenza della parola solo debolmente (Mendelsohn e O’Brien, 1974). Chi è esperto vive la soluzione più spesso come un’illuminazione improvvisa; secondo questo studio anche allora la conoscenza parziale si accumula gradualmente (Novick e Sherman, 2003). Per l’esercizio significa: le parole non sono tutte ugualmente difficili, perciò conta la media su più parole e si confrontano solo giri con la stessa lunghezza. Gli studi usavano parole inglesi; che valga lo stesso per parole tedesche e italiane non è stato verificato. L’elenco di parole è piccolo: esercitandoti spesso riconosci le parole, e il tempo può diminuire anche per questo – è una nostra ipotesi, non studiata per questo esercizio. I touchscreen misurano i tempi sistematicamente un po’ in eccesso, in modo diverso a seconda del dispositivo (Pronk et al., 2020); i tablet non erano stati studiati. Per questo conta solo il confronto con te stesso sullo stesso dispositivo, nella stessa lingua e con le stesse impostazioni. Per questo esercizio non esiste uno studio.',
      improved:
        'Tessere in centimetri (dopo la calibrazione dello schermo), sugli schermi stretti più piccole invece che tagliate. Le lettere sulle tessere sono maiuscole, così l’inizio non viene rivelato (nel prototipo la maiuscola restava all’inizio della parola); la disposizione delle tessere non è mai già una parola valida; conta ogni parola dell’elenco formata dalle stesse lettere. Il tempo parte solo quando le tessere sono visibili. Il valore principale è il tempo per parola invece del numero fisso di parole risolte. “Indietro” toglie le lettere, un doppio tocco involontario ne toglie solo una. Ogni giro ricorda le sue impostazioni: andamento, record e “ultima volta” confrontano solo giri con le stesse impostazioni (il suono non conta). Risposta con ✓/✗ invece di lampi, niente voti, niente valori normali, niente classifiche.',
    },
  },
  sources: [
    src('Gilhooly & Johnson (1978). Effects of solution word attributes on anagram difficulty: A regression analysis. Quarterly Journal of Experimental Psychology', 'https://doi.org/10.1080/14640747808400654'),
    src('Mendelsohn & O’Brien (1974). The solution of anagrams: A reexamination of the effects of transition letter probabilities, letter moves, and word frequency on anagram difficulty. Memory & Cognition', 'https://doi.org/10.3758/bf03196922'),
    src('Novick & Sherman (2003). On the nature of insight solutions: Evidence from skill differences in anagram solution. The Quarterly Journal of Experimental Psychology Section A', 'https://doi.org/10.1080/02724980244000288'),
    src('Pronk, Wiers, Molenkamp & Murre (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
  ],
};
