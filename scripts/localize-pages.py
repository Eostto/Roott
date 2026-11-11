"""Adaptează paginile copiate pentru roott.md: datele firmei din Rusia (TRATE, telefon,
e-mail, adresă) → datele roott.md. Rulați după fiecare import; poate fi rulat de mai multe ori."""
import json, glob, os, re
D = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'pages')
GLOBAL = [
    ('tel:+7 (499) 322-44-31', 'tel:+37379660008'), ('tel:+74993224431', 'tel:+37379660008'),
    ('+7 (499) 322-44-31', '+373 (79) 660-008'),
    ('ООО «ТРЕЙТ»', 'roott.md'), ('ООО “ТРЕЙТ”', 'roott.md'), ('ООО "ТРЕЙТ"', 'roott.md'), ('ООО &quot;ТРЕЙТ&quot;', 'roott.md'),
    ('ТРЕЙТ', 'roott.md'), ('TRATE AG', 'ROOTT AG'), ('TRATE', 'ROOTT'),
    ('info@roott.ru', 'dentonemd@gmail.com'), ('info@roott.md', 'dentonemd@gmail.com'), ('ИНН 7715412407', ''),
    ('{{L}}/where-can-buy"', '{{L}}/catalog/roott-r"'), ('{{L}}/catalog/roott-s"', '{{L}}/catalog"'), ('Заказать импланты ROOT<', 'Заказать импланты ROOTT<'),
    ('https://t.me/+Hd-bBWGfROtkNjAy', 'https://t.me/+37379660008'), ('https://chat.whatsapp.com/IVfOT0HoxatKLiVUVuGzbp', 'https://wa.me/37379660008'),
    ('https://t.me/roott_ru', 'https://t.me/+37379660008'),
    ('компании Trate AG', 'компании ROOTT AG'), ('на сайте Trate', 'на сайте roott.md'),
    ('/local/templates/trate/', '/images/roott/tpl/'), ('>roott.ru</a>', '>roott.md</a>'), ('</b>roott.ru</li>', '</b>roott.md</li>'),
]
CONTACTS = [
    (r'<iframe src="https://yandex\.ru/map-widget[^"]*"', '<iframe src="https://www.google.com/maps?q=Chi%C8%99in%C4%83u%2C%20Moldova&amp;z=12&amp;output=embed" loading="lazy"'),
    (r'Юридический адрес:', 'Адрес:'),
    (r'127254, г\. Москва,<br>\s*Огородный проезд, д\. 5, стр\. 6,(&nbsp;|\s)подъезд 4, этаж 5', 'г. Кишинёв, Республика Молдова'),
    (r'<section class="list_predstovitels">.*?</section>', ''),
    (r'г\. Кишинёв, Республика Молдова<br>', 'Dent One Group SRL<br>ул. Николая Зелинского, 7/1, Кишинёв<br>Республика Молдова<br>'),
    (r'q=Chi%C8%99in%C4%83u%2C%20Moldova', 'q=str.%20Nicolai%20Zelinski%207%2F1%2C%20Chi%C8%99in%C4%83u%2C%20Moldova'),
    (r'(<a class="contacts__grid__left__txt__phone" href="tel:\+37379660008">\s*\+373 \(79\) 660-008\s*</a>)(?!<span class="messengers">)', r'\1<span class="messengers" style="display:flex;gap:12px;margin-top:12px"><a href="https://wa.me/37379660008" target="_blank" rel="noopener" style="color:#62b83f;text-decoration:underline">WhatsApp</a><a href="https://t.me/+37379660008" target="_blank" rel="noopener" style="color:#62b83f;text-decoration:underline">Telegram</a></span>'),
]
ABOUT = [
    ('МОСКВА', 'КИШИНЁВ'), ('Огородный проезд, д. 5, стр. 6,', 'Республика Молдова'), ('подъезд 4, этаж 5', ''),
    ('roott.md — официальный представитель ROOTT AG в России.', 'roott.md — дистрибьютор ROOTT AG в Республике Молдова.'),
    ('Официальный представитель ROOTT AG в России', 'Дистрибьютор ROOTT AG в Республике Молдова'),
    ('ROOTT в России', 'ROOTT в Молдове'), ('Поддержка в России', 'Поддержка в Молдове'),
]
PRIVACY = [
    (r'roott\.md \(, ОГРН \d+\), юридический адрес: 127254, г\. Москва, вн\. тер\. г\. муниципальный округ Бутырский, проезд Огородный, д\. 5, стр\. 6, помещение Мансарда', 'roott.md, Республика Молдова'),
]
IMPRESSUM = [
    ('произведенную компанией roott.md', 'произведенную компанией ROOTT AG'),
    ('компанией ООО ROOTT', 'компанией ROOTT AG'),
    ('на всю территорию Российской Федерации и только на продукции, производимую компанией roott.md', 'на всю территорию Республики Молдова и только на продукцию, производимую компанией ROOTT AG'),
    ('roott.mdотказывается', 'roott.md отказывается'), ('roott.mdисключает', 'roott.md исключает'),
]
TITLES = {
    'contacts': ('Контакты roott.md в Молдове', 'Контакты roott.md — дистрибьютора ROOTT в Республике Молдова.'),
}

def cut_contacts(h):
    i = h.find('list_predstovitels')
    if i < 0: return h
    j = h.rfind('<', 0, i)
    return h[:j]

def cut_dealer(h):
    i = h.find('<div class="dealer-section-9">')
    if i < 0: return h
    return h[:i] + h[h.rfind('</div>'):]

# prețuri în ruble → euro (100 ₽ = 1 €)
def _eur(v):
    e = v / 100
    s = '{:,.2f}'.format(e) if e % 1 else '{:,}'.format(int(e))
    return s.replace(',', '\u00a0').replace('.', ',')
def _num(x): return int(re.sub(r'\D', '', x))
NUM = r'(\d{1,3}(?:(?:[ \u00a0]|&nbsp;)\d{3})+|\d+)'
def rub_to_eur(h):
    h = re.sub(NUM + r' тысяч рублей', lambda m: _eur(_num(m.group(1)) * 1000) + ' €', h)
    h = re.sub(NUM + r'\s*-\s*' + NUM + r'(, циркониевая - около )' + NUM + r' руб\.', lambda m: '%s - %s €%s%s €' % (_eur(_num(m.group(1))), _eur(_num(m.group(2))), m.group(3), _eur(_num(m.group(4)))), h)
    h = re.sub(NUM + r'\s*(?:₽|рублей|руб\.)', lambda m: _eur(_num(m.group(1))) + ' €', h)
    return h

n = 0
for f in glob.glob(os.path.join(D, '*.json')):
    if os.path.basename(f).startswith('_'): continue
    d = json.load(open(f, encoding='utf-8'))
    h0 = h = d['ru']
    for a, b in GLOBAL: h = h.replace(a, b)
    h = rub_to_eur(h)
    if d['key'] == 'contacts':
        for a, b in CONTACTS: h = re.sub(a, b, h, flags=re.S)
        h = cut_contacts(h)
    if d['key'] == 'dealer': h = cut_dealer(h)
    if d['key'] == 'about__about-us':
        for a, b in ABOUT: h = h.replace(a, b)
    if d['key'] == 'privacy-policy':
        for a, b in PRIVACY: h = re.sub(a, b, h)
    if d['key'] == 'impressum':
        for a, b in IMPRESSUM: h = h.replace(a, b)
        d['title'] = d['title'].replace('на сайте Trate', 'на сайте roott.md'); d['desc'] = d['desc'].replace('компанией ООО ROOTT', 'компанией ROOTT AG')
    if d['key'] in TITLES: d['title'], d['desc'] = TITLES[d['key']]
    t0 = d['title']
    for a, b in GLOBAL: d['title'] = d['title'].replace(a, b); d['desc'] = d['desc'].replace(a, b)
    d['title'] = rub_to_eur(d['title']); d['desc'] = rub_to_eur(d['desc'])
    if h != h0 or d['title'] != t0:
        d['ru'] = h; d.pop('ro', None); n += 1
        json.dump(d, open(f, 'w', encoding='utf-8'), ensure_ascii=False)
print('pagini modificate:', n)
