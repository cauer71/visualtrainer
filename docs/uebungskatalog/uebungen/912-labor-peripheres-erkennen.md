---
# ===== Kennung =====
nr: 912
kennung: labor-peripheres-erkennen
name: "Peripheres Erkennen (Blick in der Mitte, kurz aufblitzenden Buchstaben am Rand erkennen)"
name_original: "– (eigene Blickfit-Labor-Übung mit Einstellungen)"
kapitel: "Labor"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "labor-peripheres-erkennen", name: "Peripheres Erkennen", unterschiede: "eigene Labor-Übung mit Einstellungen"}
stand: 2026-10-05

# ===== Überblick =====
kurzbeschreibung: "Man schaut auf eine wechselnde Zahl in der Mitte. Nach einer zufälligen Zeit blitzt links oder rechts (wahlweise auch oben oder unten) kurz ein Buchstabe auf; danach tippt man aus 2 bis 6 Antwortfeldern den gesehenen Buchstaben an. Abstand von der Mitte als Sehwinkel in Grad, Anzeigedauer, Buchstabengröße, Richtungen und Zahl der Antworten stellt man selbst ein; auf Wunsch sucht die Übung die Anzeigedauer, um die sich das Ergebnis einpendelt. Der Blick wird nicht gemessen."
ziel_funktionen: [peripheres_sehen, fixation]
eingabe: [touch, maus]
tablet_geeignet: ja
dauer_sekunden: 120
schwierigkeit_anpassung: "Einstellungen (maßgeblich ist PARAMS in src/exercises/labor-peripheres-erkennen/logic.ts): Durchgänge 8–120 (Standard 32), Abstand von der Mitte 2–40° Sehwinkel (10°; umgerechnet über Kalibrierung und eingetragenen Sehabstand, auf das Machbare begrenzt), Richtungen links/rechts oder alle vier, Anzeigedauer 10–1500 ms (150; in ganzen Bildern), Buchstabenhöhe 1–12 cm (3), Antwortmöglichkeiten 2–6 (4). Wahlweise „Dauer automatisch anpassen“: zwei richtige Antworten in Folge → kürzer (× 0,8), ein Fehler → länger (× 1,25), gerechnet in ganzen Bildern; Schwelle = Mittel der letzten Umkehrpunkte (rechnerisch etwa 70 % richtig, bei kurzen Läufen ungenau). Faustregel der Übung (keine Vorgabe aus der Forschung): drei Durchläufe über 90 % → eine Einstellung schwerer, nahe am Zufallsniveau → leichter."
messgroessen: ["Hauptwert: richtig erkannte Buchstaben (Anteil), mit Zufallsniveau als Bezug (100 % geteilt durch die Zahl der Antworten)", "richtig links/rechts und oben/unten getrennt", "tatsächlicher Abstand von der Mitte in Grad (Mittel; begrenzt, wenn der Bildschirm den Winkel nicht zulässt)", "Antwortzeit (Mittel, nur Information)", "mit automatischer Anpassung: geschätzte Schwelle der Dauer in ms und Bildern", "gemessene Anzeigedauer, geschätzte Bildwiederholrate, gestörte Durchgänge", "Vergleich nur mit Durchläufen gleicher Einstellungen im selben Sehabstand auf demselben Gerät; keine Normwerte, keine Blickmessung, keine Gesichtsfeldprüfung"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
# Profil für die Standard-Einstellungen (10°, links/rechts, 150 ms, 3 cm, 4 Antworten, feste Dauer); Werte geschätzt.
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 1
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 3
    nutzbares_sehfeld: 2
    blickfolge: 0
    sakkaden: 0
    fixation: 3
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 2
    zeitliche_aufloesung: 1
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 1
    inhibition: 2
    geteilte_aufmerksamkeit: 1
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 1
    antizipation: 0
    entscheidung_wahlreaktion: 1
    lesen_sprache: 1
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 1
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
  flimmern_lichtreize: 2
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Bildschirm kalibrieren und den echten Sehabstand eintragen; dann in diesem Abstand sitzen, Kopf mittig vor dem Bildschirm (der Winkel hängt davon ab)", "Blick ruhig auf der Zahl in der Mitte halten können und ehrlich nicht zum Rand schauen", "Lateinische Großbuchstaben sicher kennen", "Keine bekannte Lichtempfindlichkeit oder Epilepsie (kurzes Aufblitzen höchstens einmal pro Sekunde, Zahl in der Mitte wechselt etwa 1,7-mal pro Sekunde)"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, gesichtsfeldausfall, nystagmus, amblyopie, sehbehinderung_niedriger_visus, kopfschmerz_asthenopie]
geeignet_fuer: ["Etwas am Rand des Blickfelds erkennen, während man in der Mitte hinschaut (Blick halten und Randwahrnehmung zusammen)", "Abstand, Dauer und Größe getrennt verändern und sehen, wie sie das Erkennen bestimmen", "Mit automatischer Anpassung eine Schwelle der Dauer bei festem Abstand über Wochen vergleichen", "Links/rechts und oben/unten getrennt betrachten – als eigene Beobachtung ohne Diagnose"]
weniger_geeignet_fuer: ["Prüfung oder Beurteilung des Gesichtsfelds – die Übung ist keine Perimetrie und ersetzt keine Untersuchung", "Kontrolle des Blicks: ohne Eye-Tracking kann zum Rand geschaut werden", "Große Exzentrizitäten auf Tablets oder Handys (Winkel über etwa 13° passen meist nicht)", "Menschen mit Lichtempfindlichkeit, Epilepsie oder lichtausgelöster Migräne"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Das nützliche Sehfeld wird mit dem Alter kleiner und ließ sich durch Übung teilweise vergrößern (Ball et al., 1988); Sehschärfe, Reaktionszeit und Zeichenerkennung ändern sich mit dem Abstand von der Mitte (Anstis, 1974; Strasburger et al., 2011). In 93 Studien zu Randseh-Übungen im Sport prüfte keine den Blick per Eye-Tracking, ein Übertrag auf den Sport ist nicht nachgewiesen (Vater & Strasburger, 2021). Für diese Übung gibt es keine Studie; Verbesserungen in trainingsähnlichen Prüfungen sind zu großen Teilen Gewöhnung (Guo et al., 2025)."
aehnliche_uebungen: [401, 108, 408, 911, 913, 934, 926]
stichworte: ["peripheres Erkennen", "Randsehen", "Exzentrizität in Grad", "Fixation", "Kurzdarbietung", "nützliches Sehfeld", "Sehabstand", "adaptive Treppe", "kein Eye-Tracking", "keine Perimetrie", "Labor"]
---

# 912 · Peripheres Erkennen (Blick in der Mitte, kurz aufblitzenden Buchstaben am Rand erkennen)

> Original: – (eigene Blickfit-Labor-Übung mit Einstellungen) · Blickfit: „Peripheres Erkennen“ (`src/exercises/labor-peripheres-erkennen/`, Kategorie Wahrnehmung, Labor)

## 1. Kurzbeschreibung

In der Mitte des Bildschirms wechselt eine kleine Zahl; sie gibt dem Blick einen Grund, dort zu bleiben. Nach einer zufälligen Zeit blitzt am Rand kurz ein Buchstabe auf – standardmäßig links oder rechts, 10 Grad von der Mitte entfernt, für 150 Millisekunden. Danach erscheinen Antwortfelder mit mehreren Buchstaben, und man tippt den gesehenen an. Die Übung hat **Einstellungen** statt Stufen: Abstand von der Mitte als Sehwinkel in Grad (2 bis 40°), Richtungen (links/rechts oder alle vier), Anzeigedauer, Buchstabenhöhe in Zentimetern, Zahl der Antwortmöglichkeiten (2 bis 6) und Anzahl der Durchgänge (32). Auf Wunsch wird die Anzeigedauer automatisch angepasst. Der Winkel wird aus Kalibrierung und eingetragenem Sehabstand berechnet und auf das begrenzt, was der Bildschirm zulässt; der tatsächliche Winkel steht im Ergebnis. Wohin man schaut, misst die App nicht – „Blick in der Mitte lassen“ ist eine Bitte. Die Übung prüft das Gesichtsfeld nicht.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `index.ts`, `logic.ts` (`PeripherySession`), `layout.ts`, `texts.ts`, `science.ts` in `src/exercises/labor-peripheres-erkennen/` und `_shared/labor-bilder.ts` (Stand 05.10.2026).

- **Durchgang:** Zahl in der Mitte (feste Höhe 1,2 cm, wechselt alle 600 ms, also 1,7-mal pro Sekunde) für eine zufällige Zeit von 900–2200 ms → Buchstabe für eine Zahl ganzer Bilder → Antwortfelder → Rückmeldung 450 ms.
- **Ort:** Abstand Mitte–Buchstabe = Sehabstand · tan(Winkel), Sehabstand aus der Kalibrierung (Standard 40 cm, einstellbar 30–100 cm). Begrenzung nach außen (Buchstabe ganz auf der Bühne, 0,5 cm Rand) und nach innen (mindestens 0,4 cm Luft zur Zahl); der tatsächliche Winkel wird je Durchgang gespeichert, eine Meldung weist zu Beginn auf die Begrenzung hin.
- **Buchstaben und Antworten:** 18 Großbuchstaben; 2–6 Antwortfelder, darunter der richtige; Zufallsniveau = 100 % / Zahl der Antworten.
- **Anzeigedauer in Bildern:** wie bei 911 – Bilddauer aus den Bildzeitstempeln, gemessene Dauer je Durchgang, gestörte Darbietungen zählen nicht für die Treppe; Treppe 2 richtig → × 0,8, 1 Fehler → × 1,25 in ganzen Bildern (Grenzen 1 Bild bis 1500 ms).
- **Blinkregel:** höchstens eine Darbietung pro Sekunde, kleine Fläche, keine Vollflächeneffekte; im Intro Warnhinweis „Lichtreize“.
- **Ergebnis:** Hauptwert Anteil richtig, dazu Zufallsniveau, links/rechts und oben/unten getrennt, tatsächlicher Abstand, Antwortzeit, Schwelle, gemessene Dauer, Bildwiederholrate, gestörte Durchgänge. Persönlicher Tipp (z. B. „nahe am Zufallsniveau“, „Abstand begrenzt“, „Seiten unterschiedlich“ mit Hinweis auf Zufall).
- **Schnellmodus** (`?quick=1`): 3 Durchgänge mit kürzerer Wartezeit (nie unter 600 ms).
- **Vergleich:** nur bei gleichen Einstellungen.

## 3. Herleitung aus der Forschung (keine Beschreibung eines Programms)

- **Nützliches Sehfeld:** Der Bereich, aus dem man in einem Blick Information aufnehmen kann, wird mit dem Alter kleiner und ließ sich durch Übung teilweise vergrößern (Ball et al., 1988).
- **Abhängigkeit vom Ort:** Die Sehschärfe nimmt zum Rand hin ab (Anstis, 1974); auch Reaktionszeit, zeitliche Auflösung und das Erkennen von Zeichen ändern sich mit dem Abstand von der Mitte (Strasburger et al., 2011). Abstand, Dauer und Größe sind deshalb die bestimmenden Einstellungen.
- **Blickkontrolle:** In 93 Studien zu Randseh-Übungen im Sport prüfte keine den Blick per Eye-Tracking; am besten kontrolliert waren Aufgaben mit einer Zweitaufgabe in der Mitte (Vater & Strasburger, 2021). Daraus folgt die wechselnde Zahl in der Mitte – sie ist eine Hilfe, keine Kontrolle.
- **Kurze Dauer:** Eine Sakkade auf ein plötzlich erscheinendes Ziel startet im Median nach etwa 177 ms (Bargary et al., 2017); bei 150 ms ist der Buchstabe meist verschwunden, bevor ein Blicksprung landet. Das macht Hinschauen schwerer, aber nicht unmöglich (bei längeren Dauern sehr wohl möglich).
- **Treppe und Technik:** Levitt (1971), García-Pérez (1998), Elze (2010) wie bei 911.
- **Was nicht belegt ist:** ein „größeres Sehfeld“ im Alltag, Nutzen für Sport, Verkehr oder bei Gesichtsfeldausfällen.

## 4. Optische und okulomotorische Grundlagen

- **Winkel und Größe:** Bei 40 cm Sehabstand liegen 10° etwa 7,1 cm neben der Mitte; ein 3 cm hoher Buchstabe ist dort etwa 4,3° groß (eigene Rechnung). Die Zahl in der Mitte (1,2 cm) misst etwa 1,7°.
- **Was der Bildschirm zulässt:** Ein 10,9-Zoll-Tablet ist im Querformat etwa 22,7 × 15,8 cm groß. Bei 40 cm und 3-cm-Buchstaben sind seitlich höchstens etwa 13°, nach oben und unten etwa 8° möglich (eigene Rechnung); 40° würden einen Abstand von rund 34 cm verlangen. Auf Tablets ist das also nahe Peripherie; größere Winkel werden begrenzt und im Ergebnis ausgewiesen.
- **Randsehen:** Zum Rand nimmt die Sehschärfe stetig ab (Anstis, 1974), und das Erkennen von Zeichen wird zusätzlich durch Nachbarschaft und Aufmerksamkeit begrenzt (Strasburger et al., 2011). Größere Buchstaben helfen weiter außen.
- **Fixation:** Den Blick trotz plötzlich erscheinender Reize in der Mitte zu halten, ist der eigentliche Anspruch. Bei kurzen Dauern (unter etwa 150–200 ms) kann ein reaktiver Blicksprung den Buchstaben kaum noch erreichen (Bargary et al., 2017); sehr kurze Latenzen um 100 ms kommen aber vor, wenn der Fixierpunkt verschwindet (Fischer & Ramsperger, 1984) – hier bleibt die Zahl sichtbar.
- **Kopfposition:** Der Winkel gilt nur, wenn der Kopf mittig vor dem Bildschirm im eingetragenen Abstand ist; seitlich versetzt oder näher stimmt er nicht.
- **Brillenträger:** Gleitsicht und Brillenränder können am Rand unscharfe Zonen erzeugen; bei 40 cm durch den Nahteil schauen, Kopf ruhig. Ergebnisse links/rechts können auch davon abhängen.

## 5. Neurowissenschaftliche Grundlagen

- **Randwahrnehmung:** Das Erkennen von Mustern im Randsehen ist nicht nur durch die Schärfe begrenzt, sondern auch durch die Verarbeitung benachbarter Merkmale und durch Aufmerksamkeit (Strasburger et al., 2011).
- **Aufmerksamkeit und Blick:** Die Aufmerksamkeit kann dorthin gelenkt werden, wo der Buchstabe erscheinen wird, ohne den Blick zu bewegen; gleichzeitig muss der Impuls, zum Aufblitzen hinzuschauen, unterdrückt werden (Inhibition).
- **Nützliches Sehfeld:** Es hängt von der Aufgabe in der Mitte, von Ablenkern und vom Alter ab (Ball et al., 1988); hier ist die Mitte nur eine Fixierhilfe ohne Antwort.
- Eine Aussage „diese Übung trainiert Region X“ lässt sich daraus nicht ableiten und wird nicht gemacht.

## 6. Motorische Grundlagen

Motorisch anspruchslos: ein Tipp auf eines von 2 bis 6 großen Antwortfeldern, ohne Zeitdruck. Die Antwortzeit wird nur zur Information gezeigt und enthält die Verzögerung des Touch-Sensors. Tremor stört kaum.

## 7. Einflussfaktoren und Messgrenzen

- **Keine Blickmessung:** Schaut man doch zum Rand, ist der Durchgang nicht mehr vergleichbar; die App kann das nicht erkennen.
- **Winkel hängt an zwei Eingaben:** Kalibrierung (Karte im Scheckkartenformat) und eingetragener Sehabstand. Stimmt eines davon nicht oder sitzt man anders, stimmt der Winkel nicht. Ohne Kalibrierung rechnet die App mit 38 px pro cm; auf einem Tablet mit etwa 52 px pro cm wären Abstand und Buchstabe dann rund ein Viertel kleiner als berechnet (eigene Rechnung).
- **Bildschirmgrenzen:** Gewünschte Winkel werden auf das Machbare begrenzt; nur Läufe mit gleichem tatsächlichem Abstand vergleichen.
- **Anzeigedauer:** auf ganze Bilder gerundet (60 Hz ≈ 17 ms je Bild) und von der Bildschirmtechnik abhängig (Elze, 2010).
- **Zufall und Seiten:** Bei 4 Antworten liegt das Zufallsniveau bei 25 %. Mit 32 Durchgängen, verteilt auf 2 oder 4 Richtungen, sind Unterschiede zwischen den Seiten oft Zufall oder Haltung; daraus keine Aussage über das Auge ableiten.
- **Treppe ungenau:** wenige Umkehrpunkte bei kurzen Läufen (García-Pérez, 1998).
- **Licht und Tagesform:** Spiegelungen, Müdigkeit und Aufmerksamkeit verändern das Ergebnis.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach:** Training des nützlichen Sehfelds vergrößerte dieses teilweise (Ball et al., 1988) – das war eine andere Aufgabe mit Blickkontrolle im Labor. Für diese Übung gibt es keine Studie; Verbesserungen in trainingsähnlichen Prüfungen sind zu großen Teilen Gewöhnung (Guo et al., 2025).
- **Naher Transfer – schwach:** Ob andere Randseh-Aufgaben profitieren, ist für diese Form nicht untersucht; im Sport wird ein Übertrag erwartet, ist aber nicht nachgewiesen (Vater & Strasburger, 2021).
- **Alltagstransfer – fehlend:** Kein Beleg für Alltag, Sport oder Verkehr.
- **Einordnung:** Die Übung zeigt, wie Abstand, Dauer und Größe das Erkennen am Rand bestimmen. Anteil richtig und Schwelle sind Werte für den Vergleich mit sich selbst, keine Normwerte und keine Gesichtsfeldprüfung.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** Erkennen am Rand bei ruhigem Blick in der Mitte geübt werden soll; Abstand, Dauer und Größe gezielt verändert werden sollen; jemand den Blick ehrlich in der Mitte halten kann; Kalibrierung und Sehabstand sorgfältig eingestellt werden.
- **Weniger passend, wenn …** das Gesichtsfeld geprüft oder beurteilt werden soll; Lichtempfindlichkeit besteht; große Exzentrizitäten auf kleinen Bildschirmen gewünscht sind; der Blick nicht ruhig gehalten werden kann.
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: kurzes Aufblitzen (höchstens einmal pro Sekunde, kleine Fläche) und wechselnde Zahl in der Mitte; bei bekannter Lichtempfindlichkeit verzichten (Fisher et al., 2005).
  - `gesichtsfeldausfall`: Buchstaben in einem ausgefallenen Bereich werden nicht gesehen; das Ergebnis ist keine Perimetrie. Neu bemerkte Ausfälle, plötzlicher Sehverlust oder Doppelbilder gehören ärztlich abgeklärt, statt weiterzuüben (Muchnick, 2008, S. 6, 28).
  - `nystagmus`, `amblyopie`: Fixation in der Mitte kann unruhig oder exzentrisch sein; Winkel und Ergebnisse gelten dann nicht wie angegeben – nur mit Fachperson und ohne Aussage über das Auge.
  - `sehbehinderung_niedriger_visus`: größere Buchstaben, kleinerer Abstand, längere Dauer.
  - `kopfschmerz_asthenopie`: kurze Einheiten (höchstens etwa 10 Minuten), Pausen.
- **Kombiniert gut mit …** 401 (Mitte fixieren, Randpunkte bemerken), 108 (Mitte und Rand auf einen Blick), 911 (Kurzdarbietung in der Mitte), 913 (Doppelaufgabe mit Randpunkten), 408 (zwei Ziele bei ruhigem Blick).
- Keine Diagnosen, keine Heilversprechen; ausdrücklich keine Gesichtsfeldprüfung.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Kein Blickmaß:** Ohne Eye-Tracking bleibt die Fixation eine Bitte; eine Antwortpflicht für die Zahl in der Mitte (Zweitaufgabe) würde die Kontrolle verbessern (vgl. Vater & Strasburger, 2021).
- **Winkel auf Tablets begrenzt:** Die Einstellung reicht bis 40°, auf Tablets sind nur etwa 13° möglich; die Obergrenze könnte am Gerät angezeigt werden.
- **Abhängigkeit vom Sehabstand:** Ein falsch eingetragener Abstand verfälscht den Winkel unbemerkt; ein kurzer Hinweis vor jedem Lauf wäre hilfreich.
- **Seitenvergleich:** Wenige Durchgänge je Richtung; der Hinweis auf Zufall ist umgesetzt, eine Unsicherheitsangabe wäre besser.

## 11. Quellen

### Von der Website angegeben
(keine, eigene Übung)

### Weitere Fachliteratur
- Ball, K. K., Beard, B. L., Roenker, D. L., Miller, R. L., & Griggs, D. S. (1988). Age and visual search: Expanding the useful field of view. *Journal of the Optical Society of America A*, *5*(12), 2210–2219. https://doi.org/10.1364/JOSAA.5.002210 – nützliches Sehfeld, Alter, Übung (Crossref geprüft).
- Strasburger, H., Rentschler, I., & Jüttner, M. (2011). Peripheral vision and pattern recognition: A review. *Journal of Vision*, *11*(5), 13. https://doi.org/10.1167/11.5.13 – Reaktionszeit, zeitliche Auflösung und Zeichenerkennung je nach Abstand von der Mitte (Crossref geprüft).
- Anstis, S. (1974). A chart demonstrating variations in acuity with retinal position. *Vision Research*, *14*(7), 589–592. https://doi.org/10.1016/0042-6989(74)90049-2 – Sehschärfe nimmt zum Rand ab (Crossref geprüft).
- Vater, C., & Strasburger, H. (2021). Topical review: The top five peripheral vision tools in sport. *Optometry and Vision Science*, *98*(7), 704–722. https://doi.org/10.1097/OPX.0000000000001732 – 93 Studien, keine mit Eye-Tracking, Zweitaufgabe in der Mitte (Crossref geprüft).
- Levitt, H. (1971). Transformed up-down methods in psychoacoustics. *The Journal of the Acoustical Society of America*, *49*(2B), 467–477. https://doi.org/10.1121/1.1912375 – Treppenregel (Crossref geprüft).
- García-Pérez, M. A. (1998). Forced-choice staircases with fixed step sizes: Asymptotic and small-sample properties. *Vision Research*, *38*(12), 1861–1881. https://doi.org/10.1016/S0042-6989(97)00340-4 – Ungenauigkeit kurzer Treppen (Crossref geprüft).
- Elze, T. (2010). Misspecifications of stimulus presentation durations in experimental psychology: A systematic review of the psychophysics literature. *PLoS ONE*, *5*(9), e12792. https://doi.org/10.1371/journal.pone.0012792 – wahre Anzeigedauer am Bildschirm (Crossref geprüft).
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology*, *16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Lerneffekt bei trainingsähnlicher Prüfung (Crossref geprüft).
- Bargary, G., Bosten, J. M., Goodbourn, P. T., Lawrance-Owen, A. J., Hogg, R. E., & Mollon, J. D. (2017). Individual differences in human eye movements: An oculomotor signature? *Vision Research*, *141*, 157–169. https://doi.org/10.1016/j.visres.2017.03.001 – Sakkadenlatenz (Crossref geprüft).
- Fischer, B., & Ramsperger, E. (1984). Human express saccades: Extremely short reaction times of goal directed eye movements. *Experimental Brain Research*, *57*(1), 191–195. https://doi.org/10.1007/BF00231145 – sehr kurze Sakkadenlatenzen im Gap-Paradigma (Crossref geprüft).
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, *46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Photosensitivität (Crossref geprüft).
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28).
