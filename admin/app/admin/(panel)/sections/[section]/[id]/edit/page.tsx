import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SECTIONS, isSection } from "@/lib/page-sections";
import { updatePageItem } from "@/lib/actions/page-items";
import type { PageItem } from "@/lib/types";
import PageItemForm from "@/components/page-item-form";

export default async function EditItemPage({
  params,
}: {
  params: Promise<{ section: string; id: string }>;
}) {
  const { section, id } = await params;
  if (!isSection(section)) notFound();

  const supabase = await createClient();
  const { data } = await supabase.from("page_items").select("*").eq("id", id).single();
  if (!data) notFound();
  const item = data as PageItem;

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">항목 수정 — {SECTIONS[section].label}</h1>
      </header>
      <PageItemForm
        section={section}
        action={updatePageItem.bind(null, section, item.id)}
        submitLabel="수정 저장"
        defaultValues={{
          icon: item.icon,
          tag: item.tag,
          title: item.title,
          body: item.body,
          bullets: item.bullets,
          image_url: item.image_url,
          sort_order: item.sort_order,
          published: item.published,
        }}
      />
    </div>
  );
}
