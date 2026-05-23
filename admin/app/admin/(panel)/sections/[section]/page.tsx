import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SECTIONS, isSection } from "@/lib/page-sections";
import type { PageItem } from "@/lib/types";
import DeletePageItemButton from "@/components/delete-page-item-button";
import SeedSectionButton from "@/components/seed-section-button";

export const dynamic = "force-dynamic";

export default async function SectionListPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!isSection(section)) notFound();
  const cfg = SECTIONS[section];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("page_items")
    .select("*")
    .eq("section", section)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  const items = (data ?? []) as PageItem[];

  return (
    <div>
      <header className="mb-6 flex items-center justify-between">
        <div>
          <Link href="/admin/sections" className="text-sm text-slate-400 hover:underline">← 사업·조직 항목</Link>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">{cfg.label}</h1>
          <p className="mt-1 text-sm text-slate-500">총 {items.length}개</p>
        </div>
        <Link href={`/admin/sections/${section}/new`} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
          + 새 항목
        </Link>
      </header>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          목록을 불러오지 못했습니다: {error.message}
          <br />(page_items 테이블이 없다면 migration-page-items.sql 을 먼저 실행하세요.)
        </p>
      )}

      {!error && items.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-sm text-slate-500">아직 항목이 없습니다. 현재 사이트 내용을 그대로 불러올 수 있어요.</p>
          <div className="mt-4 flex justify-center gap-3">
            <SeedSectionButton section={section} />
            <Link href={`/admin/sections/${section}/new`} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
              직접 추가
            </Link>
          </div>
        </div>
      )}

      {items.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-500">
                <th className="w-16 px-5 py-3 font-medium">순서</th>
                <th className="px-5 py-3 font-medium">제목</th>
                <th className="w-24 px-5 py-3 font-medium">상태</th>
                <th className="w-32 px-5 py-3 text-right font-medium">관리</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="px-5 py-3 font-semibold text-slate-500">{item.sort_order}</td>
                  <td className="px-5 py-3">
                    <Link href={`/admin/sections/${section}/${item.id}/edit`} className="font-medium text-slate-900 hover:underline">
                      {item.icon && <span className="mr-1">{item.icon}</span>}{item.title}
                    </Link>
                    {item.tag && <span className="ml-2 text-xs text-slate-400">{item.tag}</span>}
                  </td>
                  <td className="px-5 py-3">
                    {item.published ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">노출</span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">숨김</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-3">
                      <Link href={`/admin/sections/${section}/${item.id}/edit`} className="text-sm font-medium text-slate-600 hover:underline">수정</Link>
                      <DeletePageItemButton section={section} id={item.id} title={item.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
