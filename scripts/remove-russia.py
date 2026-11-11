"""Scoate conținutul legat de Rusia din paginile copiate (idempotent; lucrează pe `ru`, apoi rulați legacy-i18n.py apply).

- mută paginile rusești (cursuri Moscova, centru instruire, laborator, promoții, evenimente Moscova, dealer) în _arhiva-dev/pages
- scoate cardurile lor din liste, linkurile spre rețelele rusești, adaptează „Despre noi”
"""
import json, glob, os, re, shutil
R = os.path.join(os.path.dirname(__file__), '..')
P = os.path.join(R, 'src/data/pages')
ARH = os.path.join(R, '_arhiva-dev/pages')
os.makedirs(ARH, exist_ok=True)

REMOVE_PREFIX = ('events', 'specialist__doctors-training-center', 'stock')
REMOVE = {'about__laboratory', 'dealer', 'about__news__roott_na_dental_ekspo_2026', 'about__news__roott_na_simpoziume_kvintessentsii_2026',
          'sobytiya__dental-salon-2025-57-y-moskovskiy-mezhdunarodnyy-stomatologicheskiy-forum-i-vystavka-21-24-aprelya-2',
          'sobytiya__roott-na-dental-ekspo-2026', 'sobytiya__roott-na-simpoziume-kvintessentsii-2026'}

removed_paths = set()
for f in glob.glob(os.path.join(P, '*.json')):
    k = os.path.basename(f)[:-5]
    if k.startswith('_'): continue
    if k in REMOVE or k.startswith(REMOVE_PREFIX):
        d = json.load(open(f, encoding='utf-8')); removed_paths.add('/' + k.replace('__', '/'))
        shutil.move(f, os.path.join(ARH, os.path.basename(f)))
# și cele mutate la rulări anterioare
for f in glob.glob(os.path.join(ARH, '*.json')):
    removed_paths.add('/' + os.path.basename(f)[:-5].replace('__', '/'))

def enclosing(h, pos, tag, cls):
    """(start, end) al elementului <tag class="...cls..."> care conține poziția pos (tag-uri echilibrate)."""
    start = pos
    while True:
        start = h.rfind('<' + tag, 0, start)
        if start < 0: return None
        head = h[start:h.find('>', start) + 1]
        if re.search(r'class="[^"]*\b%s\b' % re.escape(cls), head): break
    depth, i = 0, start
    rx = re.compile(r'<(/?)%s\b[^>]*>' % tag)
    for m in rx.finditer(h, start):
        depth += -1 if m.group(1) else 1
        if depth == 0: return start, m.end()
    return None

def drop_cards(h, tag, cls):
    for p in sorted(removed_paths, key=len, reverse=True):
        while True:
            i = h.find('href="{{L}}%s"' % p)
            if i < 0: break
            e = enclosing(h, i, tag, cls)
            if not e: break
            h = h[:e[0]] + h[e[1]:]
    return h

def drop_li(h, marker):
    i = h.find(marker)
    if i < 0: return h
    s = h.rfind('<li', 0, i); e = h.find('</li>', i)
    return h[:s] + h[e + 5:] if s >= 0 and e >= 0 else h

SOCIAL = r'\s*<a\b[^>]*href="https://(?:vk\.com|dzen\.ru|rutube\.ru|www\.youtube\.com/channel/UC_hV_e3rmGeVpkdxKtKUHKw|www\.instagram\.com/roott\.ru)[^"]*"[^>]*>.*?</a>'

ABOUT = [
    ('<a href="{{L}}/dealer" class="about-btn about-btn-secondary">Стать партнером ROOTT</a>', '<a href="{{L}}/ambassador" class="about-btn about-btn-secondary">Стать амбассадором ROOTT</a>'),
    ('<p>Обучение, сотрудничество и зуботехнический центр ROOTT.</p>', '<p>Сотрудничество, клинические материалы и цифровые решения ROOTT.</p>'),
    ('<h3>Работа с клиниками и дилерами</h3>', '<h3>Программа врачей-амбассадоров</h3>'),
    ('<p>Заказы для клиник и условия дилерства. Обучение команды, маркетинговые материалы и сопровождение региональных партнёров.</p>', '<p>Для имплантологов Молдовы, работающих с ROOTT: обучение, совместные клинические случаи и особые условия.</p>'),
    ('<a href="{{L}}/dealer">Условия дилерства →</a>', '<a href="{{L}}/ambassador">Стать амбассадором →</a>'),
]
ABOUT_RE = [
    (r'<h3>Я хочу стать партнёром</h3>\s*<p><b>Условия сотрудничества</b></p>\s*<p>Регион, формат партнёрства и запуск продаж\.</p>\s*<a href="\{\{L\}\}/dealer" class="about-btn about-btn-primary">Стать дилером →</a>',
     '<h3>Я хочу стать амбассадором</h3> <p><b>Программа врачей-амбассадоров</b></p> <p>Обучение, клинические случаи и особые условия.</p> <a href="{{L}}/ambassador" class="about-btn about-btn-primary">Стать амбассадором →</a>'),
]
ABOUT_LI = ['Выход ROOTT на российский рынок', 'Открытие собственного учебного центра', '<h3>Зуботехнический центр</h3>',
            'Курсы с практикующими специалистами.', 'в учебном центре ROOTT в Москве', '<h3>Зуботехническая поддержка</h3>']

# Articole: fără Moscova / clinici moscovite / prețuri din clinici rusești
ARTICLES = {
    'about__news__implantatsiya_2_zubov': [
        (r'Мнение врача что выбрать\. Стоимость проведения имплантации в клиниках Москвы\.', 'Мнение врача что выбрать. Стоимость имплантации.'),
        (r'<p>\s*В клиниках Москвы минимальная стоимость операции от [^<]*</p>', ''),
    ],
    'about__news__mikroprotezirovanie_zubov': [
        (r'<h2>Куда обратиться[^<]*</h2>.*?(?=</div>\s*<div class="keys_detail__photos">)', ''),
    ],
    'about__news__polnaya_implantatsiya_pri_otsutstvii_vsekh_zubov_tekhnologiya_all_on_8': [
        (r'Стоимость имплантации «All-on-8» в Москве', 'Стоимость имплантации «All-on-8»'),
        (r'Все зубы на 8 имплантах пациенты реконструируют в клиниках Москвы по разным ценам\.', 'Стоимость восстановления всех зубов на 8 имплантах может различаться.'),
        (r'<h2>Куда обратиться[^<]*</h2>.*?(?=</div>\s*<div class="keys_detail__photos">)', ''),
    ],
    'about__news__protezirovanie_na_implantakh': [
        (r'<a href="https://trate-ag\.ru/[^"]*">(.*?)</a>', r'\1'),
        (r'Стоимость проведения имплантации в клиниках Москвы', 'Стоимость проведения имплантации'),
        (r'В среднем, имплантация в Москве стоит [^.]*\.\s*В любом случае, точная', 'Точная'),
    ],
    'articles__implantatsiya-zubov-s-otsrochennoy-nagruzkoy': [
        (r'в клиниках Москвы варьируется', 'варьируется'),
        (r'<p>\s*Средняя стоимость установки одного имплантата с отсроченной нагрузкой в столичных стоматологиях[^<]*</p>', ''),
    ],
    'articles__shveytsarskie-implanty': [
        (r'В современной России швейцарские', 'Сегодня швейцарские'),
        (r'Недостатки: малая распространенность в регионах России\. Обычно установкой таких корней занимаются аффилированные клиники в крупных городах, впрочем, сейчас имеется множество возможностей для помощи пациентов из регионов в стоматологиях Москвы и других городов\.',
         'Недостатки: меньшая распространенность. Обычно установкой таких корней занимаются клиники в крупных городах.'),
    ],
}

n = 0
for f in glob.glob(os.path.join(P, '*.json')):
    if os.path.basename(f).startswith('_'): continue
    d = json.load(open(f, encoding='utf-8')); h0 = h = d['ru']
    h = drop_cards(h, 'div', 'events__item')
    h = drop_cards(h, 'a', 'news__item')
    h = re.sub(SOCIAL, '', h, flags=re.S)
    h = re.sub(r'(<option[^>]*>)\s*Я хотел бы стать дилером\s*(</option>)', r'\1Я хотел бы стать врачом-амбассадором ROOTT\2', h)
    if d['key'] == 'about__about-us':
        for a, b in ABOUT: h = h.replace(a, b)
        for a, b in ABOUT_RE: h = re.sub(a, b, h)
        for mk in ABOUT_LI: h = drop_li(h, mk)
    t0 = (d.get('title'), d.get('desc'))
    for a, b in ARTICLES.get(d['key'], []):
        h = re.sub(a, b, h, flags=re.S)
        d['title'] = re.sub(a, b, d.get('title') or ''); d['desc'] = re.sub(a, b, d.get('desc') or '')
    if h != h0 or t0 != (d.get('title'), d.get('desc')):
        d['ru'] = h; d.pop('ro', None); n += 1
        json.dump(d, open(f, 'w', encoding='utf-8'), ensure_ascii=False)
print('pagini scoase:', len(removed_paths), '| pagini modificate:', n)
json.dump(sorted(removed_paths), open(os.path.join(R, '_arhiva-dev/removed-paths.json'), 'w'), indent=1)
