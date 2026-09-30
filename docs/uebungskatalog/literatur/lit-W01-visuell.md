# Literaturbasis W01 – Kapitel „Visuelle Wahrnehmung“ (Katalognummern 101–109)

Stand: 29.09.2026 · Gruppe W01-visuell · Grundlage für die Katalogeinträge
101 light-reaction (Blickfit: Blitzreaktion), 102 go-no-go (Stopp & Los), 103 visual-search (Suchbild),
104 moving-target (Zielfang), 105 pursuit-tracker (Scharf in Bewegung), 106 multiple-targets (Kugel-Detektiv),
107 distance-judgment (Punktlandung), 108 entropic-grid (bei Blickfit ersetzt durch Blitzblick/UFOV),
109 rhythm-anomaly (Aus dem Takt).

## Methode und Legende

- **Website-Quellen:** alle Einträge unter „Quellen“ der neun Seiten (drills.json → seitentext) plus die
  wichtigsten Zitate, die nur im Fließtext stehen. Jede DOI wurde über die Crossref-API
  (`api.crossref.org/works/<DOI>`) aufgelöst und mit Titel, Autor:innen, Jahr, Zeitschrift, Band, Seiten
  verglichen. Falsche DOIs wurden über die Crossref-Suche (`query.bibliographic`) korrigiert und die
  korrigierte DOI erneut geprüft. Inhalt: PubMed-Abstract (E-Utilities), Crossref-Abstract oder
  Semantic-Scholar-Abstract/TLDR; bei Klassikern ohne Abstract steht das dabei.
- **Weitere Literatur:** überwiegend aus `docs/wissenschaft/01–03` (dort bereits geprüft; DOIs hier erneut per
  Crossref bestätigt) und neu recherchiert (neu = Crossref + Abstract geprüft, Zahlen aus Abstract oder
  PMC-Volltext).
- **Prüfvermerke:** ✓ DOI + Metadaten stimmen · ⚠ Angabe fehlerhaft (DOI oder Titel), korrigiert · ✗ nicht
  auffindbar · „Abstract“ = Inhalt am Abstract geprüft · „Volltext“ = Zahlen im PMC-Volltext geprüft ·
  „nur Metadaten“ = nur bibliografisch geprüft, Inhalt aus Sekundärquelle.
- **Stützt die Aussage?** ja = die Quelle belegt, wofür die Website sie anführt · teilweise = Thema passt,
  aber Zahl/Schluss/Übertragung auf die Übung nicht belegt · nein = anderes Thema, falsche Quelle oder
  widerspricht · unklar = Inhalt nicht prüfbar.
- **Eigene Rechnung/Herleitung** ist so gekennzeichnet (keine Studienergebnisse).

**Zählung:** 37 verschiedene Website-Quellen (52 Listeneinträge auf 9 Seiten) plus 3 geprüfte
Fließtext-Zitate. **13 der 37 Angaben sind bibliografisch fehlerhaft** (7 × DOI falsch bzw. führt zu einem
anderen Werk, 6 × Titel falsch bei richtiger DOI); zusätzlich 1 Quelle ohne DOI (Kosinski, korrekt als
graue Literatur gekennzeichnet). Von den 52 Listeneinträgen stützen **8 die Aussage (ja), 29 teilweise,
14 nicht, 1 unklar**. Weitere geprüfte Fachliteratur: **75 Quellen** (Abschnitt D2; 29 neu recherchiert, 46 aus
docs/wissenschaft/01–03 übernommen und per Crossref erneut bestätigt) plus 2 Norm-/Rechtsquellen (D3).
Faktenliste: 100 Einträge (91 Studienfakten, 9 eigene Rechnungen/Code-Befunde).

### Wiederkehrende Probleme der Website (gelten für alle neun Seiten)

1. **Woods et al. (2015) steht auf allen neun Seiten** – die Studie behandelt nur die einfache
   Reaktionszeit und Hardware-Verzögerungen. Für MOT, Suche, Rhythmus, Blickfolge oder „UFOV im Alter“
   (108) ist sie keine Quelle.
2. **Perzentil-Tabellen („Top 1 %/5 %/25 %/50 %“, „Tier 1–5“, „Elite/Apex“) haben keine Datengrundlage.**
   Jede Seite sagt selbst: „SkillDrills collects no aggregate performance data … Every figure quoted on this
   page comes from the published work listed above“ – keine der zitierten Arbeiten enthält solche Normen für
   diese Spiele. Die Stufen sind zudem gerätabhängig (Bildrate, Latenz; F09–F11).
3. **Transfer-Versprechen** („beseitigt zuverlässig den Tunnelblick“, „schärft Gefahrenerkennung im
   Straßenverkehr“, „verringert Asthenopie“, „stärkt präfrontale Konnektivität“) sind durch die angeführten
   Quellen nicht gedeckt und durch Metaanalysen eher widerlegt (Abschnitt C, F95–F100).
4. **Hirnareal-Aussagen** werden Quellen zugeschrieben, die sie nicht enthalten (V4 bei Donders; FINST/IPS/SC
   bei Cavanagh & Alvarez; M-Pfad bei De Lange; „Kleinhirn-Innenmodell Top 1 %“ bei Lisberger).
5. **Frame-gebundene Bewegung** im Code (Moving Target, Pursuit): Tempoangaben in px/s gelten nur bei 60 Hz;
   auf 144 Hz ist alles 2,4-mal so schnell (docs/skilldrills-analyse.md) – die Seiten empfehlen aber
   144/240-Hz-Monitore.

---

## A) Website-Quellen-Prüftabelle je Übung

### 101 · Light Reaction („Reaktionstest: Visuelle Reaktionszeit“)

| # | Angabe der Website | DOI-/Angabenprüfung | Stützt? | Begründung |
|---|---|---|---|---|
| 1 | Woods, Wyma, Yund, Herron & Reed (2015). Factors influencing the latency of simple reaction time. *Front Hum Neurosci, 9*, 131. 10.3389/fnhum.2015.00131 | ✓ (Abstract) | teilweise | Stützt „~200–250 ms“: Mittel 231 ms, 213 ms nach Hardware-Korrektur, n = 1.469. Die Hz-Angaben (16,7/4,1 ms) sind Physik, nicht aus Woods; die Seite korrigiert selbst keine Latenz („werden nach Woods berücksichtigt“ trifft nicht zu). Woods zeigt außerdem: Entdecken ~131 ms, Altersanstieg motorisch. |
| 2 | Kosinski (2008). A literature review on reaction time. Clemson University (keine DOI) | graue Literatur, keine DOI (von der Website korrekt angegeben); geprüft wurde die online verfügbare Fassung „Last updated September 2013“ | teilweise | Kosinski nennt für visuelle einfache RT **180–200 ms** (auditiv 140–160 ms) und Laming (1968) mit 220 ms – nicht „200–250 ms“. Die „20–40 ms“ der Website stammen aus Kosinski („a visual stimulus takes 20–40 msec [to reach the brain]“, nach Marshall et al., 1943) – das ist keine „Rhodopsin-Isomerisierung“. |
| 3 | Pins & Bonnet (1996). On the relation between stimulus intensity and processing time: Piéron's law and choice reaction time. *Percept Psychophys, 58*(3), 390–400. 10.3758/BF03206815 | ✓ (Abstract) | teilweise | Belegt Piéron: RT sinkt als Potenzfunktion der Intensität (einfach und Wahl, ähnliche Exponenten). Nicht belegt: „maximale Ganglienzellen-Depolarisation“ und der Tipp „Zimmer abdunkeln, damit Pupillen weiten“ (aus Sicht der Lichtempfindlichkeit eher ungünstig; F79). |
| 4 | Posner (1980). Orienting of attention. *Q J Exp Psychol, 32*(1), 3–25. 10.1080/00335558008248231 | ✓ (Abstract) | nein | Verdeckte Aufmerksamkeitsverlagerung (Hinweisreize). Weder „Trainierbarkeit dieses Systems“ noch „20–30 ms Zeitverlust“ beim Fixieren sind Thema; bei einem einzigen zentralen Reiz gibt es keine Verlagerung. |
| 5 | Jain, Bansal, Kumar & Singh (2015). A comparative study of visual and auditory reaction times … medical first year students. *Int J Appl Basic Med Res, 5*(2), 124–127. 10.4103/2229-516X.157168 | ✓ (Abstract + PMC-Volltext) | teilweise | Querschnitt, n = 120, 18–20 J., Laptop-Software, **schnellster von 5 Versuchen**. Stützt „auditiv schneller als visuell“. Die Vier-Phasen-Latenzen (20–40/30–50/50–80/30–50 ms) stehen dort nicht; die Einleitung zitiert selbst Kosinski (180–200 ms). |
| 6 | Dye, Green & Bavelier (2009). Increasing speed of processing with action video games. *Curr Dir Psychol Sci, 18*(6), 321–326. 10.1111/j.1467-8721.2009.01660.x | ✓ (Abstract) | teilweise | Übersicht: Action-Videospiele gehen mit schnelleren RT ohne Genauigkeitsverlust einher. Betrifft vor allem Wahl-/Entscheidungsaufgaben, nicht einfache Licht-RT und nicht „E-Sport-Training“. Spätere Metaanalysen: kleiner Effekt (Bediou et al., 2018) bzw. kaum Effekt (Sala et al., 2018). |
| – | *Nur im Fließtext:* Shelton & Kumar (2010). Comparison between auditory and visual simple reaction times. *Neurosci Med, 1*(1), 30–32. 10.4236/nm.2010.11004 | ✓ (Abstract via Semantic Scholar) | nein | n = 14; **visuell ≈ 331 ms, auditiv ≈ 284 ms** – widerspricht „200–250 ms“ und „140–160 ms“; zeigt eher, wie stark unkalibrierte Laptop-Messung die Werte erhöht. |
| – | *Nur im Fließtext:* Piéron (1952) | Buch (*The Sensations*), nicht geprüft | unklar | Inhalt über Pins & Bonnet (1996) indirekt bestätigt. |

### 102 · Go/No-Go („Go/No-Go-Test: Reaktionshemmung und Impulskontrolle“)

| # | Angabe der Website | DOI-/Angabenprüfung | Stützt? | Begründung |
|---|---|---|---|---|
| 1 | Donders (1868/1969). On the speed of mental processes (Übersetzung). *Acta Psychol, 30*, 412–431. 10.1016/0001-6918(69)90065-1 | ✓ (nur Metadaten; Inhalt: Klassiker der Subtraktionsmethode) | teilweise | Die „c-Reaktion“ (nur auf einen von mehreren Reizen antworten) dauert länger als die einfache Reaktion – das stimmt. **Nicht** bei Donders: „Helligkeit/Bewegung erreichen das Sehzentrum vor der Farbverarbeitung in V4“ (1868 unbekannt). Belegt ist ein ~17-ms-Vorsprung magnozellulärer Signale im Makaken-CGL (Schmolesky et al., 1998; F05). |
| 2 | Logan & Cowan (1984). On the ability to inhibit thought and action: A theory of an act of control. *Psychol Rev, 91*(3), 295–327. 10.1037/0033-295X.91.3.295 | ✓ (nur Metadaten; kein Abstract verfügbar, Inhalt Lehrbuchwissen: Wettlaufmodell) | teilweise | Wettlaufmodell (Go vs. Stopp) ja – aber für die **Stop-Signal-Aufgabe** (Stoppsignal nach dem Go-Reiz), nicht für Go/No-Go (Wessel, 2018). „Kontraktion wird im Rückenmark abgefangen“ steht nicht im (kognitiven) Modell. |
| 3 | Robertson, Manly, Andrade, Baddeley & Yiend (1997). „'Oops!': Performance correlates of everyday cognitive slips on the SART“. *Neuropsychologia, 35*(6), 747–758. 10.1016/S0028-3932(97)00015-8 | ⚠ DOI ✓, **Titel falsch** – richtig: „'Oops!': Performance correlates of everyday attentional failures in traumatic brain injured and normal subjects“ | ja | SART mit seltenen No-Go-Reizen (1 von 9); Fehlalarme kündigen sich durch Beschleunigung der vorangehenden Antworten an („Drift“ in automatisches Antworten) – passt zu „Serien gleichförmiger Go-Reize → Autopilot“. |
| 4 | Aron, Robbins & Poldrack (2014). Inhibition and the right inferior frontal cortex: One decade on. *Trends Cogn Sci, 18*(4), 177–185. 10.1016/j.tics.2013.12.003 | ✓ (Abstract) | teilweise | rIFC mit fronto-basalganglionären Netzwerken als „Bremse“ – Übersicht, keine „moderne fMRT-Evidenz“ für Go/No-Go im Speziellen; die Autoren nennen „ongoing controversies“. Metaanalysen: No-Go-Aktivierung spiegelt großteils Aufmerksamkeit/Arbeitsgedächtnis (Criaud & Boulinguez, 2013). Die FAQ-Aussage „Training stärkt Konnektivität und verkürzt SSRT signifikant“ ist durch keine Quelle belegt und durch Enge et al. (2014) nicht gestützt. |
| 5 | Woods et al. (2015), s. 101 | ✓ | teilweise | Einfache RT ~213–231 ms stimmt. **Folgerung für die Übung:** Das Go-Fenster des Originals nähert sich 160 ms, mit Combo-Faktor bis ≈ 120 ms (Untergrenze 100 ms) – kürzer als eine einfache RT plus Gerätelatenz (F01, F09) → auf hohen Stufen nur durch Vorwegnahme lösbar (eigene Ableitung, F12). |

### 103 · Visual Search („Visuelle Suche und selektive Aufmerksamkeit“)

| # | Angabe der Website | DOI-/Angabenprüfung | Stützt? | Begründung |
|---|---|---|---|---|
| 1 | Treisman & Gelade (1980). A feature-integration theory of attention. *Cogn Psychol, 12*(1), 97–136. 10.1016/0010-0285(80)90005-5 | ✓ (nur Metadaten + TLDR; Klassiker) | teilweise | Merkmals- vs. Konjunktionssuche ja. **Falsch** ist die Einordnung „C zwischen O = Konjunktionssuche“: Ein C (Lücke/Linienenden) zwischen O ist eine *Merkmals*suche in der leichten Richtung der Suchasymmetrie (Treisman & Souther, 1985). Im Code hat C die Ablenker O, Q, G – schwer wird es durch **Ähnlichkeit** (Duncan & Humphreys), nicht durch Konjunktion. „Rotierte O“ sind physikalisch nicht von O unterscheidbar. |
| 2 | Wolfe (1994). Guided Search 2.0: A revised model of visual search. *Psychon Bull Rev, 1*(2), 202–238. 10.3758/BF03200774 | ✓ (Abstract) | ja | Parallele Merkmalskarten lenken eine begrenzte Aufmerksamkeitsstufe (Prioritätskarte). |
| 3 | Duncan & Humphreys (1989). Visual search and stimulus similarity. *Psychol Rev, 96*(3), 433–458. 10.1037/0033-295X.96.3.433 | ✓ (nur Metadaten + TLDR) | ja | Ziel-Ablenker-Ähnlichkeit und Ablenker-Heterogenität bestimmen die Schwierigkeit. Einschränkung: Drehung wirkt nur bei nicht rotationssymmetrischen Zeichen (Q, G, C), nicht bei O. |
| 4 | Lavie (1995). Perceptual load as a necessary condition for selective attention. *J Exp Psychol Hum Percept Perform, 21*(3), 451–468. 10.1037/0096-1523.21.3.451 | ✓ (Abstract) | teilweise | Ablenker stören nur bei niedriger perzeptueller Last. Die Seite macht daraus „schützt vor mentalem Abschweifen“ – Lavie untersucht die Verarbeitung *irrelevanter Ablenkreize*, nicht Gedankenabschweifen; im Suchgitter gibt es keinen separaten irrelevanten Ablenker. |
| 5 | Eriksen & St. James (1986). Visual attention within and around the field of focal attention: A zoom lens model. *Percept Psychophys, 40*(4), 225–240. 10.3758/BF03211502 | ✓ (nur Metadaten; Klassiker) | ja | Zoom-Lens-Modell (variabler Aufmerksamkeitsfokus). |
| 6 | Bacon & Egeth (1994). Overriding stimulus-driven attentional capture. *Percept Psychophys, 55*(5), 485–496. 10.3758/BF03205306 | ✓ (Abstract) | nein | Zeigt, dass gezielte Suche nach einem bekannten Merkmal das Einfangen durch Farb-Singletons verhindert. Die Website zitiert es für „hohe perzeptive Last fordert selektive Aufmerksamkeit“ – anderes Thema; das Gitter enthält keine Singletons. |
| 7 | Woods et al. (2015), s. 101 | ✓ | nein | Einfache RT, kein Bezug zur Suche. |
| – | *Ohne Quelle:* „optimales Foveations-Intervall 200–250 ms; jede Fixation auf das Minimum begrenzen“ | – | – | Mittlere Fixationsdauer bei Suche 180–275 ms (Rayner, 1998/2009; F29) – das ist ein Mittelwert, kein „physiologisches Minimum“; Fixationsdauer passt sich der Schwierigkeit an. |

### 104 · Moving Target („Zielverfolgung und Auge-Hand-Koordination“)

| # | Angabe der Website | DOI-/Angabenprüfung | Stützt? | Begründung |
|---|---|---|---|---|
| 1 | Rashbass (1961). „The relationship between saccadic and smooth pursuit eye movements“. *J Physiol, 159*(2), 326–338. 10.1113/jphysiol.1961.sp006811 | ⚠ DOI ✓, Titel leicht falsch – richtig: „…saccadic and smooth **tracking** eye movements“ | teilweise | Step-Ramp-Klassiker: Folgebewegung reagiert auf Geschwindigkeit, Sakkaden auf Positionsfehler – ja. Die Tipps „150–220 ms RT → 5–15 px vorhalten (Rashbass)“ betreffen Mausbewegungen und stehen nicht bei Rashbass. |
| 2 | Krauzlis (2004). Recasting the smooth pursuit eye movement system. *J Neurophysiol, 91*(2), 591–603. 10.1152/jn.00801.2003 | ✓ (Abstract) | teilweise | Netzwerk MT/MST, FEF, Kleinhirn, dazu Basalganglien, Colliculus superior – ja. Aber Krauzlis argumentiert gerade, dass Folgebewegung und Sakkaden eine **gemeinsame Kaskade** nutzen – die Website benutzt ihn für „unabhängige Systeme“. Die „30°/s-Grenze“ steht nicht im Abstract. |
| 3 | Land & McLeod (2000). From eye movements to actions: How batsmen hit the ball. *Nat Neurosci, 3*(12), 1340–1345. „10.1038/81861“ | ⚠ **DOI falsch** (nicht registriert) – richtig: **10.1038/81887** | teilweise | Kricket: prädiktive Sakkade zum erwarteten Aufsprungpunkt, danach 100–200 ms Folgen; kurze Latenz der ersten Sakkade unterscheidet gute Schlagleute – ja. „Genau diese Fähigkeit schult dieser Drill“ – nicht belegt (2D-Wandabpraller am Bildschirm). |
| 4 | Bahill, Iandolo & Troost (1980). Smooth pursuit eye movements in response to unpredictable target waveforms. *Vision Res, 20*(11), 923–931. 10.1016/0042-6989(80)90073-5 | ✓ (nur Metadaten + TLDR: pseudozufällige Rampen) | unklar | Kein Abstract; laut TLDR geht es um *Unvorhersagbarkeit*, nicht um eine „30–40°/s-Grenze“. Zur Geschwindigkeit siehe Collewijn & Tamminga (1984), Meyer et al. (1985) (F35, F36). |
| 5 | Woods et al. (2015), s. 101 | ✓ | teilweise | Bildraster 16,7/6,9/4,1 ms ist Physik, nicht Woods. Im Code bewegt sich das Ziel pro Frame → bei 144 Hz 2,4-fach schneller (F81). |

### 105 · Pursuit Tracker („Glatte Blickfolge und visumotorische Zielverfolgung“)

| # | Angabe der Website | DOI-/Angabenprüfung | Stützt? | Begründung |
|---|---|---|---|---|
| 1 | Rashbass (1961), s. 104 | ⚠ Titel leicht falsch (s. o.) | ja | Unterschiedliche Antriebe von Folgebewegung (Netzhautschlupf) und Sakkaden (Positionsfehler). |
| 2 | Krauzlis (2004), s. 104 | ✓ | teilweise | wie 104; „eigenständige prämotorische Schaltkreise“ relativiert Krauzlis. |
| 3 | Leigh & Zee (2015). *The Neurology of Eye Movements* (5. Aufl.). Oxford University Press. „10.1093/med/9780199969203.001.0001“ | ⚠ **DOI falsch** (nicht auflösbar) – richtig: **10.1093/med/9780199969289.001.0001** (Crossref: Leigh & Zee, 2015) | ja (plausibel) | Standardwerk; Netzhautschlupf als Antrieb, Aufholsakkaden. Buchinhalt nicht eingesehen. Die Dauer „20–40 ms“ kleiner Aufholsakkaden passt zur Hauptsequenz (~2,7 ms/°; Baloh et al., 1975; F40). |
| 4 | Lisberger (2010). „Visual tracking in primates: Neural mechanisms of smooth pursuit eye movements“. *Curr Opin Neurobiol, 20*(4), 405–410. 10.1016/j.conb.2010.04.004 | ✗ **nicht auffindbar**: Die DOI gehört zu Semaan & Kauffman (2010), „Sexual differentiation and development of forebrain reproductive circuits“, *Curr Opin Neurobiol, 20*(4), 424–431. Ein Lisberger-Artikel dieses Titels existiert laut Crossref-Suche nicht. Vermutlich gemeint: Lisberger (2010), *Neuron, 66*(4), 477–491, 10.1016/j.neuron.2010.03.027 ✓ | nein | Die damit belegten Aussagen („Voll synchronisiertes Kleinhirn-Innenmodell, Top 1 %“, „Overshoot bei Hitboxen“) haben keine Datengrundlage. |
| 5 | Barnes (2008). Cognitive processes involved in smooth pursuit eye movements. *Brain Cogn, 68*(3), 309–326. 10.1016/j.bandc.2008.08.020 | ✓ (Abstract) | teilweise | Vorhersage über extraretinale Mechanismen, Aufmerksamkeit erhöht den Gain für das gewählte Objekt – ja. „Training erleichtert Lesen und verringert digitale Augenbelastung“ – steht nicht darin; Wirksamkeit von CVS-Maßnahmen ist unbewiesen (Rosenfield, 2011). |
| 6 | Woods et al. (2015), s. 101 | ✓ | nein | Für „performance.now()/Subpixel-Analyse der Time on Target“ irrelevant. |
| – | *Aussage ohne Quelle:* „Pursuit kann nicht willkürlich auf leerem Schirm erzeugt werden“ | – | – | Im Wesentlichen richtig, aber es gibt **antizipatorische** Folgebewegung bei erwarteter Bewegung (Barnes, 2008; Kowler et al., 2019). |
| – | *Aussage ohne Quelle:* „Latenz 100–130 ms“ | – | – | Passt: 100 ± 5 ms (Carl & Gellman, 1987; F33). Die Übung misst aber nur den **Cursor**, nicht die Augen. |

### 106 · Multiple Targets („Mehrfach-Objektverfolgung (MOT)“)

| # | Angabe der Website | DOI-/Angabenprüfung | Stützt? | Begründung |
|---|---|---|---|---|
| 1 | Pylyshyn & Storm (1988). Tracking multiple independent targets: Evidence for a parallel tracking mechanism. *Spatial Vision, 3*(3), 179–197. 10.1163/156856888X00122 | ✓ (Abstract) | ja | Bis 5 von 10 Objekten, 87 % richtig, serielles Abtasten hätte ≈ 40 % ergeben. „Fällt danach scharf ab“ vereinfacht: die Kapazität hängt vom Tempo ab (Alvarez & Franconeri, 2007). |
| 2 | Cavanagh & Alvarez (2005). Tracking multiple targets with multifocal attention. *Trends Cogn Sci, 9*(7), 349–354. 10.1016/j.tics.2005.05.009 | ✓ (Abstract) | teilweise | „Grenze der Aufmerksamkeit, nicht der Optik“, ≥ 4 Ziele, Halbfeld-Unabhängigkeit – ja. „fMRT belegt IPS, FEF und Colliculi superiores“ steht nicht im Abstract; IPS/FEF/MT-Aktivierung bei Tracking unter Fixation zeigt Culham et al. (1998) – Colliculus dort nicht. |
| 3 | Alvarez & Cavanagh (2004). The capacity of visual short-term memory is set both by information load and by number of objects. *Psychol Sci, 15*(2), 106–111. 10.1111/j.0963-7214.2004.01502006.x | ✓ DOI/Titel stimmen | nein | **Falsches Paper** für „Hemifield Independence“: Es geht um die Kapazität des visuellen Kurzzeitgedächtnisses (1,6–4,4 Objekte je nach Reizklasse). Richtig wäre Alvarez & Cavanagh (2005), *Psychol Sci, 16*(8), 637–643, 10.1111/j.1467-9280.2005.01587.x (das FAQ nennt richtig „Alvarez & Cavanagh (2005)“, die Quellenliste führt aber das 2004-Paper). |
| 4 | Green & Bavelier (2006). Enumeration versus multiple object tracking: The case of action video game players. *Cognition, 101*(1), 217–245. „10.1016/j.cognition.2005.10.005“ | ⚠ **DOI falsch** – .005 gehört zu Saxe et al. (2006) über Säuglinge; richtig: **10.1016/j.cognition.2005.10.004** | teilweise | Actionspieler verfolgen ≈ 2 Objekte mehr; Training bei Nichtspielern – ja. Die „Schwerpunkt-Strategie“ stammt **nicht** von dort, sondern von Fehd & Seiffert (2008, 2010). |
| 5 | Faubert (2013). „Professional athletes have extraordinary skills for rapidly learning complex and dynamic visual scenes and the ability to adapt to varying demands“. *Sci Rep, 3*, 1154. 10.1038/srep01154 | ⚠ DOI ✓, **Titel falsch** – richtig: „…rapidly learning complex and **neutral** dynamic visual scenes“ | teilweise | Profis lernen 3D-MOT steiler (n = 308) – ja. „Trainiert 5–6 Ziele“, „steilere Lernkurven in 3D“ auf ein 2D-Browserspiel übertragen, „beseitigt Tunnelblick“ – nicht belegt; NeuroTracker nutzt Stereo-3D (Vater et al., 2021). |
| 6 | Woods et al. (2015), s. 101 | ✓ | nein | Kein Bezug zu MOT. |

### 107 · Distance Judgment („Räumliches Sehen testen: Entfernungsschätzung und Tiefensehen“)

| # | Angabe der Website | DOI-/Angabenprüfung | Stützt? | Begründung |
|---|---|---|---|---|
| 1 | Howard (1919). A test for the judgment of distance. *Am J Ophthalmol, 2*(9), 656–675. „10.1016/S0002-9394(19)90299-8“ | ⚠ **DOI falsch** (nicht registriert) – richtig: **10.1016/S0002-9394(19)90180-2** | nein | Howard-Dolman-Apparat misst **binokulare** Stereosehschärfe mit echten Stäben. Der Drill „operationalisiert“ ihn nicht – am 2D-Bildschirm gibt es keine Disparität (die Website räumt das im FAQ selbst ein). |
| 2 | Lee (1976). A theory of visual control of braking based on information about time-to-collision. *Perception, 5*(4), 437–459. 10.1068/p050437 | ✓ (Abstract) | teilweise | tau (Bildgröße/Expansionsrate) – ja. Falsch: „Bild wächst **exponentiell**“ – bei konstanter Annäherung wächst es hyperbolisch (r ∝ 1/Z). Der Drill lässt den Radius **linear** wachsen, das entspricht einem abbremsenden Objekt; tau liefert dann eine zu frühe Schätzung (docs/wissenschaft/03, 1.4; F71). |
| 3 | Regan & Beverley (1978). Looming detectors in the human visual pathway. *Vision Res, 18*(4), 415–421. „10.1016/0042-6989(78)90050-7“ | ⚠ **DOI falsch** (nicht registriert) – richtig: **10.1016/0042-6989(78)90051-2** | ja | Kanäle für zu- bzw. abnehmende Größe (TLDR; kein Abstract). |
| 4 | Julesz (1971). *Foundations of Cyclopean Perception*. University of Chicago Press. „10.7551/mitpress/3074.001.0001“ | ⚠ **DOI falsch** – führt zu Yoshikawa (1990), *Foundations of Robotics*. Buch ohne ermittelte DOI (Verlag/Jahr über Rezensionen bestätigt, z. B. *Science, 176*, 633–635, 10.1126/science.176.4035.633) | nein | Zufallspunkt-Stereogramme = binokulare Stereopsis; für monokulares Looming am Bildschirm irrelevant. |
| 5 | Woods et al. (2015), s. 101 | ✓ | teilweise | Messtoleranzen durch Bildraster ja; „Differenzen unter 5 ms sind Rauschen“ – Touchgeräte streuen innerhalb eines Geräts ≈ 7 ms und messen 58–70 ms zu lang (Pronk et al., 2020). |
| – | *Aussage:* „Vorbereitung auf den Sehtest für LKW-/Personenbeförderungs-Führerscheine (FeV)“ | FeV Anlage 6 Nr. 2.1.2 geprüft (gesetze-im-internet.de) | nein | Die FeV verlangt für Gruppe 2 und Fahrgastbeförderung **Stereosehen, geprüft mit einem geeigneten Test (z. B. Random-Dot-Tests)** – genau das kann ein 2D-Looming-Spiel weder üben noch vorbereiten (F74). Italienische Vorschriften (Südtirol) nicht geprüft. |

### 108 · Entropic Grid („Visuelle Suche: Selektive Aufmerksamkeit im wechselnden Raster“)

| # | Angabe der Website | DOI-/Angabenprüfung | Stützt? | Begründung |
|---|---|---|---|---|
| 1 | Treisman & Gelade (1980), s. 103 | ✓ | teilweise | Theorie ja; das Raster verlangt aber Zeichen**erkennung** (zweistellige Codes, fast Lesen), nicht Merkmalsbindung im engeren Sinn. |
| 2 | Wolfe (2007). Guided Search 4.0: Current progress with a model of visual search. In W. D. Gray (Hrsg.), *Integrated Models of Cognitive Systems* (S. 99–119). Oxford University Press. 10.1093/acprof:oso/9780195189193.003.0008 | ✓ (Buchkapitel, nur Metadaten) | teilweise | Prioritätskarte aus Bottom-up und Top-down – ja. „Elite/Profi-Klasse (Top 1 %) … (Wolfe, 2007)“ – kein Normwert bei Wolfe. |
| 3 | Duncan & Humphreys (1989), s. 103 | ✓ | teilweise | Ähnlichkeitsprinzip ja; „dorsolateraler präfrontaler Kortex sendet inhibitorische Signale, die Rauschreize aktiv tilgen“ steht dort nicht (psychologische Theorie ohne Hirnareale). |
| 4 | Posner (1980), s. 101 | ✓ | nein | Für „parafoveales Scanning außerhalb des 2°-Zentrums eliminiert Korrektursakkaden“ keine Quelle. |
| 5 | Green & Bavelier (2006), s. 106 | ⚠ DOI falsch (.005 → .004) | nein | Nur in der Liste, im Text ohne Bezug; MOT/Abzählen, nicht Suche im Rauschen. |
| 6 | Woods et al. (2015), s. 101 | ✓ | nein | Die FAQ-Aussage „Mit dem Alter verengt sich das UFOV (Woods et al., 2015)“ ist **falsch zugeordnet** – richtig: Ball et al. (1988), Owsley et al. (1998) (F75, F76). |
| – | *Im Fließtext:* Wolfe (1994), Lavie (1995), Eriksen & St. James (1986) | s. 103 | teilweise | Allgemeine Modelle passend; „bindet die gesamte kortikale Bandbreite, wodurch Hintergrundrauschen neurochemisch effizient blockiert wird“ ist eine Überdehnung von Lavie. |
| – | *Aussage:* „700-ms-Regeneration modelliert reale Ablenkung“ | – | – | Umplatzieren **aller** Elemente alle 111 ms ließ die Sucheffizienz unverändert (Horowitz & Wolfe, 1998); plötzlich erscheinende Zeichen ziehen aber Aufmerksamkeit an (Yantis & Jonides, 1984) → Neu-Würfeln ist eher ein Ablenkreiz als „Rauschfilter-Training“ (F27, F28). |

### 109 · Rhythm Anomaly („Flimmerfusion-Test“ / „Visuelle Zeitauflösung“)

| # | Angabe der Website | DOI-/Angabenprüfung | Stützt? | Begründung |
|---|---|---|---|---|
| 1 | Holcombe (2009). „Seeing slow and seeing fast: Two limits on temporal resolution in vision“. *Trends Cogn Sci, 13*(5), 216–221. 10.1016/j.tics.2009.02.005 | ⚠ DOI ✓, **Titel falsch** – richtig: „…two limits on **perception**“ | teilweise | Zwei Gruppen von Zeitgrenzen: schnelle (Bewegungsrichtung, Tiefe, Kanten) und grobe (Paarung von Farbe und Bewegung, Identifikation getrennter Merkmale) – ja. „Subkortikale Abtastgrenze 40–50 Hz durch M-Zellen“ ist eine Zuspitzung der Website; der Abstract nennt keine Zahlen/Zelltypen. |
| 2 | Kelly (1961). Visual responses to time-dependent stimuli. I. Amplitude sensitivity measurements. *J Opt Soc Am, 51*(4), 422–429. 10.1364/JOSA.51.000422 | ✓ (nur Metadaten; kein Abstract) | teilweise | Klassische Flimmer-Empfindlichkeitskurven – thematisch passend; „Gipfel 10–20 Hz, Fusion bei 50–60 Hz“ ist mit der CFF-Literatur vereinbar (50–90 Hz; Mankowska et al., 2021), am Original nicht geprüft. |
| 3 | De Lange Dzn (1958). „…II. Phase shift in clinical applications“. *J Opt Soc Am, 48*(11), 784–789. 10.1364/JOSA.48.000784 | ⚠ DOI ✓, **Titel falsch** – richtig: „Research into the dynamic nature of the human fovea→cortex systems with intermittent and modulated light. II. Phase shift in brightness and delay in color perception“ | teilweise | Psychophysik der Flimmer-/Phasenwahrnehmung – ja. „Der M-Pfad registriert Phasenverschiebungen bis 40–50 Hz (De Lange)“ – De Lange hat keine Zellpfade untersucht. |
| 4 | Burr (1980). „Motion smear: Two types of visual suppression“. *Nature, 284*(5752), 164–165. 10.1038/284164a0 | ⚠ DOI ✓, **Titel falsch** – richtig nur „Motion smear“ | teilweise | Zeitliche Summation ≈ **120 ms** bei Tageslicht; Bewegte Ziele wirken viel weniger verschmiert als erwartet – das Integrationsfenster ist belegt, aber nicht „30–100 ms“ und nicht „stochastisches Rauschfiltern“. |
| 5 | Posner (1980), s. 101 | ✓ | nein | Kein Bezug zu Flimmern/Rhythmus. |
| 6 | Woods et al. (2015), s. 101 | ✓ | nein | Kein Bezug zu zeitlicher Integration. |
| – | *Name* „Flimmerfusion-Test“ / „CFF-Grenzsensitivität“ | – | – | Das Original pulsiert mit ≈ 0,6–1,7 Hz (Anomalie bis 2,5 Hz; Code-Analyse) – weit unter der CFF (50–90 Hz). Gemessen wird Frequenz-/Phasenunterscheidung, keine Flimmerfusion. Zudem pulsiert die Anomalie mit **doppelter Helligkeit** → Helligkeit statt Rhythmus als Hinweis (F82). |

---

## B) Faktenliste „Aussage – Zahl – Quelle“

Spalte „Üb.“ = Katalognummern, für die der Fakt vor allem relevant ist. Vollständige APA-Angaben in D.

### B1 Reaktionszeit, Latenzen, Messtechnik

| Nr | Aussage | Zahl | Quelle (geprüfte DOI) | Üb. |
|---|---|---|---|---|
| F01 | Einfache visuelle RT, zeitlich kalibriert, 18–65 J. (n = 1.469); Anstieg mit dem Alter; reine Reizentdeckung altersunabhängig, Altersanstieg vor allem motorisch | 231 ms (213 ms ohne Hardware-Verzögerung); +0,55 ms/Jahr; Entdeckung ≈ 131 ms | Woods et al. (2015), 10.3389/fnhum.2015.00131 | 101, 102 |
| F02 | Lehrbuch-Richtwerte (Übersicht, graue Literatur) | visuell 180–200 ms, auditiv 140–160 ms | Kosinski (2013, Clemson), keine DOI | 101 |
| F03 | Unkalibrierte Laptop-Messung (n = 14) | visuell ≈ 331 ms, auditiv ≈ 284 ms | Shelton & Kumar (2010), 10.4236/nm.2010.11004 | 101 |
| F04 | Beginn der Aktivität über dem visuellen Kortex (Mensch, EEG) und im dorsolateralen Frontalkortex | C1 ≈ 56 ms; frontal ≈ 80 ms | Foxe & Simpson (2002), 10.1007/s00221-001-0906-7 | 101, 102 |
| F05 | Makak: magnozelluläre CGL-Schichten antworten früher als parvozelluläre; V1 zuerst, dann MT/MST/FEF zugleich, V4 später | Vorsprung ≈ 17 ms | Schmolesky et al. (1998), 10.1152/jn.1998.79.6.3272 | 102, 109 |
| F06 | Piéron'sches Gesetz: RT sinkt als Potenzfunktion der Reizintensität, gleiche Exponenten für einfache und Wahlreaktion | – | Pins & Bonnet (1996), 10.3758/BF03206815 | 101 |
| F07 | Einfache RT (PVT) ist praktisch nicht übbar: 16 Wiederholungen ohne systematische Änderung von Mittelwert/Median | 16 Sitzungen, n = 45 | Basner et al. (2018), 10.1093/sleep/zsx187 | 101 |
| F08 | Alter: einfache RT bis ≈ 50 J. kaum langsamer, danach deutlicher; Wahl-RT über das ganze Erwachsenenalter | n = 7.130 | Der & Deary (2006), 10.1037/0882-7974.21.1.62 | 101, 102 |
| F09 | Browser-Web-App auf Touchgeräten misst RT systematisch zu lang; Streuung innerhalb eines Geräts klein | iPhone ≈ 58 ms, Galaxy 66–70 ms, Laptops 62–133 ms; SD ≈ 7 ms | Pronk et al. (2020), 10.3758/s13428-019-01321-2 | alle |
| F10 | Bildraster (Physik): Bilddauer 16,7 ms (60 Hz), 6,9 ms (144 Hz), 4,2 ms (240 Hz); mittlerer zusätzlicher Anzeigeverzug ≈ halbe Bilddauer | 8,3 ms bei 60 Hz | eigene Rechnung | alle |
| F11 | Zielaufgaben (8 E-Sportler): geringere **Latenz** verbessert die Leistung klar, höhere Bildrate allein (bei gleicher Latenz) kaum | 30 ms Latenz wichtiger als > 60 Hz | Spjut et al. (2019), 10.1145/3355088.3365170 | 101, 104, 105 |
| F12 | Antwortfenster im Original liegen auf hohen Stufen **unter** der physiologisch möglichen einfachen RT (Entdecken ≈ 131 ms + Bewegung + Gerätelatenz) → nur durch Vorwegnahme lösbar | Light Reaction: L10 183 ms, L15 125 ms, Untergrenze 50 ms; Go/No-Go: Grenzwert 160 ms × Combo-Faktor bis 0,75 (≈ 120 ms), Untergrenze 100 ms | eigene Ableitung aus docs/skilldrills-analyse.md mit F01, F09 | 101, 102 |
| F13 | Photosensitivität des Originals (Light Reaction): Weißer Blitz ist ein voller Helligkeitswechsel, aber kleinflächig | ΔL ≈ 0,99 (#151515 → #FFFFFF); Scheibe 104 px ≈ 0,0017 sr (Desktop 60 cm) bis ≈ 0,0035 sr (Handy 25 cm) < 0,006 sr; ≤ 2 Blitze/s | eigene Rechnung nach WCAG 2.2, SC 2.3.1 (W3C, 2024) | 101 |

### B2 Reaktionshemmung (Go/No-Go)

| Nr | Aussage | Zahl | Quelle | Üb. |
|---|---|---|---|---|
| F14 | Go/No-Go fordert Hemmung nur mit seltenen Stopp-Reizen und schnellem Takt; nur wenige Experimente erfüllen das | ≤ 20 % Stopp, ≤ 1.500 ms Takt; 8,7 % von 241 Experimenten | Wessel (2018), 10.1111/psyp.12871 | 102 |
| F15 | SART: seltene No-Go-Reize; Fehlalarme werden durch beschleunigte vorangehende Antworten angekündigt; Zusammenhang mit Alltagsfehlern | No-Go 1 von 9; r = −0,58 mit Glasgow Coma Scale (SHT-Gruppe) | Robertson et al. (1997), 10.1016/S0028-3932(97)00015-8 | 102 |
| F16 | fMRT-Metaanalyse: Großteil der No-Go-Aktivierung (inkl. prä-SMA) spiegelt Aufmerksamkeits-/Arbeitsgedächtnisanforderungen, nicht Hemmung per se | 30 Experimente | Criaud & Boulinguez (2013), 10.1016/j.neubiorev.2012.11.003 | 102 |
| F17 | Gemeinsam in einfachen und komplexen Go/No-Go-Aufgaben: prä-SMA und linker Gyrus fusiformis; rechter DLPFC/inferiorer Parietalkortex nur bei höherer Arbeitsgedächtnislast | ALE-Metaanalyse | Simmonds et al. (2008), 10.1016/j.neuropsychologia.2007.07.015 | 102 |
| F18 | Messzuverlässigkeit: Go/No-Go-Fehlalarme gut, SSRT nur mäßig | Fehlalarme ICC = 0,76 (2 Studien); SSRT ICC 0,36–0,49 | Hedge et al. (2018), 10.3758/s13428-017-0935-1 (Volltext) | 102 |
| F19 | Adaptives Hemmtraining nicht besser als aktive Kontrolle; kein Transfer auf Stroop/fluide Intelligenz; verbessert vor allem Go-Tempo | RCT n = 122, 3 Wochen | Enge et al. (2014), 10.1037/a0036165 | 102 |
| F20 | Impulskontrolltraining verbessert die geübten Aufgaben, nicht das Simulatorfahren junger Fahrer | 5–10 Tage, 16–24 J. | Hatfield et al. (2018), 10.1016/j.aap.2018.06.012 | 102 |
| F21 | Kinder: Training einzelner exekutiver Funktionen – naher Transfer ja, ferner nein | g = 0,44 (k = 43) vs. g = 0,11 (k = 17, n. s.) | Kassai et al. (2019), 10.1037/bul0000180 | 102 |
| F22 | Ältere hemmen gerade bei Go/No-Go und Stop-Signal schwächer | Metaanalyse, 176 Studien | Rey-Mermet & Gade (2018), 10.3758/s13423-017-1384-7 | 102 |
| F23 | Rot-Grün-Farbsehschwäche in Europa | ≈ 8 % der Männer, ≈ 0,4 % der Frauen | Birch (2012), 10.1364/JOSAA.29.000313 | 102 (Original nur Farbe) |

### B3 Visuelle Suche

| Nr | Aussage | Zahl | Quelle | Üb. |
|---|---|---|---|---|
| F24 | Suchasymmetrie: Ziel **mit** zusätzlichem Merkmal (Lücke/Linienende) wird effizient gefunden, Ziel ohne dieses Merkmal nicht → C zwischen O leicht, O zwischen C schwer | – | Treisman & Souther (1985), 10.1037/0096-3445.114.3.285 | 103 |
| F25 | Schwierigkeit steigt mit Ziel-Ablenker-Ähnlichkeit und Ablenker-Heterogenität | – | Duncan & Humphreys (1989), 10.1037/0033-295X.96.3.433 | 103, 108 |
| F26 | Suchsteigungen bilden ein Kontinuum (keine zwei getrennten Modi) | ≈ 1 Mio. Durchgänge, 2.500 Sitzungen | Wolfe (1998), 10.1111/1467-9280.00006 | 103 |
| F27 | Aufmerksamkeitsfordernde Suche (T unter L): Rate pro Element; Umplatzieren aller Elemente alle 111 ms ändert die Effizienz **nicht** („Suche ohne Gedächtnis“) | 20–30 ms/Element | Horowitz & Wolfe (1998), 10.1038/29068 | 103, 108 |
| F28 | Plötzlich erscheinende Elemente (abrupt onset) ziehen Aufmerksamkeit an | – | Yantis & Jonides (1984), 10.1037/0096-1523.10.5.601 | 108 |
| F29 | Mittlere Fixationsdauer: visuelle Suche < Szenen; Lesen dazwischen | Suche 180–275 ms, stilles Lesen 225–250 ms, Szenen 260–330 ms | Rayner (1998), 10.1037/0033-2909.124.3.372; Werte über van der Lans et al. (2011), 10.3758/s13428-010-0031-2 (Volltext) | 103, 108 |
| F30 | Distraktoren stören nur bei niedriger perzeptueller Last | – | Lavie (1995), 10.1037/0096-1523.21.3.451 | 103, 108 |
| F31 | Anfangs serielle Suchen werden nach wenigen hundert Durchgängen parallel; Transfer über Aufgaben, Orte und Augen | – | Sireteanu & Rettenbach (2000), 10.1016/S0042-6989(00)00145-0 | 103 |
| F32 | Lebensspanne: Suche früh und spät verlangsamt, Konjunktionssuche stärker; Ältere besonders bei vielen Ablenkern und Durchgängen ohne Ziel | n = 298, 6–89 J. | Hommel et al. (2004), 10.1037/0012-1649.40.4.545 | 103, 108 |

### B4 Augenbewegungen (Blickfolge, Sakkaden)

| Nr | Aussage | Zahl | Quelle | Üb. |
|---|---|---|---|---|
| F33 | Latenz der glatten Folgebewegung auf unvorhersehbare Zielbewegung; Beschleunigung sättigt; ab 15° Abstand der Bildbewegung von der Fovea keine präsakkadische Antwort | 100 ± 5 ms (Ziele ≥ 5°/s); ≈ 50°/s² | Carl & Gellman (1987), 10.1152/jn.1987.57.5.1446 | 104, 105 |
| F34 | Step-Ramp 5–30°/s: stationärer Gain und Latenz | Gain ≈ 0,95; Latenz ≈ 100 ms; Nachschwingen ≈ 3,8 Hz | Robinson, Gordon & Gordon (1986), 10.1007/BF00363977 | 104, 105 |
| F35 | Gain bleibt unter 0,95 und sinkt monoton mit der Zielgeschwindigkeit; strukturierter Hintergrund senkt ihn | −10 % horizontal, −20 % vertikal | Collewijn & Tamminga (1984), 10.1113/jphysiol.1984.sp015242 | 105 |
| F36 | Obergrenze individuell hoch → „30°/s-Grenze“ ist eine Vereinfachung | ≈ 90 % Gain bis 100°/s (4 von 5 Personen) | Meyer, Lasker & Robinson (1985), 10.1016/0042-6989(85)90160-9 | 104, 105 |
| F37 | Unvorhersagbarkeit senkt den Gain | Gain der langsamen Anteile 0,92 → 0,53, wenn die schnellste Komponente von 0,39 auf 1,56 Hz steigt (Spitze ±3,3°/s) | Barnes, Donnelly & Eason (1987), 10.1113/jphysiol.1987.sp016649 | 105 |
| F38 | Aufholsakkaden: Auslöser ist die vorhergesagte „Eye crossing time“ | 40–180 ms → rein glatt; sonst Sakkade nach ≈ 125 ms | de Brouwer et al. (2002), 10.1152/jn.00432.2001 | 104, 105 |
| F39 | Sakkadenlatenz (Gap-Paradigma) | regulär ≈ 150 ms, Express ≈ 100 ms | Fischer & Ramsperger (1984), 10.1007/BF00231145 | 103, 106 |
| F40 | Sakkadendauer steigt linear mit der Amplitude | ≈ 2,7 ms pro Grad (n = 25) | Baloh et al. (1975), 10.1212/WNL.25.11.1065 | 103, 105 |
| F41 | Sakkadische Unterdrückung betrifft selektiv niedrigfrequente Luminanzmuster (magnozellulär) | – | Burr, Morrone & Ross (1994), 10.1038/371511a0 | 106, 109 |
| F42 | Pursuit-Netzwerk: kortikale Areale → dorsopontine Kerne/NRTP → Flocculus-Paraflocculus und posteriorer Vermis; FEF-Pursuit-Region, Basalganglien, Colliculus superior; Pursuit und Sakkaden als „gemeinsame Kaskade“ | – | Thier & Ilg (2005), 10.1016/j.conb.2005.10.013; Krauzlis (2004), 10.1152/jn.00801.2003 | 104, 105 |
| F43 | Vorhersage über extraretinale Mechanismen (Efferenzkopie, Kurzzeitgedächtnis für Geschwindigkeit); antizipatorische Folgebewegung bei Erwartung | – | Barnes (2008), 10.1016/j.bandc.2008.08.020 | 105 |
| F44 | Alter: geringerer Pursuit-Gain bei allen Geschwindigkeiten | 75–93 J. vs. 18–43 J. | Moschner & Baloh (1994), 10.1093/geronj/49.5.M235 | 104, 105 |
| F45 | Kurztraining mit quasi-zufälligem Ziel verbessert die Folgebewegung, noch 5 Tage später | 2 × 6 min an 3 Tagen; n = 10 + 10 | Eibenberger et al. (2012), 10.1007/s00221-012-3009-8 | 105 |
| F46 | Kricket: prädiktive Sakkade zum Aufsprungpunkt, 100–200 ms Folgen nach dem Aufsprung; kurze Latenz der ersten Sakkade unterscheidet gute Schlagleute | – | Land & McLeod (2000), 10.1038/81887 | 104 |

### B5 Interzeption und Handmotorik

| Nr | Aussage | Zahl | Quelle | Üb. |
|---|---|---|---|---|
| F47 | Präzision beim Treffen bewegter Ziele; Grenze vor allem visuell | SD ≈ 20 ms zeitlich, ≈ 5 mm räumlich | Brenner & Smeets (2009), 10.1007/s00221-009-1757-x | 104 |
| F48 | Bei schnelleren Zielen wird weiter vorn, aber zu wenig weit getroffen → Tendenz „hinter das Ziel“ | – | Brouwer et al. (2002), 10.1007/s00221-001-0980-x | 104 |
| F49 | Mit den Augen folgen vermeidet systematische Interzeptionsfehler | – | de la Malla et al. (2017), 10.1038/s41598-017-11200-5 | 104 |
| F50 | Visuomotorische Latenz beim Abfangen durch Tippen oder Wischen | 114 ms (n = 22) | Brenner, Bom & Smeets (2026), 10.1007/s00221-026-07264-3 | 104 |
| F51 | Manuelles Tracking ist intermittierend; Korrekturen starten ab einer Fehler-Totzone, Refraktärabstand zwischen Korrekturen | Totzone ≈ 0,8°; ≈ 170 ms; Leistung 0,5–1,8 Hz | Miall, Weir & Stein (1993), 10.1080/00222895.1993.9941639 | 105 |
| F52 | Physiologischer Tremor ist multifaktoriell (zentrale ~10-Hz-Oszillation, Motoreinheiten, Resonanzen); Parkinson-Tremor langsamer | ~10 Hz vs. 3–6 Hz | McAuley & Marsden (2000), 10.1093/brain/123.8.1545 | 104, 105 |
| F53 | Touch-Zielgröße für sicheres Treffen (Daumen, Einzelziele) | ≥ 9,2 mm | Parhi et al. (2006), 10.1145/1152215.1152260 | 104, 106 |
| F54 | Original Moving Target: Zielradius 26 → 8 px; bei 40 cm auf dem iPad (≈ 36 CSS-px/°) sind 16 px Ø ≈ 0,45° ≈ 3 mm – weit unter F53 | – | eigene Rechnung (docs/skilldrills-analyse.md; docs/wissenschaft/02, Abschn. 4) | 104 |

### B6 Mehrfach-Objektverfolgung (MOT)

| Nr | Aussage | Zahl | Quelle | Üb. |
|---|---|---|---|---|
| F55 | Parallele Verfolgung | bis 5 von 10; 87 % vs. ≈ 40 % bei seriellem Abtasten | Pylyshyn & Storm (1988), 10.1163/156856888X00122 | 106 |
| F56 | Kapazität hängt vom Tempo ab | bis 8 Objekte langsam, 1 Objekt sehr schnell | Alvarez & Franconeri (2007), 10.1167/7.13.14 | 106 |
| F57 | Linkes und rechtes Halbfeld arbeiten unabhängig | doppelt so viele Ziele bei Verteilung auf beide Halbfelder | Alvarez & Cavanagh (2005), 10.1111/j.1467-9280.2005.01587.x | 106 |
| F58 | fMRT bei Tracking unter Fixation: IPS, postzentraler Sulcus, SPL, Präcuneus, FEF, MT-Komplex; in frühen Arealen keine Aufmerksamkeitsverstärkung; parietal/frontal Signal mehr als verdoppelt | 3 von 9 Bällen | Culham et al. (1998), 10.1152/jn.1998.80.5.2657 | 106 |
| F59 | Blick liegt bei 3 Zielen näher am Zentrum des Zieldreiecks als an einzelnen Zielen („Center-Looking“) | 1 bzw. 3 von 8 Punkten | Fehd & Seiffert (2008), 10.1016/j.cognition.2007.11.008 | 106 |
| F60 | Alter: Ältere besonders bei schneller Bewegung und **langer Trackingdauer** beeinträchtigt; Videospielerfahrung hilft Jungen | 75,3 vs. 20,6 J. | Sekuler et al. (2008), 10.1068/p5923 | 106 |
| F61 | Action-Videospieler verfolgen mehr Objekte; Training bei Nichtspielern wirkt | ≈ 2 Objekte mehr | Green & Bavelier (2006), 10.1016/j.cognition.2005.10.004 | 106 |
| F62 | Profisportler lernen 3D-MOT steiler als Amateure und Studierende | n = 308 | Faubert (2013), 10.1038/srep01154 | 106 |
| F63 | Ältere (64–73 J.) gewinnen durch 3D-MOT-Training gleich viel wie Junge | 5 Wochen | Legault et al. (2013), 10.3389/fpsyg.2013.00323 | 106 |
| F64 | NeuroTracker-Review: kaum rigorose Studien, Ferntransfer schwach | 16 Interventionsstudien, 10 mit Kontrolle + Transfermaß, 0 präregistriert | Vater, Gray & Holcombe (2021), 10.3758/s13423-021-01892-2 | 106 |
| F65 | Original: **ein** Durchgang mit **60 s** Tracking, 3 Ziele, 8–20 Bälle, harte Stöße – Studien nutzen 6–10 s | 60 s vs. 6–10 s | docs/skilldrills-analyse.md; Alvarez & Franconeri (2007): 6 s; Faubert (2013): 8 s | 106 |

### B7 Looming, Zeit bis zum Kontakt, Stereosehen

| Nr | Aussage | Zahl | Quelle | Üb. |
|---|---|---|---|---|
| F66 | tau = Bildgröße/Expansionsrate liefert bei konstanter Annäherung die Zeit bis zur Kollision, unabhängig von Größe und Distanz | – | Lee (1976), 10.1068/p050437 | 107 |
| F67 | Kanäle für zu- und abnehmende Größe (Looming) | – | Regan & Beverley (1978), 10.1016/0042-6989(78)90051-2 | 107 |
| F68 | Genauigkeit der Kontaktzeit-Schätzung monokular vs. binokular+monokular | monokular: Unterschiedsschwelle 5,8–12 %, Fehler 2–12 %; kombiniert 1,3–2,7 % | Gray & Regan (1998), 10.1016/S0042-6989(97)00230-7 | 107 |
| F69 | Kontaktzeiten werden unterschätzt, zunehmend mit längerer Zeit | – | Schiff & Detwiler (1979), 10.1068/p080647 | 107 |
| F70 | Strenge tau-Hypothese nicht haltbar; genutzte Information hängt von der Aufgabe ab | – | Tresilian (1999), 10.1016/S1364-6613(99)01352-2 | 107 |
| F71 | Bild einer mit konstanter Geschwindigkeit nahenden Kugel wächst hyperbolisch (1/r sinkt linear); lineares Radiuswachstum (Original) entspricht einem abbremsenden Objekt | – | Herleitung, docs/wissenschaft/03 (1.4) | 107 |
| F72 | Stereoblindheit bei Erwachsenen < 60 J. (vier Schätzansätze) | ≈ 7 %; Ältere evtl. mehr | Chopin, Bavelier & Levi (2019), 10.1111/opo.12607 | 107 |
| F73 | Verteilung der Stereosehschärfe (Studierende) | 97,3 % sehen Tiefe bei ≤ 2,3′, ≥ 80 % bei 30″ | Coutant & Westheimer (1993), 10.1111/j.1475-1313.1993.tb00419.x | 107 |
| F74 | FeV (DE): Für Klassen C/D und Fahrgastbeförderung ist **Stereosehen, geprüft mit geeignetem Test (z. B. Random-Dot)** gefordert; Untersuchung auch durch Augenoptikerbetrieb möglich | Anlage 6 Nr. 2.1, 2.1.2 | FeV Anlage 6 (D3) | 107 |

### B8 Nützliches Sehfeld (für Blickfit „Blitzblick“, Ersatz von 108)

| Nr | Aussage | Zahl | Quelle | Üb. |
|---|---|---|---|---|
| F75 | Nützliches Sehfeld schrumpft mit dem Alter, durch Übung teilweise wieder größer | – | Ball et al. (1988), 10.1364/JOSAA.5.002210 | 108 (Blickfit) |
| F76 | UFOV-Einschränkung ≥ 40 % → höheres Unfallrisiko älterer Fahrer über 3 Jahre | 2,2-fach (95 %-KI 1,2–4,1), n = 294 | Owsley et al. (1998), 10.1001/jama.279.14.1083 | 108 (Blickfit) |
| F77 | ACTIVE: Geschwindigkeitstraining verbessert die trainierte Fähigkeit, nach 2 J. kein Effekt auf Alltagsfunktion | 87 % verlässlich verbessert; 10 Sitzungen; n = 2.832 | Ball et al. (2002), 10.1001/jama.288.18.2271 | 108 (Blickfit) |
| F78 | Metaanalyse UFOV-Training: Verarbeitungsgeschwindigkeit/Aufmerksamkeit besser, Transfer auf Alltagsfunktionen, adaptiv besser; kein Transfer auf andere neuropsychologische Tests | 17 RCTs (44 Arbeiten) | Edwards et al. (2018), 10.1016/j.neubiorev.2017.11.004 | 108 (Blickfit) |

### B9 Zeitliche Auflösung und Sicherheit

| Nr | Aussage | Zahl | Quelle | Üb. |
|---|---|---|---|---|
| F79 | Photosensitivität: licht-/musterausgelöste Anfälle selten, bei Jungen häufiger; stärkste Provokation 15–25 Hz, Spanne 1–65 Hz; Rot ist ein Faktor | ≈ 1 : 10.000; 5–24 J. ≈ 1 : 4.000 | Fisher et al. (2005), 10.1111/j.1528-1167.2005.31405.x | 101, 109 |
| F80 | Kritische Flimmerverschmelzungsfrequenz (CFF) | ≈ 50–90 Hz | Mankowska et al. (2021), 10.3390/medicina57101096 | 109 |
| F81 | Original bewegt Ziele pro Frame → Tempo ∝ Bildrate; Pursuit-Schwellen sind Frame-Zähler | 144 Hz = 2,4-fach, 120 Hz = 2-fach schneller | docs/skilldrills-analyse.md (Code-Analyse) | 104, 105 |
| F82 | Original Rhythm Anomaly: Grundperiode 1.600 → 600 ms (0,6–1,7 Hz), Anomalie 0,72 × Periode (bis 2,5 Hz) **und doppelte Amplitude**; Helligkeitshub klein | ΔL ≈ 0,007 (normal, sRGB 10→26) bzw. ≈ 0,020 (Anomalie, 10→42) < WCAG-Schwelle 0,10 | Code: docs/skilldrills-analyse.md; ΔL eigene Rechnung (sRGB-Formel WCAG 2.2) | 109 |
| F83 | Unterschiedsschwelle für zeitliche Frequenz (Weber-Anteil), bei angeglichener Modulationstiefe | Δf/f ≈ 0,08 nahe 1,5/4/30 Hz; ≈ 0,50 nahe 20 Hz | Mandler (1984), 10.1016/0042-6989(84)90020-8 | 109 |
| F84 | Phasenvergleich weit auseinanderliegender Flimmerquellen („Gestalt flicker fusion“) – Zeitauflösung der Aufmerksamkeit | 11,4 Hz (4°) → 8,9 Hz (14°) | Aghdaee & Cavanagh (2007), 10.1016/j.visres.2007.04.016 | 109 |
| F85 | Flimmern als Suchmerkmal: relative Frequenzunterschiede ziehen Aufmerksamkeit an | Unterschiede > 5 Hz (1,3 vs. 12,1 Hz) „springen ins Auge“ | Cass et al. (2011), 10.3389/fpsyg.2011.00320 | 109 |
| F86 | Zeitliche Summation bei Tageslicht; Bewegungsverschmierung geringer als erwartet | ≈ 120 ms | Burr (1980), 10.1038/284164a0 | 109 |

### B10 Optik, Brille, Bildschirmarbeit, Alter

| Nr | Aussage | Zahl | Quelle | Üb. |
|---|---|---|---|---|
| F87 | Akkommodationsamplitude sinkt ab später Kindheit; Tempo/Genauigkeit bleiben bis ≈ 40 J. erhalten, dann reicht die Amplitude nicht mehr für Naharbeit (Presbyopie) | ≈ 40 J. | Charman (2008), 10.1111/j.1444-0938.2008.00256.x | alle |
| F88 | Gleitsicht-Neulinge setzen während der Eingewöhnung mehr Kopfbewegungen ein (Flash-Aufgabe, Lesen) | n = 10, Crossover | Hutchings et al. (2007), 10.1111/j.1475-1313.2006.00460.x | 103–106, 108 |
| F89 | Bildschirmarbeit senkt die Lidschlagrate | ≈ 5-fach | Patel et al. (1991), 10.1097/00006324-199111000-00010 | alle, bes. 105, 106 |
| F90 | Computer Vision Syndrome: sehr häufig; Ursachen v. a. Okulomotorik und trockenes Auge; Wirksamkeit vorgeschlagener Behandlungen unbewiesen | 64–90 % der Nutzer mit Symptomen | Rosenfield (2011), 10.1111/j.1475-1313.2011.00834.x | 105 |
| F91 | Ältere: schlechtere dynamische Sehschärfe verschwindet bei Leuchtdichte-Ausgleich weitgehend (weniger Licht auf der Netzhaut) | 67,6 vs. 19,6 J. | Long & Crambert (1990), 10.1037/0882-7974.5.1.138 | 104, 105 |
| F92 | Vektion und visuell ausgelöste Übelkeit hängen zusammen, die genaue Beziehung ist ungeklärt | – | Keshavarz et al. (2015), 10.3389/fpsyg.2015.00472 | 106, 107 |
| F93 | Sehwinkel: bei 40 cm ≈ 36 CSS-px pro Grad (iPad, 0,192 mm/px), 1°/s ≈ 7 mm/s; Desktop 60 cm, 96 ppi ≈ 40 px/° | – | docs/wissenschaft/02, Abschn. 4 (Formeln); Desktop-Wert eigene Rechnung | alle |
| F94 | Betrachtungsabstand Smartphone: Presbyope halten Geräte weiter weg | 39,7 ± 6,3 cm vs. 33,4 ± 7,6 cm (n = 217) | Boccardo et al. (2023), 10.1371/journal.pone.0282947 | alle |

### B11 Trainierbarkeit und Transfer (übergreifend)

| Nr | Aussage | Zahl | Quelle | Üb. |
|---|---|---|---|---|
| F95 | Digitales Sport-Sehtraining: große Effekte fast nur, wenn Trainings- und Testaufgabe ähnlich sind | Aufmerksamkeit SMD 1,65 vs. 0,07; RT 2,66 vs. 0,50 (33 RCTs, n = 1.048) | Guo et al. (2025), 10.3389/fphys.2025.1664572 | alle |
| F96 | „Gehirntraining“: viel Evidenz für geübte Aufgaben, wenig für entfernte Aufgaben/Alltag; viele Designmängel | – | Simons et al. (2016), 10.1177/1529100616661983 | alle |
| F97 | Action-Videospiel-Interventionen: kleiner Effekt; Publikationsbias | g = 0,34 | Bediou et al. (2018), 10.1037/bul0000130 | 101, 106 |
| F98 | Umfassende Metaanalyse: Videospieltraining verbessert kognitive Fähigkeiten kaum | kleine bis Null-Effekte | Sala, Tatlidil & Gobet (2018), 10.1037/bul0000139 | 101, 106 |
| F99 | Computertraining gesunder Älterer: kleiner Gesamteffekt; > 3 Einheiten/Woche und unbetreutes Heimtraining ohne Zusatznutzen | g = 0,22 (52 RCTs, n = 4.885) | Lampit et al. (2014), 10.1371/journal.pmed.1001756 | alle |
| F100 | Sport-Sehtraining: stärkste Hinweise für naturnahes, sportartspezifisches Training; wenige rigorose Studien | 126 Artikel | Lochhead et al. (2026, online 2024), 10.1080/1750984X.2024.2437385 | 101, 104–107 |

(100 Einträge; F10, F12, F13, F54, F65, F71, F81, F82, F93 sind eigene Rechnungen/Ableitungen bzw. Code-Befunde – als Studienfakten zählen 91.)

---

## C) Evidenz-Zusammenfassung je Übung (Vorschläge für die Autor:innen)

> Einstufung nach README-Skala (stark/mittel/schwach/fehlend/unklar). Bezieht sich auf **ähnliche Aufgaben**
> in Studien – keine der Original- oder Blickfit-Übungen ist selbst untersucht. Profilhinweise sind
> Vorschläge; das Profil beschreibt das **Original**.

### 101 Light Reaction → Blickfit „Blitzreaktion“
- **Evidenz:** Übungseffekt *mittel* (in den ersten Sitzungen deutliche Gewöhnung, die einfache RT selbst
  kaum übbar: F07; Punkte steigen v. a. durch Combo/Fenster) · naher Transfer *schwach–mittel* (SMD ≈ 0,5 bei
  unähnlichen Tests, F95) · Alltag *fehlend* (docs/wissenschaft/01, 1.2.1/1.2.3).
- **Kern:** einfache Reaktion, zeitliche Erwartung (Vorperiode gleichverteilt 300–2.500 ms → Hazardrate),
  Daueraufmerksamkeit. Hohe Stufen erzwingen Vorwegnahme (F12). Peripherie fehlt im Original (Blickfit: Mitte
  + Rand).
- **Sicherheit/Optik:** voller Weiß-Blitz auf Schwarz, aber kleinflächig und < 3/s (F13); „Zimmer abdunkeln“
  nicht übernehmen; Reiz groß und zentral → kaum Anforderung an Visus/Nahkorrektur. Messwerte gerätabhängig
  (F09–F11) → keine Normen. vorsicht_bei: photosensitive_epilepsie, migraene_lichtempfindlich.
- **Website-Aussagen:** „Tier-Tabellen“, „Apex-Reflex/kortikospinale Erregbarkeit“, Vier-Phasen-Kaskade mit
  Zahlen: ohne Beleg; 200–250 ms grob richtig (F01–F03).

### 102 Go/No-Go → Blickfit „Stopp & Los“
- **Evidenz:** Übungseffekt *stark* (Enge et al., 2014; Benikos et al., 2013 in docs/01) · naher Transfer
  *schwach* (F19, F21) · Alltag *fehlend* (für Fahren direkt getestet, F20).
- **Kern:** Inhibition mit 70 % Go (Hemmdruck vorhanden, F14), Wahlreaktion unter Zeitdruck. Original
  unterscheidet **nur über Farbe** (Rot #ef4444 vs. Grün #10b981; relative Leuchtdichte ≈ 0,23 vs. 0,36,
  eigene Rechnung) → farbunterscheidung hoch, vorsicht_bei farbsehschwaeche (F23; WCAG 1.4.1). Blickfit: Form +
  Farbe + Helligkeit, 75 % Go, adaptive Frist.
- **Neuro:** rIFC/prä-SMA/STN-Netz nur als Modell; No-Go-Aktivierung zu großen Teilen Aufmerksamkeit (F16, F17).
  Messzuverlässigkeit Fehlalarme gut (F18). Ältere mehr Fehlalarme (F22).
- **Website-Aussagen:** „Training stärkt präfrontale Konnektivität und verkürzt SSRT signifikant“, „Fehlalarme
  reduziert durch 240 Hz“, „Apex rIFC-STN“ – nicht belegt.

### 103 Visual Search → Blickfit „Suchbild“
- **Evidenz:** Übungseffekt *stark* (F31) · naher Transfer *mittel* (Sireteanu & Rettenbach vs. Ellison &
  Walsh; docs/03) · Alltag *schwach*.
- **Kern:** Ähnlichkeitssuche (Ziel C unter O/Q/G, E unter F/L/P …, alle gedreht), 96 Felder, keine Anpassung
  im Original. Keine Konjunktionssuche (F24). Sakkaden + Fixationen (F29, F39, F40), Crowding bei engem Raster
  (docs/03: Bouma/Pelli & Tillman).
- **Optik:** Zeichengröße im Original ≈ 0,8–1° Zellenbreite (iPad quer 44vh ≈ 360 px/12 Spalten ≈ 30 px ≈ 0,8°
  bei 40 cm, eigene Rechnung) → Nahkorrektur nötig; Gleitsicht: Raster in Blickhöhe, Kopf statt Augen (F88).
  vorsicht_bei: sehbehinderung_niedriger_visus, presbyopie_gleitsicht, gesichtsfeldausfall (Suche verlängert;
  Training dort nur klinisch, docs/03).
- **Website-Aussagen:** „Konjunktionssuche“, „rotierte O“, „200–250 ms Minimum“, Tier-Tabelle – falsch bzw.
  ohne Beleg.

### 104 Moving Target → Blickfit „Zielfang“
- **Evidenz:** Übungseffekt *mittel* (Motorisches Lernen plausibel, für genau diese Aufgabe nicht geprüft;
  docs/02 §3) · naher Transfer *schwach* · Alltag *schwach* (Sport) bzw. *fehlend*.
- **Kern:** Interzeption (Blick folgen, vorhalten, korrigieren; F47–F50). Original: Ziel springt nach 1,0 →
  0,2 s (Untergrenze 0,12 s) an einen neuen Ort → eher schnelle Zielbewegung + Sakkaden als ruhige Blickfolge; Tempo frame-gebunden (F81).
  Tendenz „hinter das Ziel“ normal (F48).
- **Motorik/Touch:** kleinste Ziele ≈ 3 mm am Tablet (F54) → mit_anpassung; Tremor/Handbeschwerden (F52).
  vorsicht_bei: tremor_parkinson, hand_arm_beschwerden.
- **Website-Aussagen:** „Spitzen-Gamer und Kampfjetpiloten“, „dynamische Sehschärfe wird trainiert“ – ohne
  Beleg; Blickstrategie nach Land & McLeod real, Transfer nicht belegt.

### 105 Pursuit Tracker → Blickfit „Scharf in Bewegung“
- **Evidenz:** Übungseffekt *mittel* (manuelles Tracking lernbar; Pursuit kurzfristig trainierbar, F45) ·
  naher Transfer *schwach* · Alltag *fehlend*. Blickfit (Landolt-C im bewegten Ball, DVA): Übungseffekt mittel,
  Transfer fehlend (docs/02 §2).
- **Kern:** Original ist **kontinuierliche Cursorsteuerung** (Kontakt = Abstand < r + 35 px; Time on Target),
  die Augenfolge wird vorausgesetzt, aber nicht gemessen. Random-Walk-Kicks → unvorhersagbar → Gain sinkt (F37);
  Aufholsakkaden (F38). Blickfolge realistisch bis weit über 30°/s (F36); Original ≈ 9–10°/s bei 60 Hz
  (360 px/s ÷ ≈ 36–40 px/°, eigene Rechnung), auf 144 Hz 2,4-fach.
- **Optik:** Brille: Gleitsicht → seitliche Unschärfe, Kopf dreht mit (F88); trockenes Auge durch starres
  Folgen (F89). Ältere: geringerer Gain (F44), Helligkeit hilft (F91). vorsicht_bei: tremor_parkinson,
  hand_arm_beschwerden, nystagmus, trockenes_auge_bildschirm.
- **Website-Aussagen:** Top-1-%-Tabelle, „verringert Asthenopie“, „erleichtert Lesen“, Lisberger-Zitat – ohne
  Beleg bzw. Quelle existiert nicht.

### 106 Multiple Targets → Blickfit „Kugel-Detektiv“
- **Evidenz:** Übungseffekt *stark* (auch Ältere, F63) · naher Transfer *schwach* · Alltag *fehlend* (Fahren)
  bzw. *schwach* (Sport) (F64; docs/02 §1).
- **Kern:** geteilte Aufmerksamkeit, Halbfelder (F57), Tempo-Kapazitäts-Tausch (F56), Parietal-/FEF-Netz
  (F58). Original: nur ein 60-s-Durchgang (F65) → auch **Daueraufmerksamkeit**; harte elastische Stöße erzeugen
  Verwechslungen (docs/02: Bae & Flombaum). Zentrumsblick hilft (F59), nicht erzwingen.
- **Belastung:** 8–20 Bälle mit ≈ 8–12°/s (300–420 px/s ÷ 36–40 px/°, eigene Rechnung); großflächige Objektbewegung ohne Eigenbewegungsfluss → Vektion
  gering (F92). Ältere: lange Tracking-Zeit besonders schwer (F60). vorsicht_bei: kognitive_einschraenkung,
  aufmerksamkeitsprobleme, gesichtsfeldausfall.
- **Website-Aussagen:** Hemifield-Beleg falsches Paper; Zentroid-Strategie falsche Quelle; „beseitigt
  Tunnelblick“ ohne Beleg.

### 107 Distance Judgment → Blickfit „Punktlandung“
- **Evidenz:** Übungseffekt *mittel* (CAT-/PM-Studien, docs/03 §1) · naher Transfer *schwach* · Alltag
  *fehlend* (Verkehr) / *schwach* (Sport).
- **Kern:** Antizipations-Timing aus Looming (F66–F70), **monokular**; stereosehen = 0 (physikalisch keine
  Disparität). Original-Looming physikalisch falsch (linear, F71). Toleranzen im Code in Prozentpunkten.
- **Optik:** auch für Stereoblinde (~7 %, F72) und Schielende nutzbar – aber **kein** Training oder Test des
  räumlichen Sehens; FeV-Stereo-Anforderung kann nicht vorbereitet werden (F74). vorsicht_bei: eher keine
  spezifischen; Reisekrankheit gering (F92).
- **Website-Aussagen:** „Tiefenwahrnehmung/Stereosehen“, „Apex Stereoskopie-Meister“, „Howard-Dolman
  operationalisiert“, „Vorbereitung Führerschein-Sehtest“ – irreführend.

### 108 Entropic Grid → bei Blickfit ersetzt durch „Blitzblick“ (UFOV)
- **Original-Evidenz:** Übungseffekt *mittel* (Suche lernbar, F31) · naher Transfer *schwach* · Alltag
  *fehlend*. Kern: Suche nach zweistelligem Code in 10 × 10 Raster (Zeichenerkennung ≈ Lesenähe), Neu-Würfeln
  von 3 Zellen alle 700 ms = Onset-Ablenker (F28), Brettwechsel alle 12 s; Notenskala sehr leicht.
- **Blickfit-Blitzblick-Evidenz:** Übungseffekt *stark*, naher Transfer (UFOV) *stark*, Alltag *mittel* nur für
  das betreute Originalprotokoll bei Älteren (F75–F78), für die Web-Version *fehlend*; nutzbares_sehfeld und
  visuelle_verarbeitungsgeschwindigkeit = Kern; Maske ohne Streifen, ≤ 2 Helligkeitswechsel pro Durchgang
  (docs/03 §3, §4.7).
- **Website-Aussagen:** „UFOV verengt sich im Alter (Woods 2015)“ falsch zugeordnet; „DLPFC tilgt Rauschen“,
  „neurochemisch blockiert“, „direkter Transfer auf Straßenverkehr/Lesen/Tabellen“ – ohne Beleg.

### 109 Rhythm Anomaly → Blickfit „Aus dem Takt“
- **Evidenz:** Übungseffekt *schwach* (kaum Studien; docs/03 §4) · naher Transfer *fehlend* · Alltag
  *fehlend*.
- **Kern:** zeitliche Frequenz-/Phasenunterscheidung langsamer Pulse (≤ 2,5 Hz) bei verteilter Aufmerksamkeit
  („Suche in der Zeit“, F83–F85); keine CFF (F80). Original zusätzlich Helligkeitshinweis (doppelte Amplitude,
  F82) und Störblitze (3 Zellen alle 200–800 ms für 150 ms).
- **Sicherheit/Optik:** Pulsieren großflächig (Raster 0,9 × min(B, H)), aber ΔL klein (F82) und ≤ 2,5 Hz →
  unter WCAG 2.3.1; trotzdem vorsicht_bei photosensitive_epilepsie, migraene_lichtempfindlich (F79); dunkles,
  kontrastarmes Bild (sRGB 10–42) → bei Katarakt/Älteren schwer sichtbar (kontrast ≥ 1).
- **Website-Aussagen:** „Flimmerfusion“, „M-Pfad bis 40–50 Hz“, „CFF-Grenzsensitivität“, Transfer auf
  Projektilerkennung – falsch bzw. ohne Beleg.

---

## D) Literaturliste (nur geprüfte Einträge)

### D1 Von der Website angegebene Quellen (korrigierte Angaben)

- Alvarez, G. A., & Cavanagh, P. (2004). The capacity of visual short-term memory is set both by visual information load and by number of objects. *Psychological Science, 15*(2), 106–111. https://doi.org/10.1111/j.0963-7214.2004.01502006.x – **Prüfung:** ✓ Crossref + Abstract; stützt die Website-Aussage (Halbfelder) **nicht** (106).
- Aron, A. R., Robbins, T. W., & Poldrack, R. A. (2014). Inhibition and the right inferior frontal cortex: One decade on. *Trends in Cognitive Sciences, 18*(4), 177–185. https://doi.org/10.1016/j.tics.2013.12.003 – ✓ Crossref + PubMed-Abstract.
- Bacon, W. F., & Egeth, H. E. (1994). Overriding stimulus-driven attentional capture. *Perception & Psychophysics, 55*(5), 485–496. https://doi.org/10.3758/BF03205306 – ✓ Crossref + PubMed-Abstract.
- Bahill, A. T., Iandolo, M. J., & Troost, B. T. (1980). Smooth pursuit eye movements in response to unpredictable target waveforms. *Vision Research, 20*(11), 923–931. https://doi.org/10.1016/0042-6989(80)90073-5 – ✓ Crossref; kein Abstract (nur Semantic-Scholar-TLDR).
- Barnes, G. R. (2008). Cognitive processes involved in smooth pursuit eye movements. *Brain and Cognition, 68*(3), 309–326. https://doi.org/10.1016/j.bandc.2008.08.020 – ✓ Crossref + PubMed-Abstract.
- Burr, D. (1980). Motion smear. *Nature, 284*(5752), 164–165. https://doi.org/10.1038/284164a0 – ⚠ Website-Titel falsch („…: Two types of visual suppression“); DOI ✓; PubMed-Abstract.
- Cavanagh, P., & Alvarez, G. A. (2005). Tracking multiple targets with multifocal attention. *Trends in Cognitive Sciences, 9*(7), 349–354. https://doi.org/10.1016/j.tics.2005.05.009 – ✓ Crossref + Abstract (Semantic Scholar).
- de Lange Dzn, H. (1958). Research into the dynamic nature of the human fovea→cortex systems with intermittent and modulated light. II. Phase shift in brightness and delay in color perception. *Journal of the Optical Society of America, 48*(11), 784–789. https://doi.org/10.1364/JOSA.48.000784 – ⚠ Website-Titel falsch („Phase shift in clinical applications“); DOI ✓; nur Metadaten.
- Donders, F. C. (1969). On the speed of mental processes (W. G. Koster, Übers.; Original 1868). *Acta Psychologica, 30*, 412–431. https://doi.org/10.1016/0001-6918(69)90065-1 – ✓ Crossref; nur Metadaten (Klassiker).
- Duncan, J., & Humphreys, G. W. (1989). Visual search and stimulus similarity. *Psychological Review, 96*(3), 433–458. https://doi.org/10.1037/0033-295X.96.3.433 – ✓ Crossref; nur Metadaten/TLDR; Inhalt auch in docs/03 geprüft.
- Dye, M. W. G., Green, C. S., & Bavelier, D. (2009). Increasing speed of processing with action video games. *Current Directions in Psychological Science, 18*(6), 321–326. https://doi.org/10.1111/j.1467-8721.2009.01660.x – ✓ Crossref + Abstract.
- Eriksen, C. W., & St. James, J. D. (1986). Visual attention within and around the field of focal attention: A zoom lens model. *Perception & Psychophysics, 40*(4), 225–240. https://doi.org/10.3758/BF03211502 – ✓ Crossref; nur Metadaten.
- Faubert, J. (2013). Professional athletes have extraordinary skills for rapidly learning complex and neutral dynamic visual scenes. *Scientific Reports, 3*, 1154. https://doi.org/10.1038/srep01154 – ⚠ Website-Titel falsch; DOI ✓; Abstract.
- Green, C. S., & Bavelier, D. (2006). Enumeration versus multiple object tracking: The case of action video game players. *Cognition, 101*(1), 217–245. https://doi.org/10.1016/j.cognition.2005.10.004 – ⚠ Website-DOI falsch (…10.005 = Saxe, Tzelnic & Carey, 2006); korrigierte DOI ✓ + PubMed-Abstract.
- Holcombe, A. O. (2009). Seeing slow and seeing fast: Two limits on perception. *Trends in Cognitive Sciences, 13*(5), 216–221. https://doi.org/10.1016/j.tics.2009.02.005 – ⚠ Website-Titel falsch; DOI ✓; PubMed-Abstract.
- Howard, H. J. (1919). A test for the judgment of distance. *American Journal of Ophthalmology, 2*(9), 656–675. https://doi.org/10.1016/S0002-9394(19)90180-2 – ⚠ Website-DOI falsch (…90299-8 nicht registriert); korrigierte DOI ✓; nur Metadaten.
- Jain, A., Bansal, R., Kumar, A., & Singh, K. D. (2015). A comparative study of visual and auditory reaction times on the basis of gender and physical activity levels of medical first year students. *International Journal of Applied and Basic Medical Research, 5*(2), 124–127. https://doi.org/10.4103/2229-516X.157168 – ✓ Crossref + PubMed-Abstract + PMC-Volltext (Methode).
- Julesz, B. (1971). *Foundations of cyclopean perception*. University of Chicago Press. – ⚠ Website-DOI falsch (10.7551/mitpress/3074.001.0001 = Yoshikawa, *Foundations of Robotics*, 1990); Buch, keine DOI ermittelt; Verlag/Jahr über Rezension bestätigt (Kaufman, 1972, *Science, 176*, 633–635, https://doi.org/10.1126/science.176.4035.633).
- Kelly, D. H. (1961). Visual responses to time-dependent stimuli. I. Amplitude sensitivity measurements. *Journal of the Optical Society of America, 51*(4), 422–429. https://doi.org/10.1364/JOSA.51.000422 – ✓ Crossref/PubMed; nur Metadaten.
- Kosinski, R. J. (2013). *A literature review on reaction time* (zuletzt aktualisiert September 2013; Website nennt 2008). Clemson University. http://www.cognaction.org/cogs105/readings/clemson.rt.pdf – graue Literatur, keine DOI; Text geprüft (visuell 180–200 ms, auditiv 140–160 ms).
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – ✓ Crossref + Abstract.
- Land, M. F., & McLeod, P. (2000). From eye movements to actions: How batsmen hit the ball. *Nature Neuroscience, 3*(12), 1340–1345. https://doi.org/10.1038/81887 – ⚠ Website-DOI falsch (…/81861 nicht registriert); korrigierte DOI ✓ + PubMed-Abstract.
- Lavie, N. (1995). Perceptual load as a necessary condition for selective attention. *Journal of Experimental Psychology: Human Perception and Performance, 21*(3), 451–468. https://doi.org/10.1037/0096-1523.21.3.451 – ✓ Crossref + PubMed-Abstract.
- Lee, D. N. (1976). A theory of visual control of braking based on information about time-to-collision. *Perception, 5*(4), 437–459. https://doi.org/10.1068/p050437 – ✓ Crossref + Abstract.
- Leigh, R. J., & Zee, D. S. (2015). *The neurology of eye movements* (5. Aufl.). Oxford University Press. https://doi.org/10.1093/med/9780199969289.001.0001 – ⚠ Website-DOI falsch (…9780199969203… nicht auflösbar); korrigierte DOI ✓ (Crossref); Buchinhalt nicht eingesehen.
- Lisberger, S. G. (2010), „Visual tracking in primates …“, *Current Opinion in Neurobiology, 20*(4), 405–410 – ✗ **nicht auffindbar**; die angegebene DOI 10.1016/j.conb.2010.04.004 gehört zu Semaan & Kauffman (2010). Real existierende, vermutlich gemeinte Arbeit: Lisberger, S. G. (2010). Visual guidance of smooth-pursuit eye movements: Sensation, action, and what happens in between. *Neuron, 66*(4), 477–491. https://doi.org/10.1016/j.neuron.2010.03.027 – ✓ Crossref (nur Metadaten).
- Logan, G. D., & Cowan, W. B. (1984). On the ability to inhibit thought and action: A theory of an act of control. *Psychological Review, 91*(3), 295–327. https://doi.org/10.1037/0033-295X.91.3.295 – ✓ Crossref; nur Metadaten.
- Pins, D., & Bonnet, C. (1996). On the relation between stimulus intensity and processing time: Piéron's law and choice reaction time. *Perception & Psychophysics, 58*(3), 390–400. https://doi.org/10.3758/BF03206815 – ✓ Crossref + PubMed-Abstract.
- Posner, M. I. (1980). Orienting of attention. *Quarterly Journal of Experimental Psychology, 32*(1), 3–25. https://doi.org/10.1080/00335558008248231 – ✓ Crossref + Abstract.
- Pylyshyn, Z. W., & Storm, R. W. (1988). Tracking multiple independent targets: Evidence for a parallel tracking mechanism. *Spatial Vision, 3*(3), 179–197. https://doi.org/10.1163/156856888X00122 – ✓ Crossref + PubMed-Abstract.
- Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 – ⚠ Website-Titel leicht falsch („smooth pursuit“); DOI ✓; nur Metadaten.
- Regan, D., & Beverley, K. I. (1978). Looming detectors in the human visual pathway. *Vision Research, 18*(4), 415–421. https://doi.org/10.1016/0042-6989(78)90051-2 – ⚠ Website-DOI falsch (…90050-7 nicht registriert); korrigierte DOI ✓; TLDR.
- Robertson, I. H., Manly, T., Andrade, J., Baddeley, B. T., & Yiend, J. (1997). 'Oops!': Performance correlates of everyday attentional failures in traumatic brain injured and normal subjects. *Neuropsychologia, 35*(6), 747–758. https://doi.org/10.1016/S0028-3932(97)00015-8 – ⚠ Website-Titel falsch; DOI ✓; PubMed-Abstract.
- Shelton, J., & Kumar, G. P. (2010). Comparison between auditory and visual simple reaction times. *Neuroscience and Medicine, 1*(1), 30–32. https://doi.org/10.4236/nm.2010.11004 – ✓ Crossref + Abstract (nur Fließtext-Zitat auf 101).
- Treisman, A. M., & Gelade, G. (1980). A feature-integration theory of attention. *Cognitive Psychology, 12*(1), 97–136. https://doi.org/10.1016/0010-0285(80)90005-5 – ✓ Crossref; nur Metadaten/TLDR.
- Wolfe, J. M. (1994). Guided Search 2.0: A revised model of visual search. *Psychonomic Bulletin & Review, 1*(2), 202–238. https://doi.org/10.3758/BF03200774 – ✓ Crossref + PubMed-Abstract.
- Wolfe, J. M. (2007). Guided Search 4.0: Current progress with a model of visual search. In W. D. Gray (Hrsg.), *Integrated models of cognitive systems* (S. 99–119). Oxford University Press. https://doi.org/10.1093/acprof:oso/9780195189193.003.0008 – ✓ Crossref (Buchkapitel); nur Metadaten.
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – ✓ Crossref + PubMed-Abstract (auch docs/01).

### D2 Weitere Fachliteratur

- Aghdaee, S. M., & Cavanagh, P. (2007). Temporal limits of long-range phase discrimination across the visual field. *Vision Research, 47*(16), 2156–2163. https://doi.org/10.1016/j.visres.2007.04.016 – ✓ neu, Abstract. Phasengrenze 8,9–11,4 Hz (109).
- Alvarez, G. A., & Cavanagh, P. (2005). Independent resources for attentional tracking in the left and right visual hemifields. *Psychological Science, 16*(8), 637–643. https://doi.org/10.1111/j.1467-9280.2005.01587.x – ✓ Abstract (docs/02). Halbfeld-Unabhängigkeit (106).
- Alvarez, G. A., & Franconeri, S. L. (2007). How many objects can you track? Evidence for a resource-limited attentive tracking mechanism. *Journal of Vision, 7*(13), 14. https://doi.org/10.1167/7.13.14 – ✓ Abstract (docs/02). Tempo-Kapazität (106).
- Baloh, R. W., Sills, A. W., Kumley, W. E., & Honrubia, V. (1975). Quantitative measurement of saccade amplitude, duration, and velocity. *Neurology, 25*(11), 1065–1070. https://doi.org/10.1212/WNL.25.11.1065 – ✓ neu, Abstract. 2,7 ms/° (103, 105).
- Ball, K. K., Beard, B. L., Roenker, D. L., Miller, R. L., & Griggs, D. S. (1988). Age and visual search: Expanding the useful field of view. *Journal of the Optical Society of America A, 5*(12), 2210–2219. https://doi.org/10.1364/JOSAA.5.002210 – ✓ (docs/01, 03). UFOV im Alter (108/Blitzblick).
- Ball, K., Berch, D. B., Helmers, K. F., Jobe, J. B., Leveck, M. D., Marsiske, M., Morris, J. N., Rebok, G. W., Smith, D. M., Tennstedt, S. L., Unverzagt, F. W., & Willis, S. L. (2002). Effects of cognitive training interventions with older adults: A randomized controlled trial. *JAMA, 288*(18), 2271–2281. https://doi.org/10.1001/jama.288.18.2271 – ✓ (docs/03). ACTIVE (108/Blitzblick).
- Barnes, G. R., Donnelly, S. F., & Eason, R. D. (1987). Predictive velocity estimation in the pursuit reflex response to pseudo-random and step displacement stimuli in man. *The Journal of Physiology, 389*, 111–136. https://doi.org/10.1113/jphysiol.1987.sp016649 – ✓ (docs/02). Gain bei Unvorhersagbarkeit (105).
- Basner, M., Hermosillo, E., Nasrini, J., McGuire, S., Saxena, S., Moore, T. M., Gur, R. C., & Dinges, D. F. (2018). Repeated administration effects on Psychomotor Vigilance Test performance. *Sleep, 41*(1), zsx187. https://doi.org/10.1093/sleep/zsx187 – ✓ (docs/01). Keine Übungseffekte der einfachen RT (101).
- Bediou, B., Adams, D. M., Mayer, R. E., Tipton, E., Green, C. S., & Bavelier, D. (2018). Meta-analysis of action video game impact on perceptual, attentional, and cognitive skills. *Psychological Bulletin, 144*(1), 77–110. https://doi.org/10.1037/bul0000130 – ✓ (docs/01). g = 0,34 (101, 106).
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – ✓ (docs/01). 8 % Männer (102).
- Boccardo, L., Gurioli, M., & Grasso, P. A. (2023). Viewing distance and character size in the use of smartphones across the lifespan. *PLoS ONE, 18*(4), e0282947. https://doi.org/10.1371/journal.pone.0282947 – ✓ (docs/02). Abstand Presbyope (alle).
- Brenner, E., Bom, S., & Smeets, J. B. J. (2026). Intercepting moving targets: Does the visuomotor latency depend on whether one taps on the target or slides through it? *Experimental Brain Research, 244*(4), 70. https://doi.org/10.1007/s00221-026-07264-3 – ✓ Crossref (docs/02). 114 ms (104).
- Brenner, E., & Smeets, J. B. J. (2009). Sources of variability in interceptive movements. *Experimental Brain Research, 195*(1), 117–133. https://doi.org/10.1007/s00221-009-1757-x – ✓ (docs/02). 20 ms / 5 mm (104).
- Brouwer, A.-M., Brenner, E., & Smeets, J. B. J. (2002). Hitting moving objects: Is target speed used in guiding the hand? *Experimental Brain Research, 143*(2), 198–211. https://doi.org/10.1007/s00221-001-0980-x – ✓ (docs/02). „Hinter das Ziel“ (104).
- Burr, D. C., Morrone, M. C., & Ross, J. (1994). Selective suppression of the magnocellular visual pathway during saccadic eye movements. *Nature, 371*(6497), 511–513. https://doi.org/10.1038/371511a0 – ✓ neu, Abstract. Sakkadische Unterdrückung (106, 109).
- Carl, J. R., & Gellman, R. S. (1987). Human smooth pursuit: Stimulus-dependent responses. *Journal of Neurophysiology, 57*(5), 1446–1463. https://doi.org/10.1152/jn.1987.57.5.1446 – ✓ neu, Abstract. Latenz 100 ms (104, 105).
- Cass, J., Van der Burg, E., & Alais, D. (2011). Finding flicker: Critical differences in temporal frequency capture attention. *Frontiers in Psychology, 2*, 320. https://doi.org/10.3389/fpsyg.2011.00320 – ✓ (docs/03). Flimmer-Suche (109).
- Charman, W. N. (2008). The eye in focus: Accommodation and presbyopia. *Clinical and Experimental Optometry, 91*(3), 207–225. https://doi.org/10.1111/j.1444-0938.2008.00256.x – ✓ neu, Abstract. Presbyopie ≈ 40 J. (alle).
- Chopin, A., Bavelier, D., & Levi, D. M. (2019). The prevalence and diagnosis of 'stereoblindness' in adults less than 60 years of age: A best evidence synthesis. *Ophthalmic and Physiological Optics, 39*(2), 66–85. https://doi.org/10.1111/opo.12607 – ✓ neu, Abstract. 7 % (107).
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – ✓ (docs/02). Gain < 0,95 (105).
- Coutant, B. E., & Westheimer, G. (1993). Population distribution of stereoscopic ability. *Ophthalmic and Physiological Optics, 13*(1), 3–7. https://doi.org/10.1111/j.1475-1313.1993.tb00419.x – ✓ neu, Abstract. 97,3 % ≤ 2,3′ (107).
- Criaud, M., & Boulinguez, P. (2013). Have we been asking the right questions when assessing response inhibition in go/no-go tasks with fMRI? A meta-analysis and critical review. *Neuroscience & Biobehavioral Reviews, 37*(1), 11–23. https://doi.org/10.1016/j.neubiorev.2012.11.003 – ✓ neu, Abstract (102).
- Culham, J. C., Brandt, S. A., Cavanagh, P., Kanwisher, N. G., Dale, A. M., & Tootell, R. B. H. (1998). Cortical fMRI activation produced by attentive tracking of moving targets. *Journal of Neurophysiology, 80*(5), 2657–2670. https://doi.org/10.1152/jn.1998.80.5.2657 – ✓ neu, Abstract (106).
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – ✓ neu, Abstract (104, 105).
- de la Malla, C., Smeets, J. B. J., & Brenner, E. (2017). Potential systematic interception errors are avoided when tracking the target with one's eyes. *Scientific Reports, 7*, 10793. https://doi.org/10.1038/s41598-017-11200-5 – ✓ (docs/02) (104).
- Der, G., & Deary, I. J. (2006). Age and sex differences in reaction time in adulthood: Results from the United Kingdom Health and Lifestyle Survey. *Psychology and Aging, 21*(1), 62–73. https://doi.org/10.1037/0882-7974.21.1.62 – ✓ (docs/01) (101, 102).
- Edwards, J. D., Fausto, B. A., Tetlow, A. M., Corona, R. T., & Valdés, E. G. (2018). Systematic review and meta-analyses of useful field of view cognitive training. *Neuroscience & Biobehavioral Reviews, 84*, 72–91. https://doi.org/10.1016/j.neubiorev.2017.11.004 – ✓ (docs/03) (108/Blitzblick).
- Eibenberger, K., Ring, M., & Haslwanter, T. (2012). Sustained effects for training of smooth pursuit plasticity. *Experimental Brain Research, 218*(1), 81–89. https://doi.org/10.1007/s00221-012-3009-8 – ✓ (docs/02) (105).
- Enge, S., Behnke, A., Fleischhauer, M., Küttler, L., Kliegel, M., & Strobel, A. (2014). No evidence for true training and transfer effects after inhibitory control training in young healthy adults. *Journal of Experimental Psychology: Learning, Memory, and Cognition, 40*(4), 987–1001. https://doi.org/10.1037/a0036165 – ✓ (docs/01) (102).
- Fehd, H. M., & Seiffert, A. E. (2008). Eye movements during multiple object tracking: Where do participants look? *Cognition, 108*(1), 201–209. https://doi.org/10.1016/j.cognition.2007.11.008 – ✓ Abstract (docs/02) (106).
- Fischer, B., & Ramsperger, E. (1984). Human express saccades: Extremely short reaction times of goal directed eye movements. *Experimental Brain Research, 57*(1), 191–195. https://doi.org/10.1007/BF00231145 – ✓ neu, Abstract (103, 106).
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – ✓ (docs/03) (101, 109).
- Foxe, J. J., & Simpson, G. V. (2002). Flow of activation from V1 to frontal cortex in humans: A framework for defining "early" visual processing. *Experimental Brain Research, 142*(1), 139–150. https://doi.org/10.1007/s00221-001-0906-7 – ✓ neu, Abstract (101, 102).
- Gray, R., & Regan, D. (1998). Accuracy of estimating time to collision using binocular and monocular information. *Vision Research, 38*(4), 499–512. https://doi.org/10.1016/S0042-6989(97)00230-7 – ✓ (docs/03) (107).
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – ✓ (docs/01–03) (alle).
- Hatfield, J., Williamson, A., Kehoe, E. J., Lemon, J., Arguel, A., Prabhakharan, P., & Job, R. F. S. (2018). The effects of training impulse control on simulated driving. *Accident Analysis & Prevention, 119*, 1–15. https://doi.org/10.1016/j.aap.2018.06.012 – ✓ (docs/01) (102).
- Hedge, C., Powell, G., & Sumner, P. (2018). The reliability paradox: Why robust cognitive tasks do not produce reliable individual differences. *Behavior Research Methods, 50*(3), 1166–1186. https://doi.org/10.3758/s13428-017-0935-1 – ✓ neu, Abstract + PMC-Volltext (Tab. 1) (102).
- Hommel, B., Li, K. Z. H., & Li, S.-C. (2004). Visual search across the life span. *Developmental Psychology, 40*(4), 545–558. https://doi.org/10.1037/0012-1649.40.4.545 – ✓ (docs/03) (103, 108).
- Horowitz, T. S., & Wolfe, J. M. (1998). Visual search has no memory. *Nature, 394*(6693), 575–577. https://doi.org/10.1038/29068 – ✓ neu, Abstract (103, 108).
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., & Wells, K. A. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – ✓ neu, Abstract (Gleitsicht).
- Kassai, R., Futo, J., Demetrovics, Z., & Takacs, Z. K. (2019). A meta-analysis of the experimental evidence on the near- and far-transfer effects among children's executive function skills. *Psychological Bulletin, 145*(2), 165–188. https://doi.org/10.1037/bul0000180 – ✓ neu, Abstract (102).
- Keshavarz, B., Riecke, B. E., Hettinger, L. J., & Campos, J. L. (2015). Vection and visually induced motion sickness: How are they related? *Frontiers in Psychology, 6*, 472. https://doi.org/10.3389/fpsyg.2015.00472 – ✓ neu, Abstract (106, 107).
- Lampit, A., Hallock, H., & Valenzuela, M. (2014). Computerized cognitive training in cognitively healthy older adults: A systematic review and meta-analysis of effect modifiers. *PLoS Medicine, 11*(11), e1001756. https://doi.org/10.1371/journal.pmed.1001756 – ✓ (docs/01, 03) (alle).
- Legault, I., Allard, R., & Faubert, J. (2013). Healthy older observers show equivalent perceptual-cognitive training benefits to young adults for multiple object tracking. *Frontiers in Psychology, 4*, 323. https://doi.org/10.3389/fpsyg.2013.00323 – ✓ (docs/02) (106).
- Lochhead, L., Feng, J., Laby, D. M., & Appelbaum, L. G. (2026). Training vision in athletes to improve sports performance: A systematic review of the literature. *International Review of Sport and Exercise Psychology, 19*(2), 333–355 (online 2024). https://doi.org/10.1080/1750984X.2024.2437385 – ✓ Crossref (docs/01, 03).
- Long, G. M., & Crambert, R. F. (1990). The nature and basis of age-related changes in dynamic visual acuity. *Psychology and Aging, 5*(1), 138–143. https://doi.org/10.1037/0882-7974.5.1.138 – ✓ (docs/02) (104, 105).
- Mandler, M. B. (1984). Temporal frequency discrimination above threshold. *Vision Research, 24*(12), 1873–1880. https://doi.org/10.1016/0042-6989(84)90020-8 – ✓ (docs/03) (109).
- Mankowska, N. D., Marcinkowska, A. B., Waskow, M., Sharma, R. I., Kot, J., & Winklewski, P. J. (2021). Critical flicker fusion frequency: A narrative review. *Medicina, 57*(10), 1096. https://doi.org/10.3390/medicina57101096 – ✓ (docs/03) (109).
- McAuley, J. H., & Marsden, C. D. (2000). Physiological and pathological tremors and rhythmic central motor control. *Brain, 123*(8), 1545–1567. https://doi.org/10.1093/brain/123.8.1545 – ✓ neu, Abstract (104, 105).
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – ✓ (docs/02) (104, 105).
- Miall, R. C., Weir, D. J., & Stein, J. F. (1993). Intermittency in human manual tracking tasks. *Journal of Motor Behavior, 25*(1), 53–63. https://doi.org/10.1080/00222895.1993.9941639 – ✓ neu, Abstract (105).
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – ✓ (docs/02) (104, 105).
- Owsley, C., Ball, K., McGwin, G., Jr., Sloane, M. E., Roenker, D. L., White, M. F., & Overley, E. T. (1998). Visual processing impairment and risk of motor vehicle crash among older adults. *JAMA, 279*(14), 1083–1088. https://doi.org/10.1001/jama.279.14.1083 – ✓ (docs/01, 03) (108/Blitzblick).
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of MobileHCI '06* (S. 203–210). ACM. https://doi.org/10.1145/1152215.1152260 – ✓ (docs/02) (104, 106).
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – ✓ neu, Abstract (alle).
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – ✓ (docs/01, 03) (alle).
- Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin, 124*(3), 372–422. https://doi.org/10.1037/0033-2909.124.3.372 – ✓ Crossref; Werte (Fixationsdauern) nur über das Zitat bei van der Lans, R., Wedel, M., & Pieters, R. (2011). *Behavior Research Methods, 43*(1), 239–257. https://doi.org/10.3758/s13428-010-0031-2 (PMC-Volltext) (103, 108).
- Rey-Mermet, A., & Gade, M. (2018). Inhibition in aging: What is preserved? What declines? A meta-analysis. *Psychonomic Bulletin & Review, 25*(5), 1695–1716. https://doi.org/10.3758/s13423-017-1384-7 – ✓ (docs/01) (102).
- Robinson, D. A., Gordon, J. L., & Gordon, S. E. (1986). A model of the smooth pursuit eye movement system. *Biological Cybernetics, 55*(1), 43–57. https://doi.org/10.1007/BF00363977 – ✓ neu, Abstract (104, 105).
- Rosenfield, M. (2011). Computer vision syndrome: A review of ocular causes and potential treatments. *Ophthalmic and Physiological Optics, 31*(5), 502–515. https://doi.org/10.1111/j.1475-1313.2011.00834.x – ✓ neu, Abstract (105, alle).
- Sala, G., Tatlidil, K. S., & Gobet, F. (2018). Video game training does not enhance cognitive ability: A comprehensive meta-analytic investigation. *Psychological Bulletin, 144*(2), 111–139. https://doi.org/10.1037/bul0000139 – ✓ (docs/01) (101, 106).
- Schiff, W., & Detwiler, M. L. (1979). Information used in judging impending collision. *Perception, 8*(6), 647–658. https://doi.org/10.1068/p080647 – ✓ (docs/03) (107).
- Schmolesky, M. T., Wang, Y., Hanes, D. P., Thompson, K. G., Leutgeb, S., Schall, J. D., & Leventhal, A. G. (1998). Signal timing across the macaque visual system. *Journal of Neurophysiology, 79*(6), 3272–3278. https://doi.org/10.1152/jn.1998.79.6.3272 – ✓ neu, Abstract (102, 109).
- Sekuler, R., McLaughlin, C., & Yotsumoto, Y. (2008). Age-related changes in attentional tracking of multiple moving objects. *Perception, 37*(6), 867–876. https://doi.org/10.1068/p5923 – ✓ Abstract (docs/02) (106).
- Simmonds, D. J., Pekar, J. J., & Mostofsky, S. H. (2008). Meta-analysis of Go/No-go tasks demonstrating that fMRI activation associated with response inhibition is task-dependent. *Neuropsychologia, 46*(1), 224–232. https://doi.org/10.1016/j.neuropsychologia.2007.07.015 – ✓ neu, Abstract (102).
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – ✓ (docs/01–03) (alle).
- Sireteanu, R., & Rettenbach, R. (2000). Perceptual learning in visual search generalizes over tasks, locations, and eyes. *Vision Research, 40*(21), 2925–2949. https://doi.org/10.1016/S0042-6989(00)00145-0 – ✓ (docs/03) (103).
- Spjut, J., Boudaoud, B., Binaee, K., Kim, J., Majercik, A., McGuire, M., Luebke, D., & Kim, J. (2019). Latency of 30 ms benefits first person targeting tasks more than refresh rate above 60 Hz. In *SIGGRAPH Asia 2019 Technical Briefs* (S. 110–113). ACM. https://doi.org/10.1145/3355088.3365170 – ✓ neu, Abstract (101, 104, 105).
- Thier, P., & Ilg, U. J. (2005). The neural basis of smooth-pursuit eye movements. *Current Opinion in Neurobiology, 15*(6), 645–652. https://doi.org/10.1016/j.conb.2005.10.013 – ✓ neu, Abstract (104, 105).
- Tresilian, J. R. (1999). Visually timed action: Time-out for 'tau'? *Trends in Cognitive Sciences, 3*(8), 301–310. https://doi.org/10.1016/S1364-6613(99)01352-2 – ✓ (docs/03) (107).
- Treisman, A., & Souther, J. (1985). Search asymmetry: A diagnostic for preattentive processing of separable features. *Journal of Experimental Psychology: General, 114*(3), 285–310. https://doi.org/10.1037/0096-3445.114.3.285 – ✓ (docs/03) (103).
- Vater, C., Gray, R., & Holcombe, A. O. (2021). A critical systematic review of the Neurotracker perceptual-cognitive training tool. *Psychonomic Bulletin & Review, 28*(5), 1458–1483. https://doi.org/10.3758/s13423-021-01892-2 – ✓ (docs/02) (106).
- Wessel, J. R. (2018). Prepotent motor activity and inhibitory control demands in different variants of the go/no-go paradigm. *Psychophysiology, 55*(3), e12871. https://doi.org/10.1111/psyp.12871 – ✓ (docs/01) (102).
- Wolfe, J. M. (1998). What can 1 million trials tell us about visual search? *Psychological Science, 9*(1), 33–39. https://doi.org/10.1111/1467-9280.00006 – ✓ neu, Abstract (103).
- Yantis, S., & Jonides, J. (1984). Abrupt visual onsets and selective attention: Evidence from visual search. *Journal of Experimental Psychology: Human Perception and Performance, 10*(5), 601–621. https://doi.org/10.1037/0096-1523.10.5.601 – ✓ neu, Abstract (108).

(Kurz belegte Zusatzverweise ohne eigenen Fakt, alle ✓ in docs/01–03: Benikos et al., 2013; Ellison & Walsh, 1998; Kowler et al., 2019; Bae & Flombaum, 2012; Pelli & Tillman, 2008 – vollständige Angaben dort.)

### D3 Normen, Recht, graue Literatur

- Fahrerlaubnis-Verordnung (FeV), Anlage 6 „Anforderungen an das Sehvermögen“, Nr. 2.1 und 2.1.2 (Klassen C, C1, CE, C1E, D, D1, DE, D1E, Fahrgastbeförderung: Stereosehen mit geeignetem Test, z. B. Random-Dot). https://www.gesetze-im-internet.de/fev_2010/anlage_6.html – Wortlaut am 29.09.2026 abgerufen und geprüft. Für Italien/Südtirol nicht geprüft.
- World Wide Web Consortium. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (SC 1.4.1, 2.3.1; Definition „relative luminance“). https://www.w3.org/TR/WCAG22/ – ✓ (docs/01, 03).
- Kosinski (2013) – s. D1 (graue Literatur).

---

## Anhang: Offene Punkte und Unsicherheiten

1. **Nicht im Original gelesen:** Kelly (1961), De Lange (1958), Donders (1969), Logan & Cowan (1984), Treisman &
   Gelade (1980), Eriksen & St. James (1986), Rashbass (1961), Julesz (1971), Leigh & Zee (2015), Wolfe (2007),
   Bahill et al. (1980), Bahill-Hauptsequenz – Inhalte als Lehrbuchwissen bzw. über TLDR/Sekundärquellen;
   entsprechende Zahlen der Website sind dort als „teilweise/unklar“ markiert.
2. **Sakkaden-Spitzengeschwindigkeit** („bis 900°/s“ auf 104): keine geprüfte Zahl gefunden – nicht
   übernehmen; nur Latenz (F39) und Dauer (F40) verwenden.
3. **Koffein/Schlaf-Zahlen** auf 101 („−10–20 ms“, „+30–80 ms“) nicht geprüft; Schlafmangel-Empfindlichkeit
   des PVT ist in docs/01 (Basner & Dinges, 2011) belegt.
4. **„Zimmer abdunkeln“** (101): Sicherheitseinschätzung ohne eigene Zahl – als Vorsichtshinweis formulieren,
   nicht als Befund.
5. **Italienische Führerscheinregeln** (Stereosehen, Sehtest beim Optiker) nicht geprüft.
