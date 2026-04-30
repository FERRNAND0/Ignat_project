"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/components/headaer/header";
import Footer from "@/app/components/footer/footer";

export default function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) return <div className="text-center p-20">Загрузка статьи...</div>;

  return (
    <div className="mx-auto max-w-[800px] px-6 py-20 text-white">
      <Header />
      <img src={post.image_url} alt={post.title} className="w-full rounded-3xl mb-10 mt-10" />
      <span className="text-blue-500 font-bold uppercase">{post.category}</span>
      <h1 className="text-5xl font-extrabold my-6">{post.title}</h1>
      <div className="text-gray-400 text-lg leading-relaxed">
        {post.content}
      </div>
      <Footer />
    </div>
  );
}