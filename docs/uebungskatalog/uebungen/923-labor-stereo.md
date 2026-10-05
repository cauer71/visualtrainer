---
# ===== Kennung =====
nr: 923
kennung: labor-stereo
name: "Tiefe sehen – Zufallspunkte (schwebendes Quadrat mit Rot-Grün-Brille finden)"
name_original: "– (eigene Blickfit-Labor-Übung, kein Vorbild)"
kapitel: "Labor"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "labor-stereo", name: "Tiefe sehen – Zufallspunkte", unterschiede: "eigene Labor-Übung mit Einstellungen"}
stand: 2026-10-05

# ===== Überblick =====
kurzbeschreibung: "In einem Feld aus Zufallspunkten schwebt ein Quadrat vor oder hinter der Fläche; mit einer Rot-Grün-Brille sieht jedes Auge sein eigenes Punktbild, und nur der kleine Unterschied zwischen beiden (Disparität) lässt das Quadrat räumlich erscheinen. Man tippt, wo es liegt: oben, unten, links oder rechts. Die Disparität in Winkelsekunden wird automatisch angepasst, bleibt fest oder wird von der Trainerin oder dem Trainer geführt; Feld, Quadrat, Punkte, Rauschen und Farben sind einstellbar. Übungswerte, keine Messung einer Stereoschwelle."
ziel_funktionen: [stereosehen, fixation, entscheidung_wahlreaktion]
eingabe: [touch, maus, tastatur]
tablet_geeignet: ja
dauer_sekunden: 120
schwierigkeit_anpassung: "Einstellungen (maßgeblich ist PARAMS in src/exercises/labor-stereo/logic.ts): Anzahl der Durchgänge (8–80, Standard 24), Start-Disparität (20–3600″, Standard 600″), Disparitätssteuerung (automatisch: nach zwei richtigen Antworten in Folge × 0,8, nach jedem Fehler × 1,25, Grenzen 20–3600″; fest; oder nur Trainer-Regler), Kantenlänge des Punktfelds (8–26 cm, Standard 14), des Quadrats (2–10 cm, Standard 5, höchstens 60 % des Felds), Punktzahl (150–1500, Standard 600), Punktdurchmesser (0,1–0,6 cm, Standard 0,25), Rauschen im Hintergrund (an/aus), Farbpaar und Helligkeit je Farbe. Trainer-Regler: Schritt 100″, höchstens 400″ je Tastendruck; bei „automatisch“ und „fest“ als Zusatz. Leichter laut Texten: 1000–2000″, großes Quadrat, mehr Punkte, kein Rauschen; schwerer: kleinere Disparität, Quadrat 3 cm, Rauschen an. Die feinste mögliche Stufe ist ein Pixel (am Tablet in 40 cm etwa 100″)."
messgroessen: ["Richtige Antworten (Anzahl und Anteil; Raten ergibt etwa 25 %)", "Letzte Disparität in Winkelsekunden und Bereich der gezeigten Disparitäten", "Antwortzeit (Mittel; enthält die Touch-Verzögerung)", "Richtige Antworten getrennt für Quadrat vor und hinter der Fläche", "Disparität eines Pixels als feinste Stufe des Bildschirms", "Änderungen am Trainer-Regler mit Zeitpunkt", "Übungswerte: keine Stereoschwelle, keine Aussage über Stereosehen oder Sehschärfe, keine Normwerte"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 2
    kontrast: 1
    farbunterscheidung: 2
    stereosehen: 3
    peripheres_sehen: 0
    nutzbares_sehfeld: 1
    blickfolge: 0
    sakkaden: 0
    fixation: 2
    bewegungswahrnehmung: 0
    visuelle_suche: 1
    visuelle_verarbeitungsgeschwindigkeit: 0
    zeitliche_aufloesung: 0
    naharbeit_dauer: 2
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 0
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 1
    verarbeitungsgeschwindigkeit: 0
    antizipation: 0
    entscheidung_wahlreaktion: 2
    lesen_sprache: 0
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
  zeitdruck: 0
  flimmern_lichtreize: 0
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Rot-Grün-Brille (oder Rot-Cyan-Brille mit dem Farbpaar Rot–Blau), bei Korrekturbrille als Überbrille", "Keine Rot-Grün-Farbsehschwäche; Prüfbild im Intro ohne Geisterbild", "Bildschirm kalibriert und echte Sehentfernung eingetragen; daraus werden Winkelsekunden berechnet", "Gedämpftes Raumlicht, Nachtmodus und Farbfilter aus, Abstand etwa 40 cm, Kopf ruhig", "Mit dem Finger eine von vier beschrifteten Tasten wählen können"]
vorsicht_bei: [farbsehschwaeche, schielen_binokular, amblyopie, kopfschmerz_asthenopie, schwindel_vestibulaer, presbyopie_gleitsicht, sehbehinderung_niedriger_visus, kinder_unter_6]
geeignet_fuer: ["Räumliches Sehen mit Zufallspunktbildern als Aufgabe am Tablet: nur wer die beiden Augenbilder zusammen nutzt, findet das Quadrat", "Einstellbare Aufgabe für Trainerin oder Trainer, mit automatischer Anpassung, festem Wert oder eigener Führung der Disparität", "Vergleich mit sich selbst bei gleichen Einstellungen, gleicher Brille, gleichem Gerät und Abstand", "Vorführung des Prinzips der Zufallspunktbilder – ohne Wirkanspruch und ohne Befund"]
weniger_geeignet_fuer: ["Messung einer Stereoschwelle oder Ersatz einer klinischen Untersuchung des Stereosehens", "Klärung, ob räumliches Sehen fehlt (zum Beispiel nach Schielen): abklären lassen statt üben", "Menschen mit Rot-Grün-Farbsehschwäche", "Sehr feine Disparitäten: der Bildschirm verschiebt nur in ganzen Pixeln", "Diagnose, Therapie oder Normvergleich"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: unklar
  alltag_transfer: fehlend
  kommentar: "Für genau diese Aufgabe gibt es keine Studie. Zufallspunktbilder sind seit Julesz (1960) ein Mittel der Tiefensehforschung. In einer kleinen Studie mit fünf Erwachsenen mit gestörtem Binokularsehen erholte sich das Stereosehen nach Tausenden Durchgängen Wahrnehmungslernen deutlich, aber mit geringerer Auflösung und Genauigkeit (Ding & Levi 2011). Für Menschen ohne Befund ist kein Nutzen belegt, für den Alltag gibt es keinen Beleg."
aehnliche_uebungen: [922, 921]
stichworte: ["Stereosehen", "Zufallspunktbild", "Random-Dot-Stereogramm", "Disparität", "Winkelsekunden", "Rot-Grün-Brille", "Anaglyphe", "Stufenverfahren", "Pixelgrenze", "keine Stereoschwelle"]
---

# 923 · Tiefe sehen – Zufallspunkte (schwebendes Quadrat mit Rot-Grün-Brille finden)

> Original: – (eigene Blickfit-Labor-Übung, kein Vorbild) · Blickfit: „Tiefe sehen – Zufallspunkte“ (`src/exercises/labor-stereo/`, Kategorie Wahrnehmung, Labor)

## 1. Kurzbeschreibung

Auf schwarzem Grund liegt ein quadratisches Feld aus Zufallspunkten, rot für das eine und grün (wahlweise cyan oder blau) für das andere Auge. In einem kleineren Quadrat sind die Punkte für beide Augen seitlich gegeneinander verschoben. Mit einer Rot-Grün-Brille sieht jedes Auge nur sein Punktbild; aus dem Unterschied (Disparität) entsteht der Eindruck, dass das Quadrat vor oder hinter der Fläche schwebt. Ohne beide Augen ist es im Punktfeld nicht zu erkennen. Man tippt, wo das Quadrat liegt: oben, unten, links oder rechts; danach zeigt die Übung kurz, wo es lag. Die Disparität steht in Winkelsekunden (″; 3600″ = 1°) und wird mit der Sehentfernung aus der Kalibrierung berechnet. Sie wird automatisch angepasst (nach zwei richtigen Antworten kleiner, nach jedem Fehler größer), bleibt fest oder wird von der Trainerin oder dem Trainer mit einem Regler geführt. Einstellbar sind außerdem Feld- und Quadratgröße, Punktzahl und -größe, Rauschen im Hintergrund und die Farben. Alle Werte sind Übungswerte zum Vergleich mit sich selbst – keine Messung einer Stereoschwelle.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `index.ts`, `logic.ts`, `layout.ts`, `texts.ts` und `science.ts` in `src/exercises/labor-stereo/` sowie `_shared/anaglyph.ts` und `_shared/labor-adaptive.ts` (Stand 05.10.2026).

- **Durchgang:** neues Zufallspunktfeld (Punkte gleichmäßig verteilt), Quadrat zufällig oben, unten, links oder rechts, zufällig gekreuzt (vor der Fläche) oder ungekreuzt (dahinter). Punkte im Quadrat werden zwischen beiden Augenbildern um die Disparität verschoben; mit Rauschen erhalten die übrigen Punkte zufällige Verschiebungen zwischen −2- und +2-facher Disparität, ohne Rauschen keine. Ein schmaler neutraler Rahmen um das Feld ist für beide Augen gleich.
- **Antwort:** vier beschriftete Tasten mit Pfeil (oben, unten, links, rechts), Tastatur Pfeiltasten. Danach 700 ms ruhige Rückmeldung (✓/✗, „Es lag: …“). Standard 24 Durchgänge; Schnellmodus 4.
- **Steuerung:** „automatisch“ = Stufenverfahren 2 richtig in Folge → Disparität × 0,8, ein Fehler → × 1,25 (Grenzen 20–3600″); „fest“ = Startwert; „Trainer“ = nur Regler (Schritt 100″, grob 400″, höchstens 400″ je Tastendruck). Bei „automatisch“ und „fest“ legt der Regler einen Zusatz auf; jede Änderung wird mit Zeitpunkt protokolliert.
- **Pixelgrenze:** Die Verschiebung wird in cm und px umgerechnet; die Disparität eines Pixels wird berechnet und im Ergebnis ausgewiesen. Feinere Werte entstehen höchstens durch Kantenglättung und sind nicht verlässlich.
- **Ergebnis:** richtige Antworten (Zufall 25 %), letzte Disparität, Bereich, Antwortzeit, Trefferzahl für „vor“ und „hinter“ der Fläche, Pixelwert, Einstellungen. Verlauf nur bei gleichen Einstellungen.

## 3. Herleitung aus der Forschung (keine Beschreibung eines Programms)

- **Zufallspunktbilder:** Sie wurden 1960 für die Untersuchung des Tiefensehens beschrieben (Julesz 1960). Weil das Quadrat in jedem Einzelbild unsichtbar ist, verlangt die Aufgabe das Zusammenführen beider Augenbilder.
- **Vier Lagen statt zwei:** Bei vier Möglichkeiten liegt die Ratewahrscheinlichkeit bei 25 %; das macht zufällige Treffer seltener als bei zwei Möglichkeiten.
- **Stufenverfahren:** „2 richtig → schwerer, 1 Fehler → leichter“ hält die Aufgabe ungefähr an der eigenen Grenze; als Übungsführung gedacht, nicht als Messverfahren.
- **Weich schauen:** Auf das ganze Feld statt auf einzelne Punkte schauen, bei Unsicherheit raten statt starren, Pausen – Erfahrungswissen der funktionellen Optometrie, nicht durch Studien belegt.
- **Was nicht belegt ist:** ein Nutzen für Menschen ohne Befund, eine Verbesserung des räumlichen Sehens im Alltag, eine Messung der Stereoschärfe.

## 4. Optische und okulomotorische Grundlagen

- **Disparität und Pixel:** Am Tablet (etwa 52 px/cm) entspricht 1 Pixel in 40 cm etwa 100″, bei der Schätzung ohne Kalibrierung (38 px/cm) etwa 136″; bei größerem Abstand werden die Stufen feiner. Die Start-Disparität 600″ entspricht in 40 cm etwa 0,12 cm Verschiebung. Werte unter einem Pixel kann der Bildschirm nicht sauber darstellen.
- **Größen:** Das Feld (14 cm) umfasst in 40 cm etwa 20°, das Quadrat (5 cm) etwa 7°, ein Punkt (0,25 cm) etwa 0,36°.
- **Kein natürliches Tiefenbild:** Die Schärfe bleibt am Bildschirm, während die Disparität eine andere Tiefe anzeigt. Diese Entkopplung von Vergenz und Akkommodation verlängert an Bildschirmen die Zeit, bis ein Stereobild erkannt wird, verringert die Stereoschärfe unter Zeitdruck und führt zu Ermüdung und Beschwerden (Hoffman et al. 2008).
- **Farbfilter:** Anaglyphen trennen nie vollständig; Farbsäume und Geisterbilder bleiben sichtbar und können Hinweise auf das Quadrat geben, die nichts mit Tiefensehen zu tun haben. Rot und Grün erscheinen durch die Filter verschieden hell.
- **Fixation und Vergenz:** Die Augen müssen auf die Fläche ausgerichtet bleiben; die Disparität des Quadrats ist klein gegenüber dem Bereich, in dem beide Bilder noch verschmolzen werden. Bei groben Strukturen ist dieser Bereich größer als bei feinen (Schor et al. 1984).
- **Brillenträger und Alter:** Überbrille nötig; ab etwa Mitte 40 lässt die Akkommodation nach (Charman 2008). Am Bildschirm sinkt die Lidschlagrate (Portello et al. 2013).
- **Farbsehen:** Rot-Grün-Farbsehschwäche bei etwa 8 % der Männer und 0,4 % der Frauen europäischer Herkunft (Birch 2012).

## 5. Neurowissenschaftliche Grundlagen

- **Disparität in der Sehrinde:** Einzelne Nervenzellen der primären Sehrinde signalisieren Disparität; für die Tiefenwahrnehmung ist weitere Verarbeitung nötig (z. B. das richtige Zuordnen von Merkmalen beider Bilder und relative Disparität), die in Arealen außerhalb der primären Sehrinde, besonders MT, enger mit der Wahrnehmung verknüpft ist (Cumming & DeAngelis 2001).
- **Binokulare Neurone:** Binokulare Nervenzellen der Sehrinde verbinden die Signale beider Augen; verschiedene Stufen der Sehrinde tragen zur Tiefenwahrnehmung bei (Parker 2007).
- **Schielen und Stereosehen:** Stereosehen kann bei Schielen gestört sein; es gibt mehrere klinische Messverfahren mit Vor- und Nachteilen (Read 2015). Diese Übung gehört nicht dazu.
- Eine Aussage „diese Übung trainiert Region X“ lässt sich daraus nicht ableiten und wird nicht gemacht.

## 6. Motorische Grundlagen

Motorisch anspruchslos: ein Tipp auf eine von vier großen, beschrifteten Tasten mit Pfeil, ohne Antwortfrist. Die Antwortzeit enthält die Zeit zum Erkennen und die Touch-Verzögerung. Tastatur (Pfeiltasten) als Alternative.

## 7. Einflussfaktoren und Messgrenzen

- **Pixelgrenze und Kalibrierung:** Winkelsekunden sind aus Pixelgröße und Abstand berechnet und nur so genau wie diese Eingaben; die feinste Stufe ist ein Pixel. Ein anderer Abstand ergibt bei gleicher Pixelverschiebung eine andere Disparität.
- **Monokulare Hinweise:** Farbsäume, Geisterbilder oder kleine Dichteunterschiede an den Rändern des verschobenen Quadrats können ohne Tiefeneindruck richtige Antworten ermöglichen; ein richtiges Ergebnis heißt nicht sicher, dass Tiefe gesehen wurde.
- **Raten:** Bei vier Möglichkeiten trifft Raten in etwa 25 %; bei wenigen Durchgängen schwanken die Anteile stark.
- **Stufenverfahren:** Die „letzte Disparität“ hängt von den letzten Antworten ab und ist kein Schwellenwert.
- **Keine Kontrolle von Brille und Blick:** Die App sieht nicht, ob die Brille getragen wird oder wohin man schaut.
- **Antwortzeit:** Touchscreens messen Zeiten je nach Gerät zu lang (Pronk et al. 2020); nur mit sich selbst auf demselben Gerät vergleichen.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach:** Für genau diese Aufgabe gibt es keine Studie; Gewöhnung an Brille, Gerät und Aufgabe verbessert die Werte meist.
- **Naher Transfer – unklar:** Fünf Erwachsene, die zuvor stereoblind oder stereoanomal waren, übten Tausende Durchgänge mit stereoskopischen Gittern; danach erholte sich das Stereosehen deutlich, auch in Prüfungen ohne Hinweise für ein Auge und in klinischen Messungen, aber mit geringerer Auflösung und Genauigkeit (Ding & Levi 2011). Das war eine kleine Studie mit einem anderen Aufbau, kein Bildschirmspiel mit Filterbrille.
- **Alltagstransfer – fehlend:** Für Menschen ohne Befund ist kein Nutzen belegt; für Greifen, Sport oder Verkehr gibt es keinen Beleg.
- **Einordnung:** Übungsaufgabe mit Zufallspunkten; Trefferanteil und letzte Disparität dienen dem Vergleich mit sich selbst, keine Normwerte.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** eine ruhige Aufgabe zum räumlichen Sehen mit Filterbrille gesucht wird; kein Zeitdruck gewünscht ist; eine Fachperson die Disparität selbst führen oder automatisch anpassen lassen möchte; gleiche Geräte und Abstände für den Vergleich verfügbar sind.
- **Weniger passend, wenn …** gemessen werden soll, ob und wie fein räumliches Sehen vorhanden ist; eine Rot-Grün-Farbsehschwäche besteht; sehr feine Disparitäten geübt werden sollen (Pixelgrenze).
- **Vorsicht / anpassen bei …**
  - `schielen_binokular`, `amblyopie`: nur nach Absprache mit der behandelnden Fachperson; bei Verdacht auf fehlendes räumliches Sehen abklären lassen statt üben.
  - `kopfschmerz_asthenopie`, `schwindel_vestibulaer`: kurze Durchläufe, Pausen etwa alle 5 Minuten; bei Schwindel, Kopf- oder Augenschmerz oder Doppelbildern aufhören und abklären lassen (Muchnick 2008, S. 6, 28).
  - `farbsehschwaeche`: Farbtrennung nicht verlässlich; nicht verwenden.
  - `presbyopie_gleitsicht`, `sehbehinderung_niedriger_visus`: Überbrille, größere Punkte und Quadrat, kein Rauschen.
  - `kinder_unter_6`: nicht untersucht; Brille und Aufgabe müssen verstanden werden.
- **Kombiniert gut mit …** 922 (Fusion mit wachsendem Versatz), 921 (Lesen mit getrennten Bildern).
- Keine Diagnosen, keine Heilversprechen; keine Stereoschwelle, kein Ersatz für eine Untersuchung.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Monokulare Hinweise:** An den Rändern des verschobenen Quadrats können Dichteunterschiede entstehen; neu gezogene Punkte an den freigewordenen Rändern (wie im klassischen Zufallspunktbild) würden das verringern.
- **Pixelgrenze:** Unter etwa 100″ (Tablet, 40 cm) sind Werte nicht verlässlich; größere Abstände verfeinern die Stufen, verkleinern aber das Feld im Sehwinkel.
- **Stufenverfahren ohne Schwelle:** gewollt, weil keine Messung beansprucht wird; im Ergebnis so benannt.
- **Grenzen nur gerechnet:** Start-Disparität, Faktoren und Feldgrößen sind nicht an Menschen geprüft.

## 11. Quellen

### Von der Website angegeben
keine (eigene Übung)

### Weitere Fachliteratur
- Julesz, B. (1960). Binocular depth perception of computer-generated patterns. *Bell System Technical Journal, 39*(5), 1125–1162. https://doi.org/10.1002/j.1538-7305.1960.tb03954.x – Zufallspunktbilder für das Tiefensehen (Crossref geprüft: Titel, Zeitschrift, Band, Seiten)
- Ding, J., & Levi, D. M. (2011). Recovery of stereopsis through perceptual learning in human adults with abnormal binocular vision. *Proceedings of the National Academy of Sciences, 108*(37), E733–E741. https://doi.org/10.1073/pnas.1105183108 – Wahrnehmungslernen bei gestörtem Binokularsehen (Crossref geprüft)
- Read, J. C. A. (2015). Stereo vision and strabismus. *Eye, 29*(2), 214–224. https://doi.org/10.1038/eye.2014.279 – Stereosehen bei Schielen, Messverfahren (Crossref geprüft)
- Cumming, B. G., & DeAngelis, G. C. (2001). The physiology of stereopsis. *Annual Review of Neuroscience, 24*, 203–238. https://doi.org/10.1146/annurev.neuro.24.1.203 – Disparitätsverarbeitung in der Sehrinde (Crossref geprüft)
- Parker, A. J. (2007). Binocular depth perception and the cerebral cortex. *Nature Reviews Neuroscience, 8*(5), 379–391. https://doi.org/10.1038/nrn2131 – binokulare Neurone und Tiefenwahrnehmung (Crossref geprüft)
- Hoffman, D. M., Girshick, A. R., Akeley, K., & Banks, M. S. (2008). Vergence–accommodation conflicts hinder visual performance and cause visual fatigue. *Journal of Vision, 8*(3), 33. https://doi.org/10.1167/8.3.33 – Konflikt zwischen Vergenz und Scharfstellung am Bildschirm (Crossref geprüft)
- Schor, C., Wood, I., & Ogawa, J. (1984). Binocular sensory fusion is limited by spatial resolution. *Vision Research, 24*(7), 661–665. https://doi.org/10.1016/0042-6989(84)90207-4 – Verschmelzungsbereich hängt von der Feinheit der Struktur ab (Crossref geprüft)
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Rot-Grün-Farbsehschwäche (Crossref geprüft)
- Charman, W. N. (2008). The eye in focus: Accommodation and presbyopia. *Clinical and Experimental Optometry, 91*(3), 207–225. https://doi.org/10.1111/j.1444-0938.2008.00256.x – Akkommodation und Presbyopie (Crossref geprüft)
- Portello, J. K., Rosenfield, M., & Chu, C. A. (2013). Blink rate, incomplete blinks and computer vision syndrome. *Optometry and Vision Science, 90*(5), 482–487. https://doi.org/10.1097/OPX.0b013e31828f09a7 – Lidschlag am Bildschirm (Crossref geprüft)
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touchscreens messen Zeiten zu lang (Crossref geprüft)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28)
