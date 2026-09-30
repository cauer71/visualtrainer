# Literaturbasis W07-fps-b – Zielen in Ego-Shootern (Katalognummern 509–515)

Stand: 29.09.2026 · Gruppe W07-fps-b · Übungen: **509** Mikrokorrektur & Headshots (`micro-correction-precision`) ·
**510** Zielauswahl & Bedrohung (`target-prioritization`) · **511** Crosshair Placement / Winkel halten
(`angle-hold-trainer`) · **512** Reaktives Tracking & ADAD (`anti-strafe-jitter-duel`) · **513** Zickzack-Tracking
(`anti-zigzag-movement-trainer`) · **514** Smooth-Tracking (`pro-smooth-pursuit`) · **515** Vertikales Tracking
(`vertical-air-track`).

**Zweck:** Gemeinsame, geprüfte Faktenbasis für die Autor:innen der Katalogeinträge 509–515. Keine
Katalogdatei, kein Code. Alle Aussagen sind Trainings-/Produktinformation, keine medizinische Aussage.

**Prüfmethode und Prüfvermerke (in Teil D bei jeder Quelle):**

| Kürzel | Bedeutung |
|---|---|
| **CR** | Bibliografie (Titel, Autor:innen, Jahr, Zeitschrift, Band, Seiten) über `api.crossref.org/works/<DOI>` geprüft (29.09.2026) |
| **AB** | Abstract gelesen (PubMed E-Utilities, OpenAlex oder Semantic Scholar); die zitierten Zahlen stehen im Abstract |
| **VT** | zusätzlich Volltextstelle geprüft (PMC bzw. Autor:innen-PDF) |
| **SEK** | Inhalt nur über Sekundärquelle/Übersicht oder Websuche bestätigt, Original nicht eingesehen |
| **REPO** | bereits in `docs/wissenschaft/0x` geprüft; DOI heute erneut über Crossref bestätigt |
| **WEB** | Web-Dokumentation (MDN), abgerufen am 29.09.2026 |
| **EIG** | eigene Rechnung oder eigene Code-Beobachtung (keine Literatur) |

Zahlen stammen aus Abstracts bzw. geprüften Volltextstellen. Was nicht prüfbar war, ist markiert.

---

## 0. Das Wichtigste in Kürze

1. **Bibliografie der Website meist korrekt, Inhalt oft nicht passend.** 15 verschiedene Quellen stehen in den
   Quellenlisten (36 Nennungen über die 7 Seiten). **1 DOI ist falsch** (Land & McLeod, 2000: angegeben
   `10.1038/81861` → 404; richtig `10.1038/81887`, betrifft 514 und 515), **1 Titel ist falsch** (Rashbass, 1961:
   „…smooth *tracking* eye movements“, nicht „smooth pursuit“; betrifft 512–515). Die übrigen 13 sind
   bibliografisch korrekt.
2. **Viele Aussagen werden Quellen zugeschrieben, die sie nicht enthalten**, z. B. „Smooth Pursuit genau bis
   ~30°/s“ (Krauzlis, 2004), „Blick 2–5 Pixel vor die Zielkante“ (Land & McLeod, 2000), „Sakkaden lähmen die
   Verarbeitung 20–50 ms“ (Rashbass, 1961), „vertikale Pursuit über Kleinhirnwurm“ (Krauzlis, 2004). Krauzlis
   (2004) vertritt sogar das **Gegenteil** der Website-Behauptung, Pursuit und Sakkaden seien „anatomisch wie
   funktional getrennt“.
3. **Alle „Tier“-/Benchmark-Tabellen (Profi/Radiant/Elite …) haben keine Datengrundlage.** Keine der
   angegebenen Quellen enthält solche Werte; die Aussage der Website „Every figure quoted on this page comes
   from the published work listed above“ ist damit irreführend.
4. **Technik-Aussagen teils falsch:** Die Vorlage ruft `requestPointerLock()` **ohne** `unadjustedMovement` auf
   (EIG, Code-Prüfung aller 7 Übungen). Rohdaten ohne Betriebssystem-Mausbeschleunigung gibt es nur mit dieser
   Option (MDN). Die Behauptung „1:1-Hardwareübertragung ohne Mausbeschleunigung“ ist damit nicht gedeckt.
5. **Transfer:** Für Aim-Trainer gibt es Übungseffekte in der Aufgabe (große Aim-Lab-Datensätze, gute
   Messzuverlässigkeit), aber **keine kontrollierte Studie**, die Transfer vom Aim-Trainer auf Spielleistung oder
   Alltag belegt (Suche PubMed/Crossref/arXiv, 29.09.2026). Actionspiele selbst zeigen kleine kausale Effekte
   auf kognitive Tests (g = 0,30) und visuomotorische Steuerung – das ist nicht dasselbe wie ein 45-s-Browserdrill.
6. **Tablet:** Alle 7 Übungen sind für Maus mit Pointer Lock gebaut; der Code erkennt reine Touch-Geräte (EIG).
   Ohne Umbau nicht tablettauglich.

---

## A) Prüftabelle der Website-Quellen je Übung

Legende „stützt Aussage“: **ja** / **teilweise** / **nein**. „DOI-Prüfung“ bezieht sich auf die Angabe in der
Quellenliste der jeweiligen Seite.

### 509 – Mikrokorrektur & Headshot-Präzision

| # | Angabe der Website | DOI-Prüfung | stützt Aussage? – Begründung |
|---|---|---|---|
| 1 | Woods et al. (2015), *Front Hum Neurosci* 9, 131 – zitiert für performance.now()-Chronometrie, Bildwiederholraten (16,7/6,9/4,1 ms) und die Definition der Korrekturzeit | korrekt | **teilweise.** Woods misst einfache Reaktionszeit mit kalibrierter Laborsoftware (Monitorverzögerung 11,0 ms, Gaming-Maus 6,8 ms) – nicht im Browser. Die Hz-Werte sind richtige Physik (1000/Hz; 240 Hz = 4,17 ms, nicht 4,1), stehen aber nicht als Aussage bei Woods. Korrekturzeit und Tier-Tabelle stammen nicht aus Woods. |
| 2 | Fitts (1954), *J Exp Psychol* 47(6), 381–391 – „MT skaliert logarithmisch mit der Distanz und umgekehrt proportional zur Zielbreite, ID = log2(2D/W)“ | korrekt | **ja, mit Unschärfe.** Die Formel stimmt. „Umgekehrt proportional zur Zielbreite“ ist falsch formuliert: Die Bewegungszeit steigt linear mit dem Logarithmus des Verhältnisses 2D/W (MacKenzie, 2018). |
| 3 | Meyer et al. (1988), *Psychol Rev* 95(3), 340–370 – „Primärbewegung landet strategisch kurz vor oder am Rand; Mikrokorrektur entscheidet mathematisch belegt über den Treffer“ | korrekt | **teilweise.** Belegt: Primär- plus optionale Korrekturbewegung; Planung minimiert die mittlere Bewegungszeit bei hoher Trefferquote; die Streuung der Primärbewegung wächst linear mit ihrer Geschwindigkeit. Nicht belegt: gezieltes Landen „kurz vor dem Rand“ und „die Mikrokorrektur entscheidet“. |
| 4 | Martinez-Conde, Macknik & Hubel (2004), *Nat Rev Neurosci* 5, 229–240 – Mikrosakkaden < 1°, „frischen Signale auf, zentrieren auf Trefferflächen“ | korrekt | **teilweise.** Mikrosakkaden wirken dem Verblassen des Bildes bei Fixation entgegen (SEK). Das gezielte Verlagern des Blicks auf feine Details zeigt eher Ko et al. (2010). Einen Bezug zu Mausklicks oder „Overflick-Drift“ gibt es nicht. |
| 5 | Rolfs (2009), *Vision Res* 49(20), 2415–2441 – zusätzlich für „Target Confirmation, mikrosekundenschnelle visuelle Verifizierung“ | korrekt | **teilweise/nein.** Der Review zu Mikrosakkaden-Funktionen (Fixationskontrolle, gegen Verblassen, Sehschärfe, Abtasten kleiner Regionen) ist korrekt zitiert. „Mikrosekundenschnell“ ist physiologisch falsch: Schon das bloße Entdecken eines Reizes dauert ≈ 131 ms (Woods et al., 2015). |
| 6 | Woodworth (1899), *Psychol Rev Monogr Suppl* 3(3), i–114 – Zwei-Komponenten-Modell | korrekt (Titel ohne „The“) | **ja.** Anfangsimpuls plus rückmeldungsgestützte Endsteuerung; bis heute Grundlage, heute als „zwei Komponenten, mehrere Prozesse“ verstanden (Elliott et al., 2010). |

**Weitere Website-Aussagen (ohne passende Quelle), Einordnung:**
- „Visuelles Feedback braucht 120–160 ms“: Größenordnung plausibel. Die Hand reagiert ≈ 110 ms auf einen
  Zielsprung (Brenner & Smeets, 1997). Die Website gibt dafür keine Quelle an.
- Tier-Tabelle (< 140 ms, 95–99 % …): **keine Datengrundlage.**
- „USB-Polling addiert ~8 ms bei 125 Hz“: 8 ms ist das *Intervall*. Die zusätzliche Wartezeit liegt im Mittel
  bei ≈ 4 ms, höchstens bei 8 ms (EIG).
- „Browser-Timer auf ~1 ms gerundet“: Das gilt nur teilweise. `performance.now()` ist auf 100 µs vergröbert, in
  isolierten Kontexten auf 5 µs (MDN). Nur `event.timeStamp` wird je nach Browser bis 1 ms gerundet (Dokument 01).
- „Raw-Pointer-Lock eliminiert Endphasen-Oszillationen“: **nein.** Es gibt keine Rohdaten-Option (siehe 0.4), und
  Oszillationen sind motorisch bedingt.
- „15–20 min täglich genügen“: unbelegt. Aim-Lab-Daten zeigen ≈ 90 % des Tagesnutzens bei 30 min/Tag
  (Listman et al., 2021; Hersteller-Interessenkonflikt).

### 510 – Zielauswahl & Bedrohungspriorität

| # | Angabe der Website | DOI-Prüfung | stützt Aussage? – Begründung |
|---|---|---|---|
| 1 | Woods et al. (2015) – für „Entscheidungslatenz“ und Prioritätsgenauigkeit | korrekt | **nein** für die Entscheidungs-Tabelle: Woods misst *einfache* Reaktion, keine Wahl- oder Go/No-Go-Reaktion. **teilweise** für den allgemeinen Messhinweis. |
| 2 | Posner & Petersen (1990), *Annu Rev Neurosci* 13, 25–42 – „Top-down-Filter schwächen periphere Bewegungen ab und lenken foveale Ressourcen auf die gefährlichste Achse“ | korrekt | **teilweise.** Belegt: Modell eigenständiger Aufmerksamkeitsnetzwerke (Alerting, Orienting, exekutive Kontrolle) (SEK). Die konkrete Aussage zur Bedrohungsachse steht dort nicht. |
| 3 | Green & Bavelier (2003), *Nature* 423, 534–537 | korrekt | **teilweise.** Actionspieler zeigen bessere selektive visuelle Aufmerksamkeit, ein kleines Training verbesserte Nichtspieler. Die Replikation ist umstritten (Boot et al., 2008); die Metaanalyse findet kausal g = 0,30 (Bediou et al., 2023). Das ist kein Beleg für diesen Browserdrill. |
| 4 | Donders (1868; übers. 1969), *Acta Psychol* 30, 412–431 | korrekt | **teilweise.** Donders’ c-Reaktion (auf einen Reiz reagieren, auf den anderen nicht) ist der Vorläufer von Go/No-Go (SEK). „Schließt die Lücke zur taktischen Entscheidungspräzision“ ist Werbung. |
| 5 | Treisman & Gelade (1980), *Cogn Psychol* 12(1), 97–136 – im Text dagegen „Broadbent (1958) und Treisman (1964)“ für Reizfilterung | korrekt | **teilweise/nein.** Text und Liste passen nicht zusammen: Die Liste nennt die Merkmalsintegrationstheorie (FIT), der Text beruft sich auf Filtermodelle. FIT stützt, dass ein Einzelmerkmal wie Farbe parallel und schnell gefunden wird (Pop-out) (SEK; PubMed 7351125). Ein „aktives Abschwächen kreuzender Teamkollegen“ folgt daraus nicht. |
| 6 | Logan & Cowan (1984), *Psychol Rev* 91(3), 295–327 – Wettlaufmodell; „zwei unabhängige neuronale Netzwerke im fronto-basalganglionären Kreislauf“ | korrekt | **teilweise.** Das unabhängige Wettlaufmodell (Go gegen Stop) ist korrekt (Verbruggen & Logan, 2008). Die neuronalen Details stammen aus späterer Forschung, nicht aus 1984. Die Übung ist **kein** Stop-Signal-Paradigma (Abbruch einer laufenden Handlung), sondern eine Auswahl- bzw. Go/No-Go-Aufgabe: Die Farbe steht vor dem Klick fest. |

**Nur im Text zitiert (nicht in der Liste):** Broadbent (1958), *Perception and Communication*, Pergamon (Buch;
Crossref-Eintrag 10.1037/10037-000 vorhanden, Inhalt nicht eingesehen). Treisman (1964) ist **mehrdeutig**: Es
gibt mehrere Arbeiten von 1964, z. B. *Br Med Bull* 20, 12–16, 10.1093/oxfordjournals.bmb.a070274. Beides sind
Modelle zum **auditiven** dichotischen Hören; die Übertragung auf visuelle Bedrohungsfilterung ist eine Analogie.

**Weitere Aussagen:**
- „Adrenalin → Panikfeuer/Tunnelblick“: **teilweise.** Unter Angst schossen Polizist:innen häufiger auf sich
  ergebende Verdächtige (Nieuwenhuys et al., 2012).
- „Clutch-Chance −45 %“: unbelegt.
- „30–50 ms Bedrohungsprüfung vor dem Flick“: unbelegt und unrealistisch kurz; Wahlreaktionen dauern deutlich
  länger (Hick, 1952).
- „30–42 cm/360° ergeben überlegene Bremskraft“: unbelegt; das Optimum der Maus-Übersetzung ist geräte- und
  aufgabenabhängig (Casiez et al., 2008).
- „Tägliches 10-min-Warm-up konditioniert präfrontale Hemmungsbahnen“: **nein.** Hemmungstraining verbessert die
  geübte Aufgabe, aber nicht stärker als eine aktive Kontrollgruppe, und ohne Transfer (Enge et al., 2014).
- Tier-Tabelle: keine Datengrundlage.

### 511 – Crosshair Placement & Winkel halten

| # | Angabe der Website | DOI-Prüfung | stützt Aussage? – Begründung |
|---|---|---|---|
| 1 | Woods et al. (2015) – einfache visuelle Reaktionszeit „180–240 ms“, Klick-Latenz 150–190 ms, Hz-Werte | korrekt | **teilweise.** Mittlere einfache RT 231 ms, korrigiert 213 ms (N = 1 469) → „180–240 ms“ passt. „150–190 ms“ als typische Klick-Latenz ist eher zu schnell. Peeker’s Advantage und Netcode stehen nicht bei Woods. |
| 2 | Fitts (1954) – „präzise Klick-Auslösungen unterliegen dem Fitts’schen Gesetz“ | korrekt | **nein/kaum.** Im Kern verlangt die Übung Halten und einen zeitlich passenden Klick fast ohne Zielbewegung. Das ist Koinzidenz-Timing, kein Fitts-Zielen. |
| 3 | Meyer et al. (1988) | korrekt | **nein** (kein inhaltlicher Bezug zum Winkelhalten; allenfalls zu Nachkorrekturen). |
| 4 | Woodworth (1899) | korrekt | **nein** (dito). |

**Nur im Text zitiert:** Donders (1868) → „unbewusster motorischer Trigger bei antizipiertem Reiz“: nicht belegt.
Hick (1952), *Q J Exp Psychol* 4(1), 11–26, DOI 10.1080/17470215208416600 (CR, AB): Hick beschreibt die
Wahlreaktion (Informationsgewinn ≈ 5 bit/s), nicht „Trigger-Disziplin unter Köder-Druck“ → **teilweise**, nur für
Fake-Peek-Entscheidungen im Sinne einer Wahlaufgabe.

**Weitere Aussagen:**
- Peeker’s Advantage 40–90 ms und die Formel T = RTT/2 + RTT/2 + T_interp: netztechnisch plausibel, **keine
  wissenschaftliche Quelle**. Allgemein gilt: In Ego-Perspektive-Spielen liegt die Toleranzschwelle für
  Netzlatenz bei ≈ 100 ms (Claypool & Claypool, 2006).
- D_offset = v × T: einfache Kinematik (Weg = Geschwindigkeit × Zeit), korrekt (EIG).
- „Jeder reaktive Micro-Flick kostet 80–120 ms“: Größenordnung passt zur Korrekturlatenz der Hand von ≈ 110 ms
  (Brenner & Smeets, 1997).
- „Klick-Latenzen im Sub-Millisekunden-Bereich erfassen“: **irreführend.** Die Timer-Auflösung ist nicht die
  Messgenauigkeit; die Gesamtsystemlatenz liegt real bei 23–243 ms (Ivkovic et al., 2015).

### 512 – Reaktives Tracking gegen ADAD-Strafes

| # | Angabe der Website | DOI-Prüfung | stützt Aussage? – Begründung |
|---|---|---|---|
| 1 | Woods et al. (2015) – Latenztabelle (V1/MT 160–210 ms, Umkehrimpuls 80–130 ms …), Messhinweis | korrekt | **nein** für die Tabelle, die aus keiner der Quellen stammt. **teilweise** für den Messhinweis. |
| 2 | Krauzlis (2004), *J Neurophysiol* 91(2), 591–603 – „Smooth Pursuit genau bis ~30°/s“ | korrekt | **nein/teilweise.** Der Review behandelt das Netzwerk der Folgebewegung und ihre gemeinsame Architektur mit Sakkaden; ein 30°/s-Grenzwert steht dort nicht (AB). Belegt ist: Der Gain liegt unter 0,95 und sinkt mit der Geschwindigkeit (Collewijn & Tamminga, 1984); die individuelle Obergrenze reicht bis 100°/s (Meyer, Lasker & Robinson, 1985). „~30°/s“ ist eine Faustregel. |
| 3 | Green & Bavelier (2003) | korrekt | **nein** (Aufmerksamkeitsstudie, keine Tracking- oder Motorikdaten). |
| 4 | Rashbass (1961), *J Physiol* 159(2), 326–338 – „Aufholsakkade nach 100–130 ms“ | DOI korrekt, **Titel falsch** („smooth *tracking*“) | **teilweise.** Rashbass zeigte klassisch, dass Sakkaden auf Positionsfehler und die Folgebewegung auf Geschwindigkeitsfehler reagieren (SEK; Original-PDF nicht abrufbar). Die Latenz ≈ 125 ms für Aufholsakkaden ist durch de Brouwer et al. (2002) belegt, nicht nachweislich durch Rashbass. |

**Weitere Aussagen:**
- „Blick aufs Ziel, nicht aufs Fadenkreuz“: **teilweise.** Beim Nachführen mit der Hand bleibt der Blick nahe
  am Ziel, der Pursuit-Gain ist höher und Aufholsakkaden sind seltener als beim reinen Blickfolgen (Danion &
  Flanagan, 2018). Eine Aufmerksamkeitsfokus-Anweisung brachte in Aim Lab aber keinen Vorteil (Lamers James &
  O’Connor, 2023).
- „Co-Kontraktion/Death Grip → Zittern, Überschießen“: **nicht belegt, eher widersprochen.** Co-Kontraktion
  steigt bei kleineren Zielen und geht mit **höherer** Endpunktgenauigkeit einher; mit Übung nimmt sie ab
  (Gribble et al., 2003). Für schnelle Richtungswechsel fehlen Daten.
- „Motorischer Umkehrimpuls 80–130 ms“: keine Quelle. Belegt ist: Die Hand reagiert ≈ 110 ms auf einen
  Positionssprung (Brenner & Smeets, 1997) und ≈ 200 ms auf eine Geschwindigkeitsänderung (Brenner, Smeets & de
  Lussanet, 1998).
- „Hüftvektoren lesen bringt 30–50 ms Vorsprung“: unbelegt.
- „1000 Hz eliminiert Eingabe-Jitter“: übertrieben (das Intervall beträgt 1 ms, andere Latenzen dominieren; EIG).

### 513 – Zickzack-Tracking

| # | Angabe der Website | DOI-Prüfung | stützt Aussage? – Begründung |
|---|---|---|---|
| 1 | Woods et al. (2015) | korrekt | **nein** für die Latenztabelle, **teilweise** für den Messhinweis. |
| 2 | Krauzlis (2004) – „~30°/s“ | korrekt | **nein/teilweise** (wie 512). |
| 3 | Fitts (1954) – „Lenkgesetze“ | korrekt | **teilweise/nein.** Fitts beschreibt diskretes Zielen, nicht kontinuierliches Nachführen. |
| 4 | Green & Bavelier (2003) | korrekt | **nein.** |
| 5 | Rashbass (1961) – „jede Umkehr kostet eine Aufholsakkade von 100–130 ms“ | DOI korrekt, **Titel falsch** | **teilweise** (wie 512; Latenz eher nach de Brouwer et al., 2002). |
| 6 | Accot & Zhai (1997), CHI ’97, 295–302 – „Lenkgesetze“ | korrekt (Titel verkürzt; voll: „Beyond Fitts’ law: Models for trajectory-based HCI tasks“) | **teilweise.** Das Steuerungsgesetz beschreibt das Führen entlang eines *vorgegebenen* Pfads oder Tunnels (SEK; Abstract über API nicht verfügbar). Ein zickzackendes Ziel ist kein vorgegebener Pfad; die Übertragung ist unklar. |

**Weitere Aussagen:**
- „V-Crossover-Anchoring“ (Mitte halten statt Wendepunkten nachjagen): als Strategie plausibel, wenn
  Richtungswechsel schneller kommen als die Regelschleife. Manuelles Tracking arbeitet intermittierend mit
  ≈ 170 ms Refraktärzeit und einer Fehler-Totzone von ≈ 0,8° (Miall et al., 1993). Als Technik nicht untersucht.
- „Hitbox-Desynchronisation“: netztechnisch, ohne Quelle.
- Sensitivität „28–42 cm/360°“: unbelegt.

### 514 – Smooth-Tracking (Lissajous-Bahn)

| # | Angabe der Website | DOI-Prüfung | stützt Aussage? – Begründung |
|---|---|---|---|
| 1 | Woods et al. (2015) – Uptime-Stufen „gemessen via performance.now()“ | korrekt | **nein** (Uptime-Stufen ohne Datengrundlage). |
| 2 | Krauzlis (2004) – „Rückkopplung MST–FEF–MT, modelliert Geschwindigkeitsvektoren voraus; Kleinhirn lernt Harmonik“ | korrekt | **teilweise.** Richtig: ein ausgedehntes kortikales Netzwerk mit direktem Einfluss des frontalen Augenfelds. **Widerspruch:** Dieselbe Seite behauptet, Rashbass habe Pursuit und Sakkaden als „anatomisch wie funktional getrennt“ bewiesen – Krauzlis (2004) argumentiert, beide seien „different outcomes from a shared cascade“ (AB). Prädiktives Folgen ist belegt (Kowler et al., 2019). |
| 3 | Green & Bavelier (2003) – „dynamische Aufmerksamkeits-Erweiterung“ | korrekt | **nein.** |
| 4 | Rashbass (1961) – Position vs. Geschwindigkeit; „abrupte Sakkaden lähmen die Verarbeitung 20–50 ms“ | DOI korrekt, **Titel falsch** | **teilweise.** Position/Geschwindigkeit: ja (SEK). Die Lähmung ist **nicht** Rashbass: Die sakkadische Suppression beginnt ≈ 50 ms vor der Sakkade, ist bei Sakkadenbeginn maximal und endet ≈ 50 ms danach; sie betrifft niedrige Ortsfrequenzen bei Helligkeitskontrast (Diamond, Ross & Morrone, 2000). |
| 5 | Land & McLeod (2000), *Nat Neurosci* 3(12), 1340–1345, doi.org/10.1038/81861 – „Fokus aufs Werkzeug stört die Geschwindigkeitsvorhersage; Blick 2–5 Pixel vor die Zielkante“ | **DOI falsch** (404); richtig **10.1038/81887** | **nein.** Die Studie zeigt: Cricket-Schlagmänner machen eine prädiktive Sakkade zum erwarteten Aufsprungpunkt und folgen dem Ball 100–200 ms nach dem Aufsprung; eine kurze Latenz der ersten Sakkade unterscheidet gute von schwachen Schlagmännern (AB). Von Werkzeugfixation und „2–5 Pixeln“ steht dort nichts (eine Pixelangabe ohne Sehwinkel ist ohnehin nicht übertragbar). |

**Weitere Aussagen:**
- „Lissajous macht lineares Auswendiglernen unmöglich und fordert echte Reaktionsverfolgung“: **falsch bzw.
  teilweise.** Zwei Sinusschwingungen sind periodisch und damit vorhersagbar, und vorhersagbare Bewegungen werden
  antizipiert (Kowler et al., 2019). Unvorhersagbar werden Bahnen erst durch mehrere nicht-harmonische Komponenten
  (Barnes et al., 1987).
- „30–40 % Griffkraft“, „aus dem Ellbogen statt dem Handgelenk“, „max. 30 min wegen Sehnenermüdung“: unbelegt.
  Belegt ist: Nach 6 × 5 min Aim Lab waren die Handgelenkstrecker messbar ermüdet, ohne Leistungsabfall (Forman
  et al., 2025).
- Uptime-Stufentabelle: keine Datengrundlage.

### 515 – Vertikales Tracking (Parabelbahnen)

| # | Angabe der Website | DOI-Prüfung | stützt Aussage? – Begründung |
|---|---|---|---|
| 1 | Woods et al. (2015) – „Apex-Richtungswechsel-Latenz“ | korrekt | **nein.** |
| 2 | Krauzlis (2004) – „wies nach, dass vertikale Pursuit spezialisierte Bahnen im Kleinhirnwurm und Hirnstamm nutzt“; „~30°/s“ | korrekt | **nein.** Das ist nicht Inhalt des Reviews (AB). Eine getrennte Steuerung horizontaler und vertikaler Pursuit legen Rottach et al. (1996) nahe; die Richtungsasymmetrie (abwärts besser als aufwärts) zeigen Ke et al. (2013). |
| 3 | Fitts (1954) – Fingerbeugung für Y-Mikrokorrekturen | korrekt | **nein/kaum.** |
| 4 | Rashbass (1961) – Geschwindigkeitsfehler treibt die Pursuit; „am Scheitelpunkt sinkt die Vertikalgeschwindigkeit gegen null“ | DOI korrekt, **Titel falsch** | **teilweise.** Der Geschwindigkeitsfehler als Antrieb ist korrekt (SEK); der Scheitelpunkt ist triviale Physik, kein Rashbass-Befund. |
| 5 | Land & McLeod (2000) – „erfolgreiche Abfänger sagen vorher, wo das Ziel sein wird“ | **DOI falsch** (richtig 10.1038/81887) | **teilweise.** Das prädiktive Vorausblicken ist belegt, allerdings für den Ballflug im Cricket, nicht für Mausbewegungen. |

**Nur im Text zitiert:** „Peter R. Cavanagh et al. (1984)“ – **nicht identifizierbar**; keine passende
Veröffentlichung gefunden (Crossref-Suche). Nicht verwenden.

**Weitere Aussagen:**
- „Handgelenke tracken horizontal leicht, vertikal ist Ganzarm-Arbeit“: für Maus-*Zielbewegungen* nicht
  bestätigt. Über 8 Richtungen waren vertikale und horizontale Bewegungen schneller als diagonale (Whisenand &
  Emurian, 1996; SEK). Für die **Augen** ist vertikale Pursuit dagegen tatsächlich schwächer als horizontale
  (Rottach et al., 1996; Ke et al., 2013).
- „g = 9,81 m/s² verinnerlichen“: Ein internes Schwerkraftmodell gibt es (McIntyre et al., 2001). Am Bildschirm
  ist die Beschleunigung aber beliebig skaliert (Code: 700–1 100 px/s²; EIG). Beschleunigung wird visuell
  schlecht beurteilt und über Wiederholung derselben Beschleunigung gelernt (Brenner et al., 2016).
- „Blickführung unterhalb des Ziels“, „Arm-Sleeve eliminiert Ruckeln“: unbelegt.

---

## B) Faktenliste „Aussage – Zahl – Quelle“

In eckigen Klammern: für welche Übungen der Fakt vor allem relevant ist.

### B1 Zielbewegungen, Präzision, Mausübersetzung

| Nr. | Aussage | Zahl | Quelle |
|---|---|---|---|
| F01 | Die Bewegungszeit steigt linear mit dem Schwierigkeitsindex ID; Original ID = log2(2A/W), heute meist Shannon-Form ID = log2(A/W + 1) [509, 511] | – | MacKenzie (2018); Fitts (1954) |
| F02 | Durchsatz in Fitts’ Stift-Tapping-Versuch [509] | Mittel 10,10 bit/s (SD 1,33) | MacKenzie (2018), Auswertung von Fitts (1954) |
| F03 | Durchsatz der Maus in ISO-9241-9-Studien – deutlich unter dem freien Handzeigen [509, 510] | 3,7–4,9 bit/s | Soukoreff & MacKenzie (2004, Tab. 5), zitiert nach MacKenzie (2018) |
| F04 | Woodworths Zwei-Komponenten-Modell (zentraler Impuls + rückmeldungsgestützte Endsteuerung) gilt weiter, erweitert um mehrere Prozesse; frühe Übung optimiert v. a. die Planung; Präzision bricht u. a. im normalen Altern ein [509] | – | Elliott et al. (2010); Woodworth (1899) |
| F05 | Schnelle Zielbewegungen bestehen aus Primär- und optionaler Korrekturbewegung, geplant für minimale mittlere Zeit bei hoher Trefferquote; Endpunktstreuung der Primärbewegung wächst linear mit ihrer Geschwindigkeit; Quadratwurzel-Näherung des Fitts-Gesetzes [509] | – | Meyer et al. (1988) |
| F06 | Springt das Ziel während der Bewegung, lenkt die Hand nach ≈ 110 ms um (N = 6 je Experiment) [509, 511, 512, 513] | ≈ 110 ms | Brenner & Smeets (1997) |
| F07 | Je kleiner das Ziel, desto mehr Co-Kontraktion; dabei sinkt die Bahnvariabilität und die Endpunktgenauigkeit steigt; mit Übung nimmt die Co-Kontraktion ab [509, 512–515] | – | Gribble et al. (2003) |
| F08 | Maus-Übersetzung (CD-Gain): Niedrige Gains verschlechtern die Leistung deutlich (Umsetzen, hohe Armgeschwindigkeit), hohe kaum; Mausbeschleunigung macht Zeigen 3,3 % schneller (kleine Ziele bis 5,6 %), erhöht aber das Überschießen [509–515] | 3,3 % / 5,6 % | Casiez et al. (2008) |
| F09 | Über 8 Richtungen erklärt Fitts nur 43 % der Varianz der Bewegungszeit mit der Maus; vertikal und horizontal schneller als diagonal [515] | 43 % | Whisenand & Emurian (1996) (SEK) |
| F10 | Bei Aim-Lab-Profis beschreibt das Fitts-Gesetz die Leistung über zwei Zielgrößen hinweg schlecht; die Kinematik hängt von der Aufgabe ab [509] | – | Donovan et al. (2022) (Autor:innen beim Hersteller angestellt) |
| F11 | Das Zielen in Ego-Perspektive (Kamera schwenkt) und das Zeigen mit Cursor auf statischem Hintergrund sind kinematisch nahezu identisch; klassische Greif-Invarianten gelten [509–515] | – | Warburton et al. (2023) |
| F12 | CS:GO-Profis vs. Amateure (8 vs. 8, sechs Sensoren): Nur 6 von 13 Community-Vermutungen über „Geheimnisse“ der Profis waren statistisch gestützt [alle] | 6/13 | Park et al. (2021) |

### B2 Fixation, Mikrosakkaden, Blick vor dem Klick

| Nr. | Aussage | Zahl | Quelle |
|---|---|---|---|
| F13 | Auch bei Fixation bewegen sich die Augen (Tremor, Drift, Mikrosakkaden); Mikrosakkaden wirken dem Verblassen entgegen [509, 511] | – | Martinez-Conde et al. (2004) (SEK) |
| F14 | Mikrosakkaden verlagern den Blick bei hochauflösenden Aufgaben (virtuelles Einfädeln) gezielt auf nahe relevante Stellen [509] | – | Ko et al. (2010) |
| F15 | Funktionen von Mikrosakkaden: Fixationskontrolle, gegen Verblassen, Sehschärfe, Abtasten kleiner Regionen, Aufmerksamkeitsverschiebung – „teils weder notwendig noch einzigartig“ [509] | – | Rolfs (2009) |
| F16 | „Quiet Eye“ in FPS-ähnlicher Klickaufgabe: Eine längere letzte Fixation vor dem Klick geht mit besserer Leistung einher; kognitive Last verzögert den Beginn, nicht die Dauer (Eyetracker 300 Hz; korrelativ) [509, 511] | – | Dahl et al. (2021) |

### B3 Glatte Augenfolgebewegung (Smooth Pursuit) und Aufholsakkaden

| Nr. | Aussage | Zahl | Quelle |
|---|---|---|---|
| F17 | Die Folgebewegung setzt ein, nachdem das System ≈ 100 ms visuelle Bewegung ausgewertet hat; ihre Variabilität stammt aus dem Rauschen in Areal MT [512–515] | ≈ 100 ms | Lisberger (2010) |
| F18 | Der Pursuit-Gain liegt immer unter 0,95 und sinkt mit der Zielgeschwindigkeit; ein strukturierter Hintergrund senkt ihn horizontal um ≈ 10 %, vertikal um ≈ 20 % [512–515] | < 0,95; −10 %/−20 % | Collewijn & Tamminga (1984) |
| F19 | Die individuelle Obergrenze ist hoch: ≈ 90 % Gain bis 100°/s bei 5 Personen, bei einer nur 60 % → „genau bis ~30°/s“ ist eine Faustregel [512–515] | bis 100°/s | Meyer, Lasker & Robinson (1985) |
| F20 | Unvorhersagbare Bahnen (Summe von Sinuswellen): Gain 0,92 bei einer 0,39-Hz-Komponente, 0,53 bei 1,56 Hz [513, 514] | 0,92 → 0,53 | Barnes et al. (1987) |
| F21 | Vorhersagbare Zielbewegungen werden antizipiert (prädiktive Pursuit, auch vor Bewegungsbeginn) [514, 515] | – | Kowler et al. (2019) |
| F22 | Ob eine Aufholsakkade kommt, hängt von der vorhergesagten „eye crossing time“ ab: Bei 40–180 ms bleibt das Folgen glatt, sonst folgt nach ≈ 125 ms eine Sakkade [512–515] | 40–180 ms; ≈ 125 ms | de Brouwer et al. (2002) |
| F23 | Pursuit und Sakkaden haben eine sehr ähnliche funktionelle Architektur (frontales Augenfeld, Basalganglien, Colliculus superior); sie sind eher „zwei Ergebnisse einer gemeinsamen Kaskade“ als zwei getrennte Systeme [512–515] | – | Krauzlis (2004) |
| F24 | Klassischer Befund: Sakkaden reagieren auf Positionsfehler, die Folgebewegung auf Geschwindigkeitsfehler (Step-Ramp) [512–515] | – | Rashbass (1961) (SEK) |
| F25 | Bei vorhersagbaren Bahnen ist der horizontale Gain bei allen 5 Personen höher als der vertikale – auch bei diagonalen und kreisförmigen Bahnen [514, 515] | – | Rottach et al. (1996) |
| F26 | Abwärts folgt das Auge schneller (Beschleunigung, Spitzengeschwindigkeit, Gain) und glatter (weniger, spätere Aufholsakkaden) als aufwärts; horizontal genauer als vertikal (n = 20 und 22) [515] | – | Ke et al. (2013) |
| F27 | Ältere (75–93 J.) haben bei allen Geschwindigkeiten einen geringeren Gain als Jüngere (18–43 J.) [512–515] | – | Moschner & Baloh (1994) |
| F28 | Die sakkadische Suppression beginnt ≈ 50 ms vor der Sakkade, ist bei Sakkadenbeginn maximal und hält ≈ 50 ms danach an; Kontrastempfindlichkeit für niederfrequente Helligkeitsgitter 10-fach reduziert, für Farbgitter kaum [514] | ±50 ms; 10-fach | Diamond et al. (2000) |

### B4 Auge–Hand beim Nachführen (manuelles Tracking)

| Nr. | Aussage | Zahl | Quelle |
|---|---|---|---|
| F29 | Wird ein unvorhersagbar bewegtes Ziel mit einem Cursor nachgeführt, steigt der Pursuit-Gain und Aufholsakkaden werden seltener als beim reinen Blickfolgen; der Blick bleibt am Ziel [512–515] | – | Danion & Flanagan (2018) |
| F30 | Folgt die eigene Hand dem Ziel bzw. dient sie als Ziel, sinkt die Auge-Ziel-Verzögerung von 150 auf 30 ms und die maximale Pursuit-Geschwindigkeit steigt um 100 % [512–515] | 150 → 30 ms; +100 % | Gauthier et al. (1988) |
| F31 | Manuelles Tracking ist intermittierend: Fehler-Totzone ≈ 0,7 cm am Bildschirm (≈ 0,8°), Refraktärzeit ≈ 170 ms zwischen Korrekturen; ohne Sicht auf die eigene Position wird es glatter (deutlich weniger Signalleistung bei 0,5–1,8 Hz) [512–515] | 0,8°; ≈ 170 ms | Miall et al. (1993) |
| F32 | 2D-Tracking lässt sich nicht in x- und y-Komponenten zerlegen; Fehlersignale beziehen sich auf Geschwindigkeit und Richtung, kaum auf Beschleunigung [513–515] | – | Engel & Soechting (2000) |
| F33 | Maus-Tracking: maximale Bandbreite für Genauigkeit ≈ 2 Hz; sinkt mit hohem Alter und motorischer Einschränkung (8 Junge, 4 Ältere 70–73 J., 5 motorisch Eingeschränkte) [512–515] | ≈ 2 Hz | Riviere & Thakor (1996) |
| F34 | Die Handbeschleunigung folgt Änderungen der Zielgeschwindigkeit mit ≈ 200 ms Verzögerung [512, 513] | ≈ 200 ms | Brenner, Smeets & de Lussanet (1998) |
| F35 | Die Anweisung, auf das Ziel statt auf die Handbewegung zu achten, verbesserte das Zielen in Aim Lab nicht (N = 37) [512, 514] | – | Lamers James & O’Connor (2023) |

### B5 Bewegungswahrnehmung, Richtungswechsel, Beschleunigung, Vorhersage

| Nr. | Aussage | Zahl | Quelle |
|---|---|---|---|
| F36 | Die Reaktionszeit auf eine Geschwindigkeits- oder Richtungsänderung hängt nur von der Größe der Änderung ab: MRT ≈ r + c/\|V1 − V0\|^(2/3); je größer der Sprung, desto schneller (0–16°/s) [512, 513] | Exponent 2/3 | Dzhafarov et al. (1993) |
| F37 | Beim Bewegungsbeginn in der Peripherie steigt die RT für langsame Ziele mit der Exzentrizität, für schnelle nicht [511] | – | Tynan & Sekuler (1982) |
| F38 | Beschleunigung wird visuell schlecht beurteilt; Fehler nehmen ab, wenn dieselbe Beschleunigung wiederholt vorkommt; Vorab-Information hilft nicht [515] | – | Brenner et al. (2016) |
| F39 | Das Gehirn nutzt ein internes Schwerkraftmodell: Astronauten begannen Fangbewegungen in 0 g früher als in 1 g [515] | – | McIntyre et al. (2001) (SEK) |
| F40 | FPS-Spezialisten (n = 6 vs. 11) zeigten bei einer verdeckten Parabelbahn früher prädiktive Sakkaden und kleinere Vorhersagefehler (kleine Querschnittsstudie) [515] | – | Koshizawa et al. (2026) |
| F41 | Cricket-Schlagmänner machen eine prädiktive Sakkade zum Aufsprungpunkt und folgen 100–200 ms nach dem Aufsprung; kurze Latenz der ersten Sakkade kennzeichnet gute Spieler [514, 515] | 100–200 ms | Land & McLeod (2000) |

### B6 Reaktion, Timing, Wachsamkeit

| Nr. | Aussage | Zahl | Quelle |
|---|---|---|---|
| F42 | Einfache visuelle RT (N = 1 469, 18–65 J.): 231 ms, nach Hardwarekorrektur 213 ms; +0,55 ms/Jahr; das reine Entdecken dauert 131 ms und ist altersunabhängig [509–511] | 213–231 ms; 131 ms | Woods et al. (2015) |
| F43 | Hardwareverzögerungen im Woods-Labor: Monitor 11,0 ms, Gaming-Maus (1 kHz) 6,8 ms, zusammen 17,8 ms; Standard-Maustreiber ≥ 20 ms; Hardware kann die RT um bis zu 100 ms verlängern [alle] | 17,8 ms; ≥ 20 ms | Woods et al. (2015) (VT) |
| F44 | Die zeitliche Präzision beim Abfangen ist am höchsten, wenn der Trefferort frei ist; bei vorgegebenem Ort (wie beim Winkelhalten) ist sie deutlich schlechter [511] | – | Brenner & Smeets (2015) |
| F45 | Wachsamkeit (Vigilanz) ist entgegen früherer Annahme geistige Schwerarbeit und stressig; die Belastung steigt mit der Aufgabenschwierigkeit [511] | – | Warm et al. (2008) |

### B7 Entscheidung, Hemmung, Aufmerksamkeit, Farbe

| Nr. | Aussage | Zahl | Quelle |
|---|---|---|---|
| F46 | Wahlreaktion: Der Informationsgewinn ist etwa konstant, in der Größenordnung von 5 bit/s [510, 511] | ≈ 5 bit/s | Hick (1952) |
| F47 | Stoppen folgt einem unabhängigen Wettlauf zwischen Go- und Stopp-Prozess; die Stoppzeit (SSRT) ist verdeckt und muss geschätzt werden; sie ist bei jüngeren Kindern und Älteren verlängert [510, 511] | – | Verbruggen & Logan (2008); Logan & Cowan (1984) |
| F48 | Go/No-Go fordert echte Hemmung nur bei seltenen No-Go-Reizen (≤ 20 %) und schnellem Takt (≤ 1 500 ms) [510, 511] | ≤ 20 %; ≤ 1 500 ms | Wessel (2018) |
| F49 | Adaptives Hemmungstraining (N = 122, 3 Wochen): Leistung in der Übung steigt, aber nicht mehr als in der aktiven Kontrollgruppe; kein Transfer [510] | – | Enge et al. (2014) |
| F50 | FPS-Spieler (29 vs. 32) führten in einer Go/No-Go-Zielerfassung schneller aus bei gleicher Go-Genauigkeit; die Fehlalarmrate zeigte keinen Gruppeneffekt, hing aber stark von der räumlichen Lage ab; kürzere Sakkadenlatenzen [510] | – | Yang et al. (2026) |
| F51 | Unter Angst verschob sich bei Polizist:innen (N = 36) die Entscheidung in Richtung Schießen – auch auf sich ergebende Verdächtige; die Schusspräzision sank; das Blickverhalten blieb gleich [510] | – | Nieuwenhuys et al. (2012) |
| F52 | Einzelmerkmale wie Farbe werden früh, automatisch und parallel erfasst (Pop-out); Merkmalskombinationen erfordern serielle Suche [510] | – | Treisman & Gelade (1980) (SEK) |
| F53 | Aufmerksamkeit ist ein eigenes System aus Netzwerken (Alerting, Orienting, exekutive Kontrolle) [510] | – | Posner & Petersen (1990) (SEK) |
| F54 | Rot-Grün-Farbsehschwäche in Europa: ≈ 8 % der Männer, ≈ 0,4 % der Frauen [510] | 8 % / 0,4 % | Birch (2012) |

### B8 Geräte, Latenz, Messung im Browser

| Nr. | Aussage | Zahl | Quelle |
|---|---|---|---|
| F55 | Lokale Latenz (Eingabegerät bis Anzeige) liegt in realen Spielsystemen bei 23–243 ms und verschlechtert Zielen und Tracking schon ab 41 ms deutlich [alle] | 23–243 ms; 41 ms | Ivkovic et al. (2015) |
| F56 | Erfahrene CS:GO-Spieler (N = 43) treffen auch bei kleinen Latenzsenkungen unterhalb von 125 ms genauer und erzielen höhere Scores [alle] | < 125 ms | Liu et al. (2021) |
| F57 | Netzlatenz: Toleranzschwelle für Ego-Perspektive-Spiele ≈ 100 ms; Präzisionsschießen verliert bei 100 ms ≈ 35 % Genauigkeit [511] | ≈ 100 ms; ≈ 35 % | Claypool & Claypool (2006) (VT) |
| F58 | Bildintervall = 1000/Hz: 16,7 ms (60 Hz), 6,9 ms (144 Hz), 4,2 ms (240 Hz). Maus-Polling 125 Hz = 8 ms Intervall (mittlere Zusatzwartezeit ≈ 4 ms), 1000 Hz = 1 ms [alle] | s. links | EIG |
| F59 | `performance.now()` ist vergröbert: 100 µs Auflösung in normalen, 5 µs in cross-origin-isolierten Kontexten (Schutz vor Timing-Angriffen und Fingerprinting) [alle] | 100 µs / 5 µs | MDN (o. J.-a) |
| F60 | Rohe Mausdaten ohne Betriebssystem-Beschleunigung gibt es nur mit `requestPointerLock({ unadjustedMovement: true })`; die Option ist nicht in allen Browsern verfügbar. Die Vorlage nutzt sie nicht (EIG) [alle] | – | MDN (o. J.-b); EIG |
| F61 | Web-Apps messen Reaktionszeiten auf Touchgeräten systematisch zu lang (iPhone ≈ 58 ms, Galaxy ≈ 66–70 ms; Laptops 62–133 ms) [alle, Tablet] | s. links | Pronk et al. (2020) |
| F62 | Kommerzielle Touchgeräte hatten 50–200 ms Latenz von Berührung bis Anzeige; beim Ziehen leidet die Leistung ab ≈ 25 ms [Tablet-Varianten 512–515] | 50–200 ms | Deber et al. (2015) |
| F63 | Metriken des Aim-Trainers KovaaK’s sind gut reproduzierbar (N = 10, 2 Termine im Abstand von 3–5 Tagen, u. a. Micro Flicking, Strafe Tracking, Wall Peeking): ICC 0,947–0,995 [509, 511, 512] | ICC 0,947–0,995 | Rogers et al. (2024) |

### B9 Lernen, Übung, Transfer

| Nr. | Aussage | Zahl | Quelle |
|---|---|---|---|
| F64 | Aim-Lab-Daten (N = 7 174; 682 564 Durchgänge à 60 s; bis 100 Tage): Trefferquote nur mäßig besser, Treffer pro Sekunde deutlich; 40–60 % Retention von Tag zu Tag; ≈ 90 % des Tagesnutzens mit 30 min Übung/Tag. Studie vom Hersteller finanziert [alle] | s. links | Listman et al. (2021) |
| F65 | Metaanalyse Actionspiele und Kognition: Querschnitt g = 0,64 [0,53; 0,74] (mit Publikationsbias); Interventionsstudien mit aktiver Kontrolle g = 0,30 [0,11; 0,50] (105 bzw. 28 Studien) [510, alle] | g = 0,64 / 0,30 | Bediou et al. (2023) |
| F66 | 20+ h Actionspiel verbesserten bei Nichtspielern die meisten kognitiven Aufgaben nicht (Replikationsversuch) [510] | 20+ h | Boot et al. (2008) |
| F67 | 5–10 h Fahr- oder FPS-Spiel verbesserten die visuomotorische Steuerung (Spurhalten/Nachführen) von Nicht-Actionspielern; Nicht-Actionspiel nicht [512–515] | 5–10 h | Li et al. (2016) |
| F68 | Digitales Sehtraining: große Effekte vor allem, wenn Trainings- und Testaufgabe am selben Gerät ähnlich sind („Lerneffekt“), z. B. Reaktionszeit SMD 2,66 vs. 0,50 [alle] | SMD 2,66 vs. 0,50 | Guo et al. (2025) |
| F69 | „Brain-Training“: viel Evidenz für die geübte Aufgabe, wenig für entfernte Aufgaben und den Alltag; keine Studie erfüllte alle Qualitätskriterien [alle] | – | Simons et al. (2016) |

### B10 Alter, Tremor, motorische Einschränkung

| Nr. | Aussage | Zahl | Quelle |
|---|---|---|---|
| F70 | Ältere (60–75 J.) haben mehr Schwierigkeiten bei Maus-Aufgaben, v. a. beim Klicken und Doppelklicken (N = 60, 3 Altersgruppen) [509–511] | – | Smith et al. (1999) |
| F71 | Physiologischer Handtremor: Mittel 7,7 Hz (mit Zusatzmasse 5,2 Hz); Fingertremor in Bändern 1–4, 6–11 und 15–30 Hz; Frequenz nicht altersabhängig (N = 117, 20–94 J.) [509, 511] | 7,7 Hz | Raethjen et al. (2000) |
| F72 | Essentieller Tremor: gepoolte Prävalenz 0,9 % (alle Alter), 4,6 % ab 65 J. [509–515] | 0,9 % / 4,6 % | Louis & Ferreira (2010) |

### B11 Sicherheit und Belastung

| Nr. | Aussage | Zahl | Quelle |
|---|---|---|---|
| F73 | Licht-ausgelöste Anfälle bei ≈ 1/10 000 Menschen, bei 5–24-Jährigen ≈ 1/4 000; am stärksten provozierend 15–25 Hz; viele Betroffene wissen nichts davon [alle] | 1/10 000; 15–25 Hz | Fisher et al. (2005) |
| F74 | Konsolenspiele mit 3D-Kamerabewegung: Reisekrankheit bei 42–56 % der Spielenden (N = 40, bis 50 min) [alle] | 42–56 % | Stoffregen et al. (2008) |
| F75 | Esports-Studierende (N = 65; 3–10 h/Tag): Augenermüdung 56 %, Nacken/Rücken 42 %, Handgelenk 36 %, Hand 32 % [alle] | s. links | DiFrancisco-Donoghue et al. (2019) |
| F76 | 6 × 5 min Aim Lab: Handgelenkstrecker bis 9,3 % MVC; messbare Ermüdung (EMG, subjektiv) ohne Leistungsabfall (N = 20) [alle] | 9,3 % MVC | Forman et al. (2025) |

### B12 Optik und Optiker-Bezug

| Nr. | Aussage | Zahl | Quelle |
|---|---|---|---|
| F77 | Digitale Augenbelastung betrifft ≥ 50 % der Bildschirmnutzer; Symptome aus Akkommodation/Vergenz und trockenem Auge; empfohlen: Refraktion und Presbyopie korrigieren, trockenes Auge behandeln, Pausen [alle] | ≥ 50 % | Sheppard & Wolffsohn (2018) |
| F78 | Die Lidschlagrate sinkt am Bildschirm im Mittel auf ein Fünftel [alle] | 5-fach | Patel et al. (1991) |
| F79 | Bildschirm-Gleitsichtgläser vs. Universal-Gleitsicht (N = 23 Presbyope): Kopfneigung am Monitor 2,3° geringer, Sicht am Monitor besser; 61 % bzw. nach Aufklärung 44 % bevorzugten die Bildschirmvariante [alle] | 2,3°; 61 %/44 % | Jaschinski et al. (2015) |
| F80 | Bei freier Wahl lag der Sehabstand am Bildschirm zwischen 51 und 99 cm (Mittel 74 cm, 5 mm Zeichenhöhe); 50 cm belasteten stärker als 100 cm [alle] | 51–99 cm | Jaschinski-Kruza (1991) |
| F81 | Presbyopie weltweit ≈ 1,8 Mrd. Menschen (2015), davon 826 Mio. mit unzureichender Nahkorrektur [alle] | 1,8 Mrd. | Fricke et al. (2018) |
| F82 | Sehwinkel: 24″-FHD-Monitor bei 60 cm ≈ 38 px/°, 27″-QHD bei 70 cm ≈ 52 px/°, 11″-Tablet bei 40 cm ≈ 36 CSS-px/°; 1 px ≈ 1,6′ bzw. 1,2′ bzw. 1,7′ [alle] | s. links | EIG (Formel px/° = d·tan 1°/Pixelmaß; vgl. `docs/wissenschaft/02`, Abschnitt 4) |

**Summe: 82 Fakten.**

---

## C) Evidenz-Zusammenfassung

### C1 Übergreifend (alle sieben Übungen)

- **Grundlagen solide, Website-Zuordnung oft falsch.** Die zugrunde liegenden Phänomene sind gut untersucht:
  Fitts/Woodworth/Meyer, Folgebewegung und Aufholsakkaden, visuomotorische Latenzen von ≈ 100–200 ms,
  Go/No-Go und Stoppen. Die Website verknüpft sie aber mit erfundenen Zahlen (Tier-Tabellen) und falsch
  zugeordneten Befunden.
- **Übungseffekt (in der Aufgabe): mittel.** Motorisches Lernen in Zielaufgaben ist gut belegt (Elliott et al.,
  2010). Aim-Lab-Daten zeigen über Tage steigende Treffer/s (Listman et al., 2021; Beobachtungsdaten, Hersteller).
  Aim-Trainer-Metriken sind reproduzierbar (Rogers et al., 2024). Für genau diese Browserdrills gibt es keine
  Studie.
- **Naher Transfer: schwach/unklar.** Actionspiele (nicht Aim-Trainer) zeigen kleine kausale Effekte auf
  kognitive Tests (g = 0,30; Bediou et al., 2023) und auf visuomotorisches Nachführen (Li et al., 2016). Es gibt
  aber auch Nicht-Replikationen (Boot et al., 2008). Große Effekte treten vor allem bei gerätegleichen Tests auf
  (Guo et al., 2025).
- **Alltagstransfer (Spielleistung, Verkehr, Sport, Beruf): fehlend.** Keine kontrollierte Studie zu Aim-Trainer
  → Match-Leistung oder Alltag gefunden. Esports-„Geheimnisse“ der Profis sind nur teilweise belegt (6 von 13;
  Park et al., 2021).
- **Messwerte sind gerätegebunden.** Lokale Latenzen von 23–243 ms (Ivkovic et al., 2015), Browser- und
  Touch-Verzögerungen (Pronk et al., 2020) und die fehlende Rohdatenoption machen Normwerte, Ranglisten und
  „Tiers“ unseriös. Sinnvoll ist nur der Vergleich mit sich selbst am selben Gerät.

### C2 Je Übung (Kurzfassung)

| Übung | Kern (fachlich) | Was belegt ist | Was unbelegt/falsch ist |
|---|---|---|---|
| **509** Mikrokorrektur | Zweiphasiges Zielen (Anker, dann kleines Mikroziel); Endphasen-Korrektur, Präzision, Klick-Timing | Primär- + Korrekturbewegung (Meyer et al., 1988; Elliott et al., 2010); Korrekturlatenz ≈ 110 ms (Brenner & Smeets, 1997); Quiet Eye korreliert mit Leistung (Dahl et al., 2021) | Tier-Tabelle; „mikrosekundenschnelle Verifizierung“; Pointer-Lock-Rohdaten; Fingertipp-Pixelregeln |
| **510** Zielauswahl | Farbbasierte Priorisierung (rot > gelb, grün = nicht schießen) unter Zeitdruck; Zielen + Go/No-Go-Auswahl | Farbe als Pop-out-Merkmal (Treisman & Gelade, 1980); Hemmung nur bei seltenen No-Go-Reizen und schnellem Takt gefordert (Wessel, 2018); Angst → Schussneigung (Nieuwenhuys et al., 2012) | „Konditioniert präfrontale Hemmungsbahnen“ (vgl. Enge et al., 2014); Clutch-Prozente; Entscheidungs-Tiers |
| **511** Winkel halten | Ruhig halten, auf Bewegungsbeginn am Rand warten, im richtigen Moment klicken; Köder-Peeks (Go/No-Go) | Einfache RT ≈ 213–231 ms (Woods et al., 2015); zeitliche Präzision schlechter bei vorgegebenem Ort (Brenner & Smeets, 2015); Vigilanz ist anstrengend (Warm et al., 2008) | Peeker’s Advantage ohne Quelle; Fitts/Woodworth/Meyer passen nicht; Tabellenwerte |
| **512** Anti-Strafe | Kontinuierliches Nachführen eines Ziels mit sehr schnellen Richtungsumkehrungen | Aufholsakkaden-Logik (de Brouwer et al., 2002); Handreaktion 110–200 ms (Brenner & Smeets, 1997; Brenner et al., 1998); RT auf Richtungswechsel hängt von der Größe der Änderung ab (Dzhafarov et al., 1993); Maus-Tracking-Bandbreite ≈ 2 Hz (Riviere & Thakor, 1996) | „~30°/s nach Krauzlis“; Co-Kontraktion → Zittern; Latenztabelle |
| **513** Zickzack | Wie 512 mit längeren Segmenten; Strategie „Mitte halten“ | Intermittierende Regelung mit ≈ 170 ms Refraktärzeit (Miall et al., 1993); 2D nicht in x/y zerlegbar (Engel & Soechting, 2000) | V-Crossover als belegte Technik; Steuerungsgesetz passt nur bedingt |
| **514** Smooth-Tracking | Nachführen auf einer 2D-Lissajous-Bahn (x und y mit verschiedenen Frequenzen) | Pursuit-Gain < 1, sinkt mit Tempo und Unvorhersagbarkeit (Collewijn & Tamminga, 1984; Barnes et al., 1987); Hand-Tracking verbessert Pursuit (Danion & Flanagan, 2018; Gauthier et al., 1988); vorhersagbare Bahnen werden antizipiert (Kowler et al., 2019) | „Lissajous verhindert Auswendiglernen“; Land-&-McLeod-Zitat (falsche DOI, falscher Inhalt); Sakkaden-„Lähmung“ Rashbass zugeschrieben |
| **515** Vertikal | Nachführen von Zielen auf Wurfparabeln (Aufstieg, Scheitel, beschleunigter Fall) | Vertikale Pursuit schwächer als horizontale, aufwärts schwächer als abwärts (Rottach et al., 1996; Ke et al., 2013); internes Schwerkraftmodell (McIntyre et al., 2001); Beschleunigung wird schlecht wahrgenommen und über Wiederholung gelernt (Brenner et al., 2016) | „Kleinhirnwurm nach Krauzlis“; Cavanagh et al. (1984); Handgelenk-Asymmetrie; Blick unter das Ziel |

### C3 Sicherheit und Vorsicht (für `vorsicht_bei`, keine medizinische Aussage)

- **Photosensitivität:** Die Drills zeigen dunkle Szenen mit hellen, kleinen Zielen, Treffer-Partikeln und
  kurzem **Bildschirmwackeln** (screenShake 6–12 px; EIG). Ein großflächiges Blitzen ist im Code nicht
  aufgefallen; die Autor:innen sollten das mit den Grenzwerten aus Dokument 03, Abschnitt 4.7 prüfen (Fisher et
  al., 2005). Für `photosensitive_epilepsie` bzw. `migraene_lichtempfindlich` sind „Vorsicht“-Hinweise
  vertretbar, besonders bei schnellen Rückmeldeeffekten.
- **Schwindel/Vektion:** Anders als echte Ego-Shooter bewegen die Drills keine 3D-Kamera. Der Hintergrund ist
  statisch, es bewegen sich nur Fadenkreuz und Ziele (EIG). Die hohen Reisekrankheitsraten von Konsolenspielen
  (42–56 %; Stoffregen et al., 2008) sind daher **nicht** direkt übertragbar – eine eigene Schlussfolgerung,
  ungeprüft. Schnell hin- und herspringende Ziele (512, 513) und das Bildschirmwackeln können empfindliche
  Personen trotzdem stören (`schwindel_vestibulaer`, `reisekrankheit`: geringe Vorsicht).
- **Hand/Arm:** Viele Wiederholungen feiner Maus-Korrekturen belasten die Handgelenkstrecker (Forman et al.,
  2025); Handgelenk- und Handschmerz sind bei Esports-Spielenden häufig (DiFrancisco-Donoghue et al., 2019) →
  `hand_arm_beschwerden`.
- **Tremor:** Physiologischer Tremor (≈ 8 Hz) begrenzt Mikro-Präzision und ruhiges Halten (509, 511). Essentieller
  Tremor betrifft 4,6 % der über 65-Jährigen (Louis & Ferreira, 2010); Maus-Tracking wird mit Alter und
  motorischer Einschränkung ungenauer (Riviere & Thakor, 1996) → `tremor_parkinson`.
- **Farbe (510):** Rot, Gelb und Grün sind die einzige Unterscheidung. Im Code sind alle Ziele Kreise, nur der
  Radius unterscheidet sich leicht (18/22/24 px). Die Leuchtdichte-Kontraste sind gering: rot/grün 1,65 : 1,
  gelb/grün 1,19 : 1 (EIG, WCAG-Formel). Bei ≈ 8 % der Männer (Birch, 2012) ist die Übung damit kaum lösbar →
  `farbsehschwaeche` hoch.
- **Augen am Bildschirm:** 45-s-Runden sind kurz, wiederholtes Spielen senkt aber die Lidschlagrate (Patel et
  al., 1991) → `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie` (Sheppard & Wolffsohn, 2018).

### C4 Optiker-Bezug

- **Arbeitsabstand:** Diese Übungen laufen am Monitor im Zwischenbereich (≈ 50–75 cm; Jaschinski-Kruza, 1991),
  nicht in Lesenähe. Für Presbyope entscheidet die **Zwischenzone** der Brille.
- **Gleitsicht:** Die Zwischenzone universeller Gleitsichtgläser ist schmal und liegt unterhalb der Blickmitte →
  Kopf in den Nacken, seitliche Unschärfe. 514 nutzt ±35 % der Breite und ±30 % der Höhe (EIG), 515
  Parabelbahnen über die volle Höhe – Blicke in die Randzonen erzwingen eher Kopf- statt Augenbewegungen.
  Bildschirm-Gleitsichtgläser senken die Kopfneigung am Monitor und verbessern die Monitorsicht (Jaschinski et
  al., 2015) → `presbyopie_gleitsicht`.
- **Sehwinkel der Reize (Desktop 24″ FHD, 60 cm, ≈ 38 px/°; EIG):** Mikroziel 509 Ø 10–20 px ≈ 0,3–0,5°
  (16–32′); Ziele in 511–514 Ø ≈ 16–52 px ≈ 0,4–1,4°; 515 bis ≈ 1,7°. Die Ziele selbst liegen weit über der
  Sehschärfegrenze (1′ bei Visus 1,0). Die Präzisionsanforderung betrifft eher das Zentrieren auf wenige Pixel
  (1 px ≈ 1,6′) – dabei hilft eine scharfe Korrektur im Zwischenbereich, sie ersetzt aber die motorische
  Präzision nicht.
- **Stereosehen = 0** (2D-Canvas ohne Disparität).
- **Kein Sehtest:** Ergebnisse der Drills dürfen nicht als Aussage über Sehvermögen oder Blickmotorik gelten.
  Die Website schreibt selbst: „does not record eye position, diagnose … or replace clinician-directed vision
  therapy“.

---

## D) Literaturliste (nur geprüfte Einträge)

**Website-Quellen** sind mit ◆ markiert. Prüfvermerke siehe Kopf. Alle DOIs wurden am 29.09.2026 per Crossref
aufgelöst.

- ◆ Accot, J., & Zhai, S. (1997). Beyond Fitts’ law: Models for trajectory-based HCI tasks. In *Proceedings of the ACM SIGCHI Conference on Human Factors in Computing Systems (CHI ’97)* (S. 295–302). ACM. https://doi.org/10.1145/258549.258760 — CR; Inhalt SEK (Abstract über APIs nicht verfügbar).
- Barnes, G. R., Donnelly, S. F., & Eason, R. D. (1987). Predictive velocity estimation in the pursuit reflex response to pseudo-random and step displacement stimuli in man. *The Journal of Physiology, 389*, 111–136. https://doi.org/10.1113/jphysiol.1987.sp016649 — REPO, CR.
- Bediou, B., Rodgers, M. A., Tipton, E., Mayer, R. E., Green, C. S., & Bavelier, D. (2023). Effects of action video game play on cognitive skills: A meta-analysis. *Technology, Mind, and Behavior, 4*(1), 28–48. https://doi.org/10.1037/tmb0000102 — CR, AB (OpenAlex).
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 — REPO, CR.
- Boot, W. R., Kramer, A. F., Simons, D. J., Fabiani, M., & Gratton, G. (2008). The effects of video game playing on attention, memory, and executive control. *Acta Psychologica, 129*(3), 387–398. https://doi.org/10.1016/j.actpsy.2008.09.005 — CR, AB.
- Brenner, E., Rodriguez, I. A., Muñoz, V. E., Schootemeijer, S., Mahieu, Y., Veerkamp, K., Zandbergen, M., van der Zee, T., & Smeets, J. B. J. (2016). How can people be so good at intercepting accelerating objects if they are so poor at visually judging acceleration? *i-Perception, 7*(1), 2041669515624317. https://doi.org/10.1177/2041669515624317 — CR, AB.
- Brenner, E., & Smeets, J. B. J. (1997). Fast responses of the human hand to changes in target position. *Journal of Motor Behavior, 29*(4), 297–310. https://doi.org/10.1080/00222899709600017 — CR, AB.
- Brenner, E., & Smeets, J. B. J. (2015). How people achieve their amazing temporal precision in interception. *Journal of Vision, 15*(3):8. https://doi.org/10.1167/15.3.8 — REPO, CR.
- Brenner, E., Smeets, J. B. J., & de Lussanet, M. H. E. (1998). Hitting moving targets: Continuous control of the acceleration of the hand on the basis of the target’s velocity. *Experimental Brain Research, 122*(4), 467–474. https://doi.org/10.1007/s002210050535 — REPO, CR.
- Casiez, G., Vogel, D., Balakrishnan, R., & Cockburn, A. (2008). The impact of control-display gain on user performance in pointing tasks. *Human–Computer Interaction, 23*(3), 215–250. https://doi.org/10.1080/07370020802278163 — CR, AB (OpenAlex).
- Claypool, M., & Claypool, K. (2006). Latency and player actions in online games. *Communications of the ACM, 49*(11), 40–45. https://doi.org/10.1145/1167838.1167860 — CR, VT (Autor:innen-PDF, web.cs.wpi.edu).
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 — REPO, CR.
- Dahl, M., Tryding, M., Heckler, A., & Nyström, M. (2021). Quiet eye and computerized precision tasks in first-person shooter perspective esport games. *Frontiers in Psychology, 12*, 676591. https://doi.org/10.3389/fpsyg.2021.676591 — CR, AB.
- Danion, F. R., & Flanagan, J. R. (2018). Different gaze strategies during eye versus hand tracking of a moving target. *Scientific Reports, 8*, 10059. https://doi.org/10.1038/s41598-018-28434-6 — CR, AB.
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 — CR, AB.
- Deber, J., Jota, R., Forlines, C., & Wigdor, D. (2015). How much faster is fast enough? User perception of latency & latency improvements in direct and indirect touch. In *Proceedings of CHI ’15* (S. 1827–1836). ACM. https://doi.org/10.1145/2702123.2702300 — REPO, CR.
- Diamond, M. R., Ross, J., & Morrone, M. C. (2000). Extraretinal control of saccadic suppression. *The Journal of Neuroscience, 20*(9), 3449–3455. https://doi.org/10.1523/JNEUROSCI.20-09-03449.2000 — CR, AB.
- DiFrancisco-Donoghue, J., Balentine, J., Schmidt, G., & Zwibel, H. (2019). Managing the health of the eSport athlete: An integrated health management model. *BMJ Open Sport & Exercise Medicine, 5*(1), e000467. https://doi.org/10.1136/bmjsem-2018-000467 — CR, AB.
- ◆ Donders, F. C. (1969). On the speed of mental processes (W. G. Koster, Übers.). *Acta Psychologica, 30*, 412–431. https://doi.org/10.1016/0001-6918(69)90065-1 (Original 1868) — CR; Inhalt SEK (Standardliteratur: a-, b-, c-Reaktion).
- Donovan, I., Saul, M. A., DeSimone, K., Listman, J. B., Mackey, W. E., & Heeger, D. J. (2022). Assessment of human expertise and movement kinematics in first-person shooter games. *Frontiers in Human Neuroscience, 16*, 979293. https://doi.org/10.3389/fnhum.2022.979293 — CR, AB (Interessenkonflikt: Hersteller Statespace Labs).
- Dzhafarov, E. N., Sekuler, R., & Allik, J. (1993). Detection of changes in speed and direction of motion: Reaction time analysis. *Perception & Psychophysics, 54*(6), 733–750. https://doi.org/10.3758/BF03211798 — CR, AB.
- Elliott, D., Hansen, S., Grierson, L. E. M., Lyons, J., Bennett, S. J., & Hayes, S. J. (2010). Goal-directed aiming: Two components but multiple processes. *Psychological Bulletin, 136*(6), 1023–1044. https://doi.org/10.1037/a0020958 — CR, AB.
- Enge, S., Behnke, A., Fleischhauer, M., Küttler, L., Kliegel, M., & Strobel, A. (2014). No evidence for true training and transfer effects after inhibitory control training in young healthy adults. *Journal of Experimental Psychology: Learning, Memory, and Cognition, 40*(4), 987–1001. https://doi.org/10.1037/a0036165 — REPO, CR.
- Engel, K. C., & Soechting, J. F. (2000). Manual tracking in two dimensions. *Journal of Neurophysiology, 83*(6), 3483–3496. https://doi.org/10.1152/jn.2000.83.6.3483 — CR, AB.
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x — REPO, CR.
- ◆ Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 — CR; Inhalt über MacKenzie (2018).
- Forman, G. N., Nikitin, S. A., Lang, C. J., Gabriel, D. A., Sonne, M. W., Kociolek, A. M., & Holmes, M. W. R. (2025). Impact of repetitive mouse aiming on muscle fatigue and fine motor performance of the distal upper limb. *Journal of Electromyography and Kinesiology, 82*, 102992. https://doi.org/10.1016/j.jelekin.2025.102992 — CR, AB.
- Fricke, T. R., Tahhan, N., Resnikoff, S., Papas, E., Burnett, A., Ho, S. M., Naduvilath, T., & Naidoo, K. S. (2018). Global prevalence of presbyopia and vision impairment from uncorrected presbyopia: Systematic review, meta-analysis, and modelling. *Ophthalmology, 125*(10), 1492–1499. https://doi.org/10.1016/j.ophtha.2018.04.013 — REPO, CR.
- Gauthier, G. M., Vercher, J.-L., Mussa Ivaldi, F., & Marchetti, E. (1988). Oculo-manual tracking of visual targets: Control learning, coordination control and coordination model. *Experimental Brain Research, 73*(1), 127–137. https://doi.org/10.1007/BF00279667 — CR, AB.
- ◆ Green, C. S., & Bavelier, D. (2003). Action video game modifies visual selective attention. *Nature, 423*(6939), 534–537. https://doi.org/10.1038/nature01647 — CR, AB.
- Gribble, P. L., Mullin, L. I., Cothros, N., & Mattar, A. (2003). Role of cocontraction in arm movement accuracy. *Journal of Neurophysiology, 89*(5), 2396–2405. https://doi.org/10.1152/jn.01020.2002 — CR, AB.
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 — REPO, CR.
- ◆ (nur Text, 511) Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology, 4*(1), 11–26. https://doi.org/10.1080/17470215208416600 — CR, AB (OpenAlex).
- Ivkovic, Z., Stavness, I., Gutwin, C., & Sutcliffe, S. (2015). Quantifying and mitigating the negative effects of local latencies on aiming in 3D shooter games. In *Proceedings of CHI ’15* (S. 135–144). ACM. https://doi.org/10.1145/2702123.2702432 — CR, AB (OpenAlex).
- Jaschinski, W., König, M., Mekontso, T. M., Ohlendorf, A., & Welscher, M. (2015). Comparison of progressive addition lenses for general purpose and for computer vision: An office field study. *Clinical and Experimental Optometry, 98*(3), 234–243. https://doi.org/10.1111/cxo.12259 — CR, AB.
- Jaschinski-Kruza, W. (1991). Eyestrain in VDU users: Viewing distance and the resting position of ocular muscles. *Human Factors, 33*(1), 69–83. https://doi.org/10.1177/001872089103300106 — CR, AB.
- Ke, S. R., Lam, J., Pai, D. K., & Spering, M. (2013). Directional asymmetries in human smooth pursuit eye movements. *Investigative Ophthalmology & Visual Science, 54*(6), 4409–4421. https://doi.org/10.1167/iovs.12-11369 — CR, AB.
- Ko, H.-K., Poletti, M., & Rucci, M. (2010). Microsaccades precisely relocate gaze in a high visual acuity task. *Nature Neuroscience, 13*(12), 1549–1553. https://doi.org/10.1038/nn.2663 — CR, AB.
- Koshizawa, R., Ledvina, Z., Pospíšil, J., & Peleška, O. (2026). Enhanced predictive saccade strategies and spatial prediction accuracy in first-person shooter-specialized players. *Frontiers in Systems Neuroscience, 20*, 1775973. https://doi.org/10.3389/fnsys.2026.1775973 — CR, AB (kleine Stichprobe).
- Kowler, E., Rubinstein, J. F., Santos, E. M., & Wang, J. (2019). Predictive smooth pursuit eye movements. *Annual Review of Vision Science, 5*, 223–246. https://doi.org/10.1146/annurev-vision-091718-014901 — REPO, CR.
- ◆ Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 — CR, AB.
- Lamers James, R. G., & O’Connor, A. R. (2023). Impact of focus of attention on aiming performance in the first-person shooter videogame Aim Lab. *PLOS ONE, 18*(7), e0288937. https://doi.org/10.1371/journal.pone.0288937 — CR, AB.
- ◆ Land, M. F., & McLeod, P. (2000). From eye movements to actions: How batsmen hit the ball. *Nature Neuroscience, 3*(12), 1340–1345. https://doi.org/10.1038/81887 — CR, AB. **Website-DOI 10.1038/81861 falsch (404).**
- Li, L., Chen, R., & Chen, J. (2016). Playing action video games improves visuomotor control. *Psychological Science, 27*(8), 1092–1108. https://doi.org/10.1177/0956797616650300 — CR, AB.
- Lisberger, S. G. (2010). Visual guidance of smooth-pursuit eye movements: Sensation, action, and what happens in between. *Neuron, 66*(4), 477–491. https://doi.org/10.1016/j.neuron.2010.03.027 — CR, AB.
- Listman, J. B., Tsay, J. S., Kim, H. E., Mackey, W. E., & Heeger, D. J. (2021). Long-term motor learning in the “wild” with high volume video game data. *Frontiers in Human Neuroscience, 15*, 777779. https://doi.org/10.3389/fnhum.2021.777779 — CR, AB (vom Hersteller Statespace Labs finanziert).
- Liu, S., Claypool, M., Kuwahara, A., Sherman, J., & Scovell, J. J. (2021). Lower is better? The effects of local latencies on competitive first-person shooter game players. In *Proceedings of CHI ’21* (S. 1–12). ACM. https://doi.org/10.1145/3411764.3445245 — CR, AB (Semantic Scholar).
- ◆ Logan, G. D., & Cowan, W. B. (1984). On the ability to inhibit thought and action: A theory of an act of control. *Psychological Review, 91*(3), 295–327. https://doi.org/10.1037/0033-295X.91.3.295 — CR; Inhalt SEK über Verbruggen & Logan (2008, Volltext PMC).
- Louis, E. D., & Ferreira, J. J. (2010). How common is the most common adult movement disorder? Update on the worldwide prevalence of essential tremor. *Movement Disorders, 25*(5), 534–541. https://doi.org/10.1002/mds.22838 — CR, AB.
- MacKenzie, I. S. (2018). Fitts’ law. In K. L. Norman & J. Kirakowski (Hrsg.), *The Wiley handbook of human computer interaction* (S. 347–370). Wiley. https://doi.org/10.1002/9781118976005.ch17 — CR; Zahlen VT (Autorenfassung yorku.ca/mack/hhci2018.html).
- ◆ Martinez-Conde, S., Macknik, S. L., & Hubel, D. H. (2004). The role of fixational eye movements in visual perception. *Nature Reviews Neuroscience, 5*(3), 229–240. https://doi.org/10.1038/nrn1348 — CR; Inhalt SEK (kein Abstract in PubMed).
- McIntyre, J., Zago, M., Berthoz, A., & Lacquaniti, F. (2001). Does the brain model Newton’s laws? *Nature Neuroscience, 4*(7), 693–694. https://doi.org/10.1038/89477 — CR; Inhalt SEK.
- MDN Web Docs. (o. J.-a). *Performance: now() method*. Mozilla. Abgerufen am 29.09.2026 von https://developer.mozilla.org/en-US/docs/Web/API/Performance/now — WEB.
- MDN Web Docs. (o. J.-b). *Element: requestPointerLock() method*. Mozilla. Abgerufen am 29.09.2026 von https://developer.mozilla.org/en-US/docs/Web/API/Element/requestPointerLock — WEB.
- ◆ Meyer, D. E., Abrams, R. A., Kornblum, S., Wright, C. E., & Smith, J. E. K. (1988). Optimality in human motor performance: Ideal control of rapid aimed movements. *Psychological Review, 95*(3), 340–370. https://doi.org/10.1037/0033-295X.95.3.340 — CR, AB (OpenAlex).
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 — REPO, CR.
- Miall, R. C., Weir, D. J., & Stein, J. F. (1993). Intermittency in human manual tracking tasks. *Journal of Motor Behavior, 25*(1), 53–63. https://doi.org/10.1080/00222895.1993.9941639 — CR, AB.
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 — REPO, CR.
- Nieuwenhuys, A., Savelsbergh, G. J. P., & Oudejans, R. R. D. (2012). Shoot or don’t shoot? Why police officers are more inclined to shoot when they are anxious. *Emotion, 12*(4), 827–833. https://doi.org/10.1037/a0025699 — CR, AB.
- Park, E., Lee, S., Ham, A., Choi, M., Kim, S., & Lee, B. (2021). Secrets of Gosu: Understanding physical combat skills of professional players in first-person shooters. In *Proceedings of CHI ’21* (S. 1–14). ACM. https://doi.org/10.1145/3411764.3445217 — CR, AB (Semantic Scholar).
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 — CR, AB.
- ◆ Posner, M. I., & Petersen, S. E. (1990). The attention system of the human brain. *Annual Review of Neuroscience, 13*, 25–42. https://doi.org/10.1146/annurev.ne.13.030190.000325 — CR; Inhalt SEK.
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 — REPO, CR.
- Raethjen, J., Pawlas, F., Lindemann, M., Wenzelburger, R., & Deuschl, G. (2000). Determinants of physiologic tremor in a large normal population. *Clinical Neurophysiology, 111*(10), 1825–1837. https://doi.org/10.1016/S1388-2457(00)00384-9 — CR, AB.
- ◆ Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 — CR; Inhalt SEK (Original-PDF nur mit Captcha). **Website-Titel falsch („smooth pursuit“).**
- Riviere, C. N., & Thakor, N. V. (1996). Effects of age and disability on tracking tasks with a computer mouse: Accuracy and linearity. *Journal of Rehabilitation Research and Development, 33*(1), 6–15. PMID 8868412 — Zeitschrift ohne DOI; PubMed-Eintrag und Abstract geprüft (AB).
- Rogers, E. J., Trotter, M. G., Johnson, D., Desbrow, B., & King, N. (2024). KovaaK’s aim trainer as a reliable metrics platform for assessing shooting proficiency in esports players: A pilot study. *Frontiers in Sports and Active Living, 6*, 1309991. https://doi.org/10.3389/fspor.2024.1309991 — CR, AB.
- ◆ Rolfs, M. (2009). Microsaccades: Small steps on a long way. *Vision Research, 49*(20), 2415–2441. https://doi.org/10.1016/j.visres.2009.08.010 — CR, AB.
- Rottach, K. G., Zivotofsky, A. Z., Das, V. E., Averbuch-Heller, L., Discenna, A. O., Poonyathalang, A., & Leigh, R. J. (1996). Comparison of horizontal, vertical and diagonal smooth pursuit eye movements in normal human subjects. *Vision Research, 36*(14), 2189–2195. https://doi.org/10.1016/0042-6989(95)00302-9 — CR, AB.
- Sheppard, A. L., & Wolffsohn, J. S. (2018). Digital eye strain: Prevalence, measurement and amelioration. *BMJ Open Ophthalmology, 3*(1), e000146. https://doi.org/10.1136/bmjophth-2018-000146 — CR, AB.
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do “brain-training” programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 — REPO, CR.
- Smith, M. W., Sharit, J., & Czaja, S. J. (1999). Aging, motor control, and the performance of computer mouse tasks. *Human Factors, 41*(3), 389–396. https://doi.org/10.1518/001872099779611102 — CR, AB.
- Soukoreff, R. W., & MacKenzie, I. S. (2004). Towards a standard for pointing device evaluation, perspectives on 27 years of Fitts’ law research in HCI. *International Journal of Human-Computer Studies, 61*(6), 751–789. https://doi.org/10.1016/j.ijhcs.2004.09.001 — CR; Zahl (3,7–4,9 bit/s) über MacKenzie (2018).
- Stoffregen, T. A., Faugloire, E., Yoshida, K., Flanagan, M. B., & Merhi, O. (2008). Motion sickness and postural sway in console video games. *Human Factors, 50*(2), 322–331. https://doi.org/10.1518/001872008X250755 — CR, AB.
- ◆ Treisman, A. M., & Gelade, G. (1980). A feature-integration theory of attention. *Cognitive Psychology, 12*(1), 97–136. https://doi.org/10.1016/0010-0285(80)90005-5 — CR; Inhalt SEK (PubMed 7351125, Übersichten).
- Tynan, P. D., & Sekuler, R. (1982). Motion processing in peripheral vision: Reaction time and perceived velocity. *Vision Research, 22*(1), 61–68. https://doi.org/10.1016/0042-6989(82)90167-5 — CR, AB.
- Verbruggen, F., & Logan, G. D. (2008). Response inhibition in the stop-signal paradigm. *Trends in Cognitive Sciences, 12*(11), 418–424. https://doi.org/10.1016/j.tics.2008.07.005 — CR, AB, VT (PMC2709177).
- Warburton, M., Campagnoli, C., Mon-Williams, M., Mushtaq, F., & Morehead, J. R. (2023). Kinematic markers of skill in first-person shooter video games. *PNAS Nexus, 2*(8), pgad249. https://doi.org/10.1093/pnasnexus/pgad249 — CR, AB.
- Warm, J. S., Parasuraman, R., & Matthews, G. (2008). Vigilance requires hard mental work and is stressful. *Human Factors, 50*(3), 433–441. https://doi.org/10.1518/001872008X312152 — CR, AB.
- Wessel, J. R. (2018). Prepotent motor activity and inhibitory control demands in different variants of the go/no-go paradigm. *Psychophysiology, 55*(3), e12871. https://doi.org/10.1111/psyp.12871 — REPO, CR.
- Whisenand, T. G., & Emurian, H. H. (1996). Effects of angle of approach on cursor movement with a mouse: Consideration of Fitts’ law. *Computers in Human Behavior, 12*(3), 481–495. https://doi.org/10.1016/0747-5632(96)00020-9 — CR; Inhalt SEK (Websuche; Abstract nicht über API).
- ◆ Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 — CR, AB, VT (PMC4374455: Hardwareverzögerungen).
- ◆ Woodworth, R. S. (1899). Accuracy of voluntary movement. *The Psychological Review: Monograph Supplements, 3*(3), i–114. https://doi.org/10.1037/h0092992 — CR; Inhalt über Elliott et al. (2010).
- Yang, L., Huang, Y., Li, P., Tang, H., & Jin, X. (2026). Spatially modulated visuomotor efficiency in FPS players: Eye-tracking evidence from a Go/No-Go target acquisition task. *Cognitive Research: Principles and Implications, 11*, 42. https://doi.org/10.1186/s41235-026-00738-6 — CR, AB.

**Nur im Text der Website genannt, geprüft, aber nicht verwenden bzw. nur mit Einschränkung:**
- Broadbent, D. E. (1958). *Perception and communication*. Pergamon Press. Crossref 10.1037/10037-000 — Buch, Inhalt nicht eingesehen (auditive Filtertheorie).
- Treisman, A. M. (1964). Selective attention in man. *British Medical Bulletin, 20*(1), 12–16. https://doi.org/10.1093/oxfordjournals.bmb.a070274 — CR; unklar, ob die Website diese oder eine andere 1964er-Arbeit meint.
- „Cavanagh, P. R., et al. (1984)“ (Seite 515) — **nicht identifizierbar.**

**Zählung:** 15 Website-Quellen aus den Quellenlisten geprüft (davon 1 falsche DOI, 1 falscher Titel), dazu 4 nur
im Text genannte Angaben (Hick 1952 korrekt; Broadbent 1958 und Treisman 1964 nur eingeschränkt zuordenbar;
Cavanagh 1984 nicht identifizierbar). **68 weitere geprüfte Quellen** (davon 2 MDN-Webseiten und 1 Zeitschriftenartikel
ohne DOI, geprüft über PMID).

---

## E) Anhang für die Autor:innen

### E1 Anknüpfungspunkte aus dem Spielcode (EIG – nur Mechanik und Parameter, kein Originalcode)

Die Werte sind in Canvas-Pixeln angegeben; die Umrechnung setzt einen 24″-FHD-Monitor bei 60 cm voraus
(≈ 38 px/°). Die Parameter steigen mit Level und Combo; „a → b“ bedeutet leicht → schwer.

| Übung | Parameter (Code) | Umrechnung / Bezug zur Literatur |
|---|---|---|
| 509 | Ankerradius 24 → 12 px (min. 10), Mikroradius 10 → 5,5 px (min. 5), Lebensdauer 1 800 → 500 ms (min. 380), Abstand Anker→Mikro 55–145 px | Mikroziel Ø 10–20 px ≈ 0,3–0,5°, Abstand ≈ 1,5–3,8°. Eine Lebensdauer ≤ 500 ms umfasst nur RT (≈ 213–231 ms; F42) plus eine Korrektur (≈ 110 ms; F06) → sehr hoher Zeitdruck. |
| 510 | Radius rot 18 / gelb 22 / grün 24 px; Geschwindigkeit 35 → 130 px/s (×1,2 mit Combo); Lebensdauer gelb 2,4 → 1,4 s, rot 2,2 → 1,4 s; neues Ziel alle 1,1 → 0,5 s | ≈ 1–4°/s, also langsam; die Anforderung liegt in Entscheidung und Zielen, nicht im Nachführen. Farbe ist das einzige Merkmal (C3). |
| 511 | Peek-Dauer 1 400 → 420 ms (min. 220), Wartezeit 350–1 600 ms (min. 200/400), Zielradius 26 → 12 px, Fake-Peek-Anteil 0 → max. 35 % | Eine Peek-Dauer von 220 ms liegt unter der mittleren einfachen RT (F42) → auf hohen Stufen nur mit Antizipation lösbar. Fake-Peeks bis 35 % liegen über dem 20-%-Kriterium für echte Hemmungsanforderung (F48). |
| 512 | Radius 16 → 9,5 px (min. 8,5); Geschwindigkeit 280 → 700 px/s (×1,2); Richtungswechsel alle 450 → 150 ms (min. 120) | ≈ 7–22°/s. Umkehr alle 120–450 ms entspricht ≈ 1–4 Hz – und liegt damit unter bzw. an der Hand-Reaktionslatenz (110–200 ms; F06, F34) und über der Maus-Tracking-Bandbreite (≈ 2 Hz; F33) → rein reaktives Folgen ist auf hohen Stufen kaum möglich, Mittelung und Antizipation dominieren. |
| 513 | Radius wie 512; Geschwindigkeitsfaktor 1 → 2,6; Zickzack-Wechsel alle 1,2 → 0,25 s (min. 0,2); Lebensdauer 4,2 → 1,8 s | Längere Segmente als 512 → Aufholsakkaden und Handkorrekturen (≈ 125 ms, ≈ 110 ms) gehen sich eher aus; „Mitte halten“ passt zur intermittierenden Regelung (F31). |
| 514 | x = Mitte + sin(ωx·t) · 0,35 · Breite; y = Mitte + cos(ωy·t) · 0,3 · Höhe; ωx ≈ 0,24–2,2 rad/s, ωy ≈ 0,56–6 rad/s; Radius 15 → 9,5 px (min. 8) | ≈ 0,04–0,35 Hz horizontal, 0,09–0,96 Hz vertikal. Spitzengeschwindigkeit bei 1 920 × 1 080 px ≈ 4–38°/s (x) bzw. 5–51°/s (y) → auf hohen Stufen deutlich über dem Bereich, in dem der Gain hoch bleibt (F18–F20). Zwei feste Frequenzen ergeben eine periodische, lernbare Bahn (F21). |
| 515 | Radius 32 → 12 px (min. 10); Schwerkraft 700 → 1 100 px/s² (×1,15); Abwurf 650 → 950 px/s | Senkrechtgeschwindigkeit ≈ 17–29°/s; die Beschleunigung ändert sich mit dem Level – laut F38 wird Beschleunigung vor allem über Wiederholung *derselben* Beschleunigung gelernt. Die vertikale Folgebewegung ist schwächer, aufwärts am schwächsten (F25, F26). |
| alle | `requestPointerLock()` ohne `unadjustedMovement`; Bildschirmwackeln 6–12 px bei Treffern und Fehlern; Erkennung reiner Touch-Geräte (`pointer: fine` fehlt) | Rohdaten-Aussage der Website nicht gedeckt (F60); Wackeln ist klein, bei Empfindlichkeit aber zu beachten; Tablet ohne Umbau nicht unterstützt. |

### E2 Tablet-Einschätzung (ehrlich)

- **Original:** Alle sieben Drills setzen relative Mausbewegung mit Pointer Lock voraus. Auf dem Tablet gibt es
  das nicht; der Finger verdeckt das Ziel, und es gibt kein Fadenkreuz, das man „hält“ → Tablet-Eignung `nein`.
- **Mögliche Blickfit-Umsetzung (`mit_anpassung`):** Die Tracking-Drills (512–515) lassen sich als
  Finger-Nachführaufgabe umsetzen. Manuelles 2D-Tracking mit dem Finger auf einem Touchmonitor ist ein
  etabliertes Laborparadigma (Engel & Soechting, 2000). Zu beachten sind Touch-Latenzen von 50–200 ms (F62) und
  die Verdeckung durch den Finger. 509 und 511 würden zu Tipp-Aufgaben (Fitts mit Finger bzw. Koinzidenz-Timing)
  und damit zu anderen Übungen. 510 ist als Tippen auf bewegte, farbcodierte Ziele machbar – dann aber mit
  Form-Kodierung statt nur Farbe.

### E3 Offene Punkte und Unsicherheiten

1. Rashbass (1961), Martinez-Conde et al. (2004), Treisman & Gelade (1980), Posner & Petersen (1990), Donders
   (1969), Accot & Zhai (1997), McIntyre et al. (2001) und Whisenand & Emurian (1996): Die Inhalte stützen sich
   auf Sekundärquellen oder Standardwissen, weil kein Abstract bzw. Volltext abrufbar war (Vermerk SEK).
2. Für die Stoppzeit (SSRT) wird bewusst **keine** Zahl angegeben; in den geprüften Abstracts stand kein
   Normwert.
3. Die Umrechnungen in °/s (E1) setzen Vollbild auf einem 24″-FHD-Monitor bei 60 cm voraus. Die Canvas-Größe der
   Vorlage hängt vom Fenster ab (Container im 16:9-Format oder Vollbild).
4. Die Aussagen zur geringen Vektion (keine 3D-Kamera) und zur fehlenden Blitzgefahr sind Code-Beobachtungen
   ohne Messung; die Autor:innen sollten die Rückmeldeeffekte selbst prüfen.
5. Die Esports-Studien sind klein (N = 8–61) oder vom Hersteller beeinflusst (Aim-Lab-Studien); sie belegen
   Zusammenhänge, keine Wirkung von Browserdrills.
