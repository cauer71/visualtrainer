# Literaturbasis W03 – Reaktionsgeschwindigkeit (Katalog 301–308)

Stand: 29.09.2026 · Gruppe W03 (`reaction-speed`) · Arbeitsgrundlage für die Autor-Agenten der Einträge
301 `reaction-time-test`, 302 `reflex-training-drill`, 303 `saccadic-gallery`, 304 `fps-tracking-trainer`,
305 `visual-tracking-speed-test`, 306 `reaction-game`, 307 `market-doors-pursuit`, 308 `barrier-sequence-pursuit`.

**Prüfmethode.** Jede DOI wurde am 29.09.2026 über `api.crossref.org/works/<DOI>` abgefragt (Titel, Autor:innen,
Jahr, Zeitschrift, Band, Seiten). Inhalte wurden über PubMed-Abstracts, PMC-/Verlags-Volltexte oder frei zugängliche
Autorenfassungen geprüft; der Prüfumfang steht bei jeder Quelle in Teil D. Quellen, die bereits in
`docs/wissenschaft/01–04` geprüft wurden, sind als „Dossier 0X“ gekennzeichnet; ihre DOI wurde heute erneut per Crossref
bestätigt, ihre Zahlen stammen aus dem Dossier. **Eigene Rechnungen** sind als solche markiert.

**Legende Prüfvermerke:** ✓ DOI/Angabe stimmt · ✗ fehlerhaft (Korrektur angegeben) · „ja/teilweise/nein“ = stützt die
Aussage, für die die Website die Quelle anführt.

> Rechtlicher Rahmen (gilt für alle Einträge): Die Aussagen hier sind Trainings- und Produktinformation, keine
> medizinische Aussage. Keine der geprüften Quellen belegt, dass eine der acht Browserübungen Sehen, Reaktion im
> Straßenverkehr oder Sportleistung verbessert.

---

## 0. Vorab: Was die Übungen laut ausgeliefertem Code tatsächlich tun (Kurzüberblick)

*Nur als Kontext für die Literaturauswahl. Die Autor-Agenten müssen die Mechanik selbst prüfen. Grundlage: die
spielspezifischen Chunks, heruntergeladen am 29.09.2026 (301: `11618-…`, 302: `11411-…`, 303: `7211-…`, 304: `70768-…`,
305: `1163-…`, 306: `63062-…`, 307: `74130-…`, 308: `34928-…`). Es wurde kein Code übernommen.*

| Nr | Kern der Mechanik laut Code | Folge für die Literatur |
|---|---|---|
| 301 | **Keine Reaktionszeitmessung**, sondern **Zeitintervall-Produktion**: Eine Zielzeit (1,000 s bis min(8 s; 1,8 s + 0,45 s × Level)) wird angezeigt, dann läuft unsichtbar die Zeit; man klickt, wenn man glaubt, dass sie erreicht ist. Toleranz ±(50 ms + 5 % der Zielzeit); „EXACT“ bei ≤ 10 ms Fehler. Während des Wartens pulsiert ein Ring im **1-s-Takt** (visueller Sekundentakt). Fehlversuch: rote Vollflächen-Überlagerung (Deckkraft 0,25, klingt in ≈ 125 ms ab) plus Bildschirmwackeln. | Der Seitentext (visuelle Reaktionszeit, 200–250 ms, Hardware-Latenz) passt nicht zur Aufgabe. Relevant sind **Zeitwahrnehmung/Intervall-Timing** (B7), nicht Hick oder einfache RT. |
| 302 | 2–7 gleichzeitige Ziele (Radius 26 → 7 px, Lebensdauer 1.900 → 120 ms, Nachschubabstand 220 → 20 ms, Trefferzugabe 14 → 2 px), Klick auf Ziele. | Visuelle Suche/Priorisierung, Folgebewegungen, Fitts, Speed-Accuracy (B2, B3, B6). |
| 303 | Immer **ein** Ziel an einem Knoten eines 4 × 3-Rasters (auf kleinen Bildschirmen 3 × 3), Raster über 14–86 % der Breite und 18–82 % der Höhe, nie zweimal derselbe Knoten; Klick. Radius 28 → 7 px, Lebensdauer 1.300 → 90 ms. **Kein Fixationspunkt, kein Gap-Paradigma, keine Blickmessung.** | Sakkaden (Amplitude, Kopfbeteiligung, Gleitsicht), Auge-Hand-Koordination; Express-Sakkaden-Aussagen der Website sind hier nicht anwendbar (B4). |
| 304 | Ein Ziel bewegt sich horizontal (200 → 850 px/s), wechselt in Abständen von 700–1.100 ms (→ 80–160 ms) die Richtung; gewertet wird der **Klick** auf das Ziel (Lebensdauer 1.300 → 90 ms), nicht kontinuierliches Nachführen. | Seitentext spricht von „Tracking/Fadenkreuz halten“; Code = Abfangklick auf bewegtes Ziel. Pursuit + Interzeption (B5). |
| 305 | Ziel bewegt sich geradlinig mit Wandreflexion (90 → 750 px/s), Klick, Lebensdauer 1.300 → 90 ms. | Interzeption bewegter Ziele (B5, B6). |
| 306 | Ziele fallen in Bahnen, Geschwindigkeit je Ziel 0,85–1,15 × Grundwert (180 → 850 px/s), **innerhalb eines Falls konstant** (keine Beschleunigung, obwohl der Text „beschleunigte Ziele“ nennt). | Interzeption, Antizipation (B5). |
| 307 | 5 Türen in einer Reihe; ein Ziel erscheint an einer **zufällig** gewählten Tür (nicht in fester Reihenfolge, obwohl der Text eine Links-rechts-Scanroute empfiehlt). | Räumliche Unsicherheit, Aufmerksamkeitsausrichtung, Fitts (B2, B6). |
| 308 | Ziel taucht an der linken oder rechten Kante einer zufällig gewählten Barriere auf, Höhe 20–80 % der Barriere. | Erwartung/Aufmerksamkeit an Kanten („Pre-Aim“), einfache vs. Wahlreaktion (B1, B2). |

**Schwierigkeitsverlauf (302–308, aus dem Code):** Fortschritt p = (Level − 1)/14; Wert = Endwert + (Startwert − Endwert)
· e^(−1,43 · k(p)) mit k(p) = p(p + 0,6)/1,6 für p ≤ 1. Bei Level 15 (p = 1) ist also erst 76 % des Weges zum Endwert
erreicht. Zusätzlich verkürzt der Combo-Faktor (bis −32 % Lebensdauer, bis −25 % Radius, bis +40 % Tempo).
*Eigene Rechnung* (Werte 303–308):

| Level | Lebensdauer ohne / mit max. Combo | Radius ohne / mit max. Combo | Tempo 304 ohne / mit max. Combo |
|---|---|---|---|
| 1 | 1.300 / 884 ms | 28 / 21 px | 200 / 280 px/s |
| 5 | ≈ 1.056 / 718 ms | ≈ 24 / 18 px | ≈ 330 / 460 px/s |
| 10 | ≈ 683 / 464 ms | ≈ 17 / 13 px | ≈ 530 / 740 px/s |
| 15 | ≈ 379 / 258 ms | ≈ 12 / 9 px | ≈ 695 / 973 px/s |

**Sehwinkel (eigene Rechnung, Formel θ = 2·atan(s/2d)):**
- *Desktop, 24″-FHD (0,277 mm/px), 60 cm:* 37,8 px/°. Ziel-Ø 56 px = 15,5 mm = 1,5°; 24 px = 6,6 mm = 0,63°;
  14 px = 3,9 mm = 0,37°. 695 px/s ≈ 18°/s; 973 px/s ≈ 26°/s.
- *Tablet, iPad 11″ (0,192 mm pro CSS-px), 40 cm:* 36,4 px/°. 56 px = 10,8 mm = 1,5°; 24 px = 4,6 mm = 0,66°;
  695 px/s ≈ 19°/s. Die Touch-Mindestgröße von 9,2 mm (Parhi et al., 2006) wird ohne Combo ab etwa Level 5
  (Ø ≈ 47 px ≈ 9,1 mm), mit maximaler Combo schon ab Level 1 (Ø 42 px ≈ 8,1 mm) unterschritten.
- *303, Sprungweiten:* Größter horizontaler Sprung = 72 % der Bildbreite. Desktop (53 cm breit, 60 cm): ≈ 35°; eine
  Rasterspalte (24 %) ≈ 12°. iPad quer (≈ 22,7 cm, 40 cm): ≈ 23°; eine Spalte ≈ 7,8°.
- *301, Toleranz relativ:* bei 1 s Zielzeit ±100 ms (10 %), bei 8 s ±450 ms (5,6 %); „EXACT“ (±10 ms) = 1 % bzw. 0,1 %.
- *301, rote Überlagerung:* 25 % Rot (#ef4444) über Fast-Schwarz (#050508) ergibt eine relative Leuchtdichte von
  ≈ 0,017 gegenüber ≈ 0,002 → ΔL ≈ 0,015. Rotanteil R/(R+G+B) ≈ 0,6 (sRGB-Werte) bzw. ≈ 0,76 (linearisiert). Das liegt
  unter den WCAG-Schwellen für einen allgemeinen Blitz (ΔL ≥ 0,10) und für einen „roten Blitz“ (Rotanteil ≥ 0,8); es ist
  ein Einzelereignis pro Fehlversuch. *Grobe eigene Rechnung, ohne Messung am Bildschirm.*
- *Alle Winkelangaben gelten für ein Spielfeld in voller Bildbreite;* ist die Canvas kleiner, werden Sprünge und Ziele
  entsprechend kleiner.

**Ab Level ≈ 15 mit Combo liegt die Ziel-Lebensdauer (≈ 260 ms) im Bereich der einfachen Reaktionszeit (≈ 213–231 ms;
Woods et al., 2015) plus Zeigerbewegung.** Treffer sind dann nur noch mit Vorab-Positionierung/Antizipation möglich –
die Übungen messen in hohen Levels also zunehmend Strategie und nicht „Reflexe“.

---

## A. Website-Quellen: Prüftabelle

### A.1 Alle auf den acht Seiten genannten Quellen (Metadaten-Prüfung)

| # | Angabe der Website | DOI-/Angabenprüfung | genannt bei |
|---|---|---|---|
| W1 | Kosinski, R. J. (2008). A literature review on reaction time. Clemson University (ohne DOI) | **nicht per DOI prüfbar.** Unbegutachtetes Online-Skript für Studierende. Geprüft wurde die zugängliche Fassung „Last updated: September 2013“ (Kopie: http://www.cognaction.org/cogs105/readings/clemson.rt.pdf, 19 Seiten); eine Fassung von 2008 wurde nicht gefunden. | 301, 302, 305, 306, 308 |
| W2 | Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. doi 10.3389/fnhum.2015.00131 | ✓ (Crossref); Volltext PMC4374455 gelesen | alle 8 |
| W3 | Jain, A., Bansal, R., Kumar, A., & Singh, K. D. (2015). … *International Journal of Applied and Basic Medical Research, 5*(2), 124–127. doi 10.4103/2229-516X.157168 | ✓; Volltext PMC4456887 gelesen | 301 |
| W4 | Shelton, J., & Kumar, G. P. (2010). Comparison between auditory and visual simple reaction times. *Neuroscience & Medicine, 1*(1), 30–32. doi 10.4236/nm.2010.11004 | ✓; Abstract auf der Verlagsseite gelesen | 301 |
| W5 | Dye, M. W. G., Green, C. S., & Bavelier, D. (2009). Increasing speed of processing with action video games. *Current Directions in Psychological Science, 18*(6), 321–326. doi 10.1111/j.1467-8721.2009.01660.x | ✓; Volltext PMC2871325 gelesen | 301 |
| W6 | Der, G., & Deary, I. J. (2006). Age and sex differences in reaction time in adulthood … *Psychology and Aging, 21*(1), 62–73. doi 10.1037/0882-7974.21.1.62 | ✓ (Erratum 2009, 24(1), 229); Abstract | 301 |
| W7 | Smith, A. (2002). Effects of caffeine on human behavior. *Food and Chemical Toxicology, 40*(9), 1243–1255. doi 10.1016/S0278-6915(02)00096-0 | ✓; Abstract | 301 |
| W8 | Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology, 4*(1), 11–26. doi 10.1080/17470215208416600 | ✓; Inhalt über Dossier 04 und Proctor & Schneider (2018) | 302, 306 |
| W9 | Donders, F. C. (1868/1969). Over de snelheid … / On the speed of mental processes. *Acta Psychologica, 30*, 412–431. doi 10.1016/0001-6918(69)90065-1 | ✓ (englische Übersetzung von 1969); Inhalt nur über Sekundärquellen (Kosinski; Proctor & Schneider) | 302, 306, 307, 308 |
| W10 | Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin, 124*(3), 372–422. doi 10.1037/0033-2909.124.3.372 | ✓; nur Abstract (Volltext nicht frei zugänglich) | 303, 307 |
| W11 | Leigh, R. J., & Zee, D. S. (2015). *The Neurology of Eye Movements* (5th ed.). Oxford University Press. doi 10.1093/med/9780199969203.001.0001 | ✗ **DOI falsch** (Crossref 404). **Richtig: 10.1093/med/9780199969289.001.0001** (Crossref: Leigh & Zee, 2015, OUP). Lehrbuch, Inhalt nicht eingesehen. | 303 |
| W12 | Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. doi 10.1152/jn.00801.2003 | ✓; Abstract | 304, 305, 307 |
| W13 | Rashbass, C. (1961). The relationship between saccadic and smooth *pursuit* eye movements. *Journal of Physiology, 159*(2), 326–338. doi 10.1113/jphysiol.1961.sp006811 | ✗ **Titel ungenau**: richtig „… saccadic and smooth *tracking* eye movements“. DOI ✓. Nur Metadaten (Scan ohne Textlayer, kein Abstract); Inhalt (Step-Ramp-Paradigma) nur aus Sekundärliteratur bekannt. | 304, 305 |
| W14 | Green, C. S., & Bavelier, D. (2003). Action video game modifies visual selective attention. *Nature, 423*, 534–537. doi 10.1038/nature01647 | ✓ (Heft 6939); Abstract | 304 |
| W15 | „Fischer & Boch, 1984“ – **nur im Text** von 303 genannt, **nicht im Quellenverzeichnis** | ✗ **fehlende Angabe.** Existiert als Buchkapitel über **Affen**: Fischer, B., & Boch, R. (1984). Express-saccades of the monkey … *Advances in Psychology, 22*, 403–408. doi 10.1016/S0166-4115(08)61860-9 (✓ Crossref). Die Humanstudie ist Fischer & Ramsperger (1984), doi 10.1007/BF00231145. | 303 |

**Ergebnis Metadaten:** 15 verschiedene Quellen geprüft (14 aus den Quellenlisten, 1 nur im Text). **3 formal
fehlerhaft** (W11 falsche DOI, W13 falscher Titel, W15 ohne Literaturangabe); W1 ohne DOI und nur als spätere Fassung
auffindbar. Inhaltlich sind die meisten Quellen echt, werden aber für Aussagen angeführt, die sie **nicht oder nur
teilweise** stützen (siehe A.2).

### A.2 Stützt die Quelle die Aussage? – je Übung

#### 301 Reaktionstest (reaction-time-test)

| Aussage der Website | Quelle | stützt? | Begründung |
|---|---|---|---|
| Mittlere visuelle RT 200–250 ms; unter 180 ms „Elite“ | Kosinski | **teilweise** | Kosinski nennt als klassischen Wert ≈ 190 ms (Licht) bzw. ≈ 160 ms (Ton) für Studierende und ≈ 268 ms für Computermessungen in Clemson. Eine „Elite“-Grenze gibt es dort nicht. |
| Tabelle „< 150 ms Top 1 % / F1-Fahrer / Radiant“, „150–190 ms Top 5 %“ usw. | Kosinski; Woods | **nein** | Keine der beiden Quellen enthält Perzentile, Gaming-Ränge oder Daten zu F1-Fahrern. Woods: Mittelwert 231 ms (213 ms nach Hardwarekorrektur) bei 1.469 Erwachsenen. Die Seite sagt selbst, sie sammle keine Daten. |
| Weg Netzhaut → V1 → Motorkortex „≈ 200–250 ms“ | Kosinski | **teilweise** | Die Größenordnung stimmt. Woods zeigt aber: Das reine Entdecken dauert ≈ 131 ms und ist altersunabhängig, der Rest ist Motorik. |
| Tipp: „periphere Stäbchenzellen erfassen Lichtblitze schneller“ | – | **falsch** | Kosinski selbst: Reize auf Stäbchen (Peripherie) ergeben *langsamere* Reaktionen. Stäbchenvermittelte RT ist ≈ 20 ms länger als zapfenvermittelte (Cao et al., 2007). Am hellen Bildschirm arbeiten ohnehin die Zapfen. |
| Hören 140–170 ms, 30–50 ms schneller als Sehen | Shelton & Kumar; Jain | **teilweise** | Beide finden auditiv < visuell. Shelton & Kumar (n = 14, Laptop): 284 vs. 331 ms – Differenz ≈ 47 ms, absolut aber nicht 140–170 ms. Jain (n = 120, 18–20 J., schnellster von 5 Versuchen) nennt die klassischen Werte nur zitierend. |
| „Auditorische Signale erreichen den auditorischen Kortex im Hirnstamm in 8–10 ms“ | Shelton & Kumar | **teilweise** | 8–10 ms (Ohr → Gehirn) bzw. 20–40 ms (Auge → Gehirn) stehen bei Jain und Kosinski als Zitat älterer Lehrbücher (Kemp 1973; Marshall 1943). „Hörrinde im Hirnstamm“ ist anatomisch falsch (Hörrinde = Schläfenlappen). |
| Taktil 130–160 ms | – | teilweise | Ohne Quelle. Kosinski nennt 155 ms (Robinson 1934, Sekundärzitat). |
| 60 Hz = 16,7 ms, 144 Hz = 6,9 ms, 240 Hz = 4,2 ms; Gaming-Maus 1.000 Hz minimiert Verfälschung | Woods | **teilweise** | Die Bildperioden sind korrekte Arithmetik (1/f). Woods maß aber nur **ein** 60-Hz-LCD (11,0 ms Anzeigeverzögerung) und **eine** 1-kHz-Gaming-Maus (6,8 ms), zusammen 17,8 ms. 144/240 Hz wurden nicht untersucht. Messung 60 → 120 Hz: −15,5 ms Ende-zu-Ende (Casiez et al., 2017). |
| 144/240 Hz „reduzieren die gemessene Latenz um rund 10–12 ms“ | Woods | **teilweise** (Zahl plausibel, Quelle falsch) | Nicht in Woods. Eigene Rechnung: maximal (volle Bildperiode) 9,8 bzw. 12,5 ms weniger, im Mittel (halbe Periode) nur 4,8 bzw. 6,2 ms. In einer realen Messkette brachte der Wechsel 60 → 120 Hz −15,5 ms (Casiez et al., 2017). |
| Messung per `performance.now()` „ohne Verzögerung“, sub-ms genau | Woods | **nein** | Woods untersuchte keine Browser. `performance.now()` löst auf 100 µs auf (MDN), aber Anzeige- und Eingabekette verlängern Browser-RTs um 58–133 ms (Pronk et al., 2020). |
| Training verkürzt RT „typischerweise um 15–30 ms“ | Dye et al. 2009 | **nein** | Dye et al. behandeln **Actionvideospiele**, nicht Reaktionstests: Spielende 11 % schneller (Querschnitt), 50 h Actionspiel-Training 13 % vs. 6 % Kontrollspiel (n = 25). Keine ms-Angabe für RT-Training; der Transfer ist umstritten (Sala et al., 2018). Die einfache RT ist kaum übbar (Basner et al., 2018). |
| Höchstwert 18.–24. Lebensjahr, danach 2–6 ms pro Jahrzehnt; Training/Sport verlangsamen den Abbau „deutlich“ | Der & Deary | **teilweise** | Der & Deary (n = 7.130): einfache RT bis ≈ 50 kaum langsamer, Wahl-RT über das ganze Erwachsenenalter. „18–24“ und „2–6 ms/Jahrzehnt“ stehen nicht im Abstract (Woods: 0,55 ms/Jahr ≈ 5,5 ms/Jahrzehnt). Die Trainingsaussage ist unbelegt. |
| Koffein verbessert RT „um 10–20 ms“ | Smith 2002 | **teilweise** | Smith: Koffein steigert Wachheit und die Leistung bei Vigilanz- und einfachen Aufgaben, vor allem bei geringer Wachheit. Eine ms-Zahl nennt das Abstract nicht. |
| „Reflex 20–50 ms ohne Gehirn“ | – | nicht geprüft | Ohne Quelle; nicht Gegenstand der Übung. |
| „SkillDrills trainiert mentale Chronometrie (Zeitintervallschätzung)“ | – | **begrifflich falsch** | *Mentale Chronometrie* heißt in der Psychologie: aus Reaktionszeiten auf Verarbeitungsstufen schließen (Donders). Die Übung ist tatsächlich eine **Zeitproduktionsaufgabe** (Abschnitt 0) – dafür nennt die Seite keine einzige Quelle. |

#### 302 Reaktionstest: Mehrere Ziele (reflex-training-drill)

| Aussage | Quelle | stützt? | Begründung |
|---|---|---|---|
| Mehr Alternativen → mehr Auswahlbelastung; Hick als „Orientierung“, Drill ist keine Labormessung | Hick | **teilweise** | Das Hick-Hyman-Gesetz gilt für Wahlreaktionen mit *symbolischer* Zuordnung. Wenn man direkt auf den Reizort zeigt (hoch kompatibel), ist der Anstieg nahezu flach (Proctor & Schneider, 2018). In 302 sind alle Ziele sichtbar: Die Last entsteht vor allem durch **Suche, Priorisierung und Bewegungsfolge**. Die Einschränkung der Website ist korrekt. |
| Einfacher Reiz vs. Auswahl – verschiedene Verarbeitungsschritte | Donders | **ja** | Donders führte die Subtraktionsmethode ein (einfache < Erkennungs- < Wahlreaktion; über Kosinski bestätigt). |
| RT-Rahmen 200–250 ms | Kosinski | teilweise | wie bei 301. Die Seite kennzeichnet ihre Stufen (> 330 ms … < 180 ms) ausdrücklich als „redaktionelle Übungsbänder, keine Normen“ – das ist korrekt. |
| Display, Browser, Eingabe beeinflussen den Score | Woods | **ja** | Hardware kann RTs um bis zu 100 ms verlängern (Woods, mit Verweis auf Neath et al., 2011). |
| „Transfer kann aufgabenspezifisch bleiben; keine medizinische Veränderung bewiesen“ | – | korrekt | Deckt sich mit Owen et al. (2010), Simons et al. (2016). |

#### 303 Augentraining · Blicksprünge (saccadic-gallery)

| Aussage | Quelle | stützt? | Begründung |
|---|---|---|---|
| Sakkaden = ballistische Blicksprünge, Grundlage schneller Orientierung | Rayner 1998; „Fischer & Boch 1984“ | **teilweise** | Allgemeine Beschreibung korrekt (Rayner: Übersicht zu Augenbewegungen beim Lesen und bei der Informationsverarbeitung). Einen Bezug zu „Reaktionsschnelligkeit“ im Spiel belegen die Quellen nicht. Fischer & Boch 1984 ist eine Affenstudie. |
| Spitzengeschwindigkeit 200–700 °/s | Rayner 1998 | **teilweise** | Die Geschwindigkeit steigt mit der Amplitude und sättigt bei großen Sprüngen (Gibaldi & Sabatini, 2021): Bei ≈ 9° liegt sie bei ≈ 410 °/s. 700 °/s ließ sich in keiner zugänglichen Quelle bestätigen (Rayner-Volltext nicht zugänglich). |
| Sakkadische Suppression; Sprung dauert 20–40 ms | – | **teilweise** | Die Suppression beginnt ≈ 50 ms vor der Sakkade und endet ≈ 50 ms danach (Diamond et al., 2000). Eine 9°-Sakkade dauert ≈ 31 ms, eine 10°-Sakkade ≈ 40 ms (Gibaldi & Sabatini, 2021); größere dauern länger. |
| „< 130 ms Tier 1 (Express-Sakkaden/Pro) … Profi-Esports & Kampfpiloten“ | Fischer & Boch 1984 | **nein** | Express-Sakkaden (≈ 100 ms) entstehen beim Menschen vor allem im **Gap-Paradigma** (Fixationspunkt verschwindet ≈ 200 ms vor dem Ziel), auch bei Untrainierten (Fischer & Ramsperger, 1984). Keine Quelle nennt Piloten oder Esportler. Vor allem misst 303 **keine Augenbewegung**, sondern Klickzeiten inklusive Handbewegung. |
| „171–220 ms normative gesunde Blicksprung-Latenz“ | Rayner 1998 | **teilweise** | Passt größenordnungsmäßig: Median-Latenz von Prosakkaden 177 ms (Bereich 142–322 ms; Bargary et al., 2017, n = 1.058). Mit Klickzeiten der Übung ist das aber nicht vergleichbar. |
| „> 280 ms Tier 5 – deutliche Sakkadendysmetrie“ | Leigh & Zee | **nein** | Latenz und Zielgenauigkeit (Metrik) sind verschiedene Größen. Latenzen bis ≈ 322 ms kommen bei Gesunden vor, und leichtes Unterschießen ist normal (49 % der Prosakkaden; Bargary et al., 2017). Eine Dysmetrie kann ein Browserspiel nicht erkennen. |
| Klassifikation „basierend auf okulomotorischen Studien … angepasst an Monitore“ | Rayner; Fischer & Boch; Leigh & Zee; Woods | **nein** | Die Tabelle mischt Augen-Latenzen mit Klickzeiten; keine Quelle enthält diese Stufen. |
| Display 16,7/6,9/4,1 ms, Maus 1 ms | Woods | teilweise | wie bei 301. |
| Reine Augenbewegungen „mehr als doppelt so schnell“ wie Kopf-Auge-Drehungen | – | **unbelegt** | Bis ≈ 20° tragen Kopfbewegungen < 5° bei; darüber zunehmend. Der Kopf bewegt sich noch ≈ 250 ms nach Erreichen des Blickziels weiter (Freedman, 2008). Die Zahl „doppelt“ hat keine Quelle. |
| Bildschirmarbeit senkt Blinzelrate „um bis zu 60 %“ | – | richtung ja | Gemessen wurde ein Abfall auf etwa ein Fünftel, also ≈ 80 % (Patel et al., 1991). |
| Sakkadentraining steigert Lesegeschwindigkeit | – | **nein** | Die Lesegeschwindigkeit hängt vor allem an der Sprachkompetenz; Speed-Reading steigert das Tempo nur zulasten des Verstehens (Rayner et al., 2016). |
| „Täglich 5–10 min genügen; Überlastung → Asthenopie“; „echte neurophysiologische Fortschritte“ | – | **unbelegt** | Keine Quelle. Sakkaden-Latenztraining wirkte in einer Einzelfall-Übung nur an der geübten Position (Di Russo et al., 2003). |

#### 304 Aim-Training online (fps-tracking-trainer)

| Aussage | Quelle | stützt? | Begründung |
|---|---|---|---|
| Glatte Blickfolge reagiert auf Geschwindigkeitsfehler; Aufholsakkaden bei Verlassen des stabilen Bereichs | Rashbass 1961; Krauzlis 2004 | **teilweise** | Für **Augen** richtig (Latenz der Folgebewegung ≈ 100 ms: Carl & Gellman, 1987; Aufholsakkaden: de Brouwer et al., 2002). Krauzlis beschreibt das Netzwerk (frontales Augenfeld, Kleinhirn, Basalganglien, Colliculus superior). Die Übung misst aber Mausklicks auf ein bewegtes Ziel; die Übertragung von Augen- auf Handsteuerung ist eine Analogie – die Seite sagt das selbst. |
| (ohne konkrete Aussage im Text) | Green & Bavelier 2003 | **nein** | Die Studie zeigt Aufmerksamkeitsunterschiede bei Actionspielern und einen Trainingseffekt nach 10 h Actionspiel – nicht Tracking. Der Transfer ist umstritten (Bediou et al., 2018 vs. Sala et al., 2018). |
| Hardware beeinflusst das Ergebnis | Woods | ja | wie oben |
| Beschreibung „Fadenkreuz auf dem Ziel halten; kontinuierliche Kontrolle statt Flick“ | – | **widerspricht dem Code** | Gewertet wird der Klick (Abfangen), nicht das Halten (Abschnitt 0). |
| Sicherheitshinweis (Stopp bei Schwindel, Doppelbildern …) | – | korrekt | sinnvoll |

#### 305 Zielverfolgung testen (visual-tracking-speed-test)

| Aussage | Quelle | stützt? | Begründung |
|---|---|---|---|
| Tracking und schnelle Rückorientierung sind verschiedene Prozesse | Rashbass; Krauzlis | **teilweise** | Für Augenbewegungen ja (Folgebewegung vs. Sakkaden). Die Seite betont korrekt, dass keine Augenposition gemessen wird. |
| Bänder > 330 ms … < 180 ms („keine klinischen Normen“) | Kosinski; Woods | teilweise | ehrlich als redaktionell gekennzeichnet; keine Datengrundlage |
| Hardware, Touch vs. Monitor verändern die Aufgabe | Woods | **ja** | vgl. Pronk et al. (2020); Casiez et al. (2017) |

#### 306 Reaktionstest-Spiel (reaction-game)

| Aussage | Quelle | stützt? | Begründung |
|---|---|---|---|
| Bahnauswahl = Auswahl; mehr Alternativen verlangsamen | Hick; Donders | **teilweise** | Grundsätzlich richtig, aber das Zeigen auf den sichtbaren Ort ist hoch kompatibel (Proctor & Schneider, 2018). |
| RT-Intervall ist „keine reine Nervensystem-Geschwindigkeit“ | Kosinski; Woods | **ja** | korrekt eingeordnet |
| „Folge beschleunigten Zielen“ | – | **widerspricht dem Code** | Die Fallgeschwindigkeit ist pro Ziel konstant; nur von Level zu Level wird sie höher. |

#### 307 Aim-Training: Winkel prüfen (market-doors-pursuit)

| Aussage | Quelle | stützt? | Begründung |
|---|---|---|---|
| Winkelprüfung = visuelle Suche; nach dem Blickwechsel folgen Verarbeitung und Motorik | Rayner 1998; Donders | **teilweise** | Die Stufenlogik (Wahrnehmen – Auswählen – Ausführen) ist korrekt. Rayner behandelt Suche und Lesen allgemein, nicht dieses Szenario. |
| (Folgebewegung) | Krauzlis 2004 | **nein** | Die Ziele in den Türen stehen still; Folgebewegungsforschung passt hier nicht. |
| Feste Scanroute links → rechts empfohlen | – | **widerspricht dem Code** | Das Ziel erscheint an einer zufälligen Tür (1 von 5). |
| Hardware | Woods | ja | wie oben |

#### 308 FPS-Aim-Training: Winkel halten (barrier-sequence-pursuit)

| Aussage | Quelle | stützt? | Begründung |
|---|---|---|---|
| Donders trennt Reizerkennung, Auswahl und motorische Antwort; Pre-Aim spart Bewegungszeit | Donders | **ja** | Die Stufenlogik stimmt. Dass Vorab-Positionierung die Bewegungszeit spart, folgt aus Fitts (1954): kleinere Amplitude, kürzere Zeit. Wird die Aufmerksamkeit auf den erwarteten Ort gerichtet, sinkt die Entdeckungszeit ohne Genauigkeitsverlust (Posner et al., 1980). |
| RT-Bereiche > 310 ms … < 150 ms | Kosinski; Woods | teilweise | als Übungsbänder gekennzeichnet, ohne Daten; < 150 ms wäre bei unvorhersehbarem Auftauchort kaum als echte Reaktion möglich (Entdecken ≈ 131 ms; Woods) |
| „Peeker's Advantage nur angenähert“ | – | korrekt | Netzwerkeffekte werden nicht simuliert (die Seite sagt das selbst) |

**Gesamturteil Website-Quellen.** Die Seiten 302 und 304–308 sind zurückhaltend formuliert (Übungsbänder ausdrücklich
„keine Normen“, Transfer „nicht garantiert“). 301 und 303 enthalten dagegen **Leistungstabellen ohne Datengrundlage**
(Perzentile, Gaming-Ränge, „Kampfpiloten“, „Dysmetrie“), eine **sachlich falsche** Empfehlung (Stäbchen) und
Quellen, die für fremde Aussagen herhalten (Woods für 144/240-Hz-Werte, Dye für ms-Trainingsgewinne, Fischer & Boch für
Esports). Bei 301, 304, 306 und 307 widerspricht der Seitentext der ausgelieferten Mechanik.

---

## B. Faktenliste (Aussage – Zahl – Quelle)

Kennung F-xx zum Zitieren in den Einträgen. „→“ nennt die Übungen, für die der Fakt besonders relevant ist.

### B1 Reaktionszeit: Komponenten, Normbereich, Zustand

| ID | Aussage | Zahl | Quelle | → |
|---|---|---|---|---|
| F01 | Einfache visuelle RT bei kalibrierter Messung (1.469 Erwachsene, 18–65 J., 60-Hz-LCD, Gaming-Maus) | Mittelwert 231 ms; 213 ms nach Abzug der Hardware | Woods et al., 2015 | 301, 308 |
| F02 | Reines Entdecken des Reizes (RT minus Bewegungsbeginn) | ≈ 131 ms, **altersunabhängig**; Altersanstieg der RT (0,55 ms/Jahr) geht auf die Motorik zurück | Woods et al., 2015 | alle |
| F03 | Hardwareanteil in einem Labor-Setup | 60-Hz-LCD 11,0 ms, 1-kHz-Gaming-Maus 6,8 ms, zusammen 17,8 ms; Standard-Maustreiber ≥ 20 ms; Hardware kann RTs um bis zu 100 ms verlängern | Woods et al., 2015 | alle |
| F04 | Klassische Richtwerte (Studierende) vs. Computermessung | ≈ 190 ms Licht, ≈ 160 ms Ton; Computer-Laborwerte in Clemson ≈ 268 ms; Berührung ≈ 155 ms (Sekundärzitat) | Kosinski (Fassung 2013) | 301 |
| F05 | Hören schneller als Sehen (kleine Studien, Laptop-Software) | 284 vs. 331 ms (n = 14); signifikant auditiv < visuell (n = 120) | Shelton & Kumar, 2010; Jain et al., 2015 | 301 |
| F06 | Stäbchen- vs. zapfenvermittelte Reaktion (mesopisch) | Stäbchen-RT ≈ 20 ms länger | Cao et al., 2007 | 301, 303 |
| F07 | Einfache RT im Alter (n = 7.130) | bis ≈ 50 J. kaum langsamer; Wahl-RT verlangsamt sich über das ganze Erwachsenenalter | Der & Deary, 2006 | alle |
| F08 | Schlafentzug (< 48 h), Meta-Analyse 70 Artikel/147 Tests | größter Effekt bei Aussetzern in einfachen Aufmerksamkeitsaufgaben: g = −0,776 | Lim & Dinges, 2010 | 301, 308 |
| F09 | Koffein | verbessert Wachheit, Vigilanz und einfache Aufgaben, vor allem bei geringer Wachheit; hohe Dosen können Feinmotorik über Angst stören | Smith, 2002 | 301 |
| F10 | Übbarkeit der einfachen RT (PVT, 45 Personen, 16 Durchgänge) | keine systematische Änderung von Mittelwert/Median | Basner et al., 2018 (Dossier 01) | 301, 308 |
| F11 | Sport und einfache RT | Baseballspieler: einfache RT nicht schneller; Go/No-Go-RT durch 2 J. Training verbessert | Kida et al., 2005 (Dossier 01) | 301, 308 |
| F12 | Übung einfacher RT zentral/peripher (16 Männer, 3 Wochen, 5 Tage/Woche, 3 × 25 Durchgänge) | RT sank in beiden Feldern; Übertragung zentral ↔ peripher; Effekt nach 3 Wochen Pause erhalten | Ando et al., 2002 (Retention: Ando et al., 2004, nur Abstract) | 301, 303 |

### B2 Wahlreaktion, Erwartung, Aufmerksamkeit

| ID | Aussage | Zahl | Quelle | → |
|---|---|---|---|---|
| F13 | Hick-Hyman-Gesetz | Wahl-RT steigt linear mit log₂ der Anzahl gleich wahrscheinlicher Alternativen | Hick, 1952; Proctor & Schneider, 2018 | 302, 306, 307 |
| F14 | Übung flacht den Hick-Anstieg ab | Unterschied 8 vs. 2 Alternativen nach 5 × 1.000 Durchgängen von ≈ 500 auf ≈ 300 ms | Proctor & Schneider, 2018 (Dossier 04) | 302 |
| F15 | Reiz-Reaktions-Kompatibilität | bei direktem Zeigen/Blicken auf den Reizort ist der Hick-Anstieg nahezu flach | Proctor & Schneider, 2018 (Dossier 04) | 302, 306, 307 |
| F16 | Sakkaden auf sichtbare Ziele „verletzen“ Hick | Prosakkaden-Latenz unabhängig von der Zahl der Alternativen; Antisakkaden und Tastendruck folgen Hick | Kveraga et al., 2002 | 303, 307 |
| F17 | Räumlicher Hinweis auf den Reizort | kürzere Entdeckungslatenz ohne Genauigkeitsverlust; Aufmerksamkeit lässt sich kaum auf zwei nicht benachbarte Orte zugleich ausrichten | Posner et al., 1980 | 307, 308 |
| F18 | Speed-Accuracy-Trade-off | schnellere Entscheidungen gehen mit mehr Fehlern einher; Tempo- und Genauigkeitsmaße müssen gemeinsam gelesen werden (Übersicht, keine Einzelzahl) | Heitz, 2014 | alle |

### B3 Mehrere Ziele, Suche, Blick-Hand-Folge

| ID | Aussage | Zahl | Quelle | → |
|---|---|---|---|---|
| F19 | Folgefehler bei Mehrzielsuche („Satisfaction of Search“) | nach dem ersten gefundenen Ziel sinkt die Trefferquote für ein zweites; Mechanismus ähnlich dem Attentional Blink (200–500 ms nach dem ersten Ziel) | Adamo et al., 2013 | 302 |
| F20 | Augen führen die Hand | Sakkade zum Ziel innerhalb ≈ 250 ms, Handbewegung ≈ 100 ms später; Latenzen von Auge und Hand nur schwach korreliert | Prablanc et al., 1979 | 302, 303, 305 |
| F21 | Suchzeit wächst mit der Zahl der Elemente, wenn das Ziel nicht „herausspringt“ | ineffiziente Suche ≈ 25–35 ms pro Element (Ziel vorhanden); mit Blickbewegungen noch langsamer. In 302 sind die Ziele auffällig (farbig auf Schwarz) – die Suche ist daher eher effizient; begrenzend sind Priorisierung und Zeigerfolge | Wolfe, 2001 (Dossier 03) | 302 |

### B4 Sakkaden und Kopf-Auge-Koordination

| ID | Aussage | Zahl | Quelle | → |
|---|---|---|---|---|
| F22 | Normwerte Prosakkaden, junge Erwachsene (n = 1.058, 16–40 J.) | Median-Latenz 177 ms (SD 18,5; 142–322 ms); Express-Anteil 4,4 %; Unterschießen („static undershoot“) bei 49 % | Bargary et al., 2017 (Tab. 1 der eingereichten Fassung) | 303 |
| F23 | Normwerte Antisakkaden (dieselbe Stichprobe) | Fehlerrate 37,7 %; Latenz korrekter Antisakkaden 305 ms | Bargary et al., 2017 | 303 |
| F24 | Zuverlässigkeit okulomotorischer Maße (Wiederholung nach median 18,8 Tagen) | Test-Retest r = 0,685–0,884 | Bargary et al., 2017 | 303 |
| F25 | Express-Sakkaden (Gap-Paradigma, Lücke ≈ 200 ms) | zweigipflige Verteilung: ≈ 100 ms (express) und ≈ 150 ms (regulär) | Fischer & Ramsperger, 1984 | 303 |
| F26 | Übung von Express-Sakkaden | Anteil steigt mit täglicher Übung; Latenz sinkt nur von 105 auf 98 ms; zufällige Seite (links/rechts) +15 ms | Fischer & Ramsperger, 1986 | 303 |
| F27 | Latenz und Exzentrizität | schüsselförmig: Minimum-Plateau 0,75–12°, zentraler Anstieg um 35–75 ms, zur Peripherie langsam steigend; jenseits 35° (temporal) unregelmäßig mit Richtungsfehlern | Kalesnykas & Hallett, 1994 | 303 |
| F28 | Hauptsequenz (Amplitude – Tempo – Dauer) | ≈ 9°-Sakkaden: Spitzentempo ≈ 410 °/s, Dauer ≈ 31 ms; 10° ≈ 40 ms; Spitzentempo sättigt bei großen Sakkaden | Gibaldi & Sabatini, 2021 | 303 |
| F29 | Sakkadische Suppression (12°-Sakkaden) | beginnt ≈ 50 ms vor, maximal bei Beginn, endet ≈ 50 ms nach der Sakkade; ≈ 10-fach geringere Kontrastempfindlichkeit für grobe Helligkeitsmuster, keine Suppression für reine Farbmuster | Diamond et al., 2000 | 303 |
| F30 | Alter und Sakkaden (168 Personen, 5–79 J.) | 20–30 J. am schnellsten und gleichmäßigsten; 60–79 J. langsamer, längere Sakkaden-Dauer; 5–8 J. meiste Antisakkaden-Fehler (Reifung des Frontalhirns) | Munoz et al., 1998 | 303 |
| F31 | Trainierbarkeit/Expertise | Wurfscheibenschützen (n = 7) schnellere Sakkadenlatenz als Kontrollen (n = 8); ein trainierter Proband erreichte ähnliche Werte, aber **nur an der geübten Position** (retinotop, kein Transfer) | Di Russo et al., 2003 | 303 |
| F32 | Kopf-Auge-Koordination | Augen-Beweglichkeit ≈ ±40°; bis ≈ 20° Blickwechsel trägt der Kopf < 5° bei, Übergang bei 20–25° (Beispieldaten Affe); Kopf dreht nach Erreichen des Blickziels noch ≈ 250 ms weiter | Freedman, 2008 | 303, 307 |
| F33 | Lesegeschwindigkeit | Verdoppeln/Verdreifachen (≈ 250 → 500–750 Wörter/min) ohne Verständnisverlust unwahrscheinlich; entscheidend ist Sprachkompetenz | Rayner et al., 2016 | 303 |

### B5 Blickfolge, manuelles Nachführen, Abfangen

| ID | Aussage | Zahl | Quelle | → |
|---|---|---|---|---|
| F34 | Latenz der glatten Folgebewegung | 100 ± 5 ms ab 5 °/s; Anfangsbeschleunigung bis ≈ 50 °/s² | Carl & Gellman, 1987 | 304, 305 |
| F35 | Wann eine Aufholsakkade ausgelöst wird | keine Sakkade, solange die vorhergesagte „Eye-Crossing-Time“ 40–180 ms beträgt; sonst Sakkade nach ≈ 125 ms | de Brouwer et al., 2002 | 304, 305 |
| F36 | Normwerte Folgebewegung (n = 1.058) | Gain 0,80 (0,31–1,08); 0,64 Aufholsakkaden/s | Bargary et al., 2017 | 304, 305 |
| F37 | Netzwerk der Folgebewegung | frontales Augenfeld, Kleinhirn, Basalganglien, Colliculus superior; Architektur ähnlich wie bei Sakkaden | Krauzlis, 2004 | 304, 305 |
| F38 | Manuelles Nachführen ist intermittierend | Korrekturen im Bereich 0,5–1,8 Hz; Fehler-Totzone ≈ 0,8°; Mindestabstand zwischen Korrekturen ≈ 170 ms | Miall et al., 1993 | 304 |
| F39 | Visuomotorische Latenz beim Abfangen | 114 ms, gleich für Tippen und Wischen (n = 22) | Brenner et al., 2026 (Dossier 02) | 304–306 |
| F40 | Klicks auf bewegte Ziele | Endpunkte liegen hinter dem Ziel, umso mehr, je schneller es sich bewegt (Maus, n = 12) | Huang et al., 2018 (Dossier 02) | 304, 305, 306 |
| F41 | Beschleunigung wird bei der Zeitschätzung kaum genutzt | Fehler folgen Informationen erster Ordnung (Geschwindigkeit), auch wenn Beschleunigung wahrnehmbar ist; Handlung ≈ 200 ms vor Bewegungsbeginn geplant | Benguigui et al., 2003 | 306 |
| F42 | Bei großen Sprüngen verändern Gleitsichtgläser die Blickbewegungen | siehe F57 | Han et al., 2003 | 303, 307 |

### B6 Zielbewegung, Eingabegerät, Touch

| ID | Aussage | Zahl | Quelle | → |
|---|---|---|---|---|
| F43 | Fitts'sches Gesetz | Bewegungszeit steigt linear mit log₂(2A/W) (Amplitude A, Zielbreite W) | Fitts, 1954 | 302–308 |
| F44 | Durchsatz der Maus nach ISO-Methode | 3,7–4,9 bit/s (5 Modelle) | Soukoreff & MacKenzie, 2004 (Tab. 5, Volltext) | 302–308 |
| F45 | Zielbewegungen: zwei Komponenten | schneller Anfangsimpuls + visuelle Online-Korrektur; Übung optimiert die Planung auf ein „sicheres, schnelles“ Fenster | Elliott et al., 2010 | 302–308 |
| F46 | Touch vs. Maus nach Alter | Touch verkürzte die Bewegungszeit gegenüber der Maus bei Älteren um 35 %, bei Jüngeren um 16 %; Fehlerraten sanken | Findlater et al., 2013 | alle (Tablet) |
| F47 | Touch-Zielgröße | Empfehlung 9,2 mm (Einzelziele), 9,6 mm (Serien) | Parhi et al., 2006 (Dossier 02) | alle (Tablet) |
| F48 | Physiologischer Tremor | zentraler Anteil im 10-Hz-Bereich plus mechanische/Reflex-Resonanzen; Parkinson-Tremor 3–6 Hz | McAuley & Marsden, 2000 | 302, 305, 308 |

### B7 Zeitwahrnehmung und Zeitproduktion (vor allem 301)

| ID | Aussage | Zahl | Quelle | → |
|---|---|---|---|---|
| F49 | Weber-Bruch für Zeitintervalle (500 ms, Vergleichsmethode) | auditiv markiert ≈ 4–10 %, visuell markiert ≈ 7–28 % | Grondin, 2010 (Anhang, Daten Grondin & McAuley 2009) | 301 |
| F50 | Zählen / Segmentieren | Zählen hilft ab Intervallen > ≈ 1,2 s; zwischen 1 und 2 s ist der Weber-Bruch nicht konstant (bei 1,5–2 s höher als bei 1 s) | Grondin, 2010 | 301 |
| F51 | Zeitverarbeitung auditiv > visuell | geringere Schwellen/Streuung für auditiv markierte Intervalle; Lerntransfer von auditiv zu visuell schwierig | Grondin, 2010 | 301 |
| F52 | Beteiligte Hirnregionen | Kleinhirn, supplementär-motorisches Areal, präfrontaler und parietaler Kortex, Basalganglien (Nucleus caudatus, Putamen) | Grondin, 2010 | 301 |
| F53 | Alter und Zeitschätzung (Meta-Analyse) | Ältere produzieren kürzere Dauern und schätzen variabler; Reproduktion und Steigung ohne Altersunterschied | Block et al., 1998 | 301 |
| F54 | Training der Intervallwahrnehmung | 10 Tage × 1 h: deutliche Verbesserung bei 100 ms, **keine** Übertragung auf 50, 200 oder 500 ms | Wright et al., 1997 | 301 |

### B8 Geräte, Messung, Zuverlässigkeit

| ID | Aussage | Zahl | Quelle | → |
|---|---|---|---|---|
| F55 | Bildperiode | 60 Hz = 16,7 ms, 120 Hz = 8,3 ms, 144 Hz = 6,9 ms, 240 Hz = 4,2 ms; mittlere Wartezeit auf das nächste Bild = halbe Periode | eigene Rechnung | alle |
| F56 | Reale Ende-zu-Ende-Latenz Maus → Bild | 60 Hz: 36,6 ms, 120 Hz: 21,1 ms (−15,5 ms, GLUT); 125-Hz-Maus ≈ 12 ms Eingangslatenz, 1.000-Hz-Maus < 2 ms; Großteil der Latenz entsteht auf der Anzeigeseite | Casiez et al., 2017 | alle |
| F57 | Tipp-Latenz auf Tablets | Ende-zu-Ende 48–276 ms je nach Gerät/Toolkit; iPad Air 2: nativ 48 ms, Safari-Canvas 77 ms, CSS 83 ms, WebGL 64 ms; Touch-Eingangslatenz Android 14–25 ms | Casiez et al., 2017 | alle (Tablet) |
| F58 | Browser-RTs werden zu lang gemessen | Smartphones +58 bis +70 ms, Laptops +62 bis +133 ms; innerhalb eines Geräts SD ≈ 7 ms | Pronk et al., 2020 (Dossier 01) | alle |
| F59 | Zeitauflösung `performance.now()` | 100 µs (5 µs bei Cross-Origin-Isolation) | MDN Web Docs, o. J. | alle |
| F60 | Lokale Latenz im Shooter (43 erfahrene CS:GO-Spieler, 25–125 ms) | 10 ms weniger Latenz → +0,8 % Trefferquote, +1,2 Punkte pro 4 min; bei 25 ms ≈ 20 % höhere Punktzahl als bei 125 ms | Liu et al., 2021 | 304–308 |
| F61 | Zuverlässigkeit von Aim-Trainer-Aufgaben (KovaaK's, 10 Esportler, 2 Termine) | ICC 0,947–0,995; teils Lerneffekte zwischen Terminen | Rogers et al., 2024 | 302–308 |
| F62 | Blicklatenzen sind stabile Personenmerkmale | r = 0,685–0,884 (siehe F24) | Bargary et al., 2017 | 303 |

### B9 Trainierbarkeit und Transfer

| ID | Aussage | Zahl | Quelle | → |
|---|---|---|---|---|
| F63 | Digitales Sport-Sehtraining (33 RCTs, n = 1.048) | Reaktionszeit SMD 2,66 bei trainingsähnlichem Test, nur 0,50 bei unähnlichem | Guo et al., 2025 (Dossier 01) | alle |
| F64 | „Brain Training“ allgemein | viel Evidenz für die geübte Aufgabe, wenig für entfernte Aufgaben/Alltag; keine Studie erfüllte alle Qualitätskriterien | Simons et al., 2016 (Dossier 01) | alle |
| F65 | Actionvideospiele | Querschnitt: Spielende ≈ 11 % schneller ohne Genauigkeitsverlust; 50 h Training: −13 % vs. −6 % RT (Kontrollspiel) | Dye et al., 2009 | 301, 304 |
| F66 | Actionvideospiele – Meta-Analysen widersprechen sich | Interventionen g = 0,34 mit Publikationsbias (Bediou et al., 2018) vs. „kleine bis keine“ Effekte (Sala et al., 2018) | Bediou et al., 2018; Sala et al., 2018 (Dossier 01) | 302–308 |
| F67 | Ferntransfer auf Sport | keine unterstützende Evidenz für Ferntransfer allgemeiner Wahrnehmungs-/Kognitionstrainings | Fransen, 2024 (Dossier 02) | alle |
| F68 | Spezifität von Sakkadentraining | Express-Sakkaden-Übung wirkt spezifisch; Latenztraining retinotop | Fischer & Ramsperger, 1986; Di Russo et al., 2003 | 303 |
| F69 | Spezifität von Zeittraining | kein Transfer auf ungeübte Intervalle | Wright et al., 1997 | 301 |

### B10 Optik, Brille, Bildschirm

| ID | Aussage | Zahl | Quelle | → |
|---|---|---|---|---|
| F70 | Gleitsicht am Bildschirm (11 Presbyope, 45–71 J., 60 cm) | klare horizontale Zone im Zwischenbereich 13–18° (Einstärkenglas 60°); längere Augenbewegungen, spätere Blickstabilisierung, längere Kopfbewegungen mit schmaler Zone | Han et al., 2003 | 302–308 |
| F71 | Gleitsicht-Träger am Arbeitsplatz (n = 175) | Kopf ≈ 7° stärker angehoben als mit Einstärkengläsern; fehlende Nahaddition bei beginnender Presbyopie = Risikofaktor für Beschwerden | Jaschinski et al., 2015 | alle (Desktop) |
| F72 | Blinzeln am Bildschirm | im Mittel **5-facher** Abfall der Blinzelrate | Patel et al., 1991 | alle |
| F73 | Pausen nach der 20-20-20-Regel (29 symptomatische Nutzer, 2 Wochen) | weniger digitale Augenbelastung und Trockenheitssymptome; nach 1 Woche ohne Erinnerung nicht mehr nachweisbar; keine Änderung objektiver Tränenfilmwerte | Talens-Estarelles et al., 2023 | alle |
| F74 | Betrachtungsabstand mit Alter (Smartphone, Italien, n = 217) | Nicht-Presbyope 33,4 ± 7,6 cm, Presbyope 39,7 ± 6,3 cm | Boccardo et al., 2023 (Dossier 02) | alle (Tablet) |
| F75 | Rot-Grün-Farbsehschwäche | ≈ 8 % der Männer, ≈ 0,4 % der Frauen (Europa) | Birch, 2012 (Dossier 01) | 301 (Farbskala der Bewertungen) |

### B11 Sicherheit

| ID | Aussage | Zahl | Quelle | → |
|---|---|---|---|---|
| F76 | Lichtausgelöste Anfälle | ≈ 1 : 10.000, bei 5–24-Jährigen ≈ 1 : 4.000; am stärksten provozierend 15–25 Hz; Rot ist ein Risikofaktor | Fisher et al., 2005 (Dossier 03) | 301 (rote Überlagerung) |
| F77 | WCAG 2.2, Kriterium 2.3.1 | höchstens 3 Blitze/s oder unter der allgemeinen und roten Blitzschwelle | W3C, 2024 (Dossier 01/03) | 301 |
| F78 | Parkinson-Tremor 3–6 Hz stört ruhiges Zielen; physiologischer Tremor ≈ 8–12 Hz | siehe F48 | McAuley & Marsden, 2000 | 302–308 |

**Summe:** 78 Fakten (F01–F78), davon 3 Querverweise (F42, F62, F78).

---

## C. Evidenz-Zusammenfassung

### C.1 Übergreifend

1. **Übungseffekt: stark.** In allen acht Aufgabentypen wird man durch Wiederholung besser, vor allem in den ersten
   Sitzungen (F12, F14, F61; Dossier 01). Ein Teil ist Gewöhnung an Gerät und Regeln: Bei trainingsähnlichen Tests sind
   die Effekte gut fünfmal so groß wie bei unähnlichen (F63).
2. **Naher Transfer: schwach bis mittel.** Belegt sind Übertragungen innerhalb eng verwandter Reaktionsaufgaben (zentral
   ↔ peripher, F12). Sakkaden- und Zeittraining sind dagegen ausgeprägt **spezifisch** für die geübte Position bzw. das
   geübte Intervall (F31, F54, F68, F69).
3. **Alltags-/Sporttransfer: fehlend bis schwach.** Keine Studie zu Browser-Reaktionsspielen dieses Typs; allgemeine
   Befunde zu Brain-Training, Sehtraining im Sport und Actionspielen sind uneinheitlich bis negativ (F64, F66, F67). Aus
   F60 folgt nur, dass *Geräte*-Latenz im Spiel zählt – nicht, dass Training im Browser Spielleistung steigert.
4. **Messung:** Browserwerte enthalten 50–130 ms Geräteanteil, der zwischen Geräten schwankt (F56–F58). Das ist mehr als
   der Altersunterschied von Jahrzehnten (F02). **Nur Selbstvergleich auf demselben Gerät ist sinnvoll**; die
   Stufentabellen der Website haben keine Datengrundlage.
5. **Einfache RT ist kaum trainierbar** (F10, F11); was sich verbessert, sind Erwartung, Strategie (Vorab-Positionierung,
   F17, F43) und Bewegungsökonomie.

### C.2 Je Übung (Vorschläge für `evidenz` und Profil – von den Autor:innen zu bestätigen)

| Nr | Worauf es tatsächlich ankommt | Evidenz-Vorschlag (Übung / nah / Alltag) | Profil-Hinweise (Kern = 3) | Überschneidungen |
|---|---|---|---|---|
| 301 | Zeitproduktion 1–8 s mit visuellem 1-Hz-Takt; kaum Reaktionsgeschwindigkeit | mittel / schwach (Intervall-spezifisch, F54) / fehlend | `antizipation` (Zeitpunkt) und `zeitliche_aufloesung` zentral; `einfache_reaktion` gering (Klick nach eigenem Timing, nicht auf einen Reiz); `daueraufmerksamkeit` mittel | 101 (Light Reaction, echte RT), 503 (Instant Response), 409 (Stroboskop-Vorhersage), 109 (Rhythmus/Flimmern); Ton würde die Aufgabe erleichtern (F51) |
| 302 | Mehrzielsuche, Priorisierung nach Ablaufzeit, schnelle Zeigerfolgen | stark / schwach / fehlend | `visuelle_suche`, `zielbewegung_tempo`, `geteilte_aufmerksamkeit`/`entscheidung_wahlreaktion` hoch; `zielbewegung_praezision` steigt mit Level | 502 (Zielwechsel-Schwarm), 510 (Zielpriorisierung), 103/108 (Suche), 205 (geteilte Aufmerksamkeit), 702 (Aim-Trainer) |
| 303 | Sprung zu einem neuen Ort + Klick; große Amplituden (bis ≈ 35° am Desktop) | stark / schwach (retinotop, F31) / fehlend | `sakkaden`, `auge_hand_koordination`, `zielbewegung_tempo` hoch; `peripheres_sehen` mittel (Ziel erscheint außerhalb der Blickmitte, aber groß und kontrastreich); keine Blickmessung | 401 (Peripher-Ping), 501 (Flick), 508 (Zielerfassung), 704 (Präzisions-Flick), 101 |
| 304 | Abfangklick auf horizontal pendelndes Ziel mit Richtungswechseln | stark / schwach / fehlend | `bewegungswahrnehmung`, `blickfolge`, `auge_hand_koordination`, `antizipation`; `kontinuierliche_steuerung` nur mittel (Klick statt Halten) | 505 (Strafe-Tracking), 512, 514 (Pro-Smooth), 105 (Pursuit Tracker), 104 (Moving Target) |
| 305 | Abfangklick auf 2D-geradlinig reflektiertes Ziel | stark / schwach / fehlend | wie 304, Bewegungsrichtung zweidimensional | 104, 105, 410, 415, 106 |
| 306 | Abfangen fallender Ziele in Bahnen, konstante Fallgeschwindigkeit je Ziel | stark / schwach / fehlend | `bewegungswahrnehmung`, `antizipation`, `auge_hand_koordination`, `zielbewegung_tempo`; vertikal | 515 (vertikales Tracking), 413, 104 |
| 307 | 5 Türen, Ziel an zufälliger Tür; Reagieren + kurze Zeigerbewegung | stark / schwach / fehlend | `einfache_reaktion`/`entscheidung_wahlreaktion` (5 Orte, räumlich kompatibel – geringer Hick-Effekt, F15), `zielbewegung_tempo`, `selektive_aufmerksamkeit` | 511 (Winkel halten), 308, 202 (Wahlreaktion), 503 |
| 308 | Ziel an linker/rechter Barrierenkante; Pre-Aim + Klick | stark / schwach / fehlend | `einfache_reaktion`, `antizipation` (Ort), `zielbewegung_praezision`; `selektive_aufmerksamkeit` (Kante beobachten) | 511 (Angle-Hold), 503, 101, 307 |

Für alle acht: `stereosehen` 0 (Bildschirm), `naharbeit_dauer` 1 (45-s-Runden), `zeitdruck` hoch (Lebensdauer bis
< 300 ms), `flimmern_lichtreize` 0–1 (301: einzelne rote Vollflächen-Überlagerung, unter den Schwellen; alle: 1-Hz-Puls
bzw. kurze Treffer-Effekte), `bewegungsreize_schwindel` gering (kleine bewegte Objekte, kurzes Bildschirmwackeln bei
Fehlern), `sprachabhaengigkeit` gering (Zahlen/Ziffern bei 301).

### C.3 Vorsicht / Auswahlhinweise (keine medizinischen Aussagen)

- **`presbyopie_gleitsicht`** (302–308, vor allem 303/307): Große seitliche Sprünge verlassen den klaren Zwischenbereich
  der Gleitsichtgläser (13–18°, F70); man muss den Kopf drehen oder sieht unscharf. Kopfhaltung ist mit Gleitsicht
  ≈ 7° angehoben (F71). Empfehlung: Arbeitsplatzbrille/Bildschirmglas oder kleineres Spielfeld; Bildschirm eher
  tiefer stellen.
- **`trockenes_auge_bildschirm`**: Blinzelrate sinkt am Bildschirm stark (F72); bei konzentrierten Schnellspielen
  plausibel. Pausen helfen subjektiv, aber nur, solange man sie macht (F73).
- **`tremor_parkinson`, `hand_arm_beschwerden`** (302–308): kleine Ziele (bis ≈ 0,3–0,4°) und kurze Lebensdauer; Maus
  mit hoher Klickfrequenz.
- **`photosensitive_epilepsie`, `migraene_lichtempfindlich`** (301): rote Vollflächen-Überlagerung bei Fehlern; unter den
  WCAG-Schwellen (eigene Rechnung), aber rot und großflächig (F76, F77) – für eine Blickfit-Umsetzung vermeiden.
- **`farbsehschwaeche`** (301): Die Bewertungsstufe (EXACT, PERFECT, EXCELLENT, GOOD, OK, HIT, MISS) wird im Code zwar
  gesetzt, aber nicht als Text gezeichnet; sichtbar ist nur die Abweichung in ms, eingefärbt in Gold, Grün, Blau, Cyan,
  Orange, Magenta oder Rot. Die Stufe steckt also allein in der Farbe (F75) – für die Auswahl gering relevant, weil die
  ms-Zahl lesbar bleibt, für eine Blickfit-Umsetzung aber zu vermeiden.
- **`kognitive_einschraenkung`, Ältere**: Reaktion und Zeitschätzung verlangsamen bzw. streuen mit dem Alter (F07, F30,
  F53); Touch statt Maus kommt Älteren besonders entgegen (F46), aber die Ziele werden rasch kleiner als 9 mm (F47).
- **`aufmerksamkeitsprobleme`**: hoher Zeitdruck, Combo-Druck; Übungen eher als Spiel, nicht als Test einsetzen.

---

## D. Literaturliste (nur geprüfte Einträge)

### D.1 Von der Website genannte Quellen (Prüfergebnis siehe A)

- Der, G., & Deary, I. J. (2006). Age and sex differences in reaction time in adulthood: Results from the United Kingdom Health and Lifestyle Survey. *Psychology and Aging, 21*(1), 62–73. https://doi.org/10.1037/0882-7974.21.1.62 – **Prüfung:** DOI ✓ (Crossref), Abstract gelesen; Erratum 2009.
- Donders, F. C. (1969). On the speed of mental processes. *Acta Psychologica, 30*, 412–431. https://doi.org/10.1016/0001-6918(69)90065-1 (Original 1868) – **Prüfung:** DOI ✓; Inhalt über Sekundärquellen.
- Dye, M. W. G., Green, C. S., & Bavelier, D. (2009). Increasing speed of processing with action video games. *Current Directions in Psychological Science, 18*(6), 321–326. https://doi.org/10.1111/j.1467-8721.2009.01660.x – **Prüfung:** DOI ✓, Volltext (PMC2871325) gelesen.
- Fischer, B., & Boch, R. (1984). Express-saccades of the monkey: A new type of visually guided rapid eye movements after extremely short reaction times. *Advances in Psychology, 22*, 403–408. https://doi.org/10.1016/S0166-4115(08)61860-9 – **Prüfung:** auf der Website nur im Text erwähnt; Eintrag über Crossref ermittelt ✓; Inhalt (Affen) nur über den Titel.
- Green, C. S., & Bavelier, D. (2003). Action video game modifies visual selective attention. *Nature, 423*(6939), 534–537. https://doi.org/10.1038/nature01647 – **Prüfung:** DOI ✓, Abstract.
- Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology, 4*(1), 11–26. https://doi.org/10.1080/17470215208416600 – **Prüfung:** DOI ✓; Inhalt über Dossier 04/Proctor & Schneider (2018).
- Jain, A., Bansal, R., Kumar, A., & Singh, K. D. (2015). A comparative study of visual and auditory reaction times on the basis of gender and physical activity levels of medical first year students. *International Journal of Applied and Basic Medical Research, 5*(2), 124–127. https://doi.org/10.4103/2229-516X.157168 – **Prüfung:** DOI ✓, Volltext (PMC4456887) gelesen.
- Kosinski, R. J. (2013). *A literature review on reaction time* (Stand September 2013). Clemson University. http://www.cognaction.org/cogs105/readings/clemson.rt.pdf – **Prüfung:** keine DOI, unbegutachtet; Volltext gelesen. Website gibt 2008 an; diese Fassung wurde nicht gefunden.
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI ✓, Abstract.
- Leigh, R. J., & Zee, D. S. (2015). *The neurology of eye movements* (5. Aufl.). Oxford University Press. https://doi.org/10.1093/med/9780199969289.001.0001 – **Prüfung:** Website-DOI (…969203…) falsch; korrigierte DOI ✓ (Crossref). Buch, Inhalt nicht eingesehen.
- Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 – **Prüfung:** DOI ✓, Website-Titel ungenau („pursuit“ statt „tracking“); nur Metadaten.
- Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin, 124*(3), 372–422. https://doi.org/10.1037/0033-2909.124.3.372 – **Prüfung:** DOI ✓, nur Abstract.
- Shelton, J., & Kumar, G. P. (2010). Comparison between auditory and visual simple reaction times. *Neuroscience & Medicine, 1*(1), 30–32. https://doi.org/10.4236/nm.2010.11004 – **Prüfung:** DOI ✓, Abstract (n = 14).
- Smith, A. (2002). Effects of caffeine on human behavior. *Food and Chemical Toxicology, 40*(9), 1243–1255. https://doi.org/10.1016/S0278-6915(02)00096-0 – **Prüfung:** DOI ✓, Abstract.
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI ✓, Volltext (PMC4374455) gelesen.

### D.2 Weitere Fachliteratur (alle DOIs am 29.09.2026 per Crossref geprüft)

- Adamo, S. H., Cain, M. S., & Mitroff, S. R. (2013). Self-induced attentional blink: A cause of errors in multiple-target search. *Psychological Science, 24*(12), 2569–2574. https://doi.org/10.1177/0956797613497970 – Abstract; F19.
- Ando, S., Kida, N., & Oda, S. (2002). Practice effects on reaction time for peripheral and central visual fields. *Perceptual and Motor Skills, 95*(3), 747–751. https://doi.org/10.2466/pms.2002.95.3.747 – Abstract; F12. (Retention: Ando, S., Kida, N., & Oda, S. (2004). Retention of practice effects on simple reaction time for peripheral and central visual fields. *Perceptual and Motor Skills, 98*(3), 897–900, https://doi.org/10.2466/pms.98.3.897-900 – DOI ✓, Abstract.)
- Bargary, G., Bosten, J. M., Goodbourn, P. T., Lawrance-Owen, A. J., Hogg, R. E., & Mollon, J. D. (2017). Individual differences in human eye movements: An oculomotor signature? *Vision Research, 141*, 157–169. https://doi.org/10.1016/j.visres.2017.03.001 – Abstract + eingereichte Manuskriptfassung (Figshare/Sussex) mit Tabelle 1 gelesen; veröffentlichte Werte können minimal abweichen; F22–F24, F36.
- Basner, M., Hermosillo, E., Nasrini, J., McGuire, S., Saxena, S., Moore, T. M., Gur, R. C., & Dinges, D. F. (2018). Repeated administration effects on Psychomotor Vigilance Test performance. *Sleep, 41*(1), zsx187. https://doi.org/10.1093/sleep/zsx187 – Dossier 01; F10.
- Bediou, B., Adams, D. M., Mayer, R. E., Tipton, E., Green, C. S., & Bavelier, D. (2018). Meta-analysis of action video game impact on perceptual, attentional, and cognitive skills. *Psychological Bulletin, 144*(1), 77–110. https://doi.org/10.1037/bul0000130 – Dossier 01; F66.
- Benguigui, N., Ripoll, H., & Broderick, M. P. (2003). Time-to-contact estimation of accelerated stimuli is based on first-order information. *Journal of Experimental Psychology: Human Perception and Performance, 29*(6), 1083–1101. https://doi.org/10.1037/0096-1523.29.6.1083 – Abstract; F41.
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Dossier 01; F75.
- Block, R. A., Zakay, D., & Hancock, P. A. (1998). Human aging and duration judgments: A meta-analytic review. *Psychology and Aging, 13*(4), 584–596. https://doi.org/10.1037/0882-7974.13.4.584 – Abstract; F53.
- Boccardo, L., Gurioli, M., & Grasso, P. A. (2023). Viewing distance and character size in the use of smartphones across the lifespan. *PLoS ONE, 18*(4), e0282947. https://doi.org/10.1371/journal.pone.0282947 – Dossier 02; F74.
- Brenner, E., Bom, S., & Smeets, J. B. J. (2026). Intercepting moving targets: Does the visuomotor latency depend on whether one taps on the target or slides through it? *Experimental Brain Research, 244*(4), 70. https://doi.org/10.1007/s00221-026-07264-3 – Dossier 02; F39.
- Cao, D., Zele, A. J., & Pokorny, J. (2007). Linking impulse response functions to reaction time: Rod and cone reaction time data and a computational model. *Vision Research, 47*(8), 1060–1074. https://doi.org/10.1016/j.visres.2006.11.027 – Abstract; F06.
- Carl, J. R., & Gellman, R. S. (1987). Human smooth pursuit: Stimulus-dependent responses. *Journal of Neurophysiology, 57*(5), 1446–1463. https://doi.org/10.1152/jn.1987.57.5.1446 – Abstract; F34.
- Casiez, G., Pietrzak, T., Marchal, D., Poulmane, S., Falce, M., & Roussel, N. (2017). Characterizing latency in touch and button-equipped interactive systems. In *Proceedings of the 30th Annual ACM Symposium on User Interface Software and Technology (UIST '17)* (S. 29–39). ACM. https://doi.org/10.1145/3126594.3126606 – Volltext (HAL hal-01586803) gelesen, Tab. 6 und 7; F56, F57.
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – Abstract; F35.
- Di Russo, F., Pitzalis, S., & Spinelli, D. (2003). Fixation stability and saccadic latency in élite shooters. *Vision Research, 43*(17), 1837–1845. https://doi.org/10.1016/S0042-6989(03)00299-2 – Abstract; F31.
- Diamond, M. R., Ross, J., & Morrone, M. C. (2000). Extraretinal control of saccadic suppression. *The Journal of Neuroscience, 20*(9), 3449–3455. https://doi.org/10.1523/JNEUROSCI.20-09-03449.2000 – Abstract; F29.
- Elliott, D., Hansen, S., Grierson, L. E. M., Lyons, J., Bennett, S. J., & Hayes, S. J. (2010). Goal-directed aiming: Two components but multiple processes. *Psychological Bulletin, 136*(6), 1023–1044. https://doi.org/10.1037/a0020958 – Abstract; F45.
- Findlater, L., Froehlich, J. E., Fattal, K., Wobbrock, J. O., & Dastyar, T. (2013). Age-related differences in performance with touchscreens compared to traditional mouse input. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '13)* (S. 343–346). ACM. https://doi.org/10.1145/2470654.2470703 – Abstract (Semantic Scholar); F46.
- Fischer, B., & Ramsperger, E. (1984). Human express saccades: Extremely short reaction times of goal directed eye movements. *Experimental Brain Research, 57*(1), 191–195. https://doi.org/10.1007/BF00231145 – Abstract; F25.
- Fischer, B., & Ramsperger, E. (1986). Human express saccades: Effects of randomization and daily practice. *Experimental Brain Research, 64*(3), 569–578. https://doi.org/10.1007/BF00340494 – Abstract; F26, F68.
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Dossier 03; F76.
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – Metadaten; Gesetz über Soukoreff & MacKenzie (2004) bestätigt; F43.
- Fransen, J. (2024). There is no supporting evidence for a far transfer of general perceptual or cognitive training to sports performance. *Sports Medicine, 54*(11), 2717–2724. https://doi.org/10.1007/s40279-024-02060-x – Dossier 02; F67.
- Freedman, E. G. (2008). Coordination of the eyes and head during visual orienting. *Experimental Brain Research, 190*(4), 369–387. https://doi.org/10.1007/s00221-008-1504-8 – Volltext (PMC2605952) gelesen; F32.
- Gibaldi, A., & Sabatini, S. P. (2021). The saccade main sequence revised: A fast and repeatable tool for oculomotor analysis. *Behavior Research Methods, 53*(1), 167–187. https://doi.org/10.3758/s13428-020-01388-2 – Volltext (PMC7880984) gelesen, Tab. 5 (9 Personen, 24–39 J.); F28.
- Grondin, S. (2010). Timing and time perception: A review of recent behavioral and neuroscience findings and theoretical directions. *Attention, Perception, & Psychophysics, 72*(3), 561–582. https://doi.org/10.3758/APP.72.3.561 – Volltext (Springer OA) gelesen inkl. Anhang; F49–F52.
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Dossier 01; F63.
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Abstract; F70.
- Heitz, R. P. (2014). The speed-accuracy tradeoff: History, physiology, methodology, and behavior. *Frontiers in Neuroscience, 8*, 150. https://doi.org/10.3389/fnins.2014.00150 – Abstract; F18.
- Huang, J., Tian, F., Fan, X., Zhang, X. (L.), & Zhai, S. (2018). Understanding the uncertainty in 1D unidirectional moving target selection. In *Proceedings of the 2018 CHI Conference on Human Factors in Computing Systems* (S. 1–12). ACM. https://doi.org/10.1145/3173574.3173811 – Dossier 02; F40.
- Jaschinski, W., König, M., Mekontso, T. M., Ohlendorf, A., & Welscher, M. (2015). Computer vision syndrome in presbyopia and beginning presbyopia: Effects of spectacle lens type. *Clinical and Experimental Optometry, 98*(3), 228–233. https://doi.org/10.1111/cxo.12248 – Abstract; F71.
- Kalesnykas, R. P., & Hallett, P. E. (1994). Retinal eccentricity and the latency of eye saccades. *Vision Research, 34*(4), 517–531. https://doi.org/10.1016/0042-6989(94)90165-1 – Abstract; F27.
- Kida, N., Oda, S., & Matsumura, M. (2005). Intensive baseball practice improves the Go/Nogo reaction time, but not the simple reaction time. *Cognitive Brain Research, 22*(2), 257–264. https://doi.org/10.1016/j.cogbrainres.2004.09.003 – Dossier 01; F11.
- Kveraga, K., Boucher, L., & Hughes, H. C. (2002). Saccades operate in violation of Hick's law. *Experimental Brain Research, 146*(3), 307–314. https://doi.org/10.1007/s00221-002-1168-8 – Abstract; F16.
- Lim, J., & Dinges, D. F. (2010). A meta-analysis of the impact of short-term sleep deprivation on cognitive variables. *Psychological Bulletin, 136*(3), 375–389. https://doi.org/10.1037/a0018883 – Abstract; F08.
- Liu, S., Claypool, M., Kuwahara, A., Sherman, J., & Scovell, J. J. (2021). Lower is better? The effects of local latencies on competitive first-person shooter game players. In *Proceedings of the 2021 CHI Conference on Human Factors in Computing Systems* (S. 1–12). ACM. https://doi.org/10.1145/3411764.3445245 – Volltext (Autorenseite WPI) gelesen; F60.
- McAuley, J. H., & Marsden, C. D. (2000). Physiological and pathological tremors and rhythmic central motor control. *Brain, 123*(8), 1545–1567. https://doi.org/10.1093/brain/123.8.1545 – Abstract; F48.
- MDN Web Docs. (o. J.). *Performance: now() method*. Mozilla. Abgerufen am 29.09.2026 von https://developer.mozilla.org/en-US/docs/Web/API/Performance/now – technische Dokumentation (keine DOI); F59.
- Miall, R. C., Weir, D. J., & Stein, J. F. (1993). Intermittency in human manual tracking tasks. *Journal of Motor Behavior, 25*(1), 53–63. https://doi.org/10.1080/00222895.1993.9941639 – Abstract; F38.
- Munoz, D. P., Broughton, J. R., Goldring, J. E., & Armstrong, I. T. (1998). Age-related performance of human subjects on saccadic eye movement tasks. *Experimental Brain Research, 121*(4), 391–400. https://doi.org/10.1007/s002210050473 – Abstract; F30.
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of MobileHCI '06* (S. 203–210). ACM. https://doi.org/10.1145/1152215.1152260 – Dossier 02; F47.
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Abstract; F72.
- Posner, M. I., Snyder, C. R. R., & Davidson, B. J. (1980). Attention and the detection of signals. *Journal of Experimental Psychology: General, 109*(2), 160–174. https://doi.org/10.1037/0096-3445.109.2.160 – Abstract; F17.
- Prablanc, C., Echallier, J. F., Komilis, E., & Jeannerod, M. (1979). Optimal response of eye and hand motor systems in pointing at a visual target. I. *Biological Cybernetics, 35*(2), 113–124. https://doi.org/10.1007/BF00337436 – Abstract; F20.
- Proctor, R. W., & Schneider, D. W. (2018). Hick's law for choice reaction time: A review. *Quarterly Journal of Experimental Psychology, 71*(6), 1281–1299. https://doi.org/10.1080/17470218.2017.1322622 – Abstract + Dossier 04; F13–F15.
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Dossier 01; F58.
- Rayner, K., Schotter, E. R., Masson, M. E. J., Potter, M. C., & Treiman, R. (2016). So much to read, so little time: How do we read, and can speed reading help? *Psychological Science in the Public Interest, 17*(1), 4–34. https://doi.org/10.1177/1529100615623267 – Abstract; F33.
- Rogers, E. J., Trotter, M. G., Johnson, D., Desbrow, B., & King, N. (2024). KovaaK's aim trainer as a reliable metrics platform for assessing shooting proficiency in esports players: A pilot study. *Frontiers in Sports and Active Living, 6*, 1309991. https://doi.org/10.3389/fspor.2024.1309991 – Abstract; F61.
- Sala, G., Tatlidil, K. S., & Gobet, F. (2018). Video game training does not enhance cognitive ability: A comprehensive meta-analytic investigation. *Psychological Bulletin, 144*(2), 111–139. https://doi.org/10.1037/bul0000139 – Dossier 01; F66.
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Dossier 01; F64.
- Soukoreff, R. W., & MacKenzie, I. S. (2004). Towards a standard for pointing device evaluation, perspectives on 27 years of Fitts' law research in HCI. *International Journal of Human-Computer Studies, 61*(6), 751–789. https://doi.org/10.1016/j.ijhcs.2004.09.001 – Volltext (Autorenseite York University) gelesen; F43, F44.
- Talens-Estarelles, C., Cerviño, A., García-Lázaro, S., Fogelton, A., Sheppard, A., & Wolffsohn, J. S. (2023). The effects of breaks on digital eye strain, dry eye and binocular vision: Testing the 20-20-20 rule. *Contact Lens and Anterior Eye, 46*(2), 101744. https://doi.org/10.1016/j.clae.2022.101744 – Abstract; F73.
- W3C. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (W3C Recommendation, 12.12.2024). https://www.w3.org/TR/WCAG22/ – Norm (keine DOI), Dossier 01/03; F77.
- Wolfe, J. M. (2001). Asymmetries in visual search: An introduction. *Perception & Psychophysics, 63*(3), 381–389. https://doi.org/10.3758/BF03194406 – Dossier 03; F21.
- Wright, B. A., Buonomano, D. V., Mahncke, H. W., & Merzenich, M. M. (1997). Learning and generalization of auditory temporal-interval discrimination in humans. *The Journal of Neuroscience, 17*(10), 3956–3963. https://doi.org/10.1523/JNEUROSCI.17-10-03956.1997 – Abstract; F54, F69.

**Umfang:** D.1 = 15 Website-Quellen; D.2 = 52 weitere Einträge (50 mit DOI, 2 Web-Dokumente ohne DOI) plus die
Folgestudie Ando et al. (2004) im Eintrag Ando et al. (2002).

### D.3 Geprüft, aber bewusst nicht aufgenommen

- Cockburn, Ahlström & Gutwin (2012), doi 10.1016/j.ijhcs.2011.11.002 – DOI ✓, aber Abstract nur als Suchmaschinen-Auszug gesehen.
- Bediou et al. (2023), doi 10.1037/tmb0000102 – DOI ✓, Volltext und Abstract nicht zugänglich (HTTP 403).
- Claypool & Claypool (2006), doi 10.1145/1167838.1167860 – DOI ✓; zugänglich war nur ein technischer Bericht mit abweichendem Inhalt.
- Kurita (2001) und Hoffmann (1991) (Dossier 02) – nur bibliografisch geprüft.
- Aussage „Reflex 20–50 ms“ (301): passende Quelle (Frijns et al., 1997) ohne Zahlen im Abstract → nicht belegt, weggelassen.
