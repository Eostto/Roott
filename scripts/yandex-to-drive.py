"""Înlocuiește linkurile Yandex Disk din paginile copiate cu linkuri Google Drive.
Mapare: src/data/_legacy/yandex-files.json (yandex → nume fișier) + drive-ids.json (nume fișier → ID Drive)."""
import json, glob, os
R = os.path.join(os.path.dirname(__file__), '..')
files = json.load(open(os.path.join(R, 'src/data/_legacy/yandex-files.json')))
ids = json.load(open(os.path.join(R, 'src/data/_legacy/drive-ids.json')))
mp = {f['yandex']: 'https://drive.google.com/file/d/%s/view?usp=sharing' % ids[f['file']] for f in files if f['file'] in ids}
changed = 0
for p in glob.glob(os.path.join(R, 'src/data/pages/*.json')):
    if os.path.basename(p).startswith('_'): continue
    d = json.load(open(p, encoding='utf-8')); orig = json.dumps(d, ensure_ascii=False)
    for fld in ('ru', 'ro'):
        if d.get(fld):
            for a, b in mp.items(): d[fld] = d[fld].replace('"%s"' % a, '"%s"' % b)
    if json.dumps(d, ensure_ascii=False) != orig:
        json.dump(d, open(p, 'w', encoding='utf-8'), ensure_ascii=False); changed += 1
left = sorted({f['file'] for f in files if f['file'] not in ids})
print('linkuri mapate:', len(mp), '| pagini modificate:', changed, '| fără Drive încă:', len(left))
