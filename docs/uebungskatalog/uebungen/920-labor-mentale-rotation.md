---
# ===== Kennung =====
nr: 920
kennung: labor-mentale-rotation
name: "Mentale Rotation (gedrehte Figur: dieselbe oder ihr Spiegelbild?)"
name_original: "– (eigene Blickfit-Übung, Labor, kein Vorbild)"
kapitel: "Labor"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "labor-mentale-rotation", name: "Mentale Rotation", unterschiede: "eigene Labor-Übung mit Einstellungen"}
stand: 2026-10-05

# ===== Überblick =====
kurzbeschreibung: "Links steht eine flache Figur aus Quadraten, rechts eine gedrehte Figur. Man entscheidet, ob sie nur gedreht ist („Gleich“) oder ihr Spiegelbild („Gespiegelt“). Zahl der Aufgaben, Quadrate pro Figur, Drehwinkel (Vielfache von 90° oder 45°), Quadratgröße und ein optionales Zeitlimit stellt man selbst ein. Hauptwert ist die Genauigkeit; dazu kommen Antwortzeit und ihr Anstieg mit dem Drehwinkel."
ziel_funktionen: [kurzzeitgedaechtnis_visuell_raeumlich, arbeitsgedaechtnis, entscheidung_wahlreaktion]
eingabe: [touch, maus, tastatur]
tablet_geeignet: ja
dauer_sekunden: 150
schwierigkeit_anpassung: "Keine Stufen, keine automatische Anpassung: Die Schwierigkeit ergibt sich aus den Einstellungen. Zahl der Aufgaben 6–80 (Standard 24; für den Anstieg der Antwortzeit mindestens 20 sinnvoll); Quadrate pro Figur 4–9 (Standard 6; mehr meist schwerer); Drehwinkel Vielfache von 90° (Standard; 0°, 90°, 180°, 270°) oder von 45° (schwerer, Figur auch schräg zum Raster); Quadratgröße 0,6–3 cm (Standard 1,2 cm); Zeitlimit je Aufgabe 0–60 s (Standard 0 = kein Limit; Überschreitung zählt als nicht richtig). Winkel und „gleich/gespiegelt“ kommen ausgewogen vor. Eigene Faustregel: über mehrere Läufe über 90 % → eine Einstellung schwerer, unter 70 % → leichter."
messgroessen: ["Hauptwert: Genauigkeit (richtige Antworten in Prozent; Raten ergäbe etwa 50 %)", "richtige Antworten", "Antwortzeit richtiger Antworten (Mittel und Median)", "Anstieg der Antwortzeit je 90° Drehung (erst ab 6 richtigen Antworten mit 3 Winkelstufen; nur Vergleich mit sich selbst)", "keine Normwerte, kein Richtwert für den Anstieg"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
# Für „mentale Rotation / räumliches Vorstellen“ gibt es keinen eigenen Schlüssel; am nächsten liegt
# kurzzeitgedaechtnis_visuell_raeumlich (Figur im Kopf halten und drehen) zusammen mit arbeitsgedaechtnis.
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 0
    nutzbares_sehfeld: 0
    blickfolge: 0
    sakkaden: 1
    fixation: 0
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 0
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 0
    inhibition: 1
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 2
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 3
    verarbeitungsgeschwindigkeit: 1
    antizipation: 0
    entscheidung_wahlreaktion: 2
    lesen_sprache: 0
    schlussfolgern: 1
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
  zeitdruck: 0
  flimmern_lichtreize: 0
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Bildschirm einmal kalibrieren, damit die Quadratgröße in cm stimmt", "zwei große Antwortknöpfe antippen (mit Symbol und Wort) oder Pfeiltasten links/rechts nutzen", "keine Lesefähigkeit für die Aufgabe selbst nötig"]
vorsicht_bei: [kognitive_einschraenkung, kinder_unter_6, sehbehinderung_niedriger_visus, presbyopie_gleitsicht]
geeignet_fuer: ["sich vorstellen, wie eine Figur gedreht aussieht, und gleich von gespiegelt unterscheiden", "ruhige, denkorientierte Aufgabe ohne Zeitdruck (Zeitlimit optional)", "Schwierigkeit über Quadratzahl, Drehwinkel und Zeitlimit einstellen", "Vergleich mit sich selbst: Genauigkeit, Antwortzeit und Anstieg je 90° bei gleichen Einstellungen"]
weniger_geeignet_fuer: ["Blickmotorik, Reaktion oder Handgenauigkeit üben", "Beurteilung räumlicher Fähigkeiten oder Normvergleich (keine Richtwerte)", "Aussagen über den Anstieg aus wenigen Aufgaben (schwankt stark)", "Erwartung eines Alltagsnutzens (nicht belegt)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: mittel
  alltag_transfer: fehlend
  kommentar: "In einer Auswertung von 217 Studien verbesserte Training räumliche Fähigkeiten im Mittel (Effektstärke 0,47) und übertrug sich auf nicht geübte räumliche Aufgaben (Uttal et al. 2013); in einer Studie mit 31 Personen übertrug sich Rotationsüben auf neue Figuren und eine andere räumliche Aufgabe (Wright et al. 2008). Das waren andere Aufgaben und Trainingspläne; für genau diese Übung gibt es keine Studie, ein Alltagsnutzen ist nicht belegt."
aehnliche_uebungen: [903, 901, 603, 811]
stichworte: ["mentale Rotation", "räumliches Vorstellen", "Spiegelbild", "gleich oder gespiegelt", "Drehwinkel", "Antwortzeit", "Anstieg je 90°", "Quadratfiguren", "kein Zeitdruck", "Labor", "Einstellungen"]
---

# 920 · Mentale Rotation (gedrehte Figur: dieselbe oder ihr Spiegelbild?)

> Original: – (eigene Labor-Übung ohne Vorbild) · Blickfit: „Mentale Rotation“ (`src/exercises/labor-mentale-rotation/`, Kategorie Wahrnehmung, Labor)

## 1. Kurzbeschreibung

Links steht eine Vorlage, eine flache Figur aus Quadraten; rechts steht eine Vergleichsfigur, die gedreht ist. Sie ist entweder dieselbe Figur („Gleich“) oder ihr Spiegelbild („Gespiegelt“). Man stellt sich vor, die Figur zurückzudrehen, und tippt die passende Antwort (oder drückt Pfeil links/rechts); die Rückmeldung nennt die richtige Antwort, dann folgt die nächste Aufgabe. Die Figuren sind so gewählt, dass jede Aufgabe genau eine richtige Antwort hat. Die Blickfit-Übung hat keine Stufen, sondern **Einstellungen**: Zahl der Aufgaben (6–80, Standard 24), Quadrate pro Figur (4–9, Standard 6), Drehwinkel (Vielfache von 90° oder von 45°; die ungedrehte Figur gehört immer dazu), Quadratgröße (0,6–3 cm, Standard 1,2 cm) und ein optionales Zeitlimit je Aufgabe. Hauptwert ist die Genauigkeit; dazu kommen die Antwortzeit richtiger Antworten und – bei genug Daten – der Anstieg der Antwortzeit je 90° Drehung, der nur dem Vergleich mit sich selbst dient.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `logic.ts`, `index.ts`, `texts.ts` (Stand 05.10.2026).

- **Mathematik:** Die Vergleichsfigur entsteht durch `M = R(Winkel) · S` mit `S` = Spiegelung an der senkrechten Achse bei „gespiegelt“, sonst Einheitsmatrix; eine Drehung ändert nie die Händigkeit (det R = +1), die Spiegelung schon (det S = −1). Gezeichnet wird mit genau dieser Matrix.
- **Eindeutigkeit:** Nur chirale Figuren (Spiegelbild durch keine 90°-Drehung deckungsgleich) werden verwendet; durch Unit-Tests abgesichert, auch bei 45°.
- **Aufgabenplan:** 0° gehört dazu; jede Kombination aus Winkel und Art kommt (soweit die Zahl reicht) gleich oft vor, nie mehr als zwei gleiche Arten hintereinander. Figuren kompakt (Ausdehnung höchstens ⌈n/2⌉ + 1 Quadrate).
- **Zeit:** Antwortzeit ab dem Anzeigen der Figuren; Zeitlimit zählt ab dann, Überschreitung = falsch ohne Antwort.
- **Anstieg:** Regressionsgerade der Antwortzeit (richtige Antworten) über den gefalteten Winkel 0–180° in 90°-Einheiten; nur bei mindestens 6 richtigen Antworten mit mindestens 3 Winkelstufen, sonst weggelassen.
- **Bedienung:** zwei Antwortknöpfe mit Symbol und Wort (mindestens 64 px hoch), Pfeiltasten links („Gleich“) und rechts („Gespiegelt“); Rückmeldung ✓/✗ statt Blitzen.
- **Tipp nach dem Lauf (eigene Faustregeln):** unter 70 % → mehr Zeit, weniger Quadrate, 90°-Schritte; ab 90 % → eine Einstellung schwerer; mehr Fehler bei Spiegelbildern → Merkmal verfolgen; sonst Hinweis zum Anstieg oder Vergleichshinweis. `usesCalibration: true`.

## 3. Herleitung aus der Forschung (keine Beschreibung eines Vorbilds)

Die Übung ist eine eigene Labor-Übung. Aussagen und Quellen stammen aus `science.ts` (einzeln per Crossref und Abstract geprüft, 02.10.2026); Bethell-Fox & Shepard (1988) wurde dort nicht aufgenommen (kein Abstract). Ergänzt wurden nur per Crossref geprüfte Grundlagen (Kosslyn et al. 1998, Hedge et al. 2018, Calamia et al. 2012, Muchnick 2008 nur für Warnzeichen). Gestrichen: „Der Anstieg ist ein Maß für die Geschwindigkeit der mentalen Rotation“, „kleinerer Anstieg: effizientere mentale Drehung“ (Deutung nicht belegt), „Der Drehwinkel verlängert die Antwort. Das ist normal.“ (Normaussage).

## 4. Optische und okulomotorische Grundlagen

- **Sehanforderung gering:** Ein Quadrat von 1,2 cm erscheint bei etwa 50 cm Abstand etwa 1,4° groß, eine Figur aus 6 Quadraten etwa 4–6°. Sehschärfe und Kontrast begrenzen die Leistung kaum; wichtig ist, die Lage einzelner Ausläufer zu erkennen.
- **Blickverhalten:** Der Blick wechselt zwischen Vorlage und Vergleichsfigur hin und her; es gibt keine bewegten Reize, keine Lichtreize und keinen Zeitdruck (außer mit Zeitlimit).
- **45°-Schritte:** Bei Vielfachen von 45° erscheint die Vergleichsfigur schräg zu den Quadratreihen; die Kanten sind dann nicht mehr waagrecht und senkrecht, was das Vergleichen erschwert.
- **Brillenträger:** Beide Figuren liegen nebeneinander in der Bildschirmmitte; bei Gleitsicht genügt meist der Nahteil. Auf kleinen Bildschirmen werden die Figuren kleiner.
- **Farbe:** Spielt keine Rolle; Antwortknöpfe tragen Symbol und Wort, Rückmeldung ✓/✗.

## 5. Neurowissenschaftliche Grundlagen

- **Klassischer Befund:** Shepard & Metzler (1971) fanden, dass die Zeit, zwei perspektivische Zeichnungen derselben dreidimensionalen Form als gleich zu erkennen, linear mit dem Drehwinkel anwuchs – und bei Drehung in der Bildebene nicht kürzer war als bei Drehung in die Tiefe. Das waren Würfelfiguren; die flachen Quadratfiguren dieser Übung wurden dort nicht untersucht, ob die Antwortzeit hier genauso verläuft, ist nicht geprüft.
- **Hirnregionen:** Eine Übersichtsarbeit zu bildgebenden Studien fand, dass mentale Rotation mit Aktivität im Scheitellappen (um den Sulcus intraparietalis) einhergeht und – unter bestimmten Bedingungen – auch in motorischen Gebieten der Großhirnrinde (Zacks, 2008). Beim Drehen von Händen werden motorische Areale stärker beteiligt als beim Drehen von Objekten (Kosslyn et al., 1998). Eine Aussage „diese Übung trainiert Region X“ lässt sich daraus nicht ableiten und wird nicht gemacht.
- **Gleich oder gespiegelt:** Eine Drehung ändert nie die Händigkeit einer Figur, eine Spiegelung schon. Die Entscheidung verlangt, die Figur im Kopf zu halten, gedanklich zu drehen und mit der Vorlage zu vergleichen; voreilige Antworten nach dem ersten Eindruck müssen gebremst werden.
- **Strategie:** Ein Merkmal der Figur (Ausläufer, Ecke) zu verfolgen ist eine mögliche Strategie (Tipp der Übung, kein Beleg).

## 6. Motorische Grundlagen

Motorisch anspruchslos: eine Wahl zwischen zwei großen Knöpfen (mindestens 64 px hoch) oder den Pfeiltasten. Kein Zeitlimit im Standard. Die Hand darf die Figur „mitdrehen“, wenn das hilft; gemessen wird nur das Tippen. Tremor oder eingeschränkte Feinmotorik stören kaum.

## 7. Einflussfaktoren und Messgrenzen

- **Raten:** Bei zwei Antworten ergibt reines Raten etwa 50 % Genauigkeit; Werte nahe 50 % sagen wenig.
- **Anstieg der Antwortzeit:** Der Anstieg ist eine Differenz aus Antwortzeiten verschiedener Winkel. Solche Differenzwerte sind als persönlicher Kennwert oft wenig zuverlässig, auch wenn der Effekt in Gruppen sehr stabil ist (Hedge et al., 2018). Er wird erst ab 6 richtigen Antworten mit 3 Winkelstufen berechnet und schwankt bei wenigen Aufgaben stark; es gibt keinen Richtwert.
- **Zeit:** Die Antwortzeit enthält Erkennen, Drehen, Entscheiden und Tippen sowie die Geräteverzögerung; Touchscreens messen Zeiten durchweg etwas zu lang, je nach Gerät unterschiedlich (Pronk et al., 2020; Tablets wurden dort nicht untersucht).
- **Kalibrierung:** Die Quadratgröße stimmt nur nach Kalibrierung; auf kleinen Bildschirmen werden die Figuren kleiner.
- **Übung:** Bei wiederholter Durchführung steigen die Werte schon durch Übung (Calamia et al., 2012); vergleichbar sind nur Läufe mit gleichen Einstellungen auf demselben Gerät.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** In einer Auswertung von 217 Studien verbesserte Training räumliche Fähigkeiten im Mittel mit einer Effektstärke von 0,47 gegenüber Kontrollgruppen (Uttal et al., 2013). Für genau diese Übung gibt es keine Studie.
- **Naher Transfer – mittel:** Die Verbesserung übertrug sich in derselben Auswertung auf andere, nicht geübte räumliche Aufgaben (Uttal et al., 2013); in einer Studie mit 31 Personen und 21 Tagen Üben mit einer Rotationsaufgabe übertrug sich der Gewinn auf neue Figuren und eine andere räumliche Aufgabe (Wright et al., 2008). Das sind Ergebnisse aus Studien mit anderen Aufgaben und Trainingsplänen.
- **Alltagstransfer – fehlend:** Dass die Übung beim Lesen von Plänen und Karten, beim Anordnen oder in Schule und Beruf hilft, ist nicht belegt.
- **Einordnung:** Die Übung ist eine einstellbare Aufgabe zum räumlichen Vorstellen. Genauigkeit, Antwortzeit und Anstieg dienen dem Vergleich mit sich selbst, nicht als Normwert oder Aussage über Fähigkeiten.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** räumliches Vorstellen (Drehen im Kopf, gleich oder gespiegelt) geübt werden soll; eine ruhige Denkaufgabe ohne Zeitdruck gesucht ist; eine sprachfreie Aufgabe mit großen Knöpfen gewünscht ist; als Abwechslung zu Blick- und Reaktionsübungen.
- **Weniger passend, wenn …** Blickmotorik, Reaktion oder Handgenauigkeit geübt werden sollen; ein Normvergleich oder eine Beurteilung räumlicher Fähigkeiten gewünscht ist; nur wenige Aufgaben gespielt werden und der Anstieg gedeutet werden soll.
- **Vorsicht / anpassen bei …**
  - `kognitive_einschraenkung`: wenige Quadrate (4–5), nur 90°-Schritte, kein Zeitlimit; bei Frust abbrechen; kein Therapieanspruch.
  - `kinder_unter_6`: nicht untersucht; die Aufgabe verlangt, Spiegelbilder sicher zu unterscheiden – mit 4 Quadraten und 90°-Schritten beginnen.
  - `sehbehinderung_niedriger_visus`, `presbyopie_gleitsicht`: größere Quadrate wählen; Arbeitsplatzbrille.
- **Kombiniert gut mit …** 903 (Welche Seite? – Hände und Füße im Kopf drehen), 901 (Reihen-Rätsel), 603 (Rastermuster merken), 811 (Muster nachzeichnen).
- Treten beim Üben Doppelbilder, plötzlicher Sehverlust, Kopfschmerz mit Sehverschlechterung oder Schwindel auf, sollte das ärztlich abgeklärt werden, statt weiterzuüben (Muchnick, 2008, S. 6, 28).
- Keine Diagnosen, keine Heilversprechen; nicht als Test räumlicher Fähigkeiten oder der Intelligenz darstellen.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Anstieg wenig zuverlässig:** Bei 24 Aufgaben schwankt der Anstieg stark; im Verlauf eher ein gleitendes Mittel über mehrere Läufe zeigen.
- **Nur flache Figuren:** Eine Variante mit perspektivischen Würfelfiguren wäre näher am klassischen Befund, aber am Tablet schwerer lesbar.
- **Keine Einstiegshilfe:** Voreinstellungen „leicht/mittel/schwer“ würden die Wahl erleichtern.
- **Sicherheit:** Keine Lichtreize, keine Bewegung, kein Zeitdruck im Standard.

## 11. Quellen

### Von der Website angegeben
keine (eigene Übung)

### Weitere Fachliteratur
- Shepard, R. N., & Metzler, J. (1971). Mental rotation of three-dimensional objects. *Science*, *171*(3972), 701–703. https://doi.org/10.1126/science.171.3972.701 – Antwortzeit wächst linear mit dem Drehwinkel (Crossref geprüft; Abstract gelesen).
- Zacks, J. M. (2008). Neuroimaging studies of mental rotation: A meta-analysis and review. *Journal of Cognitive Neuroscience*, *20*(1), 1–19. https://doi.org/10.1162/jocn.2008.20013 – Scheitellappen und motorische Gebiete (Crossref geprüft; Abstract gelesen).
- Uttal, D. H., Meadow, N. G., Tipton, E., Hand, L. L., Alden, A. R., Warren, C., & Newcombe, N. S. (2013). The malleability of spatial skills: A meta-analysis of training studies. *Psychological Bulletin*, *139*(2), 352–402. https://doi.org/10.1037/a0028446 – Trainierbarkeit räumlicher Fähigkeiten und Transfer (Crossref geprüft; Abstract gelesen).
- Wright, R., Thompson, W. L., Ganis, G., Newcombe, N. S., & Kosslyn, S. M. (2008). Training generalized spatial skills. *Psychonomic Bulletin & Review*, *15*(4), 763–771. https://doi.org/10.3758/PBR.15.4.763 – Transfer auf neue Figuren und eine andere räumliche Aufgabe (Crossref geprüft; Abstract gelesen).
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, *52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Zeitmessung am Touchgerät (Crossref geprüft; Abstract gelesen).
- Kosslyn, S. M., Digirolamo, G. J., Thompson, W. L., & Alpert, N. M. (1998). Mental rotation of objects versus hands: Neural mechanisms revealed by positron emission tomography. *Psychophysiology*, *35*(2), 151–161. https://doi.org/10.1111/1469-8986.3520151 – Hände aktivieren motorische Areale stärker als Objekte (Crossref geprüft).
- Hedge, C., Powell, G., & Sumner, P. (2018). The reliability paradox: Why robust cognitive tasks do not produce reliable individual differences. *Behavior Research Methods*, *50*(3), 1166–1186. https://doi.org/10.3758/s13428-017-0935-1 – Differenzwerte als persönlicher Kennwert wenig zuverlässig (Crossref geprüft).
- Calamia, M., Markon, K., & Tranel, D. (2012). Scoring higher the second time around: Meta-analyses of practice effects in neuropsychological assessment. *The Clinical Neuropsychologist*, *26*(4), 543–570. https://doi.org/10.1080/13854046.2012.680913 – Übungseffekte bei Wiederholung (Crossref geprüft).
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Lehrbuch: Warnzeichen mit Abklärungsbedarf (S. 6, 28).
