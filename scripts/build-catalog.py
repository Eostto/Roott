"""Construiește src/data/catalog/{catalog,products}.json din datele importate (_*.json)."""
import json, glob, os, re
os.chdir(os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'catalog'))
P = {}
for f in sorted(glob.glob('_products_*.json')): P.update(json.load(open(f)))
L = json.load(open('lines.json'))
RO = json.load(open('_ro.json'))
RO_DET = json.load(open('_ro_details.json'))
LONG = json.load(open('_tr_long.json'))
D, TOK = RO['dict'], RO['tokens']

def ro(s):
    s = (s or '').strip()
    if not s: return s
    if s in D: return D[s]
    out = s
    for a, b in TOK: out = out.replace(a, b)
    return out

def tr(s): return {'ru': (s or '').strip(), 'ro': ro(s)}
def img(u): return ('/images/roott' + u.split('?')[0]) if u else None

H2_IDS = {'Имплантаты': 'implantaty', 'Абатменты': 'abatmenty', 'Трансферы': 'transfery', 'Формирователь десны': 'formirovatel-desny', 'Аналог': 'analog', 'Инструменты': 'instrumenty'}
REL = {'analog': 'analog', 'transferi': 'transfery', 'formirovatel': 'formirovatel-desny', 'abatmeny': 'abatmenty', 'tools': 'instrumenty', 'implants': 'implantaty'}

def pkg_ro(h):
    for a, b in RO['packaging']: h = h.replace(a, b)
    return h

lines_out = []
for l in L['lines']:
    if not l['items']: continue
    hero = l['hero']
    blocks = []
    for b in l['blocks']:
        if b['type'] in ('h1', 'h2', 'h3', 'h4', 'p'):
            blocks.append({'type': b['type'], 'text': tr(b['text']), 'id': b.get('id') or (H2_IDS.get(b['text']) if b['type'] == 'h2' else None)})
        elif b['type'] == 'table':
            blocks.append({'type': 'table', 'lengths': [ro(x) for x in b['lengths']], 'rows': b['rows']})
        else:
            blocks.append(b)
    lines_out.append({
        'slug': l['slug'], 'title': l['title'],
        'hero': {'logo': img(hero['logo']), 'img1': img(hero['img1']), 'img2': img(hero['img2']), 'title': tr(hero['title']),
                 'text': {'ru': re.sub(r'<[^>]+>', ' ', hero['textHtml']).strip(), 'ro': RO['heroText'].get(l['slug'], '')},
                 'btn': hero['btn']} if hero else None,
        'blocks': blocks,
        'items': {k: {'name': v['name'], 'caption': tr(v['caption']), 'thumb': img(v['thumb'])} for k, v in l['items'].items()},
    })
menu = [{'line': m['line'], 'slug': m['href'].strip('/').split('/')[-1], 'subs': [{'t': tr(s['t']), 'anchor': s['href'].split('#')[-1], 'lvl': s['lvl']} for s in m['subs']]} for m in L['menu']]
json.dump({'menu': menu, 'lines': lines_out}, open('catalog.json', 'w'), ensure_ascii=False, separators=(',', ':'))

det_ru = LONG['details']; det_ro = RO_DET
pkg_ru = LONG['packaging']; pkg_ro_list = [pkg_ro(h) for h in pkg_ru]
caps = {k: v for l in L['lines'] for k, v in l['items'].items()}
ids = set(P.keys())
prods = {}
for k, p in P.items():
    props = []
    for lab, val in p['props']:
        if lab == 'Фильтр': continue
        props.append({'l': tr(lab), 'v': tr(val) if lab != 'Артикул' else {'ru': val, 'ro': val}})
    prods[k] = {
        'id': int(k), 'line': p['lines'][0], 'lines': p['lines'], 'name': p['name'],
        'price': round(p['priceRub'] / 100, 2) if p['priceRub'] else None,
        'props': props,
        'sizes': [{'n': s['n'], 'id': s['id']} for s in p['sizes'] if str(s['id']) in ids],
        'image': img(p['images'][0]) if p['images'] else img(caps.get(k, {}).get('thumb')),
        'thumb': img(caps.get(k, {}).get('thumb')),
        'caption': tr(caps.get(k, {}).get('caption', '')),
        'd': det_ru.index(p['details']['html']) if p['details'] and p['details']['html'] else None,
        'p': pkg_ru.index(p['packaging']['html']) if p['packaging'] and p['packaging']['html'] else None,
        'video': p['video'],
        'related': [{'anchor': REL.get(r['href'].split('section=')[1].split('&')[0], ''), 'img': img(r['img']), 't': tr(r['t'])} for r in p['related']],
    }
json.dump({'texts': {'details': {'ru': det_ru, 'ro': det_ro}, 'packaging': {'ru': pkg_ru, 'ro': pkg_ro_list}}, 'products': prods},
          open('products.json', 'w'), ensure_ascii=False, separators=(',', ':'))
print('lines', len(lines_out), 'products', len(prods), 'catalog.json', os.path.getsize('catalog.json'), 'products.json', os.path.getsize('products.json'))
untr = sorted({ro(v) for p in prods.values() for pr in p['props'] for v in [pr['v']['ru']] if re.search('[а-яА-Я]', ro(v))})
print('untranslated prop values:', untr[:30])
untr2 = sorted({p['caption']['ro'] for p in prods.values() if re.search('[а-яА-Я]', p['caption']['ro'])})
print('untranslated captions:', untr2[:30])
