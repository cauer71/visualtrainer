---
# ===== Kennung =====
nr: 511
kennung: angle-hold-trainer
name: "Winkel halten – auf plötzlich auftauchende Ziele an zwei Kanten reagieren"
name_original: "Aim Trainer – Crosshair Placement & Winkel halten (Seitentitel: Aim Trainer | Crosshair Placement | SkillDrills)"
kapitel: "Zielen (FPS)"
kapitel_original: "fps"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/fps/angle-hold-trainer"
blickfit_umsetzung: null
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Links und rechts im Bild stehen zwei dunkle „Mauern“. An einer der beiden Mauerkanten taucht nach unvorhersehbarer Wartezeit in zufälliger Höhe ein grüner Kreis auf, schiebt sich kurz ein Stück heraus und verschwindet wieder. Man muss ihn mit dem Maus-Fadenkreuz in dieser kurzen Zeit anklicken, darf aber nicht vorher klicken und ab höheren Stufen keine orangen Köder-Ziele treffen."
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
    entscheidung_wahlreaktion: 2
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
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 1

# ===== Auswahlhilfe =====
voraussetzungen: ["Maus und Desktop-Browser mit Pointer Lock (Mauszeigersperre), möglichst Vollbild", "beide Bildschirmränder (ca. ±21° bei 24″ in 60 cm) im Gesichtsfeld erfassbar", "Monitor im Zwischenbereich (ca. 50–75 cm) scharf sehen", "ab höheren Stufen Grün von Orange unterscheiden"]
vorsicht_bei: [gesichtsfeldausfall, photosensitive_epilepsie, migraene_lichtempfindlich, presbyopie_gleitsicht, trockenes_auge_bildschirm, farbsehschwaeche, tremor_parkinson, hand_arm_beschwerden]
geeignet_fuer: ["schnelles Reagieren auf plötzlich erscheinende Reize am Bildrand mit anschließender Zielbewegung üben", "Klicken erst bei Reizbeginn statt vorab (Frühschüsse vermeiden) unter Zeitdruck üben", "Blick-Hand-Koordination bei großen, schnellen Zielbewegungen (Flicks) über den ganzen Monitor", "spielerisches Aufwärmen für Ego-Shooter-Spielende am PC"]
weniger_geeignet_fuer: ["Tablet- oder Smartphone-Nutzung (nur Maus mit Pointer Lock)", "saubere Messung der einfachen Reaktionszeit (dafür 101 oder 301 – hier ist die Zielbewegung eingerechnet)", "echtes ‚Vorhalten‘ mit Koinzidenz-Timing (das setzt der Code nicht um)", "Personen mit einseitigem Gesichtsfeldausfall", "Kinder und Personen, die Schuss-/Kampfthematik nicht möchten"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Zielleistung in Aim-Trainern steigt mit Übung und ist gut reproduzierbar gemessen (Listman et al., 2021; Rogers et al., 2024), die einfache Reaktionszeit selbst ändert sich wenig; Transfer von Aim-Trainern auf Spielleistung oder Alltag ist nicht untersucht, Actionspiele zeigen nur kleine kausale Effekte (g = 0,30; Bediou et al., 2023)."
aehnliche_uebungen: [308, 307, 503, 508, 501, 101, 301, 102, 801]
stichworte: ["Crosshair Placement", "Winkel halten", "Angle Hold", "Pre-Aim", "Peeker's Advantage", "Fake Peek", "Frühschuss", "Reizbeginn peripher", "Flick", "einfache Reaktionszeit", "Go/No-Go", "Aim Trainer"]
---

# 511 · Winkel halten – auf plötzlich auftauchende Ziele an zwei Kanten reagieren

> Original: „Aim Trainer – Crosshair Placement & Winkel halten“ – skilldrills.online, Kapitel Zielen (FPS) · Blickfit: noch nicht umgesetzt (verwandt: „Blitzreaktion“, „Stopp & Los“)

## 1. Kurzbeschreibung
Das Spielfeld ist fast schwarz; links und rechts steht je ein dunkler Streifen („Mauer“) mit heller Kante. Nach einer zufälligen Wartezeit taucht an einer der beiden Kanten in zufälliger Höhe ein leuchtend grüner Kreis auf, schiebt sich um etwa eine Kreisbreite heraus und zieht sich wieder zurück. Mit der Maus bewegt man ein Fadenkreuz dorthin und klickt, bevor der Kreis weg ist. Klicks ohne Ziel („Frühschuss“), daneben oder auf orange Köder-Ziele kosten Zeit und Combo. Anders als der Name verspricht, ist es im Kern eine Reaktions- und Flick-Aufgabe auf Reize am Bildrand, kein ruhiges Vorhalten.

## 2. Ablauf im Original (Analyse)
Quelle: Regeltext der Seite und ausgelieferter Spielcode (seitenspezifischer Chunk, formatiert; Werte in Canvas-Pixeln, Umrechnung für 24″-FHD-Monitor im Vollbild in 60 cm ≈ 38 px/°, EIG).
- **Eingabe:** Nur Maus. Nach dem Countdown (2,45 s) fordert das Canvas `requestPointerLock()` ohne `unadjustedMovement` an; das Fadenkreuz folgt `movementX/Y` × Empfindlichkeit und startet in der Mitte. Reine Touch-Geräte werden erkannt und bekommen nur einen Hinweis (Code).
- **Szene:** „Mauern“ je 19 % der Breite, begrenzt auf 70–170 px (Vollbild: 170 px). Die Kanten liegen bei 1 920 px Breite je 790 px (≈ 21°) von der Mitte und 1 580 px (≈ 42°) voneinander entfernt. Das Ziel wird **über** die Mauer gezeichnet, ist also ab dem ersten Bild vollständig sichtbar – es gibt kein allmähliches Hervortreten hinter einer Ecke (Code).
- **Ziel:** Seite je 50 % links/rechts, Höhe gleichverteilt in einem Band von 50 % (Level 1) bis 96 % der Spielfeldhöhe (bei 1 080 px ±7° → ±13°). Kreis mit Leuchtrand, Radius 26 → 12 px (Ø ≈ 1,4° → 0,6°), Trefferzone Radius + 10 → 4 px (Ø 72 px ≈ 1,9° auf Level 1, ≈ 41 px ≈ 1,1° auf Level 15, mindestens 24 px ≈ 0,6°). Grün #10b981, ab Combo 10 heller (#34d399); Köder orange (#f97316).
- **Bewegung:** Das Ziel schiebt sich sinusförmig bis 52 px (≈ 1,4°; Level 15 ≈ 31 px) heraus und zurück; Spitzengeschwindigkeit nur ≈ 3–4°/s. Die Position wird aus der verstrichenen Zeit berechnet (bildfrequenzunabhängig); nur Trefferpartikel laufen pro Bild (kosmetisch).
- **Zeitfenster:** Sichtbarkeit 1 400 ms (Level 1), ≈ 650 ms (Level 15), Grenzwert 420 ms, mit hoher Combo bis 336 ms. Köder sind nur min(220 ms; 0,45 × Sichtbarkeit) sichtbar. Wartezeit bis zum nächsten Ziel gleichverteilt 900–1 600 ms (Level 1), ≈ 480–880 ms (Level 15), Grenzwerte 350–650 ms (Code).
- **Wertung:** Treffer = 100 Punkte × Combo-Faktor (1 bis 3 ab 50 Treffern in Folge) × Level-Faktor (1 + 0,5 · [Level − 1]/14, nach oben offen), **+2 s** (Uhr max. 60 s). Fehler setzen die Combo auf 0 und kosten **−1 s**: Klick ohne Ziel oder auf Köder (Frühschuss), Klick daneben (auch während eines Köders), echtes Ziel entkommen. Präzision = Treffer / (Treffer + Fehlklicks + Frühschüsse + Entkommene). Note nach √(Punkte/48 000).
- **„Reaktionszeit“:** gemessen vom Animationsbild, in dem das Ziel entsteht, bis zum Klick-Ereignis (`performance.now()`); sie enthält Anzeigeverzögerung, Blick- und Zielbewegung und ist damit keine einfache Reaktionszeit.
- **Rückmeldung:** Ton beim Erscheinen (links 520 Hz, rechts 680 Hz – ein zusätzlicher Seitenhinweis, wenn Ton an ist), Partikel, Bildschirmwackeln 6 px bei Fehlern und bei aktivierten Effekten ein rotes Aufleuchten (480 ms).
- **Dauer:** Startzeit 45 s. Da jeder Treffer +2 s bringt und ein Durchgang auf höheren Stufen nur ≈ 1–1,5 s dauert, kann die Runde fast beliebig lange laufen und endet praktisch erst durch Fehler (EIG).
- **Widersprüche Regeltext ↔ Code:** (1) Deutsche Regeln „+0,6 s“ je Treffer, Code +2 s (englische Regeln korrekt). (2) Strafe „−0,8 s“, Code −1 s; sie greift immer, weil die Abfrage mit erzwungenem „an“ aufgerufen wird. (3) Entkommene Ziele werden bestraft, stehen aber nicht in den Regeln. (4) „Kopfhöhe halten“ und „Wandabstand einstellen“ sind nicht umsetzbar: Höhe und Seite sind zufällig, das Ziel läuft nicht ins Fadenkreuz. (5) „You can't memorize a rhythm“: Die Wartezeit wird mit steigendem Level enger (350–650 ms) und damit zeitlich **vorhersagbarer**. (6) Der Drill „misst Wandabstand“ – im Code nicht vorhanden.

## 3. Was die Website sagt – und wie das einzuordnen ist
**Aussagen:** Der Drill trainiere Crosshair Placement, Wandabstands-Kalibrierung, Trigger-Disziplin gegen Fake-Peeks, Reaktions-Timing und Kopfhöhen-Konsistenz. Richtiges Vorhalten „eliminiere“ Flicks und reduziere das Duell auf einen Klickimpuls; der Wandabstand solle D = v × T betragen. Der Peeker's Advantage (40–90 ms, T = RTT/2 + RTT/2 + T_interp) lasse sich so „mathematisch neutralisieren“. Zitiert werden Woods et al. (2015), Fitts (1954), Meyer et al. (1988), Woodworth (1899), im Text Donders (1868) und Hick (1952). Eine Tabelle nennt Latenzen bis zur Stufe „Radiant / CS2 Faceit Level 10“. Empfohlen: 10–15 min täglich.

**Einordnung:**
- **Belegt:** Die einfache visuelle Reaktionszeit liegt im Mittel bei 231 ms, nach Hardwarekorrektur 213 ms (N = 1 469; Woods et al., 2015) – „180–240 ms“ passt. D = v × T ist einfache Kinematik (EIG). Dass Netzlatenz in Ego-Shootern spürbar ist (Toleranz ≈ 100 ms; Claypool & Claypool, 2006) und dass Spiele sie mit Verfahren wie Lag-Kompensation ausgleichen, die Vorteile zwischen Spielenden verschieben, ist gut beschrieben (Liu, Xu & Claypool, 2022, Übersicht über > 80 Arbeiten).
- **Falsch zugeordnet:** Fitts, Meyer und Woodworth beschreiben Zielbewegungen – beim echten Winkelhalten gibt es gerade keine. Im Code dagegen ist fast jeder Treffer ein Flick; die Quellen passen also eher zum Code als zur Beschreibung. Donders' „unbewusster Trigger bei antizipiertem Reiz“ steht dort nicht; Hick (1952) beschreibt die Wahlreaktion (≈ 5 bit/s), nicht „Trigger-Disziplin unter Köder-Druck“.
- **Nicht umgesetzt:** Das zentrale Versprechen – Fadenkreuz vorhalten, Ziel läuft hinein, Klick ohne Korrektur – kann man in diesem Drill nicht üben (Abschnitt 2, Punkt 4). Bei vorgegebenem Trefferort ist die zeitliche Präzision beim Abfangen zudem schlechter als bei frei wählbarem Ort (Brenner & Smeets, 2015) – ein echtes Vorhalte-Training bräuchte also eine eigene Aufgabe.
- **Überzogen/unbelegt:** 40–90 ms Peeker's Advantage und die Formel sind netztechnische Faustregeln ohne wissenschaftliche Quelle; „Klick-Latenzen im Sub-Millisekunden-Bereich“ ist irreführend, weil die lokale Systemlatenz 23–243 ms beträgt (Ivkovic et al., 2015); „ohne Mausbeschleunigung“ stimmt nicht, da `unadjustedMovement` fehlt (MDN). „150–190 ms Klick-Latenz“ ist für einfache Reaktionen eher zu schnell (Woods et al., 2015).
- **Tabelle ohne Datengrundlage:** Keine der Quellen enthält Rang-Werte („Radiant“, „Faceit 10“); die Website sammelt selbst keine Daten. Der Satz „Every figure quoted on this page comes from the published work listed above“ ist irreführend.
- **Messhinweise** (Bildintervall 16,7/6,9/4,1 ms) sind richtige Physik (240 Hz = 4,17 ms), stehen aber nicht bei Woods; `performance.now()` ist auf 100 µs vergröbert, nicht auf 1 ms (MDN).

## 4. Optische und okulomotorische Grundlagen
- **Reizbeginn in der Peripherie:** Das Ziel erscheint ≈ 21° seitlich der Mitte (bzw. ≈ 42° von der anderen Kante) und bis ±13° in der Höhe. Ein plötzliches, kontrastreiches Aufleuchten (Kontrast zum Grund ≈ 7–8 : 1, EIG) wird auch peripher sicher bemerkt; Sehschärfe spielt kaum eine Rolle (Ziel ≥ 0,5°, weit über der Auflösungsgrenze von 1′ bei Visus 1,0). Gefordert ist, beide Kanten gleichzeitig im Blick zu behalten.
- **Blick vor der Hand:** Bei schnellen Zielbewegungen springt der Blick spontan etwa gleichzeitig mit dem Bewegungsbeginn zum Ziel; darf man den Blick nicht bewegen, wird die Zielbewegung ungenauer (Abrams, Meyer & Kornblum, 1990). Jeder Durchgang verlangt also eine große Sakkade (≈ 20°) plus Zielbewegung.
- **Köder:** Grün und Orange unterscheiden sich kaum in der Helligkeit (Kontrast 1,11 : 1, mit Combo-Grün 1,46 : 1), nur im Farbton (ΔE ≈ 111). Simuliert (Machado et al., 2009; EIG) bleibt bei Deuteranopie ΔE ≈ 56, bei Protanopie ≈ 39 – unterscheidbar, aber schwerer. Rot-Grün-Farbsehschwäche betrifft ≈ 8 % der Männer (Birch, 2012). Köder sind zudem nur ≤ 220 ms sichtbar.
- **Brille:** Arbeitsabstand ist der Zwischenbereich (frei gewählt 51–99 cm; Jaschinski-Kruza, 1991). Mit Universal-Gleitsicht liegen die Kanten im seitlich unscharfen Bereich und hohe Ziele im Fernteil; das Bemerken klappt trotzdem, das Anvisieren verlangt aber Kopfbewegungen, die Zeit kosten. Bildschirm-Gleitsicht senkte die Kopfneigung am Monitor um 2,3° und verbesserte die Monitorsicht (Jaschinski et al., 2015). Wer den Blick starr hält, blinzelt seltener (Bildschirm: Lidschlag deutlich reduziert; Patel et al., 1991) → trockenes Auge; ein Lidschlag im Moment des Erscheinens verzögert die Reaktion.
- **Stereosehen = 0** (2D-Canvas ohne Disparität).

## 5. Neurowissenschaftliche Grundlagen
- **Einfache Reaktion:** Das reine Entdecken eines Reizes dauert ≈ 131 ms und ist altersunabhängig; die gesamte Reaktionszeit steigt mit dem Alter um ≈ 0,55 ms/Jahr (Woods et al., 2015).
- **Zeitliche Erwartung:** Bei variabler Wartezeit sinkt die Reaktionszeit, je länger man schon wartet (Vorperioden-Effekt; Niemi & Näätänen, 1981), weil das Gehirn zeitliche Regelmäßigkeiten nutzt (Nobre & van Ede, 2018). Mit der hier gleichverteilten, auf höheren Stufen engen Wartezeit (350–650 ms) wird der Zeitpunkt gut vorhersagbar – das begünstigt Vorwegnahme und damit Frühschüsse.
- **Ton + Bild:** Kommen zwei Signale gleichzeitig (hier Ton und Ziel), reagiert man schneller, als es ein einfacher Wettlauf beider Signale erklärt („Koaktivierung“; Miller, 1982). Mit Ton ist der Drill daher leichter, und die Tonhöhe verrät die Seite.
- **Nicht klicken:** Frühschüsse und Köder verlangen Zurückhalten einer vorbereiteten Antwort. Echte Hemmung fordert Go/No-Go vor allem bei seltenen No-Go-Reizen (≤ 20 %) und schnellem Takt (≤ 1 500 ms; Wessel, 2018); hier sind es bis 35 % Köder bei schnellem Takt → mittlere Anforderung. Da Köder kürzer sichtbar sind als eine einfache Reaktion dauert, ist die Hemmung vor allem gegen vorschnelles, vorweggenommenes Klicken gerichtet.
- **Wachsamkeit:** Anhaltendes Warten auf Reize ist geistig anstrengend und stressig (Warm et al., 2008); bei Ereignissen alle 1–3 s ist es aber keine klassische Vigilanzaufgabe mit seltenen Reizen.
- **Blick vor dem Klick:** In einer FPS-ähnlichen Klickaufgabe ging eine längere letzte Fixation vor dem Klick mit besserer Leistung einher (Quiet Eye; korrelativ; Dahl et al., 2021).

## 6. Motorische Grundlagen
- **Flick statt Halten:** Aus der Mitte sind ≈ 790 px (≈ 21°) zu überbrücken, von der falschen Kante ≈ 1 580 px. Schwierigkeitsindex (Shannon-Form, Trefferzone als Breite) ≈ 3,6 bit auf Level 1, ≈ 4,3 bit auf Level 15, bis ≈ 5,1 bit bei kleinster Zone (EIG). Schnelle Zielbewegungen bestehen aus Primär- und Korrekturbewegung (Elliott et al., 2010; Meyer et al., 1988); die Hand korrigiert nach ≈ 110 ms (Brenner & Smeets, 1997).
- **Zeitbudget:** Bei ≈ 650 ms Sichtbarkeit (Level 15) bleiben nach einer einfachen Reaktion von 213–231 ms (Woods et al., 2015) nur ≈ 420 ms für Sakkade, Flick und Klick. Durchschnittliche Mausnutzer erreichen im Labor 3,7–4,9 bit/s (MacKenzie, 2018) – rechnerisch zu wenig für 4,3 bit in dieser Zeit (EIG, grobe Abschätzung). Auf hohen Stufen entscheidet daher, auf welcher Seite das Fadenkreuz wartet (50 %-Rate) – ein Glücksanteil.
- **Maus:** Die Übersetzung (CD-Gain) prägt die Leistung; Mausbeschleunigung macht Zeigen etwas schneller, erhöht aber das Überschießen (Casiez et al., 2008). Weil Betriebssystem-Beschleunigung mitwirkt, sind Werte geräte- und einstellungsabhängig.
- **Ruhig halten:** wird empfohlen, aber nicht gemessen; physiologischer Tremor (≈ 7,7 Hz; Raethjen et al., 2000) ist bei Trefferzonen ≥ 0,6° kein Engpass. Schnelles Dauerklicken lohnt nicht (jeder Fehlklick kostet).

## 7. Einflussfaktoren und Messgrenzen
- **Gerät:** Lokale Latenz 23–243 ms verschlechtert Zielen schon ab 41 ms (Ivkovic et al., 2015); erfahrene CS:GO-Spieler profitieren schon von kleinen Latenzsenkungen unter 125 ms (Liu et al., 2021). Bildfrequenz bestimmt, wann das Ziel sichtbar wird. Fenster- oder Monitorgröße verändert Winkel und Flick-Distanz grundlegend.
- **Ton an/aus** und **Effekte an/aus** ändern die Aufgabe (Abschnitt 5).
- **Alter:** Ältere reagieren motorisch langsamer (Woods et al., 2015) und haben mehr Mühe mit Maus-Klickaufgaben (Smith et al., 1999). Nur Vergleich mit sich selbst am selben Gerät ist sinnvoll.
- **Messgüte:** Die angezeigte „Reaktionszeit“ mischt Reaktion und Bewegung und hängt stark von der Seite ab, auf der man wartet. Punkte hängen von Combo-Faktor und verlängerter Rundenzeit ab (Ausdauer). Für Normen oder Ränge taugen die Werte nicht. Aim-Trainer-Metriken können zwar sehr zuverlässig sein (ICC 0,947–0,995 u. a. für „Wall Peeking“ bei KovaaK's; N = 10; Rogers et al., 2024), das gilt aber für jene Plattform, nicht für diesen Drill.

## 8. Studienlage: Trainierbarkeit und Übertragung
- **Übungseffekt – mittel:** Zielleistung in Aim-Trainern steigt über Tage (Treffer pro Sekunde deutlich, Trefferquote mäßig; Listman et al., 2021; Hersteller-finanziert). Die einfache Reaktionszeit selbst ist eher stabil; Verbesserungen dürften vor allem aus schnellerem Flick, Strategie (Warteposition, Ton) und Vorwegnahme stammen (eigene Einschätzung). Für diesen Drill gibt es keine Studie.
- **Naher Transfer – schwach:** Actionspiele (nicht Aim-Trainer) zeigen kausal g = 0,30 auf kognitive Tests (Bediou et al., 2023). Große Effekte digitaler Sehtrainings finden sich vor allem bei gerätegleichen Tests (Guo et al., 2025).
- **Alltagstransfer – fehlend:** Keine kontrollierte Studie zu Winkelhalte-Drills → Match-Leistung, Verkehr oder Beruf. „Brain-Training“ allgemein: viel Evidenz für die geübte Aufgabe, wenig für den Alltag (Simons et al., 2016).

## 9. Auswahlhinweise für die KI
- **Passt, wenn …** jemand am PC mit Maus Reagieren auf plötzliche Reize am Bildrand plus schnelles Anvisieren und Nicht-Vorwegklicken unter Zeitdruck üben möchte; FPS-Interesse.
- **Weniger passend, wenn …** nur ein Tablet vorhanden ist; eine saubere Reaktionszeitmessung gewünscht ist (101, 301); ruhiges Halten oder Präzision im Vordergrund steht (705, 808, 509); Kampfthematik unerwünscht ist.
- **Vorsicht / anpassen bei …**
  - `gesichtsfeldausfall`: Ziele erscheinen nur an den äußeren Kanten (≈ ±21°); bei Ausfall einer Seite ist die Übung einseitig kaum lösbar.
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: rotes Aufleuchten (480 ms) und Wackeln bei jedem Fehler, bei Klickserien mehrmals pro Sekunde möglich – nur mit abgeschalteten Effekten.
  - `presbyopie_gleitsicht`: Ziele an den Rändern und oben/unten; Zwischenbereichs- oder Bildschirmbrille bevorzugen, im Fenster statt Vollbild spielen verkleinert die Winkel.
  - `trockenes_auge_bildschirm`: starrer, lidschlagarmer Blick über verlängerte Runden; Pausen einplanen.
  - `farbsehschwaeche`: Köder (Orange) vs. Ziel (Grün) nur über den Farbton; ab Level ≈ 7 relevant.
  - `tremor_parkinson`, `hand_arm_beschwerden`: viele schnelle, weite Mausbewegungen unter Zeitdruck.
- **Kombiniert gut mit …** 101 (einfache Reaktion ohne Zielen), 102 (Go/No-Go), 308 (Peeks erkennen), 501 (Flick), 801 (periphere Reize).
Keine Diagnose, kein Seh- oder Reaktionstest im medizinischen Sinn; die Ergebnisse sagen nichts über Sehvermögen oder Gesichtsfeld aus.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Aufgabe klären:** Entweder ehrlich „Reagieren am Rand“ (Onset + Tippen) oder echtes Vorhalten: Ziel läuft gleichmäßig auf eine markierte Linie zu, getippt wird beim Kreuzen (Koinzidenz-Timing; Brenner & Smeets, 2015) – beides nicht vermischen.
- **Tablet/Touch:** Finger ruht auf einer Haltefläche; Loslassen/Tippen beim Erscheinen misst die Reaktion (wie „Blitzreaktion“), ein zweiter Modus prüft das Antippen des Ziels am Rand. Ziele ≥ 1,5–2° (11″-Tablet in 40 cm ≈ 55–70 CSS-px); Touch-Latenzen einkalkulieren (Pronk et al., 2020).
- **Messung:** Median und Streuung getrennt für Reaktion und Bewegung, getrennt nach Seite; Frühschüsse (< 100 ms nach Erscheinen) als Vorwegnahme werten; Wartezeit mit „nicht alternder“ Verteilung statt enger Gleichverteilung (vgl. `docs/wissenschaft/01`); feste Rundendauer statt Zeitgutschrift; keine Ränge.
- **Köder:** Form statt nur Farbe (z. B. Kreis vs. Raute) und Anteil ≤ 20 % für echte Hemmanforderung (Wessel, 2018) – Anknüpfung an „Stopp & Los“.
- **Sicherheit/Zugänglichkeit:** kein rotes Vollflächen-Aufleuchten, kein Wackeln; `prefers-reduced-motion` beachten (Fisher et al., 2005); Ton optional, Seitenhinweis nicht über Tonhöhe verraten; Winkelgröße über Abstandseinstellung anpassen (Gleitsicht, Gesichtsfeld).
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
- Brenner, E., & Smeets, J. B. J. (2015). How people achieve their amazing temporal precision in interception. *Journal of Vision, 15*(3):8. https://doi.org/10.1167/15.3.8 – zeitliche Präzision bei vorgegebenem vs. freiem Trefferort.
- Claypool, M., & Claypool, K. (2006). Latency and player actions in online games. *Communications of the ACM, 49*(11), 40–45. https://doi.org/10.1145/1167838.1167860 – Latenztoleranz in Ego-Shootern ≈ 100 ms.
- Ivkovic, Z., Stavness, I., Gutwin, C., & Sutcliffe, S. (2015). Quantifying and mitigating the negative effects of local latencies on aiming in 3D shooter games. In *Proceedings of CHI ’15* (S. 135–144). ACM. https://doi.org/10.1145/2702123.2702432 – lokale Latenz 23–243 ms.
- Liu, S., Xu, X., & Claypool, M. (2022). A survey and taxonomy of latency compensation techniques for network computer games. *ACM Computing Surveys, 54*(11s), 1–34. https://doi.org/10.1145/3519023 – Latenzausgleich in Online-Spielen (Hintergrund Peeker's Advantage).
- Machado, G. M., Oliveira, M. M., & Fernandes, L. A. F. (2009). A physiologically-based model for simulation of color vision deficiency. *IEEE Transactions on Visualization and Computer Graphics, 15*(6), 1291–1298. https://doi.org/10.1109/TVCG.2009.113 – Grundlage der CVD-Simulation.
- Miller, J. (1982). Divided attention: Evidence for coactivation with redundant signals. *Cognitive Psychology, 14*(2), 247–279. https://doi.org/10.1016/0010-0285(82)90010-X – schnellere Reaktion auf redundante Signale (Inhalt über Kurzfassung/Standardliteratur).
- Niemi, P., & Näätänen, R. (1981). Foreperiod and simple reaction time. *Psychological Bulletin, 89*(1), 133–162. https://doi.org/10.1037/0033-2909.89.1.133 – Vorperioden-Effekt (Inhalt über Standardliteratur; kein Abstract abrufbar).
- Nobre, A. C., & van Ede, F. (2018). Anticipated moments: Temporal structure in attention. *Nature Reviews Neuroscience, 19*(1), 34–48. https://doi.org/10.1038/nrn.2017.141 – zeitliche Erwartung lenkt Wahrnehmung und Handlung.
- Rogers, E. J., Trotter, M. G., Johnson, D., Desbrow, B., & King, N. (2024). KovaaK's aim trainer as a reliable metrics platform for assessing shooting proficiency in esports players: A pilot study. *Frontiers in Sports and Active Living, 6*, 1309991. https://doi.org/10.3389/fspor.2024.1309991 – Zuverlässigkeit u. a. „Wall Peeking“ (ICC 0,947–0,995).
- Warm, J. S., Parasuraman, R., & Matthews, G. (2008). Vigilance requires hard mental work and is stressful. *Human Factors, 50*(3), 433–441. https://doi.org/10.1518/001872008X312152 – Wachsamkeit ist anstrengend.
- Wessel, J. R. (2018). Prepotent motor activity and inhibitory control demands in different variants of the go/no-go paradigm. *Psychophysiology, 55*(3), e12871. https://doi.org/10.1111/psyp.12871 – No-Go ≤ 20 %, Takt ≤ 1 500 ms.
- Ergänzend (Belege in der Gruppen-Literaturbasis, alle per Crossref geprüft): Brenner & Smeets (1997), https://doi.org/10.1080/00222899709600017; Casiez et al. (2008), https://doi.org/10.1080/07370020802278163; Dahl et al. (2021), https://doi.org/10.3389/fpsyg.2021.676591; Elliott et al. (2010), https://doi.org/10.1037/a0020958; Fisher et al. (2005), https://doi.org/10.1111/j.1528-1167.2005.31405.x; Guo et al. (2025), https://doi.org/10.3389/fphys.2025.1664572; Jaschinski et al. (2015), https://doi.org/10.1111/cxo.12259; Jaschinski-Kruza (1991), https://doi.org/10.1177/001872089103300106; Listman et al. (2021), https://doi.org/10.3389/fnhum.2021.777779; Liu, Claypool et al. (2021), https://doi.org/10.1145/3411764.3445245; MacKenzie (2018), https://doi.org/10.1002/9781118976005.ch17; Patel et al. (1991), https://doi.org/10.1097/00006324-199111000-00010; Pronk et al. (2020), https://doi.org/10.3758/s13428-019-01321-2; Raethjen et al. (2000), https://doi.org/10.1016/S1388-2457(00)00384-9; Simons et al. (2016), https://doi.org/10.1177/1529100616661983; Smith et al. (1999), https://doi.org/10.1518/001872099779611102; MDN Web Docs (o. J.). *Element: requestPointerLock()* und *Performance: now()*, abgerufen 29.09.2026, https://developer.mozilla.org/en-US/docs/Web/API/Element/requestPointerLock.
