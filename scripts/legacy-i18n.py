"""Traducerea paginilor copiate (src/data/pages/*.json) în română.

  python3 scripts/legacy-i18n.py extract KEY [KEY...]   → listează frazele netraduse (numerotate)
  python3 scripts/legacy-i18n.py add FILE               → adaugă traducerile „N|text” în memoria de traducere
  python3 scripts/legacy-i18n.py apply [KEY...]         → generează versiunea „ro” a paginilor
"""
import html, json, os, re, sys
from html.parser import HTMLParser

ROOT = os.path.join(os.path.dirname(__file__), '..')
PAGES = os.path.join(ROOT, 'src/data/pages')
I18N = os.path.join(ROOT, 'src/data/_i18n')
TM_PATH = os.path.join(I18N, 'tm.json')
PENDING = os.path.join(I18N, '_pending.json')
CYR = re.compile('[А-Яа-яЁё]')
ATTRS = ('alt', 'title', 'placeholder', 'aria-label', 'value', 'data-title')
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'}

def norm(s): return ' '.join(s.split())

def load_tm():
    return json.load(open(TM_PATH, encoding='utf-8')) if os.path.exists(TM_PATH) else {}

class Walker(HTMLParser):
    def __init__(self, tm=None):
        super().__init__(convert_charrefs=True)
        self.tm, self.out, self.found, self.raw = tm, [], [], 0
    def _tr(self, s):
        k = norm(s)
        if not k or not CYR.search(k): return s
        self.found.append(k)
        if self.tm is None or k not in self.tm: return s
        lead = s[:len(s) - len(s.lstrip())]; trail = s[len(s.rstrip()):]
        return lead + self.tm[k] + trail
    def _attrs(self, tag, attrs):
        parts = []
        for k, v in attrs:
            if v is None: parts.append(k); continue
            if k in ATTRS and not (k == 'value' and tag not in ('input', 'button')): v = self._tr(v)
            parts.append('%s="%s"' % (k, html.escape(v, quote=True)))
        return (' ' + ' '.join(parts)) if parts else ''
    def handle_starttag(self, tag, attrs):
        self.out.append('<%s%s>' % (tag, self._attrs(tag, attrs)))
        if tag in ('style', 'script'): self.raw += 1
    def handle_startendtag(self, tag, attrs):
        self.out.append('<%s%s>' % (tag, self._attrs(tag, attrs)))
    def handle_endtag(self, tag):
        if tag in ('style', 'script'): self.raw = max(0, self.raw - 1)
        if tag not in VOID: self.out.append('</%s>' % tag)
    def handle_data(self, data):
        if self.raw: self.out.append(data); return
        self.out.append(html.escape(self._tr(data), quote=False))
    def handle_comment(self, data): pass
    def handle_decl(self, decl): self.out.append('<!%s>' % decl)

def page(key): return json.load(open(os.path.join(PAGES, key + '.json'), encoding='utf-8'))

def strings_of(p):
    w = Walker(); w.feed(p['ru']); w.close()
    extra = [norm(x) for x in (p.get('title', ''), p.get('desc', '')) if CYR.search(x or '')]
    seen, out = set(), []
    for s in extra + w.found:
        if s not in seen: seen.add(s); out.append(s)
    return out

def cmd_extract(keys):
    tm = load_tm()
    pend = []
    for key in keys:
        for s in strings_of(page(key)):
            if s not in tm and s not in pend: pend.append(s)
    json.dump(pend, open(PENDING, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    for i, s in enumerate(pend): print('%d|%s' % (i, s))
    print('# %d fraze, %d caractere' % (len(pend), sum(map(len, pend))), file=sys.stderr)

def cmd_add(path):
    tm = load_tm(); pend = json.load(open(PENDING, encoding='utf-8'))
    n = 0
    for line in open(path, encoding='utf-8'):
        line = line.rstrip('\n')
        if not line.strip() or '|' not in line: continue
        i, t = line.split('|', 1)
        i = int(i)
        if 0 <= i < len(pend) and t.strip():
            tm[pend[i]] = t.strip(); n += 1
    json.dump(tm, open(TM_PATH, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    missing = [i for i, s in enumerate(pend) if s not in tm]
    print('adăugate', n, '; memorie', len(tm), '; lipsă din lot:', missing[:20])

def cmd_apply(keys):
    tm = load_tm()
    keys = keys or [f[:-5] for f in os.listdir(PAGES) if f.endswith('.json') and not f.startswith('_')]
    for key in keys:
        p = page(key)
        if p.get('custom'): print('%-60s personalizată ✓' % key); continue
        ss = strings_of(p)
        done = sum(1 for s in ss if s in tm)
        if done < len(ss) * 0.98:
            print('%-60s %d/%d — sărit (traducere incompletă)' % (key, done, len(ss))); continue
        w = Walker(tm); w.feed(p['ru']); w.close()
        p['ro'] = ''.join(w.out)
        p['titleRo'] = tm.get(norm(p.get('title', '')), p.get('title', ''))
        p['descRo'] = tm.get(norm(p.get('desc', '')), '')
        json.dump(p, open(os.path.join(PAGES, key + '.json'), 'w', encoding='utf-8'), ensure_ascii=False)
        print('%-60s %d/%d ✓' % (key, done, len(ss)))

if __name__ == '__main__':
    cmd, args = sys.argv[1], sys.argv[2:]
    {'extract': cmd_extract, 'add': lambda a: cmd_add(a[0]), 'apply': cmd_apply}[cmd](args)
