# Literaturbasis W05-blick-b – Blickverfolgung unter erschwerten Bedingungen (Nr. 409–415)

Stand: 29.09.2026 · Gruppe W05-blick-b · Übungen:
**409** strobe-prediction-pursuit (Stroboskopisches Sehtraining) · **410** dynamic-evasion-pursuit (Reaktive
Blickverfolgung/Ausweichziel) · **411** spatial-shift-pursuit (Sichtfeldwechsel) · **412**
ghosting-suppress-pursuit (Monitor-Nachzieheffekt) · **413** staircase-step (Vertikale Blickverfolgung bei
Höhenwechsel) · **414** momentum-teleport-pursuit (Sprungziel) · **415** directional-chaos-pursuit
(Richtungschaos).

Querverweise: 401–408 (gleiches Kapitel, parallele Gruppe) – v. a. 404 constant-slow-pursuit (Grundform
„Ball prallt an Wänden ab“), 405 zig-zag-path-pursuit (Richtungswechsel auf fester Bahn), 407
predictive-pursuit (einzelne Verdeckung), 403 sine-wave-pursuit (vorhersagbare Bahn). Blickfit:
`scharf-in-bewegung` (Folgebewegung + dynamische Sehschärfe), `zielfang` (Abfangen). Hintergrund:
`docs/wissenschaft/02-bewegung-verfolgen.md` (Folgebewegung, Sehwinkel-Umrechnung),
`docs/wissenschaft/03-wahrnehmen-und-erfassen.md` Abschnitt 4.7 (Flimmern/Epilepsie – verbindliche
Plattform-Grenzwerte).

**Methode.** Jede DOI wurde über die Crossref-API aufgelöst (Titel, Autor:innen, Jahr, Zeitschrift, Band,
Seiten verglichen). Inhalte wurden über PubMed-Abstracts (E-Utilities), Crossref-/Semantic-Scholar-Abstracts
oder – wo angegeben – über den Volltext eines Reviews geprüft. Vermerke in Teil D:
**[A]** = Abstract gelesen · **[V]** = Volltext/relevanter Volltextabschnitt gelesen · **[S]** = Inhalt nur
über Sekundärquelle bzw. Verlags-Kurzfassung · **[B]** = nur bibliografisch geprüft (Inhalt nicht
eingesehen). Zahlen ohne Literaturbeleg, die aus dem Spielcode abgeleitet sind, stehen getrennt als
**E-Fakten** (eigene Ableitung) und sind von den Autor:innen im Code zu bestätigen.

---

## 0. Vorab: Was die Vorlage technisch tut (Kurzbefund aus dem Spielcode, nur Mechanik)

Geprüft wurden die seitenspezifischen Spiel-Chunks der sieben Seiten (lokale Arbeitsdateien, nicht im Repository). **Kein Originalcode übernommen**, nur Mechanik und Parameter.

Gemeinsam für 409–415:

- Canvas mit fast schwarzem Hintergrund (#050508) und sehr schwachem 40-px-Raster (Deckkraft 2 %; im
  „Day Mode“ weiß mit 5 % Raster). Einstellungen: Dauer 30/45/60/90/120 s, Tempo 0,5×–9×, Zielgröße
  (Standard 16 px **Radius**), Farbe (Standard Rot #ef4444), Schalter „Hide Line“, „Random Speed“, „Gaze
  Trail“, „Neon Glow“, „Scanlines“, „Day Mode“.
- **Keine Eingabe wird ausgewertet, keine Leistung gemessen.** Gespeichert wird nur ein Sitzungszähler
  (`localStorage`). In 410–415 wird lediglich ein Fadenkreuz am Mauszeiger gezeichnet. Die auf den Seiten
  abgedruckten „Leistungsstufen“ (ms, px, %, Gain, „Top 1,5 %“) können von der Seite also **gar nicht
  erhoben werden** (keine Blickmessung, kein Tracking-Score).
- Bewegung ist zeitbasiert (px pro 16 ms × Tempo), einige Effekte sind aber **bildwiederholratenabhängig**
  (siehe E-Fakten).

| Nr. | Was tatsächlich passiert (Code) | Abweichung von der Seitenbeschreibung |
|---|---|---|
| 409 | Ziel prallt an Wänden ab (je Achse 4–7 px/16 ms × Tempo). Zyklus-Zähler steigt **pro Frame** um den Tempo-Faktor; sichtbar bei Zähler < 60, unsichtbar 60–90 (= „60 Frames hell, 30 Frames dunkel“ bei 1×). In der Dunkelphase wird standardmäßig ein **schwacher Umrissring (15 % Deckkraft) an der aktuellen Zielposition** gezeigt; erst „Hide Line“ macht das Ziel wirklich unsichtbar. Nur das kleine Ziel blinkt, **nicht der Bildschirm**. | Zyklus ist frame- statt zeitbasiert → Blinkfrequenz und Dunkeldauer hängen von Monitor-Hz und Tempo ab. Keine Messung von „Landeversatz“. |
| 410 | Alle **500 ms** (mit „Random Speed“ 350–650 ms) neue **zufällige Richtung** (0–360°) und Betrag 5–10 px/16 ms × Tempo; Wandabpraller ×1,05. Richtungslinie (5 × v) zeigt die aktuelle Bewegungsrichtung. | Zeitpunkt der Haken ist vorhersagbar (fester Takt), nur die Richtung nicht. |
| 411 | Pro Frame 1,5 % (Random Speed 3 %) Wahrscheinlichkeit einer **Geschwindigkeitsänderung** (Vorzeichen je Achse zufällig, Betrag ×0,8–1,3, Obergrenze 18 px/16 ms). Wandabpraller ×1,02. Richtungslinie (7 × v). | **Kein Sprung oder Drehen des Bezugsrahmens**, kein „Screen Shake“ – die Beschreibung (PPC-Remapping, Rotationen) passt nicht zur Mechanik. Ereignisrate frame-abhängig. |
| 412 | Wie 404: Ziel prallt ab; optional „Gaze Trail“ = **gezeichnete** Nachzieh-Ringe (letzte 20 Frames, jeder 3., Deckkraft ≤ 25 %); Richtungslinie (6 × v). | Die „Ghosting-Ringe“ sind eine Grafik, **kein Monitor-Artefakt**; kein Messwert der Panel-Reaktionszeit (die Seite sagt das selbst). Trail-Länge in ms frame-abhängig. |
| 413 | Feste Polylinie aus 8 Punkten: x abwechselnd bei 20 % und 80 % der Breite, y in 7 gleichen Stufen von 15 % bis 85 % der Höhe; Ziel läuft mit 0,22 Bahnlängen/s × Tempo hin und zurück. | Die Bahn ist ein **überwiegend horizontaler Zickzack** mit kleinem vertikalem Versatz je Segment (bei 16:9 ca. 5–6° Steigung) und spitzen Wendepunkten – keine überwiegend vertikale Blickfolge. |
| 414 | Ziel prallt ab (4–7 px/16 ms × Tempo); alle **1,2 s** (Random Speed 0,8–1,4 s) **Sprung an einen zufälligen Ort**, Geschwindigkeit bleibt erhalten. Richtungslinie (6 × v). | Passt zur Beschreibung (Positionssprung + Weiterbewegung). |
| 415 | Zufallsbeschleunigung je Frame und Achse (Zufallsweg der Geschwindigkeit), Obergrenze 12 px/16 ms × Tempo je Achse, Wandabpraller ×1,05. Richtungslinie (5 × v). | „Chaos“ ist bei hoher Bildwiederholrate schwächer (siehe E-Fakten). |

---

## A) Prüftabelle der Website-Quellen je Übung

Legende „stützt“: **ja** = Quelle belegt die Aussage, für die die Seite sie anführt · **teilweise** = nur
ein Teil oder nur allgemein · **nein** = Quelle enthält die Aussage nicht oder widerspricht · **unklar** =
Inhalt nicht prüfbar.

### 409 strobe-prediction-pursuit

| # | Angabe der Website | DOI-/Angaben-Prüfung (Crossref) | Stützt Aussage? + Begründung |
|---|---|---|---|
| 1 | Appelbaum, Cain, Schroeder, Darling & Mitroff (2011). Stroboscopic visual training improves information encoding in short-term memory. *PLOS ONE, 6*(10), e27056. doi 10.1371/journal.pone.0027056 | **Falsch.** Die DOI gehört zu Sundqvist et al. (2011, Pflanzenmerkmale in der Tundra). Richtig: Appelbaum et al. (**2012**), *Attention, Perception, & Psychophysics, 74*(8), 1681–1691, **10.3758/s13414-012-0344-6** | **teilweise.** Belegt: Training mit Shutterbrille bei Ballübungen verbesserte das Behalten im visuellen Kurzzeitgedächtnis (Abrufvorteil bei 640–2 560 ms Verzögerung, 24 h stabil). **Nicht** belegt: „interne Vorwärtsmodelle der Zielkinematik“, Blickfolge, Bildschirm-Stroboskop, die Bewertungstabelle. |
| 2 | Mitroff, Friesen, Bennett, Yoo & **Appelbaum** (2013). Enhancing ice hockey skills through stroboscopic training. *Athl. Train. Sports Health Care, 5*(6), 261–264 | DOI korrekt, **Autorenliste falsch** (letzter Autor ist **Reichow, A. W.**, nicht Appelbaum), Titel verkürzt („…Stroboscopic *Visual* Training: *A Pilot Study*“) | **teilweise.** Pilotstudie: 6 NHL-Spieler mit, 5 ohne Strobe, 16 Tage; Präzision beim Schießen/Passen +18 % nur in der Strobe-Gruppe; nicht verblindet, Placebo/Hawthorne möglich (laut Wilkins & Appelbaum 2020). „Zeitliche Antizipation von Pucks“ wurde **nicht** gemessen. |
| 3 | Smith & Mitroff (**2016**). Stroboscopic training enhances anticipatory timing. *J. Sports Sci., 34*(18), 1735–1742. doi 10.1080/02640414.2014.926384 | **Falsch.** DOI gehört zu Mooses et al. (2014, Laufökonomie kenianischer Läufer). Richtig: Smith & Mitroff (**2012**), *Int. J. Exercise Science, 5*(4), 344–353, **10.70252/OTSW1297** | **teilweise.** Brille mit 100 ms sichtbar/150 ms dunkel, 5–7 min Übung am Bassin-Antizipationstimer: genauer direkt nach dem Training, **nicht** mehr nach 10 Tagen. „Dynamische Sehschärfe“ und „Kurzzeitgedächtnis“ nicht untersucht. |
| 4 | Bennett, Orban de Xivry, Barnes & Lefèvre (2007). Target velocity prediction and the tracking of intermittently occluded targets. *Vision Res., 47*(7), 885–898. doi 10.1016/j.visres.2007.01.020 | **Nicht existent.** DOI gehört zu Berry et al. (2007, Ocellen der Heuschrecke). Nächstliegende echte Arbeit derselben Autoren: Bennett et al. (2007), *J. Neurophysiol., 98*(3), 1405–1414, **10.1152/jn.00132.2007** (Beschleunigung bei Verdeckung); zum Thema Verdeckung außerdem Bennett & Barnes (2003) und Orban de Xivry et al. (2006) | **nein** für „Okklusionstraining stärkt Kleinhirn und FEF“ und „trainierte Probanden halten die Geschwindigkeit“ (keine Trainings- oder Hirndaten). **teilweise** für „Geschwindigkeitsgedächtnis/antizipatorisches Wiederbeschleunigen“: Augengeschwindigkeit fällt nach dem Verschwinden ab und steigt vor dem erwarteten Wiederauftauchen wieder an (Bennett & Barnes 2003). Die Aussage „Blickfolge bricht in 100–200 ms ein und zerfällt in Suchsakkaden“ ist überzeichnet: Abbremsen beginnt nach ≈ 190 ms, Restgeschwindigkeit 40–60 % (Becker & Fuchs 1985). |
| 5 | Appelbaum, Schroeder, Cain & Mitroff (**2012**). Improved visual cognition through stroboscopic training. *Front. Psychol., 3*, 276. doi 10.3389/fpsyg.2012.00276 | **Falsch.** DOI gehört zu Nagai (2012, taktile Zeitordnung). Richtig: (**2011**), *Front. Psychol., 2*, 276, **10.3389/fpsyg.2011.00276** | **teilweise.** Strobe-Training (Sportübungen mit Brille) verbesserte zentrale Bewegungsempfindlichkeit und zentrale Aufmerksamkeit (UFOV-Doppelaufgabe), **nicht** peripher und **nicht** Multiple-Object-Tracking. „Dynamische Sehschärfe“ und „Reaktionsantizipation“ wurden nicht gemessen. |
| 6 | Woods, Wyma, Yund, Herron & Reed (2015). Factors influencing the latency of simple reaction time. *Front. Hum. Neurosci., 9*, 131 | korrekt | **nein.** Studie zur einfachen Reaktionszeit (N = 1 469) und zu Hardware-Verzögerungen (≈ 18 ms); nichts zu 144-Hz-Monitoren, „Jitter der Hell-/Dunkelphasen“ oder „Timing des Kleinhirns“. |

### 410 dynamic-evasion-pursuit

| # | Angabe der Website | DOI-/Angaben-Prüfung | Stützt Aussage? + Begründung |
|---|---|---|---|
| 1 | Bahill, Iandolo & Troost (1980). Smooth pursuit eye movements in response to unpredictable target waveforms. *Vision Res., 20*(11), 923–931 | korrekt | **teilweise.** Unvorhersagbare Rampen zufälliger Geschwindigkeit/Dauer; Qualität der Folgebewegung sinkt mit steigender Bandbreite und mit Ermüdung. Die Zahlen „150–200 ms“ und „30°/s Arbeitsgrenze“ stammen nicht aus der (zugänglichen) Kurzfassung. |
| 2 | Rashbass (1961). The relationship between saccadic and smooth **pursuit** eye movements. *J. Physiol., 159*(2), 326–338 | DOI korrekt; Titel lautet „…saccadic and smooth **tracking** eye movements“ (kleiner Fehler) | **teilweise.** Klassiker des Step-Ramp-Paradigmas (Positionsfehler → Sakkade, Geschwindigkeitsfehler → Folgebewegung). Kein Abstract verfügbar, Inhalt nur über Folgeliteratur eingeordnet [B]. Latenz „150–200 ms“ für Korrektursakkaden während der Folgebewegung ist zu hoch: ≈ 125 ms (de Brouwer et al. 2002a). |
| 3 | Krauzlis (2004). Recasting the smooth pursuit eye movement system. *J. Neurophysiol., 91*(2), 591–603 | korrekt | **teilweise.** Review: Folgebewegung nutzt ein ausgedehntes kortikales Netz, FEF mit direktestem Einfluss; Folgebewegung und Sakkaden als „Ergebnisse einer gemeinsamen Kaskade“. „≈ 30°/s Arbeitsgrenze“ nicht im Abstract; die echte Obergrenze liegt bei vielen Menschen bei ≈ 100°/s (Meyer et al. 1985). |
| 4 | Robinson (1965). The mechanics of human smooth pursuit eye movement. *J. Physiol., 180*(3), 569–591 | korrekt | **unklar/nein.** Kein Abstract, Inhalt nicht eingesehen [B]. Die Aussage „das Kleinhirn baut ein Vorwärtsmodell auf, das die Latenz fast auf null reduziert“ ist so nicht Gegenstand dieser mechanischen Analyse; Vorhersage belegen Bahill & McDonald (1983), Barnes (2008), Kowler et al. (2019). |
| 5 | Barnes (2008). Cognitive processes involved in smooth pursuit eye movements. *Brain Cogn., 68*(3), 309–326 | korrekt | **ja** für Vorhersage/extraretinale Signale/Kurzzeitspeicher für Geschwindigkeit; **nein** für die Definition „dynamische Sehkraft“ und die Leistungsstufen. |
| 6 | Woods et al. (2015) | korrekt | **nein** („144 Hz ermöglicht ≈ 10 ms frühere Korrektursakkade“ steht dort nicht). |
| – | Im Text ohne Listeneintrag: „Yang et al., 2025“ | vermutlich Yang, Zhang, Li, Tang, Chen & Jin (2025), *Computers in Human Behavior, 165*, 108573, **10.1016/j.chb.2025.108573** (Zuordnung **unsicher**) | **teilweise.** Querschnitt, N = 63 (28 erfahrene FPS-Spieler, 35 andere): schnellere Ausführung, häufiger „eine Sakkade ohne Zwischenfixation“, kein Genauigkeitsvorteil. Keine Trainingsstudie, nichts zu „Ausweichmanövern“. |
| – | Im Text: „Appelbaum & Erickson, 2018“ | *Int. Rev. Sport Exerc. Psychol., 11*(1), 160–189, **10.1080/1750984X.2016.1266376** (online 2016) | **nein** für Transfer auf Fußball/Tennis: Review findet für klassische Augen-Fitness-Drills nur begrenzte, gemischte Belege (siehe docs/wissenschaft/02). |
| – | Im Text: „Leigh & Zee, 2015“ | Buch, siehe 412 #5 | **unklar** (Buch nicht eingesehen); die Behauptung „Kopfbewegung → Trainingseffekt geht verloren“ ist nicht belegt. |

### 411 spatial-shift-pursuit

| # | Angabe der Website | DOI-/Angaben-Prüfung | Stützt Aussage? + Begründung |
|---|---|---|---|
| 1 | Krauzlis (2004) | korrekt | **teilweise** (Übergang Sakkade → Folgebewegung, gemeinsame Kaskade). „Sakkade überträgt keine Geschwindigkeitsinformation“ ist so nicht richtig: Aufholsakkaden berücksichtigen den Netzhautschlupf (de Brouwer et al. 2002b), und nach Sakkaden wird die Folgebewegung verstärkt (Lisberger 1998, Affen). |
| 2 | Findlay & Walker (1999). A model of saccade generation based on parallel processing and competitive inhibition. *BBS, 22*(4), 661–674 | korrekt; **im Fließtext aber als „Findlay & Gilchrist (1999)“** zitiert (existiert so nicht; Findlay & Gilchrist schrieben das Buch „Active Vision“, 2003) | **nein.** Modell der Sakkadenauslösung (räumlicher und zeitlicher Pfad, Salienzkarte, Gap-/Distraktoreffekt). Nichts zu retinotopem „Zusammenbruch“ bei Bildsprüngen oder PPC-Koordinatentransformation. Parietales Remapping belegt z. B. Duhamel et al. (1992, Affen). |
| 3 | Robinson (1965) | korrekt | **unklar** [B]. |
| 4 | Rashbass (1961) | DOI korrekt, Titel s. o. | **teilweise** [B]. |
| 5 | Kahlon & Lisberger (1996). Coordinate system for learning in the smooth pursuit eye movements of monkeys. *J. Neurosci., 16*(22), 7270–7283 | korrekt | **nein.** Lernen der Folgebewegung bei Affen (Geschwindigkeitswechsel nach 100 ms) ist richtungsspezifisch und liegt in einem Zwischen-Bezugssystem, das durch die Augenbewegungsrichtung definiert ist; es generalisierte über 15–45°/s. Nichts zu Bildschirm-Erschütterungen oder PPC. |
| 6 | Woods et al. (2015) | korrekt | **nein** („Gehirn erhält den Ortsvektor 30–50 ms früher“ – nicht in der Quelle; zudem physikalisch unplausibel, der Bildabstand bei 144 Hz vs. 60 Hz beträgt ≤ 10 ms). |

Hinweis: Die Mechanik (Abschnitt 0) enthält keine Rahmen-Sprünge oder Drehungen. Die zitierte
Remapping-Literatur ist für die tatsächliche Übung (zufällige Richtungs-/Tempowechsel) kaum relevant.

### 412 ghosting-suppress-pursuit

| # | Angabe der Website | DOI-/Angaben-Prüfung | Stützt Aussage? + Begründung |
|---|---|---|---|
| 1 | Burr (1980). Motion smear. *Nature, 284*(5752), 164–165 | korrekt; Untertitel „Two types of visual suppression“ steht nicht im Crossref-Titel | **teilweise.** Das Sehsystem summiert ≈ 120 ms; bewegte Ziele erscheinen trotzdem viel weniger verschmiert als erwartet, wenn sie lange genug für eine klare Bewegungswahrnehmung gezeigt werden. **Nicht** belegt: „Photorezeptor-Abklingzeit“ als Ursache, „V1/MT-Hemmung wird durch die Übung geschärft“, „Schleier kognitiv dämpfen“; nichts zu Monitoren. |
| 2 | Martinez-Conde, Macknik & Hubel (2004). The role of fixational eye movements in visual perception. *Nat. Rev. Neurosci., 5*, 229–240 | korrekt (Heft 3 fehlt) | **teilweise.** Fixationsbewegungen (Mikrosakkaden, Drift, Tremor) verhindern das Verblassen bei **Fixation** (Martinez-Conde et al. 2006, 2013 [A]). Kein Beleg, dass Mikrosakkaden bei der **Folgebewegung** Nachzieh-Spuren ausblenden oder dass „Aufmerksamkeitsbündelung Mikrosakkaden stimuliert und die Sehschärfe maximiert“; „regenerieren Netzhautrezeptoren“ ist vereinfacht (es geht um neuronale Adaptation). Abstract des Reviews nicht verfügbar [S]. |
| 3 | Rolfs (2009). Microsaccades: Small steps on a long way. *Vision Res., 49*(20), 2415–2441 | korrekt | **teilweise** (Funktionen der Mikrosakkaden bei Fixation: Positionskontrolle, gegen Verblassen, Sehschärfe, Aufmerksamkeit); keine Aussage zu Ghosting-Unterdrückung. |
| 4 | Krauzlis (2004) | korrekt | **nein** für „ab ≈ 30°/s entsteht retinaler Schlupf, der Nachbilder hinterlässt“ (nicht im Abstract; Schlupf tritt bei jeder Geschwindigkeit auf, Gain < 0,95 schon bei langsamen Zielen, Collewijn & Tamminga 1984). |
| 5 | Leigh & Zee (2015). *The Neurology of Eye Movements* (5th ed.). OUP. doi 10.1093/med/9780199969**203**.001.0001 | **DOI falsch** (bei Crossref nicht vorhanden). Richtig: **10.1093/med/9780199969289.001.0001** (Buch, Oxford Medicine Online) | **unklar** [B]. Standardwerk; die konkrete Aussage „Kopfbewegung verhindert gezielte Beanspruchung der Mikrobewegungen“ ist nicht belegt. Kopf-Augen-Folgebewegung ist der natürliche Normalfall. |
| 6 | Woods et al. (2015) | korrekt | **nein** (keine Aussage zu Schlieren, GtG oder „unverfälschter biologischer Fixationsmessung“). |
| – | Im Text: Yang et al. 2025; Appelbaum & Erickson 2018 | s. 410 | **teilweise/nein** wie bei 410. |

### 413 staircase-step

| # | Angabe der Website | DOI-/Angaben-Prüfung | Stützt Aussage? + Begründung |
|---|---|---|---|
| 1 | Rottach, Zivotofsky, Das, Averbuch-Heller, DiScenna, Poonyathalang & Leigh (1996). Comparison of horizontal, vertical and diagonal smooth pursuit**, eye-head pursuit and saccades** in normal human subjects. *Vision Res., 36*(14), 2189–2195 | DOI korrekt; **Titel falsch erweitert** (echter Titel endet mit „…smooth pursuit eye movements in normal human subjects“) | **teilweise.** N = 5: bei vorhersagbaren Bahnen (Sinus/Dreieck) war der Gain horizontal bei allen größer als vertikal. **Aber:** beim *Start* der Folgebewegung zeigten 4 von 5 eher **größere** Beschleunigung vertikal – das widerspricht „längere Reaktionslatenzen vertikal“. Keine Gain-Werte für „Elite 0,92–0,98“; keine Auf-/Ab-Asymmetrie untersucht. |
| 2 | Collewijn & Tamminga (1984). *J. Physiol., 351*(1), 217–250. doi 10.1113/jphysiol.1984.sp01524**3** | **DOI falsch** (gehört zu Miyashita & Nagao 1984, Purkinjezellen/VOR beim Kaninchen). Richtig: **10.1113/jphysiol.1984.sp015242** | **teilweise.** N = 10: Gain der glatten Komponente immer < 0,95, sinkt mit Geschwindigkeit; strukturierter Hintergrund senkt Folgebewegung horizontal um ≈ 10 %, vertikal um ≈ 20 %; horizontal „etwas glatter und präziser“; bei Rhombus-Bahnen antizipatorische Richtungsfehler (relevant für Ecken). |
| 3 | Ke, Lam, Pai & Spering (2013). Directional asymmetries in human smooth pursuit eye movements. *IOVS, 54*(6), 4409–4421. doi 10.1167/iovs.12-113**96** | **DOI falsch** (gehört zu Pilch et al. 2013, OCT-Segmentierung). Richtig: **10.1167/iovs.12-11369** | **ja** für die Richtungsasymmetrie: abwärts schneller und glatter als aufwärts (höhere Beschleunigung, Spitzengeschwindigkeit, Gain; weniger und spätere Aufholsakkaden), in oberem und unterem Gesichtsfeld; horizontal genauer als vertikal. **Nein** für die Erklärung „Koaktivierung M. rectus superior/obliquus inferior, geringere neuronale Verstärkung“ (die Autor:innen deuten die Asymmetrie als Anpassung an bevorzugte Bewegungsrichtungen). |
| 4 | Büttner-Ennever & Horn (1997). Anatomical substrates of oculomotor control. *Curr. Opin. Neurobiol., 7*(6), 872–879 | korrekt | **teilweise.** Getrennte, parallel laufende Schaltkreise je Augenbewegungstyp; viele Strukturen an mehreren beteiligt. riMLF/Cajal-Kern für vertikale Sakkaden bzw. Blickhalten sind Lehrbuchwissen, aber „exklusive Kontrolle“ und „Unterstimulation durch den Alltag“ sind nicht belegt. Vertikale Folgebewegung ist schon bei Säuglingen schwächer (Grönqvist et al. 2006) – spricht gegen „Zivilisationsgewohnheiten“ als Ursache. |
| 5 | Lisberger (2010). Visual tracking in primates: Neural mechanisms of smooth pursuit eye movements. *Curr. Opin. Neurobiol., 20*(4), 405–410. doi 10.1016/j.conb.2010.04.004 | **Falsch** (Titel/Zeitschrift existieren so nicht; DOI gehört zu Semaan & Kauffman 2010, Fortpflanzungs-Schaltkreise). Gemeint ist wahrscheinlich Lisberger (2010), *Neuron, 66*(4), 477–491, **10.1016/j.neuron.2010.03.027** | **ja** (mit korrigierter Quelle) für „≈ 100 ms Latenz“: 100 ms visueller Bewegung werden in den Start der Folgebewegung umgesetzt. „Kann scharfe Ecken nicht kontinuierlich durchlaufen“ ist plausibel, aber bei *vorhersagbaren* Ecken antizipiert das System (Collewijn & Tamminga 1984; Kowler et al. 2019). |
| 6 | Woods et al. (2015) | korrekt | **nein** („Burst-Neuronen des Mittelhirns lösen bei 144 Hz punktgenaue Korrektursakkaden aus“ – nicht in der Quelle). |

Weitere unbelegte Seitenaussagen: „vertikale Augenmuskeln ermüden wesentlich rascher“ (kein Beleg
gefunden), Gain-Tabelle „Top 1,5 %“ (keine Datengrundlage; die Seite misst nichts).

### 414 momentum-teleport-pursuit

| # | Angabe der Website | DOI-/Angaben-Prüfung | Stützt Aussage? + Begründung |
|---|---|---|---|
| 1 | Rashbass (1961) | DOI korrekt, Titel s. o. | **teilweise** [B]. Getrennte Verarbeitung von Positions- und Geschwindigkeitsfehler ist der klassische Befund; „getrennte kortikale Netzwerke“, „Moosfasersystem“ stammen nicht aus dieser Arbeit, und Krauzlis (2004) betont gerade die gemeinsame Architektur. |
| 2 | Bahill, Iandolo & Troost (1980) | korrekt | **nein** für „sakkadische Suppression … zur Verhinderung von Bewegungsunschärfe“ (Thema der Arbeit ist Folgebewegung bei unvorhersagbaren Bahnen). Passende Quelle: Ross et al. (2001). |
| 3 | Findlay & Walker (1999) | korrekt | **nein** für „jede zögerliche bogenförmige Suchbewegung verlängert die Latenz dramatisch“ (nicht Gegenstand des Modells). |
| 4 | Krauzlis (2004) | korrekt | **teilweise.** |
| 5 | Barnes (2008) | korrekt | **ja** für „Geschwindigkeit wird in einem Kurzzeitspeicher (extraretinal) gehalten und für Vorhersage genutzt“. |
| 6 | Woods et al. (2015) | korrekt | **nein** („144/240 Hz halbieren/vierteln die Latenz und minimieren Schlieren“ – nicht Gegenstand; Spjut et al. 2019 zeigen zudem, dass Latenz wichtiger ist als Bildfrequenz). |
| – | Im Text: „Leigh & Zee (2015)“ | s. 412 #5 | **unklar**. |

Weitere Seitenaussagen: „sensorische Weiterleitung 100–130 ms“ – passt zu 100 ± 5 ms Folgebewegungs-Latenz
(Carl & Gellman 1987) bzw. ≈ 125 ms Aufholsakkaden-Latenz (de Brouwer et al. 2002a); „Sakkade 20–40 ms
Flugzeit“ – plausibel für kleine bis mittlere Sakkaden, hier nicht eigens geprüft; „Augenmuskeln
verbrauchen rasch Glykogen“ und „Palming senkt den okulomotorischen Tonus“ – **ohne Beleg**.

### 415 directional-chaos-pursuit

| # | Angabe der Website | DOI-/Angaben-Prüfung | Stützt Aussage? + Begründung |
|---|---|---|---|
| 1 | Bahill, Iandolo & Troost (1980) | korrekt | **teilweise** (unvorhersagbare Bahnen verschlechtern die Folgebewegung). „Raten führt zu Fehlsakkaden, Zeitverlust verdoppelt“ – nicht prüfbar/nicht in der Kurzfassung. |
| 2 | Barnes (2008) | korrekt | **ja** für „bei periodischen Bahnen gleicht Vorhersage die Verzögerung aus“. |
| 3 | Krauzlis (2004) | korrekt | **teilweise**; „≈ 30°/s“ nicht belegt (s. o.). |
| 4 | Robinson (1965) | korrekt | **unklar** [B]. |
| 5 | Rashbass (1961) | DOI korrekt, Titel s. o. | **teilweise** [B]. |
| 6 | Woods et al. (2015) | korrekt | **nein** („bis zu 12 ms früher wahrnehmen“). |
| – | Im Text: Yang et al. 2025; Appelbaum & Erickson 2018; Leigh & Zee 2015 | s. 410/412 | wie dort. |

### Zusammenfassung Teil A

- **22 verschiedene Quellen** in den Literaturlisten der 7 Seiten (Woods et al. 2015 auf allen 7 Seiten) plus
  **3 nur im Fließtext** genannte Angaben (Yang et al. 2025, Appelbaum & Erickson 2018, „Findlay &
  Gilchrist 1999“).
- **Bibliografisch fehlerhaft: 11 von 22.**
  - **8 schwer** (DOI führt zu fremder Arbeit oder Angabe existiert nicht): Appelbaum „2011 PLOS ONE“,
    Smith & Mitroff „2016“, Bennett et al. „2007 Vision Res.“ (nicht existent), Appelbaum „2012 Front.“,
    Leigh & Zee (DOI), Collewijn & Tamminga (DOI), Ke et al. (DOI), Lisberger „2010 Curr. Opin.“ (nicht
    existent).
  - **3 leicht:** Mitroff et al. 2013 (falscher Letztautor, Titel verkürzt), Rottach et al. 1996 (Titel falsch
    erweitert), Rashbass 1961 („pursuit“ statt „tracking“).
  - Dazu 1 Zitierfehler im Text („Findlay & Gilchrist“ statt Findlay & Walker).
- **Inhaltlich:** Keine einzige Quelle stützt die Leistungstabellen („Top 1,5 %“, ms-, px-, Gain-Stufen),
  die Hirnareal-Aussagen („stärkt riMLF/PPC/Kleinhirn“) oder die 144-Hz-Vorteile. Woods et al. (2015)
  wird 7-mal für Monitor-Aussagen zitiert, die dort nicht stehen. Die Stroboskop-Studien betreffen
  **Shutterbrillen bei Sportübungen**, nicht ein blinkendes Ziel am Bildschirm.

---

## B) Faktenliste „Aussage – Zahl – Quelle“

Kurzzitate verweisen auf Teil D (dort APA + DOI + Prüfvermerk). Sehwinkel-Umrechnungen siehe
docs/wissenschaft/02, Abschnitt 4 (1 cm in 57 cm ≈ 1°; iPad 11″ bei 40 cm ≈ 36 CSS-px/°).

### B1 Glatte Folgebewegung – Grundlagen

- **F01** Folgebewegungs-Latenz: **100 ± 5 ms** für Ziele ≥ 5°/s (N = 7, Suchspule); feste
  Verarbeitungszeit **98 ms** plus Mindestbewegung **0,028°**; auch Positionssprünge lösen nach ≈ 100 ms
  eine kurze Folgebeschleunigung aus. – Carl & Gellman (1987), 10.1152/jn.1987.57.5.1446
- **F02** Präsakkadische Beschleunigung ≈ **50°/s²** bei 10°/s Zielgeschwindigkeit; beginnt der
  Netzhautschlupf **15°** neben der Fovea, gibt es keine messbare präsakkadische Folgebewegung. – Carl &
  Gellman (1987)
- **F03** Die Folgebewegung setzt **≈ 100 ms** visueller Bewegung in ihren Start um; beteiligt sind MT,
  Kleinhirn und das Folgebewegungsareal im FEF. – Lisberger (2010), 10.1016/j.neuron.2010.03.027
- **F04** Gain der glatten Komponente **immer < 0,95** und sinkt mit der Zielgeschwindigkeit; Streuung des
  Netzhaut-Positionsfehlers **0,2–1,3°**, etwa proportional zur Zielgeschwindigkeit; Sakkaden ergänzen die
  fehlende Amplitude (N = 10). – Collewijn & Tamminga (1984), 10.1113/jphysiol.1984.sp015242
- **F05** Strukturierter Hintergrund hemmt die Folgebewegung horizontal um **≈ 10 %**, vertikal um
  **≈ 20 %** (durch mehr Sakkaden kompensiert). – Collewijn & Tamminga (1984)
- **F06** Obergrenze: bei 4 von 5 Personen Augengeschwindigkeit **≈ 90 %** der Zielgeschwindigkeit bis
  **100°/s**, danach Sättigung (SD 16°/s); eine Person nur 60 %. Die Website-Grenze „≈ 30°/s“ ist damit zu
  niedrig. – Meyer, Lasker & Robinson (1985), 10.1016/0042-6989(85)90160-9
- **F07** Folgebewegung und Sakkaden teilen eine funktionelle Architektur („gemeinsame
  sensomotorische Kaskade“), FEF mit direktestem Einfluss; Basalganglien, Colliculus superior und
  Hirnstamm sind beteiligt. – Krauzlis (2004), 10.1152/jn.00801.2003
- **F08** Vorhersage: antizipatorische Augenbewegungen in Richtung erwarteter Bewegung, Folgebewegung
  während Verdeckung, höhere Genauigkeit bei selbst erzeugten/natürlichen Bahnen; Folgebewegung gilt
  zunehmend als **prädiktive** Antwort. – Kowler et al. (2019), 10.1146/annurev-vision-091718-014901
- **F09** Nach dem visuell getriebenen Start übernehmen **extraretinale** Mechanismen (Efferenzkopie,
  Kurzzeitspeicher für Geschwindigkeit und Timing) die Aufrechterhaltung; Aufmerksamkeit erhöht den Gain
  für das gewählte Objekt. – Barnes (2008), 10.1016/j.bandc.2008.08.020
- **F10** Bei unvorhersagbaren Bahnen (Rampen zufälliger Geschwindigkeit/Dauer) sinkt die Qualität der
  Folgebewegung mit steigender Bandbreite und mit **Ermüdung**. – Bahill, Iandolo & Troost (1980),
  10.1016/0042-6989(80)90073-5 [S]

### B2 Aufholsakkaden, Richtungswechsel, Positionssprünge (410, 411, 414, 415)

- **F11** Auslöser für Aufholsakkaden ist die vorhergesagte „Eye crossing time“ T_XE: liegt sie **zwischen
  40 und 180 ms**, bleibt die Verfolgung rein glatt; sonst folgt nach **≈ 125 ms** eine Sakkade. – de
  Brouwer et al. (2002a), 10.1152/jn.00432.2001
- **F12** Aufholsakkaden verrechnen Positionsfehler **und** Netzhautschlupf (sagen die Bahn voraus); das
  Sakkadensystem braucht **≈ 90 ms**, um eine Bahnänderung zu berücksichtigen; der Beitrag des Schlupfes
  sättigt oberhalb **15°/s**; die Folgebewegung addiert sich während der Sakkade. – de Brouwer et al.
  (2002b), 10.1152/jn.00621.2001
- **F13** Nach einer Sakkade auf ein bewegtes Ziel ist die Folgegeschwindigkeit deutlich höher als davor
  („postsakkadische Verstärkung“, Affen; 3°-Zielsprünge, bis 15° variiert); eine simulierte Sakkade
  (Hintergrund 150°/s für 20 ms) hatte diesen Effekt nicht. – Lisberger (1998),
  10.1152/jn.1998.79.4.1918
- **F14** Bei einem abrupten, unvorhersagbaren **Richtungswechsel** sinkt die Folgegeschwindigkeit nach
  **≈ 90 ms**, die Richtung ändert sich erst später; die Antwort lässt sich als Überlagerung „Stopp alt“ +
  „Start neu“ beschreiben, mit Richtungsanisotropien. – Soechting, Mrotek & Flanders (2005),
  10.1007/s00221-004-2010-2
- **F15** Sakkaden lösen eine Unterdrückung der visuellen Empfindlichkeit aus (spezifisch für das
  magnozelluläre System, dämpft Bewegungsempfindung) und eine kurzzeitige Verzerrung des Raumes. – Ross,
  Morrone, Goldberg & Burr (2001), 10.1016/S0166-2236(00)01685-4
- **F16** Parietale Neurone (Affe) verschieben ihr rezeptives Feld schon **vor** einer Sakkade und
  aktualisieren die Netzhautkoordinaten erinnerter Reize („Remapping“). – Duhamel, Colby & Goldberg
  (1992), 10.1126/science.1553535
- **F17** Lernen der Folgebewegung (Affen, Geschwindigkeitswechsel nach 100 ms) ist **richtungsspezifisch**
  (kein Übertrag auf die Gegenrichtung), generalisiert aber über **15–45°/s** und über Farbe/Größe. –
  Kahlon & Lisberger (1996), 10.1523/JNEUROSCI.16-22-07270.1996

### B3 Verdeckung, intermittierende Sicht, Vorhersage (409, 414)

- **F18** Verschwindet ein gleichförmig bewegtes Ziel, beginnt die Folgebewegung **≈ 190 ms** später stark
  abzubremsen; das Abbremsen dauert **≈ 280 ms**; danach bleibt eine **Restgeschwindigkeit** über bis zu
  **4 s** fast konstant. – Becker & Fuchs (1985), 10.1007/BF00237843
- **F19** Restgeschwindigkeit: **≈ 60 %** der normalen Folgegeschwindigkeit bei immer gleichem Tempo; bei
  zufälligem Tempo **55 / 47 / 39 %** für **5 / 10 / 20°/s**; Gain der „Vorhersage“ während der Verdeckung
  **0,4–0,6**. Schon **≤ 300 ms** Sicht reichen, um eine tempotypische Restgeschwindigkeit aufzubauen. –
  Becker & Fuchs (1985)
- **F20** Ohne je ein bewegtes Ziel gesehen zu haben, entsteht bei erwartetem Start eine „Standard“-Bewegung
  mit Spitze **≈ 5°/s** nach 300 ms und danach **2–4°/s**. – Becker & Fuchs (1985)
- **F21** Bei erwarteter Wiederkehr fällt die Augengeschwindigkeit zunächst ab und steigt **vor** dem
  Wiedererscheinen wieder an (7 von 9 Personen); der Zeitpunkt dieses Anstiegs passte sich **nicht** an die
  Verdeckungsdauer an – bei 900 ms kam er zu früh. – Bennett & Barnes (2003), 10.1152/jn.01145.2002
- **F22** Während der Verdeckung gleichen Sakkaden die Schwankungen der glatten Komponente aus: Die
  Blickposition beim Wiedererscheinen war unabhängig davon, wie weit die glatte Bewegung kam;
  Augengeschwindigkeit richtete sich nach erwarteter Geschwindigkeit, Sakkaden nach erwarteter Position. –
  Orban de Xivry, Bennett, Lefèvre & Barnes (2006), 10.1152/jn.00596.2005
- **F23** Beschleunigung wird für die Vorhersage erst nach **500–800 ms** Sicht genutzt, nach **200 ms**
  noch nicht; Schlupf und Positionsfehler blieben beim Wiedererscheinen bestehen. – Bennett, Orban de
  Xivry, Barnes & Lefèvre (2007), 10.1152/jn.00132.2007
- **F24** Bei kreisförmiger Bahn treibt ein **zeitlich fortgeschriebenes** internes Bewegungsmodell
  (Kurzzeit-Geschwindigkeitsgedächtnis) die Folgebewegung in der Verdeckung. – Orban de Xivry, Missal &
  Lefèvre (2008), 10.1167/8.15.6
- **F25** **Trainierbarkeit (Labor):** Mit Belohnung für genaues Folgen stieg der Gain während der
  Verdeckung von **0,59 auf 0,89** nach **8–10** täglichen Sitzungen, mit weniger Sakkaden und Übertrag auf
  ungeübte Geschwindigkeiten und strukturierten Hintergrund; Kontrolle mit zufälliger Belohnung **0,60 →
  0,63**, ohne Belohnung **0,63 → 0,71**. – Madelain & Krauzlis (2003), 10.1152/jn.00869.2002
- **F26** Folgebewegungstraining mit quasi-zufälligem Ziel (**2 × 6 min an 3 Tagen**, N = 10 vs. 10)
  verbesserte die Folgebewegung, noch **5 Tage** später messbar. – Eibenberger, Ring & Haslwanter (2012),
  10.1007/s00221-012-3009-8 (Zahlen aus docs/wissenschaft/02 übernommen)

### B4 Vertikale Folgebewegung, Richtungsasymmetrie, Alter (413)

- **F27** Gain bei vorhersagbarer Bewegung horizontal **größer** als vertikal (alle 5 Personen), auch in den
  Komponenten diagonaler und kreisförmiger Bahnen; beim **Start** zeigten 4 von 5 tendenziell **größere**
  Beschleunigung vertikal. – Rottach et al. (1996), 10.1016/0042-6989(95)00302-9
- **F28** **Abwärts** schneller und glatter als **aufwärts** (höhere Beschleunigung, Spitzengeschwindigkeit
  und Gain, weniger und spätere Aufholsakkaden) – im oberen und unteren Gesichtsfeld (Exp. 2: n = 22);
  horizontal genauer als vertikal. – Ke, Lam, Pai & Spering (2013), 10.1167/iovs.12-11369
- **F29** Vertikales Verfolgen ist schon bei Säuglingen (5, 7, 9 Monate) dem horizontalen unterlegen. –
  Grönqvist, Gredebäck & von Hofsten (2006), 10.1016/j.visres.2005.11.007
- **F30** Maximale Blickauslenkung nach **oben**: Ältere **32,9°** vs. Junge **43,1°**; nach **unten** 32,8°
  vs. 46,8°; vertikale Sakkaden-Latenz im Alter verlängert, Genauigkeit geringer (16 ältere, 10
  mittelalte, 13 junge Personen). – Huaman & Sharpe (1993), PMID 8325760 (keine DOI)
- **F31** Folgebewegungs-Gain bei 75–93-Jährigen gegenüber 18–43-Jährigen bei **allen** Geschwindigkeiten
  geringer, Unterschied wächst mit Geschwindigkeit und Beschleunigung; Sakkaden-Reaktionszeit länger,
  Streuung größer. – Moschner & Baloh (1994), 10.1093/geronj/49.5.M235
- **F32** Sakkaden (N = 168, 5–79 J.): 20–30-Jährige am schnellsten und konstantesten; 60–79-Jährige
  langsamer und mit längerer Sakkadendauer; 5–8-Jährige langsam und stark schwankend. – Munoz et al.
  (1998), 10.1007/s002210050473
- **F33** Augenbewegungsmaße (Latenzen, Genauigkeit, Geschwindigkeiten; Sakkaden, Antisakkaden,
  Folgebewegung) sind bei > 1 000 jungen Erwachsenen **sehr zuverlässig** (Retest 10 %, Median 18,8 Tage). –
  Bargary et al. (2017), 10.1016/j.visres.2017.03.001 (Kennwerte im Abstract nicht beziffert)

### B5 Fixation, Mikrosakkaden, wahrgenommene Bewegungsunschärfe (412)

- **F34** Zeitliche Summation des Sehsystems **≈ 120 ms** bei Tageslicht; bewegte Ziele wirken trotzdem viel
  weniger verschmiert als erwartet, sofern die Bewegung lange genug klar gesehen wird. – Burr (1980),
  10.1038/284164a0
- **F35** Entsteht die Netzhautbewegung durch eine **eigene Augen- oder Kopfbewegung**, wird weniger
  Verschmierung wahrgenommen – aber nur für Ziele, die sich **gegen** die Blickrichtung bewegen; bei
  Vektion keine Reduktion. – Bedell, Tong & Aydin (2010), 10.1016/j.visres.2010.09.025
- **F36** Vor dem Verblassen (Troxler) eines peripheren Ziels sinken Wahrscheinlichkeit, Rate und Größe der
  Mikrosakkaden, vor dem Wiedersichtbarwerden steigen sie. – Martinez-Conde et al. (2006),
  10.1016/j.neuron.2005.11.033
- **F37** Fixationsbewegungen (Mikrosakkaden, Drift, Tremor) verhindern neuronale Adaptation an unveränderte
  Reize. – Martinez-Conde, Otero-Millan & Macknik (2013), 10.1038/nrn3405; Funktionen der Mikrosakkaden:
  Rolfs (2009), 10.1016/j.visres.2009.08.010
- **F38** Mikrosakkaden-Rate bei Fixation typischerweise **≈ 1–2 pro Sekunde** (Größe bis ≈ 1°). –
  **unsicher/Sekundärzitat** (in mehreren Übersichten Martinez-Conde et al. 2004 zugeschrieben; Primärtext
  nicht eingesehen). Die Website-Angabe „1–3 pro Sekunde“ liegt in diesem Rahmen.

### B6 Bildschirm: Bildfrequenz, Sample-and-hold, Latenz, Browser (alle, besonders 409, 412)

- **F39** Psychophysik (480-Hz-CRT als Referenz): **120 Bilder/s** bringen gegenüber 60 eine deutliche
  Verbesserung bei Unschärfe/Ruckeln; die Verbesserung **sättigt bei ≈ 240 Bilder/s** (natürliche Bilder
  in Standardauflösung). – Kuroki et al. (2007), 10.1889/1.2451560
- **F40** Die bei LCDs wahrgenommene Bewegungsunschärfe korreliert eng mit der gemessenen
  **Moving-Picture Response Time** (MPRT/EBET). – Someya & Sugiura (2007), 10.1889/1.2451570
- **F41** **Haltezeit** bestimmt die Unschärfe: bei **13,4 ms** Haltezeit stieg die wahrgenommene Unschärfe
  mit der Geschwindigkeit von ≈ **3 auf 22 px**; bei **8/6/4/2 ms** blieb sie bei **2–5 px**; 2 ms
  entsprechen ≈ **6′**. – Geri & Morgan (2007), 10.1889/1.2451573
- **F42** Physikalische Abschätzung (Sample-and-hold, folgendes Auge): Verschmierung ≈ v × Haltezeit ≈ v/f;
  bei **60 Hz und 10°/s ≈ 10′**, bei 120 Hz ≈ 5′. – eigene Ableitung in docs/wissenschaft/02 (Prinzip nach
  Kurita 2001, dort nur bibliografisch geprüft); gestützt durch F41.
- **F43** Bei 8 geübten E-Sportlern verbesserte **geringere Latenz** die Zeit in Zielaufgaben klar; höhere
  Bildfrequenz allein hatte nur **geringe** Effekte, wenn man die mit ihr verbundene Latenzsenkung
  herausrechnet (bei manchen Tracking-Aufgaben kleiner, grenzwertig signifikanter Effekt). – Spjut et al.
  (2019), 10.1145/3355088.3365170
- **F44** Einfache Reaktionszeit im präzisen Computertest: **231 ms** (213 ms nach Abzug der
  Hardware-Verzögerung, also ≈ **18 ms** Geräteanteil), +**0,55 ms/Jahr**; Reizentdeckungszeit **131 ms**,
  altersunabhängig (N = 1 469; Replikation N = 189). – Woods et al. (2015), 10.3389/fnhum.2015.00131
- **F45** Browser-Experimente sind weniger präzise als Laborsoftware; Antwortzeit-Präzision der meisten
  Pakete **< 10 ms** in allen Browsern (PsychoPy < 3,5 ms), große Unterschiede zwischen
  Betriebssystem/Browser (> 110 000 Durchgänge). – Bridges et al. (2020), 10.7717/peerj.9414

### B7 Stroboskop-Training – was wirklich untersucht wurde (409)

- **F46** Brillen: Nike Vapor Strobe mit fester **100-ms-Offenphase** und **67–900 ms** Dunkelphase in 8
  Stufen; in Studien **1–6 Hz**, meist Stufen 2–4 (**≈ 3–5 Hz**); 2019 gab es erst **7** begutachtete
  Wirksamkeitsstudien. Training erfolgte bei **Sportübungen** (Fangen, Passen), nicht am Bildschirm. –
  Wilkins & Appelbaum (2020), 10.1080/1750984X.2019.1582081 [V]
- **F47** Smith & Mitroff: **100 ms sichtbar / 150 ms dunkel (= 4 Hz)**, 5–7 min Training; Vorteil nur
  direkt danach, **nicht nach 10 Tagen**. – Smith & Mitroff (2012), 10.70252/OTSW1297; Wilkins &
  Appelbaum (2020)
- **F48** Appelbaum et al. 2011: Verbesserung der **zentralen** Bewegungsempfindlichkeit und der zentralen
  Aufmerksamkeit (UFOV-Doppelaufgabe), **keine** Verbesserung peripher und beim Multiple-Object-Tracking. –
  Appelbaum, Schroeder, Cain & Mitroff (2011), 10.3389/fpsyg.2011.00276
- **F49** Appelbaum et al. 2012: besseres Behalten im Kurzzeitgedächtnis bei **640–2 560 ms**
  Verzögerung, **24 h** stabil. – Appelbaum, Cain, Schroeder, Darling & Mitroff (2012),
  10.3758/s13414-012-0344-6
- **F50** Eishockey-Pilot: **6 vs. 5** NHL-Spieler, **16 Tage**, Präzision **+18 %**; nicht verblindet. –
  Mitroff et al. (2013), 10.3928/19425864-20131030-02, Inhalt über Wilkins & Appelbaum (2020) [S]
- **F51** Variable vs. konstante Strobe-Rate (N = 30): **kein** Gruppenunterschied; Verbesserungen im
  Fangen korrelierten mit Verbesserungen in UFOV und Bewegung-in-Tiefe. – Wilkins & Gray (2015),
  10.2466/22.25.PMS.121c11x0
- **F52** Elite-Nachwuchs-Badminton (N = 32, Ø 13,7 J., 10 Wochen): visuomotorische Reaktionszeit **251 → 238
  ms** (d = 0,63), nach 6 Wochen **241 ms**; Kontrolle 252 → 256 → 253 ms; Feldtests **ohne**
  Gruppenunterschied. – Hülsdünker, Gunasekara & Mierau (2021), 10.1249/MSS.0000000000002541
- **F53** Strobe-Brille nur beim Aufwärmen (N = 28 Tischtennis international): **kein** Zusatznutzen für die
  Reaktionsgeschwindigkeit. – Strainchamps et al. (2023), 10.1123/ijspp.2022-0426
- **F54** Metaanalyse (17 Studien): **während** Strobe-Sicht schlechtere Leistung (SMD 0,50 Genauigkeit,
  0,51 Zeit); nach **längerem** Training Verbesserung (SMD −0,71 [−1,41; −0,02] Genauigkeit, −1,10 [−2,11;
  −0,08] Zeit ≈ **5,7 % bzw. 5,3 %**). – Vera et al. (2026), 10.1080/02640414.2025.2598176
- **F55** Dreistufen-Metaanalyse (13 Studien, 30 Effektgrößen): **g = 0,35** (0,12–0,58) auf
  sportspezifische Leistung; Trainingshäufigkeit als Moderator; Verzerrungsrisiko und Evidenzgüte „mittel“
  (GRADE). – Wang et al. (2026), 10.1080/02640414.2025.2592441
- **F56** Metaanalyse nur RCTs (14): Kognition **SMD 0,64** (0,29–0,98; I² = 81 %), Sportleistung **SMD 0,58**
  (0,37–0,78; I² = 64 %); längere Gesamtdauer → größere Effekte. – Guo J. et al. (2025),
  10.3389/fspor.2025.1705693
- **F57** **Übertragbarkeit auf 409:** Alle genannten Studien nutzen **Shutterbrillen über das ganze
  Gesichtsfeld bei realen Bewegungsaufgaben**. Zu einem kleinen, am Bildschirm blinkenden Ziel ohne
  Handlung wurde **keine** Trainingsstudie gefunden (PubMed-Suche „stroboscopic“ + Review/Metaanalyse,
  09/2026). – Befund dieser Recherche

### B8 Trainierbarkeit und Transfer allgemein

- **F58** Digitales Sport-Sehtraining (33 RCTs, 1 048 Teilnehmende): große Effekte vor allem, wenn Training
  und Test am selben Gerät stattfanden, z. B. visuelle Aufmerksamkeit **SMD 1,65** mit vs. **0,07** (95 %-KI
  −0,25 bis 0,38) ohne „Lerneffekt“. – Guo Y. et al. (2025), 10.3389/fphys.2025.1664572 (aus
  docs/wissenschaft/02)
- **F59** Kein belastbarer Beleg für **Ferntransfer** allgemeinen Wahrnehmungs-/Kognitionstrainings auf
  Sportleistung (Fransen 2024, 10.1007/s40279-024-02060-x); Gegenposition „begrenzte Evidenz ist nicht keine
  Evidenz“ (Appelbaum et al. 2025, 10.1007/s40279-024-02141-x).
- **F60** Präregistrierter Review (126 Artikel): „vielversprechende vorläufige Evidenz“, wenige rigorose
  Studien; am robustesten sind **sportspezifische, naturalistische** Trainings. – Lochhead et al. (2024),
  10.1080/1750984X.2024.2437385 (aus docs/wissenschaft/02)
- **F61** Hirntraining: verlässliche Verbesserung in der geübten Aufgabe, weniger in eng verwandten, kaum
  Belege für entfernte Aufgaben und Alltag. – Simons et al. (2016), 10.1177/1529100616661983
- **F62** Beim Abfangen bewegter Objekte dienen Augenbewegungen der Vorhersage und der Genauigkeit der
  Hand; ihr Nutzen hängt von visueller Sicherheit und Vorhersagbarkeit der Bewegung ab (Review). – Fooken,
  Kreyenmeier & Spering (2021), 10.1016/j.visres.2021.02.007
- **F63** Erfahrene FPS-Spieler (28 vs. 35) führten Zielaufgaben schneller aus und zeigten häufiger eine
  einzelne Sakkade ohne Zwischenfixation; **kein** Genauigkeitsvorteil (Querschnitt, kein Training). – Yang
  et al. (2025), 10.1016/j.chb.2025.108573 [S]

### B9 Sicherheit: Photosensitivität, Vektion, Augenbelastung

- **F64** Durch Licht ausgelöste Anfälle bei ≈ **1 : 10 000** Menschen, bei 5–24-Jährigen ≈ **1 : 4 000**;
  am stärksten provozierend **15–25 Hz**, wirksam **1–65 Hz**; Rot ist ein zusätzlicher Faktor; viele
  Betroffene wissen nichts davon. – Fisher et al. (2005), 10.1111/j.1528-1167.2005.31405.x (Zahlen aus
  docs/wissenschaft/03 übernommen, dort geprüft)
- **F65** Expertenkonsens: Blitz potenziell gefährlich bei **≥ 20 cd/m²**, **≥ 3 Hz** und **≥ 0,006 sr**. –
  Harding et al. (2005), 10.1111/j.1528-1167.2005.31305.x
- **F66** WCAG 2.2 SC 2.3.1 (A): nichts blitzt **mehr als 3-mal pro Sekunde**, *oder* der Blitz liegt unter
  der allgemeinen und der roten Blitzschwelle (Fläche ≤ **0,006 sr** in einem 10°-Feld, ≈ 25 %); SC 2.3.2
  (AAA): höchstens 3 Blitze/s **ohne Ausnahme**; SC 2.2.2: Bewegtes/Blinkendes > 5 s muss stoppbar sein. –
  W3C (2024), aus docs/wissenschaft/03
- **F67** Normen setzen veraltete Betrachtungsabstände voraus; Tablets werden aus ≈ **29 cm** genutzt; man
  soll sich an den **strengsten** Grenzwerten orientieren. – Jordan & Vanderheiden (2024), 10.1145/3694790
- **F68** Die Strobe-Brillen-Übersicht empfiehlt: Personen mit Epilepsie oder Anfällen in der Vorgeschichte
  sollen die Brille **nicht** nutzen; Athlet:innen beobachten; Verletzungsgefahr durch gestörte Sicht bei
  Bewegung. Ihre Aussage, die Brille arbeite „unterhalb der Anfallsschwelle“, steht im Widerspruch zu F64/F65
  (3–6 Hz liegen im wirksamen Bereich). – Wilkins & Appelbaum (2020) [V]
- **F69** Großflächige Bewegungsdarstellungen können starke Vektion und potenziell visuell induzierte
  Reisekrankheit auslösen; der Zusammenhang Vektion ↔ Übelkeit ist nicht abschließend geklärt. – Keshavarz
  et al. (2015), 10.3389/fpsyg.2015.00472 [V, Zitat]
- **F70** Digitale Augenbelastung: Prävalenz **≥ 50 %** bei Bildschirmnutzer:innen; Beschwerden durch
  Akkommodations-/Vergenzstress und trockenes Auge; Maßnahmen u. a. Korrektion von Fehlsichtigkeit/
  Alterssichtigkeit, Pausen. – Sheppard & Wolffsohn (2018), 10.1136/bmjophth-2018-000146
- **F71** Lidschlagrate sinkt bei Bildschirmarbeit im Mittel **auf ein Fünftel**. – Patel et al. (1991),
  10.1097/00006324-199111000-00010

### B10 Optiker-Bezug

- **F72** Gleitsicht (11 Presbyope, 45–71 J., Lesen am Bildschirm in 60 cm): klares Zwischenbereichs-Sehfeld
  horizontal nur **13–18°** (zwei PAL-Designs) gegenüber **60°** bei Einstärkenglas; mit PAL längere
  Augenbewegungen, spätere Blickstabilisierung, längere Kopfbewegungen. – Han et al. (2003),
  10.1167/iovs.02-0507
- **F73** Neue Gleitsichtträger (N = 10) setzen während der Eingewöhnung **mehr Kopfbewegungen** ein. –
  Hutchings et al. (2007), 10.1111/j.1475-1313.2006.00460.x
- **F74** Rot-Grün-Sehschwäche: ≈ **8 %** der Männer und ≈ **0,4 %** der Frauen europäischer Herkunft. – Birch
  (2012), 10.1364/JOSAA.29.000313

### B11 Eigene Ableitungen aus dem Spielcode (keine Literaturwerte; von Autor:innen zu bestätigen)

- **E01 (409) Blinkfrequenz** f = Bildwiederholrate × Tempo / 90. Beispiele: **60 Hz:** 1× 0,67 Hz · 3× 2,0
  Hz · 5× 3,3 Hz · 9× 6,0 Hz. **120 Hz:** 1× 1,3 Hz · 3× 4,0 Hz · 9× 12 Hz. **144 Hz:** 1× 1,6 Hz · 2× 3,2 Hz ·
  5× 8,0 Hz · 9× **14,4 Hz**. **240 Hz:** 9× **24 Hz**. Ab etwa 5× (60 Hz) bzw. 2× (144 Hz) werden **> 3
  Blinks/s** erreicht; bei 144–240 Hz und hohem Tempo liegt die Frequenz im besonders provozierenden Bereich
  15–25 Hz (F64).
- **E02 (409) Dunkeldauer** = 30 / (Tempo × Hz): 60 Hz/1× **500 ms**, 144 Hz/1× **208 ms**, 60 Hz/3× 167 ms,
  144 Hz/3× 69 ms. Sichtphase 60 Hz/1× 1 000 ms, 144 Hz/1× 417 ms. Da das Abbremsen erst ≈ 190 ms nach dem
  Verschwinden einsetzt (F18), fordern **kurze Dunkelphasen die Vorhersage kaum**; die „Extrapolation“ ist
  bei **langsamem Tempo am 60-Hz-Gerät** am größten – umgekehrt zur Website-Tabelle („Elite 3,5–5×“).
- **E03 (409) Blitzfläche:** Ziel-Ø 32 px (Radius 16) ≈ 8,9 mm am 24″-Full-HD-Monitor (0,277 mm/px) in 60 cm
  ≈ 0,85° ≈ **1,7·10⁻⁴ sr** (≈ 3 % von 0,006 sr); iPad 11″ in 30 cm ≈ 3,3·10⁻⁴ sr (≈ 5–6 %). Damit liegt das
  Blinken **unter der WCAG-Flächenschwelle** (2.3.1 formal erfüllt), **verletzt aber 2.3.2 (AAA)** und die
  Plattform-Grenze **≤ 2,5 Hz Dauerpulsieren** (docs/wissenschaft/03) ab den in E01 genannten Stufen.
  Standardfarbe #ef4444: R/(R+G+B) ≈ 0,64 < 0,8 → nach WCAG-Arbeitsdefinition kein „gesättigtes Rot“, aber
  rot; Hell-Dunkel-Kontrast zum Schwarz sehr hoch. „Neon Glow“ vergrößert die leuchtende Fläche.
- **E04 Geschwindigkeiten (1×):** Abprall-Ziele (409, 412, 414) je Achse 4–7 px/16 ms = 250–440 px/s, Betrag
  ≈ 350–620 px/s ≈ **9–16°/s** (24″-FHD in 60 cm, ≈ 38 px/°) bzw. ≈ 10–17°/s (iPad 11″ in 40 cm, 36 px/°).
  Bei 5× ≈ 47–82°/s, bei 9× ≈ **85–150°/s** – oberhalb der Folgebewegungs-Sättigung (F06), dann nur noch
  sakkadisches „Hinterherspringen“. 410: Betrag 5–10 px/16 ms ≈ 8–16°/s; 415: bis 12 px/16 ms je Achse ≈ 20°/s
  je Achse; 411: Obergrenze 18 px/16 ms je Achse ≈ 30°/s × Tempo; 413: ≈ 0,65 s pro Segment, bei ≈ 1 000 px
  Canvas-Breite ≈ 25°/s überwiegend horizontal, vertikaler Anteil nur ≈ 2°/s.
- **E05 Bildfrequenz-Abhängigkeit der Aufgabe selbst:** 409 (Blinkzyklus in Frames), 411 (Ereignis-
  Wahrscheinlichkeit pro Frame: ≈ 0,9 Wechsel/s bei 60 Hz, ≈ 2,2/s bei 144 Hz), 412 (Nachzieh-Spur = 20 Frames
  = 333 ms bei 60 Hz, 139 ms bei 144 Hz), 415 (Zufallsweg: Varianz der Geschwindigkeitsänderung pro Sekunde
  ∝ Frame-Dauer → bei 144 Hz nur ≈ 0,42-fach, also „ruhigeres Chaos“). Ein 144-Hz-Monitor verändert also die
  **Übung**, nicht nur die Darstellung – Vergleiche nur **am selben Gerät**.
- **E06 Keine Messung:** In 409–415 wird weder Blick noch Zeigerabstand ausgewertet; alle Tabellenwerte der
  Seiten sind nicht erhebbar. Eine seriöse Leistungsmessung der Blickfolge braucht einen Eyetracker (Gain,
  Sakkadenzahl) oder eine manuelle Ersatzaufgabe (Zeiger/Finger folgen lassen, Abstand messen).
- **E07 Hilfslinien:** In 410–415 zeigt standardmäßig eine Linie die aktuelle Bewegungsrichtung (Länge 5–7 ×
  Frame-Schritt ≈ 80–110 ms Vorausschau) – ein **Vorhersage-Hinweis**; in 409 zeigt ein schwacher Ring die Lage
  des „unsichtbaren“ Ziels. Erst „Hide Line“ entfernt diese Hilfen.

---

## C) Evidenz-Zusammenfassung (für die Autor:innen)

### C1 Was gut belegt ist (Grundlagen, Evidenz stark)

- Glatte Folgebewegung ist nie perfekt (Gain < 0,95), wird durch Aufholsakkaden ergänzt (≈ 125 ms Latenz,
  Auslöser T_XE außerhalb 40–180 ms) und startet ≈ 100 ms nach Bewegungsbeginn (F01, F04, F11).
- Vorhersagbare Bahnen werden ohne Verzögerung verfolgt, unvorhersagbare deutlich schlechter (F08–F10;
  docs/wissenschaft/02: Bahill & McDonald 1983, Barnes et al. 1987).
- Bei Verdeckung fällt die Augengeschwindigkeit nach ≈ 190 ms auf 40–60 % ab und kann vor dem erwarteten
  Wiederauftauchen wieder ansteigen; Sakkaden gleichen Positionsfehler aus (F18–F24).
- Vertikal ist schlechter als horizontal, aufwärts schlechter als abwärts (F27–F29) – schon bei Säuglingen,
  also keine Folge von „Unterforderung im Alltag“.
- Folgebewegung und Sakkaden werden im Alter langsamer bzw. ungenauer; der Blickbereich nach oben schrumpft
  (F30–F32).

### C2 Was für die Übungen daraus folgt – je Nummer (Vorschlag, keine Festlegung)

| Nr. | Kern (Profil-Kandidaten mit Wert 3) | Evidenz Übungseffekt / naher Transfer / Alltag (Vorschlag) | Begründung |
|---|---|---|---|
| 409 | blickfolge, antizipation; (zeitliche_aufloesung eher 1–2: Blinken ist Rahmenbedingung, nicht zu beurteilen) | **schwach / schwach / fehlend** | Occlusion-Folgebewegung ist im Labor trainierbar (F25, mit Belohnung und Eyetracker-Rückmeldung – die Vorlage gibt **keine** Rückmeldung). Strobe-Brillen-Evidenz (F46–F56: kleine bis mittlere Effekte, heterogen) ist **nicht übertragbar** (F57). |
| 410 | blickfolge, sakkaden; bewegungswahrnehmung 2 | **schwach / fehlend / fehlend** | Richtungswechsel-Antwort gut beschrieben (F14), Training dieser Aufgabe nicht untersucht; Taktung 500 ms vorhersagbar. |
| 411 | blickfolge, sakkaden (tatsächlich: zufällige Tempo-/Richtungswechsel) | **schwach / fehlend / fehlend** | Remapping-Literatur (F16) passt nicht zur Mechanik; kein Rahmen-Sprung. |
| 412 | blickfolge, selektive_aufmerksamkeit (Ablenkung durch gezeichnete Spur); fixation eher 1–2 | **unklar / fehlend / fehlend** | Kein Beleg, dass man „Ghosting unterdrücken“ lernen kann; wahrgenommene Unschärfe ist v. a. Display- (F39–F42) und Augenbewegungs-abhängig (F35). |
| 413 | blickfolge, antizipation (feste, vorhersagbare Bahn mit spitzen Wenden) | **schwach / fehlend / fehlend** | Bahn überwiegend horizontal (E04); vertikale Asymmetrie-Literatur (F27–F28) nur eingeschränkt anwendbar. |
| 414 | sakkaden, blickfolge; antizipation 2 (Takt 1,2 s, Geschwindigkeit bleibt) | **schwach / fehlend / fehlend** | Step-Ramp-Grundlagen (F11–F13) gut belegt, Training nicht untersucht. |
| 415 | blickfolge, sakkaden; antizipation 0–1 (bewusst unvorhersagbar) | **schwach / fehlend / fehlend** | Unvorhersagbare Bahnen senken die Folgequalität (F10); Eibenberger et al. (F26) fand kurzfristige Verbesserung mit quasi-zufälligem Ziel – beste Analogie, aber Labor, N = 10. |

Allgemein für alle sieben: `stereosehen` 0; `naharbeit_dauer` 1 (60-s-Runden am Bildschirm); motorische
Schlüssel ≈ 0 (keine Eingabe nötig; höchstens `kontinuierliche_steuerung` 1, falls jemand mit der Maus
mitführt – wird nicht ausgewertet); `daueraufmerksamkeit` 2 (60 s ununterbrochen); `zeitdruck` 1–2;
`sprachabhaengigkeit` 0. `bewegungsreize_schwindel`: kleines Ziel auf ruhigem Grund → eher 1 (keine
großflächige Bewegung, F69); bei hohem Tempo/Chaos 2. `flimmern_lichtreize`: **409 = 3** (E01–E03),
übrige 0–1 (412 mit „Gaze Trail“ keine Helligkeitsblitze).

### C3 Sicherheit und Auswahlhinweise

- **409 Stroboskop – Photosensitivität:** Die Vorlage blinkt nur ein kleines Ziel (unter WCAG-Flächenschwelle),
  erreicht aber je nach Monitor und Tempo **> 3 Hz bis 24 Hz** (E01) und verletzt die strengere
  WCAG-AAA-Regel sowie die Plattform-Grenze (≤ 2,5 Hz). Für eine Blickfit-Umsetzung: Zyklus **zeitbasiert** (ms
  statt Frames), Blinkrate **≤ 2,5 Hz** (z. B. 600–1 000 ms sichtbar / 300–600 ms verdeckt), Ziel weich aus-/
  einblenden statt hart schalten, kein gesättigtes Rot, Warnhinweis vor dem Start, Pause/Stopp jederzeit.
  `vorsicht_bei`: photosensitive_epilepsie, migraene_lichtempfindlich, kopfschmerz_asthenopie. Die Website
  selbst rät Personen mit Photosensibilität/Epilepsie/Migräne ab – das deckt sich mit F64–F68.
- **Alle (409–415):** anhaltendes konzentriertes Folgen reduziert den Lidschlag (F71) → trockenes Auge
  (`trockenes_auge_bildschirm`); Kopfschmerz/Asthenopie möglich (F70). Hohe Tempi (≥ 5×) übersteigen die
  Folgebewegung (F06, E04) und erzeugen nur noch Sakkaden-Hetze → für Einsteiger:innen und Ältere ungeeignet.
- **Schwindel/Vektion:** gering, da kleines Ziel und ruhiger Hintergrund (F69); bei `schwindel_vestibulaer`,
  `reisekrankheit` dennoch Vorsicht bei 411/415 (ständige, unvorhersagbare Richtungswechsel) und hohen
  Tempi. `nystagmus` bei allen Blickfolge-Übungen als Auswahlhinweis (eingeschränkte Folgebewegung möglich –
  keine medizinische Aussage).
- **Kopf ruhig halten:** Die Website-Begründung (VOR „zerstört den Trainingseffekt“) ist nicht belegt. Für
  eine *Augen*-Folgebewegungsübung ist ruhiger Kopf sinnvoll, weil sonst Kopfbewegung die Aufgabe übernimmt;
  für **Gleitsichtträger:innen** ist Kopfbewegung aber die natürliche Strategie (F72–F73).

### C4 Optiker-Hinweise (für `voraussetzungen`, `weniger_geeignet_fuer`)

- **Gleitsicht/Alterssichtigkeit (`presbyopie_gleitsicht`):** Am Bildschirm (≈ 50–70 cm, Zwischenbereich)
  ist der scharfe Korridor seitlich schmal (13–18° statt 60°, F72). Große horizontale Auslenkungen (alle
  Abprall-Übungen über die ganze Bildbreite; 413 zu 20 %/80 % der Breite; 414 Sprünge an beliebige Orte)
  führen in die unscharfe Randzone → Kopfbewegung nötig oder kleineres Fenster/größerer Abstand;
  Arbeitsplatz-/Bildschirmbrille (Office-Glas) ist oft günstiger. **Vertikal:** Blick nach unten gerät in den
  Nahteil (zu stark für 60 cm), nach oben in den Fernteil → bei 413 (Höhenwechsel) und bei Bildschirmen über
  Augenhöhe unscharf. Monitoroberkante etwa auf/unter Augenhöhe.
- **Bildschirmabstand:** Tablets werden näher gehalten (≈ 29–40 cm, F67; docs/wissenschaft/02 4.3). Je
  näher, desto größer der Sehwinkel eines Pixels: Dieselbe Bewegung in px/s ergibt am Tablet in 30 cm mehr
  °/s als in 40 cm, und die Umrechnung unterscheidet sich zwischen Geräten (Pixelgröße, E04). Tempo daher
  in °/s definieren und Abstand/Gerät mitspeichern; bei Nahabstand Akkommodation/Konvergenz (Presbyopie!)
  beachten.
- **Farbsehschwäche (`farbsehschwaeche`):** Zielfarbe ist nicht aufgabenrelevant (wählbar) → Farbe 0;
  Standard-Rot auf Schwarz kann für Protan-Betroffene dunkler/kontrastärmer wirken – hellere Farbe
  anbieten (≈ 8 % der Männer, F74).
- **Sehschärfe:** Ziel 32 px Ø ≈ 0,85° → `sehschaerfe_detail` 0–1; niedriger Visus/Kontrast erschwert eher das
  Sehen des schwachen Rings (409) bzw. der Richtungslinie (Deckkraft 25 %).
- **Monitor-Technik (412):** Die „Ghosting-Ringe“ der Vorlage sind gezeichnet. Echte Bewegungsunschärfe am
  Monitor hängt von Haltezeit/MPRT ab (F40–F42), nicht vom „Trainieren“; 120 Hz ist deutlich besser als 60 Hz,
  über ≈ 240 Hz kaum noch (F39). Latenz ist für Zielaufgaben wichtiger als Bildfrequenz (F43).

### C5 Formulierungs-Hinweise (rechtlich)

- Nicht übernehmen: „wissenschaftlich validiertes Interventionsprotokoll“, „stärkt Mittelhirn/PPC/Kleinhirn“,
  „Elite/Top 1,5 %“, „Monitor-Nachzieheffekt-**Test**“ als Messversprechen, „dynamische Sehkraft steigern“,
  Transfer auf Sport/E-Sport/Straßenverkehr.
- Stattdessen: „Übung zum Folgen eines Ziels bei kurzen Unterbrechungen/Richtungswechseln/Positionssprüngen;
  man wird in der Aufgabe selbst mit Übung sicherer; ein Nutzen für Alltag oder Sport ist nicht belegt.“

---

## D) Literaturliste (nur geprüfte Einträge)

Prüfvermerk: **CR ✓** = DOI per Crossref aufgelöst, Metadaten stimmen · [A] Abstract · [V] Volltext(-teil) ·
[S] Sekundär/Kurzfassung · [B] nur bibliografisch. „W“ = von der Website zitiert (korrigierte Angabe).

### D1 Von der Website zitierte Quellen (korrigiert)

1. (W) Appelbaum, L. G., Cain, M. S., Schroeder, J. E., Darling, E. F., & Mitroff, S. R. (2012). Stroboscopic visual training improves information encoding in short-term memory. *Attention, Perception, & Psychophysics, 74*(8), 1681–1691. https://doi.org/10.3758/s13414-012-0344-6 — CR ✓ [A]; Website: falsches Jahr/Journal/DOI
2. (W) Appelbaum, L. G., Schroeder, J. E., Cain, M. S., & Mitroff, S. R. (2011). Improved visual cognition through stroboscopic training. *Frontiers in Psychology, 2*, 276. https://doi.org/10.3389/fpsyg.2011.00276 — CR ✓ [A]; Website: falsches Jahr/Band/DOI
3. (W) Bahill, A. T., Iandolo, M. J., & Troost, B. T. (1980). Smooth pursuit eye movements in response to unpredictable target waveforms. *Vision Research, 20*(11), 923–931. https://doi.org/10.1016/0042-6989(80)90073-5 — CR ✓ [S]
4. (W) Barnes, G. R. (2008). Cognitive processes involved in smooth pursuit eye movements. *Brain and Cognition, 68*(3), 309–326. https://doi.org/10.1016/j.bandc.2008.08.020 — CR ✓ [A]
5. (W, korrigiert) Bennett, S. J., Orban de Xivry, J.-J., Barnes, G. R., & Lefèvre, P. (2007). Target acceleration can be extracted and represented within the predictive drive to ocular pursuit. *Journal of Neurophysiology, 98*(3), 1405–1414. https://doi.org/10.1152/jn.00132.2007 — CR ✓ [A]; die Website-Angabe (Vision Res. 47(7)) existiert nicht
6. (W) Burr, D. (1980). Motion smear. *Nature, 284*(5752), 164–165. https://doi.org/10.1038/284164a0 — CR ✓ [A]
7. (W) Büttner-Ennever, J. A., & Horn, A. K. E. (1997). Anatomical substrates of oculomotor control. *Current Opinion in Neurobiology, 7*(6), 872–879. https://doi.org/10.1016/S0959-4388(97)80149-3 — CR ✓ [A]
8. (W) Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 — CR ✓ [A]; Website-DOI (…243) falsch
9. (W) Findlay, J. M., & Walker, R. (1999). A model of saccade generation based on parallel processing and competitive inhibition. *Behavioral and Brain Sciences, 22*(4), 661–674. https://doi.org/10.1017/S0140525X99002150 — CR ✓ [A]
10. (W) Kahlon, M., & Lisberger, S. G. (1996). Coordinate system for learning in the smooth pursuit eye movements of monkeys. *The Journal of Neuroscience, 16*(22), 7270–7283. https://doi.org/10.1523/JNEUROSCI.16-22-07270.1996 — CR ✓ [A]
11. (W) Ke, S. R., Lam, J., Pai, D. K., & Spering, M. (2013). Directional asymmetries in human smooth pursuit eye movements. *Investigative Ophthalmology & Visual Science, 54*(6), 4409–4421. https://doi.org/10.1167/iovs.12-11369 — CR ✓ [A]; Website-DOI (…11396) falsch
12. (W) Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 — CR ✓ [A]
13. (W) Leigh, R. J., & Zee, D. S. (2015). *The neurology of eye movements* (5th ed.). Oxford University Press. https://doi.org/10.1093/med/9780199969289.001.0001 — CR ✓ [B] (Buch, nicht eingesehen); Website-DOI (…969203…) falsch
14. (W, korrigiert) Lisberger, S. G. (2010). Visual guidance of smooth-pursuit eye movements: Sensation, action, and what happens in between. *Neuron, 66*(4), 477–491. https://doi.org/10.1016/j.neuron.2010.03.027 — CR ✓ [A]; Website-Angabe (Curr. Opin. Neurobiol. 20(4)) existiert nicht
15. (W) Martinez-Conde, S., Macknik, S. L., & Hubel, D. H. (2004). The role of fixational eye movements in visual perception. *Nature Reviews Neuroscience, 5*(3), 229–240. https://doi.org/10.1038/nrn1348 — CR ✓ [B] (kein Abstract verfügbar; Inhalt über Nr. 44/45 eingeordnet)
16. (W) Mitroff, S. R., Friesen, P., Bennett, D., Yoo, H., & Reichow, A. W. (2013). Enhancing ice hockey skills through stroboscopic visual training: A pilot study. *Athletic Training & Sports Health Care, 5*(6), 261–264. https://doi.org/10.3928/19425864-20131030-02 — CR ✓ [S] (über Nr. 54); Website: falscher Letztautor
17. (W) Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 — CR ✓ [B]
18. (W) Robinson, D. A. (1965). The mechanics of human smooth pursuit eye movement. *The Journal of Physiology, 180*(3), 569–591. https://doi.org/10.1113/jphysiol.1965.sp007718 — CR ✓ [B]
19. (W) Rolfs, M. (2009). Microsaccades: Small steps on a long way. *Vision Research, 49*(20), 2415–2441. https://doi.org/10.1016/j.visres.2009.08.010 — CR ✓ [A]
20. (W) Rottach, K. G., Zivotofsky, A. Z., Das, V. E., Averbuch-Heller, L., DiScenna, A. O., Poonyathalang, A., & Leigh, R. J. (1996). Comparison of horizontal, vertical and diagonal smooth pursuit eye movements in normal human subjects. *Vision Research, 36*(14), 2189–2195. https://doi.org/10.1016/0042-6989(95)00302-9 — CR ✓ [A]; Website-Titel falsch erweitert
21. (W) Smith, T. Q., & Mitroff, S. R. (2012). Stroboscopic training enhances anticipatory timing. *International Journal of Exercise Science, 5*(4), 344–353. https://doi.org/10.70252/OTSW1297 — CR ✓ [A]; Website: falsches Jahr/Journal/DOI
22. (W) Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 — CR ✓ [A]
23. (W, nur Fließtext) Appelbaum, L. G., & Erickson, G. (2018). Sports vision training: A review of the state-of-the-art in digital training techniques. *International Review of Sport and Exercise Psychology, 11*(1), 160–189. https://doi.org/10.1080/1750984X.2016.1266376 — CR ✓ (Inhalt in docs/wissenschaft/02 geprüft)
24. (W, nur Fließtext, Zuordnung unsicher) Yang, L., Zhang, W., Li, P., Tang, H., Chen, S., & Jin, X. (2025). The aiming advantages in experienced first-person shooter gamers: Evidence from eye movement patterns. *Computers in Human Behavior, 165*, 108573. https://doi.org/10.1016/j.chb.2025.108573 — CR ✓ [S]

### D2 Zusätzliche Fachliteratur

25. Appelbaum, L. G., Lochhead, L., Feng, J., Erickson, G., Liu, S., & Laby, D. M. (2025). Limited evidence is not no evidence: A rebuttal to Fransen, 2024. *Sports Medicine, 55*(1), 241–242. https://doi.org/10.1007/s40279-024-02141-x — CR ✓ (online 2024)
26. Bargary, G., Bosten, J. M., Goodbourn, P. T., Lawrance-Owen, A. J., Hogg, R. E., & Mollon, J. D. (2017). Individual differences in human eye movements: An oculomotor signature? *Vision Research, 141*, 157–169. https://doi.org/10.1016/j.visres.2017.03.001 — CR ✓ [A]
27. Becker, W., & Fuchs, A. F. (1985). Prediction in the oculomotor system: Smooth pursuit during transient disappearance of a visual target. *Experimental Brain Research, 57*(3), 562–575. https://doi.org/10.1007/BF00237843 — CR ✓ [A]
28. Bedell, H. E., Tong, J., & Aydin, M. (2010). The perception of motion smear during eye and head movements. *Vision Research, 50*(24), 2692–2701. https://doi.org/10.1016/j.visres.2010.09.025 — CR ✓ [A]
29. Bennett, S. J., & Barnes, G. R. (2003). Human ocular pursuit during the transient disappearance of a visual target. *Journal of Neurophysiology, 90*(4), 2504–2520. https://doi.org/10.1152/jn.01145.2002 — CR ✓ [A]
30. Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 — CR ✓ [A]
31. Bridges, D., Pitiot, A., MacAskill, M. R., & Peirce, J. W. (2020). The timing mega-study: Comparing a range of experiment generators, both lab-based and online. *PeerJ, 8*, e9414. https://doi.org/10.7717/peerj.9414 — CR ✓ [A]
32. Carl, J. R., & Gellman, R. S. (1987). Human smooth pursuit: Stimulus-dependent responses. *Journal of Neurophysiology, 57*(5), 1446–1463. https://doi.org/10.1152/jn.1987.57.5.1446 — CR ✓ [A]
33. de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002a). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 — CR ✓ [A]
34. de Brouwer, S., Missal, M., Barnes, G., & Lefèvre, P. (2002b). Quantitative analysis of catch-up saccades during sustained pursuit. *Journal of Neurophysiology, 87*(4), 1772–1780. https://doi.org/10.1152/jn.00621.2001 — CR ✓ [A]
35. Duhamel, J.-R., Colby, C. L., & Goldberg, M. E. (1992). The updating of the representation of visual space in parietal cortex by intended eye movements. *Science, 255*(5040), 90–92. https://doi.org/10.1126/science.1553535 — CR ✓ [A]
36. Eibenberger, K., Ring, M., & Haslwanter, T. (2012). Sustained effects for training of smooth pursuit plasticity. *Experimental Brain Research, 218*(1), 81–89. https://doi.org/10.1007/s00221-012-3009-8 — CR ✓ (Inhalt in docs/wissenschaft/02 geprüft)
37. Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x — CR ✓ (Inhalt in docs/wissenschaft/03 geprüft)
38. Fooken, J., Kreyenmeier, P., & Spering, M. (2021). The role of eye movements in manual interception: A mini-review. *Vision Research, 183*, 81–90. https://doi.org/10.1016/j.visres.2021.02.007 — CR ✓ [A]
39. Fransen, J. (2024). There is no supporting evidence for a far transfer of general perceptual or cognitive training to sports performance. *Sports Medicine, 54*(11), 2717–2724. https://doi.org/10.1007/s40279-024-02060-x — CR ✓ (docs/wissenschaft/02)
40. Geri, G. A., & Morgan, W. D. (2007). The effect of FLCoS-display hold time on the perceived blur of moving imagery. *Journal of the Society for Information Display, 15*(1), 87–91. https://doi.org/10.1889/1.2451573 — CR ✓ [A]
41. Grönqvist, H., Gredebäck, G., & von Hofsten, C. (2006). Developmental asymmetries between horizontal and vertical tracking. *Vision Research, 46*(11), 1754–1761. https://doi.org/10.1016/j.visres.2005.11.007 — CR ✓ [A]
42. Guo, J., Zhao, L., Liu, G., Li, H., & Wu, J. (2025). Stroboscopic training effects on athletic performance and cognitive function across populations, purposes, and skill types: A systematic review and meta-analysis of randomized controlled trials. *Frontiers in Sports and Active Living, 7*, 1705693. https://doi.org/10.3389/fspor.2025.1705693 — CR ✓ [A]
43. Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 — CR ✓ (docs/wissenschaft/02)
44. Martinez-Conde, S., Macknik, S. L., Troncoso, X. G., & Dyar, T. A. (2006). Microsaccades counteract visual fading during fixation. *Neuron, 49*(2), 297–305. https://doi.org/10.1016/j.neuron.2005.11.033 — CR ✓ [A]
45. Martinez-Conde, S., Otero-Millan, J., & Macknik, S. L. (2013). The impact of microsaccades on vision: Towards a unified theory of saccadic function. *Nature Reviews Neuroscience, 14*(2), 83–96. https://doi.org/10.1038/nrn3405 — CR ✓ [A]
46. Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 — CR ✓ [A]
47. Harding, G., Wilkins, A. J., Erba, G., Barkley, G. L., & Fisher, R. S. (2005). Photic- and pattern-induced seizures: Expert consensus of the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1423–1425. https://doi.org/10.1111/j.1528-1167.2005.31305.x — CR ✓ (docs/wissenschaft/03)
48. Huaman, A. G., & Sharpe, J. A. (1993). Vertical saccades in senescence. *Investigative Ophthalmology & Visual Science, 34*(8), 2588–2595. PMID 8325760 — keine DOI; PubMed ✓ [A]
49. Hülsdünker, T., Gunasekara, N., & Mierau, A. (2021). Short- and long-term stroboscopic training effects on visuomotor performance in elite youth sports. Part 1: Reaction and behavior. *Medicine & Science in Sports & Exercise, 53*(5), 960–972. https://doi.org/10.1249/MSS.0000000000002541 — CR ✓ [A]
50. Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x — CR ✓ [A] (Lillakas per Erratum ergänzt)
51. Jordan, J. B., & Vanderheiden, G. C. (2024). International guidelines for photosensitive epilepsy: Gap analysis and recommendations. *ACM Transactions on Accessible Computing, 17*(3), 1–35. https://doi.org/10.1145/3694790 — CR ✓ (docs/wissenschaft/03)
52. Keshavarz, B., Riecke, B. E., Hettinger, L. J., & Campos, J. L. (2015). Vection and visually induced motion sickness: How are they related? *Frontiers in Psychology, 6*, 472. https://doi.org/10.3389/fpsyg.2015.00472 — CR ✓ [A, V-Zitat]
53. Kowler, E., Rubinstein, J. F., Santos, E. M., & Wang, J. (2019). Predictive smooth pursuit eye movements. *Annual Review of Vision Science, 5*, 223–246. https://doi.org/10.1146/annurev-vision-091718-014901 — CR ✓ [A]
54. Wilkins, L., & Appelbaum, L. G. (2020). An early review of stroboscopic visual training: Insights, challenges and accomplishments to guide future studies. *International Review of Sport and Exercise Psychology, 13*(1), 65–80. https://doi.org/10.1080/1750984X.2019.1582081 — CR ✓ [V] (Autorenmanuskript, DukeSpace)
55. Kuroki, Y., Nishi, T., Kobayashi, S., Oyaizu, H., & Yoshimura, S. (2007). A psychophysical study of improvements in motion-image quality by using high frame rates. *Journal of the Society for Information Display, 15*(1), 61–68. https://doi.org/10.1889/1.2451560 — CR ✓ [A]
56. Lisberger, S. G. (1998). Postsaccadic enhancement of initiation of smooth pursuit eye movements in monkeys. *Journal of Neurophysiology, 79*(4), 1918–1930. https://doi.org/10.1152/jn.1998.79.4.1918 — CR ✓ [A]
57. Lochhead, L., Feng, J., Laby, D. M., & Appelbaum, L. G. (2024). Training vision in athletes to improve sports performance: A systematic review of the literature. *International Review of Sport and Exercise Psychology, 19*(2), 333–355. https://doi.org/10.1080/1750984X.2024.2437385 — CR ✓ (docs/wissenschaft/02)
58. Madelain, L., & Krauzlis, R. J. (2003). Effects of learning on smooth pursuit during transient disappearance of a visual target. *Journal of Neurophysiology, 90*(2), 972–982. https://doi.org/10.1152/jn.00869.2002 — CR ✓ [A]
59. Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 — CR ✓ [A]
60. Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 — CR ✓ [A]
61. Munoz, D. P., Broughton, J. R., Goldring, J. E., & Armstrong, I. T. (1998). Age-related performance of human subjects on saccadic eye movement tasks. *Experimental Brain Research, 121*(4), 391–400. https://doi.org/10.1007/s002210050473 — CR ✓ [A]
62. Orban de Xivry, J.-J., Bennett, S. J., Lefèvre, P., & Barnes, G. R. (2006). Evidence for synergy between saccades and smooth pursuit during transient target disappearance. *Journal of Neurophysiology, 95*(1), 418–427. https://doi.org/10.1152/jn.00596.2005 — CR ✓ [A]
63. Orban de Xivry, J.-J., Missal, M., & Lefèvre, P. (2008). A dynamic representation of target motion drives predictive smooth pursuit during target blanking. *Journal of Vision, 8*(15):6, 1–13. https://doi.org/10.1167/8.15.6 — CR ✓ [A]
64. Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 — CR ✓ [A]
65. Ross, J., Morrone, M. C., Goldberg, M. E., & Burr, D. C. (2001). Changes in visual perception at the time of saccades. *Trends in Neurosciences, 24*(2), 113–121. https://doi.org/10.1016/S0166-2236(00)01685-4 — CR ✓ [A]
66. Sheppard, A. L., & Wolffsohn, J. S. (2018). Digital eye strain: Prevalence, measurement and amelioration. *BMJ Open Ophthalmology, 3*(1), e000146. https://doi.org/10.1136/bmjophth-2018-000146 — CR ✓ [A]
67. Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 — CR ✓ (docs/wissenschaft/02)
68. Soechting, J. F., Mrotek, L. A., & Flanders, M. (2005). Smooth pursuit tracking of an abrupt change in target direction: Vector superposition of discrete responses. *Experimental Brain Research, 160*(2), 245–258. https://doi.org/10.1007/s00221-004-2010-2 — CR ✓ [A] (online 2004)
69. Someya, J., & Sugiura, H. (2007). Evaluation of liquid-crystal-display motion blur with moving-picture response time and human perception. *Journal of the Society for Information Display, 15*(1), 79–86. https://doi.org/10.1889/1.2451570 — CR ✓ [A]
70. Spjut, J., Boudaoud, B., Binaee, K., Kim, J., Majercik, A., McGuire, M., Luebke, D., & Kim, J. (2019). Latency of 30 ms benefits first person targeting tasks more than refresh rate above 60 Hz. In *SIGGRAPH Asia 2019 Technical Briefs* (S. 110–113). ACM. https://doi.org/10.1145/3355088.3365170 — CR ✓ [A über Semantic Scholar]
71. Strainchamps, P., Ostermann, M., Mierau, A., & Hülsdünker, T. (2023). Stroboscopic eyewear applied during warm-up does not provide additional benefits to the sport-specific reaction speed in highly trained table tennis athletes. *International Journal of Sports Physiology and Performance, 18*(10), 1126–1131. https://doi.org/10.1123/ijspp.2022-0426 — CR ✓ [A]
72. Vera, J., Cantó-Cerdán, M., García-Ramos, A., & Redondo, B. (2026). Acute and long-term effects of stroboscopic training on sport performance: A systematic review and meta-analysis. *Journal of Sports Sciences, 44*(5), 604–615. https://doi.org/10.1080/02640414.2025.2598176 — CR ✓ [A] (online 2025)
73. Wang, Y., Wang, Q., Bao, H., Dong, X., Cai, K., & Chen, A. (2026). A systematic review and three-level meta-analysis of the effects of stroboscopic training on sport-specific performance. *Journal of Sports Sciences, 44*(4), 460–476. https://doi.org/10.1080/02640414.2025.2592441 — CR ✓ [A] (online 2025)
74. Wilkins, L., & Gray, R. (2015). Effects of stroboscopic visual training on visual attention, motion perception, and catching performance. *Perceptual and Motor Skills, 121*(1), 57–79. https://doi.org/10.2466/22.25.PMS.121c11x0 — CR ✓ [A]

### D3 Normen/Regelwerke (keine DOI)

75. World Wide Web Consortium. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (W3C Recommendation, 12 December 2024), SC 2.2.2, 2.3.1, 2.3.2. https://www.w3.org/TR/WCAG22/ — Inhalt in docs/wissenschaft/03 am Original geprüft
76. International Telecommunication Union. (2023). *Recommendation ITU-R BT.1702-3: Guidance for the reduction of photosensitive epileptic seizures caused by television*. https://www.itu.int/rec/R-REC-BT.1702/en — Inhalt in docs/wissenschaft/03 geprüft

**Zählung:** 22 Website-Listenquellen (+ 2 Fließtext-Quellen identifiziert) · 50 zusätzliche geprüfte
Fachquellen (Nr. 25–74) · 2 Normen. 74 Fakten (F01–F74) + 7 gekennzeichnete eigene Ableitungen (E01–E07).

### Anhang: Bewusst nicht aufgenommen / Unsicherheiten

- Bennett & Barnes (2004, J. Neurophysiol. 92, 578–590, 10.1152/jn.01188.2003) und Hülsdünker et al. (2019,
  IJSPP 14, 343–350, 10.1123/ijspp.2018-0302; N = 10) sind geprüft, aber nicht zusätzlich nötig.
- Kurita (2001, Sample-and-hold-Prinzip) nur bibliografisch geprüft (siehe docs/wissenschaft/02); Watson,
  Ahumada & Farrell (1986, JOSA A 3, 300, 10.1364/josaa.3.000300) nur Metadaten – nicht zitiert.
- Mikrosakkaden-Rate (F38) nur Sekundärzitat. Rashbass (1961) und Robinson (1965) ohne Abstract – Inhalte
  nicht eingesehen, Einordnung über Folgeliteratur.
- „Findlay & Gilchrist (1999)“ und „Bennett et al. (2007, Vision Res.)“, „Lisberger (2010, Curr. Opin.)“
  existieren in der angegebenen Form nicht.
- Kein Beleg gefunden für: „vertikale Augenmuskeln ermüden schneller“, „Glykogenverbrauch der
  Augenmuskeln“, „Palming senkt Tonus“, „144 Hz löst Sakkaden 10–50 ms früher aus“, sämtliche
  Leistungsstufen-Tabellen der sieben Seiten.
