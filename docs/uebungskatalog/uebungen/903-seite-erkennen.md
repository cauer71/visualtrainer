---
# ===== Kennung =====
nr: 903
kennung: seite-erkennen
name: "Welche Seite? (Hand oder Fuß als rechts oder links erkennen)"
name_original: "– (Handyvideo einer Reha-/Neuro-Trainingssoftware, kein Titel erkennbar)"
kapitel: "Eigene Blickfit-Übungen"
kapitel_original: ""
unterkapitel_original: ""
blickfit_umsetzung: {kennung: "seite-erkennen", name: "Welche Seite?", unterschiede: "Eigene Umsetzung nach einem Handyvideo (Beobachtung, keine Online-Quelle); Zeichnungen prozedural selbst erzeugt (zwei Seiten = Spiegelbild, eindeutige Merkmale wie Daumen/große Zehe, Handfläche/Handrücken, Fußsohle/Fußrücken). Die Drehung ändert nie die Seite (Drehung ist keine Spiegelung). Stufen 1-12: Hand, Fuß und Unterarm von Anfang an gemischt, zwei Felder (LINKS links, RECHTS rechts) bei kleinen Drehungen bis ±45°, die Drehwinkel wachsen in der Reihenfolge der Antwortzeiten (±90° ab Stufe 5, ±135° ab 6, 180° ab 8), ab Stufe 7 vertauschte Felder, ab Stufe 10 vier Felder (OBEN und UNTEN nie richtig) und weiche Antwortfrist (6 bis 3,5 s). Hauptwert Stufe (Treppe); Zusatzwerte nur im Vergleich mit sich selbst. Keine Normen, keine Diagnose, kein Test. Zahlen können sich noch ändern."}
stand: 2026-10-01

# ===== Überblick =====
kurzbeschreibung: "In einem hellen Kreis erscheint die Strichzeichnung eines Körperteils (Hand, Unterarm mit Hand, Fuß), mal von der einen, mal von der anderen Seite, mal gedreht. Man entscheidet, ob es die rechte oder die linke Hand bzw. der rechte oder linke Fuß ist, und tippt LINKS oder RECHTS."
ziel_funktionen: [kurzzeitgedaechtnis_visuell_raeumlich]
eingabe: [touch]
tablet_geeignet: ja
dauer_sekunden: 100
schwierigkeit_anpassung: "Blickfit (so umgesetzt; Zahlen können sich ändern): 12 Stufen, Treppe (3 richtig in Folge = schwerer, 1 Fehler = leichter). Stufe 1–3: Hand, Fuß und Unterarm gemischt (von Anfang an), Drehungen bis ±45°, zwei Felder (LINKS links, RECHTS rechts). Die Drehwinkel steigen in der Reihenfolge der Antwortzeiten: 0/±15° → ±30/±45° → ±90° (ab Stufe 5) → ±135° (ab 6) → 180° (ab 8). Ab Stufe 7 tauschen die beiden Felder zufällig ihre Seiten, die Wörter erscheinen erst mit dem Bild (Wortlesen nötig). Stufe 10–12: vier Felder (OBEN und UNTEN sind nie richtig), Wörter gemischt. Antwortfrist 6 s bis Stufe 9, dann 5,0 / 4,2 / 3,5 s; „zu langsam“ zählt für die Treppe als Fehler, ohne Punktabzug. Original: aus dem Video nicht erkennbar."
messgroessen: ["Hauptwert: erreichte Stufe (Schwelle der Treppe)", "Treffer in %", "Median der Zeit richtiger Antworten (ms)", "Dreh-Aufschlag: Median bei ≥ 90° gedreht minus Median bei ≤ 15° aufrecht (erst ab je 3 richtigen Antworten je Gruppe; nur Vergleich mit früher auf diesem Gerät)", "Seitenverwechslungen (links statt rechts und umgekehrt)", "Original: eine Ergebnisseite am Ende des Videos, Inhalt nicht lesbar"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
# Das Profil beschreibt die Blickfit-Umsetzung (Stufen 1–12); das Original ist nur aus einem Video bekannt.
# Für „mentale Rotation / motorische Vorstellung“ gibt es keinen eigenen Schlüssel; am nächsten liegt visuell-räumliches Vorstellen.
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 2
    kontrast: 1
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 0
    nutzbares_sehfeld: 1
    blickfolge: 0
    sakkaden: 1
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
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 1
    arbeitsgedaechtnis: 2
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 3
    verarbeitungsgeschwindigkeit: 1
    antizipation: 0
    entscheidung_wahlreaktion: 1
    lesen_sprache: 1
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 1
    zielbewegung_tempo: 0
    zielbewegung_praezision: 1
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
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 2

# ===== Auswahlhilfe =====
voraussetzungen: ["Hand, Unterarm und Fuß als Zeichnung erkennen; Daumen und große Zehe unterscheiden können", "Die Begriffe links und rechts (LINKS/RECHTS, IT: SINISTRA/DESTRA) kennen und lesen können", "Feine Linien einer Strichzeichnung im hellen Kreis erkennen (Merkmale wie Nägel, Beugefalten, Wölbung)", "Mit dem Finger Felder von mindestens 72 px Höhe (≈ 14 mm) treffen können"]
vorsicht_bei: [kognitive_einschraenkung, kinder_unter_6, sehbehinderung_niedriger_visus, presbyopie_gleitsicht]
geeignet_fuer: ["räumliches Vorstellen üben: ein Bild im Kopf drehen und mit der eigenen Hand/dem eigenen Fuß vergleichen", "ruhiges Tempo mit schrittweise steigender Drehung (0° → ±45° → ±90° → ±135° → 180°)", "Abwechslung zu Reaktions- und Blickübungen, die Auge und Vorstellung verbindet", "Vergleich mit sich selbst über mehrere Sitzungen (kein Normvergleich)"]
weniger_geeignet_fuer: ["Reaktionsschnelligkeit, Blickfolge oder Handgenauigkeit üben", "Menschen, die Links und Rechts nicht lesen oder benennen können (die Übung ist sprachabhängig)", "Diagnose, Screening oder Verlaufskontrolle von Krankheiten – nicht vorgesehen und nicht möglich", "Kinder unter etwa 6 Jahren"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: mittel
  alltag_transfer: fehlend
  kommentar: "Räumliches Training verbesserte in einer Metaanalyse (217 Studien) sowohl geübte als auch ungeübte räumliche Aufgaben, g ≈ 0,47 (Uttal et al., 2013). Zur Links-Rechts-Beurteilung von Körperteilen selbst gibt es kaum Trainingsstudien; als alleinige Übung zeigte sie bei chronischem Schmerz keinen Effekt (Bowering et al., 2013; kleine, methodisch schwache Studien). Für diese Übung gibt es keine Studie – die Einstufung gilt für die Aufgabenart."
aehnliche_uebungen: [902, 103, 605, 811]
stichworte: ["mentale Rotation", "motorische Vorstellung", "Händigkeit", "Links-Rechts-Urteil", "Hand-Lateralitätsaufgabe", "Körperteile", "Drehwinkel", "Chiralität", "Seitenzuordnung"]
---

# 903 · Welche Seite? (Hand oder Fuß als rechts oder links erkennen)

> Original: – (Handyvideo einer Reha-/Neuro-Trainingssoftware, 43 s, Hochformat; keine Website, keine URL) · Blickfit: „Welche Seite?“ (`src/exercises/seite-erkennen/`, Kategorie Wahrnehmung; zum Zeitpunkt dieses Eintrags noch in Arbeit)

## 1. Kurzbeschreibung

In einem hellen Kreis erscheint eine schlichte Strichzeichnung eines Körperteils: eine Hand (von der Handfläche oder vom Handrücken), ein Unterarm mit Hand oder ein Fuß (von oben oder von der Sohle). Das Bild steht aufrecht oder ist gedreht; eine Drehung ändert die Seite nie. Man entscheidet, ob es der **rechte oder linke** Körperteil ist, und tippt das passende Feld unten (LINKS oder RECHTS). Mit steigender Stufe wächst der Drehwinkel (bis auf den Kopf gestellt), die beiden Felder tauschen später zufällig ihre Seiten, und ab Stufe 10 kommen zwei weitere Felder (OBEN, UNTEN) hinzu, die nie richtig sind; zugleich gilt eine weiche Antwortfrist. Die Aufgabe ist in der Forschung als **Links-Rechts-Beurteilung von Körperteilen** (Hand-Lateralitätsaufgabe) bekannt: Meist löst man sie, indem man sich die eigene Hand oder den eigenen Fuß in die gezeigte Lage bewegt vorstellt (motorische Vorstellung) oder das Bild im Kopf dreht. Die Übung ist eine Vorstellungs- und Wahrnehmungsaufgabe und sagt **nichts** über Gesundheit oder Krankheit aus.

## 2. Ablauf im Original (Analyse)

Quelle: **ein einziges Handyvideo** (43 s, Hochformat, 474 × 850 px) des Auftraggebers von einem großen Touchmonitor mit Trainingssoftware; eine Hand tippt mit dem Finger auf die Felder. Name und Hersteller der Software sind unbekannt, es gibt keine Website und keinen Spielcode. Dieser Abschnitt beschreibt **nur, was im Video zu sehen war**; Deutungen darüber hinaus sind als **Annahme** markiert.

**Beobachtet (Video):**
- **Reiz:** In einem hellen, grauweißen Kreis (etwa ein Drittel der Bildbreite) erscheint eine **Strichzeichnung** mit dünnen dunklen Linien, ohne Füllung. Motive im Video: Hand von der Handfläche (mit Beugefalten), Hand vom Handrücken (mit Fingernägeln und Sehnenlinien), Unterarm mit Hand (Ellbogen oben, Hand klein unten), Fuß von oben (Zehen oben, mit Nägeln), Fußsohle (Zehen oben), Fuß von vorn (Zehen unten).
- **Lage der Zeichnung:** Hände mit den Fingern nach oben, leicht schräg (wenige Grad); Unterarm senkrecht mit der Hand unten; Fuß mit den Zehen oben oder unten. Drehungen um ±90° waren in den gesichteten Bildern **nicht** zu sehen.
- **Takt:** Jede Zeichnung blieb etwa 2–3 s stehen, dann folgte die nächste. Aus Bilderzahl und Dauer ergeben sich grob **20 Zeichnungen** (Schätzung).
- **Antwortfelder:** Unten grüne Felder in Kreuzanordnung wie in 902: OBEN (oben), UNTEN (unten), RECHTS (rechts, am Bildrand abgeschnitten); am linken Rand ist ein grünes Feld angeschnitten, dessen Beschriftung nicht lesbar ist. In den gesichteten Bildern blieb die Beschriftung unverändert (OBEN oben, UNTEN unten, RECHTS rechts).
- **Bedienung:** Die Hand erscheint immer wieder im unteren Bildbereich, auf der rechten und auf der linken Seite, und tippt auf die Felder.
- **Ende:** Nach der letzten Zeichnung wechselt das Bild zu einer blau-türkisen Ergebnisseite. Der Text ist nur bruchstückhaft lesbar (Teile wie „…/cm/(20)/Touch“, „0.3“, „9.4“); Bedeutung und Einheiten sind nicht erkennbar.
- **Laut Auftraggeber (nicht im Video prüfbar):** Die Hand kann von oben oder von unten (Handrücken/Handfläche), der Fuß von vorn oder hinten gezeigt werden; man ordnet sie rechts oder links zu.

**Nicht erkennbar (Video):** ob die Antwort sofort ein Zeichen (Haken/Kreuz) auslöst; ob es eine Frist gibt; wie die Zeichnungen ausgewählt werden (Zufall, feste Folge); ob Rechts/Links gleich häufig und die Ansichten ausgewogen sind; was die Ergebnisseite zeigt; ob Zeiten, Fehler oder Vergleichswerte ausgewertet werden.

**Annahmen (nicht belegt):**
- Die Aufgabe lautet „rechts oder links?“. Dafür spricht die Aussage des Auftraggebers; im Video war keine Regeltafel zu sehen.
- Die Felder OBEN und UNTEN sind in dieser Aufgabe vermutlich nie richtig, sondern gehören zur gleichen Antwortleiste wie in Video 2. Das ist eine Vermutung aus der Beschriftung.
- Die Ergebnisseite zeigt Zahlen, vermutlich zu Zeit und Fehlern; ob sie Normen oder Bewertungen nennt, ist nicht erkennbar.

## 3. Was die Quelle sagt – und wie das einzuordnen ist

Es gibt **keinen Seitentext, keine Werbeaussage und keine Leistungsstufen** – nur das Video und die mündliche Beschreibung des Auftraggebers. Eingeordnet wird deshalb, was die **Aufgabe** wissenschaftlich ist, und die Aussage des Auftraggebers, wer Hand oder Fuß nicht rechts/links zuordnen könne, habe „eine typische Pathologie“:

- **Die Aufgabe:** Das Links-Rechts-Urteil von Händen und Füßen ist eine klassische Aufgabe der **mentalen Drehung von Körperteilen**. Die Antwortzeit hängt von der Drehung ab (Cooper & Shepard, 1975; Shepard & Metzler, 1971 für Objekte) und davon, wie bequem sich die eigene Hand in die gezeigte Lage bewegen ließe (Parsons, 1987; Sekiyama, 1982). Bei Händen war die Antwort in der Orientierung „Finger nach unten“ über **400 ms länger** (Cooper & Shepard, 1975; Abstract, Bezugsgröße dort nicht näher genannt).
- **Gestörte Links-Rechts-Unterscheidung kann bei bestimmten neurologischen Zuständen vorkommen** – klassisch als eines von vier Symptomen des **Gerstmann-Syndroms** (neben Fingeragnosie, Rechenstörung, Schreibstörung), beschrieben nach Läsionen des dominanten (meist linken) Scheitellappens (Gerstmann, 1940; Rusconi et al., 2010; Fallbericht mit Läsion unter dem linken Gyrus angularis: Mayer et al., 1999). Nach heutiger Sicht entsteht das reine Syndrom eher durch eine Unterbrechung von Faserverbindungen im Parietalmark als durch Ausfall einer einzigen Hirnregion (Rusconi et al., 2009, 2010). Die Diagnose verlangt das **gleichzeitige** Vorliegen aller vier erworbenen Symptome (Rusconi, 2018).
- **Aber die Verwechslung von rechts und links kommt auch bei Gesunden vor:** In einer großen Untersuchung berichteten **14,6 %** der Allgemeinbevölkerung unzureichende Links-Rechts-Identifikation; 42,9 % nutzen dabei eine handbezogene Strategie (van der Ham et al., 2021). Bei 290 gesunden Medizinstudierenden (erstes Jahr) streuten die Punkte im Bergen-Test von 31 bis 143 von 144 (Mittel 112, SD 22,2); Vorderansicht war schwerer als Rückansicht (Gormley et al., 2008). Ablenkung verschlechtert die Leistung (McKinley et al., 2015).
- **Daraus folgt:** „Hand oder Fuß nicht rechts/links zuordnen können“ ist **keine** „typische Pathologie“. Eine Schwierigkeit kann zu bestimmten Krankheitsbildern gehören; sie ist aber auch bei Gesunden häufig und hängt von Aufgabe, Ansicht, Drehwinkel, Alter, Strategie und Sprache ab. Aus einem einzelnen Ergebnis in einer Übung lässt sich weder auf Gesundheit noch auf Krankheit schließen. Blickfit ist kein Diagnosewerkzeug und nennt **keine Normwerte**.
- **Nicht belegt:** dass die Übung Krankheiten erkennt, verbessert oder vorbeugt; dass das Video-Original dies kann.

## 4. Optische und okulomotorische Grundlagen

- **Sehanforderung mittel:** Die Zeichnung besteht aus feinen Linien; entscheidend sind wenige große Merkmale (Daumen bzw. große Zehe deutlich größer und abgesetzt, Handfläche mit Falten vs. Handrücken mit Nägeln, Sohle mit Wölbung). Die Merkmale sollten bei 40 cm Tablet-Abstand (rund 36 Bildschirmpunkte je Grad) mindestens etwa 1° groß sein; das ist eine Gestaltungsempfehlung, keine Studienaussage. Schwacher Kontrast dünner Linien auf hellem Kreis ist bei niedrigem Visus ein Hindernis.
- **Blickverhalten:** Blick auf die Zeichnung, kurze Suche nach dem Leitmerkmal (Daumen/große Zehe), dann auf die Felder. Es gibt keine Blickfolge und keine Peripherie-Aufgabe.
- **Sehabstand und Haltung:** Die Aufgabe verändert die Haltung der eigenen Hand nicht, aber die Haltung der eigenen Hände kann die Antwortzeit beeinflussen (Rechtshänder: Antwortzeit für rechte Hände stieg, wenn die rechte Hand hinter dem Rücken lag; Ionta & Blanke, 2009). Tablet auf den Tisch oder in die Hand legen und gleichbleibend halten.
- **Brillenträger:** Zeichnung und Felder liegen untereinander im Hochformat; bei Gleitsicht und Tablet in Nahdistanz meist durch den Nahteil lesbar (neue Gleitsichtträger nutzten in einer kleinen Studie mehr Kopfbewegungen; Hutchings et al., 2007; nicht für diese Übung untersucht). Eine Nahbrille/Arbeitsplatzbrille für den Bildschirmabstand ist eine Bedienhilfe, keine Sehaussage.
- **Farbe:** keine Farbunterscheidung nötig; Wörter auf den Feldern tragen die Information (WCAG 2.2, SC 1.4.1).

## 5. Neurowissenschaftliche Grundlagen

- **Mentale Drehung:** Eine Metaanalyse der Bildgebung fand bei mentaler Drehung mehr Aktivität im Sulcus intraparietalis und angrenzenden Regionen und – besonders, wenn Motorsimulation nahe liegt – im medialen oberen präzentralen Kortex (Zacks, 2008).
- **Körperteile vs. Objekte:** Beim mentalen Drehen von Händen waren in einer PET-Studie (12 Rechtshänder) zusätzlich der primär-motorische Kortex und prämotorische Areale aktiv, beim Drehen verzweigter Objekte nicht; es gibt demnach mindestens zwei Strategien, eine mit Bewegungsvorbereitung, eine ohne (Kosslyn et al., 1998).
- **Motorische Vorstellung als Strategie:** Antwortzeiten folgen der Biomechanik (längere Zeit für unbequeme Drehrichtungen); das deutet auf die Vorstellung der eigenen Bewegung (Parsons, 1987; Sekiyama, 1982; Funk et al., 2005 bei 5–6-Jährigen und Erwachsenen). Bei Drehung nur **um eine Achse** (wie in der Bildebene) zeigte sich in einer Studie **kein** Einfluss körperlicher Einschränkungen; erst Reize mit mehr als einer Drehachse riefen die motorische Vorstellung deutlich ab (ter Horst et al., 2010). Ob die Blickfit-Zeichnungen, die nur in der Bildebene gedreht werden, die motorische Vorstellung auslösen, ist daher **offen**.
- **Hirnregionen:** „Diese Übung trainiert Region X“ ist nicht belegt und wird nicht gesagt. Gemessen wurde Aktivierung bei der Aufgabe, keine Trainingsänderung.

- **Einschätzung der Anforderungen (kein Messergebnis):** `kurzzeitgedaechtnis_visuell_raeumlich` 3 als nächstliegender Schlüssel (ein räumliches Bild im Kopf halten und drehen; für mentale Rotation gibt es keinen eigenen Schlüssel), `arbeitsgedaechtnis` 2, `sehschaerfe_detail` 2 (feine Linien, Leitmerkmale), `sprachabhaengigkeit` 2 (ab Stufe 7 müssen die Felder gelesen werden), `zeitdruck` 1 (nur Stufe 10–12 mit weicher Frist), `inhibition` 1 und `entscheidung_wahlreaktion` 1 (zwei gültige Antworten), `farbunterscheidung` 0 (Wörter tragen die Information).

## 6. Motorische Grundlagen

Motorisch anspruchslos: ein Tipp auf ein großes Feld (mindestens 72 px hoch, Trefferfläche mindestens 56 px). Die eigentliche „Bewegung“ findet in der Vorstellung statt; körperlich muss man die Hand **nicht** bewegen. Antwortzeiten auf dem Touchscreen werden zu lang gemessen (Pronk et al., 2020); für den persönlichen Vergleich zweier Bedingungen auf demselben Gerät hebt sich das weitgehend heraus. Zu frühe Tipps und Doppeltipps zählen in der Übung nicht.

## 7. Einflussfaktoren und Messgrenzen

- **Aufgabe und Ansicht:** Bei Medizinstudierenden war die Vorderansicht einer ganzen Figur schwerer als die Rückansicht (Gormley et al., 2008). Bei Händen und Füßen störte die Ansicht die Drehfunktion unterschiedlich stark (Reihenfolge der Ansichten im Abstract von Ionta & Blanke, 2009: dorsal, Daumen-/Großzehenseite, Handfläche/Fußsohle, Kleinfinger-/Kleinzehenseite).
- **Drehwinkel:** Die Zeit wächst mit der Abweichung von der aufrechten Lage (Cooper & Shepard, 1975; Shepard & Metzler, 1971). Nach Cooper & Shepard (1975) ist die Orientierung „Finger nach unten“ (180°) die langsamste; in der Übung folgen die Drehwinkel deshalb aufsteigend aufeinander (±90° ab Stufe 5, ±135° ab Stufe 6, 180° erst ab Stufe 8). ±90° wurde in jener Arbeit nicht einzeln geprüft. Der „Dreh-Aufschlag“ fasst alle Bilder ab 90° zusammen und verdeckt damit, dass 90°, 135° und 180° unterschiedlich schwer sein können; er ist nur als Vergleich mit sich selbst brauchbar.
- **Alter:** Ältere (n = 19, Ø 78,3 J.) waren bei der impliziten motorischen Vorstellung von Händen stärker beeinträchtigt als Jüngere (n = 20, Ø 23,9 J.), besonders bei großen Bewegungswegen und starken biomechanischen Einschränkungen und für den nicht dominanten Arm (Saimpont et al., 2009). Kinder von 5–6 Jahren können die Aufgabe bearbeiten (Funk et al., 2005); in einer Studie zu Links-Rechts-Unterscheidung an Figuren machten jüngere Kinder (7–8 J.) bei der Vorderansicht mehr Fehler (Ofte & Hugdahl, 2002; 280 Kinder).
- **Händigkeit und Geschlecht:** Linkshänder waren beim Erkennen linker Hände im Vorteil; Frauen hatten insgesamt mehr Fehler; beides in einer kleinen Studie (31 Männer, 35 Frauen; Constant & Mellet, 2018). Andere Studien fanden Unterschiede in anderer Richtung, etwa in Selbstberichten (Hannay et al., 1990: mehr Männer und Linkshänder berichteten häufige Verwechslung; Gültigkeit von Selbstberichten angezweifelt) bzw. bessere Werte bei Männern (Gormley et al., 2008). Die Befunde sind **uneinheitlich**; Geschlecht und Händigkeit werden nicht für Aussagen genutzt.
- **Strategie und Ablenkung:** Wer gelernte Hilfstechniken nutzte, erzielte weniger Punkte (Gormley et al., 2008); mit Handstrategie und passender Armhaltung ging es besser (van der Ham et al., 2021); kognitive Ablenkung senkt die Leistung (McKinley et al., 2015).
- **Sprache:** Die Aufgabe nutzt Wörter für links und rechts. Sprachen und Kulturen unterscheiden sich in den bevorzugten räumlichen Bezugssystemen (Pederson et al., 1998; Majid et al., 2004). Für DE und IT (LINKS/RECHTS, SINISTRA/DESTRA) ist das unkritisch, Werte aber nicht zwischen Sprachen vergleichen.
- **Bildung:** Ein Einfluss der Schulbildung auf die Links-Rechts-Beurteilung von Körperteilen wird oft angenommen, ist aber in den geprüften Quellen **nicht** belegt und wird deshalb nicht behauptet.
- **Raten:** Bei zwei gültigen Antworten liegt der Zufall bei 50 %. Bei 20 Durchgängen sind 15 oder mehr richtige beim reinen Raten möglich (Wahrscheinlichkeit ≈ 2 %, Binomialverteilung); eine einzelne Runde beweist daher wenig. Die Differenzwerte (Dreh-Kosten) sind als persönlicher Wert wenig zuverlässig (Hedge et al., 2018).
- **Gerät:** Bildschirmgröße und Abstand ändern die Größe der Merkmale; Touch-Latenz verschiebt absolute Zeiten (Pronk et al., 2020). Messungen am Menschen streuen stärker als an Prüfkörpern (Mountford et al., 2004, S. 43–44), und eine hohe Korrelation zweier Verfahren heißt nicht, dass sie dieselben Werte liefern (ebd., S. 24). Aussagekräftig ist deshalb nur der Verlauf über mehrere Runden auf demselben Gerät.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt: mittel (für die Aufgabenart).** Räumliches Training hatte in einer Metaanalyse über 217 Studien einen mittleren Effekt (g = 0,47), stabil über die Zeit (Uttal et al., 2013). Speziell zur Links-Rechts-Beurteilung von Körperteilen gibt es für Gesunde kaum Trainingsstudien.
- **Naher Transfer: mittel (für räumliche Aufgaben allgemein).** Das Training übertrug sich auf ungeübte räumliche Aufgaben (Uttal et al., 2013). Für unsere Übung nicht untersucht.
- **Alltagstransfer: fehlend.** Ein Nutzen im Alltag, im Verkehr, beim Sport oder bei der Orientierung ist nicht belegt.
- **Klinischer Kontext (nur Hintergrund, keine Aussage über unsere Übung):** Die Aufgabe wird in der Forschung zu chronischem Schmerz und nach Schlaganfall als Maß der motorischen Vorstellung benutzt. In einer Metaanalyse von 25 Studien (2.266 Personen) war die Leistung bei chronischen Gliedmaßen- und Gesichtsschmerzen verändert (Breckenridge et al., 2019). Bei 23 Patient:innen nach Schlaganfall stieg der Anteil mit mäßiger bis guter motorischer Vorstellung (gemessen mit der Hand-Lateralitätsaufgabe) von 78 % nach 3 Wochen auf 94 % nach einem Jahr (Feenstra et al., 2016). Ein „abgestuftes Vorstellungstraining“, das die Aufgabe als ersten Schritt nutzt, wurde bei Menschen mit chronischem Schmerz (CRPS) in einer kleinen Studie geprüft (Moseley, 2004; 13 Personen); die Übersichtsarbeit fand für das Links-Rechts-Training **allein keinen Effekt** und insgesamt methodisch schwache Studien (Bowering et al., 2013). Das sind klinische Programme unter fachlicher Anleitung; Blickfit ist keine Therapie.
- **Kurzfassung für Anwender:** „Bei Welche Seite? entscheidest du, ob eine Hand oder ein Fuß ein rechter oder ein linker ist. Hilfreich kann sein, sich die eigene Hand in diese Lage zu denken – ob das bei dir hilft, ist nicht belegt. Mit Übung wird man in solchen Aufgaben meist besser; ob das im Alltag hilft, ist nicht belegt. Die Übung stellt keine Diagnose.“

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand eine ruhige Vorstellungs- und Wahrnehmungsübung sucht; räumliches Vorstellen geübt werden soll; ein Tablet mit Touch genutzt wird; keine Farbunterscheidung und keine Schnelligkeit gewünscht sind; der eigene Verlauf wichtiger ist als ein Rang.
- **Weniger passend, wenn …** Reaktion, Blickfolge oder Handgenauigkeit trainiert werden sollen; Links und Rechts nicht gelesen oder benannt werden können; eine Diagnose, ein Screening oder ein Normvergleich gewünscht ist (nicht vorgesehen).
- **Vorsicht / anpassen bei …**
  - `kognitive_einschraenkung`: Höhere Stufen (Drehung, vertauschte Felder) können frustrieren; auf Stufe 1–3 bleiben. Kein Therapieanspruch.
  - `kinder_unter_6`: Links/Rechts-Begriffe und Anatomie noch nicht sicher; nicht untersucht.
  - `sehbehinderung_niedriger_visus`, `presbyopie_gleitsicht`: feine Linien; Tablet in den Nahteil-Abstand bringen, Kontrast und Größe prüfen.
  - **Warnzeichen (kein Schlüssel):** Doppelbilder, plötzlicher Sehverlust, Lichtblitze, Kopfschmerz mit nachlassender Sehschärfe, Schwindel oder Zittern gelten in der Lehrbuchliteratur als Anlass zur ärztlichen Abklärung (Muchnick, 2008, S. 6, 28). Dann zuerst abklären lassen und nicht üben; Pause und Rücksprache auch bei Beschwerden während der Übung.
  - **Hinweis (nicht als Schlüssel):** Wer wegen Schmerzen, Lähmung oder Amputation an einer Hand oder einem Fuß behandelt wird, sollte die Übung nur in Absprache mit der behandelnden Person nutzen; ihre Bilder können unangenehm sein (Einschätzung, nicht untersucht).
- **Kombiniert gut mit …** 902 (Reiz-Antwort-Zuordnung, gleiche Feldleiste), 103 (visuelle Suche mit gedrehten Zeichen), 605 (Objekt-Ort merken, räumliches Gedächtnis), 811 (Muster merken, räumliches Vorstellen).
- Keine Diagnosen, keine Heilversprechen; nicht als „Test“ darstellen; keine Normwerte nennen.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

**Schwächen des Originals (soweit aus dem Video erkennbar):** Aus dem Video geht nicht hervor, ob Rechts und Links sowie die Ansichten gleich häufig vorkommen; die gezeigten Zeichnungen waren nahezu aufrecht oder genau gedreht, eine Abstufung der Drehwinkel (die den Schwierigkeitsgrad in der Literatur bestimmt) war nicht zu sehen. Die dünnen Linien haben wenig Kontrast. Die Felder OBEN und UNTEN erweitern die Antwortleiste, ohne richtig sein zu können (Vermutung), das erhöht den Konflikt, ohne dass er benannt wird. Die Ergebnisseite ist nicht lesbar; es ist offen, ob sie Normen oder Bewertungen enthält, die wissenschaftlich nicht gedeckt wären. Wortlaut „Pathologie“ des Auftraggebers: nicht belegt (siehe Abschnitt 3).

**Blickfit „Welche Seite?“ (Stand der Spezifikation; Zahlen grob, Details können sich ändern):**
- **Zeichnungen prozedural:** Hand (Handfläche mit Beugefalten, Handrücken mit Nägeln und Sehnenlinien), Fuß (Sohle mit Ballen und Gewölbe, Fußrücken mit Nägeln), Unterarm mit Hand; die zwei Seiten sind **Spiegelbilder**, Daumen und große Zehe deutlich größer und abgesetzt. Gezeichnet in eigenen Koordinaten, dann gedreht (`ctx.rotate`), damit die Linien in allen Drehungen sauber bleiben.
- **Chiralität (eigene Festlegung, mit Unit-Test abgesichert; Bildkoordinaten x nach rechts):** Hand, Finger oben: Handfläche zugewandt, Daumen rechts = rechte Hand; Handrücken zugewandt, Daumen links = rechte Hand. Fuß, Zehen oben: von oben (Fußrücken) große Zehe links = rechter Fuß; Sohle zugewandt große Zehe rechts = rechter Fuß. Unterarm mit Hand wie Hand (der Unterarm trägt keine Seiteninformation). **Eine Drehung (0/90/180/270°, kleine Schräge ±15°) ändert die Antwort nie** (Drehung ≠ Spiegelung).
- **Stufen:** 1–3 Hand, Fuß und Unterarm gemischt, Drehung bis ±45°, zwei Felder (LINKS links, RECHTS rechts); Winkel in der Reihenfolge der Antwortzeiten (±90° ab Stufe 5, ±135° ab 6, 180° ab 8); ab Stufe 7 tauschen die beiden Felder zufällig ihre Seiten, Wörter erscheinen erst mit dem Bild; ab Stufe 10 vier Felder (OBEN und UNTEN nie richtig, Wörter gemischt). Antwortfrist 6 s bis Stufe 9, dann 5,0 / 4,2 / 3,5 s („zu langsam“ = Fehler für die Treppe ohne Punktabzug). 20 Durchgänge je Runde; links/rechts je 10, höchstens 3 gleiche Seiten in Folge.
- **Ausgewogenheit:** pro Körperteil und Ansicht gleich häufig, links/rechts gleich häufig, höchstens 3 gleiche Seiten hintereinander, dieselbe Zeichnung nie zweimal in Folge.
- **Kein Eigenhand-Test, keine Diagnose, kein „Test“;** Intro neutral („Hilfreich kann sein, sich die eigene Hand in diese Lage zu denken – ob das bei dir hilft, ist nicht belegt“).
- **Zusatzwerte nur im Vergleich mit sich selbst:** Treffer, Median der Zeit, „Dreh-Aufschlag“ (≥ 90° gedreht minus ≤ 15° aufrecht, erst ab je 3 richtigen Antworten), Seitenverwechslungen. Hauptwert Stufe (Treppe); sanfte Haken/Kreuz-Rückmeldung. Die Umsetzung folgt damit der Empfehlung, die Winkel nicht zu vermischen (0°/180° nicht in einen Wert).

**Empfehlungen:**
- **Winkelstufen:** Umgesetzt ist die Reihenfolge der Antwortzeiten (Cooper & Shepard, 1975: „Finger unten“ = 180° am langsamsten, ±90° liegt vermutlich dazwischen – Herleitung, nicht einzeln gemessen). Offen: Dreh-Aufschlag je einzelnem Winkel erfassen. Die Treppe darf das nicht als Winkel- oder Altersnorm darstellen.
- **Bildebene vs. mehrere Achsen:** Weil Drehung nur in der Bildebene die motorische Vorstellung vermutlich schwächer abruft (ter Horst et al., 2010), keine Aussage „trainiert die motorische Vorstellung“ machen.
- **Kontrast und Linienstärke** der Zeichnungen für Ältere und niedrigen Visus einstellbar halten; Größe so wählen, dass Leitmerkmale mindestens etwa 1° messen.
- **Texte:** keine Krankheitsbegriffe, keine „Auffälligkeit“, keine Normen; „… ist nicht belegt“ bei Wirkaussagen; Hinweis, dass Links-Rechts-Unsicherheit auch bei Gesunden vorkommt.
- **Messqualität:** eine Runde (20 Durchgänge) ist kurz; Verlauf als gleitender Median anzeigen.

## 11. Quellen

### Von der Website angegeben
- Keine Online-Quelle; Aufbau und Stufen beruhen auf der unten genannten Fachliteratur. **stützt:** keine Aussage

### Weitere Fachliteratur
- Cooper, L. A., & Shepard, R. N. (1975). Mental transformation in the identification of left and right hands. *Journal of Experimental Psychology: Human Perception and Performance*, *1*(1), 48–56. https://doi.org/10.1037/0096-1523.1.1.48 – Antwortzeit hängt von der Orientierung ab, „Finger unten“ > 400 ms länger (**Prüfung:** Crossref ✓; Abstract gelesen, OpenAlex).
- Parsons, L. M. (1987). Imagined spatial transformations of one's hands and feet. *Cognitive Psychology*, *19*(2), 178–241. https://doi.org/10.1016/0010-0285(87)90011-9 – Hände und Füße, Drehung und Biomechanik (**Prüfung:** Crossref ✓; Abstract nicht auffindbar, Inhalt über Ionta & Blanke, 2009, und ter Horst et al., 2010).
- Parsons, L. M. (1987). Imagined spatial transformation of one's body. *Journal of Experimental Psychology: General*, *116*(2), 172–191. https://doi.org/10.1037/0096-3445.116.2.172 – Links-Rechts-Urteil und vorgestellte Körperdrehung hängen von Winkel und Richtung ab (**Prüfung:** Crossref ✓; Abstract gelesen).
- Sekiyama, K. (1982). Kinesthetic aspects of mental representations in the identification of left and right hands. *Perception & Psychophysics*, *32*(2), 89–95. https://doi.org/10.3758/BF03204268 – Antwortzeit entspricht der Zeit, die eigene Hand in die gezeigte Lage zu bewegen (**Prüfung:** Crossref ✓; Abstract über Websuche gelesen, nicht in PubMed).
- Shepard, R. N., & Metzler, J. (1971). Mental rotation of three-dimensional objects. *Science*, *171*(3972), 701–703. https://doi.org/10.1126/science.171.3972.701 – Zeit steigt linear mit dem Drehwinkel (**Prüfung:** Crossref ✓; Abstract gelesen).
- ter Horst, A. C., van Lier, R., & Steenbergen, B. (2010). Mental rotation task of hands: Differential influence number of rotational axes. *Experimental Brain Research*, *203*(2), 347–354. https://doi.org/10.1007/s00221-010-2235-1 – bei einer Drehachse kein Einfluss der Biomechanik (**Prüfung:** Crossref ✓; Abstract gelesen).
- Ionta, S., & Blanke, O. (2009). Differential influence of hands posture on mental rotation of hands and feet in left and right handers. *Experimental Brain Research*, *195*(2), 207–217. https://doi.org/10.1007/s00221-009-1770-0 – Haltung der eigenen Hand und Ansicht beeinflussen die Antwortzeit (**Prüfung:** Crossref ✓; Abstract gelesen).
- Funk, M., Brugger, P., & Wilkening, F. (2005). Motor processes in children's imagery: The case of mental rotation of hands. *Developmental Science*, *8*(5), 402–408. https://doi.org/10.1111/j.1467-7687.2005.00428.x – Kinder 5–6 J. und Erwachsene (**Prüfung:** Crossref ✓; Abstract gelesen).
- Saimpont, A., Pozzo, T., & Papaxanthis, C. (2009). Aging affects the mental rotation of left and right hands. *PLoS ONE*, *4*(8), e6714. https://doi.org/10.1371/journal.pone.0006714 – Altersunterschiede (**Prüfung:** Crossref ✓; Abstract gelesen).
- Zacks, J. M. (2008). Neuroimaging studies of mental rotation: A meta-analysis and review. *Journal of Cognitive Neuroscience*, *20*(1), 1–19. https://doi.org/10.1162/jocn.2008.20013 – Hirnaktivität bei mentaler Drehung (**Prüfung:** Crossref ✓; Abstract gelesen).
- Kosslyn, S. M., Digirolamo, G. J., Thompson, W. L., & Alpert, N. M. (1998). Mental rotation of objects versus hands: Neural mechanisms revealed by positron emission tomography. *Psychophysiology*, *35*(2), 151–161. https://doi.org/10.1111/1469-8986.3520151 – Hände aktivieren motorische Areale (**Prüfung:** Crossref ✓; Abstract gelesen, OpenAlex).
- Uttal, D. H., Meadow, N. G., Tipton, E., Hand, L. L., Alden, A. R., Warren, C., & Newcombe, N. S. (2013). The malleability of spatial skills: A meta-analysis of training studies. *Psychological Bulletin*, *139*(2), 352–402. https://doi.org/10.1037/a0028446 – g = 0,47, Transfer auf ungeübte räumliche Aufgaben (**Prüfung:** Crossref ✓; Abstract gelesen).
- van der Ham, I. J. M., Dijkerman, H. C., & van Stralen, H. E. (2021). Distinguishing left from right: A large-scale investigation of left-right confusion in healthy individuals. *Quarterly Journal of Experimental Psychology*, *74*(3), 497–509. https://doi.org/10.1177/1747021820968519 – 14,6 % berichten unzureichende Links-Rechts-Identifikation (**Prüfung:** Crossref ✓; Abstract gelesen).
- Gormley, G. J., Dempster, M., & Best, R. (2008). Right-left discrimination among medical students: Questionnaire and psychometric study. *BMJ*, *337*, a2826. https://doi.org/10.1136/bmj.a2826 – n = 290, Punkte 31–143 von 144 (**Prüfung:** Crossref ✓; Abstract gelesen).
- McKinley, J., Dempster, M., & Gormley, G. J. (2015). ‘Sorry, I meant the patient's left side’: Impact of distraction on left–right discrimination. *Medical Education*, *49*(4), 427–435. https://doi.org/10.1111/medu.12658 – Ablenkung senkt die Leistung (**Prüfung:** Crossref ✓; Abstract gelesen).
- Constant, M., & Mellet, E. (2018). The impact of handedness, sex, and cognitive abilities on left–right discrimination: A behavioral study. *Frontiers in Psychology*, *9*, 405. https://doi.org/10.3389/fpsyg.2018.00405 – Händigkeit, Geschlecht (**Prüfung:** Crossref ✓; Abstract gelesen).
- Hannay, H. J., Ciaccia, P. J., Kerr, J. W., & Barrett, D. (1990). Self-report of right-left confusion in college men and women. *Perceptual and Motor Skills*, *70*(2), 451–457. https://doi.org/10.2466/pms.1990.70.2.451 – Selbstberichte, n = 1.182 (**Prüfung:** Crossref ✓; Abstract gelesen).
- Ofte, S. H., & Hugdahl, K. (2002). Right-left discrimination in younger and older children measured with two tests containing stimuli on different abstraction levels. *Perceptual and Motor Skills*, *94*(3), 707–719. https://doi.org/10.2466/pms.2002.94.3.707 – Kinder 7–8 und 12–13 J. (**Prüfung:** Crossref ✓; Abstract gelesen).
- Gerstmann, J. (1940). Syndrome of finger agnosia, disorientation for right and left, agraphia and acalculia. *Archives of Neurology & Psychiatry*, *44*(2), 398–408. https://doi.org/10.1001/archneurpsyc.1940.02280080158009 – Erstbeschreibung des Gerstmann-Syndroms (**Prüfung:** Crossref ✓; Inhalt über Rusconi et al., 2010; Seitenzahl im Register 398).
- Rusconi, E., Pinel, P., Dehaene, S., & Kleinschmidt, A. (2010). The enigma of Gerstmann's syndrome revisited: A telling tale of the vicissitudes of neuropsychology. *Brain*, *133*(2), 320–332. https://doi.org/10.1093/brain/awp281 – Geschichte und Deutung des Syndroms (**Prüfung:** Crossref ✓; Abstract gelesen).
- Rusconi, E., Pinel, P., Eger, E., LeBihan, D., Thirion, B., Dehaene, S., & Kleinschmidt, A. (2009). A disconnection account of Gerstmann syndrome: Functional neuroanatomy evidence. *Annals of Neurology*, *66*(5), 654–662. https://doi.org/10.1002/ana.21776 – Unterbrechung im Parietalmark (**Prüfung:** Crossref ✓; Abstract gelesen).
- Rusconi, E. (2018). Gerstmann syndrome: Historic and current perspectives. *Handbook of Clinical Neurology*, *151*, 395–411. https://doi.org/10.1016/B978-0-444-63622-5.00020-6 – Diagnose = vier gleichzeitige Symptome (**Prüfung:** Crossref ✓ (Autorin im Register nicht genannt, laut PubMed Rusconi E); Abstract gelesen).
- Mayer, E., Martory, M.-D., Pegna, A. J., Landis, T., Delavelle, J., & Annoni, J.-M. (1999). A pure case of Gerstmann syndrome with a subangular lesion. *Brain*, *122*(6), 1107–1120. https://doi.org/10.1093/brain/122.6.1107 – Fallbericht, Läsion unter dem linken Gyrus angularis (**Prüfung:** Crossref ✓; Abstract gelesen).
- Breckenridge, J. D., Ginn, K. A., Wallwork, S. B., & McAuley, J. H. (2019). Do people with chronic musculoskeletal pain have impaired motor imagery? A meta-analytical systematic review of the left/right judgment task. *The Journal of Pain*, *20*(2), 119–132. https://doi.org/10.1016/j.jpain.2018.07.004 – 25 Studien, 2.266 Personen (**Prüfung:** Crossref ✓; Abstract gelesen).
- Bowering, K. J., O'Connell, N. E., Tabor, A., Catley, M. J., Leake, H. B., Moseley, G. L., & Stanton, T. R. (2013). The effects of graded motor imagery and its components on chronic pain: A systematic review and meta-analysis. *The Journal of Pain*, *14*(1), 3–13. https://doi.org/10.1016/j.jpain.2012.09.007 – Links-Rechts-Training allein ohne Effekt (**Prüfung:** Crossref ✓; Abstract gelesen).
- Moseley, G. L. (2004). Graded motor imagery is effective for long-standing complex regional pain syndrome: A randomised controlled trial. *Pain*, *108*(1–2), 192–198. https://doi.org/10.1016/j.pain.2004.01.006 – kleine klinische Studie (13 Personen) (**Prüfung:** Crossref ✓; Abstract gelesen).
- Feenstra, W., Tepper, M., Boonstra, A. M., Otten, B., & de Vries, S. (2016). Recovery of motor imagery ability in the first year after stroke. *International Journal of Rehabilitation Research*, *39*(2), 171–175. https://doi.org/10.1097/MRR.0000000000000162 – Hand-Lateralitätsaufgabe nach Schlaganfall (**Prüfung:** Crossref ✓; Abstract gelesen).
- Pederson, E., Danziger, E., Wilkins, D., Levinson, S., Kita, S., & Senft, G. (1998). Semantic typology and spatial conceptualization. *Language*, *74*(3), 557–589. https://doi.org/10.2307/417793 – Raumbezug und Sprache (**Prüfung:** Crossref ✓, Autorenreihenfolge im Register abweichend; Abstract gelesen, OpenAlex).
- Majid, A., Bowerman, M., Kita, S., Haun, D. B. M., & Levinson, S. C. (2004). Can language restructure cognition? The case for space. *Trends in Cognitive Sciences*, *8*(3), 108–114. https://doi.org/10.1016/j.tics.2004.01.003 – Sprache und räumliche Bezugssysteme (**Prüfung:** Crossref ✓; Abstract gelesen).
- Hedge, C., Powell, G., & Sumner, P. (2018). The reliability paradox: Why robust cognitive tasks do not produce reliable individual differences. *Behavior Research Methods*, *50*(3), 1166–1186. https://doi.org/10.3758/s13428-017-0935-1 – Differenzwerte als persönlicher Wert unzuverlässig (**Prüfung:** Crossref ✓; Abstract gelesen).
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, *52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touch überschätzt Reaktionszeiten (**Prüfung:** Crossref ✓; Abstract gelesen).
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics*, *27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Gleitsicht, Kopfbewegung (**Prüfung:** Crossref ✓; Abstract gelesen, Literaturbasis W02).
- World Wide Web Consortium. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (SC 1.4.1). https://www.w3.org/TR/WCAG22/ – Farbe nie allein (**Prüfung:** Webdokument ohne DOI; Kriterium 1.4.1 am 01.10.2026 gelesen).
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen, die ärztliche Abklärung verlangen (S. 6, 28).
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Messungen am Menschen streuen; Korrelation ist keine Übereinstimmung (S. 24, 43–44).
