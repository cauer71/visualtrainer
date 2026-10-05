---
# ===== Kennung =====
nr: 926
kennung: labor-balance-touch
name: "Balance-Touch (Punkte im Stand antippen, Hilfsperson zählt Gleichgewichtsverluste)"
name_original: "– (eigene Blickfit-Labor-Übung, kein Vorbild)"
kapitel: "Labor"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "labor-balance-touch", name: "Balance-Touch", unterschiede: "eigene Labor-Übung mit Einstellungen"}
stand: 2026-10-05

# ===== Überblick =====
kurzbeschreibung: "Man steht vor einem Tablet auf einem Ständer und tippt Punkte an, die nacheinander an zufälligen Stellen erscheinen und nach kurzer Zeit wieder verschwinden – im festen Stand, einbeinig, im Tandemstand oder auf einer wackligen Fläche. Eine Hilfsperson tippt jeden Verlust des Gleichgewichts auf einer eigenen Taste. Standposition, Dauer, Punktgröße, Sichtbarkeit, Pause, Bereich und ein Kreuz in der Mitte stellt man selbst ein. Die App misst die Tipp-Leistung und zählt die Taps der Hilfsperson, nicht das Gleichgewicht. Sturzgefahr: Halt und Hilfsperson in Reichweite."
ziel_funktionen: [gleichgewicht, auge_hand_koordination, geteilte_aufmerksamkeit]
eingabe: [touch, maus, tastatur]
tablet_geeignet: ja
dauer_sekunden: 60
schwierigkeit_anpassung: "Keine Stufen und keine automatische Anpassung; alles über Einstellungen (maßgeblich ist PARAMS in src/exercises/labor-balance-touch/logic.ts): Standposition (beidbeinig fest, wacklige Fläche, einbeinig, Tandemstand; wird nur gespeichert und gehört zum Vergleich), Dauer (20–300 s, Standard 60), Punktdurchmesser (2–15 cm, Standard 6; höchstens 40 % der kürzeren Feldseite), Sichtbarkeit je Punkt (0,5–8 s, Standard 2), Pause nach Treffer oder Ablauf (0–3000 ms, Standard 500), Bereich (ganze Fläche, nur Rand, nur Mitte), Kreuz in der Mitte (Standard an). Leichter laut Texten: fester beidbeiniger Stand, Punkte 7–9 cm, Sichtbarkeit 3–4 s, Kreuz aus; schwerer: erst später und nur mit Sicherung Tandem- oder Einbeinstand, Punkte 3–4 cm, Sichtbarkeit 1–1,5 s, nur Rand, Kreuz an. Auf wackligen Flächen zuerst nur 20–30 s."
messgroessen: ["Getroffene und verpasste Punkte, Trefferquote (getroffen an allen gezeigten)", "Fehltipps (daneben, ohne Abzug)", "Reaktionszeit getroffener Punkte: Mittel, Median, Streuung", "Von der Hilfsperson gezählte Verluste des Gleichgewichts und Verluste pro Minute", "Standposition (gespeichert, Teil des Vergleichs)", "keine Messung von Gleichgewicht, Haltung oder Blick; keine Normwerte"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
# Sturzrisiko für den Standard (beidbeinig fest) mit 2 bewertet; Einbein-, Tandemstand und wacklige Flächen erhöhen es deutlich.
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 2
    nutzbares_sehfeld: 2
    blickfolge: 0
    sakkaden: 1
    fixation: 2
    bewegungswahrnehmung: 0
    visuelle_suche: 1
    visuelle_verarbeitungsgeschwindigkeit: 2
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 1
    inhibition: 1
    geteilte_aufmerksamkeit: 3
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 1
    antizipation: 0
    entscheidung_wahlreaktion: 0
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 2
    auge_hand_koordination: 3
    zielbewegung_tempo: 2
    zielbewegung_praezision: 1
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 1
    gleichgewicht: 3
    ausdauer_belastung: 1
belastung:
  zeitdruck: 2
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 1
  sturzrisiko: 2
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Sicher stehen können; Wand oder fester Stuhl in Reichweite, rutschfester Boden, feste Schuhe", "Eine Hilfsperson in Reichweite, die Verluste des Gleichgewichts nach vorher festgelegter Regel tippt (Taste mindestens 56 px oder Taste B)", "Tablet auf einem Ständer etwa in Brusthöhe, jeder Punkt ohne Verrenken erreichbar; nicht auf den Bildschirm stützen", "Bildschirm kalibriert, damit die Punktgröße in cm stimmt", "Einbein-, Tandemstand und wacklige Flächen nur mit Sicherung und Aufsicht"]
vorsicht_bei: [sturzgefahr, schwindel_vestibulaer, herz_kreislauf, gelenk_ruecken, photosensitive_epilepsie, hand_arm_beschwerden, kognitive_einschraenkung]
geeignet_fuer: ["Unter Aufsicht eine Doppelaufgabe aus Stehen und Antippen üben, mit schrittweise anspruchsvollerer Standposition", "Mit Kreuz in der Mitte: Punkte aus dem Augenwinkel wahrnehmen, während der Blick in der Mitte bleibt (als Bitte, nicht kontrolliert)", "Vergleich mit sich selbst bei gleicher Standposition, gleicher Hilfsperson und gleichen Einstellungen", "Ergänzung in einem betreuten Bewegungsprogramm – ohne eigenen Wirkanspruch"]
weniger_geeignet_fuer: ["Messung des Gleichgewichts, der Haltung oder des Sturzrisikos (die gezählten Verluste sind Zählwerte der Hilfsperson)", "Üben ohne Hilfsperson oder ohne sicheren Halt", "Menschen, die nicht sicher stehen können, oder bei Schwindel ohne ärztliche Rücksprache", "Normvergleich von Trefferquote oder Reaktionszeit", "Diagnose oder Therapie"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: unklar
  alltag_transfer: unklar
  kommentar: "Für genau diese Übung gibt es keine Studie. Bei älteren Menschen mit Gleichgewichtsstörung verbesserte sich das Gehen unter Doppelaufgabe nur nach Doppelaufgaben-Training, reines Gleichgewichtstraining übertrug sich möglicherweise nicht (Silsupadol et al. 2009, 23 Personen). Ein Überblick über 18 Übersichten fand positive Effekte von Doppelaufgaben-Programmen mit Bewegung; Exergames wirkten nur auf die Denkleistung, Übertragung und Sicherheit sind unklar (Gallou-Guyot et al. 2020). Für diese Bildschirmübung und für gesunde Menschen ist kein Nutzen belegt."
aehnliche_uebungen: [925, 927, 401, 108, 205]
stichworte: ["Doppelaufgabe", "Gleichgewicht", "Stand", "Einbeinstand", "Tandemstand", "wacklige Fläche", "Punkte antippen", "Fixationskreuz", "Hilfsperson zählt", "Sturzgefahr", "keine Messung"]
---

# 926 · Balance-Touch (Punkte im Stand antippen, Hilfsperson zählt Gleichgewichtsverluste)

> Original: – (eigene Blickfit-Labor-Übung, kein Vorbild) · Blickfit: „Balance-Touch“ (`src/exercises/labor-balance-touch/`, Kategorie Bewegung, Labor)

## 1. Kurzbeschreibung

Man steht vor einem Tablet, das etwa in Brusthöhe auf einem Ständer steht. Nacheinander erscheint an einer zufälligen Stelle ein Punkt, der nach kurzer Zeit wieder verschwindet; man tippt ihn so schnell wie möglich an. Gleichzeitig hält man das Gleichgewicht – im festen Stand auf beiden Beinen oder, erst später und nur mit Sicherung, einbeinig, im Tandemstand (ein Fuß vor dem anderen) oder auf einer wackligen Fläche. Das macht die Aufgabe zu einer Doppelaufgabe aus Haltung und Sehen. Eine Hilfsperson steht in Reichweite und tippt auf „Gleichgewicht verloren“, sooft man absetzt, sich abstützt, einen Ausfallschritt macht oder sich festhält. Mit dem Kreuz in der Mitte bleibt der Blick auf dem Kreuz, und die Punkte werden aus dem Augenwinkel wahrgenommen. Einstellbar sind Standposition, Dauer, Punktgröße in cm, Sichtbarkeit, Pause, Bereich (ganze Fläche, nur Rand, nur Mitte) und das Kreuz. Gezählt werden Treffer, verpasste Punkte, Fehltipps, Reaktionszeit und die Verluste – die App misst weder Gleichgewicht noch Haltung.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `index.ts`, `logic.ts`, `texts.ts`, `science.ts` in `src/exercises/labor-balance-touch/` sowie `labor-spot-touch/logic.ts` (gemeinsame Punkt-Logik) und `_shared/labor-sicherheit.ts` (Stand 05.10.2026).

- **Punkte:** immer einer gleichzeitig, ganz im Feld, je nach Bereich und Kreuz platziert („nur Mitte“ innerhalb einer Ellipse um die Mitte mit 45 % der halben Feldbreite und -höhe, „nur Rand“ ab 60 %), weich eingeblendet. Sichtbar für die eingestellte Zeit (Standard 2 s), danach „verpasst“. Nach Treffer oder Ablauf folgt der nächste nach der Pause (Standard 500 ms). Sitzung nach Zeit (Standard 60 s; Schnellmodus 8 s).
- **Treffer:** Tipp innerhalb von Radius + 0,3 cm (Fingerkuppe), mindestens 24 px; ein Punkt kann erst getroffen werden, wenn er zu sehen war. Tipp daneben = Fehltipp ohne Abzug; ein zweiter Tipp innerhalb von 250 ms an derselben Stelle nach einem Treffer wird ignoriert.
- **Größe:** Durchmesser in cm über die Kalibrierung, höchstens 40 % der kürzeren Feldseite, damit immer Platz für den nächsten Punkt bleibt.
- **Hilfsperson:** große Taste „Gleichgewicht verloren“ (mindestens 56 px, Text und Zeichen) oder Taste B; ein zweiter Tipp innerhalb von 500 ms zählt nicht doppelt. Die Standposition wird nur gespeichert und gehört zum Vergleichsschlüssel.
- **Rückmeldung:** ✓/✗ als Zeichen, ein gezählter Verlust wird kurz bestätigt; kein Flackern, kein Rotblitz.
- **Ergebnis:** Treffer, verpasste Punkte, Fehltipps, Trefferquote, Reaktionszeit (Mittel, Median, Streuung), Verluste und Verluste pro Minute. Verlauf nur bei gleichen Einstellungen und gleicher Standposition.

## 3. Herleitung aus der Forschung (keine Beschreibung eines Programms)

- **Doppelaufgabe:** Gleichgewicht halten braucht Aufmerksamkeit; eine zweite Aufgabe konkurriert darum, abhängig von der Schwierigkeit der Haltungsaufgabe und der Art der zweiten Aufgabe (Woollacott & Shumway-Cook 2002). Die Übung kombiniert deshalb eine einstellbare Haltungsaufgabe mit einer visuomotorischen Tipp-Aufgabe.
- **Zielbewegung:** Die Zeit bis zum Antippen wächst mit dem Weg und sinkt mit der Zielgröße (Fitts 1954; MacKenzie 1992); Punktgröße und Bereich verändern damit die Tipp-Aufgabe.
- **Zählen statt Messen:** Ohne Plattform kann die App das Gleichgewicht nicht erfassen; die Hilfsperson zählt nach einer vorher festgelegten Regel.
- **Was nicht belegt ist:** dass diese Übung das Gleichgewicht verbessert, Stürze verhindert oder sich auf Alltag, Sport oder Verkehr überträgt.

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Ein Punkt von 6 cm misst bei etwa 50 cm Armabstand rund 7°; 3 cm etwa 3,4°. Sehschärfe spielt kaum eine Rolle.
- **Mitte und Rand:** Mit Kreuz in der Mitte erscheinen die Punkte außerhalb der Blickmitte; sie müssen aus dem Augenwinkel bemerkt und dann mit der Hand erreicht werden. Am Tablet in Armlänge reicht das Feld je nach Gerät nur einige zehn Grad weit; „nur Rand“ verstärkt den Anteil des peripheren Sehens. Ob der Blick wirklich in der Mitte bleibt, kann die App nicht messen.
- **Sehen und Gleichgewicht:** Das Sehen ist eine Informationsquelle der Haltungskontrolle neben Gleichgewichtsorgan und Signalen aus Muskeln und Gelenken; ist eine Quelle ungenau (zum Beispiel auf nachgiebigem Untergrund), werden die anderen stärker gewichtet (Peterka 2002). Blickwechsel zu den Punkten und das Ausstrecken des Arms verändern die Haltung.
- **Erscheinen und Verschwinden:** Punkte tauchen weich auf und verschwinden; bei sehr kurzer Sichtbarkeit kann das unruhig wirken (Hinweis für Lichtempfindliche). Es gibt keine Blitze.
- **Brillenträger:** Mit Gleitsicht in Armlänge durch den Zwischen- oder Nahteil; beim Blick zum Rand ist der scharfe Bereich schmal und der Kopf dreht mit (Han et al. 2003).

## 5. Neurowissenschaftliche Grundlagen

- **Haltungskontrolle:** Haltung entsteht aus dem Zusammenspiel von Sinnes- und Bewegungsprozessen; Sinnesinformationen werden je nach Aufgabe und Umgebung gewichtet, vor einer gewollten Armbewegung werden Haltungsanpassungen vorausgeplant, und der Bedarf an Aufmerksamkeit hängt von der Schwierigkeit der Haltungsaufgabe und der Fähigkeit der Person ab (Horak 2006).
- **Aufmerksamkeit teilen:** Bei gesunden und gleichgewichtsgestörten älteren Menschen trägt der Aufmerksamkeitsbedarf der Haltung unter Doppelaufgabe zur Unsicherheit bei (Woollacott & Shumway-Cook 2002).
- **Auge–Hand:** Punkt bemerken, Blick oder Aufmerksamkeit lenken, Hand führen – eine Kette aus Wahrnehmung und Zielbewegung. Eine Aussage „diese Übung trainiert Region X“ wird nicht gemacht.

## 6. Motorische Grundlagen

- **Zielbewegung:** Antippen folgt dem Fitts'schen Gesetz (Fitts 1954; MacKenzie 1992): weite Wege und kleine Punkte kosten Zeit; „nur Rand“ verlangt weitere Armbewegungen.
- **Arm und Haltung:** Jedes Ausstrecken des Arms verschiebt den Körperschwerpunkt; im Einbein- oder Tandemstand und auf wackligen Flächen wächst die Haltungsanforderung deutlich.
- **Reaktionszeit:** enthält die Verzögerung des Geräts; Touchscreens messen Zeiten je nach Gerät zu lang (Pronk et al. 2020).
- **Belastung:** längere Durchläufe ermüden Beine und Schultern; kurze Durchgänge mit Pausen.

## 7. Einflussfaktoren und Messgrenzen

- **Hilfsperson:** Was als Verlust zählt, wird vorher festgelegt; der Wert hängt von ihrer Aufmerksamkeit ab. Nur mit derselben Hilfsperson und Regel vergleichen.
- **Standposition:** wird nur gespeichert; die App prüft nicht, wie man steht.
- **Kreuz in der Mitte:** eine Bitte, keine Kontrolle; wer zu den Punkten schaut, hat eine andere Aufgabe.
- **Gerät und Aufbau:** Bildschirmgröße, Höhe des Ständers, Abstand und Touch-Latenz verändern die Werte; Ergebnisse verschiedener Geräte nicht gleichsetzen.
- **Übung:** Verbesserungen fallen deutlich größer aus, wenn der Test der Übung ähnelt; ein großer Teil ist Gewöhnung (Guo et al. 2025).

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach:** Für genau diese Übung gibt es keine Studie; Treffer und Reaktionszeit verbessern sich mit Gewöhnung an Aufbau und Gerät.
- **Naher Transfer – unklar:** In einer randomisierten Studie mit 23 älteren Menschen mit Gleichgewichtsstörung (mittleres Alter 74,8 Jahre; vier Wochen, dreimal 45 Minuten) besserten sich in allen Gruppen der Gleichgewichtswert und das Gehtempo; unter einer zusätzlichen Denkaufgabe gingen nur die Gruppen mit Doppelaufgaben-Training schneller, und reines Gleichgewichtstraining übertrug sich möglicherweise nicht auf Doppelaufgaben (Silsupadol et al. 2009).
- **Alltagstransfer – unklar:** Ein Überblick über 18 Übersichten bei kognitiv gesunden älteren Menschen fand insgesamt positive Effekte von Doppelaufgaben-Programmen mit Bewegung; Exergames wirkten nur auf die Denkleistung, die Wirkung auf körperliche Funktionen ist umstritten, Sicherheit, Übertragung und Erhalt sind unklar (Gallou-Guyot et al. 2020). Eine Cochrane-Übersicht mit 108 Studien fand, dass Bewegungsprogramme die Sturzrate bei Älteren senken, am deutlichsten Gleichgewichts- und Funktionsübungen (Rate Ratio 0,76; Sherrington et al. 2019). Das waren betreute Programme mit echten Bewegungen; für diese Übung und für gesunde Menschen ist kein Nutzen belegt.
- **Einordnung:** Treffer, Reaktionszeit und gezählte Verluste sind Zählwerte für den Vergleich mit sich selbst; weniger Verluste bei gleicher Trefferquote heißen nur, dass es auf diesem Gerät mit dieser Hilfsperson besser lief.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** unter Aufsicht eine Doppelaufgabe aus Stehen und Antippen gesucht wird; die Person sicher steht und die Standposition schrittweise anspruchsvoller werden soll; eine Hilfsperson verfügbar ist; Wahrnehmen aus dem Augenwinkel einbezogen werden soll.
- **Weniger passend, wenn …** keine Hilfsperson oder kein sicherer Halt vorhanden ist; Gleichgewicht oder Sturzrisiko gemessen werden sollen; nur im Sitzen geübt werden kann.
- **Vorsicht / anpassen bei …**
  - `sturzgefahr`: Wand oder fester Stuhl in Reichweite, Hilfsperson dabei, rutschfester Boden; zuerst fester beidbeiniger Stand, Einbein-, Tandemstand und wacklige Flächen nur mit Sicherung und Aufsicht.
  - `schwindel_vestibulaer`, `herz_kreislauf`, `gelenk_ruecken`: nur nach Rücksprache mit Ärztin, Arzt oder Therapeutin bzw. Therapeut; bei Schwindel, Übelkeit, Herzklopfen, Atemnot oder Gelenkschmerzen hinsetzen und Pause machen.
  - `photosensitive_epilepsie`: Punkte erscheinen und verschwinden; bei Lichtempfindlichkeit oder früheren Anfällen auf kurze Sichtbarkeit verzichten.
  - `hand_arm_beschwerden`: große Punkte, „nur Mitte“, kurze Durchläufe.
  - `kognitive_einschraenkung`: Kreuz aus, lange Sichtbarkeit, fester Stand.
  - Bei Schwindel, Kopf- oder Augenschmerz oder Doppelbildern sofort aufhören und abklären lassen (Muchnick 2008, S. 6, 28).
- **Kombiniert gut mit …** 925 (Orientierung mit Körperbewegung), 927 (Slalom), 401 (Mitte fixieren, Randpunkte bemerken – im Sitzen), 108 (Mitte und Rand erfassen), 205 (Doppelaufgabe am Bildschirm im Sitzen).
- Keine Diagnosen, keine Heilversprechen; keine Aussage zur Sturzvorbeugung durch diese Übung.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Verluste als Zählwert:** abhängig von Hilfsperson und Regel; eine feste Liste im Intro (Absetzen, Abstützen, Ausfallschritt, Festhalten) ist vorhanden.
- **Keine Kontrolle von Stand und Blick:** Standposition und Kreuz sind Angaben bzw. Bitten; im Ergebnis so benannt.
- **Grenzen nur gerechnet:** Sichtbarkeit, Pausen und Größen sind nicht an Menschen geprüft.

## 11. Quellen

### Von der Website angegeben
keine (eigene Übung)

### Weitere Fachliteratur
- Woollacott, M., & Shumway-Cook, A. (2002). Attention and the control of posture and gait: A review of an emerging area of research. *Gait & Posture, 16*(1), 1–14. https://doi.org/10.1016/S0966-6362(01)00156-4 – Aufmerksamkeitsbedarf der Haltung unter Doppelaufgabe (Crossref geprüft)
- Silsupadol, P., Shumway-Cook, A., Lugade, V., van Donkelaar, P., Chou, L.-S., Mayr, U., & Woollacott, M. H. (2009). Effects of single-task versus dual-task training on balance performance in older adults: A double-blind, randomized controlled trial. *Archives of Physical Medicine and Rehabilitation, 90*(3), 381–387. https://doi.org/10.1016/j.apmr.2008.09.559 – Doppelaufgaben- gegenüber Einzelaufgaben-Training (Crossref geprüft)
- Gallou-Guyot, M., Mandigout, S., Bherer, L., & Perrochon, A. (2020). Effects of exergames and cognitive-motor dual-task training on cognitive, physical and dual-task functions in cognitively healthy older adults: An overview. *Ageing Research Reviews, 63*, 101135. https://doi.org/10.1016/j.arr.2020.101135 – Überblick über Doppelaufgaben-Programme und Exergames (Crossref geprüft)
- Sherrington, C., Fairhall, N. J., Wallbank, G. K., Tiedemann, A., Michaleff, Z. A., Howard, K., Clemson, L., Hopewell, S., & Lamb, S. E. (2019). Exercise for preventing falls in older people living in the community. *Cochrane Database of Systematic Reviews, 2019*(1), CD012424. https://doi.org/10.1002/14651858.CD012424.pub2 – Bewegungsprogramme und Sturzrate (Crossref geprüft)
- Horak, F. B. (2006). Postural orientation and equilibrium: What do we need to know about neural control of balance to prevent falls? *Age and Ageing, 35*(Suppl. 2), ii7–ii11. https://doi.org/10.1093/ageing/afl077 – Haltungskontrolle, vorausgeplante Haltungsanpassungen (Crossref geprüft)
- Peterka, R. J. (2002). Sensorimotor integration in human postural control. *Journal of Neurophysiology, 88*(3), 1097–1118. https://doi.org/10.1152/jn.2002.88.3.1097 – Gewichtung der Sinnesquellen der Haltung (Crossref geprüft)
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – Zielbewegungen, Weg und Zielgröße (Crossref geprüft)
- MacKenzie, I. S. (1992). Fitts' law as a research and design tool in human-computer interaction. *Human–Computer Interaction, 7*(1), 91–139. https://doi.org/10.1207/s15327051hci0701_3 – Fitts'sches Gesetz in der Mensch-Computer-Interaktion (Crossref geprüft)
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm (Crossref geprüft)
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touchscreens messen Zeiten zu lang (Crossref geprüft)
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Überschätzung bei trainingsähnlichem Test (Crossref geprüft)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28)
