"""Paginile „Garanție și returnare” și „Certificate”, după roott.dental (TRATE AG), în RO și RU.
Rulare: python3 scripts/roott-dental-pages.py  → actualizează src/data/pages/about__*.json"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF = "/files/roott/docs/ROOTT-politica-garantie-si-returnare.pdf"
F_IMPLANT = "https://trate.com/warranty-and-return-form/"
F_INSTR = "https://trate.com/instrument-complaint-form/"
EMAIL = "dentonemd@gmail.com"

T = {
"ro": dict(
 home="Acasă", about="Despre companie", title="Garanția și returnarea produselor ROOTT",
 lead="Angajamentul nostru pentru excelența chirurgicală este susținut de o garanție globală, solidă și transparentă. Garantăm rezistența materialului și stabilitatea clinică a fiecărui produs ROOTT.",
 b_claim="Formular de reclamație", b_cond="Condițiile de garanție", pdf_link="Politica de garanție și returnare TRATE AG · PDF",
 h_terms="Termenele și condițiile garanției",
 c1=("Pe viață","Garanție pentru produse","Dacă se confirmă utilizarea conform instrucțiunii de utilizare, indicațiilor și contraindicațiilor."),
 c2=("12 luni","Pentru schimb","De la data facturii, pentru produse neutilizate, cu termen de valabilitate rămas de cel puțin 6 luni."),
 c3=("3 luni","Pentru notificare","Solicitarea de garanție se depune în cel mult trei luni de la producerea cazului."),
 what="Ce s-a întâmplat?", what_p="Alegeți situația pentru a vedea condițiile și pașii de urmat.",
 tabs=("A fost depistat un defect","Vreau să schimb","Depune o reclamație"),
 t1_h="Ați depistat un defect al produsului?",
 t1_p="Această politică se aplică tuturor produselor fabricate de TRATE AG (ROOTT). Dacă un produs este defect din cauza unei deficiențe de rezistență și stabilitate a materialului în perioada de garanție, TRATE înlocuiește produsul cu unul identic sau substanțial echivalent. Politica acoperă doar înlocuirea produselor, nu și costurile asociate, inclusiv tratamentul.",
 t1_ok_h="Condițiile de garanție (toate trebuie îndeplinite și documentate)",
 t1_ok=["Componentele sistemului ROOTT au fost utilizate conform instrucțiunii de utilizare, indicațiilor, condițiilor și contraindicațiilor descrise de producător",
        "Produsele au fost utilizate exclusiv, fără combinare cu produse ale altor producători",
        "Solicitarea de garanție este depusă în cel mult trei luni de la producerea cazului",
        "Cererea include numărul LOT al tuturor dispozitivelor"],
 t1_no_h="Ce nu constituie caz de garanție",
 t1_no=["Implantarea la un pacient cu contraindicații absolute","Accident, traumatism sau altă deteriorare cauzată de pacient sau de terți","Combinarea cu produse ale altor producători"],
 t1_no_p="Lipsa numărului LOT, a altor informații necesare sau nereturnarea dispozitivelor originale poate duce la anularea garanției.",
 t1_foot="Notificați cazul în cel mult 3 luni", t1_btn="Formular de reclamație (implant)",
 t2_h1="Verificați condițiile de schimb", t2_p1="Bifați punctele care sunt îndeplinite pentru produsul dvs.", t2_h2="Verificați 0 puncte", t2_h3="CONDIȚII VERIFICATE",
 t2_cb=["Produsul nu a fost utilizat","De la data facturii au trecut cel mult 12 luni","Până la expirarea termenului de valabilitate au rămas cel puțin 6 luni","Ambalajul original nu a fost deschis","Ambalajul nu este deteriorat","Pe ambalaj nu există marcaje"],
 t2_num="luni de la data facturii", t2_with="Cu ce se poate face schimbul", t2_with_p="Cu produse identice sau de valoare egală ori mai mare.",
 t2_info="În orice caz, Formularul de garanție și returnare (anexa la politică) se completează și se trimite împreună cu produsele.",
 t2_more="Implanturile cu termen de sterilizare expirat pot fi schimbate dacă notificarea se trimite cu 7 luni înainte de expirare, cu numărul LOT și cantitatea. Implanturile cu conținutul ambalajului compromis (implant în afara suportului verde) pot fi schimbate dacă notificarea se trimite imediat după livrare.",
 t2_btn="Descarcă politica și formularul",
 t2_q_h="Trebuie clarificate condițiile", t2_q_p1="Unele puncte nu sunt bifate. Verificați data facturii și termenul de valabilitate rămas.", t2_q_p2="Dacă produsul este deteriorat sau a fost depistat un defect, alegeți scenariul corespunzător.",
 t2_q_b1="Contactați-ne", t2_q_b2="A fost depistat un defect",
 t2_ok_h="Puteți trece la perfectare", t2_ok_p1="Conform bifelor dvs., condițiile enumerate sunt îndeplinite. Completați Formularul de garanție și returnare și trimiteți-l împreună cu produsele.", t2_ok_p2="Aceasta este o verificare preliminară. Decizia privind schimbul o ia producătorul.",
 t3_h="Cum se depune o solicitare", t3_p="Pentru garanție, clinicianul sau distribuitorul trebuie să anunțe TRATE AG prin formularul completat.",
 t3_steps=[("01 · Completați formularul","Formularul de reclamație pentru implant sau pentru instrument (online) ori Formularul de garanție și returnare din anexa politicii. Indicați REF, LOT, cantitatea și motivul."),
           ("02 · Pregătiți produsul","Produsul se curăță, se decontaminează și se ambalează astfel încât să nu se deterioreze la transport, conform Instrucțiunii de returnare a produselor."),
           ("03 · Trimiteți-ne solicitarea",f"Trimiteți formularul la {EMAIL}. Vă ajutăm cu transmiterea către producător și cu returnarea produsului.")],
 t3_contact="E-mail pentru reclamații", t3_b1="Formular implant", t3_b2="Formular instrument",
 t3_note="Pentru garanție, contul financiar cu TRATE AG trebuie să fie la zi, iar dispozitivele trebuie instalate conform procedurilor TRATE (inclusiv instrucțiunea de utilizare) și practicii medicale/stomatologice acceptate.",
 h_before="Înainte de adresare", prep_h="Ce trebuie pregătit",
 prep=[("Datele de contact","Clinica sau compania, numele complet, telefonul."),("Datele despre produse","Codul REF, numărul LOT (obligatoriu), cantitatea și termenul de valabilitate."),("Motivul solicitării","Descrierea cazului și dacă produsul a fost utilizat."),("Formularul completat","Formularul de garanție și returnare sau formularul online de reclamație.")],
 prep_info="Numărul LOT al tuturor dispozitivelor este obligatoriu pentru orice solicitare de garanție.",
 used_h="Dacă produsul a fost utilizat",
 used_p1="Urmați procedura de curățare, decontaminare, ambalare și etichetare din Instrucțiunea de returnare a produselor înainte de a-l trimite.",
 inc_h="Incident suspectat",
 inc_p="Distribuitorii, medicii și pacienții care află despre un incident suspectat legat de produsele ROOTT trebuie să-l transmită imediat producătorului, prin „Contact us” pe trate.com sau la Customer Service <a href=\"tel:+41414500101\">+41 41 450 01 01</a>. Ne puteți anunța și pe noi la <a href=\"tel:+37379660008\">+373 (79) 660-008</a>.",
 inc_btn="Contacte",
 h_faq="Întrebări frecvente",
 faq1=[("Pentru ce termen este valabilă garanția?","Pe viață, dacă se dovedește că componentele ROOTT au fost utilizate conform instrucțiunii de utilizare, indicațiilor și contraindicațiilor."),
       ("Când trebuie anunțat cazul de garanție?","În cel mult trei luni de la producerea cazului. Incidentele suspectate se anunță imediat."),
       ("Ce acoperă garanția?","Doar înlocuirea produsului cu unul identic sau substanțial echivalent, nu și costurile asociate, inclusiv tratamentul.")],
 faq2=[("Se poate schimba un produs neutilizat?","Da, în termen de 12 luni de la data facturii, pe un produs de valoare egală sau mai mare, cu termen de valabilitate rămas de cel puțin 6 luni, în ambalajul original nedeschis, nedeteriorat și nemarcat."),
       ("Unde se aplică garanția?","Garanția se aplică în toată lumea pentru produsele fabricate de TRATE AG."),
       ("Se poate modifica politica?","TRATE poate modifica sau anula politica oricând; modificările nu afectează garanția pentru produsele implantate înainte de data modificării.")],
 faq_info="Aceasta este singura garanție oferită de TRATE AG. Producătorul exclude orice altă garanție, expresă sau implicită, precum și răspunderea pentru câștiguri pierdute și daune directe, indirecte, colaterale sau consecutive.",
 h_docs="Documente",
 d1=("PDF · 5 pagini","Politica de garanție și returnare","Instrucțiunea TRATE AG nr. 16.22.000.04, cu anexa „Formular de garanție și returnare”.","Deschide politica"),
 d2=("Online · trate.com","Formulare de reclamație","Formularul de reclamație pentru implanturi și cel pentru instrumente, pe site-ul producătorului.","Formular implant","Formular instrument"),
 f_title="Suport ROOTT", f_h="Aveți nevoie de ajutor cu garanția sau schimbul?", f_p="Contactați-ne dacă trebuie clarificate condițiile sau modul de depunere a reclamației.",
 f_b1="Politica completă", f_b2="Formular de reclamație", f_c1="Reclamații și întrebări", f_c2="Dent One Group, Chișinău", f_c3="Producător (TRATE AG, Elveția)",
 f_p2="Despre incidente anunțați imediat producătorul sau pe noi.", f_btn="Deschide contactele",
),
"ru": dict(
 home="Главная", about="О компании", title="Гарантия и возврат продукции ROOTT",
 lead="Наша приверженность хирургическому совершенству подкреплена надёжной и прозрачной глобальной гарантией. Мы гарантируем прочность материала и клиническую стабильность каждого изделия ROOTT.",
 b_claim="Форма рекламации", b_cond="Условия гарантии", pdf_link="Политика гарантии и возврата TRATE AG · PDF",
 h_terms="Сроки и условия гарантии",
 c1=("Пожизненно","Гарантия на продукцию","Если подтверждено применение в соответствии с инструкцией, показаниями и противопоказаниями."),
 c2=("12 месяцев","На обмен","С даты счёта, для неиспользованных изделий с остаточным сроком годности не менее 6 месяцев."),
 c3=("3 месяца","На уведомление","Гарантийный запрос подаётся не позднее трёх месяцев после возникновения случая."),
 what="Что случилось?", what_p="Выберите ситуацию, чтобы увидеть условия и порядок действий.",
 tabs=("Обнаружен дефект","Хочу обменять","Подать рекламацию"),
 t1_h="Обнаружили дефект изделия?",
 t1_p="Эта политика распространяется на всю продукцию, произведённую TRATE AG (ROOTT). Если изделие оказалось дефектным из-за недостаточной прочности и стабильности материала в течение гарантийного срока, TRATE заменит его таким же или существенно эквивалентным изделием. Политика покрывает только замену изделий, но не связанные с этим расходы, включая лечение.",
 t1_ok_h="Условия гарантии (должны соблюдаться и быть документально подтверждены все)",
 t1_ok=["Компоненты системы ROOTT применялись в соответствии с инструкцией по применению, показаниями, условиями и противопоказаниями производителя",
        "Изделия применялись отдельно, без сочетания с изделиями других производителей",
        "Гарантийный запрос подан не позднее трёх месяцев после возникновения случая",
        "В запросе указан номер LOT всех изделий"],
 t1_no_h="Что не является гарантийным случаем",
 t1_no=["Имплантация пациенту с абсолютными противопоказаниями","Несчастный случай, травма или иное повреждение по вине пациента или третьих лиц","Сочетание с изделиями других производителей"],
 t1_no_p="Отсутствие номера LOT, другой необходимой информации или невозврат оригинальных изделий может привести к аннулированию гарантии.",
 t1_foot="Сообщите о случае не позднее 3 месяцев", t1_btn="Форма рекламации (имплантат)",
 t2_h1="Проверьте условия обмена", t2_p1="Отметьте пункты, которые выполнены для вашего изделия.", t2_h2="Проверьте 0 пунктов", t2_h3="УСЛОВИЯ ПРОВЕРЕНЫ",
 t2_cb=["Изделие не использовалось","С даты счёта прошло не более 12 месяцев","До окончания срока годности осталось не менее 6 месяцев","Оригинальная упаковка не вскрыта","Упаковка не повреждена","На упаковке нет пометок"],
 t2_num="месяцев с даты счёта", t2_with="На что можно обменять", t2_with_p="На такие же изделия или изделия равной либо большей стоимости.",
 t2_info="В любом случае Форма гарантии и возврата (приложение к политике) заполняется и отправляется вместе с изделиями.",
 t2_more="Имплантаты с истёкшим сроком стерильности можно обменять, если уведомление отправлено за 7 месяцев до истечения срока с указанием номера LOT и количества. Имплантаты с нарушенным содержимым упаковки (имплантат вне зелёного держателя) можно обменять, если уведомление отправлено сразу после доставки.",
 t2_btn="Скачать политику и форму",
 t2_q_h="Нужно уточнить условия", t2_q_p1="Некоторые пункты не отмечены. Проверьте дату счёта и остаточный срок годности.", t2_q_p2="Если изделие повреждено или обнаружен дефект, выберите соответствующий сценарий.",
 t2_q_b1="Связаться с нами", t2_q_b2="Обнаружен дефект",
 t2_ok_h="Можно переходить к оформлению", t2_ok_p1="По вашим отметкам перечисленные условия выполнены. Заполните Форму гарантии и возврата и отправьте её вместе с изделиями.", t2_ok_p2="Это предварительная проверка. Решение об обмене принимает производитель.",
 t3_h="Как подать запрос", t3_p="Для получения гарантии врач или дистрибьютор уведомляет TRATE AG, отправив заполненную форму.",
 t3_steps=[("01 · Заполните форму","Онлайн-форма рекламации на имплантат или инструмент либо Форма гарантии и возврата из приложения к политике. Укажите REF, LOT, количество и причину."),
           ("02 · Подготовьте изделие","Изделие очищается, деконтаминируется и упаковывается так, чтобы не повредиться при транспортировке, согласно Инструкции по возврату продукции."),
           ("03 · Отправьте нам запрос",f"Отправьте форму на {EMAIL}. Мы поможем передать её производителю и вернуть изделие.")],
 t3_contact="E-mail для рекламаций", t3_b1="Форма: имплантат", t3_b2="Форма: инструмент",
 t3_note="Для получения гарантии расчёты с TRATE AG должны быть актуальны, а изделия установлены по процедурам TRATE (включая инструкцию по применению) и принятой медицинской/стоматологической практике.",
 h_before="Перед обращением", prep_h="Что нужно подготовить",
 prep=[("Контактные данные","Клиника или компания, ФИО, телефон."),("Данные об изделиях","Код REF, номер LOT (обязательно), количество и срок годности."),("Причина обращения","Описание случая и использовалось ли изделие."),("Заполненная форма","Форма гарантии и возврата или онлайн-форма рекламации.")],
 prep_info="Номер LOT всех изделий обязателен для любого гарантийного запроса.",
 used_h="Если изделие использовалось",
 used_p1="Перед отправкой выполните процедуру очистки, деконтаминации, упаковки и маркировки из Инструкции по возврату продукции.",
 inc_h="Подозрение на инцидент",
 inc_p="Дистрибьюторы, врачи и пациенты, получившие информацию о подозреваемом инциденте, связанном с изделиями ROOTT, должны немедленно сообщить производителю через «Contact us» на trate.com или по телефону службы поддержки <a href=\"tel:+41414500101\">+41 41 450 01 01</a>. Также можно сообщить нам: <a href=\"tel:+37379660008\">+373 (79) 660-008</a>.",
 inc_btn="Контакты",
 h_faq="Частые вопросы",
 faq1=[("На какой срок действует гарантия?","Пожизненно, если доказано, что компоненты ROOTT применялись в соответствии с инструкцией по применению, показаниями и противопоказаниями."),
       ("Когда нужно сообщить о гарантийном случае?","Не позднее трёх месяцев после его возникновения. О подозреваемых инцидентах сообщают немедленно."),
       ("Что покрывает гарантия?","Только замену изделия таким же или существенно эквивалентным, но не связанные расходы, включая лечение.")],
 faq2=[("Можно ли обменять неиспользованное изделие?","Да, в течение 12 месяцев с даты счёта, на изделие равной или большей стоимости, при остаточном сроке годности не менее 6 месяцев, в оригинальной невскрытой, неповреждённой упаковке без пометок."),
       ("Где действует гарантия?","Гарантия действует во всём мире для продукции, произведённой TRATE AG."),
       ("Может ли политика измениться?","TRATE может изменить или отменить политику в любое время; изменения не влияют на гарантию для изделий, имплантированных до даты изменения.")],
 faq_info="Это единственная гарантия, предоставляемая TRATE AG. Производитель исключает любые иные гарантии, явные или подразумеваемые, а также ответственность за упущенную выгоду и прямой, косвенный, сопутствующий или последующий ущерб.",
 h_docs="Документы",
 d1=("PDF · 5 страниц","Политика гарантии и возврата","Инструкция TRATE AG № 16.22.000.04 с приложением «Форма гарантии и возврата».","Открыть политику"),
 d2=("Онлайн · trate.com","Формы рекламации","Форма рекламации на имплантаты и форма на инструменты на сайте производителя.","Форма: имплантат","Форма: инструмент"),
 f_title="Поддержка ROOTT", f_h="Нужна помощь с гарантией или обменом?", f_p="Свяжитесь с нами, если нужно уточнить условия или порядок подачи рекламации.",
 f_b1="Полная политика", f_b2="Форма рекламации", f_c1="Рекламации и вопросы", f_c2="Dent One Group, Кишинёв", f_c3="Производитель (TRATE AG, Швейцария)",
 f_p2="Об инцидентах сообщайте немедленно производителю или нам.", f_btn="Открыть контакты",
)}


def warranty(t):
    li = lambda xs: "".join(f"<li>{x}</li>" for x in xs)
    ext = 'target="_blank" rel="noopener"'
    return f"""<div class="guarantee">
	<div class="guarantee-banner"><div class="container"><div class="guarantee-banner__row">
		<div class="guarantee-banner__main">
			<div class="breadcrumb"><ol itemscope="" itemtype="https://schema.org/BreadcrumbList">
				<li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem"><a href="{{{{L}}}}" itemprop="item"><span itemprop="name">{t['home']}</span></a></li>
				<li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem"><a href="{{{{L}}}}/about" itemprop="item"><span itemprop="name">{t['about']}</span></a></li>
				<li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem"><span itemprop="name">{t['title']}</span></li>
			</ol></div>
			<h1>{t['title']}</h1>
			<p>{t['lead']}</p>
			<div class="guarantee-banner__btns">
				<a href="{F_IMPLANT}" {ext} class="guarantee-btn guarantee-btn-primary">{t['b_claim']}</a>
				<a href="#section-1" class="guarantee-btn guarantee-btn-secondary">{t['b_cond']}</a>
			</div>
			<a href="{PDF}" target="_blank" class="guarantee-banner__link">{t['pdf_link']}</a>
		</div>
		<div class="guarantee-banner__img"><img src="/images/roott/docs/warranty-banner.webp" fetchpriority="high" alt="ROOTT" width="1024" height="1024"></div>
	</div></div></div>
	<div class="container">
		<div class="guarantee-section-1">
			<h2>{t['h_terms']}</h2>
			<div id="section-1" class="guarantee-section-1__wrapper">
				<ul class="guarantee-section-1__ul">
					{''.join(f'<li><h3>{a}</h3><p><b>{b}</b></p><p>{c}</p></li>' for a,b,c in (t['c1'],t['c2'],t['c3']))}
				</ul>
				<h3>{t['what']}</h3>
				<p>{t['what_p']}</p>
				<ul class="guarantee-section-1__tabs js-tabs-btn">
					<li class="active">{t['tabs'][0]}</li><li>{t['tabs'][1]}</li><li>{t['tabs'][2]}</li>
				</ul>
				<ul class="guarantee-section-1__content js-tabs-content">
					<li class="active">
						<h3>{t['t1_h']}</h3>
						<p>{t['t1_p']}</p>
						<div class="guarantee-section-1-tab-1__row">
							<div class="guarantee-section-1-tab-1__item-1"><h4>{t['t1_ok_h']}</h4><ul class="guarantee-section-1-tab-1__ul-1">{li(t['t1_ok'])}</ul></div>
							<div class="guarantee-section-1-tab-1__item-2"><h4>{t['t1_no_h']}</h4><ul class="guarantee-section-1-tab-1__ul-2">{li(t['t1_no'])}</ul><p>{t['t1_no_p']}</p></div>
						</div>
						<div class="guarantee-section-1-tab-1__footer">
							<div>{t['t1_foot']}</div>
							<a href="{F_IMPLANT}" {ext} class="guarantee-btn guarantee-btn-primary">{t['t1_btn']}</a>
						</div>
					</li>
					<li>
						<div class="guarantee-section-1-tab-2__row">
							<div>
								<ul class="guarantee-section-1-tab-2__title">
									<li class="active"><h3>{t['t2_h1']}</h3><p>{t['t2_p1']}</p></li>
									<li><h3>{t['t2_h2']}</h3></li>
									<li><h3>{t['t2_h3']}</h3></li>
								</ul>
								<div class="guarantee-section-1-tab-2__checkbox">{''.join(f'<label><input type="checkbox">{x}</label>' for x in t['t2_cb'])}</div>
							</div>
							<ul class="guarantee-section-1-tab-2__ul">
								<li class="guarantee-section-1-tab-2__li-1 active">
									<div class="guarantee-section-1-tab-2__num"><div>12</div><div>{t['t2_num']}</div></div>
									<p><b>{t['t2_with']}</b><br>{t['t2_with_p']}</p>
									<div class="guarantee-info">{t['t2_info']}</div>
									<p>{t['t2_more']}</p>
									<a href="{PDF}" target="_blank" class="guarantee-btn guarantee-btn-primary">{t['t2_btn']}</a>
								</li>
								<li class="guarantee-section-1-tab-2__li-2">
									<div class="guarantee-section-1-tab-2__block">?</div>
									<h3>{t['t2_q_h']}</h3><p>{t['t2_q_p1']}</p><p>{t['t2_q_p2']}</p>
									<div class="guarantee-section-1-tab-2__btns">
										<a href="{{{{L}}}}/contacts" class="guarantee-btn guarantee-btn-primary">{t['t2_q_b1']}</a>
										<a href="{F_IMPLANT}" {ext} class="guarantee-btn guarantee-btn-secondary">{t['t2_q_b2']}</a>
									</div>
								</li>
								<li class="guarantee-section-1-tab-2__li-3">
									<div class="guarantee-section-1-tab-2__block">✓</div>
									<h3>{t['t2_ok_h']}</h3><p>{t['t2_ok_p1']}</p>
									<a href="{PDF}" target="_blank" class="guarantee-btn guarantee-btn-primary">{t['t2_btn']}</a>
									<p>{t['t2_ok_p2']}</p>
								</li>
							</ul>
						</div>
					</li>
					<li>
						<h3>{t['t3_h']}</h3>
						<p>{t['t3_p']}</p>
						<ul class="guarantee-section-1-tab-3__ul">{''.join(f'<li><h3>{a}</h3><p>{b}</p></li>' for a,b in t['t3_steps'])}</ul>
						<div class="guarantee-section-1-tab-3__footer">
							<div class="guarantee-section-1-tab-3__contact"><div>{t['t3_contact']}</div><a href="mailto:{EMAIL}">{EMAIL}</a></div>
							<div class="guarantee-section-1-tab-3__btns">
								<a href="{F_IMPLANT}" {ext} class="guarantee-btn guarantee-btn-primary">{t['t3_b1']}</a>
								<a href="{F_INSTR}" {ext} class="guarantee-btn guarantee-btn-secondary">{t['t3_b2']}</a>
							</div>
						</div>
						<p>{t['t3_note']}</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="guarantee-section-2">
			<h2>{t['h_before']}</h2>
			<div class="guarantee-section-2__row">
				<div class="guarantee-section-2__item-1">
					<h3>{t['prep_h']}</h3>
					<ul class="guarantee-section-2__ul">{''.join(f'<li><div>{a}</div><div>{b}</div></li>' for a,b in t['prep'])}</ul>
					<div class="guarantee-info">{t['prep_info']}</div>
				</div>
				<div class="guarantee-section-2__item-2">
					<h3>{t['used_h']}</h3>
					<p>{t['used_p1']}</p>
					<p><b>{t['inc_h']}</b></p>
					<p>{t['inc_p']}</p>
					<a href="{{{{L}}}}/contacts" class="guarantee-btn guarantee-btn-secondary">{t['inc_btn']}</a>
				</div>
			</div>
		</div>
		<div class="guarantee-section-3">
			<h2>{t['h_faq']}</h2>
			<div class="guarantee-section-3__row">
				<ul class="guarantee-section-3__ul">{''.join(f'<li><div class="js__accordion">{a}</div><div>{b}</div></li>' for a,b in t['faq1'])}</ul>
				<ul class="guarantee-section-3__ul">{''.join(f'<li><div class="js__accordion">{a}</div><div>{b}</div></li>' for a,b in t['faq2'])}</ul>
			</div>
			<div class="guarantee-info">{t['faq_info']}</div>
		</div>
		<div class="guarantee-section-4">
			<h2>{t['h_docs']}</h2>
			<div class="guarantee-section-4__row">
				<div class="guarantee-section-4__item">
					<a href="{PDF}" target="_blank"><img src="/images/roott/docs/warranty.jpg" loading="lazy" decoding="async" alt="{t['d1'][1]}" width="638" height="900"></a>
					<div><div class="guarantee-section-4__title">{t['d1'][0]}</div><h3>{t['d1'][1]}</h3><p>{t['d1'][2]}</p>
					<a href="{PDF}" class="guarantee-btn guarantee-btn-primary" target="_blank">{t['d1'][3]}</a></div>
				</div>
				<div class="guarantee-section-4__item">
					<a href="{F_IMPLANT}" {ext}><img src="/images/roott/upload/guarantee-section-4-1.jpg" loading="lazy" decoding="async" alt="{t['d2'][1]}" width="639" height="900"></a>
					<div><div class="guarantee-section-4__title">{t['d2'][0]}</div><h3>{t['d2'][1]}</h3><p>{t['d2'][2]}</p>
					<a href="{F_IMPLANT}" class="guarantee-btn guarantee-btn-primary" {ext}>{t['d2'][3]}</a>
					<a href="{F_INSTR}" class="guarantee-btn guarantee-btn-secondary" {ext}>{t['d2'][4]}</a></div>
				</div>
			</div>
		</div>
	</div>
	<div class="guarantee-footer"><div class="container"><div class="guarantee-footer__row">
		<div>
			<div class="guarantee-footer__title">{t['f_title']}</div>
			<h2>{t['f_h']}</h2>
			<p>{t['f_p']}</p>
			<div class="guarantee-footer__btns">
				<a href="{PDF}" class="guarantee-btn guarantee-btn-primary" target="_blank">{t['f_b1']}</a>
				<a href="{F_IMPLANT}" class="guarantee-btn guarantee-btn-secondary" {ext}>{t['f_b2']}</a>
			</div>
		</div>
		<div>
			<div class="guarantee-footer__contact"><div>{t['f_c1']}</div><a href="mailto:{EMAIL}">{EMAIL}</a></div>
			<div class="guarantee-footer__contact"><div>{t['f_c2']}</div><a href="tel:+37379660008">+373 (79) 660-008</a></div>
			<div class="guarantee-footer__contact"><div>{t['f_c3']}</div><a href="tel:+41414500101">+41 41 450 01 01</a></div>
			<p>{t['f_p2']}</p>
			<a href="{{{{L}}}}/contacts" class="guarantee-btn guarantee-btn-secondary">{t['f_btn']}</a>
		</div>
	</div></div></div>
</div>"""


C = {
"ro": dict(home="Pagina principală", about="Despre companie", title="Certificate",
  lead="Respectăm cele mai înalte standarde de siguranță și calitate în fabricarea dispozitivelor medicale. Mai jos sunt documentele de reglementare și certificările actuale ale producătorului ROOTT – TRATE AG (Elveția).",
  by="TRATE AG este certificată de:",
  nb1=[("Organism notificat","BSI Group America Inc., SUA (membru al BSI Group)"),("Certificare","ISO 13485:2016 (inclusiv cerințele specifice pentru Canada și Australia)"),("Nr. certificat","MDSAP 796894"),("Domeniu","Proiectarea, dezvoltarea, fabricarea și distribuția implanturilor dentare sterile și nesterile, a suprastructurilor și a instrumentelor asociate.")],
  nb2=[("Organism notificat","BSI Group The Netherlands B.V., Țările de Jos (membru al BSI Group), NB nr. 2797"),("Certificare","Sistem de management al calității conform Regulamentului (UE) 2017/745 (MDR)"),("Nr. certificat","MDR 757191 R000"),("Domeniu","Anexa IX, capitolele I și III – pentru introducerea pe piață a dispozitivelor implantabile de clasa III și IIb.")],
  docs=[("ISO 13485:2016 (MDSAP 796894)","Certificat de înregistrare a sistemului de management al calității ISO 13485:2016"),
        ("MDR 757191","Certificatul UE al sistemului de management al calității (Regulamentul UE 2017/745)"),
        ("Free Sale Certificate","Certificat de liberă vânzare emis de Agenția elvețiană pentru produse terapeutice (Swissmedic)")],
  open="Deschide PDF", help_h="Aveți nevoie de un document?", help_p="Pentru declarații de conformitate, instrucțiuni de utilizare sau alte documente pentru licitații și achiziții, contactați-ne.", help_b="Contacte"),
"ru": dict(home="Главная", about="О компании", title="Сертификаты",
  lead="Мы соблюдаем самые высокие стандарты безопасности и качества при производстве медицинских изделий. Ниже — актуальная регуляторная документация и сертификаты производителя ROOTT – TRATE AG (Швейцария).",
  by="TRATE AG сертифицирована:",
  nb1=[("Нотифицированный орган","BSI Group America Inc., США (входит в BSI Group)"),("Сертификация","ISO 13485:2016 (включая особые требования Канады и Австралии)"),("№ сертификата","MDSAP 796894"),("Область","Проектирование, разработка, производство и дистрибуция стерильных и нестерильных дентальных имплантатов, супраструктур и сопутствующих инструментов.")],
  nb2=[("Нотифицированный орган","BSI Group The Netherlands B.V., Нидерланды (входит в BSI Group), NB № 2797"),("Сертификация","Система менеджмента качества по Регламенту (ЕС) 2017/745 (MDR)"),("№ сертификата","MDR 757191 R000"),("Область","Приложение IX, главы I и III – для выпуска на рынок имплантируемых изделий классов III и IIb.")],
  docs=[("ISO 13485:2016 (MDSAP 796894)","Сертификат регистрации системы менеджмента качества ISO 13485:2016"),
        ("MDR 757191","Сертификат ЕС системы менеджмента качества (Регламент ЕС 2017/745)"),
        ("Free Sale Certificate","Сертификат свободной продажи Швейцарского агентства по терапевтической продукции (Swissmedic)")],
  open="Открыть PDF", help_h="Нужен документ?", help_p="Для деклараций соответствия, инструкций по применению или других документов для тендеров и закупок свяжитесь с нами.", help_b="Контакты"),
}
CERT_FILES = [("/files/roott/docs/ROOTT-ISO-13485-MDSAP-796894.pdf", "/images/roott/docs/mdsap.jpg"),
              ("/files/roott/docs/ROOTT-MDR-757191.pdf", "/images/roott/docs/mdr.jpg"),
              ("/files/roott/docs/ROOTT-Free-Sale-Certificate-Swissmedic.pdf", "/images/roott/docs/fsc.jpg")]


def certificates(t):
    nb = lambda rows: "".join(f'<li><div>{a}</div><div>{b}</div></li>' for a, b in rows)
    cards = "".join(
        f"""<div class="guarantee-section-4__item">
					<a href="{pdf}" target="_blank"><img src="{img}" loading="lazy" decoding="async" alt="{h}" width="638" height="900"></a>
					<div><div class="guarantee-section-4__title">PDF</div><h3>{h}</h3><p>{p}</p>
					<a href="{pdf}" class="guarantee-btn guarantee-btn-primary" target="_blank">{t['open']}</a></div>
				</div>""" for (pdf, img), (h, p) in zip(CERT_FILES, t["docs"]))
    return f"""<div class="guarantee">
	<div class="guarantee-banner"><div class="container"><div class="guarantee-banner__row">
		<div class="guarantee-banner__main">
			<div class="breadcrumb"><ol itemscope="" itemtype="https://schema.org/BreadcrumbList">
				<li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem"><a href="{{{{L}}}}" itemprop="item"><span itemprop="name">{t['home']}</span></a></li>
				<li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem"><a href="{{{{L}}}}/about" itemprop="item"><span itemprop="name">{t['about']}</span></a></li>
				<li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem"><span itemprop="name">{t['title']}</span></li>
			</ol></div>
			<h1>{t['title']}</h1>
			<p>{t['lead']}</p>
		</div>
		<div class="guarantee-banner__img"><img src="/images/roott/docs/mdr-badge.webp" alt="MDR" width="288" height="405" style="max-height:340px;width:auto;margin:auto;display:block"></div>
	</div></div></div>
	<div class="container">
		<div class="guarantee-section-2">
			<h2>{t['by']}</h2>
			<div class="guarantee-section-2__row">
				<div class="guarantee-section-2__item-1"><h3>ISO 13485:2016 · MDSAP</h3><ul class="guarantee-section-2__ul">{nb(t['nb1'])}</ul></div>
				<div class="guarantee-section-2__item-1"><h3>MDR (EU) 2017/745</h3><ul class="guarantee-section-2__ul">{nb(t['nb2'])}</ul></div>
			</div>
		</div>
		<div class="guarantee-section-4" id="certificates">
			<div class="guarantee-section-4__row">{cards}</div>
		</div>
	</div>
	<div class="guarantee-footer"><div class="container"><div class="guarantee-footer__row">
		<div><h2>{t['help_h']}</h2><p>{t['help_p']}</p>
			<div class="guarantee-footer__btns"><a href="{{{{L}}}}/contacts" class="guarantee-btn guarantee-btn-primary">{t['help_b']}</a></div></div>
		<div><div class="guarantee-footer__contact"><div>E-mail</div><a href="mailto:{EMAIL}">{EMAIL}</a></div>
			<div class="guarantee-footer__contact"><div>Dent One Group</div><a href="tel:+37379660008">+373 (79) 660-008</a></div></div>
	</div></div></div>
</div>"""


for key, fn, data in [("about__warranty-and-return-policy", warranty, T), ("about__certificates", certificates, C)]:
    p = os.path.join(ROOT, "src/data/pages", key + ".json")
    raw = open(p).read()
    d = json.loads(raw)
    d["ru"] = fn(data["ru"])
    d["ro"] = fn(data["ro"])
    d["title"], d["titleRo"] = data["ru"]["title"], data["ro"]["title"]
    d["desc"], d["descRo"] = data["ru"]["lead"][:160], data["ro"]["lead"][:160]
    json.dump(d, open(p, "w"), ensure_ascii=False, indent=1 if "\n" in raw[:3] else None)
    print("actualizat", key)
