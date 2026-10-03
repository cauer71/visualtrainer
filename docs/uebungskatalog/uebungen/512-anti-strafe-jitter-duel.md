---
# ===== Kennung =====
nr: 512
kennung: anti-strafe-jitter-duel
name: "Ausweich folgen – eine Marke waagrecht an einem Ziel halten, das Richtung und Tempo wechselt"
name_original: "Aim Trainer – Reaktives Tracking & ADAD (Seitentitel: Aim Trainer | Reaktives Tracking & Strafe; im Spiel: Anti-Strafe Jitter Duel)"
kapitel: "Zielen (FPS)"
kapitel_original: "fps"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/fps/anti-strafe-jitter-duel"
blickfit_umsetzung: {kennung: "ausweich-folgen", name: "Ausweich folgen", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/ausweich-folgen/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Ein Ziel gleitet waagrecht auf einer Schiene hin und her und wechselt in unregelmäßigen Abständen weich Richtung und Tempo, als würde es ausweichen; der Ablauf steht aber vorab fest und hängt nicht von der Marke ab. Die Marke sitzt über dem Finger und folgt nur seiner waagrechten Position; sie soll im sichtbaren Band um das Ziel bleiben und nach jedem Wechsel schnell wieder dort ankommen. Mit steigender Stufe werden Tempo und Wechselhäufigkeit größer und das Band enger. Ausgewertet werden Zeit im Band und mittlerer Abstand zum Ziel."
ziel_funktionen: [kontinuierliche_steuerung, auge_hand_koordination, blickfolge]
eingabe: [maus]
tablet_geeignet: nein
dauer_sekunden: 45
schwierigkeit_anpassung: "Level = Punkte/1 400 + 1 (Start Level 1). Mit dem Level laufen Zielradius 16 → 9,5 px (min. 8,5), Grundtempo 280 → 700 px/s und Wechselabstand 450 → 150 ms (min. 120) exponentiell auf Grenzwerte zu; eine hohe Combo verschärft zusätzlich (Radius −15 %, Tempo +20 %, Abstand −25 %). Real erreichbar ist nur Level ≈ 6 (eigene Simulation). Die Uhr verlängert sich um 0,4 s je Sekunde auf dem Ziel: 45 s nominal, bis ≈ 75 s real."
messgroessen: ["Punkte und Note (Wurzel aus Punkte/54 000)", "Präzision = Anteil der Bilder mit Fadenkreuz auf dem Ziel (%)", "Zeit neben dem Ziel (s), beste Combo (s), erreichtes Level", "sinnvoll ergänzend: Wiedereinfangzeit nach jedem Richtungswechsel, mittlerer Abstand Fadenkreuz–Ziel, Verzögerung (Lag) der Hand"]

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
  zeitdruck: 2
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Maus (Touchpad nur eingeschränkt) mit relativer Bewegung und Pointer Lock; kein Tablet", "scharfes Sehen im Bildschirmabstand (Zwischenbereich ≈ 50–75 cm) über die ganze Bildbreite", "Englische Spieloberfläche; Regeln auch deutsch auf der Seite, Spiel ohne Lesen bedienbar"]
vorsicht_bei: [tremor_parkinson, hand_arm_beschwerden, nystagmus, presbyopie_gleitsicht, trockenes_auge_bildschirm, kopfschmerz_asthenopie, migraene_lichtempfindlich, photosensitive_epilepsie, farbsehschwaeche, schwindel_vestibulaer]
geeignet_fuer: ["fortlaufendes Nachführen eines bewegten Ziels mit dem Finger üben (Auge-Hand-Abstimmung)", "Umgang mit plötzlichen Richtungs- und Tempowechseln: schnell wieder ans Ziel kommen, ohne weit zu überschießen", "horizontale Blickfolge mit Aufholsakkaden in einer kurzen Aufgabe ohne Tippen", "Selbstvergleich auf demselben Gerät (Zeit im Band, Abstand zum Ziel)"]
weniger_geeignet_fuer: ["Menschen mit Zittern, Hand- oder Handgelenkbeschwerden", "ruhiges, vorhersagbares Blickfolgetraining (die Bewegung wechselt absichtlich)", "Wunsch nach verlässlichen Norm- oder Leistungsvergleichen", "Erwartung eines Seh-, Sport- oder Alltagsnutzens"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Das Nachführen mit Auge und Hand verbessert sich mit Übung (Gauthier et al., 1988, v. a. bei Kindern), und die Leistung in Zielaufgaben am Bildschirm steigt mit Übung (Listman et al., 2021, Beobachtungsdaten); für diese Übung gibt es keine Studie. Ein Transfer von Zieltrainings auf Spiel oder Alltag ist nicht kontrolliert untersucht; Actionspiele selbst verbesserten Nachführaufgaben im Labor (Li et al., 2016)."
aehnliche_uebungen: [505, 513, 514, 515, 507, 104, 105, 304, 410, 415, 707]
stichworte: ["reaktives Tracking", "manuelles Nachführen", "Richtungswechsel", "Strafe", "ADAD", "Aufholsakkade", "Smooth Pursuit", "Auge-Hand-Koordination", "Aim Trainer", "Maus"]
---

# 512 · Reaktives Nachführen – Fadenkreuz auf einem Ziel halten, das sprunghaft links/rechts wechselt

> Original: „Aim Trainer – Reaktives Tracking & ADAD“ (Spieltitel „Anti-Strafe Jitter Duel“) – skilldrills.online, Kapitel Zielen (FPS) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

Ein Ziel gleitet waagrecht auf einer Schiene über das Feld und wechselt in unregelmäßigen Abständen Richtung und Tempo – ohne Vorwarnung, aber mit weichem Übergang. Es „weicht“ nur scheinbar aus: Der Ablauf wird vorab gewürfelt und hängt nicht von der Marke ab. Man legt den Finger irgendwo auf die Fläche; die Marke sitzt etwa 6 Einheiten (6 % der kürzeren Bildschirmseite) über der Fingerspitze und folgt nur der waagrechten Fingerposition. Sie soll im sichtbaren Band um das Ziel bleiben und nach jedem Wechsel schnell dorthin zurückkehren. Eine Sitzung hat fünf Durchgänge von je 11 s Fingerkontakt (davor eine kurze Einlaufzeit ohne Wertung); Abheben pausiert die Bahn. Ein Durchgang gilt als gelungen, wenn die Marke mindestens 60 % der Zeit im Band liegt; zwei gelungene Durchgänge in Folge steigern die Stufe, ein misslungener senkt sie. Mit der Stufe steigen das Grundtempo (von 7 auf rund 17 Einheiten pro Sekunde, schnelle Abschnitte bis ×1,35) und die Wechselhäufigkeit (mittlerer Abstand von 2,6 s auf 1,2 s), die Übergänge werden etwas schneller (0,55 s → 0,33 s) und das Band wird enger. Ausgewertet werden die Zeit im Band und der mittlere Abstand zum Ziel (in Prozent der Bandbreite).

## 2. Ablauf im Original (Analyse)
Grundlage: Seitentext und ausgelieferter Spielcode (seitenspezifischer Chunk `13022-…js` mit den gemeinsamen Modulen für Schwierigkeitskurve, Combo, Note und Einstellungen; gelesen am 29.09.2026, nur Mechanik übernommen). Winkel sind **eigene Umrechnungen** (24″-Full-HD-Monitor im Vollbild, 60 cm Abstand ≈ 38 px/°).

- **Rahmen (Code):** Start-Karte → Countdown 3-2-1-GO (Start nach 2,45 s) → Spiel → Ergebnis. Canvas im 16:9-Container oder Vollbild; Verlassen von Vollbild oder Pointer Lock bricht ab. Das Fadenkreuz (Ring Ø 28 px ≈ 0,7°, Punkt Ø 4 px ≈ 6′) folgt der relativen Mausbewegung × Empfindlichkeit. Reine Touch-Geräte werden erkannt und nicht unterstützt. **Kein Klick** – bewertet wird nur die Lage.
- **Zielbewegung (Code):** Die Kugel bewegt sich **nur waagrecht** auf halber Bildhöhe (senkrechte Geschwindigkeit 0) und prallt 20 px vor dem Rand ab. Bei jedem „Strafe-Ereignis“ wird die Richtung **zufällig neu gewählt (50 : 50)** – nur etwa jedes zweite Ereignis ist also eine echte Umkehr – und das Tempo auf 0,9 × (70 %) oder 1,6 × (30 %) des Grundtempos gesetzt. Der nächste Wechsel folgt nach Grundabstand × 0,6–1,4. Tempo springt sofort, es gibt keine Brems- oder Beschleunigungsphase.
- **Werte auf Level 1 (Code):** Radius 16 px (Ø ≈ 0,84°), Trefferzone Radius + 6 px (Ø 44 px ≈ 1,16°); Tempo 252 bzw. 448 px/s (≈ 6,6 bzw. 11,8°/s); Wechsel alle 270–630 ms, echte Umkehr im Mittel ≈ alle 0,9 s.
- **Schwierigkeit (Code):** Level = Punkte/1 400 + 1; alle Parameter folgen der gemeinsamen Exponentialkurve der Vorlage (Grenzwerte siehe YAML; Level 15: Radius 11,1 px, Tempo 600 px/s, Abstand 222 ms). Die Combo verschärft zusätzlich. Ein fehlerfreier Lauf erreicht laut eigener Simulation nur ≈ 7 600 Punkte und Level ≈ 6,4; dort gilt mit voller Combo: Radius 12 px (Ø ≈ 0,63°), Trefferzone Ø ≈ 32 px (≈ 0,84°), Tempo 433/770 px/s (≈ 11/20°/s), Wechsel alle 164–382 ms (echte Umkehr im Mittel ≈ alle 0,55 s ≈ 0,9 Hz).
- **Punkte (Code):** Je 0,25 s **ununterbrochen** in der Trefferzone: round(10 × Combo-Faktor × (1 + 0,5 × (Level − 1)/14)) Punkte und +0,1 s Spielzeit (= +0,4 s/s, Uhr max. 60 s). Die Combo steigt um 1 je volle Sekunde auf dem Ziel; kurzes Abrutschen setzt nur den Sekunden- und den 0,25-s-Zähler zurück, nicht die Combo. Faktor 1,1 ab Combo 3 … 3,0 ab 50.
- **Fehler (Code):** Nach 1 s ununterbrochen neben dem Ziel: Combo → 0, Fehlerton, rote Partikel, Bildschirmwackeln (6 px, klingt bildweise ab) und ein **roter Radialblitz über den ganzen Spielbereich** (Mitte 50 % Deckkraft, nach außen auslaufend, 0,45 s; Standard an, abschaltbar). Ton, Partikel, Wackeln und Blitz kommen nur, wenn eine Combo > 0 verloren geht; weitere Sekunden daneben lösen danach nichts mehr aus (außer der optionalen Zeitstrafe). Da eine neue Combo mindestens 1 s auf dem Ziel braucht, folgt ein Blitz höchstens etwa alle 2 s (eigene Folgerung aus dem Code). Die Zeitstrafe −0,6 s greift **nur**, wenn die Einstellung „Strafen“ aktiv ist – Standard: **aus**.
- **Zeitmessung (Code):** Bewegung und Uhr laufen mit echter Bildzeit (dt, gekappt bei 100 ms), also gleich schnell bei 60 und 144 Hz. „Präzision“ = Bilder auf dem Ziel/alle Bilder – bei Bildeinbrüchen nicht zeitgewichtet. Note = √(Punkte/54 000): Selbst der fehlerfreie Lauf ergibt ≈ 37 % → „D – Keep Going“; „S+“ bräuchte ≈ 48 700 Punkte und ist praktisch unerreichbar (eigene Rechnung). Bestwerte bleiben im Browser.
- **Widersprüche Regeltext ↔ Code:** „+50 PKT“ → real 10 Punkte je 0,25 s (Level 1 ohne Combo: 40/s); „−0,6 s“ nur bei eingeschalteter Strafe; „45 s“ → real 45 s (nie auf dem Ziel) bis ≈ 75 s (immer auf dem Ziel), mit Strafe ab ≈ 28 s; „unberechenbare ADAD-Umkehr“ → nur jedes zweite Ereignis kehrt um; „Hüfte, Torso, Fußstellung lesen“ → es gibt nur eine Kugel ohne Vorzeichen.

## 3. Was die Website sagt – und wie das einzuordnen ist
Die Seite richtet sich an Spielende von Apex Legends, Overwatch 2, Warzone, The Finals und TF2 und verspricht „Anti-Strafe-Reaktion“, „Jitter-Korrekturtempo“, „Tracking-Uptime“ und Kontrolle der Griffspannung. Sie erklärt reaktives Tracking über retinalen Schlupf (Bild wandert aus der Fovea), nennt „Smooth Pursuit genau bis ~30°/s“ und Aufholsakkaden nach 100–130 ms (Rashbass, 1961; Krauzlis, 2004), empfiehlt lockeren Griff, Blick aufs Ziel statt aufs Fadenkreuz und „fließende Brems-Beschleunigungs-Zyklen“ und zeigt eine Latenztabelle (Erkennung 160–210 ms, Umkehrimpuls 80–130 ms, Mikro-Zentrierung 60–100 ms, gesamt 300–440 ms, „Elite“ 210–290 ms).

**Einordnung:**
- **Belegt:** Sakkaden reagieren auf Positions-, die Folgebewegung auf Geschwindigkeitsfehler (Rashbass, 1961; Inhalt über Sekundärquellen). Ob nach einem Wechsel eine Aufholsakkade kommt, hängt von der vorhergesagten Zeit bis zum Wiedertreffen ab; liegt sie nicht bei 40–180 ms, folgt nach ≈ 125 ms eine Sakkade (de Brouwer et al., 2002). Die Größenordnung „100–130 ms“ passt also – belegt ist sie durch de Brouwer, nicht nachweislich durch Rashbass.
- **Falsch zugeordnet:** „~30°/s“ steht nicht bei Krauzlis (2004). Richtig ist: Der Gain (Augen- durch Zielgeschwindigkeit) bleibt unter 0,95 und sinkt mit dem Tempo (Collewijn & Tamminga, 1984); die individuelle Obergrenze reicht bis ≈ 100°/s (Meyer et al., 1985). Der Titel von Rashbass lautet „…smooth *tracking* eye movements“. Green & Bavelier (2003) enthält weder Tracking- noch Latenzdaten.
- **Tabelle ohne Datengrundlage:** Keine der Quellen enthält diese Stufen; die Aussage „every figure … comes from the published work“ ist irreführend. Belegt sind: Die Hand lenkt ≈ 110 ms nach einem Positionssprung um (Brenner & Smeets, 1997) und passt ihre Beschleunigung ≈ 200 ms nach einer Geschwindigkeitsänderung an (Brenner et al., 1998). Die Reaktionszeit auf Tempo-/Richtungswechsel sinkt mit der Größe der Änderung (Dzhafarov et al., 1993) – eine feste Zahl gibt es nicht.
- **Nicht belegt bzw. fraglich:** „Co-Kontraktion/Death Grip → Zittern und Überschießen“ – beim Zeigen auf kleine Ziele ging mehr Co-Kontraktion mit **höherer** Endpunktgenauigkeit einher und nahm mit Übung ab (Gribble et al., 2003) – das spricht eher gegen die pauschale Aussage; für schnelles Tracking mit Umkehrungen fehlen Daten. „1:1-Hardwareübertragung ohne Mausbeschleunigung“ – die Vorlage fordert keine Rohdaten an (`unadjustedMovement` fehlt; MDN, o. J.). „1000 Hz eliminiert Eingabe-Jitter“ – das Abfrageintervall sinkt auf 1 ms, andere Latenzen dominieren (eigene Rechnung).
- **Teilweise:** „Blick aufs Ziel“ – beim Nachführen mit der Hand bleibt der Blick am Ziel, der Pursuit-Gain steigt und Aufholsakkaden werden seltener (Danion & Flanagan, 2018); eine Aufmerksamkeitsanweisung „aufs Ziel achten“ brachte in Aim Lab aber keinen Vorteil (Lamers James & O’Connor, 2023). „30–50 ms Vorsprung durch Hüftvektoren“ ist unbelegt und im Drill nicht anwendbar.
- **Positiv:** Der Messhinweis (Bildintervalle 16,7/6,9/4,1 ms; Unterschiede < 5 ms sind Rauschen; nur gleiche Hardware vergleichen) und der Hinweis „kein Diagnoseinstrument, bei Schwindel, Kopfschmerz oder Doppelbildern aufhören“ sind sinnvoll.

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Ziel und Marke sind weit größer als die Auflösungsgrenze des Auges; gefordert ist das Erkennen, ob die Marke noch im Band liegt → `sehschaerfe_detail` 1. Der Kontrast ist hoch. Als Faustwert: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°.
- **Blickfolge und Aufholsakkaden:** Bei niedrigen bis mittleren Tempi arbeitet die Folgebewegung gut, aber nie perfekt (Gain < 0,95, sinkt mit dem Tempo; Collewijn & Tamminga, 1984). Sie setzt erst nach ≈ 100 ms Bewegungsauswertung ein (Lisberger, 2010) – nach jeder Umkehr hinkt das Auge also nach und holt per Aufholsakkade auf (de Brouwer et al., 2002) → `blickfolge` 3, `sakkaden` 2. Ein strukturierter Hintergrund senkt den horizontalen Gain um ≈ 10 % (Collewijn & Tamminga, 1984); hier ist der Hintergrund ruhig. Nur waagrechte Bewegung – vertikale Folge wird nicht geübt. Die Umkehr ist bei hohem Kontrast leicht zu erkennen (die Reaktionszeit sinkt mit der Größe der Änderung; Dzhafarov et al., 1993); leistungsbegrenzend ist eher die Reaktions- und Korrekturschleife → `bewegungswahrnehmung` 2 (eigene Einschätzung).
- **Auge und Hand gemeinsam:** Führt die eigene Hand mit, sinkt die Verzögerung des Auges gegenüber dem Ziel deutlich (150 → 30 ms) und die maximale Folgegeschwindigkeit steigt um etwa 100 % (Gauthier et al., 1988). Die Marke ist hier allerdings nur über dem Finger versetzt dargestellt.
- **Brille:** Das Ziel läuft auf mittlerer Bildhöhe über die **ganze Breite**. Bei Universal-Gleitsichtgläsern liegt die schmale Zwischenzone unter der Blickmitte, seitlich wird es unscharf → Kopfschwenken statt Augenfolge. Bildschirm-Gleitsichtgläser senkten die Kopfneigung am Monitor im Mittel um 2,3° und wurden für die Monitorsicht besser bewertet (Jaschinski et al., 2015; N = 23); das Gerät etwas tiefer halten oder ein kleineres Fenster wählen.
- **Farbe:** Das Band ist sichtbar, und zum Farbwechsel kommt eine Form (Ring und Kreuz); die Rückmeldung hängt also nicht allein an der Farbe, was bei Rot-Grün-Schwäche (≈ 8 % der Männer; Birch, 2012) wichtig ist.
- **Alter und Augen:** Ältere (75–93 J.) haben bei allen Geschwindigkeiten einen geringeren Pursuit-Gain (Moschner & Baloh, 1994). Bei Bildschirmarbeit sank die Lidschlagrate im Mittel etwa auf ein Fünftel (Patel et al., 1991; für diese Übung nicht gemessen); digitale Augenbelastung ist häufig (Sheppard & Wolffsohn, 2018). Stereosehen: 0.

## 5. Neurowissenschaftliche Grundlagen

Die Bewegungsinformation stammt vor allem aus den Arealen MT/MST; die Streuung der Folgebewegung lässt sich weitgehend auf das Rauschen der Bewegungsschätzung in MT zurückführen (Lisberger, 2010). Folgebewegung und Sakkaden teilen eine ähnliche Architektur mit frontalem Augenfeld, Basalganglien und Colliculus superior – eher „zwei Ergebnisse einer gemeinsamen Kaskade“ als zwei getrennte Systeme (Krauzlis, 2004). Bei *vorhersagbaren* Umkehrungen (Sinusbewegung) erhöhte Magnetstimulation des frontalen Folgeareals und des supplementären Augenfelds kurz vor der Umkehr die Augengeschwindigkeit in die neue Richtung; Stimulation des frontalen Folgeareals mitten im Zyklus senkte sie (Gagnon et al., 2006) – bei den zufälligen Wechseln dieser Übung ist Vorhersage nur begrenzt möglich. Dass die Übung bestimmte Hirnregionen „trainiert“, ist nicht belegt.

## 6. Motorische Grundlagen

- **Manuelles Tracking ist intermittierend:** Korrekturen kommen in Schüben mit ≈ 170 ms Refraktärzeit, bei langsamen Zielen werden kleine Fehler unter ≈ 0,8° oft toleriert (Miall et al., 1993; Joystick-Aufgabe).
- **Reaktionsbudget:** Nach einer Umkehr braucht die Hand ≈ 110–200 ms bis zur Gegenreaktion (Brenner & Smeets, 1997; Brenner et al., 1998). Läuft die Marke in dieser Zeit in die alte Richtung weiter, wächst der Abstand mit dem doppelten Zieltempo: bei 7 Einheiten/s auf ≈ 1,5–2,8 Einheiten, bei 17 Einheiten/s auf ≈ 3,7–6,8 Einheiten (Obergrenze; bei ruhender Hand etwa die Hälfte) – auf hohen Stufen mehr als der Bandradius von 3,35–5 Einheiten (eigene Rechnung). Jede echte Umkehr kostet daher Zeit neben dem Ziel; entscheidend ist das rasche Wiedereinfangen. Auch bei künstlich verzögerter Rückmeldung antizipiert die Hand gleichmäßige Bewegung, plötzliche Wechsel an der Umkehr aber nicht (Vercher & Gauthier, 1992). Bei jeder echten Umkehr muss die vorausschauend fortgesetzte Bewegung also abgebrochen werden (`inhibition` 1; gleiche Einstufung wie 513 und 515).
- **Bandbreite:** Mit der Maus gelingt genaues Tracking periodischer Bewegungen bis ≈ 2 Hz; Alter und motorische Einschränkung senken das (Riviere & Thakor, 1996). Die Übung hat im Mittel ≈ 0,4–0,8 Wechselereignisse je Sekunde, davon 58–91 % Umkehrungen, aber zufällig statt periodisch – nicht direkt vergleichbar (eigene Rechnung). Auf höheren Stufen dürfte „Mitteln statt Jagen“ ökonomischer sein (eigene Einschätzung, nicht untersucht).
- **Richtung:** Nur die waagrechte Fingerposition zählt; wo der Finger senkrecht liegt, ist gleichgültig.

## 7. Einflussfaktoren und Messgrenzen

- **Latenz dominiert:** Lokale Systemlatenz liegt in realen Systemen bei 23–243 ms und verschlechtert Tracking schon ab ≈ 41 ms (Ivkovic et al., 2015); die Verzögerung von Touchscreens kommt dazu (Deber et al., 2015). Bei 17 Einheiten/s bedeuten 50 ms zusätzliche Latenz ≈ 0,85 Einheiten Nachlauf, etwa ein Viertel des Bandradius auf der engsten Stufe (eigene Rechnung). Werte verschiedener Geräte sind daher nicht vergleichbar.
- **Größen relativ zum Bildschirm:** Tempo und Band sind in Einheiten der kürzeren Bildschirmseite festgelegt; Sehwinkel und Grad pro Sekunde hängen daher von Gerät und Abstand ab.
- **Messgrößen:** Gemessen werden die Zeit im Band (Prozent der Wertungszeit) und der mittlere Abstand zum Ziel (Prozent der Bandbreite), nur bei Fingerkontakt; die Dauer je Durchgang ist fest. Eine Wiedereinfangzeit pro Umkehr wird nicht gemessen. Einzelne Durchgänge streuen, wie jede Messung am Menschen; aussagekräftiger ist der Verlauf über mehrere Durchgänge und Tage (vgl. Mountford et al., 2004, zu Mehrfachmessung). Die Reproduzierbarkeit dieser Übung ist nicht untersucht.
- **Alter und Ermüdung:** Pursuit-Gain und Maus-Tracking werden im Alter schwächer (Moschner & Baloh, 1994; Riviere & Thakor, 1996). Wiederholtes Zielen mit der Maus (6 × 5 min) ermüdete die Handgelenkstrecker messbar, ohne Leistungsabfall (Forman et al., 2025); für das Nachführen mit dem Finger nicht untersucht.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** Die Auge-Hand-Koordination beim Nachführen reifte in einer kleinen Laborstudie durch Übung, v. a. bei Kindern (Gauthier et al., 1988). In Daten einer Online-Zielaufgabe (N = 7.174) stiegen die Leistungen über Tage deutlich (Listman et al., 2021; Beobachtungsdaten, Anbieterfinanzierung). Für diese Übung gibt es keine Studie.
- **Naher Transfer – schwach:** Es gibt nur indirekte Hinweise: 5–10 h Actionspiel verbesserten bei Nicht-Spielenden das Spurhalten/Nachführen im Labor (Li et al., 2016) – das ist ein Spiel, keine einminütige Übung. Bei digitalem Sehtraining entstehen große Effekte vor allem bei gerätegleichen Test- und Übungsaufgaben (Guo et al., 2025).
- **Alltagstransfer – fehlend:** Kein Beleg für Nutzen in Spiel, Sport, Verkehr oder Beruf; „Brain-Training“ zeigt viel Evidenz für die geübte, wenig für entfernte Aufgaben (Simons et al., 2016).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand fortlaufendes Nachführen und schnelles Wiedereinfangen nach Richtungswechseln üben möchte; Ziel „Blickfolge plus Hand“ in kurzem Rahmen; keine Lese- oder Gedächtnisanforderung.
- **Weniger passend, wenn …** ruhige, gleichmäßige Blickfolge (eher 105, 404, 514) oder vertikale Folge (515) gewünscht ist; vergleichbare Messwerte gebraucht werden.
- **Vorsicht / anpassen bei …**
  - `tremor_parkinson`, `hand_arm_beschwerden`: dauerhafte, schnelle Hin-und-her-Korrekturen (vgl. Forman et al., 2025, Mausaufgabe) → kurze Runden; bei Zittern oder Beschwerden lieber pausieren.
  - `nystagmus`: Die Aufgabe verlangt genau die Folgebewegung, die bei Nystagmus erschwert ist → eher nicht wählen.
  - `presbyopie_gleitsicht`: Das Ziel läuft über die ganze Breite auf Augenhöhe → Bildschirmbrille bzw. passende Zwischenkorrektur, Gerät tiefer halten, kleineres Fenster.
  - `migraene_lichtempfindlich`, `photosensitive_epilepsie`: Die Übung arbeitet ohne Blitze und ohne Wackeln; die Übergänge sind weich. Bei bekannter Lichtempfindlichkeit dennoch Vorsicht.
  - `farbsehschwaeche`: Die Rückmeldung nutzt zusätzlich Ring und Kreuz; die Aufgabe bleibt lösbar.
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: pausenloses Verfolgen, wenig Lidschlag → Pausen zwischen den Runden.
  - `schwindel_vestibulaer`: Es gibt keinen Kameraschwenk und keine großflächige Bewegung; das hin- und hergleitende Ziel kann Empfindliche dennoch stören (Belastung Schwindel 1, wie 513–515) → kurze Runden, bei Beschwerden abbrechen. Wiederkehrender Schwindel, Doppelbilder, plötzliche Sehverschlechterung oder Kopfschmerz mit Sehverschlechterung sind ein Anlass für ärztliche Abklärung und kein Übungsthema (Muchnick, 2008, S. 6, 28).
  - Praxisangabe (keine Studie): Bei Blickfolgeübungen den Kopf ruhig halten, damit die Augenbewegung geübt wird und nicht eine Kopfbewegung; Beschwerden sind ein Grund, die Übung abzubrechen.
- **Kombiniert gut mit …** 514 und 105 (vorhersagbare Blickfolge), 515 (senkrechtes Nachführen), 410 und 415 (reaktive Blickfolge ohne Gerät), 707 (Pfad nachfahren), 104 (bewegtes Ziel).
- **Verwandte Übungen:** Am nächsten liegt 513 (gleicher Baukasten; dort wandert das Ziel frei über die Fläche); 512 läuft nur waagrecht auf der Bildmitte, wechselt häufiger und springt zusätzlich im Tempo. 505 zeigt fast dieselbe Bewegung (waagrechte Bahn, zufällige Umkehr), 304 dieselbe Bahnidee mit Tippen statt Halten. Nicht mehrere davon hintereinander vorschlagen; 512 ist die Wahl für schnelle, rein waagrechte Umkehr.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Tablet:** Original nicht bedienbar (Pointer Lock, nur Maus). Eine Touch-Fassung als **Finger-Nachführaufgabe** ist fachlich sinnvoll (2D-Tracking mit dem Finger ist ein etabliertes Laborparadigma; Engel & Soechting, 2000), braucht aber: Ziel größer (in mm/Grad festlegen), Finger verdeckt das Ziel → Ziel oberhalb der Berührung oder Ring um das Ziel, Touch-Latenz einplanen (kommerzielle Touchgeräte 50–200 ms, zitiert nach Deber et al., 2015), Tempo deutlich niedriger.
- **Messung:** Wiedereinfangzeit nach jeder Umkehr, mittlerer Abstand und Nachlauf erfassen; Präzision zeitgewichtet; feste Sitzungsdauer ohne Zeitbonus; realistische Notenskala.
- **Mechanik:** „Umkehr“ ehrlich definieren (jedes Ereignis kehrt um oder Anteil angeben); wählbare Stufen statt Combo-Verschärfung, die gerade nach guten Phasen sprunghaft schwerer wird.
- **Regeltext:** Punkte (10 je 0,25 s), Zeitbonus (+0,4 s/s) und optionale Strafe korrekt angeben; keine Latenz-Tabelle, keine Transfer- oder Leistungsversprechen; Mausbeschleunigung erwähnen bzw. `unadjustedMovement` anbieten.
- **Barrierefreiheit/Sicherheit:** Rückmeldung zusätzlich über Form (z. B. Ring) statt nur Rot/Grün; roten Radialblitz standardmäßig aus; Wackeln abschaltbar; Pausenhinweis.

## 11. Quellen
### Von der Website angegeben
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise – Messhinweis (Hardwareverzögerung) ja; die Latenztabelle zu Richtungswechseln stammt nicht daher (Woods misst einfache Reaktionszeit: im Mittel 231 ms, hardwarekorrigiert 213 ms).
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI stimmt ✓; **stützt:** nein/teilweise – Netzwerk der Folgebewegung ja; ein Grenzwert „~30°/s“ steht dort nicht.
- Green, C. S., & Bavelier, D. (2003). Action video game modifies visual selective attention. *Nature, 423*(6939), 534–537. https://doi.org/10.1038/nature01647 – **Prüfung:** DOI stimmt ✓; **stützt:** nein – Aufmerksamkeitsstudie ohne Tracking- oder Latenzdaten.
- Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 – **Prüfung:** DOI stimmt ✓, **Titel auf der Website falsch** („smooth pursuit“ statt „smooth tracking“; hier korrigiert); **stützt:** teilweise – Position → Sakkade, Geschwindigkeit → Folgebewegung (über Sekundärquellen); die Latenz „100–130 ms“ belegt eher de Brouwer et al. (2002).

### Weitere Fachliteratur
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Rot-Grün-Schwäche.
- Brenner, E., & Smeets, J. B. J. (1997). Fast responses of the human hand to changes in target position. *Journal of Motor Behavior, 29*(4), 297–310. https://doi.org/10.1080/00222899709600017 – Handkorrektur nach ≈ 110 ms.
- Brenner, E., Smeets, J. B. J., & de Lussanet, M. H. E. (1998). Hitting moving targets: Continuous control of the acceleration of the hand on the basis of the target’s velocity. *Experimental Brain Research, 122*(4), 467–474. https://doi.org/10.1007/s002210050535 – Reaktion auf Geschwindigkeitsänderung ≈ 200 ms.
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Pursuit-Gain, Einfluss des Hintergrunds.
- Danion, F. R., & Flanagan, J. R. (2018). Different gaze strategies during eye versus hand tracking of a moving target. *Scientific Reports, 8*, 10059. https://doi.org/10.1038/s41598-018-28434-6 – Blick beim Hand-Tracking.
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – Auslöser und Latenz von Aufholsakkaden.
- Deber, J., Jota, R., Forlines, C., & Wigdor, D. (2015). How much faster is fast enough? User perception of latency & latency improvements in direct and indirect touch. In *Proceedings of CHI ’15* (S. 1827–1836). ACM. https://doi.org/10.1145/2702123.2702300 – Touch-Latenz (Tablet-Variante).
- Dzhafarov, E. N., Sekuler, R., & Allik, J. (1993). Detection of changes in speed and direction of motion: Reaction time analysis. *Perception & Psychophysics, 54*(6), 733–750. https://doi.org/10.3758/BF03211798 – Reaktionszeit auf Richtungs-/Tempowechsel.
- Forman, G. N., Nikitin, S. A., Lang, C. J., Gabriel, D. A., Sonne, M. W., Kociolek, A. M., & Holmes, M. W. R. (2025). Impact of repetitive mouse aiming on muscle fatigue and fine motor performance of the distal upper limb. *Journal of Electromyography and Kinesiology, 82*, 102992. https://doi.org/10.1016/j.jelekin.2025.102992 – Ermüdung.
- Gagnon, D., Paus, T., Grosbras, M.-H., Pike, G. B., & O’Driscoll, G. A. (2006). Transcranial magnetic stimulation of frontal oculomotor regions during smooth pursuit. *The Journal of Neuroscience, 26*(2), 458–466. https://doi.org/10.1523/JNEUROSCI.2789-05.2006 – frontales Folgeareal und supplementäres Augenfeld an der Umkehr (PubMed-Abstract geprüft).
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
- Vercher, J.-L., & Gauthier, G. M. (1992). Oculo-manual coordination control: Ocular and manual tracking of visual targets with delayed visual feedback of the hand motion. *Experimental Brain Research, 90*(3), 599–609. https://doi.org/10.1007/BF00230944 – Hand antizipiert, korrigiert plötzliche Umkehr nicht (PubMed-Abstract geprüft).
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – Folgebewegung und Sakkaden: gemeinsames Netzwerk
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2. Aufl.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Wiederholbarkeit und Mehrfachmessung (Kap. 2, S. 17–18, 44)
