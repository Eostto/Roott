import type ro from "./ro";

const ru: typeof ro = {
  meta: {
    title: "Швейцарские импланты ROOTT в Молдове — roott.md",
    description:
      "Швейцарские дентальные импланты ROOTT в Республике Молдова. Системы имплантатов, ортопедические компоненты и хирургические инструменты ROOTT.",
  },

  topBar: {
    text: "Дистрибьютор",
    brand: "ROOTT AG",
    suffix: "в Республике Молдова",
  },

  header: {
    phone: "+373 (79) 660-008",
    phoneHref: "tel:+37379660008",
    callBtn: "Заказать звонок",
    cart: "Корзина",
    menu: "Меню",
    close: "Закрыть",
  },

  nav: [
    {
      label: "О нас",
      children: [
        { label: "О нас", href: "/about/about-us" },
        { label: "Стать амбассадором", href: "/ambassador" },
        { label: "Гарантия и обмен", href: "/about/warranty-and-return-policy" },
        { label: "Новости", href: "/about/news" },
      ],
    },
    { label: "Амбассадоры", href: "/ambassador" },
    {
      label: "Продукция",
      children: [
        { label: "ROOTT R", href: "/catalog/roott-r-implants-detail" },
        { label: "ROOTT M", href: "/catalog/roott-m-implants-detail" },
        { label: "ROOTT P", href: "/catalog/roott-p-implants-detail" },
        { label: "ROOTT C / CS", href: "/catalog/roott-c-implants-detail" },
        { label: "ROOTT B / BS", href: "/catalog/roott-b-implants-detail" },
      ],
    },
    {
      label: "Магазин",
      children: [
        { label: "ROOTT R", href: "/catalog/roott-r" },
        { label: "ROOTT M", href: "/catalog/roott-m" },
        { label: "ROOTT P", href: "/catalog/roott-p" },
        { label: "ROOTT C / CS", href: "/catalog/roott-c" },
        { label: "ROOTT B / BS", href: "/catalog/roott-b" },
        { label: "Как сделать заказ", href: "/contacts#order" },
      ],
    },
    {
      label: "Каталог",
      catalog: true,
      children: [
        {
          label: "Каталог",
          href: "/files/ROOTT_System_2024.pdf",
          title: "Старый дизайн",
          text: "Архивная версия каталога. Предназначена для врачей, работающих с пациентами, которым имплантаты ROOTT были установлены до выхода линейки VIPER, в том числе при перепротезировании и подборе компонентов.",
        },
        {
          label: "Каталог Viper",
          href: "/files/ROOTT-Viper2026.pdf",
          title: "Актуальный каталог системы ROOTT в новом дизайне",
          text: "",
        },
        {
          label: "Каталог Viper N-line",
          href: "/files/ROOTT-System-N-line2026.pdf",
          title: "Каталог новой линейки N Line",
          text: "Каталог находится в разработке",
        },
      ],
    },
    { label: "События", href: "/sobytiya" },
    {
      label: "Специалисту",
      children: [
        { label: "Цифровые библиотеки", href: "/about/digital-libraries" },
        { label: "Важная информация", href: "/about/vazhnaya-informatsiya" },
        { label: "Resmile", href: "/specialist/resmile" },
        { label: "Клинические решения", href: "/specialist/cases" },
      ],
    },
    { label: "Контакты", href: "/contacts" },
  ],

  products: [
    { name: "ROOTT", series: "R", href: "/catalog/roott-r-implants-detail" },
    { name: "ROOTT", series: "M", href: "/catalog/roott-m-implants-detail" },
    { name: "ROOTT", series: "P", href: "/catalog/roott-p-implants-detail" },
    { name: "ROOTT", series: "C", href: "/catalog/roott-c-implants-detail" },
    { name: "ROOTT", series: "CS", href: "/catalog/roott-cs-implants-detail" },
  ],

  hero: {
    dealer: {
      title: "Станьте врачом-амбассадором ROOTT®",
      text: "Программа для имплантологов Молдовы, работающих с системой ROOTT: обучение, совместные клинические случаи и особые условия сотрудничества",
      tags: ["обучение", "клинические случаи", "сообщество", "особые условия"],
      primary: "О программе",
      secondary: "Подать заявку",
    },
    system: {
      title: "Швейцарская имплантационная система для сложных клинических случаев",
      text: "От одиночных реставраций до тотальной реабилитации с немедленной нагрузкой.",
      primary: "Заказать импланты",
      secondary: "Получить консультацию",
    },
  },

  promos: {
    badge: "Акция",
    more: "Подробнее",
    items: [
      { tag: "Совместная акция ROOTT × GREEN DENT", title: "ROOTT × Green Dent: оборудование + имплантаты в подарок", image: "/images/roott/promo-1.jpg" },
      { tag: "", title: "Акция ROOTT: хирургический набор и обучение в подарок", image: "/images/roott/promo-2.jpg" },
      { tag: "Совместная акция ROOTT × GREEN DENT", title: "Оборудование для клиники — имплантаты ROOTT в подарок", image: "/images/roott/promo-3.jpg" },
      { tag: "Анапа", title: "Двухдневный продвинутый курс в подарок", image: "/images/roott/promo-4.jpg" },
      { tag: "25 июля", title: "Вебинар от ведущих спикеров в подарок", image: "/images/roott/promo-5.jpg" },
    ],
  },

  system: {
    title: "Система имплантатов ROOTT R",
    subtitle: "Долгосрочная удовлетворенность пациентов по всему миру.",
    paragraphs: [
      "ROOTT® — это не просто компания по производству имплантатов. Это полноценная, интеллектуально разработанная экосистема, созданная для поддержки практикующих врачей при любых показаниях, в любых рабочих процессах и при любом уровне сложности.",
      "От немедленной нагрузки до комплексных клинических случаев, от простых до продвинутых решений — ROOTT® наделяет специалистов уверенностью, стабильностью результатов и полным контролем.",
      "Мы твердо верим, что каждый человек заслуживает доступа к имплантатам мирового уровня, которые возвращают здоровье и уверенность в себе.",
    ],
    more: "Подробнее",
  },

  features: {
    more: "Подробнее",
    items: [
      { title: "Станьте врачом-амбассадором ROOTT", href: "/ambassador", image: "/images/roott/feature-ambassador.jpg" },
      { title: "Цифровые библиотеки ROOTT", href: "/about/digital-libraries", image: "/images/roott/feature-lab.jpg" },
      { title: "Наши преимущества", href: "/about/our-advances", image: "/images/roott/feature-advantages.png" },
    ],
  },

  news: {
    title: "Новости",
    items: [
      { title: "Дубай 2027 вместе с ROOTT: AEEDC Dubai Experience", date: "15 сентября 2026", href: "/about/news/dubay_2027_vmeste_s_roott_aeedc_dubai_experience", image: "/images/roott/news-2.jpg" },
      { title: "BISHKEK DENTAL SUMMIT & ROOTT", date: "6 июля 2026", href: "/about/news/bishkek_dental_summit_roott", image: "/images/roott/news-4.jpg" },
      { title: "Обновления и новости линейки продуктов ROOTT", date: "11 июля 2024", href: "/about/news/obnovleniya_i_novosti_lineyki_produktov_roott", image: "/images/roott/upload/iblock/3ef/xd3ik8qqi8dx6gmuiu0fdnnlu38mds1z.jpg" },
      { title: "ROOTT примет участие в выставке IDEM 2024 в Сингапуре", date: "11 апреля 2024", href: "/about/news/roott_primet_uchastie_v_predstoyashchey_vystavke_idem_2024_v_singapure_", image: "/images/roott/upload/iblock/602/jnwnjpc7dv1ar4n9ltuaqst4wgwm4mkp.png" },
    ],
    socialTitle: "Соц сети:",
    socialText: "Будьте в курсе последних событий",
  },

  articles: {
    title: "Статьи",
    tag: "Статьи",
    read: "Читать",
    all: "Все статьи",
    items: [
      { title: "Швейцарские импланты", date: "26 февраля 2026", href: "/articles/shveytsarskie-implanty", image: "/images/roott/article-1.jpg" },
      { title: "Коронки на зубных имплантах", date: "17 сентября 2025", href: "/articles/koronki-na-zubnykh-implantakh", image: "/images/roott/article-2.jpg" },
      { title: "Зубной имплант не прижился — причины, какой имплант лучше поставить", date: "12 мая 2025", href: "/articles/zubnoy-implant-ne-prizhilsya-prichiny-kakoy-implant-luchshe-postavit", image: "/images/roott/article-3.jpg" },
    ],
  },

  contact: {
    title: "Есть вопросы?",
    subtitle: "Напишите нам",
    topicPlaceholder: "Выберите тему письма*",
    topics: [
      "Продукция",
      "Документы",
      "Техническая информация",
      "Resmile",
      "У меня есть новые идеи и предложения",
      "Я хотел бы стать врачом-амбассадором ROOTT",
    ],
    name: "Имя*",
    email: "E-mail*",
    phone: "Телефон*",
    message: "Сообщение*",
    consent: "Нажимая «Отправить», вы соглашаетесь с нашей",
    privacy: "Политикой конфиденциальности",
    send: "Отправить",
    success: "Спасибо! Мы скоро с вами свяжемся.",
  },

  seo: {
    h1: "Швейцарские импланты ROOTT в Молдове",
    intro:
      "Мы являемся компанией, занимающейся продвижением и продажей стоматологических имплантатов и хирургических инструментов ROOTT. Наша цель – повысить уровень имплантационных технологий в Молдове за счет продукции с высокими стандартами качества и безопасности.",
    typesTitle: "Виды имплантов",
    types: [
      { name: "ROOTT R", text: "– двухсоставной имплантат с самонарезающей резьбой. Изделия отличаются высокой первичной стабильностью, имеют прочное конусное соединение и представлены в широком размерном ряду." },
      { name: "ROOTT S", text: "– моноблочный имплантат для винтовых реставраций (мультиюнит) с узкой платформой и многофункциональным носителем." },
      { name: "ROOTT M", text: "– моноблочный имплантат для винтовых реставраций (мультиюнит) с платформой стандартного диаметра и многофункциональным носителем." },
      { name: "ROOTT P", text: "– моноблочный имплантат для винтовой фиксации в крыловидной области." },
      { name: "ROOTT C", text: "– односоставной компрессионный имплант с возможностью регулировки угла наклона абатмента." },
      { name: "ROOTT CS", text: "– односоставной имплант с укороченной шейкой. Может использоваться в том числе в случаях, если толщина десны не более 1 мм." },
      { name: "ROOTT B", text: "– базальные импланты с полированной поверхностью резьбы, могут использоваться при резорбции кости, минимальный показатель периимплантитов." },
      { name: "ROOTT BS", text: "– базальный имплант, поверхность которого обработана пескоструйным методом. Быстро остеоинтегрируется. Угол абатмента изменяется, поэтому подходит для узкого альвеолярного отростка." },
    ],
    catalogTitle: "Каталог продукции",
    catalogLink: "В нашем каталоге",
    catalogText: "представлены все виды имплантатов, ортопедические элементы и инструменты.",
    advantagesTitle: "Преимущества имплантов",
    advantages: [
      "Легкая установка",
      "Хорошо прогнозируемый результат",
      "Широкий размерный ряд",
      "Решение для любых клинических случаев",
      "Высокое качество",
      "Приемлемый ценовой сегмент",
    ],
    applicationTitle: "Область применения",
    applicationText:
      "Имплантаты ROOTT подходят как для классической имплантации (двухэтапной), так и для одноэтапной с немедленной нагрузкой, а также возможна установка в лунку удаленного зуба. Выбирая импланты ROOTT, вы можете быть полностью уверены в успешном конечном результате.",
    trainingTitle: "Сообщество и события",
    trainingText:
      "Участвуйте в международных мероприятиях ROOTT и присоединяйтесь к программе врачей-амбассадоров в Молдове: обмен опытом, клинические случаи и доступ к новейшим решениям в имплантологии, хирургии и ортопедии.",
  },

  footer: {
    subscribeTitle: "Подписаться на новости",
    subscribeText: "Оставайтесь в курсе новостей и последних событий",
    emailPlaceholder: "Email",
    consent: "Нажимая «Отправить», вы соглашаетесь с нашей",
    chats: "Чаты:",
    search: "Поиск",
    columns: [
      {
        title: "О компании",
        links: [
          { label: "О нас", href: "/about/about-us" },
          { label: "Наши преимущества", href: "/about/our-advances" },
          { label: "Сертификаты", href: "/about/certificates" },
          { label: "Гарантия и обмен", href: "/about/warranty-and-return-policy" },
          { label: "Новости", href: "/about/news" },
          { label: "Контакты", href: "/contacts" },
        ],
      },
      {
        title: "Каталог",
        links: [
          { label: "ROOTT R", href: "/catalog/roott-r" },
          { label: "ROOTT M", href: "/catalog/roott-m" },
          { label: "ROOTT P", href: "/catalog/roott-p" },
          { label: "ROOTT C", href: "/catalog/roott-c" },
          { label: "ROOTT CS", href: "/catalog/roott-cs" },
          { label: "ROOTT B", href: "/catalog/roott-b" },
          { label: "ROOTT BS", href: "/catalog/roott-bs" },
        ],
      },
      {
        title: "Специалисту",
        links: [
          { label: "Resmile", href: "/specialist/resmile" },
          { label: "События", href: "/sobytiya" },
          { label: "Клинические решения", href: "/specialist/cases" },
          { label: "Стать амбассадором", href: "/ambassador" },
        ],
      },
    ],
    copyright: "© 2026 ROOTT",
    privacy: "Политика конфиденциальности",
    impressum: "Impressum",
  },

  common: {
    home: "Главная",
    shop: "Магазин",
    more: "Подробнее",
    read: "Читать",
    back: "Назад",
    all: "Все",
    noticeRu: "Этот материал пока доступен только на русском языке.",
  },

  shop: {
    title: "Магазин",
    catalogTitle: "Каталог",
    chooseCategory: "Выберите категорию",
    buy: "Купить",
    more: "Подробнее",
    toShop: "В магазин",
    sizes: "Размеры:",
    addToCart: "В корзину",
    inCart: "В корзине ✓",
    detailsTitle: "Подробнее",
    packagingTitle: "Упаковка и содержание",
    packagingModal: "Упаковка имплантатов",
    related: "Сопутствующие товары:",
    linesTitle: "Линейки продукции ROOTT",
    priceNote: "Цены указаны в евро.",
  },

  cart: {
    title: "Корзина",
    clear: "Очистить",
    empty: "Ваша корзина пуста",
    total: "Сумма заказа",
    checkout: "Оформить заказ",
    remove: "Удалить",
    added: "Товар добавлен в корзину",
  },

  order: {
    title: "Оформление заказа",
    contactTitle: "Контактные данные",
    name: "Имя и фамилия*",
    phone: "Телефон*",
    email: "E-mail*",
    company: "Клиника / компания",
    city: "Город",
    address: "Адрес доставки",
    comment: "Комментарий к заказу",
    summary: "Ваш заказ",
    qty: "Кол-во",
    total: "Итого",
    submit: "Отправить заказ",
    sending: "Отправка…",
    note: "После получения заказа менеджер свяжется с вами для подтверждения наличия, оплаты и доставки.",
    successTitle: "Спасибо! Заказ отправлен.",
    successText: "Мы скоро свяжемся с вами для подтверждения.",
    error: "Не удалось отправить заказ. Попробуйте ещё раз или позвоните нам.",
    empty: "Корзина пуста. Добавьте товары из магазина.",
    goShop: "Перейти в магазин",
  },

  callModal: {
    title: "Заказать обратный звонок",
    text: "Оставьте ваш номер телефона и мы вам перезвоним",
    name: "Имя",
    phone: "Телефон*",
    send: "Отправить",
  },

  cookie: {
    text: "На сайте используются cookies. Продолжая использовать сайт, вы принимаете условия",
    link: "политики конфиденциальности",
    ok: "Ok",
  },
};

export default ru;
