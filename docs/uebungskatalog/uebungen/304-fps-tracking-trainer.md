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
blickfit_umsetzung: null
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Ein roter Punkt taucht am linken oder rechten Rand auf und pendelt auf einer waagrechten Linie hin und her; in zufälligen Abständen kehrt er die Richtung um. Man verfolgt ihn mit Blick und Zeiger und muss ihn anklicken oder antippen, bevor er verschwindet. Gewertet wird nur der Treffer, nicht das Draufbleiben."
ziel_funktionen: [blickfolge, bewegungswahrnehmung, antizipation, auge_hand_koordination]
eingabe: [maus, touch, touchpad]
tablet_geeignet: mit_anpassung
dauer_sekunden: 45
schwierigkeit_anpassung: "Automatisch, nie rückläufig: Level = Punkte / 1.750 + 1 (stufenlos). Laut Code von Level 1 bis 15: Tempo 200 → 694 px/s, Abstand der Richtungswechsel 700–1.100 → 228–385 ms, Lebensdauer 1.300 → 380 ms, Radius 28 → 12 px, Trefferzugabe 14 → 5 px; darüber weiter steigend. Eine Serie (Combo-Faktor bis 3,0) verschärft zusätzlich: Tempo +40 %, Wechselabstand und Lebensdauer −30 bzw. −32 %, Radius −25 %. Rundendauer variabel: 45 s Startguthaben, +2 s je Treffer (max. 60 s), −1 s je Fehlklick/Ablauf."
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
    fixation: 1
    bewegungswahrnehmung: 3
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 1
    inhibition: 1
    geteilte_aufmerksamkeit: 1
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
    einfache_reaktion: 1
    auge_hand_koordination: 3
    zielbewegung_tempo: 2
    zielbewegung_praezision: 2
    kontinuierliche_steuerung: 2
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
voraussetzungen: ["Maus, Touchpad oder Touchscreen; Maus auf ruhiger Unterlage", "Ziele von ≈ 1,5° bis unter 0,5° Sehwinkel erkennen, die sich mit ≈ 5–26°/s bewegen", "passende Korrektion für den Bildschirmabstand über die ganze Bahnbreite (bis ≈ 37° im Vollbild am Monitor)", "kein Farbsehen nötig (ein einziges rotes Ziel mit weißem Kern auf Schwarz)", "Tablet quer halten (hochkant ist die Bahn sehr kurz)"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, nystagmus, presbyopie_gleitsicht, sehbehinderung_niedriger_visus, trockenes_auge_bildschirm, kopfschmerz_asthenopie, tremor_parkinson, hand_arm_beschwerden, kognitive_einschraenkung, aufmerksamkeitsprobleme]
geeignet_fuer: ["einem waagrecht bewegten Ziel mit Blick und Zeiger folgen und im richtigen Moment treffen", "Richtungswechsel erkennen und den Treffpunkt vorausschätzen (Vorhalt)", "spielerisches Aufwärmen für Jugendliche und Erwachsene mit Freude an Tempo und Punkten", "Einstieg vor echten Tracking-Übungen mit Haltezeit (505, 512, 514)"]
weniger_geeignet_fuer: ["Messung von Blickfolge oder Reaktionszeit (keine Blickmessung; 'Ø Reaktion' enthält die Verfolgungszeit)", "ruhiges Blickfolgetraining ohne Zeitdruck (dafür 404, 105)", "Lichtempfindliche: roter Fehlerblitz bei jedem Fehler und Ablauf (abschaltbar)", "Gleitsichtträger:innen im Vollbild am großen Monitor", "Ältere oder Einsteiger:innen ab etwa Level 8–10 (Umkehr alle < 0,6 s, Zeitfenster < 0,1 s)", "Tablet im Hochformat"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Die Übung selbst wurde nie untersucht; in ähnlichen Aim- und Abfangaufgaben wird man durch Übung deutlich besser (auch durch Gewöhnung an Gerät und Strategie), Effekte auf unähnliche Tests sind viel kleiner, ein Nutzen für E-Sport, Sport oder Alltag ist nicht belegt (Guo et al. 2025; Bediou et al. 2018 vs. Sala et al. 2018; Fransen 2024)."
aehnliche_uebungen: [305, 306, 512, 505, 513, 514, 104, 105, 410, 415, 707, 302, 503, 101]
stichworte: ["bewegtes Ziel", "Abfangen", "Interzeption", "Richtungswechsel", "glatte Blickfolge", "Aufholsakkaden", "Vorhalt", "Auge-Hand-Koordination", "Aim-Training", "Tracking (Name des Originals)", "Combo", "Latenz", "Touch"]
---

# 304 · Pendelndes Ziel abfangen – Klick auf ein bewegtes Ziel mit Richtungswechseln

> Original: „Aim-Training online“ (Untertitel „Tracking · Bewegliche Ziele verfolgen“) – skilldrills.online, Kapitel
> Reaktionsgeschwindigkeit (`reaction-speed`) · Blickfit: noch nicht umgesetzt (verwandt: `zielfang`)

## 1. Kurzbeschreibung

Auf einem fast schwarzen Feld erscheint ein roter Punkt mit weißem Kern am linken oder rechten Rand und läuft auf einer waagrechten Linie in Feldmitte los. In zufälligen, mit dem Level kürzer werdenden Abständen kehrt er um; an den Rändern prallt er ab. Man folgt ihm mit Blick und Zeiger und klickt bzw. tippt ihn an, bevor er nach einer festen Zeit verschwindet. Treffer bringen Punkte und Zeit, Fehlklicks und verpasste Punkte kosten Zeit und brechen die Serie. Trotz des Titels „Tracking“ zählt nur der Treffer – es ist eine Abfangaufgabe mit Blickfolge.

## 2. Ablauf im Original (Analyse)

Grundlage: Seitentext und ausgelieferter Spielcode (Chunk `70768-…js` mit den gemeinsamen Modulen für Schwierigkeit, Combo, Strafe und Zeichnen; geprüft am 29.09.2026, nur Mechanik übernommen). Winkel = **eigene Rechnung** (Monitor 24″ Full-HD in 60 cm ≈ 37,8 px/°; Tablet 11″ in 40 cm ≈ 36,4 CSS-px/°).

- **Ablauf:** Start → Countdown 3-2-1-GO (≈ 2,45 s, Töne) → Spiel → Ergebnis (Punkte, Genauigkeit, Ø Reaktion, höchstes Level, maximale Combo, Note). Escape oder Verlassen des Vollbilds bricht ab. Startlevel immer 1.
- **Spielfeld:** 16:9 in der Seite (Handy hochkant 3:4, Hinweis „ins Querformat drehen“) oder Vollbild, Grund #050508 mit feinem Raster. Die Bahn liegt auf halber Höhe zwischen zwei schwach roten Randmarken bei 12 % und 88 % der Breite → **76 % der Breite**: im Vollbild am Monitor ≈ 37°, eingebettet (≈ 1.100 px) ≈ 22°, am Tablet quer ≈ 24°.
- **Ziel:** ein einziges rotes Ziel (#ef4444, Leuchtrand, weißer Kern), Start am linken oder rechten Rand mit Bewegung zur Mitte. Das **Tempo ist je Ziel konstant**; es ändert sich nur das Vorzeichen (Umkehr nach Zufallsintervall zwischen Minimum und Maximum, zusätzlich Abprall an den Randmarken). Bewegung mit Bildzeit (dt, höchstens 0,1 s pro Bild) → bildfrequenzunabhängig; nur Partikel und Wackel-Abklingen laufen pro Bild (optisch).
- **Treffer:** Pointer-Down innerhalb von Radius + unsichtbarer Trefferzugabe um die *aktuelle* Zielposition. Bei Touch, Fenster < 768 px oder Mobilgerät: Radius +2 px, Zugabe +10 px, **kein Fadenkreuz** (am Desktop folgt ein weißes Fadenkreuz dem Zeiger). Keine Tastatur. Nach Treffer oder Ablauf neues Ziel nach 140–260 ms; ein Fehlklick lässt das Ziel weiterlaufen.
- **Schwierigkeit:** p = (Level − 1)/14, exponentieller Abfall wie in 302 (Literaturbasis W03), über Level 15 hinaus weiter. Level stufenlos = Punkte/1.750 + 1, sinkt nie.

| Level | Ø Ziel (Monitor) | Trefferzone Ø | Tempo | Umkehr alle | Lebensdauer | Zeitfenster bei ruhendem Zeiger* |
|---|---|---|---|---|---|---|
| 1 | 56 px ≈ 1,5° | 84 px ≈ 2,2° | 200 px/s ≈ 5,3°/s | 700–1.100 ms | 1.300 ms | ≈ 420 ms |
| 5 | 48 px ≈ 1,3° | 72 px | 332 px/s ≈ 8,8°/s | 574–910 ms | 1.055 ms | ≈ 215 ms |
| 10 | 35 px ≈ 0,9° | 50 px ≈ 1,3° | 532 px/s ≈ 14°/s | 384–620 ms | 682 ms | ≈ 95 ms |
| 15 | 24 px ≈ 0,6° | 34 px ≈ 0,9° | 694 px/s ≈ 18°/s | 228–385 ms | 380 ms | ≈ 49 ms |
| 15 + Combo 3,0 | 18 px ≈ 0,5° | 26 px ≈ 0,7° | 972 px/s ≈ 26°/s | 160–270 ms | 258 ms | ≈ 27 ms |

\* *Eigene Rechnung:* Zeit, in der ein ruhender Zeiger in der Trefferzone liegt (Zonenbreite / Tempo).

- **Combo und Punkte:** Faktor 1,1/1,25/1,35/1,5/1,75/2/2,5/3,0 ab 3/5/7/10/15/20/30/50 Treffern in Folge; Punkte = 100 × Faktor × (1 + 0,5 p). Fehler/Ablauf: Combo 0, Bildwackeln (6 px), Ton, **roter Fehlerblitz** (abschaltbar, gleiches Modul wie 302).
- **Zeit:** Start 45 s, **+2 s je Treffer** (max. 60 s), **−1 s je Fehlklick und Ablauf**. Solange man ein Ziel in < ≈ 1,8 s trifft, wächst das Guthaben; die Runde endet erst, wenn Treffer ausbleiben. *Grobe Modellrechnung* (feste Trefferzeit 0,4–0,8 s, Trefferwahrscheinlichkeit 60–95 %): Rundendauer ≈ 100–250 s, Endlevel ≈ 8–14.
- **Note:** 100 × √(Punkte/18.000) → z. B. „S+ LEGENDARY“ ab 16.245 Punkten; Teilen-Karte „ELITE REFLEX“.

**Widersprüche Regeltext ↔ Code:** (1) „Du hältst das Fadenkreuz auf dem Ziel … bewertet wird kontinuierliche Kontrolle“ – gewertet wird **nur der Klick**, eine Haltezeit wird nicht erfasst. (2) „+0,6 s“ je Treffer – Code +2 s. (3) „Ohne Zeitstrafe“ bzw. „−0,8 s“ – Code zieht **immer** 1 s ab (Strafabfrage auf „an“ erzwungen). (4) Referenzspalte „Zielkontrolle 55–90 %“ – diese Größe berechnet das Spiel nicht. (5) „Ziel beschleunigt“ – innerhalb eines Ziels konstantes Tempo, schneller wird es nur von Ziel zu Ziel. (6) Festdauer 45 s – tatsächlich variabel (s. o.).

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite richtet sich an FPS- und Battle-Royale-Spieler:innen, verspricht „saubere Cursorführung“ und Erholung nach Richtungswechseln, verweist auf die Blickfolge-Forschung (Rashbass, Krauzlis) und nennt Einflussfaktoren (Bildrate, Maus, Sensitivität, Müdigkeit). Sie betont, der Score sei „kein klinischer Test“, der Drill verbessere das Spiel-Aim „nicht automatisch“, und empfiehlt 5–15-min-Blöcke sowie Abbruch bei Schwindel, Doppelbildern oder Kopfschmerz. Das ist zurückhaltend und im Kern korrekt. Einordnung:

- **Blickfolge-Bezug teilweise richtig:** Glatte Folgebewegung wird durch Geschwindigkeitsfehler gesteuert, Positionsfehler durch Aufholsakkaden korrigiert (Rashbass, 1961; de Brouwer et al., 2002). Die Übung misst aber keine Augen, sondern Klicks – das sagt die Seite selbst.
- **„Tracking“ ist hier eine Abfangaufgabe:** Am Desktop kann man mit dem Zeiger mitführen und im Überlappen klicken; am Tablet ohne Fadenkreuz bleibt nur Vorausschätzen und Tippen. Ab etwa Level 10 kommt die Hand den Umkehrungen ohnehin nicht mehr nach (Abschnitte 4 und 6).
- **Referenztabelle ohne Datengrundlage:** Die Stufen („Basis“ bis „Nur Referenz 90 %+ / 98 %+“) sind als „weder Perzentile noch Rang-Garantie“ gekennzeichnet – korrekt, aber die Spalte „Zielkontrolle“ wird gar nicht gemessen. Die Note „LEGENDARY“/„ELITE REFLEX“ beruht nur auf Punkten.
- **Green & Bavelier (2003)** untersuchten Aufmerksamkeit nach Actionspielen, nicht Tracking; die Übertragbarkeit ist umstritten (Bediou et al., 2018 vs. Sala et al., 2018).
- **Tipp „aufs Ziel, nicht auf den Cursor schauen“** ist plausibel: Beim Handtracking bleibt der Blick nahe am Ziel, der Folge-Gain steigt und Aufholsakkaden werden seltener (Danion & Flanagan, 2018).

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel und Kontrast:** Ziel Ø 1,5° (Level 1) bis ≈ 0,5° (hohe Combo), Minimum 12 px ≈ 0,3°; rot auf Schwarz, hoher Kontrast. Begrenzend ist nicht das Detail, sondern Bewegung und Timing. Bei Protanopie wirkt Rot dunkler; der weiße Kern bleibt sichtbar (eigene Einschätzung).
- **Tempo:** ≈ 5°/s (Level 1) bis ≈ 26°/s (Level 15 mit Combo). Der Gain (Augen- ÷ Zielgeschwindigkeit) liegt beim Gesunden unter 0,95 und sinkt mit dem Tempo (Collewijn & Tamminga, 1984); Normwert in 1.058 jungen Erwachsenen 0,80 (Spanne 0,31–1,08) mit 0,64 Aufholsakkaden/s (Bargary et al., 2017).
- **Richtungsumkehr:** Die Folgebewegung startet erst ≈ 100 ms nach einer Bewegungsänderung (Carl & Gellman, 1987). *Eigene Übertragung auf die Umkehr:* Läuft das Auge 100 ms in die alte Richtung weiter, entsteht ein Abstand von 2 × Tempo × 0,1 s – Level 1 ≈ 1,1°, Level 15 ≈ 3,7°, mit Combo ≈ 5°, also weit mehr als die Trefferzone. Eine Aufholsakkade folgt, wenn der Fehler nicht binnen 40–180 ms „von selbst“ schrumpft (de Brouwer et al., 2002).
- **Vorhersagbarkeit:** Die Umkehrungen kommen zufällig, entsprechend ≈ 0,5–0,7 Hz (Level 1) bis ≈ 1,3–2,2 Hz (Level 15) bzw. bis ≈ 3 Hz mit Combo (*eigene Rechnung*, halbe Periode = Umkehrabstand). Bei pseudozufälliger Bewegung fiel der Gain von 0,92 auf 0,53, wenn die schnellste Komponente von 0,39 auf 1,56 Hz stieg (Barnes et al., 1987). Vorhersage hilft nur bei erwartbarer Bewegung (Kowler et al., 2019) – hier nur an den Randmarken.
- **Gleitsicht/Alterssichtigkeit:** Die Bahn liegt günstig auf Augenhöhe, ist aber im Vollbild (≈ 37°) oder eingebettet (≈ 22°) breiter als die klare Zwischenzone von Gleitsichtgläsern (≈ 13–18°; Han et al., 2003) → Unschärfe am Bahnende oder Kopfbewegung. Besser Bildschirmbrille, kleines Fenster, Blick geradeaus auf Bahnhöhe. Der Gain sinkt im Alter bei allen Tempi, umso mehr bei schnellen Zielen (Moschner & Baloh, 1994).
- **Bildschirm/Latenz:** Ende-zu-Ende Maus → Bild 36,6 ms bei 60 Hz, 21,1 ms bei 120 Hz; Tippen am Tablet 48–276 ms je nach Gerät (Casiez et al., 2017). *Eigene Rechnung:* Bei 694 px/s wandert das Ziel in 36,6 ms ≈ 25 px – mehr als der Trefferradius (17 px). Man muss also um die Gerätelatenz vorhalten, und das Maß ändert sich mit dem Gerät.
- **Trockenes Auge:** Die Blinzelrate sinkt am Bildschirm im Mittel auf ≈ ein Fünftel (Patel et al., 1991); anhaltendes Verfolgen ohne Pause verstärkt das eher.

## 5. Neurowissenschaftliche Grundlagen

Zu dieser Aufgabe gibt es keine Bildgebungs- oder Trainingsstudie. Die Folgebewegung wird von einem Netzwerk aus frontalem Augenfeld, Kleinhirn, Basalganglien und Colliculus superior gesteuert, das dem Sakkadensystem ähnelt (Krauzlis, 2004); vorhersagende Anteile hängen mit frontaler Aktivität und Bewegungsarealen der Sehrinde zusammen (Kowler et al., 2019). Beim Mitführen mit der Hand ändert sich die Blickstrategie: Der Blick bleibt gleich nahe am Ziel, aber glatter (Danion & Flanagan, 2018). Die Handsteuerung passt Richtung und Beschleunigung laufend an die Zielbewegung an, mit ≈ 110 bzw. ≈ 200 ms Verzögerung (Brenner et al., 1998). „Trainiert Region X“ lässt sich daraus nicht ableiten; die Website behauptet das auch nicht.

## 6. Motorische Grundlagen

- **Manuelles Nachführen ist intermittierend:** Korrekturen erfolgen stoßweise (Signalleistung 0,5–1,8 Hz), mit einer Fehler-Totzone von ≈ 0,8° und ≈ 170 ms Mindestabstand zwischen Korrekturen (Miall et al., 1993). Die Genauigkeit beim Maus-Tracking reicht bis ≈ 2 Hz und sinkt mit hohem Alter und motorischer Einschränkung (Riviere & Thakor, 1996).
- **Folge für die Übung (eigene Ableitung):** Bei Umkehrabständen von 230–385 ms (Level 15) bzw. 160–270 ms (Combo) kann die Hand kaum jede Umkehr beantworten, bevor die nächste kommt (Beschleunigungsanpassung ≈ 200 ms; Brenner et al., 1998). Erfolgreich ist dann eher „Mitte der Pendelbewegung halten und im richtigen Moment klicken“ – also Abfangen statt Tracking.
- **Timing-Präzision:** Beim Treffen bewegter Ziele streut der Zeitpunkt um ≈ 20 ms, der Ort um ≈ 5 mm (Brenner & Smeets, 2009). Zeitfenster von 27–49 ms in hohen Levels (Tabelle) liegen damit an der Grenze des Möglichen. Klicks auf bewegte Ziele landen systematisch hinter dem Ziel, umso mehr, je schneller es ist (Huang et al., 2018); für bewegte Ziele passt Fitts' Gesetz nur mit Geschwindigkeitsterm (Jagacinski et al., 1980).
- **Touch vs. Maus:** Touch verkürzt die Bewegungszeit bei Älteren um 35 %, bei Jüngeren um 16 % (Findlater et al., 2013). Dank Zugabe bleibt die Trefferzone am Tablet bis Level 15 über der Empfehlung von 9,2 mm (Parhi et al., 2006): *eigene Rechnung* ≈ 11 mm, mit Combo ≈ 9,6 mm, ab Level 20 mit Combo ≈ 8,8 mm; sichtbar sind dann nur ≈ 3–5 mm. Ohne Fadenkreuz und mit verdeckender Hand ist Touch reines Vorhersagen.
- **Tremor:** physiologisch ≈ 8–12 Hz, Parkinson 3–6 Hz (McAuley & Marsden, 2000); kleine, schnelle Ziele belasten zitternde oder schmerzende Hände.

## 7. Einflussfaktoren und Messgrenzen

- **Gerät:** Anzeige- und Eingabelatenz bestimmen den nötigen Vorhalt (Abschnitt 4); im Shooter brachten 10 ms weniger Latenz messbar mehr Treffer (+0,8 % Trefferquote; Liu et al., 2021). Browser-Messungen enthalten 58–133 ms Geräteanteil (Pronk et al., 2020). Monitor, Tablet und Fenstergröße ändern zudem Sehwinkel und Bahnbreite. **Nur Selbstvergleich am selben Gerät** ist sinnvoll.
- **Rückkopplung:** Combo erhöht Punkte (bis × 3) und damit Level und Schwierigkeit; das Level sinkt nie, und Treffer verlängern die Runde. Punkte, Endlevel und Dauer hängen deshalb eng zusammen.
- **Messgrößen:** „Ø Reaktion“ enthält die Verfolgungszeit und nur Treffer; sie „verbessert“ sich allein, weil die Lebensdauer mit dem Level sinkt (Auswahleffekt, eigene Analyse). Aim-Trainer-Kennzahlen können sehr zuverlässig sein (ICC 0,947–0,995), zeigen aber Lerneffekte zwischen Terminen (Rogers et al., 2024).
- **Zustand und Alter:** Im Alter ist der Folge-Gain bei allen Tempi niedriger (Moschner & Baloh, 1994); Müdigkeit dürfte zusätzlich schaden (plausibel, hier nicht eigens belegt). Der Zeitdruck steigert sich selbst.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt (stark):** Abfang- und Aim-Aufgaben werden durch Wiederholung besser; ein großer Teil ist Gewöhnung an Gerät und Aufgabe – bei trainingsähnlichen Tests war der Effekt digitalen Sport-Sehtrainings gut fünfmal so groß wie bei unähnlichen (SMD 2,66 vs. 0,50; Guo et al., 2025).
- **Naher Transfer (schwach):** keine Studie zu dieser Übung. Meta-Analysen zu Actionspielen widersprechen sich (Bediou et al., 2018: g = 0,34 mit Publikationsbias; Sala et al., 2018: kleine bis keine Effekte).
- **Alltagstransfer (fehlend):** kein Beleg für bessere Spiel-, Sport- oder Verkehrsleistung; Ferntransfer allgemeiner Wahrnehmungs-/Kognitionstrainings auf Sport ist nicht belegt (Fransen, 2024; Simons et al., 2016).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** Blickfolge und Treffen eines bewegten Ziels gemeinsam geübt werden sollen, jemand Richtungswechsel und Vorhalt spielerisch üben möchte, Tempo und Punkte motivieren; als Aufwärmen vor Tracking-Übungen.
- **Weniger passend, wenn …** ruhige Blickfolge ohne Handaufgabe gewünscht ist (404, 105), eine Reaktionszeit gefragt ist (101/Blitzreaktion), Impulskontrolle geübt werden soll (102/Stopp & Los), symbolische Wahlreaktion gemeint ist (202/Pfeil-Duell) oder echtes Halten auf dem Ziel geübt werden soll (505, 514, 707).
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: roter Fehlerblitz bei jedem Fehlklick und Ablauf (wie 302: unter der allgemeinen WCAG-Blitzschwelle, aber gesättigtes Rot; Häufigkeit bei hohen Levels nicht gemessen) plus Bildwackeln → Blitz abschalten.
  - `nystagmus`: Kern ist die Folgebewegung; mit unwillkürlichen Augenbewegungen sind Umkehrungen schwer zu verfolgen.
  - `presbyopie_gleitsicht`: Bahn breiter als die Zwischenzone → kleines Fenster, Bildschirmbrille.
  - `sehbehinderung_niedriger_visus`: Ziele bis < 0,5°, schnell bewegt.
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: anhaltendes Verfolgen, variable Rundendauer bis mehrere Minuten → Pausen, Runde begrenzen.
  - `tremor_parkinson`, `hand_arm_beschwerden`: kleine schnelle Ziele, Maus-Tracking über 2 Hz nicht mehr genau.
  - `kognitive_einschraenkung`, `aufmerksamkeitsprobleme`: sich selbst verschärfender Zeitdruck, Fehlerrückmeldung mit Blitz, Ton und Wackeln – eher als Spiel auf niedriger Stufe, nicht als Test.
- **Kombiniert gut mit …** 404/105 (ruhige Blickfolge ohne Klick), 305 (gleiches Prinzip, zweidimensional), 707 (Halten auf einem Pfad), 101 (Reaktion ohne Bewegung).
- **Überschneidungen:** 305 und 306 nutzen denselben Baukasten (Lebensdauer, Combo, 1.750 Punkte/Level) mit anderer Bahn; 512 (Richtungswechsel alle 450 → 150 ms) und 513 sind im FPS-Kapitel fast gleich gebaut – nicht mehrere davon hintereinander vorschlagen. Mit 101 und 503 teilt 304 den Zeitdruck, dort aber mit ruhendem Reiz und echter Reaktionszeit; mit 102 nur die Fehlerstrafe; mit 202 keine Regelwahl.

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
