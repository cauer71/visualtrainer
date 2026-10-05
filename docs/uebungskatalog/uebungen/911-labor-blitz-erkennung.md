---
# ===== Kennung =====
nr: 911
kennung: labor-blitz-erkennung
name: "Blitz-Erkennung (kurz gezeigte Ziffern oder Buchstaben erfassen und eintippen)"
name_original: "– (eigene Blickfit-Labor-Übung mit Einstellungen)"
kapitel: "Labor"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "labor-blitz-erkennung", name: "Blitz-Erkennung", unterschiede: "eigene Labor-Übung mit Einstellungen"}
stand: 2026-10-05

# ===== Überblick =====
kurzbeschreibung: "Nach einem Kreuz in der Mitte erscheinen für Bruchteile einer Sekunde 1 bis 6 Ziffern oder Buchstaben, danach wahlweise kurz eine graue Maske. Man tippt die Zeichen in der richtigen Reihenfolge über ein Tastenfeld ein. Anzahl und Art der Zeichen, Anzeigedauer, Maske, Zeichengröße und Durchgänge stellt man selbst ein; auf Wunsch sucht die Übung die Anzeigedauer, um die sich das Ergebnis einpendelt."
ziel_funktionen: [visuelle_verarbeitungsgeschwindigkeit]
eingabe: [touch, maus]
tablet_geeignet: ja
dauer_sekunden: 120
schwierigkeit_anpassung: "Einstellungen (maßgeblich ist PARAMS in src/exercises/labor-blitz-erkennung/logic.ts): Durchgänge 5–100 (Standard 20), Zeichenart Ziffern (10) / Buchstaben (18), Zeichen pro Durchgang 1–6 (3; kein Zeichen doppelt), Anzeigedauer 10–2000 ms (200; gezeigt in ganzen Bildern, bei 60 Hz ≈ 17 ms je Bild), Maske nach der Anzeige ja/nein (150 ms), Zeichenhöhe 1–12 cm (3; auf der Bühne begrenzt). Wahlweise „Dauer automatisch anpassen“: zwei ganz richtige Durchgänge in Folge → Anzeige kürzer (× 0,8), ein Fehler → länger (× 1,25), gerechnet in ganzen Bildern, nie unter 1 Bild; Schwelle = Mittel der letzten Umkehrpunkte (rechnerisch etwa 70 % richtig, bei kurzen Läufen ungenau). Faustregel der Übung (keine Vorgabe aus der Forschung): drei Durchläufe über 90 % → eine Einstellung schwerer, unter 60 % → leichter."
messgroessen: ["Hauptwert: Anteil ganz richtiger Durchgänge", "richtige Zeichen an der richtigen Stelle (Anteil)", "Eingabezeit (Mittel)", "mit automatischer Anpassung: geschätzte Schwelle der Dauer in ms und in Bildern", "gemessene Anzeigedauer (Mittel und Schwankung), geschätzte Bildwiederholrate, gestörte Durchgänge", "tatsächliche Zeichenhöhe", "Vergleich nur mit Durchläufen gleicher Einstellungen auf demselben Gerät; keine Normwerte, keine Blickmessung"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
# Profil für die Standard-Einstellungen (3 Ziffern, 200 ms, Maske, 3 cm, feste Dauer); Werte geschätzt.
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 1
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 2
    blickfolge: 0
    sakkaden: 0
    fixation: 2
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 3
    zeitliche_aufloesung: 1
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 0
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 2
    kurzzeitgedaechtnis_visuell_raeumlich: 1
    verarbeitungsgeschwindigkeit: 2
    antizipation: 1
    entscheidung_wahlreaktion: 0
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
voraussetzungen: ["Bildschirm einmal kalibrieren, damit die Zeichenhöhe in Zentimetern stimmt", "Etwa 50–60 cm Abstand; Spiegelungen und grelles Licht vermeiden", "Ziffern bzw. lateinische Großbuchstaben sicher erkennen; Blick auf das Kreuz in der Mitte halten", "Keine bekannte Lichtempfindlichkeit oder Epilepsie (kurze Helligkeitswechsel, höchstens einer pro Sekunde, kleine Fläche)"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, kopfschmerz_asthenopie, sehbehinderung_niedriger_visus, presbyopie_gleitsicht, lese_rechtschreib_schwaeche, aufmerksamkeitsprobleme]
geeignet_fuer: ["Aus einem sehr kurzen Blick möglichst viel aufnehmen und kurz behalten (Ziffern oder Buchstaben eintippen)", "Schwierigkeit über Zahl der Zeichen, Anzeigedauer und Maske fein einstellen", "Mit automatischer Anpassung eine persönliche Anzeigedauer-Schwelle bei festen Einstellungen über Wochen vergleichen", "Vergleich mit sich selbst auf demselben Gerät und bei ähnlichem Licht"]
weniger_geeignet_fuer: ["Messung von Sehschärfe, Wahrnehmungstempo oder Gedächtnis (kein validiertes Verfahren, keine Normwerte)", "Menschen mit Lichtempfindlichkeit, Epilepsie oder Migräne mit Lichtauslösern", "Blickbewegungen, Blickfolge oder Handgenauigkeit üben", "Vergleiche zwischen Geräten (Bildwiederholrate und Bildschirmtechnik bestimmen die wahre Dauer)"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: unklar
  alltag_transfer: fehlend
  kommentar: "Grundlage sind Laborbefunde zur Kurzdarbietung: Direkt nach kurzer Anzeige ist mehr verfügbar, als man berichten kann, es schwindet schnell (Sperling, 1960); eine Maske kann das Gesehene unsichtbar machen (Enns & Di Lollo, 2000). Für diese Übung gibt es keine Studie; Verbesserungen in trainingsähnlichen Prüfungen sind zu großen Teilen Gewöhnung (Guo et al., 2025). Ein Nutzen für Alltag, Sport oder Verkehr ist nicht belegt."
aehnliche_uebungen: [108, 203, 602, 912]
stichworte: ["Blitz-Erkennung", "Kurzdarbietung", "Anzeigedauer in Bildern", "Maskierung", "ikonisches Gedächtnis", "Ziffern merken", "adaptive Treppe", "Schwelle", "Bildwiederholrate", "Labor"]
---

# 911 · Blitz-Erkennung (kurz gezeigte Ziffern oder Buchstaben erfassen und eintippen)

> Original: – (eigene Blickfit-Labor-Übung mit Einstellungen) · Blickfit: „Blitz-Erkennung“ (`src/exercises/labor-blitz-erkennung/`, Kategorie Wahrnehmung, Labor)

## 1. Kurzbeschreibung

In der Mitte erscheint ein Kreuz, auf das man schaut. Dann stehen für sehr kurze Zeit – standardmäßig 200 Millisekunden – einige Ziffern oder Buchstaben in einer Zeile da; danach folgt wahlweise kurz eine Maske aus grauen Blöcken. Anschließend tippt man die Zeichen in der gezeigten Reihenfolge über ein Tastenfeld ein und sieht, ob es richtig war. Die Übung hat **Einstellungen** statt Stufen: Zeichenart (Ziffern oder Buchstaben), Zeichen pro Durchgang (1 bis 6, Standard 3), Anzeigedauer (10 bis 2000 ms), Maske ja/nein, Zeichenhöhe in Zentimetern und Anzahl der Durchgänge (20). Auf Wunsch passt die Übung die Anzeigedauer automatisch an und schätzt so die Dauer, um die sich das Ergebnis einpendelt. Weil ein Bildschirm nur ganze Bilder zeigen kann, zählt die Übung die Bilder und meldet die tatsächlich gemessene Dauer.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `index.ts`, `logic.ts` (`FlashSession`), `layout.ts`, `texts.ts`, `science.ts` in `src/exercises/labor-blitz-erkennung/` und `_shared/labor-bilder.ts`, `_shared/labor-adaptive.ts` (Stand 05.10.2026).

- **Durchgang:** Kreuz 700 ms → Zeichen für eine Zahl **ganzer Bilder** → optional Maske 150 ms → Tastenfeld mit „Löschen“ → Rückmeldung 500 ms. Zwischen zwei Darbietungen liegt immer mindestens 1 s (Blinkregel der App).
- **Bilder statt Millisekunden:** Die Bilddauer wird aus den Zeitstempeln der Bilder geschätzt (Median, 60 Hz bis genug Daten vorliegen); Bilder = round(Dauer / Bilddauer), mindestens 1. Die tatsächlich verstrichene Zeit wird je Durchgang gemessen; weicht sie um mehr als ein halbes Bild ab (Bild ausgelassen), gilt der Durchgang als gestört und zählt nicht für die Anpassung.
- **Zeichen:** Ziffern 0–9 oder 18 Großbuchstaben, ohne Wiederholung im Durchgang; gedämpftes Hellgrau statt Weiß auf kleiner Fläche; Abstand Mitte zu Mitte 1,25 Zeichenhöhen; Höhe in cm über die Kalibrierung, begrenzt, wenn die Zeile sonst nicht auf die Bühne passt.
- **Maske:** mittelgraue Blöcke, weich ausgeblendet, kein Rot, keine Vollflächeneffekte.
- **Automatische Anpassung (wahlweise):** Treppe in ganzen Bildern: 2 ganz richtige Durchgänge in Folge → × 0,8, 1 Fehler → × 1,25 (Grenzen 1 Bild bis 2000 ms); Schwelle = Mittel der letzten Umkehrpunkte (mindestens 2 nötig).
- **Ergebnis:** Hauptwert Anteil ganz richtiger Durchgänge; dazu richtige Zeichen an der richtigen Stelle, Eingabezeit, Schwelle (ms und Bilder), gemessene Dauer und ihre Schwankung, geschätzte Bildwiederholrate, gestörte Durchgänge, tatsächliche Zeichenhöhe. Rückmeldung mit ✓/✗ und Text („Gezeigt: …“, „Deine Eingabe: …“).
- **Schnellmodus** (`?quick=1`): 2 Durchgänge. Im Intro Warnhinweis „Lichtreize“ (`warning: 'flash'`).
- **Vergleich:** Verlauf, Bestwert und „Letztes Mal“ nur bei gleichen Einstellungen.

## 3. Herleitung aus der Forschung (keine Beschreibung eines Programms)

- **Kurzdarbietung:** Direkt nach einer sehr kurzen Anzeige ist mehr Information verfügbar, als hinterher berichtet werden kann; sie schwindet schnell, in der Größenordnung einer Sekunde (Sperling, 1960). Ein Teil der Aufgabe ist also das kurze Merken bis zur Eingabe.
- **Maske:** Ein Muster direkt nach der Anzeige kann das Gesehene unsichtbar machen; Aufmerksamkeit spielt dabei eine große Rolle (Enns & Di Lollo, 2000). Ohne Maske klingt der Eindruck nach, man hat effektiv länger Zeit.
- **Anpassung:** „Zwei richtig → schwerer, ein Fehler → leichter“ ist eine klassische Treppenregel (Levitt, 1971); sie pendelt sich rechnerisch bei etwa 70 % ein, mit festen Schrittweiten und kurzen Läufen aber verzerrt und ungenau (García-Pérez, 1998).
- **Technik:** Bildschirme zeigen ganze Bilder, und das bloße Zählen von Bildern kann bei sehr kurzen Zeiten die wahre Dauer verfehlen (Elze, 2010); Web-Anwendungen zeigen Dauern meist brauchbar genau, bei kurzen Dauern bis 100 ms weniger (Anwyl-Irvine et al., 2021; Pronk et al., 2020).
- **Was nicht belegt ist:** schnelleres Sehen im Alltag, Sport oder Verkehr.

## 4. Optische und okulomotorische Grundlagen

- **Reizgröße:** Bei 50 cm Abstand entspricht 1 cm etwa 1,15°; 3 cm hohe Zeichen sind etwa 3,4° hoch. Drei Zeichen nebeneinander (Abstand 1,25 Zeichenhöhen) belegen etwa 11 cm, die äußeren Zeichen liegen also rund 4° neben dem Kreuz, bei 6 Zeichen bis etwa 11°, sofern die Zeile auf den Bildschirm passt (eigene Rechnung). Sie werden damit nicht mit der Netzhautmitte, sondern etwas daneben erkannt; die Sehschärfe nimmt zum Rand hin ab (Anstis, 1974), große Zeichen gleichen das aus.
- **Kein Blicksprung möglich:** Eine Sakkade auf ein plötzlich erscheinendes Ziel startet im Median nach etwa 177 ms (Bargary et al., 2017). Bei Anzeigedauern unter etwa 150–200 ms sind die Zeichen meist verschwunden, bevor ein Blicksprung landet – erfasst wird, was vom Kreuz aus sichtbar ist. Deshalb ist der ruhige Blick auf das Kreuz Teil der Aufgabe.
- **Kontrast und Helligkeit:** gedämpftes Hellgrau auf dunklem Grund; Spiegelungen und grelles Umgebungslicht senken den Kontrast und stören kurze Anzeigen besonders.
- **Bildwiederholrate:** Bei 60 Hz dauert ein Bild etwa 16,7 ms, bei 120 Hz etwa 8,3 ms. 200 ms sind bei 60 Hz 12 Bilder; Einstellungen unter etwa 50 ms bestehen nur aus wenigen Bildern. Wie lange ein Zeichen wirklich leuchtet, hängt zusätzlich von der Bildschirmtechnik ab (Elze, 2010).
- **Brillenträger:** Die Zeile liegt mittig; bei Gleitsicht durch den passenden Bereich schauen, Kopf ruhig. Wer die Zeichen unscharf sieht, misst eher die Schärfe als das Tempo – dann Zeichen vergrößern oder Brille anpassen.

## 5. Neurowissenschaftliche Grundlagen

- **Kurzzeitiger Sinneseindruck:** Nach einer kurzen Anzeige bleibt für kurze Zeit ein reichhaltiger Eindruck, aus dem man nur einen Teil berichten kann (Sperling, 1960). Wie viel man in einem Blick erfasst und bis zur Eingabe behält, bestimmt das Ergebnis.
- **Maskierung:** Ein nachfolgendes Muster kann die Verarbeitung des vorigen unterbrechen; Aufmerksamkeit beeinflusst, wie stark das wirkt (Enns & Di Lollo, 2000).
- **Gedächtnis:** Mit 4 bis 6 Zeichen wird das kurze Behalten zum begrenzenden Teil; Ziffern lassen sich innerlich „vorsprechen“.
- Eine Aussage „diese Übung trainiert Region X“ lässt sich daraus nicht ableiten und wird nicht gemacht.

## 6. Motorische Grundlagen

Motorisch anspruchslos: Eingabe über ein Tastenfeld mit großen Tasten, ohne Zeitdruck (die Eingabezeit wird nur gezeigt). Die Eingabezeit enthält die Verzögerung des Touch-Sensors und hängt von der Zahl der Zeichen ab; sie ist kein Maß für Reaktionstempo. Tremor stört kaum; „Löschen“ korrigiert Fehltipps vor dem letzten Zeichen.

## 7. Einflussfaktoren und Messgrenzen

- **Keine Blickmessung:** Ob der Blick auf dem Kreuz bleibt, misst die App nicht; das Kreuz ist eine Bitte.
- **Dauer ist geräteabhängig:** Die Anzeigedauer ist auf ganze Bilder gerundet und hängt von Bildwiederholrate und Bildschirmtechnik ab (Elze, 2010). Web-Anwendungen sind bei Dauern bis 100 ms weniger genau als Laboraufbauten (Anwyl-Irvine et al., 2021; Pronk et al., 2020). Die Übung zeigt die gemessene Dauer und zählt gestörte Durchgänge; Werte verschiedener Geräte nicht gleichsetzen.
- **Treppe ungenau:** Mit 20 Durchgängen gibt es nur wenige Umkehrpunkte; die Schwelle ist grob und kann verzerrt sein (García-Pérez, 1998). Für eine halbwegs stabile Schwelle mindestens 20, besser mehr Durchgänge.
- **Raten:** Bei 3 Ziffern ohne Wiederholung gibt es 720 mögliche Folgen; ganz richtiges Raten ist praktisch ausgeschlossen. Bei nur 1 Zeichen liegt die Ratewahrscheinlichkeit bei 10 % (Ziffern) bzw. etwa 6 % (Buchstaben).
- **Kalibrierung und Bühne:** Ohne Kalibrierung sind Zeichen auf Tablets etwa ein Viertel kleiner als eingestellt; passt die Zeile nicht, wird die Höhe begrenzt (steht im Ergebnis).
- **Licht und Tagesform:** Spiegelungen, Müdigkeit und Aufmerksamkeit verändern das Ergebnis deutlich; nur bei ähnlichem Licht vergleichen.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach:** Wiederholung verbessert das Ergebnis in der geübten Aufgabe vermutlich, ein großer Teil davon ist Gewöhnung an Aufgabe und Gerät (Guo et al., 2025). Für diese Übung gibt es keine Studie.
- **Naher Transfer – unklar:** Ob andere Kurzdarbietungsaufgaben profitieren, ist für diese Form nicht untersucht.
- **Alltagstransfer – fehlend:** Kein Beleg für Alltag, Sport oder Verkehr.
- **Einordnung:** Die Übung zeigt, wie viel man aus einem kurzen Blick aufnehmen und kurz behalten kann. Anteil richtiger Durchgänge und Schwelle sind Werte für den Vergleich mit sich selbst bei gleichen Einstellungen, keine Normwerte.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** schnelles Erfassen aus einem kurzen Blick mit kurzem Behalten geübt werden soll; die Schwierigkeit über Zeichenzahl, Dauer und Maske gesteuert werden soll; eine persönliche Schwelle bei festen Einstellungen über Wochen verglichen werden soll; ruhiger Blick in die Mitte möglich ist.
- **Weniger passend, wenn …** Lichtempfindlichkeit, Epilepsie oder lichtausgelöste Migräne bestehen; Sehschärfe, Wahrnehmungstempo oder Gedächtnis gemessen werden sollen; Geräte verglichen werden sollen; Blick- oder Handbewegungen geübt werden sollen.
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: kurze Helligkeitswechsel (höchstens einer pro Sekunde, kleine Fläche, gedämpft, kein Rot). Licht- und musterausgelöste Anfälle sind selten, aber möglich (Fisher et al., 2005); bei bekannter Lichtempfindlichkeit verzichten.
  - `kopfschmerz_asthenopie`: kurze Einheiten (höchstens etwa 10 Minuten), Pausen; bei Kopfschmerzen oder Flimmern aufhören.
  - `sehbehinderung_niedriger_visus`, `presbyopie_gleitsicht`: größere Zeichen und längere Dauer; sonst misst die Übung eher die Schärfe.
  - `lese_rechtschreib_schwaeche`: Ziffern statt Buchstaben.
  - `aufmerksamkeitsprobleme`: weniger Durchgänge, wenige Zeichen.
- **Kombiniert gut mit …** 108 (Mitte und Rand auf einen Blick erfassen), 912 (Buchstaben am Rand erkennen), 602 (Zahlenspanne), 203 (Zielwort im Wortstrom).
- Treten Flimmern, Sehstörungen oder Kopfschmerz mit Sehverschlechterung auf, sollte das ärztlich abgeklärt werden, statt weiterzuüben (Muchnick, 2008, S. 6, 28).
- Keine Diagnosen, keine Heilversprechen; nicht als Seh- oder Gedächtnisprüfung darstellen.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Geräteabhängige Dauer:** Die wahre Leuchtdauer (Bildschirmtechnik, Nachleuchten) misst die App nicht; ehrlich benannt in `texts.ts`.
- **Kurze Treppe:** Bei 20 Durchgängen ist die Schwelle grob; eine Mindestzahl an Umkehrpunkten oder zwei verschränkte Treppen würden stabilisieren.
- **Lichtreize:** Blinkregel (≤ 1 Darbietung/s), gedämpfte Farben, kleine Fläche und Warnhinweis sind umgesetzt; weiterhin nicht für Lichtempfindliche.
- **Zeilenbreite:** Bei 6 großen Zeichen liegen die äußeren weit neben dem Kreuz; die Zeichen werden auf der Bühne begrenzt, die Exzentrizität aber nicht ausgewiesen.

## 11. Quellen

### Von der Website angegeben
(keine, eigene Übung)

### Weitere Fachliteratur
- Sperling, G. (1960). The information available in brief visual presentations. *Psychological Monographs: General and Applied*, *74*(11), 1–29. https://doi.org/10.1037/h0093759 – mehr verfügbar als berichtbar, schwindet schnell (Crossref geprüft).
- Enns, J. T., & Di Lollo, V. (2000). What’s new in visual masking? *Trends in Cognitive Sciences*, *4*(9), 345–352. https://doi.org/10.1016/S1364-6613(00)01520-5 – Maskierung und Aufmerksamkeit (Crossref geprüft).
- Levitt, H. (1971). Transformed up-down methods in psychoacoustics. *The Journal of the Acoustical Society of America*, *49*(2B), 467–477. https://doi.org/10.1121/1.1912375 – Treppenregel 2 richtig / 1 falsch (Crossref geprüft).
- García-Pérez, M. A. (1998). Forced-choice staircases with fixed step sizes: Asymptotic and small-sample properties. *Vision Research*, *38*(12), 1861–1881. https://doi.org/10.1016/S0042-6989(97)00340-4 – Ungenauigkeit kurzer Treppen mit festen Schritten (Crossref geprüft).
- Elze, T. (2010). Misspecifications of stimulus presentation durations in experimental psychology: A systematic review of the psychophysics literature. *PLoS ONE*, *5*(9), e12792. https://doi.org/10.1371/journal.pone.0012792 – Bildzählen und wahre Anzeigedauer (Crossref geprüft).
- Anwyl-Irvine, A., Dalmaijer, E. S., Hodges, N., & Evershed, J. K. (2021). Realistic precision and accuracy of online experiment platforms, web browsers, and devices. *Behavior Research Methods*, *53*(4), 1407–1425. https://doi.org/10.3758/s13428-020-01501-5 – Genauigkeit der Anzeigedauer im Web (Crossref geprüft).
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, *52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Zeitgenauigkeit auf Touchgeräten (Crossref geprüft).
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology*, *16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Lerneffekt bei trainingsähnlicher Prüfung (Crossref geprüft).
- Anstis, S. (1974). A chart demonstrating variations in acuity with retinal position. *Vision Research*, *14*(7), 589–592. https://doi.org/10.1016/0042-6989(74)90049-2 – Sehschärfe nimmt zum Rand ab (Crossref geprüft).
- Bargary, G., Bosten, J. M., Goodbourn, P. T., Lawrance-Owen, A. J., Hogg, R. E., & Mollon, J. D. (2017). Individual differences in human eye movements: An oculomotor signature? *Vision Research*, *141*, 157–169. https://doi.org/10.1016/j.visres.2017.03.001 – Sakkadenlatenz (Crossref geprüft).
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, *46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Photosensitivität (Crossref geprüft).
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28).
