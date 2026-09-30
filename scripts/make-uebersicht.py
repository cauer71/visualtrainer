#!/usr/bin/env python3
"""Erzeugt docs/uebungskatalog/UEBERSICHT.md aus katalog.json (nach build.py ausführen)."""
import json
from pathlib import Path

base = Path(__file__).resolve().parent.parent / 'docs/uebungskatalog'
d = json.load(open(base / 'katalog.json'))['uebungen']
ab = {'ja': 'ja', 'mit_anpassung': 'Anpassung', 'nein': 'nein'}
e = {'stark': 's', 'mittel': 'm', 'schwach': 'w', 'fehlend': 'f', 'unklar': '?'}
kap = []
for m in d:
    if not kap or kap[-1] != m['kapitel']:
        kap.append(m['kapitel'])
n_play = sum(1 for m in d if m.get('blickfit_umsetzung') and m['blickfit_umsetzung'].get('kennung'))
L = ['# Übersicht aller Übungen', '',
     f'Erzeugt aus `katalog.json` (Stand 30.09.2026). **{len(d)} Einträge**, davon **{n_play} hier spielbar** (▲). Die Nummern sind dauerhaft.',
     'Die Spalte „Kern“ nennt die Funktionen mit Anforderungswert 3; Tablet = Eignung des Originals; ▲ = Blickfit-Umsetzung vorhanden.',
     'Evidenz: Übungseffekt / naher Transfer / Alltagstransfer (s = stark, m = mittel, w = schwach, f = fehlend, ? = unklar).', '']
for k in kap:
    L += [f'## {k}', '', '| Nr. | Übung | Kern | Tablet | Evidenz | Vorsicht bei | |', '|---|---|---|---|---|---|---|']
    for m in d:
        if m['kapitel'] != k:
            continue
        b = m.get('blickfit_umsetzung')
        bf = '▲' if b and b.get('kennung') else ''
        ev = '/'.join(e[m['evidenz'][x]] for x in ['uebungseffekt', 'naher_transfer', 'alltag_transfer'])
        L.append(f"| {m['nr']} | [{m['name']}]({m['datei']}) | {', '.join(m['ziel_funktionen'])} | {ab[m['tablet_geeignet']]} | {ev} | {', '.join(m['vorsicht_bei'] or [])} | {bf} |")
    L.append('')
(base / 'UEBERSICHT.md').write_text('\n'.join(L), encoding='utf-8')
print('UEBERSICHT.md:', len(L), 'Zeilen,', n_play, 'spielbar')
