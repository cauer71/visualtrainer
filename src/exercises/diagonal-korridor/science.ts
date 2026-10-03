import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/810-cross-body-movement.md und docs/uebungskatalog/literatur/lit-W11-koerper-b.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'diagonal-korridor',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Eine Marke mit dem Finger ruhig und gleichmäßig durch einen schmalen, schrägen Gang von Ecke zu Ecke ziehen, ohne die Wand zu berühren.',
      daily: 'Überall, wo man eine Bewegung entlang eines engen Wegs führt: mit dem Stift eine Linie ziehen, einen Pfad auf dem Touchscreen nachfahren, etwas durch eine schmale Lücke führen.',
      research:
        'Für Bewegungen durch einen Tunnel gilt das Steering-Gesetz: Je länger und schmaler der Weg, desto mehr Zeit braucht man. Zielgerichtete Bewegungen bestehen aus einem geplanten ersten Schwung und einer Feinkorrektur nach Rückmeldung; Menschen blicken dabei meist zum Ziel, und die Bewegung wird genauer, wenn die Augen dorthin gehen dürfen. Aussagen, solche Übungen „verbänden“ die Hirnhälften oder wirkten wie Überkreuzbewegungen, sind nicht belegt; die zitierte Forschung spricht eher für mechanische als für Hirn-Erklärungen. Ein Nutzen für den Alltag ist nicht belegt. Zittern, Doppelbilder, plötzliche Sehverschlechterung, Kopfschmerz mit Sehverschlechterung oder Schwindel gehören ärztlich abgeklärt; die Übung ist weder Test noch Diagnose (Lehrbuchwissen: Muchnick, 2008).',
      improved:
        'Die Übung ist für den Finger gebaut: Die Kugel sitzt über dem Finger, sodass er nichts verdeckt, und der Finger setzt in einem großzügigen Kreis unter ihr auf; Abheben ist eine Pause. Die Wand wird in kleinen Schritten geprüft, unabhängig von der Bildrate. Eine Berührung zeigt ein weiches ✗ ohne rotes Blitzen oder Wackeln, die Kugel gleitet am Rand entlang, und man muss nicht von vorn beginnen. Gangbreite und Länge passen sich dem Erfolg an (zwei saubere Durchgänge in Folge machen es schwerer, ein unsauberer leichter), die Startecke wechselt. Dauer und Gleichmäßigkeit werden mitgeschrieben, Tempo bringt aber keine Punkte. Gemessen wird nur dein Fingerweg gegen den Gang auf diesem Gerät – nicht dein Blick und kein Zittern. Mit Körper oder Hirnhälften hat die Übung nichts zu tun.',
    },
    it: {
      trains: 'Trascinare con il dito un segno in modo calmo e regolare in uno stretto corridoio obliquo da un angolo all’altro, senza toccare la parete.',
      daily: 'Ovunque si guidi un movimento lungo un percorso stretto: tracciare una linea con la penna, seguire un tracciato sul touchscreen, far passare qualcosa in una fessura.',
      research:
        'Per i movimenti attraverso un tunnel vale la legge dello sterzo (steering law): più il percorso è lungo e stretto, più tempo serve. I movimenti mirati constano di un primo impulso pianificato e di una correzione fine in base al riscontro; di solito si guarda verso la meta e il movimento è più preciso se gli occhi possono andarci. Le affermazioni secondo cui tali esercizi «collegherebbero» gli emisferi cerebrali o agirebbero come movimenti incrociati non sono dimostrate; la ricerca citata indica spiegazioni meccaniche più che cerebrali. Un beneficio per la vita quotidiana non è dimostrato. Tremore, visione doppia, improvviso peggioramento della vista, mal di testa con peggioramento della vista o vertigini vanno chiariti dal medico; l’esercizio non è né un test né una diagnosi (manuale: Muchnick, 2008).',
      improved:
        'L’esercizio è pensato per il dito: la pallina sta sopra il dito, così il dito non copre nulla, e il dito si appoggia in un ampio cerchio sotto di essa; sollevarlo è una pausa. La parete viene controllata a piccoli passi, indipendentemente dalla frequenza dello schermo. Un contatto mostra un ✗ morbido senza lampi rossi né scosse, la pallina scivola lungo il bordo e non devi ricominciare da capo. Larghezza e lunghezza del corridoio si adattano al successo (due passaggi puliti di fila rendono tutto più difficile, uno non pulito più facile), l’angolo di partenza cambia. Durata e regolarità vengono annotate, ma la velocità non dà punti. Si misura solo il percorso del dito rispetto al corridoio su questo dispositivo – non lo sguardo né il tremore. L’esercizio non ha nulla a che fare con il corpo o con gli emisferi cerebrali.',
    },
  },
  sources: [
    src("Accot & Zhai (1997). Beyond Fitts' law: Models for trajectory-based HCI tasks. Proceedings of CHI '97", 'https://doi.org/10.1145/258549.258760'),
    src("Elliott, Helsen & Chua (2001). A century later: Woodworth's (1899) two-component model of goal-directed aiming. Psychological Bulletin", 'https://doi.org/10.1037/0033-2909.127.3.342'),
    src('Abrams, Meyer & Kornblum (1990). Eye-hand coordination: Oculomotor control in rapid aimed limb movements. Journal of Experimental Psychology: Human Perception and Performance', 'https://doi.org/10.1037/0096-1523.16.2.248'),
    src('Carey, Hargreaves & Goodale (1996). Reaching to ipsilateral or contralateral targets: Within-hemisphere visuomotor processing cannot explain hemispatial differences in motor control. Experimental Brain Research', 'https://doi.org/10.1007/BF00227955'),
    src('Hyatt (2007). Brain Gym: Building stronger brains or wishful thinking? Remedial and Special Education', 'https://doi.org/10.1177/07419325070280020201'),
    src('Muchnick (2008). Clinical Medicine in Optometric Practice, 2nd ed. Mosby/Elsevier, S. 6 und 28 (Warnzeichen mit Abklärungsbedarf, darunter Zittern)', 'https://openlibrary.org/isbn/9780323029612'),
  ],
};
