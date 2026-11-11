/** Datele firmei — folosite în header, footer și pagini. */
export const COMPANY = {
  name: "Dent One Group SRL",
  address: { ro: "str. Nicolai Zelinski 7/1, Chișinău, Republica Moldova", ru: "ул. Николая Зелинского, 7/1, Кишинёв, Республика Молдова" },
  phone: "+373 (79) 660-008",
  phoneHref: "tel:+37379660008",
  telegram: "https://t.me/+37379660008",
  whatsapp: "https://wa.me/37379660008",
};

export const MESSENGERS = [
  { name: "WhatsApp", href: COMPANY.whatsapp },
  { name: "Telegram", href: COMPANY.telegram },
] as const;
