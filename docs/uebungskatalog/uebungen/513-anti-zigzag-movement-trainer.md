---
# ===== Kennung =====
nr: 513
kennung: anti-zigzag-movement-trainer
name: "Zickzack folgen – eine Marke an einem Ziel halten, das in geraden Stücken im Zickzack läuft"
name_original: "Aim Trainer – Zickzack-Tracking & Ausweichen (Seitentitel: Aim Trainer | Zickzack-Tracking; im Spiel: Anti-Zigzag Movement)"
kapitel: "Zielen (FPS)"
kapitel_original: "fps"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/fps/anti-zigzag-movement-trainer"
blickfit_umsetzung: {kennung: "zickzack-folgen", name: "Zickzack folgen", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/zickzack-folgen/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Ein Ziel läuft in geraden, schrägen Teilstücken im Zickzack über den Bildschirm und knickt in unregelmäßigen Abständen ab; die Knicke sind gerundet, das Ziel springt nie. Die Marke sitzt über dem Finger und soll im sichtbaren Band um das Ziel bleiben; nach jedem Knick muss sie wieder eingefangen werden. Mit steigender Stufe werden Knickwinkel (von etwa 40° auf etwa 110°) und Tempo größer, die Teilstücke kürzer und das Band enger; auf den ersten Stufen zeigt eine gestrichelte Linie ein Stück der Bahn voraus. Ausgewertet werden Zeit im Band und mittlerer Abstand zum Ziel."
ziel_funktionen: [kontinuierliche_steuerung, auge_hand_koordination, blickfolge]
eingabe: [maus]
tablet_geeignet: nein
dauer_sekunden: 45
schwierigkeit_anpassung: "Level = Punkte/1 400 + 1 (Start Level 1). Mit dem Level laufen Zielradius 16 → 9,5 px (min. 8,5), Tempo 350 → 910 px/s, Abstand der Bahnknicke 1,2 → 0,25 s (min. 0,2) und Lebensdauer des Ziels 4,2 → 1,8 s (min. 1,5) exponentiell auf Grenzwerte zu; eine hohe Combo verschärft zusätzlich (Radius und Lebensdauer −15 %, Tempo +20 %, Knickabstand −25 %). Real erreichbar ist Level ≈ 5–7 (eigene Simulation). Die Uhr verlängert sich um 0,4 s je Sekunde auf dem Ziel: 45 s nominal, bis ≈ 74 s real."
messgroessen: ["Punkte und Note (Wurzel aus Punkte/54 000)", "Präzision = Anteil der Bilder mit Fadenkreuz auf dem Ziel (%)", "zerstörte und entkommene Ziele, beste Combo (s), erreichtes Level", "sinnvoll ergänzend: Wiedereinfangzeit nach jedem Bahnknick, Erfassungszeit nach dem Neuerscheinen, mittlerer Abstand Fadenkreuz–Ziel"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 1
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 0
    blickfolge: 3
    sakkaden: 2
    fixation: 0
    bewegungswahrnehmung: 2
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 0
    inhibition: 1
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 1
    antizipation: 1
    entscheidung_wahlreaktion: 1
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 3
    zielbewegung_tempo: 2
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
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Maus (Touchpad nur eingeschränkt) mit relativer Bewegung und Pointer Lock; kein Tablet", "scharfes Sehen im Bildschirmabstand (Zwischenbereich ≈ 50–75 cm) über die ganze Bildfläche, auch oben und unten", "Englische Spieloberfläche und Ergebnisanzeige; Regeln auch deutsch auf der Seite, Spiel ohne Lesen bedienbar"]
vorsicht_bei: [tremor_parkinson, hand_arm_beschwerden, nystagmus, presbyopie_gleitsicht, trockenes_auge_bildschirm, kopfschmerz_asthenopie, migraene_lichtempfindlich, photosensitive_epilepsie, farbsehschwaeche, schwindel_vestibulaer]
geeignet_fuer: ["fortlaufendes Nachführen eines bewegten Ziels mit dem Finger üben (Auge-Hand-Abstimmung)", "nach einem Bahnknick schnell wieder ans Ziel kommen, ohne weit zu überschießen", "Blickfolge auf geraden Teilstücken mit wechselnder Richtung", "Selbstvergleich auf demselben Gerät (Zeit im Band, Abstand zum Ziel)"]
weniger_geeignet_fuer: ["Menschen mit Zittern, Hand- oder Handgelenkbeschwerden", "ruhiges, vorhersagbares Blickfolgetraining (die Bahn knickt unregelmäßig ab)", "Wunsch nach verlässlichen Norm- oder Leistungsvergleichen", "Erwartung eines Seh-, Sport- oder Alltagsnutzens"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Das Nachführen mit Auge und Hand verbessert sich mit Übung (Gauthier et al., 1988, v. a. bei Kindern), und die Leistung in Zielaufgaben am Bildschirm steigt mit Übung (Listman et al., 2021, Beobachtungsdaten); für diese Übung gibt es keine Studie. Ein Transfer von Zieltrainings auf Spiel oder Alltag ist nicht kontrolliert untersucht; Actionspiele selbst verbesserten Nachführaufgaben im Labor (Li et al., 2016)."
aehnliche_uebungen: [512, 505, 514, 515, 507, 405, 410, 415, 104, 304, 501, 707]
stichworte: ["Zickzack-Tracking", "manuelles Nachführen", "Richtungswechsel", "Bahnknick", "Ausweichbewegung", "Aufholsakkade", "Smooth Pursuit", "Auge-Hand-Koordination", "Aim Trainer", "Maus"]
---

# 513 · Zickzack folgen – eine Marke an einem Ziel halten, das in geraden Stücken im Zickzack läuft

> Original: „Aim Trainer – Zickzack-Tracking & Ausweichen“ (Spieltitel „Anti-Zigzag Movement“) – skilldrills.online, Kapitel Zielen (FPS) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

Ein Ziel läuft in geraden Teilstücken, die abwechselnd schräg nach oben und schräg nach unten zeigen, im Mittel quer über das Feld und an den Rändern zurück; in unregelmäßigen Abständen knickt die Bahn ab. Die Knicke sind gerundet und das Tempo sinkt dort kurz – Richtung und Tempo springen nie. Man legt den Finger irgendwo auf; die Marke sitzt etwa 6 Einheiten (6 % der kürzeren Bildschirmseite) über der Fingerspitze und folgt dem Finger in beiden Richtungen. Sie soll im sichtbaren Band um das Ziel bleiben und nach jedem Knick schnell wieder dorthin zurückkehren. Eine Sitzung hat fünf Durchgänge von je 11 s Fingerkontakt (davor eine kurze Einlaufzeit ohne Wertung); Abheben pausiert die Bahn. Ein Durchgang gilt als gelungen, wenn die Marke mindestens 60 % der Zeit im Band liegt; zwei gelungene Durchgänge in Folge steigern die Stufe, ein misslungener senkt sie. Mit der Stufe wachsen der Knickwinkel (von 40° auf rund 110°) und das Tempo (von 7 auf rund 15 Einheiten pro Sekunde), die Teilstücke werden kürzer (von 2,0 s auf 1,0 s), die Rundung am Knick kürzer (0,55 s → 0,33 s) und das Band enger; auf den Stufen 1–3 zeigt eine gestrichelte Linie ein Stück der Bahn (0,8 s) voraus. Ausgewertet werden die Zeit im Band und der mittlere Abstand zum Ziel (in Prozent der Bandbreite).

## 2. Ablauf im Original (Analyse)
Grundlage: Seitentext und ausgelieferter Spielcode (seitenspezifischer Chunk `28378-…js` mit den gemeinsamen Modulen für Schwierigkeitskurve, Combo, Note und Einstellungen; gelesen am 29.09.2026, nur Mechanik übernommen). Winkel sind **eigene Umrechnungen** (24″-Full-HD-Monitor im Vollbild, 60 cm Abstand ≈ 38 px/°).

- **Rahmen (Code):** Start-Karte → Countdown 3-2-1-GO (Start nach 2,45 s) → Spiel → Ergebnis. Canvas im 16:9-Container oder Vollbild; Verlassen von Vollbild oder Pointer Lock sowie Escape brechen ab. Das Fadenkreuz (Ring Ø 28 px ≈ 0,7°, Mittelpunkt Ø 4 px ≈ 6′) folgt der relativen Mausbewegung × Empfindlichkeit. Reine Touch-Geräte werden erkannt und nicht unterstützt. **Kein Klick.**
- **Zielbewegung (Code):** Das Ziel startet an **zufälliger Stelle** der ganzen Fläche. Die waagrechte Geschwindigkeit ist immer ± Tempo, die senkrechte ein Zufallswert bis ± 25 % des Tempos (beim Neuerscheinen bis ± 20 %) → gerade Stücke mit höchstens ≈ 14° Neigung, also überwiegend waagrecht. Bei jedem „Zickzack-Ereignis“ (alle Grundabstand × 0,8–1,2) werden **Richtung links/rechts zufällig (50 : 50)** und Neigung neu gewählt – nur etwa jedes zweite Ereignis ist eine echte Umkehr, sonst ändert sich nur die Neigung um bis zu ≈ 28°. Das Tempo springt sofort; es gibt **keine** Abbrems- oder Beschleunigungsphase. Am Rand (Radius + 15 px) prallt das Ziel ab. Eine Spur der letzten 8 Bildpositionen wird gezeichnet.
- **Werte auf Level 1 (Code):** Radius 16 px (Ø ≈ 0,84°); Trefferzone = Zielradius (anders als 512 ohne Zuschlag); Tempo 350 px/s (≈ 9,2°/s); Knick alle 0,96–1,44 s, echte Umkehr im Mittel ≈ alle 2,4 s plus Randabpraller; Lebensdauer 4,2 s.
- **Ziel „zerstören“ (Code):** Solange das Fadenkreuz auf dem Ziel liegt, sinkt dessen „Gesundheit“ um 65 %/s → **≈ 1,54 s Gesamtzeit auf dem Ziel** nötig (Auflegen darf unterbrochen werden). Dann +25 × Combo-Faktor Punkte und Neuerscheinen an zufälliger Stelle – im Mittel ≈ 800 px (≈ 21°) vom alten Ort (eigene Simulation). Dadurch entsteht etwa alle 1,5–2 s eine **schnelle Zielbewegung (Flick)** zum neuen Ziel.
- **Schwierigkeit (Code):** Level = Punkte/1 400 + 1; alle Parameter folgen der gemeinsamen Exponentialkurve der Vorlage (Grenzwerte siehe YAML; Level 15 ohne Combo: Radius 11,1 px, Tempo 776 px/s, Knickabstand 0,48 s, Lebensdauer 2,4 s). Eigene Simulation: Ein perfekter Lauf ohne Erfassungszeit nach dem Neuerscheinen erreicht ≈ 8 400 Punkte (Level ≈ 7), mit realistischen 0,3 s Erfassungszeit ≈ 5 700 Punkte (Level ≈ 5). Dort gilt mit hoher Combo: Radius ≈ 12–13 px (Ø ≈ 0,65–0,7°), Tempo ≈ 530–610 px/s (≈ 14–16°/s), Knick alle ≈ 0,6–1,0 s.
- **Punkte (Code):** Je 0,25 s **ununterbrochen** auf dem Ziel: round(10 × Combo-Faktor × (1 + 0,5 × (Level − 1)/14)) Punkte und +0,1 s Spielzeit (Uhr max. 60 s). Combo +1 je volle Sekunde ununterbrochen auf dem Ziel; Faktor 1,1 ab Combo 3 … 3,0 ab 50.
- **Fehler (Code):** (a) 1 s ununterbrochen neben dem Ziel oder (b) Lebensdauer abgelaufen („entkommen“, danach Neuerscheinen) → Combo → 0, Fehlerton, rote Partikel, Bildschirmwackeln (6 px, klingt ab) und **roter Radialblitz über dem Spielfeld** (Mitte 50 % Deckkraft, nach außen auslaufend, 0,45 s; Einstellung „Blitz“, standardmäßig an, abschaltbar). Die Zeitstrafe −0,6 s greift **nur** bei aktivierter Einstellung „Strafen“ – Standard: **aus**.
- **Zeitmessung (Code):** Bewegung und Uhr laufen mit echter Bildzeit (dt, gekappt bei 100 ms), also gleich schnell bei 60 und 144 Hz. Nur Partikel und die Spur hängen an der Bildzahl (Spur bei 60 Hz ≈ 133 ms lang, bei 144 Hz ≈ 56 ms – rein optisch). „Präzision“ = Bilder auf dem Ziel/alle Bilder. Note = √(Punkte/54 000): Selbst der perfekte Lauf ergibt ≈ 40 % → „D – Keep Going“; „S+“ bräuchte ≈ 48 700 Punkte (eigene Rechnung). Bestwerte bleiben im Browser.
- **Widersprüche Regeltext ↔ Code:** „+50 PKT“ → real 10 Punkte je 0,25 s (40/s auf Level 1 ohne Combo); „−0,6 s“ nur bei eingeschalteter Strafe; Combo-Verlust auch nach 1 s neben dem Ziel (nicht erwähnt); „Mittelkorridor/V-Crossover“ → es gibt **keine** Mittelachse, das Ziel wandert frei über die Fläche und erscheint zufällig neu; „Geschwindigkeit fällt am Umkehrpunkt auf null“ → Richtung und Tempo springen ohne Abbremsen; „Körperneigung lesen“ → nur eine Kugel ohne Vorzeichen.

## 3. Was die Website sagt – und wie das einzuordnen ist
Die Seite richtet sich an Spielende von Apex Legends, Warzone, Call of Duty Mobile, Overwatch 2 und The Finals und verspricht Kontrolle über Richtungswechsel, Overshoot und „Tracking-Uptime“ gegen Slide-Cancels und Zickzack-Ausweichen. Sie begründet das so: Folgebewegung sei „genau bis ~30°/s“ (Krauzlis, 2004), jede Umkehr koste eine Aufholsakkade von 100–130 ms (Rashbass, 1961). Als Technik empfiehlt sie „V-Crossover-Anchoring“ (Fadenkreuz in der Mitte der Ausweichbahn halten, Wendepunkte nicht jagen), lockeren Griff gegen „antagonistische Muskelblockaden“, Blick auf den Rumpf des Gegners und das Lesen von Körperneigung. Eine Tabelle nennt Latenzstufen (Erkennung 160–210 ms, Bremsung 85–135 ms, Re-Zentrierung 65–105 ms, gesamt 310–450 ms, „Elite“ 215–295 ms).

**Einordnung:**
- **Teilweise belegt:** Sakkaden reagieren auf Positions-, die Folgebewegung auf Geschwindigkeitsfehler (Rashbass, 1961; Inhalt über Sekundärquellen) – auch in zwei Dimensionen mit Richtungswechsel (Engel et al., 1999). Ob eine Aufholsakkade kommt, hängt von der vorhergesagten Zeit bis zum Wiedertreffen ab; sonst folgt sie nach ≈ 125 ms (de Brouwer et al., 2002). „100–130 ms“ passt also größenordnungsmäßig, belegt ist es durch de Brouwer, nicht nachweislich durch Rashbass.
- **Falsch zugeordnet:** „~30°/s“ steht nicht bei Krauzlis (2004); der Gain liegt unter 0,95 und sinkt mit dem Tempo (Collewijn & Tamminga, 1984), die individuelle Obergrenze reicht bis ≈ 100°/s (Meyer et al., 1985). Der Titel von Rashbass lautet „…smooth *tracking* eye movements“. Fitts (1954) beschreibt diskretes Zielen, das Steuerungsgesetz (Accot & Zhai, 1997) das Führen entlang eines **vorgegebenen** Pfads – beides sind keine Modelle für ein zufällig ausweichendes Ziel. Green & Bavelier (2003) enthält weder Tracking- noch Latenzdaten.
- **Tabelle ohne Datengrundlage:** Keine der Quellen enthält diese Stufen; „every figure … comes from the published work“ ist irreführend. Belegt ist: Die Hand lenkt ≈ 110 ms nach einem Positionssprung um (Brenner & Smeets, 1997) und passt ihre Beschleunigung ≈ 200 ms nach einer Geschwindigkeitsänderung an (Brenner et al., 1998); die Reaktionszeit auf Richtungswechsel sinkt mit der Größe der Änderung (Dzhafarov et al., 1993).
- **V-Crossover:** Als Strategie gegen echte, symmetrische Hin-und-her-Bewegung plausibel, weil manuelles Tracking intermittierend mit ≈ 170 ms Refraktärzeit arbeitet (Miall et al., 1993) – untersucht ist die Technik nicht. **In diesem Drill ist sie kaum anwendbar**: Das Ziel pendelt nicht um eine Mitte, sondern wandert frei und erscheint zufällig neu (Abschnitt 2).
- **Widersprochen:** „Death Grip → Überschießen“ – mehr Co-Kontraktion geht bei kleinen Zielen mit **höherer** Endpunktgenauigkeit einher und nimmt mit Übung ab (Gribble et al., 2003). „1:1-Hardwareübertragung ohne Mausglättung“ – die Vorlage fordert keine Rohdaten an (`unadjustedMovement` fehlt; MDN, o. J.). „Motorischen Kortex 30–50 ms früher vorbereiten“ – unbelegt. Sensitivität „28–42 cm/360°“ – unbelegt; das Optimum ist geräte- und aufgabenabhängig (Casiez et al., 2008).
- **Positiv:** Der Messhinweis (Bildintervalle, Unterschiede < 5 ms sind Rauschen, nur gleiche Hardware vergleichen) und der Sicherheitshinweis („kein Diagnoseinstrument; bei Schwindel, Kopfschmerz, Doppelbildern aufhören“) sind sinnvoll.

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Ziel und Marke sind weit größer als die Auflösungsgrenze des Auges; gefordert ist das Erkennen, ob die Marke noch im Band liegt → `sehschaerfe_detail` 1. Der Kontrast ist hoch. Als Faustwert: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°.
- **Blickfolge mit Richtungswechsel:** Bei niedrigen bis mittleren Tempi arbeitet die Folgebewegung gut, aber nie perfekt (Gain < 0,95, sinkt mit dem Tempo; Collewijn & Tamminga, 1984). Sie setzt erst nach ≈ 100 ms Bewegungsauswertung ein (Lisberger, 2010). Bei einem Richtungswechsel in 2D springt zuerst eine Sakkade leicht vor die Zielposition; danach dreht die Folgebewegung ihre Richtung **allmählich** statt abrupt (Engel et al., 1999) – bei Knicken hinkt das Auge also kurz nach → `blickfolge` 3, `sakkaden` 2. Unvorhersagbare Bewegung senkt den Gain gegenüber vorhersagbarer (Barnes et al., 1987).
- **Brille:** Das Ziel nutzt die **ganze Fläche**, auch den oberen und unteren Rand. Bei Universal-Gleitsichtgläsern liegt die schmale Zwischenzone unter der Blickmitte, seitlich und oben wird es unscharf → Kopf- statt Augenbewegung. Bildschirm-Gleitsichtgläser senkten die Kopfneigung am Monitor und verbesserten die Monitorsicht (Jaschinski et al., 2015); das Gerät etwas tiefer halten oder ein kleineres Fenster wählen.
- **Farbe:** Das Band ist sichtbar, und zum Farbwechsel kommt eine Form (Ring und Kreuz); die Rückmeldung hängt also nicht allein an der Farbe, was bei Rot-Grün-Schwäche (≈ 8 % der Männer; Birch, 2012) wichtig ist.
- **Alter und Augen:** Ältere (75–93 J.) haben bei allen Geschwindigkeiten einen geringeren Pursuit-Gain (Moschner & Baloh, 1994). Bildschirmarbeit senkt die Lidschlagrate deutlich (Patel et al., 1991); digitale Augenbelastung ist häufig (Sheppard & Wolffsohn, 2018). Stereosehen: 0.

## 5. Neurowissenschaftliche Grundlagen

Die Bewegungsinformation stammt vor allem aus den Arealen MT/MST; die Streuung der Folgebewegung lässt sich weitgehend auf das Rauschen der Bewegungsschätzung in MT zurückführen (Lisberger, 2010). Folgebewegung und Sakkaden teilen eine ähnliche Architektur mit frontalem Augenfeld, Basalganglien und Colliculus superior – eher „zwei Ergebnisse einer gemeinsamen Kaskade“ als zwei getrennte Systeme (Krauzlis, 2004). Dass die Übung bestimmte Hirnregionen „trainiert“ oder „konditioniert“, ist nicht belegt.

## 6. Motorische Grundlagen

- **Manuelles Tracking ist intermittierend:** Korrekturen kommen in Schüben mit ≈ 170 ms Refraktärzeit; kleine Fehler unter ≈ 0,8° werden oft toleriert (Miall et al., 1993).
- **Reaktionsbudget am Knick:** Die Hand reagiert erst nach ≈ 110–200 ms (Brenner & Smeets, 1997; Brenner et al., 1998). In dieser Zeit läuft die Marke in der alten Richtung weiter; der Abstand zum Ziel wächst um 2·sin(θ/2) · Tempo · Reaktionszeit (θ = Knickwinkel): auf Stufe 1 (40°, 7 Einheiten/s) um bis zu ≈ 0,5–1,0 Einheiten, auf Stufe 12 (≈ 110°, ≈ 15 Einheiten/s) um bis zu ≈ 2,8–5,0 Einheiten – bei ruhender Hand etwa die Hälfte, verglichen mit einem Bandradius von 5 bis 3,35 Einheiten (eigene Rechnung). Die fortgesetzte Bewegung muss dann abgebrochen werden (`inhibition` 1, wie 512 und 515). Kleine Richtungsänderungen werden langsamer bemerkt, weil die Reaktionszeit mit kleinerer Änderung steigt (Dzhafarov et al., 1993).
- **2D-Steuerung:** Beim Nachführen auf der Fläche werden Fehler auf Geschwindigkeit und Richtung bezogen, nicht getrennt in x und y geregelt (Engel & Soechting, 2000). Die senkrechte Komponente der Bahn ist klein.
- **Bandbreite:** Genaues Tracking mit der Maus gelingt bis ≈ 2 Hz; Alter und motorische Einschränkung senken das (Riviere & Thakor, 1996). Die Knickrate der Übung liegt mit etwa 0,5–1 Knick je Sekunde darunter; nur ein grober Vergleich, denn zufällige Knicke sind keine Sinusschwingung (eigene Einordnung).

## 7. Einflussfaktoren und Messgrenzen

- **Latenz:** Lokale Systemlatenz liegt in realen Systemen bei 23–243 ms und verschlechtert Tracking schon ab ≈ 41 ms (Ivkovic et al., 2015); die Verzögerung von Touchscreens kommt dazu (Deber et al., 2015). Bei 15 Einheiten/s bedeuten 50 ms zusätzliche Latenz ≈ 0,75 Einheiten Nachlauf, etwa ein Fünftel des Bandradius auf der engsten Stufe (eigene Rechnung). Werte verschiedener Geräte sind nicht vergleichbar.
- **Größen relativ zum Bildschirm:** Tempo, Band und Knickabstand sind in Einheiten der kürzeren Bildschirmseite festgelegt; Sehwinkel und Grad pro Sekunde hängen daher von Gerät und Abstand ab. In einem kleinen Fenster prallt das Ziel öfter am Rand ab.
- **Zufall:** Knickzeitpunkte und Richtung sind zufällig; zwei Läufe sind nicht gleich schwer. Gemessen werden die Zeit im Band (Prozent der Wertungszeit) und der mittlere Abstand zum Ziel, nur bei Fingerkontakt; eine Wiedereinfangzeit wird nicht gemessen. Einzelne Durchgänge streuen, wie jede Messung am Menschen; aussagekräftiger ist der Verlauf über mehrere Durchgänge und Tage (vgl. Mountford et al., 2004, zu Mehrfachmessung). Die Reproduzierbarkeit dieser Übung ist nicht untersucht.
- **Alter und Ermüdung:** Pursuit-Gain und Maus-Tracking werden im Alter schwächer (Moschner & Baloh, 1994; Riviere & Thakor, 1996). Wiederholtes Zielen mit der Maus (6 × 5 min) ermüdete die Handgelenkstrecker messbar, ohne Leistungsabfall (Forman et al., 2025); für das Nachführen mit dem Finger nicht untersucht.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** Die Auge-Hand-Koordination beim Nachführen reift bzw. verbessert sich mit Übung (Gauthier et al., 1988, v. a. bei Kindern gezeigt). In Daten einer Online-Zielaufgabe (N = 7.174) stiegen vor allem die Treffer pro Sekunde über Tage deutlich, die Trefferquote nur mäßig (Listman et al., 2021; Beobachtungsdaten, Anbieterfinanzierung). Für diese Übung gibt es keine Studie.
- **Naher Transfer – schwach:** Es gibt nur indirekte Hinweise: 5–10 h Actionspiel verbesserten bei Nicht-Spielenden das Nachführen im Labor (Li et al., 2016) – ein Spiel, keine einminütige Übung. Große Effekte digitalen Sehtrainings entstehen vor allem bei gerätegleichen Test- und Übungsaufgaben (Guo et al., 2025).
- **Alltagstransfer – fehlend:** Kein Beleg für Nutzen in Spiel, Sport, Verkehr oder Beruf; „Brain-Training“ zeigt viel Evidenz für die geübte, wenig für entfernte Aufgaben (Simons et al., 2016).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand fortlaufendes Nachführen mit wechselnder Richtung üben möchte; Ziel „Blickfolge plus Hand“ in kurzem Rahmen; keine Lese- oder Gedächtnisanforderung.
- **Weniger passend, wenn …** reines, gleichmäßiges Blickfolgetraining gewünscht ist (eher 105, 404, 514); nur waagrechte schnelle Umkehrungen geübt werden sollen (512); vergleichbare Messwerte gebraucht werden.
- **Vorsicht / anpassen bei …**
  - `tremor_parkinson`, `hand_arm_beschwerden`: pausenloses Nachkorrigieren (vgl. Forman et al., 2025, Mausaufgabe) → kurze Runden; bei Zittern oder Beschwerden lieber pausieren.
  - `nystagmus`: Die Aufgabe verlangt genau die Folgebewegung, die bei Nystagmus erschwert ist → eher nicht wählen.
  - `presbyopie_gleitsicht`: Das Ziel nutzt die ganze Fläche inklusive oberem Rand → Bildschirmbrille bzw. passende Zwischenkorrektur, Gerät tiefer halten, kleineres Fenster.
  - `migraene_lichtempfindlich`, `photosensitive_epilepsie`: Die Übung arbeitet ohne Blitze und ohne Wackeln; die Übergänge sind weich. Bei bekannter Lichtempfindlichkeit dennoch Vorsicht (Fisher et al., 2005).
  - `farbsehschwaeche`: Die Rückmeldung nutzt zusätzlich Ring und Kreuz; die Aufgabe bleibt lösbar.
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: pausenloses Verfolgen, wenig Lidschlag → Pausen zwischen den Runden.
  - `schwindel_vestibulaer`: Es gibt keinen Kameraschwenk und keine großflächige Bewegung; das im Zickzack laufende Ziel kann Empfindliche dennoch stören (Belastung Schwindel 1, wie 512, 514, 515) → kurze Runden, bei Beschwerden abbrechen. Wiederkehrender Schwindel, Doppelbilder, plötzliche Sehverschlechterung oder Kopfschmerz mit Sehverschlechterung sind ein Anlass für ärztliche Abklärung und kein Übungsthema (Muchnick, 2008, S. 6, 28).
  - Praxisangabe (keine Studie): Bei Blickfolgeübungen den Kopf ruhig halten, damit die Augenbewegung geübt wird und nicht eine Kopfbewegung; Beschwerden sind ein Grund, die Übung abzubrechen.
- **Kombiniert gut mit …** 514 und 105 (vorhersagbare Blickfolge), 515 (senkrechtes Nachführen), 405 (Zickzackbahn nur mit den Augen), 410 und 415 (reaktive Blickfolge ohne Gerät), 501 (Flicks), 707 (Pfad nachfahren), 104 (bewegtes Ziel).
- **Verwandte Übungen:** Am nächsten liegt 512 (gleicher Baukasten; dort läuft das Ziel nur waagrecht und springt zusätzlich im Tempo); 513 verwendet eine freie 2D-Bahn über die ganze Fläche mit selteneren Knicken. Außerhalb der Gruppe ist 505 (waagrechte Zufallsumkehr) eng verwandt. Nicht mehrere davon hintereinander vorschlagen; 513 ist die Wahl, wenn Richtungswechsel in der Fläche geübt werden sollen.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Tablet:** Original nicht bedienbar (Pointer Lock, nur Maus). Eine Touch-Fassung als **Finger-Nachführaufgabe** ist fachlich möglich (2D-Tracking mit dem Finger ist ein Laborparadigma; Engel & Soechting, 2000), braucht aber größere Ziele (in mm/Grad festgelegt), einen Ring um das Ziel gegen Verdeckung durch den Finger, deutlich niedrigeres Tempo und Einplanung von 50–200 ms Touch-Latenz (Deber et al., 2015). Das Neuerscheinen wird auf dem Tablet zum Tippen/Ziehen über große Strecken – eher sanft in der Nähe einblenden.
- **Mechanik:** „Zickzack“ ehrlich definieren (jeder Knick eine echte Umkehr oder Anteil angeben); wenn die Mitte-halten-Strategie geübt werden soll, echte Pendelbahn um eine Achse anbieten; wählbare Stufen statt Combo-Verschärfung.
- **Messung:** Wiedereinfangzeit nach Knicken, Erfassungszeit nach dem Neuerscheinen und mittleren Abstand getrennt erfassen; Präzision zeitgewichtet; feste Sitzungsdauer; realistische Notenskala; fester Zufallsstartwert für vergleichbare Läufe.
- **Regeltext:** Punkte (10 je 0,25 s), Zeitbonus, Combo-Verlust nach 1 s daneben und optionale Strafe korrekt angeben; keine Latenz-Tabelle, keine Transfer- oder Leistungsversprechen; Mausbeschleunigung erwähnen bzw. `unadjustedMovement` anbieten.
- **Barrierefreiheit/Sicherheit:** Rückmeldung zusätzlich über Form statt nur Rot/Grün; roten Radialblitz standardmäßig aus; Wackeln abschaltbar; Ziel für Gleitsichtträger auf die mittlere Bildhöhe begrenzbar; Pausenhinweis.

## 11. Quellen
### Von der Website angegeben
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise – Messhinweis (Hardwareverzögerung) ja; die Latenztabelle zu Zickzack-Umkehrungen stammt nicht daher (Woods misst einfache Reaktionszeit, 213–231 ms).
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI stimmt ✓; **stützt:** nein/teilweise – Netzwerk der Folgebewegung ja; ein Grenzwert „~30°/s“ steht dort nicht.
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise/nein – diskretes Zielen (passt allenfalls zum Flick nach dem Neuerscheinen), kein Modell für kontinuierliches Nachführen.
- Green, C. S., & Bavelier, D. (2003). Action video game modifies visual selective attention. *Nature, 423*(6939), 534–537. https://doi.org/10.1038/nature01647 – **Prüfung:** DOI stimmt ✓; **stützt:** nein – Aufmerksamkeitsstudie ohne Tracking- oder Latenzdaten.
- Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 – **Prüfung:** DOI stimmt ✓, **Titel falsch** („smooth pursuit“ statt „smooth tracking“); **stützt:** teilweise – Position → Sakkade, Geschwindigkeit → Folgebewegung (über Sekundärquellen); „jede Umkehr kostet 100–130 ms“ belegt eher de Brouwer et al. (2002).
- Accot, J., & Zhai, S. (1997). Beyond Fitts’ law: Models for trajectory-based HCI tasks. In *Proceedings of the ACM SIGCHI Conference on Human Factors in Computing Systems (CHI ’97)* (S. 295–302). ACM. https://doi.org/10.1145/258549.258760 – **Prüfung:** DOI stimmt ✓ (Titel auf der Website korrekt); **stützt:** teilweise – Steuerungsgesetz für das Führen entlang eines vorgegebenen Pfads/Tunnels (Inhalt über Sekundärquellen); ein zufällig ausweichendes Ziel ist kein vorgegebener Pfad.

### Weitere Fachliteratur
- Barnes, G. R., Donnelly, S. F., & Eason, R. D. (1987). Predictive velocity estimation in the pursuit reflex response to pseudo-random and step displacement stimuli in man. *The Journal of Physiology, 389*, 111–136. https://doi.org/10.1113/jphysiol.1987.sp016649 – Gain bei unvorhersagbarer Bewegung.
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Rot-Grün-Schwäche.
- Brenner, E., & Smeets, J. B. J. (1997). Fast responses of the human hand to changes in target position. *Journal of Motor Behavior, 29*(4), 297–310. https://doi.org/10.1080/00222899709600017 – Handkorrektur nach ≈ 110 ms.
- Brenner, E., Smeets, J. B. J., & de Lussanet, M. H. E. (1998). Hitting moving targets: Continuous control of the acceleration of the hand on the basis of the target’s velocity. *Experimental Brain Research, 122*(4), 467–474. https://doi.org/10.1007/s002210050535 – Reaktion auf Geschwindigkeitsänderung ≈ 200 ms.
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Pursuit-Gain.
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – Auslöser und Latenz von Aufholsakkaden.
- Deber, J., Jota, R., Forlines, C., & Wigdor, D. (2015). How much faster is fast enough? User perception of latency & latency improvements in direct and indirect touch. In *Proceedings of CHI ’15* (S. 1827–1836). ACM. https://doi.org/10.1145/2702123.2702300 – Touch-Latenz (Tablet-Variante).
- Dzhafarov, E. N., Sekuler, R., & Allik, J. (1993). Detection of changes in speed and direction of motion: Reaction time analysis. *Perception & Psychophysics, 54*(6), 733–750. https://doi.org/10.3758/BF03211798 – Reaktionszeit auf Richtungswechsel je nach Größe.
- Engel, K. C., Anderson, J. H., & Soechting, J. F. (1999). Oculomotor tracking in two dimensions. *Journal of Neurophysiology, 81*(4), 1597–1602. https://doi.org/10.1152/jn.1999.81.4.1597 – Richtungswechsel in 2D: Sakkade leicht vor das Ziel, Folgerichtung dreht allmählich (Crossref und PubMed-Abstract geprüft).
- Engel, K. C., & Soechting, J. F. (2000). Manual tracking in two dimensions. *Journal of Neurophysiology, 83*(6), 3483–3496. https://doi.org/10.1152/jn.2000.83.6.3483 – 2D-Handtracking, Finger-Paradigma.
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Lichtreize und Anfallsrisiko.
- Forman, G. N., Nikitin, S. A., Lang, C. J., Gabriel, D. A., Sonne, M. W., Kociolek, A. M., & Holmes, M. W. R. (2025). Impact of repetitive mouse aiming on muscle fatigue and fine motor performance of the distal upper limb. *Journal of Electromyography and Kinesiology, 82*, 102992. https://doi.org/10.1016/j.jelekin.2025.102992 – Ermüdung.
- Gauthier, G. M., Vercher, J.-L., Mussa Ivaldi, F., & Marchetti, E. (1988). Oculo-manual tracking of visual targets: Control learning, coordination control and coordination model. *Experimental Brain Research, 73*(1), 127–137. https://doi.org/10.1007/BF00279667 – Auge-Hand-Tracking, Lernen.
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – gerätegebundene Lerneffekte.
- Ivkovic, Z., Stavness, I., Gutwin, C., & Sutcliffe, S. (2015). Quantifying and mitigating the negative effects of local latencies on aiming in 3D shooter games. In *Proceedings of CHI ’15* (S. 135–144). ACM. https://doi.org/10.1145/2702123.2702432 – Systemlatenz und Tracking.
- Jaschinski, W., König, M., Mekontso, T. M., Ohlendorf, A., & Welscher, M. (2015). Comparison of progressive addition lenses for general purpose and for computer vision: An office field study. *Clinical and Experimental Optometry, 98*(3), 234–243. https://doi.org/10.1111/cxo.12259 – Bildschirm-Gleitsicht.
- Li, L., Chen, R., & Chen, J. (2016). Playing action video games improves visuomotor control. *Psychological Science, 27*(8), 1092–1108. https://doi.org/10.1177/0956797616650300 – Actionspiele und Nachführen.
- Lisberger, S. G. (2010). Visual guidance of smooth-pursuit eye movements: Sensation, action, and what happens in between. *Neuron, 66*(4), 477–491. https://doi.org/10.1016/j.neuron.2010.03.027 – Pursuit-Beginn, MT.
- Listman, J. B., Tsay, J. S., Kim, H. E., Mackey, W. E., & Heeger, D. J. (2021). Long-term motor learning in the “wild” with high volume video game data. *Frontiers in Human Neuroscience, 15*, 777779. https://doi.org/10.3389/fnhum.2021.777779 – Übungsverlauf in einer Klick-Zielaufgabe (Anbieterfinanzierung).
- Miall, R. C., Weir, D. J., & Stein, J. F. (1993). Intermittency in human manual tracking tasks. *Journal of Motor Behavior, 25*(1), 53–63. https://doi.org/10.1080/00222895.1993.9941639 – intermittierende Regelung.
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – Alter und Pursuit.
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm.
- Riviere, C. N., & Thakor, N. V. (1996). Effects of age and disability on tracking tasks with a computer mouse: Accuracy and linearity. *Journal of Rehabilitation Research and Development, 33*(1), 6–15. PMID 8868412 – Zeitschrift ohne DOI, PubMed geprüft; Maus-Tracking-Bandbreite.
- Sheppard, A. L., & Wolffsohn, J. S. (2018). Digital eye strain: Prevalence, measurement and amelioration. *BMJ Open Ophthalmology, 3*(1), e000146. https://doi.org/10.1136/bmjophth-2018-000146 – digitale Augenbelastung.
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do “brain-training” programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer allgemein.
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – Folgebewegung und Sakkaden: gemeinsames Netzwerk
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2. Aufl.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Wiederholbarkeit und Mehrfachmessung (Kap. 2, S. 17–18, 44)
