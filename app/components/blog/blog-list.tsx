"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// Описываем тип данных для статьи (как в нашей схеме Python)
interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string;
  created_at: string;
}
export default function BlogList() {
  const t = useTranslations("blog");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
    // Добавили слэш в начале: "/api/posts"
    const API_URL = "/api/posts"; 
    
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка сервера");
        return res.json();
      })
      .then((data) => {
        // ПРОВЕРКА: Если пришел массив — ставим его, если нет — пустой список
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("Бэкенд вернул не массив:", data);
          setPosts([]); 
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке блога:", err);
        setPosts([]);
        setLoading(false);
      });
  }, []);
  if (loading) return <div className="p-10 text-center">Загрузка статей...</div>;

  return (
    <section className="mt-8 px-3 md:px-6 lg:px-8">
      <h2 className="mb-6 text-3xl font-extrabold text-[var(--foreground)] md:mb-10 md:text-4xl">
        {t("title")}
      </h2>

      {posts.length === 0 ? (
        <p className="text-[var(--design-muted)]">Статей пока нет.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="flex flex-col overflow-hidden rounded-3xl bg-[var(--workers-bg)] shadow-sm border border-black/5 dark:border-white/10 transition-all hover:shadow-md hover:-translate-y-1"
            >
              <Link href={`/blog/${post.id}`} className="group relative h-56 w-full overflow-hidden">
               <Image 
  src={
    (post.image_url && (post.image_url.startsWith('http') || post.image_url.startsWith('/'))) 
    ? post.image_url 
    : "/img/placeholder.png"
  }
  alt={post.title} 
  fill 
  className="object-cover transition-transform duration-500 group-hover:scale-105"
/>
                <span className="absolute left-4 top-4 rounded-full bg-[var(--design-btn)] px-3 py-1 text-xs font-bold text-[var(--foreground)]">
                  {post.category}
                </span>
              </Link>

              <div className="flex flex-1 flex-col p-5 md:p-6">
                <time className="mb-2 text-xs text-[var(--design-muted)]">
                  {new Date(post.created_at).toLocaleDateString()}
                </time>
                <Link href={`/blog/${post.id}`}>
                  <h3 className="mb-3 text-xl font-bold leading-tight text-[var(--foreground)] hover:text-[#9ab5f6] transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="mb-5 flex-1 text-sm text-[var(--design-muted)] line-clamp-3">
                  {post.excerpt}
                </p>
                <Link 
                  href={`/blog/${post.id}`}
                  className="mt-auto inline-flex w-fit items-center gap-2 font-semibold text-[var(--foreground)] transition-colors hover:text-[#9ab5f6]"
                >
                  {t("readMore")} <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}