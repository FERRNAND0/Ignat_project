"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations('header');
  
  const segments = pathname.split("/").filter(Boolean);
  const pathSegments = ["ru", "en", "fr", "ar", "de"].includes(segments[0]) 
    ? segments.slice(1) 
    : segments;

  if (pathSegments.length === 0) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="flex items-center gap-2 text-[10px] font-medium tracking-wide opacity-40 hover:opacity-100 transition-all duration-500 px-4 md:px-0 animate-in fade-in slide-in-from-top-1"
    >
      <Link href="/" className="hover:text-[var(--design-btn)] transition-colors">
        {/* Безопасная проверка для главной */}
        {t.has('main') ? t('main') : 'Home'}
      </Link>
      
      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const isLast = index === pathSegments.length - 1;

        // Безопасный текст для сегмента: берем из перевода или форматируем путь
        const segmentLabel = t.has(segment) ? t(segment) : segment.replace(/-/g, " ");

        return (
          <div key={href} className="flex items-center gap-2">
            <span className="select-none text-gray-400">/</span>
            {isLast ? (
              <span className="text-[var(--foreground)] font-semibold">
                {segmentLabel}
              </span>
            ) : (
              <Link href={href} className="hover:text-[var(--design-btn)] transition-colors capitalize">
                {segmentLabel}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}