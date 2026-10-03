---
# ===== Kennung =====
nr: 407
kennung: predictive-pursuit
name: "Landepunkt vorhersehen (Ball hinter einer Wand)"
name_original: "Prädiktive Blickverfolgung bei Verdeckung (Predictive Pursuit)"
kapitel: "Blickverfolgung"
kapitel_original: "visual-tracking"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/visual-tracking/predictive-pursuit"
blickfit_umsetzung: {kennung: "landepunkt", name: "Landepunkt", unterschiede: "Tablet-Umsetzung für Touch: große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/landepunkt/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Ein Ball fliegt in einem Bogen über die Bühne und verschwindet für einen Teil des Flugs hinter einer Wand. Sobald er verdeckt ist, tippt man auf die Stelle am Boden, an der er landen wird. Danach wird die Wand durchsichtig: Landepunkt, Tipp und Abweichung werden gezeigt. Verdeckung, Tempo und Bogenhöhe passen sich an. Wohin der Blick geht, wird nicht gemessen, nur wo getippt wird."
ziel_funktionen: [sakkaden]
eingabe: [maus, touch]
tablet_geeignet: mit_anpassung
dauer_sekunden: 60
schwierigkeit_anpassung: "Kein Levelsystem, keine automatische Anpassung. Manuell: Tempo 0,5–9× (1× = Bewegung 1,5 s mit Zeitkonstante 0,29 s, danach 0,7 s Ruhe; alle Zeiten ∝ 1/Tempo), 'Hide Line' blendet die Linie zum Landepunkt aus (Landepunkt muss aus Richtung und Anfangstempo geschätzt werden), 'Random Speed' lässt den Tempofaktor langsam zwischen 0,38 und 1,92 schwanken und verkürzt die Ruhephase, Zielradius 10–50 px, Dauer 30/45/60/90/120 s."
messgroessen: ["Original: keine Leistungsmessung (nur Zähler abgeschlossener Sitzungen); Fadenkreuz unter Maus/Finger wird nicht ausgewertet", "sinnvoll mit Eyetracker: Latenz und Landefehler des ersten Blicksprungs, Zahl der Korrektursakkaden bis zur Zielerfassung, Vergleich mit/ohne Linie", "Ersatz ohne Eyetracker: vermuteten Landepunkt vor Bewegungsende antippen (Abstand in Grad, Zeitpunkt)", "Ersatz ohne Eyetracker: im gelandeten Ziel kurz eingeblendetes Zeichen erkennen"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 0
    blickfolge: 2
    sakkaden: 3
    fixation: 1
    bewegungswahrnehmung: 2
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 0
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 0
    inhibition: 1
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 1
    antizipation: 2
    entscheidung_wahlreaktion: 0
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 1
    zielbewegung_tempo: 0
    zielbewegung_praezision: 0
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 1
  flimmern_lichtreize: 0
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Bildschirm oder Tablet (quer) auf fester Unterlage, Abstand 40–70 cm, Kopf möglichst ruhig", "Scharfes Sehen im Zwischenbereich über fast die ganze Bildbreite (Monitor ≈ 48° × 17°) – Arbeitsplatzbrille oder Einstärkenglas günstiger als Gleitsicht", "Maus oder Finger nur zum Starten; Mitführen des Fadenkreuzes freiwillig und ohne Wertung", "Bereitschaft, ohne Rückmeldung 30–120 s konzentriert mitzugehen"]
vorsicht_bei: [presbyopie_gleitsicht, schwindel_vestibulaer, reisekrankheit, nystagmus, schielen_binokular, trockenes_auge_bildschirm, kopfschmerz_asthenopie, kinder_unter_6]
geeignet_fuer: ["Bewegungen vorausahnen: den Landepunkt eines kurz verdeckten Balls aus Richtung und Tempo schätzen", "Aufgabe mit Rückmeldung: Nach jedem Tipp werden Landepunkt und Abweichung gezeigt", "Steigerung nach 303 (ruhende Sprungziele) und vor 414/409 (Sprünge bzw. Dunkelphasen während laufender Bewegung)", "kurze Übung ohne Blitzreize, mit einem Tipp je Durchgang"]
weniger_geeignet_fuer: ["alle, die einen Leistungswert oder einen Fortschritt in Prozent erwarten (das Ergebnis gilt nur im Vergleich mit sich selbst)", "Ziel 'Blickfolge hinter einer Verdeckung' (der Blick wird nicht gemessen; dafür 409)", "Ziel glatte, lange Blickfolge (ein Flug dauert nur etwa 1 bis 2,4 s; dafür 402–404)", "Gleitsichtträger:innen am großen Monitor (Der Ball fliegt über große Teile der Bildbreite, oben und unten durch Fern- und Nahteil)", "hohe Stufen für Ungeübte (bis zu 80 % der Flugzeit verdeckt, kurze Flugdauer)"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: fehlend
  alltag_transfer: fehlend
  kommentar: "Blicksprünge auf bewegte Ziele berücksichtigen Position und Tempo des Ziels (de Brouwer et al., 2002b), und vorhersagbare Bewegungsabläufe werden im Labor rasch gelernt (Barnes, 2008; Kowler et al., 2019). Bei kurz verdeckten Zielen verbesserte sich die Blickfolge mit Rückmeldung nach 8–10 Sitzungen (Madelain & Krauzlis, 2003) – mit Blickmessung und in einer anderen Aufgabe als dieser Tipp-Aufgabe. Eine Trainingsstudie zu dieser Aufgabe gibt es nicht, und ein Nutzen für Sport, E-Sport oder Alltag ist nicht belegt."
aehnliche_uebungen: [409, 414, 303, 410, 411, 415, 405, 406, 402, 403, 404, 105, 104, 501, 508]
stichworte: ["Landepunkt", "Vorhersage", "prädiktive Sakkade", "Aufholsakkade", "catch-up saccade", "abbremsendes Ziel", "Blicksprung auf bewegtes Ziel", "Antizipation", "Verdeckung (nur im Seitentext)", "smooth pursuit", "Vorhaltemaß"]
---

# 407 · Landepunkt vorhersehen (Ball hinter einer Wand)

> Original: „Prädiktive Blickverfolgung bei Verdeckung“ („Predictive Pursuit“) – skilldrills.online, Kapitel Blickverfolgung (`visual-tracking`) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

Auf ruhigem Grund steht ein Ball am Boden. Er fliegt in einer echten Wurfparabel (Flugzeit mit dt aufsummiert, also
unabhängig von der Bildrate) über die Bühne und verschwindet für einen Teil des Flugs hinter einer Wand. Sobald er verdeckt ist, tippt man
auf die Stelle am Boden, an der er landen wird; ein früherer Tipp zählt nicht, und nach der Landezeit bleiben noch etwa 1,6 s zum Antworten.
Danach wird die Wand durchsichtig: Man sieht den Ball landen, den eigenen Tipp und die Abweichung in Prozent der Bildschirmbreite sowie
✓/✗; als Treffer gilt ein Tipp höchstens 6 % der Bildschirmbreite vom Landepunkt entfernt. Eine Sitzung umfasst 14 Würfe. In 20 Stufen
(3-down/1-up) steigt der verdeckte Anteil der Flugzeit von 40 auf 80 %, die Flugdauer sinkt von 2,4 auf 1,1 s, und der Bogen wird höher
(30 bis 78 % der verfügbaren Höhe). Hauptwert ist die Stufe, dazu kommt die mittlere Abweichung. Wohin der Blick dabei geht, wird nicht
gemessen, nur wo getippt wird.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und Spielcode (Chunk `88025-…js`, Module wie 406), Stand 29.09.2026. Grad = eigene Umrechnung
(24″-Full-HD ≈ 38 px/° bei 60 cm; 11″-Tablet quer 1180 × 820 ≈ 36 px/° bei 40 cm).

- **Ablauf (Code):** Vollbild → Countdown (≈ 2,5 s) → 30–120 s → „COMPLETE“ mit Sitzungszähler; keine Wertung.
- **Bewegung (Code):** Jede Runde wählt einen Landepunkt zufällig (x über die ganze Breite bis 2 Radien vor dem Rand,
  y zwischen 20 und 80 % der Höhe). Der Punkt legt pro Bild einen festen Anteil der Reststrecke zurück (Rate 3,5 × Tempo
  pro Sekunde) – also **exponentielles Abbremsen**: Höchsttempo gleich am Start, 90 % der Strecke nach 0,66 s,
  praktisch Stillstand nach 1,3 s (bei 1×). Die Bewegungsphase dauert 1,5 Tempo-Einheiten, der ganze Zyklus 2,2; die
  Richtung ist innerhalb einer Bewegung gerade. Rechnung zeitbasiert (dt, max. 100 ms je Bild).
- **Sprungweiten (eigene Simulation):** Monitor im Mittel ≈ 18° (90 % ≤ 34°), Tablet ≈ 12° (90 % ≤ 22°); Anfangstempo ∝ Weite:

| Tempo | 0,5× | 1× | 2× | 3× | 5× | 7× | 9× |
|---|---|---|---|---|---|---|---|
| Zyklus / davon Ruhe (s) | 4,4 / 1,4 | 2,2 / 0,7 | 1,1 / 0,35 | 0,73 / 0,23 | 0,44 / 0,14 | 0,31 / 0,1 | 0,24 / 0,08 |
| 90 % der Strecke erreicht nach (s) | 1,32 | 0,66 | 0,33 | 0,22 | 0,13 | 0,09 | 0,07 |
| Anfangstempo bei mittlerem Sprung, Monitor / Tablet (°/s) | 32 / 21 | 64 / 42 | 127 / 85 | 191 / 127 | 318 / 212 | 445 / 297 | 572 / 382 |

- **Linie (Code):** Standard **sichtbar**; sie verbindet die aktuelle Position mit dem Landepunkt (2 px, 22 % Deckkraft)
  und erscheint im selben Bild, in dem die Bewegung startet – ein Vorab-Hinweis ist sie also nicht, verrät aber sofort
  das Ziel. „Hide Line“ entfernt sie; dann ist der Landepunkt nur aus Richtung und Tempo ableitbar (Reststrecke =
  aktuelles Tempo × Zeitkonstante, bei 1× 0,29 s – eine feste, lernbare Regel).
- **„Random Speed“ (Code):** Tempofaktor als feste Summe langsamer Sinusschwingungen (≈ 0,13–0,5 Hz), 0,38–1,92 (Mittel
  1,15); zusätzlich wird die Zykluslänge in **jedem Bild** neu zwischen 1,8 und 3,0 ausgelost, sodass der nächste Sprung
  praktisch schon bei ≈ 1,95–2,05 Einheiten kommt (bildratenabhängig: mehr Bilder/s → etwas früher).
- **Reiz/Eingabe (Code):** „Size 16 px“ = Radius (Ring Ø 32 px ≈ 0,84° Monitor, ≈ 0,9° Tablet), 10–50 px; sechs Farben
  ohne Informationsgehalt, optional Spur, „Scanlines“, „Day Mode“; keine Blitze. Unter Maus/Finger erscheint ein
  Fadenkreuz, das **nicht ausgewertet** wird.
- **Bildrate/Details (Code):** Abbremsen pro Bild gerechnet (Euler-Schritt): bei 60 Hz und 1× 5,8 % der Reststrecke je
  Bild (≈ exakt), bei 9× 52 % – das Ziel „springt“ in 3–5 Bildern; nach Bildaussetzern (dt bis 100 ms) schießt es ab 3×
  über den Landepunkt hinaus. Die erste Bewegung einer Runde nutzt die alte Canvasgröße in Gerätepixeln (erster Start
  300 × 150) und kann oben links oder außerhalb des Bildes liegen.

**Widersprüche Regeltext ↔ Code:** (1) „Position während einer kurzen Verdeckung einschätzen“, „Austrittsstelle“ – es
gibt **keine Verdeckung**. (2) „Prüfe danach Reaktionszeit und Positionsabweichung“, Tabelle mit „Genauigkeit %“,
„Abweichung px“, „Übereinstimmung der Blickfolge 0,95–1,02“ – nichts wird gemessen, Augen schon gar nicht. (3) „Stetig
wechselnde Flugbahnen“ – gerade, abbremsende Strecken. (4) „Random Speed: erratic acceleration“ – langsame Tempowelle.

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite beschreibt eine sensomotorische Latenz von 130–150 ms, die das Kleinhirn mit den frontalen Augenfeldern über
ein „internes Vorwärtsmodell“ **vollständig neutralisiere**; ein frontaler „Geschwindigkeitsspeicher“ halte den Blick bei
Verdeckung „bis zu zwei Sekunden autonom“ (Bennett & Barnes, 2003). Zielgruppen: Shooter (Vorhaltemaß, Pre-Aiming,
„Trefferquoten steigen drastisch“), Tennis/Baseball; 5–8 Runden à 60 s, 4–5× pro Woche; 144 Hz verbessere die
Vorhersage (Woods et al., 2015); Vorwärtsmodelle blieben im Alter „hochgradig plastisch“ (Kowler, 1989). Stufentabelle
„Elite > 94 %, < 15 px“ bis „Basis < 62 %, > 65 px“.

- **Stufen ohne Datengrundlage:** Die Seite misst weder Blick noch Zeiger und sammelt nach eigener Aussage keine Daten;
  keine der Quellen enthält solche Stufen. Ein „Gain“ von 1,02 ist ohne Eyetracker nicht bestimmbar.
- **Verdeckung – im Grundsatz richtig, im Detail überzeichnet:** Verschwindet ein Ziel, bremst das Auge nach ≈ 190 ms ab
  und behält nur ≈ 40–60 % seines Tempos (Becker & Fuchs, 1985); vor dem erwarteten Wiederauftauchen beschleunigt es
  vorausschauend wieder (Bennett & Barnes, 2003); bei Ausblendung sind FEF, SEF, Parietal-, präfrontaler Kortex und
  Kleinhirn aktiver (Lencer et al., 2004). „Vollständig neutralisiert“ ist falsch – und für diese Übung ohne Verdeckung
  ohnehin nicht einschlägig.
- **Quellen falsch zugeordnet:** Robinson (1965) beschreibt Mechanik, nicht Kleinhirn/FEF; Kowler (1989) zeigt, dass
  Erwartung die antizipatorische Folge steuert – nichts zu Alter; Woods et al. (2015) enthält nichts zu 144 Hz.
- **Sport:** Vorausschauende Blicksprünge gibt es – Cricket-Schlagleute springen zum erwarteten Aufsetzpunkt, Gute mit
  kürzerer Latenz (Land & McLeod, 2000). Dass ein Bildschirm-Drill das verbessert, ist nicht untersucht; „Trefferquoten
  steigen drastisch“ ist unbelegt. „150-km/h-Ball ≈ 400 ms“ ist plausibel (18,44 m → ≈ 0,44 s; eigene Rechnung).
- **Sinnvoll:** „Blick nicht anhalten“ passt zur Forschung (Mitgehen verbessert Bewegungsvorhersage: Spering et al., 2011).

## 4. Optische und okulomotorische Grundlagen

- **Was das Auge tun kann:** Das Auge kann dem fliegenden Ball glatt folgen (Latenz ≈ 100 ms bei unvorhersehbarem Start, Anfangsbeschleunigung begrenzt: Carl & Gellman, 1987) und mit Aufholsakkaden nachsetzen
  (reguläre Latenz ≈ 150 ms und mehr, Express-Sakkaden ≈ 100 ms: Fischer & Ramsperger, 1984). Aufholsakkaden verrechnen Positionsfehler
  **und** Zieltempo, brauchen ≈ 90 ms, um Bahnänderungen einzubeziehen; der Tempo-Anteil sättigt oberhalb ≈ 15°/s (de Brouwer et al., 2002b).
  Sakkade und Folge arbeiten als ein Prozess (Orban de Xivry & Lefèvre, 2007). Folgt der Blick dem Ball, wird die Vorhersage der Bewegung
  besser (Spering et al., 2011).
- **Verdeckung:** Verschwindet ein bewegtes Ziel, bremst das Auge nach ≈ 190 ms ab und behält nur ≈ 40–60 % seines Tempos (Becker & Fuchs,
  1985); vor einem erwarteten Wiederauftauchen beschleunigt es vorausschauend wieder (Bennett & Barnes, 2003). Bei Ausblendung sind frontales
  und supplementäres Augenfeld, parietaler und präfrontaler Kortex und Kleinhirn aktiver (Lencer et al., 2004). In dieser Übung taucht der
  Ball im Flug nicht wieder auf; die Wand wird erst nach dem Tipp durchsichtig.
- **Sehwinkel und Wege:** Der Ball hat einen Durchmesser von etwa 5 % der kürzeren Bildschirmseite (am 11-Zoll-Tablet in 40 cm etwa 1,2°); die
  Sehschärfe ist kaum gefordert. Die Wurfweite beträgt 42–78 % der Bildschirmbreite (am Tablet quer in 40 cm grob 15–25°), die Flugbahn läuft
  über große Teile des Bildschirms. Zum Antworten muss der Landepunkt aus Richtung und Tempo des sichtbaren Bahnabschnitts geschätzt werden.
- **Gleitsicht/Arbeitsplatz:** Der scharfe Bereich der zwei untersuchten Gleitsichtgläser war in 60 cm nur ≈ 13–18° breit (Einstärkenglas ≈ 60°);
  Blick und Kopf brauchten damit länger, bis das Bild ruhig stand (Han et al., 2003, n = 11). Würfe über die ganze Bühne führen oben in den
  Fernteil, unten in den Nahteil – Arbeitsplatzbrille, kleineres Feld, Kopfbewegung zulassen; Tablet in 40 cm ≈ 2,5 dpt (Rechenregel: 20 cm =
  5 dpt, 10 cm = 10 dpt). **Trockenes Auge:** ≈ 11,6 Lidschläge/min beim Lesen am Bildschirm, im Mittel 16 % unvollständig (Portello et al., 2013)
  → Ruhephasen zum Blinzeln nutzen. **Alter:** Folge lässt nach, Vorhersage bleibt (Sprenger et al., 2011) → niedrige Stufen.

## 5. Neurowissenschaftliche Grundlagen

- Sakkaden auf bewegte Ziele nutzen Bewegungssignale aus MT/MST; frontales Augenfeld, Colliculus superior und Kleinhirn steuern Sakkade und
  Folge gemeinsam (Krauzlis, 2004; Orban de Xivry & Lefèvre, 2007).
- Vorhersage beruht auf extraretinalen Signalen (Efferenzkopie, kurzer Speicher für Tempo und Zeitpunkt) und Erwartung (Barnes, 2008;
  Kowler et al., 2019). Dass die Übung ein Netzwerk „trainiert“, ist nicht untersucht.
- **Klinischer Hintergrund:** Die äußeren Augenmuskeln werden klinisch geprüft, indem die Augen einem nahen Ziel folgen, das in einem „H“
  geführt wird; die Prüfung betrifft die Hirnnerven III, IV und VI (Muchnick, 2008, S. 32–35). Diese Übung ist keine solche Prüfung.

## 6. Motorische Grundlagen

Gefordert ist ein einzelner Zieltipp mit Finger oder Maus je Wurf; die Genauigkeit wird als Abstand zum Landepunkt gewertet. Beim Abfangen
bewegter Ziele bestimmen die Augenbewegungen die Genauigkeit der Handbewegung mit (Fooken et al., 2021).

## 7. Einflussfaktoren und Messgrenzen

- **Keine Blickmessung:** Ohne Eyetracker bleibt offen, ob der Blick dem Ball folgte oder vorausschauend zum Landepunkt sprang; gemessen wird
  nur, wo getippt wird.
- **Gerät:** Die Trefferzone ist in Prozent der Bildschirmbreite festgelegt und damit auf großen Bildschirmen in Zentimetern und Grad größer;
  Wurfweiten und °/s hängen von Bildgröße und Abstand ab. Ergebnisse verschiedener Geräte (Touch, Maus, Tablet, Monitor) nicht gleichsetzen:
  Zwei Verfahren können ähnliche Tendenzen zeigen, ohne dieselben Werte zu liefern (Mountford et al., 2004, S. 24).
- **Person:** Alter, Müdigkeit, Konzentration; die Wurfform wird rasch vertraut, spätere Würfe sind leichter, ohne dass das etwas über andere
  Situationen sagt.
- **Streuung:** Messungen am Menschen streuen stärker als an Prüfkörpern; ein einzelner Wurf sagt wenig, und aussagekräftig ist nur der
  Verlauf über mehrere Sitzungen (Mountford et al., 2004, S. 43–44).

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach:** Vorhersagbare Bewegungsmuster werden im Labor schnell gelernt (Kowler et al., 2019); bei Verdeckung stieg der
  Folge-Gain mit Belohnung nach 8–10 Tagessitzungen von 0,59 auf 0,89 (Madelain & Krauzlis, 2003, Menschen). Hier gibt es mit der
  Abweichung nach jedem Wurf ein Lernsignal, aber eine Trainingsstudie zu genau dieser Aufgabe fehlt.
- **Naher Transfer – fehlend:** nicht untersucht (Madelain & Krauzlis: Übertragung auf andere Tempi, aber andere Aufgabe).
- **Alltagstransfer – fehlend:** keine Studie zu Sport, E-Sport oder Verkehr. Vorausschauende Blicksprünge gibt es im Sport – Cricket-Schlagleute
  springen zum erwarteten Aufsetzpunkt, Gute mit kürzerer Latenz (Land & McLeod, 2000); dass ein Bildschirm-Drill das verbessert, ist nicht
  untersucht.
- **Praxisangaben (Erfahrungswissen, nicht belegt):** Aufgaben werden in der Praxis am eigenen Arbeitspunkt begonnen und in kleinen, selbst
  gesteuerten Schritten gesteigert; hier entspricht dem die Stufe, die dem Ergebnis folgt.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** Landepunkt-Vorhersage bei verdecktem Ball geübt werden soll (Stufe zwischen 303 und 414/409); auf niedrigen Stufen mit
  wenig Verdeckung beginnen; eine kurze Übung mit Rückmeldung nach jedem Wurf gewünscht ist.
- **Weniger passend, wenn …** Blickfolge hinter einer Verdeckung (→ 409), lange glatte Folge (→ 402–404) oder Handgenauigkeit (→ 501, 104)
  gesucht sind.
- **Vorsicht / anpassen bei …**
  - `presbyopie_gleitsicht`: Würfe über die ganze Bühne in Fern-, Nah- und seitliche Unschärfezonen → Arbeitsplatzbrille, kleineres Feld,
    Kopf mitbewegen.
  - `schwindel_vestibulaer`, `reisekrankheit`: bewegter Ball über große Teile der Bühne; langsam beginnen, bei Übelkeit abbrechen.
  - `nystagmus`, `schielen_binokular`: Blicksprünge und Folge oft verändert – keine Rückschlüsse ziehen.
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: Pausen, blinzeln.
  - `kinder_unter_6`: Die Folgebewegung reift bis ins Jugendalter (Katsanis et al., 1998).
  - Warnzeichen: Doppelbilder, plötzlicher einseitiger Sehverlust, Lichtblitze oder neue Schleier, Kopfschmerz mit Sehverschlechterung,
    Schwindel oder neu auftretendes Zittern gehören in eine ärztliche Abklärung (Muchnick, 2008, S. 6, 28); dann nicht üben.
- **Kombiniert gut mit …** 303 (Sprungziele), 414 (Sprung während der Bewegung), 409 (Dunkelphasen), 410/415 (unvorhersehbare Richtungswechsel),
  105 (Details am bewegten Ziel).
- **Abgrenzung in der Gruppe:** keine Dublette. Anders als 402–406 (glatte Blickfolge mit Zeichenaufgabe) und 409 (Folgen während Dunkelphasen)
  steht hier die Vorhersage eines Landepunkts im Mittelpunkt, geantwortet wird mit einem Zieltipp.

Keine Diagnose, kein Heil- oder Sehversprechen.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Versprechen einlösen oder umbenennen:** echte Verdeckung (z. B. Ziel verschwindet für 300–800 ms auf gerader Bahn
  mit konstantem Tempo) oder ehrlicher Name „Landepunkt vorhersehen“.
- **Überprüfbare Aufgabe statt Scheinmessung:** Landepunkt vor Bewegungsende antippen (Abstand in Grad, früher =
  schwerer), oder Zeichen im gelandeten Ziel erkennen; adaptiv (3-down/1-up). Verwandte Ideen stecken in den
  Blickfit-Übungen Punktlandung (Timing mit Verdeckung) und Zielfang (vorausschauendes Abfangen).
- **Reiz in Grad:** Sprungweite 5–15°, Anfangstempo ≤ 40°/s, Bewegung mit sanftem Anlauf (kein Tempo-Sprung aus dem
  Stand), Ruhe zufällig 0,5–1,5 s; dt-korrekte statt pro Bild gerechneter Abbremsung, Startposition aus der echten
  Bildgröße. **Tablet:** Querformat, Ständer, Radius ≥ 20 px. **Texte:** keine Hirnregionen-, Gain- oder
  Sportversprechen; Pausen-, Blinzel- und Gleitsichthinweis.

## 11. Quellen

### Von der Website angegeben
- Barnes, G. R. (2008). Cognitive processes involved in smooth pursuit eye movements. *Brain and Cognition, 68*(3), 309–326. https://doi.org/10.1016/j.bandc.2008.08.020 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (Vorhersage über extraretinale Signale ja; „Verzögerung vollständig neutralisiert“ nein)
- Bennett, S. J., & Barnes, G. R. (2003). Human ocular pursuit during the transient disappearance of a visual target. *Journal of Neurophysiology, 90*(4), 2504–2520. https://doi.org/10.1152/jn.01145.2002 – **Prüfung:** DOI falsch (Website: 10.1152/jn.00843.2002, gehört zu einer TRPM8-Studie von Nealen et al.), übrige Angaben richtig; **stützt:** teilweise (vorausschauende Wiederbeschleunigung ja; Tempo wird aber nicht „autonom gehalten“, keine Hirndaten zu FEF/SEF-„Speicher“; für die Übung ohne Verdeckung nicht einschlägig)
- „Kowler, E. (1989). Cognitive expectations, not work, determine the direction of smooth pursuit eye movements. *Vision Research, 29*(12), 1769–1777.“ – **Prüfung:** Titel, Heft, Seiten und DOI falsch (10.1016/0042-6989(89)90161-2 gehört zu Dosher et al., kinetischer Tiefeneffekt). Reale Arbeit: Kowler, E. (1989). Cognitive expectations, not habits, control anticipatory smooth oculomotor pursuit. *Vision Research, 29*(9), 1049–1057. https://doi.org/10.1016/0042-6989(89)90052-7; **stützt:** nein (Erwartung steuert antizipatorische Folge; nichts zu Alter oder Kleinhirn-Plastizität)
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Netzwerk, gemeinsame Architektur mit Sakkaden ja; „weiß exakt, wo das Objekt in 200/500 ms ist“ nein)
- Robinson, D. A. (1965). The mechanics of human smooth pursuit eye movement. *The Journal of Physiology, 180*(3), 569–591. https://doi.org/10.1113/jphysiol.1965.sp007718 – **Prüfung:** DOI stimmt ✓ (keine Kurzfassung verfügbar, Inhalt nicht im Volltext geprüft); **stützt:** vermutlich nein (Arbeit zur Mechanik der glatten Folge; ein Beleg für ein Kleinhirn-/FEF-Vorwärtsmodell ist nicht erkennbar – mangels Volltextprüfung unsicher)
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (einfache Reaktionszeit und Hardware-Verzögerung; nichts zu 144 Hz oder Bahnvorhersage)

### Weitere Fachliteratur
- Becker, W., & Fuchs, A. F. (1985). Prediction in the oculomotor system: Smooth pursuit during transient disappearance of a visual target. *Experimental Brain Research, 57*(3), 562–575. https://doi.org/10.1007/BF00237843 – Tempoabfall bei Verdeckung
- Carl, J. R., & Gellman, R. S. (1987). Human smooth pursuit: Stimulus-dependent responses. *Journal of Neurophysiology, 57*(5), 1446–1463. https://doi.org/10.1152/jn.1987.57.5.1446 – Folgelatenz ≈ 100 ms, Anfangsbeschleunigung
- de Brouwer, S., Missal, M., Barnes, G., & Lefèvre, P. (2002b). Quantitative analysis of catch-up saccades during sustained pursuit. *Journal of Neurophysiology, 87*(4), 1772–1780. https://doi.org/10.1152/jn.00621.2001 – Aufholsakkaden verrechnen Position und Tempo, ≈ 90 ms, Sättigung > 15°/s
- Fischer, B., & Ramsperger, E. (1984). Human express saccades: Extremely short reaction times of goal directed eye movements. *Experimental Brain Research, 57*(1), 191–195. https://doi.org/10.1007/BF00231145 – Sakkadenlatenz ≈ 100/150 ms
- Fooken, J., Kreyenmeier, P., & Spering, M. (2021). The role of eye movements in manual interception: A mini-review. *Vision Research, 183*, 81–90. https://doi.org/10.1016/j.visres.2021.02.007 – Auge und Hand beim Abfangen
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm
- Katsanis, J., Iacono, W. G., & Harris, M. (1998). Development of oculomotor functioning in preadolescence, adolescence, and adulthood. *Psychophysiology, 35*(1), 64–72. https://doi.org/10.1111/1469-8986.3510064 – Reifung der Folgebewegung
- Kowler, E., Rubinstein, J. F., Santos, E. M., & Wang, J. (2019). Predictive smooth pursuit eye movements. *Annual Review of Vision Science, 5*, 223–246. https://doi.org/10.1146/annurev-vision-091718-014901 – Übersicht Vorhersage
- Land, M. F., & McLeod, P. (2000). From eye movements to actions: How batsmen hit the ball. *Nature Neuroscience, 3*(12), 1340–1345. https://doi.org/10.1038/81887 – vorausschauende Sakkaden im Sport
- Lencer, R., Nagel, M., Sprenger, A., Zapf, S., Erdmann, C., Heide, W., & Binkofski, F. (2004). Cortical mechanisms of smooth pursuit eye movements with target blanking: An fMRI study. *European Journal of Neuroscience, 19*(5), 1430–1436. https://doi.org/10.1111/j.1460-9568.2004.03229.x – Hirnareale bei Verdeckung
- Madelain, L., & Krauzlis, R. J. (2003). Effects of learning on smooth pursuit during transient disappearance of a visual target. *Journal of Neurophysiology, 90*(2), 972–982. https://doi.org/10.1152/jn.00869.2002 – Lernen bei Verdeckung (Menschen, laut MeSH-Indexierung)
- Orban de Xivry, J.-J., & Lefèvre, P. (2007). Saccades and pursuit: Two outcomes of a single sensorimotor process. *The Journal of Physiology, 584*(1), 11–23. https://doi.org/10.1113/jphysiol.2007.139881 – Sakkade und Folge als ein Prozess
- Portello, J. K., Rosenfield, M., & Chu, C. A. (2013). Blink rate, incomplete blinks and computer vision syndrome. *Optometry and Vision Science, 90*(5), 482–487. https://doi.org/10.1097/OPX.0b013e31828f09a7 – Lidschlag
- Spering, M., Schütz, A. C., Braun, D. I., & Gegenfurtner, K. R. (2011). Keep your eyes on the ball: Smooth pursuit eye movements enhance prediction of visual motion. *Journal of Neurophysiology, 105*(4), 1756–1767. https://doi.org/10.1152/jn.00344.2010 – Mitgehen verbessert Bewegungsvorhersage
- Sprenger, A., Trillenberg, P., Pohlmann, J., Herold, K., Lencer, R., & Helmchen, C. (2011). The role of prediction and anticipation on age-related effects on smooth pursuit eye movements. *Annals of the New York Academy of Sciences, 1233*, 168–176. https://doi.org/10.1111/j.1749-6632.2011.06114.x – Alter
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen, Augenbewegungsprüfung, Sehbahn (S. 6, 28, 32–35)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Messgrundsätze: Wiederholbarkeit, Mehrfachmessung (S. 24, 43–44)
