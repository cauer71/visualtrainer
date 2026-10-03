---
# ===== Kennung =====
nr: 701
kennung: rapid-tapping
name: "Tipp-Tempo (schnelles Tippen auf eine Kugel)"
name_original: "CPS-Test | Klickgeschwindigkeit messen (CPS Test – Click speed test)"
kapitel: "Motorik"
kapitel_original: "motor"
unterkapitel_original: "movement-speed"
quelle_url: "https://skilldrills.online/de/drills/motor/movement-speed/rapid-tapping"
blickfit_umsetzung: {kennung: "tipp-tempo", name: "Tipp-Tempo", unterschiede: "Tablet-Umsetzung für Touch: große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/tipp-tempo/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "In der Bildmitte liegt eine große Kugel. Man tippt oder klickt in drei kurzen Runden mit Pausen so schnell wie möglich auf sie; es zählt immer nur ein Finger. Gezeigt werden die Tipps pro Sekunde und der Abfall von Runde zu Runde."
ziel_funktionen: [fingergeschwindigkeit]
eingabe: [maus, touch, touchpad]
tablet_geeignet: mit_anpassung
dauer_sekunden: 45
schwierigkeit_anpassung: "Kein Levelsystem. Schrumpftempo startet bei 45 px/s und steigt nach je 10 Treffern (1 Punkt) bei Punkteständen, die durch 5/10/20/30 teilbar sind, um ×1,08/×1,10/×1,12/×1,15 (Obergrenze 600 px/s, bei realistischen 3–14 Klicks/s aber nur ≈ 54–145 px/s erreicht; eigene Simulation nach Code). Radius +10 px je Treffer (max. 140 px); bei Radius 0 Reset auf 45 px ohne Punkt- oder Zeitabzug. Schrumpfen und Reset laufen nur, solange die globale Zeitdruck-Einstellung der Seite aktiv ist (Standard: an)."
messgroessen: ["Treffer-Klicks gesamt und Mittelwert Klicks/s (Treffer ÷ 45 s)", "Punkte (= Treffer ÷ 10, abgerundet)", "laufende Klickrate (Treffer der letzten 2 s ÷ 2)", "sinnvoll ergänzend: Klickrate je 5- oder 10-s-Abschnitt (Ermüdungsabfall in %)", "sinnvoll ergänzend: Streuung der Intervalle zwischen Klicks (ms, Gleichmäßigkeit)", "sinnvoll ergänzend: Vergleich rechte/linke Hand"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 0
    nutzbares_sehfeld: 0
    blickfolge: 0
    sakkaden: 0
    fixation: 1
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 0
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 0
    inhibition: 0
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 0
    antizipation: 0
    entscheidung_wahlreaktion: 0
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 0
    zielbewegung_tempo: 0
    zielbewegung_praezision: 1
    kontinuierliche_steuerung: 0
    ruhige_hand: 1
    fingergeschwindigkeit: 3
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 1
belastung:
  zeitdruck: 2
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 1
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Beschwerdefreie Finger, Hand und Unterarm (45 s Tippen mit Höchsttempo)", "Maus mit fester Unterlage oder Tablet stabil aufgestellt (nicht in der Hand halten)", "Keine Farb- oder Detailwahrnehmung nötig; Kugel ist groß (Ø ≈ 2,6° zu Beginn)"]
vorsicht_bei: [hand_arm_beschwerden, tremor_parkinson, photosensitive_epilepsie, migraene_lichtempfindlich, gelenk_ruecken]
geeignet_fuer: ["einfaches, sprachfreies Motorik-Spiel zum Einstieg: Tipp- oder Klicktempo spielerisch erleben", "eigenen Fortschritt im Tipptempo am selben Gerät verfolgen (Übungseffekt ist belegt)", "kurzer Einstieg vor anderen Maus-/Touch-Übungen (702, 704, 708) – in kurzen Runden mit Pausen, weil schnelles Tippen rasch ermüdet", "Kinder ab Schulalter und Jugendliche mit Spaß an schnellen Aufgaben"]
weniger_geeignet_fuer: ["Menschen mit Sehnenscheiden-, Karpaltunnel-, Daumen- oder Handgelenkbeschwerden", "Menschen mit Tremor oder Parkinson (Frustgefahr; Tippen ist dort ein klinisches Untersuchungsitem, diese Übung ist kein Test und leitet nichts daraus ab)", "Ziele im Bereich Sehen oder Blickmotorik (die Übung fordert die Augen praktisch nicht)", "Vergleich mit anderen Personen oder Geräten (Technik und Geräteunterschiede verfälschen)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Tipptempo verbessert sich bei Gesunden schon nach drei Durchgängen und steigt mit stündlichem Üben über 26 h weiter (Nutt et al., 2000; Wechseltippen) und ist zuverlässig messbar (r = 0,91; Hubel, Yund et al., 2013); dass Tipptraining andere Fertigkeiten oder den Alltag verbessert, ist nicht untersucht bzw. nicht belegt (Lernspezifität: Karni et al., 1995)."
aehnliche_uebungen: [703, 708]
stichworte: ["Finger-Tapping", "CPS", "Klicks pro Sekunde", "Klickgeschwindigkeit", "Tipptempo", "motorische Ermüdung", "Jitter-Clicking", "Butterfly-Clicking", "Fingerausdauer", "Touch-Tippen"]
---

# 701 · Klick-Tempo (schnelles Tippen auf eine Kugel)

> Original: „CPS-Test | Klickgeschwindigkeit messen“ (englisch „CPS Test – Click speed test“) – skilldrills.online, Kapitel Motorik (`motor`, Unterkapitel `movement-speed`) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

In der Bildmitte liegt eine große orange Kugel. Man tippt (mit dem Finger oder der Maus) oder drückt die Leertaste so schnell wie möglich; jeder Tipp lässt die Kugel kurz ein wenig größer werden. Die Übung besteht aus drei Runden zu je 20 Sekunden mit jeweils 20 Sekunden Pause, davor läuft ein Countdown von 3 bis 1. Es zählt immer nur ein Finger gleichzeitig; ein Tipp daneben zählt nicht, kostet aber nichts. Die Kugel schrumpft nie, ein Ring um sie zeigt die Restzeit, und die laufende Rate erscheint in Tipps pro Sekunde. Am Ende stehen die Tipps pro Runde (Mittel), die beste Runde und der Abfall von der ersten zur letzten Runde. Zielen muss man kaum – die Übung betrifft fast nur das Fingertempo und die Ermüdung der Hand.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spielcode (Chunks `98840-…js`, `26081-…js`; gelesen am 29.09.2026, nur Mechanik übernommen). **[Code]** = aus dem Code, **[Text]** = nur aus dem Regeltext.

- **Start:** Countdown 3-2-1-GO (≈ 2,6 s), dann 45 s Spielzeit **[Code]**. Escape oder Verlust der Zeigersperre beendet/pausiert.
- **Kugel:** immer in der Mitte der Zeichenfläche (Standard 800 × 450 logische px, passt sich der Containerbreite an). Startradius 50 px (Ø 100 px), Höchstradius 140 px, schwacher Umrissring bei 140 px **[Code]**. Farbe grün (#10b981; heller #34d399 ab ≥ 10 Klicks/s oder ≥ 20 Punkten), **rot**, sobald der Radius < 28 % des Maximums (< 39 px) fällt – die Größe zeigt dieselbe Information, Farbe ist also nicht allein tragend **[Code]**.
- **Treffer:** zählt, wenn der Zeiger ≤ Radius + 18 px vom Mittelpunkt entfernt ist (Trefferzone mindestens 18 px Radius, auch bei „leerer“ Kugel). Treffer: Radius +10 px, Zeitstempel über `performance.now()` **[Code]**. Daneben: Fehlerton und roter Blitz, aber **kein Abzug** **[Code]**.
- **Punkte und Schwierigkeit:** 1 Punkt je 10 Treffer. Schrumpftempo startet bei 45 px/s; bei Punkteständen, die durch 30/20/10/5 teilbar sind, ×1,15/×1,12/×1,10/×1,08, gedeckelt bei 600 px/s **[Code]**. Gleichgewicht (Kugel bleibt gleich groß) bei Klickrate = Schrumpftempo ÷ 10 px, also anfangs **4,5 Klicks/s**, nach 200 Treffern ≈ 6,5/s [eigene Berechnung]. Nach eigener Simulation der Code-Regeln erreicht man bei konstant 3/6/10/14 Klicks/s ein Endtempo von ≈ 54/70/105/143 px/s; die auf der Seite beworbenen **600 px/s werden bei realistischen Raten nie erreicht** [eigene Simulation].
- **„Straf-Reset“:** Erreicht der Radius 0, springt er auf 45 px zurück (nur bei aktiver globaler Zeitdruck-Einstellung „timeout“, Standard an; ist sie aus, schrumpft die Kugel gar nicht) **[Code]**, mit Fehlerton, rotem Blitz und Bildwackeln (12 px). Der englische Regeltext verspricht einen „time penalty“ – **im Code gibt es weder Zeit- noch Punktabzug** (Widerspruch Text ↔ Code). Die Punkte hängen damit **nur von der Zahl der Treffer** ab; das Schrumpfen ist reine Rückmeldung, außer dass die Trefferzone kleiner wird.
- **Auswertung:** Mittel-CPS = Treffer ÷ 45 s; die angezeigte **„Spitzen-CPS“ ist im Code identisch mit dem Mittelwert** (keine echte Spitze, kein 5-s-Wert wie in der Tabelle der Seite). Laufende Anzeige: Treffer der letzten 2 s ÷ 2. Bestwerte nur lokal im Browser (localStorage) **[Code]**.
- **Noten [Code]:** S+ bei ≥ 60 Punkten oder ≥ 11 CPS; S ≥ 40 P. oder ≥ 9; A ≥ 25 P. oder ≥ 7; B ≥ 15 P. oder ≥ 5; C ≥ 5 P. oder ≥ 3; sonst D. Da 25 Punkte = 250 Treffer = 5,6 CPS sind, entscheidet faktisch die Punktschwelle: „PRO TAPPER“ (A) schon ab ≈ 5,6 CPS, S ab ≈ 8,9, B ab ≈ 3,3 [eigene Berechnung]. Diese Noten passen nicht zur „Tier“-Tabelle der Seite (dort 6–8,9 CPS = „Top 50 % Durchschnitt“).
- **Eingabe [Code]:** `pointerdown` auf der Zeichenfläche, **ohne Prüfung der Maustaste** – linke und rechte Taste zählen gleich (Kontextmenü wird unterdrückt), wechselseitiges Klicken mit zwei Tasten erhöht also die Rate. Am Desktop Zeigersperre (Pointer Lock), Fadenkreuz startet in der Mitte und bewegt sich mit der Maus (Empfindlichkeit 0,1–3). Auf Geräten mit Touch und ohne feinen Zeiger keine Sperre: der Tipport ist der Zielort. **Jeder Finger erzeugt ein eigenes `pointerdown`** – Mehrfinger-Trommeln zählt voll (FAQ wirbt ausdrücklich mit Multitouch).
- **Zeitbasis:** Schrumpfen und Uhr rechnen mit der echten Bildzeit (Δt, begrenzt auf 0,1 s) → unabhängig von 60/144 Hz. Nur bei stark ruckelnden Geräten (> 100 ms pro Bild) läuft die Spieluhr langsamer als die echte Zeit.
- **Effekte:** Partikel, Trefferringe, Bildwackeln 6 px je Punkt; roter Blitz = halbtransparenter radialer Rotverlauf (50 % Deckkraft) über dem Spielfeld, 0,45 s Ausblendung, bei **jedem** Fehlklick – bei schnellem Danebenklicken also mehrere Blitze pro Sekunde (abschaltbar über eine globale Einstellung) **[Code/CSS]**.

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite beschreibt die Übung als Messung der „maximalen Feuerrate Ihres neuromuskulären Signalwegs“ für Minecraft-PvP, MOBAs und Taktik-Shooter. Normales Tippen erreiche 5–7 CPS (Halstead 1947; Todor & Kyprie 1980), Jitter- und Butterfly-Clicking 12–20+ CPS; „zentralnervöse Refraktärzeiten“ begrenzten den Zeigefinger bei 5,5–7 Hz. Versprochen werden „Stärkung der Unterarmsehnen, schnellere motorische Aktivierung, verzögerte Ermüdung“; Protokolle sollen „Laktatbildung verzögern“ und empfehlen, die Maus-Entprellzeit (Debounce) auf 0–4 ms zu stellen. Eine „Offizielle CPS-Rangliste“ ordnet Werte von „Top 0.1 % Weltklasse“ bis „Basis 20 % Einsteiger“.

**Einordnung:**
- **Größenordnung stimmt:** Gesunde Erwachsene tippen mit einem Finger etwa 5–7-mal pro Sekunde (Hubel, Reed et al., 2013; Smartphone-Wechseltippen ≈ 5,5 Tipps/s bei Kontrollen, Lee et al., 2016; 50–70-Jährige im Mittel 5,2 Hz über 30 s, Heimhofer et al., 2024). Die Normzahl „50–55 Taps/10 s“ ist in Halstead (1947) selbst nicht prüfbar.
- **„Refraktärzeiten“ sind nicht belegt:** Todor & Kyprie (1980) zeigen nur Handunterschiede in Tempo und Gleichmäßigkeit. Es gibt Hinweise auf einen gemeinsamen, eher zentralen Ratenbegrenzer über Muskelgruppen hinweg (Finger- und Fußtempo korrelieren; Keele & Hawkins, 1982) – eine feste Hz-Grenze folgt daraus nicht.
- **Werte > 10 CPS messen keine Fingergeschwindigkeit mehr**, sondern Technik: Zwei Finger, zwei Tasten oder mehrere Touch-Finger verteilen die Klicks (Aoki et al., 2003: beim Zwei-Finger-Wechseltippen sinkt die Rate je Finger). Zur Physiologie von Jitter-Clicking („isometrische Ko-Kontraktion“) gibt es keine Fachliteratur.
- **Gesundheitsversprechen sind unbelegt** („stärkt Sehnen“, „verzögert Laktat“ – für kurze Fingersprints ohne Quelle und physiologisch nicht plausibel begründet). Belegt ist eher Belastung: Handgelenk-/Handschmerzen bei 36 %/32 % von 65 befragten College-E-Sportlern (Selbstauskunft; DiFrancisco-Donoghue et al., 2019). Schnelles Tippen führt schon nach 10–30 s zu Ermüdung mit zentraler (intrakortikaler) Komponente (Arias et al., 2015).
- **Debounce 0–4 ms** kann Prellen des Schalters als Doppelklick zählen lassen – das erhöht die Zahl, nicht das Können.
- **Rangliste ohne Datengrundlage:** Die Seite sagt selbst, sie sammle keine Leistungsdaten. „Top 0.1 %“ usw. steht in keiner der genannten Quellen; auch die Spielnoten widersprechen der Tabelle (Abschnitt 2).
- **Woods et al. (2015)** wird für Bildfrequenz und Polling angeführt; die Zeiten 16,7/6,9/4,1 ms sind nur 1/f, die Studie nutzte einen 60-Hz-Monitor. Für eine reine **Zählaufgabe** spielen Latenzen ohnehin kaum eine Rolle.

## 4. Optische und okulomotorische Grundlagen

Die Übung stellt kaum Anforderungen an das Sehen. Die Kugel ist groß und steht still in der Bildmitte; die Trefferzone ist größer als die Kugel selbst (1,3-facher Radius). Zur Orientierung: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°. Sehschärfe, Kontrast und Farbe begrenzen die Leistung nicht; der Blick ruht auf der Mitte (leichte Fixation), Augenbewegungen werden nicht gebraucht.

**Brille:** Da alles in der Bildmitte liegt, ist die Übung auch mit Gleitsichtgläsern unproblematisch, sofern die Bildmitte im scharfen Bereich liegt (Monitor eher tief; Weidling & Jaschinski, 2015). Am Tablet (etwa 40 cm, 2,5 dpt Akkommodationsbedarf) genügt bei Alterssichtigkeit die übliche Lesebrille. **Trockenes Auge:** Konzentriertes Starren senkt den Lidschlag (bei Bildschirmarbeit im Mittel fünffach weniger; Patel et al., 1991) – bei Wiederholungen Pausen einlegen. **Lichtreize:** Es gibt keine roten Blitze und kein Bildwackeln. Bei jedem Tipp springt die Kugel kurz um wenige Prozent in der Größe (nicht in der Helligkeit; bei „Bewegung reduzieren“ entfällt das); bei 5–7 Tipps pro Sekunde folgen diese kleinen Größensprünge entsprechend dicht aufeinander, werden aber vom Tippenden selbst ausgelöst. Der Expertenkonsens nennt ≥ 3 Blitze pro Sekunde und gesättigtes Rot als Risiko (Harding et al., 2005); hier ändert sich die Helligkeit nicht.

## 5. Neurowissenschaftliche Grundlagen

Fingertippen aktiviert zuverlässig den primären sensomotorischen Kortex (gegenseitig zur Hand), das supplementär-motorische Areal, prämotorische und untere parietale Areale, Basalganglien und das vordere Kleinhirn (ALE-Metaanalyse, 38 Studien; Witt et al., 2008). Dass die maximale Wiederholrate zwischen Finger und Fuß korreliert, spricht für einen zentralen Taktgeber bzw. Ratenbegrenzer (Keele & Hawkins, 1982). Die Ermüdung bei kurzem Höchsttempo-Tippen (10–30 s) zeigt sich in verlängerten kortikalen Hemmungsphasen nach Magnetstimulation, also in **intrakortikalen** Hemmschaltkreisen; die Antwort auf Stimulation am Halsmark blieb unverändert, anders als bei isometrischer Kraft (Arias et al., 2015; kleine Laborstudie). Eine gezielte Stärkung bestimmter Hirnregionen durch diese Übung ist nicht belegt.

## 6. Motorische Grundlagen

- **Tempo je Finger:** Der Zeigefinger ist am schnellsten, dann Mittel-, Klein-, Ringfinger (Aoki et al., 2003); die dominante Hand tippt schneller und gleichmäßiger, vor allem in der Drückphase (Todor & Kyprie, 1980).
- **Ermüdung:** Über 30 s Höchsttempo sinkt die Rate um etwa 17 % (junge 17,0 ± 6,9 %, 50–70-Jährige 16,5 ± 7,5 %; n = 370, Smartphone; Heimhofer et al., 2024); auch über drei 10-s-Blöcke sinkt sie (Hubel, Reed et al., 2013). Deshalb besteht die Übung aus drei Runden zu 20 s mit Pausen, und der Abfall zwischen erster und letzter Runde wird offen gezeigt.
- **Alter und Geschlecht:** Ältere tippen mit allen Fingern langsamer, nicht durch Kraft oder Tastsinn erklärt (Aoki & Fukuoka, 2010); Männer sind im Mittel schneller, Ältere variabler (Hubel, Reed et al., 2013).
- **Technik-Ausweichen:** Zwei Finger, zwei Maustasten oder mehrere Touch-Finger verteilen die Klicks und umgehen so die Einzelfinger-Grenze (Aoki et al., 2003, zeigen, dass beim Zwei-Finger-Wechseltippen das Tempo je Finger sinkt, n = 12 Männer). Deshalb zählt in dieser Übung nur ein Finger gleichzeitig; weitere aufliegende Finger werden nicht gewertet, die Leertaste zählt wie ein Tipp.
- **Zielen:** Nur minimal – auf Touch muss der Tipp in der Trefferzone landen, am Desktop die Maus beim Klicken ruhig bleiben. Bei Zielen von 7,2 mm lag die Fehlerrate bei 3–6 % (Bi et al., 2013); die Trefferzone ist hier deutlich größer.
- **Belastung:** Mausnutzung über 20 Stunden pro Woche ging mit einem erhöhten Risiko für ein mögliches Karpaltunnelsyndrom (Fragebogen) einher; insgesamt war es selten, Computerarbeit gilt dort nicht als ernstes Berufsrisiko (Andersen et al., 2003). Kurze Runden mit Pausen sind unkritisch, gehäufte Wiederholungen mit Kraft nicht; bei Schmerzen in Hand oder Fingern aufhören. Bei College-E-Sportlern berichteten 36 % von Handgelenk- und 32 % von Handschmerzen (Selbstauskunft, n = 65; DiFrancisco-Donoghue et al., 2019).

## 7. Einflussfaktoren und Messgrenzen

- **Gerät:** Maus (Tastenweg, Entprellung), Touchpad (Klicken per Tipp oder Druck) und Touchscreen (der Finger muss ganz abheben) ergeben unterschiedliche Raten; Werte nur am selben Gerät vergleichen. Zwei Geräte können hoch korrelieren und trotzdem systematisch voneinander abweichen – Korrelation ist nicht Übereinstimmung (zum Grundsatz aus der Messmethodik: Mountford et al., 2004, S. 24). Latenzen (Woods et al., 2015; Wimmer et al., 2019) verschieben Zeitpunkte, verändern aber die **Zahl** der Tipps kaum.
- **Technik:** Weil nur ein Finger gewertet wird, misst der Wert das Tempo eines Fingers; wer die Technik wechselt, verändert das Ergebnis.
- **Hand, Finger, Haltung:** dominante oder nicht dominante Hand, Unterarm aufgelegt oder nicht, Tablet liegend oder stehend.
- **Alter, Müdigkeit, Kälte der Hände, Aufwärmen, Motivation** (Hubel, Reed et al., 2013; Heimhofer et al., 2024).
- **Zuverlässigkeit:** Die computergestützte Tipprate ist gut wiederholbar (r = 0,91; Hubel, Yund et al., 2013), aber nach den ersten Durchgängen steigt sie durch Übung (Nutt et al., 2000) – erste Werte nicht als „Basis“ überbewerten. Messungen am Menschen streuen stärker als an Prüfkörpern (Mountford et al., 2004, S. 43–44); aussagekräftiger als ein Einzelwert ist der Median über mehrere Sitzungen.
- **Auswertung:** Ausgewiesen werden Tipps pro Runde (Mittel), die beste Runde und der Abfall von der ersten zur letzten Runde; es gibt keine Noten, Ranglisten oder Normwerte.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** Gesunde tippen schon nach drei Durchgängen schneller (n = 100) und werden mit stündlichem Üben über 26 h (19 Durchgänge, n = 14) weiter schneller (Nutt et al., 2000; Wechseltippen auf zwei Zähler, nicht Einzelfinger-Klicken); Übungskurven sind typisch (auch Karni et al., 1995, für Fingerfolgen).
- **Naher Transfer – schwach:** Der gemeinsame Ratenbegrenzer (Keele & Hawkins, 1982) lässt Transfer auf andere schnelle Wiederholbewegungen denkbar erscheinen; Trainingsstudien dazu fehlen. Beim Training einer Fingerfolge war der Gewinn spezifisch für die geübte Folge und übertrug sich kaum auf eine andere Folge derselben Hand (Karni et al., 1995; Fingerfolgen, nicht Einzeltippen).
- **Alltagstransfer – fehlend:** Kein Beleg, dass Tipptraining Schreiben, Handgeschick oder Spielleistung verbessert; auch Videospieltraining allgemein zeigt keine kausalen kognitiven Gewinne (Sala et al., 2018).
- **Klinischer Kontext:** Fingertippen geht auf den Finger-Oscillation-Test von Halstead (1947) zurück, ist Item der Parkinson-Skala MDS-UPDRS (Goetz et al., 2008), und Smartphone-Tippen wird zur Erfassung der Bradykinese erforscht (Lee et al., 2016). Daraus folgt **kein** Einsatz als Screening: Die Übung deutet niedrige Werte nicht und stellt keine Diagnose. Tipprate gesunder Erwachsener mit einem Finger: etwa 5–7 pro Sekunde (Hubel, Reed et al., 2013; Lee et al., 2016: Smartphone-Wechseltippen etwa 5,5 pro Sekunde bei Kontrollen; Heimhofer et al., 2024: 50–70-Jährige im Mittel 5,2 Hz über 30 s).

## 9. Auswahlhinweise

- **Passt, wenn …** jemand ein kurzes, sprachfreies, visuell anspruchsloses Motorik-Spiel möchte; als Aufwärmen vor Zielübungen; zum Vergleich mit sich selbst am selben Gerät; für Kinder ab Schulalter und Jugendliche. Auch für Menschen mit eingeschränktem Sehen geeignet, da das Ziel groß und zentral ist.
- **Weniger passend, wenn …** Ziele im Bereich Sehen, Blickfolge, Aufmerksamkeit oder Genauigkeit bestehen (andere Übungen wählen); wenn Personen sich mit anderen messen wollen (Werte technik- und geräteabhängig).
- **Vorsicht / anpassen bei …**
  - `hand_arm_beschwerden`: Höchsttempo belastet Sehnen und Handgelenk; bei Schmerz abbrechen, Pausen nutzen. Taubheit oder Schwäche in Hand und Arm gelten als Anlass zur ärztlichen Abklärung (vgl. Muchnick, 2008, S. 28).
  - `tremor_parkinson`: Tippen ist dort ein Untersuchungsitem und oft verlangsamt, daher Frustgefahr; keine Bewertung durch die Übung.
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: keine Blitze, kein rotes Aufleuchten, kein Bildwackeln; aber bei jedem Tipp ein kleiner Größensprung der Kugel, der bei schnellem Tippen dicht aufeinander folgt; vorsorglich gelistet, bei Beschwerden abbrechen.
  - `gelenk_ruecken`: Fingergelenk-Arthrose oder Rheuma – nur ohne Kraft und mit Pausen.
  - Allgemein: Bei Doppelbildern, plötzlichem Sehverlust, Schwindel oder Kopfschmerz mit Sehverschlechterung die Übung abbrechen und ärztlich abklären lassen (vgl. Muchnick, 2008, S. 6, 28).
- **Kombiniert gut mit …** 703 (Tastenreaktion), 708 (schnelle Klickfolge auf ruhende Ziele), 702/704/804 (Zielen unter Zeitdruck – dort begrenzt die Zielbewegung, nicht das Fingertempo), 705/808 (ruhige Hand als ruhiger Gegenpol).
- **Abgrenzung:** Im Katalog ist 701 die einzige Übung, in der das reine Fingertempo (`fingergeschwindigkeit` = 3) begrenzt; in 708 und 804 wird zwar schnell geklickt, begrenzend sind dort aber Zielbewegung und Zeitlimit. Eine Dublette gibt es nicht.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Messung ehrlich machen:** nur **einen** Finger bzw. eine Taste werten (weitere gleichzeitige Touch-Punkte und rechte Maustaste ignorieren oder getrennt ausweisen); echte Spitzenrate (bester 5-s-Abschnitt) und Abfall in % zwischen erstem und letztem Drittel zeigen; Gleichmäßigkeit (Intervallstreuung) anzeigen.
- **Kürzer und dosiert:** z. B. 3 × 10 s je Hand mit 20–30 s Pause (angelehnt an Hubel, Reed et al., 2013) statt 45 s Dauerbelastung; Hinweis „bei Schmerz aufhören“; keine Jitter-/Butterfly-/Debounce-Tipps.
- **Keine Ranglisten, keine „Elite“-Noten:** nur eigener Verlauf am selben Gerät; Gerät (Maus/Touch) mitspeichern.
- **Tablet (Hauptgerät):** Tippen funktioniert auf Touch gut – große Trefferzone (Ø ≥ 20 mm, nicht schrumpfend unter ≈ 10 mm), Kugel so groß, dass sie seitlich unter dem Finger sichtbar bleibt; Tablet auf stabile Unterlage (Tippen bringt stehende Tablets ins Wackeln); Doppeltipp-Zoom unterdrücken. Der Finger verdeckt die Kugelmitte – die Rückmeldung sollte über den Rand/Ring und Ton kommen.
- **Sicherheit/Barrierefreiheit:** keine roten Vollflächenblitze, kein Bildwackeln; Fehler leise anzeigen; Farbe nie allein tragend; Beschreibung ohne Gesundheitsversprechen („trainiert Sehnen“ streichen).
- **Keine Diagnostik:** keine Aussagen zu Parkinson, Tremor oder „neuromuskulärer Feuerrate“.

## 11. Quellen

### Von der Website angegeben

- Halstead, W. C. (1947). *Brain and intelligence: A quantitative study of the frontal lobes.* University of Chicago Press. – **Prüfung:** Buch, keine DOI; Existenz über APA PsycNET (Datensatz 1948-01497-000) bestätigt ✓; **stützt die Aussage der Website:** teilweise – Halstead führte den Finger-Oscillation-Test ein; die Norm „50–55 Taps/10 s“ ist darin nicht prüfbar, die Größenordnung ist durch neuere Daten plausibel (Lee et al., 2016).
- Todor, J. I., & Kyprie, P. M. (1980). Hand differences in the rate and variability of rapid tapping. *Journal of Motor Behavior, 12*(1), 57–62. https://doi.org/10.1080/00222895.1980.10735205 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise/nein – zeigt schnellere und gleichmäßigere Intervalle der dominanten Hand (n = 24); zu „zentralnervösen Refraktärzeiten“ oder einer 5,5–7-Hz-Grenze keine Aussage.
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓ (Volltext PMC4374455 geprüft); **stützt die Aussage der Website:** teilweise – 16,7/6,9/4,1 ms sind Arithmetik (1/f); die Studie nutzte nur 60 Hz (Monitorverzögerung 11,0 ms, Monitor + Maus 17,8 ms); 144/240 Hz kommen nicht vor.

### Weitere Fachliteratur

- Aoki, T., Francis, P. R., & Kinoshita, H. (2003). Differences in the abilities of individual fingers during the performance of fast, repetitive tapping movements. *Experimental Brain Research, 152*(2), 270–280. https://doi.org/10.1007/s00221-003-1552-z – Fingerunterschiede, Zwei-Finger-Wechseltippen.
- Aoki, T., & Fukuoka, Y. (2010). Finger tapping ability in healthy elderly and young adults. *Medicine & Science in Sports & Exercise, 42*(3), 449–455. https://doi.org/10.1249/MSS.0b013e3181b7f3e1 – Alterseffekt.
- Andersen, J. H., Thomsen, J. F., Overgaard, E., Lassen, C. F., Brandt, L. P. A., Vilstrup, I., Kryger, A. I., & Mikkelsen, S. (2003). Computer use and carpal tunnel syndrome: A 1-year follow-up study. *JAMA, 289*(22), 2963–2969. https://doi.org/10.1001/jama.289.22.2963 – Belastung durch Mausarbeit.
- Arias, P., Robles-García, V., Corral-Bergantiños, Y., Madrid, A., Espinosa, N., Valls-Solé, J., Grieve, K. L., Oliviero, A., & Cudeiro, J. (2015). Central fatigue induced by short-lasting finger tapping and isometric tasks: A study of silent periods evoked at spinal and supraspinal levels. *Neuroscience, 305*, 316–327. https://doi.org/10.1016/j.neuroscience.2015.07.081 – zentrale Ermüdung nach 10–30 s Tippen (Crossref ✓, Abstract).
- Bi, X., Li, Y., & Zhai, S. (2013). FFitts law. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems* (S. 1363–1372). ACM. https://doi.org/10.1145/2470654.2466180 – Fehlerraten bei kleinen Touch-Zielen
- DiFrancisco-Donoghue, J., Balentine, J., Schmidt, G., & Zwibel, H. (2019). Managing the health of the eSport athlete: An integrated health management model. *BMJ Open Sport & Exercise Medicine, 5*(1), e000467. https://doi.org/10.1136/bmjsem-2018-000467 – Hand-/Handgelenkbeschwerden bei E-Sportlern.
- Goetz, C. G., Tilley, B. C., Shaftman, S. R., Stebbins, G. T., Fahn, S., Martinez-Martin, P., … LaPelle, N. (2008). Movement Disorder Society-sponsored revision of the Unified Parkinson's Disease Rating Scale (MDS-UPDRS). *Movement Disorders, 23*(15), 2129–2170. https://doi.org/10.1002/mds.22340 – Fingertippen als klinisches Item (nur Vorsicht).
- Harding, G., Wilkins, A. J., Erba, G., Barkley, G. L., & Fisher, R. S. (2005). Photic- and pattern-induced seizures: Expert consensus of the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1423–1425. https://doi.org/10.1111/j.1528-1167.2005.31305.x – Grenzwerte für Blitze.
- Heimhofer, C., Neumann, A., Odermatt, I., Bächinger, M., & Wenderoth, N. (2024). Finger-specific effects of age on tapping speed and motor fatigability. *Frontiers in Human Neuroscience, 18*, 1427336. https://doi.org/10.3389/fnhum.2024.1427336 – Ermüdungsabfall ≈ 17 % in 30 s, Altersvergleich (Crossref ✓, Volltext).
- Hubel, K. A., Reed, B., Yund, E. W., Herron, T. J., & Woods, D. L. (2013). Computerized measures of finger tapping: Effects of hand dominance, age, and sex. *Perceptual and Motor Skills, 116*(3), 929–952. https://doi.org/10.2466/25.29.PMS.116.3.929-952 – Normdaten (n = 1.519), Hand, Alter, Geschlecht, Ermüdung.
- Hubel, K. A., Yund, E. W., Herron, T. J., & Woods, D. L. (2013). Computerized measures of finger tapping: Reliability, malingering and traumatic brain injury. *Journal of Clinical and Experimental Neuropsychology, 35*(7), 745–758. https://doi.org/10.1080/13803395.2013.824070 – Test-Retest r = 0,91.
- Karni, A., Meyer, G., Jezzard, P., Adams, M. M., Turner, R., & Ungerleider, L. G. (1995). Functional MRI evidence for adult motor cortex plasticity during motor skill learning. *Nature, 377*(6545), 155–158. https://doi.org/10.1038/377155a0 – Lernspezifität schneller Fingerfolgen.
- Keele, S. W., & Hawkins, H. L. (1982). Explorations of individual differences relevant to high level skill. *Journal of Motor Behavior, 14*(1), 3–23. https://doi.org/10.1080/00222895.1982.10735259 – gemeinsamer Ratenbegrenzer über Muskelgruppen.
- Lee, C. Y., Kang, S. J., Hong, S.-K., Ma, H.-I., Lee, U., & Kim, Y. J. (2016). A validation study of a smartphone-based finger tapping application for quantitative assessment of bradykinesia in Parkinson's disease. *PLOS ONE, 11*(7), e0158852. https://doi.org/10.1371/journal.pone.0158852 – Touch-Tipprate Gesunder ≈ 5,5/s.
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Messwerte streuen, Wiederholmessung sinnvoll (S. 44)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2. Aufl.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28)
- Nutt, J. G., Lea, E. S., Van Houten, L., Schuff, R. A., & Sexton, G. J. (2000). Determinants of tapping speed in normal control subjects and subjects with Parkinson's disease: Differing effects of brief and continued practice. *Movement Disorders, 15*(5), 843–849. https://doi.org/10.1002/1531-8257(200009)15:5<843::AID-MDS1013>3.0.CO;2-2 – Übungseffekt beim Wechseltippen (3 Durchgänge n = 100; 26 h Üben n = 14).
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science*, 68(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm
- Sala, G., Tatlidil, K. S., & Gobet, F. (2018). Video game training does not enhance cognitive ability: A comprehensive meta-analytic investigation. *Psychological Bulletin, 144*(2), 111–139. https://doi.org/10.1037/bul0000139 – fehlender Ferntransfer.
- Weidling, P., & Jaschinski, W. (2015). The vertical monitor position for presbyopic computer users with progressive lenses: How to reach clear vision and comfortable head posture. *Ergonomics*, 58(11), 1813–1829. https://doi.org/10.1080/00140139.2015.1035764 – Monitorhöhe bei Gleitsichtgläsern
- Wimmer, R., Schmid, A., & Bockes, F. (2019). On the latency of USB-connected input devices. In *Proceedings of the 2019 CHI Conference on Human Factors in Computing Systems* (S. 1–12). ACM. https://doi.org/10.1145/3290605.3300650 – Latenz von Eingabegeräten
- Witt, S. T., Laird, A. R., & Meyerand, M. E. (2008). Functional neuroimaging correlates of finger-tapping task variations: An ALE meta-analysis. *NeuroImage, 42*(1), 343–356. https://doi.org/10.1016/j.neuroimage.2008.04.025 – beteiligte Hirnnetzwerke.
