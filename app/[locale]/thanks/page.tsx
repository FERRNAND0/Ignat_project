import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Header from "@/app/components/headaer/header";
import Footer from "@/app/components/footer/footer";

export default function ThanksPage() {
  const t = useTranslations("thanks");

  return (
    <>
      <main className="mx-auto flex w-full min-h-screen max-w-[1280px] flex-col gap-6 px-4 md:px-6">
        <Header />
        
        <div className="flex-1 flex flex-col items-center justify-center text-center py-20 animate-in fade-in duration-700">
          {/* Анимированная галочка */}
          <div className="w-20 h-20 bg-[var(--design-btn)]/20 rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-500">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--design-btn)]">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {/* ИСПРАВЛЕНО: Теперь заголовок использует var(--foreground), чтобы гарантированно быть видимым */}
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
            {t("title")}
          </h1>
          
          <p className="text-lg text-[var(--design-muted)] max-w-md mb-10">
            {t("description")}
          </p>

          <Link href="/main-page">
            {/* ИСПРАВЛЕНО: Кнопка теперь в фирменном стиле (как в форме заявки) */}
            <button className="inline-flex items-center justify-center gap-2 rounded-full border-b-8 border-zinc-900 bg-[#a9bffd] px-8 py-4 text-xl font-medium text-zinc-900 transition-colors hover:bg-[#98b1fb]">
              {t("button")}
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}