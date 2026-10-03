---
# ===== Kennung =====
nr: 511
kennung: angle-hold-trainer
name: "Winkel halten – ruhig abwarten und auf plötzlich auftauchende Ziele an zwei Rändern reagieren"
name_original: "Aim Trainer – Crosshair Placement & Winkel halten (Seitentitel: Aim Trainer | Crosshair Placement | SkillDrills)"
kapitel: "Zielen (FPS)"
kapitel_original: "fps"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/fps/angle-hold-trainer"
blickfit_umsetzung: {kennung: "winkel-halten", name: "Winkel halten", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/winkel-halten/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Man wartet ruhig in der Mitte; links und rechts am Rand liegt je ein Durchgang. Nach einer unvorhersehbaren Wartezeit blendet in einem der beiden Durchgänge weich ein Ziel ein, schiebt sich ein Stück heraus und verschwindet wieder; es soll in dieser kurzen Zeit angetippt werden. Wer zu früh tippt (vor dem Auftauchen oder weniger als 100 ms danach), erhält einen Frühstart angezeigt. Mit steigender Stufe werden die Ziele kleiner, kürzer sichtbar und streuen über eine größere Höhe."
ziel_funktionen: [einfache_reaktion, auge_hand_koordination, zielbewegung_tempo]
eingabe: [maus]
tablet_geeignet: nein
dauer_sekunden: 45
schwierigkeit_anpassung: "Laut Code stufenlos: Level = 1 + Punkte/1 400; alle Werte nähern sich exponentiell einem Endwert (Level 15 ≈ 76 % des Wegs). Sichtbarkeit je Ziel 1 400 → 420 ms (Level 15 ≈ 650 ms), Zielradius 26 → 12 px (Level 15 ≈ 15 px), Trefferzugabe 10 → 4 px, Wartezeit 900–1 600 → 350–650 ms, Herausschieben 52 → 24 px, Höhenband 50 → max. 96 % der Spielfeldhöhe; Köder-Ziele ab Level ≈ 6,6, Anteil bis 35 %. Eine hohe Combo verkürzt Sichtbarkeit (−20 %) und Wartezeit (−25 %) und verkleinert das Ziel (−15 %) zusätzlich."
messgroessen: ["Original: Punkte, Combo/Max-Combo, erreichtes Level, Präzision (Treffer/[Treffer + Fehlklicks + Frühschüsse + entkommene Ziele]), mittlere ‚Reaktionszeit‘ (Erscheinen bis Treffer, enthält die Zielbewegung), Zähler für Fehlklicks, Frühschüsse, entkommene Ziele, Note", "Original misst KEINEN Wandabstand und kein ruhiges Halten, obwohl die Seite das verspricht", "sinnvoll: Median und Streuung der Zeit bis zur Bewegungsauslösung und bis zum Treffer, getrennt nach Seite (gleiche/andere Seite als Fadenkreuz), Fehlalarmrate auf Köder, Frühschussrate"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 1
    stereosehen: 0
    peripheres_sehen: 2
    nutzbares_sehfeld: 2
    blickfolge: 0
    sakkaden: 2
    fixation: 1
    bewegungswahrnehmung: 1
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 2
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 2
    geteilte_aufmerksamkeit: 1
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 2
    entscheidung_wahlreaktion: 1
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 3
    auge_hand_koordination: 3
    zielbewegung_tempo: 3
    zielbewegung_praezision: 2
    kontinuierliche_steuerung: 0
    ruhige_hand: 1
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 3
  flimmern_lichtreize: 2
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 1

# ===== Auswahlhilfe =====
voraussetzungen: ["Maus und Desktop-Browser mit Pointer Lock (Mauszeigersperre), möglichst Vollbild", "beide Bildschirmränder (ca. ±20° bei 24″ in 60 cm) im Gesichtsfeld erfassbar", "Monitor im Zwischenbereich (ca. 50–75 cm) scharf sehen", "ab höheren Stufen Grün von Orange unterscheiden"]
vorsicht_bei: [gesichtsfeldausfall, photosensitive_epilepsie, migraene_lichtempfindlich, presbyopie_gleitsicht, trockenes_auge_bildschirm, kopfschmerz_asthenopie, farbsehschwaeche, tremor_parkinson, hand_arm_beschwerden]
geeignet_fuer: ["ruhiges Abwarten und schnelles Reagieren auf plötzlich erscheinende Reize am Bildrand mit anschließender Zielbewegung üben", "erst bei Reizbeginn tippen statt vorab (Frühstarts vermeiden)", "Blick-Hand-Koordination bei weiten Zielbewegungen über den Bildschirm", "Selbstvergleich auf demselben Gerät (Median der Zeit, Frühstarts, Trefferquote)"]
weniger_geeignet_fuer: ["eine saubere Messung der einfachen Reaktionszeit (dafür 101 oder 301 – hier ist die Zielbewegung eingerechnet)", "echtes „Vorhalten“ mit Koinzidenz-Timing (nicht Gegenstand der Übung)", "Personen mit einseitigem Gesichtsfeldausfall", "Erwartung eines Seh-, Sicherheits- oder Alltagsnutzens"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Die Zielleistung in Zeigeaufgaben am Bildschirm steigt mit Übung und kann gut reproduzierbar gemessen werden (Listman et al., 2021); die einfache Reaktionszeit selbst ändert sich wenig. Ein Transfer von Zieltrainings auf Spielleistung oder Alltag ist nicht untersucht, Actionspiele zeigen nur kleine kausale Effekte (g = 0,30; Bediou et al., 2023)."
aehnliche_uebungen: [308, 307, 503, 508, 501, 510, 101, 301, 102, 801]
stichworte: ["Crosshair Placement", "Winkel halten", "Angle Hold", "Pre-Aim", "Peeker's Advantage", "Fake Peek", "Frühschuss", "Reizbeginn peripher", "Flick", "einfache Reaktionszeit", "Go/No-Go", "Aim Trainer"]
---

# 511 · Winkel halten – ruhig abwarten und auf plötzlich auftauchende Ziele an zwei Rändern reagieren

> Original: „Aim Trainer – Crosshair Placement & Winkel halten“ – skilldrills.online, Kapitel Zielen (FPS) · Blickfit: noch nicht umgesetzt (verwandt: „Blitzreaktion“, „Stopp & Los“)

## 1. Kurzbeschreibung

Man wartet ruhig in der Mitte; links und rechts am Rand liegt je ein Durchgang (eine Öffnung in einer Wand). Nach einer unvorhersehbaren Wartezeit (mindestens 1 s, im Mittel rund 2 s, höchstens 4,5 s) blendet in einem der beiden Durchgänge weich ein Ziel ein und schiebt sich in 360 ms sinusförmig ein Stück heraus, ohne zu blitzen. Man tippt es an, solange es sichtbar ist. Ein Tipp in der Wartezeit oder weniger als 100 ms nach dem Erscheinen ist ein Frühstart: Er beendet den Durchgang als Fehler, wird getrennt gezählt und kostet keine Zeit. Mit der Stufe (1–14; drei Treffer in Folge steigern, ein Fehler senkt) sinkt der Zielradius von 6,8 auf 3,6 Einheiten (eine Einheit ist 1 % der kürzeren Bildschirmseite), die Sichtzeit von 1,7 s auf etwa 0,5 s (höchstens 9 % kürzer je Stufe) und die Ziele streuen über 25 % bis 85 % der Höhe; die Wartezeit hängt nicht von der Stufe ab. Eine Sitzung hat 20 Durchgänge; ausgewertet werden Median der Zeit, Zahl der Frühstarts, Trefferquote und Treffer.

## 2. Ablauf im Original (Analyse)
Quelle: Regeltext der Seite und ausgelieferter Spielcode (seitenspezifischer Chunk, formatiert; Werte in Canvas-Pixeln, Umrechnung für 24″-FHD-Monitor im Vollbild in 60 cm ≈ 38 px/° nahe der Bildmitte, EIG).
- **Eingabe:** Nur Maus. Nach dem Countdown (2,45 s) fordert das Canvas `requestPointerLock()` ohne `unadjustedMovement` an; das Fadenkreuz folgt `movementX/Y` × Empfindlichkeit und startet in der Mitte. Reine Touch-Geräte werden erkannt und bekommen nur einen Hinweis (Code).
- **Szene:** „Mauern“ je 19 % der Breite, begrenzt auf 70–170 px (Vollbild: 170 px). Die Kanten liegen bei 1 920 px Breite je 790 px (≈ 20°, trigonometrisch gerechnet) von der Mitte und 1 580 px (≈ 40°) voneinander entfernt. Das Ziel wird **über** die Mauer gezeichnet, ist also ab dem ersten Bild vollständig sichtbar – es gibt kein allmähliches Hervortreten hinter einer Ecke (Code).
- **Ziel:** Seite je 50 % links/rechts, Höhe gleichverteilt in einem Band von 50 % (Level 1) bis 96 % der Spielfeldhöhe (bei 1 080 px ±7° → ±13°). Kreis mit Leuchtrand, Radius 26 → 12 px (Ø ≈ 1,4° → 0,6°), Trefferzone Radius + 10 → 4 px (Ø 72 px ≈ 1,9° auf Level 1, ≈ 41 px ≈ 1,1° auf Level 15, mindestens 24 px ≈ 0,6°). Grün #10b981, ab Combo 10 heller (#34d399); Köder orange (#f97316).
- **Bewegung:** Das Ziel schiebt sich sinusförmig bis 52 px (≈ 1,4°; Level 15 ≈ 31 px) heraus und zurück; Spitzengeschwindigkeit nur ≈ 3–4°/s. Die Position wird aus der verstrichenen Zeit berechnet (bildfrequenzunabhängig); nur Trefferpartikel laufen pro Bild (kosmetisch).
- **Zeitfenster:** Sichtbarkeit 1 400 ms (Level 1), ≈ 650 ms (Level 15), Grenzwert 420 ms, mit hoher Combo bis 336 ms. Köder sind nur min(220 ms; 0,45 × Sichtbarkeit) sichtbar. Wartezeit bis zum nächsten Ziel gleichverteilt 900–1 600 ms (Level 1), ≈ 480–880 ms (Level 15), Grenzwerte 350–650 ms, mit hoher Combo bis ≈ 260–490 ms (Untergrenzen 200/400 ms) (Code). Das Verschwinden hängt an einer seitenweiten Einstellung „Zeitlimit“ (Standard: an); ist sie aus, bleiben Ziele und auch Köder stehen, bis geklickt wird – dann gibt es keine entkommenen Ziele, und ein Köder lässt sich nur durch einen Strafklick entfernen (Code).
- **Wertung:** Treffer = 100 Punkte × Combo-Faktor (1 bis 3 ab 50 Treffern in Folge) × Level-Faktor (1 + 0,5 · [Level − 1]/14, nach oben offen), **+2 s** (Uhr max. 60 s). Fehler setzen die Combo auf 0 und kosten **−1 s**: Klick ohne Ziel oder auf Köder (Frühschuss), Klick daneben (auch während eines Köders), echtes Ziel entkommen. Präzision = Treffer / (Treffer + Fehlklicks + Frühschüsse + Entkommene). Note nach √(Punkte/48 000).
- **„Reaktionszeit“:** gemessen vom Animationsbild, in dem das Ziel entsteht, bis zum Klick-Ereignis (`performance.now()`); sie enthält Anzeigeverzögerung, Blick- und Zielbewegung und ist damit keine einfache Reaktionszeit.
- **Rückmeldung:** Ton beim Erscheinen (links 520 Hz, rechts 680 Hz – ein zusätzlicher Seitenhinweis, wenn Ton an ist), Partikel, Bildschirmwackeln 6 px bei jedem Fehler (unabhängig von der Effekt-Einstellung) und nur bei aktivierten Effekten (Standard: an) zusätzlich ein rotes, radial auslaufendes Aufleuchten (Mitte 50 % Deckkraft, 0,45 s; ohne Sperrzeit).
- **Dauer:** Startzeit 45 s. Da jeder Treffer +2 s bringt und ein Durchgang auf höheren Stufen nur ≈ 1–1,5 s dauert, kann die Runde fast beliebig lange laufen und endet praktisch erst durch Fehler (EIG).
- **Widersprüche Regeltext ↔ Code:** (1) Deutsche Regeln „+0,6 s“ je Treffer, Code +2 s (englische Regeln korrekt). (2) Strafe „−0,8 s“, Code −1 s; sie greift immer, weil die Abfrage mit erzwungenem „an“ aufgerufen wird. (3) Entkommene Ziele werden bestraft, stehen aber nicht in den Regeln. (4) „Kopfhöhe halten“ und „Wandabstand einstellen“ sind nicht umsetzbar: Höhe und Seite sind zufällig, das Ziel läuft nicht ins Fadenkreuz. (5) „You can't memorize a rhythm“: Die Wartezeit wird mit steigendem Level enger (350–650 ms) und damit zeitlich **vorhersagbarer**. (6) Der Drill „misst Wandabstand“ – im Code nicht vorhanden.

## 3. Was die Website sagt – und wie das einzuordnen ist
**Aussagen:** Der Drill trainiere Crosshair Placement, Wandabstands-Kalibrierung, Trigger-Disziplin gegen Fake-Peeks, Reaktions-Timing und Kopfhöhen-Konsistenz. Richtiges Vorhalten „eliminiere“ Flicks und reduziere das Duell auf einen Klickimpuls; der Wandabstand solle D = v × T betragen. Der Peeker's Advantage (40–90 ms, T = RTT/2 + RTT/2 + T_interp) lasse sich so „mathematisch neutralisieren“. Zitiert werden Woods et al. (2015), Fitts (1954), Meyer et al. (1988), Woodworth (1899), im Text Donders (1868) und Hick (1952). Eine Tabelle nennt Latenzen bis zur Stufe „Radiant / CS2 Faceit Level 10“. Empfohlen: 10–15 min täglich.

**Einordnung:**
- **Belegt:** Die einfache visuelle Reaktionszeit liegt im Mittel bei 231 ms, nach Hardwarekorrektur 213 ms (N = 1 469; Woods et al., 2015) – „180–240 ms“ passt. D = v × T ist einfache Kinematik (EIG). Dass Netzlatenz in Ego-Shootern spürbar ist (Toleranz ≈ 100 ms; Claypool & Claypool, 2006) und dass Spiele sie mit Verfahren wie Lag-Kompensation ausgleichen, die Vorteile zwischen Spielenden verschieben, ist gut beschrieben (Liu, Xu & Claypool, 2022, Übersicht über > 80 Arbeiten).
- **Falsch zugeordnet:** Fitts, Meyer und Woodworth beschreiben Zielbewegungen – beim echten Winkelhalten gibt es gerade keine. Im Code dagegen ist fast jeder Treffer ein Flick; die Quellen passen also eher zum Code als zur Beschreibung. Donders' „unbewusster Trigger bei antizipiertem Reiz“ steht dort nicht; Hick (1952) beschreibt, wie die Wahlreaktionszeit mit der Zahl der Alternativen steigt (Größenordnung ≈ 5 bit/s), nicht „Trigger-Disziplin unter Köder-Druck“.
- **Nicht umgesetzt:** Das zentrale Versprechen – Fadenkreuz vorhalten, Ziel läuft hinein, Klick ohne Korrektur – kann man in diesem Drill nicht üben (Abschnitt 2, Punkt 4). Bei vorgegebenem Trefferort ist die zeitliche Präzision beim Abfangen zudem schlechter als bei frei wählbarem Ort (Brenner & Smeets, 2015) – ein echtes Vorhalte-Training bräuchte also eine eigene Aufgabe.
- **Überzogen/unbelegt:** 40–90 ms Peeker's Advantage und die Formel sind netztechnische Faustregeln ohne wissenschaftliche Quelle; „Klick-Latenzen im Sub-Millisekunden-Bereich“ ist irreführend, weil die lokale Systemlatenz 23–243 ms beträgt (Ivkovic et al., 2015); „ohne Mausbeschleunigung“ stimmt nicht, da `unadjustedMovement` fehlt (MDN). „150–190 ms Klick-Latenz“ ist für einfache Reaktionen eher zu schnell (Woods et al., 2015).
- **Tabelle ohne Datengrundlage:** Keine der Quellen enthält Rang-Werte („Radiant“, „Faceit 10“); die Website sammelt selbst keine Daten. Der Satz „Every figure quoted on this page comes from the published work listed above“ ist irreführend.
- **Messhinweise** (Bildintervall 16,7/6,9/4,1 ms) sind richtige Physik (240 Hz = 4,17 ms, also leicht abgerundet), stehen aber nicht bei Woods; `performance.now()` ist auf 100 µs vergröbert, nicht auf 1 ms (MDN).

## 4. Optische und okulomotorische Grundlagen

- **Reizbeginn in der Peripherie:** Das Ziel erscheint am linken oder rechten Rand, also weit seitlich der Mitte. Als Faustwert: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°; bei einem Tablet mit 20 cm Anzeigebreite liegt das Ziel grob 12–13° neben der Mitte. Ein plötzliches, kontrastreiches Auftauchen wird auch peripher sicher bemerkt (Yantis & Jonides, 1984); Sehschärfe spielt kaum eine Rolle (das Ziel ist weit größer als die Auflösungsgrenze von 1′ bei Visus 1,0). Gefordert ist, beide Ränder gleichzeitig im Blick zu behalten.
- **Blick vor der Hand:** Bei schnellen Zielbewegungen springt der Blick spontan etwa gleichzeitig mit dem Bewegungsbeginn zum Ziel; darf man den Blick nicht bewegen, wird die Zielbewegung ungenauer (Abrams et al., 1990). Jeder Durchgang verlangt also eine große Sakkade plus Zielbewegung.
- **Brille:** Mit Universal-Gleitsicht liegen die Ränder im seitlich unscharfen Bereich und hohe Ziele im Fernteil; das Bemerken klappt trotzdem, das Anvisieren verlangt aber Kopfbewegungen, die Zeit kosten. Bildschirm-Gleitsicht senkte die Kopfneigung am Monitor um 2,3° und verbesserte die Monitorsicht (Jaschinski et al., 2015). Wer den Blick starr hält, blinzelt seltener (Patel et al., 1991) → trockenes Auge; ein Lidschlag im Moment des Erscheinens verzögert die Reaktion.
- **Stereosehen = 0** (flache Darstellung ohne Disparität).

## 5. Neurowissenschaftliche Grundlagen

- **Einfache Reaktion:** Das reine Entdecken eines Reizes dauert ≈ 131 ms und ist altersunabhängig; die gesamte Reaktionszeit steigt mit dem Alter um ≈ 0,55 ms/Jahr (Woods et al., 2015).
- **Zeitliche Erwartung:** Bei variabler Wartezeit sinkt die Reaktionszeit, je länger man schon wartet (Vorperioden-Effekt; Niemi & Näätänen, 1981), weil das Gehirn zeitliche Regelmäßigkeiten nutzt (Nobre & van Ede, 2018). Damit sich der Zeitpunkt nicht erraten lässt, ist die Wartezeit hier so verteilt, dass die Wahrscheinlichkeit für „jetzt kommt es“ immer gleich bleibt (exponentieller Anteil, nicht alternd); das erschwert Vorwegnahme und damit Frühstarts.
- **Nicht tippen:** Ein Frühstart ist das vorzeitige Auslösen einer vorbereiteten Antwort. Echte Hemmung verlangen Go/No-Go-Aufgaben vor allem bei seltenen No-Go-Reizen (≤ 20 %) und schnellem Takt (≤ 1 500 ms; Wessel, 2018); hier gibt es keine No-Go-Reize, das Zurückhalten richtet sich nur gegen vorschnelles Tippen.
- **Wachsamkeit:** Anhaltendes Warten auf Reize ist geistig anstrengend und stressig (Warm et al., 2008); bei Ereignissen im Abstand von wenigen Sekunden ist es aber keine klassische Vigilanzaufgabe mit seltenen Reizen.

## 6. Motorische Grundlagen

- **Weite Zielbewegung statt Halten:** Die Strecke vom wartenden Finger zum Rand ist lang (bis zur halben Bildschirmbreite oder mehr). Schnelle Zielbewegungen bestehen aus Primär- und Korrekturbewegung (Elliott et al., 2010; Meyer et al., 1988); springt das Ziel, lenkt die Hand nach ≈ 110 ms um (Brenner & Smeets, 1997). Mit kleineren Zielen auf höheren Stufen steigt der Schwierigkeitsindex nach Fitts (log₂(D/W + 1)).
- **Zeitbudget:** Bei der kürzesten Sichtzeit von etwa 0,52 s bleiben nach einer einfachen Reaktion von 213–231 ms (Woods et al., 2015) rechnerisch nur ≈ 290 ms für Sakkade, Bewegung und Tipp (ohne Ein- und Ausblenden; grobe Abschätzung). Auf hohen Stufen gewinnt daher an Gewicht, auf welcher Seite man die Hand wartend hält – ein Glücksanteil, weil die Seite zufällig ist.
- **Touch:** Die Messung enthält die Verzögerung des Touchscreens und die Zeitauflösung des Browsers (Deber et al., 2015; Pronk et al., 2020).
- **Ruhig halten:** wird verlangt, aber nicht gemessen; schnelles Dauertippen lohnt nicht, weil jeder Tipp vor dem Auftauchen ein Frühstart ist.

## 7. Einflussfaktoren und Messgrenzen

- **Gerät:** Lokale Latenz von 23–243 ms verschlechtert Zielaufgaben schon ab 41 ms (Ivkovic et al., 2015). Die Bildfrequenz bestimmt, wann das Ziel sichtbar wird; die Zeit wird vom ersten gezeichneten Bild des Ziels an gemessen. Die Fenstergröße verändert Winkel und Strecke grundlegend.
- **Alter:** Ältere reagieren motorisch langsamer (Woods et al., 2015). Nur der Vergleich mit sich selbst am selben Gerät ist sinnvoll.
- **Messgüte:** Die angezeigte Zeit mischt Reaktion und Bewegung und hängt von der Seite ab, auf der man wartet. Einzelne Durchgänge streuen, wie jede Messung am Menschen; deshalb wird der Median über mehrere Durchgänge angegeben (vgl. Mountford et al., 2004, zu Mehrfachmessung). Für Normen oder Ränge taugen die Werte nicht. Zeigeaufgaben können mit anderen Systemen sehr zuverlässig messbar sein; für diese Übung ist das nicht geprüft.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** Die Zielleistung in Zeigeaufgaben am Bildschirm steigt über Tage (Treffer pro Sekunde deutlich, Trefferquote mäßig; Listman et al., 2021; vom Anbieter finanziert). Die einfache Reaktionszeit selbst ist eher stabil; Verbesserungen dürften vor allem aus schnellerer Zielbewegung, Strategie (Warteposition) und Vorwegnahme stammen (eigene Einschätzung). Für diese Übung gibt es keine Studie.
- **Naher Transfer – schwach:** Actionspiele (nicht einzelne Zielübungen) zeigen kausal g = 0,30 auf kognitive Tests (Bediou et al., 2023). Große Effekte digitaler Sehtrainings finden sich vor allem bei gerätegleichen Tests (Guo et al., 2025).
- **Alltagstransfer – fehlend:** Keine kontrollierte Studie zu dieser Art Übung → Spielleistung, Verkehr oder Beruf. „Brain-Training“ allgemein: viel Evidenz für die geübte Aufgabe, wenig für den Alltag (Simons et al., 2016).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand ruhiges Abwarten, Reagieren auf plötzliche Reize am Bildrand und schnelles Anvisieren ohne Vorwegtippen unter Zeitdruck üben möchte.
- **Weniger passend, wenn …** eine saubere Reaktionszeitmessung gewünscht ist (101, 301); ruhiges Halten oder Präzision im Vordergrund steht (705, 808, 509).
- **Vorsicht / anpassen bei …**
  - `gesichtsfeldausfall`: Ziele erscheinen nur an den äußeren Rändern; bei Ausfall einer Seite ist die Übung einseitig kaum lösbar. Ausfälle folgen dem Verlauf der Sehbahn (Muchnick, 2008, S. 32); neue Lücken, Doppelbilder oder plötzliche Sehverschlechterung sind ein Anlass für ärztliche Abklärung und kein Übungsthema (S. 6, 28).
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: Die Übung arbeitet ohne Blitze und ohne Wackeln; Ziele blenden weich ein und aus, Fehler erscheinen als Hinweis. Bei bekannter Lichtempfindlichkeit dennoch Vorsicht (Fisher et al., 2005).
  - `presbyopie_gleitsicht`: Ziele an den Rändern und oben/unten; Zwischenbereichs- oder Bildschirmbrille bevorzugen, ein kleineres Fenster verkleinert die Winkel.
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: starrer, lidschlagarmer Blick beim Warten (Patel et al., 1991; Sheppard & Wolffsohn, 2018); Pausen einplanen.
  - `tremor_parkinson`, `hand_arm_beschwerden`: weite Zielbewegungen unter Zeitdruck; bei Zittern oder Beschwerden pausieren.
- **Kombiniert gut mit …** 101 (einfache Reaktion ohne Zielen), 102 (Go/No-Go), 308 (Peeks erkennen), 501 (Flick), 510 (Auswahl nach Regel), 801 (periphere Reize).
- **Überschneidungen:** In der Gruppe 509–515 keine Dublette. Fachlich nahe liegt 308 (Kapitel Reaktion: Ziele schieben sich an einer von acht Blockkanten heraus, Reaktion plus Zielbewegung, auch per Touch) – nicht beide hintereinander vorschlagen; 511 hat nur zwei, dafür weiter außen liegende Kanten. Keine Diagnose, kein Seh- oder Reaktionstest im medizinischen Sinn; die Ergebnisse sagen nichts über Sehvermögen oder Gesichtsfeld aus.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Aufgabe klären:** Entweder ehrlich „Reagieren am Rand“ (Onset + Tippen) oder echtes Vorhalten: Ziel läuft gleichmäßig auf eine markierte Linie zu, getippt wird beim Kreuzen (Koinzidenz-Timing; Brenner & Smeets, 2015) – beides nicht vermischen.
- **Tablet/Touch:** Finger ruht auf einer Haltefläche; Loslassen/Tippen beim Erscheinen misst die Reaktion (wie „Blitzreaktion“), ein zweiter Modus prüft das Antippen des Ziels am Rand. Ziele ≥ 1,5–2° (11″-Tablet in 40 cm ≈ 55–70 CSS-px); Touch-Latenzen einkalkulieren (Pronk et al., 2020).
- **Messung:** Median und Streuung getrennt für Reaktion und Bewegung, getrennt nach Seite; Frühschüsse (< 100 ms nach Erscheinen) als Vorwegnahme werten; Wartezeit mit „nicht alternder“ Verteilung statt enger Gleichverteilung (vgl. `docs/wissenschaft/01`); feste Rundendauer statt Zeitgutschrift; keine Ränge.
- **Köder:** Form statt nur Farbe (z. B. Kreis vs. Raute) und Anteil ≤ 20 % für echte Hemmanforderung (Wessel, 2018) – Anknüpfung an „Stopp & Los“.
- **Sicherheit/Zugänglichkeit:** kein rotes Vollflächen-Aufleuchten (Blitzreize meiden; Fisher et al., 2005), kein Wackeln; `prefers-reduced-motion` beachten; Ton optional, Seitenhinweis nicht über Tonhöhe verraten; Winkelgröße über Abstandseinstellung anpassen (Gleitsicht, Gesichtsfeld).
- **Sprache/Thema:** neutrale Rahmung („Lichtpunkt am Rand“ statt „Gegner“, „Peek“), DE/IT-Texte, Regeltext = Code.

## 11. Quellen
### Von der Website angegeben
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (einfache RT 213–231 ms passt zu „180–240 ms“; „150–190 ms Klick-Latenz“ eher zu schnell; Peeker's Advantage, Netcode und Hz-Werte stehen nicht bei Woods).
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – **Prüfung:** DOI stimmt ✓; **stützt:** nein/kaum (beschriebenes Vorhalten ist Koinzidenz-Timing ohne Zielbewegung; paradoxerweise passt Fitts zum Code, der Flicks verlangt).
- Meyer, D. E., Abrams, R. A., Kornblum, S., Wright, C. E., & Smith, J. E. K. (1988). Optimality in human motor performance: Ideal control of rapid aimed movements. *Psychological Review, 95*(3), 340–370. https://doi.org/10.1037/0033-295X.95.3.340 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (kein Bezug zum Winkelhalten; allenfalls zu Korrekturen nach einem Flick).
- Woodworth, R. S. (1899). Accuracy of voluntary movement. *The Psychological Review: Monograph Supplements, 3*(3), i–114. https://doi.org/10.1037/h0092992 – **Prüfung:** DOI stimmt ✓ (Website-Titel mit „The“ leicht abweichend); **stützt:** nein (dito).
- Nur im Text: Donders, F. C. (1969). On the speed of mental processes (W. G. Koster, Übers.). *Acta Psychologica, 30*, 412–431 (Original 1868). https://doi.org/10.1016/0001-6918(69)90065-1 – **Prüfung:** DOI stimmt ✓; **stützt:** nein („unbewusster motorischer Trigger bei antizipiertem Reiz“ nicht belegt; Inhalt über Standardliteratur).
- Nur im Text: Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology, 4*(1), 11–26. https://doi.org/10.1080/17470215208416600 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Wahlreaktion ≈ 5 bit/s; passt nur zur Köder-Entscheidung, nicht zu „Trigger-Disziplin“).

### Weitere Fachliteratur
- Abrams, R. A., Meyer, D. E., & Kornblum, S. (1990). Eye-hand coordination: Oculomotor control in rapid aimed limb movements. *Journal of Experimental Psychology: Human Perception and Performance, 16*(2), 248–267. https://doi.org/10.1037/0096-1523.16.2.248 – Blick springt mit Bewegungsbeginn zum Ziel; ohne Blicksprung ungenauer.
- Bediou, B., Rodgers, M. A., Tipton, E., Mayer, R. E., Green, C. S., & Bavelier, D. (2023). Effects of action video game play on cognitive skills: A meta-analysis. *Technology, Mind, and Behavior, 4*(1), 28–48. https://doi.org/10.1037/tmb0000102 – kausal g = 0,30.
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – ≈ 8 % der Männer.
- Ivkovic, Z., Stavness, I., Gutwin, C., & Sutcliffe, S. (2015). Quantifying and mitigating the negative effects of local latencies on aiming in 3D shooter games. In *Proceedings of CHI ’15* (S. 135–144). ACM. https://doi.org/10.1145/2702123.2702432 – lokale Latenz 23–243 ms.
- Niemi, P., & Näätänen, R. (1981). Foreperiod and simple reaction time. *Psychological Bulletin, 89*(1), 133–162. https://doi.org/10.1037/0033-2909.89.1.133 – Vorperioden-Effekt (Inhalt über Standardliteratur; kein Abstract abrufbar).
- Nobre, A. C., & van Ede, F. (2018). Anticipated moments: Temporal structure in attention. *Nature Reviews Neuroscience, 19*(1), 34–48. https://doi.org/10.1038/nrn.2017.141 – zeitliche Erwartung lenkt Wahrnehmung und Handlung.
- Warm, J. S., Parasuraman, R., & Matthews, G. (2008). Vigilance requires hard mental work and is stressful. *Human Factors, 50*(3), 433–441. https://doi.org/10.1518/001872008X312152 – Wachsamkeit ist anstrengend.
- Sheppard, A. L., & Wolffsohn, J. S. (2018). Digital eye strain: Prevalence, measurement and amelioration. *BMJ Open Ophthalmology, 3*(1), e000146. https://doi.org/10.1136/bmjophth-2018-000146 – digitale Augenbelastung.
- Wessel, J. R. (2018). Prepotent motor activity and inhibitory control demands in different variants of the go/no-go paradigm. *Psychophysiology, 55*(3), e12871. https://doi.org/10.1111/psyp.12871 – No-Go ≤ 20 %, Takt ≤ 1 500 ms.
- Brenner, E., & Smeets, J. B. J. (1997). Fast responses of the human hand to changes in target position. *Journal of Motor Behavior, 29*(4), 297–310. https://doi.org/10.1080/00222899709600017 – Handkorrektur nach ≈ 110 ms
- Deber, J., Jota, R., Forlines, C., & Wigdor, D. (2015). How much faster is fast enough? User perception of latency & latency improvements in direct and indirect touch. In *Proceedings of CHI '15* (S. 1827–1836). ACM. https://doi.org/10.1145/2702123.2702300 – Touch-Latenz
- Elliott, D., Hansen, S., Grierson, L. E. M., Lyons, J., Bennett, S. J., & Hayes, S. J. (2010). Goal-directed aiming: Two components but multiple processes. *Psychological Bulletin, 136*(6), 1023–1044. https://doi.org/10.1037/a0020958 – Zielbewegung: Primär- und Korrekturphase
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Photosensitivität
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – gerätegebundene Lerneffekte
- Jaschinski, W., König, M., Mekontso, T. M., Ohlendorf, A., & Welscher, M. (2015). Comparison of progressive addition lenses for general purpose and for computer vision: An office field study. *Clinical and Experimental Optometry, 98*(3), 234–243. https://doi.org/10.1111/cxo.12259 – Bildschirm-Gleitsicht
- Listman, J. B., Tsay, J. S., Kim, H. E., Mackey, W. E., & Heeger, D. J. (2021). Long-term motor learning in the "wild" with high volume video game data. *Frontiers in Human Neuroscience, 15*, 777779. https://doi.org/10.3389/fnhum.2021.777779 – Übungsverlauf in einer Klick-Zielaufgabe (Anbieterfinanzierung)
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Zeitgenauigkeit von Web-Anwendungen auf Touchgeräten
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer allgemein
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – einfache Reaktionszeit ≈ 213–231 ms, Alterseffekt
- Yantis, S., & Jonides, J. (1984). Abrupt visual onsets and selective attention: Evidence from visual search. *Journal of Experimental Psychology: Human Perception and Performance, 10*(5), 601–621. https://doi.org/10.1037/0096-1523.10.5.601 – plötzliche Reize ziehen Aufmerksamkeit
- Meyer, D. E., Abrams, R. A., Kornblum, S., Wright, C. E., & Smith, J. E. K. (1988). Optimality in human motor performance: Ideal control of rapid aimed movements. *Psychological Review, 95*(3), 340–370. https://doi.org/10.1037/0033-295X.95.3.340 – Zielbewegung: Primär- und Korrekturphase
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2. Aufl.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Gesichtsfeldausfälle nach Sehbahnverlauf (S. 32), Warnzeichen mit Abklärungsbedarf (S. 6, 28)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Wiederholbarkeit und Mehrfachmessung (Kap. 2, S. 17–18, 44)
