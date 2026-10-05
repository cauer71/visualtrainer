---
# ===== Kennung =====
nr: 908
kennung: labor-ziele-ordnen
name: "Bewegte Ziele ordnen (bewegte Zahlen, Buchstaben, Wörter oder Rechnungen der Reihe nach berühren)"
name_original: "– (eigene Blickfit-Labor-Übung mit Einstellungen)"
kapitel: "Labor"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "labor-ziele-ordnen", name: "Bewegte Ziele ordnen", unterschiede: "eigene Labor-Übung mit Einstellungen"}
stand: 2026-10-05

# ===== Überblick =====
kurzbeschreibung: "Zahlen, Buchstaben, Wörter oder Rechnungen bewegen sich über die Fläche – geradeaus mit Abprall am Rand oder gleichmäßig auf einer Kreis- oder Ellipsenbahn. Man berührt sie in der richtigen Reihenfolge (z. B. 1, 2, 3 … oder nach dem Alphabet); ein richtig berührtes Ziel verschwindet. Inhalt, Anzahl, Bewegungsart, Tempo, Zeichengröße und ein Zeitlimit stellt man selbst ein; Hauptwert ist die Gesamtzeit."
ziel_funktionen: [visuelle_suche, auge_hand_koordination]
eingabe: [touch, maus]
tablet_geeignet: ja
dauer_sekunden: 90
schwierigkeit_anpassung: "Keine Stufen und keine automatische Anpassung; alles über Einstellungen (maßgeblich ist PARAMS in src/exercises/labor-ziele-ordnen/logic.ts): Inhalt (Zahlen aufsteigend, Zahlen absteigend, Buchstaben oder deutsche Wörter nach dem Alphabet, Summen oder Produkte nach dem Ergebnis), Anzahl der Ziele 3–15 (Standard 8), Bewegung geradeaus mit Abprall / Kreisbahn / Ellipsenbahn, Tempo 1–30 cm/s (6), Zeichenhöhe 1,5–8 cm (3; auf kleinen Bildschirmen verkleinert, nie unter die Touch-Mindestgröße), Umlaufrichtung (nur Bahnen), Zeitlimit 0–300 s (0 = keines), Ton. Schwerer: mehr Ziele, höheres Tempo, Wörter oder Rechnungen, Zahlen absteigend, kleinere Zeichen. Faustregel der Übung (keine Vorgabe aus der Forschung): ohne Fehler fertig → eine Einstellung schwerer; immer nur eine Einstellung ändern."
messgroessen: ["Hauptwert: Gesamtzeit vom Start bis zum letzten Ziel (mit Zeitlimit höchstens das Limit)", "richtige Ziele (von der Anzahl)", "falsche Ziele berührt", "Danebengetippt (kein Ziel getroffen)", "Zeit pro Ziel: Mittel und Streuung", "Vergleich nur mit Durchläufen gleicher Einstellungen auf demselben Gerät; keine Normwerte"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
# Profil für die Standard-Einstellungen (Zahlen aufsteigend, 8 Ziele, geradeaus, 6 cm/s, 3 cm); Werte geschätzt.
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 2
    blickfolge: 2
    sakkaden: 2
    fixation: 0
    bewegungswahrnehmung: 2
    visuelle_suche: 3
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 2
    inhibition: 1
    geteilte_aufmerksamkeit: 1
    kognitive_flexibilitaet: 1
    arbeitsgedaechtnis: 2
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 1
    verarbeitungsgeschwindigkeit: 2
    antizipation: 2
    entscheidung_wahlreaktion: 0
    lesen_sprache: 1
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 3
    zielbewegung_tempo: 2
    zielbewegung_praezision: 2
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 1
  flimmern_lichtreize: 0
  bewegungsreize_schwindel: 2
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 1

# ===== Auswahlhilfe =====
voraussetzungen: ["Bildschirm einmal kalibrieren, damit die Zeichenhöhe in Zentimetern stimmt", "Etwa 50–60 cm Abstand, Hand locker über der Fläche", "Je nach Inhalt: Zahlen bis 15 der Reihe nach, Alphabet, deutsche Wörter alphabetisch ordnen (Umlaute wie im Wörterbuch) oder Kopfrechnen (Summen bis 60, Einmaleins)", "Für Wörter und Rechnungen Zeichen ab etwa 3 cm wählen, damit sie auch in Bewegung lesbar sind", "Bewegte Ziele mit dem Finger treffen können (Trefferfläche: Kästchen plus 0,3 cm, mindestens 48 px Kantenlänge)"]
vorsicht_bei: [schwindel_vestibulaer, reisekrankheit, kopfschmerz_asthenopie, presbyopie_gleitsicht, lese_rechtschreib_schwaeche, kognitive_einschraenkung, photosensitive_epilepsie]
geeignet_fuer: ["Das nächste Ziel einer Reihenfolge zwischen bewegten Ablenkern suchen und treffen (Suchen, Ordnen im Kopf und Zielen zusammen)", "Schwierigkeit über Inhalt steuern: Zahlen → Buchstaben → Wörter → Rechnungen, ohne die Bewegung zu ändern", "Vorhersehbare Bewegung (Kreis, Ellipse) gegen unregelmäßige (Abprall) vergleichen", "Vergleich mit sich selbst: Gesamtzeit und Fehler über mehrere Durchläufe mit gleichen Einstellungen"]
weniger_geeignet_fuer: ["Messung von Aufmerksamkeit, Verarbeitungstempo oder Exekutivfunktionen: keine Verbindungsaufgabe im klinischen Sinn, keine Normwerte", "Menschen mit Schwindel bei bewegten Mustern (allenfalls langsames Tempo)", "Menschen ohne sichere Kenntnis von Alphabet oder deutscher Rechtschreibung (Wörter) oder ohne Kopfrechnen (Rechnungen)", "Reine Blickfolge oder reine Reaktion üben"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Bei wiederholten Verbindungsaufgaben mit Zahlen und Buchstaben treten deutliche Übungseffekte auf, auch bei wöchentlicher Wiederholung über drei Wochen (Buck et al., 2008); die Leistung spiegelt vor allem Tempo und flüssiges Denken (Salthouse, 2011). Bewegte Ziele, Wörter oder Rechnungen als Berührungsaufgabe sind nicht untersucht; bei trainingsähnlicher Prüfung werden Verbesserungen überschätzt (Guo et al., 2025). Die Einstufung gilt für die Aufgabenart, nicht für diese Übung."
aehnliche_uebungen: [904, 204, 708, 106, 502]
stichworte: ["Ziele ordnen", "Reihenfolge berühren", "bewegte Ziele", "visuelle Suche", "Verbindungsaufgabe", "Trail Making", "Zahlenfolge", "Alphabet", "Kopfrechnen", "Kreisbahn", "Labor"]
---

# 908 · Bewegte Ziele ordnen (bewegte Zahlen, Buchstaben, Wörter oder Rechnungen der Reihe nach berühren)

> Original: – (eigene Blickfit-Labor-Übung mit Einstellungen) · Blickfit: „Bewegte Ziele ordnen“ (`src/exercises/labor-ziele-ordnen/`, Kategorie Konzentration, Labor)

## 1. Kurzbeschreibung

Auf dem Bildschirm bewegen sich Kästchen mit Zahlen, Buchstaben, Wörtern oder Rechnungen. Oben steht die Aufgabe, zum Beispiel „Zahlen von klein nach groß“. Man berührt das jeweils nächste Ziel der Reihe; ein richtig berührtes Ziel verschwindet, ein falsches zählt als Fehler, sonst passiert nichts. Die Übung hat keine Stufen, sondern **Einstellungen**: Inhalt (Zahlen auf- oder absteigend, Buchstaben oder Wörter nach dem Alphabet, Summen oder Produkte nach dem Ergebnis), Anzahl der Ziele (3 bis 15, Standard 8), Bewegung (geradeaus mit Abprall am Rand, Kreis- oder Ellipsenbahn), Tempo in cm pro Sekunde, Zeichenhöhe in Zentimetern und ein optionales Zeitlimit. Hauptwert ist die Gesamtzeit; dazu kommen Fehler, Fehltipps und die Zeit pro Ziel. Verglichen wird nur mit eigenen Durchläufen mit gleichen Einstellungen.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `index.ts`, `logic.ts` (`OrderSession`), `texts.ts`, `science.ts` in `src/exercises/labor-ziele-ordnen/` (Stand 05.10.2026).

- **Inhalt (`makeContent`):** Zahlen 1 bis n (auf- oder absteigend); Buchstaben aus einem Vorrat von 23 (ohne Q, X, Y); Wörter aus einer deutschen Wortliste (`_shared/labor-woerter.ts`), sortiert mit `localeCompare('de')`; Summen a + b (a, b = 2–30) bzw. Produkte a × b (a, b = 2–9) mit verschiedenen Ergebnissen, sortiert nach Ergebnis (kleinstes zuerst).
- **Bewegung:** geradeaus mit zufälliger Richtung und Abprall am Rand (Startplätze möglichst weit auseinander) oder gleichmäßig verteilt auf einer Kreis- bzw. Ellipsenbahn (Umlaufrichtung wählbar). Die Bewegung rechnet mit der Zeitdifferenz zwischen zwei Bildern (höchstens 0,25 s je Schritt), also gleich schnell bei 60 und 120 Hz.
- **Größe:** Zeichenhöhe in cm über die Kalibrierung; das längste Kästchen höchstens 90 % der Feldbreite, ein Kästchen höchstens 40 % der Feldhöhe, nie kleiner als ein Touch-Ziel. Kästchenbreite wächst mit der Zeichenzahl (Wörter, Rechnungen).
- **Treffer:** Tipp im Kästchen plus 0,3 cm, halbe Kantenlänge mindestens 24 px. Richtiges Ziel → verschwindet (✓, löst sich auf); falsches Ziel → ✗, Fehler gezählt; Tipp neben alle Ziele → „Danebengetippt“. Doppeltipp (< 250 ms) auf dieselbe Stelle zählt nicht doppelt.
- **Zeit:** Gesamtzeit vom Start (nach 0,7 s Anlauf mit stehenden Zielen) bis zum letzten Ziel; mit Zeitlimit endet der Lauf bei Ablauf, die Gesamtzeit ist dann das Limit. Zeit pro Ziel = Zeit zwischen zwei richtigen Berührungen (das erste ab Start).
- **Schnellmodus** (`?quick=1`): 4 Ziele, höchstens 25 s. Intro-Film: 4 Zahlen auf einer langsamen Ellipsenbahn (2,2 cm/s, 2 cm), eine eingeblendete Hand berührt sie der Reihe nach und einmal absichtlich ein späteres Ziel.
- **Rückmeldung:** weich (✓/✗, kein Blitz, keine Vollflächeneffekte); Ton nur, wenn eingestellt. Punkte nur zur Motivation.
- **Vergleich:** Verlauf, Bestwert und „Letztes Mal“ nur bei gleichen Einstellungen (Ton ausgenommen).

## 3. Herleitung aus der Forschung (keine Beschreibung eines Programms)

- **Vorbild Verbindungsaufgabe:** Zahlen und Buchstaben der Reihe nach zu verbinden (Trail Making, erstmals bei Reitan, 1958) ist ein neuropsychologisches Verfahren von 5 bis 10 Minuten (Bowie & Harvey, 2006). Die reine Zahlenversion verlangte in einer Studie mit gesunden Älteren vor allem Wahrnehmen und Finden, die Wechselversion vor allem Arbeitsgedächtnis (Sánchez-Cubillo et al., 2009); eine verwandte Variante spiegelte bei über 3.600 Erwachsenen vor allem Tempo und flüssiges Denken (Salthouse, 2011).
- **Neu: Bewegung:** Die Ziele bewegen sich, deshalb müssen mehrere bewegte Objekte im Blick bleiben. Mehrere Punkte zu verfolgen gelingt bei langsamem Tempo mit bis zu 8, bei sehr schnellem nur mit einem (Alvarez & Franconeri, 2007). Hier muss man die Ziele nicht im Gedächtnis verfolgen, sondern nur das nächste finden; ob Anzahl und Tempo ebenso wirken, ist nicht untersucht.
- **Folgerung:** Die Übung ist **kein** solches Verfahren und hat keine Normwerte; Wörter und Rechnungen machen das Finden schwerer, weil erst gelesen oder gerechnet werden muss.
- **Was nicht belegt ist:** Wirkungen auf Aufmerksamkeit im Alltag, Lesen, Verkehr oder Sport.

## 4. Optische und okulomotorische Grundlagen

- **Reizgröße:** Bei 50 cm Abstand entspricht 1 cm etwa 1,15°; Zeichen mit 3 cm Höhe (Standard) sind etwa 3,4° hoch, mit 1,5 cm etwa 1,7° (eigene Rechnung). Zahlen sind damit auch bei leicht unscharfem Bild lesbar; Wörter und Rechnungen bestehen aus mehreren Zeichen und brauchen mehr Schärfe, besonders in Bewegung.
- **Tempo als Winkelgeschwindigkeit:** 6 cm/s entsprechen bei 50 cm etwa 7°/s, die Höchsteinstellung 30 cm/s etwa 34°/s (eigene Rechnung). Langsame Ziele kann das Auge glatt verfolgen; bei schnellen und abprallenden Zielen wird das Erkennen schwerer, weil Zeichen auf bewegten Zielen schlechter erkannt werden als auf ruhenden (dynamisches Sehen).
- **Suchen und Blicksprünge:** Das nächste Ziel wird mit Blicksprüngen zwischen den Kästchen gesucht; ist es gefunden, folgt das Auge ihm kurz, bis der Finger trifft. Kreis- und Ellipsenbahnen sind vorhersehbar, geradlinige Bahnen mit Abprall weniger.
- **Nutzbares Sehfeld:** Wer mehrere Ziele zugleich im Blick hat, findet das nächste schneller. Das Verfolgen mehrerer bewegter Objekte hat bei hohem Tempo enge Grenzen (Alvarez & Franconeri, 2007).
- **Brillenträger:** Ziele wandern über die ganze Fläche, auch in den oberen Bildschirmteil; bei Gleitsicht wechselt der scharfe Bereich mit der Blickhöhe. Größere Zeichen und langsameres Tempo helfen.
- **Bildschirmarbeit:** Bewegte Schrift kann bei längerem Betrachten anstrengen; am Bildschirm sinkt die Lidschlagrate (Portello et al., 2013). Pausen alle 5 bis 10 Minuten.

## 5. Neurowissenschaftliche Grundlagen

- **Suchen und Ordnen:** Bei Verbindungsaufgaben tragen Wahrnehmen und Finden sowie – bei Wechseln oder schwierigeren Inhalten – das Arbeitsgedächtnis zur Leistung bei (Sánchez-Cubillo et al., 2009); insgesamt spiegeln die Zeiten vor allem Tempo und flüssiges Denken (Salthouse, 2011). Man muss sich merken, welches Ziel als nächstes dran ist, und bei Rechnungen das Ergebnis im Kopf vergleichen.
- **Mehrere bewegte Objekte:** Das aufmerksame Verfolgen mehrerer bewegter Objekte ist begrenzt und hängt vom Tempo ab (Alvarez & Franconeri, 2007). Bei vielen schnellen Zielen ist es schwerer, das bereits gefundene nächste Ziel bis zur Berührung nicht zu verlieren.
- **Hemmung:** Ein auffälliges, aber falsches Ziel (z. B. das übernächste) darf nicht berührt werden; falsche Berührungen werden gezählt.
- Eine Aussage „diese Übung trainiert Region X“ lässt sich daraus nicht ableiten und wird nicht gemacht.

## 6. Motorische Grundlagen

- **Bewegte Ziele treffen:** Der Finger muss dorthin, wo das Ziel bei der Berührung sein wird; bei höherem Tempo lohnt es, etwas vorauszuzielen. Die Trefferfläche reicht 0,3 cm über das Kästchen hinaus.
- **Zielbewegung:** Die Bewegungszeit hängt von Weg und Zielgröße ab (Fitts'sches Gesetz); kleine Zeichen und weite Wege verlängern die Zeit pro Ziel. Sichere Fingerziele liegen bei etwa 9 mm (Parhi et al., 2006); die Übung unterschreitet die Touch-Mindestgröße nie.
- **Tempo und Genauigkeit:** Hastiges Tippen erzeugt falsche Ziele und Fehltipps; beides kostet Zeit. Mit der Maus gilt dasselbe Prinzip, die Werte sind aber nicht mit Touch vergleichbar.

## 7. Einflussfaktoren und Messgrenzen

- **Zufall:** Startplätze und Richtungen sind zufällig; liegen die nächsten Ziele zufällig nahe beieinander, ist ein Durchlauf schneller. Bei 8 Zielen streut die Gesamtzeit deshalb merklich; aussagekräftig ist der Verlauf über mehrere Durchläufe.
- **Inhalt:** Wörter und Rechnungen hängen von Lese- und Rechenfertigkeit ab; ein schlechteres Ergebnis kann daran liegen und nicht am Suchen. Wörter sind deutsch.
- **Touch-Latenz:** Die Zeiten enthalten die Verzögerung von Bildschirm und Touch-Sensor; Touchgeräte messen Zeiten durchweg zu lang, je nach Gerät unterschiedlich (Pronk et al., 2020; Tablets nicht untersucht). Nur auf demselben Gerät vergleichen.
- **Kalibrierung und Bildschirmgröße:** Ohne Kalibrierung rechnet die App mit 38 px pro cm; auf einem Tablet mit etwa 52 px pro cm sind Zeichen und Tempo dann rund ein Viertel kleiner bzw. langsamer als eingestellt (eigene Rechnung). Auf kleinen Bildschirmen werden Zeichen verkleinert, damit alle Ziele passen (bei langen Wörtern am meisten).
- **Bildrate:** Die Bewegung richtet sich nach der Zeit, nicht nach der Bildzahl; bei 60 Hz wirkt sie etwas weniger flüssig als bei 120 Hz.
- **Übungseffekte:** Bei Verbindungsaufgaben treten bei Wiederholung Übungseffekte auf (Buck et al., 2008); ein Teil der Verbesserung ist Gewöhnung an Aufgabe und Gerät.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel (für die Aufgabenart):** Bei wiederholten Verbindungsaufgaben werden die Zeiten kürzer, auch bei Varianten und wöchentlicher Wiederholung (Buck et al., 2008). Für bewegte Ziele, Wörter oder Rechnungen als Berührungsaufgabe gibt es keine Studie.
- **Naher Transfer – schwach:** Ob ähnliche, nicht geübte Such- oder Ordnungsaufgaben profitieren, ist nicht untersucht. Bei Seh- und Reaktionsübungen fallen Verbesserungen deutlich größer aus, wenn die Prüfung der Übung ähnelt (Guo et al., 2025).
- **Alltagstransfer – fehlend:** Kein Beleg für Alltag, Beruf, Verkehr oder Sport.
- **Einordnung:** Die Übung verbindet Suchen, Ordnen und Treffen bewegter Ziele. Gesamtzeit und Fehler sind Werte für den Vergleich mit sich selbst, keine Normwerte und keine Aussage über geistige Fähigkeiten.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** geordnetes Suchen zwischen Ablenkern mit Zielen per Finger geübt werden soll; die Schwierigkeit über den Inhalt (Zahlen → Buchstaben → Wörter → Rechnungen) gesteigert werden soll; langsame, vorhersehbare Bewegung (Kreisbahn) gewünscht ist; ein Tablet mit Touch genutzt wird.
- **Weniger passend, wenn …** Aufmerksamkeit oder Denken gemessen werden sollen; starke Empfindlichkeit für bewegte Bilder besteht; Lesen oder Rechnen unsicher sind (dann nur Zahlen); reine Blickfolge oder reine Reaktion geübt werden soll.
- **Vorsicht / anpassen bei …**
  - `schwindel_vestibulaer`, `reisekrankheit`: viele bewegte Ziele; langsames Tempo (2–4 cm/s), wenige Ziele, Kreisbahn statt Abprall; bei Schwindel oder Übelkeit aufhören.
  - `kopfschmerz_asthenopie`, `presbyopie_gleitsicht`: bewegte Schrift strengt an; größere Zeichen, kurze Durchläufe, Pausen.
  - `lese_rechtschreib_schwaeche`, `kognitive_einschraenkung`: mit Zahlen und wenigen Zielen beginnen; Wörter und Rechnungen erst später; kein Zeitlimit.
  - `photosensitive_epilepsie`: keine Blitze, aber viel Bewegung; im Zweifel vorher ärztlich besprechen (Fisher et al., 2005).
- **Kombiniert gut mit …** 904 (Zahlen-Buchstaben-Wirbel, Wechsel zwischen zwei Folgen), 204 (Zahlenjagd mit ruhenden Zahlen), 708 (Zielkette mit ruhenden Zielen), 106 (mehrere Kugeln verfolgen), 909 (Wahlreaktion).
- Treten beim Üben Doppelbilder, Schwindel oder Kopfschmerz mit Sehverschlechterung auf, sollte das ärztlich abgeklärt werden, statt weiterzuüben (Muchnick, 2008, S. 6, 28).
- Keine Diagnosen, keine Heilversprechen; nicht als Aufmerksamkeits- oder Hirnleistungsprüfung darstellen.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Einstellungen statt Stufen:** keine automatische Anpassung; die Faustregel ersetzt eine Treppe nur grob.
- **Zufällige Startplätze:** Die Streuung der Gesamtzeit ist bei wenigen Zielen groß; feste Startmuster oder mehrere Runden je Durchlauf würden den Vergleich verbessern.
- **Inhalt und Sprache:** Wortliste nur deutsch; für italienischsprachige Nutzer eine eigene Liste vorsehen. Rechnungen setzen Kopfrechnen voraus – im Ergebnis kenntlich machen.
- **Bewegungsreize:** Viele schnelle, abprallende Ziele können Schwindel auslösen; ein sanfter Startwert (Kreisbahn, 3 cm/s) für Einsteiger wäre sinnvoll.
- **Keine Blickmessung:** Ob gelesen oder geraten wurde, prüft die App nicht.

## 11. Quellen

### Von der Website angegeben
(keine, eigene Übung)

### Weitere Fachliteratur
- Reitan, R. M. (1958). Validity of the Trail Making Test as an indicator of organic brain damage. *Perceptual and Motor Skills*, *8*(3), 271–276. https://doi.org/10.2466/pms.1958.8.3.271 – Herkunft der Verbindungsaufgabe (Crossref geprüft).
- Bowie, C. R., & Harvey, P. D. (2006). Administration and interpretation of the Trail Making Test. *Nature Protocols*, *1*(5), 2277–2281. https://doi.org/10.1038/nprot.2006.390 – neuropsychologisches Verfahren, 5–10 min (Crossref geprüft).
- Sánchez-Cubillo, I., Periáñez, J., Adrover-Roig, D., Rodríguez-Sánchez, J., Ríos-Lago, M., Tirapu, J., & Barceló, F. (2009). Construct validity of the Trail Making Test: Role of task-switching, working memory, inhibition/interference control, and visuomotor abilities. *Journal of the International Neuropsychological Society*, *15*(3), 438–450. https://doi.org/10.1017/S1355617709090626 – Anteile von Wahrnehmung und Arbeitsgedächtnis (Crossref geprüft).
- Salthouse, T. A. (2011). What cognitive abilities are involved in trail-making performance? *Intelligence*, *39*(4), 222–232. https://doi.org/10.1016/j.intell.2011.03.001 – Tempo und flüssiges Denken (Crossref geprüft).
- Buck, K. K., Atkinson, T. M., & Ryan, J. P. (2008). Evidence of practice effects in variants of the Trail Making Test during serial assessment. *Journal of Clinical and Experimental Neuropsychology*, *30*(3), 312–318. https://doi.org/10.1080/13803390701390483 – Übungseffekte bei Wiederholung (Crossref geprüft).
- Alvarez, G. A., & Franconeri, S. L. (2007). How many objects can you track? Evidence for a resource-limited attentive tracking mechanism. *Journal of Vision*, *7*(13), 14. https://doi.org/10.1167/7.13.14 – Verfolgen mehrerer bewegter Objekte (Crossref geprüft).
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, *52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Zeitmessung auf Touchgeräten (Crossref geprüft).
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology*, *16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Lerneffekt bei trainingsähnlicher Prüfung (Crossref geprüft).
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of the 8th Conference on Human-Computer Interaction with Mobile Devices and Services* (S. 203–210). ACM. https://doi.org/10.1145/1152215.1152260 – Größe sicherer Fingerziele (Crossref geprüft).
- Portello, J. K., Rosenfield, M., & Chu, C. A. (2013). Blink rate, incomplete blinks and computer vision syndrome. *Optometry and Vision Science*, *90*(5), 482–487. https://doi.org/10.1097/OPX.0b013e31828f09a7 – Lidschlag bei Bildschirmarbeit (Crossref geprüft).
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, *46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Photosensitivität (Crossref geprüft).
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28).
