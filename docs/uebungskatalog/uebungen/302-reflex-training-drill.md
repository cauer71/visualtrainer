---
# ===== Kennung =====
nr: 302
kennung: reflex-training-drill
name: "Mehrere Ziele abräumen – Reihenfolge selbst wählen"
name_original: "Reaktionstest: Mehrere Ziele (Seitentitel: Reaktionstest: Mehrere Ziele | SkillDrills)"
kapitel: "Reaktionsgeschwindigkeit"
kapitel_original: "reaction-speed"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/reaction-speed/reflex-training-drill"
blickfit_umsetzung: {kennung: "ziele-abraeumen", name: "Ziele abräumen", unterschiede: "Tablet-Umsetzung für Touch: große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/ziele-abraeumen/)."}
stand: 2026-09-30

# ===== Überblick =====
kurzbeschreibung: "Zwei bis fünf Kreise liegen gleichzeitig auf dem Bildschirm, jeder mit einem Ring, der seine Restzeit zeigt. Man tippt sie in beliebiger Reihenfolge weg, bevor der Ring leer ist; danach erscheint ein neuer Kreis an anderer Stelle. Mit besserer Trefferquote werden die Kreise zahlreicher und kleiner, die Zeit je Kreis wird kürzer. Gemessen wird der Abstand zwischen zwei Treffern, keine Reaktionszeit."
ziel_funktionen: [auge_hand_koordination, zielbewegung_tempo]
eingabe: [maus, touch, touchpad]
tablet_geeignet: mit_anpassung
dauer_sekunden: 45
schwierigkeit_anpassung: "Automatisch, nie rückläufig: Level = Punkte / 1.750 + 1. Laut Code sinken von Level 1 bis 15 Zielradius 26 → 11,5 px, Lebensdauer 1.900 → 546 ms, Nachschubabstand 220 → 68 ms und Trefferzugabe 14 → 5 px; gleichzeitige Ziele 2 → 5 (ab Level 17: 6, ab Level 21: 7). Eine Serie (Combo) verschärft zusätzlich bis −25 % Radius, −30 % Lebensdauer und −50 % Trefferzugabe. Die Rundendauer ist variabel: 45 s Startguthaben, +2 s je Treffer (höchstens 60 s), −1 s je Fehler/Ablauf."
messgroessen: ["Punkte", "Genauigkeit = Treffer / (Treffer + Fehlklicks + abgelaufene Ziele)", "'Ø Reaktion' = Zeit vom Erscheinen bis zum Treffer, nur getroffene Ziele (keine echte Reaktionszeit)", "höchstes Level, maximale Combo", "sinnvoll: abgelaufene Ziele je Level, Bewegungszeit je Fitts-Schwierigkeit, Reihenfolgefehler (jüngeres statt ältestes Ziel)"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 2
    nutzbares_sehfeld: 2
    blickfolge: 0
    sakkaden: 2
    fixation: 0
    bewegungswahrnehmung: 0
    visuelle_suche: 1
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 1
    geteilte_aufmerksamkeit: 2
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 1
    verarbeitungsgeschwindigkeit: 2
    antizipation: 1
    entscheidung_wahlreaktion: 2
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 3
    zielbewegung_tempo: 3
    zielbewegung_praezision: 2
    kontinuierliche_steuerung: 0
    ruhige_hand: 1
    fingergeschwindigkeit: 1
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
voraussetzungen: ["Maus, Touchpad oder Touchscreen; Maus auf ruhiger Unterlage", "Kreise unterschiedlicher Größe erkennen (sie sind auch auf der höchsten Stufe deutlich über der Auflösungsgrenze)", "passende Korrektion für den Bildschirmabstand über das ganze Feld", "kein Farbsehen nötig (die Kreise unterscheiden sich durch Zeichen)", "eine Minute konzentriert tippen können"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, presbyopie_gleitsicht, gesichtsfeldausfall, sehbehinderung_niedriger_visus, nystagmus, trockenes_auge_bildschirm, tremor_parkinson, hand_arm_beschwerden, kognitive_einschraenkung, aufmerksamkeitsprobleme]
geeignet_fuer: ["schnelle Folgen von Blick-Zeige-Bewegungen zu verstreut erscheinenden Zielen üben", "mehrere Ziele im Blick behalten und eine sinnvolle Reihenfolge wählen (älteste bzw. nächste zuerst)", "spielerische Übung mit steigendem Tempo für Jugendliche und Erwachsene mit Freude an Zeitdruck", "Vorstufe zu Aim-Übungen mit mehreren Zielen (502, 510, 702) – nicht in derselben Einheit"]
weniger_geeignet_fuer: ["Messung der Reaktionszeit (gemessen wird der Abstand zwischen zwei Treffern, inklusive Wahl der Reihenfolge)", "Menschen, die ohne Zeitdruck üben sollen oder möchten", "Gleitsichtträger:innen im Vollbild am großen Monitor", "Ältere oder Einsteiger:innen auf hohen Stufen (kleine Kreise, kurze Zeit je Kreis)", "reine Blickübungen ohne Handeinsatz"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Diese Übung wurde nie untersucht; bei ähnlichen Zeige- und Aim-Aufgaben verbessert man sich durch Übung deutlich (auch durch Gewöhnung an Gerät und Strategie), Effekte auf unähnliche Tests sind viel kleiner und ein Nutzen für Sport, E-Sport oder Alltag ist nicht belegt (Guo et al. 2025; Simons et al. 2016; Fransen 2024)."
aehnliche_uebungen: [502, 510, 702, 708, 804, 501, 303, 306, 307, 308, 801, 204, 103, 101, 503, 202]
stichworte: ["Mehrzielsuche", "Zielpriorisierung", "Klickfolge", "Auge-Hand-Koordination", "Fitts'sches Gesetz", "Zeitdruck", "Lebensdauer der Ziele", "Combo", "Hick-Hyman", "Aim-Training", "Touch", "kein Reaktionstest"]
---

# 302 · Mehrere Ziele abräumen – Reihenfolge selbst wählen

> Original: „Reaktionstest: Mehrere Ziele“ – skilldrills.online, Kapitel Reaktionsgeschwindigkeit (`reaction-speed`) · Blickfit: noch nicht umgesetzt (verwandt: `zielfang`, `blitzreaktion`, `zahlenjagd`)

## 1. Kurzbeschreibung

Auf dem Bildschirm liegen gleichzeitig zwei bis fünf ruhende Kreise, jeder mit einem Ring, der seine Restzeit anzeigt, und
mit einem eigenen Zeichen (Dreieck, Quadrat, Raute, Plus, Stern). Man tippt sie in beliebiger Reihenfolge weg, bevor ihr
Ring leer ist; wird ein Kreis weggetippt oder läuft er ab, erscheint nach kurzer Pause ein neuer an anderer Stelle. Der
Ring zeigt, welcher Kreis am dringendsten ist, sodass die Reihenfolge eine Entscheidung ist und keine Gedächtnisaufgabe.
Mit besserer Trefferquote werden die Kreise zahlreicher und kleiner, und die Zeit je Kreis wird kürzer; bei vielen
Fehlern geht die Stufe wieder zurück. Die Sitzung hat eine feste Dauer von einer Minute. Ein Tipp neben jeden Kreis wird
mit einem weichen Symbol markiert, ohne Blitz und ohne Wackeln. Gemessen wird der Abstand zwischen zwei Treffern
(Median), keine Reaktionszeit: Die Wahl der Reihenfolge steckt darin.

## 2. Ablauf im Original (Analyse)

Grundlage: Seitentext und ausgelieferter Spielcode (Chunk `11411-…js` mit gemeinsamen Modulen für Schwierigkeit, Combo, Strafe und Zeichnen; geprüft am 29.09.2026, nur Mechanik übernommen). Winkel = **eigene Rechnung** (Monitor 24″ Full-HD in 60 cm ≈ 37,8 px/°; Tablet 11″ in 40 cm ≈ 36,4 CSS-px/°).

- **Ablauf:** Start → Countdown 3-2-1-GO (≈ 2,45 s, Töne) → Spiel → Ergebnis (Punkte, Genauigkeit, Ø Reaktion, Treffer, Fehlklicks, Abläufe, höchstes Level, maximale Combo, Buchstabennote). Escape, Vollbild-Ende oder Tabwechsel brechen ab.
- **Spielfeld:** 16:9 in der Seite (Handy hochkant 3:4) oder Vollbild, Grund #050508. Ziele entstehen im inneren Bereich (13 % Rand seitlich, 17 % oben/unten) mit Mindestabstand 1,8 × Radiensumme – im Vollbild am Monitor ≈ 36°, am Tablet quer ≈ 24° breit.
- **Ziele:** rote Kreise (#ef4444) mit weißem Mittelpunkt, **ruhend und ohne Anzeige der Restzeit**. Das Ablaufen hängt an einer seitenübergreifend im Browser gespeicherten Einstellung (`skilldrills_timeout_enabled`, Standard: an), für die es auf dieser Seite keinen Schalter gibt; wurde sie auf einer anderen Übungsseite ausgeschaltet, laufen die Ziele hier nicht ab (Code, nicht im Spiel geprüft). Bei Touch, Fenster < 768 px oder Mobilgerät: Radius +2 px, unsichtbare Trefferzugabe +10 px.
- **Schwierigkeit:** Fortschritt p = (Level − 1)/14, exponentieller Abfall (Formel wie Literaturbasis W03, über Level 15 hinaus weiter). Level = Punkte/1.750 + 1, sinkt nie.

| Level (Punkte) | Ø Ziel Monitor | Lebensdauer | Nachschub | Trefferzone Ø | gleichzeitig |
|---|---|---|---|---|---|
| 1 (0) | 52 px ≈ 1,4° | 1.900 ms | 220 ms | 80 px ≈ 2,1° | 2 |
| 5 (7.000) | 44 px ≈ 1,2° | 1.540 ms | 180 ms | 67 px | 3 |
| 9 (14.000) | 35 px ≈ 0,9° | 1.099 ms | 130 ms | 52 px | 4 |
| 15 (24.500) | 23 px ≈ 0,6° | 546 ms | 68 ms | 33 px ≈ 0,9° | 5 |
| 21 (35.000) | 18 px ≈ 0,5° | 303 ms | 41 ms | 26 px | 7 |

- **Combo:** Faktor 1,1/1,25/1,35/1,5/1,75/2/2,5/3,0 ab 3/5/7/10/15/20/30/50 Treffern in Folge; Punkte je Treffer = 100 × Faktor × (1 + 0,5 p). Bei Faktor 3,0 zusätzlich Radius × 0,75, Lebensdauer/Nachschub × 0,7, Trefferzugabe × 0,5 (Level 15: 382 ms, Ø 17 px ≈ 0,46°). Fehler/Ablauf: Combo 0, Bildwackeln (6 px), Ton, **roter Fehlerblitz**.
- **Zeit:** Start 45 s, **+2 s je Treffer** (max. 60 s), **−1 s je Fehlklick und Ablauf**. Ab > 1 Treffer pro 2 s verlängert sich die Runde; *eigene Abschätzung* (nicht gemessen): meist ≈ 1–3 min.
- **Eingabe/Timing:** Pointer beim Drücken (Maus, Stift, Finger; mehrere Finger einzeln). Keine Tastatur. Uhr und Lebensdauer mit `performance.now()` bzw. Bildzeit (dt); nur Partikel und Wackel-Abklingen laufen pro Bild (optisch).
- **Note:** 100 × √(Punkte/18.000) → „S+ LEGENDARY“ ab 16.245 Punkten; Teilen-Karte „ELITE REFLEX“.

**Widersprüche Regeltext ↔ Code:** (1) „+0,6 s“ je Treffer – Code +2 s. (2) „Standard ohne Zeitstrafe“ bzw. „−0,8 s Strafe“ – Code zieht **immer** 1 s ab, auf dieser Seite nicht abschaltbar. (3) „Bald ablaufende Ziele zuerst“ – die Restzeit ist unsichtbar, nur über die gemerkte Reihenfolge erschließbar. (4) „Combo: mehr Ziele“ – die Zielzahl hängt nur vom Level ab. (5) „Salven“ – fortlaufendes Nachfüllen; salvenartig erst ab ≈ Level 13 (Nachschub < 90 ms).

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite beschreibt Mehrzielsuche, Priorisierung, geteilte Aufmerksamkeit und präzise Klickfolgen für Gamer, Esportler und Sportler. Sie nennt Hick nur als „Orientierung“, sagt, der Score sei kein „klinischer Reflexwert“, Display/Browser/Eingabe wirkten mit und Transfer könne „aufgabenspezifisch bleiben“; die Leistungsreferenz (Ø Reaktion über 330 ms bis unter 180 ms, Genauigkeit < 72 … ≥ 98 %) ist als „redaktionell, keine Norm“ markiert. Das ist zurückhaltend und weitgehend korrekt. Einordnung:

- **Hick passt nur begrenzt:** Bei direktem Zeigen auf sichtbare Ziele ist der Anstieg mit der Zahl der Alternativen nahezu flach (Proctor & Schneider, 2018). Die roten Punkte springen ohne Ablenker heraus; Suche im engeren Sinn (Ziel zwischen Ablenkern; Wolfe, 2001) findet kaum statt. Die Last liegt in Reihenfolge und Bewegungsplanung.
- **„Ø Reaktion“ ist keine Reaktionszeit:** gemessen wird Erscheinen → Treffer inklusive Wartezeit, abgelaufene Ziele fehlen. Da die Lebensdauer mit dem Level sinkt, „verbessert“ sich der Mittelwert allein durch den Levelanstieg (Auswahleffekt, eigene Analyse). Die Bänder bis < 180 ms haben keinen Bezug zur einfachen Reaktionszeit (kalibriert 231 bzw. 213 ms; Woods et al., 2015). Tempo und Genauigkeit gemeinsam zu lesen ist richtig (Heitz, 2014).
- **Noten „LEGENDARY“/„ELITE REFLEX“** beruhen nur auf dem Punktestand, ohne Datengrundlage.
- **„Dringend zuerst“** läuft vermutlich der Wahrnehmung entgegen: Neu erscheinende Reize ziehen Aufmerksamkeit an (Yantis & Jonides, 1984), ruhende alte Objekte können bei der Suche ausgeblendet werden (Watson & Humphreys, 1997; dort alte Ablenker, nicht alte Ziele – die Übertragung auf diese Aufgabe ist eine Annahme).

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Die Kreise sind für normale Sehschärfe groß; auf der letzten Stufe sind sie kleiner, aber weiterhin
  deutlich über der Auflösungsgrenze. Zur Orientierung: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°.
  Begrenzend ist die schnelle Entdeckung außerhalb der Blickmitte, nicht das Detail. Die Kreise unterscheiden sich durch
  Zeichen und nicht nur durch Farbe; bei Rot-Grün-Schwäche bleiben sie unterscheidbar.
- **Blick vor Hand:** Die Sakkade zu einem neuen Ziel beginnt etwa 250 ms nach dem Reiz, die Hand folgt rund 100 ms später
  (Prablanc et al., 1979). In Handlungsfolgen springt der Blick oft schon zum nächsten Objekt (Land & Hayhoe, 2001), doch
  während einer Zeigebewegung wird eine Sakkade zu einem neuen Ziel um etwa 155 ms aufgeschoben, bis die Hand abbremst
  (Neggers & Bekkering, 2000). „Beim Tippen schon weiter scannen“ geht also nur begrenzt; neue Kreise müssen oft
  peripher entdeckt werden.
- **Gesichtsfeld:** Die Kreise erscheinen über das ganze Feld verteilt. Gesichtsfeldausfälle lassen sich nach dem
  Verlauf der Sehbahn einordnen: Vor der Kreuzung der Sehnerven sind sie meist einäugig, an der Kreuzung betreffen sie
  ungleichseitig je eine Hälfte beider Gesichtsfelder, hinter der Kreuzung gleichseitig (Muchnick, 2008, S. 32). Kreise in
  einem ausgefallenen Bereich laufen unbemerkt ab. Die Übung ersetzt keine Untersuchung: Ein Ausfall kann bei der Prüfung
  auffallen, ohne dass Beschwerden bestanden (Fallbeispiel bei Muchnick, 2008, S. 5).
- **Gleitsicht und Alterssichtigkeit:** Das Feld ist breiter als die klare Zone von Gleitsichtgläsern (13° bzw. 18°
  horizontal bei zwei untersuchten Designs, 60 cm Abstand; Han et al., 2003): seitliche Kreise erscheinen unscharf oder
  verlangen eine Kopfdrehung, untere liegen im Nahteil. Hilfreich sind eine Bildschirmbrille, ein kleineres Fenster und
  ein etwas tiefer stehender Bildschirm; Tablet in etwa 35–40 cm mit Nahkorrektur (Presbyope halten Smartphones weiter weg
  und wählen größere Schrift; Boccardo et al., 2023).
- **Trockenes Auge:** Am Bildschirm sinkt die Blinzelrate im Mittel auf etwa ein Fünftel (Patel et al., 1991).
- **Bildschirm und Latenz:** Ein neuer Kreis wartet bei 60 Hz im Mittel 8 ms (höchstens 17 ms) auf das nächste Bild.
  Ende-zu-Ende vom Mausklick bis zum Bild im besten Laboraufbau 21–37 ms (1.000-Hz-Maus, 120 bzw. 60 Hz), beim Tippen auf
  dem Tablet 48–276 ms je nach Gerät und Programmierumgebung (Casiez et al., 2017).

## 5. Neurowissenschaftliche Grundlagen

Zu dieser Aufgabe gibt es keine Bildgebungs- oder Trainingsstudie. Drei gut untersuchte Mechanismen greifen ineinander:
(1) **Aufmerksamkeitsfang durch plötzliches Erscheinen** (Yantis & Jonides, 1984); (2) **Vorrang für Neues** – bereits
sichtbare ruhende Objekte können aktiv ausgeblendet werden; das beansprucht Aufmerksamkeit und lässt unter Zusatzlast
nach (Watson & Humphreys, 1997, an Ablenkern untersucht); vermutlich erschwert das den Zugriff auf den ältesten Kreis,
weshalb der Ring die Restzeit sichtbar macht; (3) **Blick-Hand-Kopplung** – der Blick wird während des Zeigens am Ziel
gehalten (Neggers & Bekkering, 2000) und in Handlungsfolgen planvoll, kaum nach Auffälligkeit, zum nächsten Objekt
gelenkt (Land & Hayhoe, 2001). Hinzu kommt der Folgefehler der Mehrzielsuche: Nach einem gefundenen Ziel werden weitere
häufiger übersehen (Adamo et al., 2013; untersucht an Suche zwischen Ablenkern, hier ohne Ablenker vermutlich
schwächer). „Trainiert Region X“ lässt sich daraus nicht ableiten.

Die eigentliche Entscheidung ist die **Reihenfolge**: Mehrere sichtbare Ziele sind Alternativen, doch beim direkten Zeigen auf
sichtbare Ziele steigt die Wahlzeit mit der Zahl der Alternativen kaum (Hick, 1952; Proctor & Schneider, 2018).

## 6. Motorische Grundlagen

- **Fitts:** Die Bewegungszeit steigt mit log₂(2A/W) aus Weg A und Zielbreite W (Fitts, 1954). Mit kleineren Kreisen und
  kürzerer Zeit je Kreis steigen die Anforderungen an Tempo und Genauigkeit; weit entfernte Kreise sind auf hohen Stufen
  kaum noch zu erreichen. Hohe Stufen prüfen daher zunehmend die Strategie (nahe Kreise zuerst, Hand in der Mitte) und
  den Zufall der Position. Der Durchsatz der Maus liegt bei 3,7–4,9 bit/s (Soukoreff & MacKenzie, 2004).
- **Zielbewegung und Folgen:** Auf einen schnellen Anfangsimpuls folgt eine visuelle Endkorrektur (Elliott et al., 2010);
  die erste Bewegung einer Folge wird langsamer, wenn die zweite mitgeplant wird (Adam et al., 2000). Hektik senkt die
  Genauigkeit (Heitz, 2014).
- **Touch und Maus:** Touch verkürzte die Bewegungszeit bei Älteren um 35 %, bei Jüngeren um 16 % (Findlater et al.,
  2013). Die Trefferfläche ist größer als der sichtbare Kreis und hat einen Radius von mindestens 24 px; bei üblicher
  Darstellung liegt sie damit über der für Daumenbedienung empfohlenen Zielgröße von 9,2 mm (Parhi et al., 2006). Auf
  kleinen Bildschirmen verdeckt die Hand zudem Teile des Feldes.
- **Tremor:** physiologisch etwa 8–12 Hz, bei Parkinson 3–6 Hz (McAuley & Marsden, 2000); kleine Ziele und häufiges
  Tippen belasten zitternde oder schmerzende Hände.

## 7. Einflussfaktoren und Messgrenzen

- **Gerät:** Browser-Messungen enthalten 58–133 ms Geräteanteil (Pronk et al., 2020); Monitor und Tablet unterscheiden
  sich zusätzlich in Sehwinkel, Wegen und Trefferfläche. Sinnvoll ist nur der Vergleich mit sich selbst am selben Gerät.
  Messungen am Menschen streuen von Durchgang zu Durchgang; deshalb dienen der Median und die Quote über viele Kreise,
  und nur der Verlauf über mehrere Sitzungen ist aussagekräftig (Mountford et al., 2004, S. 43–44).
- **Zufall:** Zufällige Positionen lassen die Fitts-Schwierigkeit stark schwanken; die Stufe passt sich nach Erfolg an
  (steigt nach drei Treffern in Folge, sinkt nach einem Fehler), nicht nach Punkten.
- **Messgrößen:** Gemessen wird der Abstand zwischen zwei Treffern (Median; Abstände über 4 s zählen nicht), die Zahl
  abgeräumter und abgelaufener Kreise sowie daneben getippter Tipps. Die Wahl der Reihenfolge steckt im Abstand; eine
  Reaktionszeit wird nicht gemessen. Kennzahlen von Zielübungen können sehr zuverlässig sein (ICC 0,947–0,995 in einer
  Pilotstudie mit 10 E-Sportlern); signifikante Verbesserungen zwischen zwei Terminen traten nur in einer von vier
  Aufgaben auf (Rogers et al., 2024).
- **Alter:** Das reine Entdecken ist altersunabhängig (etwa 131 ms), die motorischen Anteile verlangsamen sich (Woods et
  al., 2015); in den ersten Sitzungen dominieren Gewöhnung und Strategie.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt (stark):** Zeige- und Zielaufgaben werden durch Wiederholung schneller und genauer; Übung flacht auch
  Wahlkosten ab (Proctor & Schneider, 2018). Bei digitalem Sport-Sehtraining war der Reaktionseffekt in trainingsähnlichen
  Tests gut fünfmal so groß wie in unähnlichen (SMD 2,66 vs. 0,50; Guo et al., 2025).
- **Naher Transfer (schwach):** keine Studie zu dieser Übung; Meta-Analysen zu Actionspielen widersprechen sich (Bediou
  et al., 2018: g = 0,34 mit Publikationsbias; Sala et al., 2018: kleine bis keine Effekte).
- **Alltagstransfer (fehlend):** kein Beleg für Sport, E-Sport, Verkehr oder Beruf; ein Ferntransfer allgemeiner
  Wahrnehmungs- und Kognitionstrainings auf Sport ist nicht belegt (Fransen, 2024; Simons et al., 2016).

## 9. Auswahlhinweise

- **Passt, wenn …** schnelle Blick-Zeige-Folgen zu verstreuten Zielen geübt werden sollen, mehrere Ziele im Blick
  behalten und eine Reihenfolge gewählt werden soll, jemand Freude an Tempo hat; als Aufwärmen vor Zielübungen.
- **Weniger passend, wenn …** eine Reaktionszeit gefragt ist (101/Blitzreaktion), Impulskontrolle geübt werden soll
  (keine Nicht-Reagieren-Reize; 102/Stopp & Los), symbolische Wahlreaktion gemeint ist (202/Pfeil-Duell) oder ruhig ohne
  Zeitdruck geübt werden soll (204/Zahlenjagd).
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: Die Übung kommt ohne Blitze, Wackeln und rote Warneffekte
    aus; ein Fehler wird mit einem weichen Symbol markiert. Bei bekannter Lichtempfindlichkeit dennoch kurze Serien.
  - `presbyopie_gleitsicht`: breites Feld, Ziele oben, unten und seitlich – kleineres Fenster, Bildschirmbrille.
  - `gesichtsfeldausfall`, `sehbehinderung_niedriger_visus`: Kreise erscheinen überall; Kreise im ausgefallenen Bereich
    laufen unbemerkt ab.
  - `nystagmus`: viele kurze Fixationen auf kleine Ziele unter Zeitdruck sind erschwert – niedrige Stufe oder Übungen ohne
    Zeitdruck.
  - `trockenes_auge_bildschirm`: seltenes Blinzeln bei schnellen Aufgaben; kurze Runden, Pausen.
  - `tremor_parkinson`, `hand_arm_beschwerden`: häufiges Tippen, kleine Ziele.
  - `kognitive_einschraenkung`, `aufmerksamkeitsprobleme`: Zeitdruck – eher als Spiel auf niedriger Stufe, nicht als
    Test.
  - Doppelbilder, plötzlicher einseitiger Sehverlust, Kopfschmerz mit Sehverschlechterung, Schwindel oder Zittern sind
    Anlass zur ärztlichen Abklärung und kein Übungsthema (Muchnick, 2008, S. 6, 28).
- **Kombiniert gut mit …** 101 (Reaktion ohne Zielbewegung), 204 (Reihenfolge ohne Zeitdruck), 801 (Randziele bei ruhigem
  Blick), 404 (ruhige Blickfolge als Gegenpol).
- **Überschneidungen:** Keine Dublette in der Gruppe; am nächsten ist 306 (mehrere Ziele gleichzeitig, dort fallend statt
  ruhend). Ruhende Ziele zeigen 302, 303, 307 und 308, bewegte 304, 305 und 306; pro Einheit höchstens eine davon
  vorschlagen, allenfalls eine zweite mit anderem Schwerpunkt. Mit 101 und 503 teilt 302 den Zeitdruck, dort aber mit
  festem Reizort und echter Reaktionszeit; mit 202 die Auswahl (dort nach Regel, hier nach Reihenfolge). 502, 510, 702,
  708 und 804 stellen ähnliche Zielaufgaben mit anderer Anordnung – nicht mehrere davon hintereinander vorschlagen.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Restzeit sichtbar machen** (schrumpfender Ring) – sonst ist „dringend zuerst“ eine Gedächtnisaufgabe; beide Varianten können Stufen sein, müssen aber benannt werden.
- **Ehrliche Messgrößen:** Bewegungszeit ab vorigem Treffer, Abläufe je Level, Genauigkeit; keine „Reaktion“ aus Wartezeiten, keine Noten wie „LEGENDARY“.
- **Feste Rundendauer** (z. B. 60 s) statt Zeitgutschrift; Level adaptiv nach Ablaufquote in beide Richtungen statt an Combo-Punkte gekoppelt.
- **Kein roter Blitz, kein Wackeln:** dezente, farbunabhängige Rückmeldung (Symbol + Ton), WCAG 2.3.1 einhalten.
- **Tablet zuerst:** Trefferzone ≥ 9–10 mm, Ziele nicht unter ≈ 0,5°, Feld auf ≈ 20–25° Breite begrenzen (Gleitsicht), nicht unter der Hand entstehen lassen.
- **DE/IT, keine Gesundheitsversprechen:** „Übung“ statt „Reaktionstest“/„Reflex-Training“.

## 11. Quellen

### Von der Website angegeben

- Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology, 4*(1), 11–26. https://doi.org/10.1080/17470215208416600 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (gilt für symbolische Wahlreaktionen; bei direktem Zeigen auf sichtbare Ziele nahezu flach, Proctor & Schneider 2018; die Seite nennt Hick selbst nur „Orientierung“).
- Donders, F. C. (1969). On the speed of mental processes (Übersetzung der Arbeit von 1868). *Acta Psychologica, 30*, 412–431. https://doi.org/10.1016/0001-6918(69)90065-1 – **Prüfung:** DOI stimmt ✓ (Übersetzung 1969); **stützt (für diese Übung):** nein (nicht verwendet; Prüfung der Quelle: ja) (einfache und Wahlreaktion als verschiedene Verarbeitungsstufen; Inhalt über Sekundärquellen).
- Kosinski, R. J. (2008). *A literature review on reaction time.* Clemson University – **Prüfung:** keine DOI, unbegutachtetes Online-Skript; auffindbar nur die Fassung 2013 (http://www.cognaction.org/cogs105/readings/clemson.rt.pdf); **stützt (für diese Übung):** nein (nicht verwendet; Prüfung der Quelle: teilweise) (nennt 180–200 ms für Licht bei Studierenden, am Computer an der Clemson University eher ≈ 268 ms; für die Übungsbänder ohne Bezug).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓ (Volltext); **stützt:** ja für „Hardware beeinflusst den Score“ (bis zu 100 ms, dort nach Neath et al. 2011 zitiert), nein für die Übungsbänder (nur einfache RT, 231 bzw. 213 ms).

### Weitere Fachliteratur

Alle DOIs am 29.09.2026 per Crossref geprüft; Inhalte über PubMed-Abstracts bzw. die Literaturbasis W03.

- Adam, J. J., Nieuwenstein, J. H., Huys, R., Paas, F. G. W. C., Kingma, H., Willems, P., & Werry, M. (2000). Control of rapid aimed hand movements: The one-target advantage. *Journal of Experimental Psychology: Human Perception and Performance, 26*(1), 295–312. https://doi.org/10.1037/0096-1523.26.1.295 – Zielbewegungen in Folgen.
- Adamo, S. H., Cain, M. S., & Mitroff, S. R. (2013). Self-induced attentional blink: A cause of errors in multiple-target search. *Psychological Science, 24*(12), 2569–2574. https://doi.org/10.1177/0956797613497970 – Folgefehler bei Mehrzielsuche.
- Findlater, L., Froehlich, J. E., Fattal, K., Wobbrock, J. O., & Dastyar, T. (2013). Age-related differences in performance with touchscreens compared to traditional mouse input. In *Proceedings of CHI '13* (S. 343–346). ACM. https://doi.org/10.1145/2470654.2470703 – Touch vs. Maus nach Alter.
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – Fitts'sches Gesetz.
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Übungs- vs. Transfereffekte.
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm.
- Land, M. F., & Hayhoe, M. (2001). In what ways do eye movements contribute to everyday activities? *Vision Research, 41*(25–26), 3559–3565. https://doi.org/10.1016/S0042-6989(01)00102-X – Blick führt Handlungsfolgen.
- Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. *Journal of Neurophysiology, 83*(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639 – Blickverankerung (+155 ms).
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of MobileHCI '06* (S. 203–210). ACM. https://doi.org/10.1145/1152215.1152260 – Touch-Zielgröße.
- Prablanc, C., Echallier, J. F., Komilis, E., & Jeannerod, M. (1979). Optimal response of eye and hand motor systems in pointing at a visual target. I. *Biological Cybernetics, 35*(2), 113–124. https://doi.org/10.1007/BF00337436 – Auge vor Hand.
- Proctor, R. W., & Schneider, D. W. (2018). Hick's law for choice reaction time: A review. *Quarterly Journal of Experimental Psychology, 71*(6), 1281–1299. https://doi.org/10.1080/17470218.2017.1322622 – Grenzen von Hick, Kompatibilität, Übung.
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Geräteanteil im Browser.
- Soukoreff, R. W., & MacKenzie, I. S. (2004). Towards a standard for pointing device evaluation, perspectives on 27 years of Fitts' law research in HCI. *International Journal of Human-Computer Studies, 61*(6), 751–789. https://doi.org/10.1016/j.ijhcs.2004.09.001 – Maus-Durchsatz.
- Watson, D. G., & Humphreys, G. W. (1997). Visual marking: Prioritizing selection for new objects by top-down attentional inhibition of old objects. *Psychological Review, 104*(1), 90–122. https://doi.org/10.1037/0033-295X.104.1.90 – Vorrang für neue Objekte.
- Yantis, S., & Jonides, J. (1984). Abrupt visual onsets and selective attention: Evidence from visual search. *Journal of Experimental Psychology: Human Perception and Performance, 10*(5), 601–621. https://doi.org/10.1037/0096-1523.10.5.601 – Aufmerksamkeitsfang durch neue Reize.
- Ergänzend zitiert (Kurzangaben): Bediou et al. (2018), https://doi.org/10.1037/bul0000130 · Boccardo et al. (2023), https://doi.org/10.1371/journal.pone.0282947 · Casiez et al. (2017), https://doi.org/10.1145/3126594.3126606 · Elliott et al. (2010), https://doi.org/10.1037/a0020958 · Fransen (2024), https://doi.org/10.1007/s40279-024-02060-x · Heitz (2014), https://doi.org/10.3389/fnins.2014.00150 · McAuley & Marsden (2000), https://doi.org/10.1093/brain/123.8.1545 · Patel et al. (1991), https://doi.org/10.1097/00006324-199111000-00010 · Rogers et al. (2024), https://doi.org/10.3389/fspor.2024.1309991 · Sala et al. (2018), https://doi.org/10.1037/bul0000139 · Simons et al. (2016), https://doi.org/10.1177/1529100616661983 · Wolfe (2001), https://doi.org/10.3758/BF03194406 · W3C (2024), *WCAG 2.2*, Kriterium 2.3.1, https://www.w3.org/TR/WCAG22/ (Norm, keine DOI).
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Gesichtsfeldausfälle nach Sehbahnverlauf; Warnzeichen mit ärztlichem Abklärungsbedarf (Kap. 1, S. 5–6; Kap. 3, S. 28, 32)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Wiederholbarkeit von Messungen am Auge, Mehrfachmessung (S. 43–44)
