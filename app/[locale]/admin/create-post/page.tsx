"use client";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        alert("Пост опубликован!");
        router.push("/admin"); // Возвращаемся в админку
      }
    } catch (err) {
      console.error("Ошибка при создании поста", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Создать новый пост</h1>
      <form onSubmit={handlePost} className="flex flex-col gap-4">
        <input
          className="p-3 rounded-xl border border-white/10 bg-[var(--card-input-bg)] outline-none"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="p-3 rounded-xl border border-white/10 bg-[var(--card-input-bg)] outline-none h-64"
          placeholder="Текст вашего поста..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button
          disabled={loading}
          className="bg-blue-600 p-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Публикация..." : "Опубликовать в LXV"}
        </button>
      </form>
    </div>
  );
}