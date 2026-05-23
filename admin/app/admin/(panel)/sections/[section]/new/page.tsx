import { notFound } from "next/navigation";
import { SECTIONS, isSection } from "@/lib/page-sections";
import { createPageItem } from "@/lib/actions/page-items";
import PageItemForm from "@/components/page-item-form";

export default async function NewItemPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!isSection(section)) notFound();

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">새 항목 — {SECTIONS[section].label}</h1>
      </header>
      <PageItemForm section={section} action={createPageItem.bind(null, section)} submitLabel="등록" />
    </div>
  );
}
