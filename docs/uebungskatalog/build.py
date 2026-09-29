#!/usr/bin/env python3
"""Prüft die Katalog-Einträge und erzeugt katalog.json.

Aufruf:
  python3 docs/uebungskatalog/build.py            # alle prüfen + katalog.json schreiben
  python3 docs/uebungskatalog/build.py --check F  # nur die angegebenen Dateien prüfen
"""
import json
import re
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent
DIR = ROOT / 'uebungen'

PROFIL = {
    'visuell': ['sehschaerfe_detail', 'kontrast', 'farbunterscheidung', 'stereosehen', 'peripheres_sehen',
                'nutzbares_sehfeld', 'blickfolge', 'sakkaden', 'fixation', 'bewegungswahrnehmung',
                'visuelle_suche', 'visuelle_verarbeitungsgeschwindigkeit', 'zeitliche_aufloesung',
                'naharbeit_dauer'],
    'kognitiv': ['daueraufmerksamkeit', 'selektive_aufmerksamkeit', 'inhibition', 'geteilte_aufmerksamkeit',
                 'kognitive_flexibilitaet', 'arbeitsgedaechtnis', 'kurzzeitgedaechtnis_verbal',
                 'kurzzeitgedaechtnis_visuell_raeumlich', 'verarbeitungsgeschwindigkeit', 'antizipation',
                 'entscheidung_wahlreaktion', 'lesen_sprache', 'schlussfolgern'],
    'motorisch': ['einfache_reaktion', 'auge_hand_koordination', 'zielbewegung_tempo', 'zielbewegung_praezision',
                  'kontinuierliche_steuerung', 'ruhige_hand', 'fingergeschwindigkeit', 'fingersequenz_bimanual',
                  'ganzkoerper', 'gleichgewicht', 'ausdauer_belastung'],
}
BELASTUNG = ['zeitdruck', 'flimmern_lichtreize', 'bewegungsreize_schwindel', 'koerperliche_belastung',
             'sturzrisiko', 'sprachabhaengigkeit']
EINGABE = {'maus', 'touch', 'tastatur', 'touchpad', 'gamepad', 'kamera', 'koerper_ohne_geraet'}
TABLET = {'ja', 'mit_anpassung', 'nein'}
EVIDENZ = {'stark', 'mittel', 'schwach', 'fehlend', 'unklar'}
VORSICHT = {'photosensitive_epilepsie', 'migraene_lichtempfindlich', 'schwindel_vestibulaer', 'reisekrankheit',
            'nystagmus', 'schielen_binokular', 'amblyopie', 'gesichtsfeldausfall', 'sehbehinderung_niedriger_visus',
            'farbsehschwaeche', 'presbyopie_gleitsicht', 'trockenes_auge_bildschirm', 'kopfschmerz_asthenopie',
            'tremor_parkinson', 'hand_arm_beschwerden', 'sturzgefahr', 'herz_kreislauf', 'gelenk_ruecken',
            'kognitive_einschraenkung', 'kinder_unter_6', 'lese_rechtschreib_schwaeche', 'aufmerksamkeitsprobleme'}
KAPITEL = {1: 'visual', 2: 'cognitive', 3: 'reaction-speed', 4: 'visual-tracking', 5: 'fps', 6: 'memory',
           7: 'motor', 8: 'physical', 9: None}
ALLE_PROFIL = {k for ks in PROFIL.values() for k in ks}
SECTIONS = ['## 1.', '## 2.', '## 3.', '## 4.', '## 5.', '## 6.', '## 7.', '## 8.', '## 9.', '## 10.', '## 11.']


def split(text):
    m = re.match(r'^---\n(.*?)\n---\n(.*)$', text, re.S)
    if not m:
        raise ValueError('kein YAML-Kopf (--- … ---) am Dateianfang')
    return yaml.safe_load(m.group(1)), m.group(2)


def check(path):
    errs = []
    try:
        meta, body = split(path.read_text(encoding='utf-8'))
    except Exception as e:  # noqa: BLE001
        return None, [f'{path.name}: {e}']
    e = errs.append
    nr = meta.get('nr')
    if not isinstance(nr, int) or not 101 <= nr <= 999:
        e('nr fehlt oder ist keine dreistellige Zahl')
    else:
        if not path.name.startswith(f'{nr}-'):
            e(f'Dateiname muss mit "{nr}-" beginnen')
        kap = KAPITEL.get(nr // 100, 'x')
        if kap != 'x' and kap is not None and meta.get('kapitel_original') != kap:
            e(f'kapitel_original muss "{kap}" sein')
    if path.stem != f"{nr}-{meta.get('kennung')}":
        e('kennung passt nicht zum Dateinamen')
    for k in ['name', 'name_original', 'kapitel', 'kurzbeschreibung', 'schwierigkeit_anpassung', 'stand']:
        if not meta.get(k):
            e(f'Feld {k} fehlt')
    if nr and nr < 900 and not str(meta.get('quelle_url', '')).startswith('https://skilldrills.online/'):
        e('quelle_url fehlt')
    prof = meta.get('anforderungsprofil') or {}
    for grp, keys in PROFIL.items():
        g = prof.get(grp) or {}
        for k in keys:
            if g.get(k) not in (0, 1, 2, 3):
                e(f'anforderungsprofil.{grp}.{k} fehlt oder nicht 0–3')
        for k in g:
            if k not in keys:
                e(f'unbekannter Schlüssel anforderungsprofil.{grp}.{k}')
    bel = meta.get('belastung') or {}
    for k in BELASTUNG:
        if bel.get(k) not in (0, 1, 2, 3):
            e(f'belastung.{k} fehlt oder nicht 0–3')
    zf = meta.get('ziel_funktionen') or []
    if not 1 <= len(zf) <= 4:
        e('ziel_funktionen: 1–4 Einträge')
    for k in zf:
        if k not in ALLE_PROFIL:
            e(f'ziel_funktionen: unbekannter Schlüssel {k}')
        else:
            grp = next(g for g, ks in PROFIL.items() if k in ks)
            if (prof.get(grp) or {}).get(k) not in (2, 3):
                e(f'ziel_funktionen: {k} hat im Profil nicht 2 oder 3')
    for k in meta.get('eingabe') or ['?']:
        if k not in EINGABE:
            e(f'eingabe: unbekannter Wert {k}')
    if meta.get('tablet_geeignet') not in TABLET:
        e('tablet_geeignet: ja | mit_anpassung | nein')
    for k in meta.get('vorsicht_bei') or []:
        if k not in VORSICHT:
            e(f'vorsicht_bei: unbekannter Schlüssel {k}')
    ev = meta.get('evidenz') or {}
    for k in ['uebungseffekt', 'naher_transfer', 'alltag_transfer']:
        if ev.get(k) not in EVIDENZ:
            e(f'evidenz.{k} fehlt oder ungültig')
    if not ev.get('kommentar'):
        e('evidenz.kommentar fehlt')
    for k in ['voraussetzungen', 'geeignet_fuer', 'weniger_geeignet_fuer', 'messgroessen', 'stichworte']:
        if not isinstance(meta.get(k), list):
            e(f'{k} muss eine Liste sein')
    for n in meta.get('aehnliche_uebungen') or []:
        if not isinstance(n, int):
            e('aehnliche_uebungen: nur Nummern')
    pos = -1
    for s in SECTIONS:
        i = body.find('\n' + s)
        if i < 0:
            e(f'Abschnitt "{s}" fehlt')
        elif i < pos:
            e(f'Abschnitt "{s}" in falscher Reihenfolge')
        else:
            pos = i
    q = body.split('\n## 11.', 1)[-1]
    if 'Von der Website angegeben' not in q or 'Weitere Fachliteratur' not in q:
        e('Quellen: Unterabschnitte "Von der Website angegeben" und "Weitere Fachliteratur" nötig')
    if len(re.findall(r'https?://', q)) < 5:
        e('Quellen: mindestens 5 Links/DOIs')
    if re.search(r'cf(?:a|as)t_', body):
        e('verdächtiger Token im Text')
    meta['datei'] = f'uebungen/{path.name}'
    return meta, [f'{path.name}: {x}' for x in errs]


def main():
    args = sys.argv[1:]
    files = [Path(a) for a in args[1:]] if args[:1] == ['--check'] else sorted(DIR.glob('[0-9][0-9][0-9]-*.md'))
    metas, errs = [], []
    for f in files:
        m, es = check(f.resolve())
        errs += es
        if m:
            metas.append(m)
    nrs = [m['nr'] for m in metas]
    for n in {x for x in nrs if nrs.count(x) > 1}:
        errs.append(f'Nummer {n} mehrfach vergeben')
    if args[:1] != ['--check']:
        known = set(nrs)
        for m in metas:
            for n in m.get('aehnliche_uebungen') or []:
                if n not in known:
                    errs.append(f"{m['nr']}: aehnliche_uebungen verweist auf unbekannte Nummer {n}")
    for x in errs:
        print('FEHLER', x)
    if args[:1] != ['--check']:
        metas.sort(key=lambda m: m['nr'])
        out = {'stand': '2026-09-29', 'anzahl': len(metas), 'uebungen': metas}
        (ROOT / 'katalog.json').write_text(json.dumps(out, ensure_ascii=False, indent=1, default=str) + '\n',
                                           encoding='utf-8')
        print(f'{len(metas)} Einträge → katalog.json')
    print('OK' if not errs else f'{len(errs)} Fehler')
    sys.exit(1 if errs else 0)


if __name__ == '__main__':
    main()
