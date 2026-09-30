# Literaturbasis W11-koerper-b – Katalognummern 806–811 (Kapitel „Körper & Reflexe“, Teil b)

Stand: 29.09.2026 · Recherche-Agent der Gruppe W11-koerper-b · Grundlage für die Autor-Agenten der Einträge
806 dynamic-grid-evasion, 807 agility-ladder, 808 stability-challenge, 809 jump-sequence,
810 cross-body-movement, 811 complex-pattern.

**Prüfmethode.** Jede DOI wurde über `api.crossref.org/works/<DOI>` abgefragt (Titel, Autor:innen, Jahr,
Zeitschrift, Band, Seiten verglichen). Nicht auflösbare DOIs wurden zusätzlich über `doi.org/api/handles`
geprüft. Inhalte: PubMed-Abstract (efetch) gelesen, wo vorhanden; sonst Volltext (PMC/Autoren-PDF) oder
ausdrücklich als „Inhalt über Sekundärquelle“ markiert. Bücher ohne DOI sind als solche gekennzeichnet.
Werte aus dem Spielcode stammen aus den ausgelieferten Next.js-Chunks (abgerufen 29.09.2026, formatiert,
nur Mechanik/Parameter notiert, kein Code übernommen).

Bereits in `docs/wissenschaft/01–04` geprüfte Quellen wurden wiederverwendet und hier noch einmal per
Crossref bestätigt (u. a. Birch 2012, Harding et al. 2005, Pronk et al. 2020, Proctor & Schneider 2018,
Treisman & Souther 1985, Meyer et al. 1985, Simons et al. 2016).

---

## 0. Vorbefund: Sind diese „Körper“-Übungen körperlich?

**Nein – alle sechs sind Maus-Analogien am Bildschirm.**

- **Code-Befund (alle 6 Spiel-Chunks):** Steuerung über `requestPointerLock` + `mousemove` mit relativer
  Bewegung (`movementX/Y` × Empfindlichkeit); ohne Pointer-Lock Rückfall auf die absolute Zeigerposition
  (`clientX/Y`). Keine Kamera (`getUserMedia`), keine Bewegungs-/Lagesensoren (`devicemotion`,
  `deviceorientation`). Ein Flag „nur Touch-Gerät“ (`ontouchstart`/`maxTouchPoints` und nicht
  `pointer: fine`) wird an die Startkarte übergeben; kontinuierliche Touch-Steuerung ist nicht vorgesehen
  (Touch-Ziehen erzeugt in üblichen Browsern keine fortlaufenden `mousemove`-Ereignisse; `onPointerDown` dient nur
  Bedienknöpfen, die Zeigerbewegung wird ausschließlich über `mousemove` gelesen). → Original auf dem Tablet
  praktisch **nicht** spielbar.
- **Die Website sagt es in 808 und 809 selbst** (englischer Absatz im Seitentext): 808 „runs that loop
  through a mouse cursor — it trains the correction habit, and does not measure physical balance“; 809
  „is a cursor interception drill … does not measure vertical jump or stretch-shortening cycle mechanics“.
- Die Kapitelzuordnung „Körper/Fitness/Balance“ ist daher irreführend: **ganzkoerper, gleichgewicht,
  ausdauer_belastung, sturzrisiko = 0** für alle sechs Originale (sofern Blickfit keine echte
  Körperübung daraus macht).
- **Selbstwiderspruch der Website zu den „Normtabellen“:** Unter jeder Quellenliste steht „SkillDrills
  collects no aggregate performance data … Every figure quoted on this page comes from the published work
  listed above, not from this site's visitors.“ Keine der zitierten Arbeiten enthält Normen für diese
  Spiele → die Stufen „Top 0,1 % / Top 3 % / Top 15 %“ haben **keine Datengrundlage**.

**Code-Parameter (bestätigt, Stand 29.09.2026; t = Levelanteil 0…1):**

| Nr. | Parameter laut Code | Weitere Mechanik |
|---|---|---|
| 806 | Warnzeit = max(0,45 s; 1,4 s − 0,95·t); 3 → 7 von 9 Zellen bedroht (Code-Text) | 3×3-Raster über die **ganze** Spielfläche; Warnpuls bernstein (Füllung Deckkraft 0,15–0,30, Periode 2π·80 ms ≈ 0,50 s ≈ **2 Hz**), Explosion rot (Deckkraft 0,4) + Bildschirm-Wackeln 12 px + roter Vollbild-Blitz bei Treffer |
| 807 | Sprossen-Trefferzone = max(10; 18 − 8·t) px; Scrolltempo 150 → 750 px/s (Seitentext) | Leiter scrollt abwärts, Zeiger links/rechts im Wechsel; Wackeln 12 px, roter Blitz |
| 808 | Sicherheitsring = max(16; 45 − 25·t) px (→ 20 px bei t = 1); „Wind“ 250 → 850 Einheiten (Seitentext) | Zufällige Kraftvektoren (Sinus/Kosinus eines Winkels × Stärke) verschieben das Fadenkreuz; roter Blitz |
| 809 | Zielradius = max(12; 35 − 23·t) px; Zieltempo 120 → 900 px/s (Seitentext) | Maustaste halten = „Laden“, loslassen = Sprung auf Parabel, im Flug seitlich steuern; Wackeln 16 px |
| 810 | Korridor = max(4; 10 − 6·t) px; Knotenradius = max(8; 16 − 8·t) px | Diagonale von Rand zu Rand ziehen; grün/rot-Blitz |
| 811 | Einprägezeit = max(0,6 s; 2,0 s − 1,4·t); 3 → 8 Wegpunkte (Seitentext) | Pfad blitzt auf, danach aus dem Gedächtnis nachziehen; Wackeln 16 px, grün/rot-Blitz |

**Umrechnung Pixel → Sehwinkel (eigene Rechnung, Näherung Bildmitte):**

| Gerät (Annahme) | px/° | 150 px/s | 550 px/s | 750 px/s | 900 px/s | 4 px | 10 px | 12 px | 45 px |
|---|---|---|---|---|---|---|---|---|---|
| 24″ Full-HD (0,277 mm/px), 60 cm | 37,8 | 4,0°/s | 14,5°/s | 19,8°/s | 23,8°/s | 6′ | 16′ | 19′ | 71′ |
| 15,6″ Full-HD-Laptop (0,179 mm/px), 50 cm | 48,7 | 3,1°/s | 11,3°/s | 15,4°/s | 18,5°/s | 5′ | 12′ | 15′ | 56′ |
| iPad, CSS-px 0,192 mm, 40 cm | 36,4 | 4,1°/s | 15,1°/s | 20,6°/s | 24,7°/s | 7′ | 17′ | 20′ | 74′ |

Achtung: Windows-Skalierung (125/150 %) und die tatsächliche Canvas-Größe (= Containerbreite) verändern
die Werte; die Spiele rechnen in CSS-Pixeln, nicht in Sehwinkel.

---

## A) Website-Quellen – Prüftabelle je Übung

Legende DOI-Prüfung: ✓ = Crossref-Metadaten stimmen · ✗ = DOI existiert nicht oder führt zu anderer Arbeit.
„Stützt Aussage“ bezieht sich auf die **konkrete Aussage, für die die Website die Quelle anführt**.

### 806 · Dynamic Grid Evasion („Reaktionstest online / Raster-Ausweichspiel“)

| # | Angabe der Website | DOI-/Angabenprüfung | Stützt Aussage? | Begründung |
|---|---|---|---|---|
| 1 | Posner, M. I. (1980). Orienting of attention. *QJEP*, 32(1), 3–25. 10.1080/00335558008248231 | ✓ | **teilweise** | Belegt: räumliche Hinweisreize beschleunigen am erwarteten Ort und verlangsamen am unerwarteten; verdeckte (covert) Aufmerksamkeitsverlagerung. Nicht belegt: dass ein „Ankerblick“ in der Mitte alle 9 Zellen „simultan“ abdeckt, 80–120 ms „Sakkadenzeit spart“ oder dass die Normtabelle darauf beruht. (Kein Abstract; Inhalt Standardwissen.) |
| 2 | Treisman, A. M., & Gelade, G. (1980). A feature-integration theory of attention. *Cogn Psychol*, 12(1), 97–136. 10.1016/0010-0285(80)90005-5 | ✓ | **teilweise** | Einzelmerkmale (hier: bernsteinfarbener Rahmen) werden parallel entdeckt. Aber: gesucht ist die **sichere** Zelle = Zelle **ohne** Merkmal; Ziele, denen ein Merkmal fehlt, werden weniger effizient gefunden (Treisman & Souther, 1985). „Hohe Bewegungsempfindlichkeit der peripheren Netzhaut“ steht nicht in der Quelle (und die Warnung ist kein Bewegungs-, sondern ein Farb-/Helligkeitsreiz). |
| 3 | Woodworth, R. S. (1899). The accuracy of voluntary movement. *Psychol Rev Monogr Suppl*, 3(3), i–114. 10.1037/h0092992 | ✓ (Crossref-Titel ohne „The“) | **teilweise** | Zwei-Komponenten-Modell (Anfangsimpuls + visuell gesteuerte Endphase) ist Kern der Arbeit (Elliott et al., 2001). „Reibungsbremsung an Zellgrenzen“, „Handballen als Bremse“ sind nicht Inhalt. |
| 4 | Fitts, P. M. (1954). The information capacity of the human motor system … *J Exp Psychol*, 47(6), 381–391. 10.1037/h0055392 | ✓ | **teilweise** | Das Gesetz gilt für Zielbewegungen. „Zwingt das motorische Kleinhirn zu explosiver Beschleunigung“ ist keine Aussage der Quelle. Zellen sind sehr groß (≈ ⅓ der Spielfläche) → geringer Fitts-Schwierigkeitsindex; die Leistung begrenzt eher Entdecken/Entscheiden. |
| 5 | Woods, D. L., et al. (2015). Factors influencing the latency of simple reaction time. *Front Hum Neurosci*, 9, 131. 10.3389/fnhum.2015.00131 | ✓ (131 = Artikelnummer) | **nein** (Normen) / teilweise (Hardware) | Woods misst **einfache** Reaktionszeit (231 ms, hardwarekorrigiert 213 ms) – keine Normen für Raster-Ausweichen („Normiert nach … Woods“ ungedeckt). Hardwareverzögerungen werden dort diskutiert; „Differenzen unter 5 ms = Messrauschen“ stammt nicht aus Woods. |

Weitere Website-Aussagen ohne Beleg: „Hand zuckt in unter 250 ms in die freie Zone“, „automatisiert den
Fluchtreflex“, Transfer auf LoL/Valorant/CS2, „trainiert periphere Wahrnehmung“ (für Alltag nicht belegt).

### 807 · Agility Ladder („Koordinationsleiter Übungen“)

| # | Angabe der Website | DOI-/Angabenprüfung | Stützt Aussage? | Begründung |
|---|---|---|---|---|
| 1 | Lashley, K. S. (1951). The problem of serial order in behavior. *Cerebral Mechanisms in Behavior*, 112–136. 10.1037/11147-006 | **✗ DOI existiert nicht** (doi.org: Handle nicht gefunden; Crossref: not found). Richtig: Buchkapitel in L. A. Jeffress (Hrsg.), *Cerebral mechanisms in behavior* (Hixon Symposium), Wiley, New York, **S. 112–131** (so bei Rosenbaum et al., 2007); **keine DOI** | **teilweise** | Lashley verwarf Reflexketten; manche Sequenzen laufen zu schnell für Rückmeldung von Glied zu Glied; Verhalten wird durch hierarchische Pläne gesteuert (Rosenbaum et al., 2007). Nicht Inhalt: „prämotorischer Kortex bereitet 4-Sprossen-Paket vor“, konkrete „100–150 ms Rückkopplung“. |
| 2 | Schmidt, R. A. (1975). A schema theory of discrete motor skill learning. *Psychol Rev*, 82(4), 225–260. 10.1037/h0076770 | ✓ | **teilweise** | Theorie (Schema, generalisiertes motorisches Programm) – kein „Beweis“. Relative-Timing-Invarianz ist empirisch überwiegend **nicht** bestätigt, wenn konservativ ausgewertet wird (Gentner 1987, zit. n. Beek, 1992). „Schema theory of *discrete* skills“ passt nur bedingt auf einen fortlaufenden Wechselrhythmus. |
| 3 | Fitts (1954) – wie 806 | ✓ | **teilweise** | Klassischer Fitts-Index gilt für ruhende Ziele; bei bewegten Zielen braucht es Geschwindigkeitsterme (vgl. docs/wissenschaft/02, Jagacinski et al. 1980). |
| 4 | Woodworth (1899) – wie 806 | ✓ | teilweise | wie 806. |
| 5 | Woods et al. (2015) – wie 806 | ✓ | **nein** | keine Normen für Leiterspiel. |

Weitere Aussagen ohne Beleg: Transfer auf „echte Beinarbeit“ durch „identische neuronale Taktgeber“
(nicht belegt; selbst **echtes** Leitertraining verbesserte bei Jugendfußballern Sprint/Agilität/Dribbling
nicht stärker als die Kontrollgruppe: Padrón-Cabo et al., 2020); „foveale Blickverfolgung bricht über
550 px/s zusammen“ (falsch: 550 px/s ≈ 11–15°/s, weit unter der Folgegrenze; Meyer et al., 1985);
„Sakkadenverzögerung 30–50 ms“ (verwechselt Sakkadendauer mit Latenz; nicht geprüft).

### 808 · Stability Challenge („Maus-Stabilitätstest“)

| # | Angabe der Website | DOI-/Angabenprüfung | Stützt Aussage? | Begründung |
|---|---|---|---|---|
| 1 | Nashner, L. M., & McCollum, G. (1985). The organization of human postural movements … *Behav Brain Sci*, 8(1), 135–150. 10.1017/S0140525X00019864 | **✗ DOI existiert nicht.** Richtig: **10.1017/S0140525X00020008** (Titel, Jahr, Band, Seiten sonst korrekt) | **nein** | Modell für **Ganzkörper**-Haltungskorrekturen im Stand (wenige stereotype Muskelstrategien, z. B. Sprunggelenk-/Hüftstrategie). Keine Aussage zu Unterarm-Kokontraktion, Mausführung oder „Mikrostopps“. Der englische Satz „organised into a few stereotyped strategies“ ist korrekt, aber auf die Maus nicht übertragbar. |
| 2 | Winter, D. A. (1995). Human balance and posture control during standing and walking. *Gait & Posture*, 3(4), 193–214. 10.1016/0966-6362(96)82849-9 | ✓ | **nein** (Maus) / teilweise (Stehen) | Übersicht zu Gleichgewicht beim Stehen/Gehen (Druckmittelpunkt vs. Körperschwerpunkt, umgekehrtes Pendel). „Gelenkmoment-Regulierung … Ko-Kontraktion der Unterarmmuskeln“ ist nicht Inhalt. Ob ruhiges Stehen „ein ständiger Korrekturkreis“ ist, ist umstritten (steifigkeitsbasiert vs. intermittierend; vgl. Loram et al., 2011). Kein Abstract; Inhalt Standardwissen. |
| 3 | Woodworth (1899) – wie 806 | ✓ | **teilweise** | Zwei Komponenten ja. „Korrekturzyklen von 150–200 ms“ bzw. „Vision needs roughly 100–150 ms“ stammen nicht von Woodworth (er schätzte die nötige Zeit deutlich länger; Sekundärangabe ≈ 450 ms, nicht im Original geprüft). Moderne Werte: < 190 ms (Zelaznik et al., 1983), ≈ 160 ms (Saunders & Knill, 2003). |
| 4 | Fitts (1954) – wie 806 | ✓ | **teilweise** | Halten in einem Ring gegen Störkräfte ist eine Kompensations-Tracking-Aufgabe, keine Fitts-Zielbewegung; „Schwierigkeit steigt logarithmisch, sobald sich die Zielgröße halbiert“ ist für Fitts korrekt formuliert (ID + 1 bit je Halbierung), hier aber nicht einschlägig. |
| 5 | Woods et al. (2015) – wie 806 | ✓ | teilweise | Nur für den Hinweis auf Hardwareverzögerungen passend. |

Positiv: Die Seite räumt selbst ein, kein Gleichgewicht zu messen. Unbelegt: „20–30 % Grundspannung im
Unterarm“, Transfer auf Waffen-Rückstoß, „für Anwender mit zitterndem Mauszeiger“ (kein Beleg, kein
Therapieeffekt bei Tremor).

### 809 · Jump Sequence („Sprungsequenz & Flugbahn-Abfangen“)

| # | Angabe der Website | DOI-/Angabenprüfung | Stützt Aussage? | Begründung |
|---|---|---|---|---|
| 1 | Komi, P. V. (2000). Stretch-shortening cycle … *J Biomech*, 33(10), 1197–1206. 10.1016/S0021-9290(00)00064-6 | ✓ | **nein** (für die Übung) | Dehnungs-Verkürzungs-Zyklus = Muskel-Sehnen-Mechanik bei Hüpfen/Laufen (Kraftsteigerung, Dehnreflex). Maustaste halten/loslassen hat damit nichts zu tun. „Absprungleistung bis zu 25 % gesteigert“ steht nicht im Abstract; der Unterschied Gegenbewegungs- vs. Hocksprung (3,4 cm) wird **nicht** durch elastische Energie erklärt (Bobbert et al., 1996). |
| 2 | Kawato, M. (1999). Internal models for motor control and trajectory planning. *Curr Opin Neurobiol*, 9(6), 718–727. 10.1016/S0959-4388(99)00028-8 | ✓ | **teilweise** | Interne (inverse/Vorwärts-)Modelle, Kleinhirn-Purkinje-Zellen – belegt als Konzept. Dass die Übung „Kleinhirn-Vorwärtsmodelle trainiert“, ist nicht belegt. |
| 3 | Lee, D. N. (1976). A theory of visual control of braking based on information about time-to-collision. *Perception*, 5(4), 437–459. 10.1068/p050437 | ✓ | **nein** | Tau = Bildgröße / Expansionsrate eines **sich nähernden** Objekts (Bremsen beim Fahren). Die Ziele fliegen seitlich in 2D und **expandieren nicht** → Tau ist hier keine Information. Zudem gilt Tau als alleinige Zeitinformation als widerlegt (Tresilian, 1999). |
| 4 | Woodworth (1899) – wie 806 | ✓ | teilweise | wie 806; „100-ms-Zeitfenster“ nicht aus der Quelle. |
| 5 | Fitts (1954) – wie 806 | ✓ | teilweise | bewegte Ziele → Fitts allein unpassend. |
| 6 | Woods et al. (2015) – wie 806 | ✓ | nein | keine Normen für Sprungspiel. |

### 810 · Cross-Body Movement („Hand-Auge-Koordination Test“)

| # | Angabe der Website | DOI-/Angabenprüfung | Stützt Aussage? | Begründung |
|---|---|---|---|---|
| 1 | Ayres, A. J. (1972). *Sensory Integration and Learning Disorders*. Western Psychological Services, Los Angeles | **Buch, keine DOI** (korrekt ohne DOI angegeben); ISBN 0-87424-303-3 (Open Library) | **nein** | Gründungswerk der Sensorischen-Integrations-Theorie für Kinder mit Lernstörungen – Theorie, kein Nachweis, dass Mittellinienkreuzen „für die synchrone Reifung beider Großhirnrinden unerlässlich“ ist. Wirksamkeit sensorischer Integrationstherapie: begrenzt/unklar (AAP, 2012). Keinerlei Bezug zu Erwachsenen am Bildschirm. |
| 2 | Carey, D. P., Hargreaves, E. L., & Goodale, M. A. (1996). Reaching to ipsilateral or contralateral targets: Direction and hemispace effects. *Exp Brain Res*, 110(2), 267–286. 10.1007/BF00228557 | **✗ mehrfach falsch:** DOI führt zu Desmurget et al. (1996), „Integrated control of hand transport and orientation during prehension movements“, *Exp Brain Res* 110(2). Richtig: Carey, Hargreaves & Goodale (1996). *Reaching to ipsilateral or contralateral targets: within-hemisphere visuomotor processing cannot explain hemispatial differences in motor control.* *Exp Brain Res*, **112(3), 496–504**, **10.1007/BF00227955** (PubMed 9007551) | **teilweise / widerspricht** | Richtig ist: Zielbewegungen auf die Gegenseite sind etwas langsamer/ungenauer (vgl. Fisk & Goodale, 1985). Aber Carey et al. zeigen an 26 Rechtshändern, dass die Unterschiede von der **Bewegungsrichtung** und nicht vom Gesichtsfeld des Ziels abhängen, und erklären sie **biomechanisch** – also gerade **nicht** mit Informationsaustausch zwischen den Hirnhälften. Die Aussage „aktiviert den Balken / baut die Brücke zwischen den Gehirnhälften aus“ wird von der eigenen Quelle nicht gestützt. |
| 3 | Černáček, J. (1961). Contralateral motor irradiation—cerebral dominance: Its changes in hemiparesis. *Arch Neurol*, 4(2), 165–172. 10.1001/archneur.1961.00450080047005 | ✓ (PubMed 13691977: S. 165–172) | **nein** (Bezug unklar) | Thema: Mitbewegungen/„Irradiation“ in die Gegenseite und Hemisphärendominanz, Veränderungen bei Halbseitenlähmung. Kein Abstract; wird im Seitentext gar nicht inhaltlich verwendet. Keine Aussage zu Training oder Mittellinienkreuzen. |
| 4 | Fitts (1954) – wie 806 | ✓ | **teilweise** | Durch einen Korridor ziehen folgt dem **Steering Law** (Zeit ∝ Länge/Breite; Accot & Zhai, 1997), nicht Fitts' logarithmischem Gesetz. |
| 5 | Woodworth (1899) – wie 806 | ✓ | teilweise | „75 % ballistisch / 25 % Bremsen mit Fingerkuppen“ nicht aus der Quelle. |
| 6 | Woods et al. (2015) – wie 806 | ✓ | nein | keine Normen. |

Zentraler Denkfehler: Wer die Maus mit der rechten Hand führt, bewegt die **Hand** meist nur rechts vor
dem Körper; der **Zeiger** kreuzt die Bildschirmmitte, die **Hand** kreuzt die Körpermitte in der Regel
nicht. „Bilateral“ ist die Übung auch nicht (nur eine Hand).

### 811 · Complex Pattern („Muster merken Test“)

| # | Angabe der Website | DOI-/Angabenprüfung | Stützt Aussage? | Begründung |
|---|---|---|---|---|
| 1 | Baddeley, A. D., & Hitch, G. (1974). Working memory. *Psychology of Learning and Motivation*, 8, 47–89. 10.1016/S0079-7421(08)60452-1 | ✓ (Buchkapitel; Crossref ohne Bandangabe, Band 8 korrekt) | **ja / teilweise** | Mehrkomponentenmodell des Arbeitsgedächtnisses (1974 dreiteilig). Der „visuell-räumliche Notizblock“ wurde vor allem später ausgearbeitet; „im parietalen und präfrontalen Kortex“ ist nicht Inhalt dieser Quelle. Kein Abstract; Inhalt Standardwissen. |
| 2 | Cowan, N. (2001). The magical number 4 in short-term memory … *Behav Brain Sci*, 24(1), 87–114. 10.1017/S0140525X01003922 | ✓ | **ja** (Kapazität) / nein (Folgerungen) | Kapazitätsgrenze ≈ 4 Chunks (Spanne 3–5) ist Kernaussage. Nicht belegt: „ab Level 5 bricht das Merken zusammen“, „neuroplastisch gezwungen“. Ein zusammenhängender Pfad lässt sich als **eine** Form merken (Gestalt), deshalb ist „8 Punkte = 8 Items“ zu einfach (vgl. Parmentier et al., 2005). |
| 3 | Lashley (1951) – wie 807 | **✗ DOI existiert nicht**; S. 112–131 | teilweise | wie 807. |
| 4 | Woodworth (1899) – wie 806 | ✓ | teilweise | wie 806. |
| 5 | Woods et al. (2015) – wie 806 | ✓ | nein | keine Normen. |

Weitere Aussagen ohne Beleg: Nutzen für TMS/MedAT („Figuren lernen“ verlangt Figuren mit Merkmalen zu
behalten, kein Nachzeichnen), „in erheblichem Maße“ besseres Recoil-Control, „Netzhaut-Nachwirkung
nutzen“ (Nachbilder/ikonisches Gedächtnis sind kein brauchbarer Speicher für 0,6-s-Pfade).

### Zusammenfassung Teil A

- **32 Zitierungen**, **17 verschiedene Quellen**.
- **Fehlerhaft: 3 Quellen / 4 Zitierungen**
  - Lashley (1951): DOI 10.1037/11147-006 existiert nicht (807, 811); Seiten 112–131 statt 112–136.
  - Nashner & McCollum (1985): DOI falsch (richtig 10.1017/S0140525X00020008) (808).
  - Carey et al. (1996): DOI führt zu anderer Arbeit, Band/Heft/Seiten und Untertitel falsch (richtig
    10.1007/BF00227955, 112(3), 496–504) (810).
- Ayres (1972) ist ein Buch ohne DOI (korrekt so angegeben).
- **Inhaltlich:** Keine Quelle stützt die „Normtabellen“; die Körper-Quellen (Nashner, Winter, Komi) betreffen
  Ganzkörperbewegung und passen nicht zur Maus; Lee (Tau) passt physikalisch nicht; Carey widerspricht der
  „Balken“-These.

---

## B) Faktenliste – Aussage · Zahl · Quelle

Nummern (F01 …) zum Zitieren in den Einträgen. „Übung(en)“ = wofür besonders relevant.

### B1 Gerät, Messung, Sehwinkel

| ID | Aussage | Zahl | Quelle | Übung(en) |
|---|---|---|---|---|
| F01 | Alle sechs Originale werden über Maus mit Pointer-Lock (relative Bewegung) gesteuert; keine Kamera, keine Lagesensoren; auf Touch-Geräten praktisch nicht steuerbar. | – | eigene Code-Analyse der ausgelieferten Chunks, 29.09.2026 | alle |
| F02 | Bildwechsel-Schritt eines bewegten Objekts = Tempo / Bildrate. | 750 px/s: 12,5 px bei 60 Hz, 5,2 px bei 144 Hz, 3,1 px bei 240 Hz; 900 px/s: 15 bzw. 3,75 px | eigene Rechnung (Website-Werte rechnerisch korrekt) | 807, 809 |
| F03 | Sehwinkel der Reize: 1° ≈ 37,8 px (24″ FHD, 60 cm), ≈ 48,7 px (15,6″ FHD, 50 cm), ≈ 36,4 CSS-px (iPad, 40 cm). | 750 px/s ≈ 15–21°/s; 4-px-Korridor ≈ 5–7′; 10-px-Sprosse ≈ 12–17′ | eigene Rechnung (vgl. docs/wissenschaft/02, 4.2) | 807–810 |
| F04 | Mit kalibrierter Messung lag die einfache Reaktionszeit bei 231 ms, nach Abzug der Hardwareverzögerung 213 ms (≈ 18 ms Gerät); +0,55 ms pro Lebensjahr; reine Reizentdeckung ≈ 131 ms, altersstabil; Altersverlangsamung v. a. motorisch. | n = 1.469 (18–65 J.) + 189 (18–82 J.) | Woods et al., 2015 | alle (Messgrenzen) |
| F05 | Web-Apps überschätzen Reaktionszeiten auf Touch- und Tastaturgeräten **systematisch**; für individuelle Vergleiche problematischer als für Gruppenvergleiche. | Touch im Mittel ≈ 58–70 ms zu lang (Wert aus docs/wissenschaft/03) | Pronk et al., 2020 | alle (Tablet) |
| F06 | USB-Abfragerate 125 Hz = 8 ms, 1.000 Hz = 1 ms Intervall; ein Bild bei 60 Hz = 16,7 ms. | – | eigene Rechnung | alle |
| F07 | Niedrige Maus-Übersetzung (CD-Gain) verschlechtert Zeigen deutlich (mehr Umgreifen); hohe Gains kaum; **Zeigerbeschleunigung war auf dem Desktop 3,3 % schneller** als konstante Übersetzung (bis 5,6 % bei kleinen Zielen). | 3,3 % / 5,6 % | Casiez et al., 2008 (Volltext-Abstract gelesen) | 806–810 (Website-Tipp „Beschleunigung aus“ ist kein Leistungsgebot) |
| F08 | Ältere (60–75 J.) hatten mit Maus-Aufgaben mehr Schwierigkeiten als Jüngere; Altersunterschiede v. a. beim Klicken und Doppelklicken; psychomotorische Veränderungen erklären sie mit. | n = 60 in 3 Altersgruppen | Smith, Sharit & Czaja, 1999 | alle (Alter) |
| F09 | Mäßige Evidenz: Dauer der Mausnutzung hängt mit Hand-Arm-Beschwerden zusammen (Hinweise auf Dosis-Wirkung). | 9 Längsschnittstudien, 6 hoher Qualität | IJmker et al., 2007 | alle (vorsicht: hand_arm_beschwerden) |

### B2 Blick, Sakkaden, Auge-Hand-Kopplung, Peripherie

| ID | Aussage | Zahl | Quelle | Übung(en) |
|---|---|---|---|---|
| F10 | Sakkaden-Reaktionszeiten: bei „Gap“ (Fixpunkt erlischt ≈ 200 ms vorher) zweigipflig – Express-Sakkaden ≈ 100 ms, reguläre ≈ 150 ms. | 100 / 150 ms | Fischer & Ramsperger, 1984 | 806, 810 |
| F11 | Menschen blicken spontan zum Ziel, etwa wenn die Hand losgeht; **dürfen die Augen nicht zum Ziel, leidet die Genauigkeit** der Handbewegung – auch ohne Sicht auf die Hand. | 3 Experimente | Abrams, Meyer & Kornblum, 1990 | 806, 810 |
| F12 | Zeigen ist genauer, wenn das Ziel angeschaut wird; der Blick bleibt bis zum Ende der Zeigebewegung „verankert“: Sakkaden zu einem neuen Ziel verzögerten sich während des Zeigens um im Mittel **155 ms**. | 155 ms | Neggers & Bekkering, 2000 | 806, 810 |
| F13 | Einzelmerkmale (Farbe, Orientierung) werden parallel entdeckt, Merkmalskombinationen brauchen fokussierte Aufmerksamkeit. | – | Treisman & Gelade, 1980 | 806 |
| F14 | Suchasymmetrie: Ein Ziel **mit** Zusatzmerkmal springt ins Auge, ein Ziel, dem das Merkmal **fehlt**, wird weniger effizient gefunden. | – | Treisman & Souther, 1985 | 806 (sichere Zelle = ohne Warnrahmen) |
| F15 | Räumliche Hinweisreize: gültige Hinweise beschleunigen, ungültige verlangsamen die Reaktion (Kosten-Nutzen), auch ohne Blickbewegung (covert). | – | Posner, 1980 | 806 |
| F16 | Wahlreaktionszeit steigt linear mit log₂ der Alternativenzahl (Hick-Hyman); bei sehr kompatiblen Zuordnungen (Zeiger direkt zum Reizort) ist der Anstieg **nahezu flach**; Übung flacht die Steigung ab. | – | Proctor & Schneider, 2018 | 806 |
| F17 | Glatte Augenfolgebewegung: Gain bei einigen Personen ≈ 0,9 bis 100°/s (bei einer nur 0,6). → Scrolltempi von 15–25°/s sind gut verfolgbar; die Website-Aussage „bricht über 550 px/s zusammen“ ist für normale Geometrie falsch. | 100°/s | Meyer, Lasker & Robinson, 1985 (+ F03) | 807, 809 |

### B3 Zielbewegung, Online-Korrektur, Tracking

| ID | Aussage | Zahl | Quelle | Übung(en) |
|---|---|---|---|---|
| F18 | Fitts' Gesetz: Bewegungszeit MT = a + b·log₂(2A/W) (A = Distanz, W = Zielbreite). | – | Fitts, 1954 | 806, 810 |
| F19 | Woodworths Zwei-Komponenten-Modell (zentral geplanter Anfangsimpuls + rückmeldungsbasierte „current control“) ist nach 100 Jahren weiterhin Grundlage der Forschung zu Zielbewegungen. | – | Elliott, Helsen & Chua, 2001 | 806–811 |
| F20 | Keele & Posner (1968) fanden keinen Sichtvorteil bei 190-ms-Bewegungen; spätere Versuche zeigten, dass Sehen die Genauigkeit auch bei **deutlich kürzeren** Bewegungen beeinflussen kann. | < 190 ms | Zelaznik, Hawkins & Kisselburgh, 1983 (Abstract; enthält Keele-&-Posner-Befund) | 806, 808 |
| F21 | Unbemerkte Verschiebungen der gesehenen Fingerposition wurden **nach im Mittel 160 ms** korrigiert – kontinuierlich während der ganzen Bewegung, unabhängig vom Tempo (feste sensomotorische Verzögerung). | 160 ms | Saunders & Knill, 2003 | 806, 808, 810 |
| F22 | Manuelles Nachführen ist **intermittierend**: kleine Fehler-Totzone ≈ **0,8° Sehwinkel** (0,7 cm am Bildschirm) und eine „Refraktärzeit“ von ≈ **170 ms** zwischen Korrekturen; ohne Sicht auf den eigenen Zeiger glatteres Nachführen, weniger Leistung 0,5–1,8 Hz. | 0,8°; 170 ms | Miall, Weir & Stein, 1993 | 808 |
| F23 | Visuo-manuelles Stabilisieren einer instabilen Last gelingt mit sanften, intermittierenden „Tipps“; optimal ≈ **2 Korrekturen/s**; über 1–2 Hz praktisch keine Kohärenz zwischen Störung und Steuerung. | 2/s; 1–2 Hz | Loram, Gollee, Lakie & Gawthrop, 2011 | 808 |
| F24 | Kokontraktion (gleichzeitige Anspannung von Agonist und Antagonist) steigt, je kleiner das Ziel, und verbessert die Genauigkeit; sie **nimmt mit Übung ab**. | 7 Schulter-/Ellbogenmuskeln | Gribble, Mullin, Cothros & Mattar, 2003 | 808 (stützt den Kokontraktions-Tipp teilweise – aber nicht über Nashner/Winter) |
| F25 | Steering Law: Zeit für das Durchfahren eines Tunnels MT = a + b·(A/W); r² = 0,968 (Stift auf Tablett, 13 Personen); die Geschwindigkeit wächst linear mit der Tunnelbreite. | r² 0,968 | Accot & Zhai, 1997 (Volltext) | 810, 811 |
| F26 | Beim Abfangen bewegter Ziele ist die **zeitliche Präzision am höchsten, wenn man frei wählen darf, wo** man abfängt; vorgegebene Abfangpunkte verschlechtern sie; Menschen passen eher den Ort als den Zeitpunkt an. | – | Brenner & Smeets, 2015 | 807, 809 |
| F27 | Physiologischer Tremor ist multifaktoriell (zentrale Oszillationen im ≈ 10-Hz-Bereich, motorische Einheiten, mechanische Resonanz); Parkinson-Tremor 3–6 Hz. | ≈ 10 Hz; 3–6 Hz | McAuley & Marsden, 2000 | 808, 810 |
| F28 | Essentieller Tremor: gepoolte Prävalenz 0,9 % (alle Alter), **4,6 % ab 65 Jahren**. | 28 Studien, 19 Länder | Louis & Ferreira, 2010 | 808, 810 (vorsicht: tremor_parkinson) |

### B4 Sequenzen, Rhythmus, Abfangen, Sprung

| ID | Aussage | Zahl | Quelle | Übung(en) |
|---|---|---|---|---|
| F29 | Lashley verwarf Reflexketten: Bewegungen laufen auch ohne Rückmeldung, manche Folgen sind zu schnell für Glied-zu-Glied-Rückmeldung, Fehler verraten Vorausplanung; Pläne sind hierarchisch. Zusätzlich steigt die Startzeit mit Länge/Komplexität der Folge. | – | Rosenbaum et al., 2007 (über Lashley, 1951) | 807, 811 |
| F30 | Visuomotorische Sequenzen werden spontan in **Chunks** gegliedert (Zeitlücken zwischen Chunks); Chunks wirken als Gedächtniseinheit; zerstörte Chunks verschlechtern die Leistung. | 10 Tastenpaare | Sakai, Kitaguchi & Hikosaka, 2003 | 807, 811 |
| F31 | Die Proportional-Duration-Hypothese (invariantes relatives Timing des GMP) wird bei konservativer Auswertung von der „großen Mehrheit“ der Befunde **nicht** gestützt (Gentner, 1987). | – | Beek, 1992 | 807 (Website: „Schmidt beweist …“) |
| F32 | „Agility“ = schnelle Ganzkörperbewegung mit Tempo-/Richtungswechsel **als Reaktion auf einen Reiz**; umfasst physische und kognitive Anteile (Blickstrategie, Antizipation). Folgerung (eigene Ableitung): vorgeplante Leiterfolgen üben Richtungswechsel-Schnelligkeit, nicht Agility im Sinne dieser Definition. | – | Sheppard & Young, 2006 | 807 |
| F33 | 6 Wochen Koordinationsleiter (3×/Woche) bei Jugendfußballern: **kein** Unterschied zur Kontrollgruppe in Sprint, Agility, Dribbling. | n = 18 (10 vs. 8), 12 J. | Padrón-Cabo et al., 2020 | 807 |
| F34 | Dehnungs-Verkürzungs-Zyklus steigert die Muskelkraft beim Hüpfen/Laufen; der kurzlatente Dehnreflex trägt bei; Ermüdung mindert ihn. | – | Komi, 2000 | 809 |
| F35 | Gegenbewegungssprung war auch bei gleicher Startposition im Mittel **3,4 cm höher** als der Hocksprung; Speicherung elastischer Energie wurde als Erklärung **ausgeschlossen** (höherer aktiver Muskelzustand vor dem Verkürzen). | 3,4 cm; 6 Volleyballer | Bobbert et al., 1996 | 809 (Website: „bis zu 25 % durch Dehnreflex und Sehnenspeicher“) |
| F36 | Tau (Kehrwert der relativen Expansionsrate des Netzhautbildes) liefert die Zeit bis zur Kollision für **näherkommende** Objekte (Bremsen). | – | Lee, 1976 | 809 (nicht anwendbar auf seitlich fliegende 2D-Ziele) |
| F37 | Die Tau-Hypothese als alleinige Zeitinformation gilt als widerlegt; Menschen nutzen aufgaben- und situationsabhängig viele Informationsquellen. | – | Tresilian, 1999 | 809 |
| F38 | Beim Abfangen reichen visuelle Informationen allein nicht aus; sie werden durch Vorwissen/interne Modelle (z. B. der Schwerkraft) ergänzt; wegen sensomotorischer Verzögerungen ist Vorhersage über Hunderte ms nötig. | – | Zago et al., 2009 | 809 |
| F39 | Interne Modelle (invers/vorwärts) sind gut gestützte Konzepte; inverse Modelle im Kleinhirn durch Purkinje-Zell-Ableitungen belegt. | – | Kawato, 1999 | 809 |

### B5 Gleichgewicht, Stürze, echtes Training

| ID | Aussage | Zahl | Quelle | Übung(en) |
|---|---|---|---|---|
| F40 | Haltungskorrekturen im Stand bestehen aus wenigen stereotypen Muskelstrategien (Ganzkörper). | – | Nashner & McCollum, 1985 | 808 |
| F41 | Automatische Haltungsantworten auf Standflächen-Verschiebung beginnen nach **73–110 ms**, im Sprunggelenk, dann Oberschenkel, dann Rumpf („Sprunggelenkstrategie“); auf kurzer Standfläche „Hüftstrategie“. | 73–110 ms | Horak & Nashner, 1986 | 808 |
| F42 | Stürze: weltweit ≈ **684.000 Todesfälle/Jahr**, zweithäufigste Ursache unbeabsichtigter Verletzungstode; 37,3 Mio. behandlungsbedürftige Stürze/Jahr; die meisten tödlichen Stürze bei über 60-Jährigen. | 684.000; 37,3 Mio. | WHO, 2021 (Fact Sheet) | Kapitel 8 allgemein |
| F43 | Bewegungstraining senkt die Sturzrate bei zu Hause lebenden Älteren um **23 %** (RaR 0,77); Gleichgewichts-/Funktionstraining 24 % (0,76); Kombinationen 34 % (0,66). | 108 RCTs, 23.407 Personen, Ø 76 J. | Sherrington et al., 2019 (Cochrane) | 807, 808, 809 (echte Körperübung) |
| F44 | Schritttraining (willkürlich oder reaktiv) senkte die Sturzrate um ≈ 50 % (RR 0,48) und den Anteil Stürzender (0,51); verbessert Schritt-Reaktionszeit, Einbeinstand, Timed-Up-and-Go, nicht Kraft. | 7 RCTs, n = 660 | Okubo, Schoene & Lord, 2017 | 807 (echte Leiter/Schrittmuster) |
| F45 | „Square-Stepping Exercise“ (Schrittmuster auf einer Matte merken und nachgehen) verbesserte bei 65–74-Jährigen Beinkraft, Gleichgewicht, Agilität, Reaktionszeit stärker als Gehen; Sturzrate 23,4 % vs. 33,3 % pro Personenjahr (n. s., p = 0,31). | n = 68, 12 Wochen | Shigematsu et al., 2008 | 807, 811 (reales Gegenstück „Muster merken + Schritte“) |
| F46 | Exergames (Bewegungsspiele im Stehen) verbesserten bei Älteren Schwankung (SMD −0,89), Berg-Balance-Skala (+2,15 Punkte) und Timed-Up-and-Go (−2,48 s). | 12 RCTs, n = 1.520, Ø 76 J. | Pacheco et al., 2020 | 808 (Blickfit-Option mit echtem Körpereinsatz) |
| F47 | Rein kognitives Training (im Sitzen) hatte einen kleinen Effekt auf **komplexes** Gehen (Gehen mit Zusatzaufgabe, ES 0,47), nicht signifikant auf normales Gehen (ES 0,35). | 10 RCTs, n = 351 | Marusic, Verghese & Mahoney, 2018 | alle (einzige Brücke „Bildschirm → Mobilität“; nicht für diese Übungen untersucht) |
| F48 | WHO-Empfehlung für Ältere (≥ 65): vielseitige Aktivität mit Schwerpunkt **funktionelles Gleichgewicht und Kraft** an **≥ 3 Tagen/Woche** (mittlere oder höhere Intensität). | ≥ 3 d/Woche | Bull et al., 2020 (Volltext PMC) | 807–809 |
| F49 | Mehrstärkenbrillen (Bi-/Trifokal, Gleitsicht) verschlechtern Kantenkontrast und Tiefenwahrnehmung beim Blick durch den unteren Glasteil; Träger stürzten gut doppelt so oft (OR 2,29), besonders durch Stolpern (OR 2,79), außer Haus (OR 2,55) und auf Treppen. | n = 156, 63–90 J.; 55,8 % Träger | Lord, Dayhew & Howland, 2002 | 807–809 (Optiker; reale Schritt-/Sprungübungen) |
| F50 | Einstärken-Fernbrillen für draußen an Mehrstärken-Träger: insgesamt −8 % Stürze (IRR 0,92, n. s.); bei draußen Aktiven −40 % (IRR 0,60); bei wenig draußen Aktiven **mehr** Stürze draußen. | n = 606, Ø 80 J. | Haran et al., 2010 (VISIBLE-RCT) | 807–809 (Optiker) |
| F51 | Umfassende Augen-/Sehprüfung mit Behandlung (u. a. neue Brillen) bei gebrechlichen Älteren **erhöhte** die Sturzrate (RaR 1,57; 65 % vs. 50 % Stürzende). | n = 616, Ø 81 J. | Cumming et al., 2007 | alle (Optiker: Brillenwechsel = Eingewöhnung/Sturzhinweis) |

### B6 Mittellinie, Hemisphären, „Brain Gym“, Sensorische Integration

| ID | Aussage | Zahl | Quelle | Übung(en) |
|---|---|---|---|---|
| F52 | Greifbewegungen zu Zielen auf der Körperseite der Hand (ipsilateral) starten schneller, sind schneller und genauer als über die Körpermitte (kontralateral); entscheidend ist die Zielseite relativ zur **Körperachse**, nicht das Gesichtsfeld. | 10°/20° Exzentrizität | Fisk & Goodale, 1985 | 810 |
| F53 | Die Vorteile ipsilateraler Bewegungen (Spitzengeschwindigkeit, Dauer, Abbremsanteil) hängen von der **Antwortseite**, nicht vom Gesichtsfeld des Ziels ab → **biomechanische**, nicht interhemisphärische Erklärung; Effekte rechts größer. | n = 26 Rechtshänder | Carey, Hargreaves & Goodale, 1996 | 810 |
| F54 | Die Zeitkosten der Informationsübertragung zwischen den Hirnhälften (gekreuzt minus ungekreuzt, CUD) betragen bei Gesunden nur ≈ **4–6 ms** (ohne Balken ≈ 30–70 ms). | 4–6 ms | Schulte & Müller-Oehring, 2010 (Volltext PMC) | 810 („Balken-Training“ hat kaum Spielraum) |
| F55 | Lehrkräfte stimmten dem Neuromythos „Kurze Koordinationsübungen verbessern die Integration der linken und rechten Hirnhälfte“ zu 88 % (UK) bzw. 82 % (NL) zu. | n = 137 / 105 | Dekker et al., 2012 (Volltext) | 810 |
| F56 | Eine Prüfung der theoretischen Grundlagen und der begutachteten Studien zu Brain Gym® **stützt die Behauptungen der Anbieter nicht**. | – | Hyatt, 2007 | 810 |
| F57 | Wirksamkeitsforschung zu sensorischer Integrationstherapie ist „begrenzt und nicht schlüssig“; „Sensory Processing Disorder“ soll mangels anerkannter Kriterien in der Regel nicht diagnostiziert werden. | – | American Academy of Pediatrics (Zimmer et al.), 2012 | 810 |

### B7 Arbeitsgedächtnis, Muster, Transfer

| ID | Aussage | Zahl | Quelle | Übung(en) |
|---|---|---|---|---|
| F58 | Die „reine“ Kurzzeitgedächtnis-Kapazität liegt bei ≈ 4 Chunks (Spanne 3–5), wenn Chunking verhindert wird. | ≈ 4 | Cowan, 2001 | 811 |
| F59 | Nonverbales Kurzzeitgedächtnis hat trennbare **visuelle** (Muster, Visual Patterns Test) und **räumlich-sequenzielle** (Corsi) Anteile – doppelte Dissoziationen bei Patienten und Interferenzversuchen. | – | Della Sala et al., 1999 | 811 (gleichzeitig gezeigter Pfad = eher visuelles Muster + Reihenfolge) |
| F60 | Bei räumlichen Reihenfolgen beeinflussen **Pfadkreuzungen, Pfadlänge und Winkel** Genauigkeit und Antwortzeit; der Pfad wirkt als Übergangsinformation. | – | Parmentier, Elford & Maybery, 2005 | 811 (Schwierigkeit über Kreuzungen/Winkel steuern) |
| F61 | Visuelles Arbeitsgedächtnis erreicht mit ≈ 20 Jahren sein Maximum und nimmt dann linear ab – mit 55 schlechter als bei 8–9-Jährigen. | n = 55.753 (8–75 J.) | Brockmole & Logie, 2013 | 811 (Alter!) |
| F62 | Arbeitsgedächtnistraining verbessert kurzfristig verbale und visuell-räumliche Arbeitsgedächtnismaße (mittlerer Transfer), aber **nicht** Intelligenz, Lesen, Rechnen (ferner Transfer). | 87 Publikationen, 145 Vergleiche | Melby-Lervåg, Redick & Hulme, 2016 | 811 |
| F63 | Hirntraining verbessert zuverlässig die geübten Aufgaben, weniger eng verwandte, kaum entfernte oder Alltagsleistungen; viele Studien methodisch schwach. | – | Simons et al., 2016 | alle |

### B8 Sicherheit und Optik

| ID | Aussage | Zahl | Quelle | Übung(en) |
|---|---|---|---|---|
| F64 | Ein Blitz gilt als potenziell gefährlich bei Helligkeitswechsel ≥ 20 cd/m², **≥ 3 Hz** und Fläche ≥ 0,006 sr; **gesättigtes Rot** ist ein besonderes Risiko. | 3 Hz; 20 cd/m² | Harding et al., 2005 (Inhalt geprüft in docs/wissenschaft/03) | 806 (≈ 2-Hz-Puls, rote Flächen + Vollbild-Rotblitz), alle mit Rotblitz |
| F65 | Gleitsicht am Bildschirm (60 cm): klares horizontales Nahfeld nur **13–18°** (Einstärken 60°); längere Augenbewegungen, spätere Blickstabilisierung, mehr/längere Kopfbewegungen. | n = 11, 45–71 J. | Han, Ciuffreda, Selenow & Ali, 2003 | 806, 810 (Randzonen), alle (vorsicht: presbyopie_gleitsicht) |
| F66 | Rot-Grün-Farbsehschwäche: ≈ 8 % der Männer, ≈ 0,4 % der Frauen (Europa). | 8 % / 0,4 % | Birch, 2012 | 806 (Bernstein vs. Rot), 810/811 (Cyan/Magenta/Grün/Rot) |
| F67 | Stereosehen: Am normalen Bildschirm gibt es keine Querdisparation; Tiefenhinweise (Parabel, Größe) sind monokular. | – | Katalogregel README (stereosehen = 0) | alle |

**Anzahl Fakten: 67.**

---

## C) Evidenz-Zusammenfassung

### C1 Übergreifend (gilt für 806–811)

1. **Keine echte Körperübung.** Gleichgewicht, Sprungkraft, Beinarbeit, Ganzkörperkoordination werden
   **nicht** geübt und nicht gemessen (F01; Website 808/809 räumt das selbst ein). Aussagen zu Sturz,
   Gleichgewicht oder Sport-Fitness dürfen für die Originale **nicht** übernommen werden.
2. **Übungseffekt:** In der geübten Aufgabe wird man besser (allgemein gut belegt: F63; Übung flacht z. B.
   Hick-Steigungen ab: F16; Kokontraktion sinkt mit Übung: F24). Für die konkreten Spiele gibt es keine
   Studien → **mittel** (nicht „stark“).
3. **Naher Transfer:** auf ähnliche Maus-/Bildschirmaufgaben plausibel, aber ungeprüft → **schwach**
   (Ausnahme 811: Arbeitsgedächtnis-Aufgaben → **mittel**, F62).
4. **Alltagstransfer:** **fehlend** (F63). Die einzige Brücke „Bildschirmtraining → Mobilität“ ist ein
   kleiner Effekt kognitiven Trainings auf Gehen mit Zusatzaufgabe (F47) – andere Aufgaben, nicht diese
   Spiele.
5. **Wer wirklich Gleichgewicht/Sturzprävention üben will**, braucht Übungen im Stehen: Bewegungstraining
   senkt Stürze um ≈ 23 % (F43), Schritttraining um ≈ 50 % (F44), Exergames im Stehen verbessern
   Gleichgewicht (F46); WHO: Gleichgewicht + Kraft an ≥ 3 Tagen/Woche (F48). Das ist ein möglicher
   Hinweis in der Auswahlhilfe („weniger geeignet für: Gleichgewichtstraining – dafür echte Übungen“),
   **ohne** Heilversprechen.
6. **Normtabellen/Perzentile** ohne Datengrundlage (Website-Selbstaussage „collects no aggregate data“).
7. **Messgrenzen:** Browser-Timer ist nicht der Engpass; Bildrate (16,7 ms bei 60 Hz), Eingabekette und
   ≈ 18 ms Hardware (F04) sowie Touch-Überschätzung (F05) dominieren. Nur Vergleich mit sich selbst auf
   demselben Gerät.
8. **Alter:** einfache Reaktion +0,55 ms/Jahr, v. a. motorisch (F04); Maus-Schwierigkeiten bei Älteren (F08);
   visuelles Arbeitsgedächtnis sinkt ab ≈ 20 (F61).

### C2 Je Übung – Kernaussagen für die Autor:innen

| Nr. | Was die Übung tatsächlich fordert | Was belegt ist | Was nicht belegt / falsch ist | Evidenz-Vorschlag (Übung / nah / Alltag) |
|---|---|---|---|---|
| 806 | Warnzellen entdecken (Farbe/Helligkeit, groß, bis ≈ 10° exzentrisch), freie Zelle wählen, Zeiger dorthin (große Ziele) unter Zeitdruck 1,4 → 0,45 s | Covert Orienting (F15), parallele Merkmalsentdeckung (F13); kompatible Zuordnung → kaum Hick-Kosten (F16); Blick hilft Zielgenauigkeit (F11, F12) | „Ankerblick spart 80–120 ms / deckt 9 Zellen simultan“; sichere Zelle = Merkmalsabwesenheit → weniger effizient (F14); Normen; Spiel-Transfer | mittel / schwach / fehlend |
| 807 | Horizontales Wechselzielen auf abwärts scrollende Sprossen (Trefferzone 18 → 10 px, 150 → 750 px/s), Rhythmus, Abfangen | Chunking von Sequenzen (F29, F30); freie Abfangstrategie präziser (F26); Folgebewegung reicht für 15–20°/s (F17) | „Beinarbeit/Fußschnelligkeit“ (echtes Leitertraining ohne Effekt: F33); „Schmidt beweist relative Timing-Invarianz“ (F31); „Blickfolge bricht ab 550 px/s“ (F17) | mittel / schwach / fehlend |
| 808 | Kompensations-Tracking: Fadenkreuz gegen zufällige „Windkräfte“ im Ring (45 → 20 px) halten | Intermittierende visuo-manuelle Korrekturen ≈ 2/s, Totzone ≈ 0,8°, ≈ 170 ms (F22, F23); Korrekturlatenz ≈ 160 ms (F21); Kokontraktion ↑ bei kleinen Zielen (F24) | jeder Gleichgewichts-/Haltungsbezug (F40, F41 betreffen Ganzkörper); Recoil-Transfer; Tremor-Nutzen | mittel / schwach / fehlend |
| 809 | Timing einer Ladedauer + Abfangen bewegter Ziele (120 → 900 px/s, Radius 35 → 12 px) auf einer Wurfparabel mit Flugsteuerung | Interne Modelle/Vorhersage beim Abfangen (F38, F39); zeitliche Präzision bei freiem Abfangort (F26) | Sprungkraft/DVZ (F34, F35); Tau (F36, F37); „Kleinhirn-Training“ | mittel / schwach / fehlend |
| 810 | Zeiger von Rand zu Rand durch engen Korridor (10 → 4 px) ziehen, kleine Endknoten (16 → 8 px) treffen – **einhändig** | Steering Law (F25); Blick zum Ziel (F11, F12); leichte Kosten kontralateraler **Arm**bewegungen (F52) – aber biomechanisch (F53) | „Balken-/Hemisphärentraining“ (F53, F54), Ayres/SI-Übertragung (F57), Brain-Gym-Logik (F55, F56); „bilateral“; Hand kreuzt die Körpermitte meist gar nicht | mittel / schwach / fehlend; Hemisphären-Versprechen: **ohne Beleg** |
| 811 | Pfad mit 3 → 8 Wegpunkten 2,0 → 0,6 s einprägen, danach aus dem Gedächtnis in richtiger Reihenfolge nachziehen | Kapazität ≈ 4 Chunks (F58); visuelle vs. sequenzielle Anteile (F59); Kreuzungen/Winkel erschweren (F60); Altersabfall (F61); naher WM-Transfer (F62) | TMS/MedAT-Nutzen, Recoil-Transfer, „Netzhaut-Nachwirkung“, „neuroplastisch gezwungen“ | mittel–stark / mittel / fehlend |

### C3 Überkreuzbewegungen / „Brain Gym“ – kritische Einordnung (für 810, auch für 801–805 nützlich)

- Die Vorstellung, Überkreuzbewegungen „verbinden die Gehirnhälften“ oder „aktivieren den Balken“, ist ein
  verbreiteter **Neuromythos** (F55) und durch Studien zu Brain Gym® nicht gestützt (F56).
- Die gemessenen Zeitkosten der Übertragung zwischen den Hirnhälften sind winzig (≈ 4–6 ms; F54); sie
  entstehen bei **jeder** visuell geführten Handlung und sind kein trainierbarer Engpass im Alltag.
- Kontralaterale Armbewegungen sind etwas langsamer/ungenauer (F52), aber aus **biomechanischen**
  Gründen (F53) – die Website-eigene Quelle widerspricht der Balken-These.
- Sensorische Integrationstherapie (Ayres) hat eine begrenzte, uneinheitliche Evidenz, und zwar bei Kindern
  mit Entwicklungsstörungen, nicht bei Erwachsenen am Bildschirm (F57).
- Formulierungsvorschlag: „Übt präzises, weites Ziehen des Zeigers über den ganzen Bildschirm. Aussagen
  über Hirnhälften oder den Balken sind wissenschaftlich nicht gedeckt.“

### C4 Sicherheit / `vorsicht_bei` (Auswahlhinweise, keine medizinische Aussage)

| Schlüssel | Übung(en) | Begründung |
|---|---|---|
| `photosensitive_epilepsie`, `migraene_lichtempfindlich` | 806 (stark), 807–811 (gering) | 806: großflächiger Bernsteinpuls ≈ 2 Hz auf bis zu 7/9 der Fläche, rote Explosionsflächen, roter Vollbild-Blitz, Bildschirm-Wackeln; unter 3 Hz, aber Rot + große Fläche (F64). Andere: roter/grüner Rückmelde-Blitz. |
| `tremor_parkinson` | 808, 810 (stark), 809, 811 (mittel) | Halte-/Präzisionsaufgaben mit 4–20-px-Toleranzen; ET 4,6 % ab 65 (F28); kein Nutzenbeleg. |
| `hand_arm_beschwerden` | alle (Maus, 45 s schnelle Züge) | F09; Website-Tipps „explosive Flicks“, „Handballen als Bremse aufdrücken“. |
| `presbyopie_gleitsicht` | 806, 810 (Ziele in den Bildschirmecken), alle | Klares Zwischenfeld der Gleitsicht nur 13–18° (F65) → Kopfbewegungen nötig; Arbeitsplatzbrille/Bildschirmbrille erwägen (Optiker-Hinweis, keine Diagnose). |
| `farbsehschwaeche` | 806 (gering: Bernstein vs. dunkel ist auch Helligkeit), 810/811 (prüfen: Cyan vs. Magenta, Grün/Rot-Rückmeldung) | F66; nie nur Farbe. |
| `kognitive_einschraenkung` | 811 | Gedächtnislast, Altersabfall F61. |
| `aufmerksamkeitsprobleme` | 806 | hoher Zeitdruck. |
| `sturzgefahr`, `herz_kreislauf`, `gelenk_ruecken` | **nicht** für die Maus-Originale; **nur** falls Blickfit echte Stand-/Schritt-/Sprungvarianten baut | dann: Stuhl/Wand als Halt, rutschfester Boden; Mehrstärkenbrille beim Treten/Springen ungünstig (F49–F51). |

### C5 Optiker-Bezug (kurz)

- Bildschirmabstand 50–70 cm = **Zwischenbereich**: bei Gleitsicht schmal (F65); bei Alterssichtigkeit
  ohne passende Korrektur werden kleine Ziele (4–12 px ≈ 5–20′) unscharf.
- Weite Diagonalen (810) und Eckzellen (806) liegen außerhalb der klaren Gleitsicht-Zone → Kopf mitdrehen.
- Für echte Bewegungsübungen: Mehrstärkenbrillen erhöhen Sturz-/Stolperrisiko (F49); Einstärken-Fernbrille
  hilft nur draußen Aktiven (F50); Brillenwechsel bei Gebrechlichen kann Stürze zunächst erhöhen (F51) –
  Hinweis, keine Beratung.

---

## D) Literaturliste (nur geprüfte Einträge)

Prüfvermerke: **CR ✓** = Crossref-Metadaten stimmen · **Abs** = Abstract (PubMed) gelesen · **VT** =
Volltext gelesen · **Sek** = Inhalt nur über Sekundärquelle · **Meta** = nur Metadaten, Inhalt
Standardwissen.

### D1 Von der Website angegeben (17)

1. Ayres, A. J. (1972). *Sensory integration and learning disorders*. Western Psychological Services. ISBN 0-87424-303-3 – **Buch, keine DOI** (Open Library geprüft); Inhalt nicht eingesehen.
2. Baddeley, A. D., & Hitch, G. (1974). Working memory. In G. H. Bower (Hrsg.), *Psychology of Learning and Motivation* (Bd. 8, S. 47–89). Academic Press. https://doi.org/10.1016/S0079-7421(08)60452-1 – CR ✓ (Buchkapitel), Meta.
3. Carey, D. P., Hargreaves, E. L., & Goodale, M. A. (1996). Reaching to ipsilateral or contralateral targets: Within-hemisphere visuomotor processing cannot explain hemispatial differences in motor control. *Experimental Brain Research, 112*(3), 496–504. https://doi.org/10.1007/BF00227955 – CR ✓, Abs; **Website-Angabe falsch** (DOI 10.1007/BF00228557 = Desmurget et al., 1996; Band 110(2), S. 267–286 und Untertitel falsch).
4. Černáček, J. (1961). Contralateral motor irradiation—cerebral dominance: Its changes in hemiparesis. *Archives of Neurology, 4*(2), 165–172. https://doi.org/10.1001/archneur.1961.00450080047005 – CR ✓, PubMed 13691977 (kein Abstract), Meta.
5. Cowan, N. (2001). The magical number 4 in short-term memory: A reconsideration of mental storage capacity. *Behavioral and Brain Sciences, 24*(1), 87–114. https://doi.org/10.1017/S0140525X01003922 – CR ✓, Abs.
6. Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – CR ✓, Meta.
7. Kawato, M. (1999). Internal models for motor control and trajectory planning. *Current Opinion in Neurobiology, 9*(6), 718–727. https://doi.org/10.1016/S0959-4388(99)00028-8 – CR ✓, Abs.
8. Komi, P. V. (2000). Stretch-shortening cycle: A powerful model to study normal and fatigued muscle. *Journal of Biomechanics, 33*(10), 1197–1206. https://doi.org/10.1016/S0021-9290(00)00064-6 – CR ✓, Abs.
9. Lashley, K. S. (1951). The problem of serial order in behavior. In L. A. Jeffress (Hrsg.), *Cerebral mechanisms in behavior: The Hixon Symposium* (S. 112–131). Wiley. – **Buchkapitel, keine DOI**; **Website-DOI 10.1037/11147-006 existiert nicht**; Seiten laut Rosenbaum et al. (2007); Inhalt Sek.
10. Lee, D. N. (1976). A theory of visual control of braking based on information about time-to-collision. *Perception, 5*(4), 437–459. https://doi.org/10.1068/p050437 – CR ✓, Abs.
11. Nashner, L. M., & McCollum, G. (1985). The organization of human postural movements: A formal basis and experimental synthesis. *Behavioral and Brain Sciences, 8*(1), 135–150. https://doi.org/10.1017/S0140525X00020008 – CR ✓, Abs (Crossref); **Website-DOI 10.1017/S0140525X00019864 existiert nicht**.
12. Posner, M. I. (1980). Orienting of attention. *Quarterly Journal of Experimental Psychology, 32*(1), 3–25. https://doi.org/10.1080/00335558008248231 – CR ✓, Meta.
13. Schmidt, R. A. (1975). A schema theory of discrete motor skill learning. *Psychological Review, 82*(4), 225–260. https://doi.org/10.1037/h0076770 – CR ✓, Meta.
14. Treisman, A. M., & Gelade, G. (1980). A feature-integration theory of attention. *Cognitive Psychology, 12*(1), 97–136. https://doi.org/10.1016/0010-0285(80)90005-5 – CR ✓, Meta (vgl. docs/wissenschaft/03).
15. Winter, D. A. (1995). Human balance and posture control during standing and walking. *Gait & Posture, 3*(4), 193–214. https://doi.org/10.1016/0966-6362(96)82849-9 – CR ✓, Meta.
16. Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – CR ✓, Abs.
17. Woodworth, R. S. (1899). The accuracy of voluntary movement. *The Psychological Review: Monograph Supplements, 3*(3), i–114. https://doi.org/10.1037/h0092992 – CR ✓, Inhalt über Elliott et al. (2001) (Sek).

### D2 Weitere Fachliteratur (52)

1. Abrams, R. A., Meyer, D. E., & Kornblum, S. (1990). Eye-hand coordination: Oculomotor control in rapid aimed limb movements. *Journal of Experimental Psychology: Human Perception and Performance, 16*(2), 248–267. https://doi.org/10.1037/0096-1523.16.2.248 – CR ✓, Abs.
2. Accot, J., & Zhai, S. (1997). Beyond Fitts' law: Models for trajectory-based HCI tasks. In *Proceedings of CHI '97* (S. 295–302). ACM. https://doi.org/10.1145/258549.258760 – CR ✓, VT (Autoren-PDF).
3. American Academy of Pediatrics, Section on Complementary and Integrative Medicine & Council on Children with Disabilities (Zimmer, M., Desch, L., et al.). (2012). Sensory integration therapies for children with developmental and behavioral disorders. *Pediatrics, 129*(6), 1186–1189. https://doi.org/10.1542/peds.2012-0876 – CR ✓, Abs.
4. Beek, P. J. (1992). Inadequacies of the proportional duration model: Perspectives from a dynamical analysis of juggling. *Human Movement Science, 11*(1–2), 227–237. https://doi.org/10.1016/0167-9457(92)90063-H – CR ✓, VT (S. 227–228; enthält Bewertung von Gentner, 1987).
5. Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – CR ✓ (Inhalt geprüft in docs/wissenschaft/01).
6. Bobbert, M. F., Gerritsen, K. G. M., Litjens, M. C. A., & Van Soest, A. J. (1996). Why is countermovement jump height greater than squat jump height? *Medicine & Science in Sports & Exercise, 28*(11), 1402–1412. https://doi.org/10.1097/00005768-199611000-00009 – CR ✓, Abs.
7. Brenner, E., & Smeets, J. B. J. (2015). How people achieve their amazing temporal precision in interception. *Journal of Vision, 15*(3), 8. https://doi.org/10.1167/15.3.8 – CR ✓, Abs.
8. Brockmole, J. R., & Logie, R. H. (2013). Age-related change in visual working memory: A study of 55,753 participants aged 8–75. *Frontiers in Psychology, 4*, 12. https://doi.org/10.3389/fpsyg.2013.00012 – CR ✓, Abs.
9. Bull, F. C., Al-Ansari, S. S., Biddle, S., Borodulin, K., Buman, M. P., Cardon, G., et al. (2020). World Health Organization 2020 guidelines on physical activity and sedentary behaviour. *British Journal of Sports Medicine, 54*(24), 1451–1462. https://doi.org/10.1136/bjsports-2020-102955 – CR ✓, Abs + VT (PMC7719906, Empfehlung Ältere).
10. Casiez, G., Vogel, D., Balakrishnan, R., & Cockburn, A. (2008). The impact of control-display gain on user performance in pointing tasks. *Human–Computer Interaction, 23*(3), 215–250. https://doi.org/10.1080/07370020802278163 – CR ✓, VT (Abstract im Autoren-PDF).
11. Cumming, R. G., Ivers, R., Clemson, L., Cullen, J., Hayes, M. F., Tanzer, M., & Mitchell, P. (2007). Improving vision to prevent falls in frail older people: A randomized trial. *Journal of the American Geriatrics Society, 55*(2), 175–181. https://doi.org/10.1111/j.1532-5415.2007.01046.x – CR ✓, Abs.
12. Dekker, S., Lee, N. C., Howard-Jones, P., & Jolles, J. (2012). Neuromyths in education: Prevalence and predictors of misconceptions among teachers. *Frontiers in Psychology, 3*, 429. https://doi.org/10.3389/fpsyg.2012.00429 – CR ✓, VT (Tabelle 1).
13. Della Sala, S., Gray, C., Baddeley, A., Allamano, N., & Wilson, L. (1999). Pattern span: A tool for unwelding visuo-spatial memory. *Neuropsychologia, 37*(10), 1189–1199. https://doi.org/10.1016/S0028-3932(98)00159-6 – CR ✓, Abs.
14. Elliott, D., Helsen, W. F., & Chua, R. (2001). A century later: Woodworth's (1899) two-component model of goal-directed aiming. *Psychological Bulletin, 127*(3), 342–357. https://doi.org/10.1037/0033-2909.127.3.342 – CR ✓, Abs.
15. Fischer, B., & Ramsperger, E. (1984). Human express saccades: Extremely short reaction times of goal directed eye movements. *Experimental Brain Research, 57*(1), 191–195. https://doi.org/10.1007/BF00231145 – CR ✓, Abs.
16. Fisk, J. D., & Goodale, M. A. (1985). The organization of eye and limb movements during unrestricted reaching to targets in contralateral and ipsilateral visual space. *Experimental Brain Research, 60*(1), 159–178. https://doi.org/10.1007/BF00237028 – CR ✓, Abs.
17. Gribble, P. L., Mullin, L. I., Cothros, N., & Mattar, A. (2003). Role of cocontraction in arm movement accuracy. *Journal of Neurophysiology, 89*(5), 2396–2405. https://doi.org/10.1152/jn.01020.2002 – CR (PubMed-DOI) ✓, Abs.
18. Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – CR ✓, Abs.
19. Haran, M. J., Cameron, I. D., Ivers, R. Q., Simpson, J. M., Lee, B. B., Tanzer, M., et al. (2010). Effect on falls of providing single lens distance vision glasses to multifocal glasses wearers: VISIBLE randomised controlled trial. *BMJ, 340*, c2265. https://doi.org/10.1136/bmj.c2265 – CR ✓, Abs.
20. Harding, G., Wilkins, A. J., Erba, G., Barkley, G. L., & Fisher, R. S. (2005). Photic- and pattern-induced seizures: Expert consensus of the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1423–1425. https://doi.org/10.1111/j.1528-1167.2005.31305.x – CR ✓ (Inhalt geprüft in docs/wissenschaft/03).
21. Horak, F. B., & Nashner, L. M. (1986). Central programming of postural movements: Adaptation to altered support-surface configurations. *Journal of Neurophysiology, 55*(6), 1369–1381. https://doi.org/10.1152/jn.1986.55.6.1369 – CR ✓, Abs.
22. Hyatt, K. J. (2007). Brain Gym®: Building stronger brains or wishful thinking? *Remedial and Special Education, 28*(2), 117–124. https://doi.org/10.1177/07419325070280020201 – CR ✓ (Crossref-Titel „Brain Gym®“), Abs (Crossref).
23. IJmker, S., Huysmans, M. A., Blatter, B. M., van der Beek, A. J., van Mechelen, W., & Bongers, P. M. (2007). Should office workers spend fewer hours at their computer? A systematic review of the literature. *Occupational and Environmental Medicine, 64*(4), 211–222. https://doi.org/10.1136/oem.2006.026468 – CR ✓, Abs.
24. Lord, S. R., Dayhew, J., & Howland, A. (2002). Multifocal glasses impair edge-contrast sensitivity and depth perception and increase the risk of falls in older people. *Journal of the American Geriatrics Society, 50*(11), 1760–1766. https://doi.org/10.1046/j.1532-5415.2002.50502.x – CR ✓, Abs.
25. Loram, I. D., Gollee, H., Lakie, M., & Gawthrop, P. J. (2011). Human control of an inverted pendulum: Is continuous control necessary? Is intermittent control effective? Is intermittent control physiological? *The Journal of Physiology, 589*(2), 307–324. https://doi.org/10.1113/jphysiol.2010.194712 – CR ✓, Abs.
26. Louis, E. D., & Ferreira, J. J. (2010). How common is the most common adult movement disorder? Update on the worldwide prevalence of essential tremor. *Movement Disorders, 25*(5), 534–541. https://doi.org/10.1002/mds.22838 – CR ✓, Abs.
27. Marusic, U., Verghese, J., & Mahoney, J. R. (2018). Cognitive-based interventions to improve mobility: A systematic review and meta-analysis. *Journal of the American Medical Directors Association, 19*(6), 484–491.e3. https://doi.org/10.1016/j.jamda.2018.02.002 – CR ✓, Abs.
28. McAuley, J. H., & Marsden, C. D. (2000). Physiological and pathological tremors and rhythmic central motor control. *Brain, 123*(8), 1545–1567. https://doi.org/10.1093/brain/123.8.1545 – CR ✓, Abs.
29. Melby-Lervåg, M., Redick, T. S., & Hulme, C. (2016). Working memory training does not improve performance on measures of intelligence or other measures of "far transfer": Evidence from a meta-analytic review. *Perspectives on Psychological Science, 11*(4), 512–534. https://doi.org/10.1177/1745691616635612 – CR ✓, Abs.
30. Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – CR ✓ (Inhalt geprüft in docs/wissenschaft/02).
31. Miall, R. C., Weir, D. J., & Stein, J. F. (1993). Intermittency in human manual tracking tasks. *Journal of Motor Behavior, 25*(1), 53–63. https://doi.org/10.1080/00222895.1993.9941639 – CR ✓, Abs.
32. Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. *Journal of Neurophysiology, 83*(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639 – CR ✓, Abs.
33. Okubo, Y., Schoene, D., & Lord, S. R. (2017). Step training improves reaction time, gait and balance and reduces falls in older people: A systematic review and meta-analysis. *British Journal of Sports Medicine, 51*(7), 586–593. https://doi.org/10.1136/bjsports-2015-095452 – CR ✓, Abs.
34. Pacheco, T. B. F., de Medeiros, C. S. P., de Oliveira, V. H. B., Vieira, E. R., & de Cavalcanti, F. A. C. (2020). Effectiveness of exergames for improving mobility and balance in older adults: A systematic review and meta-analysis. *Systematic Reviews, 9*(1), 163. https://doi.org/10.1186/s13643-020-01421-7 – CR ✓, Abs.
35. Padrón-Cabo, A., Rey, E., Kalén, A., & Costa, P. B. (2020). Effects of training with an agility ladder on sprint, agility, and dribbling performance in youth soccer players. *Journal of Human Kinetics, 73*, 219–228. https://doi.org/10.2478/hukin-2019-0146 – CR ✓, Abs.
36. Parmentier, F. B. R., Elford, G., & Maybery, M. (2005). Transitional information in spatial serial memory: Path characteristics affect recall performance. *Journal of Experimental Psychology: Learning, Memory, and Cognition, 31*(3), 412–427. https://doi.org/10.1037/0278-7393.31.3.412 – CR ✓, Abs.
37. Proctor, R. W., & Schneider, D. W. (2018). Hick's law for choice reaction time: A review. *Quarterly Journal of Experimental Psychology, 71*(6), 1281–1299. https://doi.org/10.1080/17470218.2017.1322622 – CR ✓ (Inhalt geprüft in docs/wissenschaft/04).
38. Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – CR ✓, Abs (Zahl 58–70 ms aus docs/wissenschaft/03).
39. Rosenbaum, D. A., Cohen, R. G., Jax, S. A., Weiss, D. J., & van der Wel, R. (2007). The problem of serial order in behavior: Lashley's legacy. *Human Movement Science, 26*(4), 525–554. https://doi.org/10.1016/j.humov.2007.04.001 – CR ✓, Abs + VT (Einleitung, Literaturangabe Lashley).
40. Sakai, K., Kitaguchi, K., & Hikosaka, O. (2003). Chunking during human visuomotor sequence learning. *Experimental Brain Research, 152*(2), 229–242. https://doi.org/10.1007/s00221-003-1548-8 – CR ✓, Abs.
41. Saunders, J. A., & Knill, D. C. (2003). Humans use continuous visual feedback from the hand to control fast reaching movements. *Experimental Brain Research, 152*(3), 341–352. https://doi.org/10.1007/s00221-003-1525-2 – CR ✓, Abs.
42. Schulte, T., & Müller-Oehring, E. M. (2010). Contribution of callosal connections to the interhemispheric integration of visuomotor and cognitive processes. *Neuropsychology Review, 20*(2), 174–190. https://doi.org/10.1007/s11065-010-9130-1 – CR ✓, VT (PMC3442602, CUD-Werte).
43. Sheppard, J. M., & Young, W. B. (2006). Agility literature review: Classifications, training and testing. *Journal of Sports Sciences, 24*(9), 919–932. https://doi.org/10.1080/02640410500457109 – CR ✓, Abs.
44. Sherrington, C., Fairhall, N. J., Wallbank, G. K., Tiedemann, A., Michaleff, Z. A., Howard, K., Clemson, L., Hopewell, S., & Lamb, S. E. (2019). Exercise for preventing falls in older people living in the community. *Cochrane Database of Systematic Reviews, 2019*(1), CD012424. https://doi.org/10.1002/14651858.CD012424.pub2 – CR ✓, Abs.
45. Shigematsu, R., Okura, T., Nakagaichi, M., Tanaka, K., Sakai, T., Kitazumi, S., & Rantanen, T. (2008). Square-stepping exercise and fall risk factors in older adults: A single-blind, randomized controlled trial. *The Journals of Gerontology: Series A, 63*(1), 76–82. https://doi.org/10.1093/gerona/63.1.76 – CR ✓, Abs.
46. Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – CR ✓, Abs.
47. Smith, M. W., Sharit, J., & Czaja, S. J. (1999). Aging, motor control, and the performance of computer mouse tasks. *Human Factors, 41*(3), 389–396. https://doi.org/10.1518/001872099779611102 – CR ✓, Abs.
48. Treisman, A., & Souther, J. (1985). Search asymmetry: A diagnostic for preattentive processing of separable features. *Journal of Experimental Psychology: General, 114*(3), 285–310. https://doi.org/10.1037/0096-3445.114.3.285 – CR ✓ (Inhalt geprüft in docs/wissenschaft/03).
49. Tresilian, J. R. (1999). Visually timed action: Time-out for 'tau'? *Trends in Cognitive Sciences, 3*(8), 301–310. https://doi.org/10.1016/S1364-6613(99)01352-2 – CR ✓, Abs.
50. World Health Organization. (2021, 26. April). *Falls* [Fact Sheet]. https://www.who.int/news-room/fact-sheets/detail/falls – **keine DOI**, Webseite abgerufen 29.09.2026.
51. Zago, M., McIntyre, J., Senot, P., & Lacquaniti, F. (2009). Visuo-motor coordination and internal models for object interception. *Experimental Brain Research, 192*(4), 571–604. https://doi.org/10.1007/s00221-008-1691-3 – CR ✓, Abs.
52. Zelaznik, H. N., Hawkins, B., & Kisselburgh, L. (1983). Rapid visual feedback processing in single-aiming movements. *Journal of Motor Behavior, 15*(3), 217–236. https://doi.org/10.1080/00222895.1983.10735298 – CR ✓, Abs (enthält Befund von Keele & Posner, 1968, https://doi.org/10.1037/h0025754, CR ✓).

### D3 Geprüft, aber bewusst nicht aufgenommen / unsicher

- **Woodworth (1899) „≈ 450 ms“** für die Nutzung visueller Rückmeldung: nur Sekundärangabe (Suchtreffer zu
  Elliott et al., 2001), Original nicht eingesehen → **nicht als Zahl verwenden**.
- **Tsubota & Nakamori (1993)**, *NEJM* 328(8), 584, https://doi.org/10.1056/NEJM199302253280817 (CR ✓):
  Lidschlag 22 ± 9/min entspannt vs. 7 ± 7/min am Bildschirm – Werte nur über Sekundärzitate, Brief ohne
  Abstract; bei Bedarf als „laut Sekundärquellen“ kennzeichnen.
- **MacKenzie, Sellen & Buxton (1991)**, CHI '91, https://doi.org/10.1145/108844.108868 (CR ✓): Ziehen
  langsamer/fehleranfälliger als Zeigen – Volltext nicht abrufbar, nur Sekundärangabe.
- **McIntyre et al. (2001)**, *Nat Neurosci* 4(7), 693–694, https://doi.org/10.1038/89477 (CR ✓): Astronauten
  starteten Fangbewegungen in 0 g früher (internes Schwerkraftmodell) – nur Sekundärangabe.
- **Gentner (1987)**, *Psychol Rev* 94(2), 255–276, https://doi.org/10.1037/0033-295X.94.2.255 (CR ✓):
  Inhalt nur über Beek (1992).
