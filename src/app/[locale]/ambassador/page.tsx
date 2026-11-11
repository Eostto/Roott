/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import Breadcrumbs from "@/components/Breadcrumbs";
import AmbassadorForm from "@/components/AmbassadorForm";
import { COMPANY } from "@/lib/company";

const C = {
  ro: {
    meta: "Programul medicilor-ambasadori ROOTT în Moldova",
    home: "Pagina principală",
    crumb: "Medic-ambasador ROOTT",
    title: "Deveniți medic-ambasador ROOTT®",
    lead: "Program pentru implantologii din Moldova care lucrează cu sistemul elvețian ROOTT și vor să-și dezvolte practica împreună cu noi: instruire, cazuri clinice comune și condiții speciale de colaborare.",
    apply: "Aplicați în program",
    whatsapp: "Scrieți-ne pe WhatsApp",
    aboutTitle: "Ce înseamnă să fiți ambasador ROOTT",
    about: [
      "Ambasadorii ROOTT sunt medici practicieni care folosesc implanturile ROOTT în activitatea zilnică și își împărtășesc experiența cu colegii.",
      "Împreună prezentăm cazuri clinice reale, organizăm întâlniri profesionale și facem cunoscute în Moldova soluțiile moderne de implantologie.",
    ],
    benefitsTitle: "Ce primiți",
    benefits: [
      ["Instruire și master-class-uri", "Acces la programe de instruire, prelegeri și evenimente internaționale ROOTT."],
      ["Condiții speciale", "Prețuri și condiții de colaborare individuale pentru implanturi, componente și instrumente ROOTT."],
      ["Vizibilitate profesională", "Cazurile dvs. clinice publicate în secțiunea „Soluții clinice” de pe roott.md."],
      ["Suport tehnic dedicat", "Consultanță pentru alegerea sistemului, a componentelor și a protocoalelor de lucru."],
      ["Acces prioritar la noutăți", "Primiți primii informații despre produse noi, cataloage și biblioteci digitale."],
      ["Comunitate profesională", "Schimb de experiență cu implantologi din Moldova și din rețeaua internațională ROOTT."],
    ],
    whoTitle: "Cui se adresează",
    who: [
      "Medicilor implantologi, chirurgi stomatologi și medicilor protetici din Republica Moldova",
      "Specialiștilor care lucrează deja cu ROOTT sau doresc să înceapă",
      "Medicilor dispuși să-și documenteze și să-și prezinte cazurile clinice",
    ],
    stepsTitle: "Cum devin ambasador",
    steps: [
      ["Aplicați", "Completați formularul de mai jos sau scrieți-ne pe WhatsApp / Telegram."],
      ["Discuție", "Echipa noastră vă contactează pentru a discuta experiența și obiectivele dvs."],
      ["Acord", "Stabilim împreună condițiile de colaborare și planul de activitate."],
      ["Start", "Participați la instruiri, prezentați cazuri și beneficiați de condițiile programului."],
    ],
    note: "Condițiile concrete ale programului se stabilesc individual, în urma discuției cu echipa noastră.",
    form: {
      title: "Aplicați în programul de ambasadori",
      text: "Lăsați datele de contact și vă vom suna pentru a discuta detaliile.",
      name: "Nume și prenume*", phone: "Telefon*", email: "E-mail*", clinic: "Clinica", city: "Orașul", years: "Experiență în implantologie (ani)",
      spec: "Specializarea*", specs: ["Implantolog", "Chirurg stomatolog", "Medic protetician", "Stomatolog generalist", "Altă specializare"],
      message: "Mesaj (opțional): cu ce sisteme lucrați, ce v-ar interesa", consent: "Apăsând «Trimite», sunteți de acord cu", privacy: "Politica de confidențialitate",
      send: "Trimite", ok: "Mulțumim! Am primit cererea și vă vom contacta în curând.", err: "Nu s-a putut trimite. Încercați din nou sau sunați-ne.",
    },
  },
  ru: {
    meta: "Программа врачей-амбассадоров ROOTT в Молдове",
    home: "Главная",
    crumb: "Врач-амбассадор ROOTT",
    title: "Станьте врачом-амбассадором ROOTT®",
    lead: "Программа для имплантологов Молдовы, которые работают со швейцарской системой ROOTT и хотят развивать практику вместе с нами: обучение, совместные клинические случаи и особые условия сотрудничества.",
    apply: "Подать заявку",
    whatsapp: "Написать в WhatsApp",
    aboutTitle: "Что значит быть амбассадором ROOTT",
    about: [
      "Амбассадоры ROOTT — практикующие врачи, которые используют имплантаты ROOTT в ежедневной работе и делятся опытом с коллегами.",
      "Вместе мы представляем реальные клинические случаи, проводим профессиональные встречи и развиваем современные решения в имплантологии в Молдове.",
    ],
    benefitsTitle: "Что вы получаете",
    benefits: [
      ["Обучение и мастер-классы", "Доступ к обучающим программам, лекциям и международным мероприятиям ROOTT."],
      ["Особые условия", "Индивидуальные цены и условия сотрудничества на имплантаты, компоненты и инструменты ROOTT."],
      ["Профессиональная известность", "Ваши клинические случаи в разделе «Клинические решения» на roott.md."],
      ["Персональная техническая поддержка", "Консультации по выбору системы, компонентов и протоколов работы."],
      ["Приоритетный доступ к новинкам", "Первыми узнавайте о новых продуктах, каталогах и цифровых библиотеках."],
      ["Профессиональное сообщество", "Обмен опытом с имплантологами Молдовы и международной сети ROOTT."],
    ],
    whoTitle: "Для кого программа",
    who: [
      "Для имплантологов, стоматологов-хирургов и ортопедов Республики Молдова",
      "Для специалистов, которые уже работают с ROOTT или хотят начать",
      "Для врачей, готовых документировать и представлять свои клинические случаи",
    ],
    stepsTitle: "Как стать амбассадором",
    steps: [
      ["Заявка", "Заполните форму ниже или напишите нам в WhatsApp / Telegram."],
      ["Беседа", "Наша команда свяжется с вами, чтобы обсудить ваш опыт и цели."],
      ["Соглашение", "Вместе определяем условия сотрудничества и план работы."],
      ["Старт", "Участвуйте в обучении, представляйте случаи и пользуйтесь условиями программы."],
    ],
    note: "Конкретные условия программы определяются индивидуально после беседы с нашей командой.",
    form: {
      title: "Заявка на участие в программе амбассадоров",
      text: "Оставьте контакты — мы перезвоним и обсудим детали.",
      name: "Имя и фамилия*", phone: "Телефон*", email: "E-mail*", clinic: "Клиника", city: "Город", years: "Опыт в имплантологии (лет)",
      spec: "Специализация*", specs: ["Имплантолог", "Стоматолог-хирург", "Стоматолог-ортопед", "Стоматолог общей практики", "Другая специализация"],
      message: "Сообщение (необязательно): с какими системами работаете, что вас интересует", consent: "Нажимая «Отправить», вы соглашаетесь с", privacy: "Политикой конфиденциальности",
      send: "Отправить", ok: "Спасибо! Мы получили заявку и скоро с вами свяжемся.", err: "Не удалось отправить. Попробуйте ещё раз или позвоните нам.",
    },
  },
} as const;

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: `${C[locale].meta} | roott.md`, description: C[locale].lead };
}

export default async function AmbassadorPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = C[locale as Locale];
  return (
    <main>
      <section className="relative overflow-hidden bg-[#1b2a3a] text-white">
        <img src="/images/roott/hero-ambassador.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        <div className="relative mx-auto max-w-[1256px] px-4 pb-20 pt-6 md:pb-28">
          <nav className="text-[13px] text-white/70">
            <Link href={`/${locale}`} className="hover:text-white">{t.home}</Link> <span aria-hidden>→</span> <span className="text-white">{t.crumb}</span>
          </nav>
          <div className="mt-16 max-w-[640px] md:mt-24">
            <h1 className="text-[32px] font-semibold leading-[1.2] md:text-[44px]">{t.title}</h1>
            <p className="mt-5 text-[16px] leading-7 text-white/90">{t.lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#aplica" className="btn-white">{t.apply}</a>
              <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-outline-white">{t.whatsapp}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1256px] gap-10 px-4 py-16 md:grid-cols-2 md:py-20">
        <h2 className="text-[26px] font-semibold leading-tight md:text-[32px]">{t.aboutTitle}</h2>
        <div className="space-y-4 text-[16px] leading-7 text-[#42454a]">
          {t.about.map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>

      <section className="bg-mist py-16 md:py-20">
        <div className="mx-auto max-w-[1256px] px-4">
          <h2 className="text-[26px] font-semibold md:text-[32px]">{t.benefitsTitle}</h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.benefits.map(([h, p], i) => (
              <li key={h} className="rounded-[5px] bg-white p-7">
                <span className="text-[14px] font-semibold text-[#5d8d74]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-[18px] font-semibold">{h}</h3>
                <p className="mt-2 text-[14px] leading-6 text-[#42454a]">{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1256px] gap-12 px-4 py-16 md:grid-cols-2 md:py-20">
        <div>
          <h2 className="text-[26px] font-semibold md:text-[32px]">{t.whoTitle}</h2>
          <ul className="mt-8 space-y-4">
            {t.who.map((w) => (
              <li key={w} className="flex gap-3 text-[16px] leading-7 text-[#42454a]">
                <span className="mt-[11px] h-2 w-2 shrink-0 rounded-full bg-lime" aria-hidden />
                {w}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-[26px] font-semibold md:text-[32px]">{t.stepsTitle}</h2>
          <ol className="mt-8 space-y-6">
            {t.steps.map(([h, p], i) => (
              <li key={h} className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-[15px] font-semibold text-white">{i + 1}</span>
                <span>
                  <span className="block text-[17px] font-semibold">{h}</span>
                  <span className="mt-1 block text-[14px] leading-6 text-[#42454a]">{p}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-[13px] leading-5 text-muted">{t.note}</p>
        </div>
      </section>

      <AmbassadorForm t={{ ...t.form, specs: [...t.form.specs] }} locale={locale as Locale} />
    </main>
  );
}
