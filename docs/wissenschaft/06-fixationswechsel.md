# Fixationswechsel zwischen vier Zielen – Vergleich der Idee des Auftraggebers mit der Studienlage

*Neue Übung 905 „4-Ziele-Wechsel“ · Vorbild: Beschreibung des Auftraggebers (Optiker) einer „4-Ziele-Fixationswechsel“-App (keine Website, keine URL, kein Video, kein Code) · Stand: 02.10.2026*

> **Wofür dieses Dokument da ist:** Grundlage für Übungsdesign, Beratung im Geschäft und Website-Texte (DE + IT) der
> Trainingsplattform von Bio-Optik Flaim (Tablet/Touchscreen, Browser, keine Benutzerkonten, Ergebnisse nur lokal) für die neue
> Übung **4-Ziele-Wechsel** (905). Es vergleicht **die Idee des Auftraggebers** (schneller, gezielter Wechsel von Aufmerksamkeit und Fixation
> zwischen vier deutlich getrennten Positionen, Messgröße „visuo-motorische Reaktionszeit“) mit der Studienlage: **was die Wissenschaft stützt**,
> **wo es schwach ist** und **welche Änderungen und Entscheidungen die Blickfit-Umsetzung deshalb hat**.
> Jede zitierte Quelle wurde über Crossref (DOI) und – wo möglich – PubMed-, Verlags- oder PMC-Abstract geprüft; der Prüfstand steht im
> [Anhang A](#anhang-a-verifikationshinweise) und in `docs/uebungskatalog/literatur/lit-W13-fixationswechsel.md`.
> Eigene Herleitungen und Vorschläge sind als **Herleitung** bzw. **Designvorschlag**, Vermutungen als **Annahme** markiert. Die **Zahlen der Übung sind grob**
> (Stand der Spezifikation Runde 5) und können sich noch ändern.
> Allgemeine Trainingsprinzipien, Zeitmessung im Browser und Rechtliches stehen in
> [Dokument 01](01-reaktion-und-impulskontrolle.md), Blick- und Zielbewegungen in [Dokument 02](02-bewegung-verfolgen.md), Konzentration und Denken in
> [Dokument 04](04-konzentration-und-denken.md); hier steht nur Ergänzendes. **Kein Rechtsrat, keine medizinische Beratung.**

## Auf einen Blick

1. **Die Aufgabe verlangt Blicksprünge, misst sie aber nicht.** Bei jedem neuen Ziel muss der Blick über ≈ 14–33° springen (Tablet quer in 40 cm; Herleitung). **Gemessen** wird nur die Zeit
   vom Erscheinen des Rings bis zum Tippen. Es gibt keinen Eye-Tracker; wohin die Person schaut, ist unbekannt.
2. **„Reaktionszeit Ziel → Touch“ ist kein Sakkadenmaß.** Sie enthält Entdecken (≈ 130 ms; Woods et al., 2015), Sakkadenlatenz (≈ 200 ms; Saslow, 1967), Sakkadendauer
   (2,7 ms pro Grad; Baloh et al., 1975), Erkennen und Entscheiden, **den Weg des Fingers** (Fitts; vermutlich der größte Einzelposten) und die Geräteverzögerung
   (Web-App auf Smartphones im Mittel + 58–70 ms; Pronk et al., 2020). Die Anteile **überlappen** (Arm-Muskel meist vor der Sakkade aktiv; Gribble et al., 2002) und lassen sich nicht herausrechnen.
   Blickfit zeigt deshalb nur „Reaktionszeit Ziel → Touch“, nie „Sakkadenlatenz“.
3. **Aufmerksamkeit und Blick gehören zusammen.** Unterscheidung am Sakkadenziel war am besten, an Nachbarn nahe Zufall (Deubel & Schneider, 1996); es ist nicht möglich, zu einem Ziel zu blicken und woanders
   genau zu urteilen (Kowler et al., 1995; Hoffman & Subramaniam, 1995). Die starke **Premotor-Theorie** gilt als zu weit gehend (Smith & Schenk, 2012).
4. **Richtungsunterschiede sind klein und überlagert.** Sakkaden nach oben sind schneller als nach unten (Fixationsdauer im Mittel 25 ms kürzer, g = 0,97, 23 Datensätze; Greene et al., 2020), horizontal schneller als vertikal
   (Dafoe et al., 2007). Auf dem Tablet erzeugt aber allein die **Weglänge** (horizontal länger als vertikal) nach Fitts einen Unterschied von **≈ 55–90 ms** (Herleitung). Die „Richtungen“ der Auswertung sind **Wegklassen**.
5. **Für Richtungsvergleiche braucht man viele Durchgänge.** Bei Einzelzeit-Streuung 150 ms hat das Mittel von 3 Durchgängen eine Unsicherheit von ≈ 87 ms; um einen Unterschied von 100 ms zu erkennen, braucht man
   je Richtung ≈ 36 Durchgänge (SD 100: 16; SD 200: 63; Herleitung). Eine Sitzung liefert ≈ 7–11 (Diagonale) bzw. ≈ 14–23 (horizontal/vertikal). **Blickfit zeigt Richtungsklassen erst ab genügend Wiederholungen** (Vorschlag ≈ 10–15) und mit Unsicherheit.
6. **Ermüdung in 3 × 60 s ist nur grob vergleichbar.** Der klassische Vigilanzabfall betrifft lange, eintönige Beobachtung (Mackworth, 1948; Nuechterlein et al., 1983); hier überlagern Üben, Stufenwechsel und Müdigkeit einander. „Erste vs. letzte Hälfte“
   ist ein **Hinweis mit Vorbehalt**.
7. **Zeichen-Ähnlichkeit wirkt nur, wenn das Zeichen gelesen werden muss.** Zeigt der Ring das Ziel, kann man tippen, ohne das Zeichen zu erkennen. Und B D P R sind **nicht gleichmäßig ähnlich** (B–P eher verwechselbar, D–R eher nicht;
   eigene Auswertung nach Mueller & Weidemann, 2012). Das ist ein Entscheidungspunkt für den Bau.
8. **Studienlage: Übung ja, Transfer offen.** Sakkaden-, Zeige- und Reaktionsaufgaben werden mit Übung schneller und stabiler (Karantinos et al., 2025; Montenegro & Edelman, 2019); die Übertragung im Labor ist uneinheitlich
   (Jóhannesson et al., 2018; Di Russo et al., 2003); bei trainingsähnlichem Test werden Effekte stark überschätzt (Reaktionszeit SMD 2,66 vs. 0,50; Guo et al., 2025); für Lernstörungen stützt die Evidenz Augenübungen nicht
   (Handler & Fierson, 2011). **Alltagstransfer: nicht belegt.**
9. **Praxisperspektive des Auftraggebers, nicht geprüft.** Der Auftraggeber verweist auf Bruce Muchnick und John Mountford (Vision-Therapy-Praktiker). Es wurde keine konkrete Publikation zu einem 4-Ziele-Fixationswechsel gefunden; beide
   werden **nicht als Quelle** verwendet.
10. **Blickfit-Entscheidungen:** Reaktionszeit Ziel → Touch statt Sakkade; Richtungsauswertung erst ab genügend Wiederholungen; Ermüdungsvergleich nur grob; **ein Parameter je Stufe**; **keine Normwerte**, kein Vergleich mit anderen, keine „Test“-Sprache;
    **kein Patientenname oder -code im Browser** (Erweiterung für ein Optiker-Werkzeug).

## Evidenzskala

Wie in [Dokument 04](04-konzentration-und-denken.md): **stark** (mehrere große bzw. kontrollierte Studien oder Metaanalysen, im Wesentlichen übereinstimmend), **mittel** (einzelne größere RCTs oder mehrere kleinere, übereinstimmende Studien – mit klaren Einschränkungen),
**schwach** (kleine, nicht randomisierte oder korrelative Studien, widersprüchliche Befunde), **fehlend** (keine Studie zur konkreten Aussage oder direkt getestet und nicht bestätigt), **unklar** (Befunde in verwandten Aufgaben, Übertragung nicht untersucht).
**Transfer** heißt: Überträgt sich die Verbesserung auf *andere* Aufgaben? *Nah* = ähnliche Aufgaben, *fern* = Alltag, Verkehr, Beruf. Alle Einstufungen gelten für die **Aufgabenart**; die Übung 905 ist nicht untersucht.

## Übersicht: Idee, Studienlage und Blickfit-Entscheidung

| Punkt der Idee | Was die Wissenschaft stützt | Wo es schwach ist | Blickfit-Entscheidung |
|---|---|---|---|
| Wechsel der **Aufmerksamkeit** zwischen vier Orten | Aufmerksamkeit und Sakkadenziel sind eng gekoppelt (Deubel & Schneider, 1996; Kowler et al., 1995) | Premotor-Theorie zu stark (Smith & Schenk, 2012); nichts zur Übung selbst | Aufgabe beschreiben als „Hinschauen und Tippen“; keine Aussage über Aufmerksamkeitswirkung |
| **Fixation**, Blick ruhig auf dem Ziel | Der Blick bleibt am Zeigeziel verankert (Neggers & Bekkering, 2000) | Fixation wird nicht gemessen und nicht erzwungen | „Fixation“ nur als Aufgabenbeschreibung; kein Fixationswert |
| **Reaktionszeit** (visuo-motorisch) | Reaktionszeiten sind gut untersucht; Komponenten (Woods et al., 2015; Saslow, 1967; Fitts) | **Kein** Sakkadenmaß; Fingerweg dominiert; Anteile überlappen | Anzeige „Reaktionszeit Ziel → Touch“; Hinweis: Blick wird nicht gemessen |
| **Richtungen getrennt** | Sakkaden nach oben schneller als nach unten, horizontal schneller als vertikal (20–50 ms; Dafoe et al., 2007; Greene et al., 2020) | Weglänge (Fitts) erzeugt ≈ 55–90 ms; wenige Durchgänge je Klasse | Anzeige erst ab genügend Wiederholungen, mit Unsicherheit, als „Wege“ |
| **Ermüdung** innerhalb von Blöcken | Vigilanzabfall bei langer Beobachtung (Mackworth, 1948; Nuechterlein et al., 1983) | 60-s-Blöcke; Üben und Stufenwechsel überlagern; Pausenwirkung umstritten | „Erste vs. letzte Hälfte“ nur Hinweis mit Vorbehalt |
| **Ähnliche Zeichen** (B D P R) | Ähnlichkeit erschwert Suche (Duncan & Humphreys, 1989) | Zeichen muss nicht gelesen werden, wenn der Ring das Ziel zeigt; Paare nicht gleichmäßig ähnlich | Entscheidungspunkt für den Bau (Zeichen zur Aufgabe machen oder ehrlich benennen) |
| **Stufen**, je Schritt ein Parameter | Größe und Weg gehen beide in die Fitts-Schwierigkeit ein; getrennte Änderung macht Ursachen erkennbar | keine Studie zur Stufenfolge | Größe → Abstand/Rand → Pause → ähnliche Zeichen → Symbole → Ablenker (ca. 12 Schritte, grob) |
| **Übungswirkung** | Übungseffekt in Sakkaden-, Zeige- und Reaktionsaufgaben | Transfer unklar; Alltag nicht belegt; Überschätzung bei trainingsähnlichem Test | „In der Übung wirst du besser; ob das im Alltag hilft, ist nicht belegt.“ |
| **Normwerte, Vergleiche** | – (keine Normen für diese Aufgabe) | – | **keine**; Werte nur im Vergleich mit sich selbst auf diesem Gerät |
| **Praxisperspektive** (Muchnick, Mountford) | – | nicht geprüft, keine konkrete Publikation | nicht als Quelle verwendet |

### Zur Quelle: Beschreibung des Auftraggebers

- **Was vorliegt:** eine Beschreibung des Auftraggebers (Optiker), sinngemäß: Aufbau (vier Ziele in den Ecken, Zeichen, Ring), Ablauf (zufälliges Ziel, kurze Pause, nie zweimal dasselbe Ziel), Zeichenfolge (einfach → ähnlich → Symbole),
  Stufen mit je einem Parameter, Auswertung (Treffer, Fehler, Auslassungen, mittlere Reaktionszeit Ziel → Touch, erste vs. letzte Hälfte, Richtungen). **Kein Video, keine Website, kein Code, kein App-Name.**
- **Unklar:** Welche Angaben aus der ursprünglichen App stammen und welche erst für Blickfit festgelegt wurden, ist nicht überliefert; die Spezifikation (Runde 5) gilt als Stand.
- **Das Original wird nicht bewertet, nur eingeordnet.** Es gibt keine Werbeaussagen und keine Normwerte, die zu prüfen wären; die Spezifikation verlangt ausdrücklich „kein Anspruch auf Wirkung“.

---

## 1. Die Idee: Wechsel von Aufmerksamkeit und Fixation zwischen vier Zielen

### 1.1 Was die Beschreibung verlangt

- Tablet ruhig auf einem Ständer, Person sitzt mittig, Kopf möglichst ruhig.
- Vier Zeichen in den vier Ecken; immer eines per Ring markiert (weich eingeblendet ≥ 100 ms, nicht nur Farbe); die Person **schaut hin, erkennt, tippt**; kurze variable Pause (300–800 ms; Stufe 1 ≈ 1 s); neues zufälliges Ziel, nie dasselbe zweimal; alle 12 gerichteten Wechsel etwa gleich oft.
- Fehler (falsches Ziel) bleiben als Fehler stehen, das richtige Ziel bleibt aktiv; Auslassung nach 5–6 s.
- Zeichen: A B C D oder 1 2 3 4 → B D P R, 6 8 9 5 → kleine Symbole; später Ablenker.
- 3 Blöcke à 60 s; Auswertung: Treffer/N, Fehler, Auslassungen, mittlere Reaktionszeit Ziel → Touch, erste vs. letzte Hälfte, Richtungsklassen → ← ↓ ↑ ↘ ↖ ↗ ↙ (ab ≥ 3 richtigen Antworten je Klasse).

### 1.2 Was sagt die Wissenschaft

**Sakkaden: Latenz, Amplitude, Richtung**
- **Latenz ≈ 200 ms, abhängig von der Reizfolge.** Endet der alte Fixationsreiz gleichzeitig mit dem Beginn des neuen Ziels, liegt die Latenz bei etwa 200 ms; mit einer Lücke von ≥ 200 ms bei etwa 150 ms; bleibt der alte Reiz ≥ 100 ms länger stehen, bei etwa 250 ms
  (Saslow, 1967; Abstract). Mit Lücke gibt es zwei Häufungen, Express-Sakkaden um 100 ms und reguläre um 150 ms (Fischer & Ramsperger, 1984). Vom Reiz ausgelöste Sakkaden sind schneller als willentliche (Walker et al., 2000).
  Beim 4-Ziele-Wechsel blendet der Ring am alten Ziel aus, während er am neuen einblendet – das entspricht eher der „gleichzeitigen“ Bedingung (**Herleitung**).
- **Amplitude.** Die Sakkadendauer steigt im Mittel um 2,7 ms pro Grad (Baloh et al., 1975; n = 25). Die Latenz ist von etwa 0,75 bis 12° ein Plateau und steigt zur Peripherie allmählich an (Kalesnykas & Hallett, 1994);
  zwischen 1,5 und 8° war sie von der Exzentrizität unabhängig (Dafoe et al., 2007). Die Sprünge der Übung (≈ 14–33°) liegen oberhalb des Plateaus.
- **Richtung.** Horizontale Sakkaden hatten kürzere Latenz als vertikale; nach oben waren Sakkaden schneller als nach unten (Dafoe et al., 2007; Abegg et al., 2015: alle geprüften Typen außer gedächtnisgeführten);
  in einer Metaanalyse über 23 Datensätze (visuelle Suche, Szenenbetrachtung) waren Fixationsdauern vor Aufwärts-Sakkaden im Mittel **25 ms kürzer** (g = 0,97; in 19 von 23 Datensätzen signifikant; Greene et al., 2020);
  die Einleitung nennt für Ziele im oberen Gesichtsfeld 20–50 ms kürzere Latenz. Latenzen nach unten waren größer; der Effekt folgt der egozentrischen, nicht der gravitativen Senkrechten, also der **Kopfachse** (Honda & Findlay, 1992).
  Schräge Sakkaden haben langsamere Komponenten als rein horizontale oder vertikale gleicher Größe, und die Bahn ist oft gekrümmt (Becker & Jürgens, 1990; n = 10).
- **Alter und Streuung.** Junge Erwachsene hatten die schnellsten Sakkadenreaktionszeiten und die kleinste Streuung, Kinder (5–8 J.) waren langsam und streuten stark, Ältere (60–79 J.) waren langsamer (Munoz et al., 1998; n = 168).
- **Kopf.** Der Bereich, in dem Gesunde nur die Augen bewegen, war 35,8 ± 31,9° breit (Mittel ± SD) und je Person reproduzierbar (Stahl, 1999): „Kopf ruhig“ ist eine Bitte, die nicht jede Person gleich leicht erfüllt.

**Aufmerksamkeit und Fixation**
- **Kopplung.** Unterscheidung am Sakkadenziel war am besten, an Nachbarn nahe Zufall (Deubel & Schneider, 1996); Aufmerksamkeit auf ein Ziel erleichtert Sakkaden, und es ist nicht möglich, schnell und genau zu einem Ziel zu blicken
  und zugleich anderswo genau zu urteilen (Kowler et al., 1995; Hoffman & Subramaniam, 1995).
- **Premotor-Theorie.** Aufmerksamkeit wird zu einem Punkt orientiert, wenn das okulomotorische Programm bereit ist (Rizzolatti et al., 1987: Kosten bei falsch orientierter Aufmerksamkeit, zusätzliche Kosten beim Überqueren des horizontalen/vertikalen Meridians). Die Theorie gilt als **zu stark**: Aufmerksamkeit ist
  nicht funktional gleich Bewegungsvorbereitung; für exogene Aufmerksamkeit ist die Abhängigkeit möglich (Smith & Schenk, 2012).
- **Ablenker.** Entfernte Ablenker erhöhen die Sakkadenlatenz, am stärksten am Fixationsort; innerhalb von ≈ 20° der Zielachse beeinflussen sie die Amplitude, nicht die Latenz (Walker et al., 1997).
- **Rückkehr.** An einem Ort, von dem die Aufmerksamkeit abgezogen wurde, werden Reize verzögert beantwortet („Inhibition of Return“; Klein, 2000). Bei vier Zielen führt etwa jeder dritte Wechsel zum vorletzten Ziel zurück – mögliche Verzögerung, **nicht untersucht** (Annahme).
- **Fixationsstabilität.** Wurfscheibenschützen (n = 7) hielten die Fixation über 1 min auch mit Ablenkern stabiler als Kontrollen (n = 8; Di Russo et al., 2003); Querschnitt, kein Trainingsbeleg.

**Fitts'sches Gesetz und Hand-Auge-Koordination**
- **Weg und Zielbreite.** Bewegungszeit MT = a + b · log₂(A/W + 1) (Shannon-Form; MacKenzie, 1992; Fitts, 1954). In Fitts' Originaldaten (Stift) lag die Steigung bei 122–139 ms/bit (7,2–8,2 bit/s); über Geräte und Studien reicht der Index von 1,1 bis 13,7 bit/s (MacKenzie, 1992).
  Für **kleine** Ziele ist das klassische Modell bei Fingereingabe unzureichend (Bi et al., 2013); die Trefferflächen der Übung (≥ 21 mm) sind groß.
- **Blick vor Hand.** Der Blick geht der Zeigebewegung voraus und bleibt am Zielpunkt verankert; eine Sakkade zum nächsten Ziel während der Zeigebewegung ist um im Mittel 155 ms verzögert (Neggers & Bekkering, 2000). Der Arm-Muskel ist bei schnellen Zeigebewegungen meist **vor** dem Sakkadenbeginn aktiv,
  Richtung und Weite der Armbewegung sind vor der Sakkade festgelegt (Gribble et al., 2002) – Auge und Arm werden **parallel** vorbereitet. Im Alltag führt der Blick die Handlung (erste objektbezogene Fixation im Mittel 0,56 s vorher; Land et al., 1999) – ein Beschreibungsbefund, kein Trainingsbeleg.

**Wahlreaktion**
- **Hick-Hyman.** Die Wahlreaktionszeit wächst mit dem Logarithmus der Alternativenzahl (Hick, 1952; Hyman, 1953); vier gleich wahrscheinliche Alternativen sind 2 Bit (**Herleitung**). Bei sehr kompatiblen Zuordnungen ist die Kurve nahezu flach, Übung flacht sie weiter ab (Proctor & Schneider, 2018).
  Beim 4-Ziele-Wechsel ist die Antwort **der Ort des Reizes** (räumlich passend), der Hick-Anteil dürfte klein sein; die „Wahl“ ist vor allem eine räumliche Auswahl.

**Suche, Crowding, Zeichenähnlichkeit**
- **Ähnlichkeit.** Suchschwierigkeit steigt mit der Ähnlichkeit von Ziel und Nichtzielen und sinkt mit der Ähnlichkeit der Nichtziele untereinander (Duncan & Humphreys, 1989).
- **Crowding.** Der kritische Abstand ist etwa die halbe Exzentrizität (Bouma-Gesetz; Bouma, 1970; Pelli & Tillman, 2008; Whitney & Levi, 2011); bei 26° Exzentrizität ≈ 13° (**Herleitung**). Enge Abstände verändern die Verwechslungsmuster (Liu & Arditi, 2001).
- **B D P R.** In der eigenen Auswertung der Tabellen von Mueller & Weidemann (2012; 118 bzw. 96 Studierende, 2-AFC, Großbuchstaben, 325 Paare, Rang 1 = niedrigste Genauigkeit) lag **B–P** in beiden Experimenten unter den schwerer unterscheidbaren Paaren (Rang 58 bzw. 50), **D–R** unter den leichtesten (Rang 299 bzw. 290);
  B–D, B–R und P–R lagen im Mittelfeld bzw. uneinheitlich (P–R: 67 bzw. 257). Das sind Gruppenmittel einer Schrift mit Maske, keine Aussage für unsere Schrift; es stützt aber **keine pauschale** Aussage „B D P R sind besonders ähnlich“.

**Touch und Gerät**
- Web-App auf dem Smartphone: Reaktionszeiten **zu lang** gemessen (Roboterfinger): iPhone 6S im Mittel +57,6–58,0 ms, Galaxy S7 +66,1–69,8 ms, Einzelwerte ≈ 45–131 ms; Laptops im Mittel +61,9 bis +132,9 ms; **Tablets nicht gemessen**; Streuung je Gerät ≈ 7 ms. Absolute Werte sind stärker betroffen als Unterschiede innerhalb einer Person (Pronk et al., 2020; Tabelle 4).

**Vorsichtsgruppen (Einschätzungen, keine medizinischen Aussagen)**
- **Nystagmus:** Fixation ist anders (224 Personen mit infantilem Nystagmus: Amplituden 0,3–15,7°, Frequenzen 0,5–8 Hz; Abadi, 2002); aus Zeiten darf nichts über das Auge geschlossen werden.
- **Schielen, Amblyopie:** Auge-Hand-Zeiten sind anders (längere Beschleunigungsphase des Greifens nach der Zielfixation, mehr Korrektur-Sakkaden; n = 46; Niechwiej-Szwedo et al., 2014); Werte nicht mit Gleichaltrigen vergleichen.
- **Gleitsicht:** Neue Gleitsichtträger nutzten mehr Kopfbewegungen bei Blickwechseln (n = 10; Hutchings et al., 2007); die Anpassung ist individuell verschieden (Alvarez et al., 2017). Die oberen Ecken liegen ≈ 7–9° über der Blickmitte (Herleitung).
- **Bildschirmbeschwerden:** 64–90 % der Computernutzer berichten Sehbeschwerden wie Augenbelastung, Kopfschmerz, trockene Augen (Rosenfield, 2011); die Lidschlagrate sinkt beim Bildschirmsehen im Mittel auf ein Fünftel (Patel et al., 1991) – kurze Einheiten, bewusst blinzeln. Zu Migräne gibt es keine geprüfte Quelle (Vorsichtsempfehlung).

**Evidenz:** Sakkaden-Grundlagen **stark** · Kopplung Aufmerksamkeit–Blick **stark** (Premotor-Theorie **schwach**) · Fitts **stark** · Übung verbessert die Aufgabe **mittel** · naher Transfer **unklar** · Alltag **fehlend**.

### 1.3 Wo die Idee wissenschaftlich schwach ist

| Punkt | Warum schwach | Quelle / Einordnung |
|---|---|---|
| „Visuo-motorische Reaktionszeit“ als Maß für den Fixationswechsel | Die Zeit enthält Sakkade **und** Fingerweg **und** Erkennen; ohne Eye-Tracker nicht trennbar; der Fingerweg ist vermutlich der größte Posten | Saslow, 1967; Woods et al., 2015; Fitts; Gribble et al., 2002 (Abschnitt 2) |
| „Richtungen getrennt“ | Richtung = Weg (Länge, Armbewegung); der Weglängeneffekt (≈ 55–90 ms) übertrifft die Sakkadenasymmetrie (≈ 20–50 ms) | MacKenzie, 1992; Greene et al., 2020 (Abschnitt 3) |
| Mindestmenge „≥ 3 richtige Antworten je Klasse“ | Das Mittel von 3 Antworten hat eine Unsicherheit von ≈ 60–115 ms; ein Vergleich zweier Klassen ist bei < 16 je Klasse nur für Unterschiede > 150 ms möglich | Herleitung, Abschnitt 3; Hedge et al., 2018 |
| „Ermüdung“ innerhalb von 3 × 60 s | Üben, Stufenwechsel (je ≈ 12 Ziele) und Müdigkeit überlagern; Pausenwirkung umstritten | Karantinos et al., 2025; Ariga & Lleras, 2011; Helton & Russell, 2012 (Abschnitt 4) |
| Ähnliche Zeichen als „visuelle Diskrimination“ | Wenn der Ring das Ziel zeigt, ist das Zeichen für das Tippen nicht nötig; B D P R sind nicht gleichmäßig ähnlich | Duncan & Humphreys, 1989; Mueller & Weidemann, 2012 (Herleitung) |
| „Fixation“ | Wird weder gemessen noch erzwungen; nur Tippen ist erzwungen | – |
| Stufen nach Tempo, Größe, Abstand, Zeichen | keine Studie zur Stufenfolge; Reihenfolge ist Designentscheidung | – |
| Praxisperspektive (Muchnick, Mountford) | nicht geprüft; keine konkrete Publikation gefunden | Abschnitt 6 |
| Keine Normwerte, keine Wirkversprechen | für diese Aufgabe gibt es keine Normen; jede Einordnung wäre erfunden | Dokument 04, Abschnitt 10 |

### 1.4 Was Blickfit deshalb anders macht (Spezifikation, Zahlen grob, Details können sich ändern)

| Änderung / Entscheidung | Grund | Quelle |
|---|---|---|
| **Messgröße „Reaktionszeit Ziel → Touch“**, **nicht** Sakkadenlatenz; im Ergebnistext: „Dein Blick wird nicht gemessen“ | Die Zeit ist eine Summe überlappender Anteile; ohne Eye-Tracker kein Sakkadenmaß | Saslow, 1967; Gribble et al., 2002; Woods et al., 2015 |
| **Median neben Mittelwert**, nur richtige Erst-Tipps; Antworten unter ≈ 250 ms nicht gezählt (**Designvorschlag**) | Reaktionszeiten sind rechtsschief; < 250 ms ist als Antwort auf das Ziel nicht plausibel (einfache Reaktion ≈ 213–231 ms plus Fingerweg) | Woods et al., 2015; Herleitung |
| **Richtungsauswertung erst ab genügend Wiederholungen** (Vorschlag ≈ 10–15 je Klasse), mit Unsicherheit, nach Achsen zusammengefasst; Hinweis „Wege, nicht Augenwerte“ | Mittel aus wenigen Durchgängen sind unsicher; Richtung und Weg sind verknüpft | Hedge et al., 2018; Miller & Ulrich, 2013; Fitts (Herleitung) |
| **Ermüdungsvergleich nur grob:** „erste vs. letzte Hälfte“ als Hinweis mit Vorbehalt, nur auf gleicher Stufe | Lernen, Stufenwechsel und Müdigkeit überlagern | Karantinos et al., 2025; Nuechterlein et al., 1983 |
| **Ein Parameter je Stufe** (ca. 12 Schritte: Größe → Abstand/Rand → Pause 1.200 → 600 ms → ähnliche Zeichen → Symbole → Ablenker); Tabelle dokumentiert und getestet | Größe und Weg gehen beide in die Fitts-Schwierigkeit ein; nur getrennte Änderung zeigt, **was** schwerer wurde | Fitts, 1954; MacKenzie, 1992 |
| **Automatische Anpassung je ≈ 12 Ziele** (≥ 90 % schwerer, 75–89 % gleich, < 75 % leichter) | adaptive Schwierigkeit; die Stufe nach 12 Zielen ist verrauscht (z. B. bei wahrer Quote 85 %: ≈ 44 % Aufstieg), deshalb **grober** Hauptwert | Herleitung (Binomial) |
| **Keine Normwerte, keine Altersvergleiche, keine Ranglisten, keine „Test“-Sprache** | keine Normen für diese Aufgabe; Diagnose-Nähe groß | Dokument 01, Abschnitt 4; Dokument 05, Abschnitt 5 |
| **Kein Patientenname/-code im Browser** (kein Login, alles lokal); Gerät, Abstand, Brille, Hand und Stufe werden außerhalb der App notiert; Optiker-Werkzeug nur als spätere **Erweiterung** | Datenschutz, Zweckbestimmung (keine Gesundheitsdaten-Plattform) | Dokument 01, Abschnitt 4 |
| **Touch-Hinweis:** „Touchscreens messen Zeiten zu lang“ (Smartphones im Mittel ≈ 58–70 ms; Tablets nicht gemessen) | absolute Zeiten sind gerätegebunden, Verlauf auf demselben Gerät ist robuster | Pronk et al., 2020 |
| **Zeichen und Ring:** Entscheidung für den Bau – Zeichen zur Aufgabe machen oder ehrlich als „Zeichen wechseln, Aufgabe bleibt“ benennen | sonst messen „ähnliche Zeichen“ und „Symbole“ keine Unterscheidung | Duncan & Humphreys, 1989 (Herleitung) |
| **Weiche Übergänge** (≥ 100 ms), kein Blinken, Ablenker ruhig, **Farbe nie allein** (Ring, Form, Haken/Kreuz), Trefferfläche ≥ 72 px Radius (schwerste Stufen ≥ 56 px), keine Zeitstrafe | Sicherheit, Barrierefreiheit | Dokument 03, 4.7; WCAG 2.2 (1.4.1) |
| **„Schauen“-Modus** nur als Erweiterung (Zeichen aussprechen, ohne Messung) | Kernmodus soll vollständig sauber sein | Spezifikation |

**Stand der Umsetzung** (`src/exercises/vier-ziele-wechsel/logic.ts`, 02.10.2026; kann sich ändern): 12 Stufen mit je **einem** geänderten Parameter – Größe (Stufe 1–3), Rand (4–5), Pause 1.200 → 1.000 → 800 → 600 ms (6–8), ähnliche Zeichen (9), kleine Symbole (10), Ablenker 3 und 6 (11–12); Abschnitt = 12 Ziele; Aufstieg bei ≥ 90 % richtig **und** gleichmäßiger Zeit; Blöcke 60 s, Pause 10 s; Auslassung nach 6 s.
**Abgleich mit diesem Dokument (Hinweise):** Mindestzahl für ein Richtungsmittel ist noch 3 (hier empfohlen: ≈ 10–15); der Richtungshinweis „übe ruhig öfter die langsamere Richtung“ ist bei Wegklassen und wenigen Durchgängen nicht gedeckt; untere Grenze gültiger Zeiten 100 ms (hier empfohlen: ≈ 250 ms); Zusammenfassung mit Mittelwert (hier empfohlen: Median ergänzen); der Ermüdungs-Hinweis (letzte Hälfte > 15 % langsamer) ist ein Vorbehalt, kein Ermüdungswert.

**Offene Punkte:** Zeichen/Ring klären; Mindestzahl für die Richtungsanzeige festlegen; Median ergänzen; Schwelle für zu frühe Tipps; Hochformat/Smartphone (kleinere Winkel) im Ergebnistext berücksichtigen.

### 1.5 Ehrliche Formulierung für Laien

> **DE:** „Beim 4-Ziele-Wechsel tippst du immer das markierte Ziel in einer der vier Ecken. Gemessen wird die Zeit vom Erscheinen des Rings bis zum Tippen – nicht dein Blick. Mit Übung wird man in dieser Aufgabe
> schneller; ob das im Alltag hilft, ist nicht belegt. Deine Werte gelten nur für dieses Gerät.“
>
> **IT (Entwurf, fachkundig prüfen lassen):** „Nel *Cambio tra 4 bersagli* tocchi sempre il bersaglio contrassegnato in uno dei quattro angoli. Viene misurato il tempo dalla comparsa dell'anello al tocco, non il tuo sguardo.
> Con la pratica si diventa più veloci in questo esercizio; non è dimostrato che ciò aiuti nella vita quotidiana. I tuoi valori valgono solo per questo dispositivo.“

Vermeiden: „trainiert deine Sakkaden“, „misst deine Fixation“, „visuo-motorische Leistung“, „Ermüdungstest“, „besser als X % …“.

---

## 2. Die Messgröße „Reaktionszeit Ziel → Touch“: was sie ist und was nicht

**Definition:** Zeit vom Beginn der Einblendung des Rings (Frame-Zeitstempel) bis zum Antippen (`event.timeStamp`); gewertet nur für richtige Erst-Tipps. **Nicht** gemessen: Blickrichtung, Fixationsdauer, Sakkadenlatenz, Sakkadengenauigkeit.

| Anteil | Größenordnung | Quelle / Herleitung |
|---|---|---|
| Einblenden des Rings (≥ 100 ms, weich) | Zeitstempel = Beginn der Einblendung; „sichtbar“ erst nach einem Teil davon (≈ 50–100 ms, Annahme) | Spezifikation; Herleitung |
| Entdecken des Reizes | ≈ 130 ms (Reizentdeckungszeit, altersunabhängig) | Woods et al., 2015 |
| Sakkadenlatenz | ≈ 200 ms (150–250 ms je nach Reizfolge) | Saslow, 1967 |
| Sakkadendauer | 2,7 ms/° × 14–33° ≈ 40–90 ms (nur Steigung) | Baloh et al., 1975; Herleitung |
| Erkennen und Entscheiden | Hick-Anteil bei räumlich passender Antwort nahezu flach; Zeichenerkennung: **keine geprüfte Zahl** | Proctor & Schneider, 2018 |
| Beginn der Fingerbewegung | Arm-Muskel meist **vor** der Sakkade aktiv (parallel) | Gribble et al., 2002 |
| Fingerbewegung (Fitts) | ≈ 0,4–0,6 s (6 bit/s angenommen) | MacKenzie, 1992; Herleitung |
| Gerät/Touch (Web-App) | + ≈ 58–70 ms (Smartphones) | Pronk et al., 2020 |

**Die Anteile überlappen** (Auge und Arm werden gleichzeitig vorbereitet; der Blick bleibt am Ziel, bis der Finger ankommt: Neggers & Bekkering, 2000), deshalb gibt es **keine Summe** und keine Möglichkeit, einen Anteil herauszurechnen. Plausibel ist nur:
- **Der Fingerweg ist vermutlich der größte Einzelposten**; die Sakkadenanteile (Latenz ≈ 200 ms, Dauer ≈ 40–90 ms) sind ein Teil der Zeit.
- Unterschiede zwischen zwei Sitzungen können von **Haltung, Abstand, Hand, Finger, Tablet-Neigung, Brille** ebenso kommen wie von den Augen.
- **Absolute Zeiten sind nicht vergleichbar** mit Laborwerten (weiche Einblendung, Touch-Latenz, Web-Browser) – und sollen es nicht sein.
- Was die Messgröße sinnvoll zeigt: **den eigenen Verlauf der Gesamtzeit** auf demselben Gerät, in gleicher Aufstellung, auf gleicher Stufe.

**Warum nicht „Sakkadenlatenz“ anzeigen?** Weil sie nicht gemessen wird (kein Eye-Tracker), weil die Zeit überwiegend andere Anteile enthält und weil eine solche Anzeige einem Messwert mit **medizinischem Anschein** gleichkäme (Abschnitt 7). Die Spezifikation verbietet sie ausdrücklich.

---

## 3. Richtungen und Wiederholungen: wie viele Durchgänge je Richtung?

### 3.1 Richtung ist Weg (Herleitung; Annahmen: 10,9″-Tablet quer, 1.180 × 820 CSS-px, 0,192 mm/px, 40 cm, 36 px/°, Ziele 90–160 px vom Rand)

| Weg | Länge | Winkel | Fitts-ID (W = 27,6 mm / 21,5 mm; Rand 120 px) |
|---|---|---|---|
| horizontal | ≈ 165–192 mm | ≈ 24–28° | 2,9 / 3,2 bit |
| vertikal | ≈ 96–123 mm | ≈ 14–18° | 2,3 / 2,6 bit |
| diagonal | ≈ 191–228 mm | ≈ 28–33° | 3,1 / 3,4 bit |

Differenz horizontal – vertikal ≈ 0,6 bit; bei 100–130 ms/bit (nach MacKenzie, 1992; für Touch **nicht geprüft**) **≈ 55–90 ms allein durch die Weglänge** – mehr als die Richtungsunterschiede der Sakkadenlatenz (≈ 20–50 ms; Greene et al., 2020).
Im Hochformat vertauschen sich horizontal und vertikal; am Smartphone sind alle Winkel etwa halb so groß. **„Schnellste und langsamste Richtung“** zeigt daher vor allem, welcher Weg kurz oder lang war. Dazu kommen Händigkeit, Armhaltung und eine mögliche Verzögerung bei Rückkehr-Wechseln (Klein, 2000; nicht untersucht).

### 3.2 Zahl der Durchgänge

Die 12 gerichteten Wechsel fallen in 8 Klassen: → und ← je 2 Wechsel, ↓ und ↑ je 2, ↘ ↖ ↗ ↙ je 1. Bei 1,3–2,2 s je Ziel (Annahme) ergeben 3 × 60 s ≈ 80–140 Ziele, je Klasse also
≈ 14–23 (horizontal/vertikal) bzw. ≈ 7–11 (diagonal) richtige Antworten.

| n je Klasse | Unsicherheit des Mittels (SD 150 ms) | Unsicherheit eines Unterschieds zweier Klassen (SD 150 ms) | erkennbarer Unterschied bei 80 % Sicherheit (SD 100 / 150 / 200 ms) |
|---|---|---|---|
| 3 | 87 ms | 122 ms | 229 / 343 / 457 ms |
| 8 | 53 ms | 75 ms | 140 / 210 / 280 ms |
| 16 | 38 ms | 53 ms | 99 / 148 / 198 ms |
| 30 | 27 ms | 39 ms | 72 / 108 / 145 ms |
| 60 | 19 ms | 27 ms | 51 / 77 / 102 ms |
| 100 | 15 ms | 21 ms | 40 / 59 / 79 ms |

*Annahmen:* Einzelzeit-Streuung (SD) 100/150/200 ms – eine **Größenordnung, nicht aus einer Studie** (die SD einer Reaktionszeitverteilung wächst linear mit dem Mittelwert; Wagenmakers & Brown, 2007); unabhängige Durchgänge; Mittelwerte; α = 0,05 zweiseitig; kleinster mit 80 % Sicherheit erkennbarer Unterschied ≈ 2,8 × Unsicherheit des Unterschieds.
Nötige Durchgänge **je Klasse** für 50 / 75 / 100 ms: SD 100: 63 / 28 / 16; SD 150: 142 / 63 / 36; SD 200: 251 / 112 / 63.

**Folgen und Vorschläge**
- **„Ab ≥ 3 richtigen Antworten je Klasse“ ist zu wenig.** Das Klassenmittel hat dann eine Unsicherheit von ≈ 60–115 ms. **Vorschlag:** Anzeige erst ab ≈ 10–15 richtigen Antworten und mit Unsicherheit (z. B. ± Standardfehler); nach **Achsen** zusammenfassen (horizontal / vertikal / diagonal); **Verlauf über mehrere Sitzungen** auf gleichem Gerät, gleicher Stufe und gleicher Aufstellung; nie als Befund; Beschriftung „Wege, nicht Augenwerte“.
- Differenzwerte sind als persönlicher Wert oft wenig zuverlässig (Test-Retest 0 bis 0,82 in sieben Aufgaben; Hedge et al., 2018); die Zuverlässigkeit hängt von der Durchgangszahl und der Streuung innerhalb und zwischen Personen ab (Miller & Ulrich, 2013).
- **Absolute Zeiten** sind gerätegebunden; Differenzen innerhalb einer Person sind robuster (Pronk et al., 2020).
- **Gleiche Stufe:** Die Stufe ändert sich je Segment; Richtungsvergleiche nur auf gleicher Stufe.

---

## 4. Ermüdung innerhalb von Blöcken

- **Was die Literatur misst.** Der „Vigilance decrement“ stammt aus langer, eintöniger Beobachtung mit seltenen Zielen (Mackworth, 1948: 2 h; Zahlen nur über Sekundärquellen); bei stark degradierten Reizen zeigte sich schon nach 5 min ein starker Empfindlichkeitsverlust (Nuechterlein et al., 1983), in einer 12-min-Aufgabe ebenfalls ein Dekrement (Temple et al., 2000). Der Abfall hängt von Aufgabentyp,
  Ereignisrate und Reiztyp ab (See et al., 1995).
- **Was hier anders ist.** Blöcke von nur 60 s, häufige Ziele (alle ≈ 1,3–2,2 s), das Tempo bestimmt die Person. Der klassische Vigilanzabfall ist nicht der erwartete Hauptfaktor.
- **Überlagerung:** Sakkadenaufgaben werden mit Wiederholung schneller, genauer und stabiler (30 Erwachsene, 3 Sitzungen; Karantinos et al., 2025); die automatische Anpassung ändert die Schwierigkeit nach je ≈ 12 Zielen. Eine Verlangsamung am Ende ist daher **nicht eindeutig Ermüdung**.
  Bei je ≈ 40–70 Zielen je Hälfte (SD 150 ms) ist ein Unterschied erst ab ≈ 70–95 ms sicher erkennbar (Herleitung).
- **Pausen:** Ob kurze Aufgabenwechsel das Dekrement verhindern, ist umstritten (Ariga & Lleras, 2011: ja; Helton & Russell, 2012: nein, 498 Teilnehmende, Bayes-Evidenz für die Nullhypothese). Die Pause zwischen den Blöcken (≥ 5 s) ist eine **Bedienhilfe**, keine Wirkaussage.
- **Entscheidung:** „Erste vs. letzte Hälfte“ nur als **Hinweis mit Vorbehalt** („kann Üben, Stufenwechsel oder Müdigkeit zeigen“), nur auf gleicher Stufe; kein Ermüdungswert, keine Vigilanzaussage.

---

## 5. Studienlage zu Sakkaden- und Blicktraining – kritische Einordnung

| Studie | Design | Befund | Einordnung für 905 |
|---|---|---|---|
| Karantinos et al., 2025 | 30 Erwachsene, 3 Sitzungen, Sakkadenaufgaben mit Eye-Tracker | Wiederholung verbessert Genauigkeit, Tempo und Stabilität; keine Tageszeit-Wirkung | **Übungseffekt** in Sakkadenaufgaben bestätigt (misst Sakkaden, nicht Ziel → Touch) |
| Montenegro & Edelman, 2019 | 12 Trainingssitzungen, Pro-/Antisakkaden | Prosakkaden-Training verbesserte Pro- **und** Antisakkaden; Antisakkaden-Training teils; kaum Nachteile; Training erleichtert Fixationslösung und Bewegungsvorbereitung | **naher Transfer innerhalb von Sakkadenaufgaben** im Labor |
| Jóhannesson et al., 2018 | Express-Sakkaden-Training | Express-Sakkaden nehmen zu; Übertragung zwischen Hemifeldern und Augen; Spitzengeschwindigkeit steigt | wie oben |
| Di Russo et al., 2003 | Wurfscheibenschützen n = 7 vs. Kontrollen n = 8; ein trainierter Proband | schnellere Latenz, stabilere Fixation bei Ablenkern (Querschnitt); Lernen des Einzelnen **retinotop**, kein Transfer | uneinheitlich: Transfer auf andere Positionen **nicht** gefunden (n = 1) |
| Abernethy & Wood, 2001 | 40 Personen, 4 Wochen, Placebo und Kontrolle | kein Effekt über Testvertrautheit hinaus | allgemeines Sehtraining ohne Beleg |
| Guo et al., 2025 | 33 RCTs, 1.048 Personen | Verbesserungen bei Reaktionszeit, Aufmerksamkeit, Entscheidungsgenauigkeit, Auge-Hand-Koordination; **große Effekte vor allem bei trainingsähnlichem Test** (Reaktionszeit SMD 2,66 vs. 0,50) | Lerneffekt überschätzt Wirkung |
| Simons et al., 2016 | Übersicht über Brain-Training | Verbesserung der geübten Aufgabe, wenig bei entfernten Aufgaben und Alltag | Transfer-Vorbehalt |
| Handler & Fierson, 2011 | Konsenspapier AAP/AAO u. a. | Evidenz stützt Sehtraining, Muskelübungen, Tracking-Übungen **nicht** als Behandlung von Lernstörungen | Augenübungen ≠ Therapie |
| Facchin et al., 2025; Jafarlou, 2024 | 21 Kinder (14 vs. 7); 30 randomisierte Kinder (Abstract) | Verbesserungen von Lesen nach Okulomotorik-Training berichtet | **schwach** (klein, kurz, Abstract-Ebene); ersetzt Konsenspapier nicht; nicht für 905 |
| Roth et al., 2009; Pollock et al., 2019 (Cochrane) | Hemianopie (n = 28, RCT); Schlaganfall mit Gesichtsfeldausfall (20 Studien, 732) | Such-Reaktionszeit auf blinder Seite sinkt; Scanning-Training bei niedriger Evidenzqualität besser bei Lebensqualität, niedrige bis sehr niedrige Evidenz für **keinen** Effekt auf Gesichtsfeld, Lesen, erweiterte Alltagsaktivitäten | **klinischer Kontext unter Anleitung**; nicht auf Gesunde übertragbar; **kein** Heilversprechen |

**Fazit:** Übungseffekt in der Aufgabe: **mittel** (breit belegt für Aufgabenarten, aber nicht für diese Übung). Naher Transfer: **unklar** (im Labor teils zwischen Sakkadentypen, nicht gezeigt für Ziel → Touch). Alltagstransfer: **fehlend**. Vision Therapy und Okulomotorik-Programme sind für Lernstörungen **nicht belegt** (Handler & Fierson, 2011).
Evidenz für Kranke (Hemianopie) betrifft angeleitete Programme und gilt nicht für diese Übung.

---

## 6. Die Praxisperspektive des Auftraggebers (Muchnick, Mountford) – nicht geprüft

- **Was bekannt ist:** Der Auftraggeber verweist auf die Praxis-Perspektive von **Bruce Muchnick** und **John Mountford**; er bezeichnet beide als Vision-Therapy-Praktiker. Das ist die Sicht von Praktikern auf ein Üben von Fixationswechseln.
- **Was geprüft wurde:** Eine Websuche (02.10.2026) nach konkreten Publikationen zu einem 4-Ziele-Fixationswechsel der beiden ergab **nichts Einschlägiges**; es fand sich nur ein Lehrbuch gleichen Autorennamens („Clinical Medicine in Optometric Practice“), das nicht zum Thema gehört und nicht geprüft wurde.
- **Umgang:** Die Perspektive wird als **„Praxisperspektive des Auftraggebers, nicht geprüft“** erwähnt und **nicht als Quelle** zitiert. Sie ersetzt keine Studie und taucht in keinem Satz auf, der eine Wirkung behauptet.
- **Einordnung der Idee, unabhängig davon:** Dass man vier feste Orte reihum fixiert und tippt, ist eine Aufgabe, die in Labor und Alltag der Blicksteuerung vorkommt (Abschnitt 1.2); ob ein **Training** dieser Aufgabe über die Aufgabe hinaus hilft, ist nicht belegt (Abschnitt 5).

---

## 7. Rechtliches & Formulierungen – Ergänzungen für diese Übung (kein Rechtsrat)

Grundlagen (EU-MDR, Zweckbestimmung, Werbung mit Gesundheitsaussagen, lokale Speicherung) siehe [Dokument 01, Abschnitt 4](01-reaktion-und-impulskontrolle.md); allgemeine Regeln siehe [Dokument 04, Abschnitt 10](04-konzentration-und-denken.md) und [Dokument 05, Abschnitt 5](05-links-rechts-und-richtung.md). Speziell hier:

- **Diagnose-Nähe ist groß.** Sakkaden, Fixation und Reaktionszeit werden in Augenheilkunde und Neurologie als Messgrößen benutzt; die Anwenderin oder der Anwender ist ein Optiker. Eine Plattform, die „Sakkadenlatenz“, „Fixationswert“ oder „Auffälligkeit“ anzeigt, würde sich einer medizinischen Zweckbestimmung nähern.
  Deshalb: **keine Sakkaden- oder Fixationswerte, keine Normwerte, keine Ampeln, keine Altersvergleiche, kein Hinweis „lassen Sie sich untersuchen“ auf Basis des Ergebnisses.** Die Anzeige heißt „Reaktionszeit Ziel → Touch“ und enthält den Hinweis, dass der Blick nicht gemessen wird.
- **Keine Therapie-Aussagen.** Kein „Vision Therapy“, „Reha“, „Augentraining gegen …“, „verbessert die Fixation / die Augenmuskeln / das Sehen / das Lesen / die Verkehrssicherheit“. Texte zu Wirkungen enden mit „… ist nicht belegt“.
- **Namen:** Kein „Test“ im Übungsnamen oder in der Auswertung („Ermüdungstest“, „Fixationstest“); „Übung“, „dein Verlauf“. „Angelehnt an bekannte Aufgaben aus der Forschung“ ist in Erklärtexten in Ordnung.
- **Kein Patientenname/-code im Browser.** Die Übung hat keine Benutzerkonten und speichert nur lokal im Browser. Wer Sitzungen einer Person zuordnen will, notiert Gerät, Abstand, Brille, Hand und Stufe **außerhalb der App**. Ein Optiker-Werkzeug mit Personenzuordnung wäre eine **Erweiterung** mit eigenem Datenschutzkonzept, Einwilligung und Prüfung der Zweckbestimmung (Hinweis, **nicht rechtlich geprüft**).
- **Vorsicht bei Beratung:** Der Optiker darf aus Ergebnissen dieser Übung keine Aussage über das Auge ableiten (Nystagmus, Gesichtsfeld, Schielen, Amblyopie, Gleitsichtverträglichkeit); die Werte sind Haltung-, Weg- und Gerätewerte (Abschnitt 2 und 3).
- **Praxisperspektive:** „Praxisperspektive des Auftraggebers, nicht geprüft“ – nicht als Beleg in Texten für Kundinnen und Kunden verwenden.
- **Italien:** IT-Texte (Entwurf oben) vor Veröffentlichung fachkundig prüfen lassen.

---

## 8. Quellen

- Abadi, R. V. (2002). Motor and sensory characteristics of infantile nystagmus. *British Journal of Ophthalmology*, *86*(10), 1152–1160. https://doi.org/10.1136/bjo.86.10.1152
- Abegg, M., Pianezzi, D., & Barton, J. J. S. (2015). A vertical asymmetry in saccades. *Journal of Eye Movement Research*, *8*(5), Article 3. https://doi.org/10.16910/jemr.8.5.3
- Abernethy, B., & Wood, J. M. (2001). Do generalized visual training programmes for sport really work? An experimental investigation. *Journal of Sports Sciences*, *19*(3), 203–222. https://doi.org/10.1080/026404101750095376
- Alvarez, T. L., Kim, E. H., & Granger-Donetti, B. (2017). Adaptation to progressive additive lenses: Potential factors to consider. *Scientific Reports*, *7*, 2529. https://doi.org/10.1038/s41598-017-02851-5
- Ariga, A., & Lleras, A. (2011). Brief and rare mental “breaks” keep you focused: Deactivation and reactivation of task goals preempt vigilance decrements. *Cognition*, *118*(3), 439–443. https://doi.org/10.1016/j.cognition.2010.12.007
- Baloh, R. W., Sills, A. W., Kumley, W. E., & Honrubia, V. (1975). Quantitative measurement of saccade amplitude, duration, and velocity. *Neurology*, *25*(11), 1065–1070. https://doi.org/10.1212/WNL.25.11.1065
- Becker, W., & Jürgens, R. (1990). Human oblique saccades: Quantitative analysis of the relation between horizontal and vertical components. *Vision Research*, *30*(6), 893–920. https://doi.org/10.1016/0042-6989(90)90057-R
- Bi, X., Li, Y., & Zhai, S. (2013). FFitts law: Modeling finger touch with Fitts' law. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '13)* (S. 1363–1372). ACM. https://doi.org/10.1145/2470654.2466180
- Bouma, H. (1970). Interaction effects in parafoveal letter recognition. *Nature*, *226*(5241), 177–178. https://doi.org/10.1038/226177a0
- Dafoe, J. M., Armstrong, I. T., & Munoz, D. P. (2007). The influence of stimulus direction and eccentricity on pro- and anti-saccades in humans. *Experimental Brain Research*, *179*(4), 563–570. https://doi.org/10.1007/s00221-006-0817-8
- Deubel, H., & Schneider, W. X. (1996). Saccade target selection and object recognition: Evidence for a common attentional mechanism. *Vision Research*, *36*(12), 1827–1837. https://doi.org/10.1016/0042-6989(95)00294-4
- Di Russo, F., Pitzalis, S., & Spinelli, D. (2003). Fixation stability and saccadic latency in élite shooters. *Vision Research*, *43*(17), 1837–1845. https://doi.org/10.1016/S0042-6989(03)00299-2
- Duncan, J., & Humphreys, G. W. (1989). Visual search and stimulus similarity. *Psychological Review*, *96*(3), 433–458. https://doi.org/10.1037/0033-295X.96.3.433
- Facchin, A., Maffioletti, S., Maffioletti, M., Esposito, G., Bonetti, M., Girelli, L., & Daini, R. (2025). Oculomotor training improves reading and associated cognitive functions in children with learning difficulties: A pilot study. *Vision*, *9*(4), 83. https://doi.org/10.3390/vision9040083
- Fischer, B., & Ramsperger, E. (1984). Human express saccades: Extremely short reaction times of goal directed eye movements. *Experimental Brain Research*, *57*(1), 191–195. https://doi.org/10.1007/BF00231145
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, *47*(6), 381–391. https://doi.org/10.1037/h0055392
- Greene, H. H., Brown, J. M., & Strauss, G. P. (2020). Shorter fixation durations for up-directed saccades during saccadic exploration: A meta-analysis. *Journal of Eye Movement Research*, *12*(8), Article 5. https://doi.org/10.16910/jemr.12.8.5
- Gribble, P. L., Everling, S., Ford, K., & Mattar, A. (2002). Hand-eye coordination for rapid pointing movements. *Experimental Brain Research*, *145*(3), 372–382. https://doi.org/10.1007/s00221-002-1122-9
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology*, *16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572
- Handler, S. M., Fierson, W. M., Section on Ophthalmology, Council on Children with Disabilities, American Academy of Ophthalmology, American Association for Pediatric Ophthalmology and Strabismus, & American Association of Certified Orthoptists. (2011). Learning disabilities, dyslexia, and vision. *Pediatrics*, *127*(3), e818–e856. https://doi.org/10.1542/peds.2010-3670
- Hedge, C., Powell, G., & Sumner, P. (2018). The reliability paradox: Why robust cognitive tasks do not produce reliable individual differences. *Behavior Research Methods*, *50*(3), 1166–1186. https://doi.org/10.3758/s13428-017-0935-1
- Helton, W. S., & Russell, P. N. (2012). Brief mental breaks and content-free cues may not keep you focused. *Experimental Brain Research*, *219*(1), 37–46. https://doi.org/10.1007/s00221-012-3065-0
- Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology*, *4*(1), 11–26. https://doi.org/10.1080/17470215208416600
- Hoffman, J. E., & Subramaniam, B. (1995). The role of visual attention in saccadic eye movements. *Perception & Psychophysics*, *57*(6), 787–795. https://doi.org/10.3758/BF03206794
- Honda, H., & Findlay, J. M. (1992). Saccades to targets in three-dimensional space: Dependence of saccadic latency on target location. *Perception & Psychophysics*, *52*(2), 167–174. https://doi.org/10.3758/BF03206770
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics*, *27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x
- Hyman, R. (1953). Stimulus information as a determinant of reaction time. *Journal of Experimental Psychology*, *45*(3), 188–196. https://doi.org/10.1037/h0056940
- Jafarlou, F. (2024). Oculomotor rehabilitation improves reading abilities in dyslexic children with concurrent eye movement abnormalities. *Clinical Pediatrics*, *63*(9), 1276–1286. https://doi.org/10.1177/00099228231221335
- Jóhannesson, Ó. I., Edelman, J. A., Sigurþórsson, B. D., & Kristjánsson, Á. (2018). Effects of saccade training on express saccade proportions, saccade latencies, and peak velocities: An investigation of nasal/temporal differences. *Experimental Brain Research*, *236*(5), 1251–1262. https://doi.org/10.1007/s00221-018-5213-7
- Kalesnykas, R. P., & Hallett, P. E. (1994). Retinal eccentricity and the latency of eye saccades. *Vision Research*, *34*(4), 517–531. https://doi.org/10.1016/0042-6989(94)90165-1
- Karantinos, T., Kotsiou, E., Drouza, P., Mantas, A., Anderson, A. J., Klein, C., & Smyrnis, N. (2025). Diurnal variation and practice effects in saccade task performance. *Experimental Brain Research*, *243*(8), 188. https://doi.org/10.1007/s00221-025-07131-7
- Klein, R. M. (2000). Inhibition of return. *Trends in Cognitive Sciences*, *4*(4), 138–147. https://doi.org/10.1016/S1364-6613(00)01452-2
- Kowler, E., Anderson, E., Dosher, B., & Blaser, E. (1995). The role of attention in the programming of saccades. *Vision Research*, *35*(13), 1897–1916. https://doi.org/10.1016/0042-6989(94)00279-U
- Land, M., Mennie, N., & Rusted, J. (1999). The roles of vision and eye movements in the control of activities of daily living. *Perception*, *28*(11), 1311–1328. https://doi.org/10.1068/p2935
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
- Rizzolatti, G., Riggio, L., Dascola, I., & Umiltá, C. (1987). Reorienting attention across the horizontal and vertical meridians: Evidence in favor of a premotor theory of attention. *Neuropsychologia*, *25*(1A), 31–40. https://doi.org/10.1016/0028-3932(87)90041-8
- Rosenfield, M. (2011). Computer vision syndrome: A review of ocular causes and potential treatments. *Ophthalmic and Physiological Optics*, *31*(5), 502–515. https://doi.org/10.1111/j.1475-1313.2011.00834.x
- Roth, T., Sokolov, A. N., Messias, A., Roth, P., Weller, M., & Trauzettel-Klosinski, S. (2009). Comparing explorative saccade and flicker training in hemianopia: A randomized controlled study. *Neurology*, *72*(4), 324–331. https://doi.org/10.1212/01.wnl.0000341276.65721.f2
- Saslow, M. G. (1967). Effects of components of displacement-step stimuli upon latency for saccadic eye movement. *Journal of the Optical Society of America*, *57*(8), 1024–1029. https://doi.org/10.1364/JOSA.57.001024
- See, J. E., Howe, S. R., Warm, J. S., & Dember, W. N. (1995). Meta-analysis of the sensitivity decrement in vigilance. *Psychological Bulletin*, *117*(2), 230–249. https://doi.org/10.1037/0033-2909.117.2.230
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do “brain-training” programs work? *Psychological Science in the Public Interest*, *17*(3), 103–186. https://doi.org/10.1177/1529100616661983
- Smith, D. T., & Schenk, T. (2012). The premotor theory of attention: Time to move on? *Neuropsychologia*, *50*(6), 1104–1114. https://doi.org/10.1016/j.neuropsychologia.2012.01.025
- Stahl, J. S. (1999). Amplitude of human head movements associated with horizontal saccades. *Experimental Brain Research*, *126*(1), 41–54. https://doi.org/10.1007/s002210050715
- Temple, J. G., Warm, J. S., Dember, W. N., Jones, K. S., LaGrange, C. M., & Matthews, G. (2000). The effects of signal salience and caffeine on performance, workload, and stress in an abbreviated vigilance task. *Human Factors*, *42*(2), 183–194. https://doi.org/10.1518/001872000779656480
- Wagenmakers, E.-J., & Brown, S. (2007). On the linear relation between the mean and the standard deviation of a response time distribution. *Psychological Review*, *114*(3), 830–841. https://doi.org/10.1037/0033-295X.114.3.830
- Walker, R., Deubel, H., Schneider, W. X., & Findlay, J. M. (1997). Effect of remote distractors on saccade programming: Evidence for an extended fixation zone. *Journal of Neurophysiology*, *78*(2), 1108–1119. https://doi.org/10.1152/jn.1997.78.2.1108
- Walker, R., Walker, D. G., Husain, M., & Kennard, C. (2000). Control of voluntary and reflexive saccades. *Experimental Brain Research*, *130*(4), 540–544. https://doi.org/10.1007/s002219900285
- Whitney, D., & Levi, D. M. (2011). Visual crowding: A fundamental limit on conscious perception and object recognition. *Trends in Cognitive Sciences*, *15*(4), 160–168. https://doi.org/10.1016/j.tics.2011.02.005
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience*, *9*, 131. https://doi.org/10.3389/fnhum.2015.00131
- W3C (2024). *Web Content Accessibility Guidelines (WCAG) 2.2*, SC 1.4.1. https://www.w3.org/TR/WCAG22/

---

## Anhang A: Verifikationshinweise

- **Volltext bzw. Tabellen gelesen (PMC-XML):** Pronk et al. (2020; PMC7280355: Tabelle 4 mit Mittel, SD, Minimum, Maximum je Gerät und Browser); Greene et al. (2020; PMC7881898: 25 ms, g = 0,97, 19 von 23 Datensätzen; Einleitung 20–50 ms); Mueller & Weidemann (2012; PMC3271710: Teilnehmerzahlen, Methode, Tabellen 2 und 3 für die eigene Paar-Auswertung); W3C WCAG 2.2 (SC 1.4.1, über Dokument 05).
- **Abstract gelesen (PubMed/NCBI, 02.10.2026):** Becker & Jürgens (1990), Dafoe et al. (2007), Honda & Findlay (1992), Kalesnykas & Hallett (1994), Walker et al. (1997, 2000), Stahl (1999), Munoz et al. (1998), Baloh et al. (1975), Fischer & Ramsperger (1984), Greene et al. (2020), Deubel & Schneider (1996), Kowler et al. (1995), Hoffman & Subramaniam (1995), Rizzolatti et al. (1987), Smith & Schenk (2012), Klein (2000), Gribble et al. (2002), Neggers & Bekkering (2000), Land et al. (1999),
  Woods et al. (2015), Pronk et al. (2020), Nuechterlein et al. (1983), Ariga & Lleras (2011), Helton & Russell (2012), Karantinos et al. (2025), Whitney & Levi (2011), Pelli & Tillman (2008), Liu & Arditi (2001), Mueller & Weidemann (2012), Proctor & Schneider (2018), Montenegro & Edelman (2019), Jóhannesson et al. (2018), Di Russo et al. (2003), Abernethy & Wood (2001), Guo et al. (2025), Simons et al. (2016),
  Handler & Fierson (2011), Roth et al. (2009), Pollock et al. (2019), Facchin et al. (2025), Jafarlou (2024), Abadi (2002), Niechwiej-Szwedo et al. (2014), Rosenfield (2011), Alvarez et al. (2017), Miller & Ulrich (2013), Wagenmakers & Brown (2007), Hedge et al. (2018), Hutchings et al. (2007).
- **Abstract über Verlags- bzw. Hochschulseite oder Websuche gelesen (nicht in PubMed):** Saslow (1967; Verlagsseite opg.optica.org), Abegg et al. (2015; Verlagsseite JEMR), MacKenzie (1992; Autorenseite), Bi et al. (2013; Google-Research-Seite), Duncan & Humphreys (1989; CBU-Bibliografie), See et al. (1995; Zusammenfassung über Websuche).
- **Nur Metadaten per Crossref geprüft, Inhalt als Standardwissen bzw. über genannte Übersichten:** Fitts (1954; PubMed ohne Abstract, Inhalt über MacKenzie), Hyman (1953), Bouma (1970; über Pelli & Tillman), Mackworth (1948; Zahlen nur über Sekundärquellen, nur qualitativ zitiert), Niemi & Näätänen (1981; im Katalogeintrag).
- **Eigene Herleitungen/Heuristiken** (im Text markiert): Geometrie (36 CSS-px pro Grad am 10,9″-Tablet in 40 cm, Wege und Winkel der Ecken), Fitts-Schwierigkeit je Weg und Weg-Unterschied in ms, Zeitkomponenten, Zahl der Durchgänge je Klasse, Standardfehler und erkennbare Unterschiede (mit angenommener Streuung 100/150/200 ms),
  Stufenentscheidung nach 12 Zielen (Binomial), Crowding-Abstand (0,5 × Exzentrizität), Hick-Bits bei vier Alternativen, Paar-Auswertung der Buchstaben-Genauigkeit (Mueller & Weidemann, 2012; Rangplätze), Latenz-Einordnung „gleichzeitig“ beim Ring-Wechsel.
- **Abweichung zur Spezifikation:** „Touchscreens messen 30–130 ms zu lang“ (Spezifikation, `docs/wissenschaft/README.md`) entspricht nicht ganz den Tabellenwerten bei Pronk et al. (2020): Smartphones im Mittel ≈ 58–70 ms, Laptops im Mittel bis ≈ 133 ms, Einzelwerte der Touchgeräte ≈ 45–131 ms; Tablets wurden nicht gemessen. Dieses Dokument verwendet die Tabellenwerte.
- **Nicht aufgenommen:** Muchnick und Mountford (keine konkrete einschlägige Publikation gefunden); Bahill, Adler & Stark (1975, „Most naturally occurring human saccades …“; weder über Crossref noch PubMed auffindbar); Theeuwes et al. (1998; Zahl nur über Sekundärangaben); Normwerte für Reaktionszeiten, Sakkaden oder Fixationen jeder Art.

## Anhang B: Aussagen, die wir auf der Website **nicht** machen

| Nicht sagen | Warum | Stattdessen |
|---|---|---|
| „Misst deine Sakkadenlatenz / Fixation / visuo-motorische Leistung“ | Kein Eye-Tracker; die Zeit enthält Fingerweg, Erkennen, Gerät; Anteile überlappen | „Zeit vom Erscheinen des Rings bis zum Tippen – dein Blick wird nicht gemessen“ |
| „Trainiert deine Augenmuskeln / Sakkaden / Fixation“ | Übungseffekt in der Aufgabe; Transfer unklar; kein Trainingsnachweis für die Muskeln | „Hier übst du, schnell zwischen vier Zielen zu wechseln und zu tippen“ |
| „Verbessert Lesen, Konzentration, Sport, Verkehrssicherheit“ | Alltagstransfer nicht belegt; Augenübungen bei Lernstörungen nicht belegt (Handler & Fierson, 2011); Effekte bei trainingsähnlichem Test überschätzt (Guo et al., 2025) | „ob sich das überträgt, ist nicht belegt“ |
| „Schnellste/langsamste Richtung zeigt, wo dein Blick schwächer ist“ | Richtung = Weg (Länge, Armbewegung); wenige Durchgänge; kein Eye-Tracking | „Das sind Wege auf diesem Tablet – keine Augenwerte; erst über mehrere Sitzungen aussagekräftig“ |
| „Ermüdungstest“, „Ihre Aufmerksamkeit lässt nach“ | 60-s-Blöcke; Üben, Stufenwechsel und Müdigkeit überlagern; Pausenwirkung umstritten | „erste vs. letzte Hälfte – kann Üben, Stufenwechsel oder Müdigkeit zeigen“ |
| „Dein Ergebnis ist auffällig / unterdurchschnittlich / besser als X %“ | keine Normen, geräteabhängig, Diagnoseanspruch | „schneller als letztes Mal – auf diesem Gerät“ |
| „Erkennt Nystagmus, Schielen, Gesichtsfeldausfall, Gleitsicht-Probleme“ | keine Diagnose; Werte sind Haltung-, Weg- und Gerätewerte | weglassen; bei Beschwerden Untersuchung beim Augenarzt/Optiker unabhängig vom Ergebnis empfehlen |
| „Nach der Praxis von Muchnick und Mountford“ | Praxisperspektive des Auftraggebers, nicht geprüft | weglassen |
| „Wissenschaftlich bewiesen“ | die Übung ist nicht untersucht | „beruht auf bekannten Aufgaben aus der Forschung“ |
