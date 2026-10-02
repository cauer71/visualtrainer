# Literaturbasis W13 – Fixationswechsel zwischen vier Zielen (Katalog 905)

Stand: 02.10.2026 · Gruppe W13 · Grundlage für den Katalogeintrag 905 „4-Ziele-Wechsel“ und das Dokument
`docs/wissenschaft/06-fixationswechsel.md`. Die Übung ist eine eigene Blickfit-Übung nach der **Beschreibung des Auftraggebers
(Optiker) einer „4-Ziele-Fixationswechsel“-App** – **keine Website, keine URL, kein Video, kein Spielcode**.

**So ist diese Datei zu lesen**

- Jede DOI in diesem Dokument wurde am 02.10.2026 über `api.crossref.org` aufgelöst und mit Titel, Autor:innen, Jahr, Zeitschrift,
  Band und Seiten verglichen. Abweichungen sind vermerkt.
- **Prüfgrad des Inhalts** (in Klammern hinter jeder Aussage):
  - **[A]** Abstract gelesen (PubMed/NCBI, am 02.10.2026)
  - **[A-W]** Abstract nur über die Verlags- oder Hochschulseite bzw. Websuche gelesen (nicht in PubMed) – ausdrücklich vermerkt
  - **[V]** Volltext bzw. die zitierte Passage selbst gelesen (z. B. PMC-Ergebnisteil oder Tabellen als PMC-XML)
  - **[W02] [W03] [W04] [W09] [W12] [D01]–[D04]** Inhalt aus der genannten Literaturbasis bzw. dem Dokument übernommen (dort geprüft);
    DOI hier erneut per Crossref bestätigt
  - **[S]** nur über Sekundärquelle belegt – **als unsicher behandeln**
  - **[M]** nur Metadaten geprüft, Inhalt ist Standardwissen und wird nur allgemein zitiert
  - **[H]** eigene Herleitung (Rechnung), keine Studienaussage; die Annahmen stehen jeweils dabei
- **Keine Leistungsnormen:** Keine der Quellen enthält Normwerte für diese Übung; es werden keine abgeleitet.
- **Zahlen der Übung sind grob.** Die Spezifikation (Runde 5) kann sich noch ändern; die Herleitungen in B.9 sind mit den Annahmen
  aufgeschrieben, damit sie sich nachrechnen lassen.

---

## A) Quellenlage des Originals: Beschreibung des Auftraggebers (statt Website-Prüftabelle)

### A.0 Was vorliegt

- **Eine Beschreibung des Auftraggebers** (Optiker) von einer „4-Ziele-Fixationswechsel“-App: schneller, gezielter Wechsel der visuellen
  Aufmerksamkeit und der Fixation zwischen vier deutlich getrennten Positionen; Person sitzt mittig vor ruhig aufgestelltem Bildschirm,
  Kopf möglichst ruhig. Die Messgröße nennt der Auftraggeber **„visuo-motorische Reaktionszeit“**.
- **Nicht vorhanden:** Name und Hersteller der App, Website, URL, Video, Spielcode, Regeltafel, Normtabellen, Wirkversprechen.
  Es gibt deshalb keine Website-Prüftabelle; Teil A ersetzt sie durch eine Übersicht, was beschrieben wurde und was als Annahme gilt.
- **Praxisperspektive des Auftraggebers, nicht geprüft:** Der Auftraggeber verweist auf die Praxis-Perspektive von **Bruce Muchnick**
  und **John Mountford** (Vision-Therapy-Praktiker). **Beide werden hier nicht als Quelle verwendet.** Die Websuche (02.10.2026) fand
  **keine konkrete Publikation** zu einem 4-Ziele-Fixationswechsel; zu Muchnick fand sich nur ein Lehrbuch gleichen Autorennamens
  („Clinical Medicine in Optometric Practice“, nicht zum Thema, Zusammenhang nicht geprüft), zu Mountford nichts Einschlägiges.
  Es wird deshalb nur gesagt: *Praxisperspektive des Auftraggebers, nicht geprüft.*

### A.1 Was beschrieben ist (Stand der Spezifikation Runde 5; Zahlen grob)

| Merkmal | Angabe | Sicherheit |
|---|---|---|
| Aufbau | sehr schlicht; vier Ziele in den Ecken (oben links, oben rechts, unten links, unten rechts), so weit wie möglich auseinander; in jedem Ziel ein gut erkennbares Zeichen | Beschreibung des Auftraggebers |
| Aktives Ziel | immer nur eines der vier ist markiert (Ring um das Zeichen, nicht nur Farbe; weiches Einblenden ≥ 100 ms, kein Blinken) | Spezifikation |
| Ablauf | Startphase mit allen vier Zeichen; Ziel erscheint → Person sucht, fixiert, erkennt das Zeichen → tippt das aktive Ziel → kurze Pause 300–800 ms (Stufe 1 ca. 1 s) → neues zufälliges Ziel; nie dasselbe Ziel zweimal hintereinander; alle 12 gerichteten Wechsel etwa gleich oft | Beschreibung/Spezifikation |
| Fehler | falsches Ziel wird als Fehler gezählt, das richtige bleibt aktiv; Auslassung = kein Tippen in 5–6 s (Zeit geht nicht in den Mittelwert) | Spezifikation |
| Zeichen | anfangs A B C D oder 1 2 3 4, später ähnlicher (B D P R; 6 8 9 5), später kleine Symbole | Beschreibung des Auftraggebers |
| Stufen | je Schritt nur ein Parameter (Größe → Abstand/Rand → Pause 1.200 → 600 ms → ähnliche Zeichen → Symbole → Ablenker), ca. 12 Schritte | Spezifikation (grob) |
| Anpassung | je Segment von ca. 12 Zielen: ≥ 90 % richtig → schwerer, 75–89 % gleich, < 75 % leichter | Spezifikation |
| Dauer | 3 Blöcke à 60 s mit Pause ≥ 5 s; erste vs. letzte Hälfte als Verlaufshinweis | Spezifikation |
| Auswertung | Treffer/N, Fehler, Auslassungen, mittlere Reaktionszeit Ziel → Touch, erste vs. letzte Hälfte, Richtungsklassen → ← ↓ ↑ ↘ ↖ ↗ ↙ (ab ≥ 3 richtigen je Klasse) | Spezifikation |
| Eingabe | Touch (Kernmodus); „Schauen“ (kein Tippen, Zeichen aussprechen) nur als Erweiterung | Spezifikation |
| **Nicht** beschrieben | Eye-Tracking (der Blick wird **nicht** gemessen), Normwerte, Vergleiche mit anderen, Wirkversprechen | – |

**Welche Teile aus der ursprünglichen App stammen und welche erst für Blickfit festgelegt wurden, ist nicht überliefert.** Der Katalogeintrag
beschreibt deshalb den Stand der Blickfit-Spezifikation und kennzeichnet sie so.

### A.2 Zusammenfassung der Prüfung der Quellenlage

- Es gibt keine prüfbare Originalquelle; **alle wissenschaftlichen Aussagen stammen aus der unabhängig recherchierten Literatur** (Teil B, D).
- Die Praxisperspektive (Muchnick, Mountford) ist **nicht geprüft** und wird nicht zitiert.
- Wichtigster Befund der Einordnung: Die Messgröße „Reaktionszeit Ziel → Touch“ ist **kein Sakkadenmaß** (B.4, B.9); die Aufgabe verlangt
  Sakkaden, misst sie aber nicht. Blickfit zeigt deshalb nur „Reaktionszeit Ziel → Touch“, nie „Sakkadenlatenz“.

---

## B) Faktenliste „Aussage – Zahl – Quelle“

Vollständige Angaben in Teil D.

### B.1 Sakkaden: Latenz, Amplitude, Richtung

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F01 | Sakkadenlatenz hängt vom zeitlichen Verhältnis von Fixationsende und Zielbeginn ab: gleichzeitig ≈ 200 ms; Lücke ≥ 200 ms ≈ 150 ms; Fixationsreiz endet ≥ 100 ms nach Zielbeginn ≈ 250 ms | ≈ 200 / 150 / 250 ms | Saslow, 1967 [A-W, Verlagsseite] |
| F02 | Mit Lücke (Fixationspunkt ca. 200 ms vor dem Ziel aus) ist die Latenzverteilung zweigipflig: Express-Sakkaden um 100 ms, reguläre um 150 ms | ≈ 100 / 150 ms | Fischer & Ramsperger, 1984 [A]; [W04] |
| F03 | „Reflexive“ Sakkaden (auf plötzlich erscheinende Reize) sind schneller als alle Formen willentlicher Sakkaden; Latenz nach Symbol-Hinweis am größten | – | Walker et al., 2000 [A] |
| F04 | Sakkadendauer steigt mit der Amplitude um im Mittel 2,7 ms pro Grad (n = 25) | 2,7 ms/° | Baloh et al., 1975 [A] |
| F05 | Latenz-Exzentrizitäts-Funktion (horizontal, kleines Ziel): Plateau von 0,75 bis 12°, danach allmählicher Anstieg zur Peripherie; jenseits 35° im temporalen Netzhautbereich unregelmäßig mit Richtungsfehlern | Plateau 0,75–12° | Kalesnykas & Hallett, 1994 [A] |
| F06 | Horizontale Sakkaden haben kürzere Latenz als vertikale; Sakkaden in das obere Halbfeld sind schneller als in das untere; Latenz unabhängig von der Exzentrizität (1,5–8°); 8 Richtungen, Prosakkaden | – | Dafoe et al., 2007 [A] |
| F07 | Latenzen zu Zielen im unteren Gesichtsfeld sind größer; der Effekt hängt von der egozentrischen, nicht der gravitativen Senkrechten ab (Kopfneigung) | – | Honda & Findlay, 1992 [A] |
| F08 | Alle geprüften Sakkadentypen außer gedächtnisgeführten hatten kürzere Latenz nach oben als nach unten (p < 0,05) | – | Abegg et al., 2015 [A-W] |
| F09 | Metaanalyse über 23 Datensätze (visuelle Suche, Szenenbetrachtung): Fixationsdauer vor Aufwärts-Sakkaden im Mittel 25 ms kürzer als vor Abwärts-Sakkaden, gepooltes g = 0,97; in 19 von 23 Datensätzen signifikant. Einleitung: Latenz zu Zielen im oberen Gesichtsfeld „meist 20–50 ms kürzer“ | 25 ms; g = 0,97; 20–50 ms | Greene et al., 2020 [A + V, PMC-Volltext] |
| F10 | Fixationsdauern vor aufwärts gerichteten Sakkaden kürzer als vor abwärts gerichteten; vor horizontalen Sakkaden symmetrisch und länger | – | Greene et al., 2014 [A] |
| F11 | Schräge (45°) Sakkaden: Komponenten langsamer als bei rein horizontalen/vertikalen Sakkaden gleicher Größe, Vektorgeschwindigkeit etwas größer; Bahn oft gekrümmt (n = 10, Search-Coil) | – | Becker & Jürgens, 1990 [A] |
| F12 | Alter: Junge Erwachsene (20–30 J.) hatten die schnellsten Sakkadenreaktionszeiten und die kleinste Streuung; Kinder 5–8 J. langsam und stark streuend; Ältere (60–79 J.) langsamer (n = 168, 5–79 J.) | – | Munoz et al., 1998 [A] |
| F13 | Entfernte Ablenker erhöhen die Sakkadenlatenz (am stärksten am Fixationsort); innerhalb von ≈ 20° der Zielachse beeinflussen sie die Amplitude, nicht die Latenz | – | Walker et al., 1997 [A] |
| F14 | Kopfbewegungen bei Blickwechseln: Breite des Bereichs ohne Kopfbewegung („eye-only range“) 35,8 ± 31,9° (Mittel ± SD) bei Gesunden, stark individuell, je Person reproduzierbar | 35,8 ± 31,9° | Stahl, 1999 [A] |
| F15 | Übersichten zu Blicksteuerung, Sakkaden und Aufmerksamkeit | – | Kowler, 2011 [A]; Leigh & Kennard, 2004 [A]; Findlay & Walker, 1999 [W04] |

### B.2 Fixation und Aufmerksamkeit

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F16 | Sakkadenziel und Aufmerksamkeit sind obligatorisch und selektiv gekoppelt: Unterscheidung am Sakkadenziel am besten, an Nachbarn nahe Zufallsniveau; es ist nicht möglich, Aufmerksamkeit auf ein anderes Objekt zu richten, während man zu einem nahen Ziel blickt | – | Deubel & Schneider, 1996 [A] |
| F17 | Aufmerksamkeit auf ein Ziel erleichtert Sakkaden; nicht möglich, schnell/genau zu einem Ziel zu blicken und zugleich anderswo genau zu urteilen; es gibt eine Obergrenze des Aufmerksamkeitsbedarfs von Sakkaden | – | Kowler et al., 1995 [A] |
| F18 | Entdeckungsleistung am Ort der geplanten Sakkade am höchsten; man kann nicht zu einem Ort blicken und einem anderen Aufmerksamkeit widmen | – | Hoffman & Subramaniam, 1995 [A] |
| F19 | Prämotorische Theorie: Aufmerksamkeit wird zu einem Punkt orientiert, wenn das okulomotorische Programm bereit ist. Befund: Kosten bei falsch orientierter Aufmerksamkeit, wachsend mit der Entfernung, zusätzliche Kosten beim Überqueren des horizontalen oder vertikalen Meridians | – | Rizzolatti et al., 1987 [A] |
| F20 | Kritik: Aufmerksamkeit ist nicht funktional gleich Bewegungsvorbereitung; für **exogene** Aufmerksamkeit ist eine Abhängigkeit vom Okulomotorsystem möglich; Befunde zur Sonderrolle der Augen widersprüchlich | – | Smith & Schenk, 2012 [A] |
| F21 | Inhibition of Return: verzögerte Antworten an einem Ort, von dem die Aufmerksamkeit abgezogen wurde (fördert Zuwendung zu neuen Orten) | – | Klein, 2000 [A] |
| F22 | Fixationsstabilität über 1 min, auch mit Ablenkern: Wurfscheibenschützen (n = 7) stabiler als Kontrollen (n = 8) bei Ablenkern; schnellere Sakkadenlatenz; Querschnittsvergleich, kein Trainingsbeleg | n = 7 vs. 8 | Di Russo et al., 2003 [A]; [W03] |

### B.3 Fitts'sches Gesetz, Hand-Auge-Koordination

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F23 | Bewegungszeit MT = a + b · log₂(A/W + 1) (Shannon-Form; A Weg, W Zielbreite). Fitts' Originaldaten (Stift) neu ausgewertet: Index of Performance 7,2–8,2 bit/s (Steigung 122–139 ms/bit); über Geräte und Studien 1,1–13,7 bit/s | 122–139 ms/bit; 1,1–13,7 bit/s | MacKenzie, 1992 [A-W, Autorenseite]; Fitts, 1954 [M] |
| F24 | Für **kleine** Ziele ist das klassische Fitts-Modell bei Fingereingabe unzureichend; ein Zwei-Verteilungs-Modell (FFitts) erklärt mehr Varianz (R² ≥ 0,91) | R² ≥ 0,91 | Bi et al., 2013 [A-W, Google-Research-Seite] |
| F25 | Empfehlungen zur Modellierung mit Fitts' Gesetz (ISO 9241-9, effektive Zielbreite), Übersicht über 24 Mausmodelle | 24 Modelle | Soukoreff & MacKenzie, 2004 [A-W] |
| F26 | Der Blick geht der Zeigebewegung voraus und bleibt am Zielpunkt verankert; Sakkaden zu einem neuen Ziel während einer Zeigebewegung sind um im Mittel 155 ms verzögert (Rest der Verzögerungsphase des Arms) | +155 ms | Neggers & Bekkering, 2000 [A] |
| F27 | Bei schnellen Zeigebewegungen beginnt die Arm-EMG meist **vor** dem Sakkadenbeginn; Richtung und Weite der Armbewegung sind vor der Sakkade festgelegt; auch für Arm-EMG gibt es einen Lückeneffekt | – | Gribble et al., 2002 [A] |
| F28 | Alltagshandlung (Tee kochen): erste objektbezogene Fixation geht der Handlung im Mittel 0,56 s voraus; der Blick wechselt etwa 0,61 s vor Ende der vorigen Handlung zum nächsten Objekt | 0,56 s; 0,61 s | Land et al., 1999 [A] |

### B.4 Zeitkomponenten, Gerät, Optik und Vorsichtsgruppen

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F29 | Einfache visuelle Reaktionszeit (Fingerdruck, 1.469 Personen 18–65 J., kalibrierte Messung): im Mittel 231 ms (213 ms nach Hardwarekorrektur), +0,55 ms/Jahr; Reizentdeckungszeit (Reaktionszeit minus Bewegungsbeginn im Tapping-Test) im Mittel 131 ms, altersunabhängig; Altersanstieg vor allem motorisch | 231 / 213 ms; 131 ms | Woods et al., 2015 [A] |
| F30 | Web-App auf Touchgeräten und Laptops misst Reaktionszeiten **immer zu lang** (Roboterfinger, Tabelle 4): iPhone 6S im Mittel 57,6–58,0 ms, Galaxy S7 66,1–69,8 ms, Windows 61,9–68,5 ms, macOS 78,2–132,9 ms; Einzelwerte der Touchgeräte ≈ 45–131 ms; Standardabweichung je Gerät ≈ 6,5–7,5 ms. **Tablets wurden nicht gemessen.** Absolute Werte stärker betroffen als Unterschiede innerhalb einer Person | 58 / 66–70 ms | Pronk et al., 2020 [A + V, Tabelle 4 als PMC-XML] |
| F31 | Hick-Hyman: Wahlreaktionszeit wächst mit dem Logarithmus der Alternativenzahl; Informationsgewinn ≈ 5 Bit/s; bei sehr kompatiblen Zuordnungen ist die Kurve nahezu flach; Übung flacht die Steigung ab | ≈ 5 Bit/s | Hick, 1952 [W12]; Hyman, 1953 [M]; Proctor & Schneider, 2018 [A] |
| F32 | Vorperioden-Dauer und -Variabilität beeinflussen die einfache Reaktionszeit (Übersicht; Zahlen nicht geprüft) | – | Niemi & Näätänen, 1981 [M] |
| F33 | Sehwinkel am 10,9″-Tablet in 40 cm: ≈ 36 CSS-px pro Grad (0,19 mm/px); Bild quer ≈ 33° breit | 36 px/° | [H, W12 F60/F61] |
| F59 | Bildschirmarbeit senkt die Lidschlagrate (bewusst blinzeln) | im Mittel 5-fach | Patel et al., 1991 [A, W12] |
| F60 | Neue Gleitsichtträger nutzen mehr Kopfbewegungen bei Blickwechseln (n = 10); die Anpassung an Gleitsichtgläser ist individuell verschieden (Vergenz-Fähigkeit hing mit der Anpassung zusammen) | n = 10 | Hutchings et al., 2007 [A, W04]; Alvarez et al., 2017 [A] |
| F61 | Infantiler Nystagmus (224 Personen): Amplituden 0,3–15,7°, Frequenzen 0,5–8 Hz; häufigste Wellenform: horizontaler Ruck mit verlängerter Foveation (n = 49; 27 %) | 0,3–15,7°; 0,5–8 Hz | Abadi, 2002 [A] |
| F62 | Schielen mit und ohne Amblyopie (n = 46): Greifbewegung nach Zielfixation verlängert, mehr sekundäre Sakkaden → Auge-Hand-Zeiten sind in dieser Gruppe anders und nicht mit Gleichaltrigen vergleichbar | n = 46 | Niechwiej-Szwedo et al., 2014 [A] |
| F63 | Zwischen 64 % und 90 % der Computernutzer berichten Sehbeschwerden (Augenbelastung, Kopfschmerz, trockene Augen, verschwommenes Sehen); die Wirksamkeit vorgeschlagener Behandlungen ist unbewiesen | 64–90 % | Rosenfield, 2011 [A] |

### B.5 Ermüdung, Vigilanzabfall, Übung

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F34 | Vigilanzabfall: Leistung sinkt bei langer, eintöniger Beobachtung (Uhrzeigeraufgabe über 2 h); Zahlen nur über Sekundärquellen | – | Mackworth, 1948 [M]; [W02] |
| F35 | Visuelle Daueraufmerksamkeit: starker Empfindlichkeitsverlust schon nach 5 min bei stark degradierten Reizen, nicht bei undegradierten oder mäßig degradierten | 5 min | Nuechterlein et al., 1983 [A] |
| F36 | Metaanalyse: Der Empfindlichkeitsabfall hängt von Aufgabentyp (simultan/sukzessiv), Ereignisrate und Reiztyp ab | – | See et al., 1995 [A-W] |
| F37 | Kurze Vigilanzaufgabe (12 min) zeigt bereits das typische Dekrement | 12 min | Temple et al., 2000 [W02, D04] |
| F38 | Kurze Aufgabenwechsel verhinderten das Dekrement in einer Studie (Zielhabituation); eine Replikation mit 498 Teilnehmenden fand **keinen** Effekt (Bayes-Evidenz für die Nullhypothese) → Wirkung kurzer Pausen **unsicher** | n = 498 | Ariga & Lleras, 2011 [A]; Helton & Russell, 2012 [A] |
| F39 | Wiederholung von Sakkadenaufgaben verbessert Genauigkeit, Tempo und Stabilität (30 Erwachsene, 3 Sitzungen); keine Tageszeit-Wirkung | n = 30 | Karantinos et al., 2025 [A] |

### B.6 Suche, Crowding, Zeichenähnlichkeit

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F40 | Suchschwierigkeit steigt mit der Ähnlichkeit von Ziel und Nichtzielen und sinkt mit der Ähnlichkeit der Nichtziele untereinander; Kontinuum der Suchleistung statt „seriell/parallel“ | – | Duncan & Humphreys, 1989 [A-W, CBU-Eintrag] |
| F41 | Crowding: kritischer Abstand ≈ halbe Exzentrizität (Bouma-Gesetz); gilt für alle Objekte, zwischen unähnlichen Objekten schwächer; begrenzt Lese- und Suchtempo | ≈ 0,5 × Exzentrizität | Pelli & Tillman, 2008 [A]; Bouma, 1970 [M]; Whitney & Levi, 2011 [A] |
| F42 | Enge Buchstabenabstände verändern die Verwechslungsmuster: mehr zufällige und zusätzlich neue Verwechslungen | – | Liu & Arditi, 2001 [A] |
| F43 | Buchstabenerkennung hängt von Wahrnehmbarkeit, Ähnlichkeit und Antwortneigung ab; der Ähnlichkeitsraum ändert sich mit der Maske (118 bzw. 96 Studierende, 2-AFC, Großbuchstaben, 16 pt Courier New fett, 26 × 26 Paare) | – | Mueller & Weidemann, 2012 [A + V, Tabellen 2 und 3] |
| F44 | **Eigene Auswertung** der Tabellen 2 und 3 (Genauigkeit je Buchstabenpaar, Mittel beider Richtungen; Rang 1 = niedrigste Genauigkeit unter 325 Paaren): B–P Rang 58 bzw. 50; P–R 67 bzw. 257; D–P 75 bzw. 146; B–D 125 bzw. 162; B–R 210 bzw. 183; D–R 299 bzw. 290 (Experiment 1 bzw. 2). Mittlere Paargenauigkeit 0,771 bzw. 0,739 (SD 0,049 bzw. 0,065) | siehe links | [H aus Mueller & Weidemann, 2012] |

### B.7 Studienlage: Trainierbarkeit und Übertragung

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F45 | Prosakkaden-Training (12 Sitzungen) verbesserte Pro- **und** Antisakkaden; Antisakkaden-Training verbesserte Antisakkaden und Lücken-Prosakkaden, kaum Overlap-Prosakkaden; kaum Nachteile; Deutung: Training erleichtert Fixationslösung und Bewegungsvorbereitung, wenig die visuelle Eingangsverarbeitung. Frühere Arbeit: Übertragung zwischen horizontaler und vertikaler Achse | 12 Sitzungen | Montenegro & Edelman, 2019 [A] |
| F46 | Express-Sakkaden nehmen mit Training zu; der Effekt übertrug sich zwischen Hemifeldern und zwischen trainiertem und untrainiertem Auge; Spitzengeschwindigkeit stieg | – | Jóhannesson et al., 2018 [A] |
| F47 | Gegenbefund: Latenztraining eines einzelnen Probanden war weitgehend **retinotop** und übertrug sich nicht auf ungeübte Positionen | n = 1 | Di Russo et al., 2003 [A]; [W03] |
| F48 | Allgemeines Sehtraining für Racketsport (40 junge Personen, 4 Wochen, Placebo und Kontrolle): kein Effekt über die Testvertrautheit hinaus | n = 40 | Abernethy & Wood, 2001 [A] |
| F49 | Digitales Sehtraining (33 RCTs, 1.048 Personen): Verbesserungen bei Aufmerksamkeit, Reaktionszeit, Entscheidungszeit, Entscheidungsgenauigkeit und Auge-Hand-Koordination, aber große Effekte vor allem bei trainingsähnlichem Test (Reaktionszeit SMD 2,66 vs. 0,50; Aufmerksamkeit 1,65 vs. 0,07) | SMD 2,66 / 0,50 | Guo et al., 2025 [A] |
| F50 | Brain-Training: breite Evidenz für Verbesserung der geübten Aufgabe, weniger für nahe Aufgaben, wenig für entfernte Aufgaben und Alltagsleistung; viele Studien methodisch schwach | – | Simons et al., 2016 [A] |
| F51 | Konsenspapier AAP/AAO u. a.: Wissenschaftliche Evidenz stützt nicht, dass Sehtraining, Muskelübungen, Verfolgungs-/Tracking-Übungen, Verhaltens-/Wahrnehmungs-Vision-Therapy, „Trainingsbrillen“, Prismen oder Farbfilter wirksame direkte oder indirekte Behandlungen von Lernstörungen sind | – | Handler & Fierson, 2011 [A] |
| F52 | Klinischer Kontext Gesichtsfeldausfall: Explorations-Sakkadentraining bei Hemianopie (n = 28, RCT) senkte die Such-Reaktionszeit auf der blinden Seite (post/pre 47 % bzw. 23 % im natürlichen Suchen) | n = 28 | Roth et al., 2009 [A] |
| F53 | Cochrane-Übersicht (20 Studien, 732 Randomisierte, Schlaganfall mit Gesichtsfeldausfall): Scanning-Training mit niedriger Evidenzqualität besser bei Lebensqualität (VFQ-25 MD 9,36); niedrige bis sehr niedrige Evidenz für **keinen** Effekt auf Gesichtsfeld, erweiterte Alltagsaktivitäten, Lesen, Scanning | 20 Studien; 732 | Pollock et al., 2019 [A] |
| F54 | Kleine Studien an Kindern mit Leseschwierigkeiten berichten Verbesserungen nach Okulomotorik-Training (Pilot 21 Kinder, 14 vs. 7, 6 Wochen; 30 randomisierte Kinder mit Dyslexie und Augenbewegungsauffälligkeiten) – kleine Stichproben, kurze Beobachtung, Abstract-Ebene | n = 21; n = 30 | Facchin et al., 2025 [A]; Jafarlou, 2024 [A] |

### B.8 Messzuverlässigkeit

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F55 | Differenzwerte (Interferenz-/Kompatibilitätseffekte) sind als Gruppeneffekt robust, als persönlicher Wert oft wenig zuverlässig (Test-Retest 0 bis 0,82 in sieben Aufgaben) | 0–0,82 | Hedge et al., 2018 [W12, A] |
| F56 | Formeln für die Zuverlässigkeit von Mittelwerten und Differenzen von Reaktionszeiten; Aussagen über die nötige Zahl von Durchgängen hängen von Streuung zwischen und innerhalb der Personen ab | – | Miller & Ulrich, 2013 [A] |
| F57 | Die Standardabweichung einer Reaktionszeitverteilung wächst linear mit dem Mittelwert (Variationskoeffizient als Vergleichsgröße) | – | Wagenmakers & Brown, 2007 [A] |
| F58 | Gerätebedingte Überschätzung betrifft absolute Reaktionszeiten stärker als Differenzen innerhalb einer Person | – | Pronk et al., 2020 [A] |

### B.9 Eigene Rechnungen (Herleitungen, keine Studienaussagen)

**H1 – Geometrie (Annahmen: 10,9″-Tablet quer, 1.180 × 820 CSS-px, 0,192 mm/px, Abstand 40 cm, 36 px/°; Ziele in den Ecken mit Rand 90–160 px zwischen Zielmitte und Bildrand)**

| Weg | Länge in px | in Grad | in mm |
|---|---|---|---|
| horizontal (links ↔ rechts) | 860–1.000 | ≈ 24–28° | ≈ 165–192 |
| vertikal (oben ↔ unten) | 500–640 | ≈ 14–18° | ≈ 96–123 |
| diagonal | 990–1.190 | ≈ 28–33° | ≈ 191–228 |

Im Hochformat (820 × 1.180) vertauschen sich horizontal und vertikal. Bei einem Smartphone sind alle Winkel deutlich kleiner (≈ halb), bei 60 cm Abstand ≈ ⅔. Zeichen von 34 px ≈ 0,9°; 20 % der kürzeren Seite (164 px) ≈ 4,6°.
Trefferfläche: Radius 72 px = Durchmesser 144 px ≈ 27,6 mm; Radius 56 px = 112 px ≈ 21,5 mm. Bei zentrierter Kopfhaltung liegen die Ecken höchstens ≈ ±14° horizontal und ≈ ±9° vertikal von der Geradeausblickrichtung entfernt (halbe Wege), die Sprunggröße beträgt aber das Doppelte.

**H2 – Fitts-Schwierigkeit je Wegklasse (Shannon-Form ID = log₂(A/W + 1), W = Trefferdurchmesser; Rand 120 px)**

| Weg | ID bei W = 27,6 mm | ID bei W = 21,5 mm |
|---|---|---|
| horizontal | 2,9 bit | 3,2 bit |
| vertikal | 2,3 bit | 2,6 bit |
| diagonal | 3,1 bit | 3,4 bit |

Differenz horizontal – vertikal ≈ 0,6 bit (Rand 90–160 px: 0,55–0,67 bit). Bei einer Steigung von 100–130 ms/bit (Größenordnung nach F23; für Touch **nicht geprüft**) sind das **≈ 55–90 ms** allein durch die **Weglänge** – mehr als die Richtungsunterschiede der Sakkadenlatenz (F08, F09: ≈ 20–50 ms). Mit einem Index of Performance von 6 bit/s (Annahme; Spannweite der Studien 1,1–13,7) wäre die Bewegungszeit ≈ 0,4–0,6 s.
**Folge:** Richtung, Weglänge und Armbewegung sind in dieser Anordnung **verknüpft**; Unterschiede zwischen „Richtungen“ sind Unterschiede zwischen **Wegen**.

**H3 – Zeitkomponenten (Größenordnungen, nicht addierbar)**

| Komponente | Größenordnung | Quelle / Herleitung |
|---|---|---|
| Einblenden des Ziels (≥ 100 ms, weich) | Zeitstempel = Beginn der Einblendung; wirksam sichtbar erst nach einem Teil davon (≈ 50–100 ms, Annahme) | Spezifikation; [H] |
| Entdecken des Reizes | ≈ 130 ms (Reizentdeckungszeit) | Woods et al., 2015 (F29) |
| Sakkadenlatenz | ≈ 200 ms (150–250 ms je nach Reizfolge) | Saslow, 1967 (F01) |
| Sakkadendauer | 2,7 ms/° × 14–33° ≈ 40–90 ms (nur Steigung, ohne Achsenabschnitt) | Baloh et al., 1975 (F04); [H] |
| Erkennen/Entscheiden | Hick-Anteil bei räumlich passender Antwort nahezu flach; Zeit für Zeichenerkennung: **keine geprüfte Zahl** | Proctor & Schneider, 2018 (F31) |
| Beginn der Fingerbewegung | der Arm-Muskel wird meist vor der Sakkade aktiv (parallel, nicht nacheinander) | Gribble et al., 2002 (F27) |
| Fingerbewegung (Fitts) | ≈ 0,4–0,6 s (H2) | MacKenzie, 1992 (F23); [H] |
| Gerät/Touch (Web-App) | + ≈ 58–70 ms (Smartphones; Tablets nicht gemessen) | Pronk et al., 2020 (F30) |

Die Komponenten **überlappen** (Auge und Arm werden gleichzeitig vorbereitet; der Blick bleibt am Ziel verankert, bis der Finger ankommt: F26, F27). Aus „Ziel → Touch“ lässt sich keine Komponente herausrechnen; der Fingerweg ist vermutlich der größte Einzelposten.

**H4 – Zahl der Durchgänge (Annahme: 1,3–2,2 s je Ziel = Reaktionszeit 0,7–1,2 s plus Pause 0,3–1,0 s; 3 × 60 s ohne Pausen)**

- ≈ 80–140 Ziele je Sitzung; je gerichtetem Wechsel (12 gleich häufig) ≈ 7–11.
- Die 12 gerichteten Wechsel fallen in 8 Richtungsklassen: → und ← je 2 Wechsel, ↓ und ↑ je 2, ↘ ↖ ↗ ↙ je 1. Je Klasse also ≈ 14–23 (horizontal/vertikal) bzw. ≈ 7–11 (diagonal) richtige Antworten je Sitzung.
- Erste bzw. letzte Hälfte: ≈ 40–70 Ziele je Hälfte.

**H5 – Genauigkeit eines Klassenmittels und eines Unterschieds (Annahme: Einzelzeit-SD 100/150/200 ms – Größenordnung, **nicht** aus einer Studie; SD wächst mit dem Mittelwert, F57; unabhängige Durchgänge; Mittelwert statt Median)**

SE = SD/√n; SE des Unterschieds zweier Klassen mit je n: SD·√(2/n); kleinster mit 80 % Sicherheit erkennbarer Unterschied (α = 0,05 zweiseitig) ≈ 2,8 × SE des Unterschieds.

| n je Klasse | SE des Mittels (SD 150) | SE des Unterschieds (SD 150) | erkennbarer Unterschied, 80 % (SD 100 / 150 / 200) |
|---|---|---|---|
| 3 | 87 ms | 122 ms | 229 / 343 / 457 ms |
| 8 | 53 ms | 75 ms | 140 / 210 / 280 ms |
| 16 | 38 ms | 53 ms | 99 / 148 / 198 ms |
| 30 | 27 ms | 39 ms | 72 / 108 / 145 ms |
| 60 | 19 ms | 27 ms | 51 / 77 / 102 ms |
| 100 | 15 ms | 21 ms | 40 / 59 / 79 ms |

Nötige Durchgänge **je Klasse**, um einen Unterschied von 50 / 75 / 100 ms zu erkennen: SD 100 ms: 63 / 28 / 16; SD 150 ms: 142 / 63 / 36; SD 200 ms: 251 / 112 / 63.
Erste vs. letzte Hälfte (je ≈ 40–70 Ziele, SD 150): SE des Unterschieds ≈ 26–34 ms, erkennbarer Unterschied ≈ 70–95 ms. Zusätzlich vermengen Üben (Lernen), Stufenwechsel durch die automatische Anpassung und Müdigkeit.
**Folge:** „ab ≥ 3 richtigen Antworten je Klasse“ liefert Mittel mit SE ≈ 60–115 ms; das ist kein belastbarer Wert. Sinnvoller: Anzeige erst ab ≈ 10–15 je Klasse mit Unsicherheitsangabe, Zusammenfassung nach Achse (horizontal/vertikal/diagonal) und Verlauf über mehrere Sitzungen **auf gleichem Gerät und gleicher Stufe**.

**H6 – Stufenentscheidung nach 12 Zielen (≥ 90 % = mindestens 11 von 12; < 75 % = höchstens 8 von 12; Binomial)**

| wahre Trefferquote | P(schwerer) | P(gleich) | P(leichter) |
|---|---|---|---|
| 95 % | 0,88 | 0,12 | 0,00 |
| 90 % | 0,66 | 0,32 | 0,03 |
| 85 % | 0,44 | 0,46 | 0,09 |
| 80 % | 0,27 | 0,52 | 0,21 |
| 75 % | 0,16 | 0,49 | 0,35 |
| 70 % | 0,09 | 0,41 | 0,51 |

Die Stufenwahl ist je Segment verrauscht; sie gleicht sich über mehrere Segmente aus. Die Stufe am Ende ist deshalb ein **grober** Hauptwert.

**H7 – Crowding bei Ablenkern:** Kritischer Abstand ≈ 0,5 × Exzentrizität (F41). Bei 26° Exzentrizität (Weg einer Breite) ≈ 13°: Wird ein Hauptziel aus der Peripherie erkannt, müssten Ablenker weiter als ≈ 13° entfernt sein, um nicht zu stören. Nach dem Hinsehen (Fovea) gelten viel kleinere Abstände. **Herleitung**, für diese Übung nicht untersucht.

**H8 – Hick:** Vier gleich wahrscheinliche Alternativen = 2 Bit (log₂ 4). Bei räumlich passender Zuordnung (Antwort = Ort des Reizes) ist der Hick-Anteil klein (F31).

---

## C) Evidenz-Zusammenfassung

Vorgeschlagene Werte für `evidenz.*` beziehen sich auf die **Aufgabenart** (wie im README definiert), nicht auf die Übung selbst – **905 ist nicht untersucht**, und das Original ist nur aus der Beschreibung des Auftraggebers bekannt.

**905 4-Ziele-Wechsel**
- Sakkadenaufgaben werden mit Wiederholung schneller, genauer und stabiler (F39); Training senkt Latenzen und überträgt sich teils zwischen Sakkadentypen, Achsen, Hemifeldern und Augen (F45, F46), in einem Einzelfall aber nicht auf andere Positionen (F47). Alle diese Laborstudien messen **Sakkaden mit Eye-Tracker**; 905 misst „Ziel → Touch“.
- Auge-Hand-Aufgaben und Reaktionszeiten verbessern sich mit Übung; Effekte werden bei trainingsähnlichem Test stark überschätzt (F49, F50); allgemeines Sehtraining brachte keinen Effekt über die Testvertrautheit hinaus (F48).
- Für Alltag, Lesen, Sport oder Verkehr gibt es **keinen Beleg**; für Lernstörungen stützt die Evidenz Augenübungen nicht (F51); kleine neuere Studien bei Kindern sind schwach (F54); klinische Befunde zu Gesichtsfeldausfall (F52, F53) gelten **nicht** für Gesunde.
- Vorschlag: `uebungseffekt: mittel` · `naher_transfer: unklar` · `alltag_transfer: fehlend`.
- Messgröße: Zeit Ziel → Touch ist **kein Sakkadenmaß** (H3); Richtungsklassen sind Wegklassen (H2); Differenzwerte brauchen viele Durchgänge (H5, F55); absolute Werte sind gerätegebunden (F30).
- Vorsicht: `nystagmus`, `gesichtsfeldausfall`, `schielen_binokular`, `amblyopie`, `kopfschmerz_asthenopie`, `migraene_lichtempfindlich`, `presbyopie_gleitsicht`, `sehbehinderung_niedriger_visus`, `tremor_parkinson`, `hand_arm_beschwerden`, `aufmerksamkeitsprobleme`, `kinder_unter_6`.
- **Nicht übernehmen:** „trainiert die Sakkaden / Augenmuskeln / Fixation“, „misst die visuo-motorische Leistung / Sakkadenlatenz“, „Ermüdungstest“, Normwerte, Altersvergleiche, Wirk- oder Therapieanspruch, „Praxisperspektive Muchnick/Mountford“ als Beleg.

---

## D) Literaturliste (nur geprüfte Einträge)

Prüfvermerk-Schema: **CR** = Crossref-Metadaten stimmen (Titel, Autor:innen, Jahr, Quelle, Band, Seiten); **Inhalt** = [A]/[A-W]/[V]/[M]/[W..] wie oben; PMID, wo vorhanden.

### D.1 Von der Website zitierte Werke

Keine. Es gibt keine Website; die Übung beruht auf der Beschreibung des Auftraggebers (Teil A).

### D.2 Neu recherchierte Quellen (in dieser Gruppe erstmals geprüft)

1. Abadi, R. V. (2002). Motor and sensory characteristics of infantile nystagmus. *British Journal of Ophthalmology, 86*(10), 1152–1160. https://doi.org/10.1136/bjo.86.10.1152 — CR ✔ (Crossref nennt nur Abadi; PubMed: Abadi & Bjerre); [A] PMID 12234898 (224 Personen mit infantilem Nystagmus; Amplituden 0,3–15,7°, Frequenzen 0,5–8 Hz).
2. Abegg, M., Pianezzi, D., & Barton, J. J. S. (2015). A vertical asymmetry in saccades. *Journal of Eye Movement Research, 8*(5), Article 3. https://doi.org/10.16910/jemr.8.5.3 — CR ✔; [A-W] Abstract über die Verlagsseite (nicht in PubMed).
3. Alvarez, T. L., Kim, E. H., & Granger-Donetti, B. (2017). Adaptation to progressive additive lenses: Potential factors to consider. *Scientific Reports, 7*, 2529. https://doi.org/10.1038/s41598-017-02851-5 — CR ✔; [A] PMID 28566706.
4. Ariga, A., & Lleras, A. (2011). Brief and rare mental “breaks” keep you focused: Deactivation and reactivation of task goals preempt vigilance decrements. *Cognition, 118*(3), 439–443. https://doi.org/10.1016/j.cognition.2010.12.007 — CR ✔; [A] PMID 21211793.
5. Becker, W., & Jürgens, R. (1990). Human oblique saccades: Quantitative analysis of the relation between horizontal and vertical components. *Vision Research, 30*(6), 893–920. https://doi.org/10.1016/0042-6989(90)90057-R — CR ✔; [A] PMID 2385929.
6. Dafoe, J. M., Armstrong, I. T., & Munoz, D. P. (2007). The influence of stimulus direction and eccentricity on pro- and anti-saccades in humans. *Experimental Brain Research, 179*(4), 563–570. https://doi.org/10.1007/s00221-006-0817-8 — CR ✔ (online 2006); [A] PMID 17171535.
7. Deubel, H., & Schneider, W. X. (1996). Saccade target selection and object recognition: Evidence for a common attentional mechanism. *Vision Research, 36*(12), 1827–1837. https://doi.org/10.1016/0042-6989(95)00294-4 — CR ✔; [A] PMID 8759451; auch in W10.
8. Facchin, A., Maffioletti, S., Maffioletti, M., Esposito, G., Bonetti, M., Girelli, L., & Daini, R. (2025). Oculomotor training improves reading and associated cognitive functions in children with learning difficulties: A pilot study. *Vision, 9*(4), 83. https://doi.org/10.3390/vision9040083 — CR ✔; [A] PMID 41133607.
9. Greene, H. H., Brown, J. M., & Dauphin, B. (2014). When do you look where you look? A visual field asymmetry. *Vision Research, 102*, 33–40. https://doi.org/10.1016/j.visres.2014.07.012 — CR ✔; [A] PMID 25094053.
10. Greene, H. H., Brown, J. M., & Strauss, G. P. (2020). Shorter fixation durations for up-directed saccades during saccadic exploration: A meta-analysis. *Journal of Eye Movement Research, 12*(8), Article 5. https://doi.org/10.16910/jemr.12.8.5 — CR ✔; [A] PMID 33828778; Zahlen (25 ms, g = 0,97; Einleitung 20–50 ms) im PMC-Volltext [V] gelesen.
11. Gribble, P. L., Everling, S., Ford, K., & Mattar, A. (2002). Hand-eye coordination for rapid pointing movements. *Experimental Brain Research, 145*(3), 372–382. https://doi.org/10.1007/s00221-002-1122-9 — CR ✔; [A] PMID 12136387.
12. Helton, W. S., & Russell, P. N. (2012). Brief mental breaks and content-free cues may not keep you focused. *Experimental Brain Research, 219*(1), 37–46. https://doi.org/10.1007/s00221-012-3065-0 — CR ✔; [A] PMID 22427137 (n = 498).
13. Hoffman, J. E., & Subramaniam, B. (1995). The role of visual attention in saccadic eye movements. *Perception & Psychophysics, 57*(6), 787–795. https://doi.org/10.3758/BF03206794 — CR ✔; [A] PMID 7651803.
14. Honda, H., & Findlay, J. M. (1992). Saccades to targets in three-dimensional space: Dependence of saccadic latency on target location. *Perception & Psychophysics, 52*(2), 167–174. https://doi.org/10.3758/BF03206770 — CR ✔; [A] PMID 1508624.
15. Jafarlou, F. (2024). Oculomotor rehabilitation improves reading abilities in dyslexic children with concurrent eye movement abnormalities. *Clinical Pediatrics, 63*(9), 1276–1286. https://doi.org/10.1177/00099228231221335 — CR ✔; [A] PMID 38189250 (Abstract ohne Angabe von Stichprobenaufteilung; schwach, nur als Beispiel).
16. Jóhannesson, Ó. I., Edelman, J. A., Sigurþórsson, B. D., & Kristjánsson, Á. (2018). Effects of saccade training on express saccade proportions, saccade latencies, and peak velocities: An investigation of nasal/temporal differences. *Experimental Brain Research, 236*(5), 1251–1262. https://doi.org/10.1007/s00221-018-5213-7 — CR ✔; [A] PMID 29480354.
17. Karantinos, T., Kotsiou, E., Drouza, P., Mantas, A., Anderson, A. J., Klein, C., & Smyrnis, N. (2025). Diurnal variation and practice effects in saccade task performance. *Experimental Brain Research, 243*(8), 188. https://doi.org/10.1007/s00221-025-07131-7 — CR ✔; [A] PMID 40699362.
18. Kowler, E. (2011). Eye movements: The past 25 years. *Vision Research, 51*(13), 1457–1483. https://doi.org/10.1016/j.visres.2010.12.014 — CR ✔ (Crossref „25years“); [A] PMID 21237189 (Übersicht, keine Zahlen zitiert).
19. Kowler, E., Anderson, E., Dosher, B., & Blaser, E. (1995). The role of attention in the programming of saccades. *Vision Research, 35*(13), 1897–1916. https://doi.org/10.1016/0042-6989(94)00279-U — CR ✔; [A] PMID 7660596.
20. Land, M., Mennie, N., & Rusted, J. (1999). The roles of vision and eye movements in the control of activities of daily living. *Perception, 28*(11), 1311–1328. https://doi.org/10.1068/p2935 — CR ✔; [A] PMID 10755142.
21. Leigh, R. J., & Kennard, C. (2004). Using saccades as a research tool in the clinical neurosciences. *Brain, 127*(3), 460–477. https://doi.org/10.1093/brain/awh035 — CR ✔; [A] PMID 14607787 (Übersicht, keine Zahlen zitiert).
22. Liu, L., & Arditi, A. (2001). How crowding affects letter confusion. *Optometry and Vision Science, 78*(1), 50–55. https://doi.org/10.1097/00006324-200101010-00014 — CR ✔; [A] PMID 11233335.
23. Miller, J., & Ulrich, R. (2013). Mental chronometry and individual differences: Modeling reliabilities and correlations of reaction time means and effect sizes. *Psychonomic Bulletin & Review, 20*(5), 819–858. https://doi.org/10.3758/s13423-013-0404-5 — CR ✔; [A] PMID 23955122.
24. Montenegro, S. M., & Edelman, J. A. (2019). Impact of task-specific training on saccadic eye movement performance. *Journal of Neurophysiology, 122*(4), 1661–1674. https://doi.org/10.1152/jn.00020.2019 — CR ✔; [A] PMID 31461366.
25. Mueller, S. T., & Weidemann, C. T. (2012). Alphabetic letter identification: Effects of perceivability, similarity, and bias. *Acta Psychologica, 139*(1), 19–37. https://doi.org/10.1016/j.actpsy.2011.09.014 — CR ✔; [A] PMID 22036587; Tabellen 2 und 3 und Methoden als PMC-XML [V] (PMC3271710).
26. Niechwiej-Szwedo, E., Goltz, H. C., Chandrakumar, M., & Wong, A. M. F. (2014). Effects of strabismic amblyopia and strabismus without amblyopia on visuomotor behavior: III. Temporal eye-hand coordination during reaching. *Investigative Ophthalmology & Visual Science, 55*(12), 7831–7838. https://doi.org/10.1167/iovs.14-15507 — CR ✔; [A] PMID 25389201 (n = 46; Beschleunigungsphase des Greifens nach Zielfixation länger; mehr sekundäre Sakkaden).
27. Pollock, A., Hazelton, C., Rowe, F. J., Jonuscheit, S., Kernohan, A., Angilley, J., Henderson, C. A., Langhorne, P., & Campbell, P. (2019). Interventions for visual field defects in people with stroke. *Cochrane Database of Systematic Reviews, 2019*(5), CD008388. https://doi.org/10.1002/14651858.CD008388.pub3 — CR ✔ (Crossref führt Campbell nicht); [A] PMID 31120142.
28. Rosenfield, M. (2011). Computer vision syndrome: A review of ocular causes and potential treatments. *Ophthalmic and Physiological Optics, 31*(5), 502–515. https://doi.org/10.1111/j.1475-1313.2011.00834.x — CR ✔; [A] PMID 21480937 (64–90 % der Computernutzer berichten Sehbeschwerden wie Augenbelastung, Kopfschmerz, trockene Augen).
29. Saslow, M. G. (1967). Effects of components of displacement-step stimuli upon latency for saccadic eye movement. *Journal of the Optical Society of America, 57*(8), 1024–1029. https://doi.org/10.1364/JOSA.57.001024 — CR ✔ (Crossref nennt nur die Anfangsseite 1024); [A-W] Abstract über die Verlagsseite (opg.optica.org).
30. See, J. E., Howe, S. R., Warm, J. S., & Dember, W. N. (1995). Meta-analysis of the sensitivity decrement in vigilance. *Psychological Bulletin, 117*(2), 230–249. https://doi.org/10.1037/0033-2909.117.2.230 — CR ✔; [A-W] Zusammenfassung über Websuche (nicht in PubMed).
31. Smith, D. T., & Schenk, T. (2012). The premotor theory of attention: Time to move on? *Neuropsychologia, 50*(6), 1104–1114. https://doi.org/10.1016/j.neuropsychologia.2012.01.025 — CR ✔; [A] PMID 22306518.
32. Stahl, J. S. (1999). Amplitude of human head movements associated with horizontal saccades. *Experimental Brain Research, 126*(1), 41–54. https://doi.org/10.1007/s002210050715 — CR ✔; [A] PMID 10333006.
33. Wagenmakers, E.-J., & Brown, S. (2007). On the linear relation between the mean and the standard deviation of a response time distribution. *Psychological Review, 114*(3), 830–841. https://doi.org/10.1037/0033-295X.114.3.830 — CR ✔; [A] PMID 17638508.
34. Walker, R., Deubel, H., Schneider, W. X., & Findlay, J. M. (1997). Effect of remote distractors on saccade programming: Evidence for an extended fixation zone. *Journal of Neurophysiology, 78*(2), 1108–1119. https://doi.org/10.1152/jn.1997.78.2.1108 — CR ✔; [A] PMID 9307138.
35. Walker, R., Walker, D. G., Husain, M., & Kennard, C. (2000). Control of voluntary and reflexive saccades. *Experimental Brain Research, 130*(4), 540–544. https://doi.org/10.1007/s002219900285 — CR ✔; [A] PMID 10717796.

### D.3 Aus anderen Literaturbasen und Dokumenten übernommen, DOI am 02.10.2026 erneut per Crossref bestätigt

36. Abernethy, B., & Wood, J. M. (2001). Do generalized visual training programmes for sport really work? An experimental investigation. *Journal of Sports Sciences, 19*(3), 203–222. https://doi.org/10.1080/026404101750095376 — CR ✔; [A] PMID 11256825 (hier erneut gelesen); [D02].
37. Baloh, R. W., Sills, A. W., Kumley, W. E., & Honrubia, V. (1975). Quantitative measurement of saccade amplitude, duration, and velocity. *Neurology, 25*(11), 1065–1070. https://doi.org/10.1212/WNL.25.11.1065 — CR ✔; [A] PMID 1237825 (hier erneut gelesen); [W04].
38. Bi, X., Li, Y., & Zhai, S. (2013). FFitts law: Modeling finger touch with Fitts' law. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '13)* (S. 1363–1372). ACM. https://doi.org/10.1145/2470654.2466180 — CR ✔; [A-W] Abstract über die Google-Research-Seite; [W09].
39. Bouma, H. (1970). Interaction effects in parafoveal letter recognition. *Nature, 226*(5241), 177–178. https://doi.org/10.1038/226177a0 — CR ✔; [M]; [W02, D03].
40. Di Russo, F., Pitzalis, S., & Spinelli, D. (2003). Fixation stability and saccadic latency in élite shooters. *Vision Research, 43*(17), 1837–1845. https://doi.org/10.1016/S0042-6989(03)00299-2 — CR ✔; [A] PMID 12826107 (hier erneut gelesen); [W03].
41. Duncan, J., & Humphreys, G. W. (1989). Visual search and stimulus similarity. *Psychological Review, 96*(3), 433–458. https://doi.org/10.1037/0033-295X.96.3.433 — CR ✔; [A-W] Abstract über den CBU-Bibliografie-Eintrag (PubMed ohne Abstract); [W01, D03].
42. Findlay, J. M., & Walker, R. (1999). A model of saccade generation based on parallel processing and competitive inhibition. *Behavioral and Brain Sciences, 22*(4), 661–674. https://doi.org/10.1017/S0140525X99002150 — CR ✔; [A] [W04].
43. Fischer, B., & Ramsperger, E. (1984). Human express saccades: Extremely short reaction times of goal directed eye movements. *Experimental Brain Research, 57*(1), 191–195. https://doi.org/10.1007/BF00231145 — CR ✔; [A] PMID 6519226 (hier erneut gelesen); [W04].
44. Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 — CR ✔; [M] (PubMed ohne Abstract); [W09].
45. Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 — CR ✔; [A] PMID 40980806 (hier erneut gelesen); [W01, W03, W04].
46. Handler, S. M., Fierson, W. M., Section on Ophthalmology, Council on Children with Disabilities, American Academy of Ophthalmology, American Association for Pediatric Ophthalmology and Strabismus, & American Association of Certified Orthoptists. (2011). Learning disabilities, dyslexia, and vision. *Pediatrics, 127*(3), e818–e856. https://doi.org/10.1542/peds.2010-3670 — CR ✔ (Crossref führt nur die beiden Erstautor:innen); [A] PMID 21357342 (hier erneut gelesen); [W04].
47. Hedge, C., Powell, G., & Sumner, P. (2018). The reliability paradox: Why robust cognitive tasks do not produce reliable individual differences. *Behavior Research Methods, 50*(3), 1166–1186. https://doi.org/10.3758/s13428-017-0935-1 — CR ✔ (online 2017); [A] PMID 28726177; [W12].
48. Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology, 4*(1), 11–26. https://doi.org/10.1080/17470215208416600 — CR ✔; [A, OpenAlex]; [W12].
49. Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x — CR ✔ (Crossref 5 Autor:innen; Lillakas laut Erratum ergänzt, wie in W04); [A]; [W04, W12].
50. Hyman, R. (1953). Stimulus information as a determinant of reaction time. *Journal of Experimental Psychology, 45*(3), 188–196. https://doi.org/10.1037/h0056940 — CR ✔; [M]; [W12].
51. Kalesnykas, R. P., & Hallett, P. E. (1994). Retinal eccentricity and the latency of eye saccades. *Vision Research, 34*(4), 517–531. https://doi.org/10.1016/0042-6989(94)90165-1 — CR ✔; [A] PMID 8303835 (hier erneut gelesen); [W03].
52. Klein, R. M. (2000). Inhibition of return. *Trends in Cognitive Sciences, 4*(4), 138–147. https://doi.org/10.1016/S1364-6613(00)01452-2 — CR ✔; [A] PMID 10740278.
53. MacKenzie, I. S. (1992). Fitts' law as a research and design tool in human-computer interaction. *Human–Computer Interaction, 7*(1), 91–139. https://doi.org/10.1207/s15327051hci0701_3 — CR ✔; [A-W] Abstract und Kernzahlen über die Autorenseite (yorku.ca); [W09].
54. Mackworth, N. H. (1948). The breakdown of vigilance during prolonged visual search. *Quarterly Journal of Experimental Psychology, 1*(1), 6–21. https://doi.org/10.1080/17470214808416738 — CR ✔; [M]; [W02].
55. Munoz, D. P., Broughton, J. R., Goldring, J. E., & Armstrong, I. T. (1998). Age-related performance of human subjects on saccadic eye movement tasks. *Experimental Brain Research, 121*(4), 391–400. https://doi.org/10.1007/s002210050473 — CR ✔; [A] PMID 9746145 (hier erneut gelesen); [W02, W03].
56. Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. *Journal of Neurophysiology, 83*(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639 — CR ✔; [A] PMID 10669480 (hier erneut gelesen); [W06, W09, W10].
57. Niemi, P., & Näätänen, R. (1981). Foreperiod and simple reaction time. *Psychological Bulletin, 89*(1), 133–162. https://doi.org/10.1037/0033-2909.89.1.133 — CR ✔; [M] (kein Abstract auffindbar); [D01].
58. Nuechterlein, K. H., Parasuraman, R., & Jiang, Q. (1983). Visual sustained attention: Image degradation produces rapid sensitivity decrement over time. *Science, 220*(4594), 327–329. https://doi.org/10.1126/science.6836276 — CR ✔; [A] PMID 6836276 (hier erneut gelesen); [W02].
59. Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 — CR ✔; [A] PMID 1766652; [W12].
60. Pelli, D. G., & Tillman, K. A. (2008). The uncrowded window of object recognition. *Nature Neuroscience, 11*(10), 1129–1135. https://doi.org/10.1038/nn.2187 — CR ✔; [A] PMID 18828191 (hier erneut gelesen); [W02].
61. Proctor, R. W., & Schneider, D. W. (2018). Hick's law for choice reaction time: A review. *Quarterly Journal of Experimental Psychology, 71*(6), 1281–1299. https://doi.org/10.1080/17470218.2017.1322622 — CR ✔; [A] PMID 28434379 (hier erneut gelesen); [W12].
62. Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 — CR ✔ (online 2019); [A] PMID 31823223; Tabelle 4 und Zusatzstellen als PMC-XML [V] gelesen (PMC7280355).
63. Rizzolatti, G., Riggio, L., Dascola, I., & Umiltá, C. (1987). Reorienting attention across the horizontal and vertical meridians: Evidence in favor of a premotor theory of attention. *Neuropsychologia, 25*(1A), 31–40. https://doi.org/10.1016/0028-3932(87)90041-8 — CR ✔; [A] PMID 3574648.
64. Roth, T., Sokolov, A. N., Messias, A., Roth, P., Weller, M., & Trauzettel-Klosinski, S. (2009). Comparing explorative saccade and flicker training in hemianopia: A randomized controlled study. *Neurology, 72*(4), 324–331. https://doi.org/10.1212/01.wnl.0000341276.65721.f2 — CR ✔ (Crossref: ohne Untertitel); [A] PMID 19171828 (hier erneut gelesen); [D03].
65. Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do “brain-training” programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 — CR ✔; [A] PMID 27697851 (hier erneut gelesen); [W01–W05].
66. Soukoreff, R. W., & MacKenzie, I. S. (2004). Towards a standard for pointing device evaluation, perspectives on 27 years of Fitts' law research in HCI. *International Journal of Human-Computer Studies, 61*(6), 751–789. https://doi.org/10.1016/j.ijhcs.2004.09.001 — CR ✔; [A-W] Abstract über die Autorenseite; [W09].
67. Temple, J. G., Warm, J. S., Dember, W. N., Jones, K. S., LaGrange, C. M., & Matthews, G. (2000). The effects of signal salience and caffeine on performance, workload, and stress in an abbreviated vigilance task. *Human Factors, 42*(2), 183–194. https://doi.org/10.1518/001872000779656480 — CR ✔; [W02, D04].
68. Whitney, D., & Levi, D. M. (2011). Visual crowding: A fundamental limit on conscious perception and object recognition. *Trends in Cognitive Sciences, 15*(4), 160–168. https://doi.org/10.1016/j.tics.2011.02.005 — CR ✔; [A] PMID 21420894 (hier erneut gelesen); [W12].
69. Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 — CR ✔; [A] PMID 25859198 (hier erneut gelesen); [W01–W11].

### D.4 Geprüft, aber bewusst nicht verwendet

- **Muchnick, B.** und **Mountford, J.** (Praxisperspektive des Auftraggebers): keine konkrete einschlägige Publikation gefunden; ein Lehrbuch gleichen Autorennamens („Clinical Medicine in Optometric Practice“) ist nicht zum Thema und wurde nicht geprüft. **Nicht verwendet.**
- Bahill, A. T., Adler, D., & Stark, L. (1975): „Most naturally occurring human saccades have magnitudes of 15 degrees or less“ (*Investigative Ophthalmology*) – weder über Crossref noch über PubMed-Titelsuche auffindbar → **nicht aufgenommen**; stattdessen Stahl (1999) und eigene Geometrie (H1).
- Theeuwes, J., Kramer, A. F., Hahn, S., & Irwin, D. E. (1998), https://doi.org/10.1111/1467-9280.00071 – Zahl (30–40 %) nur über Sekundärangaben [S, W04] → nicht verwendet.
- Mackworth (1948): Zahlen („10–15 % in 30 min“) nur über Sekundärquellen [S, W02] → nur qualitativ.
- Cronbach, L. J., & Furby, L. (1970), https://doi.org/10.1037/h0029382 – Metadaten ✔, kein Abstract; nicht nötig.
- Appelbaum, L. G., & Erickson, G. (2018), https://doi.org/10.1080/1750984X.2016.1266376 – Übersichtsarbeit zu digitalem Sehtraining im Sport; für diese Übung nicht nötig (siehe W04/W05).
- Posner, M. I. (1980), https://doi.org/10.1080/00335558008248231 – Metadaten ✔, kein Abstract; Inhalt über Deubel & Schneider/Kowler abgedeckt.
- **Pronk-Spannweite „30–130 ms“:** Die Angabe in `docs/wissenschaft/README.md` und der Spezifikation „Touchscreens messen 30–130 ms zu lang“ entspricht nicht ganz den Tabellenwerten (Touch-Smartphones im Mittel ≈ 58–70 ms; Laptops im Mittel bis ≈ 133 ms; Einzelwerte der Touchgeräte ≈ 45–131 ms; „30 ms“ erscheint nur als Abstand zweier Häufungsmaxima). Hier wird **≈ 58–70 ms für Smartphones** verwendet; für **Tablets liegt keine Messung** vor.

### D.5 Bibliografische Besonderheiten

- Crossref nennt für Dafoe et al. das Jahr 2006 (online); Band 179 trägt 2007. Kowler (2011): Crossref-Titel „past 25years“. Saslow (1967): Crossref nur Anfangsseite 1024. Abadi (2002): Crossref nennt nur Abadi, PubMed Abadi & Bjerre. Pollock et al. (2019): Crossref ohne Campbell. Handler & Fierson (2011): Crossref nennt nur die beiden Erstautor:innen. Fischer & Ramsperger (1984) und Baloh et al. (1975): Seitenzahlen aus PubMed (191–195 bzw. 1065–1070), Crossref nur Anfangsseite.
