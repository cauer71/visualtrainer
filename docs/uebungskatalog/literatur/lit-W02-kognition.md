# Literaturbasis W02 – Kognition & Aufmerksamkeit (Katalog 201–208, 901)

Stand: 29.09.2026 · Gruppe W02 · Grundlage für die Autor-Agenten der Katalogeinträge
201 Stroop-Test („Distraction Fighter“), 202 Wahlreaktion, 203 RSVP-Schnelllesen, 204 Schulte-Tabelle,
205 Geteilte Aufmerksamkeit, 206 Multitasking, 207 Symbol-Zahl (SDMT), 208 Konzentrationsausdauer (CPT)
sowie 901 Reihen-Rätsel (eigene Blickfit-Übung).

**So ist diese Datei zu lesen**

- Jede DOI in diesem Dokument wurde am 29.09.2026 über `api.crossref.org` aufgelöst und mit Titel,
  Autor:innen, Jahr, Zeitschrift, Band und Seiten verglichen. Abweichungen sind vermerkt.
- **Prüfgrad des Inhalts** (in Klammern hinter jeder Aussage):
  - **[V]** Volltext bzw. die zitierte Passage selbst gelesen
  - **[A]** Abstract gelesen (PubMed/NCBI oder OpenAlex)
  - **[D04]** Inhalt aus `docs/wissenschaft/04-konzentration-und-denken.md` übernommen (dort geprüft,
    siehe dort Anhang A); DOI hier erneut per Crossref bestätigt. Entsprechend [D01], [D02], [D03].
  - **[S]** nur über Sekundärquelle belegt (genannt) – **als unsicher behandeln**
  - **[M]** nur Metadaten geprüft, Inhalt ist Standard-/Lehrbuchwissen und wird nur allgemein zitiert
  - **[H]** eigene Herleitung (Rechnung), keine Studienaussage
- Bewertung Website-Angaben: **ja** = Quelle stützt die Aussage · **teilweise** = stützt nur einen Teil
  oder ist übertrieben · **nein** = Quelle sagt das nicht bzw. widerspricht · **–** = kein konkreter
  Bezug im Seitentext.
- Die „Tier/Top 1 %“-Tabellen aller acht Seiten haben **keine Datengrundlage**: Die Website schreibt
  selbst, sie erhebe keine Nutzerdaten („SkillDrills collects no aggregate performance data“), und
  keine der zitierten Quellen enthält Werte für diese Spiele. Das gilt für alle Übungen und wird unten
  nicht jedes Mal wiederholt.

---

## A) Website-Quellen-Prüftabelle je Übung

### A.0 Quelle, die auf allen acht Seiten steht: Woods et al. (2015)

Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency
of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131

- **DOI-Prüfung:** korrekt (Titel, 5 Autor:innen, Jahr, Zeitschrift, Band 9, Artikel 131).
- **Was die Studie tatsächlich sagt [V, Frontiers-Volltext]:** kalibrierte einfache Reaktionszeit,
  n = 1.469 (18–65 J.), Mittel 231 ms bzw. 213 ms nach Abzug der Hardware-Verzögerung; +0,55 ms pro
  Lebensjahr; Entdeckungszeit ≈ 131 ms, altersunabhängig. Gerät: **60-Hz-LCD** (Anzeigeverzögerung
  11,0 ms) und USB-Maus mit 1 kHz (6,8 ms) – **Hardware gesamt 17,8 ms**. Andere Labore berichten
  233 bis fast 400 ms. **144-Hz- oder 240-Hz-Monitore, Gaming-Mäuse, „Frame-Jitter“, „Schlieren“,
  „Flackern“ werden nicht untersucht.**
- **Folge für alle Seiten:** Aussagen wie „144 Hz + 1.000-Hz-Sensor minimieren Latenzen“, „144 Hz
  sichern Frame-Intervalle ohne Flackern“, „144 Hz verringern Schlierenbildung drastisch“, „144 Hz
  eliminieren Frame-Jitter“ sind durch Woods et al. **nicht** gestützt (**nein**). Richtig ist nur die
  Rechnung Frame-Dauer = 1.000 ms / Bildrate (60 Hz = 16,7 ms, 144 Hz = 6,9 ms, 240 Hz = **4,2 ms**; die
  Website schreibt 4,1 ms) [H] – das steht so aber nicht bei Woods.

### A.1 – 201 Stroop-Test („Distraction Fighter“)

| Angabe der Website | DOI-Prüfung | Stützt Aussage? + Begründung |
|---|---|---|
| Logan, G. D., & Cowan, W. B. (1984). On the ability to inhibit thought and action … *Psychological Review, 91*(3), 295–327. doi 10.1037/0033-295X.91.3.295 – im Text zitiert als „Horse-Race-Modell von Gordon D. Logan & **Nelson J.** Cowan“: der automatische Leseimpuls gewinne das Rennen, wenn er nicht top-down gestoppt werde | Literaturangabe korrekt. **Fehler im Fließtext:** Zweitautor ist **William B. Cowan** (Crossref), nicht „Nelson J. Cowan“ | **nein.** Das Rennmodell von Logan & Cowan beschreibt das **Stop-Signal-Paradigma** (Abbrechen einer schon geplanten Handlung; Übersicht Verbruggen & Logan, 2008 [A]), nicht die Stroop-Interferenz. Die Stroop-Erklärung „das schnellere Lesen gewinnt das Rennen“ (relative Verarbeitungsgeschwindigkeit) hat MacLeod (1991) nach ~400 Studien als **unzureichend** bewertet [A]; besser passen Modelle, in denen Automatisierung kontinuierlich ist und mit Übung wächst (Cohen, Dunbar & McClelland, 1990 [A]) |
| Posner, M. I., & Petersen, S. E. (1990). The attention system of the human brain. *Annual Review of Neuroscience, 13*, 25–42. doi 10.1146/annurev.ne.13.030190.000325 – für „ACC und DLPFC lösen den Stroop-Konflikt“ und „Orientierungsreflex über Colliculus superior und Thalamus“ | korrekt | **teilweise.** Im Volltext [V] beschreiben die Autoren ein vorderes Aufmerksamkeitssystem mit dem **anterioren cingulären Kortex** (Zielentdeckung, Wortverarbeitung) und ein hinteres Orientierungssystem (**posteriorer Parietallappen, Pulvinar des Thalamus, Colliculus superior**) sowie ein Wachheitssystem. **Stroop-Daten und eine DLPFC-Rolle bei der Konfliktlösung stehen dort nicht.** Belege dafür: Pardo et al. (1990; PET, n = 8, stärkste Aktivierung im ACC) [A]; MacDonald et al. (2000; DLPFC bei Vorbereitung, ACC bei inkongruenten Reizen) [A]; Metaanalyse 47 Studien (Nee et al., 2007) [A] |
| Woods et al. (2015) – für Bildraten-Quantisierung 60/144/240 Hz und als Beleg der Punktetabelle „(Stroop, 1935; Woods et al., 2015)“ | korrekt | **teilweise** (Rechnung stimmt, 240 Hz = 4,2 statt 4,1 ms; nicht aus Woods) bzw. **nein** für die Punktetabelle (siehe A.0) |
| *nur im Text:* Stroop (1935), MacLeod (1991) – Stroop-Effekt „bei praktisch jedem gesunden Erwachsenen“, Lesen automatisiert | Stroop, J. R. (1935), *J. Exp. Psychol., 18*(6), 643–662, doi 10.1037/h0054651 ✔; MacLeod, C. M. (1991), *Psychol. Bull., 109*(2), 163–203, doi 10.1037/0033-2909.109.2.163 ✔ (beide nicht in der Quellenliste der Seite) | **ja** für „robuster Effekt, Lesen stark geübt“ (MacLeod: 18 verlässliche Befunde aus ~400 Studien [A]); **teilweise** für die Erklärung über „asymmetrische Verarbeitungsgeschwindigkeit“ (von MacLeod als unzureichend bewertet [A]) |
| *ohne Quelle:* „Inhibition verbraucht rasch Glukose im Präfrontalkortex; 3–5 min täglich erzielen den größten Effekt“ | – | **nicht belegt / widerlegt.** Das Glukose-Modell der Selbstkontrolle hat laut p-Kurven-Analyse nur schwache Beweiskraft (Vadillo et al., 2016) [A]; die präregistrierte Vielfach-Replikation des „Ego-Depletion“-Effekts fand d = 0,04 (95 %-KI −0,07 bis 0,15; 23 Labore, N = 2.141; Hagger et al., 2016) [A]. Zur Dosis: > 3 Einheiten/Woche nicht wirksamer, < 30 min nur schwach belegt (Lampit et al., 2014) [D04] |
| *ohne Quelle:* Tipp „nicht das ganze Wort, sondern Kanten eines Buchstabens fixieren“ | – | **teilweise plausibel:** Die Stroop-Interferenz ist am stärksten, wenn die Wortmitte fixiert wird, schwächer bei Fixation äußerer Buchstaben (Perret & Ducrot, 2010, berichtet in Rayner et al., 2016 [V]). Das ist aber eine Umgehungsstrategie, die die Übungsanforderung senkt |
| *ohne Quelle:* „Training senkt den neuronalen Energieaufwand gegen Großraumbüro-Ablenkung“, „Achtsamkeit erhöht graue Substanz im PFC“ | – | **nicht belegt.** Stroop-Übung bei 60–84-Jährigen verringerte die Interferenz, aber **ohne Transfer** auf andere Aufgaben (Wilkinson & Yang, 2012) [D04]. Achtsamkeitsaussage nicht geprüft |

### A.2 – 202 Wahlreaktionszeit-Test

| Angabe der Website | DOI-Prüfung | Stützt Aussage? + Begründung |
|---|---|---|
| Donders, F. C. (trans. Koster, W. G.) (1969). On the speed of mental processes. *Acta Psychologica, 30*, 412–431 (Original 1868). doi 10.1016/0001-6918(69)90065-1 – für „SRT ~200 ms, CRT ~280–350 ms (Donders 1868)“ | korrekt (Crossref nennt nur Donders als Autor; Übersetzung durch Koster ist inhaltlich richtig) | **nein.** Donders nutzte **Silben nachsprechen** (a-, b-, c-Methode), nicht visuelle Reize; Befundmuster a < c < b (Roelofs, 2018 [A]). Als Dauer von Unterscheidung und Wahl schätzte er ~36 bzw. ~47 ms (Roelofs, 2018, laut Suchmaschinen-Auszug der Einleitung [S]). Die absoluten Zahlen der Website stammen **nicht** von Donders |
| Hick, W. E. (1952). On the rate of gain of information. *QJEP, 4*(1), 11–26. doi 10.1080/17470215208416600 | korrekt | **ja** – Wahlreaktionszeit steigt mit dem Logarithmus der Alternativenzahl; Einschränkungen durch Reiz-Reaktions-Kompatibilität, Übung, sehr große Mengen und Reihenfolgeeffekte (Proctor & Schneider, 2018 [A]). **Aber:** Die Übung hat nur **2 Alternativen** (rot/blau), das Gesetz kann sich kaum entfalten |
| Hyman, R. (1953). Stimulus information as a determinant of reaction time. *JEP, 45*(3), 188–196. doi 10.1037/h0056940 | korrekt | **ja** (wie Hick; Informationsmenge in Bit) |
| Der, G., & Deary, I. J. (2006). Age and sex differences in reaction time in adulthood … *Psychology and Aging, 21*(1), 62–73. doi 10.1037/0882-7974.21.1.62 – für „Profispieler und Spitzenathleten 180–230 ms“ und (implizit) „ab Mitte 20 langsamer“ | korrekt (Website schreibt „survey“ klein, unerheblich) | **nein** für Profis/Athleten: repräsentative Bevölkerungsstichprobe (n = 7.130), keine Sportler [A]. **Teilweise** für das Alter: einfache RT kaum langsamer bis ~50, **Wahl-RT über das ganze Erwachsenenalter langsamer** [A]; in einem Echtzeit-Strategiespiel begann die Verlangsamung mit 24 Jahren (n = 3.305; Thompson et al., 2014 [A]). „Durch Training lange stabilisierbar“: keine Quelle |
| Woods et al. (2015) – „144-Hz-Monitor und 1.000-Hz-Sensor minimieren Gerätelatenzen“ | korrekt | **nein** (siehe A.0). Auf Tablets dominiert die Touch-Verzögerung (Web-App: iPhone ≈ 58 ms, Galaxy ≈ 66–70 ms zu lang gemessen; Pronk et al., 2020 [D01]) |
| *ohne Quelle:* „Durchschnitt 280–350 ms“, „Training beschleunigt die neuronale Signalübertragung“, „10–15 min vor Spitzenanforderungen reichen“ | – | **nicht belegt.** Wahl-RT hängt stark von Aufgabe, Alternativenzahl, Kompatibilität und Gerät ab. Übung senkt v. a. die Steigung pro Alternative (Proctor & Schneider, 2018 [D04]); eine Beschleunigung „neuronaler Signalübertragung“ ist nicht gezeigt |

### A.3 – 203 RSVP-Schnelllesetest

| Angabe der Website | DOI-Prüfung | Stützt Aussage? + Begründung |
|---|---|---|
| Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin, 124*(3), 372–422. doi 10.1037/0033-2909.124.3.372 – für „Optimal Recognition Point (ORP): Stelle, an der das Wort am schnellsten decodiert wird“ | korrekt | **teilweise.** In der Forschung heißt das **„optimal viewing position“ (OVP)** (O’Regan et al.; O’Regan & Jacobs, 1992 [M]); „ORP“ ist ein Begriff des Anbieters Spritz. Wörter werden auch außerhalb der OVP erkannt, nur mit leichtem Effizienzverlust (Rayner et al., 2016 [V]) |
| Rayner, K., Schotter, E. R., Masson, M. E. J., Potter, M. C., & Treiman, R. (2016). So much to read, so little time … *Psychological Science in the Public Interest, 17*(1), 4–34. doi 10.1177/1529100615623267 – für „Bis zu 80 % der Lesezeit gehen für Sakkaden und Regressionen verloren“ | korrekt | **nein – ausdrücklich widerlegt.** Rayner et al. zitieren genau diese Spritz-Behauptung (80 % Augenbewegung) und rechnen vor: Sakkaden 20–35 ms, Fixationen ~250 ms → Augen bewegen sich nur **≈ 10 %** der Lesezeit, und die Verarbeitung läuft währenddessen weiter [V]. Rücksprünge (10–15 % der Sakkaden) **stützen** das Verständnis (Schotter et al., 2014 [D04]) |
| *ohne eigene Quelle, Rayner 2016 widerspricht:* „Mit Training sind 400–600 WPM realistisch“ | – | **nein.** Nach einem Schnelllesekurs stieg das Tempo von ~280 auf ~400 Wörter/min, das Verständnis sank von 81 % auf 74 % (Calef et al., 1999, berichtet in Rayner et al., 2016 [V]); Verdoppeln bei gleichem Verständnis ist unwahrscheinlich [V] |
| *ohne Quelle:* „Erwachsene lesen 200–250 WPM“ | – | **ja:** Metaanalyse (190 Studien, 18.573 Personen): still, Englisch, 238 Wörter/min Sachtext, 260 Belletristik (Brysbaert, 2019 [A]); gute Leser 200–400 (Rayner et al., 2016 [V]) |
| *ohne Quelle:* „RSVP: Sakkaden entfallen vollständig“ | – | **teilweise.** Blicksprünge zwischen Wörtern entfallen; Fixationsbewegungen einschließlich Mikrosakkaden bleiben (Rolfs, 2009 [A]); fehlende Rücksprünge verschlechtern das Verständnis (Schotter et al., 2014; Benedetto et al., 2015 [D04]) |
| *ohne Quelle:* „RSVP trainiert lexikalische Entschlüsselung im visuellen Wortformareal“ | – | **nein (als Trainingsaussage).** Das Areal gibt es (linker okzipitotemporaler Sulcus; Dehaene & Cohen, 2011 [A]), eine Trainingsstudie mit RSVP wird nicht genannt |
| Woods et al. (2015) – „144 Hz sichern präzise Frame-Intervalle ohne Bildflackern“ | korrekt | **nein** (siehe A.0) |

### A.4 – 204 Schulte-Tabelle / Konzentrationsgitter

| Angabe der Website | DOI-Prüfung | Stützt Aussage? + Begründung |
|---|---|---|
| „Lu, Y., Wang, X., He, J., & Zhang, Y. (2022). Attention mechanisms underlying dual-color digital visual search based on Schulte grid: An event-related potential study. *Brain and Behavior, 12*(2), e2471.“ doi 10.1002/brb3.2471 – für (a) „psychodiagnostisches Verfahren zur Vergrößerung des peripheren Gesichtsfeldes und Reduktion der Fixationslatenz“, (b) „sequenzielle Suche beansprucht mehr Ressourcen, Farbdistraktoren verzögern EEG-Latenzen“ | DOI führt zum richtigen Artikel, **Autor:innen falsch**: richtig Lu, **A.**, Wang, **D.**, He, **S.**, Zhongcheng, Q., Zhang, **W.**, & **Li, Z.** (6 Personen) | **(a) nein:** ERP-Studie mit 27 Schulkindern (8–11 J.), **kein Training, keine Gesichtsfeldmessung** [A]. **(b) teilweise/verdreht:** Die Reihenfolge-Suche dauerte länger als die Ortssuche, zweifarbig länger als einfarbig; **EEG-Unterschiede nur bei der Ortssuche** (P2–P4, T7, T8), **nicht** bei der Reihenfolge-Suche [A] |
| Treisman, A. M., & Gelade, G. (1980). A feature-integration theory of attention. *Cognitive Psychology, 12*(1), 97–136. doi 10.1016/0010-0285(80)90005-5 – für „schult Sakkaden und fokussierte Aufmerksamkeit“ | korrekt | **teilweise.** Die Theorie erklärt, warum Suche nach Merkmalsverbindungen seriell verläuft [M]; über Training oder Sakkaden sagt sie nichts |
| Rayner (1998) – für „parafoveales Vorab-Caching“ und „Schulte vergrößert die perzeptuelle Blickspanne“ | korrekt | **teilweise** (Vorschau-Nutzen gibt es beim Lesen; Rayner et al., 2016 [V]) / **nein** für die Blickspanne: Die Wahrnehmungsspanne beim Lesen (3–4 Buchstaben links, 14–15 rechts) ist **sprachlich**, nicht durch Sehschärfe begrenzt; Vergrößern der Randbuchstaben vergrößerte sie nicht; Trainings, Wörter am Rand zu erkennen, führten nicht zu schnellerem Lesen mit Verständnis (Brim, 1968; Sailor & Ball, 1975; beide berichtet in Rayner et al., 2016 [V]) |
| Rayner et al. (2016) | korrekt | **nein** – die Übersicht widerspricht der Schnelllese-Aussage der Seite (siehe oben) |
| Wolfe, J. M. (2007). Guided Search 4.0. In *Integrated Models of Cognitive Systems* (S. 99–119). doi 10.1093/acprof:oso/9780195189193.003.0008 – für „visuelles Crowding (Wolfe, 2007)“ | korrekt (Buchkapitel, Oxford University Press) | **nein.** Guided Search ist ein Suchmodell; Crowding (Nachbarn stören die Erkennung, kritischer Abstand ≈ halbe Exzentrizität) belegen Bouma (1970), Pelli & Tillman (2008) [A] und Whitney & Levi (2011) [D03] |
| Woods et al. (2015) – 16,7 ms pro Frame bei 60 Hz | korrekt | **teilweise** (Rechnung richtig; nicht Thema von Woods) |
| *nur im Text:* „1962 von dem deutschen Psychiater Walter Schulte an der Universität Tübingen entwickelt“ | keine Quelle angegeben | **nicht prüfbar.** Walter Schulte (1910–1972) war 1960–1972 Direktor der Universitätsnervenklinik Tübingen (LEO-BW, Landesbibliographie Baden-Württemberg); eine Originalveröffentlichung der Tabelle von 1962 wurde nicht gefunden. In PubMed erscheint die Tabelle fast nur als Messinstrument in russischsprachigen Studien [D04] |
| *nur im Text:* „Konzentrationsgitter (Harris & Harris, 1984)“ | Buch, keine DOI: *The athlete’s guide to sports psychology: Mental skills for physical people*, Leisure Press, ISBN 0-88011-206-9 (OpenLibrary nennt Dorothy V. Harris als Autorin, Erscheinungsjahr 1984) | **Existenz bestätigt, Inhalt nicht geprüft**; Buch ist kein Wirksamkeitsbeleg |
| *ohne Quelle:* „5×5 unter 30 s überdurchschnittlich, Elite 20–25 s“; Stufentabelle „< 300 ms/Ziffer“ „basiert auf empirischen Forschungsarbeiten (Lu; Treisman; Rayner; Wolfe)“ | – | **nein** – keine der Quellen enthält Schulte-Normen oder Suchzeiten pro Ziffer |

### A.5 – 205 Geteilte Aufmerksamkeit

| Angabe der Website | DOI-Prüfung | Stützt Aussage? + Begründung |
|---|---|---|
| Pashler, H. (1994). Dual-task interference in simple tasks: Data and theory. *Psychological Bulletin, 116*(2), 220–244. doi 10.1037/0033-2909.116.2.220 – psychologische Refraktärperiode, zentraler Engpass | korrekt | **ja** – hartnäckiger Engpass bei der Handlungsauswahl (und wohl beim Gedächtnisabruf) [A] |
| Wickens, C. D. (2002). Multiple resources and performance prediction. *Theoretical Issues in Ergonomics Science, 3*(2), 159–177. doi 10.1080/14639220210123806 – Aufgaben stören sich weniger, wenn sie verschiedene Kanäle/Codes nutzen | korrekt | **ja** – vier Dimensionen: Verarbeitungsstufe, Sinneskanal (auditiv/visuell), Code (räumlich/sprachlich), fokales vs. ambientes Sehen [A]. **Anmerkung:** Beide Teilaufgaben der Übung sind visuell → nach diesem Modell gerade *mehr* Interferenz |
| Strayer, D. L., & Johnston, W. A. (2001). Driven to distraction … *Psychological Science, 12*(6), 462–466. doi 10.1111/1467-9280.00386 | korrekt | **ja** als Grundlagenbeleg: Telefonieren (Hand- oder Freisprech) **verdoppelte übersehene Signale** im Simulator, Radio/Hörbuch nicht [A]. **Kein** Beleg, dass die Übung das Fahren verbessert |
| Spelke, E., Hirst, W., & Neisser, U. (1976). Skills of divided attention. *Cognition, 4*(3), 215–230. doi 10.1016/0010-0277(76)90018-4 – „bewiesen, dass Training Teile der Verarbeitung automatisiert und den Flaschenhals entlastet“ | korrekt | **teilweise.** **2 Personen**, 17 Wochen (1 h/Tag, 5 Tage/Woche), Geschichten lesen und gleichzeitig diktierte Wörter schreiben [S: LibreTexts-Lehrbuch; bestätigt durch Hirst et al., 1980, Abstract [A]]. Die Autor:innen deuteten das als „Aufmerksamkeit ist eine Fertigkeit“; **Automatisierung** war gerade die Gegenhypothese, die Hirst et al. (1980) prüften und nicht bestätigten [A]. „Bewiesen“ ist überzogen |
| Woods et al. (2015) – „144 Hz stellt Bewegungskonturen präziser dar“ | korrekt | **nein** (siehe A.0); zudem bewegt sich das Ziel in der Original-Übung laut Code-Analyse gar nicht (`docs/skilldrills-kognition-analyse.md`) |
| *ohne Quelle:* „Schlafmangel … führt zum völligen Übersehen peripherer Reize (Tunnelblick)“ | – | **teilweise.** Kurzzeitiger Schlafentzug wirkt am stärksten auf Aussetzer bei einfacher Aufmerksamkeit (g = −0,78), kaum auf Schlussfolgern (g = −0,13, n. s.; 70 Artikel, 147 Tests; Lim & Dinges, 2010 [A]). „Tunnelblick“ wurde dort nicht untersucht |

### A.6 – 206 Multitasking-Test

| Angabe der Website | DOI-Prüfung | Stützt Aussage? + Begründung |
|---|---|---|
| Rogers, R. D., & Monsell, S. (1995). Costs of a predictable switch between simple cognitive tasks. *JEP: General, 124*(2), 207–231. doi 10.1037/0096-3445.124.2.207 – „Aufgabenwechselkosten“ | korrekt (Crossref-Titel mit Tippfehler „predictible“ im Register) | **ja** – Wechselkosten sinken mit Vorbereitungszeit bis ~0,6 s, bleiben auch bei 1,2 s groß, aber nur im ersten Durchgang der neuen Aufgabe [A] |
| Monsell, S. (2003). Task switching. *Trends in Cognitive Sciences, 7*(3), 134–140. doi 10.1016/S1364-6613(03)00028-7 | korrekt | **ja** – Wechselkosten durch Vorbereitung verringert, nicht beseitigt [A] |
| Pashler (1994) – „bei anspruchsvollen Entscheidungen serielles Time-Sharing statt paralleler Verarbeitung“ | korrekt | **teilweise** – der Engpass betrifft die Handlungsauswahl; Wahrnehmung und andere Stufen können parallel laufen [A] |
| Wickens (2002) | korrekt | **–** (kein konkreter Bezug im Text) |
| Ophir, E., Nass, C., & Wagner, A. D. (2009). Cognitive control in media multitaskers. *PNAS, 106*(37), 15583–15587. doi 10.1073/pnas.0903620106 – „Gewohnheitsmäßige Multitasker lassen sich leichter ablenken“ | korrekt | **teilweise.** Im Original ja [A]. Replikation: 2 Studien mit 14 Tests, nur 5 signifikant (2 bayesianisch robust); Metaanalyse über 39 Effekte nach Korrektur für kleine Studien **nicht signifikant** (Wiradhany & Nieuwenstein, 2017 [A]); Übersicht: gemischte Befunde, Kausalrichtung offen (Uncapher & Wagner, 2018 [A]) |
| Woods et al. (2015) – „Displays mit 144 Hz+ verringern Schlierenbildung drastisch“ | korrekt | **nein** (siehe A.0). Physikalisch wächst der Bildsprung bewegter Objekte mit 1/Bildrate [H; D02] |
| *ohne Quelle:* „bilaterale Hemisphären-Koordination, Parietallappen und Corpus callosum synchronisieren beide Gesichtsfeldhälften“ | – | **nicht belegt.** Verwandter echter Befund: Beim Verfolgen bewegter Objekte (bis zu 4) sind die Kapazitäten der linken und rechten Gesichtsfeldhälfte **unabhängig** – verteilt auf beide Hälften lassen sich doppelt so viele verfolgen (Alvarez & Cavanagh, 2005 [A]). Ein Trainingseffekt auf „Hemisphären-Koordination“ folgt daraus nicht |

### A.7 – 207 Zahlen-Symbol-Test (SDMT)

| Angabe der Website | DOI-Prüfung | Stützt Aussage? + Begründung |
|---|---|---|
| Smith, A. (1973). *Symbol Digit Modalities Test (SDMT) manual*. Western Psychological Services (Testmanual, keine DOI) | **Buch/Testmanual, keine DOI.** Existenz bestätigt: SDMT bei WPS verlegt (Copyright 1973, 1976, 1982; meist zitiert als Smith, 1982, revidiertes Manual) [S: Suchergebnis zur WPS-Verlagsseite; Zitat in Sheridan et al., 2006] | **teilweise.** „Maß für Verarbeitungstempo, 90 s“ ✔ (Sheridan et al., 2006 [A]; Benedict et al., 2017 [D04]). Norm „20–34 Jahre: 65–75 richtige in 90 s“ **nicht prüfbar**; laut Sheridan et al. (2006) enthielt das Manual Normen v. a. für klinische Gruppen [A]. Aktuelle Normen zeigen Effekte von Alter, Geschlecht und Bildung (Kiely et al., 2014, n = 14.456 [A]; Strober et al., 2020, mündlich, n = 675: Frauen im Mittel 5,1 Punkte mehr, Abnahme ab dem dritten Lebensjahrzehnt [A]) |
| Der & Deary (2006) – als Beleg für SDMT-Normen | korrekt | **nein** – Reaktionszeit-Studie, enthält keinen SDMT |
| Woods et al. (2015) | korrekt | **–** (kein konkreter Bezug) |
| *ohne Quelle:* „SDMT: Ziffern statt Symbole schreiben minimiert feinmotorische Einschränkungen“ | – | **ja/teilweise:** vertraute Aufgabe (Zahlen eintragen) und **mündliche Variante** verfügbar (Sheridan et al., 2006 [A]) |
| *ohne Quelle:* „Verarbeitungstempo nimmt nach dem frühen Erwachsenenalter **leicht** ab, lässt sich durch geistige und körperliche Aktivität lange erhalten“ | – | **teilweise.** Der Altersunterschied ist **groß**: d = −2,07, Alter erklärt 86 % der Varianz (141 Studien; Hoyer et al., 2004 [D04]). Aerobes Training: nur **kleine** Effekte auf Aufmerksamkeit/Tempo (g = 0,16; 29 RCTs; Smith et al., 2010 [A]); Computertraining Tempo g = 0,31 (Lampit et al., 2014 [D04]). „Lange erhalten“ ist nicht gezeigt |

### A.8 – 208 Konzentrationstest (Daueraufmerksamkeit/CPT)

| Angabe der Website | DOI-Prüfung | Stützt Aussage? + Begründung |
|---|---|---|
| Mackworth, N. H. (1948). The breakdown of vigilance during prolonged visual search. *QJEP, 1*(1), 6–21. doi 10.1080/17470214808416738 – „Leistung lässt nach 20–30 min drastisch nach“ | korrekt | **teilweise.** Uhrzeiger-Test über 2 h; der stärkste Rückgang lag in den ersten 30 min (etwa 10–15 % weniger entdeckte Signale laut Sekundärquellen [S, unsicher]). Das Dekrement kann aber schon **nach 5 min** auftreten, wenn Reize schwer erkennbar sind (Nuechterlein et al., 1983 [A]), und 12 min reichen für das typische Dekrement (Temple et al., 2000 [D04]). „Drastisch“ ist überzogen; eine 45-s-Runde misst kein Vigilanzdekrement |
| „Parasuraman, R. (1979). **Memory load and event rate in sustained attention.** *Science, 205*(4409), 924–927.“ doi 10.1126/science.472714 | DOI korrekt, **Titel verkürzt/falsch**: richtig „Memory load and event rate control sensitivity decrements in sustained attention“ | **ja** (kein konkreter Satz, stützt Grundlage): Empfindlichkeitsverlust nur, wenn die Zielunterscheidung das Gedächtnis belastet **und** Reize schnell folgen; sonst ändert sich eher das Antwortkriterium [A] |
| „Robertson, I. H., et al. (1997). ‘Oops!’: Performance correlates of everyday **cognitive slips on the Sustained Attention to Response Task (SART)**. *Neuropsychologia, 35*(6), 747–758.“ doi 10.1016/S0028-3932(97)00015-8 – „viele Fehlalarme = unzureichende inhibitorische Kontrolle und impulsive Muster“ | DOI korrekt, **Titel falsch**: richtig „… everyday attentional failures in traumatic brain injured and normal subjects“ | **teilweise.** Robertson et al. deuten SART-Fehlalarme als **Aussetzer der Daueraufmerksamkeit** („Drift“ in automatisches Antworten, angekündigt durch schneller werdende Reaktionen; 34 Patient:innen mit Schädel-Hirn-Trauma, 75 Kontrollen; Ziel 1 von 9) [A]. Die Deutung als Impulsivität/Hemmung stammt von späteren Kritikern (Helton, 2009; Carter et al., 2013 [D04]). Außerdem ist die Übung kein SART (Zielanteil laut Code 30–48 %) |
| Monsell (2003) – „Umschalten alle 10 s fordert Arbeitsgedächtnis und muss task-set inertia überwinden“ | korrekt | **teilweise** – Monsell nennt Nachwirkung von Aufgaben-Einstellungen („carry-over of task-set activation and inhibition“) [A]; zum Arbeitsgedächtnis keine Aussage |
| Broadbent, D. E. (1958). *Perception and communication*. Pergamon Press. doi 10.1037/10037-000 | korrekt (APA-PsycBooks-DOI, Buch) | **ja** – Filtertheorie der selektiven Aufmerksamkeit [M] |
| Woods et al. (2015) – „144-Hz-Displays eliminieren Frame-Jitter“ | korrekt | **nein** (siehe A.0) |
| *ohne Quelle:* „Ausdauertraining … erhöht die kognitive Belastbarkeit deutlich“; „Vigilanzdrills stärken frontale Netzwerke gegen Ermüdung“ | – | **teilweise/nein:** aerobes Training nur kleine Effekte (g = 0,16; Smith et al., 2010 [A]); für Bildschirm-Vigilanztraining keine Belege (Evidenz „schwach“, [D04]) |

### A.9 – 901 Reihen-Rätsel

Eigene Blickfit-Übung ohne Vorlage auf skilldrills.online → **keine Website-Quellen**. Literatur siehe B.9.

### A.10 Zusammenfassung der Prüfung

- **Einzigartige Website-Quellen in den Quellenlisten:** 24 (23 mit DOI, 1 Testmanual ohne DOI); dazu
  4 nur im Fließtext genannte Werke (Stroop 1935, MacLeod 1991, Harris & Harris 1984, „Schulte 1962“).
- **Alle 23 DOIs lösen zum richtigen Werk auf.** **Bibliografische Fehler: 4** – Autor:innen von Lu et
  al. (2022) falsch; Titel von Robertson et al. (1997) falsch; Titel von Parasuraman (1979) verkürzt;
  im Stroop-Text Vorname „Nelson J. Cowan“ statt William B. Cowan. „Schulte 1962“ nicht prüfbar.
- **Inhaltliche Stützung** (37 Quellen-Nennungen auf 8 Seiten): **ja 9 · teilweise 13 · nein 13 ·
  ohne Bezug 2.** Die häufigste Fehlzuordnung: Woods et al. (2015) wird auf allen acht Seiten für
  Aussagen über 144-Hz-Monitore zitiert, die dort nicht vorkommen.

---

## B) Faktenliste „Aussage – Zahl – Quelle“

Kürzel in eckigen Klammern hinter der Nummer = betroffene Übungen. Vollständige Angaben in Teil D.

### B.1 Messtechnik, Gerät, Sehwinkel (alle Übungen)

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F01 [alle] | Kalibrierte einfache Reaktionszeit Erwachsener; Altersanstieg gering | 231 ms (213 ms ohne Hardware), +0,55 ms/Jahr, n = 1.469 | Woods et al., 2015 [V] |
| F02 [alle] | Reine Entdeckungszeit eines Lichtreizes, altersunabhängig | ≈ 131 ms | Woods et al., 2015 [A] |
| F03 [alle] | Hardware-Verzögerung im Woods-Labor (60-Hz-LCD + 1-kHz-Maus) | 11,0 + 6,8 = 17,8 ms | Woods et al., 2015 [V] |
| F04 [alle] | Web-Apps messen Reaktionszeiten auf Touchgeräten immer zu lang; absolute Werte zwischen Geräten wenig vergleichbar, Differenzen innerhalb einer Person robust | iPhone ≈ 58 ms, Galaxy ≈ 66–70 ms zu lang | Pronk et al., 2020 [A; Zahlen D01] |
| F05 [alle] | Dauer eines Bildes bei gängigen Bildraten | 60 Hz 16,7 ms · 120 Hz 8,3 ms · 144 Hz 6,9 ms · 240 Hz 4,2 ms | [H] |
| F06 [alle] | Sehwinkel auf dem Tablet: bei 40 cm ≈ 36 CSS-px pro Grad (iPad-typisch 0,19 mm/px); 1° ≈ 7 mm | 36 px/°, 7 mm/° | [D03, H] |
| F07 [alle] | Reale Sehabstände: Smartphone beim Textlesen bzw. Surfen näher als die klassischen 40 cm | 36,2 cm bzw. 32,2 cm (Spanne 17,5–60 cm) | Bababekova et al., 2011 [A] |
| F08 [alle] | Presbyope halten das Smartphone weiter weg als Nicht-Presbyope | 39,7 ± 6,3 cm vs. 33,4 ± 7,6 cm (N = 217) | Boccardo et al., 2023 [D02] |
| F09 [alle] | Mindestgröße von Touch-Zielen (Barrierefreiheit) | 24 × 24 CSS-px (AA), 44 × 44 CSS-px (AAA) ≈ 4,6 bzw. 8,4 mm auf dem iPad | W3C, 2024 (WCAG 2.2, 2.5.8/2.5.5) [V]; mm [H] |
| F10 [201, 202, 206, 208] | Differenzwerte (Stroop-, Wechselkosten) sind als Gruppeneffekt robust, als persönlicher Wert oft unzuverlässig | Test-Retest 0 bis 0,82 in 7 Aufgaben | Hedge et al., 2018 [D04] |

### B.2 Stroop, Interferenz, Hemmung (201; Blickfit Pfeil-Duell)

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F11 [201] | Stroop-Effekt ist einer der robustesten Befunde; ~400 Studien ergeben 18 verlässliche Befunde; Erklärungen „relative Verarbeitungsgeschwindigkeit“ und „Automatik des Lesens“ reichen nicht | ~400 Studien, 18 Befunde | MacLeod, 1991 [A] |
| F12 [201] | Automatisierung ist kontinuierlich und wächst mit Übung (PDP-Modell des Stroop-Effekts) | – | Cohen, Dunbar & McClelland, 1990 [A] |
| F13 [201] | Stärkste Hirnaktivierung bei inkongruent minus kongruent: anteriorer cingulärer Kortex (PET) | n = 8 | Pardo et al., 1990 [A] |
| F14 [201] | Doppelte Dissoziation: linker DLPFC (BA 9) bei Vorbereitung auf Farbbenennung (Kontrolle), ACC bei inkongruenten Reizen (Überwachung) | – | MacDonald et al., 2000 [A] |
| F15 [201, 208] | Metaanalyse der Interferenzaufgaben (Stroop, Flanker, Go/No-Go, Simon, Stop-Signal): ACC, DLPFC, unterer Frontalgyrus, posteriorer Parietalkortex, vordere Insel | 47 Bildgebungsstudien | Nee et al., 2007 [A] |
| F16 [201] | Hemmung (Reaktionshemmung + Interferenzkontrolle), Arbeitsgedächtnis und kognitive Flexibilität sind die drei Kern-Exekutivfunktionen | 3 Kernfunktionen | Diamond, 2013 [A] |
| F17 [201] | „Selbstkontrolle verbraucht Glukose“: geringe Beweiskraft; Ego-Depletion in präregistrierter Vielfach-Replikation praktisch null | d = 0,04 (KI −0,07 bis 0,15), 23 Labore, N = 2.141 | Vadillo et al., 2016 [A]; Hagger et al., 2016 [A] |
| F18 [201] | Stroop-Interferenz ist bei Fixation der Wortmitte am stärksten (optimale Betrachtungsposition) | – | Rayner et al., 2016, über Perret & Ducrot, 2010 [V] |
| F19 [201] | Mit Tastendruck ist die Stroop-Interferenz kleiner als mit Sprechen | – | Augustinova et al., 2019 [D04] |
| F20 [201] | Übung verkleinert die Stroop-Interferenz bei Älteren, aber **kein Transfer** auf andere Aufgaben; Rückmeldung ändert das nicht | n = 56, 60–84 J., 6 Sitzungen | Wilkinson & Yang, 2012 [D04] |
| F21 [201] | Räumlicher Stroop (Pfeilrichtung vs. Position): perifoveale Variante liefert die größten und zuverlässigsten Effekte | Effekt ≈ 130 ms; Split-Half 0,66–0,88 | Viviani et al., 2024b [A; Zahlen D04] |
| F22 [201, 202] | Rot-Grün-Farbsehschwäche in Europa | ≈ 8 % der Männer, ≈ 0,4 % der Frauen | Birch, 2012 [A] |
| F23 [201, 202] | Farbunterscheidung am besten um 30 Jahre, Abnahme ab ~60 beschleunigt, am stärksten auf der Blau-Gelb-(Tritan-)Achse | 10–88 J. | Paramei & Oakley, 2014 [A] |
| F24 [201] | Das „Pferderennen“-Modell von Logan & Cowan gehört zum Stop-Signal-Paradigma (Abbrechen einer geplanten Handlung) | – | Verbruggen & Logan, 2008 [A]; Logan & Cowan, 1984 [M] |

### B.3 Wahlreaktion (202; Blickfit Pfeil-Duell/Zeichen-Code)

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F25 [202, 207] | Wahl-RT steigt mit log₂ der Alternativenzahl (Hick-Hyman); abgeschwächt durch hohe Reiz-Reaktions-Kompatibilität, Übung, sehr große Mengen | – | Hick, 1952; Hyman, 1953 [M]; Proctor & Schneider, 2018 [A] |
| F26 [202] | Übung verkleinert die Steigung: Unterschied 8 vs. 2 Alternativen nach 5 × 1.000 Durchgängen | ~500 → gut 300 ms | Proctor & Schneider, 2018 [D04] |
| F27 [202] | Donders’ Originalaufgabe war Silben-Nachsprechen (einfach, Wahl, Go/No-Go), Muster a < c < b | – | Roelofs, 2018 [A] |
| F28 [202] | Einfache RT wird bis ~50 kaum langsamer; Wahl-RT über das ganze Erwachsenenalter | n = 7.130 | Der & Deary, 2006 [A] |
| F29 [202] | In einem komplexen Echtzeitspiel beginnt die Verlangsamung selbstgesteuerter Reaktionen mit 24 Jahren; Expertise gleicht sie nicht aus | n = 3.305, 16–44 J. | Thompson et al., 2014 [A] |
| F30 [202, 204] | Blicksprung-Reaktionszeit am schnellsten mit 20–30 Jahren, bei 60–79-Jährigen langsamer und Sakkaden länger | n = 168, 5–79 J. | Munoz et al., 1998 [A] |

### B.4 Lesen, RSVP, Augenbewegungen (203; teils 204)

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F31 [203] | Mittlere stille Lesegeschwindigkeit Erwachsener (Englisch); laut: 183 | 238 Wörter/min Sachtext, 260 Belletristik; meist 175–300 | Brysbaert, 2019 [A] |
| F32 [203] | Fixation ~250 ms, Sakkade 20–35 ms über ~7 Buchstaben → Augenbewegung nur ≈ 10 % der Lesezeit | ≈ 10 % | Rayner et al., 2016 [V] |
| F33 [203] | Rücksprünge (Regressionen) bei geübten Lesern | 10–15 % der Sakkaden | Rayner et al., 2016 [V] |
| F34 [203, 204] | Wahrnehmungsspanne beim Lesen (Englisch), sprachlich statt durch Sehschärfe begrenzt | 3–4 Buchstaben links, 14–15 rechts | Rayner et al., 2016 [V]; McConkie & Rayner, 1975 [M] |
| F35 [203, 204] | Blicksprung-Latenz beim Lesen kürzer als in einfachen Blicksprung-Aufgaben | 150–200 ms (einfache Aufgaben 100–1.000 ms) | Rayner et al., 2016 [V] |
| F36 [203] | Schnelllesekurs: mehr Tempo, weniger Verständnis | 280 → 400 Wörter/min; Verständnis 81 → 74 % | Calef et al., 1999, in Rayner et al., 2016 [V] |
| F37 [203] | Innere Stimme (Subvokalisation) unterstützt das Verständnis; Unterdrücken verschlechtert es bei schwierigen Texten; auch bei RSVP mit 720 Wörtern/min entstehen Lautvorstellungen | 720 Wörter/min | Rayner et al., 2016 [V] |
| F38 [203] | Spritz (RSVP) vs. normales Lesen: wörtliches Verständnis und Lidschlag geringer | 60 vs. 72 %; 4,7 vs. 8,5 Lidschläge/min | Benedetto et al., 2015 [D04] |
| F39 [203] | Bildschirmarbeit senkt die Lidschlagrate | im Mittel 5-fach niedriger | Patel et al., 1991 [A] |
| F40 [203, alle] | Digitale Augenbelastung („digital eye strain“) bei Bildschirmnutzern häufig; Maßnahmen u. a. Korrektur von Fehlsichtigkeit/Presbyopie, trockenes Auge behandeln, Pausen | Prävalenz ≥ 50 % | Sheppard & Wolffsohn, 2018 [A] |
| F41 [203] | Reines Entziffern geht mit RSVP sehr schnell (lautes Lesen), minimale Anzeigedauer pro Wort | ~1.171 vs. ~303 Wörter/min; ~69 ms/Wort | Rubin & Turano, 1992 [D04] |
| F42 [203] | Anzeigedauer bei den Tempostufen der Übung | 250 WPM = 240 ms/Wort (4,2 Wörter/s) · 850 WPM = 70,6 ms (14,2/s; bei 60 Hz nur 4 oder 5 Bilder = 67 oder 83 ms) | [H] |
| F43 [203] | „Attentional Blink“: Ein zweites Ziel im schnellen Strom wird kurz nach dem ersten schlecht erkannt | Zeitfenster 180–450 ms nach dem ersten Ziel | Raymond et al., 1992 [A] |
| F44 [203] | Visuelles Wortformareal im linken okzipitotemporalen Sulcus; Läsion → reine Alexie | – | Dehaene & Cohen, 2011 [A] |
| F45 [203, 204] | Kritische Schriftgröße steigt mit dem Alter (MNREAD) | 0,08 logMAR (8–23 J.), 0,21 (68 J.), 0,34 (81 J.) | Calabrèse et al., 2016 [D04] |
| F46 [203] | Presbyopie weltweit 2015; davon mit unzureichender Nahkorrektur | 1,8 Mrd. (~25 %); 826 Mio. | Fricke et al., 2018 [D04] |

### B.5 Visuelle Suche, Schulte-Tabelle (204; Blickfit Zahlenjagd)

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F47 [204] | Schulte-Kinderstudie: Reihenfolge-Suche dauert länger als Ortssuche, zweifarbig länger als einfarbig; EEG-Unterschied nur bei der Ortssuche; kein Training | 27 Kinder, 8–11 J. | Lu et al., 2022 [A] |
| F48 [204] | Fixationen und Sakkaden je Aufgabe (gleiche Personen): visuelle Suche kürzere Fixationen, größere Sakkaden als Lesen | Suche 210 ms / 5,7° · Lesen (Engl.) 254 ms / 2,4° · Szene 280 ms / 5,3° | Rayner et al., 2007 [V: PMC-Volltext, Ergebnisabschnitt] |
| F49 [204, 206] | Crowding: kritischer Abstand ≈ halbe Exzentrizität (Bouma-Gesetz); das „nicht gedrängte Fenster“ begrenzt Lese- und Suchtempo; unähnliche Nachbarn stören weniger | ≈ 0,5 × Exzentrizität | Pelli & Tillman, 2008 [A]; Bouma, 1970 [M; D03] |
| F50 [204] | Trainings, Wörter am Rand zu erkennen, führten nicht zu schnellerem Lesen mit Verständnis; Vergrößern der Randbuchstaben vergrößerte die Wahrnehmungsspanne nicht | – | Rayner et al., 2016 [V] |
| F51 [204] | Mikrosakkaden sind kleine Fixationsbewegungen (Fixationskontrolle, gegen Verblassen, Sehschärfe), nicht die Suchsprünge im Gitter | – | Rolfs, 2009 [A] |
| F52 [204] | Trail Making (verwandt mit Schulte) spiegelt vor allem Verarbeitungstempo und fluide Fähigkeiten | > 3.600 Erwachsene | Salthouse, 2011 [D04] |
| F53 [204] | Deutliche Übungseffekte bei wiederholtem Trail Making, auch mit Parallelformen | – | Buck et al., 2008 [D04] |
| F54 [204, 205, 206] | Gleitsicht-Neulinge nutzen mehr Kopfbewegungen beim Lesen und bei Blickwechseln | n = 10, Crossover | Hutchings et al., 2007 [A] |
| F55 [204, 205, 206, 207] | Gleitsichtgläser unterscheiden sich stark in Breite von Fern-, Zwischen- und Nahzone und im unerwünschten Astigmatismus | Unterschiede > 2 : 1 zwischen 28 Designs | Sheedy, 2004 [A] |

### B.6 Geteilte Aufmerksamkeit, Doppelaufgaben (205; Blickfit Doppelt gefordert)

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F56 [205, 206] | Psychologische Refraktärperiode: Engpass bei der Handlungsauswahl | – | Pashler, 1994 [A] |
| F57 [205] | Mehrfach-Ressourcen: weniger Interferenz bei verschiedenen Stufen, Sinneskanälen, Codes, fokalem/ambientem Sehen | 4 Dimensionen | Wickens, 2002 [A] |
| F58 [205] | Telefonieren am Steuer (Hand/Freisprech) verdoppelt übersehene Signale; Radio/Hörbuch nicht | 2-fach | Strayer & Johnston, 2001 [A] |
| F59 [205] | Metaanalyse Telefon und Fahren: Reaktionszeit verlängert, Hand und Freisprech gleich | +0,25 s; 33 Studien, ~2.000 Personen | Caird et al., 2008 [A] |
| F60 [205] | Nur wenige zeigen keine Doppelaufgaben-Kosten („Supertasker“) | 2,5 % von 200 | Watson & Strayer, 2010 [A] |
| F61 [205] | Doppelaufgaben-Kosten bei Älteren größer als durch Verlangsamung erklärbar | 33 Studien | Verhaeghen et al., 2003 [D04] |
| F62 [205] | Adaptives Fahr-+-Schilder-Spiel bei 60–85-Jährigen senkte Kosten, blieb nach 6 Monaten; kleine Gruppen | −64 % → −16 % (6 Mon.: −22 %); 16/15/15 Personen | Anguera et al., 2013 [D04] |
| F63 [205] | Doppelaufgaben-Training mit neuen Kombinationen: Übertragung auf neue Aufgaben, auch im Alter | – | Bherer et al., 2005 [D04]; Kramer et al., 1995 [D04] |
| F64 [205, 208] | Kurzzeitiger Schlafentzug: größter Effekt auf Aussetzer einfacher Aufmerksamkeit, kaum auf Schlussfolgern | g = −0,78 vs. −0,13 (n. s.); 70 Artikel, 147 Tests | Lim & Dinges, 2010 [A] |

### B.7 Aufgabenwechsel, Multitasking (206; Blickfit Weichensteller)

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F65 [206] | Vorhersehbarer Wechsel: Kosten sinken mit Vorbereitung bis ~0,6 s; Restkosten auch bei 1,2 s, nur im 1. Durchgang | 0,6 s / 1,2 s | Rogers & Monsell, 1995 [A] |
| F66 [206, 208] | Wechselkosten durch Vorbereitung verringert, nicht beseitigt; Nachwirkung der Aufgaben-Einstellung | – | Monsell, 2003 [A]; Kiesel et al., 2010 [D04] |
| F67 [206] | Mit dem Alter steigen vor allem die Mischkosten, kaum die lokalen Wechselkosten | n = 118 (20–80 J.); 26 Artikel | Kray & Lindenberger, 2000 [D04]; Wasylyshyn et al., 2011 [D04] |
| F68 [206] | Wechseltraining: Plateau nach wenigen Sitzungen, naher Transfer ja, ferner nein | Plateau nach 4–6 Sitzungen | Zhao et al., 2020 [D04] |
| F69 [206] | „Media Multitasker leichter ablenkbar“ nicht robust repliziert | 5 von 14 Tests signifikant; Metaanalyse 39 Effekte n. s. nach Korrektur | Wiradhany & Nieuwenstein, 2017 [A] |
| F70 [206] | Aufmerksames Verfolgen: bis 4 Objekte; linke und rechte Gesichtsfeldhälfte mit unabhängiger Kapazität | 2-mal so viele Ziele, wenn auf beide Hälften verteilt | Alvarez & Cavanagh, 2005 [A] |

### B.8 Verarbeitungstempo, Symbol-Zahl (207; Blickfit Zeichen-Code)

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F71 [207] | Starker Alterseffekt im Symbol-Zahl-Test | d = −2,07; 86 % Varianz; 141 Studien | Hoyer et al., 2004 [D04] |
| F72 [207] | SDMT-Normen hängen von Alter, Geschlecht, Bildung ab (repräsentative Stichprobe, schriftlich) | n = 14.456, 15–100 J. | Kiely et al., 2014 [A] |
| F73 [207] | Mündlicher SDMT: Abnahme ab dem 3. Lebensjahrzehnt; Frauen im Mittel besser | +5,1 Punkte; n = 675 | Strober et al., 2020 [A] |
| F74 [207] | Bedeutsame Veränderung im SDMT (MS-Forschung) | ~4 Punkte bzw. 10 % | Benedict et al., 2017 [D04] |
| F75 [207] | Smartphone-SDMT mit neu gemischtem Schlüssel: Plateau bei wöchentlichem Üben | nach ~8 Sitzungen; 75 s Dauer | Pham et al., 2021 [D04] |
| F76 [207] | Smartphone-Variante korreliert hoch mit Papier, liegt aber darunter | ICC 0,84; −12 % | van Oirschot et al., 2020 [D04] |
| F77 [207, 208] | Aerobes Training: kleine Effekte auf Aufmerksamkeit/Tempo, Exekutivfunktionen, Gedächtnis | g = 0,16 / 0,12 / 0,13; 29 RCTs, 2.049 Personen | Smith et al., 2010 [A] |
| F78 [207, alle] | Computertraining bei gesunden Älteren: Tempo profitiert, Aufmerksamkeit/Exekutivfunktionen nicht signifikant | g = 0,22 gesamt, Tempo 0,31; 52 RCTs | Lampit et al., 2014 [D04] |

### B.9 Daueraufmerksamkeit (208; Blickfit Wachposten)

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F79 [208] | Bei stark verrauschten Reizen sinkt die Empfindlichkeit schon nach kurzer Zeit | nach 5 min | Nuechterlein et al., 1983 [A] |
| F80 [208] | Vigilanzdekrement nur als Empfindlichkeitsverlust, wenn Gedächtnislast und hohe Ereignisrate zusammenkommen | – | Parasuraman, 1979 [A] |
| F81 [208] | Vigilanz ist anstrengende geistige Arbeit und belastend | – | Warm et al., 2008 [A] |
| F82 [208] | Kurze Vigilanzaufgabe erzeugt bereits das typische Dekrement, hohe Beanspruchung und Stress | 12 min | Temple et al., 2000 [D04] |
| F83 [208] | SART: Ziel 1 von 9, Fehlalarme nach schneller werdenden Reaktionen („Drift“) | 34 Patient:innen (SHT), 75 Kontrollen; r = −0,58 mit Glasgow-Koma-Skala | Robertson et al., 1997 [A] |
| F84 [208] | SART-Format misst eher Impulsivität/Hemmung als Daueraufmerksamkeit | – | Helton, 2009 [D04] |
| F85 [208] | Daueraufmerksamkeit über die Lebensspanne (gradCPT online): Fähigkeit am höchsten um 43 Jahre, Strategie wird mit dem Alter vorsichtiger | n = 10.430, 10–70 J. | Fortenbaugh et al., 2015 [D04] |
| F86 [208] | Belohnung erst am Ende konnte das Dekrement in einem 10-min-Durchgang aufheben; „Netzwerk der wachen Aufmerksamkeit“ überwiegend rechtshemisphärisch-frontoparietal | 67 fMRT-Studien (Metaanalyse, zitiert) | Fortenbaugh et al., 2017 [V: PMC-Volltext] |

### B.10 Schlussfolgern / Reihen (901)

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F87 [901] | ACTIVE-RCT: Reasoning-Training = „Probleme, die einem seriellen Muster folgen“; 10 Gruppensitzungen; zuverlässige Verbesserung der trainierten Fähigkeit; mit Auffrischung mehr | n = 2.832 (65–94 J.); 74 % verbessert; mit/ohne Auffrischung 72 % / 49 %; nach 2 J. kein Alltagseffekt | Ball et al., 2002 [A] |
| F88 [901] | Nach 5 Jahren nur Reasoning-Gruppe mit signifikant weniger Alltagsschwierigkeiten (Selbstbericht) | d = 0,29 | Willis et al., 2006 [D04] |
| F89 [901] | Nach 10 Jahren Reasoning-Effekt auf die trainierte Fähigkeit erhalten; alle Gruppen weniger IADL-Schwierigkeiten (Selbstbericht) | Reasoning d = 0,23; IADL 0,38 | Rebok et al., 2014 [A] |
| F90 [901] | Training induktiven Schließens bei Älteren wirkt auch bei zuvor gemessenem Abbau | Seattle Longitudinal Study | Willis & Schaie, 1986 [A] |
| F91 [901] | Training induktiven Schließens bei Kindern: Verbesserung fluider Intelligenz und schulischen Lernens | 74 Experimente, ~3.600 Kinder | Klauer & Phye, 2008 [A] |
| F92 [901] | Matrizen-Aufgaben: Unterschiede vor allem im Erschließen abstrakter Regeln und im Verwalten von Teilzielen im Arbeitsgedächtnis | – | Carpenter et al., 1990 [A] |
| F93 [901] | Manche Aspekte des kognitiven Abbaus beginnen schon mit 20–30 Jahren | – | Salthouse, 2009 [A] |
| F94 [901, alle] | Kognitives Training verbessert allgemeine geistige Fähigkeiten kaum; Unterschiede zwischen Studien durch Studienqualität erklärbar | – | Sala & Gobet, 2019 [A] |

### B.11 Sicherheit, Barrierefreiheit (übergreifend)

| # | Aussage | Zahl | Quelle |
|---|---|---|---|
| F95 [203, 208] | Lichtausgelöste Anfälle; am stärksten provozierend 15–25 Hz, Bereich 1–65 Hz; viele Betroffene wissen es nicht | ~1 : 4.000 (5–24 J.), ~1 : 10.000 gesamt | Fisher et al., 2005 [D03] |
| F96 [203, 208] | Blitz potenziell gefährlich ab ≥ 20 cd/m², ≥ 3 Hz, ≥ 0,006 sr; 0,006 sr ≈ Kreis von 5° Durchmesser ≈ 3,5 cm bei 40 cm | – | Harding et al., 2005 [D03]; Umrechnung [H] |
| F97 [alle] | WCAG 2.2: nichts darf öfter als 3-mal pro Sekunde blitzen (oder unter Schwellen); Farbe nie als einziges Unterscheidungsmerkmal | 3/s | W3C, 2024 [V] |

---

## C) Evidenz-Zusammenfassung je Übung

Vorgeschlagene Werte für `evidenz.*` beziehen sich auf die **Aufgabenart** (wie im README definiert),
nicht auf die Original-Übung selbst – keine der Original-Übungen ist untersucht.

**201 Stroop („Distraction Fighter“) · Blickfit: Pfeil-Duell**
- Stroop-Effekt als Phänomen stark (F11); Interferenz wird mit Übung kleiner (Davidson et al., 2003
  [D04]; F20), **Transfer bei Älteren direkt getestet und nicht gefunden** (F20).
- Vorschlag: `uebungseffekt: mittel` · `naher_transfer: schwach` · `alltag_transfer: fehlend`.
- Original: nur inkongruente Durchgänge, keine RT → misst keine Interferenz; reine Farbunterscheidung
  (F22, F23), Farbwörter sind Sprache (DE/IT) und Tasten müssen gelesen werden. Vorsicht:
  `farbsehschwaeche`, `lese_rechtschreib_schwaeche`, `presbyopie_gleitsicht` (Wort + Tastenbeschriftung
  klein, Blickwechsel Mitte ↔ unten), `sprachabhaengigkeit` hoch.
- Pfeil-Duell: farb- und sprachfrei; räumlicher Stroop + Flanker (F21), 2 → 4 Alternativen (Hick, F25).
- Nicht übernehmen: Glukose-Aussage (F17), „Großraumbüro“-Transfer, Hirnregionen-Zuordnung zu
  Posner & Petersen (F13–F15 sind die korrekten Belege).

**202 Wahlreaktion · Blickfit: in Pfeil-Duell (Stufen 2 → 4 Richtungen) und Zeichen-Code aufgegangen**
- Hick-Hyman und Kompatibilität stark (F25); Übung verbessert die Aufgabe, dann Plateau (F26).
- Vorschlag: `uebungseffekt: stark` · `naher_transfer: schwach` · `alltag_transfer: fehlend`.
- Original: 2 farbige Kreise (nur Farbe), keine RT-Messung, Tippen auf den Reizort = hohe Kompatibilität
  → kaum Wahlanteil. Altersverlauf F28–F30; Gerät F01–F05. Vorsicht: `farbsehschwaeche` (nur Farbe),
  `tremor_parkinson`/`hand_arm_beschwerden` (Zielklick unter Zeitdruck).

**203 RSVP-Schnelllesen · Blickfit: bewusst nicht umgesetzt**
- „Schneller lesen ohne Verständnisverlust“ widerlegt (F32, F36; Benedetto et al., F38); die
  80-%-Sakkaden-Aussage der Website ist genau die Behauptung, die Rayner et al. (2016) zurückweisen.
- Vorschlag: `uebungseffekt: unklar` (Zielwort-Erkennen im Strom) · `naher_transfer: fehlend` ·
  `alltag_transfer: fehlend` (Lesen: Verständnis eher schlechter).
- Original: fester **englischer** Text (Sprachabhängigkeit, für DE/IT-Kundschaft ungeeignet),
  Antwortfenster laut Code-Analyse kürzer als eine Reaktionszeit (240 → 71 ms; vgl. F01–F02).
- Optik: kleiner Text + seltener Lidschlag (F38, F39) → `trockenes_auge_bildschirm`,
  `presbyopie_gleitsicht` (F45, F46), `lese_rechtschreib_schwaeche`. Wortwechsel mit 4–14 pro Sekunde
  (F42) liegen nahe am empfindlichen Frequenzbereich (F95); es sind aber keine Vollflächenblitze –
  Risiko gering, Hinweis `photosensitive_epilepsie` vorsichtshalber prüfen. Attentional Blink (F43)
  erklärt verpasste Zielwörter bei hohem Tempo.

**204 Schulte-Tabelle · Blickfit: Zahlenjagd**
- Misst Suche + Reihenfolge + Tempo (verwandt mit Trail Making, F52); starke Übungseffekte (F53);
  „trainiert peripheres Sehen / Blickspanne / Schnelllesen“: **keine Studie** (F47, F50).
- Vorschlag: `uebungseffekt: stark` · `naher_transfer: schwach` · `alltag_transfer: fehlend`.
- Okulomotorik: serielle Suche mit Sakkaden (F48: Suchfixationen ~210 ms, Sakkaden ~5,7°);
  Mikrosakkaden-Aussage falsch (F51); Crowding bei dichten Gittern (F49).
- Optiker: Das Gitter füllt den Bildschirm → Gleitsicht-Träger sehen seitlich und oben unscharf, weichen
  auf Kopfbewegungen aus (F54, F55); Arbeitsplatz-/Nahbrille passend zum Tablet-Abstand (F07, F08).
  Original bei 8 × 8 mit ~12-px-Ziffern (Code-Analyse) ≈ 0,33° bei 40 cm [H; F06] – für ältere Augen
  nahe der kritischen Schriftgröße (F45). Vorsicht: `presbyopie_gleitsicht`,
  `sehbehinderung_niedriger_visus`, `gesichtsfeldausfall`, bei Rotation ab 5 × 5 ggf. `nystagmus`.

**205 Geteilte Aufmerksamkeit · Blickfit: Doppelt gefordert**
- Doppelaufgaben-Kosten robust, im Alter größer (F56, F61); Training senkt Kosten im Labor (F62, F63);
  naher Transfer auf neue Aufgabenkombinationen (F63); Alltag (Fahren, Gehen) für Bildschirmübungen
  **nicht belegt**.
- Vorschlag: `uebungseffekt: mittel` (bis stark) · `naher_transfer: mittel` · `alltag_transfer: fehlend`.
- Original: beide Kanäle visuell (Wickens: mehr Interferenz, F57), keine Einzel-Basislinie → keine
  echten Kosten; versprochene Bewegung fehlt. Fahr-Bezug nur als Aufklärung (F58, F59), nie als
  Sicherheitsversprechen. Zwei Bildschirmbereiche → Blickwechsel; Gleitsicht (F54). Vorsicht:
  `aufmerksamkeitsprobleme`, `kognitive_einschraenkung`, `tremor_parkinson` (Blickfit: Kugel halten).

**206 Multitasking · Blickfit: Weichensteller (Aufgabenwechsel)**
- Wechsel- und Mischkosten robust, Mischkosten steigen mit dem Alter (F65–F67); Übung senkt Kosten mit
  Plateau, naher Transfer mittel, ferner schwach/umstritten (F68).
- Vorschlag: `uebungseffekt: stark` · `naher_transfer: mittel` · `alltag_transfer: fehlend` (bzw.
  schwach nur für „Einsicht“).
- Original ist eigentlich **Doppelstrom-Suche** mit unangekündigtem Vorlagenwechsel alle 20 s, kein
  klassischer Aufgabenwechsel. „Hemisphären-/Corpus-callosum-Training“ unbelegt; korrekt ist nur die
  Unabhängigkeit der Gesichtsfeldhälften beim Verfolgen (F70). Ophir-Befund nicht robust (F69).
  Bewegte Symbolströme: kleinflächig, `bewegungsreize_schwindel` eher gering; seitliche Ströme bei
  Gleitsicht (F54, F55).

**207 Symbol-Zahl (SDMT) · Blickfit: Zeichen-Code**
- Am besten validiertes Tempo-Maß (Benedict et al., 2017; Jaeger, 2018 [D04]); starker Alterseffekt
  (F71); Übungsplateau nach ~8 Sitzungen (F75); Transfer schwach/fehlend.
- Vorschlag: `uebungseffekt: stark` · `naher_transfer: schwach` · `alltag_transfer: fehlend`.
- Original: griechische Buchstaben, Legende und Tasten in gleicher Reihenfolge → rein räumlich lösbar
  (Code-Analyse); winzige Legende oben → Blickwechsel Legende ↔ Mitte ↔ Tasten, bei Gleitsicht Kopf
  heben (F54, F55). Normwerte der Website nicht prüfbar; nie als Norm/Diagnose verwenden (F72, F73).
  Vorsicht: `presbyopie_gleitsicht`, `sehbehinderung_niedriger_visus`, `kognitive_einschraenkung`.

**208 Konzentrationsausdauer (CPT) · Blickfit: Wachposten**
- Vigilanzdekrement real und anstrengend (F79–F82), aber erst über Minuten messbar; eine 45-s-Runde
  misst kein Dekrement. SART ≈ Hemmung (F84), Fehlalarm-Deutung der Website verschoben (F83).
- Vorschlag: `uebungseffekt: mittel` (Messaufgabe, Training kaum untersucht) · `naher_transfer:
  fehlend` · `alltag_transfer: fehlend`.
- Original: Regel „Vokale ↔ Primzahlen“ alle 10 s → eher Aufgabenwechsel + Rechenwissen (Primzahlen)
  als Vigilanz; Zielanteil 30–48 %; Anzeige 1.100 → 260 ms (Code-Analyse). Einzelne, kleine
  Zeichen in der Mitte: kein Vollbildblitz, aber schnelle Folge → F95–F97 beachten. Blickfit
  Wachposten: Ring mit Lücke (Landolt-ähnlich), ≥ 2° groß, Schwierigkeit über Drehwinkel der Lücke →
  Orientierungsunterscheidung, nicht Sehschärfe-Grenze [H]. Vorsicht: `aufmerksamkeitsprobleme`,
  `photosensitive_epilepsie` (nur Original, gering).

**901 Reihen-Rätsel (eigene Übung)**
- ACTIVE-Reasoning (serielle Muster) verbesserte die trainierte Fähigkeit dauerhaft (F87, F89);
  Alltag nur Selbstbericht (F88, F89); Kinder-Metaanalyse positiv (F91); allgemeine Intelligenz kaum
  (F94). **Unsere Version ist nicht untersucht**; ACTIVE war betreut, in Gruppen, mit Strategievermittlung.
- Vorschlag: `uebungseffekt: stark` (für die Aufgabenart) · `naher_transfer: mittel` ·
  `alltag_transfer: schwach`.
- Kein Zeitdruck, kaum visuelle Anforderungen; Formen nicht nur über Farbe (F97). Arbeitsgedächtnis
  und Regel-Erschließen sind die Kernprozesse (F92). Vorsicht: `kognitive_einschraenkung`
  (Frustration), Buchstabenreihen: `lese_rechtschreib_schwaeche` gering.

**Übergreifend (alle W02-Übungen)**
- Transfer ist in dieser Kategorie am schwächsten belegt (F78, F94; Nguyen et al., 2022; Simons et al.,
  2016 [D01/D04]). Seriös: „Man wird in der Übung besser“; nicht: „verbessert Konzentration im Alltag“,
  „hilft bei ADHS“ (verblindet kleine/keine Effekte; Cortese et al., 2015 [D04]), „beugt Demenz vor“.
- `stereosehen` = 0 für alle; `naharbeit_dauer` = 1 (45–120 s Bildschirm), 203 und 208 eher 1–2
  (kleiner Text bzw. Dauerfixation, Lidschlag F39).
- Farbsehschwäche: 201, 202 (nur Farbe) betroffen; 205/206 Original teils farbcodiertes Feedback.
- Zeitmessung im Browser: nur Vergleich mit sich selbst auf demselben Gerät (F04, F10).

---

## D) Literaturliste (nur geprüfte Einträge)

Prüfvermerk-Schema: **CR** = Crossref-Metadaten stimmen (Titel, Autor:innen, Jahr, Quelle, Band,
Seiten); **Inhalt** = [V]/[A]/[D0x]/[S]/[M] wie oben; PMID, wo vorhanden.

### D.1 Von der Website zitierte Werke (Korrekturen fett)

1. Broadbent, D. E. (1958). *Perception and communication*. Pergamon Press. https://doi.org/10.1037/10037-000 — CR ✔ (Buch, APA PsycBooks); Inhalt [M].
2. Der, G., & Deary, I. J. (2006). Age and sex differences in reaction time in adulthood: Results from the United Kingdom Health and Lifestyle Survey. *Psychology and Aging, 21*(1), 62–73. https://doi.org/10.1037/0882-7974.21.1.62 — CR ✔; Inhalt [A, OpenAlex].
3. Donders, F. C. (1969). On the speed of mental processes (W. G. Koster, Übers.). *Acta Psychologica, 30*, 412–431. https://doi.org/10.1016/0001-6918(69)90065-1 (Original 1868) — CR ✔ (Übersetzer nicht im Register); Inhalt über Roelofs (2018) [A].
4. Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology, 4*(1), 11–26. https://doi.org/10.1080/17470215208416600 — CR ✔; Inhalt [M] + Proctor & Schneider (2018) [A].
5. Hyman, R. (1953). Stimulus information as a determinant of reaction time. *Journal of Experimental Psychology, 45*(3), 188–196. https://doi.org/10.1037/h0056940 — CR ✔; Inhalt [M].
6. Logan, G. D., & Cowan, **W. B.** (1984). On the ability to inhibit thought and action: A theory of an act of control. *Psychological Review, 91*(3), 295–327. https://doi.org/10.1037/0033-295X.91.3.295 — CR ✔ (Website-Fließtext nennt fälschlich „Nelson J. Cowan“); Inhalt [M] + Verbruggen & Logan (2008) [A].
7. **Lu, A., Wang, D., He, S., Zhongcheng, Q., Zhang, W., & Li, Z.** (2022). Attention mechanisms underlying dual-color digital visual search based on Schulte grid: An event-related potential study. *Brain and Behavior, 12*(2), e2471. https://doi.org/10.1002/brb3.2471 — CR ✔ (Website-Autorenliste falsch); Inhalt [A, OpenAlex].
8. Mackworth, N. H. (1948). The breakdown of vigilance during prolonged visual search. *Quarterly Journal of Experimental Psychology, 1*(1), 6–21. https://doi.org/10.1080/17470214808416738 — CR ✔; Inhalt [M]; Zahlen nur [S].
9. MacLeod, C. M. (1991). Half a century of research on the Stroop effect: An integrative review. *Psychological Bulletin, 109*(2), 163–203. https://doi.org/10.1037/0033-2909.109.2.163 — CR ✔; Inhalt [A, OpenAlex]; PMID 2034749. (nur im Website-Text)
10. Monsell, S. (2003). Task switching. *Trends in Cognitive Sciences, 7*(3), 134–140. https://doi.org/10.1016/S1364-6613(03)00028-7 — CR ✔; Inhalt [A]; PMID 12639695.
11. Ophir, E., Nass, C., & Wagner, A. D. (2009). Cognitive control in media multitaskers. *Proceedings of the National Academy of Sciences, 106*(37), 15583–15587. https://doi.org/10.1073/pnas.0903620106 — CR ✔; Inhalt [A]; PMID 19706386.
12. Parasuraman, R. (1979). **Memory load and event rate control sensitivity decrements in sustained attention.** *Science, 205*(4409), 924–927. https://doi.org/10.1126/science.472714 — CR ✔ (Website-Titel verkürzt); Inhalt [A, OpenAlex].
13. Pashler, H. (1994). Dual-task interference in simple tasks: Data and theory. *Psychological Bulletin, 116*(2), 220–244. https://doi.org/10.1037/0033-2909.116.2.220 — CR ✔; Inhalt [A, OpenAlex].
14. Posner, M. I., & Petersen, S. E. (1990). The attention system of the human brain. *Annual Review of Neuroscience, 13*, 25–42. https://doi.org/10.1146/annurev.ne.13.030190.000325 — CR ✔; Inhalt [V, PDF-Kopie]; PMID 2183676.
15. Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin, 124*(3), 372–422. https://doi.org/10.1037/0033-2909.124.3.372 — CR ✔; Inhalt [M] + über Rayner et al. (2016) [V].
16. Rayner, K., Schotter, E. R., Masson, M. E. J., Potter, M. C., & Treiman, R. (2016). So much to read, so little time: How do we read, and can speed reading help? *Psychological Science in the Public Interest, 17*(1), 4–34. https://doi.org/10.1177/1529100615623267 — CR ✔; Inhalt [V, Autorenversion PDF, Universität South Florida].
17. **Robertson, I. H., Manly, T., Andrade, J., Baddeley, B. T., & Yiend, J. (1997). ‘Oops!’: Performance correlates of everyday attentional failures in traumatic brain injured and normal subjects.** *Neuropsychologia, 35*(6), 747–758. https://doi.org/10.1016/S0028-3932(97)00015-8 — CR ✔ (Website-Titel falsch); Inhalt [A]; PMID 9204482.
18. Rogers, R. D., & Monsell, S. (1995). Costs of a predictable switch between simple cognitive tasks. *Journal of Experimental Psychology: General, 124*(2), 207–231. https://doi.org/10.1037/0096-3445.124.2.207 — CR ✔; Inhalt [A, OpenAlex].
19. Smith, A. (1982). *Symbol Digit Modalities Test: Manual* (rev. Aufl.; Erstausgabe 1973). Western Psychological Services. — **Buch/Testmanual, keine DOI**; Existenz über Verlagsangaben und Zitate (Sheridan et al., 2006) [S]; Inhalt nicht eingesehen.
20. Spelke, E., Hirst, W., & Neisser, U. (1976). Skills of divided attention. *Cognition, 4*(3), 215–230. https://doi.org/10.1016/0010-0277(76)90018-4 — CR ✔; Inhalt über Hirst et al. (1980) [A] und LibreTexts [S].
21. Strayer, D. L., & Johnston, W. A. (2001). Driven to distraction: Dual-task studies of simulated driving and conversing on a cellular telephone. *Psychological Science, 12*(6), 462–466. https://doi.org/10.1111/1467-9280.00386 — CR ✔; Inhalt [A, OpenAlex].
22. Stroop, J. R. (1935). Studies of interference in serial verbal reactions. *Journal of Experimental Psychology, 18*(6), 643–662. https://doi.org/10.1037/h0054651 — CR ✔; Inhalt [M]. (nur im Website-Text)
23. Treisman, A. M., & Gelade, G. (1980). A feature-integration theory of attention. *Cognitive Psychology, 12*(1), 97–136. https://doi.org/10.1016/0010-0285(80)90005-5 — CR ✔; Inhalt [M].
24. Wickens, C. D. (2002). Multiple resources and performance prediction. *Theoretical Issues in Ergonomics Science, 3*(2), 159–177. https://doi.org/10.1080/14639220210123806 — CR ✔; Inhalt [A, OpenAlex].
25. Wolfe, J. M. (2007). Guided Search 4.0: Current progress with a model of visual search. In W. D. Gray (Hrsg.), *Integrated models of cognitive systems* (S. 99–119). Oxford University Press. https://doi.org/10.1093/acprof:oso/9780195189193.003.0008 — CR ✔ (Buchkapitel; Herausgeber Wayne D. Gray über die Buch-DOI 10.1093/acprof:oso/9780195189193.001.0001 bestätigt); Inhalt [M].
26. Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 — CR ✔; Inhalt [V, Frontiers-Volltext].
27. Harris, D. V., & Harris, B. L. (1984). *The athlete’s guide to sports psychology: Mental skills for physical people*. Leisure Press. ISBN 0-88011-206-9 — **Buch, keine DOI**; OpenLibrary bestätigt Titel, Verlag, Jahr, Erstautorin; Zweitautor und Inhalt nicht geprüft. (nur im Website-Text)

### D.2 Neu recherchierte Quellen (in dieser Gruppe erstmals geprüft)

28. Alvarez, G. A., & Cavanagh, P. (2005). Independent resources for attentional tracking in the left and right visual hemifields. *Psychological Science, 16*(8), 637–643. https://doi.org/10.1111/j.1467-9280.2005.01587.x — CR ✔; [A] PMID 16102067.
29. Bababekova, Y., Rosenfield, M., Hue, J. E., & Huang, R. R. (2011). Font size and viewing distance of handheld smart phones. *Optometry and Vision Science, 88*(7), 795–797. https://doi.org/10.1097/OPX.0b013e3182198792 — CR ✔; [A] PMID 21499163.
30. Brysbaert, M. (2019). How many words do we read per minute? A review and meta-analysis of reading rate. *Journal of Memory and Language, 109*, 104047. https://doi.org/10.1016/j.jml.2019.104047 — CR ✔; [A, OpenAlex].
31. Caird, J. K., Willness, C. R., Steel, P., & Scialfa, C. (2008). A meta-analysis of the effects of cell phones on driver performance. *Accident Analysis & Prevention, 40*(4), 1282–1293. https://doi.org/10.1016/j.aap.2008.01.009 — CR ✔; [A] PMID 18606257.
32. Carpenter, P. A., Just, M. A., & Shell, P. (1990). What one intelligence test measures: A theoretical account of the processing in the Raven Progressive Matrices Test. *Psychological Review, 97*(3), 404–431. https://doi.org/10.1037/0033-295X.97.3.404 — CR ✔; [A, OpenAlex].
33. Cohen, J. D., Dunbar, K., & McClelland, J. L. (1990). On the control of automatic processes: A parallel distributed processing account of the Stroop effect. *Psychological Review, 97*(3), 332–361. https://doi.org/10.1037/0033-295X.97.3.332 — CR ✔; [A] PMID 2200075.
34. Dehaene, S., & Cohen, L. (2011). The unique role of the visual word form area in reading. *Trends in Cognitive Sciences, 15*(6), 254–262. https://doi.org/10.1016/j.tics.2011.04.003 — CR ✔; [A] PMID 21592844.
35. Diamond, A. (2013). Executive functions. *Annual Review of Psychology, 64*, 135–168. https://doi.org/10.1146/annurev-psych-113011-143750 — CR ✔; [A] PMID 23020641.
36. Fortenbaugh, F. C., DeGutis, J., & Esterman, M. (2017). Recent theoretical, neural, and clinical advances in sustained attention research. *Annals of the New York Academy of Sciences, 1396*(1), 70–91. https://doi.org/10.1111/nyas.13318 — CR ✔; [V, PMC5522184].
37. Hagger, M. S., Chatzisarantis, N. L. D., Alberts, H., Anggono, C. O., Batailler, C., Birt, A. R., … Zwienenberg, M. (2016). A multilab preregistered replication of the ego-depletion effect. *Perspectives on Psychological Science, 11*(4), 546–573. https://doi.org/10.1177/1745691616652873 — CR ✔ (64 Autor:innen); [A] PMID 27474142.
38. Hirst, W., Spelke, E. S., Reaves, C. C., Caharack, G., & Neisser, U. (1980). Dividing attention without alternation or automaticity. *Journal of Experimental Psychology: General, 109*(1), 98–117. https://doi.org/10.1037/0096-3445.109.1.98 — CR ✔; [A, OpenAlex].
39. Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x — CR ✔ (Crossref 5 Autor:innen; Lillakas per Erratum ergänzt, PubMed); [A] PMID 17324203.
40. Kiely, K. M., Butterworth, P., Watson, N., & Wooden, M. (2014). The Symbol Digit Modalities Test: Normative data from a large nationally representative sample of Australians. *Archives of Clinical Neuropsychology, 29*(8), 767–775. https://doi.org/10.1093/arclin/acu055 — CR ✔; [A] PMID 25352087.
41. Klauer, K. J., & Phye, G. D. (2008). Inductive reasoning: A training approach. *Review of Educational Research, 78*(1), 85–123. https://doi.org/10.3102/0034654307313402 — CR ✔; [A, OpenAlex].
42. Lim, J., & Dinges, D. F. (2010). A meta-analysis of the impact of short-term sleep deprivation on cognitive variables. *Psychological Bulletin, 136*(3), 375–389. https://doi.org/10.1037/a0018883 — CR ✔; [A] PMID 20438143.
43. MacDonald, A. W., III, Cohen, J. D., Stenger, V. A., & Carter, C. S. (2000). Dissociating the role of the dorsolateral prefrontal and anterior cingulate cortex in cognitive control. *Science, 288*(5472), 1835–1838. https://doi.org/10.1126/science.288.5472.1835 — CR ✔; [A] PMID 10846167.
44. McConkie, G. W., & Rayner, K. (1975). The span of the effective stimulus during a fixation in reading. *Perception & Psychophysics, 17*(6), 578–586. https://doi.org/10.3758/BF03203972 — CR ✔; Inhalt über Rayner et al. (2016) [V].
45. Munoz, D. P., Broughton, J. R., Goldring, J. E., & Armstrong, I. T. (1998). Age-related performance of human subjects on saccadic eye movement tasks. *Experimental Brain Research, 121*(4), 391–400. https://doi.org/10.1007/s002210050473 — CR ✔; [A] PMID 9746145.
46. Nee, D. E., Wager, T. D., & Jonides, J. (2007). Interference resolution: Insights from a meta-analysis of neuroimaging tasks. *Cognitive, Affective, & Behavioral Neuroscience, 7*(1), 1–17. https://doi.org/10.3758/CABN.7.1.1 — CR ✔; [A] PMID 17598730.
47. Nuechterlein, K. H., Parasuraman, R., & Jiang, Q. (1983). Visual sustained attention: Image degradation produces rapid sensitivity decrement over time. *Science, 220*(4594), 327–329. https://doi.org/10.1126/science.6836276 — CR ✔; [A] PMID 6836276.
48. O’Regan, J. K., & Jacobs, A. M. (1992). Optimal viewing position effect in word recognition: A challenge to current theory. *Journal of Experimental Psychology: Human Perception and Performance, 18*(1), 185–197. https://doi.org/10.1037/0096-1523.18.1.185 — CR ✔; Inhalt [M] + OVP-Beschreibung in Rayner et al. (2016) [V].
49. Pardo, J. V., Pardo, P. J., Janer, K. W., & Raichle, M. E. (1990). The anterior cingulate cortex mediates processing selection in the Stroop attentional conflict paradigm. *Proceedings of the National Academy of Sciences, 87*(1), 256–259. https://doi.org/10.1073/pnas.87.1.256 — CR ✔; [A] PMID 2296583.
50. Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 — CR ✔; [A] PMID 1766652.
51. Pelli, D. G., & Tillman, K. A. (2008). The uncrowded window of object recognition. *Nature Neuroscience, 11*(10), 1129–1135. https://doi.org/10.1038/nn.2187 — CR ✔; [A] PMID 18828191.
52. Petersen, S. E., & Posner, M. I. (2012). The attention system of the human brain: 20 years after. *Annual Review of Neuroscience, 35*, 73–89. https://doi.org/10.1146/annurev-neuro-062111-150525 — CR ✔; [A] PMID 22524787.
53. Raymond, J. E., Shapiro, K. L., & Arnell, K. M. (1992). Temporary suppression of visual processing in an RSVP task: An attentional blink? *Journal of Experimental Psychology: Human Perception and Performance, 18*(3), 849–860. https://doi.org/10.1037/0096-1523.18.3.849 — CR ✔; [A] PMID 1500880.
54. Rayner, K., Li, X., Williams, C. C., Cave, K. R., & Well, A. D. (2007). Eye movements during information processing tasks: Individual differences and cultural effects. *Vision Research, 47*(21), 2714–2726. https://doi.org/10.1016/j.visres.2007.05.007 — CR ✔; [V, PMC2048814, Ergebnisse].
55. Rebok, G. W., Ball, K., Guey, L. T., Jones, R. N., Kim, H.-Y., King, J. W., Marsiske, M., Morris, J. N., Tennstedt, S. L., Unverzagt, F. W., & Willis, S. L. (2014). Ten-year effects of the Advanced Cognitive Training for Independent and Vital Elderly cognitive training trial on cognition and everyday functioning in older adults. *Journal of the American Geriatrics Society, 62*(1), 16–24. https://doi.org/10.1111/jgs.12607 — CR ✔; [A] PMID 24417410.
56. Roelofs, A. (2018). One hundred fifty years after Donders: Insights from unpublished data, a replication, and modeling of his reaction times. *Acta Psychologica, 191*, 228–233. https://doi.org/10.1016/j.actpsy.2018.10.002 — CR ✔; [A] PMID 30343095.
57. Rolfs, M. (2009). Microsaccades: Small steps on a long way. *Vision Research, 49*(20), 2415–2441. https://doi.org/10.1016/j.visres.2009.08.010 — CR ✔; [A] PMID 19683016.
58. Sala, G., & Gobet, F. (2019). Cognitive training does not enhance general cognition. *Trends in Cognitive Sciences, 23*(1), 9–20. https://doi.org/10.1016/j.tics.2018.10.004 — CR ✔; [A] PMID 30471868.
59. Salthouse, T. A. (2009). When does age-related cognitive decline begin? *Neurobiology of Aging, 30*(4), 507–514. https://doi.org/10.1016/j.neurobiolaging.2008.09.023 — CR ✔; [A] PMID 19231028.
60. Sheedy, J. E. (2004). Progressive addition lenses—matching the specific lens to patient needs. *Optometry, 75*(2), 83–102. https://doi.org/10.1016/S1529-1839(04)70021-4 — CR ✔; [A] PMID 14989501.
61. Sheppard, A. L., & Wolffsohn, J. S. (2018). Digital eye strain: Prevalence, measurement and amelioration. *BMJ Open Ophthalmology, 3*(1), e000146. https://doi.org/10.1136/bmjophth-2018-000146 — CR ✔; [A] PMID 29963645.
62. Sheridan, L. K., Fitzgerald, H. E., Adams, K. M., Nigg, J. T., Martel, M. M., Puttler, L. I., Wong, M. M., & Zucker, R. A. (2006). Normative Symbol Digit Modalities Test performance in a community-based sample. *Archives of Clinical Neuropsychology, 21*(1), 23–28. https://doi.org/10.1016/j.acn.2005.07.003 — CR ✔; [A] PMID 16139470.
63. Smith, P. J., Blumenthal, J. A., Hoffman, B. M., Cooper, H., Strauman, T. A., Welsh-Bohmer, K., Browndyke, J. N., & Sherwood, A. (2010). Aerobic exercise and neurocognitive performance: A meta-analytic review of randomized controlled trials. *Psychosomatic Medicine, 72*(3), 239–252. https://doi.org/10.1097/PSY.0b013e3181d14633 — CR ✔; [A] PMID 20223924.
64. Strober, L. B., Bruce, J. M., Arnett, P. A., Alschuler, K. N., Lebkuecher, A., Di Benedetto, M., Cozart, J., Thelen, J., Guty, E., & Roman, C. (2020). A new look at an old test: Normative data of the symbol digit modalities test – Oral version. *Multiple Sclerosis and Related Disorders, 43*, 102154. https://doi.org/10.1016/j.msard.2020.102154 — CR ✔ (Korrigendum 10.1016/j.msard.2020.102301); [A] PMID 32450507.
65. Thompson, J. J., Blair, M. R., & Henrey, A. J. (2014). Over the hill at 24: Persistent age-related cognitive-motor decline in reaction times in an ecologically valid video game task begins in early adulthood. *PLoS ONE, 9*(4), e94215. https://doi.org/10.1371/journal.pone.0094215 — CR ✔; [A] PMID 24718593.
66. Uncapher, M. R., & Wagner, A. D. (2018). Minds and brains of media multitaskers: Current findings and future directions. *Proceedings of the National Academy of Sciences, 115*(40), 9889–9896. https://doi.org/10.1073/pnas.1611612115 — CR ✔; [A] PMID 30275312.
67. Vadillo, M. A., Gold, N., & Osman, M. (2016). The bitter truth about sugar and willpower: The limited evidential value of the glucose model of ego depletion. *Psychological Science, 27*(9), 1207–1214. https://doi.org/10.1177/0956797616654911 — CR ✔; [A] PMID 27485134.
68. Verbruggen, F., & Logan, G. D. (2008). Response inhibition in the stop-signal paradigm. *Trends in Cognitive Sciences, 12*(11), 418–424. https://doi.org/10.1016/j.tics.2008.07.005 — CR ✔; [A] PMID 18799345.
69. Warm, J. S., Parasuraman, R., & Matthews, G. (2008). Vigilance requires hard mental work and is stressful. *Human Factors, 50*(3), 433–441. https://doi.org/10.1518/001872008X312152 — CR ✔ (DOI in D04); [A] PMID 18689050.
70. Watson, J. M., & Strayer, D. L. (2010). Supertaskers: Profiles in extraordinary multitasking ability. *Psychonomic Bulletin & Review, 17*(4), 479–485. https://doi.org/10.3758/PBR.17.4.479 — CR ✔; [A] PMID 20702865.
71. Willis, S. L., & Schaie, K. W. (1986). Training the elderly on the ability factors of spatial orientation and inductive reasoning. *Psychology and Aging, 1*(3), 239–247. https://doi.org/10.1037/0882-7974.1.3.239 — CR ✔; [A] PMID 3267404.
72. Wiradhany, W., & Nieuwenstein, M. R. (2017). Cognitive control in media multitaskers: Two replication studies and a meta-analysis. *Attention, Perception, & Psychophysics, 79*(8), 2620–2641. https://doi.org/10.3758/s13414-017-1408-4 — CR ✔; [A] PMID 28840547.
73. World Wide Web Consortium (W3C). (2024, 12. Dezember). *Web Content Accessibility Guidelines (WCAG) 2.2* (W3C Recommendation). https://www.w3.org/TR/WCAG22/ — **Webdokument, keine DOI**; Erfolgskriterien 1.4.1, 2.3.1, 2.5.5, 2.5.8 am 29.09.2026 im Originaltext gelesen [V].
74. LEO-BW (o. J.). *Schulte, Walter* [Personenporträt, Universität Tübingen]. https://www.leo-bw.de/en/detail/-/Detail/details/DOKUMENT/ubt_portraits/34989/Schulte%20Walter — **Webquelle, keine DOI**; abgerufen 29.09.2026 (Lebensdaten 1910–1972, Direktor der Universitätsnervenklinik Tübingen 1960–1972; keine Erwähnung der Tabelle).

### D.3 Aus docs/wissenschaft/01–04 übernommen, DOI am 29.09.2026 erneut per Crossref bestätigt

75. Anguera, J. A., Boccanfuso, J., Rintoul, J. L., Al-Hashimi, O., Faraji, F., Janowich, J., Kong, E., Larraburo, Y., Rolle, C., Johnston, E., & Gazzaley, A. (2013). Video game training enhances cognitive control in older adults. *Nature, 501*(7465), 97–101. https://doi.org/10.1038/nature12486 — CR ✔; [D04].
76. Augustinova, M., Parris, B. A., & Ferrand, L. (2019). The loci of Stroop interference and facilitation effects with manual and vocal responses. *Frontiers in Psychology, 10*, 1786. https://doi.org/10.3389/fpsyg.2019.01786 — CR ✔; [D04].
77. Ball, K., Berch, D. B., Helmers, K. F., Jobe, J. B., Leveck, M. D., Marsiske, M., Morris, J. N., Rebok, G. W., Smith, D. M., Tennstedt, S. L., Unverzagt, F. W., Willis, S. L., & ACTIVE Study Group. (2002). Effects of cognitive training interventions with older adults: A randomized controlled trial. *JAMA, 288*(18), 2271–2281. https://doi.org/10.1001/jama.288.18.2271 — CR ✔; [A] PMID 12425704.
78. Benedetto, S., Carbone, A., Pedrotti, M., Le Fevre, K., Bey, L. A. Y., & Baccino, T. (2015). Rapid serial visual presentation in reading: The case of Spritz. *Computers in Human Behavior, 45*, 352–358. https://doi.org/10.1016/j.chb.2014.12.043 — CR ✔; [D04].
79. Benedict, R. H. B., DeLuca, J., Phillips, G., LaRocca, N., Hudson, L. D., Rudick, R., & Multiple Sclerosis Outcome Assessments Consortium. (2017). Validity of the Symbol Digit Modalities Test as a cognition performance outcome measure for multiple sclerosis. *Multiple Sclerosis Journal, 23*(5), 721–733. https://doi.org/10.1177/1352458517690821 — CR ✔; [D04].
80. Bherer, L., Kramer, A. F., Peterson, M. S., Colcombe, S., Erickson, K., & Becic, E. (2005). Training effects on dual-task performance: Are there age-related differences in plasticity of attentional control? *Psychology and Aging, 20*(4), 695–709. https://doi.org/10.1037/0882-7974.20.4.695 — CR ✔; [D04].
81. Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 — CR ✔; [A] PMID 22472762.
82. Boccardo, L., Gurioli, M., & Grasso, P. A. (2023). Viewing distance and character size in the use of smartphones across the lifespan. *PLoS ONE, 18*(4), e0282947. https://doi.org/10.1371/journal.pone.0282947 — CR ✔; [D02].
83. Bouma, H. (1970). Interaction effects in parafoveal letter recognition. *Nature, 226*(5241), 177–178. https://doi.org/10.1038/226177a0 — CR ✔; [D03].
84. Buck, K. K., Atkinson, T. M., & Ryan, J. P. (2008). Evidence of practice effects in variants of the Trail Making Test during serial assessment. *Journal of Clinical and Experimental Neuropsychology, 30*(3), 312–318. https://doi.org/10.1080/13803390701390483 — CR ✔; [D04].
85. Calabrèse, A., Cheong, A. M. Y., Cheung, S.-H., He, Y., Kwon, M., Mansfield, J. S., Subramanian, A., Yu, D., & Legge, G. E. (2016). Baseline MNREAD measures for normally sighted subjects from childhood to old age. *Investigative Ophthalmology & Visual Science, 57*(8), 3836–3843. https://doi.org/10.1167/iovs.16-19580 — CR ✔; [D04].
86. Cortese, S., Ferrin, M., Brandeis, D., Buitelaar, J., Daley, D., Dittmann, R. W., Holtmann, M., Santosh, P., Stevenson, J., Stringaris, A., Zuddas, A., Sonuga-Barke, E. J. S., & European ADHD Guidelines Group. (2015). Cognitive training for attention-deficit/hyperactivity disorder: Meta-analysis of clinical and neuropsychological outcomes from randomized controlled trials. *Journal of the American Academy of Child & Adolescent Psychiatry, 54*(3), 164–174. https://doi.org/10.1016/j.jaac.2014.12.010 — CR ✔; [D04].
87. Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x — CR ✔; [D03].
88. Fricke, T. R., Tahhan, N., Resnikoff, S., Papas, E., Burnett, A., Ho, S. M., Naduvilath, T., & Naidoo, K. S. (2018). Global prevalence of presbyopia and vision impairment from uncorrected presbyopia: Systematic review, meta-analysis, and modelling. *Ophthalmology, 125*(10), 1492–1499. https://doi.org/10.1016/j.ophtha.2018.04.013 — CR ✔; [D04].
89. Harding, G., Wilkins, A. J., Erba, G., Barkley, G. L., & Fisher, R. S. (2005). Photic- and pattern-induced seizures: Expert consensus of the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1423–1425. https://doi.org/10.1111/j.1528-1167.2005.31305.x — CR ✔; [D03].
90. Hedge, C., Powell, G., & Sumner, P. (2018). The reliability paradox: Why robust cognitive tasks do not produce reliable individual differences. *Behavior Research Methods, 50*(3), 1166–1186. https://doi.org/10.3758/s13428-017-0935-1 — CR ✔; [D04].
91. Helton, W. S. (2009). Impulsive responding and the sustained attention to response task. *Journal of Clinical and Experimental Neuropsychology, 31*(1), 39–47. https://doi.org/10.1080/13803390801978856 — CR ✔; [D04].
92. Hoyer, W. J., Stawski, R. S., Wasylyshyn, C., & Verhaeghen, P. (2004). Adult age and digit symbol substitution performance: A meta-analysis. *Psychology and Aging, 19*(1), 211–214. https://doi.org/10.1037/0882-7974.19.1.211 — CR ✔; [D04].
93. Kramer, A. F., Larish, J. F., & Strayer, D. L. (1995). Training for attentional control in dual task settings: A comparison of young and old adults. *Journal of Experimental Psychology: Applied, 1*(1), 50–76. https://doi.org/10.1037/1076-898X.1.1.50 — CR ✔; [D04, dort über Sekundärquellen].
94. Kray, J., & Lindenberger, U. (2000). Adult age differences in task switching. *Psychology and Aging, 15*(1), 126–147. https://doi.org/10.1037/0882-7974.15.1.126 — CR ✔; [D04].
95. Lampit, A., Hallock, H., & Valenzuela, M. (2014). Computerized cognitive training in cognitively healthy older adults: A systematic review and meta-analysis of effect modifiers. *PLoS Medicine, 11*(11), e1001756. https://doi.org/10.1371/journal.pmed.1001756 — CR ✔; [D04].
96. Nguyen, L., Murphy, K., & Andrews, G. (2022). A game a day keeps cognitive decline away? A systematic review and meta-analysis of commercially-available brain training programs in healthy and cognitively impaired older adults. *Neuropsychology Review, 32*(3), 601–630. https://doi.org/10.1007/s11065-021-09515-2 — CR ✔; [D04].
97. Paramei, G. V., & Oakley, B. (2014). Variation of color discrimination across the life span. *Journal of the Optical Society of America A, 31*(4), A375–A384. https://doi.org/10.1364/JOSAA.31.00A375 — CR ✔; [A] PMID 24695196.
98. Pham, L., Harris, T., Varosanec, M., Morgan, V., Kosa, P., & Bielekova, B. (2021). Smartphone-based symbol-digit modalities test reliably captures brain damage in multiple sclerosis. *npj Digital Medicine, 4*, 36. https://doi.org/10.1038/s41746-021-00401-y — CR ✔; [D04].
99. Proctor, R. W., & Schneider, D. W. (2018). Hick’s law for choice reaction time: A review. *Quarterly Journal of Experimental Psychology, 71*(6), 1281–1299. https://doi.org/10.1080/17470218.2017.1322622 — CR ✔; [A] PMID 28434379.
100. Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 — CR ✔; [A] PMID 31823223; Zahlen [D01].
101. Salthouse, T. A. (2011). What cognitive abilities are involved in trail-making performance? *Intelligence, 39*(4), 222–232. https://doi.org/10.1016/j.intell.2011.03.001 — CR ✔; [D04].
102. Schotter, E. R., Tran, R., & Rayner, K. (2014). Don’t believe what you read (only once): Comprehension is supported by regressions during reading. *Psychological Science, 25*(6), 1218–1226. https://doi.org/10.1177/0956797614531148 — CR ✔; [D04].
103. Temple, J. G., Warm, J. S., Dember, W. N., Jones, K. S., LaGrange, C. M., & Matthews, G. (2000). The effects of signal salience and caffeine on performance, workload, and stress in an abbreviated vigilance task. *Human Factors, 42*(2), 183–194. https://doi.org/10.1518/001872000779656480 — CR ✔; [D04].
104. van Oirschot, P., Heerings, M., Wendrich, K., den Teuling, B., Martens, M. B., & Jongen, P. J. (2020). Symbol Digit Modalities Test variant in a smartphone app for persons with multiple sclerosis: Validation study. *JMIR mHealth and uHealth, 8*(10), e18160. https://doi.org/10.2196/18160 — CR ✔; [D04].
105. Verhaeghen, P., Steitz, D. W., Sliwinski, M. J., & Cerella, J. (2003). Aging and dual-task performance: A meta-analysis. *Psychology and Aging, 18*(3), 443–460. https://doi.org/10.1037/0882-7974.18.3.443 — CR ✔; [D04].
106. Viviani, G., Visalli, A., Finos, L., Vallesi, A., & Ambrosini, E. (2024). A comparison between different variants of the spatial Stroop task: The influence of analytic flexibility on Stroop effect estimates and reliability. *Behavior Research Methods, 56*(2), 934–951. https://doi.org/10.3758/s13428-023-02091-8 — CR ✔ (online 2023); [A] + Zahlen [D04].
107. Wasylyshyn, C., Verhaeghen, P., & Sliwinski, M. J. (2011). Aging and task switching: A meta-analysis. *Psychology and Aging, 26*(1), 15–20. https://doi.org/10.1037/a0020912 — CR ✔; [D04].
108. Wilkinson, A. J., & Yang, L. (2012). Plasticity of inhibition in older adults: Retest practice and transfer effects. *Psychology and Aging, 27*(3), 606–615. https://doi.org/10.1037/a0025926 — CR ✔; [D04].
109. Willis, S. L., Tennstedt, S. L., Marsiske, M., Ball, K., Elias, J., Koepke, K. M., Morris, J. N., Rebok, G. W., Unverzagt, F. W., Stoddard, A. M., Wright, E., & ACTIVE Study Group. (2006). Long-term effects of cognitive training on everyday functional outcomes in older adults. *JAMA, 296*(23), 2805–2814. https://doi.org/10.1001/jama.296.23.2805 — CR ✔; [D04].
110. Zhao, X., Wang, H., & Maes, J. H. R. (2020). Training and transfer effects of extensive task-switching training in students. *Psychological Research, 84*(2), 389–403. https://doi.org/10.1007/s00426-018-1059-7 — CR ✔ (online 2018); [D04].

Weitere, hier nicht wiederholte, aber in `docs/wissenschaft/04` geprüfte Quellen (z. B. Karbach & Kray,
2009; Karbach & Verhaeghen, 2014; Kiesel et al., 2010; Davidson et al., 2003; Rubin & Turano, 1992;
Legge & Bigelow, 2011; Jaeger, 2018; Rao et al., 2017; Fortenbaugh et al., 2015; Simons et al., 2016)
dürfen mit der dortigen Angabe zitiert werden; ihre DOIs wurden am 29.09.2026 ebenfalls per Crossref
bestätigt (Karbach & Kray 10.1111/j.1467-7687.2009.00846.x; Karbach & Verhaeghen
10.1177/0956797614548725; Kiesel et al. 10.1037/a0019842; Davidson et al. 10.1076/anec.10.2.85.14463;
Rubin & Turano 10.1016/0042-6989(92)90032-E; Legge & Bigelow 10.1167/11.5.8; Jaeger
10.1097/JCP.0000000000000941; Rao et al. 10.1177/1352458516688955; Fortenbaugh et al. 2015
10.1177/0956797615594896; Simons et al. 10.1177/1529100616661983).

### D.4 Geprüft, aber bewusst nicht verwendet

- Deary, Liewald & Nissan (2011), doi 10.3758/s13428-010-0024-1 – Abstract ohne Normwerte; Zahlen
  für „Durchschnitt 280–350 ms“ nicht belegbar.
- Wolfe (1998), doi 10.1111/1467-9280.00006 – Abstract ohne Steigungswerte.
- Meister & Fisher (2008), doi 10.1111/j.1444-0938.2007.00245.x – Abstract nennt keine Zonen- oder
  Astigmatismus-Angaben; stattdessen Sheedy (2004).
- Simon & Kotovsky (1963), doi 10.1037/h0043901, und Kotovsky & Simon (1973), doi
  10.1016/0010-0285(73)90020-0 – Metadaten ✔, Abstract nicht zugänglich; höchstens als „klassische
  Arbeiten zu Buchstabenreihen“ nennen, ohne Befunde.
- Mackworth-Zahlen „10–15 % in 30 min“ – nur Wikipedia/Herstellerbeschreibung, Original ohne
  zugängliches Abstract → nur als unsicher kennzeichnen.
- Stroop (1935) Originalzeiten – nicht aus einer prüfbaren Quelle belegt, nicht verwenden.
