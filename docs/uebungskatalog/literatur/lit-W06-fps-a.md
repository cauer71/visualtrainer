# Literaturbasis W06-fps-a – Zielen in Ego-Shootern (Katalog-Nr. 501–508)

Stand: 29.09.2026 · Gruppe W06-fps-a · Grundlage für die Autor-Agenten der Einträge
501 Flick-Training, 502 Zielwechsel im Schwarm, 503 Sofortreaktion, 504 Rückstoßkontrolle,
505 Strafe-Tracking, 506 180-Grad-Drehung, 507 Flow/Fokus, 508 Zielerfassung/erster Schuss.
(Nr. 509–515 bearbeitet eine parallele Gruppe.)

**Prüfmethode.** Jede DOI wurde über `api.crossref.org/works/<DOI>` geprüft (Titel, Autor:innen, Jahr,
Zeitschrift, Band, Seiten); am 29.09.2026 wurden **alle 110 DOIs** dieses Dokuments in einem
Schlussdurchlauf erneut erfolgreich aufgelöst. Inhalte wurden – soweit möglich – am Abstract (PubMed,
Semantic Scholar, Verlagsseite) oder Volltext (PMC, Autor:innen-/Repositoriums-PDF) geprüft.

**Prüfvermerke:** **[VT]** Volltext eingesehen · **[AB]** Abstract gelesen · **[KF]** nur Kurzfassung/
Metadaten, Kernaussage über zitierte Sekundärquelle belegt · **[DOC]** bereits in
`docs/wissenschaft/0x-….md` geprüft, DOI hier erneut per Crossref bestätigt · **[ER]** eigene Rechnung ·
**[CODE]** eigene Stichprobe im ausgelieferten Spielcode (nur Mechanik, kein Code übernommen).

**Wichtigste Befunde in fünf Sätzen**
1. Die Website nennt für die acht Übungen **42 Quellenangaben (20 verschiedene Werke)**; davon sind
   **5 Werke (6 Angaben) bibliografisch fehlerhaft** – 3 falsche DOIs (eine davon gehört zu einem
   völlig anderen Artikel, die zitierte Arbeit existiert so nicht) und 2 falsche Autoren/Titel.
2. Bibliografisch korrekte Quellen werden **häufig für Aussagen zitiert, die sie nicht enthalten**
   (z. B. Woods et al. 2015 – eine Studie zur einfachen Tastenreaktion – als Beleg für Sakkadenlatenzen,
   Browser-Timer, Zielwechsel-Latenzen und Rückstoß-Streuung). Die „Tier/Elite/Profi“-Tabellen aller
   acht Seiten haben **keine Datengrundlage** in den genannten Quellen.
3. Belastbar ist: Zielbewegungen folgen dem Fitts'schen Gesetz und bestehen aus Primärbewegung plus
   Korrekturen; Augen springen vor der Hand zum Ziel; Folgebewegungen haben ≈ 100–150 ms Latenz;
   vorhersagbare Störungen (Rückstoß) werden über interne Modelle gelernt; in Aim-Trainern selbst wird
   man mit Übung deutlich besser (N = 7.174, Aim Lab).
4. **Transfer** vom Aim-Trainer ins Spiel oder in den Alltag ist **nicht untersucht bzw. nicht belegt**;
   Metaanalysen zu Action-Videospielen betreffen ganze Spiele und kognitive Maße, motorische Maße wurden
   mangels Daten ausgeschlossen.
5. **Tablet/Optiker:** Alle acht Originale setzen Maus + Pointer Lock voraus (auf iPad-Safari nicht
   verfügbar); relevant sind trockene Augen (Lidschlag bei schnellen Spielen auf ≈ ⅓), Gleitsicht
   (schmaler Zwischenbereich 13–18° bei 60 cm), Farbsehschwäche (≈ 8 % der Männer), Photosensitivität
   (Blitze in 503, roter Fehler-Blitz im Code von 501/503/506) und Hand-/Handgelenksbeschwerden.

---

## 0. Code-Stichprobe (nur Mechanik, für die Einordnung der Website-Aussagen) [CODE]

- **Pointer Lock ohne Rohdaten-Option:** In den Spiel-Chunks von 501 (`19013-…js`), 503 (`84331-…js`)
  und 506 (`13832-…js`) wird `requestPointerLock()` **ohne** Optionen aufgerufen; die Option
  `unadjustedMovement` kommt nicht vor. Laut MDN ist `unadjustedMovement` standardmäßig `false`; nur mit
  `true` wird die Mausbeschleunigung des Betriebssystems abgeschaltet (MDN, o. J.-a). Die Website-Aussage
  „raw, unaccelerated mouse input captured through the Pointer Lock API“ (501) bzw. „1:1 Rohdaten ohne
  Windows-Mausbeschleunigung“ (503, 506) ist damit **so nicht zutreffend** (Beschleunigung hängt von den
  Systemeinstellungen ab). Autor-Agenten der übrigen Nummern bitte selbst prüfen.
- **Pointer Lock auf dem iPad:** laut MDN-Kompatibilitätsdaten (Stand Abruf 29.09.2026) in Safari iOS/
  iPadOS **nicht unterstützt** (`safari_ios: false`), in Chrome Android erst ab Version 144 (MDN BCD).
- **506 ist 2D:** Im Chunk von 506 finden sich `movementX/Y`, aber keine Kamera-/Perspektiv-Logik
  (kein yaw/perspective/fov). Die „180°-Drehung“ ist also eine große 2D-Zeigerbewegung zu Zielen am
  Bildschirmrand, keine gedrehte 3D-Ansicht → Vektions-/Schwindelrisiko gering.
- **Blitzeffekte:** 501, 503 und 506 enthalten die CSS-Klasse `fx-flash-red` (vermutlich roter
  Fehler-Blitz; Fläche/Dauer im Stylesheet prüfen). 503 arbeitet mit einem „Aufblitzen“ des Ziels
  (`flashWindow` von 550 ms abnehmend, Untergrenze 40 ms; Ziel-Radius 35 px; Täuschreize `isFeint`).

---

## A) Website-Quellen: Prüftabelle

### A.0 Die 20 verschiedenen Werke im Überblick

| # | Angabe der Website | DOI-/Angabenprüfung (Crossref) | Was die Quelle tatsächlich zeigt | genutzt in |
|---|---|---|---|---|
| W1 | Woods, Wyma, Yund, Herron & Reed (2015), *Front Hum Neurosci* 9, 131 | ✓ korrekt | Kalibrierte **einfache Tasten-Reaktionszeit**: Mittel 231 ms (213 ms nach Abzug der Hardware-Verzögerung), +0,55 ms/Jahr, N = 1.469 (18–65 J.); Reizentdeckungszeit ≈ 131 ms, altersunabhängig; Altersanstieg v. a. motorisch; Hardware-Verzögerungen erklären Laborunterschiede [AB] | 501–508 (alle) |
| W2 | „Elliott, D., **Helsen, W. F., & Chua, R.** (2010). Goal-directed aiming: Two components but multiple processes. *Psych Bull* 136(6)“ | ⚠ Titel, Jahr, Zeitschrift, DOI 10.1037/a0020958 stimmen – **Autoren falsch**: richtig Elliott, **Hansen, Grierson, Lyons, Bennett & Hayes** (2010). Helsen & Chua sind Mitautoren von Elliott et al. (**2001**), *Psych Bull* 127(3), 342–357 | Review: Zwei-Komponenten-Modell erweitert zu „multiple processes“ – **frühe Online-Kontrolle** anhand erwarteter sensorischer Folgen; Übung optimiert die Planung, um Worst-Case-Fehler zu vermeiden; Alter u. a. Gruppen [AB] | 501, 506 |
| W3 | Fitts (1954), *J Exp Psychol* 47(6), 381–391 | ✓ | Informationskapazität des motorischen Systems; Bewegungszeit steigt mit dem Schwierigkeitsindex (log₂ aus Amplitude/Zielbreite) [KF; Formel über Soukoreff & MacKenzie 2004, VT] | 501, 502, 504, 506, 508 |
| W4 | Schmidt, Zelaznik, Hawkins, Frank & Quinn (1979), *Psych Rev* 86(5), 415–451 | ✓ | Impuls-Variabilitäts-Theorie: Streuung schneller Zielbewegungen hängt von Amplitude, Bewegungszeit und bewegter Masse ab (Kraft-/Impulsgröße) [KF] | 501, 504, 506 |
| W5 | Meyer, Abrams, Kornblum, Wright & Smith (1988), *Psych Rev* 95(3), 340–370 | ✓ (Crossref führt „Keith Smith, J. E.“) | Stochastisches Modell optimierter Teilbewegungen: Primärbewegung + ggf. Korrektur-Teilbewegung; Rahmen, der Fitts' Gesetz erklärt [KF] | 502, 504, 508 |
| W6 | Treisman & Gelade (1980), *Cogn Psychol* 12(1), 97–136 | ✓ | Merkmalsintegration: einfache, trennbare Merkmale (z. B. Farbe) parallel; Merkmalskombinationen brauchen fokussierte Aufmerksamkeit [KF, DOC 03] | 502, 508 |
| W7 | Wolfe (2007). Guided Search 4.0. In *Integrated Models of Cognitive Systems*, 99–119 | ✓ (Buchkapitel, Hrsg. W. D. Gray, Oxford University Press; Crossref-Titel nur „Guided Search 4.0“) | Modell der visuellen Suche: Aufmerksamkeit wird durch Merkmale bottom-up und top-down gelenkt [KF] | 502, 508 |
| W8 | Posner & Petersen (1990), *Annu Rev Neurosci* 13, 25–42 | ✓ | Aufmerksamkeit als System getrennter Netzwerke (Orientierung, Zielentdeckung/exekutiv, Wachheit) [KF – kein Abstract in PubMed; Inhalt Standardliteratur] | 503, 505, 507 |
| W9 | Donders (1969, Orig. 1868), *Acta Psychol* 30, 412–431 | ✓ | Subtraktionsmethode, einfache vs. Wahl-Reaktion [KF, nur Metadaten] | 503 |
| W10 | Hick (1952), *Q J Exp Psychol* 4(1), 11–26 | ✓ | Wahl-Reaktionszeit steigt linear mit dem Informationsgehalt (log der Alternativenzahl) [DOC 04] | 503 |
| W11 | Schmidt & Lee (2011). *Motor control and learning* (5. Aufl.). Human Kinetics | ✓ Buch, keine DOI; ISBN 978-0-7360-7961-7 (OpenLibrary: Human Kinetics, 2011, 592 S.) | Lehrbuch; Generalisiertes Motorisches Programm (GMP; ursprünglich Schmidt, 1975) | 504 |
| W12 | Woodworth (1899), *Psychol Rev Monogr Suppl* 3(3), i–114 | ✓ (Crossref-Titel „Accuracy of voluntary movement“) | Zwei-Komponenten-Modell: zentrale Anfangsbewegung + rückmeldungsgestützte Steuerung [KF; über Elliott et al. 2001, AB] | 504 |
| W13 | Krauzlis (2004), *J Neurophysiol* 91(2), 591–603 | ✓ | Folgebewegung über erweitertes Netzwerk: frontales Augenfeld (FEF) mit direktestem Einfluss, extrastriäre Bewegungsareale, Kleinhirn, Basalganglien, Colliculus superior, Hirnstamm; Folgebewegung und Sakkaden teilen eine Kaskade [AB] | 505, 507 |
| W14 | Green & Bavelier (2003), *Nature* 423, 534–537 | ✓ | Action-Videospieler besser in visueller Aufmerksamkeit (4 Querschnitt-Experimente) + 1 Trainingsexperiment [AB]; Aufgaben: Flanker, Enumeration, UFOV, Attentional Blink; Training 10 h *Medal of Honor* vs. *Tetris* [über Sekundärquellen bestätigt] | 505, 507 |
| W15 | Rashbass (1961). „The relationship between saccadic and **smooth pursuit** eye movements“. *J Physiol* 159(2), 326–338 | ⚠ DOI 10.1113/jphysiol.1961.sp006811 stimmt – **Titel leicht falsch**: „…saccadic and smooth **tracking** eye movements“ | Step-Ramp-Versuch: Folgebewegung reagiert auf Bildbewegung (Geschwindigkeit), Sakkaden auf Positionsfehler [KF; Inhalt über Lisberger 2010, VT] | 505 |
| W16 | Land & McLeod (2000), *Nat Neurosci* 3(12), 1340–1345, doi 10.1038/**81861** | ✗ **DOI falsch** (Crossref 404). Richtig: **10.1038/81887** | Kricket-Schlagleute: prädiktive Sakkade zum erwarteten Aufprallpunkt, Folgen 100–200 ms nach dem Aufprall; kurze Latenz der ersten Sakkade unterscheidet gute von schwachen Spielern [AB] | 505 |
| W17 | „Lisberger, S. G. (2010). Visual tracking in primates: Neural mechanisms of smooth pursuit eye movements. *Curr Opin Neurobiol* 20(4), 405–410“, doi 10.1016/j.conb.2010.04.004 | ✗ **Arbeit in dieser Form nicht auffindbar.** Die DOI gehört zu Semaan & Kauffman (2010), „Sexual differentiation and development of forebrain reproductive circuits“, *Curr Opin Neurobiol* 20(4), 424–431; S. 405 liegt in einem anderen Artikel (Johansson et al., 400–407). Vermutlich gemeint: Lisberger (2010), *Neuron* 66(4), 477–491, **10.1016/j.neuron.2010.03.027** | (Neuron-Artikel) Folgebewegung wandelt ≈ 100 ms Bildbewegung in einen raschen Start um; MT-Populationscode; Kleinhirn und FEF-Folgeregion steuern mit wenig zusätzlichem Rauschen [AB, VT] | 505 |
| W18 | Leigh & Zee (2015). *The Neurology of Eye Movements* (5. Aufl.), OUP, doi 10.1093/med/9780199969**203**.001.0001 | ✗ **DOI falsch** (404). Richtig: **10.1093/med/9780199969289.001.0001** | Standardlehrbuch der Okulomotorik [KF, Metadaten] | 506 |
| W19 | Rayner (1998), *Psych Bull* 124(3), 372–422 | ✓ | Review zu Augenbewegungen beim **Lesen** und bei Informationsverarbeitung (Suche, Szenen, Tippen); Wahrnehmungsspanne, Integration über Sakkaden [AB] | 506 |
| W20 | Dietrich (2004), *Conscious Cogn* 13(4), 746–761 | ✓ | **Theoretische Hypothese** „transiente Hypofrontalität“: Flow = hochgeübte implizite Fertigkeit (v. a. Basalganglien) ohne Einmischung des expliziten (frontalen) Systems; keine eigenen Daten [AB] | 507 |

Außerdem **im Text genannt, aber nicht im Quellenverzeichnis:** Csikszentmihalyi (1975, 1990) (507;
Buch 1990 bibliografisch verifiziert, s. D), Wolfe (1994) (508; *Psychon Bull Rev* 1(2), 202–238,
✓ [DOC 03]), „FINST-Theorie“ (502; ohne Quelle – gemeint ist Pylyshyn, nicht geprüft), „Posner, 1990“
(503; gemeint vermutlich Posner & Petersen 1990).

**Zählung:** 42 Quellenangaben (501: 4, 502: 5, 503: 4, 504: 6, 505: 7, 506: 6, 507: 5, 508: 5),
20 verschiedene Werke. Bibliografisch fehlerhaft: W2 (in 501 und 506), W15, W16, W17, W18 →
**5 Werke / 6 Angaben**, davon **3 falsche DOIs** (W16, W17, W18; W17 zusätzlich nicht existent).

### A.1 Nr. 501 – Flick-Training („Aim Trainer – Flick-Training im Browser“)

| Angabe der Website (wofür zitiert) | DOI-Prüfung | Stützt die Aussage? |
|---|---|---|
| Woods et al. 2015 – „Initiale Blicksakkade 180–220 ms … Visuelle Reizidentifikation vor Mausbewegung“; Benchmark-Tabelle | ✓ | **nein.** Woods misst Tastenreaktionen, keine Augenbewegungen. Die Zahl 180–220 ms ist für Sakkaden zwar plausibel (typisch 180–250 ms; Darrien et al., 2001), stammt aber nicht aus Woods. |
| Elliott et al. 2010 – Zwei-Phasen-Modell; „ballistischer Open-Loop-Impuls überwindet 80–90 % der Distanz“; Meisterschaft = Bremsphase; 120–180 ms Hauptbewegung | ⚠ Autoren falsch | **teilweise.** Zwei Komponenten: ja. Aber Elliott et al. (2010) betonen gerade **frühe Online-Kontrolle** („multiple processes“) statt eines rein ungeführten ersten Impulses; 80–90 % und die ms-Werte stehen nicht im Abstract. Primärbewegungen **unterschießen** eher leicht (Helsen et al., 1998). |
| Fitts 1954 – Schwierigkeitsindex steigt logarithmisch mit Distanz und abnehmender Zielgröße; „Korrektives Abbremsen 60–120 ms (Fitts)“ | ✓ | **teilweise.** Gesetz: ja. Phasen-Zeitwerte: nicht in Fitts (1954). |
| Schmidt et al. 1979 – „konditioniert reziproke Innervation und antagonistische Muskelimpulse, Übersteuern wird systematisch eliminiert“ | ✓ | **nein** für die Trainingsbehauptung. Die Theorie beschreibt, dass die Streuung mit Impuls-/Kraftgröße wächst; über Training oder das „Eliminieren“ von Overshoot sagt sie nichts. |
| Benchmark-/Stufen-Tabelle („Elite 240–320 ms“) | – | **keine Datengrundlage** (keine der vier Quellen enthält FPS- oder Maus-Normdaten). |
| FAQ „Profis legen 85 % der Strecke im ersten Impuls zurück“ | ohne Quelle | nicht belegt; Spitzengeschwindigkeit der Hand liegt bei ≈ 50 % der Strecke (Helsen et al., 1998). |
| FAQ „144/240 Hz: Zielpositionen bis 15 ms früher wahrnehmen“ | ohne Quelle | **teilweise**: Bildintervall 16,7 → 4,2 ms [ER]; bei konstant gehaltener Latenz wirkt die Bildrate über 60 Hz nur gering, die Latenz dagegen deutlich (Spjut et al., 2019). |
| „raw, unaccelerated mouse input … Pointer Lock API“ | – | **falsch** laut Code (kein `unadjustedMovement`) [CODE]; MDN (o. J.-a). |
| „15–20 Minuten täglich optimal“, „signifikant höhere Win-Rates“ | ohne Quelle | nicht belegt; in Aim-Lab-Daten brachten ≈ 30 min/Tag 90 % des Tagesnutzens (Listman et al., 2021); Win-Rate-Effekte nicht untersucht. |
| eDPI-Empfehlungen je Spiel | ohne Quelle | keine wissenschaftliche Basis; Studie: optimaler Bereich 20–80 cm/360° (4-fach breit), individuelle Wahl meist darin (Boudaoud et al., 2022). |

### A.2 Nr. 502 – Zielwechsel im Schwarm („Aim Trainer Zielwechsel – Multi-Target“)

| Angabe der Website | DOI-Prüfung | Stützt die Aussage? |
|---|---|---|
| Fitts 1954 & Meyer et al. 1988 – Dauer skaliert mit Distanz/Größe; „die meisten enden in einer Korrektur-Teilbewegung“; „ballistischer Primärschub über rund 90 %“ | ✓ / ✓ | **teilweise.** Fitts und das Teilbewegungs-Modell: ja. „90 %“ steht nicht in den Quellen. Bei Folgebewegungen ist die erste Teilstrecke **länger**, wenn eine Verlängerung folgt (Helsen et al., 2001) – Kosten „pro Wechsel“ sind also real, aber anders als dargestellt. |
| „Unerfahrene verlieren 100–250 ms durch Abwarten der Kill-Bestätigung“ | ohne Quelle | nicht belegt. |
| Treisman & Gelade 1980; Wolfe 2007 – Orientierung in dichten Schwärmen, präattentive Suche, „Visual Indexing (FINST)“ | ✓ / ✓ | **teilweise.** Theorien korrekt wiedergegeben, aber bei gleich aussehenden Zielen ohne Ablenker ist die Aufgabe eher Reihenfolge-/Routenwahl als Suche; FINST ohne Quelle. |
| „Augenbewegungen gehen Handbewegungen um 50–80 ms voraus (Treisman & Gelade; Wolfe)“ | ✓ | **nein** (falsche Quelle). Richtig ist: die Sakkade startet vor der Hand; Handstart ≈ 100 ms nach der Sakkade (Prablanc et al., 1979). |
| Tipp „Blick schon aufs nächste Ziel, während die Hand noch korrigiert“ | Treisman/Wolfe | **widerspricht der Evidenz:** Der Blick ist während des Zeigens an das Ziel „verankert“; Sakkaden zu einem neuen Ziel werden um ≈ 155 ms verzögert, bis die Zeigebewegung abbremst (Neggers & Bekkering, 2000). |
| „Wechsel-Latenz … Eliminationsrate (Woods et al., 2015)“ | ✓ | **nein.** |
| Tier-Tabelle (Radiant/Faceit, „< 210 ms“, „110+ Ziele/min“) | – | **keine Datengrundlage.** |
| „Nearest-Neighbor-Routing“ (Fitts) | ✓ | **teilweise**: Logik folgt aus Fitts (kürzere Distanz → kürzere Zeit), eine FPS-Studie dazu gibt es in den Quellen nicht. |
| Griffspannung „Stufe 3 von 10“ | ohne Quelle | nicht belegt. |

### A.3 Nr. 503 – Sofortreaktion („Reaktionszeit Test | FPS-Reflexe messen“)

| Angabe der Website | DOI-Prüfung | Stützt die Aussage? |
|---|---|---|
| Woods et al. 2015 – „typische Erwachsene 200–250 ms; gemessener Wert enthält Bildwiederhol- und Maus-Abfrageverzögerung“ | ✓ | **ja** (231 ms, 213 ms korrigiert; Hardware-Verzögerungen). |
| Woods et al. 2015 – 60 Hz 16,6 ms, 240 Hz 4,1 ms, optische Schalter < 0,2 ms, mechanische 2–8 ms Debounce | ✓ | **teilweise**: Bildintervalle sind richtige Arithmetik [ER], stehen aber nicht in Woods; Schalterwerte ohne prüfbare Quelle. |
| Posner & Petersen 1990 – Reizerkennung/Weiterleitung an den Motorkortex; „Fovea höchste Zapfendichte (Posner 1990)“ | ✓ | **nein.** P&P behandeln Aufmerksamkeitsnetzwerke. Die Zapfendichte stimmt (Spitze ≈ 199.000/mm²; Curcio et al., 1990), ist aber nicht aus P&P. |
| Hick 1952 – Latenzkette, „Entscheidungszeiten im FPS“ | ✓ | **teilweise**: Hick betrifft Wahlreaktionen; die Übung ist eine einfache Reaktion mit Täuschreizen (Go/No-Go-artig). |
| Donders 1969 – einfache Reaktion „ca. 160–220 ms“ | ✓ | **teilweise**: Unterscheidung einfach/Wahl ja; Zahlenbereich nicht geprüft (nur Metadaten). |
| Latenzkette Netzhaut 20–40 ms → V1 30–50 ms → Kortex 40–70 ms → efferent 30–50 ms | ohne Einzelquelle | **teilweise**: Größenordnung plausibel (Reizentdeckung ≈ 131 ms, Woods et al., 2015; V1 antwortet vor MT/MST/FEF, Schmolesky et al., 1998), Einzelwerte unbelegt. |
| Tier-Tabelle („genetisch maximale Leitgeschwindigkeit“, „< 160 ms Profi“) | – | **keine Datengrundlage**; Unterschiede zwischen Geräten sind größer als ein Lebensjahrzehnt (DOC 01; Woods et al., 2015). |
| „Training verkürzt Reaktion dauerhaft um 15–40 ms“ | ohne Quelle | **widerspricht der Evidenz:** PVT-Reaktionszeit über 16 Wiederholungen praktisch stabil (Basner et al., 2018); große Effekte meist Gewöhnung an die Aufgabe (Guo et al., 2025). |
| Schlafmangel +30–80 ms, Koffein −10–20 ms | ohne Quelle | Richtung belegt (Lim & Dinges, 2010; McLellan et al., 2016), ms-Werte nicht. |
| „Trockene Augen verlängern die Reizleitungszeit“ | ohne Quelle | nicht belegt (trockenes Auge betrifft Bildqualität/Beschwerden, nicht die Nervenleitung). |
| „3D-Canvas-Umgebung“ | – | laut Code 2D-Canvas-Spiel [CODE; Autor bitte bestätigen]. |

### A.4 Nr. 504 – Rückstoßkontrolle („Rückstoßkontrolle lernen | FPS Spray Control“)

| Angabe der Website | DOI-Prüfung | Stützt die Aussage? |
|---|---|---|
| Schmidt et al. 1979 – „Streuung steigt mit Kraftanstrengung → gleichmäßige Abwärtsbewegung besser“; „Streuung nimmt **logarithmisch** zu“ | ✓ | **teilweise.** Richtung: ja (auch Harris & Wolpert, 1998: Rauschen wächst mit dem Steuersignal). „Logarithmisch“ ist nicht Schmidts Gesetz (dort annähernd **linear** mit Impuls bzw. Geschwindigkeit). |
| Schmidt et al. 1979 – „Übermäßige Muskelanspannung blockiert Propriozeption und Sehnenelastizität“ | ✓ | **nein.** Ko-Kontraktion erhöht die Steifigkeit und kann unvorhersehbare Störungen sogar stabilisieren (Burdet et al., 2001), kostet aber Energie. |
| Schmidt & Lee 2011 – GMP mit invarianten relativen Timing- und Kraftparametern; „10 Schüsse < 700 ms, schneller als die visuelle Rückkopplung“ | ✓ Buch | **teilweise.** GMP als Theorie: ja. Aber visuelle Korrekturen setzen nach ≈ 110–160 ms ein (Brenner & Smeets, 1997; Saunders & Knill, 2003); in einer Salve von 0,6–1 s [ER, abhängig von der Kadenz] sind mehrere Korrekturen möglich. Plausibler: gelerntes Vorwärtsmodell **plus** visuelle Korrektur (Shadmehr & Mussa-Ivaldi, 1994; Shadmehr et al., 2010). |
| Woodworth 1899 & Meyer et al. 1988 – ballistische Abwärtsbewegung + Korrektur-Teilbewegungen | ✓ / ✓ | **teilweise**: beide Modelle gelten für diskrete Zielbewegungen; auf fortlaufendes Gegensteuern nur als Analogie übertragbar. |
| Fitts 1954 – „Treffsicherheit unterliegt Fitts' Gesetz“ | ✓ | **teilweise/nein**: Rückstoßausgleich ist eine fortlaufende Kompensationsaufgabe, keine einzelne Zielbewegung. |
| Woods et al. 2015 – „Chronometrie via performance.now()“, Timer-/Polling-Werte | ✓ | **nein** (Woods behandelt keine Browser). |
| Tabelle „Streuradius < 18 px Weltklasse“ | – | **keine Datengrundlage.** |
| „2–3 Wochen à 15 min bis zum automatisierten Programm“ | ohne Quelle | nicht belegt; Aim-Lab-Lernkurven stiegen über bis zu 100 Tage weiter (Listman et al., 2021). |
| Waffenspezifische Muster (CS2/Valorant) | ohne Quelle | Spielinhalte, wissenschaftlich nicht prüfbar. |

### A.5 Nr. 505 – Strafe-Tracking („Tracking Aim Training | Strafe-Übung“)

| Angabe der Website | DOI-Prüfung | Stützt die Aussage? |
|---|---|---|
| Rashbass 1961; Krauzlis 2004 – „Richtungsreaktion 120–160 ms“, „glatte Blickfolge bis ≈ 30°/s“, „Umkehrlatenz 130–160 ms“ | ⚠ / ✓ | **teilweise.** Folgebewegungs-Latenz ≈ 100 ms (Affe; Lisberger, 2010) bzw. ≈ 150 ms (Mensch; Bahill & McDonald, 1983). „30°/s“ ist zu pauschal: Gain sinkt mit dem Tempo (Collewijn & Tamminga, 1984), Obergrenze einzelner Personen bis ≈ 100°/s (Meyer et al., 1985). Für die **Hand** (die Übung misst Mausführung) gelten ≈ 110 ms bis zur Korrektur (Brenner & Smeets, 1997) bzw. ≈ 200 ms, bis die Handbeschleunigung einer Tempoänderung folgt (Brenner et al., 1998). |
| Krauzlis 2004 – MT/V5 („primärer visueller Bewegungskortex“), MST, FEF berechnen den retinalen Geschwindigkeitsfehler und halten okulo- **und manuelle** Motorik synchron | ✓ | **teilweise**: Netzwerk für die Augenfolge ja; MT ist **extrastriär**, nicht primär; die Kopplung an die Handmotorik steht nicht in Krauzlis (2004). |
| Rashbass 1961 – Sakkaden positions-, Folgebewegung geschwindigkeitsgesteuert; „Raten provoziert Aufholsakkaden und Overshoot“ | ⚠ Titel | **teilweise**: erster Teil ja (Step-Ramp; bestätigt über Lisberger, 2010), zweiter Teil nicht aus Rashbass. |
| Posner & Petersen 1990; Green & Bavelier 2003 „räumliche Tracking-Paradigmen“; Woods 2015 | ✓ | **nein**: Green & Bavelier (2003) nutzten kein Tracking (Flanker, Enumeration, UFOV, Attentional Blink); Replikationen gemischt (Boot et al., 2008). P&P und Woods ohne Bezug zu Tracking-Schwellen. |
| Land & McLeod 2000 (nur im Verzeichnis) | ✗ DOI | **eher Gegenbeleg** zur Website-Empfehlung „Vorhersage unterdrücken, rein reaktiv folgen“: gute Schlagleute **sagen vorher** (prädiktive Sakkaden); Vorhersage kompensiert Verarbeitungsverzögerungen (Barnes, 2008; Kowler et al., 2019). |
| Lisberger 2010 (Richtwerte der Tabelle) | ✗ nicht existent | Tabellenwerte („Umkehrlatenz > 240 ms Anfänger“) **ohne Datengrundlage**. |
| Tipp „nicht aufs Fadenkreuz, sondern auf das Ziel schauen“ | ohne Quelle | **plausibel gestützt**: Beim Handtracking bleibt der Blick nah am Ziel, Folge-Gain steigt, Aufholsakkaden nehmen ab (Danion & Flanagan, 2018). |

### A.6 Nr. 506 – 180-Grad-Drehung („180-Grad-Aim-Training | FPS-Drehung“)

| Angabe der Website | DOI-Prüfung | Stützt die Aussage? |
|---|---|---|
| Rayner 1998 – „Periphere Erkennung & Sakkaden-Start 140–190 ms, Netzhautstäbchen, Colliculus superior, präattentive Orientierung“ | ✓ | **nein/teilweise**: Rayner ist ein Lese-Review; Stäbchen/Colliculus/180° kommen dort als Beleg nicht vor. Sakkadenlatenz typisch 180–250 ms, Express-Sakkaden ≈ 90–120 ms nur unter Gap-Bedingungen (Darrien et al., 2001; Fischer & Ramsperger, 1984). |
| Leigh & Zee 2015 | ✗ DOI | **teilweise** (Standardwerk zu Sakkaden/Colliculus; keine konkrete Aussage zugeordnet). |
| Elliott et al. 2010; Schmidt et al. 1979; Fitts 1954 – Schwung aus Schulter/Ellenbogen deckt 80–90 %, Antagonisten bremsen, Schwierigkeit steigt logarithmisch mit Sprungweite | ⚠ / ✓ / ✓ | **teilweise** (wie A.1); ms-Werte der Tabelle nicht in den Quellen. |
| „Stäbchen erkennen Bewegungen … bis zu 180 Grad“; „Fovea ≈ 2°“ | ohne Quelle | **irreführend**: Das Gesichtsfeld umfasst horizontal ≈ 200° (Strasburger et al., 2011), aber ein 27-Zoll-Monitor in 60 cm deckt nur ≈ 53° ab [ER]; „180°“ ist im Spiel eine virtuelle Drehung, in dieser Übung laut Code eine 2D-Randbewegung [CODE]. Stäbchenfreie Zone ≈ 1,25° (Curcio et al., 1990). |
| „Das Gehirn lernt, wie viele cm einer 180°-Drehung entsprechen“; „Profis 35–55 cm/360°“ | ohne Quelle | **teilweise**: Skalierungs-(Gain-)Lernen geht schnell und verallgemeinert (Krakauer et al., 2000); optimaler Bereich 20–80 cm/360°, kein „fest verdrahtetes“ Langzeit-Muskelgedächtnis beobachtet (Boudaoud et al., 2022). |
| „audio-spatial translation“, Flashbang-Ausweichen | ohne Quelle | nicht belegt; in der 2D-Übung ohne Ton-Richtungsreize nicht trainierbar [CODE, vorläufig]. |
| Benchmark-Tabelle 450–690 ms / Elite 320–420 ms | – | **keine Datengrundlage.** |

### A.7 Nr. 507 – Flow/Fokus („FPS Fokus Training | Flow Aim Trainer“)

| Angabe der Website | DOI-Prüfung | Stützt die Aussage? |
|---|---|---|
| Dietrich 2004 – Flow = transiente Hypofrontalität; „DLPFC herunterreguliert, Steuerung an Basalganglien und Kleinhirn“ | ✓ | **teilweise**: als **Hypothese** korrekt wiedergegeben (Basalganglien ja, Kleinhirn nicht im Abstract). Die Bildgebungsbefunde dazu sind uneinheitlich (Harris et al., 2017); gemessen wurden z. B. weniger Aktivität im medialen präfrontalen Kortex und in der Amygdala, **mehr** im linken inferioren Frontalgyrus und Putamen (Ulrich et al., 2014). Die „Stufe 4: > 30 s DLPFC-Herunterregulierung“ ist eine Erfindung ohne Messung. |
| „Schwierigkeit nahe am eigenen Können = Bedingung für Flow“ | – (Csikszentmihalyi) | **teilweise**: Zusammenhang Anforderung–Können ↔ Flow ist **moderat** (Metaanalyse, 28 Studien; Fong et al., 2015). |
| „70–80 % Präzision = von Csikszentmihalyi (1990) definierter Idealbereich“; „Herausforderung 5–10 % über dem Können“ | Buch ✓ | **nicht belegbar**: Das Flow-Modell beschreibt ein Gleichgewicht, keine Trefferquote. Eine verwandte Zahl gibt es nur für optimales **Lernen** (≈ 85 % richtig; theoretisch, Wilson et al., 2019). |
| Krauzlis 2004 – „kortikostriatale Bahnen eliminieren Korrektursakkaden“, „Blick 2–3° vorausführen reduziert Augenermüdung“ | ✓ | **nein.** Prädiktive Folgebewegung existiert (Kowler et al., 2019), der Ratschlag und die Ermüdungsbehauptung nicht. |
| Posner & Petersen 1990 – „Posner-Netzwerk blendet Umgebungsreize aus“, „Ermüdung erschöpft Neurotransmitter im fronto-parietalen Netzwerk“ | ✓ | **nein** für die Erschöpfungsbehauptung; Wachsamkeitsabfall wird als Ressourcenbeanspruchung beschrieben (Warm et al., 2008). |
| Green & Bavelier 2003 (nur im Verzeichnis); Woods 2015 („Bézier-Kurven, Chronometrie“) | ✓ | keine zugeordnete Aussage bzw. **nein**. |
| „Stärkt Konzentration bei der Arbeit (Deep Work)“ | ohne Quelle | **nicht belegt**; Ferntransfer von Spiel-/Hirntraining ist klein bis null (Sala et al., 2018; Simons et al., 2016). |

### A.8 Nr. 508 – Zielerfassung/erster Schuss („Valorant Aim Trainer – Zielerfassung & First Shot“)

| Angabe der Website | DOI-Prüfung | Stützt die Aussage? |
|---|---|---|
| Treisman & Gelade 1980 – „Helligkeitsunterschiede werden parallel verarbeitet → unfehlbare Erstschuss-Reflexe“; „Leuchtdichte, Farbe, Kantenorientierung parallel über das gesamte Sehfeld“ | ✓ | **teilweise**: Parallelverarbeitung einfacher Merkmale ja (untersucht v. a. Farbe/Form). Leuchtdichte**polarität** gilt nur als „wahrscheinliches“ Leitmerkmal (Wolfe & Horowitz, 2017). „Das hellste von mehreren abgestuft hellen Zielen“ ist bei kleinen Unterschieden und uneinheitlichen Ablenkern **nicht** effizient (Duncan & Humphreys, 1989). Peripher sinken Auflösung und Unterscheidung (Strasburger et al., 2011). „Unfehlbare Reflexe“: nicht belegt. |
| Wolfe 1994/2007 – Top-down/Bottom-up-Lenkung; „Training der Kontrastdiskriminierung lehrt V1, Störsignale zu verwerfen, Latenz sinkt signifikant“ | ✓ | **teilweise**: Modell korrekt; Trainings- und V1-Behauptung nicht in Guided Search. |
| Fitts 1954; Meyer et al. 1988 | ✓ | **ja** (allgemeiner Rahmen). |
| „Erfassungs-Latenz … (Woods et al., 2015)“ | ✓ | **nein.** |
| „Augen sollten 30–50 ms vor dem Fadenkreuz am Ziel sein“ | ohne Quelle | **widerspricht der Evidenz**: Die Primärsakkade endet etwa zum Zeitpunkt der maximalen Handbeschleunigung; der Blick ist also viel früher am Ziel (Helsen et al., 1998). |
| „Visual Clutter kostet 100–200 ms (serielle Suche)“ | ohne Quelle | **teilweise**: ineffiziente Suche kostet ≈ 25–35 ms pro Element (DOC 03); Gesamtwert hängt von der Elementzahl ab. |
| „Black eQualizer verkürzt die biologische Erkennungslatenz signifikant“ | ohne Quelle | nicht belegt. |
| Tier-Tabelle (< 260 ms, 95–99 %) | – | **keine Datengrundlage.** |

---

## B) Faktenliste „Aussage – Zahl – Quelle“

Relevanz in eckigen Klammern (Nummern der Übungen). APA-Kurzbeleg; Vollangabe mit DOI in D.

### B.1 Zielbewegungen, Fitts'sches Gesetz, Speed-Accuracy-Trade-off

| ID | Aussage | Zahl/Wert | Quelle |
|---|---|---|---|
| F01 | Bewegungszeit steigt linear mit dem Schwierigkeitsindex; für Vergleiche empfohlen: Shannon-Form ID = log₂(D/W + 1), Durchsatz in bit/s, effektive Zielbreite We = 4,133 × SD der Endpunkte [501, 502, 506, 508] | Formel; 4,133·σ | Fitts (1954); Soukoreff & MacKenzie (2004) [VT] |
| F02 | Durchsatz der Maus in ISO-9241-9-konformen Studien eng beisammen; in älteren, uneinheitlich ausgewerteten Studien sehr streuend [501, 502, 506] | 3,7–4,9 bit/s (ISO); 2,55–12,5 bit/s (vorher; Card et al. 1978: 10,4 bit/s) | Soukoreff & MacKenzie (2004) [VT]; Card et al. (1978) |
| F03 | Primärsakkade und Primärbewegung der Hand **unterschießen** leicht, danach kleine Korrekturen; Ende der Primärsakkade fällt mit der maximalen Handbeschleunigung zusammen; Spitzengeschwindigkeit der Hand bei 50 % der Strecke [501, 502, 506, 508] | N = 10; 50 % | Helsen et al. (1998) [AB] |
| F04 | Zielbewegungen nutzen **frühe Online-Kontrolle** anhand erwarteter Sinnesrückmeldung; durch Übung wird die Planung so optimiert, dass Worst-Case-Fehler vermieden werden; Tempo, Genauigkeit und Energie werden strategisch austariert [501, 502, 506, 508] | – | Elliott et al. (2010) [AB]; Elliott et al. (2004) [AB]; Elliott et al. (2001) [AB] |
| F05 | Rauschen der Steuersignale wächst mit ihrer Größe; glatte, symmetrische Geschwindigkeitsprofile minimieren die Endpunktstreuung und erklären Fitts' Trade-off für Augen und Arm [501, 504, 506] | – | Harris & Wolpert (1998) [AB] |
| F06 | Zwei-Segment-Bewegungen: die **erste** Teilbewegung dauert länger, wenn eine Verlängerung folgt („one-target advantage“); Umkehrbewegungen werden dagegen als Einheit organisiert [502, 508] | 2 Experimente | Helsen et al. (2001) [AB] |
| F07 | Aim-Lab-Profis: Leistung über zwei Zielgrößen durch Fitts' Gesetz **schlecht** beschrieben; Kinematik hängt von der Aufgabe ab; individuelle motorische Schärfe korreliert mit der Kinematik [501, 502, 508] | – | Donovan et al. (2022) [AB] |
| F08 | FPS-Zielen per Maus ähnelt kinematisch dem Zeigen in der Ebene; 20 Runden Übung: Reaktionszeit −70 ms, Primärbewegung −14 ms, Korrekturzeit −134 ms, Klick-Verweilzeit −72 ms; Maus schneller als Trackpad | N = 86; 614 vs. 793 ms Erfassungszeit (d = 0,95) | Warburton et al. (2023) [AB/VT-Auszug] |
| F09 | Erfahrene FPS-Spieler zeigen bessere Bewegungsplanung und sensomotorische Integration; Training verbessert alle Phasen der Zielerfassung [501, 502, 508] | – | Toth et al. (2023) [KF, Abstract über Repositorium] |
| F10 | Profis vs. Amateure in CS:GO (6 Sensoren): nur ein Teil der Community-Annahmen hält einer Prüfung stand [alle] | 8 vs. 8; 6 von 13 Annahmen bestätigt | Park et al. (2021) [AB] |
| F11 | Zielen in 3D-FPS ist langsamer als gleichwertiges 2D-Zeigen [501, 506] | ≈ 8 % längere Zeit | Ivkovic (2017, Masterarbeit) [VT] |
| F12 | Ältere (M = 68 J.) skalieren die Geschwindigkeit bei größerer Amplitude weniger und verlängern die Primärbewegung bei größeren Zielen nicht → langsamere, variablere Zielbewegungen [alle, Optiker-Kundschaft] | 15 vs. 15 | Ketcham et al. (2002) [AB] |
| F13 | Speed-Accuracy-Trade-off ist allgegenwärtig; Anleitungen verschieben Tempo und Genauigkeit gegeneinander [alle] | – | Heitz (2014) [AB] |

### B.2 Blick–Hand-Kopplung und Sakkaden

| ID | Aussage | Zahl/Wert | Quelle |
|---|---|---|---|
| F14 | Beim Zeigen auf ein peripheres Ziel kommt zuerst die Sakkade, die Hand folgt; Latenzen korrelieren kaum (parallele Verarbeitung) [501, 502, 506, 508] | Sakkade innerhalb 250 ms, Hand ≈ 100 ms später | Prablanc et al. (1979) [AB] |
| F15 | **Blickverankerung:** Während einer Zeigebewegung werden Sakkaden zu einem neuen Ziel aufgeschoben, bis die Hand abbremst [502, 508] | +155 ms Latenz (Kontrolle nur +29 ms) | Neggers & Bekkering (2000) [AB] |
| F16 | Sakkadenlatenz typisch; unabhängig von der Exzentrizität des Ziels | 180–250 ms; Overlap 200–220 ms; Express 90–120 ms | Darrien et al. (2001) [VT] |
| F17 | Mit Lücke (Fixpunkt verschwindet ≈ 200 ms vorher) zweigipflige Verteilung | Express ≈ 100 ms, regulär ≈ 150 ms | Fischer & Ramsperger (1984) [AB] |
| F18 | Alter: 20–30-Jährige mit schnellsten und gleichmäßigsten Sakkaden; 60–79-Jährige langsamer, Sakkaden länger [501, 502, 506, 508] | N = 168, 5–79 J. | Munoz et al. (1998) [AB] |
| F19 | Mit frei beweglichem Kopf entstehen Blickwechsel aus Sakkade + Kopfbewegung; Regeln kopffixierter Sakkaden ändern sich [506, Gleitsicht] | – | Freedman (2008) [AB] |
| F20 | „Quiet Eye“ (letzte Fixation vor der Ausführung): Experten vs. Novizen und Erfolg vs. Misserfolg; QE-Training verbessert Leistung [508, 501] | d = 1,04; d = 0,58; Training: QE d = 1,53, Leistung d = 0,84 (27 + 9 Studien) | Lebeau et al. (2016) [AB] |
| F21 | Sport-Experten nehmen Hinweisreize genauer/schneller auf, mit weniger, längeren Fixationen [508, 502] | 42 Studien, 388 Effektstärken | Mann et al. (2007) [AB] |
| F22 | Plötzlich erscheinende Reize (abrupt onsets) ziehen Aufmerksamkeit auf sich [501, 503, 506, 508] | 3 Experimente | Yantis & Jonides (1984) [AB] |
| F23 | Kricket: prädiktive Sakkade zum erwarteten Aufprallpunkt; Folgen 100–200 ms nach dem Aufprall; kurze Latenz der ersten Sakkade kennzeichnet gute Spieler [505, 507] | 100–200 ms | Land & McLeod (2000) [AB] |

### B.3 Glatte Folgebewegung und manuelles Tracking

| ID | Aussage | Zahl/Wert | Quelle |
|---|---|---|---|
| F24 | Latenz von Bildbewegung zu Augenbewegung (Affe); die ersten 100 ms sind „offene Schleife“ [505, 507] | 100 ms | Lisberger (2010) [VT] |
| F25 | Menschen: Folgebewegungs-Latenz, vorhersagbare Ziele werden trotzdem ohne Verzögerung verfolgt [505, 507] | ≈ 150 ms | Bahill & McDonald (1983) [DOC 02] |
| F26 | Folgebewegung reagiert selektiv auf Bildbewegung (Step-Ramp); Neuronen in MT sind richtungs- und tempoabgestimmt [505, 507] | – | Rashbass (1961) über Lisberger (2010) [VT] |
| F27 | Netzwerk der Folgebewegung: FEF (direktester Einfluss), extrastriäre Areale, Kleinhirn, Basalganglien, Colliculus superior, Hirnstamm; Folge und Sakkaden teilen eine Kaskade [505, 507] | – | Krauzlis (2004) [AB] |
| F28 | Gain immer < 0,95, sinkt mit Zieltempo; strukturierter Hintergrund senkt ihn um ≈ 10 % (horizontal) bzw. 20 % (vertikal) [505, 507] | < 0,95 | Collewijn & Tamminga (1984) [DOC 02] |
| F29 | Obergrenze der Folgegeschwindigkeit individuell hoch [505, 507] | ≈ 90 % Gain bis 100°/s (4 von 5 Personen) | Meyer et al. (1985) [DOC 02] |
| F30 | Prädiktive Mechanismen (Efferenzkopie, Kurzzeitspeicher für Tempo/Timing) gleichen Verzögerungen aus; Erwartung erzeugt antizipatorische Folgebewegung [505, 507] | – | Barnes (2008) [AB]; Kowler et al. (2019) [DOC 02] |
| F31 | Beim **Handtracking** eines unvorhersehbar glatt bewegten Ziels: höherer Folge-Gain und weniger Aufholsakkaden als beim reinen Blickfolgen [505, 507] | – | Danion & Flanagan (2018) [AB] |
| F32 | Auge + Hand gemeinsam: bei Sinusbewegung > ≈ 1 Hz weniger Sakkaden als Auge allein; kein Unterschied bei pseudozufälliger Bewegung [505, 507] | > 1 Hz | Koken & Erkelens (1992) [AB] |
| F33 | Die Hand korrigiert nach einem Zielsprung [502, 504, 505] | ≈ 110 ms (N = 6 je Experiment) | Brenner & Smeets (1997) [AB] |
| F34 | Visuelle Rückmeldung der Hand wird fortlaufend genutzt [501, 504, 505] | Korrektur ≈ 160 ms nach Störung | Saunders & Knill (2003) [AB] |
| F35 | Handbeschleunigung folgt Änderungen der Zielgeschwindigkeit; visuomotorische Latenz beim Tippen/Wischen [505, 507] | ≈ 200 ms; 114 ms (N = 22) | Brenner et al. (1998); Brenner et al. (2026) [DOC 02] |

### B.4 Motorisches Lernen, interne Modelle (Rückstoß, Empfindlichkeit)

| ID | Aussage | Zahl/Wert | Quelle |
|---|---|---|---|
| F36 | Unter einem Kraftfeld nähern sich Bahnen durch Übung wieder der freien Bahn an; Nacheffekte = Spiegelbild → internes Modell, das Kräfte vorhersagt und ausgleicht; generalisiert über den Trainingsbereich hinaus [504] | – | Shadmehr & Mussa-Ivaldi (1994) [AB] |
| F37 | Vorwärtsmodelle bleiben über sensorische Vorhersagefehler kalibriert; sensorische Rückmeldung ist verrauscht und verzögert [504, 501] | – | Shadmehr et al. (2010) [AB]; Wolpert et al. (1995) [AB] |
| F38 | Instabile/unvorhersehbare Dynamik wird durch **gezielte Impedanz-(Steifigkeits-)Steuerung** stabilisiert – energieeffizient, nicht durch pauschales Verkrampfen [504] | – | Burdet et al. (2001) [AB]; Franklin & Wolpert (2011) [AB] |
| F39 | Eine neue **Skalierung** (Gain) wird gleich schnell mit 1 oder vielen Distanzen gelernt und auf neue Distanzen/Richtungen übertragen; Rotationen verallgemeinern schlecht [506, 501] | – | Krakauer et al. (2000) [AB] |
| F40 | Maus-Empfindlichkeit in FPS: optimaler Bereich, bevorzugte Einstellungen meist darin; niedriger ID profitiert von höherer, hoher ID von niedrigerer Empfindlichkeit; kein „fest verdrahtetes“ Langzeit-Muskelgedächtnis beobachtet [501, 506] | 0,45–1,8 °/mm = 20–80 cm/360° (4-fach); 13 ausgewertete Personen, 240-Hz-Monitor, 61 cm | Boudaoud et al. (2022) [VT]; (2023) [AB] |
| F41 | Nutzbarer Bereich der Zeiger-Übersetzung (CD-Gain) wird durch Tempo- und Genauigkeitsgrenzen bestimmt [501, 506] | – | Casiez et al. (2008) [KF] |
| F42 | Lernen „in freier Wildbahn“ (Aim Lab): Trefferquote nur mäßig, Treffer pro Sekunde deutlich besser; 40–60 % Behalten von Tag zu Tag; größte Tagesgewinne bei ≈ 1 h, 90 % des Nutzens mit 30 min/Tag [501, 502, 508] | N = 7.174; 682.564 Durchgänge; bis 100 Tage | Listman et al. (2021) [AB] |
| F43 | Variables Üben (Kontextinterferenz) verbessert Behalten/Transfer, im angewandten Bereich deutlich schwächer [alle] | d = 0,38 gesamt; 0,57 Grundlagen vs. 0,19 angewandt; Erwachsene 0,50 (61 Studien) | Brady (2004) [AB] |
| F44 | Laborparadigmen (Adaptation, Sequenzlernen) erklären echten Fertigkeitserwerb nur unzureichend [alle] | – | Krakauer et al. (2019) [AB] |
| F45 | Generalisiertes Motorisches Programm/Schema-Theorie [504] | – | Schmidt (1975) [KF]; Schmidt & Lee (2011) [Buch] |

### B.5 Latenz, Bildrate, Eingabe, Messgenauigkeit

| ID | Aussage | Zahl/Wert | Quelle |
|---|---|---|---|
| F46 | Bildintervall = 1000 ms / Hz; USB-Abfrage bei 125 Hz alle 8 ms (bis 8 ms Eingabeverzögerung), bei 1000 Hz 1 ms [alle] | 16,7 / 6,9 / 4,2 ms bei 60/144/240 Hz | [ER]; Ivkovic (2017) [VT] |
| F47 | Lokale Latenz realer Spielsysteme; schon kleine Latenzen verschlechtern das Zielen [alle] | 23–243 ms; Effekt ab 41 ms | Ivkovic et al. (2015) [AB]; Ivkovic (2017) [VT] |
| F48 | Tracking: Zeit auf dem Ziel sinkt mit Latenz; Zielerfassungszeit steigt [505, 507, 501] | −5,8 % (41 ms) bis −32,7 % (164 ms); +11 % (74 ms) bis +52 % (164 ms) | Ivkovic (2017) [VT] |
| F49 | Bei konstant gehaltener Latenz bringt eine Bildrate > 60 Hz nur wenig, geringere Latenz dagegen klar [501, 503] | 8 geübte Esportler | Spjut et al. (2019) [AB] |
| F50 | Schon kleine Latenzreduktionen verbessern Treffgenauigkeit und Punkte erfahrener CS:GO-Spieler [alle] | N = 43; Systemlatenz < 125 ms | Liu et al. (2021) [AB] |
| F51 | Einfache Reaktionszeit kalibriert; Altersanstieg klein; Reizentdeckung altersunabhängig [503] | 231/213 ms; +0,55 ms/Jahr; 131 ms | Woods et al. (2015) [AB] |
| F52 | Web-Apps messen Touch-Reaktionszeiten zu lang; Touch-zu-Anzeige-Latenz kommerzieller Geräte [alle, Tablet] | +58–70 ms; 50–200 ms | Pronk et al. (2020); Deber et al. (2015) [DOC 01/02] |
| F53 | `performance.now()`-Auflösung; `event.timeStamp` in Safari/Firefox auf 1 ms gerundet [alle] | 100 µs (nicht isoliert), 5 µs (cross-origin-isoliert) | MDN (o. J.-b); DOC 01 |
| F54 | `requestPointerLock({unadjustedMovement: true})` schaltet OS-Mausbeschleunigung ab (Standard: aus); Pointer Lock in Safari iOS/iPadOS nicht verfügbar [alle] | – | MDN (o. J.-a); MDN BCD [VT] |

### B.6 Reaktion, Hemmung, Aufmerksamkeit, Zustand

| ID | Aussage | Zahl/Wert | Quelle |
|---|---|---|---|
| F55 | Einfache Reaktionszeit ist über Wiederholungen sehr stabil [503] | 16 PVT-Durchgänge, N = 45, keine systematische Änderung | Basner et al. (2018) [DOC 01] |
| F56 | Große Trainingseffekte in digitalen Sehtrainings entstehen vor allem, wenn Trainings- und Testaufgabe gleich sind [alle] | SMD 2,66 (ähnlich) vs. 0,50 (unähnlich); 33 RCTs | Guo et al. (2025) [DOC 01] |
| F57 | Hick-Hyman: Wahlreaktionszeit ∝ log₂ Alternativen (v. a. 2–8); bei hoher Reiz-Reaktions-Kompatibilität (Zeigen auf den Reizort) fast flach [502, 503, 508] | – | Hick (1952); Proctor & Schneider (2018) [DOC 04] |
| F58 | Go/No-Go fordert nur dann echte Hemmung, wenn Stopp-Reize selten sind und das Tempo hoch ist [503] | ≤ 20 % Stopp, ≤ 1.500 ms Takt | Wessel (2018) [DOC 01] |
| F59 | Makaken: V1 antwortet als erstes kortikales Areal, dann nahezu gleichzeitig V3, MT, MST, FEF; magnozelluläre LGN-Schichten früher als parvozelluläre [503, 505] | M 17 ms früher als P | Schmolesky et al. (1998) [AB] |
| F60 | Schlafmangel (< 48 h) verschlechtert v. a. einfache Aufmerksamkeit (Aussetzer) [503, 507] | g = −0,776 (70 Artikel) | Lim & Dinges (2010) [AB] |
| F61 | Koffein (≈ 40–300 mg) verbessert Wachheit, Vigilanz, Reaktionszeit [503] | – | McLellan et al. (2016) [AB] |
| F62 | Vigilanzaufgaben sind anstrengend und stressig (Ressourcentheorie) [507] | – | Warm et al. (2008) [AB] |

### B.7 Visuelle Suche und Zielerkennung

| ID | Aussage | Zahl/Wert | Quelle |
|---|---|---|---|
| F63 | Einfache Merkmale parallel, Kombinationen seriell/fokussiert [502, 508] | – | Treisman & Gelade (1980) [DOC 03] |
| F64 | Leitmerkmale der Suche: sicher Farbe, Bewegung, Orientierung, Größe; wahrscheinlich u. a. Aufleuchten (luminance onset) und Leuchtdichte**polarität**; „Luminosity“ (Leuchten) eher kein Leitmerkmal [508, 502] | Box 1 | Wolfe & Horowitz (2017) [VT] |
| F65 | Suche wird schwerer, je ähnlicher Ablenker dem Ziel sind, und leichter, je einheitlicher (gruppierbar) die Ablenker sind [508] | – | Duncan & Humphreys (1989) [KF] |
| F66 | Ineffiziente Suche kostet pro zusätzlichem Element [508] | ≈ 25–35 ms (Ziel vorhanden) | DOC 03 (Wolfe) |

### B.8 Optik, Auge, Optiker-Bezug

| ID | Aussage | Zahl/Wert | Quelle |
|---|---|---|---|
| F67 | Zapfendichte in der Fovea; stäbchenfreie Zone; Abfall mit Exzentrizität [503, 506, 508] | Spitze ≈ 199.000/mm² (100.000–324.000); stäbchenfrei 0,35 mm = 1,25°; 1 mm neben dem Zentrum eine Größenordnung weniger Zapfen | Curcio et al. (1990) [AB] |
| F68 | Gesichtsfeld horizontal; Bildschirm deckt nur einen kleinen Teil ab [506, 501] | ≈ 200° (bis 214°); 27″-Monitor (59,8 cm breit) in 60 cm ≈ 53° | Strasburger et al. (2011) [DOC 01]; [ER] |
| F69 | Rot-Grün-Farbsehschwäche (Europa) [502 Cyan-Ziele, 503 Grün-Signal, 504 Trefferzonen, 508 Helligkeit statt Farbe = günstig] | ≈ 8 % Männer, 0,4 % Frauen | Birch (2012) [AB] |
| F70 | Kontrastempfindlichkeit für hohe Ortsfrequenzen sinkt ab ≈ 40–50 J.; Bewegungsgewinn bei > 60-Jährigen stark vermindert [508, 505] | N = 91, 19–87 J. | Owsley et al. (1983) [AB] |
| F71 | Akkommodationsbreite reicht ab ≈ 40 J. nicht mehr für normale Naharbeit; Bedarf bei 60 cm Bildschirmabstand [alle] | 1/0,6 m = 1,67 dpt [ER] | Charman (2008) [AB] |
| F72 | Gleitsicht am Computer (60 cm): klares horizontales Sehfeld im Zwischenbereich viel schmaler als mit Einstärkenglas; längere Blick-Stabilisierung, mehr Kopfbewegung bei breitem Material [alle, bes. 506] | Einstärken 60°, PAL-I 18°, PAL-II 13°; N = 11, 45–71 J.; Doppelseite 37° | Han et al. (2003) [AB] |
| F73 | Neue Gleitsichtträger setzen mehr Kopfbewegungen ein [506, 501] | N = 10 | Hutchings et al. (2007) [AB] |
| F74 | Digitale Augenbelastung: Prävalenz; Ursachen Akkommodation/Binokularsehen und trockenes Auge; Management u. a. Refraktions-/Presbyopiekorrektur, Pausen [alle] | ≥ 50 % der Nutzer | Sheppard & Wolffsohn (2018) [AB] |
| F75 | Lidschlag am Bildschirm; bei schnellen Spielen stärker reduziert, mehr unvollständige Lidschläge, Tränenfilm instabiler [alle, bes. 505, 507] | 5-fach weniger (VDU); schnelles Spiel ≈ ⅓, langsames ≈ ½ des Ruhewerts (N = 25) | Patel et al. (1991) [AB]; Cardona et al. (2011) [AB] |
| F76 | Beschwerden bei College-Esportlern [alle] | Augenermüdung 56 %, Nacken/Rücken 42 %, Handgelenk 36 %, Hand 32 %; 3–10 h/Tag; N = 65 | DiFrancisco-Donoghue et al. (2019) [AB] |
| F77 | Physiologischer Tremor: EMG-Gipfel bei Jungen 9–12 Hz, bei einem Teil der Älteren 5–7 Hz; ≈ 8 % Gesunder mit ET-ähnlichem Muster [501, 505, 508 kleine Ziele] | N = 200 | Elble (2003) [AB] |
| F78 | Touchscreen verkleinert den Altersunterschied: Bewegungszeit gegenüber Maus reduziert, weniger Fehler [Tablet-Umsetzung] | −35 % (Ältere), −16 % (Jüngere) | Findlater et al. (2013) [AB] |
| F79 | Tippen mit dem Finger schneller als Maus/Stift, aber ungenauer; Ziehen mit dem Finger langsamer [Tablet-Umsetzung] | – | Cockburn et al. (2012) [KF] |
| F80 | Mindestgröße für Touch-Ziele [Tablet-Umsetzung] | ≈ 9,2 mm | Parhi et al. (2006) [DOC 02] |

### B.9 Sicherheit

| ID | Aussage | Zahl/Wert | Quelle |
|---|---|---|---|
| F81 | Photosensitive Anfälle; am stärksten provozierend 15–25 Hz; Rot als Risikofaktor; Grenzwert ≤ 3 Blitze/s [503, 501/506 roter Blitz] | ≈ 1 : 4.000 bei 5–24-Jährigen | Fisher et al. (2005) [DOC 03]; WCAG 2.2 [DOC 03] |
| F82 | Bewegungskrankheit bei handelsüblichen Konsolenspielen (bis 50 min) – relevant nur bei 3D-Kameradrehung, nicht bei 2D-Übungen [506, falls 3D umgesetzt] | 42–56 % Inzidenz, N = 40 | Stoffregen et al. (2008) [AB] |

### B.10 Videospiel- und Esports-Forschung, Flow

| ID | Aussage | Zahl/Wert | Quelle |
|---|---|---|---|
| F83 | Action-Videospieler vs. Nichtspieler (Querschnitt) und Action-Spieltraining vs. aktive Kontrolle; Publikationsbias im Querschnitt; **motorische Maße ausgeschlossen** (nur 3 Effektstärken) [alle] | g = 0,64 [0,53; 0,74] (105 Studien); g = 0,30 [0,11; 0,50] (28 Studien) | Bediou et al. (2023) [VT] |
| F84 | Frühere Metaanalysen uneinheitlich [alle] | g = 0,34 (Bediou 2018) vs. klein bis null (Sala et al. 2018) | Bediou et al. (2018); Sala et al. (2018) [DOC 01] |
| F85 | 20+ h Action-Spiel verbesserten die meisten kognitiven Aufgaben nicht wesentlich; Unterschiede Experten/Nichtspieler evtl. Selbstselektion [505, 507] | – | Boot et al. (2008) [AB] |
| F86 | Methodische Fallstricke der Videospielforschung (Rekrutierung, Erwartungseffekte) [alle] | – | Boot et al. (2011) [AB] |
| F87 | FPS/MOBA-Spieler im Stroop schneller, aber fehleranfälliger (Tempo vor Genauigkeit) [503, 508] | – | Kowal et al. (2018) [AB] |
| F88 | Esports-Psychologie: bis 2018 viele Positionen, wenige empirische Studien [alle] | Review 1994–2018 | Pedraza-Ramirez et al. (2020) [AB] |
| F89 | Anforderungs-Können-Balance hängt **moderat** mit Flow zusammen [507] | 28 Studien | Fong et al. (2015) [KF] |
| F90 | Flow (adaptive Kopfrechenaufgabe, fMRI): linker IFG und Putamen ↑, medialer PFC und Amygdala ↓ [507] | N = 27 | Ulrich et al. (2014) [AB] |
| F91 | Bildgebende Belege für Hypofrontalität sind uneinheitlich; Aufmerksamkeitsnetzwerke zentral [507] | – | Harris et al. (2017) [AB] |
| F92 | „85-%-Regel“: optimale Fehlerquote beim Lernen (theoretisch, bestimmte Lernalgorithmen) [507, alle adaptiven Übungen] | ≈ 15,87 % Fehler | Wilson et al. (2019) [DOC 01] |

(Fakten gesamt: 92.)

---

## C) Evidenz-Zusammenfassung

### C.1 Was ist belegt, was nicht (über alle acht Übungen)

1. **Mechanik gut verstanden:** Schnelle Zielbewegungen mit der Maus folgen Fitts' Gesetz (F01–F02),
   bestehen aus Primärbewegung + Korrekturen (F03–F04) und unterliegen signalabhängigem Rauschen (F05).
   Die Augen springen zuerst, die Hand folgt ≈ 100 ms später (F14); der Blick bleibt bis zum Abbremsen
   am Ziel (F15). Die Website-Tipps „Blick früher weiter“ (502) und „Augen 30–50 ms vor dem Fadenkreuz“
   (508) widersprechen dem.
2. **Übungseffekt in der Aufgabe: stark belegt** für Aim-Trainer-artige Klickaufgaben (F08, F09, F42;
   großer Längsschnitt N = 7.174). Für einfache Reaktion (503) gibt es vor allem Eingewöhnung, danach
   kaum Veränderung (F55, F56) → **mittel**. Für fortlaufendes Tracking (505, 507) und Rückstoßausgleich
   (504) ist Lernen aus Laborparadigmen (Adaptation, Folgebewegung) gut belegt (F30, F36), die konkreten
   Browser-Übungen sind aber nicht untersucht → **mittel**.
3. **Naher Transfer** (andere, ähnliche Ziel-/Zeigeaufgaben, Spielleistung): nicht direkt untersucht.
   Hinweise: Gain-Lernen verallgemeinert (F39); Empfindlichkeits-Muskelgedächtnis ist nicht „fest
   verdrahtet“ (F40); Kontextinterferenz fördert Transfer nur schwach im angewandten Bereich (F43).
   Eine Studie „Aim-Trainer → bessere Spielleistung“ wurde **nicht gefunden** → **schwach** bis
   **fehlend** (für Spielleistung).
4. **Alltagstransfer: fehlend.** Metaanalysen zu Action-Videospielen (F83–F85) betreffen ganze Spiele und
   kognitive Maße; motorische Maße wurden mangels Studien ausgeschlossen (Bediou et al., 2023). Die
   Website-Behauptungen zu Arbeit/„Deep Work“ (507) sind nicht gedeckt (Sala et al., 2018; Simons et al.,
   2016).
5. **Leistungsstufen/Normen:** In keiner genannten Quelle gibt es FPS-Normwerte. Messwerte hängen stark
   von Gerät, Latenz (23–243 ms real; F47) und Browser ab (F52, F53) → nur Selbstvergleich auf demselben
   Gerät sinnvoll (DOC 01).
6. **Hirnregionen:** Aussagen wie „trainiert den motorischen Kortex“, „kortikostriatale Bahnen eliminieren
   Sakkaden“, „DLPFC wird > 30 s herunterreguliert“ sind **nicht belegt**. Belegbar ist nur, welche
   Netzwerke an der Aufgabe beteiligt sind (F24–F27, F59, F90).

### C.2 Vorschlag für die Evidenzfelder (Autor-Agenten entscheiden je Übung)

| Nr. | uebungseffekt | naher_transfer | alltag_transfer | Begründung (Kern) |
|---|---|---|---|---|
| 501 Flick | stark | schwach | fehlend | F08, F42 (Aim-Lab-/Aim-Trainer-Daten); Transfer ins Spiel nicht untersucht |
| 502 Schwarm | stark | schwach | fehlend | wie 501; sequenzielles Zielen F06 |
| 503 Sofortreaktion | mittel | schwach | fehlend | Eingewöhnung, dann Plateau (F55, F56); Go/No-Go-Anteil F58 |
| 504 Rückstoß | mittel | schwach | fehlend | Adaptation an vorhersagbare Störungen robust (F36), aber übungsspezifisch; keine Studie zu Rückstoß-Drills |
| 505 Strafe | mittel | schwach | fehlend | Tracking-/Folge-Lernen in Laborstudien (DOC 02: schwach–mittel); Latenz-Empfindlichkeit F48 |
| 506 180° | stark (Klick-Zielen) | schwach | fehlend | Gain-Lernen F39/F40; „Raumorientierung“ im 2D-Spiel nicht geübt |
| 507 Flow | mittel | fehlend | fehlend | Tracking-Übungseffekt plausibel; Flow-/Konzentrationstransfer nicht belegt (F89–F91) |
| 508 Zielerfassung | stark | schwach | fehlend | Suchen + Klicken: Suche und Zielen stark übungsabhängig (DOC 03; F42) |

### C.3 Sicherheit / `vorsicht_bei` (Auswahlhinweise, keine medizinische Aussage)

- **photosensitive_epilepsie / migraene_lichtempfindlich:** 503 (Aufblitzen, kurze Anzeigefenster bis
  40 ms, Täuschreize), roter Fehler-Blitz im Code von 501/503/506 → Blitzfrequenz und Fläche gegen WCAG
  (≤ 3/s) prüfen (F81).
- **trockenes_auge_bildschirm / kopfschmerz_asthenopie:** alle; bei schnellen Spielen sinkt der Lidschlag
  auf ≈ ⅓ (F75); Augenermüdung ist die häufigste Beschwerde von Esportlern (56 %, F76).
- **presbyopie_gleitsicht:** alle; Ziele am Bildschirmrand (506, 501, 502) verlangen seitlichen Blick bzw.
  Kopfbewegung; Zwischenbereich einer Gleitsichtbrille bei 60 cm nur 13–18° breit (F72, F73) →
  Arbeitsplatzbrille/Einstärken-Bildschirmbrille oder kleineres Spielfeld; Bildschirmabstand ≥ 50–60 cm
  → 1,67–2 dpt Akkommodationsbedarf (F71, [ER]).
- **farbsehschwaeche:** wo Farbe allein codiert (Cyan-Ziele auf dunklem Grund, grünes „Los“-Signal in 503,
  Kopf/Brust/Bein-Zonen in 504) – Autor prüft Code; 508 nutzt Helligkeit (für Farbsehschwäche günstiger,
  für Kontrastverlust im Alter ungünstiger, F70).
- **hand_arm_beschwerden / tremor_parkinson:** alle Maus-Übungen, besonders 504 (Dauerzug), 505/507
  (Dauer-Tracking), 506 (weite Armzüge); Handgelenk-/Handschmerz 32–36 % bei Esportlern (F76); kleine
  Ziele (501: bis 13 px Radius laut Website) kollidieren mit Tremor (F77).
- **schwindel_vestibulaer / reisekrankheit:** nur relevant, falls eine 3D-Kameradrehung umgesetzt würde
  (F82); die Originale sind laut Code-Stichprobe 2D.
- **aufmerksamkeitsprobleme / kognitive_einschraenkung:** hoher Zeitdruck, Combo-Strafen, Täuschreize (503).
- **sehbehinderung_niedriger_visus:** kleine, schnell verschwindende Ziele (501: bis 380 ms Lebensdauer).
- Stereosehen: am Bildschirm immer **0** (monokulare Tiefenhinweise sind keine Stereopsis; DOC 03).

### C.4 Tablet-/Optiker-Relevanz (ehrlich)

- **Tablet:** Alle acht Originale sind für Maus + Pointer Lock gebaut; auf iPad-Safari gibt es kein
  Pointer Lock (F54). Touch ist direkte Positionssteuerung ohne Empfindlichkeit/CD-Gain → „Flick“,
  „Rückstoß“ und „180°“ verlieren ihren Kern; übrig bleibt Tipp-Zielen (Fitts gilt, F01; Finger schnell,
  aber ungenau, F79; Ziele ≥ 9 mm, F80). Für ältere Menschen ist Touch der Maus sogar überlegen (F78).
  Einstufung für die Originale: `tablet_geeignet: nein` (504, 506), sonst höchstens `mit_anpassung`.
- **Optiker-Nutzen:** Gesprächsanlass zu Bildschirmsehen (Lidschlag, Arbeitsplatzbrille, Abstand,
  Gleitsicht-Zwischenbereich, Kontrast im Alter) – **nicht** als Sehtest oder Sehtraining bewerben.

### C.5 Formulierungshinweise (Website-Übertreibungen, die nicht übernommen werden dürfen)

„Elite/Top-1-%/Radiant-Tabellen“, „genetisch maximale Leitgeschwindigkeit“, „eliminiert Overshooting“,
„verankert im motorischen Kortex“, „unfehlbare Erstschuss-Reflexe“, „signifikant höhere Win-Rates“,
„trainiert Konzentration für die Arbeit“, „Rohdaten ohne Beschleunigung“ (Code widerspricht),
„Stäbchen erkennen bis 180°“.

---

## D) Literaturliste (nur geprüfte Einträge)

### D.1 Von der Website genannt (korrigierte Angaben)

- Dietrich, A. (2004). Neurocognitive mechanisms underlying the experience of flow. *Consciousness and Cognition, 13*(4), 746–761. https://doi.org/10.1016/j.concog.2004.07.002 – Crossref ✓, [AB]
- Donders, F. C. (1969). On the speed of mental processes (W. G. Koster, Übers.). *Acta Psychologica, 30*, 412–431. https://doi.org/10.1016/0001-6918(69)90065-1 (Original 1868) – Crossref ✓, [KF] nur Metadaten
- Elliott, D., Hansen, S., Grierson, L. E. M., Lyons, J., Bennett, S. J., & Hayes, S. J. (2010). Goal-directed aiming: Two components but multiple processes. *Psychological Bulletin, 136*(6), 1023–1044. https://doi.org/10.1037/a0020958 – Crossref ✓ (Website: Autoren falsch), [AB]
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – Crossref ✓, [KF]
- Green, C. S., & Bavelier, D. (2003). Action video game modifies visual selective attention. *Nature, 423*(6939), 534–537. https://doi.org/10.1038/nature01647 – Crossref ✓, [AB]; Aufgaben über Sekundärquellen
- Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology, 4*(1), 11–26. https://doi.org/10.1080/17470215208416600 – Crossref ✓, [DOC 04]
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – Crossref ✓, [AB]
- Land, M. F., & McLeod, P. (2000). From eye movements to actions: How batsmen hit the ball. *Nature Neuroscience, 3*(12), 1340–1345. https://doi.org/10.1038/81887 – Crossref ✓ (Website-DOI 10.1038/81861 falsch), [AB]
- Leigh, R. J., & Zee, D. S. (2015). *The neurology of eye movements* (5. Aufl.). Oxford University Press. https://doi.org/10.1093/med/9780199969289.001.0001 – Crossref ✓ (Website-DOI …9203… falsch), [KF] Buch
- Lisberger, S. G. (2010). Visual guidance of smooth-pursuit eye movements: Sensation, action, and what happens in between. *Neuron, 66*(4), 477–491. https://doi.org/10.1016/j.neuron.2010.03.027 – Crossref ✓, [VT PMC2887486]; **ersetzt** die nicht existierende Website-Angabe („Visual tracking in primates…“, *Curr Opin Neurobiol* 20(4), 405–410; deren DOI 10.1016/j.conb.2010.04.004 gehört zu Semaan & Kauffman, 2010)
- Meyer, D. E., Abrams, R. A., Kornblum, S., Wright, C. E., & Smith, J. E. K. (1988). Optimality in human motor performance: Ideal control of rapid aimed movements. *Psychological Review, 95*(3), 340–370. https://doi.org/10.1037/0033-295X.95.3.340 – Crossref ✓, [KF]
- Posner, M. I., & Petersen, S. E. (1990). The attention system of the human brain. *Annual Review of Neuroscience, 13*, 25–42. https://doi.org/10.1146/annurev.ne.13.030190.000325 – Crossref ✓, [KF]
- Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 – Crossref ✓ (Website-Titel „smooth pursuit“ leicht falsch), [KF] Scan; Inhalt über Lisberger (2010)
- Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin, 124*(3), 372–422. https://doi.org/10.1037/0033-2909.124.3.372 – Crossref ✓, [AB]
- Schmidt, R. A., & Lee, T. D. (2011). *Motor control and learning: A behavioral emphasis* (5. Aufl.). Human Kinetics. ISBN 978-0-7360-7961-7 – Buch, keine DOI; über OpenLibrary verifiziert
- Schmidt, R. A., Zelaznik, H., Hawkins, B., Frank, J. S., & Quinn, J. T. (1979). Motor-output variability: A theory for the accuracy of rapid motor acts. *Psychological Review, 86*(5), 415–451. https://doi.org/10.1037/0033-295X.86.5.415 – Crossref ✓, [KF]
- Treisman, A. M., & Gelade, G. (1980). A feature-integration theory of attention. *Cognitive Psychology, 12*(1), 97–136. https://doi.org/10.1016/0010-0285(80)90005-5 – Crossref ✓, [DOC 03]
- Wolfe, J. M. (2007). Guided Search 4.0: Current progress with a model of visual search. In W. D. Gray (Hrsg.), *Integrated models of cognitive systems* (S. 99–119). Oxford University Press. https://doi.org/10.1093/acprof:oso/9780195189193.003.0008 – Crossref ✓, [KF]
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – Crossref ✓, [AB]
- Woodworth, R. S. (1899). The accuracy of voluntary movement. *The Psychological Review: Monograph Supplements, 3*(3), i–114. https://doi.org/10.1037/h0092992 – Crossref ✓, [KF] über Elliott et al. (2001)
- Im Text genannt: Csikszentmihalyi, M. (1990). *Flow: The psychology of optimal experience*. Harper & Row. ISBN 0-06-016253-8 – Buch, keine DOI; über OpenLibrary verifiziert (Inhalt nicht eingesehen) · Wolfe, J. M. (1994). Guided Search 2.0: A revised model of visual search. *Psychonomic Bulletin & Review, 1*(2), 202–238. https://doi.org/10.3758/BF03200774 – Crossref ✓, [DOC 03]

### D.2 Weitere Fachliteratur

**Zielbewegungen, Blick–Hand, Speed-Accuracy**
- Card, S. K., English, W. K., & Burr, B. J. (1978). Evaluation of mouse, rate-controlled isometric joystick, step keys, and text keys for text selection on a CRT. *Ergonomics, 21*(8), 601–613. https://doi.org/10.1080/00140137808931762 – Crossref ✓; Durchsatzwert über Soukoreff & MacKenzie (2004)
- Darrien, J. H., Herd, K., Starling, L.-J., Rosenberg, J. R., & Morrison, J. D. (2001). An analysis of the dependence of saccadic latency on target position and target characteristics in human subjects. *BMC Neuroscience, 2*, 13. https://doi.org/10.1186/1471-2202-2-13 – Crossref ✓, [VT PMC59638]
- Donovan, I., Saul, M. A., DeSimone, K., Listman, J. B., Mackey, W. E., & Heeger, D. J. (2022). Assessment of human expertise and movement kinematics in first-person shooter games. *Frontiers in Human Neuroscience, 16*, 979293. https://doi.org/10.3389/fnhum.2022.979293 – Crossref ✓, [AB]; Interessenkonflikt: Mitautor:innen bei Statespace (Aim Lab)
- Elliott, D., Hansen, S., Mendoza, J., & Tremblay, L. (2004). Learning to optimize speed, accuracy, and energy expenditure: A framework for understanding speed-accuracy relations in goal-directed aiming. *Journal of Motor Behavior, 36*(3), 339–351. https://doi.org/10.3200/JMBR.36.3.339-351 – Crossref ✓, [AB]
- Elliott, D., Helsen, W. F., & Chua, R. (2001). A century later: Woodworth's (1899) two-component model of goal-directed aiming. *Psychological Bulletin, 127*(3), 342–357. https://doi.org/10.1037/0033-2909.127.3.342 – Crossref ✓, [AB]
- Fischer, B., & Ramsperger, E. (1984). Human express saccades: Extremely short reaction times of goal directed eye movements. *Experimental Brain Research, 57*(1), 191–195. https://doi.org/10.1007/BF00231145 – Crossref ✓, [AB]
- Freedman, E. G. (2008). Coordination of the eyes and head during visual orienting. *Experimental Brain Research, 190*(4), 369–387. https://doi.org/10.1007/s00221-008-1504-8 – Crossref ✓, [AB]
- Harris, C. M., & Wolpert, D. M. (1998). Signal-dependent noise determines motor planning. *Nature, 394*(6695), 780–784. https://doi.org/10.1038/29528 – Crossref ✓, [AB]
- Heitz, R. P. (2014). The speed-accuracy tradeoff: History, physiology, methodology, and behavior. *Frontiers in Neuroscience, 8*, 150. https://doi.org/10.3389/fnins.2014.00150 – Crossref ✓, [AB]
- Helsen, W. F., Adam, J. J., Elliott, D., & Buekers, M. J. (2001). The one-target advantage: A test of the movement integration hypothesis. *Human Movement Science, 20*(4–5), 643–674. https://doi.org/10.1016/S0167-9457(01)00071-9 – Crossref ✓, [AB]
- Helsen, W. F., Elliott, D., Starkes, J. L., & Ricker, K. L. (1998). Temporal and spatial coupling of point of gaze and hand movements in aiming. *Journal of Motor Behavior, 30*(3), 249–259. https://doi.org/10.1080/00222899809601340 – Crossref ✓, [AB]
- Ketcham, C. J., Seidler, R. D., Van Gemmert, A. W. A., & Stelmach, G. E. (2002). Age-related kinematic differences as influenced by task difficulty, target size, and movement amplitude. *The Journals of Gerontology: Series B, 57*(1), P54–P64. https://doi.org/10.1093/geronb/57.1.P54 – Crossref ✓, [AB]
- Lebeau, J.-C., Liu, S., Sáenz-Moncaleano, C., Sanduvete-Chaves, S., Chacón-Moscoso, S., Becker, B. J., & Tenenbaum, G. (2016). Quiet eye and performance in sport: A meta-analysis. *Journal of Sport and Exercise Psychology, 38*(5), 441–457. https://doi.org/10.1123/jsep.2015-0123 – Crossref ✓, [AB]
- Mann, D. T. Y., Williams, A. M., Ward, P., & Janelle, C. M. (2007). Perceptual-cognitive expertise in sport: A meta-analysis. *Journal of Sport and Exercise Psychology, 29*(4), 457–478. https://doi.org/10.1123/jsep.29.4.457 – Crossref ✓, [AB]
- Munoz, D. P., Broughton, J. R., Goldring, J. E., & Armstrong, I. T. (1998). Age-related performance of human subjects on saccadic eye movement tasks. *Experimental Brain Research, 121*(4), 391–400. https://doi.org/10.1007/s002210050473 – Crossref ✓, [AB]
- Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. *Journal of Neurophysiology, 83*(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639 – Crossref ✓, [AB]
- Prablanc, C., Echallier, J. F., Komilis, E., & Jeannerod, M. (1979). Optimal response of eye and hand motor systems in pointing at a visual target. I. *Biological Cybernetics, 35*(2), 113–124. https://doi.org/10.1007/BF00337436 – Crossref ✓, [AB]
- Soukoreff, R. W., & MacKenzie, I. S. (2004). Towards a standard for pointing device evaluation, perspectives on 27 years of Fitts' law research in HCI. *International Journal of Human-Computer Studies, 61*(6), 751–789. https://doi.org/10.1016/j.ijhcs.2004.09.001 – Crossref ✓, [VT yorku.ca]
- Warburton, M., Campagnoli, C., Mon-Williams, M., Mushtaq, F., & Morehead, J. R. (2023). Kinematic markers of skill in first-person shooter video games. *PNAS Nexus, 2*(8), pgad249. https://doi.org/10.1093/pnasnexus/pgad249 – Crossref ✓, [AB + Ergebnisauszug Verlagsseite]
- Yantis, S., & Jonides, J. (1984). Abrupt visual onsets and selective attention: Evidence from visual search. *Journal of Experimental Psychology: Human Perception and Performance, 10*(5), 601–621. https://doi.org/10.1037/0096-1523.10.5.601 – Crossref ✓, [AB]

**Folgebewegung, manuelles Tracking**
- Bahill, A. T., & McDonald, J. D. (1983). Smooth pursuit eye movements in response to predictable target motions. *Vision Research, 23*(12), 1573–1583. https://doi.org/10.1016/0042-6989(83)90171-2 – Crossref ✓, [DOC 02]
- Barnes, G. R. (2008). Cognitive processes involved in smooth pursuit eye movements. *Brain and Cognition, 68*(3), 309–326. https://doi.org/10.1016/j.bandc.2008.08.020 – Crossref ✓, [AB]
- Brenner, E., Bom, S., & Smeets, J. B. J. (2026). Intercepting moving targets: Does the visuomotor latency depend on whether one taps on the target or slides through it? *Experimental Brain Research, 244*(4), 70. https://doi.org/10.1007/s00221-026-07264-3 – Crossref ✓, [DOC 02]
- Brenner, E., & Smeets, J. B. J. (1997). Fast responses of the human hand to changes in target position. *Journal of Motor Behavior, 29*(4), 297–310. https://doi.org/10.1080/00222899709600017 – Crossref ✓, [AB]
- Brenner, E., Smeets, J. B. J., & de Lussanet, M. H. E. (1998). Hitting moving targets: Continuous control of the acceleration of the hand on the basis of the target's velocity. *Experimental Brain Research, 122*(4), 467–474. https://doi.org/10.1007/s002210050535 – Crossref ✓, [DOC 02]
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Crossref ✓, [DOC 02]
- Danion, F. R., & Flanagan, J. R. (2018). Different gaze strategies during eye versus hand tracking of a moving target. *Scientific Reports, 8*, 10059. https://doi.org/10.1038/s41598-018-28434-6 – Crossref ✓, [AB]
- Koken, P. W., & Erkelens, C. J. (1992). Influences of hand movements on eye movements in tracking tasks in man. *Experimental Brain Research, 88*(3), 657–664. https://doi.org/10.1007/BF00228195 – Crossref ✓, [AB]
- Kowler, E., Rubinstein, J. F., Santos, E. M., & Wang, J. (2019). Predictive smooth pursuit eye movements. *Annual Review of Vision Science, 5*, 223–246. https://doi.org/10.1146/annurev-vision-091718-014901 – Crossref ✓, [DOC 02]
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – Crossref ✓, [DOC 02]
- Saunders, J. A., & Knill, D. C. (2003). Humans use continuous visual feedback from the hand to control fast reaching movements. *Experimental Brain Research, 152*(3), 341–352. https://doi.org/10.1007/s00221-003-1525-2 – Crossref ✓, [AB]
- Schmolesky, M. T., Wang, Y., Hanes, D. P., Thompson, K. G., Leutgeb, S., Schall, J. D., & Leventhal, A. G. (1998). Signal timing across the macaque visual system. *Journal of Neurophysiology, 79*(6), 3272–3278. https://doi.org/10.1152/jn.1998.79.6.3272 – Crossref ✓, [AB]

**Motorisches Lernen, interne Modelle, Empfindlichkeit**
- Boudaoud, B., Spjut, J., & Kim, J. (2022). Mouse sensitivity in first-person targeting tasks. In *2022 IEEE Conference on Games (CoG)* (S. 183–190). https://doi.org/10.1109/CoG51982.2022.9893626 – Crossref ✓, [VT ieee-cog.org]
- Boudaoud, B., Spjut, J., & Kim, J. (2023). Mouse sensitivity in first-person targeting tasks. *IEEE Transactions on Games, 15*(4), 493–506. https://doi.org/10.1109/TG.2023.3293692 – Crossref ✓, [AB]
- Brady, F. (2004). Contextual interference: A meta-analytic study. *Perceptual and Motor Skills, 99*(1), 116–126. https://doi.org/10.2466/pms.99.1.116-126 – Crossref ✓, [AB]
- Burdet, E., Osu, R., Franklin, D. W., Milner, T. E., & Kawato, M. (2001). The central nervous system stabilizes unstable dynamics by learning optimal impedance. *Nature, 414*(6862), 446–449. https://doi.org/10.1038/35106566 – Crossref ✓, [AB]
- Casiez, G., Vogel, D., Balakrishnan, R., & Cockburn, A. (2008). The impact of control-display gain on user performance in pointing tasks. *Human–Computer Interaction, 23*(3), 215–250. https://doi.org/10.1080/07370020802278163 – Crossref ✓, [KF]
- Franklin, D. W., & Wolpert, D. M. (2011). Computational mechanisms of sensorimotor control. *Neuron, 72*(3), 425–442. https://doi.org/10.1016/j.neuron.2011.10.006 – Crossref ✓, [AB]
- Krakauer, J. W., Hadjiosif, A. M., Xu, J., Wong, A. L., & Haith, A. M. (2019). Motor learning. *Comprehensive Physiology, 9*(2), 613–663. https://doi.org/10.1002/cphy.c170043 – Crossref ✓, [AB]
- Krakauer, J. W., Pine, Z. M., Ghilardi, M.-F., & Ghez, C. (2000). Learning of visuomotor transformations for vectorial planning of reaching trajectories. *The Journal of Neuroscience, 20*(23), 8916–8924. https://doi.org/10.1523/JNEUROSCI.20-23-08916.2000 – Crossref ✓, [AB]
- Listman, J. B., Tsay, J. S., Kim, H. E., Mackey, W. E., & Heeger, D. J. (2021). Long-term motor learning in the "wild" with high volume video game data. *Frontiers in Human Neuroscience, 15*, 777779. https://doi.org/10.3389/fnhum.2021.777779 – Crossref ✓, [AB]; von Statespace (Aim Lab) finanziert
- Schmidt, R. A. (1975). A schema theory of discrete motor skill learning. *Psychological Review, 82*(4), 225–260. https://doi.org/10.1037/h0076770 – Crossref ✓, [KF]
- Shadmehr, R., & Mussa-Ivaldi, F. A. (1994). Adaptive representation of dynamics during learning of a motor task. *The Journal of Neuroscience, 14*(5), 3208–3224. https://doi.org/10.1523/JNEUROSCI.14-05-03208.1994 – Crossref ✓, [AB]
- Shadmehr, R., Smith, M. A., & Krakauer, J. W. (2010). Error correction, sensory prediction, and adaptation in motor control. *Annual Review of Neuroscience, 33*, 89–108. https://doi.org/10.1146/annurev-neuro-060909-153135 – Crossref ✓, [AB]
- Wolpert, D. M., Ghahramani, Z., & Jordan, M. I. (1995). An internal model for sensorimotor integration. *Science, 269*(5232), 1880–1882. https://doi.org/10.1126/science.7569931 – Crossref ✓, [AB]

**Latenz, Bildrate, Eingabegeräte, Web-Technik**
- Cockburn, A., Ahlström, D., & Gutwin, C. (2012). Understanding performance in touch selections: Tap, drag and radial pointing drag with finger, stylus and mouse. *International Journal of Human-Computer Studies, 70*(3), 218–233. https://doi.org/10.1016/j.ijhcs.2011.11.002 – Crossref ✓, [KF]
- Deber, J., Jota, R., Forlines, C., & Wigdor, D. (2015). How much faster is fast enough? User perception of latency & latency improvements in direct and indirect touch. In *Proceedings of CHI '15* (S. 1827–1836). ACM. https://doi.org/10.1145/2702123.2702300 – Crossref ✓, [DOC 02]
- Findlater, L., Froehlich, J. E., Fattal, K., Wobbrock, J. O., & Dastyar, T. (2013). Age-related differences in performance with touchscreens compared to traditional mouse input. In *Proceedings of CHI '13* (S. 343–346). ACM. https://doi.org/10.1145/2470654.2470703 – Crossref ✓, [AB]
- Ivkovic, Z. (2017). *Characterizing the effects of local latency on aim performance in first person shooters* [Masterarbeit, University of Saskatchewan]. https://harvest.usask.ca/bitstream/10388/7707/1/IVKOVIC-THESIS-2017.pdf – keine DOI; [VT]
- Ivkovic, Z., Stavness, I., Gutwin, C., & Sutcliffe, S. (2015). Quantifying and mitigating the negative effects of local latencies on aiming in 3D shooter games. In *Proceedings of CHI '15* (S. 135–144). ACM. https://doi.org/10.1145/2702123.2702432 – Crossref ✓, [KF; Zahlen über Ivkovic 2017]
- Liu, S., Claypool, M., Kuwahara, A., Sherman, J., & Scovell, J. J. (2021). Lower is better? The effects of local latencies on competitive first-person shooter game players. In *Proceedings of CHI '21* (S. 1–12). ACM. https://doi.org/10.1145/3411764.3445245 – Crossref ✓, [AB]
- MDN Web Docs. (o. J.-a). *Element: requestPointerLock() method* (inkl. Browser-Kompatibilitätsdaten, github.com/mdn/browser-compat-data, `api/Element.json`). Abgerufen am 29.09.2026 von https://developer.mozilla.org/en-US/docs/Web/API/Element/requestPointerLock – [VT]
- MDN Web Docs. (o. J.-b). *Performance: now() method*. Abgerufen am 29.09.2026 von https://developer.mozilla.org/en-US/docs/Web/API/Performance/now – [VT]
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of MobileHCI '06* (S. 203–210). ACM. https://doi.org/10.1145/1152215.1152260 – Crossref ✓, [DOC 02]
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Crossref ✓, [DOC 01]
- Spjut, J., Boudaoud, B., Binaee, K., Kim, J., Majercik, A., McGuire, M., Luebke, D., & Kim, J. (2019). Latency of 30 ms benefits first person targeting tasks more than refresh rate above 60 Hz. In *SIGGRAPH Asia 2019 Technical Briefs* (S. 110–113). ACM. https://doi.org/10.1145/3355088.3365170 – Crossref ✓, [AB]

**Reaktion, Aufmerksamkeit, Suche, Zustand**
- Basner, M., Hermosillo, E., Nasrini, J., McGuire, S., Saxena, S., Moore, T. M., Gur, R. C., & Dinges, D. F. (2018). Repeated administration effects on Psychomotor Vigilance Test performance. *Sleep, 41*(1), zsx187. https://doi.org/10.1093/sleep/zsx187 – Crossref ✓, [DOC 01]
- Duncan, J., & Humphreys, G. W. (1989). Visual search and stimulus similarity. *Psychological Review, 96*(3), 433–458. https://doi.org/10.1037/0033-295X.96.3.433 – Crossref ✓, [KF]
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Crossref ✓, [DOC 01]
- Lim, J., & Dinges, D. F. (2010). A meta-analysis of the impact of short-term sleep deprivation on cognitive variables. *Psychological Bulletin, 136*(3), 375–389. https://doi.org/10.1037/a0018883 – Crossref ✓, [AB]
- McLellan, T. M., Caldwell, J. A., & Lieberman, H. R. (2016). A review of caffeine's effects on cognitive, physical and occupational performance. *Neuroscience & Biobehavioral Reviews, 71*, 294–312. https://doi.org/10.1016/j.neubiorev.2016.09.001 – Crossref ✓, [AB]
- Proctor, R. W., & Schneider, D. W. (2018). Hick's law for choice reaction time: A review. *Quarterly Journal of Experimental Psychology, 71*(6), 1281–1299. https://doi.org/10.1080/17470218.2017.1322622 – Crossref ✓, [DOC 04]
- Warm, J. S., Parasuraman, R., & Matthews, G. (2008). Vigilance requires hard mental work and is stressful. *Human Factors, 50*(3), 433–441. https://doi.org/10.1518/001872008X312152 – Crossref ✓, [AB]
- Wessel, J. R. (2018). Prepotent motor activity and inhibitory control demands in different variants of the go/no-go paradigm. *Psychophysiology, 55*(3), e12871. https://doi.org/10.1111/psyp.12871 – Crossref ✓, [DOC 01]
- Wolfe, J. M., & Horowitz, T. S. (2017). Five factors that guide attention in visual search. *Nature Human Behaviour, 1*, 0058. https://doi.org/10.1038/s41562-017-0058 – Crossref ✓, [VT Autorenseite; DOC 03]

**Optik, Auge, Optiker-Bezug, Gesundheit**
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Crossref ✓, [AB]
- Cardona, G., García, C., Serés, C., Vilaseca, M., & Gispets, J. (2011). Blink rate, blink amplitude, and tear film integrity during dynamic visual display terminal tasks. *Current Eye Research, 36*(3), 190–197. https://doi.org/10.3109/02713683.2010.544442 – Crossref ✓, [AB]
- Charman, W. N. (2008). The eye in focus: Accommodation and presbyopia. *Clinical and Experimental Optometry, 91*(3), 207–225. https://doi.org/10.1111/j.1444-0938.2008.00256.x – Crossref ✓, [AB]
- Curcio, C. A., Sloan, K. R., Kalina, R. E., & Hendrickson, A. E. (1990). Human photoreceptor topography. *Journal of Comparative Neurology, 292*(4), 497–523. https://doi.org/10.1002/cne.902920402 – Crossref ✓, [AB]
- DiFrancisco-Donoghue, J., Balentine, J., Schmidt, G., & Zwibel, H. (2019). Managing the health of the eSport athlete: An integrated health management model. *BMJ Open Sport & Exercise Medicine, 5*(1), e000467. https://doi.org/10.1136/bmjsem-2018-000467 – Crossref ✓, [AB]
- Elble, R. J. (2003). Characteristics of physiologic tremor in young and elderly adults. *Clinical Neurophysiology, 114*(4), 624–635. https://doi.org/10.1016/S1388-2457(03)00006-3 – Crossref ✓, [AB]
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Crossref ✓, [DOC 03]
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Crossref ✓, [AB]
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., & Wells, K. A. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Crossref ✓, [AB] (Erratum: Lillakas, L. als Mitautorin ergänzt)
- Owsley, C., Sekuler, R., & Siemsen, D. (1983). Contrast sensitivity throughout adulthood. *Vision Research, 23*(7), 689–699. https://doi.org/10.1016/0042-6989(83)90210-9 – Crossref ✓, [AB]
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Crossref ✓, [AB]
- Sheppard, A. L., & Wolffsohn, J. S. (2018). Digital eye strain: Prevalence, measurement and amelioration. *BMJ Open Ophthalmology, 3*(1), e000146. https://doi.org/10.1136/bmjophth-2018-000146 – Crossref ✓, [AB]
- Stoffregen, T. A., Faugloire, E., Yoshida, K., Flanagan, M. B., & Merhi, O. (2008). Motion sickness and postural sway in console video games. *Human Factors, 50*(2), 322–331. https://doi.org/10.1518/001872008X250755 – Crossref ✓, [AB]
- Strasburger, H., Rentschler, I., & Jüttner, M. (2011). Peripheral vision and pattern recognition: A review. *Journal of Vision, 11*(5), 13. https://doi.org/10.1167/11.5.13 – Crossref ✓, [DOC 01]

**Videospiele, Esports, Flow, Transfer**
- Bediou, B., Adams, D. M., Mayer, R. E., Tipton, E., Green, C. S., & Bavelier, D. (2018). Meta-analysis of action video game impact on perceptual, attentional, and cognitive skills. *Psychological Bulletin, 144*(1), 77–110. https://doi.org/10.1037/bul0000130 – Crossref ✓, [DOC 01]
- Bediou, B., Rodgers, M. A., Tipton, E., Mayer, R. E., Green, C. S., & Bavelier, D. (2023). Effects of action video game play on cognitive skills: A meta-analysis. *Technology, Mind, and Behavior, 4*(1), 28–48. https://doi.org/10.1037/tmb0000102 – Crossref ✓, [VT Autorenmanuskript, archive-ouverte.unige.ch/unige:168346]
- Boot, W. R., Blakely, D. P., & Simons, D. J. (2011). Do action video games improve perception and cognition? *Frontiers in Psychology, 2*, 226. https://doi.org/10.3389/fpsyg.2011.00226 – Crossref ✓, [AB]
- Boot, W. R., Kramer, A. F., Simons, D. J., Fabiani, M., & Gratton, G. (2008). The effects of video game playing on attention, memory, and executive control. *Acta Psychologica, 129*(3), 387–398. https://doi.org/10.1016/j.actpsy.2008.09.005 – Crossref ✓, [AB]
- Fong, C. J., Zaleski, D. J., & Leach, J. K. (2015). The challenge–skill balance and antecedents of flow: A meta-analytic investigation. *The Journal of Positive Psychology, 10*(5), 425–446. https://doi.org/10.1080/17439760.2014.967799 – Crossref ✓, [KF, Abstract-Auszug]
- Harris, D. J., Vine, S. J., & Wilson, M. R. (2017). Neurocognitive mechanisms of the flow state. *Progress in Brain Research, 234*, 221–243. https://doi.org/10.1016/bs.pbr.2017.06.012 – Crossref ✓, [AB]
- Kowal, M., Toth, A. J., Exton, C., & Campbell, M. J. (2018). Different cognitive abilities displayed by action video gamers and non-gamers. *Computers in Human Behavior, 88*, 255–262. https://doi.org/10.1016/j.chb.2018.07.010 – Crossref ✓, [AB]
- Park, E., Lee, S., Ham, A., Choi, M., Kim, S., & Lee, B. (2021). Secrets of Gosu: Understanding physical combat skills of professional players in first-person shooters. In *Proceedings of CHI '21* (S. 1–14). ACM. https://doi.org/10.1145/3411764.3445217 – Crossref ✓, [AB]
- Pedraza-Ramirez, I., Musculus, L., Raab, M., & Laborde, S. (2020). Setting the scientific stage for esports psychology: A systematic review. *International Review of Sport and Exercise Psychology, 13*(1), 319–352. https://doi.org/10.1080/1750984X.2020.1723122 – Crossref ✓, [AB]
- Sala, G., Tatlidil, K. S., & Gobet, F. (2018). Video game training does not enhance cognitive ability: A comprehensive meta-analytic investigation. *Psychological Bulletin, 144*(2), 111–139. https://doi.org/10.1037/bul0000139 – Crossref ✓, [DOC 01]
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Crossref ✓, [DOC 01]
- Toth, A. J., Hojaji, F., & Campbell, M. J. (2023). Exploring the mechanisms of target acquisition performance in esports: The role of component kinematic phases on a first person shooter motor skill. *Computers in Human Behavior, 139*, 107554. https://doi.org/10.1016/j.chb.2022.107554 – Crossref ✓, [KF, Abstract-Auszug Universität Limerick]
- Ulrich, M., Keller, J., Hoenig, K., Waller, C., & Grön, G. (2014). Neural correlates of experimentally induced flow experiences. *NeuroImage, 86*, 194–202. https://doi.org/10.1016/j.neuroimage.2013.08.019 – Crossref ✓, [AB]
- Wilson, R. C., Shenhav, A., Straccia, M., & Cohen, J. D. (2019). The Eighty Five Percent Rule for optimal learning. *Nature Communications, 10*, 4646. https://doi.org/10.1038/s41467-019-12552-4 – Crossref ✓, [DOC 01]

**Zählung:** 20 Website-Werke (+ 2 im Text genannte) und 88 weitere geprüfte Einträge (davon 2 ohne DOI:
Ivkovic 2017, MDN ×2 als Webquellen; Bücher Schmidt & Lee 2011, Csikszentmihalyi 1990 bei D.1).

### D.3 Grenzen dieser Prüfung

- Nicht im Volltext geprüft: klassische Arbeiten ohne Abstract in PubMed (Fitts 1954, Schmidt et al.
  1979, Meyer et al. 1988, Posner & Petersen 1990, Donders 1969, Woodworth 1899) – Kernaussagen hier nur
  auf Standardniveau verwendet; keine Detailzahlen daraus übernehmen.
- Ivkovic et al. (2015): Zahlen stammen aus der Masterarbeit desselben Erstautors (2017), die die Studie
  enthält; im CHI-Paper können Werte leicht abweichen.
- Aim-Lab-Studien (Listman 2021, Donovan 2022) sind vom Hersteller mitfinanziert bzw. mit Mitarbeitenden
  verfasst.
- Keine Studie gefunden, die den Transfer eines Browser-/Aim-Trainers auf die Spielleistung oder den
  Alltag kontrolliert prüft (Suche Crossref/Websuche, 29.09.2026).
- Code-Aussagen sind Stichproben (501, 503, 506); die Autor-Agenten analysieren den Code ihrer Übung
  selbst.
