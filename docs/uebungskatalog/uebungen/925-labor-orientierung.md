---
# ===== Kennung =====
nr: 925
kennung: labor-orientierung
name: "Orientierung (auf einen aufleuchtenden Punkt hin eine Körperrichtung einnehmen, Hilfsperson bestätigt)"
name_original: "– (eigene Blickfit-Labor-Übung, kein Vorbild)"
kapitel: "Labor"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "labor-orientierung", name: "Orientierung", unterschiede: "eigene Labor-Übung mit Einstellungen"}
stand: 2026-10-05

# ===== Überblick =====
kurzbeschreibung: "Auf dem Bildschirm leuchtet ein Punkt in einer von vier oder acht Richtungen auf. Man bewegt sich im sicheren Stand kontrolliert in diese Richtung (zum Beispiel Neigen oder ein Schritt), und eine Hilfsperson tippt „Erreicht“ oder „Falsche Richtung“; wahlweise folgt die Rückkehr zur Mitte. Die App misst nur die Zeit bis zum Tipp der Hilfsperson. Anzahl, Richtungen, Rückkehr, Pause, Zeitlimit und Punktgröße stellt man selbst ein. Sturzgefahr: Halt und Hilfsperson in Reichweite."
ziel_funktionen: [ganzkoerper, gleichgewicht, entscheidung_wahlreaktion]
eingabe: [koerper_ohne_geraet, touch, maus, tastatur]
tablet_geeignet: ja
dauer_sekunden: 150
schwierigkeit_anpassung: "Keine Stufen und keine automatische Anpassung; alles über Einstellungen (maßgeblich ist PARAMS in src/exercises/labor-orientierung/logic.ts): Anzahl der Ziele (8–80, Standard 24, Richtungen gleichmäßig verteilt), Richtungen (4 oder 8), Rückkehr zur Mitte (ja/nein), Pause zwischen den Zielen (500–5000 ms, Standard 1500), Zeitlimit je Ziel (0 = keines bis 30 s, Standard keines), Punktgröße (1,5–10 cm, Standard 5), Ton (ändert die Wertung nicht). Leichter laut Texten: vier Richtungen, lange Pause, Zeitlimit 10–20 s oder keines, große Punkte, Rückkehr zur Mitte; schwerer: acht Richtungen, Zeitlimit 3–5 s, kleinere Punkte, kürzere Pausen, ohne Rückkehr zur Mitte. Unruhigere Standfläche erst später und nur mit Sicherung und Aufsicht."
messgroessen: ["Erreichte Ziele (von der Hilfsperson bestätigt)", "Falsche Richtung", "Zeitlimit überschritten (nur mit Zeitlimit)", "Zeit bis zur Bestätigung: Mittel, Median, Streuung (enthält die Reaktion der Hilfsperson)", "Zeit zurück zur Mitte (Mittel; nur mit Rückkehr)", "Zeit je Richtung (Zählwerte, keine Wertung)", "keine Messung von Bewegung, Gleichgewicht, Haltung oder Sturzrisiko; keine Normwerte"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 1
    blickfolge: 0
    sakkaden: 1
    fixation: 0
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 0
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 0
    geteilte_aufmerksamkeit: 1
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 2
    verarbeitungsgeschwindigkeit: 1
    antizipation: 0
    entscheidung_wahlreaktion: 2
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 0
    zielbewegung_tempo: 0
    zielbewegung_praezision: 0
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 3
    gleichgewicht: 3
    ausdauer_belastung: 1
belastung:
  zeitdruck: 1
  flimmern_lichtreize: 0
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 2
  sturzrisiko: 2
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Sicher stehen können; Wand oder fester Stuhl in Reichweite, rutschfester Boden, feste Schuhe, keine Stolperstellen", "Eine Hilfsperson, die die Bewegung sieht und „Erreicht“ oder „Falsche Richtung“ tippt (Tasten mindestens 56 px, Tastatur Leertaste und X)", "Vorher vereinbart: welche Neigung oder welcher Schritt zu welcher Richtung gehört und ab wann „Erreicht“ gilt", "Bildschirm auf Augenhöhe, ruhig auf Ständer oder Tisch oder von der Hilfsperson gehalten; kalibriert, damit die Punktgröße stimmt"]
vorsicht_bei: [sturzgefahr, schwindel_vestibulaer, herz_kreislauf, gelenk_ruecken, kognitive_einschraenkung, kinder_unter_6]
geeignet_fuer: ["Auf einen sichtbaren Reiz hin gezielt und kontrolliert eine Körperrichtung einnehmen und zur Mitte zurückkehren, unter Aufsicht im sicheren Stand", "Richtung auf dem Bildschirm in eine Körperbewegung übersetzen (vier oder acht Richtungen)", "Vergleich mit sich selbst bei gleicher Hilfsperson, gleichem Aufbau und gleichen Einstellungen", "Ergänzung in einem betreuten Bewegungsprogramm – ohne eigenen Wirkanspruch"]
weniger_geeignet_fuer: ["Messung von Gleichgewicht, Schrittzeit, Haltung oder Sturzrisiko (die App sieht die Bewegung nicht)", "Üben ohne Hilfsperson oder ohne sicheren Halt", "Menschen, die nicht sicher stehen können oder bei Schwindel ohne ärztliche Rücksprache", "Normvergleich der Zeiten", "Diagnose oder Therapie"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: unklar
  alltag_transfer: unklar
  kommentar: "Für genau diese Übung gibt es keine Studie. Schritt-Training mit echten Schritten auf Reize hin verminderte bei Menschen ab 60 Jahren in betreuten Programmen Stürze und verbesserte Wahl-Schrittreaktionszeit und Gleichgewichtstests (Okubo et al. 2017); Gleichgewichts- und Funktionsübungen senken die Sturzrate (Sherrington et al. 2019). Die Übung ähnelt solchen Aufgaben, ist aber nicht untersucht; für gesunde Menschen ist kein Nutzen belegt, und die Zeit hängt an der Hilfsperson."
aehnliche_uebungen: [924, 926, 202]
stichworte: ["Orientierung", "Körperrichtung", "Neigen", "Schritt", "Rückkehr zur Mitte", "Hilfsperson", "Wahl-Schrittaufgabe (nur Einordnung)", "Gleichgewicht", "Sturzgefahr", "keine Messung"]
---

# 925 · Orientierung (auf einen aufleuchtenden Punkt hin eine Körperrichtung einnehmen, Hilfsperson bestätigt)

> Original: – (eigene Blickfit-Labor-Übung, kein Vorbild) · Blickfit: „Orientierung“ (`src/exercises/labor-orientierung/`, Kategorie Wahrnehmung, Labor)

## 1. Kurzbeschreibung

Um eine Mitte herum sind vier oder acht Richtungen als Umrisse zu sehen. Ein Punkt leuchtet in einer Richtung auf (gefüllt, mit Pfeil nach außen und kurzem Text oben). Man bewegt sich im sicheren Stand kontrolliert in diese Richtung – zum Beispiel durch Neigen oder einen Schritt, wie vorher vereinbart. Eine Hilfsperson am Bildschirm sieht die Bewegung und tippt „Erreicht“, sobald die Richtung eingenommen ist, oder „Falsche Richtung“. Wahlweise leuchtet danach die Mitte auf, man kehrt zurück, und die Hilfsperson bestätigt auch das. Die App misst nur die Zeit bis zu diesen Tipps; die Bewegung selbst sieht sie nicht. Einstellbar sind Anzahl der Ziele, vier oder acht Richtungen, Rückkehr zur Mitte, Pause, Zeitlimit und Punktgröße. Weil man im Stand übt, besteht Sturzgefahr: Wand oder fester Stuhl und eine Hilfsperson gehören in Reichweite.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `index.ts`, `logic.ts`, `texts.ts`, `science.ts` in `src/exercises/labor-orientierung/` sowie `_shared/labor-sicherheit.ts` (Stand 05.10.2026).

- **Durchgang:** Pause (Standard 1500 ms) → Ziel leuchtet in einer Richtung (0 = oben, im Uhrzeigersinn; gleichmäßig verteilt) → Hilfsperson tippt „Erreicht“ oder „Falsche Richtung“ (oder Zeitlimit läuft ab) → bei Rückkehr leuchtet die Mitte, „Erreicht“ bestätigt die Rückkehr. Standard 24 Ziele; Schnellmodus 4 Ziele mit 600 ms Pause.
- **Schutz vor Fehlbedienung:** Ein zweiter Tipp innerhalb von 400 ms nach einer Bestätigung wird ignoriert (sonst bestätigte ein Doppeltipp zugleich die Rückkehr). Tipps ohne sichtbares Ziel (in der Pause) werden ignoriert und nicht gezählt.
- **Ohne Zeitlimit** wartet die Übung auf die Hilfsperson; mit Zeitlimit (1–30 s) zählt ein überschrittenes Ziel als „Zeitlimit überschritten“.
- **Darstellung:** Ziel gefüllt mit Pfeil nach außen, übrige Richtungen als Umrisse (Richtung nicht nur über Farbe); Punktgröße in cm über die Kalibrierung, so begrenzt, dass alle Richtungen Platz haben. Rückmeldung ✓/✗ als Zeichen, kein Flackern.
- **Ergebnis:** erreichte Ziele, falsche Richtungen, Zeitüberschreitungen, Zeit bis zur Bestätigung (Mittel, Median, Streuung), Zeit zurück zur Mitte, Zeit je Richtung. Verlauf nur bei gleichen Einstellungen.

## 3. Herleitung aus der Forschung (keine Beschreibung eines Programms)

- **Schritt- und Richtungsaufgaben:** Bei älteren Menschen werden Aufgaben untersucht, bei denen man auf einen Reiz hin gezielt in eine Richtung tritt; als Training (Okubo et al. 2017) und als Marker des Sturzrisikos (Lord & Fitzpatrick 2001). Diese Übung übernimmt die Grundidee (Reiz → Richtung wählen → Körper bewegen), ohne Plattform und ohne Messung der Bewegung.
- **Rückkehr zur Mitte:** Die Rückkehr verlangt eine zweite kontrollierte Bewegung und eine kurze Neuorientierung; ohne Rückkehr wechselt man direkt von Richtung zu Richtung, was anspruchsvoller ist (Gestaltungsabsicht, nicht geprüft).
- **Hilfsperson statt Sensor:** Die App kann die Bewegung nicht sehen; die Bestätigung durch eine Person ist ehrlich als Zählwert gekennzeichnet.
- **Was nicht belegt ist:** dass diese Übung Stürze verhindert, das Gleichgewicht verbessert oder sich auf Alltag oder Sport überträgt.

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Der Punkt (Standard 5 cm) misst bei 1 m Abstand im Stand etwa 2,9°, bei 40 cm etwa 7°; die Richtungen liegen um die Mitte verteilt. Sehschärfe spielt kaum eine Rolle; die Richtung ist zusätzlich über Pfeil und Text erkennbar.
- **Blick und Haltung:** Der Bildschirm steht auf Augenhöhe, damit der Kopf nicht geneigt werden muss. Neigt man sich oder macht einen Schritt, ändert sich der Blickwinkel auf den Bildschirm; der Kopf bewegt sich mit, und der vestibulookuläre Reflex hält das Bild stabil.
- **Sehen und Gleichgewicht:** Das Sehen ist eine von mehreren Informationsquellen der Haltungskontrolle neben Gleichgewichtsorgan und Signalen aus Muskeln und Gelenken; ist eine Quelle ungenau oder fehlt, werden die anderen stärker gewichtet (Peterka 2002).
- **Brillenträger:** Mit Gleitsicht durch den Fernteil schauen; große Ziele, kein Lesen nötig. Ungewohnte Brillen können die Standsicherheit beeinflussen.

## 5. Neurowissenschaftliche Grundlagen

- **Haltungskontrolle:** Haltung ist eine erlernte Fähigkeit aus dem Zusammenspiel von Sinnes- und Bewegungsprozessen; Sinnesinformationen aus Körper, Gleichgewichtsorgan und Augen werden je nach Aufgabe und Umgebung gewichtet, und vor einer gewollten Bewegung werden Haltungsanpassungen vorausgeplant (Horak 2006).
- **Aufmerksamkeit:** Gleichgewicht halten braucht Aufmerksamkeit; bei gesunden und gleichgewichtsgestörten älteren Menschen trägt dieser Bedarf zur Unsicherheit bei, abhängig von der Schwierigkeit der Haltungsaufgabe und der Art der zweiten Aufgabe (Woollacott & Shumway-Cook 2002). Richtung erkennen und Bewegung ausführen ist hier eine solche Verbindung.
- **Richtungszuordnung:** Die Übersetzung einer Bildschirmrichtung („oben“) in eine Körperrichtung („nach vorn“) ist eine räumliche Zuordnung, die vorher vereinbart wird. Eine Aussage „diese Übung trainiert Region X“ wird nicht gemacht.

## 6. Motorische Grundlagen

- **Kontrollierte Ganzkörperbewegung:** Neigen verlagert den Körperschwerpunkt innerhalb der Standfläche, ein Schritt verändert die Standfläche. Beides verlangt vorausgeplante Haltungsanpassungen (Horak 2006).
- **Zeit:** Die gemessene Zeit enthält das Erkennen, die Bewegung und die Reaktion der Hilfsperson; sie ist kein Maß der Schrittzeit. Touchscreens messen Zeiten zusätzlich je nach Gerät zu lang (Pronk et al. 2020).
- **Belastung:** Viele Durchgänge ohne Pause ermüden die Beine; kurze Pausen zwischen den Durchgängen.

## 7. Einflussfaktoren und Messgrenzen

- **Hilfsperson:** Ihre Aufmerksamkeit, ihr Kriterium für „Erreicht“ und ihre Reaktionszeit bestimmen Wertung und Zeit; nur mit derselben Hilfsperson und demselben Aufbau vergleichen.
- **Keine Bewegungsmessung:** Wie weit, wie sauber oder wie sicher man sich bewegt, wird nicht erfasst.
- **Aufbau:** Abstand zum Bildschirm, Standfläche, Schuhe und Licht verändern die Aufgabe.
- **Übung:** Bei Bildschirmübungen fallen Verbesserungen deutlich größer aus, wenn der Test der Übung ähnelt; ein großer Teil ist Gewöhnung (Guo et al. 2025).
- **Sicherheit:** Bei Unsicherheit zuerst im festen Stand, mit kleiner Bewegung und vier Richtungen; unruhige Standflächen nur mit Sicherung und Aufsicht.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach:** Für genau diese Übung gibt es keine Studie; Zeiten sinken mit Gewöhnung an Aufbau und Hilfsperson.
- **Naher Transfer – unklar:** In einer Übersicht von sieben randomisierten Studien mit 660 Personen ab 60 Jahren verbesserte Schritt-Training einfache und Wahl-Schrittreaktionszeit, Einbeinstand und „Timed Up and Go“, nicht die Kraft (Okubo et al. 2017). Ob diese Übung mit Neigen oder Schritt und Bestätigung durch eine Person ähnlich wirkt, ist nicht untersucht.
- **Alltagstransfer – unklar:** Schritt-Training senkte in derselben Übersicht die Sturzrate (Rate Ratio 0,48; Okubo et al. 2017); eine Cochrane-Übersicht mit 108 Studien fand, dass Bewegungsprogramme die Sturzrate bei Älteren senken, am deutlichsten Gleichgewichts- und Funktionsübungen (Rate Ratio 0,76; Sherrington et al. 2019). Bei 477 Bewohnern von Seniorenwohnanlagen sagte die Zeit in einer Wahl-Schrittaufgabe Stürze unabhängig von anderen Maßen voraus (Lord & Fitzpatrick 2001). Das waren betreute Programme bzw. Messungen mit echten Schritten; für diese Übung und für gesunde Menschen ist kein Nutzen belegt.
- **Einordnung:** Erreichte Ziele und Zeiten sind Zählwerte für den Vergleich mit sich selbst, keine Normwerte.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** unter Aufsicht eine Aufgabe gesucht wird, bei der ein sichtbarer Reiz in eine kontrollierte Körperbewegung übersetzt wird; eine Hilfsperson zur Verfügung steht; die Person sicher stehen kann; ein Bewegungsprogramm um eine Richtungsaufgabe ergänzt werden soll.
- **Weniger passend, wenn …** keine Hilfsperson oder kein sicherer Halt vorhanden ist; Gleichgewicht, Schrittzeit oder Sturzrisiko gemessen werden sollen; nur im Sitzen geübt werden kann (dann 924 mit Berührung).
- **Vorsicht / anpassen bei …**
  - `sturzgefahr`: nur mit Wand oder festem Stuhl in Reichweite und Hilfsperson; nie auf wackligen Unterlagen ohne Sicherung; kleine Bewegungen, vier Richtungen, Rückkehr zur Mitte.
  - `schwindel_vestibulaer`, `herz_kreislauf`, `gelenk_ruecken`: nur nach Rücksprache mit Ärztin, Arzt oder Therapeutin bzw. Therapeut; bei Schwindel, Übelkeit, Herzklopfen, Atemnot oder Gelenkschmerzen hinsetzen und Pause machen.
  - `kognitive_einschraenkung`, `kinder_unter_6`: Zuordnung Bildschirmrichtung ↔ Körperrichtung vorher üben; vier Richtungen, kein Zeitlimit.
  - Bei Schwindel, Kopf- oder Augenschmerz oder Doppelbildern sofort aufhören und abklären lassen (Muchnick 2008, S. 6, 28).
- **Kombiniert gut mit …** 924 (Richtungen per Berührung oder Körper), 926 (Balance-Touch: Tippen im Stand), 202 (Wahlreaktion auf Pfeilrichtungen im Sitzen).
- Keine Diagnosen, keine Heilversprechen; keine Aussage zur Sturzvorbeugung durch diese Übung.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Hilfsperson als Messinstrument:** Zeit und Wertung hängen an ihr; im Ergebnis und in den Texten so benannt.
- **Keine Sicherheitsprüfung:** Die App kann nicht prüfen, ob Halt und Hilfsperson vorhanden sind; die Hinweise stehen deshalb an erster Stelle der Sicherheitsliste.
- **Grenzen nur gerechnet:** Pausen, Zeitlimits und Punktgrößen sind nicht an Menschen geprüft.

## 11. Quellen

### Von der Website angegeben
keine (eigene Übung)

### Weitere Fachliteratur
- Okubo, Y., Schoene, D., & Lord, S. R. (2017). Step training improves reaction time, gait and balance and reduces falls in older people: A systematic review and meta-analysis. *British Journal of Sports Medicine, 51*(7), 586–593. https://doi.org/10.1136/bjsports-2015-095452 – Schritt-Training bei Älteren (Crossref geprüft)
- Lord, S. R., & Fitzpatrick, R. C. (2001). Choice stepping reaction time: A composite measure of falls risk in older people. *The Journals of Gerontology Series A: Biological Sciences and Medical Sciences, 56*(10), M627–M632. https://doi.org/10.1093/gerona/56.10.m627 – Wahl-Schrittaufgabe und Sturzrisiko (Crossref geprüft)
- Woollacott, M., & Shumway-Cook, A. (2002). Attention and the control of posture and gait: A review of an emerging area of research. *Gait & Posture, 16*(1), 1–14. https://doi.org/10.1016/S0966-6362(01)00156-4 – Aufmerksamkeitsbedarf der Haltung (Crossref geprüft)
- Sherrington, C., Fairhall, N. J., Wallbank, G. K., Tiedemann, A., Michaleff, Z. A., Howard, K., Clemson, L., Hopewell, S., & Lamb, S. E. (2019). Exercise for preventing falls in older people living in the community. *Cochrane Database of Systematic Reviews, 2019*(1), CD012424. https://doi.org/10.1002/14651858.CD012424.pub2 – Bewegungsprogramme und Sturzrate (Crossref geprüft)
- Horak, F. B. (2006). Postural orientation and equilibrium: What do we need to know about neural control of balance to prevent falls? *Age and Ageing, 35*(Suppl. 2), ii7–ii11. https://doi.org/10.1093/ageing/afl077 – Haltungskontrolle, vorausgeplante Haltungsanpassungen (Crossref geprüft)
- Peterka, R. J. (2002). Sensorimotor integration in human postural control. *Journal of Neurophysiology, 88*(3), 1097–1118. https://doi.org/10.1152/jn.2002.88.3.1097 – Gewichtung von Sehen, Gleichgewichtsorgan und Körpersignalen (Crossref geprüft)
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touchscreens messen Zeiten zu lang (Crossref geprüft)
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Überschätzung bei trainingsähnlichem Test (Crossref geprüft)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28)
