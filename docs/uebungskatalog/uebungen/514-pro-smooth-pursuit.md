---
# ===== Kennung =====
nr: 514
kennung: pro-smooth-pursuit
name: "Glatt folgen – ein Ziel auf einer weichen, langsamen Kurvenbahn gleichmäßig begleiten"
name_original: "Aim Trainer – Smooth-Tracking üben (Seitentitel: Aim Trainer | Smooth-Tracking üben; im Spiel: Lissajous Curve Smooth Pursuit)"
kapitel: "Zielen (FPS)"
kapitel_original: "fps"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/fps/pro-smooth-pursuit"
blickfit_umsetzung: {kennung: "glatt-folgen", name: "Glatt folgen", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/glatt-folgen/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Ein Ziel zieht ohne Ecken und ohne Sprünge ruhige Schleifen über den Bildschirm: Waagrecht schwingt es langsam, senkrecht gut doppelt so oft. Die Marke sitzt über dem Finger und soll im sichtbaren Band um das Ziel bleiben; hier zählt gleichmäßige Führung, nicht Schnelligkeit. Mit steigender Stufe werden das Tempo größer, das Band enger und die Bahn weniger vorhersehbar (ab Stufe 7 mischt sich eine kleine dritte Schwingung dazu); auf den unteren Stufen zeigt eine gestrichelte Linie ein Stück der Bahn voraus. Ausgewertet werden Zeit im Band und mittlerer Abstand zum Ziel."
ziel_funktionen: [kontinuierliche_steuerung, auge_hand_koordination, blickfolge]
eingabe: [maus]
tablet_geeignet: nein
dauer_sekunden: 45
schwierigkeit_anpassung: "Level = Punkte/1 400 + 1 (stufenlos, Start Level 1). Mit dem Level steigen Bahntempo und beide Schwingungsfrequenzen exponentiell auf Grenzwerte (Spitzentempo im Vollbild ≈ 4–5 °/s auf Level 1, ≈ 17–22 °/s auf Level 10, Grenzwert ≈ 38–51 °/s), der Zielradius sinkt von 15 auf 9,5 px (min. 8). Eine hohe Combo verschärft zusätzlich (Tempo bis +15 %, Frequenz bis +10 %, Radius bis −15 %). Die Uhr verlängert sich um 0,4 s je Sekunde auf dem Ziel: 45 s nominal, bis ≈ 75 s real."
messgroessen: ["Punkte und Note (Wurzel aus Punkte/54 000)", "Tracking-Präzision = Anteil der Bilder mit Fadenkreuz im Ziel (%)", "Zeit neben dem Ziel (s), beste Combo, erreichtes Level", "sinnvoll ergänzend: mittlerer Abstand Fadenkreuz–Ziel, Nachlauf (Lag) getrennt nach waagrecht/senkrecht, Verluste an Wendepunkten"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 1
    stereosehen: 0
    peripheres_sehen: 0
    nutzbares_sehfeld: 0
    blickfolge: 3
    sakkaden: 2
    fixation: 0
    bewegungswahrnehmung: 2
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 0
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 0
    inhibition: 0
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 0
    antizipation: 2
    entscheidung_wahlreaktion: 0
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 3
    zielbewegung_tempo: 1
    zielbewegung_praezision: 1
    kontinuierliche_steuerung: 3
    ruhige_hand: 1
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 1
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Maus (Touchpad nur eingeschränkt) mit relativer Bewegung und Pointer Lock; kein Tablet", "scharfes Sehen im Bildschirmabstand (Zwischenbereich ≈ 50–75 cm) über große Teile von Bildbreite und -höhe", "Englische Spieloberfläche; Regeln auch deutsch auf der Seite, Spiel ohne Lesen bedienbar"]
vorsicht_bei: [tremor_parkinson, hand_arm_beschwerden, nystagmus, presbyopie_gleitsicht, trockenes_auge_bildschirm, kopfschmerz_asthenopie, migraene_lichtempfindlich, photosensitive_epilepsie, farbsehschwaeche, schwindel_vestibulaer]
geeignet_fuer: ["fortlaufendes, gleichmäßiges Nachführen eines vorhersagbar bewegten Ziels mit dem Finger (Auge-Hand-Abstimmung)", "zweidimensionale Blickfolge mit weichen Wendepunkten, waagrecht und senkrecht gleichzeitig", "Tempo vorausschauend anpassen: an Wendepunkten abbremsen, in der Mitte beschleunigen", "Selbstvergleich auf demselben Gerät (Zeit im Band, Abstand zum Ziel)"]
weniger_geeignet_fuer: ["Menschen mit Zittern, Hand- oder Handgelenkbeschwerden", "reaktives Nachführen unvorhersagbarer Bewegungen (eher 512, 513)", "Wunsch nach verlässlichen Norm- oder Leistungsvergleichen", "Erwartung eines Seh-, Sport- oder Alltagsnutzens"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Vorhersagbare Bewegungen werden antizipiert, und das Nachführen mit Auge und Hand verbessert sich mit Übung (Kowler et al., 2019; Gauthier et al., 1988; Listman et al., 2021). Für diese Übung gibt es keine Studie; für nahen Transfer gibt es nur indirekte Hinweise (Actionspiele verbesserten Nachführaufgaben im Labor; Li et al., 2016). Ein Transfer von Zieltrainings auf Spiel oder Alltag ist nicht kontrolliert untersucht."
aehnliche_uebungen: [402, 403, 105, 104, 505, 507, 512, 513, 515, 304, 707]
stichworte: ["Smooth Tracking", "Smooth Pursuit", "Lissajous-Kurve", "glatte Augenfolgebewegung", "manuelles Nachführen", "2D-Tracking", "prädiktive Folgebewegung", "Auge-Hand-Koordination", "Aim Trainer", "Maus"]
---

# 514 · Glatt folgen – ein Ziel auf einer weichen, langsamen Kurvenbahn gleichmäßig begleiten

> Original: „Aim Trainer – Smooth-Tracking üben“ (Spieltitel „Lissajous Curve Smooth Pursuit“) – skilldrills.online, Kapitel Zielen (FPS) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

Ein Ziel zieht weiche, langsame Schleifen über den Bildschirm. Die Bahn entsteht aus zwei Sinusschwingungen (Lissajous-Figur): waagrecht langsam, senkrecht etwa 2,3- bis 2,8-mal so schnell; sie bleibt in einem Feld von höchstens ±28 × ±18 Einheiten (eine Einheit ist 1 % der kürzeren Bildschirmseite). Das Ziel läuft stetig aus dem Stand an, und das Tempo ist je Durchgang fest; es gibt keine Ecken und keine Richtungssprünge. Man legt den Finger irgendwo auf; die Marke sitzt etwa 6 Einheiten über der Fingerspitze und folgt dem Finger in beiden Richtungen. Sie soll im sichtbaren Band um das Ziel bleiben. Eine Sitzung hat fünf Durchgänge von je 11 s Fingerkontakt (davor eine kurze Einlaufzeit ohne Wertung); Abheben pausiert die Bahn. Ein Durchgang gilt als gelungen, wenn die Marke mindestens 60 % der Zeit im Band liegt; zwei gelungene Durchgänge in Folge steigern die Stufe, ein misslungener senkt sie. Mit der Stufe steigt das Spitzentempo von 5 auf 16 Einheiten pro Sekunde, das Band wird enger, und ab Stufe 7 mischt sich eine kleine dritte Schwingung dazu, die die Bahn weniger vorhersagbar macht; auf den unteren Stufen zeigt eine gestrichelte Linie die Bahn voraus (1,6 s auf Stufe 1, je Stufe 0,14 s weniger, auf den höchsten Stufen kaum noch). Ausgewertet werden die Zeit im Band und der mittlere Abstand zum Ziel (in Prozent der Bandbreite).

## 2. Ablauf im Original (Analyse)
Grundlage sind der Seitentext und der ausgelieferte Spielcode (Chunk `45824-…js` mit der Spiellogik und den gemeinsamen Modulen für Schwierigkeitskurve, Combo und Note; gelesen am 29.09.2026, übernommen wurden nur Mechanik und Parameter). Die Winkel sind **eigene Umrechnungen** (24″-Full-HD-Monitor im Vollbild, 60 cm Abstand ≈ 38 px/°). Im kleineren 16:9-Container sind Bahnweite und Tempo proportional kleiner.

- **Rahmen (Code):** Start-Karte → Countdown 3-2-1-GO (Start nach 2,45 s) → Spiel → Ergebnis. Wer Pointer Lock oder Vollbild verlässt oder ESC drückt, bricht ab. Das Fadenkreuz folgt der relativen Mausbewegung × Empfindlichkeit (0,1–3, Standard 1). Es besteht aus einem Ring mit Radius 14 px (Ø 28 px ≈ 0,74°) und einem Mittelpunkt mit Ø 4 px. Reine Touch-Geräte werden erkannt und nicht unterstützt. Es gibt keinen Klick.
- **Bahn (Code):** x = Mitte + sin(Phase · f_x) · 0,35 · Breite, y = Mitte + cos(Phase · f_y) · 0,30 · Höhe. Die Phase wächst mit Bildzeit × Tempofaktor. Im Vollbild ist die Bahn damit ±672 px (≈ ±17,7°) breit und ±324 px (≈ ±8,5°) hoch. Beide Achsen sind reine Sinusbewegungen: langsam an den Wendepunkten, schnell in der Mitte. Das Frequenzverhältnis liegt nicht bei einer ganzen Zahl (2,33 → 2,78). Die Figur schließt sich daher nie genau, jede Achse für sich ist aber vorhersagbar.
- **Tempo je Level (Code, eigene Rechnung, ohne Combo):**

  | Level | Frequenz waagrecht / senkrecht | Spitzentempo waagrecht / senkrecht | Zielradius |
  |---|---|---|---|
  | 1 | 0,04 / 0,09 Hz | ≈ 4,2 / 4,8 °/s | 15 px (Ø ≈ 0,79°) |
  | 5 | 0,08 / 0,19 Hz | ≈ 8,4 / 10,2 °/s | 13,9 px |
  | 10 | 0,16 / 0,42 Hz | ≈ 17 / 22 °/s | 12,2 px |
  | 15 | 0,24 / 0,66 Hz | ≈ 27 / 36 °/s | 10,8 px |
  | Grenzwert | 0,34 / 0,95 Hz | ≈ 38 / 51 °/s | 9,5 px |

  Die volle Combo (Faktor 3) hebt das Tempo auf bis zu ≈ 48 / 64 °/s (senkrecht 1,2 Hz) und senkt den Radius auf ≈ 8 px (Ø ≈ 0,42°).
- **Treffer (Code):** Ein Treffer liegt vor, wenn die Fadenkreuzmitte höchstens einen Zielradius vom Kugelmittelpunkt entfernt ist. Es gibt keinen Zuschlag. Der Fadenkreuzring (Ø 28 px) ist fast so groß wie die Kugel (Ø 30 → 16 px) und überdeckt deren Rand.
- **Punkte (Code):** Je 0,25 s ununterbrochen im Ziel gibt es round(50 × Combo-Faktor × (1 + 0,5 × (Level − 1)/14)) Punkte (Start: 200 Punkte/s) und +0,1 s Spielzeit. Das ergibt +0,4 s/s; die Restzeit ist auf höchstens 60 s begrenzt. Die Combo steigt um 1 je volle Sekunde im Ziel. Kurzes Abrutschen setzt nur die Zähler für die laufende Sekunde und die 0,25 s zurück. Der Faktor beträgt 1,1 ab Combo 3 … 3,0 ab 50.
- **Fehler (Code):** Nach 1 s ununterbrochen neben dem Ziel fällt die Combo auf 0. Nur wenn vorher eine Combo bestand, kommen Fehlerton, rote Partikel, Bildschirmwackeln (6 px) und ein **roter Radialblitz über dem Spielfeld** (Mitte 50 % Deckkraft, nach außen auslaufend, 0,45 s). Nach der Analyse des gleichen Moduls in 512 ist der Blitz standardmäßig an und abschaltbar. Die Zeitstrafe −0,6 s greift nur bei eingeschalteter „Strafe“ (Standard: aus).
- **Zeitmessung (Code):** Bahn und Uhr laufen mit echter Bildzeit (dt, gekappt bei 100 ms), also bei 60 und 144 Hz gleich schnell. Nur die Partikel bewegen sich pro Bild. „Präzision“ ist der Anteil der Bilder im Ziel an allen Bildern. Bei Bildeinbrüchen ist dieser Wert nicht zeitgewichtet. Die Note ist √(Punkte/54 000); „S+“ verlangt ≥ 95 %, also ≈ 48 700 Punkte.
- **Eigene Simulation** (60 Hz, Vollbild, vereinfachtes Trefferschema): 100 % im Ziel ergeben ≈ 75 s, ≈ 55 000 Punkte, Level ≈ 40 und „S+“. 75 % im Ziel ergeben ≈ 60 s, ≈ 14 300 Punkte, Level ≈ 11 und Note ≈ 52 % („C“). 50 % ergeben ≈ 6 600 Punkte, Level ≈ 6 und ≈ 35 % („D“).
- **Programmierfehler: Das Ziel springt (Code, eigene Simulation):** Die Frequenzen werden in jedem Bild aus dem aktuellen Level und der Combo neu berechnet. Sie werden dann mit der **gesamten bisher aufgelaufenen Phase** multipliziert, statt nur den nächsten Schritt zu verändern. Jede Punktevergabe (Level +0,04–0,1) und jede Combo-Schwelle versetzt die Kugel daher schlagartig. Bei 75–100 % Trefferanteil springt sie ab ≈ 20–25 s bei fast jeder Punktevergabe, im Median um ≈ 53–80 px (≈ 1,4–2,1°) und oft um > 100 px (≈ 2,6°). Bei 50 % sind es im Median ≈ 32 px, bei 25 % kaum Sprünge. Gerade wer gut folgt, bekommt also eine sprunghafte statt einer glatten Bahn.
- **Widersprüche Regeltext ↔ Code:** „flüssige Kurvenbahnen“ stimmt nicht, weil das Ziel bei guter Leistung springt (s. o.). „Combo-Reset (−0,6 s)“ gilt nur bei eingeschalteter Strafe. „45 s“ sind real 45–75 s. „Lissajous macht Auswendiglernen unmöglich“ stimmt nur halb, weil jede Achse ein reiner Sinus ist. „+50 PTS“ stimmt; die Vergabe erfolgt je 0,25 s.

## 3. Was die Website sagt – und wie das einzuordnen ist
Die Seite richtet sich an Tracking-Spielende (Apex Legends, Overwatch 2, The Finals, Warzone). Sie verspricht „zitterfreie Strahlpräzision“, „ruhige Augenführung“ und hohe „Schadens-Uptime“. Die Begründung: MST, FEF und MT würden Geschwindigkeiten vorausberechnen (Krauzlis, 2004), Sakkaden und Folgebewegung seien „anatomisch wie funktional getrennt“ (Rashbass, 1961), und abrupte Sakkaden „lähmten“ die Verarbeitung für 20–50 ms. Sie empfiehlt, den Blick „2–5 Pixel vor die Zielkante“ zu richten (Land & McLeod, 2000), mit 30–40 % Griffkraft aus dem Ellbogen zu führen und höchstens 30 min am Stück zu üben. Dazu zeigt sie eine Stufentabelle („Apex Beam“ 85–95 % Verweildauer … „Basis“ < 42 %).

**Einordnung:**
- **Belegt:** Die Folgebewegung wird von Geschwindigkeitsfehlern getrieben, Sakkaden von Positionsfehlern (Rashbass, 1961; Inhalt über Sekundärquellen). Vorhersagbare Bewegungen werden antizipiert, auch vor Wendepunkten (Kowler et al., 2019). Der Tipp „vor der Kurve abbremsen“ passt dazu. Beim Nachführen mit der Hand bleibt der Blick am Ziel; der Pursuit-Gain steigt und Aufholsakkaden werden seltener (Danion & Flanagan, 2018).
- **Widersprochen:** „Getrennte Systeme“: Krauzlis (2004) beschreibt Folgebewegung und Sakkaden als zwei Ergebnisse einer gemeinsamen Kaskade, Orban de Xivry und Lefèvre (2007) als zwei Ergebnisse eines einzigen sensomotorischen Prozesses. Die Website zitiert damit eine Quelle, die ihrer eigenen Aussage widerspricht.
- **Falsch zugeordnet:** „Genau bis ~30°/s“ steht nicht bei Krauzlis (2004). Richtig ist: Der Gain bleibt unter 0,95 und sinkt mit dem Tempo (Collewijn & Tamminga, 1984); die individuelle Obergrenze reicht bis ≈ 100°/s (Meyer et al., 1985). Die „Lähmung für 20–50 ms“ stammt nicht von Rashbass. Die sakkadische Suppression beginnt ≈ 50 ms vor der Sakkade, endet ≈ 50 ms danach und betrifft vor allem grobe Helligkeitsmuster (Diamond et al., 2000). Die Arbeit von Land und McLeod (2000) handelt von Cricket-Schlagmännern, die eine prädiktive Sakkade zum Aufsprungpunkt machen. Von Fadenkreuzen und Pixeln steht dort nichts. Die Website gibt zudem die falsche DOI an (Abschnitt 11). Der Titel von Rashbass lautet „…smooth *tracking* eye movements“.
- **Unbelegt:** 30–40 % Griffkraft, „Ellbogen statt Handgelenk“ und „Sehnenermüdung ab 30 min“. Belegt ist nur, dass wiederholtes Maus-Zielen die Handgelenkstrecker messbar ermüdet, ohne dass die Leistung sinkt (Forman et al., 2025). Die Aussage „locker = ruhiger“ ist fraglich: Mehr Co-Kontraktion ging bei kleinen Zielen mit **höherer** Genauigkeit einher (Gribble et al., 2003). Green und Bavelier (2003) enthält keine Tracking-Daten.
- **Stufentabelle ohne Datengrundlage:** Keine der Quellen enthält Verweildauer-Stufen. Die Aussage „every figure … comes from the published work“ ist irreführend. Die Stufen hängen zudem von Level, Fenstergröße und Latenz ab.
- **Technik:** Die Aussage „1:1-Hardware-Koordinaten“ ist nicht gedeckt, weil die Vorlage keine Rohdaten anfordert (`unadjustedMovement` fehlt; MDN, o. J.). „144–360 Hz ohne Bewegungsunschärfe (Woods)“ steht nicht bei Woods. Höhere Bildraten verringern die Unschärfe, beseitigen sie aber nicht (eigene Einschätzung). Sinnvoll sind der Messhinweis „nur auf demselben Setup vergleichen“ und der Hinweis, bei Schwindel, Kopfschmerz oder Doppelbildern aufzuhören.

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Ziel und Marke sind weit größer als die Auflösungsgrenze des Auges; gefordert ist das Erkennen, ob die Marke noch im Band liegt → `sehschaerfe_detail` 1. Der Kontrast ist hoch. Als Faustwert: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°; das Tempo in Grad pro Sekunde hängt von Gerät und Abstand ab.
- **Blickfolge:** Bei niedrigen Tempi liegt die Folgebewegung im günstigen Bereich; mit steigendem Tempo bleibt der Gain spürbar unter 1 (Collewijn & Tamminga, 1984). Aufholsakkaden werden häufiger; ob eine kommt, hängt von der vorhergesagten Zeit bis zum Wiedertreffen ab (de Brouwer et al., 2002) → `blickfolge` 3, `sakkaden` 2.
- **Vorhersagbarkeit:** Sinusbahnen werden antizipiert, sodass der Nachlauf mit Übung sinkt (Kowler et al., 2019). Erst Summen mehrerer nicht harmonischer Sinusanteile machen die Bewegung unvorhersagbar. Dann sinkt der Gain von 0,92 (0,39 Hz) auf 0,53 (1,56 Hz) (Barnes et al., 1987). Die Lissajous-Bahn liegt dazwischen: Jede Achse ist vorhersagbar, die Überlagerung weniger, ab Stufe 7 mit der dritten Schwingung noch weniger → `antizipation` 2.
- **Senkrecht ist schwerer:** Die senkrechte Komponente ist hier die schnellere. Die vertikale Folgebewegung ist schwächer als die horizontale, auch bei diagonalen und kreisförmigen Bahnen (Rottach et al., 1996). Aufwärts folgt das Auge schlechter als abwärts (Ke et al., 2013). Ein strukturierter Hintergrund senkt den vertikalen Gain um ≈ 20 % (Collewijn & Tamminga, 1984); hier ist der Hintergrund ruhig.
- **Brille:** Die Bahn nutzt einen großen Teil von Breite und Höhe. Bei Universal-Gleitsichtgläsern wechselt der Blick dabei ständig zwischen Fern-, Zwischen- und Nahzone. Im unteren Bildteil schaut man durch den Nahteil, im oberen durch den Fernteil, seitlich wird es unscharf. Die Folge ist eher Kopf- als Augenbewegung, und die Aufgabe ändert sich. Bildschirm-Gleitsichtgläser verringerten die Kopfneigung am Monitor und verbesserten die Monitorsicht (Jaschinski et al., 2015). Hilfreich sind auch ein kleineres Fenster oder der Arbeitsplatzabstand der Brille.
- **Farbe:** Das Band ist sichtbar, und zum Farbwechsel kommt eine Form (Ring und Kreuz); die Rückmeldung hängt also nicht allein an der Farbe, was bei Rot-Grün-Schwäche (≈ 8 % der Männer; Birch, 2012) wichtig ist.
- **Alter und Augen:** Ältere (75–93 J.) haben bei allen Geschwindigkeiten einen geringeren Pursuit-Gain (Moschner & Baloh, 1994). Pausenloses Folgen senkt die Lidschlagrate (Patel et al., 1991). Stereosehen: 0.
- **Klinischer Hintergrund:** Die Augenfolgebewegung wird in der Untersuchung qualitativ geprüft, indem die Augen einem nahen Ziel folgen, das in einem H-Muster geführt wird (Hirnnerven III, IV und VI; Muchnick, 2008, S. 32–35). Die Übung ersetzt keine Untersuchung und misst den Blick nicht.

## 5. Neurowissenschaftliche Grundlagen

Die Bewegungsinformation stammt vor allem aus den Arealen MT/MST. Die Streuung der Folgebewegung geht weitgehend auf das Rauschen der Bewegungsschätzung in MT zurück (Lisberger, 2010). Frontales Augenfeld, Basalganglien und Colliculus superior steuern Folgebewegung und Sakkaden gemeinsam (Krauzlis, 2004; Orban de Xivry & Lefèvre, 2007). Bei sinusförmiger Bewegung veränderte Magnetstimulation des frontalen Folgeareals die Augengeschwindigkeit kurz vor dem Richtungswechsel und in der Zyklusmitte, die des supplementären Augenfelds nur am Richtungswechsel (Gagnon et al., 2006; einzelne TMS-Laborstudie). Das passt zur Vorhersage an Wendepunkten, die diese Übung verlangt. Prädiktives Folgen beruht auf Erwartungen aus der bisherigen Bewegung (Kowler et al., 2019). Dass das Kleinhirn „die Harmonik lernt“ und die Übung bestimmte Hirnregionen „trainiert“, ist für diese Aufgabe nicht belegt.

## 6. Motorische Grundlagen

- **2D-Tracking:** Die Hand regelt x und y nicht getrennt; die Fehlersignale betreffen vor allem Geschwindigkeit und Richtung (Engel & Soechting, 2000). Bei elliptischen Bahnen mit Perioden von 9,65–1,61 s verkürzte die Vorhersagbarkeit den Nachlauf deutlich. Gut gelang das Folgen nur bei „natürlichem“ Bewegungsgesetz aus harmonischen Schwingungen (Viviani & Mounoud, 1990). Die Lissajous-Bahn besteht aus harmonischen Schwingungen, die Übertragung ist aber eine eigene Folgerung.
- **Intermittierende Regelung:** Korrekturen kommen in Schüben; bei langsamen Bahnen werden Fehler unter ≈ 0,8° oft toleriert, bei schnelleren passt die Verteilung zu ≈ 170 ms Pause zwischen den Korrekturen (Miall et al., 1993; Joystick-Aufgabe). Man muss also fein nachregeln, wenn das Band enger ist als diese Totzone (eigene Folgerung).
- **Bandbreite:** Mit der Maus gelingt genaues Tracking bis ≈ 2 Hz; Alter und motorische Einschränkung senken diesen Wert (Riviere & Thakor, 1996). Die Schwingungsfrequenzen der Übung liegen weit darunter (eigene Rechnung: waagrechte Perioden von rund 25 s bei Stufe 12 bis rund 1 min bei Stufe 1, senkrecht gut doppelt so schnell); begrenzend sind eher die Spitzengeschwindigkeit in der Bahnmitte und das Halten des Bands.
- **Wendepunkte:** Dort ist die Geschwindigkeit fast null, das verlangt kurzes ruhiges Halten (`ruhige_hand` 1). In der Mitte folgt die höchste Geschwindigkeit (`zielbewegung_tempo` 1 für das Wiedereinfangen).

## 7. Einflussfaktoren und Messgrenzen

- **Latenz:** Die lokale Systemlatenz liegt in realen Systemen bei 23–243 ms und verschlechtert Tracking schon ab ≈ 41 ms (Ivkovic et al., 2015); die Verzögerung von Touchscreens kommt dazu (Deber et al., 2015). Bei 16 Einheiten/s bedeuten 50 ms Latenz ≈ 0,8 Einheiten Nachlauf, etwa ein Viertel des Bandradius auf der engsten Stufe (eigene Rechnung). Vorhersage kann das teilweise ausgleichen. Werte verschiedener Geräte sind nicht vergleichbar.
- **Größen relativ zum Bildschirm:** Bahnweite, Tempo und Band sind in Einheiten der kürzeren Bildschirmseite festgelegt; Sehwinkel und Grad pro Sekunde hängen daher von Gerät und Abstand ab.
- **Messgrößen:** Gemessen werden die Zeit im Band (Prozent der Wertungszeit) und der mittlere Abstand zum Ziel (Prozent der Bandbreite), nur bei Fingerkontakt; eine Auswertung nach Achse oder Wendepunkt fehlt. Einzelne Durchgänge streuen, wie jede Messung am Menschen; aussagekräftiger ist der Verlauf über mehrere Durchgänge und Tage (vgl. Mountford et al., 2004, zu Mehrfachmessung). Die Reproduzierbarkeit dieser Übung ist nicht untersucht.
- **Alter und Ermüdung:** Pursuit-Gain und Maus-Tracking werden im Alter schwächer (Moschner & Baloh, 1994; Riviere & Thakor, 1996). Bei wiederholtem Zielen mit der Maus ermüden die Handgelenkstrecker messbar (Forman et al., 2025); für das Nachführen mit dem Finger nicht untersucht.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** Vorhersagbare Bahnen werden mit Wiederholung besser antizipiert (Kowler et al., 2019), und das Nachführen mit Auge und Hand verbessert sich mit Übung (Gauthier et al., 1988). In Daten einer Online-Zielaufgabe stiegen die Leistungen über Tage (Listman et al., 2021; Beobachtungsdaten, vom Anbieter finanziert). Für diese Übung gibt es keine Studie. Weil die Bahn je Achse periodisch ist, dürfte ein Teil des Zugewinns aufgabenspezifisch sein (eigene Einschätzung).
- **Naher Transfer – schwach:** Es gibt nur indirekte Hinweise: 5–10 h Actionspiel verbesserten bei Nicht-Spielenden das Spurhalten und Nachführen im Labor (Li et al., 2016). Das war ein Spiel, keine einminütige Übung. Große Effekte entstehen vor allem, wenn Übung und Test am selben Gerät ähnlich sind (Guo et al., 2025).
- **Alltagstransfer – fehlend:** Für Spiel, Sport, Verkehr oder Beruf gibt es keinen Beleg. „Brain-Training“ zeigt viel Evidenz für die geübte Aufgabe und wenig für entfernte Aufgaben (Simons et al., 2016).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand gleichmäßiges, vorhersagbares Nachführen in zwei Richtungen üben möchte. Das Ziel ist „Blickfolge plus Hand“ mit weichen Wendepunkten, ohne Lese- oder Gedächtnisanforderung. Niedrige Stufen sind langsam und eignen sich als Einstieg; am eigenen Arbeitspunkt beginnen und in kleinen Schritten steigern (Praxisangabe, nicht belegt – die Stufe passt sich an).
- **Weniger passend, wenn …** reaktives Folgen bei plötzlichen Wechseln gewünscht ist (512, 513). Ebenso bei reiner Augenfolge ohne Hand (402, 403, 105), bei rein vertikalem Tracking (515) und wenn vergleichbare Messwerte gebraucht werden.
- **Vorsicht / anpassen bei …**
  - `tremor_parkinson`, `hand_arm_beschwerden`: Die Übung verlangt fortlaufendes Feinregeln aus Handgelenk und Unterarm. Besser kurze Runden und niedrige Stufen; bei Zittern oder Beschwerden pausieren.
  - `nystagmus`: Die Aufgabe verlangt genau die Folgebewegung → eher nicht wählen.
  - `presbyopie_gleitsicht`: Die Bahn läuft über viel Höhe und Breite. Hilfreich sind Bildschirmbrille bzw. passende Zwischenkorrektur, ein kleineres Fenster und ein tiefer gehaltenes Gerät.
  - `migraene_lichtempfindlich`, `photosensitive_epilepsie`: Die Übung arbeitet ohne Blitze und ohne Wackeln; die Übergänge sind weich. Bei bekannter Lichtempfindlichkeit dennoch Vorsicht.
  - `farbsehschwaeche`: Die Rückmeldung nutzt zusätzlich Ring und Kreuz; die Aufgabe bleibt lösbar.
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: pausenloses Folgen mit wenig Lidschlag → Pausen zwischen den Runden.
  - `schwindel_vestibulaer`: Es gibt keinen Kameraschwenk und keine großflächige Bewegung; die großen Schleifen können Empfindliche dennoch stören (Belastung Schwindel 1, wie 512, 513, 515) → niedrige Stufen, kurze Runden, bei Beschwerden abbrechen. Wiederkehrender Schwindel, Doppelbilder, plötzliche Sehverschlechterung oder Kopfschmerz mit Sehverschlechterung sind ein Anlass für ärztliche Abklärung und kein Übungsthema (Muchnick, 2008, S. 6, 28).
  - Praxisangabe (keine Studie): Bei Blickfolgeübungen den Kopf ruhig halten, damit die Augenbewegung geübt wird und nicht eine Kopfbewegung.
- **Kombiniert gut mit …** 402 und 403 (Acht- und Sinusbahn nur mit den Augen), 105 (Blickfolge mit Detail-Erkennung; Blickfit „Scharf in Bewegung“), 515 (senkrechte Folge), 512 und 513 (reaktives Tracking), 707 (Pfad nachfahren), 104 (bewegtes Ziel abfangen; Blickfit „Zielfang“).
- **Überschneidungen:** In der Gruppe 509–515 keine Dublette: 514 ist die einzige vorhersagbare, periodische Bahn (512 und 513 reagieren auf zufällige Wechsel, 515 auf beschleunigte, überwiegend senkrechte Bahnen mit Ausweichbewegungen). Am nächsten verwandt ist 507 (glatte, aber zufällig gekrümmte Bahnstücke) – 514 ist periodisch und damit stärker antizipierbar. Nicht 514 und 507 hintereinander vorschlagen, wenn nur „glattes Nachführen“ gefragt ist.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Sprungfehler beheben:** Die Phase je Achse muss fortlaufend weitergezählt werden (Phase += 2π · f · dt). Dann bleibt die Bahn auch bei Tempoänderungen stetig. Tempo und Frequenz sollten sich nur langsam ändern, nicht an Combo-Schwellen.
- **Tablet:** Das Original ist auf dem Tablet nicht bedienbar (Pointer Lock, nur Maus). Eine Touch-Fassung als **Finger-Nachführaufgabe** ist fachlich sinnvoll, denn 2D-Tracking mit dem Finger ist ein etabliertes Laborparadigma (Engel & Soechting, 2000). Dafür braucht sie ein größeres Ziel (in Grad festgelegt) und einen Ring, damit der Finger das Ziel nicht verdeckt. Die Touch-Latenz kommerzieller Geräte von 50–200 ms ist einzuplanen (Deber et al., 2015, mit Verweis auf frühere Messungen); das Tempo muss deutlich niedriger sein. Alternativ geht eine reine Blickfolge-Variante mit Erkennungsaufgabe wie in Blickfit „Scharf in Bewegung“.
- **Messung:** Sinnvoll sind mittlerer Abstand, Nachlauf je Achse und Verluste an Wendepunkten sowie eine zeitgewichtete Präzision. Dazu eine feste Sitzungsdauer ohne Zeitbonus, wählbare Stufen statt Combo-Verschärfung und eine realistische Notenskala.
- **Vorhersagbarkeit wählbar:** Stufen von reinem Sinus (vorhersagbar) bis zur Summe mehrerer nicht harmonischer Anteile (unvorhersagbar; Barnes et al., 1987) machen ehrlich sichtbar, was geübt wird.
- **Regeltext:** Keine Stufentabelle, keine Transfer- oder Leistungsversprechen; optionale Strafe und Zeitbonus korrekt angeben; Mausbeschleunigung erwähnen.
- **Barrierefreiheit/Sicherheit:** Rückmeldung zusätzlich über Form statt nur Rot/Grün. Der Fadenkreuzring sollte kleiner als das Ziel sein. Den roten Radialblitz standardmäßig aus, das Wackeln abschaltbar machen und einen Pausenhinweis geben. Die Bahnhöhe sollte für Gleitsichtträger:innen begrenzbar sein.

## 11. Quellen
### Von der Website angegeben
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** nein/teilweise – Die Uptime-Stufen und „ohne Bewegungsunschärfe“ stehen dort nicht. Nur der allgemeine Hinweis auf Hardwareverzögerungen passt (Woods misst einfache Reaktionszeit).
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise – Das ausgedehnte Netzwerk mit frontalem Augenfeld stimmt. Ein Grenzwert „~30°/s“ steht dort nicht. Der Review widerspricht der Aussage „getrennte Systeme“ auf derselben Seite.
- Green, C. S., & Bavelier, D. (2003). Action video game modifies visual selective attention. *Nature, 423*(6939), 534–537. https://doi.org/10.1038/nature01647 – **Prüfung:** DOI stimmt ✓; **stützt:** nein – eine Aufmerksamkeitsstudie ohne Tracking-Daten.
- Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 – **Prüfung:** DOI stimmt ✓, **Titel falsch** („smooth pursuit“ statt „smooth tracking“); **stützt:** teilweise – Position → Sakkade und Geschwindigkeit → Folgebewegung stimmen (über Sekundärquellen). „Anatomisch getrennt“ und „20–50 ms Lähmung“ stehen nicht dort.
- Land, M. F., & McLeod, P. (2000). From eye movements to actions: How batsmen hit the ball. *Nature Neuroscience, 3*(12), 1340–1345. Website: doi.org/10.1038/81861 – **Prüfung:** **DOI falsch** (404), richtig https://doi.org/10.1038/81887; **stützt:** nein – Die Studie handelt von prädiktiven Sakkaden beim Cricket. Sie enthält keine Aussage zu Fadenkreuzen, Werkzeugfixation oder „2–5 Pixeln“.

### Weitere Fachliteratur
- Barnes, G. R., Donnelly, S. F., & Eason, R. D. (1987). Predictive velocity estimation in the pursuit reflex response to pseudo-random and step displacement stimuli in man. *The Journal of Physiology, 389*, 111–136. https://doi.org/10.1113/jphysiol.1987.sp016649 – Gain bei unvorhersagbaren Bahnen.
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Rot-Grün-Schwäche.
- Brenner, E., & Smeets, J. B. J. (1997). Fast responses of the human hand to changes in target position. *Journal of Motor Behavior, 29*(4), 297–310. https://doi.org/10.1080/00222899709600017 – Handkorrektur nach ≈ 110 ms.
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Pursuit-Gain, Einfluss des Hintergrunds.
- Danion, F. R., & Flanagan, J. R. (2018). Different gaze strategies during eye versus hand tracking of a moving target. *Scientific Reports, 8*, 10059. https://doi.org/10.1038/s41598-018-28434-6 – Blick beim Hand-Tracking.
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – Aufholsakkaden.
- Deber, J., Jota, R., Forlines, C., & Wigdor, D. (2015). How much faster is fast enough? User perception of latency & latency improvements in direct and indirect touch. In *Proceedings of CHI ’15* (S. 1827–1836). ACM. https://doi.org/10.1145/2702123.2702300 – Touch-Latenz.
- Engel, K. C., & Soechting, J. F. (2000). Manual tracking in two dimensions. *Journal of Neurophysiology, 83*(6), 3483–3496. https://doi.org/10.1152/jn.2000.83.6.3483 – 2D-Tracking, Finger-Paradigma.
- Forman, G. N., Nikitin, S. A., Lang, C. J., Gabriel, D. A., Sonne, M. W., Kociolek, A. M., & Holmes, M. W. R. (2025). Impact of repetitive mouse aiming on muscle fatigue and fine motor performance of the distal upper limb. *Journal of Electromyography and Kinesiology, 82*, 102992. https://doi.org/10.1016/j.jelekin.2025.102992 – Ermüdung.
- Gagnon, D., Paus, T., Grosbras, M.-H., Pike, G. B., & O’Driscoll, G. A. (2006). Transcranial magnetic stimulation of frontal oculomotor regions during smooth pursuit. *The Journal of Neuroscience, 26*(2), 458–466. https://doi.org/10.1523/JNEUROSCI.2789-05.2006 – frontale Areale an Wendepunkten sinusförmiger Folge.
- Gauthier, G. M., Vercher, J.-L., Mussa Ivaldi, F., & Marchetti, E. (1988). Oculo-manual tracking of visual targets: Control learning, coordination control and coordination model. *Experimental Brain Research, 73*(1), 127–137. https://doi.org/10.1007/BF00279667 – Auge-Hand-Tracking, Lernen.
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – gerätegebundene Lerneffekte.
- Ivkovic, Z., Stavness, I., Gutwin, C., & Sutcliffe, S. (2015). Quantifying and mitigating the negative effects of local latencies on aiming in 3D shooter games. In *Proceedings of CHI ’15* (S. 135–144). ACM. https://doi.org/10.1145/2702123.2702432 – Systemlatenz und Tracking.
- Jaschinski, W., König, M., Mekontso, T. M., Ohlendorf, A., & Welscher, M. (2015). Comparison of progressive addition lenses for general purpose and for computer vision: An office field study. *Clinical and Experimental Optometry, 98*(3), 234–243. https://doi.org/10.1111/cxo.12259 – Bildschirm-Gleitsicht.
- Ke, S. R., Lam, J., Pai, D. K., & Spering, M. (2013). Directional asymmetries in human smooth pursuit eye movements. *Investigative Ophthalmology & Visual Science, 54*(6), 4409–4421. https://doi.org/10.1167/iovs.12-11369 – aufwärts schwächer als abwärts.
- Kowler, E., Rubinstein, J. F., Santos, E. M., & Wang, J. (2019). Predictive smooth pursuit eye movements. *Annual Review of Vision Science, 5*, 223–246. https://doi.org/10.1146/annurev-vision-091718-014901 – prädiktive Folgebewegung.
- Li, L., Chen, R., & Chen, J. (2016). Playing action video games improves visuomotor control. *Psychological Science, 27*(8), 1092–1108. https://doi.org/10.1177/0956797616650300 – Actionspiele und Nachführen.
- Lisberger, S. G. (2010). Visual guidance of smooth-pursuit eye movements: Sensation, action, and what happens in between. *Neuron, 66*(4), 477–491. https://doi.org/10.1016/j.neuron.2010.03.027 – MT und Streuung der Folgebewegung.
- Listman, J. B., Tsay, J. S., Kim, H. E., Mackey, W. E., & Heeger, D. J. (2021). Long-term motor learning in the “wild” with high volume video game data. *Frontiers in Human Neuroscience, 15*, 777779. https://doi.org/10.3389/fnhum.2021.777779 – Übungsverlauf in einer Klick-Zielaufgabe (Anbieterfinanzierung).
- Miall, R. C., Weir, D. J., & Stein, J. F. (1993). Intermittency in human manual tracking tasks. *Journal of Motor Behavior, 25*(1), 53–63. https://doi.org/10.1080/00222895.1993.9941639 – intermittierende Regelung.
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – Alter und Pursuit.
- Orban de Xivry, J.-J., & Lefèvre, P. (2007). Saccades and pursuit: Two outcomes of a single sensorimotor process. *The Journal of Physiology, 584*(1), 11–23. https://doi.org/10.1113/jphysiol.2007.139881 – Sakkaden und Folgebewegung arbeiten zusammen (Crossref und PubMed-Abstract geprüft).
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm.
- Riviere, C. N., & Thakor, N. V. (1996). Effects of age and disability on tracking tasks with a computer mouse: Accuracy and linearity. *Journal of Rehabilitation Research and Development, 33*(1), 6–15. PMID 8868412 – Zeitschrift ohne DOI, PubMed geprüft; Maus-Tracking-Bandbreite.
- Rottach, K. G., Zivotofsky, A. Z., Das, V. E., Averbuch-Heller, L., Discenna, A. O., Poonyathalang, A., & Leigh, R. J. (1996). Comparison of horizontal, vertical and diagonal smooth pursuit eye movements in normal human subjects. *Vision Research, 36*(14), 2189–2195. https://doi.org/10.1016/0042-6989(95)00302-9 – horizontal besser als vertikal, auch auf Kreisbahnen.
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do “brain-training” programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer allgemein.
- Viviani, P., & Mounoud, P. (1990). Perceptuomotor compatibility in pursuit tracking of two-dimensional movements. *Journal of Motor Behavior, 22*(3), 407–443. https://doi.org/10.1080/00222895.1990.10735521 – Hand-Tracking vorhersagbarer elliptischer Bahnen (Crossref und PubMed-Abstract geprüft).
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – Folgebewegung und Sakkaden: gemeinsames Netzwerk
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2. Aufl.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Prüfung der Augenfolgebewegung im H-Muster (S. 32–35), Warnzeichen mit Abklärungsbedarf (S. 6, 28)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Wiederholbarkeit und Mehrfachmessung (Kap. 2, S. 17–18, 44)
