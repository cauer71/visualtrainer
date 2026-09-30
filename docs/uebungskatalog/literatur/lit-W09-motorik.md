# Literaturbasis W09 – Motorik am Eingabegerät (Katalognummern 701–708)

Stand: 29.09.2026 · Gruppe: 701 CPS-Test (rapid-tapping), 702 Aim Trainer (aim-trainer), 703 Tastatur-Reaktion
(keyboard-recognition), 704 Präzisions-Flick (precision-flick-shot), 705 Ruhige Hand / Heißer Draht (steady-hand),
706 Drag-and-Drop (drag-and-drop), 707 Pfad nachfahren (tracing), 708 Zielwechsel in Reihenfolge (finger-sequencing).

**Prüfmethode.** Jede DOI wurde über `api.crossref.org/works/<DOI>` abgefragt (Titel, Autor:innen, Jahr, Zeitschrift,
Band, Seiten). Inhalte wurden – soweit zugänglich – am Abstract (Europe PMC/PubMed, Crossref, Verlags- oder
Autorenseite) oder am Volltext (frei verfügbare Autorenfassung) geprüft. Prüfvermerke in Teil D:
**VT** = Volltext gelesen · **AB** = Abstract gelesen · **MD** = nur Metadaten (Inhalt aus Sekundärquelle, jeweils genannt) ·
**01/02/03** = bereits in `docs/wissenschaft/0X-….md` geprüft und hier per Crossref erneut bestätigt.
Eigene Berechnungen sind als **[eigene Berechnung]** gekennzeichnet. Kein Originalcode der Vorlage übernommen; die
Spielparameter stammen hier nur aus dem Seitentext (Code-Analyse ist Aufgabe der Autor-Agenten).

---

## A) Prüftabelle der Website-Quellen je Übung

### A0 · Übersicht aller 18 verschiedenen Website-Quellen (bibliografische Prüfung)

| ID | Angabe der Website | Crossref-/Bibliografie-Prüfung | Ergebnis |
|---|---|---|---|
| W1 | Halstead (1947), *Brain and intelligence*, Univ. of Chicago Press | Buch, keine DOI; existiert (APA PsycNET-Datensatz 1948-01497-000; 50 Lobektomie-Fälle + 187 weitere Personen) | Angabe korrekt; Norm „50–55 Taps/10 s“ darin **nicht prüfbar** |
| W2 | Todor & Kyprie (1980), J Motor Behav 12(1), 57–62, 10.1080/00222895.1980.10735205 | ✓ alles stimmt | korrekt |
| W3 | Keele (1968), Psychol Bull 70(6), 387–403, 10.1037/h0026739 | ✓ (Heft „6, Pt. 1“) | korrekt |
| W4 | Woods et al. (2015), Front Hum Neurosci 9, 131, 10.3389/fnhum.2015.00131 | ✓ | korrekt |
| W5 | Fitts (1954), J Exp Psychol 47(6), 381–391, 10.1037/h0055392 | ✓ | korrekt |
| W6 | MacKenzie (1992), Hum-Comput Interact 7(1), 91–139, 10.1207/s15327051hci0701_3 | ✓ | korrekt |
| W7 | „Elliott, D., Helsen, W. F., & Chua, R. (2010). Goal-directed aiming: Two components but multiple processes“, Psychol Bull 136(6), 1023–1044, 10.1037/a0020958 | DOI/Titel/Jahr ✓, **Autor:innen falsch**: richtig Elliott, Hansen, Grierson, Lyons, Bennett & Hayes (2010). „Elliott, Helsen & Chua“ sind die Autoren von *A century later: Woodworth's (1899) two-component model* (2001), Psychol Bull 127(3), 342–357, 10.1037/0033-2909.127.3.342 | **fehlerhaft** (zwei Arbeiten vermischt; auf 702, 704, 706) |
| W8 | Woodworth (1899), Psychol Rev Monogr Suppl 3(3), i–114, 10.1037/h0092992 | ✓ (Originaltitel „Accuracy of voluntary movement“ ohne „The“) | korrekt |
| W9 | Donders (1868/1969), Acta Psychol 30, 412–431, 10.1016/0001-6918(69)90065-1 | ✓ (Übersetzung von W. G. Koster, 1969) | korrekt |
| W10 | Hick (1952), Q J Exp Psychol 4(1), 11–26, 10.1080/17470215208416600 | ✓ | korrekt |
| W11 | Logan & Cowan (1984), Psychol Rev 91(3), 295–327, 10.1037/0033-295X.91.3.295 | ✓ | korrekt |
| W12 | Sternberg (1966). „High-speed scanning in human **perception**“, Science 153(3736), 652–654, 10.1126/science.153.3736.652 | DOI ✓, **Titel falsch**: richtig „High-speed scanning in human **memory**“ | **fehlerhaft** (Titel; inhaltlich Gedächtnissuche, nicht Motorik) |
| W13 | Meyer et al. (1988), Psychol Rev 95(3), 340–370, 10.1037/0033-295X.95.3.340 | ✓ | korrekt |
| W14 | Accot & Zhai (1997), CHI '97, 295–302, 10.1145/258549.258760 | ✓ | korrekt |
| W15 | MacKenzie, Sellen & Buxton (1991), CHI '91, 161–166, 10.1145/108844.108868 | ✓ (Crossref-Titel mit Tippfehler „element pointing“, Original „elemental“) | korrekt |
| W16 | Krauzlis (2004), J Neurophysiol 91(2), 591–603, 10.1152/jn.00801.2003 | ✓ | korrekt |
| W17 | Rashbass (1961). „The relationship between saccadic and smooth **pursuit** eye movements“, J Physiol 159(2), 326–338, 10.1113/jphysiol.1961.sp006811 | DOI ✓, Titel leicht falsch: Original „… smooth **tracking** eye movements“ | geringfügig fehlerhaft |
| W18 | Lashley (1951), *Cerebral Mechanisms in Behavior*, 112–136, **doi.org/10.1037/11147-006** | **DOI existiert nicht** (doi.org: 404). Das Präfix 10.1037/11147-… gehört zu einem anderen Buch (Machover, 1949, *Personality projection in the drawing of the human figure*). Richtig: Kapitel in L. A. Jeffress (Hrsg.), *Cerebral mechanisms in behavior: The Hixon Symposium*, Wiley, 1951, **keine DOI**; Seitenangaben in der Literatur uneinheitlich (112–131/136/146) | **fehlerhaft** (DOI) |

**Bilanz:** 18 verschiedene Quellen (39 Nennungen auf den 8 Seiten). Bibliografisch fehlerhaft: **4** (W7 Autor:innen,
W12 Titel, W17 Titel geringfügig, W18 DOI ungültig); W1 ist ein Buch ohne DOI, dessen zitierte Normzahl nicht prüfbar
ist. Inhaltlich werden die Quellen oft für Aussagen angeführt, die sie nicht enthalten (siehe A1–A8). Alle acht
Seiten tragen den Satz „Every figure quoted on this page comes from the published work listed above, not from this
site's visitors“ und „SkillDrills collects no aggregate performance data“ – **die Stufen-/Perzentil-Tabellen („Top 1 %“,
„Top 0.1 % Weltklasse“) haben damit ausdrücklich keine Datengrundlage**; sie stehen in keiner der genannten Quellen.

### A1 · 701 CPS-Test (rapid-tapping)

| Angabe der Website (Aussage) | DOI-Prüfung | Stützt die Aussage? |
|---|---|---|
| Halstead (1947): Referenzwert 50–55 Taps/10 s für den dominanten Zeigefinger | Buch ohne DOI (W1) | **teilweise/nicht prüfbar**: Halstead führte den Finger-Oscillation-Test ein; die konkrete Normzahl stammt aus späteren Normtabellen und ist in W1 nicht nachprüfbar. Größenordnung plausibel: Smartphone-Wechseltippen gesunder Kontrollen 54,5 Tipps/10 s (F4) |
| Todor & Kyprie (1980): 5–7 CPS; „zentralnervöse Refraktärzeiten begrenzen Zeigefingertippen bei 5,5–7,0 Hz“ | ✓ (W2) | **teilweise/nein**: Studie (n = 24) zeigt nur, dass die dominante Hand kürzere und gleichmäßigere Intertap-Intervalle hat, v. a. in der Drückphase. Zu Refraktärzeiten oder Hz-Grenzen keine Aussage im Abstract |
| Keele (1968): „Höhere Werte werden über offene motorische Bewegungsprogramme gesteuert“ | ✓ (W3) | **teilweise**: Keele definiert das motorische Programm (vorab strukturierte Befehlsfolge ohne Rückmeldung). Dass Klickraten > 7 Hz so zu erklären sind, steht dort nicht (MD) |
| Woods et al. (2015): Bildperiode 16,7/6,9/4,1 ms bei 60/144/240 Hz; Maus-Polling 1–8 ms | ✓ (W4) | **teilweise**: Die Periodendauern sind reine Arithmetik (1/f). Woods nutzten nur einen 60-Hz-LCD, maßen 11,0 ms Monitorverzögerung und 17,8 ms Monitor + Maus; Standard-Maustreiber können ≥ 20 ms hinzufügen (VT). 144/240 Hz kommen dort nicht vor |
| „Stärkt Unterarmsehnen, steigert motorische Aktivierungsgeschwindigkeit, verzögert Ermüdung“; „Laktatbildung“ | keine Quelle | **nicht belegt**. Belegt ist eher Belastung: Handgelenk-/Handschmerz bei E-Sportlern 36 %/32 % (F84), Ermüdung der Handgelenkstrecker beim Maus-Zielen (F28) |
| Jitter-/Butterfly-Clicking-Physiologie („isometrische Ko-Kontraktion, Mikrozuckungen“) | keine Quelle | **nicht belegt** (keine Fachliteratur gefunden). Nur indirekt: Zwei-Finger-Wechseltippen senkt die Rate je Finger, am wenigsten bei Zeige-/Mittelfinger (F6) |
| CPS-Rangliste „Top 0.1 % … Top 50 %“ | – | **keine Datengrundlage** (Website sammelt selbst keine Daten, s. A0) |

### A2 · 702 Aim Trainer (aim-trainer)

| Angabe der Website (Aussage) | DOI-Prüfung | Stützt die Aussage? |
|---|---|---|
| Fitts (1954): MT = a + b·log₂(2D/W) | ✓ (W5) | **ja** für ruhende Ziele. Die Ziele der Übung **bewegen** sich (80 → 370 px/s laut FAQ); dafür sagt der Fitts-Index die Erfassungszeit nicht zuverlässig voraus (Jagacinski et al., 1980; Huang et al., 2018 – F24) → für diese Übung **teilweise** |
| MacKenzie (1992): Fitts-Gesetz in der HCI | ✓ (W6) | **ja** (empfiehlt allerdings die Shannon-Form log₂(D/W + 1), nicht die gezeigte Originalform) |
| MacKenzie (1992) als Beleg für „konstante Mausempfindlichkeit (cm/360°) beibehalten“ | ✓ | **nein** (nicht Thema der Arbeit) |
| Woodworth (1899) / Elliott et al. (2010): ballistischer Impuls + Feinkorrektur | W8 ✓, W7 Autor:innen falsch | **ja** für das Zwei-Komponenten-Prinzip (Elliott 2001, 2010 – AB) |
| „Primärimpuls legt 80–90 % der Strecke in 120–180 ms zurück – zu schnell für visuelle Korrekturen“ | W7/W8 | **nein** (Zahlen stehen nicht in den Abstracts). Gegenbeleg: Sichtrückmeldung verbessert die Genauigkeit auch bei Bewegungen < 190 ms (Zelaznik et al., 1983); Elliott et al. (2010, 2017) beschreiben gerade frühe Online-Kontrolle („impulse control“) |
| Woods et al. (2015): „physiologische Signalwege 130–190 ms“ | ✓ | **teilweise**: Reizentdeckung 131 ms, einfache Reaktionszeit 213 ms (hardwarekorrigiert); < 190 ms nennt Woods als historische Galton-Werte |
| Woods et al. (2015) als Beleg für „entspannte Griffhaltung“ | ✓ | **nein** |
| „144/240-Hz-Monitor + 1000-Hz-Maus verringern die Latenz um 10–12 ms“ | keine Quelle | **teilweise** (Größenordnung arithmetisch plausibel: mittlere Bildwartezeit 8,3 → 2,1 ms, mittlere Polling-Wartezeit 4 → 0,5 ms [eigene Berechnung]); Leistungsvorteil kommt vor allem aus geringerer Latenz, weniger aus der Bildfrequenz (Spjut et al., 2019 – F26) |
| Leistungsstufen „Tier 1 > 48.000 Punkte, Profi-Niveau“ | – | **keine Datengrundlage** |

### A3 · 703 Tastatur-Reaktion (keyboard-recognition)

| Angabe der Website (Aussage) | DOI-Prüfung | Stützt die Aussage? |
|---|---|---|
| Donders (1868): Wahlreaktionszeit | ✓ (W9) | **ja** (Subtraktionsmethode, einfache vs. Wahlreaktion) |
| „Visuelle Reizverarbeitung benötigt physiologisch rund 200–250 ms“ | (W9/W4) | **nein**: kalibriert gemessene Reizentdeckung ≈ 131 ms, einfache Reaktion 213–231 ms (Woods et al., 2015) |
| Hick (1952): RT steigt logarithmisch mit der Zahl der Alternativen | ✓ (W10) | **ja** |
| „Gelerntes Muskelgedächtnis nähert die Reaktionszeit einem einfachen Reflex an“ | W10 | **teilweise**: Übung und Reiz-Reaktions-Kompatibilität verkleinern die Hick-Steigung (Proctor & Schneider, 2018 – AB); „Reflex“ ist fachlich falsch (bleibt eine willkürliche Wahlreaktion) |
| Logan & Cowan (1984): Stopp-Signal-Paradigma für „Fake Prompts“ | ✓ (W11) | **teilweise**: Die Arbeit liefert das Wettlaufmodell (Go- vs. Stopp-Prozess). Die roten Scheinreize der Übung sind aber eher **Go/No-go** (der Reiz selbst sagt „nicht drücken“), kein Stopp-Signal nach dem Go-Reiz; Aussage „der präfrontale Kortex muss unterdrücken“ steht dort nicht (Verhaltensmodell). Zu Go/No-go-Varianten: Wessel (2018) |
| Sternberg (1966): Sequenz-Chunking / motorische Gesten | Titel falsch (W12) | **nein**: Die Arbeit zeigt **Gedächtnissuche** (RT steigt linear mit der Listenlänge, 25–30 Symbole/s – AB), nichts zu motorischen Sequenzen. Passend wären Sternberg, Monsell, Knoll & Wright (1978) zur Latenz schneller Bewegungsfolgen (MD) oder Sakai et al. (2003) zu Chunking (AB) |
| Woods et al. (2015): browserbasierte Messgenauigkeit, gleiches Setup vergleichen | ✓ | **ja** (sinngemäß; zusätzlich Pronk et al., 2020; Wimmer et al., 2019) |
| Benchmarks „Einzeltasten-Latenz < 240 ms = Top 1 %“ | – | **keine Datengrundlage**; zudem unplausibel: < 240 ms liegt nahe an der einfachen Reaktionszeit (213–231 ms), eine Wahl aus 19+ Tasten mit Zeichenerkennung ist normalerweise deutlich langsamer [eigene Einordnung nach Hick/Woods] |

### A4 · 704 Präzisions-Flick (precision-flick-shot)

| Angabe der Website (Aussage) | DOI-Prüfung | Stützt die Aussage? |
|---|---|---|
| Meyer et al. (1988): Stochastic Optimized Submovement Model, geschwindigkeitsabhängiges Rauschen, korrektive Zweitbewegung | ✓ (W13) | **ja** für das Modell (Rauschen wächst mit der Geschwindigkeit; vgl. Harris & Wolpert, 1998 – F19). „Korrekturlatenz 150–200 ms“ **nicht belegt** (kein Abstract verfügbar, MD) |
| Woodworth (1899): Zwei-Phasen-Steuerung | ✓ (W8) | **ja** (Elliott et al., 2001 – AB) |
| MacKenzie (1992): „Schützen müssen die Geschwindigkeit des Primärimpulses tarieren“ | ✓ (W6) | **teilweise** (Fitts-Methodik ja, Aussage zur Impulstarierung stammt aus Meyer et al.) |
| Fitts (1954) | ✓ (W5) | **ja** |
| Elliott et al. (2010): „zentrale Rolle antagonistischer Muskelaktivierung beim Abbremsen“ | Autor:innen falsch (W7) | **teilweise**: Die Arbeit behandelt Planung, Energie-/Sicherheitskosten und Online-Kontrolle; Antagonisten sind dort nicht die Kernaussage (AB) |
| Woods et al. (2015): 16,7 ms bei 60 Hz, 6,9 ms bei 144 Hz | ✓ | **teilweise** (Arithmetik; Woods nur 60 Hz, s. A1) |
| „Bulls-Eye im inneren 8-px-Kern trainiert foveale Ausrichtung“ | – | **nicht belegt**. Der Kern ist ≈ 2 mm/0,2° groß [eigene Berechnung, F86] – mit dem Finger auf Touch praktisch nicht gezielt treffbar (F75) |
| Tabelle „Tier 1: < 340 ms, Abbremsen unter 10 ms“, „auf Basis Woodworth/Meyer“ | – | **keine Datengrundlage**; die zitierten Arbeiten enthalten keine solchen Stufen |

### A5 · 705 Ruhige Hand / Heißer Draht (steady-hand)

| Angabe der Website (Aussage) | DOI-Prüfung | Stützt die Aussage? |
|---|---|---|
| Accot & Zhai (1997): Steuerungsgesetz; „Halbierung der Pfadbreite verdoppelt die Führungszeit“; Zeit ∝ Integral ds/W(s) | ✓ (W14) | **ja/weitgehend**: T = a + b·A/W (gerader Tunnel), lokale Geschwindigkeit ∝ Breite. Halbierte Breite verdoppelt den breitenabhängigen Anteil b·A/W, die Gesamtzeit etwas weniger (wegen a) |
| „Vor engen Schikanen um 40 % drosseln“, „Kurven am Apex schneiden“ | W14 | **nein** (nicht in der Quelle) |
| Woodworth (1899): „Blickvorlauf 20–30 px vor den Cursor verschafft ~150 ms Pufferzeit“; „geschlossener Regelkreis dominiert“ | ✓ (W8) | **nein** für die Zahlen; **teilweise** für „Rückkopplung dominiert“ (plausibel für langsames Führen, nicht Woodworths Befund) |
| „Physiologischer Tremor 8–12 Hz durch synchrone Entladungen motorischer Einheiten und mechanische Resonanz“ | keine Quelle | **teilweise ja**: 8–12-Hz-Komponente belegt (Elble, 1986); Ursache multifaktoriell (zentrale ~10-Hz-Oszillationen, Entladeverhalten, mechanische und Reflex-Resonanz; McAuley & Marsden, 2000) |
| „Koffein verstärkt die Schwingung“ | keine Quelle | **widerlegt/zweifelhaft**: 325 mg Koffein erhöhten weder physiologischen noch essenziellen oder Parkinson-Tremor (Koller et al., 1987) |
| „400–800 DPI filtern Zittern mechanisch besser heraus“ | keine Quelle | **nicht belegt**. Niedrige Übersetzung (CD-Gain) verkleinert zwar die Bildschirm-Auslenkung jeder Handbewegung [eigene Einordnung], verschlechtert aber die Leistung durch häufiges Nachsetzen („clutching“); hohe Gain schadet wenig (Casiez et al., 2008) |
| Woods et al. (2015): 125-Hz-Polling ≈ 8 ms vs. 1000 Hz ≈ 1 ms | ✓ | **teilweise**: Woods nennt ≥ 20 ms bei Standardtreibern und nutzte 1 kHz; die Polling-Arithmetik ist korrekt; reale USB-Latenzen streuen je Gerät bis zu mehreren Dutzend ms (Wimmer et al., 2019) |
| „Chirurgen, Grafiker profitieren“ | – | **nicht belegt**; nur Korrelation Videospiel-Erfahrung ↔ Laparoskopie-Leistung (Rosser et al., 2007, n = 33, Querschnitt) |
| Stufen „Neurochirurg (Apex Surgeon) Top 1 %“ | – | **keine Datengrundlage** („redaktionelle Richtwerte“ laut Seite selbst) |

### A6 · 706 Drag-and-Drop (drag-and-drop)

| Angabe der Website (Aussage) | DOI-Prüfung | Stützt die Aussage? |
|---|---|---|
| MacKenzie, Sellen & Buxton (1991): Ziehen ist langsamer und fehleranfälliger als Zeigen | ✓ (W15) | **ja** (VT): Maus 674 → 916 ms, Fehler 3,5 → 10,8 % (n = 12) |
| MacKenzie et al. (1991): „typischer Durchsatzverlust 15–25 %“ | ✓ | **teilweise**: Index of Performance Maus 4,5 → 4,0 bit/s (−11 %), Grafiktablett 4,9 → 3,6 (−27 %), Trackball 3,3 → 1,5 (−55 %) |
| MacKenzie et al. (1991): „isometrische Ko-Kontraktion“, „Anpressdruck verändert Reibungskoeffizient“ | ✓ | **teilweise/nein**: Die Arbeit sagt nur, dass das Halten der Taste die Bewegungsfreiheit einschränkt („restricting the freedom of movement“); Reibung/Ko-Kontraktion kommen nicht vor |
| Accot & Zhai (1997): „the carry obeys the Steering Law“ | ✓ (W14) | **teilweise/nein**: Freies Ziehen zu einem Ziel ohne Korridor ist eine Fitts-Aufgabe – MacKenzie et al. (1991) modellierten Ziehen mit Fitts (r = 0,99 für die Maus). Das Steuerungsgesetz gilt nur, wenn der Weg begrenzt ist |
| Elliott et al. (2010): antagonistische Bremsung | Autor:innen falsch (W7) | **teilweise** (s. A4) |
| Fitts (1954) | ✓ | **ja** |
| Woods et al. (2015): Bildfrequenz/Polling | ✓ | **teilweise** (s. A1) |
| „Transportzeit < 420 ms = Elite“ | – | **keine Datengrundlage** |

### A7 · 707 Pfad nachfahren (tracing)

| Angabe der Website (Aussage) | DOI-Prüfung | Stützt die Aussage? |
|---|---|---|
| Accot & Zhai (1997): Pfad als Steering-Korridor; Zeit ∝ Länge/Breite | ✓ (W14) | **teilweise**: Das Gesetz beschreibt **selbst getaktetes** Durchfahren. Hier scrollt die Welle mit vorgegebenem Tempo – das ist eher **manuelles Verfolgen (pursuit tracking)** mit fester Geschwindigkeit |
| „Maximale Lenkgeschwindigkeit durch Verhältnis Spurbreite/Krümmungsradius begrenzt“ | W14 | **nein** (Krümmung ist nicht Teil des Modells von 1997) |
| Krauzlis (2004): glatte Augenfolgebewegung; „genau bis ≈ 30°/s, darüber Aufholsakkaden“ | ✓ (W16) | **teilweise**: Übersicht zum Netzwerk (frontales Augenfeld, Kleinhirn, Basalganglien, Colliculus superior; AB). Die 30°/s-Grenze steht nicht im Abstract (Volltext nicht zugänglich) und ist keine harte Grenze: einzelne Personen ≈ 90 % Gain bis 100°/s (Meyer et al., 1985). Die Welle bewegt sich laut Seite nur 2,2–3,8 px/Frame ≈ 3,5–6°/s bei 60 Hz [eigene Berechnung] – die Folgebewegung ist also **nicht leistungsbegrenzend** |
| Rashbass (1961): Positionsfehler und Zielgeschwindigkeit „über getrennte neuronale Bahnen“ | Titel leicht falsch (W17) | **teilweise/ja**: klassischer Befund (Step-Ramp): Sakkaden reagieren auf Positionsfehler, Folgebewegung auf Geschwindigkeit (MD; Standardbefund, u. a. in Krauzlis 2004 referiert). „Getrennte Bahnen“ ist zugespitzt – Krauzlis (2004) betont gerade gemeinsame Netzwerke |
| Woodworth (1899): „closed-loop current control“ | ✓ (W8) | **teilweise** |
| „Die Hand kann nur einer Linie folgen, die das Auge noch verfolgt“ | – | **teilweise**: Handverfolgung und Blick sind gekoppelt; wer mit der Hand verfolgt, hat höheren Folge-Gain und weniger Aufholsakkaden (Danion & Flanagan, 2018; Gauthier et al., 1988) |
| Zielgruppe „reduce hand tremors“ | – | **nicht belegt** |
| Stufen „Großmeister Top 1 %“ | – | **keine Datengrundlage** |

### A8 · 708 Zielwechsel in Reihenfolge (finger-sequencing)

| Angabe der Website (Aussage) | DOI-Prüfung | Stützt die Aussage? |
|---|---|---|
| Lashley (1951): Abfolge als vorgeplantes Programm statt Einzelentscheidungen | DOI ungültig (W18) | **teilweise**: Lashley argumentiert gegen Reflexketten und für zentrale, hierarchische Pläne (Rosenbaum et al., 2007 – AB). Für **neu angeordnete** Ziele (jede Runde andere Positionen) muss aber jede Bewegung visuell geplant werden; vorgeplante Chunks entstehen erst bei **wiederholten** Folgen (Sakai et al., 2003) |
| Keele (1968): motorisches Programm | ✓ (W3) | **teilweise** (wie oben) |
| Fitts (1954), MacKenzie (1992): jeder Übergang ist eine Fitts-Bewegung | ✓ | **ja** (ruhende Ziele) |
| „Scanne die Anordnung vorab, speichere den Pfad im motorischen Kortex“ | – | **teilweise**: Vorab-Suche ist plausibel (Aufgabe ähnelt dem Trail Making Test A, der Suche + Tempo misst; Tombaugh, 2004). „Im motorischen Kortex speichern“ ist eine Übertreibung |
| „Überträgt sich auf osu!, Valorant, CS2“ | – | **nicht belegt** (Transfer: F69–F71) |
| Woods et al. (2015) | ✓ | **teilweise** (s. A1) |
| Stufen „Übergangslatenz < 180 ms = Top 1 %“ | – | **keine Datengrundlage** |

---

## B) Faktenliste „Aussage – Zahl – Quelle“

Quellenkürzel wie in Teil D. Zahlen immer mit Einheit; Stichprobengröße, wo bekannt.

### B1 · Schnelles Tippen/Klicken (701, 708)

- **F1** Computergestütztes Finger-Tapping (3 × 10 s je Zeigefinger, n = 1.519, 18–65 J.): dominante Hand schneller, Männer in allen Altersgruppen schneller, Rate sinkt über die drei 10-s-Abschnitte (Ermüdung), Ältere langsamer und mit größerer Intertap-Variabilität. – Hubel, Reed et al. (2013).
- **F2** Test-Retest-Zuverlässigkeit computergestützter Tapping-Rate **r = 0,91**. – Hubel, Yund et al. (2013).
- **F3** Wechseltippen verbessert sich bei Gesunden durch kurze Übung (3 Durchgänge) **und** über 26 h (19 Durchgänge); Parkinson-Betroffene profitieren nur kurzfristig, nicht über 26 h (n = 100 gesund, 60 PD; Übungsteil 14 vs. 24). – Nutt et al. (2000).
- **F4** Smartphone-Wechseltippen zwischen zwei Feldern, 10 s: Kontrollen (M = 53 J.) **54,5 ± 11,5** richtige Tipps (≈ 5,5 Tipps/s), Parkinson (M = 65 J.) **40,5 ± 7,9**; Fläche unter der ROC-Kurve für die Fingerwegstrecke 0,92. – Lee et al. (2016).
- **F5** Die Rate wiederholter Bewegungen korreliert zwischen Muskelgruppen (Finger- mit Fußtippen) → gemeinsamer, eher zentraler Ratenbegrenzer; sagt Schreibtempo voraus. – Keele & Hawkins (1982).
- **F6** Zeigefinger erreicht die höchste Kadenz (dann Mittel-, Klein-, Ringfinger); beim Zwei-Finger-Wechseltippen sinkt die Kadenz je Finger, am wenigsten für Zeige-/Mittelfinger (n = 12 Männer). – Aoki, Francis & Kinoshita (2003).
- **F7** Ältere (n = 14) tippen mit allen Fingern und Fingerpaaren langsamer als Junge (n = 14); nicht durch Kraft oder Tastsinn erklärt. – Aoki & Fukuoka (2010).
- **F8** Dominante Hand: kürzeres und weniger variables Intertap-Intervall, Unterschied in der Drückphase (n = 24). – Todor & Kyprie (1980).
- **F9** Finger-Tapping aktiviert primären sensomotorischen Kortex, supplementär-motorisches Areal, prämotorischen und unteren Parietalkortex, Basalganglien und vorderes Kleinhirn (ALE-Metaanalyse, 38 Studien, 685 Foci). – Witt, Laird & Meyerand (2008).
- **F10** Fingertippen (10 × Zeigefinger auf Daumen, Bewertung von Tempo, Amplitude, Stocken, Abnahme) ist Item der MDS-UPDRS Teil III (motorische Untersuchung; Validierung an 877 PD-Patient:innen, Cronbachs α 0,79–0,93). – Goetz et al. (2008) (Itemtext über Sekundärquelle bestätigt). *Nur Hinweis für Vorsichtsregeln; Blickfit misst keine Krankheitszeichen.*
- **F11** Einfache Reaktionszeit mit Gaming-Maus 231 ms, **213 ms** nach Hardwarekorrektur (n = 1.469); Anstieg nur **0,55 ms/Jahr**; Reizentdeckung **131 ms**, altersstabil – die Alterung betrifft vor allem den motorischen Ausgang. – Woods et al. (2015).
- **F12** Hardware in derselben Studie: Monitorverzögerung **11,0 ms** (60-Hz-LCD), Monitor + Maus **17,8 ms**; Standard-Maustreiber können **≥ 20 ms** hinzufügen. – Woods et al. (2015) (VT).

### B2 · Zielbewegungen, Fitts, Submovements (702, 704, 708)

- **F13** Fitts: MT = a + b·ID, ID = log₂(2D/W). – Fitts (1954). Für die HCI empfohlen: Shannon-Form ID = log₂(D/W + 1) und effektive Breite. – MacKenzie (1992); Soukoreff & MacKenzie (2004).
- **F14** ISO-9241-9-konforme Studien: Durchsatz **Maus 3,7–4,9 bit/s** (5 Modelle, 4 Gruppen), **Touchpad 0,99–2,9 bit/s**, isometrischer Joystick 1,6–2,55 bit/s. – Soukoreff & MacKenzie (2004) (VT).
- **F15** Zeigen mit der Maus: 674 ms, 3,5 % Fehler, 4,5 bit/s (n = 12). – MacKenzie, Sellen & Buxton (1991) (VT).
- **F16** Zwei-Komponenten-Modell: zentral geplanter Primärimpuls + rückmeldungsgestützte Endkorrektur (Woodworth 1899). – Elliott, Helsen & Chua (2001). Erweiterung: frühe „Impulskontrolle“ (Vergleich Ist-/Soll-Verlauf) und späte „Glied-Ziel-Kontrolle“. – Elliott et al. (2010, 2017).
- **F17** Sichtrückmeldung verbessert die räumliche Genauigkeit auch bei Bewegungen **deutlich unter 190 ms** (Widerspruch zur älteren Annahme „> 190 ms nötig“). – Zelaznik, Hawkins & Kisselburgh (1983).
- **F18** Stochastisch optimierte Submovements: Endpunktstreuung wächst mit der Geschwindigkeit; schnelle Impulse erzwingen öfter Korrekturbewegungen. – Meyer et al. (1988) (MD).
- **F19** Signalabhängiges Rauschen (Varianz steigt mit der Stärke des Steuersignals) erklärt glatte Bewegungsprofile und das Fitts'sche Speed-Accuracy-Verhältnis für Augen- und Armbewegungen. – Harris & Wolpert (1998).
- **F20** Beim Zeigen auf ein peripheres Ziel kommt zuerst eine Sakkade (innerhalb **250 ms**), die Hand startet **≈ 100 ms** später; Latenzen nur schwach korreliert. – Prablanc et al. (1979).
- **F21** Der Blick bleibt während des Zeigens am Ziel verankert: Sakkaden zu einem neuen Ziel verzögern sich um **≈ 155 ms**, wenn es während der Handbewegung erscheint. – Neggers & Bekkering (2000). → Relevant für Zielwechsel (702, 708).
- **F22** Ältere positionieren den Cursor mit mehr Submovements und passen Tempo/Zahl der Teilbewegungen an höheres motorisches Rauschen und geringere Wahrnehmungseffizienz an (Maus). – Walker, Philbin & Fisk (1997).
- **F23** 60 Personen in 3 Altersgruppen (20–39, 40–59, 60–75 J.): Ältere haben mehr Schwierigkeiten, v. a. beim Klicken und Doppelklicken; psychomotorische Fähigkeiten erklären einen Teil. – Smith, Sharit & Czaja (1999).
- **F24** Bewegte Ziele: Endpunkte fallen hinter schnelle Ziele; Versatz und Streuung hängen von Zielgröße und Tempo ab (R² ≈ 0,95). – Huang et al. (2018); der klassische Fitts-Index sagt die Erfassung bewegter Ziele nicht zuverlässig voraus. – Jagacinski et al. (1980) (02).
- **F25** Maus-Übersetzung (CD-Gain): niedrige Gain verschlechtert die Leistung deutlich (Nachsetzen), hohe Gain kaum; Zeigerbeschleunigung **3,3 %** schneller als konstante Gain (bis **5,6 %** bei kleinen Zielen). – Casiez et al. (2008) (VT).
- **F26** Geringere Latenz verkürzte die Aufgabenzeit klar; höhere Bildfrequenz (> 60 Hz) bei gleicher Latenz hatte nur geringe Effekte (8 E-Sportler, Zielaufgaben). – Spjut et al. (2019).
- **F27** Aim-Trainer als Messinstrument: ICC **0,947–0,995** für Trefferquote, Treffer/s u. a. (n = 10, zwei Sitzungen im Abstand 3–5 Tage); signifikante Verbesserung nur in einer Aufgabe (Macro-Flicking). – Rogers et al. (2024).
- **F28** 6 × 5 min Zielen im Aim-Trainer: Handgelenkstrecker bis **9,3 % MVC**, deutliche EMG-Ermüdungszeichen und subjektive Ermüdung – ohne Leistungsabfall (n = 20). – Forman et al. (2025).

### B3 · Wahlreaktion mit Tasten (703)

- **F29** Hick'sches Gesetz: Wahlreaktionszeit steigt mit dem Logarithmus der Alternativenzahl. – Hick (1952). Reiz-Reaktions-Kompatibilität, Übung, sehr große Alternativenzahlen und Reihenfolgeeffekte verändern die Steigung. – Proctor & Schneider (2018).
- **F30** Wahlreaktionszeit verlangsamt sich über das ganze Erwachsenenalter, einfache RT erst ab ≈ 50 deutlicher (n = 7.130). – Der & Deary (2006) (01).
- **F31** Online-Tippstudie, 168.000 Personen, 136 Mio. Anschläge: **51,56 ± 20,2 Wörter/min**, mittleres Intervall zwischen Tasten **238,66 ± 111,6 ms**, unkorrigierte Fehler **1,17 %**. – Dhakal et al. (2018) (VT).
- **F32** Selbst beigebrachte Schreibtechniken erreichen ähnliche Leistung wie Zehnfingerschreiben, auch mit weniger Fingern (n = 30). – Feit, Weir & Oulasvirta (2016).
- **F33** Ältere Schreibkräfte sind im Tapping und in der Wahlreaktion langsamer, aber nicht im Schreibtempo – sie schauen weiter voraus. – Salthouse (1984) (Kurzfassung).
- **F34** Go/No-go-Varianten unterscheiden sich stark darin, wie sehr sie eine vorbereitete Antwort hemmen müssen (Häufigkeit der Go-Durchgänge, Zeitdruck). – Wessel (2018) (01).
- **F35** 36 USB-Tastaturen/Mäuse/Gamepads: Latenz unterscheidet sich im Mittel **und** in der (oft mehrgipfligen) Verteilung; innerhalb eines Geräts Schwankung bis zu mehreren Dutzend ms; erzwungenes 1000-Hz-Polling senkt sie bei manchen Geräten. – Wimmer, Schmid & Bockes (2019) (VT).
- **F36** Gedächtnissuche: RT steigt linear mit der Länge einer gemerkten Liste, 25–30 Symbole/s – ein **Gedächtnis**-, kein Motorikbefund. – Sternberg (1966).
- **F37** Gelernte visuomotorische Sequenzen werden spontan in „Chunks“ gegliedert (individuell verschieden); Chunk-Struktur überträgt sich von der nicht dominanten auf die dominante Hand, nicht umgekehrt. – Sakai, Kitaguchi & Hikosaka (2003).

### B4 · Ziehen und Führen (705, 706, 707)

- **F38** Drei-Zustands-Modell: Maus hat „Verfolgen“ (Zustand 1, Zeiger bewegt ohne Taste) und „Ziehen“ (Zustand 2); ein Touchscreen kennt **kein Schweben** – Berührung ist entweder Verfolgen oder Ziehen, nicht beides. – Buxton (1990) (VT, Autorenseite).
- **F39** Zeigen → Ziehen: Bewegungszeit Maus 674 → 916 ms, Grafiktablett 665 → 802 ms, Trackball 1.101 → 1.284 ms; Fehler 3,5/4,0/3,9 % → 10,8/13,6/17,3 %; Leistung 4,5/4,9/3,3 → 4,0/3,6/1,5 bit/s. – MacKenzie, Sellen & Buxton (1991) (VT).
- **F40** Steuerungsgesetz: gerader Tunnel T = a + b·A/W; momentane Geschwindigkeit ∝ Tunnelbreite. – Accot & Zhai (1997).
- **F41** Geräte beim Steuern (gerade und kreisförmige Tunnel): Grafiktablett und Maus > Trackpoint > Touchpad und Trackball; das Steuerungsgesetz beschrieb alle Geräte. – Accot & Zhai (1999) (AB).
- **F42** Touch-Tisch vs. Maus: Auswahl per Finger schneller, aber **8,5 % vs. 4,1 %** Fehler; Ziehen („Docking“) per Finger langsamer (**1,09 vs. 0,92 s**); bei kleinsten Zielen verdeckte der Finger das Ziel vollständig; 9 von 12 bevorzugten die Maus. – Forlines et al. (2007) (VT).
- **F43** Finger-Tippen ist schneller als Stift/Maus, aber ungenau; Finger-Ziehen ist langsamer als Maus und Stift. – Cockburn, Ahlström & Gutwin (2012) (Abstract-Zusammenfassung).
- **F44** Kinder: Zeigen-und-Klicken schneller, fehlerärmer und beliebter als Drag-and-Drop; mit Drag-and-Drop lösten sie weniger Puzzles und waren weniger motiviert. – Inkpen (2001).
- **F45** Ältere: Touchscreen verkürzte die Bewegungszeit gegenüber Maus um **35 %** (Jüngere **16 %**) über Zeigen, Ziehen, Durchkreuzen und Steuern; Fehler sanken ebenfalls. – Findlater et al. (2013).
- **F46** 85 Senior:innen, vier Geräte (Touchscreen, große Kugelmaus, Maus, Touchpad): welches Gerät am besten war, hing von der Computererfahrung ab; die Maus war kognitiv/motorisch am anspruchsvollsten. – Wood et al. (2005).
- **F47** „Area cursors“ + „sticky icons“ verkürzten die Auswahlzeit Älterer bei den kleinsten Zielen um bis zu **50 %**. – Worden et al. (1997).
- **F48** Barrierefreiheit: WCAG 2.2 **SC 2.5.7 „Dragging Movements“ (AA)** – jede Ziehfunktion muss auch ohne Ziehen mit einem Zeiger bedienbar sein, außer Ziehen ist wesentlich; **SC 2.5.1** (pfadbasierte Gesten), **SC 2.5.8** Zielgröße ≥ 24 × 24 CSS-px; **SC 2.2.1** Zeitlimits (Ausnahme: Echtzeit/wesentlich). – W3C (2024) (VT).
- **F49** Touch-Latenz: kommerzielle Geräte 50–200 ms; gerade wahrnehmbare Latenz beim direkten Ziehen **11 ms**, direkten Tippen **69 ms** (indirekt 55/96 ms); Ziehleistung leidet laut Vorarbeit schon ab ≈ 25 ms. – Deber et al. (2015) (VT, mit Verweis auf Jota et al. 2013).

### B5 · Ruhige Hand, Tremor (705, auch 701, 704, 706, 707)

- **F50** Physiologischer Tremor der Hand enthält eine **8–12-Hz**-Komponente; frühe essenzielle Tremorformen ähneln ihr, fortgeschrittener essenzieller Tremor **4–8 Hz**. – Elble (1986).
- **F51** Physiologischer Tremor ist multifaktoriell (zentrale ~10-Hz-Oszillationen, Entladeverhalten motorischer Einheiten, mechanische und Reflex-Resonanzen); Parkinson-Tremor **3–6 Hz** entsteht eigenständig. – McAuley & Marsden (2000).
- **F52** Tremor = unwillkürliche, rhythmische, oszillierende Bewegung eines Körperteils; Einteilung nach klinischem Bild (Achse 1) und Ursache (Achse 2). – Bhatia et al. (2018).
- **F53** Essenzieller Tremor: gepoolte Prävalenz **0,9 %** (alle Alter), **4,6 %** ab 65 J. (28 Studien, 19 Länder). – Louis & Ferreira (2010).
- **F54** Einmal 325 mg Koffein erhöhte physiologischen, essenziellen und Parkinson-Tremor nach 1–3 h **nicht**; nur 2 % der Gesunden gaben an, dass Kaffee zittrig mache. – Koller, Cone & Herbster (1987).
- **F55** Motorisch eingeschränkte Maus-Nutzer:innen pausieren häufiger und länger und brauchen bis zu **5-mal** mehr Submovements (6 eingeschränkte, 3 nicht eingeschränkte Personen). – Hwang et al. (2004).
- **F56** Touch-Zielgröße: ohne motorische Einschränkung Leistungsplateau bei **20 mm**, mit Einschränkung weitere Verbesserung darüber hinaus (n = 53). – Chen et al. (2013) (02).
- **F57** Videospiel-Erfahrung > 3 h/Woche ging mit **37 %** weniger Fehlern und **27 %** schnellerer Laparoskopie-Leistung einher (n = 33, Querschnitt – Zusammenhang, keine Wirkung belegt). – Rosser et al. (2007).

### B6 · Auge-Hand-Koordination beim Verfolgen (707, 706)

- **F58** Manuelles Verfolgen ist intermittierend (Korrekturen gehäuft bei 0,5–1,8 Hz), mit Fehler-Totzone ≈ **0,8°** und Mindestabstand zwischen Korrekturen ≈ **170 ms**. – Miall, Weir & Stein (1993).
- **F59** Wird die Hand mitgeführt, verbessert sich die Folgebewegung: Auge-Ziel-Verzögerung **150 → 30 ms**, maximale Folgegeschwindigkeit **+100 %**. – Gauthier et al. (1988).
- **F60** Beim Verfolgen mit der Hand (Cursor) ist der Folge-Gain höher und es gibt weniger Aufholsakkaden als beim reinen Blickverfolgen. – Danion & Flanagan (2018).
- **F61** Obergrenze der Folgebewegung ist individuell hoch: ≈ 90 % Gain bis **100°/s** bei 5 Personen (eine nur 60 %). – Meyer, Lasker & Robinson (1985) (02).
- **F62** Kleinhirnaktivität steigt mit dem Koordinationsbedarf zwischen Auge und Hand beim visuell geführten Verfolgen (fMRT). – Miall, Reckess & Imamizu (2001).
- **F63** Vorwärtsmodelle sagen die sensorischen Folgen eines Bewegungsbefehls voraus und werden über Vorhersagefehler angepasst (Grundlage der Online-Korrektur). – Shadmehr, Smith & Krakauer (2010).

### B7 · Motorisches Lernen und Transfer (alle)

- **F64** Übungskurven einzelner Personen folgen eher einer Exponential- als einer Potenzfunktion (40 Datensätze, 7.910 Lernreihen, 475 Personen). – Heathcote, Brown & Mewhort (2000).
- **F65** „Challenge Point“: Lernen ist am größten, wenn die Aufgabenschwierigkeit zum Können passt – Argument für adaptive Schwierigkeit. – Guadagnoli & Lee (2004).
- **F66** Schnelle Fingerfolgen werden durch tägliches Üben über Wochen schneller und genauer; **keine Übertragung** auf eine gleich aufgebaute andere Folge oder die andere Hand; M1-Reorganisation nach 4 Wochen, über Monate stabil. – Karni et al. (1995).
- **F67** Motorisches Lernen: kortiko-striatale (Sequenzen) und kortiko-zerebelläre (Anpassung) Systeme je nach Lernphase. – Doyon & Benali (2005).
- **F68** Ältere lernen motorisch weiterhin, bei Feinmotorik aber mit geringeren Zuwächsen; Altersunterschiede größer bei komplexen Aufgaben. – Voelcker-Rehage (2008).
- **F69** Motorische Alterung: Atrophie motorischer Rindenareale und des Balkens, dopaminerge Veränderungen; Ältere rekrutieren zusätzlich präfrontale und Basalganglien-Netzwerke. – Seidler et al. (2010).
- **F70** Action-Videospiele: Querschnitt g = **0,55**, Interventionen g = **0,34** (Aufmerksamkeit/Raumkognition), Publikationsbias ≈ **30 %** Überschätzung. – Bediou et al. (2018).
- **F71** Videospieltraining verbessert die allgemeine kognitive Leistung nicht kausal (drei Metaanalysen, k = 310/315/359; kleine bis null Effekte). – Sala, Tatlidil & Gobet (2018).
- **F72** Digitale Sport-Sehtrainings: große Effekte vor allem bei gerätegleichem Test (Lerneffekt am Gerät) – Guo et al. (2025) (01/02); kein Beleg für Ferntransfer auf Sportleistung – Fransen (2024) (02).
- **F73** Trail Making Test (n = 911, 18–89 J.): Leistung sinkt mit dem Alter und bei geringerer Bildung → Reihenfolge-Klicken (708) ist stark alters- und suchabhängig. – Tombaugh (2004).
- **F74** Sequenzen werden nicht für jede Folge neu geplant, sondern aus der vorherigen Planung abgewandelt; auch Einzelbewegungen sind hierarchisch geplant (Übersicht zu Lashley). – Rosenbaum et al. (2007).

### B8 · Eingabegeräte, Touch, Messung (alle)

- **F75** Fingerpräzision (1D-Ziele, Smartphone): Zielbreite **2,4 mm → 29–38 %** Fehler, **4,8 mm → 11–14 %**, **7,2 mm → 3–6 %**; „absolute“ Fingerunschärfe σₐ ≈ **0,94 mm**. – Bi, Li & Zhai (2013) (VT).
- **F76** Touch-Zielgröße ≥ **9,2 mm** (Daumen, einhändig). – Parhi, Karlson & Bederson (2006) (02).
- **F77** Ein personen- und haltungsabhängiger Versatzmodell erklärt 67 % der dem „dicken Finger“ zugeschriebenen Ungenauigkeit. – Holz & Baudisch (2010) (02).
- **F78** Finger verdeckt kleine Ziele und der Auswahlpunkt ist mehrdeutig → längere Zielzeiten, mehr Fehler (Lösung: versetzte Lupe „Shift“). – Vogel & Baudisch (2007).
- **F79** Browser/Touch: Reaktionszeiten werden mit Roboterfinger stets zu lang gemessen (iPhone ≈ 58 ms, Galaxy 66–70 ms, Laptops 62–133 ms). – Pronk et al. (2020) (01).
- **F80** Sears & Shneiderman (1991) fanden (zitiert nach Forlines et al., 2007): Touchscreen ab Zielen von **16 px** schneller als Maus, bei **32 px** ≈ **66 %** weniger Fehler (Pixel ≈ 0,43 mm, also ≈ 7/14 mm [eigene Umrechnung]); trotzdem bevorzugten Teilnehmende die Maus.

### B9 · Optik und Optiker-Bezug

- **F81** Die Akkommodationsbreite sinkt ab der Kindheit; um **≈ 40 J.** reicht sie nicht mehr für normale Naharbeit. – Charman (2008). Akkommodationsbedarf: 1/Abstand → **1,67 dpt bei 60 cm** (Monitor), **2,5 dpt bei 40 cm** (Tablet) [eigene Berechnung].
- **F82** Mit Universal-Gleitsichtgläsern sieht man den Monitor nur mit gesenktem Blick scharf; ein tiefer gestellter Monitor senkte die Kopfneigung und damit Nacken-/Schulterbeschwerden, war aber oft noch nicht tief genug für vollständig scharfes Sehen. – Weidling & Jaschinski (2015).
- **F83** Bildschirmarbeit senkt die Lidschlagrate im Mittel um das **Fünffache**. – Patel et al. (1991).
- **F84** 65 College-E-Sportler (3–10 h/Tag): Augenermüdung **56 %**, Nacken/Rücken **42 %**, Handgelenk **36 %**, Hand **32 %**; nur 2 % suchten ärztliche Hilfe. – DiFrancisco-Donoghue et al. (2019).
- **F85** Rot-Grün-Sehschwäche bei ≈ **8 %** der Männer und **0,4 %** der Frauen (Europa). – Birch (2012). → rote „Fallen“ (703), Smaragd-Ziele/rote Warnungen nie nur über Farbe kodieren.
- **F86** Sehwinkel der Reize [eigene Berechnung; Desktop 24″ Full-HD, 0,274 mm/px, 60 cm | Tablet 0,19 mm/CSS-px, 40 cm]: Aim-Ziel Ø 52 px = 14,3 mm/1,36° | 9,9 mm/1,42°; Ø 16 px = 4,4 mm/0,42° | 3,0 mm/0,44°; Flick-Kern 8 px = 2,2 mm/0,21° | 1,5 mm/0,22°; Heißer-Draht-Kanal 50 → 12 px = 13,7 → 3,3 mm (1,31° → 0,31°) | 9,5 → 2,3 mm; Tracing-Toleranzband 22 px = 6,0 mm/0,58° | 4,2 mm/0,60°. Geschwindigkeiten: 80 → 370 px/s ≈ 2,1 → 9,7°/s; 2,2–3,8 px/Frame bei 60 Hz = 132–228 px/s ≈ 3,5–6,0°/s (bei 144 Hz, falls pro Frame gerechnet: 317–547 px/s ≈ 8,3–14,3°/s – im Code prüfen).
- **F87** Dezimalvisus = 1/Lückengröße in Bogenminuten (ISO 8596:2017) → Visus 1,0 löst 1′ auf; alle Reize oben sind ≥ 12′ groß, die Sehschärfe ist für normal/korrigiert Sehende **nicht** leistungsbegrenzend; bei Visus ≈ 0,1 (10′) wird der 8-px-Kern (≈ 13′) grenzwertig [eigene Einordnung].

### B10 · Sicherheit, Belastung

- **F88** Maus-Nutzung > 20 h/Woche ging mit erhöhtem Risiko möglicher Karpaltunnel-Symptome einher; insgesamt war das Auftreten gering (Neuauftreten 5,5 %/Jahr; n = 5.658) – Computerarbeit ist kein schweres Berufsrisiko. – Andersen et al. (2003).
- **F89** Lichtreize: nicht mehr als 3 Blitze/s (WCAG 2.2 SC 2.3.1); Expertenkonsens: gefährlich ab ≥ 3 Hz, ≥ 20 cd/m², ≥ 0,006 sr, gesättigtes Rot ist ein Risiko. – W3C (2024); Harding et al. (2005) (03). → relevant für Warnblitze (707) und Fehlerfeedback.

---

## C) Evidenz-Zusammenfassung

### C1 · Übergreifend

1. **Die Übungen trainieren sehr aufgabenspezifische Fertigkeiten.** Motorisches Lernen in der geübten Aufgabe ist
   gut belegt (F3, F64, F66), aber es überträgt sich schlecht: schon eine gleich aufgebaute andere Fingerfolge
   profitiert nicht (Karni et al., 1995); Elliott et al. (2010) diskutieren die Lernspezifität ausdrücklich.
   Für Videospiel-/Aim-Training gibt es **keinen Beleg für allgemeine kognitive oder Alltagsverbesserungen**
   (Sala et al., 2018; Fransen, 2024); positive Metaanalysen betreffen Action-Spiele und Aufmerksamkeit,
   nicht Mausmotorik, und sind durch Publikationsbias verzerrt (Bediou et al., 2018). Korrelationen wie
   „Gamer sind bessere Laparoskopiker“ (Rosser et al., 2007) belegen keine Trainingswirkung.
2. **Messwerte hängen vom Gerät ab** (Monitor 11 ms, Maus bis ≥ 20 ms, USB-Geräte bis Dutzende ms, Touch 50–200 ms;
   F12, F35, F49, F79). Die „Tier“-Tabellen aller acht Seiten haben nach eigener Aussage der Website keine
   Datengrundlage. Seriös ist nur der Vergleich **mit sich selbst am selben Gerät**.
3. **Alter:** Motorisches Tempo (Tippen, Zeigen, Klicken) nimmt mit dem Alter ab, mehr Teilbewegungen und
   Variabilität (F1, F7, F22, F23, F69); die Reizentdeckung bleibt stabil (F11). Lernen bleibt möglich, bei
   Feinmotorik mit kleineren Zuwächsen (F68). Touch verkleinert den Altersnachteil gegenüber der Maus (F45).
4. **Maus vs. Touch vs. Touchpad:** Maus ≈ 3,7–4,9 bit/s, Touchpad ≈ 1–2,9 bit/s (F14); beim Steuern Touchpad deutlich
   schlechter (F41). Finger-Tippen ist schnell, aber ungenau (F42, F43, F75); Finger-Ziehen langsamer (F42, F43);
   Touch hat **kein Schweben** (F38) – alle Übungen, die eine Zeigerbewegung ohne Klick verlangen (705, 707), werden
   auf dem Tablet zu Ziehaufgaben mit verdecktem Ziel (F78).
5. **Tremor/Parkinson:** Aufgaben mit kleinen Zielen und schmalen Pfaden sind bei Tremor schwer und frustrierend
   (F55, F56). Parkinson-Betroffene verbessern sich beim Tippen nur kurzfristig (F3). Fingertippen ist ein
   klinisches Untersuchungsitem (F10) – **Blickfit darf daraus nichts ableiten** (keine Diagnose, keine
   „Tremor-Messung“).
6. **Optiker-Bezug:** Die Reize sind ≥ 0,2° groß – Sehschärfe begrenzt kaum (F86, F87); wichtiger sind
   Alterssichtigkeit/Gleitsicht (Monitorposition, Tablet-Abstand; F81, F82), trockenes Auge durch seltenen Lidschlag
   bei konzentrierter Bildschirmarbeit (F83, F84) und Farbkodierung (F85). Stereosehen spielt keine Rolle.

### C2 · Je Übung (Vorschläge für `evidenz`, Touch-Bewertung, `vorsicht_bei`; Profilwerte entscheiden die Autor:innen)

| Nr. | Übungseffekt | Naher Transfer | Alltag | Kernbelege | Touch-Eignung (Vorschlag) | Vorsicht (Schlüssel) |
|---|---|---|---|---|---|---|
| 701 CPS | **mittel** (Tapping wird durch Übung schneller, F3; zuverlässig messbar, F2) | **schwach/unklar** (gemeinsamer Ratenbegrenzer, F5, aber kein Trainingstransfer belegt) | **fehlend** | F1–F8, F84, F88 | **mit_anpassung**: Tippen geht auf Touch (F4); Mehrfinger-/Multitouch verfälscht die Rate (F6), schrumpfendes Ziel unter dem Finger verdeckt (F78); kein Klick-„Jitter“ möglich | hand_arm_beschwerden, tremor_parkinson |
| 702 Aim | **mittel** (Übungskurven, F64; kleine Sitzungs-Lerneffekte, F27) | **schwach** (Lernspezifität, F66) | **fehlend** (F70–F72) | F13–F24, F26–F28 | **mit_anpassung**: Ziele Ø 16 px ≈ 3 mm < 9 mm-Minimum (F75, F76); bewegte Ziele → Tipps landen „hinter“ dem Ziel (F24); Finger verdeckt (F78) | hand_arm_beschwerden, tremor_parkinson, presbyopie_gleitsicht, sehbehinderung_niedriger_visus |
| 703 Tastatur | **mittel** (Übung verkleinert Wahlreaktionszeiten, F29) | **schwach** (zuordnungsspezifisch) | **fehlend** | F29–F37, F34 | **nein** ohne externe Tastatur; mit Bildschirmtastatur wird es visuelle Suche + Tippen (andere Aufgabe) | farbsehschwaeche (rote Fallen), lese_rechtschreib_schwaeche, kognitive_einschraenkung, aufmerksamkeitsprobleme |
| 704 Flick | **mittel** | **schwach** | **fehlend** | F16–F21, F25, F26 | **mit_anpassung** (Flick = Tipp auf Touch; 8-px-Kern ≈ 1,5 mm nicht treffbar, F75) | hand_arm_beschwerden, tremor_parkinson, sehbehinderung_niedriger_visus |
| 705 Ruhige Hand | **mittel** (allgemeine Motorik-Lernbefunde; keine Studie zu genau dieser Aufgabe) | **schwach** | **fehlend**; Tremorminderung **fehlend** | F38–F41, F50–F57 | **nein/mit_anpassung**: kein Schweben (F38); Kanal 12 px ≈ 2,3 mm < Fingerunschärfe (F75); Finger verdeckt den Pfad; nur mit Stift oder sehr breitem Kanal + versetztem Cursor | tremor_parkinson, hand_arm_beschwerden, presbyopie_gleitsicht |
| 706 Drag-and-Drop | **mittel** | **schwach** | **fehlend** | F39, F42–F49, F24 | **mit_anpassung**: Ziehen ist auf Touch natürlich, aber langsamer und verdeckend (F42); WCAG 2.5.7 verlangt Alternative (F48) | tremor_parkinson, hand_arm_beschwerden, kinder_unter_6 (F44) |
| 707 Pfad nachfahren | **mittel** (Auge-Hand-Koordination verbessert sich mit Training, F59) | **schwach** | **fehlend** | F40, F58–F63, F86 | **mit_anpassung**: Dauerberührung = Ziehen; Finger verdeckt den kommenden Pfad (Pfad muss vor dem Finger sichtbar sein); Band 22 px ≈ 4 mm zu schmal | tremor_parkinson, photosensitive_epilepsie/migraene_lichtempfindlich (falls Warnblitz), hand_arm_beschwerden |
| 708 Reihenfolge | **mittel** (Sequenz-/Suchübung; Chunking nur bei wiederholten Folgen, F37) | **schwach** | **fehlend** | F13, F21, F37, F73, F74 | **mit_anpassung/ja**: Tipp-Reihenfolge funktioniert gut auf Touch, wenn Ziele ≥ 9 mm und Nummern groß (Trail-Making-ähnlich) | kognitive_einschraenkung, sehbehinderung_niedriger_visus, tremor_parkinson |

**Hinweise zu Profilwerten (Orientierung, nicht bindend):** 701 → `fingergeschwindigkeit` Kern; 702/704 →
`zielbewegung_tempo`, `zielbewegung_praezision`, `auge_hand_koordination`, bei 702 zusätzlich `bewegungswahrnehmung`
(bewegte Ziele) und `sakkaden`; 703 → `entscheidung_wahlreaktion`, `fingersequenz_bimanual` (Tastenzuordnung),
`inhibition` (Fallen), ggf. `arbeitsgedaechtnis` (Sequenz-/Memory-Modus), `lesen_sprache` gering (Einzelzeichen);
705 → `kontinuierliche_steuerung`, `ruhige_hand`, `zielbewegung_praezision`; 706 → `auge_hand_koordination`,
`kontinuierliche_steuerung`, `antizipation` (bewegter Behälter); 707 → `kontinuierliche_steuerung`,
`auge_hand_koordination`, `blickfolge` (bei ≈ 3,5–6°/s mäßig, nicht leistungsbegrenzend); 708 →
`zielbewegung_tempo`, `visuelle_suche`, `sakkaden`. `stereosehen` überall 0; `naharbeit_dauer` 1 (45-s-Übungen).

### C3 · Offene Punkte für die Autor:innen

- Tracing (707): Die Seite nennt „px/f“. Wenn die Geschwindigkeit pro Frame statt pro Zeit gerechnet wird, läuft
  die Welle an 144-Hz-Monitoren 2,4-mal schneller (F86) – im Spielcode prüfen.
- 703: Prüfen, ob die „Fallen“ nur über Rot kodiert sind (Farbsehschwäche, F85) und ob Scheinreize blinken (F89).
- 708: Prüfen, ob die Zielanordnung je Runde neu ist (dann kein Sequenzlernen im Sinne von F37/F66).
- 706: Prüfen, ob es einen Korridor gibt (sonst ist es Fitts-, nicht Steering-Aufgabe; A6).

---

## D) Literaturliste (nur geprüfte Einträge)

### D1 · Von der Website angegeben (mit Korrektur)

- Accot, J., & Zhai, S. (1997). Beyond Fitts' law: Models for trajectory-based HCI tasks. In *Proceedings of the ACM SIGCHI Conference on Human Factors in Computing Systems (CHI '97)* (S. 295–302). ACM. https://doi.org/10.1145/258549.258760 – ✓ Crossref; AB (wenig Inhalt), Formel über Sekundärquellen.
- Donders, F. C. (1969). On the speed of mental processes (W. G. Koster, Übers.). *Acta Psychologica, 30*, 412–431. https://doi.org/10.1016/0001-6918(69)90065-1 (Original 1868) – ✓ Crossref; MD.
- Elliott, D., Hansen, S., Grierson, L. E. M., Lyons, J., Bennett, S. J., & Hayes, S. J. (2010). Goal-directed aiming: Two components but multiple processes. *Psychological Bulletin, 136*(6), 1023–1044. https://doi.org/10.1037/a0020958 – ✓ Crossref; AB. **Website nennt falsche Autor:innen.**
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – ✓ Crossref; MD (Inhalt Standard, bestätigt durch MacKenzie 1991/Soukoreff 2004, VT).
- Halstead, W. C. (1947). *Brain and intelligence: A quantitative study of the frontal lobes.* University of Chicago Press. – Buch, keine DOI; Existenz über APA PsycNET (1948-01497-000) bestätigt; zitierte Normzahl nicht prüfbar.
- Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology, 4*(1), 11–26. https://doi.org/10.1080/17470215208416600 – ✓ Crossref; Inhalt über Proctor & Schneider (2018), AB.
- Keele, S. W. (1968). Movement control in skilled motor performance. *Psychological Bulletin, 70*(6, Pt. 1), 387–403. https://doi.org/10.1037/h0026739 – ✓ Crossref; MD.
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – ✓ Crossref; AB.
- Lashley, K. S. (1951). The problem of serial order in behavior. In L. A. Jeffress (Hrsg.), *Cerebral mechanisms in behavior: The Hixon Symposium* (S. 112–136). Wiley. – Buch, **keine DOI** (Website-DOI 10.1037/11147-006 ungültig); Inhalt über Rosenbaum et al. (2007), AB.
- Logan, G. D., & Cowan, W. B. (1984). On the ability to inhibit thought and action: A theory of an act of control. *Psychological Review, 91*(3), 295–327. https://doi.org/10.1037/0033-295X.91.3.295 – ✓ Crossref; MD.
- MacKenzie, I. S. (1992). Fitts' law as a research and design tool in human-computer interaction. *Human–Computer Interaction, 7*(1), 91–139. https://doi.org/10.1207/s15327051hci0701_3 – ✓ Crossref; MD.
- MacKenzie, I. S., Sellen, A., & Buxton, W. (1991). A comparison of input devices in elemental pointing and dragging tasks. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '91)* (S. 161–166). ACM. https://doi.org/10.1145/108844.108868 – ✓ Crossref; VT (billbuxton.com).
- Meyer, D. E., Abrams, R. A., Kornblum, S., Wright, C. E., & Smith, J. E. K. (1988). Optimality in human motor performance: Ideal control of rapid aimed movements. *Psychological Review, 95*(3), 340–370. https://doi.org/10.1037/0033-295X.95.3.340 – ✓ Crossref; MD.
- Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 – ✓ Crossref; MD. **Website: Titel leicht falsch.**
- Sternberg, S. (1966). High-speed scanning in human memory. *Science, 153*(3736), 652–654. https://doi.org/10.1126/science.153.3736.652 – ✓ Crossref; AB. **Website: Titel falsch („perception“).**
- Todor, J. I., & Kyprie, P. M. (1980). Hand differences in the rate and variability of rapid tapping. *Journal of Motor Behavior, 12*(1), 57–62. https://doi.org/10.1080/00222895.1980.10735205 – ✓ Crossref; AB.
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – ✓ Crossref; VT (PMC4374455).
- Woodworth, R. S. (1899). Accuracy of voluntary movement. *The Psychological Review: Monograph Supplements, 3*(3), i–114. https://doi.org/10.1037/h0092992 – ✓ Crossref; Inhalt über Elliott et al. (2001), AB.

### D2 · Weitere Fachliteratur

- Accot, J., & Zhai, S. (1999). Performance evaluation of input devices in trajectory-based tasks: An application of the steering law. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '99)* (S. 466–472). ACM. https://doi.org/10.1145/302979.303133 – ✓ Crossref; AB (IBM Research). F41.
- Andersen, J. H., Thomsen, J. F., Overgaard, E., Lassen, C. F., Brandt, L. P. A., Vilstrup, I., Kryger, A. I., & Mikkelsen, S. (2003). Computer use and carpal tunnel syndrome: A 1-year follow-up study. *JAMA, 289*(22), 2963–2969. https://doi.org/10.1001/jama.289.22.2963 – ✓ Crossref; AB. F88.
- Aoki, T., Francis, P. R., & Kinoshita, H. (2003). Differences in the abilities of individual fingers during the performance of fast, repetitive tapping movements. *Experimental Brain Research, 152*(2), 270–280. https://doi.org/10.1007/s00221-003-1552-z – ✓ Crossref; AB. F6.
- Aoki, T., & Fukuoka, Y. (2010). Finger tapping ability in healthy elderly and young adults. *Medicine & Science in Sports & Exercise, 42*(3), 449–455. https://doi.org/10.1249/MSS.0b013e3181b7f3e1 – ✓ Crossref; AB. F7.
- Bediou, B., Adams, D. M., Mayer, R. E., Tipton, E., Green, C. S., & Bavelier, D. (2018). Meta-analysis of action video game impact on perceptual, attentional, and cognitive skills. *Psychological Bulletin, 144*(1), 77–110. https://doi.org/10.1037/bul0000130 – ✓ Crossref; AB. F70.
- Bhatia, K. P., Bain, P., Bajaj, N., Elble, R. J., Hallett, M., Louis, E. D., Raethjen, J., Stamelou, M., Testa, C. M., Deuschl, G., & Tremor Task Force of the International Parkinson and Movement Disorder Society. (2018). Consensus statement on the classification of tremors. *Movement Disorders, 33*(1), 75–87. https://doi.org/10.1002/mds.27121 – ✓ Crossref; AB. F52.
- Bi, X., Li, Y., & Zhai, S. (2013). FFitts law: Modeling finger touch with Fitts' law. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '13)* (S. 1363–1372). ACM. https://doi.org/10.1145/2470654.2466180 – ✓ Crossref; VT (Autorenseite). F75.
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – ✓ Crossref; AB. F85.
- Buxton, W. (1990). A three-state model of graphical input. In D. Diaper et al. (Hrsg.), *Human–Computer Interaction – INTERACT '90* (S. 449–456). Elsevier (North-Holland). – keine DOI; VT (billbuxton.com/3state.html). F38.
- Casiez, G., Vogel, D., Balakrishnan, R., & Cockburn, A. (2008). The impact of control-display gain on user performance in pointing tasks. *Human–Computer Interaction, 23*(3), 215–250. https://doi.org/10.1080/07370020802278163 – ✓ Crossref; VT (Autorenfassung). F25.
- Charman, W. N. (2008). The eye in focus: Accommodation and presbyopia. *Clinical and Experimental Optometry, 91*(3), 207–225. https://doi.org/10.1111/j.1444-0938.2008.00256.x – ✓ Crossref; AB. F81.
- Chen, K. B., Savage, A. B., Chourasia, A. O., Wiegmann, D. A., & Sesto, M. E. (2013). Touch screen performance by individuals with and without motor control disabilities. *Applied Ergonomics, 44*(2), 297–302. https://doi.org/10.1016/j.apergo.2012.08.004 – ✓ Crossref; 02. F56.
- Cockburn, A., Ahlström, D., & Gutwin, C. (2012). Understanding performance in touch selections: Tap, drag and radial pointing drag with finger, stylus and mouse. *International Journal of Human-Computer Studies, 70*(3), 218–233. https://doi.org/10.1016/j.ijhcs.2011.11.002 – ✓ Crossref; Abstract nur über Suchzusammenfassung (vorsichtig verwenden). F43.
- Danion, F. R., & Flanagan, J. R. (2018). Different gaze strategies during eye versus hand tracking of a moving target. *Scientific Reports, 8*, 10059. https://doi.org/10.1038/s41598-018-28434-6 – ✓ Crossref; AB. F60.
- Deber, J., Jota, R., Forlines, C., & Wigdor, D. (2015). How much faster is fast enough? User perception of latency & latency improvements in direct and indirect touch. In *Proceedings of the 33rd Annual ACM Conference on Human Factors in Computing Systems (CHI '15)* (S. 1827–1836). ACM. https://doi.org/10.1145/2702123.2702300 – ✓ Crossref; VT; 02. F49.
- Der, G., & Deary, I. J. (2006). Age and sex differences in reaction time in adulthood: Results from the United Kingdom Health and Lifestyle Survey. *Psychology and Aging, 21*(1), 62–73. https://doi.org/10.1037/0882-7974.21.1.62 – ✓ Crossref; 01. F30.
- Dhakal, V., Feit, A. M., Kristensson, P. O., & Oulasvirta, A. (2018). Observations on typing from 136 million keystrokes. In *Proceedings of the 2018 CHI Conference on Human Factors in Computing Systems* (S. 1–12). ACM. https://doi.org/10.1145/3173574.3174220 – ✓ Crossref; VT (Autorenseite). F31.
- DiFrancisco-Donoghue, J., Balentine, J., Schmidt, G., & Zwibel, H. (2019). Managing the health of the eSport athlete: An integrated health management model. *BMJ Open Sport & Exercise Medicine, 5*(1), e000467. https://doi.org/10.1136/bmjsem-2018-000467 – ✓ Crossref; AB. F84.
- Doyon, J., & Benali, H. (2005). Reorganization and plasticity in the adult brain during learning of motor skills. *Current Opinion in Neurobiology, 15*(2), 161–167. https://doi.org/10.1016/j.conb.2005.03.004 – ✓ Crossref; AB. F67.
- Elble, R. J. (1986). Physiologic and essential tremor. *Neurology, 36*(2), 225–231. https://doi.org/10.1212/WNL.36.2.225 – ✓ Crossref; AB. F50.
- Elliott, D., Helsen, W. F., & Chua, R. (2001). A century later: Woodworth's (1899) two-component model of goal-directed aiming. *Psychological Bulletin, 127*(3), 342–357. https://doi.org/10.1037/0033-2909.127.3.342 – ✓ Crossref; AB. F16.
- Elliott, D., Lyons, J., Hayes, S. J., Burkitt, J. J., Roberts, J. W., Grierson, L. E. M., Hansen, S., & Bennett, S. J. (2017). The multiple process model of goal-directed reaching revisited. *Neuroscience & Biobehavioral Reviews, 72*, 95–110. https://doi.org/10.1016/j.neubiorev.2016.11.016 – ✓ Crossref; AB. F16.
- Feit, A. M., Weir, D., & Oulasvirta, A. (2016). How we type: Movement strategies and performance in everyday typing. In *Proceedings of the 2016 CHI Conference on Human Factors in Computing Systems* (S. 4262–4273). ACM. https://doi.org/10.1145/2858036.2858233 – ✓ Crossref; Abstract über Suchzusammenfassung/Projektseite. F32.
- Findlater, L., Froehlich, J. E., Fattal, K., Wobbrock, J. O., & Dastyar, T. (2013). Age-related differences in performance with touchscreens compared to traditional mouse input. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '13)* (S. 343–346). ACM. https://doi.org/10.1145/2470654.2470703 – ✓ Crossref; AB. F45.
- Forlines, C., Wigdor, D., Shen, C., & Balakrishnan, R. (2007). Direct-touch vs. mouse input for tabletop displays. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '07)* (S. 647–656). ACM. https://doi.org/10.1145/1240624.1240726 – ✓ Crossref; VT (Autorenseite). F42, F80.
- Forman, G. N., Nikitin, S. A., Lang, C. J., Gabriel, D. A., Sonne, M. W., Kociolek, A. M., & Holmes, M. W. R. (2025). Impact of repetitive mouse aiming on muscle fatigue and fine motor performance of the distal upper limb. *Journal of Electromyography and Kinesiology, 82*, 102992. https://doi.org/10.1016/j.jelekin.2025.102992 – ✓ Crossref; AB. F28.
- Fransen, J. (2024). There is no supporting evidence for a far transfer of general perceptual or cognitive training to sports performance. *Sports Medicine, 54*(11), 2717–2724. https://doi.org/10.1007/s40279-024-02060-x – ✓ Crossref; 02. F72.
- Gauthier, G. M., Vercher, J.-L., Mussa Ivaldi, F., & Marchetti, E. (1988). Oculo-manual tracking of visual targets: Control learning, coordination control and coordination model. *Experimental Brain Research, 73*(1), 127–137. https://doi.org/10.1007/BF00279667 – ✓ Crossref; AB. F59.
- Goetz, C. G., Tilley, B. C., Shaftman, S. R., Stebbins, G. T., Fahn, S., Martinez-Martin, P., … LaPelle, N. (2008). Movement Disorder Society-sponsored revision of the Unified Parkinson's Disease Rating Scale (MDS-UPDRS): Scale presentation and clinimetric testing results. *Movement Disorders, 23*(15), 2129–2170. https://doi.org/10.1002/mds.22340 – ✓ Crossref; AB; Itemtext 3.4 über Sekundärquelle. F10.
- Guadagnoli, M. A., & Lee, T. D. (2004). Challenge point: A framework for conceptualizing the effects of various practice conditions in motor learning. *Journal of Motor Behavior, 36*(2), 212–224. https://doi.org/10.3200/JMBR.36.2.212-224 – ✓ Crossref; AB. F65.
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – ✓ Crossref; 01/02. F72.
- Harding, G., Wilkins, A. J., Erba, G., Barkley, G. L., & Fisher, R. S. (2005). Photic- and pattern-induced seizures: Expert consensus of the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1423–1425. https://doi.org/10.1111/j.1528-1167.2005.31305.x – ✓ Crossref; 03. F89.
- Harris, C. M., & Wolpert, D. M. (1998). Signal-dependent noise determines motor planning. *Nature, 394*(6695), 780–784. https://doi.org/10.1038/29528 – ✓ Crossref; AB. F19.
- Heathcote, A., Brown, S., & Mewhort, D. J. K. (2000). The power law repealed: The case for an exponential law of practice. *Psychonomic Bulletin & Review, 7*(2), 185–207. https://doi.org/10.3758/BF03212979 – ✓ Crossref; AB. F64.
- Holz, C., & Baudisch, P. (2010). The generalized perceived input point model and how to double touch accuracy by extracting fingerprints. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '10)* (S. 581–590). ACM. https://doi.org/10.1145/1753326.1753413 – ✓ Crossref; 02. F77.
- Huang, J., Tian, F., Fan, X., Zhang, X. (L.), & Zhai, S. (2018). Understanding the uncertainty in 1D unidirectional moving target selection. In *Proceedings of the 2018 CHI Conference on Human Factors in Computing Systems* (S. 1–12). ACM. https://doi.org/10.1145/3173574.3173811 – ✓ Crossref; 02. F24.
- Hubel, K. A., Reed, B., Yund, E. W., Herron, T. J., & Woods, D. L. (2013). Computerized measures of finger tapping: Effects of hand dominance, age, and sex. *Perceptual and Motor Skills, 116*(3), 929–952. https://doi.org/10.2466/25.29.PMS.116.3.929-952 – ✓ Crossref; AB. F1.
- Hubel, K. A., Yund, E. W., Herron, T. J., & Woods, D. L. (2013). Computerized measures of finger tapping: Reliability, malingering and traumatic brain injury. *Journal of Clinical and Experimental Neuropsychology, 35*(7), 745–758. https://doi.org/10.1080/13803395.2013.824070 – ✓ Crossref; AB. F2.
- Hwang, F., Keates, S., Langdon, P., & Clarkson, J. (2004). Mouse movements of motion-impaired users: A submovement analysis. In *Proceedings of the 6th International ACM SIGACCESS Conference on Computers and Accessibility (ASSETS '04)* (S. 102–109). ACM. https://doi.org/10.1145/1028630.1028649 – ✓ Crossref (Crossref-Datum 2003, Tagung 2004); Abstract über Repositoriumsseite. F55.
- Inkpen, K. M. (2001). Drag-and-drop versus point-and-click mouse interaction styles for children. *ACM Transactions on Computer-Human Interaction, 8*(1), 1–33. https://doi.org/10.1145/371127.371146 – ✓ Crossref; AB. F44.
- Jagacinski, R. J., Repperger, D. W., Ward, S. L., & Moran, M. S. (1980). A test of Fitts' law with moving targets. *Human Factors, 22*(2), 225–233. https://doi.org/10.1177/001872088002200211 – ✓ Crossref; 02 (dort nur bibliografisch). F24.
- Karni, A., Meyer, G., Jezzard, P., Adams, M. M., Turner, R., & Ungerleider, L. G. (1995). Functional MRI evidence for adult motor cortex plasticity during motor skill learning. *Nature, 377*(6545), 155–158. https://doi.org/10.1038/377155a0 – ✓ Crossref (Erstautor dort als „Kami“ verschrieben); AB. F66.
- Keele, S. W., & Hawkins, H. L. (1982). Explorations of individual differences relevant to high level skill. *Journal of Motor Behavior, 14*(1), 3–23. https://doi.org/10.1080/00222895.1982.10735259 – ✓ Crossref; AB. F5.
- Koller, W., Cone, S., & Herbster, G. (1987). Caffeine and tremor. *Neurology, 37*(1), 169–172. https://doi.org/10.1212/WNL.37.1.169 – ✓ Crossref; AB. F54.
- Lee, C. Y., Kang, S. J., Hong, S.-K., Ma, H.-I., Lee, U., & Kim, Y. J. (2016). A validation study of a smartphone-based finger tapping application for quantitative assessment of bradykinesia in Parkinson's disease. *PLOS ONE, 11*(7), e0158852. https://doi.org/10.1371/journal.pone.0158852 – ✓ Crossref; VT (PMC4965104). F4.
- Louis, E. D., & Ferreira, J. J. (2010). How common is the most common adult movement disorder? Update on the worldwide prevalence of essential tremor. *Movement Disorders, 25*(5), 534–541. https://doi.org/10.1002/mds.22838 – ✓ Crossref; AB. F53.
- McAuley, J. H., & Marsden, C. D. (2000). Physiological and pathological tremors and rhythmic central motor control. *Brain, 123*(8), 1545–1567. https://doi.org/10.1093/brain/123.8.1545 – ✓ Crossref; AB. F51.
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – ✓ Crossref; 02. F61.
- Miall, R. C., Reckess, G. Z., & Imamizu, H. (2001). The cerebellum coordinates eye and hand tracking movements. *Nature Neuroscience, 4*(6), 638–644. https://doi.org/10.1038/88465 – ✓ Crossref; AB. F62.
- Miall, R. C., Weir, D. J., & Stein, J. F. (1993). Intermittency in human manual tracking tasks. *Journal of Motor Behavior, 25*(1), 53–63. https://doi.org/10.1080/00222895.1993.9941639 – ✓ Crossref; AB. F58.
- Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. *Journal of Neurophysiology, 83*(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639 – ✓ Crossref; AB. F21.
- Nutt, J. G., Lea, E. S., Van Houten, L., Schuff, R. A., & Sexton, G. J. (2000). Determinants of tapping speed in normal control subjects and subjects with Parkinson's disease: Differing effects of brief and continued practice. *Movement Disorders, 15*(5), 843–849. https://doi.org/10.1002/1531-8257(200009)15:5<843::AID-MDS1013>3.0.CO;2-2 – ✓ Crossref; AB. F3.
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of the 8th Conference on Human-Computer Interaction with Mobile Devices and Services (MobileHCI '06)* (S. 203–210). ACM. https://doi.org/10.1145/1152215.1152260 – ✓ Crossref; 02. F76.
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – ✓ Crossref; AB. F83.
- Prablanc, C., Echallier, J. F., Komilis, E., & Jeannerod, M. (1979). Optimal response of eye and hand motor systems in pointing at a visual target. I. Spatio-temporal characteristics of eye and hand movements and their relationships when varying the amount of visual information. *Biological Cybernetics, 35*(2), 113–124. https://doi.org/10.1007/BF00337436 – ✓ Crossref; AB. F20.
- Proctor, R. W., & Schneider, D. W. (2018). Hick's law for choice reaction time: A review. *Quarterly Journal of Experimental Psychology, 71*(6), 1281–1299. https://doi.org/10.1080/17470218.2017.1322622 – ✓ Crossref; AB. F29.
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – ✓ Crossref; 01. F79.
- Rogers, E. J., Trotter, M. G., Johnson, D., Desbrow, B., & King, N. (2024). KovaaK's aim trainer as a reliable metrics platform for assessing shooting proficiency in esports players: A pilot study. *Frontiers in Sports and Active Living, 6*, 1309991. https://doi.org/10.3389/fspor.2024.1309991 – ✓ Crossref; AB. F27.
- Rosenbaum, D. A., Cohen, R. G., Jax, S. A., Weiss, D. J., & van der Wel, R. (2007). The problem of serial order in behavior: Lashley's legacy. *Human Movement Science, 26*(4), 525–554. https://doi.org/10.1016/j.humov.2007.04.001 – ✓ Crossref; AB. F74.
- Rosser, J. C., Jr., Lynch, P. J., Cuddihy, L., Gentile, D. A., Klonsky, J., & Merrell, R. (2007). The impact of video games on training surgeons in the 21st century. *Archives of Surgery, 142*(2), 181–186. https://doi.org/10.1001/archsurg.142.2.181 – ✓ Crossref; AB. F57.
- Sakai, K., Kitaguchi, K., & Hikosaka, O. (2003). Chunking during human visuomotor sequence learning. *Experimental Brain Research, 152*(2), 229–242. https://doi.org/10.1007/s00221-003-1548-8 – ✓ Crossref; AB. F37.
- Sala, G., Tatlidil, K. S., & Gobet, F. (2018). Video game training does not enhance cognitive ability: A comprehensive meta-analytic investigation. *Psychological Bulletin, 144*(2), 111–139. https://doi.org/10.1037/bul0000139 – ✓ Crossref; AB. F71.
- Salthouse, T. A. (1984). Effects of age and skill in typing. *Journal of Experimental Psychology: General, 113*(3), 345–371. https://doi.org/10.1037/0096-3445.113.3.345 – ✓ Crossref; nur Kurzfassung (Semantic Scholar). F33.
- Sears, A., & Shneiderman, B. (1991). High precision touchscreens: Design strategies and comparisons with a mouse. *International Journal of Man-Machine Studies, 34*(4), 593–613. https://doi.org/10.1016/0020-7373(91)90037-8 – ✓ Crossref; MD, Inhalt nach Forlines et al. (2007). F80.
- Seidler, R. D., Bernard, J. A., Burutolu, T. B., Fling, B. W., Gordon, M. T., Gwin, J. T., Kwak, Y., & Lipps, D. B. (2010). Motor control and aging: Links to age-related brain structural, functional, and biochemical effects. *Neuroscience & Biobehavioral Reviews, 34*(5), 721–733. https://doi.org/10.1016/j.neubiorev.2009.10.005 – ✓ Crossref; AB. F69.
- Shadmehr, R., Smith, M. A., & Krakauer, J. W. (2010). Error correction, sensory prediction, and adaptation in motor control. *Annual Review of Neuroscience, 33*, 89–108. https://doi.org/10.1146/annurev-neuro-060909-153135 – ✓ Crossref; AB. F63.
- Smith, M. W., Sharit, J., & Czaja, S. J. (1999). Aging, motor control, and the performance of computer mouse tasks. *Human Factors, 41*(3), 389–396. https://doi.org/10.1518/001872099779611102 – ✓ Crossref; AB. F23.
- Soukoreff, R. W., & MacKenzie, I. S. (2004). Towards a standard for pointing device evaluation, perspectives on 27 years of Fitts' law research in HCI. *International Journal of Human-Computer Studies, 61*(6), 751–789. https://doi.org/10.1016/j.ijhcs.2004.09.001 – ✓ Crossref; VT (Autorenfassung). F13, F14.
- Spjut, J., Boudaoud, B., Binaee, K., Kim, J., Majercik, A., McGuire, M., Luebke, D., & Kim, J. (2019). Latency of 30 ms benefits first person targeting tasks more than refresh rate above 60 Hz. In *SIGGRAPH Asia 2019 Technical Briefs* (S. 110–113). ACM. https://doi.org/10.1145/3355088.3365170 – ✓ Crossref; AB. F26.
- Sternberg, S., Monsell, S., Knoll, R. L., & Wright, C. E. (1978). The latency and duration of rapid movement sequences: Comparisons of speech and typewriting. In G. E. Stelmach (Hrsg.), *Information processing in motor control and learning* (S. 117–152). Academic Press. https://doi.org/10.1016/B978-0-12-665960-3.50011-6 – ✓ Crossref; MD (nur als korrekte Alternative zu W12 genannt, keine Zahlen verwendet).
- Tombaugh, T. N. (2004). Trail Making Test A and B: Normative data stratified by age and education. *Archives of Clinical Neuropsychology, 19*(2), 203–214. https://doi.org/10.1016/S0887-6177(03)00039-8 – ✓ Crossref; AB. F73.
- Voelcker-Rehage, C. (2008). Motor-skill learning in older adults—a review of studies on age-related differences. *European Review of Aging and Physical Activity, 5*(1), 5–16. https://doi.org/10.1007/s11556-008-0030-9 – ✓ Crossref; AB. F68.
- Vogel, D., & Baudisch, P. (2007). Shift: A technique for operating pen-based interfaces using touch. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '07)* (S. 657–666). ACM. https://doi.org/10.1145/1240624.1240727 – ✓ Crossref; AB. F78.
- W3C. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (W3C Recommendation, 12.12.2024). https://www.w3.org/TR/WCAG22/ – keine DOI; VT (SC 2.2.1, 2.3.1, 2.5.1, 2.5.7, 2.5.8). F48, F89.
- Walker, N., Philbin, D. A., & Fisk, A. D. (1997). Age-related differences in movement control: Adjusting submovement structure to optimize performance. *The Journals of Gerontology: Series B, 52B*(1), P40–P52. https://doi.org/10.1093/geronb/52B.1.P40 – ✓ Crossref; AB. F22.
- Weidling, P., & Jaschinski, W. (2015). The vertical monitor position for presbyopic computer users with progressive lenses: How to reach clear vision and comfortable head posture. *Ergonomics, 58*(11), 1813–1829. https://doi.org/10.1080/00140139.2015.1035764 – ✓ Crossref; AB. F82.
- Wessel, J. R. (2018). Prepotent motor activity and inhibitory control demands in different variants of the go/no-go paradigm. *Psychophysiology, 55*(3), e12871. https://doi.org/10.1111/psyp.12871 – ✓ Crossref; 01. F34.
- Wimmer, R., Schmid, A., & Bockes, F. (2019). On the latency of USB-connected input devices. In *Proceedings of the 2019 CHI Conference on Human Factors in Computing Systems* (S. 1–12). ACM. https://doi.org/10.1145/3290605.3300650 – ✓ Crossref; VT (Autorenfassung Uni Regensburg). F35.
- Witt, S. T., Laird, A. R., & Meyerand, M. E. (2008). Functional neuroimaging correlates of finger-tapping task variations: An ALE meta-analysis. *NeuroImage, 42*(1), 343–356. https://doi.org/10.1016/j.neuroimage.2008.04.025 – ✓ Crossref; AB. F9.
- Wood, E., Willoughby, T., Rushing, A., Bechtel, L., & Gilbert, J. (2005). Use of computer input devices by older adults. *Journal of Applied Gerontology, 24*(5), 419–438. https://doi.org/10.1177/0733464805278378 – ✓ Crossref; AB. F46.
- Worden, A., Walker, N., Bharat, K., & Hudson, S. (1997). Making computers easier for older adults to use: Area cursors and sticky icons. In *Proceedings of the ACM SIGCHI Conference on Human Factors in Computing Systems (CHI '97)* (S. 266–271). ACM. https://doi.org/10.1145/258549.258724 – ✓ Crossref; AB (über Suchzusammenfassung/Autorenseite). F47.
- Zelaznik, H. N., Hawkins, B., & Kisselburgh, L. (1983). Rapid visual feedback processing in single-aiming movements. *Journal of Motor Behavior, 15*(3), 217–236. https://doi.org/10.1080/00222895.1983.10735298 – ✓ Crossref; AB. F17.
- ISO. (2017). *ISO 8596:2017 Ophthalmic optics — Visual acuity testing — Standard and clinical optotypes and their presentation.* https://www.iso.org/standard/69042.html – keine DOI; 02/03 (Leseprobe). F87.

**Umfang:** 18 Website-Quellen geprüft (davon 4 bibliografisch fehlerhaft, 1 Buch ohne prüfbare Normzahl) +
83 weitere Einträge (D2, davon 3 ohne DOI: Buxton 1990, W3C 2024, ISO 8596), jeweils mit Prüfvermerk; 89 Fakten (F1–F89).
