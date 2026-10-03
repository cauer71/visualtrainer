import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'schrumpfende-ziele',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Mehrere gleichzeitig schrumpfende Kreise überblicken, den kleinsten als den dringendsten erkennen und ihn zuerst antippen.',
      daily: 'Mehrere Dinge gleichzeitig im Blick behalten und entscheiden, was zuerst dran ist – etwa beim Kochen, im Haushalt oder bei Spielen auf dem Tablet.',
      research:
        'Zum Zeigen und Antippen gibt es viel Forschung: Die Zeit hängt von Entfernung und Zielgröße ab (Fitts’sches Gesetz), und beim Suchen mehrerer Ziele passieren nach dem ersten gefundenen leichter Fehler bei den übrigen. Plötzlich Auftauchendes zieht die Aufmerksamkeit an. Mit Übung werden Zielaufgaben deutlich besser – ein großer Teil davon ist Gewöhnung an Gerät und Aufgabe, der Übertrag auf andere Aufgaben ist klein. Für genau diese Übung – die Größe als Zeichen für Dringlichkeit – gibt es keine Studie; ein Nutzen für Sport, Straßenverkehr oder Alltag ist nicht belegt. Vergleiche dich nur mit dir selbst auf demselben Gerät. Doppelbilder, plötzliche Sehverschlechterung, Kopfschmerz mit Sehverschlechterung oder Schwindel gehören ärztlich abgeklärt; die Übung ist weder Test noch Diagnose (Lehrbuchwissen: Muchnick, 2008).',
      improved:
        'Alle Kreise schrumpfen mit gleicher Geschwindigkeit, nach der Zeit gerechnet und damit auf jedem Gerät gleich schnell, und verschwinden bei derselben Mindestgröße, die ein gestrichelter Innenkreis anzeigt. So ist der kleinste Kreis tatsächlich immer der, der als Erster verschwindet, und die Größe sagt ehrlich, was am dringendsten ist. Eine Sitzung hat zwölf Runden mit zwei bis fünf Kreisen, ohne Zeitgutschrift und ohne Zeitstrafe; die Stufe richtet sich nach dem Erfolg (zwei Runden in Folge ohne verschwundenen Kreis erhöhen sie, ein Misserfolg senkt sie) und bestimmt Anzahl und Tempo. Die Trefferflächen sind größer als die sichtbaren Kreise, ein Fehltipp wird ruhig mit einem Symbol markiert, nichts blinkt oder wackelt. Gemessen werden der Anteil „kleinster zuerst“ sowie die getippten, verschwundenen und danebengetippten Kreise – ohne Noten und ohne Blick.',
    },
    it: {
      trains: 'Tenere sott’occhio più cerchi che si rimpiccioliscono insieme, riconoscere il più piccolo come il più urgente e toccarlo per primo.',
      daily: 'Tenere d’occhio più cose insieme e decidere cosa viene prima – per esempio mentre si cucina, nelle faccende di casa o nei giochi sul tablet.',
      research:
        'Sul puntare e toccare esiste molta ricerca: il tempo dipende dalla distanza e dalla grandezza del bersaglio (legge di Fitts), e nella ricerca di più bersagli, dopo il primo trovato si sbaglia più facilmente con gli altri. Ciò che compare all’improvviso attira l’attenzione. Con l’esercizio i compiti di puntamento migliorano nettamente – in gran parte è abitudine al dispositivo e al compito, il trasferimento ad altri compiti è piccolo. Per questo esercizio – la grandezza come segno di urgenza – non esiste uno studio; un’utilità per sport, traffico o vita quotidiana non è dimostrata. Confrontati solo con te stesso sullo stesso dispositivo. Visione doppia, improvviso peggioramento della vista, mal di testa con peggioramento della vista o vertigini vanno chiariti dal medico; l’esercizio non è né un test né una diagnosi (manuale: Muchnick, 2008).',
      improved:
        'Tutti i cerchi si rimpiccioliscono alla stessa velocità, calcolata in base al tempo e quindi uguale su ogni dispositivo, e spariscono alla stessa grandezza minima, indicata da un cerchio interno tratteggiato. Così il cerchio più piccolo è davvero sempre il primo a sparire, e la grandezza indica onestamente che cosa è più urgente. Una sessione ha dodici turni con da due a cinque cerchi, senza tempo in regalo né penalità; il livello dipende dal successo (due turni di fila senza cerchi spariti lo alzano, un insuccesso lo abbassa) e determina numero e velocità. Le aree di tocco sono più grandi dei cerchi visibili, un tocco sbagliato viene segnalato con calma da un simbolo, nulla lampeggia né trema. Si misurano la quota «il più piccolo prima» e i cerchi toccati, spariti e toccati accanto – senza voti e senza sguardo.',
    },
  },
  sources: [
    src('Fitts (1954). The information capacity of the human motor system in controlling the amplitude of movement. Journal of Experimental Psychology', 'https://doi.org/10.1037/h0055392'),
    src('Yantis & Jonides (1984). Abrupt visual onsets and selective attention: Evidence from visual search. Journal of Experimental Psychology: Human Perception and Performance', 'https://doi.org/10.1037/0096-1523.10.5.601'),
    src('Adamo, Cain & Mitroff (2013). Self-induced attentional blink: A cause of errors in multiple-target search. Psychological Science', 'https://doi.org/10.1177/0956797613497970'),
    src('Bi, Li & Zhai (2013). FFitts law: Modeling finger touch with Fitts’ law. Proceedings of CHI ’13', 'https://doi.org/10.1145/2470654.2466180'),
    src('Guadagnoli & Lee (2004). Challenge point: A framework for conceptualizing the effects of various practice conditions in motor learning. Journal of Motor Behavior', 'https://doi.org/10.3200/JMBR.36.2.212-224'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
    src('Fransen (2024). There is no supporting evidence for a far transfer of general perceptual or cognitive training to sports performance. Sports Medicine', 'https://doi.org/10.1007/s40279-024-02060-x'),
    src('Muchnick (2008). Clinical Medicine in Optometric Practice, 2nd ed. Mosby/Elsevier, S. 6 und 28 (Warnzeichen mit Abklärungsbedarf)', 'https://openlibrary.org/isbn/9780323029612'),
  ],
};
