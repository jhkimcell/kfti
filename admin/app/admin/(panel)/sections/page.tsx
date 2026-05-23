import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SECTIONS, type SectionSlug } from "@/lib/page-sections";

export const dynamic = "force-dynamic";

export default async function SectionsHubPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("page_items").select("section");

  const counts: Record<string, number> = {};
  (data ?? []).forEach((r: { section: string }) => {
    counts[r.section] = (counts[r.section] ?? 0) + 1;
  });

  const slugs = Object.keys(SECTIONS) as SectionSlug[];

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">사업·조직 항목</h1>
        <p className="mt-1 text-sm text-slate-500">
          사업분야·조직구성의 카드(항목)를 추가·수정·삭제합니다.
        </p>
      </header>

      {error && (
        <p className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          page_items 테이블이 아직 없습니다. SETUP의 migration-page-items.sql 을 먼저 실행하세요.
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {slugs.map((slug) => (
          <Link
            key={slug}
            href={`/admin/sections/${slug}`}
            className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-slate-900 hover:shadow-sm"
          >
            <p className="text-sm font-semibold text-slate-900">{SECTIONS[slug].label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{counts[slug] ?? 0}<span className="ml-1 text-sm font-normal text-slate-400">개</span></p>
            <p className="mt-3 text-sm font-medium text-slate-500">관리하기 →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
