---
# ===== Kennung =====
nr: 910
kennung: labor-start-ziel
name: "Start-Ziel-Reaktion (Finger halten, beim Aufleuchten loslassen und das Ziel berühren)"
name_original: "– (eigene Blickfit-Labor-Übung mit Einstellungen)"
kapitel: "Labor"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "labor-start-ziel", name: "Start-Ziel-Reaktion", unterschiede: "eigene Labor-Übung mit Einstellungen"}
stand: 2026-10-05

# ===== Überblick =====
kurzbeschreibung: "Man legt den Finger auf eine Startfläche unten und hält ihn dort. Nach einer zufälligen Wartezeit leuchtet darüber ein Ziel auf; man lässt so schnell wie möglich los und berührt das Ziel. Reaktionszeit (bis zum Loslassen) und Bewegungszeit (Weg zum Ziel) werden getrennt gemessen. Wartezeit, Abstand, Zielgröße in Zentimetern, Zielposition und Anzahl der Durchgänge stellt man selbst ein."
ziel_funktionen: [einfache_reaktion, zielbewegung_tempo]
eingabe: [touch, maus]
tablet_geeignet: ja
dauer_sekunden: 90
schwierigkeit_anpassung: "Keine Stufen und keine automatische Anpassung; alles über Einstellungen (maßgeblich ist PARAMS in src/exercises/labor-start-ziel/logic.ts): Anzahl der Durchgänge 5–60 (Standard 15, Fehlstarts zählen nicht mit), Wartezeit mindestens 500–5000 ms (1000) und höchstens 500–8000 ms (3500), Abstand Start–Ziel 5–60 cm (20; auf das Feld begrenzt), Durchmesser des Ziels 1,5–12 cm (4), Zielposition immer oben / zufällig im Halbkreis (bis 60° nach links oder rechts), Ton. Schwerer: kleineres Ziel, größerer Abstand, zufällige Richtung, stärker schwankende Wartezeit. Faustregel der Übung (keine Vorgabe aus der Forschung): Reaktions- und Bewegungszeit getrennt ansehen; ohne Fehlstarts und Fehltipps fertig → eine Einstellung schwerer; immer nur eine Einstellung ändern."
messgroessen: ["Hauptwert: Reaktionszeit Loslassen (Mittel; über alle Durchgänge mit Loslassen)", "Reaktionszeit Median und Streuung", "Bewegungszeit zum Ziel (Mittel; nur erfolgreiche Durchgänge)", "erfolgreiche Durchgänge", "Fehlstarts (zu früh losgelassen, vor dem Ziel oder in den ersten 100 ms)", "Fehltipps neben das Ziel", "Vergleich nur mit Durchläufen gleicher Einstellungen auf demselben Gerät; keine Normwerte"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
# Profil für die Standard-Einstellungen (15 Durchgänge, 1–3,5 s Wartezeit, 20 cm, 4 cm, Ziel oben); Werte geschätzt.
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 0
    blickfolge: 0
    sakkaden: 1
    fixation: 1
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 0
    inhibition: 2
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
    einfache_reaktion: 3
    auge_hand_koordination: 2
    zielbewegung_tempo: 3
    zielbewegung_praezision: 1
    kontinuierliche_steuerung: 0
    ruhige_hand: 1
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 2
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 1
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Bildschirm einmal kalibrieren, damit Abstand und Zielgröße in Zentimetern stimmen", "Bildschirm flach oder leicht geneigt; START unten in der Mitte, das Ziel darüber; Hand so stützen, dass der Zeigefinger ohne Druck auf START ruht", "Finger mehrere Sekunden ruhig auf einer Fläche halten und dann gezielt ein Ziel von 1,5 bis 12 cm treffen können", "Für Vergleiche immer dieselbe Hand, Haltung, Geräteneigung und dieselben Einstellungen"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, hand_arm_beschwerden, tremor_parkinson, aufmerksamkeitsprobleme]
geeignet_fuer: ["Aus der Ruhe heraus auf ein Signal reagieren und dann gezielt zugreifen – Reaktion und Bewegung getrennt sehen", "Geduldig bereit sein: auf das Signal warten, ohne zu früh loszulassen", "Mit Abstand und Zielgröße die Bewegungszeit verändern (Fitts'sches Gesetz) und die Reaktionszeit davon getrennt beobachten", "Vergleich mit sich selbst: Reaktions- und Bewegungszeit über mehrere Durchläufe mit gleichen Einstellungen"]
weniger_geeignet_fuer: ["Messung der Reaktionsfähigkeit für Verkehr oder Beruf: keine Normwerte, Touch misst Zeiten zu lang", "Entscheidungen zwischen mehreren Möglichkeiten üben (nur ein Ziel)", "Blickbewegungen, Randsehen oder Suchen üben", "Menschen, die den Finger nicht ruhig auf einer Fläche halten können"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: unklar
  alltag_transfer: fehlend
  kommentar: "Die einfache Reaktionszeit besteht aus Erkennen und Bewegungsbeginn (Woods et al., 2015), die Bewegungszeit folgt dem Fitts'schen Gesetz (Fitts, 1954; Soukoreff & MacKenzie, 2004). Für die Messung über das Loslassen einer Startfläche auf dem Touchscreen gibt es keine Studie. Verbesserungen in trainingsähnlichen Prüfungen sind zu großen Teilen Gewöhnung an Aufgabe und Gerät (Guo et al., 2025); ein Nutzen im Alltag ist nicht belegt."
aehnliche_uebungen: [503, 101, 501, 511, 907]
stichworte: ["Start-Ziel-Reaktion", "Reaktionszeit und Bewegungszeit", "Loslassen", "Fehlstart", "einfache Reaktion", "Fitts'sches Gesetz", "zufällige Wartezeit", "Zielbewegung", "Labor"]
---

# 910 · Start-Ziel-Reaktion (Finger halten, beim Aufleuchten loslassen und das Ziel berühren)

> Original: – (eigene Blickfit-Labor-Übung mit Einstellungen) · Blickfit: „Start-Ziel-Reaktion“ (`src/exercises/labor-start-ziel/`, Kategorie Reaktion, Labor)

## 1. Kurzbeschreibung

Unten in der Mitte liegt eine runde Startfläche mit der Aufschrift „START“. Man legt den Zeigefinger darauf und hält ihn dort („HALTEN“). Nach einer zufälligen Wartezeit leuchtet darüber ein Ziel auf; jetzt lässt man so schnell wie möglich los und berührt das Ziel. Die Übung trennt zwei Zeiten, die sonst zusammenfallen: die **Reaktionszeit** vom Aufleuchten bis zum Loslassen und die **Bewegungszeit** vom Loslassen bis zur Berührung des Ziels. Zu frühes Loslassen ist ein Fehlstart, und der Durchgang beginnt neu. Statt Stufen gibt es **Einstellungen**: Anzahl der Durchgänge (Standard 15), kürzeste und längste Wartezeit (1 bis 3,5 s), Abstand zwischen Start und Ziel (20 cm, auf den Bildschirm begrenzt), Zieldurchmesser (4 cm) und Zielposition (immer oben oder zufällig im Halbkreis). Verglichen wird nur mit eigenen Durchläufen mit gleichen Einstellungen.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `index.ts`, `logic.ts` (`SprintSession`), `texts.ts`, `science.ts` in `src/exercises/labor-start-ziel/` (Stand 05.10.2026).

- **Zustände:** Leerlauf → Finger auf START (`homeDown`, Wartezeit beginnt, zufällig zwischen kürzester und längster Wartezeit über `ctx.rng`) → Ziel leuchtet auf (blendet in 110 ms ein) → Loslassen (`homeUp`: Reaktionszeit) → Tipp auf das Ziel (Bewegungszeit).
- **Fehlstart:** Loslassen vor dem Aufleuchten oder in den ersten 100 ms danach (kann keine Reaktion sein) → Fehlstart, der Durchgang beginnt neu und zählt nicht. Nicht innerhalb 2 s losgelassen bzw. Ziel nicht innerhalb 3 s nach dem Loslassen erreicht → Durchgang beendet (ohne Erfolg).
- **Geometrie:** Startfläche Radius 1,8 cm, unten in der Mitte; Ziel im eingestellten Abstand darüber, bei „zufällig“ bis 60° nach links oder rechts; Abstand wird auf das Feld begrenzt (Ziel nie über den Rand, nicht auf START). Trefferradius = Radius + 0,3 cm, mindestens 24 px. Nur der erste Finger auf START zählt; ein zweiter Finger oder Doppeltipp stört nicht.
- **Werte:** Reaktionszeit über alle Durchgänge mit Loslassen (auch wenn das Ziel danach verfehlt wurde), Bewegungszeit über die Treffer. Hauptwert: mittlere Reaktionszeit (weniger = schneller); gibt es kein Loslassen, steht die Zeitgrenze 2000 ms.
- **Schnellmodus** (`?quick=1`): 3 Durchgänge, Wartezeit 0,6–1,2 s. Intro-Film: eine eingeblendete Hand legt den Finger auf START, lässt einmal zu früh los, dann zweimal richtig (6 cm, 2,5-cm-Ziel).
- **Rückmeldung:** Text oben im Bild, ✓/✗ als Zeichen, Beschriftung START/HALTEN; kein Blitz, keine Vollflächeneffekte; Ton nur, wenn eingestellt. Persönlicher Tipp nach Faustregeln (viele Fehlstarts, viele Fehltipps, nicht losgelassen, stark schwankende Zeiten).
- **Vergleich:** nur bei gleichen Einstellungen (Ton ausgenommen).

## 3. Herleitung aus der Forschung (keine Beschreibung eines Programms)

- **Zwei Anteile:** Die einfache Reaktionszeit besteht aus der Zeit für das Erkennen des Reizes und der Zeit bis zum Beginn der Bewegung (Woods et al., 2015). Das Loslassen der Startfläche markiert den Bewegungsbeginn; die Zeit danach ist Bewegungszeit.
- **Bewegungszeit nach Fitts:** Sie hängt von Abstand und Größe des Ziels ab – je weiter weg und kleiner, desto länger (Fitts, 1954); das gilt für Zeigen und Ziehen auch auf Touchscreens (Soukoreff & MacKenzie, 2004). Abstand und Zielgröße verändern deshalb vor allem die Bewegungszeit, kaum die Reaktionszeit.
- **Zufällige Wartezeit:** Ihre Dauer und die der vorigen Wartezeit beeinflussen die Reaktionszeit (Han & Proctor, 2022); Zufall verhindert Raten des Zeitpunkts.
- **Besonderheit:** Die Messung über das Loslassen einer Startfläche auf dem Touchscreen ist eine Eigenheit dieser Übung; dafür gibt es keine Studie.
- **Was nicht belegt ist:** schnellere Reaktion im Verkehr, Sport oder Beruf durch diese Übung.

## 4. Optische und okulomotorische Grundlagen

- **Reiz:** Ein einzelnes, kontrastreiches Ziel, das aufleuchtet; Sehschärfe spielt keine Rolle. Bei 50 cm Abstand misst das Standardziel (4 cm) etwa 4,6° (eigene Rechnung; 1 cm ≈ 1,15°).
- **Wohin man schaut:** Bei „immer oben“ kennt man den Zielort und kann ihn vorher anschauen; die Reaktion ist dann eine einfache Reaktion auf das Aufleuchten. Bei „zufällig im Halbkreis“ erscheint das Ziel an wechselnden Orten; der Blick springt meist hin (Sakkadenlatenz im Median etwa 177 ms; Bargary et al., 2017), und die Hand folgt.
- **Vorbereitung:** Gespanntes Warten auf das Signal mit ruhigem Blick; die Lidschlagrate sinkt am Bildschirm (Portello et al., 2013). Zwischen Durchläufen blinzeln.
- **Brillenträger:** Bildschirm flach oder leicht geneigt; START und Ziel liegen nahe beieinander im Nahbereich. Bei Gleitsicht durch den Nahteil schauen, ohne den Kopf zu bewegen.

## 5. Neurowissenschaftliche Grundlagen

- **Einfache Reaktion:** Erkennen des Aufleuchtens und Auslösen der Bewegung; die Zeit enthält Wahrnehmungs- und Bewegungsanteile (Woods et al., 2015).
- **Vorbereitung und Hemmung:** Während der Wartezeit muss die vorbereitete Bewegung zurückgehalten werden; Fehlstarts zeigen, dass die Bereitschaft in eine voreilige Antwort umgeschlagen ist. Die Wartezeit und die vorige Wartezeit beeinflussen, wie bereit man ist (Han & Proctor, 2022).
- **Zielbewegung:** Planung und Ausführung einer schnellen Zielbewegung mit Korrektur am Ende; ihre Dauer folgt dem Fitts'schen Gesetz.
- Eine Aussage „diese Übung trainiert Region X“ lässt sich daraus nicht ableiten und wird nicht gemacht.

## 6. Motorische Grundlagen

- **Halten:** Der Finger ruht ohne Druck auf START; leichtes Zittern oder Abrutschen über den Trefferrand (1,8 cm + 0,3 cm) kann als Loslassen zählen.
- **Fitts'sches Gesetz:** Nach der Shannon-Form ist die Schwierigkeit log₂(Abstand/Zielbreite + 1); bei 20 cm und 4 cm sind das etwa 2,6 bit, bei 10 cm und 2 cm ebenfalls, bei 30 cm und 2 cm etwa 4,0 bit (eigene Rechnung nach Soukoreff & MacKenzie, 2004). Gleiche Schwierigkeit heißt ungefähr gleiche Bewegungszeit.
- **Tempo und Genauigkeit:** Wer losstürmt, tippt eher neben das Ziel; Fehltipps werden gezählt.
- **Maus:** Mit der Maus wird die Maustaste gehalten und losgelassen; der Weg auf dem Tisch hat dann nichts mit dem Abstand in Zentimetern auf dem Bildschirm zu tun. Ergebnisse mit Maus und Finger nicht vergleichen; die Übung ist für Touch gedacht.

## 7. Einflussfaktoren und Messgrenzen

- **Bildschirm begrenzt den Abstand:** Abstand und Ziel werden auf das Feld begrenzt. Ein 10,9-Zoll-Tablet ist im Querformat nur etwa 15,8 cm hoch; die eingestellten 20 cm passen dann nicht, der tatsächliche Abstand liegt eher um 10 cm, im Hochformat um 17 cm (eigene Rechnung, abhängig von der Bühne). Querformat und Hochformat deshalb nicht mischen; am Handy sind die Wege noch kürzer.
- **Touch-Latenz:** Loslassen und Berühren werden über die Zeitstempel der Eingabe gemessen; Touchgeräte messen Reaktionszeiten durchweg zu lang, je nach Gerät unterschiedlich (Pronk et al., 2020; Tablets und das Loslassen wurden dort nicht untersucht). Nur auf demselben Gerät vergleichen.
- **Streuung:** Messwerte streuen von Durchgang zu Durchgang; Mehrfachmessung und Mittelung sind üblich (Mountford et al., 2004, S. 43–44, am Beispiel der Hornhautvermessung). Mit 15 Durchgängen ist der Mittelwert grob; Median und Streuung helfen beim Einordnen.
- **Kalibrierung:** Ohne Kalibrierung rechnet die App mit 38 px pro cm; auf einem Tablet mit etwa 52 px pro cm sind Abstand und Ziel dann rund ein Viertel kleiner als eingestellt (eigene Rechnung).
- **Person:** Hand, Haltung, Neigung des Geräts, Müdigkeit und Alter verändern die Werte; die einfache Reaktionszeit verändert sich in einer großen Bevölkerungsstichprobe kaum vor etwa 50 Jahren, danach langsam (Der & Deary, 2006).

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach:** In der geübten Aufgabe wird man mit Wiederholung meist etwas schneller und macht weniger Fehlstarts; ein großer Teil ist Gewöhnung an Aufgabe und Gerät (Guo et al., 2025). Für diese Übung gibt es keine Studie.
- **Naher Transfer – unklar:** Ob sich andere Reaktions- oder Zielaufgaben verbessern, ist nicht untersucht.
- **Alltagstransfer – fehlend:** Kein Beleg für Verkehr, Sport oder Beruf.
- **Einordnung:** Die Übung zeigt Reaktion und Bewegung getrennt. Reaktions- und Bewegungszeit sind Werte für den Vergleich mit sich selbst, keine Normwerte.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** einfache Reaktion und anschließende Zielbewegung getrennt beobachtet werden sollen; geduldiges Bereitsein (keine Fehlstarts) geübt werden soll; mit Abstand und Zielgröße der Bewegungsanteil gezielt verändert werden soll; ein Tablet flach oder leicht geneigt genutzt werden kann.
- **Weniger passend, wenn …** Entscheidungen zwischen mehreren Möglichkeiten (dann 909), Blickbewegungen oder Randsehen geübt werden sollen; eine Reaktionszeit als Eignungsmaß gesucht wird; der Finger nicht ruhig gehalten werden kann.
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: Das Ziel leuchtet plötzlich auf (kleine Fläche, keine Vollflächenblitze); im Zweifel vorher ärztlich besprechen (Fisher et al., 2005).
  - `hand_arm_beschwerden`, `tremor_parkinson`: schnelle, kurze Bewegungen und Halten auf START; großes Ziel, kurzer Abstand, wenige Durchgänge; Zittern kann als Loslassen zählen.
  - `aufmerksamkeitsprobleme`: viele Fehlstarts sind zu erwarten; nach einem Fehlstart kurz durchatmen, kurze Durchläufe.
- **Kombiniert gut mit …** 503 (Sofortreaktion ohne Zielbewegung), 907 (Spot-Touch, Reaktion und Bewegung zusammen), 909 (Wahlreaktion), 501 (Flick-Zielen).
- Keine Diagnosen, keine Heilversprechen; nicht als Reaktionsprüfung darstellen.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Abstand auf Tablets begrenzt:** Der Standardabstand 20 cm passt im Querformat nicht; der tatsächliche Abstand sollte im Ergebnis stehen (wie der tatsächliche Winkel bei 912), damit Vergleiche nicht täuschen.
- **Loslassen als Reaktion:** Für das Loslassen auf Touchscreens fehlen Latenzdaten; das Loslass-Ereignis kann je nach Gerät anders verzögert sein als ein Tipp.
- **Wenige Durchgänge:** 15 Durchgänge sind knapp für stabile Mittelwerte; 20 bis 30 wären besser.
- **Maus:** Für Maus ist die Übung nur bedingt sinnvoll; ein Hinweis im Intro wäre hilfreich.

## 11. Quellen

### Von der Website angegeben
(keine, eigene Übung)

### Weitere Fachliteratur
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, *47*(6), 381–391. https://doi.org/10.1037/h0055392 – Fitts'sches Gesetz (Crossref geprüft).
- Soukoreff, R. W., & MacKenzie, I. S. (2004). Towards a standard for pointing device evaluation, perspectives on 27 years of Fitts’ law research in HCI. *International Journal of Human-Computer Studies*, *61*(6), 751–789. https://doi.org/10.1016/j.ijhcs.2004.09.001 – Fitts'sches Gesetz auch auf Touchscreens, Shannon-Form (Crossref geprüft).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience*, *9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – Anteile der einfachen Reaktionszeit (Crossref geprüft).
- Han, T., & Proctor, R. W. (2022). Revisiting variable-foreperiod effects: Evaluating the repetition priming account. *Attention, Perception, & Psychophysics*, *84*(4), 1193–1207. https://doi.org/10.3758/s13414-022-02476-5 – Wirkung der Wartezeit (Crossref geprüft).
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, *52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touchgeräte messen Reaktionszeiten zu lang (Crossref geprüft).
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology*, *16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Lerneffekt bei trainingsähnlicher Prüfung (Crossref geprüft).
- Der, G., & Deary, I. J. (2006). Age and sex differences in reaction time in adulthood: Results from the United Kingdom Health and Lifestyle Survey. *Psychology and Aging*, *21*(1), 62–73. https://doi.org/10.1037/0882-7974.21.1.62 – Alter und einfache Reaktionszeit (Crossref geprüft).
- Bargary, G., Bosten, J. M., Goodbourn, P. T., Lawrance-Owen, A. J., Hogg, R. E., & Mollon, J. D. (2017). Individual differences in human eye movements: An oculomotor signature? *Vision Research*, *141*, 157–169. https://doi.org/10.1016/j.visres.2017.03.001 – Sakkadenlatenz (Crossref geprüft).
- Portello, J. K., Rosenfield, M., & Chu, C. A. (2013). Blink rate, incomplete blinks and computer vision syndrome. *Optometry and Vision Science*, *90*(5), 482–487. https://doi.org/10.1097/OPX.0b013e31828f09a7 – Lidschlag bei Bildschirmarbeit (Crossref geprüft).
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, *46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Photosensitivität (Crossref geprüft).
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Streuung von Messwerten, Mehrfachmessung (S. 43–44).
