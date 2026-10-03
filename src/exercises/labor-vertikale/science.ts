// Quellen: jede Angabe einzeln per Crossref (Autoren, Jahr, Titel, Zeitschrift, Band, Seiten) und PubMed (Abstract) geprüft
// (03.10.2026); die Aussagen im Text wurden mit dem Abstract abgeglichen:
// - Böhmer & Rickenmann (1995): J Vestib Res 5(1), 35–45 (Crossref; PubMed über den Titel gefunden), „The subjective visual vertical as a
//   clinical parameter of vestibular function in peripheral vestibular diseases“; Abstract bestätigt: 25 Gesunde und 73 Personen mit
//   Störungen des Gleichgewichtsorgans; deutliche Abweichungen zur betroffenen Seite bei allen mit durchtrenntem Gleichgewichtsnerv
//   und bei 89 % mit Neuritis des Gleichgewichtsnervs, bei keiner Person mit Lagerungsschwindel. (In einer früheren Fassung der
//   Angaben stand „35–46“; Crossref nennt 35–45.)
// - Dieterich & Brandt (1993): Ann Neurol 33(3), 292–299; Abstract bestätigt: 111 Personen mit akuten Durchblutungsstörungen des
//   Hirnstamms, bei 94 % eine richtungsspezifische Abweichung der statischen subjektiven Vertikalen.
// - Dai, Kurien & Lin (2020): J Otolaryngol Head Neck Surg 49(1), 6; Abstract bestätigt: 22 Gesunde, je 10 Wiederholungen mit der
//   Eimer-Methode und mit einer App; kein deutlicher Unterschied der Verteilungen.
// - Wengier et al. (2021): Otol Neurotol 42(3), 455–460; Abstract bestätigt: 45 Personen (25 mit Störungen des Gleichgewichtsorgans,
//   20 Kontrollen), Eimer-Methode und Smartphone-Verfahren; das Eimer-Verfahren war empfindlicher (mittlerer Unterschied 1,09 Grad),
//   die Richtung blieb erhalten.
// - Muchnick (2008), Lehrbuch (ISBN 9780323029612), S. 6 und 28 (Warnzeichen mit Abklärungsbedarf), Seitenangaben wie in den übrigen
//   Übungen; das Lehrbuch war hier nicht einsehbar, daher nur allgemein wiedergegeben.
// Nicht aufgenommen: jede Aussage zu Normbereichen, zur Deutung als Befund oder zur Aussagekraft dieser Bildschirmfassung (die
// genannten Studien betreffen klinische Verfahren, nicht diese Übung); ein Nutzen als Übung ist nicht belegt. Nicht bestätigt
// werden konnte: nichts Aufgenommenes.
import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'labor-vertikale',
  evidence: 'weak',
  texts: {
    de: {
      trains:
        'Eine helle Linie auf dunklem Grund so einstellen, dass sie senkrecht wirkt: entweder dreht sie sich langsam und du stoppst sie, oder du stellst sie mit Tasten ein; die Starts wechseln zwischen rechts und links geneigt.',
      daily:
        'Die Übung ist kein Training für den Alltag, sondern macht das Prinzip der subjektiven visuellen Vertikalen erfahrbar. Ob sie für Gleichgewicht, Sport oder Verkehr etwas bringt, ist nicht belegt.',
      research:
        'Die subjektive visuelle Vertikale wird in der Fachliteratur bei Störungen des Gleichgewichtssystems untersucht. In einer Studie mit 25 Gesunden und 73 Personen mit Störungen des Gleichgewichtsorgans wich sie bei allen mit durchtrenntem Gleichgewichtsnerv und bei 89 % mit Entzündung des Gleichgewichtsnervs zur betroffenen Seite ab, bei keiner Person mit Lagerungsschwindel (Böhmer & Rickenmann, 1995). Bei 111 Personen mit akuten Durchblutungsstörungen des Hirnstamms zeigten 94 % eine richtungsspezifische Abweichung (Dieterich & Brandt, 1993). Einfache Verfahren am Krankenbett nutzen einen Eimer mit Linie; in kleinen Studien wurde dasselbe mit Smartphone-Apps verglichen: Bei 22 Gesunden unterschieden sich die Werte von App und Eimer nicht deutlich (Dai et al., 2020); bei 45 Personen war das Eimer-Verfahren empfindlicher (mittlerer Unterschied etwa 1 Grad), die Richtung blieb erhalten (Wengier et al., 2021). Das waren klinische Verfahren mit festem Aufbau, keine Übung wie diese; für diese Fassung – Linie auf einem Bildschirm, Aufstellung des Geräts durch dich – gibt es keine Studie, und die Werte hängen davon ab, dass das Gerät wirklich gerade steht. Die App deutet die Werte nicht und kennt keine Richtwerte. Neu aufgetretene Doppelbilder, plötzlicher Sehverlust, Kopfschmerz mit Sehverschlechterung und Schwindel gehören ärztlich abgeklärt (Lehrbuchwissen: Muchnick, 2008). Für genau diese Übung gibt es keine Studie; ein Nutzen für Alltag, Gleichgewicht, Sport oder Verkehr ist nicht belegt.',
      improved:
        'Die Linie ist hell auf reinem Schwarz, ohne Rahmen; ihre Länge stellst du in Zentimetern ein (nach Kalibrierung, auf kleinen Bildschirmen begrenzt). Beim Drehen rechnet die Drehung mit der Zeit zwischen den Bildern und ist unabhängig von der Bildrate; bei 45 Grad kehrt die Linie um, und sie startet jedes Mal zufällig zwischen 60 und 100 % der größten Startneigung, abwechselnd rechts und links geneigt. Beim Einstellen verstellst du sie mit Tasten (±0,5 und ±2 Grad) oder den Pfeiltasten. Gezeigt werden Übungswerte in Grad: Mittel der Einstellungen (plus = im Uhrzeigersinn), Betrag, Streuung und der Unterschied je nach Startseite; die App deutet sie nicht und kennt keine Richtwerte. Es gibt kein Flackern und keine Blitze, und die Bedienung kommt ohne Farbe aus. Weil das Ergebnis von den Einstellungen abhängt, vergleichen Verlauf und „Letztes Mal“ nur Durchläufe mit gleichen Einstellungen.',
    },
    it: {
      trains:
        'Regolare una linea chiara su fondo scuro finché sembra verticale: o ruota lentamente e la fermi tu, oppure la regoli con i tasti; gli inizi si alternano tra inclinato a destra e a sinistra.',
      daily:
        'L’esercizio non è un allenamento per la vita quotidiana, ma rende sperimentabile il principio della verticale visiva soggettiva. Che serva all’equilibrio, allo sport o al traffico non è dimostrato.',
      research:
        'La verticale visiva soggettiva viene studiata nella letteratura specialistica nei disturbi del sistema dell’equilibrio. In uno studio con 25 persone sane e 73 persone con disturbi dell’organo dell’equilibrio si discostava verso il lato colpito in tutte quelle con nervo dell’equilibrio reciso e nell’89 % di quelle con infiammazione del nervo dell’equilibrio, in nessuna con vertigine posizionale (Böhmer & Rickenmann, 1995). In 111 persone con disturbi circolatori acuti del tronco encefalico il 94 % mostrava uno scostamento specifico della direzione (Dieterich & Brandt, 1993). I metodi semplici al letto del paziente usano un secchio con una linea; in piccoli studi lo stesso è stato confrontato con app per smartphone: in 22 persone sane i valori di app e secchio non differivano in modo netto (Dai et al., 2020); in 45 persone il metodo del secchio era più sensibile (differenza media circa 1 grado), la direzione si manteneva (Wengier et al., 2021). Erano metodi clinici con un’impostazione fissa, non un esercizio come questo; per questa versione – linea su uno schermo, posizionamento del dispositivo da parte tua – non esiste uno studio e i valori dipendono dal fatto che il dispositivo sia davvero dritto. L’app non interpreta i valori e non conosce valori di riferimento. Visione doppia comparsa da poco, perdita improvvisa della vista, mal di testa con peggioramento della vista e vertigini vanno chiariti dal medico (manuale: Muchnick, 2008). Per questo esercizio non esiste uno studio; un’utilità per vita quotidiana, equilibrio, sport o traffico non è dimostrata.',
      improved:
        'La linea è chiara su nero puro, senza cornice; la sua lunghezza si imposta in centimetri (dopo la calibrazione, limitata sugli schermi piccoli). Con la rotazione il calcolo usa il tempo tra i fotogrammi ed è indipendente dalla frequenza dei fotogrammi; a 45 gradi la linea inverte il senso e parte ogni volta a caso tra il 60 e il 100 % della massima inclinazione iniziale, alternando inclinato a destra e a sinistra. Con la regolazione la sposti con i tasti (±0,5 e ±2 gradi) o con le frecce. Si mostrano valori dell’esercizio in gradi: media delle regolazioni (più = in senso orario), valore assoluto, dispersione e differenza secondo il lato di partenza; l’app non li interpreta e non conosce valori di riferimento. Non ci sono sfarfallio né lampi e l’uso non dipende dal colore. Poiché il risultato dipende dalle impostazioni, andamento e «ultima volta» confrontano solo giri con le stesse impostazioni.',
    },
  },
  sources: [
    src('Böhmer & Rickenmann (1995). The subjective visual vertical as a clinical parameter of vestibular function in peripheral vestibular diseases. Journal of Vestibular Research', 'https://doi.org/10.3233/ves-1995-5104'),
    src('Dieterich & Brandt (1993). Ocular torsion and tilt of subjective visual vertical are sensitive brainstem signs. Annals of Neurology', 'https://doi.org/10.1002/ana.410330311'),
    src('Dai, Kurien & Lin (2020). Mobile phone app vs bucket test as a subjective visual vertical test: a validation study. Journal of Otolaryngology – Head & Neck Surgery', 'https://doi.org/10.1186/s40463-020-0402-3'),
    src('Wengier, Ungar, Handzel, Cavel & Oron (2021). Subjective visual vertical evaluation by a smartphone-based test – taking the phone out of the bucket. Otology & Neurotology', 'https://doi.org/10.1097/mao.0000000000002944'),
    src('Muchnick (2008). Clinical Medicine in Optometric Practice, 2nd ed. Mosby/Elsevier, S. 6 und 28 (Warnzeichen mit Abklärungsbedarf)', 'https://openlibrary.org/isbn/9780323029612'),
  ],
};
