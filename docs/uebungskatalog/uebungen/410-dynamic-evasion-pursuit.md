---
# ===== Kennung =====
nr: 410
kennung: dynamic-evasion-pursuit
name: "Ausweichziel verfolgen – reaktive Blickfolge bei plötzlichen Richtungswechseln"
name_original: "Reaktives Augentraining – Dynamische Ausweichziel-Verfolgung (Seitentitel: Dynamisches Sehen | Reaktive Blickverfolgung)"
kapitel: "Blickverfolgung"
kapitel_original: "visual-tracking"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/visual-tracking/dynamic-evasion-pursuit"
blickfit_umsetzung: null
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Ein leuchtender Punkt fliegt auf dunklem Grund geradlinig über den Bildschirm und schlägt bei Standardtempo etwa zweimal pro Sekunde unangekündigt einen Haken in eine zufällige neue Richtung. Man folgt ihm nur mit den Augen bei ruhigem Kopf; es gibt keine Eingabe, keine Punkte und keine Leistungsmessung."
ziel_funktionen: [blickfolge, sakkaden]
eingabe: [maus, touch]
tablet_geeignet: mit_anpassung
dauer_sekunden: 60
schwierigkeit_anpassung: "Kein Levelsystem, nur manuelle Einstellungen: Tempo 0,5–9× (Regler, Schritt 0,1), Zielgröße 10–50 px Radius, Dauer 30/45/60/90/120 s, 'Random Speed', 'Hide Line'. Das Tempo wirkt laut Code quadratisch auf die Geschwindigkeit (1× ≈ 8–17°/s, 2× ≈ 33–66°/s, 3× ≈ 74–149°/s am 24-Zoll-Monitor in 60 cm) und verkürzt zugleich den Takt der Haken (500 ms / Tempo)."
messgroessen: ["Original: keine Leistungsmessung, nur Sitzungszähler", "sinnvoll mit Eyetracker: Aufholsakkaden je Richtungswechsel, Folge-Gain, Latenz der Richtungsanpassung", "sinnvoll ohne Eyetracker: Erkennungsaufgabe kurz nach dem Haken (z. B. Landolt-Ring), Anteil richtig je Tempo in °/s"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 0
    blickfolge: 3
    sakkaden: 3
    fixation: 0
    bewegungswahrnehmung: 2
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 1
    inhibition: 1
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 1
    antizipation: 1
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
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["30–120 s ohne Unterbrechung auf den Bildschirm schauen können", "ruhige Sitzposition: Monitor 50–70 cm, Tablet auf Ständer ca. 40 cm", "passende Korrektion für den Bildschirmabstand (bei Alterssichtigkeit Zwischen- bzw. Nahkorrektur)", "kein Farbsehen nötig (Zielfarbe frei wählbar)", "keine Hand-Eingabe während der Übung (nur Start per Klick/Tipp)"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, nystagmus, schwindel_vestibulaer, gesichtsfeldausfall, presbyopie_gleitsicht, trockenes_auge_bildschirm, kopfschmerz_asthenopie]
geeignet_fuer: ["glatte Blickfolge mit plötzlichen Richtungswechseln und kleinen Aufholsakkaden üben (sinnvoll bei Tempo 0,5–1,5×, ca. 2–37°/s)", "nächste Stufe nach vorhersagbaren Bahnen (403, 404, 405), vor der vollständig unregelmäßigen Bahn (415)", "rein visuelles Aufwärmen der Augenfolge vor Aim- oder Tracking-Übungen", "Personen, die für eine Übung keine Hand einsetzen können oder wollen"]
weniger_geeignet_fuer: ["wer Rückmeldung, Punkte oder einen Fortschrittswert erwartet (das Original misst nichts)", "Übungsziel Auge-Hand-Koordination oder manuelles Nachführen (dafür 104, 105, 505, 513)", "Gleitsichtträger:innen im Vollbild bei streng ruhigem Kopf (seitliche Unschärfezonen)", "Einsteiger:innen und ältere Menschen bei Tempo ab 2× (33–66°/s, Haken alle 250 ms) oder höher", "Kinder, die ohne Punkte und Rückmeldung schnell die Motivation verlieren"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Die Übung selbst wurde nie untersucht; eine kleine Laborstudie (Eibenberger et al. 2012, je N = 10) fand nach 2 × 6 min Folgen eines quasi-zufällig bewegten Ziels an 3 Tagen eine noch nach 5 Tagen messbare Verbesserung der Folgebewegung in einem anderen Testparadigma; ein Nutzen für Sport, E-Sport oder Alltag ist nicht belegt."
aehnliche_uebungen: [415, 411, 414, 405, 404, 403, 105, 513, 512, 303]
stichworte: ["smooth pursuit", "Aufholsakkaden", "catch-up saccades", "Richtungswechsel", "reaktive Blickfolge", "unvorhersagbare Bewegung", "Step-Ramp", "Blickverfolgung", "rein visuell", "ohne Eingabe"]
---

# 410 · Ausweichziel verfolgen – reaktive Blickfolge bei plötzlichen Richtungswechseln

> Original: „Reaktives Augentraining – Dynamische Ausweichziel-Verfolgung“ (Seitentitel „Dynamisches Sehen | Reaktive Blickverfolgung“) – skilldrills.online, Kapitel Blickverfolgung (`visual-tracking`) · Blickfit: noch nicht umgesetzt (verwandt: `scharf-in-bewegung`, `zielfang`). Nr. 415 trägt denselben Seitentitel, ist aber eine andere Übung (415 = ständiges Zufallsdriften, 410 = gerade Strecken mit harten Haken).

## 1. Kurzbeschreibung

Auf fast schwarzem Grund fliegt ein roter, leuchtender Punkt (Standard ≈ 0,7–0,9°) geradlinig und prallt an den Rändern ab. Bei Standardtempo schlägt er etwa alle 0,5 s einen Haken in eine zufällige neue Richtung, oft fast zurück. Man folgt ihm nur mit den Augen bei ruhigem Kopf: auf der Geraden gleichmäßig mitgehen, nach dem Haken mit einem kleinen Blicksprung wieder aufs Ziel kommen. Das Original misst nichts und gibt keine Rückmeldung.

## 2. Ablauf im Original (Analyse)

Grundlage: Seitentext und Spielcode (seitenspezifischer Chunk `9826-…js` plus gemeinsame Module, geprüft 29.09.2026; nur Mechanik übernommen). Winkelangaben sind **eigene Umrechnungen** für 24-Zoll-Full-HD in 60 cm (≈ 38 px/°) bzw. 11-Zoll-Tablet in 40 cm (≈ 36 CSS-px/°).

- **Ablauf (Code):** Einstellungen → Start → echtes Vollbild → Countdown 3-2-1-GO (≈ 2,45 s, mit Tönen) → Übung mit Restzeit → Endbildschirm „Smooth Pursuit Calibrated“ (kalibriert wird nichts). Escape, Vollbild-Ende oder Tab-Wechsel brechen ab; kein sichtbarer Stopp-Knopf. Gespeichert wird nur ein Sitzungszähler im Browser.
- **Darstellung (Code):** Hintergrund #050508, schwaches 40-px-Raster („Day Mode“: weiß). Radius *r* = „Size“ (Standard 16 px, 10–50 px): Scheibe Ø ≈ 26 px (0,7°), Ring Ø 32 px, Außenring Ø ≈ 42 px (1,1°), weißer Kern ≈ 9′, Leuchtschein („Neon Glow“, Standard an). Farben Rot (Standard), Grün, Blau, Orange, Gelb, Weiß. Eine blasse Linie zeigt standardmäßig in die **aktuelle** Bewegungsrichtung; sie dreht im selben Bild wie das Ziel (keine Vorwarnung, aber sofortiger Richtungshinweis). „Hide Line“ blendet nur sie aus. „Gaze Trail“ = Spur der letzten 15 Bilder.
- **Bewegung (Code):** Ein Zeitzähler läuft mit Echtzeit × Tempo. Überschreitet er 500, erhält das Ziel eine gleichverteilt zufällige Richtung (0–360°) und einen zufälligen Betrag (Spanne 1 : 2). Der Richtungssprung liegt damit gleichverteilt zwischen 0° und 180° (Mittel 90°, eigene Ableitung). Beim Randabprall wird die senkrecht zur Wand stehende Geschwindigkeitskomponente umgekehrt und um 5 % erhöht.
- **Tempo wirkt doppelt (Code):** Der Faktor steckt im Betrag **und** im Zeitschritt → Geschwindigkeit 312–625 px/s × Tempo², Takt 500 ms ÷ Tempo. +30 % am Regler = +69 % Geschwindigkeit.
- **„Random Speed“ (Code):** Tempo wird mit einer festen Mehrfach-Sinusfunktion der Uhrzeit auf das 0,4- bis 1,9-Fache moduliert (Median ≈ 1,15), die Geschwindigkeit damit auf das ≈ 0,16- bis 3,6-Fache; die Haken-Schwelle wird in jedem Bild neu zwischen 350 und 650 gewürfelt (Haken meist etwas früher). Im Mittel also schneller, keine „ruckartige Beschleunigung“.

| Tempo | Haken alle | ≈ °/s (Monitor 60 cm) | Strecke je Haken | Sprung je Bild (60 Hz) |
|---|---|---|---|---|
| 0,5× | 1 000 ms | 2–4 | 2–4° | < 0,1° |
| 1× (Standard) | 500 ms | 8–17 | 4–8° | 0,1–0,3° |
| 1,5× | 333 ms | 19–37 | 6–12° | 0,3–0,6° |
| 2× | 250 ms | 33–66 | 8–17° | 0,6–1,1° |
| 3× | 167 ms | 74–149 | 12–25° | 1,2–2,5° |
| 9× (Reglermaximum) | 56 ms | 670–1 340 | nur Randabpraller | 11–22° |

- **Bildfrequenz (Code):** Bewegung zeitbasiert (Schritt ≤ 100 ms). Bilder, die < 13 ms nach dem letzten kommen, werden verworfen → höchstens ≈ 77 Aktualisierungen/s; eigene Rechnung: 60 Hz → 60, 90 Hz → 45, 144 Hz → 72, 165 Hz → 55, 240 Hz → 60. 90- und 165-Hz-Geräte laufen also ruckeliger als 60 Hz.
- **Eingabe (Code):** keine Auswertung; Maus/Finger zeichnen nur ein Fadenkreuz. Keine Punkte, Level oder Fehler.
- **Widersprüche Regeltext ↔ Code:** „Geschwindigkeit 0,5× bis 2,0×“ – Regler bis 9×; „unregelmäßige Abstände“ – Takt fest (nur die Richtung ist zufällig); „Pure Visual“ – Fadenkreuz lädt zum Mitführen ein; „Blickkonstanz analysieren“ – keine Daten; 144/240-Hz-Empfehlung – der Code selbst begrenzt auf ≈ 77 Bilder/s.

## 3. Was die Website sagt – und wie das einzuordnen ist

**Website:** Die Übung trainiere den Wechsel aus Folgebewegung und Korrektursakkade. Nach einem Haken übersteige das Ziel die „Arbeitsgrenze der Folgebewegung (ca. 30°/s)“, Sehrinde/Colliculus superior/FEF lösten nach 150–200 ms eine Sakkade aus; die Wiederaufnahme „definiere die dynamische Sehkraft“. Das Training „konditioniere Augenmuskeln und frontale Augenfelder“, helfe in FPS-Spielen und im Ballsport; der Kopf müsse fixiert sein (sonst VOR); 144/240-Hz-Monitore brächten ≈ 10 ms frühere Sakkaden. Empfehlung 5–8 × 60 s mit 30 s Pause. Eine Tabelle mit fünf „Leistungsstufen“ ordnet das **gewählte Tempo** Profilen zu („Spitzenreaktion“ ab 2×, „normativer Bereich gesunder Erwachsener“ 1,0–1,3×, „Neuzentrierung in 1–2 Einzelbildern“).

**Einordnung:**

- **Kern richtig:** Folgebewegung und Aufholsakkaden arbeiten zusammen und teilen Positions- und Geschwindigkeitsinformation (Orban de Xivry & Lefèvre, 2007). Nach einem abrupten, unvorhersagbaren Richtungswechsel sinkt die Folgegeschwindigkeit nach ≈ 90 ms, die Richtung ändert sich ab ≈ 130 ms (Soechting et al., 2005).
- **Falsch erklärt:** Ein Haken erhöht die Geschwindigkeit nicht; das Auge läuft 90–130 ms in die alte Richtung weiter. Eine feste 30°/s-Grenze gibt es nicht: Der Gain sinkt mit dem Tempo (Collewijn & Tamminga, 1984), 4 von 5 Versuchspersonen erreichten ≈ 90 % Gain bis ≈ 100°/s, eine nur ≈ 60 % davon (Meyer et al., 1985); bei Krauzlis (2004) steht die Zahl nicht.
- **Latenz zu hoch:** Aufholsakkaden während der Folgebewegung kommen nach ≈ 125 ms (de Brouwer et al., 2002a).
- **„Konditioniert die Augenmuskeln“ – eher widerlegt:** Auge und viel trägere Hand reagieren auf Richtungswechsel fast gleich schnell; begrenzend ist die neuronale Verarbeitung (Engel et al., 2000). Eine „Stärkung“ des FEF ist nicht gezeigt.
- **Kopf fixieren wegen VOR:** Natürliche Kopf-Augen-Folgebewegung ist genauso genau (Lanman et al., 1978, Affen); zwei Weltklasse-Cricketspieler koppelten den Kopf an den Ball (Mann et al., 2013, N = 2). Ein ruhiger Kopf ist nur sinnvoll, wenn gezielt die **Augen**folge geübt werden soll – „zerstört den Trainingseffekt“ ist unbelegt.
- **144/240 Hz:** Das Bildraster verzögert einen Haken bei 60 Hz im Mittel ≈ 8 ms, bei 144 Hz ohne Sperre ≈ 3,5 ms; weil das Original wegen der 13-ms-Sperre an 144-Hz-Geräten nur 72 Bilder/s zeichnet, sind es dort tatsächlich ≈ 7 ms (eigene Abschätzung: Unterschied zu 60 Hz ≈ 1 ms, nicht 10 ms). Latenz zählt mehr als Bildfrequenz über 60 Hz (Spjut et al., 2019); Woods et al. (2015) behandeln Reaktionszeit, nicht Monitore.
- **Leistungsstufen ohne Datengrundlage:** Die Seite misst nichts; wer 2× einstellt, ist „Profi“. „1–2 Einzelbilder“ (17–33 ms) ist physiologisch unmöglich (Folgebewegungs-Anlauf ≈ 100 ms, Carl & Gellman, 1987); „< 150 ms“ ist typisch, nicht Spitze; Normwerte für 1,0–1,3× existieren nicht.
- **Transfer E-Sport/Ballsport:** Yang et al. (2025) ist ein Querschnitt ohne Training; Übersichten finden für Augen-Übungen nur gemischte Belege (Appelbaum & Erickson, 2018) und keinen Ferntransfer (Fransen, 2024). „Dynamische Sehschärfe“ meint Detailerkennen an bewegten Objekten – das prüft die Übung nicht.
- **5–8 × 60 s:** ohne Quelle, aber vernünftig kurz (Ermüdung verschlechtert die Folge, Bahill et al., 1980).

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Ziel ≈ 0,7–0,85° (Monitor 60 cm), ≈ 0,9° (Tablet 40 cm), Kern ≈ 9′ – weit über der Auflösungsgrenze, Sehschärfe nicht leistungsbegrenzend.
- **Reaktionskette je Haken:** Anlauf der Folgebewegung ≈ 100 ms (Carl & Gellman, 1987), Richtungsänderung ≈ 130 ms (Soechting et al., 2005), Aufholsakkade ≈ 125 ms nach Auftreten des Fehlers, sie rechnet die Zielbewegung mit ein (de Brouwer et al., 2002a, 2002b). Glatter Gain stets < 0,95 (Collewijn & Tamminga, 1984).
- **Folgerung für das Tempo (eigene Ableitung):** Bei 1× läuft das Auge nach einem 90°-Haken ≈ 1,5–3° vorbei, danach bleiben ≈ 300 ms ruhige Folge. Bei 2× entstehen 6–12° Fehler, die Zeit bis zum nächsten Haken reicht kaum. Ab 3× ist jede Strecke kürzer als die Reaktionskette und schneller als die Folgegrenze: nur noch Hinterherspringen. Sinnvoll: **≈ 0,5–1,5×**.
- **Bewegungsunschärfe:** Jedes Bild steht eine Bilddauer, während das Auge weiterläuft; Verschmierung ≈ Geschwindigkeit ÷ Bildfrequenz (bei 1×/60 Hz ≈ 8–17′, bei 2× ≈ 33–66′, etwa Zielgröße; eigene Rechnung).
- **Blickfeld und Gleitsicht:** Vollbild 24 Zoll in 60 cm ≈ 48° × 28° (Tablet 40 cm ≈ 33° × 23°), Auslenkung bis ≈ 25°. Der scharfe Zwischenbereich einer Gleitsichtbrille ist seitlich nur ≈ 13–18° breit statt ≈ 60° bei Einstärkengläsern (Han et al., 2003); neue Träger:innen, die ihre Strategie ändern, nutzen tendenziell mehr Kopfbewegungen (Hutchings et al., 2007, N = 10). Bei streng ruhigem Kopf gerät das Ziel in Randunschärfe, unten in den Nahteil, oben in den Fernteil → Arbeitsplatzbrille, kleineres Feld oder Kopfbewegung erlauben.
- **Akkommodation:** 60 cm ≈ 1,7 dpt, 40 cm ≈ 2,5 dpt – bei Alterssichtigkeit passende Zwischen-/Nahkorrektur nötig.
- **Kontrast/Farbe:** Rot #ef4444 auf #050508 ≈ 5,4 : 1, Weiß 20 : 1, Gelb 10,6 : 1 (eigene WCAG-Rechnung). Bei Protan-Schwäche wirkt Rot dunkler; ≈ 8 % der Männer haben eine Rot-Grün-Schwäche (Birch, 2012). Weiß/Gelb robuster; Gelb im „Day Mode“ (≈ 1,9 : 1) ungeeignet.
- **Trockenes Auge:** konzentrierte Bildschirmarbeit senkt die Lidschlagrate stark (Patel et al., 1991).
- **Alter:** geringerer Folge-Gain und längere Sakkadenlatenz im Alter (Moschner & Baloh, 1994); bei 5–8-Jährigen sind die Sakkaden-Reaktionszeiten lang und stark schwankend, bei 60–79-Jährigen wieder länger (Munoz et al., 1998).

## 5. Neurowissenschaftliche Grundlagen

- Bewegungssignale aus MT/MST steuern die Folgebewegung über FEF-Folgeareal, Brückenkerne und Kleinhirn; ≈ 100 ms Bewegung werden in den Start übersetzt (Lisberger, 2010). Das FEF hat den direktesten Einfluss, Basalganglien und Colliculus superior sind beteiligt (Krauzlis, 2004); Neurone im Colliculus superior kodieren einen gemeinsamen Fehler für Sakkade und Folge (Affen; Krauzlis et al., 1997).
- Die Antwort auf einen Haken ist eine Überlagerung aus „alte Bewegung stoppt“ und „neue beginnt“ (Soechting et al., 2005). Vorhersagbare Bahnen werden ohne Verzögerung verfolgt (Bahill & McDonald, 1983), unvorhersagbare schlechter (Bahill et al., 1980); extraretinale Signale und Aufmerksamkeit stützen die Folge (Barnes, 2008). Richtungshinweise können vorausgreifende Augenbewegungen auslösen (Kowler et al., 2019) – ob die Richtungslinie so wirkt, ist **nicht untersucht**.

## 6. Motorische Grundlagen

- Keine Hand-Eingabe; die „Motorik“ sind die Augenbewegungen selbst → motorische Profilwerte 0. Augenmuskeln sind nicht der Engpass (Engel et al., 2000).
- Wer Maus oder Finger mitführt, macht daraus eine unbewertete Nachführaufgabe (vgl. 105, 505, 513); am Tablet verdeckt der Finger das Ziel. Gerät stabil aufstellen (Ständer), aufrecht sitzen.

## 7. Einflussfaktoren und Messgrenzen

- **Keine Messung:** Fortschritt nur subjektiv; die „Stufe“ ist das gewählte Tempo. Latenz und Gain wären nur mit Eyetracker erfassbar.
- **Gerät/Abstand:** Tempo in px/s → °/s hängt von Pixeldichte und Abstand ab (27 Zoll 1440p in 60 cm: 1× ≈ 7–14°/s). Vergleiche nur am selben Gerät und Abstand.
- **Bildfrequenz:** 13-ms-Sperre (Abschnitt 2); Ruckler > 100 ms bremsen die Bewegung.
- **Quadratisches Tempo:** kleine Reglerschritte = große Sprünge; „Random Speed“ macht im Mittel schneller.
- **Person:** Ermüdung (Bahill et al., 1980), Alter, Aufmerksamkeit und Brillenversorgung. Wer den festen Takt erkennt, erwartet die Haken zeitlich – subjektive Besserung kann Aufgabengewöhnung sein.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach:** Keine Studie zu dieser Übung. Beste Analogie: 2 × 6 min Folgen eines quasi-zufällig bewegten Ziels an 3 Tagen verbesserten die Folgebewegung noch nach 5 Tagen, eine Pausengruppe nicht (Eibenberger et al., 2012; je N = 10, Eyetracker). Rückmeldung verstärkt das Lernen deutlich: Mit Belohnung für genaues Folgen stieg der Gain bei kurz verdeckten Zielen nach 8–10 Sitzungen von 0,59 auf 0,89, mit zufälliger Belohnung kaum (0,60 → 0,63), ganz ohne Belohnung leicht (0,63 → 0,71) (Madelain & Krauzlis, 2003). Das Original gibt **keine** Rückmeldung.
- **Naher Transfer – schwach:** Bei Eibenberger et al. (2012) wurde mit einer anderen Aufgabe (Step-Ramp) getestet – ein Hinweis, mehr nicht.
- **Alltagstransfer – fehlend:** Kein Beleg für Sport, E-Sport oder Verkehr (Fransen, 2024; Simons et al., 2016); große Effekte digitaler Sport-Sehtrainings entstehen vor allem, wenn am Trainingsgerät getestet wird (Guo et al., 2025).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** Blickfolge mit plötzlichen Richtungswechseln und Wiederfinden per kleiner Sakkade geübt werden soll, ohne Hand-Eingabe; als Steigerung nach 403/404/405 und vor 415; als Aufwärmen vor Aim-/Tracking-Übungen. Einstellung: Tempo 0,5–1,0× zum Einstieg, bis 1,5× für Geübte; „Random Speed“ aus; Richtungslinie erst an, später aus; 3–5 × 60 s mit Pausen und bewusstem Blinzeln.
- **Weniger passend, wenn …** Rückmeldung/Fortschritt gewünscht ist, das Ziel Auge-Hand-Koordination ist (104, 105, 505, 513) oder hohe Tempi gewählt würden (ab 2× für Einsteiger:innen und Ältere, ab 3× für alle).
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: Bei Standardtempo kein Flackern. Ab ≈ 3× springt das helle Ziel pro Bild an einen neuen Ort und wirkt wie wanderndes Aufblitzen. Die Leuchtfläche liegt bei Standardgröße mit ≈ 1–5·10⁻⁴ sr (ohne/mit Leuchtschein) weit unter der Flächenschwelle von 0,006 sr (WCAG 2.3.1; Harding et al., 2005), bei Size 50 px am Tablet in 30 cm mit ≈ 2–4·10⁻³ sr darunter, aber in derselben Größenordnung (eigene Abschätzung; ob ein wandernder Punkt nach WCAG als „Blitz“ zählt, ist nicht eindeutig geregelt). Tempo ≤ 1,5×, „Neon Glow“/„Gaze Trail“ aus, Day Mode meiden.
  - `nystagmus`: Folge und Blickhalten können eingeschränkt sein, Frustgefahr.
  - `schwindel_vestibulaer`: unvorhersagbare Richtungswechsel im Vollbild; kleines Ziel auf ruhigem Grund, daher eher gering, bei hohem Tempo mehr.
  - `gesichtsfeldausfall`: Ziel kann im ausgefallenen Bereich verloren gehen.
  - `presbyopie_gleitsicht`: seitliche Unschärfe im Vollbild → kleineres Feld, Bildschirmbrille, Kopfbewegung erlauben.
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: wenig Lidschlag bei 60 s Dauerfolgen; kurze Blöcke, Pausen.
- **Kombiniert gut mit …** 404 → 405 → 410 → 415 (steigende Unvorhersagbarkeit), 414 (Positionssprünge), 411 (Tempo- und Richtungswechsel), 303 (Blicksprünge auf ruhende Ziele), 105/513 (gleiche Idee mit Hand).

Keine Diagnose, keine Heilversprechen: Trainingsaufgabe für gesunde Nutzer:innen, kein Test der Augenbeweglichkeit.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Prüfbar machen ohne Eyetracker:** 150–400 ms nach einem Haken kurz ein Sehzeichen im Ziel zeigen (Landolt-Ring wie in `scharf-in-bewegung`); lesbar nur, wenn der Blick wieder aufliegt. Adaptiv über das Tempo, Ergebnis in °/s.
- **Tempo linear und in °/s** statt quadratisch in px/s; Takt, Tempo und Richtungssprung (erst 30–60°, später bis 180°) getrennt einstellbar; Haken-Abstand zufällig streuen (z. B. 400–900 ms), fester Takt als leichte Stufe.
- **Technik:** keine 13-ms-Sperre, Bildfrequenz ermitteln und speichern; Tempo so begrenzen, dass das Ziel pro Bild ≤ 1° springt (bei 60 Hz ≈ 60°/s, am Tablet eher 30–40°/s); kein Leuchtschein, sichtbarer Stopp-Knopf.
- **Tablet/Optiker:** Ständer, ≈ 40 cm, Querformat; wählbar kleineres Bewegungsfeld (20–30°) für Gleitsicht; „Kopf ruhig“ als Variante statt Verbot; Standardfarbe Weiß oder Gelb auf Dunkel.
- **Ehrliche Texte** (keine Profi-Stufen, Hirnregion- oder Sportversprechen, kein „Test“); große Bedienflächen, DE/IT, kurze Blöcke mit Blinzelpause.

## 11. Quellen

### Von der Website angegeben

- Bahill, A. T., Iandolo, M. J., & Troost, B. T. (1980). Smooth pursuit eye movements in response to unpredictable target waveforms. *Vision Research, 20*(11), 923–931. https://doi.org/10.1016/0042-6989(80)90073-5 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (unvorhersagbare Bahnen und Ermüdung verschlechtern die Folge; 150–200 ms und 30°/s stammen nicht daraus).
- Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 – **Prüfung:** DOI stimmt ✓, Titel auf der Website leicht falsch („pursuit“ statt „tracking“); **stützt:** teilweise (Step-Ramp-Klassiker: Positionsfehler → Sakkade, Geschwindigkeitsfehler → Folge; die Latenzangabe ist für Aufholsakkaden zu hoch).
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Netzwerk, FEF, gemeinsame Kaskade; keine „Arbeitsgrenze 30°/s“).
- Robinson, D. A. (1965). The mechanics of human smooth pursuit eye movement. *The Journal of Physiology, 180*(3), 569–591. https://doi.org/10.1113/jphysiol.1965.sp007718 – **Prüfung:** DOI stimmt ✓ (nur bibliografisch); **stützt:** unklar/nein (kein „prädiktives Kleinhirn-Vorwärtsmodell mit Latenz nahe null“).
- Barnes, G. R. (2008). Cognitive processes involved in smooth pursuit eye movements. *Brain and Cognition, 68*(3), 309–326. https://doi.org/10.1016/j.bandc.2008.08.020 – **Prüfung:** DOI stimmt ✓; **stützt:** ja für Vorhersage, extraretinale Signale, Aufmerksamkeit; nein für „dynamische Sehkraft“ und Leistungsstufen.
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (einfache Reaktionszeit; nichts zu 144-Hz-Monitoren oder Sakkaden).
- Nur im Fließtext: „Yang et al., 2025“ – vermutlich Yang, L., Zhang, W., Li, P., Tang, H., Chen, S., & Jin, X. (2025). The aiming advantages in experienced first-person shooter gamers: Evidence from eye movement patterns. *Computers in Human Behavior, 165*, 108573. https://doi.org/10.1016/j.chb.2025.108573 – **Prüfung:** DOI stimmt ✓, Zuordnung **unsicher**; **stützt:** teilweise (Querschnitt, N = 63; kein Training, keine Ausweichziele).
- Nur im Fließtext: „Appelbaum & Erickson, 2018“ – Appelbaum, L. G., & Erickson, G. (2018). Sports vision training: A review of the state-of-the-art in digital training techniques. *International Review of Sport and Exercise Psychology, 11*(1), 160–189. https://doi.org/10.1080/1750984X.2016.1266376 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (nur begrenzte, gemischte Belege; kein Transfer auf Fußball/Tennis gezeigt).
- Nur im Fließtext: „Leigh & Zee, 2015“ – Leigh, R. J., & Zee, D. S. (2015). *The neurology of eye movements* (5th ed.). Oxford University Press. https://doi.org/10.1093/med/9780199969289.001.0001 – **Prüfung:** Buch, DOI stimmt ✓ (Inhalt nicht eingesehen); **stützt:** unklar/nein („Kopfbewegung → Trainingseffekt verloren“ unbelegt).
- Die Leistungsstufen-Tabelle beruft sich auf Bahill et al. (1980), Rashbass (1961), Krauzlis (2004) und Barnes (2008) – **keine** dieser Arbeiten enthält Tempo-Stufen, Normwerte oder „1–2 Einzelbilder“.

### Weitere Fachliteratur

- Bahill, A. T., & McDonald, J. D. (1983). Smooth pursuit eye movements in response to predictable target motions. *Vision Research, 23*(12), 1573–1583. https://doi.org/10.1016/0042-6989(83)90171-2 – vorhersagbare Bahnen ohne Verzögerung
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Rot-Grün-Schwäche
- Carl, J. R., & Gellman, R. S. (1987). Human smooth pursuit: Stimulus-dependent responses. *Journal of Neurophysiology, 57*(5), 1446–1463. https://doi.org/10.1152/jn.1987.57.5.1446 – Anlaufzeit ≈ 100 ms
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Gain < 0,95, sinkt mit Tempo
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002a). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – Auslöser und Latenz (≈ 125 ms) von Aufholsakkaden
- de Brouwer, S., Missal, M., Barnes, G., & Lefèvre, P. (2002b). Quantitative analysis of catch-up saccades during sustained pursuit. *Journal of Neurophysiology, 87*(4), 1772–1780. https://doi.org/10.1152/jn.00621.2001 – Aufholsakkaden rechnen Zielbewegung ein
- Eibenberger, K., Ring, M., & Haslwanter, T. (2012). Sustained effects for training of smooth pursuit plasticity. *Experimental Brain Research, 218*(1), 81–89. https://doi.org/10.1007/s00221-012-3009-8 – Training mit quasi-zufälligem Ziel
- Engel, K. C., Anderson, J. H., & Soechting, J. F. (2000). Similarity in the response of smooth pursuit and manual tracking to a change in the direction of target motion. *Journal of Neurophysiology, 84*(3), 1149–1156. https://doi.org/10.1152/jn.2000.84.3.1149 – Auge und Hand gleich; Muskeln nicht begrenzend
- Fransen, J. (2024). There is no supporting evidence for a far transfer of general perceptual or cognitive training to sports performance. *Sports Medicine, 54*(11), 2717–2724. https://doi.org/10.1007/s40279-024-02060-x – kein Ferntransfer auf Sport
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Effekte vor allem am Trainingsgerät
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – schmales Gleitsicht-Sehfeld am Bildschirm
- Harding, G., Wilkins, A. J., Erba, G., Barkley, G. L., & Fisher, R. S. (2005). Photic- and pattern-induced seizures: Expert consensus of the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1423–1425. https://doi.org/10.1111/j.1528-1167.2005.31305.x – Blitz-Grenzwerte (≥ 3 Hz, ≥ 0,006 sr)
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – mehr Kopfbewegung mit neuer Gleitsichtbrille
- Kowler, E., Rubinstein, J. F., Santos, E. M., & Wang, J. (2019). Predictive smooth pursuit eye movements. *Annual Review of Vision Science, 5*, 223–246. https://doi.org/10.1146/annurev-vision-091718-014901 – Vorhersage und Hinweisreize
- Krauzlis, R. J., Basso, M. A., & Wurtz, R. H. (1997). Shared motor error for multiple eye movements. *Science, 276*(5319), 1693–1695. https://doi.org/10.1126/science.276.5319.1693 – gemeinsamer Fehler für Sakkade und Folge im Colliculus superior (Affen)
- Lanman, J., Bizzi, E., & Allum, J. (1978). The coordination of eye and head movement during smooth pursuit. *Brain Research, 153*(1), 39–53. https://doi.org/10.1016/0006-8993(78)91127-7 – Kopf-Augen-Folge genauso genau (Affen)
- Lisberger, S. G. (2010). Visual guidance of smooth-pursuit eye movements: Sensation, action, and what happens in between. *Neuron, 66*(4), 477–491. https://doi.org/10.1016/j.neuron.2010.03.027 – Netzwerk MT, FEF, Kleinhirn
- Madelain, L., & Krauzlis, R. J. (2003). Effects of learning on smooth pursuit during transient disappearance of a visual target. *Journal of Neurophysiology, 90*(2), 972–982. https://doi.org/10.1152/jn.00869.2002 – Rückmeldung verstärkt Lernen
- Mann, D. L., Spratford, W., & Abernethy, B. (2013). The head tracks and gaze predicts: How the world's best batters hit a ball. *PLoS ONE, 8*(3), e58289. https://doi.org/10.1371/journal.pone.0058289 – Kopfbewegung beim Verfolgen im Spitzensport
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – bei 4 von 5 Personen ≈ 90 % Gain bis ≈ 100°/s
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – Folge und Sakkaden im Alter
- Munoz, D. P., Broughton, J. R., Goldring, J. E., & Armstrong, I. T. (1998). Age-related performance of human subjects on saccadic eye movement tasks. *Experimental Brain Research, 121*(4), 391–400. https://doi.org/10.1007/s002210050473 – Sakkaden über die Lebensspanne
- Orban de Xivry, J.-J., & Lefèvre, P. (2007). Saccades and pursuit: Two outcomes of a single sensorimotor process. *The Journal of Physiology, 584*(1), 11–23. https://doi.org/10.1113/jphysiol.2007.139881 – Sakkade und Folge als gemeinsamer Prozess
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer von Hirntraining
- Soechting, J. F., Mrotek, L. A., & Flanders, M. (2005). Smooth pursuit tracking of an abrupt change in target direction: Vector superposition of discrete responses. *Experimental Brain Research, 160*(2), 245–258. https://doi.org/10.1007/s00221-004-2010-2 – Reaktion auf Richtungswechsel (90/130 ms)
- Spjut, J., Boudaoud, B., Binaee, K., Kim, J., Majercik, A., McGuire, M., Luebke, D., & Kim, J. (2019). Latency of 30 ms benefits first person targeting tasks more than refresh rate above 60 Hz. In *SIGGRAPH Asia 2019 Technical Briefs* (S. 110–113). ACM. https://doi.org/10.1145/3355088.3365170 – Latenz wichtiger als Bildfrequenz
- World Wide Web Consortium. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2*, Erfolgskriterien 2.2.2, 2.3.1 (Norm, keine DOI). https://www.w3.org/TR/WCAG22/ – Blitz-Flächenschwelle, Pause-Pflicht
