# Literaturbasis W13 – vier Buchstabentafeln im Wechsel („4 Chart Saccades“, Katalog 905)

Stand: 02.10.2026 · Gruppe W13 · Grundlage für den Katalogeintrag 905 „4-Ziele-Wechsel“ und das Dokument
`docs/wissenschaft/06-fixationswechsel.md`. Die Übung ist die klassische Sehtherapie-Übung **„Four Square / 4 Chart Saccades“**
mit vier **Hart-Chart-Tafeln** (Buchstabenrastern), bei der man „einen Buchstaben von jeder Tafel im Wechsel“ liest; Blickfit setzt sie als
Touch-Übung um. **Diese Datei ersetzt die erste Fassung**, die auf einem Missverständnis beruhte (ein Zeichen pro Ecke, zufällig wandernder Ring);
siehe `docs/wissenschaft/06-fixationswechsel.md`, Abschnitt „Was wir bei der ersten Fassung falsch verstanden haben“.

**So ist diese Datei zu lesen**

- Jede DOI in diesem Dokument wurde am 02.10.2026 über `api.crossref.org` aufgelöst und mit Titel, Autor:innen, Jahr, Zeitschrift,
  Band und Seiten verglichen. Abweichungen sind vermerkt.
- **Prüfgrad des Inhalts** (in Klammern hinter jeder Aussage):
  - **[A]** Abstract gelesen (PubMed/NCBI bzw. Europe PMC, am 02.10.2026)
  - **[A-W]** Abstract nur über die Verlags- oder Hochschulseite bzw. Websuche gelesen (nicht in PubMed) – ausdrücklich vermerkt
  - **[V]** Volltext bzw. die zitierte Passage selbst gelesen (z. B. PDF, PMC-Ergebnisteil, Tabellen, Webseite)
  - **[U]** Untertitelspur eines Videos gelesen (Video selbst nicht angesehen)
  - **[W02] [W03] [W04] [W09] [W12] [D01]–[D04]** Inhalt aus der genannten Literaturbasis bzw. dem Dokument übernommen (dort geprüft);
    DOI hier erneut per Crossref bestätigt
  - **[S]** nur über Sekundärquelle belegt – **als unsicher behandeln**
  - **[M]** nur Metadaten geprüft, Inhalt ist Standardwissen und wird nur allgemein zitiert
  - **[H]** eigene Herleitung (Rechnung), keine Studienaussage; die Annahmen stehen jeweils dabei
- **Keine Leistungsnormen:** Keine der Quellen enthält Normwerte für diese Übung; es werden keine abgeleitet.
- **Zahlen der Übung sind grob.** Die Übung wird neu gebaut; maßgeblich ist ihre Stufentabelle (`src/exercises/vier-ziele-wechsel/logic.ts`). Die Herleitungen in B.9 sind
  mit den Annahmen aufgeschrieben, damit sie sich nachrechnen lassen.
- Die Faktennummern **F01 … F63 bleiben aus der ersten Fassung erhalten** (Lücken = entfallen, weil sie nur das Einzelziel-Design betrafen); neue Fakten tragen **F64 ff.**

---

## A) Quellenlage der echten Übung

### A.0 Was geprüft wurde (02.10.2026)

| # | Quelle | Art | Zugriff / gelesen | Ergebnis |
|---|---|---|---|---|
| 1 | **Lam, V. (Insight Vision Optometry):** „Vision Therapy Exercise : 4 Chart Saccades Exercise“, YouTube, https://www.youtube.com/watch?v=Dpj_t4tJ8Vo, hochgeladen 18.12.2020, 5:15 min | Lehrvideo | **[U]** englische Untertitelspur (en-US, vom Kanal hochgeladen, nicht automatisch erzeugt) vollständig gelesen; Video selbst nicht angesehen; keine Kapitelmarken; Beschreibungstext gelesen | genaueste Regelbeschreibung (A.1) |
| 2 | **Emergent VT:** Aktivität „Four Charts“, https://www.emergentvt.com/activity | Anleitung eines Anbieters | **[V]** Text der Aktivität gelesen (ohne Datum) | Aufbau, Reihenfolge, Metronom, Hinweise für die helfende Person |
| 3 | **Marinoff, R. (2016):** Using vision therapy to maximize visual efficiency for low vision patients with central scotoma. *Optometry & Visual Performance*, 4(1), Art. 4, https://www.ovpjournal.org/uploads/2/3/8/9/23898265/marinoff16.pdf | Fachartikel, 2 Fallberichte | **[V]** Volltext (PDF) gelesen; keine DOI | „Four Corner Hart Chart Saccades“ (5 × 5, 12 Zoll, zeilenweise); Fallberichte |
| 4 | **Bernell / Jutron Vision:** „Four Corner Hart Chart Set“ (Art.-Nr. BC4DC36), https://www.jutronvision.com/product/four-corner-hart-chart-set/ | Produktseite | **[V]** Jutron-Seite gelesen; die Bernell-Seite (https://www.bernell.com/product/BC4DC36/152) war nicht abrufbar (Zugriffssperre), ein Suchauszug stimmt überein | 4 Tafeln, 36 pt Schrift, beidseitig bunt/schwarz, „designed for training saccadic movements“, QR-Code mit Aktivitäten |
| 5 | **Vivid Visions Optometry:** „Week 8: Four Square Vision Training“, 20.10.2025 (aktualisiert 11.12.2025), https://www.vividvisionsoptometry.com/post/week-8-four-square-vision-training | Blogbeitrag einer Praxis | Auslesen über WebFetch (curl: HTTP 429); sichtbarer Teil gelesen, der Rest steht hinter einer Anmeldung („Subscribe … to keep reading this exclusive post“); die Materialseite der Praxis nennt ein „Four Square Saccade Chart“ (PDF, nicht gelesen) | Praxisangaben ohne Beleg (A.3) |
| 6 | **Taub, M. (2014):** Vision therapy: A top 10 must-have list, *Optometry Times*, 01.08.2014, https://www.optometrytimes.com/vision-therapy-top-10-must-have-list | Praxisbericht | **[V]** Abschnitt „Hart charts“ gelesen | Hart Chart allgemein (Akkommodation: Nah/Fern, halbe Zeile; Sakkaden: äußere zwei Spalten abwechselnd); **keine** Vier-Tafel-Übung |
| 7 | **Vision & Learning Center:** „Vision Therapy Activity: Hart Chart“ (01.04.2024) und „… Four Corner Fixation“ (04.03.2024), https://www.visionlearncenter.com/post/vision-therapy-activity-hart-chart | Praxisblog | **[V]** beide Beiträge gelesen | Hart Chart allgemein (zeilenweise, Spaltenspringen, Nah-Fern); „Four Corner Fixation“ ist eine **andere** Übung (Mitte als Ausgangspunkt, Therapeutin ruft Ziffer 1–4) |
| 8 | **Chalapathi, R. (2020):** Clinical Highlight • VT procedure: Hart charts. *Optometry & Visual Performance*, 8(3), 156, https://www.oepf.org/wp-content/uploads/2023/04/8-3-Web-File-Chalapathi.pdf | Kurzbeitrag; laut Fußnote persönliche Meinung der Autorin, kein Studienbericht; keine DOI | **[V]** Volltext (1 Seite) gelesen; die Adresse lieferte beim eigenen Abruf nur eine Prüfseite (HTTP 202, Captcha; nicht umgangen), der Text wurde vom Auftraggeber bereitgestellt | Hart-Chart-Grundverfahren (zwei Tafeln, nah/fern, Ziel Akkommodation); Vier-Ecken-Variante in zwei Sätzen: „one letter from each chart until all the letters are read“, Metronom möglich; Vier-Wände-Variante |

### A.1 Was zur Übung sicher ist (wörtlich im Video oder in mindestens zwei Quellen)

| Merkmal | Angabe | Quelle |
|---|---|---|
| Aufbau | vier Tafeln als Quadrat (Raute nur Vivid Visions), in Augenhöhe an Wand oder Whiteboard; Tafel = **Hart-Chart-Ausschnitt**: bei Lam „5 by 5“ (fünf Buchstaben senkrecht, fünf waagerecht; vier **verschiedene** Tafeln); bei Marinoff eine 10 × 10-Hart-Chart in vier 5 × 5-Quadrate geschnitten | Lam [U]; Marinoff [V]; Emergent [V] |
| Tafelabstand | zu Beginn etwa 1 Fuß (30 cm): Lam; 12 Zoll waagerecht und senkrecht: Marinoff; 1–2 Fuß: Emergent; zur Steigerung weiter auseinander („a bigger eye jump“, Lam) | Lam [U]; Marinoff [V]; Emergent [V] |
| Betrachtungsabstand | 6 Fuß (≈ 1,8 m): Marinoff, Emergent; 8–10 Fuß (≈ 2,4–3 m): Lam | wie links |
| Regel | **ein Buchstabe von jeder Tafel** (Chalapathi: „Charts placed at ‚four corners‘ are used to train the patient’s saccadic eye movements. The patient has to read one letter from each chart until all the letters are read. The use of a metronome can also be incorporated.“) – genauer: **gleiche Position in jeder Tafel**, dann die nächste: Lam – erster Buchstabe jeder Tafel, dann zweiter, … fünfter, dann die zweite Zeile (erster Buchstabe der zweiten Zeile jeder Tafel); Emergent – dann der 2. Buchstabe jeder Tafel usw.; Marinoff – **eine ganze Zeile** je Tafel, dann die nächste | Chalapathi [V]; Lam [U]; Emergent [V]; Marinoff [V] |
| Tafelreihenfolge | oben links → oben rechts → unten links → unten rechts (Lam: „we should always start on the top left chart and then go to the top right chart, bottom left chart to bottom right chart“; Emergent gleich); Lam: die Reihenfolge der Tafeln sei nicht entscheidend, „what matters is the position of the letter that you’re looking for“ | Lam [U]; Emergent [V] |
| Laut lesen | Buchstaben werden gesprochen (Lam; Marinoff: „read aloud“) | Lam [U]; Marinoff [V] |
| Kopf | ruhig („this is an eye exercise“, Lam, sinngemäß; Emergent: ohne Kopf- und Körperbewegung) | Lam [U]; Emergent [V] |
| Steigerung | Metronom (Chalapathi: „can also be incorporated“; Lam, sinngemäß: etwa 60 Schläge pro Minute beginnen, schneller oder langsamer je nach Bedarf; Emergent: Tempo nach Vorgabe der Therapeutin); Tafeln weiter auseinander; **spaltenweise** statt zeilenweise (Lam); bei Crowding: vergrößerte Tafel (1,5-fach) und zunächst nur erster und letzter Buchstabe je Quadrat (Marinoff, Fall 2) | Lam [U]; Emergent [V]; Marinoff [V] |
| Ziel (Angabe der Anbieter) | Chalapathi: Geschwindigkeit und Genauigkeit der „saccadic fixation“ (die Hart-Chart-Übung dient dort vor allem der Akkommodation); Sakkaden, **Genauigkeit und Geschwindigkeit** (Lam); größere Sakkaden gegenüber der einzelnen Hart Chart (Emergent); „designed for training saccadic movements“ (Bernell) | Lam [U]; Emergent [V]; Jutron/Bernell [V] |
| Hinweise für die helfende Person | zuerst Genauigkeit, dann Tempo; Fehler erst am Zeilenende ansprechen; Gelungenes benennen; statt „konzentrier dich mehr“: den Buchstaben ansehen und darauf achten, wo er im Verhältnis zu den anderen steht | Emergent [V] |
| Weitere Variante | vier Charts an vier Wänden in Augenhöhe; je ein Buchstabe von jeder Chart „while turning or jumping around“, zusammen mit Vestibular- und Gleichgewichtsübungen; Hart Charts mit Gehschiene, Balancebrett, Ball u. a. zur Erhöhung der kognitiven Anforderung | Chalapathi [V] |
| Auge | Emergent: ein Auge abgedeckt, nach der Übung oder bei Ermüdung wechseln; Marinoff, Fall 1: rechtes Auge abgedeckt (Fall 2: beidäugig); Lam: nicht erwähnt | Emergent [V]; Marinoff [V] |

### A.2 Was nicht angegeben ist, und was Annahme blieb

- **Nicht angegeben:** Reihenfolge der vier Tafeln, Rastergröße, Abstände der Ecken und Metronomtempo (Chalapathi: gar nicht), Buchstabengröße und Tafelmaße in Zentimetern (nur Bernell: 36 pt Schrift), ob die Buchstaben zeilenweise kleiner werden, Dauer und Häufigkeit des Übens, Zielwerte oder Normen, ob Fehler gezählt werden, jede Zeit- oder Blickmessung, jede Wirkung. Die Quellen nennen **keine Zeit je Durchgang**.
- **Annahmen:** (1) Ein Metronomschlag = ein Buchstabe (bei Lam nicht ausdrücklich gesagt; dann ≈ 1 Buchstabe pro Sekunde bei 60/min). (2) Die Buchstabenfolgen in den Untertiteln bei Lam sind an einer Stelle uneindeutig („Y, O, G, T“, sonst „Y, T, G, O“; Spaltenvariante „Y to T, G to O“); die Aussage „oben links → oben rechts → unten links → unten rechts“ ist eindeutig und stimmt mit Emergent überein. (3) **Uhrzeigersinn, Zickzack und wechselnde Tafelreihenfolge** stammen aus der Blickfit-Spezifikation, nicht aus den Quellen; ein Uhrzeigersinn-Umlauf ist in keiner gelesenen Quelle beschrieben. (4) Die Hart-Chart-Buchstaben nehmen zeilenweise ab (Hinweis des Auftraggebers; in den gelesenen Quellen nicht beschrieben).

### A.3 Praxisangaben der Anbieter – nicht belegt

| Angabe | Quelle | Einordnung |
|---|---|---|
| „Sharpens Eye Coordination“, „Boosts Focusing Flexibility“, „Expands Peripheral Awareness“, „Enhances Cognitive Processing“ | Vivid Visions | keine Quelle genannt; **nicht belegt**; Akkommodationswechsel (nah–fern) ist bei vier Tafeln in gleichem Abstand nicht gefordert, auf dem Tablet ohnehin nicht |
| Sakkaden übten „dieselben neuronalen Bahnen wie das Lesen“ (sinngemäß) | Vivid Visions | Behauptung ohne Beleg; Lesetransfer: B.7, F51, F54, F70 |
| Sprach- oder Bewegungselemente (Buchstaben aussprechen) „aktivieren mehr Hirnregionen“ (sinngemäß) | Vivid Visions | nicht belegt, für die Übung nicht untersucht |
| „After a few days, many people report feeling: Less tension behind their eyes“ | Vivid Visions | Selbstbericht ohne Kontrollgruppe; **nicht belegt** |
| Üben „stärke die neuronalen Bahnen“ der Fixation, reduziere Augenbelastung und Ermüdung (für „Four Corner Fixation“, eine andere Übung) | Vision & Learning Center | nicht belegt |
| „The Hart chart is an effective tool, not only to improve accommodative facility and ranges, but also to increase the speed and accuracy of saccadic fixation“ | Chalapathi (2020) | Schlussaussage der Autorin (Meinung, laut Fußnote persönliche Ansicht); keine Belege, keine Zahlen; **nicht belegt** |
| „Vision Therapy … improve or correct visual skills“ (Kanalbeschreibung) | Lam (Beschreibungstext) | allgemeine Aussage des Kanals; im Gespräch selbst keine Wirkaussage |
| Sportleistung, Lesefluss | Anbieter allgemein | für diese Übung **nicht belegt** (F48, F49, F51, F54, F69) |

### A.4 Zusammenfassung der Prüfung der Quellenlage

- Es gibt **keine Quelle mit vollständiger Regeltafel**; das Video von Lam ist die genaueste Beschreibung, Emergent und Marinoff stimmen darin überein, dass **eine Position je Tafel im Wechsel** gelesen wird.
- **Zur Hart-Chart-Übung mit vier Tafeln fand ich keine kontrollierte Studie** (B.10, F68). Das heißt nicht, dass es keine gibt; es heißt, dass die Suche (PubMed „Hart chart“: 6 Treffer; Europe PMC Volltext „Hart chart“ AND saccad*: 31 Treffer, Titel durchgesehen und vier Abstracts gelesen; PubMed „saccadic training“: 18 Treffer) keine fand.
- Die Praxisangaben (periphere Wahrnehmung, Verbesserungen nach einigen Tagen, Lesefluss, Sportleistung) sind **nicht belegt** und werden nicht als Aussage in App-Texte übernommen.
- Wichtigster Befund der Einordnung der Touch-Fassung: Die Messgröße „Zeit von Tipp zu Tipp“ ist **kein Sakkadenmaß** (B.9, H3); der Fingerweg dürfte den größten Anteil haben.

---

## B) Faktenliste „Aussage – Zahl – Quelle“

Vollständige Angaben in Teil D. Fakten, die nur das Einzelziel-Design der ersten Fassung betrafen (Latenz-Reizfolge Lücke/Überlappung als Ringwechsel, Express-Sakkaden-Latenz, Ablenker, Premotor-Theorie, Mindestzeit einfacher Reaktionen, Vorperiode), sind entfallen.

### B.1 Sakkaden: Latenz, Amplitude, Richtung

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F01 | Sakkadenlatenz hängt vom zeitlichen Verhältnis von Fixationsende und Zielbeginn ab: gleichzeitig ≈ 200 ms; Lücke ≥ 200 ms ≈ 150 ms; Fixationsreiz endet ≥ 100 ms nach Zielbeginn ≈ 250 ms | ≈ 200 / 150 / 250 ms | Saslow, 1967 [A-W, Verlagsseite] |
| F04 | Sakkadendauer steigt mit der Amplitude um im Mittel 2,7 ms pro Grad (n = 25) | 2,7 ms/° | Baloh et al., 1975 [A] |
| F06 | Horizontale Sakkaden haben kürzere Latenz als vertikale; Sakkaden in das obere Halbfeld sind schneller als in das untere; Latenz unabhängig von der Exzentrizität (1,5–8°); 8 Richtungen, Prosakkaden | – | Dafoe et al., 2007 [A] |
| F07 | Latenzen zu Zielen im unteren Gesichtsfeld sind größer; der Effekt hängt von der egozentrischen, nicht der gravitativen Senkrechten ab (Kopfneigung) | – | Honda & Findlay, 1992 [A] |
| F08 | Alle geprüften Sakkadentypen außer gedächtnisgeführten hatten kürzere Latenz nach oben als nach unten (p < 0,05) | – | Abegg et al., 2015 [A-W] |
| F09 | Metaanalyse über 23 Datensätze (visuelle Suche, Szenenbetrachtung): Fixationsdauer vor Aufwärts-Sakkaden im Mittel 25 ms kürzer als vor Abwärts-Sakkaden, gepooltes g = 0,97; in 19 von 23 Datensätzen signifikant. Einleitung: Latenz zu Zielen im oberen Gesichtsfeld „meist 20–50 ms kürzer“ | 25 ms; g = 0,97; 20–50 ms | Greene et al., 2020 [A + V, PMC-Volltext] |
| F12 | Alter: Junge Erwachsene (20–30 J.) hatten die schnellsten Sakkadenreaktionszeiten und die kleinste Streuung; Kinder 5–8 J. langsam und stark streuend; Ältere (60–79 J.) langsamer (n = 168, 5–79 J.) | – | Munoz et al., 1998 [A] |
| F14 | Kopfbewegungen bei Blickwechseln: Breite des Bereichs ohne Kopfbewegung („eye-only range“) 35,8 ± 31,9° (Mittel ± SD) bei Gesunden, stark individuell, je Person reproduzierbar | 35,8 ± 31,9° | Stahl, 1999 [A] |

### B.2 Fixation und Aufmerksamkeit

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F16 | Sakkadenziel und Aufmerksamkeit sind obligatorisch und selektiv gekoppelt: Unterscheidung am Sakkadenziel am besten, an Nachbarn nahe Zufallsniveau; es ist nicht möglich, Aufmerksamkeit auf ein anderes Objekt zu richten, während man zu einem nahen Ziel blickt | – | Deubel & Schneider, 1996 [A] |
| F17 | Aufmerksamkeit auf ein Ziel erleichtert Sakkaden; nicht möglich, schnell/genau zu einem Ziel zu blicken und zugleich anderswo genau zu urteilen; es gibt eine Obergrenze des Aufmerksamkeitsbedarfs von Sakkaden | – | Kowler et al., 1995 [A] |
| F18 | Entdeckungsleistung am Ort der geplanten Sakkade am höchsten; man kann nicht zu einem Ort blicken und einem anderen Aufmerksamkeit widmen | – | Hoffman & Subramaniam, 1995 [A] |
| F21 | Inhibition of Return: verzögerte Antworten an einem Ort, von dem die Aufmerksamkeit abgezogen wurde (fördert Zuwendung zu neuen Orten) | – | Klein, 2000 [A] |
| F22 | Fixationsstabilität über 1 min, auch mit Ablenkern: Wurfscheibenschützen (n = 7) stabiler als Kontrollen (n = 8) bei Ablenkern; schnellere Sakkadenlatenz; Querschnittsvergleich, kein Trainingsbeleg | n = 7 vs. 8 | Di Russo et al., 2003 [A]; [W03] |

### B.3 Fitts'sches Gesetz, Hand-Auge-Koordination

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F23 | Bewegungszeit MT = a + b · log₂(A/W + 1) (Shannon-Form; A Weg, W Zielbreite). Fitts' Originaldaten (Stift) neu ausgewertet: Index of Performance 7,2–8,2 bit/s (Steigung 122–139 ms/bit); über Geräte und Studien 1,1–13,7 bit/s | 122–139 ms/bit; 1,1–13,7 bit/s | MacKenzie, 1992 [A-W, Autorenseite]; Fitts, 1954 [M] |
| F24 | Für **kleine** Ziele ist das klassische Fitts-Modell bei Fingereingabe unzureichend; ein Zwei-Verteilungs-Modell (FFitts) erklärt mehr Varianz (R² ≥ 0,91) | R² ≥ 0,91 | Bi et al., 2013 [A-W, Google-Research-Seite] |
| F26 | Der Blick geht der Zeigebewegung voraus und bleibt am Zielpunkt verankert; Sakkaden zu einem neuen Ziel während einer Zeigebewegung sind um im Mittel 155 ms verzögert (Rest der Verzögerungsphase des Arms) | +155 ms | Neggers & Bekkering, 2000 [A] |
| F27 | Bei schnellen Zeigebewegungen beginnt die Arm-EMG meist **vor** dem Sakkadenbeginn; Richtung und Weite der Armbewegung sind vor der Sakkade festgelegt; auch für Arm-EMG gibt es einen Lückeneffekt | – | Gribble et al., 2002 [A] |
| F28 | Alltagshandlung (Tee kochen): erste objektbezogene Fixation geht der Handlung im Mittel 0,56 s voraus; der Blick wechselt etwa 0,61 s vor Ende der vorigen Handlung zum nächsten Objekt | 0,56 s; 0,61 s | Land et al., 1999 [A] |

### B.4 Zeitkomponenten, Gerät, Optik und Vorsichtsgruppen

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F30 | Web-App auf Touchgeräten und Laptops misst Reaktionszeiten **immer zu lang** (Roboterfinger, Tabelle 4): iPhone 6S im Mittel 57,6–58,0 ms, Galaxy S7 66,1–69,8 ms, Windows 61,9–68,5 ms, macOS 78,2–132,9 ms; Einzelwerte der Touchgeräte ≈ 45–131 ms; Standardabweichung je Gerät ≈ 6,5–7,5 ms. **Tablets wurden nicht gemessen.** Absolute Werte stärker betroffen als Unterschiede innerhalb einer Person | 58 / 66–70 ms | Pronk et al., 2020 [A + V, Tabelle 4 als PMC-XML] |
| F31 | Hick-Hyman: Wahlreaktionszeit wächst mit dem Logarithmus der Alternativenzahl; Informationsgewinn ≈ 5 Bit/s; bei sehr kompatiblen Zuordnungen ist die Kurve nahezu flach; Übung flacht die Steigung ab | ≈ 5 Bit/s | Hick, 1952 [W12]; Hyman, 1953 [M]; Proctor & Schneider, 2018 [A] |
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
| F54 | Kleine Studien an Kindern mit Leseschwierigkeiten berichten Verbesserungen nach Okulomotorik-Training: Pilot mit 21 Kindern (7–12 J.; 14 Training **Sakkaden mit Symbol-Charts in verschiedenen Modi und Arten**, 7 einfaches Lesen; 6 Wochen; Verbesserung in Okulomotorik, Lesen, visuell-perzeptiven Fähigkeiten und Crowding); 30 randomisierte Kinder mit Dyslexie und Augenbewegungsauffälligkeiten (Abstract) – kleine Stichproben, kurze Beobachtung | n = 21; n = 30 | Facchin et al., 2025 [A]; Jafarlou, 2024 [A] |

### B.8 Messzuverlässigkeit

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F55 | Differenzwerte (Interferenz-/Kompatibilitätseffekte) sind als Gruppeneffekt robust, als persönlicher Wert oft wenig zuverlässig (Test-Retest 0 bis 0,82 in sieben Aufgaben) | 0–0,82 | Hedge et al., 2018 [W12, A] |
| F56 | Formeln für die Zuverlässigkeit von Mittelwerten und Differenzen von Reaktionszeiten; Aussagen über die nötige Zahl von Durchgängen hängen von Streuung zwischen und innerhalb der Personen ab | – | Miller & Ulrich, 2013 [A] |
| F57 | Die Standardabweichung einer Reaktionszeitverteilung wächst linear mit dem Mittelwert (Variationskoeffizient als Vergleichsgröße) | – | Wagenmakers & Brown, 2007 [A] |
| F58 | Gerätebedingte Überschätzung betrifft absolute Reaktionszeiten stärker als Differenzen innerhalb einer Person | – | Pronk et al., 2020 [A] |

### B.9 Eigene Rechnungen (Herleitungen, keine Studienaussagen)

**H1 – Geometrie der Tafeln (Annahmen: 10,9″-Tablet quer, 1.180 × 820 CSS-px, 0,192 mm/px, Abstand 40 cm, 36 px/°; vier Tafeln in den Ecken, je etwa 300 px breit und hoch, Rand 40 px zwischen Tafel und Bildrand; Großbuchstabenhöhe ≈ 0,72 × Schriftgröße; Beispiel, maßgeblich ist die Stufentabelle der Übung)**

| Weg zwischen entsprechenden Zellen zweier Tafeln | Länge in px | in Grad | in mm |
|---|---|---|---|
| waagerecht (links ↔ rechts) | 800 | ≈ 22° | ≈ 154 |
| senkrecht (oben ↔ unten) | 440 | ≈ 12° | ≈ 84 |
| diagonal | 913 | ≈ 25° | ≈ 175 |
| innerhalb einer Tafel, eine Zelle (48 px) | 48 | ≈ 1,3° | ≈ 9 |
| innerhalb einer Tafel, zwei Zellen (96 px) | 96 | ≈ 2,7° | ≈ 18 |

Im Hochformat (820 × 1.180) vertauschen sich waagerecht und senkrecht. Bei einem Smartphone sind alle Winkel deutlich kleiner (≈ halb), bei 60 cm Abstand ≈ ⅔. Buchstaben von 22 px: Höhe ≈ 16 px ≈ 0,44° (≈ 26 Bogenminuten); 28 px: ≈ 0,56°.
**Original (Vergleich):** Die **Lücke** von 12 Zoll (30 cm) zwischen den Tafeln entspricht aus 6 Fuß (1,83 m) ≈ 9,5°, aus 8 Fuß ≈ 7,1°, aus 10 Fuß ≈ 5,7° (arctan 12 in / Abstand). Die Winkel zwischen entsprechenden Buchstaben sind um die Tafelbreite größer; Tafelbreiten sind in den Quellen nicht angegeben. Auf dem Tablet beträgt die entsprechende Lücke waagerecht ≈ 500 px ≈ 14° (1.180 − 2 × 300 − 80). Die Tablet-Wechsel sind also **größer** als im Original.

**H2 – Fitts-Schwierigkeit je Weg (Shannon-Form ID = log₂(A/W + 1), W = 48 px = 9,2 mm)**

| Weg | A in mm | ID | bei 100 / 130 ms/bit |
|---|---|---|---|
| waagerecht | 154 | 4,14 bit | 414 / 539 ms |
| senkrecht | 84 | 3,35 bit | 335 / 435 ms |
| diagonal | 175 | 4,32 bit | 432 / 562 ms |
| eine Zelle (48 px) | 9 | 1,00 bit | 100 / 130 ms |
| zwei Zellen (96 px) | 18 | 1,58 bit | 158 / 206 ms |

Differenz waagerecht – senkrecht ≈ 0,8 bit ≈ **80–100 ms** allein durch die **Weglänge** (Steigung 100–130 ms/bit: Größenordnung nach F23; für Touch **nicht geprüft**; für kleine Ziele ist das klassische Modell unzureichend, F24; Zellen von 9 mm liegen am unteren Rand) – mehr als die Richtungsunterschiede der Sakkadenlatenz (F08, F09: ≈ 20–50 ms).
**Sprungkosten (Wechsel nach 2 Buchstaben):** Tafelwechsel ≈ 3,4–4,3 bit gegenüber Nachbarzelle ≈ 1,0–1,6 bit: Unterschied ≈ 2–3 bit ≈ **0,2–0,4 s allein durch den Fingerweg**. Der Blickwechsel (Sakkadendauer ≈ 32–68 ms bei 12–25°) macht daran nur einen kleinen Teil aus.
**Folge:** Richtung, Weglänge und Armbewegung sind verknüpft; „Richtungen“ und „Sprungkosten“ sind überwiegend **Wegunterschiede**.

**H3 – Zeitkomponenten von Tipp zu Tipp (Größenordnungen, nicht addierbar)**

| Komponente | Größenordnung | Quelle / Herleitung |
|---|---|---|
| Suchen des nächsten Buchstabens (erster nicht blasser der nächsten Tafel; mit Ring entfällt der größte Teil) | **keine geprüfte Zahl** | F74 (qualitativ) |
| Sakkadenlatenz beim Blickwechsel (nur soweit der Blick nicht schon vor dem Tipp springt) | ≈ 150–250 ms | Saslow, 1967 (F01) |
| Sakkadendauer 12–25° | 2,7 ms/° × 12–25° ≈ 32–68 ms (nur Steigung, ohne Achsenabschnitt) | Baloh et al., 1975 (F04); [H] |
| Erkennen/Entscheiden | Hick-Anteil bei räumlich passender Antwort nahezu flach; Zeit für Buchstabenerkennung im Raster: **keine geprüfte Zahl** | Proctor & Schneider, 2018 (F31) |
| Fingerweg Tafel → Tafel | ≈ 0,3–0,6 s (H2) | MacKenzie, 1992 (F23); [H] |
| Fingerweg innerhalb einer Tafel | ≈ 0,1–0,2 s (H2) | [H] |
| Gerät/Touch (Web-App) | + ≈ 58–70 ms (Smartphones; Tablets nicht gemessen) | Pronk et al., 2020 (F30) |
| Überlappung Auge–Hand | der Blick geht der Hand voraus; Arm-Muskel meist vor der Sakkade aktiv | F26, F27, F28 |

Die Komponenten **überlappen**; aus „Tipp zu Tipp“ lässt sich keine Komponente herausrechnen. Der Fingerweg ist vermutlich der größte Einzelposten. Es gibt in der Aufgabe **keinen Reiz mit Beginn** (die Person bestimmt das Tempo), deshalb ist „Reaktionszeit“ kein passender Name.

**H4 – Zahl der Tipps je Runde (Annahme: 1,0–1,5 s je Tipp; 4 Tafeln)**

| Tafel | Tipps je Runde | Dauer je Runde (1,0–1,5 s) |
|---|---|---|
| 3 × 3 | 36 | 36–54 s |
| 4 × 4 | 64 | 64–96 s |
| 6 × 4 (24) | 96 | 96–144 s |
| 5 × 5 | 100 | 100–150 s |

Je Runde ≈ Tipps − 1 gezählte Zeiten (der erste Tipp zählt nicht). Eine Sitzung = 3 Runden ≈ 2–8 min. Bei Umlauf im Uhrzeigersinn und Wechsel nach jedem Buchstaben entfallen auf jede der vier Richtungen (→ ↓ ← ↑) ≈ ¼ der Tafelwechsel (5 × 5: ≈ 25 je Runde). Bei der Tafelreihenfolge der Quellen (oben links → oben rechts → unten links → unten rechts) entfallen auf → die Hälfte, auf ↙ und ↖ je ein Viertel. Die 1,0 s je Buchstabe entsprechen dem Metronomtakt 60/min bei Lam (A.2, Annahme 1); die Zeit je Tipp auf dem Tablet ist nicht gemessen.

**H5 – Genauigkeit eines Klassenmittels und eines Unterschieds (Annahme: Einzelzeit-SD 100/150/200 ms – Größenordnung, **nicht** aus einer Studie; SD wächst mit dem Mittelwert, F57; unabhängige Tipps; Mittelwert statt Median)**

SE = SD/√n; SE des Unterschieds zweier Klassen mit je n: SD·√(2/n); kleinster mit 80 % Sicherheit erkennbarer Unterschied (α = 0,05 zweiseitig) ≈ 2,8 × SE des Unterschieds.

| n je Klasse | SE des Mittels (SD 150) | SE des Unterschieds (SD 150) | erkennbarer Unterschied, 80 % (SD 100 / 150 / 200) |
|---|---|---|---|
| 3 | 87 ms | 122 ms | 229 / 343 / 457 ms |
| 8 | 53 ms | 75 ms | 140 / 210 / 280 ms |
| 16 | 38 ms | 53 ms | 99 / 148 / 198 ms |
| 25 | 30 ms | 42 ms | 79 / 119 / 158 ms |
| 36 | 25 ms | 35 ms | 66 / 99 / 132 ms |
| 60 | 19 ms | 27 ms | 51 / 77 / 102 ms |
| 100 | 15 ms | 21 ms | 40 / 59 / 79 ms |

Nötige Tipps **je Klasse**, um einen Unterschied von 50 / 75 / 100 ms zu erkennen: SD 100 ms: 63 / 28 / 16; SD 150 ms: 142 / 63 / 36; SD 200 ms: 251 / 112 / 63.
**Folge:** Die Schwelle „8“ je Klasse (Spezifikation) liefert Mittel mit SE ≈ 35–70 ms; **Unterschiede unter etwa 150–200 ms sind nicht zu deuten.** Anzeige mit Unsicherheit, nach Achsen zusammengefasst, Verlauf über mehrere Sitzungen **auf gleichem Gerät und gleicher Stufe**. Erste vs. letzte Hälfte einer Runde (je 18–50 Tipps, SD 150): SE des Unterschieds ≈ 30–50 ms, erkennbarer Unterschied ≈ 85–140 ms; dazu Üben, Ermüdung, Verlauf im Raster.

**H6 – Stufenentscheidung am Rundenende (Binomial, unabhängige Tipps; „≥ 90 %“ = mindestens 33 von 36, 58 von 64 bzw. 90 von 100; „< 75 %“ = höchstens 26 von 36, 47 von 64 bzw. 74 von 100)**

| wahre Trefferquote | n = 36: schwerer / gleich / leichter | n = 64 | n = 100 |
|---|---|---|---|
| 95 % | 0,90 / 0,10 / 0,00 | 0,96 / 0,04 / 0,00 | 0,99 / 0,01 / 0,00 |
| 90 % | 0,51 / 0,49 / 0,00 | 0,54 / 0,46 / 0,00 | 0,58 / 0,42 / 0,00 |
| 85 % | 0,19 / 0,77 / 0,04 | 0,14 / 0,85 / 0,01 | 0,10 / 0,90 / 0,00 |
| 80 % | 0,05 / 0,78 / 0,17 | 0,02 / 0,86 / 0,13 | 0,01 / 0,91 / 0,09 |
| 75 % | 0,01 / 0,58 / 0,41 | 0,00 / 0,57 / 0,43 | 0,00 / 0,55 / 0,45 |
| 70 % | 0,00 / 0,32 / 0,67 | 0,00 / 0,23 / 0,77 | 0,00 / 0,16 / 0,84 |

Gegenüber der ersten Fassung (12-Ziele-Segmente: bei 85 % Aufstieg in 44 %) ist die Entscheidung **deutlich weniger verrauscht**; die Stufe am Ende bleibt trotzdem ein **grober** Hauptwert (zusätzlich „gleichmäßige Zeit“ als Bedingung). Echte Fehler häufen sich meist; die Annahme unabhängiger Tipps ist nur eine Näherung.

**H7 – Crowding in dichten Rastern (Bouma-Gesetz, kritischer Abstand ≈ 0,5 × Exzentrizität, F41; Zellabstand 48–60 px = 1,3–1,7°):** Nachbarbuchstaben sind nur bis etwa 2,7–3,3° Exzentrizität (2–3 Zellen) frei von Crowding (0,5 × E ≥ Abstand ⇒ E ≥ 2 × Abstand). Weiter entfernte Buchstaben der eigenen Tafel lassen sich im Dichtraster **nicht einzeln erkennen, ohne hinzusehen**. Das stützt, dass dichte Raster das Suchen erschweren, ohne dass sich die Wege ändern. **Herleitung**, für diese Übung nicht untersucht.

**H8 – Arbeitsgedächtnis:** Vier Tafeln = vier Einheiten, etwa die mittlere Kapazität von ≈ 4 Einheiten (F73; **Gegenüberstellung**, kein Beleg für diese Aufgabe). Die blassen Buchstaben tragen den Stand (Position) und erlassen die Zählung; gemerkt werden müssen die Tafelreihenfolge und – bei Wechsel nach 2 Buchstaben – ein Zähler. Das ist ein **externer Speicher** im Sinn von F72.

**H9 – Wege sind in jedem Umlauf gleich:** Entsprechende Zellen der vier gleich großen Tafeln haben immer denselben Abstand; nur beim Übergang von der letzten zur ersten Tafel (Position p → p+1) ändert sich der Weg beim Zeilenwechsel um bis zu eine Tafelbreite (≈ (Spalten − 1) × Zellabstand, bei 5 Spalten ≈ 200 px). Eigene Überlegung zur Vergleichbarkeit innerhalb einer Runde.

### B.10 Neue Fakten zur echten Übung und zum Lesen von Buchstabenrastern (F64 ff.)

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F64 | Protokoll der Übung „4 Chart Saccades“: vier 5 × 5-Tafeln, etwa 1 Fuß Abstand, 8–10 Fuß Betrachtungsabstand, Augenhöhe; erster Buchstabe jeder Tafel (oben links → oben rechts → unten links → unten rechts), dann der nächste; laut lesen; Kopf ruhig; Steigerung durch Metronom (≈ 60/min), größere Abstände, Spaltenreihenfolge | 5 × 5; 1 Fuß; 8–10 Fuß; 60/min | Lam, 2020 [U] |
| F65 | „Four Charts“: vier kleinere Hart Charts im Quadrat, 1–2 Fuß Abstand, 6 Fuß, Metronom; Buchstabe für Buchstabe reihum; ein Auge abgedeckt; Hinweise an die helfende Person (zuerst Genauigkeit, dann Tempo) | 1–2 Fuß; 6 Fuß | Emergent VT [V] |
| F66 | Hart Chart 10 × 10, in vier 5 × 5-Quadrate geschnitten; Quadrate 12 Zoll auseinander; **zeilenweise** je Quadrat laut gelesen; 6 Fuß; zwei Fallberichte (66 J. trockene AMD, 38 J. Stargardt), Lesegeschwindigkeit „modest“ gestiegen (kombinierte Übungen, keine Kontrollgruppe); Fall 2: Crowding bei der Vier-Ecken-Übung → vergrößerte Tafel (1,5-fach), nur erster und letzter Buchstabe je Quadrat | 5 × 5; 12 Zoll; 6 Fuß | Marinoff, 2016 [V] |
| F67 | „Four Corner Hart Chart Set“: 4 Tafeln, je Buchstaben in 36 pt, beidseitig bunt und schwarz, „designed for training saccadic movements“, auch für Akkommodation | 4 Tafeln; 36 pt | Bernell/Jutron [V] |
| F68 | **Suche nach Studien zu Hart-Chart-Training:** PubMed „Hart chart“ (02.10.2026): 6 Treffer, 4 zu Hart-Chart-Verfahren, alle zur **Akkommodation**: Balke et al. 2022 (19 Kinder, nicht randomisiert, Hart-Chart-Übungen vs. Zusatzlinse); Vasudevan et al. 2009 (10 Personen, Mehrkomponenten-Programm, Hart-chart-Rate 22 → 33 Zyklen/min OD, ohne Kontrolle); Ciuffreda & Ordonez 1998 (5 Personen, ohne Kontrolle); Vera et al. 2020 (Hart-Chart-Befund als Vergleichsmessung der Akkommodationsflexibilität, n = 33). Europe PMC Volltext „Hart chart“ AND saccad*: 31 Treffer (Titel durchgesehen, vier Abstracts gelesen: Mehrkomponenten-Programme, Fallberichte, Querschnitt, Protokoll, Übersicht). **Keine** Studie, die ein Hart-Chart- oder Vier-Tafel-Sakkadentraining einzeln und kontrolliert untersucht | 6 / 4 / 31 Treffer | Balke et al., 2022 [A]; Vasudevan et al., 2009 [A]; Ciuffreda & Ordonez, 1998 [A]; Vera et al., 2020 [A] |
| F69 | Sakkadentraining mit Lesesoftware (King-Devick Reading Acceleration): randomisierter, einfach verblindeter Crossover (20 min/Tag, 3 Tage/Woche, 6 Wochen): höhere Lesefluss-Werte nach Training; Crossover mit 327 Kindern (Ø 7 J. 6 M.), 18 Einheiten à 20 min über 5 Wochen: Verbesserung des Leseflusses 6,2 % vs. 3,6 %, des Verständnisses 7,5 % vs. 1,5 % (Training vs. Kontrolle). Autor:innen mit Affiliation beim Hersteller; keine Hart-Chart-Übung | n = 327; 6,2 / 3,6 %; 7,5 / 1,5 % | Leong et al., 2014 [A]; Dodick et al., 2017 [A] |
| F70 | Pilot mit Symbol-Charts: siehe F54 (Facchin et al., 2025) | n = 21 | Facchin et al., 2025 [A] |
| F71 | Blickbewegungen beim Lesen und bei Suche spiegeln die Verarbeitung; Wahrnehmungsspanne und Integration über Sakkaden hinweg sind Grundthemen; Übersichten | – | Rayner, 1998 [A]; Rayner, 2009 [A] |
| F72 | Bei natürlichen Hand-Auge-Aufgaben vermeiden Menschen, Wissen im Kurzzeitgedächtnis zu halten; sie „serialisieren“ mit Augenbewegungen und holen Information erst kurz vor Bedarf | – | Ballard et al., 1995 [A] |
| F73 | Kapazität des Kurzzeitgedächtnisses im Mittel etwa vier Einheiten (Chunks) | ≈ 4 | Cowan, 2001 [A] |
| F74 | Die Steuerung der Aufmerksamkeit bei der Suche folgt fünf Faktoren: Auffälligkeit, Zielmerkmale, Szenenstruktur, bisheriger Suchverlauf, Wert | 5 Faktoren | Wolfe & Horowitz, 2017 [A] |
| F75 | Übersicht Crowding und Buchstabenerkennung in der Peripherie; das Bouma-Gesetz lässt sich in der retinokortikalen Abbildung ausdrücken | – | Strasburger et al., 2011 [A] |
| F76 | Web-Richtlinien: Zielgröße für Zeigereingaben mindestens 24 × 24 CSS-px (WCAG 2.2, SC 2.5.8, Stufe AA) bzw. 44 × 44 (SC 2.5.5, Stufe AAA) | 24 px; 44 px | W3C, WCAG 2.2 [V] |

---

## C) Evidenz-Zusammenfassung

Vorgeschlagene Werte für `evidenz.*` beziehen sich auf die **Aufgabenart** (wie im README definiert), nicht auf die Übung selbst – **905 ist nicht untersucht**, und für die Hart-Chart-Übung mit vier Tafeln fand ich keine kontrollierte Studie (F68).

**905 4-Ziele-Wechsel**
- Sakkadenaufgaben werden mit Wiederholung schneller, genauer und stabiler (F39); Training senkt Latenzen und überträgt sich teils zwischen Sakkadentypen, Achsen, Hemifeldern und Augen (F45, F46), in einem Einzelfall aber nicht auf andere Positionen (F47). Alle diese Laborstudien messen **Sakkaden mit Eye-Tracker**; 905 misst „Tipp zu Tipp“.
- Lesenahe Sakkadentrainings bei Kindern: Studien mit Herstellersoftware (F69) und ein kleiner Pilot mit Symbol-Charts (F54) berichten Verbesserungen; Herstellerbezug, kleine Gruppen, kurze Beobachtung; das Konsenspapier hält Augenübungen bei Lernstörungen für nicht belegt (F51).
- Auge-Hand-Aufgaben und Reaktionszeiten verbessern sich mit Übung; Effekte werden bei trainingsähnlichem Test stark überschätzt (F49, F50); allgemeines Sehtraining brachte keinen Effekt über die Testvertrautheit hinaus (F48).
- Für Alltag, Lesen, Sport oder Verkehr gibt es **keinen Beleg**; klinische Befunde zu Gesichtsfeldausfall (F52, F53) gelten **nicht** für Gesunde.
- Vorschlag: `uebungseffekt: mittel` · `naher_transfer: unklar` · `alltag_transfer: fehlend`.
- Messgröße: „Tipp zu Tipp“ ist **kein Sakkadenmaß** (H3); Richtungsklassen und Sprungkosten sind Wegunterschiede (H2); Differenzwerte brauchen viele Tipps (H5, F55); absolute Werte sind gerätegebunden (F30).
- Vorsicht: `nystagmus`, `gesichtsfeldausfall`, `schielen_binokular`, `amblyopie`, `kopfschmerz_asthenopie`, `migraene_lichtempfindlich`, `presbyopie_gleitsicht`, `sehbehinderung_niedriger_visus`, `tremor_parkinson`, `hand_arm_beschwerden`, `aufmerksamkeitsprobleme`, `kinder_unter_6`, `lese_rechtschreib_schwaeche`.
- **Nicht übernehmen:** „trainiert die Sakkaden / Augenmuskeln / Fixation“, „erweitert die periphere Wahrnehmung“, „Verbesserungen nach einigen Tagen“, „aktiviert mehr Hirnregionen“, „verbessert den Lesefluss / die Sportleistung“, „misst die Sakkadenlatenz“, „Ermüdungstest“, Normwerte, Altersvergleiche, Wirk- oder Therapieanspruch.

---

## D) Literaturliste (nur geprüfte Einträge)

Prüfvermerk-Schema: **CR** = Crossref-Metadaten stimmen (Titel, Autor:innen, Jahr, Quelle, Band, Seiten); **Inhalt** = [A]/[A-W]/[V]/[U]/[M]/[W..] wie oben; PMID, wo vorhanden. Alle DOIs am 02.10.2026 per `https://api.crossref.org/works/<doi>` aufgelöst.

### D.1 Quellen zur Übung selbst (keine DOI, Inhalt wie in A.0 geprüft)

- Lam, V. (Insight Vision Optometry). *Vision Therapy Exercise : 4 Chart Saccades Exercise.* YouTube, 18.12.2020. https://www.youtube.com/watch?v=Dpj_t4tJ8Vo — [U].
- Chalapathi, R. (2020). Clinical Highlight • VT procedure: Hart charts. *Optometry & Visual Performance, 8*(3), 156. https://www.oepf.org/wp-content/uploads/2023/04/8-3-Web-File-Chalapathi.pdf — [V]; keine DOI (Crossref-Suche ohne Treffer); Meinung der Autorin laut Fußnote.
- Emergent VT. *Vision Therapy Activities – Four Charts.* https://www.emergentvt.com/activity — [V].
- Marinoff, R. (2016). Using vision therapy to maximize visual efficiency for low vision patients with central scotoma. *Optometry & Visual Performance, 4*(1), Article 4. https://www.ovpjournal.org/uploads/2/3/8/9/23898265/marinoff16.pdf — [V]; keine DOI (Crossref-Suche ohne Treffer).
- Bernell USA / Jutron Vision. *Four Corner Hart Chart Set* (BC4DC36). https://www.jutronvision.com/product/four-corner-hart-chart-set/ — [V] (Bernell-Seite nicht abrufbar).
- Vivid Visions Optometry. *Week 8: Four Square Vision Training.* 20.10.2025. https://www.vividvisionsoptometry.com/post/week-8-four-square-vision-training — sichtbarer Teil über WebFetch; Rest hinter Anmeldung.
- Taub, M. (2014). Vision therapy: A top 10 must-have list. *Optometry Times,* 01.08.2014. https://www.optometrytimes.com/vision-therapy-top-10-must-have-list — [V].
- Vision & Learning Center (2024). *Vision Therapy Activity: Hart Chart* (01.04.2024) und *Vision Therapy Activity: Four Corner Fixation* (04.03.2024). https://www.visionlearncenter.com/post/vision-therapy-activity-hart-chart — [V].
- W3C (2024). *Web Content Accessibility Guidelines (WCAG) 2.2*, SC 2.5.8 und SC 2.5.5. https://www.w3.org/TR/WCAG22/ — [V].

### D.2 Fachliteratur (CR ✔ für alle)

1. Abadi, R. V. (2002). Motor and sensory characteristics of infantile nystagmus. *British Journal of Ophthalmology, 86*(10), 1152–1160. https://doi.org/10.1136/bjo.86.10.1152 — CR ✔ (Crossref nennt nur Abadi; PubMed: Abadi & Bjerre); [A] PMID 12234898 (224 Personen mit infantilem Nystagmus; Amplituden 0,3–15,7°, Frequenzen 0,5–8 Hz).
2. Abegg, M., Pianezzi, D., & Barton, J. J. S. (2015). A vertical asymmetry in saccades. *Journal of Eye Movement Research, 8*(5), Article 3. https://doi.org/10.16910/jemr.8.5.3 — CR ✔; [A-W] Abstract über die Verlagsseite (nicht in PubMed).
3. Abernethy, B., & Wood, J. M. (2001). Do generalized visual training programmes for sport really work? An experimental investigation. *Journal of Sports Sciences, 19*(3), 203–222. https://doi.org/10.1080/026404101750095376 — CR ✔; [A] PMID 11256825 (hier erneut gelesen); [D02].
4. Alvarez, T. L., Kim, E. H., & Granger-Donetti, B. (2017). Adaptation to progressive additive lenses: Potential factors to consider. *Scientific Reports, 7*, 2529. https://doi.org/10.1038/s41598-017-02851-5 — CR ✔; [A] PMID 28566706.
5. Ariga, A., & Lleras, A. (2011). Brief and rare mental “breaks” keep you focused: Deactivation and reactivation of task goals preempt vigilance decrements. *Cognition, 118*(3), 439–443. https://doi.org/10.1016/j.cognition.2010.12.007 — CR ✔; [A] PMID 21211793.
6. Balke, M., Skjöld, G., & Lundmark, P. O. (2022). Comparison of short-term effects of treatment of accommodative infacility with low plus addition in single vision Rx or vision therapy: A pilot study. *Clinical Optometry, 14*, 83–92. https://doi.org/10.2147/OPTO.S355508 — CR ✔ (Crossref „Volume 14“); [A] PMID 35677714 (19 Kinder, nicht randomisiert; Hart-Chart-Übungen für die Akkommodation; Interessenkonflikt: Vertrieb einer Software durch einen Autor).
7. Ballard, D. H., Hayhoe, M. M., & Pelz, J. B. (1995). Memory representations in natural tasks. *Journal of Cognitive Neuroscience, 7*(1), 66–80. https://doi.org/10.1162/jocn.1995.7.1.66 — CR ✔; [A] PMID 23961754.
8. Baloh, R. W., Sills, A. W., Kumley, W. E., & Honrubia, V. (1975). Quantitative measurement of saccade amplitude, duration, and velocity. *Neurology, 25*(11), 1065–1070. https://doi.org/10.1212/WNL.25.11.1065 — CR ✔; [A] PMID 1237825 (hier erneut gelesen); [W04].
9. Bi, X., Li, Y., & Zhai, S. (2013). FFitts law: Modeling finger touch with Fitts' law. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '13)* (S. 1363–1372). ACM. https://doi.org/10.1145/2470654.2466180 — CR ✔; [A-W] Abstract über die Google-Research-Seite; [W09].
10. Bouma, H. (1970). Interaction effects in parafoveal letter recognition. *Nature, 226*(5241), 177–178. https://doi.org/10.1038/226177a0 — CR ✔; [M]; [W02, D03].
11. Ciuffreda, K. J., & Ordonez, X. (1998). Vision therapy to reduce abnormal nearwork-induced transient myopia. *Optometry and Vision Science, 75*(5), 311–315. https://doi.org/10.1097/00006324-199805000-00019 — CR ✔; [A] PMID 9624694 (5 Personen, ohne Kontrolle; Hart chart für Akkommodationsflexibilität).
12. Cowan, N. (2001). The magical number 4 in short-term memory: A reconsideration of mental storage capacity. *Behavioral and Brain Sciences, 24*(1), 87–114. https://doi.org/10.1017/S0140525X01003922 — CR ✔; [A] PMID 11515286.
13. Dafoe, J. M., Armstrong, I. T., & Munoz, D. P. (2007). The influence of stimulus direction and eccentricity on pro- and anti-saccades in humans. *Experimental Brain Research, 179*(4), 563–570. https://doi.org/10.1007/s00221-006-0817-8 — CR ✔ (online 2006); [A] PMID 17171535.
14. Deubel, H., & Schneider, W. X. (1996). Saccade target selection and object recognition: Evidence for a common attentional mechanism. *Vision Research, 36*(12), 1827–1837. https://doi.org/10.1016/0042-6989(95)00294-4 — CR ✔; [A] PMID 8759451; auch in W10.
15. Di Russo, F., Pitzalis, S., & Spinelli, D. (2003). Fixation stability and saccadic latency in élite shooters. *Vision Research, 43*(17), 1837–1845. https://doi.org/10.1016/S0042-6989(03)00299-2 — CR ✔; [A] PMID 12826107 (hier erneut gelesen); [W03].
16. Dodick, D., Starling, A. J., Wethe, J., Pang, Y., Messner, L. V., Smith, C., Master, C. L., Halker-Singh, R. B., Vargas, B. B., Bogle, J. M., Mandrekar, J., Talaber, A., & Leong, D. (2017). The effect of in-school saccadic training on reading fluency and comprehension in first and second grade students. *Journal of Child Neurology, 32*(1), 104–111. https://doi.org/10.1177/0883073816668704 — CR ✔ (Crossref: Jahr 2016, online; Band 32 trägt 2017); [A] PMID 28257277 (Affiliation (6): King-Devick Test, Inc.).
17. Duncan, J., & Humphreys, G. W. (1989). Visual search and stimulus similarity. *Psychological Review, 96*(3), 433–458. https://doi.org/10.1037/0033-295X.96.3.433 — CR ✔; [A-W] Abstract über den CBU-Bibliografie-Eintrag (PubMed ohne Abstract); [W01, D03].
18. Facchin, A., Maffioletti, S., Maffioletti, M., Esposito, G., Bonetti, M., Girelli, L., & Daini, R. (2025). Oculomotor training improves reading and associated cognitive functions in children with learning difficulties: A pilot study. *Vision, 9*(4), 83. https://doi.org/10.3390/vision9040083 — CR ✔; [A] PMID 41133607.
19. Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 — CR ✔; [M] (PubMed ohne Abstract); [W09].
20. Greene, H. H., Brown, J. M., & Strauss, G. P. (2020). Shorter fixation durations for up-directed saccades during saccadic exploration: A meta-analysis. *Journal of Eye Movement Research, 12*(8), Article 5. https://doi.org/10.16910/jemr.12.8.5 — CR ✔; [A] PMID 33828778; Zahlen (25 ms, g = 0,97; Einleitung 20–50 ms) im PMC-Volltext [V] gelesen.
21. Gribble, P. L., Everling, S., Ford, K., & Mattar, A. (2002). Hand-eye coordination for rapid pointing movements. *Experimental Brain Research, 145*(3), 372–382. https://doi.org/10.1007/s00221-002-1122-9 — CR ✔; [A] PMID 12136387.
22. Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 — CR ✔; [A] PMID 40980806 (hier erneut gelesen); [W01, W03, W04].
23. Handler, S. M., Fierson, W. M., Section on Ophthalmology, Council on Children with Disabilities, American Academy of Ophthalmology, American Association for Pediatric Ophthalmology and Strabismus, & American Association of Certified Orthoptists. (2011). Learning disabilities, dyslexia, and vision. *Pediatrics, 127*(3), e818–e856. https://doi.org/10.1542/peds.2010-3670 — CR ✔ (Crossref führt nur die beiden Erstautor:innen); [A] PMID 21357342 (hier erneut gelesen); [W04].
24. Hedge, C., Powell, G., & Sumner, P. (2018). The reliability paradox: Why robust cognitive tasks do not produce reliable individual differences. *Behavior Research Methods, 50*(3), 1166–1186. https://doi.org/10.3758/s13428-017-0935-1 — CR ✔ (online 2017); [A] PMID 28726177; [W12].
25. Helton, W. S., & Russell, P. N. (2012). Brief mental breaks and content-free cues may not keep you focused. *Experimental Brain Research, 219*(1), 37–46. https://doi.org/10.1007/s00221-012-3065-0 — CR ✔; [A] PMID 22427137 (n = 498).
26. Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology, 4*(1), 11–26. https://doi.org/10.1080/17470215208416600 — CR ✔; [A, OpenAlex]; [W12].
27. Hoffman, J. E., & Subramaniam, B. (1995). The role of visual attention in saccadic eye movements. *Perception & Psychophysics, 57*(6), 787–795. https://doi.org/10.3758/BF03206794 — CR ✔; [A] PMID 7651803.
28. Honda, H., & Findlay, J. M. (1992). Saccades to targets in three-dimensional space: Dependence of saccadic latency on target location. *Perception & Psychophysics, 52*(2), 167–174. https://doi.org/10.3758/BF03206770 — CR ✔; [A] PMID 1508624.
29. Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x — CR ✔ (Crossref 5 Autor:innen; Lillakas laut Erratum ergänzt, wie in W04); [A]; [W04, W12].
30. Hyman, R. (1953). Stimulus information as a determinant of reaction time. *Journal of Experimental Psychology, 45*(3), 188–196. https://doi.org/10.1037/h0056940 — CR ✔; [M]; [W12].
31. Jafarlou, F. (2024). Oculomotor rehabilitation improves reading abilities in dyslexic children with concurrent eye movement abnormalities. *Clinical Pediatrics, 63*(9), 1276–1286. https://doi.org/10.1177/00099228231221335 — CR ✔; [A] PMID 38189250 (Abstract ohne Angabe von Stichprobenaufteilung; schwach, nur als Beispiel).
32. Jóhannesson, Ó. I., Edelman, J. A., Sigurþórsson, B. D., & Kristjánsson, Á. (2018). Effects of saccade training on express saccade proportions, saccade latencies, and peak velocities: An investigation of nasal/temporal differences. *Experimental Brain Research, 236*(5), 1251–1262. https://doi.org/10.1007/s00221-018-5213-7 — CR ✔; [A] PMID 29480354.
33. Karantinos, T., Kotsiou, E., Drouza, P., Mantas, A., Anderson, A. J., Klein, C., & Smyrnis, N. (2025). Diurnal variation and practice effects in saccade task performance. *Experimental Brain Research, 243*(8), 188. https://doi.org/10.1007/s00221-025-07131-7 — CR ✔; [A] PMID 40699362.
34. Klein, R. M. (2000). Inhibition of return. *Trends in Cognitive Sciences, 4*(4), 138–147. https://doi.org/10.1016/S1364-6613(00)01452-2 — CR ✔; [A] PMID 10740278.
35. Kowler, E., Anderson, E., Dosher, B., & Blaser, E. (1995). The role of attention in the programming of saccades. *Vision Research, 35*(13), 1897–1916. https://doi.org/10.1016/0042-6989(94)00279-U — CR ✔; [A] PMID 7660596.
36. Land, M., Mennie, N., & Rusted, J. (1999). The roles of vision and eye movements in the control of activities of daily living. *Perception, 28*(11), 1311–1328. https://doi.org/10.1068/p2935 — CR ✔; [A] PMID 10755142.
37. Leigh, R. J., & Kennard, C. (2004). Using saccades as a research tool in the clinical neurosciences. *Brain, 127*(3), 460–477. https://doi.org/10.1093/brain/awh035 — CR ✔; [A] PMID 14607787 (Übersicht, keine Zahlen zitiert).
38. Leong, D. F., Master, C. L., Messner, L. V., Pang, Y., Smith, C., & Starling, A. J. (2014). The effect of saccadic training on early reading fluency. *Clinical Pediatrics, 53*(9), 858–864. https://doi.org/10.1177/0009922814532520 — CR ✔; [A] PMID 24790022 (erste Autorin: King-Devick Test, LLC).
39. Liu, L., & Arditi, A. (2001). How crowding affects letter confusion. *Optometry and Vision Science, 78*(1), 50–55. https://doi.org/10.1097/00006324-200101010-00014 — CR ✔; [A] PMID 11233335.
40. MacKenzie, I. S. (1992). Fitts' law as a research and design tool in human-computer interaction. *Human–Computer Interaction, 7*(1), 91–139. https://doi.org/10.1207/s15327051hci0701_3 — CR ✔; [A-W] Abstract und Kernzahlen über die Autorenseite (yorku.ca); [W09].
41. Mackworth, N. H. (1948). The breakdown of vigilance during prolonged visual search. *Quarterly Journal of Experimental Psychology, 1*(1), 6–21. https://doi.org/10.1080/17470214808416738 — CR ✔; [M]; [W02].
42. Miller, J., & Ulrich, R. (2013). Mental chronometry and individual differences: Modeling reliabilities and correlations of reaction time means and effect sizes. *Psychonomic Bulletin & Review, 20*(5), 819–858. https://doi.org/10.3758/s13423-013-0404-5 — CR ✔; [A] PMID 23955122.
43. Montenegro, S. M., & Edelman, J. A. (2019). Impact of task-specific training on saccadic eye movement performance. *Journal of Neurophysiology, 122*(4), 1661–1674. https://doi.org/10.1152/jn.00020.2019 — CR ✔; [A] PMID 31461366.
44. Mueller, S. T., & Weidemann, C. T. (2012). Alphabetic letter identification: Effects of perceivability, similarity, and bias. *Acta Psychologica, 139*(1), 19–37. https://doi.org/10.1016/j.actpsy.2011.09.014 — CR ✔; [A] PMID 22036587; Tabellen 2 und 3 und Methoden als PMC-XML [V] (PMC3271710).
45. Munoz, D. P., Broughton, J. R., Goldring, J. E., & Armstrong, I. T. (1998). Age-related performance of human subjects on saccadic eye movement tasks. *Experimental Brain Research, 121*(4), 391–400. https://doi.org/10.1007/s002210050473 — CR ✔; [A] PMID 9746145 (hier erneut gelesen); [W02, W03].
46. Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. *Journal of Neurophysiology, 83*(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639 — CR ✔; [A] PMID 10669480 (hier erneut gelesen); [W06, W09, W10].
47. Niechwiej-Szwedo, E., Goltz, H. C., Chandrakumar, M., & Wong, A. M. F. (2014). Effects of strabismic amblyopia and strabismus without amblyopia on visuomotor behavior: III. Temporal eye-hand coordination during reaching. *Investigative Ophthalmology & Visual Science, 55*(12), 7831–7838. https://doi.org/10.1167/iovs.14-15507 — CR ✔; [A] PMID 25389201 (n = 46; Beschleunigungsphase des Greifens nach Zielfixation länger; mehr sekundäre Sakkaden).
48. Nuechterlein, K. H., Parasuraman, R., & Jiang, Q. (1983). Visual sustained attention: Image degradation produces rapid sensitivity decrement over time. *Science, 220*(4594), 327–329. https://doi.org/10.1126/science.6836276 — CR ✔; [A] PMID 6836276 (hier erneut gelesen); [W02].
49. Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 — CR ✔; [A] PMID 1766652; [W12].
50. Pelli, D. G., & Tillman, K. A. (2008). The uncrowded window of object recognition. *Nature Neuroscience, 11*(10), 1129–1135. https://doi.org/10.1038/nn.2187 — CR ✔; [A] PMID 18828191 (hier erneut gelesen); [W02].
51. Pollock, A., Hazelton, C., Rowe, F. J., Jonuscheit, S., Kernohan, A., Angilley, J., Henderson, C. A., Langhorne, P., & Campbell, P. (2019). Interventions for visual field defects in people with stroke. *Cochrane Database of Systematic Reviews, 2019*(5), CD008388. https://doi.org/10.1002/14651858.CD008388.pub3 — CR ✔ (Crossref führt Campbell nicht); [A] PMID 31120142.
52. Proctor, R. W., & Schneider, D. W. (2018). Hick's law for choice reaction time: A review. *Quarterly Journal of Experimental Psychology, 71*(6), 1281–1299. https://doi.org/10.1080/17470218.2017.1322622 — CR ✔; [A] PMID 28434379 (hier erneut gelesen); [W12].
53. Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 — CR ✔ (online 2019); [A] PMID 31823223; Tabelle 4 und Zusatzstellen als PMC-XML [V] gelesen (PMC7280355).
54. Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin, 124*(3), 372–422. https://doi.org/10.1037/0033-2909.124.3.372 — CR ✔; [A] PMID 9849112.
55. Rayner, K. (2009). The 35th Sir Frederick Bartlett Lecture: Eye movements and attention in reading, scene perception, and visual search. *Quarterly Journal of Experimental Psychology, 62*(8), 1457–1506. https://doi.org/10.1080/17470210902816461 — CR ✔; [A] PMID 19449261.
56. Rosenfield, M. (2011). Computer vision syndrome: A review of ocular causes and potential treatments. *Ophthalmic and Physiological Optics, 31*(5), 502–515. https://doi.org/10.1111/j.1475-1313.2011.00834.x — CR ✔; [A] PMID 21480937 (64–90 % der Computernutzer berichten Sehbeschwerden wie Augenbelastung, Kopfschmerz, trockene Augen).
57. Roth, T., Sokolov, A. N., Messias, A., Roth, P., Weller, M., & Trauzettel-Klosinski, S. (2009). Comparing explorative saccade and flicker training in hemianopia: A randomized controlled study. *Neurology, 72*(4), 324–331. https://doi.org/10.1212/01.wnl.0000341276.65721.f2 — CR ✔ (Crossref: ohne Untertitel); [A] PMID 19171828 (hier erneut gelesen); [D03].
58. Saslow, M. G. (1967). Effects of components of displacement-step stimuli upon latency for saccadic eye movement. *Journal of the Optical Society of America, 57*(8), 1024–1029. https://doi.org/10.1364/JOSA.57.001024 — CR ✔ (Crossref nennt nur die Anfangsseite 1024); [A-W] Abstract über die Verlagsseite (opg.optica.org).
59. Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do “brain-training” programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 — CR ✔; [A] PMID 27697851 (hier erneut gelesen); [W01–W05].
60. Stahl, J. S. (1999). Amplitude of human head movements associated with horizontal saccades. *Experimental Brain Research, 126*(1), 41–54. https://doi.org/10.1007/s002210050715 — CR ✔; [A] PMID 10333006.
61. Strasburger, H., Rentschler, I., & Jüttner, M. (2011). Peripheral vision and pattern recognition: A review. *Journal of Vision, 11*(5), 13. https://doi.org/10.1167/11.5.13 — CR ✔; [A] PMID 22207654.
62. Vasudevan, B., Ciuffreda, K. J., & Ludlam, D. P. (2009). Accommodative training to reduce nearwork-induced transient myopia. *Optometry and Vision Science, 86*(11), 1287–1294. https://doi.org/10.1097/OPX.0b013e3181bb44cf — CR ✔; [A] PMID 19786929 (10 Personen, Mehrkomponenten-Programm mit Hart chart, ohne Kontrolle).
63. Vera, J., Redondo, B., Molina, R., Koulieris, G. A., & Jiménez, R. (2020). Validation of an objective method for the qualitative and quantitative assessment of binocular accommodative facility. *Current Eye Research, 45*(5), 636–644. https://doi.org/10.1080/02713683.2019.1688837 — CR ✔ (online 2019); [A] PMID 31675903 (Hart Chart als Messverfahren, n = 33).
64. Wagenmakers, E.-J., & Brown, S. (2007). On the linear relation between the mean and the standard deviation of a response time distribution. *Psychological Review, 114*(3), 830–841. https://doi.org/10.1037/0033-295X.114.3.830 — CR ✔; [A] PMID 17638508.
65. Whitney, D., & Levi, D. M. (2011). Visual crowding: A fundamental limit on conscious perception and object recognition. *Trends in Cognitive Sciences, 15*(4), 160–168. https://doi.org/10.1016/j.tics.2011.02.005 — CR ✔; [A] PMID 21420894 (hier erneut gelesen); [W12].
66. Wolfe, J. M., & Horowitz, T. S. (2017). Five factors that guide attention in visual search. *Nature Human Behaviour, 1*(3), Article 0058. https://doi.org/10.1038/s41562-017-0058 — CR ✔; [A] PMID 36711068 (Europe PMC).

### D.3 Geprüft, aber bewusst nicht verwendet

- **Muchnick, B.** und **Mountford, J.** (Praxisperspektive, in der ersten Fassung genannt): keine konkrete einschlägige Publikation gefunden; ein Lehrbuch gleichen Autorennamens („Clinical Medicine in Optometric Practice“) ist nicht zum Thema und wurde nicht geprüft. **Nicht verwendet.**
- Bernell-Produktseite (https://www.bernell.com/product/BC4DC36/152): per curl nicht abrufbar (Zugriffssperre); stattdessen die Jutron-Seite mit gleichem Artikeltext.
- Vivid Visions: Der frei lesbare Teil enthält keine Anleitung; die Materialseite (https://www.vividvisionsoptometry.com/vtmaterials) nennt „Four Square Saccade Chart“ als PDF, das nicht gelesen wurde.
- Irwin, D. E. (1992), https://doi.org/10.1037/0278-7393.18.2.307 (Gedächtnis für Ort und Identität über Augenbewegungen); Treisman, A. M., & Gelade, G. (1980), https://doi.org/10.1016/0010-0285(80)90005-5; Denckla, M. B., & Rudel, R. G. (1976), https://doi.org/10.1016/0028-3932(76)90075-0 (schnelles Benennen); Neisser, U. (1963), https://doi.org/10.2307/1419778 (Suche in Buchstabenlisten): DOI per Crossref ✔, aber kein Abstract auffindbar → **nicht aufgenommen**.
- Bowie, C. R., & Harvey, P. D. (2006), https://doi.org/10.1038/nprot.2006.390 (Trail Making Test): Abstract gelesen, aber eine diagnostische Aufgabe; **nicht übernommen**.
- Norton, E. S., & Wolf, M. (2012), https://doi.org/10.1146/annurev-psych-120710-100431 (Rapid Automatized Naming und Leseflüssigkeit): Abstract gelesen; für die Touch-Übung nicht nötig → nicht aufgenommen.
- Bahill, A. T., Adler, D., & Stark, L. (1975): weder über Crossref noch über PubMed-Titelsuche auffindbar → **nicht aufgenommen**.
- Theeuwes, J., Kramer, A. F., Hahn, S., & Irwin, D. E. (1998), https://doi.org/10.1111/1467-9280.00071 – Zahl (30–40 %) nur über Sekundärangaben [S] → nicht verwendet.
- Mackworth (1948): Zahlen („10–15 % in 30 min“) nur über Sekundärquellen [S, W02] → nur qualitativ.
- **Pronk-Spannweite „30–130 ms“:** Die Angabe in `docs/wissenschaft/README.md` und der Spezifikation „Touchscreens messen 30–130 ms zu lang“ entspricht nicht ganz den Tabellenwerten (Touch-Smartphones im Mittel ≈ 58–70 ms; Laptops im Mittel bis ≈ 133 ms; Einzelwerte der Touchgeräte ≈ 45–131 ms; „30 ms“ erscheint nur als Abstand zweier Häufungsmaxima). Hier wird **≈ 58–70 ms für Smartphones** verwendet; für **Tablets liegt keine Messung** vor.
- Entfallene Quellen der ersten Fassung (nur Einzelziel-Design): Becker & Jürgens (1990), Fischer & Ramsperger (1984), Findlay & Walker (1999), Greene et al. (2014), Kalesnykas & Hallett (1994), Kowler (2011), Niemi & Näätänen (1981), Rizzolatti et al. (1987), See et al. (1995), Smith & Schenk (2012), Soukoreff & MacKenzie (2004), Temple et al. (2000), Walker et al. (1997, 2000), Woods et al. (2015). Die Prüfung dieser DOIs bleibt in der Versionsgeschichte der Datei erhalten.

### D.4 Bibliografische Besonderheiten

- Crossref nennt für Dafoe et al. das Jahr 2006 (online); Band 179 trägt 2007. Saslow (1967): Crossref nur Anfangsseite 1024. Abadi (2002): Crossref nennt nur Abadi, PubMed Abadi & Bjerre. Pollock et al. (2019): Crossref ohne Campbell. Handler & Fierson (2011): Crossref nennt nur die beiden Erstautor:innen. Baloh et al. (1975): Seitenzahlen aus PubMed (1065–1070), Crossref nur Anfangsseite. Dodick et al.: Crossref Jahr 2016 (online), Band 32 (2017). Balke et al.: Crossref „Volume 14“ im Bandfeld. Wolfe & Horowitz (2017): Crossref ohne Seitenzahl (Artikelnummer 0058). Marinoff (2016): keine DOI.
