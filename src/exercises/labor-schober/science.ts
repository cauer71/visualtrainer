// Quellen: jede Angabe einzeln per Crossref (Autoren, Jahr, Titel, Zeitschrift, Band, Seiten) und PubMed (Abstract) geprüft
// (03.10.2026); die Aussagen im Text wurden mit dem Abstract abgeglichen:
// - Christoff & Guyton (2006): Am Orthopt J 56, 157–165, „The Lancaster red-green test“; Abstract bestätigt: Lancaster verlangte
//   von einem guten Verfahren, die Fixation jedes Auges gleichzeitig und ohne „verfälschenden Einfluss eines Fusionsreizes“ zu erfassen.
// - Facchin & Maffioletti (2021): J Optom 14(3), 263–274; Abstract bestätigt: 315 Erwachsene mit normalem beidäugigem Sehen, drei
//   Phorie-Verfahren (von Graefe, modifiziert nach Thorington, Thorington), je dreimal in der Ferne und Nähe; Wiederholbarkeit
//   innerhalb einer Sitzung hoch (0,87 bis 0,96), Zusammenhang zwischen den Verfahren mittel (0,407 bis 0,682). Die Studie nennt
//   auch Vergleichswerte; sie werden hier bewusst nicht wiedergegeben.
// - Alhassan, Hovis & Chou (2015): Optom Vis Sci 92(8), 900–907; Abstract bestätigt: 34 Personen mit und 40 ohne Beschwerden,
//   Wiederholbarkeit von Verfahren zur assoziierten Phorie meist gut, Ausnahme ein Verfahren.
// - Birch (2012): J Opt Soc Am A 29(3), 313–320 (früher geprüft): etwa 8 % der Männer und etwa 0,4 % der Frauen europäischer Herkunft.
// - Muchnick (2008), Lehrbuch (ISBN 9780323029612), S. 6 und 28 (Warnzeichen mit Abklärungsbedarf), Seitenangaben wie in den
//   übrigen Übungen; das Lehrbuch war hier nicht einsehbar, daher nur allgemein wiedergegeben.
// Nicht bestätigt werden konnte: eine Veröffentlichung, die das Schober-Verfahren selbst beschreibt oder die Vorzeichenregeln
// (Eso-/Exo-Richtung, rechts/links höher) belegt (die Suche in Crossref und PubMed fand dazu nichts Verwertbares); deshalb steht in
// der Übung ausdrücklich: Vorzeichenregeln nur hergeleitet, nicht gegen ein Messgerät geprüft. Nicht aufgenommen: Aussagen zu
// Normbereichen, zur Deutung als Befund oder zur Aussagekraft dieser Bildschirmfassung; ein Nutzen als Übung ist nicht belegt.
import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'labor-schober',
  evidence: 'weak',
  texts: {
    de: {
      trains:
        'Mit der Rot-Grün-Brille sieht ein Auge nur ein Kreuz, das andere nur einen Ring. Du schiebst das Kreuz in kleinen Schritten, bis es für dich mittig im Ring liegt, waagerecht und senkrecht, je zweimal von entgegengesetzten Seiten.',
      daily:
        'Die Übung ist kein Training für den Alltag, sondern macht das Prinzip eines klassischen Verfahrens mit getrennten Bildern erfahrbar. Ob sie beim Lesen, im Sport oder im Verkehr etwas bringt, ist nicht belegt.',
      research:
        'Verfahren, die die Bilder der beiden Augen trennen, sind in der Orthoptik und Optometrie üblich. Lancaster verlangte 1939 von einem guten Verfahren, die Fixation jedes Auges gleichzeitig und ohne den verfälschenden Einfluss eines Fusionsreizes zu erfassen (Christoff & Guyton, 2006). Verschiedene Verfahren zur Messung der Phorie stimmen nur mäßig überein: In einer Studie mit 315 Erwachsenen mit normalem beidäugigem Sehen waren Wiederholungen desselben Verfahrens innerhalb einer Sitzung gut vergleichbar (Korrelation 0,87 bis 0,96), der Zusammenhang zwischen drei Verfahren war dagegen nur mittel (0,407 bis 0,682) (Facchin & Maffioletti, 2021). Bei verwandten Verfahren zur assoziierten Phorie an 74 Personen war die Wiederholbarkeit meist gut, bei einem Verfahren schlechter (Alhassan et al., 2015). Für das Schober-Verfahren selbst und für die Vorzeichenregeln dieser Übung konnten wir keine Veröffentlichung finden: Die Regeln (Verschiebung zur Nase hin gleich Eso-Richtung, nach oben gleich „das Auge, das das Kreuz sieht, steht höher“) sind nur hergeleitet und nicht gegen ein Messgerät geprüft. Für diese digitale Näherung am Bildschirm gibt es keine Studie, und die Werte sind nicht mit denen anderer Verfahren austauschbar. Eine Rot-Grün-Farbsehschwäche haben bei Menschen europäischer Herkunft etwa 8 % der Männer und etwa 0,4 % der Frauen (Birch, 2012); für sie passt die Übung nicht. Neu aufgetretene Doppelbilder, plötzlicher Sehverlust, Kopfschmerz mit Sehverschlechterung und Schwindel gehören ärztlich abgeklärt (Lehrbuchwissen: Muchnick, 2008). Für genau diese Übung gibt es keine Studie; ein Nutzen für Alltag, Sport oder Verkehr ist nicht belegt.',
      improved:
        'Das Kreuz und der Ring stehen auf schwarzem Grund ohne Rahmen, damit kein gemeinsames Bild die Augen zusammenhält; welches Auge das Kreuz sieht, stellst du ein, ebenso das Farbpaar (Rot–Grün, Rot–Cyan, Rot–Blau) und die Helligkeit je Farbe. Du verschiebst das Kreuz mit einem kleinen und einem großen Schritt (das Vierfache) in Prismendioptrien Δ; 1 Δ entspricht 1 cm auf 1 m und wird mit dem Abstand der Kalibrierung in Zentimeter und Pixel umgerechnet. Jede Richtung wird zweimal von entgegengesetzten Startseiten durchlaufen (die Seite des ersten Starts ist zufällig); der Unterschied der beiden Durchgänge steht im Ergebnis. Auf kleinen Bildschirmen wird der Versatz begrenzt, und das Ergebnis nennt den tatsächlichen Wert. Gezeigt werden Übungswerte in Δ; die Vorzeichenregeln stehen mit der Herleitung im Ergebnis und in den Hinweisen mit dem Satz „nur hergeleitet, nicht gegen ein Messgerät geprüft“. Die App deutet nichts als Befund und nennt keine Richtwerte. Die Bedienung hängt nicht an der Farbe, es gibt kein Flackern und keine Blitze. Weil das Ergebnis von den Einstellungen abhängt, vergleichen Verlauf und „Letztes Mal“ nur Durchläufe mit gleichen Einstellungen.',
    },
    it: {
      trains:
        'Con gli occhiali rosso-verdi un occhio vede solo una croce, l’altro solo un anello. Sposti la croce a piccoli passi finché per te è al centro dell’anello, in orizzontale e in verticale, ciascuna due volte da lati opposti.',
      daily:
        'L’esercizio non è un allenamento per la vita quotidiana, ma rende sperimentabile il principio di un metodo classico con immagini separate. Che serva nella lettura, nello sport o nel traffico non è dimostrato.',
      research:
        'I metodi che separano le immagini dei due occhi sono comuni in ortottica e optometria. Lancaster nel 1939 chiedeva a un buon metodo di rilevare la fissazione di ciascun occhio contemporaneamente e senza l’influenza distorcente di uno stimolo di fusione (Christoff & Guyton, 2006). I diversi metodi per misurare la foria concordano solo moderatamente: in uno studio con 315 adulti con visione binoculare normale le ripetizioni dello stesso metodo nella stessa seduta erano ben confrontabili (correlazione da 0,87 a 0,96), mentre il legame tra tre metodi era solo medio (da 0,407 a 0,682) (Facchin & Maffioletti, 2021). Con metodi affini per la foria associata su 74 persone la ripetibilità era per lo più buona, peggiore per un metodo (Alhassan et al., 2015). Per il metodo di Schober in sé e per le regole dei segni di questo esercizio non abbiamo trovato alcuna pubblicazione: le regole (spostamento verso il naso uguale direzione eso, verso l’alto uguale «l’occhio che vede la croce sta più in alto») sono solo derivate e non verificate con uno strumento di misura. Per questa approssimazione digitale su schermo non esiste uno studio e i valori non sono intercambiabili con quelli di altri metodi. Un’alterazione della visione dei colori rosso-verde ce l’hanno, nelle persone di origine europea, circa l’8 % degli uomini e circa lo 0,4 % delle donne (Birch, 2012); per loro l’esercizio non è adatto. Visione doppia comparsa da poco, perdita improvvisa della vista, mal di testa con peggioramento della vista e vertigini vanno chiariti dal medico (manuale: Muchnick, 2008). Per questo esercizio non esiste uno studio; un’utilità per vita quotidiana, sport o traffico non è dimostrata.',
      improved:
        'La croce e l’anello stanno su fondo nero senza cornice, perché nessuna immagine comune tenga insieme gli occhi; quale occhio vede la croce lo imposti tu, così come la coppia di colori (rosso–verde, rosso–ciano, rosso–blu) e la luminosità per colore. Sposti la croce con un passo piccolo e uno grande (il quadruplo) in diottrie prismatiche Δ; 1 Δ corrisponde a 1 cm a 1 m e viene convertito in centimetri e pixel con la distanza della calibrazione. Ogni direzione viene percorsa due volte da lati di partenza opposti (il lato del primo inizio è casuale); la differenza tra i due giri è indicata nel risultato. Sugli schermi piccoli lo spostamento viene limitato e il risultato indica il valore effettivo. Si mostrano valori dell’esercizio in Δ; le regole dei segni sono indicate con la derivazione nel risultato e nelle avvertenze con la frase «solo derivate, non verificate con uno strumento di misura». L’app non interpreta nulla come referto e non indica valori di riferimento. L’uso non dipende dal colore, non ci sono sfarfallio né lampi. Poiché il risultato dipende dalle impostazioni, andamento e «ultima volta» confrontano solo giri con le stesse impostazioni.',
    },
  },
  sources: [
    src('Christoff & Guyton (2006). The Lancaster red-green test. American Orthoptic Journal', 'https://doi.org/10.3368/aoj.56.1.157'),
    src('Facchin & Maffioletti (2021). Comparison, within-session repeatability and normative data of three phoria tests. Journal of Optometry', 'https://doi.org/10.1016/j.optom.2020.05.007'),
    src('Alhassan, Hovis & Chou (2015). Repeatability of associated phoria tests. Optometry and Vision Science', 'https://doi.org/10.1097/opx.0000000000000638'),
    src('Birch (2012). Worldwide prevalence of red-green color deficiency. Journal of the Optical Society of America A', 'https://doi.org/10.1364/JOSAA.29.000313'),
    src('Muchnick (2008). Clinical Medicine in Optometric Practice, 2nd ed. Mosby/Elsevier, S. 6 und 28 (Warnzeichen mit Abklärungsbedarf)', 'https://openlibrary.org/isbn/9780323029612'),
  ],
};
