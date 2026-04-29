import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/app/components/headaer/header";
import Footer from "@/app/components/footer/footer";
import Breadcrumbs from "@/app/components/breadcrumbs";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

// 1. ГЕНЕРАЦИЯ META-ТЕГОВ И SCHEMA.ORG
export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const { id, locale } = resolvedParams;
  const t = await getTranslations({ locale, namespace: "serviceDetails" });

  if (!t.has(`${id}.h1`)) return { title: "Service not found" };

  return {
    title: t(`${id}.metaTitle`),
    description: t(`${id}.metaDescription`),
    openGraph: {
      title: t(`${id}.metaTitle`),
      description: t(`${id}.metaDescription`),
    },
  };
}

export default async function ServiceDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  const { id, locale } = resolvedParams;
  const t = await getTranslations({ locale, namespace: "serviceDetails" });

  if (!t.has(`${id}.h1`)) notFound();

  // Генерируем массив FAQ для Schema.org, если они есть
  const faqCount = Number(t(`${id}.faqCount`) || 0);
  const faqSchema = faqCount > 0 ? {
    "@type": "FAQPage",
    "mainEntity": Array.from({ length: faqCount }).map((_, i) => ({
      "@type": "Question",
      "name": t(`${id}.faq.${i + 1}.q`),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": t(`${id}.faq.${i + 1}.a`)
      }
    }))
  } : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": t(`${id}.h1`),
    "provider": {
      "@type": "Organization",
      "name": "MARKETING LOGO"
    },
    "description": t(`${id}.metaDescription`),
    ...(faqSchema && { "subjectOf": faqSchema })
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto flex w-full min-h-screen max-w-[1280px] flex-col gap-6 px-4 md:px-6">
        <Header />
        
        <div className="max-w-[1280px] mx-auto w-full mb-2">
          <Breadcrumbs />
        </div>
        
        <div className="flex-1 pb-20 animate-in fade-in duration-500">
          {/* ЗАГОЛОВОК И ИНТРО */}
          <div className="mb-12 border-b border-gray-200 dark:border-white/10 pb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-[var(--foreground)] mb-6">
              {t(`${id}.h1`)}
            </h1>
            
            <div className="prose prose-lg dark:prose-invert max-w-4xl text-[var(--design-muted)]">
               {/* Перелинковка: <u> превращается в <Link href="/team/..."> */}
              <p className="leading-relaxed">
                  {t.rich(`${id}.description`, {
                    u: (chunks) => (
                      <Link href="/team" className="text-[var(--design-btn)] hover:underline font-medium">
                        {chunks}
                      </Link>
                    ),
                  })}
              </p>
            </div>
            
            <div className="mt-8">
                <Link href="/connect">
                    <button className="bg-[#a9bffd] hover:bg-[#98b1fb] text-zinc-900 border-b-8 border-zinc-900 px-8 py-4 rounded-full font-bold text-xl transition-colors">
                        Заказать услугу
                    </button>
                </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* ЛЕВАЯ КОЛОНКА (Основной контент) */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              
              {/* ЧТО ВХОДИТ В УСЛУГУ */}
              <section>
                <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">Что входит в услугу</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {t(`${id}.includes`).split('|').map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-[var(--design-muted)]">
                      <span className="text-[var(--design-btn)] mt-1">✔</span>
                      {item.trim()}
                    </li>
                  ))}
                </ul>
              </section>

              {/* ЭТАПЫ РАБОТЫ */}
              <section>
                 <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">Как строится работа</h2>
                 <div className="flex flex-col gap-6">
                    {t(`${id}.steps`).split('|').map((step, index) => {
                        const [title, desc] = step.split(':');
                        return (
                            <div key={index} className="flex gap-6 items-start bg-[var(--card-bg)] p-6 rounded-[24px]">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#a9bffd] text-zinc-900 flex items-center justify-center font-bold text-xl">
                                    {index + 1}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">{title?.trim()}</h3>
                                    <p className="text-[var(--design-muted)]">{desc?.trim()}</p>
                                </div>
                            </div>
                        )
                    })}
                 </div>
              </section>
              
              {/* FAQ С РАЗВОРАЧИВАЮЩИМИСЯ ОТВЕТАМИ */}
              {faqCount > 0 && (
                <section className="mt-8">
                  <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">FAQ</h2>
                  <div className="flex flex-col gap-4">
                    {Array.from({ length: faqCount }).map((_, i) => (
                      <details key={i} className="group bg-[var(--card-bg)] rounded-[24px] overflow-hidden">
                        <summary className="cursor-pointer p-6 font-bold text-lg text-[var(--foreground)] list-none flex justify-between items-center">
                          {t(`${id}.faq.${i + 1}.q`)}
                          <span className="transition group-open:rotate-180">
                             ▼
                          </span>
                        </summary>
                        <div className="px-6 pb-6 text-[var(--design-muted)]">
                          {t(`${id}.faq.${i + 1}.a`)}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* ПРАВАЯ КОЛОНКА (Сайдбар) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
               <div className="bg-[var(--card-bg)] p-8 rounded-[32px] sticky top-6">
                  <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">Кому подходит</h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                      {t(`${id}.suitableFor`).split(',').map((item, index) => (
                          <span key={index} className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-[var(--foreground)]">
                              {item.trim()}
                          </span>
                      ))}
                  </div>

                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">Команда проекта</h3>
                  <div className="flex flex-col gap-3">
                      {/* Ссылки на специалистов */}
                      {t(`${id}.team`).split(',').map((member, index) => {
                          // Простая эвристика для формирования ссылки (Marketer -> alex-morgan)
                          // В реальном проекте тут лучше использовать точные ID из JSON
                          return (
                              <Link key={index} href={`/team`} className="text-[var(--design-btn)] hover:underline flex items-center gap-2">
                                  <span>👤</span> {member.trim()}
                              </Link>
                          )
                      })}
                  </div>
               </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}