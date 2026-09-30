# Literaturbasis W04-blick-a – Blickverfolgung mit Maus/Zeiger (Katalog-Nr. 401–408)

Stand: 29.09.2026 · Gruppe: 401 peripheral-ping-pursuit · 402 infinity-pursuit · 403 sine-wave-pursuit ·
404 constant-slow-pursuit · 405 zig-zag-path-pursuit · 406 triangular-pursuit · 407 predictive-pursuit ·
408 split-screen-tracking. Parallelgruppe (Querverweise): 409–415 (strobe, dynamic-evasion, spatial-shift,
ghosting-suppress, staircase-step, momentum-teleport, directional-chaos).

**Zweck:** gemeinsame, geprüfte Quellenbasis für die Autor-Agenten der Katalogeinträge 401–408. Keine
Katalogdatei, kein Code. Inhalte aus `docs/wissenschaft/02-bewegung-verfolgen.md` (dort bereits geprüft) sind
übernommen und als „(docs 02)“ markiert; ihre DOIs wurden hier zusätzlich per Crossref gegengeprüft.

## 0. Methode, Legende, wichtige Vorbemerkungen

**Prüfverfahren**
- Jede DOI: `api.crossref.org/works/<DOI>` (Titel, Autor:innen, Jahr, Zeitschrift, Band, Seiten verglichen).
- Inhalt: Abstract über PubMed (E-Utilities) oder Europe PMC; wo kein Abstract verfügbar war, über
  Semantic-Scholar-Kurzfassung (TLDR), frei zugänglichen Volltext oder Sekundärquelle – das ist jeweils
  vermerkt.
- Prüfvermerke in Abschnitt D: **✓A** = DOI per Crossref korrekt **und** Inhalt am Abstract/Volltext geprüft ·
  **✓S** = DOI korrekt, Inhalt nur über Kurzfassung/Sekundärquelle eingeordnet · **✓B** = nur bibliografisch
  geprüft (Inhalt nicht eingesehen) · **Web** = Webquelle ohne DOI, abgerufen am 29.09.2026.

**Vorbemerkung zur Mechanik (aus den Seitentexten, nicht aus dem Code)**
- Alle acht Übungen nutzen dieselbe Einstellleiste: Dauer 30/45/60/90/120 s, Tempo 0,5×–9,0×, Zielgröße
  „16 px“, Farbe, „Bahn ausblenden“ (Hide Line), „Zufallstempo“ (Random Speed), „Blickspur“, „Neonlicht“,
  „Scanlines“, „Heller Modus“. Die Code-Analyse (Punktelogik, Grundtempo in px/s, Ping-Dauer, Eingabe in 408)
  ist Aufgabe der Autor:innen.
- **Die Website misst keine Augenbewegungen.** Seite 404 sagt es ausdrücklich: „Der Browser kennt die
  Zeichenposition und deine Einstellungen, aber nicht die Position deiner Augen … kein klinischer Messwert“.
  Alle Tabellen mit „Blickfolge-Gain“, „Phasennacheilung“, „Sakkaden pro Zyklus“, „Umkehr-Sakkadenlatenz“ oder
  „Blickanker-Stabilität“ (402, 403, 405–408) sind daher **mit Maus/Touch nicht messbar**. Was gemessen werden
  kann, ist **manuelles Nachführen** (Zeiger–Ziel-Abstand, Zeit auf dem Ziel) – also Auge-Hand-Koordination
  mit Blickfolge als Voraussetzung.
- **Leistungsstufen ohne Datengrundlage:** Die Website schreibt unter jeder Übung „Every figure quoted on this
  page comes from the published work listed above“. Für die Stufentabellen (z. B. „Elite 0,96–1,02“, „Top 1,5 %“,
  „Latenz < 110 ms“, „UFOV > 92 %“) findet sich in **keiner** der angegebenen Quellen eine Grundlage (Abschnitt
  A). Die Angaben sind als erfunden bzw. nicht belegt einzustufen.

**Umrechnungshilfen (eigene Rechnung, θ = 2·atan(s/2d))**

| Situation | 1 px | 16-px-Ziel | px pro Grad | Bildbreite |
|---|---|---|---|---|
| 24″-Monitor 1920 × 1080 bei 60 cm (Website-Empfehlung) | 0,277 mm | 4,4 mm ≈ **0,42°** | ≈ 38 px/° | 531 mm ≈ 48° |
| 27″-Monitor 2560 × 1440 bei 60 cm | 0,233 mm | 3,7 mm ≈ 0,36° | ≈ 45 px/° | 598 mm ≈ 53° |
| iPad 11″ (0,192 mm/CSS-px) bei 40 cm (docs 02, Abschn. 4) | 0,192 mm | 3,1 mm ≈ 0,44° | ≈ 36 px/° | ≈ 32° |

- Website-Angabe „Bahn über 30–40° horizontal“ bei 60 cm entspricht 32–44 cm Bahnbreite (fast volle Breite
  eines 24″-Monitors); am Tablet nicht erreichbar (≈ 32° Gesamtbreite bei 40 cm).
- Bildschritt pro Frame bei 60 Hz = v/60: 10°/s → 0,17° (10′) pro Bild; bei 120 Hz die Hälfte (docs 02).
- Akkommodationsbedarf 1/d: 60 cm ≈ 1,7 dpt, 40 cm = 2,5 dpt.
- WCAG-Blitzfeld 10° entspricht bei 60 cm ≈ 10,5 cm, bei 40 cm ≈ 7 cm Durchmesser.

---

## A) Prüfung der von der Website angegebenen Quellen

### A0. Gesamtliste (24 verschiedene Quellen, 45 Nennungen in 8 Übungen)

| W | Angabe der Website (gekürzt) | Crossref-Prüfung | Ergebnis |
|---|---|---|---|
| W1 | Posner (1980). Orienting of attention. *QJEP 32*(1), 3–25. 10.1080/00335558008248231 | ✓ stimmt | korrekt |
| W2 | Eriksen & St. James (1986). Zoom lens model. *Percept Psychophys 40*(4), 225–240. 10.3758/BF03211502 | ✓ stimmt | korrekt |
| W3 | Wolfe (1994). Guided Search 2.0. *PBR 1*(2), 202–238. 10.3758/BF03200774 | ✓ stimmt | korrekt |
| W4 | Findlay & Walker (1999). Model of saccade generation. *BBS 22*(4), 661–674. 10.1017/S0140525X99002150 | ✓ stimmt | korrekt |
| W5 | Leigh & Zee (2015). *The Neurology of Eye Movements* (5. Aufl.). OUP. 10.1093/med/9780199969203.001.0001 | ✗ DOI nicht auffindbar (doi.org 404) | **richtig: 10.1093/med/9780199969289.001.0001** (Crossref: Leigh & Zee, 2015) |
| W6 | Woods et al. (2015). Factors influencing the latency of simple RT. *Front Hum Neurosci 9*, 131. 10.3389/fnhum.2015.00131 | ✓ stimmt | korrekt |
| W7 | Robinson (1965). Mechanics of human smooth pursuit. *J Physiol 180*(3), 569–591. 10.1113/jphysiol.1965.sp007718 | ✓ stimmt | korrekt |
| W8 | Barnes (2008). Cognitive processes … smooth pursuit. *Brain Cogn 68*(3), 309–326. 10.1016/j.bandc.2008.08.020 | ✓ stimmt | korrekt |
| W9 | Krauzlis (2004). Recasting the smooth pursuit system. *J Neurophysiol 91*(2), 591–603. 10.1152/jn.00801.2003 | ✓ stimmt | korrekt |
| W10 | Stark, Vossius & Young (1962). Predictive control of eye tracking movements. *IRE Trans HFE-3*(2), 52–57. 10.1109/THFE2.1962.4503342 | ✓ stimmt | korrekt |
| W11 | Rashbass (1961). „… saccadic and smooth **pursuit** eye movements“. *J Physiol 159*(2), 326–338. 10.1113/jphysiol.1961.sp006811 | ✓ DOI stimmt | Titel leicht falsch: richtig „… saccadic and smooth **tracking** eye movements“ |
| W12 | Bahill, Iandolo & Troost (1980). Unpredictable target waveforms. *Vision Res 20*(11), 923–931. 10.1016/0042-6989(80)90073-5 | ✓ stimmt | korrekt |
| W13 | Kosinski (2008). A literature review on reaction time. Clemson University (ohne DOI) | keine DOI (korrekt angegeben) | vorhandene Fassung: „Last updated September 2013“; nicht begutachtet |
| W14 | de Brouwer, **A. J.**, Yuksel, Blohm, Missal & Lefèvre (2002). What triggers catch-up saccades? *J Neurophysiol 87*(3), 1646–1650. 10.1152/jn.00432.2001 | ✓ DOI stimmt | Erstautorin ist **de Brouwer, S.** (Sophie), nicht „A. J.“ |
| W15 | Heinen, Badler & Ting (2005). „Timing and kinematics of saccadic decisions in smooth pursuit“. *J Neurophysiol 94*(4), 2638–2648. 10.1152/jn.00282.2005 | ✗ DOI gehört zu Bottjer (2005), Zebrafinken-Gesangslernen | **Titel existiert nicht.** Einzige passende Arbeit derselben Autor:innen 2005: *Timing and velocity randomization similarly affect anticipatory pursuit*, J Vis 5(6):1, 493–503, 10.1167/5.6.1 |
| W16 | Orban de Xivry & Lefèvre (2007). „Saccades and the solution to the aperture problem for smooth pursuit“. *Behav Brain Funct 3*, 33. 10.1186/1744-9081-3-33 | ✗ DOI gehört zu Heijtz et al. (2007), Calcyon/ADHS | **Titel/Zeitschrift existieren so nicht.** Reale Arbeit 2007: *Saccades and pursuit: two outcomes of a single sensorimotor process*, J Physiol 584(1), 11–23, 10.1113/jphysiol.2007.139881 |
| W17 | Bennett & Barnes (2006). „Timing of predictive saccades during pursuit of targets undergoing angular trajectory changes“. *Vision Res 46*(17), 2736–2746. 10.1016/j.visres.2006.03.011 | ✗ DOI gehört zu Murray et al. (2006), Farbkonstanz | **Arbeit nicht auffindbar** (Crossref, PubMed). Reale Bennett-&-Barnes-Arbeiten 2006 betreffen Verdeckung: Exp Brain Res 168, 313–321 (10.1007/s00221-005-0101-3) bzw. 175, 1–10 (10.1007/s00221-006-0533-4) |
| W18 | Bennett & Barnes (2003). Human ocular pursuit during the transient disappearance of a visual target. *J Neurophysiol 90*(4), 2504–2520. 10.1152/jn.00843.2002 | ✗ DOI gehört zu Nealen et al. (2003), TRPM8 | Angaben sonst richtig; **richtige DOI: 10.1152/jn.01145.2002** |
| W19 | Kowler (1989). „Cognitive expectations, not **work, determine the direction** of smooth pursuit eye movements“. *Vision Res 29*(12), 1769–1777. 10.1016/0042-6989(89)90161-2 | ✗ DOI gehört zu Dosher et al. (1989), Kinetic depth effect | **richtig:** *Cognitive expectations, not habits, control anticipatory smooth oculomotor pursuit*, Vision Res 29(9), 1049–1057, 10.1016/0042-6989(89)90052-7 |
| W20 | Pylyshyn & Storm (1988). Tracking multiple independent targets. *Spatial Vision 3*(3), 179–197. 10.1163/156856888X00122 | ✓ stimmt | korrekt |
| W21 | Alvarez & Cavanagh (2005). Independent resources … hemifields. *Cognitive Psychology 50*(2), 126–143. 10.1016/j.cogpsych.2004.08.001 | ✗ DOI gehört zu Bucciarelli & Johnson-Laird (2005), „Naïve deontics“ | **richtig:** *Psychological Science 16*(8), 637–643, 10.1111/j.1467-9280.2005.01587.x |
| W22 | Awh & Pashler (2000). Evidence for split attentional foci. *JEP:HPP 26*(2), 834–846. 10.1037/0096-1523.26.2.834 | ✓ stimmt | korrekt |
| W23 | Cavanagh & Alvarez (2005). Tracking multiple targets with multifocal attention. *TICS 9*(7), 349–354. 10.1016/j.tics.2005.05.009 | ✓ stimmt | korrekt |
| W24 | Green & Bavelier (2006). Enumeration versus multiple object tracking. *Cognition 101*(1), 217–245. 10.1016/j.cognition.2005.10.005 | ✗ DOI gehört zu Saxe et al. (2006), Säuglinge | **richtig: 10.1016/j.cognition.2005.10.004**; Korrigendum 2020: 10.1016/j.cognition.2020.104198 (Inhalt nicht eingesehen) |

**Bilanz:** 24 verschiedene Quellen geprüft. **8 mit falscher DOI** (W5, W15, W16, W17, W18, W19, W21, W24),
davon **3 in der zitierten Form nicht existent** (W15, W16, W17) und 1 mit stark verfälschtem Titel (W19).
**3 weitere mit kleineren Fehlern** (W11 Titelwort, W13 Jahr/Inhalt, W14 Autorinitialen). 13 Angaben korrekt.
Woods et al. (2015) steht unter **allen acht** Übungen, stützt aber keine der pursuit-spezifischen Aussagen.

**Kurzinhalt der korrekten bzw. korrigierten Quellen (Grundlage der Urteile unten)**
- W1 Posner 1980 (✓S, Kurzfassung): verdecktes Ausrichten der Aufmerksamkeit auf einen Ort ohne Blickbewegung
  verbessert die Entdeckungseffizienz dort. Statische Fixation, keine Blickfolge.
- W2 Eriksen & St. James 1986 (✓S): Aufmerksamkeit wie ein Zoomobjektiv; untersucht, ob ein größerer Fokus die
  Verarbeitungseffizienz **senkt** und ob der Rand graduell abfällt (Fragestellung laut Einleitung; Volltext
  nicht eingesehen).
- W3 Wolfe 1994 (✓A): Modell der visuellen **Suche** (parallele Merkmalsstufe lenkt begrenzte Aufmerksamkeit).
- W4 Findlay & Walker 1999 (✓A): Sakkadenmodell; „visuelle Onsets haben automatischen Zugang zur Blicksteuerung
  über die unteren Ebenen“ (Gap-Effekt, Express-Sakkaden, Distraktoreffekt).
- W5 Leigh & Zee 2015 (✓B): klinisches Standardwerk; konkrete Website-Zahlen daraus nicht prüfbar.
- W6 Woods et al. 2015 (✓A, Volltext): einfache Reaktionszeit auf 4°-Reize 3,6° seitlich; n = 1 469; 231 ms
  (213 ms nach Abzug der Hardware-Verzögerung), +0,55 ms/Lebensjahr; Reizentdeckung 131 ms, altersunabhängig.
  Hardware: 60-Hz-LCD 11,0 ms Anzeigeverzögerung, Gaming-Maus (1 kHz) 6,8 ms, zusammen 17,8 ms; übliche
  Maustreiber „20 ms oder mehr“. **Keine** Daten zu Blickfolge, Kleinhirn oder Vorteilen von 144/240 Hz.
- W7 Robinson 1965 (✓S, Kurzfassung): Das Auge wechselt in der Folgebewegung in etwa 130 ms auf eine neue
  Geschwindigkeit; Folgebewegung verhält sich kontinuierlich, nicht „abgetastet“.
- W8 Barnes 2008 (✓A): Übersicht – Folgebewegung = Rückkopplung plus Vorhersage über extraretinale Signale
  (Efferenzkopie, Kurzzeitspeicher für Geschwindigkeit und Zeitpunkt); bei periodischen Bahnen wird
  Teil-Information gespeichert und vorausschauend abgerufen, um Phasenfehler zu verringern; Aufmerksamkeit
  wählt das Ziel und erhöht dessen „Gain“. Kein Wort zu Training, Kleinhirn-„Schwingungsgedächtnis“ oder
  Bremsimpulsen in ms.
- W9 Krauzlis 2004 (✓A): Folgebewegung nutzt ein ausgedehntes kortikales Netz; das pursuit-bezogene Areal des
  frontalen Augenfelds (FEF) hat den direktesten Einfluss; neben Kleinhirnbahnen auch Basalganglien,
  Colliculus superior, Formatio reticularis; Folgebewegung und Sakkaden teilen eine Architektur. Keine
  Trainingsaussagen.
- W10 Stark et al. 1962 (✓S, Kurzfassung): „adaptiver Prädiktor“ überwindet bei regelmäßigem Reiz die
  eingebauten Verzögerungen. Ingenieurwissenschaftlich, keine Hirnregionen.
- W11 Rashbass 1961 (✓B; eingescannter Artikel, nur bibliografisch): klassische Arbeit zum Zusammenspiel von
  Sakkaden und glatter Folgebewegung (Step-Ramp-Paradigma, laut Sekundärliteratur).
- W12 Bahill et al. 1980 (✓S, Kurzfassung): unvorhersehbare Rampen zufälliger Geschwindigkeit und Dauer
  (pseudozufällige Folge) verhindern Vorhersage.
- W13 Kosinski (2013-Fassung, Web, Volltext): einfache visuelle Reaktionszeit Studierender „180–200 ms“ (≈ 190 ms)
  – nicht 200–250 ms; Lehrmaterial, nicht begutachtet.
- W14 de Brouwer et al. 2002 (✓A): Aufholsakkaden werden über die „Kreuzungszeit“ T_XE (Positions- und
  Geschwindigkeitsfehler) ausgelöst: bei 40–180 ms keine Sakkade, sonst Sakkade nach ≈ 125 ms Latenz.
- W15-korrigiert Heinen et al. 2005, J Vis (✓A): antizipatorische Folgebewegung bleibt auch bei zufälligem
  Startzeitpunkt erhalten („Zentrierungsstrategie“).
- W16-korrigiert Orban de Xivry & Lefèvre 2007 (✓A): Übersicht – Sakkaden und Folgebewegung arbeiten beim
  Verfolgen synergistisch, zwei Ergebnisse eines sensomotorischen Prozesses.
- W18 Bennett & Barnes 2003 (✓A): Bei Verschwinden des Ziels fällt die Augengeschwindigkeit ab, wird **nicht**
  nahe der Zielgeschwindigkeit gehalten; 7 von 9 Personen beschleunigen vor dem erwarteten Wiederauftauchen
  wieder, aber zu einem festen Zeitpunkt (bei 900 ms Pause zu früh). Nur Verhalten, keine Hirndaten.
- W19-korrigiert Kowler 1989 (✓A): Richtung der antizipatorischen Folgebewegung folgt der **kognitiven
  Erwartung** (Hinweisreiz), nicht bloß der Gewohnheit aus dem Vordurchgang.
- W20 Pylyshyn & Storm 1988 (✓A): bis zu 5 von 10 identischen Objekten verfolgbar; 87 % richtig, wo serielles
  Abtasten höchstens ≈ 40 % erlaubt hätte.
- W21-korrigiert Alvarez & Cavanagh 2005 (✓A): doppelt so viele Ziele verfolgbar, wenn sie auf linke und rechte
  Gesichtsfeldhälfte verteilt sind.
- W22 Awh & Pashler 2000 (✓A): Aufmerksamkeit kann auf zwei nicht benachbarte Orte geteilt werden; Effekt
  stärker bei waagrechter Anordnung (verschiedene Halbfelder); Mechanismus: Unterdrückung von Störreizen.
- W23 Cavanagh & Alvarez 2005 (✓A): Übersicht – Tracking von ≥ 4 Zielen, Halbfeld-Unabhängigkeit.
- W24-korrigiert Green & Bavelier 2006 (✓A): Actionspieler verfolgen ≈ 2 Objekte mehr; kleine Trainingsgruppe
  mit Actionspiel zeigte Kausaleffekt; Korrigendum 2020 existiert.

### A1. Nr. 401 Peripheral Ping Pursuit (6 Quellen)

| Quelle | DOI-Prüfung | Wofür die Website sie anführt | Stützt? | Begründung |
|---|---|---|---|---|
| W1 Posner 1980 | ✓ | Aufmerksamkeit kann ohne Blickbewegung verschoben werden (verdeckt vs. offen) | **ja** (Konzept) | Kernaussage von Posner; aber an ruhender Fixation gezeigt. Dass Aufmerksamkeit *während* Blickfolge verteilt werden kann, belegen andere (Lovejoy 2009: Fokus liegt auf dem Ziel; Khan 2010: bevorzugt vor dem Ziel) |
| W2 Eriksen & St. James 1986 | ✓ | implizit: Aufmerksamkeit „wie Nebel über den ganzen Monitor“ ausweiten | **teilweise** | Zoom-Modell: Fokus ist variabel, **ein weiterer Fokus kostet Verarbeitungseffizienz** – die Website verschweigt diesen Preis |
| W3 Wolfe 1994 | ✓ | keine konkrete Aussage zugeordnet | **nein** | Modell der visuellen *Suche*; die Übung verlangt Entdecken eines kurzen Randreizes, keine Suche |
| W4 Findlay & Walker 1999 | ✓ | implizit: Reflex, zum Ping zu blicken („widerstehe dem Reflex“) | **ja** | Onsets haben automatischen Zugang zum Sakkadensystem; passend dazu Theeuwes et al. 1998 (Blickfang durch neue Objekte) |
| W5 Leigh & Zee 2015 | ✗ DOI (richtig …9289…) | allgemeiner Hintergrund | **teilweise** | Standardwerk; keine Seitenangabe, keine Zahl prüfbar |
| W6 Woods et al. 2015 | ✓ | implizit Reaktionszeit-„Benchmarks“ („Elite < 280 ms“, „Basis > 500 ms“) | **nein** | Woods misst einfache RT auf Reize 3,6° seitlich bei Fixation (231/213 ms). Keine Doppelaufgabe, keine Stufen, kein UFOV-% |

Weitere Website-Aussagen ohne oder gegen Beleg:
- „Standard-Benchmarks … UFOV > 92 % … Reaktionszeit < 280 ms … bei 60 cm und 1080p“ – **keine Datengrundlage**.
  Der echte UFOV-Test ist ein anderes Verfahren (docs 03, Abschnitt 3).
- „Peripherie: hochsensible Stäbchen dominieren … extrem empfindlich“ – **teilweise**: außerhalb der Fovea gibt es
  zahlenmäßig viel mehr Stäbchen (92 Mio. vs. 4,6 Mio. Zapfen; Curcio 1990), die Reaktionszeit steigt aber mit
  der Exzentrizität (Osaka 1976). Geschwindigkeitsunterscheidung ist in der Peripherie so genau wie zentral
  (≈ 6 %; McKee & Nakayama 1984). Dass bei heller Bildschirmdarstellung Stäbchen die Ping-Erkennung tragen, ist
  nicht belegt.
- „Dorsaler Pfad … verzichte auf Identifikation“ – Zwei-Pfade-Modell existiert (Goodale & Milner 1992), der
  Übungstipp ist daraus nicht ableitbar.
- „Hyperarousal verengt das Gesichtsfeld; 4-s-ein/6-s-aus-Atmung senkt Augeninnendruck“ – **unbelegt**. Belegt ist
  nur, dass eine **zentrale (foveale) Zusatzlast** einen Tunnelblick-Effekt erzeugen kann (Ringer et al. 2016).
- „Bildschirm sollte 35–45° abdecken, sonst verringert sich der Trainingseffekt“ – Geometrie plausibel
  (24″ bei 60 cm ≈ 48°), „Trainingseffekt“ unbelegt.
- Positiv: Die Seite sagt selbst, sie belege keine Erweiterung des Gesichtsfelds und keine Verringerung des
  Unfallrisikos.

### A2. Nr. 402 Infinity Pursuit (5 Quellen)

| Quelle | DOI-Prüfung | Wofür die Website sie anführt | Stützt? | Begründung |
|---|---|---|---|---|
| W7 Robinson 1965 | ✓ | Grundlagen der Folgebewegung; implizit Tabelle „Zielverfolgung 0,96–1,02 (Elite)“ | **teilweise** | Grundlagenarbeit zur Mechanik (≈ 130 ms bis zur neuen Geschwindigkeit); keine Leistungsstufen, keine Lemniskate |
| W5 Leigh & Zee 2015 | ✗ DOI | „alle sechs äußeren Augenmuskeln … Obliqui bis zur anatomischen Dehngrenze“ | **teilweise** | Dass bei schrägen Blickrichtungen alle sechs Muskeln zusammenwirken, ist Lehrbuchwissen; „Dehngrenze“ und Trainingsnutzen sind nicht belegt |
| W8 Barnes 2008 | ✓ | „zerebelläre Vorsteuerung … ungleich intensiver“ bei Lemniskate | **teilweise** | Barnes belegt Vorhersage/Efferenzkopie allgemein; kein Vergleich Lemniskate vs. Kreis, keine Kleinhirn-Aussage im Abstract |
| W9 Krauzlis 2004 | ✓ | Netzwerk der Folgebewegung, „interhemisphärische Koordination“ | **teilweise** | Netzwerk (FEF, Kleinhirn, Basalganglien) ja; „interhemisphärische Koordination beim Kreuzen der Mittellinie“ nicht |
| W6 Woods et al. 2015 | ✓ | ohne Zuordnung | **nein** | Reaktionszeitstudie, kein Bezug zu Blickfolge |

Weitere Aussagen:
- „Verbessert die Leseflüssigkeit … weniger Zeilenverrutscher“ („Ja.“) – **widerlegt/unbelegt**: Lesen beruht auf
  Sakkaden und Fixationen (Rayner 1998). Ein gemeinsames Statement von AAP/AAO u. a. hält fest, dass
  „ocular pursuit-and-tracking exercises“ keine wirksame Behandlung von Lernstörungen/Legasthenie sind (Handler &
  Fierson 2011). Die „liegende Acht“ mit Mittellinien-Argument entspricht der Brain-Gym®-Übung „Lazy 8s“; ein
  Review fand für Brain Gym keine tragfähigen Belege (Hyatt 2007).
- „Lemniskate effektiver als Kreis oder Linie“ – **kein Vergleichsbeleg**. Belegt ist: Bei Kurven verlangsamen Hand
  und Auge gesetzmäßig (Zwei-Drittel-Potenzgesetz; Lacquaniti et al. 1983; de'Sperati & Viviani 1997).
- „VOR entkoppeln, indem man den Kopf ruhig hält“ – physiologisch schief: bei ruhigem Kopf ist der VOR gar nicht
  gefordert; Kopf ruhig halten ist sinnvoll, damit die Augenfolgebewegung geübt wird (docs 02).
- „20 s in 6 m Ferne blicken, um die Ziliarmuskeln zu detonisieren“ – 20-20-20-Erinnerungen senkten in einer
  Studie Beschwerden kurzfristig, veränderten aber keine Binokular- oder Tränenfilmwerte (Talens-Estarelles 2023).
- „Häufige Kopfdrehungen → Grundlagentraining für Binokularsehen ratsam“ – diagnoseähnliche Aussage ohne Beleg.
- Positiv: Seite weist auf Pausen bei Doppelbildern, Übelkeit, Schwindel hin.

### A3. Nr. 403 Sine Wave Pursuit (6 Quellen)

| Quelle | DOI-Prüfung | Wofür die Website sie anführt | Stützt? | Begründung |
|---|---|---|---|---|
| W10 Stark et al. 1962 | ✓ | „Kleinhirn adaptiert binnen weniger Zyklen, Latenz von 130–150 ms vollständig neutralisiert (Zero Phase Lag)“ | **teilweise** | Vorhersage überwindet Verzögerung bei regelmäßigem Reiz – ja. Kleinhirn-Zuordnung stammt nicht aus der Quelle; „vollständig“ gilt nur für niedrige Frequenzen (Soechting et al. 2010); mittlere Restverzögerung z. B. 43 ms (Barnes et al. 2000) |
| W7 Robinson 1965 | ✓ | 130–150 ms Nacheilung bei unvorhersehbaren Reizen; „Drehmomentanpassung der Augenmuskeln“ | **teilweise** | ≈ 130 ms bis zur neuen Geschwindigkeit passt; Latenz des Pursuit-Beginns ≈ 100 ms (Carl & Gellman 1987) |
| W11 Rashbass 1961 | ✓ (Titelwort falsch) | Gain-Definition; „fällt der Gain unter 0,8 … ermüdende Korrektursakkaden“ | **teilweise** | Zusammenspiel Sakkade/Folgebewegung ja; Schwelle 0,8 und „ermüdend“ nicht aus der Quelle (Inhalt nur bibliografisch geprüft) |
| W12 Bahill et al. 1980 | ✓ | Gain-Einbruch → Aufholsakkaden; „Overshoot am Scheitelpunkt“ | **teilweise** | Arbeit zu unvorhersehbaren Rampen; Sinus ist dagegen gut vorhersagbar. Überschießen am Wendepunkt nicht belegt |
| W8 Barnes 2008 | ✓ | „zerebelläres Schwingungsgedächtnis“, Phasensynchronisation | **teilweise** | Speichern/Abrufen von Bahninformation bei periodischer Bewegung – ja; „Kleinhirn“, „Training baut Gedächtnis auf“ – nicht |
| W6 Woods et al. 2015 | ✓ | „144/240 Hz ermöglichen dem Kleinhirn präzisere Rhythmusanpassung“ | **nein** | Nichts dazu in Woods; höhere Bildrate wirkt vor allem über geringere Latenz (Spjut et al. 2019) |

Weitere Aussagen:
- „Vertikal schwerer als horizontal“ – **belegt** (Collewijn & Tamminga 1984; Rottach et al. 1996; Ke et al. 2013:
  horizontal > vertikal, abwärts > aufwärts). Die Begründung „rostraler interstitieller Kern, geringere
  Bandbreite“ ist falsch zugeordnet: der riMLF gilt als Sakkaden-Burst-Generator (Sparks 2002, ✓B); die
  Folgebewegung läuft über Brückenkerne und Kleinhirn (Ilg & Thier 2008).
- „Gain 1,0 ohne Sakkaden entwickeln“ – der glatte Gain liegt beim Gesunden praktisch immer < 0,95 (Collewijn &
  Tamminga 1984); Aufholsakkaden sind normal.
- „Beugt Augenermüdung vor, fördert Durchblutung des Augapfels“ – **unbelegt**; für Maßnahmen gegen
  Bildschirmbeschwerden gibt es insgesamt keine hochwertige Evidenz (vgl. Talens-Estarelles 2023).
- Ballsport „Sehr stark“ – **unbelegt** (Abschnitt C).

### A4. Nr. 404 Constant Slow Pursuit (4 Quellen)

| Quelle | DOI-Prüfung | Wofür die Website sie anführt | Stützt? | Begründung |
|---|---|---|---|---|
| W11 Rashbass 1961 | ✓ (Titelwort falsch) | Aufholsakkaden als Korrektur während der Folgebewegung | **ja** (Konzept) | klassische Grundlage; genauer: de Brouwer et al. 2002 |
| W9 Krauzlis 2004 | ✓ | Definition sanfte Blickfolge (Bild im zentralen Blick halten) | **ja** | deckt sich mit Abstract |
| W6 Woods et al. 2015 | ✓ | „Bildrate, Abstand und Browser-Timing beeinflussen …“ | **teilweise** | Woods belegt Hardware-/Software-Verzögerungen (17,8 ms in kalibriertem Aufbau; übliche Maustreiber ≥ 20 ms), nicht Wahrnehmbarkeit des Punkts |
| W13 Kosinski | keine DOI (korrekt) | „200–250 ms visuelle Reaktion“ | **nein/teilweise** | Aktuelle Fassung (2013) nennt 180–200 ms; nicht begutachtet; Reaktionszeit für eine Folgeaufgabe ohnehin wenig relevant |

- Die Seite 404 ist die **sachlichste der Gruppe**: keine Leistungsstufen, ausdrücklich kein Augenmessung, keine
  Heilversprechen, „nur eine Schwierigkeit auf einmal“. Bahnform laut Text: **Lissajous-Kurve** (Summe
  sinusförmiger Schwingungen in x und y) – passend zu Soechting et al. (2010) und docs 02 (Pfadstufen).

### A5. Nr. 405 Zig-Zag Path Pursuit (6 Quellen + 1 Textnennung)

| Quelle | DOI-Prüfung | Wofür die Website sie anführt | Stützt? | Begründung |
|---|---|---|---|---|
| W14 de Brouwer et al. 2002 | ✓ (Initialen falsch) | Umschalten auf Fangsakkaden an Kanten; „Richtwerte“ der Stufentabelle | **teilweise** | Auslöseregel für Aufholsakkaden (T_XE 40–180 ms, ≈ 125 ms Latenz) belegt; Knickpunkte, FEF-Koordination und alle Tabellenwerte nicht |
| W15 Heinen et al. 2005 | ✗ Titel/DOI existieren nicht | „FEF antizipiert Kante, verfrühte Sakkade → Kurvenschneiden“ | **nein** | zitierte Arbeit existiert nicht; die reale Heinen-2005-Arbeit behandelt antizipatorische Folgebewegung bei zufälligem Startzeitpunkt |
| W16 Orban de Xivry & Lefèvre 2007 | ✗ Titel/Zeitschrift/DOI falsch | FEF-Umschaltung; „ohne Leitlinie antizipiert Kleinhirn/prämotorischer Kortex die Knickpunkte“ | **teilweise** (reale Arbeit) | reale Übersicht belegt Synergie von Sakkade und Folgebewegung; die konkreten Aussagen nicht |
| W9 Krauzlis 2004 | ✓ | „Antagonisten kontrahieren explosionsartig“; „FEF, SEF, Vermis VI–VII optimieren Feedbackschleifen, Jitter dauerhaft eliminiert“ | **teilweise** | beteiligte Areale ja (vgl. Ilg & Thier 2008; Fukushima et al. 2013); Trainings- und „dauerhaft eliminiert“-Aussagen nicht |
| W8 Barnes 2008 | ✓ | „Training baut Vorwärtsmodelle; prädiktiver Bremsimpuls 30–40 ms vor Scheitelpunkt“ | **teilweise** | Vorhersage ja; Zahl 30–40 ms und Trainingsaufbau nicht in der Quelle |
| W6 Woods et al. 2015 | ✓ | Bildschirmquantisierung 16,7/6,9/4,1 ms; Polling 8 ms vs. 1 ms „dokumentiert“ | **teilweise** | Frame-Dauern sind einfache Rechnung (1000/Hz); Woods nennt 11 ms Anzeige-, 6,8 ms Mausverzögerung (1 kHz), kein 125-Hz-Vergleich, kein Nutzen für Knickpunkte |
| (Text) Bennett & Barnes 2006 | ✗ nicht existent (siehe W17) | Vorwärtsmodelle | **nein** | – |

- Stufentabelle („Top 1,5 %“, „Landefehler < 12 px“, „Umkehr-Sakkadenlatenz < 110 ms“) – **keine Datengrundlage**;
  „Populationsanteile“ ohne Stichprobe. Reale Reaktion auf einen unvorhersehbaren Richtungswechsel: Geschwindigkeit
  sinkt nach ≈ 90 ms, Richtung ändert sich ab ≈ 130 ms (Soechting et al. 2005); Hand und Auge reagieren ähnlich
  (Engel et al. 2000).
- „Verkürzt Re-Zentrierungszeit auf wenige Millisekunden“ (Sport) – **physiologisch unmöglich** und unbelegt.

### A6. Nr. 406 Triangular Pursuit (6 Quellen + 1 Textnennung)

| Quelle | DOI-Prüfung | Wofür die Website sie anführt | Stützt? | Begründung |
|---|---|---|---|---|
| W14 de Brouwer et al. 2002 | ✓ (Initialen falsch) | Fangsakkaden an 60°-Ecken; Stufentabelle | **teilweise** | wie A5 |
| W15 Heinen et al. 2005 | ✗ | „FEF und SEF triggern prädiktive Fangsakkaden“; Squash: „verkürzt Wiedererfassungszeit erheblich“ | **nein** | zitierte Arbeit existiert nicht; Sportaussage ohne Beleg |
| W16 Orban de Xivry & Lefèvre 2007 | ✗ | „PPRF und riMLF koordiniert durch Kleinhirn“; „schlagartiges Umschalten Folge- → Sakkadenmodus“ | **teilweise** (reale Arbeit) | Synergie ja; PPRF/riMLF sind Sakkaden-Generatoren (Sparks 2002, ✓B), nicht Pursuit-Schaltstellen |
| W17 Bennett & Barnes 2006 | ✗ nicht existent | „Gehirn antizipiert die nächste Kante → Kurvenschneiden“ | **nein** | Arbeit nicht auffindbar. Belegt ist nur: bei rautenförmiger Bahn zeigen Augen antizipatorische Richtungsfehler (Collewijn & Tamminga 1984) |
| W8 Barnes 2008 | ✓ | Kleinhirn bremst 40 ms vor dem Scheitel | **teilweise** | Vorhersage ja; 40 ms nicht belegt |
| W6 Woods et al. 2015 | ✓ | 144/240 Hz „eliminiert Quantisierungsfehler, exaktes prädiktives Bremsen“ | **nein** | nicht in Woods |
| (Text) W5 Leigh & Zee 2015 | ✗ DOI | „LTD der Purkinje-Zellen → höherer Gain, Reduktion korrigierender Mikrosakkaden um über 60 %“ | **nein** | Zahl nicht prüfbar und unplausibel; Kleinhirnplastizität beim Pursuit-Lernen gibt es (Medina & Lisberger 2008, Affen), aber keine solche Trainingszahl beim Menschen |

- Geometrie korrekt: gleichseitiges Dreieck = 60°-Innenwinkel, Richtungsänderung 120° pro Ecke.
- „Diagonal = synchrone Aktivierung horizontaler und vertikaler Zentren“ – im Kern richtig (Diagonale haben
  horizontale und vertikale Komponenten; horizontale Komponente folgt besser als vertikale: Rottach et al. 1996).

### A7. Nr. 407 Predictive Pursuit (6 Quellen)

| Quelle | DOI-Prüfung | Wofür die Website sie anführt | Stützt? | Begründung |
|---|---|---|---|---|
| W8 Barnes 2008 | ✓ | Vorhersage/Vorwärtsmodell, „biologische Verzögerung vollständig neutralisiert“ | **teilweise** | extraretinale Vorhersage ja; „vollständig“ überzogen (Restverzögerung, Geschwindigkeitsabfall bei Verdeckung) |
| W18 Bennett & Barnes 2003 | ✗ DOI (richtig 10.1152/jn.01145.2002) | „Arbeitsgedächtnis im Frontallappen speichert Geschwindigkeit, Antrieb bis zu 2 s autonom“; „FEF/SEF-Geschwindigkeitsspeicher 1–2 s“ | **teilweise** | Arbeit zeigt: Geschwindigkeit fällt ab, wird **nicht** gehalten, antizipatorische Wiederbeschleunigung zu festem Zeitpunkt; keine Hirndaten. Beteiligte Areale bei Verdeckung: fMRI von Lencer et al. 2004 (FEF, SEF, Parietal, DLPFC, Kleinhirn); Restgeschwindigkeit bleibt bis 4 s erhalten, aber nur 40–60 % (Becker & Fuchs 1985) |
| W19 Kowler 1989 | ✗ Titel/Band/Seiten/DOI falsch | „Vorwärtsmodelle im Kleinhirn bleiben im Alter hochgradig plastisch“ | **nein** | reale Arbeit: Erwartung steuert antizipatorische Folgebewegung; nichts zu Alter oder Kleinhirn |
| W9 Krauzlis 2004 | ✓ | „Kleinhirn nutzt Efferenzkopien … weiß exakt, wo das Objekt in 200/500 ms ist“ | **teilweise** | Netzwerk ja; „exakt“ nicht (Bahnkrümmung wird bei Verdeckung nur teilweise fortgeführt: Mrotek & Soechting 2007) |
| W7 Robinson 1965 | ✓ | Pionierarbeit zu Vorwärtsmodell/FEF | **nein/teilweise** | Robinson 1965 behandelt Mechanik, nicht FEF oder Vorwärtsmodelle |
| W6 Woods et al. 2015 | ✓ | „144 Hz liefern mehr Bilder vor der Verdeckung, Kleinhirn rechnet fehlerfreier“ | **nein** | nicht in Woods; 300 ms Sichtbarkeit genügen zur Geschwindigkeitsschätzung (Becker & Fuchs 1985) |

- „150 km/h-Ball braucht ≈ 400 ms“ – physikalisch plausibel (18,44 m Wurfdistanz → ≈ 0,44 s; eigene Rechnung).
- „Trefferquoten steigen drastisch“ – **unbelegt**.
- Positiv: Die Anweisung „Blick nicht anhalten, gleichmäßig durch die Verdeckung gleiten“ entspricht der
  Forschung (Augenbewegungen während der Verdeckung hängen mit Extrapolationsurteilen zusammen: Makin & Poliakoff
  2011).

### A8. Nr. 408 Split-Screen Tracking (6 Quellen)

| Quelle | DOI-Prüfung | Wofür die Website sie anführt | Stützt? | Begründung |
|---|---|---|---|---|
| W20 Pylyshyn & Storm 1988 | ✓ | FINST-Zeiger, paralleles Verfolgen; „Richtwerte basieren auf MOT-Geschwindigkeitsmodellen“ | **teilweise** | paralleles Tracking ja; keine Geschwindigkeitsnormen, keine Stufen |
| W21 Alvarez & Cavanagh 2005 | ✗ Zeitschrift/DOI (richtig Psych Sci) | bilateraler Halbfeld-Vorteil | **ja/teilweise** | Halbfeld-Unabhängigkeit belegt; bei nur **einem** Ziel pro Seite wird die Kapazitätsgrenze aber kaum erreicht. „Wer rechts verliert, gibt der linken Hirnhälfte zu wenig Aufmerksamkeit“ – nicht belegt |
| W22 Awh & Pashler 2000 | ✓ | multifokale Aufmerksamkeit bei zentralem Blickanker | **ja** | geteilte Foki belegt, stärker über Halbfelder hinweg |
| W23 Cavanagh & Alvarez 2005 | ✓ | multifokales Modell, zwei Ziele ohne Foveation | **ja** | – |
| W24 Green & Bavelier 2006 | ✗ DOI (richtig .004) | „lässt sich durch Training im Computerumfeld signifikant plastisch ausbauen“; „Minimap, Kill-Feed …“ | **teilweise** | +2 Objekte bei Actionspielern, kleiner Trainingsnachweis; Metaanalysen uneinheitlich (Bediou et al. 2018: g = 0,34 in Interventionsstudien, Publikationsbias; Sala et al. 2018: kein Kausalnachweis). Minimap-Aussage nicht in der Quelle |
| W6 Woods et al. 2015 | ✓ | 144/240 Hz „eliminiert Ruckler“ | **nein** | nicht in Woods |

Weitere Aussagen:
- „Fovea deckt 1–2°“ – **ungenau**: stäbchenfreie Zone ≈ 1,25° (Curcio 1990), Fovea insgesamt ≈ 1,5 mm ≈ 5,2°
  (Webvision); für scharfes Sehen maßgeblich ist die Foveola (≈ 1°).
- „Sakkade 20–50 ms + sakkadische Suppression“ – **im Kern richtig** (Dauer steigt ≈ 2,7 ms/° Amplitude: Baloh
  et al. 1975; Unterdrückung der Empfindlichkeit v. a. im magnozellulären System: Ross et al. 2001).
- „Orthogonale Bewegung verhindert Gruppierung und zwingt zu paralleler Berechnung“ – Begründung verdreht:
  Gruppierung zu einem „virtuellen Objekt“ **hilft** beim Verfolgen (Yantis 1992); orthogonale Bewegung macht
  die Aufgabe schwerer, nicht „besser“.
- „Okulardominanz/Hemisphärendominanz erklärt, warum man immer dasselbe Ziel verliert“ – **unbelegt**. Etwa ein
  Drittel der Menschen ist linksäugig (Bourassa et al. 1996); ein Zusammenhang mit einseitigem Zielverlust ist
  nicht gezeigt. Gesunde haben eine leichte Linksverschiebung der Aufmerksamkeit (Pseudoneglect; Jewell & McCourt
  2000) – Seitenunterschiede sind also normal und kein Befund.
- „Mitte fixieren ist weitaus effektiver als Hin- und Herschauen“ – teilweise gedeckt durch MOT-Befunde zum
  Zentrumsblick (Fehd & Seiffert 2010); eine Pflicht-Fixation verschlechtert MOT aber eher (Vater et al. 2021,
  docs 02) → anbieten, nicht erzwingen.

---

## B) Faktenliste „Aussage – Zahl – Quelle“

Spalte „Nr.“ = besonders relevant für diese Katalognummern. Quellenkürzel → vollständige Angabe in Abschnitt D.

### B1. Latenz, Dynamik und Grenzen der glatten Blickfolge

| # | Aussage | Zahl | Quelle | Nr. |
|---|---|---|---|---|
| F01 | Latenz der Folgebewegung auf unvorhersehbare Zielbewegung | **100 ± 5 ms** (Ziele ≥ 5°/s); feste Verarbeitungszeit 98 ms, bei langsamen Zielen länger (Mindestweg 0,028°) | Carl & Gellman 1987, 10.1152/jn.1987.57.5.1446 | 402–407 |
| F02 | Anfangsbeschleunigung der Folgebewegung | ≈ **50°/s²** bei 10°/s Zielgeschwindigkeit, darüber kaum mehr; keine präsakkadische Folgebewegung, wenn die Bildbewegung **15° neben der Fovea** beginnt | Carl & Gellman 1987 | 401, 408 |
| F03 | Folgebewegung setzt aus ≈ 100 ms Bewegungsinformation (Areal MT) eine schnelle Einleitung um | **≈ 100 ms** | Lisberger 2010, 10.1016/j.neuron.2010.03.027 | alle |
| F04 | Auge erreicht eine neue Folgegeschwindigkeit | in **≈ 130 ms**; Steuerung kontinuierlich, nicht abgetastet | Robinson 1965 (✓S), 10.1113/jphysiol.1965.sp007718 | 403 |
| F05 | Glatter Gain beim Gesunden | **immer < 0,95**, sinkt mit steigender Zielgeschwindigkeit; Netzhautfehler-SD **0,2–1,3°**, etwa proportional zur Geschwindigkeit | Collewijn & Tamminga 1984, 10.1113/jphysiol.1984.sp015242 | 402–407 |
| F06 | Strukturierter Hintergrund hemmt Folgebewegung | horizontal **−10 %**, vertikal **−20 %** (durch mehr Sakkaden ausgeglichen); horizontal etwas glatter als vertikal | Collewijn & Tamminga 1984 | alle (Scanlines, Neon) |
| F07 | Obergrenze der Folgegeschwindigkeit | ≈ **90 % Gain bis 100°/s** (4 von 5 Personen), eine Person nur 60 % | Meyer, Lasker & Robinson 1985 (docs 02), 10.1016/0042-6989(85)90160-9 | 404 (Tempo 9×) |
| F08 | Periodische Dreieck- und Sinusbahnen | lineares Verhalten bis **75°/s** mit Gain **≈ 0,9**; bei gleichförmigen Rampen Sättigung je nach Amplitude | Buizza & Schmid 1986, 10.1007/BF00236858 | 403, 405, 406 |
| F09 | Horizontal vs. vertikal (Sinus, Dreieck, diagonal, Kreis) | Gain horizontal **> vertikal** bei allen 5 Personen | Rottach et al. 1996, 10.1016/0042-6989(95)00302-9 | 402, 403, 405, 406, 408 |
| F10 | Richtungsasymmetrien | **abwärts > aufwärts** (Beschleunigung, Spitzengeschwindigkeit, Gain, weniger Aufholsakkaden), horizontal > vertikal; n = 20 und 22 | Ke, Lam, Pai & Spering 2013, 10.1167/iovs.12-11369 | 403, 405, 406, 408 |
| F11 | Kontrast | unterhalb **2–3 × Kontrastschwelle** sind Gain, Beschleunigung, Latenz und Positionsgenauigkeit stark beeinträchtigt; Gain steigt mit Kontrast (1, 8, 15°/s) | Spering et al. 2005, 10.1167/5.5.6 | alle (Farbe, Tagmodus) |
| F12 | Kleine Ziele | ein kleiner Punkt erzeugt geringere Beschleunigung und **mehr Aufholsakkaden** als größere Objekte; am meisten, wenn das Objekt in die Fovea passt | Heinen, Potapchuk & Watamaniuk 2016, 10.1152/jn.00774.2015 | alle (16 px ≈ 0,4°) |
| F13 | Auslöser von Aufholsakkaden | keine Sakkade bei „Kreuzungszeit“ **40–180 ms**; sonst Sakkade nach **≈ 125 ms** | de Brouwer et al. 2002 (W14), 10.1152/jn.00432.2001 | 403–407 |
| F14 | Sakkadendauer | steigt um **≈ 2,7 ms pro Grad** Amplitude (n = 25) | Baloh et al. 1975, 10.1212/WNL.25.11.1065 | 401, 408 |
| F15 | Sakkadenlatenz (Gap-Paradigma) | zweigipflig: Express-Sakkaden **≈ 100 ms**, reguläre **≈ 150 ms** | Fischer & Ramsperger 1984, 10.1007/BF00231145 | 401, 408 |
| F16 | Sakkadische Suppression | Empfindlichkeitsminderung vor allem im **magnozellulären** System plus Raumverzerrung um die Sakkade | Ross et al. 2001, 10.1016/S0166-2236(00)01685-4 | 401, 408 |

### B2. Vorhersage und periodische/gekrümmte Bahnen

| # | Aussage | Zahl | Quelle | Nr. |
|---|---|---|---|---|
| F17 | Niederfrequente Sinusbewegung wird ohne Verzögerung oder mit kleinem Vorlauf verfolgt; Vorhersageanteil am größten bei einfachster Bahn (Summe zweier Sinus, 2D) | Zeitversatz **0** oder leichter Vorlauf | Soechting, Rao & Juveli 2010, 10.1371/journal.pone.0012574 | 402, 403, 404 |
| F18 | Lernen innerhalb weniger Wiederholungen: Einzelzyklus-Sinus | Verzögerung **121 ms** beim ersten, **43 ms** ab dem zweiten Durchgang (Periode 0,8 s); Auge setzt erwartete Bewegung ≥ **205 ms** fort, auch wenn das Ziel stoppt | Barnes, Barnes & Chakraborti 2000, 10.1152/jn.2000.84.5.2340 | 403, 407 |
| F19 | Vorhersagbarkeit hängt an der **höchsten Frequenzkomponente** | Gain **0,92** (höchste Komponente 0,39 Hz) → **0,53** (1,56 Hz); Spitzengeschwindigkeit je Komponente ±3,3°/s | Barnes, Donnelly & Eason 1987 (docs 02), 10.1113/jphysiol.1987.sp016649 | 403, 404 („Zufallstempo“) |
| F20 | Regelmäßige Reize: „adaptiver Prädiktor“ überwindet Systemverzögerung | qualitativ | Stark et al. 1962 (W10, ✓S) | 403 |
| F21 | Antizipatorische Folgebewegung folgt der **Erwartung** (Hinweisreiz), überstimmt Gewohnheit; Signal kombiniert aktuelle und für die nächsten **einige hundert ms** erwartete Bewegung | qualitativ | Kowler 1989 (W19 korr.), 10.1016/0042-6989(89)90052-7 | 407 |
| F22 | Antizipation bleibt auch bei zufälligem Startzeitpunkt | Zentrierungsstrategie (≈ Fehlerminimierung) | Heinen, Badler & Ting 2005, 10.1167/5.6.1 | 403, 407 („Zufallstempo“) |
| F23 | Zwei-Drittel-Potenzgesetz gilt auch für 2D-Folgebewegung: Ellipsen werden am genauesten verfolgt, wenn das Ziel dem Gesetz folgt; das Auge folgt dem Gesetz auch sonst | qualitativ (3 Experimente) | de'Sperati & Viviani 1997, 10.1523/JNEUROSCI.17-10-03932.1997 | 402, 404 |
| F24 | Handbewegung beim Zeichnen: Geschwindigkeit steigt mit dem Krümmungsradius (Winkelgeschwindigkeit ≈ konstant) | Potenzgesetz (Exponent 2/3) | Lacquaniti, Terzuolo & Viviani 1983 (✓S), 10.1016/0001-6918(83)90027-6 | 402, 404, 405, 406 |

### B3. Richtungswechsel, Ecken, Knickpunkte

| # | Aussage | Zahl | Quelle | Nr. |
|---|---|---|---|---|
| F25 | Unvorhersehbarer abrupter Richtungswechsel | Geschwindigkeit sinkt nach **90 ms**, Richtung ändert sich ab **130 ms**; Antwort = Vektorsumme „Stopp alt“ + „Start neu“ | Soechting, Mrotek & Flanders 2005, 10.1007/s00221-004-2010-2 | 405, 406 |
| F26 | Auge und Hand drehen nach Richtungswechsel ähnlich langsam auf die neue Richtung; Rate proportional zur Größe des Wechsels; beide werden vorher langsamer | gleiche Dynamik trotz sehr verschiedener Trägheit | Engel, Anderson & Soechting 2000, 10.1152/jn.2000.84.3.1149 | 405, 406 |
| F27 | Rautenbahn: antizipatorische Richtungsfehler der Augen an den Ecken | qualitativ | Collewijn & Tamminga 1984 | 405, 406 |

### B4. Verdeckung und Vorhersage ohne Sicht

| # | Aussage | Zahl | Quelle | Nr. |
|---|---|---|---|---|
| F28 | Ziel verschwindet | Abbremsen beginnt **≈ 190 ms** danach, dauert **≈ 280 ms**; Restgeschwindigkeit **≈ 60 %** (gleiches Tempo in allen Durchgängen) bzw. **55/47/39 %** bei zufälligem 5/10/20°/s; bleibt bis **4 s** erhalten; **300 ms** Sicht reichen zur Geschwindigkeitsschätzung | Becker & Fuchs 1985, 10.1007/BF00237843 | 407 |
| F29 | fMRI bei 1 s Ausblendung (10°/s, n = 16) | Restgeschwindigkeit **≈ 30 %**; Mehraktivität in FEF, SEF/prä-SEF, oberem Parietallappen, IPS, prämotorischem Kortex, DLPFC, Kleinhirn, Basalganglien | Lencer et al. 2004, 10.1111/j.1460-9568.2004.03229.x | 407 |
| F30 | Geschwindigkeit wird nicht gehalten; antizipatorische Wiederbeschleunigung vor erwartetem Wiederauftauchen | **7 von 9** Personen; fester Zeitpunkt → bei **900 ms** Pause zu früh | Bennett & Barnes 2003 (W18 korr.), 10.1152/jn.01145.2002 | 407 |
| F31 | Sakkaden gleichen die Variabilität der glatten Verschiebung während der Verdeckung aus → Blickposition beim Wiederauftauchen unabhängig von der glatten Strecke | qualitativ | Orban de Xivry et al. 2006, 10.1152/jn.00596.2005 | 407 |
| F32 | Gekrümmte Bahn hinter Verdeckung | Zeigen: meist **geradlinige** Extrapolation; Blick: Krümmung wird bei reduzierter Geschwindigkeit fortgeführt, Winkelgeschwindigkeit **≈ 200 ms** gehalten | Mrotek & Soechting 2007, 10.1007/s00221-006-0717-y | 407 |
| F33 | Extrapolationsurteile unterscheiden sich bei Fixation vs. freien Augenbewegungen; Blick während der Verdeckung hängt mit Urteil zusammen (auch Mikro-Blickverlagerungen < 2°) | qualitativ | Makin & Poliakoff 2011, 10.1080/17470218.2010.548562 | 407 |
| F34 | Lernbarkeit bei Verdeckung (Belohnung) | Gain **0,59 → 0,89** nach **8–10** Tagessitzungen; Kontrollen 0,60 → 0,63 bzw. 0,63 → 0,71; Übertragung auf untrainierte Geschwindigkeiten | Madelain & Krauzlis 2003 (docs 02), 10.1152/jn.00869.2002 (Spezies im Abstract nicht genannt) | 407 |

### B5. Aufmerksamkeit während der Blickfolge, Peripherie

| # | Aussage | Zahl | Quelle | Nr. |
|---|---|---|---|---|
| F35 | Aufmerksamkeitsfordernde Zweitaufgaben verschlechtern die Folgebewegung | geringere Geschwindigkeit, größerer Positionsfehler (2 Experimente) | Hutton & Tegally 2005, 10.1007/s00221-004-2171-z | 401, 408 |
| F36 | Aufmerksamkeit auf periphere Objekte senkt den Gain stark, wenn (a) beachtet, (b) salientes Ereignis (Onset) und (c) Netzhautbewegung – auch bei einfacher manueller Entdeckung | qualitativ | Kerzel, Souto & Ziegler 2008, 10.1016/j.visres.2008.01.015 | **401** |
| F37 | Hauptfokus der Aufmerksamkeit liegt beim verfolgten Ziel, ohne Vor- oder Nachlauf; Hinweisreize verschieben ihn nur teilweise | qualitativ | Lovejoy, Fowler & Krauzlis 2009, 10.1016/j.visres.2009.01.011 | 401 |
| F38 | Reaktionen (Sakkade und Taste) auf Lichtblitze **vor** dem verfolgten Ziel schneller als dahinter – über das halbe Gesichtsfeld | qualitativ | Khan et al. 2010, 10.1167/10.13.7 | 401 (Ping-Ort) |
| F39 | Zentrale (foveale) Zusatzlast → echter Tunnelblick (Wechselwirkung mit Exzentrizität); auditive Last → allgemeine Störung | qualitativ | Ringer et al. 2016, 10.1167/16.2.7 | 401 |
| F40 | Plötzlich erscheinende Objekte fangen den Blick | in **≈ 30–40 %** der Durchgänge (Sekundärangabe) | Theeuwes et al. 1998 (✓S), 10.1111/1467-9280.00071 | 401 |
| F41 | Einfache Reaktionszeit und Exzentrizität | Sprung innerhalb der ersten **10°**, danach **+8–12 ms pro 10°** (Perimeter bis 50°, nur **2** geübte Personen); größere Reize schneller | Osaka 1976, 10.4992/psycholres1954.18.183 | 401 |
| F42 | Leistungsfelder | horizontaler Meridian besser als vertikaler; am vertikalen Meridian **unten besser als oben**; Asymmetrie verschwindet > **30°** Polarwinkel vom Meridian | Abrams, Nizam & Carrasco 2012, 10.1016/j.visres.2011.10.016 | 401 (Quadranten-Auswertung) |
| F43 | Bewegung in der Peripherie | Geschwindigkeitsunterscheidung **≈ 6 %**, zentral wie peripher; Schwellen für Relativbewegung überall kleiner als die Auflösungsgrenze | McKee & Nakayama 1984, 10.1016/0042-6989(84)90140-8 | 401, 408 |
| F44 | Fotorezeptoren | **4,6 Mio.** Zapfen, **92 Mio.** Stäbchen; stäbchenfreie Zone **0,35 mm = 1,25°**; Zapfendichte fällt innerhalb **1 mm** um eine Zehnerpotenz | Curcio et al. 1990, 10.1002/cne.902920402 | 401, 408 |
| F45 | Größe der Fovea | **1,5 mm ≈ 5,2°** (Umrechnung 288 µm/°) | Kolb, Webvision (Web) | 408 |
| F46 | Gesichtsfeld horizontal | **≈ 200°** (bis 214°); ein 11″-Tablet bei 40 cm reicht nur ≈ 16° zur Seite | Strasburger et al. 2011 (docs 01), 10.1167/11.5.13 | 401 |
| F47 | Peripherie-Trainingsgeräte im Sport | **93** Studien zu 5 Geräten, **keine** prüfte per Eyetracking, ob überhaupt peripher gesehen wurde | Vater & Strasburger 2021 (docs 01), 10.1097/OPX.0000000000001732 | 401 |
| F48 | Verdecktes Orientieren (Posner) verbessert die Entdeckung am beachteten Ort ohne Blickbewegung | qualitativ | Posner 1980 (W1, ✓S) | 401 |

### B6. Zwei Ziele, geteilte Aufmerksamkeit

| # | Aussage | Zahl | Quelle | Nr. |
|---|---|---|---|---|
| F49 | Paralleles Verfolgen mehrerer Objekte | bis **5 von 10**; **87 %** richtig vs. ≤ 40 % bei seriellem Abtasten | Pylyshyn & Storm 1988 (W20) | 408 |
| F50 | Halbfelder unabhängig | **doppelt** so viele Ziele bei Verteilung links/rechts | Alvarez & Cavanagh 2005 (W21 korr.), 10.1111/j.1467-9280.2005.01587.x | 408 |
| F51 | Schon 1 → 2 Ziele senkt die Grenzgeschwindigkeit | um **≈ 30 %** (n = 12) | Alvarez & Franconeri 2007 (docs 02), 10.1167/7.13.14 | 408 |
| F52 | Zeitliche Auflösung beim Tracking | **7 Hz** (1 Ziel) → **4 Hz** (2) → 2,6 Hz (3) | Holcombe & Chen 2013 (docs 02), 10.1167/13.1.12 | 408 |
| F53 | Blick ins Zentrum der Zielgruppe hilft beim Mehrfach-Tracking | qualitativ | Fehd & Seiffert 2010 (docs 02), 10.1167/10.4.19 | 408 |
| F54 | Gruppierung der Ziele zu einem „virtuellen Objekt“ verbessert das Tracking | 7 Experimente | Yantis 1992, 10.1016/0010-0285(92)90010-Y | 408 |
| F55 | Geteilte Aufmerksamkeitsfoki möglich, stärker über Halbfelder hinweg | Hinweisvalidität 80 %, 5 × 5-Feld | Awh & Pashler 2000 (W22) | 408 |
| F56 | Actionspieler | ≈ **2 Objekte mehr** im MOT | Green & Bavelier 2006 (W24 korr.), 10.1016/j.cognition.2005.10.004 | 408 |
| F57 | Metaanalyse Actionspiele | Querschnitt **g = 0,55**, Intervention **g = 0,34**; Publikationsbias: veröffentlichte Effekte ≈ **30 %** zu groß | Bediou et al. 2018, 10.1037/bul0000130 | 408 |
| F58 | Metaanalyse Videospieltraining | kleine bis **Null**-Effekte auf kognitive Fähigkeiten (k = 359 Trainingseffekte); kein Kausalnachweis | Sala, Tatlidil & Gobet 2018, 10.1037/bul0000139 | 408 |
| F59 | Pseudoneglect (leichte Linksverschiebung Gesunder) | Effektstärke **−0,37 bis −0,44** (73 Studien, 2 191 Personen); Ältere eher nach rechts | Jewell & McCourt 2000, 10.1016/S0028-3932(99)00045-7 | 401, 408 |
| F60 | Augendominanz | etwa **1 von 3** linksäugig (36,5 % im Modell), 1 von 10 linkshändig | Bourassa, McManus & Bryden 1996, 10.1080/713754206 | 408 |

### B7. Neurowissenschaft (Netzwerk der Folgebewegung)

| # | Aussage | Zahl | Quelle | Nr. |
|---|---|---|---|---|
| F61 | Kernareale beim Menschen: V5/MT, frontales (FEF) und supplementäres Augenfeld (SEF) | – | Lencer & Trillenberg 2008, 10.1016/j.bandc.2008.08.013 | alle |
| F62 | Weg: V1/MT → MST, VIP, FEF, SEF → Brückenkerne → Kleinhirn (Flocculus/Paraflocculus; hinterer Vermis) → Augenmuskelkerne; FEF liefert antizipatorische Signale, Vermis passt die Einleitung an | – | Ilg & Thier 2008, 10.1016/j.bandc.2008.08.014 | alle |
| F63 | Pursuit-Areal des FEF mit direktestem Einfluss; auch Basalganglien, Colliculus superior; gemeinsame Architektur mit Sakkaden | – | Krauzlis 2004 (W9) | alle |
| F64 | Läsionen in MT stören die Anpassung der Folgegeschwindigkeit an das Ziel, nicht Sakkaden zu ruhenden Zielen (Affe) | – | Newsome et al. 1985, 10.1523/JNEUROSCI.05-03-00825.1985 | 402–407 |
| F65 | Läsion Vermis VI–VII (Affe) | Gain bei Dreieckbahn **−15 %**; Spitzenbeschleunigung z. B. **650 → 220–380°/s²**; Anpassungsfähigkeit gestört | Takagi, Zee & Tamargo 2000, 10.1152/jn.2000.83.4.2047 | 405, 406 |
| F66 | Arbeitsgedächtnis für Bewegungsrichtung v. a. in SEF, dorsalem Vermis, kaudalem Fastigialkern; Bewegungsvorbereitung im kaudalen FEF; Parkinson: Defizit bei der Vorbereitung | – | Fukushima et al. 2013, 10.3389/fnsys.2013.00004 | 407 |
| F67 | Kleinhirnplastizität beim Pursuit-Lernen (Complex Spikes → Abschwächung der Simple-Spike-Antwort im nächsten Durchgang) | Affen, Einzelzellen | Medina & Lisberger 2008, 10.1038/nn.2197 | 403–407 |
| F68 | PPRF (horizontal) und riMLF (vertikal) gelten als Hirnstamm-Generatoren für **Sakkaden** | – | Sparks 2002 (✓B), 10.1038/nrn986 | 403, 406 |
| F69 | Zwei Verarbeitungspfade: ventral (Erkennen), dorsal-parietal (Handlungssteuerung) | – | Goodale & Milner 1992, 10.1016/0166-2236(92)90344-8 | 401 |

### B8. Auge-Hand-Koordination, manuelles Tracking, Eingabegerät, Anzeige

| # | Aussage | Zahl | Quelle | Nr. |
|---|---|---|---|---|
| F70 | Mitführen der Hand glättet die Augenfolgebewegung bei vorhersagbarem Sinus | bei Sinus **> 1 Hz** nur wenige kleine Sakkaden mit Hand, mehr/größere ohne; kein Unterschied bei Pseudozufall | Koken & Erkelens 1992, 10.1007/BF00228195 | 402–404 |
| F71 | Zeigerführung (Cursor) erhöht Pursuit-Gain und senkt Aufholsakkaden gegenüber reinem Blickfolgen; mittlerer Blick–Ziel-Abstand gleich | qualitativ | Danion & Flanagan 2018, 10.1038/s41598-018-28434-6 | alle |
| F72 | Pseudozufällige Bewegung: Augen-Gain/Phase mit und ohne Hand gleich; Auge und Hand hoch korreliert; Einbruch durch höchste Frequenz bzw. deren Amplitude | n = 9 | Xia & Barnes 1999, 10.1080/00222899909601889 | 403, 404 |
| F73 | Manuelles Tracking ist intermittierend | Leistungsspitzen **0,5–1,8 Hz**; Fehler-Totzone **≈ 0,8°**; ≈ **170 ms** Refraktärzeit zwischen Korrekturen | Miall, Weir & Stein 1993, 10.1080/00222895.1993.9941639 | alle |
| F74 | Tremor | physiologischer Tremor multifaktoriell mit zentraler Komponente um **10 Hz**; Parkinsontremor **3–6 Hz** | McAuley & Marsden 2000, 10.1093/brain/123.8.1545 | alle (ruhige_hand, tremor_parkinson) |
| F75 | Verzögerung (Lag) verschlechtert Zeigeaufgaben | bei **225 ms**: Bewegungszeit **+64 %**, Fehler **+214 %**; Lag wirkt multiplikativ auf den Fitts-Index | MacKenzie & Ware 1993, 10.1145/169059.169431 | alle |
| F76 | End-zu-End-Latenz realer Geräte | Touch **48–276 ms**; iPad Air 2 nativ 48 ms, Safari-Canvas **77 ms**; bestes Desktop-System **21 ms** (1000-Hz-Maus, 120 Hz); Ziehen leidet ab **> 25 ms**, indirekte Eingabe ab > 50 ms | Casiez et al. 2017, 10.1145/3126594.3126606 | alle (Tablet) |
| F77 | Kalibrierter Laboraufbau | 60-Hz-LCD **11,0 ms**, Gaming-Maus 1 kHz **6,8 ms**, gesamt **17,8 ms**; übliche Maustreiber **≥ 20 ms** | Woods et al. 2015 (W6) | alle |
| F78 | Latenz wichtiger als Bildrate | geringere Latenz deutlich vorteilhaft; Bildrate > 60 Hz bei gleicher Latenz nur geringer Effekt (bei manchen Tracking-Aufgaben marginal) – 8 E-Sportler | Spjut et al. 2019, 10.1145/3355088.3365170 | alle („144/240 Hz“-Aussagen) |

### B9. Lernen und Trainierbarkeit

| # | Aussage | Zahl | Quelle | Nr. |
|---|---|---|---|---|
| F79 | Kurztraining mit quasi-zufälliger Zielbewegung verbessert die geschlossene Folgebewegung dauerhaft | **2 × 6 min an 3 Tagen**, Effekt nach **5 Tagen** noch vorhanden; n = 10 + 10 Kontrollen | Eibenberger, Ring & Haslwanter 2012 (docs 02), 10.1007/s00221-012-3009-8 | 402–407 |
| F80 | Vorhersagbare Wellenformen werden schnell gelernt | Fehler **0,5 → 0,1 deg²** in 100–200 s | McHugh & Bahill 1985 (docs 02; PubMed 4008209, keine DOI) | 402–404 |
| F81 | Implizites Lernen eines wiederholten Bahnabschnitts beim manuellen Tracking | Fehler im wiederholten Segment kleiner als im zufälligen (Tag 5) – ohne bewusstes Wissen | Wulf & Schmidt 1997 (✓S), 10.1037/0278-7393.23.4.987 | 402–406 |
| F82 | Replikation gescheitert | 2 konzeptuelle Replikationen ohne Effekt; Effekt nur mit dem Original-Segment – das vermutlich **leichter** zu verfolgen war | Chambaron et al. 2006, 10.1080/17470210500198585 | 402–406 |

### B10. Alter, Zustand, Messzuverlässigkeit

| # | Aussage | Zahl | Quelle | Nr. |
|---|---|---|---|---|
| F83 | Alter | 75–93 vs. 18–43 J.: Gain bei **allen** Geschwindigkeiten niedriger, Unterschied wächst mit Tempo und Beschleunigung; mehr Streuung innerhalb eines Tests | Moschner & Baloh 1994 (docs 02), 10.1093/geronj/49.5.M235 | alle |
| F84 | Entwicklung | Folgebewegung erreicht bis zur **späten Adoleszenz** Erwachsenenniveau; Präadoleszente noch schlechter | Katsanis, Iacono & Harris 1998, 10.1111/1469-8986.3510064 | alle (Kinder) |
| F85 | Zuverlässigkeit von Augenbewegungsmaßen (im Labor mit Eyetracker) | > **1 000** junge Erwachsene, 10 % nach median **18,8 Tagen** erneut getestet: Latenzen, Genauigkeiten, Geschwindigkeiten „sehr reliabel“ | Bargary et al. 2017, 10.1016/j.visres.2017.03.001 | alle (Messgrößen) |
| F86 | Schlafentzug (1 Nacht, n = 32) | geringerer Pursuit-Gain, mehr Sakkaden (0,2 Hz), mehr Streuung | Meyhöfer et al. 2017, 10.1177/0269881116675511 | alle (Tagesform) |
| F87 | Frühkindliches Schielen | Folgebewegung nasal-temporal und auf-ab asymmetrisch (bei einäugigem Sehen) | Tychsen & Lisberger 1986, 10.1523/JNEUROSCI.06-09-02495.1986 | alle (schielen_binokular) |

### B11. Optik und Optiker-Bezug

| # | Aussage | Zahl | Quelle | Nr. |
|---|---|---|---|---|
| F88 | Gleitsicht am Bildschirm (60 cm): klares Zwischenfeld | PAL **13–18°** horizontal vs. **60°** Einstärke; längere Augenbewegungen, spätere Blickstabilisierung, längere Kopfbewegungen (n = 11, 45–71 J.) | Han et al. 2003, 10.1167/iovs.02-0507 | alle, v. a. 402, 403, 405, 406, 408 |
| F89 | Neue Gleitsichtträger nutzen mehr Kopfbewegungen (Blitz-Diskrimination 2 m/40 cm, Lesen) | n = 10, Crossover | Hutchings et al. 2007, 10.1111/j.1475-1313.2006.00460.x | alle |
| F90 | Alterssichtigkeit weltweit | **1,8 Mrd.** Menschen (25 %) 2015 | Fricke et al. 2018, 10.1016/j.ophtha.2018.04.013 | alle |
| F91 | Rot-Grün-Farbsehschwäche | ≈ **8 %** der Männer, **0,4 %** der Frauen (europäisch) | Birch 2012, 10.1364/JOSAA.29.000313 | 401, 408 (Farbwahl) |
| F92 | Lidschlag bei Bildschirmarbeit (50 cm, 15 min) | **11,6/min**; unvollständige Lidschläge **16,1 %** im Mittel, korrelieren mit Beschwerden; erzwungene 23,5/min senkten Beschwerden nicht | Portello, Rosenfield & Chu 2013, 10.1097/OPX.0b013e31828f09a7 | alle |
| F93 | 20-20-20-Erinnerungen (2 Wochen, n = 29) | weniger Beschwerden, aber **keine** Änderung von Binokularwerten (außer Akkommodations-Flexibilität) oder Tränenfilm; Effekt nach 1 Woche weg | Talens-Estarelles et al. 2023, 10.1016/j.clae.2022.101744 | 402 |
| F94 | Sehabstand am Smartphone | Nicht-Presbyope **33,4 cm**, Presbyope **39,7 cm** | Boccardo et al. 2023 (docs 02), 10.1371/journal.pone.0282947 | alle (Tablet) |

### B12. Sicherheit und Aussagen zu Lesen/Lernen

| # | Aussage | Zahl | Quelle | Nr. |
|---|---|---|---|---|
| F95 | Lichtausgelöste Anfälle | ≈ **1 : 10 000**, bei 5–24-Jährigen ≈ **1 : 4 000**; am stärksten **15–25 Hz**; viele Betroffene wissen es nicht | Fisher et al. 2005 (docs 03), 10.1111/j.1528-1167.2005.31405.x | 401 (Pings), alle (Neon) |
| F96 | WCAG 2.2 SC 2.3.1 | höchstens **3 Blitze/s** oder unter Blitzschwellen; Fläche ≤ 0,006 sr (≈ 10°-Feld) | W3C WCAG 2.2 (docs 03) | 401 |
| F97 | „Visual vertigo“: Menschen mit Gleichgewichtsstörung und hoher visueller Abhängigkeit reagieren auf bewegte Seheindrücke mit Schwindel | n = 15; 13 peripher-vestibulär | Bronstein 1995, 10.1136/jnnp.59.5.472 | alle (schwindel_vestibulaer) |
| F98 | Pursuit-/Tracking-Übungen sind keine wirksame Behandlung von Lernstörungen/Legasthenie | Konsenspapier AAP/AAO u. a. | Handler & Fierson 2011, 10.1542/peds.2010-3670 | 402, 403 |
| F99 | Brain Gym® (inkl. „Lazy 8s“) | Review: Behauptungen nicht gestützt; nur 5 begutachtete Artikel | Hyatt 2007 (✓S), 10.1177/07419325070280020201 | 402 |
| F100 | Lesen beruht auf Sakkaden, Fixationen und perzeptueller Spanne | Übersicht | Rayner 1998, 10.1037/0033-2909.124.3.372 | 402 |

### B13. Transfer (Übersichten, Metaanalysen)

| # | Aussage | Zahl | Quelle | Nr. |
|---|---|---|---|---|
| F101 | Digitales Sport-Sehtraining: große Effekte vor allem bei gerätegleichem Test | 33 RCTs, 1 048 Personen; visuelle Aufmerksamkeit **SMD 1,65** mit vs. **0,07** ohne „Lerneffekt“ | Guo, Yuan, Yang & Qiu 2025 (docs 02), 10.3389/fphys.2025.1664572 | alle |
| F102 | Sehtraining bei Athleten (RCTs): Entscheidungszeit und sportspezifische Leistung | 27 RCTs, 669 Personen; **SMD 0,85** (Entscheidungszeit), **0,49** (Sportleistung, I² = 61 %) | Guo, Chen, Peng, Deng & Yuan 2025, 10.1111/sms.70140 | alle (Gegenposition) |
| F103 | Kein Beleg für Ferntransfer allgemeinen Wahrnehmungstrainings auf Sportleistung – Gegenrede „begrenzte Evidenz ≠ keine Evidenz“ | Kommentar + Replik | Fransen 2024 (docs 02), 10.1007/s40279-024-02060-x; Appelbaum et al. 2025, 10.1007/s40279-024-02141-x | alle |
| F104 | „Brain-Training“: Verbesserung der geübten Aufgabe, kaum Belege für Ferntransfer | Übersicht | Simons et al. 2016 (docs 02), 10.1177/1529100616661983 | alle |
| F105 | Folgebewegungstraining in der Neuroreha (Neglect) randomisiert untersucht – nur Einordnung, keine Aussage für Gesunde oder diese Übungen | RCT | Kerkhoff et al. 2013 (docs 02), 10.1177/1545968313491012 | – |

---

## C) Evidenz-Zusammenfassung

### C1. Was die Übungen tatsächlich fordern
1. **Glatte Blickfolge plus Aufholsakkaden** (F01–F16): Latenz ≈ 100 ms, Gain < 0,95, Sakkaden sind normaler
   Bestandteil. Vertikal/aufwärts schwerer (F09, F10), kleiner Punkt fördert Sakkaden (F12), niedriger Kontrast
   und strukturierter Hintergrund verschlechtern (F06, F11).
2. **Vorhersage** (F17–F24, F28–F34): Periodische Bahnen (402–404) werden in Sekunden gelernt, die
   Restverzögerung sinkt deutlich, bei niedrigen Frequenzen bis ≈ 0 (F17, F18). „Zufallstempo“ zerstört diesen
   Vorteil, je nach höchster Frequenz (F19). Ecken (405, 406) erzwingen Reaktionen mit 90–130 ms Latenz (F25);
   bei wiederholter Form gibt es antizipatorisches Verhalten (F27). Bei Verdeckung (407) fällt die
   Augengeschwindigkeit auf ≈ 30–60 % (F28, F29) – „latenzfreies Durchgleiten“ ist nicht realistisch.
3. **Manuelles Nachführen** (F70–F78): Da nur der Zeiger gemessen wird, bestimmen Auge-Hand-Koordination,
   intermittierende Handkorrekturen (0,5–1,8 Hz, ≈ 170 ms), Tremor und Geräte-Latenz (21–276 ms) das Ergebnis.
   Die Hand kann die Augenfolge sogar unterstützen (F70, F71).
4. **401 und 408** sind **Doppelaufgaben**: Zentrales Verfolgen + periphere Entdeckung bzw. zwei Ziele. Zweitaufgaben
   und beachtete Randreize senken den Pursuit-Gain (F35, F36); periphere Reaktionen sind langsamer (F41), Onsets
   ziehen den Blick (F40). Zwei Ziele links/rechts nutzen die Halbfeld-Unabhängigkeit (F50), aber jedes weitere
   Ziel senkt Tempo- und Zeitauflösungsgrenzen (F51, F52).

### C2. Trainierbarkeit und Transfer – Einschätzung je Übung (Vorschlag für das Feld `evidenz`)

| Nr. | Übungseffekt | Naher Transfer | Alltagstransfer | Begründung (kurz) |
|---|---|---|---|---|
| 401 | **mittel** (plausibel; ähnliche Doppel-/UFOV-Aufgaben zeigen robuste Übungseffekte, diese Aufgabe nicht untersucht) | **schwach** | **fehlend** | Peripherie-Tools ohne Eyetracking-Kontrolle (F47); UFOV-Befunde betreffen ein anderes Protokoll (docs 03); Website selbst: kein Gesichtsfeld-/Unfallnutzen |
| 402 | **mittel** (Pursuit-Kurztraining im Labor: F79, F80; mit Zeiger: motorisches Lernen) | **schwach** | **fehlend** | Lese-/Lernstörungs-Nutzen ausdrücklich nicht belegt (F98–F100) |
| 403 | **mittel** | **schwach** | **fehlend** | schnelle Vorhersage-Lerneffekte (F18); Sportnutzen unbelegt (F101–F104) |
| 404 | **mittel** | **schwach** | **fehlend** | wie 402/403; Lissajous-Bahn = Summe von Sinus (F17) |
| 405 | **mittel** (plausibel) | **schwach** | **fehlend** | Richtungswechsel-Latenz wenig veränderbar; Lernen v. a. durch Vorhersage der Knickstellen bei fester Bahn |
| 406 | **mittel** (plausibel) | **schwach** | **fehlend** | wie 405 |
| 407 | **mittel** (Verdeckungs-Gain lernbar: F34, allerdings mit Belohnung und 8–10 Sitzungen) | **schwach** (F34: Übertragung auf untrainierte Geschwindigkeiten) | **fehlend** | „Vorhaltemaß im Shooter/Ballsport“ unbelegt |
| 408 | **mittel** (MOT-Aufgaben sind gut übbar, docs 02) | **schwach** | **fehlend** | Videospiel-Metaanalysen uneinheitlich (F57, F58); Transfer MOT → Sport schwach (docs 02) |

Allgemein: Die Studienlage zur **glatten Blickfolge bei Gesunden** besteht aus kleinen Laborstudien mit
Eyetracker (n ≈ 10–20). Für **Browser-Übungen mit Maus/Touch** gibt es **keine** Trainingsstudie. Große Effekte
digitaler Sehtrainings entstehen vor allem, wenn Training und Test gleich sind (F101). Eine neuere Metaanalyse
findet moderate Effekte auf Entscheidungszeit und Sportleistung (F102), meist für sportspezifische Programme –
nicht für einfache Blickfolge-Drills. Kein Beleg für Lese-, Legasthenie- oder „Augenmuskel-Fitness“-Nutzen (F98,
F99).

### C3. Hinweise für die Anforderungsprofile (Vorschläge, Entscheidung bei den Autor:innen)
- `stereosehen` = 0 für alle (Bildschirm). `naharbeit_dauer` = 1 (30–120 s), bei langen Sitzungen/kleinem Ziel ggf. 2.
- `blickfolge`: 402–407 = 3; 401 = 3 (zentrales Verfolgen) mit `peripheres_sehen` 3 und `geteilte_aufmerksamkeit` 2–3;
  408: `geteilte_aufmerksamkeit` 3, `peripheres_sehen` 2–3, `blickfolge` eher 1–2 (Mitte fixieren empfohlen; die
  Augen können ohnehin nur ein Ziel glatt verfolgen).
- `sakkaden`: 1–2 (Aufholsakkaden; bei 405/406 an Ecken eher 2; 401 Unterdrückung von Blicksprüngen → `fixation`/`inhibition` 2).
- `antizipation`: 403, 404 = 2; 405, 406 = 2; 407 = 3; 402 = 2.
- `kontinuierliche_steuerung` und `auge_hand_koordination`: bei Zeigerwertung 2–3 (vom Code abhängig).
- `sehschaerfe_detail`: 1 (16-px-Ziel ≈ 0,4° ist gut sichtbar; kleine Zielgröße erhöht Sakkaden F12).
- `bewegungsreize_schwindel`: 1 (kleines Ziel, kein Vollfeld; bei „Neon/Scanlines“ und hohem Tempo prüfen);
  `flimmern_lichtreize`: 401 je nach Ping-Dauer/-Frequenz 1–2, sonst 0–1 (Code prüfen: Frequenz ≤ 3/s, Fläche).
- `zeitdruck`: 1 (kontinuierliche Aufgabe, keine Reaktionszeitwertung) – bei 401 (schnelles Drücken) 2.

### C4. Vorsicht-/Auswahlhinweise mit Begründung (für `vorsicht_bei`)
- `presbyopie_gleitsicht` (alle): klares Zwischenfeld der Gleitsicht nur 13–18° bei 60 cm (F88); breite Bahnen
  (402, 403, 405, 406, 408) führen durch die seitlichen Unschärfezonen → Kopf mitbewegen oder Arbeitsplatzbrille
  bzw. Bahn verkleinern. Nahteil liegt unten: vertikale Bahnen/Bildschirm unten besonders betroffen.
- `nystagmus`, `schielen_binokular`, `amblyopie`: Blickfolge ist bei diesen Bedingungen oft verändert (F87);
  Übung kann frustrieren; keine Diagnose ableiten.
- `schwindel_vestibulaer`, `reisekrankheit`: geringe Reizstärke (kleines Ziel), aber Personen mit visuellem
  Schwindel reagieren auf Bewegungsreize (F97); Website selbst rät bei Schwindel zum Abbruch.
- `photosensitive_epilepsie`, `migraene_lichtempfindlich`: 401 (Lichtimpulse), Neon-Effekte; WCAG-Grenzen (F95, F96).
- `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: konzentriertes Verfolgen, seltener/unvollständiger
  Lidschlag (F92); Pausen einplanen, 20-20-20 hilft subjektiv (F93).
- `tremor_parkinson`, `hand_arm_beschwerden`: Zeigerwertung + Dauerhalten der Maus (F73, F74); Parkinson verändert
  auch die Pursuit-Vorbereitung (F66).
- `aufmerksamkeitsprobleme`, `kognitive_einschraenkung`: 401, 408 (Doppelaufgabe), 407 (Vorhersage ohne Sicht).
- `farbsehschwaeche`: nur falls Farbe Information trägt (Farbwahl, Ping-Farbe) – F91.
- `kinder_unter_6`: Folgebewegung reift bis in die Adoleszenz (F84).

### C5. Optiker-Bezug (für Abschnitt 4/9 der Einträge)
- Sehabstand 50–70 cm = Zwischenbereich (1,4–2 dpt): Einstärken-Lesebrillen (meist für 40 cm) sind dafür oft zu
  stark, Gleitsicht zu schmal im Zwischenbereich (F88) → Arbeitsplatzbrille ist die passende Empfehlung (Hinweis,
  keine Studie zu diesen Übungen).
- Ältere halten Geräte weiter weg (F94) und haben niedrigeren Gain (F83): Tempo 0,5–1× und hoher Kontrast.
- Farbsehschwäche ≈ 8 % der Männer (F91): Zielfarbe nie als einzige Information.
- Kein Hinweis darf lauten, die Übung verbessere Sehkraft, Lesen, Augenmuskeln oder „baue Bildschirmmüdigkeit ab“.

### C6. Unsicherheiten
- Rashbass (1961), Robinson (1965), Stark et al. (1962), Bahill et al. (1980): Inhalte nur bibliografisch bzw. über
  maschinelle Kurzfassungen geprüft (keine Abstracts/Volltexte zugänglich).
- Theeuwes et al. (1998, 30–40 %) und Wulf & Schmidt (1997) nur über Sekundärangaben; Hyatt (2007) über
  ERIC-Zusammenfassung.
- Madelain & Krauzlis (2003): Spezies nicht im Abstract genannt – nicht als Menschenbefund zitieren, ohne es zu prüfen.
- Green & Bavelier (2006): Korrigendum 2020 vorhanden, Inhalt nicht eingesehen.
- Osaka (1976): nur 2 Personen – als Richtwert, nicht als Norm verwenden.
- Mechanik (Grundtempo, Ping-Dauer, Wertung) muss aus dem Code bestimmt werden; Aussagen in C3/C4 sind davon
  abhängig.

---

## D) Literaturliste (nur geprüfte Einträge)

### D1. Von der Website angegebene Quellen (korrigierte Angaben)

- Alvarez, G. A., & Cavanagh, P. (2005). Independent resources for attentional tracking in the left and right visual hemifields. *Psychological Science, 16*(8), 637–643. https://doi.org/10.1111/j.1467-9280.2005.01587.x – ✓A; **Website: falsche Zeitschrift und DOI** (408)
- Awh, E., & Pashler, H. (2000). Evidence for split attentional foci. *Journal of Experimental Psychology: Human Perception and Performance, 26*(2), 834–846. https://doi.org/10.1037/0096-1523.26.2.834 – ✓A (408)
- Bahill, A. T., Iandolo, M. J., & Troost, B. T. (1980). Smooth pursuit eye movements in response to unpredictable target waveforms. *Vision Research, 20*(11), 923–931. https://doi.org/10.1016/0042-6989(80)90073-5 – ✓S (403)
- Barnes, G. R. (2008). Cognitive processes involved in smooth pursuit eye movements. *Brain and Cognition, 68*(3), 309–326. https://doi.org/10.1016/j.bandc.2008.08.020 – ✓A (402, 403, 405, 406, 407)
- Bennett, S. J., & Barnes, G. R. (2003). Human ocular pursuit during the transient disappearance of a visual target. *Journal of Neurophysiology, 90*(4), 2504–2520. https://doi.org/10.1152/jn.01145.2002 – ✓A; **Website: falsche DOI** (407)
- „Bennett, S. J., & Barnes, G. R. (2006). Timing of predictive saccades during pursuit of targets undergoing angular trajectory changes. *Vision Research, 46*(17), 2736–2746.“ – **nicht auffindbar** (Crossref, PubMed); angegebene DOI gehört zu einer Farbkonstanz-Studie. Nicht zitieren. (405, 406)
- Cavanagh, P., & Alvarez, G. A. (2005). Tracking multiple targets with multifocal attention. *Trends in Cognitive Sciences, 9*(7), 349–354. https://doi.org/10.1016/j.tics.2005.05.009 – ✓A (408)
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – ✓A; **Website: Erstautorin falsch („A. J.“)** (405, 406)
- Eriksen, C. W., & St. James, J. D. (1986). Visual attention within and around the field of focal attention: A zoom lens model. *Perception & Psychophysics, 40*(4), 225–240. https://doi.org/10.3758/BF03211502 – ✓S (401)
- Findlay, J. M., & Walker, R. (1999). A model of saccade generation based on parallel processing and competitive inhibition. *Behavioral and Brain Sciences, 22*(4), 661–674. https://doi.org/10.1017/S0140525X99002150 – ✓A (401)
- Green, C. S., & Bavelier, D. (2006). Enumeration versus multiple object tracking: The case of action video game players. *Cognition, 101*(1), 217–245. https://doi.org/10.1016/j.cognition.2005.10.004 – ✓A; **Website: falsche DOI**; Korrigendum: *Cognition, 198*, 104198 (2020), https://doi.org/10.1016/j.cognition.2020.104198 (✓B) (408)
- „Heinen, S. J., Badler, J. B., & Ting, W. (2005). Timing and kinematics of saccadic decisions in smooth pursuit. *J Neurophysiol, 94*(4), 2638–2648.“ – **nicht existent**; DOI gehört zu einer Zebrafinken-Studie. Reale Arbeit: Heinen, S. J., Badler, J. B., & Ting, W. (2005). Timing and velocity randomization similarly affect anticipatory pursuit. *Journal of Vision, 5*(6), 493–503. https://doi.org/10.1167/5.6.1 – ✓A (405, 406)
- Kosinski, R. J. (2013). *A literature review on reaction time* (zuletzt aktualisiert September 2013). Clemson University. https://facultypsy.hope.edu/psychlabs/exp/reactiontime/docs/RT_Literature_Review.pdf – Web, Volltext geprüft; keine DOI; Website nennt 2008 und 200–250 ms, Quelle nennt 180–200 ms (404)
- Kowler, E. (1989). Cognitive expectations, not habits, control anticipatory smooth oculomotor pursuit. *Vision Research, 29*(9), 1049–1057. https://doi.org/10.1016/0042-6989(89)90052-7 – ✓A; **Website: Titel, Heft, Seiten und DOI falsch** (407)
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – ✓A (402, 404, 405, 407)
- Leigh, R. J., & Zee, D. S. (2015). *The neurology of eye movements* (5th ed.). Oxford University Press. https://doi.org/10.1093/med/9780199969289.001.0001 – ✓B (Buch); **Website: falsche DOI** (401, 402, 406)
- Orban de Xivry, J.-J., & Lefèvre, P. (2007). Saccades and pursuit: Two outcomes of a single sensorimotor process. *The Journal of Physiology, 584*(1), 11–23. https://doi.org/10.1113/jphysiol.2007.139881 – ✓A; **Website: nicht existenter Titel „… aperture problem …“, falsche Zeitschrift und DOI** (405, 406)
- Posner, M. I. (1980). Orienting of attention. *Quarterly Journal of Experimental Psychology, 32*(1), 3–25. https://doi.org/10.1080/00335558008248231 – ✓S (401)
- Pylyshyn, Z. W., & Storm, R. W. (1988). Tracking multiple independent targets: Evidence for a parallel tracking mechanism. *Spatial Vision, 3*(3), 179–197. https://doi.org/10.1163/156856888X00122 – ✓A (408)
- Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 – ✓B; **Website: Titelwort „pursuit“ statt „tracking“** (403, 404)
- Robinson, D. A. (1965). The mechanics of human smooth pursuit eye movement. *The Journal of Physiology, 180*(3), 569–591. https://doi.org/10.1113/jphysiol.1965.sp007718 – ✓S (402, 403, 407)
- Stark, L., Vossius, G., & Young, L. R. (1962). Predictive control of eye tracking movements. *IRE Transactions on Human Factors in Electronics, HFE-3*(2), 52–57. https://doi.org/10.1109/THFE2.1962.4503342 – ✓S (403)
- Wolfe, J. M. (1994). Guided Search 2.0: A revised model of visual search. *Psychonomic Bulletin & Review, 1*(2), 202–238. https://doi.org/10.3758/BF03200774 – ✓A (401)
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – ✓A (Volltext) (401–408)

### D2. Weitere Fachliteratur (neu geprüft)

- Abrams, J., Nizam, A., & Carrasco, M. (2012). Isoeccentric locations are not equivalent: The extent of the vertical meridian asymmetry. *Vision Research, 52*(1), 70–78. https://doi.org/10.1016/j.visres.2011.10.016 – ✓A – Leistungsfelder (401)
- Appelbaum, L. G., Lochhead, L., Feng, J., Erickson, G., Liu, S., & Laby, D. M. (2025). Limited evidence is not no evidence: A rebuttal to Fransen, 2024. *Sports Medicine, 55*(1), 241–242. https://doi.org/10.1007/s40279-024-02141-x – ✓B (docs 02) – Transfer-Debatte
- Baloh, R. W., Sills, A. W., Kumley, W. E., & Honrubia, V. (1975). Quantitative measurement of saccade amplitude, duration, and velocity. *Neurology, 25*(11), 1065–1070. https://doi.org/10.1212/WNL.25.11.1065 – ✓A – Sakkadendauer
- Bargary, G., Bosten, J. M., Goodbourn, P. T., Lawrance-Owen, A. J., Hogg, R. E., & Mollon, J. D. (2017). Individual differences in human eye movements: An oculomotor signature? *Vision Research, 141*, 157–169. https://doi.org/10.1016/j.visres.2017.03.001 – ✓A – Messzuverlässigkeit
- Barnes, G. R., Barnes, D. M., & Chakraborti, S. R. (2000). Ocular pursuit responses to repeated, single-cycle sinusoids reveal behavior compatible with predictive pursuit. *Journal of Neurophysiology, 84*(5), 2340–2355. https://doi.org/10.1152/jn.2000.84.5.2340 – ✓A – Vorhersage-Lernen (403, 407)
- Becker, W., & Fuchs, A. F. (1985). Prediction in the oculomotor system: Smooth pursuit during transient disappearance of a visual target. *Experimental Brain Research, 57*(3), 562–575. https://doi.org/10.1007/BF00237843 – ✓A – Verdeckung (407)
- Bediou, B., Adams, D. M., Mayer, R. E., Tipton, E., Green, C. S., & Bavelier, D. (2018). Meta-analysis of action video game impact on perceptual, attentional, and cognitive skills. *Psychological Bulletin, 144*(1), 77–110. https://doi.org/10.1037/bul0000130 – ✓A (Korrektur: 10.1037/bul0000168) – Transfer (408)
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – ✓A – Farbsehschwäche
- Bourassa, D. C., McManus, I. C., & Bryden, M. P. (1996). Handedness and eye-dominance: A meta-analysis of their relationship. *Laterality, 1*(1), 5–34. https://doi.org/10.1080/713754206 – ✓A – Augendominanz (408)
- Bronstein, A. M. (1995). Visual vertigo syndrome: Clinical and posturography findings. *Journal of Neurology, Neurosurgery & Psychiatry, 59*(5), 472–476. https://doi.org/10.1136/jnnp.59.5.472 – ✓A – Vorsicht Schwindel
- Buizza, A., & Schmid, R. (1986). Velocity characteristics of smooth pursuit eye movements to different patterns of target motion. *Experimental Brain Research, 63*(2), 395–401. https://doi.org/10.1007/BF00236858 – ✓A – Gain periodischer Bahnen
- Carl, J. R., & Gellman, R. S. (1987). Human smooth pursuit: Stimulus-dependent responses. *Journal of Neurophysiology, 57*(5), 1446–1463. https://doi.org/10.1152/jn.1987.57.5.1446 – ✓A – Latenz 100 ms
- Casiez, G., Pietrzak, T., Marchal, D., Poulmane, S., Falce, M., & Roussel, N. (2017). Characterizing latency in touch and button-equipped interactive systems. In *Proceedings of the 30th Annual ACM Symposium on User Interface Software and Technology (UIST '17)* (S. 29–39). ACM. https://doi.org/10.1145/3126594.3126606 – ✓A (Volltext) – Geräte-Latenz
- Chambaron, S., Ginhac, D., Ferrel-Chapus, C., & Perruchet, P. (2006). Implicit learning of a repeated segment in continuous tracking: A reappraisal. *Quarterly Journal of Experimental Psychology, 59*(5), 845–854. https://doi.org/10.1080/17470210500198585 – ✓A – Lernen wiederholter Bahnen (kritisch)
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – ✓A (auch docs 02) – Gain, Hintergrund, Raute
- Curcio, C. A., Sloan, K. R., Kalina, R. E., & Hendrickson, A. E. (1990). Human photoreceptor topography. *Journal of Comparative Neurology, 292*(4), 497–523. https://doi.org/10.1002/cne.902920402 – ✓A – Zapfen/Stäbchen (401, 408)
- Danion, F. R., & Flanagan, J. R. (2018). Different gaze strategies during eye versus hand tracking of a moving target. *Scientific Reports, 8*, 10059. https://doi.org/10.1038/s41598-018-28434-6 – ✓A – Auge-Hand
- de'Sperati, C., & Viviani, P. (1997). The relationship between curvature and velocity in two-dimensional smooth pursuit eye movements. *The Journal of Neuroscience, 17*(10), 3932–3945. https://doi.org/10.1523/JNEUROSCI.17-10-03932.1997 – ✓A – Kurven (402, 404)
- Eibenberger, K., Ring, M., & Haslwanter, T. (2012). Sustained effects for training of smooth pursuit plasticity. *Experimental Brain Research, 218*(1), 81–89. https://doi.org/10.1007/s00221-012-3009-8 – ✓A (auch docs 02) – Trainierbarkeit
- Engel, K. C., Anderson, J. H., & Soechting, J. F. (2000). Similarity in the response of smooth pursuit and manual tracking to a change in the direction of target motion. *Journal of Neurophysiology, 84*(3), 1149–1156. https://doi.org/10.1152/jn.2000.84.3.1149 – ✓A – Richtungswechsel (405, 406)
- Fischer, B., & Ramsperger, E. (1984). Human express saccades: Extremely short reaction times of goal directed eye movements. *Experimental Brain Research, 57*(1), 191–195. https://doi.org/10.1007/BF00231145 – ✓A – Sakkadenlatenz
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – ✓B hier, Inhalt in docs 03 geprüft – Photosensitivität
- Fricke, T. R., Tahhan, N., Resnikoff, S., Papas, E., Burnett, A., Ho, S. M., Naduvilath, T., & Naidoo, K. S. (2018). Global prevalence of presbyopia and vision impairment from uncorrected presbyopia: Systematic review, meta-analysis, and modelling. *Ophthalmology, 125*(10), 1492–1499. https://doi.org/10.1016/j.ophtha.2018.04.013 – ✓A – Alterssichtigkeit
- Fukushima, K., Fukushima, J., Warabi, T., & Barnes, G. R. (2013). Cognitive processes involved in smooth pursuit eye movements: Behavioral evidence, neural substrate and clinical correlation. *Frontiers in Systems Neuroscience, 7*, 4. https://doi.org/10.3389/fnsys.2013.00004 – ✓A – SEF, Vermis, Arbeitsgedächtnis (407)
- Goodale, M. A., & Milner, A. D. (1992). Separate visual pathways for perception and action. *Trends in Neurosciences, 15*(1), 20–25. https://doi.org/10.1016/0166-2236(92)90344-8 – ✓A – dorsal/ventral (401)
- Guo, Y., Chen, C., Peng, J., Deng, L., & Yuan, T. (2025). Does visual training enhance athletes' decision-making skills and sport-specific performance? A systematic review and meta-analysis. *Scandinavian Journal of Medicine & Science in Sports, 35*(10), e70140. https://doi.org/10.1111/sms.70140 – ✓A – Transfer (Gegenposition)
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – ✓B hier, Inhalt in docs 02 geprüft – Lerneffekt
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – ✓A – Gleitsicht am Bildschirm
- Handler, S. M., Fierson, W. M., Section on Ophthalmology, Council on Children with Disabilities, American Academy of Ophthalmology, American Association for Pediatric Ophthalmology and Strabismus, & American Association of Certified Orthoptists. (2011). Learning disabilities, dyslexia, and vision. *Pediatrics, 127*(3), e818–e856. https://doi.org/10.1542/peds.2010-3670 – ✓A – Lese-/Lernstörungs-Aussagen (402, 403)
- Heinen, S. J., Potapchuk, E., & Watamaniuk, S. N. J. (2016). A foveal target increases catch-up saccade frequency during smooth pursuit. *Journal of Neurophysiology, 115*(3), 1220–1227. https://doi.org/10.1152/jn.00774.2015 – ✓A – Zielgröße
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – ✓A – Gleitsicht, Kopfbewegung
- Hutton, S. B., & Tegally, D. (2005). The effects of dividing attention on smooth pursuit eye tracking. *Experimental Brain Research, 163*(3), 306–313. https://doi.org/10.1007/s00221-004-2171-z – ✓A – Doppelaufgabe (401, 408)
- Hyatt, K. J. (2007). Brain Gym®: Building stronger brains or wishful thinking? *Remedial and Special Education, 28*(2), 117–124. https://doi.org/10.1177/07419325070280020201 – ✓S (ERIC-Zusammenfassung) – „liegende Acht“ (402)
- Ilg, U. J., & Thier, P. (2008). The neural basis of smooth pursuit eye movements in the rhesus monkey brain. *Brain and Cognition, 68*(3), 229–240. https://doi.org/10.1016/j.bandc.2008.08.014 – ✓A – Netzwerk
- Jewell, G., & McCourt, M. E. (2000). Pseudoneglect: A review and meta-analysis of performance factors in line bisection tasks. *Neuropsychologia, 38*(1), 93–110. https://doi.org/10.1016/S0028-3932(99)00045-7 – ✓A – Seitenasymmetrie (401, 408)
- Katsanis, J., Iacono, W. G., & Harris, M. (1998). Development of oculomotor functioning in preadolescence, adolescence, and adulthood. *Psychophysiology, 35*(1), 64–72. https://doi.org/10.1111/1469-8986.3510064 – ✓A – Entwicklung
- Ke, S. R., Lam, J., Pai, D. K., & Spering, M. (2013). Directional asymmetries in human smooth pursuit eye movements. *Investigative Ophthalmology & Visual Science, 54*(6), 4409–4421. https://doi.org/10.1167/iovs.12-11369 – ✓A – Richtungsasymmetrie
- Kerzel, D., Souto, D., & Ziegler, N. E. (2008). Effects of attention shifts to stationary objects during steady-state smooth pursuit eye movements. *Vision Research, 48*(7), 958–969. https://doi.org/10.1016/j.visres.2008.01.015 – ✓A – Randreize senken Gain (401)
- Khan, A. Z., Lefèvre, P., Heinen, S. J., & Blohm, G. (2010). The default allocation of attention is broadly ahead of smooth pursuit. *Journal of Vision, 10*(13), 7. https://doi.org/10.1167/10.13.7 – ✓A – Aufmerksamkeit vor dem Ziel (401)
- Koken, P. W., & Erkelens, C. J. (1992). Influences of hand movements on eye movements in tracking tasks in man. *Experimental Brain Research, 88*(3), 657–664. https://doi.org/10.1007/BF00228195 – ✓A – Hand hilft Auge
- Kolb, H. (o. J.). Part XIII: Facts and figures concerning the human retina. In *Webvision: The organization of the retina and visual system*. https://www.webvision.pitt.edu/book/part-xiii-facts-and-figures-concerning-the-human-retina/ – Web (Autorin laut Kapitelüberschrift; Werte 1,5 mm Fovea-Durchmesser nach Polyak 1941 und 288 µm pro Grad am 29.09.2026 abgerufen; Online-Lehrbuch, keine DOI) – Fovea-Größe
- Lacquaniti, F., Terzuolo, C., & Viviani, P. (1983). The law relating the kinematic and figural aspects of drawing movements. *Acta Psychologica, 54*(1–3), 115–130. https://doi.org/10.1016/0001-6918(83)90027-6 – ✓S – Zwei-Drittel-Gesetz
- Lencer, R., Nagel, M., Sprenger, A., Zapf, S., Erdmann, C., Heide, W., & Binkofski, F. (2004). Cortical mechanisms of smooth pursuit eye movements with target blanking: An fMRI study. *European Journal of Neuroscience, 19*(5), 1430–1436. https://doi.org/10.1111/j.1460-9568.2004.03229.x – ✓A – Verdeckung, Hirnareale (407)
- Lencer, R., & Trillenberg, P. (2008). Neurophysiology and neuroanatomy of smooth pursuit in humans. *Brain and Cognition, 68*(3), 219–228. https://doi.org/10.1016/j.bandc.2008.08.013 – ✓A – Kernareale
- Lisberger, S. G. (2010). Visual guidance of smooth-pursuit eye movements: Sensation, action, and what happens in between. *Neuron, 66*(4), 477–491. https://doi.org/10.1016/j.neuron.2010.03.027 – ✓A – MT, FEF, Kleinhirn
- Lovejoy, L. P., Fowler, G. A., & Krauzlis, R. J. (2009). Spatial allocation of attention during smooth pursuit eye movements. *Vision Research, 49*(10), 1275–1285. https://doi.org/10.1016/j.visres.2009.01.011 – ✓A – Aufmerksamkeitsfokus (401)
- MacKenzie, I. S., & Ware, C. (1993). Lag as a determinant of human performance in interactive systems. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '93)* (S. 488–493). ACM Press. https://doi.org/10.1145/169059.169431 – ✓A – Latenz
- Madelain, L., & Krauzlis, R. J. (2003). Effects of learning on smooth pursuit during transient disappearance of a visual target. *Journal of Neurophysiology, 90*(2), 972–982. https://doi.org/10.1152/jn.00869.2002 – ✓A (auch docs 02) – Lernen bei Verdeckung (407)
- Makin, A. D. J., & Poliakoff, E. (2011). Do common systems control eye movements and motion extrapolation? *Quarterly Journal of Experimental Psychology, 64*(7), 1327–1343. https://doi.org/10.1080/17470218.2010.548562 – ✓A – Extrapolation (407)
- McAuley, J. H., & Marsden, C. D. (2000). Physiological and pathological tremors and rhythmic central motor control. *Brain, 123*(8), 1545–1567. https://doi.org/10.1093/brain/123.8.1545 – ✓A – Tremor
- McHugh, D. E., & Bahill, A. T. (1985). Learning to track predictable target waveforms without a time delay. *Investigative Ophthalmology & Visual Science, 26*(7), 932–937. https://pubmed.ncbi.nlm.nih.gov/4008209/ – keine DOI; Inhalt in docs 02 geprüft – schnelles Lernen
- McKee, S. P., & Nakayama, K. (1984). The detection of motion in the peripheral visual field. *Vision Research, 24*(1), 25–32. https://doi.org/10.1016/0042-6989(84)90140-8 – ✓A – Bewegung in der Peripherie
- Medina, J. F., & Lisberger, S. G. (2008). Links from complex spikes to local plasticity and motor learning in the cerebellum of awake-behaving monkeys. *Nature Neuroscience, 11*(10), 1185–1192. https://doi.org/10.1038/nn.2197 – ✓A (Erratum 2009) – Kleinhirnplastizität
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – ✓A (auch docs 02) – Höchstgeschwindigkeit
- Meyhöfer, I., Kumari, V., Hill, A., Petrovsky, N., & Ettinger, U. (2017). Sleep deprivation as an experimental model system for psychosis: Effects on smooth pursuit, prosaccades, and antisaccades. *Journal of Psychopharmacology, 31*(4), 418–433. https://doi.org/10.1177/0269881116675511 – ✓A – Tagesform
- Miall, R. C., Weir, D. J., & Stein, J. F. (1993). Intermittency in human manual tracking tasks. *Journal of Motor Behavior, 25*(1), 53–63. https://doi.org/10.1080/00222895.1993.9941639 – ✓A – manuelles Tracking
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – ✓A (auch docs 02) – Alter
- Mrotek, L. A., & Soechting, J. F. (2007). Predicting curvilinear target motion through an occlusion. *Experimental Brain Research, 178*(1), 99–114. https://doi.org/10.1007/s00221-006-0717-y – ✓A – Verdeckung gekrümmter Bahnen (407)
- Newsome, W. T., Wurtz, R. H., Dürsteler, M. R., & Mikami, A. (1985). Deficits in visual motion processing following ibotenic acid lesions of the middle temporal visual area of the macaque monkey. *The Journal of Neuroscience, 5*(3), 825–840. https://doi.org/10.1523/JNEUROSCI.05-03-00825.1985 – ✓A – MT
- Orban de Xivry, J.-J., Bennett, S. J., Lefèvre, P., & Barnes, G. R. (2006). Evidence for synergy between saccades and smooth pursuit during transient target disappearance. *Journal of Neurophysiology, 95*(1), 418–427. https://doi.org/10.1152/jn.00596.2005 – ✓A – Synergie (407)
- Osaka, N. (1976). Visual reaction time as a function of target size and retinal eccentricity in the peripheral visual field. *Japanese Psychological Research, 18*(4), 183–190. https://doi.org/10.4992/psycholres1954.18.183 – ✓A (Volltext) – RT und Exzentrizität (401)
- Portello, J. K., Rosenfield, M., & Chu, C. A. (2013). Blink rate, incomplete blinks and computer vision syndrome. *Optometry and Vision Science, 90*(5), 482–487. https://doi.org/10.1097/OPX.0b013e31828f09a7 – ✓A – Lidschlag
- Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin, 124*(3), 372–422. https://doi.org/10.1037/0033-2909.124.3.372 – ✓A – Lesen (402)
- Ringer, R. V., Throneburg, Z., Johnson, A. P., Kramer, A. F., & Loschky, L. C. (2016). Impairing the useful field of view in natural scenes: Tunnel vision versus general interference. *Journal of Vision, 16*(2), 7. https://doi.org/10.1167/16.2.7 – ✓A – Tunnelblick (401)
- Ross, J., Morrone, M. C., Goldberg, M. E., & Burr, D. C. (2001). Changes in visual perception at the time of saccades. *Trends in Neurosciences, 24*(2), 113–121. https://doi.org/10.1016/S0166-2236(00)01685-4 – ✓A – sakkadische Suppression (408)
- Rottach, K. G., Zivotofsky, A. Z., Das, V. E., Averbuch-Heller, L., Discenna, A. O., Poonyathalang, A., & Leigh, R. J. (1996). Comparison of horizontal, vertical and diagonal smooth pursuit eye movements in normal human subjects. *Vision Research, 36*(14), 2189–2195. https://doi.org/10.1016/0042-6989(95)00302-9 – ✓A – horizontal/vertikal
- Sala, G., Tatlidil, K. S., & Gobet, F. (2018). Video game training does not enhance cognitive ability: A comprehensive meta-analytic investigation. *Psychological Bulletin, 144*(2), 111–139. https://doi.org/10.1037/bul0000139 – ✓A – Transfer (408)
- Soechting, J. F., Mrotek, L. A., & Flanders, M. (2005). Smooth pursuit tracking of an abrupt change in target direction: Vector superposition of discrete responses. *Experimental Brain Research, 160*(2), 245–258. https://doi.org/10.1007/s00221-004-2010-2 – ✓A (online 2004) – Richtungswechsel (405, 406)
- Soechting, J. F., Rao, H. M., & Juveli, J. Z. (2010). Incorporating prediction in models for two-dimensional smooth pursuit. *PLoS ONE, 5*(9), e12574. https://doi.org/10.1371/journal.pone.0012574 – ✓A – 2D-Vorhersage (402–404)
- Sparks, D. L. (2002). The brainstem control of saccadic eye movements. *Nature Reviews Neuroscience, 3*(12), 952–964. https://doi.org/10.1038/nrn986 – ✓B – PPRF/riMLF als Sakkadengeneratoren
- Spering, M., Kerzel, D., Braun, D. I., Hawken, M. J., & Gegenfurtner, K. R. (2005). Effects of contrast on smooth pursuit eye movements. *Journal of Vision, 5*(5), 455–465. https://doi.org/10.1167/5.5.6 – ✓A – Kontrast
- Spjut, J., Boudaoud, B., Binaee, K., Kim, J., Majercik, A., McGuire, M., Luebke, D., & Kim, J. (2019). Latency of 30 ms benefits first person targeting tasks more than refresh rate above 60 Hz. In *SIGGRAPH Asia 2019 Technical Briefs* (S. 110–113). ACM. https://doi.org/10.1145/3355088.3365170 – ✓A (Abstract über Semantic Scholar) – Bildrate vs. Latenz
- Takagi, M., Zee, D. S., & Tamargo, R. J. (2000). Effects of lesions of the oculomotor cerebellar vermis on eye movements in primate: Smooth pursuit. *Journal of Neurophysiology, 83*(4), 2047–2062. https://doi.org/10.1152/jn.2000.83.4.2047 – ✓A – Vermis VI–VII
- Talens-Estarelles, C., Cerviño, A., García-Lázaro, S., Fogelton, A., Sheppard, A., & Wolffsohn, J. S. (2023). The effects of breaks on digital eye strain, dry eye and binocular vision: Testing the 20-20-20 rule. *Contact Lens and Anterior Eye, 46*(2), 101744. https://doi.org/10.1016/j.clae.2022.101744 – ✓A – 20-20-20 (402)
- Theeuwes, J., Kramer, A. F., Hahn, S., & Irwin, D. E. (1998). Our eyes do not always go where we want them to go: Capture of the eyes by new objects. *Psychological Science, 9*(5), 379–385. https://doi.org/10.1111/1467-9280.00071 – ✓S (Zahl 30–40 % über Sekundärquellen) – Blickfang (401)
- Tychsen, L., & Lisberger, S. G. (1986). Maldevelopment of visual motion processing in humans who had strabismus with onset in infancy. *The Journal of Neuroscience, 6*(9), 2495–2508. https://doi.org/10.1523/JNEUROSCI.06-09-02495.1986 – ✓A – Schielen
- Wulf, G., & Schmidt, R. A. (1997). Variability of practice and implicit motor learning. *Journal of Experimental Psychology: Learning, Memory, and Cognition, 23*(4), 987–1006. https://doi.org/10.1037/0278-7393.23.4.987 – ✓S – implizites Tracking-Lernen
- Xia, R., & Barnes, G. (1999). Oculomanual coordination in tracking of pseudorandom target motion stimuli. *Journal of Motor Behavior, 31*(1), 21–38. https://doi.org/10.1080/00222899909601889 – ✓A – Auge-Hand bei Zufallsbewegung
- Yantis, S. (1992). Multielement visual tracking: Attention and perceptual organization. *Cognitive Psychology, 24*(3), 295–340. https://doi.org/10.1016/0010-0285(92)90010-Y – ✓A – Gruppierung hilft (408)

### D3. Aus docs/wissenschaft übernommen (dort inhaltlich geprüft, hier DOI per Crossref gegengeprüft)

- Alvarez, G. A., & Franconeri, S. L. (2007). How many objects can you track? Evidence for a resource-limited attentive tracking mechanism. *Journal of Vision, 7*(13):14, 1–10. https://doi.org/10.1167/7.13.14 (408)
- Barnes, G. R., Donnelly, S. F., & Eason, R. D. (1987). Predictive velocity estimation in the pursuit reflex response to pseudo-random and step displacement stimuli in man. *The Journal of Physiology, 389*, 111–136. https://doi.org/10.1113/jphysiol.1987.sp016649 (403, 404; Abstract hier erneut gelesen)
- Boccardo, L., Gurioli, M., & Grasso, P. A. (2023). Viewing distance and character size in the use of smartphones across the lifespan. *PLoS ONE, 18*(4), e0282947. https://doi.org/10.1371/journal.pone.0282947
- Fehd, H. M., & Seiffert, A. E. (2010). Looking at the center of the targets helps multiple object tracking. *Journal of Vision, 10*(4):19, 1–13. https://doi.org/10.1167/10.4.19 (408)
- Fransen, J. (2024). There is no supporting evidence for a far transfer of general perceptual or cognitive training to sports performance. *Sports Medicine, 54*(11), 2717–2724. https://doi.org/10.1007/s40279-024-02060-x
- Holcombe, A. O., & Chen, W.-Y. (2013). Splitting attention reduces temporal resolution from 7 Hz for tracking one object to <3 Hz when tracking three. *Journal of Vision, 13*(1):12. https://doi.org/10.1167/13.1.12 (408)
- Kerkhoff, G., Reinhart, S., Ziegler, W., Artinger, F., Marquardt, C., & Keller, I. (2013). Smooth pursuit eye movement training promotes recovery from auditory and visual neglect: A randomized controlled study. *Neurorehabilitation and Neural Repair, 27*(9), 789–798. https://doi.org/10.1177/1545968313491012 (nur Einordnung)
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983
- Strasburger, H., Rentschler, I., & Jüttner, M. (2011). Peripheral vision and pattern recognition: A review. *Journal of Vision, 11*(5), 13. https://doi.org/10.1167/11.5.13 (401)
- Vater, C., & Strasburger, H. (2021). Topical review: The top five peripheral vision tools in sport. *Optometry and Vision Science, 98*(7), 704–722. https://doi.org/10.1097/OPX.0000000000001732 (401)
- W3C. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2*, SC 2.3.1 Three Flashes or Below Threshold. https://www.w3.org/TR/WCAG22/ (401; Inhalt in docs 03 geprüft)

**Weitere passende Einträge in docs/wissenschaft/02 (bei Bedarf):** Bahill & McDonald 1983 (vorhersagbare Ziele
ohne Verzögerung), Sharpe & Sylvester 1978 und Morrow & Sharpe 1993 (Alter), Vater, Gray & Holcombe 2021
(Zentrumsblick nicht erzwingen), Li et al. 2020 (Abstands-Kalibrierung), Deber et al. 2015 (Touch-Latenz).

**Querverweise im Katalog:** 104 moving-target (Blickfit „Zielfang“), 105 pursuit-tracker („Scharf in Bewegung“),
106 multiple-targets („Kugel-Detektiv“, → 408), 108 entropic-grid („Blitzblick“/UFOV, → 401), 205 divided-attention
(„Doppelt gefordert“, → 401/408), 206 multi-tasking (Dual-Stream-Tracking, → 408), 303 saccadic-gallery,
305 visual-tracking-speed-test, 505 strafe-tracking, 513 anti-zigzag (→ 405), 514 pro-smooth-pursuit (→ 402–404),
515 vertical-air-track (→ 403 vertikal), 707 tracing (→ 402, 406), 801 peripheral-threat-sweeper (→ 401),
409–415 (Parallelgruppe: Stroboskop, Ausweichen, Sichtfeldwechsel, Nachzieheffekt, Treppe, Sprungziel, Richtungschaos).
