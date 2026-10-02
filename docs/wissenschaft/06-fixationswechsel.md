# Vier Buchstabentafeln im Wechsel („4 Chart Saccades“) – Vergleich der Übung mit der Studienlage

*Übung 905 „4-Ziele-Wechsel“ · Vorbild: klassische Sehtherapie-Übung „Four Square / 4 Chart Saccades“ mit vier Hart-Chart-Tafeln (Quellen siehe „Zur Quelle“) · Stand: 02.10.2026 · ersetzt die erste Fassung dieses Dokuments (siehe „Was wir bei der ersten Fassung falsch verstanden haben“)*

> **Wofür dieses Dokument da ist:** Grundlage für Übungsdesign, Beratung im Geschäft und Website-Texte (DE + IT) der
> Trainingsplattform von Bio-Optik Flaim (Tablet/Touchscreen, Browser, keine Benutzerkonten, Ergebnisse nur lokal) für die
> Übung **4-Ziele-Wechsel** (905). Es vergleicht **die klassische Übung** (vier Tafeln mit Buchstabenrastern, ein Buchstabe von jeder Tafel im Wechsel, laut gelesen)
> und **ihre Touch-Umsetzung** mit der Studienlage: **was die Wissenschaft stützt**, **wo es schwach ist** und **welche Änderungen und Entscheidungen die Blickfit-Umsetzung deshalb hat**.
> Jede zitierte Quelle wurde über Crossref (DOI) und – wo möglich – PubMed-, Europe-PMC-, Verlags- oder PMC-Abstract geprüft; der Prüfstand steht im
> [Anhang A](#anhang-a-verifikationshinweise) und in `docs/uebungskatalog/literatur/lit-W13-fixationswechsel.md`.
> Eigene Herleitungen und Vorschläge sind als **Herleitung** bzw. **Designvorschlag**, Vermutungen als **Annahme** markiert. Die **Zahlen der Übung sind grob**;
> maßgeblich ist die Stufentabelle der Übung (`src/exercises/vier-ziele-wechsel/logic.ts`).
> Allgemeine Trainingsprinzipien, Zeitmessung im Browser und Rechtliches stehen in
> [Dokument 01](01-reaktion-und-impulskontrolle.md), Blick- und Zielbewegungen in [Dokument 02](02-bewegung-verfolgen.md), Konzentration und Denken in
> [Dokument 04](04-konzentration-und-denken.md); hier steht nur Ergänzendes. **Kein Rechtsrat, keine medizinische Beratung.**

## Auf einen Blick

1. **Die Übung:** Vier Tafeln (Hart-Chart-Raster, in den Quellen meist 5 × 5 Buchstaben) hängen als Quadrat an der Wand; man liest **einen Buchstaben von jeder Tafel im Wechsel** (erster Buchstabe jeder Tafel, dann der zweite, …), laut, mit ruhigem Kopf; zur Steigerung Metronom, größere Tafelabstände, spaltenweise statt zeilenweise (Lam, 2020; Emergent VT; Chalapathi, 2020; Marinoff, 2016). Blickfit setzt das als Tippen auf einem Tablet um.
2. **Praxisangaben sind nicht belegt.** Anbieter nennen bessere Koordination, Fokussierflexibilität, periphere Wahrnehmung, kognitive Verarbeitung, „Verbesserungen nach einigen Tagen“, Lesefluss, Sportleistung. Zur Übung fand ich **keine kontrollierte Studie**; PubMed-Treffer zu „Hart chart“ betreffen die Akkommodation (z. B. Balke et al., 2022).
3. **Die Aufgabe verlangt zwei Arten von Blicksprüngen:** kleine Sprünge von Zelle zu Zelle in der Tafel (≈ 1,3–1,7°) und große Wechsel zwischen den Tafeln (am Tablet ≈ 12–25°; im Original liegt die Lücke zwischen den Tafeln bei ≈ 6–10°; Herleitung).
4. **„Zeit von Tipp zu Tipp“ ist kein Sakkadenmaß.** Sie enthält Suchen, Blickwechsel (Dauer bei 12–25° nur ≈ 32–68 ms; Baloh et al., 1975), Erkennen und vor allem den **Fingerweg** (≈ 0,3–0,6 s zwischen den Tafeln; Fitts; Herleitung). Die Anteile überlappen (Gribble et al., 2002) und lassen sich nicht herausrechnen. Blickfit zeigt deshalb nur „Zeit von Tipp zu Tipp“.
5. **Richtungen und „Sprungkosten“ sind Wege.** Die Weglänge allein erzeugt zwischen waagerechten und senkrechten Wechseln einen Unterschied von ≈ 80–100 ms (Herleitung) – mehr als die Richtungsunterschiede der Sakkadenlatenz (≈ 20–50 ms; Greene et al., 2020).
6. **Viele Tipps je Runde (36–100) machen die Stufenentscheidung ruhiger** als die kurzen Segmente der ersten Fassung (Herleitung); Richtungsmittel brauchen trotzdem Wiederholungen (Schwelle 8 ist ein Kompromiss).
7. **Der Buchstabe ist für das Tippen nicht nötig**, wenn die Regel „nächste Position“ lautet: Man kann die Folge ohne Erkennen der Buchstaben antippen. Im Original sichert das laute Lesen die Erkennung. Das ist ein **Entscheidungspunkt für den Bau**.
8. **Positionhalten im Kopf = Arbeitsgedächtnis.** Vier Tafeln entsprechen etwa der mittleren Kapazität von ≈ 4 Einheiten (Cowan, 2001); Menschen halten Wissen bei Hand-Auge-Aufgaben ungern im Kopf (Ballard et al., 1995). Die blassen Buchstaben der Touch-Fassung sind ein **externer Speicher**.
9. **Dichte Raster bringen Crowding** (Bouma-Gesetz; Pelli & Tillman, 2008): Bei Zellabständen von 1,3–1,7° sind Nachbarn nur bis etwa 2,7–3,3° Exzentrizität frei von Crowding (Herleitung).
10. **Studienlage: Übung in der Aufgabe ja, Transfer offen.** Sakkaden-, Such- und Zeigeaufgaben werden mit Übung schneller (Karantinos et al., 2025; Montenegro & Edelman, 2019); die Übertragung im Labor ist uneinheitlich (Jóhannesson et al., 2018; Di Russo et al., 2003); bei trainingsähnlichem Test werden Effekte stark überschätzt (Reaktionszeit SMD 2,66 vs. 0,50; Guo et al., 2025); lesenahe Sakkadentrainings bei Kindern stammen aus kleinen oder herstellernahen Studien (Facchin et al., 2025; Leong et al., 2014; Dodick et al., 2017); für Lernstörungen stützt die Evidenz Augenübungen nicht (Handler & Fierson, 2011). **Alltagstransfer: nicht belegt.**
11. **Blickfit-Entscheidungen:** Zeit von Tipp zu Tipp statt Sakkade; Stufen mit einem Parameter je Schritt; Anpassung am Rundenende; Richtungsauswertung erst ab genügend Wiederholungen; Ermüdungsvergleich nur grob; **keine Normwerte**, kein Vergleich mit anderen, keine „Test“-Sprache; Praxisangaben der Anbieter nicht übernommen; **kein Patientenname oder -code im Browser**.

## Evidenzskala

Wie in [Dokument 04](04-konzentration-und-denken.md): **stark** (mehrere große bzw. kontrollierte Studien oder Metaanalysen, im Wesentlichen übereinstimmend), **mittel** (einzelne größere RCTs oder mehrere kleinere, übereinstimmende Studien – mit klaren Einschränkungen),
**schwach** (kleine, nicht randomisierte oder korrelative Studien, widersprüchliche Befunde), **fehlend** (keine Studie zur konkreten Aussage oder direkt getestet und nicht bestätigt), **unklar** (Befunde in verwandten Aufgaben, Übertragung nicht untersucht).
**Transfer** heißt: Überträgt sich die Verbesserung auf *andere* Aufgaben? *Nah* = ähnliche Aufgaben, *fern* = Alltag, Verkehr, Beruf. Alle Einstufungen gelten für die **Aufgabenart**; die Übung 905 ist nicht untersucht.

## Übersicht: Übung, Studienlage und Blickfit-Entscheidung

| Punkt der Übung | Was die Wissenschaft stützt | Wo es schwach ist | Blickfit-Entscheidung |
|---|---|---|---|
| **Blick- und Aufmerksamkeitswechsel** zwischen vier Tafeln | Aufmerksamkeit und Sakkadenziel sind eng gekoppelt (Deubel & Schneider, 1996; Kowler et al., 1995) | nichts zur Übung selbst; Premotor-Theorie nicht nötig | Aufgabe beschreiben als „Buchstaben im Wechsel lesen und antippen“; keine Aussage über Aufmerksamkeitswirkung |
| **Leseregel**: ein Buchstabe von jeder Tafel, dann der nächste | beschrieben bei Lam, Emergent, Chalapathi; Blickbewegungen in Buchstabenrastern ähneln dem Lesen und Suchen (Rayner, 1998; 2009) | Reihenfolge der Tafeln, Rastergröße, Tempo sind in den Quellen offen; keine Studie zur Regel | Regel wie im Original; Stufenparameter dokumentiert |
| **Tafelreihenfolge** | Quellen: oben links → oben rechts → unten links → unten rechts (Lam; Emergent); „spielt keine Rolle, wichtig ist die Position“ (Lam) | Uhrzeigersinn, Zickzack, wechselnd sind Festlegungen der Spezifikation | als Stufenparameter; Reihenfolge der Quellen als mögliche Option; Text darf den Uhrzeigersinn nicht als „klassisch“ ausgeben |
| **Wechsel-Granularität** (Buchstabe, 2 Buchstaben, Zeile) | Quellen: je Buchstabe (Lam, Emergent, Chalapathi) oder je Zeile (Marinoff) | „Sprungkosten“ sind vor allem Fingerweg | Stufenparameter; Sprungkosten nur als Vergleich mit früher |
| **Positionhalten im Kopf** (Arbeitsgedächtnis) | Kapazität ≈ 4 Einheiten (Cowan, 2001); Auge als „externer Speicher“ (Ballard et al., 1995) | für diese Aufgabe nicht untersucht | blasse Buchstaben zeigen den Stand; `arbeitsgedaechtnis` nur 1 |
| **Dichte Buchstaben**, Crowding | kritischer Abstand ≈ ½ Exzentrizität (Pelli & Tillman, 2008; Whitney & Levi, 2011); enge Abstände verändern Verwechslungen (Liu & Arditi, 2001) | Zellabstand und Zielgröße für Touch gegeneinander abzuwägen | Schrift ≥ 28 px auf Stufe 1, nicht unter ≈ 22 px; Zielfläche ≥ ≈ 48 px |
| **Führung** (Ring um Buchstaben/Tafel, dann keine) | Suche wird von Merkmalen, Verlauf und Wert gesteuert (Wolfe & Horowitz, 2017) | für diese Übung nicht untersucht | Führung abbauen; ein Parameter je Stufe |
| **Zeit von Tipp zu Tipp** (Touch) | Zeitkomponenten (Saslow, 1967; Baloh et al., 1975; Fitts) | **kein** Sakkadenmaß; Fingerweg dominiert; Anteile überlappen | Anzeige „Zeit von Tipp zu Tipp“; Hinweis: Blick wird nicht gemessen |
| **Richtungen** getrennt | Sakkaden nach oben schneller als nach unten, waagerecht schneller als senkrecht (20–50 ms; Dafoe et al., 2007; Greene et al., 2020) | Weglänge erzeugt ≈ 80–100 ms; wenige Wiederholungen je Klasse | Anzeige erst ab genügend Wiederholungen, mit Unsicherheit, als „Wege“ |
| **Ermüdung** innerhalb einer Runde | Vigilanzabfall bei langer Beobachtung (Nuechterlein et al., 1983) | Runden von 40–150 s; Üben, Ermüdung, Verlauf im Raster überlagern | „Erste vs. letzte Hälfte“ nur Hinweis mit Vorbehalt |
| **Übungswirkung / Transfer** | Übungseffekt in Sakkaden-, Zeige- und Reaktionsaufgaben | Transfer unklar; Alltag nicht belegt; Überschätzung bei trainingsähnlichem Test | „In der Übung wirst du besser; ob das im Alltag hilft, ist nicht belegt.“ |
| **Praxisangaben der Anbieter** (periphere Wahrnehmung, „nach einigen Tagen“, Lesefluss, Sport) | – | nicht belegt; Selbstberichte ohne Kontrolle | nicht übernommen |
| **Normwerte, Vergleiche** | – (keine Normen für diese Aufgabe) | – | **keine**; Werte nur im Vergleich mit sich selbst auf diesem Gerät |

### Zur Quelle: die klassische Übung

- **Quellen (gelesen am 02.10.2026):** Lam (Insight Vision Optometry), „Vision Therapy Exercise: 4 Chart Saccades Exercise“ (YouTube, 18.12.2020; englische **Untertitelspur** gelesen, das Video selbst nicht angesehen); Emergent VT, „Four Charts“; Marinoff (2016, Volltext, Fallberichte, „Four Corner Hart Chart Saccades“); Chalapathi (2020, Optom Vis Perf 8(3), 156; eine Seite, Meinung der Autorin); Bernell/Jutron „Four Corner Hart Chart Set“ (Produktbeschreibung); Vivid Visions, „Week 8: Four Square Vision Training“ (sichtbarer Teil; Rest hinter Anmeldung); Taub (2014) und Vision & Learning Center (Hart Chart allgemein; keine Vier-Tafel-Übung). Die Seite „Four Corner Fixation“ des Vision & Learning Center beschreibt eine **andere** Übung.
- **Sicher:** vier Tafeln (meist 5 × 5), anfangs etwa 1 Fuß (30 cm) Abstand, 6 bis 10 Fuß Betrachtungsabstand, laut lesen, Kopf ruhig; **eine Position je Tafel im Wechsel** (Marinoff: eine Zeile je Tafel); Tafelreihenfolge oben links → oben rechts → unten links → unten rechts; Steigerung durch Metronom (Lam: ≈ 60/min), Abstand, Spaltenreihenfolge; Ziel laut Anbieter: Sakkaden, Genauigkeit und Geschwindigkeit.
- **Nicht angegeben:** Reihenfolge der Tafeln bei Chalapathi, Buchstabengröße und Tafelmaße (außer Bernell: 36 pt), Dauer, Häufigkeit, Zielwerte, Fehlerzählung, jede Messung, jede Wirkung.
- **Annahmen:** ein Metronomschlag = ein Buchstabe; Uhrzeigersinn, Zickzack und wechselnde Reihenfolge sind Festlegungen der Blickfit-Spezifikation; die Hart-Chart-Buchstaben nehmen zeilenweise ab (Hinweis des Auftraggebers, nicht in den Quellen).
- **Das Original wird nicht bewertet, nur eingeordnet.** Es gibt keine Leistungsnormen, die zu prüfen wären; die Spezifikation verlangt ausdrücklich „kein Anspruch auf Wirkung“.

## Was wir bei der ersten Fassung falsch verstanden haben und was daraus folgt

**Was war:** Die erste Fassung dieser Übung entstand nach einer knappen Beschreibung des Auftraggebers einer „4-Ziele-Fixationswechsel“-App, ohne Titel, Website oder Video. Sie setzte um: **ein Zeichen pro Ecke**, zufällig ein **Ring** als aktuelles Ziel, antippen, Pause, neues Ziel; gemessen wurde „Reaktionszeit Ziel → Touch“ nach Richtung. Die Dokumente (905, W13, dieses) beschrieben diese Fassung ausführlich, einschließlich der Auslassungsfrist, der Ablenker-Stufen und der 12-Ziel-Segmente.

**Was falsch war:** Der Auftraggeber verwies dann auf die klassische Sehtherapie-Übung (Vivid Visions „Four Square Vision Training“; Lam „4 Chart Saccades“). Sie hat **vier Tafeln mit vielen Buchstaben**, und man liest **einen Buchstaben von jeder Tafel im Wechsel**. Die erste Fassung war eine Einzelziel-Aufgabe mit zufälliger Reihenfolge – eine andere Übung.

**Was daraus folgt:**

| Erste Fassung | Neue Fassung | Folge |
|---|---|---|
| ein Zeichen pro Ecke, Ring zeigt zufällig ein Ziel | je Ecke eine Tafel mit Buchstabenraster; feste Leseregel (ein Buchstabe pro Tafel im Wechsel); blasse getippte Buchstaben zeigen den Stand | Leseregel, Wechsel-Granularität, Positionhalten, Crowding, Lesen in Rastern statt Reiz-Latenz, Auslassungsfrist und Ablenker |
| „Reaktionszeit Ziel → Touch“ (Reiz beginnt, man reagiert) | „Zeit von Tipp zu Tipp“ (es gibt keinen Reiz mit Beginn; Eigentempo) | andere Komponenten (Suchen, Fingerweg, Überlappung); „Reaktionszeit“ entfällt |
| Stufen: Größe, Rand, Pause, ähnliche Zeichen, Symbole, Ablenker | Stufen: Buchstabengröße, Tafelgröße, Tafelabstand, Wechsel nach 1 oder 2 Buchstaben, Tafelreihenfolge, Führung, Buchstabenmenge | ein Parameter je Schritt bleibt; Tabelle dokumentiert |
| Anpassung nach ≈ 12 Zielen, Stufenwechsel mitten im Block | Anpassung am Rundenende (36–100 Tipps); Stufe bleibt in der Runde gleich | weniger Rauschen (H6), sauberer Hälftenvergleich |
| Ring zeigt das Ziel → das Zeichen muss nicht erkannt werden | Position wird getippt → der Buchstabe muss nicht erkannt werden | derselbe Entscheidungspunkt in neuer Form (Abschnitt 1.4) |

**Was bleibt:** Touch-Messfehler (Pronk et al., 2020), Fitts'sches Gesetz, Richtungsklassen als Wegklassen, Zuverlässigkeit von Differenzwerten, Ermüdung nur grob, keine Normwerte, keine Wirkversprechen, kein Patientencode im Browser.

**Lehre:** Bei einer Beschreibung ohne Titel und Quelle zuerst nach der Originalübung suchen und die Unsicherheit im Dokument sichtbar machen. Die Praxisperspektive „Muchnick/Mountford“ (Hinweis des Auftraggebers in der ersten Fassung) bleibt ungeprüft und wird nicht als Quelle verwendet.

**Entwicklungsnotiz (keine Quelle):** Ein Versuch, den Blick mit der Frontkamera zu schätzen, wurde getestet und wieder entfernt, weil er zu ungenau war. Die App misst den Blick nicht.

---

## 1. Die Übung: vier Buchstabentafeln im Wechsel

### 1.1 Was die Quellen beschreiben und was Blickfit daraus macht

**Original (Sehtherapie):** vier 5 × 5-Tafeln als Quadrat an der Wand in Augenhöhe, anfangs etwa 1 Fuß Abstand, Betrachtungsabstand 6–10 Fuß; zuerst der erste Buchstabe jeder Tafel (oben links, oben rechts, unten links, unten rechts), dann der zweite … bis zum letzten; laut lesen; Kopf ruhig; Steigerung durch Metronom, größere Abstände, Spaltenreihenfolge (Lam, 2020; Emergent VT; Chalapathi, 2020). Marinoff (2016) beschreibt dieselbe Aufstellung mit einer **Zeile** je Tafel.

**Blickfit (Touch):** in den Ecken je eine Tafel (Raster aus Buchstaben, etwa 3 × 3 bis 5 × 5 oder 6 × 4); man **tippt die Buchstaben in der Leseregel an** (Position p der Tafel 1 → Position p der Tafel 2 → … → Position p+1 der Tafel 1 …); getippte Buchstaben werden **blass**; Falsches Tippen = Fehler (weiches ✗, kein Strafabzug), Wiederholung am richtigen Ziel; ein Tipp in die Leere zählt nicht. Führung: Ring um den nächsten Buchstaben → Ring um die nächste Tafel → keine. Stufen mit **einem** geänderten Parameter je Schritt (Buchstabengröße, Tafelgröße, Tafelabstand, Wechsel nach 1 oder 2 Buchstaben, Tafelreihenfolge, Führung, Buchstabenmenge). Eine Sitzung = 3 Runden; am Rundenende ≥ 90 % richtig und gleichmäßige Zeit → eine Stufe schwerer, 75–89 % gleich, < 75 % leichter.

**Messung (nur Touch):** Zeit von Tipp zu Tipp (erster Tipp einer Runde zählt nicht), Fehler, Rundendauer, erste vs. letzte Hälfte, Tafelwechsel nach Richtung (ab Schwelle 8), bei Wechsel nach 2 Buchstaben die „Sprungkosten“.

### 1.2 Was sagt die Wissenschaft

**Sakkaden: Latenz, Amplitude, Richtung**
- **Latenz.** Hängt von der Reizfolge ab: ≈ 200 ms bei gleichzeitigem Ende des alten und Beginn des neuen Reizes, ≈ 150 ms mit Lücke, ≈ 250 ms bei Überlappung (Saslow, 1967; Abstract). In einer Tippfolge mit bekannter Reihenfolge ist der nächste Ort vorhersehbar; ob der Blick schon vor dem Tipp springt, ist in dieser Aufgabe nicht gemessen (**Annahme**).
- **Amplitude.** Die Sakkadendauer steigt im Mittel um 2,7 ms pro Grad (Baloh et al., 1975; n = 25); bei 12–25° sind das ≈ 32–68 ms (Herleitung ohne Achsenabschnitt). Innerhalb der Tafel liegen die Sprünge bei ≈ 1,3–1,7°.
- **Richtung.** Horizontale Sakkaden hatten kürzere Latenz als vertikale; nach oben waren Sakkaden schneller als nach unten (Dafoe et al., 2007; Abegg et al., 2015); in einer Metaanalyse über 23 Datensätze waren Fixationsdauern vor Aufwärts-Sakkaden im Mittel **25 ms kürzer** (g = 0,97; Greene et al., 2020), die Einleitung nennt für Ziele im oberen Gesichtsfeld 20–50 ms kürzere Latenz. Der Effekt folgt der Kopfachse (Honda & Findlay, 1992).
- **Alter und Streuung.** Junge Erwachsene hatten die schnellsten Sakkadenreaktionszeiten und die kleinste Streuung, Kinder (5–8 J.) waren langsam und streuten stark, Ältere (60–79 J.) waren langsamer (Munoz et al., 1998; n = 168).
- **Kopf.** Der Bereich, in dem Gesunde nur die Augen bewegen, war 35,8 ± 31,9° breit (Mittel ± SD) und je Person reproduzierbar (Stahl, 1999): „Kopf ruhig“ ist im Original Teil der Übung, in der Touch-Fassung eine Bitte, die nicht jede Person gleich leicht erfüllt.

**Aufmerksamkeit, Fixation und Positionhalten**
- **Kopplung.** Unterscheidung am Sakkadenziel war am besten, an Nachbarn nahe Zufall (Deubel & Schneider, 1996); es ist nicht möglich, schnell und genau zu einem Ziel zu blicken und zugleich anderswo genau zu urteilen (Kowler et al., 1995; Hoffman & Subramaniam, 1995).
- **Rückkehr.** An einem Ort, von dem die Aufmerksamkeit abgezogen wurde, werden Reize verzögert beantwortet („Inhibition of Return“; Klein, 2000). Bei einer festen Vier-Tafel-Folge kehrt der Blick nach vier Wechseln zur ersten Tafel zurück; ob das etwas ausmacht, ist **nicht untersucht** (Annahme).
- **Positionhalten = Arbeitsgedächtnis.** Das Arbeitsgedächtnis fasst im Mittel etwa vier Einheiten (Cowan, 2001); bei natürlichen Hand-Auge-Aufgaben vermeiden Menschen es, Wissen im Kopf zu halten, und holen Information durch erneutes Hinsehen erst kurz vor Bedarf (Ballard et al., 1995). In der Touch-Fassung tragen die **blassen Buchstaben** den Stand; gemerkt werden müssen nur die Tafelreihenfolge und bei Wechsel nach 2 Buchstaben ein Zähler. Im Original muss man Position und Tafel selbst im Kopf halten – Lam: „what matters is the position of the letter that you’re looking for“; Emergent: darauf achten, wo der Buchstabe im Verhältnis zu den anderen steht.
- **Fixationsstabilität.** Wurfscheibenschützen (n = 7) hielten die Fixation über 1 min auch mit Ablenkern stabiler als Kontrollen (n = 8; Di Russo et al., 2003); Querschnitt, kein Trainingsbeleg.

**Lesen von Buchstabenrastern, Suche, Crowding**
- **Lesen und Suchen.** Blickbewegungen beim Lesen und bei visueller Suche spiegeln die Verarbeitung; Wahrnehmungsspanne und Integration über Sakkaden hinweg sind Grundthemen (Rayner, 1998; Rayner, 2009). Wie die Suche gelenkt wird (Auffälligkeit, Zielmerkmale, bisheriger Suchverlauf, Wert), fassen Wolfe & Horowitz (2017) zusammen – bei der Touch-Fassung wirkt der **bisherige Suchverlauf** über die blassen Buchstaben, die Führung (Ring) als von außen gesetzter Hinweis.
- **Crowding.** Der kritische Abstand ist etwa die halbe Exzentrizität (Bouma-Gesetz; Bouma, 1970; Pelli & Tillman, 2008; Whitney & Levi, 2011; Übersicht Strasburger et al., 2011). Bei Zellabständen von 1,3–1,7° sind Nachbarbuchstaben nur bis etwa 2,7–3,3° Exzentrizität frei von Crowding (**Herleitung**): Buchstaben in dichten Rastern sind ohne Hinsehen nicht einzeln erkennbar. Enge Abstände verändern die Verwechslungsmuster (Liu & Arditi, 2001). Marinoff (2016) berichtet für eine Person mit Zentralskotom Schwierigkeiten bei der Vier-Ecken-Übung wegen Crowding.
- **Ähnlichkeit.** Suchen wird schwerer, wenn Ziel und Nichtziele ähnlich sind (Duncan & Humphreys, 1989). B D P R sind **nicht gleichmäßig ähnlich**: In der eigenen Auswertung der Tabellen von Mueller & Weidemann (2012; 118 bzw. 96 Studierende, 2-AFC, Großbuchstaben, 325 Paare, Rang 1 = niedrigste Genauigkeit) lag **B–P** unter den schwerer unterscheidbaren Paaren (Rang 58 bzw. 50), **D–R** unter den leichtesten (Rang 299 bzw. 290); Gruppenmittel einer Schrift mit Maske, keine Aussage für unsere Schrift.

**Fitts'sches Gesetz und Hand-Auge-Koordination**
- **Weg und Zielbreite.** Bewegungszeit MT = a + b · log₂(A/W + 1) (Shannon-Form; MacKenzie, 1992; Fitts, 1954). In Fitts' Originaldaten (Stift) lag die Steigung bei 122–139 ms/bit (7,2–8,2 bit/s); über Geräte und Studien reicht der Index von 1,1 bis 13,7 bit/s (MacKenzie, 1992). Für **kleine** Ziele ist das klassische Modell bei Fingereingabe unzureichend (Bi et al., 2013); Zellen von ≈ 9 mm liegen am unteren Rand dessen, was groß heißt. Die Web-Richtlinien verlangen mindestens 24 × 24 CSS-px (WCAG 2.2, SC 2.5.8) und empfehlen 44 × 44 (SC 2.5.5).
- **Blick vor Hand.** Der Blick geht der Zeigebewegung voraus und bleibt am Zielpunkt verankert; eine Sakkade zum nächsten Ziel während der Zeigebewegung ist um im Mittel 155 ms verzögert (Neggers & Bekkering, 2000). Der Arm-Muskel ist bei schnellen Zeigebewegungen meist **vor** dem Sakkadenbeginn aktiv, Richtung und Weite der Armbewegung sind vor der Sakkade festgelegt (Gribble et al., 2002) – Auge und Arm werden **parallel** vorbereitet. Im Alltag führt der Blick die Handlung (erste objektbezogene Fixation im Mittel 0,56 s vorher; Land et al., 1999) – ein Beschreibungsbefund, kein Trainingsbeleg.

**Wahlreaktion**
- Vier Tafeln sind vier Orte, aber die Antwort ist **der Ort selbst** (räumlich passend); der Hick-Anteil dürfte klein sein (Proctor & Schneider, 2018). Die „Wahl“ ist vor allem eine räumliche Auswahl nach fester Regel.

**Touch und Gerät**
- Web-App auf dem Smartphone: Reaktionszeiten **zu lang** gemessen (Roboterfinger): iPhone 6S im Mittel +57,6–58,0 ms, Galaxy S7 +66,1–69,8 ms, Einzelwerte ≈ 45–131 ms; Laptops im Mittel +61,9 bis +132,9 ms; **Tablets nicht gemessen**; Streuung je Gerät ≈ 7 ms. Absolute Werte sind stärker betroffen als Unterschiede innerhalb einer Person (Pronk et al., 2020; Tabelle 4).

**Vorsichtsgruppen (Einschätzungen, keine medizinischen Aussagen)**
- **Nystagmus:** Fixation ist anders (224 Personen mit infantilem Nystagmus: Amplituden 0,3–15,7°, Frequenzen 0,5–8 Hz; Abadi, 2002); aus Zeiten darf nichts über das Auge geschlossen werden.
- **Schielen, Amblyopie:** Auge-Hand-Zeiten sind anders (längere Beschleunigungsphase des Greifens nach der Zielfixation, mehr Korrektur-Sakkaden; n = 46; Niechwiej-Szwedo et al., 2014); Werte nicht mit Gleichaltrigen vergleichen.
- **Gleitsicht:** Neue Gleitsichtträger nutzten mehr Kopfbewegungen bei Blickwechseln (n = 10; Hutchings et al., 2007); die Anpassung ist individuell verschieden (Alvarez et al., 2017). Die oberen Ecken liegen ≈ 7–9° über der Blickmitte (Herleitung).
- **Bildschirmbeschwerden:** 64–90 % der Computernutzer berichten Sehbeschwerden wie Augenbelastung, Kopfschmerz, trockene Augen (Rosenfield, 2011); die Lidschlagrate sinkt beim Bildschirmsehen im Mittel auf ein Fünftel (Patel et al., 1991) – kurze Einheiten, bewusst blinzeln. Zu Migräne gibt es keine geprüfte Quelle (Vorsichtsempfehlung).

**Evidenz:** Sakkaden-Grundlagen **stark** · Kopplung Aufmerksamkeit–Blick **stark** · Fitts **stark** · Übung verbessert die Aufgabe **mittel** · naher Transfer **unklar** · Alltag **fehlend**.

### 1.3 Wo die Übung wissenschaftlich schwach ist

| Punkt | Warum schwach | Quelle / Einordnung |
|---|---|---|
| „Trainiert die Sakkaden / Genauigkeit und Geschwindigkeit“ (Anbieter) | keine kontrollierte Studie zur Übung gefunden; Hart Charts sind in Studien Akkommodations-Übungen oder Teil von Mehrkomponenten-Programmen | Balke et al., 2022; Vasudevan et al., 2009; Ciuffreda & Ordonez, 1998 (alle klein, ohne oder mit schwacher Kontrolle) |
| „Erweitert die periphere Wahrnehmung“, „Verbesserungen nach einigen Tagen“ | keine Quelle; Selbstbericht ohne Kontrollgruppe | Vivid Visions (Praxisangabe) |
| „Verbessert den Lesefluss“ | Kinderstudien mit anderen Aufgaben, Herstellerbezug oder kleinen Gruppen; Konsenspapier: Augenübungen bei Lernstörungen nicht belegt | Leong et al., 2014; Dodick et al., 2017; Facchin et al., 2025; Handler & Fierson, 2011 |
| „Zeit von Tipp zu Tipp“ als Maß für Sakkaden oder Fixationswechsel | Die Zeit enthält Suchen, Blickwechsel **und Fingerweg**; ohne Eye-Tracker nicht trennbar; der Fingerweg ist vermutlich der größte Posten | Baloh et al., 1975; Fitts; Gribble et al., 2002 (Abschnitt 2) |
| „Richtungen“ getrennt | Richtung = Weg; der Weglängeneffekt (≈ 80–100 ms) übertrifft die Sakkadenasymmetrie (≈ 20–50 ms) | MacKenzie, 1992; Greene et al., 2020 (Abschnitt 3) |
| „Sprungkosten“ bei Wechsel nach 2 Buchstaben | überwiegend Fingerweg (≈ 0,2–0,4 s Fitts-Unterschied) | Herleitung (Abschnitt 3.3) |
| „Ermüdung“ innerhalb einer Runde | Üben, Ermüdung und Verlauf im Raster überlagern; Pausenwirkung umstritten | Karantinos et al., 2025; Ariga & Lleras, 2011; Helton & Russell, 2012 (Abschnitt 4) |
| Buchstaben als „visuelle Diskrimination“ | Wenn die Position getippt wird, muss der Buchstabe nicht erkannt werden; B D P R sind nicht gleichmäßig ähnlich | Duncan & Humphreys, 1989; Mueller & Weidemann, 2012 (Herleitung) |
| „Fixation“, „periphere Wahrnehmung“ | werden weder gemessen noch erzwungen; nur Tippen ist erzwungen | – |
| Reihenfolge und Stufenfolge | keine Studie zur Reihenfolge der Tafeln oder zur Stufenfolge; Festlegung | – |
| Keine Normwerte, keine Wirkversprechen | für diese Aufgabe gibt es keine Normen; jede Einordnung wäre erfunden | Dokument 04, Abschnitt 10 |

### 1.4 Was Blickfit deshalb anders macht (Zahlen grob, maßgeblich ist die Stufentabelle der Übung)

| Änderung / Entscheidung | Grund | Quelle |
|---|---|---|
| **Regel wie im Original** (ein Buchstabe von jeder Tafel im Wechsel), Touch statt Vorlesen | das Vorlesen lässt sich auf dem Tablet nicht prüfen; Tippen ist die messbare Entsprechung | Lam, 2020; Chalapathi, 2020 |
| **Blasse getippte Buchstaben** als Stand | externer Speicher; Arbeitsgedächtnis wird nicht zum Engpass | Ballard et al., 1995; Cowan, 2001 |
| **Führung abbauen** (Ring um Buchstaben → Tafel → keine) | schrittweise vom geführten zum freien Suchen; je Schritt ein Parameter | Wolfe & Horowitz, 2017 (Herleitung) |
| **Stufen: ein Parameter je Schritt** (Buchstabengröße, Tafelgröße, Tafelabstand, Wechsel nach 1 oder 2 Buchstaben, Tafelreihenfolge, Führung, Buchstabenmenge); Tabelle dokumentiert und getestet | nur getrennte Änderung zeigt, **was** schwerer wurde; Größe und Weg gehen beide in die Fitts-Schwierigkeit ein | Fitts, 1954; MacKenzie, 1992 |
| **Anpassung am Rundenende** (≥ 90 % richtig **und** gleichmäßige Zeit → schwerer; 75–89 % gleich; < 75 % leichter) | mit 36–100 Tipps je Runde weniger Rauschen als bei 12 Zielen (Aufstieg bei wahrer Quote 85 %: ≈ 10–19 % statt ≈ 44 %); die Stufe bleibt ein **grober** Hauptwert | Herleitung (Binomial) |
| **Messgröße „Zeit von Tipp zu Tipp“**, **nicht** Sakkadenlatenz; im Ergebnistext: „Dein Blick wird nicht gemessen“ | Die Zeit ist eine Summe überlappender Anteile; ohne Eye-Tracker kein Sakkadenmaß | Saslow, 1967; Gribble et al., 2002 |
| **Median neben Mittelwert**, erster Tipp einer Runde zählt nicht; Zeiten nach Fehlern nicht mitteln (**Designvorschlag**) | Zeiten sind rechtsschief; nach einem Fehler enthält die Zeit die Korrektur | Herleitung |
| **Tafelwechsel nach Richtung ab genügend Wiederholungen** (Schwelle 8 der Spezifikation; sicher erst ab ≈ 25 je Klasse), mit Unsicherheit, „Wege, keine Augenwerte“ | Mittel aus wenigen Tipps sind unsicher; Richtung und Weg sind verknüpft | Hedge et al., 2018; Miller & Ulrich, 2013; Fitts (Herleitung) |
| **Sprungkosten** nur als Vergleich mit früher, ausdrücklich überwiegend Fingerweg | Fitts-Unterschied ≈ 0,2–0,4 s | Herleitung |
| **Ermüdungsvergleich nur grob:** erste vs. letzte Hälfte als Hinweis mit Vorbehalt, nur auf gleicher Stufe (die Stufe bleibt in der Runde gleich) | Üben, Ermüdung und Verlauf im Raster überlagern | Karantinos et al., 2025; Nuechterlein et al., 1983 |
| **Keine Normwerte, keine Altersvergleiche, keine Ranglisten, keine „Test“-Sprache** | keine Normen für diese Aufgabe; Diagnose-Nähe groß | Dokument 01, Abschnitt 4; Dokument 05, Abschnitt 5 |
| **Praxisangaben der Anbieter nicht übernommen** (periphere Wahrnehmung, „nach einigen Tagen“, Lesefluss, Sport, „mehr Hirnregionen“) | nicht belegt | Abschnitt 6 |
| **Kein Patientenname/-code im Browser** (kein Login, alles lokal); Gerät, Abstand, Brille, Hand und Stufe werden außerhalb der App notiert | Datenschutz, Zweckbestimmung | Dokument 01, Abschnitt 4 |
| **Touch-Hinweis:** „Touchscreens messen Zeiten zu lang“ (Smartphones im Mittel ≈ 58–70 ms; Tablets nicht gemessen) | absolute Zeiten sind gerätegebunden, Verlauf auf demselben Gerät ist robuster | Pronk et al., 2020 |
| **Bedienung:** Zielfläche je Buchstabe = Zellgröße, mindestens etwa 48 px; Schrift ≥ 28 px auf Stufe 1, nicht unter etwa 22 px; weiche Übergänge (≥ 100 ms), kein Blinken, **Farbe nie allein**, kein Rotblitz, keine Zeitstrafe | Sicherheit, Barrierefreiheit | WCAG 2.2 (SC 1.4.1, 2.5.8, 2.5.5) |
| **Metronom** ist eine genannte Variante der Übung (Chalapathi; Lam; Emergent) – mögliche spätere Takt-Stufe | Steigerung wie im Original; Tempo extern vorgegeben | Lam, 2020 |
| **Eye-Tracking nicht vorhanden** (Versuch mit Frontkamera entfernt, zu ungenau) | kein Blickmaß | Entwicklungsnotiz |

**Entscheidungspunkte für den Bau (Hinweis aus der Literaturprüfung):**
1. **Der Buchstabe ist für das Tippen nicht nötig** (Positionsregel). Dann messen „ähnliche Buchstaben“ und „Groß- und Kleinbuchstaben und Ziffern“ keine Unterscheidung, sondern verändern Dichte, Crowding und Suchen. Optionen: (a) ehrlich benennen und ggf. in der Anleitung bitten, die Buchstaben (leise oder laut) mitzulesen, nicht prüfbar; (b) den Buchstaben zur Aufgabe machen (z. B. „Tippe das R“ – ändert die Regel); (c) Hinweis an die helfende Person, mitzuhören. Eine Entscheidung des Auftraggebers.
2. **Tafelreihenfolge:** Die Quellen nennen oben links → oben rechts → unten links → unten rechts; die Spezifikation setzt als Grundform den Uhrzeigersinn. Beides ist als Stufenparameter möglich; nicht behaupten, der Uhrzeigersinn sei „klassisch“.
3. **Fingerweg dominiert:** Anzeigen wie „Sakkadenkosten“ wären falsch; „Wege auf diesem Gerät“.
4. **Winkel am Tablet sind größer als im Original** (≈ 12–25° gegenüber einer Lücke von ≈ 6–10°): im Text „angelehnt an“, nicht „gleich wie“.

**Offene Punkte:** Entscheidungspunkt 1 klären; Reihenfolge der Quellen als Option; Mindestzahl für die Richtungsanzeige festlegen; Schwelle für Doppeltipps; Hochformat und Smartphone (kleinere Winkel) im Ergebnistext berücksichtigen.

### 1.5 Ehrliche Formulierung für Laien

> **DE:** „Beim 4-Ziele-Wechsel liest du vier Buchstabentafeln im Wechsel: ein Buchstabe von jeder Tafel, dann der nächste. Du tippst sie der Reihe nach an. Gemessen wird die Zeit von Tipp zu Tipp – nicht dein Blick. Die Übung ist an eine Übung aus der Sehtherapie angelehnt; ob sie dort oder im Alltag etwas bewirkt, ist nicht belegt. Mit Übung wird man in dieser Aufgabe schneller. Deine Werte gelten nur für dieses Gerät.“
>
> **IT (Entwurf, fachkundig prüfen lassen):** „Nel *Cambio tra 4 bersagli* leggi quattro tavole di lettere a turno: una lettera da ogni tavola, poi la successiva. Tocchi le lettere in ordine. Viene misurato il tempo da un tocco al successivo, non il tuo sguardo.
> L'esercizio si ispira a un esercizio della terapia visiva; non è dimostrato che abbia effetti lì o nella vita quotidiana. Con la pratica si diventa più veloci in questo esercizio. I tuoi valori valgono solo per questo dispositivo.“

Vermeiden: „trainiert deine Sakkaden“, „misst deine Fixation“, „erweitert deine periphere Wahrnehmung“, „nach wenigen Tagen besser“, „verbessert dein Lesen“, „Ermüdungstest“, „besser als X % …“.

---

## 2. Die Messgröße „Zeit von Tipp zu Tipp“: was sie ist und was nicht

**Definition:** Zeit zwischen dem Antippen eines Buchstabens und dem Antippen des nächsten (`event.timeStamp`); der erste Tipp einer Runde zählt nicht. **Nicht** gemessen: Blickrichtung, Fixationsdauer, Sakkadenlatenz, Sakkadengenauigkeit. Es gibt keinen Reiz mit Beginn; „Reaktionszeit“ ist deshalb kein passender Name.

| Anteil | Größenordnung | Quelle / Herleitung |
|---|---|---|
| Suchen des nächsten Buchstabens (erster nicht blasser der nächsten Tafel; mit Ring entfällt der größte Teil) | **keine geprüfte Zahl** | Wolfe & Horowitz, 2017 (qualitativ) |
| Blickwechsel: Latenz (nur soweit der Blick nicht schon vor dem Tipp springt) | ≈ 150–250 ms | Saslow, 1967 |
| Blickwechsel: Sakkadendauer 12–25° | 2,7 ms/° × 12–25° ≈ 32–68 ms (nur Steigung) | Baloh et al., 1975; Herleitung |
| Erkennen und Entscheiden | Hick-Anteil bei räumlich passender Antwort nahezu flach; Buchstabenerkennung im Raster: **keine geprüfte Zahl** | Proctor & Schneider, 2018 |
| Fingerweg Tafel → Tafel | ≈ 0,3–0,6 s (Fitts: 3,4–4,3 bit bei 9-mm-Zielen, 100–130 ms/bit angenommen) | MacKenzie, 1992; Herleitung |
| Fingerweg innerhalb einer Tafel | ≈ 0,1–0,2 s | Herleitung |
| Gerät/Touch (Web-App) | + ≈ 58–70 ms (Smartphones; Tablets nicht gemessen) | Pronk et al., 2020 |
| Überlappung Auge–Hand | Blick geht der Hand voraus; Arm-Muskel meist **vor** der Sakkade aktiv | Gribble et al., 2002; Neggers & Bekkering, 2000; Land et al., 1999 |

**Die Anteile überlappen**, deshalb gibt es **keine Summe** und keine Möglichkeit, einen Anteil herauszurechnen. Plausibel ist nur:
- **Der Fingerweg ist vermutlich der größte Einzelposten**, besonders beim Wechsel zwischen weit entfernten Tafeln; der Blickwechsel selbst ist nur ein kleiner Teil.
- Unterschiede zwischen zwei Sitzungen können von **Haltung, Abstand, Hand, Finger, Tablet-Neigung, Brille** ebenso kommen wie von den Augen.
- **Absolute Zeiten sind nicht vergleichbar** mit Laborwerten oder mit der Original-Übung (dort wird nicht getippt und nicht gemessen).
- Was die Messgröße sinnvoll zeigt: **den eigenen Verlauf der Gesamtzeit** auf demselben Gerät, in gleicher Aufstellung, auf gleicher Stufe.
- **Nach Fehlern** enthält die Zeit die Korrektur; **Designvorschlag:** nicht mitteln. Sehr kurze Zeiten beim Tafelwechsel (deutlich unter 200 ms) könnten Doppeltipps sein (Schwelle prüfen).

**Warum nicht „Sakkadenlatenz“ anzeigen?** Weil sie nicht gemessen wird (kein Eye-Tracker), weil die Zeit überwiegend andere Anteile enthält und weil eine solche Anzeige einem Messwert mit **medizinischem Anschein** gleichkäme (Abschnitt 7).

---

## 3. Richtungen, Wiederholungen und „Sprungkosten“

### 3.1 Richtung ist Weg (Herleitung; Annahmen: 10,9″-Tablet quer, 1.180 × 820 CSS-px, 0,192 mm/px, 40 cm, 36 px/°; Tafeln etwa 300 px, Rand 40 px; Zielbreite 48 px ≈ 9,2 mm)

| Weg zwischen entsprechenden Zellen | Länge | Winkel | Fitts-ID | bei 100–130 ms/bit |
|---|---|---|---|---|
| waagerecht | ≈ 154 mm (800 px) | ≈ 22° | 4,1 bit | 0,41–0,54 s |
| senkrecht | ≈ 84 mm (440 px) | ≈ 12° | 3,4 bit | 0,34–0,44 s |
| diagonal | ≈ 175 mm (913 px) | ≈ 25° | 4,3 bit | 0,43–0,56 s |
| innerhalb einer Tafel (1–2 Zellen) | ≈ 9–18 mm | ≈ 1,3–2,7° | 1,0–1,6 bit | 0,1–0,2 s |

Differenz waagerecht – senkrecht ≈ 0,8 bit; bei 100–130 ms/bit (nach MacKenzie, 1992; für Touch **nicht geprüft**; Zellen von 9 mm liegen am unteren Rand des klassischen Modells, Bi et al., 2013) **≈ 80–100 ms allein durch die Weglänge** – mehr als die Richtungsunterschiede der Sakkadenlatenz (≈ 20–50 ms; Greene et al., 2020).
Im Hochformat vertauschen sich waagerecht und senkrecht; am Smartphone sind alle Winkel etwa halb so groß. **„Schnellste und langsamste Richtung“** zeigt daher vor allem, welcher Weg kurz oder lang war. Welche Richtungen vorkommen, hängt von der **Tafelreihenfolge** ab: im Uhrzeigersinn kommen → ↓ ← ↑ je gleich oft vor, bei der Reihenfolge der Quellen (oben links → oben rechts → unten links → unten rechts) kommt → doppelt so oft wie ↙ und ↖. Richtungsmittel verschiedener Reihenfolgen sind nicht vergleichbar.

### 3.2 Zahl der Tipps

Eine Runde hat 36 (3 × 3 je Tafel), 64 (4 × 4), 96 (6 × 4) oder 100 (5 × 5) Tipps; bei 1,0–1,5 s je Tipp (**Annahme**; 1,0 s entspricht dem Metronomtakt 60/min bei Lam, nicht gemessen) sind das ≈ 36–150 s je Runde, eine Sitzung (3 Runden) ≈ 2–8 min. Bei Umlauf im Uhrzeigersinn und Wechsel nach jedem Buchstaben entfallen auf jede der vier Richtungen ≈ ¼ der Wechsel (5 × 5: ≈ 25 je Runde, ≈ 74 je Sitzung).

| n je Klasse | Unsicherheit des Mittels (SD 150 ms) | Unsicherheit eines Unterschieds zweier Klassen (SD 150 ms) | erkennbarer Unterschied bei 80 % Sicherheit (SD 100 / 150 / 200 ms) |
|---|---|---|---|
| 3 | 87 ms | 122 ms | 229 / 343 / 457 ms |
| 8 | 53 ms | 75 ms | 140 / 210 / 280 ms |
| 16 | 38 ms | 53 ms | 99 / 148 / 198 ms |
| 25 | 30 ms | 42 ms | 79 / 119 / 158 ms |
| 36 | 25 ms | 35 ms | 66 / 99 / 132 ms |
| 60 | 19 ms | 27 ms | 51 / 77 / 102 ms |
| 100 | 15 ms | 21 ms | 40 / 59 / 79 ms |

*Annahmen:* Einzelzeit-Streuung (SD) 100/150/200 ms – eine **Größenordnung, nicht aus einer Studie** (die SD einer Reaktionszeitverteilung wächst linear mit dem Mittelwert; Wagenmakers & Brown, 2007); unabhängige Tipps; Mittelwerte; α = 0,05 zweiseitig; kleinster mit 80 % Sicherheit erkennbarer Unterschied ≈ 2,8 × Unsicherheit des Unterschieds.
Nötige Tipps **je Klasse** für 50 / 75 / 100 ms: SD 100: 63 / 28 / 16; SD 150: 142 / 63 / 36; SD 200: 251 / 112 / 63.

**Folgen und Vorschläge**
- **Die Schwelle „8 je Klasse“ der Spezifikation** liefert Mittel mit einer Unsicherheit von ≈ 35–70 ms; **Unterschiede unter etwa 150–200 ms sind nicht zu deuten.** **Vorschlag:** Klassenmittel mit Unsicherheit (z. B. ± Standardfehler) zeigen, nach **Achsen** zusammenfassen (waagerecht / senkrecht / diagonal), **Verlauf über mehrere Sitzungen** auf gleichem Gerät, gleicher Stufe und gleicher Aufstellung; nie als Befund; Beschriftung „Wege, keine Augenwerte“.
- Differenzwerte sind als persönlicher Wert oft wenig zuverlässig (Test-Retest 0 bis 0,82 in sieben Aufgaben; Hedge et al., 2018); die Zuverlässigkeit hängt von der Tippzahl und der Streuung innerhalb und zwischen Personen ab (Miller & Ulrich, 2013).
- **Gleiche Stufe:** Richtungsvergleiche nur auf gleicher Stufe und gleicher Reihenfolge.
- **Wege sind in jedem Umlauf gleich:** Entsprechende Zellen der vier Tafeln haben immer denselben Abstand; nur beim Übergang von der letzten zur ersten Tafel ändert sich der Weg beim Zeilenwechsel um bis zu eine Tafelbreite (Herleitung).

### 3.3 Wechsel nach 2 Buchstaben: „Sprungkosten“ sind überwiegend Fingerweg

Der Zeitunterschied „Tafelwechsel – innerhalb derselben Tafel“ heißt **Sprungkosten**. Er enthält den Blickwechsel (≈ 32–68 ms Sakkadendauer plus Latenzanteile), aber auch den **längeren Fingerweg** (≈ 2–3 bit Schwierigkeitsunterschied ≈ 0,2–0,4 s bei 100–130 ms/bit; Herleitung) und Suchen. Er sagt deshalb **nichts Verlässliches über den Blick**; nur Vergleich mit früher auf diesem Gerät. Das Original kennt keine Zeiten; Marinoff (2016) verwendet eine noch gröbere Granularität (eine Zeile je Tafel).

---

## 4. Ermüdung innerhalb einer Runde

- **Was die Literatur misst.** Der „Vigilance decrement“ stammt aus langer, eintöniger Beobachtung mit seltenen Zielen (Mackworth, 1948: 2 h; Zahlen nur über Sekundärquellen); bei stark degradierten Reizen zeigte sich schon nach 5 min ein starker Empfindlichkeitsverlust (Nuechterlein et al., 1983).
- **Was hier anders ist.** Runden von ≈ 40–150 s, häufige Tipps, das Tempo bestimmt die Person. Der klassische Vigilanzabfall ist nicht der erwartete Hauptfaktor.
- **Überlagerung:** Sakkadenaufgaben werden mit Wiederholung schneller, genauer und stabiler (30 Erwachsene, 3 Sitzungen; Karantinos et al., 2025). Anders als in der ersten Fassung bleibt die **Stufe innerhalb der Runde gleich**; im Hälftenvergleich überlagern sich Üben, Ermüdung, der **Verlauf im Raster** (später sind mehr Buchstaben blass, das Suchen wird leichter; Zeilenwechsel ändern den Weg) und Zufall. Eine Verlangsamung am Ende ist daher **nicht eindeutig Ermüdung**. Bei je ≈ 18–50 Tipps je Hälfte (SD 150 ms) ist ein Unterschied erst ab ≈ 85–140 ms sicher erkennbar (Herleitung).
- **Pausen:** Ob kurze Aufgabenwechsel das Dekrement verhindern, ist umstritten (Ariga & Lleras, 2011: ja; Helton & Russell, 2012: nein, 498 Teilnehmende, Bayes-Evidenz für die Nullhypothese). Die Pause zwischen den Runden (≥ 5 s) ist eine **Bedienhilfe**, keine Wirkaussage.
- **Entscheidung:** „Erste vs. letzte Hälfte“ nur als **Hinweis mit Vorbehalt** („kann Üben, Ermüdung oder den Verlauf im Raster zeigen“), nur auf gleicher Stufe; kein Ermüdungswert, keine Vigilanzaussage.

---

## 5. Studienlage zu Sakkaden- und Blicktraining – kritische Einordnung

| Studie | Design | Befund | Einordnung für 905 |
|---|---|---|---|
| **Suche „Hart chart“** (PubMed, 02.10.2026): Balke et al., 2022; Vasudevan et al., 2009; Ciuffreda & Ordonez, 1998; Vera et al., 2020 | 19 Kinder (nicht randomisiert); 10 Personen; 5 Personen; 33 Personen (Messverfahren) | alle zur **Akkommodation** (Hart Chart als Übungsmittel bzw. Messung); keine Sakkaden-Studie; Mehrkomponenten-Programme, kaum Kontrollen | **keine kontrollierte Studie zur Vier-Tafel-Übung gefunden**; Europe-PMC-Volltext: Hart Chart nur als Teil größerer Programme |
| Marinoff, 2016 | zwei Fallberichte (66 J. AMD; 38 J. Stargardt), kombinierte Übungen | Lesegeschwindigkeit „modest“ gestiegen; Crowding bei der Vier-Ecken-Übung | Einzelfälle ohne Kontrolle; klinischer Kontext; nicht für Gesunde |
| Leong et al., 2014; Dodick et al., 2017 | randomisierter, einfach verblindeter Crossover; n = 327 (7,5 J.), Herstellersoftware, 18 Einheiten à 20 min | Lesefluss und Verständnis in der Trainingsgruppe stärker verbessert (6,2 % vs. 3,6 %; 7,5 % vs. 1,5 %) | **kein Hart-Chart-Training**; Autor:innen mit Herstelleraffiliation; Kinder, Lesen; nicht übertragbar |
| Facchin et al., 2025 | 21 Kinder (14 vs. 7), 6 Wochen, Sakkaden mit Symbol-Charts vs. einfaches Lesen | Verbesserungen in Okulomotorik, Lesen, visuell-perzeptiven Fähigkeiten, Crowding | **schwach** (klein, kurz, Pilot); ersetzt Konsenspapier nicht; nahe an der Aufgabenart, nicht an der Übung |
| Karantinos et al., 2025 | 30 Erwachsene, 3 Sitzungen, Sakkadenaufgaben mit Eye-Tracker | Wiederholung verbessert Genauigkeit, Tempo und Stabilität; keine Tageszeit-Wirkung | **Übungseffekt** in Sakkadenaufgaben bestätigt (misst Sakkaden, nicht Tipp zu Tipp) |
| Montenegro & Edelman, 2019 | 12 Trainingssitzungen, Pro-/Antisakkaden | Prosakkaden-Training verbesserte Pro- **und** Antisakkaden; Antisakkaden-Training teils; kaum Nachteile; Training erleichtert Fixationslösung und Bewegungsvorbereitung | **naher Transfer innerhalb von Sakkadenaufgaben** im Labor |
| Jóhannesson et al., 2018 | Express-Sakkaden-Training | Express-Sakkaden nehmen zu; Übertragung zwischen Hemifeldern und Augen; Spitzengeschwindigkeit steigt | wie oben |
| Di Russo et al., 2003 | Wurfscheibenschützen n = 7 vs. Kontrollen n = 8; ein trainierter Proband | schnellere Latenz, stabilere Fixation bei Ablenkern (Querschnitt); Lernen des Einzelnen **retinotop**, kein Transfer | uneinheitlich: Transfer auf andere Positionen **nicht** gefunden (n = 1) |
| Abernethy & Wood, 2001 | 40 Personen, 4 Wochen, Placebo und Kontrolle | kein Effekt über Testvertrautheit hinaus | allgemeines Sehtraining ohne Beleg |
| Guo et al., 2025 | 33 RCTs, 1.048 Personen | Verbesserungen bei Reaktionszeit, Aufmerksamkeit, Entscheidungsgenauigkeit, Auge-Hand-Koordination; **große Effekte vor allem bei trainingsähnlichem Test** (Reaktionszeit SMD 2,66 vs. 0,50) | Lerneffekt überschätzt Wirkung |
| Simons et al., 2016 | Übersicht über Brain-Training | Verbesserung der geübten Aufgabe, wenig bei entfernten Aufgaben und Alltag | Transfer-Vorbehalt |
| Handler & Fierson, 2011 | Konsenspapier AAP/AAO u. a. | Evidenz stützt Sehtraining, Muskelübungen, Tracking-Übungen **nicht** als Behandlung von Lernstörungen | Augenübungen ≠ Therapie |
| Jafarlou, 2024 | 30 randomisierte Kinder mit Dyslexie (Abstract) | Verbesserungen von Lesen nach Okulomotorik-Training berichtet | **schwach**; nicht für 905 |
| Roth et al., 2009; Pollock et al., 2019 (Cochrane) | Hemianopie (n = 28, RCT); Schlaganfall mit Gesichtsfeldausfall (20 Studien, 732) | Such-Reaktionszeit auf blinder Seite sinkt; Scanning-Training bei niedriger Evidenzqualität besser bei Lebensqualität, niedrige bis sehr niedrige Evidenz für **keinen** Effekt auf Gesichtsfeld, Lesen, erweiterte Alltagsaktivitäten | **klinischer Kontext unter Anleitung**; nicht auf Gesunde übertragbar; **kein** Heilversprechen |

**Fazit:** Übungseffekt in der Aufgabe: **mittel** (breit belegt für Aufgabenarten, aber nicht für diese Übung). Naher Transfer: **unklar** (im Labor teils zwischen Sakkadentypen, nicht gezeigt für Tipp zu Tipp in Buchstabenrastern). Alltagstransfer: **fehlend**. Vision Therapy und Okulomotorik-Programme sind für Lernstörungen **nicht belegt** (Handler & Fierson, 2011).
Evidenz für Kranke (Hemianopie) betrifft angeleitete Programme und gilt nicht für diese Übung.

---

## 6. Die Praxisangaben der Anbieter – nicht belegt

- **Was behauptet wird:** Vivid Visions („Four Square Vision Training“): schärfe die Augenkoordination und das Verfolgen, die Fokussierflexibilität (nah–fern), die periphere Wahrnehmung („ohne den Blick zu verschieben“) und die kognitive Verarbeitung; Sprach- oder Bewegungselemente (Buchstaben aussprechen) „aktivieren mehr Hirnregionen“; nach einigen Tagen berichteten „viele Menschen“ über weniger Anspannung hinter den Augen; Sakkaden übten dieselben neuronalen Bahnen wie das Lesen (alle sinngemäß). Chalapathi (2020): Die Hart Chart sei „effective“ für Akkommodation und „to increase the speed and accuracy of saccadic fixation“ (Meinung der Autorin). Lam: im Gespräch keine Wirkaussage; der Kanal beschreibt Vision Therapy allgemein als Weg, Sehfertigkeiten zu verbessern.
- **Was geprüft wurde:** PubMed „Hart chart“ (6 Treffer, davon 4 Akkommodation); Europe PMC „Hart chart“ AND saccad* (31 Treffer; Mehrkomponenten-Programme, Fallberichte, Querschnitte); PubMed „saccadic training“ (18 Treffer; Lesetraining mit Herstellersoftware, Pilot mit Symbol-Charts, klinische Studien zu Gesichtsfeldausfall). **Keine** kontrollierte Studie zu Hart-Chart- oder Vier-Tafel-Training als eigenständiger Übung.
- **Umgang:** Alle Wirkangaben (periphere Wahrnehmung, Fokussierflexibilität bei vier Tafeln gleichen Abstands, „nach einigen Tagen“, Lesefluss, Sportleistung, „mehr Hirnregionen“) sind **nicht belegt** und stehen in keinem Satz, der eine Wirkung behauptet. Selbstberichte „nach einigen Tagen“ haben keine Kontrollgruppe; Lerneffekte und Erwartung sind nicht getrennt (Guo et al., 2025; Simons et al., 2016).
- **Einordnung, unabhängig davon:** Dass man vier feste Orte reihum liest und tippt, ist eine Aufgabe, die in Labor und Alltag der Blicksteuerung vorkommt (Abschnitt 1.2); ob ein **Training** dieser Aufgabe über die Aufgabe hinaus hilft, ist nicht belegt (Abschnitt 5).
- **Praxisperspektive Muchnick/Mountford** (in der ersten Fassung genannt): keine Publikation gefunden, nicht geprüft, nicht als Quelle verwendet.

---

## 7. Rechtliches & Formulierungen – Ergänzungen für diese Übung (kein Rechtsrat)

Grundlagen (EU-MDR, Zweckbestimmung, Werbung mit Gesundheitsaussagen, lokale Speicherung) siehe [Dokument 01, Abschnitt 4](01-reaktion-und-impulskontrolle.md); allgemeine Regeln siehe [Dokument 04, Abschnitt 10](04-konzentration-und-denken.md) und [Dokument 05, Abschnitt 5](05-links-rechts-und-richtung.md). Speziell hier:

- **Diagnose-Nähe ist groß.** Sakkaden, Fixation und Reaktionszeit werden in Augenheilkunde und Neurologie als Messgrößen benutzt; die Anwenderin oder der Anwender ist ein Optiker. Eine Plattform, die „Sakkadenlatenz“, „Fixationswert“ oder „Auffälligkeit“ anzeigt, würde sich einer medizinischen Zweckbestimmung nähern.
  Deshalb: **keine Sakkaden- oder Fixationswerte, keine Normwerte, keine Ampeln, keine Altersvergleiche, kein Hinweis „lassen Sie sich untersuchen“ auf Basis des Ergebnisses.** Die Anzeige heißt „Zeit von Tipp zu Tipp“ und enthält den Hinweis, dass der Blick nicht gemessen wird.
- **Keine Therapie-Aussagen.** Kein „Vision Therapy“, „Reha“, „Augentraining gegen …“, „verbessert die Fixation / die Augenmuskeln / das Sehen / das Lesen / die periphere Wahrnehmung / die Verkehrssicherheit“. Texte zu Wirkungen enden mit „… ist nicht belegt“. Die Übung darf als „angelehnt an eine Übung aus der Sehtherapie“ beschrieben werden, nicht als deren Ersatz.
- **Namen:** Kein „Test“ im Übungsnamen oder in der Auswertung („Ermüdungstest“, „Fixationstest“); „Übung“, „dein Verlauf“. „Angelehnt an bekannte Aufgaben“ ist in Erklärtexten in Ordnung.
- **Kein Patientenname/-code im Browser.** Die Übung hat keine Benutzerkonten und speichert nur lokal im Browser. Wer Sitzungen einer Person zuordnen will, notiert Gerät, Abstand, Brille, Hand und Stufe **außerhalb der App**. Ein Optiker-Werkzeug mit Personenzuordnung wäre eine **Erweiterung** mit eigenem Datenschutzkonzept, Einwilligung und Prüfung der Zweckbestimmung (Hinweis, **nicht rechtlich geprüft**).
- **Vorsicht bei Beratung:** Der Optiker darf aus Ergebnissen dieser Übung keine Aussage über das Auge ableiten (Nystagmus, Gesichtsfeld, Schielen, Amblyopie, Gleitsichtverträglichkeit); die Werte sind Haltungs-, Weg- und Gerätewerte (Abschnitt 2 und 3). Die Beobachtung von Kopf, Augen und Fehlern durch eine zweite Person, die zur Original-Übung gehört, ersetzt die App nicht.
- **Praxisangaben:** „Nach einigen Tagen berichten viele Menschen …“ und ähnliche Aussagen nicht in Texten für Kundinnen und Kunden verwenden.
- **Italien:** IT-Texte (Entwurf oben) vor Veröffentlichung fachkundig prüfen lassen.

---

## 8. Quellen

### Zur Übung selbst (ohne DOI)

- Lam, V. (Insight Vision Optometry). *Vision Therapy Exercise: 4 Chart Saccades Exercise.* YouTube, 18.12.2020. https://www.youtube.com/watch?v=Dpj_t4tJ8Vo (englische Untertitelspur gelesen)
- Emergent VT. *Vision Therapy Activities – Four Charts.* https://www.emergentvt.com/activity
- Chalapathi, R. (2020). Clinical Highlight • VT procedure: Hart charts. *Optometry & Visual Performance*, *8*(3), 156. https://www.oepf.org/wp-content/uploads/2023/04/8-3-Web-File-Chalapathi.pdf (keine DOI; Meinung der Autorin)
- Marinoff, R. (2016). Using vision therapy to maximize visual efficiency for low vision patients with central scotoma. *Optometry & Visual Performance*, *4*(1), Article 4. https://www.ovpjournal.org/uploads/2/3/8/9/23898265/marinoff16.pdf (keine DOI)
- Bernell USA / Jutron Vision. *Four Corner Hart Chart Set* (BC4DC36). https://www.jutronvision.com/product/four-corner-hart-chart-set/
- Vivid Visions Optometry. *Week 8: Four Square Vision Training.* 20.10.2025. https://www.vividvisionsoptometry.com/post/week-8-four-square-vision-training
- Taub, M. (2014). Vision therapy: A top 10 must-have list. *Optometry Times*, 01.08.2014. https://www.optometrytimes.com/vision-therapy-top-10-must-have-list
- Vision & Learning Center (2024). *Vision Therapy Activity: Hart Chart.* https://www.visionlearncenter.com/post/vision-therapy-activity-hart-chart

### Fachliteratur

- Abadi, R. V. (2002). Motor and sensory characteristics of infantile nystagmus. *British Journal of Ophthalmology*, *86*(10), 1152–1160. https://doi.org/10.1136/bjo.86.10.1152
- Abegg, M., Pianezzi, D., & Barton, J. J. S. (2015). A vertical asymmetry in saccades. *Journal of Eye Movement Research*, *8*(5), Article 3. https://doi.org/10.16910/jemr.8.5.3
- Abernethy, B., & Wood, J. M. (2001). Do generalized visual training programmes for sport really work? An experimental investigation. *Journal of Sports Sciences*, *19*(3), 203–222. https://doi.org/10.1080/026404101750095376
- Alvarez, T. L., Kim, E. H., & Granger-Donetti, B. (2017). Adaptation to progressive additive lenses: Potential factors to consider. *Scientific Reports*, *7*, 2529. https://doi.org/10.1038/s41598-017-02851-5
- Ariga, A., & Lleras, A. (2011). Brief and rare mental “breaks” keep you focused: Deactivation and reactivation of task goals preempt vigilance decrements. *Cognition*, *118*(3), 439–443. https://doi.org/10.1016/j.cognition.2010.12.007
- Balke, M., Skjöld, G., & Lundmark, P. O. (2022). Comparison of short-term effects of treatment of accommodative infacility with low plus addition in single vision Rx or vision therapy: A pilot study. *Clinical Optometry*, *14*, 83–92. https://doi.org/10.2147/OPTO.S355508
- Ballard, D. H., Hayhoe, M. M., & Pelz, J. B. (1995). Memory representations in natural tasks. *Journal of Cognitive Neuroscience*, *7*(1), 66–80. https://doi.org/10.1162/jocn.1995.7.1.66
- Baloh, R. W., Sills, A. W., Kumley, W. E., & Honrubia, V. (1975). Quantitative measurement of saccade amplitude, duration, and velocity. *Neurology*, *25*(11), 1065–1070. https://doi.org/10.1212/WNL.25.11.1065
- Bi, X., Li, Y., & Zhai, S. (2013). FFitts law: Modeling finger touch with Fitts' law. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '13)* (S. 1363–1372). ACM. https://doi.org/10.1145/2470654.2466180
- Bouma, H. (1970). Interaction effects in parafoveal letter recognition. *Nature*, *226*(5241), 177–178. https://doi.org/10.1038/226177a0
- Ciuffreda, K. J., & Ordonez, X. (1998). Vision therapy to reduce abnormal nearwork-induced transient myopia. *Optometry and Vision Science*, *75*(5), 311–315. https://doi.org/10.1097/00006324-199805000-00019
- Cowan, N. (2001). The magical number 4 in short-term memory: A reconsideration of mental storage capacity. *Behavioral and Brain Sciences*, *24*(1), 87–114. https://doi.org/10.1017/S0140525X01003922
- Dafoe, J. M., Armstrong, I. T., & Munoz, D. P. (2007). The influence of stimulus direction and eccentricity on pro- and anti-saccades in humans. *Experimental Brain Research*, *179*(4), 563–570. https://doi.org/10.1007/s00221-006-0817-8
- Deubel, H., & Schneider, W. X. (1996). Saccade target selection and object recognition: Evidence for a common attentional mechanism. *Vision Research*, *36*(12), 1827–1837. https://doi.org/10.1016/0042-6989(95)00294-4
- Di Russo, F., Pitzalis, S., & Spinelli, D. (2003). Fixation stability and saccadic latency in élite shooters. *Vision Research*, *43*(17), 1837–1845. https://doi.org/10.1016/S0042-6989(03)00299-2
- Dodick, D., Starling, A. J., Wethe, J., Pang, Y., Messner, L. V., Smith, C., Master, C. L., Halker-Singh, R. B., Vargas, B. B., Bogle, J. M., Mandrekar, J., Talaber, A., & Leong, D. (2017). The effect of in-school saccadic training on reading fluency and comprehension in first and second grade students. *Journal of Child Neurology*, *32*(1), 104–111. https://doi.org/10.1177/0883073816668704
- Duncan, J., & Humphreys, G. W. (1989). Visual search and stimulus similarity. *Psychological Review*, *96*(3), 433–458. https://doi.org/10.1037/0033-295X.96.3.433
- Facchin, A., Maffioletti, S., Maffioletti, M., Esposito, G., Bonetti, M., Girelli, L., & Daini, R. (2025). Oculomotor training improves reading and associated cognitive functions in children with learning difficulties: A pilot study. *Vision*, *9*(4), 83. https://doi.org/10.3390/vision9040083
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, *47*(6), 381–391. https://doi.org/10.1037/h0055392
- Greene, H. H., Brown, J. M., & Strauss, G. P. (2020). Shorter fixation durations for up-directed saccades during saccadic exploration: A meta-analysis. *Journal of Eye Movement Research*, *12*(8), Article 5. https://doi.org/10.16910/jemr.12.8.5
- Gribble, P. L., Everling, S., Ford, K., & Mattar, A. (2002). Hand-eye coordination for rapid pointing movements. *Experimental Brain Research*, *145*(3), 372–382. https://doi.org/10.1007/s00221-002-1122-9
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology*, *16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572
- Handler, S. M., Fierson, W. M., Section on Ophthalmology, Council on Children with Disabilities, American Academy of Ophthalmology, American Association for Pediatric Ophthalmology and Strabismus, & American Association of Certified Orthoptists. (2011). Learning disabilities, dyslexia, and vision. *Pediatrics*, *127*(3), e818–e856. https://doi.org/10.1542/peds.2010-3670
- Hedge, C., Powell, G., & Sumner, P. (2018). The reliability paradox: Why robust cognitive tasks do not produce reliable individual differences. *Behavior Research Methods*, *50*(3), 1166–1186. https://doi.org/10.3758/s13428-017-0935-1
- Helton, W. S., & Russell, P. N. (2012). Brief mental breaks and content-free cues may not keep you focused. *Experimental Brain Research*, *219*(1), 37–46. https://doi.org/10.1007/s00221-012-3065-0
- Hoffman, J. E., & Subramaniam, B. (1995). The role of visual attention in saccadic eye movements. *Perception & Psychophysics*, *57*(6), 787–795. https://doi.org/10.3758/BF03206794
- Honda, H., & Findlay, J. M. (1992). Saccades to targets in three-dimensional space: Dependence of saccadic latency on target location. *Perception & Psychophysics*, *52*(2), 167–174. https://doi.org/10.3758/BF03206770
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics*, *27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x
- Jafarlou, F. (2024). Oculomotor rehabilitation improves reading abilities in dyslexic children with concurrent eye movement abnormalities. *Clinical Pediatrics*, *63*(9), 1276–1286. https://doi.org/10.1177/00099228231221335
- Jóhannesson, Ó. I., Edelman, J. A., Sigurþórsson, B. D., & Kristjánsson, Á. (2018). Effects of saccade training on express saccade proportions, saccade latencies, and peak velocities: An investigation of nasal/temporal differences. *Experimental Brain Research*, *236*(5), 1251–1262. https://doi.org/10.1007/s00221-018-5213-7
- Karantinos, T., Kotsiou, E., Drouza, P., Mantas, A., Anderson, A. J., Klein, C., & Smyrnis, N. (2025). Diurnal variation and practice effects in saccade task performance. *Experimental Brain Research*, *243*(8), 188. https://doi.org/10.1007/s00221-025-07131-7
- Klein, R. M. (2000). Inhibition of return. *Trends in Cognitive Sciences*, *4*(4), 138–147. https://doi.org/10.1016/S1364-6613(00)01452-2
- Kowler, E., Anderson, E., Dosher, B., & Blaser, E. (1995). The role of attention in the programming of saccades. *Vision Research*, *35*(13), 1897–1916. https://doi.org/10.1016/0042-6989(94)00279-U
- Land, M., Mennie, N., & Rusted, J. (1999). The roles of vision and eye movements in the control of activities of daily living. *Perception*, *28*(11), 1311–1328. https://doi.org/10.1068/p2935
- Leong, D. F., Master, C. L., Messner, L. V., Pang, Y., Smith, C., & Starling, A. J. (2014). The effect of saccadic training on early reading fluency. *Clinical Pediatrics*, *53*(9), 858–864. https://doi.org/10.1177/0009922814532520
- Liu, L., & Arditi, A. (2001). How crowding affects letter confusion. *Optometry and Vision Science*, *78*(1), 50–55. https://doi.org/10.1097/00006324-200101010-00014
- MacKenzie, I. S. (1992). Fitts' law as a research and design tool in human-computer interaction. *Human–Computer Interaction*, *7*(1), 91–139. https://doi.org/10.1207/s15327051hci0701_3
- Mackworth, N. H. (1948). The breakdown of vigilance during prolonged visual search. *Quarterly Journal of Experimental Psychology*, *1*(1), 6–21. https://doi.org/10.1080/17470214808416738
- Miller, J., & Ulrich, R. (2013). Mental chronometry and individual differences: Modeling reliabilities and correlations of reaction time means and effect sizes. *Psychonomic Bulletin & Review*, *20*(5), 819–858. https://doi.org/10.3758/s13423-013-0404-5
- Montenegro, S. M., & Edelman, J. A. (2019). Impact of task-specific training on saccadic eye movement performance. *Journal of Neurophysiology*, *122*(4), 1661–1674. https://doi.org/10.1152/jn.00020.2019
- Mueller, S. T., & Weidemann, C. T. (2012). Alphabetic letter identification: Effects of perceivability, similarity, and bias. *Acta Psychologica*, *139*(1), 19–37. https://doi.org/10.1016/j.actpsy.2011.09.014
- Munoz, D. P., Broughton, J. R., Goldring, J. E., & Armstrong, I. T. (1998). Age-related performance of human subjects on saccadic eye movement tasks. *Experimental Brain Research*, *121*(4), 391–400. https://doi.org/10.1007/s002210050473
- Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. *Journal of Neurophysiology*, *83*(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639
- Niechwiej-Szwedo, E., Goltz, H. C., Chandrakumar, M., & Wong, A. M. F. (2014). Effects of strabismic amblyopia and strabismus without amblyopia on visuomotor behavior: III. Temporal eye-hand coordination during reaching. *Investigative Ophthalmology & Visual Science*, *55*(12), 7831–7838. https://doi.org/10.1167/iovs.14-15507
- Nuechterlein, K. H., Parasuraman, R., & Jiang, Q. (1983). Visual sustained attention: Image degradation produces rapid sensitivity decrement over time. *Science*, *220*(4594), 327–329. https://doi.org/10.1126/science.6836276
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science*, *68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010
- Pelli, D. G., & Tillman, K. A. (2008). The uncrowded window of object recognition. *Nature Neuroscience*, *11*(10), 1129–1135. https://doi.org/10.1038/nn.2187
- Pollock, A., Hazelton, C., Rowe, F. J., Jonuscheit, S., Kernohan, A., Angilley, J., Henderson, C. A., Langhorne, P., & Campbell, P. (2019). Interventions for visual field defects in people with stroke. *Cochrane Database of Systematic Reviews*, *2019*(5), CD008388. https://doi.org/10.1002/14651858.CD008388.pub3
- Proctor, R. W., & Schneider, D. W. (2018). Hick's law for choice reaction time: A review. *Quarterly Journal of Experimental Psychology*, *71*(6), 1281–1299. https://doi.org/10.1080/17470218.2017.1322622
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, *52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2
- Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin*, *124*(3), 372–422. https://doi.org/10.1037/0033-2909.124.3.372
- Rayner, K. (2009). The 35th Sir Frederick Bartlett Lecture: Eye movements and attention in reading, scene perception, and visual search. *Quarterly Journal of Experimental Psychology*, *62*(8), 1457–1506. https://doi.org/10.1080/17470210902816461
- Rosenfield, M. (2011). Computer vision syndrome: A review of ocular causes and potential treatments. *Ophthalmic and Physiological Optics*, *31*(5), 502–515. https://doi.org/10.1111/j.1475-1313.2011.00834.x
- Roth, T., Sokolov, A. N., Messias, A., Roth, P., Weller, M., & Trauzettel-Klosinski, S. (2009). Comparing explorative saccade and flicker training in hemianopia: A randomized controlled study. *Neurology*, *72*(4), 324–331. https://doi.org/10.1212/01.wnl.0000341276.65721.f2
- Saslow, M. G. (1967). Effects of components of displacement-step stimuli upon latency for saccadic eye movement. *Journal of the Optical Society of America*, *57*(8), 1024–1029. https://doi.org/10.1364/JOSA.57.001024
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do “brain-training” programs work? *Psychological Science in the Public Interest*, *17*(3), 103–186. https://doi.org/10.1177/1529100616661983
- Stahl, J. S. (1999). Amplitude of human head movements associated with horizontal saccades. *Experimental Brain Research*, *126*(1), 41–54. https://doi.org/10.1007/s002210050715
- Strasburger, H., Rentschler, I., & Jüttner, M. (2011). Peripheral vision and pattern recognition: A review. *Journal of Vision*, *11*(5), 13. https://doi.org/10.1167/11.5.13
- Vasudevan, B., Ciuffreda, K. J., & Ludlam, D. P. (2009). Accommodative training to reduce nearwork-induced transient myopia. *Optometry and Vision Science*, *86*(11), 1287–1294. https://doi.org/10.1097/OPX.0b013e3181bb44cf
- Vera, J., Redondo, B., Molina, R., Koulieris, G. A., & Jiménez, R. (2020). Validation of an objective method for the qualitative and quantitative assessment of binocular accommodative facility. *Current Eye Research*, *45*(5), 636–644. https://doi.org/10.1080/02713683.2019.1688837
- Wagenmakers, E.-J., & Brown, S. (2007). On the linear relation between the mean and the standard deviation of a response time distribution. *Psychological Review*, *114*(3), 830–841. https://doi.org/10.1037/0033-295X.114.3.830
- Whitney, D., & Levi, D. M. (2011). Visual crowding: A fundamental limit on conscious perception and object recognition. *Trends in Cognitive Sciences*, *15*(4), 160–168. https://doi.org/10.1016/j.tics.2011.02.005
- Wolfe, J. M., & Horowitz, T. S. (2017). Five factors that guide attention in visual search. *Nature Human Behaviour*, *1*(3), Article 0058. https://doi.org/10.1038/s41562-017-0058
- W3C (2024). *Web Content Accessibility Guidelines (WCAG) 2.2*, SC 1.4.1, 2.5.5, 2.5.8. https://www.w3.org/TR/WCAG22/

---

## Anhang A: Verifikationshinweise

- **Volltext, Tabellen oder Untertitelspur gelesen:** Lam (2020; englische Untertitel, Video nicht angesehen); Emergent VT („Four Charts“, „Hart Chart Columns“, „Outside In“); Marinoff (2016; PDF); Chalapathi (2020; eine Seite, vom Auftraggeber bereitgestellt); Jutron-Produktseite; Taub (2014); Vision & Learning Center (2 Beiträge); Pronk et al. (2020; PMC7280355: Tabelle 4); Greene et al. (2020; PMC7881898: 25 ms, g = 0,97, 19 von 23 Datensätzen); Mueller & Weidemann (2012; PMC3271710: Tabellen 2 und 3); W3C WCAG 2.2 (SC 1.4.1, 2.5.5, 2.5.8).
- **Abstract gelesen (PubMed/NCBI bzw. Europe PMC, 02.10.2026):** Dafoe et al. (2007), Honda & Findlay (1992), Munoz et al. (1998), Baloh et al. (1975), Greene et al. (2020), Deubel & Schneider (1996), Kowler et al. (1995), Hoffman & Subramaniam (1995), Klein (2000), Gribble et al. (2002), Neggers & Bekkering (2000), Land et al. (1999), Pronk et al. (2020), Nuechterlein et al. (1983), Ariga & Lleras (2011), Helton & Russell (2012), Karantinos et al. (2025), Whitney & Levi (2011), Pelli & Tillman (2008), Strasburger et al. (2011), Liu & Arditi (2001), Mueller & Weidemann (2012), Proctor & Schneider (2018), Montenegro & Edelman (2019), Jóhannesson et al. (2018), Di Russo et al. (2003), Abernethy & Wood (2001), Guo et al. (2025), Simons et al. (2016), Handler & Fierson (2011), Roth et al. (2009), Pollock et al. (2019), Facchin et al. (2025), Jafarlou (2024), Leong et al. (2014), Dodick et al. (2017), Balke et al. (2022), Vasudevan et al. (2009), Ciuffreda & Ordonez (1998), Vera et al. (2020), Rayner (1998; 2009), Ballard et al. (1995), Cowan (2001), Wolfe & Horowitz (2017), Abadi (2002), Niechwiej-Szwedo et al. (2014), Rosenfield (2011), Alvarez et al. (2017), Miller & Ulrich (2013), Wagenmakers & Brown (2007), Hedge et al. (2018), Hutchings et al. (2007), Stahl (1999).
- **Abstract über Verlags- bzw. Hochschulseite oder Websuche gelesen (nicht in PubMed):** Saslow (1967; Verlagsseite opg.optica.org), Abegg et al. (2015; Verlagsseite JEMR), MacKenzie (1992; Autorenseite), Bi et al. (2013; Google-Research-Seite), Duncan & Humphreys (1989; CBU-Bibliografie).
- **Nur Metadaten per Crossref geprüft, Inhalt als Standardwissen bzw. über genannte Übersichten:** Fitts (1954; PubMed ohne Abstract, Inhalt über MacKenzie), Bouma (1970; über Pelli & Tillman), Mackworth (1948; Zahlen nur über Sekundärquellen, nur qualitativ zitiert).
- **Eigene Herleitungen/Heuristiken** (im Text markiert): Geometrie (36 CSS-px pro Grad am 10,9″-Tablet in 40 cm, Tafeln etwa 300 px, Wege und Winkel; Lücke im Original aus 12 Zoll und 6–10 Fuß), Fitts-Schwierigkeit je Weg und Unterschiede in ms, Zeitkomponenten, Zahl der Tipps und Dauer je Runde, Standardfehler und erkennbare Unterschiede (mit angenommener Streuung 100/150/200 ms), Stufenentscheidung am Rundenende (Binomial), Crowding-Abstand (0,5 × Exzentrizität bei Zellabständen von 1,3–1,7°), Paar-Auswertung der Buchstaben-Genauigkeit (Mueller & Weidemann, 2012; Rangplätze).
- **Abweichung zur Spezifikation:** „Touchscreens messen 30–130 ms zu lang“ (Spezifikation, `docs/wissenschaft/README.md`) entspricht nicht ganz den Tabellenwerten bei Pronk et al. (2020): Smartphones im Mittel ≈ 58–70 ms, Laptops im Mittel bis ≈ 133 ms, Einzelwerte der Touchgeräte ≈ 45–131 ms; Tablets wurden nicht gemessen. Dieses Dokument verwendet die Tabellenwerte.
- **Nicht aufgenommen:** Muchnick und Mountford (keine konkrete einschlägige Publikation gefunden); Bahill, Adler & Stark (1975; nicht auffindbar); Theeuwes et al. (1998; Zahl nur über Sekundärangaben); Irwin (1992), Treisman & Gelade (1980), Denckla & Rudel (1976), Neisser (1963; kein Abstract auffindbar); Normwerte für Reaktionszeiten, Sakkaden oder Fixationen jeder Art. Die Bernell-Seite selbst war nicht abrufbar; Vivid Visions: nur der frei lesbare Teil.
- **Nicht gefunden:** eine kontrollierte Studie zu Hart-Chart- oder Vier-Tafel-Sakkadentraining (Suchen vom 02.10.2026: PubMed „Hart chart“, Europe PMC Volltext, PubMed „saccadic training“). Das ist ein Suchergebnis, kein Beweis der Abwesenheit.

## Anhang B: Aussagen, die wir auf der Website **nicht** machen

| Nicht sagen | Warum | Stattdessen |
|---|---|---|
| „Misst deine Sakkadenlatenz / Fixation / visuo-motorische Leistung“ | Kein Eye-Tracker; die Zeit enthält Fingerweg, Suchen, Gerät; Anteile überlappen | „Zeit von Tipp zu Tipp – dein Blick wird nicht gemessen“ |
| „Trainiert deine Augenmuskeln / Sakkaden / Fixation“ | Übungseffekt in der Aufgabe; Transfer unklar; kein Trainingsnachweis für die Muskeln | „Hier übst du, Buchstaben von vier Tafeln im Wechsel zu finden und zu tippen“ |
| „Erweitert die periphere Wahrnehmung“, „verbessert die Fokussierflexibilität“ | Anbieterangabe ohne Beleg; bei vier Tafeln im gleichen Abstand ist kein Nah-Fern-Wechsel nötig | weglassen |
| „Nach wenigen Tagen merkst du Verbesserungen“ | Selbstberichte ohne Kontrolle; Lerneffekt und Erwartung | „Mit Übung wird man in dieser Aufgabe schneller; ob das etwas bewirkt, ist nicht belegt“ |
| „Verbessert Lesen, Konzentration, Sport, Verkehrssicherheit“ | Alltagstransfer nicht belegt; Augenübungen bei Lernstörungen nicht belegt (Handler & Fierson, 2011); Effekte bei trainingsähnlichem Test überschätzt (Guo et al., 2025) | „ob sich das überträgt, ist nicht belegt“ |
| „Aktiviert mehr Hirnregionen“ | für diese Übung nicht untersucht | weglassen |
| „Schnellste/langsamste Richtung zeigt, wo dein Blick schwächer ist“ | Richtung = Weg (Länge, Armbewegung); wenige Tipps; kein Eye-Tracking | „Das sind Wege auf diesem Tablet – keine Augenwerte; erst über mehrere Sitzungen aussagekräftig“ |
| „Sprungkosten zeigen, wie gut dein Blick wechselt“ | überwiegend Fingerweg | „Vergleich mit früher auf diesem Gerät“ |
| „Ermüdungstest“, „Ihre Aufmerksamkeit lässt nach“ | Runden von 40–150 s; Üben, Ermüdung und Verlauf im Raster überlagern; Pausenwirkung umstritten | „erste vs. letzte Hälfte – kann Üben, Ermüdung oder den Verlauf im Raster zeigen“ |
| „Dein Ergebnis ist auffällig / unterdurchschnittlich / besser als X %“ | keine Normen, geräteabhängig, Diagnoseanspruch | „schneller als letztes Mal – auf diesem Gerät“ |
| „Erkennt Nystagmus, Schielen, Gesichtsfeldausfall, Gleitsicht-Probleme“ | keine Diagnose; Werte sind Haltungs-, Weg- und Gerätewerte | weglassen; bei Beschwerden Untersuchung beim Augenarzt/Optiker unabhängig vom Ergebnis empfehlen |
| „Ersetzt die Sehtherapie-Übung“ | Original: laut lesen, Beobachtung, Wandtafeln, Metronom | „angelehnt an eine Übung aus der Sehtherapie“ |
| „Wissenschaftlich bewiesen“ | die Übung ist nicht untersucht | „beruht auf bekannten Aufgaben aus der Forschung“ |
