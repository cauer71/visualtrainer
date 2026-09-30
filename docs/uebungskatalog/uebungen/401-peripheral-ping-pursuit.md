---
# ===== Kennung =====
nr: 401
kennung: peripheral-ping-pursuit
name: "Mitte fixieren, Randblitze bemerken (Peripherer Ping)"
name_original: "Peripheres Sehen: zentrale Verfolgung und Randreize (Peripheral Ping Pursuit)"
kapitel: "Blickverfolgung"
kapitel_original: "visual-tracking"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/visual-tracking/peripheral-ping-pursuit"
blickfit_umsetzung: null
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Man hält den Blick auf ein ruhendes Kreuz in der Bildmitte, während an zufälligen Stellen des Bildschirms kurz rote Leuchtpunkte aufblitzen, und versucht, sie aus dem Augenwinkel zu bemerken, ohne hinzuschauen. Anders als der Seitentext verspricht, bewegt sich in der Mitte nichts, und das Original wertet keine Antwort aus."
ziel_funktionen: [fixation, peripheres_sehen]
eingabe: [maus, touch]
tablet_geeignet: mit_anpassung
dauer_sekunden: 60
schwierigkeit_anpassung: "Kein Levelsystem, keine automatische Anpassung. Manuell: 'Target Speed' 0,5–9× (Regler in 0,1-Schritten) erhöht nur die Häufigkeit der Pings (bei 60 Bildern/s ≈ 0,35/s bei 0,5×, 0,7/s bei 1×, 2,1/s bei 3×, 3,1/s bei 9×) und verkürzt ihre Dauer (1,5 s bei 0,5×, 0,75 s bei 1×, mindestens 0,25 s ab 3×); Ping-Radius 10–50 px; 'Random Speed' schwankt den Faktor 0,4- bis 1,9-fach; 'Hide Line' entfernt das Fixierkreuz. Dauer 30/45/60/90/120 s."
messgroessen: ["Original: keine Leistungsmessung (nur Zähler abgeschlossener Sitzungen)", "sinnvoll: Entdeckungsrate der Randreize je Exzentrizität und Quadrant (%)", "sinnvoll: einfache Reaktionszeit auf Randreize (ms, Median)", "sinnvoll: Fehlalarme (Tippen ohne Reiz)", "nur mit Eyetracker: Fixationsabbrüche/Blicksprünge zum Reiz"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 3
    nutzbares_sehfeld: 2
    blickfolge: 0
    sakkaden: 0
    fixation: 3
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 0
    inhibition: 2
    geteilte_aufmerksamkeit: 1
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 0
    antizipation: 0
    entscheidung_wahlreaktion: 0
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 0
    zielbewegung_tempo: 0
    zielbewegung_praezision: 0
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 0
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Blick ohne Kontrolle selbstständig in der Mitte halten können (nichts prüft das)", "Abstand 50–70 cm zum Monitor bzw. 35–40 cm zum Tablet, Kopf ruhig", "keine bekannte Photosensitivität (plötzliche rote Leuchtpunkte, bei hohem Tempo ≈ 3 pro Sekunde)", "Maus oder Finger nur zum Starten; die im Text genannte Leertaste hat keine Funktion"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, gesichtsfeldausfall, farbsehschwaeche, trockenes_auge_bildschirm, presbyopie_gleitsicht, nystagmus, aufmerksamkeitsprobleme, kinder_unter_6]
geeignet_fuer: ["ruhiges Fixieren üben, ohne auf plötzlich erscheinende Reize zu blicken (verdeckte Aufmerksamkeit)", "Aufmerksamkeit bewusst auf den ganzen Bildschirm ausweiten, ohne Handlung und ohne Zeitdruck", "Einstieg vor anspruchsvolleren Mitte-und-Rand-Aufgaben (108 Blitzblick/UFOV, 205, 801)"]
weniger_geeignet_fuer: ["alle, die Rückmeldung, Punkte oder Fortschritt erwarten (das Original misst nichts)", "Ziel 'Blickfolge' (entgegen dem Namen gibt es kein bewegtes zentrales Ziel)", "Ziel 'Reaktionszeit' (keine Antwort vorgesehen)", "Menschen mit Photosensitivität oder lichtempfindlicher Migräne", "Personen mit Gesichtsfeldausfall, die ein Ergebnis als Gesichtsfeldbefund missverstehen könnten"]
evidenz:
  uebungseffekt: unklar
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Das Original hat keine Antwort und keine Blickkontrolle, ein Lernfortschritt ist daher nicht feststellbar. UFOV-Training (Mitte + Rand, kurze Darbietung, Antwort, Rückmeldung) verbessert die geübte Leistung deutlich (Ball et al., 1988, 2002), ist aber ein anderes Protokoll; 93 Studien zu Peripherie-Trainingsgeräten im Sport prüften nie per Eyetracking, ob überhaupt peripher gesehen wurde (Vater & Strasburger, 2021)."
aehnliche_uebungen: [108, 801, 205, 408, 101, 208, 102, 404, 303, 206]
stichworte: ["peripheres Sehen", "verdeckte Aufmerksamkeit", "covert attention", "Fixation", "Blickfang", "oculomotor capture", "nutzbares Sehfeld", "UFOV", "Randreiz", "Tunnelblick"]
---

# 401 · Mitte fixieren, Randblitze bemerken (Peripherer Ping)

> Original: „Peripheres Sehen: zentrale Verfolgung und Randreize“ (englischer Spielname „Peripheral Ping
> Pursuit“) – skilldrills.online, Kapitel Blickverfolgung (`visual-tracking`) · Blickfit: noch nicht umgesetzt
> (verwandt: Blickfit „Blitzblick“ → 108, „Doppelt gefordert“ → 205)

## 1. Kurzbeschreibung

Die Übung läuft im Vollbild auf fast schwarzem Grund. In der Mitte steht ein dünnes, halbtransparentes Kreuz,
auf das man den Blick richtet. An zufälligen Stellen des Bildschirms erscheint immer wieder für ¼ bis 1½
Sekunden ein roter Leuchtpunkt mit weißem Kern („Ping“). Man soll ihn aus dem Augenwinkel bemerken, ohne
hinzuschauen. Laut Seitentext soll man dabei einer schwebenden Kugel folgen und bei jedem Ping die Leertaste
drücken; beides ist im ausgelieferten Spiel nicht vorhanden. Es gibt keine Punkte und keine Auswertung.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spielcode (seitenspezifischer Chunk `98993-…js`, Hilfsmodule
`90762-…js` und `71254-…js`, gleiche Bibliothek wie 404–415; Stand 29.09.2026). Nur die Mechanik wurde
ausgewertet, kein Code übernommen.

**Ablauf (Code).** Einstellungen → Start (Vollbild, Spielfläche füllt das ganze Fenster) → Countdown 3-2-1-GO
(≈ 2,5 s, mit Tönen) → Übung → Ende-Bildschirm mit Sitzungsdauer, „Base Speed“, Zahl abgeschlossener Sitzungen
und „Speed Acceleration: Enabled/Fixed“ sowie der Überschrift „Smooth Pursuit Calibrated“. Abbruch mit Escape
oder beim Verlassen des Vollbilds. Gespeichert wird nur der Sitzungszähler im Browser.

**Reize (Code).** Hintergrund #050508 mit 40-px-Raster (2 % Deckkraft; „Day Mode“: Weiß, Raster 5 %).
Fixierkreuz in der Mitte: zwei Linien à 48 px, 2 px breit, 35 % Deckkraft; „Hide Line“ entfernt es. Ping:
gefüllter Kreis (Radius 0,82 × r, 88 % Deckkraft), Ring bei r, äußerer Ring bei r + 5 px, weißer Kernpunkt,
mit „Neon Glow“ (Standard an) ein Leuchtsaum von 14 px. Standard r = 16 px (Ø 32 px, mit Außenring 42 px),
einstellbar 10–50 px; Farbe Rot #ef4444 (Standard), Grün, Blau, Orange, Gelb oder Weiß. Der Ping **bewegt sich
nicht**; er erscheint und verschwindet hart (ohne Ein-/Ausblenden). Position: gleichverteilt über die **ganze**
Fläche mit 2 r Randabstand – also auch nahe der Mitte.

**Takt (Code).** Solange kein Ping sichtbar ist, entsteht in **jedem verarbeiteten Bild** mit
Wahrscheinlichkeit 0,025 × Tempofaktor ein neuer. Seine Dauer ist zeitbasiert: max(15, 45 / Tempo) Einheiten zu
1/60 s (mit „Random Speed“ bei 0,5× bis ≈ 3,8 s). Die Schleife verarbeitet höchstens ein Bild je 13 ms (60 Hz → 60, 90 Hz → 45, 120 Hz → 60, 144 Hz → 72
Bilder/s). Eigene Berechnung (Mittelwerte):

| Tempo | 0,5× | 1× | 2× | 3× | 5× | 9× |
|---|---|---|---|---|---|---|
| Ping-Dauer (ms) | 1 500 | 750 | 375 | 250 | 250 | 250 |
| Pause bis zum nächsten Ping, 60 Bilder/s (ms) | 1 333 | 667 | 333 | 222 | 133 | 74 |
| Pings pro Sekunde bei 60 / 72 / 45 Bildern/s | 0,35 / 0,38 / 0,31 | 0,71 / 0,77 / 0,61 | 1,4 / 1,5 / 1,2 | 2,1 / 2,3 / 1,8 | 2,6 / 2,8 / 2,3 | 3,1 / 3,2 / 2,9 |

Ab 3× treten in einzelnen Sekunden bis zu 4 Pings auf. „Random Speed“ multipliziert das Tempo mit einer glatten
Sinusfunktion der Uhrzeit (Faktor 0,40–1,90). Die Ping-Rate hängt damit von der Bildwiederholrate ab (Erzeugung
pro Bild statt pro Zeit): Ein 90-Hz-Tablet zeigt ≈ 14 % weniger Pings als ein 60-Hz-Gerät.

**Eingabe (Code).** Zeiger und Finger zeichnen nur ein weißes Fadenkreuz an ihrer Position (der Mauszeiger ist
ausgeblendet). Es gibt **keine** Tastenabfrage außer Escape, keine Treffer-, Fehler- oder Zeitmessung.

**Widersprüche Regeltext ↔ Code.**
- „Zentrales Ziel verfolgen“, „folge der sanft schwebenden Kugel“, „grüner Kern des Hauptziels“: Es gibt kein
  bewegtes zentrales Ziel, nur ein ruhendes Kreuz. Die Übung ist eine **Fixations**-, keine Folgeaufgabe.
- „Target Speed“ steuert keine Geschwindigkeit, sondern Ping-Häufigkeit und -Dauer; „Hide Line – path guide
  lines“ entfernt das Fixierkreuz (danach gibt es keinen Fixierpunkt mehr); „Gaze Trail“ zeichnet den ruhenden
  Ping mehrfach an dieselbe Stelle.
- „Leertaste drücken“, „Punkte verlieren bei Sakkade“, „Aufschlüsselung nach Quadranten“: nicht umgesetzt.
- „Kurze Reize am Rand“: Pings kommen überall vor; am 24″-Monitor liegt etwa jeder vierte innerhalb von 10° um
  die Mitte (Abschnitt 4).
- Leistungstabelle („UFOV > 92 %“, „Reaktionszeit < 280 ms“, „Blickstabilität > 95 %“): nichts davon wird
  erhoben.

## 3. Was die Website sagt – und wie das einzuordnen ist

**Aussagen.** Die Übung verbinde zentrale Blickverfolgung mit peripherer Entdeckung und mache verdeckte
Aufmerksamkeit (Posner, 1980) beobachtbar. Die Netzhautperipherie sei durch Stäbchen und magnozelluläre Zellen
„extrem empfindlich“; man solle auf den dorsalen Pfad setzen, eine „Anti-Tunnel-Atmung“ (4 s ein, 6 s aus) halte
das Gesichtsfeld offen und senke den Augeninnendruck. Der englische Beschreibungstext im Code behauptet, die
Übung „stärke frontoparietale Aufmerksamkeitsnetzwerke“ und erweitere das funktionelle Gesichtsfeld. Zielgruppen:
FPS-Spieler, Ballsportler, Autofahrer. Eine Tabelle nennt Stufen „Elite“ bis „Basis“ mit UFOV-%, Reaktionszeit
und Blickstabilität „bei 60 cm und 1080p“. Positiv: Die Seite sagt selbst, sie untersuche nicht das
Gesichtsfeld, behandle keinen Tunnelblick und belege keinen Nutzen im Straßenverkehr.

**Einordnung.**
- **Verdecktes Orientieren** gibt es (Posner, 1980): Aufmerksamkeit an einem Ort verbessert dort die Entdeckung
  ohne Blickbewegung. Ein weiterer Aufmerksamkeitsfokus kostet aber Verarbeitungseffizienz (Zoom-Modell; Eriksen
  & St. James, 1986) – „Bewusstsein wie Nebel über den ganzen Monitor“ ist kein Vorteil an sich.
- **Blickfang ist real:** Plötzlich erscheinende Objekte ziehen den Blick unwillkürlich an (Findlay & Walker,
  1999; Theeuwes et al., 1998: „in vielen Fällen“ startete der Blick zuerst zum neuen Objekt; die oft genannten
  ≈ 30–40 % der Durchgänge stammen aus Sekundärquellen und sind hier nicht geprüft). Die Aufgabe „nicht hinschauen“ ist daher
  sinnvoll, wird aber nicht kontrolliert.
- **Stäbchen-Argument:** Außerhalb der Fovea überwiegen Stäbchen zahlenmäßig (92 Mio. gegenüber 4,6 Mio.
  Zapfen; Curcio et al., 1990). Bei Bildschirmleuchtdichte und Raumlicht tragen aber vorwiegend Zapfen das Sehen (allgemeines Lehrbuchwissen); dass die Pings
  über Stäbchen entdeckt werden, ist nicht belegt. Die Reaktionszeit steigt mit der Exzentrizität (Osaka, 1976).
- **Tunnelblick:** Belegt ist, dass eine **zentrale** Zusatzlast die Randwahrnehmung einengt (Ringer et al.,
  2016) – genau diese zentrale Aufgabe fehlt im Code. Atemtechnik, Augeninnendruck und „Sympathikus verengt das
  Gesichtsfeld“: ohne Beleg.
- **„Stärkt frontoparietale Netzwerke“:** Diese Netzwerke sind an zielgerichteter und reizgetriebener
  Aufmerksamkeit **beteiligt** (Corbetta & Shulman, 2002); eine Stärkung durch diese Übung ist nicht untersucht.
- **Leistungsstufen ohne Datengrundlage:** Keine der sechs Quellen enthält solche Werte; die Seite sammelt nach
  eigener Angabe keine Daten. Die „UFOV %“-Stufen sind keinem veröffentlichten UFOV-Verfahren zugeordnet; Ball et
  al. (1988) bestimmten das nutzbare Sehfeld über die Lokalisationsleistung bei Suche mit Ablenkern, eine Einteilung
  in „Elite“ bis „Basis“ gibt es dort nicht. Woods et al. (2015) fanden für einfache Reaktionen auf Reize 3,6° neben der Mitte
  231 ms (213 ms nach Abzug der Geräteverzögerung) – ohne Doppelaufgabe und ohne Stufen.
- **Zielgruppen/Transfer:** Minimap-, Flanken- oder Verkehrsnutzen ist nicht belegt (Abschnitt 8).

## 4. Optische und okulomotorische Grundlagen

**Sehwinkel.** 24″-Monitor, 1920 × 1080, 60 cm (≈ 38 px/°): Ping Ø 32 px ≈ 0,85°, Fixierkreuz 48 px ≈ 1,3°.
Die Pings liegen bis ≈ 23° seitlich und ≈ 13° oben/unten (Ecken ≈ 26°), im Median 14° von der Mitte; ≈ 24 %
liegen innerhalb von 10°, ≈ 6 % innerhalb von 5° (eigene Simulation der Gleichverteilung). 11″-Tablet quer
(1194 × 834 CSS-px) in 40 cm: Ping ≈ 0,9°, höchstens ≈ 18°, Median 10°, fast die Hälfte innerhalb von 10°. Das
horizontale Gesichtsfeld umfasst ≈ 200° (Strasburger et al., 2011) – geübt wird also nur das **nahe bis mittlere
Umfeld**, nicht das „echte“ weite Randfeld.

**Entdeckbarkeit.** Ein 0,85° großer, gesättigter roter Punkt mit weißem Kern auf Schwarz, 250–1 500 ms
sichtbar, ist im ganzen Bildschirmbereich sehr leicht zu sehen; Sehschärfe und Kontrast begrenzen die Leistung
nicht. Leistungsfelder sind ungleich: waagrecht besser als senkrecht, unten besser als oben (Abrams et al.,
2012); Gesunde verschieben die Aufmerksamkeit leicht nach links (Pseudoneglect; Jewell & McCourt, 2000).
Seitenunterschiede sind daher normal und kein Befund.

**Fixation und Blicksprünge.** Die eigentliche Anforderung ist, den Blick **nicht** zum Ping springen zu lassen.
Im Gap-Paradigma (Fixierpunkt erlischt vor dem Ziel) starten reguläre Sakkaden nach ≈ 150 ms, Express-Sakkaden
nach ≈ 100 ms (Fischer & Ramsperger, 1984); bleibt der Fixierpunkt wie hier sichtbar, sind die Latenzen eher
länger. Bei Ping-Dauern ≥ 250 ms reicht die Zeit für einen Kontrollblick trotzdem fast immer. Ohne Blickerfassung weiß niemand, ob
peripher gesehen wurde.

**Brille, Alter, Augen.**
- **Gleitsicht:** Der scharfe Zwischenbereich ist bei 60 cm nur ≈ 13–18° breit (Han et al., 2003). Für das
  Fixierkreuz in der Mitte reicht das; Pings in der unteren Hälfte fallen in den Nahteil, weiter außen in die
  seitliche Unschärfe. Für das Entdecken eines großen, kontrastreichen Punkts ist das vermutlich unkritisch
  (Einschätzung, nicht untersucht); ein Monitor zu tief oder zu hoch zwingt aber zu Kopfneigung. Günstig:
  Arbeitsplatzbrille, Bildschirmmitte leicht unter Augenhöhe.
- **Alterssichtigkeit:** Am Tablet (35–40 cm, 2,5–2,9 dpt) ist eine Nahkorrektur nötig, damit das Kreuz ruhig
  fixiert werden kann.
- **Farbsehschwäche** (≈ 8 % der Männer; Birch, 2012): Farbe trägt keine Information, aber Rot wirkt bei
  Protan-Störungen dunkler und damit weniger auffällig; Weiß oder Gelb wählen.
- **Trockenes Auge:** Beim 15-minütigen Lesen am Bildschirm lag die Lidschlagrate im Mittel bei 11,6/min, 16 % der
  Lidschläge waren unvollständig (n = 21; Portello et al., 2013); starres Fixieren verstärkt das. Bewusst blinzeln, kurze Sätze.
- **Gesichtsfeldausfall:** Nicht bemerkte Pings in einem Bereich können beunruhigen; die Übung ist **kein**
  Gesichtsfeldtest (so auch die Website). Auffälligkeiten gehören in eine augenärztliche Untersuchung.

## 5. Neurowissenschaftliche Grundlagen

- **Aufmerksamkeitsnetzwerke:** Ein dorsales frontoparietales Netz (intraparietaler und oberer frontaler Kortex)
  richtet Aufmerksamkeit zielgerichtet aus; ein ventrales, vorwiegend rechtsseitiges Netz (temporoparietaler
  Übergang, unterer Frontalkortex) meldet saliente, unerwartete Reize und wirkt als „Unterbrecher“ (Corbetta &
  Shulman, 2002). Ein plötzlicher Ping spricht genau dieses ventrale System an.
- **Blickfang und Blickunterdrückung:** Visuelle Onsets haben über die unteren Ebenen der Blicksteuerung
  (Colliculus superior) automatischen Zugang zum Sakkadensystem; willentliche Blicksteuerung konkurriert damit
  (Findlay & Walker, 1999). Das Unterdrücken reflexiver Blicksprünge ist am besten mit der Antisakkaden-Aufgabe
  untersucht, an der frontales Augenfeld, dorsolateraler präfrontaler Kortex und Colliculus superior beteiligt
  sind (Übersicht: Munoz & Everling, 2004).
- **Verarbeitungswege:** Das Zwei-Pfade-Modell (ventral „was“, dorsal „wo/wie handeln“; Goodale & Milner, 1992)
  existiert; der Tipp „verzichte auf Identifikation zugunsten des dorsalen Systems“ ist daraus nicht ableitbar.
- **Falls ein bewegtes Ziel ergänzt wird (wie beschrieben):** Der Hauptfokus der Aufmerksamkeit liegt während der
  Blickfolge auf dem Ziel (Lovejoy et al., 2009), daneben besteht eine breite Bevorzugung des Halbfelds in
  Bewegungsrichtung (Khan et al., 2010); beachtete, plötzlich
  erscheinende ruhende Randobjekte senken die Folgegeschwindigkeit deutlich (Kerzel et al., 2008), ebenso fordernde
  Zweitaufgaben (Hutton & Tegally, 2005). Belege, dass die Übung Hirnareale „stärkt“, wurden nicht gefunden.

## 6. Motorische Grundlagen

- **Original:** keine Handlung, alle motorischen Merkmale 0. Einzige „Motorik“ ist die Augenmotorik in Form
  stabiler Fixation.
- **Beschriebene Variante (Leertaste/Tippen):** Dann käme eine einfache Reaktion hinzu. Einfache visuelle
  Reaktionszeit ≈ 231 ms inklusive ≈ 18 ms Geräteverzögerung im kalibrierten Aufbau (Woods et al., 2015); sie
  nimmt mit der Exzentrizität zu und mit der Reizgröße ab (Messung bis 50°, nur 2 geübte Personen; Osaka, 1976;
  genaue Werte je Grad nur im Volltext, nicht geprüft). Die Ende-zu-Ende-Latenz beim Tippen lag je nach Gerät
  und Software bei 48–276 ms, im Safari-Canvas am iPad Air 2 bei ≈ 77 ms (Casiez et al., 2017) – Reaktionszeiten sind daher nur am selben Gerät vergleichbar.

## 7. Einflussfaktoren und Messgrenzen

- **Gerät:** Die Ping-Rate hängt von der verarbeiteten Bildrate ab (45–72 Bilder/s, Abschnitt 2);
  Bildschirmgröße und Abstand bestimmen, wie weit „peripher“ die Pings überhaupt liegen (18° am Tablet, 26° am
  24″-Monitor). Ein kleines Fenster oder großer Abstand macht aus der Übung eine zentrale Aufgabe.
- **Einstellungen:** Ohne Kreuz („Hide Line“) fehlt der Fixierpunkt; hohe Tempi verkürzen die Pings auf 250 ms,
  was die Entdeckung kaum erschwert, die Reizdichte aber erhöht.
- **Person:** Müdigkeit, Konzentration, Tagesform; Kinder und Menschen mit Aufmerksamkeitsproblemen halten die
  Mitte schwerer.
- **Messqualität:** Das Original misst nichts. Selbst mit Tipp-Antwort bleibt ohne Eyetracker offen, ob die
  Person fixiert hat; eine Entdeckungsrate ohne Blickkontrolle misst vor allem, ob man hingeschaut hat.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – unklar.** Ohne Antwort und Rückmeldung gibt es keine messbare Leistung. Verwandte Aufgaben mit
  Mitte + Rand, kurzer Darbietung und Rückmeldung (UFOV) sind gut trainierbar: Ältere verbesserten das nutzbare
  Sehfeld durch Übung (Ball et al., 1988); in der ACTIVE-Studie (2 832 Personen, 65–94 Jahre, 10 betreute
  Sitzungen) verbesserten sich 87 % der Geschwindigkeitsgruppe verlässlich, ohne Effekt auf das
  Alltagsfunktionieren nach 2 Jahren (Ball et al., 2002).
- **Naher Transfer – schwach.** Übungen zum Peripheriesehen im Sport wurden nie per Eyetracking darauf geprüft,
  ob überhaupt peripher gesehen wurde (93 Studien zu 5 Geräten; Vater & Strasburger, 2021).
- **Alltagstransfer – fehlend.** Für diese Aufgabe gibt es keine Studie. Hirntrainings verbessern verlässlich
  die geübte Aufgabe, kaum aber den Alltag (Simons et al., 2016). Die UFOV-Unfallbefunde gelten für ältere
  Fahrer:innen mit dem Studienprotokoll, nicht für diese Übung.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand ruhiges Fixieren bei ablenkenden Onsets üben oder die Aufmerksamkeit bewusst
  ausweiten möchte, eine kurze Übung ohne Hand, Zeitdruck oder Bewegungsreize gesucht wird, oder als
  Aufwärmen vor 108 (Blitzblick/UFOV), 205 oder 801.
- **Weniger passend, wenn …** Blickfolge, Reaktionszeit oder Rückmeldung das Ziel sind; bei Wunsch nach
  messbarem Fortschritt.
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: harte rote Onsets mit Leuchtsaum, bei ≥ 7× im Mittel
    ≈ 3 pro Sekunde, ab 3× in einzelnen Sekunden bis 4; die Fläche (Ø mit Saum ≈ 1,8°) liegt weit unter der WCAG-Flächengrenze (0,006 sr, etwa 25 % eines
    10°-Feldes; W3C, 2024), die besonders gefährlichen 15–25 Hz werden nicht erreicht (Fisher et al., 2005). Trotzdem Tempo
    ≤ 2×, kein „Day Mode“, bei Unwohlsein abbrechen.
  - `gesichtsfeldausfall`: Übung kann Ausfälle weder erkennen noch ausschließen; Ergebnisse nicht deuten.
  - `farbsehschwaeche`: Standard-Rot für Protan-Betroffene dunkler; Weiß/Gelb wählen.
  - `trockenes_auge_bildschirm`: starres Fixieren, seltener Lidschlag; Pausen, blinzeln.
  - `presbyopie_gleitsicht`: Kreuz durch den Zwischenbereich fixieren, Arbeitsplatzbrille, Monitorhöhe.
  - `nystagmus`: ruhiges Fixieren kann erschwert sein; Übung eventuell frustrierend.
  - `aufmerksamkeitsprobleme`, `kinder_unter_6`: eintönige Aufgabe ohne Rückmeldung, Blick bleibt schwer in der
    Mitte.
- **Kombiniert gut mit …** 108 (Mitte + Rand mit Antwort), 801 (Randreize mit Reaktion), 205/206 (echte
  Doppelaufgabe), 408 (zwei Ziele links/rechts), 404 (echte Blickfolge), 303 (Gegenstück: bewusste Blicksprünge).

Keine Diagnose, kein Heil- oder Sehversprechen: Die Übung prüft weder das Gesichtsfeld noch die Fahrtauglichkeit.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Aufgabe herstellen:** Tipp-Antwort auf jeden Randreiz (großer Tippbereich unten, Tablet quer), Fehlalarme
  zählen, Median-Reaktionszeit und Entdeckungsrate **je Ring (5°, 10°, 15°) und Quadrant** – mit Hinweis, dass
  Seitenunterschiede normal sind.
- **Fixation absichern ohne Eyetracker:** Reize nur 100–200 ms zeigen (kürzer als eine Sakkadenlatenz plus
  Rückkehr) und in der Mitte eine kleine Zweitaufgabe (z. B. seltener Buchstabe/Form am Fixierpunkt, wie im
  UFOV). Erst so entsteht die beschriebene Doppelaufgabe; optional als Stufe ein langsam bewegtes Mittelziel.
- **Reize wirklich peripher:** Mindestabstand zur Mitte (z. B. ≥ 5°), Sehwinkel über Abstands-/Bildschirm-
  angabe kalibrieren; Reizrate zeitbasiert statt pro Bild.
- **Adaptiv:** Darbietungszeit oder Reizkontrast per Treppenverfahren statt „Speed“-Regler.
- **Sicherheit/Barrierefreiheit:** weich ein-/ausblenden, keine Leuchtsäume, ≤ 1 Reiz/s, Standardfarbe Weiß,
  keine Farbe als Information, Warnhinweis und Pause jederzeit.
- **Kommunikation:** kein „Gesichtsfeld erweitern“, keine UFOV-%-Stufen, kein Verkehrs-/Sportversprechen;
  Name als Aufmerksamkeitsübung, nicht als Test.

## 11. Quellen

### Von der Website angegeben

- Posner, M. I. (1980). Orienting of attention. *Quarterly Journal of Experimental Psychology, 32*(1), 3–25.
  https://doi.org/10.1080/00335558008248231 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** ja
  (Konzept verdeckter Aufmerksamkeit), gezeigt aber bei ruhender Fixation, nicht während Blickfolge.
- Eriksen, C. W., & St. James, J. D. (1986). Visual attention within and around the field of focal attention: A
  zoom lens model. *Perception & Psychophysics, 40*(4), 225–240. https://doi.org/10.3758/BF03211502 –
  **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise – variabler Fokus ja, aber ein weiter
  Fokus kostet Effizienz; das verschweigt die Seite.
- Wolfe, J. M. (1994). Guided Search 2.0: A revised model of visual search. *Psychonomic Bulletin & Review, 1*(2),
  202–238. https://doi.org/10.3758/BF03200774 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:**
  nein – Modell der visuellen Suche; die Übung verlangt keine Suche.
- Findlay, J. M., & Walker, R. (1999). A model of saccade generation based on parallel processing and competitive
  inhibition. *Behavioral and Brain Sciences, 22*(4), 661–674. https://doi.org/10.1017/S0140525X99002150 –
  **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** ja – Onsets haben automatischen Zugang zur
  Blicksteuerung („Reflex widerstehen“), eine Sakkadenlatenz um 200 ms ist plausibel; „stärkt frontoparietale
  Netze“ steht nicht darin.
- Leigh, R. J., & Zee, D. S. (2015). *The neurology of eye movements* (5th ed.). Oxford University Press. Buch.
  https://doi.org/10.1093/med/9780199969289.001.0001 – **Prüfung:** angegebene DOI (…9203…) nicht auffindbar,
  richtig: …9289… ✓ (Crossref); **stützt die Aussage der Website:** teilweise – Standardwerk, aber ohne
  Seitenangabe; keine Aussage prüfbar.
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of
  simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 –
  **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** nein – einfache RT bei Fixation (231/213 ms),
  keine Doppelaufgabe, keine Stufen, kein UFOV-%.

### Weitere Fachliteratur

- Abrams, J., Nizam, A., & Carrasco, M. (2012). Isoeccentric locations are not equivalent: The extent of the vertical meridian asymmetry. *Vision Research, 52*(1), 70–78. https://doi.org/10.1016/j.visres.2011.10.016 – Leistungsfelder
- Ball, K. K., Beard, B. L., Roenker, D. L., Miller, R. L., & Griggs, D. S. (1988). Age and visual search: Expanding the useful field of view. *Journal of the Optical Society of America A, 5*(12), 2210–2219. https://doi.org/10.1364/JOSAA.5.002210 – UFOV trainierbar
- Ball, K., Berch, D. B., Helmers, K. F., Jobe, J. B., Leveck, M. D., Marsiske, M., Morris, J. N., Rebok, G. W., Smith, D. M., Tennstedt, S. L., Unverzagt, F. W., & Willis, S. L. (2002). Effects of cognitive training interventions with older adults: A randomized controlled trial. *JAMA, 288*(18), 2271–2281. https://doi.org/10.1001/jama.288.18.2271 – ACTIVE
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Farbsehschwäche
- Casiez, G., Pietrzak, T., Marchal, D., Poulmane, S., Falce, M., & Roussel, N. (2017). Characterizing latency in touch and button-equipped interactive systems. In *Proceedings of the 30th Annual ACM Symposium on User Interface Software and Technology* (S. 29–39). ACM. https://doi.org/10.1145/3126594.3126606 – Geräte-Latenz
- Corbetta, M., & Shulman, G. L. (2002). Control of goal-directed and stimulus-driven attention in the brain. *Nature Reviews Neuroscience, 3*(3), 201–215. https://doi.org/10.1038/nrn755 – Aufmerksamkeitsnetzwerke
- Curcio, C. A., Sloan, K. R., Kalina, R. E., & Hendrickson, A. E. (1990). Human photoreceptor topography. *Journal of Comparative Neurology, 292*(4), 497–523. https://doi.org/10.1002/cne.902920402 – Zapfen/Stäbchen
- Fischer, B., & Ramsperger, E. (1984). Human express saccades: Extremely short reaction times of goal directed eye movements. *Experimental Brain Research, 57*(1), 191–195. https://doi.org/10.1007/BF00231145 – Sakkadenlatenz
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Photosensitivität
- Goodale, M. A., & Milner, A. D. (1992). Separate visual pathways for perception and action. *Trends in Neurosciences, 15*(1), 20–25. https://doi.org/10.1016/0166-2236(92)90344-8 – dorsal/ventral
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht
- Hutton, S. B., & Tegally, D. (2005). The effects of dividing attention on smooth pursuit eye tracking. *Experimental Brain Research, 163*(3), 306–313. https://doi.org/10.1007/s00221-004-2171-z – Doppelaufgabe
- Jewell, G., & McCourt, M. E. (2000). Pseudoneglect: A review and meta-analysis of performance factors in line bisection tasks. *Neuropsychologia, 38*(1), 93–110. https://doi.org/10.1016/S0028-3932(99)00045-7 – Seitenasymmetrie
- Kerzel, D., Souto, D., & Ziegler, N. E. (2008). Effects of attention shifts to stationary objects during steady-state smooth pursuit eye movements. *Vision Research, 48*(7), 958–969. https://doi.org/10.1016/j.visres.2008.01.015 – Randreize senken Folgegeschwindigkeit
- Khan, A. Z., Lefèvre, P., Heinen, S. J., & Blohm, G. (2010). The default allocation of attention is broadly ahead of smooth pursuit. *Journal of Vision, 10*(13), 7. https://doi.org/10.1167/10.13.7 – Aufmerksamkeit vor dem Ziel
- Lovejoy, L. P., Fowler, G. A., & Krauzlis, R. J. (2009). Spatial allocation of attention during smooth pursuit eye movements. *Vision Research, 49*(10), 1275–1285. https://doi.org/10.1016/j.visres.2009.01.011 – Aufmerksamkeitsfokus
- Munoz, D. P., & Everling, S. (2004). Look away: The anti-saccade task and the voluntary control of eye movement. *Nature Reviews Neuroscience, 5*(3), 218–228. https://doi.org/10.1038/nrn1345 – Blickunterdrückung (Übersicht, nur bibliografisch geprüft)
- Osaka, N. (1976). Visual reaction time as a function of target size and retinal eccentricity in the peripheral visual field. *Japanese Psychological Research, 18*(4), 183–190. https://doi.org/10.4992/psycholres1954.18.183 – RT und Exzentrizität
- Portello, J. K., Rosenfield, M., & Chu, C. A. (2013). Blink rate, incomplete blinks and computer vision syndrome. *Optometry and Vision Science, 90*(5), 482–487. https://doi.org/10.1097/OPX.0b013e31828f09a7 – Lidschlag
- Ringer, R. V., Throneburg, Z., Johnson, A. P., Kramer, A. F., & Loschky, L. C. (2016). Impairing the useful field of view in natural scenes: Tunnel vision versus general interference. *Journal of Vision, 16*(2), 7. https://doi.org/10.1167/16.2.7 – Tunnelblick
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer
- Strasburger, H., Rentschler, I., & Jüttner, M. (2011). Peripheral vision and pattern recognition: A review. *Journal of Vision, 11*(5), 13. https://doi.org/10.1167/11.5.13 – Gesichtsfeld
- Theeuwes, J., Kramer, A. F., Hahn, S., & Irwin, D. E. (1998). Our eyes do not always go where we want them to go: Capture of the eyes by new objects. *Psychological Science, 9*(5), 379–385. https://doi.org/10.1111/1467-9280.00071 – Blickfang (Abstract geprüft; Prozentangabe nicht geprüft)
- Vater, C., & Strasburger, H. (2021). Topical review: The top five peripheral vision tools in sport. *Optometry and Vision Science, 98*(7), 704–722. https://doi.org/10.1097/OPX.0000000000001732 – Peripherie-Training im Sport
- W3C. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2*, SC 2.3.1 Three Flashes or Below Threshold. https://www.w3.org/TR/WCAG22/ – Blitzgrenzen (Web, keine DOI)
