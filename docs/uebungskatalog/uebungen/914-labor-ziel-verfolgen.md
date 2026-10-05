---
# ===== Kennung =====
nr: 914
kennung: labor-ziel-verfolgen
name: "Ziel verfolgen (Finger auf einem gleichmäßig wandernden Ziel halten)"
name_original: "– (eigene Blickfit-Übung, Labor, kein Vorbild)"
kapitel: "Labor"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "labor-ziel-verfolgen", name: "Ziel verfolgen", unterschiede: "eigene Labor-Übung mit Einstellungen"}
stand: 2026-10-05

# ===== Überblick =====
kurzbeschreibung: "Ein Ziel wandert mit gleichmäßigem Tempo auf einer geschlossenen Bahn (Ellipse, liegende Acht oder verschlungene Kurve). Man legt den Finger darauf und gleitet mit, ohne abzusetzen; gezählt wird die Zeit, in der der Finger auf dem Ziel liegt. Bahn, Tempo, Zielgröße, Spielraum und Dauer stellt man selbst ein. Der Blick wird nicht gemessen."
ziel_funktionen: [kontinuierliche_steuerung, auge_hand_koordination, blickfolge]
eingabe: [touch, maus]
tablet_geeignet: ja
dauer_sekunden: 30
schwierigkeit_anpassung: "Keine Stufen, keine automatische Anpassung: Die Schwierigkeit ergibt sich aus den Einstellungen. Dauer 10–180 s (Standard 30 s); Bahn Ellipse (Standard, gut vorhersehbar), liegende Acht oder verschlungene Kurve (Lissajous 3:2, wechselnde Krümmung); Tempo 2–40 cm/s (Standard 8 cm/s, entlang der Bahn gleichmäßig); Zieldurchmesser 1–10 cm (Standard 3 cm); Spielraum um das Ziel 0–3 cm (Standard 0,5 cm); Bahn anzeigen ja/nein (ohne Bahn muss man vorhersehen). Trefferradius mindestens 24 px. Nach dem Lauf schlägt ein Tipp vor, genau eine Einstellung leichter oder schwerer zu machen (eigene Faustregel: ≥ 90 % auf dem Ziel und höchstens 2 Verluste → schwerer, < 50 % → leichter)."
messgroessen: ["Hauptwert: Zeit auf dem Ziel in Prozent der ganzen Laufzeit (auch der Zeit ohne Finger)", "Zeit auf dem Ziel in Sekunden", "längste Verfolgung am Stück", "verlorene Verbindungen (nach erstem Erreichen)", "Zeit mit Fingerkontakt in Prozent", "mittlere Abweichung Finger–Zielmitte in cm (nur bei Fingerkontakt)", "kein Blickmaß, keine Normwerte; Vergleich nur bei gleichen Einstellungen"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
# Profil für die Standard-Einstellungen; höhere Tempi, kleinere Ziele und „Bahn ausblenden“ erhöhen vor allem
# kontinuierliche_steuerung, zielbewegung_praezision und antizipation. blickfolge = 3 bezeichnet die Anforderung, nicht die Messung.
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 0
    blickfolge: 3
    sakkaden: 1
    fixation: 0
    bewegungswahrnehmung: 2
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 0
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 0
    inhibition: 0
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 0
    antizipation: 2
    entscheidung_wahlreaktion: 0
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 3
    zielbewegung_tempo: 0
    zielbewegung_praezision: 1
    kontinuierliche_steuerung: 3
    ruhige_hand: 2
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 1
belastung:
  zeitdruck: 1
  flimmern_lichtreize: 0
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 1
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Bildschirm einmal kalibrieren, damit Zielgröße und Tempo in Zentimetern stimmen", "die ganze Bahn bequem mit dem Finger erreichen (etwa 50–60 cm Abstand, Hand nicht auf dem Rahmen abstützen)", "sauberer Bildschirm, damit der Finger gleitet", "mit der Maus: Taste gedrückt halten und mitführen"]
vorsicht_bei: [tremor_parkinson, hand_arm_beschwerden, nystagmus, schwindel_vestibulaer, presbyopie_gleitsicht, trockenes_auge_bildschirm, kopfschmerz_asthenopie]
geeignet_fuer: ["Auge und Hand gemeinsam einem gleichmäßig bewegten Ziel nachführen", "ruhiges, fortlaufendes Führen mit dem Finger ohne Absetzen üben", "Schwierigkeit selbst fein einstellen (Bahn, Tempo, Größe, Spielraum) und jeweils nur eine Einstellung ändern", "Vergleich mit sich selbst bei gleichen Einstellungen, auf demselben Gerät und mit derselben Hand"]
weniger_geeignet_fuer: ["Messung oder Beurteilung der Augenfolgebewegung: gemessen wird nur der Finger", "Ersatz für die klinische Prüfung der Augenbewegungen", "schnelle Zielsprünge, Reaktion oder Entscheidungen üben", "Menschen, die den Arm nicht längere Zeit anheben können"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: unklar
  alltag_transfer: fehlend
  kommentar: "Für das Führen mit dem Finger auf einem bewegten Ziel am Bildschirm gibt es keine Studie. Augen- und Handführung reagieren ähnlich auf Richtungswechsel (Engel et al. 2000), beim Mitführen mit der Hand folgen die Augen genauer (Danion & Flanagan 2018); kurzes Üben des Augenfolgens verbesserte in einer kleinen Studie die anschließende Folge (Eibenberger et al. 2012). Gewöhnung an Aufgabe und Gerät überschätzt Effekte (Guo et al. 2025); ein Alltagsnutzen ist nicht belegt."
aehnliche_uebungen: [514, 507, 505, 707, 402, 404]
stichworte: ["Ziel verfolgen", "Augen-Hand-Verfolgung", "manuelles Tracking", "glatte Folgebewegung", "Finger mitführen", "Ellipse", "liegende Acht", "Lissajous", "Spielraum", "Zeit auf dem Ziel", "Labor", "Einstellungen"]
---

# 914 · Ziel verfolgen (Finger auf einem gleichmäßig wandernden Ziel halten)

> Original: – (eigene Labor-Übung ohne Vorbild) · Blickfit: „Ziel verfolgen“ (`src/exercises/labor-ziel-verfolgen/`, Kategorie Bewegung, Labor)

## 1. Kurzbeschreibung

Ein rundes, gelbes Ziel steht zuerst still; sobald man den Finger darauflegt, beginnt es zu wandern – mit gleichmäßigem Tempo auf einer geschlossenen Bahn. Man gleitet mit dem Finger mit, ohne abzusetzen, und folgt dem Ziel mit den Augen. Verliert man es, setzt man einfach wieder an. Gezählt wird die Zeit, in der der Finger auf dem Ziel liegt; ein Ring um das Ziel zeigt den Spielraum (gestrichelt, „auf dem Ziel“ durchgezogen mit ✓), und eine gestrichelte Linie führt zum Ziel, wenn der Finger daneben liegt. Die Blickfit-Übung hat keine Stufen, sondern **Einstellungen**: Dauer (10–180 s, Standard 30 s), Bahn (Ellipse, liegende Acht, verschlungene Kurve), Tempo (2–40 cm/s, Standard 8 cm/s), Zielgröße (1–10 cm, Standard 3 cm), Spielraum (0–3 cm, Standard 0,5 cm) und ob die Bahn als dünne Linie zu sehen ist. Größen und Tempo gelten in Zentimetern nach der Kalibrierung des Bildschirms. Ergebnisse werden nur mit Läufen gleicher Einstellungen verglichen. Wohin man schaut, wird nicht gemessen.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `logic.ts`, `index.ts`, `texts.ts` (Stand 05.10.2026).

- **Bahn:** drei geschlossene Bahnen im Spielfeld (Rand = Zielradius + 1 cm): Ellipse (cos t, sin t), liegende Acht (sin t, sin 2t), verschlungene Kurve (sin(3t + π/2), sin 2t). Die Bahn wird nach Bogenlänge abgetastet (1.440 Stützpunkte), sodass das Ziel überall **gleich schnell** läuft (cm/s entlang der Bahn, nicht pro Bild); ein einzelner Zeitsprung zählt höchstens 0,1 s.
- **„Auf dem Ziel“:** Finger liegt auf UND Abstand zur Zielmitte ≤ Zielradius + Spielraum; der Trefferradius ist mindestens 24 px (Touch-Ziel). Es zählt nur ein Finger; mit der Maus zählt gedrückte Taste.
- **Messgrößen:** Anteil auf dem Ziel bezogen auf die ganze Zeit (auch ohne Finger), Sekunden auf dem Ziel, längste ununterbrochene Verfolgung, verlorene Verbindungen (Wechsel von „auf“ zu „nicht auf“), Anteil Fingerkontakt, mittlere Abweichung (zeitgewichtet, nur bei Fingerkontakt).
- **Bühne:** Beim Drehen des Tablets wird die Bahn neu aufgebaut, das Ziel bleibt an derselben Stelle der Runde; das Ziel wird nie größer als die Bühne. Auf kleinen Bildschirmen wird die Bahn kleiner, das Tempo bleibt gleich.
- **Tipp nach dem Lauf (eigene Faustregeln):** Fingerkontakt < 30 % → „dranbleiben“; ≥ 90 % auf dem Ziel und ≤ 2 Verluste → eine Einstellung schwerer; < 50 % → leichter; ≥ 6 Verluste → ruhig wieder einfangen; sonst Vergleichshinweis.
- **Punkte:** 10 je Sekunde auf dem Ziel (nur Motivation). Keine Levelanzeige (`showsLevel: false`); `usesCalibration: true`.

## 3. Herleitung aus der Forschung (keine Beschreibung eines Vorbilds)

Die Übung ist eine eigene Labor-Übung. Aussagen und Quellen stammen aus `science.ts` (dort einzeln per Crossref und Abstract geprüft, 02.10.2026); ergänzt wurden nur per Crossref geprüfte Grundlagen (Krauzlis 2004, Lisberger 2010, Collewijn & Tamminga 1984, Moschner & Baloh 1994, Parhi et al. 2006, Hutchings et al. 2007, Muchnick 2008 nur für H-Muster und Warnzeichen). Nicht übernommen: „trainiert das gleitende Verfolgen“ (Wirkversprechen) und „bei hohem Tempo schalten die Augen auf Aufholsprünge um“ (im Abstract nicht bestätigt). Das Verfolgen einer kreisenden Marke mit Zeigen ist als Praxisangabe der klassischen Sehtherapie beschrieben, nicht belegt.

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Bei etwa 50 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,15°. Das Standardziel (3 cm) erscheint damit etwa 3,4° groß, das Standardtempo (8 cm/s) entspricht etwa 9°/s; das größte einstellbare Tempo (40 cm/s) etwa 45°/s (Umrechnung, abhängig vom tatsächlichen Abstand). Sehschärfe spielt kaum eine Rolle; das Ziel ist groß und kontrastreich.
- **Glatte Folgebewegung:** Wer einem bewegten Ziel folgt, gleitet mit und macht dabei kleine Aufholsprünge; eine Folge mit Verstärkung (Gain) unter 1 und Aufholsakkaden ist normal (Collewijn & Tamminga, 1984). Wie genau die Augen einer Ellipse folgen, hängt von Tempo und Krümmung ab (de’Sperati & Viviani, 1997) – die liegende Acht und die verschlungene Kurve haben stärker wechselnde Krümmung als die Ellipse. Hier läuft das Ziel mit gleichbleibendem Tempo entlang der Bahn; das ist eine eigene Festlegung der Übung.
- **Augen und Hand zusammen:** Wer mit der Hand folgt, benutzt die Augen etwas anders als beim reinen Zuschauen: weniger Aufholsprünge, genaueres Mitgleiten (Danion & Flanagan, 2018; dort mit Handgriff und Zeiger, nicht mit dem Finger auf dem Bildschirm).
- **Verdeckung:** Der Finger liegt auf dem Ziel und verdeckt es teilweise. Der Ring um das Ziel und die Linie zum Ziel sollen das ausgleichen; ob die Augen wirklich dem Ziel folgen oder dem eigenen Finger, bleibt offen.
- **Alter:** Bei älteren Menschen wird die Folgebewegung bei höherem Tempo ungenauer (Moschner & Baloh, 1994); niedrige Tempi sind deshalb ein sinnvoller Einstieg.
- **Brillenträger:** Die Bahn nutzt fast die ganze Bühne. Bei Gleitsicht wandert der Blick durch seitlich unscharfe Bereiche, und Neu-Träger zeigen sehr unterschiedliche Kopf- und Augenstrategien (Hutchings et al., 2007). Wer die Bahn am Rand nur unscharf sieht, wählt eine Arbeitsplatzbrille oder einen etwas größeren Abstand.
- **Nähe und Bildschirm:** Bei anhaltendem Blick auf den Bildschirm sinkt die Lidschlagrate, und Beschwerden der Augen sind häufig (Sheppard & Wolffsohn, 2018); Pausen und bewusstes Blinzeln helfen. Farbe spielt keine Rolle: „Auf dem Ziel“ wird auch über Form (✓, durchgezogener Ring) angezeigt.

## 5. Neurowissenschaftliche Grundlagen

- **Folgebewegung:** Bewegungssignale aus den bewegungsempfindlichen Arealen der Hirnrinde werden über frontale Augenfelder, Brückenkerne und Kleinhirn in die Folgebewegung umgesetzt; Folgebewegung und Blicksprünge sind getrennte, aber eng verknüpfte Steuerungen (Krauzlis, 2004; Lisberger, 2010).
- **Gemeinsame Mechanismen von Auge und Hand:** Bei einem abrupten Richtungswechsel des Ziels reagierten Augen und Hand in einer Laborstudie ähnlich; die Autoren schließen auf gemeinsame Mechanismen (Engel et al., 2000).
- **Vorhersage:** Die Ellipse ist gleichmäßig und gut vorhersehbar; ohne sichtbare Bahn muss man den weiteren Weg vorhersehen. Dass vorhersagbare Bewegungen leichter zu verfolgen sind, gilt für die Folgebewegung allgemein; für diese Übung ist es nicht untersucht.
- **Keine Ortsaussage:** Eine Aussage „diese Übung trainiert Region X“ lässt sich daraus nicht ableiten und wird nicht gemacht.
- **Klinischer Hintergrund:** Klinisch wird die Folgebewegung der Augen geprüft, indem die Augen einem nahen Ziel folgen, das auf einer H-förmigen Bahn geführt wird (Muchnick, 2008, S. 32–35). Diese Übung ist keine solche Prüfung.

## 6. Motorische Grundlagen

- **Manuelles Nachführen:** Die Hand führt nicht ganz gleichmäßig, sondern in kleinen Korrekturschritten; bei höherem Zieltempo wuchs in einer Studie der Abstand, bei dem eine Korrektur einsetzt (Miall et al., 1993). Gemessen werden deshalb Anteil, längste Verfolgung und Verluste statt eines einzelnen Abstands.
- **Touch-Ziel:** Der Trefferradius ist mindestens 24 px; sichere Fingerziele brauchen etwa 9 mm (Parhi et al., 2006). Kleine Ziele (1–1,5 cm) mit wenig Spielraum verlangen ruhiges, genaues Führen.
- **Haltearbeit:** Der Arm wird während des ganzen Laufs angehoben gehalten (bis 180 s); Schulter und Arm können ermüden. Die Hand soll nicht auf dem Rahmen abgestützt werden.
- **Reibung:** Ein verschmutzter Bildschirm bremst den Finger; trockene Haut kann ruckeln. Die Maus (Taste gedrückt) ist eine Alternative, ist aber nicht mit Touch vergleichbar.

## 7. Einflussfaktoren und Messgrenzen

- **Kein Blickmaß:** Gemessen wird nur der Finger. Ob die Augen glatt folgen, mit Blicksprüngen springen oder auf dem Finger ruhen, kann die Übung nicht erkennen (kein Eye-Tracking).
- **Kalibrierung:** Zielgröße, Spielraum und Tempo stimmen nur nach der Kalibrierung des Bildschirms. Der Sehwinkel hängt zusätzlich vom tatsächlichen Abstand ab.
- **Bühne und Gerät:** Auf kleinen Bildschirmen wird die Bahn kürzer und stärker gekrümmt, das Tempo bleibt gleich – derselbe Wert ist auf verschiedenen Geräten nicht vergleichbar. Touchscreens messen Zeiten durchweg etwas zu lang, je nach Gerät unterschiedlich (Pronk et al., 2020; Tablets wurden dort nicht untersucht); hier wird zwar keine Reaktionszeit gemessen, die Verzögerung des Touch-Sensors verschiebt aber die Fingerposition gegenüber dem Ziel.
- **Bezugsgröße:** Der Hauptwert bezieht sich auf die ganze Zeit, auch die ohne Finger; wer spät auflegt, verliert Anteil.
- **Gewöhnung:** Verbesserungen in der geübten Aufgabe sind zum Teil Gewöhnung an Aufgabe und Gerät; in Studien zu solchen Übungen fielen sie deutlich größer aus, wenn die Prüfung der geübten Aufgabe ähnelte (Guo et al., 2025).
- **Person:** Hand (rechts/links), Müdigkeit, Haltung, Brille und Alter beeinflussen das Ergebnis. Vergleichbar sind nur Läufe mit denselben Einstellungen, derselben Hand und demselben Gerät.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach:** In einer kleinen Studie mit zehn Personen verbesserte kurzes Üben des Augenfolgens am Bildschirm das Folgen in einer anschließenden Prüfung (Eibenberger et al., 2012). Ob das Führen mit dem Finger ähnlich profitiert, ist nicht untersucht. Für genau diese Übung gibt es keine Studie.
- **Naher Transfer – unklar:** Ob sich Verbesserungen auf andere Bahnen, Tempi oder Geräte übertragen, ist nicht untersucht; Gewöhnung an Aufgabe und Gerät überschätzt Trainingseffekte (Guo et al., 2025).
- **Alltagstransfer – fehlend:** Ein Nutzen für Alltag, Sport, Verkehr oder Lesen ist nicht belegt.
- **Praxisangabe (nicht belegt):** In der klassischen Sehtherapie wird das Verfolgen einer kreisenden Marke bei ruhigem Kopf beschrieben, mit schrittweise gesteigertem Tempo und später mit Zeigen auf die Marke. Eine Wirkung ist nicht belegt.
- **Einordnung:** Die Übung ist eine einstellbare Auge-Hand-Aufgabe. Die Werte dienen dem Vergleich mit sich selbst bei gleichen Einstellungen, nicht als Normwert oder Aussage über die Augen.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** Auge und Hand gemeinsam einem gleichmäßig bewegten Ziel folgen sollen; ruhiges, fortlaufendes Führen ohne Absetzen geübt werden soll; jemand die Schwierigkeit selbst fein einstellen möchte; ein Tablet mit Touch genutzt wird; wenig Flimmern und keine Lichtreize gewünscht sind.
- **Weniger passend, wenn …** die Augenbewegung gemessen oder beurteilt werden soll; Zielsprünge, Reaktion oder Entscheidungen im Vordergrund stehen; der Arm nicht längere Zeit angehoben werden kann; Ergebnisse verschiedener Geräte verglichen werden sollen.
- **Vorsicht / anpassen bei …**
  - `tremor_parkinson`, `hand_arm_beschwerden`: großes Ziel, viel Spielraum, langsames Tempo und kurze Dauer wählen; bei Schmerzen abbrechen.
  - `nystagmus`: Folge und Fingerführung können deutlich anders sein; Ergebnis nicht als Aussage über das Auge lesen.
  - `schwindel_vestibulaer`: bewegtes Ziel; mit Ellipse und niedrigem Tempo beginnen, bei Schwindel abbrechen.
  - `presbyopie_gleitsicht`: Bahn reicht bis zum Bühnenrand; Arbeitsplatzbrille oder größerer Abstand.
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: kurze Läufe, Pausen, bewusst blinzeln.
- **Kombiniert gut mit …** 514 (Glatt folgen), 507 (Kurvenbahn folgen), 505 (Seitwärts-Nachführen), 707 (Spur folgen), 402 und 404 (reine Blickfolge ohne Hand), 915 (Blickwechsel im Takt als Gegenstück zur Folgebewegung).
- Treten beim Üben Doppelbilder, plötzlicher Sehverlust, Kopfschmerz mit Sehverschlechterung oder Schwindel auf, sollte das ärztlich abgeklärt werden, statt weiterzuüben (Muchnick, 2008, S. 6, 28).
- Keine Diagnosen, keine Heilversprechen; nicht als Prüfung der Augenbewegungen darstellen.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Kein Blickmaß:** Die Übung misst nur den Finger; Texte halten das ehrlich fest (`texts.ts`, `science.ts`).
- **Verdeckung durch den Finger:** Ein optionaler Versatz (Ziel leicht über dem Finger) oder eine Mausvariante ohne Verdeckung könnte die Sicht auf das Ziel verbessern.
- **Geräteabhängigkeit:** Bahnlänge und Krümmung hängen von der Bühne ab; ein Hinweis „nur auf demselben Gerät vergleichen“ ist vorhanden, eine feste Bahngröße in cm wäre vergleichbarer.
- **Keine Einstiegshilfe:** Ohne Stufen hängt viel an der Wahl der Einstellungen; Voreinstellungen „leicht/mittel/schwer“ wären hilfreich.
- **Haltearbeit:** Bei langen Läufen (bis 180 s) ein Pausenhinweis nach etwa 60 s.

## 11. Quellen

### Von der Website angegeben
keine (eigene Übung)

### Weitere Fachliteratur
- Engel, K. C., Anderson, J. H., & Soechting, J. F. (2000). Similarity in the response of smooth pursuit and manual tracking to a change in the direction of target motion. *Journal of Neurophysiology*, *84*(3), 1149–1156. https://doi.org/10.1152/jn.2000.84.3.1149 – Augen und Hand reagieren ähnlich auf Richtungswechsel (Crossref geprüft; Abstract gelesen).
- Danion, F. R., & Flanagan, J. R. (2018). Different gaze strategies during eye versus hand tracking of a moving target. *Scientific Reports*, *8*(1), 10059. https://doi.org/10.1038/s41598-018-28434-6 – beim Mitführen mit der Hand genaueres Mitgleiten der Augen (Crossref geprüft; Abstract gelesen).
- Miall, R. C., Weir, D. J., & Stein, J. F. (1993). Intermittency in human manual tracking tasks. *Journal of Motor Behavior*, *25*(1), 53–63. https://doi.org/10.1080/00222895.1993.9941639 – Handführen in Korrekturschritten (Crossref geprüft; Abstract gelesen).
- de’Sperati, C., & Viviani, P. (1997). The relationship between curvature and velocity in two-dimensional smooth pursuit eye movements. *The Journal of Neuroscience*, *17*(10), 3932–3945. https://doi.org/10.1523/JNEUROSCI.17-10-03932.1997 – Folgegenauigkeit hängt von Tempo und Krümmung ab (Crossref geprüft; Abstract gelesen).
- Eibenberger, K., Ring, M., & Haslwanter, T. (2012). Sustained effects for training of smooth pursuit plasticity. *Experimental Brain Research*, *218*(1), 81–89. https://doi.org/10.1007/s00221-012-3009-8 – kleine Trainingsstudie zur Folgebewegung (Crossref geprüft; Abstract gelesen).
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, *52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Zeitmessung am Touchgerät (Crossref geprüft; Abstract gelesen).
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology*, *16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Gewöhnungseffekt bei trainingsähnlicher Prüfung (Crossref geprüft; Abstract gelesen).
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology*, *351*(1), 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Verstärkung unter 1 und Aufholsakkaden (Crossref geprüft).
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology*, *91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – Folgebewegung und Sakkaden als verknüpfte Steuerungen (Crossref geprüft).
- Lisberger, S. G. (2010). Visual guidance of smooth-pursuit eye movements: Sensation, action, and what happens in between. *Neuron*, *66*(4), 477–491. https://doi.org/10.1016/j.neuron.2010.03.027 – Übersicht zur Steuerung der Folgebewegung (Crossref geprüft).
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology*, *49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – Folgebewegung im Alter (Crossref geprüft).
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of the 8th Conference on Human-Computer Interaction with Mobile Devices and Services* (S. 203–210). ACM. https://doi.org/10.1145/1152215.1152260 – Mindestgröße von Touch-Zielen (Crossref geprüft).
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., & Wells, K. A. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics*, *27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Kopf- und Augenbewegungen bei Gleitsicht (Crossref geprüft).
- Sheppard, A. L., & Wolffsohn, J. S. (2018). Digital eye strain: Prevalence, measurement and amelioration. *BMJ Open Ophthalmology*, *3*(1), e000146. https://doi.org/10.1136/bmjophth-2018-000146 – Augenbelastung am Bildschirm (Crossref geprüft).
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Lehrbuch: Warnzeichen mit Abklärungsbedarf (S. 6, 28); klinische Prüfung der Folgebewegung mit dem H-Muster (S. 32–35), nur zur Abgrenzung.
