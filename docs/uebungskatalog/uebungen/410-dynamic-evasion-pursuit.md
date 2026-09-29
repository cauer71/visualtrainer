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

> Original: „Reaktives Augentraining – Dynamische Ausweichziel-Verfolgung“ (Seitentitel „Dynamisches Sehen |
> Reaktive Blickverfolgung“) – skilldrills.online, Kapitel Blickverfolgung (`visual-tracking`) · Blickfit: noch
> nicht umgesetzt (verwandt: `scharf-in-bewegung`, `zielfang`)
>
> Hinweis: Nr. 415 (directional-chaos-pursuit) trägt auf der Website **denselben Seitentitel**. Die Übungen
> unterscheiden sich aber: 410 = gerade Strecken mit harten Haken, 415 = ständiges Zufallsdriften.

## 1. Kurzbeschreibung

Auf einem fast schwarzen Bildschirm fliegt ein roter, leicht leuchtender Punkt (Standard: etwa 0,7–0,9° groß)
auf geraden Strecken. Bei Standardtempo schlägt er ungefähr alle halbe Sekunde einen Haken in eine völlig
zufällige neue Richtung, oft sogar fast zurück. An den Rändern prallt er ab. Man soll ihm nur mit den Augen
folgen und den Kopf ruhig halten: auf der Geraden gleichmäßig mitgehen, nach dem Haken mit einem kleinen
Blicksprung wieder aufs Ziel kommen. Das Original gibt keinerlei Rückmeldung, zählt keine Punkte und misst
nicht, ob man dem Punkt tatsächlich gefolgt ist; am Ende steht nur „Session complete“.

## 2. Ablauf im Original (Analyse)

Grundlage: Seitentext und ausgelieferter Spielcode (seitenspezifischer Chunk `9826-…js` sowie gemeinsame Module für
Zeichnen, Bildbegrenzung, Vollbild und Abbruch; geprüft am 29.09.2026, nur Mechanik übernommen). Zahlen in °
sind **eigene Umrechnungen** für einen 24-Zoll-Full-HD-Monitor in 60 cm (≈ 38 px pro Grad) bzw. ein 11-Zoll-Tablet
in 40 cm (≈ 36 CSS-px pro Grad).

**Ablauf (Code):** Einstellungsmenü → „Übung starten“ → das Spielfeld füllt den ganzen Bildschirm (echter
Vollbildmodus, sofern der Browser ihn erlaubt) → Countdown 3-2-1-GO (≈ 2,45 s, mit Tönen) → Übungsphase mit
Restzeit-Anzeige → Abschlussbildschirm mit Dauer, Grundtempo, Anzahl Sitzungen und Tempo-Modus sowie dem Text
„Smooth Pursuit Calibrated“ (es wurde nichts kalibriert). Escape, Verlassen des Vollbilds oder Tab-Wechsel brechen
ab. Während der Übung gibt es keinen sichtbaren Stopp-Knopf (nur Ton an/aus). Gespeichert wird nur ein
Sitzungszähler im Browser.

**Darstellung (Code):** Hintergrund #050508 mit sehr schwachem 40-px-Raster (2 % Deckkraft; „Day Mode“: weiß,
5 %). Ziel mit Radius *r* = Einstellung „Size“ (Standard 16 px, wählbar 10–50 px): gefüllte Scheibe Ø ≈ 1,64 *r*
(26 px ≈ 0,7°), Ring Ø 2 *r* (32 px ≈ 0,85°), schwacher Außenring Ø ≈ 42 px (≈ 1,1°), weißer Mittelpunkt Ø ≈ 6 px
(≈ 9′) und Leuchtschein („Neon Glow“, Standard an). Farben: Rot #ef4444 (Standard), Grün, Blau, Orange, Gelb, Weiß.
Standardmäßig zeigt eine dünne, blasse Linie (2 px, hellblau, 25 % Deckkraft) vom Ziel aus in die **aktuelle**
Bewegungsrichtung; ihre Länge entspricht dem Weg der nächsten ≈ 80 ms ÷ Tempo. Sie dreht im selben Bild wie das
Ziel, warnt also nicht vor, macht die neue Richtung aber sofort als statischen Hinweis sichtbar. „Hide Line“
blendet nur diese Linie aus (keine „Bahnlinien“, wie das Menü sagt). „Gaze Trail“ zeichnet die letzten 15 Bilder
als verblassende Spur (≈ 250 ms bei 60 Bildern/s), „Scanlines“ ein ruhendes Streifenmuster.

**Bewegung (Code):**

- Start in der Bildmitte mit schräger Anfangsrichtung.
- Ein interner Zeitzähler läuft mit Echtzeit × Tempo. Überschreitet er 500 (mit „Random Speed“ jedes Mal neu
  gewürfelt 350–650), bekommt das Ziel eine **gleichverteilt zufällige neue Richtung (0–360°)** und einen neuen
  Betrag (gleichverteilt, Spanne 1 : 2). Der Richtungssprung gegenüber der alten Richtung ist damit gleichverteilt
  zwischen 0° und 180° (im Mittel 90°; die Hälfte der Haken ist steiler als 90°, eigene Ableitung).
- **Tempo wirkt doppelt:** Der Tempo-Faktor steckt sowohl im Geschwindigkeitsbetrag als auch im Zeitschritt. Die
  Geschwindigkeit wächst daher mit dem **Quadrat** des Tempos (312–625 px/s × Tempo²), der Takt der Haken
  schrumpft mit 500 ms ÷ Tempo. Beispiel: Von 1,0× auf 1,3× steigt die Geschwindigkeit um 69 %.
- Randberührung: Abprall, dabei 5 % schneller (bis zum nächsten Haken).
- „Random Speed“: Der Tempo-Faktor wird mit einer glatten, festen Mehrfach-Sinusfunktion der Uhrzeit auf das
  0,40- bis 1,90-Fache verändert (Median 1,15; eigene Auswertung der Formel). Weil das Tempo doppelt wirkt,
  schwankt die Geschwindigkeit etwa zwischen dem 0,16- und 3,6-Fachen. Im Mittel wird es also schneller, nicht nur
  „unregelmäßiger“; von „ruckartiger Beschleunigung“ (Menütext) kann keine Rede sein.

| Tempo | Haken alle | Geschwindigkeit | ≈ °/s (Monitor 60 cm) | gerade Strecke je Haken | Weg je Bild (60 Hz) |
|---|---|---|---|---|---|
| 0,5× | 1 000 ms | 78–156 px/s | 2–4 | 2–4° | 1–3 px |
| 1× (Standard) | 500 ms | 312–625 px/s | 8–17 | 4–8° | 5–10 px |
| 1,5× | 333 ms | 703–1 406 px/s | 19–37 | 6–12° | 12–23 px |
| 2× | 250 ms | 1 250–2 500 px/s | 33–66 | 8–17° | 21–42 px |
| 3× | 167 ms | 2 800–5 600 px/s | 74–149 | 12–25° | 47–94 px |
| 5× | 100 ms | 7 800–15 600 px/s | 206–413 | 21–41° | 130–260 px |
| 9× | 56 ms | 25 300–50 600 px/s | 670–1 340 | (Randabpraller) | 420–840 px |

(Eigene Berechnung aus der Code-Logik; Tablet in 40 cm ergibt ähnliche °/s-Werte.)

**Zeitbasis und Bildfrequenz (Code):** Die Bewegung ist zeitbasiert (Zeitschritt höchstens 100 ms). Zusätzlich
**verwirft der Code jedes Bild, das weniger als 13 ms nach dem letzten verarbeiteten Bild kommt**. Das begrenzt die
Aktualisierung auf höchstens ≈ 77 pro Sekunde. Eigene Berechnung bei gleichmäßigem Bildtakt: 60 Hz → 60, 90 Hz →
45, 120 Hz → 60, 144 Hz → 72, 165 Hz → 55, 240 Hz → 60 Aktualisierungen pro Sekunde. Auf 90- und 165-Hz-Geräten
läuft das Ziel also sogar ruckeliger als auf 60 Hz.

**Eingabe und Auswertung (Code):** Keine. Maus oder Finger zeichnen nur ein weißes Fadenkreuz (Maus beim Bewegen,
Touch beim Berühren/Ziehen), ohne Abstands-, Treffer- oder Zeitmessung. Es gibt kein Punktesystem, keine Level und
keine Fehler.

**Widersprüche Regeltext ↔ Code:**

- „Wählen Sie die Geschwindigkeit (0,5× bis 2,0×)“: Der Regler reicht bis 9× (dort fliegt das Ziel 11–22° pro Bild).
- „In unregelmäßigen Abständen, unangekündigt“: Der Takt ist fest (500 ms ÷ Tempo); nur mit „Random Speed“ schwankt
  er (350–650 ms ÷ Tempo). Die **Richtung** ist unvorhersagbar, der **Zeitpunkt** nach kurzer Zeit nicht.
- „Pure Visual“, aber ein Fadenkreuz am Zeiger lädt zum Mitführen ein (wird nicht ausgewertet).
- „Analysieren Sie nach Ablauf der Zeit Ihre Blickkonstanz“: Es gibt keine Daten dazu.
- Empfehlung für 144/240-Hz-Monitore, obwohl der eigene Code höchstens ≈ 77 Aktualisierungen pro Sekunde zulässt.

## 3. Was die Website sagt – und wie das einzuordnen ist

**Aussagen der Website (Zusammenfassung):** Die Übung soll den nahtlosen Wechsel zwischen glatter Folgebewegung und
sofortigen Korrektursakkaden trainieren. Nach einem Haken übersteige die Zielgeschwindigkeit die „Arbeitsgrenze der
Folgebewegung (ca. 30°/s)“. Das Netzhautbild rutsche aus der Fovea, und Sehrinde, Colliculus superior bzw. frontales
Augenfeld lösten nach 150–200 ms eine Korrektursakkade aus. Wie schnell man danach wieder „ohne Überschwingen“ folge,
„definiere die dynamische Sehkraft“. Das Training „konditioniere die äußeren Augenmuskeln und die frontalen
Augenfelder“ und helfe gegen Ausweichmanöver in FPS-Spielen sowie bei Haken und Flugbahnänderungen im Ballsport. Der
Kopf müsse fixiert sein, weil sonst der vestibulo-okuläre Reflex (VOR) den Trainingseffekt zunichtemache. 144/240-Hz-
Monitore seien „deutlich überlegen“ und ermöglichten eine ≈ 10 ms frühere Sakkade. Empfohlen: 5–8 Durchgänge à
60 s mit 30 s Pause. Zielgruppen: FPS/E-Sport, Ballsport und „alle, die ihre visuelle Reaktionsfähigkeit steigern
möchten“. Eine Tabelle mit 5 „Leistungsstufen“ ordnet das gewählte Tempo Profilen zu (Stufe 1 „Spitzenreaktion“ ab
2,0×, „Neuzentrierung in 1–2 Einzelbildern“ bei Stufe 2, „normativer Bereich gesunder Erwachsener“ 1,0–1,3×).

**Einordnung:**

- **Richtig im Kern:** Beim Verfolgen arbeiten Folgebewegung und Aufholsakkaden zusammen; beide gelten heute als zwei
  Ausgänge eines gemeinsamen sensomotorischen Prozesses (Orban de Xivry & Lefèvre, 2007). Bei einem abrupten,
  unvorhersagbaren Richtungswechsel sinkt die Folgegeschwindigkeit nach ≈ 90 ms, die Richtung der Augenbewegung
  ändert sich erst nach ≈ 130 ms (Soechting et al., 2005).
- **Falsch erklärt:** Ein Haken erhöht die Zielgeschwindigkeit nicht. Das Problem ist, dass das Auge 90–130 ms lang
  in die alte Richtung weiterläuft und so Positions- und Geschwindigkeitsfehler entstehen. Eine feste
  „Arbeitsgrenze von 30°/s“ gibt es nicht: Der Folge-Gain (Augen- ÷ Zielgeschwindigkeit) sinkt mit zunehmender
  Geschwindigkeit (Collewijn & Tamminga, 1984), viele Menschen erreichen aber ≈ 90 % Gain bis ≈ 100°/s (Meyer et al.,
  1985). In Krauzlis (2004) steht die 30°/s-Grenze nicht.
- **Latenz zu hoch angesetzt:** Aufholsakkaden während laufender Folgebewegung kommen nach ≈ 125 ms, ausgelöst durch
  die vorhergesagte Zeit bis zum Zusammentreffen von Blick und Ziel (de Brouwer et al., 2002a). 150–200 ms passen
  eher zu Sakkaden auf neu auftauchende Ziele.
- **„Konditioniert die Augenmuskeln“ – nicht belegt, eher widerlegt:** Auge und Hand reagieren auf einen
  Richtungswechsel mit fast gleichem Zeitverlauf, obwohl ihre Trägheit sehr verschieden ist; die Muskeln sind also
  nicht der begrenzende Faktor, sondern die neuronale Verarbeitung (Engel et al., 2000). Dass die Übung das frontale
  Augenfeld „stärkt“, wurde nie gezeigt.
- **„Kontinuierliche Antizipation unmöglich“:** nur teilweise. Die Richtung ist zufällig, der Takt aber fest, und
  Randabpraller sind vorhersagbar. Die eingeblendete Richtungslinie ist zudem ein Hinweisreiz.
- **Kopf fixieren wegen VOR:** Beim natürlichen Verfolgen bewegt sich der Kopf mit, und der Blick bleibt trotzdem
  genau auf dem Ziel (Lanman et al., 1978, Affen); Spitzen-Cricketspieler koppeln ihre Kopfdrehung sogar an den Ball
  (Mann et al., 2013). Dass Kopfbewegung „den Trainingseffekt zerstört“, ist nicht belegt (auch nicht im zitierten
  Standardwerk Leigh & Zee, das die Seite ohne Listeneintrag nennt). Sinnvoll ist ein ruhiger Kopf trotzdem, wenn man
  gezielt die **Augen**-Folgebewegung üben will, weil sonst der Kopf die Arbeit übernimmt.
- **144/240 Hz:** Bei 60 Hz verzögert das Bildraster einen Haken im Mittel um ≈ 8 ms (höchstens 16,7 ms), bei 144 Hz
  um ≈ 3,5 ms. Der mittlere Unterschied liegt also bei ≈ 5 ms (eigene Abschätzung), nicht bei „10 ms früherer
  Sakkade“. Woods et al. (2015) untersuchen einfache Reaktionszeiten und Hardware-Verzögerungen, nicht Monitore oder
  Sakkaden. Für Zielaufgaben ist Gesamtlatenz wichtiger als Bildfrequenz (Spjut et al., 2019). Und der Code der
  Übung begrenzt selbst auf ≈ 77 Aktualisierungen pro Sekunde (Abschnitt 2).
- **Leistungsstufen ohne Datengrundlage:** Die Seite misst nichts (sie schreibt selbst, dass sie keine Daten sammelt).
  Die Stufe ergibt sich allein aus dem **selbst gewählten Tempo**; wer 2× einstellt, gilt als „Profi“, egal ob er dem
  Ziel folgt. „Neuzentrierung in 1–2 Einzelbildern“ (17–33 ms bei 60 Hz) ist physiologisch unmöglich: Die
  Folgebewegung braucht ≈ 100 ms Anlaufzeit (Carl & Gellman, 1987), Aufholsakkaden ≈ 125 ms. „< 150 ms“ für
  Stufe 1 ist kein Spitzenwert, sondern typisch. Ein „normativer Bereich 1,0–1,3×“ ist nirgends erhoben.
- **Transfer auf E-Sport und Ballsport:** Die genannte Studie zu FPS-Spielern (vermutlich Yang et al., 2025) ist ein
  Querschnittsvergleich ohne Training und ohne ausweichende Ziele. Übersichtsarbeiten finden für allgemeine
  Augen-Übungen nur begrenzte, gemischte Belege (Appelbaum & Erickson, 2018) bzw. keinen Beleg für Ferntransfer
  (Fransen, 2024). Die Aussage „Ja, verbessert Fußball/Tennis“ ist nicht gedeckt.
- **„Dynamische Sehkraft“:** In der Fachliteratur meint dynamische Sehschärfe das Erkennen von Details an bewegten
  Objekten (siehe docs/wissenschaft/02). Genau das prüft die Übung nicht.
- **Trainingsempfehlung 5–8 × 60 s:** ohne Quelle, aber vernünftig kurz; die Qualität der Folgebewegung bei
  unvorhersagbaren Bahnen sinkt mit Ermüdung (Bahill et al., 1980).

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Ziel (Standard) ≈ 0,7–0,85° am Monitor in 60 cm, ≈ 0,9° am Tablet in 40 cm; weißer Mittelpunkt ≈ 9′.
  Das ist weit oberhalb jeder Auflösungsgrenze, **Sehschärfe ist nicht leistungsbegrenzend** (Profil 0). Mit Size
  50 px wird das Ziel bis ≈ 2,6° groß.
- **Folgebewegung:** Anlaufzeit ≈ 100 ms (Carl & Gellman, 1987); der Gain der glatten Komponente bleibt immer unter
  0,95 und sinkt mit der Geschwindigkeit, Sakkaden ergänzen den Rest (Collewijn & Tamminga, 1984). Obergrenze bei
  den meisten Menschen ≈ 100°/s (Meyer et al., 1985).
- **Reaktion auf den Haken:** Folgegeschwindigkeit sinkt nach ≈ 90 ms, Richtungsänderung ab ≈ 130 ms (Soechting et
  al., 2005). Die Aufholsakkade wird nach ≈ 125 ms ausgelöst, wenn die vorhergesagte Zeit bis zum Treffpunkt außerhalb
  von 40–180 ms liegt (de Brouwer et al., 2002a). Das Sakkadensystem berücksichtigt dabei auch die Zielbewegung
  (Netzhautschlupf) und braucht ≈ 90 ms, um eine Bahnänderung einzurechnen (de Brouwer et al., 2002b).
- **Was das für die Tempostufen heißt (eigene Ableitung):** Bei 1× (8–17°/s) läuft das Auge nach einem 90°-Haken in
  ≈ 130 ms etwa 1,5–3° am Ziel vorbei; die Korrektur ist ein kleiner Blicksprung, danach bleiben ≈ 300 ms ruhige
  Folgebewegung bis zum nächsten Haken. Bei 2× (33–66°/s, Haken alle 250 ms) entstehen Fehler von 6–12°, und die
  Zeit bis zum nächsten Haken reicht kaum für Sakkade plus Wiederaufnahme. **Ab 3×** sind die Strecken (167 ms)
  kürzer als die Reaktionskette, die Geschwindigkeit liegt über der Folgebewegungs-Obergrenze: Man springt nur noch
  hinterher. **Ab 5×** springt das Ziel 3–22° pro Bild und wirkt wie ein an wechselnden Orten aufblitzender Punkt.
  Der sinnvolle Übungsbereich liegt daher bei ≈ 0,5–1,5×.
- **Bildschirm-Unschärfe:** Auf üblichen Displays steht jedes Bild eine ganze Bilddauer, während das folgende Auge
  weiterläuft. Die Verschmierung beträgt etwa Geschwindigkeit ÷ Bildfrequenz (Prinzip gestützt durch Geri & Morgan,
  2007): bei 1× und 60 Hz ≈ 8–17′, bei 2× ≈ 33–66′, also etwa so groß wie das Ziel selbst. 120 statt 60 Bilder/s
  verbessern die Bewegungsdarstellung deutlich, der Nutzen sättigt bei ≈ 240 Bildern/s (Kuroki et al., 2007).
- **Blickfeld:** Im Vollbild auf einem 24-Zoll-Monitor in 60 cm ist das Spielfeld ≈ 51° × 29° groß (Tablet in 40 cm
  ≈ 33° × 23°). Die Augen wandern also bis ≈ 25° zur Seite; im Alltag würde man dabei den Kopf mitbewegen.
- **Brille und Gleitsicht:** Am Bildschirm (Zwischenbereich) ist das scharfe Sehfeld einer Gleitsichtbrille seitlich
  nur ≈ 13–18° breit statt ≈ 60° wie bei Einstärkengläsern (Han et al., 2003). Das Ziel gerät bei ruhigem Kopf
  laufend in die unscharfen Randzonen; neue Gleitsichtträger:innen setzen zudem mehr Kopfbewegungen ein (Hutchings et
  al., 2007). Die Website-Vorgabe „Kopf fixieren“ passt dazu nicht. Günstiger: Arbeitsplatz-/Bildschirmbrille,
  kleineres Spielfeld (kein Vollbild) oder größerer Abstand, Kopfbewegung erlauben. Nach unten gerät der Blick in den
  Nahteil (für 60 cm zu stark), nach oben in den Fernteil.
- **Akkommodation und Vergenz:** 60 cm entsprechen 1,7 dpt, 40 cm (Tablet) 2,5 dpt Akkommodationsbedarf; bei
  Alterssichtigkeit ist eine passende Korrektion Voraussetzung.
- **Kontrast und Farbe:** Standard-Rot #ef4444 auf #050508 hat ein Kontrastverhältnis von ≈ 5,4 : 1 (eigene
  WCAG-Berechnung), Weiß 20 : 1, Gelb 10,6 : 1. Für Menschen mit Protan-Schwäche wirkt Rot dunkler; rund 8 % der
  Männer haben eine Rot-Grün-Schwäche (Birch, 2012). Farbe ist nicht aufgabenrelevant (Profil 0), Weiß oder Gelb sind
  die robustere Wahl. Im „Day Mode“ ist Gelb auf Weiß (≈ 1,9 : 1) ungeeignet.
- **Trockenes Auge:** Bei konzentrierter Bildschirmarbeit sinkt die Lidschlagrate stark, im Mittel auf etwa ein
  Fünftel (Patel et al., 1991); digitale Augenbelastung betrifft mindestens die Hälfte der Bildschirmnutzer:innen
  (Sheppard & Wolffsohn, 2018). 60 s ununterbrochenes Folgen ohne Pause fördern das.
- **Alter:** Ältere Menschen haben bei allen Geschwindigkeiten einen geringeren Folge-Gain und längere
  Sakkaden-Reaktionszeiten (Moschner & Baloh, 1994) sowie eine schwächere Anlaufbeschleunigung der Folgebewegung
  (Morrow & Sharpe, 1993). Sakkaden sind bei 20–30-Jährigen am schnellsten und stabilsten, bei 60–79-Jährigen
  langsamer, bei 5–8-Jährigen langsam und stark schwankend (Munoz et al., 1998).

## 5. Neurowissenschaftliche Grundlagen

- **Bewegungsverarbeitung → Folgebewegung:** Die Folgebewegung wird aus visuellen Bewegungssignalen (Areal MT/MST)
  gesteuert und über ein ausgedehntes Netz umgesetzt, zu dem das Folgebewegungsareal des frontalen Augenfelds (FEF),
  Kleinhirn und Brückenkerne gehören; ≈ 100 ms visueller Bewegung werden in den Start der Folgebewegung übersetzt
  (Lisberger, 2010). Das FEF hat dabei den direktesten Einfluss, Basalganglien, Colliculus superior und Hirnstamm
  sind beteiligt (Krauzlis, 2004).
- **Ein gemeinsamer Fehler für Sakkade und Folgebewegung:** Neurone im Colliculus superior von Affen signalisieren
  die Abweichung zwischen Augen- und Zielposition, unabhängig davon, ob sie mit einer Sakkade oder mit Folgebewegung
  behoben wird (Krauzlis et al., 1997). Behavioral zeigen Aufholsakkaden, dass beide Systeme Positions- und
  Geschwindigkeitsinformation teilen (de Brouwer et al., 2002b; Orban de Xivry & Lefèvre, 2007).
- **Antwort auf einen Haken:** Sie lässt sich als Überlagerung zweier Teilantworten beschreiben, „alte Bewegung
  stoppt“ und „neue Bewegung beginnt“, mit richtungsabhängigen Unterschieden (Soechting et al., 2005). Auge und Hand
  zeigen dabei sehr ähnliche Verläufe, was auf gemeinsame neuronale Steuerelemente hinweist (Engel et al., 2000).
- **Vorhersage:** Vorhersagbare Bewegungen werden trotz Latenz ohne Verzögerung verfolgt (Bahill & McDonald, 1983);
  bei unvorhersagbaren Bahnen sinkt die Qualität (Bahill et al., 1980). Bei pseudo-zufälliger Bewegung fiel der Gain
  von 0,92 auf 0,53, sobald eine schnellere Frequenzkomponente (1,56 Hz) enthalten war (Barnes et al., 1987). Nach dem
  Start stützen extraretinale Signale (Efferenzkopie, Kurzzeitspeicher für Geschwindigkeit) die Folgebewegung;
  Aufmerksamkeit erhöht den Gain für das gewählte Ziel (Barnes, 2008). Hinweisreize über die kommende Richtung
  können vorausgreifende Augenbewegungen auslösen (Kowler et al., 2019). Ob die Richtungslinie der Vorlage so genutzt
  wird, ist **nicht untersucht**.
- **Was nicht belegt ist:** dass die Übung bestimmte Hirnregionen (FEF, Kleinhirn) „stärkt“ oder „konditioniert“.
  Laborstudien zeigen nur, dass sich die Folgebewegung selbst mit Übung verändert (Abschnitt 8).

## 6. Motorische Grundlagen

- **Keine Hand-Eingabe nötig:** Die „Motorik“ der Übung sind die Augenbewegungen selbst (Folgebewegung und
  Sakkaden). Alle motorischen Profilwerte sind daher 0.
- **Augenmuskeln sind nicht der Engpass:** Dass die Richtungsänderung beim Auge ähnlich langsam verläuft wie bei der
  viel trägeren Hand, spricht dafür, dass nicht die Muskel- und Gewebedynamik, sondern die neuronale Verarbeitung die
  Geschwindigkeit begrenzt (Engel et al., 2000).
- **Optionales Fadenkreuz:** Wer die Maus mitführt, macht aus der Übung eine unbewertete manuelle Nachführaufgabe
  (ähnlich 105, 505, 513). Das kann den Blick an die Hand binden und ist nicht Ziel der Übung. Am Tablet verdeckt ein
  mitgeführter Finger das Ziel; besser nicht mitfahren.
- **Kopf und Haltung:** Große Blickauslenkungen werden natürlicherweise von Kopfbewegungen begleitet; bei
  Kopf-Augen-Folgebewegung bleibt der Blick genauso genau (Lanman et al., 1978). Für die Übung: aufrecht sitzen,
  Monitor bzw. Tablet stabil (Ständer), damit nicht Gerät oder Hand wackeln.

## 7. Einflussfaktoren und Messgrenzen

- **Keine Messung:** Weder Blick noch Zeiger werden ausgewertet; Fortschritt ist nur subjektiv. Die „Leistungsstufe“
  ist das gewählte Tempo. Zuverlässige Augenbewegungsmaße (Latenz, Genauigkeit, Gain) sind mit Eyetracker gut
  reproduzierbar (Bargary et al., 2017), am normalen Bildschirm aber nicht erhebbar.
- **Gerät und Abstand:** Das Tempo ist in Pixeln pro Sekunde festgelegt. Wie viele Grad pro Sekunde das sind, hängt
  von Pixelgröße und Sehabstand ab (z. B. 27-Zoll-Monitor mit 1440p in 60 cm ≈ 45 px/° → 1× ≈ 7–14°/s statt 8–17°/s,
  eigene Rechnung). Vergleiche nur am selben Gerät und im selben Abstand.
- **Bildfrequenz:** Durch die 13-ms-Sperre im Code laufen 90-Hz- (45 Bilder/s) und 165-Hz-Geräte (55 Bilder/s)
  ruckeliger als 60-Hz-Geräte; 144 Hz bringt nur 72 Bilder/s. Die Geschwindigkeit selbst ist bildfrequenzunabhängig.
- **Quadratisches Tempo:** Kleine Reglerbewegungen verändern die Geschwindigkeit stark (+30 % Tempo = +69 %
  Geschwindigkeit, dazu kürzerer Takt). „Random Speed“ macht die Übung im Mittel schneller.
- **Browser:** Browser-Zeitmessung und -Darstellung sind weniger präzise als Laborsoftware und unterscheiden sich
  zwischen Betriebssystemen und Browsern (Bridges et al., 2020). Bei Rucklern (> 100 ms) wird die Bewegung gebremst.
- **Person:** Ermüdung verschlechtert die Folgebewegung bei unvorhersagbaren Bahnen (Bahill et al., 1980); Alter
  (Abschnitt 4), Aufmerksamkeit (Barnes, 2008) und die Brillenversorgung beeinflussen das Ergebnis stark.
- **Übungseffekt vs. Fähigkeit:** Wer den festen Takt erkennt, kann die Haken zeitlich erwarten; eine subjektive
  Verbesserung kann daher Gewöhnung an die Aufgabe sein.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach:** Zu dieser Übung gibt es keine Studie. Die beste Analogie: Zwei 6-minütige Sitzungen an
  drei aufeinanderfolgenden Tagen, in denen gesunde Erwachsene einem quasi-zufällig bewegten Kreuz am Bildschirm mit
  den Augen folgten, verbesserten die Folgebewegung signifikant und noch 5 Tage später; eine Kontrollgruppe mit
  20 min Pause verbesserte sich nicht (Eibenberger et al., 2012; je N = 10, Messung per Eyetracker). Lernen hängt
  aber von Rückmeldung ab: Mit Belohnung für genaues Folgen stieg der Gain bei kurz verschwindenden Zielen von 0,59
  auf 0,89, mit zufälliger Belohnung nur von 0,60 auf 0,63 (Madelain & Krauzlis, 2003). Das Original gibt **keine**
  Rückmeldung.
- **Naher Transfer – schwach:** Bei Eibenberger et al. (2012) wurde mit einer anderen Aufgabe (Step-Ramp-Test)
  gemessen als trainiert – ein Hinweis auf Übertragung innerhalb der Folgebewegung, aber nur eine kleine
  Laborstudie. Zur Übertragung auf andere Blick- oder Zielaufgaben gibt es keine Daten.
- **Alltagstransfer – fehlend:** Für Sport, E-Sport oder Straßenverkehr gibt es keinen Beleg. Erfahrene FPS-Spieler
  unterscheiden sich im Blickverhalten (Querschnitt, Yang et al., 2025), das beweist aber keine Trainingswirkung.
  Allgemeines Wahrnehmungs-/Kognitionstraining zeigt keinen belastbaren Ferntransfer auf Sportleistung (Fransen,
  2024); Hirntraining verbessert verlässlich die geübte Aufgabe, kaum aber entfernte Aufgaben oder den Alltag (Simons
  et al., 2016). Große Effekte digitaler Sport-Sehtrainings entstehen vor allem, wenn am selben Gerät geübt und
  getestet wird (Guo et al., 2025).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand die glatte Blickfolge bei plötzlichen Richtungswechseln und das Wiederfinden des Ziels mit
  kleinen Blicksprüngen üben möchte, ohne Hand-Eingabe; als Steigerung nach vorhersagbaren Bahnen (403 Sinus, 404
  gleichmäßig, 405 Zickzack) und vor 415 (Richtungschaos); als kurzes Aufwärmen vor Aim-/Tracking-Übungen.
  Empfohlene Einstellung: Tempo 0,5–1,0× für den Einstieg, bis 1,5× für Geübte; „Random Speed“ aus; Richtungslinie
  zunächst an, später aus; 60 s, 3–5 Durchgänge mit Pausen und bewusstem Blinzeln.
- **Weniger passend, wenn …** Rückmeldung oder ein messbarer Fortschritt gewünscht ist (Original misst nichts), das
  Ziel Auge-Hand-Koordination ist (104, 105, 505, 513), oder hohe Tempi gewählt würden (ab 2× für Einsteiger:innen und
  Ältere, ab 3× für alle nur noch „Hinterherspringen“).
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: Bei Standardtempo kein Flackern. Ab ≈ 3× springt das
    helle, leuchtende Ziel pro Bild an einen neuen Ort und wirkt wie ein rasch wanderndes Aufblitzen. Bei
    Standardgröße liegt die leuchtende Fläche mit ≈ 8·10⁻⁴ sr deutlich unter der WCAG-Flächenschwelle von 0,006 sr;
    bei Size 50 px am Tablet in 30 cm kommt ein Ziel samt Leuchtschein nahe an die Schwelle (eigene Abschätzung).
    Tempo ≤ 1,5×, „Neon Glow“ und „Gaze Trail“ aus, Day Mode meiden.
  - `nystagmus`: Folgebewegung und Blickhalten können eingeschränkt sein; die Aufgabe kann frustrieren.
  - `schwindel_vestibulaer`: ständige, unvorhersagbare Richtungswechsel im Vollbild; kleines Ziel auf ruhigem Grund,
    daher eher gering, bei hohem Tempo mehr.
  - `gesichtsfeldausfall`: Das Ziel springt in alle Richtungen und kann im ausgefallenen Bereich verloren gehen.
  - `presbyopie_gleitsicht`: seitliche Unschärfezonen im Vollbild (Abschnitt 4) → kleineres Feld, Bildschirmbrille,
    Kopfbewegung erlauben.
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: 60 s konzentriertes Folgen mit wenig Lidschlag; Pausen
    einplanen, Durchgänge kurz halten.
- **Kombiniert gut mit …** 404 → 405 → 410 → 415 (steigende Unvorhersagbarkeit), 414 (Positionssprünge statt
  Richtungswechsel), 411 (zufällige Tempo- und Richtungswechsel), 303 (Blicksprünge auf ruhende Ziele), 105 und 513
  (dieselbe Bewegungsidee mit Hand-Nachführung).

Keine Diagnose, keine Heilversprechen: Die Übung ist eine Trainingsaufgabe für gesunde Nutzer:innen, kein Test der
Augenbeweglichkeit.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Keine Messung, keine Rückmeldung:** Ohne Eyetracker lässt sich die Blickfolge prüfbar machen, indem kurz nach
  einem Haken (z. B. 150–400 ms) ein Sehzeichen im Ziel erscheint (Landolt-Ring wie in `scharf-in-bewegung`): Es ist
  nur lesbar, wenn der Blick wieder auf dem Ziel liegt. Adaptiv über das Tempo (Treppenverfahren), Ergebnis in °/s.
- **Tempo linear und in °/s:** statt quadratisch in px/s; Obergrenze ≈ 30–40°/s für Tablets, Takt und Tempo
  getrennt einstellbar. Richtungssprung als eigene Schwierigkeit (z. B. erst 30–60°, später bis 180°).
- **Takt zufällig machen:** Haken-Abstand z. B. 400–900 ms streuen, damit wirklich nur reaktiv gefolgt werden kann;
  alternativ bewusst einen festen Takt als leichtere Stufe anbieten.
- **Bildfrequenz sauber:** keine 13-ms-Sperre, alle Bilder zeichnen; Bildfrequenz ermitteln und mitspeichern,
  Vergleiche nur am selben Gerät.
- **Sicherheit:** Tempo so begrenzen, dass das Ziel pro Bild höchstens ≈ 1° springt (bei 60 Hz ≈ 60°/s); kein
  Leuchtschein-Blitzen, keine großen hellen Ziele auf Schwarz; sichtbarer Pause-/Stopp-Knopf (auch am Tablet).
- **Tablet und Optiker-Bezug:** Tablet auf Ständer, ≈ 40 cm, Querformat; wählbares kleineres Bewegungsfeld (z. B.
  mittlere 20–30°) für Gleitsichtträger:innen; Hinweis „Kopf ruhig oder mitbewegen“ als bewusste Variante statt
  Verbot; Standardfarbe Weiß oder Gelb auf Dunkel statt Rot.
- **Ehrliche Texte:** keine „Elite/Profi“-Stufen, keine Hirnregion-, Muskel- oder Sportversprechen, kein „Test“.
- **Barrierefreiheit:** große Start-/Stopp-Flächen, Einstellungen deutsch/italienisch, kurze Blöcke mit
  Blinzelpause.

## 11. Quellen

### Von der Website angegeben

- Bahill, A. T., Iandolo, M. J., & Troost, B. T. (1980). Smooth pursuit eye movements in response to unpredictable
  target waveforms. *Vision Research, 20*(11), 923–931. https://doi.org/10.1016/0042-6989(80)90073-5 – **Prüfung:**
  DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (unvorhersagbare Bahnen verschlechtern die
  Folgebewegung, auch mit Ermüdung; die Zahlen 150–200 ms und 30°/s stammen nicht aus der zugänglichen Kurzfassung).
- Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of
  Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 – **Prüfung:** DOI stimmt ✓, Titel auf
  der Website leicht falsch („smooth *pursuit*“ statt „smooth *tracking*“); **stützt:** teilweise (Klassiker des
  Step-Ramp-Versuchs: Positionsfehler → Sakkade, Geschwindigkeitsfehler → Folgebewegung; Inhalt nur über
  Folgeliteratur eingeordnet; 150–200 ms für Korrektursakkaden während der Folgebewegung zu hoch, vgl. de Brouwer et
  al. 2002a).
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2),
  591–603. https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (ausgedehntes
  Netz, FEF mit direktestem Einfluss, Folgebewegung und Sakkaden aus gemeinsamer Kaskade; die „Arbeitsgrenze 30°/s“
  steht nicht darin, reale Obergrenze ≈ 100°/s nach Meyer et al. 1985).
- Robinson, D. A. (1965). The mechanics of human smooth pursuit eye movement. *The Journal of Physiology, 180*(3),
  569–591. https://doi.org/10.1113/jphysiol.1965.sp007718 – **Prüfung:** DOI stimmt ✓ (nur bibliografisch, kein
  Abstract); **stützt:** unklar/nein (ein „prädiktives Vorwärtsmodell des Kleinhirns, das die Latenz fast auf null
  senkt“ ist nicht Gegenstand dieser mechanischen Analyse; Vorhersage belegen z. B. Bahill & McDonald 1983, Barnes
  2008).
- Barnes, G. R. (2008). Cognitive processes involved in smooth pursuit eye movements. *Brain and Cognition, 68*(3),
  309–326. https://doi.org/10.1016/j.bandc.2008.08.020 – **Prüfung:** DOI stimmt ✓; **stützt:** ja für Vorhersage,
  extraretinale Signale und Aufmerksamkeit; nein für die Definition „dynamische Sehkraft“ und die Leistungsstufen.
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple
  reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:**
  DOI stimmt ✓; **stützt:** nein (einfache Reaktionszeit, N = 1 469, Hardware-Anteil ≈ 18 ms; nichts zu 144-Hz-
  Monitoren oder „10 ms früherer Korrektursakkade“).
- Nur im Fließtext, ohne Listeneintrag: „Yang et al., 2025“ – vermutlich Yang, L., Zhang, W., Li, P., Tang, H.,
  Chen, S., & Jin, X. (2025). The aiming advantages in experienced first-person shooter gamers: Evidence from eye
  movement patterns. *Computers in Human Behavior, 165*, 108573. https://doi.org/10.1016/j.chb.2025.108573 –
  **Prüfung:** DOI stimmt ✓, Zuordnung **unsicher**; **stützt:** teilweise (Querschnitt, N = 63: erfahrene
  Spieler zielen schneller, häufiger mit einer einzigen Sakkade, ohne Genauigkeitsvorteil; keine Trainingsstudie,
  nichts zu Ausweichmanövern; Inhalt laut Kurzfassung).
- Nur im Fließtext: „Appelbaum & Erickson, 2018“ – Appelbaum, L. G., & Erickson, G. (2018). Sports vision training: A
  review of the state-of-the-art in digital training techniques. *International Review of Sport and Exercise
  Psychology, 11*(1), 160–189. https://doi.org/10.1080/1750984X.2016.1266376 – **Prüfung:** DOI stimmt ✓ (online
  2016); **stützt:** nein (für klassische Augen-Übungen nur begrenzte, gemischte Belege; kein Beleg für Transfer auf
  Fußball oder Tennis).
- Nur im Fließtext: „Leigh & Zee, 2015“ – Leigh, R. J., & Zee, D. S. (2015). *The neurology of eye movements* (5th
  ed.). Oxford University Press. https://doi.org/10.1093/med/9780199969289.001.0001 – **Prüfung:** Buch, DOI stimmt ✓
  (Inhalt nicht eingesehen); **stützt:** unklar/nein (Standardwerk; die Behauptung „Kopfbewegung → Trainingseffekt
  geht verloren“ ist nicht belegt, natürliche Kopf-Augen-Folgebewegung ist genau, vgl. Lanman et al. 1978).
- Die Leistungsstufen-Tabelle beruft sich auf Bahill et al. (1980), Rashbass (1961), Krauzlis (2004) und Barnes
  (2008) – **keine** dieser Arbeiten enthält Tempo-Stufen, Normwerte oder die Angabe „1–2 Einzelbilder“.

### Weitere Fachliteratur

- Bahill, A. T., & McDonald, J. D. (1983). Smooth pursuit eye movements in response to predictable target motions.
  *Vision Research, 23*(12), 1573–1583. https://doi.org/10.1016/0042-6989(83)90171-2 – vorhersagbare Bahnen ohne
  Verzögerung
- Bargary, G., Bosten, J. M., Goodbourn, P. T., Lawrance-Owen, A. J., Hogg, R. E., & Mollon, J. D. (2017). Individual
  differences in human eye movements: An oculomotor signature? *Vision Research, 141*, 157–169.
  https://doi.org/10.1016/j.visres.2017.03.001 – Zuverlässigkeit von Augenbewegungsmaßen (mit Eyetracker)
- Barnes, G. R., Donnelly, S. F., & Eason, R. D. (1987). Predictive velocity estimation in the pursuit reflex
  response to pseudo-random and step displacement stimuli in man. *The Journal of Physiology, 389*, 111–136.
  https://doi.org/10.1113/jphysiol.1987.sp016649 – Gain-Abfall bei pseudo-zufälliger Bewegung
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A,
  29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Rot-Grün-Schwäche
- Bridges, D., Pitiot, A., MacAskill, M. R., & Peirce, J. W. (2020). The timing mega-study: Comparing a range of
  experiment generators, both lab-based and online. *PeerJ, 8*, e9414. https://doi.org/10.7717/peerj.9414 –
  Zeitgenauigkeit im Browser
- Carl, J. R., & Gellman, R. S. (1987). Human smooth pursuit: Stimulus-dependent responses. *Journal of
  Neurophysiology, 57*(5), 1446–1463. https://doi.org/10.1152/jn.1987.57.5.1446 – Anlaufzeit der Folgebewegung
  ≈ 100 ms
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of
  different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250.
  https://doi.org/10.1113/jphysiol.1984.sp015242 – Gain < 0,95, sinkt mit Geschwindigkeit; Sakkaden ergänzen
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002a). What triggers catch-up saccades during
  visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – Auslöser
  und Latenz (≈ 125 ms) von Aufholsakkaden
- de Brouwer, S., Missal, M., Barnes, G., & Lefèvre, P. (2002b). Quantitative analysis of catch-up saccades during
  sustained pursuit. *Journal of Neurophysiology, 87*(4), 1772–1780. https://doi.org/10.1152/jn.00621.2001 –
  Aufholsakkaden berücksichtigen die Zielbewegung
- Eibenberger, K., Ring, M., & Haslwanter, T. (2012). Sustained effects for training of smooth pursuit plasticity.
  *Experimental Brain Research, 218*(1), 81–89. https://doi.org/10.1007/s00221-012-3009-8 – Training mit
  quasi-zufälligem Ziel, Effekt nach 5 Tagen
- Engel, K. C., Anderson, J. H., & Soechting, J. F. (2000). Similarity in the response of smooth pursuit and manual
  tracking to a change in the direction of target motion. *Journal of Neurophysiology, 84*(3), 1149–1156.
  https://doi.org/10.1152/jn.2000.84.3.1149 – Auge und Hand reagieren gleich auf Richtungswechsel; Muskeln nicht
  begrenzend
- Fransen, J. (2024). There is no supporting evidence for a far transfer of general perceptual or cognitive training
  to sports performance. *Sports Medicine, 54*(11), 2717–2724. https://doi.org/10.1007/s40279-024-02060-x – kein
  Ferntransfer auf Sport
- Geri, G. A., & Morgan, W. D. (2007). The effect of FLCoS-display hold time on the perceived blur of moving imagery.
  *Journal of the Society for Information Display, 15*(1), 87–91. https://doi.org/10.1889/1.2451573 – Haltezeit
  bestimmt die wahrgenommene Bewegungsunschärfe
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate
  sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572.
  https://doi.org/10.3389/fphys.2025.1664572 – Effekte vor allem bei Test am Trainingsgerät
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when
  reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative
  Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – schmales Sehfeld der
  Gleitsichtbrille am Bildschirm
- Harding, G., Wilkins, A. J., Erba, G., Barkley, G. L., & Fisher, R. S. (2005). Photic- and pattern-induced seizures:
  Expert consensus of the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1423–1425.
  https://doi.org/10.1111/j.1528-1167.2005.31305.x – Blitz-Grenzwerte (≥ 3 Hz, ≥ 0,006 sr)
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement
  alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153.
  https://doi.org/10.1111/j.1475-1313.2006.00460.x – mehr Kopfbewegung bei neuer Gleitsichtbrille
- Kowler, E., Rubinstein, J. F., Santos, E. M., & Wang, J. (2019). Predictive smooth pursuit eye movements. *Annual
  Review of Vision Science, 5*, 223–246. https://doi.org/10.1146/annurev-vision-091718-014901 – Vorhersage und
  Hinweisreize bei der Folgebewegung
- Krauzlis, R. J., Basso, M. A., & Wurtz, R. H. (1997). Shared motor error for multiple eye movements. *Science,
  276*(5319), 1693–1695. https://doi.org/10.1126/science.276.5319.1693 – Colliculus superior kodiert gemeinsamen
  Fehler für Sakkade und Folgebewegung (Affen)
- Kuroki, Y., Nishi, T., Kobayashi, S., Oyaizu, H., & Yoshimura, S. (2007). A psychophysical study of improvements in
  motion-image quality by using high frame rates. *Journal of the Society for Information Display, 15*(1), 61–68.
  https://doi.org/10.1889/1.2451560 – Nutzen hoher Bildfrequenzen, Sättigung ≈ 240 Bilder/s
- Lanman, J., Bizzi, E., & Allum, J. (1978). The coordination of eye and head movement during smooth pursuit. *Brain
  Research, 153*(1), 39–53. https://doi.org/10.1016/0006-8993(78)91127-7 – Kopf-Augen-Folgebewegung genauso genau
  (Affen)
- Lisberger, S. G. (2010). Visual guidance of smooth-pursuit eye movements: Sensation, action, and what happens in
  between. *Neuron, 66*(4), 477–491. https://doi.org/10.1016/j.neuron.2010.03.027 – Netzwerk MT, FEF, Kleinhirn
- Madelain, L., & Krauzlis, R. J. (2003). Effects of learning on smooth pursuit during transient disappearance of a
  visual target. *Journal of Neurophysiology, 90*(2), 972–982. https://doi.org/10.1152/jn.00869.2002 – Lernen der
  Folgebewegung braucht Rückmeldung
- Mann, D. L., Spratford, W., & Abernethy, B. (2013). The head tracks and gaze predicts: How the world's best batters
  hit a ball. *PLoS ONE, 8*(3), e58289. https://doi.org/10.1371/journal.pone.0058289 – Kopfbewegung beim Verfolgen
  im Spitzensport
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision
  Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – Obergrenze ≈ 100°/s
- Morrow, M. J., & Sharpe, J. A. (1993). Smooth pursuit initiation in young and elderly subjects. *Vision Research,
  33*(2), 203–210. https://doi.org/10.1016/0042-6989(93)90158-S – schwächerer Anlauf im Alter
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5),
  M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – geringerer Gain und längere Sakkaden-Reaktionszeit im Alter
- Munoz, D. P., Broughton, J. R., Goldring, J. E., & Armstrong, I. T. (1998). Age-related performance of human
  subjects on saccadic eye movement tasks. *Experimental Brain Research, 121*(4), 391–400.
  https://doi.org/10.1007/s002210050473 – Sakkaden über die Lebensspanne
- Orban de Xivry, J.-J., & Lefèvre, P. (2007). Saccades and pursuit: Two outcomes of a single sensorimotor process.
  *The Journal of Physiology, 584*(1), 11–23. https://doi.org/10.1113/jphysiol.2007.139881 – Sakkaden und
  Folgebewegung als gemeinsamer Prozess
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink
  rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892.
  https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm
- Sheppard, A. L., & Wolffsohn, J. S. (2018). Digital eye strain: Prevalence, measurement and amelioration. *BMJ Open
  Ophthalmology, 3*(1), e000146. https://doi.org/10.1136/bmjophth-2018-000146 – digitale Augenbelastung
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L.
  (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186.
  https://doi.org/10.1177/1529100616661983 – Transfer von Hirntraining
- Soechting, J. F., Mrotek, L. A., & Flanders, M. (2005). Smooth pursuit tracking of an abrupt change in target
  direction: Vector superposition of discrete responses. *Experimental Brain Research, 160*(2), 245–258.
  https://doi.org/10.1007/s00221-004-2010-2 – Reaktion auf abrupten Richtungswechsel (90 ms / 130 ms)
- Spjut, J., Boudaoud, B., Binaee, K., Kim, J., Majercik, A., McGuire, M., Luebke, D., & Kim, J. (2019). Latency of
  30 ms benefits first person targeting tasks more than refresh rate above 60 Hz. In *SIGGRAPH Asia 2019 Technical
  Briefs* (S. 110–113). ACM. https://doi.org/10.1145/3355088.3365170 – Latenz wichtiger als Bildfrequenz
- World Wide Web Consortium. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2*, Erfolgskriterien 2.2.2, 2.3.1,
  2.3.2 (Norm, keine DOI). https://www.w3.org/TR/WCAG22/ – Blitz-Flächenschwelle und Pause-Pflicht (Inhalt in
  docs/wissenschaft/03 geprüft)
