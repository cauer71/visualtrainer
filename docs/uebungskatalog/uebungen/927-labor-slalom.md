---
# ===== Kennung =====
nr: 927
kennung: labor-slalom
name: "Slalom (Kugel seitlich durch herablaufende Tore steuern – Finger, Pfeiltasten oder Kippen)"
name_original: "– (eigene Blickfit-Labor-Übung, kein Vorbild)"
kapitel: "Labor"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "labor-slalom", name: "Slalom", unterschiede: "eigene Labor-Übung mit Einstellungen"}
stand: 2026-10-05

# ===== Überblick =====
kurzbeschreibung: "Tore aus zwei Stangen mit einer Lücke laufen von oben nach unten; eine Kugel unten wird seitlich so gesteuert, dass sie durch jede Lücke fährt – mit dem Finger, den Pfeiltasten oder durch Kippen des Geräts. Das verlangt Vorausschau und rechtzeitig dosierte Bewegungen. Dauer, Torlücke, Geschwindigkeit, Beschleunigung, Abstand der Tore und Steuerung stellt man selbst ein. Gezählt werden durchfahrene Tore, berührte Stangen, längste Serie und die Abweichung von der Mitte der Lücke. Am besten im Sitzen."
ziel_funktionen: [kontinuierliche_steuerung, antizipation, zielbewegung_praezision]
eingabe: [touch, maus, tastatur]
tablet_geeignet: ja
dauer_sekunden: 60
schwierigkeit_anpassung: "Keine Stufen und keine automatische Anpassung; alles über Einstellungen (maßgeblich ist PARAMS in src/exercises/labor-slalom/logic.ts): Dauer (20–180 s, Standard 60), Torlücke (4–24 cm, Standard 12; höchstens 80 % der Feldbreite, mindestens Kugeldurchmesser + 1,2 cm), Geschwindigkeit der Tore (4–40 cm/s, Standard 14), Beschleunigung (0–100 % pro Minute, Standard 20), Abstand der Tore (8–30 cm, Standard 14; höchstens 60 % der Feldhöhe), Steuerung (Finger/Zeiger, Pfeiltasten oder A/D, Kippen des Geräts). Leichter laut Texten: Lücke 16–20 cm, 6–10 cm/s, keine Beschleunigung, Finger; schwerer: Lücke 6–8 cm, 20–30 cm/s, 40–80 % Beschleunigung pro Minute, kleiner Torabstand; Pfeiltasten und Kippen sind schwerer als der Finger. Faustregel der Texte (keine Vorgabe aus der Forschung): in drei Durchläufen über 90 % der Tore → eine Einstellung schwerer, unter 60 % → leichter."
messgroessen: ["Durchfahrene Tore und Trefferquote (an allen gewerteten Toren)", "Berührte Stangen (je Tor höchstens einmal)", "Längste Serie ohne Fehler", "Mittlere seitliche Abweichung von der Mitte der Lücke bei geschafften Toren (cm)", "Tatsächlich benutzte Torlücke und Torabstand (cm)", "keine Messung von Haltung, Gleichgewicht oder Blick; keine Normwerte"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 1
    blickfolge: 1
    sakkaden: 1
    fixation: 0
    bewegungswahrnehmung: 2
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 1
    inhibition: 0
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 1
    antizipation: 3
    entscheidung_wahlreaktion: 1
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 2
    zielbewegung_tempo: 1
    zielbewegung_praezision: 2
    kontinuierliche_steuerung: 3
    ruhige_hand: 1
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 2
  flimmern_lichtreize: 0
  bewegungsreize_schwindel: 2
  koerperliche_belastung: 0
  sturzrisiko: 1
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Am besten im Sitzen; wer steht oder auf einer Plattform balanciert, braucht Wand oder festen Stuhl in Reichweite und eine Hilfsperson", "Steuerung mit dem Finger über die ganze Feldbreite, mit Pfeiltasten (oder A/D) oder durch Kippen des Geräts (beidhändig festhalten; der Browser fragt erst nach Tippen auf „Kippen einschalten“ nach der Erlaubnis)", "Bildschirm kalibriert, damit Torlücke, Abstände und Geschwindigkeit in cm stimmen", "Bewegte Bilder über die Dauer des Durchlaufs vertragen"]
vorsicht_bei: [schwindel_vestibulaer, reisekrankheit, migraene_lichtempfindlich, sturzgefahr, tremor_parkinson, hand_arm_beschwerden]
geeignet_fuer: ["Eine Bewegung vorausschauend dosieren: die Kugel rechtzeitig zur nächsten Lücke steuern", "Fortlaufende seitliche Steuerung mit wählbarer Eingabe (Finger direkt, Tasten oder Kippen mit Verzögerung)", "Vergleich mit sich selbst bei gleichen Einstellungen, gleicher Steuerung und gleichem Gerät", "Kurze, spielerische Aufgabe im Sitzen ohne Lesen"]
weniger_geeignet_fuer: ["Gleichgewichtstraining oder Messung der Haltung (auch das Kippen des Geräts ist kein Gleichgewichtstraining)", "Menschen mit Schwindel oder Übelkeit bei bewegten Bildern", "Auslesen einer Balance-Plattform (die App sieht nur Tastendrücke)", "Normvergleich, Diagnose oder Therapie"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: unklar
  alltag_transfer: fehlend
  kommentar: "Für genau diese Übung gibt es keine Studie. Steueraufgaben durch einen Kanal werden in der Mensch-Computer-Forschung mit eigenen Modellen beschrieben (Accot & Zhai 1997); Vorausschau beim Steuern ist beim Autofahren gezeigt (Land & Lee 1994), aber nicht auf diese Übung übertragen. Bewegungsprogramme mit echter Bewegung senken bei Älteren die Sturzrate (Sherrington et al. 2019), Exergames wirkten in einem Überblick nur auf die Denkleistung (Gallou-Guyot et al. 2020). Für diese Steuerung am Bildschirm ist kein Alltagsnutzen belegt."
aehnliche_uebungen: [705, 803, 810, 505, 926]
stichworte: ["Slalom", "Tore", "seitliche Steuerung", "Vorausschau", "Steering Law", "Gerät kippen", "Pfeiltasten", "bewegte Bilder", "am besten im Sitzen", "keine Balance-Plattform"]
---

# 927 · Slalom (Kugel seitlich durch herablaufende Tore steuern – Finger, Pfeiltasten oder Kippen)

> Original: – (eigene Blickfit-Labor-Übung, kein Vorbild) · Blickfit: „Slalom“ (`src/exercises/labor-slalom/`, Kategorie Bewegung, Labor)

## 1. Kurzbeschreibung

Von oben laufen Tore herab: zwei Stangen mit weißen Pfosten und einer Lücke dazwischen, deren Lage von Tor zu Tor zufällig wechselt. Unten fährt eine Kugel, die man nur seitlich bewegt. Ziel ist, die Kugel rechtzeitig unter die nächste Lücke zu bringen, damit sie hindurchfährt; berührt sie eine Stange, zählt das als Fehler mit einem ruhigen ✗. Gesteuert wird mit dem Finger (die Kugel folgt direkt), mit den Pfeiltasten bzw. A und D oder durch Kippen des Geräts (die Haltung beim Start gilt als Mitte). Einstellbar sind Dauer, Torlücke und Abstand der Tore in Zentimetern, Geschwindigkeit in cm/s, eine Beschleunigung pro Minute und die Steuerung. Gezählt werden durchfahrene Tore, berührte Stangen, längste Serie und die Abweichung von der Mitte der Lücke. Die Übung ist für das Sitzen gedacht; die App misst weder Haltung noch Gleichgewicht und liest keine Balance-Plattform aus.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `index.ts`, `logic.ts`, `texts.ts`, `science.ts` in `src/exercises/labor-slalom/` sowie `_shared/labor-steuerung.ts` und `_shared/labor-sicherheit.ts` (Stand 05.10.2026).

- **Tore:** laufen mit der eingestellten Geschwindigkeit nach unten, die mit der Zeit um die Beschleunigung je Minute steigt (v = v₀ · (1 + p · t / 60 s)); Abstand der Tore in cm. Die Mitte der Lücke springt von Tor zu Tor höchstens um 35 % der Feldbreite und bleibt im Feld. Bewegung zeitbasiert, unabhängig von der Bildrate.
- **Wertung:** Ein Tor wird gewertet, wenn es die Höhe der Kugel erreicht: durchfahren, wenn die Kugel ganz in der Lücke liegt, sonst „Stange berührt“ (je Tor höchstens einmal). Abweichung von der Mitte der Lücke nur für geschaffte Tore.
- **Größen:** Kugelradius etwa 10 % der kürzeren Feldseite (0,5–1,2 cm); Torlücke höchstens 80 % der Feldbreite und mindestens Kugeldurchmesser + 1,2 cm; Torabstand höchstens 60 % der Feldhöhe; die Kugel bleibt ganz im Feld. Beim Drehen des Tablets wird umgerechnet; benutzte Werte stehen im Ergebnis.
- **Steuerung:** Finger/Zeiger als absolute Position; Pfeiltasten (A/D) und Kippen als Achse mit bis zu 0,9 Feldbreiten pro Sekunde. Kippen: relativ zur Haltung beim Start, unter 2° keine Bewegung, voller Ausschlag ab 20°; wird erst nach Tippen auf „Kippen einschalten“ angefragt; ohne Erlaubnis oder Sensor Rückfall auf Finger und Tasten. Sensorwerte werden weder gespeichert noch gesendet.
- **Sitzung:** nach Zeit (Standard 60 s; Schnellmodus 8 s); 10 Punkte je durchfahrenem Tor.
- **Ergebnis:** durchfahrene Tore, Trefferquote, berührte Stangen, längste Serie, Abweichung von der Mitte, benutzte Lücke und Abstand. Verlauf nur bei gleichen Einstellungen (auch gleicher Steuerung).

## 3. Herleitung aus der Forschung (keine Beschreibung eines Programms)

- **Steuern durch einen Kanal:** Aufgaben, bei denen man einer Bahn folgt oder durch einen engen Kanal steuert, werden mit eigenen Modellen beschrieben, die über das Fitts'sche Gesetz hinausgehen (Accot & Zhai 1997). Eine schmalere Lücke und höheres Tempo machen die Aufgabe schwerer.
- **Vorausschau:** Beim Autofahren richten Fahrer den Blick 1 bis 2 s vor jeder Kurve auf einen Punkt an der Innenseite der Kurve (Land & Lee 1994). Die Tore von oben erlauben ähnlich, die nächste Lücke vorauszusehen; ob das auf diese Übung übertragbar ist, wurde nicht untersucht.
- **Mehrere Eingaben:** Finger (direkt), Tasten und Kippen (über Geschwindigkeit, mit Verzögerung) verändern die Steueraufgabe; Kippen ist kein Haltungs- oder Gleichgewichtstraining.
- **Was nicht belegt ist:** ein Nutzen für Gleichgewicht, Stürze, Alltag, Sport oder Verkehr.

## 4. Optische und okulomotorische Grundlagen

- **Tempo im Sehwinkel:** Bei 40 cm Abstand entsprechen 14 cm/s etwa 20°/s, 30 cm/s etwa 41°/s; eine Lücke von 12 cm etwa 17°. Bei 14 cm Torabstand kommt etwa jede Sekunde ein Tor.
- **Blick:** Die Tore bewegen sich gleichmäßig nach unten; der Blick wechselt zwischen Kugel und nächster Lücke (Sakkaden) oder begleitet ein Tor ein Stück (Folgebewegung). Die nächste Lücke wird oft schon aus dem Augenwinkel erfasst.
- **Bewegte Bilder:** Ständig bewegter Bildinhalt kann Schwindel oder Übelkeit auslösen; die Fläche ist aber klein im Vergleich zu großflächiger Bewegung. Es gibt keine Blitze, Rückmeldungen sind ruhig (✓/✗ als Zeichen).
- **Bildschirm:** Bewegung erscheint bei niedriger Bildrate ruckelig; die Bewegung ist zeitbasiert, die Darstellung hängt dennoch vom Gerät ab.
- **Brillenträger:** Mit Gleitsicht in 40 cm durch den Nahteil; die Aufgabe braucht keine feinen Details.

## 5. Neurowissenschaftliche Grundlagen

- **Wahrnehmung und Steuerung:** Die Bewegung der Tore wird in bewegungsempfindlichen Arealen der Sehrinde verarbeitet; die Steuerung verlangt, aus Lage und Tempo der nächsten Lücke den nötigen Weg vorauszuberechnen und die Hand- oder Kippbewegung fortlaufend anzupassen.
- **Vorausschau beim Steuern:** Beim Autofahren dient ein bestimmter Blickpunkt zur Vorhersage der Kurvenkrümmung (Land & Lee 1994); ähnliche Vorausschau ist hier gefordert, aber nicht untersucht.
- Eine Aussage „diese Übung trainiert Region X“ wird nicht gemacht.

## 6. Motorische Grundlagen

- **Finger:** absolute Position; die Kugel folgt dem Finger ohne Trägheit, die Hand kann aber Teile des Felds verdecken. Präzision wird durch die Lückenbreite bestimmt.
- **Tasten und Kippen:** Steuerung über Geschwindigkeit; man muss vorausschauend beginnen und rechtzeitig stoppen, das ist schwerer als mit dem Finger. Beim Kippen hält man das Gerät mit beiden Händen; Unterarme und Handgelenke arbeiten fortlaufend.
- **Modelle:** Für Steueraufgaben durch einen Kanal wächst die Zeit mit Länge und Enge des Kanals (Accot & Zhai 1997); hier geben Tempo und Lücke vor, wie viel Zeit bleibt.
- **Sitzen und Stehen:** Im Sitzen ist keine Haltungsarbeit nötig; wer steht oder auf einer Plattform mit Tasteneingabe balanciert, hat eine zusätzliche Gleichgewichtsaufgabe mit Sturzgefahr.

## 7. Einflussfaktoren und Messgrenzen

- **Kalibrierung:** Lücke, Abstand und Tempo in cm stimmen nur bei kalibriertem Bildschirm; auf kleinen Bildschirmen werden Lücke und Abstand begrenzt (benutzte Werte im Ergebnis).
- **Steuerung:** Finger, Tasten und Kippen sind verschiedene Aufgaben; nur gleiche Steuerung vergleichen. Kippen hängt vom Sensor und von der Startlage ab.
- **Gerät:** Bildrate, Touch-Latenz (Pronk et al. 2020) und Bildschirmgröße verändern die Aufgabe; Ergebnisse verschiedener Geräte nicht gleichsetzen.
- **Übung:** Bei Bildschirmübungen fallen Verbesserungen deutlich größer aus, wenn der Test der Übung ähnelt; ein großer Teil ist Gewöhnung an Aufgabe und Gerät (Guo et al. 2025).
- **Zufall:** Die Lage der Lücken wechselt zufällig; einzelne Durchläufe schwanken.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach:** Für genau diese Übung gibt es keine Studie; in Steuer- und Bildschirmspielen wird man durch Gewöhnung meist besser.
- **Naher Transfer – unklar:** Keine Daten, ob sich die Steuerung auf andere Steueraufgaben überträgt.
- **Alltagstransfer – fehlend:** Eine Cochrane-Übersicht mit 108 Studien an 23.407 Menschen ab 60 Jahren fand, dass Bewegungsprogramme die Sturzrate senken, am deutlichsten Gleichgewichts- und Funktionsübungen (Rate Ratio 0,76; Sherrington et al. 2019). Ein Überblick über 18 Übersichten bei kognitiv gesunden älteren Menschen fand positive Effekte von Doppelaufgaben-Programmen mit Bewegung; Exergames wirkten nur auf die Denkleistung, die Wirkung auf körperliche Funktionen ist umstritten, Sicherheit, Übertragung und Erhalt sind unklar (Gallou-Guyot et al. 2020). Das waren Programme mit Bewegung des ganzen Körpers, keine Steuerung am Bildschirm; für diese Übung und für gesunde Menschen ist kein Nutzen belegt.
- **Einordnung:** Tore, Trefferquote, Serie und Abweichung sind Zählwerte für den Vergleich mit sich selbst, keine Normwerte.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** eine kurze, spielerische Steueraufgabe mit Vorausschau im Sitzen gesucht wird; die Eingabe gewählt werden soll (Finger direkt, Tasten oder Kippen); kein Lesen nötig sein soll.
- **Weniger passend, wenn …** bewegte Bilder Schwindel oder Übelkeit auslösen; Gleichgewicht oder Haltung geübt oder gemessen werden sollen; feine Handbewegungen nicht möglich sind (dann große Lücke, langsames Tempo).
- **Vorsicht / anpassen bei …**
  - `schwindel_vestibulaer`, `reisekrankheit`, `migraene_lichtempfindlich`: ständig bewegter Bildinhalt; kurze Durchläufe, langsames Tempo, bei Unwohlsein sofort aufhören.
  - `sturzgefahr`: im Sitzen üben; wer steht oder auf einer Plattform balanciert, nur mit Halt in Reichweite und Hilfsperson.
  - `tremor_parkinson`, `hand_arm_beschwerden`: große Lücke, langsames Tempo; Kippen nur, wenn das Gerät sicher beidhändig gehalten werden kann.
  - Bei Schwindel, Kopf- oder Augenschmerz oder Doppelbildern sofort aufhören und abklären lassen (Muchnick 2008, S. 6, 28).
- **Kombiniert gut mit …** 705 (Ball durch eine schmale Bahn führen), 803 (Hindernissen ausweichen), 810 (Kugel durch einen schrägen Gang), 505 (seitlich nachführen), 926 (Balance-Touch im Stand, unter Aufsicht).
- Keine Diagnosen, keine Heilversprechen; Kippen ist kein Gleichgewichtstraining.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Verdeckung bei Fingersteuerung:** Die Hand kann Tore verdecken; Tasten oder Kippen vermeiden das, sind aber schwerer.
- **Kippen geräteabhängig:** Sensorqualität und Startlage beeinflussen die Steuerung; Rückfall auf Finger und Tasten ist vorhanden.
- **Grenzen nur gerechnet:** Tempo, Beschleunigung, Lücken und Faustregeln (90 %/60 %) sind nicht an Menschen geprüft.

## 11. Quellen

### Von der Website angegeben
keine (eigene Übung)

### Weitere Fachliteratur
- Accot, J., & Zhai, S. (1997). Beyond Fitts' law: Models for trajectory-based HCI tasks. In *Proceedings of the ACM SIGCHI Conference on Human Factors in Computing Systems* (pp. 295–302). https://doi.org/10.1145/258549.258760 – Steuern durch einen Kanal (Crossref geprüft: Titel, Konferenz, Seiten)
- Land, M. F., & Lee, D. N. (1994). Where we look when we steer. *Nature, 369*(6483), 742–744. https://doi.org/10.1038/369742a0 – Vorausschau beim Steuern (Crossref geprüft)
- Sherrington, C., Fairhall, N. J., Wallbank, G. K., Tiedemann, A., Michaleff, Z. A., Howard, K., Clemson, L., Hopewell, S., & Lamb, S. E. (2019). Exercise for preventing falls in older people living in the community. *Cochrane Database of Systematic Reviews, 2019*(1), CD012424. https://doi.org/10.1002/14651858.CD012424.pub2 – Bewegungsprogramme und Sturzrate (Crossref geprüft)
- Gallou-Guyot, M., Mandigout, S., Bherer, L., & Perrochon, A. (2020). Effects of exergames and cognitive-motor dual-task training on cognitive, physical and dual-task functions in cognitively healthy older adults: An overview. *Ageing Research Reviews, 63*, 101135. https://doi.org/10.1016/j.arr.2020.101135 – Überblick über Exergames und Doppelaufgaben-Programme (Crossref geprüft)
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Überschätzung bei trainingsähnlichem Test (Crossref geprüft)
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touch- und Gerätelatenz (Crossref geprüft)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28)
