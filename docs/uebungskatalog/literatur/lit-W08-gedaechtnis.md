# Literaturbasis W08 – Gedächtnis (Katalognummern 601–607)

Stand: 29.09.2026 · Gruppe W08 · Grundlage für die Autor-Agenten der Einträge
601 color-sequence (Senso) · 602 digit-span (Zahlenspanne) · 603 grid-memorization (Raster-/Mustergedächtnis) ·
604 n-back · 605 object-location (Objekt-Ort) · 606 word-recall (Wortliste) · 607 path-tracing (Corsi-Pfad)

## 0. Prüfverfahren, Legende und wichtige Vorab-Befunde

**Prüfvermerke** (in Teil A und D):

- **CR ✓** = DOI über `api.crossref.org` aufgelöst; Titel, Autor:innen, Jahr, Zeitschrift, Band und Seiten stimmen.
- **PM** = Abstract über PubMed (E-Utilities) gelesen · **VT** = Volltext oder Preprint eingesehen ·
  **SEK** = Inhalt nur über Sekundärdarstellungen bzw. Suchmaschinen-Zusammenfassungen geprüft (Abstract nicht frei
  zugänglich) → als *unsicherer* kennzeichnen · **B** = Buch, Test oder Hochschulschrift, keine DOI.
- **Herleitung** = eigene Rechnung oder Schlussfolgerung aus belegten Zahlen, nicht selbst als Studienergebnis publiziert.
- Quellen aus `docs/wissenschaft/01–04` wurden übernommen und die DOI erneut per Crossref aufgelöst (Vermerk „aus Dok. 0x“).

**Befunde, die alle sieben Seiten betreffen:**

1. **Woods et al. (2015)** steht auf *allen* sieben Seiten als Beleg für „chronometrische Standards“,
   Spectre-Timerrundung, Frame-Raster bei 60/144/240 Hz, „Signalentdeckungsmetriken“ (604) oder einen „verlässlichen
   Benchmark für die Integrität des Arbeitsgedächtnisses“ (601). Die Studie untersucht nur die **einfache
   Reaktionszeit**. Sie zeigt 231 ms Mittelwert und 213 ms nach Abzug der Hardware-Verzögerung (≈ 18 ms), +0,55 ms pro
   Lebensjahr und eine Entdeckungszeit von 131 ms (n = 1.469; PM). Zu Gedächtnis, Spannen, Timerrundung oder
   144/240 Hz sagt sie nichts. Die Frame-Dauern (16,7/6,9/4,1 ms) sind reine Arithmetik (1000/Hz).
   → **stützt die Aussagen nicht.**
2. **Die Leistungsstufen-Tabellen** („Tier 1 / Top 1 %“, „50. Perzentil“, „WAIS-Skalenwert-Äquivalent“, „Klicktakt
   unter 350 ms“) haben **keine Datengrundlage**. Die Seiten sagen selbst, dass sie keine Nutzerdaten sammeln. Die dafür
   genannten Quellen enthalten keine solchen Normen für diese Aufgaben (Details in Teil A). Zeit- bzw. Takt-Angaben in ms
   sind außerdem geräteabhängig (Touch-Mehrlatenz 58–70 ms; Pronk et al., 2020).
3. **Kurzprüfung Spielcode (nur Befund, für die Autor:innen zur Bestätigung):**
   - **606 Wortliste:** Im Spiel-Chunk `84417-ea843276c47c70e9.js` steht eine Liste mit **49 englischen Wörtern**
     („apple“, „bridge“, „castle“ …). Eine deutsche oder italienische Liste wurde nicht gefunden. Auch auf `/de/` sind
     die Wörter also vermutlich **englisch** – ein erheblicher Faktor für Sprachabhängigkeit und Lesen (siehe F31–F33).
   - **601 Senso:** Die Palette im Chunk `23629-c8012c15f8b362b9.js` hat 6 Farben: `red, blue, green (emerald),
     yellow, purple, orange` (Tailwind `bg-red-500`, `bg-blue-500`, `bg-emerald-500`, `bg-yellow-400`,
     `bg-purple-500`, `bg-orange-500`). Rot/Orange/Grün und Blau/Lila sind bei Rot-Grün-Schwäche typische
     Verwechslungskandidaten (**Herleitung**, per Simulation prüfen; F62). Ob die Felder **feste Positionen** haben
     (dann ist der Ort ein redundanter, farbfreier Hinweis), müssen die Autor:innen im Code prüfen.

---

## A) Website-Quellen-Prüftabelle je Übung

### 601 · Senso / Farbsequenz (Quellenliste der Seite: 5 Einträge)

| # | Angabe der Website (wofür zitiert) | DOI-Prüfung | stützt Aussage? – Begründung |
|---|---|---|---|
| 1 | Cowan (2001), *BBS* 24(1), 87–114, 10.1017/s0140525x01003922 – „visuelles AG ~4 Einheiten“, „Merkspanne bricht jenseits von vier sequentiellen Elementen rapide ein“ | CR ✓ | **teilweise.** Cowan: eine zentrale Grenze von ≈ 4 Chunks (Bereich 3–5), aber *nur unter Bedingungen, in denen Chunking, Rehearsal und Langzeitgedächtnis blockiert sind* (PM). Einen „rapiden Einbruch jenseits von 4 Sequenzelementen“ belegt das nicht. Bei Senso wiederholt sich die Kette jede Runde und wächst um ein Element. Wiederholte Sequenzen werden ins Langzeitgedächtnis gelernt (Hebb-Effekt, auch räumlich; Couture & Tremblay, 2006), deshalb sind längere Ketten möglich. |
| 2 | Luck & Vogel (1997), *Nature* 390, 279–281, 10.1038/36846 – „4-Elemente-Grenze“, „ab Sequenzlänge 5 an der Kapazitätsgrenze“ | CR ✓ | **teilweise.** ≈ 4 Farben oder Orientierungen in **gleichzeitig** gezeigten Arrays (Change Detection; PM). Für **zeitliche Sequenzen** wurde das nicht untersucht. Die Übertragung auf „Sequenzlänge 5“ ist nicht belegt. |
| 3 | Baddeley & Hitch (1974), *Psychology of Learning and Motivation* 8, 47–89, 10.1016/S0079-7421(08)60452-1 – „visuell-räumlicher Notizblock“ | CR ✓ (Crossref ohne Band; Band 8 korrekt) | **ja** (Modellebene): Die Arbeit schlug ein Drei-Komponenten-Modell vor (bestätigt im PM-Abstract von Baddeley, 2000). Die Feinstruktur des Notizblocks stammt aus späteren Arbeiten (Logie, 1995). |
| 4 | Miller (1956), *Psych. Review* 63(2), 81–97, 10.1037/h0043158 – „7 ± 2“; außerdem „4-Elemente-Grenze … überwinden (Miller, 1956)“ | CR ✓ | **teilweise.** 7 ± 2 und Recoding/Chunking: ja. Die „4-Elemente-Grenze“ ist eine **Fehlzuschreibung** an Miller (sie stammt von Cowan, 2001). |
| 5 | Woods et al. (2015), *Front. Hum. Neurosci.* 9, 131, 10.3389/fnhum.2015.00131 – „Millisekunden-Chronometrie“, „verlässlicher Benchmark für die Integrität des AG“ | CR ✓ | **nein** (siehe 0.1). |

Nur im Fließtext, ohne Listeneintrag:

- **Baddeley (2000)**, CR ✓: episodischer Puffer. Belegt nicht, dass „geübte Anwender durch duale Enkodierung die
  Pufferkapazität verdoppeln“. Verbale Zusatzkodierung hilft messbar, aber mäßig: VPT-Spanne 8,72 → 10,08 Felder
  (≈ +16 %; Brown et al., 2006). → **nein** für „verdoppeln“.
- **Logie (1995)**, B: Visual Cache und Inner Scribe als Modellvorschlag. → **ja** als Theorie.
- **Baer & Morrison (1978)**: Produktgeschichte, nicht geprüft; wissenschaftlich unerheblich.

Weitere Aussagen ohne Beleg:

- „Chunking halbiert die kognitive Belastung“ → nicht belegt. Chunking entlastet, aber die Kapazität ist nicht fix in
  Chunks, und Chunks am Listenende helfen nicht (Thalmann et al., 2019).
- „Synaptische Plastizität im präfrontalen Kortex“ → kein Beleg.
- „Hilft gegen Alltagsvergesslichkeit – Ja“ → **nicht belegt** (F77–F82).
- „Latenzfrei auf Touch“ → falsch; Touch-Geräte messen 58–70 ms zu lang (Pronk et al., 2020).

**Widersprüche auf der Seite:** Laut Tabelle ist Level 5–7 der Durchschnitt, laut FAQ Level 7–8. Laut FAQ gilt „ab
Level 10 (> 1.300 P) Elite“, laut Tabelle Tier 1 erst ab Level 11 bzw. > 1.500 P.

### 602 · Zahlenspanne (Quellenliste: 6 Einträge)

| # | Angabe der Website | DOI-Prüfung | stützt Aussage? – Begründung |
|---|---|---|---|
| 1 | Miller (1956) – Spanne ≈ 7 | CR ✓ | **ja** (klassische Größenordnung der Zahlenspanne; Chunking/Recoding). |
| 2 | Cowan (2001) – „ohne Chunking ≈ 4; der Unterschied ist Strategie“; „ungebündelte Fokalkapazität **strikt** 4 ± 1; längere Spannen erfordern **zwingend** Chunking“ | CR ✓ | **teilweise.** Der Kern stimmt (3–5 Chunks, wenn Strategien blockiert sind). „Strikt“ und „zwingend“ sind überzogen: Cowan beschreibt Randbedingungen. Rehearsal und Langzeitwissen tragen normal zur Spanne bei; die Ziffernspanne spiegelt auch gelernte Ziffernfolgen (Jones & Macken, 2015). |
| 3 | Baddeley & Hitch (1974) – phonologische Schleife; „Spuren halten 1,5–2,0 s“ | CR ✓ | **teilweise.** Schleife als Konzept: ja. Die ≈ 2-s-Angabe stammt aus **Baddeley, Thomson & Buchanan (1975)**: Die Spanne entspricht der Zahl der Wörter, die man in ≈ 2 s lesen kann (VT). Diese Quelle nennt die Seite nicht. |
| 4 | Baddeley (2000), *TICS* 4(11), 417–423 | CR ✓ | **teilweise.** Belegt den episodischen Puffer, nicht die 2-s-Zerfallszeit. |
| 5 | Logie (1995), Hove: Erlbaum – „Kinästhetische Tastenfeld-Pfade … Motorkortex als Zweitspeicher“ | B (Buch existiert, ISBN 0-86377-107-6 laut Rezension; Neuauflage 2014, DOI 10.4324/9781315804743, CR ✓) | **nein** für den „Motorkortex als Zweitspeicher“. Am nächsten kommt „visuospatial bootstrapping“: Ziffern im **vertrauten Tastenfeld-Layout** werden besser behalten, wofür eine Langzeitrepräsentation des Layouts nötig ist (Darling et al., 2012). → teilweise plausibel, andere Begründung. |
| 6 | Woods et al. (2015) – „mit Hochpräzisions-Chronometrie kalibriert“ | CR ✓ | **nein** (siehe 0.1). |

Nur im Fließtext:

- **Wechsler (1939/1955/2008):** Testmanuale (B), nicht eingesehen. Die WAIS-IV enthält Zahlennachsprechen vorwärts,
  rückwärts und sequenziell. Die Tabelle der Seite ordnet der *längsten Vorwärtsspanne* einen „WAIS-Skalenwert“ zu
  (9–12 Ziffern = 16–19). Dafür gibt es keine Quelle. Nach dem Testaufbau ergibt sich der Skalenwert altersnormiert aus
  der Rohpunktsumme aller Teile. → **nicht belegt / irreführend** (unsicher, weil das Manual nicht eingesehen wurde).
- „Seit über einem Jahrhundert“: Die Zahlenspanne wurde erstmals 1887 berichtet (Jacobs, 1887; CR ✓). → ja.
- **Baddeley (1986):** Buch (B).

Weitere Aussagen:

- „Rückwärtsspanne beansprucht die zentrale Exekutive“ → **teilweise belegt**: Rückwärts ist schwerer als vorwärts
  (Kessels et al., 2008) und altersempfindlicher (Bopp & Verhaeghen, 2005).
- „1-up/1-down konvergiert exakt auf deine tatsächliche Gedächtnisspanne“ → **teilweise**: Die Treppe schwingt um den
  50-%-Punkt (Levitt, 1971). Mit wenigen Durchgängen in 45 s ist das eine grobe Schätzung und nicht mit der
  WAIS-Spanne vergleichbar.
- „Klicktakt 350–950 ms“ je Stufe → erfunden und geräteabhängig.

### 603 · Visuelles Rastergedächtnis / Memory Matrix (Quellenliste: 7 Einträge)

| # | Angabe der Website | DOI-Prüfung | stützt Aussage? – Begründung |
|---|---|---|---|
| 1 | Cowan (2001) – „physiologischer Engpass 3–4“; Tier 4 („5 Felder = reine physiologische Kapazitätsgrenze“) | CR ✓ | **teilweise/nein.** Cowan zählt Chunks, nicht Rasterfelder. Beleuchtete Felder werden als Konfiguration gespeichert: Studierende behalten im VPT **8,7–10,1 Felder** (Brown et al., 2006). „5 Felder = Grenze“ folgt daraus nicht. |
| 2 | Baddeley (2000) – Visual Cache / Inner Scribe | CR ✓ | **nein** für Cache/Scribe (das ist Logie, 1995). Baddeley (2000) handelt vom episodischen Puffer. |
| 3 | Logie (1995) – statische Muster prüfen den passiven Visual Cache | B | **ja** (Modell). Empirisch gestützt: Doppeldissoziation VPT vs. Corsi (Della Sala et al., 1999) und visuell vs. räumlich (Klauer & Zhao, 2004). |
| 4 | Corsi (1972), Dissertation McGill | B (nicht per DOI prüfbar; in der Corsi-Literatur üblich so zitiert, vgl. Berch et al., 1998) | **teilweise.** Ursprung des Block-Tappings: ja. „Wies nach, dass räumliche Systeme anatomisch getrennt von der Zahlenspanne arbeiten“ ist so nicht prüfbar. Die Dissoziation verbal/räumlich stützen spätere Arbeiten (Kessels et al., 2008; Klauer & Zhao, 2004). |
| 5 | Luck & Vogel (1997) – „≈ 4 Objekte; Grenze ist die Objektzahl, nicht das Detail“ | CR ✓ | **teilweise.** Befund für einfache Merkmalsobjekte: ja (PM). Die Kapazität hängt aber auch von der Komplexität ab: 1,6 (schattierte Würfel) bis 4,4 (Farben) (Alvarez & Cavanagh, 2004). Auf Muster aus Feldern ist die Zahl nicht direkt übertragbar. |
| 6 | Milner (1971), *Br. Med. Bull.* 27(3), 272–277, 10.1093/oxfordjournals.bmb.a070866 | CR ✓ (kein Abstract) | **teilweise.** Gilt als Erstbeschreibung des Block-Tappings (so zitiert bei Vandierendonck et al., 2004, PM); Inhalt nicht selbst eingesehen. |
| 7 | Woods et al. (2015) – „mit chronometrischer Präzision kalibriert“, „standardisiertes 1,5-s-Einprägefenster“ | CR ✓ | **nein.** Der VPT zeigt Muster **3 s** lang (Brown et al., 2006, VT); 1,5 s ist kein Standard. |

Nur im Fließtext:

- **Della Sala et al. (1997), VPT-Manual** (B, Thames Valley Test Company) – „Standardwert 6–7 Felder“ bzw. im FAQ
  „6–8 Felder“ → **nicht prüfbar**. Junge Erwachsene erreichen im VPT 8,7–10,1 Felder, bei 3 s Anzeige und 10 s Pause
  (Brown et al., 2006). Wegen der kürzeren Anzeige und des anderen Materials sind die Werte nicht vergleichbar.
- **Della Sala et al. (1999)**, CR ✓, PM: VPT vs. Corsi dissoziieren. → **ja**.
- **Wertheimer (1923)**, *Psychol. Forschung* 4, 301–350, 10.1007/BF00410640, CR ✓: Gestaltgesetze. → ja als
  Konzept; „senkt die kognitive Last um über 60 %“ ist **ohne Beleg**.

Weitere Aussagen:

- „Ikonisches Gedächtnis zerfällt in 250–500 ms“ → **teilweise**. Bei Matrixmustern ist der hochkapazitive,
  maskierbare sensorische Speicher nur bis ≈ 100 ms wirksam; danach arbeitet ein begrenztes, maskierungsresistentes
  Kurzzeitgedächtnis (Phillips, 1974; SEK). Nach Sperling (1960; SEK) verschwindet der Vorteil des Teilberichts bis
  ≈ 1 s.
- „Blick starr aufs Zentrum, parafoveal erfasst man das Muster simultan“ → **teilweise**. Für die Behaltensphase
  passt, dass Augenbewegungen in der Pause das *Orts*-Gedächtnis stören (Postle et al., 2006). Bei großen Rastern
  begrenzt die Peripherie das Erkennen (F52–F54).
- **Widerspruch:** Der Timer zeigt 60 s, der Tabellentext spricht vom „45-Sekunden-Durchgang“.

### 604 · N-Back (Quellenliste: 4 Einträge + „The science behind it“: 6 Einträge)

| # | Angabe der Website | DOI-Prüfung | stützt Aussage? – Begründung |
|---|---|---|---|
| 1 | Baddeley & Hitch (1974) – Speichern plus Aktualisieren = Arbeitsgedächtnis | CR ✓ | **ja** (Modellebene). |
| 2 | Baddeley (1986), *Working memory*, OUP (Buch) / „Baddeley 1986, 2000: zentrale Exekutive; N-Back koordiniert phonologische Schleife und DLPFC“ | B (Oxford: Clarendon Press, Oxford Psychology Series 11; ISBN 0-19-852116-2 laut Open Library) | **teilweise.** Zentrale Exekutive: ja. Die DLPFC-Beteiligung belegt eine fMRT-Metaanalyse, aber als Teil eines **frontoparietalen Netzes** (Owen et al., 2005), nicht als „Koordinationsort“. |
| 3 | Cowan (2001) – „Kapazität ≈ 4“; „Leistung bricht bei 4-/5-Back ein, weil die biologische Grenze erreicht ist“ | CR ✓ | **teilweise.** Die Kapazitätsgrenze existiert. N-Back mischt aber Speicher, Aktualisierung und die Kontrolle von Vertrautheit (Lures; Kane et al., 2007). „Biologische Grenze“ ist überzogen. |
| 4 | Woods et al. (2015) – „standardisierte … Signalentdeckungsmetriken“ | CR ✓ | **nein** (siehe 0.1; die Studie enthält keine Signalentdeckungsanalyse). |
| S1 | Kirchner (1958), *J. Exp. Psychol.* 55(4), 352–358 – Ursprung; „normative Basislinie gesunder Erwachsener: 65–79 % bei 3-Back (Kirchner, 1958)“ | CR ✓ (kein Abstract; Inhalt SEK) | **teilweise/nein.** Kirchner untersuchte **Altersunterschiede** mit einem Lichtfeld und einem Grundtakt von 1,5 s; Ältere fielen früher ab (SEK). Eine „Normbasislinie 65–79 %“ für ein Buchstaben-3-Back ist dort nicht belegt. |
| S2 | Diamond (2013), *Annu. Rev. Psychol.* 64, 135–168 – Triade der exekutiven Funktionen | CR ✓, PM | **ja** (Hemmung, Arbeitsgedächtnis, kognitive Flexibilität als Kern-EF). |
| S3 | Jaeggi et al. (2008), *PNAS* 105(19), 6829–6833 – „signifikante Zuwächse bei Matrizentests“; FAQ: „belegen bedeutsame Transfereffekte“ | CR ✓, PM | **Befund korrekt wiedergegeben, Schluss nicht haltbar.** Kritik am Test: BOMAT mit 10 statt 45 min (Moody, 2009; SEK). Mit aktiver Kontrollgruppe kein Transfer (Redick et al., 2013). In Metaanalysen klein bzw. fehlend: g = 0,24 (Au et al., 2015), g = 0,16 (Soveri et al., 2017), kein Nachweis gegen behandelte Kontrollgruppen (Melby-Lervåg et al., 2016). → **nein** für „bedeutsame Transfereffekte“. |

Weitere Aussagen:

- „Goldstandard … zur Messung fluider Intelligenz“ → **nein**. N-Back hängt nur schwach mit Complex-Span-Aufgaben
  zusammen (r = .20; Redick & Lindsey, 2013) und ist als Messung individueller Unterschiede wegen unzureichender
  Reliabilität ungeeignet (Jaeggi et al., 2010).
- „Tier 3: normative Basislinie (Kirchner, 1958)“ → nein.
- **Widersprüche:** Untertitel „2-Back-Training“, Start aber auf 3-Back. Name „Dual N-Back“, beschrieben ist jedoch
  ein einzelner Buchstabenstrom. Bitte im Code prüfen.

### 605 · Objekt-Ort-Gedächtnis (Quellenliste: 7 Einträge)

| # | Angabe der Website | DOI-Prüfung | stützt Aussage? – Begründung |
|---|---|---|---|
| 1 | Cowan (2001) – „fokales AG strikt auf 3–4 Elementpaare begrenzt“ | CR ✓ | **teilweise** (Cowan zählt Chunks, nicht Objekt-Ort-Paare; „strikt“ überzogen). |
| 2 | Baddeley (2000) – „Objekt-Orts-Bindung wird durch den episodischen Puffer gesteuert“ | CR ✓ | **teilweise.** Der Puffer ist als bindendes System *vorgeschlagen* (PM), nicht „nachgewiesen“. Visuelle Bindung erwies sich als relativ automatisch, aber fragil (Allen et al., 2006). |
| 3 | Logie (1995) – Cache (Identität) + Scribe (Koordinaten) | B | **teilweise** (Theorie; Objekt-Ort-Bindung wird heute vor allem dem medialen Temporallappen zugeschrieben, F46). |
| 4 | Luck & Vogel (1997) – „Merkmalsverknüpfungen binden erhebliche Aufmerksamkeitsressourcen … verdoppeln die Last“ | CR ✓ | **nein – Gegenteil.** Luck & Vogel fanden, dass Verknüpfungen aus 4 Merkmalen *so gut* wie Einzelmerkmale gespeichert werden (PM). Für Aufmerksamkeitsbedarf sprechen Wheeler & Treisman (2002). Allen et al. (2006) fanden unter Zusatzlast keinen Mehraufwand, aber Schwäche bei sequenzieller Darbietung. Der Stand ist **umstritten**; eine Verdopplung ist nicht belegt. |
| 5 | Tolman (1948), *Psych. Review* 55(4), 189–208 – kognitive Landkarte; „Landmark-Verankerung“ | CR ✓ | **teilweise** (historisches Konzept aus Tierversuchen zur Navigation; kein Beleg für eine 1,5-s-Rasteraufgabe). |
| 6 | Eals & Silverman (1994), *Ethology and Sociobiology* 15(2), 95–105, 10.1016/0162-3095(94)90020-5 – „Objektortsgedächtnis als evolutionärer Mechanismus getrennt von mentaler Rotation“, „Populationsdurchschnitt 4–5 Objekte“ | CR ✓, **Titel auf der Website leicht falsch**: richtig „… female advantage in recall of object **arrays**“ (nicht „object locations“) | **teilweise/nein.** Die Studie repliziert einen **Frauenvorteil** beim Erinnern von Objektanordnungen, bei häufigen Objekten unter beiläufigem und gezieltem Lernen (SEK). Die evolutionäre Deutung ist eine Hypothese. Eine Norm „4–5 Objekte“ für ein Emoji-Raster gibt es dort nicht. Der Geschlechtsunterschied hängt von Alter, Objektart und Auswertung ab (Voyer et al., 2007). |
| 7 | Woods et al. (2015) – „chronometrische Standards … festes 1,5-s-Fenster“ | CR ✓ | **nein** (siehe 0.1). |

Nur im Fließtext:

- **„Luck & Lockhart, 1997“** (englischer Textteil) → **falsche Autorenangabe**, gemeint ist offensichtlich Luck &
  Vogel (1997).
- **„CANTAB PAL: gesunde Erwachsene lokalisieren 4–6 Objekte“; „normiert nach Silverman-Eals OLM und CANTAB PAL
  Standards“** → **nicht belegt**. CANTAB PAL ist ein klinischer Lerntest: Muster in Kästchen, mehrere Durchgänge, bis
  zu 8 Muster (Sahakian et al., 1988, PM). Er dient als Frühmarker für Alzheimer (Blackwell et al., 2004, PM) und ist
  auf dieses Spiel nicht übertragbar. **Kein Normbezug zulässig, keine Diagnose-Anmutung.**
- „Hippocampus, parahippocampaler Kortex, PPC, DLPFC“ → **teilweise belegt** (Postma et al., 2008, F46).
- „Parafovealer Zentrumsblick“ → bei großen Emoji-Rastern **eingeschränkt** (Crowding, F53).

### 606 · Wortliste / freie Wiedergabe (Quellenliste: 4 Einträge)

| # | Angabe der Website | DOI-Prüfung | stützt Aussage? – Begründung |
|---|---|---|---|
| 1 | Craik & Lockhart (1972), *JVLVB* 11(6), 671–684 – „tiefe Verarbeitung wichtiger als lange Betrachtung“; „bewiesen“ | CR ✓ | **ja/teilweise.** Es ist ein *theoretischer Rahmen*; der experimentelle Beleg folgt bei Craik & Tulving (1975; 10 Experimente, semantische > Reim- > Schriftbild-Fragen; SEK). „Bewiesen“ ist zu stark. |
| 2 | Murdock (1962), *J. Exp. Psychol.* 64(5), 482–488 – serielle Positionskurve; „Recency = sensorisch-echoischer Puffer“, „verblasst nach 3–5 s“ | CR ✓ (kein Abstract; SEK) | **ja** für die U-Kurve (Recency über etwa die letzten 8 Positionen; SEK). **Nein** für „echoisch“ und „3–5 s“: Recency wird dem Kurzzeitspeicher zugeschrieben, nach 10 s Ablenkung ist sie großteils, nach 30 s ganz verschwunden (Glanzer & Cunitz, 1966; SEK). Einen akustischen Code gibt es nur bei *gehörten* Items (Penney, 1989, PM). Die Übung zeigt die Wörter visuell. |
| 3 | Tulving (1962), *Psych. Review* 69(4), 344–354 – „kategoriale Clusterung“ | CR ✓ (Titel: „… of ‚unrelated‘ words“) | **ja** (subjektive Organisation beim freien Erinnern; Titel belegt). |
| 4 | Woods et al. (2015) | CR ✓ | **nein** (siehe 0.1). |

Nur im Fließtext:

- **Ebbinghaus (1885)**: Buch (B), nicht geprüft.
- **Rey (1958/1964)**: Buch (B), RAVLT. „Durchgang 1: 4–6 Wörter“ ist ohne Quellenangabe und nicht übertragbar (der
  RAVLT nutzt eine 15-Wörter-Liste, meist *vorgelesen*). Beim verbalen Lerntest schneidet vorgelesenes Material in
  Durchgang 1 besser ab als gelesenes (Van der Elst et al., 2005, PM).
- **Paivio**: duale Kodierung. Konkrete Wörter werden besser behalten (Fliessbach et al., 2006, PM) → ja.
- „Wörter in der Listenmitte leiden unter doppelter Interferenz“ → plausibel, aber ohne Quelle.
- **Sprachabhängigkeit:** Die Spielwörter sind vermutlich **englisch** (0.3). Bei geringerer Fremdsprachenkompetenz
  ist die Spanne in der Zweitsprache kleiner (Service et al., 2002; SEK).

### 607 · Corsi-Block / Pfadverfolgung (Quellenliste: 9 Einträge)

| # | Angabe der Website | DOI-Prüfung | stützt Aussage? – Begründung |
|---|---|---|---|
| 1 | Corsi (1972), Dissertation McGill | B | **ja** als Ursprung des Paradigmas. |
| 2 | Milner (1971) – „die meisten Erwachsenen 5–7 Schritte“ | CR ✓ | **teilweise.** Historische Quelle des Tests. Normwerte hängen stark von Durchführung und Auswertung ab (Berch et al., 1998, PM). Junge Erwachsene erreichten 7,1 (Farrell Pagulayan et al., 2006, PM). |
| 3 | Logie (1995) – Inner Scribe; anderer Speicher als die Zahlenspanne | B | **ja** (Theorie). Empirisch: getrennter verbaler und räumlicher Faktor (Kessels et al., 2008, PM). |
| 4 | Cowan (2001) – „ohne Chunking zerfällt die Spur nach 4–5 Schritten“ | CR ✓ | **teilweise** (Kapazitätsgrenze ja; „zerfällt nach 4–5 Schritten“ nicht belegt). |
| 5 | Baddeley (2000) – „sequentielle Bewegungsabläufe vom Inner Scribe gestützt“ | CR ✓ | **nein** (Baddeley 2000 behandelt den episodischen Puffer). |
| 6 | Miller (1956) – Chunking | CR ✓ | **ja** (Konzept). |
| 7 | Simon (1974), *Science* 183, 482–488 – Chunking | CR ✓, PM | **ja** (Chunk-Konzept). Simon schätzte die KZG-Kapazität allerdings auf **5–7 Chunks**, nicht 4. „Senkt die Last um mehr als 60 %“ ist ohne Beleg. |
| 8 | **Kessels et al. (2000)**, angegeben als *The Clinical Neuropsychologist* 14(2), 252–258, doi 10.1076/1385-4046(200005)14:2;1-Z;FT252 – „computerisierte Corsi-Normdaten: 5,4 ± 0,9“ | **DOI falsch** (Crossref 404). Richtig: *Applied Neuropsychology*, 7(4), 252–258, **10.1207/S15324826AN0704_8** (CR ✓, PM) | **unsicher/nicht belegt.** Laut Abstract: standardisierte Durchführung, 70 Gesunde und 70 Patient:innen, Perzentile und Cut-offs; rechtshemisphärisch Geschädigte schlechter. **Ein Mittelwert steht nicht im Abstract.** Eine Sekundärquelle (PsyToolkit-Beschreibung) nennt **6,2 (SD 1,3)**. Der Wert 5,4 ± 0,9 ist nicht verifizierbar; „computerisiert“ geht aus dem Abstract nicht hervor. |
| 9 | Woods et al. (2015) – „500-ms-Intervalle“, Timing | CR ✓ | **nein** (siehe 0.1; ob 500 ms im Code stehen, prüfen die Autor:innen). |

Weitere Aussagen:

- „Spanne reagiert hochsensibel auf Ermüdung, Schlafmangel …“ → ohne Quelle. Allgemein beeinträchtigt Schlafentzug
  das Arbeitsgedächtnis (Lim & Dinges, 2010). → teilweise.
- „Kinästhetisches Inner-Scribe-Rehearsal: Linie mit den Fingern nachziehen“ → **teilweise**. Handbewegungen stören die
  räumliche Spanne, Augenbewegungen aber **stärker** (Pearson & Sahraie, 2003, PM). Das Behalten stützt sich also eher
  auf okulomotorische bzw. Aufmerksamkeitsprozesse.
- „Parafoveale Zentrumsfixierung, Augen und Kopf ruhig“ → **teilweise**. In der Behaltensphase stören Augenbewegungen
  das Ortsgedächtnis (Postle et al., 2006). Beim Abrufen kann der Blick zum Ort dagegen helfen (Johansson & Johansson,
  2014).
- **Widerspruch:** Der Timer zeigt 60 s, der Text spricht vom „45-Sekunden-Fenster“.

### Zusammenfassung Teil A

- **20 verschiedene Quellen** stehen in den Quellenlisten bzw. unter „The science behind it“, insgesamt **45 Nennungen**
  auf 7 Seiten. Alle 20 wurden geprüft; 17 haben eine DOI, 3 sind Buch oder Dissertation.
- **Bibliografisch fehlerhaft: 2**
  - Kessels et al. (2000): falsche DOI **und** falsche Zeitschrift, Band und Heft.
  - Eals & Silverman (1994): Titelwort falsch.
  - Dazu kommt 1 falsche Autorenangabe im Fließtext („Luck & Lockhart, 1997“).
- **Inhaltlich nicht gestützt**, also für eine Aussage zitiert, die die Quelle nicht trägt:
  - Woods et al. (2015) auf allen 7 Seiten;
  - Baddeley (2000) für Cache/Scribe (603, 607);
  - Luck & Vogel (1997) für „Bindung verdoppelt die Last“ (605);
  - Jaeggi et al. (2008) für „bedeutsamen Transfer“ (604);
  - Kirchner (1958) als Norm (604);
  - Eals & Silverman (1994) als Norm (605);
  - Kessels et al. (2000) für 5,4 ± 0,9 (607; unsicher).

---

## B) Faktenliste „Aussage – Zahl – Quelle“

Kurzbelege; die vollständige APA-Angabe steht in Teil D. „→ 60x“ nennt die Übungen, für die der Fakt vor allem gilt.

### B1 Modelle und Kapazitätsgrenzen

- **F01** – Arbeitsgedächtnis-Modell: zentrale Exekutive, phonologische Schleife, visuell-räumlicher Notizblock
  (Baddeley & Hitch, 1974). Später kam der **episodische Puffer** hinzu: ein begrenzter, multimodaler Speicher, der
  Informationen aus den Subsystemen und dem Langzeitgedächtnis zu einer Episode bindet (Baddeley, 2000,
  https://doi.org/10.1016/S1364-6613(00)01538-2; PM). → alle
- **F02** – Millers „7 ± 2“ war nach Cowan eher grobe Schätzung und rhetorisches Mittel. Wenn Chunking, Rehearsal und
  Langzeitgedächtnis blockiert sind, liegt die zentrale Grenze bei **3–5 Chunks, im Mittel ≈ 4** (Cowan, 2001,
  https://doi.org/10.1017/s0140525x01003922; PM). Bei jungen Erwachsenen sind es 3–5 bedeutungsvolle Einheiten (Cowan,
  2010, https://doi.org/10.1177/0963721409359277; PM). → alle
- **F03** – Frühere Schätzung: KZG-Kapazität **5–7 Chunks**; das Festigen im Langzeitgedächtnis dauert **5–10 s pro
  Chunk** (Simon, 1974, https://doi.org/10.1126/science.183.4124.482; PM). Folge: Die „Grenze“ hängt von Methode und
  Chunk-Definition ab; eine feste Zahl ist keine Normangabe. → alle
- **F04** – Visuelles AG: **≈ 4 Farben oder Orientierungen**. Objekte mit 4 Merkmalen werden genauso gut behalten wie
  Einzelmerkmale, also **16 Merkmale auf 4 Objekte** (Luck & Vogel, 1997, https://doi.org/10.1038/36846; PM). → 601, 603, 605
- **F05** – Die Kapazität hängt von der Reizkomplexität ab: **1,6 Objekte** (schattierte Würfel) bis **4,4** (Farben);
  Obergrenze ≈ **4–5 Objekte** (Alvarez & Cavanagh, 2004, https://doi.org/10.1111/j.0963-7214.2004.01502006.x; PM). → 603, 605
- **F06** – Individuelle VWM-Kapazität **≈ 1,5 bis ≈ 5 Objekte**. Die EEG-Kontralateralaktivität (CDA) steigt mit der
  Objektzahl bis zur persönlichen Grenze (Vogel & Machizawa, 2004, https://doi.org/10.1038/nature02447; PM). → 603, 605
- **F07** – Die VWM-Kapazität hängt stark mit allgemeinen kognitiven Fähigkeiten zusammen. Unterschiede beruhen teils
  auf echter Speicherkapazität, teils auf ihrer effizienten Nutzung (Luck & Vogel, 2013,
  https://doi.org/10.1016/j.tics.2013.06.006; PM). → 603, 605
- **F08** – Bindung von Merkmalen **umstritten**:
  - Merkmale derselben Dimension konkurrieren; das Binden verschiedener Dimensionen braucht fokussierte Aufmerksamkeit
    und ist störanfällig (Wheeler & Treisman, 2002, https://doi.org/10.1037/0096-3445.131.1.48; PM).
  - Unter verbaler Zusatzlast war die Bindung nicht aufwendiger als Einzelmerkmale, aber bei **sequenzieller**
    Darbietung deutlich schlechter, v. a. für frühe Items: „relativ automatisch, aber fragil“ (Allen et al., 2006,
    https://doi.org/10.1037/0096-3445.135.2.298; PM).
  - → 605, 601
- **F09** – Chunking reduziert die Last im AG, aber die Kapazität ist **keine feste Zahl von Chunks**. Größere Chunks
  kosten mehr, wenn sie Elemente teilen; Chunks am **Listenende** entlasten nicht (Thalmann et al., 2019,
  https://doi.org/10.1037/xlm0000578; PM). → 601, 602, 603, 607

### B2 Visuell-räumliches Kurzzeitgedächtnis (Muster, Sequenzen)

- **F10** – Der Visual Patterns Test (VPT, statische Muster) und der Corsi-Test (Sequenzen) messen trennbare
  Komponenten. Das zeigen Korrelationen, doppelte Dissoziationen bei Patient:innen und selektive Interferenz (Della Sala
  et al., 1999, https://doi.org/10.1016/S0028-3932(98)00159-6; PM). → 603 vs. 607
- **F11** – Visuelles und räumliches KZG ließen sich auch bei Gesunden in 6 Experimenten doppelt dissoziieren (Klauer &
  Zhao, 2004, https://doi.org/10.1037/0096-3445.133.3.355; PM). → 603, 605, 607
- **F12** – VPT-Standard: Anzeige **3 s**. Studierende (Ø 24,5 J.) erreichten mit 10 s Pause **8,72 (SD 1,55) Felder**
  bei schwer und **10,08 (SD 2,09)** bei leicht verbalisierbaren Mustern. Verbale Umkodierung hilft also, ≈ +16 %
  (Brown et al., 2006, https://doi.org/10.1080/17470210600665954; VT). → 603
- **F13** – Matrixmuster (1 s Anzeige): Bis ≈ **100 ms** wirkt ein hochkapazitiver, ortsgebundener und maskierbarer
  sensorischer Speicher. Danach arbeitet ein schematisches Kurzzeitgedächtnis, das von der Komplexität abhängt,
  maskierungsresistent ist und über die ersten Sekunden nachlässt (Phillips, 1974, https://doi.org/10.3758/BF03203943;
  SEK). → 603
- **F14** – Teilbericht-Paradigma: Im Ganzbericht werden ≈ 4,5 Zeichen genannt. Der Teilberichtsvorteil schwindet bis
  ≈ 1 s Hinweisverzögerung (Sperling, 1960, https://doi.org/10.1037/h0093759; SEK, Scan ohne Textebene). → 603, 605
- **F15** – Computerisierter Corsi (Vandierendonck et al., 2004, https://doi.org/10.1348/000712604322779460; PM):
  - Gleichzeitiges Matrix-Tippen stört kurze **und** lange Sequenzen.
  - Exekutive Zusatzlast (zufällige Intervalle erzeugen) stört mittlere und lange Sequenzen.
  - Artikulatorische Unterdrückung stört das Vorwärts-Erinnern **nicht**.
  - → 607, 601
- **F16** – 246 gesunde Ältere (50–92 J.; Kessels et al., 2008, https://doi.org/10.1177/1073191108315611; PM):
  - Corsi **rückwärts ist nicht schwerer** als vorwärts, im Gegensatz zur Zahlenspanne.
  - Es ergaben sich zwei Faktoren, verbal und räumlich.
  - → 607, 602
- **F17** – Corsi-Entwicklung: linearer Anstieg von Klasse 1 (Ø 7 J.) bis Klasse 8 (Ø 14 J.). **8. Klasse M = 6,9**
  vs. **junge Erwachsene M = 7,1** (n. s.), also ein Plateau in der frühen Adoleszenz; kein Geschlechtsunterschied
  (Farrell Pagulayan et al., 2006, https://doi.org/10.1080/13803390500350977; PM). → 607
- **F18** – Beim Corsi sind Durchführung, Auswertung und Material „außerordentlich“ uneinheitlich (Berch et al., 1998,
  https://doi.org/10.1006/brcg.1998.1039; PM). **Normen sind nicht zwischen Versionen übertragbar.** → 607, 601
- **F19** – Kessels et al. (2000; https://doi.org/10.1207/S15324826AN0704_8; PM): standardisierte Durchführung,
  n = 70 Gesunde und 70 Patient:innen; 20 % der Patient:innen im Grenzbereich, > 8 % beeinträchtigt; rechtshemisphärische
  Läsionen schlechter. Einen Mittelwert nennt nur eine Sekundärquelle: 6,2 (SD 1,3), **unsicher**. → 607
- **F20** – Touch- und klassischer Corsi-Block ergaben bei 45 Gesunden keine signifikanten Unterschiede; beide gelten
  als gleichwertige Messung (Siddi et al., 2020, https://doi.org/10.1186/s12888-020-02716-8; VT-Zusammenfassung). → 607, 601
- **F21** – Italienische Normen (362 Gesunde, 20–90 J.; Monaco et al., 2013, https://doi.org/10.1007/s10072-012-1130-x;
  PM): **Alter verschlechtert alle vier Spannen** (Zahlen und Corsi, vorwärts und rückwärts); **Bildung verbessert
  alle außer Corsi rückwärts**. → 602, 607
- **F22** – Hebb-Effekt räumlich: Wird dieselbe Sequenz wiederholt (jeder 3. Durchgang), verbessert sich ihre
  Wiedergabe deutlich, auch bei räumlichen Punktfolgen (Couture & Tremblay, 2006, https://doi.org/10.3758/BF03195933;
  PM). **Herleitung für 601:** Die kumulativ wachsende Senso-Kette misst deshalb teils *Sequenzlernen*, keine reine
  Spanne. → 601, 607

### B3 Verbales Kurzzeitgedächtnis (Ziffern, Wörter, Sprache)

- **F23** – Wortlängeneffekt: Die Spanne sinkt mit der Wortlänge und lässt sich aus der Zahl der Wörter vorhersagen,
  die man in **≈ 2 s** lesen kann. Unter artikulatorischer Unterdrückung verschwindet der Effekt bei **visueller**
  Darbietung, bei auditiver bleibt er (Baddeley et al., 1975, https://doi.org/10.1016/S0022-5371(75)80045-4; VT). → 602, 606, 604
- **F24** – Sprache wirkt auf die Norm: Walisische Zahlwörter brauchen länger zum Artikulieren, deshalb ist die
  Zahlenspanne auf Walisisch kleiner als auf Englisch, bei denselben zweisprachigen Personen. Das erklärt die
  niedrigeren Normen walisischer Kinder (Ellis & Hennelly, 1980, https://doi.org/10.1111/j.2044-8295.1980.tb02728.x;
  Abstract via Crossref). → 602
- **F25** – **Herleitung DE/IT:** Die Ziffernnamen 0–9 haben im Deutschen **11 Silben** (null … neun; nur „sieben“
  zweisilbig), im Italienischen **18** (zero … nove). Nach F23/F24 ist eine etwas kleinere Spanne beim inneren
  Mitsprechen auf Italienisch zu *erwarten*. Für DE vs. IT nicht direkt untersucht; nur Vergleiche innerhalb einer
  Sprache sind fair. → 602
- **F26** – Neuroanatomie der Schleife (PET): Der phonologische Speicher liegt im **linken Gyrus supramarginalis**, das
  subvokale Rehearsal im **Broca-Areal**; Reize waren visuell dargeboten (Paulesu et al., 1993,
  https://doi.org/10.1038/362342a0; PM). → 602, 604, 606
- **F27** – Die Zahlenspanne misst auch gelernte Ziffernfolgen. Der Vorteil von Ziffern gegenüber anderem verbalem
  Material kommt aus ihrer Häufigkeit in der Sprache; häufige Ziffernfolgen werden besser erinnert (Jones & Macken,
  2015, https://doi.org/10.1016/j.cognition.2015.07.009; PM). → 602
- **F28** – „Visuospatial bootstrapping“: Ziffern, die zusätzlich im **vertrauten Tastenfeld-Layout** gezeigt werden,
  werden besser behalten. Dafür muss das Layout im Langzeitgedächtnis bekannt sein (Darling et al., 2012,
  https://doi.org/10.3758/s13423-011-0197-3; PM). → 602 (Tastenfeld-Layout Telefon 1-2-3 oben vs. Rechner 7-8-9 oben
  beachten; **Herleitung**)
- **F29** – Häufige Wörter werden besser behalten, unabhängig vom Sprechtempo; der Effekt wächst über die seriellen
  Positionen (Hulme et al., 1997, https://doi.org/10.1037/0278-7393.23.5.1217; PM). → 606
- **F30** – Konkrete, gut vorstellbare Wörter werden besser erinnert als abstrakte (Fliessbach et al., 2006,
  https://doi.org/10.1016/j.neuroimage.2006.06.007; PM). Dazu passt Paivios duale Kodierung (Paivio, 1991,
  https://doi.org/10.1037/h0084295; nur CR). → 606 (Wortlisten nach Häufigkeit, Konkretheit und Länge je Sprache
  abgleichen)
- **F31** – Zweitsprache: Weniger versierte Sprecher:innen haben in der L2 eine **niedrigere** AG-Spanne als in der
  L1, hochkompetente nicht (Service et al., 2002, https://doi.org/10.1080/09541440143000140; SEK). → 606 (englische
  Wortliste!), 604
- **F32** – Freies Erinnern ergibt eine U-Kurve mit Recency über etwa die **letzten 8 Positionen**, auch bei Listen bis
  40 Wörter (Murdock, 1962, https://doi.org/10.1037/h0045106; SEK). → 606
- **F33** – Nach **10 s** Ablenkung (Zählen) ist der Recency-Gipfel großteils, nach **30 s** ganz verschwunden; der
  Primacy-Effekt bleibt. Langsameres Tempo hebt Primacy, nicht Recency (Glanzer & Cunitz, 1966,
  https://doi.org/10.1016/S0022-5371(66)80044-0; SEK). → 606
- **F34** – Semantische Verarbeitung („passt das Wort in den Satz?“) führt zu deutlich besserem Behalten als Reim- oder
  Schriftbildfragen (Craik & Tulving, 1975, https://doi.org/10.1037/0096-3445.104.3.268; 10 Experimente; SEK). → 606
- **F35** – Modalität: Gehörte Items bekommen einen **akustischen** Code, gelesene nicht; daher stammen die
  Modalitätseffekte (Penney, 1989, https://doi.org/10.3758/BF03202613; PM). Ein „echoischer“ Recency-Vorteil gilt also
  nicht für Bildschirmwörter. → 606, 602
- **F36** – Verbaler Lerntest nach Rey (N = 1.855, 24–81 J.; Van der Elst et al., 2005,
  https://doi.org/10.1017/S1355617705050344; PM):
  - Die Leistung sinkt **schon früh** mit dem Alter.
  - Frauen und höher Gebildete schneiden über das ganze Alter besser ab.
  - **Vorgelesen** ist Durchgang 1 besser, **gelesen** sind spätere Durchgänge besser.
  - → 606
- **F37** – Stille Lesegeschwindigkeit Erwachsener (Englisch, 190 Studien, 18.573 Personen): **238 Wörter/min**
  (Sachtext), 260 (Belletristik), laut 183 (Brysbaert, 2019, https://doi.org/10.1016/j.jml.2019.104047; SEK).
  **Herleitung:** ≈ 250 ms pro Wort reines Lesen. Die Merkphase muss für Leseschwächere deutlich länger sein. → 606

### B4 Arbeitsgedächtnis-Aktualisierung (N-Back) und exekutive Funktionen

- **F38** – Metaanalyse von 24 fMRT-Studien (668 Koordinaten): N-Back aktiviert robust
  - den lateralen prämotorischen Kortex,
  - den dorsalen Gyrus cinguli bzw. medialen prämotorischen Kortex,
  - den **dorsolateralen und ventrolateralen PFC** und die Frontalpole,
  - den **medialen und lateralen posterioren Parietalkortex**
  (Owen et al., 2005, https://doi.org/10.1002/hbm.20131; PM). → 604
- **F39** – Lures (Wiederholung 1 Schritt zu früh) erzeugen bei 2- und 3-Back mehr Fehlalarme. N-Back fordert also
  **Kontrolle über Vertrautheit**, also Hemmung. N-Back und Operation Span korrelieren nur schwach; beide erklären
  unabhängige Varianz der fluiden Intelligenz (Kane et al., 2007, https://doi.org/10.1037/0278-7393.33.3.615; PM). → 604
- **F40** – Metaanalyse: Complex Span und N-Back korrelieren mit **r+ = .20** (95 %-KI .16–.24), einfache Spanne und
  N-Back mit **r+ = .25**. Die Aufgaben sind nicht austauschbar (Redick & Lindsey, 2013,
  https://doi.org/10.3758/s13423-013-0453-9; VT). → 604
- **F41** – N-Back taugt **nicht als Maß individueller AG-Unterschiede**, u. a. wegen unzureichender Reliabilität. Bei
  hoher Last sagt es aber fluide Intelligenz vorher (Jaeggi et al., 2010, https://doi.org/10.1080/09658211003702171; PM). → 604
- **F42** – Test-Retest-Reliabilität der Genauigkeit im räumlichen N-Back (Studierende): **r = .49 / .54 / .73** für
  1-/2-/3-Back; Reaktionszeiten hoch reliabel (Hockey & Geffen, 2004, https://doi.org/10.1016/j.intell.2004.07.009; SEK). → 604
- **F43** – Exekutive Funktionen: Wechseln, **Aktualisieren** und Hemmen sind mäßig korreliert, aber klar trennbar
  („unity and diversity“; n = 137). Operation Span hängt mit dem Aktualisieren zusammen (Miyake et al., 2000,
  https://doi.org/10.1006/cogp.1999.0734; PM). Kern-EF nach Diamond (2013,
  https://doi.org/10.1146/annurev-psych-113011-143750; PM): Hemmung, Arbeitsgedächtnis, kognitive Flexibilität; Stress,
  Schlafmangel, Einsamkeit und Bewegungsmangel beeinträchtigen sie. → 604
- **F44** – Kirchner (1958): Lichtfeld, Grundtakt **1,5 s**; ältere Personen fielen früher ab und machten mehr
  Auslassungen (https://doi.org/10.1037/h0043688; SEK). → 604 (Ursprung, **keine Norm**)

### B5 Objekt-Ort-Gedächtnis und Bindung

- **F45** – Objekt-Ort-Gedächtnis besteht aus Objektverarbeitung, Ortsverarbeitung und **Objekt-Ort-Bindung** (Postma
  et al., 2008, https://doi.org/10.1016/j.neubiorev.2008.05.001; PM):
  - Die Objektidentität stützt sich auf ein überwiegend beidseitiges ventrales Netz.
  - Ein links frontoparietaler Kreis dient kategorialen, ein rechts frontoparietaler koordinatengenauen Positionen.
  - **Medialer Temporallappen bzw. Hippocampus** sind für die Bindung wesentlich.
  - → 605
- **F46** – Klassischer Läsionsbefund: Der rechte Hippocampus ist am Erinnern räumlicher Orte beteiligt (Smith &
  Milner, 1981, https://doi.org/10.1016/0028-3932(81)90090-7; nur Titel/CR). → 605
- **F47** – Geschlecht (36 Studien, 123 Effektstärken): Beim Objekt-Ort-Gedächtnis gibt es einen Frauenvorteil **ab
  13 Jahren** für die meisten Objektarten. Bei „maskulinen“ Objekten und Distanzmaßen liegen Männer vorn (Voyer et al.,
  2007, https://doi.org/10.3758/BF03194024; PM). → 605 (Normvergleiche vermeiden)
- **F48** – Alter (90 Studien, 3.197 Jüngere, 3.192 Ältere): Das **Assoziations- bzw. Bindungsdefizit** ist größer als
  das für einzelne Items, auch für **räumliche Orte** und zeitliche Reihenfolge. Es ist ausgeprägt beim absichtlichen
  Lernen (Old & Naveh-Benjamin, 2008, https://doi.org/10.1037/0882-7974.23.1.104; PM). → 605, 601, 607
- **F49** – Blick beim Abruf: Mit Blick zur ursprünglichen Objektposition gelingt das Erinnern besser als mit
  Zentralfixation oder Blick an einen falschen Ort. Räumliche Beziehungen sind stärker betroffen als Objektmerkmale
  (Johansson & Johansson, 2014, https://doi.org/10.1177/0956797613498260; PM). → 605, 603, 607
- **F50** – CANTAB PAL, ein klinischer visuell-räumlicher Lerntest: Kombiniert mit einem Benenntest sagte er bei 43
  Personen mit „fraglicher Demenz“ die spätere Alzheimer-Diagnose vorher; 11 erkrankten innerhalb von 32 Monaten
  (Blackwell et al., 2004, https://doi.org/10.1159/000074081; PM). → 605: **Diagnostiktest, nicht mit dem Spiel
  vergleichbar; keine Anmutung von Demenz-Screening**

### B6 Blickmotorik, Optik und Sehbedingungen

- **F51** – **Augenbewegungen in der Behaltensphase stören das Ortsgedächtnis**, nicht das Formgedächtnis. Entscheidend
  ist die Blicksteuerung, nicht die Bewegung an sich (Postle et al., 2006, https://doi.org/10.1080/17470210500151410;
  PM). Gleichzeitige Augenbewegungen verringern die räumliche Sequenzspanne **stärker** als Arm- oder
  Handbewegungen oder verdeckte Aufmerksamkeitswechsel (Pearson & Sahraie, 2003,
  https://doi.org/10.1080/02724980343000044; PM). → 607, 601, 603, 605
- **F52** – Blickkennwerte (Rayner, 1998, https://doi.org/10.1037/0033-2909.124.3.372; VT, Tabelle 1):
  - mittlere Fixationsdauer: Lesen 225 ms, visuelle Suche 275 ms, Szenenbetrachtung 330 ms;
  - Sakkadenlatenz mindestens 150–175 ms;
  - Sakkadendauer ≈ 30 ms (2°) bzw. 40–50 ms (5°).
  - **Herleitung:** In einem Einprägefenster von 1,5 s sind nur ≈ 4–5 Fixationen möglich (1500/330). Mehr Objekte als
    Fixationen müssen parafoveal erfasst werden. → 603, 605
- **F53** – Crowding: Die kritische Abstandsgrenze beträgt etwa **0,5 × Exzentrizität** (Bouma, 1970,
  https://doi.org/10.1038/226177a0; CR; Pelli & Tillman, 2008, aus Dok. 03). **Herleitung (605):**
  - 7×7-Raster, 14 cm breit, bei 40 cm Abstand: Zellabstand ≈ 2,9°, äußere Spalte ≈ 8,5° exzentrisch, kritischer
    Abstand ≈ 4,3° > 2,9°. Emojis am Rand sind bei Zentralfixation also nicht sicher erkennbar.
  - 3×3-Raster: Zellabstand ≈ 6,7°, kein Crowding.
  - Für beleuchtete Felder ohne Identität (603, 607) ist das weniger kritisch.
- **F54** – **Herleitung Sehwinkel** (Formel 2·atan(s/2d)), Raster 14 cm auf einem 10,9″-Tablet (Anzeige ≈ 22,7 × 15,8 cm):
  - bei 40 cm: gesamt ≈ 19,9°; Zelle 3×3 ≈ 6,7°, 5×5 ≈ 4,0°, 7×7 ≈ 2,9°;
  - Smartphone, 6,5 cm bei 33 cm: gesamt ≈ 11,2°; 7×7-Zelle ≈ 0,93 cm ≈ 1,6°.
  - Die Reize sind also groß, **Sehschärfe ist selten limitierend**; die Tippgröße ist es am Smartphone schon (F66).
- **F55** – Das Gesichtsfeld umfasst horizontal ≈ 200° (Strasburger et al., 2011, aus Dok. 01). Ein Tablet belegt bei
  40 cm nur ≈ ±16°, es fordert also nur die nahe Peripherie (Herleitung Dok. 01). → 603, 605, 607
- **F56** – Alterssichtigkeit: Die Akkommodationsbreite nimmt ab der späten Kindheit stetig ab. Tempo und Genauigkeit
  bleiben bis ≈ **40 Jahre** erhalten; dann reicht die Breite für normale Naharbeit nicht mehr (Charman, 2008,
  https://doi.org/10.1111/j.1444-0938.2008.00256.x; PM). → alle (Tablet in 30–40 cm)
- **F57** – Sehabstand am Smartphone (Italien, N = 217): Nicht-Presbyope **33,4 ± 7,6 cm**, Presbyope **39,7 ± 6,3 cm**
  (Boccardo et al., 2023, aus Dok. 02). → alle
- **F58** – Gleitsichtgläser (Sheedy, 2004, https://doi.org/10.1016/S1529-1839(04)70021-4; Sheedy et al., 2005,
  https://doi.org/10.1097/01.opx.0000181266.60785.c9; PM):
  - 28 marktübliche Gläser unterschieden sich in den Zonenbreiten meist um **mehr als das Doppelte**.
  - Nach dem Minkwitz-Theorem ändert sich der Astigmatismus quer zum Progressionskanal doppelt so schnell wie die
    Wirkung entlang des Kanals. Unerwünschter Astigmatismus lässt sich umverteilen, **nicht beseitigen**.
  - **Herleitung:** Bei großen Rastern (±10° am Tablet) liegen Randfelder durch den Nahteil seitlich unscharf; man
    muss den Kopf statt der Augen bewegen. Arbeitsplatz- oder Nahbrille kann hier Vorteile haben (Beratungshinweis,
    kein Versprechen). → 603, 605, 607, 606
- **F59** – Lidschlag: entspannt **22 ± 9/min**, beim Buchlesen 10 ± 6/min, **am Bildschirm 7 ± 7/min** (104
  Büroangestellte; Tsubota & Nakamori, 1993, https://doi.org/10.1056/NEJM199302253280817; SEK). Digitale
  Augenbelastung betrifft vermutlich **≥ 50 %** der Computernutzer:innen. Sie hat Akkommodations- bzw.
  Binokularsymptome und Trockenheitssymptome (Sheppard & Wolffsohn, 2018, https://doi.org/10.1136/bmjophth-2018-000146;
  PM). → alle (kurze Runden sind günstig)
- **F60** – Schriftgröße: Flüssiges Lesen gelingt bei x-Höhen von ≈ 0,2° bis 2° (Legge & Bigelow, 2011, aus Dok. 04).
  Die kritische Schriftgröße steigt ab ≈ 40 Jahren und deutlich nach 68 (Calabrèse et al., 2016, aus Dok. 04). → 606,
  604 (Buchstaben), 602
- **F61** – Rot-Grün-Farbsehschwäche: **≈ 8 % der Männer, ≈ 0,4 % der Frauen** (Europa; Birch, 2012, aus Dok. 01).
  Die Farbunterscheidung nimmt ab ≈ 60 beschleunigt ab, v. a. auf der Blau-Gelb-Achse (Paramei & Oakley, 2014, aus
  Dok. 04). Nach WCAG 2.2, SC 1.4.1, darf Farbe nicht das einzige Mittel der Information sein (W3C, 2024, aus Dok. 01). → 601, 605
- **F62** – **Herleitung 601:** Die Senso-Palette (Rot, Orange, Grün, Gelb, Blau, Lila; 0.3) enthält für Protan- und
  Deutan-Typen verwechselbare Paare (Rot/Orange/Grün; Blau/Lila bei geschwächtem Rotkanal). Prüfen lässt sich das per
  Simulation (Machado et al., 2009, https://doi.org/10.1109/TVCG.2009.113; CR). Sind die Felder fest angeordnet, trägt
  der **Ort** die Information mit, und die Aufgabe bleibt lösbar. → 601
- **F63** – Photosensitivität: Am stärksten provozierend sind **15–25 Hz**, wirksam ist der Bereich 1–65 Hz; **Rot**
  ist ein zusätzlicher Faktor (Fisher et al., 2005, aus Dok. 03). WCAG 2.2, SC 2.3.1: höchstens **3 Blitze pro
  Sekunde** oder unter der Blitzschwelle (aus Dok. 03). → 601 (farbige Aufleuchtfelder, v. a. Rot), 603, 607
  (aufleuchtende Felder; bei ≈ 2 Hz Schrittfolge unkritisch – Herleitung, im Code prüfen)

### B7 Motorik und Gerät

- **F64** – Touch-Web-App mit Roboter-Messung: Reaktionszeiten **immer zu lang** gemessen, iPhone +57,6–58,0 ms,
  Galaxy +66,1–69,8 ms; Streuung innerhalb eines Geräts ≈ 7 ms (Pronk et al., 2020, aus Dok. 01). Die ms-Angaben der
  Tabellen („Klicktakt“, „Zielsuche < 500 ms“) sind deshalb geräteabhängig. → alle
- **F65** – Einfache Reaktionszeit (kalibriert): 231 ms bzw. 213 ms ohne Hardware-Verzögerung; +0,55 ms pro
  Lebensjahr, v. a. durch langsamere Motorik; Entdeckung 131 ms, altersunabhängig (Woods et al., 2015; PM). → alle
  (nur als RT-Kontext)
- **F66** – Touch-Ziele: **9,2 mm** (Einzelziele) bzw. 9,6 mm (Serien) mit dem Daumen (Parhi et al., 2006, aus Dok. 02).
  WCAG 2.2 SC 2.5.8 fordert ≥ 24 × 24 CSS-px, SC 2.5.5 ≥ 44 × 44 CSS-px (aus Dok. 02). **Herleitung:** Eine
  7×7-Zelle am Smartphone ≈ 9,3 mm liegt an der Grenze; am Tablet ≈ 20 mm ist das unproblematisch. → 603, 605, 607, 601
- **F67** – Eine 1-up/1-down-Treppe konvergiert auf den **50-%-Punkt** (Levitt, 1971, aus Dok. 01). Die „adaptive
  Spanne“ ist also die Länge mit ≈ 50 % Erfolg, nicht die WAIS-Spanne (längste fehlerfreie Länge bei 2 Versuchen je
  Länge, **Herleitung**). → 602, 606, 601

### B8 Altersverlauf und Einflussfaktoren

- **F68** – Visuelles AG (N = 55.753, 8–75 J.; Brockmole & Logie, 2013, https://doi.org/10.3389/fpsyg.2013.00012; VT):
  - **Gipfel mit ≈ 20 Jahren**, danach steiler linearer Abfall; **mit 55 schlechter als 8- bis 9-Jährige**.
  - Das liegt vor allem an der Kapazität: Richtig gebundene Merkmale 85 % mit 20 vs. 82 % mit 75.
  - Die Autoren verweisen darauf, dass die **Zahlenspanne** zwischen 20 und 65 Jahren nicht abnahm (dort zitiert; SEK).
  - → 601, 603, 605, 607 vs. 602
- **F69** – Online-Stichproben (≈ 10.000 je Aufgabe): **Zahlenspanne und visuelles AG erreichten ihren Gipfel um
  ≈ 30 Jahre**, das Zahlen-Symbol-Tempo früher, der Wortschatz später (Hartshorne & Germine, 2015,
  https://doi.org/10.1177/0956797614567339; VT). → alle
- **F70** – 345 Erwachsene (Park et al., 2002, https://doi.org/10.1037/0882-7974.17.2.299; PM):
  - Ab den **20ern** nehmen Tempo, Arbeitsgedächtnis und Langzeitgedächtnis kontinuierlich ab; Wortwissen nimmt zu.
  - Visuell-räumliches und verbales AG sind getrennte, aber eng verbundene Systeme.
  - → alle
- **F71** – Metaanalyse verbaler Spannen: Alterseffekte in allen 8 Aufgaben, aufsteigend von **einfacher Speicherspanne
  < Zahlenspanne rückwärts < Arbeitsgedächtnisspanne** (Bopp & Verhaeghen, 2005, https://doi.org/10.1093/geronb/60.5.P223;
  PM). → 602, 604
- **F72** – Kinder 4–15 J.: Ab **6 Jahren** passt ein Drei-Faktoren-Modell nach Baddeley & Hitch. Alle Komponenten
  wachsen bis in die Jugend etwa linear (Gathercole et al., 2004, https://doi.org/10.1037/0012-1649.40.2.177; PM). → alle
  (`kinder_unter_6`)
- **F73** – Kurzzeitiger Schlafentzug (< 48 h; 70 Artikel, 147 Tests; Lim & Dinges, 2010,
  https://doi.org/10.1037/a0018883; PM):
  - Effekte von g = −0,125 (Schlussfolgern, n. s.) bis g = −0,776 (Aussetzer bei einfacher Aufmerksamkeit);
  - Arbeitsgedächtnis und Kurzzeitgedächtnis gehören zu den betroffenen Bereichen.
  - → alle

### B9 Messzuverlässigkeit und Übungseffekte beim Testen

- **F74** – Verbale AG-Spannen (139 Personen, 18–80+ J., Abstand ≈ 6 Wochen; Waters & Caplan, 2003,
  https://doi.org/10.3758/BF03195534; PM):
  - Test-Retest-Korrelationen **.52–.81**.
  - Die Einteilung in Spannen-Gruppen nach *einem* Test war zwischen den Sitzungen **sehr instabil**; Kombi-Werte
    waren stabiler.
  - → 602, 604, 606
- **F75** – VWM-Kapazität (Change Detection; Xu et al., 2018, https://doi.org/10.3758/s13428-017-0886-6; PM):
  - Mit 540 Durchgängen ist die Reliabilität α > .9.
  - Über 31 Sitzungen blieben die Rangfolgen trotz Übung stabil (mittleres r = .76 zwischen Sitzungen).
  - **Herleitung:** 45-s-Runden mit wenigen Durchgängen sind viel unzuverlässiger. → 603, 605, 601
- **F76** – Übungseffekte (≈ 1.600 Effektstärken) steigen bei Testwiederholung. Wie stark, hängt von Parallelformen,
  Alter, Diagnose und Abstand ab (Calamia et al., 2012, aus Dok. 04). **Nur Selbstvergleich auf demselben Gerät ist
  sinnvoll.** → alle

### B10 Trainierbarkeit und Transfer

- **F77** – Online-Gehirntraining (N = 11.430, 18–60 J., 6 Wochen; Owen et al., 2010,
  https://doi.org/10.1038/nature09042; PM+VT):
  - Verbesserung in **jeder trainierten Aufgabe**, **kein Transfer** auf untrainierte, selbst eng verwandte Aufgaben.
  - Die Vergleichstests waren: Schlussfolgern, **verbales KZG**, **räumliches AG** und **Paar-Assoziationslernen**.
  - Beim verbalen KZG und beim Paar-Assoziationslernen verbesserte sich die **Kontrollgruppe numerisch am stärksten**.
  - → alle
- **F78** – Metaanalysen zum AG-Training:
  - Melby-Lervåg & Hulme (2013, https://doi.org/10.1037/a0028228; PM), 23 Studien, 30 Vergleiche: kurzfristige
    AG-Verbesserungen; verbal nicht anhaltend, visuell-räumlich eventuell anhaltend; **keine Generalisierung**.
  - Melby-Lervåg, Redick & Hulme (2016, https://doi.org/10.1177/1745691616635612; PM), 87 Publikationen, 145
    Vergleiche: nahe bzw. mittlere Übertragung auf AG-Maße ja. **Ferner Transfer** (nonverbale und verbale Fähigkeit,
    Lesen, Rechnen) gegen behandelte Kontrollgruppen: **keiner**. Die Studien mit behandelten Kontrollgruppen haben
    laut Publikationsbias-Analyse keinen Beweiswert.
  - → alle
- **F79** – N-Back-Training (Soveri et al., 2017, https://doi.org/10.3758/s13423-016-1217-0; VT/Preprint):
  - 33 RCTs, 203 Effektstärken, gesunde Erwachsene.
  - Transfer auf **untrainierte N-Back-Aufgaben g = 0,62** [0,44; 0,81], auf andere AG-Aufgaben g = 0,24, auf
    kognitive Kontrolle g = 0,16, auf fluide Intelligenz **g = 0,16** [0,08; 0,24].
  - Keine Moderation durch Alter, Trainingsdosis oder einfach vs. dual.
  - g = 0,2 entspricht ≈ 1 % erklärter Varianz.
  - → 604
- **F80** – N-Back → fluide Intelligenz:
  - Au et al. (2015, https://doi.org/10.3758/s13423-014-0699-x; PM): 20 Studien, 18–50 J., kleiner signifikanter
    Effekt **g = 0,24** (Zahl laut Soveri et al., 2017, VT).
  - Melby-Lervåg & Hulme (2016, https://doi.org/10.3758/s13423-015-0862-z; PM): Der Effekt hänge an unbehandelten
    Kontrollgruppen und der Berechnungsweise.
  - Au et al. (2016, https://doi.org/10.3758/s13423-015-0967-4; CR) antworteten darauf.
  - Redick et al. (2013, https://doi.org/10.1037/a0029082; PM): 20 Sitzungen adaptives Dual-N-Back vs. aktives
    Placebo (visuelle Suche) vs. keine Behandlung; **kein Transfer** auf irgendeinen Fähigkeitstest, trotz hoher
    Teststärke.
  - Jaeggi et al. (2008, https://doi.org/10.1073/pnas.0801268105; PM) berichteten einen dosisabhängigen Gf-Zuwachs.
    Kritik: BOMAT mit 10 statt 45 min und uneinheitliche Tests (Moody, 2009, https://doi.org/10.1016/j.intell.2009.04.005;
    SEK).
  - → 604
- **F81** – Übertragung nur bei gleicher Aufgabenstruktur: Substanzieller Transfer tritt auf, wenn Trainings- und
  Testaufgabe dasselbe Paradigma teilen (serielles Erinnern, Complex Span, Rückwärtsspanne). Beim **verbalen**
  seriellen Erinnern ist er schwächer als beim **visuell-räumlichen** (Gathercole et al., 2019,
  https://doi.org/10.1016/j.jml.2018.10.003; PM). → 601, 607 (eher naher Transfer) vs. 602
- **F82** – Zielgruppen:
  - **Ältere** (> 60 J.; 49 Artikel, 61 Stichproben): signifikante Effekte in der trainierten Aufgabe und bei nahem
    Transfer, ferner Transfer kleiner; adaptiv nicht besser als nicht-adaptiv; kein Zusammenhang mit der Trainingszeit
    (Karbach & Verhaeghen, 2014, https://doi.org/10.1177/0956797614548725; PM; Kritik: Melby-Lervåg & Hulme, 2016).
  - Ältere, 27 Experimente, 1.130 Personen: kleine, anhaltende Gewinne in AG-Aufgaben; Schlussfolgern sehr klein und
    nur marginal (Teixeira-Santos et al., 2019, https://doi.org/10.1016/j.neubiorev.2019.05.009; PM).
  - **Kinder** (41 Studien, 393 Effekte, N = 2.375): kleiner bis mittlerer naher Transfer, proportional zur
    Ähnlichkeit der Aufgaben; ferner Transfer und Schulleistung mit aktiven Kontrollen ≈ 0 (Sala & Gobet, 2020,
    https://doi.org/10.3758/s13423-019-01681-y; PM).
  - → alle
- **F83** – Strategie- statt Kapazitätstraining:
  - Ericsson et al. (1980, https://doi.org/10.1126/science.7375930; PM): Nach > 230 h Übung stieg die Zahlenspanne
    einer Person von **7 auf 79 Ziffern**, durch ein Mnemonik-System. Für Konsonanten verbesserte sie sich laut
    Sekundärdarstellungen nicht (SEK).
  - Verhaeghen et al. (1992, https://doi.org/10.1037/0882-7974.7.2.242; PM), Ältere ≥ 60: Mnemonik-Training
    **0,73 SD** Vorher-nachher-Gewinn (k = 49) vs. Kontrolle 0,38 und Placebo 0,37.
  - Dresler et al. (2017, https://doi.org/10.1016/j.neuron.2017.02.003; VT): Gedächtnissportler behielten 70,8 von 72
    Wörtern, Kontrollpersonen 39,9. **40 × 30 min** Loci-Training verbesserte das Wortlernen stärker als
    **N-Back-Training** (aktive Kontrolle) und keine Behandlung, noch nach 4 Monaten; 51 Männer, Ø 24 J.
  - → 602, 606 (Strategien sind gut übbar, aber aufgabenspezifisch)
- **F84** – Kritische Gesamtschau „Brain Training“: viel Evidenz für die geübte, wenig für entfernte Aufgaben und den
  Alltag (Simons et al., 2016, aus Dok. 01). Metaanalysen zeigen **minimale** Wirkung auf allgemeine Kognition (Sala &
  Gobet, 2019, aus Dok. 01). → alle

### B11 Klinische Bezüge (nur für Vorsicht-/Auswahlhinweise, keine Diagnose)

- **F85** – ADHS (Kinder, 26 Studien): AG-Defizite mit Effektstärke **0,85** für räumliche Speicherung, **1,06** für
  räumliche exekutive Anteile, 0,47 für verbale Speicherung und 0,43 für verbale exekutive Anteile (Martinussen et al.,
  2005, https://doi.org/10.1097/01.chi.0000153228.72591.73; PM). → `aufmerksamkeitsprobleme` (Frust, Lesefehler)
- **F86** – Kognitives Training bei ADHS (16 RCTs, 759 Kinder; Cortese et al., 2015,
  https://doi.org/10.1016/j.jaac.2014.12.010; PM):
  - AG-Tests verbesserten sich (SMD 0,52 verbal, 0,47 visuell).
  - Die ADHS-Symptome nach Urteil wahrscheinlich verblindeter Beurteiler kaum (alle Trainings: SMD 0,20).
  - **AG-Training speziell: keine Wirkung auf ADHS-Symptome.**
  - → keine Heilversprechen
- **F87** – Lese- und Rechtschreibschwäche (578 Effektstärken): KZG-Nachteil **d ≈ −0,61**, AG **d ≈ −0,67**, besonders
  bei Phonemen und Ziffernfolgen (Swanson et al., 2009, https://doi.org/10.1177/0022219409331958; PM). →
  `lese_rechtschreib_schwaeche` bei 602, 606 (und 604 mit Buchstaben)

---

## C) Evidenz-Zusammenfassung (für die Felder `evidenz`, `vorsicht_bei` und das Profil)

### C1 Übergreifend

- **Übungseffekt (in der Aufgabe selbst): stark.** Alle trainierten Aufgaben verbessern sich (F77); das gilt auch für
  Spannen mit Strategien (F83) und N-Back (F79). Achtung: Teile davon sind Gewöhnung an Gerät und Aufgabe (F76).
- **Naher Transfer:** abhängig von der **Ähnlichkeit** (F79, F81, F82):
  - N-Back → anderes N-Back mittel (g ≈ 0,6), → andere AG-Aufgaben klein (g ≈ 0,24).
  - Serielle visuell-räumliche Aufgaben übertragen sich eher auf ähnliche Paradigmen als verbale (F81).
  - Nach 3–6 Monaten ist der Effekt oft kleiner (F78).
- **Ferner Transfer und Alltag: fehlend bzw. nicht belegt.** Mit aktiven Kontrollgruppen verschwinden die Effekte
  (F78, F80, F82 Kinder, F84). Jaeggi et al. (2008) sind nicht repliziert (F80). Strategietraining (Mnemonik) wirkt in
  Lernaufgaben, aber aufgabenspezifisch (F83).
- **Messung:** Die Kurzrunden (45–60 s) liefern **wenige Durchgänge**. Reliabilität und Rangfolge sind unsicher (F74,
  F75, F41, F42). Touch-Latenz verfälscht ms-Angaben (F64). Normen sind wegen Sprache (F24, F25, F31), Durchführung
  (F18) und Gerät nicht übertragbar. → **nur Selbstvergleich, keine Perzentile, keine IQ- oder WAIS-Bezüge.**
- **Alter:** Das visuelle bzw. räumliche AG nimmt ab etwa 20–30 Jahren deutlich ab (F68–F70). Die verbale Vorwärtsspanne
  ist robuster (F68, F71), rückwärts und AG-Spannen sind altersempfindlicher (F71). Die Bindung von Objekt und Ort
  leidet im Alter besonders (F48). → Altersvergleiche in der Anzeige vermeiden; Startniveau niedrig wählen.

### C2 Vorschläge je Übung (von den Autor:innen am Code zu bestätigen)

| Nr. | Kern (Wert 3) laut Literatur | Evidenz-Vorschlag (Übung / nah / Alltag) | Wichtige Vorsicht-Schlüssel und Gründe |
|---|---|---|---|
| 601 Senso | `kurzzeitgedaechtnis_visuell_raeumlich`; bei festen Feldpositionen ist die Aufgabe Corsi-ähnlich (Sequenz aus Orten), sonst stärker Farbgedächtnis | stark / schwach–mittel (ähnliche Sequenzaufgaben; F81) / fehlend | `farbsehschwaeche` (Palette mit Rot/Orange/Grün, Blau/Lila; F61, F62); `photosensitive_epilepsie` und `migraene_lichtempfindlich` (aufleuchtende Farbfelder inkl. Rot, Taktung im Code prüfen; F63); Hörbeeinträchtigung: Töne sind nur ergänzend (kein Schlüssel) |
| 602 Zahlenspanne | `kurzzeitgedaechtnis_verbal` (vorwärts); `arbeitsgedaechtnis` nur, falls rückwärts vorkommt (Code) | stark / schwach (verbales serielles Erinnern überträgt sich wenig; F81) / fehlend | `lese_rechtschreib_schwaeche` (F87); `sprachabhaengigkeit` 1–2 (Silbenlänge DE < IT; F25); `aufmerksamkeitsprobleme` (F85) |
| 603 Raster | `kurzzeitgedaechtnis_visuell_raeumlich` (statisch, „Visual Cache“; F10–F13) | stark / schwach–mittel / fehlend | `gesichtsfeldausfall` (Randfelder bei großen Rastern; F55); `presbyopie_gleitsicht` (seitliche Unschärfe bei ±10°; F58); Aufleuchten → Photosensitivität gering (F63) |
| 604 N-Back | `arbeitsgedaechtnis` (Aktualisierung), dazu `inhibition` 1–2 (Lures; F39), `daueraufmerksamkeit` | stark / mittel nur für N-Back-ähnliche, klein für andere AG-Aufgaben (F79) / fehlend (F78, F80) | `aufmerksamkeitsprobleme`; `lese_rechtschreib_schwaeche`, falls Buchstaben (F87); `kognitive_einschraenkung` (Frust bei 3-Back-Start); Zeitdruck durch Reizfenster 2.000 → 1.200 ms (laut Seite) |
| 605 Objekt-Ort | `kurzzeitgedaechtnis_visuell_raeumlich` plus Bindung (F45, F48); visuelle Suche und Detail nachrangig | stark / schwach–unklar (in Owen et al., 2010 kein Transfer auf Paar-Assoziationslernen; F77) / fehlend | `sehbehinderung_niedriger_visus` (Emoji-Details, Crowding; F53); `presbyopie_gleitsicht`; `farbsehschwaeche` gering (Emojis sind auch über die Form unterscheidbar); `kognitive_einschraenkung`; **keine Demenz-Anmutung** (F50) |
| 606 Wortliste | `kurzzeitgedaechtnis_verbal`, `lesen_sprache` (**englische Wörter** laut Code; F31) | stark (bei Strategien sehr groß; F83) / schwach / fehlend | `lese_rechtschreib_schwaeche` (Lesen und Tippen, F87); `sprachabhaengigkeit` 3; `presbyopie_gleitsicht` und `sehbehinderung_niedriger_visus` (Schriftgröße; F60); `kinder_unter_6` (Lesen) |
| 607 Corsi-Pfad | `kurzzeitgedaechtnis_visuell_raeumlich` (sequenziell, „Inner Scribe“; F15–F17, F51) | stark / mittel (gleiche Paradigmen, visuell-räumliches serielles Erinnern; F81) / fehlend | `gesichtsfeldausfall` bei 7×7; `tremor_parkinson` bzw. `hand_arm_beschwerden` bei kleinen Zellen am Smartphone (F66); Aufleuchten → Photosensitivität gering |

Hinweise für die Profilwerte (Herleitung aus B):

- `stereosehen` = 0 bei allen Übungen.
- `naharbeit_dauer` = 1 bei allen (Runden von 45–60 s).
- `sehschaerfe_detail`: meist 0–1 (Reize ≥ 1,6°, F54); 605 und 606 eher 1–2 wegen Emoji- bzw. Wortdetails am
  Smartphone.
- `farbunterscheidung`: 601 = 2–3 (3, falls die Farbe die einzige Information ist); 605 = 1; 603, 607, 602, 604, 606 = 0.
- `sakkaden` und `fixation`: 603, 605, 607 = 1–2. Laut F51 und F49 helfen ruhige Augen beim Behalten, gezielte Blicke
  beim Abruf.
- `visuelle_verarbeitungsgeschwindigkeit`: 603 und 605 = 2 (1,5 s Einprägen, ≈ 4–5 Fixationen; F52).

### C3 Seriöse Formulierungen (Gesundheitswerbung, EU-MDR)

| Aussage | Seriös? | Beleg |
|---|---|---|
| „Du übst, dir Folgen, Muster oder Wörter kurz zu merken – mit etwas Übung wirst du in dieser Übung besser.“ | ja | F77, F83 |
| „Die Übung beruht auf bekannten Aufgaben aus der Gedächtnisforschung (Corsi, N-Back, Zahlenspanne …).“ | ja | Teil A |
| „Merkstrategien (Gruppieren, Geschichten, Bilder) helfen in solchen Aufgaben deutlich.“ | ja | F12, F34, F83 |
| „Ob sich das auf das Gedächtnis im Alltag überträgt, ist nicht belegt.“ | ja | F78, F84 |
| „Steigert IQ, fluide Intelligenz, Konzentration im Alltag“, „gegen Vergesslichkeit“ | **nein** | F78–F80, F84 |
| „Hilft bei ADHS, LRS, Demenz“, „Gedächtnistest“, „Normwert / Top 1 % / WAIS-Äquivalent“ | **nein** (Heil- bzw. Diagnoseanspruch, keine Datengrundlage) | F50, F86, 0.2 |

---

## D) Literaturliste (nur geprüfte Einträge)

### D1 Von der Website angegebene Quellen (20 verschiedene; + 3 nur im Fließtext geprüft)

- Baddeley, A. (1986). *Working memory* (Oxford Psychology Series No. 11). Clarendon Press / Oxford University Press. ISBN 0-19-852116-2. – **B**, Buch, keine DOI (Angaben laut Open Library).
- Baddeley, A. (2000). The episodic buffer: A new component of working memory? *Trends in Cognitive Sciences*, *4*(11), 417–423. https://doi.org/10.1016/S1364-6613(00)01538-2 – CR ✓, PM.
- Baddeley, A. D., & Hitch, G. (1974). Working memory. In G. H. Bower (Hrsg.), *Psychology of Learning and Motivation* (Bd. 8, S. 47–89). Academic Press. https://doi.org/10.1016/S0079-7421(08)60452-1 – CR ✓ (Bandangabe fehlt in Crossref, Bd. 8 laut Website und Reihe; Herausgeber ergänzt, nicht per Crossref geprüft).
- Corsi, P. M. (1972). *Human memory and the medial temporal region of the brain* [Dissertation, McGill University]. – **B**, Dissertation, keine DOI; in der Corsi-Literatur üblich so zitiert.
- Cowan, N. (2001). The magical number 4 in short-term memory: A reconsideration of mental storage capacity. *Behavioral and Brain Sciences*, *24*(1), 87–114. https://doi.org/10.1017/S0140525X01003922 – CR ✓, PM.
- Craik, F. I. M., & Lockhart, R. S. (1972). Levels of processing: A framework for memory research. *Journal of Verbal Learning and Verbal Behavior*, *11*(6), 671–684. https://doi.org/10.1016/S0022-5371(72)80001-X – CR ✓.
- Della Sala, S., Gray, C., Baddeley, A., Allamano, N., & Wilson, L. (1999). Pattern span: A tool for unwelding visuo-spatial memory. *Neuropsychologia*, *37*(10), 1189–1199. https://doi.org/10.1016/S0028-3932(98)00159-6 – CR ✓, PM (auf 603 nur im Fließtext).
- Diamond, A. (2013). Executive functions. *Annual Review of Psychology*, *64*, 135–168. https://doi.org/10.1146/annurev-psych-113011-143750 – CR ✓, PM.
- Eals, M., & Silverman, I. (1994). The hunter-gatherer theory of spatial sex differences: Proximate factors mediating the female advantage in recall of object arrays. *Ethology and Sociobiology*, *15*(2), 95–105. https://doi.org/10.1016/0162-3095(94)90020-5 – CR ✓ (**Website-Titel leicht falsch**), Inhalt SEK.
- Jaeggi, S. M., Buschkuehl, M., Jonides, J., & Perrig, W. J. (2008). Improving fluid intelligence with training on working memory. *Proceedings of the National Academy of Sciences*, *105*(19), 6829–6833. https://doi.org/10.1073/pnas.0801268105 – CR ✓, PM.
- Kessels, R. P. C., van Zandvoort, M. J. E., Postma, A., Kappelle, L. J., & de Haan, E. H. F. (2000). The Corsi Block-Tapping Task: Standardization and normative data. *Applied Neuropsychology*, *7*(4), 252–258. https://doi.org/10.1207/S15324826AN0704_8 – CR ✓, PM (**Website: falsche DOI und falsche Zeitschrift**).
- Kirchner, W. K. (1958). Age differences in short-term retention of rapidly changing information. *Journal of Experimental Psychology*, *55*(4), 352–358. https://doi.org/10.1037/h0043688 – CR ✓, Inhalt SEK.
- Logie, R. H. (1995). *Visuo-spatial working memory*. Lawrence Erlbaum Associates. ISBN 0-86377-107-6 (laut Rezension, Crossref 10.1002/(SICI)1099-0720(199902)13:1<89::AID-ACP564>3.0.CO;2-K); Neuauflage Psychology Press 2014, https://doi.org/10.4324/9781315804743 – **B**, CR ✓ (Neuauflage).
- Luck, S. J., & Vogel, E. K. (1997). The capacity of visual working memory for features and conjunctions. *Nature*, *390*(6657), 279–281. https://doi.org/10.1038/36846 – CR ✓, PM.
- Miller, G. A. (1956). The magical number seven, plus or minus two: Some limits on our capacity for processing information. *Psychological Review*, *63*(2), 81–97. https://doi.org/10.1037/h0043158 – CR ✓.
- Milner, B. (1971). Interhemispheric differences in the localization of psychological processes in man. *British Medical Bulletin*, *27*(3), 272–277. https://doi.org/10.1093/oxfordjournals.bmb.a070866 – CR ✓ (kein Abstract).
- Murdock, B. B., Jr. (1962). The serial position effect of free recall. *Journal of Experimental Psychology*, *64*(5), 482–488. https://doi.org/10.1037/h0045106 – CR ✓, Inhalt SEK.
- Simon, H. A. (1974). How big is a chunk? *Science*, *183*(4124), 482–488. https://doi.org/10.1126/science.183.4124.482 – CR ✓, PM.
- Tolman, E. C. (1948). Cognitive maps in rats and men. *Psychological Review*, *55*(4), 189–208. https://doi.org/10.1037/h0061626 – CR ✓.
- Tulving, E. (1962). Subjective organization in free recall of "unrelated" words. *Psychological Review*, *69*(4), 344–354. https://doi.org/10.1037/h0043150 – CR ✓.
- Wertheimer, M. (1923). Untersuchungen zur Lehre von der Gestalt. II. *Psychologische Forschung*, *4*(1), 301–350. https://doi.org/10.1007/BF00410640 – CR ✓ (auf 603 nur im Fließtext).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience*, *9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – CR ✓, PM (stützt die Website-Aussagen **nicht**).

Nicht geprüft bzw. nicht prüfbar: Della Sala et al. (1997, VPT-Manual), Wechsler (1939/1955/2008, WAIS-Manuale), Rey
(1958/1964), Ebbinghaus (1885), Baer & Morrison (1978), „Luck & Lockhart (1997)“ (existiert so nicht; Verwechslung).

### D2 Weitere Fachliteratur (neu recherchiert, alle DOI per Crossref aufgelöst)

- Allen, R. J., Baddeley, A. D., & Hitch, G. J. (2006). Is the binding of visual features in working memory resource-demanding? *Journal of Experimental Psychology: General*, *135*(2), 298–313. https://doi.org/10.1037/0096-3445.135.2.298 – CR ✓, PM.
- Alvarez, G. A., & Cavanagh, P. (2004). The capacity of visual short-term memory is set both by visual information load and by number of objects. *Psychological Science*, *15*(2), 106–111. https://doi.org/10.1111/j.0963-7214.2004.01502006.x – CR ✓, PM.
- Au, J., Buschkuehl, M., Duncan, G. J., & Jaeggi, S. M. (2016). There is no convincing evidence that working memory training is NOT effective: A reply to Melby-Lervåg and Hulme (2015). *Psychonomic Bulletin & Review*, *23*(1), 331–337. https://doi.org/10.3758/s13423-015-0967-4 – CR ✓.
- Au, J., Sheehan, E., Tsai, N., Duncan, G. J., Buschkuehl, M., & Jaeggi, S. M. (2015). Improving fluid intelligence with training on working memory: A meta-analysis. *Psychonomic Bulletin & Review*, *22*(2), 366–377. https://doi.org/10.3758/s13423-014-0699-x – CR ✓, PM; g = 0,24 laut Soveri et al. (2017, VT).
- Baddeley, A. D., Thomson, N., & Buchanan, M. (1975). Word length and the structure of short-term memory. *Journal of Verbal Learning and Verbal Behavior*, *14*(6), 575–589. https://doi.org/10.1016/S0022-5371(75)80045-4 – CR ✓, VT.
- Berch, D. B., Krikorian, R., & Huha, E. M. (1998). The Corsi block-tapping task: Methodological and theoretical considerations. *Brain and Cognition*, *38*(3), 317–338. https://doi.org/10.1006/brcg.1998.1039 – CR ✓, PM.
- Blackwell, A. D., Sahakian, B. J., Vesey, R., Semple, J. M., Robbins, T. W., & Hodges, J. R. (2004). Detecting dementia: Novel neuropsychological markers of preclinical Alzheimer's disease. *Dementia and Geriatric Cognitive Disorders*, *17*(1–2), 42–48. https://doi.org/10.1159/000074081 – CR ✓, PM.
- Bopp, K. L., & Verhaeghen, P. (2005). Aging and verbal memory span: A meta-analysis. *The Journals of Gerontology, Series B: Psychological Sciences and Social Sciences*, *60*(5), P223–P233. https://doi.org/10.1093/geronb/60.5.P223 – CR ✓, PM.
- Bouma, H. (1970). Interaction effects in parafoveal letter recognition. *Nature*, *226*(5241), 177–178. https://doi.org/10.1038/226177a0 – CR ✓ (Faustregel 0,5 × Exzentrizität laut Dok. 03).
- Brockmole, J. R., & Logie, R. H. (2013). Age-related change in visual working memory: A study of 55,753 participants aged 8–75. *Frontiers in Psychology*, *4*, 12. https://doi.org/10.3389/fpsyg.2013.00012 – CR ✓, PM, VT.
- Brown, L. A., Forbes, D., & McConnell, J. (2006). Limiting the use of verbal coding in the Visual Patterns Test. *Quarterly Journal of Experimental Psychology*, *59*(7), 1169–1176. https://doi.org/10.1080/17470210600665954 – CR ✓, PM, VT.
- Brysbaert, M. (2019). How many words do we read per minute? A review and meta-analysis of reading rate. *Journal of Memory and Language*, *109*, 104047. https://doi.org/10.1016/j.jml.2019.104047 – CR ✓, Inhalt SEK.
- Charman, W. N. (2008). The eye in focus: Accommodation and presbyopia. *Clinical and Experimental Optometry*, *91*(3), 207–225. https://doi.org/10.1111/j.1444-0938.2008.00256.x – CR ✓, PM.
- Cortese, S., Ferrin, M., Brandeis, D., Buitelaar, J., Daley, D., Dittmann, R. W., Holtmann, M., Santosh, P., Stevenson, J., Stringaris, A., Zuddas, A., & Sonuga-Barke, E. J. S. (2015). Cognitive training for attention-deficit/hyperactivity disorder: Meta-analysis of clinical and neuropsychological outcomes from randomized controlled trials. *Journal of the American Academy of Child & Adolescent Psychiatry*, *54*(3), 164–174. https://doi.org/10.1016/j.jaac.2014.12.010 – CR ✓, PM.
- Couture, M., & Tremblay, S. (2006). Exploring the characteristics of the visuospatial Hebb repetition effect. *Memory & Cognition*, *34*(8), 1720–1729. https://doi.org/10.3758/BF03195933 – CR ✓, PM.
- Cowan, N. (2010). The magical mystery four: How is working memory capacity limited, and why? *Current Directions in Psychological Science*, *19*(1), 51–57. https://doi.org/10.1177/0963721409359277 – CR ✓, PM.
- Craik, F. I. M., & Tulving, E. (1975). Depth of processing and the retention of words in episodic memory. *Journal of Experimental Psychology: General*, *104*(3), 268–294. https://doi.org/10.1037/0096-3445.104.3.268 – CR ✓, Inhalt SEK.
- Darling, S., Allen, R. J., Havelka, J., Campbell, A., & Rattray, E. (2012). Visuospatial bootstrapping: Long-term memory representations are necessary for implicit binding of verbal and visuospatial working memory. *Psychonomic Bulletin & Review*, *19*(2), 258–263. https://doi.org/10.3758/s13423-011-0197-3 – CR ✓, PM.
- Dresler, M., Shirer, W. R., Konrad, B. N., Müller, N. C. J., Wagner, I. C., Fernández, G., Czisch, M., & Greicius, M. D. (2017). Mnemonic training reshapes brain networks to support superior memory. *Neuron*, *93*(5), 1227–1235.e6. https://doi.org/10.1016/j.neuron.2017.02.003 – CR ✓, PM, VT.
- Ellis, N. C., & Hennelly, R. A. (1980). A bilingual word-length effect: Implications for intelligence testing and the relative ease of mental calculation in Welsh and English. *British Journal of Psychology*, *71*(1), 43–51. https://doi.org/10.1111/j.2044-8295.1980.tb02728.x – CR ✓ (Abstract via Crossref).
- Ericsson, K. A., Chase, W. G., & Faloon, S. (1980). Acquisition of a memory skill. *Science*, *208*(4448), 1181–1182. https://doi.org/10.1126/science.7375930 – CR ✓, PM.
- Farrell Pagulayan, K., Busch, R. M., Medina, K. L., Bartok, J. A., & Krikorian, R. (2006). Developmental normative data for the Corsi Block-Tapping task. *Journal of Clinical and Experimental Neuropsychology*, *28*(6), 1043–1052. https://doi.org/10.1080/13803390500350977 – CR ✓, PM.
- Fliessbach, K., Weis, S., Klaver, P., Elger, C. E., & Weber, B. (2006). The effect of word concreteness on recognition memory. *NeuroImage*, *32*(3), 1413–1421. https://doi.org/10.1016/j.neuroimage.2006.06.007 – CR ✓, PM.
- Gathercole, S. E., Dunning, D. L., Holmes, J., & Norris, D. (2019). Working memory training involves learning new skills. *Journal of Memory and Language*, *105*, 19–42. https://doi.org/10.1016/j.jml.2018.10.003 – CR ✓, PM.
- Gathercole, S. E., Pickering, S. J., Ambridge, B., & Wearing, H. (2004). The structure of working memory from 4 to 15 years of age. *Developmental Psychology*, *40*(2), 177–190. https://doi.org/10.1037/0012-1649.40.2.177 – CR ✓, PM.
- Glanzer, M., & Cunitz, A. R. (1966). Two storage mechanisms in free recall. *Journal of Verbal Learning and Verbal Behavior*, *5*(4), 351–360. https://doi.org/10.1016/S0022-5371(66)80044-0 – CR ✓, Inhalt SEK.
- Hartshorne, J. K., & Germine, L. T. (2015). When does cognitive functioning peak? The asynchronous rise and fall of different cognitive abilities across the life span. *Psychological Science*, *26*(4), 433–443. https://doi.org/10.1177/0956797614567339 – CR ✓, PM, VT.
- Hockey, A., & Geffen, G. (2004). The concurrent validity and test–retest reliability of a visuospatial working memory task. *Intelligence*, *32*(6), 591–605. https://doi.org/10.1016/j.intell.2004.07.009 – CR ✓, Inhalt SEK.
- Hulme, C., Roodenrys, S., Schweickert, R., Brown, G. D. A., Martin, S., & Stuart, G. (1997). Word-frequency effects on short-term memory tasks: Evidence for a redintegration process in immediate serial recall. *Journal of Experimental Psychology: Learning, Memory, and Cognition*, *23*(5), 1217–1232. https://doi.org/10.1037/0278-7393.23.5.1217 – CR ✓, PM.
- Jacobs, J. (1887). Experiments on "prehension". *Mind*, *os-12*(45), 75–79. https://doi.org/10.1093/mind/os-12.45.75 – CR ✓ (nur Existenz und Datum; für „erste Zahlenspanne“).
- Jaeggi, S. M., Buschkuehl, M., Perrig, W. J., & Meier, B. (2010). The concurrent validity of the N-back task as a working memory measure. *Memory*, *18*(4), 394–412. https://doi.org/10.1080/09658211003702171 – CR ✓, PM.
- Johansson, R., & Johansson, M. (2014). Look here, eye movements play a functional role in memory retrieval. *Psychological Science*, *25*(1), 236–242. https://doi.org/10.1177/0956797613498260 – CR ✓, PM.
- Jones, G., & Macken, B. (2015). Questioning short-term memory and its measurement: Why digit span measures long-term associative learning. *Cognition*, *144*, 1–13. https://doi.org/10.1016/j.cognition.2015.07.009 – CR ✓, PM.
- Kane, M. J., Conway, A. R. A., Miura, T. K., & Colflesh, G. J. H. (2007). Working memory, attention control, and the N-back task: A question of construct validity. *Journal of Experimental Psychology: Learning, Memory, and Cognition*, *33*(3), 615–622. https://doi.org/10.1037/0278-7393.33.3.615 – CR ✓, PM.
- Karbach, J., & Verhaeghen, P. (2014). Making working memory work: A meta-analysis of executive-control and working memory training in older adults. *Psychological Science*, *25*(11), 2027–2037. https://doi.org/10.1177/0956797614548725 – CR ✓, PM.
- Kessels, R. P. C., van den Berg, E., Ruis, C., & Brands, A. M. A. (2008). The backward span of the Corsi Block-Tapping Task and its association with the WAIS-III Digit Span. *Assessment*, *15*(4), 426–434. https://doi.org/10.1177/1073191108315611 – CR ✓, PM.
- Klauer, K. C., & Zhao, Z. (2004). Double dissociations in visual and spatial short-term memory. *Journal of Experimental Psychology: General*, *133*(3), 355–381. https://doi.org/10.1037/0096-3445.133.3.355 – CR ✓, PM.
- Lim, J., & Dinges, D. F. (2010). A meta-analysis of the impact of short-term sleep deprivation on cognitive variables. *Psychological Bulletin*, *136*(3), 375–389. https://doi.org/10.1037/a0018883 – CR ✓, PM.
- Luck, S. J., & Vogel, E. K. (2013). Visual working memory capacity: From psychophysics and neurobiology to individual differences. *Trends in Cognitive Sciences*, *17*(8), 391–400. https://doi.org/10.1016/j.tics.2013.06.006 – CR ✓, PM.
- Machado, G. M., Oliveira, M. M., & Fernandes, L. A. F. (2009). A physiologically-based model for simulation of color vision deficiency. *IEEE Transactions on Visualization and Computer Graphics*, *15*(6), 1291–1298. https://doi.org/10.1109/TVCG.2009.113 – CR ✓ (als Werkzeug für die Palettenprüfung; Initialen der Vornamen aus Crossref nur teilweise).
- Martinussen, R., Hayden, J., Hogg-Johnson, S., & Tannock, R. (2005). A meta-analysis of working memory impairments in children with attention-deficit/hyperactivity disorder. *Journal of the American Academy of Child & Adolescent Psychiatry*, *44*(4), 377–384. https://doi.org/10.1097/01.chi.0000153228.72591.73 – CR ✓, PM.
- Melby-Lervåg, M., & Hulme, C. (2013). Is working memory training effective? A meta-analytic review. *Developmental Psychology*, *49*(2), 270–291. https://doi.org/10.1037/a0028228 – CR ✓, PM.
- Melby-Lervåg, M., & Hulme, C. (2016). There is no convincing evidence that working memory training is effective: A reply to Au et al. (2014) and Karbach and Verhaeghen (2014). *Psychonomic Bulletin & Review*, *23*(1), 324–330. https://doi.org/10.3758/s13423-015-0862-z – CR ✓ (über PubMed), PM.
- Melby-Lervåg, M., Redick, T. S., & Hulme, C. (2016). Working memory training does not improve performance on measures of intelligence or other measures of "far transfer": Evidence from a meta-analytic review. *Perspectives on Psychological Science*, *11*(4), 512–534. https://doi.org/10.1177/1745691616635612 – CR ✓, PM.
- Miyake, A., Friedman, N. P., Emerson, M. J., Witzki, A. H., Howerter, A., & Wager, T. D. (2000). The unity and diversity of executive functions and their contributions to complex "frontal lobe" tasks: A latent variable analysis. *Cognitive Psychology*, *41*(1), 49–100. https://doi.org/10.1006/cogp.1999.0734 – CR ✓, PM.
- Monaco, M., Costa, A., Caltagirone, C., & Carlesimo, G. A. (2013). Forward and backward span for verbal and visuo-spatial data: Standardization and normative data from an Italian adult population. *Neurological Sciences*, *34*(5), 749–754. https://doi.org/10.1007/s10072-012-1130-x – CR ✓, PM (Erratum: https://doi.org/10.1007/s10072-014-2019-7).
- Moody, D. E. (2009). Can intelligence be increased by training on a task of working memory? *Intelligence*, *37*(4), 327–328. https://doi.org/10.1016/j.intell.2009.04.005 – CR ✓, Inhalt SEK.
- Old, S. R., & Naveh-Benjamin, M. (2008). Differential effects of age on item and associative measures of memory: A meta-analysis. *Psychology and Aging*, *23*(1), 104–118. https://doi.org/10.1037/0882-7974.23.1.104 – CR ✓, PM.
- Owen, A. M., Hampshire, A., Grahn, J. A., Stenton, R., Dajani, S., Burns, A. S., Howard, R. J., & Ballard, C. G. (2010). Putting brain training to the test. *Nature*, *465*(7299), 775–778. https://doi.org/10.1038/nature09042 – CR ✓, PM, VT (auch in Dok. 01).
- Owen, A. M., McMillan, K. M., Laird, A. R., & Bullmore, E. (2005). N-back working memory paradigm: A meta-analysis of normative functional neuroimaging studies. *Human Brain Mapping*, *25*(1), 46–59. https://doi.org/10.1002/hbm.20131 – CR ✓, PM.
- Paivio, A. (1991). Dual coding theory: Retrospect and current status. *Canadian Journal of Psychology*, *45*(3), 255–287. https://doi.org/10.1037/h0084295 – CR ✓ (nur Metadaten; als Theoriequelle zu „Paivio“ auf 606).
- Park, D. C., Lautenschlager, G., Hedden, T., Davidson, N. S., Smith, A. D., & Smith, P. K. (2002). Models of visuospatial and verbal memory across the adult life span. *Psychology and Aging*, *17*(2), 299–320. https://doi.org/10.1037/0882-7974.17.2.299 – CR ✓, PM.
- Paulesu, E., Frith, C. D., & Frackowiak, R. S. J. (1993). The neural correlates of the verbal component of working memory. *Nature*, *362*(6418), 342–345. https://doi.org/10.1038/362342a0 – CR ✓, PM.
- Pearson, D., & Sahraie, A. (2003). Oculomotor control and the maintenance of spatially and temporally distributed events in visuo-spatial working memory. *The Quarterly Journal of Experimental Psychology Section A*, *56*(7), 1089–1111. https://doi.org/10.1080/02724980343000044 – CR ✓, PM.
- Penney, C. G. (1989). Modality effects and the structure of short-term verbal memory. *Memory & Cognition*, *17*(4), 398–422. https://doi.org/10.3758/BF03202613 – CR ✓, PM.
- Phillips, W. A. (1974). On the distinction between sensory storage and short-term visual memory. *Perception & Psychophysics*, *16*(2), 283–290. https://doi.org/10.3758/BF03203943 – CR ✓, Inhalt SEK.
- Postle, B. R., Idzikowski, C., Della Sala, S., Logie, R. H., & Baddeley, A. D. (2006). The selective disruption of spatial working memory by eye movements. *Quarterly Journal of Experimental Psychology*, *59*(1), 100–120. https://doi.org/10.1080/17470210500151410 – CR ✓, PM.
- Postma, A., Kessels, R. P. C., & van Asselen, M. (2008). How the brain remembers and forgets where things are: The neurocognition of object-location memory. *Neuroscience & Biobehavioral Reviews*, *32*(8), 1339–1345. https://doi.org/10.1016/j.neubiorev.2008.05.001 – CR ✓, PM.
- Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin*, *124*(3), 372–422. https://doi.org/10.1037/0033-2909.124.3.372 – CR ✓, VT (Tabelle 1, S. 373).
- Redick, T. S., & Lindsey, D. R. B. (2013). Complex span and n-back measures of working memory: A meta-analysis. *Psychonomic Bulletin & Review*, *20*(6), 1102–1113. https://doi.org/10.3758/s13423-013-0453-9 – CR ✓, PM, VT.
- Redick, T. S., Shipstead, Z., Harrison, T. L., Hicks, K. L., Fried, D. E., Hambrick, D. Z., Kane, M. J., & Engle, R. W. (2013). No evidence of intelligence improvement after working memory training: A randomized, placebo-controlled study. *Journal of Experimental Psychology: General*, *142*(2), 359–379. https://doi.org/10.1037/a0029082 – CR ✓, PM.
- Sahakian, B. J., Morris, R. G., Evenden, J. L., Heald, A., Levy, R., Philpot, M., & Robbins, T. W. (1988). A comparative study of visuospatial memory and learning in Alzheimer-type dementia and Parkinson's disease. *Brain*, *111*(3), 695–718. https://doi.org/10.1093/brain/111.3.695 – CR ✓, PM.
- Sala, G., & Gobet, F. (2020). Working memory training in typically developing children: A multilevel meta-analysis. *Psychonomic Bulletin & Review*, *27*(3), 423–434. https://doi.org/10.3758/s13423-019-01681-y – CR ✓, PM.
- Service, E., Simola, M., Metsänheimo, O., & Maury, S. (2002). Bilingual working memory span is affected by language skill. *European Journal of Cognitive Psychology*, *14*(3), 383–408. https://doi.org/10.1080/09541440143000140 – CR ✓, Inhalt SEK.
- Sheedy, J. E. (2004). Progressive addition lenses—matching the specific lens to patient needs. *Optometry – Journal of the American Optometric Association*, *75*(2), 83–102. https://doi.org/10.1016/S1529-1839(04)70021-4 – CR ✓, PM.
- Sheedy, J. E., Campbell, C., King-Smith, E., & Hayes, J. R. (2005). Progressive powered lenses: The Minkwitz theorem. *Optometry and Vision Science*, *82*(10), 916–922. https://doi.org/10.1097/01.opx.0000181266.60785.c9 – CR ✓, PM.
- Sheppard, A. L., & Wolffsohn, J. S. (2018). Digital eye strain: Prevalence, measurement and amelioration. *BMJ Open Ophthalmology*, *3*(1), e000146. https://doi.org/10.1136/bmjophth-2018-000146 – CR ✓, PM.
- Siddi, S., Preti, A., Lara, E., Brébion, G., Vila, R., Iglesias, M., Cuevas-Esteban, J., López-Carrilero, R., Butjosa, A., & Haro, J. M. (2020). Comparison of the touch-screen and traditional versions of the Corsi block-tapping test in patients with psychosis and healthy controls. *BMC Psychiatry*, *20*, 329. https://doi.org/10.1186/s12888-020-02716-8 – CR ✓, VT (Zusammenfassung).
- Smith, M. L., & Milner, B. (1981). The role of the right hippocampus in the recall of spatial location. *Neuropsychologia*, *19*(6), 781–793. https://doi.org/10.1016/0028-3932(81)90090-7 – CR ✓ (kein Abstract; nur Titelaussage verwenden).
- Soveri, A., Antfolk, J., Karlsson, L., Salo, B., & Laine, M. (2017). Working memory training revisited: A multi-level meta-analysis of n-back training studies. *Psychonomic Bulletin & Review*, *24*(4), 1077–1096. https://doi.org/10.3758/s13423-016-1217-0 – CR ✓, PM, VT (Preprint, OSF).
- Sperling, G. (1960). The information available in brief visual presentations. *Psychological Monographs: General and Applied*, *74*(11), 1–29. https://doi.org/10.1037/h0093759 – CR ✓, Inhalt SEK.
- Swanson, H. L., Zheng, X., & Jerman, O. (2009). Working memory, short-term memory, and reading disabilities: A selective meta-analysis of the literature. *Journal of Learning Disabilities*, *42*(3), 260–287. https://doi.org/10.1177/0022219409331958 – CR ✓, PM.
- Teixeira-Santos, A. C., Moreira, C. S., Magalhães, R., Magalhães, C., Pereira, D. R., Leite, J., Carvalho, S., & Sampaio, A. (2019). Reviewing working memory training gains in healthy older adults: A meta-analytic review of transfer for cognitive outcomes. *Neuroscience & Biobehavioral Reviews*, *103*, 163–177. https://doi.org/10.1016/j.neubiorev.2019.05.009 – CR ✓, PM.
- Thalmann, M., Souza, A. S., & Oberauer, K. (2019). How does chunking help working memory? *Journal of Experimental Psychology: Learning, Memory, and Cognition*, *45*(1), 37–55. https://doi.org/10.1037/xlm0000578 – CR ✓, PM.
- Todd, J. J., & Marois, R. (2004). Capacity limit of visual short-term memory in human posterior parietal cortex. *Nature*, *428*(6984), 751–754. https://doi.org/10.1038/nature02466 – CR ✓, PM.
- Tsubota, K., & Nakamori, K. (1993). Dry eyes and video display terminals. *New England Journal of Medicine*, *328*(8), 584. https://doi.org/10.1056/NEJM199302253280817 – CR ✓, Inhalt SEK (Leserbrief ohne Abstract).
- Van der Elst, W., van Boxtel, M. P. J., van Breukelen, G. J. P., & Jolles, J. (2005). Rey's verbal learning test: Normative data for 1855 healthy participants aged 24–81 years and the influence of age, sex, education, and mode of presentation. *Journal of the International Neuropsychological Society*, *11*(3), 290–302. https://doi.org/10.1017/S1355617705050344 – CR ✓, PM.
- Vandierendonck, A., Kemps, E., Fastame, M. C., & Szmalec, A. (2004). Working memory components of the Corsi blocks task. *British Journal of Psychology*, *95*(1), 57–79. https://doi.org/10.1348/000712604322779460 – CR ✓, PM.
- Verhaeghen, P., Marcoen, A., & Goossens, L. (1992). Improving memory performance in the aged through mnemonic training: A meta-analytic study. *Psychology and Aging*, *7*(2), 242–251. https://doi.org/10.1037/0882-7974.7.2.242 – CR ✓, PM.
- Vogel, E. K., & Machizawa, M. G. (2004). Neural activity predicts individual differences in visual working memory capacity. *Nature*, *428*(6984), 748–751. https://doi.org/10.1038/nature02447 – CR ✓, PM.
- Voyer, D., Postma, A., Brake, B., & Imperato-McGinley, J. (2007). Gender differences in object location memory: A meta-analysis. *Psychonomic Bulletin & Review*, *14*(1), 23–38. https://doi.org/10.3758/BF03194024 – CR ✓, PM.
- Waters, G. S., & Caplan, D. (2003). The reliability and stability of verbal working memory measures. *Behavior Research Methods, Instruments, & Computers*, *35*(4), 550–564. https://doi.org/10.3758/BF03195534 – CR ✓, PM.
- Wheeler, M. E., & Treisman, A. M. (2002). Binding in short-term visual memory. *Journal of Experimental Psychology: General*, *131*(1), 48–64. https://doi.org/10.1037/0096-3445.131.1.48 – CR ✓, PM.
- Xu, Z., Adam, K. C. S., Fang, X., & Vogel, E. K. (2018). The reliability and stability of visual working memory capacity. *Behavior Research Methods*, *50*(2), 576–588. https://doi.org/10.3758/s13428-017-0886-6 – CR ✓, PM.

### D3 Aus `docs/wissenschaft/01–04` übernommen (dort geprüft; DOI hier erneut per Crossref aufgelöst)

- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A*, *29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – CR ✓, PM.
- Boccardo, L., Gurioli, M., & Grasso, P. A. (2023). Viewing distance and character size in the use of smartphones across the lifespan. *PLOS ONE*, *18*(4), e0282947. https://doi.org/10.1371/journal.pone.0282947 – CR ✓ (Dok. 02).
- Calabrèse, A., Cheong, A. M. Y., Cheung, S.-H., He, Y., Kwon, M., Mansfield, J. S., Subramanian, A., Yu, D., & Legge, G. E. (2016). Baseline MNREAD measures for normally sighted subjects from childhood to old age. *Investigative Ophthalmology & Visual Science*, *57*(8), 3836–3843. https://doi.org/10.1167/iovs.16-19580 – CR ✓ (Dok. 04).
- Calamia, M., Markon, K., & Tranel, D. (2012). Scoring higher the second time around: Meta-analyses of practice effects in neuropsychological assessment. *The Clinical Neuropsychologist*, *26*(4), 543–570. https://doi.org/10.1080/13854046.2012.680913 – CR ✓, PM.
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, *46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – CR ✓ (Dok. 03).
- Legge, G. E., & Bigelow, C. A. (2011). Does print size matter for reading? A review of findings from vision science and typography. *Journal of Vision*, *11*(5), 8. https://doi.org/10.1167/11.5.8 – Dok. 04 (DOI dort geprüft).
- Levitt, H. (1971). Transformed up-down methods in psychoacoustics. *The Journal of the Acoustical Society of America*, *49*(2B), 467–477. https://doi.org/10.1121/1.1912375 – CR ✓ (Dok. 01).
- Paramei, G. V., & Oakley, B. (2014). Variation of color discrimination across the life span. *Journal of the Optical Society of America A*, *31*(4), A375–A384. https://doi.org/10.1364/JOSAA.31.00A375 – CR ✓ (Dok. 04).
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of the 8th Conference on Human-Computer Interaction with Mobile Devices and Services (MobileHCI '06)* (S. 203–210). ACM. https://doi.org/10.1145/1152215.1152260 – CR ✓ (Dok. 02).
- Pelli, D. G., & Tillman, K. A. (2008). The uncrowded window of object recognition. *Nature Neuroscience*, *11*(10), 1129–1135. https://doi.org/10.1038/nn.2187 – CR ✓ (Dok. 03).
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, *52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – CR ✓ (Dok. 01).
- Sala, G., & Gobet, F. (2019). Cognitive training does not enhance general cognition. *Trends in Cognitive Sciences*, *23*(1), 9–20. https://doi.org/10.1016/j.tics.2018.10.004 – CR ✓, PM.
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest*, *17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – CR ✓, PM.
- Strasburger, H., Rentschler, I., & Jüttner, M. (2011). Peripheral vision and pattern recognition: A review. *Journal of Vision*, *11*(5), 13. https://doi.org/10.1167/11.5.13 – CR ✓ (Dok. 01).
- W3C. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (W3C Recommendation, 12.12.2024). https://www.w3.org/TR/WCAG22/ – Norm, keine DOI (Dok. 01/03; SC 1.4.1, 2.3.1, 2.5.5, 2.5.8).

**Bilanz:**

- **Teil A:** 20 verschiedene Website-Quellen mit 45 Nennungen geprüft. Bibliografisch fehlerhaft: 2 (Kessels 2000:
  DOI und Zeitschrift falsch; Eals & Silverman 1994: Titelwort falsch); dazu 1 falsche Autorenangabe im Fließtext.
  Inhaltlich nicht gestützt: Woods 2015 (7×), Jaeggi 2008 (Transfer), Luck & Vogel 1997 (Bindungslast, 605),
  Baddeley 2000 (Cache/Scribe), Kirchner 1958 und Eals & Silverman 1994 als „Normen“.
- **Teil D2:** 76 weitere Quellen, alle DOI per Crossref aufgelöst, dazu 2 Normen oder Bücher ohne DOI.
- **Teil D3:** 15 aus dem Repository übernommen.
- **Teil B:** 87 Fakten, SEK-Einträge gekennzeichnet.
