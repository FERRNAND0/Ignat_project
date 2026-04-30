import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Header from "@/app/components/headaer/header";
import Footer from "@/app/components/footer/footer";
import Breadcrumbs from "@/app/components/breadcrumbs";
import { notFound } from "next/navigation";

// 1. Указываем, что params — это Promise
type Props = {
  params: Promise<{ locale: string; id: string }>;
};

// 2. ДИНАМИЧЕСКАЯ ГЕНЕРАЦИЯ META-ТЕГОВ
export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params; // Ждем загрузки параметров
  const id = resolvedParams.id;
  const locale = resolvedParams.locale;

  const t = await getTranslations({ locale, namespace: "teamDetails" });

  if (!t.has(`${id}.h1`)) {
    return { title: "Specialist not found" };
  }

  return {
    title: t(`${id}.metaTitle`),
    description: t(`${id}.metaDescription`),
    openGraph: {
      title: t(`${id}.metaTitle`),
      description: t(`${id}.metaDescription`),
      type: "profile",
    },
  };
}

// 3. САМА СТРАНИЦА (Делаем ее async)
export default async function SpecialistProfilePage({ params }: Props) {
  const resolvedParams = await params; // Разворачиваем Promise
  const id = resolvedParams.id;
  const locale = resolvedParams.locale;

  // В асинхронных серверных компонентах нужно использовать getTranslations
  const t = await getTranslations({ locale, namespace: "teamDetails" });

  if (!t.has(`${id}.h1`)) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": t(`${id}.name`),
    "jobTitle": t(`${id}.role`),
    "worksFor": {
      "@type": "Organization",
      "name": "MARKETING LOGO" // Название твоей компании
    },
    "description": t(`${id}.metaDescription`),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto flex w-full min-h-screen max-w-[1280px] flex-col gap-6 px-4 md:px-6">
        <Header />

        <div className="flex-1 pb-20 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* ЛЕВАЯ КОЛОНКА */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="relative w-full aspect-square rounded-[32px] overflow-hidden bg-white dark:bg-[#1a1a1c] shadow-sm border border-gray-200 dark:border-white/10">
                {/* Убедись, что картинка leo-carter.jpg лежит в public/img/team/ */}
                <Image
                  src={`/img/workers/sotrudnik/${id}.jpg`} 
                  alt={t(`${id}.photoAlt`)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>
              <Link href="/connect" className="w-full">
                <button className="w-full bg-[#1c1c1e] dark:bg-[#acc2fd] text-white dark:text-[#1c1c1e] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg">
                  {/* Кнопку тоже можно будет вынести в переводы, если нужно */}
                  Забронировать консультацию
                </button>
              </Link>
            </div>

            {/* ПРАВАЯ КОЛОНКА */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              <div>
                {/* Используем var(--foreground) чтобы текст не пропадал */}
                <h1 className="text-3xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
                  {t(`${id}.h1`)}
                </h1>
                <p className="text-xl text-[var(--design-btn)] font-semibold mb-6">
                  {t(`${id}.intro`)}
                </p>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none text-[var(--design-muted)]">
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                  Опыт и подход
                </h2>
                <p className="leading-relaxed">
                  {t.rich(`${id}.experience`, {
                    u: (chunks) => (
                      <Link href="/services" className="text-[var(--design-btn)] hover:underline font-medium">
                        {chunks}
                      </Link>
                    ),
                  })}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                  Ключевые навыки
                </h3>
                <div className="flex flex-wrap gap-2">
                  {t(`${id}.skills`).split(', ').map((skill, index) => (
                <span
  key={index}
  className="rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-100"
>
  {skill}
</span>
                  ))}
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