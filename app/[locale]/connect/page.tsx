"use client";

import Image from "next/image";
import Link from "next/link";
import { useIsDarkTheme, socialIconSrc } from "@/lib/social-icons";

import Header from "../../components/headaer/header";
import Card from "../../components/card/card";
import Footer from "../../components/footer/footer";
import { TeamSurfaceHeaderSection } from "@/app/components/layout/team-surface-header";

export default function SiteMapPage() {
  const isDarkTheme = useIsDarkTheme();

  return (
    <>  
      <main className="mx-auto flex w-full min-w-0 max-w-[1280px] flex-col gap-6 px-3 sm:gap-8 sm:px-4 md:px-6 lg:max-w-[1400px]">
        <TeamSurfaceHeaderSection
          className="mt-4"
          innerClassName="flex flex-col gap-14 !pb-6 md:!pb-8"
        >
          <Header matchTeamSurface />

          {/* ================= БЛОК КОНТАКТОВ В СТИЛЕ ФОРМЫ ================= */}
          <div className="w-full max-w-4xl mx-auto px-4 mt-2 mb-4">
            {/* ИСПРАВЛЕНО: Заголовок теперь адаптивный (темный/светлый) */}
<h2 
  className="text-3xl md:text-4xl font-bold mb-10 transition-colors duration-300"
  style={{ color: isDarkTheme ? '#ffffff' : '#111827' }}
>
  Контакты для связи
</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Карточка 1: Email */}
              <Link 
                href="mailto:mailmailmy@gmail.com" 
                className="group flex items-center gap-4 p-6 rounded-[24px] bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all min-w-0"
              >
                {/* Иконка увеличена на 10% (w-12 h-12) */}
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-[#1c1c1e] dark:bg-white/10 text-white transition-colors group-hover:bg-[#acc2fd] group-hover:text-black">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">Email:</div>
                  <div className="text-sm lg:text-base font-medium text-gray-900 dark:text-white truncate">
                    mail@gmail.com
                  </div>
                </div>
              </Link>

              {/* Карточка 2: WhatsApp */}
              <Link 
                href="https://wa.me/352621751984" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-6 rounded-[24px] bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all min-w-0"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-[#1c1c1e] dark:bg-white/10 text-white transition-colors group-hover:bg-[#acc2fd] group-hover:text-black">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">WhatsApp:</div>
                  <div className="text-sm lg:text-base font-medium text-gray-900 dark:text-white truncate">
                    +352 621 751 984
                  </div>
                </div>
              </Link>

              {/* Карточка 3: Telegram */}
              <Link 
                href="https://t.me/lazzurr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-6 rounded-[24px] bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all min-w-0"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-[#1c1c1e] dark:bg-white/10 text-white transition-colors group-hover:bg-[#acc2fd] group-hover:text-black">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/>
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">Telegram:</div>
                  <div className="text-sm lg:text-base font-medium text-gray-900 dark:text-white truncate">
                    @lazzurr
                  </div>
                </div>
              </Link>

            </div>
          </div>
          {/* ================= КОНЕЦ БЛОКА КОНТАКТОВ ================= */}

          <Card embedded />
        </TeamSurfaceHeaderSection>
      </main>
      <Footer />
    </>
  );
}