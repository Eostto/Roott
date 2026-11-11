"""Izolează CSS-ul original roott.ru sub clasa .legacy → public/legacy/roott.css.
Listează imaginile din url(...) în src/data/_legacy/css-images.json (pentru descărcare)."""
import json, os, re, posixpath
ROOT = os.path.join(os.path.dirname(__file__), '..')
SRC = os.path.join(ROOT, 'src/data/_legacy/css')
OUT = os.path.join(ROOT, 'public/legacy/roott.css')
PREFIX = '.legacy'
ORDER = ['nice-select.css', 'hystmodal.min.css', 'template_8959635397e7d0f353d2cf2dea3334fa_v1.css', 'page_5041e0b3760d5be8f2c670f9ed774273_v1.css', 'inline.css']

def map_url(u, base):
    u = u.strip().strip('"\'')
    if not u or u.startswith(('data:', 'http:', 'https:', '//', '#')): return None, u
    if not u.startswith('/'): u = posixpath.join(base, u)
    u = posixpath.normpath(u)
    u = u.split('?')[0].split('#')[0]
    return u, local(u)

def local(u):
    if u.startswith('/upload/'): return '/images/roott' + u
    if u.startswith('/local/templates/trate/'): return '/images/roott/tpl/' + u[len('/local/templates/trate/'):]
    return '/images/roott/site' + u

def split_top(sel):
    parts, depth, cur = [], 0, ''
    for ch in sel:
        if ch in '([': depth += 1
        elif ch in ')]': depth -= 1
        if ch == ',' and depth == 0: parts.append(cur); cur = ''
        else: cur += ch
    parts.append(cur)
    return [p.strip() for p in parts if p.strip()]

def scope_sel(s):
    s2 = re.sub(r'^(html\s*)?(body)?', '', s).strip() if re.match(r'^(html|body)\b', s) else None
    if s2 is not None:
        return PREFIX + (' ' + s2 if s2 and not s2.startswith(('>', ':', '.', '[')) else s2 or '')
    if s.startswith(':root'): return PREFIX + s[5:]
    if s.startswith('*'): return PREFIX + ' ' + s
    return PREFIX + ' ' + s

def match_brace(css, i):
    depth = 0
    for j in range(i, len(css)):
        if css[j] == '{': depth += 1
        elif css[j] == '}':
            depth -= 1
            if depth == 0: return j
    return len(css) - 1

def scope(css):
    out, i, n = [], 0, len(css)
    while i < n:
        while i < n and css[i] in ' \t\r\n': i += 1
        if i >= n: break
        if css[i] == '@':
            j = i
            while j < n and css[j] not in '{;': j += 1
            head = css[i:j].strip()
            if j >= n or css[j] == ';':
                if not head.startswith(('@import', '@charset')): out.append(head + ';')
                i = j + 1; continue
            k = match_brace(css, j)
            inner = css[j + 1:k]
            name = re.match(r'@([a-zA-Z-]+)', head).group(1).lower()
            if name in ('media', 'supports', 'container', 'layer', 'document'):
                out.append(head + '{' + scope(inner) + '}')
            else:
                out.append(head + '{' + inner + '}')
            i = k + 1
        else:
            j = css.find('{', i)
            if j < 0: break
            sel = css[i:j]
            k = match_brace(css, j)
            body = css[j + 1:k]
            sels = [scope_sel(s) for s in split_top(sel)]
            out.append(','.join(sels) + '{' + body + '}')
            i = k + 1
    return '\n'.join(out)

all_css, imgs = [], {}
for name in ORDER:
    p = os.path.join(SRC, name)
    if not os.path.exists(p): continue
    raw = open(p, encoding='utf-8').read()
    m = re.match(r'/\* (\S+) \*/', raw)
    src_path = m.group(1) if m else '/'
    base = posixpath.dirname(src_path.split('?')[0])
    raw = re.sub(r'/\*.*?\*/', '', raw, flags=re.S)
    def rep(mm):
        orig, loc = map_url(mm.group(1), base)
        if orig: imgs[orig] = loc
        return 'url("%s")' % loc
    raw = re.sub(r'url\(\s*([^)]+?)\s*\)', rep, raw)
    raw = re.sub(r"font-family:\s*(['\"]?)Open Sans\1", "font-family:var(--font-open-sans),'Open Sans'", raw)
    all_css.append('/* ' + name + ' */\n' + scope(raw))

extra = '''
/* ajustări pentru Next.js */
.legacy{font-family:var(--font-open-sans),'Open Sans',Arial,sans-serif;font-size:14px;line-height:20px;color:#000}
.legacy img{max-width:100%}
.legacy .swiper{overflow:hidden}
.legacy .swiper-wrapper{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}
.legacy .swiper-wrapper::-webkit-scrollbar{display:none}
.legacy .swiper-slide{flex-shrink:0;scroll-snap-align:start}
.legacy [data-hystmodal]{cursor:pointer}
'''
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf-8').write('\n'.join(all_css) + extra)
json.dump(imgs, open(os.path.join(ROOT, 'src/data/_legacy/css-images.json'), 'w'), indent=0)
print('css bytes', os.path.getsize(OUT), 'url images', len(imgs))
