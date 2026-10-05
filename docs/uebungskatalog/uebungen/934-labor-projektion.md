---
# ===== Kennung =====
nr: 934
kennung: labor-projektion
name: "Orts-Projektion (Funktionsübung: kurz gesehenen Punkt aus der Erinnerung antippen)"
name_original: "– (eigene Labor-Übung, Zeigen auf einen kurz gesehenen Ort)"
kapitel: "Labor"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "labor-projektion", name: "Orts-Projektion", unterschiede: "eigene Labor-Übung mit Einstellungen"}
stand: 2026-10-05

# ===== Überblick =====
kurzbeschreibung: "Funktionsübung nach dem Prinzip des klassischen Verfahrens (Zeigen auf einen kurz gesehenen Ort), kein Ersatz für die Untersuchung. Man schaut auf ein Kreuz in der Mitte; ein Punkt erscheint kurz und verschwindet. Nach einer einstellbaren Wartezeit tippt man dorthin, wo er war. Die App zeigt, wie weit die Antworten vom Punkt lagen, ob sie im Mittel in eine Richtung verschoben waren und wie stark sie streuten; sie deutet nichts. Keine Brille nötig."
ziel_funktionen: [peripheres_sehen, fixation, auge_hand_koordination]
eingabe: [touch, maus]
tablet_geeignet: ja
dauer_sekunden: 90
schwierigkeit_anpassung: "Keine Stufen; Einstellungen (Standard in Klammern): Anzahl der Punkte 6–60, gerade Zahlen (20), Anzeigedauer des Punktes 100–2000 ms (300 ms; an die Bildwiederholrate gebunden), Wartezeit bis zum Tippen 0–5000 ms (0), Zone gesamte Fläche oder nur Rand (außerhalb der inneren 60 %), Ort nach der Antwort zeigen ja/nein (ja), Punktgröße 0,5–3 cm (1 cm). Orte zufällig mit 2 cm Rand und 2 cm Abstand zur Mitte. Leichter: lange Anzeige (500–1000 ms), keine Wartezeit, ganze Fläche, Ort zeigen. Schwieriger: kurze Anzeige (100–150 ms), Wartezeit (2000–5000 ms), nur Rand, Ort nicht zeigen."
messgroessen: ["Hauptwert: beantwortete Punkte (Zahl der Eingaben, keine Leistung)", "Übungswert: mittlere Abweichung der Antworten in cm und als Sehwinkel", "Übungswert: mittlere seitliche und senkrechte Verschiebung (+ rechts bzw. oben)", "Übungswert: Streuung der Antworten um ihren eigenen Mittelpunkt", "Zeit von der Freigabe bis zum Tippen (enthält die Touch-Verzögerung)", "keine Messung des Blicks; keine Deutung, keine Richtwerte"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 1
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 3
    nutzbares_sehfeld: 2
    blickfolge: 0
    sakkaden: 1
    fixation: 3
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 2
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 2
    geteilte_aufmerksamkeit: 1
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 2
    verarbeitungsgeschwindigkeit: 1
    antizipation: 0
    entscheidung_wahlreaktion: 0
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 3
    zielbewegung_tempo: 0
    zielbewegung_praezision: 2
    kontinuierliche_steuerung: 0
    ruhige_hand: 1
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 1
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Etwa 50–60 cm vor dem Bildschirm sitzen, Kopf ruhig in der Mitte; Abstand bei der Kalibrierung angeben", "Bildschirm kalibriert (Abweichung in cm und Grad)", "Blick auf dem Kreuz halten können, auch wenn der Punkt am Rand erscheint", "Mit Finger, Stift oder Maus einen Ort auf dem Bildschirm antippen; Spiegelungen vermeiden", "Keine Rot-Grün-Brille nötig"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, gesichtsfeldausfall, sehbehinderung_niedriger_visus, nystagmus, tremor_parkinson, hand_arm_beschwerden, aufmerksamkeitsprobleme]
geeignet_fuer: ["Einen kurz am Rand gesehenen Ort bei ruhigem Blick erfassen und aus der Erinnerung antippen (Funktionsübung, kein Ersatz für die Untersuchung)", "Mit der Rückmeldung sehen, in welche Richtung die eigenen Antworten abweichen", "Wartezeit und Anzeigedauer getrennt einstellen (Erfassen kurz gezeigter Orte, Merken des Ortes)", "Vergleich mit sich selbst bei gleichen Einstellungen, gleicher Hand, gleichem Abstand und Gerät"]
weniger_geeignet_fuer: ["Prüfung des Gesichtsfeldes oder ein Befund (die App misst den Blick nicht und deutet nichts)", "Menschen, die den Blick nicht in der Mitte halten können oder wollen (die Aufgabe ändert sich dann)", "Diagnose, Normvergleich, Therapie"]
evidenz:
  uebungseffekt: unklar
  naher_transfer: fehlend
  alltag_transfer: fehlend
  kommentar: "Funktionsübung nach dem Prinzip des klassischen Verfahrens, kein Ersatz für die Untersuchung. Laborstudien zum Zeigen auf kurz gesehene oder erinnerte Ziele beschreiben blickabhängige Fehler (Henriques et al. 1998), eine nur kurz anhaltende Ortsrepräsentation (Lemay & Proteau 2002) und den Einfluss begleitender Augenbewegungen (van Donkelaar & Staub 2000). Für diese Übung am Bildschirm gibt es keine Studie; ob die Antworten mit Übung genauer werden, ist offen, ein Nutzen für Alltag, Sport oder Verkehr ist nicht belegt."
aehnliche_uebungen: [401, 605, 108, 506, 912]
stichworte: ["Ortsprojektion", "Zeigen auf erinnerte Ziele", "kurz gezeigter Punkt", "Fixationskreuz", "Rand sehen", "Auge-Hand", "räumliches Kurzzeitgedächtnis", "Funktionsübung", "Labor-Übung", "kein Ersatz für die Untersuchung"]
---

# 934 · Orts-Projektion (Funktionsübung: kurz gesehenen Punkt aus der Erinnerung antippen)

> Original: – (eigene Labor-Übung, Zeigen auf einen kurz gesehenen Ort) · Blickfit: „Orts-Projektion“ (`src/exercises/labor-projektion/`, Kategorie Wahrnehmung)

## 1. Kurzbeschreibung

Funktionsübung nach dem Prinzip des klassischen Verfahrens, kein Ersatz für die Untersuchung. In der Mitte steht ein Kreuz, das man ansieht. Nach 0,7 s erscheint irgendwo im Feld kurz ein Punkt und verschwindet wieder; nach einer einstellbaren Wartezeit tippt man dorthin, wo er war. Auf Wunsch zeigt die App danach kurz den echten Ort und die eigene Antwort. Es erscheint immer nur ein Punkt, nie mehrmals pro Sekunde. Die wichtigsten Einstellungen sind die Anzahl der Punkte (Standard 20), die Anzeigedauer (300 ms), die Wartezeit (keine), die Zone (gesamte Fläche oder nur Rand), die Rückmeldung (an) und die Punktgröße (1 cm). Gezeigt werden Übungswerte: mittlere Abweichung in Zentimetern und Grad, seitliche und senkrechte Verschiebung und Streuung. Die App kann nicht prüfen, ob der Blick in der Mitte geblieben ist, und deutet nichts.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `index.ts`, `logic.ts`, `texts.ts`, `science.ts` in `src/exercises/labor-projektion/` (Stand 05.10.2026).

- **Ablauf je Punkt:** Kreuz 700 ms → Punkt (Anzeigedauer, ab 100 ms, an die Bildwiederholrate gebunden) → Wartezeit (falls > 0) → Antwort → Rückmeldung (800 ms mit Ort und Antwort, sonst 250 ms).
- **Orte:** zufällig (`ctx.rng`), als Anteile des Feldes gespeichert (eine gedrehte Bühne zeigt denselben Ort); 2 cm Rand zum Feldrand, mindestens 2 cm Abstand zur Mitte; bei „Nur Rand“ nur außerhalb der inneren 60 % (elliptisch auf das Feld bezogen).
- **Werte:** Abweichung je Antwort in cm (seitlich, senkrecht, Betrag) und als Sehwinkel über den Abstand der Kalibrierung; Mittelwerte, Verschiebung (Bias) und Streuung um den eigenen Mittelpunkt; Zeit von der Freigabe bis zum Tippen. Hauptwert = beantwortete Punkte.
- **Sicherheit:** Übung ist mit dem Hinweis für kurz aufleuchtende Reize gekennzeichnet; der Punkt erscheint einzeln und kurz, kein Flackern. Schnellmodus: 3 Punkte.
- **Eingabe:** nur Tippen bzw. Klicken.

## 3. Herleitung aus der Forschung (keine Beschreibung eines Programms)

- **Zeigen auf kurz gesehene Ziele:** Beim Zeigen im Dunkeln auf kurz aufleuchtende Ziele war das Zeigen genau, solange der Blick auf dem Ziel blieb; bei festem Blick auf einen Randpunkt wurde die Entfernung des mittleren Ziels vom Blickpunkt um 13,4 ± 5,1 % überschätzt (Henriques et al. 1998). Die Übung hält den Blick auf dem Kreuz und lässt den Punkt außerhalb der Blickmitte erscheinen.
- **Wartezeit:** Die visuelle Repräsentation des Ortes hielt in einer Studie mit je 10 jüngeren und älteren Erwachsenen nur kurz (unter einer Sekunde), ohne Einfluss des Alters (Lemay & Proteau 2002). Deshalb ist die Wartezeit einstellbar; eine allgemeine Regel, dass längeres Warten den Fehler vergrößert, wird nicht behauptet.
- **Augenbewegung:** Die Handbewegung fiel größer aus, wenn sie allein statt zusammen mit einer Augenbewegung ausgeführt wurde, bei sichtbaren wie bei erinnerten Zielen (van Donkelaar & Staub 2000). Ob man beim Tippen zum Ort schaut, beeinflusst also das Ergebnis; die App kann das nicht prüfen.
- **Sicherheit:** Warnzeichen nach Muchnick 2008 (S. 6, 28).

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Bei 50 cm Abstand entspricht 1 cm etwa 1,1°; ein Punkt von 1 cm ist ≈ 1,1° groß. Auf einem 11-Zoll-Tablet (etwa 23 × 16 cm) liegen die Orte bei 50 cm bis etwa 10° waagrecht neben der Mitte (gerechnet, mit 2 cm Rand); auf größeren Bildschirmen weiter. „Nur Rand“ legt die Orte außerhalb der inneren 60 % des Feldes.
- **Peripheres Sehen:** Der Punkt erscheint außerhalb der Blickmitte und muss bei ruhigem Blick erfasst werden; die Sehschärfe nimmt zum Rand hin ab, ein Punkt von 1 cm ist aber auch am Rand gut sichtbar.
- **Kurze Anzeige:** Je kürzer die Anzeige, desto eher ist der Punkt verschwunden, bevor ein Blicksprung dorthin ankäme; bei langer Anzeige ist die Versuchung größer, hinzuschauen. Die Dauer hängt an der Bildwiederholrate (bei 60 Hz etwa 17 ms je Bild).
- **Fixation:** Der Blick soll auf dem Kreuz bleiben; Blicksprünge zum Punkt verändern die Aufgabe (Henriques et al. 1998; van Donkelaar & Staub 2000).
- **Brille:** Keine Rot-Grün-Brille nötig. Bei Gleitsicht liegen Randorte in verschiedenen Glaszonen; ein Abstand von 50–60 cm mit passender Korrektur hilft.
- **Spiegelungen** auf dem Bildschirm verändern die Wahrnehmung des Ortes.

## 5. Neurowissenschaftliche Grundlagen

- **Vom Blick zur Zeigebewegung:** Um auf einen gesehenen Ort zu zeigen, muss der Ort im Blickfeld in eine Handbewegung übersetzt werden. Henriques et al. (1998) beschreiben, dass erinnerte Orte beim Zeigen blickzentriert neu zugeordnet werden – daher hängen die Fehler davon ab, wohin man schaut.
- **Kurze Ortsrepräsentation:** Die visuelle Information über den Ort hält nur kurz (Lemay & Proteau 2002); bei längerer Wartezeit muss der Ort gemerkt werden (räumliches Kurzzeitgedächtnis).
- **Auge und Hand gemeinsam:** Augen- und Handbewegungen beeinflussen sich gegenseitig (van Donkelaar & Staub 2000).
- **Keine Aussage über Hirnregionen**, keine Deutung einer Verschiebung als Befund.

## 6. Motorische Grundlagen

Gefordert ist ein genauer Tipp auf einen Ort ohne sichtbares Ziel; Tempo spielt keine große Rolle. Der Finger verdeckt den Ort und hat eine Auflagefläche von rund 1 cm; Stift oder Maus sind genauer. Die Hand (rechts oder links) beeinflusst, welche Bereiche leichter erreicht werden; für Vergleiche immer dieselbe Hand nutzen. Tremor erhöht die Streuung.

## 7. Einflussfaktoren und Messgrenzen

- **Blick nicht gemessen:** Ob der Blick in der Mitte blieb, ist offen; Blicksprünge verändern die Fehler (Henriques et al. 1998).
- **Touch:** Fingerbreite, Verdeckung und Parallaxe zwischen Glas und Bildpunkten verschieben Antworten; Touch-Zeiten sind je nach Gerät zu lang (Pronk et al. 2020).
- **Kalibrierung und Abstand:** Ohne Kalibrierung sind cm und Grad nur geschätzt; der Sehwinkel gilt nur für den angegebenen Abstand.
- **Bildwiederholrate:** Anzeigedauern sind Vielfache der Bildzeit; sehr kurze Werte schwanken zwischen Geräten.
- **Rückmeldung:** Mit „Ort zeigen“ lernt man die eigene Verschiebung kennen; das verändert die folgenden Antworten. Für reine Vergleiche abschalten.
- **Wenige Punkte:** Mit wenigen Punkten sind Mittel und Streuung unsicher; 30–40 zeigen die Verteilung genauer.
- **Haltung und Aufmerksamkeit:** Auffällige Verschiebungen können an Gerät, Haltung oder Aufmerksamkeit liegen.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – unklar:** Für diese Übung gibt es keine Studie. Ob die Antworten mit Übung und Rückmeldung genauer werden, ist offen; ein Teil wäre Gewöhnung an Gerät und Aufgabe.
- **Naher Transfer – fehlend**, **Alltagstransfer – fehlend:** Ein Nutzen für Alltag, Sport, Verkehr oder das Sehen ist nicht belegt.
- **Einordnung:** Die genannten Studien sind Laborstudien mit Zeigen im Dunkeln bzw. mit dem Arm (Henriques et al. 1998; Lemay & Proteau 2002; van Donkelaar & Staub 2000), keine Übung am Bildschirm. Keine Richtwerte, keine Deutung.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand ruhiges Fixieren mit Erfassen am Rand und genauem Zeigen verbinden möchte; Anzeigedauer und Merkzeit getrennt eingestellt werden sollen; ein Tablet oder Bildschirm mit Touch oder Maus genutzt wird.
- **Weniger passend, wenn …** das Gesichtsfeld geprüft oder eine Verschiebung gedeutet werden soll; der Blick nicht in der Mitte gehalten werden kann; kurz aufleuchtende Reize vermieden werden sollen.
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: kurz aufleuchtender Punkt (einzeln, nie mehrmals pro Sekunde, kein Flackern); bei bekannter photosensitiver Epilepsie nur nach Rücksprache; längere Anzeigedauer wählen.
  - `gesichtsfeldausfall`, `sehbehinderung_niedriger_visus`: Punkte am Rand werden eventuell nicht gesehen; größere Punkte, längere Anzeige; Ergebnis nicht als Gesichtsfeldaussage lesen.
  - `nystagmus`: ruhiges Fixieren erschwert; Ergebnis nicht als Aussage über das Auge lesen.
  - `tremor_parkinson`, `hand_arm_beschwerden`: Stift oder Maus, Pausen; Streuung steigt.
  - `aufmerksamkeitsprobleme`: kurze Durchläufe, Rückmeldung an.
  - Neu aufgetretene Doppelbilder, plötzlicher Sehverlust, Kopfschmerz mit Sehverschlechterung und Schwindel gehören ärztlich abgeklärt (Muchnick 2008, S. 6, 28).
- **Kombiniert gut mit …** 401 (Mitte fixieren, Randpunkte bemerken), 108 (Mitte und Rand auf einen Blick), 605 (Objekt-Ort merken), 506 (Randziel antippen); innerhalb der Labor-Übungen mit 912 (peripheres Erkennen).
- Keine Diagnosen, keine Heilversprechen; immer als Funktionsübung nach dem Prinzip des klassischen Verfahrens darstellen, kein Ersatz für die Untersuchung.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Keine Blickkontrolle:** Ein Eye-Tracking oder eine Fang-Aufgabe am Kreuz (z. B. kurzes Zeichen im Kreuz, das man melden muss) könnte prüfen, ob der Blick in der Mitte bleibt.
- **Touch-Parallaxe:** gerätespezifisch; Stift empfehlen.
- **Kleine Bildschirme:** Randorte liegen auf Tablets nur wenige Grad neben der Mitte; großer Bildschirm für Randaufgaben.
- **Rückmeldung verändert die Aufgabe:** im Ergebnis vermerkt; für Vergleiche abschalten.

## 11. Quellen

### Von der Website angegeben
keine (eigene Übung)

### Weitere Fachliteratur
- Henriques, D. Y. P., Klier, E. M., Smith, M. A., Lowy, D., & Crawford, J. D. (1998). Gaze-centered remapping of remembered visual space in an open-loop pointing task. *The Journal of Neuroscience, 18*(4), 1583–1594. https://doi.org/10.1523/jneurosci.18-04-01583.1998 – blickabhängige Fehler beim Zeigen auf kurz gesehene Ziele (Crossref geprüft)
- Lemay, M., & Proteau, L. (2002). Effects of target presentation time, recall delay, and aging on the accuracy of manual pointing to remembered targets. *Journal of Motor Behavior, 34*(1), 11–23. https://doi.org/10.1080/00222890209601927 – kurzlebige Ortsrepräsentation, Alter (Crossref geprüft)
- van Donkelaar, P., & Staub, J. (2000). Eye-hand coordination to visual versus remembered targets. *Experimental Brain Research, 133*(3), 414–418. https://doi.org/10.1007/s002210000422 – Einfluss begleitender Augenbewegungen (Crossref geprüft)
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touchscreens messen Zeiten zu lang (Crossref geprüft)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28)
