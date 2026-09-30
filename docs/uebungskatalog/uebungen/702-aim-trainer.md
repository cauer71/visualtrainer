---
# ===== Kennung =====
nr: 702
kennung: aim-trainer
name: "Zielklicken – bewegte Ziele mit dem Mauszeiger erfassen"
name_original: "Aim Trainer Online (Seitentitel: Aim Trainer online | Mauspräzision testen)"
kapitel: "Motorik"
kapitel_original: "motor"
unterkapitel_original: "hand-eye-coordination"
quelle_url: "https://skilldrills.online/de/drills/motor/hand-eye-coordination/aim-trainer"
blickfit_umsetzung: null
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Auf dunklem Grund gleiten immer zwei grüne Kreisziele geradlinig umher und prallen an den Rändern ab. Man führt ein Fadenkreuz mit der Maus darauf und klickt, bevor ein Ziel nach seiner Lebensdauer verschwindet; mit steigender Punktzahl werden die Ziele kleiner, schneller und kurzlebiger."
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
geeignet_fuer: ["schnelles und genaues Zeigen auf bewegte Ziele üben (Auge-Hand-Koordination unter Zeitdruck)", "Maus-Aufwärmen für Menschen, die gern spielerisch mit Punkten und Serien üben", "Fortschritt mit sich selbst am selben Gerät vergleichen (Trefferquote, Level)", "Aufbau nach ruhenden Zielen (708) und vor Mehrziel- oder Flick-Aufgaben (502, 704, 501)"]
weniger_geeignet_fuer: ["Tablet ohne Maus (Original blockiert Touch)", "Menschen mit Tremor oder eingeschränkter Handmotorik (kleine, schnelle Ziele, Zeitstrafen)", "Einsteiger:innen und Ältere, die wenig Computererfahrung haben (hoher Zeitdruck, Ziele < 1 s sichtbar)", "wer eine feste, kurze Übungsdauer braucht (Runde verlängert sich bei Treffern)", "Übungsziel reine Blickmotorik ohne Hand (dafür Kapitel 400)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Zielbewegungen werden durch Übung in der geübten Aufgabe schneller und genauer (Übungskurven, Aim-Trainer-Messwerte zuverlässig); Übertragung auf andere Aufgaben ist gering, ein Nutzen für Alltag, Beruf oder Spiele wie CS2/Valorant ist für diese Übung nicht untersucht."
aehnliche_uebungen: [704, 708, 104, 501, 502, 508, 302, 804, 509, 706]
stichworte: ["Aim Trainer", "Fitts'sches Gesetz", "bewegte Ziele", "moving target selection", "Auge-Hand-Koordination", "Zielbewegung", "Mauspräzision", "Speed-Accuracy-Trade-off", "Pointer Lock", "Combo"]
---

# 702 · Zielklicken – bewegte Ziele mit dem Mauszeiger erfassen

> Original: „Aim Trainer Online“ – skilldrills.online, Kapitel Motorik (`motor/hand-eye-coordination`) · Blickfit: noch nicht umgesetzt (verwandt: `zielfang` = bewegtes Ziel antippen, Vorbild 104)

## 1. Kurzbeschreibung
Auf einem dunklen Spielfeld fliegen zwei leuchtend grüne Kreisziele geradlinig umher und prallen an den Rändern ab. Mit der Maus führt man ein weißes Fadenkreuz auf ein Ziel und klickt. Treffer bringen Punkte und Zeit, Fehlklicks und verpasste Ziele kosten Zeit und beenden die Trefferserie. Je mehr Punkte, desto kleiner, schneller und kurzlebiger werden die Ziele – eine klassische Auge-Hand-Aufgabe: schnell und sicher auf bewegte Ziele zeigen.

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
- **Sehwinkel** [eigene Berechnung; 24″ Full-HD, 0,274 mm/px, 60 cm]: Startziel Ø 52 px = 14,3 mm ≈ 1,4°; Level 15 Ø ≈ 31 px ≈ 0,8° (Trefferzone ≈ 1,2°); kleinstes Ziel mit voller Combo Ø ≈ 20 px ≈ 5,6 mm ≈ 0,5° (= 30′). Die Sehschärfe begrenzt bei korrigiertem Sehen nicht; das Fadenkreuz-Zentrum (≈ 0,1°) und die kleinsten Ziele sind aber bei niedrigem Visus schwer zu sehen (daher `sehschaerfe_detail` = 1, wie bei 704, 706, 708).
- **Tempo:** 80 → 370 px/s ≈ 2 → 10°/s (mit Combo ≈ 12°/s) – weit unter der Grenze der glatten Blickfolge (≈ 90 % Gain bis 100°/s bei geübten Personen; Meyer et al., 1985). Begrenzend ist das Vorhersagen des Zielorts während der eigenen Handbewegung: Bei 300 px/s und ≈ 0,6 s Bewegungszeit wandert das Ziel ≈ 4,7° weiter [eigene Abschätzung].
- **Blickverhalten:** Erst springt der Blick per Sakkade zum Ziel, die Hand startet ≈ 100 ms später (Prablanc et al., 1979); während der Zeigebewegung bleibt der Blick am Ziel verankert, eine Sakkade zum zweiten Ziel verzögert sich dann um ≈ 155 ms (Neggers & Bekkering, 2000). Neue Ziele erscheinen irgendwo im ganzen Spielfeld – im Vollbild ist das der ganze Bildschirm, bei 24″ Full-HD und 60 cm ≈ 47° × 27° [eigene Berechnung]; hoher Kontrast auf fast schwarzem Grund erleichtert das periphere Entdecken.
- **Brille:** Bei Gleitsichtgläsern ist der scharfe Zwischenbereich schmal; Ziele am Feldrand werden seitlich unscharf, ein zu hoher Monitor zwingt in den Fernteil. Monitor tiefer stellen, Kopf mitdrehen (Weidling & Jaschinski, 2015), ggf. Arbeitsplatzbrille; Akkommodationsbedarf bei 60 cm ≈ 1,7 dpt.
- **Trockenes Auge:** Konzentriertes Bildschirmsehen senkt die Lidschlagrate deutlich (Patel et al., 1991); da die Runde über Minuten laufen kann, Pausen und Blinzeln einplanen.
- **Farbe/Tiefe:** Grüne Ziele, rote Fehlermarken; Farbunterscheidung ist für die Aufgabe nicht nötig (Farbwechsel bei Serie ≥ 10 nur Zusatzinfo). Stereosehen spielt keine Rolle.

## 5. Neurowissenschaftliche Grundlagen
Zielbewegungen nutzen das Sakkadensystem (frontales Augenfeld, Colliculus superior), parietale und prämotorische Areale für die Umsetzung von Sehort in Handbewegung und das Kleinhirn, das an der Abstimmung von Auge und Hand beteiligt ist; seine Aktivität hängt nicht einfach linear von der Koordination ab (hoch sowohl bei gekoppelter als auch bei unabhängiger Auge-Hand-Folgebewegung; Miall et al., 2001). Vorwärtsmodelle sagen die Folgen des eigenen Bewegungsbefehls voraus und erlauben Korrekturen noch während der Bewegung (Shadmehr et al., 2010). Beim Üben verschiebt sich die Beteiligung kortiko-striataler und kortiko-zerebellärer Systeme (Doyon & Benali, 2005); im Alter kommen präfrontale Ressourcen hinzu (Seidler et al., 2010). Dass diese Übung bestimmte Hirnregionen „trainiert“, ist nicht belegt.

## 6. Motorische Grundlagen
- **Fitts'sches Gesetz:** Bewegungszeit = a + b · ID, in der HCI mit ID = log₂(D/W + 1); Maus-Durchsatz 3,7–4,9 bit/s, Touchpad 1–2,9 bit/s (Soukoreff & MacKenzie, 2004). Für diese Übung (D ≈ 400–700 px je nach Bildschirm, W = Trefferzone Ø 68 → 36 px) ergibt sich ID ≈ 2,8–3,5 bit (Level 1) bis ≈ 3,6–4,4 bit (kleinste Ziele) [eigene Abschätzung] – mäßig; die Schwierigkeit kommt vor allem aus Bewegung und Zeitlimit.
- **Bewegte Ziele:** Endpunkte fallen hinter schnelle Ziele, Versatz und Streuung hängen von Zielgröße und Tempo ab (Huang et al., 2018). Das Zeitfenster, in dem das Ziel einen Punkt überdeckt, ist ≈ W/v – bei 47 px und 300 px/s ≈ 160 ms [eigene Berechnung].
- **Zwei Komponenten und Rauschen:** Primärimpuls plus rückmeldungsgestützte Endkorrektur (Elliott et al., 2001, 2010); schnellere Impulse streuen stärker (Harris & Wolpert, 1998) → Speed-Accuracy-Trade-off, verschärft durch Fehlklick-Strafe und Zeitdruck.
- **Maus-Übersetzung:** Zu niedrige Empfindlichkeit erzwingt Nachsetzen und verschlechtert die Leistung deutlich, hohe schadet wenig (Casiez et al., 2008).
- **Touch:** Fingertippen ist schnell, aber ungenau: 4,8 mm breite Ziele → 11–14 % Fehler, 7,2 mm → 3–6 % (Bi et al., 2013); der Finger verdeckt kleine Ziele (Vogel & Baudisch, 2007). Ohne Schwebezustand ist ein Fadenkreuz nicht übertragbar – auf Touch wird daraus direktes Antippen.

## 7. Einflussfaktoren und Messgrenzen
- **Alter:** Ältere brauchen mehr Teilbewegungen und positionieren langsamer (Walker et al., 1997); Touch verkleinert den Altersnachteil gegenüber der Maus (Findlater et al., 2013).
- **Gerät:** Eingabegeräte unterscheiden sich deutlich in mittlerer Latenz und deren Streuung, 1000-Hz-Abfrage hilft nur bei manchen Geräten (36 USB-Geräte; Wimmer et al., 2019); die Feldgröße hängt vom Fenster ab (Distanzen, ID), Empfindlichkeit und Betriebssystem-Beschleunigung verändern das Ergebnis. Sinnvoll ist nur der Vergleich **mit sich selbst am selben Gerät**.
- **Regeln:** Zufällige Zielorte, offene Rundendauer, überproportional wachsende Punkte (Level- und Combo-Faktor) – Punkte sind kein lineares Leistungsmaß; die Trefferquote ignoriert abgelaufene Ziele.
- **Zuverlässigkeit:** Für KovaaK's waren Trefferquote und Treffer/s zwischen zwei Sitzungen sehr stabil (ICC 0,947–0,995, n = 10; Rogers et al., 2024) – für dieses Original nicht untersucht.
- **Ermüdung:** 6 × 5 min Maus-Zielen ermüdete die Handgelenkstrecker messbar, ohne Leistungsabfall (Forman et al., 2025).

## 8. Studienlage: Trainierbarkeit und Übertragung
- **Übungseffekt – mittel:** Übungskurven motorischer Aufgaben steigen verlässlich (Heathcote et al., 2000); in einem Aim-Trainer verbesserte sich zwischen zwei Sitzungen nur eine von vier Aufgaben (Rogers et al., 2024). Die adaptive Schwierigkeit passt zum „Challenge Point“-Prinzip (Guadagnoli & Lee, 2004).
- **Naher Transfer – schwach:** Motorisches Lernen ist sehr aufgabenspezifisch (Karni et al., 1995); Übertragung auf andere Zeigegeräte oder Zielarten ist für diese Aufgabe nicht untersucht.
- **Alltagstransfer – fehlend:** Kein Beleg für bessere Spiel-, Alltags- oder Berufsleistung. Videospiel-Training verbessert die allgemeine kognitive Leistung nicht (Sala et al., 2018); positive Action-Spiel-Effekte betreffen Aufmerksamkeit, nicht Mausmotorik, und sind durch Publikationsbias überschätzt (Bediou et al., 2018).

## 9. Auswahlhinweise für die KI
- **Passt, wenn …** schnelles, genaues Zeigen auf bewegte Ziele mit der Maus geübt werden soll; spielerische Rückmeldung (Serie, Level) motiviert; eine anspruchsvolle Fortsetzung nach ruhenden Zielen gesucht wird.
- **Weniger passend, wenn …** nur ein Tablet vorhanden ist; wenig Computererfahrung oder Stress durch Zeitdruck besteht; eine feste Dauer nötig ist; das Ziel reine Blickmotorik ist (Kapitel 400).
- **Vorsicht / anpassen bei …** `hand_arm_beschwerden` (schnelle, wiederholte Zielbewegungen, evtl. minutenlang); `tremor_parkinson` (kleine schnelle Ziele, Fehlklicks bestraft – frustrierend); `presbyopie_gleitsicht` (Ziele im ganzen Feld, seitliche Unschärfe); `sehbehinderung_niedriger_visus` (kleines Fadenkreuz-Zentrum, Ziele bis ≈ 0,5°); `gesichtsfeldausfall` (neue Ziele müssen peripher entdeckt werden); `trockenes_auge_bildschirm` (Starren, offene Dauer); `kognitive_einschraenkung` (sehr hoher Zeitdruck, Ziele < 1 s sichtbar, Zeitstrafen); `photosensitive_epilepsie`, `migraene_lichtempfindlich` (roter Vollbild-Blitz 480 ms und Wackeln bei jedem Fehlklick und jedem abgelaufenen Ziel, standardmäßig an; bei schnellen Fehlklickfolgen oder wenn auf hohem Level beide Ziele unbeachtet ablaufen (Lebensdauer ≈ 0,3–0,5 s), sind mehrere Blitze pro Sekunde möglich – Blitz abschalten).
- **Kombiniert gut mit …** 708 (ruhende Ziele) als Vorstufe, 104 und 704 als Varianten, 502/501 für Zielwechsel und Flicks, 706 (Ziehen statt Klicken zum bewegten Ziel), 705 als ruhiger Ausgleich.
- **Überschneidungen / Unterschiede:** 702, 704 und 708 nutzen dasselbe Spielgerüst (Fadenkreuz mit Pointer Lock, +2 s je Treffer/−1 s je Fehler, Serienfaktor bis 3,0, offene Rundendauer) und sind **nahe Verwandte**: 702 = zwei **bewegte** Ziele (Abfangen, `bewegungswahrnehmung`/`antizipation` = 2), 704 = zwei ruhende, **schrumpfende** Ziele mit Zentrumsbonus (Präzision), 708 = ruhende Ziele in **Ketten** (Tempo, Blickvorlauf). Fast dieselbe Aufgabe wie 702 ist 804 (ein driftendes, schrumpfendes Ziel); 104 ist das Vorbild der Blickfit-Übung `zielfang`. Für eine Auswahl genügt meist eine dieser Übungen.

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
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Reizentdeckung ≈ 131 ms, einfache Reaktion ≈ 213 ms; 144/240-Hz-Werte sind reine Arithmetik, Bildfrequenzen wurden nicht untersucht); nein für „entspannte Griffhaltung“.

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
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – Grenze der Blickfolge
- Miall, R. C., Reckess, G. Z., & Imamizu, H. (2001). The cerebellum coordinates eye and hand tracking movements. *Nature Neuroscience, 4*(6), 638–644. https://doi.org/10.1038/88465 – Kleinhirn, Auge-Hand
- Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. *Journal of Neurophysiology, 83*(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639 – Blick beim Zeigen
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm
- Prablanc, C., Echallier, J. F., Komilis, E., & Jeannerod, M. (1979). Optimal response of eye and hand motor systems in pointing at a visual target. I. *Biological Cybernetics, 35*(2), 113–124. https://doi.org/10.1007/BF00337436 – Sakkade vor Handbewegung
- Rogers, E. J., Trotter, M. G., Johnson, D., Desbrow, B., & King, N. (2024). KovaaK's aim trainer as a reliable metrics platform for assessing shooting proficiency in esports players: A pilot study. *Frontiers in Sports and Active Living, 6*, 1309991. https://doi.org/10.3389/fspor.2024.1309991 – Zuverlässigkeit, Lerneffekte
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
