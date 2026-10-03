---
# ===== Kennung =====
nr: 702
kennung: aim-trainer
name: "Zielklicken – bewegte Ziele antippen oder anklicken"
name_original: "Aim Trainer Online (Seitentitel: Aim Trainer online | Mauspräzision testen)"
kapitel: "Motorik"
kapitel_original: "motor"
unterkapitel_original: "hand-eye-coordination"
quelle_url: "https://skilldrills.online/de/drills/motor/hand-eye-coordination/aim-trainer"
blickfit_umsetzung: {kennung: "ziel-klicken", name: "Ziele erwischen", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/ziel-klicken/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Zwei bis fünf Kreise wandern geradlinig über den Bildschirm, prallen weich am Rand ab und werden größer und kleiner. Man tippt oder klickt sie an; mit jeder Stufe werden sie schneller, kleiner und zahlreicher."
ziel_funktionen: [auge_hand_koordination, zielbewegung_tempo, zielbewegung_praezision]
eingabe: [maus, touchpad]
tablet_geeignet: mit_anpassung
dauer_sekunden: 45
schwierigkeit_anpassung: "Stufenlos nach Punkten (Code): Level = Punkte/1.750 + 1. Zielradius 26 px → Grenzwert 12 px (Level 15 ≈ 15 px), Tempo 80 → 370 px/s (Level 15 ≈ 300 px/s), Lebensdauer 2,8 → 0,4 s (Level 15 ≈ 1,0 s); eine lange Trefferserie macht die Ziele zusätzlich bis 15 % kleiner, 20 % schneller und 20 % kurzlebiger. 45 s Startzeit, jeder Treffer +2 s (max. 60 s), jeder Fehlklick/abgelaufene Ziel −1 s – die Runde dauert daher bei guter Leistung deutlich länger als 45 s."
messgroessen: ["Punkte", "Trefferquote (Treffer/Klicks)", "Treffer, Fehlklicks, abgelaufene Ziele", "längste Trefferserie", "erreichtes Level", "sinnvoll ergänzend: Erfassungszeit je Ziel, Endpunktversatz relativ zur Bewegungsrichtung (vor/hinter dem Ziel)"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 1
    blickfolge: 1
    sakkaden: 2
    fixation: 0
    bewegungswahrnehmung: 2
    visuelle_suche: 1
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 1
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 1
    antizipation: 2
    entscheidung_wahlreaktion: 1
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 3
    zielbewegung_tempo: 3
    zielbewegung_praezision: 3
    kontinuierliche_steuerung: 1
    ruhige_hand: 1
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 3
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Maus (oder Touchpad) und Pointer-Lock-fähiger Desktop-Browser; auf reinen Touch-Geräten lässt sich das Original nicht starten", "ruhige Unterlage, Monitor ca. 50–70 cm", "passende Korrektion für den Bildschirmabstand (bei Alterssichtigkeit Zwischen-/Nahkorrektur)", "kein Farbsehen nötig (Ziele hell auf fast schwarzem Grund)", "Vollbild und gesperrter Mauszeiger – Verlassen beendet die Runde"]
vorsicht_bei: [hand_arm_beschwerden, tremor_parkinson, presbyopie_gleitsicht, sehbehinderung_niedriger_visus, gesichtsfeldausfall, trockenes_auge_bildschirm, photosensitive_epilepsie, migraene_lichtempfindlich, kognitive_einschraenkung]
geeignet_fuer: ["schnelles und genaues Zeigen auf bewegte Ziele üben (Auge-Hand-Koordination unter Zeitdruck)", "spielerisches Üben mit Stufen und Trefferquote", "Fortschritt mit sich selbst am selben Gerät vergleichen (Trefferquote, Stufe)", "Aufbau nach ruhenden Zielen (708) und vor Mehrziel- oder Flick-Aufgaben (502, 704, 501)"]
weniger_geeignet_fuer: ["wer ruhige Zielbewegungen ohne bewegte Ziele üben möchte (dann 708)", "Menschen mit Tremor oder eingeschränkter Handmotorik (kleine, bewegte Ziele auf den höheren Stufen)", "Einsteiger:innen und Ältere mit wenig Erfahrung in Touch- oder Mausbedienung (mehrere bewegte Ziele, steigendes Tempo)", "wer eine Aufgabe ohne jeden Zeitdruck sucht (die Sitzung dauert fest 45 Sekunden)", "Übungsziel reine Blickmotorik ohne Hand (dafür Kapitel 400)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Zielbewegungen werden durch Übung in der geübten Aufgabe schneller und genauer (Übungskurven); Übertragung auf andere Aufgaben ist gering, ein Nutzen für Alltag, Beruf oder Spiele ist für diese Übung nicht untersucht."
aehnliche_uebungen: [704, 708, 104, 501, 502, 508, 302, 804, 509, 706]
stichworte: ["Aim Trainer", "Fitts'sches Gesetz", "bewegte Ziele", "moving target selection", "Auge-Hand-Koordination", "Zielbewegung", "Mauspräzision", "Speed-Accuracy-Trade-off", "Pointer Lock", "Combo"]
---

# 702 · Zielklicken – bewegte Ziele antippen oder anklicken

> Original: „Aim Trainer Online“ – skilldrills.online, Kapitel Motorik (`motor/hand-eye-coordination`) · Blickfit: noch nicht umgesetzt (verwandt: `zielfang` = bewegtes Ziel antippen, Vorbild 104)

## 1. Kurzbeschreibung

Zwei bis fünf Kreise, je nach Stufe, wandern gleichzeitig auf geraden Bahnen über das Spielfeld, prallen weich am Rand ab und werden dabei langsam größer und kleiner. Man tippt (mit dem Finger oder der Maus) dorthin, wo ein Kreis gleich ist, und trifft ihn mit einer Trefferfläche, die größer ist als der sichtbare Kreis. Ein getroffener Kreis wird nach kurzer Pause ersetzt; ein Tipp neben alle Kreise zeigt ein Kreuz. Drei Treffer in Folge führen eine Stufe höher (schneller, kleiner, mehr Kreise), ein Fehltipp eine Stufe tiefer. Die Sitzungsdauer ist fest (45 Sekunden), es gibt weder Zeitgutschrift noch Zeitstrafe. Gemessen werden Treffer, Trefferquote (Treffer geteilt durch alle Tipps) und die Zeit zwischen zwei Treffern (Median); wohin man schaut, wird nicht gemessen.

## 2. Ablauf im Original (Analyse)
Quelle: Seitentext und ausgelieferter Spielcode (Chunk 36738, Stand 29.09.2026; nur Mechanik übernommen).

- **Start/Eingabe (Code):** Countdown ≈ 2,45 s, dann Vollbild und **Pointer Lock**; das Fadenkreuz (Kreis 14 px Radius, Zentrum Ø 4 px) folgt den relativen Mausbewegungen × Empfindlichkeit (0,1–3, Standard 1). Verlassen von Vollbild/Pointer Lock oder Esc bricht ab. Auf Geräten mit Touch und ohne feinen Zeiger ersetzt die Seite den Startknopf durch „Mouse Required for Pointer Lock“ – **auf dem Tablet ohne Maus nicht spielbar**; Touchpads funktionieren.
- **Ziele (Code):** immer **2 gleichzeitig**, zufälliger Ort und Richtung, geradlinig mit Abprallen. Die Parameter hängen vom Fortschritt p = (Level − 1)/14 ab (ohne Obergrenze) und nähern sich exponentiell einem Grenzwert [Werte eigene Berechnung aus den Code-Formeln]:

  | Level (Punkte) | 1 (0) | 5 (7.000) | 9 (14.000) | 15 (24.500) | 25 (42.000) | Grenzwert |
  |---|---|---|---|---|---|---|
  | Radius sichtbar | 26 px | 23 px | 20 px | 15 px | 13 px | 12 px |
  | Tempo | 80 px/s | 139 px/s | 211 px/s | 301 px/s | 353 px/s | 370 px/s |
  | Lebensdauer | 2,8 s | 2,3 s | 1,7 s | 1,0 s | 0,54 s | 0,4 s |

  Ab 3 Treffern in Folge steigt ein Combo-Faktor stufenweise (1,1 … 3,0 ab 50 Treffern); er macht neue Ziele zusätzlich bis 15 % kleiner, 20 % schneller (max. ≈ 444 px/s) und 20 % kurzlebiger (min. ≈ 0,32 s).
- **Treffer und Punkte (Code):** Treffer, wenn der Klick ≤ **Radius + 8 px** vom Mittelpunkt liegt (Trefferzone größer als das sichtbare Ziel). Punkte je Treffer = 100 × Combo-Faktor × (1 + 0,5·p); Level = Punkte/1.750 + 1 (stufenlos). Getroffene Ziele werden sofort ersetzt.
- **Zeit und Strafen (Code):** Start 45 s; Treffer **+2 s** (max. 60 s). Fehlklick: Combo auf 0, Bildwackeln (6 px), roter Vollbild-Blitz 480 ms (abschaltbar), **−1 s**. Abgelaufenes Ziel (Standard: ein): ebenso Combo-Reset und −1 s. Zeitbilanz je Sekunde ≈ 2 × Treffer/s − 1 − Fehler/s: Wer mehr als ≈ 0,5 Treffer/s schafft, verlängert die Runde; sie endet erst, wenn die Schwierigkeit das Können übersteigt – eine adaptive Treppe mit offenem Ende [eigene Ableitung, nicht gemessen].
- **Bildfrequenz (Code):** Zielbewegung mit Zeitschritt dt (auf 100 ms begrenzt) → gleiches Tempo auf 60- und 144-Hz-Monitoren.
- **Auswertung (Code):** Trefferquote = Treffer/Klicks (abgelaufene Ziele zählen nicht), Note S+ … F nach 100·√(Punkte/48.000) (S+ ab ≈ 43.300 Punkten); Bestwerte nur lokal im Browser.
- **Widersprüche Regeltext ↔ Code:** (1) Zeitbonus laut Text +0,6 s, im Code +2 s. (2) Strafe laut Text −0,8 s „bei aktiver Strafe“; im Code −1 s, und die Abfrage erzwingt die Strafe **immer**. (3) Radius laut Text 26 → 8 px; im Code Grenzwert 12 px, mit Combo ≈ 10 px – 8 px wird nie erreicht. (4) Mit Combo werden 370 px/s und 0,4 s überschritten. (5) „45-Sekunden-Test“: tatsächliche Dauer variabel. (6) Stufentabelle „Level 12+ bei > 48.000 Punkten“ – im Code ist Level 12 bei 19.250 Punkten erreicht, 48.000 Punkte ≈ Level 28. (7) „Distanzen vergrößern sich dynamisch“ – im Code gibt es keine Distanzsteuerung; die Ziele erscheinen zufällig im Feld.

## 3. Was die Website sagt – und wie das einzuordnen ist
Die Seite bewirbt einen „Aim Trainer Elite“ für FPS-/E-Sport-Spieler (CS2, Valorant, Apex), der Mikroflicks, „visuell-motorische Latenz“, ballistische Impulskontrolle und Klick-Timing trainiere, Muskelgedächtnis aufbaue und „Verreißen verhindere“. Begründet wird mit dem Fitts'schen Gesetz und dem Zwei-Komponenten-Modell; dazu eine fünfstufige Tabelle (Tier 1 „Profi-Niveau“ > 48.000 Punkte) und ein 10–15-min-Warm-up-Tipp. Einordnung (Quellenprüfung in Abschnitt 11, Literaturbasis W09 A2):
- **Belegt:** Fitts-Beziehung für ruhende Ziele; Zwei-Komponenten-Prinzip (Primärimpuls + Endkorrektur).
- **Nur teilweise:** Die Ziele **bewegen** sich; dafür sagt der klassische Fitts-Index die Erfassungszeit nicht zuverlässig voraus (Jagacinski et al., 1980; Huang et al., 2018).
- **Nicht belegt / falsch:** „Primärimpuls legt 80–90 % der Strecke in 120–180 ms zurück – zu schnell für visuelle Korrekturen“ steht nicht in den Quellen; Sichtrückmeldung wirkt auch bei Bewegungen unter 190 ms (Zelaznik et al., 1983). „Signalwege 130–190 ms“: Woods et al. (2015) messen Reizentdeckung ≈ 131 ms, einfache Reaktion ≈ 213 ms. „Konstante cm/360-Empfindlichkeit“ und „entspannter Griff“ stehen nicht in den zitierten Arbeiten; im 2D-Feld gibt es keine 360°-Drehung, und da der Code keine unbeschleunigte Mausbewegung anfordert, kann die Zeigerbeschleunigung des Betriebssystems wirken – „exakt wie im Spiel“ ist nicht gewährleistet.
- **Transferversprechen** (Valorant/CS2, Muskelgedächtnis, Warm-up „stabilisiert Treffsicherheit“) sind ohne Beleg (Abschnitt 8).
- **Leistungstabelle:** Die Seite sammelt nach eigener Aussage keine Nutzerdaten – die Tiers haben **keine Datengrundlage** und passen nicht zum eigenen Levelsystem.
- „144/240 Hz + 1000-Hz-Maus spart 10–12 ms“: arithmetisch plausibel; der Vorteil hängt vor allem an der Gesamtlatenz, weniger an der Bildfrequenz (Spjut et al., 2019).

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Die Kreise sind groß: Der mittlere Radius liegt je nach Stufe zwischen etwa 6,4 % und 3,6 % der kürzeren Bühnenseite (nie unter 24 Pixel), und die Größe schwankt rhythmisch um ±25 %. Die Trefferfläche ist größer als der sichtbare Kreis (mindestens 28 Pixel Radius). Zur Orientierung: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°. Die Sehschärfe begrenzt bei korrigiertem Sehen nicht; bei niedrigem Visus sind die kleinsten Kreise schwerer zu sehen (daher `sehschaerfe_detail` = 1).
- **Tempo:** Das Tempo steigt von etwa 5 auf etwa 17 % der kürzeren Bühnenseite pro Sekunde – weit unter der Grenze der glatten Blickfolge (etwa 90 % Gain bis 100°/s bei geübten Personen; Meyer et al., 1985). Begrenzend ist das Vorhersagen des Zielorts während der eigenen Handbewegung: Das Ziel wandert in der Zeit, die die Bewegung braucht, ein Stück weiter.
- **Blickverhalten:** Erst springt der Blick per Sakkade zum Ziel, die Hand startet etwa 100 ms später (Prablanc et al., 1979); während der Zeigebewegung bleibt der Blick am Ziel verankert, eine Sakkade zum zweiten Ziel verzögert sich dann um etwa 155 ms (Neggers & Bekkering, 2000). Die Kreise bewegen sich im ganzen Spielfeld; entdeckt werden sie auch peripher, hoher Kontrast auf dunklem Grund erleichtert das.
- **Brille:** Bei Gleitsichtgläsern ist der scharfe Zwischenbereich schmal; Ziele am Feldrand werden seitlich unscharf, ein zu hoher Monitor zwingt in den Fernteil. Monitor tiefer stellen, Kopf mitdrehen (Weidling & Jaschinski, 2015), gegebenenfalls Arbeitsplatzbrille. Am Tablet liegt das Feld im Nahbereich.
- **Trockenes Auge:** Konzentriertes Bildschirmsehen senkt die Lidschlagrate deutlich (Patel et al., 1991); Pausen und Blinzeln einplanen.
- **Farbe, Tiefe, Licht:** Die Kreise tragen Symbole (Dreieck, Quadrat u. a.), nicht nur Farbe; Farbunterscheidung ist für die Aufgabe nicht nötig, Stereosehen spielt keine Rolle. Fehler werden mit einem Kreuz gezeigt, ohne roten Blitz und ohne Wackeln. Die Größenschwankung der Kreise liegt bei 0,3–0,55 Hz, also weit unter 3 Hz.

## 5. Neurowissenschaftliche Grundlagen

Zielbewegungen nutzen das Sakkadensystem (frontales Augenfeld, Colliculus superior), parietale und prämotorische Areale für die Umsetzung von Sehort in Handbewegung und das Kleinhirn, das an der Abstimmung von Auge und Hand beteiligt ist; seine Aktivität hängt nicht einfach linear von der Koordination ab (hoch sowohl bei gekoppelter als auch bei unabhängiger Auge-Hand-Folgebewegung; Miall et al., 2001). Vorwärtsmodelle sagen die Folgen des eigenen Bewegungsbefehls voraus und erlauben Korrekturen noch während der Bewegung (Shadmehr et al., 2010). Beim Üben verschiebt sich die Beteiligung kortiko-striataler und kortiko-zerebellärer Systeme (Doyon & Benali, 2005); im Alter kommen präfrontale Ressourcen hinzu (Seidler et al., 2010). Dass diese Übung bestimmte Hirnregionen „trainiert“, ist nicht belegt.

## 6. Motorische Grundlagen

- **Fitts'sches Gesetz:** Bewegungszeit = a + b · ID (Fitts, 1954; MacKenzie, 1992), in der Mensch-Computer-Interaktion mit ID = log₂(D/W + 1); der Durchsatz liegt bei Maus 3,7–4,9 bit/s, bei Touchpad 1–2,9 bit/s (Soukoreff & MacKenzie, 2004). Für diese Übung ist der Schwierigkeitsindex mäßig; die Schwierigkeit kommt vor allem aus der Bewegung der Ziele und den späteren Stufen.
- **Bewegte Ziele:** Endpunkte fallen hinter schnelle Ziele, Versatz und Streuung hängen von Zielgröße und Tempo ab (Huang et al., 2018); für bewegte Ziele sagt der klassische Fitts-Index die Erfassungszeit nicht zuverlässig voraus (Jagacinski et al., 1980). Das Zeitfenster, in dem das Ziel einen Punkt überdeckt, beträgt etwa Breite geteilt durch Tempo und wird mit der Stufe kürzer.
- **Zwei Komponenten und Rauschen:** Primärimpuls plus rückmeldungsgestützte Endkorrektur (Woodworth, 1899; Elliott et al., 2001, 2010); schnellere Impulse streuen stärker (Harris & Wolpert, 1998) → Speed-Accuracy-Trade-off, hier ohne Zeitstrafe, aber mit einer Stufe tiefer nach jedem Fehltipp. Sichtrückmeldung wirkt auch bei Bewegungen unter 190 ms (Zelaznik et al., 1983).
- **Touch:** Fingertippen ist schnell, aber ungenau: 4,8 mm breite Ziele → 11–14 % Fehler, 7,2 mm → 3–6 % (Bi et al., 2013); der Finger verdeckt kleine Ziele (Vogel & Baudisch, 2007). Deshalb ist die Trefferfläche größer als der sichtbare Kreis, und neue Kreise erscheinen nicht unter dem zuletzt getippten Punkt.
- **Maus:** Zu niedrige Empfindlichkeit erzwingt Nachsetzen und verschlechtert die Leistung deutlich, hohe schadet wenig (Casiez et al., 2008).

## 7. Einflussfaktoren und Messgrenzen

- **Alter:** Ältere brauchen mehr Teilbewegungen und positionieren langsamer (Walker et al., 1997); Touch verkleinert den Altersnachteil gegenüber der Maus (Findlater et al., 2013).
- **Gerät:** Eingabegeräte unterscheiden sich deutlich in mittlerer Latenz und deren Streuung, 1000-Hz-Abfrage hilft nur bei manchen Geräten (36 USB-Geräte; Wimmer et al., 2019); die Feldgröße hängt vom Bildschirm ab (Distanzen, Schwierigkeitsindex), Empfindlichkeit und Betriebssystem-Beschleunigung verändern das Ergebnis. Für die Latenz zählt eher die Gesamtlatenz als die Bildfrequenz (Spjut et al., 2019). Zwei Geräte können hoch korrelieren und trotzdem systematisch voneinander abweichen – Korrelation ist nicht Übereinstimmung (zum Grundsatz aus der Messmethodik: Mountford et al., 2004, S. 24). Sinnvoll ist nur der Vergleich **mit sich selbst am selben Gerät**.
- **Regeln und Streuung:** Die Stufe hängt von Treffern und Fehltipps ab, die Zielorte sind zufällig; eine 3-auf/1-ab-Treppe konvergiert auf etwa 79 % Treffer (Levitt, 1971). Einzelne Messungen am Menschen streuen; aussagekräftiger ist der Median über mehrere Sitzungen (Mountford et al., 2004, S. 44). Die Trefferquote zählt nur Tipps, nicht verpasste Ziele.
- **Ermüdung:** 6 × 5 min wiederholtes Maus-Zielen ermüdete die Handgelenkstrecker messbar, ohne Leistungsabfall (Forman et al., 2025); eine Sitzung dauert hier nur 45 Sekunden.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** Übungskurven motorischer Aufgaben steigen verlässlich (Heathcote et al., 2000). Die adaptive Schwierigkeit passt zum „Challenge Point“-Prinzip (Guadagnoli & Lee, 2004).
- **Naher Transfer – schwach:** Motorisches Lernen ist sehr aufgabenspezifisch (Karni et al., 1995); Übertragung auf andere Zeigegeräte oder Zielarten ist für diese Aufgabe nicht untersucht.
- **Alltagstransfer – fehlend:** Kein Beleg für bessere Spiel-, Alltags- oder Berufsleistung. Videospiel-Training verbessert die allgemeine kognitive Leistung nicht (Sala et al., 2018); positive Action-Spiel-Effekte betreffen Aufmerksamkeit, nicht die Handmotorik, und sind durch Publikationsbias überschätzt (Bediou et al., 2018).
- **Praxisangabe (Erfahrungswissen, nicht belegt):** In der funktionellen Optometrie üben Menschen mit bewegten Zielen häufig in Stufen: zuerst nur das Ziel mit den Augen verfolgen, dann mit der Hand darauf zeigen, das Tempo erst danach erhöhen, und dabei die Umgebung weiter wahrnehmen. Man beginnt am eigenen Arbeitspunkt und steigert in kleinen, selbst gesteuerten Schritten. Eine Studie dazu liegt nicht vor.

## 9. Auswahlhinweise

- **Passt, wenn …** schnelles, genaues Zeigen auf bewegte Ziele geübt werden soll; spielerische Rückmeldung (Stufe, Trefferquote) motiviert; eine anspruchsvolle Fortsetzung nach ruhenden Zielen gesucht wird.
- **Weniger passend, wenn …** wenig Erfahrung mit Touch oder Maus besteht und Zeitdruck stresst; das Ziel reine Blickmotorik ist (Kapitel 400).
- **Vorsicht / anpassen bei …** `hand_arm_beschwerden` (schnelle, wiederholte Zielbewegungen); `tremor_parkinson` (kleine, bewegte Ziele; die Trefferfläche ist aber größer als der Kreis); `presbyopie_gleitsicht` (Ziele im ganzen Feld, seitliche Unschärfe); `sehbehinderung_niedriger_visus` (kleine Kreise auf den höheren Stufen); `gesichtsfeldausfall` (neue Ziele müssen peripher entdeckt werden; Gesichtsfeldausfälle folgen dem Verlauf der Sehbahn, Muchnick, 2008, S. 32, und die Übung ersetzt keine Untersuchung); `trockenes_auge_bildschirm` (Starren); `kognitive_einschraenkung` (mehrere bewegte Ziele gleichzeitig); `photosensitive_epilepsie`, `migraene_lichtempfindlich` (kein Blitzen, kein rotes Aufleuchten, kein Wackeln; die Größenschwankung der Kreise ist langsam; vorsorglich gelistet, bei Beschwerden abbrechen). Bei Beschwerden in Hand oder Arm, Doppelbildern, plötzlichem Sehverlust, Schwindel oder Kopfschmerz mit Sehverschlechterung die Übung abbrechen und ärztlich abklären lassen (vgl. Muchnick, 2008, S. 6, 28).
- **Kombiniert gut mit …** 708 (ruhende Ziele) als Vorstufe, 104 und 704 als Varianten, 502/501 für Zielwechsel und Flicks, 706 (Ziehen statt Klicken zum bewegten Ziel), 705 als ruhiger Ausgleich.
- **Überschneidungen / Unterschiede:** 702, 704 und 708 sind **nahe Verwandte**: 702 = mehrere **bewegte** Ziele (Abfangen, `bewegungswahrnehmung`/`antizipation` = 2), 704 = ruhende, **schrumpfende** Ziele mit Zentrumsbonus (Präzision), 708 = ruhende Ziele in **Ketten** (Tempo, Blickvorlauf). Fast dieselbe Aufgabe wie 702 ist 804 (ein driftendes, schrumpfendes Ziel); 104 ist die Fangübung Zielfang (ein Ziel, das nach kurzer Zeit verschwindet). Für eine Auswahl genügt meist eine dieser Übungen.

Keine Diagnose, kein Heil-, Seh- oder Leistungsversprechen; Ergebnisse sind keine Messung von Krankheitszeichen.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Tablet/Touch:** Original blockiert Touch. Umsetzung als direktes Antippen (wie `zielfang`): Trefferzone ≥ 9 mm (≈ 48 CSS-px bei 0,19 mm/px), sichtbares Ziel ≥ 7 mm, Tempo in °/s mit dt, Vor-/Nachlauf der Tipps auswerten.
- **Regeln ehrlich machen:** Text und Code angleichen (+2 s/−1 s; abschaltbare Strafe wirklich abschalten), feste Rundendauer statt offener Zeitbilanz, ganze Levelstufen.
- **Messqualität:** Erfassungszeit je Ziel, Trefferquote inkl. abgelaufener Ziele und Endpunktversatz statt überproportionaler Punkte; adaptive Treppe (z. B. 3-down/1-up) statt Combo-Beschleunigung.
- **Sicherheit/Barrierefreiheit:** Kein roter Vollbild-Blitz, kein Wackeln; Fehlerfeedback über Form, nicht nur Farbe; langsamer Einstieg für Ältere; Pausenhinweis; keine Tier-Tabellen ohne Daten.

## 11. Quellen
### Von der Website angegeben
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (gilt für ruhende Ziele; hier bewegen sie sich).
- MacKenzie, I. S. (1992). Fitts' law as a research and design tool in human-computer interaction. *Human–Computer Interaction, 7*(1), 91–139. https://doi.org/10.1207/s15327051hci0701_3 – **Prüfung:** DOI stimmt ✓; **stützt:** ja für Fitts in der HCI (empfiehlt die Shannon-Form, nicht die gezeigte Originalform); nein für „konstante cm/360-Empfindlichkeit“.
- Elliott, D., Hansen, S., Grierson, L. E. M., Lyons, J., Bennett, S. J., & Hayes, S. J. (2010). Goal-directed aiming: Two components but multiple processes. *Psychological Bulletin, 136*(6), 1023–1044. https://doi.org/10.1037/a0020958 – **Prüfung:** DOI, Titel, Jahr ✓, **Autor:innen falsch** (Website: „Elliott, Helsen & Chua“ – Autoren der Arbeit von 2001); **stützt:** ja für das Zwei-Komponenten-Prinzip, nein für „80–90 % in 120–180 ms, zu schnell für Korrekturen“ (betont frühe Online-Kontrolle).
- Woodworth, R. S. (1899). Accuracy of voluntary movement. *The Psychological Review: Monograph Supplements, 3*(3), i–114. https://doi.org/10.1037/h0092992 – **Prüfung:** DOI stimmt ✓ (Titel ohne „The“); **stützt:** ja für Primärimpuls + Endkorrektur; die Zahlen der Website stammen nicht daraus.

### Weitere Fachliteratur
- Bediou, B., Adams, D. M., Mayer, R. E., Tipton, E., Green, C. S., & Bavelier, D. (2018). Meta-analysis of action video game impact on perceptual, attentional, and cognitive skills. *Psychological Bulletin, 144*(1), 77–110. https://doi.org/10.1037/bul0000130 – Transfer, Publikationsbias
- Bi, X., Li, Y., & Zhai, S. (2013). FFitts law: Modeling finger touch with Fitts' law. In *Proceedings of CHI '13* (S. 1363–1372). ACM. https://doi.org/10.1145/2470654.2466180 – Fehlerraten beim Fingertippen
- Casiez, G., Vogel, D., Balakrishnan, R., & Cockburn, A. (2008). The impact of control-display gain on user performance in pointing tasks. *Human–Computer Interaction, 23*(3), 215–250. https://doi.org/10.1080/07370020802278163 – Mausempfindlichkeit
- Doyon, J., & Benali, H. (2005). Reorganization and plasticity in the adult brain during learning of motor skills. *Current Opinion in Neurobiology, 15*(2), 161–167. https://doi.org/10.1016/j.conb.2005.03.004 – Lernnetzwerke
- Elliott, D., Helsen, W. F., & Chua, R. (2001). A century later: Woodworth's (1899) two-component model of goal-directed aiming. *Psychological Bulletin, 127*(3), 342–357. https://doi.org/10.1037/0033-2909.127.3.342 – Zwei-Komponenten-Modell
- Findlater, L., Froehlich, J. E., Fattal, K., Wobbrock, J. O., & Dastyar, T. (2013). Age-related differences in performance with touchscreens compared to traditional mouse input. In *Proceedings of CHI '13* (S. 343–346). ACM. https://doi.org/10.1145/2470654.2470703 – Alter, Touch vs. Maus
- Forman, G. N., Nikitin, S. A., Lang, C. J., Gabriel, D. A., Sonne, M. W., Kociolek, A. M., & Holmes, M. W. R. (2025). Impact of repetitive mouse aiming on muscle fatigue and fine motor performance of the distal upper limb. *Journal of Electromyography and Kinesiology, 82*, 102992. https://doi.org/10.1016/j.jelekin.2025.102992 – Ermüdung
- Guadagnoli, M. A., & Lee, T. D. (2004). Challenge point: A framework for conceptualizing the effects of various practice conditions in motor learning. *Journal of Motor Behavior, 36*(2), 212–224. https://doi.org/10.3200/JMBR.36.2.212-224 – adaptive Schwierigkeit
- Harris, C. M., & Wolpert, D. M. (1998). Signal-dependent noise determines motor planning. *Nature, 394*(6695), 780–784. https://doi.org/10.1038/29528 – Speed-Accuracy-Trade-off
- Heathcote, A., Brown, S., & Mewhort, D. J. K. (2000). The power law repealed: The case for an exponential law of practice. *Psychonomic Bulletin & Review, 7*(2), 185–207. https://doi.org/10.3758/BF03212979 – Übungskurven
- Huang, J., Tian, F., Fan, X., Zhang, X. (L.), & Zhai, S. (2018). Understanding the uncertainty in 1D unidirectional moving target selection. In *Proceedings of CHI '18* (S. 1–12). ACM. https://doi.org/10.1145/3173574.3173811 – Endpunkte bei bewegten Zielen
- Jagacinski, R. J., Repperger, D. W., Ward, S. L., & Moran, M. S. (1980). A test of Fitts' law with moving targets. *Human Factors, 22*(2), 225–233. https://doi.org/10.1177/001872088002200211 – Fitts bei bewegten Zielen
- Karni, A., Meyer, G., Jezzard, P., Adams, M. M., Turner, R., & Ungerleider, L. G. (1995). Functional MRI evidence for adult motor cortex plasticity during motor skill learning. *Nature, 377*(6545), 155–158. https://doi.org/10.1038/377155a0 – Lernspezifität
- Levitt, H. (1971). Transformed up-down methods in psychoacoustics. *The Journal of the Acoustical Society of America*, 49(2B), 467–477. https://doi.org/10.1121/1.1912375 – Treppenverfahren, Konvergenzpunkt
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – Grenze der Blickfolge
- Miall, R. C., Reckess, G. Z., & Imamizu, H. (2001). The cerebellum coordinates eye and hand tracking movements. *Nature Neuroscience, 4*(6), 638–644. https://doi.org/10.1038/88465 – Kleinhirn, Auge-Hand
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Messwerte streuen, Wiederholmessung sinnvoll (S. 44)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2. Aufl.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28), Gesichtsfeldausfälle nach Sehbahnverlauf (S. 32)
- Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. *Journal of Neurophysiology, 83*(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639 – Blick beim Zeigen
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm
- Prablanc, C., Echallier, J. F., Komilis, E., & Jeannerod, M. (1979). Optimal response of eye and hand motor systems in pointing at a visual target. I. *Biological Cybernetics, 35*(2), 113–124. https://doi.org/10.1007/BF00337436 – Sakkade vor Handbewegung
- Sala, G., Tatlidil, K. S., & Gobet, F. (2018). Video game training does not enhance cognitive ability: A comprehensive meta-analytic investigation. *Psychological Bulletin, 144*(2), 111–139. https://doi.org/10.1037/bul0000139 – fehlender Ferntransfer
- Seidler, R. D., Bernard, J. A., Burutolu, T. B., Fling, B. W., Gordon, M. T., Gwin, J. T., Kwak, Y., & Lipps, D. B. (2010). Motor control and aging: Links to age-related brain structural, functional, and biochemical effects. *Neuroscience & Biobehavioral Reviews, 34*(5), 721–733. https://doi.org/10.1016/j.neubiorev.2009.10.005 – motorisches Altern
- Shadmehr, R., Smith, M. A., & Krakauer, J. W. (2010). Error correction, sensory prediction, and adaptation in motor control. *Annual Review of Neuroscience, 33*, 89–108. https://doi.org/10.1146/annurev-neuro-060909-153135 – Vorwärtsmodelle
- Soukoreff, R. W., & MacKenzie, I. S. (2004). Towards a standard for pointing device evaluation, perspectives on 27 years of Fitts' law research in HCI. *International Journal of Human-Computer Studies, 61*(6), 751–789. https://doi.org/10.1016/j.ijhcs.2004.09.001 – Durchsatz Maus/Touchpad
- Spjut, J., Boudaoud, B., Binaee, K., Kim, J., Majercik, A., McGuire, M., Luebke, D., & Kim, J. (2019). Latency of 30 ms benefits first person targeting tasks more than refresh rate above 60 Hz. In *SIGGRAPH Asia 2019 Technical Briefs* (S. 110–113). ACM. https://doi.org/10.1145/3355088.3365170 – Latenz vs. Bildfrequenz
- Vogel, D., & Baudisch, P. (2007). Shift: A technique for operating pen-based interfaces using touch. In *Proceedings of CHI '07* (S. 657–666). ACM. https://doi.org/10.1145/1240624.1240727 – Verdeckung durch den Finger
- Walker, N., Philbin, D. A., & Fisk, A. D. (1997). Age-related differences in movement control: Adjusting submovement structure to optimize performance. *The Journals of Gerontology: Series B, 52B*(1), P40–P53 (PubMed: P40–P52). https://doi.org/10.1093/geronb/52B.1.P40 – Alter, Teilbewegungen
- Weidling, P., & Jaschinski, W. (2015). The vertical monitor position for presbyopic computer users with progressive lenses: How to reach clear vision and comfortable head posture. *Ergonomics, 58*(11), 1813–1829. https://doi.org/10.1080/00140139.2015.1035764 – Gleitsicht, Monitorhöhe
- Wimmer, R., Schmid, A., & Bockes, F. (2019). On the latency of USB-connected input devices. In *Proceedings of CHI '19* (S. 1–12). ACM. https://doi.org/10.1145/3290605.3300650 – Eingabelatenz
- Zelaznik, H. N., Hawkins, B., & Kisselburgh, L. (1983). Rapid visual feedback processing in single-aiming movements. *Journal of Motor Behavior, 15*(3), 217–236. https://doi.org/10.1080/00222895.1983.10735298 – schnelle Sichtkorrektur
