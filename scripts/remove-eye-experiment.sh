#!/usr/bin/env bash
# EYE-EXPERIMENT: entfernt das Blickschätzungs-Experiment (/eye/, Phase 1 und alle späteren Phasen) vollständig.
#
#   scripts/remove-eye-experiment.sh              entfernen und danach `npm run build` ausführen
#   scripts/remove-eye-experiment.sh --dry-run    nur anzeigen, was entfernt würde
#   scripts/remove-eye-experiment.sh --no-build   entfernen, aber nicht bauen
#
# Was passiert:
#   1. Ordner/Dateien löschen: eye/, src/eye/, public/eye-models/, tests/unit/eye-*.test.ts, tests/e2e/eye-*.mjs,
#      docs/eye-tracking-experiment.md
#   2. Markierte Stellen entfernen (grep -rn EYE-EXPERIMENT findet sie): einzelne Zeilen mit „EYE-EXPERIMENT“ sowie Blöcke
#      zwischen „EYE-EXPERIMENT begin“ und „EYE-EXPERIMENT end“ in vite.config.ts, public/_headers,
#      src/ui/pages/OpticianPage.tsx, src/i18n/optiker.ts, README.md; Schlüssel "//" in package.json
#   3. Abhängigkeit @mediapipe/tasks-vision deinstallieren (package.json und package-lock.json)
#   4. Prüfen, dass keine Markierung mehr übrig ist, und `npm run build` ausführen
#   5. Dieses Skript löscht sich zuletzt selbst.
set -euo pipefail
cd "$(dirname "$0")/.."

DRY=0
BUILD=1
for a in "$@"; do
  case "$a" in
    --dry-run) DRY=1 ;;
    --no-build) BUILD=0 ;;
    *) echo "Unbekannte Option: $a" >&2; exit 2 ;;
  esac
done

run() { if [ "$DRY" = 1 ]; then echo "[Trockenlauf] $*"; else "$@"; fi; }

echo "1/4 Ordner und Dateien löschen"
for p in eye src/eye public/eye-models docs/eye-tracking-experiment.md tests/unit/eye-*.test.ts tests/e2e/eye-*.mjs; do
  if [ -e "$p" ]; then run rm -rf -- "$p"; fi
done

echo "2/4 markierte Stellen entfernen"
DRY="$DRY" node --input-type=module <<'JS'
import fs from 'node:fs';
const dry = process.env.DRY === '1';
const MARK = 'EYE-EXPERIMENT';
const files = ['vite.config.ts', 'public/_headers', 'src/ui/pages/OpticianPage.tsx', 'src/i18n/optiker.ts', 'README.md'];
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  const out = [];
  let inBlock = false;
  let removed = 0;
  for (const l of lines) {
    if (l.includes(`${MARK} begin`)) { inBlock = true; removed++; continue; }
    if (inBlock) { removed++; if (l.includes(`${MARK} end`)) inBlock = false; continue; }
    if (l.includes(MARK)) { removed++; continue; }
    out.push(l);
  }
  if (inBlock) { console.error(`FEHLER: ${f}: „${MARK} begin“ ohne „${MARK} end“`); process.exit(1); }
  let text = out.join('\n');
  if (f === 'README.md' || f === 'public/_headers') text = text.replace(/\n{3,}/g, '\n\n');
  if (removed) console.log(`  ${f}: ${removed} Zeile(n)${dry ? ' würden entfernt' : ' entfernt'}`);
  if (!dry && removed) fs.writeFileSync(f, text);
}
if (fs.existsSync('package.json')) {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (typeof pkg['//'] === 'string' && pkg['//'].includes(MARK)) {
    console.log(`  package.json: Schlüssel "//" ${dry ? 'würde entfernt' : 'entfernt'}`);
    if (!dry) { delete pkg['//']; fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n'); }
  }
}
JS

echo "3/4 Abhängigkeit deinstallieren"
if grep -q '"@mediapipe/tasks-vision"' package.json; then
  run npm uninstall @mediapipe/tasks-vision
fi

echo "4/4 Prüfen"
if [ "$DRY" = 1 ]; then
  echo "[Trockenlauf] Es wurde nichts verändert."
  exit 0
fi
LEFT=$(grep -rn "$(printf 'EYE-%s' EXPERIMENT)" . --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.git --exclude-dir=.wrangler --exclude=remove-eye-experiment.sh || true)
if [ -n "$LEFT" ]; then
  echo "Achtung: Es sind noch Markierungen übrig:" >&2
  echo "$LEFT" >&2
  exit 1
fi
echo "Keine Markierung mehr übrig."
if [ "$BUILD" = 1 ]; then npm run build; fi
echo "Fertig. Das Experiment ist entfernt."
rm -- "$0"
exit 0
