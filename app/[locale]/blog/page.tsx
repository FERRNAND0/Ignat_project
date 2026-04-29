import Header from "@/app/components/headaer/header";
import Footer from "@/app/components/footer/footer";
import BlogList from "@/app/components/blog/blog-list";
import { TeamSurfaceHeaderSection } from "@/app/components/layout/team-surface-header";

export default function BlogPage() {
  return (
    <>
      <main className="mx-auto flex w-full min-w-0 max-w-[1280px] flex-col gap-6 px-3 sm:gap-8 sm:px-4 md:px-6 lg:max-w-[1400px]">
        
        {/* Обертка для шапки, чтобы она выглядела как на главной */}
        <TeamSurfaceHeaderSection className="mt-4">
          <Header />
        </TeamSurfaceHeaderSection>
        
        {/* Сам список статей, который ты мне только что скинул */}
        <BlogList />
        
      </main>
      
      {/* Подвал сайта */}
      <Footer />
    </>
  );
}