import HeroForm from "@/components/hero-form";
import { createHeroSlide } from "@/lib/actions/hero";

export default function NewHeroPage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">새 메인 슬라이드</h1>
      </header>
      <HeroForm action={createHeroSlide} submitLabel="등록" />
    </div>
  );
}
