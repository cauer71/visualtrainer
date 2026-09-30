---
# ===== Kennung =====
nr: 403
kennung: sine-wave-pursuit
name: "Sinuswelle (Blickfolge auf einer Wellenbahn)"
name_original: "Sinuswellen-Blickverfolgung (Sine Wave Pursuit)"
kapitel: "Blickverfolgung"
kapitel_original: "visual-tracking"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/visual-tracking/sine-wave-pursuit"
blickfit_umsetzung: null
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Ein leuchtender Punkt wandert im Vollbild auf einer Wellenlinie von links nach rechts und wieder zurück und schwingt dabei ständig auf und ab. Man folgt ihm nur mit den Augen, möglichst ohne Blicksprünge – an den Wellenbergen wird er langsam, beim Durchqueren der Mittellinie schnell."
ziel_funktionen: [blickfolge]
eingabe: [maus, touch]
tablet_geeignet: mit_anpassung
dauer_sekunden: 60
schwierigkeit_anpassung: "Kein Levelsystem, keine automatische Anpassung. Manuell: Tempo 0,5–9× (1× = waagrecht 220 px/s, Auf-ab-Schwingung 0,53 Hz; am 24-Zoll-Monitor Spitzentempo ≈ 27°/s), Zielradius 10–50 px (Standard 16 px), 'Hide Line' blendet die Wellenlinie aus, 'Random Speed' lässt das Tempo zeitabhängig zwischen dem 0,4- und 1,9-Fachen schwanken. Dauer 30/45/60/90/120 s."
messgroessen: ["Original: keine Leistungsmessung (nur Zähler abgeschlossener Sitzungen)", "sinnvoll mit Eyetracker: senkrechter und waagrechter Folge-Gain, Phasenlage, Aufholsakkaden je Welle, Fehler an Wellenbergen und Umkehrpunkten", "Ersatz ohne Eyetracker: Zeigerabstand zum Ziel beim Mitführen mit Finger/Maus (Grad, Anteil Zeit im Ziel)", "Ersatz ohne Eyetracker: kurz im Ziel eingeblendetes Sehzeichen erkennen (nur bei sauberem Folgen lösbar)"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 0
    nutzbares_sehfeld: 0
    blickfolge: 3
    sakkaden: 1
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
    verarbeitungsgeschwindigkeit: 0
    antizipation: 2
    entscheidung_wahlreaktion: 0
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 0
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
voraussetzungen: ["Bildschirm oder Tablet auf fester Unterlage, Abstand 40–70 cm, Kopf möglichst ruhig", "Scharfes Sehen im Zwischenbereich über die ganze Bildbreite und ±8° nach oben/unten (Bildschirmbrille oder Einstärkenglas günstiger als Gleitsicht)", "Maus oder Finger nur zum Starten; während der Übung keine Eingabe nötig", "Bereitschaft, ohne Rückmeldung 30–120 s konzentriert zu folgen"]
vorsicht_bei: [presbyopie_gleitsicht, schwindel_vestibulaer, reisekrankheit, nystagmus, schielen_binokular, trockenes_auge_bildschirm, kopfschmerz_asthenopie, kinder_unter_6]
geeignet_fuer: ["glatte Blickfolge mit ständig wechselndem Tempo und senkrechter Komponente üben (Auf-ab-Folge ist schwerer als waagrechte)", "vorhersagbare, periodische Bewegung: Einstieg in 'vorausschauendes' Folgen bei 0,5–1× (Schwingung 0,26–0,53 Hz)", "Selbstbeobachtung eigener Blicksprünge in der schnellen Wellenmitte und an den seitlichen Umkehrpunkten", "kurze Augenübung ohne Hand- oder Körpereinsatz, ohne Flackerreize"]
weniger_geeignet_fuer: ["alle, die Rückmeldung oder einen Leistungswert erwarten (das Original misst nichts)", "Gleitsichtträger:innen am großen Monitor (Bahn ≈ 43° breit und ≈ 16° hoch, weit über den scharfen Zwischenbereich hinaus)", "Tempo ab 2× für Ungeübte und Ältere (Schwingung ≥ 1 Hz, Spitzentempo ≥ 50°/s: Übergang in überwiegend sakkadisches Verfolgen)", "Ziel Reaktion, Hand-Zielgenauigkeit, Peripherie oder 'Bildschirmmüdigkeit vorbeugen' (nicht gefordert bzw. nicht belegt)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Periodische Sinusbewegung wird im Labor innerhalb weniger Zyklen vorausschauend und nahezu ohne Verzögerung verfolgt (Barnes & Asselman, 1991; Bahill & McDonald, 1983), kurzes Pursuit-Training wirkte einige Tage nach (Eibenberger et al., 2012) – alles mit Eyetracker, nicht mit dieser Übung; Nutzen für Ballsport, Shooter oder Bildschirmbeschwerden wurde nie untersucht."
aehnliche_uebungen: [402, 404, 405, 406, 407, 413, 105, 514, 515, 707]
stichworte: ["Sinuswelle", "sine wave pursuit", "smooth pursuit", "glatte Blickfolge", "vertikale Blickfolge", "prädiktive Blickfolge", "harmonische Schwingung", "Aufholsakkaden", "Folge-Gain", "Wellenbahn"]
---

# 403 · Sinuswelle (Blickfolge auf einer Wellenbahn)

> Original: „Sinuswellen-Blickverfolgung“ („Sine Wave Pursuit“) – skilldrills.online, Kapitel Blickverfolgung
> (`visual-tracking`) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

Auf fast schwarzem Grund läuft ein roter Leuchtpunkt auf einer dünnen Wellenlinie: waagrecht gleichmäßig von Rand
zu Rand und zurück, senkrecht ständig auf und ab. Man folgt ihm nur mit den Augen, ohne Kopfbewegung und möglichst
ohne Blicksprünge. Es gibt keine Aufgabe außer Hinschauen, keine Punkte und keine Auswertung.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und Spielcode (Chunk `53926-…js`, Hilfsmodule wie 402; Stand 29.09.2026), nur Mechanik, kein Code
übernommen. Grad = eigene Rechnung (24″, 1920 × 1080, 60 cm ≈ 38 px/°; 11″-Tablet 1194 × 834 CSS-px, 40 cm ≈ 36 px/°).

- **Ablauf (Code):** Einstellungen → Vollbild → Countdown 3-2-1-GO (≈ 2,5 s) → 30–120 s Übung (Standard 60 s) →
  Endbildschirm mit Dauer, Grundtempo, Sitzungszähler, „Speed Acceleration an/aus“. Abbruch mit Escape oder beim
  Verlassen des Vollbilds; gespeichert wird nur der Sitzungszähler.
- **Bahn (Code):** Die Höhe hängt von der **waagrechten Position** ab: Wellenlänge fest **419 CSS-px** (≈ 11°),
  Ausschlag **± 28 % der Bildhöhe**. Waagrecht läuft der Punkt mit **konstant 220 px/s × Tempo** zwischen 5 % und
  95 % der Breite und kehrt dort **abrupt** um. Die Form hängt vom Gerät ab: Monitor 4,1 Wellen über ≈ 43°, ± 8°
  (sehr steil); Tablet quer 2,6 Wellen über ≈ 29°, ± 6,4°; hochkant 1,8 Wellen über ≈ 20°, ± 9,2°.
- **Tempo (Code):** zeitbasiert (dt, begrenzt auf 100 ms), unabhängig von der Bildfrequenz. Eigene Rechnung:

| Tempo | 0,5× | 1× | 2× | 3× | 5× | 9× |
|---|---|---|---|---|---|---|
| Auf-ab-Frequenz (Hz) | 0,26 | 0,53 | 1,05 | 1,58 | 2,6 | 4,7 |
| Monitor: waagrecht / Spitze in der Wellenmitte (°/s) | 2,9 / 14 | 5,8 / 27 | 12 / 54 | 17 / 81 | 29 / 135 | 52 / 243 |
| Monitor: senkrechte Spitzenbeschleunigung (°/s²) | 22 | 87 | 350 | 780 | 2 200 | 7 000 |

- **Reiz (Code, wie 402):** Radius 16 px (Ring Ø 32 px ≈ 0,85°), Leuchtsaum, sechs Farben ohne Informationswert.
  Am Tablet quer ist das Tempo ≈ 20 % geringer (Spitze 22°/s bei 1×). „Random Speed“: feste Summe langsamer
  Sinusschwingungen (Faktor ≈ 0,4–1,9), kein Zufall.
- **Bildrate/Eingabe (Code):** Bilder < 13 ms nach dem vorigen werden verworfen (120/240 Hz → 60, 144 Hz → 72
  Bilder/s); bei 5× springt der Punkt je Bild > 2° (> 2 Zieldurchmesser). Zeiger/Finger erscheinen als Fadenkreuz,
  werden aber **nicht ausgewertet**.

**Widersprüche Regeltext ↔ Code:** (1) „An den Wendepunkten Stillstand“: nur senkrecht, waagrecht läuft der Punkt
weiter (≥ 5,8°/s bei 1×). (2) Geschwungen wird nur senkrecht; der harte Knick am Rand fehlt im Text. (3)
„Positionsabweichung“, „Accuracy %“, Gain: nichts wird gemessen. (4) 144/240 Hz gelobt, aber auf 60–72 Bilder/s gedrosselt.

## 3. Was die Website sagt – und wie das einzuordnen ist

**Aussagen.** Unvorhersehbaren Reizen hinke das Auge 130–150 ms nach; bei periodischer Bewegung „adaptiere das
Kleinhirn“ und neutralisiere die Latenz „vollständig“. Die Übung trainiere das „zerebelläre Schwingungsgedächtnis“
und die „Bremsmotorik der Augenmuskeln“, Ziel sei Gain 1,0 ohne Sakkaden; vertikal sei schwerer („rostraler
interstitieller Kern“). Zielgruppen: Shooter, Ballsport („sehr stark“), Bildschirmarbeit („entlastet Augenmuskeln“,
„fördert die Durchblutung des Augapfels“). Stufentabelle „Elite“ (Gain 0,96–1,02, < 15 ms) bis „Basis“. Positiv:
Die Seite sagt, sie erfasse keine Augenposition, diagnostiziere nichts, und rät bei Beschwerden zum Abbruch.

**Einordnung.**
- **Vorhersage bei periodischer Bewegung – belegt:** In 2–4 Zyklen wird die Antwort vorausschauender (Reaktionszeit
  ≈ 300 → 200 ms bei Dreieckreizen; Barnes & Asselman, 1991), beim Einzelzyklus-Sinus 121 → 43 ms (Barnes et al.,
  2000); Geübte folgen „latenzfrei“ (Bahill & McDonald, 1983). Das gilt aber nur für niedrige Frequenzen: bei
  1,56 Hz sinkt der Gain auf ≈ 0,53 (Barnes et al., 1987).
- **„Kleinhirn trainieren“:** Stark et al. (1962) beschreiben einen technischen „adaptiven Prädiktor“, keine
  Hirnregion. Das Kleinhirn ist an der Folgebewegung beteiligt (Ilg & Thier, 2008); ein Training durch diese Übung ist nicht untersucht.
- **Gain 1,0 ohne Sakkaden / Stufen:** Der glatte Gain Gesunder liegt fast immer < 0,95, Aufholsakkaden sind normal
  (Collewijn & Tamminga, 1984). Die Stufen stehen in keiner Quelle, sind ohne Eyetracker nicht messbar – erfunden.
- **Vertikal schwerer – richtig** (Rottach et al., 1996; Ke et al., 2013), aber falsch begründet: der riMLF ist ein
  Sakkaden-Generator (Sparks, 2002).
- **Bildschirmarbeit, Durchblutung, Ballsport, Shooter:** unbelegt. Bildschirmbeschwerden hängen v. a. mit
  Lidschlag und Naheinstellung zusammen (Portello et al., 2013). Nicht als Gesundheitsaussage übernehmen.

## 4. Optische und okulomotorische Grundlagen

**Tempo und Frequenz.** Ziel ≈ 0,85°, gut sichtbar. 1× (Spitze ≈ 27°/s) ist gut verfolgbar (Gain ≈ 0,9 bis 75°/s bei
periodischen Bahnen; Buizza & Schmid, 1986). Begrenzend ist die **Frequenz**: bei 10° Ausschlag endet glatte Folge bei
≈ **1,2 Hz** (Ohashi et al., 1985), hier knapp über 2×; ab 3× (1,6 Hz, ≈ 780°/s²) überwiegen Sakkaden.

**Senkrechte Komponente und Umkehr.** Die Hauptarbeit ist senkrechte Folge – schwächer als waagrechte, aufwärts
schwächer als abwärts (Rottach et al., 1996; Ke et al., 2013). Aufholsakkaden kommen, wenn Positions- und Tempofehler
zu groß werden (de Brouwer et al., 2002), meist in der Wellenmitte. Der Knick am Rand (alle 7,9 s bzw. 4,9 s am
Tablet) verlangt Neuausrichtung: Tempo sinkt nach ≈ 90 ms, Richtung ändert sich ab ≈ 130 ms (Soechting et al., 2005).

**Brille und Alter.** Die Bahn ist am Monitor ≈ 43° breit und ≈ 16° hoch; Gleitsicht bietet bei 60 cm nur 13–18°
klares Zwischenfeld (Han et al., 2003), das Auf-ab führt zudem durch Fern- und Nahteil. Besser: Arbeitsplatzbrille,
kleineres Fenster, Kopf mitbewegen. Ältere haben bei allen Tempi niedrigeren Gain (Moschner &
Baloh, 1994) und sättigen früher bei hoher Beschleunigung (Zackon & Sharpe, 1987) → 0,5–1×. Grundschulkinder haben
noch niedrigeren Sinus-Gain (Accardo et al., 1995). Beim konzentrierten Folgen wird seltener geblinzelt (Portello
et al., 2013) – relevant bei trockenem Auge.

## 5. Neurowissenschaftliche Grundlagen

Bewegungssignale aus V5/MT und MST gelangen über frontales und supplementäres Augenfeld, Brückenkerne und Kleinhirn
zu den Augenmuskelkernen (Ilg & Thier, 2008). Bei periodischen Bahnen werden Tempo und Zeitpunkt früherer Bewegung
gespeichert und vorausschauend abgerufen (Barnes & Asselman, 1991; Barnes, 2008). Eine Wirkung dieser Übung auf
bestimmte Hirnregionen ist nicht belegt.

## 6. Motorische Grundlagen

Keine Handbewegung gefordert (ein mitgeführter Zeiger wird nicht bewertet); das Auge erreicht ein neues Tempo in ≈ 130 ms (Robinson, 1965).

## 7. Einflussfaktoren und Messgrenzen

- **Gerät:** Wellenform und Tempo in Grad hängen von Bildgröße, Seitenverhältnis und Abstand ab – zwischen Geräten
  nicht vergleichbar; mehr als 60–72 Hz nützen wegen der Drosselung nichts.
- **Zustand und Messung:** Müdigkeit, Alter und geringer Kontrast (Day Mode, dunkle Farbe) senken den Gain. Das
  Original misst nichts; Besserung in den ersten Zyklen ist Vorhersage-Lernen, keine „Augenfitness“.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** Vorhersagbare Wellenformen werden in Minuten besser verfolgt (Bahill & McDonald, 1983:
  mittlerer Fehler 0,32 deg², zeitweise < 0,1 deg²); 2 × 6 min an 3 Tagen wirkten noch nach 5 Tagen (Eibenberger
  et al., 2012) – Laborbefunde mit Eyetracker, nicht mit dieser Übung.
- **Naher Transfer – schwach:** Übertragung auf die Folgebewegung allgemein (Eibenberger et al., 2012), sonst keine Daten.
- **Alltagstransfer – fehlend:** Keine Studie zu Browser-Blickfolge; große Effekte digitaler Sehtrainings entstehen
  vor allem bei gerätegleichen Tests (Guo, Yuan et al., 2025).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** ruhige, periodische Blickfolge mit senkrechter Komponente geübt werden soll; als Stufe nach
  404/402; bei 0,5–1× mit großem Ziel; als kurze Augenübung ohne Blitzreize und ohne Handeinsatz.
- **Weniger passend, wenn …** Rückmeldung, Reaktion, Peripherie, Handgenauigkeit oder „Augenentlastung“ gesucht wird.
- **Vorsicht / anpassen bei …** `presbyopie_gleitsicht` (Bahn durch Unschärfezonen → Arbeitsplatzbrille, kleineres
  Fenster, Kopf mitbewegen); `schwindel_vestibulaer`, `reisekrankheit` (ständiges Auf-ab, bei hohem Tempo ruckend;
  langsam beginnen, bei Übelkeit abbrechen); `nystagmus`, `schielen_binokular` (Folge oft verändert –
  keine Rückschlüsse); `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie` (seltener Lidschlag → kurz, Pausen);
  `kinder_unter_6` (Folgebewegung reift bis ins Jugendalter).
- **Kombiniert gut mit …** 404 (langsam, gleichmäßig), 402 (Acht), 405/406 (Richtungswechsel), 413 (senkrechte
  Sprünge), 407 (Vorhersage ohne Sicht), 105 (Details am bewegten Ziel), 515 (senkrechtes Mitführen mit der Maus).

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Überprüfbare Aufgabe statt Scheinmessung:** kurz im Ziel eingeblendetes Sehzeichen (wie Blickfit „Scharf in
  Bewegung“) oder Mitführen mit dem Finger mit Abstandswertung; keine Gain-Stufen ohne Messung.
- **Reiz in Grad:** Wellenlänge, Ausschlag und Tempo aus Bildgröße und Abstand; Ausschlag wählbar (± 3–5° für
  Gleitsicht), auch waagrecht schwingende Variante. **Tablet:** Querformat mit Ständer, Radius ≥ 20 px.
- **Tempo:** Stufen über die Frequenz (0,2 → 1,0 Hz), Spitze ≤ 40°/s, weiche Umkehr am Rand, keine Bildratendrosselung.
- **Texte:** keine Aussagen zu Durchblutung, Muskel-„Entspannung“, Kleinhirn oder Sport; Pausen- und Gleitsichthinweis.

## 11. Quellen

### Von der Website angegeben
- Stark, L., Vossius, G., & Young, L. R. (1962). Predictive control of eye tracking movements. *IRE Transactions on Human Factors in Electronics, HFE-3*(2), 52–57. https://doi.org/10.1109/THFE2.1962.4503342 – **Prüfung:** DOI stimmt ✓ (Inhalt über Kurzfassung); **stützt die Aussage der Website:** teilweise (Vorhersage überwindet Verzögerung bei regelmäßigem Reiz – ja; Kleinhirn und „vollständig“ nicht aus der Quelle)
- Robinson, D. A. (1965). The mechanics of human smooth pursuit eye movement. *The Journal of Physiology, 180*(3), 569–591. https://doi.org/10.1113/jphysiol.1965.sp007718 – **Prüfung:** DOI stimmt ✓ (Inhalt über Kurzfassung); **stützt:** teilweise (≈ 130 ms bis zur neuen Geschwindigkeit; keine Stufen)
- Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 – **Prüfung:** DOI stimmt ✓, Titel auf der Website falsch („pursuit“ statt „tracking“), nur bibliografisch geprüft; **stützt:** teilweise (Zusammenspiel Sakkade/Folgebewegung; Schwelle „Gain < 0,8“ und „ermüdend“ nicht belegt)
- Bahill, A. T., Iandolo, M. J., & Troost, B. T. (1980). Smooth pursuit eye movements in response to unpredictable target waveforms. *Vision Research, 20*(11), 923–931. https://doi.org/10.1016/0042-6989(80)90073-5 – **Prüfung:** DOI stimmt ✓ (Inhalt über Kurzfassung); **stützt:** teilweise (behandelt unvorhersehbare Reize, der Sinus ist vorhersagbar; „Überschießen am Scheitelpunkt“ nicht belegt)
- Barnes, G. R. (2008). Cognitive processes involved in smooth pursuit eye movements. *Brain and Cognition, 68*(3), 309–326. https://doi.org/10.1016/j.bandc.2008.08.020 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Speichern/Abrufen von Bahninformation bei periodischer Bewegung ja; „zerebelläres Schwingungsgedächtnis trainieren“ nein)
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (Reaktionszeitstudie; nichts zu 144/240 Hz oder Kleinhirn)

### Weitere Fachliteratur
- Accardo, A. P., Pensiero, S., Da Pozzo, S., & Perissutti, P. (1995). Characteristics of horizontal smooth pursuit eye movements to sinusoidal stimulation in children of primary school age. *Vision Research, 35*(4), 539–548. https://doi.org/10.1016/0042-6989(94)00145-C – Kinder: niedrigerer Sinus-Gain
- Bahill, A. T., & McDonald, J. D. (1983). Smooth pursuit eye movements in response to predictable target motions. *Vision Research, 23*(12), 1573–1583. https://doi.org/10.1016/0042-6989(83)90171-2 – latenzfreies Folgen gelernt, Fehlerwerte
- Barnes, G. R., & Asselman, P. T. (1991). The mechanism of prediction in human smooth pursuit eye movements. *The Journal of Physiology, 439*, 439–461. https://doi.org/10.1113/jphysiol.1991.sp018675 – Vorhersage baut sich in 2–4 Zyklen auf
- Barnes, G. R., Barnes, D. M., & Chakraborti, S. R. (2000). Ocular pursuit responses to repeated, single-cycle sinusoids reveal behavior compatible with predictive pursuit. *Journal of Neurophysiology, 84*(5), 2340–2355. https://doi.org/10.1152/jn.2000.84.5.2340 – Verzögerung 121 → 43 ms
- Barnes, G. R., Donnelly, S. F., & Eason, R. D. (1987). Predictive velocity estimation in the pursuit reflex response to pseudo-random and step displacement stimuli in man. *The Journal of Physiology, 389*, 111–136. https://doi.org/10.1113/jphysiol.1987.sp016649 – Gain-Einbruch bei höherer Frequenz
- Buizza, A., & Schmid, R. (1986). Velocity characteristics of smooth pursuit eye movements to different patterns of target motion. *Experimental Brain Research, 63*(2), 395–401. https://doi.org/10.1007/BF00236858 – Gain ≈ 0,9 bis 75°/s
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Gain < 0,95
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – Auslöser von Aufholsakkaden
- Eibenberger, K., Ring, M., & Haslwanter, T. (2012). Sustained effects for training of smooth pursuit plasticity. *Experimental Brain Research, 218*(1), 81–89. https://doi.org/10.1007/s00221-012-3009-8 – Trainierbarkeit
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Transfer
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm
- Ilg, U. J., & Thier, P. (2008). The neural basis of smooth pursuit eye movements in the rhesus monkey brain. *Brain and Cognition, 68*(3), 229–240. https://doi.org/10.1016/j.bandc.2008.08.014 – Netzwerk
- Ke, S. R., Lam, J., Pai, D. K., & Spering, M. (2013). Directional asymmetries in human smooth pursuit eye movements. *Investigative Ophthalmology & Visual Science, 54*(6), 4409–4421. https://doi.org/10.1167/iovs.12-11369 – vertikal/aufwärts schwächer
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – Alter
- Ohashi, N., Watanabe, Y., Kobayashi, H., & Mizukoshi, K. (1985). Quantitative measurement of smooth pursuit using a continuously changing sinusoidal wave in normal subjects. *ORL, 47*(1), 49–56. https://doi.org/10.1159/000275745 – Grenze glatter Sinusfolge ≈ 1,2 Hz
- Portello, J. K., Rosenfield, M., & Chu, C. A. (2013). Blink rate, incomplete blinks and computer vision syndrome. *Optometry and Vision Science, 90*(5), 482–487. https://doi.org/10.1097/OPX.0b013e31828f09a7 – Lidschlag
- Rottach, K. G., Zivotofsky, A. Z., Das, V. E., Averbuch-Heller, L., Discenna, A. O., Poonyathalang, A., & Leigh, R. J. (1996). Comparison of horizontal, vertical and diagonal smooth pursuit eye movements in normal human subjects. *Vision Research, 36*(14), 2189–2195. https://doi.org/10.1016/0042-6989(95)00302-9 – horizontal > vertikal
- Soechting, J. F., Mrotek, L. A., & Flanders, M. (2005). Smooth pursuit tracking of an abrupt change in target direction: Vector superposition of discrete responses. *Experimental Brain Research, 160*(2), 245–258. https://doi.org/10.1007/s00221-004-2010-2 – Umkehr am Rand
- Sparks, D. L. (2002). The brainstem control of saccadic eye movements. *Nature Reviews Neuroscience, 3*(12), 952–964. https://doi.org/10.1038/nrn986 – riMLF als Sakkaden-Generator
- Zackon, D. H., & Sharpe, J. A. (1987). Smooth pursuit in senescence: Effects of target acceleration and velocity. *Acta Oto-Laryngologica, 104*(3–4), 290–297. https://doi.org/10.3109/00016488709107331 – Ältere: Gain und Beschleunigungssättigung
