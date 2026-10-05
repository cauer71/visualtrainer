---
# ===== Kennung =====
nr: 924
kennung: labor-richtungen
name: "Richtungen (Pfeil einer von vier oder acht Richtungen zuordnen, per Touch oder mit dem Körper)"
name_original: "– (eigene Blickfit-Labor-Übung, kein Vorbild)"
kapitel: "Labor"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "labor-richtungen", name: "Richtungen", unterschiede: "eigene Labor-Übung mit Einstellungen"}
stand: 2026-10-05

# ===== Überblick =====
kurzbeschreibung: "Nach einer zufälligen Wartezeit erscheint ein großer Pfeil in eine von vier oder acht Richtungen. Man gibt so schnell wie möglich seine Richtung oder die Gegenrichtung an – per Tipp auf ein Richtungsfeld oder mit einer Körperbewegung, während eine Hilfsperson „Richtig“ oder „Falsch“ tippt. Anzahl, Richtungen, Regel, Eingabe, Antwortzeit, Wartezeit und Pfeilgröße stellt man selbst ein. Gezählt werden richtige, falsche, fehlende und zu frühe Antworten und die Reaktionszeit."
ziel_funktionen: [entscheidung_wahlreaktion, visuelle_verarbeitungsgeschwindigkeit, auge_hand_koordination]
eingabe: [touch, maus, tastatur, koerper_ohne_geraet]
tablet_geeignet: ja
dauer_sekunden: 90
schwierigkeit_anpassung: "Keine Stufen und keine automatische Anpassung; alles über Einstellungen (maßgeblich ist PARAMS in src/exercises/labor-richtungen/logic.ts): Anzahl der Pfeile (10–120, Standard 32, Richtungen gleichmäßig verteilt), Richtungen (4 oder 8), Regel (in Pfeilrichtung oder Gegenrichtung), Eingabe (Berührung oder Hilfsperson), Antwortzeit je Pfeil (500–8000 ms, Standard 2500; mit Hilfsperson mindestens 1500 ms), Wartezeit zufällig zwischen 300–3000 und 300–5000 ms (Standard 800–2000 ms), Pfeilgröße (3–16 cm, Standard 8), Ton (ändert die Wertung nicht). Leichter laut Texten: vier Richtungen, Pfeilrichtung, 3000 ms und mehr, große Pfeile, Berührung; schwerer: acht Richtungen, Gegenrichtung, 1000–1500 ms, kürzere und stärker schwankende Wartezeit. Faustregel der Texte (keine Vorgabe aus der Forschung): in drei Durchläufen über 95 % → eine Einstellung schwerer."
messgroessen: ["Richtige Antworten und Genauigkeit (Anteil an allen Pfeilen)", "Falsche Richtung (mit Hilfsperson: „Falsch“ getippt)", "Keine Antwort in der Antwortzeit", "Zu früh (vor dem Pfeil oder weniger als 0,1 s danach; nicht gewertet)", "Reaktionszeit richtiger Antworten: Mittel, Median, Streuung (mit Hilfsperson einschließlich deren Reaktion und der Körperbewegung)", "Zeit je Richtung (Zählwerte, keine Wertung)", "keine Messung von Bewegung, Gleichgewicht oder Haltung; keine Normwerte"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
# Werte für die Standardeinstellung (Berührung, vier Richtungen, Pfeilrichtung); mit Hilfsperson steigen ganzkoerper, gleichgewicht und sturzrisiko.
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 0
    nutzbares_sehfeld: 0
    blickfolge: 0
    sakkaden: 1
    fixation: 1
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 2
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 2
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 1
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 1
    verarbeitungsgeschwindigkeit: 2
    antizipation: 0
    entscheidung_wahlreaktion: 3
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 2
    zielbewegung_tempo: 2
    zielbewegung_praezision: 1
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 1
    gleichgewicht: 1
    ausdauer_belastung: 0
belastung:
  zeitdruck: 2
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 1
  sturzrisiko: 1
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Bildschirm auf Augenhöhe, sicher sitzen oder stehen", "Mit dem Finger eine von vier oder acht Tasten von mindestens 56 px treffen (Berührung) – oder eine Hilfsperson, die die Körperbewegung beurteilt und tippt", "Mit Hilfsperson: vorher vereinbaren, welche Bewegung zu welcher Richtung gehört; Wand oder fester Stuhl in Reichweite, rutschfester Boden", "Bildschirm kalibriert, damit die Pfeilgröße in cm stimmt", "Richtungen oben/unten/links/rechts (und Schrägen) sicher zuordnen können"]
vorsicht_bei: [sturzgefahr, schwindel_vestibulaer, herz_kreislauf, gelenk_ruecken, photosensitive_epilepsie, kognitive_einschraenkung]
geeignet_fuer: ["Schnelle Zuordnung eines Richtungszeichens zu einer Antwort üben, mit wählbarer Schwierigkeit (vier oder acht Richtungen, Pfeil- oder Gegenrichtung)", "Unterdrücken der naheliegenden Antwort bei der Gegenrichtung", "Mit Hilfsperson: Richtungsaufgabe mit Körperbewegung im sicheren Stand oder Sitz, die Hilfsperson bestätigt", "Vergleich mit sich selbst bei gleichen Einstellungen auf demselben Gerät (und mit derselben Hilfsperson)"]
weniger_geeignet_fuer: ["Messung von Schrittzeit, Gleichgewicht oder Sturzrisiko (die App sieht die Bewegung nicht)", "Menschen, die nicht sicher stehen können, wenn mit Körperbewegung geübt werden soll", "Normvergleich der Reaktionszeit (Touch- und Gerätelatenz, Hilfsperson)", "Diagnose, Therapie oder Sturzvorbeugung ohne betreutes Programm"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: unklar
  alltag_transfer: fehlend
  kommentar: "Für genau diese Übung gibt es keine Studie. Dass räumlich passende Reiz-Antwort-Zuordnungen schneller sind, ist ein altes, robustes Ergebnis (Fitts & Seeger 1953; Simon 1969). Schritt-Training mit echten Schritten verminderte bei Älteren Stürze und verbesserte Wahl-Schrittreaktionszeit (Okubo et al. 2017); das waren betreute Programme, keine Bildschirmübung. Bei Bildschirmübungen werden Effekte überschätzt, wenn der Test der Übung ähnelt (Guo et al. 2025)."
aehnliche_uebungen: [202, 201, 902, 703, 925, 909]
stichworte: ["Wahlreaktion", "Pfeilrichtung", "Gegenrichtung", "Reiz-Reaktions-Kompatibilität", "Richtungen zuordnen", "acht Richtungen", "Hilfsperson", "Körperbewegung", "Schritt-Training (nur Einordnung)", "Sturzgefahr beachten"]
---

# 924 · Richtungen (Pfeil einer von vier oder acht Richtungen zuordnen, per Touch oder mit dem Körper)

> Original: – (eigene Blickfit-Labor-Übung, kein Vorbild) · Blickfit: „Richtungen“ (`src/exercises/labor-richtungen/`, Kategorie Reaktion, Labor)

## 1. Kurzbeschreibung

Nach einer zufälligen Wartezeit erscheint in der Bildmitte ein großer Pfeil, der in eine von vier oder acht Richtungen zeigt (oben, rechts, unten, links und gegebenenfalls die Schrägen). Man gibt so schnell wie möglich an, wohin er zeigt – oder, bei der Regel „Gegenrichtung“, die entgegengesetzte Richtung. Bei der Eingabe „Berührung“ tippt man auf ein Richtungsfeld mit vier oder acht großen Tasten. Bei „Hilfsperson“ führt man die Richtung mit dem Körper aus (zum Beispiel Neigen nach vorn für „oben“), und eine Hilfsperson tippt „Richtig“ oder „Falsch“. Einstellbar sind Anzahl der Pfeile, Richtungen, Regel, Eingabe, Antwortzeit je Pfeil (mit Hilfsperson mindestens 1,5 s), Wartezeit und Pfeilgröße in Zentimetern. Gezählt werden richtige, falsche, fehlende und zu frühe Antworten, die Reaktionszeit und die Zeit je Richtung – nur Zählwerte, keine Messung von Bewegung oder Gleichgewicht.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `index.ts`, `logic.ts`, `texts.ts`, `science.ts` in `src/exercises/labor-richtungen/` sowie `labor-wahlreaktion/logic.ts` (gemeinsame Wahlreaktions-Logik) und `_shared/labor-sicherheit.ts` (Stand 05.10.2026).

- **Durchgang:** zufällige Wartezeit (Standard 800–2000 ms) → Pfeil sichtbar bis zur Antwort oder bis zum Ende der Antwortzeit (Standard 2500 ms) → ruhige Rückmeldung. Richtungen gleichmäßig verteilt; Standard 32 Pfeile; Schnellmodus 6 Pfeile mit höchstens 1000 ms Wartezeit.
- **Wertung:** Tipp vor dem Pfeil oder in den ersten 100 ms danach zählt als „zu früh“ und nicht in der Wertung; ein zweiter Tipp innerhalb von 350 ms nach einer Antwort wird ignoriert. Bei Berührung wird die tatsächlich getippte Richtung gespeichert. Keine Antwort in der Antwortzeit = Auslassung.
- **Regel:** „In Pfeilrichtung“ oder „In Gegenrichtung“ (gleiche Abbildung bei vier und acht Richtungen).
- **Eingabe:** Richtungsfeld mit Tasten von mindestens 56 px, die sich nie überlappen; Tastatur Pfeiltasten. Mit Hilfsperson große Tasten „Richtig“ und „Falsch“ (Text und Zeichen) und Tastatur (Leertaste, X); Antwortzeit dann mindestens 1500 ms.
- **Größe:** Pfeil in cm über die Kalibrierung, auf kleinen Bildschirmen begrenzt.
- **Rückmeldung:** ✓/✗ als Zeichen, bei Fehler ein gestrichelter Ring um die richtige Taste; kein Flackern, kein Rotblitz. Hinweis „zu langsam“ bzw. „zu früh“ als ruhiger Text.
- **Ergebnis:** Genauigkeit, Reaktionszeit (Mittel, Median, Streuung), falsche, fehlende und zu frühe Antworten, Zeit je Richtung. Verlauf nur bei gleichen Einstellungen.

## 3. Herleitung aus der Forschung (keine Beschreibung eines Programms)

- **Reiz-Reaktions-Kompatibilität:** Passen räumliche Lage von Reiz und Antwort zusammen, wird schneller und mit weniger Fehlern geantwortet (Fitts & Seeger 1953; Simon 1969); ein Modell ordnet solche Aufgaben danach, ob Reiz- und Antwortmerkmale überlappen und ob die Zuordnung passt oder vertauscht ist (Kornblum et al. 1990). Die Gegenrichtung ist eine vertauschte Zuordnung.
- **Mehr Möglichkeiten:** Die Wahlreaktionszeit wächst mit der Zahl der Möglichkeiten (Hick 1952); acht Richtungen sind deshalb schwerer als vier.
- **Körperbewegung:** Schritt-Training auf Reize hin wird bei älteren Menschen zur Sturzvorbeugung untersucht (Okubo et al. 2017); eine Wahl-Schrittaufgabe auf vier Felder wurde als Marker des Sturzrisikos untersucht (Lord & Fitzpatrick 2001). Die Variante mit Hilfsperson überträgt die Richtungsaufgabe in eine Körperbewegung, ohne sie zu messen.
- **Was nicht belegt ist:** dass diese Bildschirmübung Stürze verhindert, das Gleichgewicht verbessert oder sich auf Alltag, Sport oder Verkehr überträgt.

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Ein Pfeil von 8 cm misst in 40 cm etwa 11°, in 1 m im Stand etwa 4,6°; 3 cm sind in 40 cm etwa 4,3°. Die Richtung ist damit auch bei herabgesetztem Visus gut erkennbar; Sehschärfe spielt kaum eine Rolle.
- **Blick:** Der Pfeil erscheint in der Mitte; bei Berührung folgt ein Blick zur Zieltaste. Die Richtung eines großen, kontrastreichen Pfeils wird schnell erfasst; die Zeit liegt vor allem in Entscheidung und Antwort.
- **Bildschirm und Abstand:** Mit Hilfsperson steht der Bildschirm auf Augenhöhe, damit der Kopf nicht geneigt werden muss. Brillenträger mit Gleitsicht sehen auf größere Entfernung durch den Fernteil; der Pfeil ist groß genug.
- **Erscheinen und Verschwinden:** Pfeile tauchen auf und verschwinden; bei sehr kurzen Wartezeiten kann das unruhig wirken (Hinweis für Lichtempfindliche in den Texten). Es gibt keine Blitze.

## 5. Neurowissenschaftliche Grundlagen

- **Zuordnung und Unterdrückung:** Bei der Gegenrichtung muss die naheliegende, räumlich passende Antwort unterdrückt und eine andere gewählt werden; das kostet Zeit und führt öfter zu Fehlern (Kornblum et al. 1990). Beteiligt sind Netzwerke für Entscheidung und Handlungskontrolle; eine Aussage „diese Übung trainiert Region X“ wird nicht gemacht.
- **Haltung bei Körperbewegung:** Gleichgewicht verlangt das Zusammenspiel von Sehen, Gleichgewichtsorgan und Signalen aus Muskeln und Gelenken; wie viel Aufmerksamkeit die Haltung braucht, hängt von der Schwierigkeit der Haltungsaufgabe und der Fähigkeit der Person ab (Horak 2006). Eine Richtungsaufgabe im Stand ist deshalb für Unsichere eine zusätzliche Belastung.

## 6. Motorische Grundlagen

- **Berührung:** schnelle Zielbewegung zu einer großen Taste; die Zeit bis zum Treffen wächst mit dem Weg und sinkt mit der Zielgröße (Fitts 1954). Tasten von mindestens 56 px verringern Fehltipps.
- **Hilfsperson:** Die übende Person führt eine Körperbewegung aus; die gemessene Zeit enthält Reaktion, Bewegung und die Reaktion der Hilfsperson. Deshalb gilt mindestens 1,5 s Antwortzeit.
- **Reaktionszeit:** Touchscreens messen Zeiten durchweg etwas zu lang, je nach Gerät verschieden (Pronk et al. 2020).

## 7. Einflussfaktoren und Messgrenzen

- **Gerät:** Touch- und Bildschirmlatenz, Größe und Abstand verändern die Zeiten; Ergebnisse verschiedener Geräte nicht gleichsetzen.
- **Hilfsperson:** Ihre Aufmerksamkeit und Regel bestimmen „Richtig“/„Falsch“ und die Zeit; nur bei gleicher Hilfsperson und gleichem Aufbau vergleichbar.
- **Zu früh:** Antworten unter 100 ms werden nicht gewertet; bei sehr gleichmäßigen Wartezeiten wäre Vorwegnehmen möglich, deshalb schwanken sie zufällig.
- **Übung:** Bei Bildschirmübungen fallen Verbesserungen deutlich größer aus, wenn der Test der Übung ähnelt; ein großer Teil ist Gewöhnung an Aufgabe und Gerät (Guo et al. 2025).
- **Sicherheit statt Messung:** Bei Körperbewegung zählt zuerst der sichere Stand; die App erfasst keine Haltung.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach:** Für genau diese Übung gibt es keine Studie. In Wahlreaktionsaufgaben wird man mit Übung schneller; wie viel davon Gewöhnung an Gerät und Aufgabe ist, bleibt offen (Guo et al. 2025).
- **Naher Transfer – unklar:** Kaum Daten, ob sich eine geübte Richtungszuordnung auf andere Zuordnungsaufgaben überträgt.
- **Alltagstransfer – fehlend:** In einer Übersicht von sieben randomisierten Studien mit 660 Personen ab 60 Jahren verminderte Schritt-Training Stürze (Rate Ratio 0,48) und verbesserte Wahl-Schrittreaktionszeit, Einbeinstand und „Timed Up and Go“ (Okubo et al. 2017). Bei 477 Bewohnern von Seniorenwohnanlagen brauchten Personen mit Stürzen in der Wahl-Schrittaufgabe im Mittel länger (1322 gegenüber 1168 ms; Lord & Fitzpatrick 2001). Eine Cochrane-Übersicht mit 108 Studien fand, dass Bewegungsprogramme die Sturzrate bei Älteren senken, am deutlichsten Gleichgewichts- und Funktionsübungen (Rate Ratio 0,76; Sherrington et al. 2019). Das waren betreute Programme mit echten Schritten; für diese Bildschirmübung und für gesunde Menschen ist kein Nutzen belegt.
- **Einordnung:** Genauigkeit und Reaktionszeit sind Werte für den Vergleich mit sich selbst, keine Normwerte.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** eine kurze Wahlreaktionsaufgabe mit großen, gut erkennbaren Zeichen gesucht wird; das Unterdrücken einer naheliegenden Antwort geübt werden soll (Gegenrichtung); eine Hilfsperson verfügbar ist und die Richtung im sicheren Stand oder Sitz mit dem Körper ausgeführt werden soll.
- **Weniger passend, wenn …** Gleichgewicht, Schrittzeit oder Sturzrisiko gemessen werden sollen; die Person nicht sicher stehen kann und mit Körperbewegung üben soll; Zeitdruck vermieden werden soll (dann lange Antwortzeit wählen).
- **Vorsicht / anpassen bei …**
  - `sturzgefahr`, `schwindel_vestibulaer`, `herz_kreislauf`, `gelenk_ruecken`: Körperbewegung nur nach Rücksprache mit Ärztin, Arzt oder Therapeutin bzw. Therapeut; Wand oder fester Stuhl in Reichweite, Hilfsperson dabei, rutschfester Boden, nie auf wackligen Unterlagen ohne Sicherung; sonst nur im Sitzen mit Berührung.
  - `photosensitive_epilepsie`: Pfeile erscheinen und verschwinden; bei Lichtempfindlichkeit oder früheren Anfällen verzichten oder lange Wartezeiten wählen.
  - `kognitive_einschraenkung`: vier Richtungen, Pfeilrichtung, lange Antwortzeit.
  - Bei Schwindel, Kopf- oder Augenschmerz oder Doppelbildern sofort aufhören und abklären lassen (Muchnick 2008, S. 6, 28).
- **Kombiniert gut mit …** 202 (Wahlreaktion auf Pfeilrichtungen), 201 (Pfeil-Duell mit Ablenkung), 902 (Richtung und Wort), 703 (Tasten-Wahlreaktion), 925 (Orientierung mit Körperbewegung).
- Keine Diagnosen, keine Heilversprechen; keine Aussage zur Sturzvorbeugung durch diese Übung.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Hilfsperson als Messinstrument:** Zeit und Wertung hängen an der Hilfsperson; im Ergebnis so benannt.
- **Keine Bewegungsmessung:** Ohne Kamera oder Plattform bleibt die Körperbewegung unbeurteilt; das ist gewollt und wird nicht als Messung dargestellt.
- **Grenzen nur gerechnet:** Antwort- und Wartezeiten sind Einstellungen ohne geprüfte Stufen; Faustregel 95 % ist keine Vorgabe aus der Forschung.

## 11. Quellen

### Von der Website angegeben
keine (eigene Übung)

### Weitere Fachliteratur
- Fitts, P. M., & Seeger, C. M. (1953). S-R compatibility: Spatial characteristics of stimulus and response codes. *Journal of Experimental Psychology, 46*(3), 199–210. https://doi.org/10.1037/h0062827 – räumliche Reiz-Reaktions-Kompatibilität (Crossref geprüft: Titel, Zeitschrift, Band, Seiten)
- Simon, J. R. (1969). Reactions toward the source of stimulation. *Journal of Experimental Psychology, 81*(1), 174–176. https://doi.org/10.1037/h0027448 – Antworten zur Seite des Reizes (Crossref geprüft: Titel, Zeitschrift, Band, Seiten)
- Kornblum, S., Hasbroucq, T., & Osman, A. (1990). Dimensional overlap: Cognitive basis for stimulus-response compatibility – A model and taxonomy. *Psychological Review, 97*(2), 253–270. https://doi.org/10.1037/0033-295X.97.2.253 – Modell der Reiz-Reaktions-Kompatibilität (Crossref geprüft)
- Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology, 4*(1), 11–26. https://doi.org/10.1080/17470215208416600 – Wahlreaktionszeit und Zahl der Möglichkeiten (Crossref geprüft: Titel, Zeitschrift, Band, Seiten)
- Okubo, Y., Schoene, D., & Lord, S. R. (2017). Step training improves reaction time, gait and balance and reduces falls in older people: A systematic review and meta-analysis. *British Journal of Sports Medicine, 51*(7), 586–593. https://doi.org/10.1136/bjsports-2015-095452 – Schritt-Training bei Älteren (Crossref geprüft)
- Lord, S. R., & Fitzpatrick, R. C. (2001). Choice stepping reaction time: A composite measure of falls risk in older people. *The Journals of Gerontology Series A: Biological Sciences and Medical Sciences, 56*(10), M627–M632. https://doi.org/10.1093/gerona/56.10.m627 – Wahl-Schrittaufgabe und Sturzrisiko (Crossref geprüft)
- Sherrington, C., Fairhall, N. J., Wallbank, G. K., Tiedemann, A., Michaleff, Z. A., Howard, K., Clemson, L., Hopewell, S., & Lamb, S. E. (2019). Exercise for preventing falls in older people living in the community. *Cochrane Database of Systematic Reviews, 2019*(1), CD012424. https://doi.org/10.1002/14651858.CD012424.pub2 – Bewegungsprogramme und Sturzrate (Crossref geprüft)
- Horak, F. B. (2006). Postural orientation and equilibrium: What do we need to know about neural control of balance to prevent falls? *Age and Ageing, 35*(Suppl. 2), ii7–ii11. https://doi.org/10.1093/ageing/afl077 – Haltungskontrolle, Aufmerksamkeitsbedarf (Crossref geprüft)
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – Zielbewegungen, Weg und Zielgröße (Crossref geprüft)
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touchscreens messen Zeiten zu lang (Crossref geprüft)
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Überschätzung bei trainingsähnlichem Test (Crossref geprüft)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28)
