"""Generează src/data/pages/_index.json: cale → cheie, din fișierele src/data/pages/*.json."""
import json, glob, os
D = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'pages')
idx = {}
for f in sorted(glob.glob(os.path.join(D, '*.json'))):
    if os.path.basename(f).startswith('_'): continue
    d = json.load(open(f))
    p = '/' + d['path'].strip('/')
    idx[p] = d['key']
json.dump(idx, open(os.path.join(D, '_index.json'), 'w'), ensure_ascii=False, indent=0)
print(len(idx), 'pages')
