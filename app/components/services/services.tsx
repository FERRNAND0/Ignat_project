"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type ServiceSection = {
  id: string;
  itemIds: string[];
};

/** Иконки: переназначили старые пути под новые ключи услуг, чтобы дизайн не сломался */
const SERVICE_ITEM_ICONS: Record<string, string> = {
  // Popular
  "web-development": "/often/monitor-mobbile.svg",
  "mobile-development": "/often/mobile.svg",
  "smm-social-media": "/often/trend-up.svg",
  "context-display-ads": "/often/search-normal.svg",
  "seo-promotion": "/often/gps.svg",
  "ux-ui-design": "/often/colors-square.svg",

  // Middle
  "marketing-strategy": "/middle/note-2.svg",
  "branding-identity": "/rare/lamp-on.svg",
  "content-marketing": "/often/edit.svg",
  "lead-generation-b2b": "/middle/user-search.svg",
  "email-marketing": "/rare/device-message.svg",
  "analytics-reporting": "/often/chart-2.svg",

  // Rare
  "product-software-dev": "/middle/setting-2.svg",
  "pr-communications": "/rare/clipboard.svg",
  "automation-martech": "/middle/designtools.svg",
  "ai-agents-automation": "/rare/notification-status.svg",
  "testing-qa-devops": "/rare/ruler%26pen.svg",
};

function serviceIconSrc(itemId: string): string {
  return SERVICE_ITEM_ICONS[itemId] ?? "/often/edit.svg";
}

const sections: ServiceSection[] = [
  {
    id: "popular",
    itemIds: [
      "web-development",
      "mobile-development",
      "smm-social-media",
      "context-display-ads",
      "seo-promotion",
      "ux-ui-design",
    ],
  },
  {
    id: "middle",
    itemIds: [
      "marketing-strategy",
      "branding-identity",
      "content-marketing",
      "lead-generation-b2b",
      "email-marketing",
      "analytics-reporting",
    ],
  },
  {
    id: "rare",
    itemIds: [
      "product-software-dev",
      "pr-communications",
      "automation-martech",
      "ai-agents-automation",
      "testing-qa-devops",
    ],
  },
];

export default function Services() {
  const t = useTranslations("servicesSection");
  const [openedSection, setOpenedSection] = useState<string>("popular");

  return (
    <section id="services" className="mt-6 px-3 py-6 md:px-6 md:py-8 lg:px-8 scroll-mt-20">
      <h2 className="mb-8 text-center text-2xl font-bold text-[var(--services-title)] md:mb-10 md:text-3xl">
        {t("title")}
      </h2>

      <div className="space-y-4 md:space-y-8">
        {sections.map((section) => {
          const isOpenMobile = openedSection === section.id;

          return (
            <div key={section.id} className="rounded-2xl bg-[var(--services-bg)] p-2 md:p-3 ">
              <button
                type="button"
                onClick={() =>
                  setOpenedSection((prev) => (prev === section.id ? "" : section.id))
                }
                className="flex w-full items-center justify-between rounded-xl px-2 py-1 text-left md:pointer-events-none md:justify-center"
                aria-expanded={isOpenMobile}
              >
                <span className="text-1xl font-semibold text-[var(--services-title)] md:text-2xl mb-2">
                  {t(`sections.${section.id}.title`)}
                </span>
                <span className="text-xl text-zinc-500 md:hidden">
                  {isOpenMobile ? "⌃" : "⌄"}
                </span>
              </button>

              <div
                className={`mt-2 grid grid-cols-2 gap-2  pb-6 md:grid md:grid-cols-3 md:gap-3 ${
                  isOpenMobile ? "block" : "hidden"
                } md:block`}
              >
                {section.itemIds.map((itemId) => (
                  <Link
                    href={`/services/${itemId}`} // <-- Ссылка теперь динамическая!
                    key={`${section.id}-${itemId}`}
                    className="flex min-h-[112px] min-w-0 flex-col items-start gap-3 rounded-2xl bg-[var(--services-text-bg)] px-6 py-4 text-[var(--services-title)] shadow-none transition-all duration-300 ease-out will-change-transform hover:scale-[1.03] hover:bg-[#9ab5f6] hover:shadow-[0_0_12px_rgba(172,194,253,0.3)] dark:hover:bg-[#9ab5f6] dark:hover:shadow-[0_0_12px_rgba(95,119,184,0.35)] md:min-h-16 md:flex-row md:items-center md:gap-3 md:rounded-full cursor-pointer"
                  >
                    <img
                      src={serviceIconSrc(itemId)}
                      alt=""
                      width={20}
                      height={20}
                      className="h-4 w-4 flex-shrink-0 object-contain md:h-5 md:w-5"
                      aria-hidden
                    />
                    <span className="min-w-0 w-full text-xs leading-5 md:text-sm">
                      {t(`sections.${section.id}.items.${itemId}`)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}