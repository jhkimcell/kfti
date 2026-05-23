import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateHeroSlide } from "@/lib/actions/hero";
import type { HeroSlide } from "@/lib/types";
import HeroForm from "@/components/hero-form";

export default async function EditHeroPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("hero_slides").select("*").eq("id", id).single();
  if (!data) notFound();
  const slide = data as HeroSlide;

  const updateAction = updateHeroSlide.bind(null, slide.id);

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">슬라이드 수정</h1>
      </header>
      <HeroForm
        action={updateAction}
        submitLabel="수정 저장"
        defaultValues={{
          tag: slide.tag,
          title: slide.title,
          subtitle: slide.subtitle,
          button_label: slide.button_label,
          button_link: slide.button_link,
          image_url: slide.image_url,
          sort_order: slide.sort_order,
          published: slide.published,
        }}
      />
    </div>
  );
}
