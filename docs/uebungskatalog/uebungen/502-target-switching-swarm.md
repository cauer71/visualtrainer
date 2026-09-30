---
# ===== Kennung =====
nr: 502
kennung: target-switching-swarm
name: "Zielwechsel im Schwarm – mehrere wandernde Ziele nacheinander anklicken"
name_original: "Aim Trainer Zielwechsel – Multi-Target & Spray Transfer (Spieltitel: Target Switching Swarm)"
kapitel: "Zielen (FPS)"
kapitel_original: "fps"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/fps/target-switching-swarm"
blickfit_umsetzung: null
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Auf dunklem Grund treiben zwei bis fünf leuchtend grüne Kugeln langsam umher; jede verschwindet nach 1–3 s von selbst. Man bewegt ein Fadenkreuz mit der Maus von Kugel zu Kugel und klickt sie ab, bevor sie ablaufen – jeder Treffer bringt Zeit und Combo, jeder Fehlklick oder Ablauf kostet Zeit."
ziel_funktionen: [sakkaden, auge_hand_koordination, zielbewegung_tempo]
eingabe: [maus, touchpad]
tablet_geeignet: mit_anpassung
dauer_sekunden: 45
schwierigkeit_anpassung: "Laut Code stufenlos: Level = Punkte/2.100 + 1. Mit dem Level (und leicht mit der Combo) steigen Zielzahl (ohne Combo 2 → 3 ab Level 8 → 4 ab 15 → 5 ab 22; bei fehlerfreiem Spiel mit hoher Combo schon ab ≈ Level 5,5 / 11,7 / 18,7) und Tempo (50–100 → bis ≈ 270 px/s), Lebensdauer (2,8 s → ≈ 1,0–1,3 s) und Radius (28 → ≈ 15–18 px) sinken. Uhr startet bei 45 s, +2 s je Treffer (max. 60 s), −1 s je Fehlklick/Ablauf – die Runde dauert, bis man nicht mehr mithält."
messgroessen: ["Original: Punkte, Präzision (Treffer/Klicks; Abläufe zählen nicht), Treffer, Fehlklicks, Abläufe, beste Combo, erreichtes Level, Note S+–F (Wurzel aus Punkte/72.000)", "sinnvoll: Zeit vom Treffer bis zum nächsten Treffer (Median), Durchsatz in bit/s nach ISO 9241-9, Ablaufquote, Treffer pro Minute bei fester Dauer"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 2
    nutzbares_sehfeld: 2
    blickfolge: 1
    sakkaden: 3
    fixation: 1
    bewegungswahrnehmung: 1
    visuelle_suche: 1
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 1
    geteilte_aufmerksamkeit: 1
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 1
    verarbeitungsgeschwindigkeit: 2
    antizipation: 1
    entscheidung_wahlreaktion: 1
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 3
    zielbewegung_tempo: 3
    zielbewegung_praezision: 2
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
voraussetzungen: ["Maus (oder Touchpad) und Desktop-Browser mit Pointer Lock – auf Touch-Geräten sperrt das Original den Start", "Vollbild; Monitor 50–70 cm entfernt, passende Korrektion für diesen Abstand", "kein Farbsehen nötig (nur eine Zielart, grün auf fast schwarz)", "Frustrationstoleranz: Fehlklicks und Abläufe kosten sofort Zeit und Combo"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, presbyopie_gleitsicht, gesichtsfeldausfall, sehbehinderung_niedriger_visus, trockenes_auge_bildschirm, kopfschmerz_asthenopie, hand_arm_beschwerden, tremor_parkinson, aufmerksamkeitsprobleme, kognitive_einschraenkung]
geeignet_fuer: ["schnelle Blick-Hand-Wechsel zwischen mehreren Zielen unter Zeitdruck üben", "Maus-Zielbewegungen (Fitts-Aufgabe) mit leicht bewegten Zielen und eigener Reihenfolgewahl", "Fortsetzung nach Einzelziel-Klickübungen (501, 702, 704), bevor Ziel-Priorisierung (510) oder Suche (508) dazukommen", "spielerischer Gesprächsanlass zu Bildschirmsehen (Abstand, Arbeitsplatzbrille, Lidschlag)"]
weniger_geeignet_fuer: ["Tablet-Nutzung (Original nicht startbar; Touch nur in einer eigenen Umsetzung)", "Gleitsichtträger:innen im Vollbild ohne Arbeitsplatzbrille (Ziele bis ≈ 24° seitlich)", "wer eine feste, kurze Übungsdauer braucht (Runde verlängert sich mit jedem Treffer)", "Einsteiger:innen, ältere oder leicht frustrierbare Menschen ab höheren Levels (5 Ziele, ≈ 1 s Lebensdauer)", "Übungsziel glatte Blickfolge oder Dauertracking (dafür 505, 514, 104, 105)"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Die Übung selbst ist nicht untersucht; in gleichartigen Maus-Zielaufgaben verbessert man sich mit Übung deutlich (Aim-Lab-Längsschnitt N = 7.174; Laborstudie N = 86). Ob das auf Spielleistung oder andere Zeigeaufgaben übergeht, wurde nicht kontrolliert geprüft; Alltagseffekte sind nicht belegt."
aehnliche_uebungen: [501, 506, 708, 302, 510, 508, 509, 702, 704, 804, 303, 106]
stichworte: ["target switching", "Zielwechsel", "Multi-Target", "Aim-Trainer", "Fitts'sches Gesetz", "bewegte Ziele", "Blick-Hand-Koordination", "Sakkaden", "sequenzielles Zielen", "Zeitdruck", "Combo", "Pointer Lock", "Maus"]
---

# 502 · Zielwechsel im Schwarm – mehrere wandernde Ziele nacheinander anklicken

> Original: „Aim Trainer Zielwechsel – Multi-Target & Spray Transfer“ (Spiel „Target Switching Swarm“) – skilldrills.online,
> Kapitel Zielen (`fps`) · Blickfit: noch nicht umgesetzt (verwandt: `zielfang` – ein bewegtes Ziel antippen)

## 1. Kurzbeschreibung
Das Spielfeld füllt den Bildschirm: fast schwarzer Grund, darauf zwei (später bis fünf) leuchtend grüne Kugeln, die langsam
geradeaus treiben und an den Rändern abprallen. Man steuert ein Fadenkreuz mit der Maus, klickt eine Kugel an und springt
sofort zur nächsten; jede getroffene Kugel wird irgendwo neu ersetzt. Wer eine Kugel zu lange liegen lässt (sie verschwindet
ohne sichtbaren Countdown) oder danebenklickt, verliert Zeit und seine Trefferserie. Die Runde endet, wenn die Uhr abläuft.

## 2. Ablauf im Original (Analyse)
Grundlage: Seitentext und Spielcode (Chunk `44969-…js` samt Stufen-/Combo-Modulen; geprüft 29.09.2026, nur Mechanik). Winkel
= **eigene Umrechnung** für einen 24-Zoll-Full-HD-Monitor in 60 cm (≈ 38 px pro Grad).
- **Start/Eingabe (Code):** Vollbild + Pointer Lock, Countdown 3-2-1-GO (≈ 2,45 s); Esc oder Verlust von Vollbild/Zeigersperre
  bricht ab. Relative Mausbewegung (`movementX/Y` × Empfindlichkeit 0,1–3, Standard 1) und `mousedown`. `requestPointerLock()`
  wird **ohne** `unadjustedMovement` aufgerufen – „Hardware Raw Input“ (Untertitel) stimmt nicht, die Mausbeschleunigung des
  Systems wirkt mit (MDN, o. J.). Reine Touch-Geräte sehen „Mouse Required for Pointer Lock“.
- **Ziele (Code):** grüne Leuchtkugeln (#10b981; die Website schreibt „Cyan“), Radius 28 px (≈ 1,5°) auf Level 1; Treffer
  zählen bis **6 px außerhalb** des Randes (wirksame Breite 68 px ≈ 1,8°). Zufallsrichtung, Tempo Grundwert + 0–50 px/s
  (Level 1: 50–100 px/s ≈ 1,3–2,6°/s; Maximum ≈ 270 px/s ≈ 7°/s). Bewegung mit Frame-Zeit (dt) gerechnet, also
  **bildfrequenzunabhängig**; nur Wackeln und Partikel laufen pro Frame.
- **Lebensdauer (Code):** 2,8 s (Level 1) → ≈ 2,2 s (Level 8) → ≈ 1,6 s (15) → ≈ 1,25 s (30), hohe Combo bis −20 %
  (Untergrenze 0,9 s). Sie wird **nicht angezeigt** – „bevor deren Timer abläuft“ geht nur über das Merken des Kugelalters.
- **Punkte/Level (Code):** je Treffer 100 × Combo-Faktor (1,0; ab 3 Treffern 1,1 … ab 50 Treffern 3,0) × (1 + 0,5 × (Level
  − 1)/14); Level = Punkte/2.100 + 1, stufenlos, ohne Obergrenze. Fehlerfrei (Combo zählt mit): 3 Ziele ab ≈ 45, 4 ab ≈ 80,
  5 ab ≈ 113 Treffern [eigene Rechnung]. Auch eine hohe Combo erschwert leicht (mehr, schnellere, kleinere, kurzlebigere Ziele).
- **Fehler (Code):** Fehlklick oder Ablauf → Combo 0, **−1 s**, Bildschirmwackeln (± 3–4 px), roter radialer Vollbild-Blitz
  (50 % Deckkraft, 0,45 s; Standard an, abschaltbar), Ton. Das Ablaufen der Ziele ist in den Einstellungen abschaltbar
  (Standard an); der Zeitabzug greift laut Code unabhängig vom Strafen-Schalter immer.
- **Uhr – Widerspruch Regeltext ↔ Code:** Start 45 s, laut Code **+2 s je Treffer (max. 60 s)**; der deutsche Regeltext nennt
  „+0,35 s“ und bei Fehlern nur „Combo-Reset“, der englische „+2 s“ und „−0,8 s“. Wer mehr als einen Treffer pro 2 s schafft,
  verlängert die Runde praktisch beliebig – sie endet erst, wenn Tempo, Zielzahl und Abläufe die eigene Trefferrate übersteigen.
- **Auswertung (Code):** „Präzision“ = Treffer/Klicks (Abläufe zählen nicht); Note aus √(Punkte/72.000): S+ „LEGENDARY“ ab
  64.980, S ab 52.020, A ab 40.500 Punkten [berechnet]. „Wechsel-Latenz“ und „Ziele/min“ der Website **misst das Spiel nicht**.

## 3. Was die Website sagt – und wie das einzuordnen ist
Versprochen wird Training für „Multi-Target-Aiming“ und „Spray Transfers“ (CS2, Valorant, Apex, Overwatch 2) gegen
„Bestätigungszögern“, mit Tipps zu Blickführung, „hydraulischem“ Bremsen, „Nearest-Neighbor-Routing“ und Griffspannung
„Stufe 3 von 10“, dazu eine Tier-Tabelle („Radiant/Faceit 10: unter 210 ms, 110+ Ziele/min“) und 10–15 min, 3–4×/Woche.
- **Belegt:** Jede Zielbewegung folgt Fitts' Gesetz, Kosten fallen pro Wechsel an; schnelle Zielbewegungen bestehen aus
  Primärbewegung plus Korrekturen (Fitts, 1954; Meyer et al., 1988; Elliott et al., 2010). Kürzere Wege sparen Zeit – das
  „Routing“ folgt daraus, ist aber nicht FPS-spezifisch untersucht. Die Messhinweise (16,7/6,9/4,1 ms Bildintervall,
  Vergleich nur am selben Gerät) sind richtig; „absolut latenzfrei“ stimmt nicht – Eingabe-, Verarbeitungs- und
  Anzeigelatenz bleiben (Spjut et al., 2019).
- **Überzogen:** „Primärschub über rund 90 %“ steht nicht in den Quellen; die Hand erreicht ihre Spitzengeschwindigkeit bei
  ≈ 50 % der Strecke und unterschießt leicht (Helsen et al., 1998). Merkmalsintegration und Guided Search (Treisman & Gelade;
  Wolfe) passen schlecht: Es gibt keine Ablenker, alle Ziele sehen gleich aus. „FINST“ (ohne Quelle) meint Pylyshyn & Storm
  (1988) – eine Identitätsverfolgung gleicher Objekte ist hier nicht verlangt.
- **Widerspricht der Evidenz:** „Blick schon aufs nächste Ziel, während die Hand noch korrigiert“ und „Augen 50–80 ms vor der
  Hand“: Die Sakkade startet vor der Hand, die Hand folgt ≈ 100 ms später (Prablanc et al., 1979); während des Zeigens bleibt
  der Blick am Ziel „verankert“, Sakkaden zu einem neuen Ziel verzögern sich um ≈ 155 ms, bis die Hand abbremst (Neggers &
  Bekkering, 2000). Die zitierten Quellen (Treisman & Gelade; Wolfe) enthalten dazu nichts.
- **Ohne Datengrundlage:** Tier-Tabelle, „100–250 ms Verlust durch Kill-Bestätigung“, „neural confidence“, Griffstufe,
  Trainingsdosis; Woods et al. (2015) ist für Wechsel-Latenz falsch zitiert. Spray Transfers kann das Spiel nicht üben – es
  hat keinen Rückstoß.

## 4. Optische und okulomotorische Grundlagen
- **Blicksprünge:** Jeder Wechsel verlangt eine Sakkade (Latenz typisch 180–250 ms; Darrien et al., 2001), ab ≈ 60 Jahren
  langsamer und variabler (Munoz et al., 1998). Neu auftauchende Kugeln ziehen Aufmerksamkeit an (Yantis & Jonides, 1984).
  Aufmerksamkeit ist zwingend an das Sakkadenziel gekoppelt (Deubel & Schneider, 1996); bei geplanten Bewegungsfolgen können
  mehrere künftige Ziele vorab beachtet werden (Baldauf & Deubel, 2010) – vorplanen ja, Blick vorzeitig lösen nein.
- **Sehwinkel/Farbe:** Ziele ≈ 1,5–1,8° (Level 1) bis ≈ 0,8–1,1° – weit über der Sehschärfegrenze; kleine, bewegte und
  kurzlebige Ziele genau anzuklicken, ist bei unscharfem Bild aber unsicherer → `sehschaerfe_detail` 1 (wie 501, 506, 508).
  1–7°/s Tempo verlangt nur kurzes Mitführen. Grün auf fast Schwarz mit hohem Leuchtdichtekontrast, nur eine Zielart →
  Farbsehen nicht nötig.
- **Übersicht:** Anders als bei 501/506 (immer nur ein Ziel) sind 2–5 Ziele gleichzeitig sichtbar; während man eines
  anklickt, muss man die übrigen und ihr (unsichtbares) Alter im Blick behalten → `nutzbares_sehfeld` 2 (wie 302).
  Klickrate ≈ 1–2/s ist keine Tipp-Geschwindigkeitsaufgabe → `fingergeschwindigkeit` 0; die Regel „abklicken, bevor sie
  verschwinden“ ergibt sich beim Spielen → `sprachabhaengigkeit` 0 (wie 501, 506).
- **Gesichtsfeld/Brille:** Vollbild ≈ 48° × 27°; Ziele entstehen bis 40 px vom Rand, also bis ≈ 24° seitlich. Mit Gleitsicht
  ist der scharfe Zwischenbereich bei 60 cm nur ≈ 13–18° breit (Han et al., 2003); Randziele und der obere Bildrand (Blick
  durch den Fernteil) werden unscharf, Kopfbewegungen nehmen zu (Hutchings et al., 2007) → Arbeitsplatzbrille oder kleineres
  Fenster. Akkommodationsbedarf bei 60 cm ≈ 1,7 dpt [eigene Rechnung] – bei Alterssichtigkeit
  ohne passende Zwischenkorrektion nicht mehr aufzubringen.
- **Trockenes Auge:** Bei schnellen Bildschirmspielen sinkt die Lidschlagrate auf ≈ ⅓ (Cardona et al., 2011); die Runde kann
  sich über Minuten ziehen → Pausen, bewusst blinzeln.

## 5. Neurowissenschaftliche Grundlagen
Beteiligt sind die Netzwerke für Sakkaden (frontales Augenfeld, Colliculus superior, Hirnstamm, Kleinhirn; Lehrbuch Leigh &
Zee, 2015) und für visuell geführtes Zeigen, verbunden über gemeinsame Aufmerksamkeitsauswahl (Deubel & Schneider, 1996;
Baldauf & Deubel, 2010). „Zwingt den motorischen Kortex“ oder „neural confidence“ sind Bildsprache ohne Beleg; Hirnveränderungen durch ein solches Training sind nicht untersucht.

## 6. Motorische Grundlagen
- **Fitts:** Zeit ∝ ID = log₂(D/W + 1): bei 700 px Abstand ≈ 3,5 bit (W = 68 px) bzw. ≈ 4,1 bit auf hohen Leveln (W ≈ 43 px)
  [eigene Rechnung]; Maus-Durchsatz in ISO-konformen Studien 3,7–4,9 bit/s (Soukoreff & MacKenzie, 2004). **Bewegte Ziele**
  sind schwerer; ein um die Zielgeschwindigkeit erweiterter Index sagt Fangzeiten besser voraus (Jagacinski et al., 1980).
- **Zielfolgen:** Primärbewegung + Korrektur je Ziel (Meyer et al., 1988); folgt ein weiteres Ziel, wird die erste Bewegung
  länger (Helsen et al., 2001) – der Wechsel ist nie „kostenlos“. Kurze Wege durch Punktmengen finden Menschen
  wahrnehmungsgestützt gut (MacGregor & Ormerod, 1996); bei 2–5 Zielen mit Sofortersatz ist der Planungsanteil klein.
- **Speed-Accuracy/Übung:** Fehlklicks und Abläufe kosten gleichermaßen – Tempo *und* Genauigkeit zählen, Klick-Spammen lohnt
  nicht. 20 Runden Maus-Zielen verkürzten Reaktions- (−70 ms), Korrektur- (−134 ms) und Klick-Verweilzeit (−72 ms)
  (Warburton et al., 2023).

## 7. Einflussfaktoren und Messgrenzen
- **Gerät:** Mausbeschleunigung, Empfindlichkeit/DPI, Bildschirmgröße und Systemlatenz verändern die Werte stark; geringere
  Latenz wirkt mehr als Bildrate > 60 Hz (Spjut et al., 2019) → nur Selbstvergleich am selben Gerät.
- **Offene Rundendauer:** Punkte, Level und Note messen vor allem, wie lange man „überlebt“; die Combo lässt Punkte
  überproportional steigen. „Präzision“ ignoriert Abläufe; Zufallspositionen machen Runden ungleich schwer. Alter:
  Zielbewegungen Älterer sind langsamer und variabler (Ketcham et al., 2002) – Werte nicht zwischen Altersgruppen vergleichen.

## 8. Studienlage: Trainierbarkeit und Übertragung
- **Übungseffekt – stark (für den Aufgabentyp):** Aim-Lab-Daten (N = 7.174, bis 100 Tage): deutliche Verbesserung v. a. der
  Treffer pro Sekunde, 90 % des Tagesnutzens mit ≈ 30 min (Listman et al., 2021; herstellerfinanziert); Laborbefund bei
  Warburton et al. (2023). Die Original-Übung selbst ist nicht untersucht.
- **Naher Transfer – schwach:** keine kontrollierte Studie „Aim-Trainer → Spielleistung“ gefunden; große Effekte digitaler
  Sehtrainings entstehen vor allem, wenn Trainings- und Testaufgabe gleich sind (Guo et al., 2025).
- **Alltagstransfer – fehlend:** Metaanalysen zu Action-Videospielen betreffen ganze Spiele und kognitive Maße; motorische Maße
  wurden mangels Daten ausgeschlossen (Bediou et al., 2023).

## 9. Auswahlhinweise für die KI
- **Passt, wenn …** schnelle Blick-Hand-Wechsel zwischen mehreren Zielen, Maus-Zielbewegungen unter Zeitdruck oder ein
  motivierendes Punkte-/Combo-Spiel für geübte Maus-Nutzer:innen gesucht sind.
- **Weniger passend, wenn …** nur ein Tablet vorhanden ist, eine feste kurze Dauer nötig ist, Einsteiger:innen oder ältere
  Menschen ohne Maus-Routine üben oder Blickfolge/Dauertracking das Ziel ist.
- **Vorsicht / anpassen bei …** `photosensitive_epilepsie`, `migraene_lichtempfindlich` (roter Vollbild-Blitz bei jedem Fehler,
  bei Fehlerserien mehrmals pro Sekunde möglich; Richtwert ≤ 3 Blitze/s, Fisher et al., 2005 → Blitz abschalten);
  `presbyopie_gleitsicht` (Ziele bis 24° seitlich); `gesichtsfeldausfall` (Ziele erscheinen überall, Abläufe bleiben
  unbemerkt); `sehbehinderung_niedriger_visus` (kleine, bewegte, kurzlebige Ziele im ganzen Feld – wie 501/506);
  `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie` (seltener Lidschlag, offene Dauer); `hand_arm_beschwerden`,
  `tremor_parkinson` (schnelle Mauszüge, Klicks); `aufmerksamkeitsprobleme`, `kognitive_einschraenkung` (Hektik, sofortige Strafen).
- **Kombiniert gut mit …** 501 (Einzel-Flicks) → 502 → 510 (Priorisierung) bzw. 508 (Zielerkennung); 702/704 als
  Maus-Grundlage; 303 (Blicksprünge ohne Hand); ohne Maus eher 302/804 oder Blickfit `zielfang`. Keine Aussagen über
  Sehleistung, Verkehrstauglichkeit oder Spielerfolg ableiten.
- **Abgrenzung in der Gruppe:** 501 und 506 (gleicher Grundaufbau mit Zeitkonto, Combo und Strafen) zeigen immer nur ein
  ruhendes Ziel; 502 verlangt zusätzlich Übersicht über mehrere bewegte Ziele und eine Reihenfolgewahl. 506 ist die
  Variante mit weiten Wegen zum Bildschirmrand, 508 die Variante mit Suche nach einer Regel (Helligkeit) ohne Zeitlimit je Ziel.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Tablet/Touch:** Original sperrt Touch. Umsetzbar als „Tippen im Schwarm“ mit direkten Tipps, Zielen ≥ 9–10 mm (Parhi et
  al., 2006; auf 11-Zoll-Tablet ≥ 48 CSS-px) und Trefferzone größer als sichtbar; Touch ist für Ältere sogar günstiger als
  die Maus (Findlater et al., 2013). Der Maus-„Flick“ entfällt, Fitts gilt weiter. Feste Dauer (z. B. 45 s) statt
  Zeitgutschrift, adaptives Treppenverfahren statt unbegrenztem Level.
- **Messung:** Zeit Treffer → Treffer (Median), Durchsatz, Ablaufquote getrennt; keine Tier-Tabellen/Noten („LEGENDARY“);
  Lebensdauer sichtbar machen (schrumpfender Ring), damit Priorisierung möglich wird.
- **Sicherheit/Optik:** kein roter Vollbild-Blitz, kein Wackeln; Spielfeld verkleinerbar (≤ 30° breit, eher mittig-unten),
  Hinweis auf Arbeitsplatzbrille; übersetzte Texte (DE/IT), Regeltext und Code in Einklang.

## 11. Quellen
### Von der Website angegeben
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** nein (einfache Tastenreaktion, keine Wechsel-Latenz oder Eliminationsrate)
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Gesetz ja; „90 %-Primärschub“ und Zeitwerte nicht)
- Meyer, D. E., Abrams, R. A., Kornblum, S., Wright, C. E., & Smith, J. E. K. (1988). Optimality in human motor performance: Ideal control of rapid aimed movements. *Psychological Review, 95*(3), 340–370. https://doi.org/10.1037/0033-295X.95.3.340 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Teilbewegungs-Modell ja; Prozentwerte und Trainingsbehauptungen nicht)
- Treisman, A. M., & Gelade, G. (1980). A feature-integration theory of attention. *Cognitive Psychology, 12*(1), 97–136. https://doi.org/10.1016/0010-0285(80)90005-5 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Theorie korrekt, aber keine Suche mit Ablenkern in der Übung) bzw. nein (Blick-vor-Hand-Aussage)
- Wolfe, J. M. (2007). Guided Search 4.0: Current progress with a model of visual search. In W. D. Gray (Hrsg.), *Integrated models of cognitive systems* (S. 99–119). Oxford University Press. https://doi.org/10.1093/acprof:oso/9780195189193.003.0008 – **Prüfung:** DOI stimmt ✓ (Buchkapitel); **stützt:** teilweise (wie Treisman & Gelade) bzw. nein (Blick-vor-Hand-Aussage)
- Im Text ohne Quelle („FINST-Theorie“): gemeint Pylyshyn & Storm (1988), s. u. – **Prüfung:** DOI der richtigen Arbeit per Crossref ✓; **stützt:** nein (keine Identitätsverfolgung nötig)

### Weitere Fachliteratur
- Baldauf, D., & Deubel, H. (2010). Attentional landscapes in reaching and grasping. *Vision Research, 50*(11), 999–1013. https://doi.org/10.1016/j.visres.2010.02.008 – mehrere Aufmerksamkeitsfoki bei Bewegungsfolgen
- Bediou, B., Rodgers, M. A., Tipton, E., Mayer, R. E., Green, C. S., & Bavelier, D. (2023). Effects of action video game play on cognitive skills: A meta-analysis. *Technology, Mind, and Behavior, 4*(1), 28–48. https://doi.org/10.1037/tmb0000102 – Transfer, motorische Maße ausgeschlossen
- Cardona, G., García, C., Serés, C., Vilaseca, M., & Gispets, J. (2011). Blink rate, blink amplitude, and tear film integrity during dynamic visual display terminal tasks. *Current Eye Research, 36*(3), 190–197. https://doi.org/10.3109/02713683.2010.544442 – Lidschlag bei schnellen Spielen
- Darrien, J. H., Herd, K., Starling, L.-J., Rosenberg, J. R., & Morrison, J. D. (2001). An analysis of the dependence of saccadic latency on target position and target characteristics in human subjects. *BMC Neuroscience, 2*, 13. https://doi.org/10.1186/1471-2202-2-13 – Sakkadenlatenz
- Deubel, H., & Schneider, W. X. (1996). Saccade target selection and object recognition: Evidence for a common attentional mechanism. *Vision Research, 36*(12), 1827–1837. https://doi.org/10.1016/0042-6989(95)00294-4 – Kopplung Aufmerksamkeit–Sakkadenziel
- Elliott, D., Hansen, S., Grierson, L. E. M., Lyons, J., Bennett, S. J., & Hayes, S. J. (2010). Goal-directed aiming: Two components but multiple processes. *Psychological Bulletin, 136*(6), 1023–1044. https://doi.org/10.1037/a0020958 – Zwei-Komponenten-Modell, Online-Kontrolle
- Findlater, L., Froehlich, J. E., Fattal, K., Wobbrock, J. O., & Dastyar, T. (2013). Age-related differences in performance with touchscreens compared to traditional mouse input. In *Proceedings of CHI '13* (S. 343–346). ACM. https://doi.org/10.1145/2470654.2470703 – Touch vs. Maus im Alter
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Blitzreize
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – aufgabenspezifische Effekte
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht-Zwischenbereich
- Helsen, W. F., Elliott, D., Starkes, J. L., & Ricker, K. L. (1998). Temporal and spatial coupling of point of gaze and hand movements in aiming. *Journal of Motor Behavior, 30*(3), 249–259. https://doi.org/10.1080/00222899809601340 – Blick-Hand-Kopplung, Unterschießen
- Helsen, W. F., Adam, J. J., Elliott, D., & Buekers, M. J. (2001). The one-target advantage: A test of the movement integration hypothesis. *Human Movement Science, 20*(4–5), 643–674. https://doi.org/10.1016/S0167-9457(01)00071-9 – Kosten von Zielfolgen
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Kopfbewegungen mit Gleitsicht (Crossref listet 5 Autor:innen; Lillakas per Erratum ergänzt)
- Jagacinski, R. J., Repperger, D. W., Ward, S. L., & Moran, M. S. (1980). A test of Fitts' law with moving targets. *Human Factors, 22*(2), 225–233. https://doi.org/10.1177/001872088002200211 – Fitts für bewegte Ziele (nur Kurzfassung eingesehen)
- Ketcham, C. J., Seidler, R. D., Van Gemmert, A. W. A., & Stelmach, G. E. (2002). Age-related kinematic differences as influenced by task difficulty, target size, and movement amplitude. *The Journals of Gerontology: Series B, 57*(1), P54–P64. https://doi.org/10.1093/geronb/57.1.P54 – Alter
- Leigh, R. J., & Zee, D. S. (2015). *The neurology of eye movements* (5. Aufl.). Oxford University Press. https://doi.org/10.1093/med/9780199969289.001.0001 – Sakkaden-Netzwerk (Lehrbuch)
- Listman, J. B., Tsay, J. S., Kim, H. E., Mackey, W. E., & Heeger, D. J. (2021). Long-term motor learning in the "wild" with high volume video game data. *Frontiers in Human Neuroscience, 15*, 777779. https://doi.org/10.3389/fnhum.2021.777779 – Übungseffekt Aim Lab
- MacGregor, J. N., & Ormerod, T. (1996). Human performance on the traveling salesman problem. *Perception & Psychophysics, 58*(4), 527–539. https://doi.org/10.3758/BF03213088 – Routenwahl
- MDN Web Docs. (o. J.). *Element: requestPointerLock() method*. Abgerufen am 29.09.2026 von https://developer.mozilla.org/en-US/docs/Web/API/Element/requestPointerLock – `unadjustedMovement`, iPad
- Munoz, D. P., Broughton, J. R., Goldring, J. E., & Armstrong, I. T. (1998). Age-related performance of human subjects on saccadic eye movement tasks. *Experimental Brain Research, 121*(4), 391–400. https://doi.org/10.1007/s002210050473 – Sakkaden im Alter
- Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. *Journal of Neurophysiology, 83*(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639 – Blickverankerung
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of MobileHCI '06* (S. 203–210). ACM. https://doi.org/10.1145/1152215.1152260 – Touch-Zielgröße
- Prablanc, C., Echallier, J. F., Komilis, E., & Jeannerod, M. (1979). Optimal response of eye and hand motor systems in pointing at a visual target. I. *Biological Cybernetics, 35*(2), 113–124. https://doi.org/10.1007/BF00337436 – Sakkade vor Hand
- Pylyshyn, Z. W., & Storm, R. W. (1988). Tracking multiple independent targets: Evidence for a parallel tracking mechanism. *Spatial Vision, 3*(3), 179–197. https://doi.org/10.1163/156856888X00122 – FINST (nur Kurzfassung)
- Soukoreff, R. W., & MacKenzie, I. S. (2004). Towards a standard for pointing device evaluation, perspectives on 27 years of Fitts' law research in HCI. *International Journal of Human-Computer Studies, 61*(6), 751–789. https://doi.org/10.1016/j.ijhcs.2004.09.001 – Durchsatz
- Spjut, J., Boudaoud, B., Binaee, K., Kim, J., Majercik, A., McGuire, M., Luebke, D., & Kim, J. (2019). Latency of 30 ms benefits first person targeting tasks more than refresh rate above 60 Hz. In *SIGGRAPH Asia 2019 Technical Briefs* (S. 110–113). ACM. https://doi.org/10.1145/3355088.3365170 – Latenz vs. Bildrate
- Warburton, M., Campagnoli, C., Mon-Williams, M., Mushtaq, F., & Morehead, J. R. (2023). Kinematic markers of skill in first-person shooter video games. *PNAS Nexus, 2*(8), pgad249. https://doi.org/10.1093/pnasnexus/pgad249 – Übung, Bewegungsphasen
- Yantis, S., & Jonides, J. (1984). Abrupt visual onsets and selective attention: Evidence from visual search. *Journal of Experimental Psychology: Human Perception and Performance, 10*(5), 601–621. https://doi.org/10.1037/0096-1523.10.5.601 – neu erscheinende Ziele
