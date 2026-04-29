"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { socialIconSrc } from "@/lib/social-icons";
// Импортируем компонент хлебных крошек
import Breadcrumbs from "../breadcrumbs"; 

const languages = ["ru", "en", "fr", "ar", "de"] as const;

const THEME_STORAGE_KEY = "site-theme";

/** Короткие подписи языков (как в макете: RU, ENG, …) */
function localeShortLabel(code: string) {
  const map: Record<string, string> = {
    ru: "RU",
    en: "ENG",
    fr: "FR",
    ar: "AR",
    de: "DE",
  };
  return map[code] ?? code.toUpperCase();
}

type HeaderProps = {
  /** Фон как у секции team-surface (connect) */
  matchTeamSurface?: boolean;
};

export default function Header({ matchTeamSurface = false }: HeaderProps) {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeReady, setIsThemeReady] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);

  const t = useTranslations('header');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const localeBase = String(locale).split("-")[0].toLowerCase();

  const navLinks = [
    { label: t('team'), href: "/team" },
    { label: t('services'), href: "/services" },
    { label: t('projects'), href: "/projects" },
    { label: t('connect'), href: "/connect" },
    { label: t('blog'), href: "/blog" },
  ];

  function handleLocaleChange(nextLocale: (typeof languages)[number]) {
    router.replace(pathname, { locale: nextLocale });
    setIsLanguageOpen(false);
  }

  function switchToNextLocale() {
    const currentIndex = languages.indexOf(localeBase as (typeof languages)[number]);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % languages.length;
    handleLocaleChange(languages[nextIndex]);
  }

  // Закрытие выбора языка при клике вне области
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Блокировка скролла при открытом мобильном меню
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isMobileMenuOpen]);

  // Инициализация темы
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;
    setIsDark(shouldUseDark);
    setIsThemeReady(true);
  }, []);

  // Применение темы
  useEffect(() => {
    if (!isThemeReady) return;
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark, isThemeReady]);

  return (
    <>
      <header className="my-4 flex items-center justify-between rounded-full bg-[var(--header-bg)] px-3 py-2.5 sm:my-6 sm:px-4 sm:py-3 lg:px-6 lg:py-4 transition-colors duration-300">
        <Link href="/main-page">
          <h1 className="text-xl leading-tight font-semibold text-[var(--foreground)] sm:text-2xl lg:text-lg">
            MARKETING LOGO
          </h1>
        </Link>

        {/* Бургер-меню */}
        <button
          type="button"
          className="inline-flex text-2xl text-[var(--foreground)] sm:text-3xl lg:hidden"
          aria-label="Открыть меню"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          ☰
        </button>

        {/* Десктопная навигация */}
        <div className="hidden items-center gap-4 lg:flex">
          <nav>
            <ul className="flex items-center gap-6 text-sm">
              {navLinks.map((link) => (
                <li key={link.label} className="text-[var(--foreground)] hover:opacity-70 transition-opacity">
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Переключатель языка */}
            <div className="relative" ref={languageRef}>
              <button
                type="button"
                aria-expanded={isLanguageOpen}
                aria-haspopup="listbox"
                onClick={() => setIsLanguageOpen((prev) => !prev)}
                className="flex items-center justify-center gap-1.5 rounded-full px-2 py-1 text-sm text-[var(--foreground)] transition hover:opacity-90"
              >
                <span>{localeShortLabel(localeBase)}</span>
                <Image
                  src="/svg/chevron-right.svg"
                  alt=""
                  width={9}
                  height={9}
                  className={`transition-transform duration-200 dark:invert ${isLanguageOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isLanguageOpen && (
                <div
                  className={`absolute left-1/2 top-full z-30 mt-1.5 min-w-[5.5rem] -translate-x-1/2 rounded-2xl border border-[color:var(--foreground)]/12 p-1.5 shadow-sm dark:border-white/12 ${
                    matchTeamSurface ? "bg-[var(--team-surface)]" : "bg-[var(--header-bg)]"
                  }`}
                  role="listbox"
                >
                  <ul className="flex flex-col gap-1">
                    {languages.map((lang) => {
                      const active = lang === localeBase;
                      return (
                        <li key={lang}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={active}
                            onClick={() => active ? setIsLanguageOpen(false) : handleLocaleChange(lang)}
                            className={
                              active
                                ? "flex w-full items-center justify-center rounded-full border border-[var(--foreground)] px-2 py-1.5 text-xs font-medium text-[var(--foreground)] transition-all duration-200"
                                : "flex w-full items-center justify-center rounded-full border border-transparent px-2 py-1.5 text-xs font-medium text-[var(--design-muted)] transition-all duration-200 hover:border-[var(--design-btn)] hover:text-[var(--foreground)]"
                            }
                          >
                            {localeShortLabel(lang)}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            {/* Переключатель темы */}
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              className={`relative flex h-10 w-20 items-center rounded-full p-1 transition-colors ${
                isDark ? "bg-indigo-300" : "bg-amber-200"
              }`}
            >
              <span
                className={`grid h-8 w-8 place-items-center rounded-full text-lg transition-all duration-300 ${
                  isDark
                    ? "translate-x-10 bg-zinc-900 text-indigo-300"
                    : "translate-x-0 bg-zinc-900 text-amber-200"
                }`}
              >
                {isDark ? "☾" : "☼"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Хлебные крошки (всегда под хедером) */}

      <div className="max-w-[1280px] mx-auto w-full px-4 mb-2">
      <Breadcrumbs />
      </div>
      {/* Мобильное меню (оверлей) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[color:var(--background)]/95 px-4 pb-6 pt-8 text-[var(--foreground)] shadow-[0_0_40px_rgba(0,0,0,0.12)] backdrop-blur-md dark:shadow-[0_0_48px_rgba(0,0,0,0.45)] sm:px-6 lg:hidden">
          <button
            type="button"
            className="absolute right-6 top-6 text-3xl"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ×
          </button>

          <nav className="mt-10">
            <ul className="space-y-6 text-3xl font-semibold">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="mt-16 inline-flex items-center gap-2 rounded-full bg-[#acc2fd] px-6 py-3 text-lg font-semibold text-[var(--hero-button)]"
          >
            → {t('connect')}
          </button>
          
          {/* Нижняя часть мобильного меню */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              className={`relative flex h-10 w-20 items-center rounded-full p-1 transition-colors ${
                isDark ? "bg-indigo-300" : "bg-amber-200"
              }`}
            >
              <span className={`grid h-8 w-8 place-items-center rounded-full text-lg transition-all duration-300 ${isDark ? "translate-x-10 bg-zinc-900" : "translate-x-0 bg-zinc-900"}`}>
                {isDark ? "☾" : "☼"}
              </span>
            </button>

            <div className="flex items-center gap-3">
              <Image src={socialIconSrc(isDark, "instagram")} alt="Inst" width={24} height={24} />
              <Image src={socialIconSrc(isDark, "telegram")} alt="TG" width={24} height={24} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}