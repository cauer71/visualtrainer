# Literaturbasis W10-koerper-a (Katalognummern 801–805)

Stand: 29.09.2026 · Gruppe: Kapitel „Körper & Reflexe“ (`physical`), Übungen 801 Peripheral Threat Sweeper,
802 Drop Catch („Lineal-Falltest“), 803 Quick Dodge, 804 Speed Drill, 805 Reaction Chain („Maus bremsen“).

**Prüfweg.** Jede DOI wurde über `api.crossref.org/works/<DOI>` geprüft (Titel, Autor:innen, Jahr, Zeitschrift,
Band, Seiten). Inhalte wurden über PubMed-Abstracts (E-Utilities), OpenAlex-/Semantic-Scholar-Abstracts oder
Volltexte (PMC/BioC, PMC-HTML, frei zugängliche PDFs) geprüft. Der Prüfvermerk steht in Teil D je Eintrag.
Eigene Rechnungen sind mit **[Herleitung]** gekennzeichnet, Befunde aus dem ausgelieferten Spielcode mit
**[Code]** (Stichprobe, Detailanalyse bleibt Aufgabe der Autor:innen). Arbeitsdateien: lokal, nicht im Repository.

---

## 0. Kernbefunde für die Autor:innen (vorab)

1. **Keine der fünf Übungen ist körperlich.** Alle fünf sind Maus-Spiele mit Pointer-Lock (relative
   Mausbewegung `movementX/Y`, eigenes Fadenkreuz) **[Code]**; alle erkennen Touch-Geräte **[Code]**. Es gibt keine
   Ganzkörperbewegung, kein Gleichgewicht, keine Ausdauerbelastung. Sturzrisiko und körperliche Belastung sind
   daher nicht zu bewerten (0); relevant sind Hand-Arm-Belastung bei Mausarbeit (F59) und Bildschirm-Sehen.
2. **802 ist kein Lineal-Falltest.** Beim echten Falltest wird ein frei fallender Stab gegriffen; die Fallstrecke
   ergibt die Reaktionszeit (t = √(2d/g), F39). Im Spiel fallen Kugeln mit **konstanter** Geschwindigkeit pro
   Objekt (`y += speed·dt`; nur die Grundgeschwindigkeit steigt mit dem Level von 400 auf 1.250 px/s) **[Code]**.
   „Gravitation“ und Lees Tau (Bildvergrößerung beim Annähern) kommen im Spiel physikalisch nicht vor.
   Rote Täuschkugeln tragen zusätzlich ein weißes „X“ **[Code]** – ein Formmerkmal, das bei Farbsehschwäche hilft.
3. **801: „Peripherie“ ist nahe Peripherie.** Bedrohungen starten bei 0,46 × min(Breite, Höhe) vom Zentrum **[Code]**;
   das entspricht z. B. ≈ 11° am 24″-FHD-Monitor in 60 cm und ≈ 9° am 11″-Tablet in 40 cm **[Herleitung]** – also
   etwa der UFOV-Prüfexzentrizität von ≈ 10° (F09a), weit entfernt vom „360-Grad“-Versprechen. Ob der Blick
   wirklich in der Mitte bleibt, wird nicht kontrolliert (vgl. F18).
4. **805: Erfolgskriterium ist bildfrequenzabhängig.** Ein Stopp zählt, wenn die Zeigerverschiebung
   < 1,5 px **pro Bild** ist, während der Knoten den Zeiger berührt (Abstand < Radius + 8 px) **[Code]**. Das sind
   90 px/s bei 60 Hz, aber 216 px/s bei 144 Hz und 360 px/s bei 240 Hz **[Herleitung]** – auf schnellen Monitoren
   ist die Aufgabe deutlich leichter. Inhaltlich wird eher „Zeiger in die Bahn stellen und still halten“ geübt
   als eine Stop-Signal-Hemmung.
5. **Website-Quellen:** 24 Quellenangaben (9 verschiedene Werke) in den Quellenlisten, dazu 2 nur im Fließtext
   genannte Werke (Ball et al. 1988; Verbruggen & Logan 2008). **Alle DOIs sind korrekt.** Das Problem liegt
   fast immer in der **Anwendung**: Die Werke stützen allgemeine Konzepte, aber nicht die konkreten Zahlen und
   Wirkversprechen (z. B. „halbiert die Reaktionszeit“, „85 % ballistisch“, „< 4 ms Latenz“, „Top 0,1 %“).
6. **Leistungsstufen („Tier 1–5“, „Top 0,1 %/1 %/3 %/10 %“) haben keine Datengrundlage**; die Website sagt selbst,
   dass sie keine Nutzerdaten sammelt. Geräte-Latenzen von 50–130 ms (F45, F46) machen absolute Vergleiche
   zwischen Personen ohnehin unmöglich.

---

## A. Prüftabelle der Website-Quellen je Übung

### A.0 DOI-Prüfung (einmal für alle Übungen)

| # | Angabe der Website | Crossref-Ergebnis | Bewertung |
|---|---|---|---|
| W1 | Posner (1980). Orienting of attention. *QJEP* 32(1), 3–25. doi 10.1080/00335558008248231 | stimmt (Posner, M. I.; 1980; 32(1) 3–25) | DOI ✓ |
| W2 | Treisman & Gelade (1980). A feature-integration theory of attention. *Cogn Psychol* 12(1), 97–136. doi 10.1016/0010-0285(80)90005-5 | stimmt | DOI ✓ |
| W3 | Woodworth (1899). The accuracy of voluntary movement. *Psychol Rev Monogr Suppl* 3(3), i–114. doi 10.1037/h0092992 | stimmt (Crossref-Titel ohne „The“) | DOI ✓ |
| W4 | Fitts (1954). The information capacity … *J Exp Psychol* 47(6), 381–391. doi 10.1037/h0055392 | stimmt | DOI ✓ |
| W5 | Woods, Wyma, Yund, Herron & Reed (2015). Factors influencing the latency of simple reaction time. *Front Hum Neurosci* 9, 131. doi 10.3389/fnhum.2015.00131 | stimmt (131 = Artikelnummer) | DOI ✓ |
| W6 | Donders (1868), Übersetzung *Acta Psychologica* (1969) 30, 412–431. doi 10.1016/0001-6918(69)90065-1 | stimmt (Donders, F. C.; 1969; „On the speed of mental processes“) | DOI ✓ (Jahr 1868 = Original, DOI = Übersetzung 1969) |
| W7 | Lee (1976). A theory of visual control of braking … *Perception* 5(4), 437–459. doi 10.1068/p050437 | stimmt | DOI ✓ |
| W8 | Logan & Cowan (1984). On the ability to inhibit thought and action … *Psychol Rev* 91(3), 295–327. doi 10.1037/0033-295X.91.3.295 | stimmt | DOI ✓ (im Fließtext teils „Logan (1984)“ bzw. „Logan et al., 1984“ – uneinheitlich) |
| W9 | Kawato (1999). Internal models for motor control and trajectory planning. *Curr Opin Neurobiol* 9(6), 718–727. doi 10.1016/S0959-4388(99)00028-8 | stimmt | DOI ✓ |
| T1 | nur Fließtext 801: „Ball et al. (1988)“ | gemeint ist Ball, Beard, Roenker, Miller & Griggs (1988), *JOSA A* 5(12), 2210–2219, doi 10.1364/JOSAA.5.002210 – stimmt | nicht in der Quellenliste der Website |
| T2 | nur Fließtext 805: „Verbruggen & Logan, 2008“ | Verbruggen & Logan (2008), *Trends Cogn Sci* 12(11), 418–424, doi 10.1016/j.tics.2008.07.005 – stimmt | nicht in der Quellenliste der Website |

**Ergebnis:** 24 Listenangaben (801: 5, 802: 6, 803: 4, 804: 5, 805: 4) + 2 Fließtext-Nennungen; **0 fehlerhafte
DOIs**, 0 falsche Autor:innen/Jahre. Kleinere Formfehler: Titel ohne Artikel (W3), Originaljahr statt
Übersetzungsjahr (W6, auf der Website erklärt), uneinheitliche Kurzzitate (W8).

### A.1 Übung 801 – Peripheral Threat Sweeper

| Angabe der Website (Aussage, für die sie zitiert wird) | DOI | stützt Aussage? | Begründung (mit Belegen aus Teil B) |
|---|---|---|---|
| Posner 1980: Aufmerksamkeit lässt sich ohne Sakkade verlagern („verdeckte Raumaufmerksamkeit“) | ✓ | **ja** | Genau das ist Inhalt des Aufsatzes (F12). |
| Posner 1980: „eliminiert träge Augenbewegungen und halbiert die Reaktionszeit“; „Sakkaden mind. 200 ms, verdeckt ~100 ms → Verdopplung der Reaktionsgeschwindigkeit“ | ✓ | **nein** | Posner beschreibt Hinweisreiz-Effekte, keine Halbierung. Exogene Verlagerung ≈ 100–120 ms ist plausibel (F13), aber Sakkaden sind nicht „mind. 200 ms“ (Express-Sakkaden 90–120 ms, reguläre ≈ 180–250 ms; F15). Aufmerksamkeit und Sakkadenziel sind obligatorisch gekoppelt (F14), und Zeigen ist genauer, wenn man das Ziel ansieht (F16). Für einen Mausklick auf ein peripheres Ziel ist „Blick festhalten“ eher nachteilig. |
| Treisman & Gelade 1980: „Retina-Pop-out bei hohem Kontrast“; rote/orange Knoten „stimulieren die Bewegungssensoren der Netzhautperipherie“ | ✓ | **teilweise** | Die Theorie betrifft parallele Merkmalsverarbeitung bei der **Suche** zwischen Ablenkern (siehe docs/wissenschaft/03). In 801 gibt es keine Ablenker – es geht um das Entdecken plötzlich auftauchender, bewegter Reize (Onset-Capture; F17). „Bewegungssensoren der Netzhaut“ kommen in der Theorie nicht vor; Rot-Grün-Empfindlichkeit fällt zur Peripherie besonders stark ab (F07). |
| Woodworth 1899 & Fitts 1954: ballistischer Stoß + Endkorrektur; „über 85 % der Distanz ballistisch“ | ✓ | **teilweise** | Zwei-Komponenten-Modell und logarithmische Speed-Accuracy-Beziehung sind korrekt (F23, F27). Die 85-%-Zahl ist in den Quellen nicht belegt und widerspricht der 75-%-Angabe auf der Speed-Drill-Seite (804). Für **bewegte** Ziele sagt der klassische Fitts-Index die Zeit nicht zuverlässig voraus (F28). |
| Woods et al. 2015: Bildquantisierung 16,7/6,9/4,1 ms; „Standardmäuse 125 Hz ≈ 8 ms, 1000-Hz-Mäuse < 1 ms“; „144 Hz + 1000 Hz → Latenz unter 4 ms“ | ✓ | **teilweise/nein** | Die Bildzeiten sind richtige Physik (F49), stehen aber nicht bei Woods. Woods zeigt: Monitor 11,0 ms + 1-kHz-Spielemaus **6,8 ms** = 17,8 ms Gesamtverzögerung; Standard-Maustreiber ≥ 20 ms; insgesamt bis 100 ms (F20). End-to-End-Latenzen liegen bei 50–83 ms (F45). „< 4 ms“ ist nicht gedeckt. |
| Ball et al. 1988 (Fließtext): unter Stress „kollabiert“ der Wahrnehmungsradius („Tunnelblick“); dichte Reize „erweitern das UFOV dauerhaft“, Parietallappen | ✓ (T1) | **teilweise** | Ball 1988: Das nützliche Sehfeld wird **mit dem Alter** kleiner, u. a. unter Ablenkern und Zusatzaufgaben, und lässt sich durch Übung **teilweise** zurückgewinnen (F09). Von „Stress“ ist im Abstract keine Rede; „Tunnelblick“ entsteht v. a. durch zentrale (foveale) Zusatzlast (F10). Trainingsbelege betreffen ein spezielles UFOV-Protokoll bei Älteren (F55), nicht dieses Spiel. |
| Fovea „1–2 Grad“; Peripherie „immense Dichte an licht- und bewegungsempfindlichen Stäbchen“; Training „trainiert die Stäbchenzellen“ | – | **teilweise/nein** | Foveola ≈ 1°, Fovea ≈ 5,2° (F01). Stäbchen sind in der Peripherie dicht (F05), aber bei Bildschirmhelligkeit (photopisch, > 5 cd/m², F06) sieht man überwiegend mit Zapfen. Training verändert keine Photorezeptoren – dafür gibt es keinen Beleg. |
| „Monitorabstand 50–70 cm → Monitorränder decken 40–50° ab“ | – | **ja (ungefähr)** | 24″-Monitor: 56°/48°/42° bei 50/60/70 cm (F64). Das ist „nahe Peripherie“ (zentrales Feld bis ±30°, F01). |
| performance.now(): „auf ca. 1 ms gerundet“ | – | **teilweise** | Spezifikation: 5 µs (cross-origin-isoliert) bzw. 100 µs (nicht isoliert) (F47); einzelne Browser runden gröber. Für Reaktionsmessung ist die Uhr nicht der limitierende Faktor (F45, F46). |
| Leistungsstufen „Top 1 % (Phänomenales UFOV)“ usw. | – | **nein** | Keine Datengrundlage; die Website sammelt nach eigener Aussage keine Daten. |

### A.2 Übung 802 – Drop Catch („Lineal-Falltest“)

| Angabe der Website | DOI | stützt Aussage? | Begründung |
|---|---|---|---|
| Donders 1868/1969: Drop Catch = „Donders-Typ-C-Wahlreaktion“; klassischer Linealtest = „Typ A“ | ✓ | **teilweise** | Donders' c-Reaktion ist das Go/No-Go-Prinzip (auf einen Reiz reagieren, beim anderen nicht; F22) – die Zuordnung stimmt. „Wahlreaktion“ ist aber die b-Reaktion; die Bezeichnung „Typ-C-Wahlreaktion“ vermischt beides. Der Linealtest ist eine einfache Reaktion mit Greifbewegung, das Spiel aber eine Maus-Abfangaufgabe mit Zielbewegung. |
| Lee 1976: „Gehirn liest die retinale Expansionsrate ab“, „nicht-lineare Zeit-zu-Kontakt-Berechnung“, Erdbeschleunigung s = ½gt² | ✓ | **nein** | Lee beschreibt Tau für das **Annähern** (Bildvergrößerung) beim Bremsen (F36). Seitlich über den Bildschirm fallende Kugeln vergrößern sich nicht, und sie fallen im Spiel mit **konstanter** Geschwindigkeit **[Code]**. Bei Bildschirmzielen und Mausklick timen Menschen ohnehin wie bei gleichförmiger Bewegung, selbst wenn das Ziel beschleunigt (F34); Beschleunigung wird schlecht verrechnet (F35). |
| Logan & Cowan 1984: „Pferderennen“ zwischen Go und Stop; rote Fallen trainieren „präfrontale Hemmung … auf Spitzensport-Niveau“ | ✓ | **teilweise** | Das Rennmodell ist korrekt beschrieben (F40), gilt aber für die Stop-Signal-Aufgabe (Abbrechen einer begonnenen Handlung). Rote Fallen sind eher Go/No-Go (vor der Handlung entscheiden). Eine echte Steigerung der Hemmfähigkeit durch solches Training ist nicht belegt (F43). |
| Woodworth 1899 / Fitts 1954: „85 % ballistisch“, Landung auf dem fallenden Ziel | ✓ | **teilweise** | wie 801; für bewegte Ziele gilt der klassische Fitts-Index nur eingeschränkt (F28). |
| Woods et al. 2015: „144/240 Hz reduziert Bildunschärfe bei 1.250 px/s … verzögerungsfreie Reizdifferenzierung“ | ✓ | **nein** | Woods untersucht Reaktionszeit-Komponenten und Hardware-Verzögerung (F19, F20), nicht Bildwiederholraten oder Bewegungsunschärfe. Der Pixelversatz pro Bild (20,8 px bei 60 Hz) ist richtige Rechnung (F50), aber nicht aus Woods. |
| „Farben in den ersten 50 ms klassifizieren“ | – | **nein** | Schon das reine Entdecken eines Reizes dauert im Mittel ≈ 131 ms (F19); exogene Aufmerksamkeit braucht ≈ 100 ms (F13). |
| „Top 0,1 % Niveau von Kampfpiloten“, „< 190 ms“ | – | **nein** | Keine Datengrundlage; gemessene Zeiten enthalten 50–80 ms Geräte-Latenz (F45). Zum Vergleich: echter Stab-Falltest bei Football-Spielern 203 ± 20 ms (F37). |

### A.3 Übung 803 – Quick Dodge

| Angabe der Website | DOI | stützt Aussage? | Begründung |
|---|---|---|---|
| Kawato 1999: Kleinhirn-Vorwärtsmodelle „simulieren die nächsten 200 ms“ der Projektile und überbrücken 100–150 ms visuelle Latenz | ✓ | **teilweise** | Kawato stützt interne (inverse und Vorwärts-)Modelle für die **eigene** Motorik, u. a. im Kleinhirn (F33). Die Vorhersage **fremder** Flugbahnen ist ein Wahrnehmungs-/Interzeptionsproblem (F32, F34). „200 ms“ steht nicht in der Quelle. Visuomotorische Korrekturen innerhalb von < 190 ms sind belegt (F25) – die Größenordnung 100–150 ms ist plausibel, wird aber fälschlich Woodworth zugeschrieben. |
| Woodworth 1899: Ausweichbewegung = Impuls + feine Bremsung | ✓ | **teilweise** | Das Modell beschreibt Zielbewegungen, nicht Ausweichen; die Übertragung ist eine Analogie. |
| Fitts 1954: „Durchgangsbreite W schrumpft → chirurgische Präzision“ | ✓ | **teilweise/nein** | Fitts betrifft das Treffen eines Ziels. Für das Bewegen durch einen Korridor gilt eher das Steuergesetz (Zeit ∝ Länge/Breite; F29). Ein Ausweichspiel ist weder das eine noch das andere exakt. |
| Woods et al. 2015: „144/240 Hz und 1.000-Hz-Mäuse → < 4 ms, keine Bewegungsunschärfe“ | ✓ | **nein** | wie 801/802 (F20, F45). |
| „Verbessert Skillshot-Dodging in LoL/CS2 … signifikant“ | – | **nein** | Keine Studie; Transfer von Bildschirmaufgaben auf andere Aufgaben ist meist klein (F51, F52). |

### A.4 Übung 804 – Speed Drill

| Angabe der Website | DOI | stützt Aussage? | Begründung |
|---|---|---|---|
| Woodworth 1899: Anfangsimpuls überbrückt „etwa 75 %“ der Distanz | ✓ | **teilweise** | Zwei-Komponenten-Modell ✓ (F23); die 75 % sind nicht belegt und widersprechen den 85 % auf 801/802. Primärbewegungen enden typischerweise **vor** dem Ziel (F26). |
| Fitts 1954: schrumpfende Ziele → höherer Schwierigkeitsindex | ✓ | **ja (für ruhende Ziele)** | ID steigt mit kleinerem W (F27; Beispiel F65). Die Ziele bewegen sich zusätzlich (Geschwindigkeitsfaktor 1,0–3,8) – dann gilt der klassische Index nur eingeschränkt (F28). Regeltext nennt 45 → 12 px, Code 32 → 10 px Maximalradius **[Code]**. |
| Treisman & Gelade 1980: vorattentive Salienzkarte „im parietalen Kortex und Colliculus superior“, Pop-out bewegter Kreisziele | ✓ | **teilweise** | Treisman sagt nichts über den Colliculus; es gibt keine Ablenker. Passender: plötzliches Erscheinen zieht Aufmerksamkeit an (F17). |
| Lee 1976: „Zeit bis zur Auslöschung“ aus der Schrumpfrate, „verhindert überhastete Klicks“ | ✓ | **nein** | Lees Theorie betrifft Annäherung/Kollision (F36). Mathematisch ergibt r/(dr/dt) bei linearem Schrumpfen zwar die Restzeit **[Herleitung]**, aber dass Menschen das so nutzen oder dadurch weniger hastig klicken, ist nicht belegt. |
| Woods et al. 2015: 60 Hz = 16,6 ms, 240 Hz = 4,16 ms; 1000 Hz „jeder Klick im 1-ms-Raster ohne Verzögerung“ | ✓ | **teilweise/nein** | Bildzeiten ✓ (F49, nicht aus Woods). Woods maß bei einer 1-kHz-Maus 6,8 ms Tasten-Verzögerung (F20). |
| Reaktionszeit-Stufen „< 160 ms = Top 0,1 %“ | – | **nein** | Keine Datengrundlage; einfache Reaktionszeit ohne Zielbewegung liegt im Mittel bei 213–231 ms (F19). |

### A.5 Übung 805 – Reaction Chain („Maus bremsen beim Aim“)

| Angabe der Website | DOI | stützt Aussage? | Begründung |
|---|---|---|---|
| Logan & Cowan 1984: Go- und Stop-Prozess rennen „unabhängig durch die Basalganglien“; punktgenaues Abbremsen = Stop-Signal-Hemmung | ✓ | **teilweise/nein** | Rennmodell ✓ (F40). Das Abbremsen einer Zielbewegung am Endpunkt ist aber Teil des **geplanten** Bewegungsprogramms (Antagonisten-Salve; F30), keine Hemmung einer ungewollten Handlung nach einem Stoppsignal. Das Modell ist ein kognitives Modell; „durch die Basalganglien“ stammt nicht aus dieser Arbeit. |
| „Regelmäßiges Training … restrukturiert die Signalübertragung im Nucleus subthalamicus und Motorkortex (Logan et al., 1984)“ | ✓ | **nein** | Die Arbeit von 1984 enthält keine Bildgebung/Trainingsstudie. Hemmtraining zeigte gegenüber aktiver Kontrolle keinen echten Effekt (F43). |
| Verbruggen & Logan 2008 (Fließtext): SSRT „typisch 180–250 ms“, rIFG und STN | ✓ (T2) | **teilweise** | Das Review beschreibt Paradigma und Rennmodell (F40, F44). rIFG/STN-Beteiligung ist gut belegt (F42). SSRT gesunder junger Erwachsener lag in drei Stichproben im Mittel bei ≈ 134–221 ms (Gruppenmittel 146–172 ms; F41) – „180–250 ms“ ist zu hoch angesetzt. Übertragung auf „Overflicking“ ist nicht belegt. |
| Woodworth 1899: Endverzögerung unterliegt „optischen und somatosensorischen Rückkopplungsverzögerungen von 100–150 ms“; Trägheit → „Overflicks“ | ✓ | **teilweise** | Zwei Phasen ✓; die Latenzzahl stammt nicht von Woodworth (moderne Befunde: F25). Typisch ist eher **Unterschießen** des Ziels, weil Überschießen mehr Zeit und Energie kostet (F26). |
| Fitts 1954: „Korrekturfenster geht gegen null“ | ✓ | **teilweise** | Fitts beschreibt Zielbewegungen zu ruhenden Zielen; bei bewegten Knoten ist die Aufgabe eher eine Interzeption (F28, F32). |
| Woods et al. 2015: „60-Hz-Displays verschmieren Mikroverzögerungen“, bei 240 Hz „Bremsbefehle > 10 ms früher“, „optimale Voraussetzungen für neuronale Plastizität“ | ✓ | **nein** | Nichts davon steht bei Woods (F20). |
| „< 1,5 px/Frame = echte physikalische Vollbremsung“; „bei 144 Hz < 216 px/s“ | – | **teilweise** | Die Rechnung stimmt, zeigt aber das Problem: Bei 60 Hz sind es 90 px/s, bei 240 Hz 360 px/s (F50) – das Kriterium hängt vom Monitor ab **[Code, Herleitung]**. |
| „15–20 min/Tag optimal gegen neuronale Übermüdung“ | – | **nein** | Keine Quelle; zur Hand-Arm-Belastung bei langer Mausarbeit siehe F59. |

---

## B. Faktenliste (Aussage – Zahl – Quelle)

Spalte „für“ = besonders relevante Übungen. Quellen vollständig in Teil D.

### B1 Peripheres Sehen, Netzhaut, Optik

| ID | Aussage | Zahl | Quelle | für |
|---|---|---|---|---|
| F01 | Einteilung des Gesichtsfelds: Foveola, Fovea, Parafovea, Perifovea, Makula; „zentrales Gesichtsfeld“ in der Perimetrie; horizontale Gesamtausdehnung | Foveola ≈ 1° Ø; Fovea 5,2° Ø; Parafovea ≈ 5–9° Ø; Perifovea ≈ 9–17° Ø; Makula ≈ 17° Ø; zentrales Feld 60° Ø (±30°); Peripherie bis ≈ 214° horizontal | Strasburger et al., 2011 (PMC-Volltext) | 801 |
| F02 | Strasburger et al. nennen „peripheres Sehen“ alles außerhalb von 2° Exzentrizität; zentrales Feld < 8° Radius | 2° bzw. 8° | Strasburger et al., 2011 | 801 |
| F03 | Buchstaben-Erkennungsschwelle wächst linear mit der Exzentrizität E (Anstis 1974, zitiert bei Strasburger) | Schwellen-Buchstabenhöhe ≈ 0,031° + 0,046° · E; bei 10° ≈ 0,49°, bei 20° ≈ 0,95° **[Herleitung aus der Formel]** | Strasburger et al., 2011 (Tabelle, nach Anstis 1974) | 801 |
| F04 | Einfache Reaktionszeit steigt mit der Exzentrizität nur mäßig | 1,66 ms/° (95 Personen, 10–90 J., bis ±27°); 1,8 ms/° bis 30° (0–15°: 0,5 ms/°; 15–20°: 3,6 ms/°) | Strasburger et al., 2011 (Übersicht zu Poggel et al.; Schiefer et al. 2001) | 801 |
| F05 | Photorezeptoren: Anzahl und Verteilung | 4,6 Mio. Zapfen, 92 Mio. Stäbchen; foveale Zapfen-Spitzendichte 199.000/mm²; stäbchenfreie Zone 0,35 mm (1,25°); höchste Stäbchendichte in einem Ring in Höhe des Sehnervenkopfs | Curcio et al., 1990 | 801 |
| F06 | Mesopischer Bereich (Stäbchen und Zapfen aktiv) nach CIE; darüber photopisch, zapfendominiert | 0,005–5,0 cd/m²; ab 5 cd/m² gilt m = 1 (photopisch) | CIE, 2017 (TN 007:2017, PDF gelesen) | 801 |
| F07 | Rot-Grün-Empfindlichkeit fällt zur Peripherie steiler ab als Helligkeits- und Blau-Gelb-Empfindlichkeit; Farbe bleibt bei großen Reizen bis 50° erkennbar | bis 50° Exzentrizität getestet | Hansen et al., 2009 | 801, 802 |
| F08 | Bewegung in der Peripherie: Schwelle für Relativbewegung skaliert mit der Auflösung (linear über die Exzentrizität); Geschwindigkeitsunterscheidung ist peripher so genau wie foveal | Weber-Anteil ≈ 6 %; optimale Reizgröße 1° (Fovea) bis ≈ 20° (bei 40°) | McKee & Nakayama, 1984 | 801, 803 |
| F09 | Das nützliche Sehfeld (UFOV) wird mit dem Alter kleiner und lässt sich durch Übung teilweise zurückgewinnen; Ablenker und Zusatzaufgaben verkleinern es | qualitativ (Abstract) | Ball et al., 1988 | 801 |
| F09a | Der heutige UFOV-Test prüft bei einer einzigen Exzentrizität | ≈ 10° (Aust & Edwards 2016: ≈ 10,5°) | übernommen aus docs/wissenschaft/03 (Wood & Owsley, 2014; dort geprüft) | 801 |
| F10 | Echter „Tunnelblick“ (Einengung abhängig von der Exzentrizität) entstand durch eine foveale Zusatzaufgabe, nicht durch eine akustische Arbeitsgedächtnis-Last | 2 Experimente | Ringer et al., 2016 | 801 |
| F11 | Im Alltag wird peripheres Sehen v. a. zum Überwachen genutzt; ob man peripher schaut oder den Blick bewegt, hängt von Erfahrung, Alter, Ablenkung, Emotion und Vorwissen ab | 60 Arbeiten ausgewertet | Vater, Wolfe & Rosenholtz, 2022 | 801 |

### B2 Aufmerksamkeit, Sakkaden, Auge-Hand-Koordination

| ID | Aussage | Zahl | Quelle | für |
|---|---|---|---|---|
| F12 | Aufmerksamkeit kann bei ruhiger Fixation auf einen anderen Ort gerichtet werden („covert orienting“); dieser Mechanismus steht in Beziehung zum Sakkadensystem | qualitativ | Posner, 1980 (Abstract) | 801, 804 |
| F13 | Zeitverlauf: Periphere (exogene) Hinweise ziehen Aufmerksamkeit in ≈ 100 ms an, Maximum bei ≈ 100–120 ms, danach Abklingen; willentliche (endogene) Verlagerung braucht ≈ 300 ms | 100–120 ms / 300 ms | Carrasco, 2011 (PMC-Volltext) | 801, 802, 804 |
| F14 | Sakkadenplanung und Aufmerksamkeit sind obligatorisch an dasselbe Ziel gekoppelt: Unterscheidung am Sakkadenziel am besten, an Nachbarpositionen nahe Zufall | qualitativ | Deubel & Schneider, 1996 | 801 |
| F15 | Sakkadenlatenzen | Express-Sakkaden 90–120 ms (Gap-Bedingung); reguläre Sakkaden 200–220 ms (Fixpunkt bleibt sichtbar), in eigenen Daten Latenz ≈ 180–250 ms; Latenz blieb über die getesteten Amplituden konstant | Darrien et al., 2001 (PMC-Volltext) | 801 |
| F16 | Blick geht der Hand typischerweise voraus; Zeigen ist genauer, wenn das Ziel angesehen wird; Sakkaden zu neuen Zielen werden während einer laufenden Zeigebewegung ≈ 155 ms verzögert („Blick verankert“) | 155 ms | Neggers & Bekkering, 2000 | 801, 804, 805 |
| F17 | Plötzlich erscheinende Reize (abrupter Onset) ziehen Aufmerksamkeit auf sich und werden bevorzugt verarbeitet | qualitativ, 3 Experimente | Yantis & Jonides, 1984 | 801, 802, 804 |
| F18 | In 93 Studien zu den 5 meistgenutzten Peripherie-Tools im Sport kontrollierte keine per Eyetracking, ob wirklich peripher geschaut wurde; Transfer bei Tools mit Handlungsantwort erwartet, aber nicht nachgewiesen | 93 Studien, 0 mit Eyetracking | Vater & Strasburger, 2021 | 801 |

### B3 Reaktionszeit

| ID | Aussage | Zahl | Quelle | für |
|---|---|---|---|---|
| F19 | Einfache visuelle Reaktionszeit (kalibriert) und Altersanstieg; reine Entdeckungszeit | 231 ms (213 ms nach Abzug der Hardware); +0,55 ms/Lebensjahr; n = 1.469, 18–65 J.; Entdeckung (SDT) 131 ms | Woods et al., 2015 | alle |
| F20 | Hardware-Verzögerungen in derselben Studie | LCD (60 Hz) 11,0 ms; 1-kHz-Spielemaus 6,8 ± 1,8 ms; Summe 17,8 ms; Standard-Maustreiber „20 ms oder mehr“; Hard- und Software zusammen bis zu 100 ms | Woods et al., 2015 (PMC-Volltext, Abschnitt „Timing Calibration“) | alle |
| F21 | Einfache Reaktionszeit unterscheidet sich nicht zwischen Sportlern und Nichtsportlern; 2 Jahre Schlagtraining verbesserten die Go/No-Go-, nicht die einfache Reaktionszeit | Querschnitt n = 99, Längsschnitt n = 94 | Kida et al., 2005 | 802, 804 |
| F22 | Donders unterschied a- (einfach), b- (Wahl) und c-Reaktion; die c-Reaktion entspricht Go/No-Go: auf eine Alternative reagieren, bei der anderen zurückhalten | – | Gomez et al., 2007 (PMC-Volltext, über Donders 1868/1969) | 802 |

### B4 Zielmotorik, Bremsen, Tremor

| ID | Aussage | Zahl | Quelle | für |
|---|---|---|---|---|
| F23 | Woodworths Zwei-Komponenten-Modell: zentral gesteuerter Anfangsimpuls plus rückmeldungsbasierte Komponente | qualitativ | Elliott, Helsen & Chua, 2001 | 801–805 |
| F24 | Ältere (M = 68 J.) bewegen sich langsamer und variabler; sie vergrößern den Anteil der Primärbewegung bei größeren Zielen nicht und skalieren die Geschwindigkeit bei größeren Distanzen schwächer | 15 Ältere vs. 15 Junge (M = 23 J.) | Ketcham et al., 2002 | 801, 804, 805 |
| F25 | Visuelle Rückmeldung verbessert die Treffgenauigkeit auch bei Bewegungen **kürzer als 190 ms** (gegen die ältere Annahme von Keele & Posner) | < 190 ms | Zelaznik et al., 1983 | 803, 805 |
| F26 | Der Anfangsimpuls endet typischerweise **vor** dem Ziel (Unterschießen), weil Überschießen mehr Zeit und Energie kostet; bei Abwärtsbewegungen stärker | qualitativ | Lyons et al., 2006 | 801, 804, 805 |
| F27 | Fitts: logarithmische Beziehung zwischen Bewegungszeit und Distanz/Zielbreite (Speed-Accuracy-Trade-off) | MT = a + b · log₂(2D/W) | Fitts, 1954 (Inhalt bestätigt über Accot & Zhai, 1997) | 801, 802, 804, 805 |
| F28 | Für bewegte Ziele sagt der klassische Fitts-Index die Erfassungszeit nicht zuverlässig voraus; ein Index mit Geschwindigkeitsterm passt besser | qualitativ | Jagacinski et al., 1980 (Inhalt aus docs/wissenschaft/02) | 801, 802, 804, 805 |
| F29 | Steuergesetz für Bewegungen durch einen „Tunnel“: Zeit wächst linear mit Länge/Breite; Geschwindigkeit wächst linear mit der Breite; Fehlerraten höher als bei Fitts-Aufgaben | gerader Tunnel: MT = −188 + 78 · (A/W) ms, r² = 0,968 (13 Personen); mittlere Fehlerrate 6,4 % | Accot & Zhai, 1997 (Volltext-PDF) | 803 |
| F30 | Schnelle Einzelgelenk-Bewegungen: dreiphasiges EMG – 1. Agonisten-Salve startet, **Antagonisten-Salve hält die Bewegung am Endpunkt an**, 2. Agonisten-Salve dämpft Nachschwingen; zentral programmiert; Basalganglien skalieren die erste Salve, Kleinhirn steuert das Timing | glockenförmiges Geschwindigkeitsprofil, Beschleunigungs- ≈ Bremszeit | Berardelli et al., 1996 | 805 |
| F31 | Physiologischer Tremor ist multifaktoriell (u. a. zentrale ≈ 10-Hz-Oszillationen, Motoreinheiten, mechanische Resonanz); Parkinson-Tremor 3–6 Hz | ≈ 10 Hz bzw. 3–6 Hz | McAuley & Marsden, 2000 | 805 |
| F32 | Beim Abfangen bewegter Ziele ist die zeitliche Präzision am höchsten, wenn man den Treffort frei wählen darf; Menschen passen eher den **Ort** als den **Zeitpunkt** an | qualitativ | Brenner & Smeets, 2015 | 802, 805 |
| F33 | Interne Modelle der Motorik: inverses Dynamikmodell (Belege aus Purkinje-Zellen), gepaarte Vorwärts-/Inversmodelle | qualitativ | Kawato, 1999 | 803 |

### B5 Fallende Objekte, Interzeption, Lineal-Falltest

| ID | Aussage | Zahl | Quelle | für |
|---|---|---|---|---|
| F34 | Abfangen eines abwärts bewegten Bildschirmziels: Mit echtem, verdeckt fallendem Ball timten Personen gemäß Schwerkraft (auch wenn das Bild nicht beschleunigte); beim **Mausklick** auf das reine Bildschirmziel timten sie wie bei **gleichförmiger** Bewegung, auch wenn das Ziel beschleunigte | qualitativ | Zago et al., 2004 | 802 |
| F35 | Beschleunigung wird bei der Kontaktzeitschätzung kaum berücksichtigt (Schätzung „erster Ordnung“: bei Verzögerung zu früh, bei Beschleunigung zu spät) | qualitativ | Benguigui & Bennett, 2010 | 802 |
| F36 | Lees Tau-Theorie: Für das Bremsen genügt Information über die Zeit bis zur Kollision aus dem sich ändernden optischen Feld beim Annähern | qualitativ | Lee, 1976 (Abstract) | 802, 804 |
| F37 | Stab-Falltest (1,3-m-Stab, freier Fall, Fallstrecke → Zeit) bei Football-Spielern: kürzer und weniger streuend als Computer-Reaktionszeit; mäßige Korrelation | 203 ± 20 ms vs. 268 ± 44 ms; r = 0,445; n = 68 (94 getestet) | Eckner et al., 2010 | 802 |
| F38 | Lineal-Falltest bei Personen ≥ 60 J.: Zuverlässigkeit (1 Woche Abstand) | einfach ICC = 0,57 („poor“), Wahl 0,81, Unterscheidung 0,72, Doppelaufgabe 0,70 | Ferreira et al., 2024 (Abstract + PMC-Volltext) | 802 |
| F39 | Fallgesetz: Reaktionszeit aus Fallstrecke t = √(2d/g), g = 9,81 m/s² | 5 cm → 101 ms; 10 cm → 143 ms; 15 cm → 175 ms; 20 cm → 202 ms; 25 cm → 226 ms; 30 cm → 247 ms; um 20 cm entspricht 1 cm ≈ 5 ms | **[Herleitung]** | 802 |

### B6 Hemmung und Stop-Signal

| ID | Aussage | Zahl | Quelle | für |
|---|---|---|---|---|
| F40 | Stop-Signal-Leistung wird als Rennen zwischen Go- und Stop-Prozess modelliert; die Stop-Latenz (SSRT) ist verdeckt und wird aus dem Modell geschätzt | – | Verbruggen & Logan, 2008 (PMC-Volltext) | 802, 805 |
| F41 | SSRT gesunder junger Erwachsener; Messzuverlässigkeit | Stichprobenmittel ≈ 134–221 ms, Gruppenmittel 146–172 ms (3 Stichproben, n = 52/85/30); Split-Half-ICC 0,71 (empfohlene Auswertung) bis 0,86 | Congdon et al., 2012 (PMC-Volltext, Tab. 3) | 805 |
| F42 | Stoppen aktivierte rechten inferioren Frontalkortex (IFC) und Nucleus subthalamicus (STN), stärker bei schnellen Stoppern | fMRT, 2 Experimente | Aron & Poldrack, 2006 | 805 |
| F43 | Adaptives Go/No-Go- und Stop-Signal-Training (3 Wochen) war einer aktiven Kontrolle nicht überlegen, kein naher (Stroop) oder ferner Transfer; Verbesserung v. a. im Go-Tempo | n = 122, randomisiert, doppelblind | Enge et al., 2014 | 802, 805 |
| F44 | SSRT ist bei jüngeren Kindern und älteren Erwachsenen verlängert; Go und Stop entwickeln sich unabhängig | qualitativ | Verbruggen & Logan, 2008 | 805 |

### B7 Geräte, Latenz, Messqualität

| ID | Aussage | Zahl | Quelle | für |
|---|---|---|---|---|
| F45 | End-to-End-Latenz (Mausbewegung bis Bildänderung) | Mäuse ≈ 55–82 ms; Browser: Chrome 41 62–71 ms, Firefox 66–83 ms; Browser +15–20 ms gegenüber nativer App; ≈ 50 ms Latenz beeinträchtigen laut zitierter Literatur die Zeigeleistung | Casiez et al., 2015 (Volltext-PDF) | alle |
| F46 | Touch-Web-Apps messen Reaktionszeiten zu lang | iPhone ≈ 58 ms, Galaxy ≈ 66–70 ms; Streuung innerhalb eines Geräts ≈ 7 ms; Laptops 62–133 ms | Pronk et al., 2020 (Zahlen aus docs/wissenschaft/01, dort im Volltext geprüft) | alle (Tablet) |
| F47 | Auflösung von `performance.now()` laut Spezifikation | 5 µs (cross-origin-isoliert), 100 µs (nicht isoliert) | MDN Web Docs, o. J. | alle |
| F48 | Aim-Trainer-Kennwerte sind bei erfahrenen Spielern sehr zuverlässig; zwischen zwei Terminen nur vereinzelt Verbesserung | ICC 0,947–0,995; n = 10; 3–5 Tage Abstand | Rogers et al., 2024 | 804 |
| F49 | Bildzeit je Bildwiederholrate; mittlere Zusatzverzögerung durch Bildquantisierung ≈ halbe Bildzeit | 60 Hz 16,7 ms; 120 Hz 8,3 ms; 144 Hz 6,9 ms; 240 Hz 4,2 ms | **[Herleitung]** (1000/f) | alle |
| F50 | Versatz pro Bild = Geschwindigkeit / Bildrate; 805-Kriterium 1,5 px/Bild in px/s | 1.250 px/s: 20,8 / 8,7 / 5,2 px pro Bild bei 60/144/240 Hz; 1,5 px/Bild = 90 / 180 / 216 / 360 px/s bei 60/120/144/240 Hz | **[Herleitung]** | 802, 805 |

### B8 Trainierbarkeit und Transfer

| ID | Aussage | Zahl | Quelle | für |
|---|---|---|---|---|
| F51 | Digitales Sehtraining: Effekte stark aufgebläht, wenn Trainings- und Testaufgabe ähnlich sind | 33 RCTs, n = 1.048; Reaktionszeit SMD 2,66 (ähnlich) vs. 0,50 (unähnlich); visuelle Aufmerksamkeit 1,65 vs. 0,07 | Guo et al., 2025 | alle |
| F52 | „Brain Training“: viel Evidenz für die geübte Aufgabe, weniger für eng verwandte, wenig für entfernte Aufgaben und Alltag | Übersicht | Simons et al., 2016 | alle |
| F53 | Actionspieler zeigten bessere visuelle Aufmerksamkeit (u. a. nutzbares Sehfeld); Nichtspieler verbesserten sich nach Training mit einem Actionspiel | 5 Experimente | Green & Bavelier, 2003 | 801, 803 |
| F54 | Replikationsversuch: 20+ h Actionspiel verbesserten bei Nichtspielern die meisten kognitiven Aufgaben nicht wesentlich (Ausnahme: mentale Rotation); Unterschiede Experten/Nichtspieler evtl. Selbstselektion | 20+ h | Boot et al., 2008 | 801, 803 |
| F55 | UFOV-Training (spezielles Protokoll, v. a. Ältere): verbessert Verarbeitungsgeschwindigkeit und Aufmerksamkeit, Transfer auf Alltagsfunktion berichtet, adaptiv besser; kein Transfer auf andere neuropsychologische Tests | 44 Studien aus 17 RCTs | Edwards et al., 2018 (kritisch: Simons et al., 2016) | 801 |
| F56 | Siehe F18: Transfer von Peripherie-Tools auf den Sport erwartet, aber nicht nachgewiesen | – | Vater & Strasburger, 2021 | 801 |

### B9 Sicherheit und Ergonomie

| ID | Aussage | Zahl | Quelle | für |
|---|---|---|---|---|
| F57 | Lichtausgelöste Anfälle; kritische Frequenzen; Rot als Faktor | ≈ 1 : 10.000 (5–24 J.: ≈ 1 : 4.000); am stärksten 15–25 Hz, Bereich 1–65 Hz | Fisher et al., 2005 (Zahlen aus docs/wissenschaft/03, dort geprüft) | 801, 803 (roter Fehlerblitz), alle |
| F58 | WCAG 2.2: höchstens 3 Blitze pro Sekunde oder unter allgemeiner und **roter** Blitzschwelle (SC 2.3.1); Farbe nicht als einziges Unterscheidungsmerkmal (SC 1.4.1) | 3/s | W3C, 2024 | 801 (rotes Aufblitzen bei Kern-Durchbruch), 802 (Rot/Grün) |
| F59 | Dauer der Mausnutzung hängt mit Hand-Arm-Beschwerden zusammen (moderate Evidenz, Hinweise auf Dosis-Wirkung) | 9 Längsschnittstudien, 6 hoher Qualität | IJmker et al., 2007 | alle |
| F60 | Rot-Grün-Farbsehschwäche in Europa | ≈ 8 % der Männer, ≈ 0,4 % der Frauen | Birch, 2012 | 802 (Kern), 801/803 (Nebenrolle) |

### B10 Optiker-Bezug

| ID | Aussage | Zahl | Quelle | für |
|---|---|---|---|---|
| F61 | Gleitsicht am Bildschirm (60 cm): schmaler scharfer Zwischenbereich; längere Augenbewegungen, spätere Blickstabilisierung, mehr Kopfbewegung | klarer horizontaler Bereich: Einstärken 60°, Gleitsicht 18° bzw. 13°; n = 11, 45–71 J. | Han et al., 2003 | 801 (seitliche Ziele), alle |
| F62 | Akkommodationsbreite reicht etwa ab 40 J. nicht mehr für normale Naharbeit (Alterssichtigkeit) | ≈ 40 J. | Charman, 2008 | alle |
| F63 | Bevorzugter Abstand zum Bildschirm im Mittel 63 cm; wer weiter weg rückt, zeigte mehr Nahsehermüdung bei 50 cm | 63 cm | Jaschinski, 2002 | alle |
| F64 | Sehwinkel des Bildschirms (Breite) | 24″ (53,1 cm breit): 56° / 48° / 42° bei 50 / 60 / 70 cm; 27″: 53° bei 60 cm | **[Herleitung]** θ = 2·atan(b/2d) | 801 |
| F65 | Reizgrößen und Tempo im Sehwinkel (24″-FHD, 0,277 mm/px, 60 cm ≈ 37,8 px/°) | 801 Trefferradius 26 → 18 px ≈ 0,69° → 0,48°; 801 Tempo 80–520 px/s ≈ 2–14°/s; 802 bis 1.250 px/s ≈ 33°/s; 805 bis 1.800 px/s ≈ 48°/s (Website-Angabe); Fitts-ID 804 bei D = 400 px: W = 64 px → 2,86 bit, W = 20 px → 4,39 bit (Shannon-Form log₂(D/W + 1)) | **[Herleitung]** | 801–805 |
| F66 | Ausgangsposition 801 in Grad | Startradius 0,46 × min(B, H): bei 900 px Spielfeldhöhe ≈ 11,5 cm ≈ 10,8° (60 cm); 11″-Tablet (≈ 700 CSS-px, 0,192 mm/px) ≈ 6,2 cm ≈ 8,8° (40 cm) | **[Code + Herleitung]** | 801 |

---

## C. Evidenz-Zusammenfassung

### C1 Was die Übungen tatsächlich fordern (aus Literatur + Code-Stichprobe)

- **Alle fünf:** Auge-Hand-Koordination mit der Maus, Zielbewegungen unter Zeitdruck (Fitts/Woodworth, F23–F28),
  einfache bzw. Go/No-Go-artige Reaktionen, Aufmerksamkeitsfang durch plötzlich erscheinende Reize (F17).
  Geräte-Latenz (50–80 ms end-to-end, F45) liegt in derselben Größenordnung wie die Unterschiede zwischen den
  „Tier“-Stufen – die Stufen sind nicht interpretierbar.
- **801:** Entdecken bewegter Reize in der **nahen** Peripherie (≈ 9–11°, F66), dann Blick- und Zeigerbewegung
  dorthin. Die empfohlene Strategie „Blick in der Mitte halten“ ist nicht kontrollierbar (F18) und widerspricht
  der natürlichen Kopplung von Blick, Aufmerksamkeit und Zeigen (F14, F16). Peripheres Reagieren kostet nur
  ≈ 0,5–1,8 ms pro Grad (F04) – das Spiel ist eher eine Mehrziel-Abfangaufgabe unter Tempo als ein Sehfeldtraining.
- **802:** Farbbasierte Go/No-Go-Entscheidung (Grün fangen, Rot/„X“ meiden) plus Abfangen gleichförmig fallender
  Ziele mit der Maus. Kein Bezug zum echten Lineal-Falltest (F37–F39) und keine Schwerkraft **[Code]**.
- **803:** Kontinuierliche Zeigersteuerung zwischen bewegten Hindernissen; Überwachen mehrerer bewegter Objekte
  (Kapazitätsgrenzen der Mehrfachverfolgung siehe docs/wissenschaft/02); Bewegung durch enge Korridore folgt eher
  dem Steuergesetz (F29) als Fitts.
- **804:** Klassische Aim-Aufgabe (schrumpfende, sich bewegende Ziele): Fitts-Schwierigkeit steigt mit kleinerem
  Radius (F27, F65), durch die Zielbewegung zusätzlich Interzeption (F28). Aim-Trainer-Kennwerte sind zuverlässig
  messbar (F48).
- **805:** Interzeption + Stillhalten des Zeigers im richtigen Moment. Motorisch geht es um Positionswahl (F32)
  und Endpunktstabilität (Antagonisten-Bremsung F30, Tremor F31), nicht um Stop-Signal-Hemmung (F40–F43). Das
  Stopp-Kriterium ist bildfrequenzabhängig (F50).

### C2 Trainierbarkeit und Transfer (Vorschlag für die `evidenz`-Felder)

| Nr. | uebungseffekt | naher_transfer | alltag_transfer | Begründung |
|---|---|---|---|---|
| 801 | mittel | schwach | fehlend | Für diese Aufgabe keine Studie; Übungseffekte in ähnlichen Bildschirmaufgaben regelmäßig (F51, F52). UFOV-Transfer nur für das spezielle Protokoll bei Älteren (F55); Actionspiel-Befunde widersprüchlich (F53 vs. F54); Peripherie-Tools ohne Transfer-Nachweis (F18). |
| 802 | mittel | schwach | fehlend | Go/No-Go-Übung wird besser, echte Hemmsteigerung nicht belegt (F43); Sport verbessert Go/No-Go, aber umgekehrt nicht gezeigt (F21). Keine Aussage über den Lineal-Falltest möglich (anderes Paradigma). |
| 803 | mittel | schwach | fehlend | Keine Studie zu Maus-Ausweichspielen; Transfer von Bildschirmaufgaben klein (F51, F52). |
| 804 | mittel bis stark | schwach | fehlend | Aim-Kennwerte zuverlässig und teils schon nach wenigen Tagen besser (F48); Übungseffekte in gerätegleichen Aufgaben groß, in unähnlichen klein (F51). Transfer auf Spiele oder Alltag nicht untersucht. |
| 805 | mittel | schwach | fehlend | Keine Studie; Hemmtraining ohne echten Effekt (F43); Behauptungen zu STN/Motorkortex unbelegt. |

Allgemein: Die stärkste Evidenz betrifft „man wird in der geübten Aufgabe besser“. Transfer auf Straßenverkehr,
Sport oder E-Sport ist für keine der fünf Übungen gezeigt. Gamification-Elemente (Combo, Zeitgutschrift) beeinflussen
Motivation, nicht belegte Wirkungen (siehe docs/wissenschaft/01, Abschnitt 3.3).

### C3 Hinweise zu Profilwerten (aus der Literatur abgeleitet, Entscheidung bei den Autor:innen)

- `stereosehen` = 0 für alle (2D-Bildschirm, keine Disparität).
- `ganzkoerper`, `gleichgewicht`, `ausdauer_belastung` = 0; `koerperliche_belastung` 0–1; `sturzrisiko` = 0.
- `naharbeit_dauer` = 1 (45-s-Runden am Monitor, Wiederholungen möglich; F62, F63).
- `farbunterscheidung`: 802 hoch (Grün/Rot ist die Entscheidungsregel; das weiße „X“ mindert das Problem, F58,
  F60); 801 und 803 gering (Farbe codiert Typen bzw. Gefahr, ist aber nicht entscheidungsrelevant – bitte im Code prüfen).
- `peripheres_sehen` 801: deutlich gefordert, aber nur nahe Peripherie (F66); `fixation` wird verlangt, aber nicht
  erzwungen.
- `flimmern_lichtreize`: gering, aber nicht null – alle fünf blenden bei Fehlern ein rotes Overlay ein
  (CSS-Klasse `fx-flash fx-flash-red`; Aussehen laut docs/skilldrills-analyse.md im Kapitel visual ein roter
  Radialverlauf, hier nicht einzeln geprüft) und lassen das Bild wackeln **[Code: `fx-flash-red`, `screenShake`]**; bei schnell aufeinanderfolgenden Fehlern
  (801: Spawn alle 0,2 s) sind > 3 rote Blitze/s denkbar (F57, F58).
- `bewegungsreize_schwindel`: gering (kleines Sichtfeld, aber Bildschirmwackeln bei Fehlern).
- `tablet_geeignet`: Original nein (Pointer-Lock, Maus); Umsetzung nur mit Anpassung (Touch-Latenz F46,
  Finger verdeckt Ziel, kein „Zeiger stillhalten“ möglich).

### C4 Sicherheit und Vorsicht (Auswahlhinweise, keine medizinische Aussage)

- `photosensitive_epilepsie`, `migraene_lichtempfindlich`: rote Fehlerblitze (F57, F58).
- `farbsehschwaeche`: v. a. 802 (F60).
- `tremor_parkinson`: v. a. 805 (Stillhalten < 1,5 px/Bild, F31) und 804 (kleine Ziele).
- `hand_arm_beschwerden`: alle (schnelle Mausbewegungen, Wiederholung; F59).
- `presbyopie_gleitsicht`: seitliche Ziele (801) liegen bei Gleitsicht außerhalb des scharfen Zwischenbereichs
  (F61); Arbeitsplatzbrille für 50–70 cm sinnvoll (F62, F63).
- `gesichtsfeldausfall`: 801 (periphere Reize); keine Aussage über das Gesichtsfeld ableiten – kein Test.
- `aufmerksamkeitsprobleme`, `kognitive_einschraenkung`: hoher Zeitdruck, dichte Reizfolge (801, 803).
- Sturz- oder Herz-Kreislauf-Vorsicht ist mangels Körperbewegung nicht begründet.

### C5 Optiker-Bezug (kurz)

- Bildschirmabstand 50–70 cm = Zwischenbereich; bevorzugt im Mittel 63 cm (F63). Ab ≈ 40 J. reicht die
  Akkommodation für Nahsicht nicht mehr (F62) – Arbeitsplatz-/Bildschirmbrille statt Lesebrille.
- Gleitsicht: scharfer Zwischenbereich nur 13–18° breit (F61); seitliche Ziele unscharf, mehr Kopfbewegung.
  Für 801 ist „Blick in der Mitte halten“ mit Gleitsicht besonders ungünstig.
- Reizgrößen 0,5–1,7° (F65) sind groß gegenüber Sehschärfegrenzen; Sehschärfe ist nicht leistungsbegrenzend,
  wohl aber Kontrast/Farbe in der Peripherie (F07) und Bewegungsunschärfe bei hohem Tempo (F50).

---

## D. Literaturliste (nur geprüfte Einträge)

Legende Prüfvermerk: **CR** = DOI und Metadaten per Crossref geprüft; **Abs** = Abstract gelesen (PubMed/OpenAlex/
Semantic Scholar); **VT** = Volltext eingesehen; **Sek** = Inhalt nur über die genannte Sekundärquelle bestätigt;
**docs** = Inhalt bereits in `docs/wissenschaft/0x` geprüft, DOI hier erneut per Crossref bestätigt.

### D1 Von der Website angegeben (9) + im Fließtext genannt (2)

1. Donders, F. C. (1969). On the speed of mental processes (W. G. Koster, Übers.). *Acta Psychologica*, *30*, 412–431. https://doi.org/10.1016/0001-6918(69)90065-1 (Original 1868) – CR ✓; Inhalt Sek (Gomez et al., 2007, VT).
2. Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, *47*(6), 381–391. https://doi.org/10.1037/h0055392 – CR ✓; Inhalt Sek (Accot & Zhai, 1997, VT).
3. Kawato, M. (1999). Internal models for motor control and trajectory planning. *Current Opinion in Neurobiology*, *9*(6), 718–727. https://doi.org/10.1016/S0959-4388(99)00028-8 – CR ✓; Abs.
4. Lee, D. N. (1976). A theory of visual control of braking based on information about time-to-collision. *Perception*, *5*(4), 437–459. https://doi.org/10.1068/p050437 – CR ✓; Abs.
5. Logan, G. D., & Cowan, W. B. (1984). On the ability to inhibit thought and action: A theory of an act of control. *Psychological Review*, *91*(3), 295–327. https://doi.org/10.1037/0033-295X.91.3.295 – CR ✓; Inhalt Sek (Verbruggen & Logan, 2008, VT).
6. Posner, M. I. (1980). Orienting of attention. *Quarterly Journal of Experimental Psychology*, *32*(1), 3–25. https://doi.org/10.1080/00335558008248231 – CR ✓; Abs (OpenAlex).
7. Treisman, A. M., & Gelade, G. (1980). A feature-integration theory of attention. *Cognitive Psychology*, *12*(1), 97–136. https://doi.org/10.1016/0010-0285(80)90005-5 – CR ✓; docs (03).
8. Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience*, *9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – CR ✓; VT (PMC4374455).
9. Woodworth, R. S. (1899). The accuracy of voluntary movement. *The Psychological Review: Monograph Supplements*, *3*(3), i–114. https://doi.org/10.1037/h0092992 – CR ✓; Inhalt Sek (Elliott et al., 2001, Abs).
10. Ball, K. K., Beard, B. L., Roenker, D. L., Miller, R. L., & Griggs, D. S. (1988). Age and visual search: Expanding the useful field of view. *Journal of the Optical Society of America A*, *5*(12), 2210–2219. https://doi.org/10.1364/JOSAA.5.002210 – CR ✓; Abs. (nur im Fließtext von 801)
11. Verbruggen, F., & Logan, G. D. (2008). Response inhibition in the stop-signal paradigm. *Trends in Cognitive Sciences*, *12*(11), 418–424. https://doi.org/10.1016/j.tics.2008.07.005 – CR ✓; VT (PMC2709177). (nur im Fließtext von 805)

### D2 Weitere Fachliteratur (47)

12. Accot, J., & Zhai, S. (1997). Beyond Fitts' law: Models for trajectory-based HCI tasks. In *Proceedings of the ACM SIGCHI Conference on Human Factors in Computing Systems (CHI '97)* (S. 295–302). ACM. https://doi.org/10.1145/258549.258760 – CR ✓; VT (PDF).
13. Aron, A. R., & Poldrack, R. A. (2006). Cortical and subcortical contributions to stop signal response inhibition: Role of the subthalamic nucleus. *The Journal of Neuroscience*, *26*(9), 2424–2433. https://doi.org/10.1523/JNEUROSCI.4682-05.2006 – CR ✓; Abs.
14. Benguigui, N., & Bennett, S. J. (2010). Ocular pursuit and the estimation of time-to-contact with accelerating objects in prediction motion are controlled independently based on first-order estimates. *Experimental Brain Research*, *202*(2), 327–339. https://doi.org/10.1007/s00221-009-2139-0 – CR ✓ (online 2009); docs (03).
15. Berardelli, A., Hallett, M., Rothwell, J. C., Agostino, R., Manfredi, M., Thompson, P. D., & Marsden, C. D. (1996). Single-joint rapid arm movements in normal subjects and in patients with motor disorders. *Brain*, *119*(2), 661–674. https://doi.org/10.1093/brain/119.2.661 – CR ✓; Abs.
16. Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A*, *29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – CR ✓; docs (01).
17. Boot, W. R., Kramer, A. F., Simons, D. J., Fabiani, M., & Gratton, G. (2008). The effects of video game playing on attention, memory, and executive control. *Acta Psychologica*, *129*(3), 387–398. https://doi.org/10.1016/j.actpsy.2008.09.005 – CR ✓; Abs.
18. Brenner, E., & Smeets, J. B. J. (2015). How people achieve their amazing temporal precision in interception. *Journal of Vision*, *15*(3), 8. https://doi.org/10.1167/15.3.8 – CR ✓; Abs.
19. Carrasco, M. (2011). Visual attention: The past 25 years. *Vision Research*, *51*(13), 1484–1525. https://doi.org/10.1016/j.visres.2011.04.012 – CR ✓; VT (PMC3390154).
20. Casiez, G., Conversy, S., Falce, M., Huot, S., & Roussel, N. (2015). Looking through the eye of the mouse: A simple method for measuring end-to-end latency using an optical mouse. In *Proceedings of the 28th Annual ACM Symposium on User Interface Software & Technology (UIST '15)* (S. 629–636). ACM. https://doi.org/10.1145/2807442.2807454 – CR ✓; VT (PDF, Inria).
21. Charman, W. N. (2008). The eye in focus: Accommodation and presbyopia. *Clinical and Experimental Optometry*, *91*(3), 207–225. https://doi.org/10.1111/j.1444-0938.2008.00256.x – CR ✓; Abs.
22. CIE – Internationale Beleuchtungskommission. (2017). *Interim recommendation for practical application of the CIE system for mesopic photometry in outdoor lighting* (CIE TN 007:2017). https://files.cie.co.at/934_CIE_TN_007-2017.pdf – Technische Note, keine DOI; VT (PDF).
23. Congdon, E., Mumford, J. A., Cohen, J. R., Galvan, A., Canli, T., & Poldrack, R. A. (2012). Measurement and reliability of response inhibition. *Frontiers in Psychology*, *3*, 37. https://doi.org/10.3389/fpsyg.2012.00037 – CR ✓; VT (PMC3283117).
24. Curcio, C. A., Sloan, K. R., Kalina, R. E., & Hendrickson, A. E. (1990). Human photoreceptor topography. *Journal of Comparative Neurology*, *292*(4), 497–523. https://doi.org/10.1002/cne.902920402 – CR ✓; Abs.
25. Darrien, J. H., Herd, K., Starling, L.-J., Rosenberg, J. R., & Morrison, J. D. (2001). An analysis of the dependence of saccadic latency on target position and target characteristics in human subjects. *BMC Neuroscience*, *2*, 13. https://doi.org/10.1186/1471-2202-2-13 – CR ✓; VT (PMC59638).
26. Deubel, H., & Schneider, W. X. (1996). Saccade target selection and object recognition: Evidence for a common attentional mechanism. *Vision Research*, *36*(12), 1827–1837. https://doi.org/10.1016/0042-6989(95)00294-4 – CR ✓; Abs.
27. Eckner, J. T., Kutcher, J. S., & Richardson, J. K. (2010). Pilot evaluation of a novel clinical test of reaction time in National Collegiate Athletic Association Division I football players. *Journal of Athletic Training*, *45*(4), 327–332. https://doi.org/10.4085/1062-6050-45.4.327 – CR ✓; Abs.
28. Edwards, J. D., Fausto, B. A., Tetlow, A. M., Corona, R. T., & Valdés, E. G. (2018). Systematic review and meta-analyses of useful field of view cognitive training. *Neuroscience & Biobehavioral Reviews*, *84*, 72–91. https://doi.org/10.1016/j.neubiorev.2017.11.004 – CR ✓; Abs.
29. Elliott, D., Helsen, W. F., & Chua, R. (2001). A century later: Woodworth's (1899) two-component model of goal-directed aiming. *Psychological Bulletin*, *127*(3), 342–357. https://doi.org/10.1037/0033-2909.127.3.342 – CR ✓; Abs.
30. Enge, S., Behnke, A., Fleischhauer, M., Küttler, L., Kliegel, M., & Strobel, A. (2014). No evidence for true training and transfer effects after inhibitory control training in young healthy adults. *Journal of Experimental Psychology: Learning, Memory, and Cognition*, *40*(4), 987–1001. https://doi.org/10.1037/a0036165 – CR ✓; Abs.
31. Ferreira, S., Raimundo, A., del Pozo-Cruz, J., Leite, N., Pinto, A., & Marmeleira, J. (2024). Validity and reliability of a ruler drop test to measure dual-task reaction time, choice reaction time and discrimination reaction time. *Aging Clinical and Experimental Research*, *36*(1), 61. https://doi.org/10.1007/s40520-024-02726-6 – CR ✓; Abs + VT (PMC10920456; Stichprobe ≥ 60 J.). Hinweis: Der Abstract ist in sich widersprüchlich („good“ vs. ICC 0,57 „poor“ für den einfachen Test).
32. Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, *46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – CR ✓; docs (03).
33. Gomez, P., Ratcliff, R., & Perea, M. (2007). A model of the go/no-go task. *Journal of Experimental Psychology: General*, *136*(3), 389–413. https://doi.org/10.1037/0096-3445.136.3.389 – CR ✓; VT (PMC2701630).
34. Green, C. S., & Bavelier, D. (2003). Action video game modifies visual selective attention. *Nature*, *423*(6939), 534–537. https://doi.org/10.1038/nature01647 – CR ✓; Abs.
35. Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology*, *16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – CR ✓; Abs.
36. Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science*, *44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – CR ✓; Abs.
37. Hansen, T., Pracejus, L., & Gegenfurtner, K. R. (2009). Color perception in the intermediate periphery of the visual field. *Journal of Vision*, *9*(4), 26. https://doi.org/10.1167/9.4.26 – CR ✓; Abs.
38. IJmker, S., Huysmans, M. A., Blatter, B. M., van der Beek, A. J., van Mechelen, W., & Bongers, P. M. (2007). Should office workers spend fewer hours at their computer? A systematic review of the literature. *Occupational and Environmental Medicine*, *64*(4), 211–222. https://doi.org/10.1136/oem.2006.026468 – CR ✓; Abs.
39. Jagacinski, R. J., Repperger, D. W., Ward, S. L., & Moran, M. S. (1980). A test of Fitts' law with moving targets. *Human Factors*, *22*(2), 225–233. https://doi.org/10.1177/001872088002200211 – CR ✓; kein Abstract bei PubMed; Inhalt docs (02).
40. Jaschinski, W. (2002). The proximity-fixation-disparity curve and the preferred viewing distance at a visual display as an indicator of near vision fatigue. *Optometry and Vision Science*, *79*(3), 158–169. https://doi.org/10.1097/00006324-200203000-00010 – CR ✓; Abs.
41. Ketcham, C. J., Seidler, R. D., Van Gemmert, A. W. A., & Stelmach, G. E. (2002). Age-related kinematic differences as influenced by task difficulty, target size, and movement amplitude. *The Journals of Gerontology: Series B*, *57*(1), P54–P64. https://doi.org/10.1093/geronb/57.1.P54 – CR ✓; Abs.
42. Kida, N., Oda, S., & Matsumura, M. (2005). Intensive baseball practice improves the Go/Nogo reaction time, but not the simple reaction time. *Cognitive Brain Research*, *22*(2), 257–264. https://doi.org/10.1016/j.cogbrainres.2004.09.003 – CR ✓; Abs.
43. Lyons, J., Hansen, S., Hurding, S., & Elliott, D. (2006). Optimizing rapid aiming behaviour: Movement kinematics depend on the cost of corrective modifications. *Experimental Brain Research*, *174*(1), 95–100. https://doi.org/10.1007/s00221-006-0426-6 – CR ✓; Abs.
44. McAuley, J. H., & Marsden, C. D. (2000). Physiological and pathological tremors and rhythmic central motor control. *Brain*, *123*(8), 1545–1567. https://doi.org/10.1093/brain/123.8.1545 – CR ✓ (Crossref listet nur den Erstautor, PubMed beide); Abs.
45. McKee, S. P., & Nakayama, K. (1984). The detection of motion in the peripheral visual field. *Vision Research*, *24*(1), 25–32. https://doi.org/10.1016/0042-6989(84)90140-8 – CR ✓; Abs.
46. MDN Web Docs. (o. J.). *Performance: now() method* (Abschnitt „Security requirements“). Mozilla. Abgerufen am 29.09.2026 von https://developer.mozilla.org/en-US/docs/Web/API/Performance/now – Webseite, keine DOI; gelesen.
47. Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. *Journal of Neurophysiology*, *83*(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639 – CR ✓; Abs.
48. Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, *52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – CR ✓; docs (01, dort VT).
49. Ringer, R. V., Throneburg, Z., Johnson, A. P., Kramer, A. F., & Loschky, L. C. (2016). Impairing the useful field of view in natural scenes: Tunnel vision versus general interference. *Journal of Vision*, *16*(2), 7. https://doi.org/10.1167/16.2.7 – CR ✓; Abs.
50. Rogers, E. J., Trotter, M. G., Johnson, D., Desbrow, B., & King, N. (2024). KovaaK's aim trainer as a reliable metrics platform for assessing shooting proficiency in esports players: A pilot study. *Frontiers in Sports and Active Living*, *6*, 1309991. https://doi.org/10.3389/fspor.2024.1309991 – CR ✓; Abs.
51. Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest*, *17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – CR ✓; docs (01).
52. Strasburger, H., Rentschler, I., & Jüttner, M. (2011). Peripheral vision and pattern recognition: A review. *Journal of Vision*, *11*(5), 13. https://doi.org/10.1167/11.5.13 – CR ✓; VT (PMC11073400; Erratum 2024 vorhanden).
53. Vater, C., & Strasburger, H. (2021). Topical review: The top five peripheral vision tools in sport. *Optometry and Vision Science*, *98*(7), 704–722. https://doi.org/10.1097/OPX.0000000000001732 – CR ✓; Abs.
54. Vater, C., Wolfe, B., & Rosenholtz, R. (2022). Peripheral vision in real-world tasks: A systematic review. *Psychonomic Bulletin & Review*, *29*(5), 1531–1557. https://doi.org/10.3758/s13423-022-02117-w – CR ✓; Abs.
55. W3C. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (W3C Recommendation, 12.12.2024). https://www.w3.org/TR/WCAG22/ – Norm, keine DOI; docs (01/03, dort gelesen).
56. Yantis, S., & Jonides, J. (1984). Abrupt visual onsets and selective attention: Evidence from visual search. *Journal of Experimental Psychology: Human Perception and Performance*, *10*(5), 601–621. https://doi.org/10.1037/0096-1523.10.5.601 – CR ✓; Abs.
57. Zago, M., Bosco, G., Maffei, V., Iosa, M., Ivanenko, Y. P., & Lacquaniti, F. (2004). Internal models of target motion: Expected dynamics overrides measured kinematics in timing manual interceptions. *Journal of Neurophysiology*, *91*(4), 1620–1634. https://doi.org/10.1152/jn.00862.2003 – CR ✓; Abs.
58. Zelaznik, H. N., Hawkins, B., & Kisselburgh, L. (1983). Rapid visual feedback processing in single-aiming movements. *Journal of Motor Behavior*, *15*(3), 217–236. https://doi.org/10.1080/00222895.1983.10735298 – CR ✓; Abs.

### D3 Geprüft, aber bewusst nicht aufgenommen (Hinweise)

- **Woodworth-Schwelle „≈ 450 ms“** (ab dieser Bewegungszeit kein Unterschied zwischen Augen offen/zu): nur über
  eine Suchmaschinen-Zusammenfassung von Elliott et al. (2001) gefunden, Volltext nicht erreichbar → **nicht
  verwenden**.
- **Tsubota & Nakamori (1993)**, *NEJM* 328, 584 (Lidschlag am Bildschirm): DOI 10.1056/NEJM199302253280817 per
  Crossref ✓, aber Brief ohne Abstract, Zahlen nicht prüfbar → nicht aufgenommen.
- **McIntyre et al. (2001)**, *Nat Neurosci* 4, 693–694, doi 10.1038/89477 (Schwerkraftmodell, Astronauten):
  Crossref ✓, kein Abstract → durch Zago et al. (2004) ersetzt.
- **Eckner et al. (2011)** Test-Retest ICC 0,645 (J Athl Train 46(4), 409–414, doi 10.4085/1062-6050-46.4.409, CR ✓,
  Abs ✓) und **Eckner et al. (2015)** (Go/No-Go-Variante des Stab-Falltests, doi 10.2466/25.15.PMS.120v19x6, CR ✓,
  Abs ✓) – bei Bedarf ergänzbar.
- Kommerzielle Aussagen „Aim-Training verbessert FPS-Leistung um 10–30 %“ (Anbieter-Websites) – ohne Studie, nicht
  verwenden.
