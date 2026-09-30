---
# ===== Kennung =====
nr: 205
kennung: divided-attention
name: "Geteilte Aufmerksamkeit (Kreis antippen und gerade Ziffern melden)"
name_original: "Test der geteilten Aufmerksamkeit – Bewegtes Ziel und Zahlen gleichzeitig verarbeiten (Divided Attention)"
kapitel: "Kognition & Aufmerksamkeit"
kapitel_original: "cognitive"
unterkapitel_original: "attention"
quelle_url: "https://skilldrills.online/de/drills/cognitive/attention/divided-attention"
blickfit_umsetzung: {kennung: "doppelt-gefordert", name: "Doppelt gefordert", unterschiede: "Echte Doppelaufgabe mit Einzelaufgaben-Basislinie: Kugel per Finger auf einer bewegten Spur halten (Dauersteuern) plus kurz gezeigtes Zeichen (Kreis/Quadrat) mit zwei Tasten beantworten. Ablauf A allein (20 s), B allein (20 s), beides (60 s, wechselnder Vorrang). Schwierigkeit stellt sich in den Einzelteilen auf ca. 80 % ein und bleibt im Doppelteil fest. Ergebnis sind Doppelaufgaben-Kosten in Prozent statt Punkte; zeitbasierte Bewegung, Multitouch, Rückmeldung nie nur über Farbe, kein Zeitbonus, keine Zeitstrafe."}
stand: 2026-09-30

# ===== Überblick =====
kurzbeschreibung: "Auf dem Bildschirm erscheint ein blauer Kreis an wechselnden Stellen, den man antippt, während daneben Ziffern laufen und man bei jeder geraden Ziffer eine MATCH-Taste drückt. Es sind also zwei Aufgaben gleichzeitig zu beachten; bei Fehlern und verpassten Reizen gehen Combo und Zeit verloren."
ziel_funktionen: [geteilte_aufmerksamkeit]
eingabe: [maus, touch]
tablet_geeignet: ja
dauer_sekunden: 45
schwierigkeit_anpassung: "Automatisch über den Punktestand: Level = max(Level, Punkte/1.750 + 1). Kreis-Anzeigedauer 1.800 ms (Level 1) → 1.004 ms (L10) → 613 ms (L15) → 425 ms (L20); Ziffernwechsel 2.000 → 300 ms; Kreis schrumpft bis auf 45 % (ab L15); Pause bis zum nächsten Kreis 500–700 → 80–140 ms; hoher Combo verkürzt alle Zeiten um bis zu 25 %. Kein manueller Regler."
messgroessen: ["Punkte", "Trefferquote gesamt", "Kreis-Treffer", "Ziffern-Treffer", "höchste Combo", "Fehler", "erreichtes Level"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 2
    blickfolge: 0
    sakkaden: 2
    fixation: 1
    bewegungswahrnehmung: 0
    visuelle_suche: 1
    visuelle_verarbeitungsgeschwindigkeit: 2
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 2
    geteilte_aufmerksamkeit: 3
    kognitive_flexibilitaet: 1
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 0
    entscheidung_wahlreaktion: 2
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 2
    zielbewegung_tempo: 2
    zielbewegung_praezision: 2
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 1
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 3
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Ziffern 0–9 lesen und gerade/ungerade unterscheiden können", "Antippen eines Kreises (ca. 30–80 Bildpunkte) und einer Taste muss möglich sein", "Ton ist nicht nötig, aber vorhanden (Zeit- und Treffertöne)"]
vorsicht_bei: [aufmerksamkeitsprobleme, kognitive_einschraenkung, presbyopie_gleitsicht, hand_arm_beschwerden]
geeignet_fuer: ["Erleben und Üben, wie zwei gleichzeitige Anforderungen sich gegenseitig stören (Doppelaufgabe)", "schnelles Umschalten zwischen einem Ort auf dem Bildschirm und einer Ziffernanzeige", "Reaktionsspiel mit klarer Sofort-Rückmeldung für Kund:innen ohne Vorkenntnisse"]
weniger_geeignet_fuer: ["Blickfolge (der Kreis bewegt sich trotz Ankündigung nicht kontinuierlich)", "saubere Messung von Doppelaufgaben-Kosten (keine Einzelaufgaben-Basislinie; dafür Blickfit 'Doppelt gefordert')", "Menschen, die unter Zeitdruck schnell gestresst sind oder mit Mausklicks Mühe haben", "Vergleich zwischen Sitzungen (Sitzungslänge und Schwierigkeit hängen von der Leistung ab)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Doppelaufgaben-Training senkt in Laborstudien die Doppelaufgaben-Kosten und überträgt sich teils auf neue Aufgabenkombinationen (Kramer 1995, Bherer 2005, Anguera 2013; kleine Gruppen); für diese Übung selbst gibt es keine Studie, und ein Nutzen beim Fahren oder Gehen ist für Bildschirmübungen nicht belegt."
aehnliche_uebungen: [206, 408, 208, 207, 202, 201, 106]
stichworte: ["geteilte Aufmerksamkeit", "Dual-Task", "Doppelaufgabe", "Multitasking", "Parität", "gerade Zahl", "Doppelaufgaben-Kosten", "Blickwechsel"]
---

# 205 · Geteilte Aufmerksamkeit (Kreis antippen und gerade Ziffern melden)

> Original: „Test der geteilten Aufmerksamkeit" – skilldrills.online, Kapitel Kognition (attention) · Blickfit: umgesetzt als „Doppelt gefordert"

## 1. Kurzbeschreibung
Man sieht ein dunkles Spielfeld, in dem ein blauer Kreis auftaucht. Er wird angetippt, bevor er wieder verschwindet. Daneben zeigt ein Ziffernfeld laufend einzelne Ziffern von 0 bis 9; bei jeder geraden Ziffer (0, 2, 4, 6, 8) muss man die Taste MATCH drücken, bei ungeraden nichts tun. Beide Aufgaben laufen gleichzeitig weiter, und jede verpasste oder falsche Reaktion kostet Combo und Zeit. Fachlich ist das eine **Doppelaufgabe (Dual-Task)**: Zwei Anforderungen konkurrieren um dieselbe begrenzte Verarbeitungskapazität, sodass meist mindestens eine schlechter wird als allein.

## 2. Ablauf im Original (Analyse)
Quelle: Seitentext und ausgelieferter Spielcode (Stand 30.09.2026, nur Mechanik beschrieben); ergänzend `docs/skilldrills-kognition-analyse.md`.

- **Start:** Countdown 3-2-1-GO (0/700/1.400/2.100 ms), Spielbeginn bei 2.450 ms. Sitzung 45 s, Vollbild; Escape beendet (Code).
- **Kanal A (Kreis):** Ein Kreis (Durchmesser 64 px, ab Breite 640 px 80 px; Skalierung 1,0 → 0,45) erscheint an einer Zufallsstelle (15–85 % von Breite und Höhe) und **bleibt dort stehen**, bis er getroffen wird oder die Anzeigedauer abläuft. Danach folgt nach kurzer Pause der nächste Kreis an neuer Stelle. Treffer = Berührung/Klick auf den Kreis (Pointer-Down). Klicks daneben werden nicht bestraft (Code).
- **Kanal B (Ziffern):** Alle `numSpeed` ms wechselt die angezeigte Ziffer (0–9, nie dieselbe zweimal hintereinander; etwa die Hälfte gerade). Bei gerader Ziffer einmal MATCH drücken. Bestraft werden: MATCH bei ungerader Ziffer, zweites MATCH auf dieselbe Ziffer, sowie eine **gerade Ziffer, die ohne MATCH verstreicht**. Ungerade Ziffern ohne Klick zählen weder als Treffer noch als Versuch (keine „korrekten Zurückweisungen" in der Wertung).
- **Tempokurve (Code):** Kreis-Anzeigedauer: Level 1 = 1.800 ms, L5 = 1.484, L10 = 1.004, L15 = 613, L20 = 425, L30 = 285 ms (Untergrenze 180 ms). Ziffernwechsel 2.000 ms (L1) → 1.132 (L10) → 502 (L20) → 300 ms (Untergrenze 220 ms). Nach jedem Kreis-Treffer Pause 500–700 ms (L1) bzw. 80–140 ms (L30).
- **Wertung:** Treffer = 100 Punkte × Combo-Multiplikator (1,0 bis 3,0; Stufen bei Combo 3/5/7/10/15/20/30/50) × (1 + 0,5 × Levelanteil). Jeder Treffer gibt **+2 s (maximal 60 s)**, jeder Fehler setzt die Combo auf 0 und kostet **1 s** (die Zeitstrafe lässt sich nur über eine Einstellung abschalten; Regeltext nennt sie nicht). Level = max(Level, Punkte/1.750 + 1).
- **Combo-Effekt:** Eine hohe Combo verkürzt beide Zeitfenster um bis zu 25 % – nach einem Fehler wird es also plötzlich langsamer.
- **Abschluss:** Note aus Wurzel(Punkte/24.000); Genauigkeit = Treffer / (Treffer + Fehler + verpasste Kreise/Ziffern).
- **Widersprüche Regeltext ↔ Code:** (1) „Bewegtes Ziel", „Tracking", „wandernde Zielkreise": Der Kreis steht still und springt nur von Ort zu Ort; es gibt **keine Bewegung und keine Blickfolge**. (2) „Zahlenreihe im Seitenpanel", „Timer des Ziels": Der Timer ist nur die (unsichtbare) Anzeigedauer. (3) Die FAQ-Angabe „über 15.000 Punkte bei über 92 % Genauigkeit = oberstes Perzentil" passt nicht zur Notenformel im Code (S+ ab ca. 21.700 Punkten) und hat keine Datengrundlage.
- **Eingabe:** nur Maus/Touch; keine Tastensteuerung außer Escape. Mit **einem Zeiger** (Maus) muss man zwischen Kreis und MATCH-Taste hin- und herfahren – die Übung ist dann eher schnelles Umschalten als gleichzeitiges Bearbeiten. Auf dem Tablet können zwei Finger beide Aufgaben halten.
- **Zeitsteuerung:** Beide Aufgaben laufen auf unabhängigen Timern (setTimeout); der Zeitabstand zwischen Kreis und Ziffer ist zufällig und wird nicht kontrolliert. Die Restzeit läuft bildfrequenzunabhängig (Zeitdifferenz, gedeckelt auf 0,1 s). Reaktionszeiten werden nicht gespeichert; nur Bestwert lokal im Browser.

## 3. Was die Website sagt – und wie das einzuordnen ist
**Aussagen:** Der Selbstcheck verbinde „visuelles Zieltracking mit Zahlenklassifikation" und trainiere „Dual-Task-Verarbeitung", „Aufmerksamkeitsverteilung" und kognitive Flexibilität; er drücke „präfrontale Exekutivnetzwerke an ihr absolutes Limit"; Training automatisiere Teilprozesse und entlaste den zentralen Flaschenhals; Nutzen bei Autofahren, Gaming und Multitasking; „10 bis 15 Minuten täglich reichen vollkommen aus"; fünf Leistungsstufen von „Top 1 %" (98 %+) bis „Basis" (< 78 %); 144-Hz-Monitor stelle Bewegung präziser dar. Zielgruppe: Gamer, Lernende, Menschen mit vielen parallelen Eingaben.

**Einordnung:**
- **Belegt:** Wer zwei Aufgaben gleichzeitig bearbeitet, wird oft bei einer oder beiden langsamer oder ungenauer; ein zentraler Engpass bei der Antwortauswahl erklärt einen Teil (Pashler, 1994; neuronal: seitlicher präfrontaler Kortex, Dux et al., 2006). Telefonieren verdoppelte im Fahrsimulator übersehene Signale (Strayer & Johnston, 2001).
- **Überzogen:** „Bewiesen" durch Spelke et al. (1976): Es waren **2 Personen** über 17 Wochen; die Deutung als „Automatisierung" wurde in der Folgearbeit (Hirst et al., 1980) gerade nicht bestätigt. „Prefrontale Netzwerke am Limit": keine Messung. Nutzen im Alltag: nicht untersucht.
- **Falsch bzw. nicht stützbar:** „Bewegtes Ziel" (Kreis steht still); 144 Hz und Woods et al. (2015) – die Studie testete 60-Hz-Bildschirme und sagt nichts über Konturen oder Räumlichkeit. **Leistungsstufen und Perzentile („Top 1 %") haben keine Datengrundlage**: Die Seite erhebt selbst keine Nutzerdaten. Schlafmangel führe zu „völligem Übersehen peripherer Reize": In einer Metaanalyse war die einfache Aufmerksamkeit am stärksten betroffen (g = −0,78), Schlussfolgern kaum (g = −0,13; Lim & Dinges, 2010); „Tunnelblick" wurde nicht untersucht.
- Nach Wickens (2002) stören sich Aufgaben stärker, wenn beide **denselben Kanal** nutzen; hier sind beide visuell – die Website stellt es umgekehrt dar.

## 4. Optische und okulomotorische Grundlagen
- **Sakkaden statt Folgebewegung:** Der Blick springt zwischen Kreis (wechselnde Stelle) und Ziffernfeld. Kreis und Ziffer lassen sich nicht gleichzeitig scharf sehen; die Aufmerksamkeit kann nur kurz aus dem Augenwinkel „parken". Typische Sakkadendauer 30–70 ms plus Vorbereitung (Latenz ca. 200 ms; Lehrbuchwerte ohne Einzelquelle) – bei Kreiszeiten unter ca. 600 ms (ab Level 15) kaum zusätzliche Blicksprünge möglich.
- **Sehwinkel (Tablet 40 cm, 0,19 mm/px, ca. 36 px/° [H]):** Kreis 64–80 px ≈ 1,8–2,2°; bei 45 % ≈ 29–36 px ≈ 0,8–1,0°. Ziffer (Schrift 36–60 px) ≈ 0,7–1,2° hoch – für normale Sehschärfe gut lesbar, aber bei weiter Entfernung vom Ziffernfeld nur mit Blicksprung.
- **Brille:** Bei Gleitsicht liegt das Spielfeld am Tablet meist im Nahteil unten; der Kreis erscheint aber auf **15–85 % der Fläche**, also auch in seitlichen Randzonen mit Unschärfe, die zu Kopfbewegungen führen (Hutchings et al., 2007: Neulinge nutzen mehr Kopfbewegungen; Sheedy, 2004: Zonenbreiten unterscheiden sich stark). Das verlängert Wege und verzerrt die Leistung. Presbyope halten Geräte weiter weg (39,7 vs. 33,4 cm; Boccardo et al., 2023) – Sehwinkel sinkt entsprechend; Arbeitsplatz-/Nahbrille prüfen. Realer Abstand Smartphone 32–36 cm (Bababekova et al., 2011).
- **Farbe:** Kreis blau auf dunklem Grund, Rückmeldung farbig; die Aufgabe selbst braucht keine Farbunterscheidung (Farbsehschwäche ≈ 8 % der Männer meist unproblematisch).
- **Belastung:** Schnelle Ziffernwechsel (bis 3 Hz) und ein pulsierender Ring am Kreis: kein Flimmern im kritischen Bereich (unter 50 ms wechselnd), aber lange Bildschirmphasen können bei trockenem Auge oder Asthenopie anstrengen.

## 5. Neurowissenschaftliche Grundlagen
- Doppelaufgaben beanspruchen ein frontoparietales Netzwerk der Aufmerksamkeitssteuerung; zeitaufgelöste fMRT zeigte einen zentralen Engpass im hinteren seitlichen präfrontalen Kortex (und möglicherweise im oberen medialen Frontallappen) beim gleichzeitigen Auswählen zweier Antworten (Dux et al., 2006). Auch in einer früheren fMRT-Studie war bei gleichzeitigen Aufgaben ein präfrontaler Bereich stärker aktiv (Szameitat et al., 2002).
- Die Zahlenaufgabe (Parität) ist eine einfache Wahlreaktion mit Entscheidung „gerade/ungerade" (Vorrang: Auswahl) – Ort und Zeit der Kreise verlangen visuelle Aufmerksamkeitsverlagerung und Augen-Hand-Koordination (Parietalkortex). „Trainiert Region X" ist mit dieser Übung nicht belegt.
- Bei Älteren sind die Doppelaufgaben-Kosten in der Antwortzeit etwas größer, als allgemeine Verlangsamung erwarten lässt; sie bleiben klein und hängen kaum von der Aufgabenschwierigkeit ab. Bei der Genauigkeit fand die Metaanalyse keinen altersspezifischen Nachteil (Verhaeghen et al., 2003).

## 6. Motorische Grundlagen
- **Kreis treffen:** Zeigebewegung mit Genauigkeits- und Tempoanforderung (Fitts'sches Gesetz: Zeit steigt mit Weg und sinkt mit Zielgröße). Ziel schrumpft auf 29–36 px, Weg bis zur halben Bildschirmbreite.
- **MATCH:** einfacher Tastendruck, aber nur nach Entscheidung (Wahlreaktion mit Antwortunterdrückung bei ungeraden Ziffern; Inhibition). Ohne eigene Fingerzuordnung liegen beide Antworten bei Maus am selben Zeiger – Bewegungskosten für das Umschalten sind ein Teil der „Aufmerksamkeitskosten".
- **Tablet:** Pointer-Down reagiert sofort; Touch-Latenz in Web-Apps ist eher länger (iPhone ca. 58 ms, Galaxy ca. 66–70 ms; Pronk et al., 2020). Fingergröße verdeckt bei kleinem Kreis das Ziel.

## 7. Einflussfaktoren und Messgrenzen
- **Alter:** einfache Reaktionszeit +0,55 ms pro Lebensjahr (Woods et al., 2015); die Doppelaufgaben-Kosten in der Antwortzeit sind bei Älteren etwas größer als durch allgemeine Verlangsamung erklärbar, in der Genauigkeit nicht (Verhaeghen et al., 2003).
- **Müdigkeit/Schlaf:** wirkt vor allem auf einfache Daueraufmerksamkeit (Lim & Dinges, 2010).
- **Individuelle Unterschiede:** Einzelne (ca. 2,5 % von 200) zeigen im Simulator kaum Doppelaufgaben-Kosten (Watson & Strayer, 2010) – Einzelwerte der Übung sind kein Maßstab für andere.
- **Messqualität:** keine Einzelaufgaben-Basislinie → Punkte mischen die Fähigkeit in jeder Aufgabe mit dem Tempo des Zeigers; Sitzungen sind durch Zeitbonus und Levelanstieg unterschiedlich lang und schwer, daher nicht vergleichbar. Übungseffekt (Kurve wird auch durch Kenntnis der Bedienung besser) und Differenzwerte sind als Einzelwert oft unzuverlässig (Hedge et al., 2018). Absolute Zeiten hängen stark vom Gerät ab.

## 8. Studienlage: Trainierbarkeit und Übertragung
- **Übungseffekt (mittel):** Doppelaufgaben-Kosten sinken mit Übung bei Jung und Alt (Kramer et al., 1995; Bherer et al., 2005; Übersicht Strobach & Schubert, 2017). Ein adaptives Fahr-plus-Schilder-Spiel senkte bei 60- bis 85-Jährigen die Kosten von −64 % auf −16 % (6 Monate später −22 %; je Gruppe 15–16 Personen; Anguera et al., 2013).
- **Naher Transfer (schwach):** Übertragung auf neue Aufgabenkombinationen mit neuen Reizen (Bherer et al., 2005); für diese Übung nicht geprüft.
- **Alltagstransfer (fehlend):** Für Bildschirmübungen nicht belegt. Zu echtem Gehen mit Zweitaufgabe gibt es kleine Studien mit motorisch-kognitivem Training (Silsupadol et al., 2009); das ist eine andere Übungsform. Fahren: Die Übung ersetzt keine Fahrpraxis; Telefonieren am Steuer bleibt gefährlich (Caird et al., 2008: Reaktionszeit +0,25 s).

## 9. Auswahlhinweise für die KI
- **Passt, wenn** die Person üben oder erleben möchte, zwei Dinge gleichzeitig zu beachten, schnell zwischen Ort und Symbol umzuschalten, oder ein kurzes Reaktionsspiel mit Zeitdruck sucht. Profil: geteilte Aufmerksamkeit 3, Inhibition/Entscheidung 2.
- **Weniger passend, wenn** die Person glatte Blickfolge (401–415), saubere Vergleichsmessung von Doppelaufgaben-Kosten (dann Blickfit „Doppelt gefordert") oder ruhige Übungen ohne Zeitdruck (Belastung `zeitdruck` 3) sucht.
- **Vorsicht / anpassen bei** `aufmerksamkeitsprobleme` und `kognitive_einschraenkung` (Überforderung, Frust durch Zeitstrafe); `presbyopie_gleitsicht` (Blick durch seitliche Zonen, Kopfbewegung; Abstand und Brille prüfen); `hand_arm_beschwerden` (schnelle Zeigebewegungen). Nur als Auswahlhinweis, keine medizinische Aussage. Nicht während Fahren, Gehen oder anderer riskanter Tätigkeit.
- **Kombiniert gut mit:** 206 (Multitasking), 408 (Geteilte Aufmerksamkeit: Blickverfolgung), 207 (Symbol-Zahl), 202 (Wahlreaktion), 208 (Daueraufmerksamkeit).

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Keine Einzelaufgaben-Basislinie** → keine Doppelaufgaben-Kosten. Blickfit: Teil A allein, Teil B allein, dann beides; Ergebnis „Zusammenspiel" = Doppel ÷ Einzel je Teilaufgabe (Anguera et al., 2013).
- **Versprochene Bewegung fehlt:** Blickfit ersetzt den springenden Kreis durch eine zeitbasierte (dt), fortlaufende Steueraufgabe (Kugel auf schwingender Spur, Finger irgendwo im Feld, sichtbar nach vorn).
- **Beide Kanäle visuell, ein Zeiger:** Blickfit trennt Hände (Multitouch über Pointer-ID) und Bildschirmbereiche; Zeichen (Kreis/Quadrat) mit zwei großen Tasten, Form statt Farbe.
- **Zeitbonus und Zeitstrafe, Combo-Beschleunigung:** Blickfit hat feste Dauer (ca. 2 Minuten), keine Strafe, keine Combo; Schwierigkeit fest im Doppelteil.
- **Rückmeldung nur über Farbe/Ton:** Blickfit nutzt ✓/✗-Symbole, gestrichelten Ring; Farbsehschwäche und Schwerhörigkeit unproblematisch.
- **Wechselnder Vorrang** (Kramer 1995; Yu et al., 2026, systematische Übersicht bei Älteren: Vorteil nicht gesichert) und Hinweis „bitte im Sitzen".
- **Nicht übernehmen:** Perzentil-Tabellen, „Top 1 %", Alltagsversprechen; Blickfit sagt „Ob sich das aufs Gehen oder Autofahren überträgt, ist nicht belegt".
- **Tablet:** Touch-Ziele ≥ 44 px, Finger verdeckt Ziel (Kugel-Feld links, Zeichen-Tasten rechts); Hinweise zu Pausen, Blinzeln und Gleitsicht (Kopf statt Augen bewegen).

## 11. Quellen
### Von der Website angegeben
- Pashler, H. (1994). Dual-task interference in simple tasks: Data and theory. *Psychological Bulletin, 116*(2), 220–244. https://doi.org/10.1037/0033-2909.116.2.220 – **Prüfung:** DOI stimmt ✓ (Crossref); **stützt die Aussage der Website:** ja (zentraler Engpass bei der Antwortauswahl).
- Wickens, C. D. (2002). Multiple resources and performance prediction. *Theoretical Issues in Ergonomics Science, 3*(2), 159–177. https://doi.org/10.1080/14639220210123806 – **Prüfung:** DOI stimmt ✓; **stützt:** ja, aber gegen die Übung: beide Aufgaben sind visuell, was nach dem Modell mehr Interferenz bedeutet.
- Strayer, D. L., & Johnston, W. A. (2001). Driven to distraction: Dual-task studies of simulated driving and conversing on a cellular telephone. *Psychological Science, 12*(6), 462–466. https://doi.org/10.1111/1467-9280.00386 – **Prüfung:** DOI stimmt ✓; **stützt:** ja als Grundlage (Telefonieren verdoppelte übersehene Signale im Simulator); kein Beleg, dass die Übung das Fahren verbessert.
- Spelke, E., Hirst, W., & Neisser, U. (1976). Skills of divided attention. *Cognition, 4*(3), 215–230. https://doi.org/10.1016/0010-0277(76)90018-4 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (nur 2 Personen, 17 Wochen; „Beweis" der Automatisierung überzogen, vgl. Hirst et al., 1980).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (60-Hz-Anzeige; Aussage zu 144 Hz und Bewegungskonturen steht dort nicht).
- Ohne Quelle genannt: „Schlafmangel … Tunnelblick", „Top 1 %/Perzentile", „10–15 Minuten täglich" – **Prüfung:** keine Quelle; teils nicht stützbar (siehe Abschnitt 3).

### Weitere Fachliteratur
- Dux, P. E., Ivanoff, J., Asplund, C. L., & Marois, R. (2006). Isolation of a central bottleneck of information processing with time-resolved fMRI. *Neuron, 52*(6), 1109–1120. https://doi.org/10.1016/j.neuron.2006.11.009 – präfrontaler Engpass (Crossref und PubMed geprüft)
- Szameitat, A. J., Schubert, T., Müller, K., & von Cramon, D. Y. (2002). Localization of executive functions in dual-task performance with fMRI. *Journal of Cognitive Neuroscience, 14*(8), 1184–1199. https://doi.org/10.1162/089892902760807195 – Hirnaktivität bei Doppelaufgaben (Crossref geprüft, Abstract gelesen)
- Kramer, A. F., Larish, J. F., & Strayer, D. L. (1995). Training for attentional control in dual task settings: A comparison of young and old adults. *Journal of Experimental Psychology: Applied, 1*(1), 50–76. https://doi.org/10.1037/1076-898X.1.1.50 – Training mit wechselnder Priorität; Inhalt über Sekundärquellen
- Bherer, L., Kramer, A. F., Peterson, M. S., Colcombe, S., Erickson, K., & Becic, E. (2005). Training effects on dual-task performance: Are there age-related differences in plasticity of attentional control? *Psychology and Aging, 20*(4), 695–709. https://doi.org/10.1037/0882-7974.20.4.695 – Übungseffekt und Übertragung auf neue Kombinationen
- Anguera, J. A., Boccanfuso, J., Rintoul, J. L., et al. (2013). Video game training enhances cognitive control in older adults. *Nature, 501*(7465), 97–101. https://doi.org/10.1038/nature12486 – Kosten −64 % → −16 %; kleine Gruppen
- Verhaeghen, P., Steitz, D. W., Sliwinski, M. J., & Cerella, J. (2003). Aging and dual-task performance: A meta-analysis. *Psychology and Aging, 18*(3), 443–460. https://doi.org/10.1037/0882-7974.18.3.443 – Alterseffekt
- Strobach, T., & Schubert, T. (2017). Mechanisms of practice-related reductions of dual-task interference with simple tasks: Data and theory. *Advances in Cognitive Psychology, 13*(1), 28–41. https://doi.org/10.5709/acp-0204-7 – Mechanismen des Übungseffekts
- Hirst, W., Spelke, E. S., Reaves, C. C., Caharack, G., & Neisser, U. (1980). Dividing attention without alternation or automaticity. *Journal of Experimental Psychology: General, 109*(1), 98–117. https://doi.org/10.1037/0096-3445.109.1.98 – Einordnung von Spelke et al.
- Caird, J. K., Willness, C. R., Steel, P., & Scialfa, C. (2008). A meta-analysis of the effects of cell phones on driver performance. *Accident Analysis & Prevention, 40*(4), 1282–1293. https://doi.org/10.1016/j.aap.2008.01.009 – Telefon am Steuer, Reaktionszeit +0,25 s
- Watson, J. M., & Strayer, D. L. (2010). Supertaskers: Profiles in extraordinary multitasking ability. *Psychonomic Bulletin & Review, 17*(4), 479–485. https://doi.org/10.3758/PBR.17.4.479 – individuelle Unterschiede
- Silsupadol, P., Shumway-Cook, A., Lugade, V., et al. (2009). Effects of single-task versus dual-task training on balance performance in older adults: A double-blind, randomized controlled trial. *Archives of Physical Medicine and Rehabilitation, 90*(3), 381–387. https://doi.org/10.1016/j.apmr.2008.09.559 – Doppelaufgaben-Training beim Gehen (anderes Setting)
- Lim, J., & Dinges, D. F. (2010). A meta-analysis of the impact of short-term sleep deprivation on cognitive variables. *Psychological Bulletin, 136*(3), 375–389. https://doi.org/10.1037/a0018883 – Schlafmangel
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Gleitsicht, Kopfbewegung
- Sheedy, J. E. (2004). Progressive addition lenses—matching the specific lens to patient needs. *Optometry, 75*(2), 83–102. https://doi.org/10.1016/S1529-1839(04)70021-4 – Zonenbreiten
- Boccardo, L., Gurioli, M., & Grasso, P. A. (2023). Viewing distance and character size in the use of smartphones across the lifespan. *PLoS ONE, 18*(4), e0282947. https://doi.org/10.1371/journal.pone.0282947 – Abstand Presbyopie
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touch-Latenz
- Hedge, C., Powell, G., & Sumner, P. (2018). The reliability paradox: Why robust cognitive tasks do not produce reliable individual differences. *Behavior Research Methods, 50*(3), 1166–1186. https://doi.org/10.3758/s13428-017-0935-1 – Zuverlässigkeit von Differenzwerten
- Bababekova, Y., Rosenfield, M., Hue, J. E., & Huang, R. R. (2011). Font size and viewing distance of handheld smart phones. *Optometry and Vision Science, 88*(7), 795–797. https://doi.org/10.1097/OPX.0b013e3182198792 – reale Sehabstände am Smartphone (32–36 cm)
- Yu, X., Omar Dev, R. D., & Harun, M. M. (2026). Effect of variable priority cognitive-motor dual-task training on cognitive and physical function in older adults: A systematic review. *Brain Sciences, 16*(3), 308. https://doi.org/10.3390/brainsci16030308 – wechselnde Priorität, Vorteil nicht gesichert (aus Literaturbasis übernommen)
