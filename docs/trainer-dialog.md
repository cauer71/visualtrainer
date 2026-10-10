# Dialog Entwickler ↔ Trainer

Trainer bewerten Übungen (Sterne, Kommentar, optionales Kürzel). Der Entwickler (Mensch oder KI in Claude Code) setzt die Kritik um und schreibt zurück, was verbessert wurde. Die Trainer sehen das in der App.

## Grundsatz: nichts geht verloren

- Der Export löscht nichts. „Als exportiert markieren“ setzt nur `exported_at`; Text und Sterne bleiben.
- Die Exportdatei enthält standardmäßig nur noch nicht exportierte Kommentare. Mit „Exportierte anzeigen“ zeigt die Entwicklerseite auch das Archiv.
- Hartes Löschen gibt es nur über „Endgültig löschen“ (ein Eintrag, mit Rückfrage) bzw. `POST /api/admin/delete` mit `confirm: true`.
- Die Datenbank (`worker/index.ts`, `ensureSchema`) wird beim ersten Aufruf idempotent erweitert: Spalten `exported_at`, `parent_id`, Tabellen `replies`, `improvements`.

## Ablauf

1. Entwicklerseite `#/entwickler` (Passwort), „Neue Kommentare exportieren (.txt)“. Die Datei beginnt mit einer Anleitung für die KI; jeder Kommentar trägt seine Nummer `[#id]`.
2. Datei in Claude Code einfügen, Übungen verbessern.
3. Danach „Als exportiert markieren“ (Entwicklerseite). Erst exportierte Kommentare bekommen die Sammelantwort.
4. Antworten schreiben, je Übung (Kennung steht in der Überschrift der Exportdatei):

```bash
curl -sS -X POST https://visual.auer.page/api/admin/reply \
  -H "Authorization: Bearer $ADMIN_PASSWORD" -H "Content-Type: application/json" \
  -d '{"exerciseId":"blitzreaktion","text":"Tempo am Anfang gesenkt.","improved":true}'
```

Das Passwort steht nie in Dateien oder im Repo, sondern in der Umgebungsvariable `ADMIN_PASSWORD`.

| Feld | Bedeutung |
| --- | --- |
| `exerciseId` | Kennung der Übung (`allgemein` für Allgemeines) |
| `text` | Antwort, höchstens 1500 Zeichen |
| `feedbackId` | optional: nur diesen Kommentar beantworten. Fehlt es: alle exportierten, noch unbeantworteten Kommentare der Übung |
| `improved` | `true`: legt zusätzlich die Meldung „Übung verbessert“ an (Abzeichen bei den Trainern) |
| `includeUnexported` | optional, nur bei Sammelantwort: auch noch nicht exportierte Kommentare beantworten |

Antwort: `{ ok, replies, feedbackIds, improvement, skippedUnexported }`. Ohne passende Kommentare entsteht nur die Verbesserungsmeldung.

## Schnittstellen

| Aufruf | Zweck |
| --- | --- |
| `POST /api/feedback` | Bewertung abgeben; optional `replyTo` (Nummer der früheren eigenen Rückmeldung); Antwort `{ ok, id }` |
| `GET /api/feedback/mine?ids=1,2,3` | Antworten und Exportstatus der angefragten Nummern (höchstens 200); keine Kommentare, keine Kürzel |
| `GET /api/improvements` | neueste Verbesserungsmeldung je Übung |
| `GET /api/admin/feedback[?includeExported=1]` | alle Zeilen mit `id`, Antworten, Verbesserungen (Standard: ohne exportierte) |
| `POST /api/admin/export {ids}` | als exportiert markieren (`/api/admin/clear` ist derselbe Aufruf, löscht nichts) |
| `POST /api/admin/reply` | Antwort(en) schreiben (siehe oben) |
| `POST /api/admin/delete {id, confirm:true}` | einen Eintrag endgültig löschen |

Die offenen Aufrufe sind je Adresse mengenbegrenzt (HTTP 429).

## Was die Trainer sehen

Nur in der Trainer-/Entwickleransicht, nie bei „Benutzer“:

- „★4 bewertet“ an Übungen, die sie auf diesem Gerät bewertet haben; Filter „Von mir bewertet / Noch nicht bewertet / Verbessert“.
- „Verbessert“ bzw. „Neu verbessert“ (neuer als die eigene Bewertung oder der letzte Besuch) mit Text und Datum.
- „Meine Bewertungen“ (`#/meine`): eigene Kommentare mit den Antworten als Gesprächsblasen, Hinweispunkt am Menü für Ungesehenes.
- Die eigene Liste liegt im `localStorage` (höchstens 500 Einträge). Nicht gesendete Bewertungen bleiben dort und werden später automatisch nachgesendet. Ohne Schnittstelle (Vorschau, offline) zeigt die App nur lokale Daten.
