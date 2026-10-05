---
# ===== Kennung =====
nr: 913
kennung: labor-doppelaufgabe
name: "Doppelaufgabe (Zielzahl in der Mitte und Punkte am Rand gleichzeitig beachten)"
name_original: "– (eigene Blickfit-Labor-Übung mit Einstellungen)"
kapitel: "Labor"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "labor-doppelaufgabe", name: "Doppelaufgabe", unterschiede: "eigene Labor-Übung mit Einstellungen"}
stand: 2026-10-05

# ===== Überblick =====
kurzbeschreibung: "In der Mitte wechselt eine Zahlenfolge; erscheint die Zielzahl (z. B. 7), berührt man den Kreis in der Mitte. Gleichzeitig tauchen am Rand Punkte auf, die man ebenfalls antippt; der Blick soll in der Mitte bleiben. Mit den Modi „Nur Mitte“ und „Nur Rand“ sieht man, wie sich jede Aufgabe allein verhält. Tempo der Zahlen, Zielzahl, Anteil der Zielzahlen, Größe und Sichtbarkeit der Randpunkte und Dauer stellt man selbst ein."
ziel_funktionen: [geteilte_aufmerksamkeit, peripheres_sehen, nutzbares_sehfeld, auge_hand_koordination]
eingabe: [touch, maus]
tablet_geeignet: ja
dauer_sekunden: 60
schwierigkeit_anpassung: "Keine Stufen und keine automatische Anpassung; alles über Einstellungen (maßgeblich ist PARAMS in src/exercises/labor-doppelaufgabe/logic.ts): Aufgaben beide gleichzeitig / nur Mitte / nur Rand (Vergleichsbasis, jeder Modus mit eigenem Verlauf), Dauer 20–300 s (Standard 60), Zahlenwechsel alle 400–2500 ms (900; nie schneller als 2,5 Wechsel pro Sekunde), Zielzahl 1–9 (7), Anteil der Zielzahlen 5–50 % (20), Größe der Randpunkte 1–12 cm (5; neben dem Kreis in der Mitte begrenzt), Sichtbarkeit der Randpunkte 0,4–6 s (1,5), Pause zwischen Randpunkten 0–3000 ms (400), Ton. Schwerer: schnellerer Zahlenwechsel, mehr Zielzahlen, kleinere Randpunkte, kürzere Sichtbarkeit und Pause. Die „Kosten“ der Doppelaufgabe ergeben sich aus dem eigenen Vergleich der drei Modi mit sonst gleichen Einstellungen (kein Maß aus der Forschung)."
messgroessen: ["Hauptwert: erkannte Zielzahlen in der Mitte (im Modus „Nur Rand“: getroffene Punkte)", "Mitte: gezeigte und verpasste Zielzahlen, Berührungen ohne Zielzahl, Reaktionszeit (Mittel)", "Rand: getroffene und verpasste Punkte, Fehltipps, Reaktionszeit (Mittel)", "Vergleich der Modi „Beide“, „Nur Mitte“, „Nur Rand“ durch die Person selbst (nicht automatisch)", "Vergleich nur mit Durchläufen gleicher Einstellungen auf demselben Gerät; keine Normwerte, keine Blickmessung"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
# Profil für die Standard-Einstellungen im Modus „Beide gleichzeitig“ (900 ms, Zielzahl 7, 20 %, 5 cm, 1,5 s); Werte geschätzt.
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 3
    nutzbares_sehfeld: 3
    blickfolge: 0
    sakkaden: 1
    fixation: 2
    bewegungswahrnehmung: 0
    visuelle_suche: 1
    visuelle_verarbeitungsgeschwindigkeit: 2
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 2
    inhibition: 2
    geteilte_aufmerksamkeit: 3
    kognitive_flexibilitaet: 1
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 0
    entscheidung_wahlreaktion: 1
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 2
    auge_hand_koordination: 3
    zielbewegung_tempo: 2
    zielbewegung_praezision: 1
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
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
voraussetzungen: ["Bildschirm einmal kalibrieren, damit die Punktgröße in Zentimetern stimmt", "Etwa 50–60 cm Abstand; der Blick bleibt möglichst in der Mitte, die Hand wechselt zwischen Mitte und Rand", "Ziffern 1 bis 9 sicher erkennen", "Für den Vergleich je einen Durchlauf in jedem der drei Modi mit sonst gleichen Einstellungen spielen", "Keine bekannte Lichtempfindlichkeit (Zahl wechselt höchstens 2,5-mal pro Sekunde, Punkte erscheinen und verschwinden)"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, aufmerksamkeitsprobleme, kognitive_einschraenkung, gesichtsfeldausfall, hand_arm_beschwerden, tremor_parkinson]
geeignet_fuer: ["Zwei Aufgaben gleichzeitig erledigen: auf eine Zielzahl in der Mitte achten und auf Punkte am Rand reagieren", "Mit „Nur Mitte“ und „Nur Rand“ selbst sehen, wie viel die zweite Aufgabe kostet (eigene Beobachtung)", "Schwierigkeit beider Teilaufgaben getrennt einstellen (Zahlentempo, Zielanteil, Punktgröße, Sichtbarkeit)", "Vergleich mit sich selbst je Modus über mehrere Durchläufe mit gleichen Einstellungen"]
weniger_geeignet_fuer: ["Messung der Aufmerksamkeit oder der Fahreignung (kein validiertes Verfahren, keine Normwerte)", "Kontrolle des Blicks: ohne Eye-Tracking können die Randpunkte angeschaut werden", "Menschen mit Lichtempfindlichkeit oder Epilepsie", "Einsteiger, die eine der beiden Teilaufgaben allein noch nicht sicher beherrschen (erst „Nur Mitte“ und „Nur Rand“)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Zwei einfache Aufgaben gleichzeitig stören sich, vor allem bei der Wahl der Handlung (Pashler, 1994). Übung verringert diese Störung in Laboraufgaben: Einige Personen erreichten nach mäßig viel Übung praktisch perfekte Zeitteilung (Schumacher et al., 2001), meist verkürzte sich der Engpass nur (Ruthruff et al., 2006). Für diese Übung (Berührung, Zahlenfolge mit Zielzahl, Randpunkte) gibt es keine Studie; Verbesserungen in trainingsähnlichen Prüfungen sind zu großen Teilen Gewöhnung (Guo et al., 2025). Ein Nutzen im Alltag ist nicht belegt."
aehnliche_uebungen: [205, 408, 401, 108, 208, 907]
stichworte: ["Doppelaufgabe", "geteilte Aufmerksamkeit", "Zielzahl", "Randpunkte", "nützliches Sehfeld", "Doppelaufgaben-Kosten", "Vergleichsmodi", "Fixation", "kein Eye-Tracking", "Labor"]
---

# 913 · Doppelaufgabe (Zielzahl in der Mitte und Punkte am Rand gleichzeitig beachten)

> Original: – (eigene Blickfit-Labor-Übung mit Einstellungen) · Blickfit: „Doppelaufgabe“ (`src/exercises/labor-doppelaufgabe/`, Kategorie Konzentration, Labor)

## 1. Kurzbeschreibung

In der Mitte steht ein Kreis, in dem eine Zahlenfolge abläuft – standardmäßig wechselt die Zahl alle 0,9 Sekunden. Erscheint die Zielzahl (Standard 7), berührt man den Kreis. Gleichzeitig tauchen am Rand Punkte auf, die man ebenfalls so schnell wie möglich antippt. Der Blick soll dabei möglichst in der Mitte bleiben. Neben „Beide gleichzeitig“ gibt es die Modi **„Nur Mitte“** und **„Nur Rand“**; spielt man alle drei mit sonst gleichen Einstellungen, sieht man selbst, wie viel die zweite Aufgabe kostet. Statt Stufen gibt es **Einstellungen**: Zahlenwechsel, Zielzahl, Anteil der Zielzahlen (20 %), Größe der Randpunkte in Zentimetern (5 cm), Sichtbarkeit der Randpunkte (1,5 s), Pause zwischen Randpunkten und Dauer (60 s). Gemessen werden erkannte und verpasste Zielzahlen, Berührungen ohne Zielzahl, getroffene und verpasste Punkte, Fehltipps und Reaktionszeiten – nicht der Blick.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `index.ts`, `logic.ts` (`CentralStream`, `EdgeSpots`, `DualSession`), `texts.ts`, `science.ts` in `src/exercises/labor-doppelaufgabe/`; die Randpunkte nutzen `SpotSession` aus `labor-spot-touch/logic.ts` (Stand 05.10.2026).

- **Mitte:** Ziffern 1–9; jede Zahl ist mit der eingestellten Wahrscheinlichkeit die Zielzahl, sonst eine andere Ziffer (nicht die Zielzahl, nicht die vorige). Wechsel alle `intervalMs` (mindestens 400 ms, Blinkregel 2,5 Wechsel pro Sekunde), weiches Einblenden in 120 ms. Berührung des Kreises während der Zielzahl = erkannt (Reaktionszeit ab Erscheinen), sonst „Berührung ohne Zielzahl“; Zielzahl ohne Berührung bis zum Wechsel = verpasst. Der Zahlenwechsel wird bis zum Zeitpunkt der Berührung nachgerechnet (Ereigniszeit statt Bildzeit). Eine zum Schluss nur angeschnittene Zielzahl zählt nicht mit, damit „erkannt + verpasst = gezeigt“ gilt.
- **Kreis:** Radius 3 cm, höchstens 28 % der kürzeren Feldseite.
- **Rand:** Punkte wie bei Spot-Touch (907) mit Bereich „Rand“ (ab 60 % des Feldradius) und Kreuz-Abstand, je ein Punkt, mit 0,5 cm Abstand zum Kreis; Größe so begrenzt, dass neben dem Kreis Platz bleibt. Treffer = Radius + 0,3 cm, mindestens 24 px; Doppeltipp auf einen Punkt zählt nicht als Fehltipp.
- **Modi:** Beide / nur Mitte / nur Rand; jeder Modus hat seinen eigenen Verlauf. Hauptwert: erkannte Zielzahlen (bei „Nur Rand“ getroffene Punkte).
- **Rückmeldung:** ✓ am Treffer, ✗ am Fehltipp, kein Blitz, kein Rot, keine Vollflächeneffekte; Ton nur, wenn eingestellt; im Intro Warnhinweis „Lichtreize“.
- **Schnellmodus** (`?quick=1`): 8 s. Persönlicher Tipp: viele Berührungen ohne Zielzahl, viele verpasste Zielzahlen bzw. Punkte, bei „Beide“ der Hinweis, die anderen Modi zum Vergleich zu spielen (die App vergleicht nicht automatisch).

## 3. Herleitung aus der Forschung (keine Beschreibung eines Programms)

- **Doppelaufgaben-Störung:** Menschen haben oft Mühe, zwei einfache Aufgaben gleichzeitig auszuführen; Studien zeigen einen Engpass bei der Wahl der Handlung, der die zweite Reaktion verzögern kann, und weitere Grenzen bei Vorbereitung, Wahrnehmung und Zeitsteuerung (Pashler, 1994).
- **Übung:** Bei einfachen Wahlreaktionen erreichten einige Personen nach mäßig viel Übung praktisch perfekte Zeitteilung (Schumacher et al., 2001); in anderen Versuchen verkürzte Übung den Engpass, nur bei einigen wurde er umgangen (Ruthruff et al., 2006).
- **Mitte und Rand:** Das nützliche Sehfeld hängt auch von Ablenkern und Zweitaufgaben ab (Ball et al., 1988). Unter 93 Studien zu Randseh-Übungen im Sport war keine mit Blickmessung; am besten kontrolliert waren Aufgaben mit einer Zweitaufgabe in der Mitte (Vater & Strasburger, 2021). Die Zahlenfolge in der Mitte gibt dem Blick einen Grund, dort zu bleiben – eine Kontrolle ist sie nicht.
- **Vergleichsmodi:** Die „Kosten“ der Doppelaufgabe ergeben sich nur aus dem Vergleich mit den Einzelaufgaben; deshalb sind „Nur Mitte“ und „Nur Rand“ eingebaut. Das ist eine eigene Beobachtung, kein Maß aus der Forschung.
- **Was nicht belegt ist:** bessere Aufmerksamkeit im Verkehr, Sport oder Beruf; eine größere „Aufmerksamkeitskapazität“.

## 4. Optische und okulomotorische Grundlagen

- **Reizgrößen:** Bei 50 cm Abstand entspricht 1 cm etwa 1,15°; der Kreis in der Mitte (Durchmesser 6 cm) misst etwa 6,9°, die Standard-Randpunkte (5 cm) etwa 5,7° (eigene Rechnung). Die Ziffer in der Mitte ist groß und kontrastreich.
- **Wo „Rand“ liegt:** Auf einem 10,9-Zoll-Tablet (etwa 22,7 × 15,8 cm) liegen die Randpunkte bei 50 cm Abstand etwa 5 bis 15° von der Mitte entfernt, oben und unten näher als seitlich (eigene Rechnung) – nahe Peripherie. Große, kontrastreiche Punkte sind dort gut sichtbar; die Sehschärfe nimmt zum Rand hin ab (Anstis, 1974).
- **Blick in der Mitte:** Die Zahlenfolge zwingt dazu, regelmäßig in die Mitte zu schauen; plötzlich erscheinende Randpunkte ziehen den Blick aber an (Sakkadenlatenz im Median etwa 177 ms; Bargary et al., 2017). Weil die Hand zum Rand muss, wandert der Blick oft mit – ob er in der Mitte bleibt, misst die App nicht.
- **Brillenträger:** Mitte und Rand liegen auf verschiedenen Höhen; bei Gleitsicht wechselt die Schärfe mit der Blickhöhe. Große Punkte bleiben erkennbar.
- **Bildschirmarbeit:** Die Doppelaufgabe ist anstrengend; am Bildschirm sinkt die Lidschlagrate (Portello et al., 2013). Höchstens etwa 10 Minuten am Stück.

## 5. Neurowissenschaftliche Grundlagen

- **Engpass bei der Handlungswahl:** Wenn zwei Aufgaben je eine Reaktion verlangen, muss die Auswahl der Handlung oft nacheinander geschehen; die zweite Reaktion verzögert sich (Pashler, 1994). Hier konkurrieren „Kreis berühren“ und „Randpunkt berühren“ um dieselbe Hand.
- **Übung und Automatisierung:** Übung kann den Engpass verkürzen; nur bei manchen Personen wird er weitgehend umgangen (Schumacher et al., 2001; Ruthruff et al., 2006). Ob das in dieser Übung geschieht, ist nicht untersucht.
- **Hemmung:** Bei Nicht-Zielzahlen darf der Kreis nicht berührt werden; Berührungen ohne Zielzahl werden gezählt.
- **Nützliches Sehfeld:** Es schrumpft, wenn die Mitte Aufmerksamkeit bindet (Ball et al., 1988); das ist ein Grund, warum Randpunkte bei der Doppelaufgabe öfter verpasst werden.
- Eine Aussage „diese Übung trainiert Region X“ lässt sich daraus nicht ableiten und wird nicht gemacht.

## 6. Motorische Grundlagen

- **Eine Hand, zwei Ziele:** Die Hand wechselt zwischen dem Kreis in der Mitte und den Randpunkten; die Wege folgen dem Fitts'schen Gesetz (längere Wege, kleinere Punkte → mehr Zeit). Steht die Hand gerade am Rand, verlängert sich die Zeit bis zur Berührung der Mitte.
- **Trefferflächen:** Randpunkte mit 0,3 cm Zugabe, mindestens 24 px; der Kreis ist groß.
- **Belastung:** Der Arm schwebt über der Fläche; bei langen Durchläufen ermüden Schulter und Hand. Hand wechseln und lockern.

## 7. Einflussfaktoren und Messgrenzen

- **Keine Blickmessung:** Ob der Blick in der Mitte bleibt, prüft die App nicht.
- **Wenige Zielzahlen:** Bei 60 s, 900 ms und 20 % erscheinen nur etwa 13 Zielzahlen (eigene Rechnung); ein oder zwei verpasste verändern das Ergebnis stark. Längere Durchläufe sind verlässlicher.
- **Zeitfenster:** Die Zielzahl muss berührt werden, solange sie zu sehen ist; unter etwa 600 ms Wechsel wird das Fenster knapp, besonders wenn die Hand gerade am Rand ist.
- **Touch-Latenz:** Reaktionszeiten enthalten die Verzögerung von Bildschirm und Touch-Sensor; Touchgeräte messen Zeiten durchweg zu lang, je nach Gerät unterschiedlich (Pronk et al., 2020; Tablets nicht untersucht). Nur auf demselben Gerät vergleichen.
- **Kalibrierung und Bühne:** Ohne Kalibrierung sind Punkte auf Tablets etwa ein Viertel kleiner als eingestellt (38 statt etwa 52 px pro cm; eigene Rechnung); auf kleinen Bildschirmen werden Punkte neben dem Kreis begrenzt.
- **Vergleich der Modi:** Die Kosten der Doppelaufgabe zeigen sich nur im eigenen Vergleich der drei Modi mit gleichen Einstellungen; Reihenfolge, Ermüdung und Übung innerhalb einer Sitzung vermengen sich dabei.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel (für die Aufgabenart):** In Laborversuchen verringerte Übung die Störung zwischen zwei einfachen Aufgaben, bei einigen Personen bis zu praktisch perfekter Zeitteilung (Schumacher et al., 2001; Ruthruff et al., 2006). Für diese Übung gibt es keine Studie; ein Teil der Verbesserung ist Gewöhnung an Aufgabe und Gerät (Guo et al., 2025).
- **Naher Transfer – schwach:** Ob andere Doppelaufgaben profitieren, ist für diese Form nicht untersucht; Randseh-Übungen im Sport zeigen keinen nachgewiesenen Übertrag (Vater & Strasburger, 2021).
- **Alltagstransfer – fehlend:** Kein Beleg für Verkehr, Sport oder Beruf.
- **Einordnung:** Die Doppelaufgabe macht erlebbar, dass zwei Aufgaben zusammen schwerer sind als jede allein. Werte und „Kosten“ sind eigene Beobachtungen für den Vergleich mit sich selbst, keine Normwerte.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** zwei Aufgaben gleichzeitig (Mitte beachten, am Rand reagieren) geübt werden sollen; jemand beide Teilaufgaben allein schon sicher beherrscht; der Unterschied zwischen Einzel- und Doppelaufgabe selbst beobachtet werden soll; ein Tablet mit Touch genutzt wird.
- **Weniger passend, wenn …** Aufmerksamkeit oder Fahreignung gemessen werden sollen; der Blick kontrolliert werden soll; Lichtempfindlichkeit besteht; jemand Einsteiger ist (dann zuerst 907 oder „Nur Mitte“ / „Nur Rand“).
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: Zahl wechselt (höchstens 2,5-mal pro Sekunde, weich), Punkte erscheinen und verschwinden; bei bekannter Lichtempfindlichkeit verzichten (Fisher et al., 2005).
  - `aufmerksamkeitsprobleme`, `kognitive_einschraenkung`: zuerst die Einzelmodi, langsamer Zahlenwechsel (1.200–1.800 ms), seltene Zielzahlen, kurze Durchläufe.
  - `gesichtsfeldausfall`: Randpunkte in einem ausgefallenen Bereich werden verpasst; keine Gesichtsfeldprüfung. Neu bemerkte Ausfälle oder plötzlicher Sehverlust gehören ärztlich abgeklärt, statt weiterzuüben (Muchnick, 2008, S. 6, 28).
  - `hand_arm_beschwerden`, `tremor_parkinson`: große Punkte, lange Sichtbarkeit, längere Pause; kurze Durchläufe, Hand wechseln.
- **Kombiniert gut mit …** 907 (Spot-Touch als Einzelaufgabe für den Rand), 205 (Doppelt gefordert: Kugel und Zeichen), 401 (Mitte fixieren, Randpunkte bemerken), 108 (Mitte und Rand auf einen Blick), 208 (Daueraufmerksamkeit), 912 (Erkennen am Rand).
- Keine Diagnosen, keine Heilversprechen; nicht als Aufmerksamkeitsprüfung darstellen.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Kein automatischer Modusvergleich:** Die Kosten muss die Person selbst ablesen; eine Ergebnistabelle mit dem letzten Lauf je Modus (gleiche Einstellungen) wäre hilfreich, ohne Normanspruch.
- **Wenige Zielzahlen:** etwa 13 in 60 s; ein Hinweis auf längere Durchläufe oder ein höherer Standardanteil würde die Werte stabilisieren.
- **Keine Blickmessung:** Randpunkte können angeschaut werden; ehrlich benannt in `texts.ts`.
- **Gleiche Hand für beide Aufgaben:** Die motorische Konkurrenz vermengt sich mit der Aufmerksamkeitsteilung; eine Variante mit zwei Händen oder Tastatur für die Mitte könnte beides trennen.

## 11. Quellen

### Von der Website angegeben
(keine, eigene Übung)

### Weitere Fachliteratur
- Pashler, H. (1994). Dual-task interference in simple tasks: Data and theory. *Psychological Bulletin*, *116*(2), 220–244. https://doi.org/10.1037/0033-2909.116.2.220 – Engpass bei der Handlungswahl (Crossref geprüft).
- Schumacher, E. H., Seymour, T. L., Glass, J. M., Fencsik, D. E., Lauber, E. J., Kieras, D. E., & Meyer, D. E. (2001). Virtually perfect time sharing in dual-task performance: Uncorking the central cognitive bottleneck. *Psychological Science*, *12*(2), 101–108. https://doi.org/10.1111/1467-9280.00318 – praktisch perfekte Zeitteilung nach Übung (Crossref geprüft).
- Ruthruff, E., Van Selst, M., Johnston, J. C., & Remington, R. (2006). How does practice reduce dual-task interference: Integration, automatization, or just stage-shortening? *Psychological Research*, *70*(2), 125–142. https://doi.org/10.1007/s00426-004-0192-7 – Übung verkürzt den Engpass (Crossref geprüft).
- Ball, K. K., Beard, B. L., Roenker, D. L., Miller, R. L., & Griggs, D. S. (1988). Age and visual search: Expanding the useful field of view. *Journal of the Optical Society of America A*, *5*(12), 2210–2219. https://doi.org/10.1364/JOSAA.5.002210 – nützliches Sehfeld mit Zweitaufgaben (Crossref geprüft).
- Vater, C., & Strasburger, H. (2021). Topical review: The top five peripheral vision tools in sport. *Optometry and Vision Science*, *98*(7), 704–722. https://doi.org/10.1097/OPX.0000000000001732 – 93 Studien, keine mit Eye-Tracking, Zweitaufgabe in der Mitte (Crossref geprüft).
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology*, *16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Lerneffekt bei trainingsähnlicher Prüfung (Crossref geprüft).
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, *52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touchgeräte messen Reaktionszeiten zu lang (Crossref geprüft).
- Anstis, S. (1974). A chart demonstrating variations in acuity with retinal position. *Vision Research*, *14*(7), 589–592. https://doi.org/10.1016/0042-6989(74)90049-2 – Sehschärfe nimmt zum Rand ab (Crossref geprüft).
- Bargary, G., Bosten, J. M., Goodbourn, P. T., Lawrance-Owen, A. J., Hogg, R. E., & Mollon, J. D. (2017). Individual differences in human eye movements: An oculomotor signature? *Vision Research*, *141*, 157–169. https://doi.org/10.1016/j.visres.2017.03.001 – Sakkadenlatenz (Crossref geprüft).
- Portello, J. K., Rosenfield, M., & Chu, C. A. (2013). Blink rate, incomplete blinks and computer vision syndrome. *Optometry and Vision Science*, *90*(5), 482–487. https://doi.org/10.1097/OPX.0b013e31828f09a7 – Lidschlag bei Bildschirmarbeit (Crossref geprüft).
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, *46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Photosensitivität (Crossref geprüft).
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28).
