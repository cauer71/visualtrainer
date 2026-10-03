---
# ===== Kennung =====
nr: 304
kennung: fps-tracking-trainer
name: "Pendelndes Ziel abfangen – Klick auf ein bewegtes Ziel mit Richtungswechseln"
name_original: "Aim-Training online (Seitentitel: Aim-Training online | SkillDrills; Untertitel: Tracking · Bewegliche Ziele verfolgen)"
kapitel: "Reaktionsgeschwindigkeit"
kapitel_original: "reaction-speed"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/reaction-speed/fps-tracking-trainer"
blickfit_umsetzung: {kennung: "pendel-fang", name: "Pendel-Fang", unterschiede: "Tablet-Umsetzung für Touch: große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/pendel-fang/)."}
stand: 2026-09-30

# ===== Überblick =====
kurzbeschreibung: "Ein Ziel schwingt gleichmäßig auf einer waagrechten Linie hin und her; in der Mitte liegt ein markierter Fangbereich. Man verfolgt das Ziel mit dem Blick und tippt irgendwo auf den Bildschirm, wenn es im Fangbereich ist. Die Übung zeigt die Abweichung in Millisekunden und in Prozent der Bahnbreite samt Tendenz (eher zu früh oder zu spät). Mit der Stufe wird die Schwingung schneller und der Fangbereich enger."
ziel_funktionen: [blickfolge, bewegungswahrnehmung, antizipation, auge_hand_koordination]
eingabe: [maus, touch, touchpad]
tablet_geeignet: mit_anpassung
dauer_sekunden: 45   # Startguthaben; tatsächliche Rundendauer variabel, laut Modellrechnung ≈ 100–250 s
schwierigkeit_anpassung: "Automatisch, nie rückläufig: Level = Punkte / 1.750 + 1 (stufenlos). Laut Code von Level 1 bis 15: Tempo 200 → 694 px/s, Abstand der Richtungswechsel 700–1.100 → 228–385 ms, Lebensdauer 1.300 → 380 ms, Radius 28 → 12 px, Trefferzugabe 14 → 5 px; darüber weiter steigend. Eine Serie (Combo-Faktor bis 3,0) verschärft zusätzlich: Tempo +40 %, Wechselabstand und Lebensdauer −30 bzw. −32 %, Radius −25 %, Trefferzugabe −50 % (min. 4 px). Rundendauer variabel: 45 s Startguthaben, +2 s je Treffer (max. 60 s), −1 s je Fehlklick/Ablauf."
messgroessen: ["Punkte", "Genauigkeit = Treffer / (Treffer + Fehlklicks + abgelaufene Ziele)", "'Ø Reaktion' = Zeit vom Erscheinen bis zum Treffer (enthält Verfolgen; nur Treffer)", "höchstes Level, maximale Combo, Buchstabennote", "sinnvoll: Trefferquote je Tempo und je Abstand zur letzten Richtungsumkehr, Klickversatz vor/hinter dem Ziel, bei Maus Zeit auf dem Ziel"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 1
    blickfolge: 3
    sakkaden: 2
    fixation: 0
    bewegungswahrnehmung: 3
    visuelle_suche: 0
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
    verarbeitungsgeschwindigkeit: 2
    antizipation: 3
    entscheidung_wahlreaktion: 1
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 2
    auge_hand_koordination: 3
    zielbewegung_tempo: 2
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
  flimmern_lichtreize: 2
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Maus, Touchpad, Touchscreen oder Leertaste; irgendwo auf dem Bildschirm zu tippen genügt", "ein großes, kontrastreiches Ziel erkennen, das gleichmäßig hin und her schwingt", "passende Korrektion für den Bildschirmabstand über die ganze Bahnbreite", "kein Farbsehen nötig", "Tablet quer halten (hochkant ist die Bahn kürzer)"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, nystagmus, presbyopie_gleitsicht, gesichtsfeldausfall, sehbehinderung_niedriger_visus, trockenes_auge_bildschirm, kopfschmerz_asthenopie, tremor_parkinson, hand_arm_beschwerden, kognitive_einschraenkung, aufmerksamkeitsprobleme]
geeignet_fuer: ["einem waagrecht schwingenden Ziel mit dem Blick folgen und im richtigen Moment tippen", "den Zeitpunkt des Durchgangs durch die Mitte vorausschätzen (Vorhalt)", "spielerisches Aufwärmen für Jugendliche und Erwachsene mit Freude an Tempo und Punkten", "Einstieg vor echten Tracking-Übungen mit Haltezeit (505, 512, 514)"]
weniger_geeignet_fuer: ["Messung von Blickfolge oder Reaktionszeit (keine Blickmessung; gemessen wird der Zeitpunkt des Tipps)", "ruhiges Blickfolgetraining ohne Zeitdruck (dafür 404, 105)", "Gleitsichtträger:innen im Vollbild am großen Monitor", "Ältere oder Einsteiger:innen auf hohen Stufen (schnelle Schwingung, schmaler Fangbereich)", "Tablet im Hochformat"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Die Übung selbst wurde nie untersucht; Zeige- und Abfangaufgaben werden durch Wiederholung deutlich besser, zu einem großen Teil durch Gewöhnung an Gerät und Strategie (Guo et al. 2025); Effekte auf unähnliche Tests sind viel kleiner, ein Nutzen für E-Sport, Sport oder Alltag ist nicht belegt (Bediou et al. 2018 vs. Sala et al. 2018; Fransen 2024)."
aehnliche_uebungen: [305, 306, 512, 505, 513, 514, 104, 105, 410, 415, 707, 503, 101]
stichworte: ["bewegtes Ziel", "Abfangen", "Interzeption", "Richtungswechsel", "glatte Blickfolge", "Aufholsakkaden", "Vorhalt", "Auge-Hand-Koordination", "Aim-Training", "Pendel", "Combo", "Latenz", "Touch"]
---

# 304 · Pendelndes Ziel abfangen – Klick auf ein bewegtes Ziel mit Richtungswechseln

> Original: „Aim-Training online“ (Untertitel „Tracking · Bewegliche Ziele verfolgen“) – skilldrills.online, Kapitel Reaktionsgeschwindigkeit (`reaction-speed`) · Blickfit: noch nicht umgesetzt (verwandt: `zielfang`)

## 1. Kurzbeschreibung

Ein Ziel schwingt gleichmäßig auf einer waagrechten Linie hin und her; in der Mitte liegt ein markierter Fangbereich.
Man tippt irgendwo auf den Bildschirm (am Computer genügt die Leertaste), wenn das Ziel im Fangbereich ist. Danach zeigt
ein Ring, wo das Ziel beim Tipp war, mit Haken oder Kreuz, und das Ergebnis nennt die Abweichung in Millisekunden und in
Prozent der Bahnbreite mit Tendenz (eher zu früh oder zu spät). Die Bewegung folgt einer Sinuskurve und ist damit
vorhersagbar: Der Ort ist bekannt, es zählt allein der richtige Moment. Mit der Stufe wird die Schwingung schneller und
weiter, und der Fangbereich wird enger; Änderungen blenden weich über. Eine Sitzung besteht aus 18 Versuchen. Die Übung
verlangt, dem Ziel mit dem Blick zu folgen und den Moment des Durchgangs vorauszuschätzen; gewertet wird allein der
Tipp, nicht der Blick.

## 2. Ablauf im Original (Analyse)

Grundlage: Seitentext und ausgelieferter Spielcode (Chunk `70768-…js` mit den gemeinsamen Modulen für Schwierigkeit, Combo, Strafe und Zeichnen; geprüft am 29.09.2026, nur Mechanik übernommen). Winkel = **eigene Rechnung** (Monitor 24″ Full-HD in 60 cm ≈ 37,8 px/°; Tablet 11″ in 40 cm ≈ 36,4 CSS-px/°).

- **Ablauf:** Start → Countdown 3-2-1-GO (≈ 2,45 s, Töne) → Spiel → Ergebnis (Punkte, Genauigkeit, Ø Reaktion, höchstes Level, maximale Combo, Note). Escape oder Verlassen des Vollbilds bricht ab. Startlevel immer 1.
- **Spielfeld:** 16:9 in der Seite (Handy hochkant 3:4, Hinweis „ins Querformat drehen“) oder Vollbild, Grund #050508 mit feinem Raster. Die Bahn liegt auf halber Höhe zwischen zwei schwach roten Randmarken bei 12 % und 88 % der Breite → **76 % der Breite**: im Vollbild am Monitor ≈ 37°, eingebettet (≈ 1.100 px) ≈ 22°, am Tablet quer ≈ 24°.
- **Ziel:** ein einziges rotes Ziel (#ef4444, Leuchtrand, weißer Kern), Start am linken oder rechten Rand mit Bewegung zur Mitte. Das **Tempo ist je Ziel konstant**; es ändert sich nur das Vorzeichen (Umkehr nach Zufallsintervall zwischen Minimum und Maximum, zusätzlich Abprall an den Randmarken). Bewegung mit Bildzeit (dt, höchstens 0,1 s pro Bild) → bildfrequenzunabhängig; nur Partikel und Wackel-Abklingen laufen pro Bild (optisch).
- **Treffer:** Pointer-Down innerhalb von Radius + unsichtbarer Trefferzugabe um die *aktuelle* Zielposition. Bei Touch, Fenster < 768 px oder Mobilgerät: Radius +2 px, Zugabe +10 px, **kein Fadenkreuz** (am Desktop folgt ein weißes Fadenkreuz dem Zeiger). Keine Tastatur. Nach Treffer oder Ablauf neues Ziel nach 140–260 ms; ein Fehlklick lässt das Ziel weiterlaufen. Das Ablaufen ist an eine gespeicherte, drillübergreifende Einstellung gekoppelt (Standard: an; auf dieser Seite kein Schalter) – ist sie aus, verschwindet das Ziel erst beim Treffer.
- **Schwierigkeit:** p = (Level − 1)/14, exponentieller Abfall wie in 302 (Literaturbasis W03), über Level 15 hinaus weiter. Level stufenlos = Punkte/1.750 + 1, sinkt nie.

| Level | Ø Ziel (Monitor) | Trefferzone Ø | Tempo | Umkehr alle | Lebensdauer | Zeitfenster bei ruhendem Zeiger* |
|---|---|---|---|---|---|---|
| 1 | 56 px ≈ 1,5° | 84 px ≈ 2,2° | 200 px/s ≈ 5,3°/s | 700–1.100 ms | 1.300 ms | ≈ 420 ms |
| 5 | 47 px ≈ 1,2° | 71 px ≈ 1,9° | 332 px/s ≈ 8,8°/s | 574–910 ms | 1.055 ms | ≈ 215 ms |
| 10 | 35 px ≈ 0,9° | 50 px ≈ 1,3° | 532 px/s ≈ 14°/s | 384–620 ms | 682 ms | ≈ 95 ms |
| 15 | 24 px ≈ 0,6° | 34 px ≈ 0,9° | 694 px/s ≈ 18°/s | 228–385 ms | 380 ms | ≈ 49 ms |
| 15 + Combo 3,0 | 18 px ≈ 0,5° | 26 px ≈ 0,7° | 972 px/s ≈ 26°/s | 160–270 ms | 258 ms | ≈ 27 ms |

\* *Eigene Rechnung:* Zeit, in der ein ruhender Zeiger in der Trefferzone liegt (Zonenbreite / Tempo).

- **Combo und Punkte:** Faktor 1,1/1,25/1,35/1,5/1,75/2/2,5/3,0 ab 3/5/7/10/15/20/30/50 Treffern in Folge; Punkte = 100 × Faktor × (1 + 0,5 p). Fehler/Ablauf: Combo 0, Bildwackeln (6 px), Ton, **roter Fehlerblitz** (abschaltbar, gleiches Modul wie 302).
- **Zeit:** Start 45 s, **+2 s je Treffer** (max. 60 s), **−1 s je Fehlklick und Ablauf**. Da ein Ziel höchstens 1,3 s lebt, bringt jeder Treffer netto Zeit (+2 s gegenüber ≈ 0,5–1,5 s Verbrauch); ein Ablauf kostet Lebensdauer + Pause + 1 s. Die Runde endet erst, wenn Fehler und Abläufe überwiegen. *Grobe Modellrechnung* (feste Trefferzeit 0,4–0,8 s, Trefferwahrscheinlichkeit 60–95 %): Rundendauer ≈ 100–250 s, Endlevel ≈ 8–14.
- **Note:** 100 × √(Punkte/18.000) → z. B. „S+ LEGENDARY“ ab 16.245 Punkten; Teilen-Karte „ELITE REFLEX“.

**Widersprüche Regeltext ↔ Code:** (1) „Du hältst das Fadenkreuz auf dem Ziel … bewertet wird kontinuierliche Kontrolle“ – gewertet wird **nur der Klick**, eine Haltezeit wird nicht erfasst. (2) „+0,6 s“ je Treffer – Code +2 s. (3) „Ohne Zeitstrafe“ bzw. „−0,8 s“ – Code zieht **immer** 1 s ab (Strafabfrage auf „an“ erzwungen). (4) Referenzspalte „Zielkontrolle 55–90 %“ – diese Größe berechnet das Spiel nicht. (5) „Ziel beschleunigt“ – innerhalb eines Ziels konstantes Tempo, schneller wird es nur von Ziel zu Ziel. (6) Festdauer 45 s – tatsächlich variabel (s. o.).

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite richtet sich an FPS- und Battle-Royale-Spieler:innen, verspricht „saubere Cursorführung“ und Erholung nach Richtungswechseln, verweist auf die Blickfolge-Forschung (Rashbass, Krauzlis) und nennt Einflussfaktoren (Bildrate, Maus, Sensitivität, Müdigkeit). Sie betont, der Score sei „kein klinischer Test“, der Drill verbessere das Spiel-Aim „nicht automatisch“, und empfiehlt 5–15-min-Blöcke sowie Abbruch bei Schwindel, Doppelbildern oder Kopfschmerz. Das ist zurückhaltend und im Kern korrekt. Einordnung:

- **Blickfolge-Bezug teilweise richtig:** Glatte Folgebewegung wird durch Geschwindigkeitsfehler gesteuert, Positionsfehler durch Aufholsakkaden korrigiert (Rashbass, 1961; de Brouwer et al., 2002). Die Übung misst aber keine Augen, sondern Klicks – das sagt die Seite selbst.
- **„Tracking“ ist hier eine Abfangaufgabe:** Am Desktop kann man mit dem Zeiger mitführen und im Überlappen klicken; am Tablet ohne Fadenkreuz bleibt nur Vorausschätzen und Tippen. Ab etwa Level 10 kommt die Hand den Umkehrungen ohnehin nicht mehr nach (Abschnitte 4 und 6).
- **Referenztabelle ohne Datengrundlage:** Die Stufen („Basis“ bis „Nur Referenz 90 %+ / 98 %+“) sind als „weder Perzentile noch Rang-Garantie“ gekennzeichnet – korrekt, aber die Spalte „Zielkontrolle“ wird gar nicht gemessen. Die Note „LEGENDARY“/„ELITE REFLEX“ beruht nur auf Punkten.
- **Green & Bavelier (2003)** untersuchten Aufmerksamkeit nach Actionspielen, nicht Tracking; die Übertragbarkeit ist umstritten (Bediou et al., 2018 vs. Sala et al., 2018).
- **Tipp „aufs Ziel, nicht auf den Cursor schauen“** ist plausibel, aber nicht direkt geprüft: Beim Handtracking blieb der Blick ebenso nahe am Ziel wie beim reinen Blickverfolgen, der Folge-Gain war höher und Aufholsakkaden seltener (Danion & Flanagan, 2018; Joystick-Cursor, unvorhersehbare Bahn). Ein Vergleich „Blick aufs Ziel vs. Blick auf den Cursor“ wurde dort nicht untersucht.

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel und Kontrast:** Ziel und Fangbereich sind groß und kontrastreich. Begrenzend ist nicht das Detail, sondern
  Bewegung und Timing. Zur Orientierung: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°.
- **Bewegung und Tempo:** Das Ziel ist in der Mitte am schnellsten und kehrt an den Enden gleichmäßig um; die Schwingdauer
  beträgt 5,0 s auf der ersten und 2,8 s auf der letzten Stufe. Die glatte Folgebewegung der Augen erreicht beim Gesunden
  eine Verstärkung (Gain, Augen- ÷ Zielgeschwindigkeit) unter 0,95, die mit dem Tempo sinkt (Collewijn & Tamminga, 1984);
  in einem Standardversuch mit 1.058 jungen Erwachsenen lag sie im Mittel bei 0,80 (Spanne 0,31–1,08), mit 0,64
  Aufholsakkaden je Sekunde (Bargary et al., 2017). Aufholsakkaden werden ausgelöst, wenn der Positionsfehler nicht binnen
  40–180 ms von selbst schrumpft (de Brouwer et al., 2002).
- **Vorhersagbarkeit:** Ein gleichmäßiges Pendeln lässt sich vorausahnen, und die Folgebewegung kann Vorhersagen nutzen
  (Kowler et al., 2019). Bei unvorhersehbarer, schneller Bewegung ist das anders: Bei pseudozufälliger Bewegung (Summe von
  vier Sinusschwingungen) fiel der Gain der langsamen Anteile von 0,92 auf 0,53, wenn die schnellste Komponente von 0,39
  auf 1,56 Hz stieg (Barnes et al., 1987). Die Folgebewegung startet erst etwa 100 ms nach einer Bewegungsänderung (Carl &
  Gellman, 1987); die gleichmäßigen Umkehrpunkte hier sind dagegen erwartbar.
- **Klinische Prüfung der Folgebewegung:** Die äußeren Augenmuskeln werden klinisch geprüft, indem die Augen einem nahen
  Ziel folgen, das in einem „H“ geführt wird; geprüft werden damit Adduktion, Senkung bei Abduktion und Hebung (Hirnnerven
  III, IV und VI; Muchnick, 2008, S. 32–35). Das Lehrbuch macht keine Aussage zur Qualität der Folgebewegung und keine zu
  Training.
- **Praxisangaben zur Durchführung (Erfahrungswissen, nicht belegt):** Bei Blickfolge-Übungen gilt als Hinweis, den Kopf
  ruhig zu halten und nur die Augen zu bewegen. Eine klassische Übungsform der Sehtherapie ist das Folgen eines an einer
  Schnur hängenden Balls, oft mit aufgedruckten Buchstaben: Er wird in verschiedenen Richtungen angestoßen (waagrecht,
  senkrecht, schräg, kreisend im und gegen den Uhrzeigersinn), und gesteigert wird, indem die Buchstaben gelesen werden und
  die Körperhaltung wechselt. Ein Wirksamkeitsbeleg liegt dafür nicht vor.
- **Gleitsicht und Alterssichtigkeit:** Die Bahn liegt günstig auf Augenhöhe, kann aber breiter sein als die klare
  Zwischenzone von Gleitsichtgläsern (etwa 13–18°; Han et al., 2003): Unschärfe am Bahnende oder Kopfbewegung. Besser sind
  eine Bildschirmbrille, ein kleines Fenster und ein Blick geradeaus auf Bahnhöhe. Der Gain sinkt im Alter bei allen
  Tempi, bei schnellen Zielen besonders (Moschner & Baloh, 1994).
- **Bildschirm und Latenz:** Ende-zu-Ende vom Mausklick bis zum Bild 36,6 ms bei 60 Hz und 21,1 ms bei 120 Hz (günstigster
  Laboraufbau: 1.000-Hz-Maus, natives Programm, kein Browser); Touch-Geräte 48–276 ms je nach Gerät, System und
  Programmierumgebung (Casiez et al., 2017). Das Ziel bewegt sich in dieser Zeit weiter; man tippt deshalb systematisch
  etwas später, und das Maß ändert sich mit dem Gerät.
- **Trockenes Auge:** Die Blinzelrate sinkt am Bildschirm im Mittel auf etwa ein Fünftel (Patel et al., 1991); anhaltendes
  Verfolgen ohne Pause verstärkt das eher.

## 5. Neurowissenschaftliche Grundlagen

Zu dieser Aufgabe gibt es keine Bildgebungs- oder Trainingsstudie. Die Folgebewegung wird von einem Netzwerk aus
frontalem Augenfeld, Kleinhirn, Basalganglien und Colliculus superior gesteuert, das dem Sakkadensystem ähnelt
(Krauzlis, 2004); vorhersagende Anteile hängen mit frontaler Aktivität und Bewegungsarealen der Sehrinde zusammen
(Kowler et al., 2019). Die Handsteuerung passt Richtung und Beschleunigung laufend an die Zielbewegung an, mit etwa 110
bzw. 200 ms Verzögerung (Brenner et al., 1998). „Trainiert Region X“ lässt sich daraus nicht ableiten.

## 6. Motorische Grundlagen

- **Timing-Präzision:** Beim Treffen bewegter Ziele streut der Zeitpunkt der Hand um etwa 20 ms, der Ort um etwa 5 mm
  (Brenner & Smeets, 2009). Das Zeitfenster, in dem das Ziel im Fangbereich liegt, schrumpft rechnerisch von etwa 350 ms
  auf der ersten auf etwa 75 ms auf der letzten Stufe (Verhältnis aus Breite des Fangbereichs und Tempo; auf kleinen
  Bildschirmen ist es wegen der Mindestbreite von 44 px größer). Auf hohen Stufen ist es damit schmal im Vergleich zur
  natürlichen Streuung.
- **Tipps auf bewegte Ziele:** Sie landen im Mittel hinter dem Ziel, umso mehr, je schneller es ist (Huang et al., 2018);
  für bewegte Ziele passt das Fitts’sche Gesetz nur mit einem Geschwindigkeitsterm (Jagacinski et al., 1980). Die Übung
  zeigt deshalb die Tendenz (eher zu früh oder zu spät) und nicht nur den Betrag.
- **Touch und Maus:** Gegenüber der Maus verkürzte Touch die Bewegungszeit bei Älteren um 35 %, bei Jüngeren um 16 %
  (ruhende Ziele; Findlater et al., 2013). Weil irgendwo auf dem Bildschirm getippt wird, verdeckt die Hand das Ziel nicht,
  und die Trefferfläche spielt keine Rolle.
- **Tremor:** physiologisch etwa 8–12 Hz, bei Parkinson 3–6 Hz (McAuley & Marsden, 2000); da nicht gezielt werden muss,
  stört er hier wenig.

## 7. Einflussfaktoren und Messgrenzen

- **Gerät:** Anzeige- und Eingabelatenz bestimmen, wie früh man tippen muss; in einem Shooter brachten 10 ms weniger
  Latenz messbar mehr Treffer (+0,8 % Trefferquote; Liu et al., 2021). Browser-Messungen enthalten 58–133 ms Geräteanteil
  (Pronk et al., 2020). Bildschirmgröße und Ausrichtung ändern Bahnbreite und Sehwinkel. **Nur der Vergleich mit sich
  selbst am selben Gerät** ist sinnvoll. Messungen am Menschen streuen von Versuch zu Versuch; aussagekräftiger als ein
  einzelner Tipp sind der Mittelwert über die 18 Versuche und der Verlauf über mehrere Sitzungen (Mountford et al., 2004,
  S. 43–44).
- **Messgrößen:** Trefferquote, mittlere Abweichung in ms und in Prozent der Bahnbreite und Tendenz (Median der
  vorzeichenbehafteten Abweichung); Versuche ohne Tipp werden getrennt gezählt. Gewertet wird der Zeitpunkt des Tipps
  selbst, nicht der des nächsten Bildes. Es werden keine Augenbewegungen gemessen. Kennzahlen eines kommerziellen
  Zielübungs-Programms (N = 10) waren an zwei Terminen sehr zuverlässig (ICC 0,947–0,995); signifikant besser wurde man
  zwischen den Terminen nur in einer von vier Aufgaben (Rogers et al., 2024).
- **Zustand und Alter:** Im Alter ist der Folge-Gain bei allen Tempi niedriger (Moschner & Baloh, 1994); Müdigkeit dürfte
  zusätzlich schaden (plausibel, hier nicht eigens belegt). Auch die Körperhaltung gilt in der Praxis als Einflussgröße
  auf die Augenführung (Erfahrungswissen, nicht belegt).

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt (stark):** Für diese Übung gibt es keine Daten. Dass man in der geübten Aufgabe besser wird, ist für
  Zeige- und Abfangaufgaben gut belegt und bei digitalem Sport-Sehtraining deutlich zu sehen, beruht aber zu einem großen
  Teil auf Gewöhnung an Gerät und Aufgabe: Bei der Reaktionszeit war der Effekt mit trainingsähnlichem Test gut fünfmal
  so groß wie mit unähnlichem (SMD 2,66 vs. 0,50; Guo et al., 2025). In einem kommerziellen Zielübungs-Programm
  verbesserte sich zwischen zwei Terminen nur eine von vier Aufgaben (Rogers et al., 2024) – eine
  Zuverlässigkeitsstudie mit zwei Messungen, keine Trainingsstudie.
- **Naher Transfer (schwach):** keine Studie zu dieser Übung. Meta-Analysen zu Actionspielen widersprechen sich (Bediou
  et al., 2018: g = 0,34 mit Publikationsbias; Sala et al., 2018: kleine bis keine Effekte).
- **Alltagstransfer (fehlend):** kein Beleg für bessere Spiel-, Sport- oder Verkehrsleistung; ein Ferntransfer
  allgemeiner Wahrnehmungs- und Kognitionstrainings auf Sport ist nicht belegt (Fransen, 2024; Simons et al., 2016).

## 9. Auswahlhinweise

- **Passt, wenn …** Blickfolge und Timing gegenüber einem gleichmäßig bewegten Ziel gemeinsam geübt werden sollen, jemand
  den Moment eines Durchgangs abschätzen möchte, Tempo motiviert; als Aufwärmen vor Blickfolge-Übungen.
- **Weniger passend, wenn …** ruhige Blickfolge ohne Handaufgabe gewünscht ist (404, 105), eine Reaktionszeit gefragt
  ist (101/Blitzreaktion), Impulskontrolle geübt werden soll (102/Stopp & Los), symbolische Wahlreaktion gemeint ist
  (202/Pfeil-Duell) oder Halten auf dem Ziel geübt werden soll (505, 514, 707).
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: Die Übung kommt ohne Blitze, Wackeln und rote Warneffekte
    aus; Treffer und Fehler erscheinen als Haken oder Kreuz mit Ring. Bei bekannter Lichtempfindlichkeit dennoch kurze
    Serien.
  - `nystagmus`: Kern ist die Folgebewegung; mit unwillkürlichen Augenbewegungen ist das Ziel schwer zu verfolgen.
  - `presbyopie_gleitsicht`: Bahn kann breiter sein als die Zwischenzone → kleines Fenster, Bildschirmbrille.
  - `gesichtsfeldausfall`: Die Bahnenden liegen seitlich der Mitte – auf der Ausfallseite wird das Ziel dort spät
    bemerkt.
  - `sehbehinderung_niedriger_visus`: Das Ziel ist groß; bei schneller Schwingung dennoch schwer zu fassen.
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: anhaltendes Verfolgen → Pausen, Sitzung begrenzen.
  - `tremor_parkinson`, `hand_arm_beschwerden`: kaum betroffen, da irgendwo getippt wird.
  - `kognitive_einschraenkung`, `aufmerksamkeitsprobleme`: zunehmende Anforderung – eher als Spiel auf niedriger Stufe,
    nicht als Test.
  - Doppelbilder, Lichtblitze, Kopfschmerz mit Sehverschlechterung, Schwindel oder Zittern sind Anlass zur ärztlichen
    Abklärung und kein Übungsthema (Muchnick, 2008, S. 6, 28). Bei Beschwerden während der Übung pausieren oder abbrechen.
- **Kombiniert gut mit …** 404/105 (ruhige Blickfolge ohne Tipp), 707 (Halten auf einem Pfad), 101 (Reaktion ohne
  Bewegung).
- **Überschneidungen:** **Ähnlich:** 305 (Abfangen eines Ziels, das zweidimensional abprallt) – nicht zusammen
  vorschlagen. Ruhende Ziele zeigen 302, 303, 307 und 308, bewegte 304, 305 und 306; pro Einheit höchstens eine davon,
  allenfalls eine zweite mit anderem Schwerpunkt. 306 fängt mehrere fallende Ziele ab (zusätzlich Reihenfolge wählen).
  505 und 512 zeigen eine ähnliche waagrechte Bewegung mit zufälliger Umkehr, 513 Zickzack-Bahnen; dort wird aber die
  Zeit mit dem Fadenkreuz auf dem Ziel gezählt (ohne Tipp, nur Maus) – Halten statt Abfangen. Mit 101 und 503 teilt 304 den
  Zeitdruck, dort aber mit ruhendem Reiz und echter Reaktionszeit; mit 202 keine Regelwahl.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Ehrlich benennen:** entweder „Abfangen“ (Tipp zählt) oder echtes Tracking (Zeit auf dem Ziel, nur mit Maus/Stift oder Finger-Ziehen); Regeltext und Zeitwerte an den Code angleichen.
- **Vorhersagbarkeit als Stufe:** zuerst gleichmäßiges Pendeln, dann zufällige Umkehr; Umkehrabstand nicht unter ≈ 400 ms (Hand-Anpassung ≈ 200 ms), Tempo bis ≈ 15–20°/s.
- **Tablet zuerst:** Querformat erzwingen, Bahn ≈ 20° breit (Gleitsicht), Trefferzone ≥ 9–10 mm, Ziel über der Hand; Vorhalt-Rückmeldung („zu früh/zu spät“) wie in `zielfang`.
- **Feste Rundendauer** (z. B. 45–60 s), adaptives Level in beide Richtungen nach Trefferquote statt an Combo-Punkte gekoppelt.
- **Kein roter Blitz, kein Wackeln:** dezente, farbunabhängige Rückmeldung (Symbol + Ton), WCAG 2.3.1 einhalten.
- **Messgrößen:** Trefferquote je Tempo und nach Umkehr, Klickversatz; keine „Reaktion“ aus Verfolgungszeiten, keine Noten wie „LEGENDARY“. DE/IT, „Übung“ statt „Test“.

## 11. Quellen

### Von der Website angegeben

- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI stimmt ✓ (Crossref, Abstract); **stützt die Aussage der Website:** teilweise (Netzwerk und Steuerung der Augen-Folgebewegung ja; die Übung misst Mausklicks, nicht Augen – die Seite sagt das selbst).
- Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 – **Prüfung:** DOI stimmt ✓, **Titel auf der Website ungenau** („pursuit“ statt „tracking“); nur Metadaten, Inhalt (Step-Ramp) über Sekundärliteratur; **stützt:** teilweise (Folgebewegung reagiert auf Geschwindigkeit, Sakkaden auf Position – für Augen, nicht für Klicks).
- Green, C. S., & Bavelier, D. (2003). Action video game modifies visual selective attention. *Nature, 423*(6939), 534–537. https://doi.org/10.1038/nature01647 – **Prüfung:** DOI stimmt ✓ (Abstract); **stützt:** nein (Aufmerksamkeitsaufgaben nach Actionspielen, kein Tracking; Transfer umstritten).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓ (Volltext); **stützt:** teilweise (Hardware verlängert Reaktionszeiten, gemessen aber nur an einem 60-Hz-Aufbau; zu bewegten Zielen und Bildraten nichts).

### Weitere Fachliteratur

Alle DOIs am 29.09.2026 per Crossref geprüft; Inhalte über PubMed-Abstracts bzw. die Literaturbasis W03/Dossier 02.

- Bargary, G., Bosten, J. M., Goodbourn, P. T., Lawrance-Owen, A. J., Hogg, R. E., & Mollon, J. D. (2017). Individual differences in human eye movements: An oculomotor signature? *Vision Research, 141*, 157–169. https://doi.org/10.1016/j.visres.2017.03.001 – Normwerte Folge-Gain und Aufholsakkaden.
- Barnes, G. R., Donnelly, S. F., & Eason, R. D. (1987). Predictive velocity estimation in the pursuit reflex response to pseudo-random and step displacement stimuli in man. *The Journal of Physiology, 389*, 111–136. https://doi.org/10.1113/jphysiol.1987.sp016649 – Gain-Einbruch bei unvorhersehbarer, schneller Bewegung.
- Brenner, E., & Smeets, J. B. J. (2009). Sources of variability in interceptive movements. *Experimental Brain Research, 195*(1), 117–133. https://doi.org/10.1007/s00221-009-1757-x – Timing-Präzision beim Abfangen.
- Brenner, E., Smeets, J. B. J., & de Lussanet, M. H. E. (1998). Hitting moving targets: Continuous control of the acceleration of the hand on the basis of the target's velocity. *Experimental Brain Research, 122*(4), 467–474. https://doi.org/10.1007/s002210050535 – Handanpassung an Tempowechsel (≈ 200 ms).
- Carl, J. R., & Gellman, R. S. (1987). Human smooth pursuit: Stimulus-dependent responses. *Journal of Neurophysiology, 57*(5), 1446–1463. https://doi.org/10.1152/jn.1987.57.5.1446 – Latenz der Folgebewegung (≈ 100 ms).
- Casiez, G., Pietrzak, T., Marchal, D., Poulmane, S., Falce, M., & Roussel, N. (2017). Characterizing latency in touch and button-equipped interactive systems. In *Proceedings of UIST '17* (S. 29–39). ACM. https://doi.org/10.1145/3126594.3126606 – Ende-zu-Ende-Latenz Maus/Touch.
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Gain < 0,95, sinkt mit Tempo.
- Danion, F. R., & Flanagan, J. R. (2018). Different gaze strategies during eye versus hand tracking of a moving target. *Scientific Reports, 8*, 10059. https://doi.org/10.1038/s41598-018-28434-6 – Blickstrategie beim Handtracking.
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – Auslöser von Aufholsakkaden.
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm.
- Huang, J., Tian, F., Fan, X., Zhang, X. (L.), & Zhai, S. (2018). Understanding the uncertainty in 1D unidirectional moving target selection. In *Proceedings of CHI 2018* (S. 1–12). ACM. https://doi.org/10.1145/3173574.3173811 – Klicks landen hinter bewegten Zielen.
- Jagacinski, R. J., Repperger, D. W., Ward, S. L., & Moran, M. S. (1980). A test of Fitts' law with moving targets. *Human Factors, 22*(2), 225–233. https://doi.org/10.1177/001872088002200211 – Fitts mit Geschwindigkeitsterm.
- Kowler, E., Rubinstein, J. F., Santos, E. M., & Wang, J. (2019). Predictive smooth pursuit eye movements. *Annual Review of Vision Science, 5*, 223–246. https://doi.org/10.1146/annurev-vision-091718-014901 – Vorhersage in der Folgebewegung.
- Liu, S., Claypool, M., Kuwahara, A., Sherman, J., & Scovell, J. J. (2021). Lower is better? The effects of local latencies on competitive first-person shooter game players. In *Proceedings of CHI 2021* (S. 1–12). ACM. https://doi.org/10.1145/3411764.3445245 – Latenz und Trefferquote im Shooter.
- Miall, R. C., Weir, D. J., & Stein, J. F. (1993). Intermittency in human manual tracking tasks. *Journal of Motor Behavior, 25*(1), 53–63. https://doi.org/10.1080/00222895.1993.9941639 – intermittierendes Nachführen.
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – Folge-Gain im Alter.
- Riviere, C. N., & Thakor, N. V. (1996). Effects of age and disability on tracking tasks with a computer mouse: Accuracy and linearity. *Journal of Rehabilitation Research and Development, 33*(1), 6–15. PMID 8868412 – Zeitschrift ohne DOI, PubMed-Abstract geprüft; Maus-Tracking bis ≈ 2 Hz.
- Ergänzend zitiert (Kurzangaben, Details in der Literaturbasis W03): Bediou et al. (2018), https://doi.org/10.1037/bul0000130 · Findlater et al. (2013), https://doi.org/10.1145/2470654.2470703 · Fransen (2024), https://doi.org/10.1007/s40279-024-02060-x · Guo et al. (2025), https://doi.org/10.3389/fphys.2025.1664572 · McAuley & Marsden (2000), https://doi.org/10.1093/brain/123.8.1545 · Parhi et al. (2006), https://doi.org/10.1145/1152215.1152260 · Patel et al. (1991), https://doi.org/10.1097/00006324-199111000-00010 · Pronk et al. (2020), https://doi.org/10.3758/s13428-019-01321-2 · Rogers et al. (2024), https://doi.org/10.3389/fspor.2024.1309991 · Sala et al. (2018), https://doi.org/10.1037/bul0000139 · Simons et al. (2016), https://doi.org/10.1177/1529100616661983.
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Prüfung der Augenfolgebewegung (H-Muster), Warnzeichen mit ärztlichem Abklärungsbedarf (Kap. 1, S. 6; Kap. 3, S. 28, 32–35)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Wiederholbarkeit von Messungen am Auge, Mehrfachmessung (S. 43–44)
